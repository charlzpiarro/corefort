"use client";

import { useEffect, useRef, useState } from "react";
import { IconShieldLock } from "@/components/Common/BrandIcons";
import securityData from "./securityData";

const N = securityData.length;
const STEP_MS = 3400;
const DONE_MS = 2600;
const TICKS = 60;
const R = 42; // ring radius in the 0-100 viewBox

/** Round geometry: server and browser `Math.sin/cos` differ in the last digits, which breaks hydration. */
const r3 = (n: number) => Math.round(n * 1000) / 1000;

/** Angle (radians, 0 = top, clockwise) of step i. Steps sit mid-segment so step 1 already shows progress. */
const angleOf = (i: number) => ((i + 0.5) / N) * Math.PI * 2;
const nodePos = (i: number) => ({
  left: `${r3(50 + R * Math.sin(angleOf(i)))}%`,
  top: `${r3(50 - R * Math.cos(angleOf(i)))}%`,
});

/**
 * A loading-ring view of the security practices. An arc draws around the ring one step at a time,
 * from Data Protection to Incident Response, then completes and starts over.
 * Hover, focus or a click pauses and selects; motion is off for reduced-motion users; the loop only
 * runs while the section is on screen.
 */
export default function SecurityCycle() {
  // phase 0..N-1 = the step being "loaded"; phase N = every layer complete.
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = inView && !paused && !reduced;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setPhase((p) => (p + 1) % (N + 1)), phase === N ? DONE_MS : STEP_MS);
    return () => window.clearTimeout(t);
  }, [phase, running]);

  const complete = phase === N;
  const progress = complete ? 1 : (phase + 0.5) / N;
  const active = complete ? null : securityData[phase];
  const ActiveIcon = active?.icon ?? IconShieldLock;
  const select = (i: number) => setPhase(i);

  return (
    <div
      ref={rootRef}
      className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      {/* ------------------------------------------------ the ring */}
      <div className="relative mx-auto aspect-square w-full max-w-[300px] min-[400px]:max-w-[360px] lg:max-w-[460px]">
        <div aria-hidden className="absolute inset-[12%] rounded-full bg-primary/[0.12] blur-3xl" />

        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden focusable="false">
          <defs>
            <linearGradient id="sec-arc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3A56E8" />
              <stop offset="1" stopColor="#9DB0FF" />
            </linearGradient>
          </defs>

          {/* dial ticks that light up as the ring loads */}
          {Array.from({ length: TICKS }, (_, k) => {
            const a = (k / TICKS) * Math.PI * 2;
            const lit = k / TICKS < progress;
            return (
              <line
                key={k}
                x1={r3(50 + 47 * Math.sin(a))}
                y1={r3(50 - 47 * Math.cos(a))}
                x2={r3(50 + 49 * Math.sin(a))}
                y2={r3(50 - 49 * Math.cos(a))}
                strokeWidth={k % 5 === 0 ? 0.7 : 0.4}
                strokeLinecap="round"
                stroke={lit ? "#9DB0FF" : "rgba(255,255,255,0.16)"}
                style={{ transition: "stroke 0.4s ease" }}
              />
            );
          })}

          {/* slow-turning inner orbit */}
          <g className="motion-safe:animate-[spin_60s_linear_infinite]" style={{ transformOrigin: "50px 50px" }}>
            <circle cx="50" cy="50" r="33" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.4" strokeDasharray="0.6 2.2" />
          </g>

          {/* track + loading arc */}
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1.6" />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="url(#sec-arc)"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="100"
            strokeDashoffset={r3(100 - progress * 100)}
            transform="rotate(-90 50 50)"
            style={{
              transition: "stroke-dashoffset 0.9s cubic-bezier(0.65, 0, 0.35, 1)",
              filter: "drop-shadow(0 0 1.6px rgba(124,147,255,0.9))",
            }}
          />
        </svg>

        {/* step nodes (pointer convenience; the legend beside is the keyboard/screen-reader control) */}
        {securityData.map((practice, i) => {
          const Icon = practice.icon;
          const isActive = phase === i;
          const isDone = complete || phase > i;
          return (
            <button
              key={practice.id}
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={() => select(i)}
              style={nodePos(i)}
              className={`absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-500 sm:h-14 sm:w-14 ${
                isActive
                  ? "scale-110 border-white/70 bg-white text-primary shadow-[0_0_0_6px_rgba(58,86,232,0.28),0_0_28px_rgba(124,147,255,0.65)]"
                  : isDone
                    ? "border-primary/60 bg-primary text-white"
                    : "border-white/[0.15] bg-navy-light text-white/[0.55]"
              }`}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          );
        })}

        {/* centre readout */}
        <div className="pointer-events-none absolute inset-[24%] flex flex-col items-center justify-center rounded-full text-center">
          <div key={phase} className="motion-safe:animate-fade-up">
            <span className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-white sm:h-12 sm:w-12">
              <ActiveIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9DB0FF] sm:text-[11px]">
              {complete ? "All layers" : `Step ${phase + 1} of ${N}`}
            </p>
            <p className="mt-1 text-[13px] font-bold leading-tight text-white sm:text-base">
              {active ? active.title : "End to end"}
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ the legend */}
      <ol className="space-y-2.5">
        {securityData.map((practice, i) => {
          const Icon = practice.icon;
          const isActive = phase === i;
          const isDone = complete || phase > i;
          return (
            <li key={practice.id}>
              <button
                type="button"
                onClick={() => select(i)}
                aria-current={isActive ? "step" : undefined}
                className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-300 sm:p-5 ${
                  isActive
                    ? "border-primary/50 bg-white/[0.07]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
                }`}
              >
                <span className="flex items-center gap-3.5">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                      isActive ? "bg-white text-primary" : isDone ? "bg-primary text-white" : "bg-white/[0.07] text-white/70"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/[0.45]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block text-base font-bold text-white">{practice.title}</span>
                  </span>
                </span>

                {/* description: always in the DOM, visually collapsed until active */}
                <span
                  className={`grid transition-all duration-500 ease-out ${
                    isActive ? "grid-rows-[1fr] pt-3 opacity-100" : "grid-rows-[0fr] pt-0 opacity-0"
                  }`}
                >
                  <span className="overflow-hidden pl-[54px] text-sm leading-relaxed text-white/70">
                    {practice.description}
                  </span>
                </span>

                {/* time-remaining bar for the active step */}
                {isActive && !reduced && (
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-white/[0.06]">
                    <span
                      key={`${phase}-${running}`}
                      className="block h-full origin-left bg-gradient-to-r from-primary to-[#9DB0FF] motion-safe:animate-bar-fill"
                      style={{ ["--dur" as string]: `${STEP_MS}ms`, animationPlayState: running ? "running" : "paused" }}
                    />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
