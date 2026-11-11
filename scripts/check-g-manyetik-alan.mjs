// G · manyetik-alan.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini YENİDEN KULLANMAZ:
// halka için eliptik integralli tam çözüm (eksen dışı), kendi Simpson/Gauss kareleme yazılarımız, açı toplamı ile
// Ampère, sonlu tel kapalı biçimleri, dipol akısının diskte doğrudan integrali, RC benzeri üstel çözümler ve enerji dengesi.
// Kullanım: node scripts/check-g-manyetik-alan.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../manyetik-alan.html", import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.MagLab;
let checks = 0;
const near = (actual, expected, tol = 1e-9, label = "") => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(Math.abs(expected), 1e-300), `${label} ${actual} ≠ ${expected} (göreli tol ${tol})`);
  checks++;
};
const nearAbs = (actual, expected, tol, label = "") => { assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol, `${label} ${actual} ≠ ${expected} (mutlak tol ${tol})`); checks++; };
const ok = (cond, label) => { assert(cond, label); checks++; };

/* ── Sabitler: NIST CODATA 2022 sayfasında açılan değer ── */
const MU0 = 1.25663706127e-6;
ok(K.MU0 === MU0, "μ₀ CODATA 2022");
ok(K.MU0_OLD === 4 * Math.PI * 1e-7 && K.G0 === 9.80665, "eski μ₀ ve g");
near(K.MU0 / K.MU0_OLD - 1, -1.3203e-10, 1e-3, "μ₀ farkı");
ok(Math.abs(K.MU0 / K.MU0_OLD - 1) < 2 * 1.6e-10 * 1.0001, "fark belirsizliğin iki katından küçük");
ok(Object.isFrozen(K) && Object.isFrozen(K.theory), "çekirdek dondurulmuş");

/* ── Bağımsız yardımcılar ── */
function ellipKE(m) { // tam eliptik integraller K(m), E(m) — AGM
  let a = 1, b = Math.sqrt(1 - m), c = Math.sqrt(m), sum = 0.5 * c * c, p2 = 1;
  for (let i = 0; i < 40 && Math.abs(c) > 1e-17; i++) { const an = (a + b) / 2; c = (a - b) / 2; b = Math.sqrt(a * b); a = an; p2 *= 2; sum += p2 * 0.5 * c * c; }
  const Kv = Math.PI / (2 * a); return [Kv, Kv * (1 - sum)];
}
function loopExact(I, R, rho, z) { // yarıçap R halka, z = 0'da; (rho, z) noktasında [B_rho, B_z] (Smythe)
  const q = (R + rho) ** 2 + z * z, m = 4 * R * rho / q, [Kv, Ev] = ellipKE(m), c = MU0 * I / (2 * Math.PI * Math.sqrt(q)), d = (R - rho) ** 2 + z * z;
  const Bz = c * (Kv + (R * R - rho * rho - z * z) / d * Ev);
  const Br = rho === 0 ? 0 : c * z / rho * (-Kv + (R * R + rho * rho + z * z) / d * Ev);
  return [Br, Bz];
}
function simpson(f, a, b, n) { n += n % 2; const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; }

/* ── 1. Biot–Savart ── */
{ // düz tel: sonlu tel kapalı biçimi (kendi yazımımız) ve orta nokta kuralının 2. mertebe yakınsaması
  const I = 7, L = 3, d = 0.11, ref = MU0 * I / (4 * Math.PI * d) * 2 * (L / 2) / Math.hypot(L / 2, d);
  const errs = [128, 256, 512, 1024].map(n => K.probe(K.setup({ kind: "wire", I, n, L }), d) / ref - 1);
  for (let i = 1; i < errs.length; i++) near(errs[i - 1] / errs[i], 4, 0.02, "tel: hata oranı ≈ 4");
  near(K.probe(K.setup({ kind: "wire", I, n: 4096, L }), d), ref, 2e-6, "tel 4096 parça");
  near(K.theory.wireFinite(I, d, L), ref, 1e-13); near(K.theory.wireInf(I, d), 2e-7 * I / d * (MU0 / (4 * Math.PI * 1e-7)), 1e-13);
  // varsayılan: I = 10 A, L = 2 m, d = 0.05 m, 64 parça
  const st = K.setup({ kind: "wire", I: 10, n: 64, L: 2 }), b = K.bField(st.srcs, 0.05, 0, 0);
  near(b[1], 39.936e-6, 1e-4, "tel varsayılan"); nearAbs(b[0], 0, 1e-18); nearAbs(b[2], 0, 1e-18);
}
{ // halka: merkezde n-gen orta nokta formülü (bağımsız türetme) ve eksen dışı tam çözüm
  const I = 10, R = 0.1;
  for (const n of [3, 8, 16, 64, 256]) { const x = Math.PI / n; near(K.probe(K.setup({ kind: "loop", I, n, R }), 0) / (MU0 * I / (2 * R)), n * Math.sin(x) / (Math.PI * Math.cos(x) ** 2), 1e-12, "n-gen merkez " + n); }
  near(K.probe(K.setup({ kind: "loop", I, n: 64, R }), 0), 62.958e-6, 1e-4, "halka varsayılan 62.96 µT");
  const st = K.setup({ kind: "loop", I, n: 2048, R: 0.1 });
  for (const [rho, z] of [[0, 0.05], [0.03, 0], [0.05, 0.04], [0.15, -0.02], [0.3, 0.2], [0.02, -0.3]]) {
    const e = loopExact(I, R, rho, z), b = K.bField(st.srcs, rho, 0, z);
    const mag = Math.hypot(e[0], e[1]); nearAbs(b[2], e[1], 3e-6 * mag, `halka Bz (${rho}, ${z})`); if (rho) nearAbs(b[0], e[0], 3e-6 * mag, `halka Bρ (${rho}, ${z})`);
    nearAbs(b[1], 0, 1e-12 * Math.abs(e[1]) + 1e-15, "Bφ = 0");
  }
  for (const z of [0, 0.05, -0.2]) near(K.theory.loopAxis(I, R, z), loopExact(I, R, 0, z)[1], 1e-12, "eksen formülü");
}
{ // div B = 0 ve eksen dışında rot B = 0 (merkezi farklarla)
  const st = K.setup({ kind: "solenoid", I: 2, n: 32, R: 0.02, len: 0.4, turns: 40 }), h = 1e-4;
  for (const [x, y, z] of [[0.05, 0.01, 0.1], [0.03, -0.02, 0.25], [0.0, 0.006, 0.05]]) {
    const B = (a, b, c) => K.bField(st.srcs, a, b, c);
    const div = (B(x + h, y, z)[0] - B(x - h, y, z)[0] + B(x, y + h, z)[1] - B(x, y - h, z)[1] + B(x, y, z + h)[2] - B(x, y, z - h)[2]) / (2 * h);
    const mag = Math.hypot(...B(x, y, z));
    ok(Math.abs(div) * h < 1e-6 * mag, `div B ≈ 0 (${div})`);
  }
  // rot B = 0 yalnız kapalı akımda beklenir (sarmalın açık uçları net eksen akımı taşır); kapalı halkada sınanır
  const lp = K.setup({ kind: "loop", I: 3, n: 1024, R: 0.1 });
  for (const [x, y, z] of [[0.05, 0.01, 0.1], [0.13, -0.02, 0.05], [0.02, 0.006, -0.03]]) {
    const B = (a, b, c) => K.bField(lp.srcs, a, b, c), mag = Math.hypot(...B(x, y, z));
    const cx = (B(x, y + h, z)[2] - B(x, y - h, z)[2] - B(x, y, z + h)[1] + B(x, y, z - h)[1]) / (2 * h);
    const cy = (B(x, y, z + h)[0] - B(x, y, z - h)[0] - B(x + h, y, z)[2] + B(x - h, y, z)[2]) / (2 * h);
    const cz = (B(x + h, y, z)[1] - B(x - h, y, z)[1] - B(x, y + h, z)[0] + B(x, y - h, z)[0]) / (2 * h);
    ok(Math.hypot(cx, cy, cz) * 0.1 < 1e-4 * mag, `rot B ≈ 0 (kapalı halka) ${Math.hypot(cx, cy, cz)}`);
  }
}
{ // Helmholtz: kapalı biçim toplamı, merkez değeri, s = R'de dördüncü mertebe düzlük
  const I = 10, R = 0.1, f = (s, z) => loopExact(I, R, 0, z - s / 2)[1] + loopExact(I, R, 0, z + s / 2)[1];
  near(K.theory.helmholtzCentre(I, R), f(R, 0), 1e-12, "Helmholtz merkez");
  const h = 1e-3, d2 = s => (f(s, h) - 2 * f(s, 0) + f(s, -h)) / (h * h);
  ok(Math.abs(d2(R)) * R * R < 1e-3 * f(R, 0) && Math.abs(d2(R)) < 1e-3 * Math.abs(d2(0.8 * R)) && d2(0.8 * R) < 0 && d2(1.2 * R) > 0, "s = R'de ikinci türev sıfır");
  near(1 - f(R, R / 4) / f(R, 0), 144 / 125 * (1 / 4) ** 4, 0.1, "Taylor: (144/125)(z/R)⁴");
  near(K.uniformity(z => f(R, z), R / 4), K.uniformity(z => K.theory.helmholtzAxis(I, R, R, z), R / 4), 1e-9);
  const ss = [0.6, 0.8, 1, 1.2, 1.5].map(k => K.uniformity(z => f(k * R, z), R / 4));
  ok(ss[2] < ss[1] && ss[2] < ss[3] && ss[1] < ss[0] && ss[3] < ss[4], "düzgünlük s = R'de en iyi");
  const st = K.setup({ kind: "helmholtz", I, n: 1024, R, s: R });
  near(K.probe(st, 0.02), f(R, 0.02), 2e-5, "Helmholtz sayısal");
  near(K.uniformity(z => K.probe(K.setup({ kind: "helmholtz", I, n: 64, R, s: R }), z), R / 4), 0.00408, 0.01, "varsayılan düzgünlük 0.408 %");
}
{ // solenoid: halka yığını (bağımsız) ve sonlu solenoid formülü; uçta yarı
  const I = 2, R = 0.02, len = 0.4, N = 40;
  const stack = z => { let s = 0; for (let k = 0; k < N; k++) s += loopExact(I, R, 0, z - (-len / 2 + len * (k + 0.5) / N))[1]; return s; };
  const nI = MU0 * N / len * I;
  for (const z of [0, 0.1, 0.2, 0.3]) near(K.theory.solenoidAxis(I, N, R, len, z), simpson(zz => MU0 * N / len * I * R * R / (2 * Math.pow(R * R + (z - zz) ** 2, 1.5)), -len / 2, len / 2, 4000), 1e-9, "solenoid integral " + z);
  near(K.theory.solenoidLong(I, N, len), nI, 1e-14);
  const st = K.setup({ kind: "solenoid", I, n: 512, R, len, turns: N });
  near(K.probe(st, 0), K.theory.solenoidAxis(I, N, R, len, 0), 2e-3, "sarmal merkez"); near(K.probe(st, 0), stack(0), 3e-3, "sarmal / halka yığını");
  near(K.probe(st, len / 2) / K.probe(st, 0), 0.5019, 2e-3, "uç / merkez");
  const longEnd = K.theory.solenoidAxis(1, 1000, 0.01, 10, 5) / K.theory.solenoidAxis(1, 1000, 0.01, 10, 0); near(longEnd, 0.5, 1e-4, "çok uzun bobin: uç yarı");
  near(K.probe(K.setup({ kind: "solenoid", I, n: 32, R, len, turns: N }), 0), 250.93e-6, 1e-3, "varsayılan 250.9 µT");
}
{ // eş değer eğrisi (marching squares): r² = 2 çemberi
  const n = 41, f = new Float64Array(n * n); for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) f[j * n + i] = ((i - 20) / 10) ** 2 + ((j - 20) / 10) ** 2;
  const seg = K.contour(f, n, n, 2); ok(seg.length > 40, "eğri parçaları");
  for (let k = 0; k < seg.length; k += 2) nearAbs(Math.hypot((seg[k] - 20) / 10, (seg[k + 1] - 20) / 10), Math.SQRT2, 0.01, "eğri noktası");
}

/* ── 2. Ampère ── */
{
  // bağımsız başvuru: bir doğru parçası boyunca tel alanının tam integrali = μ0 I/(2π) × gördüğü açı
  const exactCirc = (wires, p) => { let s = 0; const M = p.length / 2; for (const w of wires) for (let k = 0; k < M; k++) { const a0 = Math.atan2(p[2 * k + 1] - w.y, p[2 * k] - w.x), a1 = Math.atan2(p[(2 * k + 3) % p.length] - w.y, p[(2 * k + 2) % p.length] - w.x); let d = a1 - a0; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; s += MU0 * w.I / (2 * Math.PI) * d; } return s; };
  const wires = [{ x: 0.2, y: 0.1, I: 5 }, { x: -0.25, y: -0.15, I: -3 }, { x: 1.1, y: 0.5, I: 8 }];
  for (const shape of ["circle", "square", "ellipse", "star"]) for (const [cx, cy, size] of [[0, 0, 0.6], [0.3, -0.2, 0.9], [0.8, 0.4, 0.5], [-1, 0.9, 0.3]]) {
    const p = K.path(shape, cx, cy, size, 1024), enc = wires.reduce((s, w) => s + K.winding(p, w.x, w.y) * w.I, 0);
    nearAbs(exactCirc(wires, p) / MU0, enc, 1e-9, "açı toplamı = I sarılan " + shape);
    nearAbs(K.circulation(wires, p) / MU0, enc, 2e-3 * 16, "∮B·dl/μ0 " + shape);
    // sarılma, B'den bağımsız: kendi ışın-kesişim sayımız (kapalı çokgen)
    for (const w of wires) { let c = 0; const M = p.length / 2; for (let k = 0; k < M; k++) { const x0 = p[2 * k], y0 = p[2 * k + 1], x1 = p[(2 * k + 2) % p.length], y1 = p[(2 * k + 3) % p.length]; if ((y0 > w.y) !== (y1 > w.y) && w.x < x0 + (w.y - y0) * (x1 - x0) / (y1 - y0)) c++; } ok((c % 2) === Math.abs(K.winding(p, w.x, w.y)), "ışın sayımı"); }
  }
  const p0 = K.path("circle", 0, 0, 0.6, 256);
  nearAbs(K.circulation(wires, p0) / MU0, 2.0001, 6e-5, "varsayılan μ0 × 2.0001 A");
  // yakınsama: tel merkez dışında, çember yolu; hata ~ M⁻²
  const e = [32, 64, 128].map(M => Math.abs(K.circulation([{ x: 0.3, y: 0.1, I: 1 }], K.path("circle", 0, 0, 0.6, M)) / MU0 - 1));
  ok(e[0] / e[1] > 3.5 && e[1] / e[2] > 3.5, "Ampère M⁻² yakınsaması");
  nearAbs(K.circulation([{ x: 2, y: 0, I: 10 }], K.path("star", 0, 0, 0.8, 1024)), 0, 1e-6 * MU0 * 10, "dışarıdaki tel sıfır");
  near(K.pathLength(K.path("square", 0, 0, 0.5, 400)), 4, 1e-12, "kare çevresi"); near(K.pathLength(K.path("circle", 0, 0, 0.6, 4096)), 2 * Math.PI * 0.6, 1e-6);
  nearAbs(K.pathDistance(p0, 0.6, 0), 0, 1e-12); near(K.pathDistance(p0, 0, 0), 0.6 * Math.cos(Math.PI / 256), 1e-12);
}

/* ── 3. Paralel teller ── */
{
  const fin = (I1, I2, d, Lw, ell) => { // tel 1'in sonlu tel alanı z boyunca ortalaması (kendi Simpson'umuz)
    const B = z => MU0 * I1 / (4 * Math.PI * d) * ((Lw / 2 - z) / Math.hypot(Lw / 2 - z, d) + (Lw / 2 + z) / Math.hypot(Lw / 2 + z, d));
    return I2 * simpson(B, -ell / 2, ell / 2, 200) / ell;
  };
  for (const [I1, I2, d, Lw] of [[10, 10, 0.1, 100], [10, -10, 0.1, 100], [-4, 12, 0.37, 10], [1, 1, 1, 10000], [5, 3, 0.5, 1]]) {
    const ell = Lw >= 10 ? 1 : Lw / 10, f = K.wireForce(I1, I2, d, Lw, ell), ref = fin(I1, I2, d, Lw, ell);
    near(-f.fx, ref, 1e-5, `F/ℓ (${I1}, ${I2}, ${d}, ${Lw})`);
    near(K.wireForceBack(I1, I2, d, Lw, ell), -f.fx, 1e-6, "Newton 3");
    ok(I1 * I2 > 0 ? f.fx < 0 : f.fx > 0, "çekme / itme yönü");
    nearAbs(f.fy, 0, 1e-15 * Math.abs(f.fx) + 1e-30, "Fy = 0");
  }
  const f0 = K.wireForce(10, 10, 0.1, 100, 1); near(-f0.fx, 2e-4, 1e-5, "varsayılan 200 µN/m"); near(f0.B1, 20e-6, 1e-5, "B1 20 µT");
  near(K.theory.forcePerLength(1, 1, 1), 2e-7 * (1 - 1.3203e-10), 1e-12, "eski tanım: 2×10⁻⁷ N/m'den −1.32×10⁻¹⁰");
  near(Math.abs(f0.fx) / 9.80665 * 1e6, 20.394, 1e-4, "20.39 mg");
}

/* ── 4. İndüksiyon ── */
{ // dipol akısı: diskte doğrudan integral (|z| > 0) ve kapalı biçim
  const m = 1.7, a = 0.03;
  const direct = z => simpson(r => K.dipoleBz(m, r, z) * 2 * Math.PI * r, 0, a, 4000);
  for (const z of [0.01, 0.02, 0.05, -0.04, 0.3]) { near(K.dipoleFlux(m, a, z), direct(z), 1e-7, "akı: disk integrali " + z); near(K.dipoleFlux(m, a, z), MU0 * m * a * a / (2 * (a * a + z * z) ** 1.5), 1e-10, "akı kapalı biçim"); }
  near(K.dipoleFlux(m, a, 0), MU0 * m / (2 * a), 1e-10, "z = 0'da akı (iç integral tekil)");
  // bağımsız dipol alanı: B = μ0/(4π)(3(m·r̂)r̂ − m)/r³
  for (const [r, z] of [[0.01, 0.02], [0.05, -0.01], [0.04, 0]]) { const R = Math.hypot(r, z); near(K.dipoleBz(m, r, z), 1e-7 * (MU0 / (4 * Math.PI * 1e-7)) * m * (3 * z * z / (R * R) - 1) / R ** 3, 1e-12); }
}
{ // mıknatıs geçişi: tepeler ±a/2'de, |ε|max = (3/4)(4/5)^(5/2) N μ0 m v / a², net integral 0, enerji
  for (const o of [{ m: 1, v: 0.5, N: 100, a: 0.03, R: 5 }, { m: 3.3, v: 2.1, N: 40, a: 0.075, R: 0.5 }]) {
    o.zStart = -10 * o.a; o.zEnd = 10 * o.a; o.steps = 1200;
    const r = K.magnetRun(o), pk = 0.75 * Math.pow(0.8, 2.5) * o.N * MU0 * o.m * o.v / (o.a * o.a);
    near(pk / (o.N * MU0 * o.m * o.v / (o.a * o.a)), 0.42933, 1e-4, "0.4293 katsayısı");
    const p1 = K.peak(r.t, r.e, -1), p2 = K.peak(r.t, r.e, 1);
    near(-p1.v, pk, 1e-3, "1. tepe"); near(p2.v, pk, 1e-3, "2. tepe");
    nearAbs(o.zStart + o.v * p1.t, -o.a / 2, o.a * 2e-3, "1. tepe konumu"); nearAbs(o.zStart + o.v * p2.t, o.a / 2, o.a * 2e-3, "2. tepe konumu");
    ok(Math.abs(r.net) < 1e-9 * r.abs, "∫ε dt ≈ 0"); near(r.abs, 2 * o.N * (MU0 * o.m / (2 * o.a) - MU0 * o.m * o.a * o.a / (2 * Math.pow(o.a * o.a + 100 * o.a * o.a, 1.5))), 5e-4, "∫|ε| dt = 2N(Φmax − Φuç)");
    let maxErr = 0; for (let k = 0; k < r.t.length; k++) maxErr = Math.max(maxErr, Math.abs(r.e[k] - r.eT[k])); ok(maxErr < 1e-3 * pk, "ε(t) kapalı biçime yakın");
    // ısı: kendi trapez integralimiz kapalı biçim ε ile
    let q = 0; for (let k = 0; k < r.t.length - 1; k++) q += 0.5 * (r.eT[k] ** 2 + r.eT[k + 1] ** 2) / o.R * (r.t[k + 1] - r.t[k]); near(r.heat, q, 2e-3, "ısı");
    // Lenz: yaklaşırken ε < 0, uzaklaşırken ε > 0
    ok(r.e[300] < 0 && r.e[900] > 0, "Lenz işaretleri");
  }
  const r0 = K.magnetRun({ m: 1, v: 0.5, N: 100, a: 0.03, R: 5, zStart: -0.3, zEnd: 0.3, steps: 1200 });
  near(-K.peak(r0.t, r0.e, -1).v, 29.96e-3, 2e-4, "varsayılan tepe 29.96 mV"); near(r0.heat, 16.14e-6, 1e-3, "varsayılan ısı 16.14 µJ");
}
{ // dönen bobin
  for (const o of [{ N: 50, B: 0.2, w: 0.1, h: 0.1, f: 1, R: 10 }, { N: 7, B: 0.93, w: 0.23, h: 0.23, f: 4.3, R: 2 }]) {
    const r = K.rotorRun(o), E = o.N * o.B * o.w * o.h * 2 * Math.PI * o.f, p = K.peak(r.t, r.e, 1);
    near(p.v, E, 1e-4, "tepe NBAω"); near(r.rms, E / Math.SQRT2, 1e-4, "rms"); near(r.power, E * E / (2 * o.R), 2e-4, "ortalama güç");
    nearAbs((p.t * o.f) % 1, 0.25, 1e-6, "tepe θ = 90°");
    for (let k = 0; k < r.t.length; k += 37) nearAbs(r.e[k], E * Math.sin(2 * Math.PI * o.f * r.t[k]), 2e-4 * E, "ε(t)");
  }
}
{ // raylarda çubuk: üstel çözüm ve enerji dengesi
  for (const o of [{ mode: "fall", B: 0.5, L: 0.5, R: 1, m: 0.1, v0: 0 }, { mode: "free", B: 0.5, L: 0.5, R: 1, m: 0.1, v0: 2 }, { mode: "fall", B: 1.35, L: 0.85, R: 0.3, m: 0.77, v0: 0 }, { mode: "free", B: 2, L: 1, R: 10, m: 0.01, v0: 5 }, { mode: "push", B: 0.5, L: 0.5, R: 1, m: 0.1, v0: 2, T: 4 }]) {
    const r = K.rodRun(o), k = o.B * o.B * o.L * o.L / (o.m * o.R), tau = 1 / k, g = 9.80665;
    const vInf = o.mode === "fall" ? o.m * g * o.R / (o.B * o.L) ** 2 : o.mode === "free" ? 0 : o.v0;
    const v0 = o.mode === "fall" ? 0 : o.v0;
    const vt = t => o.mode === "push" ? o.v0 : vInf + (v0 - vInf) * Math.exp(-t / tau);
    const xt = t => o.mode === "push" ? o.v0 * t : vInf * t + (v0 - vInf) * tau * (1 - Math.exp(-t / tau));
    for (let i = 0; i < r.t.length; i += 97) { near(r.v[i] + 1e-12, vt(r.t[i]) + 1e-12, 1e-8, "v(t)"); nearAbs(r.x[i], xt(r.t[i]), 1e-9 * (1 + xt(r.t[i])), "x(t)"); }
    for (let i = 0; i < r.t.length; i += 97) nearAbs(-r.e[i], o.B * o.L * r.v[i], 2e-5 * o.B * o.L * Math.max(vInf, v0), "ε = BLv");
    const n = r.t.length - 1;
    const Eloss = o.mode === "fall" ? o.m * g * r.x[n] - 0.5 * o.m * r.v[n] ** 2 : o.mode === "free" ? 0.5 * o.m * (v0 * v0 - r.v[n] ** 2) : (o.B * o.L * o.v0) ** 2 / o.R * r.t[n];
    near(r.q[n], Eloss, 1e-8, "enerji dengesi " + o.mode);
    if (o.mode !== "push") near(r.tauM, tau, 1e-6, "τ ölçülen");
    if (o.mode === "fall") { near(r.vt, vInf, 1e-14); near(r.v[n], vInf * (1 - Math.exp(-10)), 1e-8, "10τ sonunda"); }
    if (o.mode === "free") near(r.x[n], v0 * tau * (1 - Math.exp(-10)), 1e-8, "yol v0τ");
  }
}
{ // ikinci mertebe uç türevi
  const t = Float64Array.from({ length: 11 }, (_, i) => i * 0.1), phi = Float64Array.from(t, x => 3 * x * x - x), e = K.emfFromFlux(t, phi, 2);
  for (let i = 0; i < 11; i++) near(e[i], -2 * (6 * t[i] - 1) + 1e-12, 1e-9, "türev " + i);
}
for (const bad of [() => K.straightWire(0, 10, 1), () => K.loop(-1, 0, 10, 1), () => K.helix(0.1, 0, 10, 10, 1), () => K.path("circle", 0, 0, 0, 10), () => K.path("x", 0, 0, 1, 10), () => K.setup({ kind: "x", I: 1, n: 8 }), () => K.wireForce(1, 1, 0, 10, 1)]) { assert.throws(bad); checks++; }
console.log(`G manyetik-alan: ${checks.toLocaleString("tr-TR")} bağımsız kapalı biçim, eliptik integral, açı toplamı, enerji ve yakınsama denetimi PASS`);

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
      const errors = []; page.on("pageerror", e => errors.push(e.message)); page.on("console", m => { if (m.type() === "error" && !/404/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/manyetik-alan.html`);
      await page.waitForTimeout(200);
      const click = id => page.locator("#" + id).click(), read = async id => (await page.locator("#" + id).innerText()).trim();
      const eq = (a, b, label) => { assert.equal(a, b, `[${width}] ${label || ""}`); checks++; };
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `[${width}] #${id}: "${t}" içinde "${text}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, v);
      const pick = (id, v) => page.locator("#" + id).selectOption(v);
      const settle = () => page.waitForTimeout(60);
      const clean = async sel => { const t = await page.locator(sel).innerText(); assert(!/NaN|Infinity|undefined|null/.test(t), `[${width}] ${sel} bozuk sayı: ${t.match(/.{0,30}(NaN|Infinity|undefined|null).{0,30}/)?.[0]}`); checks++; };
      const noOverflow = async () => eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "yatay taşma");
      const drawn = async id => eq(await page.evaluate(id => { const c = document.getElementById(id), d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++; return n > 500; }, id), true, id + " boş");

      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content input, .app-content select")].filter(e => !document.querySelector(`label[for="${e.id}"]`)).length), 0, "etiketsiz denetim");
      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].filter(c => c.getAttribute("role") !== "img" || !c.getAttribute("aria-label")).length), 0, "rolsüz tuval");
      eq(await page.evaluate(() => Object.isFrozen(MagLab) && !Object.getOwnPropertyDescriptor(window, "MagLab").writable), true, "çekirdek salt okunur");
      eq(await page.evaluate(() => [...document.querySelectorAll("input[type=range]")].every(e => { const st = Number(e.step), k = (Number(e.value) - Number(e.min)) / st; return Math.abs(k - Math.round(k)) < 1e-9; })), true, "varsayılanlar adım ızgarasında");
      eq(await page.evaluate(() => /[̀-ͯ]/.test(document.body.innerText)), false, "birleşik işaret yok");

      /* 01 · Akımın alanı */
      await has("bsMeas", "62.96 µT"); await has("bsTheory", "62.83 µT"); await has("bsDiff", "+0.20 %"); await has("bsSpecial", "1.00201"); await has("bsStatus", "= 1.00201");
      await pick("bsN", "128"); await settle(); await has("bsDiff", "+0.05 %"); await pick("bsN", "1024"); await settle(); await has("bsDiff", "0.00 %");
      await range("bsZ", 0.1); await settle(); await has("bsTheory", "22.21 µT"); await has("bsZOut", "0.100 m");
      await pick("bsKind", "wire"); await settle(); await has("bsMeas", "39.94 µT"); await has("bsTheory", "39.95 µT"); await has("bsIdeal", "40.00 µT"); await has("bsSpecial", "0.625"); await has("bsDOut", "0.050 m");
      eq(await page.locator("#bsZ").isVisible(), false, "telde z gizli"); eq(await page.locator("#bsD").isVisible(), true, "telde d görünür");
      await range("bsD", 0.005); await settle(); await has("bsStatus", "Parçalar ölçüm uzaklığından"); eq(await page.locator("#bsStatus").getAttribute("class"), "ma-status is-warn", "uyarı");
      await range("bsL", 0.2); await range("bsD", 0.5); await settle(); await has("bsStatus", "Tel kısa"); await clean("#panel-bs");
      await pick("bsKind", "helmholtz"); await settle(); await has("bsMeas", "90.03 µT"); await has("bsIdeal", "89.92 µT"); await has("bsSpecial", "0.408 %"); await has("bsSpecialInfo", "0.420 %"); await has("bsStatus", "ikinci türevi sıfırlanır");
      await range("bsS", 1.5); await settle(); await has("bsStatus", "çukur"); await range("bsS", 0.3); await settle(); await has("bsStatus", "tepe yapar"); await clean("#panel-bs");
      await pick("bsKind", "solenoid"); await settle(); await has("bsMeas", "250.9 µT"); await has("bsTheory", "250.1 µT"); await has("bsIdeal", "251.3 µT"); await has("bsSpecial", "0.5018"); await has("bsStatus", "128 olsaydı +0.02 %");
      await range("bsLen", 0.05); await range("bsR", 0.3); await settle(); await has("bsStatus", "Bobin kısa"); await range("bsLen", 1); await range("bsR", 0.01); await range("bsTurns", 5); await settle(); await has("bsStatus", "seyrek"); await range("bsTurns", 80); await range("bsZ", 0.5); await settle(); await clean("#panel-bs");
      await click("bsReset"); await settle(); eq(await page.locator("#bsKind").inputValue(), "loop", "sıfırla düzenek"); await has("bsMeas", "62.96 µT"); await has("bsIOut", "10.0 A");
      await page.locator("h1").click(); await pick("bsN", "16"); await page.locator("h1").click(); await page.keyboard.press("r"); await settle(); eq(await page.locator("#bsN").inputValue(), "64", "R sıfırlar");
      await drawn("bsMap"); await drawn("bsChart"); await noOverflow();

      /* 02 · Ampère */
      await click("tab-amp"); await settle();
      await has("apCirc", "2.513 µT·m"); await has("apCircInfo", "2.0001 A"); await has("apTheory", "2.513 µT·m"); await has("apDiff", "+0.01 %"); await has("apEnc", "2.0 A"); await has("apRows", "5.0003");
      for (const sh of ["square", "ellipse", "star"]) { await pick("apShape", sh); await settle(); await has("apEnc", "2.0 A"); await clean("#panel-amp"); }
      await has("apMeanB", "2.082 µT"); // yıldız: yol uzunluğuyla ağırlıklı ortalama |B| (düğüm ortalaması 2.195 µT verirdi)
      await pick("apShape", "circle"); await range("apCx", 0.3); await range("apSize", 1.2); await settle(); await has("apEnc", "10.0 A");
      await range("apSize", 0.6); await range("apCx", -1); await range("apCy", 1); await settle(); await has("apEnc", "0.0 A"); await has("apDiff", "kuram sıfır"); await has("apStatus", "Hiçbir akım sarılmıyor");
      await range("apCx", 0.2); await range("apCy", 0.7); await settle(); await has("apCirc", "tanımsız"); await has("apStatus", "tanımsız"); eq(await page.locator("#apStatus").getAttribute("class"), "ma-status is-warn", "Ampère uyarı");
      await click("apReset"); await pick("apPreset", "pair"); await settle(); await has("apEnc", "0.0 A"); await has("apStatus", "toplamı sıfır");
      await pick("apPreset", "one"); await pick("apM", "8"); await settle(); await has("apEnc", "5.0 A"); await has("apStatus", "kaybolur"); await clean("#panel-amp");
      // sürükleme: tel 1'i yolun dışına taşı
      await click("apReset"); await settle();
      await page.locator("#apMap").scrollIntoViewIfNeeded(); const box = await page.locator("#apMap").boundingBox(), sc = Math.min(box.width / 3.2, box.height / 2);
      await page.mouse.move(box.x + box.width / 2 + 0.2 * sc, box.y + box.height / 2 - 0.1 * sc); await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2 + 1.4 * sc, box.y + box.height / 2 + 0.8 * sc, { steps: 5 }); await page.mouse.up(); await settle();
      await has("apEnc", "−3.0 A");
      await page.locator("h1").click(); await page.keyboard.press("R"); await settle(); await has("apEnc", "2.0 A");
      await drawn("apMap"); await drawn("apChart"); await noOverflow();

      /* 03 · Paralel teller */
      await click("tab-par"); await settle();
      await has("prB", "20.00 µT"); await has("prF", "200.0 µN/m"); await has("prFInfo", "çekme"); await has("prTh", "200.0 µN/m"); await has("prDiff", "0.00 %"); await has("prFinDiff", "0.99999800"); await has("prBack", "200.0 µN/m"); await has("prMass", "20.39 mg");
      await has("prMu", "−1.32×10⁻¹⁰"); await has("prMuInfo", "1.99999999974×10⁻⁷");
      await range("prI2", -10); await settle(); await has("prFInfo", "itme"); await has("prStatus", "iter");
      await range("prI2", 0); await settle(); await has("prDiff", "akımlardan biri sıfır"); await has("prStatus", "Akımlardan biri sıfır"); await clean("#panel-par");
      await range("prI2", 20); await range("prI1", -20); await range("prD", 1); await pick("prLw", "1"); await settle(); await has("prStatus", "kısa"); await has("prFInfo", "ℓ = 0.10 m"); await clean("#panel-par");
      await click("prAmp"); await settle(); await has("prF", "200.0 nN/m"); await has("prDOut", "1.00 m"); eq(await page.locator("#prLw").inputValue(), "10000", "eski tanım: uzun tel");
      await click("prReset"); await settle(); await has("prF", "200.0 µN/m");
      await drawn("prMap"); await drawn("prChart"); await noOverflow();

      /* 04 · İndüksiyon */
      await click("tab-ind"); await settle();
      await has("inGo", "Başlat"); await has("inStats", "deney ilerleyince");
      await click("inSkip"); await settle();
      await has("inStats", "−29.96 mV"); await has("inStats", "29.96 mV"); await has("inStats", "z = −1.50 cm"); await has("inStats", "16.14 µJ"); await has("inGo", "Yeniden başlat"); await clean("#panel-ind");
      for (const [id, v] of [["mgM", 5], ["mgV", 3], ["mgN", 500], ["mgA", 0.01], ["mgR", 0.5]]) await range(id, v);
      await has("inGo", "Başlat"); await click("inSkip"); await settle(); await clean("#panel-ind");
      await pick("inMode", "rotor"); await settle(); eq(await page.locator("#mgM").isVisible(), false, "mıknatıs denetimleri gizli");
      await click("inSkip"); await settle(); await has("inStats", "628.3 mV"); await has("inStats", "444.3 mV"); await has("inStats", "19.74 mW"); await clean("#panel-ind");
      await range("rtF", 5); await range("rtN", 1); await range("rtB", 0.01); await range("rtS", 0.02); await click("inSkip"); await settle(); await clean("#panel-ind");
      await pick("inMode", "rod"); await settle(); await click("inSkip"); await settle(); await has("inStats", "500.0 mV"); await has("inStats", "250.0 mW"); await has("inStats", "1.000 J");
      await pick("rdMode", "fall"); await settle(); eq(await page.locator("#rdV").isVisible(), false, "düşüşte hız gizli");
      await click("inSkip"); await settle(); await has("inStats", "15.6899 m/s"); await has("inStats", "15.6906 m/s"); await has("inStats", "1.6000 s"); await clean("#panel-ind");
      await pick("rdMode", "free"); await click("inSkip"); await settle(); await has("inStats", "3.1999 m"); await has("inStats", "3.2000 m"); await has("inStats", "200.0 mJ");
      await range("rdB", 2); await range("rdL", 1); await range("rdR", 0.1); await range("rdM", 1); await range("rdV", 5); await click("inSkip"); await settle(); await clean("#panel-ind");
      await range("rdB", 0.1); await range("rdL", 0.1); await range("rdR", 10); await range("rdM", 0.01); await range("rdV", 0.1); await click("inSkip"); await settle(); await clean("#panel-ind");
      await click("inReset"); await settle(); eq(await page.locator("#inMode").inputValue(), "magnet", "sıfırla düzenek"); await has("inGo", "Başlat");
      // gerçek zamanlı oynatma + klavye
      await pick("inSpeed", "1"); await page.locator("h1").click(); await page.keyboard.press("Space"); await has("inGo", "Duraklat");
      await page.waitForFunction(() => document.getElementById("inGo").textContent === "Yeniden başlat", null, { timeout: 5000 }); await has("inStats", "16.14 µJ");
      await page.keyboard.press("r"); await settle(); await has("inGo", "Başlat"); eq(await page.locator("#inSpeed").inputValue(), "0.25", "R sıfırlar");
      await page.locator("#mgM").focus(); await page.keyboard.press("Space"); await has("inGo", "Başlat");
      await drawn("inStage"); await drawn("inChart"); await noOverflow();

      // sekme klavyesi
      await page.locator("#tab-ind").focus(); await page.keyboard.press("Home"); eq(await page.locator("#tab-bs").getAttribute("aria-selected"), "true", "Home");
      await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-amp").getAttribute("aria-selected"), "true", "sağ ok"); eq(await page.locator("#panel-amp").isVisible(), true, "panel görünür");
      await page.keyboard.press("End"); eq(await page.locator("#tab-ind").getAttribute("aria-selected"), "true", "End"); await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-bs").getAttribute("aria-selected"), "true", "sarma");
      await page.keyboard.press("ArrowLeft"); eq(await page.locator("#tab-ind").getAttribute("aria-selected"), "true", "sol ok"); eq(await page.locator("#tab-bs").getAttribute("tabindex"), "-1", "tabindex");
      await noOverflow();
      assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      console.log(`G manyetik-alan: ${width} px ${theme} · ${checks - before} arayüz denetimi PASS`);
      await ctx.close();
    }
  } finally { await browser?.close(); await new Promise(r => server.close(r)); }
}
