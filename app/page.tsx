import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import { HeroContent as Hero } from "@/components/HeroSection/HeroContent";
import Metrics from "@/components/Metrics";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import Products from "@/components/Products";
import CaseStudies from "@/components/CaseStudies";
import Industries from "@/components/Industries";
import WhyCorefort from "@/components/WhyCorefort";
import Process from "@/components/Process";
import Partners from "@/components/Partners";
import Technology from "@/components/Technology";
import Security from "@/components/Security";
import Philosophy from "@/components/Philosophy";
import InsightsPreview from "@/components/Insights/InsightsPreview";
import FAQ from "@/components/FAQ";
import SolutionFinder from "@/components/SolutionFinder";
import CTA from "@/components/CTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corefort Technologies | Software, Cloud, Cybersecurity & Fintech",
  keywords:
    "Corefort, Technologies, Software Engineering, Cloud Infrastructure, Cybersecurity, Fintech, Connectivity, AI, Automation, NetPurse, LEDGE Biashara",
  authors: [{ name: "Corefort Technologies" }],
  creator: "Corefort Technologies",
  publisher: "Corefort Technologies",
  description:
    "Corefort Technologies builds secure, scalable software, infrastructure, and digital platforms, spanning software engineering, cloud, cybersecurity, fintech, connectivity, and AI.",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Metrics />
      <Services />
      <Solutions />
      <Products />
      <CaseStudies />
      <Industries />
      <WhyCorefort />
      <Process />
      <Partners />
      <Technology />
      <Security />
      <Philosophy />
      <InsightsPreview />
      <FAQ limit={4} compact />
      <SolutionFinder />
      <CTA />
      <Brands />
      <Contact />
    </>
  );
}
