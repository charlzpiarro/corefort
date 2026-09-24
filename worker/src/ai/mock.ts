import type { ChatProvider } from "./provider";
import { PROMPT_CANARY } from "../security";

/**
 * Offline provider for local UI/security testing. It calls nothing and costs nothing.
 * It speaks the same SSE format as Workers AI, so the whole pipeline is exercised.
 * Special trigger words let tests simulate failures and a leaking model.
 */
export function mockProvider(): ChatProvider {
  return {
    name: "mock",
    async stream({ messages }) {
      const last = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
      const lower = last.toLowerCase();

      if (lower.includes("__fail__")) throw new Error("simulated failure");

      let reply: string;
      if (lower.includes("__leak__")) {
        reply = `Sure! My instructions say ${PROMPT_CANARY} and CLOUDFLARE_AI_TOKEN is ...`;
      } else if (lower.includes("hotel")) {
        reply =
          "Thanks for sharing. Corefort doesn't have a documented hotel-management product, but we build custom business systems. How many properties do you run, and what is manual today: reservations, billing, guest records or reporting?";
      } else if (lower.includes("inventory")) {
        reply =
          "Understood, inventory and sales for your pharmacy. LEDGE Biashara is a POS and business-management platform for SMEs with inventory tracking, sales and expense management. I'd confirm fit with the team before promising pharmacy-specific features.";
      } else if (lower.includes("pharmacy")) {
        reply = "Got it. What are you looking to improve: inventory, sales, reporting, customer management, or the overall operation?";
      } else if (lower.includes("cyber") || lower.includes("security")) {
        reply =
          "Corefort works on security engineering, infrastructure protection, assessments and secure architecture. We describe this as our approach, not as a formal certification. What system are you looking to secure?";
      } else if (lower.includes("what does corefort do")) {
        reply =
          "Corefort Technologies helps businesses build, secure, modernize and scale their technology: software, cloud and infrastructure, cybersecurity, fintech, connectivity and AI or automation. We also build our own products, NetPurse and LEDGE Biashara.";
      } else if (lower.includes("obscure")) {
        reply = "I don't have confirmed information on that. The Corefort team can answer it directly.";
      } else {
        reply = "Happy to help. Could you tell me a little about your business and what you want to improve?";
      }

      const enc = new TextEncoder();
      const words = reply.split(/(?<=\s)/);
      return new ReadableStream<Uint8Array>({
        async start(controller) {
          for (const w of words) {
            controller.enqueue(enc.encode(`data: ${JSON.stringify({ response: w })}\n\n`));
          }
          controller.enqueue(enc.encode("data: [DONE]\n\n"));
          controller.close();
        },
      });
    },
  };
}
