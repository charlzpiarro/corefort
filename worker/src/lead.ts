import type { Config } from "./config";
import type { Env } from "./types";
import { BUDGET_OPTIONS, LEAD_SOLUTION_OPTIONS } from "./agent/knowledge";
import { limit } from "./ratelimit";
import { cleanText, clientIp, corsHeaders, json, readJson, stripMarkup } from "./security";

export interface Lead {
  name: string;
  business: string;
  industry: string;
  phone: string;
  email: string;
  location: string;
  requirement: string;
  solution: string;
  /** One of BUDGET_OPTIONS, or empty when the visitor did not share one. */
  budget: string;
  notes: string;
}

export type FieldErrors = Partial<Record<keyof Lead | "consent" | "contact", string>>;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;

/** Server-side validation. Client validation is a convenience only; this is the authority. */
export function validateLead(raw: unknown): { lead?: Lead; errors?: FieldErrors; bot?: boolean } {
  if (!raw || typeof raw !== "object") return { errors: { contact: "Invalid request" } };
  const r = raw as Record<string, unknown>;

  // Honeypot: real visitors never fill this hidden field.
  if (typeof r.website === "string" && r.website.trim() !== "") return { bot: true };

  const clean = (v: unknown, max: number) => stripMarkup(cleanText(v, max));
  const lead: Lead = {
    name: clean(r.name, 80),
    business: clean(r.business, 120),
    industry: clean(r.industry, 80),
    phone: clean(r.phone, 24),
    email: clean(r.email, 254).toLowerCase(),
    location: clean(r.location, 100),
    requirement: clean(r.requirement, 1000),
    solution: clean(r.solution, 60),
    budget: clean(r.budget, 80),
    notes: clean(r.notes, 1000),
  };

  const errors: FieldErrors = {};
  if (r.consent !== true) errors.consent = "Please confirm you agree to share your details with Corefort.";
  if (lead.name.length < 2) errors.name = "Please enter your name.";
  if (lead.business.length < 2) errors.business = "Please enter your business name.";
  if (lead.requirement.length < 10) errors.requirement = "Please describe what you need (at least a sentence).";

  const phoneDigits = lead.phone.replace(/\D/g, "");
  const phoneOk = /^[+\d][\d\s().-]{5,23}$/.test(lead.phone) && phoneDigits.length >= 7 && phoneDigits.length <= 15;
  const emailOk = lead.email.length > 0 && EMAIL_RE.test(lead.email);
  if (lead.phone && !phoneOk) errors.phone = "Please enter a valid phone number.";
  if (lead.email && !emailOk) errors.email = "Please enter a valid email address.";
  if (!phoneOk && !emailOk) errors.contact = "Please give a phone number or an email so the team can reach you.";

  if (lead.solution && !LEAD_SOLUTION_OPTIONS.includes(lead.solution)) lead.solution = "Not sure yet";
  if (!lead.solution) lead.solution = "Not sure yet";
  // Budget is optional and only accepted from the published bands; anything else is dropped.
  if (!BUDGET_OPTIONS.includes(lead.budget)) lead.budget = "";

  return Object.keys(errors).length ? { errors } : { lead };
}

// ---------- Delivery sinks ----------

function leadText(lead: Lead): string {
  return [
    `Name: ${lead.name}`,
    `Business: ${lead.business}`,
    `Industry: ${lead.industry || "-"}`,
    `Phone: ${lead.phone || "-"}`,
    `Email: ${lead.email || "-"}`,
    `Location: ${lead.location || "-"}`,
    `Relevant solution: ${lead.solution}`,
    `Budget range: ${lead.budget || "Not shared"}`,
    `Requirement: ${lead.requirement}`,
    `Notes: ${lead.notes || "-"}`,
  ].join("\n");
}

/** Accepts "a@x.com, b@y.com", semicolons, spaces or newlines, and stray quotes or <angle brackets>. Max 5. */
export function parseRecipients(raw: string): string[] {
  return raw
    .split(/[\s,;]+/)
    .map((s) => s.replace(/^[<"']+|[>"']+$/g, ""))
    .filter((s) => EMAIL_RE.test(s))
    .slice(0, 5);
}

/** Every configured sink is attempted. The lead counts as delivered only if at least one succeeds. */
export async function deliverLead(env: Env, cfg: Config, lead: Lead): Promise<{ delivered: boolean; sinks: string[] }> {
  const sinks: string[] = [];
  const tasks: Promise<void>[] = [];

  if (env.LEADS) {
    tasks.push(
      env.LEADS.put(`lead:${new Date().toISOString()}:${crypto.randomUUID().slice(0, 8)}`, JSON.stringify(lead), {
        expirationTtl: cfg.leadRetentionDays * 86400,
      }).then(() => void sinks.push("kv")),
    );
  }

  if (env.WEB3FORMS_ACCESS_KEY) {
    tasks.push(
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: env.WEB3FORMS_ACCESS_KEY,
          subject: `Corefort AI quote request - ${lead.solution}`,
          from_name: "Corefort AI",
          name: lead.name,
          email: lead.email || undefined,
          phone: lead.phone || undefined,
          message: leadText(lead),
        }),
      }).then(async (res) => {
        const data = (await res.json().catch(() => ({}))) as { success?: boolean };
        if (res.ok && data.success) sinks.push("web3forms");
      }),
    );
  }

  if (env.LEAD_WEBHOOK_URL) {
    tasks.push(
      fetch(env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // `text` = Slack, `content` = Discord (2000-char cap); `lead` is for automation tools (Make/Zapier/n8n).
        body: JSON.stringify({
          text: `New Corefort AI quote request\n${leadText(lead)}`,
          content: `New Corefort AI quote request\n${leadText(lead)}`.slice(0, 1900),
          lead,
        }),
      }).then((res) => {
        if (res.ok) sinks.push("webhook");
      }),
    );
  }

  if (env.RESEND_API_KEY && env.LEAD_NOTIFY_EMAIL) {
    const to = parseRecipients(env.LEAD_NOTIFY_EMAIL);
    if (to.length) {
      tasks.push(
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.RESEND_API_KEY}` },
          body: JSON.stringify({
            from: env.LEAD_FROM_EMAIL || "Corefort AI <onboarding@resend.dev>",
            to,
            // Reply goes straight to the visitor when they gave an email.
            ...(lead.email ? { reply_to: lead.email } : {}),
            subject: `New quote request: ${lead.business} (${lead.solution})`.replace(/[\r\n]+/g, " ").slice(0, 200),
            // Plain text only: visitor-supplied content is never rendered as HTML.
            text: `New quote request from the Corefort AI chat.\n\n${leadText(lead)}\n\nSubmitted with the visitor's consent to be contacted about this request.`,
          }),
        }).then(async (res) => {
          if (res.ok) return void sinks.push("email");
          // Provider error text (e.g. "domain is not verified") is safe to log; keys and lead data are not.
          const err = (await res.json().catch(() => ({}))) as { name?: string; message?: string };
          console.log(JSON.stringify({ evt: "lead_sink_failed", sink: "email", status: res.status, name: err.name, message: String(err.message ?? "").slice(0, 200) }));
        }),
      );
    }
  }

  await Promise.allSettled(tasks);
  return { delivered: sinks.length > 0, sinks };
}

export async function handleLead(req: Request, env: Env, cfg: Config, origin: string | null): Promise<Response> {
  const cors = corsHeaders(origin);
  const rl = await limit(env, "lead-ip", clientIp(req), [
    { name: "hour", limit: cfg.lead.ipPerHour, seconds: 3600 },
    { name: "day", limit: cfg.lead.ipPerDay, seconds: 86400 },
  ]);
  if (!rl.ok) return json({ ok: false, error: "rate_limited" }, 429, { ...cors, "Retry-After": String(rl.retryAfter) });

  const body = await readJson(req, cfg.maxRequestBytes);
  const result = validateLead(body);

  // Bots get a normal-looking success and nothing is stored or sent.
  if (result.bot) return json({ ok: true }, 200, cors);
  if (!result.lead) return json({ ok: false, error: "validation", fields: result.errors }, 422, cors);

  const { delivered } = await deliverLead(env, cfg, result.lead);
  if (!delivered) {
    // Honest failure: never tell the visitor it was sent when it was not.
    console.log(JSON.stringify({ evt: "lead_undelivered" }));
    return json({ ok: false, error: "unavailable" }, 503, cors);
  }
  console.log(JSON.stringify({ evt: "lead_delivered" }));
  return json({ ok: true }, 200, cors);
}
