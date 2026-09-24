"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import processData from "./processData";

const N = processData.length;
const STEP = 0.5; // seconds between nodes lighting up

/**
 * Timeline for the five delivery steps. On large screens the steps zig-zag above and below a line that fills
 * as the section scrolls into view; on smaller screens it becomes a simple vertical timeline.
 * Reduced-motion visitors get the finished state immediately.
 */
export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  const nodeStyle = (i: number) => ({ transitionDelay: `${i * STEP}s` });

  return (
    <div ref={ref}>
      {/* ---------- large screens: zig-zag ---------- */}
      <div className="relative hidden lg:block">
        {/* track + fill, centred on the node row */}
        <div aria-hidden className="absolute inset-x-[10%] top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-primary/[0.15]" />
        <div
          aria-hidden
          className="absolute inset-x-[10%] top-1/2 h-[3px] -translate-y-1/2 origin-left rounded-full bg-gradient-to-r from-primary via-[#7C93FF] to-amber transition-transform ease-out motion-reduce:transition-none"
          style={{ transform: `translateY(-50%) scaleX(${inView ? 1 : 0})`, transitionDuration: `${(N - 1) * STEP + 0.6}s` }}
        />

        <div className="grid grid-cols-5 gap-x-5 [grid-template-rows:minmax(190px,auto)_72px_minmax(190px,auto)]">
          {processData.map((step, i) => {
            const Icon = step.icon;
            const up = i % 2 === 0; // steps 1, 3, 5 sit above the line
            return (
              <div key={step.id} className="contents">
                {/* card */}
                <div
                  className={`relative ${up ? "row-start-1 flex items-end pb-6" : "row-start-3 flex items-start pt-6"}`}
                  style={{ gridColumnStart: i + 1 }}
                >
                  <div className="glass-light w-full rounded-2xl p-5 transition duration-300 hover:-translate-y-1">
                    <p className="mb-1 text-xs font-bold tracking-[0.2em] text-amber-deep">{step.number}</p>
                    <h3 className="mb-1.5 text-lg font-bold text-ink">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-hero-body">{step.description}</p>
                  </div>
                  {/* connector to the node */}
                  <span aria-hidden className={`absolute left-1/2 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-primary/40 to-primary/0 ${up ? "bottom-0 rotate-180" : "top-0"}`} />
                </div>

                {/* node */}
                <div className="row-start-2 flex items-center justify-center" style={{ gridColumnStart: i + 1 }}>
                  <span
                    className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white transition-all duration-500 motion-reduce:transition-none ${
                      inView ? "border-amber text-primary shadow-[0_0_0_6px_rgba(251,176,64,0.2),0_10px_30px_-8px_rgba(58,86,232,0.5)]" : "border-primary/20 text-primary/40"
                    }`}
                    style={nodeStyle(i)}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------- smaller screens: vertical ---------- */}
      <ol className="relative lg:hidden">
        <span aria-hidden className="absolute bottom-6 left-[27px] top-6 w-[3px] rounded-full bg-primary/[0.15]" />
        <span
          aria-hidden
          className="absolute left-[27px] top-6 w-[3px] origin-top rounded-full bg-gradient-to-b from-primary to-amber transition-transform ease-out motion-reduce:transition-none"
          style={{ height: "calc(100% - 3rem)", transform: `scaleY(${inView ? 1 : 0})`, transitionDuration: `${(N - 1) * STEP + 0.6}s` }}
        />
        {processData.map((step, i) => {
          const Icon = step.icon;
          return (
            <li key={step.id} className="relative flex gap-5 pb-6 last:pb-0">
              <span
                className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-all duration-500 motion-reduce:transition-none ${
                  inView ? "border-amber text-primary shadow-[0_0_0_5px_rgba(251,176,64,0.2)]" : "border-primary/20 text-primary/40"
                }`}
                style={nodeStyle(i)}
              >
                <Icon className="h-6 w-6" />
              </span>
              <div className="glass-light flex-1 rounded-2xl p-5">
                <p className="mb-1 text-xs font-bold tracking-[0.2em] text-amber-deep">{step.number}</p>
                <h3 className="mb-1.5 text-lg font-bold text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-hero-body">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
