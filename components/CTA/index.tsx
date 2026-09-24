import Link from "next/link";
import { IconArrowRight } from "@/components/Common/BrandIcons";

const CTA = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div
          className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#05060A_0%,#12225E_45%,#3A56E8_100%)] px-6 py-16 text-center sm:px-10 md:px-16 md:py-20"
          data-aos="fade-up"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dark opacity-20" />
          <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-black/20 blur-3xl" />

          <div className="relative z-10">
            <h2 className="mx-auto mb-5 max-w-[640px] text-3xl font-bold text-white sm:text-4xl md:text-[44px]">
              Let&apos;s Build What Comes Next.
            </h2>
            <p className="mx-auto mb-10 max-w-[600px] text-base text-white/80 md:text-lg">
              Whether you&apos;re modernizing an existing system or building
              something entirely new, Corefort can help turn the idea into
              reliable technology.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber px-7 py-3.5 text-sm font-bold text-ink shadow-glow-amber transition duration-300 hover:-translate-y-0.5 hover:bg-amber-soft sm:text-base"
              >
                Start a Project
                <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl glass px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:text-base"
              >
                Talk to Corefort
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
