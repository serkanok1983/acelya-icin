// G · termokimya-ve-hess-yasasi.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// Newton soğuma denkleminin kapalı çözümü, ısı akışının Simpson integrali, elle yazılmış Ek G aritmetiği,
// Cramer kuralı ve bilinen katsayılarla kurulmuş rastgele hedefler, OpenStax Örnek 7.9 (−107 ve −90,5 kJ),
// Born–Landé'nin eV·nm biçimi, NIST'in F/H sabitli Shomate H(T) − H(298) biçimi, OpenStax Tablo 5.1 öz ısıları,
// sekant yöntemiyle alev sıcaklığı, Wikipedia'daki metan gaz yoğunluğu ve alev sıcaklığı tablosu.
// Kullanım: node scripts/check-g-termokimya-ve-hess-yasasi.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "termokimya-ve-hess-yasasi";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.ThermoLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };

/* ── Kabuk ── */
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
const title = html.match(/<title>([^<]*)<\/title>/)[1];
ok(title.startsWith("Termokimya ve Hess Yasası: ") && title.length <= 80, "başlık biçimi ve uzunluğu: " + title.length);
ok(/<body class="app-page" data-page="termokimya-ve-hess-yasasi">/.test(html) && /name="description"/.test(html) && /viewport-fit=cover/.test(html), "kabuk");
ok(/shared\/theme\.css/.test(html) && /shared\/app\.js/.test(html), "theme.css ve app.js");
ok(!/fonts\.googleapis|cdn\.|<script src="http/.test(html), "dış betik ya da yazı tipi yok");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}☀-➿]/u.test(html), "emoji yok");
ok(!/type="number"/.test(html), "type=number yok");

/* ── Veri: Ek G aritmetiği elle ── */
near(K.dHrxn([["CH4", -1], ["O2", -2], ["CO2", 1], ["H2O(s)", 2]]), -393.51 + 2 * -285.83 + 74.6, 1e-12, "CH₄ yanması (sıvı su)");
near(K.dHrxn(K.PROC.neut.rx), -285.83 + 230.0, 1e-12, "nötrleşme −55,83");
near(K.dHrxn(K.PROC.nh4no3.rx), -132.5 - 205.0 + 365.56, 1e-12, "NH₄NO₃ çözünmesi +28,06");
near(K.dHrxn(K.PROC.benzoic.rx), 7 * -393.51 + 3 * -285.83 + 385.2, 1e-12, "benzoik asit");
abs(K.dHrxn(K.PROC.benzoic.rx), -3228, 1.5, "Wikipedia ΔcH° −3228 ile 1,5 kJ içinde");
near(K.molarMass("CH3OH(s)"), 32.042, 1e-12, "metanol M (Wikipedia 32,042)");
near(K.molarMass("C2H5OH(s)"), 46.069, 1e-12, "etanol M (Wikipedia 46,069)");
abs(K.molarMass("BENZ(k)"), 122.123, 0.002, "benzoik asit M (Wikipedia 122,123)");
for (const P of Object.values(K.PROC)) ok(K.balance(P.rx).ok, "süreç denk");
ok(K.dnGas(K.PROC.benzoic.rx) === -0.5 && K.dnGas(K.PROC.ethanol.rx) === -1 && K.dnGas(K.PROC.benzene.rx) === -1.5, "Δn_gaz");

/* ── 1 · Kalorimetre ── */
{
  // Newton soğuması, üstel salım: θ = Q/(C(1 − kτ))·(e^(−kt) − e^(−t/τ))
  for (const [C, k, tau, Q] of [[448.4, 1.5e-3, 10, 2791.5], [10368, 3e-4, 5, 26413], [500, 5e-3, 60, -2800], [300, 0, 7, 1000]]) {
    const r = K.simulate({ C, k, tau, Q, profile: "exp", Tenv: 20 });
    const th = (t) => t <= 0 ? 0 : k === 0 ? Q / C * (1 - Math.exp(-t / tau)) : Q / (C * (1 - k * tau)) * (Math.exp(-k * t) - Math.exp(-t / tau));
    for (let i = 0; i < r.t.length; i += 7) abs(r.clean[i] - 20, th(r.t[i]), 1e-6 * Math.abs(Q / C) + 1e-12, `üstel çözüm t=${r.t[i]}`);
    // ısıtıcı (dikdörtgen)
    const h = K.simulate({ C, k, tau: 20, Q, profile: "rect", Tenv: 20 });
    const thr = (t) => t <= 0 ? 0 : k === 0 ? Q / C * Math.min(t, 20) / 20 : t < 20 ? Q / (C * 20 * k) * (1 - Math.exp(-k * t)) : Q / (C * 20 * k) * (1 - Math.exp(-k * 20)) * Math.exp(-k * (t - 20));
    for (let i = 0; i < h.t.length; i += 5) abs(h.clean[i] - 20, thr(h.t[i]), 1e-6 * Math.abs(Q / C) + 1e-12, `dikdörtgen çözüm t=${h.t[i]}`);
    // gürültüsüz geri uzatma = kapalı biçimdeki son dönem genliği
    const A = K.analyze(r, K.tFitOf(tau, "exp"), 0);
    // pencere başında kalan salım kuyruğu e^(−(1/τ − k)·tFit) kadar sapma getirir (τ = 60 s, k = 5·10⁻³ s⁻¹ için ≈ % 0,1)
    const tail = Math.exp(-(1 / tau - k) * K.tFitOf(tau, "exp")), tol = Math.max(1e-6, 6 * tail);
    abs(A.corr / (k === 0 ? Q / C : Q / (C * (1 - k * tau))), 1, tol, "geri uzatma (üstel)");
    if (k > 0) abs(A.kFit / k, 1, Math.max(1e-6, 60 * tail), "uydurulan k");
  }
  // ısı akışının integrali Q'dur (Simpson)
  const simp = (f, a, b, n = 20000) => { const hh = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * hh) * (i % 2 ? 4 : 2); return s * hh / 3; };
  abs(simp((t) => K.power("exp", 1000, 10, t), 0, 600), 1000, 1e-3, "∫P dt = Q");
  // varsayılan kahve fincanı
  const o = { proc: "neut", amt: 1, vol: 100, ccal: 30, k: 1.5e-3, tau: 10, Tenv: 22, noise: 0.01, seed: 1 };
  const R = K.calorimetry(o);
  near(R.n, 0.05, 1e-12, "n"); near(R.Cth, 100 * 4.184 + 30, 1e-12, "C kuramı"); near(R.Q, 0.05 * 55.83 * 1000, 1e-9, "Q");
  abs(R.A.corr, 6.3229, 5e-4, "varsayılan ΔT geri uzatılmış"); abs(R.A.naive, 5.8343, 5e-4, "varsayılan en uç okuma"); abs(R.Cmeas, 441.6096, 5e-3, "kalibrasyon C");
  abs(R.per, -55.8455, 5e-4, "varsayılan ΔH"); abs(R.perNaive, -48.8199, 5e-4, "saf ΔH");
  const R0 = K.calorimetry(Object.assign({}, o, { noise: 0 }));
  abs(R0.per, -55.83, 0.01, "gürültüsüz: ısıtıcı ve tepkime sapmaları birbirini götürür");
  // tohumlar arasında: ölçülen ΔH kaynakla % 0,5 içinde, saf yöntem hep % 10'dan çok düşük
  for (let s = 1; s <= 20; s++) { const Rs = K.calorimetry(Object.assign({}, o, { seed: s })); ok(Math.abs(Rs.per / -55.83 - 1) < 0.005, "tohum " + s + ": " + Rs.per); ok(Rs.perNaive / -55.83 < 0.9, "saf yöntem düşük"); }
  // yavaş tepkime: kalibrasyon sapmayı götüremez, kuram (1/(1 − kτ)) / ((e^(k·td) − 1)/(k·td))
  const S = K.calorimetry(Object.assign({}, o, { tau: 60, noise: 0 }));
  abs(S.per / -55.83, (1 / (1 - 1.5e-3 * 60)) / ((Math.exp(0.03) - 1) / 0.03), 5e-4, "yavaş tepkime sapması (pencere kuyruğu dahil)");
  // bomba: benzoik asitle kalibrasyon aynı τ, sapma tam götürülür
  for (const proc of ["methanol", "ethanol", "benzene", "benzoic"]) {
    const B = K.calorimetry({ proc, amt: 1, vol: 2000, ccal: 2000, k: 3e-4, tau: 5, Tenv: 22, noise: 0, seed: 1 });
    abs(B.per, B.dU, 1e-3, proc + " ΔU gürültüsüz");
    abs(B.dHmeas, K.dHrxn(K.PROC[proc].rx), 1e-3, proc + " ΔH = ΔU + Δn RT");
    abs(B.dH - B.dU, K.dnGas(K.PROC[proc].rx) * 8.314462618 * 298.15 / 1000, 1e-12, "Δn RT");
  }
  const Bd = K.calorimetry({ proc: "benzoic", amt: 1, vol: 2000, ccal: 2000, k: 3e-4, tau: 5, Tenv: 22, noise: 0.01, seed: 1 });
  abs(Bd.per, -3227.22, 0.01, "varsayılan benzoik ΔU"); abs(Bd.Cmeas, 10348.1, 0.1, "bomba C");
  // k = 0: geri uzatma Q/C
  const Z = K.calorimetry(Object.assign({}, o, { k: 0, noise: 0 })); abs(Z.A.corr, Z.Q / Z.Cth, 1e-5, "k = 0 (e^(−12) kuyruğu)");
  // gürültüye gömülü sinyal: tanımsız
  const T = K.calorimetry({ proc: "nh4no3", amt: 0.5, vol: 200, ccal: 30, k: 1.5e-3, tau: 10, Tenv: 22, noise: 0.05, seed: 1 });
  ok(T.A.corr === null && T.per === null, "gürültüde ΔH tanımsız");
}

/* ── 2 · Hess ── */
{
  const det3 = (m) => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let t = 0; t < 40; t++) {
    const M = [0, 1, 2].map(() => [0, 1, 2].map(() => rnd() * 4 - 2)), v = [rnd(), rnd(), rnd()], D = det3(M), x = K.gaussSolve(M, v);
    for (let j = 0; j < 3; j++) abs(x[j], det3(M.map((row, i) => row.map((a, c) => (c === j ? v[i] : a)))) / D, 1e-8 * (1 + Math.abs(x[j])), "Cramer");
  }
  ok(K.gaussSolve([[1, 2], [2, 4]], [1, 2]) === null, "tekil matris");
  // bilinen katsayılar
  const exp = { co: [1, -1, 0], ch4: [1, 2, -1, 0], c3h8: [3, 4, -1, 0], hydro: [1, 1, -1, 0], c2h2: [2, 1, -1], meoh: [1, 2, -1, 1], vap: [1, -1, 0] };
  const VIA = { co: -110.52, ch4: -74.6, c3h8: -103.8, hydro: -84.0 - 52.4, c2h2: 227.4, meoh: -201.0 + 110.52, vap: -201.0 + 239.2 };
  for (const [key, c] of Object.entries(exp)) {
    const h = K.hess(key, {});
    ok(h.S.ok, key + " kurulur"); c.forEach((ci, i) => abs(h.c[i], ci, 1e-9, key + " c" + i));
    near(h.viaF, VIA[key], 1e-12, key + " oluşum yolu"); abs(h.viaHess, VIA[key], 0.03, key + " Hess yolu (yuvarlama)");
  }
  // bilinen bir birleşimden kurulmuş hedef geri bulunur
  for (let t = 0; t < 20; t++) {
    const G = K.HESS.ch4.given, cc = [rnd() * 4 - 2, rnd() * 4 - 2, rnd() * 4 - 2, rnd() * 4 - 2], tgt = {};
    G.forEach((g, i) => g.forEach(([k, v]) => { tgt[k] = (tgt[k] || 0) + cc[i] * v; }));
    const S = K.hessSolve(Object.entries(tgt), G); ok(S.ok, "rastgele birleşim kurulur"); cc.forEach((c, i) => abs(S.c[i], c, 1e-9, "katsayı geri"));
  }
  ok(!K.hess("ch4", { 2: false }).S.ok, "CH₄ yanması çıkınca kurulamaz");
  const P = K.hess("ch4", {}, { i: 2, d: 10 }); abs(P.viaHess - K.hess("ch4", {}).viaHess, -10, 1e-9, "bozma c·δ");
  // Born–Haber
  const B = K.bornHaber(); near(B.U, 107.5 + 121.3 + 495.8 - 348.575 + 411.2, 1e-12, "döngü"); abs(B.U, 787, 0.5, "Wikipedia deneysel 787");
  // Born–Landé, eV·nm biçimi: e²/(4πε₀) = 1,439964548 eV·nm; 1 eV = 96,485332 kJ/mol
  const BL = 1.747565 * 1.439964548 / 0.28201 * 96.48533212 * (1 - 1 / 8);
  abs(K.bornLande(8, 282.01), BL, 1e-4, "Born–Landé"); abs(K.bornLande(8, 282.01), 756, 4, "Wikipedia hesap 756 ile 4 kJ içinde");
  abs(K.kapustinskii(283), 1.202e-4 * 2 / 283e-12 * (1 - 34.5 / 283) / 1000, 1e-9, "Kapustinskii");
}

/* ── 3 · Bağ enerjileri ── */
{
  const r = K.bondRxn([["CO", -1], ["H2", -2], ["CH3OH", 1]]);
  near(r.dHbond, 1080 + 2 * 436 - (3 * 415 + 350 + 464), 1e-12, "OpenStax Örnek 7.9: −107"); abs(r.dHf, -90.5, 0.05, "Örnek 7.9: −90,5");
  const c = K.bondRxn([["CH4", -1], ["O2", -2], ["CO2", 1], ["H2O", 2]], { H2O: true });
  near(c.sb, 4 * 415 + 2 * 498, 1e-12, "kırılan"); near(c.sf, 4 * 464 + 2 * 741, 1e-12, "oluşan");
  near(c.phase, 2 * (-285.83 + 241.82), 1e-12, "hâl payı = 2 × buharlaşma"); near(c.dHat, c.dHgas, 1e-9, "atomlaşma yolu = gaz ΔH° (Hess)");
  near(K.atomization("H2"), 2 * 217.97, 1e-12, "H₂ atomlaşma"); near(K.atomization("CO2"), 716.681 + 2 * 249.17 + 393.51, 1e-12, "CO₂ atomlaşma");
  ok(K.atomization("CO2") - K.sumBE("CO2") > 120, "CO₂ ortalama değerden güçlü"); ok(K.atomization("C6H6") - K.sumBE("C6H6") > 150, "benzen rezonansı");
  ok(!K.bondRxn([["CH4", -1], ["O2", -1], ["CO2", 1], ["H2O", 2]]).bal.ok, "denk değil");
  // her hazır tepkime denk ve ΔH bağ tahmini oluşum yolundan en çok % 20 sapar (gaz)
  for (const rx of [[["C2H6", -1], ["O2", -3.5], ["CO2", 2], ["H2O", 3]], [["C3H8", -1], ["O2", -5], ["CO2", 3], ["H2O", 4]], [["H2", -1], ["O2", -0.5], ["H2O", 1]]]) { const q = K.bondRxn(rx); ok(q.bal.ok, "denk"); ok(Math.abs(q.dHbond / q.dHgas - 1) < 0.2, "tahmin makul"); }
}

/* ── 4 · Kirchhoff ve alev ── */
{
  // NIST biçimi: H°(T) − H°(298) = At + Bt²/2 + Ct³/3 + Dt⁴/4 − E/t + F − H (kJ/mol)
  const nist = (sp, T) => { const row = K.SHO[sp].find((q) => T <= q[1]) || K.SHO[sp][K.SHO[sp].length - 1], [A, B, C, D, E, F, , H] = row[2], t = T / 1000; return A * t + B * t * t / 2 + C * t ** 3 / 3 + D * t ** 4 / 4 - E / t + F - H; };
  for (const sp of ["CH4", "O2", "N2", "H2", "CO2", "CO", "NH3"]) for (const T of [400, 800, 1500, 2500, 4000]) abs(K.intCp(sp, 298.15, T) / 1000, nist(sp, T), 0.06, `${sp} H(${T}) − H(298)`);
  for (const T of [600, 1500, 2500]) abs(K.intCp("H2O", 298.15, T) / 1000, nist("H2O", T), 0.06, "H₂O H(T) − H(298)");
  // OpenStax Tablo 5.1 öz ısıları × M (25 °C)
  for (const [sp, c, M, tol] of [["CO2", 0.853, 44.009, 0.015], ["O2", 0.918, 31.998, 0.015], ["N2", 1.040, 28.014, 0.01], ["H2O", 1.864, 18.015, 0.01]]) abs(K.cp(sp, 298.15) / (c * M), 1, tol, sp + " Cp(298) OpenStax ile");
  // Simpson: büyük N kapalı biçime yakınsar; sınırsız aralıkta hata oranı ≈ 16
  for (const key of Object.keys(K.KRX)) { const r = K.kirchhoff(key, 1500, 400); abs(r.numeric, r.exact, 1e-3, key + " Simpson N=400 (Cp sınırlarda sıçrar)"); }
  const e1 = Math.abs(K.kirchhoff("wgs", 900, 20).numeric - K.kirchhoff("wgs", 900, 20).exact), e2 = Math.abs(K.kirchhoff("wgs", 900, 40).numeric - K.kirchhoff("wgs", 900, 40).exact);
  abs(e1 / e2, 16, 1.5, "Simpson N⁻⁴");
  const d = K.kirchhoff("ch4", 1000, 2); abs(d.H298, -393.5224 - 2 * 241.8264 + 74.8731, 1e-9, "ΔH(298) NIST"); abs(d.exact, -800.484, 0.001, "CH₄ 1000 K");
  // alev: sekant ile bağımsız kök
  for (const [f, ox, phi, Tin] of [["CH4", "air", 1, 293.15], ["H2", "air", 1, 293.15], ["CO", "air", 0.7, 400], ["CH4", "o2", 1, 298.15]]) {
    const r = K.flame(f, ox, phi, Tin), M = r.M;
    const Hof = (list, T) => list.reduce((s, [k, v]) => s + v * (K.HF_NIST[k] * 1000 + K.intCp(k, 298.15, T)), 0);
    const g = (T) => Hof(M.prod, T) - Hof(M.react, Tin);
    let a = 1500, b = 3500; for (let i = 0; i < 60 && Math.abs(b - a) > 1e-9; i++) { const c2 = b - g(b) * (b - a) / (g(b) - g(a)); a = b; b = c2; }
    abs(r.T, b, 1e-4, `${f}/${ox} sekant`);
    // atom dengesi
    const cnt = (list) => { const o = {}; list.forEach(([k, v]) => Object.entries(K.atoms(K.SP[k].f)).forEach(([e, n]) => { o[e] = (o[e] || 0) + v * n; })); return o; };
    const A1 = cnt(M.react), A2 = cnt(M.prod); for (const e of Object.keys(A1)) abs(A1[e], A2[e] || 0, 1e-12, "atom dengesi " + e);
    ok(r.Tconst > r.T, "sabit Cp(298) fazla tahmin eder");
  }
  abs(K.flame("H2", "air", 1, 293.15).T - 273.15, 2254, 30, "H₂ havada: Wikipedia 2254 °C");
  abs(K.flame("CH4", "air", 1, 293.15).T - 273.15, 1963, 120, "CH₄ havada: Wikipedia 1963 °C (fark belgelendi)");
  ok(K.flame("CH4", "air", 0.6, 298.15).T < K.flame("CH4", "air", 0.8, 298.15).T, "fakir karışım daha soğuk");
  // enerji yoğunluğu
  near(K.fuelEnergy("H2", "l").perMass, 285.83 / 2.016, 1e-12, "H₂ üst ısıl değer");
  abs(K.fuelEnergy("CH4", "l").gasRho * 1.01325, 0.657, 0.002, "metan gaz yoğunluğu, 25 °C 1 atm (Wikipedia 0,657)");
  near(K.fuelEnergy("C2H5OH", "l").perVolLiq, 1366.91 / 46.069 * 0.78945, 1e-9, "etanol MJ/L");
}

console.log(`G termokimya: ${checks} çekirdek kontrolü PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const digest = `/shared/digest/${SLUG}.js`, hasDigest = fs.existsSync(new URL(`..${digest}`, import.meta.url));
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
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const R = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); };
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("main input, main select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      ok(unlabeled.length === 0, "etiketsiz denetim: " + unlabeled.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      const grid = () => page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-6; }));
      ok(await grid(), "varsayılanlar adım ızgarasında");
      // 1 · Kalorimetre
      await has("kalS0", "+5,834 K"); await has("kalS1", "+6,323 K"); await has("kalE1", "+6,320 K"); await has("kalS2", "+6,225 K"); await has("kalS3", "441,6 J/K");
      await has("kalS4", "−55,85 kJ/mol"); await has("kalE4", "−55,83"); await has("kalS5", "−48,82 kJ/mol"); await has("kalStatus", "gürültüsüz ikiz ölçüm +0,01 %");
      await page.click("#kalP1"); await has("kalStatus", "Isı kaybı yok"); await page.click("#kalP3"); await page.click("#kalP2"); ok((await page.locator("#kalK").inputValue()) === "5" && (await page.locator("#kalTau").inputValue()) === "60", "hazır ayarlar");
      await R(); await page.click("#kalP3"); await has("kalS4", "−60,29"); await has("kalStatus", "tam götüremez");
      await R(); await has("kalS4", "−55,85");
      await sel("kalProc", "benzoic"); await has("kalS4", "−3227,22 kJ/mol"); await has("kalL4", "ΔU"); await has("kalE5", "−1,239 kJ/mol"); await has("kalS5", "−3228,46"); ok(await grid(), "bomba aralıkları ızgarada");
      await sel("kalProc", "methanol"); await has("kalS4", "−725,20"); await has("kalE5", "−725,97");
      await sel("kalProc", "nh4no3"); await has("kalS4", "28,04 kJ/mol"); await range("kalAmt", 0.5); await range("kalVol", 200); await range("kalNoise", 0.05); await has("kalS4", "—"); await has("kalStatus", "gürültü");
      await page.click("#kalNew"); await has("kalChartCap", "tohum 2");
      await sel("kalView", "cal"); await has("kalChartTitle", "Kalibrasyon");
      await R(); ok((await page.locator("#kalProc").inputValue()) === "neut", "R sıfırlar (1)"); await has("kalS4", "−55,85"); await has("kalChartCap", "tohum 1");
      await page.locator("h1").click(); await page.keyboard.press(" "); await page.waitForTimeout(400); await has("kalPlay", "Duraklat"); ok(!(await read("kalCupCap")).includes("son okumayı"), "oynatılıyor");
      await range("kalK", 2); await has("kalPlay", "Oynat");
      await page.click("#kalReset"); await has("kalS4", "−55,85");
      // sekme klavyesi
      await page.locator("#tab-kal").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-kir").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-hess").getAttribute("aria-selected")) === "true", "ArrowRight");
      // 2 · Hess
      await has("hsS0", "−110,52 kJ/mol"); await has("hsS1", "−110,52 kJ/mol"); await has("hsS4", "+1,000; −1,000; 0,000"); await has("hsStatus", "gereksiz");
      await page.uncheck("#hsUse1"); await has("hsS0", "—"); await has("hsStatus", "doğrusal birleşimi değil");
      await page.uncheck("#hsUse0"); await page.uncheck("#hsUse2"); await has("hsStatus", "seçilmedi"); await has("hsS3", "—");
      await R(); await sel("hsTarget", "ch4"); await sel("hsPert", "2"); await has("hsS0", "−84,60"); await has("hsS5", "−10,000 kJ"); await has("hsE5", "c₃·δ = −10,000");
      await range("hsDelta", -50); await has("hsS5", "+50,000"); await range("hsDelta", 50); await has("hsS5", "−50,000");
      await sel("hsTarget", "meoh"); await has("hsS4", "+1,000; +2,000; −1,000; +1,000");
      await sel("hsTarget", "c2h2"); ok(await page.locator("#hsUse3").locator("xpath=..").isHidden(), "3 tepkimeli hedefte 4. satır gizli"); await has("hsS0", "227,40");
      await sel("hsTarget", "bh"); await has("hsS0", "787,2 kJ/mol"); await has("hsS1", "753,3"); await has("hsS2", "745,9"); await has("hsE5", "kaynağını belirtmez"); ok(await page.locator("#bhN").isVisible(), "Born–Haber denetimleri");
      await range("bhN", 12); await range("bhR", 250); await range("bhRs", 320); ok(!(await read("hsS1")).includes("NaN"), "sınır değer");
      await R(); await has("hsS1", "753,3");
      // 3 · Bağlar
      await page.click("#tab-bond"); await has("bdS2", "−682 kJ/mol"); await has("bdS3", "−802,55"); await has("bdS5", "+120,55"); await has("bdStatus", "CO₂(g)'den: +126,5");
      await sel("bdWater", "l"); await has("bdS3", "−890,57"); await has("bdS4", "−88,02");
      await sel("bdPreset", "syn"); await has("bdS2", "−107 kJ/mol"); await has("bdS3", "−90,48");
      await range("bdH2", -1); await has("bdS2", "—"); await has("bdStatus", "denk değil"); ok((await page.locator("#bdPreset").inputValue()) === "custom", "kendi tepkimen");
      for (const m of ["CH4", "C2H6", "C3H8", "CH3OH", "CO", "H2", "O2", "H2O", "CO2"]) await range("bd" + m, 0); await has("bdStatus", "En az bir giren");
      await R(); await has("bdS2", "−682"); ok((await page.locator("#bdWater").inputValue()) === "g", "R sıfırlar (3)");
      for (const p of ["c2h6", "c3h8", "h2", "meoh"]) { await sel("bdPreset", p); ok(!(await read("bdS2")).includes("—"), p + " denk"); }
      // 4 · Kirchhoff, alev, yoğunluk
      await page.click("#tab-kir"); await has("krS0", "−802,30"); await has("krS1", "−800,484"); await has("krS2", "−800,703"); await has("krS3", "−795,357"); await has("krE4", "dış değerleme");
      await range("krN", 100); ok(/fark [−+]?0,\d+ J\/mol|fark 0 J\/mol/.test(await read("krE2")), "N = 100 küçük hata: " + await read("krE2"));
      await sel("krRx", "nh3"); await has("krE4", "aralık içinde"); await range("krT", 300); await range("krT", 2000); ok(!(await read("krS1")).includes("NaN"), "sınır T");
      await has("flS0", "2323,6 K"); await has("flS2", "1963 °C"); await has("flE2", "+87 K");
      await sel("flFuel", "H2"); await has("flS0", "2520,7 K"); await has("flE2", "−6 K"); await has("flStatus", "H₂O kısmen");
      await sel("flOx", "o2"); await has("flS2", "karşılık yok"); await range("flPhi", 0.4); await range("flTin", 500); ok(!(await read("flS0")).includes("NaN"), "sınır alev");
      await has("fdStatus", "2,55 kat"); await sel("fdStore", "gas"); await has("fdCap", "1 bar"); await sel("fdWater", "g"); await has("fdTabCap", "Alt ısıl");
      await R(); await has("krS1", "−800,484"); await has("flS0", "2323,6 K"); await has("fdTabCap", "Üst ısıl"); ok((await page.locator("#krN").inputValue()) === "2", "R sıfırlar (4)");
      for (const t of ["kal", "hess", "bond", "kir"]) { await page.click("#tab-" + t); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${t}: yatay taşma yok`); }
      // tuvaller boş değil
      ok(await page.evaluate(() => [...document.querySelectorAll("#panel-kir canvas")].every((c) => { const g = c.getContext("2d"), d = g.getImageData(0, 0, c.width, c.height).data; const set = new Set(); for (let i = 0; i < d.length; i += 4) { set.add(d[i] + "," + d[i + 1] + "," + d[i + 2]); if (set.size > 20) return true; } return false; })), "tuvaller çizildi");
      ok(await page.evaluate(() => Object.isFrozen(ThermoLab) && !Object.getOwnPropertyDescriptor(window, "ThermoLab").writable), "çekirdek salt okunur");
      ok(hasDigest, "defter dosyası var: " + digest);
      await page.locator(".digest").first().waitFor({ state: "visible", timeout: 10000 });
      ok(await page.locator(".digest").first().isVisible(), "Keşif Defteri görünür");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G termokimya: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
