"use client";

import { useState } from "react";
import { jakarta } from "@/components/HeroSection/font";
import { AnnouncementBar } from "@/components/HeroSection/AnnouncementBar";
import { Navbar } from "@/components/HeroSection/Navbar";

/**
 * Site-wide header: the announcement bar + navbar designed for the
 * HeroSection now serve as the global nav across every page, per the
 * light-mode redesign. Sticky (not fixed) so page content doesn't need
 * compensating top padding.
 */
const Header = () => {
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  return (
    <div className={`${jakarta.variable} sticky top-0 z-50 bg-white/[0.82] font-jakarta shadow-[0_1px_0_rgba(15,23,42,0.06)] backdrop-blur-xl backdrop-saturate-150`}>
      <AnnouncementBar
        visible={announcementVisible}
        onClose={() => setAnnouncementVisible(false)}
      />
      <Navbar />
    </div>
  );
};

export default Header;
