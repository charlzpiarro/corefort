import SectionTitle from "@/components/Common/SectionTitle";
import technologyData from "./technologyData";

const Technology = () => {
  return (
    <section className="relative overflow-hidden bg-navy py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[600px] -translate-x-1/2 rounded-full bg-primary/[0.15] blur-[120px]" />

      <div className="container relative z-10">
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="Technical Depth"
            title="A Technical Foundation Built to Last"
            paragraph="Corefort operates across the full technology stack a modern business needs, engineered for reliability, not just launched and left."
            center
            light
            mb="64px"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {technologyData.map((category, index) => (
            <div
              key={category.id}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-primary/40 hover:bg-white/[0.06]"
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-gradient-brand">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-white/[0.65]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;
