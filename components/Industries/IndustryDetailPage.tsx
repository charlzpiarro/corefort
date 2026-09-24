import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { IconArrowRight, IconShieldLock, IconSignal } from "@/components/Common/BrandIcons";
import CTA from "@/components/CTA";
import IndustryBanner from "./IndustryBanner";
import industriesData from "./industriesData";
import type { IndustryDetail } from "./industryDetails";

const STEPS: { key: keyof IndustryDetail["process"]; title: string }[] = [
  { key: "discover", title: "Discover" },
  { key: "architect", title: "Architect" },
  { key: "build", title: "Build" },
  { key: "deploy", title: "Deploy" },
  { key: "scale", title: "Scale" },
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{children}</p>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-8 max-w-2xl text-2xl font-bold text-black dark:text-white sm:text-3xl">{children}</h2>
);

export default function IndustryDetailPage({ detail }: { detail: IndustryDetail }) {
  const industry = industriesData.find((i) => i.slug === detail.slug)!;
  const others = industriesData.filter((i) => i.slug !== detail.slug).slice(0, 3);

  return (
    <>
      <Breadcrumb pageName={industry.title} description={industry.description} />
      <IndustryBanner slug={detail.slug} />

      {/* Overview + at a glance */}
      <section className="py-14 md:py-20">
        <div className="container max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
            <div>
              <Eyebrow>Overview</Eyebrow>
              <h2 className="mb-6 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Technology for {industry.title.toLowerCase()}, built around how you operate
              </h2>
              <div className="space-y-5">
                {detail.overview.map((p) => (
                  <p key={p} className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-3xl border border-stroke bg-white p-6 shadow-card dark:border-white/10 dark:bg-navy-light">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-body-color dark:text-body-color-dark">
                At a glance
              </p>
              <dl className="divide-y divide-stroke dark:divide-white/10">
                {detail.glance.map((row) => (
                  <div key={row.label} className="py-3 first:pt-0 last:pb-0">
                    <dt className="text-xs font-medium text-body-color dark:text-body-color-dark">{row.label}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-dark dark:text-white">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="bg-gray-light py-14 dark:bg-navy-light/40 md:py-20">
        <div className="container max-w-5xl">
          <Eyebrow>Industry challenges</Eyebrow>
          <H2>Where technology tends to get in the way</H2>
          <div className="grid gap-5 sm:grid-cols-2">
            {detail.challenges.map((c, i) => (
              <div
                key={c.title}
                className="rounded-2xl border border-stroke bg-white p-6 dark:border-white/10 dark:bg-navy-light"
              >
                <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <h3 className="mb-2 text-lg font-bold text-black dark:text-white">{c.title}</h3>
                <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-14 md:py-20">
        <div className="container max-w-5xl">
          <Eyebrow>What we build</Eyebrow>
          <H2>Systems we can build for {industry.title.toLowerCase()}</H2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {detail.builds.map((b) => (
              <div
                key={b.title}
                className="flex flex-col rounded-2xl border border-stroke bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-glow dark:border-white/10 dark:bg-navy-light"
              >
                <span
                  className={`mb-4 w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                    b.tag === "Product"
                      ? "bg-primary text-white"
                      : "border border-stroke text-body-color dark:border-white/[0.15] dark:text-body-color-dark"
                  }`}
                >
                  {b.tag === "Product" ? "Available in our product" : "Custom build"}
                </span>
                <h3 className="mb-2 text-lg font-bold text-black dark:text-white">{b.title}</h3>
                <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">{b.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 text-sm leading-relaxed text-dark dark:text-white/[0.85]">
            {detail.productNote}
          </p>
        </div>
      </section>

      {/* Scenarios */}
      <section className="bg-gray-light py-14 dark:bg-navy-light/40 md:py-20">
        <div className="container max-w-5xl">
          <Eyebrow>In practice</Eyebrow>
          <H2>How this can look for your business</H2>
          <div className="grid gap-5 lg:grid-cols-3">
            {detail.scenarios.map((s) => (
              <article
                key={s.title}
                className="flex flex-col rounded-2xl border border-stroke bg-white p-6 dark:border-white/10 dark:bg-navy-light"
              >
                <h3 className="mb-4 text-lg font-bold text-black dark:text-white">{s.title}</h3>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-body-color dark:text-body-color-dark">
                  The situation
                </p>
                <p className="mb-4 text-sm leading-relaxed text-body-color dark:text-body-color-dark">{s.situation}</p>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">The approach</p>
                <p className="text-sm leading-relaxed text-dark dark:text-white/[0.85]">{s.approach}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs text-body-color dark:text-body-color-dark">
            These are illustrative scenarios to show how we think about the problem. They are not client case studies.
          </p>
        </div>
      </section>

      {/* Local conditions */}
      <section className="pt-14 md:pt-20">
        <div className="container max-w-5xl">
          <div className="flex flex-col gap-5 rounded-3xl border border-stroke bg-white p-7 shadow-card dark:border-white/10 dark:bg-navy-light sm:flex-row sm:items-start sm:p-9">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <IconSignal className="h-6 w-6" />
            </span>
            <div>
              <h3 className="mb-2 text-xl font-bold text-black dark:text-white">{detail.localNote.title}</h3>
              <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                {detail.localNote.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-14 md:py-20">
        <div className="container max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-navy px-7 py-10 text-white sm:px-10 sm:py-12">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                  <IconShieldLock className="h-6 w-6" />
                </span>
                <h2 className="mb-3 text-2xl font-bold sm:text-3xl">Security considerations</h2>
                <p className="text-sm leading-relaxed text-white/75">{detail.security.intro}</p>
                <p className="mt-5 text-xs leading-relaxed text-white/60">{detail.security.disclaimer}</p>
              </div>
              <ul className="space-y-3">
                {detail.security.points.map((pt) => (
                  <li key={pt} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/[0.85]">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C93FF]" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-body-color dark:text-body-color-dark">
            Read our full{" "}
            <Link href="/security" className="font-medium text-primary hover:underline">
              security approach
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-light py-14 dark:bg-navy-light/40 md:py-20">
        <div className="container max-w-5xl">
          <Eyebrow>How we work</Eyebrow>
          <H2>From first conversation to a system you rely on</H2>
          <ol className="grid gap-4 md:grid-cols-5">
            {STEPS.map((step, i) => (
              <li
                key={step.key}
                className="rounded-2xl border border-stroke bg-white p-5 dark:border-white/10 dark:bg-navy-light"
              >
                <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mb-1.5 text-base font-bold text-black dark:text-white">{step.title}</h3>
                <p className="text-[13px] leading-relaxed text-body-color dark:text-body-color-dark">
                  {detail.process[step.key]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Related solutions */}
      <section className="py-14 md:py-16">
        <div className="container max-w-5xl">
          <h2 className="mb-5 text-xl font-bold text-black dark:text-white">Relevant to this industry</h2>
          <div className="flex flex-wrap gap-3">
            {detail.relevant.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group inline-flex items-center gap-1.5 rounded-full border border-stroke px-4 py-2 text-sm font-medium text-dark transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:text-white"
              >
                {link.label}
                <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-14 md:pb-20">
        <div className="container max-w-3xl">
          <Eyebrow>Questions</Eyebrow>
          <H2>Common questions about {industry.title.toLowerCase()} projects</H2>
          <div className="divide-y divide-stroke rounded-2xl border border-stroke bg-white dark:divide-white/10 dark:border-white/10 dark:bg-navy-light">
            {detail.faqs.map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-black marker:hidden dark:text-white [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-stroke text-primary transition-transform duration-300 group-open:rotate-45 dark:border-white/[0.15]"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-body-color dark:text-body-color-dark">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other industries */}
      <section className="border-t border-stroke py-14 dark:border-white/10 md:py-16">
        <div className="container max-w-5xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-xl font-bold text-black dark:text-white">Explore other industries</h2>
            <Link href="/industries" className="text-sm font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/industries/${o.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-navy"
              >
                <Image
                  src={o.image}
                  alt={o.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  style={{ objectPosition: o.position }}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/[0.85] via-navy/20 to-transparent" />
                <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm font-bold text-white">
                  {o.title}
                  <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
