// Offline local Worker on http://localhost:8787 with the MOCK AI provider and a local KV for leads.
// No Cloudflare login, no cost, canned answers - ideal for building/testing the website widget.
//   npm run dev:mock
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, ".wrangler", "dev-mock");
mkdirSync(dir, { recursive: true });

const cfg = JSON.parse(readFileSync(join(root, "wrangler.jsonc"), "utf8").replace(/^\s*\/\/.*$/gm, ""));
delete cfg.ai; // the real binding requires `wrangler login` even locally
cfg.name = "corefort-ai-dev-mock";
cfg.main = join(root, "src", "index.ts");
cfg.kv_namespaces = [{ binding: "LEADS", id: "local-dev-namespace" }];
Object.assign(cfg.vars, {
  AI_PROVIDER: "mock",
  ALLOWED_ORIGINS: "http://localhost:3000,http://localhost:3010",
  RL_CHAT_IP_PER_MIN: "60",
  GLOBAL_DAILY_CHAT_LIMIT: "5000",
});
const file = join(dir, "wrangler.jsonc");
writeFileSync(file, JSON.stringify(cfg, null, 2));

const child = spawn(
  process.execPath,
  [join(root, "node_modules", "wrangler", "bin", "wrangler.js"), "dev", "-c", file, "--port", "8787", "--persist-to", join(dir, "state")],
  { cwd: root, stdio: "inherit" },
);
child.on("exit", (code) => process.exit(code ?? 0));
