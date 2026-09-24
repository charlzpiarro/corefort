import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import insightsData from "@/components/Insights/insightsData";
import CTA from "@/components/CTA";

type Params = { slug: string };

export function generateStaticParams() {
  return insightsData.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = insightsData.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Corefort Insights`,
    description: post.summary,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function InsightArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = insightsData.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Breadcrumb pageName={post.title} description={post.summary} />

      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <div className="mb-8 flex items-center gap-3 text-sm text-body-color dark:text-body-color-dark">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {post.category}
            </span>
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <div className="space-y-5">
            {post.body.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-dark dark:text-white/[0.85]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 border-t border-stroke pt-8 dark:border-white/10">
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <IconArrowRight className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Insights
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
