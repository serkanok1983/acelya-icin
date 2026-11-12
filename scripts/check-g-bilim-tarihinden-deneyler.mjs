// G · bilim-tarihinden-deneyler.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// birim vektörlerin iç çarpımıyla büyük çember uzaklığı, Lieske (IAU 1976) eğiklik kübiği, yuvarlanan kürenin
// RK4 ile tümlenmesi, Kepler denkleminin ikiye bölmeyle çözümü ve parametrik elips, ekuant noktasının ikiye
// bölmeyle bulunması, sönümlü burulma salınımının RK4 ile tümlenmesi, kosinüs teoremiyle Dünya–Jüpiter uzaklığı,
// açılmış kaynaklardaki yayımlanmış sayılar (Wikipedia, MacTutor, NASA NSSDC, NIST CODATA 2022).
// Kullanım: node scripts/check-g-bilim-tarihinden-deneyler.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "bilim-tarihinden-deneyler";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.HistoryLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
const D = Math.PI / 180;

ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(!/fonts\.googleapis|cdn\.|<script src="http/.test(html), "dış betik ya da yazı tipi yok");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}☀-⛿]/u.test(html.replace("☀", "")), "emoji yok");
const title = html.match(/<title>([^<]+)<\/title>/)[1]; ok(title.startsWith("Bilim Tarihinden Deneyler: ") && [...title].length <= 80, "başlık ≤ 80: " + title.length);
ok(/data-page="bilim-tarihinden-deneyler"/.test(html) && /shared\/app\.js/.test(html) && /shared\/theme\.css/.test(html), "kabuk");
for (const l of ["kepler-yasalari.html", "serbest-dusme.html", "gunes-sistemi.html", "bilimsel-yontem-olcme-ve-belirsizlik.html"]) ok(html.includes(`href="${l}"`), "komşu bağlantı " + l);
ok(!/Pisa[^.]*(gerçekten bıraktı|bırakarak gösterdi)/.test(html), "Pisa miti doğrulanmıyor");
{ // metin ile model tutarlı: Cavendish kuvveti G·M·m/r², Kepler'in Mars'a başlaması 1600, alan yasası bölüm 40 (kısayol) ve 59
  const F = 6.6743e-11 * 158 * 0.73 / 0.225 ** 2; abs(F, 1.5e-7, 0.05e-7, "Cavendish kuvveti"); abs(F / 9.80665 * 1e6, 0.016, 0.0006, "0,016 mg");
  ok(html.includes("yaklaşık 1,5 × 10⁻⁷ N'dur: 0,016 mg") && !html.includes("1,74 × 10⁻⁷"), "kuvvet metni modelle tutarlı");
  ok(html.includes("Mars'la 1600'de") && !html.includes("1602'de Mars"), "Kepler 1600");
  ok(html.includes("40. bölümde önce bir hesap kısayolu") && html.includes("59. bölümde"), "alan yasası bölümleri");
  ok(!/5,514|5514/.test(html) && html.includes("5,513 g/cm³"), "Dünya yoğunluğu NASA 5513");
}

/* ── 1 · Eratosthenes ── */
{
  const E = K.eratosthenes(7.2, 5000, 157.2);
  near(E.Cst, 250000, 1e-12, "Kleomedes 250 000"); near(E.inv, 50, 1e-12);
  near(E.Ckm, 5000 * 2 * Math.PI / (7.2 * D) * 0.1572, 1e-12, "C = d·2π/θ");
  near(K.eratosthenes(7.2, 5040, 157.2).Cst, 252000, 1e-12, "Roma 252 000");
  near(K.eratosthenes(7.2, 5000, 180).Ckm, 45000, 1e-12); near(K.ERA.POLAR_KM, 40007.863, 0); near(K.ERA.EQ_KM, 40075.017, 0);
  near(E.shadow, Math.sin(7.2 * D) / Math.cos(7.2 * D), 1e-12);
  ok(K.STADIA.map((s) => s.m).join() === "157.2,160,166.7,177,180,185,191,210", "stadion listesi (Wikipedia + MacTutor)");
  const sp = K.stadiaSpread(7.2, 5000); near(sp[0].Ckm, 39300, 1e-12); near(sp[7].Ckm, 52500, 1e-12);
  const G = K.geography();
  const u = (lat, lon) => [Math.cos(lat * D) * Math.cos(lon * D), Math.cos(lat * D) * Math.sin(lon * D), Math.sin(lat * D)];
  const a = u(31.1975, 29.8925), b = u(24.08889, 32.89972), gc = 6371 * Math.acos(a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
  near(G.gc, gc, 1e-9, "büyük çember (iç çarpım)"); abs(G.dlon, 3, 0.05, "Syene 3° doğuda (Wikipedia)");
  const T = (-239 - 2000) / 100, lieske = (84381.448 - 46.815 * T - 0.00059 * T * T + 0.001813 * T ** 3) / 3600;
  abs(G.eps, lieske, 0.005, "Laskar ≈ Lieske, MÖ 240");
  abs(K.obliquity(2000), 23 + 26 / 60 + 21.448 / 3600, 1e-12, "J2000 eğiklik");
  abs((G.zA - 7.2) * 60, 16, 1, "Rawlins: 7°12′ 16′ hatalı (MacTutor)");
  ok(G.zS > 0 && G.zS < 0.5, "Syene dönencenin biraz kuzeyinde");
  abs(G.merid, 6371 * 7.10861 * D, 0.01, "meridyen yayı");
  for (const bad of [() => K.eratosthenes(0, 5000, 160), () => K.eratosthenes(7, -1, 160), () => K.eratosthenes(7, 5000, 0)]) { assert.throws(bad); checks++; }
}

/* ── 2 · Galileo ── */
{
  const h = 0.6, L = 6.7, a = K.rampAccel(h, L, "roll");
  // RK4: (m + I/r²) x'' = m g sin θ, I = (2/5) m r²; durağa varış zamanı
  const sinT = h / L, acc = 9.80665 * sinT / (1 + 2 / 5);
  function arrive(d) { let x = 0, v = 0, t = 0; const dt = 1e-4; while (x < d) { const k1v = acc, k1x = v, k2x = v + dt / 2 * k1v, k3x = v + dt / 2 * acc, k4x = v + dt * acc; const nx = x + dt / 6 * (k1x + 2 * k2x + 2 * k3x + k4x); if (nx >= d) { const vf = v; return t + (-vf + Math.sqrt(vf * vf + 2 * acc * (d - x))) / acc; } x = nx; v += dt * acc; t += dt; } return t; }
  for (const f of [0.25, 0.5, 0.75, 1]) near(K.rampTime(f * L, a), arrive(f * L), 1e-6, "varış zamanı " + f);
  near(K.rampTime(L, a) / K.rampTime(L / 4, a), 2, 1e-12, "tam / çeyrek = 2");
  near(K.rampAccel(h, L, "slide") / a, 7 / 5, 1e-12, "kayma / yuvarlanma = 7/5");
  const w = K.waterTrial(4.62, 20, 0.05, 0.1); near(w.mass, 93.4, 1e-12, "su 0,1 g"); near(w.t, 4.67, 1e-12);
  const tr = [0.25, 0.5, 0.75, 1].map((f) => ({ d: f * L, t: K.rampTime(f * L, a) }));
  near(K.powerFit(tr.map((x) => x.d), tr.map((x) => x.t)).n, 2, 1e-9, "gürültüsüz üs 2");
  ok(K.powerFit([1, 1, 1], [1, 1.1, 0.9]) === null && K.powerFit([1, 2], [1, 1.4]) === null, "yetersiz veri");
  let s = 0, z2 = 0; const N = 400;
  for (let seed = 1; seed <= N; seed++) { const T = K.autoTrials({ h, L, kind: "roll", Q: 20, sigma: 0.1, seed, reps: 3, fracs: K.GAL.FRACS }); const F = K.powerFit(T.map((x) => x.d), T.map((x) => x.t)); s += F.n; z2 += ((F.n - 2) / F.se) ** 2; }
  abs(s / N, 2, 0.03, "400 tohumda ortalama üs"); ok(z2 / N > 0.8 && z2 / N < 1.8, "üs belirsizliği gerçekçi: ⟨z²⟩ = " + (z2 / N).toFixed(2));
  const d1 = K.autoTrials({ h, L, kind: "roll", Q: 20, sigma: 0.1, seed: 1, reps: 3, fracs: K.GAL.FRACS });
  near(d1[11].mass, 99.2, 1e-12, "varsayılan son deneme"); near(K.naiveG(L, K.rampTime(L, a), h, L), 9.80665 * 5 / 7, 1e-12, "saf g = 5g/7");
  assert.throws(() => K.rampAccel(7, 6.7, "roll")); checks++;
}

/* ── 3 · Kepler ── */
{
  const e = 0.0935; near(K.KEP.E, e, 0, "NSSDC Mars e");
  const bis = (M) => { let lo = M - 1, hi = M + 1; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (m - e * Math.sin(m) < M) lo = m; else hi = m; } return (lo + hi) / 2; };
  for (const M of [0.1, 1, 2.5, 3.14, 4, 6]) {
    const E = bis(M); near(K.solveKepler(M, e), E, 1e-12, "Kepler denklemi");
    const x = Math.cos(E) - e, y = Math.sqrt(1 - e * e) * Math.sin(E), P = K.ellipsePos(M, e);
    abs(K.wrapPi(P.nu - Math.atan2(y, x)), 0, 1e-12, "parametrik elips ν"); near(P.r, Math.hypot(x, y), 1e-12, "r");
  }
  { // alan yasası: eşit ΔM, eşit taranan alan
    const area = (M1, M2) => { let A = 0, n = 4000; for (let i = 0; i < n; i++) { const a1 = K.ellipsePos(M1 + (M2 - M1) * i / n, e), a2 = K.ellipsePos(M1 + (M2 - M1) * (i + 1) / n, e); A += 0.5 * a1.r * a2.r * Math.sin(K.wrapPi(a2.nu - a1.nu)); } return A; };
    near(area(0, 0.3), area(3, 3.3), 1e-6, "eşit zamanda eşit alan");
  }
  for (const [M, c, q] of [[0.7, 0.1, 0.08], [2.9, 0.0935, 0.0935], [5.1, 0.12, 0.05]]) { // ekuant: ikiye bölmeyle |P − C| = 1
    const Qx = -c - q; let lo = 0, hi = 3; for (let i = 0; i < 200; i++) { const t = (lo + hi) / 2, x = Qx + t * Math.cos(M), y = t * Math.sin(M); if (Math.hypot(x + c, y) < 1) lo = t; else hi = t; }
    const t = (lo + hi) / 2, x = Qx + t * Math.cos(M), y = t * Math.sin(M), P = K.equantPos(M, c, q);
    abs(K.wrapPi(P.nu - Math.atan2(y, x)), 0, 1e-10, "ekuant ν"); near(P.r, Math.hypot(x, y), 1e-10);
  }
  const indepMax = (f) => { let m = 0; for (let i = 0; i < 1440; i++) { const M = 2 * Math.PI * i / 1440, E = bis(M), nu = Math.atan2(Math.sqrt(1 - e * e) * Math.sin(E), Math.cos(E) - e); m = Math.max(m, Math.abs(K.wrapPi(f(M) - nu))); } return m / D * 60; };
  abs(K.orbitScan("circle", {}).maxL, indepMax((M) => M), 0.5, "düzgün çember hatası");
  abs(K.orbitScan("circle", {}).maxL / 60, 2 * e / D, 0.1, "çember ≈ 2e rad");
  const b0 = K.orbitScan("bisect", { c: e }); abs(b0.maxL, 8.98, 0.02, "ikiye bölünmüş ekuant 8,98′"); abs(b0.maxR, 0.433, 0.003);
  let bestBis = Infinity; for (let c = 0; c <= 0.2; c += 0.0005) bestBis = Math.min(bestBis, K.orbitScan("bisect", { c }, e, 360).maxL);
  ok(bestBis > 7, "hiçbir eşit kayma 2′'ye inemez: en iyi " + bestBis.toFixed(2));
  const half = K.orbitScan("bisect", { c: e / 2 }, e / 2).maxL; ok(b0.maxL / half > 3.8 && b0.maxL / half < 4.8, "kalıntı e² ile ölçeklenir: " + (b0.maxL / half).toFixed(2));
  { const es = 0.0125, m = K.orbitScan("bisect", { c: es }, es, 4000).maxL; abs(m / (es * es / 4 / D * 60), 1, 0.04, "küçük e'de hata ≈ e²/4 rad"); abs(e * e / 4 / D * 60, 7.51, 0.01, "Mars için e²/4 = 7,5′"); }
  const obs = K.marsObs(1); ok(obs.length === 12, "12 gözlem");
  const ff = K.fitKepler("free", obs), fs_ = K.orbitScan("free", ff), fo = K.obsStats("free", ff, obs);
  ok(fs_.maxL < 2 && fs_.maxR > 2, `serbest ekuant: boylam ${fs_.maxL.toFixed(2)}′ < 2′, uzaklık ${fs_.maxR.toFixed(2)} % > 2 %`);
  abs(fo.rms, 0.988, 0.005, "serbest uydurma RMS (kaydırıcı adımına yuvarlanınca sayfada 1,05′)"); ok(Math.abs(ff.c / ff.q - 0.11332 / 0.07232) < 0.15, "serbest kaymaların oranı Kepler'inkine yakın (üretim verisi)");
  const fe = K.fitKepler("ellipse", obs); abs(fe.e, e, 0.002, "elips uydurma e");
  const fb = K.fitKepler("bisect", obs); ok(K.obsStats("bisect", fb, obs).rms > 4, "ikiye bölünmüş uydurma RMS > 4′");
  let sr = 0; for (let sd = 1; sd <= 40; sd++) { const o = K.marsObs(sd, 1); sr += K.obsStats("ellipse", { e }, o).rms ** 2; } abs(Math.sqrt(sr / 40), 1, 0.12, "gürültü 1′");
  assert.throws(() => K.equantPos(1, 0.1, 1.2)); assert.throws(() => K.modelPos("x", 1, {})); checks += 2;
}

/* ── 4 · Cavendish ── */
{
  const C = K.CAV; near(C.G, 6.6743e-11, 1e-12, "CODATA 2022"); near(C.GU / C.G, 2.2e-5, 0.01, "bağıl belirsizlik");
  near(C.L, 6 * 0.3048, 1e-12, "6 ft"); near(C.READ, 0.01 * 0.0254, 1e-12, "0,01 inç");
  const th = K.cavDeflection(C.G, 158, 450, C.L, 0.225);
  // κθ = GMmL/r², κ = 4π²I/T², I = mL²/2 (bağımsız birleştirme)
  const m = 0.73, I = m * C.L ** 2 / 2, kap = 4 * Math.PI ** 2 * I / 450 ** 2; near(th, C.G * 158 * m * C.L / 0.225 ** 2 / kap, 1e-12, "tork dengesi");
  near(K.cavG(th, 450, 158, C.L, 0.225), C.G, 1e-12, "G geri dönüş");
  abs(K.gFromDensity(5448), 6.74e-11, 0.006e-11, "5,448 → G ≈ 6,74 × 10⁻¹¹ (Wikipedia)");
  abs(K.earthDensity(C.G) / 5513, 1, 0.003, "ρ(CODATA) ≈ NSSDC 5513");
  // sönümlü salınım: RK4 karşılaştırması ve uç noktalar
  const o = K.torsion(450); o.recenter(0, th);
  { let x = 0, v = 0, t = 0; const dt = 0.05, w0 = 2 * Math.PI / 450, g2 = 2 / (6 * 450); const f = (x, v) => -w0 * w0 * (x - th) - g2 * v;
    for (let i = 0; i < 40000; i++) { const k1x = v, k1v = f(x, v), k2x = v + dt / 2 * k1v, k2v = f(x + dt / 2 * k1x, v + dt / 2 * k1v), k3x = v + dt / 2 * k2v, k3v = f(x + dt / 2 * k2x, v + dt / 2 * k2v), k4x = v + dt * k3v, k4v = f(x + dt * k3x, v + dt * k3v); x += dt / 6 * (k1x + 2 * k2x + 2 * k3x + k4x); v += dt / 6 * (k1v + 2 * k2v + 2 * k3v + k4v); t += dt; if (i % 5000 === 4999) abs(o.at(t), x, 1e-9 * th, "RK4 ile aynı salınım t=" + t.toFixed(0)); } }
  const ex = o.extremes(0, 3000); ok(ex.length === 13, "3000 s'de 13 uç nokta");
  for (const e of ex) abs(o.vel(e.t), 0, 1e-12 * th, "uçta hız 0");
  near(ex[1].t - ex[0].t, o.Td / 2, 1e-9, "yarım periyot"); near(o.Td, 450 / Math.sqrt(1 - (1 / (12 * Math.PI)) ** 2), 1e-12, "sönümlü periyot");
  o.recenter(1200, -th); const ex2 = o.extremes(1200, 4000); ok(ex2.length >= 12 && ex2.every((e) => Math.abs(o.vel(e.t)) < 1e-12 * th), "yeniden merkezlemeden sonra uçlar");
  near(K.equilibrium3([2, 0, 1.8]), 0.95, 1e-12, "üç uçtan denge");
  // tam ölçüm zinciri, 30 tohum
  let sG = 0; const n = 30;
  for (let seed = 1; seed <= n; seed++) {
    const os = K.torsion(450), g = K.gauss(K.rng(seed)), rec = { 1: [], [-1]: [] }, ts = { 1: [], [-1]: [] };
    os.recenter(0, th); for (const e of os.extremes(0, 1500)) { rec[1].push(K.cavReading(e.th, C.L, C.READ, 0.3 * C.READ * g())); ts[1].push(Math.round(e.t)); }
    os.recenter(1500, -th); for (const e of os.extremes(1500, 3000)) { rec[-1].push(K.cavReading(e.th, C.L, C.READ, 0.3 * C.READ * g())); ts[-1].push(Math.round(e.t)); }
    const T = (K.periodFrom(ts[1]) + K.periodFrom(ts[-1])) / 2, tt = (K.equilibrium3(rec[1]) - K.equilibrium3(rec[-1])) / 2 / (C.L / 2);
    sG += K.cavG(tt, T, 158, C.L, 0.225);
  }
  abs(sG / n / C.G, 1, 0.02, "30 tohumda ortalama G");
  assert.throws(() => K.torsion(-1)); checks++;
}

/* ── 5 · Rømer ── */
{
  abs(K.TAU, 499.00478, 0.0001, "1 AB ışık süresi (Wikipedia 499,004 78 s)");
  abs(K.ROM.AU / 660, 226663, 1, "22 dk/çap → 226 663 km/s (Wikipedia)"); abs((K.ROM.AU / 660 / K.ROM.C - 1) * 100, -24.4, 0.05, "−24,4 %");
  abs(2 * K.TAU / 60, 16.63, 0.005, "çap 16,63 dk");
  for (const t of [0, 50, 130, 199.4, 300]) { // kosinüs teoremi
    const dphi = 2 * Math.PI * t * (1 / 365.256 - 1 / 4332.589), aj = 778.479 / 149.598;
    near(K.ejGeom(t).d, Math.sqrt(1 + aj * aj - 2 * aj * Math.cos(dphi)), 1e-12, "Dünya–Jüpiter uzaklığı t=" + t);
  }
  abs(K.ejGeom(0).elong, 180, 1e-9, "karşı konum"); ok(K.ejGeom(199.4).elong < 5, "kavuşum gözlenemez");
  near(K.P_ECL * 24, 42.473, 1e-4, "tutulma periyodu");
  const clean = K.romerObs(1, 0); abs(K.romerFit(clean).tau, K.TAU, 0.5, "gürültüsüz τ"); abs(K.romerFit(clean, K.TAU).rms, 0, 0.01, "doğru τ ile artık 0");
  const o1 = K.romerObs(1); ok(o1.length === 84, "84 gözlem"); ok(o1.every((o) => K.ejGeom(o.tTrue).elong >= 20), "yalnız gözlenebilir");
  const f1 = K.romerFit(o1); abs(f1.tau, 491.47, 0.01, "varsayılan τ̂"); abs(f1.sigTau, 9.61, 0.01);
  abs(K.romerFit(o1, 0).rms, 5.603, 0.001, "τ = 0 artık"); abs(K.romerFit(o1, 660).rms, 2.13, 0.005, "Rømer artığı");
  let s = 0, pull = 0; const n = 60; for (let sd = 1; sd <= n; sd++) { const F = K.romerFit(K.romerObs(sd)); s += F.tau; pull += ((F.tau - K.TAU) / F.sigTau) ** 2; }
  abs(s / n, K.TAU, 3, "60 tohumda ortalama τ̂"); ok(pull / n > 0.6 && pull / n < 1.6, "σ_τ gerçekçi: " + (pull / n).toFixed(2));
}
console.log(`G bilim-tarihinden-deneyler: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

/* ── Tarayıcı ── */
if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let browser; const before = checks;
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
      const has = async (id, s) => { const t = (await read(id)).replace(/ /g, " "); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest("label") && !document.querySelector(`label[for="${e.id}"]`) && !e.getAttribute("aria-label")).map((e) => e.id));
      ok(unlabeled.length === 0, "etiketsiz denetim: " + unlabeled.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll("input[type=range]")].every((e) => { const st = +e.step, v = +e.defaultValue; return Math.abs((v - +e.min) / st - Math.round((v - +e.min) / st)) < 1e-6; })), "varsayılanlar adımda");
      // 1
      await has("eraCst", "250 000 stadion"); await has("eraCkm", "39 300 km"); await has("eraErr", "−1,8 %"); await has("eraFrac", "1/50"); await has("eraStatus", "39 300 ile 52 500 km");
      ok((await page.locator("#eraGeo").textContent()).includes("7°28,4′"), "tepe uzaklığı 7°28,4′");
      await page.click("#eraPreRome"); await has("eraCst", "252 000"); await has("eraCkm", "39 614 km");
      await sel("eraStad", "185"); await has("eraCkm", "46 620 km");
      await range("eraAngle", 10); await range("eraDist", 4000); await has("eraCst", "144 000"); await range("eraAngle", 5); await has("eraCst", "288 000");
      await page.click("#eraPreTrue"); await has("eraAngleOut", "7,11°");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("eraCkm", "39 300 km"); ok((await page.locator("#eraStad").inputValue()) === "157", "R sıfırlar (1)");
      // klavye
      await page.locator("#tab-era").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-rom").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-gal").getAttribute("aria-selected")) === "true", "ArrowRight");
      await page.keyboard.press("ArrowLeft"); await page.keyboard.press("ArrowLeft"); ok((await page.locator("#tab-rom").getAttribute("aria-selected")) === "true", "ArrowLeft sarar");
      // 2
      await page.click("#tab-gal"); await has("galTth", "4,62 s"); await has("galN", "—");
      await page.click("#galAuto"); await has("galN", "1,81 ± 0,09"); await has("galRatio", "2,134"); await has("galG", "7,05 m/s²"); await has("galMass", "99,2 g");
      ok(await page.locator("#galRows tr").count() === 12, "12 satır");
      await page.click("#galGo"); await has("galGo", "Musluğu kapat"); await page.waitForTimeout(4600); await page.click("#galGo");
      const tm = parseFloat((await read("galT")).replace(",", ".")); ok(tm > 4.3 && tm < 5.4, "elle zamanlama " + tm); await has("galMassE", "senin zamanlaman");
      await sel("galKind", "slide"); await has("galTth", "3,91 s"); await has("galN", "—");
      await range("galH", 2); await range("galH", 0.2); await has("galHOut", "20 cm"); await sel("galFrac", "0.25");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("galTth", "4,62 s"); ok(await page.locator("#galRows tr").count() === 1, "R sıfırlar (2)");
      // 3
      await page.click("#tab-kep"); await has("kepMaxL", "8,98′"); await has("kepMaxR", "0,43 %"); await has("kepOut", "12"); await has("kepStatus", "sekiz dakikası");
      ok(await page.locator("#kepQF").isHidden() && await page.locator("#kepEF").isHidden(), "eşit kaymada tek kaydırıcı");
      await sel("kepModel", "free"); await page.click("#kepFit"); await has("kepMaxL", "0,80′"); await has("kepMaxR", "2,54 %"); await has("kepStatus", "uzaklıklar 2,5 % yanlış");
      await sel("kepModel", "ellipse"); await page.click("#kepFit"); await has("kepPar", "e = 0,0935"); await has("kepOut", "0");
      await sel("kepModel", "circle"); ok(await page.locator("#kepFit").isDisabled(), "çemberde uydurma yok"); await has("kepMaxL", "10,73°");
      await sel("kepModel", "bisect"); await range("kepC", 0); await range("kepC", 0.2); await sel("kepNoise", "2"); await has("kepSig", "2,0′");
      await page.fill("#kepSeed", "abc"); await page.locator("#kepSeed").dispatchEvent("change"); ok((await page.locator("#kepSeed").inputValue()) === "1", "geçersiz tohum 1");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("kepMaxL", "8,98′"); await has("kepSig", "1,0′");
      // 5
      await page.click("#tab-rom"); await has("romRms", "5,60 dk"); await has("romFit", "491 ± 10 s"); await has("romN", "84"); await has("romC", "sonsuz");
      await page.click("#romPreR"); await has("romC", "226 663 km/s"); await has("romCE", "−24,4 %"); await has("romRms", "2,13 dk");
      await page.click("#romPreFit"); await has("romRms", "0,97 dk"); await has("romStatus", "gürültü düzeyine");
      await range("romTauIn", 900); await has("romStatus", "fazla"); await range("romDay", 199); await has("romOrbitCap", "gözlenemez");
      await sel("romNoise", "2"); ok(!(await read("romFit")).includes("491"), "gürültü verileri yeniler");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("romRms", "5,60 dk"); await has("romTau", "0 s");
      // 4
      await page.click("#tab-cav"); await has("cavStatus", "nötr"); await has("cavThetaE", "1,17 × 10⁻³"); ok(await page.locator("#cavB").isEnabled(), "B açık");
      await sel("cavSpeed", "120"); await page.click("#cavA"); ok(await page.locator("#cavA").isDisabled(), "A seçili");
      await page.waitForFunction(() => document.getElementById("cavEqA").textContent !== "—", null, { timeout: 30000 }); checks++;
      await page.click("#cavB"); await page.waitForFunction(() => document.getElementById("cavG").textContent !== "—", null, { timeout: 30000 }); checks++;
      const gTxt = (await read("cavG")).replace("−", "-"); const gm = parseFloat(gTxt.replace(",", ".")); ok(gm > 6.2 && gm < 7.2, "ölçülen G " + gTxt);
      const Tm = parseFloat((await read("cavT")).replace(",", ".")); ok(Math.abs(Tm - 7.5) < 0.05, "ölçülen periyot " + Tm);
      await page.locator("h1").click(); await page.keyboard.press(" "); await has("cavRun", "Devam et"); const t1 = await read("cavCap"); await page.waitForTimeout(400); ok(t1 === await read("cavCap"), "boşluk duraklatır");
      await range("cavM", 40); await has("cavG", "—"); await has("cavStatus", "nötr");
      await page.keyboard.press("r"); await has("cavRun", "Duraklat"); await has("cavMOut", "158 kg");
      ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      ok(await page.evaluate(() => Object.isFrozen(HistoryLab) && !Object.getOwnPropertyDescriptor(window, "HistoryLab").writable), "çekirdek salt okunur");
      await page.waitForSelector(".digest", { state: "attached", timeout: 15000 }); await page.locator(".digest").scrollIntoViewIfNeeded();
      ok(await page.locator(".digest").isVisible(), "Keşif Defteri görünür");
      ok((await page.locator(".digest").textContent()).includes("Bilim Tarihinden Beş Deney"), "defter başlığı");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G bilim-tarihinden-deneyler: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
