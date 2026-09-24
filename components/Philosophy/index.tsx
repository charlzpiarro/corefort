import Link from "next/link";
import Stage from "@/components/Common/Stage";
import { IconTarget, IconCompass, IconLayers, IconArrowRight } from "@/components/Common/BrandIcons";

const PILLARS = [
  {
    icon: IconTarget,
    title: "Mission",
    body: "To help businesses, governments, and communities in Tanzania and beyond operate, connect, and grow through technology that's engineered to last.",
    surface: "bg-[linear-gradient(135deg,#1D3FD1_0%,#3A56E8_60%,#5B7BFF_100%)] text-white shadow-[0_24px_60px_-26px_rgba(58,86,232,0.75)]",
    bodyTone: "text-white/80",
    chip: "bg-white/[0.15] text-white",
    step: "lg:ml-0",
  },
  {
    icon: IconCompass,
    title: "Vision",
    body: "A future where secure, reliable digital infrastructure isn't a privilege reserved for large organizations, but a standard every business can build on.",
    surface: "bg-[linear-gradient(160deg,#0E1326_0%,#05060A_100%)] text-white",
    bodyTone: "text-white/[0.68]",
    chip: "bg-primary/25 text-[#9DB0FF]",
    step: "lg:ml-10",
  },
  {
    icon: IconLayers,
    title: "Philosophy",
    body: "We treat engineering as a craft: technology built properly, with security and scale considered from the start, not assembled as a quick fix.",
    surface: "bg-[linear-gradient(135deg,#FFD58A_0%,#FBB040_60%,#E8930C_100%)] text-ink shadow-glow-amber",
    bodyTone: "text-ink/75",
    chip: "bg-ink/10 text-ink",
    step: "lg:ml-20",
  },
];

const Philosophy = () => {
  return (
    <Stage tone="tint">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div data-aos="fade-up">
          <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Who We Are
          </p>
          <h2 className="mb-6 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-[56px]">
            Engineering as a{" "}
            <span className="relative inline-block">
              <span className="relative z-10">craft.</span>
              <span aria-hidden className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-full bg-amber/70 sm:h-4" />
            </span>
          </h2>
          <p className="mb-8 max-w-[46ch] text-lg leading-relaxed text-hero-body">
            What drives the decisions behind every system Corefort builds: technology made properly, with security and scale considered from the start.
          </p>
          <Link href="/company" className="group inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary">
            More About Corefort
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                data-aos="fade-up"
                data-aos-delay={index * 90}
                className={`group relative flex gap-5 overflow-hidden rounded-3xl p-6 transition duration-500 hover:-translate-y-1 sm:p-7 ${pillar.surface} ${pillar.step}`}
              >
                <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-white/20 opacity-60" />
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${pillar.chip}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <div className="relative">
                  <h3 className="mb-1.5 text-xl font-bold">{pillar.title}</h3>
                  <p className={`text-sm leading-relaxed sm:text-[15px] ${pillar.bodyTone}`}>{pillar.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Stage>
  );
};

export default Philosophy;
