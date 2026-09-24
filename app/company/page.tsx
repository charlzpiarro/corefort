import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import {
  IconTarget,
  IconCompass,
  IconLayers,
} from "@/components/Common/BrandIcons";
import whyCorefortData from "@/components/WhyCorefort/whyCorefortData";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Company | Corefort Technologies",
  description:
    "Corefort Technologies' mission, vision, values, and philosophy on building technology.",
};

const PILLARS = [
  {
    icon: IconTarget,
    title: "Mission",
    body: "To help businesses, governments, and communities in Tanzania and beyond operate, connect, and grow through technology that's engineered to last.",
  },
  {
    icon: IconCompass,
    title: "Vision",
    body: "A future where secure, reliable digital infrastructure isn't a privilege reserved for large organizations, but a standard every business can build on.",
  },
  {
    icon: IconLayers,
    title: "Philosophy",
    body: "We treat engineering as a craft: technology built properly, with security and scale considered from the start, not assembled as a quick fix.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <Breadcrumb
        pageName="Company"
        description="What drives the decisions behind every system Corefort builds."
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="mb-16 grid gap-6 sm:grid-cols-3">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-stroke bg-white p-6 dark:border-white/10 dark:bg-navy-light"
                >
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary dark:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mb-2 text-lg font-bold text-black dark:text-white">{pillar.title}</h2>
                  <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                    {pillar.body}
                  </p>
                </div>
              );
            })}
          </div>

          <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">Our Values</h2>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-stroke bg-stroke dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {whyCorefortData.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="bg-white p-6 dark:bg-navy-light">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary dark:bg-white/[0.06] dark:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mb-1.5 text-base font-bold text-black dark:text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                    {item.description}
                  </p>
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
