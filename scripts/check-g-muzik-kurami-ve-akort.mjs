// G · muzik-kurami-ve-akort.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// BigInt ile tam oran aritmetiği (Pisagor koması, AEU aralıklarının çarpımı, şizma), yayımlanmış sent değerleri
// (Wikipedia "Pythagorean comma", "Equal temperament", "53 equal temperament", "Harmonic series (music)";
// Altun ve Egermann 2020 Tablo 1), log₂(3/2)'nin en iyi yaklaşımlarının kaba kuvvetle aranması (sürekli kesir
// yerine), her eşit bölmede bütün adım sayılarının denenmesi, Sethares'in dissmeasure.m programının sıralamalı
// ayrı bir aktarımı ve kapalı 12 sesli akortlardaki toplam değişmezinin doğrudan toplanması.
// Kullanım: node scripts/check-g-muzik-kurami-ve-akort.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "muzik-kurami-ve-akort";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.TuningLab;
let checks = 0;
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
const c = (r) => 1200 * Math.log(r) / Math.LN2; // sayfadan bağımsız sent
const cBig = (num, den) => { // büyük tam sayı oranının senti: basamak kaydırmayla
  const sh = Math.max(0, num.toString(2).length - 60); const sd = Math.max(0, den.toString(2).length - 60);
  return 1200 * (Math.log2(Number(num >> BigInt(sh))) + sh - Math.log2(Number(den >> BigInt(sd))) - sd);
};

/* ── Kabuk ── */
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(!/fonts\.googleapis|cdn\.|<script src="https?:/.test(html), "dış betik, Google Fonts ya da CDN yok");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Müzik Kuramı ve Akort: ") && title.length <= 80, "başlık biçimi ve uzunluğu: " + title.length);
ok(/<body class="app-page" data-page="muzik-kurami-ve-akort">/.test(html) && /<meta name="description" content="[^"]{60,}"/.test(html), "kabuk ve açıklama");
ok(/<link rel="stylesheet" href="shared\/theme\.css">/.test(html) && /<script src="shared\/app\.js"><\/script>/.test(html), "theme.css ve app.js");
ok(/viewport-fit=cover/.test(html) && /<html lang="tr" class="app-root">/.test(html), "viewport ve kök");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(html.replace(/[♯♭]/g, "")), "emoji yok (♯ ve ♭ müzik işaretleri hariç)");
ok(!/body\s*\{[^}]*overflow\s*:\s*hidden/.test(html), "body overflow:hidden yok");
for (const l of ["duran-dalgalar", "fourier-ses", "ses-sentezleyici", "dalga-superpozisyonu", "pisagor"]) ok(html.includes(`href="${l}.html"`) && fs.existsSync(new URL(`../${l}.html`, import.meta.url)), "komşu bağlantı " + l);
ok(!/type="number"/.test(html), "type=number yok");
ok(!/Arap makam uygulamasında/.test(html), "kaynaksız Arap makamı iddiası yok");

/* ── Tam oranlar (BigInt) ── */
{
  const pc = cBig(3n ** 12n, 2n ** 19n);
  abs(K.PYTH_COMMA, pc, 1e-9, "Pisagor koması tam oran"); abs(K.PYTH_COMMA, 23.46, 0.005, "Pisagor koması yayımlanmış");
  abs(K.SYNTONIC, 21.51, 0.005, "sintonik koma yayımlanmış"); abs(cBig(3n ** 4n, 2n ** 6n) - c(5 / 4), 21.51, 0.005, "81:64 − 5:4 = sintonik");
  abs(K.HOLDER, 22.64, 0.005, "Holder koması"); abs(53 * K.JUST_FIFTH - 31 * 1200, 3.615, 0.0005, "Mercator koması");
  // AEU: Altun ve Egermann (2020) Tablo 1
  const pub = { F: 23.46, B: 90.22, S: 113.69, K: 180.45, T: 203.91 }, koma = { F: 1, B: 4, S: 5, K: 8, T: 9 };
  for (const a of K.AEU) { abs(a.c, pub[a.sym], 0.006, "AEU " + a.name); ok(a.koma === koma[a.sym], "koma sayısı " + a.sym); abs(a.c, cBig(BigInt(a.num), BigInt(a.den)), 1e-9); ok(Math.abs(a.koma * 1200 / 53 - a.c) < 1, "53 bölme 1 sentten yakın: " + a.sym); }
  // Pisagor üreteci: her AEU aralığı 3ᵃ·2ᵇ biçiminde
  for (const a of K.AEU) { let n = BigInt(a.num), d = BigInt(a.den); for (const p of [2n, 3n]) { while (n % p === 0n) n /= p; while (d % p === 0n) d /= p; } ok(n === 1n && d === 1n, "yalnız 2 ve 3: " + a.sym); }
  const R = K.rast();
  ok(R.length === 8 && R.map((r) => r.koma).join() === "0,9,17,22,31,40,48,53", "Rast komaları");
  let num = 1n, den = 1n; for (const s of ["T", "K", "S", "T", "T", "K", "S"]) { const a = K.AEU.find((x) => x.sym === s); num *= BigInt(a.num); den *= BigInt(a.den); }
  ok(num === 2n * den, "Rast tam oktav (BigInt)");
  ok(R[2].num === 8192 && R[2].den === 6561, "segah 8192:6561"); abs(R[2].c, 384.36, 0.005, "segah sent");
  abs(c(5 / 4) - R[2].c, cBig(32805n, 32768n), 1e-9, "segah = 5:4 − şizma (32805:32768)"); abs(cBig(32805n, 32768n), 1.95, 0.005, "şizma");
  abs(R[3].c, c(4 / 3), 1e-9, "çargah 4:3"); abs(R[4].c, c(3 / 2), 1e-9, "neva 3:2"); abs(R[6].c, c(4096 / 2187), 1e-9, "eviç 4096:2187");
  const refs = Object.fromEntries(K.SEGAH_REFS.map((r) => [r.key, r.c]));
  abs(refs.n3, 347.41, 0.005); abs(refs.r16, 359.47, 0.005, "16:13 (Bozkurt ve ark.: 359)"); abs(refs.k16, 362.26, 0.005); abs(refs.k17, 384.91, 0.005); abs(refs.j, 386.31, 0.005);
  ok(K.nearestRef(400).key === "et" && K.nearestRef(385).key === "k17" && K.nearestRef(384.4).key === "aeu" && K.nearestRef(361).key === "k16", "en yakın kuramsal perde");
}

/* ── Harmonikler (yayımlanmış: 5. yaklaşık 14, 7. yaklaşık 31 sent pes) ── */
{
  abs(K.harmonicRow(110, 3).dev, 1.955, 0.001); abs(K.harmonicRow(110, 5).dev, -13.69, 0.005, "5. harmonik"); abs(K.harmonicRow(110, 7).dev, -31.17, 0.005, "7. harmonik");
  abs(K.harmonicRow(110, 11).dev, -48.68, 0.005); abs(K.harmonicRow(110, 13).dev, 40.53, 0.005);
  for (let n = 1; n <= 64; n++) { const h = K.harmonicRow(130.8128, n); ok(h.num / h.den >= 1 && h.num / h.den < 2 && Number.isInteger(Math.log2(n * h.den / h.num)), "oktav indirgemesi " + n); abs(h.f, 130.8128 * n, 1e-9); ok(Math.abs(h.dev) <= 50 + 1e-9, "en yakın nota"); abs(h.note.dev, h.dev + K.nearestNote(130.8128).dev - 100 * Math.round((h.dev + K.nearestNote(130.8128).dev) / 100), 1e-6, "mutlak ve göreli sapma uyumlu " + n); }
  ok(K.nearestNote(440).name === "La4" && Math.abs(K.nearestNote(440).dev) < 1e-12 && K.nearestNote(261.6256).name === "Do4" && K.nearestNote(110).name === "La2", "nota adları");
  const sq = K.timbreAmps("square", 8), p5 = K.timbreAmps("pluck5", 10), pl = K.timbreAmps("pluck2", 5);
  ok(sq[1] === 0 && sq[3] === 0 && Math.abs(sq[2] - 1 / 3) < 1e-12, "kare: çift harmonik yok"); ok(p5[4] === 0 && p5[9] === 0 && p5[0] === 1, "beşte bir çekiş: 5 ve 10 susar"); abs(pl[2], 1 / 9, 1e-12);
  assert.throws(() => K.timbreAmps("saw", 0)); assert.throws(() => K.timbreAmps("x", 3)); assert.throws(() => K.nearestNote(0)); checks += 3;
}

/* ── Pürüzlülük: dissmeasure.m'nin sıralamalı ayrı aktarımı ── */
function dissmeasure(fvec, amp) {
  const idx = fvec.map((f, i) => [f, amp[i]]).sort((a, b) => a[0] - b[0]);
  const F = idx.map((x) => x[0]), A = idx.map((x) => x[1]), N = F.length; let D = 0;
  for (let i = 2; i <= N; i++) for (let k = 0; k <= N - i; k++) {
    const Fmin = F[k], S = 0.24 / (0.0207 * Fmin + 18.96), Fdif = F[k + i - 1] - F[k], a = Math.min(A[k + i - 1], A[k]);
    D += a * (5 * Math.exp(-3.51 * S * Fdif) - 5 * Math.exp(-5.75 * S * Fdif));
  }
  return D;
}
{
  let seed = 7; const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  for (let t = 0; t < 200; t++) {
    const N = 1 + Math.floor(rnd() * 10), rho = 0.5 + rnd() * 0.5, f0 = 80 + rnd() * 500, cc = rnd() * 1250, r = 2 ** (cc / 1200);
    const amps = K.timbreAmps(rho, N), fv = [], av = [];
    amps.forEach((a, i) => { fv.push(f0 * (i + 1), f0 * r * (i + 1)); av.push(a, a); });
    abs(K.dissonance(f0, r, amps), dissmeasure(fv, av), 1e-9 * Math.max(1, dissmeasure(fv, av)), "dissmeasure aktarımı");
  }
  // harmonik tınıda yerel en küçükler basit oranlarda (0,05 sentlik ızgara aramasıyla)
  const amps = K.timbreAmps(0.88, 6), mins = K.localMinima(261.6256, amps).filter((m) => m.c > 5).map((m) => m.c);
  const want = [6 / 5, 5 / 4, 4 / 3, 3 / 2, 5 / 3, 7 / 4, 2].map(c);
  ok(mins.length === want.length, "6 harmonikte 7 iç en küçük: " + mins.map((x) => x.toFixed(1)).join(" "));
  want.forEach((w, i) => { abs(mins[i], w, 1.5, "en küçük " + i); let best = w, bd = Infinity; for (let x = w - 3; x <= w + 3; x += 0.05) { const d = dissmeasure([...amps.map((_, n) => 261.6256 * (n + 1)), ...amps.map((_, n) => 261.6256 * 2 ** (x / 1200) * (n + 1))], [...amps, ...amps]); if (d < bd) { bd = d; best = x; } } abs(mins[i], best, 0.1, "ızgara araması ile aynı en küçük"); });
  ok(K.localMinima(261.6256, K.timbreAmps(1, 1)).filter((m) => m.c > 5).length === 0, "saf sinüste iç en küçük yok");
  for (const f0 of [130.8128, 261.6256, 523.2511]) ok(K.localMinima(f0, K.timbreAmps(1, 1)).filter((m) => m.c > 5).length === 0, "saf sinüs " + f0);
  // saf sinüs eğrisinin tepesi pes notada daha geniş aralıkta (kritik bant görece geniş)
  const peak = (f0) => { let bx = 0, by = -1; for (let x = 0; x <= 1250; x += 1) { const y = dissmeasure([f0, f0 * 2 ** (x / 1200)], [1, 1]); if (y > by) { by = y; bx = x; } } return bx; };
  const p3 = peak(130.8128), p4 = peak(261.6256), p5 = peak(523.2511); ok(p3 > p4 && p4 > p5, `sinüs tepesi ${p3} > ${p4} > ${p5}`); abs(p4, 142, 2, "Do4'te tepe ~142 sent");
  ok(JSON.stringify(K.coincidences(1.5, amps)) === "[[3,2],[6,4]]", "3:2'de çakışmalar 3.=2., 6.=4.");
  ok(K.coincidences(2 ** (700 / 1200), amps).length === 0, "eşit beşlide 1 sentten yakın çakışma yok");
  for (const cc of [400, 700, 100, 1100]) { const r = 2 ** (cc / 1200), rp = K.roughestPair(261.6256, r, amps); let bi = 0, bj = 0, bd = -Infinity; for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) { const d = dissmeasure([261.6256 * i, 261.6256 * r * j], [amps[i - 1], amps[j - 1]]); if (d > bd) { bd = d; bi = i; bj = j; } } ok(rp.i === bi && rp.j === bj, `en pürüzlü çift ${cc}: ${rp.i},${rp.j} = ${bi},${bj}`); }
  assert.throws(() => K.dissonance(0, 1.5, amps)); checks++;
}

/* ── Akortlar ── */
{
  const target = { 3: c(6 / 5), 4: c(5 / 4), 5: c(4 / 3), 7: c(3 / 2), 8: c(8 / 5), 9: c(5 / 3) };
  const systems = [["pyth"], ["just"], ["qc"], ["sixth"], ["et"], ["reg", 694.786], ["reg", 703.2], ["reg", 690], ["reg", 705]];
  for (const [sys, f] of systems) {
    const t = K.tuning(sys, f); ok(t.length === 12 && t[0] === 0 && t.every((x) => x >= 0 && x < 1200), "12 perde " + sys);
    for (const s of [3, 4, 5, 7, 8, 9]) {
      const E = K.intervalErrors(t, s); let sum = 0;
      for (let r = 0; r < 12; r++) { const j = r + s, size = (j >= 12 ? t[j - 12] + 1200 : t[j]) - t[r]; abs(E.sizes[r], size, 1e-9); sum += size - target[s]; }
      abs(E.sum, sum, 1e-9); abs(sum, s * 1200 - 12 * target[s], 1e-8, `değişmez ${sys} ${s}`);
    }
  }
  abs(K.intervalErrors(K.tuning("pyth"), 7).sum, -23.46, 0.005, "beşli sapmaları toplamı = −Pisagor koması");
  abs(K.intervalErrors(K.tuning("et"), 4).sum, 4 * c(128 / 125), 1e-9, "üçlü sapmaları = 4 diesis");
  // yayımlanmış değerler
  const et = K.tuning("et"); for (let r = 0; r < 12; r++) { abs(K.intervalAt(et, r, 7) - c(1.5), -1.96, 0.005); abs(K.intervalAt(et, r, 4) - c(1.25), 13.69, 0.005); }
  const py = K.tuning("pyth"), pyF = K.intervalErrors(py, 7).errs; ok(pyF.filter((e) => Math.abs(e) < 1e-9).length === 11, "Pisagor: 11 saf beşli"); abs(pyF[8], -23.46, 0.005, "kurt Sol♯–Mi♭");
  abs(K.intervalAt(py, 0, 4), c(81 / 64), 1e-9, "Pisagor üçlüsü 81:64");
  const qc = K.tuning("qc"), qE = K.intervalErrors(qc, 4).errs; ok(qE.filter((e) => Math.abs(e) < 1e-9).length === 8, "çeyrek koma: 8 saf büyük üçlü");
  abs(K.FIFTHS.qc, 696.578, 0.0005); abs(K.intervalAt(qc, 8, 7), 737.637, 0.001, "ortalama ses kurdu"); abs(K.regularSummary(K.FIFTHS.qc).wolf, 737.637, 0.001);
  abs(K.regularSummary(K.FIFTHS.pyth).wolf, 678.495, 0.001, "Pisagor kurdu"); abs(K.FIFTHS.sixth, 698.371, 0.0005); abs(K.regularSummary(K.FIFTHS.third).min3Err, 0, 1e-9, "üçte bir koma: saf küçük üçlü");
  const ju = K.tuning("just"); abs(K.intervalAt(ju, 2, 7), c(40 / 27), 1e-9, "saf akortta Re–La 40:27"); abs(K.intervalAt(ju, 0, 4), c(5 / 4), 1e-12); abs(K.intervalAt(ju, 9, 3), c(6 / 5), 1e-9, "La–Do 6:5");
  // vuru: eşit büyük üçlü Do4 üzerinde |4·Mi − 5·Do|
  const C4 = 261.6256, E4 = 440 * 2 ** (-5 / 12); abs(K.beat(C4, 400, 5, 4), Math.abs(4 * E4 - 5 * C4), 1e-3, "vuru"); abs(K.beat(C4, 400, 5, 4), 10.38, 0.005);
  abs(K.beat(C4, c(1.5), 3, 2), 0, 1e-9);
  assert.throws(() => K.tuning("x")); assert.throws(() => K.regular(500)); assert.throws(() => K.intervalErrors(et, 2)); checks += 3;
}

/* ── Eşit bölmeler: kaba kuvvet ── */
{
  const x = Math.log2(1.5);
  // log₂(3/2)'nin en iyi yaklaşımları (ikinci tür): |q·x − p| yeni bir en küçük veren paydalar
  const rec = []; let best = Infinity; for (let q = 1; q <= 700; q++) { const e = Math.abs(q * x - Math.round(q * x)); if (e < best - 1e-15) { best = e; rec.push(q); } }
  const conv = K.convergents(K.contFrac(x, 10)).map((v) => v[1]).filter((q) => q >= 1 && q <= 700);
  ok(JSON.stringify(rec) === JSON.stringify([1, 2, 5, 12, 41, 53, 306, 665]), "kayıt paydaları " + rec.join(","));
  ok(JSON.stringify([...new Set(conv)]) === JSON.stringify(rec), "yakınsak paydaları = kaba kuvvet " + conv.join(","));
  ok(JSON.stringify(K.contFrac(x, 9)) === "[0,1,1,2,2,3,1,5,2]", "sürekli kesir terimleri");
  for (let N = 1; N <= 120; N++) {
    const E = K.edo(N); let bk = 0, be = Infinity; for (let k = 0; k <= N; k++) { const e = Math.abs(k * 1200 / N - c(1.5)); if (e < be) { be = e; bk = k; } }
    ok(E.fifth.k === bk, "en yakın beşli " + N); abs(Math.abs(E.fifth.err), be, 1e-9); abs(E.step * N, 1200, 1e-9); ok(E.commaSteps === 12 * bk - 7 * N, "koma adımı");
  }
  abs(K.edo(53).fifth.err, -0.07, 0.005, "53: beşli"); abs(K.edo(53).M3.err, -1.40, 0.01, "53: üçlü (yayımlanmış iki ondalığa yuvarlı)"); abs(K.edo(53).m3.err, 1.34, 0.005, "53: küçük üçlü"); ok(K.edo(53).fifth.k === 31 && K.edo(53).M3.k === 17, "31 ve 17 adım");
  abs(K.edo(12).fifth.err, -1.96, 0.005); ok(K.edo(12).commaSteps === 0 && K.edo(53).commaSteps === 1 && K.edo(41).commaSteps === 1, "koma adımları");
  ok(K.edo(19).syntonicSteps === 0 && K.edo(31).syntonicSteps === 0 && K.edo(12).syntonicSteps === 0 && K.edo(53).syntonicSteps === 1, "ortalama ses ailesi");
  for (let N = 5; N < 12; N++) ok(Math.abs(K.edo(N).fifth.err) > 2, "12'den küçük bölmede beşli 2 senti aşar: " + N);
  assert.throws(() => K.edo(0)); assert.throws(() => K.edo(2.5)); checks += 2;
}
console.log(`G ${SLUG}: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

/* ── Tarayıcı ── */
if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const { canvasInkAll, assertCanvasDrawn } = await import("./lib/canvas-check.mjs");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let browser;
  const before = checks;
  assert(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`, import.meta.url)), "defter dosyası var olmalı"); // defter yazıldı: 404 artık hata
  try {
    browser = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await ctx.newPage();
      await page.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "0"); }, theme);
      page.setDefaultTimeout(15000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const settle = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const pressR = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); await settle(); };
      const labels = async () => { const u = await page.evaluate(() => [...document.querySelectorAll("main input, main select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label")).map((e) => e.id)); ok(u.length === 0, "etiketsiz denetim: " + u.join(",")); };
      const drawn = async (tab) => { for (const st of await canvasInkAll(page, `#panel-${tab} canvas`)) assertCanvasDrawn(st, { minInk: 300, minDistinct: 3, label: tab + " " + st.id }); checks++; };
      await labels();
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-6; })), "varsayılanlar adım ızgarasında");
      ok(await page.evaluate(() => Object.isFrozen(TuningLab) && !Object.getOwnPropertyDescriptor(window, "TuningLab").writable), "çekirdek salt okunur");
      // ses: kullanıcı düğmesiyle çalar, durdurulur
      await has("soundStatus", "Ses kapalı");
      await page.click("#hsPlay"); await page.waitForFunction(() => /Çalıyor|desteklemiyor|başlatılamadı/.test(document.getElementById("soundStatus").textContent));
      await has("soundStatus", "Çalıyor"); await page.click("#stopAll"); await has("soundStatus", "durduruldu");
      await page.click("#hsArp"); await page.waitForFunction(() => /Çalıyor/.test(document.getElementById("soundStatus").textContent)); await page.keyboard.press("Escape"); await has("soundStatus", "durduruldu");
      await range("vol", 0); await page.click("#hsPlay"); await page.waitForFunction(() => /0 %/.test(document.getElementById("soundStatus").textContent)); await has("soundStatus", "Ses düzeyi 0 %"); await range("vol", 40);
      // 1
      await has("hsF0", "110,00 Hz"); await has("hsSel", "7. harmonik: 770,00 Hz"); await has("hsSelE", "7:4 = 968,83 sent"); await has("hsSelE", "−31,17 sent"); await has("hsMax", "7. harmonik: −31,17 sent");
      ok((await page.locator("#hsBody tr").count()) === 8, "8 satır"); await has("hsStatus", "neredeyse üçte biri");
      await range("hsN", 16); await settle(); await has("hsMax", "11. harmonik: −48,68 sent"); ok((await page.locator("#hsBody tr").count()) === 16, "16 satır");
      await sel("hsTimbre", "square"); await range("hsOne", 4); await settle(); await has("hsStatus", "çift harmonikler susar");
      await sel("hsTimbre", "pluck5"); await range("hsOne", 5); await settle(); await has("hsStatus", "düğüm noktasına");
      await sel("hsTimbre", "sine"); await settle(); await has("hsStatus", "Saf sinüs");
      await range("hsN", 1); await settle(); await has("hsMax", "—");
      await sel("hsRoot", "261.6256"); await range("hsOne", 3); await settle(); await has("hsF0E", "Do4"); await has("hsSel", "784,88 Hz");
      await sel("hsGuess", "31"); await has("hsGuessOut", "Doğru"); await sel("hsGuess", "14"); await has("hsGuessOut", "Bir daha bak");
      await pressR(); await has("hsSel", "7. harmonik: 770,00 Hz"); ok((await page.locator("#hsTimbre").inputValue()) === "saw" && (await page.locator("#hsGuessOut").textContent()) === "", "R sıfırlar (1)");
      await range("hsN", 3); await page.click("#hsReset"); await has("hsNOut", "8");
      await drawn("hs");
      // sekme klavyesi
      await page.locator("#tab-hs").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-mk").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-ds").getAttribute("aria-selected")) === "true", "ArrowRight"); await settle();
      // 2
      await has("dsInt", "700,00 sent"); await has("dsNear", "tam beşli 3:2"); await has("dsNearE", "−1,96 sent"); await has("dsCo", "0"); await has("dsBeat", "129,5 Hz fark"); await has("dsBeatE", "4. (1046,5 Hz)"); await has("dsMin", "7 iç en küçük"); await has("dsMinE", "386,3 (5:4)"); await has("dsMinE", "702,0 (3:2)"); await has("dsStatus", "alt notanın 3., üst notanın 2. harmoniği) saniyede yaklaşık 0,89 kez vurur");
      await sel("dsPreset", "701.96"); await settle(); await has("dsCo", "2"); await has("dsCoE", "3. = 2. · 6. = 4."); await has("dsStatus", "bir yerel en küçüktür");
      await sel("dsPreset", "386.31"); await settle(); await has("dsNear", "büyük üçlü 5:4"); await has("dsCo", "1");
      await range("dsCents", 400); await settle(); ok((await page.locator("#dsPreset").inputValue()) === "", "kaydırıcı hazır değeri temizler"); await has("dsStatus", "10,38 kez");
      await range("dsN", 1); await settle(); await has("dsMin", "iç en küçük yok"); await has("dsStatus", "142 sent dolayında");
      await sel("dsRoot", "130.8128"); await settle(); ok(!(await read("dsStatus")).includes("142 sent"), "pes notada tepe kayar");
      await range("dsCents", 0); await settle(); await has("dsBeat", "—"); ok(!(await page.locator("#panel-ds").textContent()).includes("NaN"), "0 sentte NaN yok");
      await range("dsCents", 1250); await range("dsN", 10); await range("dsA", 0.5); await settle(); ok(!(await page.locator("#panel-ds").textContent()).includes("NaN"), "sınır değerler (2)");
      await pressR(); await has("dsInt", "700,00 sent"); await has("dsMin", "7 iç en küçük"); ok((await page.locator("#dsRoot").inputValue()) === "261.6256", "R sıfırlar (2)");
      await page.click("#dsPlay"); await page.waitForFunction(() => /Çalıyor/.test(document.getElementById("soundStatus").textContent)); await page.click("#dsStop"); await has("soundStatus", "durduruldu");
      await drawn("ds");
      // 3
      await page.click("#tab-tn"); await settle(); await has("soundStatus", "Sekme değişti");
      await has("tnSel", "Do üstünde tam beşli: 700,00 sent"); await has("tnBest", "bütün kökler eşit"); await has("tnSum", "−23,46 sent"); await has("tnReg", "beşli −1,96 sent · üçlü +13,69 sent"); await has("tnRegE", "kurt beşli yok"); await has("tnBeat", "0,89 vuru/s"); await has("tnStatus", "12 eşit akortta her tam beşli aynıdır");
      await sel("tnInt", "4"); await settle(); await has("tnBeat", "10,38 vuru/s"); await has("tnSum", "+164,24 sent");
      await sel("tnSys", "pyth"); await sel("tnInt", "7"); await settle(); await has("tnWorst", "Sol♯: −23,46 sent"); await has("tnBest", "11 kök: 0,00 sent"); await has("tnBestE", "11 kök eşit, ilki Mi♭"); await has("tnSum", "−23,46 sent"); await has("tnRegE", "kurt beşli 678,49 sent"); await has("tnStatus", "kurt aralık"); ok((await page.locator("#tnFifth").inputValue()) === "701.955", "Pisagor beşlisi kaydırıcıda");
      await sel("tnSys", "qc"); await sel("tnInt", "4"); await settle(); await has("tnBest", ": 0,00 sent"); await has("tnWorst", "+41,06 sent"); await has("tnSum", "+164,24 sent"); await has("tnRegE", "kurt beşli 737,64 sent");
      await sel("tnSys", "just"); await sel("tnInt", "7"); await settle(); await has("tnStatus", "Re–La beşlisi −21,51 sent"); await has("tnWorst", "Si♭, Re: −21,51 sent"); await has("tnWorstE", "2 kök eşit"); await has("tnStatus", "Si♭, Re köklerinde"); await sel("tnInt", "4"); await settle(); ok(!/ama En/.test(await read("tnStatus")), "saf akort durum cümlesi"); await sel("tnSys", "pyth"); await settle(); ok(!(await read("tnStatus")).includes("kurt aralık"), "Pisagor üçlülerinde kurt yok"); await sel("tnSys", "just"); await sel("tnInt", "7"); await settle(); await has("tnReg", "düzenli değil"); await has("tnFifthOut", "kullanılmıyor");
      await range("tnFifth", 694.786); await sel("tnInt", "3"); await settle(); ok((await page.locator("#tnSys").inputValue()) === "reg", "kaydırıcı sistemi değiştirir"); await has("tnStatus", "üçte bir koma");
      await range("tnFifth", 690); await settle(); ok(!(await page.locator("#panel-tn").textContent()).includes("NaN"), "sınır 690"); await range("tnFifth", 705); await settle(); ok(!(await page.locator("#panel-tn").textContent()).includes("NaN"), "sınır 705");
      await sel("tnRoot", "8"); await settle(); ok((await page.locator("#tnBody tr.is-sel td").first().textContent()) === "Sol♯", "seçili satır");
      ok((await page.locator("#tnBody tr").count()) === 12, "12 satır");
      await pressR(); await has("tnSel", "Do üstünde tam beşli: 700,00 sent"); ok((await page.locator("#tnSys").inputValue()) === "et", "R sıfırlar (3)");
      await sel("tnSys", "pyth"); await page.click("#tnReset"); ok((await page.locator("#tnSys").inputValue()) === "et", "sekme sıfırlama (3)");
      await page.click("#tnTriad"); await page.waitForFunction(() => /Çalıyor/.test(document.getElementById("soundStatus").textContent)); await page.click("#tnStop");
      await drawn("tn");
      // 4
      await page.click("#tab-ed"); await settle();
      await has("edStep", "100,000 sent"); await has("edFifth", "7 adım: −1,96 sent"); await has("edM3", "4 adım: +13,69 sent"); await has("edComma", "0 adım"); await has("edCF", "[0; 1, 1, 2, 2, 3, 1, 5, 2, …]"); await has("edCFE", "7/12, 24/41, 31/53, 179/306"); await has("edStatus", "yakınsağının paydasıdır");
      await page.click("#edP53"); await settle(); await has("edStep", "22,642 sent"); await has("edFifth", "31 adım: −0,07 sent"); await has("edM3", "17 adım: −1,41 sent"); await has("edComma", "+1 adım"); await has("edStatus", "3,615 sent");
      await page.click("#edP19"); await settle(); await has("edCommaE", "ortalama ses ailesi"); await has("edStatus", "19 eşit bölmede beşli −7,22 sent");
      await range("edN", 24); await settle(); await has("edStatus", "en küçüğü 12"); await range("edN", 13); await settle(); await has("edStatus", "en küçüğü 5");
      await range("edN", 5); await settle(); await range("edN", 72); await settle(); ok(!(await page.locator("#panel-ed").textContent()).includes("NaN"), "sınır değerler (4)");
      await pressR(); await has("edNOut", "12"); await page.click("#edP41"); await page.click("#edReset"); await has("edNOut", "12");
      await drawn("ed");
      // 5
      await page.click("#tab-mk"); await settle();
      await has("mkSeg", "400,0 sent"); await has("mkNear", "12 eşit"); await has("mkAEU", "384,36 sent"); await has("mkAEUE", "−1,95 sent"); await has("mkET", "−15,64 sent"); await has("mkSum", "9 + 8 + 5 + 9 + 9 + 8 + 5 = 53"); await has("mkSumE", "2:1"); await has("mkDev", "0,82 sent"); await has("mkStatus", "bundan daha pestir");
      ok((await page.locator("#mkBody tr").count()) === 5 && (await page.locator("#mkRastBody tr").count()) === 8, "AEU tabloları");
      await page.click("#mkToAEU"); await has("mkSeg", "384,4 sent"); await has("mkNear", "AEU segahı"); await has("mkStatus", "16–17 koma bölgesinin içinde");
      await page.click("#mkTo16"); await has("mkNear", "16 koma"); await page.click("#mkToJ"); await has("mkNear", "5:4");
      await range("mkSegR", 330); await settle(); await has("mkNear", "nötr üçlü"); await has("mkStatus", "tepelerin altındasın"); await range("mkSegR", 420); await settle(); ok(!(await page.locator("#panel-mk").textContent()).includes("NaN"), "sınır değerler (5)");
      await pressR(); await has("mkSeg", "400,0 sent"); await page.click("#mkToJ"); await page.click("#mkReset"); await has("mkSeg", "400,0 sent");
      await page.click("#mkPlaySeg"); await page.waitForFunction(() => /Çalıyor/.test(document.getElementById("soundStatus").textContent)); await page.click("#tab-hs"); await has("soundStatus", "Sekme değişti"); await page.click("#tab-mk");
      await drawn("mk");
      for (const t of ["hs", "ds", "tn", "ed", "mk"]) { await page.click("#tab-" + t); await settle(); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${t}: yatay taşma yok`); }
      // site sesi kapalıyken çalmaz
      await page.click("#tab-hs"); await page.evaluate(() => window.AcelyaSounds?.setMuted(true)); await page.click("#hsPlay"); await page.waitForFunction(() => /kapalı/.test(document.getElementById("soundStatus").textContent)); await has("soundStatus", "Sitenin sesi kapalı");
      ok(!(await page.locator("main").textContent()).includes("NaN"), "NaN yok");
      ok(await page.waitForFunction(() => { const d = document.querySelector(".digest"); return d && d.getBoundingClientRect().height > 0 && d.textContent.includes("Rast"); }).then(() => true), "defter görünür");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
