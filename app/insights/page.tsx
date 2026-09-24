import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import insightsData, { InsightCategory } from "@/components/Insights/insightsData";

export const metadata: Metadata = {
  title: "Insights | Corefort Technologies",
  description:
    "Perspectives from the Corefort team on engineering, security, and building technology for the markets we operate in.",
};

const CATEGORIES: InsightCategory[] = ["Technology", "Cybersecurity", "Business", "Emerging Technology"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function InsightsPage() {
  return (
    <>
      <Breadcrumb
        pageName="Insights"
        description="Notes on engineering, security, and building technology for the markets we operate in."
      />

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          {CATEGORIES.map((category) => {
            const posts = insightsData.filter((p) => p.category === category);
            if (posts.length === 0) return null;
            return (
              <div key={category} className="mb-14 last:mb-0">
                <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-primary">
                  {category}
                </h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/insights/${post.slug}`}
                      className="group flex flex-col rounded-2xl border border-stroke bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-card dark:border-white/10 dark:bg-navy-light"
                    >
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
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
