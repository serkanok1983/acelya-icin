#!/usr/bin/env node
// Öğrenme Yolları, Önşart ve ana menü grupları denetimi.
// Kullanım: node scripts/check-yollar.mjs [--browser]
import { readFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";

const root = fileURLToPath(new URL("..", import.meta.url));
let checks = 0;
const ok = (v, m) => { assert.ok(v, m); checks++; };
const eq = (a, b, m) => { assert.deepEqual(a, b, m); checks++; };

const sandbox = { window: {} };
vm.runInNewContext(readFileSync(path.join(root, "shared/catalog.js"), "utf8"), sandbox);
vm.runInNewContext(readFileSync(path.join(root, "shared/yollar.js"), "utf8"), sandbox);
const CAT = sandbox.window.ACELYA_CATALOG;
const D = sandbox.window.ACELYA_YOLLAR;

/* ── Veri ── */
const onsartIds = new Set(D.onsart.map((o) => o.id));
eq(onsartIds.size, D.onsart.length, "önşart kimlikleri tekil");
eq(new Set(D.yollar.map((y) => y.id)).size, D.yollar.length, "yol kimlikleri tekil");
ok(D.onsart.length >= 8 && D.yollar.length >= 11, "en az 8 önşart dizisi ve 11 yol");
for (const id of ["uygulamali-matematik", "teorik-matematik", "temel-fizik", "temel-kimya", "dil-ve-yazi"]) ok(onsartIds.has(id), `önşart dizisi var: ${id}`);
for (const id of ["bilgisayar-muhendisi", "elektrik-elektronik-muhendisi", "genetik-muhendisi", "endustri-muhendisi", "hekim", "mimar", "hukukcu"]) ok(D.yollar.some((y) => y.id === id), `yol var: ${id}`);
const usedPlanned = new Set();
for (const t of [...D.onsart, ...D.yollar]) {
  ok(t.title && t.summary && t.icon && t.stages.length >= 2, `${t.id}: başlık, özet, simge, en az iki basamak`);
  const seen = new Set();
  for (const s of t.stages) {
    ok(s.title && s.items.length >= 1, `${t.id}: basamak dolu`);
    for (const slug of s.items) {
      ok(!seen.has(slug), `${t.id}: ${slug} yol içinde bir kez`);
      seen.add(slug);
      const real = existsSync(path.join(root, `${slug}.html`));
      if (real) ok(CAT[slug], `${t.id}: ${slug} katalogda (defteri var)`);
      else { ok(D.planned[slug], `${t.id}: ${slug} ne sayfa ne planlı`); usedPlanned.add(slug); }
    }
  }
  for (const id of t.onsart || []) ok(onsartIds.has(id), `${t.id}: önşart ${id} tanımlı`);
}
for (const slug of Object.keys(D.planned)) {
  if (existsSync(path.join(root, `${slug}.html`))) continue; // yazıldı: artık bağlantı olarak görünür
  ok(usedPlanned.has(slug), `planlı ders bir yolda kullanılıyor: ${slug}`);
}

/* ── Ana menü ── */
const idx = readFileSync(path.join(root, "index.html"), "utf8");
const a = idx.indexOf("const MENU = [");
const MENU = vm.runInNewContext(idx.slice(a + 13, idx.indexOf("];\n", a) + 1));
ok(MENU.length >= 8 && MENU.length <= 10, `menü 8–10 grup (${MENU.length})`);
const total = MENU.reduce((n, c) => n + c.items.length, 0);
const sizes = MENU.map((c) => c.items.length);
ok(Math.min(...sizes) >= 10, `en küçük grup en az 10 ders (${Math.min(...sizes)})`);
ok(Math.max(...sizes) <= Math.ceil(total * 0.22), `en büyük grup toplamın %22'sini aşmaz (${Math.max(...sizes)}/${total})`);
const hrefs = MENU.flatMap((c) => c.items.map((i) => i.href));
eq(new Set(hrefs).size, hrefs.length, "menüde her ders bir kez");
for (const c of MENU) {
  ok(c.question && c.question.endsWith("?"), `${c.title}: açılış sorusu`);
  // Ara başlıklar ardışık blok olmalı (aynı ara başlık iki yerde açılmasın).
  const order = [];
  for (const it of c.items) if (order[order.length - 1] !== (it.sub || "")) order.push(it.sub || "");
  eq(new Set(order).size, order.length, `${c.title}: ara başlıklar ardışık`);
  if (c.items.length > 20) ok(c.items.every((i) => i.sub), `${c.title}: büyük grupta her dersin ara başlığı var`);
}
for (const slug of Object.keys(CAT)) ok(hrefs.includes(`${slug}.html`), `menüde: ${slug}`);
ok(!existsSync(path.join(root, "bilim-atlasi.html")), "Bilim Atlası kaldırıldı");
ok(!/bilim-atlasi|STEM Omurgas/.test(idx), "ana sayfada atlas ve omurga yok");
ok(/href="ogrenme-yollari\.html"/.test(idx) && /href="onsart\.html"/.test(idx), "ana sayfada iki rehber kartı");

console.log(`yollar veri: ${checks} kontrol PASS · ${D.yollar.length} yol, ${D.onsart.length} önşart dizisi, ${Object.keys(D.planned).filter((s) => !existsSync(path.join(root, `${s}.html`))).length} ders hazırlanıyor · menü ${sizes.join("/")}`);

/* ── Tarayıcı ── */
if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".m4a": "audio/mp4" };
  const server = createServer((req, res) => {
    const file = path.join(root, decodeURIComponent(new URL(req.url, "http://l").pathname));
    if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) { res.writeHead(404).end(); return; }
    res.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" });
    res.end(readFileSync(file));
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const errors = [];
  try {
    for (const width of [1280, 375]) {
      const ctx = await browser.newContext({ viewport: { width, height: 800 }, serviceWorkers: "block" });
      const page = await ctx.newPage();
      page.on("pageerror", (e) => errors.push(e.message));

      await page.goto(`${base}/index.html`);
      eq(await page.locator(".menu-section").count(), MENU.length, `${width}: ana sayfada ${MENU.length} bölüm`);
      ok((await page.locator(".sub-head").count()) >= 15, `${width}: ara başlıklar görünüyor`);
      eq(await page.locator(".guide-card").count(), 2, `${width}: iki rehber kartı`);
      await page.fill("#searchInput", "türev");
      eq(await page.locator(".sub-head").count(), 0, `${width}: aramada ara başlık yok`);
      ok((await page.locator('.menu-card[href="turev.html"]').count()) === 1, `${width}: arama türevi buluyor`);

      await page.goto(`${base}/onsart.html#temel-fizik`);
      eq(await page.locator("details.yol").count(), D.onsart.length, `${width}: önşart dizileri çizildi`);
      ok(await page.locator("details#temel-fizik").evaluate((d) => d.open), `${width}: adresteki dizi açık`);
      ok((await page.locator('#temel-fizik a[href="hareket-ve-grafikler.html"]').count()) === 1, `${width}: mekanik rotası Temel Fizik'te`);
      ok((await page.locator("#uygulamali-matematik .is-planned").count()) >= 1 || existsSync(path.join(root, "aritmetik-ve-sayilar.html")), `${width}: hazırlanıyor dersleri sönük`);

      await page.goto(`${base}/ogrenme-yollari.html#hekim`);
      eq(await page.locator("details.yol").count(), D.yollar.length, `${width}: yollar çizildi`);
      ok(await page.locator("details#hekim").evaluate((d) => d.open), `${width}: hekim yolu açık`);
      ok((await page.locator('#hekim a.yol-chip[href="onsart.html#temel-biyoloji"]').count()) === 1, `${width}: yoldan önşarta bağlantı`);
      const box = page.locator('#hekim input[data-done="anatomi-ve-fizyoloji"]');
      await box.check();
      await page.reload();
      ok(await page.locator('#hekim input[data-done="anatomi-ve-fizyoloji"]').isChecked(), `${width}: tamamlandı işareti kalıcı`);
      ok(await page.locator('#psikolog input[data-done="anatomi-ve-fizyoloji"]').isChecked(), `${width}: aynı ders öteki yolda da işaretli`);
      const sw = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      ok(sw <= 1, `${width}: yatay taşma yok (${sw})`);
      await ctx.close();
    }
    // Depolama kapalıyken de çalışır.
    const ctx = await browser.newContext({ serviceWorkers: "block" });
    await ctx.addInitScript(() => { Object.defineProperty(window, "localStorage", { get() { throw new Error("kapalı"); } }); });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(`${base}/ogrenme-yollari.html#mimar`);
    const b = page.locator('#mimar input[data-done="statik"]');
    await b.check();
    ok(await page.locator('#mimar input[data-done="statik"]').isChecked(), "depolama kapalıyken işaret sekmede kalır");
    await ctx.close();
    eq(errors, [], "sayfa hatası yok");
  } finally {
    await browser.close();
    server.close();
  }
  console.log(`yollar tarayıcı: toplam ${checks} kontrol PASS`);
}
