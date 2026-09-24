"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const PHRASES = [
  "Introducing Ledge",
  "Built for the Future",
  "Intelligence, Refined",
  "Coming Soon",
];

const PARTICLES = [
  { left: "8%", top: "18%", delay: "0s" },
  { left: "16%", top: "70%", delay: "1.4s" },
  { left: "25%", top: "35%", delay: "0.6s" },
  { left: "34%", top: "82%", delay: "2s" },
  { left: "45%", top: "22%", delay: "1.2s" },
  { left: "54%", top: "65%", delay: "2.6s" },
  { left: "63%", top: "38%", delay: "0.8s" },
  { left: "72%", top: "78%", delay: "1.8s" },
  { left: "80%", top: "28%", delay: "2.2s" },
  { left: "88%", top: "62%", delay: "1s" },
];

export default function LedgeLaunchHero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visibleWordCount, setVisibleWordCount] = useState(1);
  const [isFading, setIsFading] = useState(false);

  const words = useMemo(() => PHRASES[phraseIndex].split(" "), [phraseIndex]);

  useEffect(() => {
    setVisibleWordCount(1);
    setIsFading(false);
  }, [phraseIndex]);

  useEffect(() => {
    if (visibleWordCount >= words.length) {
      const holdTimer = window.setTimeout(() => {
        setIsFading(true);
      }, 1300);

      const switchTimer = window.setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }, 1800);

      return () => {
        window.clearTimeout(holdTimer);
        window.clearTimeout(switchTimer);
      };
    }

    const typeTimer = window.setTimeout(() => {
      setVisibleWordCount((prev) => Math.min(prev + 1, words.length));
    }, 320);

    return () => window.clearTimeout(typeTimer);
  }, [visibleWordCount, words.length]);

  const visibleText = words.slice(0, visibleWordCount).join(" ");

  return (
    <section className="relative flex min-h-[82vh] items-center justify-center overflow-hidden bg-black px-6 text-white md:min-h-[88vh]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_42%),radial-gradient(circle_at_75%_70%,rgba(255,255,255,0.06),transparent_45%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_30%,rgba(255,255,255,0.02))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:54px_54px] opacity-[0.08]" />

      {PARTICLES.map((particle) => (
        <span
          key={`${particle.left}-${particle.top}`}
          className="pointer-events-none absolute h-1 w-1 animate-pulse rounded-full bg-white/70 blur-[0.8px]"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: "3.2s",
          }}
        />
      ))}

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <p className="mb-6 rounded-full border border-white/30 bg-white/[0.04] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 sm:text-xs">
          LEDGE
        </p>

        <h1
          className={`min-h-[120px] text-4xl font-semibold leading-tight tracking-tight transition-opacity duration-500 sm:min-h-[132px] sm:text-5xl md:min-h-[150px] md:text-6xl ${isFading ? "opacity-0" : "opacity-100"}`}
        >
          {visibleText}
          <span className="ml-2 inline-block h-[1em] w-[2px] animate-pulse bg-white/90 align-middle" />
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-white/75 sm:text-base md:text-lg">
          A new era of intelligent technology is almost here.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-white/90"
          >
            Notify Me
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-white/[0.55] bg-transparent px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-[10px] uppercase tracking-[0.22em]">Scroll</span>
          <span className="h-10 w-6 rounded-full border border-white/[0.45] p-1">
            <span className="block h-2 w-2 animate-bounce rounded-full bg-white/90" />
          </span>
        </div>
      </div>
    </section>
  );
}
