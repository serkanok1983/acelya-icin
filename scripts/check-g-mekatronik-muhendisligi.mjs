// G: Mekatronik mühendisliği laboratuvarı. Çekirdek (KERNEL) sayfadan okunur; başvurular sayfanın
// formüllerini yinelemez: küçük adımlı açık Euler (başka tümleyici), 2×2 doğrusal çözüm, kaba kuvvet
// taramaları, evre üzerinden sayısal ortalama, iki ayrı yöntemin (kutup ve benzetim) karşılaştırması.
// Kullanım: node scripts/check-g-mekatronik-muhendisligi.mjs [--browser]
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const SLUG = "mekatronik-muhendisligi";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const window = {};
new Function("window", source)(window); /* vm bağlamında Math erişimi çok yavaş; düz işlevle yüklenir */
const K = window.MekatronikLab;
assert(K && Object.isFrozen(K), "MekatronikLab dondurulmuş olmalı");
void vm;

let checks = 0;
const near = (a, e, tol, msg = "") => { assert(Number.isFinite(a) && Math.abs(a - e) <= tol, `${msg} ${a} ≠ ${e} (±${tol})`); checks++; };
const rel = (a, e, tol, msg = "") => near(a, e, tol * Math.abs(e), msg);
const ok = (c, msg) => { assert(c, msg); checks++; };
const TAU = 2 * Math.PI;

/* ---------- 1. DC motor ---------- */
const steady = (c, V) => { /* [R K; K −b]·[I ω] = [V, T_L]: 2×2 Cramer */ const det = -c.R * c.b - c.K * c.K; return { I: (-V * c.b - c.K * c.TL) / det, w: (c.R * c.TL - c.K * V) / det }; };
const euler = (c, tEnd, h, V, onStep) => { let I = 0, w = 0; const n = Math.round(tEnd / h); for (let i = 1; i <= n; i++) { const dI = (V - c.R * I - c.K * w) / c.L, dw = (c.K * I - c.b * w - c.TL) / c.J; I += h * dI; w += h * dw; if (onStep) onStep(i * h, I, w); } return { I, w }; };
const motorCases = [{}, { TL: 0.15 }, { L: 5e-3, J: 2e-6 }, { V: 48, R: 0.5, K: 0.12, J: 5e-5, b: 0 }, { R: 6, K: 0.03, L: 5e-4, J: 5e-6, b: 5e-5, TL: 0.02 }];
for (const o of motorCases) {
  const c = K.motorConfig(o), th = K.motorTheory(c), run = K.motorRun(c), p = K.motorPoles(c), ss = steady(c, c.V);
  rel(run.wEnd, ss.w, 2e-6, "kararlı hız"); near(run.IEnd, ss.I, 2e-5 * c.V / c.R, "kararlı akım"); rel(th.wInf, ss.w, 1e-12);
  /* Euler, adım en hızlı kutbun 1/4000'i: ω(t) ve %63.2 anı */
  const h = 1 / (4000 * p.pmax), marks = [0.5, 1, 3].map((k) => k * p.tslow), got = {};
  let t63 = null, prev = [0, 0];
  euler(c, 4 * p.tslow, h, c.V, (t, I, w) => {
    for (const m of marks) if (got[m] === undefined && t >= m - h / 2) got[m] = w;
    if (t63 === null && ss.w > 0 && prev[1] < 0.632 * ss.w && w >= 0.632 * ss.w) t63 = prev[0] + (h * (0.632 * ss.w - prev[1])) / (w - prev[1]);
    prev = [t, w];
  });
  for (const m of marks) { near(K.motorOmegaExact(c, m), got[m], 2e-3 * Math.abs(ss.w), "kapalı çözüm ω(t)"); const i = run.T.findIndex((x) => x >= m); if (i > 0) near(run.W[i] - (run.W[i] - run.W[i - 1]) * (run.T[i] - m) / (run.T[i] - run.T[i - 1]), got[m], 3e-3 * Math.abs(ss.w), "RK4 ω(t)"); }
  if (ss.w > 0) { rel(run.t63, t63, 2e-3, "%63.2 anı RK4"); rel(th.t63, t63, 2e-3, "%63.2 anı kapalı çözüm"); }
  near(K.lockedRotor(c).I, c.V / c.R, 1e-4 * c.V / c.R, "kilitli rotor");
  if (p.real && th.te < 0.05 * th.tm) rel(th.t63, th.tm, 0.08, "τm yaklaşığı");
  /* dinamometre: kaba kuvvet T taraması */
  const c0 = K.motorConfig(Object.assign({}, o, { TL: 0 })), dy = K.dyno(c0), Ts = (c0.K * c0.V) / c0.R;
  let bestP = 0, bestT = 0, bestE = 0, bestTE = 0;
  for (let i = 1; i < 200000; i++) { const T = (Ts * i) / 200000, s = steady(Object.assign({}, c0, { TL: T }), c0.V), P = T * s.w, E = P / (c0.V * s.I); if (P > bestP) { bestP = P; bestT = T; } if (E > bestE) { bestE = E; bestTE = T; } }
  rel(dy.Pmax, bestP, 1e-4, "en büyük güç"); near(dy.Tstar, bestT, 2e-3 * Ts, "en büyük güç torku"); near(bestT, Ts / 2, 1e-4 * Ts, "T_s/2");
  if (c0.b > 0) near(dy.etaMax, bestE, 5e-4, "en yüksek verim"); else ok(dy.etaMax <= 1, "b = 0: verim ≤ 1"); if (c0.b > 0) near(K.motorTheory(c0).etaMax, bestE, 1e-6, "verim kapalı biçim");
  rel(dy.Tstall, Ts, 1e-5, "duruş torku"); rel(dy.wnl, steady(c0, c0.V).w, 1e-5, "boşta hız");
}
/* PWM: senkron sürücüde doğrusal model → periyot ortalaması tam ortalama model; dalgalanma bağımsız periyodik çözümden */
for (const [D, f, o] of [[50, 5000, {}], [20, 1000, { TL: 0.1 }], [75, 20000, {}], [33, 2000, { L: 3e-3 }]]) {
  const c = K.motorConfig(o), r = K.pwmRun(c, D, f, "sync"), T = 1 / f, te = c.L / c.R;
  const wA = steady(c, (D / 100) * c.V).w;
  near(r.wMean, wA, 2e-5 * (c.K * c.V) / (c.K * c.K + c.R * c.b), "PWM ortalama hız"); ok(!r.dcm, "senkron sürücü kesintisiz");
  /* ω sabit kabulüyle elektrik denkleminin periyodik çözümü: kapalı üsteller 400 periyot yinelenir */
  let I = 0, lo = 0, hi = 0;
  for (let k = 0; k < 400; k++) {
    const Ion = (c.V - c.K * wA) / c.R, Ioff = (-c.K * wA) / c.R;
    lo = I; I = Ion + (I - Ion) * Math.exp(-(D / 100) * T / te); hi = I; I = Ioff + (I - Ioff) * Math.exp(-(1 - D / 100) * T / te);
  }
  rel(r.IRip, hi - lo, 0.01, "PWM dalgalanma"); rel(r.ripTh, hi - lo, 1e-6, "dalgalanma formülü");
}
{ /* diyotlu sürücü: kesintili iletim; bağımsız Euler benzetimi durgun hâlden */
  const c = K.motorConfig({}), f = 5000, D = 50, r = K.pwmRun(c, D, f, "diode"), T = 1 / f, h = T / 2000;
  let I = 0, w = 0, sw = 0, n = 0;
  const N = Math.round(3 / T); /* kesintili iletimde etkin zaman sabiti ~0.25 s: 3 s yeter */
  for (let k = 0; k < N; k++) for (let j = 0; j < 2000; j++) {
    const on = j < 1000, V = on ? c.V : 0;
    let dI = (V - c.R * I - c.K * w) / c.L;
    if (!on && I <= 0 && dI < 0) dI = 0;
    I += h * dI; if (!on && I < 0) I = 0;
    w += (h * (c.K * I - c.b * w - c.TL)) / c.J;
    if (k >= N - 20) { sw += w; n++; }
  }
  ok(r.dcm, "diyotlu sürücü kesintili"); rel(r.wMean, sw / n, 0.002, "diyotlu PWM ortalama hız"); ok(!r.capped, "diyotlu PWM oturdu");
  ok(r.wMean > 1.3 * r.wAvg, "kesintili iletimde ortalama model bozulur");
  /* periyodik kararlı durumda L·ΔI ≈ 0: ortalama uç gerilimi R·I_ort + K·ω_ort olmalı (doğrulayıcı, 12 Kasım) */
  for (const f2 of [1000, 5000]) { const q = K.pwmRun(c, 50, f2, "diode"); near(q.VMean, c.R * q.IMean + c.K * q.wMean, 2e-3, "diyotlu PWM uç gerilimi enerji dengesi"); }
  near(K.pwmRun(c, 50, 1000, "diode").dcmFrac, 0.4868, 2e-3, "1 kHz diyotlu: sıfır akım oranı");
}
/* ---------- 2. Sensörler ---------- */
for (const o of [{ N: 100, x: 4, rpm: 437, Tw: 0.01 }, { N: 100, x: 1, rpm: 437, Tw: 0.01 }, { N: 16, x: 4, rpm: 23, Tw: 0.05 }, { N: 1024, x: 4, rpm: 2900, Tw: 0.001 }]) {
  const m = K.encoderM(Object.assign({ windows: 20000 }, o)), C = o.N * o.x, x0 = (o.rpm / 60) * o.Tw * C;
  let s2 = 0, mx = 0;
  const G = 100000;
  for (let i = 0; i < G; i++) { const u = (i + 0.5) / G, cnt = Math.floor(u + x0) - Math.floor(u), e = (cnt / (C * o.Tw)) * 60 - o.rpm; s2 += e * e; mx = Math.max(mx, Math.abs(e)); }
  rel(m.rmsTh, Math.sqrt(s2 / G), 1e-3, "M RMS formülü"); rel(m.rms, Math.sqrt(s2 / G), 0.03, "M RMS ölçülen"); rel(m.maxTh, mx, 1e-6, "M en büyük");
}
for (const o of [{ N: 100, rpm: 437, fclk: 1e6 }, { N: 1024, rpm: 2900, fclk: 1e6 }, { N: 16, rpm: 23, fclk: 1e5 }]) {
  const t = K.encoderT(Object.assign({ periods: 20000 }, o)), x = (o.fclk * 60) / (o.N * o.rpm);
  let s2 = 0, mx = 0;
  const G = 100000;
  for (let i = 0; i < G; i++) { const u = (i + 0.5) / G, m = Math.floor(u + x) - Math.floor(u), e = (60 * o.fclk) / (o.N * m) / o.rpm - 1; s2 += e * e; mx = Math.max(mx, Math.abs(e)); }
  rel(t.rmsRelTh, Math.sqrt(s2 / G), 1e-3, "T RMS formülü"); rel(t.maxRelTh, mx, 1e-6, "T en büyük");
  if (Math.min(x - Math.floor(x), Math.ceil(x) - x) > 0.05) rel(t.rmsRel, Math.sqrt(s2 / G), 0.05, "T RMS ölçülen");
}
{ const o = { N: 100, x: 4, Tw: 0.01, fclk: 1e6 }, n = K.encoderCrossover(o); rel(60 / (o.N * o.x * n * o.Tw / 60) / 60, (o.N * n) / (60 * o.fclk), 1e-9, "kesişme hızında iki hata eşit"); }
for (const [N, x, rpm, fdec] of [[100, 4, 437, 1e5], [100, 1, 437, 1e5], [256, 4, -1200, 1e6], [16, 4, 3000, 2e4], [500, 1, -50, 1e5]]) {
  const q = K.quadDecode({ N, x, rpm, fdec, dur: 0.05, profile: "const" }), p = (N * ((rpm / 60) * TAU * 0.05)) / TAU;
  near(q.illegal, 0, 0, "geçersiz geçiş yok"); near(q.count, x === 4 ? Math.floor(4 * p) : Math.floor(p), 0, "sayım = ⌊gerçek⌋"); ok(q.maxErr <= 1 && q.lastDir === Math.sign(rpm), "yön ve hata");
}
{ const q = K.quadDecode({ N: 100, x: 4, rpm: 310, fdec: 1e5, dur: 0.5, profile: "osc", fo: 2 }); near(q.reversals, 2, 0, "iki yön dönüşü"); near(q.illegal, 0, 0); ok(q.dirFrac > 0.98 && q.dirFrac < 1, "yön, dönüşten sonraki ilk kenarda anlaşılır"); }
{ const q = K.quadDecode({ N: 1024, x: 4, rpm: 2900, fdec: 1e5, dur: 0.05, profile: "const" }); ok(q.illegal > 0 && q.maxErr > 10, "çözücü yetişemez"); }
for (let v = -0.3; v < 5.3; v += 0.0137) { const q = K.adcQuant(v, 8, 5), d = 5 / 256, code = Math.min(255, Math.max(0, Math.round(v / d - 0.5 + 1e-12))); near(q.code, code, 0, "nicemleyici"); }
for (const [bits, f, fs] of [[8, 37, 1000], [10, 123, 997], [12, 37, 1000], [6, 3.7, 1000]]) { const a = K.adcRun({ bits, vref: 5, amp: 2.25, f, fs }); rel(a.rms, 5 / Math.pow(2, bits) / Math.sqrt(12), 0.04, "Δ/√12"); }
for (const [f, fs] of [[37, 1000], [950, 1000], [1270, 1000], [2003, 1000], [499, 1000], [740, 2000], [4990, 5000]]) {
  const a = K.adcRun({ bits: 12, vref: 5, amp: 2.25, f, fs }), k = Math.round(f / fs);
  near(a.fa, Math.abs(f - k * fs), Math.abs(Math.abs(f - k * fs) - fs / 2) < 3 ? 0.2 : 0.02, `görünen frekans ${f}/${fs}`); /* f_s/2 yakınında ayna sızıntısı */
}
{ const a = K.adcRun({ bits: 12, vref: 5, amp: 2.25, f: 1000, fs: 1000 }); ok(a.faDC && a.fa === 0, "f = f_s: örnekler sabit"); }
/* ---------- 3. Servo ---------- */
{
  const E = K.expm([[0, 2], [-2, 0]]); near(E[0][0], Math.cos(2), 1e-12); near(E[0][1], Math.sin(2), 1e-12);
  const co = K.charPoly([[2, 0, 0], [0, 3, 0], [1, 1, 5]]); near(co[1], -10, 1e-12); near(co[2], 31, 1e-12); near(co[3], -30, 1e-12);
  /* sürekli eşi, L → küçük: ikinci derece kapalı biçim */
  for (const [Kp, Kd] of [[8, 0.12], [20, 0.3], [4, 0.05]]) {
    const cfg = { Kp, Kd, L: 1e-5 }, th = K.servoTheory(cfg), m = K.servoMetrics(K.servoSim(cfg, { continuous: true }));
    near(m.over, th.over, 0.25, "aşım (L→0)"); rel(m.tpk, th.tp, 0.012, "tepe zamanı (L→0)");
  }
  /* rampa hataları: sürekli eşi, kapalı biçimler */
  const th = K.servoTheory({ ref: "trap" });
  rel(K.servoMetrics(K.servoSim({ ref: "trap", L: 1e-5 }, { continuous: true })).ePlat, th.eVel, 0.01, "hız hatası (K²+Rb)ω/(K·Kp)");
  rel(K.servoMetrics(K.servoSim({ ref: "trap", ff: true, L: 1e-5 }, { continuous: true })).eAcc, th.eAccFF, 0.02, "ivme hatası J·R·α/(K·Kp)");
  ok(Math.abs(K.servoMetrics(K.servoSim({ ref: "trap", ff: true, ffAcc: true, L: 1e-5 }, { continuous: true })).emax) < 0.02 * th.eAccFF, "iki ileri besleme: hata ≈ 0");
  /* kararlılık sınırı: kutuplardan ve benzetimden (iki ayrı yöntem) */
  for (const cfg of [{}, { Ki: 100 }, { Kp: 20, Kd: 0.3 }]) {
    const a = K.servoCriticalTheory(cfg), b = K.servoCriticalMeasured(cfg);
    rel(b, a, 0.003, "kritik T_s"); ok(K.servoDiscrete(cfg, a * 0.97).rho < 1 && K.servoDiscrete(cfg, a * 1.03).rho > 1, "|z| = 1 geçişi");
    ok(K.servoGrowth(cfg, a * 0.97).ratio < 1 && K.servoGrowth(cfg, a * 1.03).ratio > 1, "benzetimde büyüme");
  }
  /* nicemleme: integral yokken |e| < 1 sayım */
  for (const C of [100, 400, 4000, 40000]) { const s = K.servoSim({ C }), m = K.servoMetrics(s); ok(m.essMaxAbs < (TAU / C) * 1.0001, `|e| < 1 sayım (C = ${C})`); }
  /* integral şişmesi */
  const off = K.servoMetrics(K.servoSim({ stepDeg: 360, Ki: 200, aw: false })), on = K.servoMetrics(K.servoSim({ stepDeg: 360, Ki: 200, aw: true }));
  ok(off.over > on.over + 15, "koruma aşımı azaltır");
  /* örnekleme süresi uzadıkça aşım artar */
  const o1 = K.servoMetrics(K.servoSim({ Ts: 1e-3 })).over, o12 = K.servoMetrics(K.servoSim({ Ts: 12e-3 })).over; ok(o12 > o1 + 10, "yavaş örnekleme aşımı artırır");
}
/* ---------- 4. Adım motoru ve dişli ---------- */
for (const rate of [300, 600, 1500]) {
  const c = { micro: 16, rate }, th = K.stepTheory(c), w = (rate * TAU) / 200, Th = 0.4 / Math.sqrt(1 + Math.pow(50 * w * 1.5e-3, 2));
  rel(th.Tpo, Th - 3e-4 * w, 1e-12, "çekme torku formülü");
  rel(K.stepPullout(c).Tpo, th.Tpo, 0.02, "mikroadım çekme torku");
  const r = K.stepRun(c); near(r.slips, 0, 0); near(r.lagEnd, Math.asin((0.05 + 3e-4 * w) / Th), 0.5 * Math.PI / 180, "yük açısı");
  ok(K.stepRun(Object.assign({}, c, { TL: 1.15 * th.Tpo })).slips !== 0, "yük fazlaysa adım kaçar");
  ok(K.stepRun(Object.assign({}, c, { TL: 0.8 * th.Tpo })).slips === 0, "payla adım kaçmaz");
}
{ const f = K.stepPullout({ micro: 1, rate: 600 }).Tpo, m = K.stepPullout({ micro: 16, rate: 600 }).Tpo; ok(f < m, "tam adımın çekme torku mikroadımdan küçük"); }
for (const o of [{}, { JL: 8e-5 }, { Jm: 1e-6, JL: 5e-3, thetaL: 3 }, { Tm: 0.9, JL: 4e-4 }]) {
  const c = K.gearConfig(o), s = K.gearScan(c), nStar = Math.sqrt(c.JL / c.Jm);
  rel(s.nOpt, nStar, 0.005, "n* taramayla"); rel(s.tMin, Math.sqrt((2 * c.thetaL * (c.JL + nStar * nStar * c.Jm)) / (nStar * c.Tm)), 1e-4, "en kısa süre");
  for (const n of [0.7, 3, 25]) rel(K.gearMove(c, n), Math.sqrt((2 * c.thetaL * (c.JL + n * n * c.Jm)) / (n * c.Tm)), 1e-6, "sabit tork süre");
}
{ /* DC motor kipi: bağımsız Euler */
  const c = K.gearConfig({ mode: "dc", thetaL: 20 }), n = 3.4, J = c.Jm + c.JL / (n * n), h = 2e-6;
  let x = 0, w = 0, I = 0, t = 0;
  while (x < 20 * n) { const dI = (c.V - c.R * I - c.K * w) / c.L, dw = (c.K * I - c.b * w) / J; x += h * w; w += h * dw; I += h * dI; t += h; }
  rel(K.gearMove(c, n), t, 2e-3, "DC motor hareket süresi");
  ok(K.gearScan(c).nOpt < 0.5 * Math.sqrt(c.JL / c.Jm), "uzun harekette en iyi oran n*'dan küçük");
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
      page.setDefaultTimeout(10000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error" && !/404|Failed to load resource/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const click = (id) => page.locator("#" + id).click();
      const read = (id) => page.locator("#" + id).textContent();
      const set = (id, v) => page.locator("#" + id).evaluate((el, val) => {
        if (el.type === "checkbox") { el.checked = val; el.dispatchEvent(new Event("change", { bubbles: true })); }
        else { el.value = val; el.dispatchEvent(new Event(el.tagName === "SELECT" ? "change" : "input", { bubbles: true })); }
      }, v);
      const has = async (id, text) => {
        let t = "";
        for (let i = 0; i < 60; i++) { t = await read(id); if (t.includes(text)) break; await page.waitForTimeout(100); }
        assert(t.includes(text), `[${theme} ${width}] #${id}: "${t}" içinde "${text}" yok`); checks++;
      };
      const noOverflow = async (where) => { const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth); assert(o <= 0, `[${width}] yatay taşma ${o}px (${where})`); checks++; };
      const sane = async (where) => {
        await page.waitForFunction(() => ![...document.querySelectorAll('[role="tabpanel"]:not([hidden]) .mk-stat:not([hidden]) strong')].some((e) => e.textContent.includes("ölçülüyor")), null, { timeout: 15000 });
        const bad = await page.evaluate(() => [...document.querySelectorAll('[role="tabpanel"]:not([hidden]) .mk-stat:not([hidden]), [role="tabpanel"]:not([hidden]) .mk-status, [role="tabpanel"]:not([hidden]) output')].map((e) => e.textContent).filter((t) => /NaN|undefined|Infinity|null|\[object/.test(t) || t.trim() === ""));
        assert.deepEqual(bad, [], `[${theme} ${width}] bozuk okuma (${where})`); checks++;
      };
      const painted = async (id) => {
        const n = await page.locator("#" + id).evaluate((cv) => { const d = cv.getContext("2d").getImageData(0, 0, cv.width, cv.height).data; let k = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) k++; return k; });
        assert(n > 400, `[${theme} ${width}] #${id} boş tuval (${n})`); checks++;
      };
      /* yapı ve erişilebilirlik */
      const unl = await page.evaluate(() => [...document.querySelectorAll(".app-content input, .app-content select")].filter((e) => !(e.labels && e.labels.length)).map((e) => e.id));
      assert.deepEqual(unl, [], "etiketsiz denetim"); checks++;
      assert.equal(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].filter((c) => c.getAttribute("role") !== "img" || !c.getAttribute("aria-label")).length), 0, "tuval rolü"); checks++;
      assert.equal(await page.evaluate(() => Object.isFrozen(window.MekatronikLab) && !Object.getOwnPropertyDescriptor(window, "MekatronikLab").writable), true); checks++;
      assert.equal(await page.evaluate(() => /[̀-ͯ]/.test(document.querySelector(".app-content").textContent.normalize("NFC"))), false, "birleşik işaret olmamalı"); checks++;
      assert.equal(await page.evaluate(() => [...document.querySelectorAll("script[src]")].every((e) => new URL(e.src).origin === location.origin)), true, "dış betik yok"); checks++;
      assert.equal((html.match(/<script src=/g) || []).length, 1, "sayfada yalnız app.js"); checks++;
      /* 01 DC motor */
      await has("dcWss", "4547.3 dev/dk"); await has("dcT63", "15.881 ms"); await has("dcT63Sub", "15.873 ms"); await has("dcIpk", "11.03 A"); await has("dcIst", "12.000 A");
      await has("dcWnl", "4547.3 dev/dk"); await has("dcTst", "0.600 N·m"); await has("dcPmax", "71.43 W · 0.300 N·m"); await has("dcEta", "83.63 %");
      await has("dcPw", "2273.7 dev/dk"); await has("dcPwSub", "2273.6 dev/dk"); await has("dcPr", "1.196 A"); await has("dcPm", "sürekli");
      await sane("dc"); await noOverflow("dc"); for (const id of ["dcChart", "dcCur", "dcDyno", "dcPwm"]) await painted(id);
      await click("dcPDiode"); await has("dcPm", "kesintili"); await has("dcPw", "4397.0 dev/dk"); await has("dcStatus", "93.4 % hızlı"); await sane("dc diyot");
      await click("dcPLoad"); await has("dcWss", "3410.5 dev/dk"); await has("dcT63", "16.047 ms");
      await click("dcPInd"); await has("dcStatus", "kutuplar karmaşık"); await has("dcT63Sub", "2.905 ms");
      await set("dcTL", 1); await has("dcT63", "—"); await has("dcStatus", "kaldıramaz"); await sane("dc aşırı yük");
      await set("dcD", 0); await has("dcPrSub", "dalgalanma yok"); await set("dcD", 100); await sane("dc D sınırları");
      await click("dcReset"); await has("dcVOut", "24 V"); await has("dcWss", "4547.3 dev/dk"); await has("dcJOut", "200 g·cm²");
      /* 02 Sensörler */
      await click("tab-sn");
      await has("snC", "400 sayım/tur"); await has("snMSub", "29.133"); await has("snM", "en büyük 13.00 dev/dk"); await has("snMSub", "13.00 dev/dk"); await has("snT", "en büyük 0.0727 %");
      await has("snX", "3000 dev/dk"); await has("snDir", "ileri"); await has("snCnt", "0 sayım");
      await has("snLsb", "19.53 mV"); await has("snQ", "5.696 mV"); await has("snQSub", "5.638 mV"); await has("snSnr", "48.92 dB"); await has("snFa", "37.00 Hz");
      await sane("sn"); await noOverflow("sn"); for (const id of ["snDisk", "snQuad", "snErr", "snAdc", "snHist"]) await painted(id);
      await click("snPFast"); await has("snTSub", "darbe sayısı tam sayı"); await has("snStatus", "tam 120 saat darbesi");
      await click("snPAlias"); await has("snFa", "50.00 Hz"); await has("snAdcStatus", "Nyquist sınırının (500 Hz) üstünde");
      await click("snPSync"); await has("snAdcStatus", "20 farklı evresine"); await has("snQ", "7.002 mV");
      await click("snPClip"); await has("snSnrSub", "geçersiz"); await has("snAdcStatus", "aralığı aşıyor");
      await click("snPMiss"); await has("snDir", "güvenilmez"); await has("snStatus", "f_çöz'ü artır");
      await click("snPOsc"); await has("snDir", "2 dönüş");
      await set("snDirSel", "-1"); await has("snDir", "geri");
      await click("snPSlow"); await has("snStatus", "1 ya da 2 kenar");
      await set("snRpm", 1); await sane("sn 1 dev/dk"); await set("snRpm", 6000); await set("snBits", 16); await set("snF", 5000); await set("snFs", 50); await sane("sn sınırlar");
      await page.evaluate(() => document.activeElement.blur());
      await page.keyboard.press("Space"); await has("snPlay", "Oynat"); await page.keyboard.press("Space"); await has("snPlay", "Duraklat");
      await page.keyboard.press("r"); await has("snRpmOut", "437 dev/dk"); await has("snFOut", "37 Hz");
      /* 03 Servo */
      await click("tab-sv");
      await has("svOver", "5.63 %"); await has("svOverSub", "5.79 %"); await has("svOverSub", "5.71 %"); await has("svTp", "64.3 ms"); await has("svTs", "90.7 ms");
      await has("svZeta", "ζ = 0.674 · ωn = 63.25 rad/s"); await has("svEss", "0.95 sayım"); await has("svRho", "0.9557 · kararlı"); await has("svCritSub", "17.50 ms");
      await sane("sv"); await noOverflow("sv"); for (const id of ["svChart", "svErr", "svU"]) await painted(id);
      await click("svCritBtn"); await has("svCrit", "17.497 ms"); await has("svCritSub", "fark 0.00 %");
      await click("svPSlow"); await has("svOver", "25.02 %"); await has("svCrit", "—");
      await click("svPWind"); await has("svOver", "59.99 %"); await has("svStatus", "Koruma kapalı"); await set("svAw", true); await has("svOver", "29.66 %");
      await click("svPQuant"); await has("svEss", "1.00 sayım"); await has("svOverSub", "yalnız K_i = 0 için");
      await click("svPTrap"); await has("svEv", "21.6°"); await has("svEvSub", "21.7°"); assert.equal(await page.locator("#svOver").isVisible(), false); checks++;
      await click("svPFf"); await has("svEa", "8.46°"); await has("svEaSub", "8.59°");
      await click("svPFfa"); await has("svEm", "0.328°");
      await click("svReset"); await has("svOver", "5.63 %"); await set("svTsamp", 16); await has("svTs", "koşu süresi yetmedi"); await has("svEssSub", "kalıcı bir hata değil"); await has("svStatus", "yetmiyor");
      await set("svTsamp", 20); await has("svRho", "kararsız"); await has("svStatus", "kararsız"); await sane("sv kararsız");
      await set("svTsamp", 0.1); await set("svKp", 40); await set("svKd", 1); await set("svC", "inf"); await sane("sv sınır");
      await click("svReset"); await has("svOver", "5.63 %"); await has("svKpOut", "8.0 V/rad");
      /* 04 Adım motoru ve dişli */
      await click("tab-st");
      await has("stAng", "1.8000° · 200 adım/tur"); await has("stSpd", "600 darbe/s · 180.0 dev/dk"); await has("stMiss", "0 tam adım"); await has("stLag", "15.7°"); await has("stLagSub", "13.9°");
      await has("stPo", "0.202 N·m"); await has("stPoSub", "0.225 N·m"); await has("gOpt", "n = 10.000"); await has("gTmin", "51.64 ms"); await has("gTn", "57.74 ms"); await has("gJr", "800.0 g·cm²");
      await sane("st"); await noOverflow("st"); for (const id of ["stChart", "stPull", "gChart"]) await painted(id);
      await click("stPOver"); await has("stMiss", "872 tam adım"); await has("stStatus", "kutup kaydırıyor");
      await click("stPMicro"); await has("stPo", "0.225 N·m"); await has("stLag", "14.0°"); await has("stHoldSub", "1.3 adım");
      await click("stPHalf"); await has("stPo", "0.219 N·m");
      await click("gPLong"); await has("gOpt", "n = 3.433"); await has("gStatus", "küçük çıkar");
      await click("gPLight"); await has("gOpt", "n = 2.000"); await click("gPOpt"); await has("gNOut", "2.0"); await has("gJrSub", "1.000");
      await click("gReset"); await has("gOpt", "n = 10.000"); await has("stHoldSub", "m = 2");
      await click("stReset"); await has("stModeOut", "tam adım"); await has("stPo", "0.202 N·m");
      await set("stRate", 4000); await set("stTL", 0.4); await set("stJL", 200); await sane("st sınır"); await set("gJL", 100); await set("gJm", 500); await set("gN", 50); await sane("dişli sınır");
      await click("stCurveBtn"); await page.waitForFunction(() => !document.getElementById("stStatus").textContent.includes("ölçülüyor"), null, { timeout: 30000 }); checks++;
      /* klavye */
      await page.locator("#tab-st").focus();
      await page.keyboard.press("Home"); assert.equal(await page.locator("#tab-dc").getAttribute("aria-selected"), "true");
      await page.keyboard.press("ArrowRight"); assert.equal(await page.locator("#tab-sn").getAttribute("aria-selected"), "true");
      await page.keyboard.press("End"); assert.equal(await page.locator("#tab-st").getAttribute("aria-selected"), "true");
      await page.keyboard.press("ArrowRight"); assert.equal(await page.locator("#tab-dc").getAttribute("aria-selected"), "true");
      await page.keyboard.press("ArrowLeft"); assert.equal(await page.locator("#tab-st").getAttribute("aria-selected"), "true");
      assert.equal(await page.locator("#panel-dc").isHidden(), true); assert.equal(await page.locator("#tab-dc").getAttribute("tabindex"), "-1"); checks += 7;
      await click("tab-dc"); await set("dcV", 12); await has("dcVOut", "12 V");
      await page.locator("#dcV").focus(); await page.keyboard.press("r"); await has("dcVOut", "12 V"); await page.keyboard.press("ArrowRight"); await has("dcVOut", "13 V");
      await page.evaluate(() => document.activeElement.blur()); await page.keyboard.press("r"); await has("dcVOut", "24 V");
      await noOverflow("son");
      await page.waitForTimeout(300);
      assert.deepEqual(errors, [], `[${theme} ${width}] konsol hataları`); checks++;
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} tarayıcı kontrolü (390 px açık, 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
