import {
  IconPulse,
  IconBag,
  IconBank,
  IconCap,
  IconTower,
  IconBuilding,
  IconTruck,
  IconBriefcase,
} from "@/components/Common/BrandIcons";

export type Industry = {
  id: number;
  slug: string;
  icon: (props: { className?: string }) => JSX.Element;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** CSS object-position for the photo crop. */
  position: string;
  /** Tailwind grid-span classes for the homepage bento (lg and up). */
  span: string;
  /** Detail page: every industry has one at /industries/[slug]. */
  href: string;
};

// Order matters: the bento grid on the homepage relies on this DOM order.
const industriesData: Industry[] = [
  {
    id: 1,
    slug: "healthcare",
    icon: IconPulse,
    title: "Healthcare",
    description: "Patient systems and health-data platforms built for reliability and privacy.",
    image: "/images/industries/healthcare.webp",
    alt: "A gloved hand and a bare hand clasped together against a blue background, representing care",
    position: "50% 55%",
    span: "lg:col-span-2 lg:row-span-2",
    href: "/industries/healthcare",
  },
  {
    id: 2,
    slug: "retail-commerce",
    icon: IconBag,
    title: "Retail & Commerce",
    description: "POS, inventory, and commerce platforms that keep sales moving.",
    image: "/images/industries/retail.webp",
    alt: "A modern point-of-sale terminal on a table in a busy restaurant",
    position: "50% 50%",
    span: "",
    href: "/industries/retail-commerce",
  },
  {
    id: 3,
    slug: "financial-services",
    icon: IconBank,
    title: "Financial Services",
    description: "Secure payment rails, transaction systems, and financial infrastructure.",
    image: "/images/industries/financial-services.webp",
    alt: "Charts, graphs and a calculator on a desk during a financial review",
    position: "50% 40%",
    span: "",
    href: "/industries/financial-services",
  },
  {
    id: 4,
    slug: "education",
    icon: IconCap,
    title: "Education",
    description: "Digital learning and institutional management systems that scale.",
    image: "/images/industries/education.webp",
    alt: "A smiling student with a laptop in a busy classroom",
    position: "50% 35%",
    span: "lg:col-span-2",
    href: "/industries/education",
  },
  {
    id: 5,
    slug: "telecommunications",
    icon: IconTower,
    title: "Telecommunications",
    description: "Network, billing, and connectivity platforms for ISPs and operators.",
    image: "/images/industries/telecommunications.webp",
    alt: "Two people shaking hands in front of a glowing digital globe",
    position: "50% 50%",
    span: "lg:row-span-2",
    href: "/industries/telecommunications",
  },
  {
    id: 6,
    slug: "enterprise",
    icon: IconBuilding,
    title: "Enterprise",
    description: "Custom business systems that streamline operations at scale.",
    image: "/images/industries/enterprise.webp",
    alt: "Two business leaders shaking hands in front of a city skyline",
    position: "50% 62%",
    span: "lg:row-span-2",
    href: "/industries/enterprise",
  },
  {
    id: 7,
    slug: "logistics",
    icon: IconTruck,
    title: "Logistics",
    description: "Tracking, dispatch, and fleet platforms built for real-time operations.",
    image: "/images/industries/logistics.webp",
    alt: "Two people shaking hands overlooking a container port with cranes and trucks at dusk",
    position: "50% 45%",
    span: "lg:col-span-2",
    href: "/industries/logistics",
  },
  {
    id: 8,
    slug: "professional-services",
    icon: IconBriefcase,
    title: "Professional Services",
    description: "Workflow and client-management tools tailored to service businesses.",
    image: "/images/industries/professional-services.webp",
    alt: "A professional working at a laptop in a bright office",
    position: "50% 22%",
    span: "lg:col-span-2",
    href: "/industries/professional-services",
  },
];

export default industriesData;
