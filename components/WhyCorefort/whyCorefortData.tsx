import {
  IconCode,
  IconShieldLock,
  IconLayers,
  IconTarget,
  IconLifeBuoy,
  IconCloud,
  IconGlobe,
  IconSignal,
} from "@/components/Common/BrandIcons";

export type WhyItem = {
  id: number;
  icon: (props: { className?: string }) => JSX.Element;
  title: string;
  description: string;
};

const whyCorefortData: WhyItem[] = [
  {
    id: 1,
    icon: IconCode,
    title: "Engineering-first thinking",
    description: "Every decision starts from sound engineering, not shortcuts.",
  },
  {
    id: 2,
    icon: IconShieldLock,
    title: "Security by design",
    description: "Protection is built into architecture from day one, not bolted on later.",
  },
  {
    id: 3,
    icon: IconLayers,
    title: "Scalable architecture",
    description: "Systems designed to grow with your business, not against it.",
  },
  {
    id: 4,
    icon: IconTarget,
    title: "Business-focused solutions",
    description: "Technology decisions grounded in real business outcomes.",
  },
  {
    id: 5,
    icon: IconLifeBuoy,
    title: "Long-term technical support",
    description: "We stay engaged after launch, not just through delivery.",
  },
  {
    id: 6,
    icon: IconCloud,
    title: "Modern infrastructure",
    description: "Cloud-native, monitored, and built for reliability at scale.",
  },
  {
    id: 7,
    icon: IconGlobe,
    title: "Local understanding, global standards",
    description: "Regional context paired with international engineering practices.",
  },
  {
    id: 8,
    icon: IconSignal,
    title: "Built for real-world conditions",
    description: "Designed for uneven connectivity and multi-branch operations, not ideal lab setups.",
  },
];

export default whyCorefortData;
