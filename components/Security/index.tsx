import Link from "next/link";
import SectionTitle from "@/components/Common/SectionTitle";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import SecurityCycle from "./SecurityCycle";

const Security = () => {
  return (
    <section className="relative overflow-hidden bg-navy py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[600px] -translate-x-1/2 rounded-full bg-primary/[0.15] blur-[120px]" />

      <div className="container relative z-10">
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="Security"
            title="Security Is Designed In, Not Bolted On"
            paragraph="Security is considered throughout architecture, development, and deployment, not treated as a final checklist."
            center
            light
            mb="56px"
          />
        </div>

        <div data-aos="fade-up">
          <SecurityCycle />
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-white/[0.45]" data-aos="fade-up">
          These describe how we approach security engineering. They are not claims of formal
          certification, audit, or regulatory accreditation.
        </p>

        <div className="mt-6 text-center" data-aos="fade-up">
          <Link
            href="/security"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white"
          >
            Read Our Security Approach
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Security;
