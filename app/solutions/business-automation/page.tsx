import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import { IconCheck as CheckIcon } from "@/components/Common/UiIcons";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Business Automation | Corefort Technologies",
  description:
    "Corefort helps businesses automate repetitive operational work, from point-of-sale and inventory to sales and expense tracking.",
};

const OUTCOMES = [
  "Less time spent on manual, repetitive tasks",
  "Fewer errors from manual data entry and reconciliation",
  "Real-time visibility into sales, stock, and expenses",
  "Operations that keep working even without constant connectivity",
];

const TECHNOLOGIES = [
  "Cross-platform application development",
  "Offline-first data synchronization",
  "Cloud backend infrastructure",
  "Role-based multi-branch access control",
];

export default function BusinessAutomationPage() {
  return (
    <>
      <Breadcrumb
        pageName="Business Automation"
        description="Repetitive operational work consumes time that should go to growing the business."
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="prose-corefort space-y-10">
            <div>
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">The Problem</h2>
              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                Many growing businesses still run core operations (sales, inventory, expenses) through
                manual processes: paper records, disconnected spreadsheets, or tools that don&apos;t talk
                to each other. Every hour spent reconciling numbers by hand is an hour not spent serving
                customers or planning growth.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">Why It Matters</h2>
              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                Manual operations don&apos;t just cost time. They cap how much a business can handle.
                Errors compound, visibility disappears across branches, and decisions get made on
                outdated information. The businesses that scale smoothly are the ones that automate the
                operational bottleneck before it becomes a ceiling.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">Our Approach</h2>
              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                We start by identifying the specific process that&apos;s limiting growth, not by selling
                a generic automation platform. We design software around how the business actually
                operates, including the operating realities of the market: inconsistent connectivity,
                multi-branch operations, and staff who need tools that work without extensive training.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">Expected Outcomes</h2>
              <ul className="space-y-3">
                {OUTCOMES.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-base text-dark dark:text-white/[0.85]">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">Relevant Technology</h2>
              <div className="flex flex-wrap gap-2">
                {TECHNOLOGIES.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-stroke px-4 py-1.5 text-sm text-dark dark:border-white/10 dark:text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-secondary/[0.15] bg-secondary/5 p-6 dark:border-secondary/20">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-secondary">
                Built by Corefort
              </p>
              <h3 className="mb-2 text-lg font-bold text-black dark:text-white">LEDGE Biashara</h3>
              <p className="mb-4 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                Our own business management and POS platform is the direct product of this approach:
                offline-first, multi-branch, built for SMEs operating in real conditions, not idealized
                ones.
              </p>
              <Link
                href="/products/ledge-biashara"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-secondary"
              >
                Explore LEDGE Biashara
                <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
