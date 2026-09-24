import SectionTitle from "@/components/Common/SectionTitle";
import Stage from "@/components/Common/Stage";
import ProcessTimeline from "./ProcessTimeline";

const Process = () => {
  return (
    <Stage tone="tint" id="process">
      <div data-aos="fade-up">
        <SectionTitle
          eyebrow="How We Work"
          title="From Idea to Production"
          paragraph="A clear, repeatable engineering process that takes a project from first conversation to a system running reliably in production."
          center
          mb="56px"
        />
      </div>
      <ProcessTimeline />
    </Stage>
  );
};

export default Process;
