"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-black pt-20 text-white dark:bg-black">
      <div className="container">
        <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:grid-cols-2 lg:grid-cols-4 lg:p-10">
          <div className="md:col-span-2 lg:col-span-2">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/images/logo/logo3.png"
                alt="logo"
                width={130}
                height={34}
                className="w-auto"
              />
            </Link>
            <p className="max-w-[520px] text-base leading-relaxed text-white/75">
              Corefort Technologies helps organizations build secure digital
              products, strengthen infrastructure, and scale operations with
              confidence.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <a
                href="https://www.instagram.com/coreforttech?igsh=NGhzd2ExaGRwbW9m"
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-primary hover:text-primary"
              >
                Instagram
              </a>
              <a
                href="https://x.com/corefort_tech?s=21"
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-primary hover:text-primary"
              >
                X
              </a>
              <a
                href="https://www.facebook.com/share/12KTC7sDvS7/?mibextid=wwXIfr"
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:border-primary hover:text-primary"
              >
                Facebook
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-lg font-semibold text-white">Company</h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-base text-white/70 transition hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-base text-white/70 transition hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-base text-white/70 transition hover:text-primary"
                >
                  Hosting Prices
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-base text-white/70 transition hover:text-primary"
                >
                  News & Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-white/70 transition hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-lg font-semibold text-white">Contact</h2>
            <ul className="space-y-3">
              <li className="text-base text-white/70">+255 773 662 935</li>
              <li className="text-base text-white/70">
                sales@coreforttech.co.tz
              </li>
              <li className="text-base leading-relaxed text-white/70">
                <span className="block font-medium text-white/90">
                  Locations
                </span>
                Dar es Salaam, Tanzania
                <br />
                Zanzibar, Tanzania
              </li>
            </ul>
          </div>
        </div>

        <div className="py-8">
          <p className="text-center text-sm text-white/60 md:text-base">
            &copy; {new Date().getFullYear()} Corefort Technologies. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
