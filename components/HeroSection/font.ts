import { Plus_Jakarta_Sans } from "next/font/google";

// Shared across the global Header (Navbar/AnnouncementBar) and the homepage
// HeroContent so both pick up the same font instance/CSS variable.
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});
