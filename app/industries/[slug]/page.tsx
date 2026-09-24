import { notFound } from "next/navigation";
import { Metadata } from "next";
import industriesData from "@/components/Industries/industriesData";
import IndustryDetailPage from "@/components/Industries/IndustryDetailPage";
import { getIndustryDetail } from "@/components/Industries/industryDetails";

type Params = { slug: string };

export function generateStaticParams() {
  return industriesData.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);
  const detail = getIndustryDetail(slug);
  if (!industry || !detail) return {};
  return {
    title: `${industry.title} | Corefort Technologies`,
    description: detail.metaDescription,
  };
}

export default async function IndustryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const detail = getIndustryDetail(slug);
  if (!detail || !industriesData.some((i) => i.slug === slug)) notFound();
  return <IndustryDetailPage detail={detail} />;
}
