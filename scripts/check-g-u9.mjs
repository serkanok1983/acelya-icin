#!/usr/bin/env node
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const literature = [
  "edebiyat-akimlari", "edebiyat-elestirisi-bicim-ve-gosterge", "edebiyat-elestirisi-okur-ve-toplum",
  "karakter-ve-karakter-psikolojisi", "anlatim-teknikleri", "edebiyatta-imge-ve-soz-sanatlari",
  "dram-ve-tiyatro", "turlerin-poetikasi", "siir-cozumleme", "metinlerarasilik-ve-uyarlama",
];
const psychology = [
  "gestalt-psikolojisi-ve-algi", "evrimsel-psikoloji-ve-karsilastirmali-yontem", "kulturel-ve-elestirel-psikoloji",
  "iliskisel-psikanaliz-ve-zihinsellestirme", "sistemik-psikoloji-ve-aile-yaklasimlari",
];
const directory = "psikoloji-ekolleri-dizini";
const html = (slug) => readFileSync(resolve(root, slug + ".html"), "utf8");
const lessons = new Map();
for (const slug of [...literature, ...psychology]) {
  const text = html(slug);
  const records = JSON.parse(text.match(/id="reading-options">\s*([\s\S]+?)<\/script>/u)[1]);
  const options = [...text.matchAll(/<option value="([^"]+)">/gu)].map(([, key]) => key);
  assert.deepEqual(options, Object.keys(records), slug);
  for (const [key, [sample, ...readouts]] of Object.entries(records)) {
    assert.match(sample, /⟦[^⟧]+⟧/u, slug + "/" + key);
    assert.equal(readouts.length, 3);
    assert.ok(readouts.every((value) => value.length >= 45), slug + "/" + key);
  }
  assert.equal(new Set(Object.values(records).map((record) => record[1])).size, options.length, slug);
  lessons.set(slug, records);
}
assert.equal(Object.keys(lessons.get("edebiyat-akimlari")).length, 13);

const references = Array.from(html(directory).matchAll(/href="([a-z-]+)\.html\?yaklasim=([a-z-]+)#atolye"/gu));
assert.deepEqual(new Set(references.map(([, slug]) => slug)), new Set(psychology));
for (const [, slug, key] of references) assert.ok(Object.hasOwn(lessons.get(slug), key), slug + "/" + key);

console.log(`U9 içerik: ${lessons.size} atölye, ${references.length} doğrudan dizin bağlantısı PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };
  const server = createServer((request, response) => {
    try {
      const { pathname } = new URL(request.url, "http://localhost");
      const file = resolve(root, "." + decodeURIComponent(pathname));
      if (!file.startsWith(root)) throw new Error("Geçersiz yol");
      const contents = readFileSync(file);
      response.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" }).end(contents);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
  try {
    const browser = await chromium.launch();
    try {
      let total = 0;
      for (const [width, theme] of [[360, "light"], [1280, "dark"]]) {
        const context = await browser.newContext({ viewport: { width, height: 900 }, serviceWorkers: "block" });
        await context.addInitScript((theme) => localStorage.setItem("acelya-theme", theme), theme);
        await context.route("https://fonts.googleapis.com/**", (route) => route.fulfill({ contentType: "text/css", body: "" }));
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        const base = `http://127.0.0.1:${server.address().port}`;
        const go = (slug) => page.goto(`${base}/${slug}`, { waitUntil: "domcontentloaded" });
        const fits = () => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);

        for (const [slug, records] of lessons) {
          assert.equal((await go(slug + ".html")).status(), 200, slug);
          const passage = page.locator("#okuma-metni");
          const readouts = page.locator("#atolye [data-result]");
          const select = page.locator("#yaklasim-sec");
          const first = Object.keys(records)[0];
          for (const [key, [sample, ...texts]] of Object.entries(records)) {
            await select.selectOption(key);
            assert.equal(await passage.textContent(), sample.replace(/[⟦⟧]/gu, ""), slug + "/" + key);
            assert.deepEqual(await readouts.allTextContents(), texts, slug + "/" + key);
            assert.deepEqual(await passage.locator("mark").allTextContents(),
              Array.from(sample.matchAll(/⟦([^⟧]+)⟧/gu), ([, marked]) => marked), slug + "/" + key);
            assert.ok(await fits(), slug + "/" + key + " yatay taşma");
            total++;
          }
          await page.getByRole("button", { name: "Başlangıç seçimi" }).click();
          await page.waitForFunction((text) => document.querySelector("#atolye [data-result]").textContent === text, records[first][1]);
          assert.equal(await select.inputValue(), first, slug);
          await page.locator("#kesif-defteri").waitFor();
          assert.equal(await page.locator(".digest-q").count(), 3, slug);
        }

        await go(directory + ".html");
        const visible = page.locator(".history-person:visible");
        const search = page.getByRole("searchbox", { name: "Düşünür veya kavram" });
        const family = page.getByLabel("Yaklaşım ailesi");
        assert.equal(await visible.count(), 72);
        for (const [query, name] of [
          ["kohler", "Wolfgang Köhler"], ["vygotski aracilik", "Lev Vygotsky"],
          ["martin baro ozgurlesme", "Ignacio Martín-Baró"], ["bowen ucgen", "Murray Bowen"],
        ]) {
          await search.fill(query);
          assert.deepEqual(await visible.locator("h2").allTextContents(), [name]);
        }
        await family.selectOption("deney");
        assert.equal(await visible.count(), 0);
        assert.match(await page.locator("#ekol-durum").textContent(), /Sonuç bulunamadı/u);
        await page.getByRole("button", { name: "Temizle" }).click();
        await page.waitForFunction(() => document.querySelectorAll(".history-person:not([hidden])").length === 72);
        assert.equal(await search.inputValue(), "");
        assert.equal(await family.inputValue(), "");
        await search.fill("Rubin zemin");
        await visible.getByRole("link").click();
        assert.equal(await page.locator("#yaklasim-sec").inputValue(), "zemin");
        assert.match(await page.locator("#okuma-metni mark").textContent(), /vazonun sınırı/u);
        assert.ok(await page.getByRole("img", { name: /aynı kontur/u }).isVisible());
        await go("gestalt-psikolojisi-ve-algi.html?yaklasim=__proto__#atolye");
        assert.equal(await page.locator("#yaklasim-sec").inputValue(), "yakinlik");
        assert.ok(await page.locator(".reading-vase").isHidden());

        await go("index.html");
        await page.locator("#searchInput").fill("frankenstein uyarlama");
        assert.ok(await page.locator('a[href="metinlerarasilik-ve-uyarlama.html"]').isVisible());
        await page.locator("#searchInput").fill("psikoloji ekolleri dizini");
        assert.ok(await page.locator(`a[href="${directory}.html"]`).isVisible());
        await go("ogrenme-yollari.html#psikolog");
        assert.equal(await page.locator(`a[href="${directory}.html"]`).count(), 1);
        assert.deepEqual(errors, []);
        await context.close();
      }
      console.log(`U9 Chromium: ${total} atölye seçimi, dizin, arama, öğrenme yolu ve defter PASS`);
    } finally {
      await browser.close();
    }
  } finally {
    await new Promise((done) => server.close(done));
  }
}
