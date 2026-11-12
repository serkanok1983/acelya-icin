// G · kara-cisim-isimasi.html kalıcı denetimi.
// Sayfada KERNEL sınırları yok: hesap çekirdeği, betiğin "/* ── Model ── */" ile "/* ── Ortak arayüz ── */" arasındaki
// DOM'suz bölümüdür (model + biçim yardımcıları). Bu bölüm sayfadan okunup bir işlevin içinde çalıştırılır.
// Başvurular sayfanın formüllerini yeniden kullanmaz: CODATA 2018 σ = 5,670374419 × 10⁻⁸ W m⁻² K⁻⁴,
// b = 2,897771955 × 10⁻³ m K ve ν_max/T = 5,878925757 × 10¹⁰ Hz/K (physics.nist.gov); Planck yasasının doğrudan
// (logaritmasız) biçimi; x³/(eˣ − 1)'in bu dosyadaki kendi Simpson integrali (π⁴/15); türev köklerinin ikiye bölmeyle
// bulunması; görünür ve 4 µm paylarının x değişkeninde kendi integralimiz; CIE 1931 Planck eğrisinin yayımlanmış
// renklilikleri (A ışıklandırıcısı, 3000/5000/6500/10000 K) ve D65 beyazının sRGB'de (1, 1, 1) çıkması; gezegen denge
// sıcaklığının enerji dengesinden (1 − A)S/4 = σT⁴ doğrudan çözümü ve NASA'nın gezegen bilgi sayfalarındaki kara cisim
// sıcaklıkları (Venüs 226,6 K, Mars 209,8 K; Dünya 254,0 K eski A = 0,306 ile), Mars ortalama yüzeyi ≈ 214 K.
// Kullanım: node scripts/check-g-kara-cisim-isimasi.mjs [--browser] [--dump]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "kara-cisim-isimasi";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* ── Model ── */")[1]?.split("/* ── Ortak arayüz ── */")[0];
assert(source, "Model / Ortak arayüz sınırları gerekli");
assert(!/document\.|window\./.test(source), "model bölümü DOM'a dokunmamalı");
const EXPORTS = ["H", "C", "KB", "SIGMA", "C2", "X5", "X4", "X3", "B_WIEN", "NU_WIEN", "T_SUN", "R_SUN", "AU", "K_M", "lnExpm1",
  "lnPlanckLam", "lnRJLam", "lnWienLam", "lnPlanckNu", "lnRJNu", "lnWienNu", "findPeak", "exitanceNum", "lnBandNum", "lnVisFracNum",
  "lnFracBelow", "lnVisFracSeries", "CIE", "CIE_N", "cmfAt", "xyzFromLn", "linRGB", "gammaSRGB", "bodyColour", "lvResolved",
  "lnLuminance", "PLANCK_LOCUS", "PLANCK_INF", "makeGrid", "nearestIndex", "BODIES", "PLANETS", "tEqFormula", "solveTeqNum",
  "fix", "sgn", "sig", "sciLn", "numLn", "fmtLen", "fmtFreq", "fmtFlux", "fmtT", "fmtPctLn", "pctDiff"];
const K = new Function(`"use strict";${source}\nreturn {${EXPORTS.join(",")}};`)();
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1e-300, Math.abs(b)), `${label} ${a} ≠ ${b} (göreli ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };

/* ── Kabuk ── */
ok(/<body class="app-page" data-page="kara-cisim-isimasi">/.test(html), "data-page");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Kara Cisim Işıması: ") && [...title].length <= 80, "başlık biçimi ve uzunluğu");
ok(/name="description"/.test(html) && /viewport-fit=cover/.test(html) && /shared\/theme\.css/.test(html) && /shared\/app\.js/.test(html), "meta, viewport, theme.css, app.js");
ok(/<div class="app-content">/.test(html) && (html.match(/<p class="hint">/g) || []).length === 1, "app-content ve tek hint");
ok(!/fonts\.googleapis|cdn\.|unpkg|jsdelivr|<script src="http/.test(html), "CDN yok");
// görünen metin (betik dışı) birleşik işaretsiz; betikteki tek örnekler bir yorum ve tuvalin aria-label'ı (ekranda çizilmez)
ok(!/[̀-ͯ⃗]/.test(html.replace(/<script>[\s\S]*?<\/script>/g, "")), "birleşik işaret yok (görünen metin)");
ok(!/(fillText|rich|tag)\([^)]*[̀-ͯ⃗]/.test(html), "tuval metninde birleşik işaret yok");
ok(!/\p{Extended_Pictographic}/u.test(html), "emoji yok (★ ve ☉ astronomi simgeleri serbest)");
ok(!/type="number"/.test(html), "type=number yok");
ok(!/body\s*\{[^}]*overflow\s*:\s*hidden/.test(html), "body overflow:hidden yok");

/* Bağımsız başvurular */
const h = 6.62607015e-34, c = 299792458, kB = 1.380649e-23;               // SI 2019 tam değerler
const SIGMA_CODATA = 5.670374419e-8, B_CODATA = 2.897771955e-3, NU_CODATA = 5.878925757e10; // CODATA 2018 (NIST)
function simpson(f, a, b, n) { const s = (b - a) / n; let t = f(a) + f(b); for (let i = 1; i < n; i++) t += f(a + i * s) * (i % 2 ? 4 : 2); return t * s / 3; }
function bisect(f, a, b, it = 200) { let fa = f(a); for (let i = 0; i < it; i++) { const m = (a + b) / 2, fm = f(m); if ((fm > 0) === (fa > 0)) { a = m; fa = fm; } else b = m; } return (a + b) / 2; }
const planckLam = (lam, T) => 2 * h * c * c / lam ** 5 / Math.expm1(h * c / (lam * kB * T));     // doğrudan biçim
const planckNu = (nu, T) => 2 * h * nu ** 3 / (c * c) / Math.expm1(h * nu / (kB * T));
// x³/(eˣ − 1)'in [x1, x2] integrali, ln biçiminde (küçük paylar alttan taşmasın): kendi Simpson'ımız, x'te doğrusal
function lnPlanckIntX(x1, x2, n = 20000) {
  const s = (x2 - x1) / n, ln = (x) => 3 * Math.log(x) - (x > 40 ? x : Math.log(Math.expm1(x)));
  let m = -Infinity; const v = new Float64Array(n + 1);
  for (let i = 0; i <= n; i++) { v[i] = ln(x1 + i * s); if (v[i] > m) m = v[i]; }
  let t = 0; for (let i = 0; i <= n; i++) t += Math.exp(v[i] - m) * (i === 0 || i === n ? 1 : i % 2 ? 4 : 2);
  return m + Math.log(t * s / 3);
}
const PI4_15 = Math.PI ** 4 / 15;

/* ── 1 · Sabitler ── */
{
  near(K.SIGMA, SIGMA_CODATA, 2e-10, "σ (CODATA 2018)");
  near(K.B_WIEN, B_CODATA, 2e-10, "Wien b (CODATA 2018)");
  near(K.NU_WIEN, NU_CODATA, 2e-10, "ν_max/T (CODATA 2018)");
  // türev kökleri, ikiye bölmeyle: x = n(1 − e⁻ˣ)
  for (const [n, X] of [[5, K.X5], [4, K.X4], [3, K.X3]]) near(X, bisect((x) => x - n * (1 - Math.exp(-x)), 1, 10), 1e-13, `x${n} kökü`);
  near(K.C2, h * c / kB, 1e-15, "c₂"); near(K.T_SUN, 5772, 0, "T☉ IAU 2015"); near(K.R_SUN, 6.957e8, 0, "R☉ IAU 2015"); near(K.AU, 149597870700, 0, "au IAU 2012");
  near(K.K_M, 683, 0, "K_m");
  // kendi integralimiz π⁴/15'i bulur (yöntemin kendisi sınanır)
  near(Math.exp(lnPlanckIntX(1e-9, 60, 40000)), PI4_15, 1e-9, "∫x³/(eˣ−1) = π⁴/15");
}

/* ── 2 · Planck yasası ve yaklaşımlar ── */
{
  for (const T of [2.7255, 50, 310, 1000, 2700, 5772, 12100, 30000]) for (const x of [1e-4, 0.01, 0.3, 1, 2.8, 4.965, 10, 50, 300]) {
    const lam = h * c / (x * kB * T), nu = x * kB * T / h;
    if (x < 600) {
      near(Math.exp(K.lnPlanckLam(lam, T)), planckLam(lam, T), 1e-11, `B_λ T=${T} x=${x}`);
      near(Math.exp(K.lnPlanckNu(nu, T)), planckNu(nu, T), 1e-11, `B_ν T=${T} x=${x}`);
      near(Math.exp(K.lnRJLam(lam, T)), 2 * c * kB * T / lam ** 4, 1e-11, "Rayleigh–Jeans λ");
      near(Math.exp(K.lnRJNu(nu, T)), 2 * nu * nu * kB * T / (c * c), 1e-11, "Rayleigh–Jeans ν");
      near(Math.exp(K.lnWienLam(lam, T)), 2 * h * c * c / lam ** 5 * Math.exp(-x), 1e-11, "Wien λ");
      near(Math.exp(K.lnWienNu(nu, T)), 2 * h * nu ** 3 / (c * c) * Math.exp(-x), 1e-11, "Wien ν");
      // B_λ |dλ| = B_ν |dν|
      near(Math.exp(K.lnPlanckLam(lam, T)) * lam * lam / c, Math.exp(K.lnPlanckNu(c / lam, T)), 1e-11, "B_λ λ²/c = B_ν");
    }
  }
  // büyük x'te taşma yok: ln B = ln(2hc²/λ⁵) − x
  { const T = 300, lam = 1e-8, x = h * c / (lam * kB * T); near(K.lnPlanckLam(lam, T), Math.log(2 * h * c * c) - 5 * Math.log(lam) - x, 1e-14, "x ≈ 4800 taşmasız"); }
  near(K.lnExpm1(1e-8), Math.log(1e-8 + 5e-17), 1e-14, "ln(eˣ−1) küçük x"); near(K.lnExpm1(800), 800, 1e-15, "ln(eˣ−1) büyük x");
}

/* ── 3 · Tepeler: Wien yer değiştirme yasası ── */
{
  for (const T of [2.7255, 100, 310, 1000, 2700, 3600, 5772, 9940, 12100, 30000, 50000]) {
    // kendi kökümüz: d ln B_λ/dλ = 0 ve d ln B_ν/dν = 0'ın sayısal türevlerinin ikiye bölmeyle kökü
    const dl = (lam) => { const e = 1e-6; return Math.log(planckLam(lam * (1 + e), T)) - Math.log(planckLam(lam * (1 - e), T)); };
    const dn = (nu) => { const e = 1e-6; return Math.log(planckNu(nu * (1 + e), T)) - Math.log(planckNu(nu * (1 - e), T)); };
    const lamRef = bisect(dl, 0.5 * B_CODATA / T, 2 * B_CODATA / T, 80), nuRef = bisect(dn, 0.5 * NU_CODATA * T, 2 * NU_CODATA * T, 80);
    near(lamRef, B_CODATA / T, 1e-8, "kendi kökümüz b/T"); near(nuRef, NU_CODATA * T, 1e-8, "kendi kökümüz ν_max");
    const pl = K.findPeak((l) => K.lnPlanckLam(l, T), 1e-8, 10), pn = K.findPeak((n) => K.lnPlanckNu(n, T), c / 10, c / 1e-8);
    near(pl.at, B_CODATA / T, 2e-7, `λ_max T=${T}`); near(pn.at, NU_CODATA * T, 2e-7, `ν_max T=${T}`);
    near(Math.exp(pl.ln), planckLam(B_CODATA / T, T), 1e-9, "tepe yüksekliği B_λ(b/T)");
    // tepe yüksekliği ∝ T⁵ (λ), ∝ T³ (ν)
    near(Math.exp(pl.ln) / T ** 5, planckLam(B_CODATA / 1000, 1000) / 1000 ** 5, 1e-9, "B_λ,max ∝ T⁵");
    near(Math.exp(pn.ln) / T ** 3, planckNu(NU_CODATA * 1000, 1000) / 1000 ** 3, 1e-9, "B_ν,max ∝ T³");
    near(pl.at * pn.at / c, K.X3 / K.X5, 2e-7, "λ_max ν_max / c = 2,821/4,965");
  }
  // tepe aralık dışında: null (sayfanın "aralık dışında" durumu)
  ok(K.findPeak((l) => K.lnPlanckLam(l, 310), 3e-11, 3e-6) === null, "310 K tepesi 0–3 µm dışında");
  ok(K.findPeak((l) => K.lnPlanckLam(l, 30000), 1e-6 * 1e-5 * 30, 1e-6 * 30).at > 0, "30 000 K tepesi 0–30 µm içinde");
  ok(K.findPeak((l) => K.lnPlanckLam(l, 100), 1e-8, 1e-5) === null, "100 K tepesi 10 µm'de bitince yok (29 µm)");
}

/* ── 4 · Stefan–Boltzmann: toplam yayılım ── */
{
  for (const T of [1, 2.7255, 77, 310, 1000, 2700, 5772, 12100, 30000, 50000]) {
    const M = K.exitanceNum(T);
    near(M, SIGMA_CODATA * T ** 4, 2e-9, `σT⁴ T=${T}`);
    // kendi integralimiz λ'da: M = π∫B_λ dλ, ln λ üzerinde değil doğrudan x'te
    near(M, 2 * Math.PI * kB ** 4 * T ** 4 / (h ** 3 * c * c) * Math.exp(lnPlanckIntX(1e-7, 70, 40000)), 2e-9, "kendi x-Simpson'ımız");
  }
  // (T₂/T₁)⁴ ölçeklenmesi
  near(K.exitanceNum(5772) / K.exitanceNum(2886), 16, 1e-9, "T iki katı → M 16 katı");
  // kendi λ-Simpson'ımız (doğrudan dalga boyunda, parça parça) 5772 K için
  { const T = 5772; let I = 0; const edges = [10e-9, 100e-9, 300e-9, 1e-6, 3e-6, 10e-6, 100e-6, 1e-3, 1e-1]; for (let i = 0; i < edges.length - 1; i++) I += simpson((l) => planckLam(l, T), edges[i], edges[i + 1], 20000); near(K.exitanceNum(T), Math.PI * I, 1e-7, "λ'da parça parça Simpson"); }
}

/* ── 5 · Bant payları ── */
{
  const lnFracBetween = (T, la, lb) => lnPlanckIntX(h * c / (lb * kB * T), h * c / (la * kB * T)) - Math.log(PI4_15);
  for (const T of [300, 500, 1000, 1500, 2700, 3600, 5772, 9940, 12100, 30000, 50000]) {
    const ref = lnFracBetween(T, 380e-9, 750e-9);
    abs(K.lnVisFracSeries(T), ref, 1e-8, `görünür pay (seri) T=${T}`);
    abs(K.lnVisFracNum(T), ref, 1e-6, `görünür pay (sayısal) T=${T}`);
  }
  for (const x of [0.01, 0.1, 1, 2.5, 5, 10, 30, 100]) abs(K.lnFracBelow(x), lnPlanckIntX(x, x + 200, 40000) - Math.log(PI4_15), 1e-8, `λ altı pay x=${x}`);
  // Güneş'in 380–750 nm payı ≈ % 43,8, insan vücudu ≈ 10⁻¹⁸ mertebesi altı
  abs(Math.exp(K.lnVisFracSeries(5772)), Math.exp(lnFracBetween(5772, 380e-9, 750e-9)), 1e-10, "Güneş görünür");
  abs(Math.exp(K.lnVisFracSeries(5772)), 0.4377, 1e-4, "Güneş görünür ≈ % 43,8");
  ok(K.lnVisFracSeries(310) < Math.log(1e-15), "insan görünürde ışımaz");
}

/* ── 6 · Renk: CIE 1931 ve sRGB ── */
{
  // tablo: 95 satır, ȳ(555 nm) = 1, eşit enerji beyazı (1/3, 1/3), ∑ȳΔλ ≈ 106,857 nm
  ok(K.CIE.length === 3 * K.CIE_N && K.CIE_N === 95, "CIE tablosu 360–830 nm, 5 nm");
  near(K.CIE[3 * 39 + 1], 1, 0, "ȳ(555) = 1");
  let X = 0, Y = 0, Z = 0; for (let i = 0; i < K.CIE_N; i++) { X += K.CIE[3 * i]; Y += K.CIE[3 * i + 1]; Z += K.CIE[3 * i + 2]; }
  abs(X / (X + Y + Z), 1 / 3, 2e-4, "E beyazı x"); abs(Y / (X + Y + Z), 1 / 3, 2e-4, "E beyazı y"); abs(5 * Y, 106.857, 0.01, "∑ȳ Δλ");
  // D65 (x, y) = (0,3127; 0,3290) sRGB'de (1, 1, 1)
  { const x = 0.3127, y = 0.329, l = K.linRGB(x / y, 1, (1 - x - y) / y); l.forEach((v, i) => abs(v, 1, 2e-3, "D65 → sRGB " + i)); }
  // sRGB gama (IEC 61966-2-1)
  for (const v of [0, 0.002, 0.0031308, 0.01, 0.18, 0.5, 1]) abs(K.gammaSRGB(v), v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055, 1e-15, "gama");
  abs(K.gammaSRGB(2), 1, 1e-15, "gama kırpma üst"); abs(K.gammaSRGB(-1), 0, 1e-15, "gama kırpma alt");
  // Planck eğrisi renklilikleri (CIE 1931 2°, yayımlanmış tablolar): A ışıklandırıcısı (2856 K, c₂ = 1,435e-2) ve 3000…10000 K
  { const A = K.xyzFromLn((lam) => -5 * Math.log(lam) - Math.log(Math.expm1(1.435e-2 / (lam * 2848)))), s = A.X + A.Y + A.Z; abs(A.X / s, 0.44757, 3e-4, "A x"); abs(A.Y / s, 0.40745, 3e-4, "A y"); }
  for (const [T, x, y] of [[3000, 0.4369, 0.4041], [5000, 0.3451, 0.3516], [6500, 0.3135, 0.3236], [10000, 0.2807, 0.2884]]) {
    const col = K.bodyColour(T); abs(col.x, x, 6e-4, `x(${T} K)`); abs(col.y, y, 6e-4, `y(${T} K)`);
  }
  // sıcak cisimler mavi, soğuklar kırmızı; 1000 K sRGB dışı, 6500 K içinde
  const r = (T) => K.bodyColour(T).rgb;
  ok(r(2700)[0] === 255 && r(2700)[2] < r(2700)[1], "2700 K turuncu"); ok(r(12100)[2] === 255 && r(12100)[0] < 255, "12100 K mavi-beyaz");
  ok(K.bodyColour(1000).out && !K.bodyColour(6500).out, "1000 K sRGB dışında, 6500 K içinde");
  // Planck eğrisinin sonsuz T ucu: B ∝ λ⁻⁴ (x ≈ 0,2399, y ≈ 0,2341)
  abs(K.PLANCK_INF.x, 0.2399, 1e-3, "T → ∞ x"); abs(K.PLANCK_INF.y, 0.2341, 1e-3, "T → ∞ y");
  // ışık verimi: 683 · ∫ȳB / ∫B; 5772 K için ≈ 93 lm/W, 2700 K akkor ≈ 14 lm/W mertebesi
  const eff = (T) => Math.exp(K.lnLuminance(K.bodyColour(T)) + Math.log(Math.PI) - Math.log(K.exitanceNum(T)));
  abs(eff(5772), 93, 2.5, "Güneş ışık verimi"); ok(eff(2700) > 10 && eff(2700) < 20, "akkor verimi " + eff(2700));
  // ışıklılık: L_v = 683 ∫ȳ B_λ dλ — kendi 1 nm adımlı toplamımızla (cmfAt ara değerleme dışı, tablo düğümlerinde)
  { const T = 5772; let s = 0; for (let i = 0; i < K.CIE_N; i++) s += K.CIE[3 * i + 1] * planckLam((360 + 5 * i) * 1e-9, T) * 5e-9; near(Math.exp(K.lnLuminance(K.bodyColour(T))), 683 * s, 1e-9, "L_v toplamı"); }
  // 5 nm'lik toplam (sayfa): x > 166'da (T < 104,5 K) ya da L_v < 10⁻³⁰ cd/m²'de (T ≲ 220 K) "çözümlenemez" der
  const lvr = (T) => K.lvResolved(T, K.lnLuminance(K.bodyColour(T)));
  ok(!lvr(2.7255) && !lvr(50) && !lvr(104) && !lvr(210) && lvr(250) && lvr(310) && lvr(5772), "L_v çözünürlük sınırları");
  abs(h * c / (830e-9 * kB * 104.5), 166, 0.2, "x = 166 sınırı 104,5 K");
  // çözümlenen bölgede 5 nm toplamı, 0,01 nm'lik ince yamuk integralle (ȳ doğrusal ara değerli) karşılaştırılır
  for (const [T, tol] of [[250, 0.05], [310, 0.01], [1000, 0.003], [2700, 1e-4], [5772, 1e-4]]) {
    let m = -Infinity; const n = 47000, d = 0.01, v = new Float64Array(n + 1);
    for (let i = 0; i <= n; i++) { const nm = 360 + i * d, f = Math.min(93.999999, (nm - 360) / 5), j = Math.floor(f), w = f - j, y = K.CIE[3 * j + 1] + w * (K.CIE[3 * j + 4] - K.CIE[3 * j + 1]); v[i] = y > 0 ? Math.log(y * planckLam(nm * 1e-9, T)) : -Infinity; if (v[i] > m) m = v[i]; }
    let s = 0; for (let i = 0; i <= n; i++) s += (i === 0 || i === n ? 0.5 : 1) * Math.exp(v[i] - m);
    abs(Math.expm1(K.lnLuminance(K.bodyColour(T)) - (Math.log(683) + m + Math.log(s * d * 1e-9))), 0, tol, `L_v ince integral T=${T}`);
  }
}

/* ── 7 · Gezegen denge sıcaklığı ── */
{
  const AU = 149597870700, RS = 6.957e8;
  // kendi enerji dengemiz: (1 − A) σT★⁴(R★/D)²/4 = σT⁴ → T
  const teq = (Ts, Rs, D, A) => ((1 - A) * SIGMA_CODATA * Ts ** 4 * (Rs / D) ** 2 / (4 * SIGMA_CODATA)) ** 0.25;
  for (const [Ts, Rs, D, A] of [[5772, 1, 1, 0.294], [5772, 1, 0.7233, 0.77], [5772, 1, 1.5237, 0.25], [3000, 0.2, 0.05, 0.3], [40000, 20, 50, 0], [2000, 0.1, 0.02, 0.95]]) {
    const ref = teq(Ts, Rs * RS, D * AU, A);
    near(K.tEqFormula(Ts, Rs * RS, D * AU, A), ref, 1e-13, `T_eq formülü ${Ts}/${D}`);
    const S = K.exitanceNum(Ts) * (Rs * RS / (D * AU)) ** 2;
    near(S, SIGMA_CODATA * Ts ** 4 * (Rs * RS / (D * AU)) ** 2, 2e-9, "S sayısal");
    near(K.solveTeqNum((1 - A) * S / 4), ref, 1e-9, "T_eq kiriş çözümü");
  }
  near(SIGMA_CODATA * 5772 ** 4 * (RS / AU) ** 2, 1361.2, 1e-4, "güneş sabiti ≈ 1361 W/m² (IAU 2015 nominal 1361)");
  const P = K.PLANETS;
  ok(P.mars.Tsurf === 214 && P.dunya.Tsurf === 288 && P.venus.Tsurf === 737, "yüzey sıcaklıkları (Mars 214 K)");
  ok(P.venus.A === 0.77 && P.dunya.A === 0.294 && P.mars.A === 0.25 && P.venus.D === 0.7233 && P.dunya.D === 1 && P.mars.D === 1.5237, "albedo ve uzaklıklar");
  // NASA bilgi sayfası kara cisim sıcaklıkları sayfanın A ve D'siyle 0,1 K içinde (Dünya: eski A = 0,306 ile)
  abs(teq(5772, RS, 0.7233 * AU, 0.77), P.venus.Tbb, 0.1, "Venüs NASA 226,6 K");
  abs(teq(5772, RS, 1.5237 * AU, 0.25), P.mars.Tbb, 0.1, "Mars NASA 209,8 K");
  abs(teq(5772, RS, AU, 0.306), P.dunya.Tbb, 0.1, "Dünya NASA 254,0 K (A = 0,306)");
  abs(teq(5772, RS, AU, 0.294), 255.1, 0.05, "Dünya A = 0,294 ile 255,1 K (sayfa notu)");
  // sera farkları
  abs(P.dunya.Tsurf - teq(5772, RS, AU, 0.294), 32.9, 0.05, "Dünya sera farkı"); abs(P.venus.Tsurf - teq(5772, RS, 0.7233 * AU, 0.77), 510.4, 0.05, "Venüs sera farkı");
  abs(P.mars.Tsurf - teq(5772, RS, 1.5237 * AU, 0.25), 4.2, 0.05, "Mars sera farkı");
}

/* ── 8 · Kaydırıcı ızgaraları ve hazır değerler ── */
{
  const A_GRID = K.makeGrid(100, 30000, 200, [100, 150, 200, 250, 300, 310, 400, 500, 600, 700, 800, 1000, 1200, 1500, 2000, 2500, 2700, 3000, 3600, 4000, 5000, 5772, 6000, 7000, 8000, 9940, 10000, 12000, 12100, 15000, 20000, 25000, 30000]);
  const B_GRID = K.makeGrid(1, 50000, 120, [1, 2, 2.7255, 3, 5, 10, 20, 30, 50, 100, 200, 300, 310, 500, 800, 1000, 1500, 2000, 2500, 2700, 3000, 3600, 4000, 5000, 5772, 6000, 6500, 7000, 8000, 9940, 10000, 12100, 15000, 20000, 30000, 40000, 50000]);
  ok(html.includes("const A_GRID = makeGrid(100, 30000, 200, [") && html.includes("const B_GRID = makeGrid(1, 50000, 120, ["), "ızgaralar sayfadakiyle aynı tanım");
  for (const G of [A_GRID, B_GRID]) { ok(G.every((v, i) => i === 0 || v > G[i - 1]), "ızgara artan"); ok(G.every((v, i) => i === 0 || v / G[i - 1] < 1.04), "ızgara sık (en çok % 4 adım)"); }
  for (const b of K.BODIES) { if (b.id !== "kma") ok(A_GRID.includes(b.T), "A ızgarasında " + b.id); ok(B_GRID.includes(b.T), "B ızgarasında " + b.id); ok(B_GRID[K.nearestIndex(B_GRID, b.T)] === b.T, "nearestIndex " + b.id); }
  ok(K.BODIES.find((b) => b.id === "kma").T === 2.7255 && K.BODIES.find((b) => b.id === "gunes").T === 5772, "KMA 2,7255 K, Güneş 5772 K");
  ok(K.nearestIndex(A_GRID, 1) === 0 && K.nearestIndex(A_GRID, 1e9) === A_GRID.length - 1, "uçlar kırpılır");
}

/* ── 9 · Biçim ── */
{
  ok(K.fmtLen(B_CODATA / 5772) === "502.0 nm" && K.fmtLen(2e-6) === "2.000 µm" && K.fmtLen(1.063e-3) === "1.063 mm", "uzunluk biçimi");
  ok(K.fmtFreq(NU_CODATA * 5772) === "339.3 THz", "frekans biçimi: " + K.fmtFreq(NU_CODATA * 5772));
  ok(K.fmtFlux(SIGMA_CODATA * 5772 ** 4) === "62.94 MW/m²", "akı biçimi: " + K.fmtFlux(SIGMA_CODATA * 5772 ** 4));
  ok(K.fmtT(5772) === "5772 K" && K.fmtT(2.7255) === "2.7255 K", "sıcaklık biçimi");
  ok(K.sig(9.9996, 4) === "10.00" && K.sig(0.00012345, 3) === "0.000123", "anlamlı basamak sınırı");
  ok(K.sciLn(Math.log(9.9996e5), 3) === "1.000×10⁶", "bilimsel sınır");
  ok(K.fix(-0.0000001, 2) === "0.00" && K.fix(-1.5, 1) === "−1.5", "eksi sıfır yok, gerçek eksi işareti");
  ok(K.fmtPctLn(Math.log(0.99999)) === "> 99.99 %" && K.fmtPctLn(Math.log(0.5)) === "50.00 %", "yüzde biçimi");
}
console.log(`G ${SLUG}: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const { canvasInk, assertCanvasDrawn } = await import("./lib/canvas-check.mjs");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  assert(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`, import.meta.url)), "defter dosyası var olmalı"); // 404 hata sayılır
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
      await page.waitForTimeout(300);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { await page.waitForTimeout(60); const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      // okunan sayıyı (nokta ondalık, "×10ⁿ" ve SI öneki dahil) bağımsız başvuruyla karşılaştır
      const SUPD = { "⁰": 0, "¹": 1, "²": 2, "³": 3, "⁴": 4, "⁵": 5, "⁶": 6, "⁷": 7, "⁸": 8, "⁹": 9 };
      const num = (t) => { const m = t.replace(/−/g, "-").match(/(-?[0-9]+(?:\.[0-9]+)?)(?:×10(⁻?)([⁰-⁹¹²³]+))?/); if (!m) return NaN; let v = parseFloat(m[1]); if (m[3]) v *= 10 ** ((m[2] ? -1 : 1) * Number([...m[3]].map((d) => SUPD[d]).join(""))); return v; };
      // birimli okumalar SI'ye çevrilir (nm, µm, mm, m; GHz, THz, PHz; önekli W/m²); birimsizler olduğu gibi
      const UNIT = { nm: 1e-9, "µm": 1e-6, mm: 1e-3, m: 1, GHz: 1e9, THz: 1e12, PHz: 1e15, "W/m²": 1, "kW/m²": 1e3, "MW/m²": 1e6, "GW/m²": 1e9, "mW/m²": 1e-3, "µW/m²": 1e-6, "nW/m²": 1e-9 };
      const si = (t) => { const u = t.match(/[0-9] ?(nm|µm|mm|GHz|THz|PHz|[kMGmµn]?W\/m²|m)(?![A-Za-z])/); return num(t) * (u ? UNIT[u[1]] : 1); };
      // tolerans: istenen göreli hata + gösterilen son basamağın yarısı (yuvarlama)
      const roundRel = (t) => { const m = t.replace(/−/g, "-").match(/-?([0-9]+)(?:\.([0-9]+))?/); return m ? 0.5 * 10 ** -(m[2] || "").length / Math.max(1e-300, Math.abs(parseFloat(m[0]))) : 0; };
      const val = async (id, ref, rel, label) => { await page.waitForTimeout(60); const t = await read(id); const v = si(t), tol = rel + roundRel(t); ok(Number.isFinite(v) && Math.abs(v - ref) <= tol * Math.abs(ref), `${label || id}: "${t}" ≉ ${ref} (göreli ${tol})`); };
      const range = async (id, v) => { await page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v)); await page.waitForTimeout(120); };
      const rangeEnd = async (id, end) => { await page.locator("#" + id).evaluate((e, end) => { e.value = end === "max" ? e.max : e.min; e.dispatchEvent(new Event("input", { bubbles: true })); }, end); await page.waitForTimeout(150); };
      const sel = async (id, v) => { await page.locator("#" + id).selectOption(String(v)); await page.waitForTimeout(150); };
      const click = async (id) => { await page.click("#" + id); await page.waitForTimeout(150); };
      const R = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); await page.waitForTimeout(150); };
      const noOverflow = async (label) => ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${width}px yatay taşma yok: ${label}`);
      const noNaN = async (label) => { const t = await page.locator(".readouts-wrap").textContent(); ok(!/NaN|Infinity|undefined/.test(t), `${label}: NaN/Infinity yok`); };
      const drawn = async (label) => { await page.waitForTimeout(120); for (const id of ["stageCanvas", "chartCanvas"]) assertCanvasDrawn(await canvasInk(page, "#" + id), { minInk: 1500, minDistinct: 6, minSpan: 0.4, label: `${label} ${id}` }), checks++; };
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("main input, main select, .app-content input, .app-content select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id || e.outerHTML));
      ok(unlabeled.length === 0, "etiketsiz denetim: " + unlabeled.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content input, .app-content select")].length) === 14, "14 denetim");
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll('.app-content input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-6; })), "varsayılanlar adım ızgarasında");
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content output")].every((o) => o.textContent.trim().length > 0)), "her output dolu");
      ok(await page.evaluate(() => !!document.querySelector(".readouts-wrap[aria-live]") && [...document.querySelectorAll(".status")].every((s) => s.getAttribute("role") === "status")), "aria-live okumalar");
      if (process.argv.includes("--dump") && width === 1280) {
        for (const t of ["planck", "renk", "gezegen"]) { await click("tab-" + t); console.log("== " + t, JSON.stringify(await page.evaluate(() => Object.fromEntries([...document.querySelectorAll(".readouts-wrap [id], .app-content output")].filter((e) => !e.closest("[hidden]")).map((e) => [e.id, e.textContent]))), null, 1)); }
        await click("tab-planck");
      }

      /* 1 · Planck eğrisi */
      const T0 = 5772;
      await has("aTOut", "5772 K"); ok((await page.locator("#aPreset").inputValue()) === "gunes", "Güneş seçili");
      await val("aLamM", B_CODATA / T0, 1e-4, "λ_max ölçülen (nm)"); await val("aLamT", B_CODATA / T0, 1e-4, "b/T (nm)"); await has("aLamD", "0.000 %");
      await val("aNuM", NU_CODATA * T0, 1e-4, "ν_max (THz)"); await has("aNuD", "0.000 %");
      await val("aMM", SIGMA_CODATA * T0 ** 4, 2e-4, "M ölçülen (MW/m²)"); await val("aMT", SIGMA_CODATA * T0 ** 4, 2e-4, "σT⁴ (MW/m²)"); await has("aMD", "0.000 %");
      const visRef = Math.exp(lnPlanckIntX(h * c / (750e-9 * kB * T0), h * c / (380e-9 * kB * T0))) / PI4_15 * 100;
      await val("aVisM", visRef, 1e-3, "görünür pay"); await val("aVisT", visRef, 1e-3, "görünür pay kuram"); await has("aVisD", "0.000 %");
      await val("aPkM", planckLam(B_CODATA / T0, T0) * 1e-6, 2e-3, "B_λ tepe (µm⁻¹)"); await has("aPkD", "0.000 %");
      await val("aCnu", h * c / (K.X3 * kB * T0), 1e-3, "c/ν_max (nm)"); await val("aProd", K.X3 / K.X5, 2e-4, "λν/c");
      // imleç 2 µm: x = hc/λkT
      { const x = h * c / (2e-6 * kB * T0); await has("aCurOut", "λ = 2.000 µm"); await val("aCurX", x, 1e-3, "imleç x"); await val("aCurRJ", Math.expm1(x) / x, 1e-3, "RJ/Planck"); await val("aCurW", -Math.expm1(-x), 1e-3, "Wien/Planck"); await val("aCurB", planckLam(2e-6, T0) * 1e-6, 2e-3, "imleçte B_λ"); }
      await has("aStatus", "iki tepesi farklı yerdedir");
      await drawn("planck");
      // hazır cisimler: her biri ızgarada, b/T ile uyumlu
      for (const [id, T] of [["insan", 310], ["lamba", 2700], ["betelgeuse", 3600], ["sirius", 9940], ["rigel", 12100], ["gunes", 5772]]) {
        await sel("aPreset", id); await has("aTOut", `${T} K`); await val("aLamT", B_CODATA / T, 1e-4, `${id} b/T`);
        await val("aMM", SIGMA_CODATA * T ** 4, 2e-4, `${id} M`); await has("aMD", "0.000 %");
      }
      await noNaN("planck hazırlar");
      // 310 K, 0–3 µm: tepe aralık dışında, durum söylüyor
      await sel("aPreset", "insan"); await has("aLamM", "aralık dışında"); await has("aLamD", "—"); await has("aStatus", "Tepe çizilen aralığın dışında");
      await sel("aScale", "4"); await val("aLamM", B_CODATA / 310, 1e-4, "310 K λ_max (µm)"); await has("aLamD", "0.000 %");
      await sel("aScale", "5"); await val("aLamM", B_CODATA / 310, 1e-4, "log–log 310 K");
      // frekans ekseni
      await sel("aVar", "nu"); await has("aPkLbl", "Hz"); await has("aCurOut", "ν = "); ok((await page.locator("#aScale option").first().textContent()).includes("THz"), "ölçek etiketleri frekansa döner");
      await val("aNuM", NU_CODATA * 310, 1e-4, "310 K ν_max (THz)"); await has("aNuD", "0.000 %"); await noNaN("frekans");
      await page.check("#aWien"); await page.waitForTimeout(120); ok(!(await page.locator("#aLegW").isHidden()), "Wien göstergesi"); await has("aStatus", "Wien yaklaşımı");
      await page.uncheck("#aRJ"); await page.waitForTimeout(120); ok(await page.locator("#aLegRJ").isHidden(), "RJ göstergesi gizli");
      // sınırlar: T ve imleç uçları
      await rangeEnd("aT", "min"); await has("aTOut", "100 K"); await noNaN("T = 100 K"); await rangeEnd("aCur", "min"); await rangeEnd("aCur", "max"); await noNaN("imleç uçları");
      await rangeEnd("aT", "max"); await has("aTOut", "30000 K"); await sel("aVar", "lam"); await sel("aScale", "0"); await val("aLamM", B_CODATA / 30000, 1e-4, "30000 K λ_max"); await noNaN("T = 30000 K");
      await rangeEnd("aCur", "min"); await noNaN("imleç kısa uç"); await has("aStatus", "Wien yaklaşımı");
      // karşılaştırma: 5772 K sabitle, 2886'ya yakın bir sıcaklığa geç
      await click("aReset"); await has("aTOut", "5772 K"); ok(await page.locator("#aClear").isDisabled(), "karşılaştırma yokken sil kapalı");
      await click("aPin"); await has("aStatus", "karşılaştırmaya eklendi"); await click("aPin"); await has("aStatus", "zaten karşılaştırmada");
      await sel("aPreset", "lamba"); ok(!(await page.locator("#aCurveTable").isHidden()), "eğri tablosu görünür");
      { const t = await read("aRatios"); const m = t.match(/M oranı ([0-9.]+) \(kuram \(T\/T₁\)⁴ = ([0-9.]+)\)/); ok(m && Math.abs(+m[1] / (2700 / 5772) ** 4 - 1) < 2e-3 && Math.abs(+m[2] / (2700 / 5772) ** 4 - 1) < 2e-3, "M oranı (T/T₁)⁴: " + t); }
      await sel("aPreset", "betelgeuse"); await click("aPin"); await sel("aPreset", "sirius"); await click("aPin"); ok((await page.locator("#aCurves tr").count()) === 3, "en çok iki karşılaştırma");
      await click("aClear"); await has("aStatus", "silindi"); ok(await page.locator("#aCurveTable").isHidden(), "tablo gizlendi");
      await page.check("#aWien"); await sel("aScale", "3"); await R(); await has("aTOut", "5772 K"); ok((await page.locator("#aScale").inputValue()) === "1" && !(await page.locator("#aWien").isChecked()) && (await page.locator("#aRJ").isChecked()), "R sıfırlar (1)");
      await has("aCurOut", "λ = 2.000 µm"); await noOverflow("planck");

      /* 2 · Yıldızlar ve renk */
      await click("tab-renk"); await has("bTOut", "5772 K"); ok((await page.locator("#bPreset").inputValue()) === "gunes", "Güneş seçili (2)");
      await val("bLamM", B_CODATA / T0, 1e-4, "B λ_max"); await has("bLamD", "0.000 %"); await has("bNuD", "0.000 %"); await has("bCnuD", "0.000 %");
      { const col = K.bodyColour(T0), t = await read("bXY"), [x, y] = t.split(",").map(Number); ok(x < 0.3451 && x > 0.3135 && y < 0.3516 && y > 0.3236, "Güneş (x, y) 5000 K ile 6500 K'nin yayımlanmış Planck noktaları arasında"); ok(t === `${col.x.toFixed(4)}, ${col.y.toFixed(4)}`, "renklilik çekirdekle aynı"); }
      await val("bVis", visRef, 1e-3, "B görünür pay"); await val("bM", SIGMA_CODATA * T0 ** 4, 2e-4, "B M"); await val("bEff", 93, 0.03, "ışık verimi lm/W");
      ok(/^#[0-9A-F]{6} · \(\d+, \d+, \d+\)$/.test(await read("bHex")), "renk kodu biçimi"); ok((await page.locator("#bTable tr").count()) === 7, "cisim tablosu 7 satır");
      await has("bStatus", "Güneş");
      await drawn("renk");
      for (const [id, T] of [["kma", 2.7255], ["insan", 310], ["lamba", 2700], ["betelgeuse", 3600], ["sirius", 9940], ["rigel", 12100]]) {
        await sel("bPreset", id); await has("bTOut", `${String(T)} K`); await val("bLamT", B_CODATA / T, 1e-4, `${id} b/T`); await has("bLamD", "0.000 %");
        ok((await page.locator("#bTable tr.is-sel").getAttribute("data-id")) === id, "tabloda seçili " + id);
      }
      await noNaN("renk hazırları");
      await sel("bPreset", "kma"); await has("bStatus", "görünmez"); await has("bLv", "< 10⁻³⁰"); ok(await page.locator("#bStatus").evaluate((e) => e.classList.contains("is-warn")), "KMA uyarı");
      await sel("bPreset", "insan"); await has("bStatus", "görünmez");
      await rangeEnd("bT", "min"); await has("bTOut", "1 K"); await noNaN("T = 1 K"); ok((await page.locator("#bPreset").inputValue()) === "", "serbest");
      await rangeEnd("bT", "max"); await has("bTOut", "50000 K"); await val("bLamM", B_CODATA / 50000, 1e-4, "50000 K λ_max"); await noNaN("T = 50000 K");
      await R(); await has("bTOut", "5772 K"); await sel("bPreset", "rigel"); await click("bReset"); await has("bTOut", "5772 K"); await noOverflow("renk");

      /* 3 · Gezegen sıcaklığı */
      const RS = 6.957e8, AU = 149597870700, teq = (Ts, Rs, D, A) => ((1 - A) * Ts ** 4 * (Rs * RS / (D * AU)) ** 2 / 4) ** 0.25;
      await click("tab-gezegen"); ok((await page.locator("#cPlanet").inputValue()) === "dunya", "Dünya seçili");
      await has("cTsOut", "5772 K"); await has("cRsOut", "1.00 R☉"); await has("cDOut", "1.0000 au"); await has("cAOut", "0.294");
      await val("cSM", SIGMA_CODATA * T0 ** 4 * (RS / AU) ** 2, 2e-4, "S (kW/m²)"); await has("cSD", "0.000 %");
      await val("cTM", teq(T0, 1, 1, 0.294), 4e-4, "Dünya T_eq ölçülen"); await val("cTT", teq(T0, 1, 1, 0.294), 4e-4, "Dünya T_eq kuram"); await has("cTT", "255.1 K"); await has("cTD", "0.000 %");
      await val("cPM", B_CODATA / teq(T0, 1, 1, 0.294), 1e-4, "gezegen tepesi (µm)"); await has("cPD", "0.000 %");
      await has("cObs", "288 K"); await has("cGh", "+32.9 K"); await has("cStatus", "sera etkisi"); await val("cL", 1, 1e-6, "L★ = 1 L☉");
      await drawn("gezegen");
      { const rows = await page.locator("#cTable tr").evaluateAll((trs) => trs.map((tr) => [...tr.children].map((td) => td.textContent)));
        ok(rows.length === 3, "gezegen tablosu 3 satır");
        const exp = { "Venüs": [0.77, 0.7233, "226.6", 737], "Dünya": [0.294, 1, "254.0*", 288], "Mars": [0.25, 1.5237, "209.8", 214] };
        for (const r of rows) { const e = exp[r[0]]; ok(!!e, "satır " + r[0]); abs(+r[2], teq(T0, 1, e[1], e[0]), 0.051, r[0] + " T_eq tablo"); ok(r[3] === e[2] && +r[4] === e[3], r[0] + " NASA ve yüzey"); abs(+r[5].replace("−", "-"), e[3] - teq(T0, 1, e[1], e[0]), 0.051, r[0] + " fark"); } }
      await sel("cPlanet", "venus"); await has("cDOut", "0.7233 au"); await has("cAOut", "0.770"); await val("cTT", teq(T0, 1, 0.7233, 0.77), 4e-4, "Venüs T_eq"); await has("cObs", "737 K"); await has("cStatus", "Venüs");
      await sel("cPlanet", "mars"); await has("cDOut", "1.5237 au"); await has("cAOut", "0.250"); await val("cTT", teq(T0, 1, 1.5237, 0.25), 4e-4, "Mars T_eq"); await has("cObs", "214 K"); await has("cGh", "+4.2 K"); await has("cStatus", "Mars");
      await range("cA", 0.5); ok((await page.locator("#cPlanet").inputValue()) === "", "albedo değişince serbest"); await has("cObs", "yalnız hazır"); await has("cGh", "—"); await val("cTT", teq(T0, 1, 1.5237, 0.5), 4e-4, "Mars A = 0,5");
      // sınırlar
      await rangeEnd("cA", "max"); await has("cAOut", "0.950"); await rangeEnd("cA", "min"); await has("cAOut", "0.000"); await val("cTM", teq(T0, 1, 1.5237, 0), 4e-4, "A = 0");
      await rangeEnd("cD", "min"); await has("cDOut", "0.0200 au"); await rangeEnd("cRs", "max"); await has("cRsOut", "20.0 R☉"); await has("cSM", "tanımsız"); await has("cTD", "—"); await has("cStatus", "yıldızın içinde"); ok(await page.locator("#cStatus").evaluate((e) => e.classList.contains("is-warn")), "içeride uyarı"); await noNaN("D ≤ R★");
      { const DG = K.makeGrid(0.02, 50, 200, [0.02, 0.05, 0.1, 0.2, 0.5, 0.7233, 1, 1.5237, 2, 5, 10, 20, 50]); ok(html.includes("makeGrid(0.02, 50, 200, [0.02, 0.05, 0.1, 0.2, 0.5, 0.7233, 1, 1.5237, 2, 5, 10, 20, 50])"), "D ızgarası sayfadakiyle aynı");
        await range("cD", DG.indexOf(0.5)); await has("cDOut", "0.5000 au"); await has("cStatus", "paralel gelmez"); await has("cStatus", "R★/D = 0.186"); await val("cTT", teq(T0, 20, 0.5, 0), 4e-4, "R★/D > 0,1 kuram"); await noNaN("yakın yıldız"); }
      await rangeEnd("cRs", "min"); await has("cRsOut", "0.100 R☉"); ok(!(await read("cStatus")).includes("paralel"), "küçük yıldızda uyarı yok"); await val("cTT", teq(T0, 0.1, 0.5, 0), 4e-4, "R★ = 0,1");
      await rangeEnd("cTs", "min"); await has("cTsOut", "2000 K"); await rangeEnd("cD", "max"); await has("cDOut", "50.00 au"); await val("cTT", teq(2000, 0.1, 50, 0), 4e-4, "en soğuk"); await val("cTM", teq(2000, 0.1, 50, 0), 4e-4, "en soğuk ölçülen"); await noNaN("en soğuk");
      await rangeEnd("cTs", "max"); await has("cTsOut", "40000 K"); await noNaN("en sıcak");
      await click("cReset"); ok((await page.locator("#cPlanet").inputValue()) === "dunya", "Sıfırla → Dünya"); await has("cTT", "255.1 K");
      await sel("cPlanet", "venus"); await R(); ok((await page.locator("#cPlanet").inputValue()) === "dunya", "R sıfırlar (3)"); await has("cAOut", "0.294");
      await sel("cPlanet", ""); ok((await page.locator("#cPlanet").inputValue()) === "dunya", "serbest seçilince değerler Dünya'ya eşit kalır");
      await noOverflow("gezegen");

      /* Klavye: sekmeler ve R kısayolu bir denetimin içindeyken çalışmaz */
      await page.locator("#tab-gezegen").focus(); await page.keyboard.press("Home"); ok((await page.locator("#tab-planck").getAttribute("aria-selected")) === "true", "Home");
      await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-renk").getAttribute("aria-selected")) === "true", "ArrowRight");
      await page.keyboard.press("End"); ok((await page.locator("#tab-gezegen").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("ArrowLeft"); ok((await page.locator("#tab-renk").getAttribute("aria-selected")) === "true", "ArrowLeft");
      ok(await page.locator('[data-for="renk"].panel').isVisible() && await page.locator('[data-for="planck"].panel').isHidden(), "panel sekmeyle değişir");
      await page.locator("#bT").focus(); await page.keyboard.press("ArrowRight"); await page.waitForTimeout(120); ok((await read("bTOut")) !== "5772 K", "ok tuşu kaydırıcıyı oynatır");
      await page.keyboard.press("r"); await page.waitForTimeout(120); ok((await read("bTOut")) !== "5772 K", "kaydırıcıdayken R yok sayılır");
      await R(); await has("bTOut", "5772 K");
      // her sekmede taşma yok
      for (const t of ["planck", "renk", "gezegen"]) { await click("tab-" + t); await noOverflow("sekme " + t); }
      { const dg = await page.evaluate(async () => { for (let i = 0; i < 50 && !document.querySelector(".digest"); i++) await new Promise((r) => setTimeout(r, 100)); const el = document.querySelector(".digest"); if (!el) return null; el.scrollIntoView(); const r = el.getBoundingClientRect(); return { h: r.height, vis: getComputedStyle(el).display !== "none", text: el.textContent }; });
        ok(dg && dg.vis && dg.h > 200 && dg.text.includes("Planck") && dg.text.includes("Kirchhoff"), "Keşif Defteri yüklendi ve görünür"); }
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); server.close(); }
}
