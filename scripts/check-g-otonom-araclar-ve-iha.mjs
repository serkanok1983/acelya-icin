// G: Otonom araçlar ve İHA laboratuvarı. Çekirdek (KERNEL) sayfadan okunur; başvurular sayfanın
// formüllerini yinelemez: kapalı çözümler, başka tümleyiciler (küçük adımlı Euler), kaba kuvvet
// sayımı, Kalata'nın alfa-beta kapalı biçimi ve genel matrisli ayrı bir Kalman uygulaması.
// Kullanım: node scripts/check-g-otonom-araclar-ve-iha.mjs [--browser]
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const SLUG = "otonom-araclar-ve-iha";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.OtonomLab;
assert(K && Object.isFrozen(K), "OtonomLab dondurulmuş olmalı");

let checks = 0;
const SOFT = process.env.SOFT === "1";
const near = (actual, expected, tol, msg = "") => { const good = Number.isFinite(actual) && Math.abs(actual - expected) <= tol; if (SOFT && !good) console.log("FAIL", msg, actual, expected, tol); else assert(good, `${msg} ${actual} ≠ ${expected} (±${tol})`); checks++; };
const rel = (actual, expected, tol, msg = "") => near(actual, expected, tol * Math.abs(expected), msg);
const ok = (cond, msg) => { if (SOFT && !cond) console.log("FAIL", msg); else assert(cond, msg); checks++; };
const g = 9.81, RAD = Math.PI / 180;

/* ---------- 0. yardımcılar ---------- */
{
  const r = K.polyRoots([1, -6, 11, -6]).map((z) => z.re).sort((a, b) => a - b);
  near(r[0], 1, 1e-9); near(r[1], 2, 1e-9); near(r[2], 3, 1e-9);
  for (const co of [[0.05, 1.01, 3.2, 8, 0], [0.1, 1.02, 3.2, 60, 4], [2, 3, 5, 7, 11], [1, 0, 1]]) {
    const c = co[co.length - 1] === 0 && co.length === 5 ? co.slice(0, 4) : co;
    for (const z of K.polyRoots(c)) {
      let pr = 0, pi = 0;
      for (const a of c) { const t = pr * z.re - pi * z.im + a; pi = pr * z.im + pi * z.re; pr = t; }
      ok(Math.hypot(pr, pi) < 1e-7 * Math.max(...c.map(Math.abs)), "kök çok terimliyi sıfırlamalı");
    }
  }
  const gs = K.gaussSource(12345);
  let s1 = 0, s2 = 0, s4 = 0;
  const N = 200000;
  for (let i = 0; i < N; i++) { const x = gs(); s1 += x; s2 += x * x; s4 += x * x * x * x; }
  near(s1 / N, 0, 0.01, "Gauss ortalama"); near(s2 / N, 1, 0.015, "Gauss varyans"); near(s4 / N, 3, 0.08, "Gauss dördüncü moment");
  ok(K.gaussSource(5)() === K.gaussSource(5)(), "tohum yinelenebilir olmalı");
}

/* ---------- 1. PID ---------- */
{
  /* (a) τ = 0, Ki = 0, doyma yok: m z'' + (b+Kd) z' + Kp z = Kp·adım. Başvuru: kapalı çözümün sık örneklenmesi. */
  for (const [Kp, Kd, step] of [[8, 3, 1], [20, 2, 1], [40, 1, 2.5], [4, 3, 0.5], [12, 0, 1]]) {
    const m = 1, b = 0.2, wn = Math.sqrt(Kp / m), z = (b + Kd) / (2 * Math.sqrt(Kp * m)), wd = wn * Math.sqrt(1 - z * z);
    const exact = (t) => step * (1 - Math.exp(-z * wn * t) * (Math.cos(wd * t) + ((z * wn) / wd) * Math.sin(wd * t)));
    let zmax = 0, tmax = 0;
    for (let t = 0; t <= 10; t += 1e-4) { const v = exact(t); if (v > zmax) { zmax = v; tmax = t; } }
    const sim = K.pidSim({ Kp, Kd, Ki: 0, tau: 0, step, sat: false }), met = K.pidMetrics(sim), th = K.pidTheory({ Kp, Kd, Ki: 0, tau: 0 });
    for (const t of [0.3, 1, 2.5, 6]) near(sim.Z[Math.round(t / 0.002)], exact(t), 2e-8 * step, "z(t) kapalı çözüm");
    near(met.over, ((zmax - step) / step) * 100, 2e-4, "aşım"); near(met.tpk, tmax, 2e-4, "tepe zamanı");
    near(th.over2, ((zmax - step) / step) * 100, 2e-4, "aşım formülü"); near(th.tp2, tmax, 2e-4);
    if (met.period !== null) { rel(met.period, (2 * Math.PI) / wd, 2e-4, "periyot"); near(met.rate, -z * wn, 2e-3, "zarf hızı"); }
    /* yerleşme süresi: kapalı çözümde ±%2 bandının son terk edildiği an */
    let ts = 0;
    for (let t = 0; t <= 10; t += 1e-4) if (Math.abs(exact(t) - step) > 0.02 * step) ts = t;
    if (ts < 9.9) near(met.settle, ts, 3e-4, "yerleşme süresi"); else ok(met.settle === null, "yerleşmedi");
  }
  /* (b) tam doğrusal model (motor gecikmesi + integral + rüzgâr): küçük adımlı açık Euler ile karşılaştır */
  for (const cfg of [{}, { Ki: 4, gust: 3 }, { Kp: 25, Kd: 5, tau: 0.12, Ki: 2, gust: -4 }, { tau: 0.3, Kp: 6, Kd: 4 }]) {
    const c = K.pidConfig(Object.assign({ sat: false }, cfg)), sim = K.pidSim(c);
    let z = 0, v = 0, q = 0, I = 0;
    const h = 2e-5, marks = { 1: 0, 5: 0, 12: 0, 19: 0 };
    for (let i = 0; i <= 19 / h + 0.5; i++) {
      const t = i * h;
      for (const k of Object.keys(marks)) if (Math.abs(t - Number(k)) < h / 2) marks[k] = z;
      const e = c.step - z, u = c.Kp * e + c.Ki * I - c.Kd * v, F = t >= c.tGust - 1e-9 ? c.gust : 0;
      const dz = v, dv = (q - c.b * v - F) / c.m, dq = (u - q) / c.tau;
      z += h * dz; v += h * dv; q += h * dq; I += h * e;
    }
    for (const k of Object.keys(marks)) near(sim.Z[Math.round(Number(k) / c.dt)], marks[k], 4e-4, `Euler ikizi t=${k}`);
  }
  /* (c) rüzgârda kalıcı hata: F/Kp; integral varken sıfıra gider */
  for (const [Kp, F] of [[8, 3], [16, -5], [4, 1.5]]) {
    const m0 = K.pidMetrics(K.pidSim({ Kp, gust: F, Ki: 0 }));
    near(m0.essG, F / Kp, 2e-4, "F/Kp");
    const m1 = K.pidMetrics(K.pidSim({ Kp, gust: F, Ki: 3, tEnd: 60 }));
    ok(Math.abs(m1.essG) < 1e-3 * Math.abs(F / Kp), "integral kalıcı hatayı götürmeli");
  }
  /* (d) kararlılık sınırı: Kp sınırının iki yanında zarf söner / büyür; ölçülen hız = kutbun gerçek kısmı */
  for (const [Kd, tau, Ki] of [[3, 0.1, 0], [5, 0.2, 0], [2, 0.05, 0], [3, 0.1, 2]]) {
    const th0 = K.pidTheory({ Kd, tau, Ki, Kp: 10 });
    ok(Number.isFinite(th0.kpHigh), "üst sınır sonlu");
    if (Ki === 0) rel(th0.kpHigh, ((1 + tau * 0.2) * (0.2 + Kd)) / tau, 1e-12, "Routh kapalı biçim");
    for (const f of [0.93, 1.07]) {
      const cfg = { Kd, tau, Ki, Kp: th0.kpHigh * f, sat: false, step: 0.5 };
      const met = K.pidMetrics(K.pidSim(cfg)), th = K.pidTheory(cfg);
      ok(th.stable === f < 1, "Routh hükmü"); ok(met.rate < 0 === f < 1, "benzetimde zarfın işareti");
      near(met.rate, th.oscRate, 0.02, "zarf hızı = Re(kutup)"); rel(met.period, th.oscPeriod, 5e-3, "periyot = 2π/Im(kutup)");
    }
    const edge = K.pidTheory({ Kd, tau, Ki, Kp: th0.kpHigh });
    ok(Math.abs(edge.maxRe) < 1e-6, "sınırda kutup sanal eksende");
    if (Ki === 0) rel(edge.oscPeriod, (2 * Math.PI) / Math.sqrt((0.2 + Kd) / tau), 1e-6, "sınır frekansı √(a2/a4)");
  }
  ok(K.pidTheory({ Ki: 20, Kd: 0, tau: 0.3, Kp: 5 }).anyStable === false, "çok büyük Ki: hiçbir Kp kararlı değil");
  near(K.pidTheory({ tau: 0, Ki: 4, Kd: 3 }).kpLow, 4 / 3.2, 1e-12, "τ = 0 alt sınır m·Ki/(b+Kd)");
  /* (e) doyma ve integral şişmesi */
  const wOff = K.pidMetrics(K.pidSim({ step: 10, Ki: 4, tw: 1.3, aw: false })), wOn = K.pidMetrics(K.pidSim({ step: 10, Ki: 4, tw: 1.3, aw: true }));
  ok(wOff.over > 5 * wOn.over && wOff.over > 50 && wOn.over < 15, "koruma aşımı küçültmeli");
  const s = K.pidSim({ step: 10, Ki: 4, tw: 1.3, aw: false });
  let tMin = Infinity, tMax = -Infinity;
  for (let i = 0; i <= s.n; i++) { tMin = Math.min(tMin, s.TH[i]); tMax = Math.max(tMax, s.TH[i]); }
  ok(tMin >= -1e-9 && tMax <= 1.3 * g + 1e-9, "itki sınırlar içinde kalmalı");
  const unst = K.pidMetrics(K.pidSim({ Kp: 60, tau: 0.1 }));
  ok(!unst.diverged && unst.settle === null && unst.tail > 1, "doymalı kararsız döngü sınır çevrimde kalır");
  ok(K.pidMetrics(K.pidSim({ Kp: 60, tau: 0.1, sat: false })).diverged, "doymasız kararsız döngü ıraksar");
  const od = K.pidMetrics(K.pidSim({ Kp: 2, Kd: 8, tau: 0 }));
  ok(od.over === 0 && od.tpk === null, "aşırı sönümlü: aşım ve tepe yok");
}

/* ---------- 2. Kalman ---------- */
{
  /* (a) Riccati durağan çözümü = Kalata'nın alfa-beta kapalı biçimi (parçalı sabit beyaz ivme modeli) */
  for (const [dt, sa, sz] of [[0.1, 0.5, 3], [0.1, 2, 0.5], [0.1, 0.1, 20], [0.5, 1, 4], [0.05, 5, 1]]) {
    const lam = (sa * dt * dt) / sz, r = (4 + lam - Math.sqrt(8 * lam + lam * lam)) / 4;
    const alpha = 1 - r * r, beta = 2 * (2 - alpha) - 4 * Math.sqrt(1 - alpha);
    const st = K.kfSteady(dt, sa, sz);
    rel(st.K1, alpha, 1e-8, "alfa"); rel(st.K2, beta / dt, 1e-7, "beta/dt"); rel(st.Ppp, alpha * sz * sz, 1e-8, "Ppp = alfa·R");
    /* değişmezlik: bir öngörü + düzeltme adımı kovaryansı değiştirmemeli (genel matris cebiriyle) */
    const F = [[1, dt], [0, 1]], Q = [[(sa * sa * dt ** 4) / 4, (sa * sa * dt ** 3) / 2], [(sa * sa * dt ** 3) / 2, sa * sa * dt * dt]];
    const P = [[st.Ppp, st.Ppv], [st.Ppv, st.Pvv]], mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((acc, v, k) => acc + v * B[k][j], 0))), T = (A) => A[0].map((_, j) => A.map((row) => row[j]));
    const Pm = mul(mul(F, P), T(F)).map((row, i) => row.map((v, j) => v + Q[i][j])), S = Pm[0][0] + sz * sz, Kg = [Pm[0][0] / S, Pm[1][0] / S];
    const Pn = [[Pm[0][0] - Kg[0] * Pm[0][0], Pm[0][1] - Kg[0] * Pm[0][1]], [Pm[1][0] - Kg[1] * Pm[0][0], Pm[1][1] - Kg[1] * Pm[0][1]]];
    rel(Pn[0][0], st.Ppp, 1e-9); rel(Pn[1][1], st.Pvv, 1e-9); rel(Pn[0][1], st.Ppv, 1e-8);
  }
  /* (b) kovaryans dizisi durağan çözüme yakınsar; eşleşmiş süzgeçte gerçek kovaryans = süzgecinki */
  const cv = K.kfCov({});
  const st = K.kfSteady(0.1, 0.5, 3);
  rel(cv.Ppp[300], st.Ppp, 1e-6); rel(cv.Pvv[300], st.Pvv, 1e-6);
  for (const k of [1, 10, 100, 300]) { rel(cv.Spp[k], cv.Ppp[k], 1e-10, "S = P"); rel(cv.Svv[k], cv.Pvv[k], 1e-10); }
  /* (c) kesintide kovaryans: düzeltmesiz yayılımın kapalı biçimi P(n) = Fⁿ P Fⁿᵀ + ΣFʲQFʲᵀ (kaba toplam) */
  const cd = K.kfCov({ dropLen: 8 });
  {
    let pp = cd.Ppp[150], pv = cd.Ppv[150], vv = cd.Pvv[150];
    const dt = 0.1, q = 0.25;
    for (let j = 0; j < 80; j++) { const a = pp + 2 * dt * pv + dt * dt * vv + (q * dt ** 4) / 4, b = pv + dt * vv + (q * dt ** 3) / 2; vv += q * dt * dt; pp = a; pv = b; }
    rel(cd.Ppp[230], pp, 1e-10, "kesinti sonu kovaryansı"); ok(cd.M[151] === 0 && cd.M[230] === 0 && cd.M[231] === 1 && cd.M[150] === 1, "kesinti aralığı");
    ok(cd.Ppp[231] < 0.5 * cd.Ppp[230], "ilk ölçüm belirsizliği daraltmalı");
  }
  /* (d) Monte Carlo: ölçülen RMS, gerçek kovaryansla örtüşür; yanlış ayarda süzgecin σ'sından ayrılır */
  const cases = [[{}, true], [{ szF: 0.5 }, false], [{ szF: 12 }, false], [{ saT: 1, saF: 0.1 }, false], [{ szT: 8, saT: 1.5, szF: 8, saF: 1.5 }, true], [{ dropLen: 8 }, true]];
  for (const [cfg, matched] of cases) {
    let ratioTrue = 0, ratioFilt = 0, nees = 0;
    const seeds = [3, 7, 21, 55];
    for (const seed of seeds) {
      const mc = K.kfMonte(cfg, 400, seed);
      ratioTrue += mc.measP / mc.trueP / seeds.length; ratioFilt += mc.measP / mc.filtP / seeds.length; nees += mc.nees / seeds.length;
      near(mc.measP / mc.trueP, 1, 0.07, `tek tohum ölçülen/gerçek ${JSON.stringify(cfg)}`); near(mc.measV / mc.trueV, 1, 0.07);
      near(mc.rawRms / (cfg.szT ?? 3), 1, 0.02, "ham GPS RMS");
      if (mc.dropMeas !== null) { near(mc.dropMeas / mc.dropTrue, 1, 0.12, "kesinti sonu RMS"); ok(mc.dropFilt > 3 * mc.filtP, "kesintide σ büyür"); }
    }
    near(ratioTrue, 1, 0.035, `ölçülen/gerçek ortalaması ${JSON.stringify(cfg)}`);
    if (matched) { near(ratioFilt, 1, 0.035, "tutarlı süzgeç"); near(nees, 2, 0.15, "NEES ≈ 2"); }
    else { ok(Math.abs(ratioFilt - 1) > 0.3, "yanlış ayar tutarsız olmalı"); ok(Math.abs(nees - 2) > 0.5, "NEES 2'den ayrılmalı"); }
  }
  /* (e) yanlış ayar doğruluğu da bozar: gerçek kovaryans eşleşmiş durağan değerden büyük */
  for (const cfg of [{ szF: 0.5 }, { szF: 12 }, { saT: 1, saF: 0.1 }]) {
    const c = K.kfConfig(cfg), cov = K.kfCov(cfg), best = K.kfSteady(0.1, c.saT, c.szT);
    ok(cov.Spp[300] > best.Ppp * 1.05, "eşleşmiş süzgeç en iyisidir");
  }
  /* (f) tek koşu: gerçek yörünge kinematiğe uyar (5 s ivme, 10 s sabit, 5 s fren) */
  const run = K.kfRun({}, 99);
  near(run.tv[50], 3, 1e-9); near(run.tp[50], 7.5, 1e-9); near(run.tp[150], 37.5, 1e-9); near(run.tp[300], 45, 1e-9); near(run.tv[300], 0, 1e-9);
  ok(Number.isNaN(K.kfRun({ dropLen: 5 }, 1).z[160]), "kesintide ölçüm yok");
}

/* ---------- 3. Yol izleme ---------- */
{
  const L = 2.7;
  /* (a) yol geometrisi */
  for (const R of [5, 20, 50]) {
    const p = K.buildPath({ kind: "arc", R });
    near(p.sB - p.sA, Math.PI * R, 1e-3 * R, "yarım çember uzunluğu");
    for (let i = 0; i < p.n; i += 97) if (p.S[i] > p.sA && p.S[i] < p.sB) near(Math.hypot(p.X[i] - 60, p.Y[i] - R), R, 1e-9, "yay noktaları çember üstünde");
    near(p.Y[p.n - 1], 2 * R, 1e-9); near(p.kMax, 1 / R, 1e-12);
  }
  for (const D of [15, 30, 60]) {
    const p = K.buildPath({ kind: "lane", D });
    near(p.Y[p.n - 1], 3.5, 1e-12); rel(p.kMax, 1.75 * (Math.PI / D) ** 2, 1e-12);
    /* eğrilik: üç noktadan geçen çemberle sayısal doğrulama (şeridin başında) */
    const i = Math.round(60 / 0.05) + 3, [x1, y1, x2, y2, x3, y3] = [p.X[i - 2], p.Y[i - 2], p.X[i], p.Y[i], p.X[i + 2], p.Y[i + 2]];
    const a = Math.hypot(x2 - x1, y2 - y1), b = Math.hypot(x3 - x2, y3 - y2), c = Math.hypot(x3 - x1, y3 - y1), area = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)) / 2;
    rel((4 * area) / (a * b * c), p.KP[i], 2e-3, "sayısal eğrilik");
  }
  const pj = K.pathProject(K.buildPath({ kind: "arc", R: 20 }), 60 + 18 * Math.sin(1), 20 - 18 * Math.cos(1), 0);
  near(pj.e, 2, 1e-4, "yansıtma: çemberin 2 m içi (sol)"); near(pj.s, 60 + 20, 5e-3); near(pj.th, 1, 1e-3);
  /* (b) yayda durağan durum: saf geometri (çemberler) ile */
  for (const [R, Ld, v] of [[20, 5, 8], [30, 8, 15], [12, 3, 4], [50, 5, 1], [25, 6, 25]]) {
    const path = K.buildPath({ kind: "arc", R });
    const pp = K.trackMetrics(K.trackSim({ ctrl: "pp", Ld, v, tauS: 0 }, path)).arc;
    ok(pp.ok, `saf takip durağan R=${R}`);
    near(pp.eR, 0, 1.5e-3, "saf takip: arka aks yolda"); near(pp.eF, -(Math.hypot(R, L) - R), 1.5e-3, "ön aks dışarıda");
    near(pp.delta, Math.atan(L / R), 2e-4, "δ = atan(L/R)"); rel(pp.radius, R, 1e-3, "dönüş yarıçapı"); near(pp.alpha, Math.asin(Ld / (2 * R)), 4e-4, "α");
    const sy = K.trackMetrics(K.trackSim({ ctrl: "stanley", k: 1.5, v, tauS: 0 }, path)).arc;
    ok(sy.ok, `Stanley durağan R=${R}`);
    near(sy.eF, 0, 1.5e-3, "Stanley: ön aks yolda"); near(sy.eR, R - Math.sqrt(R * R - L * L), 1.5e-3, "arka aks içeride");
    near(sy.delta, Math.asin(L / R), 2e-4, "δ = asin(L/R)"); rel(sy.radius, Math.sqrt(R * R - L * L), 1e-3);
    /* gecikme durağan durumu değiştirmez */
    const lag = K.trackMetrics(K.trackSim({ ctrl: "pp", Ld, v, tauS: Math.min(0.3, (0.5 * Ld) / v) }, path)).arc;
    if (lag.ok) { near(lag.eR, 0, 2e-3); near(lag.delta, Math.atan(L / R), 1e-3); }
    const th = K.trackTheory({ ctrl: "pp", Ld, v }, path);
    near(th.eF, -(Math.hypot(R, L) - R), 1e-12); near(th.delta, Math.atan(L / R), 1e-12);
  }
  /* (c) düzlükte küçük sapmanın sönümü: e'' + (2/Ld) e' + (2/Ld²) e = 0 denkleminin Euler çözümü */
  for (const Ld of [3, 5, 10]) {
    let e = 1, de = 0, min = 0;
    const h = 1e-4;
    for (let sdist = 0; sdist < 12 * Ld; sdist += h) { const dde = -(2 / Ld) * de - (2 / (Ld * Ld)) * e; e += h * de; de += h * dde; if (e < min) min = e; }
    rel(-min * 100, 100 * Math.exp(-Math.PI), 2e-3, "doğrusal denklemin aşımı e^(−π)");
    const path = K.buildPath({ kind: "arc", R: 30, lead: 200 });
    const m = K.trackMetrics(K.trackSim({ ctrl: "pp", Ld, v: 6, tauS: 0, e0: 0.2 }, path));
    near(m.straight.overshoot, -min * 100, 0.12, `saf takip aşımı Ld=${Ld}`);
  }
  for (const k of [0.8, 1.5, 3]) {
    const path = K.buildPath({ kind: "arc", R: 30, lead: 200 });
    const m = K.trackMetrics(K.trackSim({ ctrl: "stanley", k, v: 10, tauS: 0, e0: 0.2 }, path));
    rel(m.straight.tauMeas, 1 / k, 0.03, "Stanley: ön aks hatası e^(−k·t)");
  }
  ok(K.trackMetrics(K.trackSim({ e0: 0 }, K.buildPath({}))).straight === null, "sapma yoksa geçici yanıt ölçülmez");
  /* (d) direksiyon sınırı: en küçük dönüş yarıçapı */
  for (const dm of [15, 20, 25]) {
    const path = K.buildPath({ kind: "arc", R: 5 }), cfg = { ctrl: "pp", dmax: dm * RAD, tauS: 0, v: 5 };
    const m = K.trackMetrics(K.trackSim(cfg, path)), th = K.trackTheory(cfg, path);
    ok(!th.feasible, "yay dönülemez"); rel(th.Rmin, L / Math.tan(dm * RAD), 1e-12);
    rel(m.satRadius, L / Math.tan(dm * RAD), 2e-3, "sınırda ölçülen yarıçap"); ok(m.maxEFeature > 1, "araç yoldan taşar");
  }
  /* (e) gecikmeli saf takip: Ld > τ·v kararlı, Ld < τ·v kararsız */
  for (const [v, tau] of [[20, 0.3], [10, 0.2], [15, 0.4]]) {
    const path = K.buildPath({ kind: "arc", R: 50, lead: 600 });
    for (const f of [0.85, 1.2]) {
      const s = K.trackSim({ v, tauS: tau, Ld: f * tau * v, e0: 0.01, dmax: 1 }, path), ext = [];
      for (let i = 2; i < s.n && s.SS[i] < 540; i++) if ((s.ER[i] - s.ER[i - 1]) * (s.ER[i - 1] - s.ER[i - 2]) < 0) ext.push(Math.abs(s.ER[i - 1]));
      ok(ext.length > 6, "salınım gözlenmeli");
      ok(f < 1 ? ext[ext.length - 1] > 5 * ext[1] : ext[ext.length - 1] < 0.5 * ext[1], `gecikme sınırı f=${f}`);
    }
    near(K.trackTheory({ v, tauS: tau }, path).ldCrit, tau * v, 1e-12);
  }
  /* (f) kinematik tutarlılık: kat edilen yol v·t, yön değişimi ∫v·tan δ/L dt */
  {
    const s = K.trackSim({}, K.buildPath({}));
    let len = 0, dth = 0;
    for (let i = 1; i < s.n; i++) { len += Math.hypot(s.X[i] - s.X[i - 1], s.Y[i] - s.Y[i - 1]); dth += 0.5 * (Math.tan(s.DL[i]) + Math.tan(s.DL[i - 1])) * (8 / L) * s.c.dt; }
    rel(len, 8 * s.T[s.n - 1], 1e-5, "yol = v·t"); near(s.TH[s.n - 1], dth, 2e-3, "yön = ∫v·tan δ/L"); near(s.TH[s.n - 1], Math.PI, 0.02, "yarım çemberden sonra yön π");
    ok(s.done, "varsayılan koşu yolu bitirir");
  }
  /* (g) şerit değiştirme */
  {
    const path = K.buildPath({ kind: "lane", D: 30 }), cfg = { ctrl: "pp" }, m = K.trackMetrics(K.trackSim(cfg, path)), th = K.trackTheory(cfg, path);
    ok(m.arc === null && m.maxEFeature < 0.1 && m.maxDelta < th.deltaNeed * 1.05, "şerit değiştirme izlenir");
    rel(th.aLat, 64 * 1.75 * (Math.PI / 30) ** 2, 1e-12);
    const sEnd = K.trackSim(cfg, path);
    near(sEnd.Y[sEnd.n - 1], 3.5, 0.01, "araç yeni şeritte biter");
  }
  ok(!K.trackSim({ Ld: 2, v: 20, tauS: 0.3 }, K.buildPath({})).done, "kısa bakış + gecikme + hız: yol tamamlanamaz");
}

/* ---------- 4. Durma mesafesi ---------- */
{
  const euler = (c) => {
    const a = c.mu * g, h = 1e-5;
    let t = 0, x = 0, v = c.v0, xl = 0;
    for (;;) {
      const acc = t < c.tr ? 0 : c.tb > 0 && t < c.tr + c.tb ? (a * (t - c.tr)) / c.tb : a;
      if (c.gap0 + xl - x <= 0) return { hit: true, impact: v - c.vLead, t };
      if (v <= c.vLead) return { hit: false, gap: c.gap0 + xl - x, t, x };
      x += v * h; xl += c.vLead * h; v -= acc * h; t += h;
    }
  };
  for (const cfg of [{}, { tb: 0.5 }, { vLead: 15 }, { v0: 35, tr: 1.5, mu: 0.4, gap0: 250, tb: 0.3 }, { v0: 2, tb: 1, tr: 0.1, mu: 1, gap0: 50 }, { v0: 30, vLead: 28, tb: 1, mu: 0.9 }, { v0: 40, mu: 0.1, gap0: 250, tr: 2.5 }]) {
    const c = K.stopConfig(cfg), s = K.stopSim(cfg), th = K.stopTheory(cfg), e = euler(c);
    ok(s.collided === e.hit, "çarpışma hükmü");
    if (!e.hit) { near(s.minGap, e.gap, 2e-3, `Euler ikizi aralık ${JSON.stringify(cfg)}`); near(s.tStop, e.t, 2e-4); near(th.minGap, e.gap, 2e-3, "kapalı biçim"); near(th.time, e.t, 2e-4); }
    else { near(s.impact, e.impact, 2e-3, "çarpma hızı"); near(s.tHit, e.t, 2e-4); ok(th.minGap < 0, "kuram da çarpışma der"); }
  }
  /* enerji: t_b = 0 iken fren yolu v²/(2µg) (iş-enerji), toplam v·t_r + v²/(2µg) */
  for (const [v, tr, mu] of [[20, 0.5, 0.7], [10, 1, 0.3], [40, 0.1, 1]]) {
    const s = K.stopSim({ v0: v, tr, mu, gap0: 1000 });
    rel(s.dStop, v * tr + (v * v) / (2 * mu * g), 1e-9, "tepki + fren"); rel(s.tStop, tr + v / (mu * g), 1e-9);
  }
  /* çarpma hızı: v² = v0² − 2a(d − v0·t_r) */
  { const s = K.stopSim({ v0: 35, gap0: 80 }); rel(s.impact, Math.sqrt(35 * 35 - 2 * 0.7 * g * (80 - 17.5)), 1e-6, "çarpma hızı kinematiği"); }
  /* en yüksek güvenli hız: o hızda kalan aralık tam güvenlik payıdır */
  for (const [cfg, margin] of [[{}, 2], [{ tb: 0.5, mu: 0.4 }, 5], [{ vLead: 15, gap0: 40 }, 0], [{ tr: 2, gap0: 250, mu: 1 }, 10]]) {
    const vF = K.stopMaxSpeedFormula(cfg, margin), vM = K.stopMaxSpeedMeasured(cfg, margin);
    near(vM, vF, 2e-4, "ikiye bölme = formül");
    const s = K.stopSim(Object.assign({}, cfg, { v0: vF }));
    near(s.minGap, margin, 2e-4, "sınır hızda kalan aralık = pay");
  }
  const th = K.stopTheory({ vLead: 15 });
  near(th.ttc, 80 / 5, 1e-12, "TTC = aralık / bağıl hız"); ok(K.stopTheory({ vLead: 25 }).ttc === Infinity && !K.stopSim({ vLead: 25 }).closing, "kapanmayan aralık");
  /* ölçekleme: hız iki katına çıkınca fren payı dört, tepki payı iki katı */
  rel(K.stopTheory({ v0: 40, gap0: 500 }).brake / K.stopTheory({ v0: 20, gap0: 500 }).brake, 4, 1e-12); rel(K.stopTheory({ v0: 40 }).react / K.stopTheory({ v0: 20 }).react, 2, 1e-12);
}

/* ---------- 5. Lidar ---------- */
{
  /* (a) ışın-daire kesişimi: Kartezyen ikinci derece denklemle */
  const u = K.mulberry32(42);
  for (let i = 0; i < 400; i++) {
    const phi = (u() - 0.5) * 2, d = 2 + 58 * u(), bearing = phi + (u() - 0.5) * 0.1, rho = 0.05 + u();
    const cx = d * Math.cos(bearing), cy = d * Math.sin(bearing), dx = Math.cos(phi), dy = Math.sin(phi);
    const B = -2 * (dx * cx + dy * cy), C = cx * cx + cy * cy - rho * rho, disc = B * B - 4 * C;
    const ref = disc >= 0 && (-B - Math.sqrt(disc)) / 2 > 0 ? (-B - Math.sqrt(disc)) / 2 : null;
    const got = K.rayCircle(phi, d, bearing, rho);
    if (ref === null) ok(got === null, "ıskalama"); else near(got, ref, 1e-9, "kesişim uzaklığı");
  }
  /* (b) tarama */
  const sc0 = K.lidarScan({ sigma: 0, bearing: 0 }, 1);
  ok(sc0.n === 121 && Math.abs(sc0.PHI[60]) < 1e-12 && Math.abs(sc0.PHI[0] + 60 * RAD) < 1e-12, "121 ışın, ortadaki ileri bakar");
  near(sc0.est, 19.75, 1e-9, "tam karşıdaki engel: d − ρ"); ok(sc0.hits === 1 && sc0.HIT[60] === 2, "tek ışın değer");
  near(sc0.RNG[70], 70 / Math.cos(10 * RAD), 1e-9, "arka duvar"); ok(Number.isNaN(sc0.RNG[0]), "100 m ötesi dönmez");
  ok(K.lidarScan({ dphi: 4 * RAD, d: 40, bearing: 10 * RAD }, 3).est === null, "ışınların arasındaki engel görülmez");
  ok(K.lidarBeams(K.lidarConfig({ dphi: 0.1 * RAD })).n === 1201 && K.lidarBeams(K.lidarConfig({ dphi: 4 * RAD })).n === 31, "ışın sayısı");
  /* (c) algılama olasılığı ve ışın sayısı: sayım ile geometri (binom belirsizliği içinde) */
  for (const cfg of [{}, { d: 50, rho: 0.1 }, { dphi: 4 * RAD, d: 40 }, { dphi: 2 * RAD, d: 30, rho: 0.4 }, { d: 5 }, { dphi: 0.5 * RAD, d: 60, rho: 0.2 }]) {
    const c = K.lidarConfig(cfg), N = 20000, st = K.lidarStats(cfg, N, 9, false), th = K.lidarTheory(cfg);
    const width = 2 * Math.asin(c.rho / c.d), p = Math.min(1, width / c.dphi);
    near(th.pHit, p, 1e-12); near(st.pDetect, p, 4 * Math.sqrt((p * (1 - p)) / N) + 1e-9, `algılama olasılığı ${JSON.stringify(cfg)}`);
    near(st.meanHits, width / c.dphi, 0.02 * Math.max(1, width / c.dphi), "ortalama ışın sayısı");
    /* gürültüsüz ortalama hata: kaba kuvvet ortalaması (çok ince örnekleme) */
    let sum = 0, cnt = 0;
    for (let j = 0; j < 20000; j++) {
      const bearing = ((j + 0.5) / 20000 - 0.5) * c.dphi;
      let best = null;
      for (let i = -400; i <= 400; i++) { const r = K.rayCircle(i * c.dphi, c.d, bearing, c.rho); if (r !== null && (best === null || r < best)) best = r; }
      if (best !== null) { sum += best - (c.d - c.rho); cnt++; }
    }
    rel(th.biasMean, sum / cnt, 2e-3, "geometrik sapma (ince örnekleme)"); rel(st.meanErr, sum / cnt, 0.04, "geometrik sapma (rastgele sayım)");
    ok(st.meanErr > 0, "gürültüsüz hata artıdır");
    rel(th.dGuaranteed, c.rho / Math.sin(c.dphi / 2), 1e-12); rel(th.gap, 2 * c.d * Math.tan(c.dphi / 2), 1e-12);
  }
  /* (d) kesin algılama sınırı: hemen içinde hep, hemen dışında bazen */
  for (const [dphi, rho] of [[1, 0.25], [2, 0.5], [0.5, 0.1]]) {
    const lim = rho / Math.sin((dphi * RAD) / 2);
    ok(K.lidarStats({ dphi: dphi * RAD, rho, d: lim * 0.98 }, 5000, 4, false).pDetect === 1, "sınırın içinde her zaman");
    ok(K.lidarStats({ dphi: dphi * RAD, rho, d: lim * 1.1 }, 5000, 4, false).pDetect < 0.95, "sınırın dışında kaçar");
  }
  /* (e) gürültü: tek ışında RMS² ≈ geometrik RMS² + σ²; çok ışında en kısa seçimi ortalamayı aşağı çeker */
  {
    const cfg = { d: 50, rho: 0.1, sigma: 0.05 }, a = K.lidarStats(cfg, 40000, 5, true), b = K.lidarStats(cfg, 40000, 5, false);
    rel(a.rmsErr ** 2, b.rmsErr ** 2 + 0.05 ** 2, 0.04, "tek ışın: varyanslar toplanır");
    const n5 = K.lidarStats({ d: 5, sigma: 0.05 }, 20000, 5, true), c5 = K.lidarStats({ d: 5, sigma: 0.05 }, 20000, 5, false);
    ok(n5.meanErr < c5.meanErr - 0.02, "çok ışında en kısa seçimi eksi yanlılık üretir");
  }
}
console.log(`G ${SLUG}: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

/* ====================== tarayıcı ====================== */
if (process.argv.includes("--browser")) {
  const { createRequire } = await import("node:module");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  let chromium;
  for (const dir of [root, ...(process.env.NODE_PATH || "").split(":").filter(Boolean), "/opt/node-tools"]) { try { ({ chromium } = createRequire(join(dir, "package.json"))("playwright")); break; } catch (_) { /* sıradaki */ } }
  assert(chromium, "playwright bulunamadı");
  const server = createServer((req, res) => {
    const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
    res.setHeader("Content-Type", { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" }[extname(file)] || "application/octet-stream");
    res.end(fs.readFileSync(file));
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let browser;
  const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width === 390 ? 2 : 1, locale: "tr-TR" });
      await ctx.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      const page = await ctx.newPage();
      page.setDefaultTimeout(8000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error" && !/404|Failed to load resource/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      await page.waitForFunction(() => document.getElementById("pidOver").textContent.length > 0);
      const click = (id) => page.locator("#" + id).click();
      const read = (id) => page.locator("#" + id).textContent();
      const set = (id, v) => page.locator("#" + id).evaluate((el, val) => {
        if (el.type === "checkbox") { el.checked = val; el.dispatchEvent(new Event("change", { bubbles: true })); }
        else { el.value = val; el.dispatchEvent(new Event(el.tagName === "SELECT" ? "change" : "input", { bubbles: true })); }
      }, v);
      const has = async (id, text) => { const t = await read(id); if (SOFT && !t.includes(text)) console.log("FAIL", id, JSON.stringify(t), text); else assert(t.includes(text), `[${theme} ${width}] #${id}: "${t}" içinde "${text}" yok`); checks++; };
      const lacks = async (id, text) => { const t = await read(id); assert(!t.includes(text), `[${theme} ${width}] #${id}: "${t}" içinde "${text}" olmamalı`); checks++; };
      const noOverflow = async (where) => { const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth); assert(o <= 0, `[${width}] yatay taşma ${o}px (${where})`); checks++; };
      const sane = async (where) => {
        const bad = await page.evaluate(() => [...document.querySelectorAll('[role="tabpanel"]:not([hidden]) .oa-stat, [role="tabpanel"]:not([hidden]) .oa-status, [role="tabpanel"]:not([hidden]) output')].map((e) => e.textContent).filter((t) => /NaN|undefined|Infinity|null|\[object/.test(t) || t.trim() === ""));
        assert.deepEqual(bad, [], `[${theme} ${width}] bozuk okuma (${where})`); checks++;
      };
      const painted = async (id) => {
        const n = await page.locator("#" + id).evaluate((cv) => { const d = cv.getContext("2d").getImageData(0, 0, cv.width, cv.height).data; let k = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) k++; return k; });
        /* Bütün pikseller sayılır: ince çizgili sahnelerde seyrek örneklem (her 97. piksel) eşiğin hemen çevresinde kalıyordu. */
        assert(n > 400, `[${theme} ${width}] #${id} boş tuval (${n} boyalı piksel)`); checks++;
      };

      /* yapı ve erişilebilirlik */
      const unl = await page.evaluate(() => [...document.querySelectorAll(".app-content input, .app-content select")].filter((e) => !(e.labels && e.labels.length)).map((e) => e.id));
      assert.deepEqual(unl, [], "etiketsiz denetim"); checks++;
      const cvs = await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].filter((c) => c.getAttribute("role") !== "img" || !c.getAttribute("aria-label")).length);
      assert.equal(cvs, 0, "role=img ve aria-label eksik tuval"); checks++;
      assert.equal(await page.evaluate(() => Object.isFrozen(window.OtonomLab) && !Object.getOwnPropertyDescriptor(window, "OtonomLab").writable), true); checks++;
      assert.equal(await page.evaluate(() => /[\u0300-\u036f]/.test(document.querySelector(".app-content").textContent.normalize("NFC"))), false, "birleşik işaret olmamalı"); checks++;

      /* 01 PID */
      await has("pidOver", "14.25 %"); await has("pidOverSub", "11.59 %"); await has("pidTp", "1.266 s"); await has("pidTs", "2.555 s"); await has("pidZeta", "ζ = 0.566 · ωn = 2.828 rad/s");
      await has("pidPer", "2.403 s"); await has("pidRate", "−1.607 1/s"); await has("pidStab", "Kararlı"); await has("pidStabSub", "64.64"); await has("pidEssG", "—"); await has("pidKpOut", "8.0 N/m");
      await painted("pidChart"); await painted("pidThrust");
      await click("pidP2"); await has("pidOver", "11.59 %"); await has("pidOverSub", "fark 0.00 puan"); await has("pidTp", "1.347 s"); await has("pidTpSub", "fark 0.00 %"); await has("pidPerSub", "2.694 s"); await has("pidStabSub", "∞"); await has("pidStatus", "tam ikinci derecedir");
      await click("pidPWind"); await has("pidEssG", "0.375 m"); await has("pidEssGSub", "F/Kp = 0.375 m"); await has("pidStatus", "F/Kp = 0.375 m");
      await click("pidPInt"); await has("pidEssGSub", "kuram 0 m"); await lacks("pidEssG", "0.375"); await has("pidStabSub", "1.29 – 63.35");
      await click("pidPWindup"); await has("pidOver", "90.79 %"); await has("pidStatus", "Koruma kapalı"); await set("pidAw", true); await has("pidOver", "7.47 %"); await has("pidStatus", "Koruma açık");
      /* doğrulayıcı düzeltmeleri: tek yuvarlama yolu, yerleşmeyen yanıtta "—", koşullu periyot cümlesi, çift boşluk yok */
      await click("pidPWind"); await set("pidKp", 16); await has("pidEssG", "0.188 m"); await has("pidEssGSub", "F/Kp = 0.188 m"); await lacks("pidStatus", "  ");
      await click("pidReset"); await set("pidKp", 80); await set("pidKd", 3.8); await set("pidGust", 4); await has("pidStab", "Kararlı"); await has("pidTs", "yerleşmedi"); await has("pidEssG", "—"); await has("pidEssGSub", "tanımsız"); await has("pidStatus", "okunamıyor"); await lacks("pidStatus", "kalır.");
      await click("pidReset"); await set("pidKp", 16); await set("pidKi", 4); await set("pidKd", 3.8); await set("pidStep", 0.5); await set("pidGust", 4); await has("pidPerSub", "fark −11.67 %"); await lacks("pidStatus", "örtüşür"); await has("pidStatus", "Re = −0.267 1/s"); await has("pidEssG", "0.022 m");
      await click("pidReset"); await has("pidStatus", "örtüşür");
      await click("pidPUnst"); await has("pidStab", "Kararsız"); await has("pidStabSub", "32.64"); await has("pidTs", "yerleşmedi"); await has("pidEss0", "—"); await has("pidStatus", "sınır çevrim");
      await set("pidSat", false); await has("pidOver", "ıraksadı"); await has("pidSatF", "sınır kapalı"); assert.equal(await page.locator("#pidAw").isDisabled(), true); checks++; await sane("pid kararsız");
      await set("pidKp", 2); await set("pidKd", 8); await set("pidTau", 0); await has("pidOver", "aşım yok"); await has("pidTp", "—"); await sane("pid aşırı sönümlü");
      for (const edge of ["min", "max"]) { for (const id of ["pidKp", "pidKi", "pidKd", "pidTau", "pidStep", "pidGust", "pidTw"]) await page.locator("#" + id).evaluate((el, e) => { el.value = el[e]; el.dispatchEvent(new Event("input", { bubbles: true })); }, edge); await sane("pid " + edge); }
      await click("pidReset"); await has("pidOver", "14.25 %"); assert.equal(await page.locator("#pidSat").isChecked(), true); checks++;
      await click("pidPlay"); await has("pidPlay", "Oynat"); await click("pidPlay"); await has("pidPlay", "Duraklat");
      await noOverflow("pid");

      /* 02 Kalman */
      await click("tab-kf"); await has("kfP", "0.692 m"); await has("kfPSub", "0.711 m"); await has("kfPT", "0.711 m"); await has("kfNees", "1.93"); await has("kfRic", "0.711 m · 0.292 m/s"); await has("kfRaw", "3.007 m"); await has("kfDropV", "—"); await has("kfStatus", "Süzgeç gerçek gürültüleri biliyor");
      await painted("kfChart"); await painted("kfRms");
      await click("kfPOver"); await has("kfPSub", "0.182 m"); await has("kfPT", "0.958 m"); await has("kfNeesSub", "aşırı güveniyor"); await has("kfStatus", "aşırı güveniyor");
      await click("kfPUnder"); await has("kfNeesSub", "çekingen"); await has("kfStatus", "çekingen");
      await click("kfPQ"); await has("kfStatus", "aşırı güveniyor"); await click("kfMatch"); await has("kfSaFOut", "1.0 m/s²"); await has("kfStatus", "Süzgeç gerçek gürültüleri biliyor");
      await click("kfPDrop"); await has("kfDropV", "3.30 m"); await has("kfDropSub", "3.55 m"); await has("kfStatus", "Kesintide düzeltme yoktur");
      await set("kfView", "abs"); await has("kfChartTitle", "mutlak konum"); await painted("kfChart"); await set("kfSeed", 21); await lacks("kfP", "—");
      for (const edge of ["min", "max"]) { for (const id of ["kfSzT", "kfSaT", "kfSzF", "kfSaF", "kfDrop", "kfSeed"]) await page.locator("#" + id).evaluate((el, e) => { el.value = el[e]; el.dispatchEvent(new Event("input", { bubbles: true })); }, edge); await sane("kf " + edge); }
      await click("kfReset"); await has("kfP", "0.692 m"); await has("kfChartTitle", "gerçek konuma göre hata"); await noOverflow("kf");

      /* 03 Yol izleme */
      await click("tab-trk"); await has("trkOver", "5.20 %"); await has("trkOverSub", "4.32 %"); await has("trkDelta", "7.69°"); await has("trkDeltaSub", "atan(L/R) = 7.69°"); await has("trkER", "0.000 m"); await has("trkEF", "−0.181 m"); await has("trkEFSub", "−0.181 m"); await has("trkRad", "20.00 m"); await has("trkAlpha", "7.18°"); await has("trkRmin", "4.68 m"); await has("trkLdC", "0.80 m"); await has("trkMax", "0.086 m");
      await painted("trkScene"); await painted("trkErr"); await painted("trkSteer");
      assert.equal(await page.locator("#trkLaneCard").isHidden(), true); assert.equal(await page.locator("#trkKField").isHidden(), true); checks += 2;
      await click("trkPIdeal"); await has("trkOver", "4.34 %"); await has("trkLdCSub", "gecikme yok");
      await click("trkPStan"); await has("trkOverLab", "1/e"); await has("trkOver", "0.592 s"); await has("trkOverSub", "0.667 s"); await has("trkER", "0.183 m"); await has("trkERSub", "0.183 m"); await has("trkEF", "0.000 m"); await has("trkDeltaSub", "asin(L/R)"); await has("trkRadSub", "19.82 m");
      assert.equal(await page.locator("#trkLdField").isHidden(), true); assert.equal(await page.locator("#trkAlphaCard").isHidden(), true); assert.equal(await page.locator("#trkKField").isVisible(), true); checks += 3;
      await click("trkPTight"); await has("trkRmin", "7.42 m"); await has("trkRminSub", "7.42 m"); await has("trkStatus", "dışarı taşar"); await has("trkDelta", "—");
      await click("trkPShort"); await has("trkStatus", "Araç yolu tamamlayamadı"); await has("trkLdC", "6.00 m"); await has("trkLdCSub", "salınım büyür"); await sane("trk kararsız");
      await click("trkPLane"); await has("trkLane", "2.63°"); await has("trkLaneSub", "2.97°"); assert.equal(await page.locator("#trkDeltaCard").isHidden(), true); assert.equal(await page.locator("#trkDField").isVisible(), true); assert.equal(await page.locator("#trkRField").isHidden(), true); checks += 3; await painted("trkScene");
      await set("trkE0", 0); await has("trkOver", "—"); await has("trkOverSub", "başlangıç sapması 0");
      for (const path of ["arc", "lane"]) for (const ctrl of ["pp", "stanley"]) for (const edge of ["min", "max"]) {
        await set("trkPath", path); await set("trkCtrl", ctrl);
        for (const id of ["trkLd", "trkK", "trkV", "trkR", "trkD", "trkDmax", "trkTau", "trkE0"]) await page.locator("#" + id).evaluate((el, e) => { el.value = el[e]; el.dispatchEvent(new Event("input", { bubbles: true })); }, edge);
        await sane(`trk ${path} ${ctrl} ${edge}`);
      }
      await click("trkReset"); await has("trkOver", "5.20 %"); await has("trkCaption", "20 m yarıçaplı"); await noOverflow("trk");

      /* 04 Algılama */
      await click("tab-alg"); await has("stopD", "39.12 m"); await has("stopDSub", "formül 39.12 m"); await has("stopParts", "10.00 m + 29.12 m"); await has("stopGap", "40.88 m"); await has("stopTtc", "4.00 s"); await has("stopVmax", "29.48 m/s"); await has("stopVmaxSub", "29.48 m/s (106 km/h)"); await has("stopNeed", "41.12 m"); await has("stopVOut", "20 m/s · 72 km/h");
      await has("lidHits", "1"); await has("lidEst", "19.715 m"); await has("lidP", "100.0 %"); await has("lidGuar", "28.65 m"); await has("lidBiasSub", "+0.0219 m"); await has("lidDphiOut", "1.0° · 121 ışın");
      for (const id of ["stopRoad", "stopChart", "stopNeedChart", "lidScene", "lidChart"]) await painted(id);
      await click("stopPWet"); await has("stopD", "60.97 m"); await has("stopPartsSub", "3.92 m/s²");
      await click("stopPSlow"); await has("stopParts", "30.00 m + 29.12 m"); await has("stopGap", "20.88 m");
      await click("stopPLead"); await has("stopTtc", "16.00 s"); await has("stopD", "4.32 m"); await has("stopDSub", "kendi yolumuz");
      await click("stopPFast"); await has("stopD", "çarpışma"); await has("stopGapSub", "bağıl hızla çarpışma"); await has("stopStatus", "menzilini aşan"); await sane("çarpışma");
      await set("stopV", 20); await set("stopLead", 25); await has("stopTtc", "∞"); await has("stopD", "—"); await sane("kapanmayan");
      await set("stopLead", 0); await set("stopTb", 0.5); await has("stopD", "44.05 m"); await has("stopDSub", "fark 0.00 %"); await has("stopPartsSub", "fren kurulması");
      await click("lidPPole"); await has("lidGuar", "11.46 m"); await has("lidStatus", "yalnız %22.9"); await set("lidD", 12); await lacks("lidStatus", "yalnız"); await has("lidStatus", "taramaların %"); await set("lidD", 50); await has("lidPSub", "22.9 %"); await has("lidStatus", "kaçabilir"); await has("stopD", "44.05 m");
      await click("lidPCoarse"); await has("lidEst", "algılanmadı"); await has("lidHits", "0"); await has("lidDphiOut", "4.0° · 31 ışın");
      await click("lidPNear"); await has("lidHits", "5"); await has("lidP", "100.0 %");
      for (const edge of ["min", "max"]) { for (const id of ["stopV", "stopTr", "stopMu", "stopTb", "stopRange", "stopLead", "stopMargin", "lidDphi", "lidD", "lidRho", "lidSig", "lidBear", "lidSeed"]) await page.locator("#" + id).evaluate((el, e) => { el.value = el[e]; el.dispatchEvent(new Event("input", { bubbles: true })); }, edge); await sane("alg " + edge); }
      await click("algReset"); await has("stopD", "39.12 m"); await has("lidEst", "19.715 m");
      assert.equal(await page.locator(".oa-sae li").count(), 6); checks++;
      const sae = await page.locator(".oa-sae").textContent();
      assert(!/Tesla|Waymo|Mercedes|Cruise|Autopilot|Baidu|Zoox/i.test(await page.locator(".app-content").textContent()), "şirket adı olmamalı"); assert(/eller direksiyonda olsun olmasın gözetim sürücüdedir/.test(sae)); checks += 2;
      await noOverflow("alg");

      /* klavye */
      await page.locator("#tab-alg").focus();
      await page.keyboard.press("Home"); assert.equal(await page.locator("#tab-pid").getAttribute("aria-selected"), "true");
      await page.keyboard.press("ArrowRight"); assert.equal(await page.locator("#tab-kf").getAttribute("aria-selected"), "true");
      await page.keyboard.press("End"); assert.equal(await page.locator("#tab-alg").getAttribute("aria-selected"), "true");
      await page.keyboard.press("ArrowRight"); assert.equal(await page.locator("#tab-pid").getAttribute("aria-selected"), "true");
      await page.keyboard.press("ArrowLeft"); assert.equal(await page.locator("#tab-alg").getAttribute("aria-selected"), "true");
      assert.equal(await page.locator("#panel-pid").isHidden(), true); assert.equal(await page.locator("#tab-pid").getAttribute("tabindex"), "-1"); checks += 7;
      await click("tab-pid"); await set("pidKp", 30); await has("pidKpOut", "30.0 N/m");
      await page.evaluate(() => document.activeElement.blur());
      await page.keyboard.press("Space"); await has("pidPlay", "Oynat"); await page.keyboard.press("Space"); await has("pidPlay", "Duraklat");
      await page.keyboard.press("r"); await has("pidKpOut", "8.0 N/m"); await has("pidOver", "14.25 %");
      await page.locator("#pidKp").focus(); await page.keyboard.press("r"); await has("pidKpOut", "8.0 N/m"); await page.keyboard.press("ArrowRight"); await has("pidKpOut", "8.5 N/m");
      await page.waitForTimeout(400);
      assert.deepEqual(errors, [], `[${theme} ${width}] konsol hataları`); checks++;
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} tarayıcı kontrolü (390 px açık, 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
