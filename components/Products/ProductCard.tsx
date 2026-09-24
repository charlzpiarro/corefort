import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import { IconCheck } from "@/components/Common/UiIcons";
import { Product } from "./productsData";

type Props = {
  product: Product;
  reverse?: boolean;
  /** True on the product's own page: hides the link that would point back at itself. */
  onDetailPage?: boolean;
};

/** Brand panel: the official logo on the surface it was designed for. No invented numbers. */
const BrandPanel = ({ product }: { product: Product }) => {
  const { logo, name, category } = product;
  const dark = logo.tone === "dark";

  return (
    <div
      className={`relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-2xl border p-8 text-center sm:min-h-[340px] ${
        dark
          ? "border-white/10 bg-[radial-gradient(120%_100%_at_50%_0%,#1b1b22_0%,#000_65%)]"
          : "border-primary/[0.15] bg-gradient-to-br from-primary/[0.07] via-white to-emerald-50 dark:from-primary/10 dark:via-navy dark:to-navy"
      }`}
    >
      {/* soft brand-coloured rings */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className={`absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full border ${dark ? "border-white/[0.06]" : "border-primary/10"}`} />
        <div className={`absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border ${dark ? "border-white/[0.08]" : "border-primary/[0.14]"}`} />
        <div className={`absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${dark ? "bg-white/[0.06]" : "bg-emerald-300/25"}`} />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {dark ? (
          <Image
            src={logo.src}
            alt={`${name} logo`}
            width={logo.width}
            height={logo.height}
            sizes="(min-width: 1024px) 380px, 70vw"
            className="h-auto w-[min(72%,340px)] max-w-full"
          />
        ) : (
          <span className="flex h-36 w-36 items-center justify-center rounded-[2rem] bg-white shadow-[0_18px_50px_-12px_rgba(16,185,129,0.35)] ring-1 ring-black/5 sm:h-44 sm:w-44">
            <Image
              src={logo.src}
              alt={`${name} logo`}
              width={logo.width}
              height={logo.height}
              sizes="176px"
              className="h-[82%] w-[82%] object-contain"
            />
          </span>
        )}

        <p className={`mt-6 text-lg font-bold ${dark ? "text-white" : "text-black dark:text-white"}`}>{name}</p>
        <p className={`mt-1 text-xs font-medium uppercase tracking-[0.16em] ${dark ? "text-white/[0.55]" : "text-body-color dark:text-body-color-dark"}`}>
          {category}
        </p>
      </div>
    </div>
  );
};

const ProductCard = ({ product, reverse, onDetailPage = false }: Props) => {
  const isSecondary = product.accent === "secondary";
  const linkTone = isSecondary ? "text-secondary hover:text-secondary/80" : "text-primary hover:text-primary/80";

  return (
    <div
      id={product.id}
      className="scroll-mt-32 grid items-center gap-10 rounded-3xl border border-stroke bg-white p-6 shadow-card dark:border-white/10 dark:bg-navy-light dark:shadow-card-dark sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-12"
    >
      <div className={reverse ? "lg:order-2" : ""}>
        <span
          className={`mb-5 inline-flex rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${
            isSecondary ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
          }`}
        >
          {product.category}
        </span>
        <h3 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl">{product.name}</h3>
        <p className="mb-6 max-w-[460px] text-base leading-relaxed text-body-color dark:text-body-color-dark">
          {product.description}
        </p>
        <ul className="mb-8 grid gap-3 sm:grid-cols-2">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-dark dark:text-white/80">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  isSecondary ? "bg-secondary/[0.15] text-secondary" : "bg-primary/[0.15] text-primary"
                }`}
              >
                <IconCheck className="h-3 w-3" />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {!onDetailPage && (
            <Link href={product.href} className={`group inline-flex items-center gap-2 text-sm font-semibold transition ${linkTone}`}>
              Explore {product.name}
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
          {product.external && (
            <a
              href={product.external.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-2 text-sm font-semibold transition ${
                onDetailPage
                  ? "rounded-xl bg-primary px-5 py-2.5 text-white hover:bg-primary/90"
                  : "text-dark hover:text-primary dark:text-white"
              }`}
            >
              {product.external.label}
              <span className="sr-only"> (opens in a new tab)</span>
              <IconArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>

      <div className={reverse ? "lg:order-1" : ""}>
        <BrandPanel product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
