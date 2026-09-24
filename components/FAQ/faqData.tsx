export type FAQCategory = "General" | "Services" | "Security" | "Projects";

export type FAQItem = {
  category: FAQCategory;
  q: string;
  a: string;
};

const faqData: FAQItem[] = [
  {
    category: "General",
    q: "What does Corefort Technologies do?",
    a: "We build software, cloud infrastructure, cybersecurity, connectivity, and fintech systems for businesses, and we operate our own products like NetPurse and LEDGE Biashara.",
  },
  {
    category: "General",
    q: "Where do you operate?",
    a: "We're based in Dar es Salaam and Zanzibar, Tanzania, and work with clients across the region.",
  },
  {
    category: "General",
    q: "Who do you work with?",
    a: "Businesses, ISPs, and organizations that need custom software, secure infrastructure, or connectivity and payment systems, from SMEs to larger operators.",
  },
  {
    category: "Services",
    q: "Do you build custom software?",
    a: "Yes. Custom platforms, business systems, APIs, and digital products built around your actual requirements, not a generic template.",
  },
  {
    category: "Services",
    q: "Do you provide ongoing support?",
    a: "Yes. Our relationship continues after launch: monitoring, maintenance, and improvements, not a one-time handoff.",
  },
  {
    category: "Services",
    q: "Can you work with our existing systems?",
    a: "Yes. We regularly maintain, secure, and modernize platforms that were built by another provider.",
  },
  {
    category: "Services",
    q: "Can you integrate with our existing infrastructure?",
    a: "In most cases, yes. We assess your current infrastructure during discovery and design integrations around it rather than requiring a full rebuild.",
  },
  {
    category: "Security",
    q: "How do you protect customer data?",
    a: "Data is encrypted in transit and at rest, access is limited by role, and production systems are monitored for unusual activity.",
  },
  {
    category: "Security",
    q: "What security standards do you follow?",
    a: "We follow industry best practices for secure development, access control, and infrastructure security. See our Security page for specifics. We're clear about the difference between best practices and formal certification.",
  },
  {
    category: "Security",
    q: "How do you approach application and infrastructure security?",
    a: "Security is considered during architecture and design, not added at the end, from access control to monitoring to incident response.",
  },
  {
    category: "Projects",
    q: "How does the engagement process work?",
    a: "Discover, architect, build, deploy, and support, outlined in more detail on our How We Work page.",
  },
  {
    category: "Projects",
    q: "How long does implementation take?",
    a: "It depends on scope. A focused platform can take weeks; a larger enterprise system takes longer. We give a realistic timeline after discovery, not before.",
  },
  {
    category: "Projects",
    q: "How are projects scoped?",
    a: "We start with a discovery conversation to understand the actual problem, then define architecture and scope before any development begins.",
  },
  {
    category: "Projects",
    q: "Do you provide post-deployment support?",
    a: "Yes. Monitoring, maintenance, and continuous improvement are part of how we work, not an optional add-on.",
  },
];

export default faqData;
