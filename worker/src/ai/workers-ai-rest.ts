import type { Config } from "../config";
import type { Env } from "../types";
import { ProviderError, type ChatProvider } from "./provider";

/**
 * Alternative provider using the Workers AI REST API with CLOUDFLARE_ACCOUNT_ID and
 * CLOUDFLARE_AI_TOKEN. Both are Worker secrets read from `env` on the server only.
 * Useful for local development without the binding, or if the Worker is hosted elsewhere.
 */
export function restProvider(env: Env, cfg: Config): ChatProvider {
  return {
    name: "workers-ai-rest",
    async stream({ messages, maxTokens, temperature }) {
      const accountId = env.CLOUDFLARE_ACCOUNT_ID;
      const token = env.CLOUDFLARE_AI_TOKEN;
      if (!accountId || !token) throw new ProviderError("REST credentials are not configured");
      if (!/^[0-9a-f]{32}$/i.test(accountId)) throw new ProviderError("invalid account id");

      let res: Response;
      try {
        res = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${cfg.model}`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ messages, stream: true, max_tokens: maxTokens, temperature }),
          },
        );
      } catch {
        throw new ProviderError("workers ai request failed");
      }
      if (!res.ok || !res.body) throw new ProviderError("workers ai request failed", res.status);
      return res.body;
    },
  };
}
