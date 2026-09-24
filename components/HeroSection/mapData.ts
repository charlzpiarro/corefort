export type LngLat = [number, number];

export type NetworkNode = {
  id: string;
  name: string;
  coords: LngLat;
  hub?: boolean;
};

// [longitude, latitude]: Dar es Salaam is the hub all primary arcs originate from.
export const NETWORK_NODES: NetworkNode[] = [
  { id: "dar", name: "Dar es Salaam", coords: [39.2083, -6.7924], hub: true },
  { id: "nbo", name: "Nairobi", coords: [36.8219, -1.2921] },
  { id: "kmp", name: "Kampala", coords: [32.5825, 0.3476] },
  { id: "kgl", name: "Kigali", coords: [30.0619, -1.9441] },
  { id: "lag", name: "Lagos", coords: [3.3792, 6.5244] },
  { id: "jnb", name: "Johannesburg", coords: [28.0473, -26.2041] },
  { id: "cai", name: "Cairo", coords: [31.2357, 30.0444] },
  { id: "dxb", name: "Dubai", coords: [55.2708, 25.2048] },
  { id: "lon", name: "London", coords: [-0.1278, 51.5074] },
  { id: "bom", name: "Mumbai", coords: [72.8777, 19.076] },
];

// Reduced node set shown on mobile, per spec (hub + 5 others).
export const MOBILE_NODE_IDS = ["dar", "nbo", "lag", "jnb", "cai", "dxb"];

// Secondary links between non-hub nodes (hidden on mobile).
export const SECONDARY_LINKS: [string, string][] = [
  ["nbo", "kmp"],
  ["nbo", "kgl"],
  ["lag", "jnb"],
  ["cai", "dxb"],
];

// Faint decorative dots scattered inside the glow, for depth.
export const DEPTH_DOTS = [
  { x: 96, y: 84, r: 1.6, o: 0.5 },
  { x: 610, y: 70, r: 1.2, o: 0.4 },
  { x: 650, y: 160, r: 1.8, o: 0.5 },
  { x: 60, y: 260, r: 1.4, o: 0.4 },
  { x: 40, y: 420, r: 1.6, o: 0.45 },
  { x: 660, y: 460, r: 1.3, o: 0.4 },
  { x: 340, y: 40, r: 1.4, o: 0.4 },
  { x: 400, y: 570, r: 1.5, o: 0.4 },
  { x: 130, y: 540, r: 1.2, o: 0.35 },
  { x: 590, y: 550, r: 1.4, o: 0.4 },
];

/**
 * A quadratic bezier path between two points, arched upward.
 * Bow height scales with distance so long arcs curve more than short hops.
 */
export function arcPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const bow = Math.min(Math.max(dist * 0.22, 22), 100);
  return `M ${x1} ${y1} Q ${mx} ${my - bow} ${x2} ${y2}`;
}
