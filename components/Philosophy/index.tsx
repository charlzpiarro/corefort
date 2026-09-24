import Link from "next/link";
import SectionTitle from "@/components/Common/SectionTitle";
import { IconTarget, IconCompass, IconLayers, IconArrowRight } from "@/components/Common/BrandIcons";

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

const Philosophy = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="Who We Are"
            title="How We Think About Technology"
            paragraph="What drives the decisions behind every system Corefort builds."
            center
            mb="56px"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                data-aos="fade-up"
                data-aos-delay={index * 60}
                className="rounded-2xl border border-stroke bg-white p-6 dark:border-white/10 dark:bg-navy-light"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary dark:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mb-2 text-base font-bold text-black dark:text-white">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                  {pillar.body}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center" data-aos="fade-up">
          <Link
            href="/company"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            More About Corefort
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
