"use client"; // Client-side directive

import { useEffect } from "react";
import Pricing from "@/components/Pricing";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { metadata } from "./pricingMetadata"; // Import metadata
import AOS from "aos";
import "aos/dist/aos.css";

const PricingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // Set the animation duration
      once: true,    // Make the animation only trigger once
    });
  }, []);

  return (
    <>
      <Breadcrumb
        pageName="Our Prices"
        description="We are a tech company rooted in innovation and driven by impact — building secure, scalable, and smart solutions for businesses across industries. From mobile apps to cloud and cybersecurity, we’ve got you covered."
        data-aos="fade-up"
        data-aos-delay="200"
      />
      
      <div data-aos="fade-up" data-aos-delay="400">
        <Pricing />
      </div>
    </>
  );
};

export default PricingPage;
