#!/usr/bin/env node
/**
 * Açelya — mobil sayfa kaydırma denetimi
 * Her sayfayı telefon gibi açar (dokunmatik, isMobile) ve gerçek bir parmak kaydırma hareketi
 * (CDP Input.synthesizeScrollGesture, touch) uygular:
 *   1) sayfanın ortasından,
 *   2) görünürdeki her büyük tuvalin/SVG'nin ve kaydırıcının üstünden.
 * Hareketten sonra window.scrollY değişmediyse o nokta "kaydırmayı yutuyor" sayılır.
 * Ayrıca html/body overflow:hidden ve kalıcı touch-action:none gibi engelleri raporlar.
 * Kullanım: node scripts/audit-scroll.mjs [--width 375] [--height 740] [--only a,b] [--jobs 4] [--tabs]
 */
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, extname, resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
function loadPlaywright() {
  for (const dir of [ROOT, ...(process.env.NODE_PATH || "").split(":").filter(Boolean), "/opt/node-tools"]) {
    try { return createRequire(join(dir, "package.json"))("playwright"); } catch (_) {}
  }
  return createRequire(import.meta.url)("playwright");
}
const { chromium } = loadPlaywright();
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const W = Number(opt("--width", "375")), H = Number(opt("--height", "740")), JOBS = Number(opt("--jobs", "4"));
const TABS = args.includes("--tabs");
const ONLY = opt("--only", "").split(",").map((s) => s.trim()).filter(Boolean);
const OUT = opt("--out", join(ROOT, "scripts", ".scroll-report.json"));

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
const pages = readdirSync(ROOT).filter((f) => f.endsWith(".html")).map((f) => f.slice(0, -5)).filter((s) => !ONLY.length || ONLY.includes(s)).sort();

async function swipe(cdp, x, y) {
  x = Math.max(4, Math.min(W - 4, x)); // yana taşan öğelerde nokta ekranın içinde kalsın
  // Parmak aşağıdan yukarı 260 px kayar → sayfa aşağı kaymalı.
  await cdp.send("Input.synthesizeScrollGesture", { x: Math.round(x), y: Math.round(y), yDistance: -260, gestureSourceType: "touch", speed: 1200, repeatCount: 1 });
}

async function probe(page, cdp) {
  const res = { blocked: [], ok: 0 };
  const info = await page.evaluate(() => {
    const de = document.documentElement, b = document.body;
    const csH = getComputedStyle(de), csB = getComputedStyle(b);
    const targets = [];
    const vh = innerHeight, vw = innerWidth;
    for (const el of document.querySelectorAll("canvas, svg, input[type=range], .stage, [data-drag]")) {
      const r = el.getBoundingClientRect();
      if (r.width < 60 || r.height < 24) continue;
      if (el.tagName === "svg" && el.closest("button, a, .app-topbar")) continue;
      targets.push({ id: el.id || el.tagName.toLowerCase() + (typeof el.className === "string" && el.className ? "." + el.className.split(" ")[0] : ""), docY: r.top + scrollY + Math.min(r.height / 2, 120), x: r.left + r.width / 2, ta: getComputedStyle(el).touchAction });
    }
    // İç kaydırma kutusu: içeriği ekrandan çok uzun olan ve kendi içinde kayan öğe
    // (ör. sabit yükseklikli bir kabuğun içindeki konu listesi). Telefonda bütün sayfa kaymalı.
    const innerScrollers = [];
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      if (!/(auto|scroll)/.test(cs.overflowY)) continue;
      if (el.scrollHeight > el.clientHeight + 40 && el.scrollHeight > vh * 1.2 && el.clientHeight > 0) {
        innerScrollers.push((el.id ? "#" + el.id : el.tagName.toLowerCase() + "." + String(el.className).split(" ")[0]) + ` (görünür ${Math.round(el.clientHeight)} / içerik ${Math.round(el.scrollHeight)} px)`);
      }
    }
    return { scrollable: de.scrollHeight > vh + 40, overflowHtml: csH.overflowY, overflowBody: csB.overflowY, targets: targets.slice(0, 12), vh, innerScrollers };
  });
  res.scrollable = info.scrollable;
  for (const s of info.innerScrollers) res.blocked.push(`asıl içerik iç kutuda kayıyor: ${s}`);
  if (!info.scrollable) return res;
  if (/hidden|clip/.test(info.overflowHtml) || /hidden|clip/.test(info.overflowBody)) res.blocked.push(`html/body overflow-y: ${info.overflowHtml}/${info.overflowBody}`);
  // 1) Sayfanın ortası
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(80);
  await swipe(cdp, 30, info.vh * 0.6);
  await page.waitForTimeout(250);
  const y0 = await page.evaluate(() => scrollY);
  if (y0 < 30) res.blocked.push("sayfa kenarından kaydırma çalışmıyor"); else res.ok++;
  // 2) Her hedefin üstünden
  for (const t of info.targets) {
    const startY = Math.max(0, t.docY - info.vh * 0.6);
    await page.evaluate((y) => scrollTo(0, y), startY);
    await page.waitForTimeout(80);
    const before = await page.evaluate(() => scrollY);
    const clientY = t.docY - before;
    if (clientY < 20 || clientY > info.vh - 20) continue;
    const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    if (maxScroll - before < 40) continue; // aşağıda kaydıracak yer yok
    // Parmak kasıtlı bir tutamağa (AcelyaTouch.guard hit testi doğru) denk geliyorsa, o nokta
    // sürükleme içindir; aynı öğede tutamak olmayan bir nokta aranır.
    const sx = await page.evaluate(({ x, y }) => {
      const grabs = (px) => {
        let el = document.elementFromPoint(px, y);
        while (el && !el.__acelyaHit) el = el.parentElement;
        try { return Boolean(el && el.__acelyaHit(px, y)); } catch (_) { return false; }
      };
      if (!grabs(x)) return x;
      for (const dx of [-60, 60, -110, 110, -150, 150]) {
        const px = x + dx;
        if (px > 8 && px < innerWidth - 8 && !grabs(px)) return px;
      }
      return null;
    }, { x: t.x, y: clientY });
    if (sx === null) { res.blocked.push(`${t.id} üstünde boş yer yok, her nokta tutamak`); continue; }
    await swipe(cdp, sx, clientY);
    await page.waitForTimeout(250);
    const after = await page.evaluate(() => scrollY);
    if (after - before < 30) res.blocked.push(`${t.id} üstünde kaydırma yutuluyor (touch-action: ${t.ta})`); else res.ok++;
  }
  return res;
}

const server = await serve();
const base = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch();
const results = {};
let idx = 0;
async function worker() {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36" });
  while (idx < pages.length) {
    const slug = pages[idx++];
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    const rec = { states: [] };
    try {
      await page.goto(base + slug + ".html", { waitUntil: "load", timeout: 30000 });
      await page.waitForTimeout(700);
      rec.states.push({ tab: "varsayılan", ...(await probe(page, cdp)) });
      if (TABS) {
        const n = await page.$$eval('[role="tab"]', (t) => t.length);
        for (let i = 1; i < Math.min(n, 8); i++) {
          await page.evaluate(() => scrollTo(0, 0));
          const tabs = await page.$$('[role="tab"]');
          try { await tabs[i].click({ timeout: 2000 }); await page.waitForTimeout(350); rec.states.push({ tab: "sekme " + (i + 1), ...(await probe(page, cdp)) }); } catch (_) {}
        }
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
const lines = [];
for (const [slug, rec] of Object.entries(results)) {
  const issues = [];
  if (rec.error) issues.push("hata: " + rec.error);
  for (const s of rec.states) for (const b of s.blocked) issues.push(`${s.tab}: ${b}`);
  if (issues.length) { bad++; lines.push(`✗ ${slug}\n    ${[...new Set(issues)].slice(0, 8).join("\n    ")}`); }
}
writeFileSync(OUT, JSON.stringify(results, null, 1));
console.log(lines.join("\n"));
console.log(`\n${Object.keys(results).length} sayfa · ${W}×${H} · kaydırması engellenen: ${bad} · rapor: ${OUT}`);
process.exitCode = bad ? 1 : 0;
