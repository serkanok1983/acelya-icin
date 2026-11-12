// Homeostaz ve geri besleme: çekirdeğin bağımsız denetimi (kapalı biçimler, ayrı tümleyiciler, karmaşık düzlemde
// faz taraması, kaba kuvvet kök arama, enerji korunumu) ve isteğe bağlı tarayıcı denetimi (390 px açık, 1280 px koyu).
// Kullanım: node scripts/check-g-homeostaz-ve-geri-besleme.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "homeostaz-ve-geri-besleme";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.HomeoLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");

/* Bağımsız araçlar: Heun (ikinci mertebe) tümleyici, karmaşık sayı */
function heun(f, y0, t0, t1, h) { let y = y0.slice(), t = t0; const out = [[t, y.slice()]]; const n = Math.round((t1 - t0) / h); for (let k = 0; k < n; k++) { const a = f(t, y), yp = y.map((v, i) => v + h * a[i]), b = f(t + h, yp); y = y.map((v, i) => v + h / 2 * (a[i] + b[i])); t += h; out.push([t, y.slice()]); } return out; }
const cx = (re, im) => ({ re, im }), cmul = (a, b) => cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re), cadd = (a, b) => cx(a.re + b.re, a.im + b.im), cexp = (a) => cx(Math.exp(a.re) * Math.cos(a.im), Math.exp(a.re) * Math.sin(a.im)), cabs = (a) => Math.hypot(a.re, a.im);

/* ══ 1 · Döngü ══ */
// θ = 0: kapalı biçim z(t) = d/g (1 − e^(−g (t − t_D)/τ)), g = 1 ± K (g < 0'da üstel kaçış)
for (const mode of ["neg", "pos", "open"]) for (const Kg of [0, 0.5, 4, 20, 1.5, 3]) for (const tau of [2, 10]) {
  const d = 5, sim = K.loopSim({ mode, K: Kg, theta: 0, tau, d }), g = mode === "neg" ? 1 + Kg : mode === "pos" ? 1 - Kg : 1;
  for (let i = 0; i < sim.t.length; i += Math.max(1, Math.floor(sim.t.length / 37))) {
    const t = sim.t[i], s = t - 5, z = s <= 0 ? 0 : Math.abs(g) < 1e-12 ? d * s / tau : (d / g) * (1 - Math.exp(-g * s / tau));
    near(sim.z[i], z, 1e-6, `kapalı biçim ${mode} K=${Kg} t=${t}`);
  }
  const m = K.loopMeasure(sim), th = K.loopTheory({ mode, K: Kg, theta: 0, tau, d });
  if (g > 0) { near(m.zss, d / g, 2e-4, "kalıcı sapma"); near(m.settle, tau * Math.log(50) / g, 2e-3, "yerleşme τ ln 50/g"); near(th.settle0, tau * Math.log(50) / g, 1e-12); }
  else if (g < 0) { ok(m.stable === false, "kaçış kararsız"); near(m.growth, -g / tau, 1e-4, "θ = 0 büyüme hızı (K − 1)/τ"); }
}
// Gecikmeli döngü: Heun ile ayrı tümleme (adım 2·10⁻⁴ s, gecikmeli değer tam ızgarada)
function delayedHeun({ K: Kg, theta, tau, d, mode }, tEnd, h = 2e-4) {
  const s = mode === "neg" ? 1 : -1, lag = Math.round(theta / h), N = Math.round(tEnd / h), z = new Float64Array(N + 1);
  const zd = (i) => (i < 0 ? 0 : z[i]), dist = (t) => (t >= 5 - 1e-12 ? d : 0);
  for (let i = 0; i < N; i++) { const t = i * h, a = (-z[i] - s * Kg * zd(i - lag) + dist(t)) / tau, zp = z[i] + h * a, b = (-zp - s * Kg * (lag === 0 ? zp : zd(i + 1 - lag)) + dist(t + h)) / tau; z[i + 1] = z[i] + h / 2 * (a + b); }
  return (t) => z[Math.round(t / h)];
}
for (const cfg of [{ K: 4, theta: 0.5, tau: 10, d: 5, mode: "neg" }, { K: 30, theta: 0.5, tau: 10, d: 5, mode: "neg" }, { K: 8, theta: 2, tau: 5, d: -3, mode: "neg" }, { K: 1.5, theta: 0.5, tau: 10, d: 5, mode: "pos" }]) {
  const sim = K.loopSim({ ...cfg, tEnd: 40 }), ref = delayedHeun(cfg, 40);
  let worst = 0, scale = 1e-9; for (let i = 0; i < sim.t.length; i += 50) { worst = Math.max(worst, Math.abs(sim.z[i] - ref(sim.t[i]))); scale = Math.max(scale, Math.abs(ref(sim.t[i]))); }
  ok(worst / scale < 2e-3, `gecikmeli döngü Heun karşılaştırması ${JSON.stringify(cfg)}: ${worst / scale}`);
}
// Kararlılık sınırı: açık döngü L(iω) = K e^(−iωθ)/(1 + iωτ) fazının −π olduğu ω, karmaşık düzlemde ince tarama
function nyquist(theta, tau) {
  let prev = null, w0 = 0;
  for (let w = 1e-4; w < 50 / theta; w *= 1.0005) {
    const L = cmul(cexp(cx(0, -w * theta)), cx(1 / (1 + w * w * tau * tau), -w * tau / (1 + w * w * tau * tau)));
    const ph = Math.atan2(L.im, L.re); // −π'yi geçerken atan2 +π'ye sıçrar
    if (prev !== null && prev < -2.5 && ph > 2.5) { w0 = w; break; }
    prev = ph;
  }
  const L = cmul(cexp(cx(0, -w0 * theta)), cx(1 / (1 + w0 * w0 * tau * tau), -w0 * tau / (1 + w0 * w0 * tau * tau)));
  return { Kc: 1 / cabs(L), w: w0 };
}
for (const [theta, tau] of [[0.5, 10], [1, 10], [2, 10], [0.25, 3], [3, 1]]) {
  const ny = nyquist(theta, tau), c = K.critical(theta, tau);
  near(c.Kc, ny.Kc, 1e-3, `K_c faz taraması θ=${theta}`); near(c.wc, ny.w, 1e-3, "ω_c");
  const ch = (Kg) => cabs(cadd(cx(1 + 0, tau * c.wc), cmul(cx(Kg, 0), cexp(cx(0, -c.wc * theta))))); near(ch(c.Kc), 0, 1e-9, "karakteristik denklem eşikte sıfır");
  const mc = K.measureCritical(theta, tau); near(mc.Kc, c.Kc, 4e-3, `benzetimle ölçülen K_c θ=${theta}`); if (mc.period) near(mc.period, 2 * Math.PI / c.wc, 5e-3, "eşikte periyot");
  ok(K.loopMeasure(K.loopSim({ K: 0.95 * c.Kc, theta, tau, d: 1, mode: "neg" })).stable === true, "eşiğin %95'i kararlı");
  ok(K.loopMeasure(K.loopSim({ K: 1.05 * c.Kc, theta, tau, d: 1, mode: "neg" })).stable === false, "eşiğin %105'i kararsız");
}
ok(K.critical(0, 10).Kc === Infinity, "θ = 0 sınırsız");
near(K.critical(0.5, 10).Kc, 32.0558, 1e-4, "varsayılan K_c");
// Pozitif döngü: büyüme hızı ayrı Heun tümlemesinin log eğiminden
for (const [Kg, theta] of [[1.5, 0.5], [3, 0.5], [4, 0], [2, 2]]) {
  const cfg = { K: Kg, theta, tau: 10, d: 5, mode: "pos" }, ref = delayedHeun(cfg, 80, 1e-3), zs = 5 / (1 - Kg);
  const gr = (Math.log(Math.abs(ref(80) - zs)) - Math.log(Math.abs(ref(60) - zs))) / 20;
  near(K.growthRate(Kg, theta, 10), gr, 2e-3, `büyüme hızı K=${Kg} θ=${theta}`);
  const m = K.loopMeasure(K.loopSim(cfg)); near(m.growth, gr, 3e-3, "sayfanın ölçtüğü büyüme");
}
{ const m = K.loopMeasure(K.loopSim({ K: 4, theta: 0.5, tau: 10, d: 5, mode: "neg" })); near(m.zss, 1, 1e-4, "varsayılan kalıcı sapma"); ok(Math.abs(m.settle - 6.06) < 0.01, `varsayılan yerleşme ${m.settle}`); }
{ const m = K.loopMeasure(K.loopSim({ K: 0.5, theta: 0, tau: 10, d: 5, mode: "pos" })); near(m.zss, 10, 1e-4, "pozitif K < 1: d/(1 − K)"); }
{ const m = K.loopMeasure(K.loopSim({ K: 4, theta: 0.5, tau: 10, d: 0, mode: "neg" })); ok(m.none === true, "d = 0'da ölçüm tanımsız"); }
assert.throws(() => K.loopSim({ K: -1, theta: 0, tau: 1, d: 1 })); assert.throws(() => K.loopSim({ K: 1, theta: 0, tau: 0, d: 1 })); checks += 2;

/* ══ 2 · Bergman ══ */
const D = K.BERGMAN_DEF;
function bergRef(c, T = 1440, h = 0.01) { // ayrı yazılmış denklemler, Heun
  const p = { ...D, ...c }, ra = (t) => (p.mode === "meal" && t > 0 ? p.dose * t / p.tauM ** 2 * Math.exp(-t / p.tauM) : 0);
  const f = (t, [G, X, I]) => [-(p.SG + X) * G + p.SG * p.Gb + ra(t), -p.p2 * X + p.p2 * p.SI * (I - p.Ib), Math.max(0, p.n * p.Ib + p.gamma * (G - p.Gb)) - p.n * I];
  return heun(f, [p.Gb + (p.mode === "bolus" ? p.dose : 0), 0, p.Ib], 0, T, h);
}
for (const c of [{}, { SI: 1e-4, SG: 0.014 }, { mode: "meal", dose: 300 }, { gamma: 0.1, SI: 15e-4 }, { dose: 10 }]) {
  const sim = K.bergmanSim(c), ref = bergRef(c, 400);
  for (const t of [1, 10, 30, 60, 120, 240, 400]) { const r = ref[Math.round(t / 0.01)][1], i = Math.round(t / D.h); near(sim.G[i], r[0], 2e-5, `G(${t}) ${JSON.stringify(c)}`); near(sim.I[i], r[2], 2e-4, "I"); ok(Math.abs(sim.X[i] - r[1]) <= 1e-4 * Math.abs(r[1]) + 1e-9, `X(${t}) ${sim.X[i]} ≠ ${r[1]}`); }
  // alan: ayrı tümlemenin trapez integrali
  const full = bergRef(c, 1440, 0.02); let auc = 0; for (let k = 1; k < full.length; k++) auc += 0.01 * (full[k - 1][1][0] + full[k][1][0] - 2 * D.Gb);
  { const v = K.bergmanMeasure(sim).auc; ok(Math.abs(v - auc) < 0.1, `glukoz alanı ${v} ≠ ${auc} (0,1 mg/dl·dk içinde; trapez h = 0,25 dk)`); }
}
for (const SG of [0.0265, 0.01, 0.04]) { // insülinsiz: tam üstel
  for (const c of [{ SG, gamma: 0 }, { SG, SI: 0 }]) {
    const sim = K.bergmanSim(c), m = K.bergmanMeasure(sim);
    for (const t of [5, 50, 200]) near(sim.G[Math.round(t / D.h)] - D.Gb, 200 * Math.exp(-SG * t), 1e-9, "e^(−S_G t)");
    near(m.ret, Math.log(20) / SG, 1e-4, "dönüş ln 20/S_G"); near(m.auc, 200 / SG * (1 - Math.exp(-SG * 1440)), 1e-4, "alan girdi/S_G"); ok(m.nadir === null, "insülinsiz alt sapma yok");
  }
}
{ // doğrusal sınır: çok küçük dozda alan → girdi/(S_G + G_b S_I γ/n)
  for (const c of [{}, { SI: 1e-4, SG: 0.014 }, { SI: 15e-4, gamma: 0.02 }, { mode: "meal" }]) { const dose = 0.01, m = K.bergmanMeasure(K.bergmanSim({ ...c, dose })), p = { ...D, ...c }; near(m.auc, dose / (p.SG + p.Gb * p.SI * p.gamma / p.n), 2e-4, "doğrusal alan"); }
  const rels = [200, 20, 2].map((dose) => { const m = K.bergmanMeasure(K.bergmanSim({ dose })), L = K.bergmanLinear({ dose }); return Math.abs(m.auc / L.auc - 1); });
  ok(rels[0] > rels[1] && rels[1] > rels[2] && rels[2] < 0.003, `doğrusal olmayan fark dozla küçülür ${rels}`);
}
for (const c of [{}, { SI: 1e-4, SG: 0.014 }, { gamma: 0 }, { SI: 15e-4, gamma: 0.1 }]) { // özdeğerler: det(A − λI) = 0, iz
  const L = K.bergmanLinear(c), A = L.A;
  const det = (l) => { const m = A.map((r, i) => r.map((v, j) => cx(v - (i === j ? l.re : 0), i === j ? -l.im : 0))); const t = (a, b, c2, d) => cadd(cmul(a, b), cmul(cx(-c2.re, -c2.im), d)); return cadd(cadd(cmul(m[0][0], t(m[1][1], m[2][2], m[1][2], m[2][1])), cmul(cx(-m[0][1].re, -m[0][1].im), t(m[1][0], m[2][2], m[1][2], m[2][0]))), cmul(m[0][2], t(m[1][0], m[2][1], m[1][1], m[2][0]))); };
  L.eig.forEach((e) => ok(cabs(det(e)) < 1e-12, "özdeğer"));
  near(L.eig.reduce((s, e) => s + e.re, 0), A[0][0] + A[1][1] + A[2][2], 1e-12, "iz");
}
{ let s = 0; for (let t = 0; t <= 2000; t += 0.01) s += K.raMeal(t, 300, 30) * 0.01; near(s, 300, 1e-6, "öğün girdisinin integrali"); }
{ const m = K.bergmanMeasure(K.bergmanSim({})); near(m.ret, 60.5, 2e-3, "varsayılan dönüş"); near(m.auc, 4506, 2e-4, "varsayılan alan"); near(K.bergmanLinear({}).auc, 200 / (0.0265 + 90 * 5e-4 * 0.04 / 0.14), 1e-12, "varsayılan doğrusal alan"); }
assert.throws(() => K.bergmanSim({ SI: -1 })); checks++;

/* ══ 3 · Isı dengesi ══ */
const TD = K.THERMO_DEF;
function netRef(T, c) { // sayfadan bağımsız yazılmış ısı dengesi
  const p = { ...TD, ...c }, clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const kt = p.vaso ? clamp(40 + 150 * (T - p.Tset), 15, 150) : 40, G = 1 / (1 / kt + 1 / (p.h * p.A));
  const E = p.sweat ? clamp(400 * (T - p.Tset - 0.1), 0, 500) : 0, S = p.shiver ? clamp(250 * (p.Tset - 0.2 - T), 0, 350) : 0;
  return p.M0 + S - E - G * (T - p.Ta);
}
for (const Ta of [0, 10, 22, 30, 35, 40, 45]) for (const M0 of [80, 300, 600]) for (const flags of [{}, { vaso: false, sweat: false, shiver: false }, { sweat: false }, { shiver: false, vaso: false }]) {
  const c = { Ta, M0, ...flags }, st = K.thermoSteady(c);
  let roots = 0, prev = netRef(-20, c); for (let T = -19.99; T <= 150; T += 0.01) { const v = netRef(T, c); if (prev * v < 0) roots++; prev = v; }
  ok(st.roots.length === roots && roots === 1, `tek kök ${JSON.stringify(c)}`);
  ok(Math.abs(netRef(st.T, c)) < 1e-8, "kökte net ısı sıfır");
}
for (const Ta of [0, 22, 30, 40]) { // edilgin: kapalı biçim
  const c = { Ta, vaso: false, sweat: false, shiver: false }, G = 1 / (1 / 40 + 1 / (9 * 1.8)), Tinf = Ta + 80 / G, tau = 70 * 3470 / G;
  const ps = K.passiveSteady(c); near(ps.T, Tinf, 1e-12, "T∞"); near(ps.tau, tau, 1e-12, "τ = mc/G");
  const sim = K.thermoSim({ ...c, T0: 37, tEnd: 12 * 3600, dt: 20 });
  for (const t of [600, 3600, 4 * 3600, 12 * 3600]) near(sim.T[t / 20], Tinf + (37 - Tinf) * Math.exp(-t / tau), 1e-9, "Newton soğuması");
  const nt = K.newtonTau(K.thermoSim({ ...c, T0: 37, tEnd: 30 * 3600, dt: 30 }), Tinf);
  if (Math.abs(Tinf - 37) > 0.05) { near(nt.t63, tau, 1e-5, "%63,2 anı"); near(nt.fit, tau, 1e-5, "ln eğimi"); } else ok(nt.t63 === null, "fark yoksa τ tanımsız");
}
{ // enerji korunumu: C ΔT = ∫ net dt (düzenlenen, doğrusal olmayan model)
  for (const c of [{ Ta: 22 }, { Ta: 40, M0: 300 }, { Ta: 5 }]) {
    const sim = K.thermoSim({ ...c, T0: 37, tEnd: 6 * 3600, dt: 5 }); let E = 0;
    for (let i = 1; i < sim.t.length; i++) E += 2.5 * (netRef(sim.T[i - 1], c) + netRef(sim.T[i], c));
    near(70 * 3470 * (sim.T[sim.T.length - 1] - 37), E, 2e-3, "enerji korunumu");
  }
}
for (const Ta of [0, 22, 30, 40]) { const rows = K.effectorTable({ Ta }); rows.forEach((r) => near(r.measured, r.theory, 2e-4, `etkileyici tablosu ${r.key} Ta=${Ta}`)); ok(Math.abs(rows[4].theory - 37) < Math.abs(rows[0].theory - 37), "etkileyiciler hatayı küçültür"); }
{ const rows = K.effectorTable({ Ta: 22 }); near(rows[0].theory, 28.938, 1e-4); near(rows[4].theory, 36.663, 1e-4); near(rows[3].theory, 36.453, 1e-4); }
{ // ateş kavramı: yükselişte titreme, inişte terleme
  const s = K.thermoSim({ Ta: 22, T0: 37, tEnd: 12 * 3600, dt: 20, setSchedule: [[0, 37], [3600, 38.5], [6 * 3600, 37]] });
  ok(Math.max(...s.S.subarray(180, 360)) === 350, "yükselişte titreme doyar"); ok(Math.max(...s.E.subarray(1080, 1260)) > 300, "inişte terleme"); ok(s.T[Math.round(5.9 * 3600 / 20)] > 38 && s.T[Math.round(5.9 * 3600 / 20)] < 38.5, "oransal hata kalır");
}

/* ══ 4 · İki durumlu anahtar ══ */
const fRef = (x, a, b, n) => a + b * x ** n / (1 + x ** n) - x;
for (const a of [0, 0.05, 0.2, 0.3, 0.45]) for (const b of [0, 1, 1.5, 2, 3]) for (const n of [1, 2, 4, 8]) {
  const p = { a, b, n }, r = K.switchRoots(p);
  let cnt = 0, prev = fRef(1e-12, a, b, n); for (let x = 1e-4; x <= a + b + 1; x += 1e-4) { const v = fRef(x, a, b, n); if (prev * v < 0) cnt++; prev = v; }
  if (a === 0) cnt += 1; // x = 0 her zaman kök
  ok(r.length === cnt, `kök sayısı a=${a} b=${b} n=${n}: ${r.length} ≠ ${cnt}`);
  r.forEach((q) => { ok(Math.abs(fRef(q.x, a, b, n)) < 1e-10, "kökte f = 0"); if (q.x > 1e-6) { const d = (fRef(q.x + 1e-6, a, b, n) - fRef(q.x - 1e-6, a, b, n)) / 2e-6; ok((d < 0) === q.stable, "kararlılık işareti"); } });
  if (n === 1 && a > 0) ok(r.length === 1, "n = 1'de tek denge");
}
for (const [b, n] of [[1.5, 4], [2, 4], [3, 4], [2, 2], [2, 8]]) {
  const fd = K.folds({ b, n });
  fd.forEach((f) => { ok(Math.abs(fRef(f.x, f.a, b, n)) < 1e-10, "katlanmada f = 0"); const d = (fRef(f.x + 1e-6, f.a, b, n) - fRef(f.x - 1e-6, f.a, b, n)) / 2e-6; ok(Math.abs(d) < 1e-6, "katlanmada f′ = 0"); });
  // kaba kuvvet: a ızgarasında kök sayısının 1 ↔ 3 değiştiği yerler
  if (n > 1) { let prevC = null; const sw = []; for (let a = -1; a <= 1; a += 1e-4) { let c = 0, pv = fRef(1e-9, a, b, n); for (let x = 2e-3; x <= 5; x += 2e-3) { const v = fRef(x, a, b, n); if (pv * v < 0) c++; pv = v; } if (prevC !== null && c !== prevC) sw.push(a); prevC = c; } const fa = fd.map((f) => f.a).filter((v) => v > -1 && v < 1).sort((u, v) => u - v); fa.forEach((v) => ok(sw.some((s) => Math.abs(s - v) < 3e-4), `katlanma a=${v} kaba kuvvetle bulundu ${sw}`)); }
}
near(K.folds({ b: 2, n: 2 }).find((f) => Math.abs(f.x - 1) < 1e-6).a, 0, 1e-10, "n = 2, b = 2: katlanma (1, 0)");
{ // hayalet gecikmesi ∝ hız^(2/3)
  const p = { b: 1.5, n: 4 }, aUp = Math.max(...K.folds(p).map((f) => f.a));
  const dl = [1e-2, 1e-3, 1e-4].map((rate) => K.sweep({ ...p, a: 0 }, { rate, aMax: 1 }).aUp - aUp);
  ok(dl.every((v) => v > 0), "sıçrama katlanmadan sonra"); const r1 = dl[0] / dl[1], r2 = dl[1] / dl[2];
  ok(r1 > 3.6 && r1 < 5.2 && r2 > 3.6 && r2 < 5.2, `ölçekleme 10^(2/3) ≈ 4,64: ${r1} ${r2}`);
  near(aUp, 0.42794, 1e-4, "varsayılan a↑");
}
{ const s = K.sweep({ b: 2, n: 4, a: 0 }, { rate: 1e-3, aMax: 1 }); ok(s.aDown === null && s.endHigh === true, "geri dönüşsüz: a = 0'da açık kalır"); }
for (const p of [{ a: 0.3, b: 1.5, n: 4 }, { a: 0.05, b: 2, n: 4 }, { a: 0.1, b: 2, n: 2 }]) { // ayırıcı = kararsız kök
  const bs = K.basins(p), un = K.switchRoots(p).filter((q) => !q.stable)[0]; near(bs.threshold, un.x, 1e-6, "ölçülen ayırıcı");
  K.switchRoots(p).filter((q) => q.stable).forEach((q, i) => near(bs.stable[i], q.x, 1e-7, "benzetimin oturduğu durum"));
}
{ // en kısa darbe: ayrı Heun tümlemesiyle iki yanından sına
  const p = { a: 0.3, b: 1.5, n: 4 }, mp = K.minPulse(p, 0.2), lo = K.relax(0, p, 400);
  const run = (Tp) => { let x = lo; const h = 0.005; for (let t = 0; t < 120; t += h) { const a = p.a + (t >= 5 && t < 5 + Tp ? 0.2 : 0), k1 = fRef(x, a, 1.5, 4), k2 = fRef(x + h * k1, a, 1.5, 4); x += h / 2 * (k1 + k2); } return x; };
  ok(run(mp + 0.05) > 1.5 && run(mp - 0.05) < 0.5, `en kısa darbe ${mp}`); near(mp, 5.59, 5e-3, "varsayılan en kısa darbe");
}
console.log(`G homeostaz: ${checks.toLocaleString("tr-TR")} bağımsız kapalı biçim, ayrı tümleyici, faz taraması, kök sayımı ve enerji kontrolü PASS`);

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
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, t) => { const v = await read(id); assert(v.includes(t), `${id}: "${v}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const settle = () => page.waitForTimeout(120);
      await page.waitForSelector("section.digest", { state: "visible", timeout: 15000 }); ok(await page.locator("section.digest").isVisible(), "defter görünür"); ok(!/normal aralık/i.test(await page.locator("body").textContent()), "klinik okunabilecek \"normal aralık\" ifadesi yok");
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuval etiketleri");
      ok(await page.evaluate(() => [...document.querySelectorAll('input[type="range"]')].every((e) => { const s = +e.step, v = +e.value, m = +e.min; return Math.abs((v - m) / s - Math.round((v - m) / s)) < 1e-6; })), "varsayılanlar kaydırıcı adımında");
      // 1 · döngü
      await has("hm1Zss", "1,000"); await has("hm1Ratio", "0,2000"); await has("hm1RatioTh", "0,2000"); await has("hm1Settle", "6,06 s"); await has("hm1Kc", "32,03 · 32,06"); await has("hm1Tc", "1,961 s · 1,961 s");
      await page.click("#hm1PNo"); await has("hm1Settle", "7,82 s"); await has("hm1SettleTh", "7,82 s"); await has("hm1Kc", "sınırsız");
      await page.click("#hm1PNear"); await has("hm1Zss", "0,161"); await has("hm1Period", "1,998 s"); await has("hm1Status", "0,94 katı");
      await page.click("#hm1PFar"); await has("hm1Zss", "sapma büyüyor"); await has("hm1Status", "eşiğin (K_c = 32,06) üstünde"); await has("hm1ZssThF", "yalnız kararlı");
      await page.click("#hm1PPos"); await has("hm1Growth", "0,0465 1/s"); await has("hm1GrowthTh", "14,89 s");
      await range("hm1K", 1); await has("hm1Status", "doğrusal büyür"); await range("hm1K", 0.5); await has("hm1Zss", "10,000");
      await sel("hm1Mode", "open"); await has("hm1Zss", "5,000"); ok(await page.locator("#hm1K").isDisabled(), "açık döngüde K kapalı");
      await sel("hm1Mode", "neg"); await range("hm1D", 0); await has("hm1Zss", "tanımsız"); await has("hm1Status", "Bozucu yok");
      await range("hm1D", -10); await range("hm1Theta", 3); await range("hm1Tau", 30); await range("hm1K", 50); await has("hm1DOut", "−10,0"); await has("hm1Zss", "sapma büyüyor");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("hm1KOut", "4,0"); await has("hm1Settle", "6,06 s");
      await page.keyboard.press("Space"); ok((await read("hm1Play")) === "Oynat", "boşluk duraklatır"); await page.click("#hm1Skip"); await page.click("#hm1Reset"); ok((await read("hm1Play")) === "Duraklat", "sıfırla başlatır");
      await page.locator("#tab-loop").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-bis").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-glu").getAttribute("aria-selected")) === "true", "ArrowRight");
      ok(await page.locator("#panel-loop").isHidden(), "tek panel görünür");
      // 2 · glukoz
      await has("hm2Peak", "290,0 mg/dl"); await has("hm2Ret", "60,5 dk"); await has("hm2RetTh", "113,0 dk"); await has("hm2Auc", "4506 mg/dl·dk"); await has("hm2AucTh", "5082 mg/dl·dk"); await has("hm2AucD", "−11,33 %"); await has("hm2Nadir", "83,1 mg/dl"); await has("hm2Status", "kişisel bir değer değildir");
      await page.click("#hm2PNoIns"); await has("hm2Ret", "113,0 dk"); await has("hm2AucD", "0,00 %"); await has("hm2Nadir", "yok");
      await page.click("#hm2PLow"); await has("hm2Ret", "151,1 dk"); await has("hm2RetTh", "214,0 dk"); await has("hm2Auc", "11 017");
      await page.click("#hm2PSmall"); await has("hm2AucD", "−0,70 %");
      await page.click("#hm2Reset"); await sel("hm2Mode", "meal"); await settle(); await has("hm2Peak", "145,0 mg/dl"); await has("hm2PeakT", "55,0 dk"); await has("hm2Ret", "166,7 dk"); await has("hm2RetTh", "—");
      await range("hm2Dose", 0); await settle(); await has("hm2Status", "Girdi sıfır"); await range("hm2SI", 0); await range("hm2SG", 0.002); await range("hm2Dose", 300); await settle(); await has("hm2SGOut", "0,0020 /dk"); await has("hm2Ret", "dönmedi");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("hm2Auc", "4506"); ok((await page.locator("#hm2Mode").inputValue()) === "bolus", "R girdiyi sıfırlar");
      // 3 · sıcaklık
      await page.click("#tab-temp");
      await has("hm3Tss", "36,66 °C"); await has("hm3TssTh", "36,663 °C"); await has("hm3Err", "−0,34 °C · −8,06 °C"); await has("hm3Pas", "28,94 °C"); await has("hm3Tau", "5,852 sa"); await has("hm3TauTh", "5,852 sa"); await has("hm3Pow", "34 W · 0 W");
      ok((await page.locator("#hm3Rows tr").count()) === 5, "5 satır"); await has("hm3Rows", "36,453");
      await page.click("#hm3PHot"); await has("hm3Tss", "37,39 °C"); await has("hm3Status", "yalnız terleme"); await has("hm3Rows", "37,376");
      await page.click("#hm3PEx"); await has("hm3Tss", "38,30 °C"); await has("hm3Status", "yalnız modelin hesabıdır");
      await range("hm3Ta", 45); await settle(); await has("hm3Status", "üst sınırında");
      await page.click("#hm3PPas"); await has("hm3Tss", "28,94 °C"); await has("hm3Status", "Newton soğumasıdır"); await has("hm3T12", "29,98 °C");
      await page.click("#hm3Reset"); await range("hm3Ta", 30); await range("hm3H", 9); await settle(); await has("hm3TauD", "fark");
      await range("hm3Ta", 0); await settle(); await has("hm3Tss", "36,00 °C"); await has("hm3Status", "yalnız modelin hesabıdır"); await range("hm3Ta", 22);
      await sel("hm3Scen", "fever"); await settle(); ok(await page.locator("#hm3Fever").isVisible(), "ateş kaydırıcısı görünür"); await has("hm3Status", "350 W"); await has("hm3Status", "kavram benzetimidir"); await has("hm3Peak", "38,12");
      await page.locator("h1").click(); await page.keyboard.press("r"); ok(await page.locator("#hm3Fever").isHidden(), "R senaryoyu sıfırlar"); await has("hm3Tss", "36,66 °C");
      // 4 · anahtar
      await page.click("#tab-bis");
      await has("hm4Roots", "0,3145 (kararlı) · 0,9097 (kararsız) · 1,6025 (kararlı)"); await has("hm4Basins", "0,3145 · 1,6025"); await has("hm4Thr", "0,9097 · 0,9097");
      await has("hm4Up", "0,4459"); await has("hm4UpD", "0,4279"); await has("hm4Down", "0,1656"); await has("hm4DownD", "0,1858"); await has("hm4Rev", "geri dönüşlü");
      await has("hm4PEnd", "1,6025"); await has("hm4PMin", "5,59");
      await range("hm4Tp", 5.5); await settle(); await has("hm4PEndD", "geri döndü"); await range("hm4Tp", 6); await settle(); await has("hm4PEndD", "orada kaldı");
      await sel("hm4Rate", "0.0001"); await has("hm4Up", "0,4320"); await sel("hm4Rate", "0.01"); await has("hm4Up", "0,5036");
      await page.click("#hm4PIrr"); await has("hm4Down", "kapanmadı"); await has("hm4Rev", "geri dönüşsüz"); await has("hm4PEndD", "orada kaldı");
      await page.click("#hm4PN1"); await has("hm4Roots", "1,0782 (kararlı)"); await has("hm4Status", "İşbirliği olmadan");
      await range("hm4B", 0); await settle(); await has("hm4Status", "b = 0");
      await range("hm4N", 4); await range("hm4B", 3); await range("hm4A", 1); await settle(); await has("hm4RootsK", "tek kararlı");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("hm4Up", "0,4459");
      ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      ok(await page.evaluate(() => Object.isFrozen(HomeoLab) && !Object.getOwnPropertyDescriptor(window, "HomeoLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G homeostaz: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
