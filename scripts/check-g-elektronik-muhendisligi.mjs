// G · elektronik-muhendisligi.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) node'da yüklenir ve sayfanın kendi formüllerini KULLANMAYAN başvurularla
// karşılaştırılır: Lambert W kapalı çözümü (diyot + direnç), yük korunumu ve üstel boşalma (doğrultucu),
// enjeksiyon biçiminde yazılmış Ebers–Moll ile Kirchhoff artıkları, sayısal türev ve Bessel serileri (BJT),
// karmaşık fazör düğüm çözümü ve küçük adımlı RK4 ikizi (işlemsel yükselteç, süzgeçler).
// `--browser`: 390 px açık ve 1280 px koyu temada gerçek arayüz denetimi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../elektronik-muhendisligi.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.ElektronikLab;
assert(Object.isFrozen(K), 'çekirdek dondurulmuş olmalı');

let checks = 0;
const near = (actual, expected, tol, label = '') => { assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(1e-300, Math.abs(expected)), `${label}: ${actual} ≠ ${expected} (tol ${tol})`); checks++; };
const nearAbs = (actual, expected, tol, label = '') => { assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol, `${label}: ${actual} ≠ ${expected} (±${tol})`); checks++; };
const ok = (cond, label) => { assert(cond, label); checks++; };
const eq = (a, b) => { assert.equal(a, b); checks++; };

// ── Bağımsız sabitler ──
const kB = 1.380649e-23, qe = 1.602176634e-19, PI2 = 2 * Math.PI;
const VT = (T) => kB * T / qe;
near(K.vt(300), 0.025852, 2e-5, 'V_T(300 K) ≈ 25.852 mV');
near(K.vt(300.15), VT(300.15), 1e-14, 'V_T');
const E12 = [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
for (let i = 0; i <= 48; i++) near(K.eValue(i, 2), Number((E12[i % 12] * 100 * 10 ** Math.floor(i / 12)).toPrecision(3)), 1e-12, 'E12');
near(K.eValue(32, -6), 470e-6, 1e-12, '470 µF'); near(K.eValue(20, 3), 47e3, 1e-12, '47 kΩ'); near(K.eValue(19, 2), 3900, 1e-12, '3.9 kΩ');

// ── 1. Diyot: Lambert W ile kapalı çözüm ──
// V + R·Is·(e^{V/a} − 1) = Vs  →  I = (a/R)·W(x) − Is,  ln x = ln(Is·R/a) + (Vs + Is·R)/a
function lambertFromLog(L) { // w + ln w = L
  let w = L > 1 ? L - Math.log(L) : Math.exp(L) / (1 + Math.exp(L));
  for (let i = 0; i < 100; i++) { const f = w + Math.log(w) - L, d = f / (1 + 1 / w); w -= d; if (Math.abs(d) < 1e-15 * w) break; }
  return w;
}
const isRef = (Is0, n, T) => Is0 * (T / 300.15) ** (3 / n) * Math.exp(1.11 / (n * kB / qe) * (1 / 300.15 - 1 / T)); // Eg/(n·k)·(1/T0 − 1/T)
for (const Is0 of [1e-15, 1e-14, 3.162e-9, 1e-6]) for (const n of [1, 1.75, 2]) for (const T of [233.15, 300.15, 398.15]) {
  near(K.isAt(Is0, n, T), isRef(Is0, n, T), 1e-10, 'Is(T)');
  for (const R of [100, 1e3, 4.7e4, 1e6]) for (const Vs of [0.1, 0.3, 0.7, 1, 5, 12]) {
    const a = n * VT(T), Is = isRef(Is0, n, T), I = (a / R) * lambertFromLog(Math.log(Is * R / a) + (Vs + Is * R) / a) - Is;
    const o = K.diodeOP({ Vs, R, Is0, n, T });
    near(o.I, I, 1e-9, `diyot I Vs=${Vs} R=${R}`); nearAbs(o.V, Vs - I * R, 1e-9, 'diyot V'); ok(o.iter < 60, 'Newton yineleme sayısı');
    near(K.diodeI(o.V, { Is0, n, T }), o.I, 1e-8, 'çalışma noktası eğri üzerinde');
  }
  for (const Vs of [-5, -1, -0.1]) { const o = K.diodeOP({ Vs, R: 1e3, Is0, n, T }), Is = isRef(Is0, n, T); nearAbs(Vs - o.V - 1e3 * Is * (Math.exp(o.V / (n * VT(T))) - 1), 0, 1e-12, 'ters yön artığı'); ok(o.I <= 0 && o.I >= -Is * 1.0001, 'ters akım −Is ile sınırlı'); }
}
{ const o = K.diodeOP({ Vs: 5, R: 1e3, Is0: 1e-14, n: 1, T: 300.15 });
  near(o.V, 0.692888, 2e-6, 'varsayılan V_D'); near(o.I, 4.307112e-3, 2e-6, 'varsayılan I'); near(o.I07, 4.3e-3, 1e-12, '0.7 V modeli');
  // sıcaklık katsayısı: Lambert çözümünden bağımsız sonlu fark (sabit akım)
  const vAt = (T) => VT(T) * Math.log(o.I / isRef(1e-14, 1, T) + 1);
  near(o.dVdT, (vAt(300.65) - vAt(299.65)), 1e-6, 'dV/dT ölçülen'); near(o.dVdTTheory, o.dVdT, 1e-3, 'dV/dT kuram');
  ok(o.dVdT < -1.4e-3 && o.dVdT > -2.2e-3, 'yaklaşık −2 mV/K');
  near(K.diodeV(10 * o.I, { Is0: 1e-14, n: 1, T: 300.15 }) - K.diodeV(o.I, { Is0: 1e-14, n: 1, T: 300.15 }), VT(300.15) * Math.LN10, 1e-9, '59.6 mV/dekat'); }

// ── 2. Doğrultucu ──
const D0 = { Is0: 1e-14, n: 1, T: 300.15 };
for (const mode of ['half', 'bridge']) for (const [C, RL, f, Vp] of [[470e-6, 1e3, 50, 10], [47e-6, 1e3, 50, 10], [100e-6, 220, 60, 17], [10e-6, 1e4, 400, 5], [0, 1e3, 50, 10]]) {
  const r = K.rectifier({ mode, Vp, f, C, RL, ...D0 }), N = r.N, h = 1 / (f * N), k = mode === 'bridge' ? 2 : 1;
  // yük korunumu: bir periyotta diyottan geçen yük = yükten geçen yük (kararlı durum)
  let qd = 0, ql = 0; for (let i = 1; i <= N; i++) { qd += r.id[i]; ql += r.vo[i] / RL; }
  near(qd, ql, 1e-6, `yük korunumu ${mode} C=${C}`);
  nearAbs(r.vo[N], r.vo[0], 1e-8 * Vp, 'periyodik kararlı durum');
  // diyot denklemi her örnekte sağlanıyor
  for (const i of [1, 137, 500, 999, 1500, 2000]) { const u = mode === 'bridge' ? Math.abs(r.vs[i]) : r.vs[i]; nearAbs(r.id[i], isRef(1e-14, 1, 300.15) * (Math.exp((u - r.vo[i]) / (k * VT(300.15))) - 1), 1e-9 * Math.max(1e-6, r.ipk), 'diyot akımı'); }
  ok(r.vmax < Vp && r.vmax > Vp - k * 1.0, 'tepe: V_p − k·(0.5…1.0 V)');
  if (C > 0) {
    // diyot kapalıyken üstel boşalma: v(t2)/v(t1) = e^{−Δt/RC}
    let i1 = -1, i2 = -1; for (let i = 2; i < N; i++) { if (r.id[i] < 1e-9 * r.ipk && r.id[i - 1] < 1e-9 * r.ipk) { if (i1 < 0) i1 = i; i2 = i; } else if (i1 >= 0 && i2 - i1 > 50) break; else { i1 = -1; } }
    ok(i2 - i1 > 50, 'boşalma aralığı bulundu'); near(r.vo[i2] / r.vo[i1], Math.exp(-(i2 - i1) * h / (RL * C)), 2e-4, 'üstel boşalma');
    // h/2 ikizi
    const r2 = K.rectifier({ mode, Vp, f, C, RL, ...D0, N: 4000 }); near(r.ripple, r2.ripple, 4e-3, 'adım yarılama: dalgalanma'); near(r.vavg, r2.vavg, 1e-3, 'adım yarılama: ortalama');
    ok(r.ripple < r.rippleTheory, 'I/(mfC) dalgalanmayı fazla tahmin eder'); near(r.rippleFixed, r.ripple, r.fRC >= 10 ? 0.05 : 0.15, 'I_ort·t_boş/C düzeltmesi');
    near(r.rippleTheory, (Vp - k * 0.7) / RL / (k * f * C), 1e-12, 'kuram formülü');
  } else { ok(r.vmin < 1e-6 && r.vmin > -1e-6, 'kondansatörsüz çıkış sıfıra iner'); ok(r.rippleTheory === null, 'kuram tanımsız'); near(r.vavg, (Vp - k * 0.7) * k / Math.PI, 0.12, 'ortalama ≈ k·V_tepe/π'); }
}
{ const a = K.rectifier({ mode: 'half', Vp: 10, f: 50, C: 470e-6, RL: 1e3, ...D0 }), b = K.rectifier({ mode: 'bridge', Vp: 10, f: 50, C: 470e-6, RL: 1e3, ...D0 });
  near(a.ripple, 0.36104, 5e-4, 'varsayılan dalgalanma'); near(a.rippleTheory, 0.395745, 1e-5, 'varsayılan kuram'); ok(b.ripple < 0.5 * a.ripple, 'köprü dalgalanmayı yarıdan fazla azaltır'); ok(b.vmax < a.vmax - 0.5, 'köprüde iki diyot düşümü'); }

// ── 3. BJT: enjeksiyon biçiminde Ebers–Moll ile Kirchhoff artıkları ──
function em(VBE, VBC, Is, bF, bR, vt) { const aF = bF / (bF + 1), aR = bR / (bR + 1), IES = Is / aF, ICS = Is / aR, ef = Math.exp(VBE / vt) - 1, er = Math.exp(VBC / vt) - 1; const IE = IES * ef - aR * ICS * er, IC = aF * IES * ef - ICS * er; return { IE, IC, IB: IE - IC }; }
const P0 = { VCC: 12, R1: 47e3, R2: 10e3, RC: 3900, RE: 1000, beta: 200, Is: 1e-14, bR: 2, T: 300.15 };
for (const VCC of [5, 12, 24]) for (const R1 of [1e4, 4.7e4, 2.2e5]) for (const R2 of [1e3, 1e4, 4.7e4]) for (const RC of [470, 3900, 2.2e4]) for (const RE of [100, 1e3]) for (const beta of [50, 200, 400]) {
  const p = { ...P0, VCC, R1, R2, RC, RE, beta }, d = K.ceDC(p), e = em(d.VB - d.VE, d.VB - d.VC, 1e-14, beta, 2, VT(300.15)), sc = VCC / (RC + RE);
  nearAbs((VCC - d.VC) / RC - e.IC, 0, 1e-8 * sc, 'kolektör KCL'); nearAbs(d.VE / RE - e.IE, 0, 1e-8 * sc, 'emetör KCL'); nearAbs((VCC - d.VB) / R1 - d.VB / R2 - e.IB, 0, 1e-8 * sc, 'baz KCL');
  near(d.IC + d.IB, d.IE, 1e-9, 'IE = IC + IB'); ok(d.VCE > 0 && d.VC <= VCC + 1e-9, '0 < VCE, VC ≤ VCC');
  ok(d.region === (e.IC < 0.01 * sc ? 'cutoff' : e.IC < 0.9 * beta * e.IB ? 'sat' : 'active'), 'bölge');
  if (d.region === 'active') { const h = K.ceHand(p); if (h.region === 'active' && d.VCE > 1 && d.VE > 1) near(h.IC, d.IC, 0.12, 'el hesabı I_C %12 içinde'); }
}
{ const d = K.ceDC(P0), h = K.ceHand(P0);
  near(d.IC, 1.37814e-3, 2e-5, 'varsayılan I_C'); near(d.VCE, 5.24022, 2e-5, 'varsayılan V_CE'); near(d.VBE, 0.663414, 2e-5, 'varsayılan V_BE');
  const VTH = 12 * 10 / 57, RTH = 470 / 57 * 1e3, IB = (VTH - 0.7) / (RTH + 201 * 1000);
  near(h.IC, 200 * IB, 1e-12, 'el hesabı I_C'); near(h.VCE, 12 - 200 * IB * 3900 - 201 * IB * 1000, 1e-12, 'el hesabı V_CE');
  // küçük sinyal kazancı: büyük sinyal çözümünün sayısal türevi
  for (const bypass of [true, false]) {
    const emn = bypass ? { V0: d.VE, R: 0 } : { V0: 0, R: 1000 }, dv = 1e-6;
    const slope = (K.ceNode(P0, d.VB + dv, emn).VC - K.ceNode(P0, d.VB - dv, emn).VC) / (2 * dv);
    near(bypass ? d.gainBypass : d.gainOpen, slope, 1e-5, 'kazanç formülü = dVC/dVB'); near(K.ceSignal(P0, { amp: 1e-5, bypass }, d).gain, slope, 1e-5, 'ölçülen kazanç (10 µV)');
  }
  near(d.gainBypass, -(d.IC / VT(300.15)) * 3900, 1e-12, '−g_m·R_C'); ok(Math.abs(d.gainOpen - (-3.9)) < 0.1, 'köprülemesiz ≈ −R_C/R_E');
  // Bessel: i_C = I_CQ·e^{x·sin θ} → temel bileşen 2·I1(x), ikinci harmonik 2·I2(x)
  const bessI = (nu, x) => { let s = 0, t = (x / 2) ** nu; for (let j = 1; j <= nu; j++) t /= j; for (let m = 0; m < 40; m++) { s += t; t *= (x / 2) ** 2 / ((m + 1) * (m + 1 + nu)); } return s; };
  for (const amp of [1e-3, 2e-3, 5e-3, 1e-2]) { const s = K.ceSignal(P0, { amp, bypass: true }, d), x = amp / VT(300.15);
    ok(!s.sat && !s.cut, 'kırpılma yok'); near(s.gain, d.gainBypass * 2 * bessI(1, x) / x, 2e-4, `Bessel temel bileşen ${amp}`); near(s.hd2, bessI(2, x) / bessI(1, x), 2e-3, `Bessel 2. harmonik ${amp}`); near(s.hd2Theory, x / 4, 1e-12, 'v_g/(4V_T)'); }
  const big = K.ceSignal(P0, { amp: 0.1, bypass: true }, d); ok(big.sat && big.vcMax > 11.8 && big.vceMin < 0.2 && big.thd > 0.2, '100 mV: doyma ve kesime yakın kırpılma');
  const huge = K.ceSignal(P0, { amp: 1, bypass: true }, d); ok(huge.sat && huge.cut && huge.vcMax > 11.99, '1 V: iki uçta kırpılma');
  const lin = K.ceSignal(P0, { amp: 0.1, bypass: false }, d); ok(!lin.sat && !lin.cut && lin.thd < 1e-3, 'köprülemesiz kat 100 mV\'ta doğrusal');
  // çıkış eğrisi: sabit I_B kapalı biçimi Ebers–Moll ile tutarlı
  const q = { Is: 1e-14, bF: 200, bR: 2, VT: VT(300.15) };
  for (const IB of [5e-6, 2e-5]) for (const VCE of [0.05, 0.2, 1, 8]) { const IC = K.bjtOut(IB, VCE, q); let lo = 0, hi = 1; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (em(m, m - VCE, 1e-14, 200, 2, q.VT).IB > IB) hi = m; else lo = m; } near(IC, em(lo, lo - VCE, 1e-14, 200, 2, q.VT).IC, 1e-8, 'çıkış eğrisi'); }
  near(K.bjtOut(1e-5, 8, q), 2e-3, 1e-6, 'aktif bölgede I_C = β·I_B');
  ok(K.ceDC({ ...P0, R1: 1e4 }).region === 'sat' && K.ceDC({ ...P0, R2: 1e3 }).region === 'cutoff', 'hazır düzenler: doyma ve kesim');
}

// ── 4. İşlemsel yükselteç: karmaşık fazörle düğüm çözümü ──
const cx = (re, im = 0) => ({ re, im }), cadd = (a, b) => cx(a.re + b.re, a.im + b.im), cmul = (a, b) => cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re), cdiv = (a, b) => { const d = b.re * b.re + b.im * b.im; return cx((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); }, cabs = (a) => Math.hypot(a.re, a.im), carg = (a) => Math.atan2(a.im, a.re);
function opRef(c, f) { // vo/vin: vo = A·(v+ − v−)
  const A = cdiv(cx(c.A0), cx(1, f / (c.GBW / c.A0)));
  if (c.cfg === 'inv') { const b = c.R1 / (c.R1 + c.Rf); return cdiv(cmul(A, cx(-(1 - b))), cadd(cx(1), cmul(A, cx(b)))); }
  if (c.cfg === 'sum') { const G = 1 / c.R1 + 1 / c.R2 + 1 / c.Rf; return cdiv(cmul(A, cx(-1 / c.R1 / G)), cadd(cx(1), cmul(A, cx(1 / c.Rf / G)))); }
  const b = c.cfg === 'fol' ? 1 : c.R1 / (c.R1 + c.Rf); return cdiv(A, cadd(cx(1), cmul(A, cx(b))));
}
const C0 = { cfg: 'inv', R1: 1e3, Rf: 1e4, R2: 1e3, C: 1e-7, A0: 1e5, GBW: 1e6, Vs: 12, amp: 0.5, f: 1e3, v2: 1 };
const wrap = (x) => Math.atan2(Math.sin(x), Math.cos(x));
for (const cfg of ['inv', 'non', 'fol', 'sum']) for (const [R1, Rf] of [[1e3, 1e4], [1e3, 1e3], [100, 1e5]]) for (const A0 of [10, 1e3, 1e5]) for (const GBW of [1e5, 1e7]) for (const f of [1, 1e3, 3e4, 1e6]) {
  const c = { ...C0, cfg, R1, Rf, A0, GBW, f, amp: 1e-3, v2: 0 }, s = K.opampSim(c), H = opRef(c, f);
  ok(!s.clipped, 'kırpılma yok'); near(s.ratio, cabs(H), 3e-4, `|G| ${cfg} A0=${A0} f=${f}`); nearAbs(wrap(s.phase - carg(H)), 0, 3e-3, `faz ${cfg}`);
  const L = K.opampLin(c); near(L.gainAt(f).mag, cabs(H), 1e-9, 'kuram |G(jf)|'); nearAbs(wrap(L.gainAt(f).phase - carg(H)), 0, 1e-9, 'kuram fazı');
  near(L.exact, opRef(c, 0).re, 1e-12, 'sonlu A₀ DC kazancı');
}
for (const cfg of ['inv', 'non', 'fol', 'sum']) for (const [A0, GBW] of [[1e5, 1e6], [1e3, 1e5], [10, 1e7]]) {
  const c = { ...C0, cfg, A0, GBW }, bw = K.opampBandwidth(c), ref = cabs(opRef(c, 0));
  let lo = Math.log(1e-3), hi = Math.log(1e10); for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (cabs(opRef(c, Math.exp(m))) > ref / Math.SQRT2) lo = m; else hi = m; }
  near(bw.f3, Math.exp(lo), 2e-4, `−3 dB ${cfg}`); near(bw.ref, ref, 1e-6, 'düşük frekans kazancı');
}
{ const L = K.opampLin(C0); near(L.fc, 1e6 / 11 + 10, 1e-9, 'eviren −10: f_c = GBW/11 + f_p'); near(K.opampBandwidth(C0).f3, 90919, 1e-4, 'ölçülen bant 90.92 kHz');
  near(K.opampLin({ ...C0, A0: 10 }).exact, -10 / (1 + 11 / 10), 1e-12, 'A₀ = 20 dB: −4.762');
  near(K.opampSim({ ...C0, A0: 10 }).ratio, 4.7619, 2e-4, 'A₀ = 20 dB ölçülen');
  // küçük adımlı RK4 ikizi (kırpmalı): dvo/dt = ωp·(A0·vd − vo)
  for (const [amp, f] of [[0.5, 1e3], [2, 1e3], [0.5, 2e5]]) { const c = { ...C0, amp, f }, s = K.opampSim(c), wp = PI2 * 10, b = 1 / 11, n = 200000, T = 1 / f, h = T / n; let vo = 0;
    const der = (v, t) => wp * (1e5 * (-(1 - b) * amp * Math.sin(PI2 * f * t) - b * v) - v);
    let pk = 0; for (let per = 0; per < 4; per++) for (let i = 0; i < n; i++) { const t = (per * n + i) * h, k1 = der(vo, t), k2 = der(vo + h / 2 * k1, t + h / 2), k3 = der(vo + h / 2 * k2, t + h / 2), k4 = der(vo + h * k3, t + h); vo += h / 6 * (k1 + 2 * k2 + 2 * k3 + k4); vo = Math.max(-12, Math.min(12, vo)); if (per === 3) pk = Math.max(pk, Math.abs(vo)); }
    near(s.peak, pk, 2e-3, `RK4 ikizi tepe amp=${amp} f=${f}`); ok(s.clipped === (amp === 2), 'kırpılma bayrağı'); }
  const sm = K.opampSim({ ...C0, cfg: 'sum', amp: 0.2, v2: 0.5 }); near(sm.mean, -5 * (1 - 21 / 1e5), 2e-4, 'toplayıcı DC bileşen'); ok(!sm.clipped, 'toplayıcı kırpılmıyor');
  // integral alıcı
  const it = K.opampInteg({ ...C0, cfg: 'int', R1: 1e3, C: 1e-7, amp: 0.5, f: 1e3 }); near(it.slope, -0.5 / 1e-4, 3e-3, 'integral eğimi'); near(it.slopeTheory, -5000, 1e-12, '−V_g/RC'); near(it.pp, 2.5, 3e-3, 'tepeden tepeye'); ok(!it.clipped && it.tSat === null, 'doyma yok');
  const sat = K.opampInteg({ ...C0, cfg: 'int', R1: 1e3, C: 1e-7, amp: 0.5, f: 100 }); ok(sat.clipped, 'düşük frekansta doyma'); near(sat.tSat, 12 * 1e-4 / 0.5, 3e-3, 'raya varma süresi');
  let mono = true; for (let i = 1; i < it.N / 2; i++) if (it.vout[i + 1] > it.vout[i] + 1e-12) mono = false; ok(mono, 'pozitif girişte çıkış azalır');
  // karşılaştırıcı
  const cm = K.opampSim({ ...C0, cfg: 'cmp', amp: 5, f: 100 }), thr = 12 * (1 / 11 - 1e-5);
  ok(cm.latch, 'kilitlenme'); nearAbs(cm.thHigh, thr, 1e-3, 'üst eşik'); nearAbs(cm.thLow, -thr, 1e-3, 'alt eşik'); ok(cm.delay > 1e-6 && cm.delay < 1e-4, 'geçiş gecikmesi µs mertebesinde');
  let two = true; for (let i = 0; i <= cm.M; i++) if (Math.abs(Math.abs(cm.vout[i]) - 12) > 1e-9 && Math.abs(cm.vout[i]) > 11.9) two = false; ok(two, 'çıkış raylarda');
  const no = K.opampSim({ ...C0, cfg: 'cmp', amp: 0.5, f: 100 }); ok(no.thHigh === null && no.thLow === null && no.peak === 12, 'eşik aşılmazsa geçiş yok');
  const weak = K.opampSim({ ...C0, cfg: 'cmp', amp: 5, f: 100, A0: 10 }); ok(!weak.latch && weak.thHigh === null, 'A₀β ≤ 1: histerezis yok');
}

// ── 5. Süzgeçler: karmaşık empedans bölücü ve RK4 ikizi ──
function hRef(type, { R, C, L }, f) { const w = PI2 * f, zc = cx(0, -1 / (w * C)), zl = cx(0, w * L), r = cx(R);
  return type === 'lp' ? cdiv(zc, cadd(r, zc)) : type === 'hp' ? cdiv(r, cadd(r, zc)) : cdiv(r, cadd(r, cadd(zc, zl))); }
for (const type of ['lp', 'hp', 'bp']) for (const [R, C, L] of [[1e3, 1e-7, 0.1], [100, 1e-8, 0.1], [1e5, 1e-9, 1e-3], [3300, 4.7e-6, 0.47]]) {
  const par = { R, C, L }, info = K.filterInfo(type, par), fm = type === 'bp' ? info.f0 : info.fc;
  for (const k of [0.01, 0.3, 1, 1.07, 3, 100]) { const f = fm * k, H = hRef(type, par, f), s = K.filterSim(type, par, f), T = K.filterH(type, par, f);
    near(T.mag, cabs(H), 1e-9, `H formülü ${type}`); nearAbs(wrap(T.phase - carg(H)), 0, 1e-9, 'H fazı');
    nearAbs(s.ratio, cabs(H), 2e-4 * Math.max(cabs(H), 1e-3) + 1e-9, `ölçülen oran ${type} k=${k} R=${R}`); nearAbs(wrap(s.phase - carg(H)), 0, 2e-3, `ölçülen faz ${type} k=${k}`); }
  const m = K.filterMeasure(type, par), st = K.filterStep(type, par);
  if (type !== 'bp') { near(m.fc, 1 / (PI2 * R * C), 3e-5, 'ölçülen f_c'); near(st.tau, R * C, 3e-5, 'ölçülen τ'); near(cabs(hRef(type, par, m.fc)), Math.SQRT1_2, 3e-5, '|H(f_c)| = 1/√2'); }
  else { const f0 = 1 / (PI2 * Math.sqrt(L * C)), Q = Math.sqrt(L / C) / R;
    near(m.f0, f0, 3e-5, 'ölçülen f₀'); near(m.Q, Q, 3e-5, 'ölçülen Q'); near(m.bw, R / (PI2 * L), 6e-5, 'ölçülen Δf'); near(m.peak, 1, 1e-6, 'rezonansta oran 1');
    near(cabs(hRef(type, par, m.fl)), Math.SQRT1_2, 5e-5 * Math.max(1, 2 * Q), 'alt kenar'); near(cabs(hRef(type, par, m.fh)), Math.SQRT1_2, 5e-5 * Math.max(1, 2 * Q), 'üst kenar');
    if (Q > 0.5) { near(st.fd, f0 * Math.sqrt(1 - 1 / (4 * Q * Q)), Q > 0.6 ? 3e-4 : 5e-3, 'ölçülen f_d'); if (st.tauEnv !== null) near(st.tauEnv, 2 * L / R, 5e-3, 'ölçülen zarf'); } else ok(st.fd === null && info.fd === null, 'aşırı sönümlüde f_d yok'); }
}
// RK4 ikizi: sıfır başlangıçtan 25 zaman sabiti, sonra bir periyotluk izdüşüm (atış yöntemi kullanılmaz)
for (const [type, par, f] of [['lp', { R: 1e3, C: 1e-7, L: 0.1 }, 1585], ['hp', { R: 1e3, C: 1e-7, L: 0.1 }, 400], ['bp', { R: 100, C: 1e-8, L: 0.1 }, 5012], ['bp', { R: 1e3, C: 1e-8, L: 0.1 }, 9000]]) {
  const n = 4000, T = 1 / f, h = T / n, tauS = type === 'bp' ? 2 * par.L / par.R : par.R * par.C, pre = Math.ceil(25 * tauS / T) + 1;
  const der = (x, t) => { const u = Math.sin(PI2 * f * t); return type === 'bp' ? [(u - par.R * x[0] - x[1]) / par.L, x[0] / par.C] : [(u - x[0]) / (par.R * par.C), 0]; };
  let x = [0, 0], sa = 0, sb = 0;
  for (let i = 0; i < (pre + 1) * n; i++) { const t = i * h, ax = (a, k, c) => [a[0] + c * k[0], a[1] + c * k[1]], k1 = der(x, t), k2 = der(ax(x, k1, h / 2), t + h / 2), k3 = der(ax(x, k2, h / 2), t + h / 2), k4 = der(ax(x, k3, h), t + h);
    x = [x[0] + h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]), x[1] + h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])];
    if (i >= pre * n) { const tt = (i + 1) * h, u = Math.sin(PI2 * f * tt), y = type === 'lp' ? x[0] : type === 'hp' ? u - x[0] : par.R * x[0]; sa += y * Math.sin(PI2 * f * tt); sb += y * Math.cos(PI2 * f * tt); } }
  const s = K.filterSim(type, par, f); near(s.ratio, Math.hypot(sa, sb) * 2 / n, 3e-4, `RK4 ikizi oran ${type} ${f}`); nearAbs(wrap(s.phase - Math.atan2(sb, sa)), 0, 1e-3, 'RK4 ikizi faz');
}
{ const par = { R: 1e3, C: 1e-7, L: 0.1 }; near(K.filterInfo('lp', par).fc, 1591.549, 1e-6, 'f_c = 1591.5 Hz'); near(K.filterSim('lp', par, 10 * 1591.549).ratio, 1 / Math.sqrt(101), 2e-4, 'bir dekat yukarıda −20 dB');
  const nb = { R: 100, C: 1e-8, L: 0.1 }; near(K.filterInfo('bp', nb).Q, Math.sqrt(1e7) / 100, 1e-12, 'dar bant Q = 31.62'); near(K.filterInfo('bp', nb).f0, 5032.92, 1e-6, 'f₀ = 5033 Hz'); }

// sonlu GBW'nin integral eğimine etkisi: bağıl hata ≈ 1/(2π·GBW·RC)
for (const GBW of [1e5, 1e6]) { const it = K.opampInteg({ ...C0, cfg: 'int', R1: 1e3, C: 1e-7, amp: 0.5, f: 1e3, GBW }); near(1 - it.slope / it.slopeTheory, 1 / (PI2 * GBW * 1e-4), 0.05, 'integral eğimi: GBW payı'); }
console.log(`G elektronik-muhendisligi: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek denetimi PASS`);

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
    for (const [width, theme, dpr] of [[390, 'light', 2], [1280, 'dark', 1]]) {
      const before = checks;
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: dpr });
      const page = await ctx.newPage();
      await page.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      page.setDefaultTimeout(8000);
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/elektronik-muhendisligi.html`);
      const click = (id) => page.locator('#' + id).click();
      const read = (id) => page.locator('#' + id).textContent();
      const set = (id, v) => page.locator('#' + id).evaluate((e, v) => { if (e.type === 'checkbox') e.checked = v; else e.value = v; e.dispatchEvent(new Event(e.tagName === 'SELECT' || e.type === 'checkbox' ? 'change' : 'input', { bubbles: true })); }, v);
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `${width}px #${id}: "${t}" içinde "${text}" yok`); checks++; };
      const hidden = async (id, want) => { assert.equal(await page.locator('#' + id).isHidden(), want, `#${id} hidden=${want}`); checks++; };
      const clean = async (tab, note) => { const t = await page.locator('#panel-' + tab).innerText(); assert(!/NaN|undefined|Infinity|null|\[object/.test(t), `${width}px ${tab} ${note}: bozuk metin: ${(t.match(/.{0,40}(NaN|undefined|Infinity|null|\[object).{0,40}/) || [''])[0]}`); checks++; };
      const painted = async (tab) => { const r = await page.evaluate((tab) => [...document.querySelectorAll('#panel-' + tab + ' canvas')].map((c) => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, seen = new Set(); for (let i = 0; i < d.length; i += 4 * 97) seen.add(d[i] << 16 | d[i + 1] << 8 | d[i + 2]); return [c.id, c.width, seen.size]; }), tab); for (const [id, w, n] of r) { assert(w > 0 && n > 3, `${width}px tuval ${id} boş (${w}, ${n})`); checks++; } };
      const noOverflow = async (note) => { const ov = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth); assert(ov <= 0, `${width}px ${note}: yatay taşma ${ov}px`); checks++; };
      const sweep = async (tab) => { // her kaydırıcı en küçük ve en büyük değerinde
        const ids = await page.evaluate((tab) => [...document.querySelectorAll('#panel-' + tab + ' input[type=range]')].filter((e) => e.offsetParent !== null).map((e) => [e.id, e.min, e.max, e.value]), tab);
        for (const [id, mn, mx, v] of ids) { for (const x of [mn, mx]) { await set(id, x); await clean(tab, id + '=' + x); } await set(id, v); }
        for (const [id, mn] of ids) await set(id, mn); await clean(tab, 'hepsi en küçük'); await noOverflow(tab + ' hepsi en küçük');
        for (const [id, , mx] of ids) await set(id, mx); await clean(tab, 'hepsi en büyük'); await noOverflow(tab + ' hepsi en büyük');
      };

      // erişilebilirlik iskeleti
      const unl = await page.evaluate(() => [...document.querySelectorAll('.app-content input, .app-content select')].filter((e) => !document.querySelector('label[for="' + e.id + '"]')).map((e) => e.id));
      assert.deepEqual(unl, [], 'etiketsiz denetim'); checks++;
      eq(await page.evaluate(() => [...document.querySelectorAll('.app-content canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), true);
      eq(await page.evaluate(() => Object.isFrozen(window.ElektronikLab) && !Object.getOwnPropertyDescriptor(window, 'ElektronikLab').writable), true);
      eq(await page.evaluate(() => document.documentElement.dataset.theme || 'dark'), theme);

      // 01 · Diyot ve doğrultucu
      await has('dVD', '692.9 mV'); await has('dID', '4.307 mA'); await has('dIDT', '4.300 mA'); await has('dIDT', '−0.17 %'); await has('dVT', '25.86 mV'); await has('dTc', '−1.648 mV/K'); await has('dDec', '59.56 mV'); await has('dROut', '1 kΩ'); await has('dIsOut', '10 fA');
      await has('rRip', '361.0 mV'); await has('rRipT', '395.7 mV'); await has('rRipT', '−8.77 %'); await has('rVmax', '9.250 V'); await has('rStatus', '363.2 mV'); await painted('diode'); await noOverflow('diyot');
      await set('dVs', 1); await has('dID', '370.6 µA'); await has('dIDT', '−19.04 %'); await set('dVs', 0.5); await has('dStatus', 'tanımsız'); await has('dIDT', '0 A');
      await set('dVs', -5); await has('dRd', '—'); await has('dTc', '—'); await has('dStatus', 'Ters kutuplama'); await set('dVs', 0); await has('dStatus', 'akım yok');
      await set('dVs', 5); await set('dT', 77); await has('dVD', '610.0 mV'); await has('dVT', '30.17 mV'); await set('dT', 27);
      await click('dPreSchottky'); await has('dIsOut', '1 µA'); await has('dNOut', '1.05'); await click('dPreSignal'); await has('dIsOut', '3.162 nA'); await has('dNOut', '1.75'); await click('dPreIdeal'); await has('dVD', '692.9 mV');
      await set('dAxis', 'log'); await painted('diode'); await set('dAxis', 'lin');
      await set('rMode', 'bridge'); await has('rRip', '155.4 mV'); await has('rVmaxT', '2×0.7 V'); await painted('diode'); await set('rC', 20); await has('rFRCT', 'kaba');
      await set('rMode', 'half'); await has('rFRCT', 'geçersiz'); await has('rStatus', 'çökmüş'); await set('rCOn', false); await has('rRip', '9.287 V'); await has('rCond', '—'); await has('rRipT', 'tanımsız'); eq(await page.locator('#rC').isDisabled(), true);
      await sweep('diode'); await click('diodeReset'); await has('rRip', '361.0 mV'); await has('dID', '4.307 mA'); eq(await page.locator('#rC').isDisabled(), false);
      // doğrulayıcı (11 Kasım): R_L·C çok büyükken 400 periyot kararlı duruma yetmez; sayfa bunu söylemeli ve fark yazmamalı
      await set('rC', 48); await set('rRL', 48); await has('rStatus', 'kararlı duruma ulaşamadı'); await has('rRipT', 'kararlı durum değil'); ok(!(await read('rRipT')).includes('%'), 'kararsız durumda fark yüzdesi yok');
      await click('diodeReset'); await has('rRipT', '−8.77 %'); await has('rStatus', '363.2 mV');
      ok((await page.locator('#panel-diode').innerText()).includes('Lambert W'), 'kapalı çözüm notu Lambert W\'yi anıyor'); ok((await page.evaluate(() => document.body.textContent)).includes('(el hesabı − çözüm)/|çözüm|'), 'el hesabı farkının tanımı yazılı');

      // 02 · BJT
      await click('tab-bjt'); await has('bIC', '1.378 mA'); await has('bICT', '1.343 mA'); await has('bVCE', '5.240 V'); await has('bVBE', '663.4 mV'); await has('bGm', '53.28 mS'); await has('bGain', '−207.8'); await has('bGainT', '−207.8'); await has('bThd', '0.967 %'); await has('bRegion', 'İleri aktif'); await painted('bjt'); await noOverflow('bjt');
      await set('bBypass', false); await has('bGain', '−3.809'); await has('bGainT', '−3.809'); await has('bStatus', '−3.900'); await set('bBeta', 100); await has('bGain', '−3.788'); await set('bBeta', 200); await set('bBypass', true);
      await set('bAmp', 6); await has('bAmpOut', '10 mV'); await has('bThd', '9.63 %'); await has('bThdT', '9.67 %'); await has('bStatus', '9.63 %');
      await click('bPreClip'); await has('bAmpOut', '100 mV'); await has('bStatus', 'kırpılıyor'); await has('bGain', '−64.61');
      await click('bPreSat'); await has('bRegion', 'Doyma'); await has('bGm', '—'); await has('bGainT', 'geçersiz'); await has('bR1Out', '10 kΩ');
      await click('bPreCut'); await has('bRegion', 'Kesim'); await has('bR2Out', '1 kΩ'); await has('bStatus', 'Kesim');
      await sweep('bjt'); await click('bjtReset'); await has('bIC', '1.378 mA'); await has('bGain', '−207.8');

      // 03 · İşlemsel yükselteç
      await click('tab-opamp'); await has('oV1', '9.998'); await has('oV3', '−10.00'); await has('oV4', '90.92 kHz'); await has('oT4', '90.92 kHz'); await has('oV5', '100.0 kHz'); await has('oFOut', '1.000 kHz'); await painted('opamp'); await noOverflow('opamp');
      await hidden('oCF', true); await hidden('oR2F', true); await hidden('oV2F', true); await hidden('oRfF', false);
      await click('oPreA0'); await has('oV1', '4.762'); await has('oT3', '−4.762'); await has('oStatus', 'A₀β ≫ 1'); await click('opampReset');
      await click('oPreClip'); await has('oV1', '—'); await has('oStatus', 'kırpılıyor'); await has('oV6', '12.00 V'); await click('opampReset');
      await click('oPreFc'); await has('oFOut', '91.20 kHz'); await has('oV1', '7.059'); await has('oStatus', 'bant kenarına'); await click('opampReset'); await has('oV1', '9.998');
      await set('oCfg', 'non'); await has('oV1', '11.00'); await has('oV5', '90.91 kHz'); await set('oCfg', 'fol'); await has('oV1', '1.000'); await has('oV4', '1.000 MHz'); await hidden('oRfF', true); await hidden('oR1F', true);
      await set('oCfg', 'sum'); await hidden('oR2F', false); await hidden('oV2F', false); await has('oV1', '9.99'); await has('oV6', '−4.999 V'); await has('oV4', '47.63 kHz');
      await set('oCfg', 'int'); await hidden('oCF', false); await hidden('oRfF', true); await has('oV1', '−4.992 kV/s'); await has('oT1', '−5.000 kV/s'); await has('oV2c', '2.495 V'); await has('oV3', '—'); await painted('opamp');
      await set('oF', 2); await set('oAmp', 5); await has('oV3', '240.5 µs'); await has('oT3', '240.0 µs'); await has('oStatus', 'rayına dayanıyor'); await set('oF', 3); await set('oAmp', 0.5);
      await set('oCfg', 'cmp'); await has('oV1', '—'); await has('oStatus', 'eşiği aşamıyor'); await set('oAmp', 5); await has('oV1', '1.091 V'); await has('oV2c', '−1.091 V'); await has('oV3', '2.182 V'); await painted('opamp');
      await set('oA0', 20); await has('oStatus', 'kilitleyemiyor'); await has('oV1', '—'); await set('oA0', 100);
      for (const cfg of ['inv', 'non', 'fol', 'sum', 'int', 'cmp']) { await set('oCfg', cfg); await sweep('opamp'); await click('opampReset'); }
      await has('oV1', '9.998'); eq(await page.locator('#oCfg').inputValue(), 'inv');

      // 04 · Süzgeçler
      await click('tab-filter'); await has('fRatio', '0.7086'); await has('fRatio', '−2.99 dB'); await has('fPhase', '−44.9°'); await has('fFc', '1.592 kHz'); await has('fFcT', '1.592 kHz'); await has('fTau', '100.0 µs'); await hidden('fLF', true); await hidden('fQS', true); await painted('filter'); await noOverflow('süzgeç');
      await click('fDecade'); await has('fRatio', '0.09991'); await has('fRatio', '−20.01 dB'); await set('fType', 'hp'); await has('fRatio', '0.9950'); await has('fTauL', '%36.8'); await click('fAtFc'); await has('fPhase', '45.1°');
      await click('fNarrow'); eq(await page.locator('#fType').inputValue(), 'bp'); await hidden('fLF', false); await has('fROut', '100 Ω'); await has('fLOut', '100 mH'); await has('fCOut', '10 nF'); await has('fFc', '5.033 kHz'); await has('fQ', '31.62'); await has('fQT', '31.62'); await has('fBw', '159.2 Hz'); await has('fTau', '5.032 kHz'); await painted('filter');
      // doğrulayıcı (11 Kasım): dar bantta kenar ve f₀ düğmeleri adıma yuvarlanmamış frekansı kullanır
      await has('fRatio', '0.9671'); await click('fDecade'); await has('fFreqOut', '5.113 kHz'); await has('fRatio', '0.7070'); await has('fRatio', '−3.01 dB'); await has('fPhase', '−45.0°');
      await click('fAtFc'); await has('fFreqOut', '5.033 kHz'); await has('fRatio', '1.000 (0.00 dB)'); await click('fDecade'); await set('fFreq', 3.71); await has('fFreqOut', '5.129 kHz'); await has('fRatio', '−3.8');
      await click('fDecade'); await click('fNarrow'); await has('fFreqOut', '5.012 kHz'); await has('fRatio', '0.9671');
      eq(await page.locator('#panel-filter a[href="mantik-devresi.html"]').textContent(), 'Mantık Devreleri Laboratuvarı');
      await set('fR', 24); await has('fTau', '—'); await has('fTauT', 'aşırı sönümlü'); await has('fQ', '0.3162');
      for (const type of ['lp', 'hp', 'bp']) { await set('fType', type); await sweep('filter'); await click('filterReset'); }
      await has('fRatio', '0.7086'); eq(await page.locator('#fType').inputValue(), 'lp');

      // klavye: sekmeler ve R kısayolu
      await page.locator('#tab-filter').focus(); await page.keyboard.press('Home'); eq(await page.locator('#tab-diode').getAttribute('aria-selected'), 'true'); await hidden('panel-diode', false);
      await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-bjt').getAttribute('aria-selected'), 'true'); await page.keyboard.press('End'); eq(await page.locator('#tab-filter').getAttribute('aria-selected'), 'true');
      await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-diode').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowLeft'); eq(await page.locator('#tab-filter').getAttribute('aria-selected'), 'true'); eq(await page.locator('#tab-diode').getAttribute('tabindex'), '-1');
      await set('fR', 30); await page.locator('#fR').focus(); await page.keyboard.press('r'); await has('fROut', '33 kΩ'); // form denetimi içinde R yok sayılır
      await page.evaluate(() => document.activeElement.blur()); await page.keyboard.press('r'); await has('fROut', '1 kΩ');
      await noOverflow('son'); assert.deepEqual(errors, [], 'konsol/sayfa hatası'); checks++;
      console.log(`G elektronik-muhendisligi: ${width} px ${theme} · ${checks - before} arayüz denetimi PASS`);
      await ctx.close();
    }
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
