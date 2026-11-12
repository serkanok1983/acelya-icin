// Çözeltiler ve koligatif özellikler: çekirdeğin bağımsız denetimi (+ --browser ile arayüz).
// Başvurular sayfanın formüllerini yinelemez: NIST kaynama noktaları, OpenStax tabloları ve örnekleri,
// Gibbs–Duhem, ayrı kök bulucular, enerji korunumu, küçük adımlı Euler ikizleri ve tohum taramaları.
// Kullanım: node scripts/check-g-cozeltiler-ve-koligatif-ozellikler.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "cozeltiler-ve-koligatif-ozellikler";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.SolutionLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const nearAbs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
const Rg = 8.314462618, g = 9.80665, rho = 997.05;
ok(Object.isFrozen(K), "çekirdek dondurulmuş");

/* ── 1. Raoult ── */
// NIST: benzen kaynama 353,3 K, toluen 383,8 K (1 atm); Antoine ile ters çözüm, bağımsız kapalı biçim
const tb = (A, B, C, P) => B / (A - Math.log10(P)) - C;
nearAbs(K.bubbleT({ x1: 1, P: 1.01325 }).T, tb(4.72583, 1660.652, -1.461, 1.01325), 1e-8, "saf benzen");
nearAbs(K.bubbleT({ x1: 1, P: 1.01325 }).T, 353.3, 0.1, "NIST benzen Tb");
nearAbs(K.bubbleT({ x1: 0, P: 1.01325 }).T, 383.8, 0.1, "NIST toluen Tb");
for (const T of [334.15, 353.15, 373.15]) {
  near(K.psat("benzene", T), 10 ** (4.72583 - 1660.652 / (T - 1.461)), 1e-12, "Antoine benzen");
  for (const x1 of [0, 0.1, 0.37, 0.5, 0.9, 1]) {
    const m = K.mixture({ T, x1, A: 0 }); near(m.P, x1 * m.P1 + (1 - x1) * m.P2, 1e-12, "Raoult toplam"); near(m.y1 * m.P, x1 * m.P1, 1e-12, "Dalton");
    for (const A of [-1.5, -0.6, 0.8, 1.5]) {
      // Gibbs–Duhem: x1 d ln γ1 + x2 d ln γ2 = 0 (sayısal türev)
      if (x1 > 0.05 && x1 < 0.95) { const h = 1e-5, a = K.mixture({ T, x1: x1 + h, A }), b = K.mixture({ T, x1: x1 - h, A }); nearAbs(x1 * (Math.log(a.g1) - Math.log(b.g1)) / (2 * h) + (1 - x1) * (Math.log(a.g2) - Math.log(b.g2)) / (2 * h), 0, 1e-6, "Gibbs–Duhem"); }
      // sonsuz seyreltmede γ∞ = e^A
      if (x1 === 0) near(K.margules(A, 0)[0], Math.exp(A), 1e-12, "γ1∞");
    }
  }
}
// kabarcık sıcaklığı: bağımsız sekant ile kalıntı
for (const P of [0.6, 1.01325, 1.2]) for (const A of [0, 1.2, -1.2]) for (const x1 of [0.05, 0.3, 0.5, 0.8, 0.95]) {
  const b = K.bubbleT({ x1, P, A }); const f = (T) => { const [g1, g2] = [Math.exp(A * (1 - x1) ** 2), Math.exp(A * x1 * x1)]; return x1 * g1 * 10 ** (4.72583 - 1660.652 / (T - 1.461)) + (1 - x1) * g2 * 10 ** (4.07827 - 1343.943 / (T - 53.773)) - P; };
  let t0 = 330, t1 = 390; for (let k = 0; k < 60 && Math.abs(t1 - t0) > 1e-12; k++) { const t2 = t1 - f(t1) * (t1 - t0) / (f(t1) - f(t0)); t0 = t1; t1 = t2; }
  nearAbs(b.T, t1, 1e-7, "kabarcık T sekant"); ok(b.y1 >= 0 && b.y1 <= 1, "y aralıkta");
  if (A === 0) ok(b.y1 > x1, "ideal karışımda buhar uçucuca zengin");
}
ok(K.azeotrope({ P: 1.01325, A: 0 }) === null, "idealde azeotrop yok");
for (const A of [1.2, -1.2, 1.5]) {
  const az = K.azeotrope({ P: 1.01325, A }); ok(az !== null, "azeotrop var " + A);
  nearAbs(K.bubbleT({ x1: az.x1, P: 1.01325, A }).y1, az.x1, 1e-6, "azeotropta y = x");
  // sabit P'de T(x) azeotropta ekstremum (pozitif sapmada en düşük)
  const Tm = K.bubbleT({ x1: az.x1 - 0.01, P: 1.01325, A }).T, Tp = K.bubbleT({ x1: az.x1 + 0.01, P: 1.01325, A }).T;
  ok(A > 0 ? Tm > az.T && Tp > az.T : Tm < az.T && Tp < az.T, "azeotrop ekstremum " + A);
}
ok(!K.bubbleT({ x1: 0.05, P: 1.01325, A: 0 }).valid && K.bubbleT({ x1: 0.5, P: 1.01325, A: 0 }).valid, "Antoine aralığı bayrağı");
// buharlaşma oyuncağı: 30 tohumda yansızlık ve belirsizlik kalibrasyonu
for (const x of [0.8, 0.4]) {
  let zs = [];
  for (let sd = 1; sd <= 30; sd++) { const p = K.evapBox({ x: 1, seed: 1000 + sd }), s = K.evapBox({ x, seed: 2000 + sd }); for (let k = 0; k < 10000; k++) { p.step(); s.step(); } const r = K.ratioStats(p, s); zs.push((r.ratio - r.x) / r.se); ok(Math.abs(r.x - x) < 0.01, "sıvı kesri pek değişmez"); }
  const mz = zs.reduce((a, b) => a + b, 0) / zs.length; nearAbs(mz, 0, 0.6, "ortalama z ≈ 0 (yansız) " + x);
  ok(zs.filter((z) => Math.abs(z) <= 2).length >= 25, "2σ kapsaması ≥ 25/30 " + x);
}
{ const p = K.evapBox({ x: 1, seed: 1001 }), s = K.evapBox({ x: 0.8, seed: 2001 }); for (let k = 0; k < 10000; k++) { p.step(); s.step(); } const r = K.ratioStats(p, s); nearAbs(r.ratio, 0.8046, 5e-5, "varsayılan oran"); nearAbs(r.x, 0.7967, 5e-5, "varsayılan x"); nearAbs(r.meanPure, 80, 2, "saf denge ≈ ke·S/kc = 80"); }

/* ── 2. Kaynama ve donma ── */
// OpenStax Tablo 11.2 ile termodinamikten türetilen sabitler
const kd = K.kDerived("water"); nearAbs(kd.Kf, 1.86, 0.01, "su Kf"); nearAbs(kd.Kb, 0.512, 0.002, "su Kb");
near(kd.Kf, Rg * 273.15 ** 2 * 0.018015 / 6010, 1e-12, "su Kf formülü");
const kb = K.kDerived("benzene"); nearAbs(kb.Kf, 5.12, 0.02, "benzen Kf"); ok(kb.Kb > 2.53 && kb.Kb < 2.53 * 1.06, "benzen Kb tablodan %6 içinde");
for (const key of ["water", "benzene"]) for (const i of [1, 2, 3]) for (const m of [0, 1e-4, 0.05, 0.5, 2, 3]) {
  const c = K.colligative({ key, m, i }), S = K.SOLVENTS[key];
  near(c.dTf, i * S.KfTab * m, 1e-12, "doğrusal ΔTf");
  // bağımsız: ikiye bölmeyle ln x = (ΔH/R)(1/T0 − 1/T)
  const x = 1 / (1 + i * m * S.M); let lo = 150, hi = S.Tf; for (let k = 0; k < 200; k++) { const mid = (lo + hi) / 2; if (Math.log(x) - S.dHf / Rg * (1 / S.Tf - 1 / mid) > 0) lo = mid; else hi = mid; }
  nearAbs(c.dTfExact, S.Tf - (lo + hi) / 2, 1e-9, "tam donma");
  let lo2 = S.Tb, hi2 = 600; for (let k = 0; k < 200; k++) { const mid = (lo2 + hi2) / 2; if (x * Math.exp(-S.dHv / Rg * (1 / mid - 1 / S.Tb)) < 1) lo2 = mid; else hi2 = mid; }
  nearAbs(c.dTbExact, (lo2 + hi2) / 2 - S.Tb, 1e-9, "tam kaynama");
  if (m === 1e-4) { const kk = K.kDerived(key); near(c.dTfExact / (i * m), kk.Kf, 1e-3, "seyreltik sınırda eğim = türetilen Kf"); near(c.dTbExact / (i * m), kk.Kb, 1e-3, "seyreltik Kb"); }
}
// soğuma eğrisi: enerji korunumu, denge koşulu, kesişim yöntemi
for (const [key, m, i, under, bath] of [["water", 0.5, 2, 2, -10], ["water", 0.5, 2, 0, -10], ["water", 1, 1, 3.5, -15], ["benzene", 0.3, 1, 1, -5], ["water", 0, 1, 2, -10]]) {
  const r = K.cooling({ key, m, i, mass: 20, bath, under }), S = K.SOLVENTS[key], ms = 0.02, L = S.dHf / S.M, cL = S.cpL * 1000, cS = S.cpS * 1000, T0 = S.Tf - 273.15;
  ok(r.nucleated, "çekirdeklenme " + key + m);
  const H = (T, f) => ms * ((1 - f) * cL + f * cS) * (T - T0) - f * ms * L;
  let Q = 0; for (let k = 1; k < r.series.length; k++) { const [t0, T0a] = r.series[k - 1], [t1, T1a] = r.series[k]; Q += 0.05 * ((T0a + T1a) / 2 - bath) * (t1 - t0); }
  const last = r.series[r.series.length - 1]; nearAbs(H(r.series[0][1], 0) - H(last[1], last[2]), Q, 1e-3 * Math.abs(Q), "enerji korunumu");
  for (const p of r.series) if (p[2] > 0 && p[2] < 1) nearAbs(p[1], T0 - r.a / (1 - p[2]), 1e-6, "buz–sıvı dengesi");
  if (m > 0) { nearAbs(r.Text, T0 - i * S.KfTab * m, 0.06, "kesişim donma noktası"); ok(r.Tmax < T0 - i * S.KfTab * m || under === 0, "aşırı soğumadan sonra tepe kuramın altında"); }
  else { nearAbs(r.Tmax, T0, 1e-9, "saf plato"); nearAbs(r.slope, 0, 1e-9, "saf plato düz"); }
  if (m > 0) { const mid = r.series.find((p) => p[0] >= r.slopeAt - 1e-9), idx = r.series.indexOf(mid); const fd = (r.series[idx + 1][1] - r.series[idx - 1][1]) / (r.series[idx + 1][0] - r.series[idx - 1][0]); near(r.slopeTh, fd, 2e-3, "plato eğimi sonlu fark"); nearAbs(r.slope / r.slopeTh, 1, 0.05, "ölçülen eğim"); }
}
{ const r = K.cooling({ key: "water", m: 0.5, i: 2, mass: 20, bath: -10, under: 2 }); nearAbs(r.tn / 60, 32.91, 0.01, "varsayılan çekirdeklenme"); nearAbs(r.Text, -1.843, 0.0006, "varsayılan kesişim"); nearAbs(r.Tmax, -1.907, 0.0006, "varsayılan tepe");
  const h = K.cooling({ key: "water", m: 0.5, i: 2, mass: 20, bath: -10, under: 2, dt: 0.5 }); nearAbs(h.Text, r.Text, 2e-3, "dt/2 ikizi"); }
ok(!K.cooling({ key: "water", m: 3, i: 2, bath: -10, under: 2 }).nucleated, "banyo eşiğin üstünde: donma yok");

/* ── 3. Osmotik basınç ── */
// OpenStax Örnek 11.10: 0,30 M glukoz, 310 K, Π = 7,6 atm
nearAbs(K.osmotic({ i: 1, c: 300, Tc: 36.85 }) / 101325, 7.6, 0.05, "OpenStax 7,6 atm");
for (const c of [0.1, 1, 5]) for (const h0 of [0.05, 0.1, 0.5]) for (const i of [1, 2]) {
  const Pi0 = K.osmotic({ i, c, Tc: 25 }), e = K.utubeEq({ Pi0, h0 });
  near(rho * g * e.exact * (h0 + e.exact / 2), Pi0 * h0, 1e-10, "denge denklemi"); near(e.naive, Pi0 / (rho * g), 1e-12, "saf tahmin"); ok(e.exact < e.naive, "seyrelme dengeyi düşürür");
  const run = K.utubeRun({ Pi0, h0 }); nearAbs(run.dh, e.exact, 1e-9 * Math.max(1, e.exact), "benzetim dengeye varır");
  // bağımsız Euler (dt = 0,05 s) ile t90
  if (c === 1 && h0 === 0.1) { let y = 0, t = 0, t90 = null; const kap = 1 / (300 * rho * g); while (t < 3000 && t90 === null) { const yn = y + 0.05 * kap * (Pi0 * h0 / (h0 + y / 2) - rho * g * y); t += 0.05; if (yn >= 0.9 * e.exact) t90 = t - 0.05 + 0.05 * (0.9 * e.exact - y) / (yn - y); y = yn; } nearAbs(run.t90, t90, 0.5, "t90 Euler ikizi"); }
}
{ const Pi0 = K.osmotic({ i: 1, c: 1, Tc: 25 }), e = K.utubeEq({ Pi0, h0: 0.1 }); nearAbs(Pi0, 2478.96, 0.01, "1 mM Π"); nearAbs(100 * e.exact, 14.64, 0.005, "varsayılan Δh"); nearAbs(100 * e.naive, 25.35, 0.005, "saf Δh"); const big = K.utubeEq({ Pi0, h0: 1e4 }); near(big.exact, big.naive, 1e-4, "uzun sütunda saf tahmine yakınsar"); }
// ters osmoz
{ const pi = K.roPi({ cgL: 35, i: 2 }); near(pi, 2 * 35 / 58.44 * 1000 * Rg * 298.15 / 1e5, 1e-12, "deniz suyu ideal Π"); nearAbs(pi, 29.69, 0.01, "29,69 bar"); ok(pi > 27, "ideal hesap kaynağın ~27 barından büyük");
  let hit = 0; for (let sd = 1; sd <= 100; sd++) { const f = K.roFluxFit({ Pi: pi, seed: sd }); if (Math.abs(f.P0 - pi) <= 2 * f.u) hit++; } ok(hit >= 88 && hit <= 100, "akı eşiği 2u kapsaması " + hit);
  for (const P of [35, 60, 100]) { const b = K.roBatch({ Pi0: pi, P }); nearAbs(b.recovery, 1 - pi / P, 1e-6, "kesikli geri kazanım"); }
  const back = K.roBatch({ Pi0: pi, P: 20 }); nearAbs(back.recovery, 1 - pi / 20, 1e-6, "P < Π: besleme seyrelir"); ok(back.recovery < 0, "negatif geri kazanım"); }
// hücre
for (const b of [0, 0.4, 0.6]) for (const pct of [0.45, 0.9, 1.8, 3]) {
  const osm = K.nacl({ pct, i: 1.9 }), eq = K.cellEq({ osmOut: osm, b });
  near((eq - b) * osm, (1 - b) * 290, 1e-12, "Boyle–van 't Hoff: (V − b)Π sabit");
  let v = 1; for (let k = 0; k < 20000; k++) v = K.cellStep(v, osm, b, 0.1); nearAbs(v, eq, 1e-6, "hücre ODE dengesi");
}
nearAbs(K.nacl({ pct: 0.9, i: 1.9 }), 292.61, 0.01, "%0,9 NaCl"); ok(K.cellEq({ osmOut: 0, b: 0.4 }) === Infinity, "saf suda tanımsız");

/* ── 4. van 't Hoff ve molar kütle ── */
// OpenStax Tablo 11.3
for (const [k, nu, im] of [["sucrose", 1, 1.0], ["NaCl", 2, 1.9], ["HCl", 2, 1.9], ["MgSO4", 2, 1.3], ["MgCl2", 3, 2.7], ["FeCl3", 4, 3.4]]) { ok(K.SOLUTES[k].nu === nu && K.SOLUTES[k].iMeas === im, "Tablo 11.3 " + k); }
for (const key of ["water", "benzene"]) for (const M of [62.07, 128.17, 342.3]) {
  const r = K.massExperiment({ key, M, msg: 25, wMax: 1, n: 6, sigma: 0, offset: 0.03, seed: 1 }); near(r.M, M, 1e-9, "gürültüsüz M"); nearAbs(r.fit.a, 0.03, 1e-12, "kayma kesişimde");
  ok(Math.abs(r.M1 - M) / M > 0.01 || r.pts[5][1] > 1, "tek nokta kaymadan etkilenir");
}
{ let hit = 0; for (let sd = 1; sd <= 400; sd++) { const r = K.massExperiment({ key: "water", M: 128.17, msg: 25, wMax: 1, n: 6, sigma: 0.01, seed: sd }); if (Math.abs(r.M - 128.17) <= 2 * r.uM) hit++; }
  // n − 2 = 4 serbestlik: t₄ ile 2u kapsaması ≈ %88
  nearAbs(hit / 400, 0.884, 0.05, "M belirsizliği kalibre"); }
{ const r = K.massExperiment({ key: "water", M: 128.17, msg: 25, wMax: 1, n: 6, sigma: 0.01, seed: 1 }); nearAbs(r.M, 132.34, 0.01, "varsayılan M"); nearAbs(r.uM, 3.05, 0.01, "varsayılan u(M)"); }
// OpenStax Örnek 11.12: 20 g/L hemoglobin, 22 °C, 5,9 torr, M = 6,2 × 10⁴
{ const s = K.sensitivity({ Mkg: 62, cgL: 20, Tc: 22, seed: 1 }); nearAbs(s.Pi / 133.322, 5.9, 0.05, "hemoglobin 5,9 torr"); nearAbs(s.dTf, 1.86 * 20 / 62000 / 0.99705, 1e-12, "hemoglobin ΔTf"); ok(s.Mc === null, "kriyoskopi ölçülemez"); nearAbs(s.Mo, 62306, 1, "osmometri M");
  const s2 = K.sensitivity({ Mkg: 5, cgL: 20, Tc: 22 }); near(s.snH / s.snT, s2.snH / s2.snT, 1e-12, "duyarlılık oranı M'den bağımsız"); nearAbs(s.snH / s.snT, 269, 1, "269 kat"); }
// hatalı girdiler
for (const call of [() => K.mixture({ T: 350, x1: 1.2 }), () => K.evapBox({ x: 0 }), () => K.colligative({ key: "x", m: 1, i: 1 }), () => K.linfit([1, 2], [1, 2]), () => K.psat("su", 300)]) { assert.throws(call); checks++; }
console.log(`Çözeltiler: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

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
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await ctx.newPage();
      await page.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      page.setDefaultTimeout(20000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      await page.waitForTimeout(600);
      // Keşif Defteri yüklenip görünür olmalı (artık 404 hoş görülmez)
      await page.waitForSelector(".digest", { timeout: 10000 }); ok(await page.evaluate(() => { const d = document.querySelector(".digest"); return !!d && d.getBoundingClientRect().height > 200 && d.textContent.includes("Tanecik"); }), "defter görünür");
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, t) => { const v = await read(id); assert(v.includes(t), `${id}: "${v}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const select = async (id, v) => { await page.selectOption("#" + id, v); };
      const settle = (ms = 150) => page.waitForTimeout(ms);
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll(".app-content input,.app-content select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuval etiketleri");
      ok(await page.evaluate(() => [...document.querySelectorAll('.app-content input[type="range"]')].every((e) => { const s = +e.step, v = (+e.value - +e.min) / s; return Math.abs(v - Math.round(v)) < 1e-6; })), "varsayılanlar adım ızgarasında");
      ok(await page.evaluate(() => Object.isFrozen(window.SolutionLab) && !Object.getOwnPropertyDescriptor(window, "SolutionLab").writable), "çekirdek salt okunur");
      // 1 · Raoult
      await page.evaluate(() => { document.getElementById("t1Restart").click(); document.getElementById("t1Run").click(); document.getElementById("t1Fast").click(); });
      await has("t1Steps", "10 000"); await has("t1Ratio", "0,8046"); await has("t1Raoult", "0,7967"); await has("t1Diff", "+0,98 %"); await has("t1Status", "uyumlu");
      ok((await read("t1Run")) === "Devam et", "duraklatıldı");
      await range("t1x", 1); await has("t1Ratio", "ölçülüyor"); await range("t1x", 0.3); await has("t1xOut", "0,30");
      await has("t1Psat", "100,9 · 38,8 kPa"); await has("t1Ptot", "69,9 kPa · y₁ = 0,722"); await has("t1Bub", "92,06 °C"); await has("t1Tb1", "353,29 K"); await has("t1Tb2", "383,77 K");
      await page.click("#t1Pos"); await has("t1AOut", "+1,20"); await has("t1MixStatus", "azeotrop: x₁ = y₁ = 0,898"); await has("t1MixStatus", "79,73 °C");
      await page.click("#t1Neg"); await has("t1MixStatus", "en yüksek"); await has("t1MixStatus", "dış değerleme");
      await range("t1X1", 0.02); await has("t1BubY", "dış değerleme"); await range("t1X1", 0); await has("t1Bub", "110,62 °C"); await range("t1X1", 1); await has("t1Bub", "80,14 °C");
      await range("t1P", 0.6); await has("t1POut", "0,60 atm"); await range("t1T", 61); await has("t1TOut", "61,0 °C"); await range("t1T", 100);
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("t1AOut", "0,00"); await has("t1Ptot", "69,9 kPa"); await has("t1xOut", "0,80");
      await page.locator("h1").click(); await page.keyboard.press("Space"); ok((await read("t1Run")) === "Devam et", "Boşluk duraklatır");
      // 2 · Kaynama ve donma
      await page.click("#tab-dt"); await settle();
      await has("t2Kf", "1,860 K·kg/mol"); await has("t2Kb", "0,513 K·kg/mol"); await has("t2dTf", "1,860 K"); await has("t2dTfX", "1,831 K"); await has("t2dTb", "0,512 K"); await has("t2Tb", "100,49 °C");
      await has("t2Nuc", "32,9 dk"); await has("t2Max", "−1,907 °C"); await has("t2Ext", "−1,843 °C"); await has("t2ExtD", "+0,017 K"); await has("t2Slope", "−0,0073 K/dk");
      await select("t2IMode", "meas"); await has("t2i", "1,9"); await has("t2dTf", "1,767 K");
      await select("t2Solute", "MgSO4"); await has("t2i", "1,3"); await select("t2Solute", "glycol"); await has("t2iN", "ölçülen değer yok");
      await page.click("#t2Pure"); await settle(); await has("t2dTf", "0,000 K"); await has("t2Max", "0,000 °C"); await has("t2SlopeD", "saf çözücü"); await has("t2CoolStatus", "plato düzdür");
      await page.click("#t2Anti"); await has("t2dTf", "5,580 K"); await has("t2Ext", "°C");
      await range("t2Bath", -1); await settle(); await has("t2CoolStatus", "hiç donmuyor"); await has("t2Ext", "—");
      await select("t2Solv", "benzene"); ok((await page.locator("#t2Solute").inputValue()) === "apolar", "benzende apolar çözünen"); await has("t2Kf", "5,109"); await has("t2KbD", "+4,3 %"); await has("t2Status", "buharlaşma entalpisi açıklamaz"); await has("t2Status", "32,0 kJ/mol");
      await range("t2m", 3); await range("t2Under", 0); await range("t2Under", 5); await range("t2Mass", 5); await range("t2Mass", 100);
      await page.click("#t2Reset"); await settle(); await has("t2Ext", "−1,843 °C"); await has("t2Solute", ""); ok((await page.locator("#t2Solv").inputValue()) === "water", "sıfırla çözücü");
      // 3 · Osmotik basınç
      await page.click("#tab-osm"); await settle();
      await page.click("#t3End"); await settle(); await has("t3Dh", "14,64 cm"); await has("t3Exact", "14,64 cm"); await has("t3Naive", "25,35 cm"); await has("t3Pi0", "2,479 kPa"); await has("t3T90", "7,61 dk"); await has("t3Status", "Denge"); ok(!(await read("t3Status")).includes("boşalırdı"), "varsayılanda sol kol boşalmaz");
      await range("t3h0", 50); await page.click("#t3End"); await settle(); await has("t3Dh", "20,96 cm"); await select("t3Sol", "nacl2"); await page.click("#t3End"); await settle(); await has("t3Naive", "50,71 cm");
      await range("t3c", 0.1); await range("t3c", 5); await range("t3T", 0); await range("t3T", 40); await range("t3h0", 5);
      await page.click("#t3Reset"); await settle(); await range("t3h0", 5); await page.click("#t3End"); await settle(); await has("t3Dh", "11,69 cm"); await has("t3Status", "sol kol boşalırdı"); await has("t3Status", "6,3 cm"); await range("t3h0", 7); await page.click("#t3End"); await settle(); ok(!(await read("t3Status")).includes("boşalırdı"), "h₀ = 7 cm geçerli"); await page.click("#t3Reset"); await settle();
      await has("t3ROPi", "29,69 bar"); await has("t3ROFit", "29,79 bar"); await has("t3ROrec", "%50,51"); await has("t3ROrecTh", "%50,51");
      await range("t3ROP", 20); await has("t3ROJ", "−19,4"); await has("t3ROrec", "—"); await has("t3ROStatus", "geri kazanım tanımlı değildir");
      await range("t3ROP", 0); await range("t3ROP", 100); await has("t3ROrecTh", "%70,31"); await select("t3ROi", "1.9"); await has("t3ROPi", "28,21 bar"); await range("t3ROc", 1); await range("t3ROc", 70);
      await has("t3Osm", "292,6 mOsm/L"); await has("t3VTh", "0,9947"); await page.waitForFunction(() => /denge/.test(document.getElementById("t3VN").textContent), null, { timeout: 15000 }); checks++; await has("t3V", "0,9947"); await has("t3CellStatus", "izotonik");
      await page.click("#t3Hypo"); await has("t3VTh", "1,5893"); await has("t3CellStatus", "Hipotonik"); await page.click("#t3Hyper"); await has("t3VTh", "0,6973"); await has("t3CellStatus", "Hipertonik");
      await range("t3Pct", 0); await has("t3VTh", "tanımsız"); await has("t3CellStatus", "sayı vermez"); await range("t3Pct", 0.2); await has("t3VD", "sayı verilmez");
      await range("t3b", 0); await range("t3b", 0.6); await range("t3Pct", 3);
      await page.click("#t3Reset"); await settle(); await has("t3Exact", "14,64 cm"); await has("t3ROPi", "29,69 bar"); await has("t3PctOut", "%0,90");
      await page.locator("h1").click(); await page.keyboard.press("Space"); ok((await read("t3Run")) === "Devam et", "Boşluk U borusunu duraklatır");
      // 4 · van 't Hoff ve molar kütle
      await page.click("#tab-vhf"); await settle();
      ok((await page.locator("#t4Rows tr").count()) === 6, "altı satırlı tablo"); await has("t4Rows", "0,1209 K"); await has("t4SelNote", "%70");
      await has("t4M", "132,3 g/mol"); await has("t4MU", "± 3,1 g/mol"); await has("t4MTrue", "saklı");
      await page.check("#t4Show"); await has("t4MTrue", "128,17 g/mol");
      await page.click("#t4Cover"); await has("t4Cov", "17 / 20"); await has("t4CovN", "%88");
      await range("t4Sig", 0); await has("t4M", "128,2 g/mol"); await range("t4Off", 0.05); await has("t4M", "128,2 g/mol"); await has("t4a", "+0,0500 K"); await has("t4Status", "kesişim");
      await range("t4Sig", 0.05); await range("t4N", 3); await range("t4W", 0.2); await range("t4Ms", 100); await has("t4M", ""); await range("t4N", 12); await range("t4W", 5); await range("t4Ms", 10); await range("t4Seed", 999); await range("t4Off", -0.1);
      await select("t4Solv", "benzene"); await select("t4Unk", "3"); await page.click("#t4NewSeed"); await has("t4SeedOut", "1");
      await page.click("#t4Reset"); await settle(); await has("t4M", "132,3 g/mol");
      await has("t4Pi", "791,6 Pa · 81,0 mm"); await has("t4PiN", "5,94 torr"); await has("t4Ratio", "269 kat"); await has("t4Mc", "ölçülemez"); await has("t4Mo", "62 306 g/mol");
      await page.click("#t4Small"); await has("t4PMOut", "1 kg/mol"); ok(!(await read("t4Mc")).includes("ölçülemez"), "küçük molekülde kriyoskopi ölçer"); await range("t4PM", 1000); await range("t4Pc", 1); await range("t4Pc", 50); await range("t4PT", 0); await range("t4PT", 40);
      await page.click("#t4Hb"); await has("t4Ratio", "269 kat");
      // sekme klavyesi
      await page.locator("#tab-vhf").focus(); await page.keyboard.press("Home"); ok((await page.locator("#tab-raoult").getAttribute("aria-selected")) === "true", "Home");
      await page.keyboard.press("ArrowLeft"); ok((await page.locator("#tab-vhf").getAttribute("aria-selected")) === "true", "sola sarar"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-raoult").getAttribute("aria-selected")) === "true", "sağa sarar"); await page.keyboard.press("End"); ok((await page.locator("#tab-vhf").getAttribute("aria-selected")) === "true", "End");
      for (const t of ["raoult", "dt", "osm", "vhf"]) { await page.click("#tab-" + t); await settle(80); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "yatay taşma yok " + t + " " + width); }
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
  console.log(`Çözeltiler: ${checks - before} kalıcı tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
}
