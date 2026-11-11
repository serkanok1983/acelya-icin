// G · molekul-sekli.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini YENİDEN KULLANMAZ:
// kirişlerden kapalı biçimli enerji, bilinen Thomson enerjileri, sonlu farkla gradyan, simetriye indirgenmiş tek/iki
// değişkenli altın oran aramaları (NH₃, H₂O), elle yazılmış Lewis tablosu ve elle kurulmuş dipol vektörleri.
// Kullanım: node scripts/check-g-molekul-sekli.mjs [--browser]
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const SLUG = "molekul-sekli";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.VseprLab;
assert(K && Object.isFrozen(K), "VseprLab dondurulmuş olmalı");
let checks = 0;
const near = (a, b, tol = 1e-9, msg = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${msg} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const nearAbs = (a, b, tol, msg = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${msg} ${a} ≠ ${b} (mutlak ${tol})`); checks++; };
const ok = (c, msg) => { assert(c, msg); checks++; };
const eq = (a, b, msg = "") => { assert.equal(a, b, msg + ` (${a} ≠ ${b})`); checks++; };
const R2D = 180 / Math.PI, TET = Math.acos(-1 / 3) * R2D;

/* ── Sabitler: açılan kaynaktaki Pauling değerleri ── */
const PAULING = { H: 2.20, B: 2.04, C: 2.55, N: 3.04, O: 3.44, F: 3.98, P: 2.19, S: 2.58, Cl: 3.16, Br: 2.96, I: 2.66, Xe: 2.60 };
for (const e in PAULING) eq(K.EN[e], PAULING[e], "EN " + e);
const VAL = { H: 1, B: 3, C: 4, N: 5, O: 6, F: 7, P: 5, S: 6, Cl: 7, Br: 7, I: 7, Xe: 8 };
for (const e in VAL) eq(K.VALENCE[e], VAL[e], "değerlik " + e);
ok(Object.isFrozen(K.MOLECULES) && Object.isFrozen(K.MOLECULES[0]), "molekül listesi dondurulmuş");
near(TET, 109.47122063449069, 1e-14, "arccos(−1/3)");

/* ── Bağımsız yardımcılar ── */
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const ang = (a, b) => Math.acos(Math.max(-1, Math.min(1, dot(a, b) / Math.sqrt(dot(a, a) * dot(b, b))))) * R2D;
function E(P, R, p) { // R: her noktanın yarıçapı
  let s = 0;
  for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
    const d = Math.hypot(R[i] * P[i][0] - R[j] * P[j][0], R[i] * P[i][1] - R[j] * P[j][1], R[i] * P[i][2] - R[j] * P[j][2]);
    s += d ** -p;
  }
  return s;
}
const chordE = (list, p) => list.reduce((s, [deg, c]) => s + c * (2 * Math.sin(deg / R2D / 2)) ** -p, 0);
const IDEAL = { 2: [[180, 1]], 3: [[120, 3]], 4: [[TET, 6]], 5: [[90, 6], [120, 3], [180, 1]], 6: [[90, 12], [180, 3]] };
function golden(f, a, b, tol = 1e-12) {
  const g = (Math.sqrt(5) - 1) / 2; let c = b - g * (b - a), d = a + g * (b - a), fc = f(c), fd = f(d);
  while (b - a > tol) { if (fc < fd) { b = d; d = c; fd = fc; c = b - g * (b - a); fc = f(c); } else { a = c; c = d; fc = fd; d = a + g * (b - a); fd = f(d); } }
  return (a + b) / 2;
}
const unit = (v) => { const l = Math.hypot(...v); return v.map((x) => x / l); };

/* ── 1. Elektron bölgeleri ── */
for (const p of [1, 2, 3, 6, 12]) for (let n = 2; n <= 6; n++) {
  const r = K.domainLab({ n, p, seed: 1 });
  eq(r.angles.length, IDEAL[n].length, `açı grubu sayısı n=${n} p=${p}`);
  r.angles.forEach((a, i) => { nearAbs(a.angle, IDEAL[n][i][0], 2e-4, `açı n=${n} p=${p}`); eq(a.count, IDEAL[n][i][1], "çift sayısı"); });
  near(r.Eideal, chordE(IDEAL[n], p), 1e-12, "ideal enerji kirişlerden");
  near(r.best.E, chordE(IDEAL[n], p), 1e-9, `ölçülen enerji n=${n} p=${p}`);
  ok(r.best.E >= chordE(IDEAL[n], p) * (1 - 1e-13), "ideal altına inilmez");
  ok(r.agree >= 6, `başlangıçların çoğu aynı minimuma: ${r.agree}`);
  const tr = r.run.trace; for (let i = 1; i < tr.length; i++) ok(tr[i].E < tr[i - 1].E, "iz boyunca enerji azalır");
  near(tr[0].E, E(K.randomStart(n, 1), new Array(n).fill(1), p), 1e-12, "iz rastgele başlangıçtan başlar");
}
// Thomson problemi (p = 1) bilinen değerleri
for (const [n, e] of [[2, 0.5], [3, 1.732050808], [4, 3.674234614], [5, 6.474691495], [6, 9.985281374]]) near(K.domainLab({ n, p: 1 }).best.E, e, 1e-9, "Thomson " + n);
// gradyan: sonlu farkla, bağımsız enerjiyle (ρ < 1 çiftli düzende)
{
  const P = K.randomStart(5, 7), Kk = [1, 1, 0, 0, 0], p = 3, rho = 0.8, Rr = Kk.map((k) => (k ? rho : 1));
  const g = K.gradient(P, Kk, p, rho).G, h = 1e-6;
  for (let i = 0; i < 5; i++) for (let c = 0; c < 3; c++) {
    const Pp = P.map((v) => v.slice()), Pm = P.map((v) => v.slice()); Pp[i][c] += h; Pm[i][c] -= h;
    let fd = (E(Pp, Rr, p) - E(Pm, Rr, p)) / (2 * h);
    // kernel teğet bileşeni verir: sonlu fark gradyanının teğet izdüşümünü karşılaştır
    const full = [0, 1, 2].map((cc) => { const A = P.map((v) => v.slice()), B = P.map((v) => v.slice()); A[i][cc] += h; B[i][cc] -= h; return (E(A, Rr, p) - E(B, Rr, p)) / (2 * h); });
    fd = full[c] - dot(full, P[i]) * P[i][c];
    nearAbs(g[i][c], fd, 1e-6, "gradyan");
  }
  near(K.energy(P, Kk, p, rho), E(P, Rr, p), 1e-13, "enerji bağımsız hesapla");
}
// ideal köşeler yerel minimum: rastgele küçük sarsıntı enerjiyi düşürmez
for (let n = 2; n <= 6; n++) for (const p of [1, 6]) {
  const S = K.idealSites(n), e0 = E(S, S.map(() => 1), p);
  for (let t = 0; t < 20; t++) { const Q = S.map((v, i) => unit(v.map((x, c) => x + 1e-3 * Math.sin(17 * t + 5 * i + 3 * c)))); ok(E(Q, S.map(() => 1), p) >= e0 - 1e-12, `sarsıntı n=${n}`); }
}
for (const bad of [{ n: 1, p: 1 }, { n: 7, p: 1 }, { n: 4, p: 0 }]) { assert.throws(() => K.domainLab(bad)); checks++; }

/* ── 2. Ortaklanmamış çiftler ── */
// NH₃: C3v simetrisine indirgenmiş tek değişkenli arama (çift eksende, bağlar β açısında)
function nh3(p, rho) {
  const f = (b) => { const P = [[0, 1, 0]].concat([0, 1, 2].map((i) => [Math.sin(b) * Math.cos(2 * Math.PI * i / 3), -Math.cos(b), Math.sin(b) * Math.sin(2 * Math.PI * i / 3)])); return E(P, [rho, 1, 1, 1], p); };
  const b = golden(f, 0.2, Math.PI / 2 + 0.6), P = [0, 1, 2].map((i) => [Math.sin(b) * Math.cos(2 * Math.PI * i / 3), -Math.cos(b), Math.sin(b) * Math.sin(2 * Math.PI * i / 3)]);
  return { angle: ang(P[0], P[1]), E: f(b) };
}
// H₂O: C2v, bağlar xy düzleminde yarım açı a, çiftler yz düzleminde yarım açı c
function h2o(p, rho) {
  const f = (a, c) => E([[0, Math.cos(c), Math.sin(c)], [0, Math.cos(c), -Math.sin(c)], [Math.sin(a), -Math.cos(a), 0], [-Math.sin(a), -Math.cos(a), 0]], [rho, rho, 1, 1], p);
  let a = 0.95, c = 0.95;
  for (let k = 0; k < 40; k++) { a = golden((x) => f(x, c), 0.3, 1.5); c = golden((y) => f(a, y), 0.3, 1.5); }
  return { angle: 2 * a * R2D, E: f(a, c) };
}
for (const [p, rho] of [[3, 0.8], [1, 0.9], [2, 0.7], [6, 0.85], [3, 1]]) {
  const r = K.lonePairLab({ n: 4, k: 1, p, rho }), ref = nh3(p, rho);
  eq(r.bondAngles.length, 1, "NH₃ tek açı grubu"); eq(r.bondAngles[0].count, 3);
  nearAbs(r.bondAngles[0].angle, ref.angle, 1e-3, `NH₃ açısı p=${p} ρ=${rho}`); near(r.best.E, ref.E, 1e-9, "NH₃ enerji");
  const w = K.lonePairLab({ n: 4, k: 2, p, rho }), rw = h2o(p, rho);
  nearAbs(w.bondAngles[0].angle, rw.angle, 2e-3, `H₂O açısı p=${p} ρ=${rho}`); near(w.best.E, rw.E, 1e-9, "H₂O enerji");
  if (rho < 1) ok(w.bondAngles[0].angle < r.bondAngles[0].angle && r.bondAngles[0].angle < TET, "sıkışma: H₂O < NH₃ < 109,47°");
  else { nearAbs(r.bondAngles[0].angle, TET, 1e-4, "ρ = 1: ideal"); nearAbs(w.bondAngles[0].angle, TET, 1e-4); }
}
// varsayılan: NH₃ 106,69° (deney 106,67°), H₂O 104,57° (deney 104,4776°)
nearAbs(K.lonePairLab({ n: 4, k: 1, p: 3, rho: 0.8 }).bondAngles[0].angle, 106.6947, 1e-3, "varsayılan NH₃");
nearAbs(K.lonePairLab({ n: 4, k: 2, p: 3, rho: 0.8 }).bondAngles[0].angle, 104.5727, 1e-3, "varsayılan H₂O");
// ρ küçüldükçe NH₃ açısı azalır
{ let prev = 200; for (let i = 0; i <= 20; i++) { const a = K.lonePairLab({ n: 4, k: 1, p: 3, rho: +(1 - i * 0.02).toFixed(2) }).bondAngles[0].angle; ok(a < prev + 1e-9, "tekdüze"); prev = a; } }
// yerleşimler: katı köşe enerjileri bağımsız kurulumla
const s3 = Math.sqrt(3) / 2, TBP = { ax: [[0, 0, 1], [0, 0, -1]], eq: [[1, 0, 0], [-0.5, s3, 0], [-0.5, -s3, 0]] };
function tbpE(lpAx, lpEq, p, rho) { // lpAx eksenel, lpEq ekvatoral çift sayısı
  const P = [], R = [];
  TBP.ax.forEach((v, i) => { P.push(v); R.push(i < lpAx ? rho : 1); });
  TBP.eq.forEach((v, i) => { P.push(v); R.push(i < lpEq ? rho : 1); });
  return E(P, R, p);
}
for (const [p, rho] of [[3, 0.8], [1, 0.9], [6, 0.7], [12, 0.95], [2, 0.6]]) {
  const sf4 = K.lonePairLab({ n: 5, k: 1, p, rho }), find = (r, lab) => r.placements.find((x) => x.label === lab);
  eq(sf4.placements.length, 2, "SF₄ iki yerleşim");
  near(find(sf4, "eksenel").rigidE, tbpE(1, 0, p, rho), 1e-12, "SF₄ eksenel katı"); near(find(sf4, "ekvatoral").rigidE, tbpE(0, 1, p, rho), 1e-12, "SF₄ ekvatoral katı");
  ok(tbpE(0, 1, p, rho) < tbpE(1, 0, p, rho), "ekvatoral çift daha düşük (katı)");
  ok(find(sf4, "ekvatoral").relaxedE < find(sf4, "eksenel").relaxedE, "ekvatoral çift daha düşük (gevşemiş)");
  const cl = K.lonePairLab({ n: 5, k: 2, p, rho });
  eq(cl.placements.length, 3, "ClF₃ üç yerleşim");
  near(find(cl, "2 eksenel").rigidE, tbpE(2, 0, p, rho), 1e-12); near(find(cl, "eksenel + ekvatoral").rigidE, tbpE(1, 1, p, rho), 1e-12); near(find(cl, "2 ekvatoral").rigidE, tbpE(0, 2, p, rho), 1e-12);
  if (p === 2 && rho === 0.6) ok(tbpE(2, 0, p, rho) < tbpE(0, 2, p, rho) && find(cl, "2 ekvatoral").relaxedE < find(cl, "2 eksenel").relaxedE, "ρ = 0,6, p = 2: katıda iki eksenel düşük, gevşeyince iki ekvatoral kazanır");
  else ok(tbpE(0, 2, p, rho) < Math.min(tbpE(2, 0, p, rho), tbpE(1, 1, p, rho)), "ClF₃ katıda iki ekvatoral en düşük");
  ok(cl.vseprOk, "ClF₃ gevşemiş en düşük T");
  const xe = K.lonePairLab({ n: 5, k: 3, p, rho });
  ok(tbpE(0, 3, p, rho) < Math.min(tbpE(2, 1, p, rho), tbpE(1, 2, p, rho)), "XeF₂ katıda üç ekvatoral"); ok(xe.vseprOk, "XeF₂ doğrusal");
  nearAbs(xe.bondAngles[0].angle, 180, 1e-4, "XeF₂ 180°");
  const oct = [[0, 0, 1], [0, 0, -1], [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0]];
  const tr = E(oct, [rho, rho, 1, 1, 1, 1], p), cis = E(oct, [rho, 1, rho, 1, 1, 1], p);
  const x4 = K.lonePairLab({ n: 6, k: 2, p, rho });
  near(x4.placements.find((x) => x.label.startsWith("trans")).rigidE, tr, 1e-12); near(x4.placements.find((x) => x.label.startsWith("cis")).rigidE, cis, 1e-12);
  ok(tr < cis, "XeF₄ trans katıda düşük");
  if (p === 12) ok(!x4.vseprOk && x4.placements.find((x) => x.label.startsWith("cis")).relaxedE < x4.placements.find((x) => x.label.startsWith("trans")).relaxedE, "p = 12, ρ = 0,95: gevşemiş cis daha düşük, sayfa uyarır");
  else { ok(x4.vseprOk, "XeF₄ kare düzlem en düşük"); eq(x4.bondAngles.length, 2); nearAbs(x4.bondAngles[0].angle, 90, 1e-4); nearAbs(x4.bondAngles[1].angle, 180, 1e-4); }
}
// ρ = 1'de bütün yerleşimler eşit; çift = bağ
for (const [n, k] of [[5, 1], [5, 2], [6, 2]]) { const r = K.lonePairLab({ n, k, p: 3, rho: 1 }); const e0 = r.placements[0].rigidE; r.placements.forEach((x) => near(x.rigidE, e0, 1e-12, "ρ = 1 eşit")); }
// en düşük düzen gerçekten yerel minimum (bağımsız enerjiyle sarsıntı)
for (const [n, k] of [[4, 1], [4, 2], [5, 1], [5, 2], [6, 1], [6, 2], [3, 1]]) {
  const r = K.lonePairLab({ n, k, p: 3, rho: 0.8 }), Rr = r.K.map((x) => (x ? 0.8 : 1)), e0 = E(r.best.P, Rr, 3);
  near(r.best.E, e0, 1e-12);
  for (let t = 0; t < 30; t++) { const Q = r.best.P.map((v, i) => unit(v.map((x, c) => x + 2e-3 * Math.cos(11 * t + 7 * i + 5 * c)))); ok(E(Q, Rr, 3) >= e0 - 1e-11, `sarsıntı ${n}/${k}`); }
  for (const pl of r.placements) ok(pl.relaxedE >= r.best.E - 1e-12, "en düşük gerçekten en düşük");
}
// varsayılan SF₄: 87,78° (4), 122,73°, 170,73°; ClF₃ T; BrF₅ kare piramit
{
  const s = K.lonePairLab({ n: 5, k: 1, p: 3, rho: 0.8 });
  eq(s.bondAngles.map((a) => a.count).join(","), "4,1,1"); nearAbs(s.bondAngles[0].angle, 87.781, 2e-3); nearAbs(s.bondAngles[1].angle, 122.733, 2e-3); nearAbs(s.bondAngles[2].angle, 170.732, 2e-3);
  ok(s.vseprOk, "SF₄ tahterevalli");
  const c = K.lonePairLab({ n: 5, k: 2, p: 3, rho: 0.8 }); ok(c.vseprOk, "ClF₃ T"); eq(c.bondAngles.map((a) => a.count).join(","), "2,1");
  const b = K.lonePairLab({ n: 6, k: 1, p: 3, rho: 0.8 }); ok(b.vseprOk); eq(b.bondAngles.length, 3);
  // modelin bozulduğu yer: p = 1, ρ = 0,7'de ClF₃ düzlem üçgene kayar
  const bad = K.lonePairLab({ n: 5, k: 2, p: 1, rho: 0.7 }); ok(!bad.vseprOk, "p = 1, ρ = 0,7: ClF₃ VSEPR dışı"); nearAbs(bad.bondAngles[0].angle, 120, 1e-3, "düzlem üçgen");
}
for (const bad of [{ n: 4, k: 3, p: 3, rho: 0.8 }, { n: 2, k: 1, p: 3, rho: 0.8 }, { n: 4, k: 1, p: 3, rho: 1.2 }, { n: 6, k: 3, p: 3, rho: 0.8 }]) { assert.throws(() => K.lonePairLab(bad)); checks++; }

/* ── 3. Lewis: elle yazılmış tablo ── */
// id: [V, m, l, şekil, rezonans, Σ|BY|, merkez BY, merkez elektron]
const LEWIS = {
  CO2: [16, 2, 0, "doğrusal", 1, 0, 0, 8], H2O: [8, 2, 2, "açısal (bükük)", 1, 0, 0, 8], NH3: [8, 3, 1, "üçgen piramit", 1, 0, 0, 8],
  CH4: [8, 4, 0, "dörtyüzlü", 1, 0, 0, 8], BF3: [24, 3, 0, "düzlem üçgen", 1, 0, 0, 6], SF4: [34, 4, 1, "tahterevalli", 1, 0, 0, 10],
  ClF3: [28, 3, 2, "T biçimli", 1, 0, 0, 10], XeF4: [36, 4, 2, "kare düzlem", 1, 0, 0, 12], SF6: [48, 6, 0, "sekizyüzlü", 1, 0, 0, 12],
  PCl5: [40, 5, 0, "üçgen çift piramit", 1, 0, 0, 10], O3: [18, 2, 1, "açısal (bükük)", 2, 2, 1, 8], SO2: [18, 2, 1, "açısal (bükük)", 1, 0, 0, 10],
  CO3: [24, 3, 0, "düzlem üçgen", 3, 2, 0, 8], NO3: [24, 3, 0, "düzlem üçgen", 3, 3, 1, 8], NH4: [8, 4, 0, "dörtyüzlü", 1, 1, 1, 8],
  SO4: [32, 4, 0, "dörtyüzlü", 6, 2, 0, 12], XeF2: [22, 2, 3, "doğrusal", 1, 0, 0, 10], I3: [22, 2, 3, "doğrusal", 1, 1, -1, 10],
  BrF5: [42, 5, 1, "kare piramit", 1, 0, 0, 12], HCN: [10, 2, 0, "doğrusal", 1, 0, 0, 8], CH2O: [12, 3, 0, "düzlem üçgen", 1, 0, 0, 8],
  CCl4: [32, 4, 0, "dörtyüzlü", 1, 0, 0, 8], CHCl3: [26, 4, 0, "dörtyüzlü", 1, 0, 0, 8], CH2Cl2: [20, 4, 0, "dörtyüzlü", 1, 0, 0, 8], CH3Cl: [14, 4, 0, "dörtyüzlü", 1, 0, 0, 8],
};
const AXE = { "2,0": "AX₂", "2,1": "AX₂E", "2,2": "AX₂E₂", "2,3": "AX₂E₃", "3,0": "AX₃", "3,1": "AX₃E", "3,2": "AX₃E₂", "4,0": "AX₄", "4,1": "AX₄E", "4,2": "AX₄E₂", "5,0": "AX₅", "5,1": "AX₅E", "6,0": "AX₆" };
eq(K.MOLECULES.length, Object.keys(LEWIS).length, "molekül sayısı");
for (const mol of K.MOLECULES) {
  const t = LEWIS[mol.id], L = K.lewis(mol);
  assert(t, "tabloda yok: " + mol.id);
  eq(L.V, t[0], mol.id + " V"); eq(L.m, t[1], mol.id + " m"); eq(L.l, t[2], mol.id + " l"); eq(L.shape.shape, t[3], mol.id + " şekil");
  eq(L.resonance, t[4], mol.id + " rezonans"); eq(L.best.sumAbs, t[5], mol.id + " Σ|BY|"); eq(L.best.fc.center, t[6], mol.id + " merkez BY"); eq(L.best.centralE, t[7], mol.id + " merkez e");
  eq(L.shape.axe, AXE[t[1] + "," + t[2]], mol.id + " AXE");
  for (const s of L.structures) {
    eq(s.fc.center + s.fc.ligands.reduce((a, b) => a + b, 0), mol.charge, mol.id + " Σ BY = yük");
    // elektron sayımı: bağlar + uç çiftler + merkez çiftleri = V
    eq(2 * s.bo.reduce((a, b) => a + b, 0) + s.termLP.reduce((a, b) => a + b, 0) + 2 * s.cLP, t[0], mol.id + " elektron korunumu");
    mol.ligands.forEach((e, i) => eq(2 * s.bo[i] + s.termLP[i], e === "H" ? 2 : 8, mol.id + " uç okteti"));
  }
}
// rezonans yapıları birbirinin permütasyonu: O₃'te 1-2 ve 2-1
assert.deepEqual([...K.lewis(K.byId("O3")).structures.map((s) => s.bo.join(""))].sort(), ["12", "21"]); checks++;
// oktet sınırı (genişlemiş oktet kapalı)
for (const id of ["SF6", "PCl5", "XeF2", "XeF4", "SF4", "ClF3", "BrF5", "I3"]) ok(K.lewis(K.byId(id), { expand: false }).error, id + " oktetle yazılamaz");
{ const s = K.lewis(K.byId("SO2"), { expand: false }); eq(s.resonance, 2); eq(s.best.centralE, 8); eq(s.best.fc.center, 1); eq(s.shape.axe, "AX₂E"); }
{ const s = K.lewis(K.byId("SO4"), { expand: false }); eq(s.resonance, 1); eq(s.best.sumAbs, 6); eq(s.best.fc.center, 2); }
{ const s = K.lewis(K.byId("CO2"), { expand: false }); eq(s.best.bo.join(""), "22"); }
eq(K.lewis(K.byId("SF6"), { expand: false }).minCentralE, 12, "SF₆ 12 elektron ister");

/* ── 4. Dipol: elle kurulan vektörler ── */
const dEN = (a, b) => PAULING[a] - PAULING[b];
for (const th of [60, 90, 104.5, 120, 150, 179.9, 180]) {
  near(K.dipole(K.byId("H2O"), { angle: th }).mag, 2 * Math.abs(dEN("H", "O")) * Math.cos(th / R2D / 2), 1e-12, "H₂O " + th);
  const co2 = K.dipole(K.byId("CO2"), { angle: th }); near(co2.mag, 2 * 0.89 * Math.cos(th / R2D / 2), 1e-9, "CO₂ " + th);
  ok(co2.polar === (th < 180), "CO₂ kutupluluk " + th);
}
// NH₃ ve BF₃: bağları bağımsız kur (birinci bağı eksen etrafında 120° döndür, β'yı ikiye bölmeyle bul)
function pyramid(theta) {
  let lo = 0, hi = Math.PI / 2;
  const bonds = (b) => [0, 1, 2].map((i) => { const a = (2 * Math.PI * i) / 3; return [Math.sin(b) * Math.cos(a), Math.sin(b) * Math.sin(a), -Math.cos(b)]; });
  for (let k = 0; k < 200; k++) { const mid = (lo + hi) / 2; if (ang(...bonds(mid).slice(0, 2)) < theta) lo = mid; else hi = mid; }
  return bonds((lo + hi) / 2);
}
for (const th of [60, 90, 106.7, 115, 120]) {
  const B = pyramid(th), sum = (d) => Math.hypot(...[0, 1, 2].map((c) => B.reduce((s, v) => s + v[c] * d, 0)));
  near(K.dipole(K.byId("NH3"), { angle: th }).mag, sum(dEN("H", "N")), 1e-9, "NH₃ " + th);
  nearAbs(K.dipole(K.byId("BF3"), { angle: th }).mag, sum(dEN("F", "B")), 1e-9, "BF₃ " + th);
}
ok(!K.dipole(K.byId("BF3"), { angle: 120 }).polar && K.dipole(K.byId("BF3"), { angle: 119 }).polar, "BF₃ yalnız düzlemde kutupsuz");
// klorometanlar: dörtyüzlü köşelerde elle toplam
{
  const T = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map(unit);
  for (const [id, nCl] of [["CH3Cl", 1], ["CH2Cl2", 2], ["CHCl3", 3], ["CCl4", 4], ["CH4", 0]]) {
    const v = [0, 1, 2].map((c) => T.reduce((s, u, i) => s + u[c] * (i < nCl ? dEN("Cl", "C") : dEN("H", "C")), 0));
    near(K.dipole(K.byId(id)).mag + 1, Math.hypot(...v) + 1, 1e-7, id);
  }
  near(K.dipole(K.byId("CHCl3")).mag, 0.96, 1e-7); near(K.dipole(K.byId("CH3Cl")).mag, 0.96, 1e-7); near(K.dipole(K.byId("CH2Cl2")).mag, 0.96 * 2 / Math.sqrt(3), 1e-7);
}
for (const id of ["CO2", "CH4", "BF3", "CCl4", "XeF4", "SF6", "PCl5", "XeF2", "O3"]) { const m = K.byId(id), a = K.adjustable(m) ? m.angle.values[0] : null; ok(!K.dipole(m, { angle: a }).polar, id + " kutupsuz (model)"); }
for (const id of ["H2O", "NH3", "SO2", "SF4", "ClF3", "CHCl3"]) { const m = K.byId(id), a = K.adjustable(m) ? m.angle.values[0] : null; ok(K.dipole(m, { angle: a }).polar, id + " kutuplu (model)"); }
ok(K.dipole(K.byId("O3"), { angle: 116.8 }).scale === 0 && K.byId("O3").dipole.values === 0.53, "O₃: model sıfır, deney 0,53 D");
// SF₄ toplamı simetri ekseninde (bağ toplamının tersine, çifte doğru değil: F'ler daha elektronegatif)
{ const d = K.dipole(K.byId("SF4")), s = [0, 1, 2].map((c) => d.bonds.reduce((a, b) => a + b.dir[c], 0)); near(Math.abs(dot(unit(d.net), unit(s))), 1, 1e-6, "SF₄ net eksende"); }
// kaynak değerleri (CCCBDB'den açıldı)
const SRC = { H2O: [104.4776, 1.857], NH3: [106.67, 1.476], SO2: [119.5, 1.633], O3: [116.8, 0.53] };
for (const id in SRC) { eq(K.byId(id).angle.values[0], SRC[id][0]); eq(K.byId(id).dipole.values, SRC[id][1]); ok(K.byId(id).angle.src.includes("cccbdb.nist.gov"), "kaynak bağlantısı"); }
assert.deepEqual([...K.byId("SF4").angle.values], [87.81, 101.55, 173.07]); checks++;
for (const [id, d] of [["CHCl3", 1.04], ["CH2Cl2", 1.62], ["CH3Cl", 1.87], ["ClF3", 0.6], ["SF4", 0.632], ["CCl4", 0]]) eq(K.byId(id).dipole.values, d, id + " dipol");
console.log(`G ${SLUG}: ${checks.toLocaleString("tr-TR")} bağımsız kiriş enerjisi, simetri indirgemesi, Lewis tablosu ve dipol vektörü kontrolü PASS`);

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
      const page = await ctx.newPage(); page.setDefaultTimeout(8000); const errors = [];
      page.on("pageerror", (e) => errors.push(e.message)); page.on("console", (m) => { if (m.type() === "error" && !/404|Failed to load resource/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`); await page.waitForTimeout(400);
      const click = (id) => page.locator("#" + id).click(), read = async (id) => (await page.locator("#" + id).textContent()).trim(), val = (id) => page.locator("#" + id).inputValue();
      const set = (id, v) => page.locator("#" + id).evaluate((e, v) => { if (e.type === "checkbox") { e.checked = v; e.dispatchEvent(new Event("change", { bubbles: true })); } else { e.value = v; e.dispatchEvent(new Event(e.tagName === "SELECT" ? "change" : "input", { bubbles: true })); } }, v);
      const has = async (id, t) => { const s = await read(id); assert(s.includes(t), `${id}: "${s}" içinde "${t}" yok`); checks++; };
      const noOverflow = async (w) => eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "yatay taşma: " + w);
      const clean = async (name) => { const t = await page.locator("#panel-" + name).innerText(); ok(!/NaN|undefined|Infinity|null/.test(t), name + " panelinde bozuk sayı: " + (t.match(/.{0,30}(NaN|undefined|Infinity|null).{0,30}/) || [""])[0]); };
      const sweep = async (name, ids) => { for (const id of ids) { const r = await page.locator("#" + id).evaluate((e) => [e.min, e.max]); for (const v of r) { await set(id, v); await clean(name); } } };
      eq(await page.evaluate(() => [...document.querySelectorAll("input,select")].every((e) => document.querySelector(`label[for="${e.id}"]`) || e.closest("label"))), true, "etiketsiz denetim");
      eq(await page.evaluate(() => [...document.querySelectorAll("[role=tabpanel] canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), true, "tuval rolü");
      eq(await page.evaluate(() => [...document.querySelectorAll("canvas.ms-canvas")].every((c) => c.tabIndex === 0)), true, "3B tuval klavyeyle odaklanır");
      eq(await page.evaluate(() => Object.isFrozen(VseprLab) && !Object.getOwnPropertyDescriptor(window, "VseprLab").writable), true, "çekirdek salt okunur");
      // 1 · bölgeler (varsayılan: 4 bölge, p = 1)
      await has("d1Rows", "109,4712° (6)"); await has("d1Rows", "0,0000°"); await has("d1Name", "dörtyüzlü"); await has("d1E", "3,674235 / 3,674235"); await has("d1Agree", "8 / 8"); await has("d1Status", "dörtyüzlü düzenine yerleşti"); await has("d1Formula", "109,4712°");
      await set("d1N", 5); await has("d1Rows", "90,0000° (6)"); await has("d1Rows", "120,0000° (3)"); await has("d1Rows", "180,0000° (1)"); await has("d1Formula", "olanaksızdır"); await has("d1E", "6,474691");
      await set("d1N", 6); await has("d1Rows", "90,0000° (12)"); await set("d1N", 2); await has("d1Rows", "180,0000° (1)"); await set("d1N", 3); await has("d1Rows", "120,0000° (3)");
      await set("d1P", 12); await has("d1Rows", "120,0000° (3)"); ok(!(await read("d1Status")).startsWith("Uyarı"), "p = 12 uyarısız");
      await click("d1New"); await has("d1Seed", "tohumu: 2"); await click("d1Replay");
      await sweep("domains", ["d1N", "d1P"]); await click("d1Reset"); eq(await val("d1N"), "4"); eq(await val("d1P"), "1"); await has("d1Seed", "tohumu: 1"); await has("d1Rows", "109,4712° (6)"); await clean("domains"); await noOverflow("bölgeler");
      await set("d1N", 6); await page.locator("h1").click(); await page.keyboard.press("r"); eq(await val("d1N"), "4", "R sıfırlar");
      await page.locator("h1").click(); await page.keyboard.press("Space"); checks++;
      // tuvali ok tuşuyla döndür: görüntü değişir
      { const c = page.locator("#c1Model"); await click("d1Ghost"); await page.waitForTimeout(2500); const a = await c.evaluate((e) => e.toDataURL()); await c.focus(); await page.keyboard.press("ArrowRight"); await page.waitForTimeout(100); ok((await c.evaluate((e) => e.toDataURL())) !== a, "ok tuşu döndürür"); await click("d1Ghost"); }
      // 2 · ortaklanmamış çiftler (varsayılan NH₃, p = 3, ρ = 0,80)
      await click("tab-lone");
      await has("l2Axe", "AX₃E"); await has("l2Shape", "üçgen piramit"); await has("l2Rows", "106,69°"); await has("l2Rows", "109,47°"); await has("l2Rows", "106,67° · CCCBDB"); await has("l2Rows", "+0,02°"); await has("l2Status", "106,69°"); await has("l2Status", "fark +0,02°");
      await click("l2PreH2O"); await has("l2Rows", "104,57°"); await has("l2Rows", "104,48° · CCCBDB"); await has("l2Rows", "+0,10°"); await has("l2Lp", "çift–çift");
      await click("l2PreSF4"); await has("l2Shape", "tahterevalli"); await has("l2Rows", "87,78°"); await has("l2Rows", "122,73°"); await has("l2Rows", "101,55°"); await has("l2Place", "ekvatoral · VSEPR"); await has("l2Status", "ekvatoral) en düşük"); await has("l2Status", "yanlış yöne açıyor: ideal 120°, model 122,73°, deney 101,55°");
      await click("l2PreClF3"); await has("l2Shape", "T biçimli"); await has("l2Place", "kendiliğinden en düşük düzene kaydı");
      await click("l2PreXeF4"); await has("l2Shape", "kare düzlem"); await has("l2Rows", "90,00°"); await has("l2Rows", "180,00°"); await has("l2Place", "trans");
      await click("l2PreXeF2"); await has("l2Shape", "doğrusal"); await click("l2PreBrF5"); await has("l2Shape", "kare piramit"); await click("l2PreSO2"); await has("l2Rows", "119,50° · CCCBDB"); await has("l2Status", "çoklu bağ");
      await click("l2PreClF3"); await set("l2P", 1); await set("l2Rho", 0.7); await has("l2Status", "Uyarı"); eq(await page.locator("#l2Status").evaluate((e) => e.classList.contains("is-warn")), true);
      await set("l2Rho", 1); await set("l2P", 3); await has("l2Status", "ayırt edilemez");
      await set("l2N", 2); eq(await val("l2K"), "0", "n = 2'de çift yok"); await has("l2Axe", "AX₂"); await set("l2N", 3); eq(await page.locator("#l2K").getAttribute("max"), "1");
      await sweep("lone", ["l2N", "l2K", "l2Rho", "l2P"]);
      await click("l2Reset"); eq(await val("l2N"), "4"); eq(await val("l2K"), "1"); eq(await val("l2Rho"), "0.8"); eq(await val("l2P"), "3"); await has("l2Rows", "106,69°"); await clean("lone"); await noOverflow("çiftler");
      // 3 · Lewis
      await click("tab-lewis");
      eq(await val("l3Mol"), "H2O"); await has("l3V", "8 e⁻"); await has("l3Axe", "AX₂E₂"); await has("l3Shape", "açısal (bükük)"); await has("l3Angle", "104,6° / 104,48°");
      await set("l3Mol", "CO3"); await has("l3V", "24 e⁻"); await has("l3VSub", "2 (eksi yük)"); await has("l3Status", "3 yapı"); await has("l3Next", "1/3"); await click("l3Next"); await has("l3Next", "2/3"); await has("l3Fc", "−1"); await has("l3Fc", "Toplam (= yük)");
      { const t = await read("l3Fc"); ok(/Toplam \(= yük\)\s*−2/.test(t), "CO₃²⁻ toplam −2: " + t.slice(-30)); }
      await set("l3Mol", "SF4"); await has("l3Shape", "tahterevalli"); await has("l3Status", "genişlemiş oktet"); await has("l3Angle", "87,81°");
      await set("l3Mol", "BF3"); await has("l3Status", "elektron eksik kalır");
      await set("l3Mol", "SO2"); await has("l3Status", "2 çift bağ"); await set("l3Expand", false); await has("l3Status", "2 yapı"); await has("l3Next", "1/2");
      await set("l3Mol", "SF6"); await has("l3Status", "oktet kuralıyla yazılamaz"); await has("l3Status", "12 elektron"); eq(await page.locator("#l3Next").isDisabled(), true);
      await set("l3Expand", true); await has("l3Shape", "sekizyüzlü");
      for (const id of await page.locator("#l3Mol option").evaluateAll((os) => os.map((o) => o.value))) { await set("l3Mol", id); await clean("lewis"); for (const e of [false, true]) { await set("l3Expand", e); await clean("lewis"); } }
      await click("l3Reset"); eq(await val("l3Mol"), "H2O"); eq(await page.locator("#l3Expand").isChecked(), true); await noOverflow("lewis");
      // 4 · kutupluluk
      await click("tab-polar");
      eq(await val("l4Mol"), "H2O"); eq(await val("l4Ang"), "104.5"); await has("l4Net", "1,5183"); await has("l4Theory", "1,5183"); await has("l4ExpD", "1,857 D"); await has("l4Status", "kutuplu");
      await set("l4Ang", 180); await has("l4Net", "0,0000"); await has("l4Status", "götürür"); await click("l4Vsepr"); eq(await val("l4Ang"), "104.6"); await click("l4Exp"); eq(await val("l4Ang"), "104.5");
      await set("l4Mol", "CO2"); eq(await val("l4Ang"), "180"); await has("l4Status", "kutupsuz"); await set("l4Ang", 150); await has("l4Status", "Gerçek CO₂ doğrusaldır");
      await set("l4Mol", "NH3"); eq(await val("l4Ang"), "106.7"); await has("l4Net", "0,9488");
      await set("l4Mol", "BF3"); eq(await page.locator("#l4Ang").getAttribute("max"), "120"); await has("l4Net", "0,0000");
      await set("l4Mol", "CHCl3"); eq(await page.locator("#l4AngField").isHidden(), true); await has("l4Net", "0,9600"); await has("l4Theory", "0,9600"); await has("l4Status", "sıralamayı tutturamıyor"); await has("l4ExpD", "1,040 D");
      await set("l4Mol", "CCl4"); await has("l4Net", "0,0000"); await has("l4Status", "deney de 0 D"); await has("l4TheorySub", "k = 4: sıfır"); await set("l4Mol", "CH4"); await has("l4TheorySub", "k = 0: sıfır");
      await set("l4Mol", "O3"); await has("l4Status", "başarısızlığı"); await has("l4ExpD", "0,530 D");
      await set("l4Mol", "SF4"); await has("l4Theory", "—");
      await has("l4All", "uyuşmuyor"); eq((await page.locator("#l4All tr").count()), 17, "özet tablo satırları");
      for (const id of await page.locator("#l4Mol option").evaluateAll((os) => os.map((o) => o.value))) { await set("l4Mol", id); await clean("polar"); if (!(await page.locator("#l4AngField").isHidden())) await sweep("polar", ["l4Ang"]); }
      await click("l4Reset"); eq(await val("l4Mol"), "H2O"); eq(await val("l4Ang"), "104.5"); await noOverflow("kutupluluk");
      // sekme klavyesi
      await page.locator("#tab-polar").focus(); await page.keyboard.press("Home"); eq(await page.locator("#tab-domains").getAttribute("aria-selected"), "true");
      await page.keyboard.press("ArrowLeft"); eq(await page.locator("#tab-polar").getAttribute("aria-selected"), "true"); await page.keyboard.press("End"); eq(await page.locator("#tab-polar").getAttribute("aria-selected"), "true");
      await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-domains").getAttribute("aria-selected"), "true");
      // tema değişince bütün tuvaller çizilir, taşma yok
      await page.evaluate(() => { document.documentElement.dataset.theme = document.documentElement.dataset.theme === "light" ? "dark" : "light"; }); await page.waitForTimeout(200);
      for (const t of ["domains", "lone", "lewis", "polar"]) { await click("tab-" + t); await page.waitForTimeout(150); eq(await page.evaluate((n) => [...document.querySelectorAll("#panel-" + n + " canvas")].every((c) => c.width > 100 && c.height > 60), t), true, "tuval boyutu " + t); await clean(t); await noOverflow(t); }
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
