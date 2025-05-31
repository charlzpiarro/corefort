'use client';

import { useState, useEffect } from "react";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  useEffect(() => {
    console.log("AOS is being initialized");
    // Initialize AOS when the component mounts
    AOS.init({
      duration: 1000, // Duration of animation
      once: true, // Animation happens once per scroll
    });
  }, []);

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        {/* SectionTitle with AOS animation */}
        <div data-aos="fade-up" data-aos-delay="100">
          <SectionTitle
            title="Affordable Hosting Prices"
            paragraph="From personal portfolios to enterprise-grade platforms, our hosting plans are designed to meet your needs without breaking the bank. Get blazing-fast performance, top-tier security, and 24/7 support — all at prices tailored for Tanzanian businesses and creators."
            center
            width="665px"
          />
        </div>

        <div className="w-full">
          <div
            className="wow fadeInUp mb-8 flex justify-center md:mb-12 lg:mb-16"
            data-wow-delay=".1s"
          >
            <span
              onClick={() => setIsMonthly(true)}
              className={`${
                isMonthly
                  ? "pointer-events-none text-primary"
                  : "text-dark dark:text-white"
              } mr-4 cursor-pointer text-base font-semibold`}
            >
              Monthly
            </span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div className="h-5 w-14 rounded-full bg-[#1D2144] shadow-inner"></div>
                <div
                  className={`${
                    isMonthly ? "" : "translate-x-full"
                  } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary transition`}
                >
                  <span className="active h-4 w-4 rounded-full bg-white"></span>
                </div>
              </div>
            </div>
            <span
              onClick={() => setIsMonthly(false)}
              className={`${
                isMonthly
                  ? "text-dark dark:text-white"
                  : "pointer-events-none text-primary"
              } ml-4 cursor-pointer text-base font-semibold`}
            >
              Yearly
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {/* PricingBox 1 */}
          <PricingBox
            packageName="Basic"
            price={isMonthly ? "30,000" : "250,000"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="✅ Perfect for students, freelancers, and personal portfolios."
            data-aos="fade-up"
            data-aos-delay="200" // Staggered animation for each box
          >
            <OfferList text="1 Hosted Website" status="active" />
            <OfferList text="500MB Storage" status="active" />
            <OfferList text="Free SSL Certificate" status="active" />
            <OfferList text="Basic Email Support" status="active" />
            <OfferList text="Fast Local Hosting" status="active" />
            <OfferList text="Control Panel Access" status="active" />
          </PricingBox>

          {/* PricingBox 2 */}
          <PricingBox
            packageName="Lite"
            price={isMonthly ? "45,000" : "375,000"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="✅ Ideal for startups, NGOs, and SMEs."
            data-aos="fade-up"
            data-aos-delay="400" // Staggered animation
          >
            <OfferList text="Up to 3 Hosted Websites" status="active" />
            <OfferList text="5GB SSD Storage" status="active" />
            <OfferList text="Free SSL Certificate" status="active" />
            <OfferList text="Business Email Accounts" status="active" />
            <OfferList text="Priority Email Support" status="active" />
            <OfferList text="Daily Backups & Restore" status="active" />
          </PricingBox>

          {/* PricingBox 3 */}
          <PricingBox
            packageName="Plus"
            price={isMonthly ? "60,000" : "500,000"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="✅ For high-traffic sites, hospitals, e-commerce."
            data-aos="fade-up"
            data-aos-delay="600" // Staggered animation
          >
            <OfferList text="Unlimited Hosted Projects" status="active" />
            <OfferList text="50GB SSD + Expandable Storage" status="active" />
            <OfferList text="Free Domain (1st Year)" status="active" />
            <OfferList text="24/7 Premium Support" status="active" />
            <OfferList text="Advanced Email Hosting" status="active" />
            <OfferList text="Uptime Monitoring + Alerts" status="active" />
          </PricingBox>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
