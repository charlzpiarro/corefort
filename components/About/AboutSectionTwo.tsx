import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
        <div className="w-full px-4 lg:w-1/2">
          <div
            className="wow fadeInUp relative mx-auto mb-12 max-w-[500px] text-center lg:m-0"
            data-aos="fade-up"
            data-aos-delay=".15s"
          >
            <Image
              src="/images/about/about-image-2.svg"
              alt="about image"
              width={500}
              height={480} // adjust according to your image's real aspect ratio
              className="drop-shadow-three dark:hidden dark:drop-shadow-none w-full h-auto"
            />
            <Image
              src="/images/about/about-image-2-dark.svg"
              alt="about image"
              width={500}
              height={480}
              className="drop-shadow-three hidden dark:block dark:drop-shadow-none w-full h-auto"
            />
          </div>
        </div>

          <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp max-w-[470px]"
              data-aos="fade-up"
              data-aos-delay=".2s"
            >
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Reliable Performance
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Our systems are built with precision, ensuring seamless functionality and minimal downtime to support your growing business.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Dedicated Support Team
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  We provide responsive, knowledgeable support to help resolve issues quickly and keep your operations running smoothly.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Scalable Solutions
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Our technology adapts with you — designed to grow with your needs, from startups to enterprise-level infrastructures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
