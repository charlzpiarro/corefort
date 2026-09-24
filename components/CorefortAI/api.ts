import { AI_API_URL, MAX_HISTORY_TURNS, SESSION_KEY } from "./config";

export type Turn = { role: "user" | "assistant"; content: string };
export type ChatAction = "quote" | "handoff";

export type ChatFailure = "unavailable" | "rate_limited" | "budget" | "too_long";

export function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}

export interface StreamHandlers {
  onDelta(text: string): void;
  onReplace(text: string): void;
  onActions(actions: ChatAction[]): void;
}

/**
 * Sends the recent conversation to the Worker and streams the reply.
 * Resolves normally on success; throws ChatFailure (a string) for anything the UI should explain.
 * The browser never talks to Workers AI and never holds a credential.
 */
export async function streamChat(history: Turn[], handlers: StreamHandlers, signal: AbortSignal): Promise<void> {
  let res: Response;
  try {
    res = await fetch(`${AI_API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history.slice(-MAX_HISTORY_TURNS), sessionId: getSessionId() }),
      signal,
    });
  } catch (err) {
    if ((err as Error).name === "AbortError") throw err;
    throw "unavailable" satisfies ChatFailure;
  }

  if (!res.ok || !res.body) {
    if (res.status === 429) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      throw (data.error === "budget" ? "budget" : "rate_limited") satisfies ChatFailure;
    }
    if (res.status === 413) throw "too_long" satisfies ChatFailure;
    throw "unavailable" satisfies ChatFailure;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let sawText = false;
  let failed = false;

  const handleLine = (line: string) => {
    if (!line.startsWith("data:")) return;
    let e: { type?: string; text?: string; actions?: ChatAction[] };
    try {
      e = JSON.parse(line.slice(5));
    } catch {
      return;
    }
    if (e.type === "delta" && e.text) {
      sawText = true;
      handlers.onDelta(e.text);
    } else if (e.type === "replace" && e.text) {
      sawText = true;
      handlers.onReplace(e.text);
    } else if (e.type === "actions" && e.actions) {
      handlers.onActions(e.actions.filter((a) => a === "quote" || a === "handoff"));
    } else if (e.type === "error") {
      failed = true;
    }
  };

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buffer.indexOf("\n")) >= 0) {
      handleLine(buffer.slice(0, nl).trim());
      buffer = buffer.slice(nl + 1);
    }
  }
  if (buffer.trim()) handleLine(buffer.trim());
  if (failed && !sawText) throw "unavailable" satisfies ChatFailure;
}

export interface LeadPayload {
  name: string;
  business: string;
  industry: string;
  phone: string;
  email: string;
  location: string;
  requirement: string;
  solution: string;
  budget: string;
  notes: string;
  consent: boolean;
  website: string; // honeypot, must stay empty
}

export type LeadResult =
  | { ok: true }
  | { ok: false; kind: "validation"; fields: Record<string, string> }
  | { ok: false; kind: "rate_limited" | "unavailable" };

export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  try {
    const res = await fetch(`${AI_API_URL}/api/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    const data = (await res.json().catch(() => ({}))) as { fields?: Record<string, string> };
    if (res.status === 422) return { ok: false, kind: "validation", fields: data.fields ?? {} };
    if (res.status === 429) return { ok: false, kind: "rate_limited" };
    return { ok: false, kind: "unavailable" };
  } catch {
    return { ok: false, kind: "unavailable" };
  }
}
