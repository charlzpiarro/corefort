"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import CorefortAI from "@/components/CorefortAI";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
      once: true,    // only animate once
    });
  }, []);

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body
        className={`bg-gradient-to-b from-primary/[0.045] via-[#FCFCFD] to-[#FCFCFD] antialiased dark:from-navy dark:via-navy dark:to-navy ${inter.className}`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
          <CorefortAI />
        </Providers>
      </body>
    </html>
  );
}

