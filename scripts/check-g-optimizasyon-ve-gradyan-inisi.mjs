// Optimizasyon ve gradyan inişi: çekirdeğin bağımsız denetimi (sonlu farklar, yoğun ızgara taraması, özayrışımla kapalı
// biçim, matris kuvveti, ayrı yazılmış döngüler, kaba kuvvet LP, kaynak değerleri) ve isteğe bağlı tarayıcı denetimi.
// Kullanım: node scripts/check-g-optimizasyon-ve-gradyan-inisi.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "optimizasyon-ve-gradyan-inisi";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.OptLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");

/* ── 1. Tek değişkenli işlevler: türevler, dışbükeylik, yerel minimumlar ── */
const CONVEX = new Set(["sq", "quart", "hyp", "expl"]);
for (const [id, F] of Object.entries(K.F1)) {
  for (const x of [-1.9, -0.7, 0.3, 1.45]) { const h = 1e-5; near(F.d1(x), (F.f(x + h) - F.f(x - h)) / (2 * h), 1e-6, `${id} f′`); near(F.d2(x), (F.d1(x + h) - F.d1(x - h)) / (2 * h), 1e-6, `${id} f″`); }
  // yoğun ızgarada kiriş testi (sayfanın rastgele çiftlerinden bağımsız)
  let viol = 0; for (let i = 0; i <= 80; i++) for (let j = 0; j <= 80; j++) for (const t of [0.25, 0.5, 0.75]) { const a = -2 + i / 20, b = -2 + j / 20; if (F.f(t * a + (1 - t) * b) > t * F.f(a) + (1 - t) * F.f(b) + 1e-12 * (1 + Math.abs(F.f(a)) + Math.abs(F.f(b)))) viol++; }
  ok((viol === 0) === CONVEX.has(id), `${id} ızgara kiriş testi ${viol}`);
  const j = K.jensen1(id, 4000, 1), d = K.d2Scan(id);
  ok((j.viol === 0) === CONVEX.has(id) && (d.min >= 0) === CONVEX.has(id), `${id} sayfa testleri`);
  // gerçek yerel minimumlar: [−2, 2] taraması ve altın oranla inceltme
  const mins = []; const n = 6000, xs = (i) => -3 + 6 * i / n;
  for (let i = 1; i < n; i++) if (F.f(xs(i)) < F.f(xs(i - 1)) && F.f(xs(i)) <= F.f(xs(i + 1))) { let a = xs(i - 1), b = xs(i + 1); for (let k = 0; k < 80; k++) { const c = a + 0.382 * (b - a), e = a + 0.618 * (b - a); if (F.f(c) < F.f(e)) b = e; else a = c; } mins.push((a + b) / 2); }
  const st = K.starts1(id, 40, 1), gmin = Math.min(...mins.map(F.f));
  ok(st.groups.reduce((s, g) => s + g.n, 0) === 40, "40 başlangıç");
  for (const g of st.groups) { const m = mins.reduce((p, q) => (Math.abs(q - g.x) < Math.abs(p - g.x) ? q : p), mins[0] ?? g.x); ok(Math.abs(m - g.x) < (id === "quart" ? 0.01 : 2e-4) || (mins.length === 0 && Math.abs(g.x) <= 2.6), `${id} uç ${g.x} gerçek minimum ${m}`); ok(g.global === (F.f(g.x) - gmin < 1e-5), `${id} küresel etiketi`); }
  if (CONVEX.has(id)) ok(st.groups.length === 1, `${id} dışbükey: tek uç`);
}
{ const st = K.starts1("well", 40, 1); ok(st.groups.length === 2 && st.groups[0].n === 24 && st.groups[1].n === 16, "iki çukur 24/16"); near(st.groups[0].x, -1.0575, 1e-3, "sol minimum"); }
{ const j = K.jensen1("well", 4000, 1); ok(j.viol === 1247, "varsayılan ihlal sayısı"); }

/* ── 2-B ikinci dereceden işlev: özdeğerler, örneklenmiş m ve L ── */
for (const [l1, l2, th] of [[1, 3, 30], [0.5, 4, 0], [-0.5, 2, 45], [0, 2, 30], [2, 2, 75], [5, -1, 120]]) {
  const A = K.quadA(l1, l2, th), e = K.eig2(A), tr = A[0] + A[2], det = A[0] * A[2] - A[1] * A[1];
  for (const lam of [e.lo, e.hi]) near(lam * lam - tr * lam + det, 0, 1e-12, "karakteristik denklem");
  near(e.lo, Math.min(l1, l2), 1e-12, "λ_min"); near(e.hi, Math.max(l1, l2), 1e-12, "λ_max");
  const Av = [A[0] * e.vHi[0] + A[1] * e.vHi[1], A[1] * e.vHi[0] + A[2] * e.vHi[1]]; near(Av[0], e.hi * e.vHi[0], 1e-12); near(Av[1], e.hi * e.vHi[1], 1e-12);
  const cs = K.curvSample(A, 3000, 7), span = e.hi - e.lo + 1e-12;
  ok(cs.qmin >= e.lo - 1e-9 && cs.qmin - e.lo < 1e-3 * span + 1e-9, `m ölçümü ${cs.qmin}`);
  ok(cs.qmax <= e.hi + 1e-9 && e.hi - cs.qmax < 1e-3 * span + 1e-9, "λ_max ölçümü");
  const Lth = Math.max(Math.abs(e.lo), Math.abs(e.hi)); ok(cs.lip <= Lth + 1e-9 && Lth - cs.lip < 1e-3 * Lth + 1e-9, "L ölçümü");
  ok((cs.viol > 0) === (e.lo < -1e-12), "2-B Jensen ihlali ⇔ λ_min < 0");
}

/* ── 2. Öğrenme oranı: özayrışımla kapalı biçim ── */
function eigNorm(A, x0, eta, k) { const e = K.eig2(A); const c1 = e.vLo[0] * x0[0] + e.vLo[1] * x0[1], c2 = e.vHi[0] * x0[0] + e.vHi[1] * x0[1]; return Math.hypot(c1 * (1 - eta * e.lo) ** k, c2 * (1 - eta * e.hi) ** k); }
const X0 = [-4, 3];
for (const kap of [1, 10, 100, 1000]) {
  const m = 1 / kap, A = K.quadA(m, 1, 30);
  for (const eta of [0.3, 1, 1.5, 1.9, 2.05]) {
    const r = K.gdRate(A, eta, X0), th = Math.max(Math.abs(1 - eta * m), Math.abs(1 - eta)); near(K.gdRateTheory(m, 1, eta), th, 1e-15);
    if (th > 1e-6) { const N = 400; const exact = (eigNorm(A, X0, eta, 2 * N) / eigNorm(A, X0, eta, N)) ** (1 / N); ok(Math.abs(r / th - 1) < 2e-3, `oran κ=${kap} η=${eta}: ${r} ${th}`); ok(Math.abs(exact / th - 1) < 0.02 || kap >= 100, "kapalı biçim oranı"); }
    const s = K.stepsToTol(A, X0, eta, 1e-6, 100000);
    let k = 1; const n0 = Math.hypot(...X0); while (k <= 100000 && eigNorm(A, X0, eta, k) > 1e-6 * n0) k++;
    ok(s === (k > 100000 ? null : k) || (s !== null && Math.abs(s - k) <= 1), `adım sayısı κ=${kap} η=${eta}: ${s} ${k}`);
  }
  near(K.etaCritical(A, X0), 2, 1e-6, `eşik κ=${kap}`);
  const b = K.etaBest(A, X0); near(b.eta, 2 / (m + 1), 5e-4, `en iyi η κ=${kap}`); if (kap > 1) near(b.rate, (kap - 1) / (kap + 1), 5e-4, "en iyi oran"); else ok(b.rate < 1e-6, "κ = 1 tek adım");
  for (const eta of [0.5, 0.9, 1.2, 1.9]) { const z = K.zigzag(A, X0, eta); ok(z && z.frac === (eta > 1 ? 1 : 0), `zikzak η=${eta}`); }
  ok(K.zigzag(A, X0, 1) === null, "η = 1/λ_max: dik bileşen sıfır");
}
ok(K.gdRate(K.quadA(0.1, 1, 30), 2, X0) > 0.99999 && K.gdRate(K.quadA(0.1, 1, 30), 2, X0) < 1.00001, "η = 2: oran 1");

/* ── 3. Momentum: matris kuvvetiyle spektral yarıçap, ayrı döngüler ── */
function specRadius(M) { // 2×2, ‖M^(2^20)‖^(1/2^20), ara normalleştirme ile
  let P = M.map((r) => r.slice()), lg = 0; const T = 20;
  for (let i = 0; i < T; i++) { const Q = [[P[0][0] * P[0][0] + P[0][1] * P[1][0], P[0][0] * P[0][1] + P[0][1] * P[1][1]], [P[1][0] * P[0][0] + P[1][1] * P[1][0], P[1][0] * P[0][1] + P[1][1] * P[1][1]]]; const n = Math.max(...Q.flat().map(Math.abs)); if (!(n > 0)) return 0; lg = 2 * lg + Math.log(n); P = Q.map((r) => r.map((v) => v / n)); }
  return Math.exp(lg / 2 ** T);
}
for (const kap of [10, 100, 1000]) {
  const m = 1 / kap, bp = K.bestParams(m, 1), A = K.quadA(m, 1, 30);
  near(bp.hb.rate, (Math.sqrt(kap) - 1) / (Math.sqrt(kap) + 1), 1e-14); near(bp.nag.rate, 1 - 1 / Math.sqrt(kap), 1e-14);
  for (const [eta, beta, nest, th] of [[bp.hb.eta, bp.hb.beta, false, bp.hb.rate], [bp.nag.eta, bp.nag.beta, true, bp.nag.rate], [0.5, 0.5, false, null], [1, 0.95, true, null]]) {
    const rho = Math.max(...[m, 1].map((lam) => { const q = 1 - eta * lam; return specRadius(nest ? [[(1 + beta) * q, -beta * q], [1, 0]] : [[1 + beta - eta * lam, -beta], [1, 0]]); }));
    const thp = nest ? K.nagRateTheory(m, 1, eta, beta) : K.hbRateTheory(m, 1, eta, beta);
    near(thp, rho, 2e-4, `kuramsal oran / matris kuvveti ${kap}`); if (th !== null) near(thp, th, 1e-6, "en iyi oran formülü");
    const meas = K.momRate(A, eta, beta, X0, nest); ok(th !== null ? meas >= thp - 1e-6 && meas / thp - 1 < 5e-4 : Math.abs(meas / thp - 1) < 1e-3, `ölçülen momentum oranı ${meas} ${thp}`); // en iyide çakışan kökler ölçüleni büyütür; elle seçilende yakın modüllü kökler sonlu pencerede karışır
  }
}
{ // ayrı yazılmış GD ve ağır top döngüleri sayfayla aynı adım sayısını vermeli
  const A = K.quadA(0.01, 1, 30), fn = K.quadFn(A), x0 = [-4.4, -1.4], bp = K.bestParams(0.01, 1), d0 = Math.hypot(...x0);
  let x = x0.slice(), k = 0; while (Math.hypot(...x) > 1e-6 * d0) { const g = [A[0] * x[0] + A[1] * x[1], A[1] * x[0] + A[2] * x[1]]; x = [x[0] - bp.gd.eta * g[0], x[1] - bp.gd.eta * g[1]]; k++; }
  ok(K.runMethod(fn, "gd", bp.gd, x0, 50000).hit === k && k === 691, `GD adımı ${k}`);
  let p = x0.slice(); x = x0.slice(); k = 0; while (Math.hypot(...x) > 1e-6 * d0) { const g = [A[0] * x[0] + A[1] * x[1], A[1] * x[0] + A[2] * x[1]], nx = [x[0] - bp.hb.eta * g[0] + bp.hb.beta * (x[0] - p[0]), x[1] - bp.hb.eta * g[1] + bp.hb.beta * (x[1] - p[1])]; p = x; x = nx; k++; }
  ok(K.runMethod(fn, "hb", bp.hb, x0, 50000).hit === k && k === 87, `ağır top adımı ${k}`);
  const nw = K.runMethod(fn, "newton", {}, x0, 10); ok(nw.hit === 1 && nw.dist < 1e-12, "Newton tek adım");
  ok(K.runMethod(fn, "nag", bp.nag, x0, 50000).hit === 158 && K.runMethod(fn, "adam", { eta: 0.1 }, x0, 50000).hit === 685, "Nesterov 158, Adam 685");
}
{ // Rosenbrock: kaynak (minimum (1, 1)), ayrı GD döngüsü, Newton
  const R = K.ROSEN; near(R.f(1, 1), 0, 1e-15); near(Math.hypot(...R.g(1, 1)), 0, 1e-15);
  const h = 1e-6; for (const [x, y] of [[-1.2, 1], [0.3, -0.4]]) { const g = R.g(x, y); near(g[0], (R.f(x + h, y) - R.f(x - h, y)) / (2 * h), 1e-5); near(g[1], (R.f(x, y + h) - R.f(x, y - h)) / (2 * h), 1e-5); const H = R.h(x, y); near(H[1], (R.g(x, y + h)[0] - R.g(x, y - h)[0]) / (2 * h), 1e-5); }
  const e = K.eig2(R.h(1, 1)); near(e.hi, 1001.6, 1e-4, "Rosenbrock tabanında λ_max"); near(e.lo, 0.3994, 1e-3, "λ_min");
  let x = -1.2, y = 1, k = 0; const d0 = Math.hypot(2.2, 0); while (Math.hypot(x - 1, y - 1) > 1e-6 * d0 && k < 50000) { const a = -2 * (1 - x) - 400 * x * (y - x * x), b = 200 * (y - x * x); x -= 0.001 * a; y -= 0.001 * b; k++; }
  ok(K.runMethod(R, "gd", { eta: 0.001 }, R.start, 50000).hit === k && k === 32400, `Rosenbrock GD ${k}`);
  ok(K.runMethod(R, "newton", {}, R.start, 50).hit === 6, "Rosenbrock Newton 6 adım");
  ok(K.runMethod(R, "hb", { eta: 0.001, beta: 0.9 }, R.start, 50000).hit === 3051, "Rosenbrock ağır top");
}

/* ── 4. Çok minimumlu işlevler ── */
const WIKI = [[3, 2], [-2.805118, 3.131312], [-3.779310, -3.283186], [3.584428, -1.848126]];
K.HIMMEL_MIN.forEach((m, i) => { near(m[0], WIKI[i][0], 1e-6, "Himmelblau x (Wikipedia)"); near(m[1], WIKI[i][1], 1e-6, "y"); near(K.HIMMEL.f(m[0], m[1]), 0, 1e-20, "f = 0"); });
{ // kritik noktalar: sonlu farkla Hessian, gradyan üzerinde Newton (sayfanın Hessian'ı kullanılmaz)
  const F = K.HIMMEL, h = 1e-6, pts = [];
  const Hfd = (x, y) => { const gx1 = F.g(x + h, y), gx0 = F.g(x - h, y), gy1 = F.g(x, y + h), gy0 = F.g(x, y - h); return [(gx1[0] - gx0[0]) / (2 * h), (gy1[0] - gy0[0]) / (2 * h), (gy1[1] - gy0[1]) / (2 * h)]; };
  for (let x = -5; x <= 5; x += 0.5) for (let y = -5; y <= 5; y += 0.5) { let p = [x, y]; for (let i = 0; i < 60; i++) { const H = Hfd(...p), g = F.g(...p), det = H[0] * H[2] - H[1] * H[1]; if (Math.abs(det) < 1e-12) break; p = [p[0] - (H[2] * g[0] - H[1] * g[1]) / det, p[1] - (H[0] * g[1] - H[1] * g[0]) / det]; } if (Math.hypot(...F.g(...p)) < 1e-6 && Math.abs(p[0]) < 6 && Math.abs(p[1]) < 6 && !pts.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < 1e-5)) pts.push(p); }
  const kind = pts.map((p) => { const H = Hfd(...p), tr = H[0] + H[2], det = H[0] * H[2] - H[1] * H[1]; return det < 0 ? "eyer" : tr > 0 ? "min" : "max"; });
  ok(pts.length === 9 && kind.filter((k) => k === "min").length === 4 && kind.filter((k) => k === "eyer").length === 4, "9 kritik nokta: 4 minimum, 1 maksimum, 4 eyer");
  const mx = pts[kind.indexOf("max")]; near(mx[0], -0.270845, 1e-5, "yerel maksimum x"); near(mx[1], -0.923039, 1e-5); near(F.f(...mx), 181.617, 1e-5, "f = 181,617");
}
{ // Rastrigin: yerel minimum x ≈ 0,99496 (ikiye bölmeyle 2x + 20π sin 2πx = 0)
  let a = 0.9, b = 1; const g = (x) => 2 * x + 20 * Math.PI * Math.sin(2 * Math.PI * x); for (let i = 0; i < 100; i++) { const c = (a + b) / 2; if (g(a) * g(c) <= 0) b = c; else a = c; }
  const p = K.newtonPolish(K.RASTR, 1, 0); near(p[0], a, 1e-10, "Rastrigin yerel minimum"); near(K.RASTR.f(0, 0), 0, 1e-15, "küresel f = 0");
  const box = K.RASTR.box; ok(box[0] === -5.12 && box[1] === 5.12, "arama kutusu (Wikipedia)");
}
for (const id of ["himmel", "rastr"]) {
  const G = K.basinGrid(id, id === "himmel" ? 150 : 160), tot = G.nx * G.nx, R = K.restarts(id, 2000, 3);
  ok(G.cells.every((c) => c !== null) && R.fails === 0, `${id} her başlangıç bir minimuma iner`);
  let sum = 0; G.tally.forEach((v) => { sum += v; }); ok(sum === tot, "ızgara payları toplamı 1");
  ok(G.tally.size === (id === "himmel" ? 4 : 121), `${id} havza sayısı ${G.tally.size}`);
  G.tally.forEach((v, key) => { const f = (R.tally.get(key) || 0) / R.n, gf = v / tot, se = Math.sqrt(gf * (1 - gf) / R.n); ok(Math.abs(f - gf) < 4.5 * se + 1e-9, `${id} ${key}: ${f} ~ ${gf}`); });
  if (id === "himmel") { G.tally.forEach((v) => ok(v / tot > 0.22 && v / tot < 0.28, "Himmelblau payları dörtte bire yakın")); }
  else { const g0 = G.tally.get("0,0") / tot; ok(g0 > 0.006 && g0 < 0.014, `Rastrigin küresel havza payı ${g0}`); }
}
{ const R = K.restarts("himmel", 1000, 1); ok([0, 1, 2, 3].map((i) => R.tally.get(i)).join() === "245,265,235,255", "varsayılan başlangıç dağılımı"); }
{ // tavlama: belirlenimci; sıcak başlangıç açgözlüden açıkça iyi
  const a = K.anneal("rastr", { T0: 30, steps: 5000, sigma: 0.3, seed: 1001 }), b = K.anneal("rastr", { T0: 30, steps: 5000, sigma: 0.3, seed: 1001 }); ok(a.x === b.x && a.y === b.y, "aynı tohum aynı yol");
  const rate = (T0) => { let h = 0; for (let k = 1; k <= 200; k++) if (K.anneal("rastr", { T0, steps: 5000, sigma: 0.3, seed: 1000 + k }).key === "0,0") h++; return h / 200; };
  const hot = rate(30), cold = rate(0.001); ok(hot === 0.625 && cold === 0.13, `tavlama payları ${hot} ${cold}`); ok(hot - cold > 4 * Math.sqrt(hot * (1 - hot) / 200 + cold * (1 - cold) / 200), "fark anlamlı");
}

/* ── LP: kaba kuvvet ızgarası, köşe denetimi, dualite aralığı ── */
const G = K.LP_G, H = K.LP_H, feas = (x, y) => G.every((g, i) => g[0] * x + g[1] * y <= H[i] + 1e-12);
for (const c of [[3, 2], [1, 1], [-3, -1], [0.5, 5], [5, -3], [-1, 2]]) {
  const E = K.lpEnumerate(c, G, H); let best = -Infinity;
  for (let x = 0; x <= 4; x += 0.005) for (let y = 0; y <= 4; y += 0.005) if (feas(x, y)) best = Math.max(best, c[0] * x + c[1] * y);
  ok(best <= E.zmax + 1e-9 && E.zmax - best < 0.03, `LP kaba kuvvet ${c}: ${best} ${E.zmax}`);
  ok(E.V.length === 5 && E.V.every((v) => feas(v.x, v.y) && G.filter((g, i) => Math.abs(g[0] * v.x + g[1] * v.y - H[i]) < 1e-9).length >= 2), "köşeler uygun ve iki sınırın üstünde");
  const sw = K.lpSweep(c, G, H, 0.01); ok(sw <= E.zmax + 1e-9 && E.zmax - sw < 0.01 + 1e-9, `tarama ${sw}`);
  for (const mu of [10, 1, 0.1, 1e-2, 1e-4]) { const b = K.lpBarrier(c, G, H, mu, [1, 1]); ok(b.slacks.every((s) => s > 0), "iç nokta"); near(b.dualObj - b.z, 5 * mu, 1e-5, `dualite aralığı = mμ (${c}, ${mu})`); [0, 1].forEach((j) => near(b.duals.reduce((s, u, i) => s + u * G[i][j], 0), c[j], 1e-6, "Gᵀu = c")); ok(E.zmax - b.z <= 5 * mu * (1 + 1e-6), "asıl eksiklik ≤ mμ"); }
}
{ const E = K.lpEnumerate([3, 2], G, H); near(E.zmax, 11, 1e-12, "Z* = 11"); ok(E.best.length === 1 && E.best[0].x === 3 && Math.abs(E.best[0].y - 1) < 1e-12, "optimum (3, 1)"); const b = K.lpBarrier([3, 2], G, H, 1e-4, [1, 1]); near((11 - b.z) / 1e-4, 2, 1e-3, "asıl eksiklik ≈ 2μ (iki bağlayıcı kısıt)"); }
{ const E = K.lpEnumerate([1, 1], G, H); ok(E.best.length === 2, "kenara paralel: iki köşe"); const b = K.lpBarrier([1, 1], G, H, 1e-6, [1, 1]); near(b.x + b.y, 4, 1e-5, "x(μ) optimum kenarda"); ok(b.x > 1.5 && b.x < 3, "kenarın içinde"); }
console.log(`G optimizasyon: ${checks.toLocaleString("tr-TR")} bağımsız dışbükeylik, oran, momentum, havza, tavlama ve LP kontrolü PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  assert(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`, import.meta.url)), "defter dosyası gerekli");
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
      await page.waitForFunction(() => document.getElementById("c1Viol").textContent.length > 0);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, t) => { const v = await read(id); assert(v.includes(t), `${id}: "${v}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuval etiketleri");
      ok(await page.evaluate(() => [...document.querySelectorAll('input[type="range"]')].every((e) => { const st = Number(e.step), k = (Number(e.value) - Number(e.min)) / st; return Math.abs(k - Math.round(k)) < 1e-6; })), "varsayılanlar kaydırıcı ızgarasında");
      // 1 · Dışbükeylik
      await has("c1Gap", "1,00"); await has("c1GapNote", "ihlal"); await has("c1Viol", "1247 / 4000 (31,18 %)"); await has("c1D2Min", "−4,0000 (x = 0,000)"); await has("c1Verdict", "Dışbükey değil");
      await has("c1Ends", "2 farklı nokta"); await has("c1EndsNote", "x ≈ −1,057 (24 başlangıç, küresel"); await has("c1Mme", "1,00000"); await has("c1Lme", "3,00000"); await has("c1Kap", "3,00");
      await sel("c1Fn", "sq"); await has("c1Viol", "0 / 4000"); await has("c1Verdict", "Dışbükey"); await has("c1Ends", "1 nokta"); await has("c1Gap", "−1,00");
      await sel("c1Fn", "quart"); await has("c1MLNote", "güçlü dışbükey değil"); await has("c1Status", "2,7 × 10⁻³");
      await sel("c1Fn", "wavy"); await has("c1Ends", "3 farklı nokta"); await has("c1Viol", "1537 / 4000");
      await page.click("#c1Worst"); await has("c1A", ""); ok(Math.abs(Number(await page.locator("#c1A").inputValue()) - 1.4) < 1e-9, "en kötü ihlal a ızgarada"); await has("c1Status", "en kötü ihlale");
      await sel("c1Fn", "sq"); await page.click("#c1Worst"); await has("c1Status", "ihlal eden kiriş yok");
      await range("c1L1", -0.5); await has("c1Eig", "−0,500 · 3,000"); await has("c1Kap", "tanımsız"); await has("c1Viol2", "768 / 3000"); await has("c1Mme", "−0,50000");
      await range("c1L1", 0); await has("c1EigNote", "güçlü değil");
      await range("c1A", 0.5); await range("c1B", 0.5); await has("c1GapNote", "tek noktaya");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("c1Viol", "1247 / 4000"); await has("c1Eig", "1,000 · 3,000");
      // sekme klavyesi
      await page.locator("#tab-cv").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-lm").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-lr").getAttribute("aria-selected")) === "true", "ArrowRight");
      ok(await page.locator("#panel-cv").isHidden(), "tek panel görünür");
      // 2 · Öğrenme oranı
      await has("c2RateTh", "0,85000"); await has("c2RateMe", "0,85000"); await has("c2EtaC", "2,000000 · 2"); await has("c2EtaB", "1,81790 · 1,81818"); await has("c2RateB", "0,81806 · 0,81818");
      await has("c2Steps", "80 · 85,0"); await has("c2Zig", "100,0 % · kuram 100 %"); await has("c2Status", "Yakınsıyor");
      await page.click("#c2EBest"); await has("c2EtaOut", "1,818"); await has("c2Steps", "69 · 68,9"); await has("c2Status", "en iyi η");
      await page.click("#c2E2"); await has("c2RateMe", "1,00000"); await has("c2Steps", "yakınsamaz"); await has("c2Status", "tam sınırdır");
      await page.click("#c2E205"); await has("c2RateMe", "1,05000"); await has("c2Status", "Iraksıyor");
      await page.click("#c2E1"); await has("c2Zig", "—"); await has("c2ZigNote", "ilk adımda sıfırlanır"); await has("c2Steps", "123 · 131,1");
      await range("c2K", 2); await page.click("#c2EBest"); await has("c2EtaB", "1,98000 · 1,98020"); await has("c2Steps", "686 · 690,8"); await has("c2LamNote", "κ = 100 ·");
      await range("c2K", 3); await page.click("#c2EBest"); await has("c2LamNote", "κ = 1000 ·"); await has("c2Steps", "6902 · 6907,8"); await range("c2K", 1); await has("c2LamNote", "κ = 10,0 ·");
      await range("c2K", 0); await page.click("#c2E1"); await has("c2RateMe", "< 10⁻⁶"); await has("c2Status", "tek adım tam minimuma");
      await range("c2X", 0); await range("c2Y", 0); await has("c2Status", "Başlangıç tam minimumda"); await has("c2RateMe", "—");
      await range("c2K", 1); await range("c2X", 0); await range("c2Y", 0); await page.locator("h1").click(); await page.keyboard.press("r"); await has("c2RateMe", "0,85000");
      { await page.locator("#c2Map").scrollIntoViewIfNeeded(); const box = await page.locator("#c2Map").boundingBox(); await page.mouse.click(box.x + box.width * 0.75, box.y + box.height * 0.5); const x = Number(await page.locator("#c2X").inputValue()); ok(x > 1.5 && x < 3.5, `tıklama başlangıcı taşır ${x}`); await page.click("#c2Reset"); await has("c2XOut", "−4,0"); }
      // 3 · Yöntemler
      await page.click("#tab-mo");
      await has("c3Rows", "691 · 690,8"); await has("c3Rows", "87 · 68,8"); await has("c3Rows", "158 · 131,1"); await has("c3Rows", "685 · —");
      await has("c3HB", "0,81837 · 0,81818"); await has("c3Status", "κ = 100, "); await has("c3Speed", "7,94 · 10,03"); await has("c3Newton", "× ‖x₀ − x*‖");
      await range("c3K", 1); await has("c3Newton", "0 (tam)"); await range("c3K", 3); await has("c3Rows", "6908 · 6907,8"); await has("c3Speed", "23,42 · 31,63");
      await sel("c3Mode", "manual"); await has("c3EtaOut", "1,00"); ok(!/kullanılmıyor/.test(await read("c3EtaOut")), "elle kipte η etkin");
      await range("c3Beta", 0.99); await range("c3Eta", 0.4); await has("c3Status", "1'i aşıyor");
      await sel("c3Fn", "rosen"); ok((await page.locator("#c3Mode").inputValue()) === "manual" && (await page.locator("#c3KField").isHidden()), "Rosenbrock elle kip");
      await has("c3Rows", "32 400"); await has("c3Rows", "3051"); await has("c3Status", "Newton 6"); await has("c3NewtonNote", "6 adımda");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("c3Rows", "691 · 690,8"); ok((await page.locator("#c3Fn").inputValue()) === "quad", "R ikinci derecedene döner");
      // 4 · Havzalar ve LP
      await page.click("#tab-lm");
      await has("c4Rows", "(3,0000; 2,0000)"); await has("c4Rows", "24,5 ± 1,4 %"); await has("c4Rows", "25,58 %"); await has("c4NB", "4 · 4"); await has("c4SA", "—"); await has("c4Status", "en çok 0,80 standart hata");
      await has("c4Zenum", "11,000"); await has("c4Zsweep", "11,00"); await has("c4Gap", "0,5000 · 0,5000"); await has("c4PGap", "1,996 μ"); await has("c4Zline", "çokgeni kesiyor");
      await sel("c4Fn", "rastr"); await has("c4Glob", "1,00 ± 0,31 %"); await has("c4NB", "121 · 121"); await has("c4SA", "62,5 ± 3,4 %");
      await sel("c4T0", "0.001"); await has("c4SA", "13,0 ± 2,4 %"); await has("c4Status", "açgözlü");
      await page.click("#c4Tie"); await has("c4Zenum", "4,000"); await has("c4ZenumNote", "çoklu optimum"); await has("c4Zline", "dışında"); await has("c4LPStatus", "paralel");
      await range("c4Mu", -4); await has("c4Gap", "5,000 × 10⁻⁴ · 5,000 × 10⁻⁴"); await has("c4Bar", "(2,2188; 1,7811)");
      await range("c4C1", 0); await range("c4C2", 0); await has("c4Zenum", "her nokta optimum"); await has("c4Gap", "—");
      await page.click("#c4LPReset"); await has("c4Zenum", "11,000");
      await range("c4N", 5000); await has("c4NOut", "5000"); await page.click("#c4New"); ok((await page.locator("#c4Seed").inputValue()) === "2", "yeni tohum");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("c4Rows", "24,5 ± 1,4 %"); ok((await page.locator("#c4Fn").inputValue()) === "himmel", "R Himmelblau'ya döner");
      ok(await page.evaluate(() => { const d = document.querySelector(".digest"); return !!d && d.offsetHeight > 200 && d.textContent.includes("Vadiden Aşağı Akıllı Adımlar"); }), "defter görünür");
      ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      ok(await page.evaluate(() => Object.isFrozen(OptLab) && !Object.getOwnPropertyDescriptor(window, "OptLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G optimizasyon: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
