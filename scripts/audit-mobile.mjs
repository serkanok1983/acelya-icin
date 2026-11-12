#!/usr/bin/env node
/**
 * Açelya — mobil uygunluk taraması
 * Her sayfayı gerçek bir telefon gibi (dokunmatik, isMobile, DPR 3) açar ve her sekmede ölçer:
 *   - yatay taşma (belge ve görünür öğeler; overflow-x:auto kapsayıcılar hariç)
 *   - küçük dokunma hedefleri (düğme, bağlantı, giriş, sekme: 32 px altı)
 *   - küçük yazı (11 px altı görünür metin)
 *   - görünüm alanından geniş tuval
 *   - viewport meta etiketi
 * Kullanım: node scripts/audit-mobile.mjs [--width 360] [--height 740] [--only a,b] [--out rapor.json] [--jobs 6]
 */
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, extname, resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
function loadPlaywright() {
  const candidates = [ROOT, ...(process.env.NODE_PATH || "").split(":").filter(Boolean), "/opt/node-tools"];
  for (const dir of candidates) {
    try { return createRequire(join(dir, "package.json"))("playwright"); } catch (_) {}
  }
  return createRequire(import.meta.url)("playwright");
}
const { chromium } = loadPlaywright();
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const W = Number(opt("--width", "360"));
const H = Number(opt("--height", "740"));
const JOBS = Number(opt("--jobs", "6"));
const OUT = opt("--out", join(ROOT, "scripts", ".mobile-report.json"));
const ONLY = opt("--only", "").split(",").map((s) => s.trim()).filter(Boolean);

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".m4a": "audio/mp4", ".webmanifest": "application/manifest+json" };
function serve() {
  return new Promise((done) => {
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
}

const pages = readdirSync(ROOT).filter((f) => f.endsWith(".html")).map((f) => f.slice(0, -5))
  .filter((s) => !ONLY.length || ONLY.includes(s)).sort();

// Sayfa içinde çalışan ölçüm
function measure() {
  const vw = document.documentElement.clientWidth;
  const out = { docOverflow: Math.max(0, document.documentElement.scrollWidth - vw), wide: [], small: [], tinyText: 0, tinySamples: [], wideCanvas: [] };
  const visible = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none"; };
  const inScroller = (el) => { for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const ox = getComputedStyle(p).overflowX; if (ox === "auto" || ox === "scroll" || ox === "hidden") return true; } return false; };
  const label = (el) => (el.id ? "#" + el.id : el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : ""));
  for (const el of document.querySelectorAll("body *")) {
    if (!visible(el)) continue;
    const r = el.getBoundingClientRect();
    if ((r.right > vw + 1 || r.left < -1) && !inScroller(el) && getComputedStyle(el).position !== "fixed") {
      if (out.wide.length < 8) out.wide.push(label(el) + " " + Math.round(r.left) + "→" + Math.round(r.right));
    }
    if (el.tagName === "CANVAS" && r.width > vw + 1 && !inScroller(el)) out.wideCanvas.push(label(el));
  }
  const tappables = document.querySelectorAll('button, a[href], input:not([type=hidden]), select, textarea, [role="tab"], summary, label[for]');
  for (const el of tappables) {
    if (!visible(el)) continue;
    const r = el.getBoundingClientRect();
    const type = el.getAttribute("type");
    const isInlineLink = el.tagName === "A" && getComputedStyle(el).display === "inline";
    if (isInlineLink) continue; // metin içi bağlantılar ayrı kural
    if (el.tagName === "LABEL") continue;
    // Onay kutusu ve seçenek düğmesi: bir etikete bağlıysa etiket de dokunma alanıdır.
    if ((type === "checkbox" || type === "radio") && (el.closest("label") || (el.id && document.querySelector(`label[for="${el.id}"]`)))) {
      const r2 = el.getBoundingClientRect();
      if (r2.width >= 13 && r2.height >= 13) continue;
    }
    const minH = type === "range" ? 20 : 32;
    if (r.height < minH || r.width < 32) { if (out.small.length < 10) out.small.push(label(el) + " " + Math.round(r.width) + "×" + Math.round(r.height)); out.smallCount = (out.smallCount || 0) + 1; }
  }
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    if (!n.textContent.trim()) continue;
    const el = n.parentElement;
    if (!el || !visible(el)) continue;
    if (el.closest("sub, sup")) continue; // alt/üst simgeler doğal olarak küçük
    if (el.closest("svg")) continue; // SVG yazısı SVG ile ölçeklenir; CSS boyutu ekrandaki boyutu vermez
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < 11) { out.tinyText++; if (out.tinySamples.length < 5) out.tinySamples.push(label(el) + " " + fs + "px"); }
  }
  out.viewportMeta = !!document.querySelector('meta[name="viewport"]');
  return out;
}

const server = await serve();
const base = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch();
const results = {};
let idx = 0;
async function worker() {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, colorScheme: "light", userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36" });
  while (idx < pages.length) {
    const slug = pages[idx++];
    const page = await ctx.newPage();
    const rec = { states: [] };
    try {
      await page.goto(base + slug + ".html", { waitUntil: "load", timeout: 30000 });
      await page.waitForTimeout(600);
      rec.states.push({ tab: "varsayılan", ...(await page.evaluate(measure)) });
      const tabs = await page.$$('[role="tab"]');
      for (let i = 1; i < Math.min(tabs.length, 8); i++) {
        try { await tabs[i].click({ timeout: 2000 }); await page.waitForTimeout(350); rec.states.push({ tab: "sekme " + (i + 1), ...(await page.evaluate(measure)) }); } catch (_) {}
      }
    } catch (e) { rec.error = String(e).slice(0, 200); }
    await page.close();
    results[slug] = rec;
  }
  await ctx.close();
}
await Promise.all(Array.from({ length: JOBS }, worker));
await browser.close();
server.close();

let bad = 0;
const summary = [];
for (const [slug, rec] of Object.entries(results)) {
  const issues = [];
  if (rec.error) issues.push("hata: " + rec.error);
  for (const s of rec.states || []) {
    if (!s.viewportMeta) issues.push("viewport meta yok");
    if (s.docOverflow > 0) issues.push(`${s.tab}: belge ${s.docOverflow}px taşıyor`);
    if (s.wide.length) issues.push(`${s.tab}: geniş öğe ${s.wide.join(", ")}`);
    if (s.wideCanvas.length) issues.push(`${s.tab}: geniş tuval ${s.wideCanvas.join(", ")}`);
    if (s.smallCount) issues.push(`${s.tab}: küçük dokunma hedefi ×${s.smallCount} (${s.small.slice(0, 4).join(", ")})`);
    if (s.tinyText) issues.push(`${s.tab}: 11px altı metin ×${s.tinyText} (${s.tinySamples.slice(0, 3).join(", ")})`);
  }
  if (issues.length) { bad++; summary.push(`✗ ${slug}\n    ${[...new Set(issues)].slice(0, 8).join("\n    ")}`); }
}
writeFileSync(OUT, JSON.stringify(results, null, 1));
console.log(summary.join("\n"));
console.log(`\n${Object.keys(results).length} sayfa · ${W}×${H} · sorunlu: ${bad} · rapor: ${OUT}`);
process.exitCode = bad ? 1 : 0;
