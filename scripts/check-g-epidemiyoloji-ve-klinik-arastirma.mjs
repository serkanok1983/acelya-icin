// Epidemiyoloji ve klinik araştırma: çekirdeğin bağımsız denetimi (yayımlanmış değerler, başka cebirsel biçimler,
// sayfanınkinden farklı bir üreteçle Monte Carlo, Simpson integrali, kesin sayım) ve isteğe bağlı tarayıcı denetimi
// (390 px açık, 1280 px koyu). Kullanım: node scripts/check-g-epidemiyoloji-ve-klinik-arastirma.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "epidemiyoloji-ve-klinik-arastirma";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.EpiLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");

/* ── Bağımsız araçlar: sfc32 üreteci, Marsaglia kutupsal yöntemi, Simpson ── */
function xrng(seed) { let a = seed | 0, b = 0x9e3779b9 | 0, c = 0x243f6a88 | 0, d = 0xb7e15162 | 0; const f = () => { const t = (((a + b) | 0) + d) | 0; d = (d + 1) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); c = (c + t) | 0; return (t >>> 0) / 4294967296; }; for (let i = 0; i < 20; i++) f(); return f; }
function polar(r) { for (;;) { const u = 2 * r() - 1, v = 2 * r() - 1, q = u * u + v * v; if (q > 0 && q < 1) return u * Math.sqrt(-2 * Math.log(q) / q); } }
function simpson(f, a, b, n = 20000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; }
const phi = (x) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
const Phi = (z) => (z >= 0 ? 0.5 + simpson(phi, 0, z, 4000) : 0.5 - simpson(phi, 0, -z, 4000));

/* ── 1. Normal dağılım: NIST tablosu ── */
// NIST/SEMATECH e-Handbook 1.3.6.7.1: 0'dan z'ye alan
for (const [z, area] of [[1.0, 0.34134], [1.64, 0.44950], [1.96, 0.47500], [2.58, 0.49506], [3.0, 0.49865]]) abs(K.normCdf(z) - 0.5, area, 5e-6, `NIST Φ(${z})`);
abs(K.zTwo(0.9), 1.644854, 1e-6, "z %90"); abs(K.zTwo(0.95), 1.959964, 1e-6, "z %95"); abs(K.zTwo(0.99), 2.575829, 1e-6, "z %99");
for (const z of [-3, -1.2, 0.4, 2.2]) abs(K.normCdf(z), Phi(z), 1e-12, "Φ Simpson");

/* ── 2. 2×2 tablo: başka cebirsel biçimler ve elle hesaplanan değerler ── */
{
  const R = K.table2x2(15, 185, 30, 170);
  near(R.rr, 0.5, 1e-12, "RR"); near(R.seLogRR, 0.3, 1e-12, "SH(ln RR) = √0,09");
  near(R.rrCI[0], 0.5 * Math.exp(-1.959964 * 0.3), 1e-6, "RR alt"); near(R.rrCI[1], 0.5 * Math.exp(1.959964 * 0.3), 1e-6, "RR üst");
  near(R.or, (15 * 170) / (185 * 30), 1e-12, "OR"); near(R.nnt, 1 / 0.075, 1e-12, "NNT"); ok(R.nntUp === 14 && R.nntKind === "yarar", "NNT yukarı 14");
  ok(R.nntCI.kind === "yarar" && Math.abs(R.nntCI.lo - 1 / Math.abs(R.rdCI[0])) < 1e-12, "NNT aralığı RF aralığının tersi");
}
// Wikipedia "Relative risk": SH(ln RR) = √(I_N/(I_E(I_E+I_N)) + C_N/(C_E(C_E+C_N))) — sayfanınkinden farklı yazım
const r = xrng(11);
for (let k = 0; k < 300; k++) {
  const a = 1 + Math.floor(r() * 300), b = 1 + Math.floor(r() * 900), c = 1 + Math.floor(r() * 300), d = 1 + Math.floor(r() * 900), lev = [0.9, 0.95, 0.99][k % 3];
  const R = K.table2x2(a, b, c, d, lev), z = [1.644854, 1.959964, 2.575829][k % 3];
  near(R.seLogRR, Math.sqrt(b / (a * (a + b)) + d / (c * (c + d))), 1e-12, "SH ln RR (Wikipedia biçimi)");
  near(R.seLogOR, Math.sqrt(1 / a + 1 / b + 1 / c + 1 / d), 1e-12, "SH ln OR (Woolf)");
  near(R.orCI[0] * R.orCI[1], R.or * R.or, 1e-9, "OR aralığı log ölçekte simetrik");
  near(Math.log(R.rrCI[1] / R.rr), z * R.seLogRR, 1e-6, "RR aralık yarı genişliği");
  near(R.rd, a / (a + b) - c / (c + d), 1e-12, "RF");
  near(R.rdCI[1] - R.rdCI[0], 2 * z * Math.sqrt(a * b / (a + b) ** 3 + c * d / (c + d) ** 3), 1e-6, "RF Wald genişliği");
  // Wikipedia "Odds ratio": RR ≈ OR / (1 − R_C + R_C·OR) — iki oranın kesin bağıntısı
  const rc = c / (c + d); near(R.rr, R.or / (1 - rc + rc * R.or), 1e-9, "RR ↔ OR kesin dönüşüm");
  if (R.nnt !== null) ok(R.nntUp >= R.nnt - 1e-9 && R.nntUp - R.nnt < 1, "NNT yukarı yuvarlama");
  // vaka-kontrol: sağ sütunu (b, d) katlamak OR'yi değiştirmez
  near(K.table2x2(a, 3 * b, c, 3 * d, lev).or, R.or, 1e-12, "OR sütun ölçeğinden bağımsız");
}
{
  // Wikipedia "Number needed to treat": I_e = 0,2, I_u = 0,1 → −10 (zarar, NNH 10); 0,1/0,9 → 1,25; 40 % → 10 % → 3,33
  const H = K.table2x2(20, 80, 10, 90); ok(H.nntKind === "zarar" && Math.abs(H.nnt - 10) < 1e-12, "NNH 10");
  near(K.table2x2(10, 90, 90, 10).nnt, 1.25, 1e-12, "NNT 1,25"); near(K.table2x2(10, 90, 40, 60).nnt, 10 / 3, 1e-12, "NNT 3,33");
  const Z = K.table2x2(18, 182, 22, 178); ok(Z.nntCI.kind === "iki" && Z.nntCI.benefitFrom > 0 && Z.nntCI.harmFrom > 0, "RF aralığı 0'ı içerirse NNT aralığı ikiye bölünür");
  ok(K.table2x2(0, 10, 5, 5).rrCI === null && K.table2x2(0, 10, 5, 5).rr === 0, "a = 0: RR 0, aralık tanımsız");
  ok(K.table2x2(5, 5, 0, 10).rr === null, "c = 0: RR tanımsız");
  ok(!K.table2x2(0, 0, 3, 4).ok && !K.table2x2(1.5, 2, 3, 4).ok, "geçersiz tablo");
  // seyrek olayda OR ≈ RR (Wikipedia): %0,2 ve %0,1
  const S = K.table2x2(20, 9980, 10, 9990); ok(Math.abs(S.or / S.rr - 1) < 0.002, "seyrek olay: OR ≈ RR");
  const C = K.table2x2(60, 40, 30, 70); near(C.rr, 2, 1e-12, "sık olay RR"); near(C.or, 3.5, 1e-12, "sık olay OR");
  for (const [rr, r0] of [[0.5, 0.4], [2, 0.3], [0.8, 0.05]]) { const r1 = rr * r0; near(K.orFromRR(rr, r0), (r1 * (1 - r0)) / (r0 * (1 - r1)), 1e-12, "orFromRR"); }
  ok(K.orFromRR(3, 0.4) === null, "tedavi riski > 1: OR tanımsız");
}

/* ── 3. Yaygınlık: Euler ile sürekli ODE ve Monte Carlo ── */
for (const [I, D] of [[0.02, 5], [0.001, 2], [0.2, 40], [0.05, 0.5]]) {
  // dP/dt = I(1 − P) − P/D, Euler küçük adımla dengeye
  let P = 0; const dt = 1e-3 / (I + 1 / D); for (let i = 0; i < 40000; i++) P += dt * (I * (1 - P) - P / D);
  near(K.prevSteady(I, D), P, 1e-6, "denge = ODE'nin sabit noktası");
  const S = K.prevSim({ I, D, N: 10000, seed: 3 }), se = Math.sqrt(P * (1 - P) / 10000);
  ok(Math.abs(S.measured - S.windowTheory) < 4 * se, `benzetim yaygınlığı ${S.measured} ~ ${S.windowTheory}`);
  ok(Math.abs(S.windowTheory - P) < 0.004 * P + 1e-9, "pencere geçici etkiden arınmış");
}
ok(Math.abs(0.02 * 5 - K.prevSteady(0.02, 5)) / K.prevSteady(0.02, 5) < 0.11 && Math.abs(0.2 * 40 - K.prevSteady(0.2, 40)) > 0.5, "I × D yalnız küçük yaygınlıkta iyi");

/* ── 4. Karıştırıcı: kuram, sfc32 ile Monte Carlo, böbrek taşı verisi ── */
for (const P of [{ pC: 0.4, pE1: 0.7, pE0: 0.2, r0: 0.05, rrC: 4, rrE: 1 }, { pC: 0.4, pE1: 0.8, pE0: 0.15, r0: 0.05, rrC: 4, rrE: 0.5 }, { pC: 0.3, pE1: 0.4, pE0: 0.4, r0: 0.1, rrC: 3, rrE: 1.5 }]) {
  const T = K.confTheory(P);
  near(T.s0, P.rrE, 1e-12, "katman RR = gerçek etki"); near(T.s1, P.rrE, 1e-12, "katman RR = gerçek etki"); near(T.std, P.rrE, 1e-12, "standartlaştırılmış RR = gerçek etki");
  // bağımsız Monte Carlo: 400 000 kişi, sfc32
  const g = xrng(5); let eE = 0, nE = 0, eN = 0, nN = 0;
  for (let i = 0; i < 400000; i++) { const c = g() < P.pC, e = g() < (c ? P.pE1 : P.pE0), rk = P.r0 * (c ? P.rrC : 1) * (e ? P.rrE : 1), ev = g() < rk; if (e) { nE++; if (ev) eE++; } else { nN++; if (ev) eN++; } }
  const crude = (eE / nE) / (eN / nN), se = Math.sqrt(1 / eE - 1 / nE + 1 / eN - 1 / nN);
  ok(Math.abs(Math.log(crude / T.crude)) < 4 * se, `kaba RR kuramı ${T.crude} ~ MC ${crude}`);
  if (P.pE1 === P.pE0) near(T.crude, P.rrE, 1e-12, "dengeli maruziyette karıştırma yok");
}
for (const seed of [1, 2, 3, 4]) { const S = K.stratify(K.confSim({ pC: 0.4, pE1: 0.7, pE0: 0.2, r0: 0.05, rrC: 4, rrE: 1 }, 20000, seed)); ok(S.crude > 1.7 && S.crude < 2.25 && Math.abs(Math.log(S.std)) < 0.15, `tohum ${seed}: kaba ~1,94, standart ~1`); }
{
  // Wikipedia "Simpson's paradox" (Charig ve ark. 1986): A %93 / %73 / %78, B %87 / %69 / %83
  const k = K.kidney();
  [[k.A.small, 0.93], [k.A.large, 0.73], [k.A.all, 0.78], [k.B.small, 0.87], [k.B.large, 0.69], [k.B.all, 0.83]].forEach(([v, p]) => abs(v, p, 0.005, "böbrek taşı yüzdesi"));
  ok(k.A.nAll === 350 && k.B.nAll === 350 && k.A.small > k.B.small && k.A.large > k.B.large && k.A.all < k.B.all, "paradoks");
}

/* ── 5. Meta-analiz: elle ağırlıklı ortalama ── */
{
  const M = K.metaFixed(K.STUDIES);
  let sw = 0, swy = 0; const ys = [], ws = [];
  for (const s of K.STUDIES) { const y = Math.log(s.a * s.n0 / (s.n1 * s.c)), v = (s.n1 - s.a) / (s.a * s.n1) + (s.n0 - s.c) / (s.c * s.n0); ys.push(y); ws.push(1 / v); sw += 1 / v; swy += y / v; }
  near(M.ybar, swy / sw, 1e-12, "birleşik ln RR"); near(M.se, 1 / Math.sqrt(sw), 1e-12, "birleşik SH");
  const Q = ys.reduce((t, y, i) => t + ws[i] * (y - swy / sw) ** 2, 0); near(M.Q, Q, 1e-12, "Q");
  ok(M.I2 === Math.max(0, (Q - 7) / Q), "I²");
  ok(M.st.filter((s) => s.lo <= 1 && s.hi >= 1).length >= 5, "denemelerin çoğu tek başına anlamsız (sayfanın iddiası)");
  ok(M.hi < 1, "birleşik aralık 1'i dışlar");
  const P = K.metaFixed(K.STUDIES.filter((s) => !s.small)); ok(P.rr < M.rr && K.STUDIES.filter((s) => s.small).every((s) => s.a / s.n1 > s.c / s.n0), "yayın yanlılığı birleşik etkiyi büyütür");
  ok(M.st[3].w === Math.max(...M.st.map((s) => s.w)), "en büyük ağırlık D4");
}

/* ── 6. Randomizasyon: kesin sayım ve Monte Carlo ── */
for (const n of [10, 37, 100, 400]) {
  // E[1/k + 1/(n−k)] — BigInt binom katsayılarıyla bağımsız
  let num = 0, mass = 0; let C = 1n; const den = 2n ** BigInt(n);
  for (let k = 0; k <= n; k++) { if (k >= 1 && k <= n - 1) { const pk = Number((C * 10n ** 18n) / den) / 1e18; num += pk * (1 / k + 1 / (n - k)); mass += pk; } C = (C * BigInt(n - k)) / BigInt(k + 1); }
  near(K.randTheory({ n, p: 0.3, method: "rand", rr: 1 }).sd, Math.sqrt(0.21 * num / mass), 1e-9, `kesin SS n=${n}`);
}
for (const method of ["rand", "doctor", "vol"]) {
  const c = { n: 100, K: 1000, p: 0.3, method, rr: 1, seed: 1 }, S = K.randSim(c), T = K.randTheory(c);
  ok(Math.abs(S.meanDiff - T.diff) < 4 * S.sdDiff / Math.sqrt(S.K) + 0.003, `${method}: U farkı ortalaması`);
  ok(Math.abs(S.meanRd - T.biasedRd) < 4 * S.sdRd / Math.sqrt(S.K) + 0.002, `${method}: tahmin ortalaması`);
  if (T.sd) ok(Math.abs(S.sdDiff / T.sd - 1) < 0.07, "rastgele: SS kurama uyar");
}
{
  // seçimle atamada fark: Bayes ile elle (p = 0,3, 0,7 / 0,4)
  const T = K.randTheory({ n: 100, p: 0.3, method: "doctor", rr: 1 }); near(T.uT, 0.21 / 0.49, 1e-12, "P(U | T)"); near(T.uC, 0.09 / 0.51, 1e-12, "P(U | C)");
  near(T.biasedRd, 0.1 * 2 * (0.21 / 0.49 - 0.09 / 0.51), 1e-12, "seçimden gelen sahte etki");
  near(K.randTheory({ n: 100, p: 0.3, method: "rand", rr: 0.8 }).trueRd, 0.16 * -0.2, 1e-12, "gerçek RF");
  // bağımsız MC: sfc32 ile 'hekim seçer'
  const g = xrng(9); let nT = 0, nC = 0, uT = 0, uC = 0; for (let i = 0; i < 300000; i++) { const U = g() < 0.3, Tt = g() < (U ? 0.7 : 0.4); if (Tt) { nT++; if (U) uT++; } else { nC++; if (U) uC++; } }
  abs(uT / nT - uC / nC, T.diff, 0.006, "hekim seçer: MC fark");
}
/* ── 7. ITT ve PP: elle beklenen değerler ve bağımsız MC ── */
{
  const T = K.ittTheory({ rr: 1, d1: 0.5, d0: 0.1, dc: 0.05 });
  near(T.itt, 0, 1e-12, "ITT, etkisiz tedavi"); near(T.pp, (0.15 * 0.3 + 0.63 * 0.1) / 0.78 - 0.16, 1e-12, "PP elle");
  const T2 = K.ittTheory({ rr: 0.7, d1: 0.2, d0: 0.2, dc: 0 }); near(T2.pp, T2.trueRd, 1e-12, "eşit bırakmada PP yansız"); near(T2.itt, 0.8 * T2.trueRd, 1e-12, "ITT seyreltme = uyum payı");
  const g = xrng(21); let eT = 0, n = 0, eTs = 0, nTs = 0, eC = 0;
  for (let i = 0; i < 400000; i++) { const U = g() < 0.3, b = U ? 0.3 : 0.1, drop = g() < (U ? 0.5 : 0.1), ev = g() < b; n++; if (ev) eT++; if (!drop) { nTs++; if (ev) eTs++; } if (g() < (g() < 0.3 ? 0.3 : 0.1)) eC++; }
  abs(eTs / nTs - eC / n, T.pp, 0.004, "PP MC"); abs(eT / n - eC / n, T.itt, 0.004, "ITT MC");
  const S = K.ittSim({ n: 500, K: 500, rr: 1, d1: 0.5, d0: 0.1, dc: 0.05, seed: 102 });
  ok(Math.abs(S.itt - T.itt) < 4 * S.ittSd / Math.sqrt(500) && Math.abs(S.pp - T.pp) < 4 * S.ppSd / Math.sqrt(500), "sayfa benzetimi kurama uyar");
}

/* ── 8. Örneklem büyüklüğü, güç, Gelman–Carlin ── */
{
  // Select Statistics: %15 → %25, %95 güven, %80 güç → grup başına 248
  ok(K.nPerGroup(0.15, 0.25, 0.05, 0.8).n === 248, "Select Statistics 248");
  ok(K.nPerGroup(0.2, 0.15, 0.05, 0.8).n === 903, "varsayılan 903");
  ok(K.nPerGroup(0.3, 0.3, 0.05, 0.8) === null, "eşit risk: n tanımsız");
  // formülün tanımı: n'de ana kuyruk gücü tam hedef
  for (const [p0, p1, al, pw] of [[0.2, 0.15, 0.05, 0.8], [0.4, 0.3, 0.01, 0.9], [0.1, 0.05, 0.1, 0.95]]) {
    const P = K.nPerGroup(p0, p1, al, pw), se = Math.sqrt((p0 * (1 - p0) + p1 * (1 - p1)) / P.raw);
    abs(Phi(Math.abs(p0 - p1) / se - K.zTwo(1 - al)), pw, 1e-6, "ham n'de güç = hedef (Simpson Φ)");
    ok(K.powerTheory(p0, p1, P.n, al) >= pw && K.powerTheory(p0, p1, P.n - 2, al) < pw + 1e-3, "yuvarlanmış n hedefi karşılar");
  }
  // bağımsız Monte Carlo güç (sfc32), n = 903
  const g = xrng(4); let rej = 0; const KK = 2000;
  for (let k = 0; k < KK; k++) { let x0 = 0, x1 = 0; for (let i = 0; i < 903; i++) { if (g() < 0.2) x0++; if (g() < 0.15) x1++; } const h0 = x0 / 903, h1 = x1 / 903, se = Math.sqrt((h0 * (1 - h0) + h1 * (1 - h1)) / 903); if (Math.abs(h0 - h1) > 1.959964 * se) rej++; }
  ok(Math.abs(rej / KK - 0.8) < 3 * Math.sqrt(0.16 / KK), `MC güç ${rej / KK}`);
  const S = K.trialSim({ p0: 0.2, p1: 0.15, n: 903, alpha: 0.05, K: 1000, seed: 1 }); ok(Math.abs(S.power - 0.8) < 3 * Math.sqrt(0.16 / 1000), "sayfa benzetimi gücü");
  // Gelman ve Carlin (2014): D = 2,8, s = 1 → güç 0,80, Type S 1,2 × 10⁻⁶, abartma 1,12
  const G = K.retro(2.8, 1, 0.05); abs(G.power, 0.80, 0.005, "GC güç"); abs(G.typeS / 1e-6, 1.2, 0.05, "GC Type S"); abs(G.exaggeration, 1.12, 0.01, "GC abartma");
  // Simpson ile E[|d| ; |d| > z s]
  for (const [D, s] of [[0.05, 0.0536], [1, 1], [0.3, 1]]) {
    const z = 1.959964, f = (x) => Math.abs(x) * phi((x - D) / s) / s, pw = 1 - Phi((z * s - D) / s) + Phi((-z * s - D) / s);
    const e = simpson(f, z * s, D + 12 * s, 40000) + simpson(f, D - 12 * s, -z * s, 40000);
    near(K.retro(D, s, 0.05).exaggeration, e / (pw * D), 1e-6, "abartma Simpson");
  }
  const F = K.trialSim({ p0: 0.2, p1: 0.15, n: 100, alpha: 0.05, K: 2000, seed: 8 }), Th = K.retro(0.05, Math.sqrt(0.2875 / 100), 0.05);
  ok(F.exaggeration > 2.3 && Math.abs(F.exaggeration / Th.exaggeration - 1) < 0.1 && Math.abs(F.power - Th.power) < 0.03, "anlamlılık süzgeci: benzetim ~ kuram");
  ok(K.trialSim({ p0: 0.2, p1: 0.15, n: 2000, alpha: 0.05, K: 500, seed: 2 }).exaggeration < 1.1, "yüksek güçte abartma küçük");
  // çoklu alt grup: 1 − (1 − α)^m
  for (const m of [1, 5, 20]) ok(Math.abs(K.forkRate(m, 0.05, 4000, 54) - (1 - 0.95 ** m)) < 3 * Math.sqrt(0.25 / 4000), `FWER m=${m}`);
  const ps = K.forkPs(5000, 7); ok(Math.abs(ps.filter((p) => p < 0.05).length / 5000 - 0.05) < 0.01 && ps.every((p) => p > 0 && p <= 1), "H0 altında p düzgün");
}

/* ── 9. Ayrıştırıcı ── */
for (const [s, v, pc] of [["0,25", 0.25, false], ["0.25", 0.25, false], ["%25", 25, true], ["25 %", 25, true], ["25%", 25, true], ["1/4", 0.25, false], ["3/4", 0.75, false], ["RR = 0,5", 0.5, false], ["OR=1,25", 1.25, false], ["−3", -3, false], ["-2,5 puan", -2.5, false], ["+4", 4, false], ["1 234", 1234, false], ["1.234,5", 1234.5, false], ["  7,5  ", 7.5, false], ["n = 903", 903, false], ["≈ 0,46", 0.46, false], ["yüzde 12", 12, true], [",5", 0.5, false]]) {
  const p = K.parseNum(s); ok(Math.abs(p.v - v) < 1e-12 && p.isPct === pc, `ayrıştır "${s}"`);
}
for (const s of ["", "abc", "1/0", "2 3", "1,2,3", "--4"]) { let threw = false; try { K.parseNum(s); } catch (e) { threw = e instanceof K.ParseError; } ok(threw, `reddet "${s}"`); }
for (const [s, k] of [["vaka-kontrol", "vk"], ["Vaka kontrol çalışması", "vk"], ["olgu-kontrol", "vk"], ["Kohort", "kohort"], ["KOHORT", "kohort"], ["RKÇ", "rkc"], ["rkc", "rkc"], ["Randomize kontrollü çalışma", "rkc"], ["RCT", "rkc"], ["kesitsel", "kesitsel"], ["Meta analiz", "meta"], ["sistematik derleme", "meta"], ["vaka raporu", "vaka"], ["olgu sunumu", "vaka"], ["Seçim yanlılığı", "secim"], ["SEÇİM", "secim"], ["hatırlama yanlılığı", "bilgi"], ["Bilgi yanlılığı", "bilgi"], ["karıştırıcı", "karistirici"], ["Karıştırıcı değişken", "karistirici"], ["sağlıklı kullanıcı etkisi", "saglikli"], ["Ters nedensellik", "ters"], ["xyz", null]]) ok(K.parseChoice(s) === k, `seçim "${s}"`);

/* ── 10. Alıştırma üreteci: soru metnindeki sayılardan bağımsız yeniden hesap ── */
const tds = (h) => [...h.matchAll(/<td>([\d ]+)<\/td>/g)].map((m) => Number(m[1].replace(/ /g, "")));
let solved = 0;
for (const L of [1, 2, 3]) for (const [t] of K.TYPES[L]) for (let no = 1; no <= 60; no++) {
  const Q = K.genQ(L, t, no);
  ok(JSON.stringify(Q) === JSON.stringify(K.genQ(L, t, no)), "tohumlu: aynı soru");
  ok(Q.steps.length >= 2 && Q.hint.length > 10, "ipucu ve adımlar");
  let exp = null;
  const v = tds(Q.html);
  if (["risk", "rd", "rr", "nnt", "or"].includes(t)) {
    const [a, b, , c, d] = v; ok(v[2] === a + b && v[5] === c + d, "tablo toplamları");
    const r1 = a / (a + b), r0 = c / (c + d);
    exp = { risk: 100 * r1, rd: 100 * (r0 - r1), rr: r1 / r0, nnt: Math.ceil(1 / (r0 - r1) - 1e-9), or: (a * d) / (b * c) }[t];
    if (t === "nnt") ok(r0 > r1, "NNT sorusunda yarar var");
  } else if (t === "conf") {
    const [a1, b1, , c1, d1, , a2, b2, , c2, d2] = v; exp = ((a1 + a2) / (a1 + b1 + a2 + b2)) / ((c1 + c2) / (c1 + d1 + c2 + d2));
    near((a1 / (a1 + b1)) / (c1 / (c1 + d1)), (a2 / (a2 + b2)) / (c2 / (c2 + d2)), 1e-9, "katman RR'leri eşit");
  } else if (t === "itt") { const [nS, eS, nD, eD, nC, eC] = v; exp = 100 * ((eS + eD) / (nS + nD) - eC / nC); ok(nS + nD === nC, "kollar eşit"); }
  else if (t === "prev") { const m = /1000 kişi-yılda (\d+) yeni vakadır ve durum ortalama ([\d,]+) yıl/.exec(Q.html); exp = Number(m[1]) / 1000 * Number(m[2].replace(",", ".")) * 100; }
  else if (t === "rrr") { const m = /"%(\d+) azalttığını".*?riski %(\d+)\./.exec(Q.html); exp = Number(m[1]) / 100 * Number(m[2]); }
  else if (t === "n") { const m = /kontrol kolunda beklenen risk %(\d+), tedavi kolunda %(\d+)\..*?\(z = ([\d,]+)\)/.exec(Q.html); const p0 = m[1] / 100, p1 = m[2] / 100, zb = Number(m[3].replace(",", ".")); exp = Math.ceil((1.96 + zb) ** 2 * (p0 * (1 - p0) + p1 * (1 - p1)) / (p0 - p1) ** 2 - 1e-9); }
  if (exp !== null) {
    const ansStr = (x) => (Number.isInteger(x) ? String(x) : x.toFixed(t === "rr" || t === "or" || t === "conf" ? 3 : 2).replace(".", ","));
    ok(K.grade(Q, ansStr(exp)).ok, `${L}/${t}/${no}: doğru cevap kabul (${exp})`);
    ok(!K.grade(Q, ansStr(exp + Math.max(1, Math.abs(exp) * 0.3))).ok, `${L}/${t}/${no}: yanlış cevap reddedilir`);
    solved++;
  } else {
    const k = Q.ans.keys[0]; ok(K.grade(Q, Q.ans.set[k]).ok, "doğru ad kabul");
    const wrong = Object.keys(Q.ans.set).find((x) => !Q.ans.keys.includes(x)); ok(!K.grade(Q, Q.ans.set[wrong]).ok, "yanlış ad reddedilir");
    solved++;
  }
}
{
  // yüzde soruları: oran olarak yazılan cevap notla kabul; işaret ve ters oran uyarısı
  const Q = K.genQ(1, "risk", 1); const v = Q.ans.value; ok(K.grade(Q, (v / 100).toFixed(4)).ok && /oran olarak/.test(K.grade(Q, (v / 100).toFixed(4)).msg), "oran olarak yazılan yüzde");
  const R = K.genQ(1, "rr", 2); ok(/ters çevirmişsin/.test(K.grade(R, String(1 / R.ans.value)).msg), "ters oran uyarısı");
  const N = K.genQ(1, "nnt", 3); ok(K.grade(N, String(N.ans.exact)).ok && /yukarı yuvarlanır/.test(K.grade(N, String(N.ans.exact)).msg), "NNT kesir: yuvarlama notu");
  let found = false; for (let no = 1; no < 80 && !found; no++) { const I = K.genQ(3, "itt", no); if (Math.abs(I.ans.value) > 0.5) { found = true; ok(/işaret/.test(K.grade(I, String(-I.ans.value)).msg), "ITT işaret uyarısı"); } } ok(found, "ITT sorusu sıfırdan farklı");
}
console.log(`G epidemiyoloji: ${checks.toLocaleString("tr-TR")} bağımsız kontrol PASS (${solved} alıştırma sorusu bağımsız yeniden çözüldü)`);

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
      const digestMissing = !fs.existsSync(new URL(`../shared/digest/${SLUG}.js`, import.meta.url));
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error" && !(digestMissing && /404/.test(m.text()))) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400 && !(digestMissing && r.url().includes(`/shared/digest/${SLUG}.js`))) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, t) => { await page.waitForFunction(([i, s]) => document.getElementById(i).textContent.includes(s), [id, t], { timeout: 8000 }).catch(() => {}); const v = await read(id); assert(v.includes(t), `${id}: "${v}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const fill = async (id, v) => { await page.locator("#" + id).fill(String(v)); };
      const reset = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); };
      const noOverflow = async (lab) => ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${lab} yatay taşma yok`);
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id || e.outerHTML));
      assert.deepEqual(unlabeled, []); checks++;
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuval etiketleri");
      ok(await page.evaluate(() => !/[̂̄̅̇⃗]/.test(document.querySelector(".app-content").textContent)), "birleşik işaret yok");
      ok(await page.evaluate(() => /112/.test(document.getElementById("careNote").textContent) && /yapay veri/.test(document.getElementById("careNote").textContent)), "sağlık notu");
      ok((await page.title()).length <= 80, "başlık ≤ 80");
      const inked = (id) => page.locator("#" + id).evaluate((c) => { const g = c.getContext("2d"), d = g.getImageData(0, 0, c.width, c.height).data; const r0 = d[0], g0 = d[1], b0 = d[2]; let n = 0; for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - r0) + Math.abs(d[i + 1] - g0) + Math.abs(d[i + 2] - b0) > 40) n++; return n / (d.length / 4); });
      // 1 · ölçüler
      await has("t1R1", "%7,5"); await has("t1R0", "%15,0"); await has("t1RD", "−7,5 puan"); await has("t1RDD", "−13,6 – −1,4"); await has("t1RR", "0,500"); await has("t1RRD", "0,278 – 0,900"); await has("t1OR", "0,459"); await has("t1ORD", "0,239 – 0,883"); await has("t1NNT", "14"); await has("t1NNTD", "7,3 – 74,0");
      await has("t1Pss", "%9,09"); await has("t1Pap", "%10,00"); await has("t1Pme", "%8,93"); await has("t1PrevStatus", "yaklaşımı (%10,00) iyi");
      for (const id of ["t1Icons", "t1Curve", "t1Prev"]) ok((await inked(id)) > 0.01, `${id} çizili`);
      await page.click("#t1PreCommon"); await has("t1RR", "2,000"); await has("t1OR", "3,500"); await has("t1Status", "abartır");
      await page.click("#t1PreRare"); await has("t1OR", "2,002"); await has("t1R1D", "20 / 10\u202f000"); await has("t1RDD", "−0,01 – 0,21 puan"); await has("t1NNTD", "NNH ≥ 482,5");
      await page.click("#t1PreHarm"); await has("t1NNTLab", "NNH"); await has("t1NNT", "20");
      await page.click("#t1PreNull"); await has("t1NNTD", "sonsuzdan geçer"); await has("t1Status", "1'i içeriyor");
      await page.click("#t1PreTrial"); await sel("t1Mode", "vk"); await has("t1RR", "tanımsız"); await has("t1OR", "0,459"); await has("t1ColA", "Vaka");
      await page.click("#t1Double"); await has("t1OR", "0,459"); await has("t1M0", "710"); await sel("t1Mode", "kohort"); await has("t1R1", "%3,9");
      await sel("t1Level", "0.99"); await has("t1RRD", "%99 GA");
      await fill("t1C", "0"); await has("t1RR", "tanımsız"); await has("t1Status", "Kontrol grubunda hiç olay yok");
      await fill("t1A", "x"); await has("t1Status", "tam sayı"); await fill("t1A", "0"); await fill("t1B", "0"); await has("t1Status", "Her satırda");
      await range("t1Dur", 40); await range("t1I", 200); await has("t1PrevStatus", "%10'u aştı"); await has("t1Pss", "%88,89");
      await reset(); await has("t1RR", "0,500"); await has("t1Pss", "%9,09"); ok((await page.locator("#t1Mode").inputValue()) === "kohort", "R sıfırlar");
      await noOverflow("ölçüler");
      // sekme klavyesi
      await page.locator("#tab-olcu").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-guc").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-tasarim").getAttribute("aria-selected")) === "true", "ArrowRight");
      ok(await page.locator("#panel-olcu").isHidden(), "tek panel görünür");
      // 2 · tasarımlar
      await has("t2Pool", "0,787"); await has("t2PoolD", "0,654 – 0,947"); await has("t2K", "8 deneme"); await has("t2I2", "I² = %0");
      ok((await inked("t2Forest")) > 0.01, "orman grafiği çizili");
      await page.locator("#t2Opts button").nth(1).click(); await page.locator("#t2Opts button").nth(1).click(); await page.locator("#t2Opts button").nth(1).click(); await page.locator("#t2Opts button").nth(0).click();
      await has("t2ResName", "Vaka-kontrol"); await has("t2Trail", "Sonuca göre");
      await page.click("#t2Restart"); await page.locator("#t2Opts button").nth(1).click(); await page.locator("#t2Opts button").nth(0).click(); await page.locator("#t2Opts button").nth(0).click(); await has("t2ResName", "Randomize kontrollü");
      await page.locator("#t2Pub").check(); await has("t2Pool", "0,766"); await has("t2Status", "yayımlanmadığını"); await has("t2K", "6 deneme");
      await reset(); await has("t2Pool", "0,787"); ok(!(await page.locator("#t2Pub").isChecked()), "R kutuyu kaldırır"); await has("t2Q", "Birden çok");
      await noOverflow("tasarımlar");
      // 3 · karıştırıcı
      await page.click("#tab-yanli");
      await has("t3Crude", "2,058"); await has("t3CrudeD", "kuram 1,937"); await has("t3S0", "0,970"); await has("t3S1", "1,056"); await has("t3Std", "1,032"); await has("t3Status", "tümüyle C'den");
      ok((await inked("t3Bars")) > 0.01, "çubuklar çizili");
      await page.click("#t3PreMask"); await has("t3CrudeD", "kuram 1,188"); await has("t3Status", "gizliyor ya da ters");
      await range("t3RRE", 2); await page.click("#t3PreNone"); await has("t3Status", "karıştırma yok"); await has("t3True", "0,50"); await has("t3Crude", "0,490"); ok((await page.locator("#t3RRE").inputValue()) === "0.5", "Karıştırıcı yok gerçek RR'yi 0,5'e kurar");
      await page.click("#t3New"); ok((await page.locator("#t3Seed").inputValue()) === "2", "yeni tohum");
      await range("t3R0", 0.3); await range("t3RRC", 8); await has("t3Status", "kırpıldı");
      await sel("t3N", "2000"); await has("t3Status", "Küçük nüfusta");
      await has("t3KidStatus", "%82,6"); await sel("t3KidView", "strata"); await has("t3KidStatus", "Her iki katmanda A önde"); await has("t3KidTable", "81/87");
      await page.locator("#t3Hill details").first().locator("summary").click(); await has("t3Hill", "50 katı");
      await reset(); await has("t3Crude", "2,058"); ok((await page.locator("#t3KidView").inputValue()) === "all", "R görünümü sıfırlar");
      await noOverflow("karıştırıcı");
      // 4 · randomizasyon
      await page.click("#tab-rand");
      await has("t4Diff", "−0,23 puan"); await has("t4Sd", "9,28 puan"); await has("t4SdD", "kuram 9,21"); await has("t4Big", "%28,7"); await has("t4Rd", "−0,57 puan"); await has("t4RdTrue", "0,00 puan");
      await has("t4Itt", "−0,07 puan"); await has("t4Pp", "−2,19 puan"); await has("t4PpD", "kuram −2,15"); await has("t4Drop", "%22,0"); await has("t4ItStatus", "sahte bir yarar");
      for (const id of ["t4Hist", "t4Est", "t4ItBars"]) ok((await inked(id)) > 0.005, `${id} çizili`);
      await sel("t4Method", "doctor"); await has("t4DiffD", "kuram 25,21 puan"); await has("t4RdD", "beklenen 5,04 puan"); await has("t4Status", "sistematiktir");
      await sel("t4Method", "vol"); await has("t4DiffD", "kuram −25,21"); await has("t4Status", "eksik");
      await range("t4N", 10); await has("t4NOut", "10"); await range("t4RR", 0.5); await has("t4RdTrue", "−8,00 puan");
      await page.click("#t4ItEq"); await has("t4ItStatus", "PP de yansız"); await page.click("#t4ItReal"); await has("t4ItStatus", "PP de yansız"); await range("t4D1", 0.5); await range("t4D0", 0.1); await has("t4ItStatus", "abartıyor");
      await range("t4D1", 0.8); await range("t4D0", 0.8); await has("t4D1Out", "%80");
      await reset(); await has("t4Diff", "−0,23 puan"); await has("t4Pp", "−2,19 puan"); ok((await page.locator("#t4Method").inputValue()) === "rand", "R yöntemi sıfırlar");
      await noOverflow("randomizasyon");
      // 5 · güç
      await page.click("#tab-guc");
      await has("t5N", "903"); await has("t5ND", "902,62"); await has("t5PowTh", "%80,02"); await has("t5PowSim", "%81,3");
      await has("t5FPow", "%14,3"); await has("t5FPowD", "%15,4"); await has("t5Exag", "2,64 kat"); await has("t5ExagD", "2,66 kat"); await has("t5Any", "%64,2"); await has("t5AnySim", "%64,9");
      for (const id of ["t5Curve", "t5Filter", "t5Fork"]) ok((await inked(id)) > 0.005, `${id} çizili`);
      await range("t5P1", 0.25); await range("t5P0", 0.15); await has("t5N", "248");
      await range("t5P1", 0.15); await has("t5N", "tanımsız"); await has("t5Status", "İki risk eşitken"); await has("t5Exag", "tanımsız");
      await range("t5P0", 0.2); await sel("t5Pow", "0.9"); await has("t5PowThD", "hedef %90");
      await range("t5P0", 0.06); await range("t5P1", 0.05); await has("t5PowSim", "benzetilmedi");
      await reset(); await has("t5N", "903");
      await page.click("#t5FPlanned"); await has("t5FnOut", "903"); await has("t5FStatus", "Güç yüksek"); await page.click("#t5FSmall"); await has("t5FnOut", "50");
      for (let i = 0; i < 3; i++) await page.click("#t5Try"); await has("t5Found", "3 / 20");
      await page.click("#t5TryAll"); await has("t5Found", "20 / 20"); await range("t5M", 1); await has("t5Any", "%5,0");
      await page.click("#t5ForkNew"); ok((await page.locator("#t5Seed").inputValue()) === "2", "yeni çalışma tohumu");
      await reset(); await has("t5Any", "%64,2"); await has("t5Found", "0 / 20");
      await noOverflow("güç");
      // tarih
      await page.locator(".hGuess[data-i='3'][data-j='3']").click(); await has("hFb3", "Doğru"); ok(await page.locator("#hTxt3").isVisible(), "açıklama açılır");
      await page.locator(".hGuess[data-i='0'][data-j='0']").click(); await has("hFb0", "Karşılaştırmalı deney");
      // alıştırma
      await has("pQ", "Tedavi kolundaki risk"); const v = await page.evaluate(() => EpiLab.genQ(1, "risk", 1).ans.value);
      await fill("pAns", String(v).replace(".", ",")); await page.click("#pCheck"); await has("pFb", "Doğru"); await has("pScore", "1 soru doğru");
      await fill("pAns", "abc"); await page.click("#pCheck"); await has("pFb", "okunamadı");
      await page.click("#pHint"); await has("pHintBox", "İpucu"); await page.click("#pStep"); await page.click("#pStep"); ok((await page.locator("#pSteps li").count()) === 2, "iki adım");
      await sel("pLevel", "2"); await sel("pType", "design"); ok(await page.locator("#pChips").isVisible(), "seçim düğmeleri");
      const key = await page.evaluate(() => { const q = EpiLab.genQ(2, "design", 1); return q.ans.set[q.ans.keys[0]]; });
      await page.locator("#pChips button", { hasText: key }).first().click(); await has("pFb", "Doğru");
      await sel("pLevel", "3"); await sel("pType", "n"); await page.click("#pNew"); await has("pMeta", "soru 2"); await has("pQ", "grup başına kaç kişi");
      // hatalar
      await has("m1Wrong", "0,375"); await has("m1Wrong", "%62,5"); await range("mR0", 0.02); await has("m1Why", "OR = 0,495"); await has("m2Why", "NNT = 100");
      await noOverflow("tüm sayfa");
      ok(await page.evaluate(() => Object.isFrozen(EpiLab) && !Object.getOwnPropertyDescriptor(window, "EpiLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G epidemiyoloji: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
