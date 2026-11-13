// G · psikiyatri-tarihi-ve-tani-sistemleri.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// kappa için tabloyu tek tek değerlendirme çiftlerine açıp sayma, Wikipedia'nın 2 × 2 kapalı biçimi ve yayımlanmış
// örnek değerleri (0,4; 0,1304; 0,2593); en büyük kappa için aynı satır/sütun toplamlı bütün tabloların kaba kuvvet
// taraması; iki değerlendirici modeli ve iki değişkenli normal için bağımsız bir üreteçle (64 bit LCG) Monte Carlo;
// normal dağılım için yoğunluğun Simpson tümlevi ve bilinen değerler; iki değişkenli normalin ρ ile kapalı biçimi
// (h = k = 0); tarama için olabilirlik oranlı Bayes (oran) biçimi ve tam sayılı bir nüfusta sayım; yaygınlık için
// karışım yoğunluğunun tümlevi; yayımlanmış sayılar için kaynaklardan ayrıca yazılmış tablolar.
// Kullanım: node scripts/check-g-psikiyatri-tarihi-ve-tani-sistemleri.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "psikiyatri-tarihi-ve-tani-sistemleri";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.PsyDxLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
const throws = (f, label) => { let t = false; try { f(); } catch (e) { t = e instanceof RangeError; } ok(t, label); };

/* ── Kabuk ve üçüncü halka kuralları ── */
ok(Object.isFrozen(K) && Object.isFrozen(K.EVENTS) && Object.isFrozen(K.EVENTS[0]) && Object.isFrozen(K.SCHEMES.lk.bands), "çekirdek dondurulmuş");
ok(!/<script src="https?:/.test(html) && !/cdn\./.test(html), "dış betik ya da CDN yok");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Psikiyatri Tarihi ve Tanı Sistemleri: ") && title.length <= 80, "başlık biçimi ve uzunluğu: " + title.length);
ok(/<body class="app-page" data-page="psikiyatri-tarihi-ve-tani-sistemleri">/.test(html) && /<meta name="description" content="[^"]{60,}"/.test(html), "kabuk ve açıklama");
ok(/<link rel="stylesheet" href="shared\/theme\.css">/.test(html) && /<script src="shared\/app\.js"><\/script>/.test(html), "theme.css ve app.js");
ok(/viewport-fit=cover/.test(html) && /<html lang="tr" class="app-root">/.test(html), "viewport ve kök");
ok(!/[̀-ͯ⃗]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(html), "emoji yok");
ok(!/body\s*\{[^}]*overflow\s*:\s*hidden/.test(html), "body overflow:hidden yok");
const script = html.split("<script>")[1];
ok(!/localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|sendBeacon/.test(script), "hiçbir şey saklanmıyor ve gönderilmiyor");
for (const l of ["bayes-olasilik.html", "hipotez-testi-ve-guven-araligi.html", "karar-ve-bilissel-yanliliklar.html", "sinir-hucresi-ve-aksiyon-potansiyeli.html"]) ok(html.includes(`href="${l}"`), "bağlantı " + l);
ok(/kimseye tanı koymaz/.test(html) && /tedavi ya da ilaç önermez/.test(html) && /bir sağlık profesyoneline başvur/.test(html) && /112'yi ara/.test(html), "sakin yardım notu");
ok(/saglik\.gov\.tr/.test(html), "112 resmi sayfadan doğrulandı");
ok((html.match(/kurgusal/g) || []).length >= 10 && /sentetiktir/.test(html), "alıştırma verileri kurgusal ve sentetik diye işaretli");
ok(!/(sende|sizde) .{0,30}(var mı|olabilir)|tanınız|testi çöz|kendini tara/i.test(html), "okura yönelik tanı ya da tarama dili yok");
ok(!/\b(deli|delilik|akıl hastası)\b/i.test(html.replace(/Deli Baba/g, "")), "damgalayıcı terim yok");
ok(/13 Kasım 2026/.test(html), "kaynak açılış tarihi");
for (const id of ["tolun", "edirne", "pinel", "kraep", "dsm3", "icd11", "dsm5tr"]) ok(K.EVENTS.some((e) => e.id === id), "olay " + id);

/* ── Tarihsel veri: kaynaklardan ayrıca yazılmış tablolar ── */
const EDS = [["DSM-I", 1952, 106, 130], ["DSM-II", 1968, 182, 134], ["DSM-III", 1980, 265, 494], ["DSM-III-R", 1987, 292, 567], ["DSM-IV", 1994, 410, 886]];
EDS.forEach(([ed, y, d, p], i) => { const e = K.DSM_EDITIONS[i]; ok(e.ed === ed && e.year === y && e.dis === d && e.pages === p, "DSM baskısı " + ed); });
const FLD = { d3j: 0.78, d3s: 0.66, d3aj: 0.61, d3as: 0.54, d5ncd: 0.78, d5mdd: 0.28, chA: 0.80, chT: 0.47 };
ok(K.FIELD.length === 8 && K.FIELD.every((f) => FLD[f.id] === f.k), "bildirilen κ değerleri");
const B5 = K.DSM5_BANDS; ok(B5.veryGood === 5 && B5.good === 9 && B5.questionable === 6 && B5.unacceptable === 3 && B5.total === 23 && B5.adult + B5.child === 23, "DSM-5 aralık dağılımı");
ok(K.EVENTS.length === 32 && new Set(K.EVENTS.map((e) => e.id)).size === 32, "32 benzersiz olay");
ok(K.EVENTS.every((e, i) => i === 0 || e.year >= K.EVENTS[i - 1].year), "olaylar kronolojik");
ok(K.EVENTS.every((e) => K.STRANDS[e.strand] && e.src && e.text.length > 40 && e.label.startsWith(String(e.year))), "her olayın dalı, kaynağı ve etiketi var");
const yrs = { dsm1: 1952, dsm2: 1968, dsm3: 1980, dsm3r: 1987, dsm4: 1994, dsm4tr: 2000, dsm5: 2013, dsm5tr: 2022, icd6: 1948, icd10: 1990, icd11: 2019, rosenhan: 1973, feighner: 1972, rdc: 1978, cohen: 1960, tuke: 1796, pinel: 1793, edirne: 1484, tolun: 872, rdoc: 2009, hitop: 2017, chm: 2015, cahalan: 2019, bleuler: 1908, kraep: 1893 };
for (const [id, y] of Object.entries(yrs)) ok(K.EVENTS.find((e) => e.id === id).year === y, "yıl " + id);

/* ── Kappa: değerlendirme çiftlerini sayarak bağımsız başvuru ── */
function kappaPairs(M) {
  const pairs = []; M.forEach((r, i) => r.forEach((v, j) => { for (let t = 0; t < v; t++) pairs.push([i, j]); }));
  const n = pairs.length, k = M.length; let agree = 0; const c1 = new Array(k).fill(0), c2 = new Array(k).fill(0);
  for (const [a, b] of pairs) { if (a === b) agree++; c1[a]++; c2[b]++; }
  let pe = 0; for (let i = 0; i < k; i++) pe += (c1[i] / n) * (c2[i] / n);
  return { po: agree / n, pe, kappa: (agree / n - pe) / (1 - pe) };
}
const bin = (a, b, c, d) => (2 * (a * d - b * c)) / ((a + b) * (b + d) + (a + c) * (c + d)); // Wikipedia ikili biçim
near(K.kappa([[20, 5], [10, 15]]).kappa, 0.4, 1e-12, "Wikipedia örneği 0,4");
abs(K.kappa([[45, 15], [25, 15]]).kappa, 0.1304, 5e-5, "aynı %60 (1)"); abs(K.kappa([[25, 35], [5, 35]]).kappa, 0.2593, 5e-5, "aynı %60 (2)");
near(K.kappa([[45, 15], [25, 15]]).pe, 0.54, 1e-12); near(K.kappa([[25, 35], [5, 35]]).pe, 0.46, 1e-12, "p_e değerleri");
{
  let s = 12345n; const r = () => { s = (s * 6364136223846793005n + 1442695040888963407n) & ((1n << 64n) - 1n); return Number(s >> 11n) / 2 ** 53; };
  for (let t = 0; t < 300; t++) {
    const k = 2 + Math.floor(r() * 3), M = Array.from({ length: k }, () => Array.from({ length: k }, () => Math.floor(r() * (r() < 0.3 ? 3 : 30))));
    if (M.flat().reduce((a, b) => a + b, 0) === 0) M[0][0] = 1;
    const A = K.kappa(M), B = kappaPairs(M);
    if (B.pe >= 1 - 1e-12) { ok(A.kappa === null, "tanımsız κ"); continue; }
    near(A.po, B.po, 1e-12, "p_o"); near(A.pe, B.pe, 1e-12, "p_e"); near(A.kappa, B.kappa, 1e-10, "κ");
    if (k === 2) near(A.kappa, bin(M[0][0], M[0][1], M[1][0], M[1][1]), 1e-10, "ikili biçim");
    // kategorilerin yeniden adlandırılması κ'yı değiştirmez
    const perm = [...Array(k).keys()].reverse(), P = perm.map((i) => perm.map((j) => M[i][j]));
    near(K.kappa(P).kappa, A.kappa, 1e-10, "permütasyon");
    ok(A.kappa <= A.kmax + 1e-12, "κ ≤ κ_en büyük");
  }
}
// En büyük κ: aynı toplamlı bütün 2 × 2 tablolar
for (const M of [[[20, 5], [10, 15]], [[45, 15], [25, 15]], [[25, 35], [5, 35]], [[1, 4], [4, 91]], [[3, 9], [1, 7]]]) {
  const r1 = M[0][0] + M[0][1], c1 = M[0][0] + M[1][0], n = M.flat().reduce((a, b) => a + b, 0);
  let best = -Infinity;
  for (let a = Math.max(0, r1 + c1 - n); a <= Math.min(r1, c1); a++) best = Math.max(best, K.kappa([[a, r1 - a], [c1 - a, n - r1 - c1 + a]]).kappa);
  near(K.kappa(M).kmax, best, 1e-12, "en büyük κ kaba kuvvet");
}
near(K.kappa([[20, 5], [10, 15]]).kmax, 0.8, 1e-12, "örneğin en büyük κ'sı 0,8");
ok(K.kappa([[10, 0], [0, 0]]).kappa === null && K.kappa([[0, 0], [0, 0]]).n === 0, "tanımsız durumlar");
near(K.kappa([[7, 0, 0], [0, 4, 0], [0, 0, 9]]).kappa, 1, 1e-12, "tam uyum");
near(K.kappa([[25, 25], [25, 25]]).kappa, 0, 1e-12, "yalnız şans");
ok(K.kappa([[0, 5], [5, 0]]).kappa === -1, "tam karşıtlık −1");
throws(() => K.kappa([[1, 2, 3], [4, 5, 6]]), "kare olmayan tablo"); throws(() => K.kappa([[1, -1], [0, 2]]), "negatif hücre");
// Yorumlama ölçekleri (Wikipedia: Landis–Koch, Fleiss; Regier ve ark. 2013)
const LK = [[-0.1, "uyum yok"], [0, "çok hafif"], [0.2, "çok hafif"], [0.21, "makul"], [0.4, "makul"], [0.41, "orta"], [0.6, "orta"], [0.61, "önemli ölçüde"], [0.8, "önemli ölçüde"], [0.81, "neredeyse tam"], [1, "neredeyse tam"]];
const FL = [[0.39, "zayıf"], [0.4, "orta–iyi"], [0.75, "orta–iyi"], [0.76, "mükemmel"]];
const D5 = [[0.19, "kabul edilemez"], [0.2, "şüpheli"], [0.39, "şüpheli"], [0.4, "iyi"], [0.59, "iyi"], [0.6, "çok iyi"], [0.79, "çok iyi"], [0.8, "0,80 ve üstü (özette ad verilmez)"]];
for (const [x, n] of LK) ok(K.band(x, "lk") === n, "Landis–Koch " + x); for (const [x, n] of FL) ok(K.band(x, "fl") === n, "Fleiss " + x); for (const [x, n] of D5) ok(K.band(x, "d5") === n, "DSM-5 " + x);
ok(K.band(null, "lk") === null, "tanımsız κ'nın adı yok"); throws(() => K.band(0.5, "xx"), "bilinmeyen ölçek");

/* ── İki kurgusal değerlendirici: Monte Carlo (LCG) ── */
function lcg(seed) { let s = BigInt(seed); return () => { s = (s * 6364136223846793005n + 1442695040888963407n) & ((1n << 64n) - 1n); return Number(s >> 11n) / 2 ** 53; }; }
for (const [p, se, sp] of [[0.2, 0.85, 0.9], [0.05, 0.9, 0.95], [0.5, 0.7, 0.6]]) {
  const E = K.twoRaterExpected(p, se, sp), r = lcg(99), n = 400000, C = [[0, 0], [0, 0]];
  near(E.flat().reduce((a, b) => a + b, 0), 1, 1e-12, "olasılıklar toplamı");
  for (let i = 0; i < n; i++) { const h = r() < p, a = h ? r() < se : r() >= sp, b = h ? r() < se : r() >= sp; C[a ? 0 : 1][b ? 0 : 1]++; }
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) abs(C[i][j] / n, E[i][j], 0.004, "Monte Carlo hücre");
  abs(K.kappa(C).kappa, K.kappa(E).kappa, 0.01, "Monte Carlo κ");
}
near(K.kappa(K.twoRaterExpected(0.2, 0.85, 0.9)).kappa, 0.48, 1e-12, "varsayılan beklenen κ");
{ const M = K.twoRaterSample(200, 0.2, 0.85, 0.9, 1); ok(M.flat().reduce((a, b) => a + b, 0) === 200, "örneklem boyutu"); ok(JSON.stringify(M) === JSON.stringify(K.twoRaterSample(200, 0.2, 0.85, 0.9, 1)), "tohum tekrarlanabilir"); }
{ const M = K.twoRaterSample(100000, 0.2, 0.85, 0.9, 7); abs(K.kappa(M).kappa, 0.48, 0.012, "büyük örneklem κ"); }
// aynı değerlendiriciler, düşen yaygınlık → düşen κ
{ let prev = Infinity; for (const p of [0.5, 0.3, 0.15, 0.05, 0.02]) { const k = K.kappa(K.twoRaterExpected(p, 0.85, 0.9)).kappa; ok(k < prev, "κ yaygınlıkla düşer " + p); prev = k; } }

/* ── Tarama ── */
for (const [p, se, sp] of [[0.02, 0.9, 0.95], [0.01, 0.9, 0.95], [0.3, 0.9, 0.95], [0.001, 0.995, 0.5], [0.5, 1, 1]]) {
  const r = K.screen(p, se, sp, 1);
  const odds = (p / (1 - p)) * (sp < 1 ? se / (1 - sp) : Infinity), ppv = odds === Infinity ? 1 : odds / (1 + odds);
  near(r.ppv, ppv, 1e-12, "PPV oran biçimi");
  const nOdds = ((1 - p) / p) * (sp / (1 - se || 1e-300)), npv = se === 1 ? 1 : nOdds / (1 + nOdds);
  near(r.npv, npv, 1e-10, "NPV oran biçimi");
}
{ // tam sayılı nüfusta sayım: 10 000 kişi, 200 hasta, 180 pozitif; 9800 sağlıklı, 490 pozitif
  const N = 10000; let tp = 0, fp = 0, fn = 0, tn = 0;
  for (let i = 0; i < N; i++) { const sick = i < 200; const pos = sick ? i < 180 : i - 200 < 490; if (sick && pos) tp++; else if (sick) fn++; else if (pos) fp++; else tn++; }
  const r = K.screen(0.02, 0.9, 0.95, N);
  abs(r.tp, tp, 1e-9); abs(r.fp, fp, 1e-9); abs(r.fn, fn, 1e-9); abs(r.tn, tn, 1e-9, "sayım");
  near(r.ppv, 180 / 670, 1e-12, "varsayılan PPV 180/670"); near(r.fpPerTp, 490 / 180, 1e-12); near(r.acc, 0.949, 1e-12); near(r.lrp, 18, 1e-12);
}
ok(K.screen(0.1, 0.9, 1, 1).lrp === Infinity && K.screen(0, 0.9, 0.9, 1).fpPerTp === null, "uç durumlar");
throws(() => K.screen(1.2, 0.9, 0.9, 1), "geçersiz yaygınlık");
{ const q = K.largestRemainder([180, 20, 490, 9310], 1000); ok(q.reduce((a, b) => a + b, 0) === 1000 && q.join() === "18,2,49,931", "en büyük kalan: " + q); }
{ const q = K.largestRemainder([1, 1, 1], 1000); ok(q.reduce((a, b) => a + b, 0) === 1000, "kalanlar dağıtıldı"); }

/* ── Normal dağılım ── */
function simpson(f, a, b, n = 20000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return (s * h) / 3; }
const pdf = (x) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
for (const z of [-3, -1.5, -0.3, 0, 0.7, 1.3416, 2.5, 4]) abs(K.normCdf(z), 0.5 + Math.sign(z) * simpson(pdf, 0, Math.abs(z)), 2e-7, "Φ(" + z + ")");
abs(K.normCdf(1.959963985), 0.975, 2e-7, "Φ(1,96)"); abs(K.normSf(0), 0.5, 2e-7, "Q(0)");
for (const rho of [-0.6, -0.2, 0.3, 0.5, 0.8, 0.95, 0.99]) abs(K.bvnUpper(0, 0, rho), 0.25 + Math.asin(rho) / (2 * Math.PI), 5e-7, "BVN(0,0," + rho + ")");
for (const [h, k] of [[1, -0.5], [2, 2]]) near(K.bvnUpper(h, k, 0), K.normSf(h) * K.normSf(k), 1e-12, "BVN ρ = 0");
{
  const r = lcg(3), n = 600000;
  for (const [h, k, rho] of [[1.2, 1.2, 0.8], [0.5, -0.3, 0.4], [1.8, 1.8, 0.95]]) {
    let c = 0; for (let i = 0; i < n; i++) { const u1 = r() || 1e-300, u2 = r(), u3 = r() || 1e-300, u4 = r(); const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2), z2 = Math.sqrt(-2 * Math.log(u3)) * Math.cos(2 * Math.PI * u4); const x = z1, y = rho * z1 + Math.sqrt(1 - rho * rho) * z2; if (x > h && y > k) c++; }
    abs(K.bvnUpper(h, k, rho), c / n, 0.0025, "BVN Monte Carlo");
  }
}
throws(() => K.bvnUpper(0, 0, 1), "ρ = 1 reddedilir");

/* ── Süreklilik ve karışım ── */
for (const o of [{ model: "cont", c: 1.5, R: 0.8 }, { model: "cont", c: -0.5, R: 0.6 }, { model: "mix", c: 2, R: 0.9, pi: 0.1, d: 4 }, { model: "mix", c: 1, R: 0.7, pi: 0.3, d: 1.5 }]) {
  const m = K.contModel(o), se2 = (1 - o.R) / o.R, sd = Math.sqrt(1 + se2);
  const gs = o.model === "mix" ? [[1 - o.pi, 0], [o.pi, o.d]] : [[1, 0]];
  const dens = (x) => gs.reduce((u, [w, mu]) => u + w * pdf((x - mu) / sd) / sd, 0);
  abs(m.prev, simpson(dens, o.c, o.c + 30), 2e-7, "yaygınlık tümlevi");
  near(m.rho, o.R, 1e-12, "korelasyon = R");
  // Monte Carlo: iki ölçüm, LCG
  const r = lcg(11), n = 300000, C = [[0, 0], [0, 0]];
  const g = () => { const u = r() || 1e-300, v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  for (let i = 0; i < n; i++) { const mu = o.model === "mix" && r() < o.pi ? o.d : 0, T = mu + g(), a = T + Math.sqrt(se2) * g(), b = T + Math.sqrt(se2) * g(); C[a > o.c ? 0 : 1][b > o.c ? 0 : 1]++; }
  abs(m.kappa, K.kappa(C).kappa, 0.01, "κ Monte Carlo");
  if (o.model === "mix") { abs(m.taxCatch, K.normSf((o.c - o.d) / sd), 1e-12, "yakalanan pay"); near(m.taxShare * m.prev, o.pi * m.taxCatch, 1e-12, "pay tutarlı"); }
}
{ const m = K.contModel({ model: "cont", c: 1.5, R: 0.8 }); abs(m.prev, 0.0899, 5e-5, "varsayılan yaygınlık %9,0"); abs(m.kappa, 0.5069, 5e-4, "varsayılan κ"); }
{ const s = K.contSample({ model: "cont", c: 1.5, R: 0.8 }, 2000, 1); ok(s.x1.length === 2000 && Math.abs(s.prev - 0.0899) < 0.02 && Math.abs(s.kappa - 0.507) < 0.08, "sentetik örneklem modele yakın"); }
{ // eşik kuyruğa gittikçe κ düşer (sabit R)
  let prev = Infinity; for (const c of [0, 1, 2, 3]) { const k = K.contModel({ model: "cont", c, R: 0.8 }).kappa; ok(k < prev, "κ eşikle düşer " + c); prev = k; }
}
{ // belirgin karışımda yaygınlık geniş bir eşik aralığında grubun payına yakın; süreklilikte değil
  const o = { model: "mix", R: 0.9, pi: 0.1, d: 4 }, a = K.prevAt(o, 1.75), b = K.prevAt(o, 2.25);
  ok(a / b < 1.35 && Math.abs(K.prevAt(o, 2) - 0.1) < 0.03, "karışım düzlüğü"); const c = { model: "cont", R: 0.8 }; ok(K.prevAt(c, 1.25) / K.prevAt(c, 1.75) > 2, "süreklilikte hızlı değişim");
}
throws(() => K.contModel({ model: "cont", c: 0, R: 1 }), "R = 1 reddedilir");
console.log(`G ${SLUG}: ${checks} kalıcı çekirdek kontrolü PASS`);

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
  const fmtP = (x, d) => "%" + (100 * x).toFixed(d).replace(".", ",");
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
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      // Keşif Defteri yüklenmeli ve görünmeli (404 artık hata)
      await page.waitForSelector(".digest", { state: "attached", timeout: 15000 });
      ok((await page.locator(".digest").textContent()).includes("Aynı %60 uyum, iki farklı κ"), "Keşif Defteri içeriği");
      // sayfa metni düzeltmeleri (doğrulayıcı, 13 Kasım 2026)
      const bodyText = await page.locator("main").textContent();
      ok(bodyText.includes("ikincil bir belirti saydı") && !bodyText.includes("kötüleşmenin her hastada görülmediğini"), "Bleuler: prognoz ve ikincil bunama");
      ok(bodyText.includes("1974'teki yedinci basımında"), "DSM-II yedinci basım");
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const settle = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const pressR = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); await settle(); };
      const labels = async () => { const u = await page.evaluate(() => [...document.querySelectorAll("main input, main select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label")).map((e) => e.id)); ok(u.length === 0, "etiketsiz denetim: " + u.join(",")); };
      await labels();
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-6; })), "varsayılanlar adım ızgarasında");
      ok(await page.evaluate(() => !document.querySelector('main input[type="number"]')), "type=number yok");
      ok(await page.evaluate(() => Object.keys(localStorage).every((k) => /^acelya-(theme|sound-muted)$/.test(k) || !/psik|tani|yanit|guess/i.test(k))), "yanıt anahtarı yok");
      // 1 · Tarihçe
      await has("tlCount", "32 olay"); ok((await page.locator("#tlList .pt-ev").count()) === 32, "32 olay kartı");
      await page.click("#tlF-kur"); await has("tlCount", "4 olay"); ok((await page.locator("#tlF-kur").getAttribute("aria-pressed")) === "true", "süzgeç işaretli");
      await page.click("#tlF-gue"); ok((await page.locator('#tlList .pt-ev[data-strand="gue"]').count()) === (await page.locator("#tlList .pt-ev").count()), "yalnız güvenilirlik olayları");
      const ida = await page.locator("#hoA").getAttribute("data-id"), idb = await page.locator("#hoB").getAttribute("data-id");
      const ya = K.EVENTS.find((e) => e.id === ida).year, yb = K.EVENTS.find((e) => e.id === idb).year;
      ok(ya !== yb, "farklı yıllı çift");
      await page.click(ya < yb ? "#hoA" : "#hoB"); await has("hoRes", "Doğru."); await has("hoScore", "1 çiftten 1 doğru");
      await page.click(ya < yb ? "#hoB" : "#hoA"); await has("hoScore", "1 çiftten 1 doğru");
      await page.click("#hoNext"); ok(await page.locator("#hoRes").isHidden(), "yeni çift");
      await has("dsmStatus", "3,87 kat"); await has("dsmStatus", "106'dan 410'a"); /* ek uyumu */ await sel("dsmMetric", "pages"); await has("dsmStatus", "6,82 kat"); await sel("dsmMetric", "ppd"); await has("dsmStatus", "1,76 kat");
      await pressR(); await has("tlCount", "32 olay"); await has("hoScore", "Henüz yanıt yok"); ok((await page.locator("#dsmMetric").inputValue()) === "dis", "R sıfırlar (1)");
      // sekme klavyesi
      await page.locator("#tab-tar").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-kul").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); ok((await page.locator("#tab-tar").getAttribute("aria-selected")) === "true", "Home");
      await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-kap").getAttribute("aria-selected")) === "true", "ArrowRight");
      await settle();
      // 2 · Kappa
      await has("kKappa", "0,400"); await has("kPo", "%70,0"); await has("kPe", "%50,0"); await has("kMax", "0,800"); await has("kBand", "makul"); await has("kn", "50");
      await sel("kScheme", "d5"); await has("kBand", "iyi"); await sel("kScheme", "fl"); await has("kBand", "orta–iyi"); await sel("kScheme", "lk");
      await page.click("#kPreSame1"); await has("kKappa", "0,130"); await has("kStatus", "%60"); await page.click("#kPreSame2"); await has("kKappa", "0,259");
      await page.click("#kPreRare"); await has("kKappa", "0,158"); await has("kPo", "%92,0"); await has("kStatus", "dengesizliği");
      await page.click("#kPreChance"); await has("kKappa", "0,000");
      await page.click("#kPre3"); await has("kKappa", "0,713"); ok((await page.locator("#kK").inputValue()) === "3", "3 kategori"); await has("kPrev", "—");
      await sel("kK", "2"); await has("kKappa", "0,400");
      await page.locator("#kc-0-1").fill("abc"); ok((await page.locator("#kc-0-1").getAttribute("aria-invalid")) === "true", "geçersiz hücre"); await has("kKappa", "0,400");
      for (const [id, v] of [["kc-0-0", "10"], ["kc-0-1", "0"], ["kc-1-0", "0"], ["kc-1-1", "0"]]) await page.locator("#" + id).fill(v);
      await has("kKappa", "—"); await has("kStatus", "tanımsız"); await settle();
      await page.locator("#kc-1-1").fill("10"); await has("kKappa", "1,000");
      await has("sKapE", "0,480"); await has("sKap50", "0,564"); await has("sKap", "0,543"); await has("sPrevOut", "%20");
      await range("sPrev", 0.05); await settle(); await has("sStatus", "seyrek durumda düşüyor");
      const kExp = K.kappa(K.twoRaterExpected(0.05, 0.85, 0.9)).kappa; await has("sKapE", kExp.toFixed(3).replace(".", ","));
      await page.click("#sNew"); ok((await page.locator("#sSeed").inputValue()) === "2", "yeni tohum");
      await page.locator("#sSeed").fill("x"); await page.locator("#sSeed").dispatchEvent("change"); ok((await page.locator("#sSeed").inputValue()) === "1", "geçersiz tohum 1'e döner");
      await page.click("#sToTable"); const nTot = await read("kn"); ok(nTot === "200", "örneklem tabloya aktarıldı: " + nTot);
      await range("sPrev", 0.01); await range("sSe", 1); await range("sSp", 1); await sel("sN", "50"); await settle(); ok(!(await page.locator("#panel-kap").textContent()).includes("NaN"), "uçlarda NaN yok");
      await has("fPass", "5 / 8"); await range("kThr", 0.3); await settle(); await has("fPass", "7 / 8"); await has("f-d5mdd", "geçmez"); await has("fDist", "en az 14");
      await sel("kScheme", "fl"); await has("f-d5mdd", "zayıf"); await sel("kScheme", "d5"); await has("f-d5mdd", "şüpheli"); await has("f-chA", "0,80 ve üstü");
      await pressR(); await has("kKappa", "0,400"); await has("kThrOut", "0,60"); await has("sKap", "0,543"); ok((await page.locator("#kScheme").inputValue()) === "lk", "R sıfırlar (2)");
      // 3 · Taban oranı
      await page.click("#tab-tab"); await settle();
      await has("bTP", "180"); await has("bFP", "490"); await has("bFN", "20"); await has("bTN", "9310"); await has("bPPV", "%26,9"); await has("bStatus", "180'i gerçekten D durumunda, 490'ı değil"); await has("bNPV", "%99,79"); await has("bLR", "18,0"); await has("bFPper", "2,72"); await has("bAcc", "%94,9");
      await has("bIconsCap", "18 doğru pozitif"); await has("bIconsCap", "49 yanlış pozitif");
      await page.locator("#bGuess").fill("80"); await page.click("#bGuessGo"); await has("bGuessOut", "%26,9"); await has("bGuessOut", "puan uzakta");
      await page.locator("#bGuess").fill("27"); await page.click("#bGuessGo"); await has("bGuessOut", "beş puan içinde");
      await page.locator("#bGuess").fill("200"); await page.click("#bGuessGo"); ok((await page.locator("#bGuess").getAttribute("aria-invalid")) === "true", "geçersiz tahmin");
      const ppvRef = (p, se, sp) => (p * se) / (p * se + (1 - sp) * (1 - p));
      await page.click("#bPreScreen"); await has("bPPV", fmtP(ppvRef(0.01, 0.9, 0.95), 1));
      await page.click("#bPreClinic"); await has("bPPV", fmtP(ppvRef(0.3, 0.9, 0.95), 1)); await has("bStatus", "doğru pozitiflerden az");
      await pressR(); await page.click("#bPreTwo"); await has("bPrevOut", "%26,9"); await has("bPPV", fmtP(ppvRef(0.269, 0.9, 0.95), 1));
      await range("bSp", 100); await range("bPrev", 0.1); await range("bSe", 50); await settle(); await has("bLR", "∞"); ok(!(await page.locator("#panel-tab").textContent()).includes("NaN"), "uçlarda NaN yok");
      await sel("bN", "100000"); await settle(); await has("bTN", "99 900");
      await pressR(); await has("bPPV", "%26,9"); ok(await page.locator("#bGuessOut").isHidden(), "R sıfırlar (3)");
      // 4 · Kategori ve boyut
      await page.click("#tab-boy"); await settle();
      await has("cPrev", "%9,0"); await has("cKap", "0,507"); await has("cKapE", "0,520"); await has("cPrevS", "%8,5"); await has("cR", "0,80"); await has("cTax", "—");
      ok(await page.locator("#cMixBox1").isHidden(), "karışım denetimleri gizli");
      await has("cStatus", "eşiğe bağlıdır");
      await page.click("#cPreMix"); await settle(); ok(await page.locator("#cMixBox1").isVisible(), "karışım denetimleri görünür");
      await has("cPrev", "%12,3"); await has("cKap", "0,893"); await has("cTax", "%97,1"); await has("cStatus", "%10'luk bir grup"); await has("cStatus", "%78,9'u küçük gruptandır"); await has("cStatus", "verinin kendisinde vardır");
      await range("cD", 1); await settle(); await has("cStatus", "iç içe");
      await range("cCut", 4); await range("cRel", 0.99); await range("cPi", 0.4); await settle(); ok(!(await page.locator("#panel-boy").textContent()).includes("NaN"), "uçlarda NaN yok");
      await range("cCut", -1); await range("cRel", 0.5); await settle(); ok(!(await page.locator("#panel-boy").textContent()).includes("NaN"), "alt uçta NaN yok");
      await page.click("#cNew"); ok((await page.locator("#cSeed").inputValue()) === "2", "yeni tohum (4)");
      await pressR(); await has("cPrev", "%9,0"); ok((await page.locator("#cModel").inputValue()) === "cont", "R sıfırlar (4)");
      // 5 · Kültür ve tartışma
      await page.click("#tab-kul"); await settle();
      await sel("rmG-spitzer", "cikarim"); await sel("rmG-cahalan", "cikarim"); await has("rmStatus", "2 / 4");
      ok(await page.locator("#rmR-spitzer").isHidden(), "harita önce gizli");
      await page.click("#rmShow"); await has("rmR-spitzer", "Seçimin aynı"); await has("rmR-cahalan", "Senin seçimin: çıkarıma"); await has("rmStatus", "1 tanesi haritayla aynı");
      await pressR(); ok(await page.locator("#rmR-spitzer").isHidden() && (await page.locator("#rmG-spitzer").inputValue()) === "", "R sıfırlar (5)");
      await labels();
      for (const t of ["tar", "kap", "tab", "boy", "kul"]) { await page.click("#tab-" + t); await settle(); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${t}: yatay taşma yok`); ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].filter((c) => c.offsetParent).every((c) => c.width > 0)), `${t}: görünür tuvaller çizildi`); }
      ok(await page.evaluate(() => Object.isFrozen(PsyDxLab) && !Object.getOwnPropertyDescriptor(window, "PsyDxLab").writable), "çekirdek salt okunur");
      ok(!(await page.locator("main").textContent()).includes("NaN") && !(await page.locator("main").textContent()).includes("undefined"), "NaN ya da undefined yok");
      await page.locator(".digest").scrollIntoViewIfNeeded(); ok(await page.locator(".digest").isVisible(), "Keşif Defteri görünür");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
