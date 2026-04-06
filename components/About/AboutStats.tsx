"use client";

import AnimatedCounter from "@/components/Common/AnimatedCounter";

const stats = [
  { end: 10, suffix: "+", label: "Years collective experience" },
  { end: 120, suffix: "+", label: "Projects delivered" },
  { end: 24, suffix: "/7", label: "Monitoring and support" },
  { end: 98, suffix: "%", label: "Client satisfaction focus" },
] as const;

const AboutStats = () => {
  return (
    <section className="pb-8">
      <div className="container">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-stroke bg-white p-5 text-center shadow-one dark:border-stroke-dark dark:bg-dark sm:text-left"
            >
              <p className="text-2xl font-bold tabular-nums text-primary">
                <AnimatedCounter end={item.end} suffix={item.suffix} />
              </p>
              <p className="mt-1 text-sm text-body-color dark:text-body-color-dark">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
