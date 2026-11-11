// Gemi makineleri laboratuvarı: çekirdek fizik için bağımsız yöntemlerle kalıcı denetim.
//   node scripts/check-d-marine.mjs            → yalnız node (çekirdek) denetimleri
//   node scripts/check-d-marine.mjs --browser  → + Playwright arayüz denetimleri (390 açık, 1280 koyu)
// HTML uygulamanın kendisidir; buradaki referanslar onun kapalı formüllerini yinelemez:
// ∮p dV Simpson kuralıyla V üzerinde, yüzme merkezi sütun ve ızgara integraliyle, GZ dik bordalı formülle
// ve dinamik stabilite özdeşliğiyle (∫GZ dθ = B ile G'nin düşey aralığındaki artış) sınanır.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const SLUG = 'gemi-makineleri-isletme-muhendisligi';
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL-BEGIN / KERNEL-END sınırları gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source + ';globalThis.K = MarineLab;', context);
const K = context.K;

let checks = 0;
const near = (actual, expected, tol = 1e-9, label = '') => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(1, Math.abs(expected)), `${label} ${actual} ≠ ${expected} (tol ${tol})`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };
const simpson = (fn, a, b, n = 2000) => { const h = (b - a) / n; let s = fn(a) + fn(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * fn(a + i * h); return (h * s) / 3; };
const RAD = Math.PI / 180;

/* ───── 1. Karma çevrim ───── */
const baseEngine = { bore: 0.6, stroke: 2.4, rpm: 90, cyl: 6, lambda: 0.4 };
ok(Object.isFrozen(K) && Object.isFrozen(K.constants), 'API donuk olmalı');
for (const r of [6, 12, 16, 22]) for (const alpha of [1, 1.3, 2.5]) for (const rho of [1, 1.6, 3]) for (const gamma of [1.3, 1.4]) for (const [p1, T1] of [[1e5, 300], [3.5e5, 320]]) {
  const c = { r, alpha, rho, gamma, p1, T1, ...baseEngine };
  const k = K.dualCycle(c), e = K.engine(c), st = k.states;
  // durum noktaları: ideal gaz ve izantrop bağıntıları
  for (const s of st) near(s.p * s.v, 287 * s.T, 1e-12, 'pv=RT');
  near(st[0].p * st[0].v ** gamma, st[1].p * st[1].v ** gamma, 1e-12, 'izantrop 1-2');
  near(st[3].p * st[3].v ** gamma, st[4].p * st[4].v ** gamma, 1e-12, 'izantrop 4-5');
  near(st[2].p, st[3].p, 1e-14); near(st[1].v, st[2].v, 1e-14); near(st[4].v, st[0].v, 1e-14);
  near(e.V1 / e.V2, r, 1e-12); near(e.V1 - e.V2, Math.PI * 0.09 * 2.4, 1e-12);
  if (alpha === 1 && rho === 1) { ok(k.eta === null && !k.hasHeat, 'ısı yokken verim tanımsız'); near(k.w, 0, 1e-9); near(K.indicatedWork(c).W / (e.mass * k.cv * T1), 0, 1e-12); ok(K.indicatedWork(c).eta === null, 'sayısal verim tanımsız'); continue; }
  // (a) kapalı formül ↔ birinci yasa
  near(k.eta, (k.qin - k.qout) / k.qin, 1e-11, 'η kapalı = 1 − qç/qg');
  // (b) bağımsız ∮p dV: V üzerinde Simpson (yalnız durum 1 ve çevrim tanımından)
  const pc = (V) => p1 * (e.V1 / V) ** gamma, pe = (V) => st[2].p * (e.V4 / V) ** gamma;
  const Wref = -simpson(pc, e.V2, e.V1) + st[2].p * (e.V4 - e.V2) + simpson(pe, e.V4, e.V1);
  near(e.W, Wref, 1e-9, 'W kuram ↔ Simpson');
  // (c) sayfanın "ölçülen" değeri: krank açısı adımlarıyla yamuk
  const n720 = K.indicatedWork(c, 720), n1440 = K.indicatedWork(c, 1440);
  near(n720.W, Wref, 2e-4, 'W krank(720) ↔ Simpson');
  ok(Math.abs(n1440.W - Wref) < 0.3 * Math.abs(n720.W - Wref) + 1e-12 * Wref, 'adım yarılanınca hata ~4 kat azalır');
  near(n720.eta, k.eta, 2e-4, 'η ölçülen ↔ kapalı');
  // sınır durumlar
  if (rho === 1) near(k.eta, 1 - r ** (1 - gamma), 1e-12, 'Otto sınırı');
  if (alpha === 1) near(k.eta, 1 - (r ** (1 - gamma) * (rho ** gamma - 1)) / (gamma * (rho - 1)), 1e-12, 'Diesel sınırı');
  ok(k.eta <= k.etaOtto + 1e-12 && k.eta < k.etaCarnot, 'η ≤ Otto(r) ve η < Carnot');
  near(e.mep, e.W / e.Vs, 1e-12); near(e.power, e.W * 6 * 1.5, 1e-12, 'iki zamanlı: devir başına bir iş');
  // krank açısından durum: uçlar ve süreklilik
  const tdc = K.cyclePoint(c, 0), bdc = K.cyclePoint(c, Math.PI), late = K.cyclePoint(c, 2 * Math.PI - 1e-9);
  near(tdc.V, e.V2, 1e-12); near(tdc.p, st[2].p, 1e-12); near(bdc.V, e.V1, 1e-12); near(bdc.p, st[4].p, 1e-9); near(late.p, st[1].p, 1e-6); near(late.T, st[1].T, 1e-6);
  if (rho > 1) near(K.cyclePoint(c, n720.theta4).V, e.V4, 1e-9, 'θ₄ düğümü V₄ üzerinde');
}
// krank–biyel kinematiği
for (const lambda of [0.25, 0.4, 0.5]) for (const S of [1, 2.4, 3.6]) {
  near(K.pistonTravel(0, S, lambda), 0, 1e-12); near(K.pistonTravel(Math.PI, S, lambda), S, 1e-12);
  for (const th of [0.3, 1.1, 2.6]) near(K.pistonTravel(th, S, lambda), K.pistonTravel(2 * Math.PI - th, S, lambda), 1e-12, 'simetri');
  // 90°'de piston strok ortasını geçmiştir: x = a + ℓ − √(ℓ² − a²) > a
  const a = S / 2, l = a / lambda; near(K.pistonTravel(Math.PI / 2, S, lambda), a + l - Math.sqrt(l * l - a * a), 1e-12); ok(K.pistonTravel(Math.PI / 2, S, lambda) > a, 'biyel eğikliği');
  // iş λ'dan bağımsız
  const c = { r: 16, alpha: 1.5, rho: 1.6, gamma: 1.4, p1: 1e5, T1: 300, ...baseEngine, stroke: S, lambda };
  near(K.indicatedWork(c, 1440).W, K.engine(c).W, 5e-5, 'iş λ’dan bağımsız');
}
// varsayılan durumun elle hesaplanan referansı
{
  const c = { r: 16, alpha: 1.5, rho: 1.6, gamma: 1.4, p1: 1e5, T1: 300, ...baseEngine }, k = K.dualCycle(c);
  near(k.states[1].T, 300 * 16 ** 0.4, 1e-12); near(k.states[1].T, 909.43, 1e-5); near(k.states[2].p / 1e5, 72.76, 1e-4); near(k.states[3].T, 2182.6, 1e-4);
  near(k.eta, 0.644557, 1e-5, 'varsayılan verim');
}
for (const bad of [{ r: 1 }, { alpha: 0.9 }, { rho: 0.5 }, { gamma: 1 }, { p1: 0 }, { T1: NaN }]) { assert.throws(() => K.dualCycle({ r: 16, alpha: 1.5, rho: 1.6, gamma: 1.4, p1: 1e5, T1: 300, ...bad })); checks++; }
const cycleChecks = checks;

/* ───── 2. Pervane yasası ve sefer yakıtı ───── */
const baseVoyage = { P0: 12, v0: 15, n0: 100, v: 12, dist: 6000, sfcMin: 170, k: 0.35, Paux: 0, m: 3, cf: 3.114 };
{
  const r = K.voyage(baseVoyage);
  near(r.load, 0.512, 1e-12); near(r.P, 6144, 1e-12); near(r.n, 80, 1e-12); near(r.hours, 500, 1e-12);
  near(r.sfc, 170 * (1 + 0.35 * (0.512 - 0.75) ** 2), 1e-12); near(r.mainDay, (6144 * r.sfc * 24) / 1e6, 1e-12);
  near(r.fuel, (6144 * r.sfc * 500) / 1e6, 1e-12); near(r.co2, r.fuel * 3.114, 1e-12);
}
for (const m of [2.5, 3, 3.7, 4.5]) for (const v of [4, 7.3, 12, 15]) for (const P0 of [4, 12, 60]) {
  const pure = { ...baseVoyage, m, v, P0, k: 0 };
  near(K.logSlope(pure, 'P'), m, 1e-6, 'P eğimi'); near(K.logSlope(pure, 'n'), m / 3, 1e-6); near(K.logSlope(pure, 'dayFuel'), m, 1e-6);
  near(K.logSlope(pure, 'hours'), -1, 1e-6); near(K.logSlope(pure, 'fuel'), m - 1, 1e-6, 'sefer yakıtı eğimi');
  // pervane yasası: P/P0 = (n/n0)³ her m için
  const r = K.voyage(pure); near(r.P / (P0 * 1000), (r.n / 100) ** 3, 1e-12, 'P ∝ n³');
  // bağımsız: yakıt = ∫ günlük tüketim dt (sabit hızda) ve oran yasası
  near(r.fuel, r.dayFuel * r.days, 1e-12); near(K.voyage({ ...pure, v: v * 0.8 }).fuel / r.fuel, 0.8 ** (m - 1), 1e-12, 'hız %20 kesilince');
  // yardımcı yük ile en az yakıtlı hız: sayısal arama ↔ kapalı formül (k = 0)
  for (const Paux of [0.3, 1, 2]) {
    const c = { ...pure, Paux }, o = K.optimumSpeed(c), closed = 15 * ((Paux * 200) / ((m - 1) * P0 * 170)) ** (1 / m);
    near(o.closed, closed, 1e-12);
    if (closed < 15 && closed > 0.6) { near(o.v, closed, 1e-5, 'v* sayısal ↔ kapalı'); ok(!o.atLimit, 'iç minimum'); ok(o.fuel <= K.voyage({ ...c, v: closed * 1.02 }).fuel && o.fuel <= K.voyage({ ...c, v: closed * 0.98 }).fuel, 'gerçekten minimum'); near(K.logSlope({ ...c, v: o.v }, 'fuel'), 0, 1e-4, 'minimumda eğim 0'); }
  }
  // k > 0: eğim m−1'den sapar; analitik yerel eğim = (m−1) + m·L·b'(L)/b(L)
  const curved = { ...pure, k: 0.35 }, L = (v / 15) ** m, b = 170 * (1 + 0.35 * (L - 0.75) ** 2), db = 170 * 0.7 * (L - 0.75);
  near(K.logSlope(curved, 'fuel'), m - 1 + (m * L * db) / b, 1e-5, 'eğri ile yerel eğim');
}
ok(K.optimumSpeed(baseVoyage).v === null, 'yardımcı yük yokken en az yakıt hızı yok');
near(K.sfc(0.75, 170, 0.35), 170, 1e-14); ok(K.sfc(0.2, 170, 0.35) > K.sfc(1, 170, 0.35), 'düşük yük daha verimsiz');
for (const bad of [{ v: 0 }, { m: 1 }, { dist: -1 }, { P0: NaN }]) { assert.throws(() => K.voyage({ ...baseVoyage, ...bad })); checks++; }
const propChecks = checks - cycleChecks;

/* ───── 3. Enine stabilite ───── */
// Bağımsız yöntem A: sütun integrali (her y sütununda su altı z aralığı analitik), su hattı kendi ikiye bölmesiyle
function columns(cfg, T, theta, N = 4000) {
  const { beam: B, depth: D } = cfg, s = Math.sin(theta), co = Math.cos(theta);
  const at = (c) => { let A = 0, My = 0, Mz = 0; for (let i = 0; i < N; i++) { const y = -B / 2 + ((i + 0.5) * B) / N, z = Math.max(0, Math.min(D, (c + y * s) / co)), dA = (z * B) / N; A += dA; My += y * dA; Mz += 0.5 * z * dA; } return { A, y: My / A, z: Mz / A }; };
  let lo = -B, hi = B + D; for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (at(mid).A < B * T) lo = mid; else hi = mid; }
  return at((lo + hi) / 2);
}
// Bağımsız yöntem B: kaba kuvvet ızgara (çekirdeğin su hattı sabitiyle), yalnız alan ve merkez için
function grid(cfg, theta, c, n = 500) {
  const { beam: B, depth: D } = cfg, s = Math.sin(theta), co = Math.cos(theta); let A = 0, My = 0, Mz = 0;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const y = -B / 2 + ((i + 0.5) * B) / n, z = ((j + 0.5) * D) / n; if (-y * s + z * co <= c) { A++; My += y; Mz += z; } }
  return { A: (A * B * D) / (n * n), y: My / A, z: Mz / A };
}
const barges = [{ beam: 12, depth: 6, disp: 2200, kg: 3.5 }, { beam: 12, depth: 6, disp: 2200, kg: 5.8 }, { beam: 8, depth: 6, disp: 2200, kg: 3.5 }, { beam: 20, depth: 3, disp: 1500, kg: 2 }, { beam: 6, depth: 10, disp: 3000, kg: 4 }, { beam: 14, depth: 8, disp: 5500, kg: 6.5 }];
for (const cfg of barges) {
  const h = K.hydrostatics(cfg); ok(h.floats, 'yüzer');
  near(h.T, cfg.disp / (1.025 * 60 * cfg.beam), 1e-13); near(h.KB, h.T / 2, 1e-13); near(h.BM, cfg.beam ** 2 / (12 * h.T), 1e-13); near(h.GM, h.KB + h.BM - cfg.kg, 1e-13);
  // BM = I/∇ tanımından
  near(h.BM, ((60 * cfg.beam ** 3) / 12) / (60 * cfg.beam * h.T), 1e-12, 'BM = I/∇');
  near(K.heel(cfg, 0).GZ, 0, 1e-9); near(K.heel(cfg, 0).bz, h.KB, 1e-9); near(K.heel(cfg, Math.PI).GZ / cfg.beam, 0, 1e-9, 'ters dönmüş kutu simetrik');
  // küçük açı eğimi: dGZ/dθ(0) = GM
  near(K.heel(cfg, 1e-4).GZ / 1e-4, h.GM, 1e-5, 'başlangıç eğimi = GM');
  for (const deg of [2, 5, 10, 15, 20, 27, 35, 50, 65, 80, 89]) {
    const th = deg * RAD, hl = K.heel(cfg, th);
    near(hl.area, cfg.beam * h.T, 1e-10, 'su altı alanı korunur');
    near(K.heel(cfg, -th).GZ, -hl.GZ, 1e-9, 'iskele–sancak simetrisi');
    const col = columns(cfg, h.T, th);
    near(hl.by / cfg.beam, col.y / cfg.beam, 2e-6, `sütun integrali y (θ=${deg})`); near(hl.bz / cfg.beam, col.z / cfg.beam, 2e-6, `sütun integrali z (θ=${deg})`);
    const gr = grid(cfg, th, hl.c);
    near(gr.A / hl.area, 1, 4e-3, 'ızgara alanı'); near(gr.y / cfg.beam, hl.by / cfg.beam, 2e-3, 'ızgara merkezi y'); near(gr.z / cfg.beam, hl.bz / cfg.beam, 2e-3, 'ızgara merkezi z');
    const wall = K.gzWallSided(cfg, th);
    if (th <= h.wallLimit) near(hl.GZ / cfg.beam, wall / cfg.beam, 1e-9, `dik bordalı formül tam (θ=${deg})`);
    else if (th > h.wallLimit + 2 * RAD) ok(wall > hl.GZ + 1e-6 * cfg.beam, `sınırdan sonra dik bordalı formül fazla verir (θ=${deg})`);
    near(K.gzSmall(cfg, th), h.GM * Math.sin(th), 1e-13);
  }
  // sınır açılarında köşe tam su hattında
  { const a = h.wallLimit, hw = K.heel(cfg, a), corner = h.wallBy === 'deck' ? -Math.sin(a) * cfg.beam / 2 + Math.cos(a) * cfg.depth : Math.sin(a) * cfg.beam / 2; near((corner - hw.c) / cfg.beam, 0, 1e-9, 'sınır açısında köşe su hattında'); near(a, Math.min(h.deckAngle, h.bilgeAngle), 1e-14); }
  // dinamik stabilite özdeşliği: ∫₀^θ GZ dφ = [B–G düşey aralığı](θ) − (KG − KB)
  for (const deg of [20, 45, 80]) {
    const th = deg * RAD, hl = K.heel(cfg, th), sep = -hl.by * hl.n[0] + (cfg.kg - hl.bz) * hl.n[1];
    near(simpson((x) => K.heel(cfg, x).GZ, 0, th, 400) / cfg.beam, (sep - (cfg.kg - h.KB)) / cfg.beam, 2e-7, `dinamik stabilite (θ=${deg})`);
  }
  // stabilite aralığı: kökler gerçekten kök, işaretler doğru
  const R = K.stabilityRange(cfg);
  if (R.loll !== null) { near(K.heel(cfg, R.loll * RAD).GZ / cfg.beam, 0, 1e-9, 'yatık denge kökü'); ok(K.heel(cfg, (R.loll - 1) * RAD).GZ < 0 && K.heel(cfg, (R.loll + 1) * RAD).GZ > 0, 'yatık denge kararlı'); ok(h.GM < 0, 'yatık denge yalnız GM < 0'); if (R.lollWall.valid) near(R.loll, R.lollWall.deg, 1e-7, 'yatık denge ↔ tan²φ = −2GM/BM'); }
  if (R.avs !== null && R.avs < 180) { near(K.heel(cfg, R.avs * RAD).GZ / cfg.beam, 0, 1e-9, 'stabilite kaybı kökü'); ok(K.heel(cfg, (R.avs - 1) * RAD).GZ > 0 && K.heel(cfg, (R.avs + 1) * RAD).GZ < 0, 'AVS işaret değişimi'); }
  if (R.gzMax !== null) { for (const [, gz] of R.curve) if (gz > R.gzMax + 1e-6 * cfg.beam) assert.fail('gzMax en büyük değil'); checks++; near(K.heel(cfg, R.thetaMax * RAD).GZ / cfg.beam, R.gzMax / cfg.beam, 1e-5, 'tepe değeri'); }
  if (R.valid5 !== null) { const g1 = K.heel(cfg, R.valid5 * RAD).GZ, g0 = K.heel(cfg, (R.valid5 - 0.25) * RAD).GZ; ok(Math.abs(h.GM * Math.sin(R.valid5 * RAD) - g1) > 0.05 * Math.abs(g1) && Math.abs(h.GM * Math.sin((R.valid5 - 0.25) * RAD) - g0) <= 0.05 * Math.abs(g0), '%5 eşiği'); }
}
// varsayılan duba: elle referans
{
  const h = K.hydrostatics(barges[0]);
  near(h.T, 2.98103, 1e-5); near(h.BM, 4.02545, 1e-5); near(h.KM, 5.51597, 1e-5); near(h.GM, 2.01597, 1e-5); near(h.deckAngle / RAD, 26.71, 2e-4); near(h.bilgeAngle / RAD, 26.42, 2e-4);
  ok(h.wallBy === 'bilge', 'varsayılanda önce sintine dönümü çıkar');
  near(K.heel(barges[0], 20 * RAD).GZ, (h.GM + 0.5 * h.BM * Math.tan(20 * RAD) ** 2) * Math.sin(20 * RAD), 1e-9);
  const lollCfg = barges[1], hl = K.hydrostatics(lollCfg), R = K.stabilityRange(lollCfg);
  near(R.loll, Math.atan(Math.sqrt((-2 * hl.GM) / hl.BM)) / RAD, 1e-7); ok(R.loll > 15 && R.loll < 26, 'yatık denge ~20°');
}
// yüzmeyen ve tümüyle kararsız durumlar
ok(!K.hydrostatics({ beam: 6, depth: 3, disp: 2200, kg: 2 }).floats, 'aşırı yük: yüzmez'); assert.throws(() => K.heel({ beam: 6, depth: 3, disp: 2200, kg: 2 }, 0.1)); checks++;
{ const R = K.stabilityRange({ beam: 6, depth: 10, disp: 3000, kg: 8 }); ok(R.avs === null && R.loll === null && R.gzMax === null, 'çok yüksek KG: pozitif kol yok'); }
{ const R = K.stabilityRange({ beam: 6, depth: 10, disp: 3000, kg: 4 }); ok(R.avs === 180 && R.loll === null, 'dik kararlı, ters kararsız: 180°’ye dek pozitif'); }
// ters dönmüş kutu da bir kutudur: G güverteden ölçülen ters metasantrın altındaysa ters durum kararlıdır ve AVS < 180°
{ const cfg = { beam: 12, depth: 6, disp: 2200, kg: 0.5 }, h = K.hydrostatics(cfg), R = K.stabilityRange(cfg); ok(cfg.depth - cfg.kg < h.KM && R.avs < 180 && R.avs > 90 && K.heel(cfg, 179 * RAD).GZ < 0, 'ters durum kararlı: AVS < 180°'); }
// çokgen yardımcıları
near(K.areaCentroid([[0, 0], [4, 0], [4, 2], [0, 2]]).area, 8, 1e-14); near(K.areaCentroid([[0, 0], [3, 0], [0, 3]]).y, 1, 1e-14);
ok(K.clipHalfPlane([[0, 0], [4, 0], [4, 2], [0, 2]], 0, 1, 1).length === 4, 'yatay kırpma dörtgen'); near(K.areaCentroid(K.clipHalfPlane([[0, 0], [4, 0], [4, 2], [0, 2]], 0, 1, 1)).area, 4, 1e-14);
const stabChecks = checks - cycleChecks - propChecks;
console.log(`D gemi makineleri: ${checks.toLocaleString('tr-TR')} çekirdek denetimi PASS (çevrim ${cycleChecks}, pervane ${propChecks}, stabilite ${stabChecks})`);

/* ───── 4. Arayüz (isteğe bağlı) ───── */
if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright');
  const { createServer } = await import('node:http');
  const { join, extname } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url));
  const server = createServer((req, res) => {
    const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream');
    res.end(fs.readFileSync(file));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  let browser;
  try {
    browser = await chromium.launch();
    for (const [width, height, theme] of [[390, 900, 'light'], [1280, 900, 'dark']]) {
      const before = checks;
      const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2 });
      const page = await ctx.newPage();
      await page.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      page.setDefaultTimeout(5000);
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      // Defter dosyası henüz yokken (shared/digest/<slug>.js → 404) konsola düşen kaynak hatası sayfa hatası değildir.
      page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on('response', (r) => { if (r.status() >= 400 && !/shared\/digest\//.test(r.url()) && !/favicon/.test(r.url())) errors.push(`${r.status()} ${r.url()}`); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const click = (id) => page.locator('#' + id).click();
      const read = async (id) => (await page.locator('#' + id).textContent()).trim();
      const range = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v));
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `[${width}] #${id}: "${t}" içinde "${text}" yok`); checks++; };
      const eq = (a, b, label = '') => { assert.equal(a, b, `[${width}] ${label}`); checks++; };
      const noOverflow = async (label) => eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'yatay taşma: ' + label);
      const painted = async (id) => eq(await page.locator('#' + id).evaluate((c) => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; const seen = new Set(); for (let i = 0; i < d.length; i += 4 * 97) seen.add(d[i] << 16 | d[i + 1] << 8 | d[i + 2]); return c.width > 100 && seen.size > 3; }), true, 'tuval boş: ' + id);
      eq(await page.evaluate(() => document.documentElement.dataset.theme || 'dark'), theme, 'tema');

      // 01 · çevrim: varsayılan durum, ölçülen ↔ kuram
      await has('cyEtaTheory', '%64,456'); await has('cyEtaMeasured', '%64,458'); await has('cyPmax', '72,8 bar'); await has('cyTmax', '2.183 K');
      await has('compRatioOut', '16,0'); await has('intakePOut', '1,0 bar');
      const diff = Number((await read('cyEtaDiff')).replace('fark', '').replace('%', '').replace(',', '.').trim());
      assert(Number.isFinite(diff) && Math.abs(diff) < 0.02, `[${width}] ∮p dV farkı ${diff} %`); checks++;
      await painted('engineCanvas'); await painted('cycleCanvas');
      // krank dönüyor; duraklat/sürdür; elle açı
      const a0 = await read('cyNowA'); await page.waitForTimeout(400); const a1 = await read('cyNowA'); assert.notEqual(a0, a1, 'krank dönmeli'); checks++;
      await click('cycleToggle'); const a2 = await read('cyNowA'); await page.waitForTimeout(250); eq(await read('cyNowA'), a2, 'duraklatınca durmalı'); eq(await page.locator('#cycleToggle').getAttribute('aria-pressed'), 'true');
      await range('crankAngle', 180); await has('cyNowA', '180°'); await has('cyNowX', '2,400 m');
      await range('crankAngle', 0); await has('cyNowX', '0,000 m'); await has('cyNowP', '72,75 bar');
      // Otto ve Diesel sınırları, ısısız durum
      await click('cycleOtto'); await has('cyEtaTheory', '%67,012'); await has('cyEtaOtto', '%67,01'); await has('cyStatus', 'Otto sınırı'); await has('cyStatus', 'Giren ısı 978,8 kJ/kg'); await has('cyStatus', 'işini değil verimini');
      await click('cycleDiesel'); await has('cyStatus', 'Diesel sınırı'); await has('cyStatus', 'Giren ısı 1.096,2 kJ/kg'); await has('cyEtaTheory', '%60,420');
      await range('cutoff', 1); await has('cyEtaTheory', 'Tanımsız'); await has('cyEtaMeasured', 'Tanımsız'); await has('cyStatus', 'ısı girmiyor'); await has('cyPower', '0,00 MW');
      await page.locator('#pvScale').selectOption('log'); await painted('cycleCanvas');
      await click('cycleReset'); await has('cyEtaTheory', '%64,456'); eq(await page.locator('#pvScale').inputValue(), 'linear'); eq(await page.locator('#cycleToggle').getAttribute('aria-pressed'), 'false');
      // ideal tepe basıncı gerçek sınırların çok ötesindeyse durum satırı uyarır; varsayılanda uyarı ve ısı notu yok
      { const t0 = await read('cyStatus'); assert(!t0.includes('gerçek bir makineyi anlatmaz') && !t0.includes('Giren ısı'), `[${width}] varsayılanda gereksiz uyarı`); checks++; }
      await range('intakeP', 3.5); await has('cyPmax', '254,6 bar'); await has('cyStatus', 'gerçek bir makineyi anlatmaz'); await click('cycleReset');
      // güç: silindir sayısı ve devirle doğru orantılı
      const mw = async () => Number((await read('cyPower')).replace(' MW', '').replace(',', '.'));
      const p6 = await mw(); await range('cyl', 12); const p12 = await mw(); assert(Math.abs(p12 / p6 - 2) < 0.01, 'güç ∝ z'); checks++; await click('cycleReset');
      await noOverflow('çevrim');

      // 02 · pervane
      await click('tab-prop'); eq(await page.locator('#panel-cycle').isHidden(), true); await painted('voyageCanvas'); await painted('propCanvas');
      await has('prPower', '6,14 MW'); await has('prRpm', '80,0 d/dk'); await has('prTime', '20,8 gün'); await has('prTimeH', '500 saat'); await has('prSfc', '173,4'); await has('prDaily', '25,6 t/gün'); await has('prFuel', '533 t'); await has('prCo2', '1.658 t'); await has('prOptimum', 'Yok');
      await click('propPure'); await has('prRows', '3,000'); await has('prRows', '2,000'); await has('prRows', '-1,000'); await has('prStatus', 'tam olarak');
      await has('prVsDesign', 'yakıt -%36,0'); await has('prVsDesign', 'süre +%25,0');
      await range('auxPower', 1); await has('prOptimum', '5,49 kn'); await has('prOptimumTheory', '5,49 kn');
      await range('hullExp', 4); await has('prRows', 'm − 1 = 3,0');
      await click('propDesign'); await has('prVsDesign', 'tasarım hızındasın'); await has('shipSpeedOut', '15,0 kn');
      await range('designSpeed', 10); await has('shipSpeedOut', '10,0 kn'); eq(await page.locator('#shipSpeed').getAttribute('max'), '10');
      await page.locator('#fuelType').selectOption('3.206'); await has('prCf', '3,206');
      await click('propReset'); await has('prFuel', '533 t'); await has('shipSpeedOut', '12,0 kn'); eq(await page.locator('#shipSpeed').getAttribute('max'), '15');
      await noOverflow('pervane');

      // 03 · stabilite
      await click('tab-stab'); await painted('sectionCanvas'); await painted('gzCanvas');
      await has('stDraft', '2,981 m'); await has('stBM', '4,025 m'); await has('stKM', '5,516 m'); await has('stGM', '2,016 m'); await has('stGZ', '0,781 m'); await has('stWall', '0,781 m'); await has('stSmall', '0,690 m'); await has('stDeck', '26,42°'); await has('stLoll', 'Yok');
      await range('heelAngle', 40); await has('stWall', 'Geçersiz'); await has('stStatus', 'sintine dönümü sudan çıktı');
      await range('heelAngle', 0); await has('stGZ', '0,000 m'); await has('stSmallDiff', 'tanımsız'); await has('stStatus', 'Tekne dik');
      // GZ köküne yakın: yüzde yerine not (eskiden "+%20.631,54" yazıyordu); kökten uzakta yüzde sürer
      await range('heelAngle', 78.5); await has('stGZ', '0,010 m'); await has('stSmallDiff', 'oran anlamsız'); await has('stStatus', 'yüzde fark anlamsız');
      await range('heelAngle', 60); await has('stSmallDiff', '+%122,99'); await range('heelAngle', 10); await has('stSmallDiff', '-%3,01'); await has('stWallDiff', '%0,00');
      await click('stabLoll'); await has('stGM', '-0,284 m'); await has('stLoll', '20,59°'); await has('stLollTheory', '20,59°'); await has('stStatus', 'yatık dengeye'); await has('stStatus', 'daha da yatırıyor'); await range('heelAngle', 0); await has('stStatus', 'kararsızdır'); await range('heelAngle', 30); await has('stGZ', '0,125 m'); await has('stWall', 'Geçersiz');
      await range('kg', 8); await range('beam', 6); await range('depth', 10); await range('displacement', 3000); await has('stRange', 'Yok'); await has('stStatus', 'devrilir');
      await range('displacement', 6000); await has('stStatus', 'tekne batar'); await has('stGZ', '—');
      await click('stabReset'); await has('stGM', '2,016 m'); await has('heelAngleOut', '20,0°');
      await noOverflow('stabilite');

      // sekme klavyesi, R kısayolu, donuk API
      await page.locator('#tab-stab').focus(); await page.keyboard.press('Home'); eq(await page.locator('#tab-cycle').getAttribute('aria-selected'), 'true');
      await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-prop').getAttribute('aria-selected'), 'true');
      await page.keyboard.press('End'); eq(await page.locator('#tab-stab').getAttribute('aria-selected'), 'true'); eq(await page.locator('#tab-stab').getAttribute('tabindex'), '0');
      await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-cycle').getAttribute('aria-selected'), 'true'); eq(await page.locator('#panel-stab').isHidden(), true);
      await range('compRatio', 10); await has('compRatioOut', '10,0'); await page.locator('h1').click(); await page.keyboard.press('r'); await has('compRatioOut', '16,0');
      await page.keyboard.press('Space'); eq(await page.locator('#cycleToggle').getAttribute('aria-pressed'), 'true'); await page.keyboard.press('Space'); eq(await page.locator('#cycleToggle').getAttribute('aria-pressed'), 'false');
      eq(await page.evaluate(() => Object.isFrozen(MarineLab) && !Object.getOwnPropertyDescriptor(window, 'MarineLab').writable && !Object.getOwnPropertyDescriptor(window, 'MarineLab').configurable), true, 'donuk API');
      eq(await page.evaluate(() => [...document.querySelectorAll('.gm-field input, .gm-field select')].every((e) => document.querySelector(`label[for="${e.id}"]`))), true, 'her denetimin etiketi var');
      assert.deepEqual(errors, [], `[${width}] sayfa hataları`); checks++;
      console.log(`D gemi makineleri: ${checks - before} arayüz denetimi PASS (${width} px, ${theme === 'light' ? 'açık' : 'koyu'} tema)`);
      await ctx.close();
    }
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
