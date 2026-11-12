// G · kimyasal-denge-ve-gibbs-enerjisi.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini YENİDEN KULLANMAZ:
// ΔH°(T), ΔS°(T) burada Cp°(T)'nin Simpson integraliyle yeniden kurulur; denge ilerlemesi kapalı biçimlerden
// (ikinci derece denklem kökleri) ya da kaba tarama ile; kinetik benzetim küçük adımlı açık Euler ile; Gibbs
// eğrisinin dibi türevin kapalı biçimiyle; çözünürlük ve çökelme ikinci derece/küp kök kapalı biçimleriyle ya da
// Newton yöntemiyle sınanır. Kaynaktan açılan sayılar (OpenStax Ek G, Ek J, 13.2; NIST Shomate) tabloyla karşılaştırılır.
// Kullanım: node scripts/check-g-kimyasal-denge-ve-gibbs-enerjisi.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "kimyasal-denge-ve-gibbs-enerjisi";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const E = win.EquilibriumLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(Math.abs(b), 1e-300) + (b === 0 ? tol : 0), `${label}: ${a} ≠ ${b} (tol ${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
const Rg = 8.314462618, RL = 0.08314462618;

ok(Object.isFrozen(E) && Object.isFrozen(E.RXN) && Object.isFrozen(E.SALTS) && Object.isFrozen(E.APPG), "çekirdek dondurulmuş");
near(E.R, Rg, 0, "R"); near(E.RL, Rg / 100, 1e-12, "R (L·bar)");

/* ── Kaynak tabloları (açılan sayfalardan elle kopyalanmış) ── */
const APPG = { N2: [0, 0, 191.6], H2: [0, 0, 130.7], NH3: [-45.9, -16.5, 192.8], N2O4: [11.1, 99.8, 304.4], NO2: [33.2, 51.30, 240.1], I2: [62.438, 19.3, 260.7], HI: [26.48, 1.70, 206.59] };
for (const [sp, [H, G, S]] of Object.entries(APPG)) { near(E.APPG[sp].H, H, 0, sp + " ΔH°f"); near(E.APPG[sp].G, G, 0, sp + " ΔG°f"); near(E.APPG[sp].S, S, 0, sp + " S°"); }
const KSP = { AgCl: 1.6e-10, AgBr: 5.0e-13, AgI: 1.5e-16, Ag2CrO4: 9.0e-12, PbI2: 1.4e-8, PbCl2: 1.6e-5, CaF2: 4.0e-11 };
for (const [k, v] of Object.entries(KSP)) near(E.SALTS[k].Ksp, v, 0, k + " Ksp");
// NIST S°(298.15 K) ve ΔfH° (Chase 1998): Shomate katsayılarından geri elde edilmeli
const NIST = { N2: [0, 191.61], H2: [0, 130.68], NH3: [-45.90, 192.77], NO2: [33.10, 240.04], N2O4: [9.08, 304.38], HI: [26.36, 206.59], I2: [62.42, 260.69] };
for (const [sp, [Hf, S]] of Object.entries(NIST)) { const s = E.shomate(sp, 298.15); ok(Math.abs(s.S - S) < 0.01, `${sp} S°(298) = ${s.S}`); ok(Math.abs(s.Hf - Hf) < 0.006, sp + " ΔfH°"); ok(Math.abs(s.dH) < 0.003, sp + " H(298)−H(298) ≈ 0"); }

/* ── 1. ΔH°(T), ΔS°(T): Cp°'nin Simpson integrali (bağımsız) ── */
const simpson = (f, a, b, n = 2000) => { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; };
for (const key of ["haber", "n2o4", "hi"]) {
  const r = E.RXN[key];
  for (const T of [350, 473.15, 673.15, 900]) {
    let dH = 0, dS = 0;
    r.sp.forEach((sp, i) => {
      const h0 = E.shomate(sp, 298.15);
      // Kesintisiz Cp integrali; N₂'de 500 K'de aralık değişir: parçalı integral
      const cp = (t) => E.shomate(sp, t).Cp;
      const cuts = [298.15, ...E.SHOMATE[sp].map((q) => q[1]).filter((x) => x > 298.15 && x < T), T];
      let I1 = 0, I2 = 0; for (let j = 0; j < cuts.length - 1; j++) { I1 += simpson(cp, cuts[j], cuts[j + 1]); I2 += simpson((t) => cp(t) / t, cuts[j], cuts[j + 1]); }
      dH += r.nu[i] * (h0.Hf + h0.dH + I1 / 1000); dS += r.nu[i] * (h0.S + I2);
    });
    const f = E.full(key, T);
    ok(Math.abs(f.dH - dH) < 0.02, `${key} ΔH°(${T}) ${f.dH} ↔ ∫Cp ${dH}`); ok(Math.abs(f.dS - dS) < 0.05, `${key} ΔS°(${T}) ${f.dS} ↔ ${dS}`);
    near(f.K, Math.exp(-(dH - T * dS / 1000) * 1000 / (Rg * T)), 0.02, `${key} K(${T})`);
  }
}
// Ek G: elle hesaplanmış tepkime büyüklükleri
{ const a = E.appG("haber"); near(a.dH, -91.8, 1e-12); near(a.dS, 2 * 192.8 - 191.6 - 3 * 130.7, 1e-12); near(a.dS, -198.1, 1e-9); near(a.dGf, -33.0, 1e-12); near(a.dG, -91.8 + 298.15 * 0.1981, 1e-9, "ΔG°298 haber"); near(a.K, Math.exp((91.8 - 298.15 * 0.1981) * 1000 / (Rg * 298.15)), 1e-9); }
{ const a = E.appG("n2o4"); near(a.dH, 55.3, 1e-12); near(a.dS, 175.8, 1e-9); near(a.dGf, 2.8, 1e-9); near(a.dG, 55.3 - 298.15 * 0.1758, 1e-9); }
{ const a = E.appG("hi"); near(a.dH, 2 * 26.48 - 62.438, 1e-12); near(a.dS, 21.78, 1e-9); near(a.dGf, -15.9, 1e-9); }
// OpenStax 13.2 değerleri Kp'ye çevrilir
near(E.refKp("haber"), 0.50 / (RL * 673.15) ** 2, 1e-12, "Kp(NH₃)"); near(E.refKp("hi"), 50, 1e-12); near(E.refKp("n2o4"), RL * 298.15 / 160, 1e-12);
ok(Math.abs(E.full("haber", 673.15).K / E.refKp("haber") - 1) < 0.15, "NIST tam hesap OpenStax Kc'ye %15 içinde (amonyak)");
ok(Math.abs(E.full("n2o4", 298.15).K / E.refKp("n2o4") - 1) < 0.05, "N₂O₄ %5 içinde");
ok(Math.abs(E.full("hi", 673.15).K / E.refKp("hi") - 1) < 0.25, "HI %25 içinde");
ok(E.appG("haber", 673.15).K / E.refKp("haber") > 3, "sabit ΔH°, ΔS° yaklaşımı 400 °C'de 3 kattan fazla sapar");

/* ── 2. Denge ilerlemesi: kapalı biçimler ── */
const condV = (T, V, inert = 0) => ({ mode: "V", T, V, inert }), condP = (T, P, inert = 0) => ({ mode: "P", T, P, inert });
for (const K of [1e-6, 0.3, 1, 50, 1e6]) { // H₂ + I₂: Δn = 0, 1:1 → 2ξ/(1−ξ) = √K
  const e = E.solve("hi", [1, 1, 0], condV(673.15, 10), K); near(e.xi, Math.sqrt(K) / (2 + Math.sqrt(K)), 1e-12, "HI kapalı biçim");
  const e2 = E.solve("hi", [1, 1, 0], condP(673.15, 7, 3), K); near(e2.xi, e.xi, 1e-12, "Δn = 0: koşuldan bağımsız");
  // ürün tarafından başlayınca aynı bileşim
  const e3 = E.solve("hi", [0, 0, 2], condV(673.15, 10), K); near(e3.n[2], e.n[2], 1e-9, "iki yönden aynı denge");
}
for (const [T, V, n0] of [[298.15, 10, 1], [298.15, 1, 1], [350, 5, 2], [450, 0.5, 0.3]]) { // N₂O₄ sabit V: 4ξ²/(V(n0−ξ)) = Kc
  const K = E.full("n2o4", T).K, Kc = K / (RL * T), a = 4, b = Kc * V, c = -Kc * V * n0;
  near(E.solve("n2o4", [n0, 0], condV(T, V), K).xi, (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a), 1e-10, "N₂O₄ ikinci derece");
}
for (const [T, P, inert] of [[298.15, 1, 0], [330, 2, 1], [400, 10, 0]]) { // N₂O₄ sabit P: 4ξ²/((n0−ξ)(n0+ξ+ni)) · P = K
  const K = E.full("n2o4", T).K, n0 = 1; // (4P + K)ξ² + K ni ξ − K n0(n0+ni) = 0
  const A = 4 * P + K, B = K * inert, C = -K * n0 * (n0 + inert);
  near(E.solve("n2o4", [n0, 0], condP(T, P, inert), K).xi, (-B + Math.sqrt(B * B - 4 * A * C)) / (2 * A), 1e-10, "N₂O₄ sabit P");
}
{ // amonyak: kaba tarama ile bağımsız kök (lnQ işaret değiştirdiği aralık)
  const T = 673.15, K = E.full("haber", T).K, Kc = K * (RL * T) ** 2, f = (x) => Math.log(4 * x * x) - Math.log(1 - x) - 3 * Math.log(3 - 3 * x) - Math.log(Kc); // V = 1 L
  let lo = 0, hi = 1; for (let i = 0; i < 100; i++) { const m = (lo + hi) / 2; f(m) > 0 ? (hi = m) : (lo = m); }
  const e = E.solve("haber", [1, 3, 0], condV(T, 1), K); near(e.xi, lo, 1e-12, "amonyak ξ"); near(e.xi, 0.4957027, 1e-6); ok(Math.abs(e.residual) < 1e-10, "artık");
  // önceden tasarlanmış: ξ/(1−ξ)² = √(27Kc/4)
  near(e.xi / (1 - e.xi) ** 2, Math.sqrt(27 * Kc / 4), 1e-10, "√ dönüşümü");
  near(e.P, (1 - e.xi + 3 - 3 * e.xi + 2 * e.xi) * RL * T, 1e-12, "toplam basınç");
}
{ // dejenere ve sınır durumları
  ok(E.solve("hi", [1, 0, 0], condV(673.15, 10), 50).degenerate, "I₂ ve HI yokken dejenere");
  ok(!E.solve("hi", [0, 0, 1], condV(673.15, 10), 50).degenerate, "yalnız HI: geri tepkime");
  for (const bad of [() => E.solve("x", [1], condV(300, 1), 1), () => E.solve("hi", [1, 1, 0], condV(300, 0), 1), () => E.solve("hi", [-1, 1, 0], condV(300, 1), 1), () => E.solve("hi", [1, 1, 0], condV(300, 1), 0), () => E.solve("hi", [1, 1], condV(300, 1), 1)]) { assert.throws(bad); checks++; }
  for (const K of [1e-12, 1e12]) { const e = E.solve("haber", [1, 3, 0], condV(500, 5), K); ok(Math.abs(e.residual) < 1e-8 && e.n.every((x) => x >= 0), "uç K " + K); }
}
// ln Q, ξ'de kesin artan (sabit V ve sabit P; Cauchy–Schwarz): rastgele örneklerle
for (let i = 0; i < 300; i++) {
  const n0 = [0.1 + (i * 37 % 50) / 10, 0.1 + (i * 53 % 50) / 10, (i * 71 % 50) / 10], c = i % 2 ? condV(500, 0.5 + i % 9) : condP(500, 1 + i % 40, i % 4);
  const [lo, hi] = E.bounds("haber", n0), a = lo + (hi - lo) * 0.3, b = lo + (hi - lo) * 0.7;
  ok(E.lnQof("haber", n0.map((v, j) => v + E.RXN.haber.nu[j] * b), c) > E.lnQof("haber", n0.map((v, j) => v + E.RXN.haber.nu[j] * a), c), "ln Q artan");
}

/* ── 3. Le Chatelier ve sabit basınç paradoksu ── */
{
  const T = 673.15, K = E.full("haber", T).K;
  const cases = [["addR", 1], ["addP", -1], ["compress", 1], ["heat", -1], ["cool", 1]];
  for (const mode of ["V", "P"]) for (const [type, want] of cases) {
    const c = mode === "V" ? condV(T, 2) : condP(T, 50), e = E.solve("haber", [1, 3, 0], c, K), p = E.perturb("haber", e, c, type);
    const e2 = E.solve("haber", p.n0, p.cond, E.full("haber", p.cond.T).K);
    ok(E.lechatelier("haber", type, mode) === want, "kural " + type);
    ok(Math.sign(e2.xi) === want, `${mode} ${type}: Δξ = ${e2.xi}`);
  }
  // sabit V'de soy gaz: kayma yok; sabit P'de: çok mollü taraf (geri)
  { const c = condV(T, 2), e = E.solve("haber", [1, 3, 0], c, K), p = E.perturb("haber", e, c, "inert"); near(E.solve("haber", p.n0, p.cond, K).xi, 0, 1e-9, "sabit V soy gaz"); ok(E.lechatelier("haber", "inert", "V") === 0); }
  { const c = condP(T, 50), e = E.solve("haber", [1, 3, 0], c, K), p = E.perturb("haber", e, c, "inert"); ok(E.solve("haber", p.n0, p.cond, K).xi < 0, "sabit P soy gaz geri"); }
  // N₂ mol kesri > 1/2 iken sabit P'de N₂ eklemek tepkimeyi GERİ yürütür: Q'yu bağımsız hesapla
  const c = condP(T, 200), e = E.solve("haber", [3, 1, 0], c, K); ok(e.x[0] > 0.5, "x(N₂) > 1/2");
  const n = [e.n[0] + 1, e.n[1], e.n[2]], nt = n[0] + n[1] + n[2], Qind = (n[2] / nt * 200) ** 2 / ((n[0] / nt * 200) * (n[1] / nt * 200) ** 3);
  ok(Qind > K, "N₂ eklenince Q > K"); const p = E.perturb("haber", e, c, "addR"); near(Math.exp(E.state("haber", p.n0, p.cond, 0).lnQ), Qind, 1e-10, "Q");
  ok(E.solve("haber", p.n0, p.cond, K).xi < 0, "paradoks: geri kayma"); ok(E.lechatelier("haber", "addR", "P") === 1, "kural ileri der");
  // x(N₂) < 1/2 iken aynı ekleme ileri
  const e2 = E.solve("haber", [1, 3, 0], c, K), p2 = E.perturb("haber", e2, c, "addR"); ok(E.solve("haber", p2.n0, p2.cond, K).xi > 0, "x(N₂) < 1/2: ileri");
  ok(E.lechatelier("n2o4", "heat", "V") === 1 && E.lechatelier("n2o4", "compress", "V") === -1 && E.lechatelier("hi", "compress", "V") === 0, "N₂O₄ ve HI kuralları");
}

/* ── 4. Kinetik benzetim: Euler çapraz denetimi ve aynı denge ── */
for (const [key, n0, c, T] of [["haber", [1, 3, 0], condV(673.15, 1), 673.15], ["n2o4", [1, 0], condV(298.15, 10), 298.15], ["hi", [1, 1, 0], condV(673.15, 10), 673.15], ["haber", [0, 0, 2], condP(600, 50, 1), 600], ["n2o4", [0.2, 1.5], condP(330, 3), 330]]) {
  const K = E.full(key, T).K, k = E.kinetics(key, n0, c, K), eq = E.solve(key, n0, c, K);
  ok(Math.abs(k.xiEnd - eq.xi) <= 1e-8 * Math.max(1, Math.abs(eq.xi)), `${key} kinetik son ξ ${k.xiEnd} ↔ ${eq.xi}`);
  ok(Math.abs(k.rfEnd - k.rbEnd) <= 1e-7 * k.rfEnd, "dengede r₊ = r₋");
  near(k.kf / k.kb, K * (1 / (RL * T)) ** E.RXN[key].nu.reduce((a, b) => a + b, 0), 1e-12, "k₊/k₋ = Kc");
  // açık Euler, küçük adım: t = 2τ'daki ξ
  const r = E.RXN[key], vol = (n) => (c.mode === "V" ? c.V : (n.reduce((a, b) => a + b, 0) + (c.inert || 0)) * RL * c.T / c.P);
  let x = 0, t = 0; const dt = 2e-5;
  while (t < 2 - 1e-12) { const n = n0.map((v, i) => v + r.nu[i] * x), V = vol(n); let rf = k.kf, rb = k.kb; r.nu.forEach((v, i) => { const ci = n[i] / V; if (v < 0) rf *= ci ** -v; else rb *= ci ** v; }); x += V * (rf - rb) * dt; t += dt; }
  const pts = k.pts; let j = pts.findIndex((p) => p[0] >= 2); const a = pts[j - 1], b = pts[j], xi2 = a[1] + (b[1] - a[1]) * (2 - a[0]) / (b[0] - a[0]);
  ok(Math.abs(xi2 - x) < 2e-3 * Math.max(Math.abs(eq.xi), 1e-3), `${key} Euler t = 2τ: ${xi2} ↔ ${x}`);
  // durulma: dengeye yakın |ξ − ξeq| ∝ e^(−t/τ)
  const late = pts.filter((p) => p[0] > 4 && p[0] < 9 && Math.abs(p[1] - eq.xi) > 1e-12 * Math.max(1, Math.abs(eq.xi)));
  if (late.length > 5) { const p1 = late[0], p2 = late[late.length - 1], rate = Math.log(Math.abs(p1[1] - eq.xi) / Math.abs(p2[1] - eq.xi)) / (p2[0] - p1[0]); ok(Math.abs(rate - 1) < 0.05, `${key} durulma hızı ${rate}`); }
}
ok(E.kinetics("hi", [1, 0, 0], condV(673.15, 10), 50) === null, "dejenere: kinetik yok");

/* ── 5. Gibbs eğrisi: türevin kapalı biçimi ve dip ── */
for (const [key, T, P] of [["haber", 298.15, 1], ["haber", 673.15, 1], ["haber", 673.15, 200], ["n2o4", 298.15, 1], ["n2o4", 350, 5], ["hi", 673.15, 1]]) {
  const m = E.gibbsMin(key, T, P), eq = E.stoichEq(key, T, P);
  ok(Math.abs(m.xi - eq.xi) < 2e-6 * Math.max(eq.xi, 1e-3), `${key} ${T} K ${P} bar: dip ${m.xi} ↔ ${eq.xi}`);
  const r = E.RXN[key], dG0 = r.sp.reduce((s, sp, i) => s + r.nu[i] * E.gSpecies(sp, T), 0);
  near(dG0, E.full(key, T).dG, 1e-10, "Σνμ° = ΔG°");
  for (const x of [0.05, 0.3, 0.7, 0.95]) {
    const n = r.nu.map((v) => (v < 0 ? -v * (1 - x) : v * x)), nt = n.reduce((a, b) => a + b, 0);
    const dGdx = dG0 * 1000 + Rg * T * r.nu.reduce((s, v, i) => s + v * Math.log(n[i] / nt * P), 0);
    const h = 1e-6, fd = (E.gibbsCurve(key, T, P, x + h).G - E.gibbsCurve(key, T, P, x - h).G) / (2 * h);
    ok(Math.abs(fd - dGdx) < 1e-3 * Math.max(1, Math.abs(dGdx)) + 0.05, `dG/dξ ${fd} ↔ ${dGdx}`);
    near(E.deltaG(key, T, Math.log(r.nu.reduce((p, v, i) => p * (n[i] / nt * P) ** v, 1))) * 1000, dGdx, 1e-9, "ΔG = ΔG° + RT ln Q");
    const g2 = E.gibbsCurve(key, T, P, x + 1e-3).G + E.gibbsCurve(key, T, P, x - 1e-3).G - 2 * E.gibbsCurve(key, T, P, x).G; ok(g2 > 0, "G dışbükey");
  }
  // karışma terimi uçlarda sıfır, içte negatif
  { // uçlarda yalnız aynı taraftaki türlerin karışması kalır: RT Σ nᵢ ln xᵢ (ayrı ayrı yazılır)
    const side = (sgn) => { const n = r.nu.filter((v) => Math.sign(v) === sgn).map(Math.abs), nt = n.reduce((a, b) => a + b, 0); return Rg * T * n.reduce((a, b) => a + b * Math.log(b / nt), 0); };
    near(E.gibbsCurve(key, T, P, 0).mix, side(-1), 1e-9, "ξ = 0 karışma"); near(E.gibbsCurve(key, T, P, 1).mix, side(1), 1e-9, "ξ = 1 karışma");
    ok(E.gibbsCurve(key, T, P, 0.5).mix < Math.min(side(-1), side(1)), "karışma içte daha negatif"); }
}
ok(E.full("haber", 673.15).dG > 0 && E.stoichEq("haber", 673.15, 1).xi > 0.008, "ΔG° > 0 ama ürün var");

/* ── 6. van 't Hoff ve ΔG° = 0 ── */
for (const key of ["haber", "n2o4", "hi"]) for (const T of [320, 520, 800]) {
  const h = 0.25, dlnK = (E.full(key, T + h).lnK - E.full(key, T - h).lnK) / (1 / (T + h) - 1 / (T - h));
  ok(Math.abs(-Rg * dlnK / 1000 - E.full(key, T).dH) < 1e-4 * Math.abs(E.full(key, T).dH), `${key} Gibbs–Helmholtz ${T}`);
  const f1 = E.full(key, 298.15); near(E.vantHoff(f1.K, 298.15, f1.dH, T), f1.K * Math.exp(-f1.dH * 1000 / Rg * (1 / T - 1 / 298.15)), 1e-12);
  near(E.vantHoff(f1.K, 298.15, f1.dH, 298.15), f1.K, 1e-14, "T = T₁");
}
{ const a = E.appG("haber"), z = E.zeroG("haber", "app"); near(z, 91.8 / 0.1981, 1e-9, "Ek G ΔG° = 0: 463.4 K"); const zf = E.zeroG("haber"); ok(Math.abs(E.full("haber", zf).dG) < 1e-9 && zf > 450 && zf < 460, "NIST ΔG° = 0: " + zf); void a; }
ok(E.zeroG("hi") === null && E.zeroG("hi", "app") === null, "HI: ΔG° hep negatif");
ok(Math.abs(E.zeroG("n2o4") - 325.09) < 0.05, "N₂O₄ ΔG° = 0 ≈ 325.1 K");

/* ── 7. Çözünürlük ve çökelme: kapalı biçimler ── */
near(E.simpleS("AgCl"), Math.sqrt(1.6e-10), 1e-12); near(E.simpleS("Ag2CrO4"), Math.cbrt(9e-12 / 4), 1e-12); near(E.simpleS("PbI2"), Math.cbrt(1.4e-8 / 4), 1e-12); near(E.simpleS("CaF2"), Math.cbrt(1e-11), 1e-12);
ok(E.simpleS("Ag2CrO4") > E.simpleS("AgCl") && E.SALTS.Ag2CrO4.Ksp < E.SALTS.AgCl.Ksp, "küçük Ksp, büyük s");
for (const k of Object.keys(KSP)) near(E.solubility(k).s, E.simpleS(k), 1e-12, k + " saf su");
for (const c of [1e-6, 1e-5, 1e-3, 0.1]) {
  near(E.solubility("AgCl", 0, c).s, 2 * 1.6e-10 / (c + Math.sqrt(c * c + 4 * 1.6e-10)), 1e-12, "AgCl ortak Cl⁻"); // iptalsiz kapalı biçim
  near(E.solubility("AgCl", c, 0).s, E.solubility("AgCl", 0, c).s, 1e-9, "simetri");
  // PbI₂ + I⁻: s(c + 2s)² = Ksp, Newton (bağımsız)
  let s = 1e-3; for (let i = 0; i < 100; i++) { const f = s * (c + 2 * s) ** 2 - 1.4e-8, d = (c + 2 * s) ** 2 + 4 * s * (c + 2 * s); s -= f / d; }
  near(E.solubility("PbI2", 0, c).s, s, 1e-9, "PbI₂ Newton");
  // Ag₂CrO₄ + Ag⁺: (c + 2s)² s = Ksp
  let t = 1e-4; for (let i = 0; i < 200; i++) { const f = (c + 2 * t) ** 2 * t - 9e-12, d = (c + 2 * t) ** 2 + 4 * t * (c + 2 * t); t = Math.max(t - f / d, t / 10); }
  near(E.solubility("Ag2CrO4", c, 0).s, t, 1e-9, "Ag₂CrO₄ Newton");
}
near(E.commonApprox("AgCl", 0, 0.01), 1.6e-8, 1e-12); near(E.commonApprox("PbI2", 0, 0.1), 1.4e-6, 1e-12); near(E.commonApprox("Ag2CrO4", 0.01, 0), 9e-12 / 1e-4, 1e-12);
for (const [c1, V1, c2, V2] of [[1e-3, 50, 1e-3, 50], [1e-2, 10, 1e-4, 90], [1e-5, 50, 1e-5, 50], [0.1, 1, 0.1, 100]]) {
  const m = E.mix("AgCl", c1, V1, c2, V2), cM = c1 * V1 / (V1 + V2), cA = c2 * V2 / (V1 + V2);
  near(m.Q, cM * cA, 1e-12);
  const x = cM * cA > 1.6e-10 ? ((cM + cA) - Math.sqrt((cM - cA) ** 2 + 4 * 1.6e-10)) / 2 : 0;
  ok(Math.abs(m.x - x) <= 1e-9 * Math.max(x, 1e-12), `AgCl çökelme ${m.x} ↔ ${x}`); ok(m.precipitates === x > 0, "çökelme kararı");
  if (x > 0) near(m.Qf, 1.6e-10, 1e-6, "son çarpım = Ksp");
}
{ const m = E.mix("AgCl", 1e-3, 50, 1e-3, 50); near(m.mmol, 0.0487351, 1e-5, "0.0487 mmol"); near(m.I, 0.5 * (2 * m.cMf + 2 * 5e-4), 1e-12, "I"); }
{ const m = E.mix("Ag2CrO4", 1e-3, 50, 1e-3, 50); near(m.Qf, 9e-12, 1e-6); near(m.cMf ** 2 * m.cAf, 9e-12, 1e-6); near(5e-4 - m.cAf, (5e-4 - m.cMf) / 2, 1e-9, "stokiyometri 2:1"); }
ok(!E.mix("AgCl", 1e-5, 50, 1e-5, 50).precipitates, "10⁻⁵ + 10⁻⁵: çökelme yok");
for (const bad of [() => E.mix("AgCl", -1, 1, 1, 1), () => E.mix("AgCl", 1, 0, 1, 1), () => E.solubility("NaCl"), () => E.solubility("AgCl", -1, 0)]) { assert.throws(bad); checks++; }

console.log(`G ${SLUG}: ${checks.toLocaleString("tr-TR")} bağımsız Cp integrali, kapalı biçim, Euler ve Newton denetimi PASS`);

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
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let browser;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const before = checks;
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width === 390 ? 2 : 1, locale: "tr-TR" });
      await ctx.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(6000);
      const errors = []; page.on("pageerror", (e) => errors.push(e.message)); page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); }); page.on("response", (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const click = (id) => page.locator("#" + id).click(), read = async (id) => (await page.locator("#" + id).textContent()).trim();
      const has = async (id, t) => { const s = await read(id); assert(s.includes(t), `[${width}] #${id}: "${s}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, v);
      const pick = (id, v) => page.locator("#" + id).selectOption(v);
      const eq = (a, b, label) => { assert.equal(a, b, `[${width}] ${label || ""}`); checks++; };
      const clean = async (sel) => { const t = await page.locator(sel).innerText(); assert(!/NaN|Infinity|undefined|null/.test(t), `[${width}] ${sel} bozuk sayı: ${t.match(/.{0,40}(NaN|Infinity|undefined|null).{0,40}/)?.[0]}`); checks++; };
      const noOverflow = async () => eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "yatay taşma");
      const drawn = async (ids) => { for (const id of ids) eq(await page.evaluate((id) => { const c = document.getElementById(id), d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++; return n > 500; }, id), true, id + " boş"); };

      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content input, .app-content select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).length), 0, "etiketsiz denetim");
      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].filter((c) => c.getAttribute("role") !== "img" || !c.getAttribute("aria-label")).length), 0, "rolsüz tuval");
      eq(await page.evaluate(() => Object.isFrozen(EquilibriumLab) && !Object.getOwnPropertyDescriptor(window, "EquilibriumLab").writable), true, "çekirdek salt okunur");
      eq(await page.evaluate(() => /[̀-ͯ]/.test(document.querySelector(".app-content").textContent)), false, "birleşik işaret yok");
      eq(await page.evaluate(() => [...document.scripts].filter((s) => s.src && !s.src.includes("/shared/")).length + document.querySelectorAll('link[href*="fonts.googleapis"], script[src*="atlas"], script[src*="stem-"]').length), 0, "dış betik ya da eski STEM dosyası yok");

      /* 01 */
      await has("qK", "1.797×10⁻⁴"); await has("qKc", "Kc = 0.5628"); await has("qQ0", "0"); await has("qDir", "ileri"); await has("qXi", "0.495703 mol"); await has("qRes", "ln Q − ln K = 0");
      await has("qPV", "168.4 bar"); await has("qKinXi", "0.495703 mol"); await has("qT99", "t₉₉ = 3.88 τ"); await has("qRates", "0.08357"); await has("qStatus", "49.6 %");
      await has("qPStatus", "Birinci denge kuruldu");
      await click("qAddR"); await has("qPPred", "ileri"); await has("qPMeasi", "ileri"); await has("qPStatus", "uyuşuyor");
      await click("qCompress"); await has("qPInfo", "V: 1.0 → 0.50 L"); await has("qPMeasi", "ileri");
      await click("qAddInert"); await has("qPPred", "kayma yok"); await has("qPMeas", "0 mol"); eq(await read("qPMeas"), "0 mol", "sıfır kayma işaretsiz"); await has("qPStatus", "Q aynı kalır");
      await click("qHeat"); await has("qPPred", "geri"); await has("qPMeasi", "geri"); await has("qPStatus", "K 1.797×10⁻⁴ → "); await has("qPStatus", "0.8665 katına"); await has("qPQi", "Q/K = 3.177");
      await click("qAddP"); await has("qPMeasi", "geri"); await clean("#panel-qk");
      await click("qParadox"); await has("qPPred", "ileri"); await has("qPMeasi", "geri"); await has("qPStatus", "uyuşmuyor"); await has("qPQi", "Q/K = 1.200"); await has("qXi", "0.184612 mol");
      await pick("qMode", "P"); await click("qAddInert"); await has("qPMeasi", "geri"); await has("qPStatus", "uyuşuyor");
      await click("qClear"); await has("qPName", "—");
      await pick("qRx", "n2o4"); await has("qK", "0.1484"); await has("qXi", "0.115097 mol"); await has("qN0Label", "N₂O₄"); eq(await page.locator("#qN2Field").isHidden(), true, "N₂O₄'te üçüncü tür gizli");
      await click("qCompress"); await has("qPPred", "geri"); await has("qPMeasi", "geri"); await click("qHeat"); await has("qPMeasi", "ileri");
      await pick("qRx", "hi"); await has("qK", "61.85"); await has("qXi", "0.797250 mol"); await click("qCompress"); await has("qPPred", "kayma yok"); await has("qPMeas", "0 mol");
      await range("qN1", 0); await has("qStatus", "tanımsız"); await has("qXi", "—"); await clean("#panel-qk"); eq(await page.locator("#qPlay").isDisabled(), true, "dejenerede oynatma kapalı");
      await range("qN0", 0); await range("qN2", 2); await has("qDir", "geri"); await clean("#panel-qk");
      await range("qT", 25); await has("qStatus", "I₂ katı"); await range("qT", 625); await click("qHeat"); await has("qPInfo", "948.15 K"); await clean("#panel-qk");
      await pick("qRx", "haber"); await range("qT", 25); eq(await page.locator("#qCool").isDisabled(), true, "25 °C'de soğutma kapalı"); await has("qK", "5.427×10⁵"); await clean("#panel-qk");
      await range("qV", 50); await range("qN0", 5); await range("qN1", 5); await range("qN2", 5); await range("qInert", 10); await clean("#panel-qk"); await click("qCompress"); await clean("#panel-qk");
      await click("qReset"); await has("qXi", "0.495703 mol"); await has("qTOut", "400 °C"); await has("qVOut", "1.0 L");
      await page.locator("h1").click(); await page.keyboard.press("Space"); await has("qPlay", "Duraklat"); await page.waitForTimeout(250); await page.keyboard.press("Space"); await has("qPlay", "Devam et");
      await range("qT", 300); await page.keyboard.press("r"); await has("qTOut", "400 °C"); await has("qPlay", "Oynat");
      await page.locator("#qV").focus(); await page.keyboard.press("r"); await has("qTOut", "400 °C");
      await drawn(["qBars", "qKin"]); await noOverflow();

      /* 02 */
      await click("tab-gibbs"); await has("gDG0", "−32.73 kJ/mol"); await has("gK", "5.427×10⁵"); await has("gXiK", "0.967691"); await has("gXiMin", "0.967691"); await has("gSlopeDiff", "0.00 %"); await has("gDG", "−28.583 kJ/mol"); await has("gSlope", "−28.583 kJ/mol");
      await has("gRows", "−91.800"); await has("gRows", "−198.10"); await has("gRows", "−32.736"); await has("gRows", "−33.00");
      await click("gPosG"); await has("gDG0", "48.27 kJ/mol"); await has("gXiK", "0.00859439"); await has("gXiMin", "0.0085944"); await has("gStatus", "ΔG° pozitif olduğu hâlde"); await has("gDG", "57.638");
      await click("gN2O4"); await has("gDG0", "4.73 kJ/mol"); await has("gXiK", "0.189165"); await has("gXiMin", "0.189165"); await range("gXi", 0.189); await has("gDG", "kJ/mol"); await has("gDir", "ΔG < 0");
      await range("gXi", 0.001); await clean("#panel-gibbs"); await range("gXi", 0.999); await has("gDir", "ΔG > 0"); await clean("#panel-gibbs");
      await pick("gRx", "hi"); await range("gT", 625); await range("gP", 300); await has("gStatus", "100 bar"); await clean("#panel-gibbs");
      await pick("gRx", "haber"); await range("gT", 25); await range("gP", 300); await clean("#panel-gibbs");
      await click("gReset"); await has("gDG0", "−32.73"); await has("gXiOut", "0.500"); await page.locator("h1").click(); await range("gT", 100); await page.keyboard.press("r"); await has("gTOut", "25 °C");
      await drawn(["gCurve", "gDelta"]); await noOverflow();

      /* 03 */
      await click("tab-vh"); await has("vKfull", "1.797×10⁻⁴"); await has("vKvh", "5.960×10⁻⁴"); await has("vKvhDiff", "+231.71 %"); await has("vKapp", "5.968×10⁻⁴"); await has("vSlope", "−104.621 kJ/mol"); await has("vT0", "455.8 K");
      await has("vT0i", "463.4 K"); await has("vRef", "Kp = 1.60×10⁻⁴"); await has("vRefi", "+12.57 %"); await has("vYieldOut", "39.60 % · 100 bar"); await has("vCp", "−23.71");
      await range("vTref", 400); await has("vKvhDiff", "0.00 %"); await has("vStatus", "özdeştir");
      await click("vNear"); await has("vTrefOut", "350 °C"); await has("vKvhDiff", "%");
      await click("vHaber"); await has("vKfull", "4.900×10⁻⁵"); await has("vYieldOut", "27.63 %"); await has("vStatus", "400–500 °C");
      await pick("vRx", "n2o4"); await has("vT0", "325.1 K"); await has("vStatus", "N₂O₄ için Shomate katsayıları başvuru sıcaklığı T₁ = 298.15 K'de"); await has("vRef", "Kp = 0.155"); await has("vStatus", "endotermik");
      await pick("vRx", "hi"); await has("vT0", "Bu aralıkta yok"); await has("vT0i", "her sıcaklıkta negatif"); await has("vRef", "Kp = 50.0");
      await range("vT", 725); await range("vTref", 725); await range("vP", 300); await clean("#panel-vh"); await range("vT", 25); await range("vTref", 725); await clean("#panel-vh");
      await click("vReset"); await has("vKvh", "5.960×10⁻⁴"); await drawn(["vChart", "vYield"]); await noOverflow();

      /* 04 */
      await click("tab-sol"); await has("sKsp", "1.6×10⁻¹⁰"); await has("sS", "1.265×10⁻⁵ mol/L"); await has("sS0Diff", "0.00 %"); await has("sQ", "Q/K = 1560"); await has("sPpt", "0.04874 mmol AgCl"); await has("sFrac", "97.47 %"); await has("sRemi", "1.000");
      eq(await page.locator("#sCLog").isDisabled(), true, "saf suda derişim kapalı");
      await pick("sCommon", "an"); await has("sS", "1.600×10⁻⁸ mol/L"); await has("sSaDiff", "+1.6×10⁻⁴ %"); await has("sSaDiff", "s ≈ Ksp/c₋ ·"); await has("sStatus", "tutuyor");
      await range("sCLog", 0); await has("sStatus", "kompleks"); await pick("sCommon", "cat"); await range("sCLog", -6); await has("sS", "1.216×10⁻⁵"); await has("sStatus", "tutmuyor");
      await click("sChromate"); await has("sS", "1.310×10⁻⁴ mol/L"); await has("sQ", "Q/K = 13.9"); await has("sPpt", "0.01677 mmol"); await has("sRows", "1.31×10⁻⁴");
      await click("sEdge"); await has("sPpt", "Çökelti yok"); await has("sPred", "çökelme yok");
      await pick("sSalt", "PbI2"); await pick("sCommon", "an"); await range("sCLog", -3); await has("sS", "0.001205 mol/L"); await has("sSaDiff", "s ≈ Ksp/c₋² ·"); await pick("sCommon", "cat"); await has("sSaDiff", "s ≈ √(Ksp/c₊)/2 ·"); await pick("sSalt", "Ag2CrO4"); await has("sSaDiff", "s ≈ Ksp/c₊² ·"); await pick("sCommon", "an"); await has("sSaDiff", "s ≈ √(Ksp/c₋)/2 ·"); await pick("sSalt", "PbI2"); await has("sStatus", "tutmuyor");
      await pick("sSalt", "PbCl2"); await range("sC1", 0); await range("sC2", 0); await range("sV1", 100); await range("sV2", 1); await has("sI", "mol/L"); await has("sIi", "kaba"); await clean("#panel-sol");
      await range("sC1", -6); await range("sC2", -6); await clean("#panel-sol");
      await click("sReset"); await has("sS", "1.265×10⁻⁵"); await has("sC1Out", "0.0010 mol/L"); await page.locator("h1").click(); await pick("sSalt", "CaF2"); await page.locator("h1").click(); await page.keyboard.press("r"); await has("sKsp", "1.6×10⁻¹⁰");
      await drawn(["sCurve", "sMix"]); await noOverflow();

      // sekme klavyesi
      await page.locator("#tab-sol").focus(); await page.keyboard.press("Home"); eq(await page.locator("#tab-qk").getAttribute("aria-selected"), "true", "Home");
      await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-gibbs").getAttribute("aria-selected"), "true", "sağ ok"); eq(await page.locator("#panel-gibbs").isVisible(), true, "panel görünür");
      await page.keyboard.press("End"); eq(await page.locator("#tab-sol").getAttribute("aria-selected"), "true", "End"); await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-qk").getAttribute("aria-selected"), "true", "sarma");
      await page.keyboard.press("ArrowLeft"); eq(await page.locator("#tab-sol").getAttribute("aria-selected"), "true", "sol ok"); eq(await page.locator("#tab-qk").getAttribute("tabindex"), "-1", "tabindex");
      await noOverflow();
      assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      console.log(`G ${SLUG}: ${width} px ${theme} · ${checks - before} arayüz denetimi PASS`);
      await ctx.close();
    }
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
