import type { ReactNode } from "react";

export type StageTone = "ink" | "blue" | "tint" | "light";

const TONES: Record<StageTone, string> = {
  ink: "bg-ink text-white",
  blue: "bg-[linear-gradient(135deg,#070B24_0%,#1D3FD1_58%,#3A56E8_100%)] text-white",
  tint: "bg-tint",
  light: "bg-white",
};

/**
 * A page section with a consistent "stage": black, blue, soft blue tint or white.
 * Dark stages get a faint grid plus blue and amber glows, which is what makes glass panels look good on them.
 * Content sits in the standard container.
 */
export default function Stage({
  tone,
  id,
  className = "",
  containerClassName = "",
  children,
}: {
  tone: StageTone;
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  const dark = tone === "ink" || tone === "blue";
  return (
    <section id={id} className={`relative overflow-hidden py-20 md:py-28 ${id ? "scroll-mt-24" : ""} ${TONES[tone]} ${className}`}>
      {dark && (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dark opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
          <div aria-hidden className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[520px] rounded-full bg-primary/[0.22] blur-[130px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-24 h-[360px] w-[440px] rounded-full bg-amber/[0.1] blur-[130px]" />
        </>
      )}
      {tone === "tint" && (
        <>
          <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/[0.1] blur-[100px]" />
          <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-amber/[0.12] blur-[110px]" />
        </>
      )}
      <div className={`container relative z-10 ${containerClassName}`}>{children}</div>
    </section>
  );
}
