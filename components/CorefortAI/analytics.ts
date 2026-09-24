import { AI_API_URL } from "./config";

export type AIEvent =
  | "chat_opened"
  | "message_sent"
  | "suggested_prompt_selected"
  | "quote_started"
  | "quote_completed"
  | "handoff_requested";

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  plausible?: (name: string, opts?: { props?: Record<string, string> }) => void;
  dataLayer?: unknown[];
};

/**
 * Fire-and-forget, non-sensitive event tracking (event name only: no message text, no PII).
 * The site has no analytics platform today, so this:
 *  1. dispatches a DOM CustomEvent ("corefort:ai") that any future tool can listen to,
 *  2. forwards to gtag / Plausible / dataLayer if one is ever installed,
 *  3. sends the event name to the Worker's /api/event (counted in Workers Logs / Analytics Engine).
 */
export function track(event: AIEvent): void {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  try {
    window.dispatchEvent(new CustomEvent("corefort:ai", { detail: { event } }));
    w.gtag?.("event", `corefort_ai_${event}`);
    w.plausible?.(`corefort_ai_${event}`);
    w.dataLayer?.push({ event: `corefort_ai_${event}` });

    if (AI_API_URL) {
      // keepalive survives page unloads. Not sendBeacon: it always sends credentials, which
      // our (deliberately credential-free) CORS policy rejects.
      void fetch(`${AI_API_URL}/api/event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event }),
        keepalive: true,
        credentials: "omit",
      }).catch(() => undefined);
    }
  } catch {
    /* analytics must never break the chat */
  }
}
