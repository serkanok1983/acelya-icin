#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { chromium } from "playwright";

const root = fileURLToPath(new URL("..", import.meta.url));
const dir = resolve(root, "shared/digest");
const digests = readdirSync(dir).filter((name) => name.endsWith(".js")).map((name) => {
  const sandbox = { window: {} };
  vm.runInNewContext(readFileSync(resolve(dir, name), "utf8"), sandbox);
  return sandbox.window.ACELYA_DIGEST[name.slice(0, -3)];
});
const chosen = new Map([
  ["Dil ve Edebiyat", "edebiyat-elestirisi-bicim-ve-gosterge"],
  ["Sinema", "film-cozumleme-atolyesi"],
  ["Zihin ve Davranış", "sosyal-psikoloji"],
]);
for (const field of chosen.keys()) {
  assert(digests.filter((d) => d.field === field && d.reasoning?.length).length >= 6, field + " gerekçeli soru kapsamı");
}

const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json" };
const server = createServer((req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname;
  if (pathname === "/fixture.html") {
    res.writeHead(200, { "Content-Type": mime[".html"] }).end('<!doctype html><body class="app-page"><script src="/shared/digest.js"></script>');
    return;
  }
  const file = resolve(root, "." + pathname);
  if (!file.startsWith(root)) { res.writeHead(404).end(); return; }
  try {
    const data = readFileSync(file);
    res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" }).end(data);
  } catch (_) {
    res.writeHead(404).end();
  }
});
await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
const base = "http://127.0.0.1:" + server.address().port;

let browser;
try {
  browser = await chromium.launch();
  const context = await browser.newContext({ serviceWorkers: "block", viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(base + "/fixture.html");
  const cases = digests.map(({ slug, title, quiz }) => ({ slug, title, quiz }));
  const counts = await page.evaluate((items) => {
    const slots = { 3: [0, 0, 0], 4: [0, 0, 0, 0] };
    let moved = 0;
    const invalid = [];
    for (const digest of items) {
      window.AcelyaDigest.mount(digest);
      const section = document.getElementById("kesif-defteri");
      const fields = [...section.querySelectorAll(".digest-quiz fieldset")];
      fields.forEach((field, i) => {
        const { answer, options } = digest.quiz[i];
        const order = [...field.querySelectorAll("input")].map((input) => Number(input.value));
        if (options.length !== order.length || options.some((_, index) => !order.includes(index))) {
          invalid.push(digest.slug + ":" + i);
          return;
        }
        const actualSlot = order.indexOf(answer);
        slots[order.length][actualSlot]++;
        if (actualSlot !== answer) moved++;
      });
      section.remove();
    }
    return { slots, moved, invalid };
  }, cases);
  assert.deepEqual(counts.invalid, [], "seçenekler eksiksiz ve benzersiz");
  assert(counts.moved > cases.length * 2, "doğru seçeneklerin çoğu kaynak konumundan taşındı");
  for (const slots of Object.values(counts.slots)) {
    const total = slots.reduce((sum, count) => sum + count, 0);
    assert(total > 0 && slots.every((count) => count >= total * 0.16), "her doğru cevap konumu kullanılır");
  }
  console.log("Doğru cevap konumları:", JSON.stringify(counts.slots));

  for (const slug of chosen.values()) {
    await page.goto(base + "/" + slug + ".html");
    const reasoning = page.locator("#defter-gerekce");
    await reasoning.getByRole("heading", { name: "Gerekçeli soru", exact: true }).waitFor();
    const answer = reasoning.locator("details > p");
    const reveal = reasoning.getByText("Örnek gerekçeyi göster", { exact: true });
    assert(!(await answer.isVisible()), slug + " model yanıt başlangıçta kapalı");
    await reveal.press("Enter");
    assert(await answer.isVisible(), slug + " model yanıt klavyeyle açılır");
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), slug + " telefonda yatay taşma yok");

    const firstQuestion = page.locator(".digest-quiz fieldset").first();
    const original = cases.find((item) => item.slug === slug).quiz[0].answer;
    const right = firstQuestion.locator('input[value="' + original + '"]');
    const wrong = firstQuestion.locator('input:not([value="' + original + '"])').first();
    const order = () => firstQuestion.locator("input").evaluateAll((inputs) => inputs.map((input) => input.value));
    const displayedOrder = await order();
    await wrong.check();
    assert.match(await firstQuestion.locator(".digest-feedback").innerText(), /^Henüz değil/);
    assert.equal(await firstQuestion.locator(".is-answer input").inputValue(), String(original));
    await right.check();
    assert.match(await firstQuestion.locator(".digest-feedback").innerText(), /^Doğru/);
    assert(await page.evaluate((key) => JSON.parse(localStorage.getItem("acelya-digest-quiz-v1"))[key].correct, slug + ":0"));
    await page.reload();
    await firstQuestion.waitFor();
    assert.deepEqual(await order(), displayedOrder, slug + " yeniden açınca sıra sabit");
  }
  await context.close();
  console.log("Defter sınavları PASS · tüm defterlerde seçenek sırası, üç alanda gerekçe, klavye ve geri bildirim.");
} finally {
  await browser?.close();
  server.close();
}
