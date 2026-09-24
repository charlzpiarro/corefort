"use client";

import { useState } from "react";
import servicesData from "./servicesData";

/**
 * Two-panel explorer: pick a practice on the left, read it on a large glass panel on the right.
 * Hover (or tap / arrow keys / Enter) selects. Every description stays in the DOM, so it is readable
 * by search engines and screen readers; only the selected one is shown.
 */
export default function ServiceExplorer() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-8">
      {/* list */}
      <ul role="tablist" aria-label="Practice areas" aria-orientation="vertical" className="flex flex-col gap-2">
        {servicesData.map((service, i) => {
          const Icon = service.icon;
          const on = i === active;
          return (
            <li key={service.id} role="presentation">
              <button
                type="button"
                role="tab"
                id={`svc-tab-${i}`}
                aria-selected={on}
                aria-controls={`svc-panel-${i}`}
                tabIndex={on ? 0 : -1}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault();
                    const next = (i + (e.key === "ArrowDown" ? 1 : servicesData.length - 1)) % servicesData.length;
                    setActive(next);
                    document.getElementById(`svc-tab-${next}`)?.focus();
                  }
                }}
                className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 sm:px-5 ${
                  on
                    ? "glass-strong border-amber/40 shadow-glow-amber"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                }`}
              >
                {/* amber marker */}
                <span
                  aria-hidden
                  className={`absolute inset-y-3 left-0 w-[3px] rounded-full bg-amber transition-all duration-300 ${on ? "opacity-100" : "opacity-0"}`}
                />
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                    on ? "bg-amber text-ink" : "bg-white/[0.07] text-white/75 group-hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-[11px] font-semibold uppercase tracking-[0.18em] ${on ? "text-amber" : "text-white/40"}`}>
                    {service.number}
                  </span>
                  <span className={`block text-base font-bold ${on ? "text-white" : "text-white/80"}`}>{service.title}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* panel */}
      <div className="relative min-h-[340px] overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,#12225E_0%,#1D3FD1_60%,#3A56E8_100%)] p-7 shadow-[0_30px_80px_-30px_rgba(58,86,232,0.7)] sm:p-10">
        <span aria-hidden className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/[0.15]" />
        <span aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/20" />
        <span aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-amber/20 blur-[90px]" />

        {servicesData.map((service, i) => {
          const Icon = service.icon;
          const on = i === active;
          return (
            <div
              key={service.id}
              id={`svc-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`svc-tab-${i}`}
              hidden={!on}
              className={`relative ${on ? "motion-safe:animate-fade-up" : ""}`}
            >
              <span aria-hidden className="pointer-events-none absolute -bottom-10 right-0 select-none text-[190px] font-extrabold leading-none text-white/[0.07]">
                {service.number}
              </span>

              <span className="glass mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-white">
                <Icon className="h-8 w-8" />
              </span>
              <h3 className="mb-3 text-3xl font-bold text-white sm:text-4xl">{service.title}</h3>
              <p className="mb-8 max-w-[46ch] text-base leading-relaxed text-white/80 sm:text-lg">{service.description}</p>

              <ul className="relative flex flex-wrap gap-2.5">
                {service.points.map((p) => (
                  <li key={p} className="glass rounded-full px-4 py-2 text-sm font-medium text-white">
                    <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-amber align-middle" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
