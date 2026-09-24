"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "./icons";

type AnnouncementBarProps = {
  visible: boolean;
  onClose: () => void;
};

export function AnnouncementBar({ visible, onClose }: AnnouncementBarProps) {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="announcement-bar"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden bg-hero-primary"
        >
          <div className="relative flex min-h-11 items-center justify-center px-10 py-2 text-center sm:px-14">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[13px] leading-snug text-white sm:text-sm">
              <Image
                src="/images/products/netpurse-mark.png"
                alt="NetPurse"
                width={22}
                height={22}
                className="h-[22px] w-[22px] shrink-0 rounded-md bg-white"
              />
              <span>
                <span className="font-semibold">New:</span> NetPurse: smart WiFi billing for ISPs
                and hotspot operators across Africa.
              </span>
              <Link
                href="/products/netpurse"
                className="font-semibold underline underline-offset-2 transition hover:text-blue-100"
              >
                Learn more →
              </Link>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss announcement"
              className="absolute right-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white sm:right-4"
            >
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
