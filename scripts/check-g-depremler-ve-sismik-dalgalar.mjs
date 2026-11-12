// Depremler ve sismik dalgalar: çekirdeğin bağımsız denetimi (kapalı biçimler, kaba kuvvet arama, ayrık beklenen
// değerler, Monte Carlo kapsama) ve isteğe bağlı tarayıcı denetimi (390 px açık, 1280 px koyu).
// Kullanım: node scripts/check-g-depremler-ve-sismik-dalgalar.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "depremler-ve-sismik-dalgalar";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.SeismoLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");

/* ── 1. Elastik hızlar: Lamé biçimi ve ν ── */
for (const Kb of [0, 0.5, 2.2, 50, 300, 1200]) for (const mu of [0, 0.1, 1, 30, 100, 300]) for (const rho of [1000, 2700, 13000]) {
  if (Kb === 0 && mu === 0) continue;
  const e = K.elastic({ K: Kb, mu, rho }), lam = (Kb - 2 * mu / 3) * 1e9, G = mu * 1e9;
  near(e.vP, Math.sqrt((lam + 2 * G) / rho), 1e-12, "v_P Lamé"); near(e.vS, Math.sqrt(G / rho), 1e-12, "v_S");
  near(e.nu, lam / (2 * (lam + G)), 1e-9, "ν Lamé");
  if (mu > 0) { ok(e.ratio >= Math.sqrt(4 / 3) - 1e-12, "oran ≥ √(4/3) (K ≥ 0)"); near(K.nuFromRatio(e.ratio), e.nu, 1e-9, "ν(oran)"); if (e.nu > -1 && e.nu < 0.5) near(K.ratioFromNu(e.nu), e.ratio, 1e-9, "oran(ν)"); }
  else { ok(e.ratio === Infinity && e.fluid, "sıvı"); near(e.nu, 0.5, 1e-12, "sıvıda ν = 0,5"); }
}
near(K.ratioFromNu(0.25), Math.sqrt(3), 1e-14, "ν = 0,25 → √3"); near(K.ratioFromNu(0), Math.SQRT2, 1e-14, "ν = 0 → √2");
assert.throws(() => K.elastic({ K: -1, mu: 1, rho: 1000 })); assert.throws(() => K.elastic({ K: 1, mu: 1, rho: 0 })); checks += 2;
near(K.elastic({ K: 2.2, mu: 0, rho: 1000 }).vP, 1483.24, 1e-5, "su");

/* ── Sonlu farklar: ölçülen hız, h² yakınsaması, Courant = 1'de tam kayma ── */
for (const [Kb, mu, rho] of [[50, 30, 2700], [10, 2, 2000], [50, 1, 2700], [300, 100, 3300], [1100, 0, 11000], [2.2, 0, 1000], [1, 30, 2700]]) {
  const s = K.waveSim({ K: Kb, mu, rho }), r = s.run();
  near(r.vPm, s.e.vP, 1e-3, "v_P ölçülen"); ok(Math.abs(r.vPm / s.e.vP - 1) < 6e-4, "P hatası < %0,06");
  if (mu > 0) { near(r.vSm, s.e.vS, 1e-3, "v_S ölçülen"); ok(r.tS[0] > r.tP[0], "S, P'den sonra"); }
  else { ok(r.vSm === null && r.tS.every((t) => t === null), "sıvıda S yok"); ok(s.fields[1].cur.every((v, i) => v === s.fields[1].old[i]), "μ = 0'da enine alan donuk"); }
  // tepe anı: kaynaktan R₁'e kadar sürekli çözüm g(x − x0 − ct) ile karşılaştır
  near(r.tP[0], 15000 / s.e.vP, 2e-3, "R₁ varışı");
}
{
  const err = (h) => { const s = K.waveSim({ K: 50, mu: 30, rho: 2700, h }); const r = s.run(); return [r.vPm / s.e.vP - 1, r.vSm / s.e.vS - 1]; };
  const [a, b, c] = [err(100), err(50), err(25)];
  for (const k of [0, 1]) { ok(Math.abs(a[k] / b[k] - 4) < 0.15 && Math.abs(b[k] / c[k] - 4) < 0.15, `h² yakınsaması ${a[k]} ${b[k]} ${c[k]}`); ok(a[k] < 0, "dağınım hızı küçültür"); }
  near(a[0], -0.000416, 0.02, "Δx = 100 m P hatası"); near(b[0], -0.000104, 0.02, "Δx = 50 m P hatası");
  const s = K.waveSim({ K: 50, mu: 30, rho: 2700, cfl: 1 }); for (let n = 0; n < 200; n++) s.step(); // Courant 1: ayrık şema tam kayar
  const g = (x) => Math.exp(-0.5 * (x / 1500) ** 2);
  for (const i of [215, 250, 300, 340]) near(s.fields[0].cur[i], g(i * 100 - 5000 - 200 * 100), 1e-9, "tam öteleme");
}
{ const s = K.waveSim({ K: 0, mu: 0, rho: 2700 }); ok(s.none && s.done, "dalga yok"); }
{ const s = K.waveSim({ K: 50, mu: 0.1, rho: 13000 }); const r = s.run(); ok(s.done && r.vSm === null && r.vPm !== null && s.t >= s.tMax - s.dt, "çok yavaş S süre içinde varmaz"); }
{ // Mur sınırı: atma çıktıktan sonra alanda yansıma kalmaz
  const s = K.waveSim({ K: 50, mu: 30, rho: 2700, rec: [20000, 58000], tMax: 30 }); while (!s.done && s.t < 16) s.step(); ok(s.t >= 16 - s.dt, "benzetim 16 s'ye ulaştı"); ok(Math.max(...s.fields[0].cur.map(Math.abs)) < 0.02, "Mur sınırı yansıtmaz");
}

/* ── 2. Merkez üssü: kaba kuvvet ızgarası, kesin gecikme, seçici yanlılığı ── */
for (const vP of [5, 6, 7.5]) for (const vS of [2.5, 3.5, 4.2]) for (const d of [5, 80, 250]) { const dt = d / vS - d / vP; near(K.sdist(dt, vP, vS), d, 1e-12, "d(Δt)"); }
ok(K.sdist(3, 3.5, 3.5) === null && K.sdist(3, 3, 3.5) === null, "v_P ≤ v_S tanımsız");
near(K.sdist(1, 6, 3.5), 8.4, 1e-12, "8,4 km/s");
function brute(sts, ds) { let best = null, bf = Infinity; for (let x = -50; x <= 250; x += 1) for (let y = -50; y <= 200; y += 1) { let f = 0; sts.forEach((s, i) => { f += (Math.hypot(x - s.x, y - s.y) - ds[i]) ** 2; }); if (f < bf) { bf = f; best = [x, y]; } } let h = 0.5; while (h > 1e-7) { let moved = false; for (const [dx, dy] of [[h, 0], [-h, 0], [0, h], [0, -h]]) { let f = 0; sts.forEach((s, i) => { f += (Math.hypot(best[0] + dx - s.x, best[1] + dy - s.y) - ds[i]) ** 2; }); if (f < bf) { bf = f; best = [best[0] + dx, best[1] + dy]; moved = true; } } if (!moved) h /= 2; } return { x: best[0], y: best[1], f: bf }; }
for (const seed of [1, 2, 3, 7, 11]) for (const n of [3, 4, 5]) {
  const ev = K.makeEvent(seed), sts = K.STATIONS.slice(0, n);
  ok(ev.x >= 40 && ev.x <= 160 && ev.y >= 30 && ev.y <= 120 && ev.t0 >= 1 && ev.t0 <= 5, "olay sınırları");
  const exact = sts.map((s) => Math.hypot(ev.x - s.x, ev.y - s.y)), L = K.locate(sts, exact);
  near(L.x, ev.x, 1e-6, "kesin uzaklıkla konum x"); near(L.y, ev.y, 1e-6, "y"); ok(L.rms < 1e-6, "artık sıfır");
  const pert = exact.map((d, i) => d * 1.05 + (i % 2 ? 1.3 : -0.7)), Lp = K.locate(sts, pert), B = brute(sts, pert);
  ok(K.misfit(sts, pert, Lp.x, Lp.y) <= B.f * (1 + 1e-6) + 1e-9, "LM, kaba kuvvet minimumundan kötü değil");
}
let pickBias = 0, pickN = 0, worst = 0, velErr = 0;
for (let seed = 1; seed <= 20; seed++) {
  const ev = K.makeEvent(seed), recs = K.STATIONS.map((s, i) => K.synth(ev, s, i, 0.03, seed));
  recs.forEach((r, i) => { near(r.tP, ev.t0 + r.d / 6, 1e-12, "t_P"); near(r.tS, ev.t0 + r.d / 3.5, 1e-12, "t_S"); const p = K.autoPick(r.z), s = K.autoPick(r.tr); ok(Math.abs(p - r.tP) < 0.15 && Math.abs(s - r.tS) < 0.25, `seçim ${seed}/${i}: ${p - r.tP} ${s - r.tS}`); pickBias += Math.abs(p - r.tP) + Math.abs(s - r.tS); pickN += 2; });
  for (const n of [3, 5]) { const sts = K.STATIONS.slice(0, n), ds = sts.map((_, i) => K.sdist(K.autoPick(recs[i].tr) - K.autoPick(recs[i].z), 6, 3.5)), L = K.locate(sts, ds), e = Math.hypot(L.x - ev.x, L.y - ev.y); worst = Math.max(worst, e); ok(e < 2, `konum hatası ${seed}/${n}: ${e}`); }
  { const sts = K.STATIONS.slice(0, 3), ds = sts.map((_, i) => K.sdist(recs[i].tS - recs[i].tP, 6.3, 3.675)), L = K.locate(sts, ds); ok(L.rms > 1, `%5 hız hatası artıkları büyütür ${L.rms}`); velErr += Math.hypot(L.x - ev.x, L.y - ev.y); }
}
ok(pickBias / pickN < 0.05, `ortalama seçim hatası ${pickBias / pickN}`); ok(velErr / 20 > 3, `%5 hız hatasında ortalama konum hatası ${velErr / 20}`);
{ const ev = K.makeEvent(1); near(ev.x, 115.248873, 1e-8, "tohum 1 x"); near(ev.y, 30.246215, 1e-7, "tohum 1 y"); near(ev.t0, 3.109788, 1e-6, "tohum 1 t0"); }
{ const z = new Float64Array(5000); ok(K.autoPick(z) === null, "sinyalsiz kayıt seçilmez"); }

/* ── 3. Büyüklük: dyn·cm biçimi, kaynak değerleri, ölçekleme ── */
for (const M0 of [1e10, 3.4e19, 2.24e23]) near(K.mw(M0) - ((2 / 3) * Math.log10(M0 * 1e7) - 10.7), -1 / 30, 1e-9, "dyn·cm biçimi (10,7 ↔ 9,05): 9,1 sabiti 0,033 küçük verir");
for (const M of [2, 6.95, 9.5]) near(K.mw(K.m0FromMw(M)), M, 1e-12, "ters");
{ const v = K.m0FromMw(9.5); ok(v >= 1.4e23 && v <= 2.8e23, "Valdivia M₀ kaynak aralığında (1,4–2,8 × 10²³ N·m)"); }
near(K.energy(K.m0FromMw(7)) / K.energy(K.m0FromMw(6)), 10 ** 1.5, 1e-12, "1 birim"); near(K.energy(K.m0FromMw(7)) / K.energy(K.m0FromMw(5)), 1000, 1e-12, "2 birim ≈ 1000");
near(10 ** 1.5, 31.6227766, 1e-8, "31,6");
{ const c = { mu: 30, L: 10 ** 1.7, W: 10 ** 1.18, D: 10 ** 0.18 }, M0 = 30e9 * c.L * 1e3 * c.W * 1e3 * c.D; near(K.moment(c), M0, 1e-12, "M₀"); near(K.mw(M0), 6.958081, 1e-6, "varsayılan M_w");
  const big = K.moment({ mu: 30, L: c.L * Math.sqrt(10), W: c.W * Math.sqrt(10), D: c.D * Math.sqrt(10) }); near(K.mw(big) - K.mw(M0), 1, 1e-12, "√10 benzerlik → +1"); near(K.mw(K.moment({ ...c, D: c.D * 10 })) - K.mw(M0), 2 / 3, 1e-12, "10 kat kayma → +2/3"); }
assert.throws(() => K.moment({ mu: 30, L: 0, W: 1, D: 1 })); checks++;
near(K.ml(100, 100), 2 - 2.48 + 2.76 * 2, 1e-12, "M_L"); near(K.ml(100, 100) - K.ml(100 * 2 ** -2.76, 200), 0, 1e-12, "aynı deprem iki uzaklıkta");
ok(K.HISTORIC.length === 7 && K.HISTORIC[0].M === 9.5 && K.HISTORIC.find((h) => h.date === "1999-08-17").M === 7.6, "USGS değerleri");

/* ── 4. Gutenberg–Richter: ayrık beklenen değer, kapsama, Poisson ── */
{ let s = 0; const n = 92000, h = 9.2 / n; for (let i = 0; i < n; i++) { const z = -8 + (i + 0.5) * h; s += Math.exp(-z * z / 2) * h; } near(K.phi(1.2), s / Math.sqrt(2 * Math.PI), 2e-7, "Φ"); near(K.phi(0), 0.5, 1e-9); near(K.detectProb(2, 2), K.phi(2), 1e-12, "tamlıkta %97,7"); }
{ const r = K.rng(5); for (const lam of [0.3, 7, 39, 41, 800]) { let s = 0, s2 = 0; const n = 20000; for (let i = 0; i < n; i++) { const k = K.poissonSample(lam, r); s += k; s2 += k * k; } const m = s / n, v = s2 / n - m * m; near(m, lam, 5 * Math.sqrt(lam / n) / lam + 1e-9, "Poisson ortalaması"); near(v, lam, 0.08, "Poisson varyansı"); } }
function discreteAki(b, dM) { const beta = b * Math.LN10, q = Math.exp(-beta * dM); return Math.LOG10E / (dM / 2 + dM * q / (1 - q)); } // tam tamlıkta, sonsuz veride Aki–Utsu kestirimi
for (const b of [0.6, 1, 1.4]) {
  const cat = K.catalogue({ b, rate3: 100, years: 100, McTrue: 1.5, seed: 3 }), Mc = 2.5;
  let N = 0, S = 0; cat.bins.forEach((x) => { if (x.m >= Mc - 1e-9) { N += x.exp; S += x.exp * x.m; } });
  { const q = Math.exp(-b * Math.LN10 * 0.1); let w = 0, wk = 0; for (let k = 0; k <= 70; k++) { w += q ** k; wk += k * q ** k; } near(Math.LOG10E / (S / N - (Mc - 0.05)), Math.LOG10E / (0.05 + 0.1 * wk / w), 1e-6, "beklenen dilimlerde Aki (9,5'te kesik geometrik dağılım)"); }
  const a = K.akiB(cat, Mc); near(a.b, discreteAki(b, 0.1), 4 * a.sigma / a.b, `Aki b=${b}`);
  const Nab = (x) => 1e5 * 10 ** (-b * x), bins = []; for (let k = 20; k <= 60; k++) { const m = k / 10; bins.push({ m, count: k === 60 ? Nab(m - 0.05) : Nab(m - 0.05) - Nab(m + 0.05) }); } const l = K.lsqB({ dM: 0.1, bins }, Mc, 1e-9); near(l.b, b, 1e-9, "kesin kümülatif eğim"); near(l.a, 5 + 0.05 * b, 1e-9, "a, dilim merkezine göre");
}
{ // b/√N kapsaması ve yanlılık
  let inside = 0, sum = 0; const n = 200;
  for (let seed = 1; seed <= n; seed++) { const a = K.akiB(K.catalogue({ b: 1, rate3: 20, years: 30, McTrue: 2, seed }), 2); sum += a.b; if (Math.abs(a.b - discreteAki(1, 0.1)) < 2 * a.sigma) inside++; }
  ok(inside / n > 0.9 && inside / n < 0.99, `2σ kapsaması ${inside / n}`); near(sum / n, discreteAki(1, 0.1), 0.004, "ortalama Aki");
  near(discreteAki(1, 0.1), 0.99559, 1e-4, "yuvarlama yanlılığı −%0,44");
}
{ const cat = K.catalogue({ b: 1, rate3: 20, years: 30, McTrue: 2, seed: 1 }); const a = K.akiB(cat, 2), lo = K.akiB(cat, 1.5);
  near(a.b, 0.99208, 1e-4, "varsayılan Aki"); ok(a.N === 6684 && cat.total === 12686, "varsayılan sayılar"); ok(lo.b < 0.75, "tamlık altı b'yi düşürür");
  let tot = 0; cat.bins.forEach((x) => { tot += x.exp; }); ok(Math.abs(cat.total - tot) < 4 * Math.sqrt(tot), "toplam sayı"); }
for (const [lam, T] of [[0.02, 30], [0.002, 50], [0.5, 1], [2, 3], [0.0001, 100]]) {
  const s = K.simWindows(lam, T, 7); near(s.p, K.poissonP(lam, T), 4.5 * Math.max(s.se, 1 / s.n) / Math.max(K.poissonP(lam, T), 1e-9), `P(λ=${lam}, T=${T})`); ok(Math.abs(s.mean - lam * T) < 5 * Math.sqrt(lam * T / s.n) + 1e-9, "pencere ortalaması λT");
}
near(K.poissonP(0.02, 30), 1 - Math.exp(-0.6), 1e-15, "P kapalı biçim");
console.log(`G deprem: ${checks.toLocaleString("tr-TR")} bağımsız elastik, sonlu fark, konum, büyüklük ve istatistik kontrolü PASS (en kötü konum hatası ${worst.toFixed(2)} km)`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let browser;
  const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await ctx.newPage();
      await page.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      page.setDefaultTimeout(15000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      await page.waitForSelector("section.digest", { timeout: 15000 }); ok(/Kayaçtan Gelen Haber/.test(await page.locator("section.digest").textContent()), "defter görünür");
      const has = async (id, t) => { const v = await read(id); assert(v.includes(t), `${id}: "${v}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const until = async (fn, ms = 20000) => { await page.waitForFunction(fn, null, { timeout: ms }); checks++; };
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuval etiketleri");
      // 1 · varsayılan: gerçek zamanlı ölçüm
      await has("s1VPth", "5,774 km/s"); await has("s1VSth", "3,333 km/s"); await has("s1Ratio", "1,732"); await has("s1Nu", "0,250");
      await sel("s1Speed", "30");
      await until(() => /fark/.test(document.getElementById("s1VSd").textContent));
      await has("s1VPme", "5,771 km/s"); await has("s1VPd", "−0,042 %"); await has("s1VSme", "3,332 km/s"); await has("s1VSd", "−0,051 %"); await has("s1Status", "4,44 s"); await has("s1NuM", "0,250");
      await page.click("#s1Water"); await has("s1VPth", "1,483 km/s"); await has("s1VSme", "S yok"); await page.click("#s1Skip"); await has("s1VPme", "1,483 km/s"); await has("s1Status", "dış çekirdeğinden"); await has("s1Ratio", "sınırsız");
      await page.click("#s1Iron"); await page.click("#s1Skip"); await has("s1VPme", "9,996 km/s");
      await page.click("#s1Sed"); await page.click("#s1Skip"); await has("s1Ratio", "2,517"); await has("s1VSme", "0,999 km/s");
      await range("s1K", 0); await range("s1Mu", 0); await has("s1VPme", "dalga yok"); await has("s1Status", "hiçbir elastik dalga");
      await range("s1Mu", 300); await has("s1MuOut", "300,0 GPa"); await page.click("#s1Skip"); await has("s1Status", "ν < 0");
      await range("s1K", 1200); await range("s1Mu", 0.1); await range("s1Rho", 13000); await has("s1RhoOut", "13\u202f000 kg/m³"); await page.click("#s1Skip"); await has("s1VSme", "süre içinde varmadı"); await has("s1Status", "ulaşmadı");
      await page.click("#s1Run"); ok((await read("s1Run")) === "Devam et", "duraklat");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("s1KOut", "50,0 GPa"); ok((await read("s1Run")) === "Duraklat", "R sıfırlar ve başlatır");
      await page.keyboard.press("Space"); ok((await read("s1Run")) === "Devam et", "boşluk duraklatır");
      await page.click("#s1Reset");
      // sekme klavyesi
      await page.locator("#tab-waves").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-gr").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-locate").getAttribute("aria-selected")) === "true", "ArrowRight");
      ok(await page.locator("#panel-waves").isHidden(), "tek panel görünür");
      // 2 · Merkez üssü
      await has("s2Est", "(115,4; 30,3) km"); await has("s2Err", "gizli"); await has("s2Kf", "8,400 km/s"); await has("s2Rms", "0,09 km");
      await page.check("#s2Reveal"); await has("s2Err", "0,18 km"); await has("s2T0", "3,10 s · 3,11 s"); await has("s2Status", "Gerçek merkez üssü (115,2; 30,2) km");
      await range("s2VP", 6.3); await range("s2VS", 3.65); await has("s2Status", "tek noktada buluşmaz");
      const errModel = parseFloat((await read("s2Err")).replace(",", ".")); ok(errModel > 2, `hız hatası konum hatası ${errModel}`);
      await range("s2VP", 6); await range("s2VS", 3.5); await has("s2Err", "0,18 km");
      await range("s2VS", 5); await range("s2VP", 4); await has("s2Kf", "tanımsız"); await has("s2Status", "büyük olmalı"); await range("s2VP", 6); await range("s2VS", 3.5);
      await sel("s2Sel", "1"); await range("s2PickS", 5); await has("s2Status", "negatif"); await has("s2Est", "—");
      await page.click("#s2Auto"); await has("s2Err", "0,18 km");
      { await page.locator("#s2Seis").scrollIntoViewIfNeeded(); const box = await page.locator("#s2Seis").boundingBox(); await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.25); const p = parseFloat((await read("s2PickPOut")).replace(",", ".")); ok(p > 20 && p < 40, `tıklama P seçer ${p}`); await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.75); const s = parseFloat((await read("s2PickSOut")).replace(",", ".")); ok(Math.abs(s - p) < 2, "tıklama S seçer"); }
      await sel("s2N", "5"); ok((await page.locator("#s2Rows tr").count()) === 5, "5 istasyon"); ok((await page.locator("#s2Sel option").count()) === 5, "5 seçenek");
      await sel("s2Noise", "0.06"); ok(/çemberin|bulamadı/.test(await read("s2Status")), "yüksek gürültü durumu"); await sel("s2N", "3"); await sel("s2Noise", "0.03"); await has("s2Err", "0,18 km"); await sel("s2N", "5");
      await page.click("#s2New"); ok((await page.locator("#s2Seed").inputValue()) === "2", "yeni tohum");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("s2Est", "(115,4; 30,3) km"); ok(!(await page.locator("#s2Reveal").isChecked()), "R gizler");
      // 3 · Büyüklük
      await page.click("#tab-mag");
      await has("s3Mw", "6,96"); await has("s3M0", "3,44 × 10¹⁹ N·m"); await has("s3E", "1,72 × 10¹⁵ J"); await has("s3A", "759 km²"); await has("s3LOut", "50,1 km"); await has("s3Ratio", "referans yok");
      await has("s3ML", "5,04"); await has("s3ML2", "14,8 μm");
      await page.click("#s3Save"); await page.click("#s3Up1"); await has("s3Mw", "7,96"); await has("s3Ratio", "31,62 kat"); await has("s3RatioTh", "ΔM_w = 1,000");
      await page.click("#s3Save"); await page.click("#s3Slip10"); await has("s3Ratio", "10,00 kat"); await has("s3RatioTh", "0,667");
      await page.click("#s3Slip10"); await has("s3Status", "sınırına ulaştı"); await has("s3DOut", "50,12 m");
      await range("s3L", -1); await has("s3LOut", "100 m"); await range("s3W", 2.5); await has("s3Status", "Genişlik uzunluktan büyük");
      ok((await page.locator("#s3Rows tr").count()) === 7, "7 tarihsel deprem"); await has("s3Rows", "17.08.1999");
      await range("s3Amp", 5); await has("s3ML", "doyma");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("s3Mw", "6,96"); await has("s3Ref", "—");
      // 4 · Gutenberg–Richter
      await page.click("#tab-gr");
      await has("s4Aki", "0,992 ± 0,012"); await has("s4N", "6684"); await has("s4Lsq", "1,062"); await has("s4Pth", "45,12 %"); await has("s4Lam", "0,0200 / yıl");
      await has("s4Psim", "45,50 %"); await has("s4Max", "M 5,4"); await has("s4Status", "gözlenen en büyük"); await has("s4Status", "tahmin değildir");
      await range("s4Mc", 1.5); await has("s4Status", "tamlığın (2,0) altında"); await has("s4Aki", "0,677");
      await range("s4Mc", 5); await has("s4Status", "Olay sayısı az"); await has("s4N", "8");
      await range("s4Mc", 2); await range("s4BUser", 1); await has("s4User", "fark 0,0 %");
      await range("s4T", 1); await has("s4TOut", "1 yıl"); await range("s4T", 100); await range("s4Mstar", 4); await has("s4Pth", "100,00 %");
      await range("s4B", 1.4); await range("s4Rate", 100); await range("s4Years", 100); await range("s4McTrue", 1.5); await has("s4BOut", "1,40");
      { const v = parseFloat((await read("s4Aki")).replace(",", ".")); ok(Math.abs(v - 1.4) < 0.05, `b = 1,4 kestirimi ${v}`); }
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("s4Aki", "0,992 ± 0,012");
      ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      ok(await page.evaluate(() => Object.isFrozen(SeismoLab) && !Object.getOwnPropertyDescriptor(window, "SeismoLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G deprem: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
