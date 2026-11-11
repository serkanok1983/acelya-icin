// Güneş Sistemi laboratuvarı: çekirdeği bağımsız başvurulara karşı sınar.
// Başvurular sayfanın formüllerini tekrar kullanmaz: NASA'nın yayımladığı değerler (11 Kasım 2026'da açılan
// bilgi sayfaları), Simpson integrali, ince ızgarada kaba kuvvet ve ikiye bölme, farklı bir integratör.
// `--browser`: 390 px açık ve 1280 px koyu temada gerçek arayüz denetimi.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../gunes-sistemi.html", import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.SolarLab;
let checks = 0;
const near = (a, b, rel, msg = "") => { assert(Math.abs(a - b) <= rel * Math.abs(b), `${msg} ${a} ≠ ${b} (±${rel})`); checks++; };
const ok = (c, msg) => { assert(c, msg); checks++; };

// --- 1. Yayımlanmış NASA değerleri (sayfa bunları hesaplıyor, burada yalnız NASA'nın yazdıkları) ---
const NASA = { // ortalama yoğunluk, ortalama çekim (devlerde 1 bar), kaçış hızı, kara cisim T, Güneş ışınımı, kavuşum dönemi
  merkur: [5429, 3.70, 4.3, 439.6, 9082.7, 115.88], venus: [5243, 8.87, 10.36, 226.6, 2601.3, 583.92],
  dunya: [5513, 9.820, 11.186, 254.0, 1361.0, null], mars: [3934, 3.73, 5.03, 209.8, 586.2, 779.94],
  jupiter: [1326, 25.92, 59.5, 109.9, 50.26, 398.88], saturn: [687, 11.19, 35.5, 81.0, 14.82, 378.09],
  uranus: [1270, 9.01, 21.3, 58.1, 3.69, 369.66], neptun: [1638, 11.27, 23.5, 46.6, 1.508, 367.49],
};
eq(K.PLANETS.length, 8);
function eq(a, b) { assert.equal(a, b); checks++; }
for (const p of K.PLANETS) {
  const [rho, g, v, Tbb, S, syn] = NASA[p.key], m = K.derived(p, "mean"), e = K.derived(p, "eq");
  near(m.rho, rho, 0.001, p.key + " ρ");
  near(m.g, g, 0.0015, p.key + " g"); // NASA iki-üç anlamlı basamak
  // NASA kaçış hızı: kayalıklarda ortalama, devlerde ekvator yarıçapıyla
  near(p.group === "rock" ? m.v : e.v, v, p.key === "merkur" ? 0.012 : 0.002, p.key + " v");
  if (p.group !== "rock") ok(m.v > v * 1.002, p.key + " ortalama yarıçapla kaçış hızı NASA'dan büyük olmalı");
  // Kara cisim sıcaklığı (Dünya: NASA eski albedo 0.306 ile hesaplamış)
  near(K.teq(p.a, p.key === "dunya" ? 0.306 : p.A, 4), Tbb, 0.003, p.key + " Tbb");
  near(K.flux(p.a), S, 0.015, p.key + " S");
  if (syn) near(K.synodicTheory(365.256, p.P), syn, 2e-4, p.key + " kavuşum");
}
// NASA ışınımı Uranüs ve Neptün için eski yarı büyük eksenlere (2872.46, 4495.06 milyon km) karşılık gelir: sayfadaki farkın nedeni uzaklık
near(K.flux(2872.46), 3.69, 0.003, "Uranüs eski a"); near(K.flux(4495.06), 1.508, 0.003, "Neptün eski a");
// Güneş: L = 4πR²σT⁴ (üç bağımsız NASA/NIST sayısı tutarlı mı)
near(4 * Math.PI * (K.SUN.R * 1e3) ** 2 * K.SIGMA * K.SUN.T ** 4, K.SUN.L, 0.002, "Güneş L");
// Işık süresi: 1 AU ≈ 499.0 s (8 dk 19 s); Neptün ≈ 4 sa 11 dk
near(K.lightTime(149.598), 499.0, 1e-3, "Dünya ışık"); near(K.lightTime(4514.953) / 3600, 4 + 11 / 60, 2e-3, "Neptün ışık");
// 1 m Güneş: Dünya 107.5 m, Neptün 3.245 km, Dünya çapı 9.16 mm
const sm = K.scaleModel(1);
near(sm[2].distM, 149.598e6 / 1.3914e6, 1e-9, "model Dünya"); near(sm[7].distM, 3244.9, 1e-4); near(sm[2].diamM * 1000, 9.158, 1e-3);
assert.throws(() => K.scaleModel(0)); checks++;
ok(Number.isNaN(K.teq(0.5, 0.3)), "Güneş'in içinde T tanımsız");

// --- 2. Isınma: Simpson integrali ile bağımsız τ ve farklı integratör ---
for (const [key, A, f, dT0] of [["dunya", 0.294, 4, -20], ["venus", 0.77, 4, 50], ["mars", 0.25, 2, -100], ["neptun", 0.29, 4, 10]]) {
  const p = K.planet(key), r = K.createRelax({ dMkm: p.a, A, f, dT0 });
  const Te = r.Te, T0 = Te + dT0, T1 = Te - (Te - T0) / Math.E, k = K.SIGMA / K.HEAT_C;
  const n = 2000, h = (T1 - T0) / n; let sum = 0; // t = ∫ dT / (k(Te⁴ − T⁴)) Simpson
  for (let i = 0; i <= n; i++) { const T = T0 + i * h, w = i === 0 || i === n ? 1 : i % 2 ? 4 : 2; sum += w / (k * (Te ** 4 - T ** 4)); }
  const tauRef = (sum * h) / 3;
  near(r.tauExact, tauRef, 1e-6, key + " τ tam");
  while (r.t < 10 * r.tau0 - 1e-9 * r.tau0) r.step();
  near(r.tauMeasured, tauRef, 1e-4, key + " τ ölçülen");
  near(r.T, Te, 1e-4, key + " T son");
  // Explicit Euler, 50 kat küçük adım: aynı süre sonunda aynı T
  let T = T0; const dt = r.dt / 50; for (let i = 0; i < 400 * 50; i++) T += dt * ((1 - A) * K.flux(p.a) / f - K.SIGMA * T ** 4) / K.HEAT_C;
  near(r.history[400][1], T, 2e-4, key + " Euler");
  if (Math.abs(dT0) > 5) ok(Math.abs(r.tauExact / r.tau0 - 1) > 0.005, key + " doğrusal kuram sapmalı");
}
const r0 = K.createRelax({ dMkm: 149.598, A: 0.294, dT0: 0 }); for (let i = 0; i < 500; i++) r0.step();
eq(r0.tauMeasured, null); ok(Number.isNaN(r0.tauExact), "ΔT0 = 0 iken τ tanımsız");

// --- 3. Gökyüzü: ince ızgarada kaba kuvvet ---
function lamAt(aP, TP, t, phi0) { // Dünya θ = 2πt/365.256, gezegen θ = φ0 + 2πt/TP
  const tE = (2 * Math.PI * t) / 365.256, tP = phi0 + (2 * Math.PI * t) / TP;
  return Math.atan2(aP * Math.sin(tP) - Math.sin(tE), aP * Math.cos(tP) - Math.cos(tE));
}
function rateSign(aP, TP, t) { // dλ/dt işareti: göreli konum × göreli hız (z bileşeni)
  const nE = (2 * Math.PI) / 365.256, nP = (2 * Math.PI) / TP, tE = nE * t, tP = nP * t;
  const rx = aP * Math.cos(tP) - Math.cos(tE), ry = aP * Math.sin(tP) - Math.sin(tE);
  const vx = -aP * nP * Math.sin(tP) + nE * Math.sin(tE), vy = aP * nP * Math.cos(tP) - nE * Math.cos(tE);
  return rx * vy - ry * vx;
}
function bisect(f, a, b) { let fa = f(a); for (let i = 0; i < 80; i++) { const m = (a + b) / 2, fm = f(m); if (Math.sign(fm) === Math.sign(fa)) { a = m; fa = fm; } else b = m; } return (a + b) / 2; }
for (const key of ["merkur", "venus", "mars", "jupiter", "saturn", "uranus", "neptun"]) {
  const p = K.planet(key), aP = p.a / 149.598, S = 1 / Math.abs(1 / 365.256 - 1 / p.P);
  // t = 0'da kavuşum/karşı konum; geri hareket ±yarım süre. Durağan noktayı 0.01 gün ızgarada bul, ikiye böl.
  const f = (t) => rateSign(aP, p.P, t); let t = 0; const dt = 0.01; while (Math.sign(f(t)) === Math.sign(f(t + dt))) t += dt;
  const tStat = bisect(f, t, t + dt), durRef = 2 * tStat;
  const arcRef = Math.abs(K.wrapPi(lamAt(aP, p.P, tStat, 0) - lamAt(aP, p.P, -tStat, 0)));
  const th = K.retroTheory(1, 365.256, aP, p.P);
  near(th.duration, durRef, 1e-7, key + " geri süre kuram"); near(th.arc, arcRef, 1e-7, key + " yay kuram");
  const sky = K.createSky({ key }); const steps = Math.round((20 * 365.256) / sky.dt); for (let i = 0; i < steps; i++) sky.step();
  const m = sky.measure();
  ok(m.nSyn >= 10 && m.nRetro >= 4, key + " olay sayısı");
  near(m.synodic, S, 1e-6, key + " S ölçülen");
  near(m.retro, durRef, 2e-4, key + " geri süre ölçülen");
  near(m.arc, arcRef, 2e-4, key + " yay ölçülen");
  if (aP < 1) {
    let best = 0; for (let x = 0; x < S; x += 0.005) { const tE = (2 * Math.PI * x) / 365.256, tP = (2 * Math.PI * x) / p.P;
      const ex = Math.cos(tE), ey = Math.sin(tE), dx = aP * Math.cos(tP) - ex, dy = aP * Math.sin(tP) - ey;
      best = Math.max(best, Math.acos((-ex * dx - ey * dy) / Math.hypot(dx, dy))); }
    near(m.maxElong, best, 1e-6, key + " uzanım kaba kuvvet"); near(K.maxElongTheory(aP, 1), best, 1e-6, key + " arcsin");
  } else eq(m.maxElong, null);
}
// Merkür ve Venüs'te en büyük uzanım: 22.77° ve 46.33°
near((K.maxElongTheory(57.909 / 149.598, 1) * 180) / Math.PI, 22.774, 1e-4); near((K.maxElongTheory(108.21 / 149.598, 1) * 180) / Math.PI, 46.331, 1e-4);
assert.throws(() => K.planet("pluton")); checks++;
ok(Object.isFrozen(K) && Object.isFrozen(K.PLANETS) && Object.isFrozen(K.PLANETS[0]), "çekirdek donuk");
console.log(`G güneş sistemi: ${checks} bağımsız NASA, Simpson, Euler, kaba kuvvet ve ikiye bölme kontrolü PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let browser; const before = checks;
  try {
    browser = await chromium.launch();
    for (const [width, theme] of [[390, "light"], [1280, "dark"]]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
      await page.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      page.setDefaultTimeout(8000);
      const errors = []; page.on("pageerror", (e) => errors.push(e.message)); page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/gunes-sistemi.html`);
      const read = async (id) => (await page.locator("#" + id).textContent()).replace(/\u00a0/g, " ");
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `${id}: "${t}" içinde "${text}" yok`); checks++; };
      const set = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event(e.tagName === "SELECT" ? "change" : "input", { bubbles: true })); }, v);
      const click = (id) => page.locator("#" + id).click();
      const key = async (k) => { await page.evaluate(() => document.activeElement?.blur()); await page.keyboard.press(k); };
      // Her denetimin etiketi var
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      // 1 · Ölçek
      await has("scRatio", "354 336"); await has("scEarth", "px"); await has("lightRows", "8 dk 19.0 s"); await has("modelRows", "107.5 m"); await has("modelRows", "3.24 km");
      await set("sunBall", "5"); await has("modelRows", "537.6 m"); await set("scaleSpan", "-2"); await has("scaleStatus", "Güneş");
      await set("scaleMode", "size"); await has("scPx", "uzaklık ekseni yok"); eq(await page.locator("#scaleSpan").isDisabled(), true);
      await click("scaleReset"); await has("sunBallOut", "1.0 m"); await has("scaleSpanOut", "31.6 AU");
      await page.locator("#pulseSpeed").selectOption("3600"); await click("pulseBtn"); await page.waitForTimeout(2600);
      await has("lightRows", "8 dk 19.0 s"); await has("lightRows", "0.0000 %");
      { const th = await page.locator("#lightRows").locator("xpath=ancestor::table").locator("thead").innerText(); ok(th.includes("Animasyonda varış (denetim)") && !th.includes("Ölçülen varış"), "ışık tablosu başlığı dürüst olmalı"); }
      await key("r"); await has("pulseBtn", "gönder");
      // 2 · Karşılaştırma
      await click("tab-compare"); await has("cmpRows", "25.920"); await has("cmpMaxV", "Satürn"); await has("cmpStatus", "ekvator");
      await set("cmpRadius", "eq"); await has("cmpMaxG", "Satürn"); await has("cmpStatus", "basık");
      await click("cmpPresetV"); eq(await page.locator("#cmpX").inputValue(), "M"); eq(await page.locator("#cmpLogX").isChecked(), true);
      await click("compareReset"); eq(await page.locator("#cmpRadius").inputValue(), "mean"); eq(await page.locator("#cmpY").inputValue(), "rho");
      // 3 · Sıcaklık
      await click("tab-temp"); await has("tpTeq", "255.1 K"); await has("tpFlux", "1361.2"); await page.waitForTimeout(4600);
      await has("tpTsim", "255.13 K"); await has("tpTauM", "3.81 yıl"); await has("tpTauT", "doğrusal 3.53 yıl"); await has("tpGap", "+32.9 K");
      await click("tpVenus"); await has("tpTeq", "226.6 K"); await has("tpGap", "+510.4 K"); await has("tempStatus", "sera");
      await set("tpAlbedo", "0.95"); await has("tpAlbedoOut", "0.950"); await set("tpDist", "4"); await has("tpObs", "gözlem yok"); await has("tpGap", "—");
      await set("tpDist", "0.25"); await has("tpDistOut", "0.181 AU"); await set("tpStart", "0"); await has("tpTauM", "tanımsız");
      await click("tempReset"); await has("tpAlbedoOut", "0.294"); eq(await page.locator("#tpPlanet").inputValue(), "dunya");
      await has("tempRows", "254.0 K");
      // 4 · Gökyüzü
      await click("tab-sky"); await has("skySt", "779.93 gün"); await has("skyRt", "72.7 gün"); await has("skySm", "ölçülüyor");
      await click("skyFast"); await has("skySm", "779.93 gün"); await has("skyRm", "72.7 gün"); await has("skyArc", "15.92° / 15.92°");
      eq(await page.locator("#skyElBox").isHidden(), true);
      await click("skyVenus"); await click("skyFast"); await has("skySm", "583.92 gün"); await has("skyEm", "46.331°"); await has("skyEt", "46.33°");
      await page.locator("#skyPlanet").selectOption("merkur"); await click("skyFast"); await has("skyEm", "22.774°"); await has("skyStatus", "18°");
      await page.locator("#skyPlanet").selectOption("neptun"); await click("skyFast"); await has("skySm", "367.49 gün"); await has("skyRm", "158.4 gün");
      await key("Space"); await has("skyToggle", "Devam et"); await key("r");
      await has("skyToggle", "Duraklat"); eq(await page.locator("#skyPlanet").inputValue(), "mars");
      // Klavye: sekmeler
      await page.locator("#tab-sky").focus(); await page.keyboard.press("Home"); eq(await page.locator("#tab-scale").getAttribute("aria-selected"), "true");
      await page.keyboard.press("ArrowLeft"); eq(await page.locator("#tab-sky").getAttribute("aria-selected"), "true");
      await page.keyboard.press("End"); eq(await page.locator("#tab-sky").getAttribute("aria-selected"), "true");
      await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-scale").getAttribute("aria-selected"), "true");
      eq(await page.evaluate(() => !Object.getOwnPropertyDescriptor(window, "SolarLab").writable && Object.isFrozen(window.SolarLab)), true);
      for (const t of ["scale", "compare", "temp", "sky"]) { await click("tab-" + t); eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true); }
      assert.deepEqual(errors, []); checks++;
      await page.close();
    }
    console.log(`G güneş sistemi: ${checks - before} gerçek arayüz kontrolü (390 px açık, 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
