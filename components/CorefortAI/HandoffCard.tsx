import company from "@/shared/corefort-company.json";

/**
 * Human-handoff card. It only shows official contact channels from shared/corefort-company.json
 * (the same file the Footer uses) and is explicit that nothing has been sent by the AI.
 */
export default function HandoffCard({ onQuote }: { onQuote: () => void }) {
  return (
    <div className="rounded-2xl border border-stroke bg-white p-4 shadow-sm">
      <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-hero-primary">Talk to Corefort</p>
      <div className="space-y-2">
        <a
          href={`tel:${company.phoneTel}`}
          className="flex min-h-[44px] items-center justify-between gap-3 rounded-xl bg-hero-bg px-4 py-2.5 text-sm font-semibold text-hero-ink transition hover:bg-hero-primary-light"
        >
          <span className="text-hero-muted">Call</span>
          {company.phone}
        </a>
        <a
          href={`mailto:${company.email}`}
          className="flex min-h-[44px] items-center justify-between gap-3 rounded-xl bg-hero-bg px-4 py-2.5 text-sm font-semibold text-hero-ink transition hover:bg-hero-primary-light"
        >
          <span className="text-hero-muted">Email</span>
          <span className="min-w-0 truncate">{company.email}</span>
        </a>
        <a
          href="/contact"
          className="flex min-h-[44px] items-center justify-between gap-3 rounded-xl bg-hero-bg px-4 py-2.5 text-sm font-semibold text-hero-ink transition hover:bg-hero-primary-light"
        >
          <span className="text-hero-muted">Web</span>
          Contact page
        </a>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-hero-body">{company.address} · Zanzibar, Tanzania</p>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        {company.social.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-hero-primary underline underline-offset-2">
            {s.label}
          </a>
        ))}
      </div>
      <p className="mt-3 border-t border-stroke pt-3 text-xs leading-relaxed text-hero-muted">
        I&apos;m an AI assistant. Nothing has been sent to the team unless you contact them or submit a quote request.
      </p>
      <button
        type="button"
        onClick={onQuote}
        className="mt-3 min-h-[44px] w-full rounded-full bg-hero-ink px-5 text-sm font-semibold text-white transition hover:bg-hero-ink/90"
      >
        Request a quote instead
      </button>
    </div>
  );
}
