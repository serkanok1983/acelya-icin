// G · bayes-olasilik.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// ardışık tek-test Bayes güncellemesi, nüfusun yeniden sayımı ve çok tohumlu z-sınaması, gözlenen-beklenen ki-kare toplamı
// ve ki-kare(1) yoğunluğunun Simpson integrali, Monty Hall'un bütün eşit olasılıklı dallarının kesirli sayımı,
// eksik beta için binom toplamı özdeşliği / arksinüs kapalı biçimi / Simpson integrali, Wilson için ikinci dereceden
// eşitsizliğin ikiye bölmeyle çözümü, torba sorusunda 2ⁿ dizinin tek tek sayımı ve savcı örneğinde doğrudan Bayes.
// Kullanım: node scripts/check-g-bayes-olasilik.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../bayes-olasilik.html", import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.BayesLab;
let checks = 0;
const near = (a, e, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - e) <= tol * Math.max(1, Math.abs(e)), `${label} ${a} ≠ ${e} (tol ${tol})`); checks++; };
const nearAbs = (a, e, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - e) <= tol, `${label} ${a} ≠ ${e} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");

/* ── Üreteç ── */
{ const a = K.mulberry32(42), b = K.mulberry32(42); let same = true, sum = 0; for (let i = 0; i < 1e5; i++) { const x = a(); if (x !== b() || x < 0 || x >= 1) same = false; sum += x; } ok(same, "aynı tohum aynı dizi"); nearAbs(sum / 1e5, 0.5, 0.005, "düzgün ortalama"); }

/* ── 1. Tanı testi ── */
// Doğal sıklıklar: 10.000 kişide tamsayı sayım (önsel %1, %95, %90) → 95 / (95 + 990)
near(K.diagnose(0.01, 0.95, 0.9).ppv, 95 / 1085, 1e-12, "varsayılan PPV"); near(K.diagnose(0.001, 0.99, 0.99).ppv, 99 / (99 + 999), 1e-12, "nadir PPV 9,02 %");
near(K.diagnose(0.01, 0.95, 0.9).sickGivenNeg, 5 / (5 + 8910), 1e-12, "P(hasta|negatif)");
near(K.diagnose(0.01, 0.95, 0.9).accuracy, (95 + 8910) / 10000, 1e-12, "doğruluk");
const seqBayes = (prev, sens, spec, k) => { let p = prev; for (let i = 0; i < k; i++) p = (sens * p) / (sens * p + (1 - spec) * (1 - p)); return p; };
for (const prev of K.PREV_STEPS) for (const [se, sp] of [[0.95, 0.9], [0.99, 0.99], [0.5, 0.5], [0.999, 0.6], [0.7, 0.999]]) for (let k = 0; k <= 3; k++) {
  near(K.afterPositives(prev, se, sp, k), seqBayes(prev, se, sp, k), 1e-12, `ardışık Bayes ${prev}/${se}/${sp}/${k}`);
  if (k === 1) { const D = K.diagnose(prev, se, sp); near(D.ppv, seqBayes(prev, se, sp, 1), 1e-12); near(D.priorOdds * D.lrPos, D.ppv / (1 - D.ppv), 1e-9, "oran biçimi"); }
}
ok(K.afterPositives(0.01, 0.5, 0.5, 3) === 0.01 * 1 / (0.01 + 0.99) || Math.abs(K.afterPositives(0.01, 0.5, 0.5, 3) - 0.01) < 1e-15, "LR = 1: kanıt bilgisiz");
ok(K.diagnose(0.3, 0.95, 0.9).sickGivenNeg < 0.3, "negatif test inancı azaltır");
assert.throws(() => K.diagnose(1.2, 0.9, 0.9)); checks++;
{
  const P = K.population({ N: 10000, prev: 0.01, sens: 0.95, spec: 0.9, seed: 1 });
  let tp = 0, fp = 0, sick = 0; for (let i = 0; i < P.N; i++) { sick += P.sick[i]; if (P.res[i] & 1) { if (P.sick[i]) tp++; else fp++; } }
  ok(tp === P.counts.tp && fp === P.counts.fp && sick === P.counts.sick, "yeniden sayım"); ok(P.counts.tp + P.counts.fp + P.counts.fn + P.counts.tn === 10000, "toplam");
  ok(P.counts.tp === 107 && P.counts.fp === 938 && P.counts.sick === 112, "varsayılan tohum 1 sayımları"); ok(P.k[1].n === 182 && P.k[1].sick === 102, "iki pozitif");
  // çok tohumlu z: ölçülen PPV kuram çevresinde dağılmalı
  let zs = 0, z2 = 0, nz = 0;
  for (let seed = 1; seed <= 40; seed++) for (const k of [1, 2]) {
    const Q = K.population({ N: 20000, prev: 0.05, sens: 0.9, spec: 0.95, seed }), t = K.afterPositives(0.05, 0.9, 0.95, k), c = Q.k[k - 1];
    const z = (c.sick / c.n - t) / Math.sqrt((t * (1 - t)) / c.n); zs += z; z2 += z * z; nz++; ok(Math.abs(z) < 4.5, "z sınırı " + z);
  }
  nearAbs(zs / nz, 0, 0.6, "z ortalaması"); ok(z2 / nz < 2.5, "z varyansı");
}

/* ── 2. Koşullu olasılık ── */
const chiPdf1 = (x) => Math.exp(-x / 2) / Math.sqrt(2 * Math.PI * x);
const chiSf = (c) => { // 1 − ∫₀ᶜ yoğunluk; x = u² değişkeniyle tekilliği kaldır: ∫ 2u·f(u²) du
  const n = 4000, U = Math.sqrt(c), h = U / n; let s = 0;
  for (let i = 0; i <= n; i++) { const u = i * h, f = i === 0 ? 2 / Math.sqrt(2 * Math.PI) : 2 * u * chiPdf1(u * u); s += f * (i === 0 || i === n ? 1 : i % 2 ? 4 : 2); }
  return 1 - (s * h) / 3;
};
for (const v of [[12, 18, 28, 42], [40, 10, 20, 30], [95, 5, 990, 8910], [3, 0, 0, 7], [1, 2, 3, 4], [500, 300, 200, 1000]]) {
  const T = K.contingency(...v), [a, b, c, d] = v, n = a + b + c + d;
  near(T.pAgB, a / (a + c), 1e-12); near(T.pBgA, a / (a + b), 1e-12); near(T.pAgB * T.pB, T.pAB, 1e-12, "çarpım kuralı"); near(T.pBgA * T.pA, T.pAB, 1e-12);
  near(T.pAgB * T.pB / T.pA, T.pBgA, 1e-12, "Bayes tersi");
  const O = [a, b, c, d], E = [(a + b) * (a + c) / n, (a + b) * (b + d) / n, (c + d) * (a + c) / n, (c + d) * (b + d) / n];
  near(T.chi2, O.reduce((s, o, i) => s + (o - E[i]) ** 2 / E[i], 0), 1e-10, "ki-kare");
  if (T.chi2 > 1e-6 && T.chi2 < 30) nearAbs(T.pValue, chiSf(T.chi2), 2e-6, "p değeri");
  ok(T.exactIndependent === (Math.abs(T.gap) < 1e-15), "tam bağımsızlık ⇔ fark 0");
}
ok(K.contingency(12, 18, 28, 42).exactIndependent && K.contingency(12, 18, 28, 42).pValue === 1, "bağımsız örnek");
ok(K.contingency(0, 0, 0, 0) === null && K.contingency(3, 2, 0, 0).chi2 === null && K.contingency(3, 2, 0, 0).pAgNA === undefined, "boş kenar");
assert.throws(() => K.contingency(1.5, 1, 1, 1)); checks++;
{
  const S = K.simpson([{ s1: 45, n1: 50, s2: 170, n2: 200 }, { s1: 120, n1: 200, s2: 25, n2: 50 }]);
  ok(S.reversal && S.R1 === 165 / 250 && S.R2 === 195 / 250, "paradoks hazır değeri");
  near(S.R1, 0.2 * 0.9 + 0.8 * 0.6, 1e-12, "ağırlıklı ortalama X"); near(S.R2, 0.8 * 0.85 + 0.2 * 0.5, 1e-12, "ağırlıklı ortalama Y");
  ok(!K.simpson([{ s1: 90, n1: 100, s2: 85, n2: 100 }, { s1: 60, n1: 100, s2: 50, n2: 100 }]).reversal, "eşit dağılımda paradoks yok");
  // rastgele tablolar: tersine dönüş tanımı ile karşılaştır
  const r = K.mulberry32(9);
  for (let i = 0; i < 2000; i++) {
    const t = [0, 1].map(() => { const n1 = 1 + Math.floor(r() * 200), n2 = 1 + Math.floor(r() * 200); return { s1: Math.floor(r() * (n1 + 1)), n1, s2: Math.floor(r() * (n2 + 1)), n2 }; });
    const q = K.simpson(t), g = t.map((x) => x.s1 / x.n1 - x.s2 / x.n2), tot = (t[0].s1 + t[1].s1) / (t[0].n1 + t[1].n1) - (t[0].s2 + t[1].s2) / (t[0].n2 + t[1].n2);
    const want = (g[0] > 0 && g[1] > 0 && tot < 0) || (g[0] < 0 && g[1] < 0 && tot > 0); ok(q.reversal === want, "tersine dönüş tanımı");
  }
}
// Monty Hall: her (araba, seçim, sunucu seçimi, oyuncu seçimi) dalının kesin ağırlıkla sayımı
function montyExact(n, mode) {
  let stay = 0, swap = 0, valid = 0;
  for (let car = 0; car < n; car++) for (let pick = 0; pick < n; pick++) {
    const w0 = 1 / (n * n), others = [...Array(n).keys()].filter((i) => i !== pick);
    let branches; // [ağırlık, kapalı diğerleri, açılanlar]
    if (mode === "all") branches = car !== pick ? [[1, [car]]] : others.map((o) => [1 / others.length, [o]]);
    else if (mode === "one") { const goats = others.filter((i) => i !== car); branches = goats.map((g) => [1 / goats.length, others.filter((i) => i !== g)]); }
    else branches = others.map((o) => [1 / others.length, [o]]);
    for (const [w, closed] of branches) {
      const opened = others.filter((i) => !closed.includes(i)); if (opened.includes(car)) continue;
      valid += w0 * w; if (pick === car) stay += w0 * w; swap += w0 * w * closed.filter((c) => c === car).length / closed.length;
    }
  }
  return { stay: stay / valid, swap: swap / valid, valid };
}
for (const mode of K.MONTY_MODES) for (let n = 3; n <= 10; n++) {
  const e = montyExact(n, mode), t = K.montyTheory(n, mode);
  near(t.stay, e.stay, 1e-12, `kal ${mode} ${n}`); near(t.swap, e.swap, 1e-12, `değiştir ${mode} ${n}`); near(t.valid, e.valid, 1e-12, `geçerli ${mode} ${n}`);
}
for (const [n, mode] of [[3, "all"], [10, "all"], [10, "one"], [3, "blind"], [6, "blind"]]) for (const seed of [1, 2, 3]) {
  const s = K.montySim(n, mode, 20000, seed), t = K.montyTheory(n, mode);
  for (const k of ["stay", "swap"]) nearAbs(s[k].rate, t[k], 4.5 * Math.sqrt(t[k] * (1 - t[k]) / s[k].valid), `benzetim ${mode} ${n} ${k}`);
  nearAbs(s.stay.valid / 20000, t.valid, 4.5 * Math.sqrt(t.valid * (1 - t.valid) / 20000) + 1e-12, "geçerli pay");
}
{ const s = K.montySim(3, "all", 10000, 1); ok(s.stay.wins === 3419 && s.swap.wins === 6680, "varsayılan Monty sayıları"); }

/* ── 3. Beta–binom ── */
for (let n = 1; n <= 20; n++) near(K.lnGamma(n), Math.log([...Array(n).keys()].reduce((p, i) => p * Math.max(1, i), 1)), 1e-12, "lnΓ(n) = ln (n−1)!");
near(K.lnGamma(0.5), 0.5 * Math.log(Math.PI), 1e-12, "Γ(1/2) = √π");
const choose = (n, k) => { let c = 1; for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i; return c; };
const ibetaInt = (x, a, b) => { const n = a + b - 1; let s = 0; for (let j = a; j <= n; j++) s += choose(n, j) * x ** j * (1 - x) ** (n - j); return s; };
for (const [a, b] of [[1, 1], [2, 3], [8, 4], [16, 6], [51, 51], [30, 3]]) for (const x of [0.01, 0.2, 0.5, 0.73, 0.99]) near(K.ibeta(x, a, b), ibetaInt(x, a, b), 1e-10, `I_x(${a},${b}) binom toplamı`);
for (const x of [0.001, 0.1, 0.5, 0.9]) near(K.ibeta(x, 0.5, 0.5), (2 / Math.PI) * Math.asin(Math.sqrt(x)), 1e-10, "arksinüs");
// kesirli parametreler: t = x·u^m (m = 4/a) değişkeniyle düzgünleşen integrand üzerinde Simpson
const ibetaSimpson = (x, a, b) => { const m = 4 / a, n = 20000, h = 1 / n; let s = 0; for (let i = 0; i <= n; i++) { const u = i * h, f = m * u ** 3 * (1 - x * u ** m) ** (b - 1); s += f * (i === 0 || i === n ? 1 : i % 2 ? 4 : 2); } return (x ** a * (s * h) / 3) / Math.exp(K.lnBeta(a, b)); };
for (const [a, b] of [[2.5, 7.5], [0.5, 3], [10.5, 20.5]]) for (const x of [0.1, 0.3, 0.6]) near(K.ibeta(x, a, b), ibetaSimpson(x, a, b), 1e-9, `Simpson I_x(${a},${b})`);
for (const [a, b] of [[16, 6], [8, 4], [51, 51], [2, 8], [17, 13]]) {
  const S = K.betaSummary(a, b);
  nearAbs(ibetaInt(S.lo, a, b), 0.025, 1e-10, "alt nicelik"); nearAbs(ibetaInt(S.hi, a, b), 0.975, 1e-10, "üst nicelik"); near(S.mean, a / (a + b), 1e-15);
  const mc = K.betaMcQuantiles(a, b, 100000, 77); nearAbs(mc.lo, S.lo, 0.004, "MC alt"); nearAbs(mc.hi, S.hi, 0.004, "MC üst"); nearAbs(mc.mean, S.mean, 0.002, "MC ortalama");
}
{ const S = K.betaSummary(16, 6); nearAbs(S.lo, 0.528, 0.0005); nearAbs(S.hi, 0.887, 0.0005); nearAbs(S.sd, 0.093, 0.0005); near(S.mode, 0.75, 1e-12); }
near(K.betaQuantile(0.3, 1, 1), 0.3, 1e-12, "düzgün nicelik");
// Wilson: |f − p| ≤ z √(p(1−p)/n) eşitsizliğinin sınırları ikiye bölmeyle
const wilsonBis = (h, n) => { const f = h / n, z = K.Z95, g = (p) => (f - p) ** 2 - z * z * p * (1 - p) / n; const root = (lo, hi) => { for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (Math.sign(g(m)) === Math.sign(g(lo))) lo = m; else hi = m; } return (lo + hi) / 2; }; return { lo: h === 0 ? 0 : root(0, h === n ? 1 - 1e-12 : f), hi: h === n ? 1 : root(h === 0 ? 1e-12 : f, 1) }; };
for (const [h, n] of [[0, 10], [1, 10], [15, 20], [7, 30], [30, 30], [83, 120]]) { const w = K.wilson(h, n), r = wilsonBis(h, n); nearAbs(w.lo, r.lo, 1e-9, "Wilson alt"); nearAbs(w.hi, r.hi, 1e-9, "Wilson üst"); }
{ const w = K.wald(15, 20); nearAbs(w.lo, 0.75 - 1.959964 * Math.sqrt(0.75 * 0.25 / 20), 1e-6); ok(K.wald(0, 10).width === 0, "Wald h=0 çöker"); }
// Kapsama: binom olasılıklarını çarpımla (lnGamma'sız) hesaplayıp kesin kapsamayı yeniden topla
for (const [n, p, a, b] of [[30, 0.7, 1, 1], [10, 0.1, 1, 1], [100, 0.5, 50, 50], [30, 0.05, 2, 8]]) {
  const tb = K.intervalTable(n, a, b), ex = K.coverageExact(n, p, a, b, tb);
  for (const k of ["bayes", "wilson", "wald"]) { let c = 0; for (let h = 0; h <= n; h++) if (tb[h][k].lo <= p && p <= tb[h][k].hi) c += choose(n, h) * p ** h * (1 - p) ** (n - h); near(ex[k], c, 1e-9, `kapsama ${k}`); }
  const sim = K.coverageSim({ M: 4000, n, p, a, b, seed: 5 }, tb); for (const k of ["bayes", "wilson", "wald"]) nearAbs(sim[k], ex[k], 4.5 * Math.sqrt(ex[k] * (1 - ex[k]) / 4000) + 1e-9, "kapsama benzetimi");
}
for (const [n, a, b] of [[30, 1, 1], [10, 2, 8], [100, 0.5, 0.5]]) { const ex = K.coverageExact(n, null, a, b); nearAbs(ex.bayes, 0.95, 1e-8, "önselden çekilince Bayes tam %95"); const sim = K.coverageSim({ M: 4000, n, p: null, a, b, seed: 3 }); nearAbs(sim.bayes, 0.95, 4.5 * Math.sqrt(0.95 * 0.05 / 4000), "kalibrasyon benzetimi"); }
{ const ex = K.coverageExact(30, 0.7, 1, 1); nearAbs(ex.bayes, 0.9298, 5e-5); nearAbs(ex.wald, 0.9529, 5e-5); nearAbs(K.coverageExact(30, null, 1, 1).wald, 0.8749, 5e-5); }

/* ── 4. Torbalar ── */
const brutePost = (prior, ps, r, w) => { const u = prior.map((q, i) => q * ps[i] ** r * (1 - ps[i]) ** w), s = u.reduce((x, y) => x + y, 0); return u.map((x) => x / s); };
for (const [prior, ps] of [[[1 / 3, 1 / 3, 1 / 3], [0.2, 0.5, 0.8]], [[0.7, 0.3], [0.4, 0.6]], [[0.1, 0.2, 0.3, 0.4], [0.2, 0.5, 0.8, 0.35]]]) {
  for (const [r, w] of [[0, 0], [3, 7], [12, 2], [40, 41]]) {
    const a = K.urnPosterior(prior, ps, r, w), b = brutePost(prior, ps, r, w); a.forEach((x, i) => nearAbs(x, b[i], 1e-12, "sonsal"));
    for (let i = 0; i < ps.length; i++) for (let j = 0; j < ps.length; j++) if (i !== j) nearAbs(K.logOdds10(i, j, prior, ps, r, w), Math.log10(b[i] / b[j]), 1e-9, "log oran toplamı");
  }
  // 2ⁿ dizinin tek tek sayımı: P(MAP doğru)
  for (const n of [0, 1, 3, 6, 10]) {
    let s = 0;
    for (let m = 0; m < 1 << n; m++) { let r = 0; for (let i = 0; i < n; i++) r += (m >> i) & 1; const post = brutePost(prior, ps, r, n - r), mx = Math.max(...post), set = post.map((v, i) => (v >= mx * (1 - 1e-9) ? i : -1)).filter((i) => i >= 0); for (const k of set) s += prior[k] * ps[k] ** r * (1 - ps[k]) ** (n - r) / set.length; }
    near(K.pCorrectExact(prior, ps, n), s, 1e-10, `P(doğru) n=${n}`);
  }
  const ex = K.pCorrectExact(prior, ps, 10), sim = K.pCorrectSim(prior, ps, 10, 20000, 4); nearAbs(sim, ex, 4.5 * Math.sqrt(ex * (1 - ex) / 20000), "P(doğru) benzetimi");
}
{ const pr = [1 / 3, 1 / 3, 1 / 3], ps = [0.2, 0.5, 0.8]; nearAbs(K.pCorrectExact(pr, ps, 10), 0.8048, 5e-5); nearAbs(K.pCorrectExact(pr, ps, 0), 1 / 3, 1e-12); ok(K.pCorrectExact(pr, ps, 50) > 0.98, "n=50 yüksek"); }
for (const [N, m] of [[50000, 1e-4], [1000, 1e-3], [1e6, 1e-6]]) { const R = K.prosecutor(N, m), pg = (1 / N) / ((1 / N) + (1 - 1 / N) * m); near(R.pGuilty, pg, 1e-12, "savcı Bayes"); }
nearAbs(K.prosecutor(50000, 1e-4).pGuilty, 0.16667, 1e-5);

console.log(`G bayes-olasilik: ${checks.toLocaleString("tr-TR")} bağımsız tanı, tablo, Monty Hall, beta, kapsama ve torba kontrolü PASS`);

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
      await page.goto(`http://127.0.0.1:${server.address().port}/bayes-olasilik.html`);
      const click = (id) => page.locator("#" + id).click(), read = async (id) => (await page.locator("#" + id).textContent()).trim().replace(/\s+/g, " ");
      const has = async (id, t) => { const s = await read(id); assert(s.includes(t), `[${width}] #${id}: "${s}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, v);
      const typeIn = (id, v) => page.locator("#" + id).fill(String(v));
      const pick = (id, v) => page.locator("#" + id).selectOption(v);
      const eq = (a, b, label) => { assert.equal(a, b, `[${width}] ${label || ""}`); checks++; };
      const clean = async (sel) => { const t = await page.locator(sel).innerText(); assert(!/NaN|Infinity|undefined|null/.test(t), `[${width}] ${sel} bozuk sayı`); checks++; };
      const noOverflow = async () => eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "yatay taşma");
      const drawn = async (id) => eq(await page.evaluate((id) => { const c = document.getElementById(id), d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; const set = new Set(); for (let i = 0; i < d.length; i += 4 * 97) set.add(d[i] + "," + d[i + 1] + "," + d[i + 2]); return set.size > 4; }, id), true, id + " boş");

      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content input, .app-content select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).length), 0, "etiketsiz denetim");
      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].filter((c) => c.getAttribute("role") !== "img" || !c.getAttribute("aria-label")).length), 0, "rolsüz tuval");
      eq(await page.evaluate(() => Object.isFrozen(BayesLab) && !Object.getOwnPropertyDescriptor(window, "BayesLab").writable), true, "çekirdek salt okunur");
      eq(await page.evaluate(() => [...document.querySelectorAll('input[type="range"]')].filter((e) => { const st = +e.step, k = (+e.value - +e.min) / st; return Math.abs(k - Math.round(k)) > 1e-6; }).length), 0, "adım dışı varsayılan");
      eq(await page.evaluate(() => /[̀-ͯ]/.test(document.querySelector(".app-content").innerText)), false, "birleşik işaret yok");

      /* 01 · Tanı testi */
      await has("tPrevOut", "%1,00"); await has("tPpv", "%8,76"); await has("tPpvM", "%10,24 (107/1.045)"); await has("tPpvD", "z = +1,7"); await has("tPos", "%10,85 · %10,45");
      await has("tNeg", "%0,056"); await has("tLr", "9,50 · 0,056"); await has("tAcc", "%90,05"); await has("tStatus", "beklenen yanlış pozitif 990, doğru pozitif 95");
      await page.locator('.tPre[data-prev="3"]').click(); await has("tPrevOut", "%0,10"); await has("tPpv", "%9,02"); await has("tAcc", "%99,00"); await has("tStatus", "Doğruluk %99,00 olduğu hâlde");
      await pick("tTests", "2"); await has("tPpv", "%90,75"); await has("tPpvM", "12/15"); await has("tPpvLabel", "2 test de pozitif");
      await page.locator('.tPre[data-prev="13"]').click(); await pick("tTests", "1"); await has("tPrevOut", "%30,00"); await clean("#panel-test");
      await range("tPrev", 0); await range("tSens", 50); await range("tSpec", 50); await has("tPrevOut", "%0,01"); await pick("tN", "1000"); await clean("#panel-test");
      await range("tPrev", 21); await range("tSens", 99.9); await range("tSpec", 99.9); await has("tPrevOut", "%99,00"); await pick("tN", "100000"); await has("tIconsTitle", "ilk 10.000"); await clean("#panel-test");
      await typeIn("tSeed", "abc"); await page.locator("#tSeed").dispatchEvent("change"); eq(await page.locator("#tSeed").inputValue(), "1", "geçersiz tohum");
      await click("tNewSeed"); eq(await page.locator("#tSeed").inputValue(), "2", "tohum + 1");
      await page.locator("#tSort").uncheck(); await drawn("tIcons");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("tPpv", "%8,76"); eq(await page.locator("#tSort").isChecked(), true, "sıfırla sırala");
      await click("tReset"); await has("tPpvM", "107/1.045");
      await pick("tTests", "2"); await has("tStatus", "yirmi nüfustan birinde"); await has("tStatus", "nüfusu büyüt"); eq((await page.locator("#tStatus").innerText()).includes("tohumla dene"), false, "tohum seçmeye özendirmez");
      await pick("tN", "100000"); await has("tPpvM", "893/1.858"); await click("tReset");
      for (const id of ["tIcons", "tTree", "tCurve"]) await drawn(id);
      await noOverflow();

      /* 02 · Koşullu olasılık */
      await click("tab-cond"); await has("cMarg", "%50,00 · %60,00"); await has("cAgB", "%66,67"); await has("cAgBF", "40/60 = 2/3"); await has("cBgA", "%80,00"); await has("cGap", "+10,00 puan"); await has("cChi", "16,667"); await has("cStatus", "artırıyor");
      await page.locator('.cPre[data-v="12,18,28,42"]').click(); await has("cGapF", "tam bağımsız"); await has("cChi", "p = 1,0000"); await has("cStatus", "tam bağımsız");
      await page.locator('.cPre[data-v="95,5,990,8910"]').click(); await has("cAgB", "%8,76"); await has("cBgA", "%95,00"); await has("cStatus", "taban oranı yanılgısı");
      await typeIn("cAB", "x"); await has("cStatus", "Geçersiz"); await typeIn("cAB", "0"); await typeIn("cANB", "0"); await typeIn("cNAB", "0"); await typeIn("cNANB", "0"); await has("cStatus", "boş");
      await typeIn("cNANB", "5"); await has("cAgB", "tanımsız"); await clean("#panel-cond");
      await typeIn("cAB", "1"); await typeIn("cNAB", "1"); await typeIn("cANB", "1"); await has("cChiF", "güvenilmez");
      await has("sStatus", "Paradoks"); await has("sRows", "%66,00"); await has("sRows", "%78,00");
      await page.locator('.sPre[data-v="90,100,85,100,60,100,50,100"]').click(); await has("sStatus", "Ters dönüş yok");
      await typeIn("sS1a", "500"); await has("sStatus", "Geçersiz");
      await has("mStay", "%34,19"); await has("mSwap", "%66,80"); await has("mStayD", "kuram %33,33"); await has("mStatus", "kuram 2");
      // oyna: kapı seç, sunucu açar, değiştir
      await page.locator('#mDoors button[data-i="0"]').click(); await has("mMsg", "Sunucu 1 kapı açtı");
      const closed = await page.evaluate(() => [...document.querySelectorAll("#mDoors button")].findIndex((b, i) => i > 0 && !b.disabled));
      await page.locator(`#mDoors button[data-i="${closed}"]`).click(); await has("mMsg", "Değiştirdin"); await has("mTallySwapF", "1 oyun");
      await click("mNew"); await has("mMsg", "kapı seç");
      await range("mN", 10); await has("mStayD", "kuram %10,00"); await has("mSwapD", "kuram %90,00"); eq(await page.locator("#mDoors button").count(), 10, "10 kapı");
      await pick("mMode", "one"); await has("mSwapD", "kuram %11,25"); await range("mN", 3); await pick("mMode", "blind"); await has("mValidD", "6.717/10.000"); await has("mStayD", "kuram %50,00"); await has("mStatus", "aynı olasılıkla, 1/2"); await clean("#panel-cond");
      await click("cReset"); await has("cAgB", "%66,67"); await has("sStatus", "Paradoks"); eq(await page.locator("#mMode").inputValue(), "all", "sıfırla kip"); await has("mTallySwap", "—");
      for (const id of ["cMosaic", "sChart", "mChart"]) await drawn(id);
      await noOverflow();

      /* 03 · Beta–binom */
      await click("tab-beta"); await has("bData", "15 · 5 · 20"); await has("bPost", "Beta(16; 6)"); await has("bMean", "0,727"); await has("bCi", "[0,528; 0,887]"); await has("bMc", "[0,529; 0,887]");
      await has("bMode", "0,750"); await has("bFreq", "Wilson [0,531; 0,888]"); await has("bFreqF", "Wald [0,560; 0,940]"); await has("bW", "%9,1"); await has("bGapF", "Beta(50, 50): 0,542");
      await has("bCovRows", "%92,98"); await has("bCovRows", "%95,29");
      await page.locator('.bPre[data-a="50"]').click(); await has("bMean", "0,542"); await has("bStatus", "içermiyor");
      await page.locator('.bFlip[data-k="100"]').click(); await has("bData", "83 · 37 · 120"); await has("bMean", "0,605"); await has("bW", "%45,5");
      await page.locator('.bPre[data-a="0.5"]').click(); await has("bAOut", "0,5"); await click("bClear"); await has("bData", "0 · 0 · 0"); await has("bFreq", "veri yok"); await has("bMode", "kenarda"); await clean("#panel-beta");
      await click("bHead"); await click("bTail"); await click("bHead"); await has("bData", "2 · 1 · 3");
      await range("bP", 0); await has("bData", "0 · 20 · 20"); await has("bStatus", "sınırda"); await range("bP", 1); await has("bData", "20 · 0 · 20"); await clean("#panel-beta");
      await click("bReset"); await pick("bCovMode", "prior"); await has("bCovRows", "%95,00"); await has("bCovRows", "%87,49"); await pick("bCovN", "10"); await clean("#panel-beta");
      await click("bPlay"); await has("bPlay", "Duraklat"); await page.waitForTimeout(500); await click("bPlay"); ok((await read("bData")).split("·")[2].trim() !== "20", "oynatma atış ekler");
      await page.locator("h1").click(); await page.keyboard.press("Space"); await has("bPlay", "Duraklat"); await page.keyboard.press("r"); await has("bPlay", "Oynat"); await has("bData", "15 · 5 · 20");
      for (const id of ["bCurves", "bConv"]) await drawn(id);
      await noOverflow();

      /* 04 · Ardışık güncelleme */
      await click("tab-seq"); await has("uCounts", "0 · 0"); await has("uMap", "eşitlik"); await has("uCorrect", "%80,52"); await has("uCorrectT", "%80,48"); await has("uEv", "kırmızı +0,204 · beyaz −0,398"); await has("uHiddenOut", "saklı");
      await has("pG", "%16,67"); await has("pFall", "%99,9900"); await has("pExp", "5,0");
      await click("uDraw10"); await has("uCounts", "3 · 7"); await has("uMap", "Torba 1 · %63,05"); await has("uLog", "−2,173"); await has("uLogF", "doğrudan −2,173"); await has("uStatus", "%51,4 → %63,1");
      await page.locator("#uReveal").check(); await has("uHiddenOut", "Torba 1 (kırmızı %20)"); await has("uStatus", "gizli torbayla aynı");
      await range("uN", 0); await has("uCorrectT", "%33,33"); await range("uN", 50); await has("uCorrectT", "%98,53"); await clean("#panel-seq");
      await pick("uK", "4"); await has("uCounts", "0 · 0"); eq(await page.locator("#uI option").count(), 4, "4 torba seçeneği"); await pick("uK", "2"); eq(await page.locator(".by-urn:not([hidden])").count(), 2, "2 torba");
      await range("uP1", 50); await range("uP2", 50); await click("uDraw10"); await has("uMap", "eşitlik"); await clean("#panel-seq");
      await range("uW1", 10); await has("uW1Out", "→ %90,9");
      await pick("uI", "0"); await pick("uJ", "0"); await has("uLogF", "aynı torba"); await clean("#panel-seq");
      await pick("pN", "1000000"); await pick("pMatch", "0.000001"); await has("pG", "%50,00"); await pick("pN", "1000"); await pick("pMatch", "0.001"); await has("pG", "%50,03");
      await click("uPlay"); await page.waitForTimeout(800); await click("uPlay"); ok(!(await read("uCounts")).startsWith("0 · 0") , "oynatma çeker");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("uCounts", "0 · 0"); eq(await page.locator("#uK").inputValue(), "3", "sıfırla K"); await has("pG", "%16,67");
      for (const id of ["uBars", "uHist", "uLogChart", "uCurve"]) await drawn(id);
      await noOverflow();

      // sekme klavyesi
      await page.locator("#tab-seq").focus(); await page.keyboard.press("Home"); eq(await page.locator("#tab-test").getAttribute("aria-selected"), "true", "Home");
      await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-cond").getAttribute("aria-selected"), "true", "sağ ok"); eq(await page.locator("#panel-cond").isVisible(), true, "panel görünür");
      await page.keyboard.press("End"); eq(await page.locator("#tab-seq").getAttribute("aria-selected"), "true", "End"); await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-test").getAttribute("aria-selected"), "true", "sarma");
      await page.keyboard.press("ArrowLeft"); eq(await page.locator("#tab-seq").getAttribute("tabindex"), "0", "tabindex");
      // form denetimindeyken R yok sayılır
      await click("tab-test"); await range("tSens", 80); await page.locator("#tSens").focus(); await page.keyboard.press("r"); await has("tSensOut", "%80,0");
      await noOverflow();
      assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      console.log(`G bayes-olasilik: ${width} px ${theme} · ${checks - before} arayüz denetimi PASS`);
      await ctx.close();
    }
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
