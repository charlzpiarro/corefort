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
  /** Illustrative photo for the explorer panel (public/images/photos). Optional. */
  image?: { src: string; alt: string; width: number; height: number; position?: string };
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
    image: {"src":"/images/photos/erp-dashboard.webp","alt":"A laptop showing a business dashboard with inventory, sales and report charts","width":1000,"height":667},
  },
  {
    id: "service-cloud-infrastructure",
    number: "02",
    icon: IconCloud,
    title: "Cloud & Infrastructure",
    description:
      "Reliable infrastructure, deployment, monitoring, networking, and cloud systems.",
    points: ["Infrastructure","Deployment","Monitoring","Networking","Cloud systems"],
    image: {"src":"/images/photos/network-globe.webp","alt":"A globe connected by cables to a router and storage, representing cloud and infrastructure","width":900,"height":836},
  },
  {
    id: "service-cybersecurity",
    number: "03",
    icon: IconShieldLock,
    title: "Cybersecurity",
    description:
      "Security engineering, infrastructure protection, assessments, and secure architecture.",
    points: ["Security engineering","Infrastructure protection","Assessments","Secure architecture"],
    image: {"src":"/images/photos/security-desk.webp","alt":"A laptop showing a shield, a padlock and a Wi-Fi symbol","width":1000,"height":790},
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
    image: {"src":"/images/photos/network-devices.webp","alt":"Phones, a laptop, a tablet and a TV connected through a router to the internet","width":1000,"height":1000},
  },
  {
    id: "service-ai-automation",
    number: "06",
    icon: IconAutomation,
    title: "AI & Automation",
    description:
      "Intelligent workflows, automation, data-driven systems, and AI-powered solutions.",
    points: ["Intelligent workflows","Automation","Data-driven systems","AI-powered solutions"],
    image: {"src":"/images/photos/ai-robot.webp","alt":"A friendly robot with glowing blue eyes","width":800,"height":1028,"position":"50% 30%"},
  },
];

export default servicesData;
