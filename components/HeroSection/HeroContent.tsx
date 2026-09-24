"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { jakarta } from "./font";
import { NetworkMap } from "./NetworkMap";
import { ArrowRightIcon, GridIcon } from "./icons";

const TRUST_BADGES = [
  { initials: "NP", from: "#2563EB", to: "#60A5FA" },
  { initials: "LB", from: "#7C3AED", to: "#A78BFA" },
  { initials: "CF", from: "#0EA5E9", to: "#38BDF8" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/**
 * The hero's content (badge, headline, CTAs, trust row, network map): full
 * width/bleed background, with an inner max-width just for the content grid.
 * Deliberately excludes the announcement bar and navbar, which are rendered
 * once, globally, by the site header (see components/Header).
 */
export function HeroContent() {
  return (
    <div className={`${jakarta.variable} bg-white font-jakarta`}>
      <section className="mx-auto grid max-w-[1600px] gap-10 px-6 py-12 sm:px-8 sm:py-14 md:min-h-[620px] md:grid-cols-[45%_55%] md:items-center md:gap-10 md:px-12 md:py-20 lg:px-16 xl:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.span
            variants={itemVariants}
            className="mb-6 inline-flex rounded-full bg-hero-primary-light px-4 py-1.5 text-[13px] font-semibold text-[#1D4ED8]"
          >
            Secure. Intelligent. Reliable.
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-[42px] font-extrabold leading-[1.02] tracking-tight text-hero-ink md:text-[56px] lg:text-[64px] xl:text-[72px]"
          >
            Powering Africa&apos;s
            <br />
            digital future.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-md text-lg leading-relaxed text-hero-body"
          >
            Software, cloud, cybersecurity and connectivity built for businesses, governments
            and communities. One partner, from Dar es Salaam to the continent.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-9 flex flex-col gap-3 md:flex-row">
            <CTAButton href="#solutions" icon={<ArrowRightIcon className="h-4 w-4" />}>
              Explore Solutions
            </CTAButton>
            <CTAButton href="#products" icon={<GridIcon className="h-4 w-4" />}>
              View Our Products
            </CTAButton>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-3">
              {TRUST_BADGES.map((badge) => (
                <span
                  key={badge.initials}
                  style={{ background: `linear-gradient(135deg, ${badge.from}, ${badge.to})` }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-sm"
                >
                  {badge.initials}
                </span>
              ))}
            </div>
            <p className="text-sm text-hero-body">
              Trusted by <span className="font-semibold text-hero-ink">businesses &amp; ISPs</span>{" "}
              across East Africa
            </p>
          </motion.div>
        </motion.div>

        <div className="relative">
          <NetworkMap />
        </div>
      </section>
    </div>
  );
}

function CTAButton({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <a
      href={href}
      aria-label={typeof children === "string" ? children : undefined}
      className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-hero-ink px-7 text-[15px] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-lg md:w-auto"
    >
      {icon}
      {children}
    </a>
  );
}
