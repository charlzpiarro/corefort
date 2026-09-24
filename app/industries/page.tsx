import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import industriesData from "@/components/Industries/industriesData";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Industries | Corefort Technologies",
  description:
    "Technology built around the operating realities of the industries Corefort Technologies serves.",
};

export default function IndustriesPage() {
  return (
    <>
      <Breadcrumb
        pageName="Industries"
        description="Corefort's engineering approach adapts to the operating realities of different sectors, not a one-size-fits-all template."
      />

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {industriesData.map((industry) => {
              const Icon = industry.icon;
              return (
                <article
                  key={industry.id}
                  id={industry.slug}
                  className="group flex scroll-mt-32 flex-col overflow-hidden rounded-3xl border border-stroke bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow dark:border-white/10 dark:bg-navy-light"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-navy">
                    <Image
                      src={industry.image}
                      alt={industry.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      style={{ objectPosition: industry.position }}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-primary/10"
                    />
                    <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/[0.15] text-white backdrop-blur-md">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="mb-2 text-xl font-bold text-black dark:text-white">
                      {industry.title}
                    </h2>
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                      {industry.description}
                    </p>
                    <Link
                        href={industry.href}
                        className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                      >
                        Learn More
                        <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
