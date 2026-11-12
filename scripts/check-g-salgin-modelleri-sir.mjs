// Salgın modelleri (SIR): çekirdeğin bağımsız denetimi (Lambert W, korunan nicelik, ayrı bir RK2 çözücü, ayrı yazılmış
// kesin son büyüklük özyinelemesi, birlik–bul ile bağ süzülmesi, sayısal Jacobian) ve isteğe bağlı tarayıcı denetimi
// (390 px açık, 1280 px koyu). Kullanım: node scripts/check-g-salgin-modelleri-sir.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "salgin-modelleri-sir";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.EpiLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");

/* ── Bağımsız araçlar ── */
function lambertW0(x) { // Halley yinelemesi, x ≥ −1/e
  let w = x < 1 ? (x > -0.3 ? x : -1 + Math.sqrt(2 * (1 + Math.E * x))) : Math.log(1 + x);
  for (let i = 0; i < 100; i++) { const e = Math.exp(w), f = w * e - x, d = e * (w + 1) - (w + 2) * f / (2 * w + 2); const nw = w - f / d; if (Math.abs(nw - w) < 1e-15) { w = nw; break; } w = nw; }
  return w;
}
const finalW = (R0, s0, r0 = 0) => -lambertW0(-s0 * R0 * Math.exp(-R0 * (1 - r0))) / R0; // s∞ (Wikipedia, Lambert W biçimi)
function rk2SIR(beta, gamma, N, I0, h = 0.002) { // orta nokta yöntemi; zirve anı I' işaret değişiminden
  let S = N - I0, I = I0, t = 0, prev = beta * S * I / N - gamma * I;
  for (;;) {
    const d = (S, I) => [-beta * S * I / N, beta * S * I / N - gamma * I];
    const [a1, b1] = d(S, I), [a2, b2] = d(S + 0.5 * h * a1, I + 0.5 * h * b1);
    S += h * a2; I += h * b2; t += h;
    const now = beta * S * I / N - gamma * I;
    if (prev > 0 && now <= 0) return { tPeak: t - h * now / (now - prev), I };
    prev = now; if (t > 3000) return null;
  }
}

/* ── 1. Deterministik SIR ── */
for (const [beta, gamma, N, I0] of [[0.3, 0.1, 1e5, 10], [0.15, 0.1, 1e5, 10], [0.6, 0.1, 1e4, 1], [0.5, 0.2, 1e6, 100], [1.5, 0.02, 1000, 5]]) {
  const r = K.sir({ beta, gamma, N, I0 }), R0 = beta / gamma, s0 = (N - I0) / N;
  ok(r.done, "salgın biter");
  near(r.sEnd, finalW(R0, s0), 1e-7, "son büyüklük ↔ Lambert W");
  near(K.finalSize(R0, s0).s, finalW(R0, s0), 1e-10, "finalSize ↔ Lambert W");
  // korunan nicelik I + S − (N/R0) ln S
  const inv = (k) => r.run.I[k] + r.run.S[k] - (N / R0) * Math.log(r.run.S[k]);
  const c0 = inv(0); for (const k of [10, 200, 1000, r.run.t.length - 1]) near(inv(k), c0, 1e-7, "korunan nicelik");
  near(r.peak.I / N, 1 - (1 + Math.log(R0 * s0)) / R0, 2e-7, "zirve kapalı biçim");
  near(K.peakTheory(R0, s0, I0 / N), 1 - (1 + Math.log(R0 * s0)) / R0, 1e-12, "peakTheory");
  const ind = rk2SIR(beta, gamma, N, I0); near(r.peak.t, ind.tPeak, 2e-4, "zirve anı ↔ RK2");
  ok(Math.abs(r.peak.t - r.tRt1) < 2e-3, "zirve = R_t 1 anı");
  if (r.rDepl < 0.02) near(r.rMeas, beta * s0 - gamma, 0.01, "erken büyüme");
}
{ const r = K.sir({ beta: 0.08, gamma: 0.1, N: 1e5, I0: 10 }); ok(r.peak === null && r.done, "R0 < 1 zirve yok"); near(1 - r.sEnd, 1 - finalW(0.8, 1 - 1e-4), 1e-6, "eşik altı son büyüklük"); }
{ const r = K.sir({ beta: 0.1, gamma: 0.1, N: 1e5, I0: 10 }); ok(!r.done && r.peak === null, "eşikte 5000 günde bitmez"); }
near(K.finalSize(3).z, 1 - finalW(3, 1), 1e-10, "I0 → 0 sınırı"); near(K.finalSize(3).z, 0.940479, 1e-5, "R0 = 3: %94,05");
near(K.finalSize(2).z, 0.796812, 1e-5, "R0 = 2"); ok(K.finalSize(0.9).z === 0 && K.finalSize(1).z === 0, "tohumsuz eşik altı sıfır");
{ const h = K.sir({ beta: 0.3, gamma: 0.1, N: 1e5, I0: 10, dt: 0.025 }), f = K.sir({ beta: 0.3, gamma: 0.1, N: 1e5, I0: 10 }); ok(Math.abs(h.peak.t - h.tRt1) < Math.abs(f.peak.t - f.tRt1), "h/2 farkı küçültür"); }

/* ── 2. Aşılama ── */
for (const [R0, e, model] of [[3, 1, "aon"], [3, 0.8, "leaky"], [3, 0.8, "aon"], [6, 0.9, "aon"], [1.5, 1, "leaky"]]) {
  const pc = (1 - 1 / R0) / e, t = K.measuredThreshold({ R0, e, model }), th = K.measuredThreshold({ R0, e, model, win: 0.5 });
  const exact = (1 - 1 / (R0 * (1 - 1e-4))) / e;
  near(t.pc, pc, 2e-4, "ölçülen eşik"); near((t.pc - exact) / (th.pc - exact), 2, 0.01, "kalan fark pencereyle orantılı");
  for (const p of [0, 0.3, 0.6, 0.9]) {
    const v = K.vaccRun({ R0, p, e, model }), f = K.vaccFinal({ R0, p, e, model });
    // bağımsız: sabit nokta yinelemesi
    const rest = 1 - 1e-4, su = model === "leaky" ? rest * (1 - p) : rest * (1 - p * e), sv = model === "leaky" ? rest * p : 0, a = model === "leaky" ? 1 - e : 0;
    let L = R0; for (let i = 0; i < 20000; i++) L = R0 * (1e-4 + su * (1 - Math.exp(-L)) + sv * (1 - Math.exp(-a * L)));
    near(f.attack, L / R0, 1e-8, "son büyüklük sabit nokta"); near(v.attack, f.attack, 2e-5, "RK4 ↔ kuram");
    near(v.rEff0, R0 * (1 - p * e) * rest, 1e-12, "R_etkin(0)");
    if (v.peak && v.rEff0 > 1.05) { near(v.effAtPeak, 1 / R0, 1e-5, "zirvede s_etkin = 1/R0"); near(v.before + v.after, v.newInf, 1e-9, "önce + sonra"); if (model === "aon") { near(v.before, v.sEff0 - 1 / R0, 1e-4, "eşiğe kadar"); near(v.after, 1 / R0 - f.suEnd, 2e-4, "aşma"); } }
  }
}
{ const f = K.vaccFinal({ R0: 3, p: 0.5, e: 1, model: "aon" }); near(f.attack, 0.291595, 1e-5, "p = 0,5 saldırı"); }

/* ── 3. Stokastik SIR ── */
function exactRec(N, R0, I0) { // ayrı yazılmış: belleklenmiş geri özyineleme P(son = n | s, i)
  const memo = new Map();
  const f = (s, i) => { if (i === 0) { const m = new Float64Array(N + 1); m[N - s] = 1; return m; } const key = s * (N + 2) + i; if (memo.has(key)) return memo.get(key); const p = s > 0 ? R0 * s / (R0 * s + N) : 0, out = new Float64Array(N + 1); if (p > 0) { const a = f(s - 1, i + 1); for (let k = 0; k <= N; k++) out[k] += p * a[k]; } const b = f(s, i - 1); for (let k = 0; k <= N; k++) out[k] += (1 - p) * b[k]; memo.set(key, out); return out; };
  return f(N - I0, I0);
}
for (const [N, R0, I0] of [[20, 2, 1], [30, 1.5, 2], [25, 0.7, 3], [15, 4, 1]]) { const a = K.exactFinal(N, R0, I0), b = exactRec(N, R0, I0); for (let k = 0; k <= N; k++) near(a[k], b[k], 1e-12, "kesin dağılım"); near(a.reduce((x, y) => x + y, 0), 1, 1e-12, "toplam 1"); }
{ // kesin dağılım ↔ Gillespie (N = 100), ortalama ve küçük salgın olasılığı
  const N = 100, R0 = 2, ex = K.exactFinal(N, R0, 1), E = K.ensemble({ N, R0, I0: 1, runs: 6000, seed: 3 });
  let m = 0, v = 0; ex.forEach((p, k) => { m += p * k; v += p * k * k; }); v -= m * m;
  const mm = E.finals.reduce((a, b) => a + b, 0) / 6000; ok(Math.abs(mm - m) < 4 * Math.sqrt(v / 6000), `Gillespie ortalaması ${mm} ↔ ${m}`);
  let pm = 0; for (let k = 0; k <= 40; k++) pm += ex[k]; const s = K.summarize(E.finals, N, 40); ok(Math.abs(s.pMinor - pm) < 4 * s.se, "küçük salgın ↔ kesin");
}
{ const ex = K.exactFinal(2000, 2, 1); let pm = 0; for (let k = 0; k <= 797; k++) pm += ex[k]; near(pm, 0.5, 0.01, "büyük N'de dallanma (1/R0)"); }
{ const ex = K.exactFinal(2000, 2, 3); let pm = 0; for (let k = 0; k <= 797; k++) pm += ex[k]; near(pm, 0.125, 0.03, "üç tohum (1/R0)^3"); }
near(K.branchingExtinction(2, 3), 0.125, 1e-15); ok(K.branchingExtinction(0.9, 1) === 1, "eşik altında 1");
{ const E = K.ensemble({ N: 2000, R0: 0.5, I0: 1, runs: 4000, seed: 5 }); let m = 0, m2 = 0; for (const f of E.finals) { m += f; m2 += f * f; } m /= 4000; const se = Math.sqrt((m2 / 4000 - m * m) / 4000); ok(Math.abs(m - 2) < 4 * se, `R0 = 0,5 ortalama toplam ${m}`); }
{ const a = K.ensemble({ N: 500, R0: 2, I0: 1, runs: 50, seed: 9 }), b = K.ensemble({ N: 500, R0: 2, I0: 1, runs: 50, seed: 9 }); ok(a.finals.every((x, i) => x === b.finals[i]), "tohum tekrarlanabilir"); }

/* ── 4. Genişletmeler ── */
for (const [beta, gamma, sigma] of [[0.3, 0.1, 0.2], [0.3, 0.1, 0.05], [0.5, 0.2, 2], [0.2, 0.1, 1]]) {
  const tr = -(sigma + gamma), det = sigma * gamma - sigma * beta; near(K.seirGrowth(beta, gamma, sigma), (tr + Math.sqrt(tr * tr - 4 * det)) / 2, 1e-12, "SEIR özdeğer");
  const N = 1e6, y0 = [N - 1, 0, 0, 1, 0], a = K.integrate({ beta, gamma, N, y0, dt: 0.05, tMax: 20000 }), b = K.integrate({ beta, gamma, sigma, N, y0, dt: 0.05, tMax: 20000 });
  near(1 - b.y[0] / N, 1 - a.y[0] / N, 1e-9, "SEIR son büyüklüğü = SIR"); near(1 - a.y[0] / N, 1 - finalW(beta / gamma, 1 - 1e-6), 1e-7, "SIR ↔ W");
  ok(b.peaks[0].t > a.peaks[0].t && b.peaks[0].I < a.peaks[0].I, "gizli dönem zirveyi geciktirir ve alçaltır");
}
for (const [beta, gamma, omega] of [[0.3, 0.1, 0.005], [0.3, 0.1, 0.05], [0.5, 0.2, 0.01]]) {
  const eq = K.sirsEquilibrium(beta, gamma, omega, 1), R = 1 - eq.S - eq.I;
  near(-beta * eq.S * eq.I + omega * R, 0, 1e-14, "dS/dt = 0"); near(beta * eq.S * eq.I - gamma * eq.I, 0, 1e-14, "dI/dt = 0");
  const F = (S, I) => [-beta * S * I + omega * (1 - S - I), beta * S * I - gamma * I], h = 1e-6;
  const J = [[(F(eq.S + h, eq.I)[0] - F(eq.S - h, eq.I)[0]) / (2 * h), (F(eq.S, eq.I + h)[0] - F(eq.S, eq.I - h)[0]) / (2 * h)], [(F(eq.S + h, eq.I)[1] - F(eq.S - h, eq.I)[1]) / (2 * h), (F(eq.S, eq.I + h)[1] - F(eq.S, eq.I - h)[1]) / (2 * h)]];
  const tr = J[0][0] + J[1][1], det = J[0][0] * J[1][1] - J[0][1] * J[1][0];
  near(eq.decay, -tr / 2, 1e-6, "sönüm (sayısal Jacobian)"); near(eq.omegaOsc, Math.sqrt(det - tr * tr / 4), 1e-6, "salınım frekansı");
  const N = 1e6, c = K.integrate({ beta, gamma, omega, N, y0: [N - 1, 0, 0, 1, 0], dt: 0.1, tMax: 10000 });
  near(c.y[0] / N, gamma / beta, 1e-5, "S* = N/R0"); near(c.y[3] / N, eq.I, 1e-4, "I*");
}
ok(K.sirsEquilibrium(0.05, 0.1, 0.01) === null, "R0 < 1 denge yok");
{ // ağ: yapılandırma modeli, bağ süzülmesi (birlik–bul ile doğrudan) ve birinci kuşak R0
  const G = K.buildNetwork({ n: 2000, mean: 4, kind: "regular", seed: 1 }); ok(G.kmax === 4 && G.k1 > 3.98, "düzenli ağ");
  let sumDeg = 0, loops = 0; const pairs = new Set(); let dup = 0; for (let v = 0; v < G.n; v++) { sumDeg += G.off[v + 1] - G.off[v]; for (let j = G.off[v]; j < G.off[v + 1]; j++) { if (G.adj[j] === v) loops++; const key = v * G.n + G.adj[j]; if (pairs.has(key)) dup++; pairs.add(key); } }
  ok(loops === 0 && dup === 0, "öz döngü ve çift kenar yok");
  near(sumDeg / G.n, G.k1, 1e-12, "derece ortalaması");
  for (const kind of ["poisson", "geometric"]) {
    const H = K.buildNetwork({ n: 5000, mean: 4, kind, seed: 2 }), T = 0.05 / 0.15, perc = K.percolation(H.hist, T);
    // doğrudan bağ süzülmesi: her kenar T olasılıkla açık; en büyük bileşenin oranı
    const r = K.rng(77); let big = 0; const reps = 30;
    for (let rep = 0; rep < reps; rep++) {
      const par = Int32Array.from({ length: H.n }, (_, i) => i), find = (x) => { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; };
      for (let v = 0; v < H.n; v++) for (let j = H.off[v]; j < H.off[v + 1]; j++) { const u = H.adj[j]; if (u > v && r() < T) { const a = find(u), b = find(v); if (a !== b) par[a] = b; } }
      const cnt = new Map(); for (let v = 0; v < H.n; v++) { const f = find(v); cnt.set(f, (cnt.get(f) || 0) + 1); } big += Math.max(...cnt.values()) / H.n;
    }
    near(big / reps, perc.z, 0.06, `süzülme kuramı ↔ birlik–bul (${kind})`);
    const E = K.netEnsemble({ G: H, tau: 0.05, gamma: 0.1, runs: 600, seed: 3 }), th = T * (H.k2 / H.k1 - 1);
    ok(Math.abs(E.R0pot - th) < 4 * E.R0potSe, `denenen R0 ${E.R0pot} ↔ ${th} ± ${E.R0potSe}`);
    ok(E.tries === E.g1kids + E.blocked, "deneme = gerçekleşen + engellenen");
    const maj = [...E.finals].filter((f) => f > 0.5 * perc.z * H.n); near(maj.reduce((a, b) => a + b, 0) / maj.length / H.n, perc.z, 0.05, "büyük salgın son büyüklüğü");
  }
  { const H = K.buildNetwork({ n: 3000, mean: 4, kind: "geometric", seed: 4 }), E = K.netEnsemble({ G: H, tau: 0.01, gamma: 0.1, runs: 300, seed: 4 }); ok(E.blocked / E.tries < 0.01 && Math.max(...E.finals) < 200, "eşik altında küçük kalır"); }
}
console.log(`G salgın: ${checks.toLocaleString("tr-TR")} bağımsız SIR, aşılama, stokastik, SEIR/SIRS ve ağ kontrolü PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  // defter yazıldı: defter 404'ü artık hata sayılır
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
      await page.waitForSelector("section.digest", { timeout: 15000 }); ok(/Üç Kutu, İki Hız, Bir Eşik/.test(await page.locator("section.digest").textContent()) && await page.locator("section.digest").first().isVisible(), "defter görünür");
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, t) => { const v = await read(id); assert(v.includes(t), `${id}: "${v}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); e.dispatchEvent(new Event("change", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const until = async (fn, ms = 60000) => { await page.waitForFunction(fn, null, { timeout: ms }); checks++; };
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuval etiketleri");
      // 1 · SIR
      await has("s1R0", "3,00"); await has("s1Peak", "henüz"); await has("s1Final", "sürüyor");
      await page.click("#s1Skip");
      await has("s1Peak", "30\u202f050 kişi (30,05 %)"); await has("s1PeakT", "49,90 gün"); await has("s1PeakTE", "49,8971 gün");
      await has("s1Final", "94,049 %"); await has("s1FinalE", "I₀ → 0 sınırı 94,048 %"); await has("s1Growth", "+0,1999 /gün"); await has("s1GrowthE", "3,47 gün");
      await has("s1Status", "27,38 %"); await has("s1Status", "6,1 × 10⁻⁶ gün"); await has("s1Status", "sürü bağışıklığı eşiği 1 − 1/R₀ = 66,67 % zirvede ulaşıldı");
      await page.click("#s1P08"); await page.click("#s1Skip"); await has("s1Peak", "zirve yok"); await has("s1Final", "0,050 %"); await has("s1Growth", "−0,0200");
      await page.click("#s1P1"); await page.click("#s1Skip"); await has("s1Final", "5000 günde bitmedi"); await has("s1Status", "kritik yavaşlama");
      await page.click("#s1P15"); await page.click("#s1Skip"); await has("s1Final", "58,292 %"); await has("s1Peak", "6309 kişi");
      await page.click("#s1P6"); await page.click("#s1Skip"); await has("s1Final", "99,748 %"); await has("s1PeakT", "22,01 gün");
      await range("s1Beta", 1.5); await range("s1Gamma", 0.02); await sel("s1N", "1000"); await range("s1I0", 100); await page.click("#s1Skip");
      await has("s1Growth", "ölçülemez"); await has("s1Status", "R₀ = 75,0"); await has("s1BetaOut", "1,50 /gün"); await has("s1I0Out", "100 kişi");
      await page.click("#s1Run"); ok((await read("s1Run")) === "Oynat", "duraklat");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("s1BetaOut", "0,30 /gün"); ok((await read("s1Run")) === "Duraklat", "R sıfırlar");
      await page.keyboard.press("Space"); ok((await read("s1Run")) === "Oynat", "boşluk duraklatır"); await page.keyboard.press("Space");
      await page.locator("#tab-sir").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-ext").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-herd").getAttribute("aria-selected")) === "true", "ArrowRight");
      ok(await page.locator("#panel-sir").isHidden(), "tek panel");
      // 2 · Aşılama
      await has("s2Pc", "66,663 %"); await has("s2Attack", "29,160 %"); await has("s2Speak", "33,333 %"); await has("s2Before", "16,66 %"); await has("s2After", "12,49 %"); await has("s2Reff", "1,500");
      await page.click("#s2Below"); await has("s2Attack", "12,597 %"); await has("s2After", "5,92 %");
      await page.click("#s2Above"); await has("s2Speak", "zirve yok"); await has("s2After", "tanımsız"); await has("s2Attack", "0,099 %");
      await page.click("#s2Leaky"); await has("s2Pc", "83,329 %"); await has("s2Attack", "8,353 %"); await has("s2AfterE", "yalnız ölçülür");
      await page.click("#s2None"); await has("s2Attack", "94,049 %"); await has("s2Speak", "33,333 %"); await has("s2Before", "66,66 %"); await has("s2After", "27,38 %");
      await page.click("#s2Reset"); await range("s2Eff", 0.3); await range("s2P", 0.99); await has("s2Pc", "ulaşılamaz"); await has("s2Status", "mümkün değil");
      await page.click("#s2Reset"); await range("s2R0", 1); await has("s2Pc", "0,000 %"); await range("s2R0", 8); await has("s2Pc", "87,498 %");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("s2R0Out", "3,0"); await has("s2Attack", "29,160 %");
      // 3 · Stokastik
      await page.click("#tab-stoch");
      const done3 = () => until(() => /tamam/.test(document.getElementById("s3ProgE").textContent));
      await done3(); await has("s3PMin", "49,2 % ± 2,2"); await has("s3Exact", "50,21 %"); await has("s3Major", "79,71 %"); await has("s3Cut", "398 kişi"); await has("s3PMinE", "50,00 %");
      await range("s3R0", 0.5); await done3(); await has("s3Major", "ortalama 1,93"); await has("s3PMin", "R₀ ≤ 1");
      await range("s3R0", 1); await done3(); await has("s3Status", "Tam eşikte");
      await page.click("#s3Reset"); await page.click("#s3Small"); await done3(); await has("s3Exact", "55,37 %"); await has("s3Status", "N = 50 küçük");
      await page.click("#s3Reset"); await page.click("#s3Three"); await done3(); await has("s3PMinE", "12,50 %"); await has("s3Exact", "12,77 %");
      await page.click("#s3New"); ok((await page.locator("#s3Seed").inputValue()) === "2", "yeni tohum"); await done3();
      await page.locator("h1").click(); await page.keyboard.press("r"); await done3(); await has("s3PMin", "49,2 % ± 2,2");
      // 4 · Genişletmeler
      await page.click("#tab-ext");
      await has("s4V2", "94,0480 %"); await has("s4V3", "72,9 gün · 143,5 gün"); await has("s4V5", "+0,0998 /gün"); await has("s4E5", "+0,1000");
      ok(await page.locator("#s4Omega").isHidden() && !(await page.locator("#s4Sigma").isHidden()), "SEIR denetimleri");
      await range("s4Sigma", 2); await has("s4V3", "82,6 gün"); await range("s4Beta", 0.05); await has("s4Status", "R₀ = 0,50");
      await page.click("#s4Reset"); await has("s4SigmaOut", "0,20 /gün");
      await sel("s4Model", "sirs"); await has("s4V1", "33,3333 %"); await has("s4V2", "3,1746 %"); await has("s4V3", "204,1 gün"); await has("s4E3", "204,1 gün");
      await range("s4Omega", 0.05); await has("s4V2", "22,2222 %"); await has("s4V3", "77,4 gün"); await range("s4Beta", 0.05); await has("s4Status", "kendini sürdüremez");
      await page.click("#s4Reset");
      await sel("s4Model", "net");
      const done4 = () => until(() => { const t = document.getElementById("s4E6").textContent; return /koşu$/.test(t) && !/çalışıyor/.test(t); });
      await done4(); await has("s4V1", "3,957 · 19,43"); await has("s4E2", "1,304"); await has("s4V4", "1,978"); await has("s4E5", "43,47 %");
      await sel("s4Kind", "regular"); await done4(); await has("s4E1", "2,998"); await has("s4E5", "büyük salgın yok"); await has("s4Status", "ortalama alan modeli ise salgın öngörürdü");
      await sel("s4Kind", "geometric"); await done4(); await has("s4E2", "2,556"); await has("s4V5", "48,47 %");
      await page.locator("h1").click(); await page.keyboard.press("r"); await done4(); await has("s4V1", "3,957 · 19,43");
      ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      ok(await page.evaluate(() => Object.isFrozen(EpiLab) && !Object.getOwnPropertyDescriptor(window, "EpiLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G salgın: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
