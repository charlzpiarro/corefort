type Props = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

// ---- Services ----

export function IconCode({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4M13 5l-2 14" />
    </svg>
  );
}

export function IconCloud({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 7.1 9.02 4 4 0 0 0 7 18Z" />
      <path d="M9.5 14.5v3M12 13.5v4M14.5 14.5v3" />
    </svg>
  );
}

export function IconShieldLock({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3.5 5 6v5.5c0 4.2 2.9 7.4 7 8.5 4.1-1.1 7-4.3 7-8.5V6l-7-2.5Z" />
      <rect x="9.5" y="11" width="5" height="4" rx="0.8" />
      <path d="M10.4 11V9.6a1.6 1.6 0 1 1 3.2 0V11" />
    </svg>
  );
}

export function IconCreditCard({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="6" width="18" height="12" rx="1.6" />
      <path d="M3 10h18" />
      <path d="M7 14.5h4" />
    </svg>
  );
}

export function IconSignal({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M12 20.5v-6" />
      <circle cx="12" cy="12" r="1.4" />
      <path d="M8.3 16.3a5.3 5.3 0 0 1 0-7.5M15.7 8.8a5.3 5.3 0 0 1 0 7.5" />
      <path d="M5.3 19.3a9.6 9.6 0 0 1 0-13.6M18.7 5.7a9.6 9.6 0 0 1 0 13.6" />
    </svg>
  );
}

export function IconAutomation({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
    </svg>
  );
}

// ---- Industries ----

export function IconPulse({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M3 12h4l2-6 4 12 2-8 2 2h4" />
    </svg>
  );
}

export function IconBag({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function IconBank({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M4 10 12 4l8 6" />
      <path d="M5 10h14v9H5z" />
      <path d="M9 13v3M12 13v3M15 13v3M3 19h18" />
    </svg>
  );
}

export function IconCap({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" />
      <path d="M6.5 11.2V16c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4.8" />
    </svg>
  );
}

export function IconTower({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3v18M8 21h8" />
      <path d="M6.5 9a7.5 7.5 0 0 1 11 0M9 6.3a4 4 0 0 1 6 0" />
      <circle cx="12" cy="3" r="1.1" />
    </svg>
  );
}

export function IconBuilding({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <rect x="5" y="3.5" width="10" height="17" rx="1" />
      <path d="M15 9h4v11.5h-4" />
      <path d="M8 7h1M11 7h1M8 10.5h1M11 10.5h1M8 14h1M11 14h1" />
    </svg>
  );
}

export function IconTruck({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M3 7h10v9H3z" />
      <path d="M13 10.5h4l3 3V16h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  );
}

export function IconBriefcase({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="7.5" width="18" height="11.5" rx="1.6" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
      <path d="M3 12.5h18" />
    </svg>
  );
}

// ---- Why Corefort / process / misc ----

export function IconTarget({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconLayers({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
      <path d="m4 12 8 4.5 8-4.5" />
      <path d="m4 16.5 8 4.5 8-4.5" />
    </svg>
  );
}

export function IconCompass({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.8 9.2-2 5.6-5.6 2 2-5.6 5.6-2Z" />
    </svg>
  );
}

export function IconLifeBuoy({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="m6.1 6.1 3.3 3.3M17.9 6.1l-3.3 3.3M6.1 17.9l3.3-3.3M17.9 17.9l-3.3-3.3" />
    </svg>
  );
}

export function IconGlobe({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.7 5.2 3.7 8.5s-1.3 6.2-3.7 8.5c-2.4-2.3-3.7-5.2-3.7-8.5S9.6 5.8 12 3.5Z" />
    </svg>
  );
}

export function IconSearch({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m19.5 19.5-4.3-4.3" />
    </svg>
  );
}

export function IconBlueprint({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.4" />
      <path d="M7 8h6v6H7zM13 8h4M13 11h4M13 14h4M7 16.5h4" />
    </svg>
  );
}

export function IconHammer({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="m14.5 6.5 3 3-2.1 2.1-3-3z" />
      <path d="M13 8 4.5 16.5a1.6 1.6 0 0 0 2.3 2.3L15.3 10" />
      <path d="m16.8 4.7 2.5 2.5 1-1a2 2 0 0 0-2.5-2.5z" />
    </svg>
  );
}

export function IconRocket({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M12 15c3.5-1.3 6-4.6 6-9.5-4.9 0-8.2 2.5-9.5 6" />
      <path d="M8.5 11.5 5 13l1.5-3.5" />
      <path d="M12.5 15.5 11 19l3.5-1.5" />
      <circle cx="14.5" cy="9.5" r="1.4" />
      <path d="M8.5 15.5c-1.5 0-3 1.5-3 4 2.5 0 4-1.5 4-3" />
    </svg>
  );
}

export function IconTrendUp({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="m3.5 17 6-6 4 4 7-7" />
      <path d="M15.5 8h5v5" />
    </svg>
  );
}

export function IconArrowRight({ className = "h-4 w-4" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function IconSparkle({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.7l-1.6-5.5L5 10.6 10.4 9Z" />
      <path d="M19 3.5v3M17.5 5h3" />
    </svg>
  );
}

export function IconKey({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <circle cx="7.5" cy="14.5" r="4" />
      <path d="m10.5 11.5 8-8M15.5 6.5l2.5 2.5M18 4l2 2" />
    </svg>
  );
}

export function IconEye({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export function IconArchive({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="4" width="18" height="4.5" rx="1" />
      <path d="M4.5 8.5V19a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V8.5" />
      <path d="M10 13h4" />
    </svg>
  );
}

export function IconAlertTriangle({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <path d="M12 4 21.5 20h-19Z" />
      <path d="M12 10v4.2" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconNode({ className = "h-6 w-6" }: Props) {
  return (
    <svg className={className} {...base}>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="18" r="2.2" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M7.8 7.2 10 10M16.2 7.2 14 10M7.8 16.8 10 14M16.2 16.8 14 14" />
    </svg>
  );
}
