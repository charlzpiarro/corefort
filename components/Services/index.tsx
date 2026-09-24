import SectionTitle from "@/components/Common/SectionTitle";
import ServiceCard from "./ServiceCard";
import servicesData from "./servicesData";

const Services = () => {
  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-28">
      <div className="container">
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="Core Capabilities"
            title="Technology Built Around Your Business"
            paragraph="Six practice areas, one engineering team. Corefort covers the full stack of software, infrastructure, and security a modern business depends on."
            center
            mb="64px"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <div key={service.id} data-aos="fade-up" data-aos-delay={index * 60}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
