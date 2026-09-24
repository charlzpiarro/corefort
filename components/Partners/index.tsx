import Link from "next/link";
import SectionTitle from "@/components/Common/SectionTitle";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import partnersData from "./partnersData";

const Partners = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="Ecosystem"
            title="Partners & Ecosystem"
            paragraph="We're formalizing our named partner relationships across these categories. Details will be published here as they're confirmed."
            center
            mb="56px"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {partnersData.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                data-aos="fade-up"
                data-aos-delay={index * 60}
                className="rounded-2xl border border-dashed border-stroke bg-white p-6 text-center dark:border-white/[0.15] dark:bg-navy-light"
              >
                <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary dark:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mb-2 text-base font-bold text-black dark:text-white">
                  {category.title}
                </h3>
                <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center" data-aos="fade-up">
          <Link
            href="/partners"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Explore Our Ecosystem
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Partners;
