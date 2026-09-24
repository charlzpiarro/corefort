"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import company from "@/shared/corefort-company.json";
import { submitLead } from "./api";
import { track } from "./analytics";
import { QUOTE_BUDGETS, QUOTE_INDUSTRIES, QUOTE_SOLUTIONS } from "./config";

type Fields = {
  name: string;
  business: string;
  industry: string;
  requirement: string;
  solution: string;
  budget: string;
  phone: string;
  email: string;
  location: string;
  notes: string;
  consent: boolean;
  website: string; // honeypot
};
type Errors = Partial<Record<keyof Fields | "contact", string>>;

const STEPS = ["About you", "What you need", "How to reach you", "Review"] as const;
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;

/** Client-side checks are only for fast feedback; the Worker re-validates everything. */
function validateStep(step: number, f: Fields): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (f.name.trim().length < 2) e.name = "Please enter your name.";
    if (f.business.trim().length < 2) e.business = "Please enter your business name.";
  }
  if (step === 1 && f.requirement.trim().length < 10) e.requirement = "Please describe what you need (a sentence is enough).";
  if (step === 2) {
    const digits = f.phone.replace(/\D/g, "");
    const phoneOk = digits.length >= 7 && digits.length <= 15;
    const emailOk = EMAIL_RE.test(f.email.trim());
    if (f.phone && !phoneOk) e.phone = "Please enter a valid phone number.";
    if (f.email && !emailOk) e.email = "Please enter a valid email address.";
    if (!phoneOk && !emailOk) e.contact = "Add a phone number or an email so the team can reach you.";
  }
  if (step === 3 && !f.consent) e.consent = "Please confirm to continue.";
  return e;
}

const stepOfField: Record<string, number> = {
  name: 0, business: 0, industry: 0, requirement: 1, solution: 1, budget: 1, phone: 2, email: 2, contact: 2, location: 2, notes: 2, consent: 3,
};

interface Props {
  prefill: string;
  onCancel: () => void;
  onDone: (firstName: string) => void;
}

const inputCls =
  "w-full rounded-xl border border-stroke bg-white px-3.5 py-3 text-base text-hero-ink outline-none transition placeholder:text-hero-muted focus:border-hero-primary focus:ring-2 focus:ring-hero-primary/20 sm:text-[15px]";
const labelCls = "mb-1.5 block text-[13px] font-semibold text-hero-ink";

export default function QuoteFlow({ prefill, onCancel, onDone }: Props) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "failed" | "limited">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [f, setF] = useState<Fields>({
    name: "", business: "", industry: "", requirement: prefill, solution: "", budget: "", phone: "", email: "",
    location: "", notes: "", consent: false, website: "",
  });
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setF((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined, contact: key === "phone" || key === "email" ? undefined : prev.contact }));
  };

  const next = () => {
    const e = validateStep(step, f);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const submit = async () => {
    const e = validateStep(3, f);
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
    const res = await submitLead({ ...f, name: f.name.trim(), business: f.business.trim() });
    if (!("kind" in res)) {
      track("quote_completed");
      onDone(f.name.trim().split(/\s+/)[0]);
      return;
    }
    if (res.kind === "validation") {
      const errs = res.fields as Errors;
      setErrors(errs);
      const first = Math.min(...Object.keys(errs).map((k) => stepOfField[k] ?? 3));
      setStep(first);
      setStatus("idle");
      return;
    }
    setStatus(res.kind === "rate_limited" ? "limited" : "failed");
  };

  const summary = useMemo(
    () => [
      ["Name", f.name], ["Business", f.business], ["Industry", f.industry || "-"], ["Need", f.requirement],
      ["Solution", f.solution || "Not sure yet"], ["Budget", f.budget || "Not shared"], ["Phone", f.phone || "-"], ["Email", f.email || "-"], ["Location", f.location || "-"],
    ],
    [f],
  );

  const Err = ({ k }: { k: keyof Errors }) =>
    errors[k] ? (
      <p role="alert" className="mt-1.5 text-[13px] font-medium text-red-600">
        {errors[k]}
      </p>
    ) : null;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-5 pb-4 pt-5">
        <div className="mb-4 flex items-center gap-1.5" aria-hidden>
          {STEPS.map((s, i) => (
            <span key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-hero-primary" : "bg-stroke"}`} />
          ))}
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hero-primary">
          Request a quote · Step {step + 1} of {STEPS.length}
        </p>
        <h3 ref={headingRef} tabIndex={-1} className="mb-4 mt-1 text-xl font-extrabold tracking-tight text-hero-ink outline-none">
          {STEPS[step]}
        </h3>

        {/* honeypot: hidden from people and assistive tech, bots fill it in */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} />
          </label>
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className={labelCls} htmlFor="q-name">Your name</label>
              <input id="q-name" className={inputCls} autoComplete="name" maxLength={80} value={f.name} onChange={(e) => set("name", e.target.value)} />
              <Err k="name" />
            </div>
            <div>
              <label className={labelCls} htmlFor="q-business">Business / company name</label>
              <input id="q-business" className={inputCls} autoComplete="organization" maxLength={120} value={f.business} onChange={(e) => set("business", e.target.value)} />
              <Err k="business" />
            </div>
            <div>
              <span className={labelCls}>Industry <span className="font-normal text-hero-muted">(optional)</span></span>
              <div className="flex flex-wrap gap-2">
                {QUOTE_INDUSTRIES.map((i) => (
                  <button key={i} type="button" aria-pressed={f.industry === i} onClick={() => set("industry", f.industry === i ? "" : i)}
                    className={`min-h-[36px] rounded-full border px-3.5 text-[13px] font-medium transition ${f.industry === i ? "border-hero-primary bg-hero-primary text-white" : "border-stroke bg-white text-hero-ink hover:border-hero-primary"}`}>
                    {i}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className={labelCls} htmlFor="q-req">What do you need?</label>
              <textarea id="q-req" rows={4} maxLength={1000} className={`${inputCls} resize-none`} value={f.requirement}
                placeholder="e.g. inventory and sales tracking for two branches" onChange={(e) => set("requirement", e.target.value)} />
              <Err k="requirement" />
            </div>
            <div>
              <span className={labelCls}>Closest solution <span className="font-normal text-hero-muted">(optional)</span></span>
              <div className="flex flex-wrap gap-2">
                {QUOTE_SOLUTIONS.map((s) => (
                  <button key={s} type="button" aria-pressed={f.solution === s} onClick={() => set("solution", f.solution === s ? "" : s)}
                    className={`min-h-[36px] rounded-full border px-3.5 text-[13px] font-medium transition ${f.solution === s ? "border-hero-primary bg-hero-primary text-white" : "border-stroke bg-white text-hero-ink hover:border-hero-primary"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className={labelCls}>Rough budget <span className="font-normal text-hero-muted">(optional)</span></span>
              <p className="mb-2 text-[13px] leading-relaxed text-hero-body">Helps the team suggest realistic options. Skip it if you prefer to discuss it later.</p>
              <div className="flex flex-wrap gap-2">
                {QUOTE_BUDGETS.map((b) => (
                  <button key={b} type="button" aria-pressed={f.budget === b} onClick={() => set("budget", f.budget === b ? "" : b)}
                    className={`min-h-[36px] rounded-2xl border px-3.5 py-1.5 text-left text-[13px] font-medium transition ${f.budget === b ? "border-hero-primary bg-hero-primary text-white" : "border-stroke bg-white text-hero-ink hover:border-hero-primary"}`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-hero-body">Give us at least one way to reach you.</p>
            <div>
              <label className={labelCls} htmlFor="q-phone">Phone</label>
              <input id="q-phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={24} className={inputCls} value={f.phone} onChange={(e) => set("phone", e.target.value)} />
              <Err k="phone" />
            </div>
            <div>
              <label className={labelCls} htmlFor="q-email">Email</label>
              <input id="q-email" type="email" inputMode="email" autoComplete="email" maxLength={254} className={inputCls} value={f.email} onChange={(e) => set("email", e.target.value)} />
              <Err k="email" />
            </div>
            <Err k="contact" />
            <div>
              <label className={labelCls} htmlFor="q-loc">Location <span className="font-normal text-hero-muted">(optional)</span></label>
              <input id="q-loc" autoComplete="address-level2" maxLength={100} className={inputCls} value={f.location} onChange={(e) => set("location", e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="q-notes">Anything else? <span className="font-normal text-hero-muted">(optional)</span></label>
              <textarea id="q-notes" rows={2} maxLength={1000} className={`${inputCls} resize-none`} value={f.notes} onChange={(e) => set("notes", e.target.value)} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <dl className="divide-y divide-stroke rounded-2xl border border-stroke bg-white text-sm">
              {summary.map(([k, v]) => (
                <div key={k} className="flex gap-3 px-4 py-2.5">
                  <dt className="w-20 shrink-0 font-semibold text-hero-muted">{k}</dt>
                  <dd className="min-w-0 break-words text-hero-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-stroke bg-white p-4 text-sm leading-relaxed text-hero-body">
              <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#2563EB]" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} />
              <span>
                I agree to share these details with Corefort Technologies so the team can contact me about my request. They are used only for this purpose.
              </span>
            </label>
            <Err k="consent" />
            {status === "failed" && (
              <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                We couldn&apos;t send your request right now. Nothing was submitted. Please contact the team directly:{" "}
                <a className="font-semibold underline" href={`tel:${company.phoneTel}`}>{company.phone}</a> or{" "}
                <a className="font-semibold underline" href={`mailto:${company.email}`}>{company.email}</a>.
              </div>
            )}
            {status === "limited" && (
              <div role="alert" className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                Too many requests from this connection. Please try again later or contact the team directly on {company.phone}.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-stroke bg-white px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <button type="button" onClick={step === 0 ? onCancel : () => setStep((s) => s - 1)} disabled={status === "sending"}
          className="min-h-[44px] rounded-full px-4 text-sm font-semibold text-hero-body transition hover:text-hero-ink disabled:opacity-50">
          {step === 0 ? "Cancel" : "Back"}
        </button>
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next}
            className="min-h-[44px] rounded-full bg-hero-ink px-6 text-sm font-semibold text-white transition hover:bg-hero-ink/90">
            Continue
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={status === "sending"}
            className="min-h-[44px] rounded-full bg-hero-primary px-6 text-sm font-semibold text-white transition hover:bg-hero-primary/90 disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Send request"}
          </button>
        )}
      </div>
    </div>
  );
}
