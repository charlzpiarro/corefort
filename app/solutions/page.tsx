import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import solutionsData from "@/components/Solutions/solutionsData";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Solutions | Corefort Technologies",
  description:
    "The business problems Corefort Technologies solves: digital transformation, automation, infrastructure modernization, security, connectivity, payments, and more.",
};

export default function SolutionsPage() {
  return (
    <>
      <Breadcrumb
        pageName="Solutions"
        description="Not a list of technologies. These are the operational problems we get called in to fix, and how we approach each one."
      />

      <section className="pb-4 pt-2">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-stroke bg-white shadow-card dark:border-white/10 dark:bg-navy-light lg:min-h-[420px]">
            <Image
              src="/images/solutions/solutions-puzzle.webp"
              alt="A hand placing the Corefort piece into a wall of connected blocks representing cloud, security, networking, code, and data"
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 70vw, 100vw"
              priority
              className="h-auto w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[68%] lg:object-cover lg:object-right"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-[62%] bg-gradient-to-r from-white via-white/95 to-transparent dark:from-navy-light dark:via-navy-light/95 lg:block"
            />
            <div className="relative z-10 p-8 sm:p-10 lg:flex lg:min-h-[420px] lg:max-w-[48%] lg:flex-col lg:justify-center lg:p-14">
              <span className="mb-4 inline-flex w-fit rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                One connected system
              </span>
              <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white md:text-4xl">
                Every solution fits into the next.
              </h2>
              <p className="mb-7 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                Cloud, security, networks, software, and data aren&apos;t separate projects. We design
                them as one system, so solving one problem doesn&apos;t create the next.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Talk to Our Team
                  <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center rounded-xl border border-stroke px-6 py-3 text-sm font-semibold text-dark transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:text-white"
                >
                  See What We&apos;ve Built
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-8 text-2xl font-bold text-black dark:text-white">
            The problems we solve
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutionsData.map((solution) => {
              const Icon = solution.icon;
              return (
                <div
                  key={solution.id}
                  id={solution.id}
                  className="scroll-mt-32 flex flex-col rounded-2xl border border-stroke bg-white p-6 dark:border-white/10 dark:bg-navy-light"
                >
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary dark:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mb-2 text-lg font-bold text-black dark:text-white">{solution.title}</h2>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                    {solution.problem}
                  </p>
                  {solution.href ? (
                    <Link
                      href={solution.href}
                      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                    >
                      Learn More
                      <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <span className="text-sm font-medium text-body-color/60 dark:text-body-color-dark/60">
                      Detail page coming soon
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
