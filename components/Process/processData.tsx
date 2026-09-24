import {
  IconSearch,
  IconBlueprint,
  IconHammer,
  IconRocket,
  IconTrendUp,
} from "@/components/Common/BrandIcons";

export type ProcessStep = {
  id: number;
  number: string;
  icon: (props: { className?: string }) => JSX.Element;
  title: string;
  description: string;
};

const processData: ProcessStep[] = [
  {
    id: 1,
    number: "01",
    icon: IconSearch,
    title: "Discover",
    description:
      "Understand the business, users, requirements, and technical environment.",
  },
  {
    id: 2,
    number: "02",
    icon: IconBlueprint,
    title: "Architect",
    description:
      "Design the technical architecture, infrastructure, security model, and user experience.",
  },
  {
    id: 3,
    number: "03",
    icon: IconHammer,
    title: "Build",
    description:
      "Engineer the platform using modern technologies and development practices.",
  },
  {
    id: 4,
    number: "04",
    icon: IconRocket,
    title: "Deploy",
    description:
      "Launch the system with production infrastructure, monitoring, and security.",
  },
  {
    id: 5,
    number: "05",
    icon: IconTrendUp,
    title: "Scale",
    description:
      "Continuously improve, maintain, optimize, and scale the platform.",
  },
];

export default processData;
