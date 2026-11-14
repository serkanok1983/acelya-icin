#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { createServer } from "node:http";
import { mkdirSync } from "node:fs";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const slugs = [
  "isi-transferi", "zemin-mekanigi", "kuyruk-kurami-ve-benzetim",
  "kalite-kontrol-ve-istatistiksel-surec-kontrolu", "finans-matematigi",
  "yapi-fizigi", "kent-planlama", "gelisim-psikolojisi", "sosyal-psikoloji",
];
let checks = 0;
function eq(actual, expected, message) {
  assert.deepEqual(actual, expected, message);
  checks++;
}
function near(actual, expected, tolerance, message) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${message}: ${actual} ≠ ${expected} (±${tolerance})`);
  checks++;
}
function model(slug) {
  const page = readFileSync(resolve(root, `${slug}.html`), "utf8");
  const body = page.match(/\/\* KERNEL-BEGIN \*\/([\s\S]+?)\/\* KERNEL-END \*\//u)[1];
  const core = vm.runInNewContext(`(() => {${body}})()`);
  eq(Object.isFrozen(core), true, `${slug}: çekirdek salt okunur`);
  return core;
}

const heat = model(slugs[0]);
const wall = heat.wall(6, 20);
near(wall.flux, 800 / 77, 1e-10, "duvarın analitik akısı");
near(wall.temperatures[1], 20 - 100 / 77, 1e-10, "duvar iç yüzeyi");
near(wall.temperatures.at(-1), 0, 1e-10, "dış hava sınırı");
near(wall.temperatures[1] - wall.temperatures[2], 200 / 77, 1e-10, "gövdedeki kayıp");
eq(heat.wall(0, 20).insulationDrop, 0, "yalıtımsız sınır");
eq(heat.surface(20, 1, 10).total, 0, "ısıl denge");
eq(heat.surface(60, 0, 6).total, 240, "ışınım yok, yalnız taşınım");
const fourthPowerDifference = 40 * (333.15 + 293.15) * (333.15 ** 2 + 293.15 ** 2);
near(heat.surface(60, 0.85, 6).radiation, 0.85 * 5.670374419e-8 * fourthPowerDifference, 1e-10, "net ışınım");

const soil = model(slugs[1]);
near(soil.stress(6, 2).effective, 76.76, 1e-10, "su altında etkin gerilme");
near(soil.stress(6, 0).effective, 61.14, 1e-10, "tam doygun zemin");
eq(soil.stress(6, 6).pore, 0, "su tablası sınırı");
eq(soil.stress(6, 12).total, 108, "su üstü");
eq(soil.consolidation(40, 0, 2).settlement, 0, "yük anı");
near(soil.consolidation(40, 39.4, 2).fraction, 0.5, 0.001, "Tᵥ ≈ 0,197 için %50");
near(soil.consolidation(40, 60, 2).settlement, soil.consolidation(40, 240, 1).settlement, 1e-10, "drenajda kare ölçeği");
near(soil.consolidation(40, 10000, 1).settlement, 80, 1e-8, "birincil son oturma");
near(soil.bearing(1.5, 150, 25).capacity, 128.539816, 1e-6, "φ=0 taşıma gücü");
eq(soil.bearing(3, 150, 25).pressure, 50, "temel genişliği");

const queue = model(slugs[2]);
const stable = queue.theory(12, 18);
near(stable.wait, 20 / 3, 1e-10, "M/M/1 kuyrukta bekleme");
near(stable.length, 4 / 3, 1e-10, "M/M/1 kuyrukta kişi");
eq(queue.theory(18, 18).system, null, "kritik yükte durağan durum yok");
eq(queue.theory(22, 18).wait, null, "aşırı yükte durağan durum yok");
eq(Array.from(queue.simulate(12, 18, 7)), Array.from(queue.simulate(12, 18, 7)), "aynı tohumla aynı örneklem");
assert.notDeepEqual(Array.from(queue.simulate(12, 18, 7)), Array.from(queue.simulate(12, 18, 8)));
checks++;
const trials = Array.from({ length: 12 }, (_, i) => queue.simulate(12, 18, i + 1).at(-1));
near(trials.reduce((a, b) => a + b) / trials.length, 20 / 3, 0.4, "12 örneklemle teorik uyum");
assert.ok(queue.simulate(21, 18, 7, 0, 2, 1000)[1] > 180, "aşırı yükte bekleme birikiyor");
checks++;

const quality = model(slugs[3]);
const monitoring = quality.inspect(0.55, 0.8);
near(monitoring.mean, 10.0125, 1e-10, "başlangıç ortalaması");
near(monitoring.upper, 10.0125 + 3 * 187 / 1100 / 1.128, 1e-10, "11 hareketli fark toplamı 1,87 mm");
assert.ok(monitoring.signals > 0 && monitoring.fails === 0, "sinyal varken tüm ürünler şartname içinde");
checks++;
eq(quality.inspect(0, 0.15).upper, monitoring.upper, "şartname kontrol sınırını değiştirmez");
eq(quality.inspect(0.05, 0.15).points[14].nonconforming, true, "üst şartnameyi aşma");
eq(quality.inspect(0.01, 0.15).points[14].nonconforming, false, "üst şartnameye eşit nokta uygun");
assert.ok(monitoring.cpk < monitoring.cp, "merkez kayınca Cpk daha küçük");
checks++;

const finance = model(slugs[4]);
near(finance.grow(1000, 0.1, 5, 1).compound, 1610.51, 1e-8, "yıllık bileşik");
near(finance.grow(1000, 0.1, 5, 12).compound, 1645.3089347786, 1e-8, "aylık bileşik");
eq(finance.grow(1000, 0, 12, 12).compound, 1000, "sıfır faiz");
eq(finance.discount([-1000, 300, 400, 600], 0).npv, 300, "sıfır iskonto");
near(finance.discount([-1000, 300, 400, 600], 0.1).npv, 72000 / 1331, 1e-8, "akışlar üçüncü yılın ortak paydasında");

const building = model(slugs[5]);
eq(building.facade(5, 0.35).total, 245, "cephe kaybı");
eq(building.facade(20, 0.35).solidLoss, 0, "cephe bütünüyle pencere");
eq(building.illuminance(4, 0), 37.5, "ters kare");
near(building.illuminance(2, 60), 75, 1e-10, "açı etkisi");
eq(building.sound(0).reduction, 40, "açıklık yok");
near(building.sound(0.1).reduction, 29.5865, 0.0001, "iki yolun birleşik akustiği");

const city = model(slugs[6]);
eq(Array.from(city.shortest(1, false).distances), [18, 0, 12, 17, 18, 14], "Doğu'dan rotalar, elle yol toplama");
eq(Array.from(city.shortest(1, true).distances), [16, 0, 10, 5, 16, 14], "köprüyle Doğu rotaları");
eq(city.access(false, 10).school, 0, "eşik altı");
eq(city.access(false, 11).school, 600, "eşitlik dahil");
eq(city.access(true, 10).school, 400, "köprü tek mahalleye hizmet ediyor");
eq(city.access(true, 11).school, 1000, "iki mahalle erişiyor");

const development = model(slugs[7]);
const scores = (...args) => Array.from(development.compare(...args), ({ score }) => score);
eq(scores("cross", 0, 6, 0), [92, 82, 72], "yaş ve kuşak birlikte");
eq(scores("long", 2, 6, 0), [92, 88, 84], "aynı kuşak üç ölçüm");
eq(scores("long", 2, 6, -10), [92, 78, 84], "yalnız ara ölçüm kayıyor");
eq(scores("cross", 1, 6, -10), [78, 68, 58], "ortak yıl farkı");

const social = model(slugs[8]);
const rates = (data) => Array.from(data, ({ rate }) => rate);
eq(rates(social.conformity("clear")), [0.35, 0.15], "açık çizgide oranlar");
eq(rates(social.conformity("ambiguous")), [0.6, 0.4], "belirsiz çizgide oranlar");
eq(rates(social.help("all")), [0.76, 0.43], "toplam yardım");
eq(rates(social.help("easy")), [0.9, 0.95], "kolay durum");
eq(rates(social.help("hard")), [0.2, 0.3], "zor durum");

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const mime = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };
  const server = createServer((req, res) => {
    try {
      const path = resolve(root, `.${new URL(req.url, "http://localhost").pathname}`);
      if (!path.startsWith(root)) return res.writeHead(403).end();
      res.writeHead(200, { "Content-Type": `${mime[extname(path)] || "application/octet-stream"}; charset=utf-8` })
        .end(readFileSync(path));
    } catch (err) {
      if (!res.headersSent) res.writeHead(404);
      res.end();
    }
  });
  await new Promise((done, fail) => {
    server.once("error", fail).listen(0, "127.0.0.1", done);
  });
  const browser = await chromium.launch();
  const base = `http://127.0.0.1:${server.address().port}`;
  const outputPath = process.env.U5_SCREENSHOTS;
  if (outputPath) mkdirSync(outputPath, { recursive: true });

  const scenarios = [
    [["#duvar-thickness", "0", 0, "47,06 W/m²"], ["#yuzey-emissivity", "0", 1, "0 W/m²"]],
    [["#gerilme-water", "0", 2, "61,14 kPa"], ["#oturma-day", "0", 1, "0 mm"], ["#tasima-width", "3", 0, "50 kPa"]],
    [["#kuyruk-arrival", "18", 2, "Durağan değer yok"]],
    [["#kalite-tolerance", "0.15", 4, "8 / 8"]],
    [["#faiz-periods", "12", 0, "1645,31 PB"], ["#nbd-discount", "0", 1, "300 PB"]],
    [["#isi-glass", "0", 2, "140 W"], ["#isik-distance", "4", 0, "37,5 lx"], ["#ses-opening", "0", 0, "40 dB"]],
    [["#erisim-bridge", "1", 2, "% 40"]],
    [["#gelisim-design", "long", 1, "−8 puan"]],
    [["#uyma-task", "ambiguous", 0, "% 60"], ["#baglam-filter", "easy", 2, "−5 yüzde puan"]],
  ];

  try {
    for (const [width, theme] of [[390, "light"], [1280, "dark"]]) {
      const context = await browser.newContext({ viewport: { width, height: 820 }, serviceWorkers: "block", reducedMotion: "reduce" });
      await context.addInitScript((theme) => localStorage.setItem("acelya-theme", theme), theme);
      await context.route("https://fonts.googleapis.com/**", (route) => route.abort());
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));

      for (const [i, slug] of slugs.entries()) {
        await page.goto(`${base}/${slug}.html`);
        await page.locator("#kesif-defteri").waitFor();
        eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${slug} ${width}: taşma yok`);
        for (const [selector, value, position, expected] of scenarios[i]) {
          const input = page.locator(selector);
          const panel = input.locator("xpath=ancestor::section[1]");
          const results = panel.locator("[data-result]");
          const initial = await results.allTextContents();
          eq(initial.includes("—"), false, `${selector}: ilk değerler görünür`);
          const info = await input.evaluate((el) => ({ tag: el.tagName, name: el.labels[0]?.textContent }));
          assert.ok(info.name, `${selector} için etiket`);
          checks++;
          if (info.tag === "SELECT") {
            await input.selectOption(value);
          } else {
            await input.fill(value);
            assert.ok(await input.getAttribute("aria-valuetext"));
            checks++;
          }
          eq(await results.nth(position).textContent(), expected, `${slug} ${width} ${selector}`);

          const table = panel.locator(".lesson-data");
          if (await table.count()) {
            await table.locator("summary").click();
            eq(await table.locator("tbody tr").first().isVisible(), true, `${selector}: veri tablosu görünür`);
            eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${selector} ${width}: veri tablosu taşmıyor`);
            await table.locator("summary").click();
          }
          if (info.tag === "INPUT") {
            await input.press("Home");
            eq(await input.inputValue(), await input.getAttribute("min"), `${selector}: klavyeyle alt sınır`);
            await input.press("End");
            eq(await input.inputValue(), await input.getAttribute("max"), `${selector}: klavyeyle üst sınır`);
          }
          await panel.getByRole("button", { name: "Başlangıç değerleri" }).click();
          await page.waitForFunction(([selector, expected]) => {
            const panel = document.querySelector(selector).closest("section");
            return [...panel.querySelectorAll("[data-result]")].every((el, i) => el.textContent === expected[i]);
          }, [selector, initial]);
          eq(await results.allTextContents(), initial, `${selector}: sıfırlama`);
        }
        if (outputPath) {
          await page.evaluate(() => scrollTo(0, 0));
          await page.screenshot({ path: resolve(outputPath, `${slug}-${width}.png`) });
        }
      }
      eq(errors, [], `${width}: JavaScript hatası yok`);
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

console.log(`U5: dokuz ders, ${checks} sayısal ve arayüz kontrolü PASS`);
