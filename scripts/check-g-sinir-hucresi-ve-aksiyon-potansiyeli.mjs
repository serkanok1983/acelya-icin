// Sinir hücresi ve aksiyon potansiyeli: çekirdeğin bağımsız denetimi ve isteğe bağlı tarayıcı denetimi (390 px açık, 1280 px koyu).
// Başvurular sayfanın formüllerini kullanmaz: sabitlerden Nernst, GHK akım denklemiyle sıfır net akım, analitik GHK türevi,
// doğum–ölüm zincirinin kesin durağan dağılımı, Wikipedia'daki özgün işaretli HH hız fonksiyonları, ayrı yazılmış RK4 ve
// orta nokta tümleyicileri (daha küçük dt), küçük bozulmanın sönümü/büyümesi (Hopf), yoğun Gauss eleme ve cosh çözümü (kablo).
// Kullanım: node scripts/check-g-sinir-hucresi-ve-aksiyon-potansiyeli.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "sinir-hucresi-ve-aksiyon-potansiyeli";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.NeuronLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const nearAbs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");

/* ── 1. Nernst ve GHK ── */
const R = 8.314462618, F = 96485.33212, kT = (Tc) => R * (Tc + 273.15) / F * 1000;
for (const Tc of [0, 6.3, 20, 37, 42]) for (const [ci, co] of [[140, 5], [12, 140], [10, 110], [1, 1], [5, 200]]) for (const z of [1, -1, 2]) {
  near(K.nernst(z, ci, co, Tc), kT(Tc) / z * Math.log(co / ci), 1e-12, "Nernst");
}
near(K.nernstSlope(37), 61.54, 1e-3, "37 °C'de 61,5 mV/on kat"); near(K.nernstSlope(37), kT(37) * Math.log(10), 1e-12, "eğim");
ok(K.nernst(1, 0, 5, 37) === null && K.nernst(0, 1, 5, 37) === null, "tanımsız Nernst");
// GHK akım denklemi (Goldman–Hodgkin–Katz akı): I_X ∝ P z² u (c_i − c_o e^{−zu})/(1 − e^{−zu}); toplamı V_GHK'da sıfır
const ghkI = (P, z, ci, co, V, Tc) => { const u = V / kT(Tc); return Math.abs(z * u) < 1e-12 ? P * z * (ci - co) : P * z * z * u * (ci - co * Math.exp(-z * u)) / (1 - Math.exp(-z * u)); };
for (const Tc of [6.3, 37]) for (const pNa of [0, 0.01, 0.05, 0.3, 20]) for (const pCl of [0, 0.45, 1]) for (const Ko of [0.5, 5, 50, 200]) {
  const c = { Ki: 140, Ko, Nai: 12, Nao: 140, Cli: 10, Clo: 110, Tc, pK: 1, pNa, pCl }, V = K.ghk(c);
  const net = ghkI(1, 1, 140, Ko, V, Tc) + ghkI(pNa, 1, 12, 140, V, Tc) + ghkI(pCl, -1, 10, 110, V, Tc);
  nearAbs(net, 0, 1e-9 * 300, "GHK sıfır net akım");
  // analitik türev: dV/dlog10 Ko = ln10 · RT/F · pK Ko / (pay)
  const num = Ko + pNa * 140 + pCl * 10; near(K.ghkSlope(c, 1e-4), Math.log(10) * kT(Tc) * Ko / num, 1e-6, "GHK eğimi");
  if (pNa === 0 && pCl === 0) near(V, K.nernst(1, 140, Ko, Tc), 1e-12, "yalnız K⁺ → Nernst");
}
{
  const c = { Ki: 140, Ko: 5, Nai: 12, Nao: 140, Cli: 10, Clo: 110, Tc: 37, pK: 1, pNa: 0.05, pCl: 0.45 };
  near(K.ghk(c), -65.325, 1e-4, "varsayılan GHK"); near(K.ghkSlope(c), 18.649, 1e-3, "varsayılan eğim");
  ok(K.ghkSlope({ ...c, Ko: 200 }) > 0.9 * K.nernstSlope(37), "yüksek [K]o'da eğim Nernst'e yaklaşır");
  // gerçek hücre kesri: q = C|V|, küre hacim/alan = r/3
  near(K.cellFraction(-89.0587, 140), 1e-6 * 0.0890587 / F / (140e-6 * 1e-3 / 3), 1e-9, "hücre kesri"); nearAbs(K.cellFraction(-89.0587, 140), 1.978e-5, 2e-8, "≈ %0,002");
}

/* ── Oyuncak: kesin durağan dağılım (bağımsız yazım) ve benzetim ── */
function exactToy(N0, M0, dv, Tc) {
  const vt = kT(Tc), lw = new Map([[0, 0]]);
  for (let n = 0; n < N0; n++) { const Vn = -n * dv, Vn1 = -(n + 1) * dv; lw.set(n + 1, lw.get(n) + Math.log((N0 - n) * Math.exp(Vn / (2 * vt))) - Math.log((M0 + n + 1) * Math.exp(-Vn1 / (2 * vt)))); }
  for (let n = 0; n > -M0; n--) { const Vn = -n * dv, Vm = -(n - 1) * dv; lw.set(n - 1, lw.get(n) + Math.log((M0 + n) * Math.exp(-Vn / (2 * vt))) - Math.log((N0 - n + 1) * Math.exp(Vm / (2 * vt)))); }
  const mx = Math.max(...lw.values()); let Z = 0, mV = 0, mI = 0; for (const [n, l] of lw) { const w = Math.exp(l - mx); Z += w; mV += -n * dv * w; mI += (N0 - n) * w; }
  return { V: mV / Z, nIn: mI / Z };
}
for (const [a, b, dv, Tc] of [[400, 40, 0.5, 37], [400, 40, 2, 37], [100, 300, 1, 20], [800, 80, 0.05, 37]]) {
  const e = exactToy(a, b, dv, Tc), k = K.toyExact({ nIn: a, nOut: b, dv, Tc });
  near(k.V, e.V, 1e-9, "toyExact"); near(k.nIn, e.nIn, 1e-9, "toyExact nIn");
  nearAbs(e.V, kT(Tc) * Math.log((a + b - e.nIn) / e.nIn), 0.3, "durağan ortalama ≈ Nernst(ortalama sayılar)");
}
{
  const ex = exactToy(400, 40, 0.5, 37); let mean = 0;
  for (const seed of [1, 2, 3]) { const s = K.toy({ nIn: 400, nOut: 40, dv: 0.5, Tc: 37, seed }); for (let i = 0; i < 80000; i++) s.step(); const r = s.result(); nearAbs(r.V, ex.V, 0.5, "benzetim ortalaması kesin değere"); nearAbs(r.V, r.E, 0.6, "ölçülen ≈ Nernst"); mean += r.V / 3; ok(s.nIn + s.nOut === 440, "iyon korunumu"); ok(s.V === -s.moved * 0.5, "V = −n·dv"); }
  nearAbs(mean, ex.V, 0.25, "üç tohum ortalaması");
  const big = exactToy(400, 40, 2, 37); ok(big.V < ex.V - 15, "iyon etkisi büyükse denge başlangıç Nernst'ine yaklaşır"); ok(Math.abs(big.V - kT(37) * Math.log(0.1)) < 15, "dv = 2 mV'de −61,5'e yakın");
}

/* ── 2. Hodgkin–Huxley: özgün işaretli hızlar (Wikipedia; u = V − V_rest, V_rest = −65 mV) ── */
const orig = (V) => { const u = V + 65; const tr = (x) => (Math.abs(x) < 1e-7 ? 1 : x / (Math.exp(x) - 1)); return { an: 0.01 * 10 * tr((10 - u) / 10), am: 0.1 * 10 * tr((25 - u) / 10), ah: 0.07 * Math.exp(-u / 20), bn: 0.125 * Math.exp(-u / 80), bm: 4 * Math.exp(-u / 18), bh: 1 / (Math.exp((30 - u) / 10) + 1) }; };
for (let V = -100; V <= 60; V += 0.37) { const a = K.rates(V), b = orig(V); for (const k of Object.keys(b)) near(a[k], b[k], 1e-6, "hız " + k + " @" + V); }
for (const V of [-55, -40]) { const a = K.rates(V), b = orig(V); near(a.an, b.an, 1e-6, "vtrap tekil nokta"); near(a.am, b.am, 1e-6, "vtrap tekil nokta"); }
near(K.phiOf(16.3), 3, 1e-12, "Q10 = 3"); near(K.phiOf(6.3), 1, 1e-15, "6,3 °C");
// Bağımsız tümleyiciler (özgün hızlarla)
function own(o) {
  const P = { gNa: o.ttx ? 0 : 120, gK: o.tea ? 0 : 36, gL: 0.3 }, phi = 3 ** (((o.Tc ?? 6.3) - 6.3) / 10);
  const f = (y, I) => { const r = orig(y[0]); const [V, m, h, n] = y; return [I - P.gNa * m ** 3 * h * (V - 50) - P.gK * n ** 4 * (V + 77) - P.gL * (V + 54.3), phi * (r.am * (1 - m) - r.bm * m), phi * (r.ah * (1 - h) - r.bh * h), phi * (r.an * (1 - n) - r.bn * n)]; };
  const I = (t) => (o.pulses || []).reduce((s, q) => s + (t >= q.t0 && t < q.t0 + q.dur ? q.amp : 0), o.bias ?? 0);
  let y = o.y0.slice(), t = 0; const dt = o.dt, N = Math.round(o.tEnd / dt), cr = [], pk = []; let armed = true, best = -1e9, bt = 0, track = false, vmax = -1e9;
  for (let s = 0; s < N; s++) {
    const Ii = I(t + dt / 2), add = (a, b, c) => a.map((v, i) => v + c * b[i]);
    let yn;
    if (o.method === "mid") { const k1 = f(y, Ii); yn = add(y, f(add(y, k1, dt / 2), Ii), dt); }
    else { const k1 = f(y, Ii), k2 = f(add(y, k1, dt / 2), Ii), k3 = f(add(y, k2, dt / 2), Ii), k4 = f(add(y, k3, dt), Ii); yn = y.map((v, i) => v + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])); }
    const Vo = y[0]; y = yn; t = (s + 1) * dt; vmax = Math.max(vmax, y[0]);
    if (armed && Vo < 0 && y[0] >= 0) { cr.push(t - dt * y[0] / (y[0] - Vo)); armed = false; track = true; best = y[0]; bt = t; }
    else if (track) { if (y[0] > best) { best = y[0]; bt = t; } else { pk.push({ t: bt, v: best }); track = false; } }
    if (!armed && y[0] < -30) armed = true;
  }
  return { y, cross: cr, peaks: pk, vmax };
}
const y0 = K.rest(K.params({}), 0);
{ const r = own({ y0: [-70, 0.05, 0.6, 0.3], dt: 0.01, tEnd: 300 }); near(y0[0], r.y[0], 1e-6, "dinlenim (300 ms tümleme)"); nearAbs(y0[0], -64.974, 1e-3, "dinlenim −64,97 mV"); for (let i = 1; i < 4; i++) near(y0[i], r.y[i], 1e-6, "dinlenim kapıları"); }
for (const [amp, dur, Tc] of [[10, 1, 6.3], [50, 0.2, 6.3], [7, 1, 6.3], [20, 1, 18.5], [3, 10, 6.3]]) {
  const pulses = [{ t0: 2, dur, amp }], s = K.simulate({ y0, pulses, tEnd: 30, Tc });
  const fine = own({ y0, pulses, tEnd: 30, dt: 0.001, Tc }), mid = own({ y0, pulses, tEnd: 30, dt: 0.0005, method: "mid", Tc });
  ok(s.cross.length === fine.cross.length && fine.cross.length === mid.cross.length, "tepe sayısı üç tümleyicide aynı");
  s.cross.forEach((t, i) => { nearAbs(t, fine.cross[i], 2e-4, "kesiş anı (RK4 dt/10)"); nearAbs(t, mid.cross[i], 1e-3, "kesiş anı (orta nokta)"); });
  s.peaks.forEach((q, i) => { nearAbs(q.v, fine.peaks[i].v, 2e-3, "tepe (dt/10)"); nearAbs(q.v, mid.peaks[i].v, 2e-2, "tepe (orta nokta)"); nearAbs(q.t, fine.peaks[i].t, 2e-3, "tepe anı"); });
  near(s.yEnd[0], fine.y[0], 1e-5, "30 ms'de V");
}
{ const s = K.simulate({ y0, pulses: [{ t0: 2, dur: 1, amp: 10 }], tEnd: 40 }); nearAbs(s.peaks[0].v, 39.0435, 1e-3, "varsayılan tepe"); nearAbs(s.peaks[0].t, 4.510, 1e-3, "tepe anı"); ok(s.vmin > -77 && s.peaks[0].v < 50, "E_K < V < E_Na"); }
// eşik: kaba kuvvet tarama (bağımsız tümleyici, dt = 0,005)
const fires = (amp, dur, extra = {}) => own({ y0, pulses: [{ t0: 2, dur, amp }], tEnd: 2 + dur + 25, dt: 0.005, ...extra }).cross.length > 0;
for (const dur of [0.1, 0.5, 1, 5]) { const th = K.threshold({ dur }); ok(!fires(th * 0.995, dur) && fires(th * 1.005, dur), `eşik ±%0,5 (D = ${dur})`); }
nearAbs(K.threshold({ dur: 1 }), 6.903, 2e-3, "1 ms eşiği");
ok(K.threshold({ dur: 1, ttx: true, y0, max: 1000 }) === null, "TTX: eşik yok");
{ const s = K.simulate({ y0, tea: true, pulses: [], tEnd: 40 }); ok(s.cross.length === 1 && s.yEnd[0] > -5, "TEA: kendiliğinden depolarize olur, geri dönmez"); nearAbs(K.rest(K.params({ tea: true }), 0)[0], -0.610, 2e-3, "TEA denge noktası"); }
{ const s = K.simulate({ y0, ttx: true, pulses: [{ t0: 2, dur: 1, amp: 100 }], tEnd: 40 }); ok(s.cross.length === 0, "TTX: 100 µA/cm²'de bile tepe yok"); }
// hepsi ya da hiç: eşiğin hemen altı ve üstü arasında sıçrama
{ const th = K.threshold({ dur: 1, rel: 1e-6 }); const lo = K.simulate({ y0, pulses: [{ t0: 2, dur: 1, amp: 0.98 * th }], tEnd: 40, vmaxAfter: 2 }).vmaxAfter, hi = K.simulate({ y0, pulses: [{ t0: 2, dur: 1, amp: 1.02 * th }], tEnd: 40, vmaxAfter: 2 }).vmaxAfter; ok(lo < -50 && hi > 30, `hepsi ya da hiç ${lo} ${hi}`); }

/* ── 3. Refrakter, kuvvet–süre, f–I ── */
{
  const Rf = K.refractory(), thr1 = Rf.thr1, A1 = 2 * thr1, max = 8 * thr1;
  const second = (gap, A2) => own({ y0, pulses: [{ t0: 2, dur: 0.5, amp: A1 }, { t0: 2 + gap, dur: 0.5, amp: A2 }], tEnd: 2 + gap + 20.5, dt: 0.002 }).cross.length >= 2;
  ok(!second(Rf.abs - 0.05, max) && second(Rf.abs + 0.05, max), "mutlak refrakter sınırı (bağımsız tümleyici)");
  nearAbs(Rf.abs, 7.285, 0.01, "mutlak dönem"); nearAbs(Rf.rel, 15.435, 0.01, "göreli dönemin sonu");
  ok(Rf.min.gap === 20 && Rf.min.thr < 0.9 * thr1, "kısa süreli üstün uyarılabilirlik");
  const g10 = Rf.pts.find((p) => p.gap === 10).thr; ok(!second(10, g10 * 0.99) && second(10, g10 * 1.01), "Δ = 10 ms ikinci eşik");
  for (let i = 1; i < Rf.pts.length; i++) { const a = Rf.pts[i - 1], b = Rf.pts[i]; if (a.thr && b.thr && b.gap <= 16) ok(b.thr < a.thr, "eşik göreli dönemde azalır"); }
}
{
  const S = K.strengthDuration();
  nearAbs(S.Irh, 2.236, 2e-3, "reobaz"); nearAbs(S.chron, 1.658, 2e-3, "kronaksi");
  // kısa uyarılarda yük sabite gider
  const q = S.pts.slice(0, 3).map((p) => p.I * p.D); ok(Math.abs(q[0] / q[1] - 1) < 0.02 && Math.abs(q[1] / q[2] - 1) < 0.04, "kısa uyarıda sabit yük");
  // uydurmaların en iyi olduğu: kaba ızgara araması
  for (const kind of ["lapicque", "weiss"]) {
    const E = (c) => S.pts.reduce((s, p) => s + (Math.log(p.I) - Math.log(kind === "lapicque" ? S.Irh / (1 - Math.exp(-p.D / c)) : S.Irh * (1 + c / p.D))) ** 2, 0);
    let best = Infinity, bc = 0; for (let lc = -3; lc <= 3; lc += 1e-4) { const e = E(10 ** lc); if (e < best) { best = e; bc = 10 ** lc; } }
    const fit = kind === "lapicque" ? S.lap : S.weiss; near(fit.c, bc, 1e-3, "uydurma " + kind); near(fit.chron, kind === "lapicque" ? bc * Math.LN2 : bc, 1e-3, "kronaksi " + kind);
  }
  ok(S.lap.rms < S.weiss.rms, "Lapicque daha iyi uyar");
}
{
  // eig4: bilinen özdeğerli matris (P diag P⁻¹, karmaşık çift)
  const A = [[-1, 2, 0, 0], [-2, -1, 0, 0], [0, 0, -3, 0], [0, 0, 1, -0.5]], ev = K.eig4(A).roots;
  const want = [[-0.5, 0], [-1, 2], [-1, -2], [-3, 0]];
  want.forEach((w) => ok(ev.some((z) => Math.hypot(z[0] - w[0], z[1] - w[1]) < 1e-8), "özdeğer " + w));
  const H = K.hopf({});
  nearAbs(H.I, 9.749, 2e-3, "Hopf akımı"); nearAbs(H.f, 93.30, 0.05, "Hopf frekansı");
  // bağımsız: küçük bozulma Hopf altında söner, üstünde büyür; sönüm salınımının frekansı ≈ Im λ / 2π
  // Hopf'un iki yanında küçük bir bozulmanın zarfı: ilk 20 ms ile 200–220 ms arasındaki en büyük sapma
  const env = (I) => { const yy = K.rest(K.params({}), I), p = yy.slice(); p[0] += 0.02; const a = own({ y0: p, bias: I, tEnd: 20, dt: 0.01 }); const mid = own({ y0: a.y, bias: I, tEnd: 180, dt: 0.01 }); const b = own({ y0: mid.y, bias: I, tEnd: 20, dt: 0.01 }); return [a.vmax - yy[0], b.vmax - yy[0]]; };
  { const [a, b] = env(H.I - 0.5); ok(b < 0.7 * a, `Hopf altında söner ${a} ${b}`); }
  { const [a, b] = env(H.I + 0.5); ok(b > 1.5 * a, `Hopf üstünde büyür ${a} ${b}`); }
  {
    const I = H.I - 0.05, yy = K.rest(K.params({}), I), p = yy.slice(); p[0] += 0.01; const P = own({ y0: p, bias: I, tEnd: 60, dt: 0.005 });
    // sıfır geçişlerinden frekans: ayrı koşu, kayıt
    let y = p.slice(), t = 0, prev = y[0] - yy[0]; const zc = []; const f = (yv) => own({ y0: yv, bias: I, tEnd: 0.005, dt: 0.005 }).y;
    for (let s = 0; s < 12000; s++) { y = f(y); t += 0.005; const d = y[0] - yy[0]; if (prev < 0 && d >= 0) zc.push(t - 0.005 * d / (d - prev)); prev = d; }
    const per = (zc[zc.length - 1] - zc[1]) / (zc.length - 2); nearAbs(1000 / per, H.f, 0.5, "Hopf yakınında küçük salınım frekansı"); ok(P.vmax < yy[0] + 1, "küçük kalır");
  }
  const Fi = K.fiCurve(); nearAbs(Fi.onset, 6.228, 2e-3, "sürekli ateşleme eşiği");
  { // uzun protokol (3 s, tepeler 2–3 s penceresinde): sayfadaki not ≈ 6,234
    let lo = 6.2, hi = 6.3; while (hi - lo > 2e-4) { const m = (lo + hi) / 2; if (K.firing({ I: m, tEnd: 3000, tA: 2000 }).f > 0) hi = m; else lo = m; } nearAbs((lo + hi) / 2, 6.234, 1e-3, "3 s protokolünde sürekli ateşleme eşiği"); } nearAbs(Fi.fmin, 48.8, 0.2, "eşikteki frekans");
  const sus = (I) => { const r = own({ y0, bias: I, tEnd: 400, dt: 0.01 }); return r.cross.filter((t) => t >= 150).length >= 2; };
  ok(!sus(Fi.onset - 0.01) && sus(Fi.onset + 0.01), "ateşleme eşiği (bağımsız)");
  ok(Fi.onset < Fi.hopf.I && Fi.fmin > 40, "II. tip: sonlu frekansla başlar, Hopf'tan önce (iki kararlılık)");
  for (let i = 1; i < Fi.pts.length; i++) if (Fi.pts[i - 1].f > 0) ok(Fi.pts[i].f >= Fi.pts[i - 1].f, "f–I artan");
  { const r = K.firing({ I: 10 }), o = own({ y0, bias: 10, tEnd: 400, dt: 0.005 }), cr = o.cross.filter((t) => t >= 150); nearAbs(r.f, 1000 * (cr.length - 1) / (cr[cr.length - 1] - cr[0]), 0.05, "10 µA/cm²'de frekans"); nearAbs(r.f, 68.39, 0.05, "68,4 Hz"); }
}

/* ── 4. Kablo ── */
{
  // Thomas ↔ yoğun Gauss eleme
  const n = 7, a = [], b = [], c = [], d = []; for (let i = 0; i < n; i++) { a.push(i ? -1 - i * 0.1 : 0); b.push(4 + i); c.push(i < n - 1 ? -0.5 : 0); d.push(Math.sin(i + 1)); }
  const x = K.thomas(a, b, c, d), M = Array.from({ length: n }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (j === n ? d[i] : j === i ? b[i] : j === i - 1 ? a[i] : j === i + 1 ? c[i] : 0)));
  for (let k = 0; k < n; k++) for (let i = k + 1; i < n; i++) { const f = M[i][k] / M[k][k]; for (let j = k; j <= n; j++) M[i][j] -= f * M[k][j]; }
  const g = new Array(n); for (let i = n - 1; i >= 0; i--) { let s = M[i][n]; for (let j = i + 1; j < n; j++) s -= M[i][j] * g[j]; g[i] = s / M[i][i]; }
  g.forEach((v, i) => near(x[i], v, 1e-12, "Thomas"));
  for (const [d0, Rm, Ri] of [[500, 3333, 35.4], [1, 3333, 35.4], [50, 20000, 100], [1000, 500, 10]]) {
    const P = K.passive({ d: d0, Rm, Ri }), lam = Math.sqrt((Rm / (Math.PI * d0 * 1e-4)) / (4 * Ri / (Math.PI * (d0 * 1e-4) ** 2)));
    near(P.lam, lam, 1e-12, "λ = √(r_m/r_i)"); near(P.lamMeas, lam, 2e-4, "ölçülen λ");
    const th = (xx) => Math.cosh((P.L - xx) / lam) / Math.cosh(P.L / lam); P.x.forEach((xx, i) => { if (i % 25 === 0) near(P.V[i] / P.V[0], th(xx) / th(P.x[0]), 2e-3, "cosh çözümü"); });
    near(K.passive({ d: d0, Rm, Ri, N: 500 }).lamMeas, lam, 6e-5, "Δx/2'de daha yakın");
  }
  nearAbs(K.passive({ d: 500, Rm: 3333, Ri: 35.4 }).lam * 10, 10.849, 1e-3, "varsayılan λ = 10,85 mm");
  const un = K.speed({ mode: "un", d: 500 }), unF = K.speed({ mode: "un", d: 500, dt: 0.005, N: 500 }), unFF = K.speed({ mode: "un", d: 500, dt: 0.0025, N: 1000 });
  nearAbs(un.v, 12.563, 2e-3, "miyelinsiz hız"); ok(Math.abs(un.v / unF.v - 1) < 0.004 && Math.abs(unF.v / unFF.v - 1) < 0.002, `yakınsama ${un.v} ${unF.v} ${unFF.v}`);
  ok(Math.abs(unF.v - unFF.v) < Math.abs(un.v - unF.v), "hata dt ile küçülür");
  const ds = [10, 30, 100, 300, 1000], vs = ds.map((d) => K.speed({ mode: "un", d }).v);
  const kU = K.logSlope(ds.map((d, i) => ({ x: d, y: vs[i] }))); nearAbs(kU, 0.5, 2e-3, "v ∝ √d");
  // bağımsız eğim: iki uç noktadan
  nearAbs(Math.log(vs[4] / vs[0]) / Math.log(100), 0.5, 2e-3, "uç noktalar");
  const ri = K.speed({ mode: "un", d: 500, Ri: 4 * 35.4 }).v; nearAbs(ri / un.v, 0.5, 3e-3, "v ∝ 1/√R_i");
  ok(K.speed({ mode: "un", d: 500, Tc: 18.5 }).v > 1.4 * un.v, "sıcaklık hızı artırır");
  const my = K.speed({ mode: "my", d: 10 }), myF = K.speed({ mode: "my", d: 10, dt: 0.0005, nInt: 20 });
  nearAbs(my.v, 23.15, 0.02, "miyelinli hız"); ok(Math.abs(my.v / myF.v - 1) < 0.002, "miyelinli yakınsama");
  const md = [1, 2, 5, 10, 20], mv = md.map((d) => K.speed({ mode: "my", d }).v); nearAbs(K.logSlope(md.map((d, i) => ({ x: d, y: mv[i] }))), 1, 2e-3, "miyelinli v ∝ d");
  ok(mv[3] > 10 * vs[0], "10 µm'de miyelin hızı 10 kattan çok artırır");
  // sıçrama: düğümlerin varış zamanları basamaklı; miyelinli bölüm içi gecikme düğümler arası gecikmeden çok küçük
  const r = my.r, nodes = r.segs.map((s, i) => (s.act ? i : -1)).filter((i) => i >= 0), k = 12, n0 = nodes[k], n1 = nodes[k + 1];
  const dn = r.cross[n1] - r.cross[n0]; ok(dn > 0, "düğümden düğüme ilerler"); ok(r.cross[n0 + 5] - r.cross[n0] < dn, "ara bölüm düğümden önce");
}
console.log(`G sinir: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let browser;
  const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await ctx.newPage();
      await page.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      page.setDefaultTimeout(30000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      await page.waitForSelector("section.digest", { state: "visible", timeout: 15000 }); ok(await page.locator("section.digest").isVisible(), "defter görünür");
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, t) => { const v = await read(id); assert(v.includes(t), `${id}: "${v}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const until = async (fn, ms = 30000) => { await page.waitForFunction(fn, null, { timeout: ms }); checks++; };
      const settle = () => page.waitForTimeout(250);
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuval etiketleri");
      ok(await page.evaluate(() => [...document.querySelectorAll('.app-content input[type="range"]')].every((e) => { const s = +e.step, v = (+e.value - +e.min) / s; return Math.abs(v - Math.round(v)) < 1e-6; })), "varsayılanlar adım ızgarasında");
      // 1 · Nernst ve GHK
      await has("t1EK", "−89,1 mV"); await has("t1ENa", "65,7 mV"); await has("t1ECl", "−64,1 mV"); await has("t1V", "−65,3 mV"); await has("t1Slope", "18,6 mV"); await has("t1SlopeTh", "61,5 mV"); await has("t1Real", "0,0020 %");
      await page.click("#t1KoUp"); await has("t1KoOut", "50,0 mM"); await has("t1V", "−30,2 mV"); await has("t1Slope", "50,0 mV"); await page.click("#t1KoDown"); await has("t1KoOut", "5,0 mM");
      await page.click("#t1OnlyK"); await has("t1V", "−89,1 mV"); await has("t1Slope", "61,5 mV"); await has("t1Status", "yalnız K⁺");
      await page.click("#t1Peak"); await has("t1V", "53,4 mV"); await has("t1Status", "tepesinde");
      await range("t1Ko", 200); await has("t1Status", "E_K pozitif"); await range("t1Ko", 0.5); await has("t1KoOut", "0,5 mM");
      await range("t1T", 0); await has("t1SlopeTh", "54,2 mV"); await range("t1T", 42); await has("t1TOut", "42,0 °C");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("t1V", "−65,3 mV"); await has("t1pNaOut", "0,050");
      ok((await page.locator("#t1Rows tr").count()) === 10, "10 satırlı tablo"); await has("t1Rows", "−48,0 mV");
      // oyuncak: tek eşzamanlı blokta yeniden başlat, duraklat, 20 000 adım
      await page.evaluate(() => { document.getElementById("t1Restart").click(); document.getElementById("t1Run").click(); document.getElementById("t1Fast").click(); });
      await has("t1ToySteps", "20\u202f000"); await has("t1ToyMean", "−30,96 mV"); await has("t1ToyE", "−32,05 mV"); await has("t1ToyMoved", "60 / 440"); await has("t1ToyE0", "−61,5 mV");
      ok((await read("t1Run")) === "Devam et", "oyuncak duraklatıldı");
      await range("t1dv", 2); await has("t1dvOut", "2,00 mV"); await has("t1ToyMean", "ölçülüyor"); await has("t1ToySteps", "");
      await page.locator("h1").click(); await page.keyboard.press("Space"); ok((await read("t1Run")) === "Devam et" || (await read("t1Run")) === "Duraklat", "boşluk");
      await page.click("#t1Reset"); await has("t1dvOut", "0,50 mV");
      // sekme klavyesi
      await page.locator("#tab-nernst").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-cond").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-hh").getAttribute("aria-selected")) === "true", "ArrowRight");
      ok(await page.locator("#panel-nernst").isHidden(), "tek panel");
      // 2 · HH
      await has("t2Rest", "−64,97 mV"); await has("t2Peak", "39,04 mV"); await has("t2TPeak", "4,510 ms"); await has("t2Width", "1,454 ms"); await has("t2Thr", "6,903 µA/cm²"); await has("t2Ratio", "1,449"); await has("t2Twin", "× 10");
      await page.click("#t2Below"); await settle(); await has("t2AmpOut", "6,9 µA/cm²"); await has("t2Peak", "tepe yok"); await has("t2Status", "Tepe yok");
      await page.click("#t2Above"); await settle(); await has("t2AmpOut", "7,0 µA/cm²"); await has("t2Peak", " mV"); assert(!(await read("t2Peak")).includes("yok")); checks++;
      await page.check("#t2Ttx"); await settle(); await has("t2Peak", "tepe yok"); await has("t2Thr", "bile yok"); await has("t2Status", "TTX"); await page.click("#t2Below"); await has("t2Status", "eşik yok");
      await page.uncheck("#t2Ttx"); await page.check("#t2Tea"); await settle(); await has("t2Thr", "tanımsız"); await has("t2Status", "kendiliğinden"); await has("t2Rest", "−0,61 mV");
      await page.uncheck("#t2Tea"); await range("t2Dur", 10); await range("t2Amp", 3); await page.waitForTimeout(400); await has("t2Thr", "2,236"); await has("t2Peak", "mV");
      await range("t2T", 18.5); await range("t2Dur", 1); await range("t2Amp", 20); await page.waitForTimeout(400); await has("t2TOut", "18,5 °C"); await has("t2Status", "18,5 °C");
      await range("t2Amp", 100); await range("t2Dur", 0.1); await range("t2T", 0); await page.waitForTimeout(400); await has("t2AmpOut", "100,0"); await has("t2DurOut", "0,1 ms");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("t2Peak", "39,04 mV"); ok(!(await page.locator("#t2Tea").isChecked()), "R kutuları temizler");
      // 3 · Eşik ve refrakter
      await page.click("#tab-refr");
      await until(() => !/hesaplan/.test(document.getElementById("t3Onset").textContent), 60000);
      await has("t3Abs", "7,28 ms"); await has("t3Rel", "15,44 ms"); await has("t3Thr1", "13,241"); await has("t3Thr2", "46,37"); await has("t3Second", "var"); await has("t3Super", "0,851");
      await has("t3Rh", "2,236"); await has("t3Chron", "1,658 ms"); await has("t3Lap", "1,888 ms"); await has("t3Weiss", "2,497 ms"); await has("t3ID", "6,903");
      await has("t3Onset", "6,228"); await has("t3OnsetLong", "6,234 µA/cm²"); await has("t3Fmin", "48,8 Hz"); await has("t3Hopf", "9,749"); await has("t3HopfF", "93,3 Hz"); await has("t3F", "68,4 Hz");
      await range("t3Gap", 5); await settle(); await has("t3Second", "yok"); await has("t3Thr2", "bile yok"); await has("t3Status", "mutlak dönemin içinde");
      await range("t3Gap", 20); await range("t3A2", 11.3); await settle(); await has("t3Second", "var"); await has("t3Status", "dışında"); await has("t3Status", "İlk uyarının başlangıcından sonra"); ok((await page.locator("#panel-hh").textContent()).includes("İki ayrı parametre takımı"), "E_Na farkı açıklanıyor");
      await range("t3A2", 11.2); await settle(); await has("t3Second", "yok");
      await range("t3D", 0.05); await settle(); await has("t3ID", "129,8"); await range("t3D", 20); await settle(); await has("t3ID", "2,236");
      await range("t3I", 8); await settle(); await has("t3Status", "dinlenim de ateşleme de kararlı"); await range("t3I", 6); await settle(); await has("t3F", "0 Hz"); await range("t3I", 50); await settle(); await has("t3F", "117,1 Hz");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("t3GapOut", "10,0 ms"); await has("t3F", "68,4 Hz");
      // 4 · İletim
      await page.click("#tab-cond");
      await has("t4A", "12,56 m/s"); await has("t4B", "12,56 m/s"); await has("t4Status", "25 m/s");
      await page.click("#t4Twin"); await until(() => /m\/s/.test(document.getElementById("t4C").textContent)); await has("t4C", "12,59 m/s"); await has("t4CD", "−0,2");
      await range("t4D", 125); await page.waitForTimeout(600); await has("t4A", "6,28 m/s"); await has("t4AD", "0,00 %");
      await range("t4T", 18.5); await page.waitForTimeout(600); await has("t4TOut", "18,5 °C");
      await page.click("#t4Reset"); await has("t4A", "12,56 m/s");
      await page.click("#t4Play"); ok((await read("t4Play")) === "Duraklat", "oynat"); await page.waitForTimeout(500); await page.locator("h1").click(); await page.keyboard.press("Space"); ok((await read("t4Play")) === "Oynat", "boşluk oynatmayı durdurur");
      await page.locator("#t4Mode").selectOption("pas"); await has("t4A", "10,849 mm"); await has("t4AD", "%"); await has("t4B", "10,849 mm"); ok(await page.locator("#t4Play").isDisabled(), "edilgende oynat kapalı");
      await range("t4D", 125); await page.waitForTimeout(600); await has("t4B", "5,424 mm"); await range("t4Rm", 20000); await range("t4Ri", 10); await range("t4D", 1); await page.waitForTimeout(600); await has("t4RmOut", "20\u202f000"); await has("t4B", "mm");
      await page.click("#t4Twin"); await until(() => /mm/.test(document.getElementById("t4C").textContent));
      await range("t4Ri", 35.4); await page.waitForTimeout(400); await page.locator("#t4Mode").selectOption("my"); await has("t4A", "23,15 m/s"); ok(await page.locator("#t4D").isHidden(), "miyelinlide çap kaydırıcısı değişir");
      await range("t4Dm", 20); await page.waitForTimeout(600); await has("t4A", "46,29 m/s"); await range("t4Dm", 1); await page.waitForTimeout(600); await has("t4DmOut", "1,0 µm");
      await page.click("#t4Sweep"); await until(() => /\d/.test(document.getElementById("t4ExpM").textContent));
      await has("t4ExpU", "0,500"); await has("t4ExpM", "0,998"); await has("t4Gain", "13,0 kat");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("t4A", "12,56 m/s"); await has("t4ExpU", "tarama yok");
      ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      ok(await page.evaluate(() => Object.isFrozen(NeuronLab) && !Object.getOwnPropertyDescriptor(window, "NeuronLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G sinir: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
