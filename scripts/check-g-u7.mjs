#!/usr/bin/env node
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const slugs = [
  "sokrates-oncesi-felsefe", "platon-felsefesi", "aristoteles-felsefesi",
  "helenistik-felsefe", "orta-cag-ve-islam-felsefesi", "rasyonalist-felsefe",
  "empirist-felsefe", "kant-felsefesi", "alman-idealizmi",
  "on-dokuzuncu-yuzyil-felsefesi", "fenomenoloji-ve-varolusculuk", "analitik-felsefe",
  "pragmatizm", "yapisalcilik-ve-sonrasi",
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

const optionsBySlug = new Map();
for (const slug of slugs) {
  const source = readFileSync(resolve(root, `${slug}.html`), "utf8");
  const block = source.match(/\/\* KERNEL-BEGIN \*\/([\s\S]+?)\/\* KERNEL-END \*\//u)[1];
  const model = vm.runInNewContext(`(() => {${block}})()`);
  eq(Object.isFrozen(model), true, `${slug} salt okunur model`);
  const keys = [...source.matchAll(/<option value="([^"]+)">/gu)].map((match) => match[1]);
  ok(keys.length >= 3, `${slug} en az üç sav`);
  eq(new Set(keys).size, keys.length, `${slug} benzersiz sav kimlikleri`);
  optionsBySlug.set(slug, keys);
  for (const key of keys) {
    const fields = model.read(key);
    eq(fields.length, 5, `${slug} ${key} bağlam, sav, gerekçe, itiraz ve yanıt`);
    ok(fields.every((field) => field.length > 12), `${slug} ${key} bütün alanlar tamam`);
    const first = fields[0];
    fields[0] = "";
    eq(model.read(key)[0], first, `${slug} ${key} sonraki okumada veri korunur`);
  }
  for (const bad of ["__proto__", "constructor", "gecersiz"]) {
    eq(model.read(bad), null, `${slug} geçersiz sav anahtarı`);
  }
}
const directory = readFileSync(resolve(root, "dusunurler-dizini.html"), "utf8");
const connections = [...directory.matchAll(/href="([a-z-]+)\.html\?sav=([a-z-]+)#argumanlar"/gu)];
eq(connections.length, 56, "56 düşünür bağlantısı");
for (const [, slug, key] of connections) {
  ok(optionsBySlug.get(slug)?.includes(key), `dizindeki bağlantı: ${slug} → ${key}`);
}
eq(new Set(connections.map(([, slug]) => slug)).size, slugs.length, "dizin bütün dersleri kapsıyor");
console.log(`U7 veri: ${checks} kontrol PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const mime = {
    ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml",
    ".png": "image/png", ".json": "application/json", ".m4a": "audio/mp4",
  };
  const prefix = "/felsefe/";
  const server = createServer((request, response) => {
    const { pathname } = new URL(request.url, "http://localhost");
    try {
      if (!pathname.startsWith(prefix)) throw new Error("Kapsam dışı");
      const file = resolve(root, decodeURIComponent(pathname.slice(prefix.length)));
      if (!file.startsWith(root + "/")) throw new Error("Geçersiz yol");
      const content = readFileSync(file);
      response.writeHead(200, {
        "Content-Type": mime[extname(file)] || "application/octet-stream",
        "Cache-Control": file.endsWith("/shared/digest.css") ? "max-age=3600" : "no-store",
      });
      response.end(content);
    } catch {
      response.writeHead(404).end();
    }
  });

  await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
  try {
    const browser = await chromium.launch();
    const base = `http://127.0.0.1:${server.address().port}${prefix}`;
    try {
      for (const [width, theme] of [[390, "light"], [1280, "dark"]]) {
        const context = await browser.newContext({
          viewport: { width, height: 840 }, reducedMotion: "reduce", serviceWorkers: "block",
        });
        await context.addInitScript((theme) => localStorage.setItem("acelya-theme", theme), theme);
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        for (const slug of slugs) {
          const id = `${width} ${slug}`;
          eq((await page.goto(`${base}${slug}.html`)).status(), 200, `${id} HTTP`);
          const select = page.getByLabel("Sav veya yaklaşım");
          const outputs = page.locator("#argumanlar [data-result]");
          const objection = page.locator(".history-objection");
          const initial = await outputs.allTextContents();
          eq(initial.length, 5, `${id} alan sayısı`);
          eq(await page.locator(".history-claims").first().evaluate((grid) =>
            getComputedStyle(grid).gridTemplateColumns.split(" ").length), 1, `${id} uzun metin tek sütunda`);
          ok(!(await objection.locator("dl").isVisible()), `${id} itirazı okumadan önce sav görünür`);
          await objection.locator("summary").press("Enter");
          ok(await objection.locator("dl").isVisible(), `${id} itiraz klavyeyle açılır`);
          const entries = new Set();
          for (const key of optionsBySlug.get(slug)) {
            await select.selectOption(key);
            const values = await outputs.allTextContents();
            ok(values.every((value) => value.length > 12), `${id} ${key} bütün sonuçlar var`);
            entries.add(values.join("\n"));
          }
          eq(entries.size, optionsBySlug.get(slug).length, `${id} her sav farklı`);
          await page.getByRole("button", { name: "Başlangıç seçimi" }).click();
          await page.waitForFunction((first) => document.querySelector("#argumanlar [data-result]").textContent === first, initial[0]);
          eq(await outputs.allTextContents(), initial, `${id} başlangıca dönüldü`);
          await page.locator("#kesif-defteri").waitFor();
          eq(await page.locator(".digest-q").count(), 3, `${id} üç defter sorusu`);
          ok(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth <= 1), `${id} yatay taşma yok`);
        }

        await page.goto(`${base}dusunurler-dizini.html`);
        const search = page.getByRole("searchbox", { name: "Düşünür veya kavram" });
        const period = page.getByLabel("Dersin dönemi");
        const cards = page.locator(".history-person:visible");
        const headings = () => cards.locator("h2").allTextContents();
        eq(await cards.count(), 56, `${width} bütün düşünürler başlangıçta görünür`);
        for (const term of ["Avicenna", "İbn Sînâ", "IBN SINA"]) {
          await search.fill(term);
          eq(await headings(), ["İbn Sînâ"], `${width} farklı yazımla ${term}`);
        }
        await search.fill("nedensellik");
        await period.selectOption("medieval");
        eq(await headings(), ["Gazâlî"], `${width} Orta Çağ ve kavram filtresi`);
        await period.selectOption("early");
        eq(await headings(), ["David Hume"], `${width} erken modern ve kavram filtresi`);
        await period.selectOption("ancient");
        eq(await cards.count(), 0, `${width} eşleşmeyen dönem`);
        ok((await page.locator("#dusunur-durum").textContent()).startsWith("Sonuç bulunamadı"), `${width} sonuç yok durumu`);
        await page.getByRole("button", { name: "Temizle" }).click();
        await page.waitForFunction(() => document.querySelectorAll(".history-person:not([hidden])").length === 56);
        eq(await search.inputValue(), "", `${width} temizle aramayı sıfırlar`);
        eq(await period.inputValue(), "", `${width} temizle dönemi sıfırlar`);
        await search.fill("Hume");
        await Promise.all([
          page.waitForURL("**/empirist-felsefe.html?sav=hume#argumanlar"),
          cards.getByRole("link").click(),
        ]);
        eq(await page.getByLabel("Sav veya yaklaşım").inputValue(), "hume", `${width} dizin doğru sava gitti`);
        await page.goto(`${base}empirist-felsefe.html?sav=__proto__#argumanlar`);
        eq(await page.getByLabel("Sav veya yaklaşım").inputValue(), "locke", `${width} bilinmeyen anahtar güvenli varsayılan`);
        eq(errors, [], `${width} sayfa hatası yok`);
        await context.close();
      }

      const offline = await browser.newContext({ serviceWorkers: "allow" });
      const page = await offline.newPage();
      const css = `${base}shared/digest.css`;
      const target = `${base}tek-sayi-toplam4.html`;
      await page.goto(`${base}index.html`);
      await page.waitForFunction(() => navigator.serviceWorker.controller, null, { timeout: 90000 });
      await page.evaluate(async (css) => {
        const key = (await caches.keys()).find((key) => key.endsWith("-static"));
        const cache = await caches.open(key);
        await cache.put(css, new Response(
          ".digest-idea-label { color: white !important; background: turquoise !important; }",
          { headers: { "Content-Type": "text/css" } },
        ));
      }, css);
      const assertBadge = async (source) => {
        await page.waitForFunction(() => [...document.styleSheets].some((sheet) => sheet.href?.endsWith("/shared/digest.css")));
        eq(await page.locator(".digest-idea-label").evaluate((el) => {
          const style = getComputedStyle(el);
          return [style.color, style.backgroundColor];
        }), ["rgb(128, 242, 221)", "rgb(18, 53, 52)"], source);
      };
      const cachedRequest = page.waitForResponse((response) => response.url() === css && response.fromServiceWorker());
      await page.goto(target);
      await cachedRequest;
      await assertBadge("Çevrimiçi ziyaret eski CSS yerine ağdan güncel etiketi alır");
      await offline.setOffline(true);
      await page.goto(target);
      await assertBadge("Çevrimdışı ziyaret önbellekten son doğrulanmış etiketi alır");
      await offline.close();
    } finally {
      await browser.close();
    }
  } finally {
    server.close();
  }
  console.log(`U7 tarayıcı: toplam ${checks} kontrol PASS (390 açık, 1280 koyu, CSS önbelleği)`);
}
