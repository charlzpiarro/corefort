"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "./LogoMark";
import { HamburgerIcon } from "./icons";
import { IconChevronDown } from "@/components/Common/UiIcons";

type NavItem = {
  label: string;
  href?: string;
  submenu?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Solutions",
    submenu: [
      { label: "All Solutions", href: "/solutions" },
      { label: "Business Automation", href: "/solutions/business-automation" },
      { label: "Payment & Financial Systems", href: "/solutions/payment-financial-systems" },
    ],
  },
  {
    label: "Products",
    submenu: [
      { label: "All Products", href: "/products" },
      { label: "NetPurse", href: "/products/netpurse" },
      { label: "LEDGE Biashara", href: "/products/ledge-biashara" },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Security", href: "/security" },
  {
    label: "Company",
    submenu: [
      { label: "About Corefort", href: "/company" },
      { label: "Insights", href: "/insights" },
      { label: "Partners", href: "/partners" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  return (
    <header className="relative px-6 py-5 sm:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Corefort home">
          <LogoMark />
          <span className="text-lg font-extrabold tracking-tight text-hero-ink">Corefort</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="group relative">
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-[15px] font-medium text-hero-ink transition-colors hover:text-hero-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-[15px] font-medium text-hero-ink transition-colors hover:text-hero-primary"
                  >
                    {item.label}
                    <IconChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-0 top-full z-30 mt-3 min-w-[220px] -translate-y-1 rounded-2xl border border-stroke bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.submenu?.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block rounded-xl px-3.5 py-2.5 text-sm text-hero-ink transition hover:bg-hero-bg hover:text-hero-primary"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-hero-ink px-6 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-hero-ink/90"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-hero-ink lg:hidden"
        >
          <HamburgerIcon open={open} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1 pb-2 pt-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-2 py-2.5 text-[15px] font-medium text-hero-ink transition hover:bg-hero-bg"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSubmenu((prev) => (prev === item.label ? null : item.label))
                        }
                        aria-expanded={mobileSubmenu === item.label}
                        className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-[15px] font-medium text-hero-ink transition hover:bg-hero-bg"
                      >
                        {item.label}
                        <IconChevronDown
                          className={`h-4 w-4 opacity-60 transition-transform duration-200 ${
                            mobileSubmenu === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ${
                          mobileSubmenu === item.label ? "max-h-60" : "max-h-0"
                        }`}
                      >
                        <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-stroke pl-3">
                          {item.submenu?.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setOpen(false)}
                              className="rounded-lg px-3 py-2 text-sm text-hero-ink/80 transition hover:bg-hero-bg hover:text-hero-primary"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-hero-ink px-6 py-3 text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
