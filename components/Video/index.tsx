"use client";

import { useEffect } from "react";
import SectionTitle from "../Common/SectionTitle";
import AOS from "aos"; 
import "aos/dist/aos.css";

const Video = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="We’re Here to Help"
          paragraph="At Forecort, we specialize in delivering powerful, practical solutions. Whether it’s tech, support, or strategy — we’ve got you covered."
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div className="relative aspect-[77/40] flex items-center justify-center">
                {/* HTML5 Video */}
                <video
                  className="w-full h-full object-cover rounded-md"
                  src="/images/video/coreforttech.mp4" 
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false} // Optional: hide native controls
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Video;
