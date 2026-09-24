"use client";
import Image from "next/image";
import Link from "next/link";
import company from "@/shared/corefort-company.json";

const FOOTER_COLUMNS = [
  {
    title: "Solutions",
    links: [
      { label: "All Solutions", href: "/solutions" },
      { label: "Business Automation", href: "/solutions/business-automation" },
      { label: "Payment & Financial Systems", href: "/solutions/payment-financial-systems" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "All Products", href: "/products" },
      { label: "NetPurse", href: "/products/netpurse" },
      { label: "LEDGE Biashara", href: "/products/ledge-biashara" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Corefort", href: "/company" },
      { label: "Partners", href: "/partners" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Industries", href: "/industries" },
      { label: "News & Blog", href: "/news" },
      { label: "How We Work", href: "/#process" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative z-10 bg-navy pt-20 text-white">
      <div className="container">
        <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm lg:grid-cols-6 lg:gap-8 lg:p-10">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/images/logo/logo3.png"
                alt="Corefort Technologies"
                width={130}
                height={34}
                className="w-auto"
              />
            </Link>
            <p className="max-w-[420px] text-sm leading-relaxed text-white/[0.65]">
              Corefort Technologies designs and operates secure software,
              infrastructure, and digital platforms that help businesses
              build, connect, and scale with confidence.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {company.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-white/[0.15] px-4 py-2 text-xs font-medium text-white/75 transition hover:border-primary hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.1em] text-white/90">
                {col.title}
              </h2>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.1em] text-white/90">
              Contact
            </h2>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a href={`tel:${company.phoneTel}`} className="transition hover:text-primary">
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="transition hover:text-primary">
                  {company.email}
                </a>
              </li>
              <li className="leading-relaxed">
                <span className="block font-medium text-white/[0.85]">Locations</span>
                {company.locations.map((loc, i) => (
                  <span key={loc}>
                    {i > 0 && <br />}
                    {loc}
                  </span>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 py-8 sm:flex-row">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Corefort Technologies. All rights reserved.
          </p>
          <p className="text-sm text-white/50">Dar es Salaam &middot; Zanzibar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
