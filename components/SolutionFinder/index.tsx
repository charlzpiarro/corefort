"use client";

import { useState } from "react";
import Link from "next/link";
import SectionTitle from "@/components/Common/SectionTitle";
import Stage from "@/components/Common/Stage";
import { IconCheck } from "@/components/Common/UiIcons";
import { IconArrowRight } from "@/components/Common/BrandIcons";
import solutionsData from "@/components/Solutions/solutionsData";
import productsData from "@/components/Products/productsData";

type GoalId = "automate" | "secure" | "modernize" | "payments";
type IndustryId = "telecom" | "retail" | "financial" | "other";
type SizeId = "small" | "medium" | "large";

const GOAL_OPTIONS: { id: GoalId; label: string; solutionId: string }[] = [
  { id: "automate", label: "Automate repetitive work", solutionId: "business-automation" },
  { id: "secure", label: "Strengthen our security", solutionId: "secure-digital-systems" },
  { id: "modernize", label: "Modernize our infrastructure", solutionId: "infrastructure-modernization" },
  { id: "payments", label: "Improve payments & collections", solutionId: "payment-financial-systems" },
];

const INDUSTRY_OPTIONS: { id: IndustryId; label: string; productId?: string }[] = [
  { id: "telecom", label: "Telecommunications / ISP", productId: "product-netpurse" },
  { id: "retail", label: "Retail / SME", productId: "product-ledge-biashara" },
  { id: "financial", label: "Financial Services" },
  { id: "other", label: "Other / Enterprise" },
];

const SIZE_OPTIONS: { id: SizeId; label: string }[] = [
  { id: "small", label: "1-20 people" },
  { id: "medium", label: "21-200 people" },
  { id: "large", label: "200+ people" },
];

const STEP_LABELS = ["Goal", "Industry", "Team size", "Recommendation"];

const SolutionFinder = () => {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<GoalId | null>(null);
  const [industry, setIndustry] = useState<IndustryId | null>(null);
  const [size, setSize] = useState<SizeId | null>(null);

  const reset = () => {
    setStep(0);
    setGoal(null);
    setIndustry(null);
    setSize(null);
  };

  const selectedGoal = GOAL_OPTIONS.find((g) => g.id === goal);
  const selectedIndustry = INDUSTRY_OPTIONS.find((i) => i.id === industry);
  const solution = solutionsData.find((s) => s.id === selectedGoal?.solutionId);
  const product = productsData.find((p) => p.id === selectedIndustry?.productId);

  return (
    <Stage tone="ink">
      <div>
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="Solution Finder"
            title="Not Sure What You Need?"
            paragraph="Answer three quick questions and we'll point you to the right solution, no sales call required to find out."
            center
            light
            mb="48px"
          />
        </div>

        <div
          className="glass-strong mx-auto max-w-2xl rounded-3xl p-6 sm:p-8"
          data-aos="fade-up"
        >
          {/* Progress */}
          <div className="mb-8 flex items-center gap-2">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= step ? "bg-amber" : "bg-white/[0.15]"
                  }`}
                />
              </div>
            ))}
          </div>

          {step === 0 && (
            <FinderStep
              question="What are you trying to improve?"
              options={GOAL_OPTIONS}
              onSelect={(id) => {
                setGoal(id);
                setStep(1);
              }}
            />
          )}

          {step === 1 && (
            <FinderStep
              question="What industry are you in?"
              options={INDUSTRY_OPTIONS}
              onSelect={(id) => {
                setIndustry(id);
                setStep(2);
              }}
              onBack={() => setStep(0)}
            />
          )}

          {step === 2 && (
            <FinderStep
              question="How large is your organization?"
              options={SIZE_OPTIONS}
              onSelect={(id) => {
                setSize(id);
                setStep(3);
              }}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && solution && (
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber">
                <IconCheck className="h-3.5 w-3.5" />
                Recommended Solution
              </span>
              <h3 className="mb-2 text-2xl font-bold text-white">{solution.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-white/[0.72]">
                {solution.problem} Based on what you told us, this is where we'd start.
              </p>

              {product && (
                <div className="mb-6 rounded-2xl border border-white/10 bg-ink/40 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber">
                    Relevant product
                  </p>
                  <p className="text-sm font-bold text-white">{product.name}</p>
                  <p className="text-sm text-white/[0.7]">{product.description}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3 text-sm font-bold text-ink transition hover:bg-amber-soft"
                >
                  Talk to Our Team
                  <IconArrowRight className="h-4 w-4" />
                </Link>
                {solution.href && (
                  <Link
                    href={solution.href}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                  >
                    Learn More
                  </Link>
                )}
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-white/60 underline-offset-2 hover:text-amber hover:underline"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Stage>
  );
};

function FinderStep<T extends { id: string; label: string }>({
  question,
  options,
  onSelect,
  onBack,
}: {
  question: string;
  options: T[];
  onSelect: (id: T["id"]) => void;
  onBack?: () => void;
}) {
  return (
    <div>
      <h3 className="mb-5 text-lg font-bold text-white sm:text-xl">{question}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className="rounded-xl border border-white/[0.15] bg-white/[0.06] px-4 py-3.5 text-left text-sm font-medium text-white transition hover:border-amber hover:bg-amber/10"
          >
            {option.label}
          </button>
        ))}
      </div>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-5 text-sm font-medium text-white/60 hover:text-amber"
        >
          ← Back
        </button>
      )}
    </div>
  );
}

export default SolutionFinder;
