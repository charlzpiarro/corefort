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
  },
];

export default productsData;
