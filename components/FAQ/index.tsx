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
  const items = limit ? faqData.slice(0, limit) : faqData;
  const grouped = limit
    ? null
    : CATEGORIES.map((category) => ({
        category,
        items: faqData.filter((item) => item.category === category),
      }));

  if (compact) {
    return (
      <Stage tone="tint">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start" data-aos="fade-up">
            <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
              FAQ
            </p>
            <h2 className="mb-4 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">Common questions</h2>
            <p className="mb-8 max-w-[40ch] text-lg leading-relaxed text-hero-body">
              Straight answers about how Corefort works, what we build, and how projects run.
            </p>
            <Link href="/faq" className="group inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary">
              View all FAQs
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex flex-col gap-3" data-aos="fade-up" data-aos-delay="80">
            {items.map((item) => (
              <FAQItemCard key={item.q} item={item} />
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
            {compact ? "Common questions" : "Browse by category"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-body-color dark:text-body-color-dark sm:text-base">
            Click a question to expand the answer.
          </p>
        </div>

        {grouped ? (
          <div className="flex flex-col gap-10">
            {grouped.map((group) => (
              <div key={group.category}>
                <h3 className="mb-4 text-sm font-semibold tracking-wide text-primary">
                  {group.category}
                </h3>
                <div className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <FAQItemCard key={item.q} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <FAQItemCard key={item.q} item={item} />
            ))}
          </div>
        )}

        {compact && (
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              View all FAQs
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

/** Native `<details>`/`<summary>`: keyboard- and screen-reader-accessible with no JS required. */
function FAQItemCard({ item }: { item: { q: string; a: string } }) {
  return (
    <details className="group overflow-hidden rounded-2xl border border-stroke bg-white shadow-one open:border-primary/30 dark:border-stroke-dark dark:bg-dark">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 transition hover:bg-primary/[0.04] dark:hover:bg-white/[0.04] sm:px-6 sm:py-5">
        <span className="text-base font-semibold text-black dark:text-white sm:text-lg">{item.q}</span>
        <span
          aria-hidden
          className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stroke bg-gray-light text-body-color transition group-open:rotate-180 group-open:border-primary/30 group-open:text-primary dark:border-stroke-dark dark:bg-bg-color-dark dark:text-body-color-dark"
        >
          <IconChevronDown className="h-4 w-4" />
        </span>
      </summary>
      <p className="border-t border-stroke px-5 pb-5 pt-4 text-sm leading-relaxed text-body-color dark:border-stroke-dark dark:text-body-color-dark sm:px-6 sm:pb-6 sm:text-base">
        {item.a}
      </p>
    </details>
  );
}

export default FAQ;
