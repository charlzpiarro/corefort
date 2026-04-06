import Pricing from "@/components/Pricing";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { metadata } from "./pricingMetadata"; // Import metadata

const PricingPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Our Prices"
        description="Flexible hosting plans for startups, businesses, and enterprise workloads with secure infrastructure and dependable support."
      />

      <section className="pb-3">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["No setup fee", "Start quickly with zero onboarding charges."],
              [
                "Secure by default",
                "SSL, monitoring, and backup support across plans.",
              ],
              [
                "Local support",
                "Fast response times from our regional support team.",
              ],
              [
                "Scale anytime",
                "Upgrade resources as your traffic and data grow.",
              ],
            ].map(([title, detail]) => (
              <div
                key={title}
                className="rounded-2xl border border-stroke bg-white p-5 dark:border-stroke-dark dark:bg-dark"
              >
                <h3 className="text-sm font-semibold text-primary sm:text-base">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-body-color dark:text-body-color-dark">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Pricing />
    </>
  );
};

export default PricingPage;
