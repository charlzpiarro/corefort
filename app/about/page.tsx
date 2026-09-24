import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import AboutStats from "@/components/About/AboutStats";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Corefort Technologies",
  description:
    "Learn more about Corefort Technologies, your partner in Web & Mobile Development, Cybersecurity, Enterprise Solutions, and IT Consulting across Africa and beyond.",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Corefort"
        description="We are a technology partner focused on product quality, reliable delivery, and secure systems that help businesses grow with confidence."
      />
      <AboutStats />
      <AboutSectionOne />
      <AboutSectionTwo />
      <section className="pb-16 pt-4 sm:pb-20">
        <div className="container">
          <div className="rounded-3xl bg-primary px-6 py-10 text-center sm:px-10">
            <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
              Build your next platform with Corefort
            </h2>
            <p className="mx-auto mb-6 max-w-[640px] text-sm text-white/90 sm:text-base">
              From planning to deployment and support, we help you move faster
              with secure and scalable engineering.
            </p>
            <Link
              href="/contact"
              className="inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
