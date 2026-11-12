// G · kontrol-kurami.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// köklerin Vieta ile polinomu yeniden kurması ve kapalı biçimli kökler (ikinci derece formülü, küp kök), elle türetilmiş
// Routh sınırları (a₂a₁ = a₃a₀), ayrılma noktalarının elle çözümü, bu dosyada ayrıca yazılmış küçük adımlı RK4 ile
// basamak ve döngü yanıtları, N(jω)/D(jω)'nin doğrudan karmaşık hesabı, |L| = 1 ve faz = −180°'nin bu dosyada ikiye
// bölmeyle çözülmesi, Ziegler–Nichols tablosunun sayıları ve P denetiminde kalıcı hatanın son değer kuramı.
// Kullanım: node scripts/check-g-kontrol-kurami.mjs [--browser] [--dump]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "kontrol-kurami";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.ControlLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1e-300, Math.abs(b)), `${label} ${a} ≠ ${b} (göreli ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };

/* ── Kabuk ── */
ok(Object.isFrozen(K) && Object.isFrozen(K.LOOP) && Object.isFrozen(K.PID_PLANTS), "çekirdek dondurulmuş");
ok(/<body class="app-page" data-page="kontrol-kurami">/.test(html), "data-page");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Kontrol Kuramı: ") && [...title].length <= 80, "başlık biçimi ve uzunluğu");
ok(/name="description"/.test(html) && /shared\/theme\.css/.test(html) && /shared\/app\.js/.test(html) && /viewport-fit=cover/.test(html), "meta, theme.css, app.js");
ok((html.match(/<p class="hint">/g) || []).length === 1, "tek hint paragrafı");
ok(!/fonts\.googleapis|cdn\.|unpkg|jsdelivr|<script src="http/.test(html), "CDN yok");
ok(!/[̀-ͯ⃗]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}☀-➿]/u.test(html), "emoji yok");
ok(!/type="number"/.test(html), "type=number yok");
ok(!/body\s*\{[^}]*overflow:\s*hidden/.test(html), "body overflow:hidden yok");

/* ── Kök bulucular: Vieta ile yeniden kurma ve kapalı biçimli kökler ── */
const vieta = (rs) => { let p = [{ re: 1, im: 0 }]; for (const r of rs) { const q = p.map(() => ({ re: 0, im: 0 })).concat([{ re: 0, im: 0 }]); p.forEach((c, i) => { q[i].re += c.re; q[i].im += c.im; q[i + 1].re -= c.re * r.re - c.im * r.im; q[i + 1].im -= c.re * r.im + c.im * r.re; }); p = q; } return p; };
const polys = [[1, 3, 2, 0], [1, 10, 35, 50, 24], [1, 1, 0], [1, 3, -4, 0], [2e-8, 4.001e-5, 0.00252, 0], [1, 3, 2, 6], [1, 10, 35, 50, 150], [1, 0, 2, 0, 1], [3, -2, 7, 1, -5, 2], [1, 3, 3, 1 + 1e-6]];
for (const p of polys) for (const finder of [K.rootsAberth, K.rootsDK]) {
  const rs = finder(p), m = vieta(rs), scale = Math.max(...p.map(Math.abs)) / Math.abs(p[0]);
  ok(rs.length === p.length - 1, "kök sayısı = derece");
  m.forEach((c, i) => { abs(c.re, p[i] / p[0], 2e-7 * Math.max(1, scale), "Vieta gerçel"); abs(c.im, 0, 2e-7 * Math.max(1, scale), "Vieta sanal"); });
}
{ // ikinci derece: s² + 2s + 5 → −1 ± 2j; küp: s³ − 2 → 2^(1/3)
  const q = K.sortRoots(K.rootsAberth([1, 2, 5])); abs(q[0].re, -1, 1e-12); abs(Math.abs(q[0].im), 2, 1e-12);
  const c = K.rootsAberth([1, 0, 0, -2]).find((z) => Math.abs(z.im) < 1e-9); near(c.re, Math.cbrt(2), 1e-12);
  // katlı kök kümesi cilası: (s + 1)³ ve (s + 2)²
  K.clusterRoots(K.rootsAberth([1, 3, 3, 1]), [1, 3, 3, 1]).forEach((z) => { abs(z.re, -1, 1e-12); abs(z.im, 0, 1e-12); });
  K.clusterRoots(K.rootsAberth([1, 4, 4]), [1, 4, 4]).forEach((z) => { abs(z.re, -2, 1e-12); });
  ok(K.rootGap(K.rootsAberth(polys[4]), K.rootsDK(polys[4])) < 1e-12, "Aberth ve Durand–Kerner uyuşuyor");
}

/* ── Routh, kök yeri sınırları, asimptotlar, ayrılma noktaları (elle türetilmiş değerler) ── */
{
  const M = { R: 2, L: 1e-3, K: 0.05, J: 2e-5, b: 1e-5 }, a3 = M.J * M.L, a2 = M.J * M.R + M.b * M.L, a1 = M.b * M.R + M.K * M.K;
  const exp = { p3: [6, Math.SQRT2, false], p4: [126, Math.sqrt(5), false], unst: [6, Math.SQRT2, true], motor: [a2 * a1 / (a3 * M.K), Math.sqrt(a1 / a3), false] };
  for (const [key, [Ku, wu, toStable]] of Object.entries(exp)) {
    const p = K.LOOP[key], rc = K.routhCritical(p.N, p.D, p.kref), lc = K.locusCritical(p.N, p.D, p.kref);
    ok(rc.length === 1 && lc.length === 1, key + ": tek sınır"); near(rc[0].K, Ku, 1e-8, key + " Routh K"); near(lc[0].K, Ku, 1e-8, key + " kök yeri K");
    near(rc[0].omega, wu, 1e-7, key + " Routh ω"); near(lc[0].omega, wu, 1e-7, key + " kök yeri ω"); ok(lc[0].toStable === toStable, key + " yön");
    // sınırın iki yanında kök sayısı (kök bulucu) ile Routh işaret değişimi aynı
    for (const f of [0.5, 0.99, 1.01, 2]) { const poly = K.charPoly(p.N, p.D, Ku * f), n = K.rootsAberth(poly).filter((z) => z.re > 0).length; ok(n === K.routh(poly).changes, key + " Routh = kök sayısı " + f); ok((n === 0) === (toStable ? f > 1 : f < 1), key + " kararlılık yönü " + f); }
  }
  const pz = K.LOOP.pz; ok(K.routhCritical(pz.N, pz.D, pz.kref).length === 0 && K.locusCritical(pz.N, pz.D, pz.kref).length === 0, "pz hiç kararsız olmuyor");
  // Routh'ta sıfır satırı: s³ + 3s² + 2s + 6 (K = 6'da p3) → kökler ±j√2
  const z = K.routh([1, 3, 2, 6]); ok(z.marginal && z.notes.some((n) => n.kind === "zero-row"), "sıfır satırı algılandı"); ok(z.changes === 0, "sanal eksende kök, RHP yok");
  const asy = { p3: [-1, [60, 180, 300]], p4: [-2.5, [45, 135, 225, 315]], unst: [-1, [90, 270]], motor: [-a2 / a3 / 3, [60, 180, 300]] };
  for (const [key, [sg, angs]] of Object.entries(asy)) { const p = K.LOOP[key], t = K.asymptotes(p.N, p.D), m = K.asymptotesMeasured(p.N, p.D, p.kref); near(t.sigma, sg, 1e-10, key + " merkez"); abs(m.sigma, sg, 1e-3 * Math.abs(sg), key + " ölçülen merkez"); angs.forEach((a, i) => { abs(t.angles[i], a, 1e-12); abs(m.angles[i], a, 1e-3); }); }
  ok(K.asymptotes(pz.N, pz.D).q === 1 && K.asymptotes(pz.N, pz.D).sigma === null, "n − m = 1: merkez tanımsız");
  const brk = { p3: [-1 + 1 / Math.sqrt(3)], p4: [-2.5 - Math.sqrt(1.25), -2.5 + Math.sqrt(1.25)], pz: [-3 - Math.sqrt(6), -3 + Math.sqrt(6)], unst: [Math.cbrt(3) - 1] };
  for (const [key, ss] of Object.entries(brk)) { const p = K.LOOP[key], t = K.breakaway(p.N, p.D).map((b) => b.s).sort((a, b) => a - b), m = K.breakawayMeasured(p.N, p.D, p.kref).map((b) => b.s).sort((a, b) => a - b); ok(t.length === ss.length && m.length === ss.length, key + " ayrılma sayısı"); ss.forEach((v, i) => { near(t[i], v, 1e-9, key + " ayrılma kuram"); near(m[i], v, 1e-7, key + " ayrılma ölçülen"); }); }
  near(K.breakaway(pz.N, pz.D).find((b) => b.s > -1).K, -((-3 + Math.sqrt(6)) * (-2 + Math.sqrt(6))) / Math.sqrt(6), 1e-9, "pz ayrılma K");
}

/* ── Bu dosyanın kendi RK4'ü ── */
function rk4(f, x0, tEnd, dt) { let x = x0.slice(), t = 0; const out = [[0, x.slice()]]; const n = Math.round(tEnd / dt); for (let i = 0; i < n; i++) { const a = f(t, x), b = f(t + dt / 2, x.map((v, j) => v + dt / 2 * a[j])), c = f(t + dt / 2, x.map((v, j) => v + dt / 2 * b[j])), d = f(t + dt, x.map((v, j) => v + dt * c[j])); x = x.map((v, j) => v + dt / 6 * (a[j] + 2 * b[j] + 2 * c[j] + d[j])); t += dt; out.push([t, x.slice()]); } return out; }

/* ── 1 · Basamak yanıtı ── */
for (const zeta of [0.1, 0.3, 0.5, 0.707, 0.9]) for (const wn of [0.5, 2, 7]) {
  const r = K.stepRun({ kind: "second", K: 1, zeta, wn, zero: "none" }), ref = rk4((t, x) => [x[1], wn * wn * (1 - x[0]) - 2 * zeta * wn * x[1]], [0, 0], r.tEnd, r.tEnd / 20000);
  let e = 0; for (const [t, x] of ref) e = Math.max(e, Math.abs(r.pl.closed(t) - x[0])); ok(e < 1e-8, `kapalı biçim = bağımsız RK4 (ζ=${zeta})`);
  ok(r.err < 1e-7, "sayfanın RK4'ü kapalı biçimle uyuşuyor");
  const m = K.stepMetrics(r.sim.t, r.sim.y, r.sim.y[r.sim.y.length - 1]), osRef = 100 * Math.exp(-Math.PI * zeta / Math.sqrt(1 - zeta * zeta)), tpRef = Math.PI / (wn * Math.sqrt(1 - zeta * zeta));
  abs(m.os, osRef, 0.01, "aşma"); near(m.tp, tpRef, 2e-4, "tepe zamanı");
  // ölçülen yerleşme ≤ zarf formülü (zarf bir üst sınırdır)
  ok(m.ts <= -Math.log(0.02 * Math.sqrt(1 - zeta * zeta)) / (zeta * wn) * (1 + 1e-3), "yerleşme ≤ zarf");
  abs(r.sim.y[r.sim.y.length - 1], 1, 1e-5, "son değer");
}
{ const r = K.stepRun({ kind: "first", K: 2, tau: 1.5 }), m = K.stepMetrics(r.sim.t, r.sim.y, 2); near(m.tr, 1.5 * Math.log(9), 1e-3); near(m.ts, 1.5 * Math.log(50), 1e-3); ok(m.os === 0, "birinci mertebe aşmasız"); }
{ const r = K.stepRun({ kind: "second", K: 1, zeta: 1, wn: 2, zero: "none" }), m = K.stepMetrics(r.sim.t, r.sim.y, 1); ok(m.os === 0, "kritik: aşma yok"); const ref = rk4((t, x) => [x[1], 4 * (1 - x[0]) - 4 * x[1]], [0, 0], 4, 1e-4); abs(ref[ref.length - 1][1][0], r.pl.closed(4), 1e-10); }
{ const r = K.stepRun({ kind: "second", K: 1, zeta: 0, wn: 2, zero: "none" }), m = K.stepMetrics(r.sim.t, r.sim.y, 1); ok(r.sigma <= 1e-9 && m.ts === null, "sönümsüz: oturmuyor"); abs(m.os, 100, 1e-3); }
{ // sağ yarı düzlem sıfırı: y = s − h/a; başta ters yön
  const r = K.stepRun({ kind: "second", K: 1, zeta: 0.5, wn: 2, zero: "rhp", a: 1 }), m = K.stepMetrics(r.sim.t, r.sim.y, 1);
  ok(m.under < -50, "ters yanıt var"); const ref = rk4((t, x) => [x[1], 4 * (1 - x[0]) - 2 * x[1]], [0, 0], 3, 1e-4); for (const [t, x] of ref.filter((_, i) => i % 1000 === 0)) abs(r.pl.closed(t), x[0] - x[1] / 1, 1e-9, "RHP sıfırlı kapalı biçim");
}
{ // DC motor: ζ = 1 eşiği ve son hız
  const { R, K: Km, b } = K.MOTOR, J = 2e-5, Lc = (() => { const A = b * b, B = 2 * J * R * b - 4 * J * (b * R + Km * Km), C = J * J * R * R; return (-B - Math.sqrt(B * B - 4 * A * C)) / (2 * A); })();
  near(K.plantTF({ kind: "motor", Lmh: Lc * 1e3, Jg: 200 }).zeta, 1, 1e-9, "motor ζ = 1");
  const r = K.stepRun({ kind: "motor", Lmh: 1, Jg: 200 }); near(r.sim.y[r.sim.y.length - 1], Km / (b * R + Km * Km), 1e-6, "motor son hız");
  const rr = K.stepRun({ kind: "motor", Lmh: 20, Jg: 200 }), mm = K.stepMetrics(rr.sim.t, rr.sim.y, rr.sim.y[rr.sim.y.length - 1]); abs(mm.os, 100 * Math.exp(-Math.PI * rr.pl.zeta / Math.sqrt(1 - rr.pl.zeta ** 2)), 0.01, "motor aşma");
}

/* ── 3 · Frekans yanıtı, paylar, Nyquist ── */
const cdiv = (a, b) => { const d = b.re * b.re + b.im * b.im; return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d }; };
const pj = (p, w) => { let re = 0, im = 0; for (const c of p) { const nr = -im * w + c, ni = re * w; re = nr; im = ni; } return { re, im }; };
for (const key of Object.keys(K.LOOP)) {
  const p = K.LOOP[key], ff = K.factorForm(p.N, p.D);
  for (const w of [0.03, 0.3, 1, 3, 30, 300, 3000]) for (const T of [0, 0.7]) { const v = cdiv(pj(p.N, w), pj(p.D, w)), Lm = 2.5 * Math.hypot(v.re, v.im), f = K.freq(ff, 2.5, T, w); near(f.mag, Lm, 1e-9, key + " |L|"); let d = f.phase - (Math.atan2(v.im, v.re) - w * T); d -= 2 * Math.PI * Math.round(d / (2 * Math.PI)); abs(d, 0, 1e-9, key + " faz"); }
}
{ // p3, K = 1: ω_c bu dosyada ikiye bölmeyle; PM, GM = 6, T* = PM/ω_c
  const mag = (w) => 1 / (w * Math.sqrt(w * w + 1) * Math.sqrt(w * w + 4)); let lo = 0.01, hi = 10; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (mag(m) > 1) lo = m; else hi = m; }
  const wc = lo, pm = 180 - 90 - Math.atan(wc) * 180 / Math.PI - Math.atan(wc / 2) * 180 / Math.PI, p = K.LOOP.p3, mg = K.margins(K.factorForm(p.N, p.D), 1, 0, 1e-3, 1e3);
  near(mg.wc, wc, 1e-9); near(mg.pm, pm, 1e-8); near(mg.gm, 6, 1e-9); near(mg.w180, Math.SQRT2, 1e-9);
  const cd = K.criticalDelaySim(p.N, p.D, 1); near(cd.T, pm * Math.PI / 180 / wc, 2e-4, "kritik gecikme benzetimi"); near(cd.omega, wc, 2e-4, "kritik gecikmede salınım ω_c");
  const mt = K.margins(K.factorForm(p.N, p.D), 1, 1, 1e-3, 1e3); near(mt.pm, pm - wc * 180 / Math.PI, 1e-7, "gecikme PM'yi ω_c·T kadar düşürür"); near(mt.wc, wc, 1e-9, "gecikme ω_c'yi değiştirmez");
  for (const w of [0.1, 0.5, 2]) { const m = K.measureFreq(p.N, p.D, 1, 0.5, w), f = K.freq(K.factorForm(p.N, p.D), 1, 0.5, w); near(m.mag, f.mag, 2e-4, "ölçülen genlik"); let d = m.phase - f.phase; d -= 2 * Math.PI * Math.round(d / (2 * Math.PI)); abs(d, 0, 2e-4, "ölçülen faz"); }
}
for (const key of Object.keys(K.LOOP)) { // Nyquist Z = kök bulucunun saydığı kararsız kapalı çevrim kutbu
  const p = K.LOOP[key], ff = K.factorForm(p.N, p.D);
  for (const f of [0.05, 0.5, 0.9, 1.1, 3, 20]) { const k = p.kref * f, nq = K.nyquist(ff, k, 0), n = K.rootsAberth(K.charPoly(p.N, p.D, k)).filter((z) => z.re > 0).length; ok(nq.Z === n, `${key} Nyquist Z=${nq.Z} kök=${n} (K=${k})`); abs(nq.raw, Math.round(nq.raw), 1e-6, "tam sarma sayısı"); }
}
{ const p = K.LOOP.unst, nq = K.nyquist(K.factorForm(p.N, p.D), 10, 0); ok(nq.P === 1 && nq.Ncw === -1 && nq.Z === 0, "kararsız açık çevrim: N = −1, P = 1"); }
{ // gecikmeyle Nyquist: T* altında kararlı, üstünde kararsız
  const p = K.LOOP.pz, ff = K.factorForm(p.N, p.D), mg = K.margins(ff, 1, 0, 1e-3, 1e3), Ts = mg.pm * Math.PI / 180 / mg.wc; ok(K.nyquist(ff, 1, 0.95 * Ts).Z === 0 && K.nyquist(ff, 1, 1.05 * Ts).Z > 0, "gecikmeli Nyquist sınırı"); abs(mg.pm, 60, 1e-8, "pz faz payı 60°"); near(mg.wc, Math.sqrt(3), 1e-9);
}

/* ── 4 · PID ── */
{
  const lag = K.PID_PLANTS.lag3, u = K.ultimateSim(lag.num, lag.den, 0), th = K.ultimateTheory(lag.num, lag.den, 0);
  near(th.K, 8, 1e-10, "K_u kuram (s+1)³"); near(th.T, 2 * Math.PI / Math.sqrt(3), 1e-10); near(u.K, 8, 1e-6, "K_u benzetim"); near(u.T, 2 * Math.PI / Math.sqrt(3), 1e-5, "T_u benzetim");
  // FOPDT: atan(5ω) + ωT = π bu dosyada ikiye bölmeyle
  for (const T of [0.5, 1, 2]) { let lo = 1e-3, hi = 50; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (Math.atan(5 * m) + m * T < Math.PI) lo = m; else hi = m; } const Ku = Math.sqrt(1 + 25 * lo * lo); const t2 = K.ultimateTheory([1], [5, 1], T), s2 = K.ultimateSim([1], [5, 1], T); near(t2.K, Ku, 1e-9, "FOPDT K_u"); near(t2.T, 2 * Math.PI / lo, 1e-9); near(s2.K, Ku, 2e-4, "FOPDT K_u benzetim"); near(s2.T, 2 * Math.PI / lo, 1e-4); }
  ok(K.ultimateTheory([1], [5, 1], 0) === null && K.ultimateSim([1], [5, 1], 0) === null, "ölü zamansız birinci mertebe: sınır yok");
  const z = K.zieglerNichols(8, 4); near(z.Kp, 4.8, 1e-12); near(z.Ki, 2.4, 1e-12); near(z.Kd, 2.4, 1e-12);
  // P denetimi: e∞ = r/(1 + Kp) ve (r − d)/(1 + Kp); bağımsız RK4 döngüsü ile
  for (const Kp of [0.5, 2, 3]) { const r = K.pidRun({ plant: "lag3", Kp, Ki: 0, Kd: 0, delay: 0, r: 1, d: 0.5 }); near(r.essPre, 1 / (1 + Kp), 1e-4, "P kalıcı hata"); near(r.essPost, 0.5 / (1 + Kp), 2e-4, "P bozucudan sonra");
    const ref = rk4((t, x) => { const u = Kp * (1 - x[2]) + (t >= 40 ? 0.5 : 0); return [u - x[0], x[0] - x[1], x[1] - x[2]]; }, [0, 0, 0], 80, 0.005); for (const i of [2000, 7000, 12000]) abs(r.sim.y[i / 4], ref[i][1][2], 1e-6, "döngü = bağımsız RK4"); }
  const r = K.pidRun({ plant: "lag3", Kp: 2, Ki: 0.6, Kd: 1.6, delay: 0, r: 1, d: 0.5 }); abs(r.essPre, 0, 1e-4); abs(r.essPost, 0, 1e-4); ok(r.pre.os < 5 && r.dev > 0.1, "elle ayar: küçük aşma");
  const off = K.pidRun({ plant: "lag3", Kp: 4.8, Ki: 2.65, Kd: 2.18, delay: 0, r: 1, d: 0.5, sat: true, umax: 2, aw: false }), on = K.pidRun({ plant: "lag3", Kp: 4.8, Ki: 2.65, Kd: 2.18, delay: 0, r: 1, d: 0.5, sat: true, umax: 2, aw: true });
  ok(off.pre.os > 40 && on.pre.os < 15, "kenetleme aşmayı azaltır"); ok(Math.max(...off.sim.u.map(Math.abs)) <= 2 + 1e-12, "doyma sınırı");
  // gecikme: girişteki ölü zaman, açık çevrimde çıkışı tam T kaydırır
  const a = K.simOpen([1], [1, 1], () => 1, 5, 1e-3, 0), b = K.simOpen([1], [1, 1], () => 1, 5, 1e-3, 1.5); abs(b.y[4000], a.y[2500], 3e-5, "gecikme kaydırması (sıçrama adım sınırında: O(Δt) yerel hata)");
}
for (const bad of [() => K.rootsAberth([0, 0]), () => K.loopPlant("x"), () => K.plantTF({ kind: "first", K: 1, tau: 0 }), () => K.simLoop({ num: [1, 0], den: [1, 1], dt: 0.01, tEnd: 1 }), () => K.pidRun({ plant: "yok" }), () => K.ss([1, 2, 3], [1, 1])]) { assert.throws(bad); checks++; }
console.log(`G ${SLUG}: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let browser; const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, locale: "tr-TR" });
      const page = await ctx.newPage();
      await page.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      page.setDefaultTimeout(20000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      await page.waitForTimeout(400);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { await page.waitForTimeout(60); const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = async (id, v) => { await page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v)); await page.waitForTimeout(250); };
      const sel = async (id, v) => { await page.locator("#" + id).selectOption(v); await page.waitForTimeout(300); };
      const click = async (id) => { await page.click("#" + id); await page.waitForTimeout(300); };
      const noOverflow = async (label) => ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "yatay taşma yok: " + label);
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("main input,main select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id));
      ok(unlabeled.length === 0, "etiketsiz denetim: " + unlabeled.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-6; })), "varsayılanlar adım ızgarasında");
      ok(await page.evaluate(() => Object.isFrozen(window.ControlLab) && !Object.getOwnPropertyDescriptor(window, "ControlLab").writable), "çekirdek dondurulmuş (tarayıcı)");
      if (process.argv.includes("--dump") && width === 1280) {
        for (const t of ["tf", "rl", "bd", "pd"]) { await click("tab-" + t); console.log("== " + t, JSON.stringify(await page.evaluate((t) => Object.fromEntries([...document.querySelectorAll(`#panel-${t} strong[id], #panel-${t} output, #panel-${t} .kk-status`)].map((e) => [e.id, e.textContent])), t), null, 1)); }
        await click("tab-tf");
      }
      // 1 · Transfer fonksiyonu
      await has("tfZetaOut", "0,50"); await has("tfWnOut", "2,0 rad/s"); await has("tfPoles", "−1,000 ± 1,732j"); await has("tfOS", "16,30 %"); await has("tfOSTh", "16,30 %"); await has("tfTp", "1,814 s"); await has("tfTpTh", "1,814 s"); await has("tfTr", "818,8 ms"); await has("tfTsTh", "4,056 s"); await has("tfFinalTh", "1,0000"); await has("tfTs4", "4,000 s");
      ok(await page.locator("#tfTauF").isHidden() && await page.locator("#tfLF").isHidden(), "yalnız ilgili alanlar");
      // hazır düğmeler bağlı oldukları bütün parametreleri kurar (her durumdan aynı sayılar)
      await range("tfWn", 4); await range("tfK", 3); await click("tfLow"); await has("tfWnOut", "2,0 rad/s"); await has("tfOS", "52,66 %"); await has("tfTp", "1,603 s"); await has("tfTsTh", "9,831 s");
      await range("tfWn", 4); await has("tfOS", "52,66 %"); await has("tfTp", "801,6 ms");
      await click("tfRhp"); await has("tfWnOut", "2,0 rad/s"); await has("tfUnder", "75,22 %"); await has("tfOS", "28,57 %");
      await range("tfWn", 4); await click("tfCrit"); await has("tfZetaOut", "1,00"); await has("tfOS", "0,00 %"); await has("tfTp", "aşma yok"); await has("tfTsThLabel", "Kapalı biçimden"); await has("tfTsTh", "2,917 s");
      await click("tfUndamped"); await has("tfTs", "oturmuyor"); await has("tfFinal", "tanımsız"); await has("tfStatus", "Son değer kuramı");
      await click("tfRhp"); await has("tfUnder", "75,22 %"); await has("tfStatus", "ters yöne"); ok(await page.locator("#tfAF").isVisible(), "a alanı görünür");
      await click("tfMotorL"); await has("tfLOut", "20,0 mH"); await has("tfOS", "7,66 %"); await has("tfOSTh", "7,66 %"); await has("tfFinal", "19,841 rad/s"); await has("tfStatus", "7,97 mH"); ok(await page.locator("#tfZetaF").isHidden(), "motorda ζ kaydırıcısı gizli");
      await range("tfL", 0.1); await has("tfOS", "0,00 %");
      await sel("tfPlant", "first"); await range("tfTau", 5); await has("tfTrTh", "10,99 s"); await has("tfTsTh", "19,56 s"); await range("tfTau", 0.1); await has("tfTsTh", "391,2 ms");
      await sel("tfPlant", "second"); await sel("tfZero", "none"); await range("tfZeta", 2); await range("tfWn", 10); await has("tfStatus", "Aşırı sönümlü"); await range("tfZeta", 0.01); await has("tfOSTh", "96,91 %");
      await click("tfReset"); await has("tfOS", "16,30 %"); await noOverflow("transfer");
      // 2 · Kök yeri
      await click("tab-rl"); await page.waitForTimeout(400); await has("rlKOut", "K = 1,000"); await has("rlPoles", "−2,325; −0,3376 ± 0,5623j"); await has("rlKuMeas", "6,00000"); await has("rlKuTh", "6,00000"); await has("rlWuMeas", "1,41421 rad/s"); await has("rlCentMeas", "−1,00000"); await has("rlBrkMeas", "−0,422650"); await has("rlBrkTh", "−0,422650"); await has("rlOS", "14,46 %"); await has("rlOSTh", "15,16 %"); await has("rlRhp", "0 · 0");
      ok((await page.locator("#rlRouth").textContent()).includes("1,6667"), "Routh tablosu");
      await click("rlAtKu"); await has("rlKOut", "K = 5,998"); await has("rlStatus", "sanal eksene çok yakın");
      await range("rlK", 1); await has("rlRhp", "2 · 2"); await has("rlStatus", "kararsız"); await has("rlOS", "kararsız");
      await click("rlAtBrk"); await has("rlKOut", "K = 0,38");
      { await page.locator("#rlLocus").scrollIntoViewIfNeeded(); await page.waitForTimeout(150); const box = await page.locator("#rlLocus").boundingBox(); const before2 = await read("rlKOut"); const v = [-5, 2, -3.6, 3.6], W = box.width - 58, Hh = box.height - 46, sc = Math.min(W / 7, Hh / 7.2), px = (re) => box.x + 46 + W / 2 + (re + 1.5) * sc, py = (im) => box.y + 16 + Hh / 2 - im * sc; // sanal ekseni kestiği nokta j√2
        await page.mouse.click(px(0), py(Math.SQRT2)); await page.waitForTimeout(300); ok((await read("rlKOut")) !== before2, "kök yerine tıklama K'yı değiştirir"); { const kv = parseFloat((await read("rlKOut")).replace("K = ", "").replace(",", ".")); ok(kv > 5.8 && kv < 6.2, "tıklanan nokta j√2: K ≈ 6, okunan " + kv); } }
      await sel("rlPlant", "pz"); await has("rlKuMeas", "yok"); await has("rlBrkMeas", "−5,44949"); await has("rlBrkMeas", "birleşme"); await has("rlCentMeas", "tanımsız"); await has("rlStatus", "çember");
      await sel("rlPlant", "unst"); await has("rlKOut", "K = 10,00"); await has("rlKuLabel", "K > K* kararlı"); await has("rlBrkMeas", "0,442250"); await has("rlStatus", "koşullu");
      await range("rlK", 0.5); await has("rlRhp", "2 · 2");
      await sel("rlPlant", "p4"); await has("rlKuTh", "126,000"); await has("rlAngMeas", "45,000°; 135,000°; 225,000°; 315,000°"); await has("rlBrkMeas", "−1,38197");
      await sel("rlPlant", "motor"); await has("rlKuTh", "100,825 V/rad"); await has("rlWuTh", "354,965 rad/s"); await has("rlCentTh", "−666,833");
      await click("rlReset"); await has("rlKOut", "K = 1,000"); await has("rlOS", "14,46 %"); await noOverflow("kök yeri");
      // 3 · Bode
      await click("tab-bd"); await page.waitForTimeout(800); await has("bdWc", "0,44575 rad/s"); await has("bdPM", "53,411°"); await has("bdGM", "6,00000 (15,56 dB)"); await has("bdGMRouth", "6,00000"); await has("bdTcMeas", "2,0913 s"); await has("bdTcTh", "2,0913 s"); await has("bdN", "0"); await has("bdCheck", "uyuşuyor");
      ok((await page.locator("#bdTable").textContent()).includes("−161,57°"), "ölçülen Bode tablosu");
      await click("bdAtCrit"); await has("bdTOut", "2,05 s"); await has("bdPM", "1,055°"); await has("bdCheck", "kararlı (salınım sönüyor)"); await has("bdGMRouth", "uygulanamaz");
      await range("bdT", 2.2); await has("bdZ", "2"); await has("bdCheck", "kararsız (salınım büyüyor), Nyquist ile uyuşuyor");
      await click("bdHigh"); await has("bdKOut", "K = 2,999"); await has("bdGM", "2,00"); await has("bdTcTh", "0,36104 s");
      await sel("bdPlant", "unst"); await has("bdN", "−1"); await has("bdP", "1"); await has("bdZ", "0"); await has("bdStatus", "yanıltıcıdır"); ok((await page.locator("#bdTable").textContent()).includes("ölçülmedi"), "kararsız açık çevrimde ölçüm yok"); await has("bdTcMeas", "0,097401 s");
      await sel("bdPlant", "p4"); await has("bdWc", "yok"); await has("bdTcMeas", "bulunamadı"); await has("bdTcTh", "sonsuz"); await has("bdStatus", "hiçbir gecikme");
      await sel("bdPlant", "motor"); await has("bdTOut", "0,00 ms"); await has("bdPM", "28,790°"); await has("bdTcMeas", "4,8015 ms"); await has("bdGMRouth", "10,0825");
      await click("bdReset"); await has("bdPM", "53,411°"); await noOverflow("Bode");
      // 4 · PID
      await click("tab-pd"); await page.waitForTimeout(800); await has("pdKuMeas", "8,00000"); await has("pdKuTh", "8,00000"); await has("pdTuMeas", "3,62760 s"); await has("pdZN", "4,80"); await has("pdZN", "2,65"); await has("pdZN", "2,18");
      const tb = await page.locator("#pdTable").textContent(); ok(tb.includes("2,43 %") && tb.includes("52,20 %") && tb.includes("8,215 s") && tb.includes("9,671 s"), "başarım tablosu");
      ok(await page.locator("#pdUmaxF").isHidden(), "doyma alanı gizli");
      await click("pdPonly"); await has("pdEssPre", "0,2500"); await has("pdEssPreTh", "0,2500"); await has("pdEssPost", "0,1250"); await has("pdStatus", "kalıcı hata kalır");
      await click("pdWindup"); await has("pdWindOff", "55,69 %"); await has("pdWindOn", "8,09 %"); await page.click("#pdAw"); await page.waitForTimeout(300); await has("pdStatus", "Kenetleme açık");
      await range("pdKp", 20); await range("pdKi", 10); await has("pdStatus", "sınır çevrimine"); await page.click("#pdSat"); await page.waitForTimeout(300); await has("pdStatus", "kararsız"); await has("pdEssPre", "kararsız");
      await sel("pdPlant", "fopdt"); await has("pdDelayOut", "1,00 s"); await has("pdKuTh", "8,50242"); await has("pdTuTh", "3,72076 s");
      await range("pdDelay", 0); await has("pdKuMeas", "yok"); await has("pdZN", "uygulanamaz"); ok(await page.locator("#pdLoadZN").isDisabled(), "ZN düğmesi kapalı");
      await click("pdReset"); await has("pdKuMeas", "8,00000"); ok(!(await page.locator("#pdSat").isChecked()), "doyma kapandı"); await noOverflow("PID");
      // klavye: sekmeler ve R kısayolu
      await page.locator("#tab-pd").focus(); await page.keyboard.press("Home"); ok((await page.locator("#tab-tf").getAttribute("aria-selected")) === "true", "Home");
      await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-rl").getAttribute("aria-selected")) === "true", "ArrowRight");
      await page.keyboard.press("End"); ok((await page.locator("#tab-pd").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("ArrowLeft"); ok((await page.locator("#tab-bd").getAttribute("aria-selected")) === "true", "ArrowLeft");
      await range("bdT", 1); await page.locator("h1").click(); await page.keyboard.press("r"); await page.waitForTimeout(300); await has("bdTOut", "0,00 s");
      await range("bdT", 1); await page.locator("#bdT").focus(); await page.keyboard.press("r"); await page.waitForTimeout(200); await has("bdTOut", "1,00 s");
      { const dg = await page.evaluate(async () => { for (let i = 0; i < 50 && !document.querySelector(".digest"); i++) await new Promise((r) => setTimeout(r, 100)); const el = document.querySelector(".digest"); return el ? el.getBoundingClientRect().height : 0; }); ok(dg > 200, "Keşif Defteri yüklendi"); }
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); server.close(); }
}
