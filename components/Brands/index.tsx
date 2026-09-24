import SectionTitle from "@/components/Common/SectionTitle";
import brandsData from "./brandsData";
import LogoMarquee from "./LogoMarquee";

const Brands = () => {
  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="container">
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="Partners & Clients"
            title="Organizations That Work With Corefort"
            paragraph="Clinics, schools, businesses and more rely on Corefort to build and support the systems they run on."
            center
            mb="48px"
          />
        </div>
      </div>

      {/* full-bleed so the row runs edge to edge */}
      <div data-aos="fade-up" data-aos-delay="100">
        <LogoMarquee brands={brandsData} />
      </div>
    </section>
  );
};

export default Brands;
