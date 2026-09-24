import {
  IconCompass,
  IconAutomation,
  IconCloud,
  IconShieldLock,
  IconSignal,
  IconCreditCard,
  IconCode,
  IconSparkle,
} from "@/components/Common/BrandIcons";

export type Solution = {
  id: string;
  icon: (props: { className?: string }) => JSX.Element;
  title: string;
  problem: string;
  href?: string;
};

// Business problems Corefort solves, distinct from the "What We Do" capability
// list. Only entries with an `href` have a dedicated page this round.
const solutionsData: Solution[] = [
  {
    id: "digital-transformation",
    icon: IconCompass,
    title: "Digital Transformation",
    problem: "Manual, disconnected processes slow the business down as it grows.",
  },
  {
    id: "business-automation",
    icon: IconAutomation,
    title: "Business Automation",
    problem: "Repetitive operational work consumes time that should go to growth.",
    href: "/solutions/business-automation",
  },
  {
    id: "infrastructure-modernization",
    icon: IconCloud,
    title: "Infrastructure Modernization",
    problem: "Aging infrastructure can't reliably support current demand.",
  },
  {
    id: "secure-digital-systems",
    icon: IconShieldLock,
    title: "Secure Digital Systems",
    problem: "Systems were built fast, without security considered from the start.",
  },
  {
    id: "network-connectivity",
    icon: IconSignal,
    title: "Network & Connectivity",
    problem: "Connectivity and network operations are hard to manage and monetize.",
  },
  {
    id: "payment-financial-systems",
    icon: IconCreditCard,
    title: "Payment & Financial Systems",
    problem: "Collecting and reconciling payments is manual and error-prone.",
    href: "/solutions/payment-financial-systems",
  },
  {
    id: "enterprise-software",
    icon: IconCode,
    title: "Enterprise Software",
    problem: "Off-the-shelf tools don't fit how the business actually operates.",
  },
  {
    id: "ai-powered-operations",
    icon: IconSparkle,
    title: "AI-Powered Operations",
    problem: "Teams lack the insight to act on the data they already collect.",
  },
];

export default solutionsData;
