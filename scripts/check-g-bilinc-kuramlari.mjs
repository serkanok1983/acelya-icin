// Bilinç kuramları: çekirdeğin bağımsız denetimi (Simpson integrali ile Φ, sayfanınkinden farklı bir üreteçle
// Monte Carlo, BigInt ile kesin binom, ayrı yazılmış karşılıklı bilgi ve Lempel–Ziv ayrıştırıcısı, küçük adımlı
// sekme benzetimi) ve isteğe bağlı tarayıcı denetimi (390 px açık, 1280 px koyu).
// Kullanım: node scripts/check-g-bilinc-kuramlari.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "bilinc-kuramlari";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.ConsciousnessLab;
let checks = 0;
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
const title = html.match(/<title>([^<]*)<\/title>/)[1];
ok(title.length <= 80 && title.startsWith("Bilinç: "), `başlık (${title.length})`);
ok(/<body[^>]*data-page="bilinc-kuramlari"/.test(html), "data-page");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/\p{Extended_Pictographic}/u.test(html.replace(/[©®™]/g, "")), "emoji yok");
const pageScript = html.split("/* KERNEL-END */")[1];
ok(!/localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|sendBeacon|WebSocket/.test(source + pageScript), "sayfa betiği depolamaya ya da ağa dokunmaz");
for (const l of ["algi-psikolojisi.html", "felsefi-dusunce-deneyleri.html", "sinir-hucresi-ve-aksiyon-potansiyeli.html", "bellek-ve-ogrenme.html", "bilim-felsefesi.html"]) ok(html.includes(`href="${l}"`), `bağlantı ${l}`);
ok(/112/.test(html) && /sağlık profesyoneline/.test(html), "yardım notu");
ok(/IIT 3\.0 ya da 4\.0'ın Φ'si değildir/.test(html), "Φ öğretim ölçüsü olarak etiketli");

/* ── Bağımsız araçlar ── */
function sfc(seed) { let a = seed | 0, b = 0x9e3779b9 | 0, c = 0x243f6a88 | 0, d = 0xb7e15162 | 0; const f = () => { const t = (((a + b) | 0) + d) | 0; d = (d + 1) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); c = (c + t) | 0; return (t >>> 0) / 4294967296; }; for (let i = 0; i < 20; i++) f(); return f; }
function normal(R) { for (;;) { const u = 2 * R() - 1, v = 2 * R() - 1, s = u * u + v * v; if (s > 0 && s < 1) return u * Math.sqrt(-2 * Math.log(s) / s); } } // Marsaglia kutupsal
function simpsonPhi(x) { if (x < -9) return 0; const a = -9, n = 4000, h = (x - a) / n, f = (t) => Math.exp(-t * t / 2) / Math.sqrt(2 * Math.PI); let s = f(a) + f(x); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; }

/* ── 1. Normal dağılım ── */
for (const x of [-4, -2.5, -1.16, -0.56, 0, 0.3, 1, 1.96, 3.2]) abs(K.Phi(x), simpsonPhi(x), 2e-7, `Φ(${x})`);
abs(K.PhiInv(0.975), 1.959964, 2e-6, "Φ⁻¹(0,975)"); abs(K.PhiInv(0.5), 0, 1e-6, "Φ⁻¹(0,5)");
for (const p of [1e-6, 0.01, 0.2, 0.663, 0.9, 0.999]) abs(K.Phi(K.PhiInv(p)), p, 1e-6 * Math.max(1, p * 10), `Φ(Φ⁻¹(${p}))`);
abs(K.dprimeId(0.76, 100), 2 * 0.7063, 2e-3, "tek aralıklı d′ = 2·z (%76)"); abs(K.dprimeId(1, 10), 2 * K.PhiInv(0.95), 1e-9, "kırpma 1 − 1/2n");
// bağımsız: yansız gözlemcide H = p, F = 1 − p; d′ = z(H) − z(F), z Simpson integralinin ikiye bölme ile tersi
{ const zRef = (p) => { let lo = -9, hi = 9; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (simpsonPhi(m) < p) lo = m; else hi = m; } return (lo + hi) / 2; };
  for (const p of [0.55, 2 / 3, 0.8774, 0.95]) abs(K.dprimeId(p, 1e6), zRef(p) - zRef(1 - p), 1e-5, `d′ = z(H) − z(F) (${p})`);
  abs(K.dprimeId(K.Phi(K.maskMu(33)), 1e6), 2 * K.maskMu(33), 1e-6, "modelde d′ = 2μ ≈ 2,32"); abs(2 * K.maskMu(33), 2.3237, 1e-3, "2μ(33 ms)"); }

/* ── 2. Maskeleme modeli ── */
abs(K.maskMu(8), 0, 0, "SOA ≤ 8 ms → μ = 0"); abs(K.maskMu(48), 2.5 * (1 - Math.exp(-1)), 1e-12, "μ(48 ms)");
for (const [soa, D, k] of [[33, 2.5, 0.6], [17, 2.5, 0.6], [50, 3, 1.2], [100, 1.5, 0.3], [5, 2.5, 0.6]]) {
  const th = K.maskTheory(soa, D, k), mu = K.maskMu(soa, D);
  // sayısal integral: |e| < k bandında doğruluk
  const pos = simpsonPhi(k - mu) - simpsonPhi(-mu), neg = simpsonPhi(-mu) - simpsonPhi(-k - mu);
  abs(th.p1, pos + neg, 1e-6, `P(görünürlük 1) SOA ${soa}`); abs(th.pc1, pos / (pos + neg), 1e-6, `P(doğru | 1) SOA ${soa}`);
  abs(th.table.reduce((s, r) => s + r.p, 0), 1, 1e-9, "dört bandın toplamı 1");
  // Monte Carlo (farklı üreteç ve normal yöntemi)
  const R = sfc(soa * 13 + 7), e = [0, k, k + 0.8, k + 1.6, Infinity]; const by = [0, 0, 0, 0], bc = [0, 0, 0, 0]; let c = 0; const N = 200000;
  for (let i = 0; i < N; i++) { const x = mu + normal(R), ax = Math.abs(x); let b = 0; while (ax >= e[b + 1]) b++; by[b]++; if (x > 0) { bc[b]++; c++; } }
  abs(c / N, th.pc, 0.004, `MC doğruluk SOA ${soa}`); abs(by[0] / N, th.p1, 0.004, `MC görünürlük 1 payı SOA ${soa}`); abs(bc[0] / by[0], th.pc1, 0.008, `MC görünürlük 1'de doğruluk SOA ${soa}`);
}
{ const th = K.maskTheory(33, 2.5, 0.6); abs(th.pc, 0.8774, 1e-4, "varsayılan doğruluk %87,7"); abs(th.p1, 0.2481, 1e-4, "varsayılan görmedim payı %24,8"); abs(th.pc1, 0.6630, 1e-4, "varsayılan görmedimde doğruluk %66,3"); }
{ let prev = 0.5; for (let k = 0.05; k <= 3; k += 0.05) { const v = K.maskTheory(33, 2.5, k).pc1; ok(v >= prev - 1e-12, `ölçüt büyüdükçe görmedimde doğruluk artar (k ${k.toFixed(2)})`); prev = v; } abs(prev, K.Phi(K.maskMu(33)), 0.01, "k → ∞ iken genel doğruluğa yaklaşır"); abs(K.maskTheory(33, 2.5, 1e-6).pc1, 0.5, 1e-4, "k → 0 iken %50"); }
abs(K.maskTheory(5, 2.5, 0.6).pc1, 0.5, 1e-12, "μ = 0 iken şans");
{ const s = K.simMask({ seed: 1, n: 1000, soa: 33, dmax: 2.5, k: 0.6 }); ok(s.c === 875 && s.by[0].n === 276 && s.by[0].c === 182, "benzetim tohum 1: 875, 276, 182"); ok(s.by.reduce((a, b) => a + b.n, 0) === 1000, "benzetim toplamı"); }
// Wilson aralığı (yayımlanmış değer: 8/10 → 0,4902–0,9433) ve kesin binom
{ const w = K.wilson(8, 10); abs(w[0], 0.4902, 1e-4, "Wilson alt"); abs(w[1], 0.9433, 1e-4, "Wilson üst"); const z = K.wilson(0, 5); ok(z[0] === 0, "Wilson 0/5"); }
function binomBig(k, n) { let num = 0n, c = 1n; for (let i = 0; i <= n; i++) { if (i >= k) num += c; c = c * BigInt(n - i) / BigInt(i + 1); } return Number(num * 10n ** 15n / 2n ** BigInt(n)) / 1e15; }
for (const [k, n] of [[7, 10], [15, 20], [30, 50], [60, 100], [0, 8], [12, 12]]) abs(K.binomUpper(k, n), binomBig(k, n), 1e-12, `binom P(X ≥ ${k} | ${n})`);
{ const P = K.maskPlan(101, K.MK_MIX, 4); ok(P.length === 24 && K.MK_MIX.every((s) => P.filter((t) => t.soaF === s).length === 4), "karışık blok 6 × 4"); ok(JSON.stringify(P) === JSON.stringify(K.maskPlan(101, K.MK_MIX, 4)), "plan tohumla belirli"); const dirs = P.map((t) => t.dir); ok(dirs.includes(1) && dirs.includes(-1), "iki yön"); }

/* ── 3. Dikkat kırpması ── */
for (let s = 1; s <= 300; s++) for (const lag of K.AB_LAGS) {
  const t = K.rsvpTrial(s, lag); const it = t.items;
  if (it.length !== 20 || t.t2 - t.t1 !== lag || it[t.t1] !== t.d1 || it[t.t2] !== t.d2 || t.d1 === t.d2) assert.fail(`dizi ${s}/${lag}`);
  const digits = it.filter((x) => /\d/.test(x)); if (digits.length !== 2) assert.fail("tam iki rakam");
  for (let i = 1; i < it.length; i++) if (it[i] === it[i - 1]) assert.fail("ardışık eş öğe");
  if (it.some((x) => /[BGIOQSZ]/.test(x))) assert.fail("karıştırılabilir harf");
}
checks += 4;
{ const P = K.abPlan(1, 4); ok(P.length === 24 && K.AB_LAGS.every((l) => P.filter((t) => t.lag === l).length === 4), "kırpma planı 6 × 4"); }
{ const tr = [{ lag: 1, ok1: true, ok2: true, lagMs: 100 }, { lag: 2, ok1: true, ok2: false, lagMs: 200 }, { lag: 2, ok1: false, ok2: true, lagMs: 200 }, { lag: 8, ok1: true, ok2: true, lagMs: 800 }];
  const S = K.abScore(tr); ok(S.n === 4 && S.k1 === 3, "T1 sayımı"); const r2 = S.rows.find((r) => r.lag === 2); ok(r2.n === 2 && r2.n1 === 1 && r2.k2 === 0 && r2.p2 === 0, "T2 yalnız T1 doğruysa sayılır"); }
ok(K.abSynthetic(100) > 0.8 && K.abSynthetic(300) < 0.5 && K.abSynthetic(800) > 0.8, "sentetik eğri biçimi");

/* ── 4. Değişim ve dikkatsizlik körlüğü ── */
for (let s = 1; s <= 200; s++) { const sc = K.cbScene(s); ok(sc.objs.length >= 10, `sahne ${s} yeterli şekil`); for (let i = 0; i < sc.objs.length; i++) for (let j = i + 1; j < sc.objs.length; j++) { const a = sc.objs[i], b = sc.objs[j]; if (Math.hypot(a.x - b.x, a.y - b.y) <= a.s + b.s + 10) assert.fail("çakışan şekil"); } const o = sc.objs[sc.change.i]; if (!(o.x - o.s >= 0 && o.x + o.s <= 600 && o.y - o.s >= 0 && o.y + o.s <= 300)) assert.fail("sahne dışı"); if (sc.change.type === "color" && sc.change.nc === o.c) assert.fail("renk değişmiyor"); if (!K.cbHit(sc, o.x + 3, o.y - 3) || K.cbHit(sc, o.x + o.s * 1.2 + 30, o.y)) assert.fail("isabet sınaması"); }
checks += 4;
function bounceSim(p0, v, T, L) { const dt = 1e-4; let p = p0, vv = v, hits = 0; for (let t = 0; t < T - 1e-12; t += dt) { p += vv * dt; if (p > L) { p = 2 * L - p; vv = -vv; hits++; } else if (p < 0) { p = -p; vv = -vv; hits++; } } return { p, hits }; }
for (const [p0, v, T, L] of [[10, 90, 12, 572], [200, -130, 12.1, 272], [0.5, 40, 7, 50], [271, 129, 3.3, 272]]) { const a = K.bounce(p0, v, T, L), b = bounceSim(p0, v, T, L); abs(a.p, b.p, 0.05, `sekme konumu ${p0}`); ok(a.hits === b.hits, `sekme sayısı ${a.hits} = ${b.hits}`); }
{ const sc = K.ibObjects(7); let tot = 0; sc.objs.filter((o) => o.white).forEach((o) => { tot += bounceSim(o.x0, o.vx, 12, 600 - 2 * sc.R).hits + bounceSim(o.y0, o.vy, 12, 300 - 2 * sc.R).hits; }); ok(K.ibWhiteHits(sc, 12) === tot && tot === 17, `beyaz çarpma 17 (${tot})`); }

/* ── 5. Öğretim ölçüsü Φ_öğr: ayrı yazılmış karşılıklı bilgi ── */
const F = { copy: (a) => a, not: (a) => 1 - a, and: (a, b) => a & b, or: (a, b) => a | b, xor: (a, b) => a ^ b, zero: () => 0 };
function miRef(net, part) { const n = net.length, N = 2 ** n; const joint = new Map(); for (let s = 0; s < N; s++) { const b = Array.from({ length: n }, (_, i) => Math.floor(s / 2 ** i) % 2); const nx = net.map((d) => F[d.gate](b[d.in[0]], b[d.in[1]])); const key = JSON.stringify([part.map((i) => b[i]), part.map((i) => nx[i])]); joint.set(key, (joint.get(key) || 0) + 1 / N); } const px = new Map(), py = new Map(); for (const [k, p] of joint) { const [x, y] = JSON.parse(k); px.set(String(x), (px.get(String(x)) || 0) + p); py.set(String(y), (py.get(String(y)) || 0) + p); } let H = (m) => -[...m.values()].reduce((s, p) => s + p * Math.log2(p), 0); return H(px) + H(py) - H(joint); }
function phiRef(net) { const n = net.length, all = [...Array(n).keys()], W = miRef(net, all); const splits = []; for (let m = 1; m < 2 ** n - 1; m++) { const A = all.filter((i) => (m >> i) & 1), B = all.filter((i) => !((m >> i) & 1)); if (A[0] === 0) splits.push([A, B]); } return { W, phi: Math.min(...splits.map(([A, B]) => W - miRef(net, A) - miRef(net, B))) }; }
for (const [k, W, P] of [["ring", 3, 2], ["self3", 3, 0], ["chain", 2, 0], ["xor3", 2, 1], ["swap2", 2, 2]]) { const r = K.phiToy(K.NET_PRESETS[k]); abs(r.whole, W, 1e-12, `${k} I(bütün)`); abs(r.phi, P, 1e-12, `${k} Φ_öğr`); }
{ const r = K.phiToy(K.NET_PRESETS.and3); abs(r.phi, phiRef(K.NET_PRESETS.and3).phi, 1e-12, "ve ağı kaba kuvvet"); abs(r.phi, 1.2012, 1e-4, "ve ağı 1,201"); }
{ const R = sfc(42), gates = Object.keys(F); for (let t = 0; t < 400; t++) { const n = R() < 0.3 ? 2 : 3; const net = Array.from({ length: n }, () => ({ gate: gates[Math.floor(R() * gates.length)], in: [Math.floor(R() * n), Math.floor(R() * n)] })); const a = K.phiToy(net), b = phiRef(net); if (Math.abs(a.whole - b.W) > 1e-9 || Math.abs(a.phi - Math.max(0, b.phi)) > 1e-9) assert.fail(`rastgele ağ ${t}: ${a.phi} ≠ ${b.phi}`); if (b.phi < -1e-9) assert.fail("en büyük entropili geçmişte bütün eksi parçalar negatif olmamalı"); if (a.whole > n + 1e-9) assert.fail("I ≤ n bit"); } checks += 3; }

/* ── 6. Lempel–Ziv ── */
function lzRef(s) { let i = 0, c = 0; while (i < s.length) { let L = 1; while (i + L <= s.length && s.slice(0, i + L - 1).includes(s.slice(i, i + L))) L++; c++; i += L; } return c; }
ok(K.lz76("0001101001000101") === 6, "Lempel–Ziv 1976 örneği: 0·001·10·100·1000·101");
{ const R = sfc(9); for (let t = 0; t < 3000; t++) { const n = 1 + Math.floor(R() * 80), p = R(); let s = ""; for (let j = 0; j < n; j++) s += R() < p ? "1" : "0"; if (K.lz76(s) !== lzRef(s)) assert.fail(`LZ ${s}`); } checks++; }
{ const z = K.pciToy(K.pciPattern({ spread: 0, diff: 0, noise: 0 })); ok(z.p === 0 && z.v === 0, "boş matris 0"); }
{ const v = Object.fromEntries(Object.entries(K.PC_PRESETS).map(([k, o]) => [k, K.pciToy(K.pciPattern({ ...o, seed: 1 }))]));
  ok(v.diff.c === 80 && v.uniform.c === 7 && v.local.c === 8 && v.noise.c === 95, "hazır desenlerin c değerleri 80, 7, 8, 95");
  abs(v.diff.v, 80 * 10 / 1024, 1e-12, "ölçü = c·log₂L/L"); ok(v.noise.v > v.diff.v && v.diff.v > 0.5 && v.uniform.v < 0.1 && v.local.v < 0.1, "sıralama: gürültü > farklılaşmış ≫ tekdüze, yerel");
  const R = sfc(5); let s = ""; for (let i = 0; i < 1024; i++) s += R() < 0.5 ? "1" : "0"; abs(K.lz76(s) * 10 / 1024, 1, 0.12, "yarı yarıya rastgele dizide ölçü ≈ 1"); }

/* ── 7. Tutum haritası ── */
ok(K.POSITIONS.length === 5 && K.POSITIONS.every((p) => p.s.length === 5 && p.obj && p.claim), "beş okul, itirazlarıyla");
{ const f = K.positionFit([-1, -1, -1, 1, 1]); ok(f[0].agree === 5 && f[0].clash === 0, "A tipi tam uyum"); ok(K.positionFit([0, 0, 0, 0, 0]).every((x) => x.agree === 0 && x.clash === 0), "kararsız yanıtlar sayılmaz"); }

console.log(`G bilinç: ${checks} çekirdek kontrolü PASS`);

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
      await page.clock.install();
      await page.addInitScript((th) => { localStorage.setItem("acelya-theme", th); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      page.setDefaultTimeout(15000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      const sent = []; page.on("request", (r) => { if (["fetch", "xhr", "ping", "websocket", "eventsource"].includes(r.resourceType())) sent.push(r.resourceType() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      await page.clock.runFor(500);
      await page.waitForSelector(".digest", { timeout: 8000 }); ok(await page.locator(".digest").first().isVisible(), `${width}px defter görünür`); ok((await page.locator(".digest").first().textContent()).includes("Görmeden bilmek mi, ölçüt mü?"), "defter içeriği");
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { const v = await read(id); assert(v.includes(s), `${width}px ${id}: "${v}" içinde "${s}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); e.dispatchEvent(new Event("change", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const reset = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); };
      const tick = (ms) => page.clock.runFor(ms);
      const noOverflow = async (label) => ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${label} taşma yok`);
      const inked = (id) => page.locator("#" + id).evaluate((c) => { const g = c.getContext("2d"), d = g.getImageData(0, 0, c.width, c.height).data; const r0 = d[0], g0 = d[1], b0 = d[2]; let n = 0; for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - r0) + Math.abs(d[i + 1] - g0) + Math.abs(d[i + 2] - b0) > 40) n++; return n / (d.length / 4); });
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll(".app-content input,.app-content select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuval etiketleri");
      ok(await page.evaluate(() => !/[̀-ͯ]/.test(document.querySelector(".app-content").textContent)), "birleşik işaret yok");
      // 1 · tutum haritası
      await has("pmStatus", "Henüz yanıt yok"); ok((await page.locator("#pmOut li").count()) === 5, "beş okul");
      for (const [i, v] of [[1, -1], [2, -1], [3, -1], [4, 1], [5, 1]]) await sel("pmS" + i, v);
      await has("pmStatus", "A tipi fizikalizm ve illüzyonizm"); ok((await page.locator("#pmOut li.is-hit").count()) === 1, "tek çatışmasız okul"); await has("pmOut", "uyuşan 5");
      await sel("pmS1", 1); await has("pmStatus", "5 önermeye");
      await reset(); await has("pmStatus", "Henüz yanıt yok");
      await noOverflow("sorunlar");
      // sekme klavyesi
      await page.locator("#tab-pr").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-cg").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-mk").getAttribute("aria-selected")) === "true", "ArrowRight"); ok(await page.locator("#panel-pr").isHidden(), "tek panel");
      // 2 · maskeleme
      await has("msOut", "kuram %87,7"); await has("msOut", "benzetim %87,5 (875 / 1000)"); await has("msOut", "kuram %24,8 · benzetim %27,6"); await has("msOut", "kuram %66,3 · benzetim %65,9 (182 / 276)");
      await has("mkStatus", "%66,3"); await has("mkUnseenD", "Henüz deneme yok"); await has("mkSoaOut", "3 kare");
      ok((await inked("mkChart")) > 0.004, "maskeleme grafiği çizili");
      await range("msK", 1.5); await has("msKOut", "1,50"); const pc15 = await page.evaluate(() => ConsciousnessLab.maskTheory(33, 2.5, 1.5).pc1); await has("msOut", "kuram %" + (100 * pc15).toFixed(1).replace(".", ","));
      await range("msK", 0); await has("msOut", "k = 0 iken hiçbir deneme"); await has("msOut", "k = 0,05'te kuram %51,5"); await has("mkStatus", "k = 0 iken");
      await range("msK", 1.5);
      await range("msSoa", 5); await has("msOut", "μ = 0,000"); await has("msOut", "kuram %50,0");
      await reset(); await has("msOut", "kuram %87,7"); await has("msKOut", "0,60");
      await sel("mkReps", "6"); await range("mkSoa", 2);
      await page.click("#mkStartOne"); ok(await page.locator("#mkLeft").isDisabled(), "sunum sırasında yanıt yok");
      const plan = await page.evaluate(() => ConsciousnessLab.maskPlan(101, [2], 6));
      for (let i = 0; i < plan.length; i++) {
        await tick(16 * 70); ok(await page.locator("#mkLeft").isEnabled(), `deneme ${i + 1} yön sorusu`);
        const right = i < 4 ? plan[i].dir === 1 : plan[i].dir !== 1; // ilk dört doğru, son iki yanlış
        await page.keyboard.press(right ? "ArrowRight" : "ArrowLeft"); ok(await page.locator("#mkP1").isEnabled(), "görünürlük sorusu");
        await page.keyboard.press(String(i % 2 ? 1 : 3)); await tick(400);
      }
      await has("mkProg", "Blok bitti"); await has("mkAcc", "%66,7 (4 / 6)"); await has("mkUnseen", "(2 / 3)"); await has("mkVis", "%50,0"); await has("mkVisD", "2,00 / 4"); await has("mkAccD", "d′ = 0,86");
      ok((await page.locator("#mkTable tr").count()) === 1, "tek SOA satırı"); await has("mkTable", "3 · 0 · 3 · 0"); await has("mkFrame", "Ölçülen kare süresi");
      const soaTxt = await page.locator("#mkTable td").nth(1).textContent(); const soaMs = parseFloat(soaTxt.replace(",", ".")); ok(soaMs >= 25 && soaMs <= 40, `ölçülen SOA iki kare (${soaTxt})`);
      await has("mkUnseenD", "%95 aralık"); await has("mkStatus", "3 denemede");
      await page.click("#mkStartMix"); await tick(16 * 70); await page.click("#mkStop"); await has("mkProg", "durduruldu"); ok(await page.locator("#mkStartMix").isEnabled(), "durdurunca yeniden başlatılabilir");
      await noOverflow("maskeleme");
      await page.click("#mkClear"); await has("mkUnseen", "—"); ok(await page.locator("#mkTableEmpty").isVisible(), "temizlendi");
      // 3 · dikkat
      await page.click("#tab-at"); await has("abStatus", "Sentetik eğri"); ok((await inked("abChart")) > 0.004, "kırpma grafiği");
      await sel("abReps", "2"); await page.click("#abStart");
      const ap = await page.evaluate(() => ConsciousnessLab.abPlan(1, 2));
      for (let i = 0; i < ap.length; i++) {
        await tick(16 * (44 + 20 * 6 + 6)); ok(await page.locator("#abD2").isEnabled(), `kırpma deneme ${i + 1} yanıt`);
        await page.keyboard.press(ap[i].d1); if (ap[i].lag !== 3) await page.keyboard.press(ap[i].d2);
        await page.keyboard.press("Enter"); await tick(400);
      }
      await has("abProg", "Görev bitti"); await has("abT1", "%100,0 (12 / 12)"); await has("abLag1", "%100,0"); await has("abBlinkD", "4 / 6 · 2 / 2"); await has("abStatus", "kırpma görünüyor");
      await has("abT1D", "96,0 ms"); ok((await inked("abChart")) > 0.004, "kırpma verisi çizili");
      await page.locator("#abSyn").uncheck(); await reset(); ok(await page.locator("#abSyn").isChecked(), "R sentetik eğriyi geri açar");
      await page.click("#abClear"); await has("abT1", "—");
      // değişim körlüğü
      await page.click("#cbStart"); await tick(3000); const box = await page.locator("#cbStage").boundingBox();
      const sc = await page.evaluate(() => ConsciousnessLab.cbScene(501)); const o = sc.objs[sc.change.i];
      await page.mouse.click(box.x + 5, box.y + 5); await has("cbProg", "Orası değil");
      await page.mouse.click(box.x + o.x / 600 * box.width, box.y + o.y / 300 * box.height); await has("cbProg", "Buldun"); await has("cbTable", "5 kare");
      ok((await page.locator("#cbTable tr").nth(1).textContent()).includes("11"), "5 kare satırı: 1 deneme, 1 bulunan");
      await sel("cbBlank", "0"); await page.click("#cbStart"); await page.click("#cbGive"); await has("cbProg", "Bulunamadı"); ok((await page.locator("#cbTable tr").nth(0).textContent()).startsWith("0 kare10"), "0 kare satırı: 1 deneme, 0 bulunan");
      await page.click("#cbStart"); await tick(61000 + 2000); await has("cbProg", "Bulunamadı");
      // dikkatsizlik körlüğü
      await page.click("#ibStart"); ok(await page.locator("#ibSend").isDisabled(), "oynatma sırasında yanıt yok"); await tick(12500);
      await page.fill("#ibCount", "15"); await page.click("#ibSend"); await has("ibOut", "Önce"); await sel("ibSaw", "no"); await page.click("#ibSend"); await has("ibOut", "17 kez"); await has("ibOut", "sen 15 saydın"); await has("ibOut", "Simons ve Chabris");
      await page.click("#ibReplay"); await tick(12500); await has("ibProg", "İşaretli");
      await has("atFrame", "Hz"); await noOverflow("dikkat");
      // 4 · kuramlar
      await page.click("#tab-th"); await has("phPhi", "2,000 bit"); await has("phWhole", "3,000 bit"); await has("phReach", "8 / 8"); await has("thFindOut", "Bir bulgu seçtiğinde");
      ok((await page.locator("#phTrans tr").count()) === 8, "8 satırlık geçiş tablosu"); ok((await page.locator("#phParts tr").count()) === 3, "üç bölme"); ok((await inked("phNet")) > 0.004, "ağ çizili");
      await sel("thFind", "cgOffset"); ok(await page.locator("#thc-gnwt").evaluate((e) => e.classList.contains("is-hit")) && await page.locator("#thr-gnwt").evaluate((e) => e.classList.contains("is-hit")), "GNWT işaretli"); await has("thFindOut", "bitişinde");
      await sel("thFind", "boly"); ok(await page.locator("#thc-hot").evaluate((e) => e.classList.contains("is-hit")) && !(await page.locator("#thc-gnwt").evaluate((e) => e.classList.contains("is-hit"))), "üst düzey işaretli");
      await sel("phPreset", "self3"); await has("phPhi", "0,000 bit"); await has("phStatus", "Öğretim ölçüsü 0");
      await sel("phPreset", "chain"); await has("phPhi", "0,000"); await has("phMip", "A | BC"); await has("phReach", "4 / 8");
      await sel("phPreset", "and3"); await has("phPhi", "1,201"); await sel("phPreset", "swap2"); await has("phPhi", "2,000"); ok((await page.locator("#phTrans tr").count()) === 4, "iki düğüm");
      await sel("phN", "3"); await has("phPhi", "0,000"); ok((await page.locator("#phPreset").inputValue()) === "custom", "düğüm sayısı değişince kendi ağım");
      await sel("phG2", "xor"); await sel("phI21", "1"); ok(await page.locator("#phI21").isEnabled(), "iki girdili kapıda ikinci girdi açık"); await sel("phG0", "zero"); ok(await page.locator("#phI00").isDisabled(), "sabitte girdi kapalı");
      const custom = await page.evaluate(() => ConsciousnessLab.phiToy([{ gate: "zero", in: [0, 0] }, { gate: "copy", in: [0, 0] }, { gate: "xor", in: [2, 1] }]).phi.toFixed(3).replace(".", ","));
      await has("phPhi", custom);
      await reset(); await has("phPhi", "2,000"); ok((await page.locator("#thFind").inputValue()) === "none", "R bulguyu sıfırlar");
      await noOverflow("kuramlar");
      // 5 · çekişme
      await page.click("#tab-cg"); await has("pcVal", "0,781"); await has("pcLz", "80"); await has("pcOnes", "%30,6"); await has("pcStatus", "yayılıyor");
      ok((await inked("pcCanvas")) > 0.02, "matris çizili");
      await sel("pcPreset", "uniform"); await has("pcVal", "0,068"); await has("pcStatus", "tekrarlıyor"); await sel("pcPreset", "local"); await has("pcVal", "0,078");
      await sel("pcPreset", "noise"); await has("pcVal", "0,928"); await has("pcStatus", "istatistik adımı");
      await range("pcSpread", 0); await range("pcNoise", 0); await has("pcStatus", "Hiçbir hücre"); ok((await page.locator("#pcPreset").inputValue()) === "custom", "elle ayar");
      await reset(); await has("pcVal", "0,781");
      for (const s of ["256 katılımcı", "642:133–142", "124 araştırmacı", "694–702", "112"]) ok((await page.locator("#panel-cg").textContent()).includes(s), `çekişme metni: ${s}`);
      await noOverflow("çekişme");
      ok(await page.evaluate(() => Object.keys(localStorage).every((k) => /^acelya-/.test(k) && !/bilinc|mask|blink|pas/i.test(k))), "yanıt saklanmıyor");
      assert.deepEqual(sent, [], "ağ isteği yok"); checks++;
      ok(await page.evaluate(() => Object.isFrozen(ConsciousnessLab) && !Object.getOwnPropertyDescriptor(window, "ConsciousnessLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G bilinç: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
