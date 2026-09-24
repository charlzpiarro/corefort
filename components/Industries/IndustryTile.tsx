import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import { Industry } from "./industriesData";

/** Photo tile for the homepage bento grid. */
const IndustryTile = ({ industry, delay = 0 }: { industry: Industry; delay?: number }) => {
  const Icon = industry.icon;
  // Large tiles have room to show the description all the time; small ones reveal it on hover.
  const large = industry.span.includes("row-span-2") || industry.span.includes("col-span-2");

  const content = (
    <>
      <Image
        src={industry.image}
        alt={industry.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        style={{ objectPosition: industry.position }}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-primary/10 transition-opacity duration-300"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/[0.15] text-white backdrop-blur-md">
            <Icon className="h-5 w-5" />
          </span>
          {industry.href && (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 max-lg:opacity-100 lg:-translate-x-2">
              <IconArrowRight className="h-4 w-4" />
            </span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold text-white sm:text-xl">{industry.title}</h3>
          <p
            className={`mt-1.5 max-w-[34ch] text-sm leading-relaxed text-white/80 transition-all duration-300 ${
              large
                ? ""
                : "lg:max-h-0 lg:translate-y-1 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-24 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
            }`}
          >
            {industry.description}
          </p>
        </div>
      </div>
    </>
  );

  const className = `group relative block min-h-[260px] overflow-hidden rounded-2xl bg-navy shadow-card lg:min-h-0 ${industry.span}`;

  const aos = { "data-aos": "fade-up", "data-aos-delay": delay };

  return industry.href ? (
    <Link
      href={industry.href}
      className={className}
      aria-label={`${industry.title}: learn more`}
      {...aos}
    >
      {content}
    </Link>
  ) : (
    <div className={className} {...aos}>
      {content}
    </div>
  );
};

export default IndustryTile;
