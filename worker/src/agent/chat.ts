import type { Config } from "../config";
import type { ChatAction, Env, ModelMessage, StreamEvent } from "../types";
import { createProvider, type ChatProvider } from "../ai/provider";
import { readDeltas } from "../ai/sse";
import { limit } from "../ratelimit";
import {
  SECURITY_HEADERS,
  cleanText,
  clientIp,
  corsHeaders,
  isInjectionAttempt,
  isSecretRequest,
  json,
  outputIsUnsafe,
  readJson,
  sanitizeHistory,
  stripDashes,
} from "../security";
import { INJECTION_ONLY_REFUSAL, SECRET_REFUSAL, actionsForModelReply, detectIntent, scriptedReply } from "./intent";
import { buildSystemPrompt } from "./systemPrompt";

const UNAVAILABLE_TEXT =
  "Sorry, I'm having trouble responding right now. You can contact the Corefort team directly and we'll help you out.";
const SAFE_REPLACEMENT =
  "I can only help with questions about Corefort's solutions, products and how to work with us. What would you like to know?";

/** Characters kept back from the stream until the output guard has seen what follows them. */
const HOLDBACK = 64;

const enc = new TextEncoder();
const sse = (e: StreamEvent) => enc.encode(`data: ${JSON.stringify(e)}\n\n`);

function sseResponse(stream: ReadableStream<Uint8Array>, origin: string | null): Response {
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "X-Accel-Buffering": "no",
      ...SECURITY_HEADERS,
      ...corsHeaders(origin),
    },
  });
}

/** A complete, non-model reply delivered through the same SSE protocol. */
function staticReply(text: string, actions: ChatAction[], origin: string | null): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(sse({ type: "delta", text }));
      if (actions.length) controller.enqueue(sse({ type: "actions", actions }));
      controller.enqueue(sse({ type: "done" }));
      controller.close();
    },
  });
  return sseResponse(stream, origin);
}

function errorReply(code: "unavailable" | "rate_limited" | "budget", origin: string | null, retryAfter?: number): Response {
  const status = code === "unavailable" ? 502 : 429;
  const extra: Record<string, string> = { ...corsHeaders(origin) };
  if (retryAfter) extra["Retry-After"] = String(retryAfter);
  return json({ error: code, message: UNAVAILABLE_TEXT }, status, extra);
}

export async function handleChat(req: Request, env: Env, cfg: Config, origin: string | null, provider?: ChatProvider): Promise<Response> {
  const body = (await readJson(req, cfg.maxRequestBytes)) as { messages?: unknown; sessionId?: unknown } | null;
  if (!body || typeof body !== "object") return json({ error: "bad_request" }, 400, corsHeaders(origin));

  // Reject (rather than silently truncate) an oversized newest message so meaning is never altered.
  if (Array.isArray(body.messages)) {
    const rawLast = body.messages[body.messages.length - 1] as { content?: unknown } | undefined;
    if (typeof rawLast?.content === "string" && rawLast.content.length > cfg.maxMessageChars) {
      return json({ error: "too_long", max: cfg.maxMessageChars }, 413, corsHeaders(origin));
    }
  }

  const history = sanitizeHistory(body.messages, cfg);
  if (!history) return json({ error: "bad_request" }, 400, corsHeaders(origin));

  const last = history[history.length - 1].content;

  // ----- Rate limits (per IP windows + per session + global budget) -----
  const ip = clientIp(req);
  const session = cleanText(body.sessionId, 64) || "none";
  const ipLimit = await limit(env, "chat-ip", ip, [
    { name: "min", limit: cfg.chat.ipPerMin, seconds: 60 },
    { name: "hour", limit: cfg.chat.ipPerHour, seconds: 3600 },
    { name: "day", limit: cfg.chat.ipPerDay, seconds: 86400 },
  ]);
  if (!ipLimit.ok) return errorReply("rate_limited", origin, ipLimit.retryAfter);

  const sessionLimit = await limit(env, "chat-session", session, [
    { name: "hour", limit: cfg.chat.sessionPerHour, seconds: 3600 },
  ]);
  if (!sessionLimit.ok) return errorReply("rate_limited", origin, sessionLimit.retryAfter);

  // ----- Deterministic guards (no model call, no cost, cannot be talked around) -----
  const secretAsk = isSecretRequest(last);
  const injection = isInjectionAttempt(last);
  if (secretAsk) return staticReply(SECRET_REFUSAL, [], origin);

  const intent = detectIntent(last);
  const scripted = scriptedReply(intent);
  if (scripted && !injection) return staticReply(scripted.text, scripted.actions, origin);

  // ----- Global daily budget protects the Workers AI allocation -----
  const budget = await limit(env, "chat-global", "all", [{ name: "day", limit: cfg.chat.globalPerDay, seconds: 86400 }]);
  if (!budget.ok) return errorReply("budget", origin, budget.retryAfter);

  // ----- Model call -----
  const messages: ModelMessage[] = [
    { role: "system", content: buildSystemPrompt({ injectionDetected: injection }) },
    ...history,
  ];

  const ai = provider ?? createProvider(env, cfg);
  let upstream: ReadableStream<Uint8Array>;
  try {
    upstream = await ai.stream({ messages, maxTokens: cfg.maxOutputTokens, temperature: 0.3 });
  } catch (err) {
    // Log only the class of failure, never message content or upstream bodies.
    console.log(JSON.stringify({ evt: "ai_error", provider: ai.name, status: (err as { status?: number }).status ?? null }));
    return errorReply("unavailable", origin);
  }

  const out = new ReadableStream<Uint8Array>({
    async start(controller) {
      let full = "";
      let emitted = 0;
      let blocked = false;
      try {
        for await (const delta of readDeltas(upstream)) {
          full += delta;
          full = full.slice(0, emitted) + stripDashes(full.slice(emitted));
          // Guard the accumulated text so a secret split across chunks is still caught.
          if (outputIsUnsafe(full)) {
            blocked = true;
            break;
          }
          // Hold back the tail: text is only released once it is HOLDBACK characters old, so a
          // marker or token that is still being assembled can never be partly shown.
          const safeUpTo = full.length - HOLDBACK;
          if (safeUpTo > emitted) {
            controller.enqueue(sse({ type: "delta", text: full.slice(emitted, safeUpTo) }));
            emitted = safeUpTo;
          }
        }
        if (!blocked && outputIsUnsafe(full)) blocked = true;
        if (!blocked && full.length > emitted) {
          controller.enqueue(sse({ type: "delta", text: full.slice(emitted) }));
          emitted = full.length;
        }
        if (blocked) {
          controller.enqueue(sse({ type: "replace", text: injection ? INJECTION_ONLY_REFUSAL : SAFE_REPLACEMENT }));
          console.log(JSON.stringify({ evt: "output_blocked" }));
        } else if (!full.trim()) {
          controller.enqueue(sse({ type: "error", code: "unavailable" }));
        } else {
          const actions = actionsForModelReply(intent, full);
          if (actions.length) controller.enqueue(sse({ type: "actions", actions }));
        }
        controller.enqueue(sse({ type: "done" }));
      } catch {
        console.log(JSON.stringify({ evt: "stream_error" }));
        controller.enqueue(sse({ type: "error", code: "unavailable" }));
        controller.enqueue(sse({ type: "done" }));
      } finally {
        controller.close();
      }
    },
    cancel() {
      upstream.cancel().catch(() => undefined);
    },
  });
  return sseResponse(out, origin);
}
