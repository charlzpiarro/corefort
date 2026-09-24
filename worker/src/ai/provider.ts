import type { Config } from "../config";
import type { Env, ModelMessage } from "../types";
import { bindingProvider } from "./workers-ai-binding";
import { restProvider } from "./workers-ai-rest";
import { mockProvider } from "./mock";

export interface ChatRequest {
  messages: ModelMessage[];
  maxTokens: number;
  temperature: number;
}

/**
 * The only thing the rest of the Worker knows about the model vendor.
 * `stream` resolves to a raw Server-Sent-Events byte stream; parsing is provider-independent
 * (see sse.ts). To use another vendor, add a file that implements this and select it in
 * `createProvider` - the frontend and the agent layer do not change.
 */
export interface ChatProvider {
  readonly name: string;
  stream(req: ChatRequest): Promise<ReadableStream<Uint8Array>>;
}

/** Raised for any provider failure. The message never contains upstream error bodies. */
export class ProviderError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
  }
}

export function createProvider(env: Env, cfg: Config): ChatProvider {
  switch (cfg.provider) {
    case "mock":
      return mockProvider();
    case "rest":
      return restProvider(env, cfg);
    default:
      return bindingProvider(env, cfg);
  }
}
