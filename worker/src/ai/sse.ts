/** Extracts the text delta from one parsed Workers AI stream chunk (both known shapes). */
export function deltaFromChunk(chunk: unknown): string {
  if (!chunk || typeof chunk !== "object") return "";
  const c = chunk as {
    response?: unknown;
    choices?: { delta?: { content?: unknown }; text?: unknown }[];
  };
  if (typeof c.response === "string") return c.response; // { response: "..." }
  const choice = c.choices?.[0];
  if (choice && typeof choice.delta?.content === "string") return choice.delta.content; // OpenAI-style
  if (choice && typeof choice.text === "string") return choice.text;
  return "";
}

/**
 * Turns a raw Workers AI SSE byte stream into an async iterator of text deltas.
 * Handles chunks split across reads, `[DONE]`, and ignores usage/keep-alive lines.
 */
export async function* readDeltas(stream: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let nl: number;
      while ((nl = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        const text = parseLine(line);
        if (text === null) return;
        if (text) yield text;
      }
    }
    const tail = parseLine(buffer.trim());
    if (tail) yield tail;
  } finally {
    reader.releaseLock();
  }
}

/** Returns "" for lines to skip, null for [DONE], otherwise the delta text. */
function parseLine(line: string): string | null {
  if (!line.startsWith("data:")) return "";
  const payload = line.slice(5).trim();
  if (payload === "[DONE]") return null;
  if (!payload) return "";
  try {
    return deltaFromChunk(JSON.parse(payload));
  } catch {
    return "";
  }
}
