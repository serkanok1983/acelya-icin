// Hipotez testi ve güven aralığı: çekirdeğin bağımsız denetimi (NIST tabloları, ayrı Simpson integralleri, kapalı
// biçimler, sayfanınkinden farklı bir üreteçle Monte Carlo) ve isteğe bağlı tarayıcı denetimi (390 px açık, 1280 px koyu).
// Kullanım: node scripts/check-g-hipotez-testi-ve-guven-araligi.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "hipotez-testi-ve-guven-araligi";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.HypothesisLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");

/* ── Bağımsız araçlar: başka bir üreteç (sfc32, Marsaglia kutupsal yöntemi), Simpson ── */
function xrng(seed) { let a = seed | 0, b = 0x9e3779b9 | 0, c = 0x243f6a88 | 0, d = 0xb7e15162 | 0; const f = () => { const t = (((a + b) | 0) + d) | 0; d = (d + 1) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); c = (c + t) | 0; return (t >>> 0) / 4294967296; }; for (let i = 0; i < 20; i++) f(); return f; } // sfc32
function polar(r) { for (;;) { const u = 2 * r() - 1, v = 2 * r() - 1, q = u * u + v * v; if (q > 0 && q < 1) return u * Math.sqrt(-2 * Math.log(q) / q); } }
function simpson(f, a, b, n = 20000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; }
const phi = (x) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
function gammaHalf(m) { // Γ(m/2) tam olarak: Γ(1) = 1, Γ(1/2) = √π, Γ(x + 1) = xΓ(x)
  let x = m % 2 ? 0.5 : 1, g = m % 2 ? Math.sqrt(Math.PI) : 1; while (x < m / 2 - 1e-12) { g *= x; x += 1; } return g;
}
const tdens = (nu) => { const c = gammaHalf(nu + 1) / (Math.sqrt(nu * Math.PI) * gammaHalf(nu)); return (t) => c * (1 + t * t / nu) ** (-(nu + 1) / 2); };

/* ── 1. Normal dağılım: NIST tablosu ve Simpson ── */
// NIST/SEMATECH e-Handbook 1.3.6.7.1: 0'dan z'ye alan
for (const [z, area] of [[1.0, 0.34134], [1.64, 0.44950], [1.65, 0.45053], [1.96, 0.47500], [2.0, 0.47725], [2.58, 0.49506], [3.0, 0.49865]]) abs(K.normCdf(z) - 0.5, area, 5e-6, `NIST Φ(${z})`);
for (const z of [-6, -3.3, -2.5, -1, -0.2, 0, 0.7, 1.96, 2.49, 2.51, 3.6, 5]) abs(K.normCdf(z), 0.5 + Math.sign(z) * simpson(phi, 0, Math.abs(z)), 2e-13, `Φ Simpson ${z}`);
for (const z of [4, 6, 8, 10]) near(K.normCdf(-z), simpson(phi, z, z + 30, 200000), 1e-8, `uç kuyruk ${z}`);
for (const p of [1e-10, 1e-4, 0.01, 0.025, 0.3, 0.5, 0.9, 0.975, 0.999999]) near(K.normCdf(K.normInv(p)), p, 1e-12, `Φ⁻¹ ${p}`);
abs(K.normInv(0.975), 1.959964, 1e-6, "z 0,975"); abs(K.normInv(0.995), 2.575829, 1e-6, "z 0,995"); abs(K.normInv(0.95), 1.644854, 1e-6, "z 0,95");
for (const x of [0, 0.5, 2.4999, 2.5, 2.5001, 4]) near(K.erfcPos(x), 2 * K.normCdf(-x * Math.SQRT2), 1e-12, "erfc ↔ Φ");
abs(K.erfcPos(2.4999999) - K.erfcPos(2.5000001), 0, 1e-9, "seri / sürekli kesir sınırında süreklilik");

/* ── 2. Student t: NIST kritik değerleri, Simpson, kapalı biçimler ── */
// NIST 1.3.6.7.2: üst kuyruk 0,05 / 0,025 / 0,005
const NIST_T = { 1: [6.314, 12.706, 63.657], 2: [2.920, 4.303, 9.925], 4: [2.132, 2.776, 4.604], 9: [1.833, 2.262, 3.250], 10: [1.812, 2.228, 3.169], 19: [1.729, 2.093, 2.861], 24: [1.711, 2.064, 2.797], 29: [1.699, 2.045, 2.756], 30: [1.697, 2.042, 2.750], 99: [1.660, 1.984, 2.626], 100: [1.660, 1.984, 2.626] };
for (const [nu, vals] of Object.entries(NIST_T)) [0.95, 0.975, 0.995].forEach((q, i) => abs(K.tInv(q, +nu), vals[i], 5.01e-4, `NIST t(${q}, ${nu})`));
[0.95, 0.975, 0.995].forEach((q, i) => abs(K.tInv(q, Infinity), [1.645, 1.960, 2.576][i], 5e-4, "NIST t ∞"));
for (const nu of [1, 2, 3, 5, 9, 19, 30, 60]) {
  const f = tdens(nu);
  for (const t of [0.3, 1, 2.1, 4, 9]) near(K.tCdf(t, nu), 0.5 + simpson(f, 0, t), 1e-10, `t Simpson ν=${nu} t=${t}`);
  near(K.tPdf(1.3, nu), f(1.3), 1e-12, "t yoğunluğu");
  for (const p of [0.6, 0.9, 0.99, 0.9999]) near(K.tCdf(K.tInv(p, nu), nu), p, 1e-11, "t⁻¹");
}
for (const t of [-3, -0.5, 0.8, 7]) { near(K.tCdf(t, 1), 0.5 + Math.atan(t) / Math.PI, 1e-13, "Cauchy"); near(K.tCdf(t, 2), 0.5 + t / (2 * Math.sqrt(2 + t * t)), 1e-13, "ν = 2 kapalı biçim"); }
near(K.tCdf(1.7, 1e7), K.normCdf(1.7), 1e-7, "ν → ∞");
for (const x of [0.1, 0.5, 0.93]) { near(K.ibeta(1, 1, x), x, 1e-13, "I(1,1)"); near(K.ibeta(3.5, 1, x), x ** 3.5, 1e-12, "I(a,1)"); near(K.ibeta(1, 4.5, x), 1 - (1 - x) ** 4.5, 1e-12, "I(1,b)"); }
for (const n of [1, 3, 7, 20]) for (const x of [0.5, 3, 12, 30]) { let s = 0, t = 1; for (let k = 0; k < n; k++) { s += t; t *= x / (k + 1); } near(K.gammaP(n, x), 1 - Math.exp(-x) * s, 1e-12, `Erlang P(${n}, ${x})`); }
for (const m of [3, 4, 9, 20, 41]) near(Math.exp(K.lnGamma(m / 2)), gammaHalf(m), 1e-12, "lnΓ");
near(K.c4(2), Math.sqrt(2 / Math.PI), 1e-13, "c₄(2)"); near(K.c4(10), 0.9726593, 1e-6, "c₄(10)");

/* ── 3. Evrenler ve ortalamanın kesin dağılımı ── */
for (const pop of Object.keys(K.POPS)) {
  const cuts = [-30, 50 - 10 * Math.sqrt(3), 40, 50 + 10 * Math.sqrt(3), 450]; // destek sınırlarında böl: Simpson süreksizliği aşmasın
  const I = (g) => { let t = 0; for (let i = 0; i < 4; i++) t += simpson((x) => g(x) * K.popPdf(pop, x), cuts[i] + 1e-12, cuts[i + 1] - 1e-12, 100000); return t; };
  const m1 = I(() => 1), mm = I((x) => x), v = I((x) => (x - 50) ** 2), m3 = I((x) => (x - 50) ** 3), m4 = I((x) => (x - 50) ** 4);
  abs(m1, 1, 1e-8, `${pop} alan`); abs(mm, 50, 1e-6, `${pop} μ`); abs(v, 100, 1e-5, `${pop} σ²`); abs(m3 / 1000, K.POPS[pop].skew, 1e-6, `${pop} γ`); abs(m4 / 1e4 - 3, K.POPS[pop].exkurt, 1e-5, `${pop} κ`);
  for (const n of [1, 2, 5, 30]) {
    const f = K.meanPdf(pop, n);
    if (pop === "uniform" && n > 20) { ok(f === null && K.meanWithin(pop, n, 1) === null, "n > 20 düzgünde kesin yok"); continue; }
    const se = 10 / Math.sqrt(n), lo = 50 - 12 * se, hi = 50 + 14 * se;
    abs(simpson(f, lo, hi, 60000), 1, 2e-3, `${pop} n=${n} kesin yoğunluk alanı`);
    abs(simpson((x) => (x - 50) ** 2 * f(x), lo, hi, 60000), se * se, 0.01 * se * se, `${pop} n=${n} kesin varyans σ²/n`);
    const c = 1.959964 * se; abs(K.meanWithin(pop, n, c), simpson(f, 50 - c, 50 + c, 60000), 2e-3, `${pop} n=${n} P(içinde) = ∫f`);
  }
}
near(K.irwinHallCdf(1.5, 3), 0.5, 1e-12, "Irwin–Hall simetri"); near(K.irwinHallCdf(0.7, 2), 0.245, 1e-12, "üçgen s²/2"); near(K.irwinHallCdf(1.6, 2), 1 - 0.4 ** 2 / 2, 1e-12, "üçgen üst");
near(K.meanWithin("uniform", 1, 19.6), 1, 1e-12, "n = 1 düzgün: ±19,6 bütün desteği kapsar");
near(K.meanWithin("normal", 7, 1.959963984540054 * 10 / Math.sqrt(7)), 0.95, 1e-12, "normal: tam %95");
near(K.meanWithin("expo", 1, 19.6), 1 - Math.exp(-2.96), 1e-12, "üstel n = 1: P(30,4 ≤ X ≤ 69,6) = 1 − e^(−2,96)");
{ // sayfanın üreteci yerine bağımsız örnekleme ile P(içinde) ve E[s] = c₄σ
  const r = xrng(11), N = 200000; let inE = 0, inB = 0, ss = 0;
  for (let k = 0; k < N; k++) {
    let se = 0; for (let i = 0; i < 5; i++) se += 40 - 10 * Math.log(1 - r()); if (Math.abs(se / 5 - 50) <= 1.959964 * 10 / Math.sqrt(5)) inE++;
    let sb = 0; for (let i = 0; i < 3; i++) sb += (r() < 0.5 ? 50 - Math.sqrt(84) : 50 + Math.sqrt(84)) + 4 * polar(r); if (Math.abs(sb / 3 - 50) <= 1.959964 * 10 / Math.sqrt(3)) inB++;
    const xs = [polar(r), polar(r), polar(r), polar(r)], m = xs.reduce((a, b) => a + b) / 4; ss += Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / 3);
  }
  const se = (p) => 4 * Math.sqrt(p * (1 - p) / N);
  const pe = K.meanWithin("expo", 5, 1.959964 * 10 / Math.sqrt(5)), pb = K.meanWithin("bimodal", 3, 1.959964 * 10 / Math.sqrt(3));
  abs(inE / N, pe, se(pe), "üstel n=5 kesin P(içinde)"); abs(inB / N, pb, se(pb), "karışım n=3 kesin P(içinde)"); abs(ss / N, K.c4(4), 0.004, "E[s] = c₄σ (n = 4)");
  near(pe, 0.95620, 2e-5, "üstel n=5: %95,62");
}
// örnekleme dağılımı: birkaç tohumda ölçülen değerler kendi oynaklıkları içinde
for (const pop of Object.keys(K.POPS)) for (const n of [1, 5, 30]) for (const seed of [1, 2, 3]) {
  const s = K.samplingDist({ pop, n, K: 20000, seed });
  abs(s.mean, 50, 4.5 * s.theory.se / Math.sqrt(s.K), `${pop} ortalama`); abs(s.sd, s.theory.se, 4.5 * s.sdSE, `${pop} SH`);
  if (n >= 5) { abs(s.skew, s.theory.skew, 5 * s.skewSE + 0.02, `${pop} n=${n} çarpıklık`); abs(s.exkurt, s.theory.exkurt, 5 * s.kurtSE + 0.05, `${pop} n=${n} basıklık`); }
  if (s.theory.inside !== null) abs(s.inside, s.theory.inside, 4.5 * Math.sqrt(0.05 * 0.95 / s.K), `${pop} n=${n} içinde`);
  ok(s.example.length === n && s.means.length === 20000, "boyutlar");
}
{ const s = K.samplingDist({ pop: "expo", n: 5, K: 5000, seed: 1 }); near(s.sd, 4.41500, 1e-4, "varsayılan SH"); near(s.skew, 0.8449, 1e-3, "varsayılan çarpıklık"); near(s.inside, 0.9556, 1e-9, "varsayılan içinde"); }
{ const c = K.convergence({ pop: "expo", K: 5000, seed: 1 }); ok(c.length === 7 && c[0].n === 1 && Math.abs(c[0].skew - 2) < 0.4, "n = 1 çarpıklık ≈ 2"); }
assert.throws(() => K.samplingDist({ pop: "yok", n: 5, K: 10, seed: 1 })); assert.throws(() => K.samplingDist({ pop: "normal", n: 0, K: 10, seed: 1 })); checks += 2;

/* ── 4. Güven aralıkları: kapsama kuramı bağımsız MC ile ── */
for (const [n, lev] of [[2, 0.95], [3, 0.95], [5, 0.9], [10, 0.99], [30, 0.95]]) {
  const th = K.ciTheory(n, lev), r = xrng(n * 7 + 3), N = 100000, zc = th.zc; let cz = 0, czs = 0, ct = 0, w = 0;
  for (let k = 0; k < N; k++) { const xs = Array.from({ length: n }, () => polar(r)), m = xs.reduce((a, b) => a + b) / n, s = Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / (n - 1)), e = Math.abs(m) * Math.sqrt(n); if (e <= zc) cz++; if (e <= zc * s) czs++; if (e <= th.tc * s) ct++; w += s; }
  const t4 = (p) => 4 * Math.sqrt(p * (1 - p) / N);
  abs(cz / N, lev, t4(lev), "z σ bilinir"); abs(czs / N, th.coverZs, t4(th.coverZs), `z ile s n=${n}`); abs(ct / N, lev, t4(lev), "t kapsaması");
  near(th.widthZs, 2 * zc * 10 * (w / N) / Math.sqrt(n), 0.01, "E[genişlik] = 2z*c₄σ/√n");
  const sim = K.ciSim({ pop: "normal", n, K: 20000, level: lev, seed: n });
  const t5 = (p) => 4.5 * Math.sqrt(p * (1 - p) / 20000);
  abs(sim.coverZ, lev, t5(lev), "sayfa z"); abs(sim.coverZs, th.coverZs, t5(th.coverZs), "sayfa z ile s"); abs(sim.coverT, lev, t5(lev), "sayfa t");
}
abs(K.ciTheory(3, 0.95).coverZs, 0.810938, 1e-6, "n = 3: P(|T₂| ≤ 1,96) = 1,96/√(2 + 1,96²)"); near(K.ciTheory(3, 0.95).coverZs, 1.959963984540054 / Math.sqrt(2 + 1.959963984540054 ** 2), 1e-12, "ν = 2 kapalı biçim");
{ const s = K.ciSim({ pop: "normal", n: 10, K: 10000, level: 0.95, seed: 1 }); near(s.coverT, 0.9487, 1e-9, "varsayılan t kapsaması"); near(s.coverZs, 0.9167, 1e-9, "varsayılan z ile s"); ok(s.list.length === 100, "100 aralık"); }
{ const s = K.ciSim({ pop: "expo", n: 5, K: 20000, level: 0.95, seed: 4 }); ok(s.coverT < 0.92, `çarpık evrende t düşük kapsar ${s.coverT}`); abs(s.coverZ, K.meanWithin("expo", 5, K.normInv(0.975) * 10 / Math.sqrt(5)), 0.007, "üstelde σ bilinirken kesin"); }
{ const c = K.widthCurve({ pop: "normal", level: 0.95, seed: 1 }); c.forEach((p) => near(p.widthT, K.ciTheory(p.n, 0.95).widthT, 0.08, `genişlik eğrisi n=${p.n}`)); near(c[6].widthT / c[3].widthT, Math.sqrt(10) ** -1 * K.tInv(0.975, 99) * K.c4(100) / (K.tInv(0.975, 9) * K.c4(10)), 0.05, "1/√n"); }

/* ── 5. Test, p-değeri, merkezsel olmayan t ── */
near(K.pValue(1.959963984540054, "z", 9, "two"), 0.05, 1e-12, "p(1,96) = 0,05"); abs(K.pValue(2.262, "t", 9, "two"), 0.05, 2e-5, "NIST t(9)");
near(K.pValue(1.3, "t", 7, "right") + K.pValue(1.3, "t", 7, "left"), 1, 1e-13, "tek yönlüler toplamı"); near(K.pValue(-2, "z", 0, "two"), 2 * K.normCdf(-2), 1e-15, "iki yönlü simetrik");
for (const [a, k, df, sd] of [[0.05, "t", 19, "two"], [0.01, "z", 4, "right"], [0.1, "t", 2, "left"]]) near(K.pValue(K.crit(a, k, df, sd) * (sd === "left" ? -1 : 1), k, df, sd), a, 1e-10, "p(kritik) = α");
assert.throws(() => K.pValue(1, "z", 3, "yok")); checks++;
function mcNct(t, nu, delta, N, seed) { const r = xrng(seed); let c = 0; for (let k = 0; k < N; k++) { let v = 0; for (let i = 0; i < nu; i++) { const g = polar(r); v += g * g; } if ((polar(r) + delta) / Math.sqrt(v / nu) <= t) c++; } return c / N; }
for (const [t, nu, delta] of [[2, 1, 1], [1.5, 4, 2], [-0.5, 4, 0.7], [2.093, 19, 2.236], [3, 9, 3.5]]) { const p = K.nctCdf(t, nu, delta), m = mcNct(t, nu, delta, 300000, nu * 13 + 1); abs(m, p, 4 * Math.sqrt(p * (1 - p) / 300000) + 1e-4, `merkezsel olmayan t (${t}, ${nu}, ${delta})`); }
near(K.nctCdf(1.2, 6, 1e-12), K.tCdf(1.2, 6), 1e-9, "δ → 0"); near(simpson((x) => K.nctPdf(x, 5, 1.5), -15, 40, 4000), 1, 2e-4, "nct yoğunluğu alanı");
near(K.nctPdf(0.9, 7, 1.1), (K.nctCdf(0.9 + 1e-4, 7, 1.1) - K.nctCdf(0.9 - 1e-4, 7, 1.1)) / 2e-4, 1e-6, "yoğunluk = türev");
for (const kind of ["z", "t"]) for (const sides of ["two", "right", "left"]) for (const a of [0.1, 0.05, 0.01]) near(K.power({ d: 0, n: 12, alpha: a, sides, kind }), a, 1e-9, `d = 0 → α (${kind}, ${sides})`);
{ // z gücü: kapalı biçim yerine bağımsız MC
  const r = xrng(5), N = 200000; let c = 0; const cr = K.normInv(0.975); for (let k = 0; k < N; k++) { const z = polar(r) + 0.5 * Math.sqrt(20); if (Math.abs(z) >= cr) c++; }
  const p = K.power({ d: 0.5, n: 20, alpha: 0.05, sides: "two", kind: "z" }); abs(c / N, p, 4 * Math.sqrt(p * (1 - p) / N), "z gücü MC"); near(p, 0.608779, 1e-5, "z gücü %60,88");
}
near(K.power({ d: 0.5, n: 20, alpha: 0.05, sides: "two", kind: "t" }), 0.564504, 1e-5, "t gücü %56,45");
ok(K.power({ d: 0.5, n: 20, alpha: 0.05, sides: "left", kind: "t" }) < 0.001, "yanlış yönlü tek yönlü test");
for (const [mu, n, a, sides, kind, seed] of [[50, 20, 0.05, "two", "t", 1], [50, 5, 0.01, "right", "z", 2], [50, 3, 0.1, "left", "t", 3], [55, 20, 0.05, "two", "t", 4], [52, 60, 0.05, "right", "z", 5], [48, 15, 0.1, "left", "t", 6]]) {
  const s = K.testSim({ mu, n, K: 20000, alpha: a, sides, kind, seed }), th = K.power({ d: (mu - 50) / 10, n, alpha: a, sides, kind });
  abs(s.reject, th, 4.5 * Math.sqrt(th * (1 - th) / 20000), `ret oranı ${mu}/${n}/${kind}/${sides}`);
  const f = K.testSim({ mu, n, K: 20000, alpha: a, sides, kind, seed, pvals: false }); ok(f.reject === s.reject, "p ≤ α ile |istatistik| ≥ kritik aynı kararı verir");
  if (mu === 50) ok(K.chiUniform(s.hist).p > 1e-3, "H₀ altında p düzgün");
}
{ const s = K.testSim({ mu: 50, n: 20, K: 10000, alpha: 0.05, sides: "two", kind: "t", seed: 1 }); near(s.reject, 0.0485, 1e-12, "varsayılan ret"); near(K.chiUniform(s.hist).chi2, 18.564, 1e-9, "varsayılan χ²"); }
near(K.chiUniform(new Int32Array(20).fill(50)).p, 1, 1e-12, "tam düzgün χ²");
{ near(1 - K.gammaP(9.5, 18.564 / 2), K.chiUniform(K.testSim({ mu: 50, n: 20, K: 10000, alpha: 0.05, sides: "two", kind: "t", seed: 1 }).hist).p, 1e-12, "χ² üst kuyruğu"); }
{ const o = K.drawOne({ mu: 50, n: 20, seed: 1, idx: 0 }), o5 = K.drawOne({ mu: 55, n: 20, seed: 1, idx: 0 }); near(o5.mean - o.mean, 5, 1e-12, "ortak rastgele sayılar"); near(o.sd, o5.sd, 1e-12, "s aynı"); near(K.testStat(o, { mu0: 50, kind: "t" }).stat, (o.mean - 50) / (o.sd / Math.sqrt(20)), 1e-14, "t istatistiği"); }

/* ── 6. Gereken n ve çoklu test ── */
near(K.requiredN({ d: 0.5, alpha: 0.05, sides: "two", kind: "z", target: 0.8 }).approx, ((1.959963984540054 + 0.8416212335729143) / 0.5) ** 2, 1e-9, "yaklaşık formül");
for (const [d, a, sides, kind, tg] of [[0.5, 0.05, "two", "t", 0.8], [0.5, 0.05, "two", "z", 0.8], [0.2, 0.05, "two", "t", 0.8], [1.2, 0.01, "right", "t", 0.95], [0.8, 0.1, "right", "z", 0.9], [1.5, 0.1, "two", "t", 0.8]]) {
  const rq = K.requiredN({ d, alpha: a, sides, kind, target: tg }), pw = (n) => K.power({ d, n, alpha: a, sides, kind });
  let brute = 2; while (pw(brute) < tg) brute++;
  ok(rq.exact === brute, `gereken n ${rq.exact} = kaba arama ${brute}`); ok(rq.exact === 2 || pw(rq.exact - 1) < tg, "bir eksiği yetmez");
  ok(kind === "t" ? rq.exact >= Math.ceil(rq.approx - 1e-9) : Math.abs(rq.exact - Math.ceil(rq.approx)) <= 1, "t ≥ z formülü");
}
ok(K.requiredN({ d: 0.5, alpha: 0.05, sides: "two", kind: "t", target: 0.8 }).exact === 34 && K.requiredN({ d: 0.2, alpha: 0.05, sides: "two", kind: "t", target: 0.8 }).exact === 199, "34 ve 199");
ok(K.requiredN({ d: 0, alpha: 0.05, sides: "two", kind: "t", target: 0.8 }) === null, "d = 0 tanımsız");
{ // n = 34'te t gücü %80'in üstünde, 33'te altında: bağımsız MC ile
  const r = xrng(77), N = 200000, run = (n) => { const cr = K.tInv(0.975, n - 1); let c = 0; for (let k = 0; k < N; k++) { let m = 0, q = 0; for (let i = 1; i <= n; i++) { const x = polar(r) + 0.5, dd = x - m; m += dd / i; q += dd * (x - m); } if (Math.abs(m / Math.sqrt(q / (n - 1) / n)) >= cr) c++; } return c / N; };
  const p34 = K.power({ d: 0.5, n: 34, alpha: 0.05, sides: "two", kind: "t" }); abs(run(34), p34, 4 * Math.sqrt(0.16 / N), "n = 34 güç MC");
}
for (const m of [1, 5, 20, 100]) for (const a of [0.05, 0.01]) {
  const f = K.familySim({ m, alpha: a, K: 20000, seed: m }), t = K.fwerTheory(m, a), s4 = (p) => 4.5 * Math.sqrt(Math.max(p * (1 - p), 1e-6) / 20000);
  abs(f.fwer, t.fwer, s4(t.fwer), `FWER m=${m}`); abs(f.fwerB, t.fwerB, s4(t.fwerB), `Bonferroni m=${m}`); abs(f.meanFP, m * a, 4.5 * Math.sqrt(m * a * (1 - a) / 20000), "yanlış pozitif sayısı");
  ok(t.fwerB <= a + 1e-15, "Bonferroni ≤ α"); if (m === 1) near(t.fwer, a, 1e-15, "m = 1");
}
near(K.fwerTheory(20, 0.05).fwer, 1 - 0.95 ** 20, 1e-15, "1 − 0,95²⁰"); abs(K.fwerTheory(20, 0.05).fwer, 0.6415, 1e-4, "%64,15");
{ const f = K.familySim({ m: 20, alpha: 0.05, K: 10000, seed: 1 }); near(f.fwer, 0.6335, 1e-12, "varsayılan FWER"); near(f.fwerB, 0.0498, 1e-12, "varsayılan Bonferroni"); }
console.log(`G hipotez: ${checks.toLocaleString("tr-TR")} bağımsız tablo, integral, kapalı biçim ve Monte Carlo kontrolü PASS`);

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
      const has = async (id, t) => { await page.waitForFunction(([i, s]) => document.getElementById(i).textContent.includes(s), [id, t], { timeout: 8000 }).catch(() => {}); const v = await read(id); assert(v.includes(t), `${id}: "${v}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const reset = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); };
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      await page.waitForSelector("section.digest", { timeout: 8000 }).catch(() => {});
      ok(await page.evaluate((s) => !!window.ACELYA_DIGEST?.[s] && !!document.querySelector("section.digest") && /Belirsizliği Ölçmek/.test(document.querySelector("section.digest").textContent), SLUG), "defter yüklü ve görünür");
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuval etiketleri");
      ok(await page.evaluate(() => !/[̂̄̅̇]/.test(document.querySelector(".app-content").textContent)), "birleşik işaret yok");
      const inked = (id) => page.locator("#" + id).evaluate((c) => { const g = c.getContext("2d"), d = g.getImageData(0, 0, c.width, c.height).data; const r0 = d[0], g0 = d[1], b0 = d[2]; let n = 0; for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - r0) + Math.abs(d[i + 1] - g0) + Math.abs(d[i + 2] - b0) > 40) n++; return n / (d.length / 4); });
      // 1 · örnekleme dağılımı
      await has("s1SE", "4,4150"); await has("s1SED", "−%1,28"); await has("s1SEth", "4,4721"); await has("s1Skew", "0,845"); await has("s1SkewD", "kuram 0,894"); await has("s1KurtD", "kuram 1,200"); await has("s1In", "%95,56"); await has("s1InD", "kesin %95,62"); await has("s1Status", "hâlâ sağa çarpık");
      for (const id of ["s1Pop", "s1Hist", "s1Conv"]) ok((await inked(id)) > 0.01, `${id} çizili`);
      await page.click("#s1n30"); await has("s1Skew", "0,345"); await has("s1InD", "kesin %95,19");
      await page.click("#s1n1"); await has("s1Status", "evrenin kendisidir"); await has("s1Skew", "2,138"); await has("s1SkewD", "kuram 2,000"); await page.click("#s1n100"); await has("s1SEth", "1,0000");
      await sel("s1PopSel", "uniform"); await has("s1InD", "n > 20"); await range("s1N", 20); await has("s1InD", "kesin"); await sel("s1PopSel", "normal"); await has("s1Status", "tam olarak normaldir"); await sel("s1PopSel", "bimodal"); await has("s1Status", "simetrik");
      await sel("s1K", "500"); await has("s1Status", "K = 500"); await page.click("#s1New"); ok((await page.locator("#s1Seed").inputValue()) === "2", "yeni tohum");
      await page.locator("#s1Seed").fill("abc"); await page.locator("#s1Seed").dispatchEvent("change"); await has("s1Status", "n = 20");
      await reset(); await has("s1SE", "4,4150"); ok((await page.locator("#s1PopSel").inputValue()) === "expo", "R sıfırlar");
      // sekme klavyesi
      await page.locator("#tab-samp").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-power").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-ci").getAttribute("aria-selected")) === "true", "ArrowRight");
      ok(await page.locator("#panel-samp").isHidden(), "tek panel görünür");
      // 2 · güven aralığı
      await has("s2CovT", "%94,87"); await has("s2CovZs", "%91,67"); await has("s2CovZsD", "kuram %91,84"); await has("s2CovZ", "%94,93"); await has("s2WT", "13,897"); await has("s2WTD", "13,916"); await has("s2Crit", "2,2622");
      for (const id of ["s2Stack", "s2Width"]) ok((await inked(id)) > 0.01, `${id} çizili`);
      await page.click("#s2Small"); await has("s2CovZs", "%80,66"); await has("s2CovZsD", "kuram %81,09"); await has("s2StackTitle", "σ yerine s");
      await page.click("#s2Skew"); await has("s2CovT", "%88,42"); await has("s2Status", "ölçüm oynaklığından açıkça büyük"); await has("s2CovZD", "kesin (bu evren) %95,62");
      await range("s2N", 2); await has("s2Crit", "12,7062"); await range("s2N", 100); await has("s2NOut", "100");
      await sel("s2Level", "0.99"); await has("s2Crit", "2,5758"); await sel("s2Method", "z"); await has("s2StackTitle", "σ bilinir");
      await reset(); await has("s2CovT", "%94,87"); await page.click("#s2New"); ok((await page.locator("#s2Seed").inputValue()) === "2", "yeni tohum 2"); await page.click("#s2Reset"); await has("s2CovT", "%94,87");
      // 3 · p-değeri
      await page.click("#tab-test");
      await has("s3Xbar", "53,127 · 9,059"); await has("s3Stat", "1,544"); await has("s3StatD", "±2,093"); await has("s3P", "0,1391"); await has("s3PD", "reddedilmez"); await has("s3Rej", "%4,85"); await has("s3Chi", "18,6"); await has("s3ChiD", "bağdaşır");
      for (const id of ["s3Dist", "s3PHist"]) ok((await inked(id)) > 0.01, `${id} çizili`);
      await page.click("#s3Draw"); await has("s3XbarD", "örneklem 2");
      await page.click("#s3H1"); await has("s3Rej", "%56,60"); await has("s3Th", "%56,45 · β = %43,55"); await has("s3P", "× 10⁻⁴"); await has("s3PD", "reddedilir"); await has("s3ChiD", "beklenmez");
      await sel("s3Sides", "left"); await has("s3Status", "yanlış yöne"); await sel("s3Sides", "two");
      await sel("s3Kind", "z"); await has("s3StatLab", "z"); await has("s3Th", "%60,88"); await has("s3Status", "σ = 10");
      await range("s3Mu", 40); await range("s3N", 100); await has("s3Th", "%100,00"); await range("s3N", 2); await has("s3NOut", "2");
      await reset(); await has("s3Rej", "%4,85"); await has("s3XbarD", "örneklem 1");
      // 4 · güç
      await page.click("#tab-power");
      await has("s4Pth", "%56,45"); await has("s4PthZ", "%60,88"); await has("s4Psim", "%56,60"); await has("s4Nex", "n = 34"); await has("s4Nap", "31,40"); await has("s4Fw", "%63,35"); await has("s4FwD", "%64,15"); await has("s4FwB", "%4,98"); await has("s4Fp", "0,998");
      for (const id of ["s4PowD", "s4PowN", "s4Fam", "s4Fwer"]) ok((await inked(id)) > 0.005, `${id} çizili`);
      await page.click("#s4UseN"); await has("s4NOut", "34"); await has("s4Pth", "%80,78"); await has("s4Status", "ulaşıldı");
      await page.click("#s4Small"); await has("s4Nex", "n = 199"); await has("s4Nap", "196,22");
      await range("s4D", 0.05); await page.click("#s4UseN"); await has("s4Status", "üst sınırı 300"); await has("s4NOut", "300");
      await range("s4D", 0); await has("s4Pth", "tanımsız"); await has("s4Nex", "tanımsız"); await has("s4PsimD", "I. tür hata");
      await range("s4M", 1); await has("s4FwD", "%5,00"); await range("s4M", 100); await has("s4MOut", "100"); await sel("s4Alpha", "0.01"); await has("s4FwD", "%63,40");
      await sel("s4Kind", "z"); await sel("s4Sides", "right"); await sel("s4Target", "0.95"); await has("s4PthZ", "t testiyle");
      await reset(); await has("s4Pth", "%56,45"); await has("s4Fw", "%63,35");
      ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      for (const t of ["samp", "ci", "test"]) { await page.click("#tab-" + t); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${t} taşma yok`); }
      ok(await page.evaluate(() => Object.isFrozen(HypothesisLab) && !Object.getOwnPropertyDescriptor(window, "HypothesisLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G hipotez: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
