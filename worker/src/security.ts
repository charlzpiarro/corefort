import type { ChatMessage } from "./types";
import type { Config } from "./config";

// ---------- Origin / CORS ----------

/** Returns the request Origin if (and only if) it is on the allow-list. */
export function allowedOrigin(req: Request, cfg: Config): string | null {
  const origin = req.headers.get("Origin");
  if (!origin) return null;
  const normalized = origin.replace(/\/+$/, "");
  return cfg.allowedOrigins.includes(normalized) ? origin : null;
}

export function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "600",
    Vary: "Origin",
  };
}

export const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Cache-Control": "no-store",
};

// ---------- Identity for rate limiting (raw IPs are never stored) ----------

export function clientIp(req: Request): string {
  return req.headers.get("CF-Connecting-IP") ?? "unknown";
}

export async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ---------- Text sanitization ----------

// Control characters, zero-width and bidi-override characters.
const CONTROL_CHARS =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F​-‏‪-‮⁠-⁤﻿]/g;

/** Normalizes untrusted text: strips control/bidi chars, collapses whitespace, hard-caps length. */
export function cleanText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFKC")
    .replace(CONTROL_CHARS, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

/** Removes characters that could be used for markup injection when text is placed in emails/webhooks. */
export function stripMarkup(value: string): string {
  return value.replace(/[<>]/g, "");
}

export function sanitizeHistory(raw: unknown, cfg: Config): ChatMessage[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const out: ChatMessage[] = [];
  for (const item of raw.slice(-cfg.maxHistoryMessages)) {
    if (!item || typeof item !== "object") continue;
    const role = (item as { role?: unknown }).role;
    // Only user/assistant roles are accepted from the browser. A client-supplied "system"
    // message is silently dropped - visitors can never inject system-level instructions.
    if (role !== "user" && role !== "assistant") continue;
    const limit = role === "user" ? cfg.maxMessageChars : 1500;
    const content = cleanText((item as { content?: unknown }).content, limit);
    if (!content) continue;
    out.push({ role, content });
  }
  // Conversation must end on a user turn and start with one (strict alternation templates).
  while (out.length && out[out.length - 1].role !== "user") out.pop();
  while (out.length && out[0].role !== "user") out.shift();
  return out.length ? out : null;
}

// ---------- Prompt-injection / secret-extraction detection ----------

const SECRET_REQUEST_PATTERNS: RegExp[] = [
  /\b(system|hidden|internal|initial|original|developer|secret)\s+(prompt|instructions?|message|rules|configuration)\b/i,
  /\b(reveal|show|print|repeat|tell|give|share|leak|dump|expose|display|output)\b.{0,60}\b(your|the)\b.{0,20}\b(prompt|instructions?|rules|guidelines|configuration)\b/i,
  /\b(reveal|show|tell|give|print|share|leak|dump|expose|display|what's|what is|what are)\b.{0,50}\b(api[\s_-]?keys?|access[\s_-]?keys?|tokens?|secrets?|passwords?|credentials?|env(ironment)?[\s_-]*(vars?|variables?)|\.env)\b/i,
  /\byour\s+(api[\s_-]?keys?|tokens?|secrets?|passwords?|credentials?)\b/i,
  /\bcloudflare\s+(account|token|credentials?|api|secret)/i,
  /\b(repeat|print|output|copy)\b.{0,30}\b(everything|all text|the words|text)\b.{0,20}\b(above|before)\b/i,
  /\bwhat\s+(were|are)\s+you\s+(told|instructed|programmed)\b/i,
  /\b(database|db)\s+(password|credentials?|connection)\b/i,
  /\bsource\s*code\s+of\s+(this|your|the)\s+(bot|agent|assistant|worker|system)\b/i,
];

const INJECTION_PATTERNS: RegExp[] = [
  /\bignore\b.{0,30}\b(previous|prior|above|earlier|all|your|the)\b.{0,30}\b(instructions?|rules?|prompts?|guidelines?)\b/i,
  /\b(disregard|forget|override|bypass)\b.{0,40}\b(instructions?|rules?|guidelines?|restrictions?|safety|filters?)\b/i,
  /\byou\s+are\s+now\b/i,
  /\bact\s+as\b.{0,30}\b(unrestricted|admin(istrator)?|root|developer|jailbroken|dan|system)\b/i,
  /\b(developer|debug|admin|god)\s+mode\b/i,
  /\bjailbreak\b/i,
  /\bpretend\b.{0,25}\b(you\s+(are|have)|to\s+be|there\s+are\s+no)\b/i,
  /(^|\n)\s*(system|assistant)\s*:/i,
  /<\|?\s*(system|im_start|im_end|assistant)\b/i,
  /\[\s*(inst|system)\s*\]/i,
];

export function isSecretRequest(text: string): boolean {
  return SECRET_REQUEST_PATTERNS.some((re) => re.test(text));
}

export function isInjectionAttempt(text: string): boolean {
  return INJECTION_PATTERNS.some((re) => re.test(text));
}

// ---------- Output guard ----------

/** Unique marker placed in the system prompt. If it ever appears in output the prompt is leaking. */
export const PROMPT_CANARY = "cf-canary-7d3f9a51";

const PROMPT_SENTINELS = ["SECURITY RULES", "HARD RULES", "KNOWLEDGE BASE (verified", "UNKNOWN / DO NOT CLAIM"];

const SECRET_OUTPUT_PATTERNS: RegExp[] = [
  /\b(sk|pk|rk|re|cfut|cfat)[-_][A-Za-z0-9_-]{16,}/,
  /\bBearer\s+[A-Za-z0-9._~+/=-]{20,}/i,
  /\b(CLOUDFLARE_(AI_TOKEN|ACCOUNT_ID)|WEB3FORMS_ACCESS_KEY|LEAD_WEBHOOK_URL|RESEND_API_KEY|LEAD_NOTIFY_EMAIL|RATE_LIMIT_SALT)\b/i,
  /\b[A-Za-z0-9_-]{48,}\b/,
  /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i,
];

/** House style: no em or en dashes in assistant replies. Applied to the not-yet-emitted tail of a stream. */
export function stripDashes(text: string): string {
  return text.replace(/\s*[–—]\s*/g, ", ");
}

/** Returns true when generated text must not be shown to the visitor. */
export function outputIsUnsafe(text: string): boolean {
  if (text.includes(PROMPT_CANARY)) return true;
  if (PROMPT_SENTINELS.some((s) => text.includes(s))) return true;
  return SECRET_OUTPUT_PATTERNS.some((re) => re.test(text));
}

// ---------- Request body helpers ----------

/**
 * Reads the body with a hard byte cap. It never buffers more than `maxBytes` (even for chunked
 * uploads with no Content-Length) and cancels the rest of an oversized upload instead of leaving
 * it dangling. Returns null when the body is too large or not valid JSON.
 */
export async function readJson(req: Request, maxBytes: number): Promise<unknown | null> {
  const declared = Number.parseInt(req.headers.get("Content-Length") ?? "0", 10);
  const body = req.body;
  if (!body) return null;
  if (declared > maxBytes) {
    await body.cancel().catch(() => undefined);
    return null;
  }

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > maxBytes) {
        await reader.cancel().catch(() => undefined);
        return null;
      }
      chunks.push(value);
    }
  } catch {
    return null;
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const c of chunks) {
    bytes.set(c, offset);
    offset += c.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}

export function json(body: unknown, status: number, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...SECURITY_HEADERS, ...extra },
  });
}
