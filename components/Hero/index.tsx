"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import AnimatedCounter from "@/components/Common/AnimatedCounter";
import { IconCheck } from "@/components/Common/UiIcons";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-primary/[0.06] via-white to-white pb-20 pt-[160px] dark:from-primary/10 dark:via-gray-dark dark:to-gray-dark md:pb-24 md:pt-[190px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-primary/15 to-transparent dark:from-primary/20"
      />
      <div className="container relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div data-aos="fade-right">
            <span className="mb-5 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              Built for growth-focused teams
            </span>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-black dark:text-white md:text-5xl xl:text-[56px]">
              Enterprise-grade digital products with startup speed
            </h1>
            <p className="mb-8 max-w-[580px] text-lg leading-relaxed text-body-color dark:text-body-color-dark">
              Corefort Technologies designs and ships secure web, mobile, cloud,
              and cybersecurity solutions that help businesses scale with
              confidence.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white transition hover:bg-primary/90"
              >
                Book a Consultation
              </Link>
              <Link
                href="#Services"
                className="rounded-xl border border-stroke px-7 py-3.5 text-base font-semibold text-dark transition hover:border-primary hover:text-primary dark:border-stroke-dark dark:text-white"
              >
                Explore Services
              </Link>
            </div>
            <div className="mt-9 grid max-w-[520px] grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-xl border border-stroke bg-white/90 p-3 text-center shadow-sm dark:border-stroke-dark dark:bg-dark sm:p-4 sm:text-left">
                <p className="text-xl font-bold tabular-nums text-primary sm:text-2xl">
                  <AnimatedCounter end={120} suffix="+" />
                </p>
                <p className="mt-1 text-xs text-body-color dark:text-body-color-dark sm:text-sm">
                  Projects delivered
                </p>
              </div>
              <div className="rounded-xl border border-stroke bg-white/90 p-3 text-center shadow-sm dark:border-stroke-dark dark:bg-dark sm:p-4 sm:text-left">
                <p className="text-xl font-bold tabular-nums text-primary sm:text-2xl">
                  <AnimatedCounter end={98} suffix="%" />
                </p>
                <p className="mt-1 text-xs text-body-color dark:text-body-color-dark sm:text-sm">
                  Client retention
                </p>
              </div>
              <div className="rounded-xl border border-stroke bg-white/90 p-3 text-center shadow-sm dark:border-stroke-dark dark:bg-dark sm:p-4 sm:text-left">
                <p className="text-xl font-bold tabular-nums text-primary sm:text-2xl">
                  <AnimatedCounter end={24} suffix="/7" />
                </p>
                <p className="mt-1 text-xs text-body-color dark:text-body-color-dark sm:text-sm">
                  Monitoring support
                </p>
              </div>
            </div>
          </div>
          <div data-aos="fade-left">
            <div className="rounded-3xl border border-stroke bg-gradient-to-br from-primary/15 via-white to-yellow/10 p-6 shadow-three dark:border-stroke-dark dark:from-primary/25 dark:via-dark dark:to-bg-color-dark sm:p-8">
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Why businesses choose us
              </p>
              <div className="space-y-4">
                {[
                  "Security-first architecture and coding standards",
                  "Fast iteration with clear delivery milestones",
                  "Scalable cloud-native infrastructure",
                  "Dedicated support and transparent communication",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col items-center gap-2 rounded-xl border border-stroke bg-white/90 p-4 text-center dark:border-stroke-dark dark:bg-dark/60 sm:flex-row sm:items-start sm:gap-3 sm:text-left"
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm">
                      <IconCheck className="h-4 w-4" />
                    </span>
                    <p className="text-sm text-body-color dark:text-body-color-dark sm:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-20 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 -z-10 h-[260px] w-[260px] rounded-full bg-yellow/20 blur-3xl dark:bg-yellow/10" />
      <div className="absolute -left-20 top-0 -z-10 h-[260px] w-[260px] rounded-full bg-primary/10 blur-3xl" />
    </section>
  );
};

export default Hero;
