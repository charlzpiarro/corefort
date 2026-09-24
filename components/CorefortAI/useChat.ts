"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { streamChat, type ChatAction, type ChatFailure, type Turn } from "./api";
import { track } from "./analytics";
import { FALLBACK_ERROR_TEXT, MAX_INPUT_CHARS, RATE_LIMIT_TEXT } from "./config";

export interface UiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: ChatAction[];
  /** Local-only bubbles (greeting, errors) are never sent to the model. */
  local?: boolean;
}

const GREETING: UiMessage = {
  id: "greeting",
  role: "assistant",
  local: true,
  content:
    "Hi, I'm Corefort AI. I can explain what Corefort does, point you to the right solution or product, and help you request a quotation. What are you trying to improve in your business?",
};

let counter = 0;
const nextId = () => `m${Date.now()}-${counter++}`;

function failureText(kind: ChatFailure): string {
  if (kind === "rate_limited") return RATE_LIMIT_TEXT;
  if (kind === "too_long") return `Please keep messages under ${MAX_INPUT_CHARS} characters.`;
  return FALLBACK_ERROR_TEXT;
}

export function useChat() {
  const [messages, setMessages] = useState<UiMessage[]>([GREETING]);
  const [pending, setPending] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(async (raw: string, source: "typed" | "suggestion" = "typed") => {
    const text = raw.trim().slice(0, MAX_INPUT_CHARS);
    if (!text || abortRef.current) return;

    track(source === "suggestion" ? "suggested_prompt_selected" : "message_sent");
    if (source === "suggestion") track("message_sent");

    const userMsg: UiMessage = { id: nextId(), role: "user", content: text };
    const replyId = nextId();
    const history: Turn[] = [...messagesRef.current, userMsg]
      .filter((m) => !m.local)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMsg, { id: replyId, role: "assistant", content: "" }]);
    setPending(true);

    const controller = new AbortController();
    abortRef.current = controller;
    const update = (fn: (m: UiMessage) => UiMessage) =>
      setMessages((prev) => prev.map((m) => (m.id === replyId ? fn(m) : m)));

    try {
      await streamChat(
        history,
        {
          onDelta: (t) => update((m) => ({ ...m, content: m.content + t })),
          onReplace: (t) => update((m) => ({ ...m, content: t })),
          onActions: (actions) => update((m) => ({ ...m, actions })),
        },
        controller.signal,
      );
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") {
        const kind = (typeof err === "string" ? err : "unavailable") as ChatFailure;
        update((m) => ({
          ...m,
          local: true,
          content: failureText(kind),
          actions: kind === "too_long" ? [] : ["handoff"],
        }));
      }
    } finally {
      abortRef.current = null;
      setPending(false);
      // A stream that ended with no text at all is treated as a failure.
      setMessages((prev) =>
        prev.map((m) =>
          m.id === replyId && !m.content.trim()
            ? { ...m, local: true, content: FALLBACK_ERROR_TEXT, actions: ["handoff"] }
            : m,
        ),
      );
    }
  }, []);

  /** Adds a local assistant bubble (e.g. the contact card or a quote confirmation). */
  const addLocal = useCallback((content: string, actions?: ChatAction[]) => {
    setMessages((prev) => [...prev, { id: nextId(), role: "assistant", content, actions, local: true }]);
  }, []);

  return { messages, pending, send, addLocal };
}
