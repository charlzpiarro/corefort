import SectionTitle from "@/components/Common/SectionTitle";
import Stage from "@/components/Common/Stage";
import technologyData, { type TechCategory } from "./technologyData";

/** The same eight areas, arranged as a stack. Security is drawn as a rail because it applies to every layer. */
const LAYERS: { name: string; blurb: string; titles: string[] }[] = [
  { name: "Applications & intelligence", blurb: "What people and systems actually use", titles: ["Software", "AI", "Automation"] },
  { name: "Data & cloud platform", blurb: "Where the work runs and is stored", titles: ["Data", "Cloud"] },
  { name: "Infrastructure & connectivity", blurb: "The foundation everything sits on", titles: ["Infrastructure", "Networking"] },
];

const byTitle = (t: string) => technologyData.find((c) => c.title === t) as TechCategory;

const Technology = () => {
  const security = byTitle("Security");

  return (
    <Stage tone="blue">
      <div data-aos="fade-up">
        <SectionTitle
          eyebrow="Technical Depth"
          title="A Technical Foundation Built to Last"
          paragraph="Corefort operates across the full technology stack a modern business needs, engineered for reliability, not just launched and left."
          center
          light
          mb="52px"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_270px] lg:gap-5">
        {/* layers */}
        <div className="flex flex-col gap-4">
          {LAYERS.map((layer, li) => (
            <div key={layer.name} data-aos="fade-up" data-aos-delay={li * 80} className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
              <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#9DB0FF] to-amber" />
              <div className="flex flex-col gap-5 sm:flex-row sm:items-stretch sm:gap-6">
                <div className="sm:w-[190px] sm:shrink-0">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-amber">Layer {li + 1}</p>
                  <h3 className="text-lg font-bold leading-tight text-white">{layer.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/[0.6]">{layer.blurb}</p>
                </div>

                <div className="grid flex-1 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
                  {layer.titles.map((t) => {
                    const cat = byTitle(t);
                    return (
                      <div key={t} className="rounded-2xl border border-white/10 bg-ink/25 p-4 transition-colors duration-300 hover:border-amber/50 hover:bg-ink/40">
                        <p className="mb-2.5 text-sm font-bold text-white">{cat.title}</p>
                        <ul className="space-y-1.5">
                          {cat.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-white/[0.72]">
                              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#9DB0FF]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* security rail: runs across every layer */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="glass-strong relative flex flex-col overflow-hidden rounded-3xl border-amber/40 p-6 shadow-glow-amber"
        >
          <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-amber/25 blur-[70px]" />
          <p className="relative mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-amber">Across every layer</p>
          <h3 className="relative mb-1 text-2xl font-bold text-white">{security.title}</h3>
          <p className="relative mb-5 text-sm leading-relaxed text-white/[0.7]">Designed in from the architecture stage, not added at the end.</p>
          <ul className="relative mt-auto space-y-2.5">
            {security.items.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink/30 px-3.5 py-2.5 text-sm font-medium text-white">
                <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-amber shadow-[0_0_10px_2px_rgba(251,176,64,0.6)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Stage>
  );
};

export default Technology;
