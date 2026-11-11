// G · yildiz-yasam-dongusu.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini YENİDEN KULLANMAZ:
// Güneş oranlı Stefan–Boltzmann, Planck tayfının sayısal tümlevi (σ ve Wien tepe noktası), Kim ve ark. (2002)
// Planck geometrik yeri yaklaşımı (renklilik), NASA GM☉ ile Schwarzschild yarıçapı, NASA yoğunlukları,
// kaynak tablolarının (OpenStax 18.3, 22.1, 22.4, 23.1) burada yeniden yazılmış değerleri.
// Kullanım: node scripts/check-g-yildiz-yasam-dongusu.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../yildiz-yasam-dongusu.html", import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.StarLab;
let checks = 0;
const near = (actual, expected, tol = 1e-9, label = "") => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(1, Math.abs(expected)), `${label} ${actual} ≠ ${expected} (tol ${tol})`);
  checks++;
};
const rel = (actual, expected, tol, label = "") => {
  assert(Number.isFinite(actual) && Math.abs(actual / expected - 1) <= tol, `${label} ${actual} ≠ ${expected} (göreli tol ${tol})`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };

/* ── Sabitler ve kaynak değerleri (açılan kaynaklardan burada yeniden yazıldı) ── */
near(K.SIGMA, 5.670374419e-8, 0); near(K.G, 6.6743e-11, 0); near(K.C, 299792458, 0);
near(K.SUN.L, 3.828e26, 0); near(K.SUN.R, 6.957e8, 0); near(K.SUN.T, 5772, 0); near(K.SUN.M, 1.9884e30, 0); near(K.SUN.rho, 1408, 0);
near(K.EARTH.M, 5.9722e24, 0); near(K.EARTH.R, 6.371e6, 0); near(K.M_CH, 1.4, 0); near(K.M_NS_MAX, 3, 0); near(K.FUSION_EFF, 0.007, 0);
ok(Object.isFrozen(K) && Object.isFrozen(K.STARS) && Object.isFrozen(K.STARS[0]) && Object.isFrozen(K.MS_TABLE), "çekirdek dondurulmuş");
const T183 = [["M0", 0.4, 0.05, 3500, 0.6], ["K0", 0.8, 0.35, 5000, 0.8], ["G0", 1.1, 1.4, 6000, 1.1], ["F0", 1.7, 5, 7500, 1.4], ["A0", 3.3, 55, 10000, 2.5], ["B0", 16, 2.7e4, 28000, 7], ["O5", 40, 7e5, 40000, 18]];
T183.forEach((r, i) => { const q = K.MS_TABLE[i]; ok(q.type === r[0] && q.M === r[1] && q.L === r[2] && q.T === r[3] && q.R === r[4], "Tablo 18.3 satırı " + r[0]); });
const T221 = [["M0", 3750, 0.4, 2e11], ["K0", 5240, 0.8, 1.4e10], ["G0", 6050, 1.1, 9e9], ["F0", 7350, 1.7, 2.7e9], ["A0", 9600, 3.3, 5e8], ["B0", 29200, 16, 1e7], ["O5", 54000, 40, 1e6]];
T221.forEach((r, i) => { const q = K.LIFE_TABLE[i]; ok(q.type === r[0] && q.T === r[1] && q.M === r[2] && q.t === r[3], "Tablo 22.1 satırı " + r[0]); });
const T224 = [[1.1e10, 6000, 1, 1], [1.3e9, 3100, 2300, 165], [1e8, 4800, 50, 10], [2e7, 3100, 5200, 180]];
T224.forEach((r, i) => { const q = K.SUN_STAGES[i]; ok(q.t === r[0] && q.T === r[1] && q.L === r[2] && q.D === r[3], "Tablo 22.4 satırı " + i); });
const CAT = { sun: [5772, 1, 1], siriusA: [9845, 24.74, 1.7144], siriusB: [25369, 0.02448, 0.008098], proxima: [2833, 0.001567, 0.162], arcturus: [4286, 170, 25.4], aldebaran: [3900, 439, 45.1], betelgeuse: [3779, 87100, 764], rigel: [12100, 120000, 74.1], deneb: [8900, 117500, 138], eri40B: [12000, 1 / 275, 0.014], ross614B: [2700, 1 / 2000, 0.1] };
for (const s of K.STARS) { const c = CAT[s.id]; ok(c && s.T === c[0] && Math.abs(s.L / c[1] - 1) < 1e-12 && s.R === c[2], "katalog " + s.id); }
ok(K.STARS.length === Object.keys(CAT).length, "katalog sayısı");

/* ── 1. Stefan–Boltzmann: Güneş oranlı bağımsız biçim, gidiş-dönüş ── */
const TS = 5772;
const rSol = (L, T) => Math.sqrt(L) * (TS / T) ** 2, lSol = (R, T) => R * R * (T / TS) ** 4, tSol = (L, R) => TS * Math.pow(L / (R * R), 0.25);
// IAU nominal L☉, R☉, T☉ birbirini tutar: 4πR²σT⁴ = 3.828×10²⁶ W (göreli 2.4×10⁻⁶)
rel(4 * Math.PI * 6.957e8 ** 2 * 5.670374419e-8 * 5772 ** 4, 3.828e26, 5e-6, "IAU nominal tutarlılığı");
for (const T of [2000, 2833, 3779, 5772, 9845, 25369, 50000, 1e5]) for (const L of [1e-5, 0.02448, 1, 439, 1.2e5, 1e7]) {
  const R = K.solve("R", { L, T }).R; rel(R, rSol(L, T), 5e-6, "R");
  rel(K.solve("L", { R, T }).L, L, 1e-12, "L geri"); rel(K.solve("T", { L, R }).T, T, 1e-12, "T geri");
  rel(K.solve("L", { R: 3.3, T }).L, lSol(3.3, T), 1e-5, "L"); rel(K.solve("T", { L, R: 0.7 }).T, tSol(L, 0.7), 3e-6, "T");
}
// katalog tutarlılığı: R(SB) / R(katalog) − 1 (yüzde), burada elle hesaplanan değerler
const EXP = { sun: 0, siriusA: -0.27, siriusB: 0.02, proxima: 1.43, arcturus: -6.90, aldebaran: 1.76, betelgeuse: -9.88, rigel: 6.38, deneb: 4.48, eri40B: -0.35, ross614B: 2.19 };
for (const s of K.STARS) near((rSol(s.L, s.T) / s.R - 1) * 100, EXP[s.id], 0.01 / Math.max(1, Math.abs(EXP[s.id])), "SB katalog " + s.id);
// Tablo 18.3 yarıçapları: SB ile en çok % 6
for (const r of K.MS_TABLE) ok(Math.abs(rSol(r.L, r.T) / r.R - 1) < 0.06, "Tablo 18.3 SB " + r.type);
// Tablo 22.4: kırmızı dev ve helyum evreleri SB'ye uyar, “yeniden dev” uymaz (T en düşük, L en yüksek aynı satırda)
ok(Math.abs(rSol(2300, 3100) / 165 - 1) < 0.02 && Math.abs(rSol(50, 4800) / 10 - 1) < 0.03 && rSol(5200, 3100) / 180 > 1.35, "Tablo 22.4 SB");
for (const bad of [() => K.radius(0, 5000), () => K.radius(1, -1), () => K.luminosity(NaN, 5000), () => K.temperature(1, 0), () => K.solve("X", { L: 1, R: 1, T: 1 })]) { assert.throws(bad); checks++; }

/* ── 2. Planck: σ ve Wien tepe noktası sayısal tümlevle; renk Kim ve ark. Planck yeriyle ── */
const h = 6.62607015e-34, c = 299792458, k = 1.380649e-23;
const B = (lam, T) => (2 * h * c * c) / lam ** 5 / Math.expm1((h * c) / (lam * k * T));
for (const T of [3000, 5772, 25000]) {
  // Simpson, ln λ üzerinde
  const a = Math.log(1e-9), b = Math.log(1e-2), n = 20000, dx = (b - a) / n;
  let s = 0; for (let i = 0; i <= n; i++) { const lam = Math.exp(a + i * dx), f = B(lam, T) * lam; s += f * (i === 0 || i === n ? 1 : i % 2 ? 4 : 2); }
  rel(Math.PI * s * dx / 3, K.surfaceFlux(T), 1e-8, "σT⁴ tümlevi " + T);
  let lo = 1e-8, hi = 1e-5; for (let i = 0; i < 200; i++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (B(m1, T) < B(m2, T)) lo = m1; else hi = m2; }
  rel(K.wienPeak(T), (lo + hi) / 2, 1e-7, "Wien " + T);
}
function kim(T) {
  const x = T <= 4000 ? -0.2661239e9 / T ** 3 - 0.2343589e6 / T ** 2 + 0.8776956e3 / T + 0.17991 : -3.0258469e9 / T ** 3 + 2.1070379e6 / T ** 2 + 0.2226347e3 / T + 0.24039;
  const y = T <= 2222 ? -1.1063814 * x ** 3 - 1.3481102 * x ** 2 + 2.18555832 * x - 0.20219683 : T <= 4000 ? -0.9549476 * x ** 3 - 1.37418593 * x ** 2 + 2.09137015 * x - 0.16748867 : 3.081758 * x ** 3 - 5.8733867 * x ** 2 + 3.75112997 * x - 0.37001483;
  return [x, y];
}
for (const T of [2000, 2833, 3500, 4500, 5772, 6500, 9845, 15000, 25000]) { const q = K.colour(T), [x, y] = kim(T); ok(Math.abs(q.x - x) < 0.002 && Math.abs(q.y - y) < 0.002, `renklilik ${T}: (${q.x}, ${q.y}) ≠ (${x}, ${y})`); }
{ const r = K.colour(3000).rgb, b = K.colour(25000).rgb; ok(r[0] === 255 && r[2] < r[1] && r[1] < r[0], "3000 K turuncu"); ok(b[2] === 255 && b[0] < b[2], "25000 K mavimsi"); ok(/^#[0-9a-f]{6}$/.test(K.colour(5772).hex), "hex"); }

/* ── 3. Ana dizi: üs yasası, tablo ara değeri, enerji bütçesi, üs uydurma ── */
const ll = (xs, ys, x) => { // bağımsız log–log ara değer (ikili arama)
  if (x < xs[0] || x > xs[xs.length - 1]) return null;
  let i = 0, j = xs.length - 1; while (j - i > 1) { const m = (i + j) >> 1; if (xs[m] <= x) i = m; else j = m; }
  const w = Math.log10(x / xs[i]) / Math.log10(xs[j] / xs[i]); return 10 ** ((1 - w) * Math.log10(ys[i]) + w * Math.log10(ys[j]));
};
for (const M of [0.4, 0.5, 1, 1.1, 2, 3.3, 7, 16, 25, 40]) {
  rel(K.tableLum(M), ll(T183.map((r) => r[1]), T183.map((r) => r[2]), M), 1e-9, "L tablo " + M);
  rel(K.tableLife(M), ll(T221.map((r) => r[2]), T221.map((r) => r[3]), M), 1e-9, "t tablo " + M);
  for (const a of [2, 3, 3.5, 3.9, 4.5, 5]) { rel(K.powerLum(M, a), Math.exp(a * Math.log(M)), 1e-12); rel(K.lifetime(M, K.powerLum(M, a), 1e10), 1e10 / M ** (a - 1), 1e-12, "ömür"); }
}
ok(K.tableLum(0.39) === null && K.tableLum(41) === null && K.tableLife(0.3) === null && K.tableLife(100) === null, "tablo dışı tanımsız");
near(K.tableLum(1), 0.9245645, 1e-6); near(K.tableLife(1) / 1e9, 10.272402, 1e-6);
// enerji bütçesi: 0.1 × 0.007 × M☉c² / L☉, Jülyen yılı
rel(K.energyLife(1, 1, 0.1), (0.1 * 0.007 * 1.9884e30 * c * c) / 3.828e26 / 31557600, 1e-12); near(K.energyLife(1, 1, 0.1) / 1e9, 10.35541, 1e-5, "Güneş enerji bütçesi");
rel(K.burnRate(1), 3.828e26 / (0.007 * c * c), 1e-12); near(K.burnRate(1) / 1e11, 6.0846, 1e-4, "saniyede yakılan H");
{ // normal denklemler (Cramer) ile bağımsız eğim
  const fit = (rows) => { const n = rows.length, X = rows.map((r) => Math.log10(r[1])), Y = rows.map((r) => Math.log10(r[2])); const sx = X.reduce((a, b) => a + b), sy = Y.reduce((a, b) => a + b), sxx = X.reduce((a, b) => a + b * b, 0), sxy = X.reduce((a, b, i) => a + b * Y[i], 0); return (n * sxy - sx * sy) / (n * sxx - sx * sx); };
  rel(K.fitExponent(0, 100).a, fit(T183), 1e-12, "uydurma bütün"); rel(K.fitExponent(0, 1.7).a, fit(T183.slice(0, 4)), 1e-12); rel(K.fitExponent(3.3, 100).a, fit(T183.slice(4)), 1e-12);
  near(K.fitExponent(0, 100).a, 3.6415, 1e-4); near(K.fitExponent(0, 1.7).a, 3.2289, 1e-3); near(K.fitExponent(3.3, 100).a, 3.80321, 1e-5);
  const loc = K.localExponents().map((q) => q.a), ref = [];
  for (let i = 0; i < 6; i++) ref.push(Math.log10(T183[i + 1][2] / T183[i][2]) / Math.log10(T183[i + 1][1] / T183[i][1]));
  loc.forEach((a, i) => rel(a, ref[i], 1e-12, "yerel üs")); ok(Math.min(...loc) > 2.8 && Math.min(...loc) < 2.82 && Math.max(...loc) > 4.34 && Math.max(...loc) < 4.36, "yerel üs 2.8–4.4");
}
// Tablo 22.1 ömürleri M/L ile ölçeklenir mi? Ömürden okunan üs ≈ 3.65
{ const X = T221.map((r) => Math.log10(r[2])), Y = T221.map((r) => Math.log10(r[3])); const fs2 = K.fitSlope(T221.map((r) => r[2]), T221.map((r) => r[3])); ok(fs2.slope < -2.5 && fs2.slope > -2.8, "ömür eğimi " + fs2.slope); checks += X.length && Y.length ? 0 : 0; }

/* ── 4. Son durak, yoğunluk, Schwarzschild ── */
const ends = [[0.005, "planet"], [0.01, "bd"], [0.05, "bd"], [0.08, "wdHe"], [0.2, "wdHe"], [0.25, "wdCO"], [1, "wdCO"], [7.99, "wdCO"], [8, "wdONe"], [9.99, "wdONe"], [10, "ns"], [25, "ns"], [39.9, "ns"], [40, "bh"], [150, "bh"]];
for (const [M, key] of ends) ok(K.endState(M).key === key, `son durak ${M} → ${K.endState(M).key}`);
ok(K.endState(1).edge === null && K.endState(7).edge === 8 && K.endState(45).edge === 40 && K.endState(0.075).edge === 0.08 && K.endState(12.5).edge === 10 && K.endState(13).edge === null, "sınır yakınlığı");
assert.throws(() => K.endState(0)); checks++;
rel(K.schwarzschild(K.SUN.M), (2 * 1.32712e20) / (c * c), 2e-4, "r_s Güneş (NASA GM)"); near(K.schwarzschild(K.SUN.M), 2953.235, 1e-5);
ok(Math.abs(K.schwarzschild(K.SUN.M) / 3000 - 1) < 0.02 && Math.abs(K.schwarzschild(K.EARTH.M) / 0.01 - 1) < 0.12, "OpenStax: 3 km, 1 cm");
for (const m of [1, 1e10, 5.9722e24, 4e36]) rel(K.schwarzschild(m), (2 * 6.6743e-11 * m) / 299792458 ** 2, 1e-12);
rel(K.density(K.SUN.M, K.SUN.R), 1408, 0.0015, "Güneş yoğunluğu NASA"); rel(K.density(K.EARTH.M, K.EARTH.R), 5513, 0.0002, "Dünya yoğunluğu NASA");
rel(K.density(1.018 * K.SUN.M, 5.634e6), (1.018 * 1.9884e30) / ((4 / 3) * Math.PI * 5.634e6 ** 3), 1e-12); near(K.density(1.018 * K.SUN.M, 5.634e6) / 1e9, 2.70217, 1e-5, "Sirius B yoğunluğu");
{ const ns = K.density(1.4 * K.SUN.M, 1e4); ok(ns > 1e17 && ns < 1e18, "nötron yıldızı 10¹⁷ mertebesi"); near(ns / 1e17, 6.64574, 1e-5); }
{ const m = 1e6 * K.SUN.M, rs = K.schwarzschild(m); rel(K.density(m, rs), K.density(K.SUN.M, K.schwarzschild(K.SUN.M)) / 1e12, 1e-9, "ρ_rs ∝ M⁻²"); }

/* ── 5. H-R sınıflaması ── */
const CLS = { sun: "ms", siriusA: "ms", siriusB: "wd", proxima: "ms", arcturus: "giant", aldebaran: "giant", betelgeuse: "sg", rigel: "sg", deneb: "sg", eri40B: "wd", ross614B: "ms" };
for (const s of K.STARS) ok(K.classify(s.T, s.L).key === CLS[s.id], "sınıf " + s.id + " → " + K.classify(s.T, s.L).key);
for (const r of K.MS_TABLE) { ok(K.classify(r.T, r.L).key === "ms", "Tablo 18.3 ana dizide " + r.type); near(K.msLogL(r.T), Math.log10(r.L), 1e-12); }
ok(K.msLogL(2000) === null && K.msLogL(50000) === null, "ana dizi çizgisi dışı");
ok(K.classify(3980, 1000).key === "giant" && Math.abs(K.classify(3980, 1000).R - rSol(1000, 3980)) < 1e-4, "varsayılan nokta dev");
console.log(`G yildiz-yasam-dongusu: ${checks} bağımsız denetim PASS`);

/* ── Tarayıcı ── */
if (process.argv.includes("--browser")) {
  const { createRequire } = await import("node:module");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const { chromium } = createRequire(join(root, "package.json"))("playwright");
  const server = createServer((req, res) => {
    const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
    res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream");
    res.end(fs.readFileSync(file));
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let browser;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const before = checks;
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width === 390 ? 2 : 1, locale: "tr-TR" });
      await ctx.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(6000);
      const errors = []; page.on("pageerror", (e) => errors.push(e.message)); page.on("console", (m) => { if (m.type() === "error" && !/404/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/yildiz-yasam-dongusu.html`);
      const read = async (id) => (await page.locator("#" + id).textContent()).trim();
      const has = async (id, t) => { const s = await read(id); assert(s.includes(t), `[${width}] #${id}: "${s}" içinde "${t}" yok`); checks++; };
      const eq = (a, b, label) => { assert.equal(a, b, `[${width}] ${label || ""}`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, v);
      const pick = (id, v) => page.locator("#" + id).selectOption(v);
      const type = async (id, v) => { await page.locator("#" + id).fill(v); await page.locator("#" + id).dispatchEvent("change"); };
      const clean = async (sel) => { const t = await page.locator(sel).innerText(); assert(!/NaN|Infinity|undefined|null/.test(t), `[${width}] ${sel} bozuk sayı: ${t.match(/.{0,30}(NaN|Infinity|undefined|null).{0,30}/)?.[0]}`); checks++; };
      const noOverflow = async () => eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "yatay taşma");
      const drawn = async (id) => eq(await page.evaluate((id) => { const c = document.getElementById(id), d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++; return n > 500; }, id), true, id + " boş");

      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content input, .app-content select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).length), 0, "etiketsiz denetim");
      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].filter((c) => c.getAttribute("role") !== "img" || !c.getAttribute("aria-label")).length), 0, "rolsüz tuval");
      eq(await page.evaluate(() => Object.isFrozen(StarLab) && !Object.getOwnPropertyDescriptor(window, "StarLab").writable), true, "çekirdek salt okunur");
      eq(await page.evaluate(() => /[̂̄̅̇⃗]/.test(document.body.innerText)), false, "birleşik işaret");

      /* 01 */
      await has("lRes", "1.000 R☉"); await has("lCat", "1.000 R☉"); await has("lDiff", "+0.00 %"); await has("lLW", "3.828×10²⁶ W"); await has("lPeak", "502.0 nm"); await has("lColour", "#fff1ea"); await has("lStatus", "ana dizi bandında");
      await pick("lStar", "siriusB"); await has("lRes", "0.008099 R☉"); await has("lDiff", "+0.02 %"); await has("lStatus", "Dünya'nınkinin 0.884 katı"); await has("lRkm", "5635 km");
      await pick("lStar", "betelgeuse"); await has("lRes", "688.5 R☉"); await has("lDiff", "−9.88 %"); await has("lStatus", "AU'ya uzanırdı"); await has("lPeak", "766.8 nm"); await has("lPeakBand", "kızılötesinde");
      await pick("lSolve", "L"); await has("lRes", "107200 L☉"); await has("lDiff", "+23.13 %"); eq(await page.locator("#lL").isDisabled(), true, "L kilitli");
      await pick("lSolve", "T"); await pick("lStar", "proxima"); await has("lRes", "2853 K"); await has("lDiff", "+0.71 %");
      await type("lL", "abc"); await has("lStatus", "Geçersiz giriş"); await type("lL", "1e9"); await has("lStatus", "aralığına çekildi"); eq(await page.locator("#lStar").inputValue(), "custom", "serbest"); await has("lCat", "—"); await clean("#panel-lts");
      await type("lR", "0,5"); eq(await page.locator("#lR").inputValue(), "0.5", "ondalık virgül"); await range("lTs", 3.3); await range("lRs", 3.5); await clean("#panel-lts");
      await pick("lSolve", "R"); await range("lTs", 4.7); await range("lLs", -5); await clean("#panel-lts"); await has("lStatus", "kara cisim yaklaşımı");
      await page.locator("#lReset").click(); await has("lRes", "1.000 R☉"); eq(await page.locator("#lStar").inputValue(), "sun", "sıfırla");
      await pick("lStar", "rigel"); await page.locator("h1").click(); await page.keyboard.press("r"); await has("lRes", "1.000 R☉");
      await page.locator("#lT").focus(); await page.keyboard.press("r"); eq(await page.locator("#lStar").inputValue(), "sun", "form içinde R yok sayılır");
      await drawn("lStage"); await drawn("lHR"); await noOverflow();

      /* 02 */
      await page.locator("#tab-hr").click();
      await has("hrTv", "3980 K"); await has("hrLv", "1000 L☉"); await has("hrRv", "66.51 R☉"); await has("hrBetween", "10 ile 100 R☉"); await has("hrRegion", "Dev bölgesi"); await has("hrNear", "Aldebaran");
      await type("hrGuess", "50"); await has("hrGuessDiff", "−24.82 %"); await has("hrGuessDiff", "iki kat içinde"); await type("hrGuess", "x"); await has("hrGuessOut", "geçersiz");
      await pick("hrStar", "siriusB"); await has("hrRv", "0.008099 R☉"); await has("hrRegion", "Beyaz cüce"); await has("hrStatus", "fark +0.02 %");
      await pick("hrStar", "deneb"); await has("hrRegion", "Süperdev"); await pick("hrStar", "proxima"); await has("hrRegion", "Ana dizi");
      eq(await page.locator("#hrRows tr").count(), 18, "örnek satırları"); await has("hrRows", "−9.88 %");
      await range("hrT", 4.75); await range("hrL", -4.5); await clean("#panel-hr"); await has("hrMS", "tanımlı değil");
      await range("hrT", 3.3); await range("hrL", 6.5); await clean("#panel-hr");
      await page.locator("#hrCanvas").focus(); const t0 = await read("hrTv"); await page.keyboard.press("ArrowLeft"); assert.notEqual(await read("hrTv"), t0); checks++;
      await page.keyboard.press("Shift+ArrowDown"); await clean("#panel-hr");
      const box = await page.locator("#hrCanvas").boundingBox(); await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5); eq(await page.locator("#hrStar").inputValue(), "custom", "tıklama"); await clean("#panel-hr");
      await page.locator("#hrTrack").check(); await page.waitForTimeout(80);
      await page.locator("#hrReset").click(); await has("hrRv", "66.51 R☉"); eq(await page.locator("#hrTrack").isChecked(), false, "sıfırla iz");
      await drawn("hrCanvas"); await noOverflow();

      /* 03 */
      await page.locator("#tab-life").click();
      await has("tLp", "1.000 L☉"); await has("tLt", "0.9246 L☉"); await has("tLtDiff", "+8.16 %"); await has("tTp", "10.0 milyar yıl"); await has("tTt", "10.3 milyar yıl"); await has("tTtDiff", "−2.65 %");
      await has("tTe", "10.4 milyar yıl"); await has("tTeNote", "+3.55 %"); await has("tBurn", "6.08×10¹¹ kg/s"); await has("tFit", "3.64"); await has("tFitNote", "M ≤ 1.7: 3.23"); await has("tFitNote", "M ≥ 3.3: 3.80");
      eq(await page.locator("#tRows tr").count(), 7, "ömür satırları"); await has("tLifeNote", "−60.00 %"); await has("tLifeNote", "+63.27 %"); await has("tLifeNote", "a ≈ 3.57"); await has("tLifeNote", "3.64");
      await page.locator("#tPre33").click(); await has("tTp", "314 milyon yıl"); await has("tTt", "500 milyon yıl"); await has("tTtDiff", "−37.29 %");
      await page.locator("#tPre40").click(); await has("tTp", "226 bin yıl"); await has("tStatus", "tek üslü yasa burada kabadır"); await has("tTt", "1.00 milyon yıl"); eq(/1000 bin/.test(await page.locator("#panel-life").innerText()), false, "1000 bin yıl biçimi");
      await range("tA", 2.5); await has("tTp", "39.5 milyon yıl"); await range("tA", 3.9);
      await page.locator("#tPre04").click(); await has("tTt", "200 milyar yıl"); await page.locator("#tPre16").click(); await has("tTt", "10.0 milyon yıl"); await page.locator("#tPre1").click();
      await pick("tSun", "1.1e10"); await has("tTp", "11.0 milyar yıl"); await range("tF", 0.3); await has("tTe", "31.1 milyar yıl");
      await type("tM", "0.06"); await has("tStatus", "kahverengi cüce"); await has("tTp", "—"); await clean("#panel-life");
      await type("tM", "500"); await has("tStatus", "aralığına çekildi"); await has("tMOut", "100 M☉"); await clean("#panel-life");
      await type("tM", "0.2"); await has("tStatus", "0.4–40 M☉ aralığının dışında"); await type("tM", "q"); await has("tStatus", "Geçersiz giriş");
      await range("tMs", -1.3); await clean("#panel-life"); await range("tMs", 2); await clean("#panel-life");
      await page.locator("#tReset").click(); await has("tTp", "10.0 milyar yıl"); await has("tAOut", "3.9");
      await drawn("tChartL"); await drawn("tChartT"); await noOverflow();

      /* 04 */
      await page.locator("#tab-end").click();
      await has("eState", "Karbon–oksijen beyaz cüce"); await has("eRho", "2.70×10⁹ kg/m³"); await has("eLimit", "1.018 ≤ 1.4 M☉"); await has("eRs", "2.953 km"); await has("eRsCheck", "−1.56 %"); await has("eStatus", "2.46×10⁸ kat");
      eq(await page.locator("#eRows tr").count(), 5, "evre satırları"); await has("eRows", "11.0 milyar yıl"); await has("eTimeCap", "% 88.6");
      await pick("eRem", "ns"); await has("eRho", "6.65×10¹⁷ kg/m³"); await has("eRhoCheck", "oran 6.6"); await has("eLimit", "1.40 < 3 M☉"); await has("eCompact", "R / rₛ = 2.42");
      await pick("eRem", "sun"); await has("eRhoCheck", "fark +0.13 %"); await pick("eRem", "earth"); await has("eRhoCheck", "fark +0.01 %");
      await pick("eSU", "mearth"); await has("eRs", "8.870 mm"); await has("eRsCheck", "−11.30 %"); await pick("eSU", "kg"); await type("eSM", "1e40"); await has("eRs", "1.485×10¹⁰ km"); await clean("#panel-end");
      for (const [m, st] of [["0.005", "Gezegen"], ["0.05", "Kahverengi"], ["0.2", "Helyum"], ["9", "Oksijen–neon"], ["20", "nötron yıldızı"], ["60", "kara delik"]]) { await type("eM", m); await has("eState", st); }
      await type("eM", "7.5"); await has("eStateNote", "8 M☉ sınırına yakın"); await has("eStatus", "ara rapor");
      await type("eRM", "2"); eq(await page.locator("#eRem").inputValue(), "custom", "serbest kalıntı"); await type("eRR", "8"); await has("eLimit", "2.00 < 3 M☉"); await type("eRM", "5"); await has("eLimitNote", "durduramaz");
      await type("eRR", "5"); await has("eCompactNote", "kara delik olurdu"); await type("eRR", "-3"); await has("eStatus", "Geçersiz giriş");
      await range("eMs", -2.5); await clean("#panel-end"); await range("eMs", 2.3); await clean("#panel-end");
      await pick("eTS", "log"); await page.waitForTimeout(80); await drawn("eTime");
      await page.locator("#eReset").click(); await has("eRho", "2.70×10⁹ kg/m³"); eq(await page.locator("#eTS").inputValue(), "lin", "sıfırla ölçek");
      await drawn("eStrip"); await drawn("eDens"); await drawn("eTime"); await noOverflow();

      // sekme klavyesi
      await page.locator("#tab-end").focus(); await page.keyboard.press("Home"); eq(await page.locator("#tab-lts").getAttribute("aria-selected"), "true", "Home");
      await page.keyboard.press("ArrowRight"); eq(await page.locator("#panel-hr").isVisible(), true, "sağ ok"); await page.keyboard.press("End"); eq(await page.locator("#tab-end").getAttribute("aria-selected"), "true", "End");
      await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-lts").getAttribute("aria-selected"), "true", "sarma"); await page.keyboard.press("ArrowLeft"); eq(await page.locator("#tab-end").getAttribute("tabindex"), "0", "tabindex");
      assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      console.log(`G yildiz-yasam-dongusu: ${width} px ${theme} · ${checks - before} arayüz denetimi PASS`);
      await ctx.close();
    }
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
