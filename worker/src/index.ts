import { getConfig } from "./config";
import { handleChat } from "./agent/chat";
import { handleEvent } from "./events";
import { handleLead } from "./lead";
import { allowedOrigin, corsHeaders, json, SECURITY_HEADERS } from "./security";
import type { Env } from "./types";

export { RateLimiter } from "./ratelimit";

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const cfg = getConfig(env);
    const url = new URL(req.url);
    const origin = allowedOrigin(req, cfg);

    if (url.pathname === "/health" && req.method === "GET") {
      return json({ ok: true }, 200);
    }

    // CORS preflight: answered only for allow-listed origins.
    if (req.method === "OPTIONS") {
      return origin
        ? new Response(null, { status: 204, headers: { ...SECURITY_HEADERS, ...corsHeaders(origin) } })
        : new Response(null, { status: 403, headers: SECURITY_HEADERS });
    }

    const routes: Record<string, (o: string | null) => Promise<Response>> = {
      "/api/chat": (o) => handleChat(req, env, cfg, o),
      "/api/lead": (o) => handleLead(req, env, cfg, o),
      "/api/event": (o) => handleEvent(req, env, cfg, o),
    };
    const route = routes[url.pathname];
    if (!route) return json({ error: "not_found" }, 404);
    if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405, { Allow: "POST, OPTIONS" });

    // Every API call must come from an allow-listed website origin.
    if (!origin) return json({ error: "forbidden" }, 403);

    try {
      return await route(origin);
    } catch {
      console.log(JSON.stringify({ evt: "unhandled_error" }));
      return json({ error: "server_error" }, 500, corsHeaders(origin));
    }
  },
} satisfies ExportedHandler<Env>;
