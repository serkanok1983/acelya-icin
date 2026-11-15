#!/usr/bin/env node
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const slugs = [
  "psikoloji-ekolleri-ve-tarihi",
  "freud-ve-klasik-psikanaliz",
  "psikanalizden-ayrilanlar",
  "ego-psikolojisi-ve-nesne-iliskileri",
  "lacan-fromm-ve-horney",
  "davraniscilik-ve-ogrenme-kuramlari",
  "humanistik-ve-varoluscu-psikoloji",
  "bilissel-psikoloji-ve-terapi",
  "kisilik-kuramlari",
  "psikopatoloji-ve-psikoterapi-ekolleri",
  "motivasyon-ve-duygu-kuramlari",
];

let checks = 0;
function eq(actual, expected, message) {
  assert.deepEqual(actual, expected, message);
  checks++;
}
function near(actual, expected, message) {
  assert.ok(Math.abs(actual - expected) <= 1e-10, message);
  checks++;
}
function model(slug) {
  const html = readFileSync(resolve(root, `${slug}.html`), "utf8");
  const body = html.match(/\/\* KERNEL-BEGIN \*\/([\s\S]+?)\/\* KERNEL-END \*\//u)[1];
  return vm.runInNewContext(`(() => {${body}})()`);
}

for (const slug of slugs) {
  const m = model(slug);
  eq(Object.isFrozen(m), true, `${slug} model nesnesi değiştirilemez`);
  const first = readFileSync(resolve(root, `${slug}.html`), "utf8").match(/<select name="lens"[^>]*><option value="([^"]+)"/)[1];
  const result = m.read("karsilastirma", first);
  eq(result.length, 3, `${slug} her yaklaşım üç sonuç verir`);
  const original = result[0];
  result[0] = "";
  eq(m.read("karsilastirma", first)[0], original, `${slug} okuma model verisini korur`);
}

const learning = model("davraniscilik-ve-ogrenme-kuramlari").learningCurve;
eq([...learning(0.5, 2, 1)], [0, 0.5, 0.75, 0.375], "öğrenme ve tek sönme adımı");
eq([...learning(1, 2, 2)], [0, 1, 1, 0, 0], "tam güncelleme sınırı");
const curve = learning(0.25, 8, 6);
near(curve[8], 1 - 0.75 ** 8, "sekiz eşleşme");
near(curve.at(-1), (1 - 0.75 ** 8) * 0.75 ** 6, "altı sönme adımı");

const stroop = model("bilissel-psikoloji-ve-terapi").stroop;
eq([...stroop(90, 20, 40, "congruent")], [580, 650, 70], "önce uyumlu");
eq([...stroop(90, 20, 40, "incongruent")], [540, 690, 150], "önce uyumsuz");
eq([...stroop(90, 20, 120, "balanced")], [520, 630, 110], "karşı dengeleme");
eq([...stroop(0, 0, 120, "congruent")], [600, 480, -120], "yalnız sıra etkisi");

const ace = model("kisilik-kuramlari").ace;
const twins = ace(0.58, 0.34);
[0.48, 0.10, 0.42].forEach((value, i) => near(twins.values[i], value, `ACE bileşeni ${i + 1}`));
eq(twins.compatible, true, "uyumlu korelasyonlar");
eq(ace(0.58, 0.15).compatible, false, "negatif paylaşılan çevre");
eq(ace(0.15, 0.58).compatible, false, "negatif genetik bileşen");
eq([...ace(0, 0).values], [0, 0, 1], "sıfır korelasyon sınırı");

const trial = model("psikopatoloji-ve-psikoterapi-ekolleri").trial;
eq([...trial("wait", 10)], [9, 2, 7, 0.7], "bekleme listesi");
eq([...trial("usual", 5)], [9, 5, 4, 0.8], "olağan hizmet");
eq([...trial("active", 5)], [9, 6, 3, 0.6], "etkin karşılaştırma");

const continuation = model("motivasyon-ve-duygu-kuramlari").continuation;
eq([...continuation(13, 8)], [65, 40, 25], "yüzde puan farkı");
eq([...continuation(13, 13)], [65, 65, 0], "eşit gruplar");
eq([...continuation(0, 20)], [0, 100, -100], "bütün aralığın sınırı");
console.log(`U6 model: ${checks} kontrol PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };
  const server = createServer((req, res) => {
    const file = resolve(root, "." + new URL(req.url, "http://localhost").pathname);
    try {
      if (!file.startsWith(root + "/")) throw new Error("Geçersiz yol");
      const data = readFileSync(file);
      res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
      res.end(data);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
  try {
    const browser = await chromium.launch();
    try {
      const base = `http://127.0.0.1:${server.address().port}`;
      for (const [width, theme] of [[390, "light"], [1280, "dark"]]) {
        const context = await browser.newContext({ viewport: { width, height: 862 }, serviceWorkers: "block", reducedMotion: "reduce" });
        await context.addInitScript((saved) => localStorage.setItem("acelya-theme", saved), theme);
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        for (const slug of slugs) {
          const id = `${width} ${slug}`;
          eq((await page.goto(`${base}/${slug}.html`)).status(), 200, `${id} HTTP 200`);
          const panel = page.locator("#karsilastirma");
          const lens = panel.locator("select");
          const outputs = panel.locator("[data-result]");
          const initial = await outputs.allTextContents();
          eq(initial.length, 3, `${id} üç okuma alanı`);
          assert.ok(initial.every((value) => value.length > 15), `${id} ilk sonuçlar çizildi`);
          checks++;
          const seen = new Set();
          for (const option of await lens.locator("option").evaluateAll((nodes) => nodes.map((node) => node.value))) {
            await lens.selectOption(option);
            const contents = await outputs.allTextContents();
            assert.ok(contents.every((value) => value.length > 15), `${id} ${option} dolu`);
            checks++;
            seen.add(contents.join("\n"));
          }
          eq(seen.size, await lens.locator("option").count(), `${id} her yaklaşım farklı`);
          await panel.getByRole("button", { name: "Başlangıç değerleri" }).click();
          await page.waitForFunction((text) => document.querySelector("#karsilastirma [data-result]").textContent === text, initial[0]);
          eq(await outputs.allTextContents(), initial, `${id} sıfırlama`);
          await page.locator(".digest-idea-label").waitFor();
          eq(await page.locator(".digest-q").count(), 3, `${id} defter soruları`);
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth <= 1), `${id} yatay taşma yok`);
          checks++;

          if (slug === "davraniscilik-ve-ogrenme-kuramlari") {
            await page.locator("#eslesme-rate").fill("0.5");
            await page.locator("#eslesme-paired").fill("2");
            await page.locator("#eslesme-unpaired").fill("1");
            eq(await page.locator("#eslesme [data-result]").allTextContents(), ["0,75", "0,375"], `${id} iki eşleşme ve sönme`);
            await page.locator("#eslesme summary").click();
            eq(await page.locator("#eslesme tbody tr").count(), 4, `${id} başlangıç ve üç adım`);
            eq(await page.locator("#eslesme tbody tr").last().locator("td").last().textContent(), "0,375", `${id} tablo eğriyle uyumlu`);
          }
          if (slug === "bilissel-psikoloji-ve-terapi") {
            await page.locator("#stroop-order").selectOption("incongruent");
            eq(await page.locator("#stroop [data-result]").last().textContent(), "150 ms", `${id} sıra koşulu`);
          }
          if (slug === "kisilik-kuramlari") {
            await page.locator("#ikiz-dz").fill("0.15");
            eq(await page.locator("#ikiz [data-result]").last().textContent(), "Negatif bileşen · varsayımları incele", `${id} uyumsuz korelasyon`);
          }
          if (slug === "psikopatoloji-ve-psikoterapi-ekolleri") {
            await page.locator("#deneme-control").selectOption("active");
            await page.locator("#deneme-sd").fill("5");
            eq(await page.locator("#deneme [data-result]").last().textContent(), "0,6", `${id} etkin karşılaştırma`);
          }
          if (slug === "motivasyon-ve-duygu-kuramlari") {
            await page.locator("#secim-assigned").fill("14");
            eq(await page.locator("#secim [data-result]").last().textContent(), "−5 yüzde puan", `${id} fark işareti`);
          }
        }
        await page.goto(`${base}/ogrenme-yollari.html#psikolog`);
        for (const slug of slugs) {
          eq(await page.locator(`#psikolog a[href="${slug}.html"]`).count(), 1, `${width} psikolog yolunda ${slug}`);
        }
        eq(errors, [], `${width} sayfa hatası yok`);
        await context.close();
      }
    } finally {
      await browser.close();
    }
  } finally {
    server.close();
  }
  console.log(`U6 tarayıcı: toplam ${checks} kontrol PASS (390 açık, 1280 koyu)`);
}
