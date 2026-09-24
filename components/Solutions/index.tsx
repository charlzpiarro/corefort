import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/Common/SectionTitle";
import Stage from "@/components/Common/Stage";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import solutionsData from "./solutionsData";

type Variant = "blue" | "ink" | "amber" | "sky" | "white" | "deep";

/**
 * Bento on 4 columns (lg), every cell filled:
 *   r1: [ A (2) ][ B ][ C ]     r2: [ D ][ E ][ F (2) ]     r3: [ G (2) ][ H (2) ]
 * Tiles follow the order of solutionsData; the look is chosen here.
 */
const LAYOUT: { area: string; variant: Variant }[] = [
  { area: "sm:col-span-2", variant: "blue" },
  { area: "", variant: "white" },
  { area: "", variant: "amber" },
  { area: "", variant: "ink" },
  { area: "", variant: "sky" },
  { area: "sm:col-span-2", variant: "deep" },
  { area: "sm:col-span-2", variant: "sky" },
  { area: "sm:col-span-2", variant: "ink" },
];

const SURFACE: Record<Variant, string> = {
  blue: "bg-[linear-gradient(135deg,#1D3FD1_0%,#3A56E8_60%,#5B7BFF_100%)] text-white shadow-[0_24px_60px_-26px_rgba(58,86,232,0.75)]",
  ink: "bg-[linear-gradient(160deg,#0E1326_0%,#05060A_100%)] text-white",
  amber: "bg-[linear-gradient(135deg,#FFD58A_0%,#FBB040_60%,#E8930C_100%)] text-ink shadow-glow-amber",
  sky: "bg-[#DCE8FF] text-ink",
  white: "border border-stroke bg-white text-ink shadow-card",
  deep: "bg-[linear-gradient(135deg,#0A0E1A_0%,#12225E_55%,#2447D8_100%)] text-white",
};
const BODY: Record<Variant, string> = {
  blue: "text-white/80",
  ink: "text-white/[0.65]",
  amber: "text-ink/75",
  sky: "text-ink/70",
  white: "text-body-color",
  deep: "text-white/75",
};
const CHIP: Record<Variant, string> = {
  blue: "bg-white/[0.15] text-white",
  ink: "bg-primary/25 text-[#9DB0FF]",
  amber: "bg-ink/10 text-ink",
  sky: "bg-white text-primary",
  white: "bg-tint text-primary",
  deep: "bg-white/10 text-[#FFD58A]",
};

const Solutions = () => {
  return (
    <Stage tone="light" id="solutions">
      <div className="mb-14 grid items-center gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:gap-14">
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="Solutions"
            title="Business Problems We Solve"
            paragraph="Not a list of technologies. These are the actual operational problems Corefort gets called in to fix, and how we approach them. Each piece fits the next: cloud, security, networks, software, and data working as one system."
            mb="32px"
          />
          <Link
            href="/solutions"
            className="group inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary"
          >
            View All Solutions
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-stroke shadow-card" data-aos="fade-up" data-aos-delay="100">
          <Image
            src="/images/solutions/solutions-puzzle.webp"
            alt="A hand placing the Corefort piece into a wall of connected blocks representing cloud, security, networking, code, and data"
            width={1536}
            height={1024}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[210px] lg:grid-cols-4">
        {solutionsData.map((solution, index) => {
          const { area, variant } = LAYOUT[index] ?? { area: "", variant: "white" as Variant };
          const Icon = solution.icon;
          const big = area.includes("col-span-2");
          const inner = (
            <>
              <span aria-hidden className="pointer-events-none absolute right-4 top-3 select-none text-[44px] font-extrabold leading-none opacity-[0.14]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {(variant === "blue" || variant === "deep") && (
                <span aria-hidden className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full border border-white/[0.15]" />
              )}
              <span className={`relative flex h-11 w-11 items-center justify-center rounded-2xl ${CHIP[variant]}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="relative">
                <h3 className={`mb-1.5 font-bold leading-tight ${big ? "text-xl" : "text-base"}`}>{solution.title}</h3>
                <p className={`text-sm leading-relaxed ${big ? "max-w-[46ch]" : ""} ${BODY[variant]}`}>{solution.problem}</p>
                {solution.href && (
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Learn more
                    <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                )}
              </div>
            </>
          );
          const cls = `group relative flex min-h-[196px] flex-col justify-between overflow-hidden rounded-3xl p-6 transition duration-500 hover:-translate-y-1.5 ${SURFACE[variant]} ${area}`;
          return (
            <div key={solution.id} data-aos="fade-up" data-aos-delay={(index % 4) * 50} className={area}>
              {solution.href ? (
                <Link href={solution.href} className={`${cls} h-full`}>
                  {inner}
                </Link>
              ) : (
                <div className={`${cls} h-full`}>{inner}</div>
              )}
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

export default Solutions;
