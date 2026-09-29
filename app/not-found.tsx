import Link from "next/link";
import type { Metadata } from "next";
import { IconArrowRight } from "@/components/Common/BrandIcons";

// Next.js renders this for any unmatched route and for notFound() calls (e.g. an unknown
// /industries/<slug> or /insights/<slug>), with a real 404 HTTP status, so it is never indexed.
export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.18] blur-[130px]" />
      <div className="container relative z-10 text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-amber">404</p>
        <h1 className="mx-auto mb-4 max-w-xl text-3xl font-extrabold text-white sm:text-4xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mx-auto mb-9 max-w-md text-base leading-relaxed text-white/70">
          The page you were looking for may have moved, or the link may be out of date.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3 text-sm font-bold text-ink shadow-glow-amber transition duration-300 hover:-translate-y-0.5 hover:bg-amber-soft"
          >
            Back to Homepage
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link href="/contact" className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-white/10">
            Contact Corefort
          </Link>
        </div>
      </div>
    </section>
  );
}
