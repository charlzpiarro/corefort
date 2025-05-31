import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Corefort Technologies",
  description:
    "Learn more about Corefort Technologies — your partner in Web & Mobile Development, Cybersecurity, Enterprise Solutions, and IT Consulting across Africa and beyond.",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Corefort"
        description="We are a tech company rooted in innovation and driven by impact — building secure, scalable, and smart solutions for businesses across industries. From mobile apps to cloud and cybersecurity, we’ve got you covered."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
