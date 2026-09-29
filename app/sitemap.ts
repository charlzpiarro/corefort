import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import industriesData from "@/components/Industries/industriesData";
import insightsData from "@/components/Insights/insightsData";

type Row = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  lastModified?: Date;
};

// Every real, indexable page on the site. /error and /news are deliberately left out: /error is
// a fallback page, and /news is placeholder-era template content, not yet reviewed (see the
// Worker's honesty rules that the rest of the site follows). Both are also set to noindex.
const STATIC_ROUTES: Row[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/company", priority: 0.6, changeFrequency: "monthly" },
  { path: "/solutions", priority: 0.9, changeFrequency: "monthly" },
  { path: "/solutions/business-automation", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solutions/payment-financial-systems", priority: 0.7, changeFrequency: "monthly" },
  { path: "/products", priority: 0.9, changeFrequency: "monthly" },
  { path: "/products/netpurse", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/ledge-biashara", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/security", priority: 0.7, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.5, changeFrequency: "monthly" },
  { path: "/insights", priority: 0.6, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const industryRoutes: Row[] = industriesData.map((industry) => ({
    path: `/industries/${industry.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const insightRoutes: Row[] = insightsData.map((post) => ({
    path: `/insights/${post.slug}`,
    priority: 0.5,
    changeFrequency: "monthly",
    lastModified: new Date(post.date),
  }));

  return [...STATIC_ROUTES, ...industryRoutes, ...insightRoutes].map((row) => ({
    url: `${SITE_URL}${row.path}`,
    lastModified: row.lastModified ?? now,
    changeFrequency: row.changeFrequency,
    priority: row.priority,
  }));
}
