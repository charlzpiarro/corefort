import { DurableObject } from "cloudflare:workers";
import type { Env } from "./types";
import { sha256Hex } from "./security";

export interface Window {
  name: string;
  limit: number;
  seconds: number;
}

export interface LimitResult {
  ok: boolean;
  retryAfter: number;
}

type State = Record<string, { w: number; c: number }>;

/**
 * One Durable Object instance per (scope, hashed key). It keeps fixed-window counters and
 * deletes itself (alarm -> deleteAll) shortly after its longest window ends, so nothing
 * lingers and no raw IP address is ever persisted (the object name is a salted hash).
 */
export class RateLimiter extends DurableObject<Env> {
  async check(windows: Window[]): Promise<LimitResult> {
    const now = Date.now();
    const state = (await this.ctx.storage.get<State>("s")) ?? {};

    for (const w of windows) {
      const idx = Math.floor(now / (w.seconds * 1000));
      const cur = state[w.name];
      const count = cur && cur.w === idx ? cur.c : 0;
      if (count >= w.limit) {
        return { ok: false, retryAfter: Math.max(1, Math.ceil(((idx + 1) * w.seconds * 1000 - now) / 1000)) };
      }
    }

    let longest = 0;
    for (const w of windows) {
      const idx = Math.floor(now / (w.seconds * 1000));
      const cur = state[w.name];
      state[w.name] = { w: idx, c: cur && cur.w === idx ? cur.c + 1 : 1 };
      longest = Math.max(longest, w.seconds);
    }
    await this.ctx.storage.put("s", state);
    await this.ctx.storage.setAlarm(now + (longest + 60) * 1000);
    return { ok: true, retryAfter: 0 };
  }

  async alarm(): Promise<void> {
    await this.ctx.storage.deleteAll();
  }
}

/** Checks all windows for a key. Fails CLOSED (blocks) if the limiter itself is unavailable. */
export async function limit(env: Env, scope: string, rawKey: string, windows: Window[]): Promise<LimitResult> {
  try {
    const hashed = await sha256Hex(`${env.RATE_LIMIT_SALT ?? "corefort-ai"}:${rawKey}`);
    const stub = env.LIMITER.get(env.LIMITER.idFromName(`${scope}:${hashed}`));
    return await stub.check(windows);
  } catch {
    return { ok: false, retryAfter: 30 };
  }
}
