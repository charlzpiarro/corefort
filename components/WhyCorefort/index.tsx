import SectionTitle from "@/components/Common/SectionTitle";
import Stage from "@/components/Common/Stage";
import whyCorefortData from "./whyCorefortData";

type Variant = "blue" | "amber" | "ink" | "glass" | "deep";

/**
 * Bento layout on 4 columns (lg). Every cell is filled, no gaps:
 *   r1-2: [ 1 (2x2) ][ 2 ][ 3 ]      r2: [ 4 (2x1) ]
 *   r3:   [ 5 ][ 6 ][ 7 (2x2) ]      r4: [ 8 (2x1) ]
 * Item ids come from whyCorefortData; the tile look is chosen here.
 */
const TILES: Record<number, { area: string; variant: Variant; big?: boolean }> = {
  1: { area: "sm:col-span-2 lg:col-span-2 lg:row-span-2", variant: "blue", big: true },
  2: { area: "", variant: "ink" },
  3: { area: "", variant: "amber" },
  4: { area: "sm:col-span-2 lg:col-span-2", variant: "glass" },
  5: { area: "", variant: "deep" },
  6: { area: "", variant: "ink" },
  7: { area: "sm:col-span-2 lg:col-span-2 lg:row-span-2", variant: "blue", big: true },
  8: { area: "sm:col-span-2 lg:col-span-2", variant: "amber" },
};

const SURFACE: Record<Variant, string> = {
  blue: "bg-[linear-gradient(135deg,#1D3FD1_0%,#3A56E8_55%,#5B7BFF_100%)] text-white shadow-[0_24px_60px_-24px_rgba(58,86,232,0.7)]",
  amber: "bg-[linear-gradient(135deg,#FFD58A_0%,#FBB040_55%,#E8930C_100%)] text-ink shadow-glow-amber",
  ink: "border border-white/10 bg-[linear-gradient(160deg,#0E1326_0%,#05060A_100%)] text-white",
  glass: "glass text-white",
  deep: "bg-[linear-gradient(160deg,#101a5c_0%,#0A0E1A_100%)] border border-white/10 text-white",
};

const BODY: Record<Variant, string> = {
  blue: "text-white/80",
  amber: "text-ink/75",
  ink: "text-white/[0.65]",
  glass: "text-white/70",
  deep: "text-white/[0.65]",
};

const ICON: Record<Variant, string> = {
  blue: "bg-white/[0.15] text-white",
  amber: "bg-ink/10 text-ink",
  ink: "bg-primary/20 text-[#9DB0FF]",
  glass: "bg-white/10 text-white",
  deep: "bg-white/10 text-[#FFD58A]",
};

const WhyCorefort = () => {
  return (
    <Stage tone="ink" id="why-corefort">
      <div data-aos="fade-up">
        <SectionTitle
          eyebrow="Why Corefort"
          title="Technology That Goes Beyond the Code"
          paragraph="Delivery is only part of the job. Here's what shapes how Corefort builds and supports every system."
          center
          light
          mb="56px"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[178px] lg:grid-cols-4">
        {whyCorefortData.map((item, index) => {
          const tile = TILES[item.id];
          const Icon = item.icon;
          const big = tile.big;
          return (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={(index % 4) * 60}
              className={`group relative flex min-h-[176px] flex-col justify-between overflow-hidden rounded-3xl p-6 transition duration-500 hover:-translate-y-1.5 ${SURFACE[tile.variant]} ${tile.area} ${big ? "sm:p-8" : ""}`}
            >
              {/* faint watermark number + sheen that sweeps on hover */}
              <span
                aria-hidden
                className={`pointer-events-none absolute select-none font-extrabold leading-none ${
                  big ? "-bottom-8 -right-2 text-[190px] opacity-[0.08]" : "right-4 top-3 text-[44px] opacity-[0.16]"
                }`}
              >
                {String(item.id).padStart(2, "0")}
              </span>
              {big && (
                <>
                  <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/[0.15]" />
                  <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/20" />
                  <span aria-hidden className="pointer-events-none absolute right-10 top-10 h-3 w-3 rounded-full bg-amber shadow-[0_0_18px_4px_rgba(251,176,64,0.7)]" />
                </>
              )}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
              />

              <span className={`relative flex ${big ? "h-14 w-14" : "h-11 w-11"} items-center justify-center rounded-2xl ${ICON[tile.variant]}`}>
                <Icon className={big ? "h-7 w-7" : "h-5 w-5"} />
              </span>

              <div className="relative">
                <h3 className={`mb-1.5 font-bold leading-tight ${big ? "text-2xl sm:text-[28px]" : "text-base"}`}>{item.title}</h3>
                <p className={`leading-relaxed ${big ? "max-w-[36ch] text-base" : "text-sm"} ${BODY[tile.variant]}`}>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

export default WhyCorefort;
