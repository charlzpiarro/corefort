"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconChevronDown } from "@/components/Common/UiIcons";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const navbarToggleHandler = () => setNavbarOpen((prev) => !prev);

  useEffect(() => {
    const handleStickyNavbar = () => {
      setSticky(window.scrollY >= 80);
    };

    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) =>
    setOpenIndex((prev) => (prev === index ? -1 : index));

  const usePathName = usePathname();

  return (
    <header
      className={`left-0 top-0 z-50 w-full transition-all duration-300 ${
        sticky ? "fixed" : "absolute"
      }`}
    >
      <div
        className="h-1 w-full bg-gradient-to-r from-primary via-yellow/90 to-primary"
        aria-hidden
      />
      <div className="container">
        <div
          className={`relative mt-3 flex items-center justify-between gap-3 rounded-2xl border border-stroke/80 px-3 py-2.5 shadow-sm backdrop-blur-md sm:px-4 sm:py-3 lg:mt-4 lg:px-6 ${
            sticky
              ? "border-stroke bg-white/95 shadow-three dark:border-stroke-dark dark:bg-dark/95"
              : "bg-white/85 dark:bg-dark/80"
          } before:pointer-events-none before:absolute before:inset-x-3 before:top-0 before:z-0 before:h-px before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-primary/40 before:to-transparent before:content-[''] lg:before:inset-x-6`}
        >
          <Link href="/" className="relative z-10 flex shrink-0 items-center gap-2">
            <Image
              src="/images/logo/logo-3.png"
              alt="logo"
              width={120}
              height={30}
              className="dark:hidden"
            />
            <Image
              src="/images/logo/logo3.png"
              alt="logo"
              width={120}
              height={30}
              className="hidden dark:block"
            />
          </Link>

          <div className="relative z-10 flex shrink-0 items-center justify-center gap-1.5 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center">
              <ThemeToggler />
            </div>
            <button
              onClick={navbarToggleHandler}
              id="navbarToggler"
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-stroke text-dark transition hover:border-primary/40 dark:border-stroke-dark dark:text-white"
            >
              <span className="sr-only">Menu</span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav
            id="navbarCollapse"
            className={`absolute left-3 right-3 top-[calc(100%+12px)] z-30 rounded-2xl border border-stroke bg-white p-5 shadow-three transition-all dark:border-stroke-dark dark:bg-dark lg:static lg:z-auto lg:block lg:w-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
              navbarOpen ? "visible opacity-100" : "invisible opacity-0 lg:visible lg:opacity-100"
            }`}
          >
            <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-8">
              {menuData.map((menuItem, index) => (
                <li key={index} className="group relative">
                  {menuItem.path ? (
                    <Link
                      href={menuItem.path}
                      onClick={() => setNavbarOpen(false)}
                      className={`inline-flex w-full justify-center rounded-lg px-3 py-2.5 text-base transition sm:justify-start lg:inline-flex lg:w-auto lg:py-2 ${
                        usePathName === menuItem.path
                          ? "bg-primary/10 text-primary dark:bg-primary/20"
                          : "text-dark hover:text-primary dark:text-white/80 dark:hover:text-white"
                      }`}
                    >
                      {menuItem.title}
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSubmenu(index)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-base text-dark transition hover:text-primary dark:text-white/80 dark:hover:text-white lg:w-auto lg:justify-start lg:py-2"
                      >
                        {menuItem.title}
                        <IconChevronDown className="h-3.5 w-3.5 shrink-0 opacity-70" />
                      </button>
                      <div
                        className={`mt-2 rounded-xl border border-stroke bg-white p-2 dark:border-stroke-dark dark:bg-dark lg:absolute lg:left-0 lg:top-full lg:mt-3 lg:min-w-[220px] lg:shadow-three ${
                          openIndex === index
                            ? "block"
                            : "hidden lg:group-hover:block"
                        }`}
                      >
                        {menuItem.submenu.map((submenuItem, submenuIndex) => (
                          <Link
                            href={submenuItem.path}
                            key={submenuIndex}
                            onClick={() => setNavbarOpen(false)}
                            className="block rounded-md px-3 py-2.5 text-center text-sm text-dark transition hover:bg-primary/10 hover:text-primary dark:text-white/80 dark:hover:bg-primary/20 lg:text-left lg:py-2"
                          >
                            {submenuItem.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex h-11 w-11 items-center justify-center">
              <ThemeToggler />
            </div>
            <Link
              href="/contact"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
