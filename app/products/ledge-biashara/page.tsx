import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import { IconCheck } from "@/components/Common/UiIcons";
import ProductCard from "@/components/Products/ProductCard";
import productsData from "@/components/Products/productsData";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "LEDGE Biashara | Corefort Technologies",
  description:
    "LEDGE Biashara is a business management and point-of-sale platform designed for SMEs, built offline-first for real operating conditions.",
};

const ledge = productsData.find((p) => p.id === "product-ledge-biashara")!;

const TARGET_USERS = [
  "Retail businesses managing daily sales and inventory",
  "SMEs operating across multiple branches",
  "Business owners who need visibility without constant connectivity",
];

const CAPABILITIES = [
  {
    title: "Point of Sale",
    detail: "Record sales and manage inventory from a single interface.",
  },
  {
    title: "Expense Tracking",
    detail: "Sales and expenses tracked together for a real picture of the business.",
  },
  {
    title: "Multi-Branch Oversight",
    detail: "Manage several locations from one account, synced automatically.",
  },
  {
    title: "Offline-First",
    detail: "Keeps working during connectivity gaps, then syncs when back online.",
  },
];

export default function LedgeBiasharaPage() {
  return (
    <>
      <Breadcrumb
        pageName="LEDGE Biashara"
        description="A business management and POS platform designed for SMEs."
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="mb-14 grid gap-8 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">Who It&apos;s For</h2>
              <ul className="space-y-2.5">
                {TARGET_USERS.map((user) => (
                  <li key={user} className="flex items-start gap-2.5 text-base text-dark dark:text-white/[0.85]">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber/25 text-amber-deep">
                      <IconCheck className="h-3 w-3" />
                    </span>
                    {user}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-stroke bg-gray-light p-5 dark:border-white/10 dark:bg-bg-color-dark">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-body-color dark:text-body-color-dark">
                Category
              </p>
              <p className="text-base font-bold text-black dark:text-white">{ledge.category}</p>
            </div>
          </div>

          <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">Key Capabilities</h2>
          <div className="mb-14 grid gap-5 sm:grid-cols-2">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="rounded-2xl border border-stroke bg-white p-5 dark:border-white/10 dark:bg-navy-light"
              >
                <h3 className="mb-1.5 text-base font-bold text-black dark:text-white">{cap.title}</h3>
                <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                  {cap.detail}
                </p>
              </div>
            ))}
          </div>

          <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">The Platform</h2>
          <ProductCard product={ledge} onDetailPage />

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-ink px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-ink/[0.85]"
            >
              Talk to Us About LEDGE Biashara
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
