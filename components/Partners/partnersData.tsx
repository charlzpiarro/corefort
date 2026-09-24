import { IconCloud, IconSignal, IconCreditCard } from "@/components/Common/BrandIcons";

export type PartnerCategory = {
  id: string;
  icon: (props: { className?: string }) => JSX.Element;
  title: string;
  description: string;
};

// Honest placeholder: category structure only, no named partners/logos until
// real relationships exist and can be verified.
const partnersData: PartnerCategory[] = [
  {
    id: "technology",
    icon: IconCloud,
    title: "Technology Partners",
    description: "Cloud, software, and platform relationships that support what we build.",
  },
  {
    id: "infrastructure",
    icon: IconSignal,
    title: "Infrastructure Partners",
    description: "Networking, hosting, and connectivity relationships behind our deployments.",
  },
  {
    id: "payments",
    icon: IconCreditCard,
    title: "Payment Partners",
    description: "Financial and payment technology relationships supporting products like NetPurse.",
  },
];

export default partnersData;
