// Nüfus ekolojisi: çekirdeğin bağımsız denetimi (kapalı biçimler, ayrı yazılmış integratör ve determinant,
// kaba kuvvet arama, sayısal integral) ve isteğe bağlı tarayıcı denetimi (390 px açık, 1280 px koyu).
// Kullanım: node scripts/check-g-nufus-ekolojisi.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "nufus-ekolojisi";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.PopLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
assert(!/[̀-ͯ⃐-⃿]/.test(html), "sayfada birleşik işaret yok"); checks++;

/* ── 1. Lojistik: ayrı bir integratör (Dormand–Prince değil, küçük adımlı orta nokta + Richardson) ve kapalı biçim ── */
function midpoint(f, y0, T, n) { let y = y0; const h = T / n; for (let i = 0; i < n; i++) { const k = f(y); y += h * f(y + 0.5 * h * k); } return y; }
for (const [r, Kc, N0] of [[0.5, 1000, 10], [1.3, 250, 3], [0.1, 5000, 900], [2, 100, 150], [0.05, 4000, 1]]) {
  const f = (x) => r * x * (1 - x / Kc), T = K.horizon(r, Kc, N0);
  const a = midpoint(f, N0, T, 20000), b = midpoint(f, N0, T, 40000), rich = b + (b - a) / 3;
  near(K.logistic(T, N0, r, Kc), rich, 1e-9, "kapalı biçim");
  const p = K.growthPath({ r, K: Kc, N0, dt: T / Math.round(T * r / 0.05), T });
  near(p.N[p.N.length - 1], rich, 1e-6, "RK4 son değer");
  // ikiye katlanma: kapalı biçimi ikiye bölmeyle çöz
  if (2 * N0 < Kc) { let lo = 0, hi = 50 / r; for (let i = 0; i < 100; i++) { const m = (lo + hi) / 2; if (K.logistic(m, N0, r, Kc) < 2 * N0) lo = m; else hi = m; } near(K.doublingTheory(r, Kc, N0).log, lo, 1e-10, "katlanma formülü"); near(K.crossTime(p, 2 * N0), lo, 2e-4, "ölçülen katlanma"); }
  if (N0 < Kc / 2) { const it = K.inflectionTheory(r, Kc, N0); near(K.logistic(it.t, N0, r, Kc), Kc / 2, 1e-10, "büküm K/2"); const m = K.inflection(p); near(m.t, it.t, 2e-3 / r, "ölçülen büküm"); near(m.N, Kc / 2, 2e-3, "büküm N"); near(m.rate, r * Kc / 4, 1e-4, "en büyük hız rK/4"); }
}
{ const p = K.growthPath({ r: 0.5, K: Infinity, N0: 10, dt: 0.5, T: 16 }); near(K.crossTime(p, 20), Math.LN2 / 0.5, 1e-4, "üstel katlanma"); ok(K.inflection(p) === null, "üstelde büküm yok"); near(p.N[32], 10 * Math.exp(8), 3e-4, "üstel RK4"); }
ok(K.inflection(K.growthPath({ r: 0.5, K: 1000, N0: 600, dt: 0.5, T: 9 })) === null, "N₀ ≥ K/2'de büküm yok");
{ // RK4 hata mertebesi: Δt yarıya inince ≈ 16 kat
  const err = (dt) => { const p = K.growthPath({ r: 0.5, K: 1000, N0: 10, dt, T: 20 }); let m = 0; p.N.forEach((v, i) => { m = Math.max(m, Math.abs(v - K.logistic(p.t[i], 10, 0.5, 1000))); }); return m; };
  const e1 = err(1), e2 = err(0.5), e3 = err(0.25); ok(e1 / e2 > 10 && e2 / e3 > 13 && e2 / e3 < 19, `RK4 dördüncü mertebe ${e1 / e2} ${e2 / e3}`);
}
near(K.horizon(0.5, 1000, 10), 20, 0, "varsayılan T");
{ // uydurma: gürültüsüz veri kesin; gürültülü veride kaba kuvvet aramadan kötü değil; tohumlar üzerinden yansızlığa yakın
  const d0 = K.makeData({ r: 0.5, K: 1000, N0: 10, T: 20, n: 20, sigma: 0, seed: 1 }), f0 = K.fitLogistic(d0.ts, d0.ys);
  near(f0.r, 0.5, 1e-7, "kesin r"); near(f0.K, 1000, 1e-7, "kesin K"); near(f0.N0, 10, 1e-6, "kesin N₀");
  const model = (p, t) => p[1] / (1 + (p[1] / p[2] - 1) * Math.exp(-p[0] * t));
  for (const seed of [1, 2, 3]) {
    const d = K.makeData({ r: 0.5, K: 1000, N0: 10, T: 20, n: 20, sigma: 0.1, seed }), f = K.fitLogistic(d.ts, d.ys);
    const rss = (p) => d.ts.reduce((s, t, i) => s + (d.ys[i] - model(p, t)) ** 2, 0);
    let best = [0.5, 1000, 10], bf = rss(best);
    for (let r = 0.3; r <= 0.8; r += 0.01) for (let Kc = 800; Kc <= 1200; Kc += 10) for (let N0 = 2; N0 <= 30; N0 += 1) { const v = rss([r, Kc, N0]); if (v < bf) { bf = v; best = [r, Kc, N0]; } }
    let h = [0.005, 5, 0.5]; while (h[0] > 1e-10) { let moved = false; for (let k = 0; k < 3; k++) for (const sg of [1, -1]) { const q = best.slice(); q[k] += sg * h[k]; if (q[k] > 0) { const v = rss(q); if (v < bf) { bf = v; best = q; moved = true; } } } if (!moved) h = h.map((x) => x / 2); }
    ok(f.rss <= bf * (1 + 1e-9), `LM ≤ kaba kuvvet (${seed}): ${f.rss} ${bf}`); near(f.r, best[0], 1e-4, "aynı minimum r"); near(f.K, best[1], 1e-4, "aynı minimum K");
  }
  let sr = 0, sK = 0; const n = 60; for (let seed = 1; seed <= n; seed++) { const d = K.makeData({ r: 0.5, K: 1000, N0: 10, T: 20, n: 20, sigma: 0.1, seed }), f = K.fitLogistic(d.ts, d.ys); sr += f.r; sK += f.K; }
  near(sr / n, 0.5, 0.03, "ortalama r"); near(sK / n, 1000, 0.02, "ortalama K");
  const d = K.makeData({ r: 0.5, K: 1000, N0: 10, T: 20, n: 20, sigma: 0.1, seed: 1 }), f = K.fitLogistic(d.ts, d.ys);
  near(f.r, 0.48464, 1e-4, "varsayılan r"); near(f.K, 984.274, 1e-5, "varsayılan K");
}

/* ── 2. Ayrık zaman: türevler, kapalı 2-döngü, Lyapunov, ikilenme noktaları ── */
for (const m of ["ricker", "logistic"]) for (const r of [0.5, 1.7, 2.9, 3.7]) for (const x of [0.1, 0.5, 0.9]) { const M = K.MAPS[m], h = 1e-6; near(M.d(r, x), (M.f(r, x + h) - M.f(r, x - h)) / (2 * h), 1e-7, "türev"); }
for (const r of [3.1, 3.2, 3.4]) { // lojistik haritada 2-döngü: (r + 1 ± √((r − 3)(r + 1)))/(2r)
  const A = K.analyse("logistic", r, 0.2), s = Math.sqrt((r - 3) * (r + 1)), c = [(r + 1 - s) / (2 * r), (r + 1 + s) / (2 * r)];
  ok(A.period === 2, "2-döngü"); near(A.cycle[0], c[0], 1e-8, "alt"); near(A.cycle[1], c[1], 1e-8, "üst");
  near(A.lyap, 0.5 * Math.log(Math.abs(4 + 2 * r - r * r)), 1e-6, "2-döngü λ");
}
for (const r of [0.5, 1.2, 1.5, 1.9]) { const A = K.analyse("ricker", r, 0.2); ok(A.period === 1, "Ricker denge"); near(A.cycle[0], 1, 1e-9, "x* = 1"); near(A.lyap, Math.log(Math.abs(1 - r)), 1e-6, "λ = ln|1 − r|"); }
{ const A = K.analyse("logistic", 0.5, 0.2); ok(A.extinct, "r < 1 söner"); near(A.lyap, Math.log(0.5), 1e-12, "λ = ln r"); }
near(K.analyse("logistic", 4, 0.2).lyap, Math.LN2, 2e-3, "r = 4'te ln 2");
ok(K.analyse("ricker", 2.3, 0.2).period === 2 && K.analyse("ricker", 2.6, 0.2).period === 4 && K.analyse("ricker", 3, 0.2).period === null && K.analyse("ricker", 3, 0.2).lyap > 0.3, "Ricker hazır ayarları");
ok(K.analyse("logistic", 2.8, 0.2).period === 1 && K.analyse("logistic", 3.5, 0.2).period === 4 && K.analyse("logistic", 3.9, 0.2).lyap > 0.4, "lojistik hazır ayarları");
ok(K.analyse("logistic", 3.83, 0.2).period === 3, "üç periyot penceresi");
near(K.measureDoubling("ricker", 1), 2, 1e-4, "Ricker r₁"); near(K.measureDoubling("logistic", 1), 3, 1e-4, "lojistik r₁");
near(K.measureDoubling("logistic", 2), 1 + Math.sqrt(6), 1e-5, "lojistik r₂"); near(K.secondDoublingTheory("logistic"), 1 + Math.sqrt(6), 1e-9, "1 + √6");
{ // Ricker r₂: 2-döngüyü x'te ikiye bölerek bul, çarpan −1'i r'de ikiye bölerek bul (Newton yok)
  const f = (r, x) => x * Math.exp(r * (1 - x)), d = (r, x) => Math.exp(r * (1 - x)) * (1 - r * x);
  const upper = (r) => { let lo = 1 + 1e-9, hi = 1 + r; const g = (x) => f(r, f(r, x)) - x; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (g(lo) * g(m) <= 0) hi = m; else lo = m; } return lo; };
  const mu = (r) => { const a = upper(r); return d(r, a) * d(r, f(r, a)); };
  let lo = 2.1, hi = 2.9; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (mu(m) > -1) lo = m; else hi = m; }
  near(K.secondDoublingTheory("ricker"), lo, 1e-8, "Ricker r₂ kuramı"); near(K.measureDoubling("ricker", 2), lo, 2e-5, "Ricker r₂ ölçülen"); near(lo, 2.52647, 1e-5, "2,5265");
}
{ const s = K.separation("logistic", 4, 0.2, 1e-6), est = Math.log(0.1 / 1e-6) / Math.LN2; ok(Math.abs(s - est) < 5, `ayrılma ${s} ~ ${est}`); ok(K.separation("ricker", 1.5, 0.2, 1e-6) === null, "kararlıda ayrılma yok"); }
{ const b = K.bifurcation("ricker", 50); ok(b.rs.length === 50 && b.pts.length === 50 * b.keep, "çatallanma boyutu"); }

/* ── 3. Leslie: ayrı determinant, analitik özvektörler ── */
function det(M) { const A = M.map((r) => r.slice()), n = A.length; let dd = 1; for (let c = 0; c < n; c++) { let p = c; for (let i = c + 1; i < n; i++) if (Math.abs(A[i][c]) > Math.abs(A[p][c])) p = i; if (A[p][c] === 0) return 0; if (p !== c) { [A[p], A[c]] = [A[c], A[p]]; dd = -dd; } dd *= A[c][c]; for (let i = c + 1; i < n; i++) { const f = A[i][c] / A[c][c]; for (let j = c; j < n; j++) A[i][j] -= f * A[c][j]; } } return dd; }
function cdet(L, z) { // karmaşık det(L − zI), tamsayı olmayan küçük boyut için kofaktör açılımı
  const n = L.length, M = L.map((row, i) => row.map((v, j) => [v - (i === j ? z[0] : 0), i === j ? -z[1] : 0]));
  const mul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const rec = (rows, cols) => { if (rows.length === 1) return M[rows[0]][cols[0]]; let s = [0, 0]; cols.forEach((c, k) => { const t = mul(M[rows[0]][c], rec(rows.slice(1), cols.filter((x) => x !== c))); s = k % 2 ? [s[0] - t[0], s[1] - t[1]] : [s[0] + t[0], s[1] + t[1]]; }); return s; };
  return rec([...Array(n).keys()], [...Array(n).keys()]);
}
const r01 = K.rng(11);
const cases = [{ F: [0, 1.2, 1.5, 0.8], P: [0.6, 0.5, 0.3] }, { F: [0, 0.6, 0.8, 0.4], P: [0.5, 0.4, 0.3] }, { F: [0, 0, 0, 2, 3], P: [0.3, 0.5, 0.7, 0.8] }, { F: [0.5, 1.5, 1], P: [0.8, 0.5] }];
for (let k = 0; k < 40; k++) { const n = 3 + (k % 3); cases.push({ F: Array.from({ length: n }, () => (r01() < 0.25 ? 0 : 3 * r01())), P: Array.from({ length: n - 1 }, () => 0.05 + 0.9 * r01()) }); }
for (const { F, P } of cases) {
  const L = K.lesliem(F, P), lam = K.eulerLotka(F, P);
  if (!(lam > 0)) continue;
  near(det(L.map((row, i) => row.map((v, j) => v - (i === j ? lam : 0)))), 0, 1e-9, "det(L − λI) = 0");
  const eig = K.eigenvalues(F, P);
  near(eig[0].mod, lam, 1e-9, "en büyük modül λ₁");
  eig.forEach((e) => { const v = cdet(L, [e.re, e.im]); ok(Math.hypot(v[0], v[1]) < 1e-8 * (1 + lam ** F.length), "her özdeğer det = 0"); });
  const pw = K.powerIter(L);
  if (eig.length > 1 && eig[1].mod < lam * (1 - 1e-3)) {
    near(pw.lambda, lam, 1e-10, "kuvvet yinelemesi"); const w = K.stableAnalytic(F, P, lam); pw.vec.forEach((v, i) => near(v, w[i], 1e-8, "kararlı dağılım"));
    // üreme değeri: vᵢ = λ^(i−1)/lᵢ Σ_(j≥i) Fⱼ lⱼ λ^(−j)
    const l = K.survivorship(P, F.length), vA = l.map((li, i) => (li > 0 ? lam ** i / li * F.reduce((s, f, j) => s + (j >= i ? f * l[j] * lam ** -(j + 1) : 0), 0) : NaN)), left = K.powerIter(L, true);
    vA.forEach((v, i) => { if (Number.isFinite(v) && left.vec[0] > 0) near(left.vec[i] / left.vec[0], v / vA[0], 1e-7, "üreme değeri"); });
    const R0 = K.netCoeffs(F, P).reduce((a, b) => a + b, 0); ok((R0 > 1) === (lam > 1) || Math.abs(R0 - 1) < 1e-12, "R₀ > 1 ⇔ λ > 1");
  }
}
{ // ilkel olmayan: yalnız son sınıf doğurur
  const F = [0, 0, 4], P = [0.5, 0.5], eig = K.eigenvalues(F, P); near(K.eulerLotka(F, P), 1, 1e-12, "λ₁ = 1"); eig.forEach((e) => near(e.mod, 1, 1e-9, "üç kök birim çemberde"));
  const pr = K.project(F, P, [1000, 0, 0], 6); ok(pr[3][0] === 1000 && pr[6][0] === 1000, "üç adımda bir yinelenir"); ok(!K.powerIter(K.lesliem(F, P)).converged, "kuvvet yinelemesi yakınsamaz");
}
{ const F = [0, 1.2, 1.5, 0.8], P = [0.6, 0.5, 0.3], pr = K.project(F, P, [1000, 0, 0, 0], 30), tot = pr.map((x) => x.reduce((a, b) => a + b, 0));
  near(K.eulerLotka(F, P), 1.0920012, 1e-6, "varsayılan λ₁"); near(tot[30] / tot[29], K.eulerLotka(F, P), 1e-8, "projeksiyon oranı");
  const eig = K.eigenvalues(F, P), rho = eig[0].mod / eig[1].mod; near(rho, 2.14299, 1e-4, "varsayılan ρ");
  const d = K.distances(pr, K.powerIter(K.lesliem(F, P)).vec), fit = K.decayFit(d); near(fit.rho, rho, 0.005, "ölçülen ρ"); near(tot[30], 10714, 1e-4, "N(30)"); }
ok(K.eulerLotka([0, 0, 0], [0.5, 0.5]) === 0 && K.powerIter(K.lesliem([0, 0, 0], [0.5, 0.5])).dead, "doğurganlık yok");

/* ── 4. Rekabet, Allee, hasat ── */
for (const p of [{ K1: 500, K2: 400, a12: 0.5, a21: 0.6 }, { K1: 500, K2: 400, a12: 0.5, a21: 1.2 }, { K1: 400, K2: 500, a12: 1.2, a21: 0.5 }, { K1: 500, K2: 500, a12: 1.5, a21: 1.5 }, { K1: 800, K2: 300, a12: 0.2, a21: 0.1 }]) {
  const q = { ...p, r1: 1, r2: 0.8, N1: 20, N2: 20 }, th = K.compTheory(p), f = K.compRHS(q);
  // kuram sınıfı: E₁'de tür 2'nin istila hızı ve E₂'de tür 1'in istila hızı (sınır dengelerinin Jacobi'si yerine doğrudan)
  const inv2 = q.r2 * (1 - p.a21 * p.K1 / p.K2), inv1 = q.r1 * (1 - p.a12 * p.K2 / p.K1);
  const expect = inv1 > 0 && inv2 > 0 ? "coexist" : inv1 > 0 ? "one" : inv2 > 0 ? "two" : "bistable";
  ok(th.outcome === expect, `sonuç ${th.outcome} ${expect}`);
  if (th.star) { const g = f(th.star); ok(Math.abs(g[0]) + Math.abs(g[1]) < 1e-9, "E* sıfır büyüme"); }
  const run = K.compRun(q); ok(run.conv, "yakınsadı");
  const tgt = expect === "coexist" ? th.star : expect === "one" ? th.E1 : expect === "two" ? th.E2 : (run.end[0] > run.end[1] ? th.E1 : th.E2);
  near(run.end[0], tgt[0], 1e-6, "son N₁"); near(run.end[1], tgt[1], 1e-6, "son N₂");
  if (th.star) { const J = K.compJacobian(q, th.star), h = 1e-5; for (let j = 0; j < 2; j++) { const a = th.star.slice(), b = th.star.slice(); a[j] += h; b[j] -= h; const fa = f(a), fb = f(b); for (let i = 0; i < 2; i++) near(J[i][j], (fa[i] - fb[i]) / (2 * h), 1e-6, "Jacobi"); } }
}
{ // simetrik çift kararlı: ayrıç N₁ = N₂ (r₁ = r₂)
  const base = { K1: 500, K2: 500, a12: 1.5, a21: 1.5, r1: 1, r2: 1 };
  ok(K.compRun({ ...base, N1: 210, N2: 200 }).end[0] > 499, "N₁ > N₂ → tür 1"); ok(K.compRun({ ...base, N1: 200, N2: 210 }).end[1] > 499, "N₂ > N₁ → tür 2");
}
ok(K.compTheory({ K1: 500, K2: 500, a12: 1, a21: 1 }).outcome === "border", "dejenere");
for (const [r, A, Kc] of [[0.5, 100, 1000], [1, 300, 600], [0.2, 50, 2000], [2, 800, 900]]) {
  const t = K.alleeThreshold(r, A, Kc); near(t.value, A, 1e-5, "Allee eşiği"); ok(t.halfWidth < 1e-5 * A, "eşik aralığı");
  ok(K.alleeFate(r, A, Kc, A * 0.98).fate === "extinct" && K.alleeFate(r, A, Kc, A * 1.02).fate === "K", "eşiğin iki yanı");
}
ok(K.alleeThreshold(0.5, 900, 500) === null, "A ≥ K");
for (const [r, Kc] of [[0.5, 1000], [1.2, 300], [0.1, 2000]]) {
  const q = K.quotaThreshold(r, Kc); ok(q.value >= r * Kc / 4 * (1 - 1e-6) && q.value <= r * Kc / 4 * (1 + 3e-5), `kota eşiği ${q.value / (r * Kc / 4) - 1}`);
  const sc = K.effortScan(r, Kc); near(sc.yMax, r * Kc / 4, 1e-6, "en büyük verim"); near(sc.eOpt, r / 2, 1e-6, "en iyi çaba"); near(sc.nOpt, Kc / 2, 1e-6, "N = K/2");
}
function simpson(g, a, b, n = 20000) { const h = (b - a) / n; let s = g(a) + g(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * g(a + i * h); return s * h / 3; }
for (const [H, N0] of [[150, 1000], [138, 1000], [126, 600], [100, 200], [100, 50], [125, 300]]) {
  const r = 0.5, Kc = 1000, g = (N) => 1 / (H - r * N * (1 - N / Kc)), tq = simpson(g, 0, N0);
  const th = K.harvTheory("quota", r, Kc, H, N0), run = K.harvRun("quota", r, Kc, H, N0);
  near(th.tCollapse, tq, 1e-6, `çöküş formülü H=${H}`); ok(run.collapsed, "çöktü"); near(run.tCollapse, tq, 1e-5, "ölçülen çöküş");
}
{ const th = K.harvTheory("quota", 0.5, 1000, 100, 1000); [th.hi, th.lo].forEach((N) => near(0.5 * N * (1 - N / 1000), 100, 1e-12, "denge")); const run = K.harvRun("quota", 0.5, 1000, 100, 1000); ok(!run.collapsed, "çökmez"); near(run.end, th.hi, 1e-8, "N₊"); }
{ const run = K.harvRun("effort", 0.5, 1000, 0.2, 1000); near(run.end, 600, 1e-8, "çabada N*"); }
console.log(`G nüfus: ${checks.toLocaleString("tr-TR")} bağımsız büyüme, harita, Leslie, rekabet, Allee ve hasat kontrolü PASS`);

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
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); }); // defter yazıldı: 404 artık hata
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      await page.waitForFunction(() => document.getElementById("g1Exact").textContent !== "", null, { timeout: 15000 });
      await page.waitForSelector("section.digest", { state: "visible", timeout: 8000 }); checks++;
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, t) => { const v = await read(id); assert(v.includes(t), `${id}: "${v}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuval etiketleri");
      ok(await page.evaluate(() => [...document.querySelectorAll('input[type="range"]')].every((e) => Math.abs(Math.round((e.value - e.min) / e.step) * e.step - (e.value - e.min)) < 1e-9)), "varsayılanlar adıma oturuyor");
      // 1 · büyüme
      await has("g1Exact", "996"); await has("g1TdTh", "1,386 gün"); await has("g1TdMe", "1,407 gün"); await has("g1TdD", "+0,015 %"); await has("g1InfTh", "9,190 gün"); await has("g1InfMe", "9,190 gün");
      await has("g1MaxErr", "1,8 × 10⁻⁵"); await has("g1FitR", "0,485 /gün"); await has("g1FitK", "984 (1000)"); await has("g1Status", "rK/4 = 125,0");
      await sel("g1Mode", "exp"); await has("g1TdMe", "1,386 gün"); await has("g1InfMe", "tanımsız"); await has("g1FitR", "yalnız lojistikte"); await page.check("#g1Log");
      await sel("g1Mode", "log"); await range("g1N0", 600); await has("g1TdMe", "tanımsız: 2N₀ ≥ K"); await has("g1Status", "büküm noktası yoktur");
      await range("g1N0", 2000); await has("g1Status", "taşıma kapasitesinin üstünde"); await range("g1N0", 1000); await has("g1Status", "denge noktasındasın");
      await range("g1N0", 10); await sel("g1Dt", "2"); await has("g1Status", "RK4 adımı rΔt = 1,00"); await sel("g1Dt", "0.5");
      await range("g1Sigma", 0); await has("g1FitRD", "fark 0,0 %"); await has("g1Status", "yuvarlama düzeyinde");
      await page.click("#g1New"); ok((await page.locator("#g1Seed").inputValue()) === "2", "yeni tohum");
      await range("g1R", 2); await range("g1K", 5000); await range("g1R", 0.05); await range("g1K", 100); await range("g1N0", 1); ok((await read("g1Exact")) !== "—", "sınır değerler");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("g1FitR", "0,485 /gün"); ok(!(await page.locator("#g1Log").isChecked()), "R logaritmayı kapatır");
      await page.keyboard.press("Space"); ok((await read("g1Play")) === "Duraklat", "boşluk oynatır");
      await page.waitForTimeout(400); ok(!/t = 20,0/.test(await read("g1Cur")), "imleç ilerliyor");
      await page.keyboard.press("Space"); ok(/Devam et/.test(await read("g1Play")), "boşluk duraklatır");
      await page.click("#g1Reset"); await has("g1Cur", "t = 20,0 gün");
      // sekme klavyesi
      await page.locator("#tab-growth").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-comp").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-chaos").getAttribute("aria-selected")) === "true", "ArrowRight");
      ok(await page.locator("#panel-growth").isHidden(), "tek panel görünür");
      // 2 · kaos
      await has("c2Class", "denge"); await has("c2Lyap", "−0,6931"); await has("c2R1", "2,0000"); await has("c2R2", "2,5265"); await has("c2Sep", "hiç");
      await page.click("#c2P2"); await has("c2Class", "2-döngü"); await has("c2ClassV", "0,408 · 1,592");
      await page.click("#c2P3"); await has("c2Class", "4-döngü");
      await page.click("#c2P4"); await has("c2Class", "kaos"); { const ly = +(await read("c2Lyap")).replace(",", "."); ok(ly > 0.378 && ly < 0.394, `kaos λ ${ly} (uzun dönem ≈ 0,386; 20 000 kuşaklık kestirim platforma göre oynar)`); } await has("c2SepTh", "ln(0,1/δ)/λ = 2"); await has("c2Status", "20 000 kuşaklık bir ortalamadır");
      await range("c2R", 2); await has("c2Class", "yakınsamadı"); await has("c2Status", "çatallanma");
      await sel("c2Model", "logistic"); await has("c2P1", "r = 2,8"); await range("c2R", 4); await has("c2LyapTh", "ln 2"); await has("c2R2D", "1 + √6");
      await range("c2R", 3.2); await has("c2LyapTh", "−0,9163"); await range("c2R", 0.5); await has("c2Class", "söner"); await has("c2Lyap", "−0,6931");
      await range("c2R", 4); await range("c2X0", 0.5); await has("c2Status", "kesin olarak 0");
      await range("c2R", 0.05); await range("c2X0", 0.99); await range("c2Gen", 200); await sel("c2Delta", "1e-9"); ok((await read("c2Class")).length > 0, "sınır");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("c2Class", "denge"); ok((await page.locator("#c2Model").inputValue()) === "ricker", "R modeli geri alır");
      // 3 · Leslie
      await page.click("#tab-leslie");
      await has("l3Lam", "1,09200"); await has("l3Pow", "1,09200"); await has("l3Obs", "1,09200"); await has("l3R0", "1,2420"); await has("l3L2", "ρ = 2,1430"); await has("l3RhoMe", "2,1451"); await has("l3Conv1", "8 adım"); await has("l3NowN", "10\u202f714");
      ok((await page.locator("#l3Rows tr").count()) === 4, "4 satır"); await has("l3Rows", "53,47 %");
      await page.click("#l3PC"); await has("l3Status", "ilkel değil"); await has("l3Conv1", "hiç"); ok((await page.locator("#l3Rows tr").count()) === 3, "3 satır"); await has("l3Rows", "57,14 %"); await has("l3Rows", "4,000"); { const t = await page.locator("#l3Rows").innerText(); ok(!t.includes("8,000") && !t.includes("47,06"), "ilkel olmayan matriste kapalı biçim kararlı dağılım ve üreme değeri"); } ok(await page.locator("#l3F4").isHidden(), "F₄ gizli");
      await page.click("#l3PD"); await has("l3Lam", "0,84442"); await has("l3Status", "T'yi uzat"); await range("l3T", 100); await has("l3ObsD", "fark +0,1673 %");
      await page.click("#l3PB"); await has("l3LamR", "yarılanma");
      await page.click("#l3PA"); await sel("l3Init", "stable"); await has("l3Status", "zaten kararlı");
      await page.locator("#l3F2").fill("abc"); await has("l3Status", "Girdi hatası"); ok((await page.locator("#l3F2").getAttribute("aria-invalid")) === "true", "geçersiz işaretli");
      await page.locator("#l3F2").fill("1,2"); await has("l3Lam", "1,09200");
      await page.locator("#l3P1").fill("1.5"); await has("l3Status", "Girdi hatası"); await page.locator("#l3P1").fill("0,6");
      await sel("l3N", "5"); ok(await page.locator("#l3F5").isVisible(), "F₅ görünür");
      await range("l3View", 0); await has("l3NowN", "t = 0");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("l3Lam", "1,09200"); await has("l3Conv1", "8 adım");
      // 4 · rekabet, Allee, hasat
      await page.click("#tab-comp");
      await has("k4OutTh", "birlikte yaşama"); await has("k4OutMe", "birlikte yaşama"); await has("k4EqMe", "(428,57; 142,86)"); await has("k4Jac", "−0,1776");
      await page.click("#k4P2"); await has("k4OutMe", "tür 1 kazandı"); await page.click("#k4P3"); await has("k4OutMe", "tür 2 kazandı"); await has("t4Status", "Tür 2'nin");
      await page.click("#k4P4"); await has("k4OutTh", "çift kararlı"); await has("k4OutMe", "tür 1 kazandı");
      { await page.locator("#t4Phase").scrollIntoViewIfNeeded(); const box = await page.locator("#t4Phase").boundingBox(); await page.mouse.click(box.x + box.width * 0.2, box.y + box.height * 0.3); await has("k4OutMe", "tür 2 kazandı"); }
      await range("k4A12", 1); await range("k4A21", 1); await has("k4OutTh", "sınırda"); await has("t4Status", "üst üste");
      await range("k4A12", 0); await range("k4A21", 2); await range("k4K1", 1000); await range("k4K2", 100); ok((await read("k4OutMe")).length > 0, "uç değerler");
      await sel("t4Model", "allee"); ok(await page.locator("#t4StatsComp").isHidden(), "rekabet kartları gizli");
      await has("a4Me", "100,0000"); await has("a4Fate", "söner"); await range("a4N0", 110); await has("a4Fate", "K'ye ulaşır");
      await range("a4A", 900); await range("a4K", 500); await has("t4Status", "A ≥ K"); await range("a4K", 2000); await has("a4Me", "900,0");
      await sel("t4Model", "harv"); await has("h4MsyTh", "125,00"); await has("h4MsyMe", "125,00"); await has("h4Scan", "E = 0,2500"); await has("h4EqMe", "723,61");
      await page.click("#h4AtMsy"); await has("h4EqTh", "yarı kararlı"); await page.click("#h4Over"); await has("h4Coll", "31,23 gün · 31,23");
      await range("h4H", 100); await range("h4N0", 200); await has("t4Status", "kararsız eşik"); await has("h4Coll", "4,30");
      await sel("h4Mode", "effort"); ok(await page.locator("#h4HField").isHidden(), "kota gizli"); await range("h4N0", 1000); await has("h4EqMe", "600,00");
      await range("h4E", 0.6); await has("t4Status", "E ≥ r"); await range("h4E", 2); await range("h4R", 2); await range("h4K", 2000); ok((await read("h4MsyTh")).includes("1000,00"), "rK/4 = 1000");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("k4EqMe", "(428,57; 142,86)"); ok((await page.locator("#t4Model").inputValue()) === "comp", "R modeli geri alır");
      ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      ok(await page.evaluate(() => Object.isFrozen(PopLab) && !Object.getOwnPropertyDescriptor(window, "PopLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G nüfus: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
