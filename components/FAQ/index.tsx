"use client";

import { useState } from "react";
import { IconChevronDown } from "@/components/Common/UiIcons";

const faqs = [
  {
    q: "What services does Corefort provide?",
    a: "We provide web and mobile development, hosting, cybersecurity solutions, cloud support, and custom enterprise software delivery.",
  },
  {
    q: "How fast can we start a project?",
    a: "Most projects can begin within a few days after discovery, scope confirmation, and timeline alignment with your team.",
  },
  {
    q: "Do you support existing systems?",
    a: "Yes. We can maintain, secure, optimize, and modernize existing platforms even if they were built by another provider.",
  },
  {
    q: "Can plans scale as our business grows?",
    a: "Yes. Our infrastructure and delivery model are built to scale from small launches to enterprise-grade workloads.",
  },
  {
    q: "How do you handle security?",
    a: "Security is integrated into architecture, coding standards, deployment practices, and ongoing monitoring across environments.",
  },
  {
    q: "How can I contact support?",
    a: "Use the contact page form or call our team directly. We prioritize urgent requests and provide clear follow-up updates.",
  },
] as const;

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24">
      <div className="container max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white sm:text-3xl">
            Common questions
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-body-color dark:text-body-color-dark sm:text-base">
            Click a question to expand the answer. Opening another closes the
            previous one.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-stroke bg-white shadow-one transition dark:border-stroke-dark dark:bg-dark"
              >
                <button
                  type="button"
                  id={`faq-trigger-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() =>
                    setOpenIndex((prev) => (prev === index ? null : index))
                  }
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-primary/[0.04] dark:hover:bg-white/[0.04] sm:px-6 sm:py-5"
                >
                  <span className="text-base font-semibold text-black dark:text-white sm:text-lg">
                    {item.q}
                  </span>
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
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
