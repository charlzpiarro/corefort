"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * Split out of app/layout.tsx so the root layout can be a Server Component (required to export
 * `metadata`, including metadataBase, for every page's SEO tags). Renders nothing.
 */
export default function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return null;
}
