// TODO: replace with verified Corefort figures once available.
export type Metric = {
  id: number;
  end: number;
  suffix?: string;
  label: string;
};

const metricsData: Metric[] = [
  { id: 1, end: 50, suffix: "+", label: "Projects Delivered" },
  { id: 2, end: 30, suffix: "+", label: "Businesses Supported" },
  { id: 3, end: 80, suffix: "+", label: "Systems Deployed" },
  { id: 4, end: 5, suffix: "+", label: "Years Building Technology" },
];

export default metricsData;
