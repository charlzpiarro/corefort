import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import { IconCheck } from "@/components/Common/UiIcons";
import ProductCard from "@/components/Products/ProductCard";
import productsData from "@/components/Products/productsData";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "NetPurse | Corefort Technologies",
  description:
    "NetPurse is a connectivity and payment infrastructure platform designed for ISPs, hotspot operators, and connectivity businesses.",
};

const netpurse = productsData.find((p) => p.id === "product-netpurse")!;

const TARGET_USERS = [
  "Internet service providers (ISPs)",
  "Hotspot and Wi-Fi operators",
  "Agents and resellers managing connectivity access",
];

const CAPABILITIES = [
  {
    title: "Billing & Access",
    detail: "Manage hotspot and data billing without manual tracking.",
  },
  {
    title: "Payment Collection",
    detail: "Automated collection reduces the gap between service delivery and payment.",
  },
  {
    title: "Agent Management",
    detail: "Onboard and oversee agents and resellers from one system.",
  },
  {
    title: "Usage Analytics",
    detail: "Real-time visibility into sessions, usage, and revenue.",
  },
];

export default function NetPursePage() {
  return (
    <>
      <Breadcrumb
        pageName="NetPurse"
        description="A connectivity and payment infrastructure platform designed for ISPs and businesses."
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="mb-14 grid gap-8 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">Who It&apos;s For</h2>
              <ul className="space-y-2.5">
                {TARGET_USERS.map((user) => (
                  <li key={user} className="flex items-start gap-2.5 text-base text-dark dark:text-white/[0.85]">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
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
              <p className="text-base font-bold text-black dark:text-white">{netpurse.category}</p>
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
          <ProductCard product={netpurse} onDetailPage />

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Talk to Us About NetPurse
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
