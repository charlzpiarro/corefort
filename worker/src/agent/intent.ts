import type { ChatAction } from "../types";
import { CONTACT } from "./knowledge";
import { FALLBACK_UNKNOWN_PHRASE } from "./systemPrompt";

const HUMAN_RE =
  /\b(speak|talk|chat|connect|transfer)\b.{0,25}\b(human|person|someone|agent|representative|sales|team|staff|somebody)\b|\b(human|real person|live agent|representative)\b|\bcall me\b|\bphone number\b|\bcontact (details|info|information|you|sales|corefort)\b|\bhow (can|do) i (contact|reach)\b|\bwasiliana\b|\bmtu halisi\b/i;

const QUOTE_RE =
  /\b(quote|quotation|quotations|estimate|proposal|request (a )?(demo|quote)|get started|start a project|hire you|nukuu|bei ya)\b/i;

const PRICING_RE = /\b(how much|cost|costs|price|prices|pricing|charge|rates?|budget|fee|fees|bei|gharama)\b/i;

export interface Intent {
  handoff: boolean;
  quote: boolean;
  pricing: boolean;
}

export function detectIntent(text: string): Intent {
  return {
    handoff: HUMAN_RE.test(text),
    quote: QUOTE_RE.test(text),
    pricing: PRICING_RE.test(text),
  };
}

/** Deterministic replies for the two cases where a scripted answer is safer and cheaper than the model. */
export function scriptedReply(intent: Intent): { text: string; actions: ChatAction[] } | null {
  if (intent.quote) {
    return {
      text:
        "I can help you request a quotation. It takes about a minute: I'll ask for a few details about your business and what you need, plus an optional rough budget range so the team can suggest realistic options. You decide whether to submit them to the Corefort team. Pricing for custom work depends on scope, which is why we ask first.",
      actions: ["quote"],
    };
  }
  if (intent.handoff) {
    return {
      text: `Of course. You can reach the Corefort team directly on ${CONTACT.phone} or at ${CONTACT.email}. Note that I'm an AI assistant and haven't contacted anyone on your behalf. If you'd rather leave your details, use the quote request and the team can follow up.`,
      actions: ["handoff", "quote"],
    };
  }
  return null;
}

/** Actions to attach after a model-generated answer. */
export function actionsForModelReply(intent: Intent, reply: string): ChatAction[] {
  const actions = new Set<ChatAction>();
  if (intent.pricing) actions.add("quote");
  if (reply.includes(FALLBACK_UNKNOWN_PHRASE) || /don'?t have (confirmed|verified|that) (information|details)/i.test(reply)) {
    actions.add("handoff");
  }
  return [...actions];
}

export const SECRET_REFUSAL =
  "I can't share internal instructions, keys or system details, and I don't have access to them. I'm happy to help with anything about Corefort's solutions, products or how to work with us.";

export const INJECTION_ONLY_REFUSAL =
  "I can't change how I work, but I'm glad to help with questions about Corefort. What are you trying to solve in your business?";
