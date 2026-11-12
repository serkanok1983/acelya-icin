// G · iklim-ve-sera-etkisi.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// T⁴ gevşemesinin kapalı çözümü, N katmanlı gri atmosferin doğrudan doğrusal sistem çözümü (Gauss eleme),
// oyuncak bandın Ein(z) özel işleviyle kesin integrali, iki kutulu modelin özvektör çözümü ve ayrı bir RK2,
// dengelerin ve kıvrımların ince ızgarada kaba kuvvet araması, kazanç deneyinin bisection ile kesin dengesi.
// Kullanım: node scripts/check-g-iklim-ve-sera-etkisi.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "iklim-ve-sera-etkisi";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.ClimateLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
const SIG = 5.670374419e-8, YR = 365.25 * 86400;
near(K.SIGMA, SIG, 1e-15, "σ");

/* ── 1. Enerji dengesi ── */
// NASA tablolarıyla karşılaştırma (Venüs, Mars: 0,1 K; Dünya: α = 0,306 ile tablo değeri)
const Tbb = (S, a) => Math.sqrt(Math.sqrt(S * (1 - a) / (4 * SIG)));
near(K.Te(2601.3, 0.77), 226.6, 0.05 / 226.6, "Venüs T_e"); near(K.Te(586.2, 0.25), 209.8, 0.05 / 209.8, "Mars T_e");
near(K.Te(1361, 0.306), 254.0, 0.05 / 254, "Dünya, α = 0,306"); near(K.Te(1361, 0.294), 255.12, 0.01 / 255, "Dünya T_e");
for (const [S, a, e] of [[1361, 0.294, 1], [900, 0.1, 0.6], [2601.3, 0.77, 0.3]]) near(K.Te(S, a, e), Tbb(S, a) / Math.pow(e, 0.25), 1e-12, "T*");
// Kapalı çözüm: t(T) = C/(4εσT*³)[2 atan(T/T*) + ln|(T*+T)/(T*−T)|]
const tOf = (T, Teq, C, e) => C / (4 * e * SIG * Teq ** 3) * (2 * Math.atan(T / Teq) + Math.log(Math.abs((Teq + T) / (Teq - T))));
for (const [S, a, e, h, T0] of [[1361, 0.294, 1, 50, 200], [1361, 0.294, 1, 50, 330], [2601.3, 0.77, 0.4, 5, 150], [586.2, 0.25, 0.9, 120, 400], [1361, 0.294, 0.61, 1, 260]]) {
  const C = h * 4.186e6, b = K.planetBox({ S, alpha: a, eps: e, C, T0 }), Teq = Tbb(S, a) / e ** 0.25;
  // zamanı kapalı çözümle karşılaştır: belli bir t'de T
  const target = Teq + (T0 - Teq) * 0.3, tTarget = tOf(target, Teq, C, e) - tOf(T0, Teq, C, e);
  b.advance(Math.floor(tTarget / b.h) * b.h); const rem = tTarget - b.t; b.advance(rem);
  near(b.T, target, 2e-9, `T(t) kapalı çözüm, T0=${T0}`);
  let E0 = 0, last = b.T; const C0 = C; // enerji korunumu: C ΔT = ∫(soğurulan − giden) dt
  const T1 = b.T, chunk = b.h; let integ = 0; for (let i = 0; i < 400; i++) { const f0 = b.absorbed - e * SIG * b.T ** 4; b.advance(chunk); const f1 = b.absorbed - e * SIG * b.T ** 4; integ += (f0 + f1) / 2 * chunk; }
  near(C0 * (b.T - T1), integ, 1e-4, "enerji bütçesi");
  while (b.tauMeas === null && b.t < 200 * b.tau) b.advance(b.h * 13);
  const s = Math.sign(T0 - Teq), exact = tOf(Teq + s * 0.1 / Math.E, Teq, C, e) - tOf(Teq + s * 0.1, Teq, C, e);
  near(b.tauMeas, exact, 1e-8, "ölçülen τ = kapalı çözüm"); near(b.tauMeas, C / (4 * e * SIG * Teq ** 3), 1e-3, "τ ≈ doğrusal kuram");
  ok(Math.sign(b.tauMeas - b.tau) === -s, "doğrusal olmayışın işareti");
  near(K.relaxExactSpan(Teq - 1, Teq - 0.5, Teq, C, e), tOf(Teq - 0.5, Teq, C, e) - tOf(Teq - 1, Teq, C, e), 1e-12);
}
{ const b = K.planetBox({ S: 1361, alpha: 0.294, eps: 1, C: 50 * 4.186e6, T0: 200 }); while (b.tauMeas === null) b.advance(b.h * 7);
  near(b.tauMeas / YR, 1.76162, 2e-5, "varsayılan τ"); near(b.tau / YR, 1.76096, 2e-5, "varsayılan kuram"); near(b.eStart / YR, 2.16968, 2e-5, "ilk 1/e"); }
{ const b = K.planetBox({ S: 1361, alpha: 0.294, eps: 1, C: 2e8, T0: 255.05 }); ok(!b.measurable, "0,1 K içinde ölçülemez"); b.advance(50 * YR); ok(b.tauMeas === null, "ölçüm yok"); }

/* ── 2. Katmanlı atmosfer: doğrudan doğrusal sistem ── */
function gauss(A, b) { const n = b.length, M = A.map((r, i) => [...r, b[i]]); for (let c = 0; c < n; c++) { let p = c; for (let i = c + 1; i < n; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i; [M[c], M[p]] = [M[p], M[c]]; for (let i = 0; i < n; i++) if (i !== c) { const k = M[i][c] / M[c][c]; for (let j = c; j <= n; j++) M[i][j] -= k * M[c][j]; } } return M.map((r, i) => r[n] / r[i]); }
function direct(N, e, F) { // bilinmeyenler B_i = σT_i⁴, i = 0 yüzey
  const n = N + 1, A = Array.from({ length: n }, () => Array(n).fill(0)), b = Array(n).fill(0);
  A[0][0] = 1; for (let j = 1; j <= N; j++) A[0][j] = -e * (1 - e) ** (j - 1); b[0] = F;
  for (let i = 1; i <= N; i++) { A[i][i] = 2 * e; A[i][0] = -e * (1 - e) ** (i - 1); for (let j = 1; j <= N; j++) if (j !== i) A[i][j] = -e * e * (1 - e) ** (Math.abs(i - j) - 1); }
  return gauss(A, b).map((B) => Math.pow(B / SIG, 0.25));
}
const F = 1361 * (1 - 0.294) / 4, TeE = Tbb(1361, 0.294);
for (const N of [0, 1, 2, 3, 6, 10]) for (const e of [0.05, 0.3, 0.78, 0.99, 1]) {
  const r = K.layersSolve({ N, eps: e, Fabs: F }); ok(r.converged, "yakınsama");
  const d = direct(N, e, F); d.forEach((T, i) => near(r.T[i], T, 1e-9, `N=${N} ε=${e} düzey ${i}`));
  near(r.olr, F, 1e-9, "tepe dengesi");
}
for (const N of [0, 1, 4, 10]) near(K.layersSolve({ N, eps: 1, Fabs: F }).Ts, TeE * (N + 1) ** 0.25, 1e-9, "(N+1)^(1/4)");
for (const e of [0, 0.2, 0.5, 0.77, 1]) near(K.layersSolve({ N: 1, eps: e, Fabs: F }).Ts, TeE * (2 / (2 - e)) ** 0.25, 1e-9, "tek katman ε");
{ const e = K.epsForTs(TeE, 288); near(K.layersSolve({ N: 1, eps: e, Fabs: F }).Ts, 288, 1e-9, "288 K uydurması"); near(e, 0.76845, 1e-4); }
near(K.layersSolve({ N: 1, eps: 1, Fabs: F }).Ts, 303.393, 1e-6, "varsayılan T_s");

/* ── 3. Zorlama ── */
const EULER = 0.5772156649015329;
function Ein(z) { if (z < 20) { let s = 0, t = 1; for (let k = 1; k < 200; k++) { t *= z / k; const term = (k % 2 ? 1 : -1) * t / k; s += term; if (Math.abs(term) < 1e-18) break; } return s; }
  let e1 = 0, t = 1; for (let k = 0; k < 30; k++) { e1 += t; t *= -(k + 1) / z; if (Math.abs(t) < 1e-17) break; } return Math.log(z) + EULER + Math.exp(-z) / z * e1; }
for (const [a, b] of [[0.1, 0.2], [0.25, 0.5], [1, 2], [4, 8], [30, 60], [278, 556], [1000, 2000], [556, 278]]) near(K.bandForcing(b, a), 5.35 * (Ein(b) - Ein(a)), 1e-7, `bant ${a}→${b}`);
for (const c of [30, 100, 278, 556, 1000]) near(K.bandForcing(2 * c, c), 5.35 * Math.LN2, 1e-9, "log yasası");
ok(K.bandForcing(2, 1) < 0.8 * 5.35 * Math.LN2, "düşük derişimde log yasası bozulur");
near(K.forcingLog(556, 278), 3.70834, 1e-5); near(K.forcingLog(1, 1), 0, 1e-15);
// İki kutu: özvektör çözümü
function eig2(p) { const a = -(1 / p.lambda + p.gamma) / p.Cs, b = p.gamma / p.Cs, c = p.gamma / p.Cd, d = -p.gamma / p.Cd; const m = (a + d) / 2, q = Math.sqrt(((a - d) / 2) ** 2 + b * c); return { mu: [m + q, m - q], vec: [[b, m + q - a], [b, m - q - a]] }; }
for (const p of [{ lambda: 0.81, gamma: 0.7, Cs: 8, Cd: 100 }, { lambda: 1.2, gamma: 0.3, Cs: 15, Cd: 300 }, { lambda: 0.4, gamma: 1.5, Cs: 3, Cd: 40 }]) {
  const C0 = 278, C = 556, Fx = 5.35 * Math.log(C / C0), Teq = p.lambda * Fx, E = eig2(p);
  // y(0) = 0 = y_eq + c1 v1 + c2 v2, y_eq = (Teq, Teq)
  const [v1, v2] = E.vec, det = v1[0] * v2[1] - v2[0] * v1[1], c1 = (-Teq * v2[1] + Teq * v2[0]) / det, c2 = (-v1[0] * Teq + v1[1] * Teq) / det;
  const exact = (t) => [0, 1].map((i) => Teq + c1 * v1[i] * Math.exp(E.mu[0] * t) + c2 * v2[i] * Math.exp(E.mu[1] * t));
  const run = K.twoBox({ ...p, C0, C });
  for (const t of [1, 10, 70, 500]) { run.advance(t - run.t); const ex = exact(t); near(run.y[0], ex[0], 1e-8, "T_s"); near(run.y[1], ex[1], 1e-8, "T_d"); }
  const th = K.twoBoxEigen(p); near(th.tauSlow, -1 / E.mu[0], 1e-10); near(th.tauFast, -1 / E.mu[1], 1e-10);
  const full = K.twoBox({ ...p, C0, C }); full.advance(Math.min(3000, Math.max(300, 6 * th.tauSlow)));
  const m = K.measureTimescales(full.hist, full.Teq); near(m.tauSlow, th.tauSlow, 1e-4, "ölçülen yavaş"); near(m.tauFast, th.tauFast, 2e-3, "ölçülen hızlı");
}
{ // rampa: ayrı RK2, h = 0,001 yıl
  const p = { lambda: 0.81, gamma: 0.7, Cs: 8, Cd: 100 }, rate = Math.log(1.01) * 5.35, tR = Math.log(2) / Math.log(1.01);
  let T = 0, D = 0; const f = (t, T, D) => [((t < tR ? rate * t : 5.35 * Math.LN2) - T / p.lambda - p.gamma * (T - D)) / p.Cs, p.gamma * (T - D) / p.Cd], h = 0.001;
  for (let i = 0; i < 70000; i++) { const t = i * h, k1 = f(t, T, D), k2 = f(t + h / 2, T + h / 2 * k1[0], D + h / 2 * k1[1]); T += h * k2[0]; D += h * k2[1]; }
  const r = K.twoBox({ ...p, C0: 278, C: 556, scenario: "ramp" }); r.advance(70); near(r.y[0], T, 1e-5, "rampa 70. yıl"); near(r.tRamp, 69.6607, 1e-5);
}
{ const r = K.twoBox({ lambda: 0.81, gamma: 0.7, Cs: 8, Cd: 100, C0: 278, C: 278 }); r.advance(500); ok(K.measureTimescales(r.hist, r.Teq) === null, "zorlama yoksa ölçüm yok"); }

/* ── 4. Geri beslemeler ── */
const P = K.ICE_DEFAULT, alb = (T) => P.aWarm + (P.aIce - P.aWarm) / (1 + Math.exp(2 * (T - P.Tmid) / P.width)); // tanh'ın lojistik biçimi
for (const T of [200, 250, 265, 280, 320]) near(K.albedoT(T, P), alb(T), 1e-12, "albedo");
function brute(S) { const out = []; let prev = null; for (let T = 150; T <= 400; T += 0.001) { const v = S * (1 - alb(T)) / 4 - P.eps * SIG * T ** 4; if (prev !== null && prev * v < 0) out.push(T); prev = v; } return out; }
for (const f of [0.8, 1, 1.05, 1.1]) { const e = K.equilibria(f * P.S0, P), b = brute(f * P.S0); ok(e.length === b.length, `denge sayısı f=${f}`); e.forEach((x, i) => near(x.T, b[i], 2e-3 / 300, "denge T")); if (e.length === 3) ok(e[0].stable && !e[1].stable && e[2].stable, "kararlılık deseni"); }
{ const e = K.equilibria(P.S0, P); near(e[0].T, 247.797, 1e-5); near(e[1].T, 261.192, 1e-5); near(e[2].T, 289.793, 1e-5);
  // kararlılığı dT/dt işaretiyle doğrula
  for (const x of e) { const up = K.netFlux(x.T + 0.5, P.S0, P), dn = K.netFlux(x.T - 0.5, P.S0, P); ok(x.stable === (up < 0 && dn > 0), "dT/dt işareti"); } }
{ const Sx = []; for (let T = 200; T <= 320; T += 0.0005) Sx.push([T, 4 * P.eps * SIG * T ** 4 / (1 - alb(T)) / P.S0]); const ext = []; for (let i = 1; i < Sx.length - 1; i++) { const [, a] = Sx[i - 1], [, b] = Sx[i], [, c] = Sx[i + 1]; if ((b > a && b > c) || (b < a && b < c)) ext.push(Sx[i]); }
  const fo = K.folds(P); ok(fo.length === 2 && ext.length === 2, "iki kıvrım"); fo.forEach((x, i) => { near(x.T, ext[i][0], 1e-5, "kıvrım T"); near(x.S / P.S0, ext[i][1], 1e-9, "kıvrım S"); });
  const sw = K.sweepS(P, { fLo: 0.75, fHi: 1.3, step: 0.005 }), mx = fo.find((x) => x.kind === "max").S / P.S0, mn = fo.find((x) => x.kind === "min").S / P.S0;
  ok(sw.jumpUp.from < mx && mx <= sw.jumpUp.to, `yukarı sıçrama ${sw.jumpUp.from}–${sw.jumpUp.to} ∋ ${mx}`); ok(sw.jumpDown.to < mn && mn <= sw.jumpDown.from, `aşağı sıçrama ∋ ${mn}`);
  near(mx, 1.0629, 1e-4); near(mn, 0.8334, 1e-4);
  const st = K.sweepS(P, { fLo: 0.75, fHi: 1.3, step: 0.0025 }); ok(st.jumpUp.from < mx && mx <= st.jumpUp.to, "yarım adımda da");
  ok(K.folds({ ...P, aIce: 0.28 }).length === 0, "albedo farkı yoksa kıvrım yok"); }
for (const f of [0, 0.3, 0.5, 0.8, 0.9]) { const g = K.gainSeries(f, 40); near(g[39], (1 - f ** 40) / (1 - f), 1e-12, "geometrik dizi"); }
for (const [dF, f] of [[3.71, 0.5], [0.371, 0.5], [3.71, 0], [7, 0.8], [1, 0.9]]) {
  const r = K.gainRun({ dF, f }), eps = 0.612, A = 1361 * 0.706 / 4, T0 = (A / (eps * SIG)) ** 0.25, lp = 1 / (4 * eps * SIG * T0 ** 3);
  const solve = (ff) => { let a = T0, b = T0 + 60; for (let i = 0; i < 200; i++) { const m = (a + b) / 2; (A + dF + ff * (m - T0) / lp - eps * SIG * m ** 4 > 0 ? (a = m) : (b = m)); } return (a + b) / 2 - T0; };
  near(r.dT0, solve(0), 1e-7, "ΔT0 kesin"); near(r.dT, solve(f), 1e-6, "ΔT kesin");
  if (dF < 0.5) near(r.gain, 1 / (1 - f), 0.003, "küçük zorlamada doğrusal kazanç");
}
{ const r = K.gainRun({ dF: 3.71, f: 0.5 }); near(r.gain, 1.96677, 1e-4); ok(K.gainRun({ dF: 0, f: 0.5 }).gain === null, "ΔF = 0"); }
for (const bad of [() => K.Te(-1, 0.3), () => K.layersSolve({ N: 1.5, eps: 1, Fabs: 240 }), () => K.forcingLog(0, 278), () => K.gainRun({ dF: 1, f: 1 }), () => K.planetBox({ S: 1361, alpha: 0.3, eps: 1, C: 0, T0: 200 })]) { assert.throws(bad); checks++; }
console.log(`G iklim: ${checks.toLocaleString("tr-TR")} kapalı çözüm, doğrusal sistem, Ein integrali, özvektör ve kaba kuvvet kontrolü PASS`);

/* ── Tarayıcı ── */
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
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, t) => { const v = await read(id); assert(v.includes(t), `${id}: "${v}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const until = async (fn, ms = 20000) => { await page.waitForFunction(fn, null, { timeout: ms }); checks++; };
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      // Her kaydırıcının varsayılanı adımına oturuyor
      const offStep = await page.evaluate(() => [...document.querySelectorAll("input[type=range]")].filter((e) => { const k = (+e.getAttribute("value") - +e.min) / +e.step; return Math.abs(k - Math.round(k)) > 1e-6; }).map((e) => e.id));
      assert.deepEqual(offStep, []); checks++;
      // 1 · Enerji dengesi
      await has("e1Teq", "255,12 K"); await has("e1Abs", "240,2 W/m²"); await has("e1TauT", "1,761 yıl");
      await page.click("#e1Skip"); await has("e1TauM", "1,7616 yıl"); await has("e1TauD", "+0,037 %"); await has("e1Status", "kapalı çözümü");
      await sel("e1Planet", "venus"); await has("e1Teq", "226,63 K"); await has("e1SOut", "2.601,3"); await sel("e1Planet", "mars"); await has("e1Teq", "209,83 K");
      await range("e1S", 1358.4); ok((await page.locator("#e1Planet").inputValue()) === "custom", "serbest kip"); await range("e1Alpha", 0.294); await range("e1T0", 255);
      await has("e1TauM", "tanımsız"); await has("e1Status", "ölçülemez");
      await range("e1S", 3000); await range("e1Alpha", 0); await range("e1Eps", 0.1); await range("e1T0", 400); await page.click("#e1Skip"); await has("e1TauD", "fark");
      await range("e1S", 100); await range("e1Alpha", 0.95); await range("e1Eps", 1); await range("e1Depth", 1); await range("e1T0", 100); await page.click("#e1Skip"); await has("e1TauM", "yıl");
      await page.click("#enerjiReset"); await has("e1Teq", "255,12 K"); await has("e1T0Out", "200 K");
      // Defter deneyi 1: h = 100 m, sonra T₀ = 330 K
      await range("e1Depth", 100); await page.click("#e1Skip"); await has("e1TauM", "3,5232 yıl"); await has("e1Teq", "255,12 K");
      await range("e1Depth", 50); await range("e1T0", 330); await page.click("#e1Skip"); await has("e1TauD", "−0,037 %"); await has("e1Status", "1,344 yıl");
      await page.click("#enerjiReset");
      await page.click("#e1Run"); ok((await read("e1Run")) === "Devam et", "duraklat");
      await page.locator("h1").click(); await page.keyboard.press("Space"); ok((await read("e1Run")) === "Duraklat", "Boşluk");
      // Sekme klavyesi
      await page.locator("#tab-enerji").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-geri").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-katman").getAttribute("aria-selected")) === "true", "ArrowRight");
      // 2 · Katmanlar
      await has("k2Ts", "303,393 K"); await has("k2Th", "303,393 K"); await has("k2Olr", "240,2165"); await has("k2Ze", "7,43 km");
      await page.click("#k2Fit"); await has("k2EpsOut", "0,77"); await has("k2Ts", "288,091"); await has("k2Status", "23,0 %’si hiçbir"); ok(await page.locator("#k2Eps").isEnabled(), "kısmi kipte ε açık");
      await range("k2N", 3); await has("k2Th", "kapalı formül yok"); await range("k2Eps", 0); await has("k2Status", "Soğurucu katman yok");
      await sel("k2Mode", "full"); await range("k2N", 10); await has("k2Ts", "464,618"); await range("k2N", 0); await has("k2Ts", "255,122");
      await range("k2Alpha", 0.9); await range("k2Gamma", 10); await has("k2GammaOut", "10,0 K/km");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("k2Ts", "303,393 K"); ok(await page.locator("#k2Eps").isDisabled(), "R sıfırlar (2)");
      // 3 · Zorlama
      await page.click("#tab-zorlama"); await has("z3F", "+3,708 W/m²"); await has("z3Teq", "+3,004 K"); await has("z3Ecs", "2,5–4 °C aralığında");
      await page.click("#z3Skip"); await has("z3TauF", "4,092 yıl"); await has("z3TauS", "226,25 yıl"); await has("z3T70", "+2,176 K");
      await sel("z3Scen", "ramp"); await has("z3TauF", "ani senaryoda"); await page.click("#z3Skip"); await has("z3T70", "+1,933 K");
      await sel("z3Scen", "step"); await range("z3C", 278); await has("z3TauS", "tanımsız"); await has("z3Status", "zorlama yok");
      await range("z3C0", 1); await page.click("#z3Double"); await has("z3COut", "2 ppm"); await has("z3Fb", "+2,796"); await has("z3Status", "doymamış");
      await range("z3C0", 1000); await page.click("#z3Double"); await has("z3COut", "2000 ppm".replace("2000", "2.000"));
      await range("z3Lambda", 1.5); await range("z3Gamma", 0.1); await range("z3Cd", 400); await range("z3Cs", 30); await page.click("#z3Skip"); await has("z3TauS", "yıl");
      await has("z3Rows", "1.000"); ok((await page.locator("#z3Rows tr.is-mark").count()) === 1, "seçili C₀ satırı");
      await page.click("#zorlamaReset"); await has("z3F", "+3,708 W/m²"); ok((await read("z3Run")) === "Duraklat", "sıfırlama koşuyu başlatır");
      // 4 · Geri beslemeler
      await page.click("#tab-geri"); await has("g4Eq", "247,8 K kararlı"); await has("g4Eq", "261,2 K kararsız"); await has("g4UpD", "1,0629"); await has("g4DownD", "0,8334");
      await page.click("#g4Relax"); await until(() => /kararlı dengeye/.test(document.getElementById("g4FinalNote").textContent)); await has("g4Final", "247,80 K");
      await range("g4T0", 270); await page.click("#g4Relax"); await until(() => /kararlı dengeye/.test(document.getElementById("g4FinalNote").textContent)); await has("g4Final", "289,79 K");
      await page.click("#g4Sweep"); await until(() => /–/.test(document.getElementById("g4Up").textContent)); await has("g4Up", "1,060 – 1,065"); await has("g4Down", "0,830 – 0,835"); await has("g4Status", "gidilen yol");
      await range("g4S", 1.3); await has("g4Eq", "kararlı"); await range("g4S", 0.75); await has("g4Status", "tek denge");
      await range("g4AIce", 0.4); await range("g4AWarm", 0.4); await has("g4Width", "yok"); await has("g4Up", "kıvrım yok");
      await has("g4G", "1,9668"); await has("g4GT", "2,0000"); await has("g4Ser", "1,9375");
      await range("g4F", 0.9); await has("g4GT", "10,0000"); await range("g4dF", 0); await has("g4G", "tanımsız"); await range("g4N", 30); await has("g4NOut", "30");
      await page.click("#geriReset"); await has("g4G", "1,9668"); await has("g4AIceOut", "0,62");
      // Taşma ve hatalar
      for (const t of ["enerji", "katman", "zorlama", "geri"]) { await page.click("#tab-" + t); const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth); ok(ov <= 0, `${t}: yatay taşma ${ov}px (${width})`); }
      ok((await page.locator(".digest").count()) > 0, "defter görünür");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
  } finally { await browser?.close(); server.close(); }
  console.log(`G iklim tarayıcı: ${(checks - before).toLocaleString("tr-TR")} arayüz kontrolü PASS (390 px açık, 1280 px koyu)`);
}
