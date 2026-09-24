"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { LogoMark } from "@/components/HeroSection/LogoMark";
import { track } from "./analytics";
import { AI_API_URL } from "./config";

// The panel (chat UI, quote form, markdown renderer) is a separate chunk that is only fetched
// when the visitor shows interest, so the page's initial JavaScript only includes this launcher.
const loadPanel = () => import("./ChatPanel");
const ChatPanel = dynamic(loadPanel, { ssr: false, loading: () => null });

export default function CorefortAI() {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    if (!open) track("chat_opened"); // outside the state updater: updaters must be pure
    setOpen(!open);
    setEverOpened(true);
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  if (!AI_API_URL) return null;

  return (
    <>
      {everOpened && <ChatPanel open={open} onClose={close} />}
      <button
        ref={launcherRef}
        type="button"
        onClick={toggle}
        onPointerEnter={() => void loadPanel()}
        onFocus={() => void loadPanel()}
        aria-label={open ? "Close Corefort AI chat" : "Open Corefort AI chat"}
        aria-expanded={open}
        aria-controls="corefort-ai-panel"
        className={`group fixed bottom-6 right-4 z-[100] flex items-center gap-2.5 rounded-full bg-hero-ink p-2 text-white shadow-[0_10px_30px_rgba(10,15,28,0.35)] ring-1 ring-white/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(37,99,235,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-primary sm:right-6 sm:pr-5 ${
          open ? "max-sm:pointer-events-none max-sm:opacity-0" : ""
        }`}
      >
        <LogoMark className="h-10 w-10 shrink-0" />
        <span className="hidden text-sm font-semibold sm:inline">Ask Corefort AI</span>
      </button>
    </>
  );
}
