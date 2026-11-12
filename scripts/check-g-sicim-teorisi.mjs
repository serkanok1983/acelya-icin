// G · sicim-teorisi.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) node'da yüklenir ve sayfanın kendi formüllerini KULLANMAYAN
// başvurularla karşılaştırılır: telin Fourier serisi çözümü, ızgara inceltme (yakınsama mertebesi),
// enerji kapalı biçimleri; bölüntü fonksiyonu için σ-yinelemesi, kaba kuvvet işgal sayısı sayımı ve
// yayımlanmış katsayılar; sarılı sicim için bağımsız kutu taraması; CODATA 2022 tablo değerleri.
// `--browser`: 390 px açık ve 1280 px koyu temada gerçek arayüz denetimi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';

const html = fs.readFileSync(new URL('../sicim-teorisi.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.SicimLab;
assert(Object.isFrozen(K), 'çekirdek dondurulmuş olmalı');

let checks = 0;
const near = (actual, expected, tol, label = '') => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(1e-300, Math.abs(expected)), `${label} ${actual} ≠ ${expected} (bağıl tol ${tol})`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };
const eq = (a, b, label) => { assert.equal(a, b, label); checks++; };

/* ── 1 · Klasik tel ── */
const base = { L: 0.65, T: 70, mu: 0.001, M: 80, C: 0.5, A: 0.005, shape: 'harmonic', n: 1, p: 0.25 };
const run = (cfg, periods = 5) => {
  const s = K.createString(cfg), f1 = Math.sqrt(cfg.T / cfg.mu) / (2 * cfg.L);
  const e0 = s.energy();
  let drift = 0, inv = 0;
  const steps = Math.round(periods / f1 / s.theory.dt);
  for (let i = 0; i < steps; i++) {
    if (!s.step()) break;
    const e = s.energy();
    drift = Math.max(drift, Math.abs(e.E - e0.E) / e0.E);
    inv = Math.max(inv, Math.abs(e.invariant - e0.invariant) / e0.invariant);
  }
  return { s, f1, e0, drift, inv };
};
// Bağımsız başvuru: iki ucu sabit telin Fourier serisi çözümü (durgun başlangıç)
const fourierPluck = (x, t, L, v, A, xp, terms = 4000) => {
  let y = 0;
  for (let m = 1; m <= terms; m++) {
    const bm = (2 * A * L * L) / (m * m * Math.PI * Math.PI * xp * (L - xp)) * Math.sin((m * Math.PI * xp) / L);
    y += bm * Math.sin((m * Math.PI * x) / L) * Math.cos((m * Math.PI * v * t) / L);
  }
  return y;
};
// Varsayılan durum: frekans kapalı biçimden en çok (kΔx)²/24 kadar düşük
{
  const r = run(base);
  const f = Math.sqrt(70 / 0.001) / (2 * 0.65);
  near(f, 203.51933162, 1e-9, 'kapalı biçim f1');
  near(r.s.fMeasured, f, 1e-4, 'ölçülen f1');
  ok(r.s.fMeasured < f, 'C < 1: ızgara dalgayı yavaşlatır');
  near(r.e0.E, (Math.PI ** 2 * 70 * 0.005 ** 2) / (4 * 0.65), 2e-4, 'harmonik enerji');
  ok(r.inv < 1e-10, 'ayrık değişmez korunur');
  ok(r.drift < 5e-4, 'E sapması O(Δt²)');
  eq(r.s.blown, false);
}
// Bütün harmonikler, ızgaralar ve Courant sayıları: f_n = n·v/(2L); hata sınırı ve işareti
for (const M of [40, 80, 160]) for (const C of [0.5, 0.9, 1]) for (let n = 1; n <= 8; n++) {
  const cfg = { ...base, M, C, n }, r = run(cfg, 4);
  const f = (n * Math.sqrt(cfg.T / cfg.mu)) / (2 * cfg.L), kdx = (n * Math.PI) / M;
  const bound = C === 1 ? 5e-5 : ((1 - C * C) * kdx * kdx) / 24;
  ok(r.s.fMeasured !== null && r.s.crossings >= 2, `ölçüm tamamlanır M=${M} C=${C} n=${n}`);
  if (C === 1) near(r.s.fMeasured, f, bound, `C=1 tam M=${M} n=${n}`);
  else { ok(r.s.fMeasured <= f * (1 + 1e-6), 'dağılım hatası eksi yönde'); near(r.s.fMeasured, f * (1 - bound), bound * 0.12 + 2e-5, `dağılım M=${M} C=${C} n=${n}`); }
  ok(r.inv < 1e-9, 'değişmez');
}
// İkinci mertebe yakınsama: M iki katına çıkınca frekans hatası yaklaşık dörtte bire iner
{
  const err = (M) => { const r = run({ ...base, M, n: 4 }, 6); return Math.abs(r.s.fMeasured - 4 * r.f1) / (4 * r.f1); };
  const e40 = err(40), e80 = err(80), e160 = err(160);
  near(e40 / e80, 4, 0.05, 'yakınsama 40→80'); near(e80 / e160, 4, 0.05, 'yakınsama 80→160');
}
// Parametre taraması: f yalnız L, T, μ'ye bağlı; genlikten bağımsız (doğrusal denklem)
for (const L of [0.3, 0.65, 1.2]) for (const T of [20, 70, 200]) for (const mu of [0.0005, 0.001, 0.01]) {
  const r = run({ ...base, L, T, mu, C: 1 }, 3);
  near(r.s.fMeasured, Math.sqrt(T / mu) / (2 * L), 5e-5, `f(L=${L},T=${T},μ=${mu})`);
  near(r.s.theory.v, Math.sqrt(T / mu), 1e-12);
}
{
  const a = run({ ...base, A: 0.001 }), b = run({ ...base, A: 0.01 });
  near(a.s.fMeasured, b.s.fMeasured, 1e-12, 'genlikten bağımsız');
  near(b.e0.E / a.e0.E, 100, 1e-9, 'E ∝ A²');
}
// Çekilen tel: C = 1 iken ızgara çözümü Fourier serisiyle (d'Alembert) örtüşür
for (const p of [0.1, 0.25, 0.5, 0.75, 0.9]) {
  const cfg = { ...base, shape: 'pluck', p, C: 1 }, s = K.createString(cfg), v = Math.sqrt(cfg.T / cfg.mu);
  near(s.energy().E, (cfg.T * cfg.A ** 2 * cfg.L) / (2 * p * cfg.L * (1 - p) * cfg.L), 1e-9, `çekme enerjisi p=${p}`);
  for (let k = 0; k < 137; k++) s.step();
  let worst = 0;
  for (let i = 0; i <= cfg.M; i += 4) worst = Math.max(worst, Math.abs(s.y[i] - fourierPluck((i / cfg.M) * cfg.L, s.t, cfg.L, v, cfg.A, p * cfg.L)));
  ok(worst < 2e-3 * cfg.A, `Fourier çözümü p=${p}: ${worst}`);
  const r = run(cfg, 5);
  near(r.s.fMeasured, v / (2 * cfg.L), 1e-9, `çekme periyodu p=${p}`);
  for (const C of [0.5, 0.9]) for (const M of [40, 80, 160]) {
    const q = run({ ...cfg, C, M }, 5);
    ok(q.s.fMeasured !== null, 'çekme ölçümü tamamlanır');
    near(q.s.fMeasured, v / (2 * cfg.L), 4e-3, `çekme f p=${p} C=${C} M=${M}`);
    ok(q.inv < 1e-9, 'çekme değişmezi');
  }
}
// h/2 ikizi: aynı fiziksel anda ince ızgara kaba ızgaraya yakın, fark ızgarayla küçülür
{
  const at = (M) => { const s = K.createString({ ...base, M, n: 2 }); const steps = Math.round(0.004 / s.theory.dt); for (let i = 0; i < steps; i++) s.step(); return { y: s.y[M / 4], t: s.t }; };
  const exact = (t) => 0.005 * Math.cos(2 * Math.PI * 2 * Math.sqrt(70 / 0.001) / 1.3 * t);
  const e80 = Math.abs(at(80).y - exact(at(80).t)), e160 = Math.abs(at(160).y - exact(at(160).t));
  ok(e160 < e80 / 3 && e80 < 1e-5, `h/2 ikizi ${e80} → ${e160}`);
}
// CFL: C > 1 patlar, büyüme çarpanı (C + √(C² − 1))²; C ≤ 1 patlamaz
for (const shape of ['harmonic', 'pluck']) {
  const r = run({ ...base, shape, C: 1.02 }, 5);
  eq(r.s.blown, true, 'C = 1,02 kararsız');
  ok(r.s.steps < 400, 'hızlı patlama');
  near(r.s.theory.growth, (1.02 + Math.sqrt(1.02 ** 2 - 1)) ** 2, 1e-12);
  eq(r.s.theory.fGrid, null);
  eq(r.s.step(), false, 'patladıktan sonra adım atılmaz');
}
{ // ölçülen büyüme: en kısa dalganın enerjisi adım başına g²
  const s = K.createString({ ...base, C: 1.02 }); let prev = s.energy().E, ratio = 0;
  while (s.step()) { const e = s.energy().E; ratio = e / prev; prev = e; }
  near(ratio, s.theory.growth ** 2, 0.05, 'ölçülen enerji büyümesi');
}

// Doğrulayıcı eki: geçiş anı kübik ara değerle bulunur; okuma ikinci geçişten başlayarak ızgara frekansına oturur
// (doğrusal ara değerle n = 8, 40 aralıkta 1607,95–1608,06 Hz arasında oynuyordu).
for (const [n, M, C, tol] of [[8, 40, 0.5, 2e-6], [8, 80, 0.5, 5e-7], [3, 80, 0.5, 5e-7], [8, 40, 0.9, 3e-5], [1, 80, 0.5, 1e-7]]) {
  const s = K.createString({ ...base, n, M, C });
  let seen = 1, worst = 0;
  while (s.crossings < 60 && s.step()) if (s.crossings > seen) { seen = s.crossings; worst = Math.max(worst, Math.abs(s.fMeasured - s.theory.fGrid) / s.theory.fGrid); }
  ok(seen === 60 && worst < tol, `kararlı okuma n=${n} M=${M} C=${C}: en büyük sapma ${worst}`);
}

/* ── 2 · Durum sayımı ── */
// Yayımlanmış katsayılar: ∏(1 − qⁿ)^−24 = 1 + 24q + 324q² + 3200q³ + 25650q⁴ + … (OEIS A006922)
const published = [1n, 24n, 324n, 3200n, 25650n, 176256n, 1073720n, 5930496n, 30178575n, 143184000n, 639249300n];
const gen24 = K.generatingCoefficients(400, 24);
published.forEach((v, n) => { eq(gen24[n], v, `katsayı ${n}`); eq(K.countByEnumeration(n, 24).count, v, `sayım ${n}`); });
// Bağımsız yineleme: n·d(n) = d·Σ σ(k)·d(n − k)
const sigma = (k) => { let s = 0; for (let j = 1; j <= k; j++) if (k % j === 0) s += j; return s; };
const recur = (Nmax, d) => { const c = [1n]; for (let n = 1; n <= Nmax; n++) { let s = 0n; for (let k = 1; k <= n; k++) s += BigInt(sigma(k)) * c[n - k]; c.push((BigInt(d) * s) / BigInt(n)); } return c; };
for (const d of [1, 2, 24]) {
  const ref = recur(400, d), gen = K.generatingCoefficients(400, d);
  for (let n = 0; n <= 400; n++) eq(gen[n], ref[n], `σ-yinelemesi d=${d} n=${n}`);
  for (let n = 0; n <= 30; n++) eq(K.countByEnumeration(n, d).count, ref[n], `sayım = yineleme d=${d} n=${n}`);
}
// Kaba kuvvet: işgal sayıları üzerinden doğrudan sayım (her (kip, yön) osilatörü 0, 1, 2… kez uyarılır)
const brute = (N, d) => { const osc = []; for (let m = 1; m <= N; m++) for (let i = 0; i < d; i++) osc.push(m); const rec = (j, rem) => { if (rem === 0) return 1; if (j === osc.length) return 0; let t = 0; for (let k = 0; k * osc[j] <= rem; k++) t += rec(j + 1, rem - k * osc[j]); return t; }; return rec(0, N); };
for (const d of [1, 2, 3]) for (let N = 0; N <= 7; N++) eq(K.countByEnumeration(N, d).count, BigInt(brute(N, d)), `kaba kuvvet d=${d} N=${N}`);
eq(K.countByEnumeration(4, 24).count, BigInt(brute(4, 24)), 'kaba kuvvet d=24 N=4');
// Bölüntü sayıları (bilinen değerler) ve bölüntülerin kendisi
[[0, 1], [1, 1], [5, 7], [10, 42], [20, 627], [30, 5604]].forEach(([n, p]) => eq(K.countByEnumeration(n, 24).partitions, p, `p(${n})`));
eq(K.generatingCoefficients(100, 1)[100], 190569292n, 'p(100)');
for (let N = 1; N <= 12; N++) for (const part of K.partitions(N)) { eq(Array.from(part).reduce((a, b) => a + b, 0), N); ok(Array.from(part).every((v, i, a) => i === 0 || a[i - 1] >= v), 'azalan sıra'); }
eq(K.binom(25, 2), 300n); eq(K.binom(26, 3), 2600n); eq(K.binom(24, 0), 1n);
eq(K.partitionStates([1, 1], 24), 300n); eq(K.partitionStates([2, 1], 24), 576n); eq(K.partitionStates([], 24), 1n);
// Fizik: takyon, kütlesiz vektör, SO(25) simetrik izsiz tensör, Regge doğrusu
eq(K.openMass(0, 24), -1); eq(K.openMass(1, 24), 0); eq(gen24[1], 24n);
eq(gen24[2], BigInt((25 * 26) / 2 - 1), 'N = 2: SO(25) simetrik izsiz');
for (let N = 0; N <= 30; N++) eq(K.countByEnumeration(N, 24).maxSpin, K.openMass(N, 24) + 1, `J = α′M² + 1, N=${N}`);
near(K.openMass(1, 2), 11 / 12, 1e-12);
// Hagedorn: eğim 4π'ye alttan ve tekdüze yaklaşır; asimptotik formül oranı 1'e gider
{
  const big = K.generatingCoefficients(3001, 24);
  let prev = 0;
  for (const N of [30, 100, 400, 1000, 3000]) { const s = K.slopeMeasured(big, N); ok(s > prev && s < 4 * Math.PI, `eğim tekdüze N=${N}`); prev = s; near(s, 4 * Math.PI - 27 / (2 * Math.sqrt(N)), 0.04, `eğim ≈ 4π − 27/(2√N), N=${N}`); near(K.slopeAsymptotic(N, 24), 4 * Math.PI - 27 / (2 * Math.sqrt(N)), 2e-3); }
  near(K.slopeMeasured(big, 3000), 4 * Math.PI, 0.02, 'eğim → 4π');
  near(K.slopeLimit(24), 4 * Math.PI, 1e-12); near(K.slopeLimit(1), Math.PI * Math.sqrt(2 / 3), 1e-12);
  const ratio = (N) => Math.exp(K.lnBig(big[N]) - (-0.5 * Math.log(2) - 6.75 * Math.log(N) + 4 * Math.PI * Math.sqrt(N)));
  ok(ratio(100) < ratio(1000) && ratio(1000) < ratio(3000) && ratio(3000) < 1 && ratio(3000) > 0.78, 'oran 1\'e alttan yaklaşır');
  near(ratio(100), 0.29, 0.01, 'N = 100 oranı');
  // d = 1: Hardy–Ramanujan p(N) ≈ e^{π√(2N/3)} / (4N√3)
  const p = K.generatingCoefficients(1000, 1);
  near(Number(p[1000]) / (Math.exp(Math.PI * Math.sqrt(2000 / 3)) / (4000 * Math.sqrt(3))), 1, 0.02, 'Hardy–Ramanujan');
  near(Math.exp(K.lnAsymptotic(1000, 1)), Math.exp(Math.PI * Math.sqrt(2000 / 3)) / (4000 * Math.sqrt(3)), 1e-9);
  near(K.lnBig(12345678901234567890123n), Math.log(1.2345678901234567e22), 1e-12);
}

/* ── 3 · Sarılı kapalı sicim ── */
// Bağımsız kutu taraması: bütün (n, w, N, Ñ) dörtlüleri, koşul N − Ñ = n·w
const boxSpectrum = (r, cutoff) => {
  const out = [];
  for (let n = -30; n <= 30; n++) for (let w = -30; w <= 30; w++) for (let N = 0; N <= 9; N++) for (let Nt = 0; Nt <= 9; Nt++) {
    if (N - Nt !== n * w) continue;
    const m2 = (n / r) ** 2 + (w * r) ** 2 + 2 * (N + Nt - 2);
    if (m2 <= cutoff + 1e-9) out.push({ m2, mult: gen24[N] * gen24[Nt] });
  }
  return out.sort((a, b) => a.m2 - b.m2);
};
for (const u of [-2, -1.35, -1, -0.5, -0.05, 0, 0.3, 0.5, 1, 1.7, 2]) for (const cutoff of [4, 8, 12]) {
  const r = 2 ** u, mine = K.closedSpectrum(r, cutoff), ref = boxSpectrum(r, cutoff);
  eq(mine.length, ref.length, `sektör sayısı u=${u} Λ=${cutoff}`);
  ok(mine.every((s, i) => Math.abs(s.m2 - ref[i].m2) < 1e-9), 'sıralı kütleler');
  eq(mine.reduce((t, s) => t + s.mult, 0n), ref.reduce((t, s) => t + s.mult, 0n), 'toplam çokluk');
  ok(mine.every((s) => s.N - s.Nt === s.n * s.w && s.N >= 0 && s.Nt >= 0), 'düzey eşleme');
  // T-ikiliği: R → α′/R
  const cmp = K.compareSpectra(r, 1 / r, cutoff);
  eq(cmp.mismatches, 0, `ikilik u=${u}`); ok(cmp.pairDiff < 1e-9 && cmp.maxLevelDiff < 1e-9, 'n ↔ w');
  eq(cmp.total1, cmp.total2); eq(cmp.massless1, cmp.massless2); eq(cmp.levels1.length, cmp.levels2.length);
  const lv = K.levels(mine);
  ok(lv.every((l, i) => i === 0 || l.m2 > lv[i - 1].m2 + 1e-9), 'düzeyler ayrık ve artan');
  eq(lv[0].m2, -4, 'takyon'); eq(lv[0].mult, 1n);
  eq(cmp.massless1, u === 0 ? 676n : Math.abs(u) === 1 ? 580n : Math.abs(u) === 2 ? 578n : 576n, `kütlesiz u=${u}`);
}
eq(K.compareSpectra(1, 1, 8).massless1, 26n * 26n, 'öz-ikili: 26²');
{ // ikili olmayan yarıçaplar ayırt edilir
  for (const [a, b] of [[Math.SQRT2, 1.5], [2, 2.1], [0.5, 0.7], [Math.SQRT2, Math.SQRT2 * 2 ** 0.6]]) { const c = K.compareSpectra(a, b, 8); ok(c.mismatches > 0 && c.pairDiff > 1e-3, `ikili değil ${a}, ${b}`); }
  const same = K.compareSpectra(2, 2, 8); eq(same.mismatches, 0); ok(same.pairDiff > 1, 'aynı yarıçapta n ↔ w tutmaz');
  const d = K.compareSpectra(Math.SQRT2, Math.SQRT1_2, 8);
  eq(d.levels1.length, 10); eq(d.total1, 11322029n);
  near(K.closedMass(1, 0, 0, 0, Math.SQRT2), -3.5, 1e-12); near(K.closedMass(0, 1, 0, 0, Math.SQRT2), -2, 1e-12); eq(K.closedMass(1, 1, 1, 0, 1), 0); eq(K.closedMass(2, 0, 0, 0, 1), 0);
}

/* ── 4 · Planck ölçeği ── */
{
  // CODATA 2022 tablo değerleri (NIST allascii.txt, 11 Kasım 2026'da açıldı)
  const P = K.planck();
  near(P.length, 1.616255e-35, 1e-6); near(P.time, 5.391247e-44, 1e-6); near(P.mass, 2.176434e-8, 1e-6);
  near(P.energyGeV, 1.22089e19, 1e-6); near(P.temperature, 1.416784e32, 1e-6); near(P.hbar, 1.054571817e-34, 1e-9);
  eq(K.CONST.c, 299792458); eq(K.CONST.h, 6.62607015e-34); eq(K.CONST.G, 6.6743e-11); eq(K.CONST.kB, 1.380649e-23); eq(K.CONST.e, 1.602176634e-19);
  near(K.CONST.lightYear, 299792458 * 365.25 * 86400, 1e-12);
  near(P.length ** 2 * K.CONST.c ** 3 / (P.hbar * K.CONST.G), 1, 1e-12); near(P.mass * P.length * K.CONST.c / P.hbar, 1, 1e-12);
  ok(Object.isFrozen(K.CONST) && Object.isFrozen(K.CODATA_PLANCK) && Object.isFrozen(K.LHC));
  eq(K.LHC.collisionTeV, 13.6); eq(K.LHC.circumferenceM, 26659);
  // Hızlandırıcı kuralı: ρ[m] = p[GeV/c] / (0,299792458·B[T]); ħc = 197,3269804 MeV·fm
  for (const E of [1, 13600, 1e5, 1.22e19]) for (const B of [1, 8, 20]) {
    const c = K.collider(E, B);
    near(c.rho, E / 2 / (0.299792458 * B), 1e-9, 'bükme yarıçapı'); near(c.circumference, 2 * Math.PI * c.rho, 1e-12);
    near(c.lambda, 197.3269804e-18 / E, 1e-8, 'ħc/E'); near(c.ratio, E / 1.22089e19, 1e-6); near(c.gap, Math.log10(1.22089e19 / E), 1e-6 + 1e-6 / Math.max(1e-3, Math.abs(Math.log10(1.22089e19 / E))));
    near(c.lambdaRatio * c.ratio, 1, 1e-9, 'λ/ℓ_P = E_P/E');
  }
  const lhc = K.collider(13600, 8);
  near(lhc.gap, 14.953, 1e-4); near(lhc.circumference, 17814.7, 1e-5);
}
console.log(`G sicim-teorisi: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü (Fourier çözümü, yakınsama, σ-yinelemesi, kaba kuvvet, kutu taraması, CODATA) PASS`);

if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright');
  const { createServer } = await import('node:http');
  const { join, extname } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url));
  const server = createServer((req, res) => {
    const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream');
    res.end(fs.readFileSync(file));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  let browser;
  const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [['light', 390], ['dark', 1280]]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width < 500 ? 2 : 1, locale: 'tr-TR' });
      await ctx.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(8000);
      const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/sicim-teorisi.html`);
      const text = (id) => page.locator('#' + id).textContent();
      const has = async (id, part) => { const t = await text(id); assert(t.includes(part), `[${width}] #${id}: "${t}" içinde "${part}" yok`); checks++; };
      const lacks = async (id, part) => { const t = await text(id); assert(!t.includes(part), `[${width}] #${id}: "${t}" içinde "${part}" olmamalı`); checks++; };
      const waitHas = async (id, part, ms = 8000) => { await page.waitForFunction(([i, p]) => document.getElementById(i).textContent.includes(p), [id, part], { timeout: ms }); checks++; };
      const set = (id, v) => page.locator('#' + id).evaluate((e, val) => { e.value = val; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v));
      const click = (id) => page.locator('#' + id).click();
      const clean = async (label) => {
        const bad = await page.evaluate(() => [...document.querySelectorAll('[role=tabpanel]:not([hidden]) td, [role=tabpanel]:not([hidden]) strong, [role=tabpanel]:not([hidden]) output, [role=tabpanel]:not([hidden]) .si-status')].map((e) => e.textContent).filter((t) => /NaN|undefined|Infinity|null/.test(t)));
        assert.deepEqual(bad, [], `[${width}] ${label}`); checks++;
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `[${width}] yatay taşma: ${label}`); checks++;
      };
      const painted = async (id) => { // tuval boş değil
        assertCanvasDrawn(await canvasInk(page, '#' + id), { minInk: 200, minDistinct: 2, label: `[${width}] ${id}` }); checks++;
      };
      // Erişilebilirlik: her denetimin etiketi, her tuvalin rolü ve adı, sekme yapısı
      const a11y = await page.evaluate(() => ({
        unlabeled: [...document.querySelectorAll('.app-content input, .app-content select')].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id),
        canvases: [...document.querySelectorAll('.app-content canvas')].filter((c) => c.getAttribute('role') !== 'img' || !c.getAttribute('aria-label')).length,
        tabs: document.querySelectorAll('[role=tab]').length, panels: document.querySelectorAll('[role=tabpanel]').length,
        frozen: Object.isFrozen(window.SicimLab) && !Object.getOwnPropertyDescriptor(window, 'SicimLab').writable,
        emoji: /\p{Extended_Pictographic}/u.test(document.querySelector('.app-content').textContent.replace(/[↔]/g, '')),
        combining: /[̀-ͯ]/.test(document.querySelector('.app-content').textContent),
        hints: document.querySelectorAll('.app-content p.hint').length
      }));
      assert.deepEqual(a11y, { unlabeled: [], canvases: 0, tabs: 4, panels: 4, frozen: true, emoji: false, combining: false, hints: 1 }); checks++;
      assert((await page.locator('p.hint').textContent()).includes('doğrulanmamış'), 'ipucu kuramın durumunu söylemeli'); checks++;

      // ── 1 · Titreşen sicim ──
      await set('telSlow', 1);
      await has('telV', '264,6 m/s'); await has('telFt', '203,52 Hz'); await has('telFg', '203,51 Hz'); await has('telE0', '6,643 mJ'); await has('telSlowOut', '4,91 ms');
      await waitHas('telFm', '203,51 Hz'); await has('telDiff', '−0,005 %'); await has('telStatus', '1. harmonik'); await painted('telStage'); await painted('telChart');
      await click('telH3'); await has('telNOut', '3'); await has('telFt', '610,56 Hz'); await has('telFm', 'Ölçülüyor'); await waitHas('telFm', '610,29 Hz'); await has('telDiff', '−0,043 %');
      await set('telN', 8); await set('telM', 40); await has('telFt', '1628,15 Hz'); await waitHas('telFm', 'Hz'); await has('telFm', '1607,95 Hz'); await has('telDiff', '−1,241 %'); await has('telFg', '1607,95 Hz');
      await set('telM', 80); await waitHas('telFm', 'Hz'); await has('telFm', '1623,13 Hz'); await has('telDiff', '−0,309 %'); await set('telM', 160); await waitHas('telFm', 'Hz'); await has('telFm', '1626,90 Hz'); await has('telDiff', '−0,077 %'); await set('telM', 40);
      await set('telC', 1); await waitHas('telFm', '1628,15 Hz'); await has('telStatus', 'C = 1');
      await click('telPluckMid'); eq(await page.locator('#telNField').isHidden(), true); eq(await page.locator('#telPField').isVisible(), true); await has('telPOut', '0,50'); await has('telFt', '203,52 Hz'); await waitHas('telFm', '203,52 Hz');
      await click('telPluckEdge'); await has('telPOut', '0,10'); await waitHas('telFm', 'Hz'); await has('telE0', '14,96 mJ');
      await set('telC', 1.02); await waitHas('telStatus', 'Kararsız'); await has('telFm', 'Ölçülemez'); await has('telFg', 'Tanımsız'); await has('telStatus', '1,49'); await clean('kararsız');
      await click('telReset'); await has('telFt', '203,52 Hz'); await has('telFm', 'Ölçülüyor'); eq(await page.locator('#telC').inputValue(), '0.5'); eq(await page.locator('#telSlow').inputValue(), '3');
      // sınır değerler
      for (const [l, t, mu, a, f] of [[0.3, 200, 0.5, 10, '1054,09'], [1.2, 20, 10, 1, '18,63']]) { await set('telL', l); await set('telT', t); await set('telMu', mu); await set('telA', a); await has('telFt', f + ' Hz'); await clean('tel sınır'); }
      await set('telSlow', 1); await waitHas('telFm', '18,63 Hz');
      // klavye: Boşluk duraklatır, R yeniden başlatır
      await page.locator('h1').click(); await page.keyboard.press('Space'); await has('telToggle', 'Devam et'); await page.keyboard.press('Space'); await has('telToggle', 'Duraklat');
      await page.keyboard.press('r'); await has('telFm', 'Ölçülüyor');
      await click('telToggle'); await has('telToggle', 'Devam et'); await click('telReset'); await has('telToggle', 'Duraklat');

      // ── sekme klavyesi ──
      await page.locator('#tab-tel').focus(); await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-kip').getAttribute('aria-selected'), 'true'); eq(await page.locator('#panel-tel').isHidden(), true);
      await page.keyboard.press('End'); eq(await page.locator('#tab-olcek').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-tel').getAttribute('aria-selected'), 'true');
      await page.keyboard.press('ArrowLeft'); eq(await page.locator('#tab-olcek').getAttribute('aria-selected'), 'true'); await page.keyboard.press('Home'); eq(await page.locator('#tab-tel').getAttribute('aria-selected'), 'true');
      eq(await page.locator('#tab-tel').getAttribute('tabindex'), '0'); eq(await page.locator('#tab-kip').getAttribute('tabindex'), '-1');

      // ── 2 · Kip sayımı ──
      await click('tab-kip');
      await has('kipM2', '1'); await has('kipEnum', '324'); await has('kipGen', '324'); await has('kipDiff', '0'); await has('kipJ', '2 / 2'); await has('kipParts', '2'); await has('kipStatus', '324');
      await has('kipSlope', '11,335'); await has('kipSlopeAsym', '11,216'); await has('kipSlopeLim', '12,566'); await has('kipRatio', '0,290'); await has('kipLevelRows', '639 249 300'); await has('kipPartRows', '300');
      await painted('kipRegge'); await painted('kipHag'); await clean('kip varsayılan');
      await click('kipTachyon'); await has('kipM2', '−1'); await has('kipEnum', '1'); await has('kipStatus', 'takyon'); await has('kipJ', '0 / 0');
      await click('kipVector'); await has('kipM2', '0'); await has('kipEnum', '24'); await has('kipStatus', 'Kütlesiz');
      await click('kipFour'); await has('kipEnum', '25 650'); await has('kipGen', '25 650'); await has('kipParts', '5');
      await set('kipN', 30); await has('kipEnum', '6 668 597 583 531 616 856'); await has('kipDiff', '0'); await has('kipParts', '5604'); await has('kipJ', '30 / 30'); await clean('N = 30');
      await set('kipH', 400); await has('kipSlope', '11,922'); await set('kipH', 10); await clean('H = 10');
      await set('kipD', 1); await set('kipN', 5); await has('kipEnum', '7'); await has('kipStatus', 'tutarlı bir sicim kuramı değildir'); await clean('d = 1');
      await set('kipD', 2); await has('kipM2', '4,917'); await has('kipStatus', 'Lorentz'); await clean('d = 2');
      await click('kipVector'); eq(await page.locator('#kipD').inputValue(), '24'); await has('kipEnum', '24'); eq(await page.locator('#kipPresetNote').isVisible(), true); await has('kipPresetNote', "24'e geri alır");
      await click('kipReset'); await has('kipEnum', '324'); await has('kipNOut', '2'); await has('kipHOut', '100'); eq(await page.locator('#kipD').inputValue(), '24');

      // ── 3 · Sarılı boyut ──
      await click('tab-sarim');
      await has('sarimUOut', '1,414'); await has('sarimU2Out', '0,707'); await has('sarimProduct', '1,000'); await has('sarimMismatch', '0 / 10'); await has('sarimCount1', '11 322 029'); await has('sarimCount2', '11 322 029');
      await has('sarimMassless', '576 / 576'); await has('sarimPairDiff', '0'); await has('sarimStatus', 'özdeş'); await has('sarimRows', '−3,500'); await painted('sarimChart'); await painted('sarimLadder'); await clean('sarım varsayılan');
      await click('sarimSame'); await lacks('sarimMismatch', '0 /'); await has('sarimStatus', 'ikili değil'); await lacks('sarimProduct', '1,000');
      await click('sarimDual'); await has('sarimMismatch', '0 / 10'); await has('sarimProduct', '1,000');
      await click('sarimSelf'); await has('sarimMassless', '676 / 676'); await has('sarimStatus', 'SU(2)'); await has('sarimMismatch', '0 / 7');
      await click('sarimTwo'); await has('sarimMassless', '580 / 580'); await has('sarimUOut', '2,000'); await has('sarimU2Out', '0,500'); await has('sarimMismatch', '0 / 13');
      for (const cut of [4, 12]) for (const u of [-2, 2, -0.05]) { await set('sarimCut', cut); await set('sarimU', u); await click('sarimDual'); await has('sarimMismatch', '0 /'); await has('sarimProduct', '1,000'); await clean(`sarım u=${u} Λ=${cut}`); }
      await set('sarimU', 2); await set('sarimU2', 2); await has('sarimStatus', 'kendisiyle'); await clean('aynı yarıçap');
      await click('sarimSame'); await clean('R′ sınırda');
      await click('sarimReset'); await has('sarimMismatch', '0 / 10'); await has('sarimUOut', '1,414'); eq(await page.locator('#sarimCut').inputValue(), '8');

      // ── 4 · Ölçekler ──
      await click('tab-olcek');
      await has('olcekLP', '1,616255·10⁻³⁵ m'); await has('olcekTP', '5,391246·10⁻⁴⁴ s'); await has('olcekMP', '2,176434·10⁻⁸ kg'); await has('olcekEP', '1,22089·10¹⁹ GeV'); await has('olcekTempP', '1,416784·10³² K');
      await has('olcekE', '13,6 TeV'); await has('olcekRatio', '1,11·10⁻¹⁵'); await has('olcekGap', '14,95'); await has('olcekLam', '1,45·10⁻²⁰ m'); await has('olcekRho', '2,84 km'); await has('olcekCirc', '17,8 km'); await has('olcekStatus', '0,668');
      await painted('olcekChart'); await clean('ölçek varsayılan');
      await click('olcek100'); await has('olcekE', '100 TeV'); await has('olcekGap', '14,09'); await has('olcekCirc', '131 km');
      await click('olcekPlanck'); await has('olcekRatio', '0,999'); await has('olcekCirc', 'ışık yılı'); await has('olcekStatus', 'güvenilir değildir'); await clean('Planck');
      await set('olcekM', 9.99); await set('olcekK', 19); await set('olcekB', 20); await has('olcekStatus', 'üstünde'); await clean('ölçek üst sınır');
      await set('olcekM', 1); await set('olcekK', 0); await set('olcekB', 1); await has('olcekE', '1 GeV'); await has('olcekGap', '19,09'); await clean('ölçek alt sınır');
      await click('olcekLHC'); await has('olcekE', '13,6 TeV');
      await click('olcekReset'); await has('olcekBOut', '8,0 T'); await has('olcekCirc', '17,8 km');
      await page.locator('.si-sources summary').click(); await clean('kaynaklar açık');
      assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      await ctx.close();
    }
    console.log(`G sicim-teorisi: ${checks - before} kalıcı arayüz kontrolü (390 açık + 1280 koyu; dört sekme, hazır ayarlar, sıfırlama, sınırlar, klavye) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
