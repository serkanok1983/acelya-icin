// G · elektromanyetik-dalgalar-ve-polarizasyon.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// alan ucunun kaba kuvvet taraması (200 000 an), türevden dönme yönü, sinüs/tanjant biçimli Fresnel denklemleri
// (Hecht), dik geliş yansıması, tam iç yansımada faz için kapalı biçim, yayımlanmış Brewster açıları (Wikipedia:
// ≈ 56° cam, ≈ 53° su), bağımsız bir üreteçle (64 bit LCG) Malus Monte Carlo'su, Jones yerine zaman alanında
// açık bileşen geciktirmesi, FDTD için h/2 ikizi.
// Kullanım: node scripts/check-g-elektromanyetik-dalgalar-ve-polarizasyon.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "elektromanyetik-dalgalar-ve-polarizasyon";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.PolarizationLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
const D = Math.PI / 180;
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(!/fonts\.googleapis|atlas\.css|atlas\.js|stem-content|cdn\./.test(html), "Google Fonts ya da CDN yok");
const title = html.match(/<title>([^<]*)<\/title>/)?.[1] || "";
ok(title.startsWith("Elektromanyetik Dalgalar ve Polarizasyon: ") && title.length <= 80, "başlık biçimi ve ≤ 80 karakter: " + title.length);
ok(/<body class="app-page" data-page="elektromanyetik-dalgalar-ve-polarizasyon">/.test(html) && /name="description"/.test(html) && /viewport-fit=cover/.test(html), "kabuk");
ok(/shared\/theme\.css/.test(html) && /shared\/app\.js/.test(html), "theme.css ve app.js");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}☀-➿]/u.test(html), "emoji yok");
ok(!/body\s*\{[^}]*overflow\s*:\s*hidden/.test(html), "body overflow hidden yok");

function lcg(seed) { let s = BigInt(seed); return () => { s = (s * 6364136223846793005n + 1442695040888963407n) & ((1n << 64n) - 1n); return Number(s >> 11n) / 2 ** 53; }; }
const r = lcg(11);

/* ── sabitler ── */
near(K.EPS0, 8.8541878188e-12, 1e-15, "ε₀ CODATA 2022"); near(K.MU0, 1.25663706127e-6, 1e-15, "μ₀ CODATA 2022"); ok(K.C0 === 299792458, "c tanım");
abs(1 / Math.sqrt(K.MU0 * K.EPS0), K.C0, 1e-1, "c = 1/√(μ₀ε₀) (ölçülmüş sabitlerden)");

/* ── 1 · düzlem dalga ── */
for (let t = 0; t < 40; t++) {
  const ax = 1000 * r(), ay = 1000 * r(), dl = -180 + 360 * r();
  const J = K.jonesFrom(ax, ay, dl);
  // kaba kuvvet: 200 000 anda |E|’nin en büyüğü ve en küçüğü
  let mx = 0, mn = Infinity, amx = 0;
  for (let i = 0; i < 200000; i++) { const w = 2 * Math.PI * i / 200000, ex = ax * Math.cos(w), ey = ay * Math.cos(w - dl * D), m = Math.hypot(ex, ey); if (m > mx) { mx = m; amx = Math.atan2(ey, ex); } if (m < mn) mn = m; }
  const C = K.ellipseClosed(ax, ay, dl), E = K.ellipseFromStokes(K.stokes(J)), M = K.measureTip(J);
  near(C.a, mx, 1e-6, "a kaba kuvvet"); abs(C.b, mn, 1e-3 * Math.max(ax, ay), "b kaba kuvvet");
  near(E.a, C.a, 1e-9, "a Stokes = kapalı biçim"); abs(E.b, C.b, 1e-6 * Math.max(ax, ay), "b Stokes");
  near(M.a, C.a, 1e-7, "a ölçülen"); abs(M.b, C.b, 1e-5 * Math.max(ax, ay), "b ölçülen");
  near(C.a * C.a + C.b * C.b, ax * ax + ay * ay, 1e-9, "a² + b² = Ex₀² + Ey₀²"); near(C.a * C.b, ax * ay * Math.abs(Math.sin(dl * D)), 1e-7, "ab = Ex₀Ey₀|sin δ|");
  if (E.kind === "elliptic" && (C.a - C.b) / C.a > 1e-3) { abs(K.diff180(C.psi, ((amx / D) % 180 + 180) % 180), 0, 0.01, "ψ kaba kuvvet"); abs(K.diff180(M.psi, C.psi), 0, 1e-4, "ψ ölçülen"); }
  // dönme yönü: t = 0’da Ex·dEy/dt − Ey·dEx/dt = ω·ax·ay·sin δ
  const cross = ax * ay * Math.sin(dl * D);
  if (Math.abs(Math.sin(dl * D)) > 1e-6) { ok(Math.sign(M.area) === Math.sign(cross) && E.hand === Math.sign(cross), "dönme yönü"); near(Math.abs(M.area), Math.PI * C.a * C.b, 1e-4, "taranan alan πab"); }
  // Poynting: ⟨S⟩ = S0/(2μ₀c), sayfanın ½cε₀S0’ı ile
  near(M.Smean, (ax * ax + ay * ay) / (2 * K.MU0 * K.C0), 1e-9, "⟨S⟩");
  near(K.intensity(ax * ax + ay * ay), (ax * ax + ay * ay) / (2 * K.MU0 * K.C0), 1e-9, "½cε₀E² = E²/(2μ₀c)");
}
{ const S = K.stokes(K.jonesFrom(600, 600, 90)); ok(K.classify(S) === "circular" && K.ellipseFromStokes(S).hand === 1 && K.ellipseFromStokes(S).psi === null, "δ = +90° dairesel, S₃ > 0, ψ tanımsız"); }
ok(K.classify(K.stokes(K.jonesFrom(600, 600, 180))) === "linear" && K.classify(K.stokes(K.jonesFrom(600, 0, 37))) === "linear" && K.classify(K.stokes(K.jonesFrom(0, 0, 0))) === "none", "doğrusal ve boş sınıflama");
near(K.intensity(520000), 690.1488697, 1e-8, "varsayılan şiddet 690,15 W/m²");

/* ── 2 · Malus ── */
{
  const malusRef = (unpol, a0, pols) => { let I = unpol ? 0.5 : Math.cos((pols[0] - a0) * D) ** 2; for (let i = 1; i < pols.length; i++) I *= Math.cos((pols[i] - pols[i - 1]) * D) ** 2; return I; };
  for (let t = 0; t < 30; t++) {
    const m = 1 + Math.floor(r() * 3), pols = Array.from({ length: m }, () => Math.floor(181 * r())), unpol = r() < 0.5, a0 = Math.floor(181 * r());
    const th = K.malusTheory({ unpol, angle: a0 }, pols);
    near(th.at(-1), malusRef(unpol, a0, pols), 1e-12, "Malus çarpımı");
    const N = 40000, c = K.photonRun({ unpol, angle: a0 }, pols, N, 1 + t), p = th.at(-1), sig = Math.sqrt(p * (1 - p) / N);
    ok(Math.abs(c.at(-1) / N - p) <= 4.5 * sig + 1e-12, `foton sayımı ±4,5σ: ${c.at(-1) / N} ~ ${p}`);
    // bağımsız üreteç ile aynı süreç
    let k2 = 0; const g = lcg(100 + t);
    for (let i = 0; i < N; i++) { let ang = unpol ? 180 * g() : a0, pass = true; for (const q of pols) { if (g() < Math.cos((q - ang) * D) ** 2) ang = q; else { pass = false; break; } } if (pass) k2++; }
    ok(Math.abs(k2 / N - p) <= 4.5 * sig + 1e-12, "LCG Monte Carlo ±4,5σ");
  }
  ok(K.photonRun({ unpol: true }, [0, 90], 100000, 1)[1] === 0, "çapraz polarizörler: sıfır foton");
  const c3 = K.photonRun({ unpol: true }, [0, 45, 90], 100000, 1); ok(c3[2] === 12314 && c3[0] === 49829, "varsayılan sayım (tohum 1): 49 829 → 12 314");
  // çok tohumda 1/8
  let sum = 0; for (let s = 1; s <= 20; s++) sum += K.photonRun({ unpol: true }, [0, 45, 90], 20000, s)[2]; abs(sum / 400000, 0.125, 4 * Math.sqrt(0.125 * 0.875 / 400000), "1/8, 20 tohum");
  for (const n of [1, 2, 3, 10, 50, 100]) { let p = 1; for (let k = 1; k <= n; k++) p *= Math.cos(Math.PI / (2 * n)) ** 2; near(K.manyTheory(n), p, 1e-12, "N adım çarpımı " + n); ok(K.manyAngles(n).at(-1) === 90 && Math.abs(K.manyAngles(n)[0] - 90 / n) < 1e-12, "açılar"); }
  near(K.manyTheory(1), 0, 1e-12, "N = 1: sıfır"); abs(K.manyAsym(1), 0.0848, 1e-4, "N = 1 yaklaşım 0,085");
  abs(K.manyTheory(10), 0.7805, 5e-5, "N = 10"); abs(K.manyTheory(1000), K.manyAsym(1000), 1e-6, "N = 1000 yaklaşım ≈ tam");
  ok(K.manyTheory(100) > K.manyTheory(50) && K.manyTheory(50) > K.manyTheory(10), "N ile artar");
}

/* ── 3 · Fresnel ── */
{
  const pairs = [[1, 1.5168], [1, 1.333], [1.5168, 1], [1.333, 1], [1, 2.417], [1.2, 2.1]];
  for (const [n1, n2] of pairs) {
    near(K.fresnel(n1, n2, 0).Rs, ((n1 - n2) / (n1 + n2)) ** 2, 1e-12, "dik geliş R");
    const tc = n1 > n2 ? Math.asin(n2 / n1) / D : 90;
    for (let i = 0; i < 25; i++) {
      const th = 0.5 + r() * 88.9, F = K.fresnel(n1, n2, th), s = K.interfaceSolve(n1, n2, th, "s"), p = K.interfaceSolve(n1, n2, th, "p");
      near(s.R + s.T, 1, 1e-12, "Rs + Ts"); near(p.R + p.T, 1, 1e-12, "Rp + Tp");
      abs(Math.hypot(s.r[0] - F.rs[0], s.r[1] - F.rs[1]), 0, 1e-12, "rs iki yol"); abs(Math.hypot(p.r[0] - F.rp[0], p.r[1] - F.rp[1]), 0, 1e-12, "rp iki yol");
      if (th < tc - 1e-6) {
        const ti = th * D, tt = Math.asin(n1 * Math.sin(ti) / n2);
        abs(F.rs[0], -Math.sin(ti - tt) / Math.sin(ti + tt), 1e-12, "rs = −sin(θᵢ − θₜ)/sin(θᵢ + θₜ)");
        if (Math.abs(ti + tt - Math.PI / 2) > 1e-6) abs(F.rp[0], Math.tan(ti - tt) / Math.tan(ti + tt), 1e-12, "rp = tan(θᵢ − θₜ)/tan(θᵢ + θₜ)");
        abs(F.Ts, 1 - F.Rs, 1e-12, "Ts formül"); ok(F.Rp <= F.Rs + 1e-15, "Rp ≤ Rs");
      } else if (th > tc + 1e-6) {
        const a = n1 * Math.cos(th * D), b = Math.sqrt((n1 * Math.sin(th * D)) ** 2 - n2 * n2);
        abs(K.carg(F.rs), -2 * Math.atan(b / a), 1e-12, "TIR faz φs = −2 atan(b/a)");
        abs(K.cabs(F.rs), 1, 1e-12, "|rs| = 1"); abs(K.cabs(F.rp), 1, 1e-12, "|rp| = 1");
      }
    }
    const B = K.measureBrewster(n1, n2); abs(B, Math.atan(n2 / n1) / D, 1e-9, "Brewster ölçülen"); abs(K.interfaceSolve(n1, n2, B, "p").R, 0, 1e-20, "Brewster’de Rp = 0");
    abs(B + Math.asin(n1 * Math.sin(B * D) / n2) / D, 90, 1e-9, "θB + θt = 90°");
    if (n1 > n2) abs(K.measureCritical(n1, n2), Math.asin(n2 / n1) / D, 1e-8, "kritik açı"); else ok(K.measureCritical(n1, n2) === null, "kritik açı yok");
  }
  abs(K.brewster(1, 1.5), 56.3, 0.05, "Wikipedia ≈ 56° (n = 1,5)"); abs(K.brewster(1, 1.33), 53.06, 0.05, "Wikipedia ≈ 53° (su)");
  ok(K.measureBrewster(1.4, 1.4) === null, "n₁ = n₂: Brewster tanımsız");
}

/* ── 4 · Jones ve FDTD ── */
{
  // zaman alanında bağımsız referans: gerçek alanı hızlı/yavaş eksenlere ayır, yavaşı Γ/ω kadar geciktir, ucu tara
  function timeDomain(alpha, rho, G, th) {
    const a = (alpha - rho) * D, t = th * D; let mx = 0, mn = Infinity, amx = 0, area = 0, prev = null;
    const M = 20000;
    for (let i = 0; i <= M; i++) {
      const w = 2 * Math.PI * i / M, ex0 = Math.cos(a) * Math.cos(w), ey0 = Math.sin(a) * Math.cos(w);
      const f = Math.cos(t) * Math.cos(a) + Math.sin(t) * Math.sin(a), s = -Math.sin(t) * Math.cos(a) + Math.cos(t) * Math.sin(a);
      const ef = f * Math.cos(w), es = s * Math.cos(w - G * D); // gecikme: yavaş bileşen daha geç
      const ex = Math.cos(t) * ef - Math.sin(t) * es, ey = Math.sin(t) * ef + Math.cos(t) * es, m = Math.hypot(ex, ey);
      if (m > mx) { mx = m; amx = Math.atan2(ey, ex); } if (m < mn) mn = m;
      if (prev) area += prev[0] * ey - prev[1] * ex; prev = [ex, ey]; void ex0; void ey0;
    }
    return { ratio: mn / mx, psi: ((amx / D) % 180 + 180) % 180, area };
  }
  for (let i = 0; i < 30; i++) {
    const alpha = Math.floor(181 * r()), rho = 30 * r(), G = 360 * r(), th = 180 * r();
    const J = K.systemJones(alpha, rho, { gamma: G, theta: th }), E = K.ellipseFromStokes(K.stokes(J)), T = timeDomain(alpha, rho, G, th);
    abs(E.ratio, T.ratio, 2e-3, "b/a Jones ~ zaman alanı");
    if (E.ratio < 0.95) abs(K.diff180(E.psi, T.psi), 0, 0.05, "ψ Jones ~ zaman alanı");
    if (E.ratio > 0.02) ok(E.hand === Math.sign(T.area), "dönme yönü Jones ~ zaman alanı");
    near(K.stokes(J).S0, 1, 1e-12, "levha kayıpsız");
    const A = K.analyzerScan(J); if (E.ratio < 0.95) abs(K.diff180(A.psi, E.psi), 0, 0.01, "analizör ψ"); abs(A.ratio, E.ratio, 2e-3, "analizör b/a");
  }
  // λ/4 45°: dairesel; λ/2: 2θ − α
  const Jq = K.systemJones(0, 0, { gamma: 90, theta: 45 }), Sq = K.stokes(Jq); near(Math.abs(Sq.S3), 1, 1e-12, "λ/4 45° → |s₃| = 1"); ok(Sq.S3 < 0, "α = 0, θ = 45°: S₃ < 0 (saat yönünde)");
  for (let i = 0; i < 20; i++) { const a = 180 * r(), th = 180 * r(), A = K.analyzerScan(K.systemJones(a, 0, { gamma: 180, theta: th })); abs(K.diff180(A.psi, 2 * th - a), 0, 1e-4, "λ/2: 2θ − α"); }
  near(K.sugarRotation(0.2, 2, 589), 26.548, 1e-12, "şeker 66,37 × 0,2 × 2"); abs(K.mod180(0 - K.analyzerScan(K.systemJones(0, 26.548, null)).psi), 26.548, 1e-4, "şeker analizörle");
  near(K.plateThickness(90, "quartz"), 590e-9 / (4 * 0.009), 1e-9, "kuvars λ/4 kalınlığı"); near(K.plateThickness(90, "calcite"), 590e-9 / (4 * 0.172), 1e-9, "kalsit λ/4");
  // FDTD: faz farkı Γ’ya yakın, h/2 ikizinde hata ~ 4 kat küçülür, kazanç ≈ 1
  for (const [G, th, mat] of [[90, 45, "quartz"], [180, 30, "quartz"], [90, 45, "calcite"], [37, 10, "calcite"], [250, 70, "calcite"]]) {
    const vin = K.systemJones(0, 0, null), R1 = K.plateFDTD(vin, G, th, mat, 60), R2 = K.plateFDTD(vin, G, th, mat, 120);
    const e1 = K.diff360(R1.dPhase, G), e2 = K.diff360(R2.dPhase, G);
    ok(e1 > 0 && e1 < 0.005 * G + 0.01, `FDTD faz hatası ${e1}`); ok(e1 / e2 > 3 && e1 / e2 < 5, `h/2 ikizi: hata oranı ${e1 / e2}`);
    abs(R1.gain, 1, 1e-4, "FDTD genlik oranı");
    const Ej = K.ellipseFromStokes(K.stokes(K.systemJones(0, 0, { gamma: G, theta: th }))), Ef = K.ellipseFromStokes(K.stokes(R1.J)); abs(Ef.ratio, Ej.ratio, 0.006, "FDTD b/a");
  }
  assert.throws(() => K.fdtdAxis(1.5, 0)); checks++;
}
console.log(`G polarizasyon: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

/* ── Tarayıcı ── */
if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((rs) => server.listen(0, "127.0.0.1", rs));
  ok(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`, import.meta.url)), "defter dosyası var");
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
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on("response", (x) => { if (x.status() >= 400) errors.push(x.status() + " " + x.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { await page.waitForFunction(([i, v]) => document.getElementById(i).textContent.includes(v), [id, s], { timeout: 8000 }).catch(() => {}); const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("main input, main select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      ok(unlabeled.length === 0, "etiketsiz denetim: " + unlabeled.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => new Set([...document.querySelectorAll("[id]")].map((e) => e.id)).size === document.querySelectorAll("[id]").length), "yinelenen id yok");
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((x) => { const v = +x.value, mn = +x.min, st = +x.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-6; })), "varsayılanlar adım ızgarasında");
      // 1
      await has("pdA", "645,14 V/m"); await has("pdB", "322,17 V/m"); await has("pdR", "0,4994"); await has("pdPsi", "25,10°"); await has("pdHand", "saat yönünün tersine"); await has("pdI", "690,15 W/m²"); await has("pdIe", "690,15"); await has("pdS", "(+0,385; +0,462; +0,799)"); await has("pdStatus", "Eliptik");
      await page.click("#pdP3"); await has("pdPsi", "tanımsız"); await has("pdR", "1,0000"); await has("pdI", "955,59"); await has("pdStatus", "Dairesel"); await has("pdHandE", "optikte sol");
      await page.click("#pdP4"); await has("pdHand", "saat yönünde"); await page.click("#pdP1"); await has("pdHand", "yok"); await has("pdB", "0,00 V/m"); await has("pdStatus", "Doğrusal");
      await page.click("#pdP2"); await has("pdPsi", "45,00°");
      await range("pdEx", 0); await range("pdEy", 0); await has("pdStatus", "İki genlik de sıfır"); await has("pdA", "—");
      await range("pdEx", 1000); await range("pdEy", 1000); await range("pdDelta", -180); await has("pdPsi", "135,00°");
      await page.click("#pdPlay"); ok((await read("pdPlay")) === "Oynat", "duraklat"); await page.locator("h1").click(); await page.keyboard.press("Space"); ok((await read("pdPlay")) === "Duraklat", "boşluk oynatır");
      await page.keyboard.press("r"); await has("pdA", "645,14 V/m"); ok((await page.locator("#pdDelta").inputValue()) === "60", "R sıfırlar (1)");
      await page.click("#pdReset"); await has("pdPsi", "25,10°");
      // sekme klavyesi
      await page.locator("#tab-pd").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-wp").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); ok((await page.locator("#tab-pd").getAttribute("aria-selected")) === "true", "Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-ml").getAttribute("aria-selected")) === "true", "ArrowRight");
      // 2
      await has("mlS1", "49 829"); await has("mlT", "0,1231 (12 314 / 100 000)"); await has("mlTe", "1/8"); await has("mlH", "0,4983"); await has("mlStatus", "geri getirdi");
      await has("mnM", "0,7792"); await has("mnT", "0,7805"); await has("mnA", "0,7813");
      await page.click("#mlP2"); await has("mlT", "0,0000 (0 / 100 000)"); await has("mlZe", "geçmedi"); await has("mlS2", "—");
      await page.click("#mlP1"); await has("mlT", "0,5013"); await page.click("#mlP4"); await has("mlT", "0,2508"); await has("mlTe", "0,2500"); ok(!(await page.locator("#mlSrcA").isDisabled()), "polarize kaynakta açı açık");
      await sel("mlN", "1000"); await has("mlT", "/ 1000)"); await page.click("#mlNew"); ok((await page.locator("#mlSeed").inputValue()) === "2", "tohum + 1");
      await range("mlMany", 1); await has("mnT", "0,0000"); await has("mnA", "0,0848"); await has("mnAe", "kaba"); await range("mlMany", 100); await has("mnT", "0,9756");
      await page.uncheck("#mlOn1"); await page.uncheck("#mlOn2"); await page.uncheck("#mlOn3"); await has("mlStatus", "Hiç polarizör"); ok(await page.locator("#mlA1").isDisabled(), "çıkarılan polarizörün kaydırıcısı kilitli");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("mlT", "0,1231 (12 314 / 100 000)"); ok((await page.locator("#mlMany").inputValue()) === "10", "R sıfırlar (2)");
      // 3
      await page.click("#tab-fr"); await has("frR", "9,60 % / 0,92 %"); await has("frB", "56,604°"); await has("frE", "1,000000 / 1,000000"); await has("frC", "yok"); await has("frPh", "180,0° / 0,0°"); await has("frP", "82,5 %"); await has("frRsE", "fark < 10⁻¹²");
      await page.click("#frGoB"); ok((await page.locator("#frTh").inputValue()) === "56.6", "Brewster’e git"); await has("frStatus", "Brewster açısındasın"); await has("frP", "100,0 %");
      await page.click("#frGoC"); await has("frStatus", "kritik açı yok");
      await page.click("#frP3"); await has("frC", "41,245°"); await has("frB", "33,396°"); await page.click("#frGoC"); ok((await page.locator("#frTh").inputValue()) === "41.8", "kritik açının üstü"); await has("frStatus", "Tam iç yansıma"); await has("frE", "1,000000 / 1,000000"); await has("frPh", "−15,0° / −33,7°"); await has("frStatus", "farkın 45° olduğu bir açıda");
      await page.click("#frP2"); await has("frB", "53,123°"); await page.click("#frP4"); await has("frC", "48,607°"); await page.click("#frP5"); await has("frB", "67,523°");
      await range("frN1", 1.5); await range("frN2", 1.5); await has("frStatus", "eşit"); await has("frB", "—");
      await range("frN1", 2.5); await range("frN2", 1); await range("frTh", 89.9); ok(!(await page.locator("#panel-fr").textContent()).includes("NaN"), "sınır değerde NaN yok");
      await range("frTh", 0); ok(!(await page.locator("#panel-fr").textContent()).includes("NaN"), "dik gelişte NaN yok");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("frR", "9,60 % / 0,92 %");
      // 4
      await page.click("#tab-wp"); await has("wpG", "Γ = 90,0°"); await has("wpGe", "16,39 µm"); await has("wpR", "0,9955"); await has("wpPsi", "tanımsız"); await has("wpH", "saat yönünde"); await has("wpF", "90,26°"); await has("wpS", "−1,000"); await has("wpStatus", "dairesel");
      await page.click("#wpP2"); await has("wpRot", "60,00°"); await has("wpRotE", "kuram 2θ − α′ = 60,00°"); await has("wpF", "180,51°"); await has("wpH", "yok (b/a < 0,01)"); await has("wpStatus", "Yarım dalga");
      await page.click("#wpP3"); await has("wpPsi", "0,00°"); await has("wpStatus", "eksenine paralel");
      await page.click("#wpP4"); await has("wpRot", "26,55°"); await has("wpRotE", "kuram [α]cL = 26,55°"); await has("wpSu", "26,55°"); await has("wpR", "—"); await has("wpStatus", "Polarimetre");
      await page.click("#wpP1"); await range("wpLam", 500); await has("wpG", "Γ = 106,2°"); await has("wpStatus", "eliptik"); await has("wpR", "0,7");
      await sel("wpMat", "calcite"); await has("wpGe", "0,858 µm");
      await sel("wpPlate", "c"); ok(!(await page.locator("#wpGamma").isDisabled()), "özel gecikme açık"); await range("wpGamma", 0); await has("wpFe", "0,5°’den küçük");
      await range("wpGamma", 360); await range("wpLam", 400); await has("wpF", "°"); ok(!(await read("wpF")).includes("hesaplanıyor"), "uç durumda benzetim biter");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("wpR", "0,9955"); ok((await page.locator("#wpPlate").inputValue()) === "q", "R sıfırlar (4)");
      for (const t of ["pd", "ml", "fr", "wp"]) { await page.click("#tab-" + t); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${t}: yatay taşma yok`); }
      ok(await page.evaluate(() => Object.isFrozen(PolarizationLab) && !Object.getOwnPropertyDescriptor(window, "PolarizationLab").writable), "çekirdek salt okunur");
      await page.locator(".digest").first().waitFor({ state: "visible", timeout: 8000 }).catch(() => {}); ok(await page.locator(".digest").first().isVisible(), "Keşif Defteri görünür");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G polarizasyon: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS · Keşif Defteri görünür`);
  } finally { await browser?.close(); await new Promise((rs) => server.close(rs)); }
}
