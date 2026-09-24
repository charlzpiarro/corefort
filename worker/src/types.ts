import type { RateLimiter } from "./ratelimit";

/** Bindings, secrets and vars available to the Worker. Secrets are never logged or returned. */
export interface Env {
  // Bindings
  AI?: Ai;
  LIMITER: DurableObjectNamespace<RateLimiter>;
  LEADS?: KVNamespace;
  ANALYTICS?: AnalyticsEngineDataset;

  // Secrets (set with `wrangler secret put`, never in source control)
  CLOUDFLARE_ACCOUNT_ID?: string;
  CLOUDFLARE_AI_TOKEN?: string;
  WEB3FORMS_ACCESS_KEY?: string;
  LEAD_WEBHOOK_URL?: string;
  RESEND_API_KEY?: string;
  RATE_LIMIT_SALT?: string;

  // Plain vars (see wrangler.jsonc). All optional: safe defaults live in config.ts.
  ALLOWED_ORIGINS?: string;
  /** Where quote-request emails go (needs RESEND_API_KEY). Comma-separated for several people. */
  LEAD_NOTIFY_EMAIL?: string;
  /** Sender shown on the email. Defaults to Resend's shared test sender until your domain is verified. */
  LEAD_FROM_EMAIL?: string;
  AI_PROVIDER?: string;
  AI_MODEL?: string;
  MAX_OUTPUT_TOKENS?: string;
  MAX_MESSAGE_CHARS?: string;
  MAX_HISTORY_MESSAGES?: string;
  RL_CHAT_IP_PER_MIN?: string;
  RL_CHAT_IP_PER_HOUR?: string;
  RL_CHAT_IP_PER_DAY?: string;
  RL_CHAT_SESSION_PER_HOUR?: string;
  GLOBAL_DAILY_CHAT_LIMIT?: string;
  RL_LEAD_IP_PER_HOUR?: string;
  RL_LEAD_IP_PER_DAY?: string;
  RL_EVENT_IP_PER_MIN?: string;
  LEAD_RETENTION_DAYS?: string;
}

export type Role = "user" | "assistant";
export interface ChatMessage {
  role: Role;
  content: string;
}
export type ModelMessage = { role: "system" | Role; content: string };

export type ChatAction = "quote" | "handoff";

/** Events streamed to the browser (Server-Sent Events, one JSON object per `data:` line). */
export type StreamEvent =
  | { type: "delta"; text: string }
  | { type: "replace"; text: string }
  | { type: "actions"; actions: ChatAction[] }
  | { type: "error"; code: "unavailable" | "rate_limited" | "budget" }
  | { type: "done" };
