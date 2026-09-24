import type { Env } from "./types";

export interface Config {
  allowedOrigins: string[];
  provider: "binding" | "rest" | "mock";
  model: string;
  maxOutputTokens: number;
  maxMessageChars: number;
  maxHistoryMessages: number;
  maxRequestBytes: number;
  chat: { ipPerMin: number; ipPerHour: number; ipPerDay: number; sessionPerHour: number; globalPerDay: number };
  lead: { ipPerHour: number; ipPerDay: number };
  eventIpPerMin: number;
  leadRetentionDays: number;
}

/** Parse a bounded integer var; falls back to the default on anything invalid. */
export function num(value: string | undefined, fallback: number, min: number, max: number): number {
  const n = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(n) || n < min || n > max) return fallback;
  return n;
}

export const DEFAULT_MODEL = "@cf/mistralai/mistral-small-3.1-24b-instruct";

export function getConfig(env: Env): Config {
  const provider = (env.AI_PROVIDER ?? "binding").toLowerCase();
  return {
    allowedOrigins: (env.ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((o) => o.trim().replace(/\/+$/, ""))
      .filter((o) => o.length > 0 && o !== "*"),
    provider: provider === "rest" || provider === "mock" ? provider : "binding",
    model: env.AI_MODEL?.trim() || DEFAULT_MODEL,
    maxOutputTokens: num(env.MAX_OUTPUT_TOKENS, 380, 64, 1024),
    maxMessageChars: num(env.MAX_MESSAGE_CHARS, 600, 50, 2000),
    maxHistoryMessages: num(env.MAX_HISTORY_MESSAGES, 12, 2, 30),
    maxRequestBytes: 16 * 1024,
    chat: {
      ipPerMin: num(env.RL_CHAT_IP_PER_MIN, 6, 1, 1000),
      ipPerHour: num(env.RL_CHAT_IP_PER_HOUR, 40, 1, 10000),
      ipPerDay: num(env.RL_CHAT_IP_PER_DAY, 120, 1, 100000),
      sessionPerHour: num(env.RL_CHAT_SESSION_PER_HOUR, 30, 1, 10000),
      globalPerDay: num(env.GLOBAL_DAILY_CHAT_LIMIT, 90, 1, 1000000),
    },
    lead: {
      ipPerHour: num(env.RL_LEAD_IP_PER_HOUR, 5, 1, 1000),
      ipPerDay: num(env.RL_LEAD_IP_PER_DAY, 15, 1, 10000),
    },
    eventIpPerMin: num(env.RL_EVENT_IP_PER_MIN, 60, 1, 10000),
    leadRetentionDays: num(env.LEAD_RETENTION_DAYS, 90, 1, 3650),
  };
}
