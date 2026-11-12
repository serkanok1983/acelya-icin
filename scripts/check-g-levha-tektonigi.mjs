// levha-tektonigi: independent checks of the frozen TectonicsLab kernel.
// References do not reuse the page's formulas: erfc-profile quadrature for the cooling constant,
// line-dipole quadrature for magnetic anomalies, exact layered pressure sums for isostasy,
// a vector-algebra great-circle distance, forward-Euler / tiny-step integrators, Monte Carlo coverage,
// and values from the sources the builder opened (GTS2020 bases, Wikipedia isostasy ratios).
// Usage: node scripts/check-g-levha-tektonigi.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';

const html = fs.readFileSync(new URL('../levha-tektonigi.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'Kernel boundaries are required');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.TectonicsLab;
assert(K && Object.isFrozen(K), 'TectonicsLab must be a frozen object');
let checks = 0;
const near = (a, b, tol = 1e-9, msg = '') => { assert(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${msg} ${a} ≠ ${b}`); checks++; };
const ok = (cond, msg) => { assert(cond, msg); checks++; };
const simpson = (f, a, b, n = 400) => { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; };

/* ── statistics helpers ── */
for (const [dof, t] of [[2, 4.303], [4, 2.776], [10, 2.228], [22, 2.074], [30, 2.042], [60, 2.000], [120, 1.980]]) near(K.tCrit(dof), t, 2e-3, 't95');
{
  const r = K.rng(7), x = [], y = [];
  for (let i = 0; i < 40; i++) { x.push(10 * r()); y.push(3 - 2 * x[i] + K.gauss(r)); }
  // Normal equations by Cramer's rule
  const n = x.length, Sx = x.reduce((a, b) => a + b), Sy = y.reduce((a, b) => a + b), Sxx = x.reduce((a, b) => a + b * b, 0), Sxy = x.reduce((a, v, i) => a + v * y[i], 0);
  const det = n * Sxx - Sx * Sx, b = (n * Sxy - Sx * Sy) / det, a = (Sy * Sxx - Sx * Sxy) / det, f = K.linfit(x, y);
  near(f.slope, b, 1e-10); near(f.intercept, a, 1e-10);
  const sse = x.reduce((s, v, i) => s + (y[i] - a - b * v) ** 2, 0); near(f.seSlope, Math.sqrt(sse / (n - 2) / (Sxx - Sx * Sx / n)), 1e-10);
  const z = K.linfit([1, 2, 3, 4], [5, 7, 9, 11]); near(z.slope, 2); near(z.intercept, 3); near(z.r2, 1);
  const m = [], q = []; for (let i = 0; i < 1000; i++) { m.push(K.gauss(r)); } const mean = m.reduce((s, v) => s + v) / 1000, sd = Math.sqrt(m.reduce((s, v) => s + (v - mean) ** 2, 0) / 999);
  ok(Math.abs(mean) < 0.1 && Math.abs(sd - 1) < 0.08, 'gauss moments');
  const p = [1, 4, 2, 8, 5], qq = p.map(v => -3 * v + 1); near(K.pearson(p, p), 1); near(K.pearson(p, qq), -1); void q;
}

/* ── 01 · cooling constant from an erfc temperature profile (independent quadrature) ── */
const erfc = (x) => 1 - (2 / Math.sqrt(Math.PI)) * simpson((u) => Math.exp(-u * u), 0, x, 200);
for (const [ocean, T1] of [['atlantic', 1220], ['pacific', 1120]]) {
  const { rhoM, rhoW, alpha, kappa } = K.CONST, t = 3.15576e13; // 1 Ma in s
  const L = 2 * Math.sqrt(kappa * t);
  // subsidence = rhoM*alpha/(rhoM-rhoW) * integral of temperature deficit T1*erfc(z/L) over depth
  const deficit = simpson((z) => T1 * erfc(z / L), 0, 12 * L, 600);
  const w = rhoM * alpha / (rhoM - rhoW) * deficit;
  near(K.halfSpaceC(T1), w, 2e-5, 'half-space c');
  const src = K.CONST.cSource[ocean];
  ok(Math.abs(K.halfSpaceC(T1) - src) / src < 0.06, `c within 6 % of source ${src}`);
}
near(K.depthPlate(0), 3200); near(K.depthPlate(1e6), 6400);
// Plate model is shallower than the half-space model at 100 Ma and they agree within ~40 m near 10 Ma
{ const c = K.halfSpaceC(1220); ok(K.depthHS(100, c) - K.depthPlate(100) > 500, 'models diverge at old ages'); ok(Math.abs(K.depthHS(10, c) - K.depthPlate(10)) < 400, 'models close at young ages'); }

/* ── 01 · spreading: exact recovery without noise, unbiased with noise, CI coverage ── */
for (const u of [2.5, 7, 12.5, 70, 100]) for (const ocean of ['atlantic', 'pacific']) {
  const r = K.spreading({ u, ocean, tMax: 20, n: 12, sigT: 0, sigD: 0, seed: 3 });
  near(r.uMeas, u, 1e-9); near(r.ageFit.intercept, 0, 1e-9); near(r.depthFit.slope, K.halfSpaceC(ocean === 'atlantic' ? 1220 : 1120), 1e-9); near(r.depthFit.intercept, 2500, 1e-9);
  near(r.full, 2 * u); near(r.xMax, u * 20);
  for (const s of r.samples) { near(Math.abs(s.x), u * s.tTrue, 1e-12); ok(s.tTrue >= 2 - 1e-12 && s.tTrue <= 20, 'age window'); }
}
{
  let cover = 0, sum = 0, inv = 0; const N = 400;
  for (let s = 1; s <= N; s++) { const r = K.spreading({ u: 12.5, tMax: 20, n: 24, sigT: 0.3, sigD: 100, seed: s }); sum += r.uMeas; if (Math.abs(r.uMeas - 12.5) <= r.uCI) cover++; }
  ok(Math.abs(sum / N - 12.5) < 0.05, 'mean measured rate unbiased');
  ok(cover / N > 0.91 && cover / N < 0.99, `95 % CI coverage ${cover / N}`);
  // Attenuation: |x| on noisy age shrinks by var(t)/(var(t)+sigma^2); ages uniform on [1,10] → var = 81*0.9^2/12... use sampled
  let shrinkSum = 0; for (let s = 1; s <= N; s++) { const r = K.spreading({ u: 20, tMax: 10, n: 40, sigT: 1.5, sigD: 0, seed: s }); inv += r.uInverse; shrinkSum += r.uMeas; }
  const varT = (9 ** 2) / 12, expected = 20 * varT / (varT + 2.25);
  ok(Math.abs(inv / N - expected) / expected < 0.03, `inverse fit attenuated to ${inv / N} (expected ${expected})`);
  ok(Math.abs(shrinkSum / N - 20) / 20 < 0.03, 'age-on-distance fit stays near the true rate');
}
assert.throws(() => K.spreading({ u: 0, tMax: 20, n: 10, sigT: 0, sigD: 0, seed: 1 })); checks++;

/* ── 02 · GPTS against the bases copied from the source table ── */
const SRC = [0.773, 1.008, 1.076, 1.189, 1.221, 1.775, 1.934, 2.120, 2.155, 2.610, 3.032, 3.116, 3.207, 3.330, 3.596, 4.187, 4.300, 4.493, 4.631, 4.799, 4.896, 4.997, 5.235, 6.023];
assert.equal(K.GPTS.length, SRC.length); checks++;
K.GPTS.forEach(([b, p], i) => { near(b, SRC[i], 0); assert.equal(p, i % 2 ? -1 : 1); checks++; });
assert.equal(K.polarityAt(0.5), 1); assert.equal(K.polarityAt(1.05), 1); assert.equal(K.polarityAt(1.2), 1); assert.equal(K.polarityAt(1.5), -1); assert.equal(K.polarityAt(7), 0); checks += 5;

/* ── 02 · anomaly vs brute-force line-dipole quadrature ── */
// Vertical 2-D line dipole below the observer: B_z = (mu0 M / 2pi) (z^2 - x^2)/(x^2 + z^2)^2 per unit area; 200·M nT carries mu0/2pi.
function brute(x, ivals, z1, th, M) {
  let s = 0; for (const [a, b, p] of ivals) s += p * simpson((zz) => simpson((xp) => { const dx = xp - x; return (zz * zz - dx * dx) / (dx * dx + zz * zz) ** 2; }, a, b, 2000), z1, z1 + th, 40);
  return 200 * M * s;
}
for (const iv of [[[-5, 5, 1]], [[-12, -3, -1], [-3, 4, 1], [4, 20, -1]], [[0, 0.8, 1]]]) for (const x of [-7, 0, 2.5, 11]) for (const z1 of [1, 3]) near(K.anomaly([x], iv, z1)[0], brute(x, iv, z1, 0.5, 5), 2e-4, 'dipole quadrature');
{ const a = K.anomaly([0], [[-1e6, 1e6, 1]], 3)[0]; ok(Math.abs(a) < 1e-3, 'infinite slab has no external field'); }
ok(K.anomaly([0], [[-5, 5, 1]], 3)[0] > 0 && K.anomaly([0], [[-5, 5, -1]], 3)[0] < 0, 'normal block positive, reversed negative');

/* ── 02 · crust age, generic boundaries, scans ── */
for (const u of [5, 25, 80]) {
  const sym = K.intervalsSym(u, u, -6.5 * u, 6.5 * u), gen = K.intervalsGeneric((x) => K.crustAge(x, { mode: 'sym', u }), -6.5 * u, 6.5 * u);
  const edges = (L) => L.flatMap(([a, b]) => [a, b]).sort((p, q) => p - q);
  // generic merges the two Brunhes halves; compare distinct edges
  const uniq = (e) => e.filter((v, i) => i === 0 || Math.abs(v - e[i - 1]) > 1e-6);
  const es = uniq(edges(sym)).filter((v) => Math.abs(v) > 1e-9), eg = uniq(edges(gen));
  assert.equal(es.length, eg.length); checks++;
  es.forEach((v, i) => near(eg[i], v, 1e-6, 'boundary'));
  for (const t of SRC.slice(0, 23)) near(es.filter((v) => v > 0).find((v) => Math.abs(v - u * t) < 1e-6) ?? NaN, u * t, 1e-9, 'x = u t');
}
{
  // Ridge jump: count left/right length of crust whose age lies in (tj, tj+dtJ)
  const cfg = { mode: 'jump', u: 20, tj: 1.5, dtJ: 0.5 }; let left = 0, right = 0; const h = 0.001;
  for (let x = -150; x <= 150; x += h) { const t = K.crustAge(x, cfg); if (t > 1.5 && t < 2.0) { if (x < 0) left += h; else right += h; } }
  near(left, 2 * 20 * 0.5, 2e-3, 'left flank repeats'); near(right, 0, 1e-9, 'right flank misses');
  const a = { mode: 'asym', u: 20, asym: 0.2 }; near(K.crustAge(24, a), 1); near(K.crustAge(-16, a), 1);
}
for (const [mode, extra, L, R] of [['sym', {}, 25, 25], ['asym', { asym: 0.1 }, 22.5, 27.5], ['sym', {}, 12.5, 12.5], ['sym', {}, 60, 60]]) {
  const prof = K.magneticProfile({ mode, u: L === R ? L : 25, ...extra, z1: 3, noise: 0, seed: 1 }), sc = K.scanRates(prof);
  near(sc.best.left.u, L, 4e-3, 'left flank rate'); near(sc.best.right.u, R, 4e-3, 'right flank rate'); ok(sc.best.left.r > 0.999, 'noise-free r');
}
{ const prof = K.magneticProfile({ mode: 'jump', u: 25, tj: 1.5, dtJ: 0.5, z1: 3, noise: 0, seed: 1 }), sc = K.scanRates(prof); ok(sc.best.all.r < 0.9, 'symmetric model cannot fit a ridge jump'); }

/* ── 03 · great circles, chain geometry, recovery ── */
const vec = (la, lo) => [Math.cos(la * Math.PI / 180) * Math.cos(lo * Math.PI / 180), Math.cos(la * Math.PI / 180) * Math.sin(lo * Math.PI / 180), Math.sin(la * Math.PI / 180)];
for (const [a, b] of [[[19.417, -155.283], [28.2, -177.35]], [[32.67, 172.27], [51.483, 167.6]], [[0, 0], [0, 90]], [[10, 20], [-30, 140]]]) {
  const u = vec(...a), v = vec(...b), cross = Math.hypot(u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]), dot = u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  near(K.haversine(...a, ...b), 6371 * Math.atan2(cross, dot), 1e-9, 'haversine');
  // bearing via local east/north basis
  const [la, lo] = a.map((d) => d * Math.PI / 180), E = [-Math.sin(lo), Math.cos(lo), 0], Nn = [-Math.sin(la) * Math.cos(lo), -Math.sin(la) * Math.sin(lo), Math.cos(la)], d = v.map((c, i) => c - dot * u[i]);
  const brg = (Math.atan2(d[0] * E[0] + d[1] * E[1] + d[2] * E[2], d[0] * Nn[0] + d[1] * Nn[1] + d[2] * Nn[2]) * 180 / Math.PI + 360) % 360; near(K.bearing(...a, ...b), brg, 1e-9, 'bearing');
}
near(K.haversine(0, 0, 0, 90), 6371 * Math.PI / 2, 1e-12);
for (const p of [{ v1: 8.5, az1: 300, bend: true, tb: 47, v2: 5.5, az2: 350 }, { v1: 4, az1: 10, bend: true, tb: 20, v2: 9, az2: 250 }, { v1: 6, az1: 120, bend: false }]) {
  const r = K.hotspotChain({ ...p, tb: p.tb ?? 47, v2: p.v2 ?? 5, az2: p.az2 ?? 0, dt: 2, tMax: 80, sig: 0, seed: 1 });
  near(r.fit1.v, p.v1, 1e-9); near(((r.fit1.az - p.az1 + 540) % 360) - 180, 0, 1e-7, 'az1');
  if (p.bend) { near(r.fit2.v, p.v2, 1e-9); near(((r.fit2.az - p.az2 + 540) % 360) - 180, 0, 1e-7, 'az2'); const d = Math.abs(((p.az1 - p.az2 + 540) % 360) - 180); near(r.bendMeas, 180 - d, 1e-6); }
  else { assert.equal(r.fit2, null); checks++; }
  // Path length along the chain equals speed × time summed piecewise
  for (const isl of r.islands) near(isl.s, 10 * (p.bend && isl.age > p.tb ? p.v1 * p.tb + p.v2 * (isl.age - p.tb) : p.v1 * isl.age), 1e-9);
  // Straight-line distance never exceeds path length
  for (const isl of r.islands) ok(Math.hypot(isl.x, isl.y) <= isl.s + 1e-9, 'chord ≤ path');
}
{
  let cover = 0, sum = 0; const N = 300;
  for (let s = 1; s <= N; s++) { const r = K.hotspotChain({ v1: 8.5, az1: 300, bend: true, tb: 47, v2: 5.5, az2: 350, dt: 3, tMax: 80, sig: 1, seed: s }); sum += r.fit1.v; if (Math.abs(r.fit1.v - 8.5) <= r.fit1.ci) cover++; }
  ok(Math.abs(sum / N - 8.5) < 0.05, 'hotspot speed unbiased'); ok(cover / N > 0.9 && cover / N < 0.99, `hotspot CI coverage ${cover / N}`);
}
{
  const h = K.hawaiiChain(), mid = h.points.find((p) => p.name === 'Midway');
  near(mid.s, K.haversine(19.417, -155.283, 28.2, -177.35), 1e-12); ok(Math.abs(mid.s - 2443) < 1, 'Midway ≈ 2443 km');
  ok(h.fit1.v > 5 && h.fit1.v < 10, 'Hawaiian segment within the source range 5–10 cm/yr');
  ok(h.bendMeas > 100 && h.bendMeas < 140, 'bend near the sourced ≈120°');
  // bend measured at the vertex: independent unit-vector geodesy + principal axis in an azimuthal-equidistant frame
  {
    const R = Math.PI / 180, uv = (la, lo) => [Math.cos(la * R) * Math.cos(lo * R), Math.cos(la * R) * Math.sin(lo * R), Math.sin(la * R)];
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], cr = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]], nrm = (a) => Math.hypot(...a);
    const frame = (o) => { const e = cr([0, 0, 1], o), ee = e.map((v) => v / nrm(e)); return { e: ee, n: cr(o, ee) }; };
    const azAt = (o, p) => { const f = frame(o), t = p.map((v, i) => v - dot(o, p) * o[i]); return (Math.atan2(dot(t, f.e), dot(t, f.n)) / R + 360) % 360; };
    const proj = (o, p) => { const d = Math.atan2(nrm(cr(o, p)), dot(o, p)), a = azAt(o, p) * R; return [d * Math.sin(a), d * Math.cos(a)]; };
    const axis = (o, list) => { const P = list.map((q) => proj(o, uv(q.lat, q.lon))), mx = P.reduce((s, q) => s + q[0], 0) / P.length, my = P.reduce((s, q) => s + q[1], 0) / P.length; let a = 0, b = 0, c = 0; for (const [x, y] of P) { a += (x - mx) ** 2; b += (x - mx) * (y - my); c += (y - my) ** 2; } const th = 0.5 * Math.atan2(2 * b, a - c); let v = [Math.cos(th), Math.sin(th)]; const o2 = list.slice().sort((p, q) => p.age - q.age), A = proj(o, uv(o2[0].lat, o2[0].lon)), B = proj(o, uv(o2.at(-1).lat, o2.at(-1).lon)); if (v[0] * (B[0] - A[0]) + v[1] * (B[1] - A[1]) < 0) v = v.map((z) => -z); return (Math.atan2(v[0], v[1]) / R + 360) % 360; };
    const Vx = h.points.find((p) => p.vertex), O = uv(Vx.lat, Vx.lon), g1 = h.points.filter((p) => p.seg === 1), g2 = h.points.filter((p) => p.seg === 2 || p.vertex);
    const a1 = axis(O, g1), a2 = axis(O, g2), ang = (x, y) => { let d = Math.abs(x - y) % 360; if (d > 180) d = 360 - d; return 180 - d; };
    near(h.azVertex, a1, 1e-7, 'Hawaiian azimuth at the vertex'); near(h.fit2.az, a2, 1e-7, 'Emperor azimuth at the vertex'); near(h.bendMeas, ang(a1, a2), 1e-7, 'vertex-frame bend');
    ok(Math.abs(h.bendMeas - 115.3) < 0.05, 'vertex bend ≈ 115.3°'); ok(Math.abs(h.bendMixed - 130.0) < 0.05, 'mixed-frame angle ≈ 130.0°'); ok(Math.abs(h.fit1.az - h.azVertex) > 10, 'bearing turns along the chain');
    const K0 = uv(g1[0].lat, g1[0].lon), last = g2.reduce((a, p) => (p.age > a.age ? p : a));
    near(h.chordBend, ang((azAt(O, K0) + 180) % 360, azAt(O, uv(last.lat, last.lon))), 1e-7, 'chord bend'); ok(Math.abs(h.chordBend - 120) < 1, 'chord bend ≈ source 120°');
  }
  near(h.points.find((p) => p.name === 'Detroit').s, mid.s * 0 + K.haversine(19.417, -155.283, 32.67, 172.27) + K.haversine(32.67, 172.27, 51.483, 167.6), 1e-12);
}

/* ── 04 · isostasy against exact layered pressure ── */
const exactP = (layers, D) => layers.reduce((s, [a, b, r]) => s + r * Math.max(0, Math.min(b, D) - Math.max(a, Math.min(0, a))), 0);
for (const h of [-6, -4, -1, 0.5, 4, 8.8]) for (const [rc, rm] of [[2750, 3300], [2600, 3200], [2900, 3100]]) {
  const H0 = 40, a = K.airy({ h, rc, rm, H0 }); if (!a.valid) continue;
  const D = 400, col = h >= 0 ? [[-h, H0 + a.root, rc], [H0 + a.root, D, rm]] : [[0, -h, 1000], [-h, H0 + a.root, rc], [H0 + a.root, D, rm]];
  near(exactP(col, D), exactP([[0, H0, rc], [H0, D, rm]], D), 1e-12, 'Airy pressure balance');
  const n = K.airyNumeric({ h, rc, rm, H0 }); ok(Math.abs(n.root - a.root) < 0.006, `numeric root within one slice (${n.root} vs ${a.root})`);
}
near(K.airy({ h: 1 }).ratio, 5, 1e-12, 'source: root ≈ 5 h'); ok(Math.abs(K.airy({ h: -1 }).ratio - 3.2) < 0.02, 'source: ocean ≈ 3.2 w');
for (const h of [-5, 0, 3, 9]) for (const D of [50, 100, 200]) { const p = K.pratt({ h, D }); near(exactP(h >= 0 ? [[-h, D, p.rho]] : [[0, -h, 1000], [-h, D, p.rho]], D), 2750 * D, 1e-12, 'Pratt balance'); near(K.prattNumeric({ h, D }).rho, p.rho, 1e-4); }
{
  const c = { L: 10, rb: 917, rf: 1000, zeta: 0.2 }, T0 = K.floatPeriod(c); let st = { z: 0, v: 0, t: 0 };
  for (let i = 0; i < 200 * 60; i++) st = K.floatStep(st, T0 / 200, c);
  near(st.z, 9.17, 1e-6, 'block settles at Archimedes draft'); near(K.floatEq(c).draft, 9.17, 1e-12);
  // Independent semi-implicit Euler with tiny steps over the first period
  const w0 = 2 * Math.PI / T0; let z = 0, v = 0, t = 0; const h = T0 / 200000; st = { z: 0, v: 0, t: 0 };
  for (let i = 0; i < 200; i++) st = K.floatStep(st, T0 / 200, c);
  while (t < T0 - 1e-12) { const a = 9.81 * (917 * 10 - 1000 * Math.max(0, Math.min(10, z))) / (917 * 10) - 2 * 0.2 * w0 * v; v += a * h; z += v * h; t += h; }
  near(st.z, z, 2e-4, 'RK4 vs tiny-step Euler'); assert.equal(K.floatEq({ L: 1, rb: 3300, rf: 1000 }).floats, false); checks++;
  near(K.floatEq({ L: 40, rb: 2750, rf: 3300 }).draft / 40, 2750 / 3300, 1e-12);
}
{
  const w0 = K.iceEq({ Hi: 3000 }); near(w0, 3000 * 917 / 3300, 1e-12);
  for (const dir of ['unload', 'load']) for (const t of [0, 1234, 10000, 20000]) {
    let w = dir === 'unload' ? w0 : 0; const h = 0.5; for (let s = 0; s < t; s += h) w += -(w - (dir === 'unload' ? 0 : w0)) / 4000 * h;
    near(K.iceIntegrate(t, { w0, tau: 4000, dir }), w, 1e-3, 'ice RK4 vs Euler'); near(K.iceIntegrate(t, { w0, tau: 4000, dir }), dir === 'unload' ? w0 * Math.exp(-t / 4000) : w0 * (1 - Math.exp(-t / 4000)), 1e-9);
  }
  const sh = K.shorelines({ w0, tau: 4000, tNow: 10000, sig: 0, seed: 1 }), f = K.fitTau(sh, 10000); near(f.tau, 4000, 1e-5); near(f.w0, w0, 1e-5);
  let ts = 0; for (let s = 1; s <= 100; s++) ts += K.fitTau(K.shorelines({ w0, tau: 4000, tNow: 10000, sig: 3, seed: s }), 10000).tau; ok(Math.abs(ts / 100 - 4000) < 40, 'tau estimator nearly unbiased');
}
console.log(`levha-tektonigi: ${checks} bağımsız çekirdek kontrolü PASS`);

/* ── browser ── */
if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright');
  const { createServer } = await import('node:http');
  const { join, extname } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  let browser; const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [['light', 390], ['dark', 1280]]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      page.setDefaultTimeout(8000);
      const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); }); page.on('requestfailed', (q) => errors.push('requestfailed ' + q.url())); page.on('response', (q) => { if (q.status() >= 400) errors.push(q.status() + ' ' + q.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/levha-tektonigi.html`);
      const read = (id) => page.locator('#' + id).textContent();
      const has = async (id, t) => { const v = await read(id); assert(v.includes(t), `${id}: "${v}" lacks "${t}"`); checks++; };
      const until = async (id, t, ms = 15000) => { await page.waitForFunction(([i, s]) => document.getElementById(i).textContent.includes(s), [id, t], { timeout: ms }); checks++; };
      const range = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v);
      // every control has a label
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll('main input, main select')].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      // 01 defaults
      await has('s1UMeas', '12.81 ± 0.39 mm/yıl'); await has('s1UDiff', '+2.51 %'); await has('s1C', '429.7 ± 48.2'); await has('s1CTheo', '397.0'); await has('s1D0', '2407 ± 157 m'); await has('s1Plate', '203 m');
      await range('s1SigT', 1.5); await range('s1TMax', 10); await range('s1N', 60); await has('s1Inverse', '8.62 mm/yıl (−31.06 %)'); await has('s1Status', 'kurulan hızdan %31.1 düşük'); await has('s1Status', 'yaklaşık %30.2'); await page.click('#s1Reset'); await range('s1SigT', 0); await range('s1SigD', 0); await has('s1UMeas', '12.50 ± 0.00'); await has('s1Status', 'Gürültüsüz');
      await page.click('#s1Fast'); await has('s1UTrue', '70.0 mm/yıl'); await has('s1CTheo', '364.4'); await page.click('#s1Ultra'); await has('s1UTrue', '7.0 mm/yıl');
      await range('s1TMax', 120); await has('s1Status', 'plaka modeline daha yakındır'); await range('s1U', 100); await range('s1N', 6); await has('s1XMax', '12000 km');
      await page.click('#s1Reset'); await has('s1UMeas', '12.81 ± 0.39');
      // 02
      await page.click('#tab-mag'); await until('m2Best', 'r = 0.985'); await has('m2Best', '25.01 mm/yıl'); await has('m2RTrial', '0.003'); await has('m2Width', '0.80 km');
      await page.click('#m2Match'); await has('m2TrialOut', '25.0 mm/yıl'); await has('m2RTrial', '0.98');
      await page.locator('#m2Mode').selectOption('asym'); await until('m2Left', '22.50'); await has('m2Right', '27.49'); await has('m2Status', 'Asimetrik');
      await page.locator('#m2Mode').selectOption('jump'); await until('m2Status', 'Sırt sıçraması');
      await page.click('#m2Mystery'); await has('m2True', 'gizli'); await has('m2UOut', 'gizli'); eq(await page.locator('#m2U').isDisabled(), true);
      await page.click('#m2Reset'); await until('m2Best', '25.01'); eq(await page.locator('#m2U').isDisabled(), false);
      await range('m2Z', 1); await range('m2Noise', 0); await until('m2Status', 'dar'); await range('m2U', 60); await until('m2Status', 'ayrı tepe olarak seçilebilirler'); await until('m2Best', '60.0');
      await page.click('#m2Reset');
      // 03
      await page.click('#tab-hot'); await has('h3V1Meas', '8.67 ± 0.36 cm/yıl'); await has('h3V2Meas', '5.23 ± 0.25'); await has('h3BendMeas', '130.0°'); await has('h3V1Set', '+1.99 %');
      await page.click('#h3Straight'); await has('h3V2Meas', 'yaşlı parça yok'); await has('h3BendSet', 'büküm yok');
      await range('h3Sig', 0); await has('h3V1Meas', '8.50 ± 0.00');
      await page.click('#h3Reset'); await page.locator('#h3Data').selectOption('hawaii'); await has('h3V1Meas', '8.59 ± 0.86'); await has('h3V2Meas', '5.53 ± 1.61'); await has('h3BendMeas', '115.3°'); await has('h3BendSet', '120°'); await has('h3BendSet', '−3.9 %'); await has('h3Az1Meas', '298.4°');
      eq(await page.locator('#h3Rows tr').count(), 17); await has('h3Status', '43.4–85 Ma; 4 nokta'); await has('h3Status', '0–43.4 Ma; 14 nokta'); await has('h3Status', 'açı 115.3°'); await has('h3Status', '130.0° gibi yanlış'); await has('h3Status', 'açı 119.4° çıkar'); await page.waitForFunction(() => window.ACELYA_DIGEST && window.ACELYA_DIGEST['levha-tektonigi'], null, { timeout: 5000 }); checks++;
      await page.locator('#h3Data').selectOption('sim'); await page.click('#h3Play'); await page.waitForTimeout(600); await has('h3Time', 'Ma önce'); await page.locator('body').click({ position: { x: 5, y: 5 } }); await page.keyboard.press('Space'); const t1 = await read('h3Time'); await page.waitForTimeout(400); eq(await read('h3Time'), t1);
      await page.keyboard.press('r'); await has('h3Time', 'bugün');
      // 04
      await page.click('#tab-iso'); await has('i4A', '20.000 km'); await has('i4B', '19.998 km'); await has('i4D', '5.000'); await has('i4E', '64.00 km');
      await page.click('#i4POcean'); await has('i4A', '−12.727 km'); await page.click('#i4PHigh'); await has('i4A', '40.000 km');
      await page.locator('#i4Model').selectOption('pratt'); await page.click('#i4Reset'); await page.locator('#i4Model').selectOption('pratt'); await has('i4A', '2644.2 kg/m³'); await has('i4C', '0.00 kg/m³');
      await page.locator('#i4Model').selectOption('block'); await range('i4Zeta', 1); await until('i4B', '9.169', 20000); await has('i4A', '9.170 m'); await has('i4D', '0.830 m (8.3 %)');
      await range('i4Rb', 2750); await range('i4Rf', 3300); await until('i4B', '8.33', 20000); await range('i4Rb', 3300); await range('i4Rf', 1000); await has('i4B', 'batar'); await has('i4Status', 'batar');
      await page.locator('#i4Model').selectOption('ice'); await has('i4A', '833.6 m'); await has('i4B', '765.21 m'); await has('i4E', '3974 yıl · 836 m'); await has('i4D', '17.11 mm/yıl');
      await range('i4T', 0); await has('i4E', '—'); await has('i4Status', 'τ ölçülemez'); await range('i4T', 1000); await has('i4Status', 'güvenilmez');
      await page.locator('#i4Dir').selectOption('load'); await has('i4E', '%');
      await page.locator('#i4Dir').selectOption('unload'); await page.click('#i4Play'); await page.waitForTimeout(500); ok(Number((await read('i4TOut')).replace(/[^0-9.]/g, '')) > 1000, 'ice playback advances');
      await page.click('#i4Reset'); await has('i4A', '20.000 km');
      // keyboard tabs
      await page.locator('#tab-iso').focus(); await page.keyboard.press('Home'); eq(await page.locator('#tab-spread').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowLeft'); eq(await page.locator('#tab-iso').getAttribute('aria-selected'), 'true'); await page.keyboard.press('End'); eq(await page.locator('#tab-iso').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-spread').getAttribute('aria-selected'), 'true');
      // canvases have pixels; no horizontal overflow on any tab
      for (const t of ['spread', 'mag', 'hot', 'iso']) { await page.click('#tab-' + t); await page.waitForTimeout(200); eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true); for (const st of await canvasInkAll(page, '#panel-' + t + ' canvas')) assertCanvasDrawn(st, { minDistinct: 4, label: t + ' ' + st.id }); checks++; }
      eq(await page.evaluate(() => Object.isFrozen(window.TectonicsLab) && !Object.getOwnPropertyDescriptor(window, 'TectonicsLab').writable), true);
      assert.deepEqual(errors, []); checks++;
      await page.close();
    }
    console.log(`levha-tektonigi: ${checks - before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
function eq(a, b) { assert.equal(a, b); checks++; }
