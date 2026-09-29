import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import { HeroContent as Hero } from "@/components/HeroSection/HeroContent";
import Metrics from "@/components/Metrics";
import Products from "@/components/Products";
import WhatWeBuild from "@/components/WhatWeBuild";
import Industries from "@/components/Industries";
import Process from "@/components/Process";
import Security from "@/components/Security";
import HomeAbout from "@/components/HomeAbout";
import InsightsPreview from "@/components/Insights/InsightsPreview";
import FAQ from "@/components/FAQ";
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
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Metrics />
      <Brands />
      <Products />
      <WhatWeBuild />
      <Industries />
      <Security />
      <Process />
      <HomeAbout />
      <InsightsPreview />
      <FAQ limit={4} compact />
      <Contact showIntro />
    </>
  );
}
