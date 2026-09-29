"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/Common/SectionTitle";
import Stage from "@/components/Common/Stage";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import servicesData from "@/components/Services/servicesData";

/**
 * The site's "what we build" section: six practice areas, one engineering team.
 * Replaces the old Core Capabilities + Business Problems + Technical Depth trio with a single
 * explorer, each practice linking to a real page. Solid panels only — glass is reserved for the
 * sticky nav and hero cards.
 */
export default function WhatWeBuild() {
  const [active, setActive] = useState(0);
  const service = servicesData[active];

  return (
    <Stage tone="ink" id="what-we-build">
      <div data-aos="fade-up">
        <SectionTitle
          eyebrow="What we build"
          title="Technology built around your business"
          paragraph="Six practice areas, one engineering team. Corefort covers the full stack of software, infrastructure, and security a modern business depends on."
          center
          light
          mb="48px"
        />
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-8">
        {/* list */}
        <ul role="tablist" aria-label="Practice areas" aria-orientation="vertical" className="flex flex-col gap-2">
          {servicesData.map((item, i) => {
            const Icon = item.icon;
            const on = i === active;
            return (
              <li key={item.id} role="presentation">
                <button
                  type="button"
                  role="tab"
                  id={`wwb-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`wwb-panel-${i}`}
                  tabIndex={on ? 0 : -1}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                      e.preventDefault();
                      const next = (i + (e.key === "ArrowDown" ? 1 : servicesData.length - 1)) % servicesData.length;
                      setActive(next);
                      document.getElementById(`wwb-tab-${next}`)?.focus();
                    }
                  }}
                  className={`group relative flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 sm:px-5 ${
                    on ? "border-amber/50 bg-white/[0.08]" : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                  }`}
                >
                  <span aria-hidden className={`absolute inset-y-3 left-0 w-[3px] rounded-full bg-amber transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`} />
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${on ? "bg-amber text-ink" : "bg-white/[0.07] text-white/75 group-hover:text-white"}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-base font-bold ${on ? "text-white" : "text-white/80"}`}>{item.title}</span>
                    <span className={`block text-sm leading-snug ${on ? "text-white/70" : "text-white/45"}`}>{item.description}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* panel */}
        <div className="relative min-h-[340px] overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,#12225E_0%,#1D3FD1_60%,#3A56E8_100%)] p-7 shadow-[0_30px_80px_-30px_rgba(58,86,232,0.7)] sm:p-10">
          <span aria-hidden className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-white/[0.15]" />
          <span aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-amber/20 blur-[90px]" />

          {servicesData.map((item, i) => {
            const Icon = item.icon;
            const on = i === active;
            return (
              <div
                key={item.id}
                id={`wwb-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`wwb-tab-${i}`}
                hidden={!on}
                className={on ? "relative grid items-center gap-7 motion-safe:animate-fade-up lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-8" : "hidden"}
              >
                <div className="relative">
                  <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <Icon className="h-8 w-8" />
                  </span>
                  <h3 className="mb-3 text-3xl font-bold text-white sm:text-4xl">{item.title}</h3>
                  <p className="mb-7 max-w-[46ch] text-base leading-relaxed text-white/80 sm:text-lg">{item.description}</p>

                  <ul className="relative mb-7 flex flex-wrap gap-2.5">
                    {item.points.map((p) => (
                      <li key={p} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                        <span aria-hidden className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-amber align-middle" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <Link href={item.href} className="group inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-amber-soft">
                    Learn more
                    <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>

                <div className="relative order-first lg:order-none">
                  {item.image ? (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/25 lg:aspect-[4/3] shadow-[0_24px_60px_-20px_rgba(2,8,60,0.8)]">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(min-width: 1024px) 34vw, 90vw"
                        style={{ objectPosition: item.image.position ?? "50% 50%" }}
                        className="object-cover"
                      />
                      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1466]/55 via-transparent to-[#3A56E8]/10" />
                    </div>
                  ) : (
                    <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] lg:aspect-[4/3]">
                      <span aria-hidden className="absolute h-56 w-56 rounded-full border border-white/20" />
                      <span aria-hidden className="absolute h-36 w-36 rounded-full border border-white/25" />
                      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-amber text-ink shadow-glow-amber">
                        <Icon className="h-9 w-9" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Stage>
  );
}
