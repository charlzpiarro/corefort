import Link from "next/link";
import SectionTitle from "@/components/Common/SectionTitle";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import IndustryTile from "./IndustryTile";
import industriesData from "./industriesData";

const Industries = () => {
  return (
    <section id="industries" className="scroll-mt-24 py-20 md:py-28">
      <div className="container">
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="Where We Work"
            title="Technology for Real-World Industries"
            paragraph="Corefort's engineering approach adapts to the operating realities of different sectors, not a one-size-fits-all template."
            center
            mb="56px"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[200px] lg:grid-cols-4">
          {industriesData.map((industry, index) => (
            <IndustryTile key={industry.id} industry={industry} delay={(index % 4) * 60} />
          ))}
        </div>

        <div className="mt-10 text-center" data-aos="fade-up">
          <Link
            href="/industries"
            className="group inline-flex items-center gap-2 rounded-xl border border-stroke bg-white px-6 py-3 text-sm font-semibold text-dark transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-navy-light dark:text-white"
          >
            Explore All Industries
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Industries;
