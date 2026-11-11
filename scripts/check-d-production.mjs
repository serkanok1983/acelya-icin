// Üretim planlama laboratuvarı: çekirdek, bağımsız başvurularla sınanır.
// Başvurular sayfanın kapalı formüllerini yinelemez: kaba kuvvet en küçük arama, Simpson integrali,
// açıklık dağılımının sayısal integrali, Buzen evrişimi, Lindley özyinelemesi ve yeniden yazılmış kural denetimi.
// Kullanım: node scripts/check-d-production.mjs [--browser]
import fs from 'node:fs';
import assert from 'node:assert/strict';
const SLUG = 'uretim-planlama-ve-endustri-muhendisligi';
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'Çekirdek sınırları (KERNEL-BEGIN/END) gerekli');
// Çekirdek saf işlevlerdir; ayrı bir işlev kapsamında derlenir (vm bağlamı küresel erişimi çok yavaşlatıyor)
const K = new Function(source + ';return {makeRng,makeNormal,normCdf,normInv,poissonSf,eoq,eoqCost,reorderPoint,inventorySim,SPC_TABLE,spcConst,makeDetector,spcRun,capability,arlTheory,arlSim,DIST_CV2,makeSampler,mm1,mva,lineTheory,lineSim};')(); let checks = 0;
const near = (actual, expected, tol = 1e-9, label = '') => { assert(Math.abs(actual - expected) <= tol * Math.max(1, Math.abs(expected)), `${label} ${actual} ≠ ${expected} (tol ${tol})`); checks++; };
const ok = (cond, label) => { assert(cond, label); checks++; };
const simpson = (fn, a, b, n = 2000) => { const h = (b - a) / n; let s = fn(a) + fn(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * fn(a + i * h); return h * s / 3; };
const pdf = (x) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);

/* ── Normal dağılım ── */
for (const x of [-6, -4.5, -3, -2, -1, -0.3, 0, 0.7, 1.5, 3, 4.5]) near(K.normCdf(x), simpson(pdf, -12, x, 6000), 1e-10, 'Φ');
near(K.normCdf(-3) * 2, 0.002699796063, 1e-9, '2Φ(−3)');
for (const p of [1e-6, 0.001, 0.025, 0.2, 0.5, 0.8, 0.95, 0.975, 0.99, 0.999, 1 - 1e-6]) near(K.normCdf(K.normInv(p)), p, 1e-12, 'Φ⁻¹');
near(K.normInv(0.975), 1.959963984540054, 1e-10);

/* ── Poisson kuyruğu: ln j! toplamla ── */
const poisTail = (k, mu) => { let lf = 0, logs = []; for (let j = 0; j <= k + 4000; j++) { if (j > 0) lf += Math.log(j); if (j > k) logs.push(-mu + j * Math.log(mu) - lf); } const m = Math.max(...logs); return Math.exp(m) * logs.reduce((a, v) => a + Math.exp(v - m), 0); };
for (const [k, mu] of [[0, 0.5], [3, 2], [10, 10], [83, 69.04109589041096], [60, 69], [100, 69], [325, 295.9], [1700, 1643.8], [1500, 1643.8], [20, 3]]) near(K.poissonSf(k, mu), poisTail(k, mu), 1e-9, `Poisson ${k},${mu}`);
near(K.poissonSf(-1, 5), 1); near(K.poissonSf(4, 0), 0);

/* ── EOQ: kaba kuvvet en küçük ── */
for (const D of [500, 3600, 20000]) for (const S of [10, 200, 1000]) for (const H of [0.5, 4, 20]) {
  const r = K.eoq({ D, S, H, leadDays: 7, Q: 600 });
  let best = Infinity, arg = 0;
  for (let i = 20; i <= 600000; i++) { const q = i * 0.05;  const c = D * S / q + H * q / 2; if (c < best) { best = c; arg = q; } }
  if (r.Qstar < 29000) { ok(Math.abs(arg - r.Qstar) <= 0.05 + 1e-9, `Q* ${arg} ${r.Qstar}`); near(best, r.costStar, 1e-5, 'TC*'); }
  near(r.total, D * S / 600 + H * 300, 1e-12);
  for (const f of [0.5, 2]) { const c = K.eoqCost(D, S, H, f * r.Qstar); near(c.total / r.costStar - 1, 0.25, 1e-12, 'yüzde 25'); }
  const c3 = K.eoqCost(D, S, H, 3 * r.Qstar); near(c3.total / r.costStar - 1, 2 / 3, 1e-12);
  near(K.eoqCost(D, S, H, r.Qstar).order, K.eoqCost(D, S, H, r.Qstar).hold, 1e-12, 'dipte eşitlik');
}
{ const r = K.eoq({ D: 3600, S: 200, H: 4, leadDays: 7, Q: 600 }); near(r.Qstar, 600); near(r.costStar, 2400); near(r.cycleDays, 600 / 3600 * 365); near(r.leadDemand, 3600 * 7 / 365); ok(r.outstanding === 0);
  const far = K.eoq({ D: 3600, S: 200, H: 4, leadDays: 30, Q: 200 }); ok(far.outstanding === 1); near(far.ropOnHand, 3600 * 30 / 365 - 200); }

/* ── (R, Q) benzetimi: kesin Poisson kuyruğu ve E[net] = R + (Q+1)/2 − μ ── */
for (const [D, Q, L] of [[3600, 600, 7], [3600, 200, 30], [12000, 900, 3]]) for (const service of [0.8, 0.95, 0.99]) {
  const rp = K.reorderPoint({ D, leadDays: L, service }), pRef = poisTail(rp.R, rp.mu);
  near(rp.pStockout, pRef, 1e-9); ok(rp.R >= rp.mu + rp.ssNormal - 1e-6 && rp.R < rp.mu + rp.ssNormal + 1, 'R yuvarlama'); ok(rp.pStockout < (1 - service) * 1.35, 'hizmet düzeyi');
  for (const seed of [1, 2, 3]) {
    const s = K.inventorySim({ D, Q, leadDays: L, R: rp.R, years: Math.round(1.5e6 / D), seed });
    ok(Math.abs(s.pStockout - pRef) < 4 * Math.sqrt(pRef * (1 - pRef) / s.cycles), `stoksuzluk ${s.pStockout} ${pRef}`);
    near(s.meanNet, rp.R + (Q + 1) / 2 - rp.mu, 0.006, 'ortalama net stok');
    near(s.ordersPerYear, D / Q, 0.01, 'sipariş sayısı'); near(s.demand / s.years, D, 0.005, 'talep');
    ok(s.fillRate > 0.99 && s.fillRate <= 1);
  }
}
{ const a = K.inventorySim({ D: 3600, Q: 600, leadDays: 7, R: 83, years: 50, seed: 5, traceDays: 190 }), b = K.inventorySim({ D: 3600, Q: 600, leadDays: 7, R: 83, years: 50, seed: 5, traceDays: 190 });
  assert.deepEqual(a.trace, b.trace); checks++; ok(a.trace.length > 100 && a.trace.every((q) => q[0] >= 0 && q[0] <= 190.0001), 'iz penceresi'); ok(a.trace[1][1] - a.trace[0][1] === 600, 'iz teslimatla başlar'); }

/* ── Kontrol grafiği sabitleri: açıklık dağılımının sayısal integrali ── */
{ const h = 0.02, xs = []; for (let x = -8; x <= 8 + 1e-9; x += h) xs.push(x);
  const F = xs.map(K.normCdf), f = xs.map(pdf);
  for (let n = 2; n <= 10; n++) {
    // E[R] = ∫ (1 − Fⁿ − (1−F)ⁿ) dx ; E[R²] = n(n−1) ∬ (y−x)² (F(y)−F(x))ⁿ⁻² f(x) f(y) dx dy, x<y
    let d2 = 0; for (let i = 0; i < xs.length; i++) d2 += (1 - F[i] ** n - (1 - F[i]) ** n) * h;
    let m2 = 0; const step = 4, hh = h * step;
    for (let i = 0; i < xs.length; i += step) for (let j = i + step; j < xs.length; j += step) m2 += (xs[j] - xs[i]) ** 2 * (F[j] - F[i]) ** (n - 2) * f[i] * f[j];
    m2 *= n * (n - 1) * hh * hh;
    const d3 = Math.sqrt(m2 - d2 * d2), k = K.spcConst(n);
    near(k.d2, d2, 6e-4 / d2 * 1, `d2(${n})`); ok(Math.abs(k.A2 - 3 / (d2 * Math.sqrt(n))) < 6e-4, `A2(${n}) ${3 / (d2 * Math.sqrt(n))}`);
    ok(Math.abs(k.D4 - (1 + 3 * d3 / d2)) < 1.1e-3, `D4(${n}) ${1 + 3 * d3 / d2}`); ok(Math.abs(k.D3 - Math.max(0, 1 - 3 * d3 / d2)) < 1.1e-3, `D3(${n}) ${1 - 3 * d3 / d2}`);
  }
  assert.throws(() => K.spcConst(11)); assert.throws(() => K.spcConst(1)); checks += 2; }

/* ── Kurallar: elle kurulmuş diziler ve bağımsız yeniden yazım ── */
const feed = (zs, rules = true) => { const d = K.makeDetector(rules); return zs.map((z) => d.push(z)); };
assert.deepEqual(feed([0.5, 3.1, -3.2, 0]), [0, 1, 1, 0]); assert.deepEqual(feed([2.5, 0, 2.5]), [0, 0, 2]); assert.deepEqual(feed([2.5, 0, -2.5]), [0, 0, 0]); assert.deepEqual(feed([2.5, 2.5, 0.1]), [0, 2, 0]);
assert.deepEqual(feed([1.5, 1.5, 0, 1.5, 1.5]), [0, 0, 0, 0, 3]); assert.deepEqual(feed([-1.5, -1.5, 1.5, -1.5, -1.5, -1.5]), [0, 0, 0, 0, 3, 3]);
assert.deepEqual(feed([.1, .2, .1, .3, .1, .2, .1, .4]), [0, 0, 0, 0, 0, 0, 0, 4]); assert.deepEqual(feed([.1, .2, .1, -.3, .1, .2, .1, .4, .1, .1, .1, .1]), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4]);
assert.deepEqual(feed([2.5, 0, 2.5, 1.5, 1.5, 1.5, 1.5], false), [0, 0, 0, 0, 0, 0, 0]); checks += 9;
const bruteRule = (z, i) => { const a = Math.abs(z[i]), s = Math.sign(z[i]), cnt = (w, lim) => z.slice(Math.max(0, i - w + 1), i + 1).filter((v) => v * s > lim).length;
  if (a > 3) return 1; if (a > 2 && cnt(3, 2) >= 2) return 2; if (a > 1 && cnt(5, 1) >= 4) return 3; if (i >= 7 && s !== 0 && z.slice(i - 7, i + 1).every((v) => v * s > 0)) return 4; return 0; };
{ const z = K.makeNormal(K.makeRng(11)), zs = Array.from({ length: 60000 }, () => z() + 0.3), got = feed(zs); let same = true, fired = [0, 0, 0, 0, 0];
  for (let i = 0; i < zs.length; i++) { const b = bruteRule(zs, i); fired[b]++; if (b !== got[i]) { same = false; break; } } ok(same, 'kural denetimi bağımsız yazımla aynı'); ok(fired.slice(1).every((c) => c > 100), 'her kural sınandı'); }

/* ── spcRun: sınırlar gruplardan yeniden kurulur ── */
for (const n of [2, 5, 8, 10]) for (const seed of [1, 7, 42]) for (const [shift, sigmaK] of [[0, 1], [1, 1], [0, 2], [-1.5, 0.5]]) {
  const r = K.spcRun({ n, shift, sigmaK, seed, runRules: true }), k = K.spcConst(n), g1 = r.groups.slice(0, 25);
  const xbb = g1.reduce((a, g) => a + g.mean, 0) / 25, rbar = g1.reduce((a, g) => a + g.range, 0) / 25;
  near(r.xbb, xbb, 1e-12); near(r.rbar, rbar, 1e-12); near(r.x.ucl, xbb + k.A2 * rbar, 1e-12); near(r.x.lcl, xbb - k.A2 * rbar, 1e-12); near(r.r.ucl, k.D4 * rbar, 1e-12); near(r.r.lcl, k.D3 * rbar, 1e-12); near(r.sigmaHat, rbar / k.d2, 1e-12);
  ok(r.groups.length === 50 && r.groups.every((g) => g.range > 0));
  const zs = r.groups.map((g) => (g.mean - xbb) / (k.A2 * rbar / 3)), expect = [];
  zs.forEach((_, i) => { const b = bruteRule(zs, i); if (b) expect.push(`${i}x${b}`); if (r.groups[i].range > k.D4 * rbar || (k.D3 > 0 && r.groups[i].range < k.D3 * rbar)) expect.push(`${i}r1`); });
  assert.deepEqual(r.flags.map((f) => `${f.index}${f.chart}${f.rule}`), expect); checks++;
  const first = r.flags.find((f) => f.index >= 25); ok((r.firstSignal === null) === (first === undefined) && (!first || r.firstSignal.index === first.index), 'ilk sinyal');
  // Aynı tohumda Faz I kaymadan etkilenmez
  const base = K.spcRun({ n, seed }); near(base.xbb, r.xbb, 1e-12); near(base.rbar, r.rbar, 1e-12);
}
// Çok sayıda tohumda σ tahmini yansız, kontrol altındaki nokta başına yanlış alarm oranı küçük
{ let sum = 0, alarms = 0, pts = 0; for (let seed = 1; seed <= 400; seed++) { const r = K.spcRun({ n: 5, seed }); sum += r.sigmaHat; alarms += r.flags.filter((f) => f.chart === 'x' && f.index >= 25).length; pts += 25; }
  near(sum / 400, 0.01, 0.01, 'σ tahmini ortalaması'); ok(alarms / pts > 0.001 && alarms / pts < 0.012, `Faz II yanlış alarm oranı ${alarms / pts}`); }

/* ── Yeterlilik ── */
{ const c = K.capability({ mean: 20, sigma: 0.01, lsl: 19.96, usl: 20.04 }); near(c.cp, 4 / 3); near(c.cpk, 4 / 3); near(c.ppm, 2e6 * simpson(pdf, 4, 12, 4000), 1e-6);
  const s = K.capability({ mean: 20.01, sigma: 0.01, lsl: 19.96, usl: 20.04 }); near(s.cp, 4 / 3); near(s.cpk, 1); near(s.ppm, 1e6 * (simpson(pdf, 3, 12, 4000) + simpson(pdf, 5, 12, 4000)), 1e-6); }

/* ── ARL: Simpson ile bağımsız olasılık, benzetimle karşılaştırma ── */
near(K.arlTheory({ n: 5 }).arl, 370.3983, 1e-6);
for (const n of [2, 4, 5, 10]) for (const shift of [0, 0.5, 1, -1, 2]) for (const sigmaK of [1, 1.5]) {
  const th = K.arlTheory({ n, shift, sigmaK }), mu = shift * Math.sqrt(n);
  const inside = simpson((x) => pdf((x - mu) / sigmaK) / sigmaK, -3, 3, 4000);
  near(th.p, 1 - inside, 1e-9 / Math.max(th.p, 1e-9) * 1e-2 + 1e-9, `p(${n},${shift},${sigmaK})`); near(th.arl, 1 / th.p, 1e-12);
  if (th.arl < 40 || (n === 5 && sigmaK === 1)) for (const seed of [1, 2]) { const s = K.arlSim({ n, shift, sigmaK, seed }); ok(s.runs >= 30 && Math.abs(s.mean - th.arl) < 4 * s.se, `ARL ${n},${shift},${sigmaK}: ${s.mean} ± ${s.se} / ${th.arl}`); }
}
near(K.arlTheory({ n: 4, shift: 1 }).arl, 1 / (1 - K.normCdf(1) + K.normCdf(-5)), 1e-12);
{ const s = K.arlSim({ n: 5, sigmaK: 0.5, seed: 1 }); ok(s.runs < 30 && !(s.mean > 0), 'k = 0.5: ölçülemez'); }
// Dört kural birlikte, kontrol altında: Champ ve Woodall (1987) 91.75
{ const s = K.arlSim({ n: 1, runRules: true, seed: 3, budget: 3e6 }); ok(Math.abs(s.mean - 91.75) < 4 * s.se && s.se < 0.7, `dört kural ARL ${s.mean} ± ${s.se}`); ok(s.byRule.slice(1).every((c) => c > 1000));
  const shifted = K.arlSim({ n: 5, shift: 1, runRules: true, seed: 3 }); ok(shifted.mean < K.arlTheory({ n: 5, shift: 1 }).arl, 'dizi kuralları yakalamayı hızlandırır'); }

/* ── Kuyruklar: M/M/1, Buzen evrişimi, P–K ── */
for (const rho of [0.1, 0.5, 0.8, 0.95]) { let L = 0; for (let k = 0; k < 4000; k++) L += k * (1 - rho) * rho ** k; near(K.mm1(rho).L, L, 1e-9); near(K.mm1(rho).Lq, L - rho, 1e-9); }
ok(K.mm1(1) === null && K.mm1(1.2) === null);
const buzen = (times, W) => { const g = new Array(W + 1).fill(0); g[0] = 1; for (const t of times) for (let w = 1; w <= W; w++) g[w] += t * g[w - 1]; return g; };
for (const times of [[6], [5, 5, 5, 5, 5], [4, 4.5, 6, 4.5, 4], [1, 10, 2.3], [3, 3]]) for (const W of [1, 2, 5, 10, 40]) {
  const g = buzen(times, W), th = g[W - 1] / g[W], m = K.mva(times, W);
  near(m.th, th, 1e-10, 'MVA TH'); near(m.L.reduce((a, b) => a + b, 0), W, 1e-10, 'MVA WIP');
  times.forEach((t, i) => { let L = 0; for (let k = 1; k <= W; k++) L += t ** k * g[W - k] / g[W]; near(m.L[i], L, 1e-9, 'MVA L'); });
  if (times.every((t) => t === times[0])) near(m.th, W / (W + times.length - 1) / times[0], 1e-12, 'dengeli hat');
  const best = K.lineTheory({ times, mode: 'conwip', wip: W, dist: 'det' }); near(best.th, Math.min(W / times.reduce((a, b) => a + b, 0), 1 / Math.max(...times)), 1e-12);
}
const LINE = { times: [4, 4.5, 6, 4.5, 4], mode: 'open', ratePerHour: 8, wip: 10, dist: 'exp' };
{ const th = K.lineTheory(LINE); near(th.wip, 8 / 7 + 1.5 + 4 + 1.5 + 8 / 7, 1e-12); near(th.ct, th.wip / (8 / 60), 1e-12); ok(th.bottleneck === 2 && th.exact && th.stable); near(th.rb * 60, 10); near(th.T0, 23);
  for (const [dist, c2] of [['det', 0], ['erlang4', 0.25], ['exp', 1], ['h2', 2.25]]) { const t1 = K.lineTheory({ ...LINE, times: [6], dist }); near(t1.wip, 0.8 + 0.64 * (1 + c2) / (2 * 0.2), 1e-12, 'P–K'); ok(t1.exact); ok(K.lineTheory({ ...LINE, dist }).exact === (dist === 'exp' || dist === 'det')); }
  // Sabit süreli seri hat (Friedman 1965): toplam = Σρ + darboğazın M/D/1 kuyruğu; istasyon satırları yaklaşık kalır
  for (const [times, rate] of [[LINE.times, 8], [LINE.times, 9.5], [[6, 4, 5], 8], [[2, 9], 6]]) { const d = K.lineTheory({ ...LINE, times, ratePerHour: rate, dist: 'det' }), lam = rate / 60, rb = lam * Math.max(...times); near(d.wip, times.reduce((a, t) => a + lam * t, 0) + rb * rb / (2 * (1 - rb)), 1e-12, 'Friedman toplam'); near(d.ct, d.wip / lam, 1e-12); ok(d.exact && d.stations[0].exact && !d.stations[1].exact); }
  const un = K.lineTheory({ ...LINE, ratePerHour: 12 }); ok(!un.stable && un.wip === null && un.ct === null); near(un.th * 60, 10); assert.deepEqual(Array.from(un.saturated), [false, false, true, false, false]); checks++; near(un.rho[3], 0.75); near(un.rho[1], 0.9); }
// Örnekleyiciler: ortalama ve değişim katsayısı
for (const [dist, c2] of Object.entries(K.DIST_CV2)) { const f = K.makeSampler(dist, K.makeRng(9)); let s = 0, q = 0; const N = 400000; for (let i = 0; i < N; i++) { const x = f(3); s += x; q += x * x; } const m = s / N, v = q / N - m * m; near(m, 3, 0.01, dist); ok(Math.abs(v / (m * m) - c2) < 0.03, `${dist} c² ${v / (m * m)}`); }

/* ── Hat benzetimi ── */
// Tek istasyon: Lindley özyinelemesi (aynı rastgele akışlarla) çevrim süresini birebir verir
for (const seed of [1, 2, 3]) for (const dist of ['exp', 'det', 'erlang4', 'h2']) {
  const cfg = { times: [6], mode: 'open', ratePerHour: 8, wip: 1, dist, seed, jobs: 40000, warm: 4000 }, s = K.lineSim(cfg);
  const ua = K.makeRng(seed * 7919 + 97), sv = K.makeSampler(dist, K.makeRng(seed * 7919 + 1));
  let wq = 0, sum = 0;
  for (let j = 0; j < 44000; j++) { const gap = -7.5 * Math.log(1 - ua()); if (j > 0) wq = Math.max(0, wq - gap); const x = sv(6); if (j >= 4000) sum += wq + x; wq += x; }
  near(s.ct, sum / 40000, 1e-9, `Lindley ${dist}`);
  near(s.wip, s.th * s.ct, 3e-3, 'Little'); near(s.little, s.th * s.ct, 1e-12);
}
for (const seed of [1, 2, 3]) {
  const one = K.lineSim({ ...LINE, times: [6], seed }); near(one.wip, 4, 0.06, 'M/M/1 L'); near(one.ct, 30, 0.06, 'M/M/1 W'); near(one.stations[0].util, 0.8, 0.01); near(one.th * 60, 8, 0.01);
  const s = K.lineSim({ ...LINE, seed }), th = K.lineTheory(LINE); near(s.wip, th.wip, 0.06, 'Jackson WIP'); near(s.ct, th.ct, 0.06, 'Jackson CT'); near(s.wip, s.little, 1e-3, 'Little');
  s.stations.forEach((st, i) => { near(st.util, th.rho[i], 0.012, 'doluluk'); near(st.wip, th.stations[i].L, i === 2 ? 0.1 : 0.05, 'istasyon L'); near(st.queue, st.wip - st.util, 1e-12); });
  // Sabit süre: beş istasyonlu hattın çevrim süresi, aynı gelişlerle tek başına darboğazınkinden tam Σ(diğer süreler) kadar uzundur
  for (const rate of [8, 9.5]) { const five = K.lineSim({ ...LINE, ratePerHour: rate, dist: 'det', seed }), solo = K.lineSim({ ...LINE, times: [6], ratePerHour: rate, dist: 'det', seed }); near(five.ct - 17, solo.ct, 1e-9, 'Friedman indirgeme'); if (rate === 8) near(five.wip, K.lineTheory({ ...LINE, dist: 'det' }).wip, 0.03, 'sabit süreli hat WIP'); }
  for (const [dist, tol] of [['det', 0.03], ['erlang4', 0.04], ['h2', 0.1]]) { const g = K.lineSim({ ...LINE, dist, seed }); near(g.stations[0].wip, K.lineTheory({ ...LINE, dist }).stations[0].L, tol, `P–K 1. istasyon ${dist}`); }
  for (const W of [1, 5, 10, 25]) {
    const c = { ...LINE, mode: 'conwip', wip: W, seed }, e = K.lineSim(c); near(e.th, K.mva(LINE.times, W).th, 0.012, `CONWIP üstel W=${W}`); near(e.wip, W, 1e-9, 'CONWIP WIP'); near(e.wip, e.little, 2e-3);
    const d = K.lineSim({ ...c, dist: 'det' }); near(d.th, Math.min(W / 23, 1 / 6), 1e-6, 'CONWIP sabit');
    const h = K.lineSim({ ...c, dist: 'h2' }), r = K.lineSim({ ...c, dist: 'erlang4' }); if (W > 1 && W < 25) ok(h.th < e.th && e.th < r.th && r.th <= d.th + 1e-12, 'değişkenlik çıktıyı düşürür');
  }
  const un = K.lineSim({ ...LINE, ratePerHour: 12, seed }); near(un.th * 60, 10, 0.012, 'doymuş hat çıktısı'); ok(un.stations[2].util > 0.999 && un.stations[2].wip > 1000); near(un.stations[3].util, 0.75, 0.015);
}
{ const a = K.lineSim({ ...LINE, seed: 4 }), b = K.lineSim({ ...LINE, seed: 4 }); ok(a.ct === b.ct && a.wip === b.wip, 'tohum tekrarlanabilir'); ok(a.trace.length === 320 && a.T0 > 0 && a.T1 > a.T0); ok(K.lineSim({ ...LINE, seed: 5 }).ct !== a.ct); }
console.log(`D üretim: ${checks.toLocaleString('tr-TR')} çekirdek kontrolü (kaba kuvvet, Simpson, açıklık integrali, Buzen, Lindley, kural yeniden yazımı) PASS`);

if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright'); const { createServer } = await import('node:http'); const { join, extname } = await import('node:path'); const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, '127.0.0.1', r)); let browser;
  try {
    browser = await chromium.launch(); const before = checks;
    for (const [width, theme] of [[390, 'light'], [1280, 'dark']]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 2, locale: 'tr-TR' });
      await ctx.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(8000); const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/digest|404/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const click = (id) => page.locator('#' + id).click(), read = (id) => page.locator('#' + id).textContent();
      const range = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v);
      const has = async (id, text) => { const t = (await read(id)).replace(/ /g, ' '); assert(t.includes(text), `${width}px ${id}: "${t}" içinde "${text}" yok`); checks++; };
      const painted = async (id) => { ok(await page.locator('#' + id).evaluate((c) => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++; return n > 500; }), `${id} çizildi`); };
      const noOverflow = async () => ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      // 1. Sipariş miktarı
      await has('eoqQstar', '600.0 adet'); await has('eoqCostQ', '2400 ₺/yıl'); await has('eoqPenalty', '0.00 %'); await has('eoqCycle', '60.8 gün'); await has('eoqRop', '69.0 adet'); await has('eoqR', 'R = 83'); await has('eoqPTheory', '%4.42'); await has('eoqPMeasured', '%5.00 ± 0.44'); await has('eoqNet', '314.6 ve 314.5'); await has('eoqRopSub', 'R = d·L + emniyet stoku'); await has('eoqRSub', '69.0 + 14.0 adet'); await painted('eoqCostCanvas'); await painted('eoqStockCanvas');
      await click('eoqSetDouble'); await has('eoqQOut', '1200 adet'); await has('eoqPenalty', '+25.00 %'); await has('eoqPenaltySub', '1.2500'); await has('eoqStatus', 'Fazla büyük parti');
      await click('eoqSetHalf'); await has('eoqPenalty', '+25.00 %'); await has('eoqCostQSub', 'sipariş 2400 ₺ + elde tutma 600 ₺');
      await range('eoqL', 30); await range('eoqQ', 200); await has('eoqRopSub', 'yolda 1 sipariş'); await has('eoqStatus', 'Tedarik süresi çevrimden uzun'); await has('eoqR', 'R = 325');
      await range('eoqS', 210); await click('eoqSetOpt'); await has('eoqQOut', '610 adet'); await has('eoqQstar', '614.8 adet'); await has('eoqPenalty', '0.00 %');
      await page.locator('#eoqService').selectOption('0.5'); await has('eoqRSub', 'z·√(d·L) = 0.0'); await has('eoqRSub', '295.9 + 0.1 adet'); await has('eoqRSub', 'yukarı yuvarlanır'); ok((await page.locator('#eoqService option:checked').textContent()).includes('emniyet stoku ≈ 0'), '%50 etiketi'); await click('eoqReset'); await has('eoqPMeasured', '%5.00 ± 0.44'); await has('eoqServiceOut', 'z = 1.645'); await noOverflow();
      // 2. Kontrol grafikleri
      await click('tab-spc'); await has('spcCenter', '19.9999 mm'); await has('spcXLimits', '19.9869 – 20.0130'); await has('spcRLimits', '0.0000 – 0.0478'); await has('spcFirst', 'sinyal yok'); await has('spcCp', 've 1.33'); await has('spcP', '%0.270'); await has('spcArlTheory', '370.4'); await has('spcArlMeasured', '360.1 ± 12.5'); await has('spcArlDiff', '-2.78 %'); await painted('spcXCanvas'); await painted('spcRCanvas');
      eq(await page.locator('#spcTable tbody tr').count(), 9); eq(await page.locator('#spcTable tr.is-current td').first().textContent(), '5');
      await click('spcShiftOne'); await has('spcArlTheory', '4.495'); await has('spcFirst', '26. alt grup'); await has('spcCpk', 've 1.00'); await has('spcStatus', '+1.00 σ₀ kaydı'); await has('spcArlMeasured', '4.488 ± 0.015');
      await range('spcN', 4); await has('spcArlTheory', '6.303'); eq(await page.locator('#spcTable tr.is-current td').first().textContent(), '4');
      await click('spcReset'); await page.locator('#spcRules').check(); await has('spcArlTheory', '91.75'); await has('spcArlMeasuredSub', 'kural 1/2/3/4'); await range('spcShift', 0.5); await has('spcArlTheory', 'kapalı formül yok'); await has('spcArlDiff', '—');
      await click('spcReset'); eq(await page.locator('#spcRules').isChecked(), false); await range('spcK', 0.5); await has('spcArlMeasured', 'ölçülemedi'); await has('spcArlDiff', '—'); await has('spcArlTheory', '× 10⁸'); await click('spcSpread'); await has('spcArlTheory', '21.98'); await click('spcReset'); await has('spcArlMeasured', '360.1 ± 12.5'); await noOverflow();
      // 3. Akış
      await click('tab-flow'); await has('flowTH', '8.04 ve 8.00 iş/saat'); await has('flowWIP', '9.37 ve 9.29 iş'); await has('flowCT', '69.9 ve 69.6 dk'); await has('flowLittle', '9.37 ve 9.37'); await has('flowBn', '3. istasyon'); await has('flowT0', '23.0 dk'); eq(await page.locator('#flowTable tbody tr').count(), 5); await painted('flowLineCanvas'); await painted('flowCurveCanvas'); await painted('flowTraceCanvas');
      await range('flowRate', 12); await has('flowWIP', 'tanımsız'); await has('flowCT', 'tanımsız'); await has('flowLittle', 'uygulanamaz'); await has('flowStatus', 'kararlı durum yok'); await has('flowTable', 'büyüyor');
      await click('flowSingle'); await has('flowCountOut', '1'); await has('flowWIP', 've 4.00 iş'); await has('flowCT', 've 30.0 dk'); await has('flowBn', 'tek istasyon'); eq(await page.locator('#flowT2Field').isHidden(), true); eq(await page.locator('#flowTable tbody tr').count(), 1);
      await range('flowRate', 9.5); await has('flowWIP', '20.92 ve 19.00 iş'); await has('flowStatus', 'kararlı duruma yaklaşmak için benzetim kısa'); await range('flowRate', 8); ok(!(await read('flowStatus')).includes('benzetim kısa'), 'ρ = 0.8 uyarısız');
      await click('flowBalanced'); await has('flowModeOut', 'çekme'); await has('flowTH', 've 8.57 iş/saat'); await has('flowWIP', '10.00 ve 10 iş'); eq(await page.locator('#flowRateField').isHidden(), true); eq(await page.locator('#flowWipField').isVisible(), true);
      await page.locator('#flowDist').selectOption('det'); await has('flowTH', '12.00 ve 12.00'); await page.locator('#flowDist').selectOption('h2'); await has('flowTHSub', 'kesin formül yok'); await has('flowCTSub', 'kesin formül yok');
      await click('flowReset'); await has('flowWIP', '9.37 ve 9.29 iş'); await page.locator('#flowDist').selectOption('erlang4'); await has('flowWIPSub', 'yaklaşık'); await has('flowStatus', 'Kuram değerleri yaklaşıktır');
      await page.locator('#flowDist').selectOption('det'); await has('flowWIP', '4.70 ve 4.67 iş'); await has('flowWIPSub', 'kesin'); await has('flowStatus', 'darboğaz tek başınaymış gibi'); await has('flowTable', '(yakl.)'); await range('flowRate', 9); await has('flowWIP', '7.89 ve 7.50 iş'); await click('flowReset'); await noOverflow();
      // Klavye, sıfırlama kısayolu, salt okunur API
      await page.locator('#tab-flow').focus(); await page.keyboard.press('Home'); eq(await page.locator('#tab-eoq').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-spc').getAttribute('aria-selected'), 'true'); eq(await page.locator('#panel-eoq').isHidden(), true);
      await page.keyboard.press('End'); eq(await page.locator('#tab-flow').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-eoq').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowLeft'); eq(await page.locator('#tab-flow').getAttribute('aria-selected'), 'true');
      await range('flowRate', 5); await page.locator('h1').click(); await page.keyboard.press('r'); await has('flowRateOut', '8.0 iş/saat');
      eq(await page.evaluate(() => { 'use strict'; try { window.ProductionLab = 1; } catch (_) {} return Object.isFrozen(ProductionLab) && !Object.getOwnPropertyDescriptor(window, 'ProductionLab').writable && typeof ProductionLab.eoq === 'function'; }), true);
      near(await page.evaluate(() => ProductionLab.arlTheory({ n: 5 }).arl), 370.3983, 1e-6);
      assert.deepEqual(errors, []); checks++; await ctx.close();
    }
    console.log(`D üretim: ${checks - before} tarayıcı kontrolü (390 açık, 1280 koyu; üç sekme, hazır ayarlar, klavye, taşma) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
function eq(a, b) { assert.equal(a, b); checks++; }
