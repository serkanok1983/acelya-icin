#!/usr/bin/env node
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const workshop = "film-cozumleme-atolyesi";
const slugs = [
  "sinema-akimlari", "film-kuramlari", "senaryo-ve-dramaturji", "sinemada-mizansen",
  "sinemada-kurgu-ve-zaman", "sinemada-ses-ve-film-muzigi", "sinemada-oyunculuk-yontemleri", "belgesel-ve-deneysel-sinema",
];

function jsonScript(slug, id) {
  const text = readFileSync(resolve(root, slug + ".html"), "utf8");
  const pattern = new RegExp(`id="${id}">\\s*([\\s\\S]+?)</script>`, "u");
  return { data: JSON.parse(text.match(pattern)[1]), text };
}

const courses = new Map(slugs.map((slug) => {
  const { data, text } = jsonScript(slug, "cinema-options");
  assert.deepEqual([...text.matchAll(/<option value="([^"]+)">/gu)].map(([, key]) => key), Object.keys(data), slug);
  for (const [key, { shots, readouts }] of Object.entries(data)) {
    assert.ok(shots.length >= 1 && shots.every((shot) => shot.length >= 12), slug + "/" + key);
    assert.equal(readouts.length, 3);
    assert.ok(readouts.every((value) => value.length >= 70), slug + "/" + key);
  }
  return [slug, data];
}));
assert.equal(Object.keys(courses.get("sinema-akimlari")).length, 9);
assert.equal(Object.keys(courses.get("film-kuramlari")).length, 8);

const { data: films } = jsonScript(workshop, "archive-films");
assert.equal(films.length, 2);
for (const { id, scenes, stream, rights } of films) {
  assert.equal(new URL(stream).hostname, "upload.wikimedia.org");
  assert.match(rights, /kamu malıdır.*ses izi yoktur/u);
  assert.equal(new Set(scenes.map((scene) => scene.id)).size, scenes.length);
  let previousEnd = 0;
  for (const scene of scenes) {
    assert.equal(scene.start, previousEnd, id + "/" + scene.id);
    assert.ok(scene.end > scene.start);
    assert.ok(scene.shots.length && scene.readouts.length === 3 && scene.answer.length >= 45);
    previousEnd = scene.end;
  }
}
assert.equal(films.flatMap(({ scenes }) => scenes).length, 17);
console.log("U10 içerik: 8 ders atölyesi, 2 kamu malı film ve 17 bölüm PASS");

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };
  const server = createServer((request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      const file = resolve(root, "." + pathname);
      if (!file.startsWith(root)) throw new Error("Geçersiz yol");
      const contents = readFileSync(file);
      response.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" }).end(contents);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
  const base = `http://127.0.0.1:${server.address().port}/`;
  try {
    const browser = await chromium.launch();
    try {
      let choices = 0;
      for (const [width, theme] of [[360, "light"], [1280, "dark"]]) {
        const context = await browser.newContext({ viewport: { width, height: 900 }, serviceWorkers: "block" });
        await context.addInitScript((theme) => localStorage.setItem("acelya-theme", theme), theme);
        await context.route("https://fonts.googleapis.com/**", (route) => route.fulfill({ contentType: "text/css", body: "" }));
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        const visit = async (path) => {
          assert.equal((await page.goto(base + path, { waitUntil: "domcontentloaded" })).status(), 200, path);
          assert.equal((await page.locator("html").getAttribute("data-theme")) ?? "dark", theme, path);
        };
        const fits = () => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
        const shots = () => page.locator("#plan-dizisi li").allTextContents();
        const readouts = () => page.locator("#atolye [data-result]").allTextContents();
        const shotColors = () => page.locator("#plan-dizisi").evaluate((list) => [
          getComputedStyle(list.firstElementChild).color,
          getComputedStyle(list).backgroundColor,
        ]);

        for (const [slug, data] of courses) {
          await visit(slug + ".html");
          assert.deepEqual(await shotColors(), ["rgb(246, 230, 199)", "rgb(27, 24, 33)"]);
          const select = page.locator("#sinema-sec");
          const first = Object.keys(data)[0];
          for (const [key, record] of Object.entries(data)) {
            await select.selectOption(key);
            assert.deepEqual(await shots(), record.shots, slug + "/" + key);
            assert.deepEqual(await readouts(), record.readouts, slug + "/" + key);
            if (slug === "sinemada-mizansen") {
              assert.equal(await page.locator("#sahne-cercevesi").getAttribute("data-look"), record.effect);
            }
            assert.ok(await fits(), slug + "/" + key + " yatay taşma");
            choices++;
          }
          await page.getByRole("button", { name: "Başlangıç seçimi" }).click();
          await page.waitForFunction((text) => document.querySelector("#atolye [data-result]").textContent === text, data[first].readouts[0]);
          assert.equal(await select.inputValue(), first);
          await page.locator("#kesif-defteri").waitFor();
          assert.equal(await page.locator(".digest-q").count(), 3);
          if (slug === "sinemada-ses-ve-film-muzigi") {
            const status = page.locator("#ses-durum");
            assert.equal(await status.textContent(), "");
            await page.getByRole("button", { name: "Ses örneğini dinle" }).click();
            await page.waitForFunction(() => /örneği bitti/u.test(document.getElementById("ses-durum").textContent));
            await select.selectOption("leitmotif");
            assert.equal(await status.textContent(), "");
          }
        }

        let requests = 0;
        await page.route("https://upload.wikimedia.org/**", (route) => {
          requests++;
          return route.abort("failed");
        });
        await visit(workshop + ".html");
        assert.deepEqual(await shotColors(), ["rgb(246, 230, 199)", "rgb(27, 24, 33)"]);
        assert.equal(await page.locator("#arsiv-bekliyor").evaluate((text) => getComputedStyle(text).color), "rgb(246, 230, 199)");
        const filmSelect = page.getByLabel("Film", { exact: true });
        const sceneSelect = page.getByLabel("Sahne", { exact: true });
        for (const film of films) {
          await filmSelect.selectOption(film.id);
          assert.equal(await page.locator("#arsiv-kaydi").getAttribute("href"), film.archive);
          assert.equal(await page.locator("#arsiv-kopyasi").getAttribute("href"), film.copy);
          assert.equal(await page.locator("#arsiv-hak").textContent(), film.rights);
          assert.equal(await sceneSelect.locator("option").count(), film.scenes.length);
          for (const scene of film.scenes) {
            await sceneSelect.selectOption(scene.id);
            assert.deepEqual(await shots(), scene.shots);
            assert.deepEqual(await readouts(), scene.readouts);
            assert.equal(await page.locator("#sahne-sorusu summary").textContent(), scene.question);
            assert.equal(new URL(page.url()).searchParams.get("sahne"), scene.id);
            assert.ok(await fits(), film.id + "/" + scene.id);
            choices++;
          }
        }
        assert.equal(requests, 0, "Oynatma düğmesinden önce video isteği yapılmaz");
        await visit(workshop + ".html?film=frankenstein&sahne=ayna#atolye");
        assert.equal(await filmSelect.inputValue(), "frankenstein");
        assert.equal(await sceneSelect.inputValue(), "ayna");
        await page.locator("#sahne-sorusu summary").press("Enter");
        assert.ok(await page.locator("#sahne-sorusu p").isVisible());
        await page.getByRole("button", { name: "Seçili sahneyi oynat" }).click();
        await page.waitForFunction(() => document.getElementById("arsiv-durum").textContent.includes("Video açılamadı"));
        assert.equal(requests, 1);
        assert.ok(await page.locator("#arsiv-kopyasi").isVisible());
        await sceneSelect.selectOption("son");
        assert.equal(await page.locator("#arsiv-durum").textContent(), "");

        await visit("index.html");
        await page.locator("#searchInput").fill("frankenstein film cozümleme");
        assert.ok(await page.locator(`a[href="${workshop}.html"]`).isVisible());
        await visit("sinema-dili-ve-kurgu.html");
        assert.ok(await page.locator(`a[href="${workshop}.html"]`).first().isVisible());
        assert.deepEqual(errors, []);
        await context.close();
      }
      console.log(`U10 Chromium: ${choices} seçim, mizansen, ses, arşiv, hata yolu ve katalog PASS`);
    } finally {
      await browser.close();
    }
  } finally {
    await new Promise((done) => server.close(done));
  }
}
