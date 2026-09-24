import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Corefort Technologies",
  description:
    "Get in touch with Corefort Technologies, your go-to experts in Web & Mobile Development, Cybersecurity, Enterprise Software, and IT Solutions across Africa.",
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Corefort"
        description="Share your requirements, timelines, and goals. Our team will review your request and get back with a clear next step."
      />
      <section className="pb-2">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-stroke bg-white p-5 dark:border-stroke-dark dark:bg-dark">
              <p className="text-sm font-semibold text-primary">Email</p>
              <p className="mt-1 text-sm text-body-color dark:text-body-color-dark sm:text-base">
                sales@coreforttech.co.tz
              </p>
            </div>
            <div className="rounded-2xl border border-stroke bg-white p-5 dark:border-stroke-dark dark:bg-dark">
              <p className="text-sm font-semibold text-primary">Phone</p>
              <p className="mt-1 text-sm text-body-color dark:text-body-color-dark sm:text-base">
                +255 773 662 935
              </p>
            </div>
            <div className="rounded-2xl border border-stroke bg-white p-5 dark:border-stroke-dark dark:bg-dark">
              <p className="text-sm font-semibold text-primary">Locations</p>
              <p className="mt-2 text-sm leading-relaxed text-body-color dark:text-body-color-dark sm:text-base">
                Dar es Salaam, Tanzania
                <br />
                Zanzibar, Tanzania
              </p>
            </div>
            <div className="rounded-2xl border border-stroke bg-white p-5 dark:border-stroke-dark dark:bg-dark">
              <p className="text-sm font-semibold text-primary">FAQs</p>
              <Link
                href="/faq"
                className="mt-1 inline-block text-sm text-body-color transition hover:text-primary dark:text-body-color-dark sm:text-base"
              >
                Check frequently asked questions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
};

export default ContactPage;
