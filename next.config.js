/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  // One canonical host for SEO: www redirects (permanently) to the apex domain used throughout
  // the site (lib/seo.ts, sitemap, metadata). Only fires in production, where the "www" host
  // actually resolves; harmless locally since localhost never matches.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.coreforttech.co.tz" }],
        destination: "https://coreforttech.co.tz/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
