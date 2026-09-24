import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/Common/SectionTitle";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import solutionsData from "./solutionsData";

const Solutions = () => {
  return (
    <section id="solutions" className="scroll-mt-24 bg-gray-light py-20 dark:bg-bg-color-dark md:py-28">
      <div className="container">
        <div className="mb-16 grid items-center gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:gap-14">
          <div data-aos="fade-up">
            <SectionTitle
              eyebrow="Solutions"
              title="Business Problems We Solve"
              paragraph="Not a list of technologies. These are the actual operational problems Corefort gets called in to fix, and how we approach them. Each piece fits the next: cloud, security, networks, software, and data working as one system."
              mb="32px"
            />
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              View All Solutions
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div
            className="relative overflow-hidden rounded-3xl border border-stroke shadow-card dark:border-white/10 dark:shadow-card-dark"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <Image
              src="/images/solutions/solutions-puzzle.webp"
              alt="A hand placing the Corefort piece into a wall of connected blocks representing cloud, security, networking, code, and data"
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutionsData.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={solution.id}
                data-aos="fade-up"
                data-aos-delay={index * 40}
                className="flex flex-col rounded-2xl border border-stroke bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card dark:border-white/10 dark:bg-navy-light dark:hover:shadow-card-dark"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary dark:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mb-2 text-base font-bold text-black dark:text-white">
                  {solution.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                  {solution.problem}
                </p>
                {solution.href && (
                  <Link
                    href={solution.href}
                    className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Learn More
                    <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
