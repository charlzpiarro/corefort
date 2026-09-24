import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import { IconCheck } from "@/components/Common/UiIcons";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Payment & Financial Systems | Corefort Technologies",
  description:
    "Corefort builds payment infrastructure and financial systems for ISPs, hotspot operators, and businesses that need reliable transaction handling.",
};

const OUTCOMES = [
  "Automated payment collection instead of manual chasing",
  "Real-time visibility into transactions and reconciliation",
  "Agent and reseller management from a single system",
  "Fewer disputes from unclear or delayed billing",
];

const TECHNOLOGIES = [
  "Payment gateway integrations",
  "Transaction processing infrastructure",
  "Cloud-based billing systems",
  "Real-time usage and reconciliation dashboards",
];

export default function PaymentFinancialSystemsPage() {
  return (
    <>
      <Breadcrumb
        pageName="Payment & Financial Systems"
        description="Collecting and reconciling payments manually is slow and error-prone, especially at scale."
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="space-y-10">
            <div>
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">The Problem</h2>
              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                Businesses that collect payments from many customers or agents (ISPs billing hotspot
                users, resellers collecting on behalf of a provider) often rely on manual tracking:
                phone-based confirmations, paper logs, or disconnected mobile money records. It doesn&apos;t
                scale, and it makes reconciliation a monthly headache.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">Why It Matters</h2>
              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                Every unreconciled or delayed payment is a small trust problem between a business and the
                agents or customers it depends on. At scale, manual payment tracking becomes a real
                operational risk, and a real limit on how many agents or customers a business can
                support.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">Our Approach</h2>
              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                We build payment infrastructure that combines billing, collection, and reconciliation into
                one system, designed around how connectivity and payment businesses actually operate in
                this market, including agent networks and variable connectivity.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">Expected Outcomes</h2>
              <ul className="space-y-3">
                {OUTCOMES.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-base text-dark dark:text-white/[0.85]">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <IconCheck className="h-3.5 w-3.5" />
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

            <div className="rounded-2xl border border-primary/[0.15] bg-primary/5 p-6 dark:border-primary/20">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                Built by Corefort
              </p>
              <h3 className="mb-2 text-lg font-bold text-black dark:text-white">NetPurse</h3>
              <p className="mb-4 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                Our connectivity and payment infrastructure platform combines hotspot billing, agent
                management, and payment collection for ISPs and connectivity businesses.
              </p>
              <Link
                href="/products/netpurse"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                Explore NetPurse
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
