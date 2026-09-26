import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/Common/BrandIcons";

const CTA = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div
          className="relative overflow-hidden rounded-3xl bg-[#0632C4] shadow-[0_40px_90px_-40px_rgba(6,50,196,0.8)]"
          data-aos="fade-up"
        >
          {/* Photo: a robot hand holding a glass card with the Corefort mark (built in scripts/prepare-photos.mjs).
              On phones it is a band above the copy; from md up it fills the card behind the copy. */}
          <div className="relative h-[250px] sm:h-[300px] md:absolute md:inset-0 md:h-auto">
            <Image
              src="/images/photos/robot-corefort.webp"
              alt="A robotic hand holding a glass card that shows the Corefort logo"
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover object-[80%_40%] md:object-right"
            />
            {/* fade into the card colour: at the bottom on phones, from the left on wider screens */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,#0632C4_0%,rgba(6,50,196,0)_55%)] md:hidden" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,#0632C4_0%,rgba(6,50,196,0.94)_38%,rgba(6,50,196,0)_72%)] md:block"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dark opacity-[0.12]" />
          </div>

          <div className="relative flex flex-col justify-start px-6 pb-12 pt-2 sm:px-10 md:min-h-[440px] md:justify-center md:px-14 md:py-16">
            <div className="max-w-[470px]">
              <p className="glass mb-5 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                Let&apos;s talk
              </p>
              <h2 className="mb-5 text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl md:text-[40px]">
                Let&apos;s Build What Comes Next.
              </h2>
              <p className="mb-9 max-w-[44ch] text-base leading-relaxed text-white/[0.82] md:text-[17px]">
                Whether you&apos;re modernizing an existing system or building something entirely new, Corefort can help turn the
                idea into reliable technology.
              </p>
              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl bg-amber px-7 py-3.5 text-sm font-bold text-ink shadow-glow-amber transition duration-300 hover:-translate-y-0.5 hover:bg-amber-soft sm:text-base"
                >
                  Start a Project
                  <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="glass inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:text-base"
                >
                  Talk to Corefort
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
