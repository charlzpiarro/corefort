/** Public base URL of the Corefort AI Worker. Empty string disables the widget entirely. */
export const AI_API_URL = (process.env.NEXT_PUBLIC_COREFORT_AI_URL ?? "").replace(/\/+$/, "");

/** Keep in sync with MAX_MESSAGE_CHARS in worker/wrangler.jsonc (the Worker is the authority). */
export const MAX_INPUT_CHARS = 600;

/** How many recent turns are sent to the Worker (it enforces its own cap as well). */
export const MAX_HISTORY_TURNS = 12;

export const SESSION_KEY = "corefort-ai-session";

/** Options shown for the "relevant solution" field. The Worker validates against its own list. */
export const QUOTE_SOLUTIONS = [
  "Digital Transformation",
  "Business Automation",
  "Infrastructure Modernization",
  "Secure Digital Systems",
  "Network & Connectivity",
  "Payment & Financial Systems",
  "Enterprise Software",
  "AI-Powered Operations",
  "NetPurse",
  "LEDGE Biashara",
  "Cybersecurity",
  "Not sure yet",
];

/** Optional budget bands. Keep in sync with BUDGET_OPTIONS in worker/src/agent/knowledge.ts (the Worker is the authority). */
export const QUOTE_BUDGETS = [
  "Under TZS 5M (about USD 2,000)",
  "TZS 5M to 20M (about USD 2,000 to 8,000)",
  "TZS 20M to 50M (about USD 8,000 to 20,000)",
  "TZS 50M to 100M (about USD 20,000 to 40,000)",
  "Over TZS 100M (over USD 40,000)",
  "Not sure yet, prefer to discuss",
];

export const QUOTE_INDUSTRIES = [
  "Retail",
  "Healthcare",
  "Financial services",
  "Telecom / ISP",
  "Education",
  "Logistics",
  "Hospitality",
  "Other",
];

export const SUGGESTED_PROMPTS = [
  "What does Corefort do?",
  "Which solution is right for my business?",
  "I need a business management system",
  "I want to modernize my infrastructure",
  "I need a secure digital system",
  "I want to request a quotation",
];

export const FALLBACK_ERROR_TEXT =
  "Sorry, I'm having trouble responding right now. You can contact the Corefort team directly and we'll help you out.";
export const RATE_LIMIT_TEXT =
  "You've sent a lot of messages in a short time. Please wait a little and try again, or contact the Corefort team directly.";
