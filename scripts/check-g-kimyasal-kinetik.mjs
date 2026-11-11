// G · kimyasal-kinetik.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini YENİDEN KULLANMAZ:
// integral hız yasaları, ardışık tepkime ve tersinir tepkime kapalı biçimleri burada ayrıca yazılır; RK4 çapraz
// denetimi küçük adımlı açık Euler ile, Maxwell–Boltzmann kuyruğu tamamlanmamış gama fonksiyonunun sürekli
// kesir açılımıyla, OpenStax'tan açılan değerler (HI tablosu, yarılanma süreleri) tabloyla karşılaştırılır.
// Kullanım: node scripts/check-g-kimyasal-kinetik.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../kimyasal-kinetik.html", import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.KineticsLab;
let checks = 0;
const near = (actual, expected, tol = 1e-9, label = "") => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(1e-300, Math.abs(expected)) + (expected === 0 ? tol : 0), `${label} ${actual} ≠ ${expected} (tol ${tol})`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };
const Rg = 8.314462618;

ok(Object.isFrozen(K) && Object.isFrozen(K.HI_DATA), "çekirdek dondurulmuş");
near(K.R, 8.314462618, 0, "R (CODATA 2018 tam değer)");

/* ── 1. İntegral hız yasaları ── */
const integ = (n, k, a0, t) => n === 0 ? Math.max(0, a0 - k * t) : n === 1 ? a0 * Math.exp(-k * t) : 1 / (1 / a0 + k * t);
for (const n of [0, 1, 2]) for (const k of [1e-6, 0.1, 37]) for (const a0 of [1e-4, 0.0028, 1, 10]) {
  const s = K.simulateOrder({ order: n, k, A0: a0 });
  for (let i = 0; i <= s.n; i += 97) near(s.A[i], integ(n, k, a0, s.t[i]), 1e-9, `RK4 [A] n=${n}`);
  near(s.A[s.n], a0 / 8, 1e-9, "pencere sonu [A]₀/8");
  // yarılanma: kapalı biçimden bağımsız olarak türetilen süreler
  const t12 = n === 0 ? a0 / (2 * k) : n === 1 ? Math.log(2) / k : 1 / (k * a0);
  const t14 = n === 0 ? 3 * a0 / (4 * k) : n === 1 ? 2 * Math.log(2) / k : 3 / (k * a0);
  const hl = K.halfLives(s);
  near(hl.first, t12, 1e-9, "t½"); near(hl.second, t14 - t12, 1e-9, "ikinci yarılanma");
  near(K.halfLife(n, k, a0), t12, 1e-12);
  ok(K.closedError(s) < 1e-9, "RK4 − kapalı biçim");
  // gürültüsüz veri: doğru grafik R² = 1, eğim k
  const lin = K.linearize(K.noisyData(s, 0, 1));
  ok(lin.best === n, `gürültüsüz derece tanıma n=${n}`); near(lin.fits[n].r2, 1, 1e-9); near(lin.k[n], k, 1e-7, "eğimden k");
  for (let j = 0; j < 3; j++) if (j !== n) ok(lin.fits[j].r2 < 0.995, "yanlış grafik eğri");
}
// OpenStax 12.4 (açılan kaynak): yarılanmalar
near(K.halfLife(2, 5.76e-2 / 60, 0.200) / 60, 86.8, 1e-3, "bütadien t½ = 86.8 min");
near(K.halfLife(1, 3.21e-5, 1) / 3600, 6.00, 1e-3, "H2O2 t½ = 6.00 h");
ok(Math.abs(K.halfLife(0, 1.3e-6, 0.0028) / 60 - 18) < 0.1, "NH3 t½ ≈ 18 min");
near(Math.log(1 / 0.2) / 9.2e-3, 175, 1e-2, "siklobütan %80 ayrışma ≈ 1.7×10² s");
// küçük adımlı Euler ile bağımsız çapraz denetim (ikinci derece)
{ let a = 1, t = 0; const dt = 1e-5; while (t < 10 - 1e-12) { a -= 0.1 * a * a * dt; t += dt; } near(K.simulateOrder({ order: 2, k: 0.1, A0: 1 }).A[Math.round(10 / (70 / 2400))] , a, 2e-3, "Euler çapraz"); }
// gürültü: 1 % gürültüde derece tanıma 200 tohumda en az %97, k yansız
for (const n of [0, 1, 2]) {
  const s = K.simulateOrder({ order: n, k: 0.1, A0: 1 }); let hit = 0, sk = 0;
  for (let seed = 1; seed <= 200; seed++) { const l = K.linearize(K.noisyData(s, 0.01, seed)); if (l.best === n) hit++; sk += l.k[n]; }
  ok(hit >= 194, `1 % gürültüde tanıma n=${n}: ${hit}/200`); ok(Math.abs(sk / 200 - 0.1) < 0.004, `k ortalaması n=${n}: ${sk / 200}`);
}
// 5 % gürültüde derece tanıma (ağırlıklı uyum + [A] ölçeğinde artık): 200 tohumda en az %95; ağırlıksız R² ölçütü
// ikinci derecede çöker (doğrulayıcı bulgusu, 11 Kasım 2026)
for (const n of [0, 1, 2]) {
  const s = K.simulateOrder({ order: n, k: 0.1, A0: 1 }); let hit = 0, hitR2 = 0;
  for (let seed = 1; seed <= 200; seed++) { const l = K.linearize(K.noisyData(s, 0.05, seed)); if (l.best === n) hit++; if (l.bestR2 === n) hitR2++; }
  ok(hit >= 190, `5 % gürültüde tanıma n=${n}: ${hit}/200`); if (n === 2) ok(hitR2 < 60, "R² ölçütü 5 %'te ikinci dereceyi kaçırır: " + hitR2);
}
{ const a = K.noisyData(K.simulateOrder({ order: 1, k: 0.1, A0: 1 }), 0.01, 3), b = K.noisyData(K.simulateOrder({ order: 1, k: 0.1, A0: 1 }), 0.01, 3); ok(a.every((p, i) => p.c === b[i].c), "tohum belirleyici"); }
{ const f = K.lsq([0, 1, 2, 3, 4], [1, 3, 5, 7, 9]); near(f.slope, 2, 1e-12); near(f.intercept, 1, 1e-12); near(f.r2, 1, 1e-12); }
{ const q = K.quadFit([0, 0.5, 1, 2, 3], [2, 2.625, 4, 9, 17]); near(q.a, 2, 1e-10); near(q.b, 0.5, 1e-10); near(q.c, 1.5, 1e-10); }
for (const bad of [() => K.simulateOrder({ order: 3, k: 1, A0: 1 }), () => K.simulateOrder({ order: 1, k: 0, A0: 1 }), () => K.simulateOrder({ order: 1, k: 1, A0: -1 }), () => K.initialRateRun({ m: 1, n: 1, k: 1 }, 0, 1, 1), () => K.mechanism(0, 1), () => K.equilibrium(1, 0), () => K.catalysis(40, 10, 25, 31)]) { assert.throws(bad); checks++; }

/* ── 2. Başlangıç hızları ── */
const combos = new Set(); let rs2 = 0, rsn = 0;
for (let seed = 1; seed <= 40; seed++) {
  const L = K.hiddenLaw(seed); combos.add(L.m + "," + L.n);
  ok([0, 1, 2].includes(L.m) && [0, 1, 2].includes(L.n) && L.k >= 0.01 && L.k <= 1 && Number(L.k.toPrecision(2)) === L.k, "gizli yasa aralığı");
  for (const [a, b] of [[0.1, 0.1], [0.2, 0.1], [1, 0.05], [0.05, 1]]) {
    const e = K.initialRateRun(L, a, b, seed * 1000 + 7), r0 = L.k * a ** L.m * b ** L.n;
    near(e.r0true, r0, 1e-12); ok(Math.abs(e.r0meas / r0 - 1) < 0.07, `başlangıç hızı ${seed} ${a} ${b}: ${e.r0meas / r0}`); rs2 += (e.r0meas / r0 - 1) ** 2; rsn++;
    ok(e.converted > 0.03 && e.converted <= 0.0501, "dönüşüm ≈ %5");
  }
}
ok(Math.sqrt(rs2 / rsn) > 0.007 && Math.sqrt(rs2 / rsn) < 0.025, "başlangıç hızı göreli RMS hatası ≈ %1.5: " + Math.sqrt(rs2 / rsn));
{ // gürültüsüz: ölçüm yöntemi (parabol eğimi) yalnız gürültüyle bozulur; yanlılık 0.1 %'in altında
  let sb = 0, nb = 0; for (let seed = 1; seed <= 40; seed++) { const L = K.hiddenLaw(seed); for (let j = 0; j < 30; j++) { const e = K.initialRateRun(L, 0.3, 0.4, seed * 1000 + j); sb += e.r0meas / e.r0true - 1; nb++; } }
  ok(Math.abs(sb / nb) < 0.002, "başlangıç hızı yansız: " + sb / nb);
}
ok(combos.size === 9, "40 tohumda dokuz (m, n) birleşimi de çıkar: " + combos.size);
{ // gürültüsüz bağımsız başvuru: RK4 olmadan, P(t) = r0·t − ... ilk terim; yalnız gürültü ölçümü bozar
  const L = K.hiddenLaw(1); ok(L.m === 2 && L.n === 1 && L.k === 0.92, "varsayılan gizli yasa (tohum 1)");
  const e1 = K.initialRateRun(L, 0.1, 0.1, 1001), e2 = K.initialRateRun(L, 0.2, 0.1, 1002), e3 = K.initialRateRun(L, 0.2, 0.2, 1003);
  ok(Math.abs(K.pairOrder(e1, e2).order - 2) < 0.05 && K.pairOrder(e1, e2).which === "A", "m çiftten"); ok(Math.abs(K.pairOrder(e2, e3).order - 1) < 0.05 && K.pairOrder(e2, e3).which === "B", "n çiftten");
  ok(K.pairOrder(e1, e3) === null, "iki derişim birden değişince çift yok");
  const g = K.globalFit([e1, e2, e3]); ok(Math.abs(g.m - 2) < 0.05 && Math.abs(g.n - 1) < 0.05 && Math.abs(g.k / 0.92 - 1) < 0.05, "en küçük kareler");
  const c = K.checkGuess(L, 2, 1, 0.99); ok(c.mOk && c.nOk && c.kOk, "k %7.6 içinde kabul"); ok(!K.checkGuess(L, 2, 1, 1.02).kOk, "k %10.9 dışarıda"); ok(!K.checkGuess(L, 1, 1, 0.92).mOk, "m yanlış");
  // tekrarlanan deney farklı gürültü, aynı tohum aynı sonuç
  ok(K.initialRateRun(L, 0.1, 0.1, 5).r0meas !== K.initialRateRun(L, 0.1, 0.1, 6).r0meas && K.initialRateRun(L, 0.1, 0.1, 5).r0meas === K.initialRateRun(L, 0.1, 0.1, 5).r0meas, "tohum");
}

/* ── 3. Arrhenius ve Maxwell–Boltzmann ── */
{
  const Ts = [293.15, 308.15, 323.15, 338.15, 353.15];
  for (const Ea of [10e3, 50e3, 200e3]) for (const lnA of [6, 10, 14].map(x => x * Math.LN10)) {
    const ks = Ts.map(T => K.measureK(Math.exp(lnA - Ea / (Rg * T)), 0, 1).k), f = K.arrheniusFit(Ts, ks);
    near(f.Ea, Ea, 1e-7, "gürültüsüz Eₐ"); near(f.lnA, lnA, 1e-7, "gürültüsüz ln A");
  }
  // 1 % gürültüde 300 tohum: Eₐ yansız, standart hata kapsaması makul
  let in2 = 0, sum = 0; const N = 300;
  for (let seed = 1; seed <= N; seed++) { const ks = Ts.map((T, i) => K.measureK(1e10 * Math.exp(-50e3 / (Rg * T)), 0.01, seed * 100 + i).k), f = K.arrheniusFit(Ts, ks); sum += f.Ea; if (Math.abs(f.Ea - 50e3) < 2.6 * f.seEa) in2++; }
  ok(Math.abs(sum / N - 50e3) < 150, "Eₐ yansız: " + sum / N); ok(in2 / N > 0.85, "2σ kapsama " + in2 / N);
  // OpenStax 12.5 HI tablosu: kendi en küçük karelerimiz
  near(K.HI_DATA[0][0], 555, 0); near(K.HI_DATA[0][1], 3.52e-7, 0); near(K.HI_DATA[4][0], 781, 0); near(K.HI_DATA[4][1], 3.95e-2, 0); near(K.HI_DATA[2][1], 8.59e-5, 0);
  const x = K.HI_DATA.map(r => 1 / r[0]), y = K.HI_DATA.map(r => Math.log(r[1])), mx = x.reduce((a, b) => a + b) / 5, my = y.reduce((a, b) => a + b) / 5;
  const slope = x.reduce((s, xi, i) => s + (xi - mx) * (y[i] - my), 0) / x.reduce((s, xi) => s + (xi - mx) ** 2, 0);
  near(K.arrheniusFit(K.HI_DATA.map(r => r[0]), K.HI_DATA.map(r => r[1])).Ea, -slope * Rg, 1e-10, "HI Eₐ");
  ok(Math.abs(-slope * Rg / 1e3 - 185.3) < 0.05 && Math.abs(-slope * Rg / 1e3 - 180) / 180 < 0.04, "HI Eₐ ≈ 185 kJ/mol, kitabın 180'ine %3 içinde");
  // OpenStax ln k sütunu
  [-14.860, -13.617, -9.362, -6.759, -3.231].forEach((v, i) => near(y[i], v, 3e-4, "ln k tablo (kitap 3 ondalık)"));
}
for (const T of [273.15, 298.15, 373.15, 473.15]) {
  near(K.q10(K.eaDouble(T), T), 2, 1e-12, "iki kat Eₐ");
  for (const Ea of [20e3, 50e3, 150e3]) near(K.q10(Ea, T), K.arrK(1, Ea, T + 10) / K.arrK(1, Ea, T), 1e-12, "on derece oranı");
}
near(K.eaDouble(298.15) / 1e3, 52.95, 1e-3, "25 °C'de iki kat için ≈ 52.9 kJ/mol");
ok(K.q10(50e3, 373.15) < 1.6 && K.q10(50e3, 273.15) > 2.1, "aynı Eₐ'da oran sıcaklıkla küçülür");
// erfc: bilinen değerler
near(K.erfc(0.5), 0.4795001221869535, 2e-7); near(K.erfc(1), 0.1572992070502851, 2e-7); near(K.erfc(2), 0.004677734981047266, 2e-7); near(K.erfc(3), 2.209049699858544e-5, 2e-7); near(K.erfc(-1), 1.8427007929497148, 2e-7);
// Q(3/2, x) sürekli kesir (Lentz) — bağımsız kuyruk
function gammaQ32(x) {
  const a = 1.5, tiny = 1e-300; let b = x + 1 - a, c = 1 / tiny, d = 1 / b, h = d;
  for (let i = 1; i < 300; i++) { const an = -i * (i - a); b += 2; d = an * d + b; if (Math.abs(d) < tiny) d = tiny; c = b + an / c; if (Math.abs(c) < tiny) c = tiny; d = 1 / d; const del = d * c; h *= del; if (Math.abs(del - 1) < 1e-15) break; }
  return Math.exp(-x + a * Math.log(x)) * h / (Math.sqrt(Math.PI) / 2);
}
for (const T of [273.15, 298.15, 400, 600]) for (const Ea of [10e3, 20e3, 50e3, 100e3, 200e3]) {
  const x = Ea / (Rg * T), ref = gammaQ32(x);
  near(K.tailSimpson(Ea, T), ref, 1e-9, `Simpson kuyruk x=${x.toFixed(1)}`); near(K.tailExact(Ea, T), ref, 3e-7, "erfc kuyruk");
  ok(K.tailExact(Ea, T) > Math.exp(-x), "3B kuyruk e^(−x)'ten büyük");
}
{ // dağılım normalize, ortalama 3/2 RT (yamuk kuralı, √ tekilliği için E = u² dönüşümü)
  const T = 300, RT = Rg * T; let s0 = 0, s1 = 0; const n = 20000, umax = Math.sqrt(60 * RT), du = umax / n;
  for (let i = 1; i <= n; i++) { const u = i * du, E = u * u, w = (i === n ? 0.5 : 1) * K.mbDensity(E, T) * 2 * u * du; s0 += w; s1 += w * E; }
  near(s0, 1, 1e-6, "MB normalize"); near(s1 / RT, 1.5, 1e-5, "ortalama enerji 3/2 RT");
}

/* ── 4. A → I → P ve A ⇌ B ── */
const consec = (k1, k2, t) => { const A = Math.exp(-k1 * t), I = k1 === k2 ? k1 * t * Math.exp(-k1 * t) : k1 / (k2 - k1) * (Math.exp(-k1 * t) - Math.exp(-k2 * t)); return [A, I, 1 - A - I]; };
for (const [l1, l2] of [[0, 1], [0, 1.5], [0, 0], [0.5, -0.5], [-1, 1.5], [1.5, -1], [0.3, 0.35]]) {
  const k1 = 10 ** l1, k2 = 10 ** l2, r = K.mechanism(k1, k2, 1);
  ok(r.err < 1e-8, "RK4 − tam çözüm " + r.err);
  for (const q of r.series.filter((_, i) => i % 37 === 0)) { const e = consec(k1, k2, q[0]); ok(Math.abs(q[1] - e[0]) < 1e-8 && Math.abs(q[2] - e[1]) < 1e-8 && Math.abs(q[3] - e[2]) < 1e-8, "seri = tam çözüm"); }
  // tepe: türevin sıfırı, bağımsız ikiye bölme
  let lo = 1e-9, hi = 50 / Math.min(k1, k2); for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2, d = k1 * Math.exp(-k1 * m) - k2 * consec(k1, k2, m)[1]; if (d > 0) lo = m; else hi = m; }
  near(r.peak.t, lo, 1e-7, "tepe anı"); near(r.peak.I, consec(k1, k2, lo)[1], 1e-9, "tepe değeri");
  near(r.exactPeak.t, lo, 1e-9); near(r.exactPeak.I, consec(k1, k2, lo)[1], 1e-12);
  // [P] = 1/2 anı
  lo = 0; hi = 50 / Math.min(k1, k2); for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (consec(k1, k2, m)[2] < 0.5) lo = m; else hi = m; }
  near(r.tP, lo, 1e-8, "[P] yarı anı");
  // kararlı durum hatası: ince ızgarada max |P − (1 − e^(−k1 t))|
  let mx = 0; for (let i = 0; i <= 20000; i++) { const t = r.T * i / 20000; mx = Math.max(mx, Math.abs(consec(k1, k2, t)[2] - (1 - Math.exp(-k1 * t)))); }
  near(r.ssa, mx, 2e-4, "SSA hatası");
  ok(r.h * Math.max(k1, k2) <= 0.025 + 1e-12, "adım sınırı");
}
ok(K.mechanism(1, 10 ** 1.5).ssa < 0.03 && K.mechanism(10 ** 0.5, 10 ** -0.5).ssa > 0.7, "SSA k2≫k1'de tutar, k1≫k2'de çöker");
{ let a = 1, i = 0, t = 0, pk = 0; const dt = 2e-6; while (t < 0.6) { const da = -a, di = a - 10 * i; a += da * dt; i += di * dt; t += dt; pk = Math.max(pk, i); } near(K.mechanism(1, 10).peak.I, pk, 1e-4, "Euler tepe"); }
for (const [kf, kr] of [[0.30793, 0.13743], [5, 5], [1e-6, 3e-6], [200, 1]]) {
  const r = K.equilibrium(kf, kr), s = kf + kr;
  near(r.Kmeas, kf / kr * (1 - Math.exp(-10)) / (1 + kf / kr * Math.exp(-10)), 1e-8, "plato (10τ sonunda)");
  near(r.tau, 1 / s, 1e-8, "durulma süresi"); ok(r.err < 1e-9, "RK4 tersinir");
}
{
  const c = K.catalysis(60, -2, 25, 15), T = 298.15;
  near(c.kf, 1e10 * Math.exp(-60e3 / (Rg * T)), 1e-12); near(c.kr, 1e10 * Math.exp(-62e3 / (Rg * T)), 1e-12);
  near(c.kfc / c.kf, Math.exp(15e3 / (Rg * T)), 1e-12, "ileri hızlanma"); near(c.krc / c.kr, Math.exp(15e3 / (Rg * T)), 1e-12, "geri hızlanma");
  near(c.K, c.Kc, 1e-12, "K katalizörden bağımsız"); near(c.K, Math.exp(2e3 / (Rg * T)), 1e-12, "K = e^(−ΔH/RT)");
  near(c.kf, 0.307932, 1e-5); near(c.speed, 424.508, 1e-5);
}
console.log(`G kimyasal-kinetik: ${checks.toLocaleString("tr-TR")} bağımsız kapalı biçim, Euler çapraz, sürekli kesir ve istatistik denetimi PASS`);

/* ── Tarayıcı ── */
if (process.argv.includes("--browser")) {
  const { createRequire } = await import("node:module");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const { chromium } = createRequire(join(root, "package.json"))("playwright");
  const server = createServer((req, res) => {
    const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
    res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream");
    res.end(fs.readFileSync(file));
  });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  let browser;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const before = checks;
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width === 390 ? 2 : 1, locale: "tr-TR" });
      await ctx.addInitScript(t => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(6000);
      const errors = []; page.on("pageerror", e => errors.push(e.message)); page.on("console", m => { if (m.type() === "error" && !/404/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/kimyasal-kinetik.html`);
      const click = id => page.locator("#" + id).click(), read = async id => (await page.locator("#" + id).textContent()).trim();
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `[${width}] #${id}: "${t}" içinde "${text}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, v);
      const pick = (id, v) => page.locator("#" + id).selectOption(v);
      const type = async (id, v) => { await page.locator("#" + id).fill(v); await page.locator("#" + id).dispatchEvent("change"); };
      const eq = (a, b, label) => { assert.equal(a, b, `[${width}] ${label || ""}`); checks++; };
      const clean = async sel => { const t = await page.locator(sel).innerText(); assert(!/NaN|Infinity|undefined|null/.test(t), `[${width}] ${sel} bozuk sayı: ${t.match(/.{0,30}(NaN|Infinity|undefined|null).{0,30}/)?.[0]}`); checks++; };
      const noOverflow = async () => eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "yatay taşma");
      const drawn = async ids => { for (const id of ids) eq(await page.evaluate(id => { const c = document.getElementById(id), d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++; return n > 500; }, id), true, id + " boş"); };

      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content input, .app-content select")].filter(e => !document.querySelector(`label[for="${e.id}"]`)).length), 0, "etiketsiz denetim");
      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].filter(c => c.getAttribute("role") !== "img" || !c.getAttribute("aria-label")).length), 0, "rolsüz tuval");
      eq(await page.evaluate(() => Object.isFrozen(KineticsLab) && !Object.getOwnPropertyDescriptor(window, "KineticsLab").writable), true, "çekirdek salt okunur");
      eq(await page.evaluate(() => /[̀-ͯ]/.test(document.querySelector(".app-content").innerText)), false, "birleşik işaret yok");

      /* 01 */
      await has("oT12", "6.931 s"); await has("oT12Th", "fark 0.00 %"); await has("oT12b", "6.931 s"); await has("oR1", "0.99676"); await has("oBest", "1. derece"); await has("oBestK", "fark +0.97 %"); await has("oStatus", "doğru tanındı");
      await pick("oOrder", "0"); await has("oT12", "5.000 s"); await has("oT12bTh", "ikinci/birinci 0.500"); await has("oBest", "0. derece"); await has("oKUnit", "mol/(L·s)"); await has("oRows", "10.00 s");
      await pick("oOrder", "2"); await has("oT12", "10.00 s"); await has("oT12bTh", "ikinci/birinci 2.000"); await has("oBest", "2. derece"); await has("oRows", "20.00 s");
      await pick("oPreset", "c4h6"); await has("oT12", "86.81 min"); eq(await page.locator("#oK").inputValue(), "9.6e-4", "hazır k");
      await pick("oPreset", "nh3"); await has("oT12", "17.95 min"); await has("oBest", "0. derece"); await pick("oPreset", "h2o2"); await has("oT12", "5.998 h"); await pick("oPreset", "c4h8"); await has("oT12", "75.34 s");
      await type("oK", "abc"); await has("oStatus", "Geçersiz giriş"); eq(await page.locator("#oK").inputValue(), "9.2e-3", "önceki k"); eq(await page.locator("#oPreset").inputValue(), "custom", "elle ayara geçer");
      await type("oA0", "0,5"); eq(await page.locator("#oA0").inputValue(), "0.5", "ondalık virgül"); await type("oA0", "50"); eq(await page.locator("#oA0").inputValue(), "10", "üst sınır"); await has("oStatus", "aralığa çekildi");
      await type("oK", "1e-12"); eq(await page.locator("#oK").inputValue(), "1e-9", "k alt sınır"); await clean("#panel-ord");
      await type("oK", "1e9"); await pick("oOrder", "0"); await type("oA0", "0.0001"); await clean("#panel-ord"); await has("oT12", "ns");
      await range("oNoise", 5); await clean("#panel-ord"); await range("oNoise", 0); await has("oR1", "0.9"); await clean("#panel-ord");
      await click("oReset"); await pick("oOrder", "2"); await range("oNoise", 5); await has("oBest", "2. derece"); await has("oStatus", "en yüksek R² ise ln[A]–t"); await has("oR1", "0.73775");
      await click("oReset"); await has("oT12", "6.931 s"); eq(await page.locator("#oK").inputValue(), "0.1", "sıfırla k"); await has("oNoiseOut", "1.0 %");
      await click("oPlay"); await has("oPlay", "Duraklat"); await page.waitForTimeout(400); await has("oCurA", "kapalı biçim"); await page.locator("h1").click(); await page.keyboard.press("Space"); await has("oPlay", "Devam et");
      await page.keyboard.press("r"); await has("oCurT", "—"); await page.locator("#oNoise").focus(); await page.keyboard.press("Space"); await has("oPlay", "Oynat");
      await drawn(["oChart", "oLin0", "oLin1", "oLin2"]); await noOverflow();

      /* 02 */
      await click("tab-ini"); await has("iStatus", "Gizli tepkime no 1 hazır"); await has("iPair", "—");
      await click("iRun"); await range("iA", 0.2); await click("iRun"); await has("iPair", "m ≈ 2.0"); await range("iB", 0.2); await click("iRun"); await has("iPair", "n ≈ 0.9");
      eq(await page.locator("#iRows tr").count(), 3, "üç deney"); await has("iRows", "9.26×10⁻⁴");
      await click("iCheck"); await has("iStatus", "Önce m ve n");
      await pick("iM", "2"); await pick("iN", "1"); await has("iKUnit", "L²/(mol²·s)"); await has("iKFromGuess", "L²/(mol²·s)");
      await type("iK", "0,95"); await click("iCheck"); await has("iStatus", "Tebrikler"); await type("iK", "1.2"); await click("iCheck"); await has("iStatus", "10 %'ten fazla");
      await pick("iM", "1"); await click("iCheck"); await has("iStatus", "m yanlış");
      await click("iReveal"); await has("iStatus", "Gizli yasa: hız = 0.92"); await has("iStatus", "en küçük kareler");
      await page.locator("h1").click(); for (let i = 0; i < 8; i++) await page.keyboard.press("Space"); eq(await page.locator("#iRows tr").count(), 10, "en çok 10"); await has("iStatus", "Defter dolu");
      await range("iA", 1); await range("iB", 0.05); await clean("#panel-ini");
      await click("iClear"); eq(await page.locator("#iRows tr").count(), 0, "temizle");
      await range("iSeed", 40); await click("iRun"); await clean("#panel-ini"); await range("iSeed", 2); eq(await page.locator("#iRows tr").count(), 0, "yeni yasa defteri temizler");
      await click("iReset"); await has("iSeedOut", "1"); await has("iAOut", "0.10 mol/L"); eq(await page.locator("#iM").inputValue(), "", "sıfırla m");
      await page.keyboard.press("r"); await click("iRun"); await drawn(["iChart", "iLog"]); await noOverflow();

      /* 03 */
      await click("tab-arr"); await has("aEaMeas", "49.81 ± 0.51 kJ/mol"); await has("aEaTh", "fark −0.39 %"); await has("aQ10", "× 1.924"); await has("aEa2", "52.9 kJ/mol");
      await has("aFNum", "9.028×10⁻⁹"); await has("aFEx", "9.028×10⁻⁹"); await has("aFB", "1.739×10⁻⁹"); await has("aFRatio", "× 1.894"); await has("aStatus2", "kabaca tutuyor");
      await pick("aSrc", "hi"); await has("aEaMeas", "185.31"); await has("aEaTh", "180"); eq(await page.locator("#aT1").isDisabled(), true, "HI'de sıcaklıklar kilitli"); await has("aRows", "3.520×10⁻⁷");
      await pick("aSrc", "sim"); await range("aNoise", 0); await has("aEaMeas", "50.00 ± 0.00"); await range("aEa", 200); await range("aTref", 0); await clean("#panel-arr"); await has("aStatus2", "tutmuyor");
      await range("aEa", 10); await range("aTref", 200); await clean("#panel-arr");
      await range("aT1", 290); await has("aT2Out", "300 °C"); await range("aT2", 10); await has("aT1Out", "0 °C"); await clean("#panel-arr");
      await click("aReset"); await has("aEaOut", "50 kJ/mol"); await has("aT2Out", "80 °C"); await has("aEaMeas", "49.81");
      await drawn(["aChartK", "aChartArr", "aChartMB"]); await noOverflow();

      /* 04 */
      await click("tab-mech"); await has("mImax", "0.0774 mol/L"); await has("mTmax", "255.8 ms"); await has("mSsa", "7.74 %"); await has("mTPInfo", "fark +0.67 %"); await has("mStatus", "iyi işler");
      await has("eKmeas", "2.240"); await has("eSpeed", "× 424.5 · × 424.5"); await has("eTau", "2.245 s · 5.289 ms");
      await click("mPreSlow"); await has("mStatus", "çöker"); await has("mImax", "0.7743"); await click("mPreEq"); await has("mImax", "0.3679"); await has("mStatus", "aynı büyüklükte");
      await click("mPreFaster"); await has("mSsa", "2.82 %"); await range("mK1", -1); await range("mK2", 1.5); await clean("#panel-mech"); await range("mK1", 1.5); await range("mK2", -1); await clean("#panel-mech");
      await range("eDEa", 0); await has("eStatus", "katalizör yok"); await range("eDH", 0); await has("eKmeas", "0.9999"); await has("eKmeasInfo", "= 1.000"); await range("eEa", 100); await range("eT", 0); await range("eDEa", 30); await range("eDH", 10); await clean("#panel-mech"); await has("eTau", "gün");
      await range("eEa", 40); await has("eStatus", "20 kJ/mol'e çekildi"); await has("eDEaOut", "20 kJ/mol"); await range("eT", 100); await range("eDH", -10); await clean("#panel-mech");
      await click("mReset"); await has("mK2Out", "10.0 s⁻¹"); await has("eDEaOut", "15 kJ/mol"); await has("mImax", "0.0774");
      await page.locator("h1").click(); await page.keyboard.press("Space"); await has("mPlay", "Duraklat"); await page.waitForTimeout(300); await has("mCurV", "[I]"); await page.keyboard.press("r"); await has("mCurT", "—");
      await drawn(["mChart", "eProfile", "eChart"]); await noOverflow();

      // sekme klavyesi
      await page.locator("#tab-mech").focus(); await page.keyboard.press("Home"); eq(await page.locator("#tab-ord").getAttribute("aria-selected"), "true", "Home");
      await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-ini").getAttribute("aria-selected"), "true", "sağ ok"); eq(await page.locator("#panel-ini").isVisible(), true, "panel görünür");
      await page.keyboard.press("End"); eq(await page.locator("#tab-mech").getAttribute("aria-selected"), "true", "End"); await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-ord").getAttribute("aria-selected"), "true", "sarma");
      await page.keyboard.press("ArrowLeft"); eq(await page.locator("#tab-mech").getAttribute("aria-selected"), "true", "sol ok"); eq(await page.locator("#tab-ord").getAttribute("tabindex"), "-1", "tabindex");
      await noOverflow();
      assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      console.log(`G kimyasal-kinetik: ${width} px ${theme} · ${checks - before} arayüz denetimi PASS`);
      await ctx.close();
    }
  } finally { await browser?.close(); await new Promise(r => server.close(r)); }
}
