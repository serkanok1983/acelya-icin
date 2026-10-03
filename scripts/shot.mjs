#!/usr/bin/env node
// Ekran görüntüsü: node scripts/shot.mjs <slug> [--theme light] [--width 390] [--full] [--scroll digest] [--out file.png]
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFileSync, statSync, existsSync } from "node:fs";
import { join, extname, resolve } from "node:path";
const ROOT = resolve(new URL("..", import.meta.url).pathname);
const args = process.argv.slice(2);
const slug = args[0];
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const flag = (n) => args.includes(n);
function loadPlaywright() {
  for (const dir of [ROOT, ...(process.env.NODE_PATH || "").split(":").filter(Boolean), "/opt/node-tools"]) {
    try { return createRequire(join(dir, "package.json")).require("playwright"); } catch (_) {}
  }
  return createRequire(import.meta.url)("playwright");
}
const { chromium } = loadPlaywright();
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".m4a": "audio/mp4" };
const server = await new Promise((done) => {
  const s = createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p === "/") p = "/index.html";
    const f = join(ROOT, p);
    if (!f.startsWith(ROOT) || !existsSync(f) || statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "Content-Type": MIME[extname(f)] || "application/octet-stream" });
    res.end(readFileSync(f));
  });
  s.listen(0, "127.0.0.1", () => done(s));
});
const PROXY = process.env.HTTPS_PROXY || "";
const browser = await chromium.launch(PROXY ? { args: [`--proxy-server=${PROXY}`, "--proxy-bypass-list=127.0.0.1;localhost", "--ignore-certificate-errors"] } : {});
const ctx = await browser.newContext({ viewport: { width: Number(opt("--width", 1280)), height: Number(opt("--height", 900)) }, deviceScaleFactor: 1, locale: "tr-TR" });
const theme = opt("--theme", "dark");
await ctx.addInitScript((t) => { try { localStorage.setItem("acelya-user", "serkan"); localStorage.setItem("loggedIn", "true"); localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); } catch (_) {} }, theme);
const page = await ctx.newPage();
await page.goto(`http://127.0.0.1:${server.address().port}/${slug}.html`, { waitUntil: "load" });
await page.waitForTimeout(Number(opt("--wait", 1500)));
const scrollTo = opt("--scroll", "");
if (scrollTo) await page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView({ block: "start" }), scrollTo === "digest" ? "#kesif-defteri" : scrollTo);
await page.waitForTimeout(300);
const out = opt("--out", join(process.env.SHOT_DIR || ROOT, `${slug}-${theme}.png`));
await page.screenshot({ path: out, fullPage: flag("--full") });
console.log(out);
await browser.close();
server.close();
