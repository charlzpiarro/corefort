import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import partnersData from "@/components/Partners/partnersData";
import brandsData from "@/components/Brands/brandsData";
import LogoMarquee from "@/components/Brands/LogoMarquee";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Partners | Corefort Technologies",
  description: "The partner ecosystem behind Corefort Technologies' products and services.",
};

export default function PartnersPage() {
  return (
    <>
      <Breadcrumb
        pageName="Partners & Ecosystem"
        description="The organizations we work with, and the kinds of partner relationships behind our products."
      />

      <section className="overflow-hidden pt-16 md:pt-24">
        <div className="container max-w-4xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Working together</p>
          <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl">
            Organizations that work with Corefort
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-body-color dark:text-body-color-dark">
            A growing group of clinics, schools and businesses. We add to this list as new relationships are confirmed.
          </p>
        </div>
        <LogoMarquee brands={brandsData} />
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="mb-8 text-center text-xl font-bold text-black dark:text-white">
            The kinds of partnerships behind our work
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {partnersData.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="rounded-2xl border border-dashed border-stroke bg-white p-6 text-center dark:border-white/[0.15] dark:bg-navy-light"
                >
                  <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary dark:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mb-2 text-base font-bold text-black dark:text-white">
                    {category.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                    {category.description}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-body-color dark:text-body-color-dark">
            Interested in partnering with Corefort? We'd like to hear from you. Reach out through our
            contact page and mention the kind of partnership you have in mind.
          </p>
        </div>
      </section>

      <CTA />
    </>
  );
}
