"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ComposableMap, Geographies } from "react-simple-maps";
import { feature } from "topojson-client";
import landTopology from "world-atlas/land-110m.json";
import {
  MOBILE_NODE_IDS,
  NETWORK_NODES,
  SECONDARY_LINKS,
  arcPath,
} from "./mapData";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

// Converted once at module scope: the same GeoJSON is reused on every render.
// world-atlas's JSON typing doesn't line up with topojson-client's Topology type, hence the cast.
const LAND_GEOJSON = feature(landTopology as unknown as Parameters<typeof feature>[0], "land");

// Square canvas so the map can be clipped into a circular "globe" disc.
const WIDTH = 640;
const HEIGHT = 640;

type PixelNode = {
  id: string;
  name: string;
  hub: boolean;
  x: number;
  y: number;
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export function NetworkMap() {
  const reduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const gradientId = useId();
  const glowFilterId = useId();

  const activeNodes = useMemo(
    () => (isMobile ? NETWORK_NODES.filter((n) => MOBILE_NODE_IDS.includes(n.id)) : NETWORK_NODES),
    [isMobile],
  );
  const secondaryLinks = isMobile ? [] : SECONDARY_LINKS;

  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-[600px] items-center justify-center"
      role="img"
      aria-hidden="true"
    >
      {/* Atmospheric glow, bleeds beyond the globe */}
      <div
        className="pointer-events-none absolute inset-[-7%] rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.55) 0%, rgba(96,165,250,0.18) 55%, rgba(96,165,250,0) 72%)" }}
      />

      {/* The globe: a satellite-style Earth (public/images/hero, built by scripts/generate-earth.mjs).
          Its projection matches ComposableMap below, so the nodes sit on the right cities. */}
      <div className="relative aspect-square w-full overflow-hidden rounded-full bg-[#031a45] shadow-[0_34px_80px_-24px_rgba(3,26,69,0.65)]">
        <Image
          src="/images/hero/earth.webp"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 600px, 92vw"
          className="select-none object-cover"
          draggable={false}
        />

        {/* Slowly drifting clouds: a seamless texture on a track twice the width, slid by exactly one tile */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.6]">
          <div
            className="absolute inset-y-0 left-0 w-[200%] animate-clouds motion-reduce:animate-none"
            style={{ backgroundImage: "url(/images/hero/clouds.webp)", backgroundSize: "50% 100%", backgroundRepeat: "repeat-x" }}
          />
        </div>

        {/* Sunlight from the upper left, darker toward the limb */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 24%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 44%), radial-gradient(circle at 50% 50%, rgba(2,12,45,0) 56%, rgba(2,12,45,0.55) 100%)",
          }}
        />
        {/* Atmosphere rim */}
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_34px_8px_rgba(125,190,255,0.5)]" />

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [26, 10], scale: 310 }}
          width={WIDTH}
          height={HEIGHT}
          className="absolute inset-0 h-full w-full"
        >
        <defs>
          <filter id={glowFilterId} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <Geographies geography={LAND_GEOJSON}>
          {({ projection }) => {
            const project = (coords: [number, number]) => projection(coords) as [number, number] | null;

            const pixelNodes: PixelNode[] = activeNodes
              .map((node) => {
                const projected = project(node.coords);
                if (!projected) return null;
                return { id: node.id, name: node.name, hub: Boolean(node.hub), x: projected[0], y: projected[1] };
              })
              .filter((n): n is PixelNode => n !== null);

            const hub = pixelNodes.find((n) => n.hub);
            const others = pixelNodes.filter((n) => !n.hub);

            return (
              <>
                {/* Secondary links between non-hub nodes */}
                {secondaryLinks.map(([aId, bId], i) => {
                  const a = pixelNodes.find((n) => n.id === aId);
                  const b = pixelNodes.find((n) => n.id === bId);
                  if (!a || !b) return null;
                  return (
                    <Arc
                      key={`sec-${aId}-${bId}`}
                      pathId={`${gradientId}-sec-${i}`}
                      d={arcPath(a.x, a.y, b.x, b.y)}
                      delay={0.6 + i * 0.15}
                      durationSeed={i}
                      secondary
                      reduceMotion={reduceMotion}
                      glowFilterId={glowFilterId}
                    />
                  );
                })}

                {/* Primary arcs from the hub to every other node */}
                {hub &&
                  others.map((node, i) => (
                    <Arc
                      key={`hub-${node.id}`}
                      pathId={`${gradientId}-arc-${node.id}`}
                      d={arcPath(hub.x, hub.y, node.x, node.y)}
                      delay={i * 0.15}
                      durationSeed={i}
                      reduceMotion={reduceMotion}
                      glowFilterId={glowFilterId}
                    />
                  ))}

                {/* Nodes on top of arcs */}
                {others.map((node, i) => (
                  <Node key={node.id} x={node.x} y={node.y} seed={i} reduceMotion={reduceMotion} />
                ))}
                {hub && <Node x={hub.x} y={hub.y} hub seed={0} reduceMotion={reduceMotion} />}
              </>
            );
          }}
        </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}

type ArcProps = {
  pathId: string;
  d: string;
  delay: number;
  durationSeed: number;
  secondary?: boolean;
  reduceMotion: boolean;
  glowFilterId: string;
};

function Arc({ pathId, d, delay, durationSeed, secondary, reduceMotion, glowFilterId }: ArcProps) {
  const [drawn, setDrawn] = useState(reduceMotion);
  const baseOpacity = secondary ? 0.55 : 0.9;
  // Deterministic 2.5-4s spread across arcs, no Math.random() (avoids hydration mismatch).
  const packetDuration = 2.5 + (durationSeed % 4) * 0.5;

  return (
    <g>
      {/* Invisible reference path the animated packet follows via mpath */}
      <path id={pathId} d={d} fill="none" stroke="none" />

      {!reduceMotion && !drawn && (
        <motion.path
          d={d}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: baseOpacity }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay, ease: "easeInOut" }}
          onAnimationComplete={() => setDrawn(true)}
        />
      )}

      <path
        d={d}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray="6 4"
        opacity={drawn ? baseOpacity : 0}
        className={
          !reduceMotion ? "animate-dash-flow transition-opacity duration-300" : "transition-none"
        }
      />

      {!reduceMotion && drawn && (
        <circle r={secondary ? 2.2 : 3} fill="#7DF9FF" stroke="#FFFFFF" strokeWidth={0.8} filter={`url(#${glowFilterId})`}>
          <animateMotion dur={`${packetDuration}s`} repeatCount="indefinite" rotate="auto">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
      )}
    </g>
  );
}

type NodeProps = {
  x: number;
  y: number;
  hub?: boolean;
  seed: number;
  reduceMotion: boolean;
};

function Node({ x, y, hub, seed, reduceMotion }: NodeProps) {
  const core = hub ? 7 : 4.5;
  // Deterministic per-node stagger instead of Math.random() (SSR-safe).
  const delay = (seed % 5) * 0.24;

  return (
    <g transform={`translate(${x} ${y})`}>
      {!reduceMotion && (
        <>
          <motion.circle
            r={core}
            fill="none"
            stroke={hub ? "#FDE68A" : "#FFFFFF"}
            strokeWidth={1.8}
            initial={{ scale: 1, opacity: 0.75 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay }}
          />
          <motion.circle
            r={core}
            fill="none"
            stroke={hub ? "#FDE68A" : "#FFFFFF"}
            strokeWidth={1.8}
            initial={{ scale: 1, opacity: 0.75 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: delay + 1.2 }}
          />
        </>
      )}
      <circle r={core + 3} fill={hub ? "rgba(251,191,36,0.35)" : "rgba(255,255,255,0.3)"} />
      <circle r={core} fill={hub ? "#FBBF24" : "#FFFFFF"} stroke={hub ? "#FFFFFF" : "#1D4ED8"} strokeWidth={hub ? 2.5 : 2.2} />
    </g>
  );
}
