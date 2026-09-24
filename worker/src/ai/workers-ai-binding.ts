import type { Config } from "../config";
import type { Env } from "../types";
import { ProviderError, type ChatProvider } from "./provider";

/** Preferred provider: the native Workers AI binding (no API token required). */
export function bindingProvider(env: Env, cfg: Config): ChatProvider {
  return {
    name: "workers-ai-binding",
    async stream({ messages, maxTokens, temperature }) {
      if (!env.AI) throw new ProviderError("AI binding is not configured");
      try {
        const result = await env.AI.run(cfg.model as keyof AiModels, {
          messages,
          stream: true,
          max_tokens: maxTokens,
          temperature,
        } as never);
        if (!(result instanceof ReadableStream)) throw new ProviderError("unexpected non-stream result");
        return result as ReadableStream<Uint8Array>;
      } catch (err) {
        if (err instanceof ProviderError) throw err;
        // Deliberately drop the upstream error text.
        throw new ProviderError("workers ai request failed");
      }
    },
  };
}
