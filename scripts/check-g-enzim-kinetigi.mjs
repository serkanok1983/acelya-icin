// G · enzim-kinetigi.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini YENİDEN KULLANMAZ:
// tam mekanizma burada ayrıca yazılan uyarlamalı Dormand–Prince 5(4) ile çözülür; inhibisyonun hızlı denge
// indirgemesi, inhibitör bağlanması sonlu hızla yazılmış beş türlü ayrı bir ODE ile ve kararlı durum doğrusal
// sisteminin Gauss eliminasyonuyla sınanır; uyumlar kaba kuvvet ızgara aramasıyla, optimumlar ince taramayla
// karşılaştırılır. Wikipedia'dan açılan K_M/k_cat tablosu (pepsin, fumaraz) değerleriyle hazır durumlar sınanır.
// Kullanım: node scripts/check-g-enzim-kinetigi.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../enzim-kinetigi.html", import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.EnzymeLab;
let checks = 0;
const near = (actual, expected, tol = 1e-9, label = "") => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(1e-300, Math.abs(expected)) + (expected === 0 ? tol : 0), `${label} ${actual} ≠ ${expected} (tol ${tol})`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };
ok(Object.isFrozen(K) && Object.isFrozen(K.INH_S), "çekirdek dondurulmuş");

/* ── Bağımsız tümleyici: Dormand–Prince 5(4), uyarlamalı ── */
const DP = { c: [0, 1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1], a: [[], [1 / 5], [3 / 40, 9 / 40], [44 / 45, -56 / 15, 32 / 9], [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729], [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656], [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84]], b: [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0], e: [71 / 57600, 0, -71 / 16695, 71 / 1920, -17253 / 339200, 22 / 525, -1 / 40] };
function dopri(f, y0, T, opt) {
  const rtol = opt.rtol || 1e-10, atol = opt.atol || 1e-14, n = y0.length;
  let t = 0, y = y0.slice(), h = opt.h0 || T * 1e-8;
  const out = [[0, y.slice()]];
  let k = [f(t, y)];
  while (t < T) {
    if (t + h > T) h = T - t;
    const ks = [k[0]];
    for (let s = 1; s < 7; s++) { const ys = y.map((v, i) => v + h * DP.a[s].reduce((acc, a, j) => acc + a * ks[j][i], 0)); ks.push(f(t + DP.c[s] * h, ys)); }
    const yn = y.map((v, i) => v + h * DP.b.reduce((acc, b, j) => acc + b * ks[j][i], 0));
    let err = 0;
    for (let i = 0; i < n; i++) { const e = h * DP.e.reduce((acc, ee, j) => acc + ee * ks[j][i], 0), sc = atol + rtol * Math.max(Math.abs(y[i]), Math.abs(yn[i])); err = Math.max(err, Math.abs(e) / sc); }
    if (err <= 1) { t += h; y = yn; k = [ks[6]]; out.push([t, y.slice()]); if (opt.stop && opt.stop(t, y, out)) break; }
    h *= Math.min(5, Math.max(0.2, 0.9 * Math.pow(err || 1e-10, -0.2)));
  }
  return out;
}
// Tepe: örnek noktalar arasında üç noktadan parabol
function peakOf(out, idx) {
  let j = 1;
  for (let i = 1; i < out.length - 1; i++) if (out[i][1][idx] > out[j][1][idx]) j = i;
  const [t0, a] = [out[j - 1][0], out[j - 1][1][idx]], [t1, b] = [out[j][0], out[j][1][idx]], [t2, c] = [out[j + 1][0], out[j + 1][1][idx]];
  const den = (t0 - t1) * (t0 - t2) * (t1 - t2), A = (t2 * (b - a) + t1 * (a - c) + t0 * (c - b)) / den, B = (t2 * t2 * (a - b) + t1 * t1 * (c - a) + t0 * t0 * (b - c)) / den, C0 = (t1 * t2 * (t1 - t2) * a + t2 * t0 * (t2 - t0) * b + t0 * t1 * (t0 - t1) * c) / den;
  const tp = -B / (2 * A);
  return { t: tp, y: A * tp * tp + B * tp + C0 };
}
function mmRef(p, T) {
  const f = (t, [S, C, P]) => { const E = p.E0 - C, r = p.k1 * E * S; return [-r + p.km1 * C, r - (p.km1 + p.kcat) * C, p.kcat * C]; };
  return dopri(f, [p.S0, 0, 0], T, { rtol: 1e-11, atol: 1e-16 * p.S0, h0: 1e-4 / (p.k1 * (p.S0 + p.E0) + p.km1 + p.kcat) });
}

/* ── 1. Tam mekanizma ── */
const PRESETS = {
  classic: { k1: 1, km1: 90, kcat: 10, E0: 0.1, S0: 100 }, rich: { k1: 1, km1: 90, kcat: 10, E0: 100, S0: 100 }, bh: { k1: 1, km1: 1, kcat: 99, E0: 0.1, S0: 100 },
  lowS: { k1: 1, km1: 90, kcat: 10, E0: 0.1, S0: 5 }, fum: { k1: 1000, km1: 4200, kcat: 800, E0: 0.01, S0: 20 }, pep: { k1: 0.01, km1: 2.5, kcat: 0.5, E0: 1, S0: 300 },
  zeroBack: { k1: 0.1, km1: 0, kcat: 5, E0: 1, S0: 20 }, bigE: { k1: 1, km1: 90, kcat: 10, E0: 1000, S0: 1 },
};
// Wikipedia · Michaelis–Menten kinetics tablosu: pepsin K_M = 3.0e-4 M, k_cat = 0.50 s⁻¹ (k_cat/K_M 1.7e3); fumaraz 5.0e-6 M, 8.0e2 s⁻¹ (1.6e8)
near((PRESETS.pep.km1 + PRESETS.pep.kcat) / PRESETS.pep.k1, 300, 1e-12, "pepsin K_M = 300 µM"); near(PRESETS.pep.kcat, 0.5, 0); near(K.constants({ ...PRESETS.pep }).spec * 1e6, 1.667e3, 1e-3, "pepsin k_cat/K_M");
near((PRESETS.fum.km1 + PRESETS.fum.kcat) / PRESETS.fum.k1, 5, 1e-12, "fumaraz K_M = 5 µM"); near(K.constants({ ...PRESETS.fum }).spec * 1e6, 1.6e8, 1e-12, "fumaraz k_cat/K_M");
for (const [name, p] of Object.entries(PRESETS)) {
  const s = K.simulateMM(p);
  ok(!s.truncated, name + " bütçe yetti");
  ok(s.bal < 1e-10, name + " kütle denkliği " + s.bal);
  const ref = mmRef(p, s.T);
  // kayıtlı örnekler başvuru çözümüyle (doğrusal ara değer yerine aynı anlarda başvuru tümleyicisinin yoğun örnekleri)
  const tr = ref.map(r => r[0]);
  const at = t => { let lo = 0, hi = tr.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (tr[m] <= t) lo = m; else hi = m; } return lo; };
  let worst = 0;
  for (let i = 0; i < s.out.t.length; i += 37) {
    const t = s.out.t[i], j = at(t); if (j + 1 >= ref.length) continue;
    const [ta, ya] = ref[j], [tb, yb] = ref[j + 1], w = (t - ta) / (tb - ta);
    if (tb - ta > 1e-3 * s.T) continue; // seyrek aralıkta doğrusal ara değer güvenilmez
    const Pr = ya[2] + w * (yb[2] - ya[2]);
    worst = Math.max(worst, Math.abs(s.out.P[i] - Pr) / p.S0);
  }
  ok(worst < 2e-5, name + " [P] RK4 − DP45 " + worst);
  const pk = peakOf(ref, 1), v0 = p.kcat * pk.y;
  near(s.vPeak, v0, 2e-6, name + " ölçülen v₀ (DP45 tepe)");
  near(s.peak.t, pk.t, 2e-2, name + " tepe anı (düz tepe: zayıf koşullu)");
  // yarı dönüşüm anı: başvuruda ikiye bölme
  const half = ref.findIndex(r => r[1][2] >= p.S0 / 2);
  if (half > 0) { const [ta, ya] = ref[half - 1], [tb, yb] = ref[half]; const th = ta + (p.S0 / 2 - ya[2]) / (yb[2] - ya[2]) * (tb - ta); near(s.half, th, 1e-4, name + " t½"); }
  // yarı kararlı durum: ε ≪ 1 ise v₀ formüle ε ölçeğinde yakın; tQSSA her durumda daha yakın ya da eşit
  const c = s.c, vMM = c.Vmax * p.S0 / (c.KM + p.S0);
  if (c.eps < 0.01) ok(Math.abs(v0 / vMM - 1) < 5 * c.eps + 2e-3, name + " QSSA ε ölçeğinde");
  ok(Math.abs(s.vPeak / s.vTQ - 1) <= Math.abs(s.vPeak / vMM - 1) + 1e-9, name + " tQSSA daha iyi");
  // τ: tepe değerinin 1 − 1/e katına çıkış, başvurudan
  const lvl = (1 - Math.exp(-1)) * pk.y, k2 = ref.findIndex(r => r[1][1] >= lvl), [ta, ya] = ref[k2 - 1], [tb, yb] = ref[k2];
  near(s.tauMeas, ta + (lvl - ya[1]) / (yb[1] - ya[1]) * (tb - ta), 3e-3, name + " τ");
}
// klasik durumun gösterilen sayıları
{ const s = K.simulateMM(PRESETS.classic); near(s.c.KM, 100, 1e-14); near(s.c.Vmax, 1, 1e-14); near(s.c.eps, 5e-4, 1e-12); ok(Math.abs(s.vPeak - 0.4998) < 5e-5, "v₀ 0.4998"); ok(Math.abs(s.tauMeas - 4.998e-3) < 5e-7, "τ 4.998 ms"); ok(Math.abs(s.devP - 1.8e-4) < 1e-5, "sapma 0.018 %"); }
{ const s = K.simulateMM(PRESETS.rich); ok(Math.abs(s.vPeak / s.c.vMM - 1 + 0.2684) < 1e-4, "enzim bol: −26.84 %"); ok(s.devP > 0.15, "enzim bol: eğri ayrılır"); }
// aşırı katı durum: bütçe dolar, tepe yoksa v₀ tanımsız
{ const s = K.simulateMM({ k1: 100, km1: 1e4, kcat: 1e-3, E0: 1e-4, S0: 1e4 }); ok(s.truncated && s.steps === K.MAX_STEPS, "katı durumda bütçe"); ok(s.vPeak === null || Number.isFinite(s.vPeak), "katı durumda tanımsız ya da sonlu"); }
for (const bad of [{ k1: 0, km1: 1, kcat: 1, E0: 1, S0: 1 }, { k1: 1, km1: -1, kcat: 1, E0: 1, S0: 1 }, { k1: 1, km1: 1, kcat: 1, E0: 0, S0: 1 }]) { assert.throws(() => K.simulateMM(bad)); checks++; }

// Lambert W ve QSSA kapalı biçimleri: tanım denklemleri
for (const L of [-50, -5, -1, 0, 0.5, 1, 3, 10, 100, 700]) { const w = K.lambertWexp(L); near(Math.log(w) + w, L, 1e-12, "W(e^L)"); }
for (const [KM, V, S0] of [[100, 1, 100], [5, 6.4, 20], [300, 0.5, 300], [1, 1e-3, 1e4]]) for (const f of [0.01, 0.3, 0.9, 0.999]) {
  const t = f * (S0 + KM * 7) / V, S = K.sqssaS(KM, V, S0, t);
  near(V * t, (S0 - S) + KM * Math.log(S0 / S), 1e-9, "integral MM");
}
near(K.sqssaHalf(100, 1, 100), 50 + 100 * Math.log(2), 1e-14, "QSSA t½");
for (const p of Object.values(PRESETS)) { const KM = (p.km1 + p.kcat) / p.k1, C = K.tqssaRate(p) / p.kcat; near(C * C - (p.E0 + KM + p.S0) * C + p.E0 * p.S0, 0, 1e-9 * (p.E0 + KM + p.S0) ** 2, "tQSSA kök"); ok(C <= Math.min(p.E0, p.S0), "tQSSA sınır"); }

/* ── 2. Kestirim ── */
const S8 = K.design(20, 500, 8);
near(S8[0], 20, 1e-14); near(S8[7], 500, 1e-12); near(S8[4] / S8[3], Math.pow(25, 1 / 7), 1e-12, "geometrik");
for (const [V, Km] of [[1, 100], [3, 20], [0.2, 450]]) {
  const v = S8.map(s => V * s / (Km + s)), f = K.fitAll(S8, v);
  for (const m of K.METHODS) { near(f[m].K, Km, 1e-7, m + " gürültüsüz K"); near(f[m].V, V, 1e-7, m + " gürültüsüz V"); }
}
// gürültülü veri: LM, kaba kuvvet ızgara minimumu ile; doğrusallaştırmalar Cramer kuralıyla
function cramer(x, y) { const n = x.length, sx = x.reduce((a, b) => a + b, 0), sy = y.reduce((a, b) => a + b, 0), sxx = x.reduce((a, b) => a + b * b, 0), sxy = x.reduce((a, b, i) => a + b * y[i], 0), d = n * sxx - sx * sx; return { m: (n * sxy - sx * sy) / d, c: (sxx * sy - sx * sxy) / d }; }
for (const seed of [1, 2, 3, 17, 42]) for (const model of ["abs", "prop"]) {
  const v = K.makeData(1, 100, S8, 0.03, model, seed), f = K.fitAll(S8, v);
  const sse = (V, Km) => S8.reduce((a, s, i) => a + (v[i] - V * s / (Km + s)) ** 2, 0);
  let bV = 1, bK = 100, bE = Infinity, dV = 0.5, dK = 50;
  for (let lev = 0; lev < 30; lev++) {
    let cV = bV, cK = bK;
    for (let i = -10; i <= 10; i++) for (let j = -10; j <= 10; j++) { const V = cV + i * dV / 10, Km = cK + j * dK / 10; if (V <= 0 || Km <= 0) continue; const e = sse(V, Km); if (e < bE) { bE = e; bV = V; bK = Km; } }
    dV /= 4; dK /= 4;
  }
  near(f.nl.K, bK, 1e-6, "LM = ızgara K"); near(f.nl.V, bV, 1e-6, "LM = ızgara V"); ok(f.nl.sse <= bE * (1 + 1e-9), "LM en küçük");
  const pos = S8.map((s, i) => [s, v[i]]).filter(q => q[1] > 0);
  const lb = cramer(pos.map(q => 1 / q[0]), pos.map(q => 1 / q[1])); near(f.lb.V, 1 / lb.c, 1e-9); near(f.lb.K, lb.m / lb.c, 1e-9);
  const eh = cramer(pos.map(q => q[1] / q[0]), pos.map(q => q[1])); near(f.eh.V, eh.c, 1e-9); near(f.eh.K, -eh.m, 1e-9);
  const hw = cramer(pos.map(q => q[0]), pos.map(q => q[0] / q[1])); near(f.hw.V, 1 / hw.m, 1e-9); near(f.hw.K, hw.c / hw.m, 1e-9);
}
// gürültü istatistiği: sabit σ'da örnek ortalaması ve sapması (tohumlar boyunca)
{ let s1 = 0, s2 = 0, n = 0; for (let seed = 1; seed <= 400; seed++) { const v = K.makeData(1, 100, [100], 0.05, "abs", seed); const e = (v[0] - 0.5) / 0.05; s1 += e; s2 += e * e; n++; } ok(Math.abs(s1 / n) < 0.15 && Math.abs(s2 / n - 1) < 0.2, "Gauss gürültü"); }
// Monte Carlo: deterministik, nicelikler sıralı, varsayılan düzende sıralama
{
  const a = K.monteCarlo(1, 100, S8, 0.03, "abs", 1, 400), b = K.monteCarlo(1, 100, S8, 0.03, "abs", 1, 400);
  for (const m of K.METHODS) { near(a.stats[m].K.q50, b.stats[m].K.q50, 0); ok(a.stats[m].K.q05 <= a.stats[m].K.q25 && a.stats[m].K.q25 <= a.stats[m].K.q50 && a.stats[m].K.q50 <= a.stats[m].K.q75 && a.stats[m].K.q75 <= a.stats[m].K.q95, m + " nicelik sırası"); ok(a.stats[m].n + a.stats[m].fail === 400, "sayım"); }
  const sorted = a.raw.nl.K.slice().sort((x, y) => x - y); near(a.stats.nl.K.q50, (sorted[199] + sorted[200]) / 2, 1e-14, "medyan");
  const w = m => a.stats[m].K.q95 - a.stats[m].K.q05;
  ok(w("lb") > 3 * w("nl"), "sabit gürültüde LB aralığı en az 3 kat");
  const p = K.monteCarlo(1, 100, S8, 0.05, "prop", 1, 400), wp = m => p.stats[m].K.q95 - p.stats[m].K.q05;
  ok(wp("lb") < 1.1 * wp("nl"), "orantılı gürültüde LB yaklaşık eşit");
  near(a.stats.lb.K.q05, 0.636, 2e-3, "LB %5"); near(a.stats.lb.K.q95, 2.028, 1e-3, "LB %95"); near(a.stats.nl.K.q05, 0.820, 2e-3); near(a.stats.nl.K.q95, 1.190, 1e-3);
}

/* ── 3. İnhibisyon ── */
// (a) kararlı durum: dört türlü doğrusal sistemi Gauss eliminasyonuyla çöz (sayfanın formülünü kullanmadan)
function ssRate(KM, kcat, E0, S, I, KiE, KiES, k1) {
  // bilinmeyenler E, ES, EI, ESI; denklemler: k1 E S = (k1 KM) ES ; EI·KiE = E·I ; ESI·KiES = ES·I ; toplam = E0
  const A = [[k1 * S, -k1 * KM, 0, 0], [Number.isFinite(KiE) ? I : 0, 0, Number.isFinite(KiE) ? -KiE : 1, 0], [0, Number.isFinite(KiES) ? I : 0, 0, Number.isFinite(KiES) ? -KiES : 1], [1, 1, 1, 1]], b = [0, 0, 0, E0];
  for (let c = 0; c < 4; c++) { let p = c; for (let r = c + 1; r < 4; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r; [A[c], A[p]] = [A[p], A[c]]; [b[c], b[p]] = [b[p], b[c]]; for (let r = 0; r < 4; r++) if (r !== c) { const f = A[r][c] / A[c][c]; for (let k = c; k < 4; k++) A[r][k] -= f * A[c][k]; b[r] -= f * b[c]; } }
  return kcat * b[1] / A[1][1];
}
const BASE = { k1: 1, km1: 90, kcat: 10, E0: 0.1 };
for (const type of ["comp", "uncomp", "noncomp", "mixed"]) for (const [Ki, alpha] of [[50, 2], [5, 0.2], [200, 5]]) for (const I of [0, 50, 200]) {
  const ic = K.inhibConstants(type, Ki, alpha);
  for (const S of [25, 100, 800]) {
    const vss = ssRate(100, 10, 0.1, S, I, ic.KiE, ic.KiES, 1), app = K.apparent(100, 1, I, ic.KiE, ic.KiES);
    near(app.V * S / (app.KM + S), vss, 1e-10, "görünür parametreler = kararlı durum");
    const r = K.inhibRate({ ...BASE, S0: S, I0: I, KiE: ic.KiE, KiES: ic.KiES });
    ok(Math.abs(r.v / vss - 1) < 3 * 0.1 / (S + 100) + 1e-4, `ODE başlangıç hızı ≈ kararlı durum ${type} ${S} ${I}`);
  }
  // IC50: kararlı durum hızında ikiye bölme
  if (I === 0) for (const Sa of [10, 100, 1000]) {
    const v0 = ssRate(100, 10, 0.1, Sa, 0, ic.KiE, ic.KiES, 1);
    let lo = -3, hi = 6; for (let k = 0; k < 100; k++) { const m = (lo + hi) / 2; if (ssRate(100, 10, 0.1, Sa, 10 ** m, ic.KiE, ic.KiES, 1) > v0 / 2) lo = m; else hi = m; }
    near(K.ic50Theory(100, Sa, ic.KiE, ic.KiES), 10 ** lo, 1e-9, "IC50 formülü");
    if (type === "comp") near(K.chengPrusoff(Ki, Sa, 100), 10 ** lo, 1e-9, "Cheng–Prusoff");
  }
}
// (b) hızlı denge indirgemesi: sonlu bağlanma hızlı beş türlü ODE (DP45) ile
function inhibFull(p, kon) {
  const offE = Number.isFinite(p.KiE) ? kon * p.KiE : 0, onE = Number.isFinite(p.KiE) ? kon : 0, offES = Number.isFinite(p.KiES) ? kon * p.KiES : 0, onES = Number.isFinite(p.KiES) ? kon : 0;
  const EI0 = onE ? p.E0 * p.I0 / (p.I0 + p.KiE) : 0;
  const f = (t, [S, C, X, Y]) => { const E = p.E0 - C - X - Y, I = p.I0 - X - Y, r = p.k1 * E * S, a = onE * E * I - offE * X, b = onES * C * I - offES * Y; return [-r + p.km1 * C, r - (p.km1 + p.kcat) * C - b, a, b]; };
  const out = dopri(f, [p.S0, 0, EI0, 0], 50, { rtol: 1e-10, atol: 1e-16, h0: 1e-9, stop: (t, y, o) => o.length > 3 && o[o.length - 1][1][1] < o[o.length - 2][1][1] && t > 1e-3 });
  return p.kcat * peakOf(out, 1).y;
}
for (const [type, Ki] of [["comp", 50], ["uncomp", 50], ["mixed", 20]]) for (const S of [25, 200]) {
  const ic = K.inhibConstants(type, Ki, 2), p = { ...BASE, S0: S, I0: 50, KiE: ic.KiE, KiES: ic.KiES };
  near(K.inhibRate(p).v, inhibFull(p, 2e4), 2e-3, `hızlı denge ≈ sonlu kon ${type} S=${S}`);
}
// (c) deney: kesişim desenleri ve IC50 ölçümü
{
  const lineCross = (KM, V, i1, i2, KiE, KiES) => { const sl = i => KM * (1 + i / KiE) / V, ic = i => (1 + i / KiES) / V; const x = -(ic(i2) - ic(i1)) / (sl(i2) - sl(i1)); return [x, ic(i1) + sl(i1) * x]; };
  const e1 = K.inhibExperiment(BASE, "comp", 50, 2, 50, 100); ok(Math.abs(e1.cross.x) * 100 < 1e-3, "yarışmalı: dikey eksen"); near(e1.cross.y, 1, 1e-3); near(e1.ic50, 100, 2e-3, "IC50 = 2 K_i");
  const e2 = K.inhibExperiment(BASE, "uncomp", 50, 2, 50, 100); ok(e2.cross.parallel && e2.crossTh.parallel, "yarışmasız: paralel"); near(e2.cross.slopeRatio, 1, 3e-3);
  const e3 = K.inhibExperiment(BASE, "noncomp", 50, 2, 50, 100); near(e3.cross.x, -0.01, 3e-3, "saf karma: −1/K_M"); ok(Math.abs(e3.cross.y) < 1e-6, "yatay eksen"); near(e3.ic50, 50, 1e-3, "IC50 = K_i");
  for (const alpha of [0.2, 0.5, 2, 5]) { const e = K.inhibExperiment(BASE, "mixed", 40, alpha, 60, 300), [x, y] = lineCross(100, 1, 0, 120, 40, alpha * 40); near(e.crossTh.x, x, 1e-9, "kesişim formülü x"); near(e.crossTh.y, y, 1e-9, "kesişim formülü y"); near(e.cross.x, x, 5e-3, "ölçülen kesişim x"); near(e.ic50, e.ic50Th, 2e-3, "ölçülen IC50"); }
  const e0 = K.inhibExperiment(BASE, "mixed", 50, 2, 0, 100); ok(e0.sets.length === 1 && e0.cross === null, "[I] = 0 kesişim yok");
  for (const s of e1.sets) { near(s.fit.K, s.th.KM, 2e-3, "K_M,gör"); near(s.fit.V, s.th.V, 1e-3, "V_max,gör"); }
}

/* ── 4. Sıcaklık ve pH ── */
const Rg = 8.314462618;
const vT = (Tc, Ea, dH, Tm) => { const T = Tc + 273.15, Tmk = Tm + 273.15; return Math.exp(-Ea / (Rg * T)) / (1 + Math.exp(-dH * (1 - T / Tmk) / (Rg * T))); };
for (const [Ea, dH, Tm] of [[50e3, 400e3, 55], [50e3, 400e3, 82], [20e3, 1000e3, 30], [120e3, 300e3, 110], [80e3, 200e3, 60]]) {
  let best = 0, bv = -Infinity; for (let T = 0; T <= 120; T += 1e-3) { const v = Math.log(vT(T, Ea, dH, Tm)); if (v > bv) { bv = v; best = T; } }
  const m = K.tempOptMeasured({ Ea, dH, Tm }), th = K.tempOptTheory({ Ea, dH, Tm });
  if (best > 0.01 && best < 119.99) { near(m.T, best, 2e-5 / Math.max(best, 1) * 100, "T_opt tarama"); near(th, best, 2e-5 / Math.max(best, 1) * 100, "T_opt kapalı biçim"); near(K.tempRate(th, { Ea, dH, Tm }).fN, 1 - Ea / dH, 1e-9, "f_N = 1 − Eₐ/ΔH"); }
  else ok(m.edge, "kenar");
}
ok(K.tempOptTheory({ Ea: 120e3, dH: 100e3, Tm: 55 }) === null && K.tempOptMeasured({ Ea: 120e3, dH: 100e3, Tm: 55 }).edge, "ΔH ≤ Eₐ optimum yok");
{ const t = K.tempOptTheory({ Ea: 50e3, dH: 400e3, Tm: 82 }); ok(t >= 75 && t <= 80, "Taq benzeri 75–80 °C (Wikipedia)"); near(t, 76.97, 1e-4); }
near(K.tempOptTheory({ Ea: 50e3, dH: 400e3, Tm: 55 }), 50.70, 1e-4, "varsayılan T_opt");
for (const [a, b] of [[4.5, 8.5], [1, 3], [6, 6.4], [0, 14], [2.8, 3]]) {
  const f = x => 1 / (1 + 10 ** (a - x) + 10 ** (x - b));
  let best = 0, bv = -1; for (let x = -2; x <= 16; x += 1e-4) { const v = f(x); if (v > bv) { bv = v; best = x; } }
  const m = K.phOptMeasured(a, b), t = K.phTheory(a, b);
  near(m.opt, best, 1e-4, "pH opt"); near(t.opt, (a + b) / 2, 1e-14); near(m.fmax, bv, 1e-8); near(t.fmax, bv, 1e-8);
  for (const side of ["low", "high"]) { near(f(m[side]), bv / 2, 1e-9, "yarı yükseklik"); near(t[side], m[side], 1e-9, "yarı yükseklik formülü"); }
  const fr = K.phFractions(3.3, a, b); near(fr.E2H + fr.EH + fr.E, 1, 1e-14);
}
ok(K.phFractions(6.5, 1, 3).EH < 1e-3, "pepsin benzeri pH 6.5'te etkin değil (Wikipedia)");
near(K.phTheory(4.5, 8.5).low, 4.483, 1e-3); near(K.phTheory(6, 6.4).fmax, 0.4421, 1e-4);
console.log(`G enzim-kinetigi: ${checks} bağımsız çekirdek denetimi PASS`);

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
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  let browser;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const before = checks;
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width === 390 ? 2 : 1, locale: "tr-TR" });
      await ctx.addInitScript(t => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(8000);
      const errors = []; page.on("pageerror", e => errors.push(e.message)); page.on("console", m => { if (m.type() === "error" && !/404/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/enzim-kinetigi.html`);
      const click = id => page.locator("#" + id).click(), read = async id => (await page.locator("#" + id).textContent()).trim();
      const has = async (id, text) => { let t = ""; for (let i = 0; i < 40; i++) { t = await read(id); if (t.includes(text)) break; await page.waitForTimeout(50); } assert(t.includes(text), `[${width}] #${id}: "${t}" içinde "${text}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, v);
      const pick = (id, v) => page.locator("#" + id).selectOption(v);
      const type = async (id, v) => { await page.locator("#" + id).fill(v); await page.locator("#" + id).dispatchEvent("change"); };
      const eq = (a, b, label) => { assert.equal(a, b, `[${width}] ${label || ""}`); checks++; };
      const clean = async sel => { const t = await page.locator(sel).innerText(); assert(!/NaN|Infinity|undefined|null/.test(t), `[${width}] ${sel} bozuk sayı: ${t.match(/.{0,30}(NaN|Infinity|undefined|null).{0,30}/)?.[0]}`); checks++; };
      const noOverflow = async () => eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "yatay taşma");
      const drawn = async ids => { await page.waitForTimeout(120); for (const id of ids) eq(await page.evaluate(id => { const c = document.getElementById(id), d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++; return n > 500; }, id), true, id + " boş"); };

      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content input, .app-content select")].filter(e => !document.querySelector(`label[for="${e.id}"]`)).length), 0, "etiketsiz denetim");
      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].filter(c => c.getAttribute("role") !== "img" || !c.getAttribute("aria-label")).length), 0, "rolsüz tuval");
      eq(await page.evaluate(() => Object.isFrozen(EnzymeLab) && !Object.getOwnPropertyDescriptor(window, "EnzymeLab").writable), true, "çekirdek salt okunur");
      eq(await page.evaluate(() => /[̀-ͯ]/.test(document.querySelector(".app-content").innerText)), false, "birleşik işaret yok");
      eq(await page.evaluate(() => document.querySelectorAll('.app-content input[type="number"]').length), 0, "type=number yok");

      /* 01 */
      await has("mKM", "100.0 µM"); await has("mVmax", "1.000 µM/s"); await has("mEps", "5.00×10⁻⁴"); await has("mV0", "0.4998 µM/s"); await has("mV0Info", "fark −0.04 %"); await has("mTau", "4.998 ms"); await has("mHalf", "119.4 s"); await has("mDev", "0.018 %"); await has("mStatus", "tutuyor");
      await pick("mPreset", "rich"); await has("mV0", "365.8"); await has("mV0Info", "fark −26.84 %"); await has("mVtqInfo", "fark −4.23 %"); await has("mStatus", "çöktü"); await has("mDev", "16.136 %");
      await pick("mPreset", "bh"); await has("mKMInfo", "K_M/K_d = 100.0"); await has("mStatus", "Briggs–Haldane");
      await pick("mPreset", "lowS"); await has("mStatus", "birinci derece");
      await pick("mPreset", "fum"); await has("mKMInfo", "1.60×10⁸ M⁻¹s⁻¹"); await has("mTau", "40.00 µs");
      await pick("mPreset", "pep"); await has("mKMInfo", "1670 M⁻¹s⁻¹"); await has("mHalf", "11.95 min");
      await type("mE0", "10"); eq(await page.locator("#mPreset").inputValue(), "custom", "elle ayara geçer"); await has("mStatus", "Sınırda"); await has("mV0Info", "fark −1.27 %");
      await type("mK1", "abc"); await has("mStatus", "Geçersiz giriş"); eq(await page.locator("#mK1").inputValue(), "0.01", "önceki k₁");
      await type("mS0", "0,5"); eq(await page.locator("#mS0").inputValue(), "0.5", "ondalık virgül"); await type("mS0", "1e9"); eq(await page.locator("#mS0").inputValue(), "10000", "üst sınır"); await has("mStatus", "aralığa çekildi");
      await type("mKm1", "0"); await has("mStatus", "k₋₁ = 0"); await clean("#panel-mm");
      await type("mK1", "100"); await type("mKm1", "1e4"); await type("mKcat", "1e-3"); await type("mE0", "1e-4"); await has("mStatus", "çok katı"); await clean("#panel-mm");
      await click("mReset"); await has("mV0", "0.4998"); eq(await page.locator("#mPreset").inputValue(), "classic", "sıfırla hazır durum"); eq(await page.locator("#mE0").inputValue(), "0.1", "sıfırla E0");
      await click("mPlay"); await has("mPlay", "Duraklat"); await page.waitForTimeout(400); await has("mCurV", "d[P]/dt"); await page.locator("h1").click(); await page.keyboard.press("Space"); await has("mPlay", "Devam et");
      await page.keyboard.press("r"); await has("mCurT", "—"); await page.locator("#mK1").focus(); await page.keyboard.press("Space"); await has("mPlay", "Oynat");
      await drawn(["mChartP", "mChartES"]); await noOverflow();

      /* 02 */
      await click("tab-fit"); await has("fNL", "K_M = 89.50 µM"); await has("fLB", "K_M = 69.91 µM"); await has("fEH", "76.79"); await has("fHW", "93.18"); await has("fRows", "0.636 – 2.028"); await has("fStatus", "3.76 katı");
      await pick("fModel", "prop"); await has("fStatus", "Orantılı"); await has("fStatus", "0.97 katı");
      await click("fReset"); await click("fPreLow"); await has("fStatus", "K_M'nin altında"); await has("fStatus", "Lineweaver–Burk 128"); await clean("#panel-fit");
      await click("fPreWide"); await has("fStatus", "11.75 katı");
      await range("fNoise", 0); await has("fStatus", "Gürültü sıfır"); await has("fNL", "100.0 µM"); await has("fLB", "100.0 µM");
      await range("fSmin", 200); await range("fSmax", 300); await has("fStatus", "en az iki katı"); await has("fSmaxOut", "400 µM"); await clean("#panel-fit");
      await range("fNoise", 10); await range("fN", 4); await range("fSmin", 2); await range("fSmax", 50); await clean("#panel-fit");
      await click("fReset"); await has("fKOut", "100 µM"); await has("fNoiseOut", "3.0 %"); await has("fNL", "89.50"); await page.keyboard.press("r");
      await drawn(["fChartV", "fChartLB", "fChartDist"]); await noOverflow();

      /* 03 */
      await click("tab-inh"); await has("iKapp", "200.16 µM"); await has("iVapp", "1.0002"); await has("iIC50", "100.01 µM"); await has("iCP", "50.00 µM"); await has("iStatus", "dikey eksende"); eq(await page.locator("#iAlpha").isDisabled(), true, "α yalnız karmada");
      { const labs = await page.locator("#iType option").allTextContents(); eq(["(competitive)", "(uncompetitive)", "(noncompetitive)", "(mixed)"].every((w, i) => labs[i].includes(w)), true, "inhibisyon etiketlerinde İngilizce terimler"); }
      await pick("iType", "uncomp"); await has("iCross", "paralel"); await has("iKapp", "50.092"); await has("iStatus", "rastlantıyla");
      await pick("iType", "noncomp"); await has("iCross", "(−0.00998 ; 0)"); await has("iIC50", "50.000 µM"); await has("iCPInfo", "fark −50.00 %");
      await pick("iType", "mixed"); eq(await page.locator("#iAlpha").isDisabled(), false, "α karmada açık"); await has("iCross", "(−0.00499 ; 0.500)"); await has("iIC50", "66.666");
      await range("iI", 0); await has("iCross", "tanımsız"); await has("iSlope", "—"); await clean("#panel-inh");
      await range("iI", 200); await range("iKi", 5); await range("iAlpha", 0.2); await range("iSa", 1000); await clean("#panel-inh"); await range("iKi", 200); await range("iAlpha", 5); await range("iSa", 10); await clean("#panel-inh");
      await pick("iType", "comp"); await range("iSa", 1000); await range("iKi", 200); await has("iIC50Info", "2200"); await clean("#panel-inh");
      await click("iReset"); await has("iKapp", "200.16"); await has("iIOut", "50 µM");
      await drawn(["iChartV", "iChartLB", "iChartDose"]); await noOverflow();

      /* 04 */
      await click("tab-tp"); await has("tOpt", "50.70 °C"); await has("tFN", "0.8750"); await has("tQ10", "× 1.967"); await has("pOpt", "6.500"); await has("pLow", "pH 4.483"); await has("pStatus", "güvenli");
      await click("tPreTaq"); await has("tOpt", "76.97 °C"); await click("pPrePep"); await has("pOpt", "2.000"); await has("pStatus", "pepsinin");
      await click("pPreNear"); await has("pMax", "0.4421"); await has("pStatus", "yanıltır");
      await range("tEa", 120); await range("tDH", 100); await has("tOpt", "yok"); await has("tStatus", "iç optimum yok"); await clean("#panel-tp");
      await range("tEa", 20); await range("tDH", 1000); await range("tTm", 110); await clean("#panel-tp");
      await range("pK2", 3); await has("pK1Out", "2.8"); await has("pStatus", "en az 0.2"); await range("pK1", 13.8); await has("pK2Out", "14.0"); await clean("#panel-tp");
      await click("tReset"); await has("tOpt", "50.70"); await has("pK1Out", "4.5");
      await drawn(["tChart", "pChart"]); await noOverflow();

      // sekme klavyesi
      await page.locator("#tab-tp").focus(); await page.keyboard.press("Home"); eq(await page.locator("#tab-mm").getAttribute("aria-selected"), "true", "Home");
      await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-fit").getAttribute("aria-selected"), "true", "sağ ok"); eq(await page.locator("#panel-fit").isVisible(), true, "panel görünür");
      await page.keyboard.press("End"); eq(await page.locator("#tab-tp").getAttribute("aria-selected"), "true", "End"); await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-mm").getAttribute("aria-selected"), "true", "sarma");
      await page.keyboard.press("ArrowLeft"); eq(await page.locator("#tab-tp").getAttribute("aria-selected"), "true", "sol ok"); eq(await page.locator("#tab-mm").getAttribute("tabindex"), "-1", "tabindex");
      await noOverflow();
      assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      console.log(`G enzim-kinetigi: ${width} px ${theme} · ${checks - before} arayüz denetimi PASS`);
      await ctx.close();
    }
  } finally { await browser?.close(); await new Promise(r => server.close(r)); }
}
