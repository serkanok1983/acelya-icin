// G · maden-muhendisligi.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) node'da yüklenir ve sayfanın kendi formüllerini KULLANMAYAN
// başvurularla karşılaştırılır: 2×2 doğrusal çözüm (kütle + metal dengesi), kalma süresi dağılımı
// integrali ve dinamik tank benzetimi (flotasyon kinetiği), altın oran araması (net getiri en iyisi),
// koni tanımından kaba kuvvet alt küme sayımı ve en büyük akış / en küçük kesit (nihai ocak),
// x değişkeninde orta nokta integrali (Bond), ayrı kök bulucular (fan noktası, paralel kollar),
// analitik üstel çözüm (metan). `--browser`: 390 px açık ve 1280 px koyu temada arayüz denetimi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';

const html = fs.readFileSync(new URL('../maden-muhendisligi.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.MadenLab;
assert(Object.isFrozen(K), 'çekirdek dondurulmuş olmalı');

let checks = 0;
const near = (actual, expected, tol, label = '') => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(1, Math.abs(expected)), `${label}: ${actual} ≠ ${expected} (tol ${tol})`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };
const lcg = (seed) => { let s = seed >>> 0; return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); };

// ── 1 · İki ürün formülü: kütle ve metal dengesinin Cramer çözümü ──
{
  const r = lcg(11);
  for (let i = 0; i < 400; i++) {
    const F = 100 + 4900 * r(), t = 0.0002 + 0.01 * r(), f = t + 0.0005 + 0.03 * r(), c = f + 0.05 + 0.25 * r();
    // C + T = F ; c·C + t·T = f·F
    const det = t - c, C = (F * t - f * F) / det, T = (f * F - c * F) / det;
    const p = K.twoProduct({ F, f, c, t });
    near(p.C, C, 1e-12, 'C'); near(p.T, T, 1e-12, 'T'); near(p.R, (C * c) / (F * f), 1e-12, 'R');
    near(p.C + p.T, F, 1e-13, 'kütle kapanışı'); near(p.C * c + p.T * t, F * f, 1e-12, 'metal kapanışı');
    near(p.metalConc + p.metalTail, p.metalFeed, 1e-12, 'metal toplamı'); near(p.ratio * p.pull, 1, 1e-12, 'oran × çekiş');
    ok(Math.abs(p.massRes) < 1e-9 * F && Math.abs(p.metalRes) < 1e-9 * F, 'artıklar');
  }
  const d = K.twoProduct({ F: 1000, f: 0.01, c: 0.25, t: 0.0008 });
  near(d.C, 36.918138, 1e-8, 'varsayılan C'); near(d.R, 0.92295345, 1e-8, 'varsayılan R'); near(d.metalTail, 0.77046549, 1e-8, 'varsayılan kayıp');
  for (const bad of [{ F: 1000, f: 0.01, c: 0.25, t: 0.01 }, { F: 1000, f: 0.01, c: 0.25, t: 0.02 }, { F: 1000, f: 0.3, c: 0.25, t: 0.001 }, { F: 0, f: 0.01, c: 0.25, t: 0.001 }, { F: 1000, f: NaN, c: 0.25, t: 0.001 }]) { assert.throws(() => K.twoProduct(bad)); checks++; }
}

// ── 2 · Flotasyon kinetiği: kalma süresi dağılımı integrali, dinamik tank zinciri, piston akış sınırı ──
const lgamma = (n) => { let s = 0; for (let i = 2; i < n; i++) s += Math.log(i); return s; }; // ln (n−1)!
function rtdRecovery(k, tau, n) { // R = ∫ E(t)(1 − e^{−kt}) dt, E: n eşit tam karışımlı tankın gama dağılımı
  const a = n / tau, N = 240000, tMax = tau * (12 + 60 / n), h = tMax / N; let s = 0;
  for (let i = 0; i < N; i++) { const t = (i + 0.5) * h, E = Math.exp(n * Math.log(a) + (n - 1) * Math.log(t) - a * t - lgamma(n)); s += E * (1 - Math.exp(-k * t)); }
  return s * h;
}
function tankRecovery(k, tau, n) { // dC_j/dt = (C_{j−1} − C_j)·n/τ − k·C_j ; RK4 ile kararlı hâle kadar
  const a = n / tau, f = (C) => C.map((c, j) => a * ((j ? C[j - 1] : 1) - c) - k * c);
  let C = new Array(n).fill(0); const h = 0.02 / (a + k), steps = Math.ceil((40 * tau) / h);
  for (let i = 0; i < steps; i++) {
    const k1 = f(C), k2 = f(C.map((c, j) => c + (h * k1[j]) / 2)), k3 = f(C.map((c, j) => c + (h * k2[j]) / 2)), k4 = f(C.map((c, j) => c + h * k3[j]));
    C = C.map((c, j) => c + (h * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j])) / 6);
  }
  return 1 - C[n - 1];
}
for (const n of [1, 2, 4, 7, 12]) for (const tau of [0.5, 3, 10, 40]) for (const k of [0.0005, 0.02, 0.2, 1, 3]) {
  near(K.bankRecovery(k, tau, n), rtdRecovery(k, tau, n), 2e-6, `RTD n=${n} τ=${tau} k=${k}`);
}
for (const [n, tau, k] of [[1, 10, 1], [4, 10, 1], [4, 3, 0.2], [12, 5, 0.02], [3, 20, 0.002]]) near(K.bankRecovery(k, tau, n), tankRecovery(k, tau, n), 1e-7, 'tank zinciri');
for (const kt of [0.1, 1, 5]) near(K.bankRecovery(kt, 1, 200000), 1 - Math.exp(-kt), 2e-5, 'piston akış sınırı');
near(K.bankRecovery(1, 10, 4, 0.95), 0.95 * rtdRecovery(1, 10, 4), 2e-6, 'R∞ ölçeği');
near(K.CU_IN_CPY, 0.34628, 2e-5, 'kalkopirit Cu kesri');
{
  const r = lcg(5);
  for (let i = 0; i < 200; i++) {
    const o = { f: 0.002 + 0.028 * r(), kv: 0.2 + 2.8 * r(), kg: 0.0005 + 0.0195 * r(), tau: 0.5 + 39.5 * r(), n: 1 + Math.floor(12 * r()), Rinf: 0.8 + 0.2 * r() };
    const a = K.flotation(o);
    near(a.pull * a.c + (1 - a.pull) * a.t, o.f, 1e-12, 'flotasyon metal dengesi');
    ok(a.c <= K.CU_IN_CPY + 1e-12 && a.c > o.f && a.t < o.f, 'tenör sıralaması t < f < c ≤ mineral');
    near(K.twoProduct({ F: 1, f: o.f, c: a.c, t: a.t }).R, a.Rv, 1e-9, 'iki ürün formülü modeli geri verir');
    const b = K.flotation({ ...o, tau: o.tau * 1.5 });
    ok(b.Rv > a.Rv && b.c < a.c, 'süre uzadıkça verim artar, tenör düşer');
  }
}
// Sayım: bağımsız başvuru çevresinde 4,5σ; sayılan tenörlerden iki ürün formülü sayılan verimi geri verir
for (const cfg of [{ f: 0.01, kv: 1, kg: 0.002, tau: 10, n: 4, Rinf: 0.95 }, { f: 0.01, kv: 1, kg: 0.002, tau: 3, n: 4, Rinf: 0.95 }, { f: 0.02, kv: 0.4, kg: 0.01, tau: 6, n: 1, Rinf: 1 }, { f: 0.005, kv: 2.5, kg: 0.02, tau: 30, n: 12, Rinf: 0.8 }]) {
  const Rv = cfg.Rinf * rtdRecovery(cfg.kv, cfg.tau, cfg.n), Rg = rtdRecovery(cfg.kg, cfg.tau, cfg.n);
  for (let seed = 1; seed <= 8; seed++) {
    const m = K.flotationMC({ ...cfg, N: 30000, seed });
    ok(Math.abs(m.Rv - Rv) < 4.5 * Math.sqrt((Rv * (1 - Rv)) / m.N) + 1e-9, `sayım Rv tohum ${seed}: ${m.Rv} / ${Rv}`);
    ok(Math.abs(m.Rg - Rg) < 4.5 * Math.sqrt((Rg * (1 - Rg)) / m.N) + 1e-9, `sayım Rg tohum ${seed}: ${m.Rg} / ${Rg}`);
    near(K.twoProduct({ F: 1000, f: cfg.f, c: m.c, t: m.t }).R, m.Rv, 1e-9, 'sayılan tenör → sayılan verim');
    near(m.floatV / m.N, m.Rv, 1e-15, 'sayım oranı');
  }
}
ok(K.flotationMC({ f: 0.01, kv: 1, kg: 0.002, tau: 10, n: 4, Rinf: 0.95, seed: 3 }).floatV === K.flotationMC({ f: 0.01, kv: 1, kg: 0.002, tau: 10, n: 4, Rinf: 0.95, seed: 3 }).floatV, 'tohum yinelenebilir');

// ── 3 · Net getiri: bağımsız hesap + altın oran araması ──
function refNsr(o, tau) { // 1 t cevher için gelir − masraf, baştan
  const g = 63.546 / (63.546 + 55.845 + 64.12), mineral = o.f / g, Rv = o.Rinf * rtdRecovery(o.kv, tau, o.n), Rg = rtdRecovery(o.kg, tau, o.n);
  const concT = mineral * Rv + (1 - mineral) * Rg, cu = o.f * Rv, grade = cu / concT, paid = Math.max(0, grade - o.deduct) * concT;
  return paid * o.price - paid * o.rc - concT * o.tc;
}
for (const o of [{ f: 0.01, kv: 1, kg: 0.002, n: 4, Rinf: 0.95, price: 9000, tc: 140, deduct: 0.01, rc: 180 }, { f: 0.006, kv: 0.5, kg: 0.006, n: 2, Rinf: 0.9, price: 5000, tc: 300, deduct: 0.01, rc: 180 }, { f: 0.025, kv: 2, kg: 0.001, n: 10, Rinf: 1, price: 14000, tc: 50, deduct: 0.01, rc: 180 }]) {
  for (const tau of [0.5, 4, 10, 33]) near(K.nsrAt(o, tau).value, refNsr(o, tau), 3e-6, 'net getiri');
  const opt = K.nsrOptimum({ ...o, tauMin: 0.5, tauMax: 40, tauStep: 0.5 });
  ok(opt.points.length === 80 && opt.points.every((p) => p.value <= opt.best.value), 'kaba kuvvet en büyüğü');
  let a = 0.5, b = 40; const gr = (Math.sqrt(5) - 1) / 2, fn = (t) => K.nsrAt(o, t).value; // tek tepeli eğride altın oran
  for (let i = 0; i < 80; i++) { const c = b - gr * (b - a), d = a + gr * (b - a); if (fn(c) > fn(d)) b = d; else a = c; }
  const tStar = (a + b) / 2;
  ok(Math.abs(tStar - opt.best.tau) <= 0.5 + 1e-9, `altın oran τ* = ${tStar}, ızgara ${opt.best.tau}`);
  ok(fn(tStar) >= opt.best.value - 1e-9 && fn(tStar) - opt.best.value < 0.02 * Math.abs(opt.best.value) + 0.05, 'sürekli en iyi ≥ ızgara en iyisi, fark küçük');
}
{
  const d = K.nsrOptimum({ f: 0.01, kv: 1, kg: 0.002, n: 4, Rinf: 0.95, price: 9000, tc: 140, deduct: 0.01, rc: 180, tauMin: 0.5, tauMax: 40, tauStep: 0.5 });
  near(d.best.tau, 7.5, 1e-12, 'varsayılan τ*'); near(d.best.value, 73.1014, 1e-5, 'varsayılan en iyi getiri');
}

// ── 4 · Kesme tenörü ve başabaş dekapajı ──
{
  const r = lcg(21);
  for (let i = 0; i < 100; i++) {
    const e = { price: 4000 + 10000 * r(), rec: 0.6 + 0.35 * r(), cProc: 5 + 25 * r(), cMine: 1 + 5 * r() }, k = K.cutoff(e);
    const v = (g) => K.blockValues({ grade: Float64Array.of(g), ...e, tonnes: 2700 });
    near(v(k.breakEven).value[0], 0, 1e-9, 'başabaş tenöründe blok değeri sıfır');
    near(v(k.mill * 0.999).value[0], -2700 * e.cMine, 1e-12, 'eşik altı blok atık'); ok(v(k.mill * 1.001).ore[0] === 1 && v(k.mill * 0.999).ore[0] === 0, 'değirmen eşiği');
    const g = k.breakEven * (1.2 + 4 * r()), sr = K.breakEvenStrip({ g, ...e });
    near(v(g).value[0] + sr * v(0).value[0], 0, 1e-9, 'bir cevher bloğu + SR atık bloğu = 0');
  }
  const k = K.cutoff({ price: 9000, rec: 0.88, cProc: 12, cMine: 2.5 });
  near(k.mill, 12 / 7920, 1e-14, 'varsayılan değirmen eşiği'); near(k.breakEven, 14.5 / 7920, 1e-14, 'varsayılan başabaş');
  near(K.breakEvenStrip({ g: 0.006, price: 9000, rec: 0.88, cProc: 12, cMine: 2.5 }), (47.52 - 14.5) / 2.5, 1e-12, 'varsayılan başabaş dekapajı');
}

// ── 5 · Nihai ocak: koni tanımından kaba kuvvet ve en büyük akış ──
const lateral = (slope, d) => (slope === 1 ? d : slope === 2 ? Math.floor(d / 2) : 2 * d); // d blok yukarıda koninin yarı genişliği
function coneOf(nx, nz, slope, z, x) { // null: koni model dışına taşıyor
  const out = [];
  for (let d = 1; d <= z; d++) { const w = lateral(slope, d); for (let xx = x - w; xx <= x + w; xx++) { if (xx < 0 || xx >= nx) return null; out.push((z - d) * nx + xx); } }
  return out;
}
function refBrute(nx, nz, slope, value) {
  const N = nx * nz, cone = []; for (let z = 0; z < nz; z++) for (let x = 0; x < nx; x++) cone.push(coneOf(nx, nz, slope, z, x));
  let best = 0, valid = 0;
  for (let s = 0; s < 1 << N; s++) {
    let good = true, sum = 0;
    for (let i = 0; i < N && good; i++) if ((s >> i) & 1) { if (!cone[i]) good = false; else { for (const j of cone[i]) if (!((s >> j) & 1)) { good = false; break; } sum += value[i]; } }
    if (good) { valid++; if (sum > best) best = sum; }
  }
  return { best, valid };
}
function maxClosure(nx, nz, slope, value) { // Picard: kaynak → artı bloklar, eksi bloklar → kuyu, öncelik yayları sonsuz; Dinic
  const N = nx * nz, S = N, T = N + 1, head = new Int32Array(N + 2).fill(-1), to = [], cap = [], nxt = [];
  const add = (u, v, c) => { to.push(v); cap.push(c); nxt.push(head[u]); head[u] = to.length - 1; to.push(u); cap.push(0); nxt.push(head[v]); head[v] = to.length - 1; };
  let pos = 0;
  for (let z = 0; z < nz; z++) for (let x = 0; x < nx; x++) {
    const i = z * nx + x, cone = coneOf(nx, nz, slope, z, x);
    if (!cone) { add(i, T, Infinity); continue; }
    if (value[i] > 0) { add(S, i, value[i]); pos += value[i]; } else if (value[i] < 0) add(i, T, -value[i]);
    for (const j of cone) if (Math.floor(j / nx) === z - 1 || (slope === 2 && Math.floor(j / nx) === z - 2)) add(i, j, Infinity);
  }
  let flow = 0; const level = new Int32Array(N + 2), it = new Int32Array(N + 2);
  const bfs = () => { level.fill(-1); level[S] = 0; const q = [S]; for (let h = 0; h < q.length; h++) { const u = q[h]; for (let e = head[u]; e >= 0; e = nxt[e]) if (cap[e] > 1e-9 && level[to[e]] < 0) { level[to[e]] = level[u] + 1; q.push(to[e]); } } return level[T] >= 0; };
  const dfs = (u, f) => { if (u === T) return f; for (; it[u] >= 0; it[u] = nxt[it[u]]) { const e = it[u], v = to[e]; if (cap[e] > 1e-9 && level[v] === level[u] + 1) { const d = dfs(v, Math.min(f, cap[e])); if (d > 0) { cap[e] -= d; cap[e ^ 1] += d; return d; } } } return 0; };
  while (bfs()) { for (let i = 0; i < N + 2; i++) it[i] = head[i]; for (let f; (f = dfs(S, Infinity)) > 0;) flow += f; }
  return pos - flow;
}
const validPit = (nx, nz, slope, inPit) => { for (let z = 0; z < nz; z++) for (let x = 0; x < nx; x++) if (inPit[z * nx + x]) { const c = coneOf(nx, nz, slope, z, x); if (!c || c.some((j) => !inPit[j])) return false; } return true; };
{
  const r = lcg(77);
  for (const [nx, nz] of [[4, 4], [5, 3], [8, 2], [6, 3], [3, 5], [16, 1]]) for (const slope of [2, 1, 0.5]) for (let rep = 0; rep < (nx * nz > 16 ? 6 : 25); rep++) {
    const value = Float64Array.from({ length: nx * nz }, () => (r() < 0.35 ? 300 * r() : -60 * r()));
    const ref = refBrute(nx, nz, slope, value), dp = K.ultimatePit({ nx, nz, value, slope });
    near(dp.value, ref.best, 1e-10, `DP = kaba kuvvet ${nx}×${nz} şev ${slope}`);
    ok(validPit(nx, nz, slope, dp.inPit), 'DP ocağı öncelik koşulunu sağlar');
    const bf = K.bruteForcePit({ nx, nz, value, slope });
    near(bf.value, ref.best, 1e-10, 'çekirdek kaba kuvveti = başvuru kaba kuvveti'); ok(bf.valid === ref.valid && bf.tried === 2 ** (nx * nz), 'geçerli ocak sayısı');
    near(maxClosure(nx, nz, slope, value), ref.best, 1e-9, 'en büyük akış = kaba kuvvet');
  }
  for (const [nx, nz] of [[6, 3], [32, 8], [48, 12]]) for (let seed = 1; seed <= 20; seed++) {
    const m = K.blockModel({ nx, nz, seed, peak: 0.008, depth: 0.6 });
    ok(m.grade.length === nx * nz && m.grade.every((g) => g > 0 && g < 0.2), 'tenörler artı ve makul');
    for (const slope of [2, 1, 0.5]) {
      let prev = null;
      for (const price of nx > 32 ? [6000, 9000, 12000] : [4000, 6000, 7500, 9000, 10500, 12000, 14000]) {
        const e = { price, rec: 0.88, cProc: 12, cMine: 2.5 }, bv = K.blockValues({ grade: m.grade, ...e, tonnes: 2700 });
        const dp = K.ultimatePit({ nx, nz, value: bv.value, slope });
        near(dp.value, maxClosure(nx, nz, slope, bv.value), 1e-9, `DP = en büyük akış ${nx}×${nz} tohum ${seed} şev ${slope} fiyat ${price}`);
        ok(validPit(nx, nz, slope, dp.inPit), 'geçerli ocak');
        let sum = 0, cnt = 0; dp.inPit.forEach((b, i) => { if (b) { sum += bv.value[i]; cnt++; } }); near(sum, dp.value, 1e-10, 'ocak değeri blok toplamı'); ok(cnt === dp.blocks, 'blok sayısı');
        const nv = K.naivePit({ nx, nz, grade: m.grade, value: bv.value, slope, cutoff: K.cutoff(e).breakEven });
        ok(validPit(nx, nz, slope, nv.inPit) && nv.value <= dp.value + 1e-6, 'saf kural geçerli ve en iyiden iyi değil');
        const st = K.pitStats({ inPit: dp.inPit, ore: bv.ore, grade: m.grade, tonnes: 2700 });
        ok(st.oreBlocks + st.wasteBlocks === dp.blocks && Math.abs(st.oreT + st.wasteT - dp.blocks * 2700) < 1e-6, 'cevher + atık = kazılan');
        if (prev) { ok(dp.blocks >= prev.blocks && dp.value >= prev.value - 1e-6, 'fiyat artınca ocak küçülmez'); ok(prev.inPit.every((b, i) => !b || dp.inPit[i]), 'ocaklar iç içe'); }
        prev = dp;
      }
    }
  }
  // Şev dikleştikçe (kısıt gevşedikçe) değer azalmaz
  for (let seed = 1; seed <= 20; seed++) {
    const m = K.blockModel({ nx: 32, nz: 8, seed, peak: 0.008, depth: 0.6 }), bv = K.blockValues({ grade: m.grade, price: 9000, rec: 0.88, cProc: 12, cMine: 2.5, tonnes: 2700 });
    const v = [0.5, 1, 2].map((slope) => K.ultimatePit({ nx: 32, nz: 8, value: bv.value, slope }).value);
    ok(v[0] <= v[1] + 1e-6 && v[1] <= v[2] + 1e-6, 'yatık ≤ 45° ≤ dik');
  }
  const m = K.blockModel({ nx: 32, nz: 8, seed: 1, peak: 0.008, depth: 0.6 }), bv = K.blockValues({ grade: m.grade, price: 9000, rec: 0.88, cProc: 12, cMine: 2.5, tonnes: 2700 }), dp = K.ultimatePit({ nx: 32, nz: 8, value: bv.value, slope: 1 });
  ok(dp.blocks === 100, 'varsayılan ocak 100 blok'); near(dp.value / 1e6, 1.617, 5e-4, 'varsayılan ocak değeri');
  ok(K.ultimatePit({ nx: 4, nz: 2, value: new Float64Array(8).fill(-1), slope: 1 }).blocks === 0, 'hepsi atıksa ocak yok');
  assert.throws(() => K.bruteForcePit({ nx: 7, nz: 3, value: new Float64Array(21), slope: 1 })); assert.throws(() => K.ultimatePit({ nx: 4, nz: 2, value: new Float64Array(8), slope: 3 })); checks += 2;
}

// ── 6 · Bond: x değişkeninde orta nokta integrali, kademe toplamı, ölçekler ──
{
  const r = lcg(3);
  for (let i = 0; i < 60; i++) {
    const Wi = 6 + 18 * r(), P = 20 + 280 * r(), F = P * (2 + 400 * r());
    // dE = 5·Wi·x^(−3/2) dx, geometrik ızgarada orta nokta
    let E = 0; const n = 20000, q = Math.pow(F / P, 1 / n); for (let j = 0, x = P; j < n; j++, x *= q) { const xm = x * Math.sqrt(q); E += 5 * Wi * Math.pow(xm, -1.5) * (x * q - x); }
    near(K.bond({ Wi, F80: F, P80: P }), E, 1e-6, 'Bond kapalı formülü = integral'); near(K.bondNumeric({ Wi, F80: F, P80: P }), E, 1e-6, 'Simpson = orta nokta');
    near(K.bond({ Wi: 2 * Wi, F80: F, P80: P }), 2 * K.bond({ Wi, F80: F, P80: P }), 1e-12, 'W ∝ Wi');
    const mid = Math.sqrt(F * P), c = K.comminution({ Wi, sizes: [F, mid * 3 > F ? (F + P) / 2 : mid * 3, mid, P], throughput: 750 });
    near(c.total, c.direct, 1e-12, 'kademe toplamı = tek adım'); near(c.power, 750 * c.direct, 1e-12, 'güç'); near(c.stages.reduce((s, x) => s + x.power, 0), c.power, 1e-12, 'kademe güçleri');
  }
  near(K.bond({ Wi: 14, F80: 1e30, P80: 100 }), 14, 1e-12, 'Wi tanımı: sonsuz iriden 100 µm');
  near(K.bond({ Wi: 14, F80: 1e30, P80: 50 }) / K.bond({ Wi: 14, F80: 1e30, P80: 100 }), Math.SQRT2, 1e-12, 'P yarıya → √2');
  const d = K.comminution({ Wi: 14, sizes: [500000, 150000, 12000, 100], throughput: 1000 });
  near(d.total, 13.80201, 1e-6, 'varsayılan toplam'); near(d.stages[2].W / d.total, 0.92175, 1e-4, 'öğütme payı');
  assert.throws(() => K.bond({ Wi: 14, F80: 100, P80: 100 })); assert.throws(() => K.bond({ Wi: 0, F80: 200, P80: 100 })); checks += 2;
}

// ── 7 · Havalandırma ──
{
  const r = lcg(9), bisect = (f, lo, hi) => { for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (f(lo) * f(m) <= 0) hi = m; else lo = m; } return (lo + hi) / 2; };
  near(K.airwayR({ k: 0.012, L: 1500, per: 14, A: 12 }), (0.012 * 1500 * 14) / 1728, 1e-14, 'R = kLÇ/A³');
  for (let i = 0; i < 80; i++) {
    const Ra = 0.01 + r(), Rb = 0.01 + r(), Rc = 0.01 + r(), Q = 20 + 200 * r();
    // Paralel: eşit basınç düşüşünü sağlayan paylaşımı ikiye bölmeyle bul
    const qa = bisect((x) => Ra * x * x - Rb * (Q - x) * (Q - x), 0, Q), dp = Ra * qa * qa;
    near(K.parallelR([Ra, Rb]), dp / (Q * Q), 1e-11, 'paralel eşdeğer'); const sp = K.splitParallel({ Q, Ra, Rb });
    near(sp.Qa, qa, 1e-10, 'Hardy Cross paylaşımı'); near(sp.Qa + sp.Qb, Q, 1e-13, 'süreklilik'); near(Ra * sp.Qa ** 2, Rb * sp.Qb ** 2, 1e-10, 'eşit düşüş'); ok(sp.iterations < 20, 'yakınsama');
    // üç kol: kol debileri √(Δp/R) toplamı
    const dp3 = bisect((p) => Math.sqrt(p / Ra) + Math.sqrt(p / Rb) + Math.sqrt(p / Rc) - Q, 0, (Ra + Rb + Rc) * Q * Q);
    near(K.parallelR([Ra, Rb, Rc]), dp3 / (Q * Q), 1e-10, 'üç paralel kol'); near(K.seriesR([Ra, Rb, Rc]), Ra + Rb + Rc, 1e-14, 'seri');
    ok(K.parallelR([Ra, Rb]) < Math.min(Ra, Rb), 'paralel eşdeğer en küçükten küçük');
    // Çalışma noktası: Newton (türev elle) ile ikinci kök bulucu
    const R = 0.005 + 0.5 * r(), p0 = 500 + 3500 * r(), s = 0.5 + r(), Qm = 250 * s, o = { R, p0, Qmax: 250, speed: s };
    let x = 0.9; for (let j = 0; j < 80; j++) { const g = s * s * p0 * (1 + 0.3 * x - 0.5 * x * x - 0.8 * x ** 3) - R * Qm * Qm * x * x, dg = s * s * p0 * (0.3 - x - 2.4 * x * x) - 2 * R * Qm * Qm * x; x -= g / dg; }
    const op = K.operatingPoint(o);
    near(op.Q, x * Qm, 1e-10, 'çalışma noktası: ikiye bölme = Newton'); near(K.fanPressure(op.Q, o), R * op.Q * op.Q, 1e-9, 'fan basıncı = direnç basıncı'); ok(op.stall === x < K.FAN_STALL, 'kararsız bölge bayrağı');
    // Benzerlik yasaları: devir × 2 → debi × 2, basınç × 4, güç × 8
    const o2 = K.operatingPoint({ ...o, speed: 2 * s });
    near(o2.Q / op.Q, 2, 1e-10, 'Q ∝ devir'); near(o2.p / op.p, 4, 1e-10, 'Δp ∝ devir²'); near(Math.log((o2.p * o2.Q) / (op.p * op.Q)) / Math.log(o2.Q / op.Q), 3, 1e-9, 'küp yasası üssü');
  }
  { const x = K.FAN_STALL, h = 1e-6, f = (y) => K.fanPressure(250 * y, { p0: 2000, Qmax: 250 }); ok(Math.abs((f(x + h) - f(x - h)) / (2 * h)) < 1e-3 && f(x) > f(0) && f(1) === 0 || Math.abs(f(1)) < 1e-9, 'fan eğrisinin tepesi ve serbest üfleme'); }
  { const Rs = K.airwayR({ k: 0.012, L: 600, per: Math.PI * 5, A: (Math.PI * 25) / 4 }), Ra = K.airwayR({ k: 0.012, L: 1500, per: 14, A: 12 }), Rb = K.airwayR({ k: 0.012, L: 2500, per: 14, A: 12 }), R = K.seriesR([Rs, K.parallelR([Ra, Rb]), Rs]), op = K.operatingPoint({ R, p0: 2000, Qmax: 250, speed: 1 });
    near(R, 0.0761890, 1e-6, 'varsayılan direnç'); near(op.Q, 148.1243, 1e-6, 'varsayılan debi'); near(K.splitParallel({ Q: op.Q, Ra, Rb }).Qa, 83.4693, 1e-6, 'varsayılan A kolu'); }
  // Metan: analitik üstel çözüm, kararlı hâl, gereken hava, fan durunca süre
  for (let i = 0; i < 60; i++) {
    const q = 0.05 + 1.95 * r(), Q = 5 + 150 * r(), V = 6000 + 42000 * r(), c0 = 0.02 * r(), css = q / (Q + q), tc = V / (Q + q), t = tc * (0.2 + 3 * r());
    near(K.methaneTransient({ q, Q, V, c0, tEnd: t, steps: 400 }), css + (c0 - css) * Math.exp(-t / tc), 1e-9, 'metan geçici çözüm');
    near(K.methaneSteady({ q, Q }), css, 1e-14, 'metan kararlı'); near(K.methaneTransient({ q, Q, V, c0: 0, tEnd: 25 * tc, steps: 1500 }), css, 1e-9, 'RK4 kararlı hâle varır');
    const lim = 0.005 + 0.015 * r(), need = K.methaneAirflow({ q, limit: lim }); near(K.methaneSteady({ q, Q: need }), lim, 1e-12, 'gereken hava tam sınırı verir');
    const cs = Math.min(css, lim * 0.9), tl = K.timeToLimit({ q, V, c0: cs, limit: lim });
    near(K.methaneTransient({ q, Q: 0, V, c0: cs, tEnd: tl, steps: 400 }), lim, 1e-9, 'fan durunca sınıra varış süresi');
  }
  near(K.timeToLimit({ q: 0.3, V: 18000, c0: 0.02, limit: 0.01 }), 0, 1e-15, 'sınır aşıksa süre 0');
  assert.throws(() => K.airwayR({ k: 0, L: 1, per: 1, A: 1 })); assert.throws(() => K.methaneAirflow({ q: 1, limit: 0 })); assert.throws(() => K.operatingPoint({ R: 0, p0: 2000, Qmax: 250 })); checks += 3;
}
console.log(`G maden-muhendisligi: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek denetimi PASS`);

if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright');
  const { createServer } = await import('node:http');
  const { join, extname } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url));
  const server = createServer((req, res) => {
    const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream');
    res.end(fs.readFileSync(file));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  let browser;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [['light', 390], ['dark', 1280]]) {
      const before = checks, ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width < 500 ? 2 : 1, locale: 'tr-TR' });
      await ctx.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(8000);
      const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/maden-muhendisligi.html`); await page.waitForTimeout(400);
      const click = (id) => page.locator('#' + id).click(), read = (id) => page.locator('#' + id).textContent();
      const set = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event(e.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })); }, v);
      const has = async (id, text) => { const t = await read(id); if (process.env.G_DEBUG && !t.includes(text)) { console.log(`  ${theme} ${id}: "${t}" içinde "${text}" yok`); return; } assert(t.includes(text), `${theme} ${id}: "${t}" içinde "${text}" yok`); checks++; };
      const noOverflow = async (label) => { ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${theme} yatay taşma: ${label}`); };
      const sane = async (label) => { const t = await page.locator('main.app-content').innerText(); ok(!/NaN|undefined|Infinity|\[object/.test(t), `${theme} bozuk metin (${label}): ${(t.match(/.{0,30}(NaN|undefined|Infinity|\[object).{0,30}/) || [''])[0]}`); };
      const painted = async (id) => { ok(assertCanvasDrawn(await canvasInk(page, '#' + id), { minDistinct: 4, label: `${theme} ${id}` }), `${theme} ${id} boş`); };
      ok((await page.title()).startsWith('Maden Mühendisliği'), 'başlık');
      ok(await page.evaluate(() => Object.isFrozen(MadenLab) && !Object.getOwnPropertyDescriptor(window, 'MadenLab').writable), 'çekirdek dondurulmuş');
      // Her denetimin etiketi, her kaydırıcının çıktısı var; hazır değerler adım ızgarasında
      ok(await page.evaluate(() => [...document.querySelectorAll('main input, main select')].every((e) => e.id && document.querySelector(`label[for="${e.id}"]`))), 'etiketler');
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type=range]')].every((e) => { const n = (+e.value - +e.min) / +e.step; return Math.abs(n - Math.round(n)) < 1e-6 && +e.value >= +e.min && +e.value <= +e.max; })), 'varsayılanlar adım ızgarasında');
      ok(await page.evaluate(() => [...document.querySelectorAll('main canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), 'canvas erişilebilir adları');

      // 01 · Tenör ve verim
      await has('cFOut', '1.000 t/h'); await has('cfOut', '%1,00'); await has('tpC', '36,9 t/h'); await has('tpT', '963,1 t/h'); await has('tpR', '%92,30'); await has('tpE', '25,0 kat'); await has('tpK', '27,1 : 1'); await has('tpMc', '9,230 t/h'); await has('tpMt', '0,770 t/h'); await has('tpRes', '0,000000 · 0,000000');
      await has('flR', '%94,38'); await has('flRn', 'kuram %94,37'); await has('flC', '%20,19'); await has('flCn', 'kuram %20,32'); await has('flChk', '%94,38'); await has('flT', '%0,059'); await has('flPull', '%4,64'); await has('nsrHere', '72,64 $/t'); await has('nsrBest', '73,10 $/t'); await has('nsrBestn', 'τ = 7,5 dk');
      for (const id of ['sankeyCanvas', 'grCanvas', 'nsrCanvas']) await painted(id);
      await click('cBest'); await has('tauOut', '7,5 dk'); await has('nsrHere', '73,10 $/t'); await has('flStatus', 'en iyisi');
      await click('cShort'); await has('tauOut', '3,0 dk'); await has('flStatus', 'kısa'); await click('cLong'); await has('tauOut', '30,0 dk'); await has('flStatus', 'uzun'); await has('flRn', 'kuram %94,98');
      await click('cOne'); await has('ncellOut', '1'); await has('flRn', 'kuram %91,94');
      await click('cRecount'); await has('flStatus', 'tohum 2'); await has('flR', '%9');
      await set('ct', 1); await set('cf', 0.5); await has('tpC', 'Tanımsız'); await has('tpR', 'Tanımsız'); await has('tpStatus', 't < f'); await sane('t > f');
      await set('ct', 0.5); await has('tpR', 'Tanımsız'); await set('ct', 0.49); await has('tpR', '%');
      await click('concReset'); await has('tpR', '%92,30'); await has('flR', '%94,38'); await has('flStatus', 'tohum 1'); await has('tauOut', '10,0 dk');
      for (const edge of ['min', 'max']) { await page.evaluate((edge) => document.querySelectorAll('#panel-conc input[type=range]').forEach((e) => { e.value = e[edge]; e.dispatchEvent(new Event('input', { bubbles: true })); }), edge); await sane('01 ' + edge); await noOverflow('01 ' + edge); }
      await click('concReset'); await noOverflow('01');

      // 02 · Açık ocak
      await click('tab-pit'); await has('coMill', '%0,152'); await has('coBE', '%0,183'); await has('coSR', '13,21 t/t'); await has('pitV', '1,617 M$'); await has('pitOre', '151,2 kt'); await has('pitWaste', '118,8 kt'); await has('pitSR', '0,79 t/t'); await has('pitNaive', '1,385 M$'); await has('pitBF', 'Yalnız 6 × 3'); await has('pitStatus', '100 blok');
      await painted('pitCanvas'); await painted('sweepCanvas');
      const tons = async () => { const [a, b] = await Promise.all([read('pitOre'), read('pitWaste')]); return parseFloat(a.replace('.', '').replace(',', '.')) + parseFloat(b.replace('.', '').replace(',', '.')); };
      const t9 = await tons(); await click('pLow'); await has('pPriceOut', '6.000 $/t'); const t6 = await tons(); await click('pHigh'); await has('pPriceOut', '12.000 $/t'); const t12 = await tons(); ok(t6 < t9 && t9 < t12, `fiyatla ocak büyür: ${t6} < ${t9} < ${t12}`);
      await set('pPrice', 4000); await has('pitV', '0,000 M$'); await has('pitSR', 'Ocak yok'); await has('pitStatus', 'kazmaya değer ocak yok'); await sane('ocak yok');
      await click('pitReset'); await set('pMine', 6); const v6 = await read('pitV'); await set('pMine', 1); ok(parseFloat((await read('pitV')).replace(',', '.')) > parseFloat(v6.replace(',', '.')), 'kazı maliyeti düşünce değer artar');
      await click('pitReset'); await click('pSmall'); await has('pitBFn', 'fark 0,000000 M$'); await has('pitBFn', '262.144'); const dpS = (await read('pitV')); await has('pitBF', dpS); await has('pitNaiven', 'en iyi ocakla aynı'); await has('pitStatus', 'modelin dar kesitinin sonucudur'); await click('pSmallHard'); await has('pPriceOut', '5.500 $/t'); await has('pitV', '0,036 M$'); await has('pitBF', '0,036 M$'); await has('pitBFn', 'fark 0,000000 M$'); await has('pitNaive', '0,015 M$'); await has('pitNaiven', 'en iyiden 0,020 M$ eksik'); await click('pitReset'); await click('pSmall');
      for (const slope of ['2', '1', '0.5']) for (const seed of [1, 4, 9, 17]) for (const price of [5000, 9000, 14000]) { await set('pSlope', slope); await set('pSeed', seed); await set('pPrice', price); await has('pitBFn', 'fark 0,000000 M$'); await has('pitBF', await read('pitV')); }
      await click('pitReset'); await has('pitV', '1,617 M$'); await click('pDeep'); await has('pDepthOut', '%80'); await sane('derin');
      await set('pGrade', 0.2); await set('pProc', 30); await has('coSR', 'Yok'); await click('pitReset');
      for (const grid of ['small', 'mid', 'large']) for (const edge of ['min', 'max']) { await set('pGrid', grid); await page.evaluate((edge) => document.querySelectorAll('#panel-pit input[type=range]').forEach((e) => { e.value = e[edge]; e.dispatchEvent(new Event('input', { bubbles: true })); }), edge); await sane('02 ' + grid + edge); await noOverflow('02 ' + grid + edge); }
      await click('pitReset'); await has('pitV', '1,617 M$'); ok((await page.locator('#pGrid').inputValue()) === 'mid' && (await page.locator('#pSlope').inputValue()) === '1', 'ızgara ve şev sıfırlandı');

      // 03 · Ufalama ve havalandırma
      await click('tab-mill'); await has('bTot', '13,802 kWh/t'); await has('bTotn', 'fark 0,000000'); await has('bNum', '13,802 kWh/t'); await has('bShare', '%92,2'); await has('bPow', '13,80 MW'); await has('bondRows', '12,722'); await has('bondStatus', 'ampirik');
      await has('vR', '0,07619'); await has('vQ', '148,1 m³/s'); await has('vDp', '1.672 Pa'); await has('vQa', '83,47 m³/s'); await has('vQan', 'kuram 83,47'); await has('vPow', '247,6 kW'); await has('vExp', '3,000'); await has('vC', '%0,358'); await has('vCn', '%0,358'); await has('vNeed', '29,7 m³/s'); await has('vStop', '6,5 dk');
      for (const id of ['bondCanvas', 'ventCanvas', 'netCanvas']) await painted(id);
      await click('bSoft'); await has('bWiOut', '10,0 kWh/t'); await has('bTot', '9,859 kWh/t'); await click('bHard'); await has('bTot', '17,745 kWh/t'); await click('bMid'); await has('bTot', '13,802 kWh/t');
      await click('bFine'); await has('bPgOut', '25 µm'); await has('bondStatus', 'Uyarı'); await has('bTot', '27,802 kWh/t');
      await click('vHalf'); await has('vSpeedOut', '%50'); await has('vQ', '74,1 m³/s'); await has('vPow', '31,0 kW'); await has('vExp', '3,000');
      await click('vGas'); await has('vqOut', '1,50 m³/s'); await has('ventStatus', 'sınırının üstünde'); await has('vStop', 'Sınır zaten aşık');
      await click('millReset'); await has('vQ', '148,1 m³/s'); await has('bTot', '13,802 kWh/t'); await has('vStop', '6,5 dk');
      await set('vLa', 4000); await set('vLb', 4000); await set('vLs', 1200); await set('vD', 3); await set('vK', '0.018'); await has('ventStatus', 'Uyarı'); await sane('kararsız'); await click('millReset');
      for (const edge of ['min', 'max']) { await page.evaluate((edge) => document.querySelectorAll('#panel-mill input[type=range]').forEach((e) => { e.value = e[edge]; e.dispatchEvent(new Event('input', { bubbles: true })); }), edge); await sane('03 ' + edge); await noOverflow('03 ' + edge); }
      await click('millReset'); await noOverflow('03');

      // Klavye: sekmeler ve R
      await page.locator('#tab-mill').focus(); await page.keyboard.press('Home'); ok((await page.locator('#tab-conc').getAttribute('aria-selected')) === 'true', 'Home'); await page.keyboard.press('ArrowRight'); ok((await page.locator('#tab-pit').getAttribute('aria-selected')) === 'true', 'ArrowRight'); await page.keyboard.press('End'); ok((await page.locator('#tab-mill').getAttribute('aria-selected')) === 'true', 'End'); await page.keyboard.press('ArrowRight'); ok((await page.locator('#tab-conc').getAttribute('aria-selected')) === 'true', 'sarma'); await page.keyboard.press('ArrowLeft'); ok((await page.locator('#tab-mill').getAttribute('aria-selected')) === 'true', 'ArrowLeft');
      ok(await page.evaluate(() => document.querySelectorAll('[role=tabpanel]:not([hidden])').length === 1 && [...document.querySelectorAll('[role=tab]')].filter((t) => t.tabIndex === 0).length === 1), 'tek açık panel, tek sekme durağı');
      await set('bWi', 20); await page.locator('h1').click(); await page.keyboard.press('r'); await has('bWiOut', '14,0 kWh/t');
      await set('bWi', 20); await page.locator('#bWi').focus(); await page.keyboard.press('r'); await has('bWiOut', '20,0 kWh/t'); await click('millReset');
      assert.deepEqual(errors, [], `${theme}: konsol hatası`); checks++;
      console.log(`G maden-muhendisligi: ${checks - before} arayüz denetimi (${width} px, ${theme}) PASS`);
      await ctx.close();
    }
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
