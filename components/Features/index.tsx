'use client';

import React, { useEffect } from 'react';
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS for animations

const Features = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (1s)
      easing: 'ease-in-out', // Easing type for smooth animation
      once: true, // Only trigger once when scrolled into view
    });
  }, []);

  return (
    <section id="Services" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        {/* Add AOS animation to SectionTitle */}
        <div data-aos="fade-up" data-aos-delay="100">
          <SectionTitle
            title="Our Core Services"
            paragraph="From Web & Mobile App Development to Cybersecurity and Cloud Solutions, Corefort Technologies delivers powerful, secure, and scalable solutions that elevate your business."
            center
          />
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature) => (
            <div data-aos="fade-up" key={feature.id}>
              <SingleFeature feature={feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
