import Image from "next/image";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import securityData from "@/components/Security/securityData";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Security | Corefort Technologies",
  description:
    "How Corefort Technologies approaches security across architecture, development, infrastructure, and operations.",
};

const ADDITIONAL_AREAS = [
  {
    title: "Vulnerability Management",
    detail: "We track and address known vulnerabilities in the software and infrastructure we operate.",
  },
  {
    title: "Business Continuity",
    detail: "Backup and recovery procedures are designed so a single failure doesn't become an outage.",
  },
  {
    title: "Security Testing",
    detail: "Systems are reviewed and tested for common weaknesses before and after deployment.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <Breadcrumb
        pageName="Security"
        description="Security is considered throughout architecture, development, and deployment, not treated as a final checklist."
      />

      {/* Photo banner: the desk photo has a clear left side, which is where the glass card sits */}
      <section className="pt-10 md:pt-14">
        <div className="container max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-stroke shadow-card">
            <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
              <Image
                src="/images/photos/security-desk-wide.webp"
                alt="A laptop on a desk showing a shield, a padlock and a Wi-Fi symbol"
                fill
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover object-[72%_50%] sm:object-center"
              />
            </div>
            <div className="glass-light relative -mt-10 mx-4 mb-4 rounded-2xl p-5 sm:absolute sm:left-8 sm:top-1/2 sm:mx-0 sm:mb-0 sm:mt-0 sm:w-[340px] sm:-translate-y-1/2 sm:p-6">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-deep">Our approach</p>
              <h2 className="mb-2 text-xl font-extrabold leading-tight text-ink sm:text-2xl">Designed in, not bolted on.</h2>
              <p className="mb-4 text-sm leading-relaxed text-hero-body">
                Security is part of the architecture conversation from the first day, not a checklist at the end.
              </p>
              <ul className="flex flex-wrap gap-2">
                {["Data protection", "Access control", "Monitoring"].map((t) => (
                  <li key={t} className="rounded-full bg-ink px-3 py-1 text-[11px] font-semibold text-white">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="mb-14 rounded-2xl border border-primary/[0.15] bg-primary/5 p-6 dark:border-primary/20">
            <h2 className="mb-2 text-lg font-bold text-black dark:text-white">
              A Note on Certifications
            </h2>
            <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
              We're precise about how we describe our security posture. What follows are the practices
              and principles we follow, described as our approach, not as formal certification, audit,
              or regulatory accreditation. If we hold a specific certification or compliance registration
              in the future, it will be named explicitly and verifiably here.
            </p>
          </div>

          <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">How We Approach Security</h2>
          <div className="mb-14 grid gap-5 sm:grid-cols-2">
            {securityData.map((practice) => {
              const Icon = practice.icon;
              return (
                <div
                  key={practice.id}
                  className="rounded-2xl border border-stroke bg-white p-6 dark:border-white/10 dark:bg-navy-light"
                >
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary dark:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mb-2 text-base font-bold text-black dark:text-white">{practice.title}</h3>
                  <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                    {practice.description}
                  </p>
                </div>
              );
            })}
          </div>

          <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">Also Part of Our Approach</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {ADDITIONAL_AREAS.map((area) => (
              <div
                key={area.title}
                className="rounded-2xl border border-stroke bg-white p-6 dark:border-white/10 dark:bg-navy-light"
              >
                <h3 className="mb-2 text-base font-bold text-black dark:text-white">{area.title}</h3>
                <p className="text-sm leading-relaxed text-body-color dark:text-body-color-dark">
                  {area.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
