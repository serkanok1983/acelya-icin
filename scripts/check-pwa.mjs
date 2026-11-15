#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = fileURLToPath(new URL("..", import.meta.url));
const shell = readFileSync(resolve(root, "sw.js"), "utf8")
  .split("// --- generated:core ---")[1].split("// --- end:core ---")[0]
  .match(/"[^"]+"/g).map((entry) => JSON.parse(entry));
const contentTypes = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png" };

const baseOption = process.argv.indexOf("--base");
const requests = [];
const prefix = "/atlas/";
let server;
let base;
if (baseOption !== -1) {
  base = new URL(process.argv[baseOption + 1]);
} else {
  server = createServer((req, res) => {
    const pathname = new URL(req.url, "http://localhost").pathname;
    requests.push(pathname);
    if (pathname === prefix + "fixture.html") {
      res.writeHead(200, { "content-type": "text/html" }).end("<title>Önbellek hazırlığı</title>");
      return;
    }
    if (!pathname.startsWith(prefix)) { res.writeHead(404).end(); return; }
    const file = resolve(root, pathname.slice(prefix.length) || "index.html");
    try {
      const bytes = readFileSync(file);
      res.writeHead(200, { "content-type": contentTypes[extname(file)] || "application/octet-stream" });
      res.end(bytes);
    } catch (_) {
      res.writeHead(404).end();
    }
  });
  await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
  base = new URL("http://127.0.0.1:" + server.address().port + prefix);
}
const url = (file) => new URL(file, base).href;
const waitForController = (page) => page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
const waitForCache = (page, urls) => page.waitForFunction(async (paths) => {
  const matches = await Promise.all(paths.map((path) => caches.match(path)));
  return matches.every(Boolean);
}, urls);

let browser;
try {
  browser = await chromium.launch();
  const context = await browser.newContext({ serviceWorkers: "allow" });
  const page = await context.newPage();
  if (server) {
    await page.goto(url("fixture.html"));
    await page.evaluate(async ({ home, legacyLesson }) => {
      const old = await caches.open("acelya-1234-static");
      await old.put(home, new Response("Önceki kabuk"));
      await old.put(legacyLesson, new Response("<h1>Önceki ders</h1>", { headers: { "Content-Type": "text/html; charset=utf-8" } }));
      await caches.open("baska-uygulama");
    }, { home: url("index.html"), legacyLesson: url("legacy-lesson.html") });
  }
  await page.goto(url("index.html"));
  await waitForController(page);
  const keys = await page.evaluate(async () => {
    const name = (await caches.keys()).find((key) => key.startsWith("acelya:") && key.endsWith("-static"));
    return (await (await caches.open(name)).keys()).map((request) => request.url);
  });
  assert.deepEqual(keys.sort(), shell.map(url).sort(), "temiz kurulumda yalnızca kabuk dosyaları");
  const firstLesson = "veri-ve-ornekleme.html";
  const untouched = "uslup-istatistigi-ve-yazar-tanima.html";
  if (server) {
    assert(!requests.includes(prefix + firstLesson) && !requests.includes(prefix + untouched), "kurulum dersleri istemiyor");
    assert(await page.evaluate(async () => (await caches.keys()).includes("baska-uygulama")), "başka uygulamanın önbelleği korunur");
  }
  console.log("Temiz kurulum: " + keys.length + " dosya, dersler ziyaretle yüklenir.");

  await context.setOffline(true);
  const home = await page.goto(url(""));
  assert.equal(home.status(), 200, "kök URL çevrimdışı kabuktan açılır");
  const missing = await page.goto(url(untouched));
  assert.equal(missing.status(), 503, "ziyaret edilmemiş ders için çevrimdışı ekran");
  assert(await page.getByRole("link", { name: "Ana sayfa" }).isVisible(), "çevrimdışı ekrandan kataloğa dönüş");
  if (server) {
    await page.goto(url("legacy-lesson.html"));
    assert(await page.getByRole("heading", { name: "Önceki ders" }).isVisible(), "önceki kurulumdan ders çevrimdışı açılır");
  }
  await context.setOffline(false);

  const routeLesson = url(firstLesson + "?yol=olasilik-istatistik");
  const statsDigest = url("shared/digest/veri-ve-ornekleme.js");
  await page.goto(routeLesson);
  await page.locator("#kesif-defteri").waitFor();
  await waitForCache(page, [routeLesson, statsDigest]);
  await context.setOffline(true);
  await page.goto(url(firstLesson));
  assert(await page.getByRole("heading", { name: "Veri ve Örnekleme", exact: true }).isVisible(), "yoldan açılmış ders doğrudan da çevrimdışı açılır");
  await page.locator("#kesif-defteri").waitFor();
  await context.close();

  const direct = await browser.newContext({ serviceWorkers: "allow" });
  const lesson = await direct.newPage();
  const film = url("film-cozumleme-atolyesi.html");
  await lesson.goto(film);
  await waitForController(lesson);
  await waitForCache(lesson, [film, url("shared/cinema-archive.js"), url("shared/cinema.css"), url("shared/digest/film-cozumleme-atolyesi.js")]);
  await direct.setOffline(true);
  await lesson.reload();
  await lesson.getByRole("heading", { name: "Film Çözümleme Atölyesi", exact: true, level: 1 }).waitFor();
  await lesson.locator("#kesif-defteri").waitFor();
  assert(await lesson.getByLabel("Film", { exact: true }).isVisible(), "ilk doğrudan ziyaretin atölyesi çevrimdışı açılır");
  await direct.close();
  console.log("PWA PASS · çevrimdışı katalog, yol ve doğrudan ilk ziyaret, defter ve atölye kaynakları.");
} finally {
  await browser?.close();
  server?.close();
}
