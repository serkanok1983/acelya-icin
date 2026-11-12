// G · lazer-ve-uyarilmis-salim.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// Planck tayfının Simpson integrali ve yayımlanmış Stefan–Boltzmann sabiti, iki düzeyli denklemin kesin üstel çözümü,
// düzey matrislerinin bu dosyada yeniden kurulup kendi Gauss eleme çözücüsüyle çekirdek uzayının bulunması,
// küçük adımlı açık RK4 ile geçici çözümler, rezonatör denkleminin sayısal Jacobian'ının özdeğerleri, eşiğin altındaki
// kapalı biçim N(t) = Pτ(1 − e^(−t/τ)), kipleri kaba kuvvetle sayma, sin(Nx)/(N sin x) = 1/√2 kökünün ikiye bölmeyle
// bulunması, rastgele evreler için çok tohumlu ortalama, Gauss demeti için Parseval ve hiperbol denetimi.
// Kullanım: node scripts/check-g-lazer-ve-uyarilmis-salim.mjs [--browser] [--dump]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "lazer-ve-uyarilmis-salim";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.LaserLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1e-300, Math.abs(b)), `${label} ${a} ≠ ${b} (göreli ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };

/* ── Kabuk ── */
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(/<body class="app-page" data-page="lazer-ve-uyarilmis-salim">/.test(html), "data-page");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Lazer ve Uyarılmış Salım: ") && [...title].length <= 80, "başlık biçimi ve uzunluğu");
ok(/name="description"/.test(html) && /shared\/theme\.css/.test(html) && /shared\/app\.js/.test(html), "meta, theme.css, app.js");
ok(!/fonts\.googleapis|cdn\.|unpkg|jsdelivr|<script src="http/.test(html), "CDN yok");
ok(!/[̀-ͯ⃗]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}☀-➿]/u.test(html), "emoji yok");
ok(!/type="number"/.test(html), "type=number yok");

const h = 6.62607015e-34, c = 299792458, kB = 1.380649e-23, SIGMA_SB = 5.670374419e-8; // SI 2019, CODATA 2018 σ
function simpson(f, a, b, n = 20000) { const s = (b - a) / n; let t = f(a) + f(b); for (let i = 1; i < n; i++) t += f(a + i * s) * (i % 2 ? 4 : 2); return t * s / 3; }

/* ── 1 · Einstein katsayıları ── */
{
  // Planck yasası: ∫u_ν dν = (4σ/c) T⁴ (yayımlanmış σ ile)
  for (const T of [300, 3000, 5800, 10000]) {
    const numax = 40 * kB * T / h, I = simpson((nu) => (nu === 0 ? 0 : K.planckU(nu, T)), 0, numax, 40000);
    near(I, 4 * SIGMA_SB / c * T ** 4, 1e-6, `Stefan–Boltzmann T=${T}`);
  }
  // Wien yer değiştirme: u_ν tepesi x ≈ 2,821439 (ν'ye göre) — çekirdeğin planckU'su ile kaba tarama
  { const T = 5000; let best = 0, bx = 0; for (let x = 2.5; x < 3.2; x += 1e-5) { const v = K.planckU(x * kB * T / h, T); if (v > best) { best = v; bx = x; } } abs(bx, 2.821439, 2e-5, "ν tepesi"); }
  for (const lam of [1, 100, 632.8, 1064, 1e4, 1e6]) for (const T of [100, 300, 3000, 20000]) {
    const p = K.photon(lam, T), x = h * c / (lam * 1e-9 * kB * T);
    near(p.x, x, 1e-12, "x"); near(p.AoverB, 8 * Math.PI * h * (c / (lam * 1e-9)) ** 3 / c ** 3, 1e-12, "A/B");
    if (x < 700) {
      for (const g of [1, 3]) {
        const nb = 1 / (Math.exp(x) - 1), pl = 1 / (Math.exp(x) - 1);
        const uB = K.balanceU(x, { g, stimulated: true }), uW = K.balanceU(x, { g, stimulated: false });
        if (Math.exp(-x) > 1e-290) { near(uB, pl, 1e-9, "dengeden Planck"); near(uW, Math.exp(-x), 1e-9, "B21'siz Wien"); }
        if (x < 600) {
          const st = K.twoLevel({ nbar: nb, g, stimulated: true }), ns = K.twoLevel({ nbar: nb, g, stimulated: false });
          const G1 = 1 + nb * (1 + g), G0 = 1 + g * nb, ss1 = g * nb / G1, ss0 = g * nb / G0;
          // kesin üstel çözüm n(t) = n_ss(1 − e^(−Γt)) ile her 500. adım
          for (let i = 500; i < st.trace.length; i += 500) { const [t, n] = st.trace[i]; near(n, ss1 * (1 - Math.exp(-G1 * t)), 1e-9, "üstel çözüm"); }
          if (Math.exp(-x) > 1e-250) { near(st.ratio, g * Math.exp(-x), 2e-6, "Boltzmann"); near(ns.ratio, ss0 / (1 - ss0), 2e-6, "B21'siz oran"); abs(ns.ratio / (g * Math.exp(-x)) - 1, nb, 2e-6 + 1e-3 * nb, "sapma = n̄"); near(st.relax, 1 / G1, 1e-6, "durulma"); }
        }
      }
    }
  }
  const p0 = K.photon(10 ** 2.8013, 3000); abs(10 ** 2.8013, 632.8, 0.05, "He–Ne kaydırıcı değeri");
  near(K.twoLevel({ nbar: p0.nbar }).ratio, 5.114e-4, 2e-4, "varsayılan N2/N1");
}

/* ── 2 · Nüfus terslenmesi ── */
function matrix(scheme, W, tu, tf, f) { // bu dosyada bağımsız kurulur: M[i][j] = j'den i'ye hız
  const n = scheme, M = Array.from({ length: n }, () => Array(n).fill(0)), add = (from, to, k) => { M[to][from] += k; M[from][from] -= k; };
  if (scheme === 2) { add(0, 1, W); add(1, 0, W); add(1, 0, 1 / tu); }
  if (scheme === 3) { add(0, 2, W); add(2, 0, W); add(2, 1, 1 / tf); add(1, 0, 1 / tu); }
  if (scheme === 4) { add(0, 3, W); add(3, 0, W); add(3, 2, 1 / tf); add(2, 1, 1 / tu); add(1, 0, 1 / tf); add(0, 1, f / tf); }
  return M;
}
function nullVec(M) { // M n = 0, Σn = 1: son satırı normalizasyonla değiştir, Gauss–Jordan
  const n = M.length, A = M.map((r) => r.slice()); A[n - 1] = Array(n).fill(1); const b = Array(n).fill(0); b[n - 1] = 1;
  for (let c0 = 0; c0 < n; c0++) { let p = c0; for (let i = c0 + 1; i < n; i++) if (Math.abs(A[i][c0]) > Math.abs(A[p][c0])) p = i; [A[c0], A[p]] = [A[p], A[c0]]; [b[c0], b[p]] = [b[p], b[c0]]; for (let i = 0; i < n; i++) if (i !== c0) { const k = A[i][c0] / A[c0][c0]; for (let j = 0; j < n; j++) A[i][j] -= k * A[c0][j]; b[i] -= k * b[c0]; } }
  return b.map((v, i) => v / A[i][i]);
}
{
  const up = { 2: 1, 3: 1, 4: 2 }, lo = { 2: 0, 3: 0, 4: 1 };
  for (const scheme of [2, 3, 4]) for (const tu of [3e-3, 230e-6, 1e-5]) for (const tf of [1e-8, 1e-7, 1e-6]) for (const f of scheme === 4 ? [0, 6.8e-5, 0.01, 0.5] : [0]) for (const W of [0, 0.1, 30, 333, 1e3, 1e5, 1e7]) {
    const cfg = { scheme, W, tauU: tu, tauF: tf, f }, ref = nullVec(matrix(scheme, W, tu, tf, f)), ss = K.steadyLevels(cfg), run = K.integrateLevels(cfg, { trace: false });
    ref.forEach((v, i) => { abs(ss.n[i], v, 1e-10, `kararlı n${i + 1}`); abs(run.n[i], v, 1e-9, `integral n${i + 1}`); });
    abs(run.n.reduce((a, b) => a + b, 0), 1, 1e-9, "toplam korunur");
    if (scheme === 2) ok(ref[1] < ref[0], "iki düzey terslenmez");
  }
  // Geçici çözüm: katı olmayan durumda açık RK4 (küçük adım) ile
  for (const scheme of [2, 3, 4]) {
    const cfg = { scheme, W: 2000, tauU: 1e-3, tauF: 1e-4, f: 0.02 }, M = matrix(scheme, cfg.W, cfg.tauU, cfg.tauF, cfg.f), run = K.integrateLevels(cfg);
    const F = (y) => M.map((r) => r.reduce((s, m, j) => s + m * y[j], 0));
    let y = Array(scheme).fill(0); y[0] = 1; let t = 0; const dt = 1e-7;
    for (const tgt of [3e-4, 1e-3, 4e-3]) {
      while (t < tgt - 1e-15) { const k1 = F(y), k2 = F(y.map((v, i) => v + dt / 2 * k1[i])), k3 = F(y.map((v, i) => v + dt / 2 * k2[i])), k4 = F(y.map((v, i) => v + dt * k3[i])); y = y.map((v, i) => v + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])); t += dt; }
      let j = run.trace.findIndex((q) => q[0] >= tgt); const [ta, ...ya] = run.trace[j - 1], [tb, ...yb] = run.trace[j];
      y.forEach((v, i) => abs(ya[i] + (yb[i] - ya[i]) * (tgt - ta) / (tb - ta), v, 4e-3, `geçici n${i + 1}`));
    }
  }
  // Eşikler: bağımsız kararlı çözümün ΔN = 0 kökü ile
  const rootW = (scheme, tu, tf, f) => { const d = (W) => { const r = nullVec(matrix(scheme, W, tu, tf, f)); return r[up[scheme]] - r[lo[scheme]]; }; let a = -12, b = 12; if (d(10 ** a) > 0) return 0; for (let i = 0; i < 200; i++) { const m = (a + b) / 2; if (d(10 ** m) > 0) b = m; else a = m; } return 10 ** a; };
  for (const [scheme, tu, tf, f] of [[3, 10 ** -2.523, 10 ** -7.301, 0], [3, 230e-6, 1e-7, 0], [3, 1e-5, 1e-6, 0], [4, 10 ** -3.638, 1e-7, Math.exp(-9.6)], [4, 1e-3, 1e-7, 0.01], [4, 1e-4, 1e-6, 1]]) {
    const ref = rootW(scheme, tu, tf, f), th = K.thresholdLevels({ scheme, tauU: tu, tauF: tf, f }), m = K.measuredThreshold({ scheme, tauU: tu, tauF: tf, f });
    near(th, ref, 1e-9, "eşik formülü"); ok(m.kind === "found", "eşik bulundu"); near(m.W, ref, 1e-6, "ölçülen eşik");
    if (scheme === 3) { ok(m.groundLeft > 0.5, "üç düzeyde yarıdan fazlası"); near(m.groundLeft, (tu + tf) / (2 * tu + tf), 1e-5, "eşikte boşalan oran"); }
  }
  ok(K.measuredThreshold({ scheme: 4, tauU: 1e-3, tauF: 1e-7, f: 0 }).kind === "below", "f = 0'da her W terslenir");
  ok(K.thresholdLevels({ scheme: 3, tauU: 1e-7, tauF: 1e-6 }) === null, "τ_üst < τ_h eşiksiz");
  near(K.measuredThreshold({ scheme: 3, tauU: 10 ** -2.523, tauF: 10 ** -7.301 }).W, 333.43, 1e-4, "varsayılan yakut eşiği");
}

/* ── 3 · Rezonatör ── */
{
  const M = K.MEDIUM, base = { L: 0.1, R1: 1, R2: 0.95, alpha: 0 };
  for (const p of [{ ...base, Pin: 5 }, { ...base, Pin: 1.2 }, { ...base, R2: 0.8, Pin: 5 }, { ...base, L: 1, Pin: 5 }, { ...base, Pin: 20 }, { L: 0.3, R1: 0.98, R2: 0.9, alpha: 0.1, Pin: 10 }]) {
    const run = K.laserRun(p), th = run.theory, an = K.analyseRun(run);
    // Eşik: tur kazancı e^(2σN/A) = 1/(R1 R2 e^(−2αL)) — doğrudan logaritmayla
    const Nth = M.area * (-Math.log(p.R1 * p.R2 * Math.exp(-2 * p.alpha * p.L))) / (2 * M.sigma);
    near(th.nth, Nth, 1e-12, "N_eş"); near(run.n, Nth, 1e-6, "kazanç kilitlenmesi");
    // Kararlı foton sayısı: β dahil ikinci derece denklemin kökü (bağımsız)
    const Kc = M.sigma * c / (M.area * p.L), tc = 2 * p.L / c / (-Math.log(p.R1 * p.R2) + 2 * p.alpha * p.L), P = p.Pin * M.lambdaP / (h * c);
    // dN=0: N = Pτ/(1+KτQ); dq=0: (K N − 1/τc) q + βN/τ = 0 → q için kök
    let qa = 1, qb = 1e20; const g = (q) => { const N = P * M.tau / (1 + Kc * M.tau * q); return (Kc * N - 1 / tc) * q + M.beta * N / M.tau; };
    for (let i = 0; i < 300; i++) { const m = Math.sqrt(qa * qb); if (g(m) > 0) qa = m; else qb = m; }
    near(run.q, qa, 5e-5, "kararlı q (14/γ sonunda kalan salınım payı)");
    near(run.Pout, h * c / M.lambdaL * qa * (-Math.log(p.R2)) / (2 * p.L / c), 5e-5, "çıkış gücü");
    // Sayısal Jacobian özdeğerleri (N, q değişkenlerinde)
    const Nss = P * M.tau / (1 + Kc * M.tau * qa), Fv = (N, q) => [P - N / M.tau - Kc * N * q, (Kc * N - 1 / tc) * q + M.beta * N / M.tau];
    const eN = Nss * 1e-6, eq = qa * 1e-6, a11 = (Fv(Nss + eN, qa)[0] - Fv(Nss - eN, qa)[0]) / (2 * eN), a12 = (Fv(Nss, qa + eq)[0] - Fv(Nss, qa - eq)[0]) / (2 * eq), a21 = (Fv(Nss + eN, qa)[1] - Fv(Nss - eN, qa)[1]) / (2 * eN), a22 = (Fv(Nss, qa + eq)[1] - Fv(Nss, qa - eq)[1]) / (2 * eq);
    const tr = a11 + a22, det = a11 * a22 - a12 * a21, disc = tr * tr / 4 - det;
    ok(disc < 0, "salınımlı durulma");
    near(th.fR, Math.sqrt(-disc) / (2 * Math.PI), 2e-3, "f_R formülü ~ Jacobian");
    ok(an.small.length >= 3, "küçük genlikli tepeler var"); near(an.f, Math.sqrt(-disc) / (2 * Math.PI), 2e-3, "ölçülen f");
    near(an.gamma, -tr / 2, 1e-2, "ölçülen sönüm");
    // Eşiğe varış: q ihmal edilirken N(t) = Pτ(1 − e^(−t/τ))
    near(run.tCross, M.tau * Math.log(th.r / (th.r - 1)), 2e-3, "eşiğe varış");
    const early = run.trace.find((q) => q[0] > 0.5 * run.tCross); near(early[1], P * M.tau * (1 - Math.exp(-early[0] / M.tau)), 1e-6, "erken N(t)");
  }
  const below = K.laserRun({ ...base, Pin: 0.5 }); ok(below.theory.r < 1 && below.Pout < 1e-6, "eşik altında güç yok");
  near(below.n, 0.5 * M.lambdaP / (h * c) * M.tau, 5e-4, "eşik altında N = Pτ (8τ sonunda e⁻⁸ payı)");
  const z = K.laserRun({ ...base, Pin: 0 }); ok(z.done && z.Pout === 0 || z.Pout < 1e-12, "sıfır pompa: NaN yok");
  const pins = []; for (let i = 0; i <= 40; i++) pins.push(i * 0.5);
  for (const p of [base, { ...base, R2: 0.8 }, { L: 0.3, R1: 0.98, R2: 0.9, alpha: 0.1 }]) {
    const sw = K.laserSweep(p, pins), th = K.laserTheory({ ...p, Pin: 1 });
    const slope = (M.lambdaP / M.lambdaL) * (-Math.log(p.R2)) / (-Math.log(p.R1 * p.R2) + 2 * p.alpha * p.L);
    const Pth = M.area * (-Math.log(p.R1 * p.R2) + 2 * p.alpha * p.L) / (2 * M.sigma) / M.tau * h * c / M.lambdaP;
    near(sw.fit.slope, slope, 2e-3, "eğim verimi"); near(sw.fit.threshold, Pth, 5e-3, "eşik pompası"); near(th.PinTh, Pth, 1e-12, "P_eş formülü");
  }
  ok(K.laserSweep({ L: 1, R1: 0.9, R2: 0.5, alpha: 0.5 }, pins).fit === null, "çok kayıplı rezonatörde uydurma yok");
}

/* ── 4 · Kipler ── */
{
  for (const L of [0.1, 0.3, 0.55, 1]) for (const r0 of [1, 1.2, 2, 5]) for (const offset of [0, 0.25, 0.5, 0.99]) {
    const md = K.modes({ L, r0, offset }), fsr = c / (2 * L); near(md.fsr, fsr, 1e-12, "c/2L");
    let n = 0; for (let k = -200; k <= 200; k++) { const nu = (k + offset) * fsr; if (r0 * Math.exp(-4 * Math.LN2 * (nu / 1.5e9) ** 2) > 1) n++; }
    ok(md.count === n, "kip sayımı");
    ok(Math.abs(md.count - md.ratio) <= 1, "sayım oranla ±1");
  }
  for (const [L, r0] of [[0.3, 2], [0.1, 3], [1, 1.5]]) { const md = K.modes({ L, r0 }), bw = 1.5e9 * Math.sqrt(Math.log(r0) / Math.LN2); abs(K.averageCount({ L, r0 }), bw / (c / (2 * L)), 2e-3, "ortalama sayım"); }
  // uyumluluk: |g1| doğrudan toplamla, kendi taramamızla
  for (const [L, r0, off] of [[0.3, 2, 0], [0.3, 2, 0.5], [1, 4, 0.2]]) {
    const md = K.modes({ L, r0, offset: off }), on = md.list.filter((m) => m.on), g1 = (s) => { let re = 0, im = 0, W = 0; for (const m of on) { const w = m.g - 1; W += w; re += w * Math.cos(2 * Math.PI * m.nu * s / c); im += w * Math.sin(2 * Math.PI * m.nu * s / c); } return Math.hypot(re, im) / W; };
    let s = 0; while (g1(s) > 0.5) s += 1e-5; const Lc = K.coherenceLength(md, L); abs(Lc, s, 2e-5, "uyumluluk uzunluğu");
    abs(g1(2 * L), 1, 1e-9, "2L'de yeniden canlanma");
  }
  ok(K.coherenceLength(K.modes({ L: 0.1, r0: 1.2, offset: 0 }), 0.1) === null, "tek kipte tanımsız");
  // kip kilitleme: FWHM için sin(Nx)/(N sin x) = 1/√2 kökü
  for (const N of [2, 3, 5, 10, 30, 60]) {
    const ml = K.modeLock({ N, locked: true }); near(ml.peakOverMean, N, 1e-9, "tepe/ortalama = N");
    let a = 1e-9, b = Math.PI / N; for (let i = 0; i < 200; i++) { const m = (a + b) / 2; if (Math.sin(N * m) / (N * Math.sin(m)) > Math.SQRT1_2) a = m; else b = m; }
    near(ml.fwhm, 4 * a / (2 * Math.PI), 2e-3, "FWHM kesin kök"); near(ml.sdOverMean, Math.sqrt((2 * N ** 3 + N) / (3 * N * N) - 1), 1e-6, "kilitli std/ortalama");
    if (N >= 10) near(ml.fwhm * N, 0.886, 2e-2, "0,886/N kuralı");
  }
  for (const N of [10, 40]) { let s = 0; const seeds = 200; for (let k = 1; k <= seeds; k++) s += K.modeLock({ N, locked: false, seed: k, samples: 1024 }).sdOverMean ** 2; abs(Math.sqrt(s / seeds), Math.sqrt(1 - 1 / N), 0.03, "rastgele evre std/ortalama"); }
  ok(K.modeLock({ N: 1 }).fwhm === null, "tek kipte darbe yok");
  // Gauss demeti
  for (const [lam, w0] of [[632.8, 0.5], [1064, 0.1], [694.3, 2], [632.8, 0.25]]) {
    const b = K.gaussBeam({ lambdaNm: lam, w0mm: w0 }), zR = Math.PI * (w0 * 1e-3) ** 2 / (lam * 1e-9);
    near(b.zR, zR, 1e-12, "z_R"); near(b.zRm, zR, 3e-3, "ölçülen z_R"); near(b.theta, lam * 1e-9 / (Math.PI * w0 * 1e-3), 3e-3, "ölçülen θ");
    b.zs.forEach((z, i) => near(b.ws[i], w0 * 1e-3 * Math.sqrt(1 + (z / zR) ** 2), 3e-3, "w(z) hiperbolü"));
    const P0 = b.prof[0].reduce((a, v) => a + v, 0); b.prof.forEach((I) => near(I.reduce((a, v) => a + v, 0), P0, 1e-9, "Parseval: güç korunur"));
  }
}
for (const bad of [() => K.photon(-1, 300), () => K.levelSystem({ scheme: 5, W: 1, tauU: 1, tauF: 1 }), () => K.laserTheory({ L: 0.1, R1: 1, R2: 1, Pin: 1 }), () => K.modes({ L: 0, r0: 2 }), () => K.modeLock({ N: 0 }), () => K.gaussBeam({ lambdaNm: 0, w0mm: 1 })]) { assert.throws(bad); checks++; }
console.log(`G ${SLUG}: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  assert(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`, import.meta.url)), "defter dosyası var olmalı"); // defter yazıldı: 404 artık hata sayılır
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
      await page.waitForTimeout(300);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { await page.waitForTimeout(60); const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = async (id, v) => { await page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v)); await page.waitForTimeout(120); };
      const click = async (id) => { await page.click("#" + id); await page.waitForTimeout(150); };
      const noOverflow = async (label) => ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "yatay taşma yok: " + label);
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("main input,main select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id));
      ok(unlabeled.length === 0, "etiketsiz denetim: " + unlabeled.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-6; })), "varsayılanlar adım ızgarasında");
      ok(await page.evaluate(() => Object.isFrozen(window.LaserLab) && !Object.getOwnPropertyDescriptor(window, "LaserLab").writable), "çekirdek dondurulmuş (tarayıcı)");
      if (process.argv.includes("--dump") && width === 1280) {
        for (const t of ["ein", "inv", "cav", "mode"]) { await click("tab-" + t); console.log("== " + t, JSON.stringify(await page.evaluate((t) => Object.fromEntries([...document.querySelectorAll(`#panel-${t} strong[id], #panel-${t} output, #panel-${t} .lz-status`)].map((e) => [e.id, e.textContent])), t), null, 1)); }
        await click("tab-ein");
      }
      // 1 · Einstein
      ok((await page.locator("#panel-ein").textContent()).includes("turuncu noktalar onsuz"), "tayf açıklaması iki nokta takımını anlatıyor");
      await has("einLamOut", "632,8 nm"); await has("einTOut", "3000 K"); await has("einX", "7,578"); await has("einMeas", "5,114 × 10⁻⁴"); await has("einBoltz", "5,114 × 10⁻⁴"); await has("einDiff", "0,00 %"); await has("einRelax", "0,9990 τ");
      await page.click("#einStim"); await page.waitForTimeout(150); await has("einDiff", "+0,05 %"); await has("einStatus", "B₂₁ kapalı");
      await click("einMicro"); await has("einLamOut", "1,000 mm"); await has("einStatus", "B₂₁ kapalı"); ok(/^\+[0-9]/.test(await read("einDiff")) && parseFloat((await read("einDiff")).replace(/[^0-9,]/g, "").replace(",", ".")) > 1000, "mikrodalgada büyük sapma");
      await click("einXray"); await has("einMeas", "alt taşma"); await has("einDiff", "—"); await has("einScale", "2,53 × 10⁸");
      await click("einSun"); await has("einTOut", "5800 K"); await has("einLamOut", "500,0 nm");
      await click("einReset"); await has("einDiff", "0,00 %"); ok(await page.locator("#einStim").isChecked(), "B21 yeniden açık"); await noOverflow("einstein");
      // 2 · Terslenme
      await click("tab-inv"); await has("invTauUOut", "3,00 ms"); await has("invTauFOut", "50,0 ns"); await has("invWOut", "501 s⁻¹");
      await has("invThrMeas", "333,4 s⁻¹"); await has("invThrTh", "333,4 s⁻¹"); await has("invFrac", "50,000 %"); await has("invMeas", "0,2010"); await has("invStatus", "yarıdan fazlasını");
      await range("invW", 2); await has("invStatus", "eşiğin altında"); ok((await read("invMeas")).startsWith("−"), "eşik altı ΔN < 0");
      await click("invYag"); await has("invTauUOut", "230 µs"); await has("invThrTh", "0,2944 s⁻¹"); await has("invThrMeas", "0,2944 s⁻¹"); await has("invStatus", "Dört düzey");
      await range("invE", 0); await has("invStatus", "Dört düzey"); await has("invThrTh", "4349 s⁻¹");
      await click("invTwo"); await has("invThrTh", "yok"); await has("invStatus", "İki düzey"); ok((await read("invMeas")).startsWith("−"), "iki düzey ΔN < 0");
      await range("invTauU", -7); await range("invTauF", -6); await page.locator("#invScheme").selectOption("3"); await page.waitForTimeout(200); await has("invStatus", "hiçbir pompa");
      await click("invReset"); await has("invThrMeas", "333,4"); ok(await page.locator("#invEField").isHidden(), "ΔE alanı yalnız 4 düzeyde"); await noOverflow("terslenme");
      // 3 · Rezonatör
      await click("tab-cav"); await page.waitForTimeout(400); await has("cavTauc", "13,0 ns"); await has("cavR", "5,107"); await has("cavNth", "9,160 × 10¹⁴"); await has("cavP", "3,05 W"); await has("cavF", "186 kHz"); await has("cavFDiff", "0,0"); await has("cavD", "50,1 µs");
      await has("cavThMeas", "979 mW"); await has("cavSlope", "75,94 %"); await has("cavStatus", "Lazer çalışıyor");
      await click("cavNear"); await has("cavPinOut", "1,2 W"); await has("cavR", "1,226"); ok((await read("cavF")) !== "—", "eşiğe yakın frekans ölçüldü");
      await click("cavLossy"); await has("cavR2Out", "0,800"); await has("cavStatus", "Eşiğin altında"); await has("cavP", "≈ 0"); await has("cavF", "—");
      await range("cavPin", 20); await has("cavStatus", "Lazer çalışıyor");
      await click("cavReset"); await click("cavLong"); await has("cavLOut", "1,00 m"); await has("cavTauc", "130 ns");
      await range("cavR1", 0.9); await range("cavR2", 0.5); await range("cavAlpha", 0.5); await has("cavSweepStatus", "doğru uydurulamıyor"); await has("cavThMeas", "—");
      await range("cavPin", 0); await has("cavStatus", "Eşiğin altında");
      await click("cavReset"); await has("cavP", "3,05 W"); await noOverflow("rezonatör");
      // 4 · Kipler
      await click("tab-mode"); await has("modeFsr", "500 MHz"); await has("modeCount", "3"); await has("modeRatio", "3,002"); await has("modeAvg", "3,00"); await has("modeLc", "153 mm"); await has("lockPk", "10,00"); await has("lockW", "178 ps"); await has("beamThTh", "0,4029 mrad"); await has("beamZrTh", "1,241 m");
      await click("modeHalf"); await has("modeCount", "4"); await click("modeShort"); await has("modeFsr", "1,50 GHz");
      await range("modeOff", 0); await range("modeG", 1.2); await has("modeCount", "1"); await has("modeLc", "sınırsız");
      await range("modeG", 1); await has("modeCount", "0"); await has("modeStatus", "Hiçbir kip");
      await page.locator("#lockPhase").selectOption("random"); await page.waitForTimeout(200); await has("lockW", "—"); await has("lockStatus", "Rastgele"); const r1 = await read("lockSd"); await click("lockSeed"); await has("lockStatus", "tohum 2"); ok((await read("lockSd")) !== r1, "yeni tohum");
      await range("lockN", 1); await has("lockStatus", "Tek kip"); await range("lockN", 60);
      await page.locator("#beamLam").selectOption("1064"); await range("beamW0", 0.1); await page.waitForTimeout(200); await has("beamThTh", "3,387 mrad");
      await click("modeReset"); await has("modeCount", "3"); await has("lockW", "178 ps"); await noOverflow("kipler");
      // oyuncağın N'i rezonatörden bağımsız: not görünür, "Rezonatörden al" N'yi sayılan kipe eşitler
      await has("lockStatus", "bu rezonatörde 3 kip salınıyor"); await has("lockFromCavity", "N = 3"); await click("lockFromCavity"); await has("lockNOut", "3"); await has("lockPk", "3,00"); ok(!(await read("lockStatus")).includes("Not:"), "N = sayılan kip iken not yok");
      await range("modeG", 1); await has("modeCount", "0"); ok(await page.locator("#lockFromCavity").isDisabled(), "kip yokken düğme kapalı"); await click("modeReset"); await has("lockNOut", "10");
      // klavye: sekmeler ve R kısayolu
      await page.locator("#tab-mode").focus(); await page.keyboard.press("Home"); ok((await page.locator("#tab-ein").getAttribute("aria-selected")) === "true", "Home");
      await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-inv").getAttribute("aria-selected")) === "true", "ArrowRight");
      await page.keyboard.press("End"); ok((await page.locator("#tab-mode").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("ArrowLeft"); ok((await page.locator("#tab-cav").getAttribute("aria-selected")) === "true", "ArrowLeft");
      await range("cavR2", 0.8); await page.locator("h1").click(); await page.keyboard.press("r"); await page.waitForTimeout(200); await has("cavR2Out", "0,950");
      await page.locator("#cavL").focus(); await page.keyboard.press("r"); await page.waitForTimeout(100); await has("cavLOut", "0,10 m");
      { const dg = await page.evaluate(async () => { for (let i = 0; i < 50 && !document.querySelector(".digest"); i++) await new Promise((r) => setTimeout(r, 100)); const el = document.querySelector(".digest"); if (!el) return null; el.scrollIntoView(); const r = el.getBoundingClientRect(); return { h: r.height, text: el.textContent }; });
        ok(dg && dg.h > 200 && dg.text.includes("Einstein") && dg.text.includes("Maiman"), "Keşif Defteri yüklendi ve görünür"); }
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); server.close(); }
}
