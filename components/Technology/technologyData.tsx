export type TechCategory = {
  id: number;
  title: string;
  items: string[];
};

const technologyData: TechCategory[] = [
  { id: 1, title: "Software", items: ["Web applications", "Mobile apps", "APIs & services"] },
  { id: 2, title: "Infrastructure", items: ["Servers & networking", "Containerization", "CI/CD pipelines"] },
  { id: 3, title: "Cloud", items: ["Cloud-native deployment", "Managed hosting", "Auto-scaling systems"] },
  { id: 4, title: "Security", items: ["Threat monitoring", "Secure architecture", "Access control"] },
  { id: 5, title: "Networking", items: ["ISP & hotspot systems", "Bandwidth management", "Connectivity platforms"] },
  { id: 6, title: "Data", items: ["Relational & NoSQL databases", "Data pipelines", "Reporting & analytics"] },
  { id: 7, title: "AI", items: ["Workflow intelligence", "Predictive analytics", "Automation models"] },
  { id: 8, title: "Automation", items: ["Process automation", "Scheduled systems", "Integration tooling"] },
];

export default technologyData;
