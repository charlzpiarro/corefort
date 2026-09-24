import Image from "next/image";

/** Official Corefort mark, cropped to a circle. Used in the navbar and the Corefort AI widget. */
export function LogoMark({ className = "h-[34px] w-[34px]" }: { className?: string }) {
  return (
    <Image
      src="/images/logo/corefort-mark.png"
      alt=""
      width={256}
      height={256}
      className={`${className} rounded-full object-cover`}
      aria-hidden
    />
  );
}
