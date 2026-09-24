"use client";

import { useState } from "react";
import { jakarta } from "./font";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";
import { HeroContent } from "./HeroContent";

/**
 * Standalone demo composition: announcement bar + navbar + hero content,
 * full width. On the live site, the announcement bar and navbar are
 * rendered once, globally, by components/Header; see HeroContent for the
 * piece actually used on the homepage.
 */
export default function HeroSection() {
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  return (
    <div className={`${jakarta.variable} font-jakarta`}>
      <div className="bg-white shadow-[0_1px_0_rgba(15,23,42,0.06)]">
        <AnnouncementBar
          visible={announcementVisible}
          onClose={() => setAnnouncementVisible(false)}
        />
        <Navbar />
      </div>
      <HeroContent />
    </div>
  );
}
