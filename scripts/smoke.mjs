#!/usr/bin/env node
/**
 * Açelya — tarayıcı duman testi
 * Her sayfayı gerçek Chromium'da açar; JS hatalarını, konsol hatalarını ve
 * başarısız istekleri toplar. Çıktı: JSON rapor (stdout özet).
 *
 * Kullanım: node scripts/smoke.mjs [--out rapor.json] [--only slug1,slug2] [--digest]
 *   --digest : sayfada .digest bölümünün yüklenip görünür olduğunu da denetler
 */
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, extname, resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
// Playwright yerel node_modules'ta yoksa global kurulumdan (NODE_PATH) çözülür.
const require = createRequire(import.meta.url);
function loadPlaywright() {
  const candidates = [ROOT, ...(process.env.NODE_PATH || "").split(":").filter(Boolean), "/opt/node-tools"];
  for (const dir of candidates) {
    try {
      return createRequire(join(dir, "package.json"))("playwright");
    } catch (_) {}
  }
  return require("playwright");
}
const { chromium } = loadPlaywright();
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
};
const OUT = opt("--out", join(ROOT, "scripts", ".smoke-report.json"));
const ONLY = opt("--only", "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const CHECK_DIGEST = flag("--digest");
const CONCURRENCY = Number(opt("--jobs", "6"));

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".m4a": "audio/mp4",
  ".webmanifest": "application/manifest+json",
};

function serve() {
  return new Promise((done) => {
    const server = createServer((req, res) => {
      let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
      if (p === "/") p = "/index.html";
      const file = join(ROOT, p);
      if (!file.startsWith(ROOT) || !existsSync(file) || statSync(file).isDirectory()) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
      res.end(readFileSync(file));
    });
    server.listen(0, "127.0.0.1", () => done(server));
  });
}

const pages = readdirSync(ROOT)
  .filter((f) => f.endsWith(".html"))
  .map((f) => f.replace(/\.html$/, ""))
  .filter((s) => !ONLY.length || ONLY.includes(s))
  .sort();

const server = await serve();
const base = `http://127.0.0.1:${server.address().port}`;
// Kurumsal/sandbox proxy varsa Chromium da onu kullansın (CDN kaynakları için).
const PROXY = process.env.HTTPS_PROXY || process.env.https_proxy || "";
// Not: Playwright'ın proxy seçeneği yerel adresleri de proxy'ye yollar; Chromium bayrakları
// ile yerel sunucu doğrudan, CDN'ler proxy üzerinden gider.
const browser = await chromium.launch(
  PROXY
    ? { args: [`--proxy-server=${PROXY}`, "--proxy-bypass-list=127.0.0.1;localhost;[::1]", "--ignore-certificate-errors"] }
    : {},
);
const context = await browser.newContext({
  viewport: { width: Number(opt("--width", "1280")), height: 860 },
  locale: "tr-TR",
  ignoreHTTPSErrors: Boolean(PROXY),
});
// Giriş kapısını geç: test oturumu
await context.addInitScript(() => {
  try {
    localStorage.setItem("acelya-user", "serkan");
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("acelya-sound-muted", "1");
  } catch (_) {}
});

const report = [];
let index = 0;

async function worker() {
  while (index < pages.length) {
    const slug = pages[index++];
    const entry = { slug, errors: [], consoleErrors: [], failedRequests: [], digest: null, scrollable: null };
    const page = await context.newPage();
    page.on("pageerror", (e) => entry.errors.push(String(e.message || e)));
    page.on("console", (m) => {
      if (m.type() === "error") entry.consoleErrors.push(m.text());
    });
    page.on("requestfailed", (r) => {
      entry.failedRequests.push(`${r.failure()?.errorText || "fail"} ${r.url()}`);
    });
    page.on("response", (r) => {
      if (r.status() >= 400) entry.failedRequests.push(`${r.status()} ${r.url()}`);
    });
    try {
      await page.goto(`${base}/${slug}.html`, { waitUntil: "load", timeout: 45000 });
      await page.waitForTimeout(1800);
      entry.title = await page.title();
      entry.scrollable = await page.evaluate(() => ({
        docH: document.documentElement.scrollHeight,
        winH: innerHeight,
        bodyOverflow: getComputedStyle(document.body).overflowY,
        htmlOverflow: getComputedStyle(document.documentElement).overflowY,
      }));
      if (CHECK_DIGEST) {
        entry.digest = await page.evaluate(async () => {
          const el = document.querySelector(".digest");
          if (!el) return { mounted: false };
          el.scrollIntoView({ block: "start" });
          await new Promise((r) => setTimeout(r, 200));
          const rect = el.getBoundingClientRect();
          return {
            mounted: true,
            top: Math.round(rect.top),
            height: Math.round(rect.height),
            visible: rect.height > 200 && rect.top < innerHeight && rect.bottom > 0,
            sections: el.querySelectorAll("section").length,
          };
        });
      }
    } catch (e) {
      entry.errors.push(`NAVIGATION: ${e.message}`);
    }
    await page.close();
    report.push(entry);
    process.stdout.write(`· ${slug}\n`);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));
await browser.close();
server.close();

report.sort((a, b) => a.slug.localeCompare(b.slug));

// Dış CDN erişimi olmayan ortamlarda (kısıtlı ağ) kütüphane yüklenemediği için
// çıkan "X is not defined" hataları sayfa hatası değildir; ayrı sayılır.
const isExternal = (u) => /^https?:\/\/(?!127\.0\.0\.1|localhost)/.test(u.replace(/^\S+\s+/, ""));
for (const r of report) {
  const cdnScriptFailed = r.failedRequests.some((f) => isExternal(f) && /\.js(\?|$)/.test(f));
  r.externalFailures = r.failedRequests.filter(isExternal);
  r.failedRequests = r.failedRequests.filter((f) => !isExternal(f));
  r.consoleErrors = r.consoleErrors.filter((m) => !/Failed to load resource/.test(m));
  const libError = (m) => /(THREE|Chart|echarts|MathJax|firebase|jsPDF|jspdf)\b.*not defined|Cannot read properties of (null|undefined)/.test(m);
  r.cdnBlocked = cdnScriptFailed ? r.errors.filter(libError) : [];
  if (cdnScriptFailed) r.errors = r.errors.filter((m) => !libError(m));
}
writeFileSync(OUT, JSON.stringify(report, null, 2));
const withErrors = report.filter((r) => r.errors.length || r.consoleErrors.length);
const withFailed = report.filter((r) => r.failedRequests.length);
const cdnBlocked = report.filter((r) => r.cdnBlocked.length);
console.log(`\n${report.length} sayfa · JS/konsol hatalı: ${withErrors.length} · yerel başarısız istek: ${withFailed.length} · CDN erişilemediği için atlanan: ${cdnBlocked.length}`);
for (const r of withErrors) console.log(`  ✗ ${r.slug}: ${r.errors.concat(r.consoleErrors).slice(0, 2).join(" | ").slice(0, 160)}`);
for (const r of withFailed) console.log(`  ⚠ ${r.slug}: ${r.failedRequests.slice(0, 2).join(" | ").slice(0, 160)}`);
if (CHECK_DIGEST) {
  const noDigest = report.filter((r) => !r.digest?.mounted);
  const hidden = report.filter((r) => r.digest?.mounted && !r.digest.visible);
  console.log(`digest yok: ${noDigest.length} ${noDigest.map((r) => r.slug).join(" ")}`);
  console.log(`digest görünmüyor: ${hidden.length} ${hidden.map((r) => r.slug).join(" ")}`);
}
console.log(`rapor: ${OUT}`);
process.exit(withErrors.length ? 1 : 0);
