import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title="Built for Visionary Tech and Cyber Frontlines"
                paragraph="At Corefort, we don’t just build tools — we craft digital strongholds. Whether you're launching a product, securing infrastructure, or scaling smart, we bring bulletproof code and razor-sharp design to your mission."
                mb="44px"
              />
              <div
                className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0"
                data-aos="fade-up"
                data-aos-delay=".15s"
              >
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2 text-xm">
                    <List text="Premium quality design and usability" />
                    <List text="Responsive and mobile-ready layouts" />
                    <List text="Lifetime access with ongoing updates" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Optimized for performance and reliability" />
                    <List text="Built with maintainability in mind" />
                    <List text="Secure, scalable, and future-ready" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
            <div
              className="wow fadeInUp relative mx-auto aspect-[30/21] max-w-[700px] lg:mr-0"
              data-aos="fade-up"
              data-aos-delay=".2s"
            >
              <Image
                src="/images/about/about-image-4.jpg"
                alt="about-image"
                width={600} // match your container's max-width
                height={480} // match aspect ratio (you can tweak this)
                className="drop-shadow-three mx-auto max-w-full dark:hidden dark:drop-shadow-none lg:mr-0 w-full h-auto"
              />
              <Image
                src="/images/about/about-image-4.jpg"
                alt="about-image dark"
                width={500}
                height={480}
                className="drop-shadow-three mx-auto hidden max-w-full dark:block dark:drop-shadow-none lg:mr-0 w-full h-auto"
              />
            </div>
          </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
