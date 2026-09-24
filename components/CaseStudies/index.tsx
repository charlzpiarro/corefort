import SectionTitle from "@/components/Common/SectionTitle";
import Image from "next/image";
import productsData from "@/components/Products/productsData";
import caseStudiesData from "./caseStudiesData";

const FIELD_ORDER: { key: "challenge" | "solution" | "technology" | "outcome"; label: string }[] = [
  { key: "challenge", label: "Challenge" },
  { key: "solution", label: "Solution" },
  { key: "technology", label: "Technology" },
  { key: "outcome", label: "Outcome" },
];

const CaseStudies = () => {
  return (
    <section id="work" className="scroll-mt-24 py-20 md:py-28">
      <div className="container">
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="Engineering in Practice"
            title="Built by Corefort, Running in Production"
            paragraph="Real platforms Corefort designed and engineered end-to-end: the work behind the products, not marketing claims."
            center
            mb="64px"
          />
        </div>

        <div className="flex flex-col gap-8">
          {caseStudiesData.map((study, index) => {
            const isSecondary = study.accent === "secondary";
            const logo = productsData.find((p) => p.name === study.client)?.logo;
            return (
              <div
                key={study.id}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="grid overflow-hidden rounded-3xl border border-stroke shadow-card dark:border-white/10 dark:shadow-card-dark lg:grid-cols-[0.85fr,1.15fr]"
              >
                <div
                  className={`relative flex min-h-[220px] flex-col justify-between overflow-hidden p-8 text-white ${
                    isSecondary
                      ? "bg-[linear-gradient(145deg,#3B1E85_0%,#7C3AED_100%)]"
                      : "bg-[linear-gradient(145deg,#12225E_0%,#3A56E8_100%)]"
                  }`}
                >
                  <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dark opacity-20" />
                  <div aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                  <div className="relative z-10">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em]">
                      {study.industry}
                    </span>
                    <h3 className="text-2xl font-bold sm:text-3xl">{study.client}</h3>
                  </div>
                  <span
                    className={`relative z-10 flex h-14 items-center justify-center self-start rounded-xl p-2.5 ${
                      logo?.tone === "dark" ? "w-28 bg-black ring-1 ring-white/20" : "w-14 bg-white"
                    }`}
                  >
                    {logo && (
                      <Image src={logo.src} alt="" width={logo.width} height={logo.height} sizes="112px" className="h-auto max-h-full w-auto max-w-full object-contain" />
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 bg-white p-8 dark:bg-navy-light sm:grid-cols-2 sm:p-10">
                  {FIELD_ORDER.map((field) => (
                    <div key={field.key}>
                      <p
                        className={`mb-2 text-xs font-semibold uppercase tracking-[0.15em] ${
                          isSecondary ? "text-secondary" : "text-primary"
                        }`}
                      >
                        {field.label}
                      </p>
                      <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                        {study[field.key]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
