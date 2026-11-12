// Algı psikolojisi: çekirdeğin bağımsız denetimi (Simpson integralleri, kapalı biçimler, kaba kuvvet, sayfanınkinden
// farklı bir üreteçle Monte Carlo, ayrı yazılmış bir merdiven) ve isteğe bağlı tarayıcı denetimi (390 px açık, 1280 px koyu).
// Kullanım: node scripts/check-g-algi-psikolojisi.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "algi-psikolojisi";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.PerceptionLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(/<title>[^<]{1,80}<\/title>/.test(html), "başlık en çok 80 karakter");

/* ── Bağımsız araçlar ── */
function xrng(seed) { let a = seed | 0, b = 0x9e3779b9 | 0, c = 0x243f6a88 | 0, d = 0xb7e15162 | 0; const f = () => { const t = (((a + b) | 0) + d) | 0; d = (d + 1) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); c = (c + t) | 0; return (t >>> 0) / 4294967296; }; for (let i = 0; i < 20; i++) f(); return f; } // sfc32
function polar(r) { for (;;) { const u = 2 * r() - 1, v = 2 * r() - 1, q = u * u + v * v; if (q > 0 && q < 1) return u * Math.sqrt(-2 * Math.log(q) / q); } }
function simpson(f, a, b, n = 20000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; }
const phi = (x) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
const Phi = (z) => (z >= 0 ? 0.5 + simpson(phi, 0, z) : 0.5 - simpson(phi, 0, -z));
const PhiInv = (p) => { let lo = -10, hi = 10; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (Phi(m) < p) lo = m; else hi = m; } return (lo + hi) / 2; };
// Hızlı ve bağımsız Φ: Abramowitz ve Stegun 26.2.17 (mutlak hata < 7,5·10⁻⁸); döngülerde kullanılır
const PhiAS = (x) => { const z = Math.abs(x), t = 1 / (1 + 0.2316419 * z), q = phi(z) * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429)))); return x >= 0 ? 1 - q : q; };
const Z7 = PhiInv(Math.SQRT1_2);
const xmedian = (a) => { const b = [...a].sort((x, y) => x - y), h = b.length >> 1; return b.length % 2 ? b[h] : (b[h - 1] + b[h]) / 2; };

/* ── 1. Normal dağılım ── */
for (const z of [-5, -2.3, -1, -0.1, 0, 0.5, 1.96, 2.5, 3.7]) abs(K.normCdf(z), Phi(z), 2e-12, `Φ(${z})`);
abs(K.normInv(0.975), 1.959964, 1e-6, "z 0,975"); abs(K.normInv(0.95), 1.644854, 1e-6, "z 0,95"); abs(K.normInv(0.5), 0, 1e-15, "z 0,5");
for (const p of [1e-8, 0.01, 0.3, 0.7071, 0.99]) near(K.normCdf(K.normInv(p)), p, 1e-11, `Φ(Φ⁻¹(${p}))`);
abs(K.Z707, PhiInv(Math.SQRT1_2), 1e-9, "Z707 = Φ⁻¹(√½)"); abs(K.Z707, 0.5449521, 1e-6, "Z707 sayısal");

/* ── 2. Yanılsama yardımcıları ── */
abs(K.srgbToLinear(0), 0, 0, "sRGB 0"); abs(K.srgbToLinear(255), 1, 1e-15, "sRGB 255");
abs(K.srgbToLinear(128), ((128 / 255 + 0.055) / 1.055) ** 2.4, 1e-15, "sRGB 128 (IEC 61966-2-1 parçalı eğri)"); abs(K.srgbToLinear(128), 0.2158605, 1e-6, "sRGB 128 ≈ 0,216");
abs(K.srgbToLinear(10), 10 / 255 / 12.92, 1e-15, "sRGB doğrusal parça");
for (const k of ["ml", "eb", "cafe", "sc"]) {
  const I = K.ILLUSIONS[k], span = { ml: 6, eb: 8, cafe: 1.5, sc: 16 }[k]; let lo = 0, hi = 0;
  for (let s = 1; s <= 300; s++) { const v = K.startValue(k, s); if (!(v >= I.min && v <= I.max && Math.abs(v / I.step - Math.round(v / I.step)) < 1e-9 && Math.abs(v - I.truth) >= span - I.step)) assert.fail(`${k} başlangıç ${v}`); if (v < I.truth) lo++; else hi++; }
  ok(lo > 100 && hi > 100, `${k} başlangıçları iki yana dağılır (${lo}/${hi})`);
}
ok(K.startValue("ml", 1) === K.startValue("ml", 1), "başlangıç tohumla belirlenir");
{ const S = K.summarize([102, 104, 106], 100); abs(S.mean, 104, 1e-12, "ortalama"); abs(S.sd, 2, 1e-12, "ss"); abs(S.se, 2 / Math.sqrt(3), 1e-12, "SH"); abs(S.biasPct, 4, 1e-12, "sapma %"); }
assert.deepEqual(K.cafeOffsets(7, 0.5), [0, 0.5, 1, 0.5, 0, 0.5, 1]); checks++;
assert.deepEqual(K.cafeSigns(K.cafeOffsets(7, 0.5)), [1, 1, -1, -1, 1, 1]); checks++;
assert.deepEqual(K.cafeSigns(K.cafeOffsets(7, 0)), [1, 1, 1, 1, 1, 1]); checks++;

/* ── 3. Weber: psikometrik fonksiyon, merdiven kuralı, olabilirlik ── */
for (const k of [0.02, 0.05]) { // pCorrect, iki gürültülü uzunluğun bağımsız Monte Carlo karşılaştırmasına eşit mi?
  const S = 100, sig = k * S / (Math.SQRT2 * Z7), r = xrng(7);
  for (const rel of [0.5 * k, k, 2 * k]) { let c = 0; const N = 200000; for (let i = 0; i < N; i++) { const a = S * (1 + rel) + sig * polar(r), b = S + sig * polar(r); if (a > b) c++; } abs(K.pCorrect(rel, k), c / N, 0.004, `pCorrect MC k=${k} rel=${rel}`); }
  abs(K.pCorrect(k, k), Math.SQRT1_2, 1e-12, "eşikte %70,7"); abs(K.pCorrect(0, k), 0.5, 1e-15, "fark yoksa %50");
}
{ // kural: iki doğru → ÷1,5; bir yanlış → ×1,5; dönüşler; ilk iki dönüşten sonra 1,2
  const s = K.makeStaircase({ reversals: 4 });
  s.respond(true); near(s.level, 0.25, 1e-15, "tek doğru değiştirmez"); s.respond(true); near(s.level, 0.25 / 1.5, 1e-15, "iki doğru ÷1,5");
  s.respond(false); near(s.level, 0.25, 1e-15, "yanlış ×1,5 (1. dönüş)"); ok(s.reversals.length === 1, "1 dönüş");
  s.respond(true); s.respond(true); ok(s.reversals.length === 2, "2 dönüş"); near(s.level, 0.25 / 1.2, 1e-15, "2. dönüşten sonra küçük adım 1,2");
  s.respond(false); near(s.level, 0.25, 1e-15, "×1,2 (3. dönüş)"); s.respond(true); s.respond(true); ok(s.done, "4 dönüşte biter");
  near(s.threshold(), Math.sqrt(0.25 / 1.2 * 0.25), 1e-14, "dönüş eşiği: 3. ve 4. dönüşün geometrik ortalaması");
  ok(s.trial === 8, "8 deneme");
  const t = K.makeStaircase(); for (let i = 0; i < 300; i++) t.respond(true); near(t.level, 0.002, 1e-15, "alt sınır"); ok(t.done && t.trial === 100, "en çok 100 deneme");
}
{ // ayrı yazılmış uzun merdiven: 2 aşağı 1 yukarı küçük adımla %70,7 noktasına yerleşir
  const k = 0.04, r = xrng(3); let lv = 0.2, run = 0, dir = 0; const rev = [];
  while (rev.length < 3000) { const c = r() < PhiAS(Z7 * lv / k); let mv = 0; if (c) { if (++run === 2) { mv = -1; run = 0; } } else { run = 0; mv = 1; } if (mv) { if (dir && mv !== dir) rev.push(lv); dir = mv; lv *= mv > 0 ? 1.03 : 1 / 1.03; } }
  const g = Math.exp(rev.slice(100).reduce((s, x) => s + Math.log(x), 0) / (rev.length - 100));
  abs(g / k, 1, 0.03, "uzun merdiven k'ya yakınsar");
}
{ // olabilirlik kestirimi: sabit uyaranlar yöntemiyle bilinen T'den üretilmiş veri
  for (const T of [0.03, 0.12]) { const r = xrng(11), h = []; for (const m of [0.3, 0.6, 1, 1.5, 2.5]) for (let i = 0; i < 4000; i++) { const lv = m * T; h.push({ level: lv, correct: r() < 0.005 + 0.99 * PhiAS(Z7 * lv / T) }); } abs(K.mlThreshold(h) / T, 1, 0.03, `olabilirlik T=${T}`); }
  const h = [{ level: 0.1, correct: true }, { level: 0.05, correct: false }, { level: 0.08, correct: true }];
  const ll = (T) => h.reduce((s, x) => { const p = 0.005 + 0.99 * PhiAS(Z7 * x.level / T); return s + Math.log(x.correct ? p : 1 - p); }, 0);
  let best = 0, bv = -Infinity; for (let i = 0; i <= 4000; i++) { const T = Math.exp(Math.log(1e-3) + (Math.log(2) - Math.log(1e-3)) * i / 4000); const v = ll(T); if (v > bv) { bv = v; best = T; } }
  abs(K.mlThreshold(h) / best, 1, 0.01, "olabilirlik kaba kuvvet ızgarasıyla aynı");
}
for (const k of [0.02, 0.03, 0.06]) { const s = K.simStaircases({ k, seed: 1, runs: 300, reversals: 8 }); abs(s.mean / k, 1, 0.08, `benzetilmiş merdivenler k=${k} (olabilirlik)`); ok(s.revMean > s.mean * 1.15, `dönüş ortalaması yukarı sapar k=${k}`); ok(s.trials > 25 && s.trials < 45, `deneme sayısı ${s.trials}`); }
abs(K.weberFit([{ S: 60, delta: 1.8 }, { S: 120, delta: 3.6 }, { S: 240, delta: 7.2 }]), 0.03, 1e-15, "Weber doğrusu tam veri");
abs(K.weberFit([{ S: 100, delta: 2 }, { S: 200, delta: 8 }]), (200 + 1600) / (10000 + 40000), 1e-15, "Weber en küçük kareler başlangıçtan");

/* ── 4. Fechner ve Stevens ── */
{ const S = K.ME_RATIOS, P = K.fitPower(S, S.map((s) => 37 * s ** 0.62)); abs(P.a, 0.62, 1e-12, "üs tam veri"); abs(P.k, 37, 1e-10, "k tam veri"); abs(P.rms, 0, 1e-10, "KOK 0");
  const F = K.fitLog(S, S.map((s) => 80 * Math.log(s / 0.2))); abs(F.alpha, 80, 1e-10, "α tam veri"); abs(F.S0, 0.2, 1e-12, "S₀ tam veri"); abs(F.rms, 0, 1e-9, "KOK 0"); }
assert.deepEqual([...K.meOrder(4)].sort((a, b) => a - b), [...K.ME_RATIOS]); checks++;
for (const [ratio, k] of [[2, 0.03], [100, 0.03], [10, 0.1]]) { let s = 1, n = 0; while (s * (1 + k) <= ratio) { s *= 1 + k; n++; } ok(Math.floor(K.jndCount(ratio, k) + 1e-12) === n, `FEF sayımı ${ratio}, ${k}: ${n}`); }
abs(K.jndCount(2, 0.03), 23.4498, 1e-4, "2 kat = 23,4 FEF"); abs(K.jndCount(100, 0.03), 155.797, 1e-3, "100 kat = 155,8 FEF");
{ let sa = 0; for (let s = 1; s <= 200; s++) { const d = K.simMagnitude({ a: 0.7, seed: s }); sa += K.fitPower(d.map((x) => x.S), d.map((x) => x.psi)).a; } abs(sa / 200, 0.7, 0.02, "benzetilmiş üs yansız"); }

/* ── 5. Sinyal saptama ── */
for (const [d, c] of [[1.5, 0], [2, 0.4], [0.7, -0.6], [0, 0.3]]) {
  const t = K.sdtTheory(d, c);
  abs(PhiInv(t.H) - PhiInv(t.F), d, 1e-7, `d′ geri gelir ${d}`); abs(-(PhiInv(t.H) + PhiInv(t.F)) / 2, c, 1e-7, `c geri gelir ${c}`);
  const r = xrng(5); let h = 0, f = 0; const N = 200000; for (let i = 0; i < N; i++) { if (d / 2 + polar(r) > c) h++; if (-d / 2 + polar(r) > c) f++; } abs(t.H, h / N, 0.004, "H Monte Carlo"); abs(t.F, f / N, 0.004, "F Monte Carlo");
  const roc = K.rocCurve(d, 4000); let auc = 0; for (let i = 1; i < roc.length; i++) auc += (roc[i][0] - roc[i - 1][0]) * (roc[i][1] + roc[i - 1][1]) / 2; abs(t.auc, auc, 2e-4, `AUC = ROC altındaki alan ${d}`);
}
for (const [d, p] of [[1.5, 0.25], [1, 0.75], [2.5, 0.5]]) { let best = -9, bv = -1; for (let c = -4; c <= 4; c += 0.0005) { const v = p * PhiAS(d / 2 - c) + (1 - p) * (1 - PhiAS(-d / 2 - c)); if (v > bv) { bv = v; best = c; } } abs(K.optimalC(d, p), best, 2e-3, `en iyi ölçüt d=${d} p=${p}`); abs(K.sdtAccuracy(d, best, p), bv, 1e-6, "doğruluk"); }
{ const r = K.sdtFromCounts({ hits: 10, misses: 0, fas: 0, crs: 10 }); abs(r.H, 10.5 / 11, 1e-15, "log-doğrusal H"); abs(r.F, 0.5 / 11, 1e-15, "log-doğrusal F"); ok(Number.isFinite(r.d) && r.d > 3, "%100'de sonlu d′"); abs(r.acc, 1, 0, "doğruluk"); }
{ const c = K.sdtSim({ d: 1.2, c: 0.3, n: 200000, p: 0.5, seed: 9 }), r = K.sdtFromCounts(c); abs(r.d, 1.2, 0.02, "benzetim d′"); abs(r.c, 0.3, 0.01, "benzetim c"); ok(c.hits + c.misses === 100000, "sinyal sayısı"); }
{ const sch = K.sdtSchedule(32, 0.25, 3); ok(sch.length === 32 && sch.filter(Boolean).length === 8, "blok planı: 8 sinyal"); }

/* ── 6. Tepki süresi ── */
{ const f = K.hickFit([{ n: 1, rt: 200 }, { n: 2, rt: 350 }, { n: 4, rt: 500 }, { n: 8, rt: 650 }]); abs(f.hyman.a, 200, 1e-10, "Hyman a"); abs(f.hyman.b, 150, 1e-10, "Hyman b"); abs(f.hyman.r2, 1, 1e-12, "R²"); }
for (const [sg, tau] of [[30, 60], [20, 100]]) { const r = xrng(13), v = []; for (let i = 0; i < 400000; i++) v.push(sg * polar(r) - tau * Math.log(1 - r())); abs(K.exGaussMedianShift(sg, tau), xmedian(v), 0.4, `ex-Gauss ortanca kayması σ=${sg} τ=${tau}`); }
{ const rows = K.simRT({ a: 220, b: 140, delay: 60, trials: 6000, seed: 2 }), sh = K.exGaussMedianShift(30, 60), f = K.hickFit(rows.map((x) => ({ n: x.n, rt: x.median })));
  abs(f.hyman.b, 140, 3, "benzetim eğimi"); abs(f.hyman.a, 220 + 60 + sh, 3, "kesişim = a + gecikme + kayma"); }
{ const p = K.trialPlan(4, 500, 1); ok(p.every((t) => t.target >= 0 && t.target < 4 && t.fore >= 900 && t.fore <= 2200), "deneme planı sınırlar"); ok(new Set(p.map((t) => t.target)).size === 4, "her hedef çıkar"); }

console.log(`G algı: ${checks} çekirdek kontrolü PASS`);

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
      const sent = []; page.on("request", (r) => { if (["fetch", "xhr", "ping", "websocket", "eventsource"].includes(r.resourceType())) sent.push(r.resourceType() + " " + r.url()); }); // yanıtlar hiçbir yere gönderilmez
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, t) => { await page.waitForFunction(([i, s]) => document.getElementById(i).textContent.includes(s), [id, t], { timeout: 8000 }).catch(() => {}); const v = await read(id); assert(v.includes(t), `${id}: "${v}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); e.dispatchEvent(new Event("change", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const reset = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); };
      const noOverflow = async (label) => ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${label} taşma yok`);
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuval etiketleri");
      ok(await page.evaluate(() => !/[̀-ͯ]/.test(document.querySelector(".app-content").textContent)), "birleşik işaret yok");
      ok(await page.evaluate(() => !Object.keys(localStorage).some((k) => !/^acelya-(theme|sound-muted)/.test(k) && /algi|percep|wb|rt|sdt/i.test(k))), "yanıt saklanmıyor");
      const inked = (id) => page.locator("#" + id).evaluate((c) => { const g = c.getContext("2d"), d = g.getImageData(0, 0, c.width, c.height).data; const r0 = d[0], g0 = d[1], b0 = d[2]; let n = 0; for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - r0) + Math.abs(d[i + 1] - g0) + Math.abs(d[i + 2] - b0) > 40) n++; return n / (d.length / 4); });
      // 1 · yanılsamalar
      await has("ilSet", "%112,0"); await has("ilTruth", "%100,0"); await has("ilSetD", "+%12,0"); ok((await inked("ilCanvas")) > 0.005, "Müller-Lyer çizili");
      await page.click("#adjPlus"); await has("ilSet", "%112,5"); await page.click("#adjMinus"); await page.click("#adjMinus"); await has("ilSet", "%111,5");
      await page.click("#ilRecord"); await has("ilLast", "%111,5"); await has("ilLastD", "+%11,5"); await has("ilCount", "1"); await has("ilStatus", "uzatman gerekti"); await has("ilSet", "%85,5");
      await page.click("#ilRecord"); await page.click("#ilRecord"); await has("ilCount", "3"); await has("ilStatus", "3 denemenin ortalaması");
      await page.click("#ilReveal"); ok((await page.locator("#ilReveal").getAttribute("aria-pressed")) === "true", "hile düğmesi"); await page.click("#ilReveal");
      await sel("ilKind", "eb"); await has("ilTitle", "Ebbinghaus"); await has("ilTruthD", "52 birim"); ok((await inked("ilCanvas")) > 0.02, "Ebbinghaus çizili"); await has("ilCount", "0");
      await sel("ilKind", "cafe"); await has("ilTruth", "0,0°"); ok((await inked("ilCanvas")) > 0.2, "kafe duvarı çizili"); await sel("cfShift", "0"); await has("ilStatus", "sütunlar oluşur"); ok(!/dama/.test(await page.locator("#cfShift").textContent()), "kaymasız düzen dama tahtası değil");
      await page.click("#ilRecord"); await has("ilLastD", "dengeleyen eğim");
      await sel("ilKind", "sc"); await has("ilTruth", "128");
      const box = await page.locator("#ilCanvas").boundingBox();
      await page.mouse.click(box.x + box.width * 0.25, box.y + box.height * 0.5); await has("ilPixel", "gri 128"); await has("ilPixelD", "%21,6");
      await page.mouse.click(box.x + box.width * 0.02, box.y + box.height * 0.05); await has("ilPixel", "gri 28");
      await page.click("#ilRecord"); await has("ilLastD", "ışıkta");
      await sel("ilKind", "hg"); ok(await page.locator("#adjBox").isHidden(), "ızgarada ayar yok"); await page.click("#hgYes"); await sel("hgStyle", "wavy"); await page.click("#hgNo"); await has("ilMean", "1 / 2"); await has("ilStatus", "dalgalı 0/1");
      await page.mouse.click(box.x + 3, box.y + box.height * 0.5).catch(() => {}); await has("ilPixel", "gri");
      await noOverflow("yanılsama");
      await reset(); await has("ilTitle", "Müller-Lyer"); await has("ilCount", "3"); await has("ilSet", "%112,0");
      // sekme klavyesi
      await page.locator("#tab-il").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-rt").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-wb").getAttribute("aria-selected")) === "true", "ArrowRight"); ok(await page.locator("#panel-il").isHidden(), "tek panel");
      // 2 · Weber
      await has("wbSimK", "%2,91"); await has("wbSimTh", "%3,00"); await has("wbSimThD", "dönüş ortalaması"); await has("wbStatus", "Benzetilmiş gözlemci");
      for (const id of ["wbChart", "wbStair"]) ok((await inked(id)) > 0.003, `${id} çizili`);
      ok(await page.locator("#wbTop").isDisabled(), "başlamadan yanıt yok");
      await page.click("#wbStart"); await has("wbTrial", "0 · 0"); await has("wbLevel", "%25,0"); ok((await inked("wbCanvas")) > 0.001, "çizgiler çizili");
      await page.click("#wbTop"); await page.locator("h1").click(); await page.keyboard.press("ArrowDown"); await has("wbTrial", "2 ·");
      for (let i = 0; i < 120 && !(await page.locator("#wbTop").isDisabled()); i++) await page.click(i % 3 ? "#wbTop" : "#wbBot");
      await has("wbLevelD", "merdiven bitti"); await has("wbThrD", "S = 120"); await has("wbK", "%"); await has("wbRes", "Merdivenlerin");
      await range("wbKsim", 0.06); await has("wbSimTh", "%6,00"); await sel("wbLen", "12"); await has("wbSimKD", "200 merdiven");
      await reset(); await has("wbSimK", "%2,91"); await has("wbThrD", "S = 120");
      await noOverflow("Weber");
      // 3 · Fechner ve Stevens
      await page.click("#tab-st");
      await has("stSimA", "0,826"); await has("stSimAD", "kuram 0,70"); await has("stJnd", "23,4 FEF"); await sel("stRatio", "100"); await has("stJnd", "155,8 FEF"); ok((await inked("stChart")) > 0.003, "Stevens grafiği");
      await page.fill("#stInput", "abc"); await page.click("#stEnter"); await has("stStatus", "Sıfırdan büyük"); await has("stProg", "1 / 10");
      const order = await page.evaluate(() => PerceptionLab.meOrder(1));
      for (const s of order) { await page.fill("#stInput", String(Math.round(100 * s ** 0.7 * 10) / 10).replace(".", ",")); await page.click("#stEnter"); }
      await has("stProg", "bitti"); await has("stA", "0,70"); await has("stStatus", "sıkıştırma"); ok(await page.locator("#stEnter").isDisabled(), "bitince giriş kapalı");
      await sel("stAxes", "semilog"); await has("stChartCap", "Fechner\x27in logaritma yasası burada düz"); await page.click("#stSim"); ok((await page.locator("#stSeed").inputValue()) === "2", "yeni tohum");
      await page.click("#stRestart"); await has("stProg", "1 / 10"); await has("stA", "—");
      await reset(); await has("stSimA", "0,826"); await has("stJnd", "23,4");
      await noOverflow("Stevens");
      // 4 · sinyal saptama
      await page.click("#tab-sd");
      await has("sdH", "%75,4"); await has("sdHD", "kuram %77,3"); await has("sdDm", "1,49"); await has("sdCm", "0,06"); await has("sdAuc", "%85,6");
      for (const id of ["sdDist", "sdRoc"]) ok((await inked(id)) > 0.01, `${id} çizili`);
      await sel("sdP", "0.75"); await page.click("#sdOpt"); await has("sdCOut", "−0,75"); await has("sdStatus", "c* = −0,73");
      await range("sdD", 0); await has("sdStatus", "köşegende"); await sel("sdN", "100"); await has("sdStatus", "100 denemede");
      await reset(); await has("sdDm", "1,49");
      await sel("sdTrials", "20"); await sel("sdPrior", "0.25"); await page.click("#sdStart");
      for (let i = 0; i < 20; i++) { await page.waitForFunction(() => !document.getElementById("sdYes").disabled, null, { timeout: 5000 }); if (i === 3) { await page.locator("h1").click(); await page.keyboard.press("v"); } else await page.click(i % 4 ? "#sdNo" : "#sdYes"); }
      await page.waitForFunction(() => document.querySelectorAll("#sdBlocks tr").length === 1, null, { timeout: 5000 }); ok(/%25/.test(await page.locator("#sdBlocks tr").textContent()), "blok satırı");
      ok(await page.locator("#sdBlocksEmpty").isHidden(), "blok tablosu dolu"); await page.click("#sdClear"); ok(await page.locator("#sdBlocksEmpty").isVisible(), "bloklar silinir");
      await noOverflow("sinyal");
      // 5 · tepki süresi
      await page.click("#tab-rt");
      await has("rtSimB", "150 · 254 ms"); await has("rtSimTh", "150 · 247 ms"); await has("rtB", "—"); ok((await inked("rtChart")) > 0.003, "Hick grafiği");
      await range("rtDelay", 60); await has("rtSimTh", "307 ms"); await has("rtStatus", "eğimi değiştirmedi"); await reset(); await has("rtSimB", "150 · 254 ms");
      await sel("rtTrials", "5");
      for (const n of ["1", "4"]) {
        await sel("rtN", n); await page.click("#rtStart");
        if (n === "1") { await page.locator("#rtArena .ap-pad").first().dispatchEvent("pointerdown"); await has("rtMsg", "Erken"); }
        for (let i = 0; i < 5; i++) { const pad = page.locator("#rtArena .ap-pad.is-on"); await pad.waitFor({ timeout: 6000 }); await pad.dispatchEvent("pointerdown"); await page.waitForTimeout(50); }
        await has("rtMsg", "Blok bitti");
      }
      await has("rtTable", "5"); await has("rtBD", "2 düzey"); ok(/ms\/bit/.test(await read("rtB")), "eğim yazılı");
      ok(await page.evaluate(() => getComputedStyle(document.querySelector("#rtArena .ap-pad")).borderRadius === "50%"), "hedefler yuvarlak");
      await page.click("#rtClear"); await has("rtB", "—");
      await noOverflow("tepki");
      await page.waitForSelector(".digest", { state: "attached", timeout: 15000 }); await page.locator(".digest").scrollIntoViewIfNeeded();
      ok(await page.locator(".digest").isVisible(), "Keşif Defteri görünür");
      assert.deepEqual(sent, [], "ağ isteği yok"); checks++;
      ok(await page.evaluate(() => Object.isFrozen(PerceptionLab) && !Object.getOwnPropertyDescriptor(window, "PerceptionLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G algı: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
