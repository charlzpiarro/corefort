export type CaseStudy = {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  technology: string;
  outcome: string;
  accent: "primary" | "secondary";
};

const caseStudiesData: CaseStudy[] = [
  {
    id: "case-netpurse",
    client: "NetPurse",
    industry: "Telecommunications & Fintech",
    challenge:
      "ISPs and connectivity businesses needed a way to manage hotspot access, agents, and payments without stitching together disconnected tools.",
    solution:
      "Corefort engineered a unified platform combining connectivity management with integrated payment collection, giving operators one system for billing, access control, and reconciliation.",
    technology:
      "Cloud infrastructure, payment gateway integrations, network access management.",
    outcome:
      "Operators can onboard agents, manage hotspot billing, and reconcile payments from a single dashboard instead of manual, fragmented processes.",
    accent: "primary",
  },
  {
    id: "case-ledge-biashara",
    client: "LEDGE Biashara",
    industry: "Retail & Commerce",
    challenge:
      "SMEs needed a point-of-sale and business management system reliable enough for daily operations, even with inconsistent internet connectivity.",
    solution:
      "Corefort built an offline-first POS and inventory platform that syncs seamlessly once connectivity returns, with multi-branch oversight for growing businesses.",
    technology:
      "Cross-platform application, offline-first data sync, cloud backend.",
    outcome:
      "SME owners gain real-time visibility into sales, stock, and expenses across branches without depending on constant connectivity.",
    accent: "secondary",
  },
];

export default caseStudiesData;
