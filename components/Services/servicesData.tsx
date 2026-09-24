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
};

const servicesData: Service[] = [
  {
    id: "service-software-engineering",
    number: "01",
    icon: IconCode,
    title: "Software Engineering",
    description:
      "Custom platforms, business systems, APIs, and scalable digital products.",
  },
  {
    id: "service-cloud-infrastructure",
    number: "02",
    icon: IconCloud,
    title: "Cloud & Infrastructure",
    description:
      "Reliable infrastructure, deployment, monitoring, networking, and cloud systems.",
  },
  {
    id: "service-cybersecurity",
    number: "03",
    icon: IconShieldLock,
    title: "Cybersecurity",
    description:
      "Security engineering, infrastructure protection, assessments, and secure architecture.",
  },
  {
    id: "service-fintech",
    number: "04",
    icon: IconCreditCard,
    title: "Fintech",
    description:
      "Payment infrastructure, financial platforms, transaction systems, and automation.",
  },
  {
    id: "service-connectivity",
    number: "05",
    icon: IconSignal,
    title: "Connectivity",
    description:
      "ISP infrastructure, network management, hotspot systems, and connectivity platforms.",
  },
  {
    id: "service-ai-automation",
    number: "06",
    icon: IconAutomation,
    title: "AI & Automation",
    description:
      "Intelligent workflows, automation, data-driven systems, and AI-powered solutions.",
  },
];

export default servicesData;
