import {
  IconCode,
  IconCloud,
  IconShieldLock,
  IconCreditCard,
  IconSignal,
  IconAutomation,
} from "@/components/Common/BrandIcons";

export type Service = {
  id: string;
  number: string;
  icon: (props: { className?: string }) => JSX.Element;
  title: string;
  description: string;
  /** What the practice covers (mirrors the capability list published on the site). */
  points: string[];
};

const servicesData: Service[] = [
  {
    id: "service-software-engineering",
    number: "01",
    icon: IconCode,
    title: "Software Engineering",
    description:
      "Custom platforms, business systems, APIs, and scalable digital products.",
    points: ["Custom platforms","Business systems","APIs","Web & mobile applications","Digital products"],
  },
  {
    id: "service-cloud-infrastructure",
    number: "02",
    icon: IconCloud,
    title: "Cloud & Infrastructure",
    description:
      "Reliable infrastructure, deployment, monitoring, networking, and cloud systems.",
    points: ["Infrastructure","Deployment","Monitoring","Networking","Cloud systems"],
  },
  {
    id: "service-cybersecurity",
    number: "03",
    icon: IconShieldLock,
    title: "Cybersecurity",
    description:
      "Security engineering, infrastructure protection, assessments, and secure architecture.",
    points: ["Security engineering","Infrastructure protection","Assessments","Secure architecture"],
  },
  {
    id: "service-fintech",
    number: "04",
    icon: IconCreditCard,
    title: "Fintech",
    description:
      "Payment infrastructure, financial platforms, transaction systems, and automation.",
    points: ["Payment infrastructure","Financial platforms","Transaction systems","Automation"],
  },
  {
    id: "service-connectivity",
    number: "05",
    icon: IconSignal,
    title: "Connectivity",
    description:
      "ISP infrastructure, network management, hotspot systems, and connectivity platforms.",
    points: ["ISP infrastructure","Network management","Hotspot systems","Connectivity platforms"],
  },
  {
    id: "service-ai-automation",
    number: "06",
    icon: IconAutomation,
    title: "AI & Automation",
    description:
      "Intelligent workflows, automation, data-driven systems, and AI-powered solutions.",
    points: ["Intelligent workflows","Automation","Data-driven systems","AI-powered solutions"],
  },
];

export default servicesData;
