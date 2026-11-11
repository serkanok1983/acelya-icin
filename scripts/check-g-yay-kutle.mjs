// G · yay-kutle.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) node'da yüklenir ve sayfanın kendi formüllerini KULLANMAYAN
// başvurularla karşılaştırılır: analitik çözümler (sönümsüz, az/kritik/aşırı sönümlü, sürülen + geçici),
// karmaşık empedans, enerji dengesi, integratörlerin kapalı büyüme çarpanları, h/2 ikizi,
// zincirin bağımsız özdeğer çözümü ve sürekli yayın β·tan β = m_s/m kökü.
// `--browser`: 390 px açık ve 1280 px koyu temada gerçek arayüz denetimi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../yay-kutle.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.YayKutleLab;
assert(Object.isFrozen(K), 'çekirdek dondurulmuş olmalı');

let checks = 0;
const TAU = 2 * Math.PI;
const near = (actual, expected, tol, label = '') => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(1, Math.abs(expected)), `${label} ${actual} ≠ ${expected} (tol ${tol})`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };

// ── Bağımsız başvurular (sayfanın theory nesnesi kullanılmaz) ──
const refFree = (m, k, b, x0, t) => { // durgun bırakılan sönümlü salınıcının analitik çözümü
  const g = b / (2 * m), w0 = Math.sqrt(k / m);
  if (g < w0) { const wd = Math.sqrt(w0 * w0 - g * g); return x0 * Math.exp(-g * t) * (Math.cos(wd * t) + (g / wd) * Math.sin(wd * t)); }
  if (g === w0) return x0 * (1 + w0 * t) * Math.exp(-w0 * t);
  const s = Math.sqrt(g * g - w0 * w0), r1 = -g + s, r2 = -g - s;
  return (x0 * (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t))) / (r2 - r1);
};
const refSteady = (m, k, b, F0, w) => { // karmaşık empedans: X = F0 / (k − mω² + i·bω)
  const re = k - m * w * w, im = b * w, d = re * re + im * im;
  return { A: F0 / Math.sqrt(d), phi: Math.atan2(im, re), xr: (F0 * re) / d, xi: (-F0 * im) / d };
};
const refDriven = (m, k, b, F0, w, t) => { // x(0) = v(0) = 0'dan başlayan tam çözüm (az sönümlü)
  const s = refSteady(m, k, b, F0, w), g = b / (2 * m), wd = Math.sqrt(k / m - g * g);
  const xp = s.xr * Math.cos(w * t) - s.xi * Math.sin(w * t); // Re(X e^{iωt})
  const c1 = -s.xr, c2 = (w * s.xi - g * s.xr) / wd; // xp(0) + c1 = 0; vp(0) − g c1 + wd c2 = 0, vp(0) = −ω·xi
  return xp + Math.exp(-g * t) * (c1 * Math.cos(wd * t) + c2 * Math.sin(wd * t));
};
function freeRun(c, tEnd, method = 'rk4', h = 1e-3) {
  const M = K.makeModel({ m: c.m, k: c.k, b: c.b || 0, g: c.g || 0, ms: c.ms || 0, N: 12 }), sim = K.makeSim(M, method), xeq = K.equilibrium(M), e = M.n - 1;
  sim.set(c.shape ? Array.from(xeq, (q, i) => q + c.shape[i]) : Array.from(xeq, (q, i) => q + (c.x0 * (i + 1)) / M.n));
  const tr = K.makeTracker(xeq[e]), Ueq = K.energy(M, xeq, new Float64Array(M.n)).U, e0 = K.energy(M, sim.x, sim.v), E0 = e0.K + e0.U - Ueq;
  let dMin = 0, dMax = 0, errMax = 0;
  while (sim.t < tEnd - 1e-12) {
    const t0 = sim.t, x0 = sim.x[e], v0 = sim.v[e], a0 = sim.a[e];
    sim.step(h);
    tr.push(t0, x0, v0, a0, sim.t, sim.x[e], sim.v[e], sim.a[e]);
    const en = K.energy(M, sim.x, sim.v), d = (en.K + en.U - Ueq - E0) / E0;
    dMin = Math.min(dMin, d); dMax = Math.max(dMax, d);
    if (c.ref) errMax = Math.max(errMax, Math.abs(sim.x[e] - xeq[e] - c.ref(sim.t)));
  }
  const en = K.energy(M, sim.x, sim.v), u = tr.ups, n = u.length;
  return { sim, tr, xeq: xeq[e], E0, drift: (en.K + en.U - Ueq - E0) / E0, dMin, dMax, errMax, T: n >= 2 ? (u[n - 1] - u[0]) / (n - 1) : NaN, mean: n >= 2 ? (tr.upsI[n - 1] - tr.upsI[0]) / (u[n - 1] - u[0]) : NaN };
}

// 1 · Basit harmonik hareket: analitik çözüm, periyot, genlikten bağımsızlık
for (const m of [0.05, 0.5, 2]) for (const k of [5, 20, 100]) {
  const w0 = Math.sqrt(k / m), T0 = TAU * Math.sqrt(m / k);
  const periods = [];
  for (const x0 of [0.01, 0.1, 0.3]) {
    const r = freeRun({ m, k, x0, ref: (t) => x0 * Math.cos(w0 * t) }, 6 * T0 + 0.01);
    near(r.T, T0, 2e-8, `T m=${m} k=${k}`); ok(r.errMax < 2e-7 * x0 * Math.max(1, (w0 * 1e-3) ** 4 * 1e9), `x(t) m=${m} k=${k} err=${r.errMax}`);
    periods.push(r.T);
  }
  ok(Math.max(...periods) - Math.min(...periods) < 1e-10, 'periyot genlikten bağımsız');
}
// 2 · Yerçekimi: periyot aynı, denge mg/k kayar
for (const g of [1.62, 9.81, 24.79]) for (const [m, k] of [[0.5, 20], [2, 5], [0.05, 100]]) {
  const r = freeRun({ m, k, g, x0: 0.1 }, 5 * TAU * Math.sqrt(m / k));
  near(r.T, TAU * Math.sqrt(m / k), 2e-8, 'düşey periyot'); near(r.xeq, (m * g) / k, 1e-12, 'denge'); near(r.mean, (m * g) / k, 1e-7, 'ölçülen denge');
}
// 3 · İntegratörler: kapalı büyüme çarpanları ve h/2 ikizi
{
  const m = 0.5, k = 20, w0 = Math.sqrt(k / m);
  for (const h of [1e-3, 5e-3, 2e-2]) {
    const z = w0 * h;
    const e = freeRun({ m, k, x0: 0.1 }, 2, 'euler', h); near(1 + e.drift, (1 + z * z) ** e.sim.steps, 1e-9, 'Euler enerji çarpanı');
    near(1 + e.drift, 1 + K.theory.drift('euler', z, e.sim.steps), 1e-9, 'sayfanın Euler beklentisi');
    const v = freeRun({ m, k, x0: 0.1 }, 20, 'verlet', h); ok(v.dMax <= 1e-12 && v.dMin >= -(z * z) / 4 * (1 + 1e-6) && v.dMin < -(z * z) / 4 * 0.98, `Verlet sınırı ${v.dMin} ${v.dMax}`);
    near((v.T - TAU / w0) / (TAU / w0), -(z * z) / 24, Math.max(2e-7, z ** 4), 'Verlet faz hatası');
  }
  const a = freeRun({ m, k, x0: 0.1 }, 20, 'rk4', 2e-2), b = freeRun({ m, k, x0: 0.1 }, 20, 'rk4', 1e-2);
  near(a.drift / b.drift, 32, 0.02, 'RK4 enerji kaybı h⁵ ile ölçeklenir (h/2 ikizi)');
  near(a.drift, -((w0 * 0.02) ** 6) / 72 * a.sim.steps, 0.01 * Math.abs(a.drift), 'RK4 adım başına (ω₀h)⁶/72');
  near(a.drift, K.theory.drift('rk4', w0 * 0.02, a.sim.steps), 1e-6 * Math.abs(a.drift) + 1e-12, 'sayfanın RK4 beklentisi');
  near((a.T - TAU / w0) / (TAU / w0), (w0 * 0.02) ** 4 / 120, 1e-7, 'RK4 faz hatası');
  const d = freeRun({ m, k, x0: 0.1 }, 20, 'rk4', 1e-3); ok(Math.abs(d.drift) < 1e-10, 'varsayılan adımda enerji sapması < 1e-10');
}
// 4 · Sönümlü: üç rejimde analitik çözüm, δ, T_d, Q, enerji kaybı
for (const [m, k] of [[0.5, 20], [2, 100], [0.1, 5]]) for (const zeta of [0.01, 0.05, 0.3, 0.9, 1, 1.5, 2.5]) {
  const bc = 2 * Math.sqrt(k * m), b = zeta * bc, w0 = Math.sqrt(k / m), T0 = TAU / w0, x0 = 0.1;
  const r = freeRun({ m, k, b, x0, ref: (t) => refFree(m, k, b, x0, t) }, 8 * T0);
  ok(r.errMax < 1e-9, `sönümlü x(t) ζ=${zeta} err=${r.errMax}`);
  if (zeta < 0.5) {
    const g = b / (2 * m), wd = Math.sqrt(w0 * w0 - g * g), pk = [{ t: 0, x: x0 }].concat(r.tr.peaks.filter((q) => q.max)), n = pk.length - 1;
    const del = Math.log(pk[0].x / pk[n].x) / n;
    near(r.T, TAU / wd, 1e-8, 'T_d'); near(del, (g * TAU) / wd, 1e-7, 'δ'); near(pk[n].t / n, TAU / wd, 1e-7, 'tepe aralığı');
    near(Math.sqrt(TAU * TAU + del * del) / (2 * del), Math.sqrt(k * m) / b, 1e-6, 'Q (ölçülen δ\'dan)');
    near(1 - (pk[1].x / pk[0].x) ** 2, 1 - Math.exp((-2 * g * TAU) / wd), 1e-7, 'bir turda enerji kaybı');
    if (zeta <= 0.01) near(1 - (pk[1].x / pk[0].x) ** 2, TAU / (Math.sqrt(k * m) / b), 0.07, '2π/Q yaklaşımı (Q = 50)');
  } else if (zeta >= 1) ok(r.tr.ups.length === 0 && r.tr.peaks.length === 0, 'kritik/aşırı: geçiş ve tepe yok');
}
ok(K.theory.bc(0.5, 20) === 2 * Math.sqrt(10) && Number.isNaN(K.theory.wd(0.5, 20, 2 * Math.sqrt(10))), 'kritik sınır');
// 5 · Dengeye dönüş: analitik çözümde kaba tarama + ikiye bölme ile bağımsız t₅%
{
  const m = 0.5, k = 20, x0 = 0.1, bc = 2 * Math.sqrt(k * m), T0 = TAU * Math.sqrt(m / k), times = {};
  for (const zeta of [0.2, 0.5, 0.69, 0.7, 1, 1.5, 2, 2.5]) {
    const b = zeta * bc, f = (t) => Math.abs(refFree(m, k, b, x0, t)) - 0.05 * x0;
    let last = 0; const dt = T0 / 4000;
    for (let t = dt; t < 40 * T0; t += dt) if (f(t - dt) > 0 && f(t) <= 0) { let lo = t - dt, hi = t; for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; if (f(mid) > 0) lo = mid; else hi = mid; } last = hi; }
    const r = K.runFree({ m, k, b, x0, h: T0 / 200, tEnd: 60 * T0 });
    near(r.settle, last, 2e-6, `t₅% ζ=${zeta}`); times[zeta] = r.settle;
    near(r.overshoot, zeta < 1 ? Math.exp((-Math.PI * zeta) / Math.sqrt(1 - zeta * zeta)) : 0, 1e-6, `aşma ζ=${zeta}`);
  }
  ok(times[1] < times[1.5] && times[1.5] < times[2] && times[2] < times[2.5], 'aşırı sönüm kritikten yavaş');
  ok(times[0.7] < times[1] && times[0.69] > times[0.7], '%5 bandında ζ = 0.70 kritikten hızlı, 0.69 banttan taşar');
  near(times[1] * Math.sqrt(k / m), 4.743864518, 1e-6, 'kritik: (1 + τ)e^(−τ) = 0.05 kökü');
  const best = K.fastestBand(0.05); ok(best.zeta === 0.7, `en hızlı ζ = ${best.zeta}`); near(best.t, times[0.7] * Math.sqrt(k / m), 1e-4, 'boyutsuz tarama');
  ok(K.runFree({ m, k, b: 0, x0, tEnd: 5 }).settle === null, 'sönümsüz: dönmez');
}
// 6 · Sürülen: geçici + kalıcı tam çözüm, kalıcı durum ölçümü, enerji dengesi
for (const [m, k] of [[0.5, 20], [0.1, 100], [2, 5]]) for (const zeta of [0.005, 0.05, 0.3]) for (const ratio of [0.2, 0.8, 1, 1.25, 2.5]) {
  const w0 = Math.sqrt(k / m), b = zeta * 2 * Math.sqrt(k * m), w = ratio * w0, F0 = 0.5;
  const sim = K.makeSim(K.makeModel({ m, k, b, F0, w }), 'rk4'); sim.set([0]);
  const L = K.makeLockin(w, F0, b), tEnd = Math.min(12 / (b / (2 * m)), 40 * (TAU / w0)) + 3 * (TAU / w);
  let err = 0, scale = 0;
  while (sim.t < tEnd) { const t0 = sim.t, x0 = sim.x[0], v0 = sim.v[0], a0 = sim.a[0]; sim.step(1e-3); L.push(t0, x0, v0, a0, sim.t, sim.x[0], sim.v[0], sim.a[0]); const xr = refDriven(m, k, b, F0, w, sim.t); err = Math.max(err, Math.abs(sim.x[0] - xr)); scale = Math.max(scale, Math.abs(xr)); }
  ok(err < 3e-6 * scale, `sürülen x(t) ζ=${zeta} r=${ratio} err=${err / scale}`);
  const ref = refSteady(m, k, b, F0, w), s = K.steady({ m, k, b, F0, w });
  near(s.A, ref.A, 2e-5, 'kalıcı genlik'); near(s.phi, ref.phi, 2e-5, 'faz');
  near(s.Pin, 0.5 * b * w * w * ref.A * ref.A, 2e-4, 'güç'); near(s.Pin, s.Pdis, 2e-4, 'enerji dengesi: sürücü işi = sönüm kaybı');
  near(s.Pin, 0.5 * F0 * w * ref.A * Math.sin(ref.phi), 2e-4, '½F₀ωA·sin φ');
  if (zeta >= 0.05) { near(L.last.A, ref.A, 2e-4, 'canlı genlik'); near(L.last.phi, ref.phi, 2e-4, 'canlı faz'); near(L.last.Pin, L.last.Pdis, 2e-3, 'canlı enerji dengesi'); }
}
ok((() => { try { K.steady({ m: 1, k: 1, b: 0, F0: 1, w: 1 }); return false; } catch (e) { return e.name === 'RangeError'; } })(), 'b = 0: kalıcı durum yok');
// 7 · Rezonans: ölçülen tepe, güç tepesi, yarı yükseklik genişliği
for (const zeta of [0.02, 0.05, 0.2, 0.5]) {
  const m = 0.5, k = 20, F0 = 0.5, w0 = Math.sqrt(k / m), b = zeta * 2 * Math.sqrt(k * m), f = (w) => K.steady({ m, k, b, F0, w });
  const wA = K.drain(K.goldenGen((w) => f(w).A, 0.3 * w0, 1.5 * w0, 1e-6 * w0));
  near(wA, Math.sqrt(w0 * w0 - (b * b) / (2 * m * m)), 3e-5, `genlik tepesi ζ=${zeta}`); ok(wA < w0, 'genlik tepesi ω₀\'ın altında');
  near(f(wA).A, F0 / (b * Math.sqrt(w0 * w0 - (b / (2 * m)) ** 2)), 2e-5, 'en büyük genlik');
  const wP = K.drain(K.goldenGen((w) => f(w).Pin, 0.5 * w0, 1.5 * w0, 1e-6 * w0)), Pmax = f(wP).Pin;
  near(wP, w0, 3e-5, 'güç tepesi tam ω₀'); near(Pmax, (F0 * F0) / (2 * b), 1e-4, 'en büyük güç');
  const half = (w) => f(w).Pin - Pmax / 2;
  const w1 = K.drain(K.bisectGen(half, 0.05 * w0, wP, 1e-7 * w0)), w2 = K.drain(K.bisectGen(half, 4 * w0, wP, 1e-7 * w0));
  near(w2 - w1, b / m, 2e-4, 'güç eğrisinin tam genişliği = b/m = ω₀/Q'); near(w1 * w2, w0 * w0, 2e-4, 'yarı güç noktalarının geometrik ortası ω₀');
}
ok(Number.isNaN(K.theory.wPeak(0.5, 20, 0.8 * 2 * Math.sqrt(10))), 'ζ ≥ 0.707: genlik tepesi yok');
{ const m = 0.5, k = 20, b = 0.8 * 2 * Math.sqrt(10); let prev = Infinity, mono = true; for (let r = 0.1; r <= 2.5; r += 0.1) { const A = K.steady({ m, k, b, F0: 0.5, w: r * Math.sqrt(k / m) }).A; if (A > prev) mono = false; prev = A; } ok(mono, 'ζ = 0.8: ölçülen genlik tekdüze azalır'); }
// 8 · Kütleli yay: bağımsız özdeğer çözümü (ters güç yinelemesi) ve sürekli yay kökü
function chainMode(m, ms, k, N) {
  const mass = Array(N).fill(ms / N); mass[N - 1] = m + ms / (2 * N); const ks = k * N;
  let y = Array.from({ length: N }, (_, i) => (i + 1) / N), lam = 0;
  for (let it = 0; it < 200; it++) { // K x = M y, üç köşegenli Thomas çözümü
    const d = Array.from({ length: N }, (_, i) => (i < N - 1 ? 2 * ks : ks)), rhs = y.map((v, i) => v * mass[i]), c = Array(N).fill(-ks);
    for (let i = 1; i < N; i++) { const w = -ks / d[i - 1]; d[i] -= w * c[i - 1]; rhs[i] -= w * rhs[i - 1]; }
    const x = Array(N); x[N - 1] = rhs[N - 1] / d[N - 1]; for (let i = N - 2; i >= 0; i--) x[i] = (rhs[i] - c[i] * x[i + 1]) / d[i];
    lam = y[N - 1] / x[N - 1]; y = x.map((v) => v / x[N - 1]);
  }
  return { w: Math.sqrt(lam), shape: y };
}
for (const [m, ms, k] of [[0.5, 0.15, 20], [0.5, 0.5, 20], [0.05, 0.5, 5], [2, 0.05, 100], [0.2, 0.3, 32.5]]) {
  const mode = chainMode(m, ms, k, 12), M = K.makeModel({ m, k, ms, N: 12, g: 9.81 }), xeq = K.equilibrium(M), acc = new Float64Array(12);
  K.accel(M, xeq, new Float64Array(12), 0, acc); ok(Math.max(...Array.from(acc, Math.abs)) < 1e-9, 'denge: bütün düğümlerde net kuvvet sıfır');
  near(xeq[11], ((m + ms / 2) * 9.81) / k, 1e-12, 'durgun uzama (m + m_s/2)g/k'); near(M.mass.reduce((a, b) => a + b, 0), m + ms * (1 - 1 / 24), 1e-12, 'toplam düğüm kütlesi');
  const pure = freeRun({ m, k, ms, g: 9.81, shape: mode.shape.map((v) => 0.05 * v) }, 6 * (TAU / mode.w));
  near(pure.T, TAU / mode.w, 1e-6, 'temel kipte başlatılan zincirin periyodu');
  let lo = 0, hi = Math.PI / 2; for (let i = 0; i < 100; i++) { const mid = (lo + hi) / 2; if (mid * Math.sin(mid) - (ms / m) * Math.cos(mid) < 0) lo = mid; else hi = mid; } const beta = (lo + hi) / 2; // β·sin β = (m_s/m)·cos β
  near(K.springBeta(ms / m), beta, 1e-10, 'β·tan β = m_s/m'); near(K.theory.TContinuum(m, k, ms), TAU / (beta * Math.sqrt(k / ms)), 1e-10, 'sürekli yay periyodu');
  near(TAU / mode.w, TAU / (beta * Math.sqrt(k / ms)), 1.2e-3, '12 parçalı zincir ≈ sürekli yay');
  const pulled = freeRun({ m, k, ms, g: 9.81, x0: 0.1 }, 41 * (TAU / mode.w));
  near(pulled.T, TAU / mode.w, 2.5e-3, 'uçtan çekilen zincir: 40 geçiş ortalaması'); near(pulled.mean, ((m + ms / 2) * 9.81) / k, 3e-4, 'zaman ortalaması denge');
  const TR = TAU * Math.sqrt((m + ms / 3) / k); ok(Math.abs(TR - TAU / mode.w) < Math.abs(TAU * Math.sqrt(m / k) - TAU / mode.w), 'm_s/3 düzeltmesi kütlesiz yaydan iyi');
}
// 9 · Gizli yay deneyi: sayfanın okuma çözünürlüğüyle (0.1 mm, 0.1 ms) iki bağımsız k kestirimi
for (const [kTrue, ms] of [[18.4, 0], [32.5, 0], [57, 0], [32.5, 0.15]]) {
  const rows = [0.2, 0.5, 1, 1.5].map((m) => { const r = freeRun({ m, k: kTrue, ms, g: 9.81, x0: 0.1 }, 12); return { m, ext: Math.round(r.mean * 1e4) / 1e4, T: Math.round(r.T * 1e4) / 1e4 }; });
  const hooke = K.fitLine(rows.map((q) => q.m), rows.map((q) => q.ext)), per = K.fitLine(rows.map((q) => q.m), rows.map((q) => q.T * q.T));
  near(9.81 / hooke.slope, kTrue, 2e-3, `Hooke k=${kTrue}`); near((4 * Math.PI ** 2) / per.slope, kTrue, ms ? 6e-3 : 2e-3, `periyot k=${kTrue}`);
  if (ms) { near(hooke.intercept / hooke.slope, ms / 2, 0.02, 'kesişim m_s/2'); near(per.intercept / per.slope, ms / 3, 0.12, 'kesişim ≈ m_s/3'); }
}
// 10 · Yardımcılar ve sınırlar
near(K.hermite(1, 2, 3, 4, 0), 1, 1e-15); near(K.hermite(1, 2, 3, 4, 1), 3, 1e-15);
{ const f = (s) => s ** 3 - 0.3, r = K.hermiteRoot(f(0), 0, f(1), 3); near(r, Math.cbrt(0.3), 1e-12, 'Hermite kökü (kübikte tam)'); near(K.hermiteInt(0, 0, 1, 3, 1), 0.25, 1e-14, 'Hermite integrali ∫s³'); }
{ const fit = K.fitLine([1, 2, 3, 4], [3, 5, 7, 9]); near(fit.slope, 2, 1e-14); near(fit.intercept, 1, 1e-13); }
for (const bad of [() => K.makeModel({ m: 0, k: 1 }), () => K.makeModel({ m: 1, k: -1 }), () => K.makeModel({ m: 1, k: 1, b: -1 }), () => K.makeModel({ m: NaN, k: 1 }), () => K.fitLine([1], [1]), () => K.fitLine([1, 1], [1, 2]), () => K.springBeta(0), () => K.runFree({ m: 1, k: 1, x0: 0, tEnd: 1 })]) {
  assert.throws(bad, (e) => e.name === 'RangeError'); checks++;
}
ok(!Object.getOwnPropertyDescriptor(context.window, 'YayKutleLab').writable, 'çekirdek salt okunur');
// 11 · Varsayılan durumların görünen başvuru sayıları
near(TAU * Math.sqrt(0.5 / 20), 0.99346, 1e-5); near(K.theory.T0(0.5, 20), 0.9934588, 1e-7);
{ const b = 0.05 * 2 * Math.sqrt(10), wd = Math.sqrt(40 - (b / 1) ** 2); near(b, 0.316228, 1e-6); near(TAU / wd, 0.99470, 1e-5); near(b / 1 * (TAU / wd), 0.31455, 1e-4); near(Math.sqrt(10) / b, 10, 1e-12);
  const s = refSteady(0.5, 20, b, 0.5, 0.8 * Math.sqrt(40)); near(s.A, 0.067791, 1e-5); near((s.phi * 180) / Math.PI, 12.5288, 1e-5); }
console.log(`G yay-kütle: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

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
      const page = await ctx.newPage(); page.setDefaultTimeout(6000);
      const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/yay-kutle.html`);
      const text = (id) => page.locator('#' + id).textContent();
      const has = async (id, part) => { const t = await text(id); assert(t.includes(part), `[${width}] #${id}: "${t}" içinde "${part}" yok`); checks++; };
      const waitHas = async (id, part, ms = 6000) => { await page.waitForFunction(([i, p]) => document.getElementById(i).textContent.includes(p), [id, part], { timeout: ms }); checks++; };
      const range = (id, v) => page.locator('#' + id).evaluate((e, val) => { e.value = val; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v));
      const clean = async (label) => {
        const bad = await page.evaluate(() => [...document.querySelectorAll('[role=tabpanel]:not([hidden]) td, [role=tabpanel]:not([hidden]) strong, [role=tabpanel]:not([hidden]) output, [role=tabpanel]:not([hidden]) .yk-status')].map((e) => e.textContent).filter((t) => /NaN|undefined|Infinity|null/.test(t)));
        assert.deepEqual(bad, [], `[${width}] ${label}`); checks++;
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `[${width}] yatay taşma: ${label}`); checks++;
      };
      // Erişilebilirlik: her denetimin etiketi, her tuvalin rolü ve adı
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll('.app-content input, .app-content select')].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      assert.equal(await page.evaluate(() => [...document.querySelectorAll('.app-content canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), true); checks++;
      assert.equal(await page.evaluate(() => Object.isFrozen(YayKutleLab) && /[̀-ͯ]/.test(document.querySelector('.app-content').textContent.normalize('NFD').replace(/[ÇçĞğİıÖöŞşÜüâî]/g, '').normalize('NFC')) === false), true); checks++;

      // 01 · Basit harmonik hareket
      await has('shmT0', '0.9935'); await has('shmMOut', '0.50 kg'); await has('shmKOut', '20 N/m'); await has('shmX0Out', '0.10 m');
      await waitHas('shmTmeas', '0.9935'); await has('shmT0d', '0.000 %'); await has('shmEq', '0 (yatay)');
      await range('shmX0', 0.3); await waitHas('shmTmeas', '0.9935'); await has('shmTot', '0.9000 J');
      await range('shmM', 2); await has('shmT0', '1.9869'); await range('shmM', 0.5);
      await page.selectOption('#shmOrient', 'dusey'); await has('shmEq', '0.2453'); await waitHas('shmTmeas', '0.9935'); await has('shmEqMeas', '0.2453'); await has('shmStatus', 'periyot yataydakiyle aynıdır');
      await page.selectOption('#shmG', '1.62'); await has('shmEq', '0.0405'); await has('shmStatus', 'sıkışıyor');
      await page.selectOption('#shmMethod', 'euler'); await page.waitForTimeout(700); await has('shmStatus', 'Açık Euler'); assert.match(await text('shmDriftd'), /^[+−]?0\.00 %$/); checks++;
      await page.selectOption('#shmMethod', 'verlet'); await page.selectOption('#shmH', '0.02'); await has('shmDriftExp', '−0.0040 … 0'); await has('shmStatus', 'Adım kaba');
      await page.check('#shmMsOn'); assert.equal(await page.locator('#shmMethod').isDisabled(), true); checks++; await has('shmTR', '1.0419'); await has('shmTC', '1.0428'); await has('shmStatus', '12 parçalı');
      await clean('kütleli yay');
      for (const id of ['shmM', 'shmK', 'shmX0', 'shmMs']) for (const end of ['min', 'max']) { await page.locator('#' + id).evaluate((e, w) => { e.value = e[w]; e.dispatchEvent(new Event('input', { bubbles: true })); }, end); await page.waitForTimeout(60); await clean(`${id} ${end}`); }
      await page.click('#shmReset'); await has('shmT0', '0.9935'); await has('shmEq', '0 (yatay)'); assert.equal(await page.locator('#shmMsOn').isChecked(), false); checks++;
      // Gizli yay
      await page.selectOption('#shmSpring', 'A'); await has('shmT0', 'gizli'); assert.equal(await page.locator('#shmOrient').isDisabled(), true); checks++;
      await page.click('#shmRecord'); await has('fitResult', 'Kayıt yapılmadı');
      for (const m of [0.2, 1]) { await range('shmM', m); await page.waitForFunction(() => +document.getElementById('shmN').textContent >= 2, null, { timeout: 8000 }); await page.click('#shmRecord'); }
      await has('fitResult', 'k = g/s = 18.4'); await has('fitResult', 'k = 4π²/s = 18.4'); await has('fitRows', '0.1066'); await has('fitRows', '0.5332');
      await page.click('#shmReveal'); await has('fitResult', 'Gerçek değer k = 18.4 N/m'); await has('shmT0', '1.4648'); await clean('gizli yay');
      await page.click('#shmClear'); await has('fitRows', 'Henüz ölçüm yok'); await has('shmT0', 'gizli');
      // Sürükleme
      await page.click('#shmReset');
      { await page.locator('#shmStage').scrollIntoViewIfNeeded(); const box = await page.locator('#shmStage').boundingBox(); await page.mouse.move(box.x + box.width * 0.54, box.y + box.height * 0.47); await page.mouse.down(); await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.47, { steps: 4 }); await waitHas('shmStatus', 'Bırakınca'); await page.mouse.up(); }
      assert.notEqual(await text('shmX0Out'), '0.10 m'); checks++; await waitHas('shmTmeas', '0.9935');

      // 02 · Sönümlü salınım
      await page.click('#tab-damp'); await has('dampZOut', '0.316 kg/s · ζ = 0.05'); await has('dampMark', '6.325'); await has('dampRegime', 'Az sönümlü');
      await has('dampTdT', '0.9947'); await has('dampDelT', '0.3146'); await has('dampQT', '10.000'); await has('dampLossT', '0.6283'); await has('dampLossX', '0.4669');
      await waitHas('dampDel', '0.3146'); await waitHas('dampTd', '0.9947'); await has('dampQ', '10.000'); await has('dampLoss', '0.4669');
      await has('raceRows', '0.750'); await has('raceRows', '0.459'); await has('raceRows', '1.812'); await has('raceRows', '85.4'); await has('dampStatus', 'ζ = 0.70'); await has('dampStatus', 'eşiğin hemen üstündedir'); await range('dampZ', 0.69); await has('raceRows', '0.693'); await range('dampZ', 0.05);
      await page.click('#dampCrit'); await has('dampRegime', 'Kritik'); await has('dampTdT', 'tanımsız'); await has('dampTd', 'tanımsız'); await has('dampQT', '0.500'); await has('dampLossT', 'tanımsız'); await has('dampStatus', 'Kritik sönüm');
      await page.click('#dampOver'); await has('dampRegime', 'Aşırı sönümlü'); await has('dampZOut', '12.649'); await has('dampStatus', 'yavaşlatır');
      await range('dampZ', 0); await has('dampRegime', 'Sönümsüz'); await has('raceRows', 'dönmez'); await has('dampQT', 'sonsuz');
      await range('dampZ', 0.95); await has('dampStatus', 'ölçülemez');
      for (const id of ['dampM', 'dampK', 'dampZ', 'dampX0']) for (const end of ['min', 'max']) { await page.locator('#' + id).evaluate((e, w) => { e.value = e[w]; e.dispatchEvent(new Event('input', { bubbles: true })); }, end); await page.waitForTimeout(60); await clean(`${id} ${end}`); }
      await page.click('#dampReset'); await has('dampZOut', 'ζ = 0.05'); await has('dampMOut', '0.50 kg'); await page.click('#dampUnder'); await has('dampRegime', 'Az sönümlü');

      // 03 · Zorlanma ve rezonans
      await page.click('#tab-drive'); await has('drvROut', '5.060 rad/s · 0.80 ω₀'); await has('drvZOut', '0.316 kg/s · ζ = 0.050 · Q = 10.0'); await has('drvAT', '0.0678'); await has('drvPhiT', '12.53'); await has('drvPT', '0.0186');
      await has('drvStatus', 'Geçici rejim'); await page.click('#drvSkip'); await has('drvA', '0.0678'); await has('drvPhi', '12.53'); await has('drvAD', '0.00 %'); await has('drvPinD', '0.00 %'); await has('drvPdisD', '0.00 %'); await has('drvStatus', 'Enerji dengesi');
      await page.click('#drvSweep'); await page.waitForFunction(() => /\d+ nokta/.test(document.getElementById('drvSweeps').textContent) && !/ölçülüyor|sürüyor/.test(document.getElementById('drvSweeps').textContent), null, { timeout: 30000 });
      await has('drvSweeps', '6.309'); await has('drvSweeps', '0.2503'); await has('drvSweeps', '6.325'); await has('drvSweeps', '0.3953'); await has('drvSweeps', '0.632'); await has('drvSweeps', 'yarı yükseklikteki tam genişliği');
      assert.equal(await page.locator('#drvSweeps').evaluate((e) => [...e.querySelectorAll('tbody td:last-child')].every((td) => td.textContent === '0.00 %')), true); checks++;
      await page.click('#drvRes'); await has('drvROut', '1.00 ω₀'); await has('drvPhiT', '90.00'); await has('drvAT', '0.2500'); await page.click('#drvSkip'); await has('drvPhi', '90.00'); await has('drvStatus', 'Tam ω₀');
      await page.click('#drvBeatBtn'); await has('drvZOut', 'Q = 100.0'); await has('drvBeatT', '9.936'); await has('drvBeat', 'bekleniyor');
      await page.click('#drvLow'); await has('drvROut', '0.30 ω₀'); await page.click('#drvHigh'); await has('drvROut', '2.00 ω₀'); await has('drvBeat', 'vuru yok'); await range('drvZ', 0.045); await range('drvR', 0.98); await page.click('#drvSkip'); await has('drvBeat', 'ölçülemedi');
      await range('drvZ', 0); assert.equal(await page.locator('#drvSweep').isDisabled(), true); checks++; await has('drvAT', 'kalıcı durum yok'); await has('drvStatus', 'b = 0');
      await range('drvR', 1); await has('drvStatus', 'doğrusal büyür');
      await range('drvZ', 0.8); await range('drvR', 0.8); await page.click('#drvSweep'); await page.waitForFunction(() => /tepe yok/.test(document.getElementById('drvSweeps').textContent) && !/ölçülüyor|sürüyor/.test(document.getElementById('drvSweeps').textContent), null, { timeout: 30000 }); checks++;
      assert.equal(await page.locator('#drvSweeps table').count(), 2); checks++;
      await range('drvF', 1); assert.equal(await page.locator('#drvSweeps table').count(), 0); checks++;
      for (const id of ['drvM', 'drvK', 'drvZ', 'drvF', 'drvR']) for (const end of ['min', 'max']) { await page.locator('#' + id).evaluate((e, w) => { e.value = e[w]; e.dispatchEvent(new Event('input', { bubbles: true })); }, end); await page.waitForTimeout(60); await clean(`${id} ${end}`); }
      await page.click('#drvReset'); await has('drvROut', '0.80 ω₀'); await has('drvFOut', '0.5 N');

      // Klavye: sekmeler, Boşluk, R
      await page.locator('#tab-drive').focus(); await page.keyboard.press('Home'); assert.equal(await page.locator('#tab-shm').getAttribute('aria-selected'), 'true'); checks++;
      await page.keyboard.press('ArrowRight'); assert.equal(await page.locator('#tab-damp').getAttribute('aria-selected'), 'true'); checks++;
      await page.keyboard.press('End'); assert.equal(await page.locator('#tab-drive').getAttribute('aria-selected'), 'true'); checks++;
      await page.keyboard.press('ArrowRight'); assert.equal(await page.locator('#tab-shm').getAttribute('aria-selected'), 'true'); checks++;
      assert.equal(await page.locator('#panel-damp').isHidden(), true); checks++;
      await page.locator('h1').click(); await range('shmM', 1); await page.keyboard.press('r'); await has('shmMOut', '0.50 kg');
      await page.keyboard.press('Space'); await has('shmToggle', 'Devam et'); const tA = await text('shmT'); await page.waitForTimeout(300); assert.equal(await text('shmT'), tA); checks++;
      await page.keyboard.press('Space'); await has('shmToggle', 'Duraklat');
      await page.locator('#shmM').focus(); await page.keyboard.press('r'); await has('shmToggle', 'Duraklat');
      await clean('son'); assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      await ctx.close();
    }
    console.log(`G yay-kütle: ${checks - before} arayüz kontrolü (390 px açık + 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
