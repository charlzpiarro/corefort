import SectionTitle from "@/components/Common/SectionTitle";
import processData from "./processData";

const Process = () => {
  return (
    <section id="process" className="scroll-mt-24 py-20 md:py-28">
      <div className="container">
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="How We Work"
            title="From Idea to Production"
            paragraph="A clear, repeatable engineering process that takes a project from first conversation to a system running reliably in production."
            center
            mb="64px"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {processData.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="group flex h-full flex-col rounded-2xl border border-stroke bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card dark:border-white/10 dark:bg-navy-light dark:hover:border-primary/40 dark:hover:shadow-card-dark"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary transition-transform duration-300 group-hover:-translate-y-0.5 dark:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-body-color/50 dark:text-white/[0.25]">
                    {step.number}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-black dark:text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
