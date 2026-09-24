"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent } from "react";
import { jakarta } from "@/components/HeroSection/font";
import { LogoMark } from "@/components/HeroSection/LogoMark";
import { CloseIcon } from "@/components/HeroSection/icons";
import { track } from "./analytics";
import { MAX_INPUT_CHARS, SUGGESTED_PROMPTS } from "./config";
import HandoffCard from "./HandoffCard";
import Markdown from "./Markdown";
import QuoteFlow from "./QuoteFlow";
import { useChat, type UiMessage } from "./useChat";

interface Props {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

export default function ChatPanel({ open, onClose }: Props) {
  const { messages, pending, send, addLocal } = useChat();
  const [input, setInput] = useState("");
  const [view, setView] = useState<"chat" | "quote">("chat");
  const [handoffShown, setHandoffShown] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const stickRef = useRef(true);

  const started = messages.some((m) => m.role === "user");
  // The newest reply already offers these actions inline; don't repeat them in the footer.
  const lastMsg = messages[messages.length - 1];
  const inlineActionsShown = !!lastMsg && lastMsg.role !== "user" && !pending && (lastMsg.actions?.length ?? 0) > 0;
  const isMobile = () => typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches;

  // ----- focus + scroll lock -----
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => (view === "chat" ? inputRef.current?.focus() : undefined), 80);
    const mobile = isMobile();
    if (mobile) document.documentElement.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      if (mobile) document.documentElement.style.overflow = "";
    };
  }, [open, view]);

  // ----- keep the newest message in view unless the visitor scrolled up -----
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el && stickRef.current) el.scrollTop = el.scrollHeight;
  }, [messages, pending, handoffShown, view]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (el) stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
  };

  // ----- Esc closes; Tab is trapped inside the dialog on full-screen mobile -----
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key === "Tab" && isMobile() && panelRef.current) {
      const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((n) => n.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const submit = useCallback(() => {
    if (!input.trim() || pending) return;
    stickRef.current = true;
    void send(input);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "";
  }, [input, pending, send]);

  const onInputKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  };

  const grow = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
  };

  const startQuote = () => {
    track("quote_started");
    setView("quote");
  };
  const showHandoff = () => {
    track("handoff_requested");
    setHandoffShown(true);
  };

  const prefill = [...messages]
    .reverse()
    .find((m) => m.role === "user" && m.content.length >= 15 && !/quot|estimate|proposal/i.test(m.content))?.content ?? "";

  const busyPlaceholder = pending ? "Corefort AI is replying…" : "Ask about Corefort…";

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Corefort AI chat"
      aria-modal="false"
      id="corefort-ai-panel"
      onKeyDown={onKeyDown}
      // Closed panels stay mounted (instant re-open, conversation kept) but are removed from
      // the tab order and the accessibility tree.
      {...(!open ? ({ inert: true } as unknown as HTMLAttributes<HTMLDivElement>) : {})}
      aria-hidden={!open}
      className={`${jakarta.variable} fixed inset-0 z-[110] flex h-[100dvh] flex-col overflow-hidden bg-white/[0.88] font-jakarta text-hero-ink shadow-[0_20px_60px_rgba(15,40,90,0.28)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-200 ease-out sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(680px,calc(100dvh-3rem))] sm:w-[400px] sm:rounded-3xl sm:border sm:border-stroke ${
        open ? "translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-4 opacity-0 sm:scale-95"
      }`}
    >
      {/* Header */}
      <header
        className="relative flex shrink-0 items-center gap-3 px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))] text-white"
        style={{ background: "radial-gradient(120% 140% at 100% 0%, rgba(37,99,235,0.55) 0%, rgba(10,15,28,0) 60%), #0A0F1C" }}
      >
        <LogoMark className="h-10 w-10 shrink-0" />
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-extrabold leading-tight tracking-tight">Corefort AI</h2>
          <p className="truncate text-[13px] text-white/70">Solutions, products &amp; quotes</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </header>

      {view === "quote" ? (
        <QuoteFlow
          prefill={prefill}
          onCancel={() => setView("chat")}
          onDone={(first) => {
            setView("chat");
            addLocal(
              `Thank you${first ? `, ${first}` : ""}. Your quote request has been sent to the Corefort team. I can keep answering questions in the meantime.`,
            );
          }}
        />
      ) : (
        <>
          <div ref={scrollRef} onScroll={onScroll} role="log" aria-live="polite" aria-relevant="additions text" aria-label="Conversation" className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5">
            {messages.map((m) => (
              <Bubble key={m.id} m={m} onQuote={startQuote} onHandoff={showHandoff} streaming={pending && m.role === "assistant" && m === messages[messages.length - 1]} />
            ))}

            {!started && (
              <div className="flex flex-wrap gap-2 pt-1" aria-label="Suggested questions">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => void send(p, "suggestion")}
                    className="min-h-[36px] rounded-full border border-hero-primary/25 bg-white px-3.5 py-1.5 text-left text-[13px] font-medium text-hero-ink transition hover:border-hero-primary hover:bg-hero-primary-light"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {handoffShown && <HandoffCard onQuote={startQuote} />}
          </div>

          <div className="shrink-0 border-t border-stroke bg-white px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
            {started && !inlineActionsShown && (
              <div className="mb-2.5 flex flex-wrap gap-2">
                <button type="button" onClick={startQuote} className="min-h-[36px] rounded-full bg-hero-ink px-4 text-[13px] font-semibold text-white transition hover:bg-hero-ink/90">
                  Request a quote
                </button>
                <button type="button" onClick={showHandoff} className="min-h-[36px] rounded-full border border-stroke px-4 text-[13px] font-semibold text-hero-ink transition hover:border-hero-primary hover:text-hero-primary">
                  Talk to Corefort
                </button>
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              className="flex items-end gap-2"
            >
              <label htmlFor="corefort-ai-input" className="sr-only">
                Message Corefort AI
              </label>
              <textarea
                id="corefort-ai-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={MAX_INPUT_CHARS}
                placeholder={busyPlaceholder}
                onChange={(e) => {
                  setInput(e.target.value);
                  grow(e.target);
                }}
                onKeyDown={onInputKey}
                className="max-h-28 min-h-[44px] flex-1 resize-none rounded-2xl border border-stroke bg-hero-bg px-4 py-[11px] text-base text-hero-ink outline-none transition placeholder:text-hero-muted focus:border-hero-primary focus:bg-white focus:ring-2 focus:ring-hero-primary/20"
              />
              <button
                type="submit"
                disabled={!input.trim() || pending}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hero-primary text-white transition hover:bg-hero-primary/90 disabled:bg-hero-muted/50"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                  <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
            <p className="mt-2 text-center text-[11px] leading-snug text-hero-muted">
              {input.length > MAX_INPUT_CHARS - 120 ? `${MAX_INPUT_CHARS - input.length} characters left · ` : ""}
              AI can make mistakes. For quotes and decisions, talk to the Corefort team.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function Bubble({ m, onQuote, onHandoff, streaming }: { m: UiMessage; onQuote: () => void; onHandoff: () => void; streaming: boolean }) {
  const isUser = m.role === "user";
  if (!isUser && !m.content) {
    // Typing indicator while the first tokens are on their way.
    return (
      <div className="flex" aria-label="Corefort AI is typing">
        <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-stroke bg-white px-4 py-3.5 shadow-sm">
          {[0, 150, 300].map((d) => (
            <span key={d} className="h-2 w-2 animate-pulse rounded-full bg-hero-muted" style={{ animationDelay: `${d}ms` }} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[88%] break-words px-4 py-3 text-[15px] leading-relaxed shadow-sm ${
          isUser
            ? "rounded-2xl rounded-br-md bg-hero-primary text-white"
            : "rounded-2xl rounded-bl-md border border-stroke bg-white text-hero-ink"
        }`}
      >
        {isUser ? <span className="whitespace-pre-wrap">{m.content}</span> : <Markdown text={m.content} />}
        {streaming && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-hero-muted" aria-hidden />}
      </div>
      {!isUser && !streaming && m.actions && m.actions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {m.actions.includes("quote") && (
            <button type="button" onClick={onQuote} className="min-h-[36px] rounded-full bg-hero-ink px-4 text-[13px] font-semibold text-white transition hover:bg-hero-ink/90">
              Request a quote
            </button>
          )}
          {m.actions.includes("handoff") && (
            <button type="button" onClick={onHandoff} className="min-h-[36px] rounded-full border border-hero-primary/40 bg-white px-4 text-[13px] font-semibold text-hero-primary transition hover:bg-hero-primary-light">
              Talk to Corefort
            </button>
          )}
        </div>
      )}
    </div>
  );
}
