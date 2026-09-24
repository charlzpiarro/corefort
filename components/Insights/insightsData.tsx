export type InsightCategory = "Technology" | "Cybersecurity" | "Business" | "Emerging Technology";

export type Insight = {
  slug: string;
  category: InsightCategory;
  title: string;
  summary: string;
  author: string;
  date: string; // ISO date
  readTime: string;
  body: string[]; // paragraphs
};

const insightsData: Insight[] = [
  {
    slug: "security-by-design-not-bolted-on",
    category: "Cybersecurity",
    title: "Security by Design, Not Bolted On",
    summary:
      "Why treating security as a final checklist item almost always costs more than building it into the architecture from day one.",
    author: "Corefort Team",
    date: "2026-06-12",
    readTime: "5 min read",
    body: [
      "Most security failures we see when reviewing existing systems don't come from a single exploited vulnerability. They come from decisions made early, before a single line of security-specific code was written, that made the eventual failure inevitable.",
      "A common pattern: a system is built quickly to meet a deadline, with authentication, access control, and data handling treated as details to be sorted out once the core product 'works'. By the time security is addressed, it has to be retrofitted around business logic that was never designed to support it. The result is usually a patchwork of fixes rather than a coherent security posture.",
      "Designing security in from the start doesn't mean slowing delivery down. It means asking a small set of questions before writing code: who should be able to access this data, what happens if this credential is compromised, what's the blast radius if this service fails. Answering those questions during architecture is far cheaper than answering them during an incident.",
      "This is the approach we take on every system we build: security considered as part of the architecture conversation, not a separate phase that happens after the 'real' engineering is done.",
    ],
  },
  {
    slug: "digital-transformation-for-east-african-smes",
    category: "Business",
    title: "What Digital Transformation Actually Means for East African SMEs",
    summary:
      "It's rarely about adopting the newest technology. It's about removing the manual bottlenecks that quietly cap how fast a business can grow.",
    author: "Corefort Team",
    date: "2026-04-03",
    readTime: "4 min read",
    body: [
      "\"Digital transformation\" gets used as a catch-all term, often attached to whatever technology is currently fashionable. For most small and mid-sized businesses we work with, the reality is much more specific: it's about identifying the two or three manual processes that are quietly limiting how much the business can handle, and fixing those first.",
      "For a retail business, that might be inventory reconciliation done by hand at the end of each day. For a service business, it might be tracking client work across scattered spreadsheets and WhatsApp messages. For an ISP or connectivity provider, it might be manually chasing down payments from dozens of agents every month.",
      "None of these problems require exotic technology to solve. They require software that fits how the business actually operates, not a generic tool the business has to reshape itself around. That's the distinction that determines whether a digital transformation effort sticks or gets abandoned after a few months.",
      "The businesses that get the most value from technology investment are the ones that start narrow: pick the bottleneck that's actually limiting growth, solve it properly, and expand from there.",
    ],
  },
  {
    slug: "real-cost-of-downtime-for-isps",
    category: "Technology",
    title: "The Real Cost of Downtime for ISPs and Connectivity Providers",
    summary:
      "For a connectivity business, an hour of downtime isn't just lost revenue. It's lost trust with agents and end users who have other options.",
    author: "Corefort Team",
    date: "2026-02-18",
    readTime: "4 min read",
    body: [
      "When we talk to ISPs and hotspot operators about infrastructure reliability, the conversation usually starts with revenue: how much does an hour of downtime cost in missed billing. That number matters, but it's often not the biggest cost.",
      "The bigger cost is trust. Agents and resellers who can't process payments during an outage don't just wait patiently. They start looking for alternatives, or they lose confidence in recommending your service to new customers. That damage tends to outlast the outage itself.",
      "This is why we design connectivity and billing infrastructure (including systems like NetPurse) around graceful degradation rather than assuming everything will always be online. Local caching, queued transaction processing, and clear status visibility for agents all reduce how much an outage actually disrupts operations on the ground.",
      "Reliability engineering for connectivity infrastructure isn't just about uptime percentages. It's about making sure that when something does go wrong, the business built on top of that infrastructure doesn't go wrong with it.",
    ],
  },
  {
    slug: "why-we-build-offline-first",
    category: "Emerging Technology",
    title: "Why We Build Offline-First",
    summary:
      "Assuming constant, reliable internet access is one of the most common mistakes in software built for African markets.",
    author: "Corefort Team",
    date: "2025-11-27",
    readTime: "3 min read",
    body: [
      "A lot of business software is designed with an unstated assumption: the internet connection will always be there. For businesses operating across Tanzania and the wider region, that assumption doesn't hold up: connectivity can be inconsistent, especially outside major urban centers.",
      "When we built LEDGE Biashara, offline-first wasn't a nice-to-have feature added later. It shaped the core architecture: a sale can be recorded, stock can be updated, and a receipt can be issued whether or not the device has an active connection at that moment. The system syncs everything once connectivity returns.",
      "This approach requires more upfront engineering than building for an always-online environment: you have to think carefully about conflict resolution, data integrity, and what happens when two offline changes need to be reconciled. But for a business owner standing at a till, the software either works or it doesn't. It's not their job to work around our architecture.",
      "Offline-first is one of the clearer examples of why software built for a specific market's operating reality performs better than software adapted from somewhere else.",
    ],
  },
];

export default insightsData;
