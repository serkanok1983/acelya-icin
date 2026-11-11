// G · atom-orbitalleri.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini YENİDEN KULLANMAZ:
// elle yazılmış kapalı biçimli hidrojen radyal fonksiyonları (ders kitabı tablosu), Kartezyen gerçel küresel
// harmonikler ve normalizasyon sabitleri, bağımsız orta nokta/Gauss olmayan integraller, polinom kökleri,
// 1s için kapalı birikimli olasılık, NIST ASD ölçümleri ve Edlén (1966) hava kırılma indisi.
// Kullanım: node scripts/check-g-atom-orbitalleri.mjs [--browser]
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const SLUG = "atom-orbitalleri";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.OrbitalLab;
assert(K && Object.isFrozen(K), "OrbitalLab dondurulmuş olmalı");
let checks = 0;
const near = (a, b, tol = 1e-9, msg = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${msg} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const nearAbs = (a, b, tol, msg = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${msg} ${a} ≠ ${b} (mutlak ${tol})`); checks++; };
const ok = (c, msg) => { assert(c, msg); checks++; };
const eq = (a, b, msg = "") => { assert.equal(a, b, msg + ` (${a} ≠ ${b})`); checks++; };

/* ── Sabitler: açılan CODATA 2022 ve NIST ASD sayfalarındaki değerler ── */
eq(K.CONST.RINF, 10973731.568157, "R∞"); eq(K.CONST.RY_EV, 13.605693122990, "R∞hc"); eq(K.CONST.A0_PM, 52.9177210544, "a₀");
eq(K.CONST.MP_ME, 1836.152673426, "mp/me"); eq(K.CONST.MD_ME, 3670.482967655, "md/me"); eq(K.CONST.ALPHA, 7.2973525643e-3, "α");
eq(K.CONST.IE_H_NIST, 13.598434599702, "H iyonlaşma"); near(K.CONST.HC_EV_NM, 1239.8419843320026, 1e-13, "hc");
// R∞hc / hc tutarlılığı (iki ayrı CODATA değeri): R∞·hc = 13,6057 eV
near(K.CONST.RINF * K.CONST.HC_EV_NM * 1e-9, K.CONST.RY_EV, 1e-11, "R∞·hc");
const NIST = [[3, 656.279, 656.285177], [4, 486.135, 486.1361516], [5, 434.0472, 434.0494419], [6, 410.1734, 410.1763100], [7, 397.0075, 397.0099002]];
NIST.forEach(([n, o, c], i) => { eq(K.BALMER_NIST[i].n, n); eq(K.BALMER_NIST[i].obs, o); eq(K.BALMER_NIST[i].comp, c); });

/* ── 1. Radyal: ders kitabı kapalı biçimleri (Z = 1, r birimi a₀) ── */
const E = Math.exp, S = Math.sqrt;
const RH = {
  "1,0": (r) => 2 * E(-r),
  "2,0": (r) => (1 / (2 * S(2))) * (2 - r) * E(-r / 2),
  "2,1": (r) => (1 / (2 * S(6))) * r * E(-r / 2),
  "3,0": (r) => (2 / (81 * S(3))) * (27 - 18 * r + 2 * r * r) * E(-r / 3),
  "3,1": (r) => (4 / (81 * S(6))) * (6 - r) * r * E(-r / 3),
  "3,2": (r) => (4 / (81 * S(30))) * r * r * E(-r / 3),
  "4,0": (r) => (1 / 4) * (1 - (3 / 4) * r + r * r / 8 - r ** 3 / 192) * E(-r / 4),
  "4,1": (r) => (S(5) / (16 * S(3))) * r * (1 - r / 4 + r * r / 80) * E(-r / 4),
  "4,2": (r) => (1 / (64 * S(5))) * r * r * (1 - r / 12) * E(-r / 4),
  "4,3": (r) => (1 / (768 * S(35))) * r ** 3 * E(-r / 4),
};
// Tablo: Griffiths, Introduction to Quantum Mechanics, Tablo 4.7 biçimi (a₀ = 1).
const midInt = (f, a, b, n) => { const h = (b - a) / n; let s = 0; for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * h); return s * h; };
for (const key of Object.keys(RH)) {
  const [n, l] = key.split(",").map(Number), f = RH[key];
  const norm = midInt((r) => r * r * f(r) ** 2, 0, 200, 200000);
  near(norm, 1, 1e-8, `ders kitabı R${n}${l} normalizasyonu`);
  for (const Z of [1, 2, 3, 6]) for (const r of [0, 0.05, 0.3, 1, 2.5, 4, 7.3, 12, 20, 33]) {
    // Z ölçeklemesi: R(Z, r) = Z^{3/2} R(1, Zr). İşaret uzlaşımı: L için pozitif öncü katsayı (r → 0'da R > 0)
    const ref = Z ** 1.5 * f(Z * r), got = K.radialR(n, l, Z, r);
    nearAbs(got, ref, 1e-12 * Math.max(1, Math.abs(ref)), `R${n}${l}(Z=${Z}, r=${r})`);
  }
  for (const Z of [1, 2, 5]) {
    const a = K.radial(n, l, Z), mid = (g) => midInt((r) => g(r) * r * r * (Z ** 1.5 * f(Z * r)) ** 2, 0, 200 / Z, 200000);
    near(a.norm, 1, 2e-7, `ölçülen ∫P ${n}${l} Z${Z}`);
    near(a.mean, mid((r) => r), 2e-7, `⟨r⟩ ${n}${l}`); near(a.mean, (3 * n * n - l * (l + 1)) / (2 * Z), 2e-7, `⟨r⟩ formül ${n}${l}`);
    near(a.mean2, mid((r) => r * r), 2e-7, `⟨r²⟩ ${n}${l}`); near(a.meanInv, Z / (n * n), 2e-6, `⟨1/r⟩ ${n}${l}`);
    near(a.theory.mean, (3 * n * n - l * (l + 1)) / (2 * Z), 1e-14); eq(a.theory.nodes, n - l - 1);
    eq(a.nodeCount, n - l - 1, `radyal düğüm ${n}${l}`); eq(a.peakCount, n - l, `tepe sayısı ${n}${l}`);
    // en olası yarıçap: bağımsız kaba ızgara + altın oran yerine 1e-5 adımlı tarama
    let best = 0, rb = 0; for (let r = 1e-5; r < 120 / Z; r += 1e-3 / Z) { const v = r * r * (Z ** 1.5 * f(Z * r)) ** 2; if (v > best) { best = v; rb = r; } }
    nearAbs(a.rmp, rb, 2e-3 / Z, `r_mp ${n}${l}`);
    if (l === n - 1) { near(a.rmp, n * n / Z, 1e-7, `r_mp = n²/Z ${n}${l}`); near(a.theory.rmp, n * n / Z, 1e-14); } else eq(a.theory.rmp, null, "kapalı biçim yok");
  }
}
// düğüm konumları: elle yazılmış polinomların kökleri (ikiye bölme)
const root = (g, a, b) => { for (let i = 0; i < 200; i++) { const c = (a + b) / 2; if ((g(a) < 0) === (g(c) < 0)) a = c; else b = c; } return (a + b) / 2; };
const NODES = { "2,0": [2], "3,0": [(9 - 3 * S(3)) / 2, (9 + 3 * S(3)) / 2], "3,1": [6], "4,1": [10 - 2 * S(5), 10 + 2 * S(5)], "4,2": [12],
  "4,0": [root((r) => 192 - 144 * r + 24 * r * r - r ** 3, 0.5, 3), root((r) => 192 - 144 * r + 24 * r * r - r ** 3, 3, 10), root((r) => 192 - 144 * r + 24 * r * r - r ** 3, 10, 20)] };
for (const [key, list] of Object.entries(NODES)) { const [n, l] = key.split(",").map(Number); for (const Z of [1, 3]) { const a = K.radial(n, l, Z), c = K.nodesClosed(n, l, Z); eq(a.nodes.length, list.length); list.forEach((r, i) => { near(a.nodes[i], r / Z, 1e-9, `düğüm ${key}`); near(c[i], r / Z, 1e-12, `kapalı kök ${key}`); }); } }
nearAbs(NODES["4,0"][0], 1.871644, 1e-6); nearAbs(NODES["4,0"][2], 15.517541, 1e-6);
// 2s ve 3p için dP/dr = 0'ın kapalı kökleri: 3 + √5 ve 12
near(K.radial(2, 0, 1).rmp, 3 + S(5), 1e-7, "2s r_mp"); near(K.radial(3, 1, 1).rmp, 12, 1e-7, "3p r_mp");
// 1s kapalı birikimli olasılık ve %90 yarıçapı
const cdf1s = (x) => 1 - E(-2 * x) * (1 + 2 * x + 2 * x * x);
for (const Z of [1, 2]) for (const R of [0.25, 1, 2, 2.6611601, 5]) near(K.fractionInside(1, 0, Z, R / Z), cdf1s(R), 2e-9, "1s ∫P");
const r90 = root((x) => cdf1s(x) - 0.9, 0.5, 6); near(K.radialQuantile(1, 0, 1, 0.9), r90, 1e-7, "1s r₉₀"); nearAbs(r90, 2.66116, 1e-5);
// rmax ötesindeki kuyruk 10⁻¹¹'den küçük (sayfa notu)
for (let n = 1; n <= 4; n++) for (let l = 0; l < n; l++) { const a = K.rmaxFor(n, 1); ok(midInt((r) => K.radialP(n, l, 1, r), a, 6 * a, 20000) < 1e-11, `kuyruk ${n}${l}`); }

/* ── 2. Açısal: Kartezyen biçimler ve bilinen normalizasyon sabitleri ── */
const PI = Math.PI;
const CART = {
  "0,0": () => 1 / (2 * S(PI)),
  "1,1": (x) => S(3 / (4 * PI)) * x, "1,-1": (x, y) => S(3 / (4 * PI)) * y, "1,0": (x, y, z) => S(3 / (4 * PI)) * z,
  "2,0": (x, y, z) => S(5 / (16 * PI)) * (3 * z * z - 1), "2,1": (x, y, z) => S(15 / (4 * PI)) * x * z, "2,-1": (x, y, z) => S(15 / (4 * PI)) * y * z,
  "2,2": (x, y) => S(15 / (16 * PI)) * (x * x - y * y), "2,-2": (x, y) => S(15 / (4 * PI)) * x * y,
  "3,0": (x, y, z) => S(7 / (16 * PI)) * z * (5 * z * z - 3), "3,1": (x, y, z) => S(21 / (32 * PI)) * x * (5 * z * z - 1), "3,-1": (x, y, z) => S(21 / (32 * PI)) * y * (5 * z * z - 1),
  "3,2": (x, y, z) => S(105 / (16 * PI)) * z * (x * x - y * y), "3,-2": (x, y, z) => S(105 / (4 * PI)) * x * y * z,
  "3,3": (x, y) => S(35 / (32 * PI)) * x * (x * x - 3 * y * y), "3,-3": (x, y) => S(35 / (32 * PI)) * y * (3 * x * x - y * y),
};
const NAME = { "0,0": "s", "1,1": "p_x", "1,-1": "p_y", "1,0": "p_z", "2,0": "d_z²", "2,1": "d_xz", "2,-1": "d_yz", "2,2": "d_x²−y²", "2,-2": "d_xy", "3,0": "f_z³", "3,1": "f_xz²", "3,-1": "f_yz²", "3,2": "f_z(x²−y²)", "3,-2": "f_xyz", "3,3": "f_x(x²−3y²)", "3,-3": "f_y(3x²−y²)" };
const CONES = { "2,0": [Math.acos(1 / S(3)), PI - Math.acos(1 / S(3))], "3,1": [Math.acos(1 / S(5)), PI - Math.acos(1 / S(5))], "3,-1": [Math.acos(1 / S(5)), PI - Math.acos(1 / S(5))], "3,0": [Math.acos(S(0.6)), PI - Math.acos(S(0.6))] };
for (const [key, f] of Object.entries(CART)) {
  const [l, m] = key.split(",").map(Number);
  for (let k = 0; k < 60; k++) { const th = Math.acos(2 * ((k * 0.61803398875 + 0.1) % 1) - 1), ph = 2 * PI * ((k * 0.7548776662 + 0.3) % 1), x = Math.sin(th) * Math.cos(ph), y = Math.sin(th) * Math.sin(ph), z = Math.cos(th); nearAbs(K.realY(l, m, th, ph), f(x, y, z), 1e-13, `Y ${key}`); }
  // bağımsız normalizasyon: düzgün θ–φ orta nokta ızgarası
  let s = 0; const NT = 400, NP = 64; for (let i = 0; i < NT; i++) { const th = PI * (i + 0.5) / NT; for (let j = 0; j < NP; j++) { const ph = 2 * PI * (j + 0.5) / NP; s += f(Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)) ** 2 * Math.sin(th); } }
  near(s * (PI / NT) * (2 * PI / NP), 1, 2e-5, `∫|Y|² ${key}`);
  const a = K.angular(l, m);
  eq(a.name, NAME[key]); eq(a.count, l, `açısal düğüm ${key}`); eq(a.planes, Math.abs(m), `düşey düzlem ${key}`); eq(a.thetaNodes.length, l - Math.abs(m), `θ düğümü ${key}`);
  near(a.norm, 1, 1e-12, `Gauss normu ${key}`); ok(a.parityResidual < 1e-12, `parite ${key}`); eq(a.parity, l % 2 ? "tek" : "çift");
  if ((l - Math.abs(m)) % 2) ok(a.thetaNodes.some((t) => Math.abs(t - PI / 2) < 1e-9), `xy düzlemi ${key}`);
  if (CONES[key]) { const cones = a.thetaNodes.filter((t) => Math.abs(t - PI / 2) > 1e-6); CONES[key].forEach((t, i) => nearAbs(cones[i], t, 1e-10, `koni ${key}`)); }
  a.surfaces.filter((sf) => sf.kind === "vplane").forEach((sf) => { const v = m > 0 ? Math.cos(Math.abs(m) * sf.phi) : Math.sin(Math.abs(m) * sf.phi); nearAbs(v, 0, 1e-10, `düzlem φ ${key}`); });
  const rot = K.rotationSymmetry(l, m);
  if (m === 0) eq(rot.full, true, "m=0 tam simetri"); else { eq(rot.period, 360 / Math.abs(m), `dönme ${key}`); eq(rot.flip, 180 / Math.abs(m), `işaret dönmesi ${key}`); }
}
near(K.ymaxY(2, 0), S(5 / (16 * PI)) * 2, 1e-12, "max|d_z²|");
for (const call of [() => K.radial(5, 0, 1), () => K.radial(2, 2, 1), () => K.angular(4, 0), () => K.angular(2, 3), () => K.radial(1, 0, 0), () => K.sample(2, 1, 2, 1, 10, 1), () => K.transition(2, 2, 1, "H")]) { assert.throws(call); checks++; }

/* ── 3. Monte Carlo: birkaç tohumda istatistik uyum ── */
const s1a = K.sample(2, 1, 0, 1, 3000, 7), s1b = K.sample(2, 1, 0, 1, 3000, 7);
ok(s1a.pts.every((v, i) => v === s1b.pts[i]), "aynı tohum aynı bulut");
let zs = [];
for (const seed of [1, 2, 3, 4, 5]) {
  const s = K.sample(1, 0, 0, 1, 20000, seed);
  for (const R of [0.5, 1, 2, 3]) { const st = K.cloudStats(s, R), th = cdf1s(R), sg = S(th * (1 - th) / 20000); near(st.theory, th, 2e-9); zs.push((st.frac - th) / sg); ok(Math.abs(st.frac - th) < 4.5 * sg, `1s oran ${seed} R=${R}`); }
  const st = K.cloudStats(s, 1); nearAbs(st.r90, r90, 0.05, "1s r₉₀ örnek"); nearAbs(st.mean, 1.5, 5 * S(0.75 / 20000), "1s ⟨r⟩ örnek");
  const c90 = 4 * E(-2 * r90) / (4 * PI); near(st.c90Theory, c90, 1e-7, "1s c₉₀ kuram"); nearAbs(st.c90 / c90, 1, 0.12, "1s c₉₀ örnek (σ ≈ %3)");
  // p_z açısal dağılımı: ⟨cos²θ⟩ = 3/5 (bağımsız integral), ψ işareti z işaretiyle aynı
  const p = K.sample(2, 1, 0, 1, 20000, seed); let c2 = 0, sgnOk = true; for (let k = 0; k < p.N; k++) { const x = p.pts[3 * k], y = p.pts[3 * k + 1], z = p.pts[3 * k + 2]; c2 += z * z / (x * x + y * y + z * z); if (Math.sign(z) !== p.sgn[k] && z !== 0) sgnOk = false; }
  nearAbs(c2 / p.N, 0.6, 5 * S((3 / 7 - 0.36) / 20000), "⟨cos²θ⟩ p_z"); ok(sgnOk, "p_z işareti");
  const d = K.sample(3, 2, -2, 1, 20000, seed); let xy = 0; for (let k = 0; k < d.N; k++) { const x = d.pts[3 * k], y = d.pts[3 * k + 1]; if (Math.sign(x * y) !== d.sgn[k]) xy++; } eq(xy, 0, "d_xy işareti");
  const r2 = K.sample(4, 0, 0, 1, 20000, seed); nearAbs(K.cloudStats(r2, 10).mean, 24, 5 * S((648 - 576) / 20000), "4s ⟨r⟩ örnek");
}
ok(Math.abs(zs.reduce((a, b) => a + b, 0) / zs.length) < 1, "z ortalaması ~0"); ok(zs.reduce((a, b) => a + b * b, 0) / zs.length < 2.2, "z varyansı ~1");

/* ── 4. Enerji ve spektrum ── */
const muH = 1 / (1 + 1 / 1836.152673426), muD = 1 / (1 + 1 / 3670.482967655);
near(K.level(1, 1, "inf"), -13.605693122990, 1e-14); near(K.level(1, 1, "H"), -13.605693122990 * muH, 1e-14); near(K.level(3, 2, "inf"), -13.605693122990 * 4 / 9, 1e-14);
nearAbs(-K.level(1, 1, "H"), 13.598434599702, 2e-4, "iyonlaşma NIST"); ok(Math.abs(-K.level(1, 1, "inf") - 13.598434599702) > 5e-3, "sonsuz kütle uzak");
const ionF = -K.fineLevel(1, 0.5, "H") * K.CONST.HC_EV_NM * 1e-9; nearAbs(ionF, 13.598434599702, 5e-5, "ince yapılı iyonlaşma");
for (const [nu, nl, Z, mass] of [[3, 2, 1, "H"], [2, 1, 1, "H"], [4, 3, 1, "D"], [5, 2, 3, "inf"], [10, 9, 6, "inf"]]) {
  const t = K.transition(nu, nl, Z, mass), dE = K.level(nu, Z, mass) - K.level(nl, Z, mass);
  near(t.dE, dE, 1e-12); near(t.lvac, 1239.8419843320026 / dE, 1e-11, "λ = hc/ΔE"); near(t.freqTHz * 1e12 * 6.62607015e-34 / 1.602176634e-19, dE, 1e-11, "hν = ΔE");
}
nearAbs(K.transition(2, 1, 1, "H").lvac, 121.567, 0.002, "Lyman α"); nearAbs(K.transition(3, 2, 1, "H").limitVac, 364.705, 0.002, "Balmer sınırı");
eq(K.transition(2, 1, 1, "H").lair, null, "UV'de hava yok"); eq(K.transition(5, 4, 1, "H").lair, null, "4 µm'de hava yok"); eq(K.transition(4, 3, 1, "H").series, "Paschen");
// Edlén 1966 (bağımsız formül) ile Peck–Reeder hava indisi: 10⁻⁷ göreli uyum
for (const lv of [250, 400, 500, 656, 1000, 1875]) { const s2 = (1000 / lv) ** 2, ed = 1 + 1e-8 * (8342.13 + 2406030 / (130 - s2) + 15997 / (38.9 - s2)); nearAbs(K.airIndex(lv), ed, 2e-7, `hava indisi ${lv}`); }
const bH = K.balmer("H"), bI = K.balmer("inf"), bD = K.balmer("D");
bH.forEach((b, i) => { nearAbs(b.lair, NIST[i][1], 0.0100, `Balmer ${b.n} (NIST)`); nearAbs(b.fineAir, NIST[i][2], 3e-5, `ince yapı ${b.n}`); ok(Math.abs(bI[i].lair - NIST[i][1]) > 0.2, `sonsuz kütle ${b.n} uzak`); ok(bD[i].lair < b.lair, "döteryum daha kısa"); });
near(bH[0].lair - bD[0].lair, bH[0].lair * (1 - muH / muD), 1e-3, "izotop kayması");
nearAbs(bH[0].lair - bD[0].lair, 0.1785, 2e-4);
console.log(`G ${SLUG}: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

if (process.argv.includes("--browser")) {
  const { createRequire } = await import("node:module"); const { createServer } = await import("node:http"); const { join, extname } = await import("node:path"); const { fileURLToPath } = await import("node:url");
  const rootDir = fileURLToPath(new URL("../", import.meta.url));
  const { chromium } = createRequire(join(rootDir, "package.json"))("playwright");
  const server = createServer((req, res) => { const file = join(rootDir, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r)); let browser; const before = checks;
  try {
    browser = await chromium.launch();
    for (const [width, th] of [[390, "light"], [1280, "dark"]]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width === 390 ? 2 : 1, locale: "tr-TR" });
      await ctx.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, th);
      const page = await ctx.newPage(); page.setDefaultTimeout(10000); const errors = [];
      page.on("pageerror", (e) => errors.push(e.message)); page.on("console", (m) => { if (m.type() === "error" && !/404|Failed to load resource/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`); await page.waitForTimeout(400);
      const click = (id) => page.locator("#" + id).click(), read = async (id) => (await page.locator("#" + id).textContent()).trim(), val = (id) => page.locator("#" + id).inputValue();
      const set = (id, v) => page.locator("#" + id).evaluate((e, v) => { if (e.type === "checkbox") { e.checked = v; e.dispatchEvent(new Event("change", { bubbles: true })); } else { e.value = v; e.dispatchEvent(new Event(e.tagName === "SELECT" ? "change" : "input", { bubbles: true })); } }, v);
      const has = async (id, t) => { const s = await read(id); assert(s.includes(t), `${id}: "${s}" içinde "${t}" yok`); checks++; };
      const noOverflow = async (w) => eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "yatay taşma: " + w);
      const clean = async (name) => { const t = await page.locator("#panel-" + name).innerText(); ok(!/NaN|undefined|Infinity|null/.test(t), name + " panelinde bozuk sayı: " + (t.match(/.{0,30}(NaN|undefined|Infinity|null).{0,30}/) || [""])[0]); };
      const sweep = async (name, ids) => { for (const id of ids) { const r = await page.locator("#" + id).evaluate((e) => [e.min, e.max]); for (const v of r) { await set(id, v); await clean(name); } } };
      const changes = async (id, act) => { const c = page.locator("#" + id), a = await c.evaluate((e) => e.toDataURL()); await act(); await page.waitForTimeout(80); ok((await c.evaluate((e) => e.toDataURL())) !== a, id + " değişmedi"); };
      eq(await page.evaluate(() => [...document.querySelectorAll("main input,main select")].every((e) => document.querySelector(`label[for="${e.id}"]`) || e.closest("label"))), true, "etiketsiz denetim");
      eq(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), true, "tuval rolü");
      eq(await page.evaluate(() => Object.isFrozen(OrbitalLab) && !Object.getOwnPropertyDescriptor(window, "OrbitalLab").writable), true, "çekirdek salt okunur");
      eq(await page.evaluate(() => /[̀-ͯ]/.test(document.body.innerText)), false, "birleşik işaret yok");
      // 1 · radyal (varsayılan 1s, Z = 1)
      await has("r1Nodes", "0 / 0"); await has("r1Norm", "1,000000"); await has("r1Mean", "1,5000 / 1,5000 a₀"); await has("r1Rmp", "1,0000 / 1,0000 a₀"); await has("r1RmpD", "52,9 pm"); await has("r1Vir", "−13,6057 / −13,6057 eV"); await has("r1Status", "52,92 pm"); await has("r1Status", "1s (H):");
      await click("r1P2s"); await has("r1Nodes", "1 / 1"); await has("r1NodePos", "2,0000"); await has("r1Rmp", "5,2361 / —"); await has("r1Mean", "6,0000 / 6,0000"); await has("r1Status", "2 tepe"); await has("r1Status", "2s (H):");
      await click("r1P3d"); await has("r1Rmp", "9,0000 / 9,0000"); await has("r1Mean", "10,5000 / 10,5000");
      await click("r1P4s"); await has("r1Nodes", "3 / 3"); await has("r1NodePos", "1,8716; 6,6108; 15,5175"); await has("r1Mean", "24,0000 / 24,0000"); await has("r1Status", "4 tepe");
      await set("r1L", 3); await has("r1Rmp", "16,0000 / 16,0000"); await set("r1N", 2); eq(await val("r1L"), "1", "ℓ ≤ n − 1'e kıstırılır"); eq(await page.locator("#r1L").getAttribute("max"), "1"); await has("r1Rmp", "4,0000 / 4,0000");
      await set("r1N", 1); await set("r1Z", 2); await has("r1Mean", "0,7500 / 0,7500"); await has("r1Rmp", "0,5000 / 0,5000"); await has("r1Vir", "−54,4228"); await has("r1Status", "1s (He⁺, Z = 2):");
      eq(await page.locator("#r1Rows tr").count(), 10, "durum tablosu");
      for (const n of [1, 2, 3, 4]) { await set("r1N", n); await sweep("radial", ["r1L", "r1Z"]); }
      await changes("r1Canvas", () => set("r1Z", 3));
      await click("radialReset"); eq(await val("r1N"), "1"); eq(await val("r1Z"), "1"); await has("r1Mean", "1,5000 / 1,5000"); await noOverflow("radyal");
      await set("r1N", 3); await page.locator("h1").click(); await page.keyboard.press("r"); eq(await val("r1N"), "1", "R sıfırlar");
      // 2 · açısal (varsayılan d_z²)
      await click("tab-angular"); eq(await val("a2Orb"), "2,0");
      await has("a2Count", "2 / 2"); await has("a2Rows", "54,7356°"); await has("a2Rows", "125,2644°"); await has("a2Norm", "1,000000000"); await has("a2Parity", "çift (+1)"); await has("a2Rot", "her açıda aynı"); await has("a2Status", "2 koni");
      await set("a2Orb", "1,0"); await has("a2Count", "1 / 1"); await has("a2Rows", "xy düzlemi"); await has("a2Parity", "tek (−1)");
      await set("a2Orb", "2,-2"); await has("a2Rot", "180° dönmede"); await has("a2RotD", "90° dönmede işaret"); await has("a2Rows", "90,0000°");
      await set("a2Orb", "3,0"); await has("a2Count", "3 / 3"); await has("a2Rows", "39,2315°"); await has("a2Status", "1 xy düzlemi, 2 koni");
      await set("a2Orb", "3,3"); await has("a2Rot", "120°"); await has("a2RotD", "60°"); await set("a2Orb", "0,0"); await has("a2Count", "0 / 0"); await has("a2Status", "küreseldir");
      for (const v of await page.locator("#a2Orb option").evaluateAll((os) => os.map((o) => o.value))) { await set("a2Orb", v); const [l] = v.split(","); await has("a2Count", " / " + l); await clean("angular"); }
      await set("a2Pow", "2"); await clean("angular"); await sweep("angular", ["a2Az", "a2El"]);
      await click("a2Top"); eq(await val("a2El"), "90"); await click("a2Side"); eq(await val("a2El"), "0");
      { const c = page.locator("#a2Canvas"); await set("a2Orb", "2,1"); await c.focus(); await changes("a2Canvas", () => page.keyboard.press("ArrowRight")); eq(await val("a2Az"), "5", "ok tuşu dönüşü"); await page.keyboard.press("r"); eq(await val("a2Orb"), "2,1", "tuvalde R sıfırlamaz"); }
      { const box = await page.locator("#a2Canvas").boundingBox(); const a0 = await val("a2Az"); await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down(); await page.mouse.move(box.x + box.width / 2 + 60, box.y + box.height / 2 + 20, { steps: 4 }); await page.mouse.up(); ok((await val("a2Az")) !== a0, "sürükleme döndürür"); }
      await changes("a2Map", () => set("a2Orb", "3,-2"));
      await click("angularReset"); eq(await val("a2Orb"), "2,0"); eq(await val("a2Az"), "35"); eq(await page.locator("#a2Nodes").isChecked(), true); await noOverflow("açısal");
      // 3 · bulut (varsayılan 2p_z, N = 5000, R = 5, tohum 1)
      await click("tab-cloud"); eq(await val("c3M"), "1,0");
      await has("c3Frac", "%56,70 / %55,95"); await has("c3FracD", "+1,1σ"); await has("c3R90", "7,878 / 7,994 a₀"); await has("c3Mean", "4,950 / 5,000 a₀"); await has("c3Status", "uyumlu");
      await click("c3ToR90"); eq(await val("c3R"), "8"); await has("c3Frac", "%90,64 / %90,04");
      await set("c3N", 1); eq(await val("c3L"), "0"); await has("c3R90", "/ 2,661 a₀"); await has("c3C90D", "r₉₀ küresidir"); await set("c3R", 8); await has("c3FracD", "σ karşılaştırması anlamsız"); await has("c3Status", "istatistikçe anlamsız");
      await set("c3N", 3); await set("c3L", 2); eq(await page.locator("#c3M option").count(), 5); await set("c3M", "2,-2"); await has("c3Title", "d"); await clean("cloud");
      await click("c3Seed"); await has("c3SeedInfo", "Tohum: 2"); await set("c3Count", 20000); await has("c3FracD", "20.000"); await clean("cloud");
      for (const pl of ["xy", "yz", "xz"]) { await set("c3Plane", pl); await clean("cloud"); }
      await set("c3N", 4); await set("c3L", 3); eq(await page.locator("#c3M option").count(), 7); await sweep("cloud", ["c3R", "c3Count"]); await set("c3R", 0.1); await clean("cloud");
      { const c = page.locator("#c3Canvas"); await c.focus(); await changes("c3Canvas", () => page.keyboard.press("ArrowUp")); }
      await click("cloudReset"); eq(await val("c3N"), "2"); eq(await val("c3M"), "1,0"); eq(await val("c3Count"), "5000"); await has("c3Frac", "%56,70 / %55,95"); await noOverflow("bulut");
      // 4 · enerji (varsayılan Hα, ¹H)
      await click("tab-energy");
      await has("e4dE", "1,8887 eV"); await has("e4Lam", "656,470 nm / 656,288 nm"); await has("e4Freq", "456,67 THz"); await has("e4Series", "Balmer"); await has("e4Ion", "13,598287 eV / 13,598435 eV"); await has("e4IonD", "13,598468");
      await has("e4Rows", "656,2883"); await has("e4Rows", "+0,0093"); await has("e4Rows", "656,28516"); await has("e4Status", "−0,016 pm"); await has("e4Status", "¹H, 3 → 2");
      await set("e4Mass", "inf"); await has("e4Rows", "−0,3479"); await has("e4Status", "indirgenmiş kütleyi aç"); await has("e4Status", "Sonsuz ağır çekirdekli H"); await set("e4Mass", "D"); await has("e4MassNote", "0,1785 nm"); await has("e4Status", "²H (döteryum), 3 → 2"); await set("e4Mass", "H");
      await click("e4La"); await has("e4Lam", "121,568 nm / —"); await has("e4LamD", "havada soğurulur"); await has("e4Series", "Lyman"); await click("e4Pa"); await has("e4Series", "Paschen"); await has("e4Lam", "1.875,");
      await click("e4Ha"); await set("e4Low", 5); eq(await val("e4Up"), "6", "üst düzey alt düzeyin üstüne itilir"); await set("e4Up", 3); eq(await val("e4Low"), "2", "alt düzey üst düzeyin altına çekilir");
      await set("e4Z", 2); eq(await page.locator("#e4Mass").isDisabled(), true); await has("e4Ion", "54,422772"); await has("e4Status", "He⁺"); await has("e4Series", "n_alt = 2 serisi (hidrojende Balmer)"); await has("e4Rows", "Z = 1 seç");
      await sweep("energy", ["e4Z", "e4Up", "e4Low"]); await set("e4Up", 10); await set("e4Low", 9); await set("e4Z", 1); await clean("energy");
      await changes("e4Spectrum", () => set("e4Up", 4)); await changes("e4Levels", () => set("e4Low", 1));
      await click("energyReset"); eq(await val("e4Z"), "1"); eq(await val("e4Up"), "3"); eq(await val("e4Low"), "2"); eq(await val("e4Mass"), "H"); await has("e4Lam", "656,470"); await noOverflow("enerji");
      // sekme klavyesi
      await page.locator("#tab-energy").focus(); await page.keyboard.press("Home"); eq(await page.locator("#tab-radial").getAttribute("aria-selected"), "true");
      await page.keyboard.press("ArrowLeft"); eq(await page.locator("#tab-energy").getAttribute("aria-selected"), "true"); await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-radial").getAttribute("aria-selected"), "true");
      await page.keyboard.press("End"); eq(await page.locator("#tab-energy").getAttribute("aria-selected"), "true");
      // tema değişince bütün tuvaller çizilir, taşma yok
      await page.evaluate(() => { document.documentElement.dataset.theme = document.documentElement.dataset.theme === "light" ? "dark" : "light"; }); await page.waitForTimeout(150);
      for (const t of ["radial", "angular", "cloud", "energy"]) { await click("tab-" + t); await page.waitForTimeout(120); eq(await page.evaluate((n) => [...document.querySelectorAll("#panel-" + n + " canvas")].every((c) => c.width > 100 && c.height > 60), t), true, "tuval boyutu " + t); await clean(t); await noOverflow(t); }
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
