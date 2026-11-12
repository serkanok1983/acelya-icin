// G · sinyal-isleme-ve-modulasyon.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// bu dosyada ayrı yazılmış doğrudan DFT (Math.cos ile) ve karmaşık DTFT toplamı, ters dönüşüm ve Parseval,
// örneklerin birebir eşitliğiyle örtüşme, Bessel fonksiyonunun integral tanımı (Simpson) ve Σ Jₙ² = 1 özdeşliği,
// AM'nin çarpımdan toplama açılımıyla güç hesabı, |1 + m·cos| zarfının sayısal Fourier katsayıları,
// süzgeçlerde ayrı yazılmış fark denklemi döngüsü, dürtü yanıtının DTFT'si, |H|²'nin ω üzerinden integrali (Parseval),
// ikinci derece polinomun karmaşık kökü ve birden çok tohumla gürültü ortalaması (20 tohum).
// Kullanım: node scripts/check-g-sinyal-isleme-ve-modulasyon.mjs [--browser] [--dump]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "sinyal-isleme-ve-modulasyon";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.SignalLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
const TAU = 2 * Math.PI;

/* ── Kabuk ── */
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(/<body class="app-page" data-page="sinyal-isleme-ve-modulasyon">/.test(html), "data-page");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Sinyal İşleme ve Modülasyon: ") && [...title].length <= 80, "başlık biçimi ve uzunluğu");
ok(/name="description"/.test(html) && /shared\/theme\.css/.test(html) && /shared\/app\.js/.test(html), "meta, theme.css, app.js");
ok(!/fonts\.googleapis|cdn\.|unpkg|jsdelivr|<script src="http/.test(html), "CDN yok");
ok(!/[̀-ͯ⃗]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}☀-➿]/u.test(html), "emoji yok");
ok(!/type="number"/.test(html), "type=number yok");
ok(!/꜀/.test(html), "yanlış alt simge yok");
ok(html.includes("orta dalga AM yaklaşık 0,5–1,6 MHz") && html.includes("negatif frekanstaki ayna ve ikinci ton hesaba katılmadan"), "orta dalga bandı ve kuram sütunu notu doğru");

/* ── Bağımsız yardımcılar ── */
function naiveDFT(re, im) { const N = re.length, R = [], I = []; for (let k = 0; k < N; k++) { let a = 0, b = 0; for (let n = 0; n < N; n++) { const t = -TAU * k * n / N; a += re[n] * Math.cos(t) - im[n] * Math.sin(t); b += re[n] * Math.sin(t) + im[n] * Math.cos(t); } R.push(a); I.push(b); } return { R, I }; }
function simpson(f, a, b, n = 2000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; }
const besselInt = (n, x) => simpson((t) => Math.cos(n * t - x * Math.sin(t)), 0, Math.PI, 4000) / Math.PI;
function myFilter(b, a, x) { const y = []; for (let n = 0; n < x.length; n++) { let acc = 0; b.forEach((bk, k) => { if (n - k >= 0) acc += bk * x[n - k]; }); a.forEach((ak, k) => { if (k > 0 && n - k >= 0) acc -= ak * y[n - k]; }); y.push(acc / a[0]); } return y; }
let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 - 0.5; };

/* ── 2 · FFT ve DFT ── */
for (const N of [8, 16, 64, 256, 1024]) {
  const re = Array.from({ length: N }, rnd), im = Array.from({ length: N }, rnd), X = K.fft(re, im), D = naiveDFT(re, im), Dk = K.dft(re, im);
  let e = 0, e2 = 0, m = 0; for (let k = 0; k < N; k++) { e = Math.max(e, Math.hypot(X.re[k] - D.R[k], X.im[k] - D.I[k])); e2 = Math.max(e2, Math.hypot(Dk.re[k] - D.R[k], Dk.im[k] - D.I[k])); m = Math.max(m, Math.hypot(D.R[k], D.I[k])); }
  ok(e / m < 1e-12 && e2 / m < 1e-12, `FFT/DFT = bağımsız DFT, N=${N}`);
  ok(X.mults === N / 2 * Math.log2(N) && Dk.mults === N * N, `çarpma sayacı N=${N}`);
  const back = K.fft(X.re, X.im, true); let r = 0; for (let n = 0; n < N; n++) r = Math.max(r, Math.abs(back.re[n] - re[n]), Math.abs(back.im[n] - im[n])); ok(r < 1e-12, "ters FFT");
  let pt = 0, pf = 0; for (let n = 0; n < N; n++) { pt += re[n] ** 2 + im[n] ** 2; pf += X.re[n] ** 2 + X.im[n] ** 2; } near(pf / N, pt, 1e-12, "Parseval");
}
assert.throws(() => K.fft([1, 2, 3])); checks++;
// Pencere çekirdeği: kapalı biçim ↔ kaba kuvvet DTFT
for (const kind of ["rect", "hann"]) for (const N of [16, 256]) for (const d of [0, 0.25, 0.5, 1, 1.5, 3.7]) {
  const w = K.windowFn(kind, N); let a = 0, b = 0, s = 0; for (let n = 0; n < N; n++) { a += w[n] * Math.cos(TAU * d * n / N); b -= w[n] * Math.sin(TAU * d * n / N); s += w[n]; }
  near(K.kernelGain(kind, d, N), Math.hypot(a, b) / s, 1e-10, `çekirdek ${kind} N=${N} d=${d}`);
}
near(K.kernelGain("rect", 0.5, 4096), 2 / Math.PI, 1e-6, "dikdörtgen yarım kutu 2/π"); near(K.kernelGain("hann", 0.5, 4096), 8 / (3 * Math.PI), 1e-6, "Hann yarım kutu 8/(3π)");
{
  const d = K.dftLab({ N: 256 }); near(d.df, 4); near(d.bins, 25.5); near(d.peakTh, K.kernelGain("rect", 0.5, 256)); ok(Math.abs(d.peakMeas - d.peakTh) / d.peakTh < 0.01, "ölçülen tepe ≈ çekirdek (ayna terimi < %1)"); ok(d.f2Sep === false, "dikdörtgen: zayıf ton gizli");
  ok(Math.abs(d.f2Level - d.f2Without) < 1, "dikdörtgen: f₂ düzeyi sızıntıyla aynı");
  const h = K.dftLab({ N: 256, win: "hann" }); ok(h.f2Sep === true && Math.abs(h.f2Level + 40) < 6 && h.f2Level > h.f2Without + 3, "Hann: zayıf ton görünür, ≈ −40 dB");
  const c = K.dftLab({ N: 256, f1: 100 }); near(c.peakMeas, 1, 1e-9, "tam kutuda genlik 1");
  ok(K.dftLab({ N: 256, f1: 100, a2: 1, delta: 2, pad: 16 }).f2Sep === false, "yarım kutu: sıfır doldurma ayırmaz");
  ok(K.dftLab({ N: 2048, f1: 100, a2: 1, delta: 2, pad: 1 }).f2Sep === true, "uzun kayıt ayırır");
  ok(K.dftLab({ N: 256, f1: 100, a2: 1, delta: 8 }).f2Sep === true, "iki kutu: ayrı");
  // Kare dalga: test kendi örneklerini ve DFT kutusunu hesaplar
  for (const P of [8, 16, 32, 64]) { const N = 1024, q = K.dftLab({ N, sig: "square", P }), x = Array.from({ length: N }, (_, n) => (Math.sin(TAU * (n + 0.5) / P) >= 0 ? 1 : -1));
    for (const row of q.square.rows) { const k = row.n * N / P; let a = 0, b = 0; for (let n = 0; n < N; n++) { a += x[n] * Math.cos(TAU * k * n / N); b -= x[n] * Math.sin(TAU * k * n / N); } near(row.meas, 2 * Math.hypot(a, b) / N, 1e-9, `kare P=${P} n=${row.n}`); if (row.n % 2) near(row.exact, row.meas, 1e-9, "kesin formül"); else ok(row.meas < 1e-9, "çift harmonik 0"); } }
  ok(K.dftLab({ N: 16, sig: "square", P: 32 }).square.ok === false, "N < P");
}

/* ── 1 · Örnekleme ── */
for (const fs of [5, 13, 20, 37, 60]) for (let f = 0.5; f <= 50; f += 1.5) {
  const fa = K.aliasFreq(f, fs); ok(fa >= 0 && fa <= fs / 2 + 1e-12, "görünen ∈ [0, fₛ/2]");
  // Örnekler birebir aynı: cos(2πfn/fₛ + φ) = cos(±2π·fa·n/fₛ + φ)
  let e1 = 0, e2 = 0; for (let n = 0; n < 50; n++) { const v = Math.cos(TAU * f * n / fs + 0.5); e1 = Math.max(e1, Math.abs(v - Math.cos(TAU * fa * n / fs + 0.5))); e2 = Math.max(e2, Math.abs(v - Math.cos(-TAU * fa * n / fs + 0.5))); }
  ok(Math.min(e1, e2) < 1e-8, `örnek eşitliği f=${f} fₛ=${fs}`);
}
for (const [f, fs, fa, wh] of [[3, 20, 3, 3], [17, 20, 3, -3], [20, 20, 0, 0], [21, 20, 1, 1], [50, 60, 10, -10], [0.5, 5, 0.5, 0.5], [49.5, 50, 0.5, -0.5], [24.5, 50, 24.5, 24.5]]) {
  const r = K.samplingLab({ f, fs }); near(r.appTh, fa); ok(Math.abs(r.appMeas - fa) < 2e-4, `ölçülen görünen f=${f}: ${r.appMeas}`); near(r.wheelMeas, wh, 1e-9, "tekerlek"); near(r.N, Math.round(fs * 8));
  ok(f < fs / 2 ? r.recErr < 0.03 : r.recErr > 0.3, `geri kurma hatası f=${f}: ${r.recErr}`);
}
{ // Sinc toplamı: testin kendi toplamıyla
  const fs = 20, x = K.sampleSignal(3, fs); for (const t of [3.33, 4.01, 4.517]) { let s = 0; for (let n = 0; n < x.length; n++) { const u = fs * t - n; s += x[n] * Math.sin(Math.PI * u) / (Math.PI * u); } near(K.reconstruct(x, fs, t), s, 1e-9, "sinc toplamı"); }
  const r = K.samplingLab({ f: 10, fs: 20 }); ok(r.atNyq && Math.abs(r.recErr - Math.sqrt(0.5 * (1 - Math.cos(Math.PI / 6)) ** 2 + 0.5 * Math.sin(Math.PI / 6) ** 2)) < 0.02, "Nyquist: cos φ genlikli dalga kurulur");
}
// Nicemleme: rastgele evreli bağımsız tahmin
{ let s2 = 99; const u = () => { s2 = (s2 * 48271) % 2147483647; return s2 / 2147483647; };
  for (const [b, A] of [[16, 0], [12, 0], [8, 0], [8, -20], [4, 0]]) { const amp = 10 ** (A / 20); let ps = 0, pn = 0; for (let i = 0; i < 200000; i++) { const x = amp * Math.cos(TAU * u()), D = 2 / 2 ** b, q = Math.min(1 - D / 2, Math.max(-1 + D / 2, D * (Math.floor(x / D) + 0.5))); ps += x * x; pn += (q - x) ** 2; } const ref = 10 * Math.log10(ps / pn), q = K.sqnrLab({ b, AdB: A }); ok(Math.abs(q.sqnrMeas - ref) < 0.12, `SQNR b=${b} A=${A}: ${q.sqnrMeas} ↔ ${ref}`); near(q.sqnrTh, 6.0206 * b + 1.7609 + A, 1e-4); }
  ok(Math.abs(K.sqnrLab({ b: 16, AdB: 0 }).sqnrMeas - 98.09) < 0.05, "16 bit ≈ 98,09 dB"); }

/* ── 3 · AM ve FM ── */
for (const n of [0, 1, 2, 3, 5, 8, 12]) for (const x of [0, 0.2, 1, 2.405, 5, 7.3, 10]) near(K.besselJ(n, x), besselInt(n, x), 2e-10, `J${n}(${x})`);
for (const x of [0.5, 3, 10]) { let s = K.besselJ(0, x) ** 2; for (let n = 1; n < 40; n++) s += 2 * K.besselJ(n, x) ** 2; near(s, 1, 1e-12, "Σ Jₙ² = 1"); }
near(K.besselJ(-3, 2), -K.besselJ(3, 2), 1e-15, "J₋ₙ = (−1)ⁿJₙ");
for (const m of [0, 0.3, 0.5, 1, 1.5]) for (const fm of [20, 100, 200]) {
  const r = K.amLab({ m, fm }); near(r.car, 1, 1e-9); near(r.usb, m / 2, 1e-9); near(r.lsb, m / 2, 1e-9); near(r.ptot, 0.5 + m * m / 4, 1e-9, "güç 1/2 + m²/4");
  near(r.frac, (m * m / 4) / (0.5 + m * m / 4), 1e-9, "yan bant payı");
  near(r.cohA, m, 1e-9, "eş evreli genlik"); if (m > 0) ok(r.cohThd < 1e-9, "eş evreli bozulmasız");
  if (m > 0 && m <= 1) { near(r.envA, m, 1e-9); ok(r.envThd < 1e-9, "zarf bozulmasız (m ≤ 1)"); }
  if (m > 1) { // |1 + m cos θ| Fourier katsayıları, testin kendi integrali
    const a = (h) => simpson((t) => Math.abs(1 + m * Math.cos(t)) * Math.cos(h * t), 0, TAU, 20000) / Math.PI; const A = [1, 2, 3, 4, 5].map(a);
    near(r.envA, A[0], 1e-6, "zarf temel"); near(r.envThd, Math.sqrt(A.slice(1).reduce((s, v) => s + v * v, 0)) / A[0], 1e-5, "zarf THD");
  }
}
near(K.amLab({ m: 0.5, fm: 100, phiDeg: 60 }).cohA, 0.25, 1e-9, "cos 60°"); ok(K.amLab({ m: 0.5, fm: 100, phiDeg: 90 }).cohThd === null, "90°: mesaj yok");
for (const beta of [0, 0.2, 1, 2.405, 5, 10]) for (const fm of [20, 100, 200]) {
  const r = K.fmLab({ beta, fm }); let e = 0; for (let n = -r.K; n <= r.K; n++) e = Math.max(e, Math.abs(r.meas[r.K + n] - besselInt(n, beta)));
  ok(e < (beta === 10 && fm === 200 ? 1e-5 : 1e-8), `FM çizgileri = Bessel integrali β=${beta} fₘ=${fm}: ${e}`);
  let acc = besselInt(0, beta) ** 2, k = 0; while (acc < 0.98) { k++; acc += 2 * besselInt(k, beta) ** 2; } near(r.b98, 2 * k * fm, 1e-9, "%98 bant"); near(r.carson, 2 * (beta + 1) * fm);
  near(r.ptot, 0.5, 1e-9, "FM gücü sabit");
}
ok(K.fmLab({ beta: 2.405, fm: 100 }).j0sq < 1e-6, "β = 2,405: taşıyıcı yok");

/* ── 4 · Süzgeçler ── */
const cfgs = [{ type: "ma", M: 8 }, { type: "ma", M: 64 }, { type: "sinc", taps: 51, fc: 50 }, { type: "sinc", taps: 201, fc: 5 }, { type: "sinc", taps: 5, fc: 450 }, { type: "iir1", fc: 50 }, { type: "iir1", fc: 450 }, { type: "biquad", fc: 50, Q: 0.71 }, { type: "biquad", fc: 5, Q: 0.71 }, { type: "biquad", fc: 50, Q: 5 }, { type: "biquad", fc: 50, Q: 0.5 }, { type: "reson", fc: 50, r: 0.95 }, { type: "reson", fc: 450, r: 0.8 }];
for (const c of cfgs) {
  const d = K.design(c), L = 3000, imp = myFilter(d.b, d.a, [1, ...Array(L - 1).fill(0)]), lab = K.filterLab({ ...c, fTest: 30, f0: 10, sigma: 1, seed: 1 });
  for (const f of [0, 10, 33, 120, 499]) { let a = 0, b = 0; imp.forEach((h, n) => { a += h * Math.cos(TAU * f * n / 1000); b -= h * Math.sin(TAU * f * n / 1000); }); const H = K.freqResp(d.b, d.a, f); near(H.mag, Math.hypot(a, b), 1e-7, `${c.type} |H(${f})|`); }
  // fark denklemi: testin döngüsü = çekirdeğin lfilter
  const x = Array.from({ length: 300 }, rnd), y1 = myFilter(d.b, d.a, x), y2 = K.lfilter(d.b, d.a, x); ok(y1.every((v, i) => Math.abs(v - y2[i]) < 1e-12), "lfilter");
  // sinüs ölçümü: testin kendi uzun çalıştırmasından genlik ve evre
  for (const f of [10, 30, 200]) { const n0 = 6000, xs = Array.from({ length: n0 + 1 }, (_, n) => Math.cos(TAU * f * n / 1000)), ys = myFilter(d.b, d.a, xs), H = K.freqResp(d.b, d.a, f), pred = H.mag * Math.cos(TAU * f * n0 / 1000 + H.phase), m = K.measureSine(d, f); near(ys[n0], pred, 1e-7, "kalıcı durum"); near(m.mag, H.mag, 1e-7, "ölçülen |H|"); ok(Math.abs(((m.phase - H.phase + 3 * Math.PI) % TAU) - Math.PI) < 1e-6, "ölçülen evre"); }
  // Parseval: Σh² = (1/π)∫₀^π |H|² dω
  near(K.energySum(d), simpson((w) => K.freqResp(d.b, d.a, w / TAU * 1000).mag ** 2, 0, Math.PI, 20000) / Math.PI, 1e-5, `${c.type} Σh²`);
  // kutuplar: a polinomunun kökü
  if (!d.fir && d.a.length === 3) for (const p of d.poles) { const re = p[0] ** 2 - p[1] ** 2 + d.a[1] * p[0] + d.a[2], im = 2 * p[0] * p[1] + d.a[1] * p[1]; ok(Math.hypot(re, im) < 1e-12, "kutup kök"); }
  if (!d.fir) ok(Math.abs(lab.decay - lab.rmax) / lab.rmax < 0.01, `${c.type} sönüm ≈ |p|: ${lab.decay} ↔ ${lab.rmax}`);
  // gürültü kazancı: beş tohumun ortalaması kurama 0,15 dB yakın
  let g = 0; for (let s = 1; s <= 20; s++) g += K.noiseLab(d, { f0: 10, sigma: 1, seed: s }).gain; ok(Math.abs(g / 20 - lab.noise.gainTh) < 0.4, `${c.type} SNR kazancı ${g / 20} ↔ ${lab.noise.gainTh}`);
}
{ const d = K.design({ type: "ma", M: 8 }); for (let k = 1; k < 8; k++) ok(K.freqResp(d.b, d.a, 1000 * k / 8).mag < 1e-12, "MA sıfırı fₛ·k/M"); ok(d.zeros.length === 7, "MA 7 sıfır"); }
{ const d = K.design({ type: "biquad", fc: 50, Q: Math.SQRT1_2 }); near(K.freqResp(d.b, d.a, 50).mag, Math.SQRT1_2, 1e-12, "Butterworth −3 dB fₖ'de"); near(K.cutoff(d).f3, 50, 1e-3); }
{ const u = K.filterLab({ type: "reson", fc: 50, r: 1.01, fTest: 30, f0: 10, sigma: 1, seed: 1 }); ok(!u.stable && u.me === null && u.noise === null && u.grid.every((g) => g.me === null), "kararsız: ölçüm yok"); ok(Math.abs(u.decay - 1.01) < 1e-3, "büyüme oranı"); }
{ const u = K.filterLab({ type: "reson", fc: 50, r: 1, fTest: 30, f0: 10, sigma: 1, seed: 1 }); ok(!u.stable && u.me === null, "sınırda kararlı"); }
{ const a = K.noiseLab(K.design({ type: "ma", M: 8 }), { f0: 10, sigma: 1, seed: 3 }), b = K.noiseLab(K.design({ type: "ma", M: 8 }), { f0: 10, sigma: 1, seed: 3 }); ok(a.gain === b.gain, "tohum yeniden üretilebilir"); }
for (const bad of [() => K.design({ type: "sinc", taps: 50 }), () => K.design({ type: "x" }), () => K.design({ type: "iir1", fc: 600 }), () => K.samplingLab({ f: 0, fs: 20 }), () => K.besselJ(1.5, 2)]) { assert.throws(bad); checks++; }

console.log(`G sinyal işleme: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  ok(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`, import.meta.url)), "defter dosyası var");
  let browser; const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, locale: "tr-TR" });
      const page = await ctx.newPage();
      await page.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      page.setDefaultTimeout(20000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      await page.waitForTimeout(400);
      ok(await page.waitForSelector(".digest", { state: "visible", timeout: 8000 }).then(() => true, () => false), "Keşif Defteri görünür");
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { await page.waitForTimeout(60); const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = async (id, v) => { await page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v)); await page.waitForTimeout(150); };
      const select = async (id, v) => { await page.locator("#" + id).selectOption(String(v)); await page.waitForTimeout(200); };
      const click = async (id) => { await page.click("#" + id); await page.waitForTimeout(200); };
      const key = async (k) => { await page.evaluate(() => document.activeElement?.blur()); await page.keyboard.press(k); await page.waitForTimeout(200); };
      const noOverflow = async (label) => ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "yatay taşma yok: " + label);
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("main input,main select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id));
      ok(unlabeled.length === 0, "etiketsiz denetim: " + unlabeled.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-6; })), "varsayılanlar adım ızgarasında");
      ok(await page.evaluate(() => Object.isFrozen(window.SignalLab) && !Object.getOwnPropertyDescriptor(window, "SignalLab").writable), "çekirdek dondurulmuş (tarayıcı)");
      if (process.argv.includes("--dump") && width === 1280) {
        for (const t of ["samp", "dft", "mod", "filt"]) { await click("tab-" + t); console.log("== " + t, JSON.stringify(await page.evaluate((t) => Object.fromEntries([...document.querySelectorAll(`#panel-${t} strong[id], #panel-${t} output, #panel-${t} .sg-status, #panel-${t} tbody`)].map((e) => [e.id, e.textContent])), t), null, 1)); }
        await click("tab-samp");
      }
      // 1 · Örnekleme
      await has("sampFOut", "3,0 Hz"); await has("sampNyq", "10,0 Hz"); await has("sampAppTh", "3,000 Hz (k = 0)"); await has("sampAppMeas", "3,000 Hz"); await has("sampRecErr", "0,003"); await has("sampN", "160"); await has("sampWheelMeas", "+3,00 tur/s"); await has("sampWheelDir", "ileri");
      await has("qSqnrMeas", "49,79 dB"); await has("qSqnrTh", "49,93 dB"); await has("qDelta", "7,81 × 10⁻³");
      await click("sampAlias"); await has("sampAppTh", "3,000 Hz (k = 1)"); await has("sampAppMeas", "3,000 Hz"); await has("sampWheelTh", "−3,00 tur/s"); await has("sampWheelDir", "geri"); await has("sampStatus", "Örtüşme"); await has("sampRecErr", "1,000");
      await click("sampSync"); await has("sampAppMeas", "0,000 Hz"); await has("sampWheelDir", "duruyor"); await has("sampStatus", "tam katı");
      await click("sampPlus"); await has("sampWheelMeas", "+1,00 tur/s");
      await click("sampNyqBtn"); await has("sampFOut", "10,0 Hz"); await has("sampWheelDir", "belirsiz"); await has("sampStatus", "Tam Nyquist");
      await range("sampF", 50); await range("sampFs", 60); await has("sampAppTh", "10,000 Hz (k = 1)"); await range("sampF", 0.5); await range("sampFs", 5); await has("sampAppMeas", "0,500 Hz");
      await click("qCd"); await has("qSqnrTh", "98,09 dB"); await has("qSqnrMeas", "98,08 dB"); await click("qThree"); await has("qStatus", "3 bit"); await click("qQuiet"); await has("qAmpOut", "−30 dB");
      await range("qBits", 1); await range("qAmp", -40); await has("qStatus", "geçerli değil");
      await key("Space"); await has("sampPlay", "oynat"); await key("r"); await has("sampFOut", "3,0 Hz"); await has("sampPlay", "duraklat"); await has("qBitsOut", "8 bit"); await noOverflow("örnekleme");
      // 2 · DFT
      await click("tab-dft"); await page.waitForTimeout(300); await has("dftDf", "4,0000 Hz"); await has("dftBins", "25,500"); await has("dftPeakTh", "0,6366"); await has("dftPeakMeas", "0,641"); await has("dftF2Sep", "yok"); await has("dftOpsDft", "65\u202f536"); await has("dftOpsFft", "1024"); await has("dftOpsRatio", "64,0"); ok(/× 10⁻¹[³⁴⁵⁶⁷]/.test(await read("dftErr")), "FFT ≈ DFT: " + await read("dftErr"));
      await click("dftHannBtn"); await has("dftF2Sep", "var"); await has("dftPeakTh", "0,8488");
      await click("dftCenter"); await has("dftPeakMeas", "1,0000"); await has("dftStatus", "tepe genliği tam okunur"); await has("dftFpkErr", "0,000 Hz");
      await click("dftClose"); await has("dftF2Sep", "yok"); await has("dftStatus", "tek tepede"); await has("dftStatus", "ikinci tonun sızıntısı"); ok(!(await read("dftStatus")).includes("hiç sızıntı yok"), "yarım kutu iki tonda sızıntı yok denmez"); await has("dftGrid", "0,2500 Hz"); await select("dftN", 2048); await has("dftF2Sep", "var");
      await select("dftN", 4096); await has("dftOpsDft", "16 777 216".replace(/ /g, " ")); await has("dftOpsFft", "24 576".replace(/ /g, " "));
      await click("dftSquare"); await has("dftSqRows", "1,2753"); await has("dftStatus", "Kare dalga"); ok(await page.locator("#dftSqWrap").isVisible(), "kare tablosu görünür"); await select("dftN", 16); await has("dftSqRows", "N < P");
      await key("r"); await has("dftBins", "25,500"); ok(await page.locator("#dftSqWrap").isHidden(), "sıfırlamada tablo gizli");
      await click("dftReset"); await has("dftDf", "4,0000 Hz"); await noOverflow("dft");
      // 3 · AM/FM
      await click("tab-mod"); await page.waitForTimeout(300); await has("amCar", "1,0000"); await has("amSb", "0,2500 / 0,2500"); await has("amFrac", "11,111 %"); await has("amFracTh", "11,111 %"); await has("amEnvThd", "0,000 %"); await has("amCohA", "0,5000");
      await click("modAm15"); await has("amFrac", "52,941 %"); await has("amEnvThd", "28,1"); await has("amCohThd", "0,000 %"); await has("amEnvTh", "geçersiz"); await has("modStatus", "Aşırı modülasyon");
      await range("modPhi", 90); await has("amCohA", "0,0000"); await has("amCohThd", "—"); await has("modStatus", "tamamen");
      await click("modAm1"); await has("amFrac", "33,333 %");
      await click("modFmZero"); ok(await page.locator("#fmTableWrap").isVisible(), "FM tablosu"); await has("fmJ0", "0,00"); await has("modStatus", "J₀(β) ≈ 0"); await has("fmB98", "600 Hz"); await has("fmCarson", "681 Hz");
      await click("modFm5"); await has("fmB98", "1200 Hz"); await has("fmCarson", "1200 Hz"); await has("fmRows", "−0,17760"); await click("modFmNarrow"); await has("modStatus", "Çok dar bant"); await has("fmB98", "0 Hz"); await range("modBeta", 0.5); await has("modStatus", "β = 0,50");
      await range("modBeta", 10); await range("modFm", 200); await has("fmB98", "4400 Hz"); await range("modBeta", 0); await has("modStatus", "modülasyon yok");
      await click("modReset"); await has("amFrac", "11,111 %"); ok(await page.locator("#fmTableWrap").isHidden(), "AM'de tablo gizli"); await noOverflow("modülasyon");
      // 4 · Süzgeçler
      await click("tab-filt"); await page.waitForTimeout(300); await has("fHth", "0,9186"); await has("fHmeas", "0,9186"); await has("fHdiff", "0,0000 %"); await has("fPhMeas", "90,0°"); await has("f3db", "42,0 Hz"); await has("fPoleMax", "0 (FIR)"); await has("fDecay", "51 örnekte");
      await has("fSnrIn", "−2,94 dB"); await has("fGainMeas", "+10,58 dB"); await has("fGainTh", "+10,76 dB");
      await click("fPresetMa"); await has("fGainTh", "+8,94 dB"); await has("fStatus", "fₛ/M = 125,0 Hz"); ok(await page.locator("#fFc").isHidden(), "MA'da fₖ gizli");
      await click("fPresetBiq"); await has("fHth", "5,000"); await has("fHmeas", "5,000"); await has("fStatus", "rezonans");
      await click("fPresetUnstable"); await has("fStatus", "KARARSIZ"); await has("fHmeas", "—"); await has("fSnrOut", "—"); await has("fDecay", "1,0100"); await has("fNoiseStatus", "kararlı değil");
      await range("fR", 1); await has("fStatus", "SINIRDA"); await range("fR", 0.8); await has("fDecay", "0,8000");
      await select("fType", "iir1"); await range("fFc", 450); await has("f3db", "fₛ/2'ye kadar yok"); await has("fPoleMax", "0,0592");
      await click("filtReset"); const g1 = await read("fGainMeas"); await click("fSeed"); await has("fSeed", "tohum 2"); ok((await read("fGainMeas")) !== g1, "yeni tohum yeni gürültü");
      await click("filtReset"); await has("fHth", "0,9186"); await has("fSeed", "tohum 1"); await has("fGainMeas", "+10,58 dB"); await noOverflow("süzgeç");
      // Klavye
      await page.locator("#tab-filt").focus(); await page.keyboard.press("Home"); ok((await page.locator("#tab-samp").getAttribute("aria-selected")) === "true", "Home");
      await page.keyboard.press("ArrowLeft"); ok((await page.locator("#tab-filt").getAttribute("aria-selected")) === "true", "ArrowLeft sarar");
      await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-samp").getAttribute("aria-selected")) === "true", "ArrowRight sarar");
      await page.keyboard.press("End"); ok((await page.locator("#tab-filt").getAttribute("aria-selected")) === "true", "End");
      ok(errors.length === 0, "konsol/sayfa hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G sinyal işleme: ${checks - before} gerçek tarayıcı UI kontrolü PASS (390 px açık, 1280 px koyu)`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
