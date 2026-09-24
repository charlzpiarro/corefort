import {
  IconShieldLock,
  IconCode,
  IconKey,
  IconEye,
  IconArchive,
  IconAlertTriangle,
} from "@/components/Common/BrandIcons";

export type SecurityPractice = {
  id: string;
  icon: (props: { className?: string }) => JSX.Element;
  title: string;
  description: string;
};

// Practice areas, described as approach, never as a certification claim.
const securityData: SecurityPractice[] = [
  {
    id: "data-protection",
    icon: IconShieldLock,
    title: "Data Protection",
    description: "Sensitive data is encrypted in transit and at rest, with access limited to what's needed.",
  },
  {
    id: "secure-development",
    icon: IconCode,
    title: "Secure Development",
    description: "Security review is part of our engineering process, not a step added at the end.",
  },
  {
    id: "identity-access",
    icon: IconKey,
    title: "Identity & Access Management",
    description: "Role-based access and least-privilege principles govern who can reach what.",
  },
  {
    id: "monitoring",
    icon: IconEye,
    title: "Monitoring",
    description: "Production systems are monitored for abnormal activity and availability issues.",
  },
  {
    id: "backup-recovery",
    icon: IconArchive,
    title: "Backup & Recovery",
    description: "Regular backups and tested recovery procedures protect against data loss.",
  },
  {
    id: "incident-response",
    icon: IconAlertTriangle,
    title: "Incident Response",
    description: "A defined process for identifying, containing, and resolving security issues.",
  },
];

export default securityData;
