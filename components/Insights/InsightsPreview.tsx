import Link from "next/link";
import SectionTitle from "@/components/Common/SectionTitle";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import insightsData from "./insightsData";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const InsightsPreview = () => {
  const featured = insightsData.slice(0, 3);

  return (
    <section className="bg-gray-light py-20 dark:bg-bg-color-dark md:py-28">
      <div className="container">
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="Insights"
            title="Perspectives From Our Team"
            paragraph="Notes on engineering, security, and building technology for the markets we operate in."
            center
            mb="56px"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {featured.map((post, index) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}`}
              data-aos="fade-up"
              data-aos-delay={index * 60}
              className="group flex flex-col rounded-2xl border border-stroke bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card dark:border-white/10 dark:bg-navy-light dark:hover:shadow-card-dark"
            >
              <span className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                {post.category}
              </span>
              <h3 className="mb-2 text-base font-bold text-black transition-colors group-hover:text-primary dark:text-white">
                {post.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                {post.summary}
              </p>
              <span className="text-xs text-body-color/70 dark:text-body-color-dark/70">
                {formatDate(post.date)} · {post.readTime}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center" data-aos="fade-up">
          <Link
            href="/insights"
            className="group inline-flex items-center gap-2 rounded-xl border border-stroke bg-white px-6 py-3 text-sm font-semibold text-dark transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-navy-light dark:text-white"
          >
            View All Insights
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsightsPreview;
