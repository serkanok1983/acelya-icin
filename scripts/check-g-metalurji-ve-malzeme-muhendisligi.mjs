// Kalıcı denetim: metalurji-ve-malzeme-muhendisligi.html
// Çekirdek (window.MalzemeLab) sayfanın kendi formüllerini yinelemeyen referanslarla sınanır:
// kaldıraç kuralı için kütle dengeleri ve bağımsız sınır enterpolasyonu, Considère için kaba kuvvet tarama,
// integraller için Simpson kuralı ve kapalı biçim, erf için sayısal karesel integral, sonlu farklar için
// analitik erf profili ve karbon alımının kapalı biçimi. `--browser` ile gerçek arayüz denetimleri eklenir.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';

const SLUG = 'metalurji-ve-malzeme-muhendisligi';
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.MalzemeLab;
let checks = 0;
const ok = (cond, msg) => { assert(cond, msg); checks++; };
const near = (a, b, tol = 1e-9, msg = '') => { assert(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${msg} ${a} ≠ ${b}`); checks++; };
const eq = (a, b, msg) => { assert.equal(a, b, `${msg || 'eşitlik'}: ${a} ≠ ${b}`); checks++; };
const simpson = (f, a, b, n = 2000) => { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return (h * s) / 3; };

// ── 1 · Fe–Fe₃C: değişmez noktalar (açılan kaynaklar: BYU ChE 378 Ders 20 / Callister 10e; Wikipedia) ──
const F = K.FE;
for (const [k, v] of Object.entries({ T1: 727, C1: 0.76, TE: 1148, CE: 4.30, CG: 2.14, CA: 0.022, CM: 6.70, TA3: 912, TD: 1394, TM: 1538, TP: 1493, CP: 0.16 })) eq(F[k], v, k);
ok(Object.isFrozen(K) && Object.isFrozen(F), 'çekirdek dondurulmuş');
// Bağımsız sınır tablosu: sıcaklığa göre parçalı doğrusal enterpolasyon (sayfanın lerp'ini kullanmaz)
const poly = (pts) => (T) => { for (let i = 1; i < pts.length; i++) { const [t0, c0] = pts[i - 1], [t1, c1] = pts[i]; if (T >= Math.min(t0, t1) && T <= Math.max(t0, t1)) return c0 + ((c1 - c0) * (T - t0)) / (t1 - t0); } return NaN; };
const B = {
  alpha: poly([[0, 0.005], [727, 0.022], [912, 0]]), a3: poly([[727, 0.76], [912, 0]]), acm: poly([[727, 0.76], [1148, 2.14]]),
  sol: poly([[1148, 2.14], [1493, 0.16]]), liq: poly([[1148, 4.30], [1538, 0]]), liqR: poly([[1148, 4.30], [1227, 6.70]]),
};
const expectField = (C, T) => { // bağımsız alan sınıflandırması
  const TL = C <= 4.3 ? 1538 - (390 * C) / 4.3 : 1148 + (79 * (C - 4.3)) / 2.4;
  if (T === 727 && C > 0.022 && C < 6.7) return 'otektoid';
  if (T === 1148 && C > 2.14 && C < 6.7) return 'otektik';
  if (T >= TL) return 'L';
  if (C === 6.7) return 'Fe3C';
  if (T < 727) return C <= B.alpha(T) ? 'α' : 'α+Fe3C';
  if (T < 1148) { if (T < 912) { if (C <= B.alpha(T)) return 'α'; if (C < B.a3(T)) return 'α+γ'; } return C <= B.acm(T) ? 'γ' : 'γ+Fe3C'; }
  if (T > 1493 || (T > 1394 && C < (0.16 * (T - 1394)) / 99)) return 'peritektik';
  if (C <= B.sol(T)) return 'γ';
  return C < 4.3 ? 'γ+L' : 'L+Fe3C';
};
const endRef = { 'α+Fe3C': (T) => [B.alpha(T), 6.7], 'α+γ': (T) => [B.alpha(T), B.a3(T)], 'γ+Fe3C': (T) => [B.acm(T), 6.7], 'γ+L': (T) => [B.sol(T), B.liq(T)], 'L+Fe3C': (T) => [B.liqR(T), 6.7] };
const seen = new Set();
for (let ci = 0; ci <= 670; ci += 3) for (let T = 400; T <= 1600; T += 7) {
  const C = ci / 100, p = K.phaseAt(C, T), code = expectField(C, T);
  eq(p.code, code, `alan C=${C} T=${T}`); seen.add(code);
  if (p.tie && !p.invariant) {
    const [a, b] = p.phases, ref = endRef[code](T);
    near(a.c, ref[0], 1e-12, 'uç 1'); near(b.c, ref[1], 1e-12, 'uç 2');
    near(a.w + b.w, 1, 1e-12, 'ΣW'); near(a.w * a.c + b.w * b.c, C, 1e-12, 'kütle dengesi'); near(p.balance, C, 1e-12);
    ok(a.w > 0 && a.w < 1 && b.w > 0 && b.w < 1 && a.c < C && C < b.c, 'oranlar 0–1 arasında, nokta uçların arasında');
  } else if (p.single) { eq(p.phases.length, 1); eq(p.phases[0].w, 1); eq(p.phases[0].c, C); }
}
for (const c of ['L', 'α', 'γ', 'α+γ', 'α+Fe3C', 'γ+Fe3C', 'γ+L', 'L+Fe3C', 'peritektik']) ok(seen.has(c), 'alan görüldü: ' + c);
// Değişmez sıcaklıklar: üç faz, oran tanımsız
{ const e = K.phaseAt(0.4, 727); eq(e.code, 'otektoid'); eq(e.invariant, true); eq(e.phases.length, 3); eq(e.phases[0].w, null); eq(e.balance, null);
  const u = K.phaseAt(3, 1148); eq(u.code, 'otektik'); eq(u.phases.map((q) => q.c).join(), '2.14,4.3,6.7');
  eq(K.phaseAt(0.02, 727).code, 'α'); eq(K.phaseAt(2.14, 1148).code, 'γ'); eq(K.phaseAt(6.7, 800).code, 'Fe3C'); eq(K.phaseAt(0.05, 1450).code, 'peritektik'); eq(K.phaseAt(0, 1000).code, 'γ'); eq(K.phaseAt(0, 500).code, 'α'); eq(K.phaseAt(4.3, 1149).code, 'L'); }
// Varsayılan durum ve hazır ayarlar (elle hesap)
{ const p = K.phaseAt(0.4, 750), ca = (0.022 * 162) / 185, cg = (0.76 * 162) / 185; near(p.phases[0].c, ca, 1e-12); near(p.phases[1].c, cg, 1e-12); near(p.phases[0].w, (cg - 0.4) / (cg - ca), 1e-12); near(p.phases[0].w, 0.41085, 2e-5);
  const q = K.phaseAt(1.2, 800); near(q.phases[1].w, (1.2 - (0.76 + (1.38 * 73) / 421)) / (6.7 - (0.76 + (1.38 * 73) / 421)), 1e-12);
  const d = K.phaseAt(3, 1200); near(d.phases[1].w, 0.6145, 2e-4, 'dökme demir sıvı oranı'); }
// Mikroyapı defteri
for (let ci = 3; ci <= 214; ci++) {
  const C = ci / 100, m = K.micro(C), proC = m.proId === 'α' ? 0.022 : 6.7;
  near(m.pro + m.pearlite, 1, 1e-12); near(m.pro * proC + m.pearlite * 0.76, C, 1e-12, 'karbon defteri'); near(m.carbon, C, 1e-12);
  near(m.alphaTotal + m.cemTotal, 1, 1e-12); near(m.alphaTotal * 0.022 + m.cemTotal * 6.7, C, 1e-12, 'faz karbon dengesi');
  near((m.proId === 'α' ? m.pro : 0) + m.pearlite * m.alphaInPearlite, m.alphaTotal, 1e-12, 'ferrit defteri');
  near((m.proId === 'Fe3C' ? m.pro : 0) + m.pearlite * m.cemInPearlite, m.cemTotal, 1e-12, 'sementit defteri');
  eq(m.proId, C <= 0.76 ? 'α' : 'Fe3C');
  // 727 °C'nin hemen altı/üstü: faz diyagramı okumasıyla süreklilik
  near(K.phaseAt(C, 727 - 1e-7).phases[0].w, m.alphaTotal, 1e-7, 'hemen altında toplam ferrit');
  if (C !== 0.76) { const up = K.phaseAt(C, 727 + 1e-7), g = up.phases.find((x) => x.id === 'γ'); near(g.w, m.pearlite, 1e-7, 'hemen üstündeki ostenit = perlit'); }
}
near(K.micro(0.4).pearlite, 0.512, 1e-3, 'Callister örneği: 0,40 % C → 51,2 % perlit'); near(K.micro(0.4).pro, 0.488, 1e-3);
near(K.micro(0.76).alphaInPearlite, 5.94 / 6.678, 1e-12); near(K.micro(0.76).pearlite, 1, 1e-12); eq(K.micro(0.76).kind, 'otektoid'); eq(K.micro(0.01).kind, 'ferrit'); eq(K.micro(3).kind, 'dokme'); eq(K.micro(1).kind, 'ustu'); eq(K.micro(0.3).kind, 'alti');
// Nokta sayımı: birden çok tohum, bağımsız ince ızgara alanı
for (const C of [0.1, 0.25, 0.4, 0.6, 1.0, 1.6, 2.1]) for (const seed of [1, 2, 3, 7, 8, 11]) {
  const f = K.micro(C).pro, m = K.makeMicro(f, seed);
  let hit = 0, n = 0; for (let i = 0; i < 331; i++) for (let j = 0; j < 83; j++) { n++; if (m.classify((4 * (i + 0.23)) / 331, (j + 0.71) / 83) === 0) hit++; }
  ok(Math.abs(hit / n - f) < 0.012, `ince alan oranı C=${C} seed=${seed}: ${hit / n} / ${f}`);
  for (const k of [5, 10, 20]) { const pc = K.pointCount(m, k); eq(pc.n, 4 * k * k); ok(Math.abs(pc.fraction - f) < 4 * Math.sqrt((f * (1 - f)) / pc.n) + 0.012, `sayım k=${k} C=${C} seed=${seed}: ${pc.fraction} / ${f}`); }
}
{ const m0 = K.makeMicro(0, 7), m1 = K.makeMicro(1, 7); eq(K.pointCount(m0, 10).fraction, 0); eq(K.pointCount(m1, 10).fraction, 1);
  let cem = 0, n = 0; for (let i = 0; i < 800; i++) for (let j = 0; j < 200; j++) { n++; if (m0.classify((4 * (i + 0.5)) / 800, (j + 0.5) / 200) === 2) cem++; } near(cem / n, 1 - 5.94 / 6.678, 0.08, 'perlit içi lamel oranı'); }

// ── 2 · Çekme deneyi ──
const MODELS = [{ E: 200000, K: 800, n: 0.19, ef: 0.35 }, { E: 70000, K: 410, n: 0.05, ef: 0.12 }, { E: 100000, K: 1200, n: 0.25, ef: 0.004 }, { E: 50000, K: 1500, n: 0.5, ef: 0.6 }, { E: 220000, K: 200, n: 0.02, ef: 0.3 }, { E: 120000, K: 600, n: 0.33, ef: 0.6 }];
const stressOf = (c, et) => { let lo = 0, hi = c.E * et + 1; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (m / c.E + Math.pow(m / c.K, 1 / c.n) > et) hi = m; else lo = m; } return (lo + hi) / 2; }; // bağımsız: ikiye bölme ile σ(ε)
for (const c of MODELS) {
  const R = K.tensile(c);
  // Considère: kaba kuvvet tarama ile mühendislik gerilmesinin en büyüğü
  let best = -1, bestEt = 0; const top = Math.min(1.2, c.n * 2 + 0.1);
  for (let i = 1; i <= 40000; i++) { const et = (top * i) / 40000, se = stressOf(c, et) * Math.exp(-et); if (se > best) { best = se; bestEt = et; } }
  near(R.neck.se, best, 1e-8, 'UTS kaba kuvvet'); ok(Math.abs(R.neck.et - bestEt) < 2 * top / 40000, `boyun yeri ${R.neck.et} / ${bestEt}`);
  // dσ/dε = σ koşulu sayısal türevle
  { const h = 1e-6, d = (stressOf(c, R.neck.et + h) - stressOf(c, R.neck.et - h)) / (2 * h); near(d, R.neck.s, 2e-4, 'Considère türevi'); }
  near(R.neck.et, R.theory.etNeckElastic, 1e-6, 'n + (1−n)σ/E'); ok(R.neck.et > c.n && R.neck.et - c.n < 0.02, 'elastik pay küçük ve artı');
  near(R.theory.uts, c.K * Math.pow(c.n / Math.E, c.n), 1e-12); ok(R.neck.se < R.theory.uts && R.neck.se > 0.97 * R.theory.uts, 'UTS katı-plastik kuramın hemen altında');
  eq(R.necked, c.ef > R.neck.e);
  // Eğri noktaları: dönüşümler ve gerçek eğri
  for (const p of R.sample(50)) { near(p.se * (1 + p.e), p.s, 1e-12, 'σ_g = σ_m(1+ε_m)'); near(Math.log1p(p.e), p.et, 1e-12, 'ε_g = ln(1+ε_m)'); near(p.s, stressOf(c, p.et), 1e-9, 'eğri üzerinde'); }
  const pts = R.sample(300); for (let i = 1; i < pts.length; i++) ok(pts[i].e > pts[i - 1].e && pts[i].se >= pts[i - 1].se - 1e-9, 'boyuna kadar tekdüze');
  // 0,2 % kaydırma
  if (R.yield) { near(R.yield.se, c.E * (R.yield.e - 0.002), 1e-9, 'kaydırma doğrusu'); near(R.yield.s, stressOf(c, R.yield.et), 1e-9); ok(Math.abs(R.yield.se / R.theory.yield - 1) < 0.02, 'akma ≈ K·0,002ⁿ'); }
  // İş: Simpson (ikinci kural) ∫σ_g dε_g ve kapalı biçim
  { const W = simpson((et) => stressOf(c, et), 0, R.lim.et, 20000); near(R.work.uniformNum, W, 3e-5, 'yamuk / Simpson'); near(R.work.uniformClosed, W, 3e-5, 'kapalı / Simpson'); }
  if (R.necked) { const W2 = simpson((e) => R.seAt(e), R.neck.e, c.ef, 400); near(R.work.postNum, W2, 1e-5); near(R.work.postClosed, W2, 1e-9); near(R.end.se, 0.8 * R.neck.se, 1e-12); near(R.seAt(c.ef), R.end.se, 1e-12); } else { eq(R.work.postNum, 0); near(R.end.se, R.lim.se, 1e-12); near(R.lim.e, c.ef, 1e-9); near(R.uts, R.lim.se, 1e-12); }
  ok(Number.isNaN(R.seAt(c.ef * 1.01)) && Number.isNaN(R.seAt(-0.01)), 'kırılmadan sonra eğri yok');
  // Boşaltma ve yeniden yükleme
  for (const fr of [0, 0.1, 0.5, 1]) { const u = R.unload(fr), q = u.point; near(q.e, fr * R.lim.e, 1e-9, 'boşaltma noktası');
    near(Math.log1p(u.permanent), q.et - q.s / c.E, 1e-9, 'kalıcı gerçek şekil değiştirme = ε − σ/E'); ok(u.permanent >= -1e-15 && u.permanent <= q.e + 1e-15);
    near(u.recoveredNum, (q.s * q.s) / (2 * c.E), 1e-5, 'geri verilen enerji');
    if (u.reload) { const r = u.reload; near(r.se, c.E * (r.e - 0.002), 1e-9, 'yeniden yükleme kaydırma doğrusu'); near(r.s, c.K * Math.pow(q.p + r.p, c.n), 1e-12); if (R.yield && fr > 0) ok(r.se > R.yield.se * (fr >= 0.1 ? 1 : 0.999), 'pekleşme: akma yükselir'); if (fr === 0 && R.yield) near(r.se, R.yield.se, 1e-9); } }
  if (R.resilience) near(R.resilience.num, (R.yield.s * R.yield.s) / (2 * c.E), 1e-5, 'rezilyans');
}
{ const b = K.tensile(MODELS[2]); eq(b.necked, false); eq(b.yield, null); eq(b.resilience, null); ok(b.lim.p < 0.002, 'gevrek: kalıcı < 0,2 %');
  const s = K.tensile(MODELS[0]); near(s.yield.se, 244.63, 1e-4); near(s.uts, 481.14, 1e-4); near(s.neck.e, 0.21211, 1e-4); near(s.work.total, 155.615, 1e-4);
  const a = K.tensile(MODELS[1]); near(a.yield.se, 298.28, 1e-4); near(a.uts, 334.06, 1e-4);
  for (const bad of [{ E: 0, K: 1, n: 0.2, ef: 0.1 }, { E: 1, K: 1, n: 1, ef: 0.1 }, { E: 1, K: 1, n: 0.2, ef: 0 }, { E: NaN, K: 1, n: 0.2, ef: 0.1 }]) { assert.throws(() => K.tensile(bad)); checks++; } assert.throws(() => s.unload(1.5)); checks++; }

// ── 3 · Difüzyon ──
// erf: sayısal integral (Simpson) ve bilinen değerler
for (let i = -40; i <= 40; i++) { const x = i / 8; near(K.erf(x), (2 / Math.sqrt(Math.PI)) * simpson((t) => Math.exp(-t * t), 0, x, 4000), 1e-12, 'erf ' + x); }
near(K.erf(0.5), 0.5204998778130465, 1e-14); near(K.erf(1), 0.8427007929497149, 1e-14); near(K.erf(2), 0.9953222650189527, 1e-14); near(1 - K.erf(4), 1.541725790028002e-8, 1e-6 / 1e-8 * 1e-10); near(K.erf(2.9999) , K.erf(3.0001), 1e-6);
for (const y of [-0.999, -0.5, 0, 1e-6, 0.25, 0.75, 0.9, 0.999999]) near(K.erf(K.erfinv(y)), y, 1e-13, 'erfinv');
assert.throws(() => K.erfinv(1)); checks++;
// Arrhenius
eq(K.RGAS, 8.314); eq(K.PAIRS.length, 6);
{ const src = { CaFe: [6.2e-7, 80000], NaFe: [3.0e-7, 76150], NiCu: [2.7e-4, 236000], CrNi: [1.1e-4, 272000], AuPt: [1.3e-5, 252000] }; // Callister 7e, 5. bölüm soruları
  for (const p of K.PAIRS) { if (src[p.id]) { eq(p.D0, src[p.id][0]); eq(p.Q, src[p.id][1]); eq(p.sourced, true); } else { eq(p.id, 'CgFe'); eq(p.sourced, false); }
    for (const [T1, T2] of [[600, 900], [1000, 1500]]) { const D1 = K.arrhenius(p.D0, p.Q, T1), D2 = K.arrhenius(p.D0, p.Q, T2); near((-8.314 * Math.log(D2 / D1)) / (1 / T2 - 1 / T1), p.Q, 1e-10, 'iki sıcaklıktan Q'); ok(D2 > D1); }
    const z = K.measureArrhenius({ D0: p.D0, Q: p.Q, Tc: 900, half: 150, noise: 0, seed: 3 }); near(z.Q, p.Q, 1e-9, 'saçılmasız uydurma Q'); near(z.D0, p.D0, 1e-7, 'saçılmasız D0'); eq(z.T.length, 7); near(z.T[0], 750 + 273.15, 1e-12); near(z.T[6], 1050 + 273.15, 1e-12); }
  let sum = 0, sq = 0; const N = 400; for (let s = 1; s <= N; s++) { const m = K.measureArrhenius({ D0: 2.3e-5, Q: 148000, Tc: 1000, half: 150, noise: 0.1, seed: s }); sum += m.Q; sq += m.Q * m.Q; }
  const mean = sum / N, sd = Math.sqrt(sq / N - mean * mean); ok(Math.abs(mean / 148000 - 1) < 0.01, 'Q uydurması yansız: ' + mean); ok(sd > 3000 && sd < 12000, 'Q saçılması makul: ' + sd);
  near(K.arrhenius(2.3e-5, 148000, 1223.15), 1.0994e-11, 1e-4); }
// Sementasyon: açık sonlu fark ↔ analitik erf, yakınsama, kararlılık, karbon alımı
const Dg = (T) => 2.3e-5 * Math.exp(-148000 / (8.314 * (T + 273.15)));
{ const base = { D: Dg(950), Cs: 1, C0: 0.2, t: 8 * 3600, Cx: 0.4 };
  const errs = [];
  for (const dx of [2e-4, 1e-4, 5e-5]) { const R = K.carburise({ ...base, dx, r: 0.4 }); eq(R.unstable, false); ok(R.rEff <= 0.4 + 1e-12 && R.rEff > 0.38); near(R.steps * R.dt, base.t, 1e-12); errs.push(R.maxErr);
    let own = 0; for (let i = 0; i <= R.n; i++) own = Math.max(own, Math.abs(R.C[i] - (1 - 0.8 * K.erf((i * dx) / (2 * Math.sqrt(base.D * base.t)))))); near(R.maxErr, own, 1e-12, 'maxErr');
    // karbon alımı: ∫(C − C₀)dx = 2(C_s − C₀)√(Dt/π)
    let up = 0; for (let i = 1; i <= R.n; i++) up += ((R.C[i] + R.C[i - 1]) / 2 - 0.2) * dx; near(up, 2 * 0.8 * Math.sqrt((base.D * base.t) / Math.PI), 0.02 * (dx / 1e-4) , 'karbon alımı dx=' + dx);
    near(R.depth, K.depthTheory(base), 0.02 * (dx / 1e-4) ** 2 + 2e-3, 'derinlik'); }
  ok(errs[0] / errs[1] > 3.5 && errs[0] / errs[1] < 4.5 && errs[1] / errs[2] > 3.5 && errs[1] / errs[2] < 4.5, 'ikinci mertebe yakınsama: ' + errs.join(' '));
  near(K.depthTheory(base), 2 * Math.sqrt(base.D * base.t) * 0.8134198475976185, 1e-9, 'erfinv(0,75)'); near(K.depthTheory(base) * 1000, 0.9154, 2e-4);
  eq(K.depthTheory({ ...base, Cx: 1.0 }), null); eq(K.depthTheory({ ...base, Cx: 0.2 }), null);
  // √t ölçeklemesi: dört kat süre → iki kat derinlik (iki ayrı koşu) ve koşu içi kayıt
  const d2 = K.carburise({ ...base, t: 2 * 3600, dx: 5e-5, r: 0.4 }).depth, d8 = K.carburise({ ...base, dx: 5e-5, r: 0.4 }).depth, d32 = K.carburise({ ...base, t: 32 * 3600, dx: 5e-5, r: 0.4 }).depth;
  near(d8 / d2, 2, 3e-3, '8 sa / 2 sa'); near(d32 / d8, 2, 1e-3, '32 sa / 8 sa'); near(K.depthTheory({ ...base, t: 32 * 3600 }) / K.depthTheory(base), 2, 1e-12);
  const R32 = K.carburise({ ...base, t: 32 * 3600, dx: 5e-5, r: 0.4 }), sc = K.scaling(R32.record, R32.dx); near(sc.exponent, 0.5, 5e-3, 'üs'); near(sc.ratio, 4, 5e-3, 'süre oranı');
  const scD = K.scaling(K.carburise({ ...base, dx: 1e-4, r: 0.4 }).record, 1e-4); near(scD.exponent, 0.4924, 1e-3); near(scD.ratio, 4.122, 1e-3);
  eq(K.scaling(K.carburise({ ...base, t: 1800, dx: 2e-4, r: 0.4 }).record, 2e-4), null);
  // Kararlılık: r ≤ ½ için en büyük ilkesi; r > ½ için dağılma
  for (const T of [850, 950, 1100]) for (const t of [0.5, 8, 48]) for (const dx of [5e-5, 2e-4]) for (const r of [0.05, 0.25, 0.5]) { if (t === 48 && dx === 5e-5 && r === 0.05) continue; const R = K.carburise({ D: Dg(T), Cs: 1.4, C0: 0.05, t: t * 3600, dx, r, Cx: 0.4 }); eq(R.unstable, false, `kararlı T=${T} t=${t} r=${r}`); eq(R.overshoot, 0); let mono = true; for (let i = 1; i <= R.n; i++) if (R.C[i] > R.C[i - 1] + 1e-12) mono = false; ok(mono || r === 0.5, 'profil tekdüze'); }
  for (const r of [0.55, 0.6]) { const R = K.carburise({ ...base, dx: 1e-4, r }); eq(R.unstable, true); eq(R.depth, null); ok(R.rEff > 0.5 && R.overshoot > 1, 'taşma büyük: ' + R.overshoot); }
  assert.throws(() => K.carburise({ ...base, dx: 0, r: 0.4 })); checks++; }
// Hall–Petch
near(K.hallPetch(70, 0.74, 25), 218, 1e-12);
for (const d of [1, 8, 25, 200]) for (const k of [0.1, 0.74, 1]) { near(K.hallPetch(0, k, d / 4), 2 * K.hallPetch(0, k, d), 1e-12, 'd/4 → 2×'); near((K.hallPetch(55, k, d) - 55) ** 2 * d * 1e-6, k * k, 1e-10); }
{ const z = K.measureHP({ s0: 70, k: 0.74, noise: 0, seed: 1 }); near(z.k, 0.74, 1e-9); near(z.s0, 70, 1e-8); let sum = 0; for (let s = 1; s <= 300; s++) sum += K.measureHP({ s0: 70, k: 0.74, noise: 0.03, seed: s }).k; near(sum / 300, 0.74, 0.02, 'k uydurması yansız'); assert.throws(() => K.hallPetch(1, 1, 0)); checks++; }
near(K.linfit([0, 1, 2, 3], [1, 3, 5, 7]).slope, 2, 1e-12); near(K.linfit([0, 1, 2, 3], [1, 3, 5, 7]).intercept, 1, 1e-12);
// Sayfa metni: emoji, birleşik işaret, dış betik yok
ok(!/[̀-ͯ⃐-⃿]/.test(html), 'birleşik işaret yok'); ok(!/\p{Extended_Pictographic}/u.test(html.replace(/[←→↔]/g, '')), 'emoji yok'); ok(!/<script[^>]+src="https?:/.test(html) && !/fonts\.googleapis|cdn\./.test(html), 'dış betik/yazı tipi yok');
console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if (process.argv.includes('--browser')) {
  const { createRequire } = await import('node:module'); const { createServer } = await import('node:http'); const { join, extname } = await import('node:path'); const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url)); const { chromium } = createRequire(join(root, 'package.json'))('playwright');
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, '127.0.0.1', r)); let browser; const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width, height] of [['light', 390, 900], ['dark', 1280, 900]]) {
      const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, locale: 'tr-TR' });
      await ctx.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(8000); const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`, { waitUntil: 'load' });
      const click = (id) => page.locator('#' + id).click(), read = (id) => page.locator('#' + id).textContent();
      const set = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event(e.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })); }, v);
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `[${theme} ${width}] #${id}: "${t}" içinde "${text}" yok`); checks++; };
      const lacks = async (id, text) => { const t = await read(id); assert(!t.includes(text), `[${theme} ${width}] #${id}: "${text}" olmamalı`); checks++; };
      const noOverflow = async (tag) => { eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `yatay taşma (${tag}, ${width})`); };
      const painted = async (id) => { ok(assertCanvasDrawn(await canvasInk(page, '#' + id), { minW: 100, minDistinct: 4, label: id }), 'tuval çizildi: ' + id); };
      eq(await page.evaluate(() => document.documentElement.dataset.theme || 'dark'), theme);
      // Erişilebilirlik: her denetimin etiketi, tuvallerin rolü, canlı okumalar
      eq(await page.evaluate(() => [...document.querySelectorAll('main input, main select')].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id).join()), '', 'etiketsiz denetim');
      eq(await page.evaluate(() => [...document.querySelectorAll('main canvas')].filter((c) => c.getAttribute('role') !== 'img' || !c.getAttribute('aria-label')).length), 0);
      eq(await page.evaluate(() => document.querySelectorAll('main canvas').length), 8); eq(await page.evaluate(() => document.querySelectorAll('main [role=status]').length), 5);
      eq(await page.evaluate(() => Object.isFrozen(MalzemeLab) && !Object.getOwnPropertyDescriptor(window, 'MalzemeLab').writable), true);
      // 01 · Faz diyagramı
      await has('fazCOut', '0,40 % C'); await has('fazTOut', '750 °C'); await has('fazAlan', 'α (ferrit) + γ (ostenit)'); await has('fazUc', 'α: 0,019 % C · γ: 0,67 % C'); await has('fazOran', 'α: 41,1 % · γ: 58,9 %'); await has('mikroOzet', 'Perlit: 51,2 % · ön-ötektoid ferrit: 48,8 %');
      await has('fazRows', '0,4000 % C'); await has('fazRows', '400 noktalı sayım'); await has('fazRows', '49,5 %'); await has('fazRows', '94,34 %'); await has('fazDefter', '88,9 % ferrit + 11,1 % sementit'); await has('fazStatus', '= 41,1 %'); await has('fazStatus', '(0,6655 − 0,40) / (0,6655 − 0,0193) = 41,1 %'); await has('fazStatus', '= 0,400 % C');
      await painted('fazCanvas'); await painted('mikroCanvas'); await noOverflow('faz');
      await set('fazGrid', '20'); await has('fazRows', '1600 noktalı sayım'); await has('fazRows', '49,0 %'); await set('fazGrid', '5'); await has('fazRows', '100 noktalı sayım');
      await click('fazSeed'); await has('fazRows', '100 noktalı sayım'); await has('mikroOzet', 'Perlit: 51,2 %');
      await click('fazCool'); await has('fazTOut', '726 °C'); await has('fazAlan', 'α (ferrit) + Fe₃C (sementit)'); await has('fazOran', 'α: 94,3 % · Fe₃C: 5,7 %');
      await set('fazT', 727); await has('fazAlan', 'Ötektoid sıcaklığı'); await has('fazOran', 'Tanımsız'); await has('fazStatus', 'değişmez tepkime'); await has('fazRows', 'tanımsız');
      await set('fazT', 728); await has('fazOran', 'α: 48,5 % · γ: 51,5 %');
      await click('fazP2'); await has('fazCOut', '0,76 % C'); await has('mikroOzet', 'Perlit: 100,0 %'); await has('fazOran', 'α: 88,9 % · Fe₃C: 11,1 %');
      await click('fazP3'); await has('fazAlan', 'γ (ostenit) + Fe₃C (sementit)'); await has('fazOran', 'γ: 96,5 % · Fe₃C: 3,5 %'); await has('mikroOzet', 'Perlit: 92,6 % · ön-ötektoid sementit: 7,4 %');
      await click('fazP4'); eq(await page.locator('#fazZoom').inputValue(), 'tum'); await has('fazAlan', 'γ (ostenit) + L (sıvı)'); await has('fazOran', 'γ: 38,5 % · L: 61,5 %'); await has('mikroOzet', 'Dökme demir'); await has('fazRows', 'yalnız C₀ ≤ 2,14 %'); await painted('mikroCanvas');
      await set('fazT', 1148); await has('fazAlan', 'Ötektik sıcaklığı'); await has('fazOran', 'Tanımsız');
      // sınır değerleri
      await set('fazC', 0); await set('fazT', 400); await has('fazAlan', 'α (ferrit)'); await has('fazOran', 'α: 100,0 %'); await has('mikroOzet', 'Yalnız ferrit'); await set('fazT', 1600); await has('fazAlan', 'L (sıvı)'); await set('fazT', 1500); await has('fazAlan', 'Peritektik köşe'); await has('fazOran', 'Çözülmüyor'); await has('fazStatus', '1394');
      await set('fazC', 6.7); await set('fazT', 400); await has('fazAlan', 'Fe₃C (sementit)'); await has('fazOran', 'Fe₃C: 100,0 %'); await set('fazT', 1600); await has('fazAlan', 'L (sıvı)'); await set('fazC', 2.14); await set('fazT', 726); await has('mikroOzet', 'ön-ötektoid sementit: 23,2 %');
      await click('fazReset'); await has('fazOran', 'α: 41,1 % · γ: 58,9 %'); eq(await page.locator('#fazZoom').inputValue(), 'celik'); eq(await page.locator('#fazGrid').inputValue(), '10'); await has('fazRows', '49,5 %');
      // sürükleme: tuvalde bir noktaya bas → kaydırıcılar izler, kütle dengesi korunur
      { const box = await page.locator('#fazCanvas').boundingBox(); await page.locator('#fazCanvas').scrollIntoViewIfNeeded(); const b2 = await page.locator('#fazCanvas').boundingBox(); await page.mouse.move(b2.x + b2.width * 0.6, b2.y + b2.height * 0.5); await page.mouse.down(); await page.mouse.move(b2.x + b2.width * 0.7, b2.y + b2.height * 0.55); await page.mouse.up();
        const C = +(await page.locator('#fazC').inputValue()), T = +(await page.locator('#fazT').inputValue()); ok(C > 1.2 && C < 1.8 && T > 800 && T < 1100 && box.width > 0, `sürükleme C=${C} T=${T}`); await has('fazAlan', 'γ'); await click('fazReset'); }
      // klavye: sekmeler
      await page.locator('#tab-faz').focus(); await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-cekme').getAttribute('aria-selected'), 'true'); eq(await page.locator('#panel-faz').isHidden(), true); await page.keyboard.press('End'); eq(await page.locator('#tab-difuzyon').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-faz').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowLeft'); eq(await page.locator('#tab-difuzyon').getAttribute('aria-selected'), 'true'); await page.keyboard.press('Home'); eq(await page.locator('#tab-faz').getAttribute('aria-selected'), 'true'); eq(await page.locator('#tab-cekme').getAttribute('tabindex'), '-1');
      // 02 · Çekme deneyi
      await click('tab-cekme'); await has('cekAkma', '244,6 MPa'); await has('cekUts', '481,1 MPa'); await has('cekEu', '21,21 %'); await has('cekTok', '155,62 MJ/m³'); await has('cekKalici', '10,321 %'); await has('cekYeni', '514,4 MPa');
      await has('cekRows', '0,19236'); await has('cekRows', '+1,24 %'); await has('cekRows', '482,54 MPa'); await has('cekRows', '−0,29 %'); await has('cekRows', '0,1506 MJ/m³'); await has('cekRows', '127,01 MJ/m³'); await has('cekStatus', 'pekleşme'); await painted('cekmeCanvas'); await painted('numuneCanvas'); await noOverflow('cekme');
      await set('cekZoom', 'akma'); await painted('cekmeCanvas'); await set('cekZoom', 'tum');
      await set('cekUn', 0); await has('cekKalici', '0,000 %'); await has('cekYeni', '244,6 MPa'); await set('cekUn', 100); await has('cekKalici', '20,858 %'); await has('cekYeni', '581,5 MPa'); await set('cekUn', 50);
      await set('cekMat', 'al'); await has('cekEOut', '70 GPa'); await has('cekKOut', '410 MPa'); await has('cekNOut', '0,05'); await has('cekEfOut', '12,0 %'); await has('cekAkma', '298,3 MPa'); await has('cekUts', '334,1 MPa'); await has('cekEu', '5,63 %');
      await set('cekMat', 'gevrek'); await has('cekAkma', 'Tanımsız'); await has('cekUts', '238,8 MPa (kırılmada)'); await has('cekEu', 'Boyun yok'); await has('cekYeni', 'Tanımsız'); await has('cekStatus', 'boyun vermeden koptu'); await has('cekStatus', '0,159 %'); await has('cekRows', 'ulaşılmadı'); await lacks('cekRows', 'NaN'); await has('numuneCaption', 'gevrek');
      await set('cekN', 0.3); eq(await page.locator('#cekMat').inputValue(), 'ozel'); await set('cekN', 0.25); eq(await page.locator('#cekMat').inputValue(), 'gevrek');
      for (const [id, lo, hi] of [['cekE', 50, 220], ['cekK', 200, 1500], ['cekN', 0.02, 0.5], ['cekEf', 0.2, 60]]) for (const v of [lo, hi]) { await set(id, v); await lacks('cekRows', 'NaN'); await lacks('cekStatus', 'NaN'); await lacks('cekRows', 'Infinity'); }
      await click('cekmeReset'); eq(await page.locator('#cekMat').inputValue(), 'celik'); await has('cekAkma', '244,6 MPa');
      // animasyon: başlat, duraklat, parametre değişince dur; Boşluk ve R kısayolları
      await click('cekStart'); await page.waitForTimeout(500); await click('cekPause'); eq(await page.locator('#cekPause').getAttribute('aria-pressed'), 'true'); await has('cekPause', 'Devam et'); await painted('cekmeCanvas'); await click('cekPause'); await has('cekPause', 'Duraklat');
      await set('cekK', 810); await has('cekPause', 'Duraklat'); eq(await page.locator('#cekPause').getAttribute('aria-pressed'), 'false'); await has('cekUts', '487,');
      await page.locator('h1').click(); await page.keyboard.press('Space'); await page.waitForTimeout(250); await page.keyboard.press('Space'); await has('cekPause', 'Devam et'); await page.keyboard.press('r'); await has('cekKOut', '800 MPa'); await has('cekPause', 'Duraklat'); await has('cekUts', '481,1 MPa');
      await page.locator('#cekK').focus(); await page.keyboard.press('r'); await has('cekKOut', '800 MPa');
      // 03 · Difüzyon
      await click('tab-difuzyon'); await has('arrTOut', '1000 °C'); await has('arrD', '1,95 × 10⁻¹¹ m²/s'); await has('arrRows', '148,00 kJ/mol'); await has('arrSource', 'öğretim değeri'); await lacks('arrStatus', 'Uyarı'); eq(await page.locator('#arrPair option').count(), 6);
      await set('arrNoise', 0); await has('arrQ', '148,0 kJ/mol'); await has('arrRows', '0,00 %'); await has('arrStatus', 'aynen verir'); await set('arrNoise', 10); const q1 = await read('arrQ'); await click('arrNew'); ok((await read('arrQ')) !== q1, 'yeni ölçüm serisi değeri değiştirir');
      await set('arrT', 900); await has('arrStatus', 'Uyarı'); await has('arrD', '5,91 × 10⁻¹² m²/s'); await set('arrPair', 'CaFe'); await has('arrSource', 'Callister'); await has('arrRows', '80,00 kJ/mol'); await lacks('arrStatus', 'Uyarı'); await set('arrT', 1300); await has('arrStatus', 'Uyarı'); await set('arrT', 300); await set('arrHalf', 300); await lacks('arrRows', 'NaN');
      for (const id of ['NaFe', 'NiCu', 'CrNi', 'AuPt']) { await set('arrPair', id); await lacks('arrRows', 'NaN'); await has('arrSource', 'Callister'); } await painted('arrCanvas');
      await has('karbD', '1,10 × 10⁻¹¹ m²/s'); await has('karbLen', '0,563 mm'); await has('karbDepth', '0,919 mm'); await has('karbStep', '80 adım'); await has('karbRows', '0,9154 mm'); await has('karbRows', '+0,40 %'); await has('karbRows', '0,4924'); await has('karbRows', '4,122'); await has('karbRows', 'kararlı'); await painted('karbCanvas'); await painted('olcekCanvas');
      await click('karb2'); await has('karbtOut', '2,0 sa'); await has('karbDepth', '0,466 mm'); await has('karbRows', 'ölçülemedi'); await click('karb32'); await has('karbDepth', '1,833 mm'); await has('karbRows', '4,022'); await click('karb8'); await has('karbDepth', '0,919 mm');
      await set('karbDx', '0.05'); await has('karbDepth', '0,916 mm'); await has('karbRows', '0,4964'); await set('karbDx', '0.1');
      await click('karb2'); await set('karbDx', '0.2'); await click('karbBad'); await has('karbtOut', '8,0 sa'); await has('karbROut', '0,55'); await has('karbStatus', '31,4 % C dışına'); await has('karbRows', '31,7 % C'); await has('karbDepth', 'Kararsız çözüm'); await has('karbStatus', 'kararsız'); await has('karbRows', 'sınırın üstünde'); await lacks('karbRows', 'NaN'); await painted('olcekCanvas'); await set('karbR', 0.5); await has('karbRows', 'kararlı'); await has('karbDepth', '0,919 mm'); await set('karbR', 0.4);
      await set('karbCx', 0.3); await set('karbC0', 0.5); await has('karbDepth', 'Tanımsız'); await has('karbStatus', 'tanımlı değildir'); await set('karbC0', 0.2); await set('karbCx', 0.8); await set('karbCs', 0.6); await has('karbDepth', 'Tanımsız'); await set('karbCs', 1.4); await set('karbT', 850); await has('karbStatus', 'A_cm = 1,16 %'); await has('karbStatus', 'tam ostenit değildir'); await set('karbT', 1100); await set('karbt', 48); await set('karbR', 0.05); await set('karbDx', '0.05'); await lacks('karbRows', 'NaN'); await set('karbt', 0.5); await set('karbT', 850); await set('karbDx', '0.2'); await lacks('karbRows', 'NaN'); await lacks('karbStatus', 'NaN');
      await has('hpSy', '218,0 MPa'); await has('hpAdd', '148,0 MPa'); await has('hpX', '6,32'); await has('hpQuarter', '366,0 MPa (d = 6,25 µm)'); await set('hpNoise', 0); await has('hpRows', '0,740 MPa·m^½'); await has('hpRows', '0,00 %'); await set('hpNoise', 3); const k1 = await read('hpRows'); await click('hpNew'); ok((await read('hpRows')) !== k1, 'yeni HP serisi');
      await set('hpD', 1); await has('hpSy', '810,0 MPa'); await set('hpD', 200); await has('hpSy', '122,3 MPa'); await set('hpS0', 0); await set('hpK', 0.1); await lacks('hpRows', 'NaN'); await painted('hpCanvas'); await noOverflow('difuzyon');
      await click('difuzyonReset'); await has('arrTOut', '1000 °C'); eq(await page.locator('#arrPair').inputValue(), 'CgFe'); await has('karbDepth', '0,919 mm'); await has('karbtOut', '8,0 sa'); await has('hpSy', '218,0 MPa'); await has('arrQ', q1.trim());
      // her sekmede taşma ve hata yok
      for (const t of ['faz', 'cekme', 'difuzyon']) { await click('tab-' + t); await noOverflow(t); eq(await page.locator('#panel-' + t).isVisible(), true); }
      eq(await page.evaluate(() => getComputedStyle(document.body).overflowY !== 'hidden'), true);
      assert.deepEqual(errors, [], 'konsol hatası'); checks++;
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} tarayıcı kontrolü (390 açık + 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
