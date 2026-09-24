import Image from "next/image";
import { Brand } from "@/types/brand";

/** One logo card: fixed footprint so every mark gets equal presence, whatever its shape. */
const LogoCard = ({ brand }: { brand: Brand }) => (
  <div className="group flex h-[112px] w-[200px] shrink-0 items-center justify-center rounded-2xl border border-stroke bg-white px-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card sm:h-[132px] sm:w-[236px] sm:px-8 dark:border-white/10">
    <Image
      src={brand.image}
      alt={brand.name}
      width={brand.width}
      height={brand.height}
      sizes="180px"
      loading="eager" // tiny files; lazy-loading would let a card slide in blank
      className="h-auto max-h-[68px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-[84px]"
    />
  </div>
);

/**
 * Endless, seamless logo row. Two identical groups slide left by exactly one group width, so the loop
 * has no visible seam. Pauses on hover. Reduced-motion visitors get a static wrapped grid instead.
 * Each group repeats the set so it is always wider than the screen.
 */
const LogoMarquee = ({ brands, className = "" }: { brands: Brand[]; className?: string }) => {
  const group = [...brands, ...brands];

  return (
    <div className={className}>
      {/* moving row */}
      <div
        className="group/marquee relative overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)] motion-reduce:hidden"
        aria-label="Organizations that work with Corefort"
        role="group"
      >
        <div className="flex w-max animate-marquee [--marquee-dur:70s] hover:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-5 pr-5" aria-hidden={copy === 1 ? true : undefined}>
              {group.map((brand, i) => (
                <LogoCard key={`${copy}-${i}-${brand.id}`} brand={brand} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* static fallback for people who prefer reduced motion */}
      <ul className="hidden flex-wrap items-center justify-center gap-5 motion-reduce:flex">
        {brands.map((brand) => (
          <li key={brand.id}>
            <LogoCard brand={brand} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogoMarquee;
