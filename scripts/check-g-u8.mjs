#!/usr/bin/env node
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const slugs = [
  "toplum-sozlesmesi-ve-siyaset-felsefesi", "ibn-haldun-ve-tarih-felsefesi",
  "klasik-iktisat", "marx-ve-marksist-gelenek", "sosyolojinin-kuruculari",
  "neoklasik-iktisat-keynes-ve-karsitlari", "frankfurt-okulu-ve-habermas",
  "yirminci-yuzyil-sosyal-kurami", "antropoloji-kuramlari", "modern-siyaset-kurami",
];
let checks = 0;
function eq(actual, expected, message) {
  assert.deepEqual(actual, expected, message);
  checks++;
}
function ok(value, message) {
  assert.ok(value, message);
  checks++;
}
function near(actual, expected, message) {
  ok(Math.abs(actual - expected) < 1e-10, `${message} · ${actual} ≈ ${expected}`);
}
function model(slug) {
  const html = readFileSync(resolve(root, `${slug}.html`), "utf8");
  const code = html.match(/\/\* KERNEL-BEGIN \*\/([\s\S]+?)\/\* KERNEL-END \*\//u)[1];
  return {
    api: vm.runInNewContext(`(() => {${code}})()`),
    keys: [...html.matchAll(/<option value="([^"]+)">/gu)].map(([, key]) => key),
  };
}

const lessons = new Map(slugs.map((slug) => [slug, model(slug)]));
for (const [slug, { api, keys }] of lessons) {
  ok(Object.isFrozen(api), `${slug} salt okunur model`);
  eq(new Set(keys).size, keys.length, `${slug} benzersiz sav seçenekleri`);
  for (const key of keys) {
    const fields = api.read(key);
    eq(fields.length, 5, `${slug}/${key} beş açıklama alanı`);
    ok(fields.every((field) => field.length > 15), `${slug}/${key} açıklamalar dolu`);
    const first = fields[0];
    fields[0] = "";
    eq(api.read(key)[0], first, `${slug}/${key} özgün kayıt korunuyor`);
  }
  eq(api.read("__proto__"), null, `${slug} geçersiz sav varsayılana döner`);
}

const trade = lessons.get("klasik-iktisat").api.trade;
eq(Object.values(trade(2, 4, 6, 6)), [0.5, 1, -1], "A kumaşta karşılaştırmalı üstün");
eq(Object.values(trade(2, 4, 3, 6)), [0.5, 0.5, 0], "göreli maliyet eşitliği");
near(trade(2, 4, 1, 6).b, 1 / 6, "B’nin vazgeçtiği tahıl");
eq(trade(2, 4, 1, 6).comparison, 1, "B kumaşta karşılaştırmalı üstün");
eq(trade(1, 12, 12, 1).comparison, -1, "oranların uç değerleri");

const workday = lessons.get("marx-ve-marksist-gelenek").api.workday;
eq([...workday(4, 4)], [8, 100, 50], "eşit gerekli ve artı emek, ayrı paydalar");
eq([...workday(6, 0)], [6, 0, 0], "artı emek yok");
near(workday(6, 3)[2], 100 / 3, "iş günü içinde artı emeğin payı");
near(workday(1, 10)[1], 1000, "artı-değer oranı yüzü aşabilir");

const multiplier = lessons.get("neoklasik-iktisat-keynes-ve-karsitlari").api.multiplier;
eq([...multiplier(20, 60)], [20, 12, 2.5, 50], "başlangıç harcama dizisi");
eq([...multiplier(-20, 50)], [-20, -10, 2, -40], "daralma örneği");
eq([...multiplier(20, 0)], [20, 0, 1, 20], "yeniden harcama yok");
near(multiplier(100, 90)[3], 1000, "izin verilen en büyük çarpan");

const directory = readFileSync(resolve(root, "dusunurler-dizini.html"), "utf8");
const anchors = [...directory.matchAll(/href="([a-z-]+)\.html\?sav=([a-z-]+)#argumanlar"/gu)];
const u8Anchors = anchors.filter(([, slug]) => lessons.has(slug));
eq(anchors.length, 108, "56 eski ve 52 yeni ders bağlantısı");
eq(u8Anchors.length, 52, "U8 düşünür–ders bağlantısı sayısı");
for (const [, slug, key] of u8Anchors) {
  ok(lessons.get(slug).keys.includes(key), `dizin bağlantısı geçerli · ${slug}/${key}`);
}
eq(new Set(u8Anchors.map(([, slug]) => slug)).size, slugs.length, "dizin 10 yeni dersi kapsıyor");

console.log(`U8 veri ve modeller: ${checks} kontrol PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };
  const server = createServer((request, response) => {
    const path = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    try {
      const file = resolve(root, "." + path);
      if (!file.startsWith(root + "/")) throw new Error("Geçersiz yol");
      const contents = readFileSync(file);
      response.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
      response.end(contents);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
  try {
    const browser = await chromium.launch();
    const base = `http://127.0.0.1:${server.address().port}`;
    try {
      for (const [width, theme] of [[390, "light"], [1280, "dark"]]) {
        const context = await browser.newContext({
          viewport: { width, height: 840 }, reducedMotion: "reduce", serviceWorkers: "block",
        });
        await context.addInitScript((theme) => localStorage.setItem("acelya-theme", theme), theme);
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        const values = (id) => page.locator(`#${id} [data-result]`).allTextContents();
        for (const [slug, { keys }] of lessons) {
          const id = `${width} ${slug}`;
          eq((await page.goto(`${base}/${slug}.html`)).status(), 200, `${id} HTTP`);
          const select = page.getByLabel("Sav veya yaklaşım");
          const details = page.locator(".history-objection");
          ok(!(await details.locator("dl").isVisible()), `${id} ilk açılışta itiraz kapalı`);
          await details.locator("summary").press("Enter");
          ok(await details.locator("dl").isVisible(), `${id} itiraz klavyeyle açılır`);
          const initial = await values("argumanlar");
          const seen = new Set();
          for (const key of keys) {
            await select.selectOption(key);
            const texts = await values("argumanlar");
            ok(texts.length === 5 && texts.every((value) => value.length > 15), `${id}/${key} bütün alanlar görünür`);
            seen.add(texts.join("\n"));
          }
          eq(seen.size, keys.length, `${id} farklı savlar farklı gerekçeler içeriyor`);
          await page.getByRole("button", { name: "Başlangıç seçimi" }).click();
          await page.waitForFunction((first) => document.querySelector("#argumanlar [data-result]").textContent === first, initial[0]);
          eq(await values("argumanlar"), initial, `${id} sıfırlama`);
          await page.locator("#kesif-defteri").waitFor();
          eq(await page.locator(".digest-q").count(), 3, `${id} üç Keşif Defteri sorusu`);
          ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id} yatay taşma yok`);

          if (slug === "klasik-iktisat") {
            eq(await values("firsat-maliyeti"), ["0,5 tahıl", "1 tahıl", "A kumaşta · B tahılda", "0,5 tahıl ile 1 tahıl arası"], `${id} başlangıç`);
            await page.getByLabel("B · bir kumaş").fill("3");
            eq((await values("firsat-maliyeti")).at(-1), "Karşılıklı kazanç aralığı yok", `${id} eşit maliyet`);
            await page.getByLabel("B · bir kumaş").fill("1");
            eq((await values("firsat-maliyeti"))[2], "B kumaşta · A tahılda", `${id} üstünlük değişti`);
          }
          if (slug === "marx-ve-marksist-gelenek") {
            eq(await values("is-gunu"), ["9 saat", "% 50", "% 33,33"], `${id} ayrı paydalar`);
            await page.getByLabel("Artı emek").fill("0");
            eq(await values("is-gunu"), ["6 saat", "% 0", "% 0"], `${id} sıfır artı emek`);
          }
          if (slug === "neoklasik-iktisat-keynes-ve-karsitlari") {
            eq(await values("harcama-carpani"), ["20 birim", "12 birim", "2,5 kat", "50 birim"], `${id} başlangıç`);
            await page.getByLabel("İlk yatırım değişimi").fill("-20");
            await page.getByLabel("Yeniden harcama payı").fill("50");
            eq(await values("harcama-carpani"), ["−20 birim", "−10 birim", "2 kat", "−40 birim"], `${id} daralma`);
          }
        }

        await page.goto(`${base}/dusunurler-dizini.html`);
        const cards = page.locator(".history-person:visible");
        const search = page.getByRole("searchbox", { name: "Düşünür veya kavram" });
        const period = page.getByLabel("Dersin dönemi");
        const visibleNames = () => cards.locator("h2").allTextContents();
        const visibleLinks = () => cards.locator("a:visible").evaluateAll((nodes) => nodes.map((a) => a.getAttribute("href")));
        eq(await cards.count(), 104, `${width} 104 benzersiz düşünür`);
        for (const [query, name] of [
          ["locke", "John Locke"], ["hegel", "Georg Wilhelm Friedrich Hegel"],
          ["john stuart mill", "John Stuart Mill"], ["levi strauss", "Claude Lévi-Strauss"],
        ]) {
          await search.fill(query);
          eq(await visibleNames(), [name], `${width} ${name} tek kartta`);
          eq((await visibleLinks()).length, 2, `${width} ${name} eski ve yeni dersleri açar`);
        }

        await search.fill("LOCKE RIZA");
        eq(await visibleLinks(), ["toplum-sozlesmesi-ve-siyaset-felsefesi.html?sav=locke#argumanlar"], `${width} rıza yalnız ilgili derste`);
        await search.fill("locke duyum rıza");
        eq(await cards.count(), 0, `${width} ayrı derslerdeki kavramlar birleşmez`);

        await search.fill("IBN HALDUN");
        await period.selectOption("modern");
        eq(await cards.count(), 0, `${width} tarihsel kişi doğru dönemle sınırlı`);
        await period.selectOption("medieval");
        eq(await visibleNames(), ["İbn Haldun"], `${width} eski yazım ve Orta Çağ birlikte çalışır`);
        eq(await visibleLinks(), ["ibn-haldun-ve-tarih-felsefesi.html?sav=haldun#argumanlar"], `${width} İbn Haldun doğru sav`);

        await page.getByRole("button", { name: "Temizle" }).click();
        await page.waitForFunction(() => document.querySelectorAll(".history-person:not([hidden])").length === 104);
        await search.fill("HABERMAS");
        eq(await visibleNames(), ["Jürgen Habermas"], `${width} yeni düşünür bulunuyor`);
        await Promise.all([
          page.waitForURL("**/frankfurt-okulu-ve-habermas.html?sav=habermas#argumanlar"),
          cards.getByRole("link").click(),
        ]);
        eq(await page.getByLabel("Sav veya yaklaşım").inputValue(), "habermas", `${width} dizin savı seçerek açıyor`);
        eq(errors, [], `${width} yeni derslerde ve dizinde sayfa hatası yok`);
        await context.close();
      }
    } finally {
      await browser.close();
    }
  } finally {
    server.close();
  }
  console.log(`U8 tarayıcı: toplam ${checks} kontrol PASS (390 açık, 1280 koyu)`);
}
