import AnimatedCounter from "@/components/Common/AnimatedCounter";
import metricsData from "./metricsData";

const Metrics = () => {
  return (
    <section className="relative z-10 -mt-12 px-4 sm:-mt-14 lg:-mt-16">
      <div className="container">
        <div
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-stroke bg-stroke shadow-card dark:border-white/10 dark:bg-white/10 dark:shadow-card-dark md:grid-cols-4"
          data-aos="fade-up"
        >
          {metricsData.map((metric) => (
            <div
              key={metric.id}
              className="bg-white px-5 py-8 text-center dark:bg-navy-light sm:py-10"
            >
              <p className="text-3xl font-bold tabular-nums text-gradient-brand sm:text-4xl">
                <AnimatedCounter end={metric.end} suffix={metric.suffix} />
              </p>
              <p className="mt-2 text-xs font-medium text-body-color dark:text-body-color-dark sm:text-sm">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
