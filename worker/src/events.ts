import type { Config } from "./config";
import type { Env } from "./types";
import { limit } from "./ratelimit";
import { cleanText, clientIp, corsHeaders, readJson, SECURITY_HEADERS } from "./security";

/** Non-sensitive event names only. Anything else is ignored. */
export const ALLOWED_EVENTS = [
  "chat_opened",
  "message_sent",
  "suggested_prompt_selected",
  "quote_started",
  "quote_completed",
  "handoff_requested",
] as const;

export async function handleEvent(req: Request, env: Env, cfg: Config, origin: string | null): Promise<Response> {
  const headers = { ...SECURITY_HEADERS, ...corsHeaders(origin) };
  const rl = await limit(env, "event-ip", clientIp(req), [{ name: "min", limit: cfg.eventIpPerMin, seconds: 60 }]);
  if (!rl.ok) return new Response(null, { status: 429, headers });

  const body = (await readJson(req, 1024)) as { event?: unknown } | null;
  const event = cleanText(body?.event, 40);
  if (!(ALLOWED_EVENTS as readonly string[]).includes(event)) return new Response(null, { status: 204, headers });

  // No IP, no session id, no message text: only the event name.
  console.log(JSON.stringify({ evt: "analytics", name: event }));
  env.ANALYTICS?.writeDataPoint({ blobs: [event], doubles: [1], indexes: [event] });
  return new Response(null, { status: 204, headers });
}
