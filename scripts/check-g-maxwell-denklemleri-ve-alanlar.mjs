// G · maxwell-denklemleri-ve-alanlar.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini YENİDEN KULLANMAZ:
// dikdörtgenin katı açısı (yüz akıları), σ = P cos θ yüzey yükünün doğrudan Coulomb integrali, yüzey akımı halkalarının
// Biot–Savart toplamı, 2-B "Faraday–Biot–Savart" integrali, ince ızgaralı alan sayımı, parçanın 2000 alt parçalı toplamı,
// d'Alembert çözümü (S = 1'de tam öteleme), Fresnel katsayıları ve Z₀ = μ₀c.
// Kullanım: node scripts/check-g-maxwell-denklemleri-ve-alanlar.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "maxwell-denklemleri-ve-alanlar";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.MaxwellLab;
let checks = 0;
const near = (actual, expected, tol, label = "") => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(Math.abs(expected), 1e-300), `${label} ${actual} ≠ ${expected} (göreli tol ${tol})`);
  checks++;
};
const nearAbs = (actual, expected, tol, label = "") => { assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol, `${label} ${actual} ≠ ${expected} (mutlak tol ${tol})`); checks++; };
const ok = (cond, label) => { assert(cond, label); checks++; };

/* ── Sabitler: NIST CODATA 2022 sayfalarında açılan değerler ── */
const EPS0 = 8.8541878188e-12, MU0 = 1.25663706127e-6, C = 299792458;
ok(K.EPS0 === EPS0 && K.MU0 === MU0 && K.C0 === C, "CODATA 2022 sabitleri");
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
nearAbs(MU0 * EPS0 * C * C - 1, 0, 3.2e-10, "μ₀ε₀c² = 1 (iki 1.6×10⁻¹⁰ belirsizlik içinde)");
const kC = 1 / (4 * Math.PI * EPS0);

/* ── 1 · Gauss: yüz akıları = q·Ω/(4π) (dikdörtgenin katı açısı) ── */
function rectSolidAngle(h, x1, x2, y1, y2) { // nokta düzlemden h yüksekte, dikdörtgen [x1,x2]×[y1,y2]
  const F = (x, y) => Math.atan2(x * y, h * Math.sqrt(x * x + y * y + h * h));
  return F(x2, y2) - F(x1, y2) - F(x2, y1) + F(x1, y1);
}
{
  const q = 1e-9, qx = 0, xc = 0.6, a = 0.7;
  const src = K.source("charges", { charges: [{ q, x: qx }] }), F = K.flux(src, K.surface("cube", xc, a), 128);
  const dxp = xc + a - qx, dxm = qx - (xc - a), dy = a; // charge on axis y=z=0
  const exp = [
    q / EPS0 * rectSolidAngle(dxp, -a, a, -a, a) / (4 * Math.PI),
    q / EPS0 * rectSolidAngle(dxm, -a, a, -a, a) / (4 * Math.PI),
  ];
  // ±y yüzü: düzlem y = ±a, dikdörtgen x ∈ [xc−a−qx, xc+a−qx], z ∈ [−a, a]
  const side = q / EPS0 * rectSolidAngle(dy, xc - a - qx, xc + a - qx, -a, a) / (4 * Math.PI);
  near(F.faces[0], exp[0], 2e-4, "+x yüzü"); near(F.faces[1], exp[1], 2e-4, "−x yüzü");
  for (let f = 2; f < 6; f++) near(F.faces[f], side, 2e-4, "yan yüz " + f);
  near(exp[0] + exp[1] + 4 * side, q / EPS0, 1e-12, "katı açılar 4π'ye tamamlanır");
  near(F.total, q / EPS0, 2e-5, "küp toplamı Q/ε₀");
}
for (const [qx, inside] of [[0, true], [0.3, true], [1.2, false], [-1.3, false]]) {
  const src = K.source("charges", { charges: [{ q: 2e-9, x: qx }] }), s = K.surface("sphere", 0, 0.8), F = K.flux(src, s, 128), e = K.enclosed(src, s);
  ok((e.q !== 0) === inside, "içerde/dışarda " + qx);
  if (inside) near(F.total, 2e-9 / EPS0, 2e-4, "küre akısı " + qx); else nearAbs(F.total / F.out, 0, 3e-3, "dış yük net sıfır " + qx);
}
{ // yakınsama: uzak yükte hata ~1/N²
  const src = K.source("charges", { charges: [{ q: 2e-9, x: 0 }, { q: -1e-9, x: 1.2 }] }), s = K.surface("sphere", 0, 0.8), th = 2e-9 / EPS0;
  const e16 = Math.abs(K.flux(src, s, 16).total - th), e64 = Math.abs(K.flux(src, s, 64).total - th);
  ok(e16 / e64 > 10 && e16 / e64 < 25, "1/N² yakınsama " + (e16 / e64).toFixed(2));
  const onS = K.enclosed(K.source("charges", { charges: [{ q: 1e-9, x: 0.8 }] }), s); ok(onS.q === null && onS.onSurface, "yüzeydeki yük tanımsız");
}
// σ = P cos θ yüzey yükünün doğrudan Coulomb integrali (Gauss–Legendre yerine çok noktalı orta nokta, μ = cos θ'da)
function polField(R, P, x, y, z) {
  const Nm = 600, Nf = 600; let ex = 0, ey = 0, ez = 0;
  for (let i = 0; i < Nm; i++) {
    const mu = -1 + (i + 0.5) * 2 / Nm, st = Math.sqrt(1 - mu * mu);
    for (let j = 0; j < Nf; j++) {
      const f = (j + 0.5) * 2 * Math.PI / Nf, sx = R * mu, sy = R * st * Math.cos(f), sz = R * st * Math.sin(f);
      const dq = P * mu * R * R * (2 / Nm) * (2 * Math.PI / Nf), dx = x - sx, dy = y - sy, dz = z - sz, r3 = (dx * dx + dy * dy + dz * dz) ** 1.5;
      ex += kC * dq * dx / r3; ey += kC * dq * dy / r3; ez += kC * dq * dz / r3;
    }
  }
  return [ex, ey, ez];
}
{
  const pol = K.source("pol", { R: 0.5, S: 1e-8 });
  for (const pt of [[1.2, 0.3, 0.1], [0.1, 1.0, 0], [0.1, 0.1, 0.05], [-0.2, 0, 0.1]]) {
    const a = K.field(pol, ...pt), b = polField(0.5, 1e-8, ...pt), m = Math.hypot(...b);
    for (let k = 0; k < 3; k++) nearAbs(a[k], b[k], 2e-3 * m, "kutuplu küre alanı " + pt + " " + k);
  }
  // kesilen başlığın bağlı yükü: θ'da ayrı Simpson integrali, içerde olma testi doğrudan uzaklıkla
  for (const [xc, a] of [[0.5, 0.5], [0.6, 0.3], [-0.4, 0.5], [0.2, 0.9], [0, 0.3]]) {
    const n = 400000, h = Math.PI / n; let q = 0; // orta nokta kuralı: basamaklı integrandda hata ≤ bir şeridin payı
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) * h, x = 0.5 * Math.cos(t), y = 0.5 * Math.sin(t);
      if ((x - xc) ** 2 + y * y < a * a) q += 1e-8 * Math.cos(t) * 2 * Math.PI * 0.25 * Math.sin(t) * h;
    }
    nearAbs(K.enclosed(pol, K.surface("sphere", xc, a)).q, q, 2e-5 * Math.abs(q) + 1e-15, "bağlı yük " + xc + "," + a);
  }
  near(K.flux(pol, K.surface("sphere", 0.5, 0.5), 64).total, K.enclosed(pol, K.surface("sphere", 0.5, 0.5)).q / EPS0, 3e-3, "kesik kutuplu küre akısı");
  const qc = K.enclosed(pol, K.surface("cube", 0.5, 0.4)).q;
  near(K.flux(pol, K.surface("cube", 0.5, 0.4), 64).total, qc / EPS0, 3e-3, "küp: kutuplu küre akısı");
}
{ // mıknatıslanmış küre: yüzey akımı K = M sin θ halkalarının Biot–Savart toplamı (eksen üzerinde)
  const M = 0.015 / MU0, R = 0.5, mag = K.source("mag", { R, S: M });
  const ringSum = x => { const n = 4000, h = Math.PI / n; let b = 0; for (let i = 0; i < n; i++) { const t = (i + 0.5) * h, rho = R * Math.sin(t), xr = R * Math.cos(t), dI = M * Math.sin(t) * R * h; b += MU0 * dI * rho * rho / (2 * (rho * rho + (x - xr) ** 2) ** 1.5); } return b; };
  for (const x of [0, 0.2, 0.9, 1.5, -0.7]) near(K.field(mag, x, 0, 0)[0], ringSum(x), 1e-5, "mıknatıs eksen alanı " + x);
  near(K.field(mag, 0, 0, 0)[0], 0.01, 1e-12, "içeride 10 mT");
  for (const [xc, a] of [[0.5, 0.5], [0, 1], [0.3, 0.4]]) {
    for (const shape of ["sphere", "cube"]) { const F = K.flux(mag, K.surface(shape, xc, a), 128); nearAbs(F.total / F.out, 0, 0.006, `∮B·dA ≈ 0 ${shape} ${xc},${a}`); }
  }
  ok(K.enclosed(mag, K.surface("sphere", 0.5, 0.5)).q === 0, "manyetik yük yok");
}

/* ── 2a · Faraday ── */
// 2-B analoji: E(r) = −(1/2π) ∫ (∂B/∂t) ẑ × (r − r')/|r − r'|² dA' (∇·E = 0 olan rotasyonel alan)
function faradayBS(Rs, dB, x, y) {
  const Nr = 400, Nf = 800; let ex = 0, ey = 0;
  for (let i = 0; i < Nr; i++) { const r = (i + 0.5) * Rs / Nr; for (let j = 0; j < Nf; j++) { const f = (j + 0.5) * 2 * Math.PI / Nf, dx = x - r * Math.cos(f), dy = y - r * Math.sin(f), d2 = dx * dx + dy * dy, w = -dB / (2 * Math.PI) * r * (Rs / Nr) * (2 * Math.PI / Nf) / d2; ex += w * -dy; ey += w * dx; } }
  return [ex, ey];
}
for (const [x, y] of [[0.08, 0], [0.03, 0.12], [-0.2, 0.05]]) { const a = K.inducedE(0.05, 6.283, x, y), b = faradayBS(0.05, 6.283, x, y); nearAbs(a[0], b[0], 1e-4 * Math.hypot(...b), "E dış x"); nearAbs(a[1], b[1], 1e-4 * Math.hypot(...b), "E dış y"); }
{ const a = K.inducedE(0.05, 6.283, 0.02, 0.01), m = Math.hypot(...a); ok(Math.abs(m - 0.5 * 6.283 * Math.hypot(0.02, 0.01)) < 1e-12, "E iç = r/2 · dB/dt"); }
for (const [shape, size, cx] of [["circle", 0.06, 0.06], ["circle", 0.03, 0.12], ["circle", 0.08, 0], ["square", 0.04, 0], ["square", 0.08, 0]]) {
  const G = 3000; let cnt = 0; const h = 2 * (size + 0.06) / G;
  for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) { const x = -0.06 - size + (i + 0.5) * h + Math.min(cx, 0), y = -size - 0.06 + (j + 0.5) * h; const inL = shape === "circle" ? (x - cx) ** 2 + y * y < size * size : Math.abs(x - cx) < size && Math.abs(y) < size; if (inL && x * x + y * y < 0.0025) cnt++; }
  const A = cnt * h * h, At = K.overlapArea(shape, size, cx, 0.05);
  nearAbs(At, A, 2e-6, `kesişim alanı ${shape} ${size} ${cx}`);
  const r = K.faraday({ B0: 0.02, f: 50, phase: 0, Rs: 0.05, shape, size, cx, M: 256 });
  nearAbs(r.circ, -At * r.dBdt, 2e-4 * 0.02 * 2 * Math.PI * 50 * Math.PI * 0.0025 + 1e-3 * Math.abs(At * r.dBdt), "Stokes " + shape + size + cx);
  nearAbs(r.emfFlux, -At * r.dBdt, 3e-4 * Math.abs(r.dBdt) * 0.0079 + 1e-15, "−dΦ/dt " + shape);
}
{ const r = K.faraday({ B0: 0.02, f: 50, phase: Math.PI / 2, Rs: 0.05, shape: "circle", size: 0.08, cx: 0 }); ok(r.dBdt === 0 && r.circ === 0 && r.B === 0.02, "tepe anında dB/dt = 0"); }

/* ── 2b · Ampère–Maxwell ── */
{ // sonlu parçanın alanı: 2000 alt parçalı Biot–Savart toplamı
  const [ax, ay, az, bx, by, bz, I] = [0.01, -0.02, 0.03, 0.05, 0.04, -0.01, 2.5], P = [0.07, 0.01, 0.02];
  const n = 2000; let B = [0, 0, 0];
  for (let k = 0; k < n; k++) { const t = (k + 0.5) / n, x = ax + (bx - ax) * t, y = ay + (by - ay) * t, z = az + (bz - az) * t, dl = [(bx - ax) / n, (by - ay) / n, (bz - az) / n], r = [P[0] - x, P[1] - y, P[2] - z], r3 = Math.hypot(...r) ** 3; B[0] += MU0 * I / (4 * Math.PI) * (dl[1] * r[2] - dl[2] * r[1]) / r3; B[1] += MU0 * I / (4 * Math.PI) * (dl[2] * r[0] - dl[0] * r[2]) / r3; B[2] += MU0 * I / (4 * Math.PI) * (dl[0] * r[1] - dl[1] * r[0]) / r3; }
  const b = K.segB(ax, ay, az, bx, by, bz, I, ...P), m = Math.hypot(...B);
  for (let k = 0; k < 3; k++) nearAbs(b[k], B[k], 1e-6 * m, "parça Biot–Savart " + k);
  near(Math.hypot(...K.segB(0, 0, -1e4, 0, 0, 1e4, 3, 0.02, 0, 0)), MU0 * 3 / (2 * Math.PI * 0.02), 1e-9, "sonsuz tel sınırı");
}
for (const [s, z0, d] of [[0.05, 0.05, 0.01], [0.2, 0.05, 0.01], [0.02, 0.03, 0.01], [0.3, 0.3, 0.05], [0.1, 0.1, 0.02]]) {
  const r = K.ampereMaxwell({ I: 1.7, a: 0.1, d, s, z0, displacement: true });
  near(r.circOverMu, 1.7, 2e-5, `∮B·dl = μ₀I s=${s}`);
  near(r.S1, 1.7, 1e-12, "S₁"); near(r.S2, 1.7, 1e-9, "S₂ toplamı");
  near(r.S2disp, 1.7 * Math.min(1, s * s / 0.01), 1e-9, "yer değiştirme payı (s/a)²");
  nearAbs(r.S2cond, s < 0.1 ? 1.7 * (1 - s * s / 0.01) : 0, 1e-9, "plaka payı");
  const r0 = K.ampereMaxwell({ I: 1.7, a: 0.1, d, s, z0, displacement: false });
  ok(Math.abs(r0.circOverMu - 1.7) > 1e-3 * 1.7, "J_d olmadan Ampère bozulur " + s);
}
// yol plakaların arasında (|z₀| < d/2): iki yüzey de yalnız J_d·πs² sayar; B = μ₀I_iç/(2πs) (çözümlü örnek: 1.0 µT)
for (const [s, z0, d] of [[0.05, 0, 0.01], [0.05, 0.02, 0.05], [0.08, 0.01, 0.03], [0.2, 0, 0.01]]) {
  const r = K.ampereMaxwell({ I: 1, a: 0.1, d, s, z0, displacement: true }), Ienc = Math.min(1, s * s / 0.01);
  ok(r.inGap && !r.onPlate, "aralıkta " + s + "," + z0);
  near(r.S1, Ienc, 1e-9, "S₁ aralıkta"); near(r.S2, Ienc, 1e-9, "S₂ aralıkta (plaka payı yok)"); ok(r.S2cond === 0 && r.S1cond === 0, "aralıkta iletim yok");
  near(r.circ / (2 * Math.PI * s), MU0 * Ienc / (2 * Math.PI * s), 3e-3, "aralıkta B = μ₀I_iç/(2πs) " + s);
}
ok(K.ampereMaxwell({ I: 1, a: 0.1, d: 0.02, s: 0.05, z0: 0.01, displacement: true }).onPlate, "z₀ = d/2 plakada");

/* ── 3 · FDTD ── */
{ // S = 1: d'Alembert çözümü, darbe her adımda tam bir hücre kayar
  const st = K.fdtd({ S: 1, dx: 1e-3, n2: 1, sigma: 15, E0: 1, medium: "vac", mode: "oneway" });
  st.advance(100);
  let err = 0; for (let i = 100; i < 900; i++) err = Math.max(err, Math.abs(st.E[i] - Math.exp(-((i - 100 - 250) ** 2) / 450)));
  ok(err < 1e-12, "S = 1 tam öteleme " + err);
  near(st.ratio(320, 380), 1 / Math.sqrt(MU0 * EPS0), 1e-12, "E/B = c");
}
for (const n2 of [1.5, 2, 3]) for (const S of [0.5, 1]) {
  const R = K.fdtdRun({ S, dx: 1e-3, n2, sigma: 15, E0: 1, medium: "diel", mode: "oneway" }), st = R.st;
  const Ainc = 15 * Math.sqrt(2 * Math.PI) * 1e-3, fr = { r: (1 - n2) / (1 + n2), t: 2 / (1 + n2) };
  nearAbs(st.area(250, 499) / Ainc, fr.r, 2e-4, `r n=${n2} S=${S}`);
  nearAbs(n2 * st.area(501, 999) / Ainc, fr.t, 2e-3, `t n=${n2} S=${S}`);
  const Rm = st.energy(250, 499) / R.U0, Tm = st.energy(500, 1000) / R.U0;
  nearAbs(Rm + Tm, 1, 1e-5, "enerji korunumu"); nearAbs(Rm, fr.r ** 2, 5e-3 * Math.max(fr.r ** 2, 0.01) + 2e-4, "R ≈ r²");
  nearAbs(st.poynting / R.U0, 1 - st.energy(0, 400) / R.U0 - 0 * Rm, 1e-6 + 0, "Poynting = sol bölgeden çıkan enerji");
  const v = K.fitSlope(R.track), c = 1 / Math.sqrt(MU0 * EPS0);
  nearAbs(v / c - 1, 0, S === 1 ? 1e-9 : 1e-3, "darbe hızı " + S);
}
{ const R = K.fdtdRun({ S: 0.5, dx: 1e-3, n2: 1, sigma: 15, E0: 1, medium: "pec", mode: "oneway" }); nearAbs(R.st.area(250, 499) / (15 * Math.sqrt(2 * Math.PI) * 1e-3), -1, 1e-4, "iletken r = −1"); nearAbs(R.st.poynting / R.U0, 0, 1e-5, "iletken: net akı 0"); }
for (const S of [0.25, 0.5, 0.9, 0.99, 1]) { const st = K.fdtd({ S, dx: 1e-3, n2: 2, sigma: 3, E0: 1, medium: "diel", mode: "oneway" }); st.advance(Math.round(800 / S)); ok(!st.unstable && st.maxE < 1.01, "kararlı S = " + S); }
for (const S of [1.01, 1.05]) { const st = K.fdtd({ S, dx: 1e-3, n2: 1, sigma: 15, E0: 1, medium: "vac", mode: "oneway" }); st.advance(2000); ok(st.unstable, "kararsız S = " + S); }
{ // sayısal dağılım: S küçüldükçe ve darbe daraldıkça hız hatası büyür
  const err = (S, sg) => Math.abs(K.fitSlope(K.fdtdRun({ S, dx: 1e-3, n2: 1, sigma: sg, E0: 1, medium: "vac", mode: "oneway" }).track) * Math.sqrt(MU0 * EPS0) - 1);
  ok(err(0.5, 3) > err(0.5, 15) && err(0.5, 15) > err(0.9, 15), "dağılım sıralaması");
}

/* ── 4 · Düzlem dalga ── */
{
  const w = K.planeWave(1e8, 30);
  near(w.lambda, 2.99792458, 1e-15, "λ(100 MHz)"); near(w.B0, 30 / C, 1e-15, "B₀");
  near(w.Z0, MU0 * C, 1e-9, "Z₀ = μ₀c"); near(w.I, 900 / (2 * MU0 * C), 1e-9, "⟨S⟩ = E₀²/(2Z₀)"); near(w.I, w.u * C, 1e-9, "⟨S⟩ = ⟨u⟩c");
  near(w.c, C, 1e-11, "c hesaplanan");
}
for (const bad of [() => K.surface("cone", 0, 1), () => K.surface("sphere", 0, 0), () => K.flux(K.source("pol", { R: 0.5, S: 1 }), K.surface("cube", 0, 1), 0), () => K.loop("hex", 1, 0, 8), () => K.fdtd({ S: 0, dx: 1e-3, n2: 1, sigma: 1, E0: 1 }), () => K.planeWave(-1, 1), () => K.source("x")]) { assert.throws(bad); checks++; }
console.log(`G ${SLUG}: ${checks} bağımsız katı açı, Coulomb/Biot–Savart integrali, d'Alembert, Fresnel ve korunum denetimi PASS`);

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
      const page = await ctx.newPage(); page.setDefaultTimeout(8000);
      const errors = []; page.on("pageerror", e => errors.push(e.message)); page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      await page.waitForTimeout(250);
      const click = id => page.locator("#" + id).click(), read = async id => (await page.locator("#" + id).innerText()).trim();
      const eq = (a, b, label) => { assert.equal(a, b, `[${width}] ${label || ""}`); checks++; };
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `[${width}] #${id}: "${t}" içinde "${text}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, v);
      const pick = (id, v) => page.locator("#" + id).selectOption(v);
      const settle = () => page.waitForTimeout(60);
      const conv = () => page.waitForFunction(() => document.getElementById("gChart").dataset.ready === "1", null, { timeout: 5000 });
      const clean = async sel => { const t = await page.locator(sel).innerText(); assert(!/NaN|Infinity|undefined|null/.test(t), `[${width}] ${sel} bozuk sayı: ${t.match(/.{0,30}(NaN|Infinity|undefined|null).{0,30}/)?.[0]}`); checks++; };
      const noOverflow = async () => eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "yatay taşma");
      const drawn = async id => eq(await page.evaluate(id => { const c = document.getElementById(id), d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++; return n > 500; }, id), true, id + " boş");

      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content input, .app-content select")].filter(e => !document.querySelector(`label[for="${e.id}"]`)).length), 0, "etiketsiz denetim");
      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].filter(c => c.getAttribute("role") !== "img" || !c.getAttribute("aria-label")).length), 0, "rolsüz tuval");
      eq(await page.evaluate(() => Object.isFrozen(MaxwellLab) && !Object.getOwnPropertyDescriptor(window, "MaxwellLab").writable), true, "çekirdek salt okunur");
      eq(await page.evaluate(() => [...document.querySelectorAll("input[type=range]")].every(e => { const st = Number(e.step), k = (Number(e.value) - Number(e.min)) / st; return Math.abs(k - Math.round(k)) < 1e-9; })), true, "varsayılanlar adım ızgarasında");
      eq(await page.evaluate(() => /[̀-ͯ]/.test(document.body.innerText)), false, "birleşik işaret yok");
      eq(await page.evaluate(() => [...document.querySelectorAll("link[href^=http], script[src^=http]")].length), 0, "dış kaynak yok");

      /* 01 · Gauss */
      await has("gMeas", "225.97 N·m²/C"); await has("gTheory", "225.88 N·m²/C"); await has("gDiff", "+0.039 %"); await has("gEnc", "2.000 nC"); await has("gMeasInfo", "2048 hücre");
      await conv(); await drawn("gChart"); await drawn("gMap");
      await pick("gN", "128"); await settle(); await has("gDiff", "+0.002 %");
      await click("gPreOut"); await settle(); await has("gTheory", "0 N·m²/C"); await has("gDiff", "−0.274 %"); await has("gOut", "32.394"); await has("gStatus", "birbirini götürüyor");
      await click("gPreEdge"); await settle(); await has("gDiff", "+1.551 %"); await has("gStatus", "10.0 cm"); eq(await page.locator("#gStatus").getAttribute("class"), "mx-status is-warn", "kenar uyarısı");
      await click("gPreCube"); await settle(); await has("gMeas", "112.96 N·m²/C"); await has("gTheory", "112.94 N·m²/C"); await has("gEnc", "1.000 nC"); eq(await page.locator("#gFacesWrap").isVisible(), true, "yüz tablosu"); await has("gFaces", "Toplam");
      await click("gPreMag"); await settle(); await has("gTheory", "0 Wb"); await has("gDiff", "0.923 %"); await has("gOut", "5.614 mWb"); await has("gStatus", "tek bir kutup ayrılmıyor"); eq(await page.locator("#gQ1").isVisible(), false, "yük denetimleri gizli");
      await click("gPrePol"); await settle(); await has("gMeas", "666.67 N·m²/C"); await has("gTheory", "665.28 N·m²/C"); await has("gEnc", "5.890 nC"); await has("gDiff", "+0.209 %");
      await pick("gShape", "cube"); await settle(); await clean("#panel-g"); await conv(); await clean("#panel-g");
      await click("gReset"); await range("gX1", 0.8); await settle(); await has("gMeas", "tanımsız"); await has("gStatus", "tam üstünde"); await clean("#panel-g");
      for (const [id, v] of [["gA", 0.1], ["gA", 1.5], ["gXc", -1.5], ["gXc", 1.5], ["gQ1", -5], ["gQ2", 0], ["gQ1", 0]]) { await range(id, v); await settle(); await clean("#panel-g"); }
      await page.locator("h1").click(); await page.keyboard.press("r"); await settle(); await has("gMeas", "225.97 N·m²/C"); eq(await page.locator("#gN").inputValue(), "32", "R sıfırlar");
      await noOverflow();

      /* 02 · Faraday / Ampère–Maxwell */
      await click("tab-f"); await settle();
      await has("fK1", "−49.35 mV"); await has("fK2", "−49.34 mV"); await has("fK3", "−49.35 mV"); await has("fK3I", "0.000 %"); await has("fK4", "6.283 T/s");
      await drawn("fMap"); await drawn("fChart");
      await click("fPreOut"); await settle(); await has("fK1", "0 V"); await has("fK3I", "sarmıyor"); await has("fK4I", "66.51 mV/m"); eq(await page.locator("#fCx").isVisible(), true, "kaydırma görünür");
      await click("fPrePeak"); await settle(); await has("fK1", "0 V"); await has("fK4", "20.00 mT · 0 T/s"); await has("fStatus", "dB/dt = 0");
      await click("fReset"); await pick("fShape", "co"); await range("fCx", 0.06); await range("fSize", 0.06); await settle(); await has("fK3", "−20.23 mV"); await has("fK1", "−20.23 mV");
      await pick("fShape", "sq"); await pick("fM", "8"); await settle(); await has("fStatus", "parça sayısını artır"); await clean("#panel-f");
      for (const [id, v] of [["fB0", 1], ["fB0", 100], ["fF", 500], ["fPh", 360], ["fSize", 0.01], ["fSize", 0.15]]) { await range(id, v); await settle(); await clean("#panel-f"); }
      await pick("fMode", "amp"); await settle();
      await has("fK1", "1.00000 A"); await has("fK1I", "yolda B = 4.000 µT"); await has("fK3", "1.00000 A"); await has("fK3I", "0.7500 A"); await has("fK3I", "0.2500 A"); await has("fK2I", "iletim 1.000 A");
      await click("aPreWide"); await settle(); await has("fK3I", "plakadaki akım 0 A"); await has("fK1", "0.999999 A");
      await click("aPreGap"); await settle(); await has("aZOut", "0.00 m"); await has("fK1", "0.250321 A"); await has("fK1I", "yolda B = 1.001 µT"); await has("fK2", "0.250000 A"); await has("fK3", "0.250000 A"); await has("fK3I", "plakadaki akım 0 A"); await has("fStatus", "plakaların arasında"); await has("fStatus", "1.000 µT");
      await range("aD", 0.02); await range("aZ", 0.01); await settle(); await has("fK1", "—"); await has("fStatus", "plakanın düzleminde"); await clean("#panel-f");
      await click("aPreNo"); await settle(); await has("fK1", "0.991145 A"); await has("fStatus", "çelişkiyi kaldırır"); eq(await page.locator("#fStatus").getAttribute("class"), "mx-status is-warn", "Maxwell terimi uyarısı");
      await click("fReset"); await pick("fMode", "amp"); await range("aD", 0.05); await settle(); await has("fStatus", "kenar alanı"); await clean("#panel-f");
      for (const [id, v] of [["aI", 0.1], ["aI", 5], ["aS", 0.01], ["aS", 0.3], ["aZ", 0], ["aZ", 0.03], ["aZ", 0.3]]) { await range(id, v); await settle(); await clean("#panel-f"); }
      await drawn("fMap"); await drawn("fChart");
      await page.locator("h1").click(); await page.keyboard.press("R"); await settle(); eq(await page.locator("#fMode").inputValue(), "far", "R sıfırlar"); await has("fK1", "−49.35 mV");
      await noOverflow();

      /* 03 · FDTD */
      await click("tab-w"); await settle();
      await has("wGo", "Başlat"); await has("wR", "ölçülüyor"); await has("wStatus", "bekliyor");
      await click("wSkip"); await settle();
      await has("wV", "2.996678×10⁸ m/s"); await has("wVI", "−0.0416 %"); await has("wEB", "2.997925×10⁸ m/s"); await has("wR", "−0.20000"); await has("wT", "0.80000"); await has("wRT", "1.000000"); await has("wRTI", "R = 0.03993"); await has("wP", "0.960067"); await has("wN2", "n = 1.5017"); await has("wGo", "Yeniden başlat");
      await clean("#panel-w"); await drawn("wField"); await drawn("wChart");
      await pick("wS", "1"); await click("wSkip"); await settle(); await has("wVI", "fark 0.0000 %"); await has("wStatus", "tamdır"); await has("wN2", "n = 1.5010");
      await pick("wMed", "pec"); await click("wSkip"); await settle(); await has("wR", "−1.00000"); await has("wN2", "dalga yok"); eq(await page.locator("#wN").isVisible(), false, "iletkende n gizli");
      await pick("wMed", "vac"); await pick("wMode", "Eonly"); await pick("wS", "0.5"); await click("wSkip"); await settle(); await has("wVI", "−0.0416 %"); await has("wStatus", "Sola giden yarı");
      await click("wReset"); await pick("wPulse", "3"); await click("wSkip"); await settle(); await has("wVI", "−0.6888 %"); await has("wRTI", "R = 0.03831"); await has("wStatus", "çözemiyor");
      await pick("wS", "1.01"); await click("wSkip"); await settle(); await has("wU", "sınırsız"); await has("wStatus", "Courant"); eq(await page.locator("#wStatus").getAttribute("class"), "mx-status is-warn", "kararsızlık uyarısı"); await clean("#panel-w"); await drawn("wChart");
      await pick("wS", "1.05"); await click("wSkip"); await settle(); await has("wR", "—");
      await range("wN", 3); await range("wN", 1); await settle(); await clean("#panel-w");
      // gerçek zamanlı oynatma + klavye
      await click("wReset"); await pick("wRate", "960"); await page.locator("h1").click(); await page.keyboard.press("Space"); await has("wGo", "Duraklat");
      await page.waitForFunction(() => /−0\.20000/.test(document.getElementById("wR").textContent), null, { timeout: 6000 }); await has("wP", "0.960067");
      await page.keyboard.press("Space"); await has("wGo", "Başlat");
      await page.keyboard.press("r"); await settle(); await has("wR", "ölçülüyor"); eq(await page.locator("#wRate").inputValue(), "240", "R sıfırlar");
      await page.locator("#wN").focus(); await page.keyboard.press("Space"); await has("wGo", "Başlat");
      await noOverflow();

      /* 04 · Özet */
      await click("tab-s"); await settle();
      await has("sC", "299792457.9998 m/s"); await has("sCI", "−6.0×10⁻¹³"); await has("sZ", "376.730313 Ω"); await has("sL", "2.998 m"); await has("sB", "100.1 nT"); await has("sI", "1.194 W/m²"); await has("sU", "3.984 nJ/m³");
      await pick("sF", "5.45e14"); await settle(); await has("sL", "550.1 nm"); await pick("sF", "50"); await settle(); await has("sL", "5996 km"); await range("sE", 1000); await settle(); await clean("#panel-s");
      await click("sReset"); await settle(); await has("sB", "100.1 nT"); await drawn("sWave");
      await page.locator("[data-go=f][data-mode=amp]").click(); await settle(); eq(await page.locator("#tab-f").getAttribute("aria-selected"), "true", "özet bağlantısı"); eq(await page.locator("#fMode").inputValue(), "amp", "kondansatör deneyi");
      // sekme klavyesi
      await page.locator("#tab-f").focus(); await page.keyboard.press("Home"); eq(await page.locator("#tab-g").getAttribute("aria-selected"), "true", "Home");
      await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-f").getAttribute("aria-selected"), "true", "sağ ok"); eq(await page.locator("#panel-f").isVisible(), true, "panel görünür");
      await page.keyboard.press("End"); eq(await page.locator("#tab-s").getAttribute("aria-selected"), "true", "End"); await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-g").getAttribute("aria-selected"), "true", "sarma");
      await page.keyboard.press("ArrowLeft"); eq(await page.locator("#tab-s").getAttribute("aria-selected"), "true", "sol ok"); eq(await page.locator("#tab-g").getAttribute("tabindex"), "-1", "tabindex");
      await noOverflow();
      assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      console.log(`G ${SLUG}: ${width} px ${theme} · ${checks - before} arayüz denetimi PASS`);
      await ctx.close();
    }
  } finally { await browser?.close(); await new Promise(r => server.close(r)); }
}
