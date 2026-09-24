/**
 * Detail-page content for each industry.
 *
 * Honesty rules (same as the rest of the site):
 *  - Ready-made products exist only for connectivity/payments (NetPurse) and retail/SME operations
 *    (LEDGE Biashara). Everything else is described as custom development.
 *  - Scenarios are illustrative, never presented as client case studies.
 *  - Security is described as engineering practice, never as certification or compliance.
 *  - No statistics, client names or guarantees.
 */

export type Build = { title: string; body: string; tag: "Product" | "Custom" };
export type Scenario = { title: string; situation: string; approach: string };
export type Link = { label: string; href: string };

export type IndustryDetail = {
  slug: string;
  metaDescription: string;
  overview: string[];
  glance: { label: string; value: string }[];
  challenges: { title: string; body: string }[];
  builds: Build[];
  scenarios: Scenario[];
  localNote: { title: string; body: string };
  security: { intro: string; points: string[]; disclaimer: string };
  productNote: string;
  relevant: Link[];
  process: { discover: string; architect: string; build: string; deploy: string; scale: string };
  faqs: { q: string; a: string }[];
};

const PRICING_FAQ = {
  q: "How long will it take and what will it cost?",
  a: "Timelines and pricing depend on scope, so neither is published for custom work. After a discovery conversation we give you a realistic timeline, and you can request a quote at any time.",
};

const INTEGRATION_FAQ = {
  q: "Can you work with the systems we already use?",
  a: "Integration with existing systems is scoped during discovery. What is practical depends on what those systems make available, and we will tell you plainly what is and is not realistic before anything is built.",
};

const DISCLAIMER =
  "We describe these as engineering practices. Corefort does not claim formal certification, audit or regulatory accreditation, and a system is never described as compliant with a standard unless that has actually been assessed.";

export const industryDetails: IndustryDetail[] = [
  // ---------------------------------------------------------------- HEALTHCARE
  {
    slug: "healthcare",
    metaDescription:
      "Patient-record, appointment and pharmacy platforms from Corefort Technologies, designed for reliability and privacy in clinics, pharmacies and health providers.",
    overview: [
      "Healthcare runs on records, schedules and trust. When a clinic's systems are slow, disconnected or unreliable, the effect shows up at the front desk, in the pharmacy and eventually in patient care. Corefort builds patient systems and health-data platforms designed around reliability and privacy from the first design conversation.",
      "Clinics, pharmacies and health providers rarely fit a generic template. Registration, billing, stock and reporting differ from one facility to the next. We start by understanding how your facility actually works, then build the software around that, not the other way around.",
    ],
    glance: [
      { label: "Typical organisations", value: "Clinics, pharmacies, laboratories and health providers" },
      { label: "Ready-made product", value: "None for this sector" },
      { label: "Our route", value: "Discovery, then a scoped custom build" },
      { label: "Focus", value: "Reliability and privacy" },
    ],
    challenges: [
      {
        title: "Paper and disconnected records",
        body: "Patient details, visit notes and billing sit in paper files, spreadsheets and separate tools. Every visit takes longer and history is hard to find.",
      },
      {
        title: "Privacy that cannot be an afterthought",
        body: "Health data is among the most sensitive information an organisation holds. Access must be limited to the right people, and sensitive actions must be traceable.",
      },
      {
        title: "Systems that must stay available",
        body: "A front desk that cannot look up a patient, or a pharmacy that cannot check stock during an outage, loses time exactly when time matters.",
      },
      {
        title: "Stock and supplies visibility",
        body: "Medicines and consumables that run out unexpectedly, or expire unnoticed, create avoidable risk and cost.",
      },
    ],
    builds: [
      { title: "Patient registration and records", body: "A single place for patient details, visit history and notes, with fast search at the front desk.", tag: "Custom" },
      { title: "Appointments and reminders", body: "Scheduling that shows each practitioner's day and reduces double bookings and missed visits.", tag: "Custom" },
      { title: "Billing and payment tracking", body: "Charges, payments and outstanding balances recorded against each visit and reconciled without spreadsheets.", tag: "Custom" },
      { title: "Pharmacy and inventory management", body: "Stock levels, reorder points and expiry tracking so supplies are visible before they become a problem.", tag: "Custom" },
      { title: "Role-based access and audit trails", body: "Staff see only what their role needs, and sensitive actions leave a record.", tag: "Custom" },
      { title: "Management reporting", body: "Dashboards that show activity, revenue and stock across one facility or several.", tag: "Custom" },
    ],
    scenarios: [
      {
        title: "A clinic moving off paper",
        situation: "Patient files are kept in folders and billing is done in a notebook. Finding a returning patient's history takes minutes.",
        approach: "A records and billing system built around the clinic's own registration and consultation flow, with role-based access and backups planned from the start.",
      },
      {
        title: "A pharmacy with two branches",
        situation: "Each branch counts stock separately, so shortages and expiries are noticed late and transfers are managed by phone call.",
        approach: "Shared inventory with branch-level views, reorder alerts and a simple transfer flow, so both locations work from the same numbers.",
      },
      {
        title: "A provider with several sites",
        situation: "Management gets reports weeks late because each site compiles its own figures by hand.",
        approach: "Consolidated reporting fed directly from day-to-day records, so leadership sees current activity without waiting for a monthly compile.",
      },
    ],
    localNote: {
      title: "Designed for uneven connectivity",
      body: "Not every facility has a dependable connection all day. Where it makes sense, we design workflows so essential tasks keep working through short outages and sync when the connection returns.",
    },
    security: {
      intro: "Health information deserves a higher bar for privacy than most business data. These are the practices we design around.",
      points: [
        "Role-based access, so staff see only what their role requires",
        "Encryption of data in transit and at rest",
        "Audit trails on sensitive actions",
        "Backup and recovery planning as part of the design",
        "Monitoring and incident-response procedures",
      ],
      disclaimer: DISCLAIMER,
    },
    productNote:
      "Corefort does not currently publish a ready-made healthcare product. Healthcare work is scoped as custom development with our team.",
    relevant: [
      { label: "Secure Digital Systems", href: "/solutions" },
      { label: "Enterprise Software", href: "/solutions" },
      { label: "Business Automation", href: "/solutions/business-automation" },
      { label: "Our security approach", href: "/security" },
    ],
    process: {
      discover: "We walk through how patients move through your facility, who touches which record and where time is lost today.",
      architect: "We design the data model, access rules and backup approach before any screens are built.",
      build: "We build in stages you can review, starting with the workflow that matters most at the front desk.",
      deploy: "We launch with production infrastructure, monitoring and staff onboarding so the switch is controlled.",
      scale: "We keep maintaining and improving the system as your facility, staff and services grow.",
    },
    faqs: [
      {
        q: "Do you have a ready-made healthcare product?",
        a: "Not at the moment. Healthcare systems are built as custom software, scoped with you so they match how your facility really works.",
      },
      {
        q: "How do you handle patient data?",
        a: "We design around role-based access, encryption in transit and at rest, audit trails and backups. These are engineering practices, not certifications, and we will be clear about that in every conversation.",
      },
      INTEGRATION_FAQ,
      PRICING_FAQ,
    ],
  },

  // ---------------------------------------------------------------- RETAIL
  {
    slug: "retail-commerce",
    metaDescription:
      "Point-of-sale, inventory and multi-branch retail platforms from Corefort Technologies, including LEDGE Biashara, our own offline-first business management product.",
    overview: [
      "Retail moves fast. Sales are made at the till, stock changes by the hour and the owner still needs to know where the business stands, often while away from the shop. Corefort builds point-of-sale, inventory and commerce platforms that keep sales moving and give owners a clear view of the numbers.",
      "For many retailers and small businesses, our own product LEDGE Biashara already covers the essentials: point-of-sale and inventory tracking, sales and expense management, multi-branch oversight and offline-first reliability. Where a retailer needs something beyond that, we scope custom development around the specific gap.",
    ],
    glance: [
      { label: "Typical organisations", value: "Shops, restaurants, SMEs and multi-branch retailers" },
      { label: "Ready-made product", value: "LEDGE Biashara" },
      { label: "Our route", value: "Product first, custom build where needed" },
      { label: "Focus", value: "Sales speed and stock accuracy" },
    ],
    challenges: [
      {
        title: "Stock that does not match the shelf",
        body: "Counts drift from reality when sales and stock are tracked in different places, leading to shortages, overstocking and lost sales.",
      },
      {
        title: "No clear view across branches",
        body: "Owners with more than one location often cannot see sales, stock and expenses side by side without waiting for someone to compile them.",
      },
      {
        title: "Expenses and takings scattered in notebooks",
        body: "Without a single record of money in and money out, understanding real profit takes effort that most owners do not have time for.",
      },
      {
        title: "A till that cannot depend on the internet",
        body: "When connectivity drops, sales cannot stop. Software that only works online puts the business at the mercy of the network.",
      },
    ],
    builds: [
      { title: "Point of sale", body: "A fast till experience for recording sales and taking payment at the counter.", tag: "Product" },
      { title: "Inventory tracking", body: "Stock updated as items are sold and received, so counts stay close to what is on the shelf.", tag: "Product" },
      { title: "Sales and expense management", body: "Sales and expenses recorded in one place, giving a straightforward picture of how the business is doing.", tag: "Product" },
      { title: "Multi-branch oversight", body: "One view across several locations, so owners can compare and manage branches without visiting each one.", tag: "Product" },
      { title: "Offline-first reliability", body: "The till keeps working when the connection is poor and catches up when it returns.", tag: "Product" },
      { title: "Custom integrations and extensions", body: "Connections to your existing accounting tools or online sales channels, and features that go beyond the standard product, scoped after discovery.", tag: "Custom" },
    ],
    scenarios: [
      {
        title: "A single shop outgrowing its notebook",
        situation: "Sales are written down at the till, stock is counted occasionally, and the owner cannot tell which products actually make money.",
        approach: "A point-of-sale and inventory setup that records each sale as it happens and keeps stock levels and expenses in the same place.",
      },
      {
        title: "A growing business with several branches",
        situation: "Each branch reports on its own schedule, so the owner is always looking at numbers that are days old.",
        approach: "Multi-branch oversight so sales, stock and expenses across locations are visible together and comparable.",
      },
      {
        title: "A retailer that needs something specific",
        situation: "The standard tools cover most of the business, but one process, such as a particular loyalty or ordering flow, does not fit.",
        approach: "A scoped custom extension or integration that fills that gap without replacing everything else.",
      },
    ],
    localNote: {
      title: "Built for real trading conditions",
      body: "LEDGE Biashara is offline-first because the till cannot wait for the network. Sales continue through poor connectivity, and the record catches up once the connection returns.",
    },
    security: {
      intro: "A retail system holds sales records, stock data and staff access. These are the practices behind it.",
      points: [
        "Role-based access, so cashiers, managers and owners see what suits their role",
        "Encryption of data in transit and at rest",
        "Backup and recovery planning for sales and stock records",
        "Monitoring of the platform in production",
        "Careful handling of changes so records stay consistent when several users work at once",
      ],
      disclaimer: DISCLAIMER,
    },
    productNote:
      "LEDGE Biashara is designed, built and operated by Corefort. See the product page for its documented features and who it is designed for.",
    relevant: [
      { label: "LEDGE Biashara", href: "/products/ledge-biashara" },
      { label: "Business Automation", href: "/solutions/business-automation" },
      { label: "Enterprise Software", href: "/solutions" },
      { label: "Pricing", href: "/pricing" },
    ],
    process: {
      discover: "We look at how you sell today, how many branches you run and where stock or cash goes missing from view.",
      architect: "We decide whether LEDGE Biashara covers the need as it is, or where a custom extension is required.",
      build: "We configure or extend the platform in stages, starting with the till and stock flow.",
      deploy: "We set up the branches, train the team and launch with monitoring in place.",
      scale: "We keep improving the system as you add products, staff and locations.",
    },
    faqs: [
      {
        q: "Does it work when the internet is down?",
        a: "LEDGE Biashara is offline-first. The point of sale keeps working through poor connectivity and the record syncs once the connection returns.",
      },
      {
        q: "Can I manage more than one branch?",
        a: "Yes. Multi-branch oversight is one of the documented features of LEDGE Biashara, giving one view across your locations.",
      },
      {
        q: "What if LEDGE Biashara does not cover everything I need?",
        a: "We scope a custom extension or integration around the specific gap during discovery, so you do not need to replace the whole system.",
      },
      PRICING_FAQ,
    ],
  },

  // ---------------------------------------------------------------- FINANCIAL SERVICES
  {
    slug: "financial-services",
    metaDescription:
      "Secure payment infrastructure, transaction systems and reconciliation tooling from Corefort Technologies for businesses that handle money at scale.",
    overview: [
      "Financial operations leave very little room for error. Payments arrive through several channels, agents collect on behalf of the business, and every balance has to be explainable. Corefort builds secure payment rails, transaction systems and financial infrastructure that make money movement visible and reconciled.",
      "Our experience in this area is grounded in NetPurse, our own connectivity and payment platform, which automates payment collection and agent management. For other financial workflows, we scope custom systems around your processes and your security expectations.",
    ],
    glance: [
      { label: "Typical organisations", value: "Businesses that collect, move or reconcile money at scale" },
      { label: "Related product", value: "NetPurse, for payment collection in connectivity businesses" },
      { label: "Our route", value: "Discovery, then a scoped custom build" },
      { label: "Focus", value: "Security and reconciliation" },
    ],
    challenges: [
      {
        title: "Manual reconciliation across channels",
        body: "Matching payments from different channels and agents against records by hand is slow, error-prone and gets harder as volume grows.",
      },
      {
        title: "Security expectations higher than most sectors",
        body: "Money systems attract more scrutiny. Access control, encryption and monitoring have to be designed in, not added later.",
      },
      {
        title: "Delayed visibility of transactions and balances",
        body: "If the team learns about a problem at month end, it is already expensive. Real-time visibility changes how quickly issues are caught.",
      },
      {
        title: "Agent and collector networks",
        body: "Money collected by many people in many places needs a clear, consistent record of who collected what and when.",
      },
    ],
    builds: [
      { title: "Transaction processing systems", body: "Systems that record and track transactions consistently, with clear status at each step.", tag: "Custom" },
      { title: "Reconciliation automation", body: "Matching of payments against records to replace manual spreadsheet work.", tag: "Custom" },
      { title: "Agent and collector management", body: "Tracking of who collected what, with balances visible to both the agent and the business.", tag: "Custom" },
      { title: "Automated payment collection", body: "Collection and recording of payments without manual follow-up. NetPurse does this for connectivity businesses.", tag: "Product" },
      { title: "Real-time dashboards", body: "Live views of transactions, balances and exceptions for finance and operations teams.", tag: "Custom" },
      { title: "Secure access and audit trails", body: "Role-based permissions and a record of sensitive actions across the system.", tag: "Custom" },
    ],
    scenarios: [
      {
        title: "A business collecting through agents",
        situation: "Agents collect payments in different places and report back by message. The finance team reconciles at the end of the week.",
        approach: "A single system where each collection is recorded when it happens, agent balances are visible and reconciliation happens continuously.",
      },
      {
        title: "A team buried in month-end matching",
        situation: "Payments arrive from several channels and are matched to invoices by hand, which delays reporting.",
        approach: "Automated matching with an exceptions queue, so people only handle the cases that genuinely need attention.",
      },
      {
        title: "A platform that needs tighter controls",
        situation: "Too many people have broad access, and there is no reliable record of who changed what.",
        approach: "Role-based access and audit trails designed into the system, with monitoring on sensitive actions.",
      },
    ],
    localNote: {
      title: "Designed for agent networks and variable connectivity",
      body: "Where collections happen in the field, connectivity is not guaranteed. We design billing, collection and reconciliation to cope with gaps and to queue transactions safely until they can be processed.",
    },
    security: {
      intro: "Financial systems carry a higher bar for access control, encryption and monitoring than most software. We design with that bar in mind from the start.",
      points: [
        "Role-based, least-privilege access to money-related functions",
        "Encryption of data in transit and at rest",
        "Audit trails on transactions and administrative actions",
        "Monitoring and incident-response procedures",
        "Backup, recovery and business-continuity planning",
      ],
      disclaimer:
        "Corefort is a technology company, not a licensed financial institution. We do not claim formal financial-sector certification or regulatory accreditation; systems are built following secure-engineering best practices.",
    },
    productNote:
      "NetPurse handles payment collection and agent management for connectivity businesses. Other financial workflows are built as custom software.",
    relevant: [
      { label: "Payment & Financial Systems", href: "/solutions/payment-financial-systems" },
      { label: "NetPurse", href: "/products/netpurse" },
      { label: "Secure Digital Systems", href: "/solutions" },
      { label: "Our security approach", href: "/security" },
    ],
    process: {
      discover: "We map how money enters, moves through and leaves your business, and where reconciliation breaks down.",
      architect: "We design the transaction model, access rules and audit approach before building any interface.",
      build: "We build in stages, starting with the flow that carries the most volume or the most risk.",
      deploy: "We launch with production infrastructure, monitoring and a controlled cutover from your current process.",
      scale: "We keep monitoring, maintaining and improving the platform as volume and requirements grow.",
    },
    faqs: [
      {
        q: "Are you a licensed or certified financial institution?",
        a: "No. Corefort is a technology company that builds software and infrastructure for financial workflows. We do not claim formal certification or regulatory accreditation.",
      },
      {
        q: "Can you automate our reconciliation?",
        a: "Reconciliation and billing are at the core of our Payment & Financial Systems work. What can be automated depends on the channels and data you have, which we assess in discovery.",
      },
      INTEGRATION_FAQ,
      PRICING_FAQ,
    ],
  },

  // ---------------------------------------------------------------- EDUCATION
  {
    slug: "education",
    metaDescription:
      "Institutional management and digital learning systems from Corefort Technologies for schools, colleges and training providers.",
    overview: [
      "Schools and training providers juggle enrolment, timetables, fees, results and communication, often across disconnected tools and paperwork. Corefort builds digital learning and institutional management systems that scale with the institution and reduce administrative load.",
      "Every institution runs differently, from a single school to a multi-campus provider. We scope software around your actual processes and the people who use it: administrators, teachers, students and families.",
    ],
    glance: [
      { label: "Typical organisations", value: "Schools, colleges and training providers" },
      { label: "Ready-made product", value: "None for this sector" },
      { label: "Our route", value: "Discovery, then a scoped custom build" },
      { label: "Focus", value: "Less administration, more teaching time" },
    ],
    challenges: [
      {
        title: "Administration that eats teaching time",
        body: "Enrolment forms, attendance sheets and result compilation take hours that teachers and administrators would rather spend elsewhere.",
      },
      {
        title: "Fee collection and follow-up",
        body: "Tracking who has paid, who owes and what has been communicated is difficult without a single shared record.",
      },
      {
        title: "Information scattered across tools",
        body: "Student details, results and timetables live in separate files, which makes reporting and continuity harder than it should be.",
      },
      {
        title: "Access to learning that varies by connection",
        body: "Digital learning only helps when students can actually reach it, so systems need to allow for uneven connectivity.",
      },
    ],
    builds: [
      { title: "Student records and enrolment", body: "One record per student, from admission through to graduation, with fast lookup for staff.", tag: "Custom" },
      { title: "Attendance and results", body: "Recording and compiling attendance and assessment results without manual re-entry.", tag: "Custom" },
      { title: "Fee management", body: "Fee schedules, payments and balances tracked in one place, with clear statements.", tag: "Custom" },
      { title: "Timetables and scheduling", body: "Timetabling for classes, staff and rooms that handles changes without redoing everything.", tag: "Custom" },
      { title: "Learning portals", body: "Web-based spaces for course material, assignments and communication between teachers and students.", tag: "Custom" },
      { title: "Reporting for leadership", body: "Dashboards that give heads and administrators a current view across classes or campuses.", tag: "Custom" },
    ],
    scenarios: [
      {
        title: "A school running on paper registers",
        situation: "Attendance and results are compiled by hand at the end of each term, and reports reach families late.",
        approach: "Digital attendance and results capture, so reports are generated from records already entered instead of compiled from scratch.",
      },
      {
        title: "A college struggling with fee follow-up",
        situation: "Finance staff cannot easily see which students have paid and which balances are outstanding.",
        approach: "A fee management module tied to student records, with balances and payment history visible at a glance.",
      },
      {
        title: "A training provider going online",
        situation: "Courses are delivered in person, but demand is growing beyond one location.",
        approach: "A learning portal for course content and assignments, designed to work for students on modest connections.",
      },
    ],
    localNote: {
      title: "Designed with real connectivity in mind",
      body: "Students and staff do not all have fast, constant connections. We design portals and records systems to stay usable on modest connections and to handle interruptions gracefully.",
    },
    security: {
      intro: "Student information includes personal details and, often, records about minors. These are the practices we design around.",
      points: [
        "Role-based access, so teachers, administrators and families see the right information",
        "Encryption of data in transit and at rest",
        "Careful handling of records that relate to minors",
        "Backup and recovery planning for academic records",
        "Monitoring and incident-response procedures",
      ],
      disclaimer: DISCLAIMER,
    },
    productNote:
      "Corefort does not currently publish a ready-made education product. Education systems are scoped as custom development.",
    relevant: [
      { label: "Digital Transformation", href: "/solutions" },
      { label: "Enterprise Software", href: "/solutions" },
      { label: "Business Automation", href: "/solutions/business-automation" },
      { label: "Our security approach", href: "/security" },
    ],
    process: {
      discover: "We learn how enrolment, attendance, results and fees work in your institution, and who depends on each.",
      architect: "We design the records structure and access rules so information is entered once and reused everywhere.",
      build: "We build in stages, starting with the administrative task that costs the most time.",
      deploy: "We launch alongside staff training, so the change happens at a sensible point in the term.",
      scale: "We keep improving the platform as new classes, campuses and requirements are added.",
    },
    faqs: [
      {
        q: "Do you have a ready-made school management product?",
        a: "Not at the moment. Education systems are built as custom software around your institution's processes.",
      },
      {
        q: "Can students with limited connectivity still use it?",
        a: "That is a design goal, not an afterthought. We plan for modest connections and interruptions, and confirm what that means in practice during discovery.",
      },
      INTEGRATION_FAQ,
      PRICING_FAQ,
    ],
  },

  // ---------------------------------------------------------------- TELECOM
  {
    slug: "telecommunications",
    metaDescription:
      "Billing, agent management and connectivity platforms for ISPs, hotspot operators and providers, including NetPurse, built by Corefort Technologies.",
    overview: [
      "Connectivity businesses make money one small transaction at a time. Hotspot vouchers, data bundles, agent commissions and top-ups add up to a large, fast-moving flow that is hard to track by hand. Corefort builds network, billing and connectivity platforms for ISPs and operators that turn that flow into something visible and manageable.",
      "NetPurse, our connectivity and payment infrastructure platform, was built for this industry. It brings hotspot and data billing, automated payment collection, agent and reseller management and real-time usage analytics into one system designed around how ISPs actually operate.",
    ],
    glance: [
      { label: "Typical organisations", value: "ISPs, hotspot and Wi-Fi operators, agents and resellers" },
      { label: "Ready-made product", value: "NetPurse" },
      { label: "Our route", value: "Product first, custom build where needed" },
      { label: "Focus", value: "Billing, collection and uptime" },
    ],
    challenges: [
      {
        title: "Managing agents and resellers across a distributed network",
        body: "Many sellers in many places means many balances, commissions and disputes unless there is one clear record.",
      },
      {
        title: "Billing and collecting reliably",
        body: "Charging for connectivity, collecting payment and reconciling it against usage is manual and error-prone at scale.",
      },
      {
        title: "Running through outages and connectivity gaps",
        body: "For a connectivity business, an hour of downtime costs revenue and trust with agents and end users who have other options.",
      },
      {
        title: "Not knowing what is actually happening on the network",
        body: "Without usage visibility, it is hard to plan capacity, spot problems or understand which customers and locations drive revenue.",
      },
    ],
    builds: [
      { title: "Hotspot and data billing management", body: "Billing for hotspot access and data, managed in one place instead of by hand.", tag: "Product" },
      { title: "Automated payment collection", body: "Payments collected and recorded automatically, without manual follow-up.", tag: "Product" },
      { title: "Agent and reseller management", body: "Tracking of agents and resellers, what they have sold and what they owe.", tag: "Product" },
      { title: "Real-time usage analytics", body: "Live visibility of usage so operators can see activity and plan with real data.", tag: "Product" },
      { title: "Graceful handling of outages", body: "Local caching, queued transaction processing and clear status for agents, so an outage disrupts operations as little as possible.", tag: "Custom" },
      { title: "Network management and connectivity platforms", body: "Custom tooling for ISP infrastructure and network operations beyond what the product covers.", tag: "Custom" },
    ],
    scenarios: [
      {
        title: "A hotspot operator selling through resellers",
        situation: "Resellers sell vouchers across many locations and the operator settles up with each of them manually.",
        approach: "Agent and reseller management with automated collection, so balances are visible and settlement is based on records, not memory.",
      },
      {
        title: "A small ISP billing by spreadsheet",
        situation: "Customer billing is tracked in spreadsheets, and late or missed payments are found long after the fact.",
        approach: "Automated billing and payment collection, with usage visibility to explain what customers are being charged for.",
      },
      {
        title: "An operator that cannot afford downtime",
        situation: "When connectivity drops, agents cannot process payments and confidence in the service suffers.",
        approach: "Operations designed to degrade gracefully, with local caching and queued transactions that catch up when the network recovers.",
      },
    ],
    localNote: {
      title: "Built by people who design for outages",
      body: "For a connectivity business, the network is the product and the thing most likely to fail. We design billing and payment systems so they keep working through disruption instead of assuming everything is always online.",
    },
    security: {
      intro: "Connectivity and payment platforms hold customer records, balances and network access. These are the practices behind them.",
      points: [
        "Role-based access for operators, agents and resellers",
        "Encryption of data in transit and at rest",
        "Monitoring of the platform and its transactions",
        "Backup, recovery and business-continuity planning",
        "Incident-response procedures for when something goes wrong",
      ],
      disclaimer: DISCLAIMER,
    },
    productNote:
      "NetPurse is designed, built and operated by Corefort. See the product page for its documented features and who it is designed for.",
    relevant: [
      { label: "NetPurse", href: "/products/netpurse" },
      { label: "Network & Connectivity", href: "/solutions" },
      { label: "Payment & Financial Systems", href: "/solutions/payment-financial-systems" },
      { label: "Insights on ISP downtime", href: "/insights" },
    ],
    process: {
      discover: "We look at how you sell connectivity, who your agents are and where billing and collection break down today.",
      architect: "We confirm what NetPurse covers as it is, and design any custom pieces around your network and payment flows.",
      build: "We configure and extend the platform in stages, starting with billing and collection.",
      deploy: "We onboard agents, launch with monitoring in place and plan the cutover from your current process.",
      scale: "We keep improving the platform as your network, agents and customer base grow.",
    },
    faqs: [
      {
        q: "Can NetPurse manage agents and resellers?",
        a: "Yes. Agent and reseller management is one of NetPurse's documented features, alongside hotspot and data billing, automated payment collection and real-time usage analytics.",
      },
      {
        q: "What happens if our network goes down?",
        a: "We design connectivity and billing systems to degrade gracefully, using approaches such as local caching and queued transactions. Exactly how that applies to your setup is confirmed in discovery.",
      },
      {
        q: "Do you build beyond NetPurse?",
        a: "Yes. Network management and connectivity platforms that go beyond the product are scoped as custom development.",
      },
      PRICING_FAQ,
    ],
  },

  // ---------------------------------------------------------------- ENTERPRISE
  {
    slug: "enterprise",
    metaDescription:
      "Custom business systems, integrations and modernization for larger organisations from Corefort Technologies.",
    overview: [
      "Larger organisations end up with systems that grew one decision at a time. Tools overlap, data lives in silos and off-the-shelf software forces people to work around it. Corefort builds custom business systems that fit how the organisation actually operates and streamline work at scale.",
      "That can mean a new internal platform, connecting systems that do not talk to each other, or modernizing infrastructure that is struggling to keep up. We scope each engagement around the specific operational problem, not a generic package.",
    ],
    glance: [
      { label: "Typical organisations", value: "Established businesses and operators with multiple teams or sites" },
      { label: "Ready-made product", value: "None. Custom by design" },
      { label: "Our route", value: "Discovery, then a scoped custom build" },
      { label: "Focus", value: "Fit, integration and scale" },
    ],
    challenges: [
      {
        title: "Off-the-shelf tools that do not fit",
        body: "Generic software makes teams adapt their process to the tool, which slows work and creates workarounds that nobody documents.",
      },
      {
        title: "Data trapped in separate systems",
        body: "When departments each hold their own version of the truth, reporting turns into manual reconciliation.",
      },
      {
        title: "Ageing infrastructure",
        body: "Older systems can struggle with current demand and become harder and riskier to change over time.",
      },
      {
        title: "Insight that arrives too late",
        body: "Teams often collect plenty of data but lack the tooling to act on it while it still matters.",
      },
    ],
    builds: [
      { title: "Internal business platforms", body: "Custom systems built around your workflows, replacing patchwork tools and workarounds.", tag: "Custom" },
      { title: "Workflow automation", body: "Repetitive, rule-based work moved from people to software, so teams focus on judgement.", tag: "Custom" },
      { title: "APIs and integrations", body: "Connections that let existing systems share data instead of relying on re-keying or exports.", tag: "Custom" },
      { title: "Infrastructure modernization", body: "Cloud and infrastructure upgrades so systems can support current demand reliably.", tag: "Custom" },
      { title: "Reporting and dashboards", body: "Consolidated views across teams and sites, built on your own data.", tag: "Custom" },
      { title: "AI-powered operations", body: "Data-driven tooling that helps teams act on the information they already collect.", tag: "Custom" },
    ],
    scenarios: [
      {
        title: "A department drowning in manual processes",
        situation: "A team runs a critical process through email and spreadsheets, and it breaks whenever volume rises.",
        approach: "A purpose-built workflow system that captures the process properly, automates routine steps and gives management visibility.",
      },
      {
        title: "Two systems that need to talk",
        situation: "Staff copy data from one system into another every day because there is no connection between them.",
        approach: "An integration built on the interfaces the systems expose, removing the re-keying and the errors that come with it.",
      },
      {
        title: "Infrastructure showing its age",
        situation: "Systems slow down at peak times and changes carry more risk every year.",
        approach: "A staged modernization plan that improves reliability without switching everything off at once.",
      },
    ],
    localNote: {
      title: "Realistic about multi-site operations",
      body: "Organisations with several sites rarely have identical connectivity or processes at each one. We plan for that variation so the system works where the business actually operates.",
    },
    security: {
      intro: "Enterprise systems connect many users and much data. Security is designed in from the architecture stage.",
      points: [
        "Identity and access management with role-based, least-privilege access",
        "Encryption of data in transit and at rest",
        "Secure development practices and security testing",
        "Monitoring, vulnerability management and incident response",
        "Backup, recovery and business-continuity planning",
      ],
      disclaimer: DISCLAIMER,
    },
    productNote:
      "Enterprise work is custom by design. We do not offer a fixed package, because the value comes from fitting the system to the organisation.",
    relevant: [
      { label: "Enterprise Software", href: "/solutions" },
      { label: "Infrastructure Modernization", href: "/solutions" },
      { label: "AI-Powered Operations", href: "/solutions" },
      { label: "Our security approach", href: "/security" },
    ],
    process: {
      discover: "We identify the operational problem worth solving first, the people affected and the systems involved.",
      architect: "We design the architecture, integrations and security model before committing to a build plan.",
      build: "We deliver in stages, so teams see working software early and can steer the direction.",
      deploy: "We launch with production infrastructure, monitoring and a migration plan that limits disruption.",
      scale: "We continue to maintain, optimise and extend the system as the organisation changes.",
    },
    faqs: [
      {
        q: "Can you modernize a system without stopping operations?",
        a: "Infrastructure Modernization is one of our solution areas, and we plan changes in stages where possible. The specific plan comes out of discovery, including what carries the most risk.",
      },
      {
        q: "Can you connect our existing systems?",
        a: "Integration is a core part of custom business systems. Whether it is practical depends on the interfaces those systems provide, and we tell you plainly what is realistic.",
      },
      {
        q: "Do you support the system after launch?",
        a: "Yes. Monitoring, maintenance and improvements continue after launch as part of how we work.",
      },
      PRICING_FAQ,
    ],
  },

  // ---------------------------------------------------------------- LOGISTICS
  {
    slug: "logistics",
    metaDescription:
      "Tracking, dispatch and fleet platforms for logistics and transport businesses, built by Corefort Technologies for real-time operations.",
    overview: [
      "Logistics is a race against the clock across many moving parts: vehicles, drivers, loads, customers and paperwork. When those parts are tracked over phone calls and messages, delays and disputes are almost guaranteed. Corefort builds tracking, dispatch and fleet platforms designed for real-time operations.",
      "Every operation has its own shape, from a small local courier to a regional freight business. We scope the software around your routes, vehicles and customers, so dispatchers and drivers get tools that fit the way they work.",
    ],
    glance: [
      { label: "Typical organisations", value: "Freight, courier, distribution and fleet operators" },
      { label: "Ready-made product", value: "None for this sector" },
      { label: "Our route", value: "Discovery, then a scoped custom build" },
      { label: "Focus", value: "Visibility from dispatch to delivery" },
    ],
    challenges: [
      {
        title: "Not knowing where things are",
        body: "When vehicle and shipment locations live in phone calls, dispatchers spend the day chasing updates instead of planning.",
      },
      {
        title: "Dispatch handled by hand",
        body: "Assigning jobs manually works until volume rises, and then missed pickups and overloaded drivers follow.",
      },
      {
        title: "Paperwork and proof of delivery",
        body: "Delivery notes and signatures on paper get lost, which slows invoicing and fuels disputes with customers.",
      },
      {
        title: "Fleet upkeep and cost visibility",
        body: "Without records, maintenance falls behind and the true cost of each vehicle is difficult to see.",
      },
    ],
    builds: [
      { title: "Shipment and vehicle tracking", body: "A live view of loads and vehicles so dispatchers can see status without a phone call.", tag: "Custom" },
      { title: "Dispatch and job assignment", body: "Tools to assign, reassign and monitor jobs across drivers and vehicles.", tag: "Custom" },
      { title: "Driver mobile applications", body: "Mobile tools for drivers to receive jobs, update status and capture delivery confirmation.", tag: "Custom" },
      { title: "Proof of delivery", body: "Digital confirmation of delivery that speeds up invoicing and reduces disputes.", tag: "Custom" },
      { title: "Fleet records and maintenance", body: "Vehicle records, service schedules and costs kept in one place.", tag: "Custom" },
      { title: "Operations dashboards", body: "Real-time and historical views of performance for managers and customers.", tag: "Custom" },
    ],
    scenarios: [
      {
        title: "A courier business run by phone calls",
        situation: "Dispatchers call drivers for every update, and customers call the office to ask where their parcel is.",
        approach: "Driver status updates and a live dispatch view, so both the office and the customer can see progress without calling.",
      },
      {
        title: "A freight operator with paper delivery notes",
        situation: "Signed delivery notes take days to reach the office, which delays invoicing.",
        approach: "Digital proof of delivery captured at drop-off, so invoicing can start as soon as the job is done.",
      },
      {
        title: "A fleet with unclear running costs",
        situation: "Maintenance is done when something breaks, and nobody can say which vehicles cost the most.",
        approach: "Fleet records and maintenance schedules tied to each vehicle, with costs visible in one place.",
      },
    ],
    localNote: {
      title: "Built for routes where signal comes and goes",
      body: "Vehicles travel through areas with weak coverage. Driver tools should keep capturing updates while offline and send them when a connection is available.",
    },
    security: {
      intro: "Logistics systems hold customer details, delivery information and operational data. These are the practices we design around.",
      points: [
        "Role-based access for dispatchers, drivers, managers and customers",
        "Encryption of data in transit and at rest",
        "Careful handling of location and delivery data",
        "Monitoring of the platform in production",
        "Backup and recovery planning",
      ],
      disclaimer: DISCLAIMER,
    },
    productNote:
      "Corefort does not currently publish a ready-made logistics product. Logistics platforms are scoped as custom development.",
    relevant: [
      { label: "Enterprise Software", href: "/solutions" },
      { label: "Business Automation", href: "/solutions/business-automation" },
      { label: "Digital Transformation", href: "/solutions" },
      { label: "Our security approach", href: "/security" },
    ],
    process: {
      discover: "We follow a job from booking to delivery and note where information is lost or delayed.",
      architect: "We design the data model, driver workflow and dashboards around your routes and vehicles.",
      build: "We build in stages, usually beginning with tracking and dispatch, then adding delivery confirmation and fleet records.",
      deploy: "We launch with driver onboarding, monitoring and a phased rollout across vehicles.",
      scale: "We keep improving as your fleet, routes and customer expectations grow.",
    },
    faqs: [
      {
        q: "Do you have a ready-made logistics product?",
        a: "Not at the moment. Logistics platforms are built as custom software, scoped around your routes, vehicles and customers.",
      },
      {
        q: "Can you build a mobile app for drivers?",
        a: "Web and mobile applications are part of our software engineering work. What a driver app needs to do is defined together during discovery.",
      },
      INTEGRATION_FAQ,
      PRICING_FAQ,
    ],
  },

  // ---------------------------------------------------------------- PROFESSIONAL SERVICES
  {
    slug: "professional-services",
    metaDescription:
      "Workflow, client-management and billing tools for service businesses, built by Corefort Technologies around how your firm actually works.",
    overview: [
      "Service businesses sell time and expertise, and they lose both to administration. Client details in one place, work in progress in another and billing in a third leaves partners chasing information instead of serving clients. Corefort builds workflow and client-management tools tailored to service businesses.",
      "A consultancy, an accounting practice and an agency all work differently. We do not force them into one template. We scope the system around your engagement lifecycle, your team structure and how you bill.",
    ],
    glance: [
      { label: "Typical organisations", value: "Consultancies, agencies, accounting and legal-style practices" },
      { label: "Ready-made product", value: "None for this sector" },
      { label: "Our route", value: "Discovery, then a scoped custom build" },
      { label: "Focus", value: "Less admin, clearer client work" },
    ],
    challenges: [
      {
        title: "Client information scattered everywhere",
        body: "Contacts, documents and history spread across inboxes and folders make it hard for anyone to pick up where a colleague left off.",
      },
      {
        title: "Work in progress with no shared view",
        body: "Without a common place to track tasks and deadlines, managers rely on status meetings and memory.",
      },
      {
        title: "Time and billing leakage",
        body: "Hours that are not recorded, or invoices sent late, cost the firm money that was already earned.",
      },
      {
        title: "Onboarding new clients and staff",
        body: "Repeating the same setup steps by hand for every engagement wastes time and creates inconsistency.",
      },
    ],
    builds: [
      { title: "Client management", body: "A single record for each client, with contacts, history and documents in one place.", tag: "Custom" },
      { title: "Engagement and task tracking", body: "Shared tracking of work, owners and deadlines across a team.", tag: "Custom" },
      { title: "Time tracking and billing", body: "Recording of time and expenses feeding directly into invoices.", tag: "Custom" },
      { title: "Document management", body: "Organised, permission-controlled storage for client documents.", tag: "Custom" },
      { title: "Client portals", body: "A secure place for clients to see progress, share files and approve work, where it suits your firm.", tag: "Custom" },
      { title: "Reporting for partners and managers", body: "Utilisation, revenue and pipeline views based on your real data.", tag: "Custom" },
    ],
    scenarios: [
      {
        title: "A consultancy tracking work in spreadsheets",
        situation: "Each consultant keeps their own tracker, so managers cannot see what is due or who is overloaded.",
        approach: "A shared engagement tracker with owners and deadlines, and reporting that shows workload across the team.",
      },
      {
        title: "An accounting practice with slow invoicing",
        situation: "Time is recorded on paper and entered later, so billing runs behind the work.",
        approach: "Time and expense capture that feeds straight into invoices, shortening the gap between doing the work and billing it.",
      },
      {
        title: "A firm that wants a client portal",
        situation: "Clients email documents back and forth and ask for status updates by phone.",
        approach: "A secure portal for documents and progress updates, sized to what your firm is comfortable sharing.",
      },
    ],
    localNote: {
      title: "Designed for how your team really works",
      body: "Staff move between the office, client sites and home. We build tools that stay usable on the move and do not assume a fast connection everywhere.",
    },
    security: {
      intro: "Service firms hold confidential client information, so access control matters. These are the practices we design around.",
      points: [
        "Role-based access, so people see only the clients and files they should",
        "Encryption of data in transit and at rest",
        "Audit trails on sensitive documents and actions",
        "Backup and recovery planning",
        "Monitoring and incident-response procedures",
      ],
      disclaimer: DISCLAIMER,
    },
    productNote:
      "Corefort does not currently publish a ready-made professional-services product. These tools are scoped as custom development.",
    relevant: [
      { label: "Business Automation", href: "/solutions/business-automation" },
      { label: "Enterprise Software", href: "/solutions" },
      { label: "Digital Transformation", href: "/solutions" },
      { label: "Our security approach", href: "/security" },
    ],
    process: {
      discover: "We map how an engagement moves from enquiry to invoice and where time and information are lost.",
      architect: "We design the client, engagement and billing structure around how your firm is organised.",
      build: "We build in stages, starting with the workflow that saves the most time each week.",
      deploy: "We launch with team onboarding and monitoring so adoption is smooth.",
      scale: "We keep refining the system as your services, team and client base grow.",
    },
    faqs: [
      {
        q: "Do you have a ready-made product for service firms?",
        a: "Not at the moment. Tools for service businesses are built as custom software around your firm's workflow.",
      },
      {
        q: "Can clients log in to see progress?",
        a: "A client portal can be part of the build if it fits your firm. Exactly what clients can see is decided with you during discovery.",
      },
      INTEGRATION_FAQ,
      PRICING_FAQ,
    ],
  },
];

export function getIndustryDetail(slug: string): IndustryDetail | undefined {
  return industryDetails.find((d) => d.slug === slug);
}
