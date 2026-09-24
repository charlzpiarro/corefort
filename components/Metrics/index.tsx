import AnimatedCounter from "@/components/Common/AnimatedCounter";
import Stage from "@/components/Common/Stage";
import company from "../../shared/corefort-company.json";

/**
 * Facts strip. Every value here is something the site already states and can stand behind
 * (six practice areas, two own products, two offices, support after launch).
 * There are deliberately no project or client counts: those would need verified figures first.
 */
const ITEMS: { value: React.ReactNode; label: string; detail: string }[] = [
  { value: <AnimatedCounter end={6} />, label: "Practice areas", detail: "Software, cloud, security, fintech, connectivity and AI" },
  { value: <AnimatedCounter end={2} />, label: "Own products", detail: "NetPurse and LEDGE Biashara, built and run by Corefort" },
  {
    value: "DAR · ZNZ", // Dar es Salaam and Zanzibar (airport codes)
    label: "Offices",
    detail: company.locations.join(" and "),
  },
  { value: "Ongoing", label: "Support after launch", detail: "Monitoring, maintenance and improvements, not a one-time handoff" },
];

const Metrics = () => {
  return (
    <Stage tone="ink" className="!py-10 md:!py-12">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4" data-aos="fade-up">
        {ITEMS.map((item) => (
          <div key={item.label} className="glass group relative overflow-hidden rounded-2xl px-5 py-6 transition duration-300 hover:-translate-y-1 hover:border-amber/40 sm:py-7">
            <span aria-hidden className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-amber/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <p className="text-3xl font-extrabold tabular-nums text-gradient-amber sm:text-4xl">{item.value}</p>
            <p className="mt-2 text-sm font-semibold text-white">{item.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-white/[0.55]">{item.detail}</p>
          </div>
        ))}
      </div>
    </Stage>
  );
};

export default Metrics;
