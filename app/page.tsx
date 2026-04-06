import Blog from "@/components/Blog";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home - Corefort Technologies",
  keywords: "Corefort, Technologies, Web Development,Web Application, Cybersecurity, Digital Solutions",
  authors: [{ name: "Corefort Technologies" }],
  creator: "Corefort Technologies",
  publisher: "Corefort Technologies",
  description: "Corefort Technologies is a leading provider of innovative web development and cybersecurity solutions, dedicated to empowering businesses with cutting-edge technology.",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <section className="pb-8 md:pb-12">
        <div className="container">
          <div className="grid gap-6 rounded-3xl border border-stroke bg-gradient-to-br from-white via-white to-primary/[0.04] p-6 shadow-one dark:border-stroke-dark dark:from-dark dark:via-dark dark:to-primary/10 sm:p-8 md:grid-cols-3">
            {[
              {
                title: "Strategy",
                detail:
                  "Product and technology planning aligned with business goals.",
              },
              {
                title: "Execution",
                detail:
                  "Fast, high-quality delivery across web, mobile, and cloud.",
              },
              {
                title: "Security",
                detail:
                  "Built-in protection, monitoring, and long-term reliability.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-transparent bg-gray-light p-5 transition hover:border-primary/20 dark:bg-bg-color-dark sm:p-6"
              >
                <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="text-base text-body-color dark:text-body-color-dark">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Features />
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="rounded-3xl bg-primary px-6 py-10 text-center shadow-lg shadow-primary/25 md:px-14 md:py-12">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Need a reliable technology partner, not just a vendor?
            </h2>
            <p className="mx-auto mb-8 max-w-[700px] text-base text-white/90 md:text-lg">
              We combine business understanding, product thinking, and technical
              depth to help you launch faster and operate confidently.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-xl bg-white px-7 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
              >
                Talk to Our Team
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-white/50 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Learn More About Corefort
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Blog />
      <Contact />
    </>
  );
}
