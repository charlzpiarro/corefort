import Breadcrumb from "@/components/Common/Breadcrumb";
import FAQ from "@/components/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Corefort Technologies",
  description:
    "Frequently asked questions about Corefort services, support, project delivery, and security.",
};

const FAQPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Frequently Asked Questions"
        description="Answers about Corefort services, delivery, and support. We serve clients from Dar es Salaam, Zanzibar, and across Tanzania."
      />
      <FAQ />
    </>
  );
};

export default FAQPage;
