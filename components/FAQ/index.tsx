"use client";

import { useState } from "react";
import Link from "next/link";
import { IconChevronDown } from "@/components/Common/UiIcons";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import Stage from "@/components/Common/Stage";
import faqData, { FAQCategory } from "./faqData";

const CATEGORIES: FAQCategory[] = ["General", "Services", "Security", "Projects"];

type FAQProps = {
  /** Show only the first N items (flat, no category grouping); used for the homepage teaser. */
  limit?: number;
  /** Homepage teaser: adds a "View All FAQs" link and lighter heading. */
  compact?: boolean;
};

const FAQ = ({ limit, compact }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = limit ? faqData.slice(0, limit) : faqData;
  const grouped = limit
    ? null
    : CATEGORIES.map((category) => ({
        category,
        items: faqData.filter((item) => item.category === category),
      }));

  let runningIndex = 0;

  if (compact) {
    return (
      <Stage tone="tint">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start" data-aos="fade-up">
            <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              FAQ
            </p>
            <h2 className="mb-4 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">Common Questions</h2>
            <p className="mb-8 max-w-[40ch] text-lg leading-relaxed text-hero-body">
              Straight answers about how Corefort works, what we build, and how projects run.
            </p>
            <Link href="/faq" className="group inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary">
              View All FAQs
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex flex-col gap-3" data-aos="fade-up" data-aos-delay="80">
            {items.map((item, index) => (
              <FAQItemCard key={item.q} item={item} index={index} openIndex={openIndex} setOpenIndex={setOpenIndex} glass />
            ))}
          </div>
        </div>
      </Stage>
    );
  }

  return (
    <section className={compact ? "py-20 md:py-28" : "pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24"}>
      <div className="container max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white sm:text-3xl">
            {compact ? "Common Questions" : "Browse by Category"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-body-color dark:text-body-color-dark sm:text-base">
            Click a question to expand the answer.
          </p>
        </div>

        {grouped ? (
          <div className="flex flex-col gap-10">
            {grouped.map((group) => (
              <div key={group.category}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-primary">
                  {group.category}
                </h3>
                <div className="flex flex-col gap-3">
                  {group.items.map((item) => {
                    const index = runningIndex++;
                    return <FAQItemCard key={item.q} item={item} index={index} openIndex={openIndex} setOpenIndex={setOpenIndex} />;
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item, index) => (
              <FAQItemCard key={item.q} item={item} index={index} openIndex={openIndex} setOpenIndex={setOpenIndex} />
            ))}
          </div>
        )}

        {compact && (
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              View All FAQs
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

function FAQItemCard({
  item,
  index,
  openIndex,
  setOpenIndex,
  glass = false,
}: {
  glass?: boolean;
  item: { q: string; a: string };
  index: number;
  openIndex: number | null;
  setOpenIndex: (updater: (prev: number | null) => number | null) => void;
}) {
  const isOpen = openIndex === index;
  return (
    <div className={`overflow-hidden rounded-2xl transition ${glass ? `glass-light ${isOpen ? "!border-amber/60 shadow-glow-amber" : ""}` : "border border-stroke bg-white shadow-one dark:border-stroke-dark dark:bg-dark"}`}>
      <button
        type="button"
        id={`faq-trigger-${index}`}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-primary/[0.04] dark:hover:bg-white/[0.04] sm:px-6 sm:py-5"
      >
        <span className="text-base font-semibold text-black dark:text-white sm:text-lg">{item.q}</span>
        <span
          className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stroke bg-gray-light text-body-color transition dark:border-stroke-dark dark:bg-bg-color-dark dark:text-body-color-dark ${
            isOpen ? "rotate-180 border-primary/30 text-primary" : ""
          }`}
          aria-hidden
        >
          <IconChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-trigger-${index}`}
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="border-t border-stroke px-5 pb-5 pt-4 text-sm leading-relaxed text-body-color dark:border-stroke-dark dark:text-body-color-dark sm:px-6 sm:pb-6 sm:text-base">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
