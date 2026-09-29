export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  accent: "primary" | "secondary";
  /** Official logo (see public/images/products). `tone` is the panel it is designed to sit on. */
  logo: { src: string; width: number; height: number; tone: "light" | "dark" };
  /** Internal detail page. */
  href: string;
  /** The product's own website, when it has one. */
  external?: { url: string; label: string };
  /** The engineering story: what Corefort actually built, real and verifiable. */
  caseStudy: { challenge: string; solution: string; technology: string; outcome: string };
};

// No usage figures here on purpose: the site does not publish statistics that are not verified.
const productsData: Product[] = [
  {
    id: "product-netpurse",
    slug: "netpurse",
    name: "NetPurse",
    category: "Connectivity & Payments",
    description:
      "A connectivity and payment infrastructure platform designed for ISPs and businesses.",
    features: [
      "Hotspot and data billing management",
      "Automated payment collection",
      "Agent and reseller management",
      "Real-time usage analytics",
    ],
    accent: "primary",
    logo: { src: "/images/products/netpurse-logo.webp", width: 480, height: 480, tone: "light" },
    href: "/products/netpurse",
    external: { url: "https://netpurse.co.tz/", label: "Visit netpurse.co.tz" },
    caseStudy: {
      challenge:
        "ISPs and connectivity businesses needed a way to manage hotspot access, agents, and payments without stitching together disconnected tools.",
      solution:
        "Corefort engineered a unified platform combining connectivity management with integrated payment collection, giving operators one system for billing, access control, and reconciliation.",
      technology: "Cloud infrastructure, payment gateway integrations, network access management.",
      outcome:
        "Operators can onboard agents, manage hotspot billing, and reconcile payments from a single dashboard instead of manual, fragmented processes.",
    },
  },
  {
    id: "product-ledge-biashara",
    slug: "ledge-biashara",
    name: "LEDGE Biashara",
    category: "Business Management & POS",
    description:
      "A business management and POS platform designed for SMEs.",
    features: [
      "Point-of-sale and inventory tracking",
      "Sales and expense management",
      "Multi-branch oversight",
      "Offline-first reliability",
    ],
    accent: "secondary",
    logo: { src: "/images/products/ledge-wordmark.png", width: 766, height: 194, tone: "dark" },
    href: "/products/ledge-biashara",
    caseStudy: {
      challenge:
        "SMEs needed a point-of-sale and business management system reliable enough for daily operations, even with inconsistent internet connectivity.",
      solution:
        "Corefort built an offline-first POS and inventory platform that syncs seamlessly once connectivity returns, with multi-branch oversight for growing businesses.",
      technology: "Cross-platform application, offline-first data sync, cloud backend.",
      outcome:
        "SME owners gain real-time visibility into sales, stock, and expenses across branches without depending on constant connectivity.",
    },
  },
];

export default productsData;
