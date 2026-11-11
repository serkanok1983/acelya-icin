// Elektrik mühendisliği laboratuvarı: çekirdek (fazör) hesaplarının bağımsız denetimi.
// Sayfadaki çekirdek karmaşık sayılarla çalışır; buradaki başvurular gerçel trigonometri, zaman bölgesinde
// örnekleme, RK4 ile devre benzetimi ve kaba kuvvet taramasıdır. `--browser` ile gerçek arayüz de sınanır.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../elektrik-muhendisligi.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'Çekirdek sınırları (KERNEL-BEGIN/END) gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.PowerLab;
assert(K && Object.isFrozen(K), 'PowerLab dondurulmuş olmalı');

let checks = 0;
const near = (actual, expected, tol = 1e-9, label = '') => {
  assert(Math.abs(actual - expected) <= tol * Math.max(1, Math.abs(expected)), `${label} ${actual} ≠ ${expected}`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };
const W = 2 * Math.PI * 50, T = 0.02, R3 = Math.sqrt(3), R2 = Math.SQRT2, D = Math.PI / 180;
const mag = K.C.abs;

/* ── 0 · Karmaşık sayı yardımcıları ── */
for (const [a, b] of [[[3, 4], [1, -2]], [[-2.5, 0.3], [0.7, 9]], [[0, 1], [0, 1]]]) {
  const za = K.C.of(...a), zb = K.C.of(...b), q = K.C.div(K.C.mul(za, zb), zb);
  near(q.re, a[0]); near(q.im, a[1]);
  near(mag(K.C.mul(za, zb)), Math.hypot(...a) * Math.hypot(...b));
  near(K.C.mul(za, K.C.conj(za)).im, 0); near(K.C.mul(za, K.C.conj(za)).re, a[0] ** 2 + a[1] ** 2);
}
near(mag(K.C.polar(5, 1.1)), 5); near(K.C.arg(K.C.polar(5, 1.1)), 1.1);
near(K.C.mul(K.C.of(0, 1), K.C.of(0, 1)).re, -1);
assert.throws(() => K.C.div(K.C.of(1, 0), K.C.of(0, 0))); checks++;

/* ── 1 · Üç faz ── */
// Zaman bölgesinde bağımsız kurulum: gerilim ve akım sinüsleri gerçel formüllerle yazılır.
function timeDomain({ VL, conn, Z, pf, unb, Qc }, N = 7200) {
  const Vph = VL / R3, phi = Math.acos(pf), Cst = Qc / (W * VL * VL); // yıldız eşdeğeri sığa
  const v = (k, t) => R2 * Vph * Math.cos(W * t - k * 120 * D);
  const dv = (k, t) => -W * R2 * Vph * Math.sin(W * t - k * 120 * D);
  const zk = [Z * unb, Z, Z];
  let iLoad;
  if (conn === 'star') iLoad = (k, t) => (R2 * Vph / zk[k]) * Math.cos(W * t - k * 120 * D - phi);
  else {
    // v_ab = v_a − v_b = √2·VL·cos(ωt + 30°) ve çevrimsel kaydırmaları
    const br = (k, t) => (R2 * VL / zk[k]) * Math.cos(W * t + 30 * D - k * 120 * D - phi);
    iLoad = (k, t) => br(k, t) - br((k + 2) % 3, t);
  }
  const out = { mean: 0, min: Infinity, max: -Infinity, aMin: Infinity, aMax: -Infinity, rmsN: 0, rmsI: [0, 0, 0], sumMax: 0 };
  for (let n = 0; n < N; n++) {
    const t = (n * T) / N;
    let p = 0, iN = 0, iSum = 0;
    for (let k = 0; k < 3; k++) {
      const il = iLoad(k, t), i = il + Cst * dv(k, t);
      p += v(k, t) * i; iN += il; iSum += i; out.rmsI[k] += i * i / N;
      if (k === 0) { out.aMin = Math.min(out.aMin, v(0, t) * i); out.aMax = Math.max(out.aMax, v(0, t) * i); }
    }
    out.mean += p / N; out.min = Math.min(out.min, p); out.max = Math.max(out.max, p);
    out.rmsN += iN * iN / N; out.sumMax = Math.max(out.sumMax, Math.abs(iSum));
  }
  out.rmsN = Math.sqrt(out.rmsN); out.rmsI = out.rmsI.map(Math.sqrt);
  return out;
}
for (const VL of [200, 400, 480]) for (const conn of ['star', 'delta']) for (const Z of [5, 10, 50]) for (const pf of [0.3, 0.8, 1]) for (const Qc of [0, 5400, 60000]) {
  const cfg = { VL, conn, Z, pf, unb: 1, Qc }, s = K.threePhase(cfg), phi = Math.acos(pf);
  const IL = conn === 'star' ? VL / (R3 * Z) : (R3 * VL) / Z;
  const P = R3 * VL * IL * pf, Q = R3 * VL * IL * Math.sin(phi), S = R3 * VL * IL;
  near(s.Vph * R3, VL); near(mag(s.VLL[0]), VL); near(K.C.arg(s.VLL[0]) - K.C.arg(s.V[0]), 30 * D);
  near(mag(s.Iload[0]), IL); near(mag(s.Iload[0]) / mag(s.branch[0]), conn === 'star' ? 1 : R3);
  near(s.P, P); near(s.Q1, Q, 1e-9); near(s.Sabs1, S); near(s.pf1, pf);
  near(s.Q2, Q - Qc, 1e-9, 'Q2'); near(s.pf2, P / Math.hypot(P, Q - Qc)); near(1 - s.reduction, Math.hypot(P, Q - Qc) / S);
  near(mag(s.Iline[0]), Math.hypot(P, Q - Qc) / (R3 * VL));
  if (conn === 'star') near(mag(s.neutral), 0, 1e-9 * IL); else ok(s.neutral === null, 'üçgende nötr yok');
  near(s.capDelta * 3 * W * VL * VL, Qc); near(s.capStar, 3 * s.capDelta);
  // Zaman bölgesi: ortalama güç = P, toplam sabit, tek faz 2f ile salınır
  const td = timeDomain(cfg), m = K.ripple(s), I2 = Math.hypot(P, Q - Qc) / (R3 * VL), pf2 = P / Math.hypot(P, Q - Qc);
  near(td.mean, P, 1e-9, 'ortalama güç'); ok(td.max - td.min < 1e-9 * S, 'üç faz toplamı sabit');
  ok(m.pp < 1e-9 * S, 'çekirdek dalgalanması ~0'); near(m.mean, P); near(s.pulse, 0, 1e-9 * S);
  near(td.aMax, (VL / R3) * I2 * (pf2 + 1), 1e-6); near(td.aMin, (VL / R3) * I2 * (pf2 - 1), 1e-6 * S);
  near(m.aMax, (VL / R3) * I2 * (pf2 + 1), 1e-8); near(m.aMin, (VL / R3) * I2 * (pf2 - 1), 1e-8 * S);
  near(m.aFreq, 100, 1e-6, '2f'); near(td.rmsI[0], I2, 1e-9);
  // Yıldız/üçgen: aynı empedanslar üçgende 3 kat güç çeker
  if (conn === 'delta') near(s.P / K.threePhase({ ...cfg, conn: 'star' }).P, 3);
  // Hedef güç katsayısı: gereken Qc uygulanınca hedef tutar
  for (const target of [0.9, 0.95, 1]) {
    const q = K.neededQc(s.P, s.Q1, target);
    if (pf >= target) near(q, 0, 1e-9 * S); else { near(K.threePhase({ ...cfg, Qc: q }).pf2, target, 1e-9); near(q, P * (Math.tan(phi) - Math.tan(Math.acos(target))), 1e-9); }
  }
}
// Dengesiz yük
for (const conn of ['star', 'delta']) for (const unb of [0.5, 0.75, 1.5, 2]) for (const pf of [0.3, 0.8, 1]) for (const Qc of [0, 5400]) {
  const cfg = { VL: 400, conn, Z: 10, pf, unb, Qc }, s = K.threePhase(cfg), td = timeDomain(cfg), m = K.ripple(s);
  const P = conn === 'star' ? ((400 / R3) ** 2 * pf / 10) * (1 / unb + 2) : (400 ** 2 * pf / 10) * (1 / unb + 2);
  near(s.P, P); near(td.mean, P, 1e-9);
  near(s.Q2, (P / pf) * Math.sin(Math.acos(pf)) - Qc, 1e-9 * P);
  near(m.pp, td.max - td.min, 1e-6, 'dalgalanma: çekirdek ve kaba örnekleme'); near(m.pp, 2 * s.pulse, 1e-6, 'dalgalanma = 2|ΣVI|');
  ok(m.pp > 0.05 * P, 'dengesiz yükte güç dalgalanır');
  s.Iline.forEach((z, k) => near(mag(z), td.rmsI[k], 1e-9));
  if (conn === 'star') { near(mag(s.neutral), td.rmsN, 1e-9); near(mag(s.neutral), (400 / R3 / 10) * Math.abs(1 / unb - 1), 1e-9); }
  else { ok(td.sumMax < 1e-9 * mag(s.Iline[0]), 'üçgende hat akımları toplamı 0'); const z = s.Iline.reduce((a, b) => K.C.add(a, b)); near(mag(z), 0, 1e-9 * mag(s.Iline[0])); }
}
// RK4: R–L yükün kalıcı durumdaki ortalama gücü fazör sonucuyla aynı mı?
function rk4(deriv, y, t, h) {
  const add = (a, b, k) => a.map((v, i) => v + k * b[i]);
  const k1 = deriv(t, y), k2 = deriv(t + h / 2, add(y, k1, h / 2)), k3 = deriv(t + h / 2, add(y, k2, h / 2)), k4 = deriv(t + h, add(y, k3, h));
  return y.map((v, i) => v + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
}
for (const [VL, Z, pf] of [[400, 10, 0.8], [230, 25, 0.5], [480, 5, 0.95]]) {
  const Vph = VL / R3, R = Z * pf, L = (Z * Math.sin(Math.acos(pf))) / W, v = (t) => R2 * Vph * Math.cos(W * t);
  const n = 4000, h = T / n;
  let y = [0], t = 0, e = 0, i2 = 0;
  for (let k = 0; k < 40 * n; k++) { y = rk4((tt, [i]) => [(v(tt) - R * i) / L], y, t, h); t += h; if (k >= 39 * n) { e += v(t) * y[0] / n; i2 += y[0] * y[0] / n; } }
  const s = K.threePhase({ VL, conn: 'star', Z, pf });
  near(3 * e, s.P, 1e-6, 'RK4 ortalama güç'); near(Math.sqrt(i2), mag(s.Iload[0]), 1e-6, 'RK4 akım');
}
// Varsayılan durumun başvuru sayıları
{
  const s = K.threePhase({ VL: 400, conn: 'star', Z: 10, pf: 0.8 });
  near(s.P, 12800); near(s.Q1, 9600); near(s.Sabs1, 16000); near(mag(s.Iload[0]), 23.0940107676);
  near(K.neededQc(s.P, s.Q1, 0.95), 5392.84345371, 1e-9);
  const c = K.threePhase({ VL: 400, conn: 'star', Z: 10, pf: 0.8, Qc: 5400 });
  near(c.pf2, 0.950157464068, 1e-9); near(c.reduction, 0.158034294048, 1e-9); near(c.capDelta, 35.8098621957e-6, 1e-9);
}
for (const bad of [{ VL: 0, Z: 10, pf: 0.8 }, { VL: 400, Z: 10, pf: 0 }, { VL: 400, Z: 10, pf: 1.2 }, { VL: 400, Z: 10, pf: 0.8, conn: 'zigzag' }, { VL: 400, Z: 10, pf: 0.8, Qc: -1 }]) { assert.throws(() => K.threePhase(bad)); checks++; }

/* ── 2 · İletim hattı ── */
for (const P of [1e6, 1e8, 5e8]) for (const V of K.VOLTAGE_CLASSES) for (const L of [1e3, 1e5, 5e5]) for (const mat of ['al', 'cu', 'cua']) for (const A of [5e-5, 5e-4, 1e-3]) for (const pf of [0.7, 0.95, 1]) {
  const rho = K.MATERIALS[mat].rho, cfg = { P, V, L, rho, A, pf }, r = K.transmission(cfg);
  const R = (rho * L) / A, I = P / (R3 * V * pf), loss = (P * P * rho * L) / (A * V * V * pf * pf), phi = Math.acos(pf);
  near(r.R, R); near(r.Imag, I); near(r.loss, loss); near(r.loss, 3 * I * I * R);
  near(r.Psend, P + loss, 1e-9); ok(Math.abs(r.balance) <= 1e-9 * r.Psend, 'enerji dengesi');
  near(r.eff, P / (P + loss)); near(r.lossFrac + r.eff, 1); near(r.lossPerDelivered, loss / P);
  const Vr = V / R3, VsPh = Math.sqrt(Vr * Vr + (I * R) ** 2 + 2 * Vr * I * R * pf); // kosinüs teoremi
  near(r.VsLine, R3 * VsPh); near(r.drop, R3 * VsPh - V, 1e-9 * (R3 * VsPh) / Math.max(1, Math.abs(R3 * VsPh - V)) + 1e-9); near(r.J, I / A);
  // Zaman bölgesi: gönderen uçtaki üç fazın ortalama gücü
  const ang = Math.atan2(-I * R * Math.sin(phi), Vr + I * R * pf);
  let mean = 0;
  const N = 360;
  for (let n = 0; n < N; n++) { const t = (n * T) / N; for (let k = 0; k < 3; k++) mean += (R2 * VsPh * Math.cos(W * t + ang - k * 120 * D)) * (R2 * I * Math.cos(W * t - phi - k * 120 * D)) / N; }
  near(mean, P + loss, 1e-9, 'gönderen uç ortalama gücü');
  // 1/V²: gerilim iki katına çıkınca kayıp dörtte bire iner; eğim −2
  near(K.transmission({ ...cfg, V: 2 * V }).loss, loss / 4);
  near(Math.log(K.transmission({ ...cfg, V: 3 * V }).loss / r.loss) / Math.log(3), -2);
  if (V === 154000) near(K.lossSlope(cfg), -2, 1e-9, 'log–log eğim');
}
{
  const cfg = { P: 1e8, V: 154000, L: 1e5, rho: 2.82e-8, A: 5e-4, pf: 0.95 }, r = K.transmission(cfg);
  near(r.R, 5.64); near(r.Imag, 394.634497054, 1e-9); near(r.loss, 2635059.6556, 1e-9); near(r.lossFrac, 0.0256740695084, 1e-9);
  near(r.dropFrac, 0.0238112527285, 1e-9); near(r.eff, 0.974325930492, 1e-9);
  near(K.transmission({ ...cfg, V: 400000 }).loss, 390581.717452, 1e-9); near(K.transmission({ ...cfg, V: 34500 }).lossPerDelivered, 0.525041586156, 1e-9);
  // Eğim ölçümünün kendi başına sınanması: bağımsız en küçük kareler
  let sx = 0, sy = 0, sxx = 0, sxy = 0, n = 40;
  for (let k = 0; k < n; k++) { const V = 300 * (2000 ** (k / (n - 1))), x = Math.log(V), y = Math.log((cfg.P ** 2 * cfg.rho * cfg.L) / (cfg.A * V * V * cfg.pf ** 2)); sx += x; sy += y; sxx += x * x; sxy += x * y; }
  near((n * sxy - sx * sy) / (n * sxx - sx * sx), -2, 1e-9);
}
for (const bad of [{ P: 0 }, { V: 0 }, { A: 0 }, { pf: 0 }, { pf: 1.1 }, { L: -1 }]) { assert.throws(() => K.transmission({ P: 1e8, V: 154000, L: 1e5, rho: 2.82e-8, A: 5e-4, pf: 0.95, ...bad })); checks++; }

/* ── 3 · Transformatör ── */
// Bağımsız çözüm: gerçel bileşenlerle |V2′ + I·Z| = V1 denklemi ikiye bölmeyle
function ownLoad(p, x, pf, lead, frozen = false) {
  const I = x * p.In, sn = Math.sin(Math.acos(pf)) * (lead ? -1 : 1);
  const a = I * (p.Req * pf + p.Xeq * sn), b = I * (p.Xeq * pf - p.Req * sn);
  let lo = 0, hi = 2 * p.V1n;
  for (let k = 0; k < 200; k++) { const mid = (lo + hi) / 2; if (Math.hypot(mid + a, b) < p.V1n) lo = mid; else hi = mid; }
  const V2p = frozen ? p.V1n : (lo + hi) / 2, Pout = V2p * I * pf, Pcu = I * I * p.Req;
  return { V2p, Pout, Pcu, eta: Pout / (Pout + Pcu + p.Pcore), reg: (p.V1n - V2p) / V2p };
}
function bruteMax(fn, lo, hi, step) { let bx = lo, bv = -Infinity; for (let x = lo; x <= hi + 1e-12; x += step) { const v = fn(x); if (v > bv) { bv = v; bx = x; } } return { x: bx, v: bv }; }
for (const rPct of [0.5, 1.5, 3]) for (const xPct of [1, 4, 8]) for (const pcPct of [0.1, 0.5, 1]) for (const imPct of [0.5, 2, 5]) {
  const p = K.trafoParams({ rPct, xPct, pcPct, imPct });
  near(p.Zb, 115.2); near(p.Req, rPct * 1.152); near(p.Xeq, xPct * 1.152); near(p.Pcore, pcPct * 500); near(p.PcuRated, rPct * 500); near(p.Rc, 5760000 / (pcPct * 500)); near(p.Xm, 2400 / (imPct / 100 * (50000 / 2400)));
  for (const pf of [0.2, 0.8, 1]) for (const lead of [false, true]) {
    for (const x of [0, 0.25, 0.5, 1, 1.5]) {
      const r = K.trafoLoad(p, x, pf, lead), o = ownLoad(p, x, pf, lead);
      near(r.V2p, o.V2p, 1e-10, 'V2′'); near(r.V2, o.V2p / 10, 1e-10); near(r.reg, o.reg, 1e-9 + 1e-9); near(r.Pout, o.Pout, 1e-10); near(r.Pcu, x * x * p.PcuRated); near(r.Pcore, p.Pcore);
      ok(Math.abs(r.balance) <= 1e-9 * r.Pin, 'transformatör enerji dengesi'); near(r.Pin, o.Pout + o.Pcu + p.Pcore, 1e-9);
      if (x > 0) near(r.eta, o.eta, 1e-9); else near(r.eta, 0);
      ok(r.pfIn > 0 && r.pfIn <= 1 + 1e-12, 'giriş güç katsayısı');
    }
    // Verim tepesi: çekirdeğin bulduğu ile kaba kuvvet taraması
    const best = K.trafoBest(p, pf, lead), brute = bruteMax((x) => ownLoad(p, x, pf, lead).eta, 0.001, 2, 0.0005);
    near(best.x, brute.x, 6e-4, 'verim tepesi yeri'); ok(best.eta >= brute.v - 1e-12, 'verim tepesi değeri'); ok(best.eta >= best.etaAtTheory - 1e-15, 'tepe ≥ kuram noktasındaki verim');
    near(best.theory, Math.sqrt(pcPct / rPct));
    // V2 sabit tutulursa kaba kuvvet tepe tam √(Pc/Pcu) üstüne düşer: kayma yalnız V2'nin yükle değişmesindendir
    const frozen = bruteMax((x) => ownLoad(p, x, pf, lead, true).eta, 0.001, 2, 0.0005);
    near(frozen.x, Math.sqrt(pcPct / rPct), 6e-4, 'V2 sabitken tepe = kuram');
  }
  // Boşta ve kısa devre deneyleri
  const t = K.trafoTests(p), d2 = p.Req ** 2 + p.Xeq ** 2;
  const G = 1 / p.Rc + p.Req / d2, B = 1 / p.Xm + p.Xeq / d2, Vsc = p.In / Math.hypot(G, B);
  near(t.oc.P, p.Pcore); near(t.oc.I, 2400 * Math.hypot(1 / p.Rc, 1 / p.Xm)); near(t.oc.Rc, p.Rc, 1e-9); near(t.oc.Xm, p.Xm, 1e-8);
  near(t.sc.V, Vsc); near(t.sc.P, Vsc * Vsc * G); near(t.sc.I, p.In);
  near(t.sc.Rcorr, p.Req, 1e-8, 'düzeltilmiş R'); near(t.sc.Xcorr, p.Xeq, 1e-8, 'düzeltilmiş X');
  ok(Math.abs(t.sc.R - p.Req) / p.Req < 0.02 && Math.abs(t.sc.X - p.Xeq) / p.Xeq < 0.02, 'klasik hesap yüzde 2 içinde');
  ok(t.sc.R !== p.Req, 'klasik hesap paralel kol yüzünden tam değil');
}
// RK4 ile zaman bölgesi: seri kol + yük devresini çöz, V2 ve güçleri fazör sonucuyla karşılaştır
{
  const p = K.trafoParams({ rPct: 1.5, xPct: 4, pcPct: 0.5, imPct: 2 }), n = 4000, h = T / n, v1 = (t) => R2 * 2400 * Math.cos(W * t);
  for (const [x, pf, lead] of [[1, 0.8, false], [0.5, 0.6, false], [1, 0.8, true], [1.5, 1, false]]) {
    const r = K.trafoLoad(p, x, pf, lead), ZL = r.V2p / r.I, RL = ZL * pf, XL = ZL * Math.sin(Math.acos(pf));
    const Ls = p.Xeq / W, Rt = p.Req + RL;
    let y, deriv, v2;
    if (!lead) { const Ll = XL / W; y = [0]; deriv = (t, [i]) => [(v1(t) - Rt * i) / (Ls + Ll)]; v2 = (t, [i]) => RL * i + Ll * deriv(t, [i])[0]; }
    else { const Cl = 1 / (W * XL); y = [0, 0]; deriv = (t, [i, vc]) => [(v1(t) - Rt * i - vc) / Ls, i / Cl]; v2 = (t, [i, vc]) => RL * i + vc; }
    let t = 0, sv = 0, si = 0, sp = 0, sin = 0;
    const periods = lead ? 400 : 60; // R–L–C devresinde geçici rejim daha yavaş söner
    for (let k = 0; k < periods * n; k++) { y = rk4(deriv, y, t, h); t += h; if (k >= (periods - 1) * n) { const u = v2(t, y); sv += u * u / n; si += y[0] * y[0] / n; sp += u * y[0] / n; sin += v1(t) * y[0] / n; } }
    near(Math.sqrt(sv), r.V2p, 2e-6, 'RK4 V2′'); near(Math.sqrt(si), r.I, 2e-6, 'RK4 I'); near(sp, r.Pout, 4e-6, 'RK4 Pout'); near(sin + 2400 ** 2 / p.Rc, r.Pin, 4e-6, 'RK4 Pin');
  }
  // Varsayılan durumun başvuru sayıları
  const r = K.trafoLoad(p, 1, 0.8, false), best = K.trafoBest(p, 0.8, false), t = K.trafoTests(p);
  near(r.V2, 231.296511603, 1e-9); near(r.reg, 0.0376291381878, 1e-9); near(r.eta, 0.974715178241, 1e-9); near(r.Pcu, 750); near(r.Pcore, 250);
  near(best.x, 0.565378302, 1e-6); near(best.theory, 0.57735026919, 1e-9); near(best.eta, 0.978370938906, 1e-9);
  near(t.sc.V, 102.438410823, 1e-9); near(t.sc.P, 749.14466578, 1e-9); near(t.sc.R, 1.72602930996, 1e-9); near(t.sc.X, 4.60414397695, 1e-9);
  ok(K.trafoLoad(p, 1, 0.8, true).reg < 0, 'kapasitif yükte negatif regülasyon');
  ok(K.trafoBest(p, 0.8, false).x < best.theory && K.trafoBest(p, 0.8, true).x > best.theory, 'tepe kayması yönü: endüktifte aşağı, kapasitifte yukarı');
}
for (const call of [() => K.trafoParams({ rPct: 0, xPct: 4, pcPct: 0.5, imPct: 2 }), () => K.trafoLoad(K.trafoParams({ rPct: 1.5, xPct: 4, pcPct: 0.5, imPct: 2 }), -1, 0.8), () => K.trafoLoad(K.trafoParams({ rPct: 1.5, xPct: 4, pcPct: 0.5, imPct: 2 }), 1, 0), () => K.neededQc(0, 1, 0.9)]) { assert.throws(call); checks++; }

console.log(`D elektrik mühendisliği: ${checks.toLocaleString('tr-TR')} bağımsız fazör, zaman bölgesi, enerji dengesi ve kaba kuvvet kontrolü PASS`);

/* ── Arayüz (isteğe bağlı): node scripts/check-d-electric.mjs --browser ── */
if (process.argv.includes('--browser')) {
  const { createRequire } = await import('node:module');
  const { createServer } = await import('node:http');
  const { join, extname } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url));
  let chromium;
  for (const dir of [root, ...(process.env.NODE_PATH || '').split(':').filter(Boolean), '/opt/node-tools']) {
    try { ({ chromium } = createRequire(join(dir, 'package.json'))('playwright')); break; } catch (_) { /* sıradaki */ }
  }
  if (!chromium) ({ chromium } = await import('playwright'));
  const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };
  const server = createServer((req, res) => {
    const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', mime[extname(file)] || 'application/octet-stream');
    res.end(fs.readFileSync(file));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const shotDir = process.argv.includes('--shots') ? process.argv[process.argv.indexOf('--shots') + 1] : null;
  let browser;
  try {
    browser = await chromium.launch();
    for (const [width, height, theme] of [[390, 900, 'light'], [1280, 900, 'dark']]) {
      const before = checks;
      const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2 });
      const page = await ctx.newPage();
      await page.addInitScript((th) => { localStorage.setItem('acelya-theme', th); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      page.setDefaultTimeout(5000);
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error' && !m.text().startsWith('Failed to load resource')) errors.push(m.text()); });
      // Defter dosyası henüz yazılmamış olabilir; onun dışındaki her başarısız istek hatadır.
      page.on('response', (r) => { if (r.status() >= 400 && !r.url().endsWith('/shared/digest/elektrik-muhendisligi.js')) errors.push(`${r.status()} ${r.url()}`); });
      await page.goto(`http://127.0.0.1:${server.address().port}/elektrik-muhendisligi.html`);
      const read = async (id) => (await page.locator('#' + id).textContent()).replace(/\u00a0/g, ' ');
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `${id}: "${t}" içinde "${text}" yok (${width})`); checks++; };
      const lacks = async (id, text) => { const t = await read(id); assert(!t.includes(text), `${id}: "${t}" içinde "${text}" olmamalı`); checks++; };
      const range = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v);
      const click = (id) => page.locator('#' + id).click();
      const noOverflow = async (label) => { assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `yatay taşma: ${label} (${width})`); checks++; };
      const painted = async (id) => { assert.equal(await page.locator('#' + id).evaluate((c) => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; const seen = new Set(); for (let i = 0; i < d.length; i += 4 * 97) seen.add(d[i] + ',' + d[i + 1] + ',' + d[i + 2]); return seen.size > 3; }), true, `boş tuval: ${id}`); checks++; };
      const shot = async (name) => { if (shotDir) await page.screenshot({ path: join(shotDir, `${name}-${width}-${theme}.png`), fullPage: true }); };
      assert.equal(await page.evaluate(() => document.documentElement.dataset.theme === 'light'), theme === 'light'); checks++;

      // 01 · Üç faz: varsayılan durum
      await has('phVph', '230.9 V'); await has('phIline', '23.09 A'); await has('phP', '12.80 kW'); await has('phQ', '9.600 kvar'); await has('phS', '16.00 kVA');
      await has('phPf1', '0.800'); await has('phRatioI', '1.000'); await has('phRipple', 'yuvarlama'); await has('phRippleTheory', '0'); await has('phSingleF', '100.00 Hz');
      await has('phSingle', '−1.067 kW'); await has('phSingle', '9.600 kW'); await has('phNeutral', '0 A'); await has('phQneed', '5.393 kvar'); await has('phCneed', '35.76 µF');
      await has('phReduce', 'Batarya kapalı'); await has('phStatus', 'Dengeli yük');
      for (const id of ['phPhasor', 'phTriangle', 'phWave', 'phPower']) await painted(id);
      await noOverflow('üç faz'); await shot('01-varsayilan');
      // animasyon ilerliyor mu, Boşluk durduruyor mu
      const inst = async () => page.evaluate(() => { const c = document.getElementById('phPhasor'); return c.toDataURL().length + ':' + c.toDataURL().slice(-64); });
      const a1 = await inst(); await page.waitForTimeout(350); const a2 = await inst(); assert.notEqual(a1, a2, 'fazörler dönmeli'); checks++;
      await click('phToggle'); await has('phToggle', 'Devam et'); const b1 = await inst(); await page.waitForTimeout(300); assert.equal(await inst(), b1, 'duraklatınca fazörler durmalı'); checks++;
      await click('phToggle'); await has('phToggle', 'Duraklat');
      // kompanzasyon
      await click('phSetTarget'); assert.equal(await page.locator('#phCapOn').isChecked(), true); checks++;
      assert.equal(await page.locator('#phQc').inputValue(), '5.4'); checks++;
      await has('phPf2', '0.950 geri'); await has('phReduce', '15.8 %'); await has('phI2', '19.44 A'); await has('phCnow', '35.81 µF'); await has('phStatus', '0.800 → 0.950');
      await range('phQc', 20); await has('phPf2', 'ileri'); await has('phStatus', 'Aşırı kompanzasyon'); await shot('01-asiri');
      await page.locator('#phCapOn').uncheck(); await has('phReduce', 'Batarya kapalı'); await has('phPf2', '0.800 geri');
      // üçgen ve dengesizlik
      await page.locator('#phConn').selectOption('delta'); await has('phIline', '69.28 A'); await has('phIbranch', '40.00 A'); await has('phRatioI', '1.732'); await has('phP', '38.40 kW'); await has('phNeutral', 'Nötr iletkeni yok');
      await range('phUnb', 0.5); await has('phRipple', '62.50 %'); await has('phRippleTheory', '62.50 %'); await has('phStatus', 'Dengesiz yük'); await has('phRatioI', 'Tek bir oran yok');
      await page.locator('#phConn').selectOption('star'); await has('phNeutral', '23.09 A'); await has('phIline', '46.19 / 23.09 / 23.09 A'); await has('phP', '17.07 kW'); await shot('01-dengesiz');
      await range('phPf', 1); await has('phQ', '0 var'); await has('phQneed', 'Gerekmez'); await lacks('phPf1', 'geri');
      // hedef zaten karşılanıyorsa düğme 0 kvar'lık bataryayı devreye almamalı
      await has('phStatus', 'kompanzasyon gerekmez'); await click('phSetTarget');
      assert.equal(await page.locator('#phCapOn').isChecked(), false, 'gereksiz batarya devreye girmemeli'); checks++;
      await has('phCnow', 'Batarya kapalı'); await has('phReduce', 'Batarya kapalı'); await has('phStatus', 'kompanzasyon gerekmez');
      await page.locator('#phCapOn').check(); await click('phSetTarget');
      assert.equal(await page.locator('#phCapOn').isChecked(), false, 'açık batarya, gerek yoksa kapatılmalı'); checks++;
      await click('phaseReset'); await has('phP', '12.80 kW'); await has('phNeutral', '0 A (dengeli)'); assert.equal(await page.locator('#phCapOn').isChecked(), false); checks++;
      assert.equal(await page.locator('#phQc').inputValue(), '5.4'); checks++; assert.equal(await page.locator('#phQc').isDisabled(), true); checks++;

      // 02 · İletim
      await click('tab-line'); assert.equal(await page.locator('#panel-phase').isHidden(), true); checks++;
      await has('lnR', '5.640 Ω'); await has('lnI', '394.6 A'); await has('lnLoss', '2.635 MW'); await has('lnLossPct', '2.57 %'); await has('lnEff', '97.43 %'); await has('lnDrop', '2.38 %'); await has('lnVs', '157.7 kV');
      await has('lnSlope', '−2.0000'); await has('lnJ', '0.79 A/mm²'); await has('lnIcons', '151.9 kA'); await has('lnBalance', '0'); await has('lnRows', '390.6 kW'); await has('lnStatus', '6.75 kat');
      assert.equal(await page.locator('#lnRows tr').count(), 4); checks++; assert.equal(await page.locator('#lnRows tr.is-current th').textContent(), '154 kV'); checks++;
      for (const id of ['lnStage', 'lnChart']) await painted(id);
      await noOverflow('iletim'); await shot('02-varsayilan');
      await page.locator('#lnV').selectOption('400'); await has('lnLoss', '390.6 kW'); await has('lnLossPct', '0.389 %'); await has('lnI', '151.9 A');
      await page.locator('#lnV').selectOption('34.5'); await has('lnLoss', '52.50 MW'); await has('lnStatus', 'Model sınırında'); await has('lnLossPct', '34.43 %');
      await page.locator('#lnV').selectOption('0.4'); await has('lnStatus', 'çalıştırılamaz'); await has('lnI', '151.9 kA'); await has('lnSlope', '−2.0000'); await noOverflow('iletim 0.4 kV'); await shot('02-alcak');
      await page.locator('#lnMat').selectOption('cu'); await has('lnR', '3.360 Ω'); await range('lnA', 1000); await has('lnR', '1.680 Ω'); await range('lnL', 500); await has('lnR', '8.400 Ω');
      await click('lineReset'); await has('lnLoss', '2.635 MW'); await has('lnVOut', '154 kV'); await has('lnR', '5.640 Ω');

      // 03 · Transformatör
      await click('tab-trafo');
      await has('trV2', '231.3 V'); await has('trReg', '+3.76 %'); await has('trPcu', '750.0 W'); await has('trPcore', '250.0 W'); await has('trEta', '97.47 %'); await has('trPout', '38.55 kW');
      await has('trXstar', '56.54 %'); await has('trXtheory', '57.74 %'); await has('trXdiff', '−2.07 %'); await has('trEtaMax', '97.837 %'); await has('trBalance', '0');
      await has('trOcRows', '23.04 kΩ'); await has('trOcRows', '5.760 kΩ'); await has('trOcRows', '429.5 mA'); await has('trScRows', '102.4 V'); await has('trScRows', '749.1 W'); await has('trScRows', '1.726 Ω'); await has('trScRows', '−0.114 %');
      assert.equal(await page.locator('#trOcRows tr').count(), 5); checks++; assert.equal(await page.locator('#trScRows tr').count(), 7); checks++;
      await has('trScRows', '0 %');
      for (const id of ['trCircuit', 'trChart']) await painted(id);
      await noOverflow('transformatör'); await shot('03-varsayilan');
      await page.locator('#trLead').selectOption('lead'); await has('trReg', '−1.10 %'); await has('trV2', '242.7 V'); await has('trStatus', 'Regülasyon negatif'); await has('trXdiff', '+0.64 %');
      await range('trLoad', 0); await has('trEta', '0 %'); await has('trReg', 'boşta'); await has('trV2', '240.0 V'); await has('trStatus', 'Boşta'); await has('trPcu', '0 W');
      await range('trLoad', 150); await has('trStatus', 'anma akımının üstünde'); await range('trPf', 1); await has('trLeadOut', 'Omik'); await shot('03-asiri');
      await range('trPc', 1); await range('trR', 0.5); await has('trXtheory', '141.42 %'); await range('trPc', 0.1); await range('trR', 3); await has('trXtheory', '18.26 %');
      await click('trafoReset'); await has('trEta', '97.47 %'); await has('trLeadOut', 'Geri'); await has('trROut', '1.728 Ω');

      // Sekmeler: klavye, R kısayolu, dondurulmuş API
      await page.locator('#tab-trafo').focus(); await page.keyboard.press('Home'); assert.equal(await page.locator('#tab-phase').getAttribute('aria-selected'), 'true'); checks++;
      await page.keyboard.press('ArrowRight'); assert.equal(await page.locator('#tab-line').getAttribute('aria-selected'), 'true'); checks++;
      await page.keyboard.press('End'); assert.equal(await page.locator('#tab-trafo').getAttribute('aria-selected'), 'true'); checks++;
      await page.keyboard.press('ArrowRight'); assert.equal(await page.locator('#tab-phase').getAttribute('aria-selected'), 'true'); checks++;
      await page.keyboard.press('ArrowLeft'); assert.equal(await page.locator('#tab-trafo').getAttribute('aria-selected'), 'true'); checks++;
      assert.equal(await page.locator('[role=tab][tabindex="0"]').count(), 1); checks++; assert.equal(await page.locator('[role=tabpanel]:not([hidden])').count(), 1); checks++;
      await range('trLoad', 40); await has('trLoadOut', '40 %'); await page.locator('h1').click(); await page.keyboard.press('r'); await has('trLoadOut', '100 %');
      await click('tab-phase'); await page.locator('h1').click(); await page.keyboard.press('Space'); await has('phToggle', 'Devam et'); await page.keyboard.press('Space'); await has('phToggle', 'Duraklat');
      assert.equal(await page.evaluate(() => Object.isFrozen(PowerLab) && !Object.getOwnPropertyDescriptor(window, 'PowerLab').writable && Math.abs(PowerLab.threePhase({ VL: 400, Z: 10, pf: 0.8 }).P - 12800) < 1e-6), true); checks++;
      assert.equal(await page.locator('p.hint').count(), 1); checks++;
      assert.equal(await page.evaluate(() => [...document.querySelectorAll('.em-panel input, .em-panel select')].every((e) => e.labels && e.labels.length > 0)), true, 'her denetimin etiketi olmalı'); checks++;
      await noOverflow('son');
      assert.deepEqual(errors, []); checks++;
      console.log(`D elektrik mühendisliği: ${checks - before} arayüz kontrolü (${width} px, ${theme === 'light' ? 'açık' : 'koyu'}) PASS`);
      await ctx.close();
    }
  } finally {
    await browser?.close();
    await new Promise((r) => server.close(r));
  }
}
