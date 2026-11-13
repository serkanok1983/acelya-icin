// Bellek ve öğrenme: çekirdeğin bağımsız denetimi (Ebbinghaus'un kendi hesapladığı değerler, Murre ve Dros 2015'in
// yayımlanmış uyumları, kaba kuvvet ızgarası, sayfanınkinden farklı bir üreteçle Monte Carlo, ayrı yazılmış Leitner ve
// uzam kuralları) ve isteğe bağlı tarayıcı denetimi (390 px açık, 1280 px koyu).
// Kullanım: node scripts/check-g-bellek-ve-ogrenme.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "bellek-ve-ogrenme";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.MemoryLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
const title = html.match(/<title>([^<]*)<\/title>/)[1];
ok(title.length <= 80 && title.startsWith("Bellek ve Öğrenme: "), `başlık (${title.length})`);
ok(/data-page="bellek-ve-ogrenme"/.test(html), "data-page");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|sendBeacon/.test(source + html.split("/* KERNEL-END */")[1]), "sayfa betiği depolamaya ya da ağa dokunmaz");

/* ── Bağımsız araçlar ── */
function xrng(seed) { let a = seed | 0, b = 0x9e3779b9 | 0, c = 0x243f6a88 | 0, d = 0xb7e15162 | 0; const f = () => { const t = (((a + b) | 0) + d) | 0; d = (d + 1) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); c = (c + t) | 0; return (t >>> 0) / 4294967296; }; for (let i = 0; i < 20; i++) f(); return f; } // sfc32
function lev(a, b) { const d = []; for (let i = 0; i <= a.length; i++) { d[i] = [i]; for (let j = 1; j <= b.length; j++) d[i][j] = i ? Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) : j; } return d[a.length][b.length]; }

/* ── 1. Unutma eğrisi ── */
const F = K.FORGET, t = F.t;
// Ebbinghaus'un kendi tablosu (1885, bölüm 29): kendi t değerleri ve k = 1,84, c = 1,25 ile hesapladığı b
[57.0, 46.7, 34.5, 30.4, 28.1, 24.9, 21.2].forEach((b, i) => abs(100 * K.MODELS.log1885.f(F.ebbT[i], { k: 1.84, c: 1.25 }), b, 0.08, `Ebbinghaus hesaplanan b ${F.ebbT[i]}`));
assert.deepEqual([...F.sets.ebbinghaus.q].map((x) => Math.round(1000 * x) / 10), [58.2, 44.2, 35.8, 33.7, 27.8, 25.4, 21.1]); checks++;
// Murre ve Dros (2015) Tablo 4 (Ebbinghaus 1885) ve Tablo 5 (kuvvet, t saniye): parametreler, SSD, AIC
const MURRE = {
  ebbinghaus: { log: [1.8, 1.21, 0.00218, -30.6], pow: [1.4, 0.13, 0.00285, -28.8], exp2: 0.00469 },
  mack: { log: [1.34, 0.873, 0.00976, -20.2], pow: [0.965, 0.0926, 0.0129, -18.2], exp2: 0.00356 },
  seitz: { log: [0.9, 0.82, 0.00403, -26.4], pow: [0.822, 0.099, 0.00523, -24.5], exp2: 0.00276 },
  dros: { log: [1.36, 1.34, 0.0212, -14.7], pow: [1.56, 0.167, 0.0163, -16.6], exp2: 0.00295 },
};
for (const [set, M] of Object.entries(MURRE)) {
  const q = F.sets[set].q;
  const L = K.fitModel("log1885", t, q); abs(L.p.k, M.log[0], 0.02 * M.log[0] + 0.005, `${set} k`); abs(L.p.c, M.log[1], 0.02 * M.log[1] + 0.005, `${set} c`); abs(L.sse, M.log[2], 0.01 * M.log[2], `${set} log SSD`); abs(L.aic, M.log[3], 0.1, `${set} log AIC`);
  const P = K.fitModel("power", t, q); abs(P.p.mu * 60 ** P.p.a, M.pow[0], 0.02 * M.pow[0], `${set} μ (s)`); abs(P.p.a, M.pow[1], 0.01 * M.pow[1] + 0.0005, `${set} a`); abs(P.sse, M.pow[2], 0.01 * M.pow[2], `${set} kuvvet SSD`); abs(P.aic, M.pow[3], 0.1, `${set} kuvvet AIC`);
  const E2 = K.fitModel("exp2", t, q); ok(E2.sse <= M.exp2 * 1.02, `${set} iki üstel SSD ${E2.sse} ≤ ${M.exp2}`);
  // kaba kuvvet: logaritmik modelin ızgarası sayfanın uyumundan iyi olamaz
  let bv = Infinity; for (let k = 0.3; k <= 3; k += 0.004) for (let c = 0.4; c <= 2; c += 0.004) { let s = 0; for (let i = 0; i < 7; i++) s += (k / (Math.log10(t[i]) ** c + k) - q[i]) ** 2; if (s < bv) bv = s; }
  ok(L.sse <= bv + 1e-9, `${set} log uyumu ızgaradan iyi`);
  let bp = Infinity; for (let a = 0; a <= 0.5; a += 0.0002) { const f = t.map((x) => x ** -a); const mu = f.reduce((s, v, i) => s + v * q[i], 0) / f.reduce((s, v) => s + v * v, 0); const s = f.reduce((s2, v, i) => s2 + (mu * v - q[i]) ** 2, 0); if (s < bp) bp = s; }
  ok(P.sse <= bp + 1e-10, `${set} kuvvet uyumu ızgaradan iyi`);
  const R = 1 - L.sse / q.reduce((s, v) => s + (v - q.reduce((a, b) => a + b) / 7) ** 2, 0); abs(L.r2, R, 1e-12, `${set} R²`);
}
{ const q = F.sets.ebbinghaus.q, E = K.fitModel("exp", t, q), P = K.fitModel("power", t, q); ok(E.sse > 10 * P.sse, "tek üstel Ebbinghaus verisine çok kötü uyar"); abs(K.sse("log1885", t, q, { k: 1.84, c: 1.25 }), 0.0024036, 1e-6, "Ebbinghaus'un değerleriyle SSD"); }
abs(K.aic(0.00285, 7, 2), -28.8, 0.05, "AIC biçimi Murre Tablo 5"); abs(K.aic(0.00469, 7, 4), -21.3, 0.05, "AIC dört parametre");
{ const r = K.nnls2([1, 0, 1], [0, 1, 1], [2, 3, 5]); abs(r.m1, 2, 1e-12, "nnls m1"); abs(r.m2, 3, 1e-12, "nnls m2"); const z = K.nnls2([1, 1], [1, 2], [1, -5]); ok(z.m1 >= 0 && z.m2 >= 0, "nnls negatif değil"); }

/* ── 2. Seri konum ── */
ok(new Set(K.WORDS).size === K.WORDS.length && K.WORDS.length >= 100, "sözcük havuzu tekil");
{ const long = K.WORDS.filter((w) => w.length >= 5); let bad = []; for (let i = 0; i < long.length; i++) for (let j = i + 1; j < long.length; j++) if (lev(long[i], long[j]) <= 1) bad.push(long[i] + "/" + long[j]); assert.deepEqual(bad, [], "havuzda bir harf farklı iki uzun sözcük yok"); checks++; }
abs(K.editDist("kelebek", "kelbeek"), 1, 0, "komşu yer değiştirme"); abs(K.editDist("kitap", "kitap"), 0, 0, "eş"); abs(K.editDist("kedi", "kediler"), 3, 0, "ekleme");
ok(K.normWord(" KEDİ ") === "kedi" && K.normWord("IŞIK") === "ışık" && K.normWord("rüzgar") === K.normWord("rüzgâr"), "Türkçe küçük harf ve şapka");
{ const list = ["kalem", "kale", "kelebek", "fil"]; ok(K.matchWord("kale", list) === 1, "tam eşleşme"); ok(K.matchWord("klebek", list) === 2, "bir harf eksik"); ok(K.matchWord("fol", list) === -1, "kısa sözcükte hata kabul edilmez"); ok(K.matchWord("", list) === -1, "boş"); ok(K.matchWord("kale", ["kalem", "fil"]) === -1, "havuzdaki başka sözcük yakın eşleşmeye sayılmaz"); }
{ const list = K.makeList(12, 1); ok(new Set(list).size === 12 && JSON.stringify(list) === JSON.stringify(K.makeList(12, 1)), "liste tekil ve tohumla belirli"); ok(JSON.stringify(list) !== JSON.stringify(K.makeList(12, 2)), "tohum değişir");
  const r = K.scoreRecall(list, [list[0], list[0].toUpperCase(), "uydurma", list[11]]); ok(r.n === 2 && r.intrusions === 1 && r.out[1].dup, "puanlama, tekrar ve uydurma"); }
{ const c = K.serialCurve([{ hits: [true, false, true] }, { hits: [true, true, false] }, { hits: [true] }], 3); ok(c.n === 2, "uzunluğa göre süzme"); assert.deepEqual(c.p, [1, 0.5, 0.5]); checks++; }
function bufferMC(L, r, th, delay, N, seed) { const R = xrng(seed), cnt = Array(L).fill(0); for (let n = 0; n < N; n++) { const buf = [], s = Array(L).fill(0); for (let i = 0; i < L; i++) { if (buf.length === r) buf.splice(Math.floor(R() * r), 1); buf.push(i); for (const j of buf) s[j] += th / buf.length; } for (let i = 0; i < L; i++) { const p = !delay && buf.includes(i) ? 1 : 1 - Math.exp(-s[i]); if (R() < p) cnt[i]++; } } return cnt.map((c) => c / N); }
for (const [L, r, th] of [[12, 4, 0.4], [10, 2, 0.8], [15, 6, 0.2]]) for (const delay of [false, true]) { const ex = K.bufferModel(L, r, th, delay), mc = bufferMC(L, r, th, delay, 120000, 3); ex.forEach((v, i) => abs(v, mc[i], 0.008, `tampon L=${L} r=${r} ${delay ? "gecikmeli" : "hemen"} konum ${i + 1}`)); }
{ const imm = K.bufferModel(12, 4, 0.4, false), del = K.bufferModel(12, 4, 0.4, true); abs(imm[11], 1, 1e-12, "son sözcük tamponda"); const a = K.SPLIT(imm), b = K.SPLIT(del); ok(a[2] > a[1] && a[0] > a[1], "U biçimi"); ok(b[2] < a[2] - 0.5 && Math.abs(b[0] - a[0]) < 0.05, "gecikme yeniliği siler, önceliği bırakır");
  abs(a[2], 0.798, 0.001, "model son 3 = %80"); abs(b[2], 0.153, 0.001, "gecikmeli son 3 = %15"); abs(a[0], 0.536, 0.001, "ilk 3 = %54"); }

/* ── 3. Uzam ve öbekleme ── */
for (let s = 1; s <= 200; s++) for (const kind of ["digits", "letters"]) { const q = K.makeSeq(7, kind, s); if (q.length !== 7 || /(.)\1/.test(q) || ![...q].every((c) => (kind === "digits" ? K.DIGITS : K.CONS).includes(c))) assert.fail(`dizi ${q}`); }
checks++;
ok(K.cleanSeq(" 3 5-9 ") === "359" && K.cleanSeq("thy trt") === "THYTRT", "yazılan dizinin temizlenmesi");
{ const run = (answers) => { let st = K.spanInit(); for (const a of answers) { if (st.done) break; st = K.spanStep(st, a); } return st; };
  const A = run([true, false, true, true, false, false]); ok(A.done && A.best === 4 && A.log.length === 6, "uzam 4: 3 (1/2), 4 (2/2), 5 (0/2)");
  const B = run([false, false]); ok(B.done && B.best === 0, "ilk uzunlukta iki yanlış");
  const C = run(Array(40).fill(true)); ok(C.done && C.best === 12 && C.log.length === 20, "en çok 12");
  const D = run([false, true, false, true, false, false]); ok(D.best === 4, "ikinci denemede doğru da yeter"); ok(Object.isFrozen(A), "durum değişmez"); }
for (let s = 1; s <= 100; s++) { const a = K.chunkSeq(s, true), b = K.chunkSeq(s, false); if (a.letters !== a.groups.join("") || a.letters.length !== 12 || [...a.letters].sort().join("") !== [...b.letters].sort().join("") || K.CHUNKS.some((c) => b.letters.includes(c))) assert.fail(`öbek ${s}`); }
checks++;
ok(K.posCorrect("THYTRTPTTABD", "thy trt ptt abc") === 11 && K.posCorrect("ABC", "") === 0, "konumda doğru harf");
assert.deepEqual(K.EBB_SERIES.map((e) => [e.n, e.rep]), [[7, 1], [12, 16.6], [16, 30], [24, 44], [36, 55]]); checks++;

/* ── 4. Aralıklı tekrar ── */
const P0 = { S0: 1, G: 2, d: 0.5 };
abs(K.retention(0, 3, 0.7), 1, 0, "R(0) = 1"); abs(K.retention(3, 3, 0.5), Math.SQRT1_2, 1e-15, "R(S) = 2^(−d)");
for (const [g, D] of [[0, 35], [3, 7], [10, 70], [40, 350]]) { // iki dallı beklenen değer, ayrı Monte Carlo ile
  const R = xrng(17); let hit = 0; const N = 200000; for (let i = 0; i < N; i++) { const rec = R() < (1 + g / P0.S0) ** -P0.d; const S = rec ? P0.S0 + P0.G * g : P0.S0; if (R() < (1 + D / S) ** -P0.d) hit++; }
  abs(K.twoSession(g, D, P0), hit / N, 0.004, `iki oturum MC g=${g} D=${D}`);
}
const opt = {}; for (const D of [7, 35, 70, 350]) { const O = K.optimalGap(D, P0); let bg = 0, bv = -1; for (let g = 0; g <= 4 * D; g += 0.005) { const v = K.twoSession(g, D, P0); if (v > bv) { bv = v; bg = g; } } abs(O.g, bg, 0.02 + 0.002 * D, `en iyi boşluk D=${D}`); abs(O.P, bv, 1e-6, `en iyi hatırlama D=${D}`); opt[D] = O.g; }
ok(opt[7] < opt[35] && opt[35] < opt[70] && opt[70] < opt[350], "en iyi boşluk gecikmeyle büyür");
ok(opt[7] / 7 > opt[35] / 35 && opt[35] / 35 > opt[350] / 350, "oranı küçülür");
ok(opt[7] / 7 > 0.2 && opt[350] / 350 < 0.1, "varsayılan model: 1 haftada %20'nin, 50 haftada %10'un altında (Cepeda ve ark. yönü)");
abs(K.twoSession(7, 35, P0), 0.30139, 2e-5, "varsayılan %30,1"); abs(opt[35], 8.096, 0.01, "varsayılan en iyi 8,1 gün"); abs(K.twoSession(0, 35, P0), 1 / 6, 1e-12, "toplu tekrar = R(35; S₀) = 1/6");
function leitnerRef(o, N, seed) { // ayrı yazılmış: N kart, sfc32
  const R = xrng(seed), cards = Array.from({ length: N }, () => ({ S: o.S0, last: 0, box: 0 })); let rev = 0;
  for (let day = 1; day <= o.days; day++) for (const c of cards) { const due = o.mode === "leitner" ? day % o.intervals[c.box] === 0 : o.mode === "daily" || day === o.days; if (!due) continue; rev++; const g = day - c.last; if (R() < (1 + g / c.S) ** -o.d) { c.S += o.G * g; c.box = Math.min(c.box + 1, 2); } else { c.S = o.S0; c.box = 0; } c.last = day; }
  const T = o.days + o.test; return { perCard: rev / N, final: cards.reduce((s, c) => s + (1 + (T - c.last) / c.S) ** -o.d, 0) / N };
}
for (const mode of ["leitner", "daily", "cram"]) {
  const o = { days: 30, test: 30, intervals: [1, 3, 5], mode, ...P0 }; const ref = leitnerRef(o, 40000, 5);
  let pc = 0, fin = 0; for (let s = 1; s <= 200; s++) { const r = K.leitnerSim({ cards: 40, seed: s, ...o }); pc += r.perCard; fin += r.final; }
  abs(fin / 200, ref.final, 0.01, `Leitner ${mode} sınav`); abs(pc / 200, ref.perCard, 0.15, `Leitner ${mode} tekrar sayısı`);
}
{ const L = K.leitnerSim({ seed: 1, ...P0 }); abs(L.final, 0.7128, 5e-4, "varsayılan Leitner %71,3"); abs(L.perCard, 10.125, 1e-9, "10,1 tekrar"); ok(L.curve.length === 61, "eğri 0–60. gün"); const D = K.leitnerSim({ seed: 1, mode: "daily", ...P0 }); ok(D.perCard === 30, "her gün 30 tekrar"); const C = K.leitnerSim({ seed: 1, mode: "cram", ...P0 }); ok(C.perCard === 1, "son gün 1 tekrar"); let cf = 0; for (let s = 1; s <= 400; s++) cf += K.leitnerSim({ seed: s, mode: "cram", ...P0 }).final; const r30 = 31 ** -0.5; abs(cf / 400, r30 * (1 + 30 / 61) ** -0.5 + (1 - r30) * r30, 0.006, "son gün: iki dallı kapalı biçim"); }

/* ── 5. Yanlış anılar ── */
{ const all = K.DRM_LISTS.flatMap((l) => l.words), lures = K.DRM_LISTS.map((l) => l.lure);
  ok(K.DRM_LISTS.length === 6 && K.DRM_LISTS.every((l) => l.words.length === 12), "6 liste × 12"); ok(new Set(all).size === 72, "liste sözcükleri tekil");
  ok(lures.every((x) => !all.includes(x)), "kritik sözcük hiçbir listede yok"); ok(!all.concat(lures).some((w) => K.WORDS.includes(w)), "serbest hatırlama havuzuyla çakışma yok");
  for (const n of [2, 4]) for (let s = 1; s <= 50; s++) { const p = K.drmPlan(s, n), c = (ty) => p.test.filter((x) => x.type === ty).length; if (p.test.length !== 3 * n + 2 * (6 - n) || c("crit") !== n || c("ctrl") !== 6 - n || c("studied") !== 2 * n || p.test.some((x) => x.type === "studied" && !p.studied.includes(x.list))) assert.fail(`plan ${s}`); }
  checks++;
  const p = K.drmPlan(1, 4), resp = p.test.map((x) => ({ yes: x.type !== "new", rk: x.type === "crit" ? "R" : "K" })); const sc = K.drmScore(p, resp);
  ok(sc.studied.p === 1 && sc.crit.p === 1 && sc.crit.rem === 4 && sc.ctrl.p === 1 && sc.fresh.p === 0, "puanlama"); }
{ const m1 = html.match(/<input id="fgP1"[^>]*min="([^"]+)"/)[1], m2 = html.match(/<input id="fgP2"[^>]*min="([^"]+)"/)[1]; ok(m1 === "0.2" && m2 === "0.3", "fgP1/fgP2 işaretleme alt sınırları çalışma zamanıyla aynı (0,2 / 0,3)"); }
{ let lw = 0, dw = 0; for (let s = 1; s <= 500; s++) { lw += K.leitnerSim({ seed: s, ...P0 }).final; dw += K.leitnerSim({ seed: s, mode: "daily", ...P0 }).final; } abs(lw / 500, 0.70, 0.01, "500 tohum Leitner ≈ %70"); abs(dw / 500, 0.74, 0.01, "500 tohum her gün ≈ %74"); abs(K.leitnerSim({ seed: 2, ...P0 }).final, 0.7293, 5e-4, "2. tohum Leitner %72,9"); }
ok(K.LP.every((v, i) => i === 0 || v.mph < K.LP[i - 1].mph) && K.LP[0].en === "smashed", "Loftus ve Palmer sırası");

console.log(`G bellek: ${checks} çekirdek kontrolü PASS`);

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
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { const v = await read(id); assert(v.includes(s), `${width}px ${id}: "${v}" içinde "${s}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); e.dispatchEvent(new Event("change", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const reset = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); };
      const tick = (ms) => page.clock.runFor(ms);
      const noOverflow = async (label) => ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${label} taşma yok`);
      const inked = (id) => page.locator("#" + id).evaluate((c) => { const g = c.getContext("2d"), d = g.getImageData(0, 0, c.width, c.height).data; const r0 = d[0], g0 = d[1], b0 = d[2]; let n = 0; for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - r0) + Math.abs(d[i + 1] - g0) + Math.abs(d[i + 2] - b0) > 40) n++; return n / (d.length / 4); });
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuval etiketleri");
      ok(await page.evaluate(() => !/[̀-ͯ]/.test(document.querySelector(".app-content").textContent)), "birleşik işaret yok");
      // 1 · unutma eğrisi
      await has("fgSse", "0,00240"); await has("fgBest", "0,00218"); await has("fgBestD", "k = 1,80, c = 1,21"); await has("fgR2", "−30,6"); await has("fgSseD", "1,10 katı");
      ok((await page.locator("#fgTable tr").count()) === 7, "7 satır"); await has("fgTable", "%58,2 ± 1,0"); await has("fgModels", "(en küçük)"); await has("fgStatus", "1,84");
      ok((await inked("fgChart")) > 0.004, "unutma grafiği çizili");
      await range("fgP1", 2.5); await has("fgP1Out", "2,50"); await page.click("#fgFit"); await has("fgP1Out", "1,80"); await has("fgSse", "0,0021"); await has("fgSseD", "1,00 katı");
      await page.click("#fgEbb"); await has("fgSse", "0,00240");
      await sel("fgModel", "power"); await has("fgBest", "0,00284"); await has("fgP2Lab", "üs a"); await has("fgP2Out", "0,130"); ok(await page.locator("#fgEbb").isDisabled(), "Ebbinghaus düğmesi yalnız 1885 modelinde");
      await sel("fgModel", "exp"); await has("fgStatus", "katıdır"); await has("fgBest", "0,05801");
      await sel("fgModel", "exp2"); ok(await page.locator("#fgP1Box").isHidden(), "dört parametrede kaydırıcı yok"); await has("fgBest", "0,00469");
      await sel("fgData", "dros"); await has("fgStatus", "%13,7"); await sel("fgData", "mack"); await sel("fgModel", "log1885"); await has("fgBest", "0,00976");
      await sel("fgAxis", "lin"); ok((await inked("fgChart")) > 0.004, "doğrusal eksen çizili");
      await range("svR", 700); await has("svQ", "negatif"); await range("svR", 300); await has("svQ", "%50,0");
      await noOverflow("unutma");
      await reset(); await has("fgSse", "0,00240"); await has("fgTitle", "Ebbinghaus"); await has("svQ", "%33,3");
      // sekme klavyesi
      await page.locator("#tab-fg").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-fm").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-sp").getAttribute("aria-selected")) === "true", "ArrowRight"); ok(await page.locator("#panel-fg").isHidden(), "tek panel");
      // 2 · seri konum
      await has("spMod", "%80 · %15"); await has("spImm", "—"); await has("spStatus", "%54"); ok((await inked("spChart")) > 0.004, "seri konum grafiği");
      await sel("spLen", "10"); await sel("spRate", "1000");
      await page.click("#spStart"); ok(await page.locator("#spInput").isDisabled(), "gösterim sırasında yazılamaz");
      const list1 = await page.evaluate(() => MemoryLab.makeList(10, 1));
      await tick(650); await has("spStage", list1[0]); await tick(10 * 1000);
      ok(await page.locator("#spInput").isEnabled(), "hatırlama açık");
      for (const w of [list1[0], list1[1], list1[9], "olmayan"]) { await page.fill("#spInput", w); await page.press("#spInput", "Enter"); }
      await page.fill("#spInput", list1[8].toUpperCase()); await page.click("#spDone");
      await has("spStage", "4 / 10"); await has("spImm", "67 · 0 · 67"); await has("spStatus", "1 yazdığın listede yoktu");
      ok((await page.locator("#spChips li.is-hit").count()) === 4, "işaretli sözcükler");
      await sel("spDelay", "10"); await page.click("#spStart"); const list2 = await page.evaluate(() => MemoryLab.makeList(10, 2));
      await tick(600 + 10 * 1000 + 100); await has("spStage", "geriye"); await tick(10 * 1000);
      await page.fill("#spInput", list2[0]); await page.click("#spDone"); await has("spDel", "33 · 0 · 0"); await has("spStatus", "Gecikme, beklendiği gibi");
      await range("spR", 2); await has("spModD", "r = 2"); await page.click("#spClear"); await has("spImm", "—");
      await page.click("#spStart"); await tick(1500); await reset(); await has("spStage", "iptal"); ok(await page.locator("#spStart").isEnabled(), "iptal sonrası başlatılabilir"); await has("spMod", "%80 · %15");
      await noOverflow("seri konum");
      // 3 · çalışma belleği
      await page.click("#tab-wm"); ok((await inked("wmEbb")) > 0.003, "Ebbinghaus dizi grafiği");
      await page.click("#wmStart");
      const answers = [true, false, true, true, false, false]; let len = 3, k = 0, okc = 0;
      for (let i = 0; i < answers.length; i++) {
        const seq = await page.evaluate(([n, s]) => MemoryLab.makeSeq(n, "digits", s), [len, i + 1]);
        await has("wmProg", `Uzunluk ${len}`);
        await tick(700 + len * 1000 + 50); await page.fill("#wmInput", answers[i] ? seq.split("").join(" ") : "0"); await page.press("#wmInput", "Enter");
        k++; if (answers[i]) okc++; if (k === 2) { if (okc) { len++; k = 0; okc = 0; } }
        if (i < answers.length - 1) await tick(1450);
      }
      await has("wmSpan", "4"); await has("wmProg", "Görev bitti"); await has("wmStatus", "uzamın 4");
      await page.click("#chStart"); const c1 = await page.evaluate(() => MemoryLab.chunkSeq(1, true).letters); await tick(700 + 12 * 1000 + 50); await page.fill("#chInput", c1.toLowerCase()); await page.press("#chInput", "Enter"); await has("chChunk", "12,0 / 12");
      await page.click("#chStart"); await tick(700 + 12 * 1000 + 50); await page.click("#chEnter"); await has("chRand", "0,0 / 12"); await has("wmStatus", "+12,0 harf");
      ok((await page.locator("#chTable tr").count()) === 2, "öbek tablosu");
      await page.click("#wmClear"); await has("wmSpan", "—"); await has("chChunk", "—");
      await noOverflow("çalışma belleği");
      // 4 · aralıklı tekrar
      await page.click("#tab-rs");
      await has("rsP", "%30,1"); await has("rsOpt", "8,1 gün"); await has("rsOptD", "gecikmeye oranı %23,1"); await page.click("#rsOptBtn"); await has("rsGapOut", "8,0 gün"); await has("rsP", "%30,2"); await range("rsGap", 7); await has("rsOptD", "%23,1"); await has("rsMass", "%16,7"); await has("lnTable", "%71,3"); await has("lnTable", "10,1"); await has("lnTable", "30,0");
      for (const id of ["rsChart", "rsRidge", "lnChart"]) ok((await inked(id)) > 0.004, `${id} çizili`);
      await sel("rsD", "350"); await has("rsOpt", "30,6 gün"); await has("rsOptD", "%8,7"); await page.click("#rsOptBtn"); await has("rsGapOut", "30,5 gün");
      await sel("rsD", "7"); await has("rsOptD", "%51,2"); await range("rsGap", 0); await has("rsGapOut", "toplu");
      await page.fill("#lnSeed", "2"); await page.locator("#lnSeed").dispatchEvent("change"); await has("lnTable", "%72,9"); await has("lnTable", "9,9");
      await sel("lnTest", "7"); await page.fill("#lnSeed", "2"); await page.locator("#lnSeed").dispatchEvent("change"); ok((await page.locator("#lnTable tr").count()) === 3, "Leitner tablosu");
      await reset(); await has("rsP", "%30,1"); await has("lnTable", "%71,3");
      await noOverflow("aralıklı tekrar");
      // 5 · yanlış anılar
      await page.click("#tab-fm"); await has("fmCrit", "—"); ok((await inked("lpChart")) > 0.002, "Loftus–Palmer yer tutucu");
      await sel("lpGuess", "smashed"); await page.click("#lpReveal"); await has("lpOut", "Doğru"); await has("lpCap", "45 öğrenci"); await sel("lpGuess", "hit"); await has("lpOut", "yaklaşık 34");
      await sel("fmN", "2"); await sel("fmRate", "1000"); await page.click("#fmStart"); ok(await page.locator("#fmYes").isDisabled(), "gösterimde yanıt yok");
      const plan = await page.evaluate(() => MemoryLab.drmPlan(1, 2));
      await tick(300 + 2 * (1500 + 12 * 1000) + 500); await has("fmProg", "Sınav: 1 / 14");
      for (const item of plan.test) { await has("fmStage", item.word); if (item.type === "crit") { await page.click("#fmYes"); await page.click("#fmRem"); } else await page.click("#fmNo"); }
      await has("fmCrit", "%100"); await has("fmCritD", "2 tanesi \"hatırlıyorum\""); await has("fmHit", "%0"); await has("fmNew", "%0"); await has("fmStatus", "kritik sözcüğe");
      ok((await page.locator("#fmTable tr").count()) === 14, "sınav tablosu"); await has("fmLists", "(gösterildi)"); await has("fmLists", "nehir");
      await page.click("#fmClear"); await has("fmCrit", "—"); ok(await page.locator("#fmTableEmpty").isVisible(), "temizlendi");
      await noOverflow("yanlış anılar");
      ok(await page.evaluate(() => !Object.keys(localStorage).some((k) => !/^acelya-/.test(k))), "yanıt saklanmıyor");
      ok(await page.evaluate(() => Object.keys(localStorage).every((k) => !/bellek|memory|span|drm/i.test(k))), "depoda deney anahtarı yok");
      await page.waitForSelector(".digest", { state: "attached", timeout: 15000 }); await page.locator(".digest").first().scrollIntoViewIfNeeded();
      ok(await page.locator(".digest").first().isVisible(), "Keşif Defteri görünür");
      assert.deepEqual(sent, [], "ağ isteği yok"); checks++;
      ok(await page.evaluate(() => Object.isFrozen(MemoryLab) && !Object.getOwnPropertyDescriptor(window, "MemoryLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G bellek: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
