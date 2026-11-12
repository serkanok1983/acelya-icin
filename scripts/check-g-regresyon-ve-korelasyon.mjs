// G · regresyon-ve-korelasyon.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// ortalanmış kapalı biçim ve Nelder–Mead en küçüklemesi, açık şapka matrisi X(XᵀX)⁻¹Xᵀ, noktayı silip yeniden
// uydurma, Cramer kuralıyla 3×3 normal denklemler, t ve normal yoğunluğunun Simpson integrali, yayımlanmış t tablosu
// değerleri, Wikipedia'daki Anscombe özetleri, bağımsız bir üreteçle (64 bit LCG) Monte Carlo, kesik normal
// varyansının sayısal integrali, çift eğimlerinin ayrı sıralanması.
// Kullanım: node scripts/check-g-regresyon-ve-korelasyon.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "regresyon-ve-korelasyon";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.RegressionLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(!/fonts\.googleapis|atlas\.css|atlas\.js|stem-content|cdn\./.test(html), "atlas dosyası, Google Fonts ya da CDN yok");
ok(/<body class="app-page" data-page="regresyon-ve-korelasyon">/.test(html) && html.includes("<title>Regresyon ve Korelasyon: En Küçük Kareler, Artıklar ve Nedensellik</title>") && /name="description"/.test(html), "kabuk");
ok(/shared\/theme\.css/.test(html) && /shared\/app\.js/.test(html), "theme.css ve app.js");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}☀-➿]/u.test(html), "emoji yok");

function lcg(seed) { let s = BigInt(seed); return () => { s = (s * 6364136223846793005n + 1442695040888963407n) & ((1n << 64n) - 1n); return Number(s >> 11n) / 2 ** 53; }; }
function normals(r) { return () => { let u = r(); while (u === 0) u = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r()); }; }
function simpson(f, a, b, n = 20000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; }
function nelder(f, x0, step) {
  const n = x0.length; let P = [x0.slice()]; for (let i = 0; i < n; i++) { const p = x0.slice(); p[i] += step[i]; P.push(p); }
  let F = P.map(f);
  for (let it = 0; it < 20000; it++) {
    const idx = F.map((v, i) => i).sort((a, b) => F[a] - F[b]); P = idx.map((i) => P[i]); F = idx.map((i) => F[i]);
    if (Math.abs(F[n] - F[0]) < 1e-16 * (1 + Math.abs(F[0]))) break;
    const c = new Array(n).fill(0); for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) c[j] += P[i][j] / n;
    const tr = (t) => c.map((v, j) => v + t * (P[n][j] - v));
    const xr = tr(-1), fr = f(xr);
    if (fr < F[0]) { const xe = tr(-2), fe = f(xe); [P[n], F[n]] = fe < fr ? [xe, fe] : [xr, fr]; }
    else if (fr < F[n - 1]) { P[n] = xr; F[n] = fr; }
    else { const xc = tr(0.5), fc = f(xc); if (fc < F[n]) { P[n] = xc; F[n] = fc; } else { for (let i = 1; i <= n; i++) { P[i] = P[i].map((v, j) => P[0][j] + 0.5 * (v - P[0][j])); F[i] = f(P[i]); } } }
  }
  return P[0];
}
const mean = (v) => v.reduce((a, b) => a + b, 0) / v.length;
function corrRef(x, y) { const mx = mean(x), my = mean(y); let a = 0, b = 0, c = 0; for (let i = 0; i < x.length; i++) { a += (x[i] - mx) * (y[i] - my); b += (x[i] - mx) ** 2; c += (y[i] - my) ** 2; } return a / Math.sqrt(b * c); }
function olsRef(x, y) { const mx = mean(x), my = mean(y); let sxy = 0, sxx = 0; for (let i = 0; i < x.length; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) ** 2; } const b = sxy / sxx; return { a: my - b * mx, b }; }
const det3 = (m) => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

/* ── 1 · En küçük kareler ── */
{
  const r = lcg(3), g = normals(lcg(4));
  for (let t = 0; t < 60; t++) {
    const n = 3 + Math.floor(r() * 28), x = [], y = [];
    for (let i = 0; i < n; i++) { const xi = 10 * r(); x.push(xi); y.push(1 + 0.7 * xi + 2 * (r() - 0.5) * 3 * g()); }
    const F = K.fit(x, y), R = olsRef(x, y), N = K.normalEq(x, y);
    near(F.b, R.b, 1e-9, "eğim, ortalanmış biçim"); near(F.a, R.a, 1e-9, "kesişim");
    near(N.M[0][0] * N.a + N.M[0][1] * N.b, N.v[0], 1e-9, "1. normal denklem"); near(N.M[1][0] * N.a + N.M[1][1] * N.b, N.v[1], 1e-9, "2. normal denklem");
    const NM = nelder((p) => x.reduce((s, xi, i) => s + (y[i] - p[0] - p[1] * xi) ** 2, 0), [0, 0], [1, 0.3]);
    abs(NM[0], F.a, 1e-5 * (1 + Math.abs(F.a)), "Nelder–Mead a"); abs(NM[1], F.b, 1e-5 * (1 + Math.abs(F.b)), "Nelder–Mead b");
    const B = K.bruteFit(x, y); ok(B.converged, "kaba kuvvet yakınsadı");
    abs(B.a, F.a, 1e-5 * (1 + Math.abs(F.a)), "kaba a"); abs(B.b, F.b, 1e-5 * (1 + Math.abs(F.b)), "kaba b"); ok(B.sse >= F.SSE - 1e-12 * (1 + F.SSE), "kaba SSE ≥ en küçük");
    const S = mean(y), SST = y.reduce((s, v) => s + (v - S) ** 2, 0);
    near(F.SST, SST, 1e-10); near(F.SSE + F.SSR, SST, 1e-9, "SST = SSE + SSR"); near(F.R2, corrRef(x, y) ** 2, 1e-9, "R² = r²");
    if (n > 2) near(F.seB, Math.sqrt(F.SSE / (n - 2) / x.reduce((s, v) => s + (v - mean(x)) ** 2, 0)), 1e-10, "SE(b)");
    // fazla SSE: başka bir doğrunun SSE'si − en küçük = Σ(Δa + Δb·x)² (doğrudan sayım ile)
    const ua = F.a + 2 * r() - 1, ub = F.b + r() - 0.5;
    near(K.sse(x, y, ua, ub) - F.SSE, x.reduce((s, xi) => s + (ua - F.a + (ub - F.b) * xi) ** 2, 0), 1e-8, "fazla SSE");
  }
  // sınırlar
  ok(!K.fit([3, 3, 3], [1, 2, 3]).ok && K.bruteFit([3, 3, 3], [1, 2, 3]) === null && K.normalEq([3, 3], [1, 2]) === null, "dikey sütun: eğim tanımsız");
  const T = K.fit([1, 4], [2, 5]); ok(T.ok && T.df === 0 && T.s === null && Math.abs(T.R2 - 1) < 1e-12, "iki nokta: R² = 1, s tanımsız");
  const H = K.fit([1, 2, 3, 4], [5, 5, 5, 5]); ok(H.ok && H.R2 === null && H.r === null && Math.abs(H.b) < 1e-12, "yatay: R² tanımsız");
  // varsayılan veri (tohum 1, n 10, β 0,6, σ 1)
  const D = K.genOls(10, 0.6, 1, 1), F = K.fit(D.x, D.y), B = K.bruteFit(D.x, D.y);
  ok(D.x.length === 10 && D.clamped === 0 && D.x.every((v) => v >= 0.5 && v <= 9.5), "varsayılan üreteç");
  ok(JSON.stringify(D.x) === "[3.18,6.83,8.63,4.17,7.15,6.21,1.86,5.65,9.21,6.3]", "varsayılan x");
  abs(F.b, 0.345610057, 1e-8, "varsayılan b"); abs(F.a, 3.71233407, 1e-7, "varsayılan a"); abs(F.R2, 0.393401728, 1e-8, "varsayılan R²");
  ok(Math.max(Math.abs(B.a - F.a), Math.abs(B.b - F.b)) < 1e-6, "varsayılan kaba kuvvet farkı < 10⁻⁶");
  for (let s = 1; s <= 200; s++) { const G = K.genOls(30, 1, 3, s); ok(G.y.every((v) => v >= 0.1 && v <= 9.9) && G.x.every((v) => Math.round(v * 100) === Math.round(v * 100 + 1e-9)), "kırpma ve yuvarlama"); }
}

/* ── t, normal ve χ² ── */
{
  const tpdf = (t, n) => Math.exp(K.lnGamma((n + 1) / 2) - K.lnGamma(n / 2)) / Math.sqrt(n * Math.PI) * (1 + t * t / n) ** (-(n + 1) / 2);
  for (const n of [1, 2, 5, 9, 28, 100]) for (const t of [0.3, 1, 2.2, 4]) near(K.tCdf(t, n), 0.5 + simpson((u) => tpdf(u, n), 0, t), 1e-9, `t cdf (${t}, ${n})`);
  // yayımlanmış t tablosu (iki yanlı)
  for (const [p, n, v] of [[0.975, 1, 12.7062], [0.975, 9, 2.2622], [0.975, 28, 2.0484], [0.95, 10, 1.8125], [0.995, 1, 63.6567], [0.995, 20, 2.8453], [0.975, 120, 1.9799]]) abs(K.tQuantile(p, n), v, 6e-5, `t tablosu ${p}, ${n}`);
  for (const n of [1, 3, 17]) for (const p of [0.6, 0.9, 0.99]) abs(K.tCdf(K.tQuantile(p, n), n), p, 1e-12, "tQuantile ters"); near(K.tQuantile(0.025, 7), -K.tQuantile(0.975, 7), 1e-12);
  const phi = (z) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);
  for (const z of [-3.2, -1, 0, 0.4, 2.5]) abs(K.normCdf(z), 0.5 + Math.sign(z) * simpson(phi, 0, Math.abs(z)), 1e-12, `Φ(${z})`);
  for (const p of [0.001, 0.025, 0.3, 0.5, 0.8, 0.975, 0.9995]) { let lo = -8, hi = 8; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (0.5 + Math.sign(m) * simpson(phi, 0, Math.abs(m), 4000) < p) lo = m; else hi = m; } abs(K.normQuantile(p), (lo + hi) / 2, 1e-8, `Φ⁻¹(${p})`); }
  abs(K.normQuantile(0.975), 1.959964, 1e-6); abs(K.chi2Q1(3.841459), 0.05, 1e-6, "χ²₁ %95"); abs(K.chi2Q1(6.634897), 0.01, 1e-6, "χ²₁ %99");
}

/* ── 2 · Artıklar ve varsayımlar ── */
{
  // eğrilik testi: ham x ile Cramer kuralı (sayfa ortalanmış x ve Gauss–Jordan kullanır)
  const r = lcg(9), g = normals(lcg(10));
  for (let t = 0; t < 30; t++) {
    const n = 6 + Math.floor(r() * 50), x = [], y = []; for (let i = 0; i < n; i++) { const xi = 10 * r(); x.push(xi); y.push(1 + 0.4 * xi + (t % 2 ? 0.08 : 0) * xi * xi + g()); }
    const M = [0, 1, 2].map((i) => [0, 1, 2].map((j) => x.reduce((s, v) => s + v ** (i + j), 0))), v = [0, 1, 2].map((i) => x.reduce((s, xi, k) => s + xi ** i * y[k], 0));
    const D = det3(M), M2 = M.map((row, i) => [row[0], row[1], v[i]]), c = det3(M2) / D;
    const sse = x.reduce((s, xi, k) => { const a0 = det3(M.map((row, i) => [v[i], row[1], row[2]])) / D, a1 = det3(M.map((row, i) => [row[0], v[i], row[2]])) / D; return s + (y[k] - a0 - a1 * xi - c * xi * xi) ** 2; }, 0);
    const cof = (M[0][0] * M[1][1] - M[0][1] * M[1][0]) / D, se = Math.sqrt(sse / (n - 3) * cof);
    const Q = K.quadTest(x, y); near(Q.c, c, 1e-7, "x² katsayısı"); near(Q.se, se, 1e-6, "x² SE");
    const F = K.fit(x, y), e2 = F.e.map((e) => e * e), BP = K.bpTest(x, y); near(BP.LM, n * corrRef(x, e2) ** 2, 1e-9, "BP = n·R²");
  }
  // Anscombe: Wikipedia'daki özetler (12 Kasım 2026'da açıldı)
  for (let k = 0; k < 4; k++) {
    const x = Array.from(K.ANSCOMBE[k].x), y = Array.from(K.ANSCOMBE[k].y), F = K.fit(x, y);
    ok(x.length === 11, "11 nokta"); near(mean(x), 9, 1e-12); near(x.reduce((s, v) => s + (v - 9) ** 2, 0) / 10, 11, 1e-12, "s²ₓ = 11");
    abs(mean(y), 7.50, 0.005, "ȳ"); abs(y.reduce((s, v) => s + (v - mean(y)) ** 2, 0) / 10, 4.125, 0.003, "s²ᵧ"); abs(corrRef(x, y), 0.816, 0.001, "r (IV: 0,8165)");
    abs(F.a, 3.00, 0.005, "a"); abs(F.b, 0.500, 0.0005, "b"); abs(F.R2, 0.67, 0.005, "R²");
  }
  ok(K.influence(Array.from(K.ANSCOMBE[3].x), Array.from(K.ANSCOMBE[3].y)).h[7] === 1, "Anscombe IV: h = 1");
  const Q2 = K.quadTest(Array.from(K.ANSCOMBE[1].x), Array.from(K.ANSCOMBE[1].y)); ok(Q2.p < 1e-6, "Anscombe II eğri");
  // güven aralığı kapsaması: bağımsız üreteç ve Simpson'dan t kritik değeri
  const tpdf = (t, n) => Math.exp(K.lnGamma((n + 1) / 2) - K.lnGamma(n / 2)) / Math.sqrt(n * Math.PI) * (1 + t * t / n) ** (-(n + 1) / 2);
  let lo = 0, hi = 5; for (let i = 0; i < 100; i++) { const m = (lo + hi) / 2; if (0.5 + simpson((u) => tpdf(u, 18), 0, m, 4000) < 0.975) lo = m; else hi = m; }
  const tc = (lo + hi) / 2, rr = lcg(21), gg = normals(lcg(22)); let hitL = 0, hitH = 0; const M = 4000;
  for (let t = 0; t < M; t++) for (const het of [false, true]) {
    const x = [], y = []; for (let i = 0; i < 20; i++) { const xi = 10 * rr(); x.push(xi); y.push(2 + 0.5 * xi + (het ? xi / 5 : 1) * gg()); }
    const R = olsRef(x, y), sse = x.reduce((s, xi, i) => s + (y[i] - R.a - R.b * xi) ** 2, 0), se = Math.sqrt(sse / 18 / x.reduce((s, v) => s + (v - mean(x)) ** 2, 0));
    const I = K.slopeInference(x, y, 0.95); near(I.tc, tc, 1e-7, "t kritik"); near(I.lo, R.b - tc * se, 1e-7, "alt sınır");
    if (Math.abs(R.b - 0.5) <= tc * se) { if (het) hitH++; else hitL++; }
  }
  abs(hitL / M, 0.95, 4 * Math.sqrt(0.95 * 0.05 / M), "sabit varyansta kapsama % 95"); ok(hitH / M < 0.935, "değişen varyansta kapsama düşük: " + hitH / M);
  const C = K.coverage("lin", 30, 1, 0.95, 1, 1000); near(C.frac, 0.942, 1e-12, "varsayılan kapsama"); abs(C.sdB / C.meanSE, 1, 0.08, "SD ≈ SE");
  const CH = K.coverage("hetero", 30, 1, 0.95, 1, 1000); near(CH.frac, 0.909, 1e-12); ok(CH.sdB / CH.meanSE > 1.1, "huni: SD > SE");
  const CC = K.coverage("curve", 30, 1, 0.95, 1, 1000); near(CC.frac, 0.928, 1e-12); abs(CC.meanB, 1, 0.01, "eğri: en iyi doğrusal eğim 1");
  // en iyi doğrusal eğim kuramı: x ~ U(0, 10) için Cov(x, 0,1x²)/Var(x), sayısal integralle
  const Ex = simpson((t) => t / 10, 0, 10), Ex2 = simpson((t) => t * t / 10, 0, 10), Ex3 = simpson((t) => t ** 3 / 10, 0, 10);
  near(0.1 * (Ex3 - Ex * Ex2) / (Ex2 - Ex * Ex), K.RES_TRUE.curve, 1e-9, "eğri hedefi");
  const D = K.genRes("lin", 30, 1, 1), I = K.slopeInference(D.x, D.y, 0.95);
  abs(I.F.b, 0.3503097, 1e-6, "varsayılan b"); abs(I.F.seB, 0.0759912, 1e-6); abs(I.lo, 0.1946488, 1e-6); abs(I.hi, 0.5059706, 1e-6);
  // QQ: Blom yüzdelikleri, bağımsız
  const qq = K.qq(I.F.e, I.F.s), z = I.F.e.map((e) => e / I.F.s).sort((a, b) => a - b);
  near(qq.r, corrRef(z.map((_, i) => K.normQuantile((i + 0.625) / 30.25)), z), 1e-12, "QQ korelasyonu");
}

/* ── 3 · Aykırı değer ve kaldıraç ── */
{
  const r = lcg(31), g = normals(lcg(32));
  for (let t = 0; t < 25; t++) {
    const n = 5 + Math.floor(r() * 20), x = [], y = []; for (let i = 0; i < n; i++) { const xi = 20 * r(); x.push(xi); y.push(2 + 0.6 * xi + g() + (i === 0 ? 8 * g() : 0)); }
    const I = K.influence(x, y), F = I.F;
    // açık şapka matrisi
    const s0 = n, s1 = x.reduce((a, b) => a + b, 0), s2 = x.reduce((a, b) => a + b * b, 0), dt = s0 * s2 - s1 * s1;
    let tr = 0;
    for (let i = 0; i < n; i++) {
      const hii = (s2 - 2 * s1 * x[i] + s0 * x[i] * x[i]) / dt; near(I.h[i], hii, 1e-10, "kaldıraç"); tr += hii;
      // silip yeniden uydur
      const xd = x.filter((_, k) => k !== i), yd = y.filter((_, k) => k !== i), R = olsRef(xd, yd);
      const Dc = x.reduce((s, xk) => s + (F.a + F.b * xk - R.a - R.b * xk) ** 2, 0) / (2 * F.s * F.s);
      near(I.cook[i], Dc, 1e-8, "Cook tanımı");
      const sd = Math.sqrt(xd.reduce((s, xk, k) => s + (yd[k] - R.a - R.b * xk) ** 2, 0) / (n - 3));
      if (n > 3) near(I.tExt[i], F.e[i] / (sd * Math.sqrt(1 - hii)), 1e-8, "dış standart artık");
    }
    near(tr, 2, 1e-10, "iz(H) = p");
    // Theil–Sen: çift eğimleri ayrı sıralanır
    const sl = []; for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) if (x[i] !== x[j]) sl.push((y[i] - y[j]) / (x[i] - x[j]));
    sl.sort((a, b) => a - b); const m = sl.length, med = m % 2 ? sl[(m - 1) / 2] : (sl[m / 2 - 1] + sl[m / 2]) / 2;
    near(K.theilSen(x, y).b, med, 1e-12, "Theil–Sen ortancası");
  }
  // tam doğru + tek uzak nokta: Theil–Sen eğimi bozulmaz, EKK bozulur
  const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30], y = x.map((v, i) => (i < 10 ? 1 + 2 * v : 0));
  near(K.theilSen(x, y).b, 2, 1e-12, "Theil–Sen sağlam"); ok(K.fit(x, y).b < 0, "EKK işaret değiştirir");
  // varsayılan bulut ve üç hazır ayar
  const B = K.genInf(1), Fb = K.fit(B.x, B.y);
  abs(Fb.b, 0.5184461, 1e-6, "bulut eğimi"); abs(K.theilSen(B.x, B.y).b, 0.4905977, 1e-6);
  const at = (ex, ey) => { const X = B.x.concat([ex]), Y = B.y.concat([ey]), I = K.influence(X, Y); return { h: I.h[12], t: I.tExt[12], D: I.cook[12], b: I.F.b, ts: K.theilSen(X, Y).b }; };
  const on18 = Math.round((Fb.a + Fb.b * 18) * 10) / 10, mid = Math.round((Fb.a + Fb.b * 5) * 10) / 10 + 6;
  const P1 = at(18, on18), P2 = at(5, mid), P3 = at(18, 3);
  ok(P1.h > 4 / 13 && Math.abs(P1.t) < 3 && P1.D < 4 / 13, "yüksek kaldıraç, uyumlu"); ok(P2.h < 4 / 13 && Math.abs(P2.t) > 3 && P2.D < 1, "aykırı, düşük kaldıraç");
  ok(P3.h > 4 / 13 && Math.abs(P3.t) > 3 && P3.D > 1, "etkili"); abs(P3.D, 14.2606, 1e-3, "varsayılan Cook"); abs(P3.b, 0.0389587, 1e-6); abs(P3.ts, 0.4666094, 1e-6);
}

/* ── 4 · Korelasyon ve nedensellik ── */
{
  const r = lcg(41);
  for (let t = 0; t < 30; t++) {
    const n = 5 + Math.floor(r() * 60), x = [], y = []; for (let i = 0; i < n; i++) { x.push(r()); y.push(Math.exp(3 * x[i]) + r()); }
    near(K.pearson(x, y), corrRef(x, y), 1e-12, "Pearson");
    near(K.spearman(x, y), K.spearmanD2(x, y), 1e-12, "Spearman iki yol");
    // sıra korelasyonu: kaba kuvvetle sıra bul
    const rk = (v) => v.map((a) => 1 + v.filter((b) => b < a).length); near(K.spearman(x, y), corrRef(rk(x), rk(y)), 1e-12, "Spearman kaba sıra");
  }
  ok(JSON.stringify(K.ranks([3, 1, 3, 2])) === "[3.5,1,3.5,2]", "bağlı sıralar ortalama alır");
  // kısmi korelasyon: formül = artıklar = 3 değişkenli regresyon
  const C = K.genConfound(1000, 1, 1, 0, false, 1), pf = K.partialFormula(K.pearson(C.x, C.y), K.pearson(C.x, C.z), K.pearson(C.y, C.z));
  near(K.partialByResiduals(C.x, C.y, C.z), pf, 1e-10, "kısmi: iki yol");
  {
    const n = C.x.length, cols = [new Array(n).fill(1), C.x, C.z], M = [0, 1, 2].map((i) => [0, 1, 2].map((j) => cols[i].reduce((s, v, k) => s + v * cols[j][k], 0))), v = [0, 1, 2].map((i) => cols[i].reduce((s, w, k) => s + w * C.y[k], 0));
    near(K.adjustedSlope(C.x, C.y, C.z), det3(M.map((row, i) => [row[0], v[i], row[2]])) / det3(M), 1e-9, "Frisch–Waugh = çoklu regresyon");
  }
  abs(K.pearson(C.x, C.y), 0.4851551, 1e-6, "varsayılan r"); abs(K.partialByResiduals(C.x, C.y, C.z), -0.0222060, 1e-6);
  // kuram: bağımsız üreteçle büyük örnek
  const g = normals(lcg(42));
  for (const [al, be, ga, doX] of [[1, 1, 0, false], [2, 0.5, 0.4, false], [1, 1, 0, true], [1.5, 1.2, -0.6, true], [0, 1, 0.5, false]]) {
    const N = 200000, x = [], y = [], z = [];
    for (let i = 0; i < N; i++) { const zi = g(), xi = doX ? Math.sqrt(al * al + 1) * g() : al * zi + g(); z.push(zi); x.push(xi); y.push(be * zi + ga * xi + g()); }
    const T = K.confTheory(al, be, ga, doX);
    abs(corrRef(x, y), T.rxy, 0.008, "r_XY kuramı"); abs(corrRef(x, z), T.rxz, 0.008); abs(corrRef(y, z), T.ryz, 0.008);
    const ex = K.residualize(x, z), ey = K.residualize(y, z); abs(corrRef(ex, ey), T.partial, 0.008, "kısmi kuram");
    abs(olsRef(x, y).b, T.naive, 0.01, "denetimsiz eğim"); abs(olsRef(ex, ey).b, ga, 0.01, "denetlenmiş = γ");
  }
  // Simpson: büyük örnekle birleşik eğim kuramı
  for (const [w, d] of [[-0.5, 2], [0.3, 1], [-1, 0], [-0.8, 3]]) {
    const G = K.genSimpson(20000, w, d, 5), X = G.flatMap((q) => q.x), Y = G.flatMap((q) => q.y);
    abs(olsRef(X, Y).b, K.simpsonTheory(w, d).pooled, 0.01, "birleşik eğim"); abs(K.withinSlope(G), w, 0.01, "grup içi eğim");
    const vc = 2 * d * d / 3; near(K.simpsonTheory(w, d).pooled, (w * 0.64 + 1.2 * vc) / (0.64 + vc), 1e-12);
  }
  const G0 = K.genSimpson(50, -0.5, 2, 1); abs(K.fit(G0.flatMap((q) => q.x), G0.flatMap((q) => q.y)).b, 0.9084400, 1e-6, "varsayılan birleşik"); abs(K.withinSlope(G0), -0.5530739, 1e-6);
  // aralık kısıtlaması: kesik normalin varyansı sayısal integralle, r kuramı Monte Carlo ile
  const phi = (u) => Math.exp(-u * u / 2) / Math.sqrt(2 * Math.PI);
  for (const q of [0.05, 0.1, 0.3, 0.5, 0.9]) {
    const c = K.normQuantile(1 - q), m1 = simpson((u) => u * phi(u), c, 12) / q, m2 = simpson((u) => u * u * phi(u), c, 12) / q;
    near(K.rangeTheory(0.6, q).k, Math.sqrt(m2 - m1 * m1), 1e-7, "k (kesik normal)");
  }
  const N = 400000, xs = [], ys = []; for (let i = 0; i < N; i++) { const a = g(); xs.push(a); ys.push(0.6 * a + 0.8 * g()); }
  for (const q of [0.1, 0.3, 0.7]) { const R = K.restrictTop(xs, ys, q); abs(corrRef(R.x, R.y), K.rangeTheory(0.6, q).r, 3 / Math.sqrt(R.m), "kısıtlı r kuramı " + q); }
  near(K.rangeTheory(-0.6, 0.3).r, -K.rangeTheory(0.6, 0.3).r, 1e-12, "işaret simetrisi"); near(K.rangeTheory(0.6, 1).r, 0.6, 1e-12);
  const Rg = K.genRange(0.6, 2000, 1), Rr = K.restrictTop(Rg.x, Rg.y, 0.3); ok(Rr.m === 600, "600 nokta"); abs(K.pearson(Rr.x, Rr.y), 0.3999626, 1e-6); abs(K.rangeTheory(0.6, 0.3).r, 0.3599038, 1e-6);
  for (const [k, rp, rs] of [["lin", 0.7419270, 0.7270169], ["exp", 0.8456616, 0.9915572], ["outlier", 0.0433465, 0.7870544], ["u", -0.0620887, -0.0564728]]) { const P = K.genPearson(k, 40, 1); abs(K.pearson(P.x, P.y), rp, 1e-6, k); abs(K.spearman(P.x, P.y), rs, 1e-6, k); }
  assert.throws(() => K.genRange(1, 10, 1)); assert.throws(() => K.fit([1, 2], [1])); assert.throws(() => K.tQuantile(1, 3)); checks += 3;
}
console.log(`G regresyon-korelasyon: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

/* ── Tarayıcı ── */
if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  ok(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`, import.meta.url)), "defter dosyası var");
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
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      ok(unlabeled.length === 0, "etiketsiz denetim: " + unlabeled.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-9; })), "varsayılanlar adım ızgarasında");
      // 1
      await has("olB", "0,3456"); await has("olA", "3,7123"); await has("olR2", "0,3934"); await has("olR", "+0,6272"); await has("olSSE", "8,816"); await has("olSST", "14,533"); await has("olU", "16,332"); await has("olD", "7,517"); await has("olStatus", "aynı doğruyu buldu");
      const dTxt = await read("olDiff"); ok(/10⁻[⁶⁷⁸⁹]/.test(dTxt), "kaba kuvvet farkı küçük: " + dTxt);
      await page.click("#olP4"); await has("olStatus", "İki nokta"); await has("olR2", "1,0000");
      await page.click("#olP1"); await has("olR2", "1,0000"); await page.click("#olP2"); await page.click("#olP3"); ok((await read("olR")).startsWith("−"), "negatif r");
      await page.click("#olReset"); await has("olB", "0,3456");
      // klavye ile nokta taşıma: nokta 1 (3,18; 5,37) → yukarı 0,5
      await page.locator("#olCanvas").focus(); await page.keyboard.press("Shift+ArrowUp"); ok((await read("olCap")).includes("elle düzenlendi"), "klavye ile taşındı");
      ok((await read("olB")) !== "0,3456", "eğim değişti");
      await page.keyboard.press("PageDown"); ok((await page.locator("#olSel").inputValue()) === "1", "PageDown sonraki nokta");
      // fareyle sürükleme: seçili noktayı tuvalin ortasına taşı
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("olB", "0,3456");
      const pt = await page.evaluate(() => { const c = document.getElementById("olCanvas"), r = c.getBoundingClientRect(); return { left: r.left, top: r.top, w: r.width, h: r.height }; });
      ok(pt.w > 0, "tuval boyutu");
      await sel("olShow", "user"); await has("olCap", "senin doğrunun"); await range("olUA", 3.7); await range("olUB", 0.35); ok(parseFloat((await read("olD")).replace(",", ".")) < 0.05, "kendi doğrun en iyiye yakın");
      await page.locator("h1").click(); await page.keyboard.press("r"); ok((await page.locator("#olShow").inputValue()) === "ols", "R sıfırlar (1)");
      // dikey sütun: iki noktayı da sağ sınıra (x = 10) yasla
      await range("olN", 2); await page.locator("#olCanvas").focus();
      for (const i of [0, 1]) { await sel("olSel", String(i)); await page.locator("#olCanvas").focus(); for (let k = 0; k < 22; k++) await page.keyboard.press("Shift+ArrowRight"); }
      await has("olStatus", "Bütün x değerleri aynı"); await has("olB", "—"); await has("olBe", "tanımsız");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("olB", "0,3456");
      // sekme klavyesi
      await page.locator("#tab-ols").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-cor").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-res").getAttribute("aria-selected")) === "true", "ArrowRight");
      // 2
      await has("rsB", "0,3503 ± 0,0760"); await has("rsT", "2,0484"); await has("rsCI", "[0,1946; 0,5060]"); await has("rsCIe", "aralığın içinde"); await has("rsQuad", "t = 0,15"); await has("rsStatus", "desen görünmüyor");
      await page.click("#rsScan"); await has("rsCov", "94,2 %"); await has("rsStatus", "beklenenle uyumlu");
      await range("rsN", 31); await has("rsCov", "—");
      await sel("rsKind", "hetero"); await range("rsN", 30); await page.click("#rsScan"); await has("rsCov", "90,9 %"); await has("rsStatus", "küçük gösteriyor");
      await sel("rsKind", "curve"); await has("rsBe", "p < 10⁻⁶"); ok(!(await page.locator("main").textContent()).includes("= <"), "p = < yok"); await range("rsN", 100); await range("rsSigma", 0.5); await has("rsStatus", "eğrilik");
      await sel("rsKind", "anscombe"); ok(await page.locator("#rsAnsWrap").isVisible(), "Anscombe tablosu"); ok(await page.locator("#rsScan").isDisabled(), "Anscombe'da sınama yok");
      const rows = await page.locator("#rsAnsRows tr").allTextContents(); ok(rows.length === 4 && rows.every((t) => t.includes("0,816") && t.includes("11,00") && t.includes("y = 3,00")), "dört küme aynı özet: " + rows.join(" | "));
      await sel("rsSet", "3"); await has("rsStatus", "h = 1"); await sel("rsSet", "1"); await has("rsStatus", "eğri");
      await sel("rsLevel", "0.99"); await has("rsCIL", "99 %");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("rsB", "0,3503 ± 0,0760"); ok((await page.locator("#rsKind").inputValue()) === "lin", "R sıfırlar (2)");
      // 3
      await page.click("#tab-inf"); await has("ifH", "0,744"); await has("ifCook", "14,261"); await has("ifCookD", "14,261"); await has("ifClass", "Etkili"); await has("ifBo", "0,0390"); await has("ifBn", "0,5184"); await has("ifTs", "0,4666");
      await page.click("#ifP1"); await has("ifClass", "Yüksek kaldıraç, uyumlu"); await page.click("#ifP2"); await has("ifClass", "Aykırı, düşük kaldıraç");
      await page.locator("#ifCanvas").focus(); const y0 = await page.locator("#ifY").inputValue(); await page.keyboard.press("ArrowDown"); ok(Math.abs(+(await page.locator("#ifY").inputValue()) - (+y0 - 0.1)) < 1e-9, "ok tuşu ek noktayı taşır");
      const ib = await page.locator("#ifCanvas").boundingBox(); await page.mouse.click(ib.x + ib.width * 0.5, ib.y + ib.height * 0.5); ok(+(await page.locator("#ifX").inputValue()) > 5, "dokunma noktayı yerleştirir");
      await page.uncheck("#ifHas"); await has("ifH", "—"); await has("ifStatus", "Yalnız bulut"); ok(await page.locator("#ifX").isDisabled(), "ek nokta kapalıyken kaydırıcı kilitli");
      await page.check("#ifHas"); await range("ifX", 0); await range("ifY", 16); ok(!(await read("ifCook")).includes("NaN"), "sınır değer");
      await range("ifX", 20); await range("ifY", 0); await has("ifClass", "Etkili");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("ifCook", "14,261");
      // 4
      await page.click("#tab-cor"); await has("crS0", "+0,7419"); await has("crS1", "+0,7270");
      await sel("crPKind", "exp"); await has("crS1", "+0,9916"); await sel("crPKind", "outlier"); await has("crS0", "+0,0433"); await sel("crPKind", "u"); await has("crStatus", "bağımsızlık demek değildir");
      await sel("crExp", "confound"); await has("crS0", "+0,485"); await has("crE0", "kuram +0,500"); await has("crS3", "−0,022"); await has("crStatus", "ortak neden");
      ok(!(await page.locator("#crFormula").innerHTML()).includes("&lt;br"), "formül kutusunda ham etiket yok");
      await page.check("#crCDo"); await has("crStatus", "Müdahale"); await range("crCG", 0.5); await has("crE5", "γ = +0,50");
      await sel("crExp", "simpson"); await has("crS0", "+0,908"); await has("crS4", "−0,553"); await has("crS5", "ters döndü");
      await range("crSD", 0); await has("crS5", "aynı");
      await sel("crExp", "range"); await has("crS1", "+0,400"); await has("crE1", "kuram +0,360"); await range("crRQ", 100); await has("crStatus", "Bütün örnek");
      await range("crRRho", -0.95); await range("crRQ", 5); ok((await read("crS1")).startsWith("−"), "negatif ρ");
      await page.locator("h1").click(); await page.keyboard.press("r"); ok((await page.locator("#crExp").inputValue()) === "pearson", "R sıfırlar (4)"); await has("crS0", "+0,7419");
      for (const t of ["ols", "res", "inf", "cor"]) { await page.click("#tab-" + t); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${t}: yatay taşma yok`); }
      ok(await page.evaluate(() => Object.isFrozen(RegressionLab) && !Object.getOwnPropertyDescriptor(window, "RegressionLab").writable), "çekirdek salt okunur");
      ok(await page.locator(".digest").first().isVisible(), "Keşif Defteri görünür");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G regresyon-korelasyon: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
