// Starts three local Workers (mock AI provider, no Cloudflare login needed), runs e2e.mjs, stops them.
//   npm run test:e2e
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const wranglerBin = join(root, "node_modules", "wrangler", "bin", "wrangler.js");
const tmp = join(root, ".wrangler", `e2e-${Date.now()}`); // fresh state each run: no leftover limiter counters
mkdirSync(tmp, { recursive: true });

// Derive test configs from the real one: drop the `ai` binding (mock needs none, and the real
// binding forces a Cloudflare login even locally), relax limits, optionally add a local KV.
const real = JSON.parse(readFileSync(join(root, "wrangler.jsonc"), "utf8").replace(/^\s*\/\/.*$/gm, ""));
function makeConfig(name, { kv }) {
  const cfg = structuredClone(real);
  delete cfg.ai;
  cfg.name = name;
  cfg.main = join(root, "src", "index.ts");
  if (kv) cfg.kv_namespaces = [{ binding: "LEADS", id: "local-test-namespace" }];
  Object.assign(cfg.vars, {
    AI_PROVIDER: "mock",
    ALLOWED_ORIGINS: "http://localhost:3000",
    RL_CHAT_IP_PER_MIN: "60",
    RL_CHAT_IP_PER_HOUR: "500",
    RL_CHAT_IP_PER_DAY: "5000",
    RL_CHAT_SESSION_PER_HOUR: "500",
    GLOBAL_DAILY_CHAT_LIMIT: "5000",
    RL_LEAD_IP_PER_HOUR: "50",
    RL_LEAD_IP_PER_DAY: "500",
  });
  const file = join(tmp, `${name}.jsonc`);
  writeFileSync(file, JSON.stringify(cfg, null, 2));
  return file;
}

const instances = [
  { port: 8799, config: makeConfig("corefort-ai-e2e-a", { kv: true }), extra: [] },
  { port: 8798, config: makeConfig("corefort-ai-e2e-b", { kv: false }), extra: [] },
  { port: 8797, config: makeConfig("corefort-ai-e2e-c", { kv: false }), extra: ["--var", "GLOBAL_DAILY_CHAT_LIMIT:2"] },
];

const procs = instances.map((i, n) =>
  spawn(process.execPath, [wranglerBin, "dev", "-c", i.config, "--port", String(i.port), "--inspector-port", String(9400 + n), "--persist-to", join(tmp, `state-${n}`), ...i.extra], {
    cwd: root,
    stdio: "ignore",
    windowsHide: true,
  }),
);

function stopAll() {
  for (const p of procs) {
    if (process.platform === "win32") spawnSync("taskkill", ["/pid", String(p.pid), "/T", "/F"], { stdio: "ignore" });
    else p.kill("SIGTERM");
  }
  try {
    rmSync(tmp, { recursive: true, force: true });
  } catch {
    /* files may still be locked on Windows; harmless, next run uses a new directory */
  }
}
process.on("exit", stopAll);
process.on("SIGINT", () => process.exit(130));

async function waitHealthy(port) {
  for (let i = 0; i < 90; i++) {
    try {
      const r = await fetch(`http://localhost:${port}/health`);
      if (r.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Worker on port ${port} did not start`);
}

try {
  await Promise.all(instances.map((i) => waitHealthy(i.port)));
  const res = spawnSync(process.execPath, [join(root, "test", "e2e.mjs")], { stdio: "inherit" });
  process.exitCode = res.status ?? 1;
} catch (err) {
  console.error(String(err));
  process.exitCode = 1;
}
