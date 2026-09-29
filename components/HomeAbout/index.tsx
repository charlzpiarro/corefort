import Link from "next/link";
import Stage from "@/components/Common/Stage";
import { IconTarget, IconCompass, IconLayers, IconArrowRight } from "@/components/Common/BrandIcons";
import whyCorefortData from "@/components/WhyCorefort/whyCorefortData";

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

/**
 * Homepage "About": mission/vision/philosophy plus a condensed set of the reasons a client would
 * pick Corefort. Full detail lives on /company; this is the summary with a link there.
 */
const HomeAbout = () => {
  return (
    <Stage tone="tint" id="about">
      <div className="mb-14 grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div data-aos="fade-up">
          <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
            Who we are
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
            More about Corefort
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
                className="flex gap-5 rounded-3xl border border-stroke bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-navy-light sm:p-7"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="mb-1.5 text-xl font-bold text-ink dark:text-white">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark sm:text-[15px]">{pillar.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" data-aos="fade-up">
        {whyCorefortData.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="flex items-start gap-3 rounded-2xl border border-stroke bg-white p-4 dark:border-white/10 dark:bg-navy-light">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink dark:text-white">{item.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-body-color dark:text-body-color-dark">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Stage>
  );
};

export default HomeAbout;
