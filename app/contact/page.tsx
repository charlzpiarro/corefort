import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Corefort Technologies",
  description:
    "Get in touch with Corefort Technologies — your go-to experts in Web & Mobile Development, Cybersecurity, Enterprise Software, and IT Solutions across Africa.",
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Corefort"
        description="Have a project in mind? Want to upgrade your business with cutting-edge tech? Reach out to Corefort Technologies — we’re here to listen, build, and elevate your digital journey."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
