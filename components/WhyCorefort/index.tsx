import SectionTitle from "@/components/Common/SectionTitle";
import whyCorefortData from "./whyCorefortData";

const WhyCorefort = () => {
  return (
    <section id="why-corefort" className="scroll-mt-24 py-20 md:py-28">
      <div className="container">
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="Why Corefort"
            title="Technology That Goes Beyond the Code"
            paragraph="Delivery is only part of the job. Here's what shapes how Corefort builds and supports every system."
            center
            mb="64px"
          />
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-stroke bg-stroke dark:border-white/10 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {whyCorefortData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={index * 40}
                className="group bg-white p-6 transition-colors duration-300 hover:bg-gradient-brand-soft dark:bg-navy-light sm:p-7"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary dark:bg-white/[0.06] dark:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mb-1.5 text-base font-bold text-black dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyCorefort;
