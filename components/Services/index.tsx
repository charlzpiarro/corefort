import SectionTitle from "@/components/Common/SectionTitle";
import Stage from "@/components/Common/Stage";
import ServiceExplorer from "./ServiceExplorer";

const Services = () => {
  return (
    <Stage tone="ink" id="services" className="pt-10 md:pt-14">
      <div data-aos="fade-up">
        <SectionTitle
          eyebrow="Core Capabilities"
          title="Technology Built Around Your Business"
          paragraph="Six practice areas, one engineering team. Corefort covers the full stack of software, infrastructure, and security a modern business depends on."
          center
          light
          mb="48px"
        />
      </div>
      <div data-aos="fade-up" data-aos-delay="80">
        <ServiceExplorer />
      </div>
    </Stage>
  );
};

export default Services;
