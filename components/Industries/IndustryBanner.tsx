import Image from "next/image";
import industriesData from "./industriesData";

/** Wide photo banner for an industry detail page. */
const IndustryBanner = ({ slug }: { slug: string }) => {
  const industry = industriesData.find((i) => i.slug === slug);
  if (!industry) return null;
  const Icon = industry.icon;

  return (
    <section className="pb-2 pt-2">
      <div className="container max-w-5xl">
        {/* Width-driven aspect ratio (no min-height: it would force the box wider than a phone screen).
            Taller crop on phones so the subject is not squeezed into a thin strip. */}
        <div className="relative aspect-[4/3] w-full max-w-full overflow-hidden rounded-2xl border border-stroke bg-navy shadow-card dark:border-white/10 sm:aspect-[16/9] sm:rounded-3xl lg:aspect-[16/8]">
          <Image
            src={industry.image}
            alt={industry.alt}
            fill
            priority
            sizes="(min-width: 1024px) 960px, 100vw"
            style={{ objectPosition: industry.position }}
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/10 to-primary/10"
          />
          <div className="absolute bottom-0 left-0 flex items-center gap-3 p-4 sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/[0.15] text-white backdrop-blur-md">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold text-white sm:text-xl">{industry.title}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryBanner;
