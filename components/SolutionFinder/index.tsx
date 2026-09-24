"use client";

import { useState } from "react";
import Link from "next/link";
import SectionTitle from "@/components/Common/SectionTitle";
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
    <section className="py-20 md:py-28">
      <div className="container">
        <div data-aos="fade-up">
          <SectionTitle
            eyebrow="Solution Finder"
            title="Not Sure What You Need?"
            paragraph="Answer three quick questions and we'll point you to the right solution, no sales call required to find out."
            center
            mb="48px"
          />
        </div>

        <div
          className="mx-auto max-w-2xl rounded-3xl border border-stroke bg-white p-6 shadow-card dark:border-white/10 dark:bg-navy-light sm:p-8"
          data-aos="fade-up"
        >
          {/* Progress */}
          <div className="mb-8 flex items-center gap-2">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= step ? "bg-primary" : "bg-stroke dark:bg-white/10"
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
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                <IconCheck className="h-3.5 w-3.5" />
                Recommended Solution
              </span>
              <h3 className="mb-2 text-2xl font-bold text-black dark:text-white">{solution.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                {solution.problem} Based on what you told us, this is where we'd start.
              </p>

              {product && (
                <div className="mb-6 rounded-2xl border border-stroke bg-gray-light p-4 dark:border-white/10 dark:bg-bg-color-dark">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-body-color dark:text-body-color-dark">
                    Relevant product
                  </p>
                  <p className="text-sm font-bold text-black dark:text-white">{product.name}</p>
                  <p className="text-sm text-body-color dark:text-body-color-dark">{product.description}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Talk to Our Team
                  <IconArrowRight className="h-4 w-4" />
                </Link>
                {solution.href && (
                  <Link
                    href={solution.href}
                    className="inline-flex items-center gap-2 rounded-xl border border-stroke px-6 py-3 text-sm font-semibold text-dark transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:text-white"
                  >
                    Learn More
                  </Link>
                )}
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-body-color underline-offset-2 hover:text-primary hover:underline dark:text-body-color-dark"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
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
      <h3 className="mb-5 text-lg font-bold text-black dark:text-white sm:text-xl">{question}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className="rounded-xl border border-stroke bg-white px-4 py-3.5 text-left text-sm font-medium text-dark transition hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-white/10 dark:bg-bg-color-dark dark:text-white"
          >
            {option.label}
          </button>
        ))}
      </div>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-5 text-sm font-medium text-body-color hover:text-primary dark:text-body-color-dark"
        >
          ← Back
        </button>
      )}
    </div>
  );
}

export default SolutionFinder;
