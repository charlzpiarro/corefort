import company from "../../../shared/corefort-company.json";

/**
 * Corefort knowledge base for the assistant.
 *
 * SOURCE OF TRUTH: everything here mirrors content already published on the Corefort website.
 * When the site changes, update this file. Mapping:
 *  - contact/locations/social ..... shared/corefort-company.json (also used by the site Footer)
 *  - capabilities ................. components/Services/servicesData.tsx
 *  - solutions .................... components/Solutions/solutionsData.tsx + app/solutions/*
 *  - products ..................... components/Products/productsData.tsx + app/products/*
 *  - industries ................... components/Industries/industriesData.tsx + app/industries/*
 *  - security approach ............ components/Security/securityData.tsx + app/security
 *  - process / values ............. components/Process, components/WhyCorefort, app/company
 *  - FAQ / insights ............... components/FAQ/faqData.tsx, components/Insights/insightsData.tsx
 *
 * Rule: if a fact is not in this file, the assistant must not state it.
 */

export const SOLUTION_NAMES = [
  "Digital Transformation",
  "Business Automation",
  "Infrastructure Modernization",
  "Secure Digital Systems",
  "Network & Connectivity",
  "Payment & Financial Systems",
  "Enterprise Software",
  "AI-Powered Operations",
] as const;

/** Values accepted by the lead form for the "relevant solution" field. */
export const LEAD_SOLUTION_OPTIONS = [...SOLUTION_NAMES, "NetPurse", "LEDGE Biashara", "Cybersecurity", "Not sure yet"];

/**
 * Budget bands offered to visitors (optional). The Worker only accepts these exact values.
 * Keep in sync with QUOTE_BUDGETS in components/CorefortAI/config.ts.
 */
export const BUDGET_OPTIONS = [
  "Under TZS 5M (about USD 2,000)",
  "TZS 5M to 20M (about USD 2,000 to 8,000)",
  "TZS 20M to 50M (about USD 8,000 to 20,000)",
  "TZS 50M to 100M (about USD 20,000 to 40,000)",
  "Over TZS 100M (over USD 40,000)",
  "Not sure yet, prefer to discuss",
];

export const CONTACT = {
  phone: company.phone,
  email: company.email,
  locations: company.locations,
};

export const KNOWLEDGE_BASE = `
COMPANY
- Corefort Technologies is a technology company and technology partner that helps businesses build, secure, modernize and scale their technology infrastructure and operations.
- Registered in the United Republic of Tanzania and with BRELA (the Business Registrations and Licensing Agency). The registration number is not published.
- Offices in ${company.locations.join(" and ")}. Works with businesses across the region.
- Dar es Salaam office address: ${company.address}. The Zanzibar street address, opening hours and walk-in policy are not published. If a visitor wants to visit an office, ask them to contact the team first to arrange it.
- FOUNDERS: Corefort has two founders. Mr. Charles Kikare Masima is the Chief Executive Officer (CEO). Mr. Iyanbinwell Mwakibinga is the Chief Technology Officer (CTO). Both are software engineers, entrepreneurs and cybersecurity enthusiasts. Nothing more about them is published (no education, age, earlier companies, achievements or personal contact details): if asked for more, say you don't have confirmed information on that and offer to connect the visitor with the team.
- Also designs and operates its own products (NetPurse, LEDGE Biashara).

CAPABILITY AREAS (what we do)
- Software Engineering: custom platforms, business systems, APIs, web and mobile applications, digital products.
- Cloud & Infrastructure: infrastructure, deployment, monitoring, networking, cloud systems.
- Cybersecurity: security engineering, infrastructure protection, assessments, secure architecture.
- Fintech: payment infrastructure, financial platforms, transaction systems, automation.
- Connectivity: ISP infrastructure, network management, hotspot systems, connectivity platforms.
- AI & Automation: intelligent workflows, automation, data-driven systems, AI-powered solutions.
- Also: enterprise systems and technology consulting.

SOLUTIONS (business problems we solve)
- Digital Transformation: manual, disconnected processes slow the business down as it grows.
- Business Automation: repetitive operational work consumes time that should go to growth. Our approach: find the specific process limiting growth, then build software around how the business really operates (including inconsistent connectivity and multi-branch operations). Evidence: LEDGE Biashara.
- Infrastructure Modernization: aging infrastructure cannot reliably support current demand.
- Secure Digital Systems: systems were built fast without security considered from the start.
- Network & Connectivity: connectivity and network operations are hard to manage and monetize.
- Payment & Financial Systems: collecting and reconciling payments is manual and error-prone. Approach: one system for billing, collection and reconciliation, designed for agent networks and variable connectivity. Evidence: NetPurse.
- Enterprise Software: off-the-shelf tools do not fit how the business actually operates.
- AI-Powered Operations: teams lack insight to act on data they already collect.
- Detail pages exist for Business Automation and Payment & Financial Systems (/solutions/...); the other solutions are described on /solutions.

PRODUCTS (built and operated by Corefort)
- NetPurse: connectivity and payment infrastructure platform for ISPs and businesses. Category: Connectivity & Payments. For ISPs, hotspot/Wi-Fi operators, and agents/resellers. Documented features: hotspot and data billing management, automated payment collection, agent and reseller management, real-time usage analytics. Page: /products/netpurse. NetPurse's own website: https://netpurse.co.tz/
- LEDGE Biashara: business management and point-of-sale (POS) platform for SMEs. Category: Business Management & POS. For retail businesses, SMEs with several branches, owners who need visibility without constant connectivity. Documented features: point-of-sale and inventory tracking, sales and expense management, multi-branch oversight, offline-first reliability. Page: /products/ledge-biashara
- No other products are published. Do not describe features beyond the lists above.

INDUSTRIES (sectors the website covers; each has a detail page at /industries/<slug>)
- Healthcare (/industries/healthcare): patient systems and health-data platforms built for reliability and privacy. Custom builds can include patient records, appointments, billing tracking, pharmacy/inventory, role-based access and audit trails, reporting.
- Retail & Commerce (/industries/retail-commerce): POS, inventory and commerce platforms. LEDGE Biashara covers POS, inventory, sales and expenses, multi-branch oversight and offline-first use; integrations or extensions are custom.
- Financial Services (/industries/financial-services): secure payment rails, transaction systems, financial infrastructure. Custom builds can include transaction systems, reconciliation automation, agent/collector management, dashboards, audit trails. NetPurse handles payment collection for connectivity businesses. Corefort is not a licensed financial institution.
- Education (/industries/education): digital learning and institutional management systems. Custom builds can include student records, attendance and results, fee management, timetables, learning portals, reporting.
- Telecommunications (/industries/telecommunications): network, billing and connectivity platforms for ISPs and operators. NetPurse covers hotspot/data billing, automated payment collection, agent/reseller management and usage analytics; broader network tooling is custom.
- Enterprise (/industries/enterprise): custom business systems that streamline operations at scale (internal platforms, workflow automation, APIs and integrations, infrastructure modernization, reporting, AI-powered operations).
- Logistics (/industries/logistics): tracking, dispatch and fleet platforms for real-time operations. Custom builds can include shipment and vehicle tracking, dispatch, driver mobile apps, proof of delivery, fleet records, dashboards.
- Professional Services (/industries/professional-services): workflow and client-management tools for service businesses. Custom builds can include client management, engagement tracking, time and billing, document management, client portals, reporting.
- Corefort has documented products only for connectivity/payments (NetPurse) and retail/SME operations (LEDGE Biashara). For any other sector, custom development is the route, scoped with the team. Industry pages describe what can be built, not past client projects.

HOW WE WORK
1 Discover: understand the business, users, requirements and technical environment. 2 Architect: design architecture, infrastructure, security model and user experience. 3 Build: engineer the platform with modern technologies and practices. 4 Deploy: launch with production infrastructure, monitoring and security. 5 Scale: continuously improve, maintain, optimize and scale.
- Projects start with a discovery conversation; a realistic timeline is given after discovery. Support continues after launch (monitoring, maintenance, improvements).

SECURITY APPROACH (described as practices, NOT certifications)
- Data protection (encryption in transit and at rest, limited access), secure development, identity and access management (role-based, least privilege), monitoring, backup and recovery, incident response, vulnerability management, business continuity, security testing.
- Corefort does not claim formal certification, audit or regulatory accreditation on the website. Never claim ISO, SOC, PCI, GDPR compliance or similar.

DIFFERENTIATORS (as published)
- Engineering-first thinking, security by design, scalable architecture, business-focused solutions, long-term support, modern infrastructure, local understanding with global standards, built for real-world conditions (uneven connectivity, multi-branch operations).

ORGANIZATIONS SHOWN ON THE WEBSITE (homepage and /partners)
- Manonga Medical Clinic, Noble Academy, Infinitynest Company Limited, Onyango Company Limited, Noble Printing and Eaglelife Company Limited are shown as organizations that work with Corefort. Do not add or imply other names, and do not describe what work was done for any of them.

PRICING
- Hosting plan prices are listed on the website Pricing page (/pricing); do not quote numbers from memory - point to the page.
- Pricing for custom software, systems, security or integration work is NOT published. It depends on scope. Direct the visitor to request a quote.

CONTACT (official)
- Phone: ${company.phone}
- Email: ${company.email}
- Locations: ${company.locations.join("; ")}
- Website pages: /contact (contact form), /solutions, /products, /industries, /security, /company, /insights, /faq, /pricing
`.trim();
