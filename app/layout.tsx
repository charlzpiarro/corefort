import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import CorefortAI from "@/components/CorefortAI";
import AosInit from "@/components/Common/AosInit";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

import { Providers } from "./providers";
import { SITE_URL } from "@/lib/seo";
import company from "@/shared/corefort-company.json";

const inter = Inter({ subsets: ["latin"] });

const SITE_NAME = "Corefort Technologies";
const SITE_TITLE = "Corefort Technologies | Software, Cloud, Cybersecurity & Fintech";
const SITE_DESCRIPTION =
  "Corefort Technologies builds secure, scalable software, infrastructure, and digital platforms, spanning software engineering, cloud, cybersecurity, fintech, connectivity, and AI, for businesses across Tanzania and the region.";

// Root-level defaults. Every page sets its own title (used via the "%s | Corefort Technologies"
// template below) and description; this is the fallback plus the site-wide OG/Twitter/robots config.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // A plain string, not a template: every page in this project already writes its own full
  // "X | Corefort Technologies" title, so a "%s | Corefort Technologies" template would double
  // the suffix on every one of them. This is just the fallback for a page with no title at all.
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [{ url: "/images/og/default.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og/default.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/favicon.png",
  },
};

// Organization schema: only facts published elsewhere on the site (shared/corefort-company.json,
// the same source the Footer and the AI agent use). No unverified claims, ratings or reviews.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo/corefort-mark-512.png`,
  image: `${SITE_URL}/images/og/default.png`,
  description: SITE_DESCRIPTION,
  email: company.email,
  telephone: company.phoneTel,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address,
    addressLocality: "Dar es Salaam",
    addressCountry: "TZ",
  },
  areaServed: ["Tanzania", "East Africa"],
  founders: [
    { "@type": "Person", name: "Charles Kikare Masima", jobTitle: "Chief Executive Officer" },
    { "@type": "Person", name: "Iyanbinwell Mwakibinga", jobTitle: "Chief Technology Officer" },
  ],
  sameAs: company.social.map((s: { href: string }) => s.href),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`bg-gradient-to-b from-primary/[0.045] via-[#FCFCFD] to-[#FCFCFD] antialiased dark:from-navy dark:via-navy dark:to-navy ${inter.className}`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <AosInit />
        <Providers>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <ScrollToTop />
          <CorefortAI />
        </Providers>
      </body>
    </html>
  );
}
