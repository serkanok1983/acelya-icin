// G · bilimsel-yontem-olcme-ve-belirsizlik.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// verniye çakışmasının kaba kuvvetle bulunması, el ile yazılmış anlamlı basamak tablosu, düzgün dağılımlı
// girdilerle bağımsız Monte Carlo, Simpson integraliyle normal ve χ² olasılıkları, analitik ikinci türevler,
// χ²'nin sayısal en küçüklenmesi ve sayısal Hessian'ı, işaret dizilerinin bütün diziliş sayımı.
// Kullanım: node scripts/check-g-bilimsel-yontem-olcme-ve-belirsizlik.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "bilimsel-yontem-olcme-ve-belirsizlik";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.MeasureLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
assert(!/fonts\.googleapis|atlas\.css|atlas\.js|cdn\./.test(html), "atlas dosyası, Google Fonts ya da CDN yok"); checks++;
ok(/data-page="bilimsel-yontem-olcme-ve-belirsizlik"/.test(html) && /href="bilim-atlasi\.html"/.test(html), "slug ve Bilim Atlası bağlantısı");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");

// Bağımsız üreteç (LCG) ve normal sayılar
function lcg(seed) { let s = BigInt(seed); return () => { s = (s * 6364136223846793005n + 1442695040888963407n) & ((1n << 64n) - 1n); return Number(s >> 11n) / 2 ** 53; }; }
function normals(r) { return () => { let u = r(); while (u === 0) u = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r()); }; }

/* ── 1 · Ölçek okuma ── */
{
  const r = lcg(7);
  for (let t = 0; t < 3000; t++) { // verniye: çakışan çizgiyi kaba kuvvetle bul
    const x = 10 + 80 * r();
    let best = 0, bd = Infinity;
    for (let j = 0; j <= 10; j++) { const pos = x + 0.9 * j, d = Math.abs(pos - Math.round(pos)); if (d < bd) { bd = d; best = j; } }
    const reading = Math.round(x + 0.9 * best) - 0.9 * best; // çakışan çizgi m'deyse sıfır m − 0,9j'dedir
    const k = K.readScale(x, 0.1).value;
    if (Math.abs(x * 10 - Math.round(x * 10)) < 0.499) abs(k, reading, 1e-9, "verniye okuması");
  }
  for (const [inst, k] of [["ruler", 1], ["ruler", 2], ["ruler", 5], ["ruler", 10], ["vernier", 1], ["burette", 1], ["burette", 2], ["burette", 5]]) {
    const B = K.readingBatch(inst, k, 3, 20000), a = B.r / 2;
    ok(B.maxAbs <= a * (1 + 1e-9), `${inst} k=${k} max ≤ a`); near(B.maxAbs, a, 0.002, "max → a");
    near(B.rms, a / Math.sqrt(3), 0.02, `${inst} k=${k} RMS → a/√3`); abs(B.fracU, 1 / Math.sqrt(3), 0.012, "|e| ≤ u oranı"); ok(B.frac2U === 1, "2u kapsar"); abs(B.mean, 0, 4 * B.u / Math.sqrt(B.N), "ortalama 0");
  }
  const B0 = K.readingBatch("ruler", 1, 1, 400);
  near(B0.rms, 0.28411578748035393, 1e-12, "varsayılan RMS"); near(B0.fracU, 0.58, 1e-12); near(K.trueValue("ruler", 1, 0), 214.44771523587406, 1e-12);
  assert.throws(() => K.resolution("vernier", 2)); checks++;
}

/* ── 1 · Anlamlı basamaklar ── */
for (const [s, sf, lp, amb] of [["3,4", 2, -1, false], ["2,157", 4, -3, false], ["0,00340", 3, -5, false], ["1200", 2, 2, true], ["1200,", 4, 0, false], ["100,0", 4, -1, false], ["0,5", 1, -1, false], ["6,02e23", 3, 21, false], ["−12,30", 4, -2, false], ["7", 1, 0, false], ["1.20e-3", 3, -5, false]]) {
  const m = K.parseMeasured(s); ok(m && m.sf === sf && m.lastPlace === lp && m.ambiguous === amb, `ayrıştır ${s} → ${JSON.stringify(m)}`);
}
ok(K.parseMeasured("abc") === null && K.parseMeasured("") === null && K.parseMeasured(",") === null, "geçersiz girdi");
for (const [y, u, ty, tu, tp] of [[7.3338, 0.0622749, 7.334, 0.062, -3], [9.81065, 0.0995, 9.81, 0.1, -2], [400, 10.36, 400, 10, 0], [123.4567, 0.0288675, 123.457, 0.029, -3], [1234.5, 456, 1230, 460, 1]]) {
  const g = K.gumReport(y, u); abs(g.y, ty, 1e-9 * Math.abs(ty) + 1e-12, "rapor y"); abs(g.u, tu, 1e-12 + 1e-9 * tu, "rapor u"); ok(g.place === tp, `basamak ${g.place} ≠ ${tp}`);
}
{ // 3,4 × 2,157: düzgün dağılımlı örtük girdilerle bağımsız Monte Carlo
  const R = K.sigFigCalc("mul", "3,4", "2,157"); near(R.raw, 7.3338, 1e-12); near(R.rule, 7.3, 1e-12); ok(R.gum.place === -3 && R.ruleMinusGum === 2, "kural 2 basamak eksik");
  const r = lcg(11); let s = 0, s2 = 0; const M = 400000;
  for (let i = 0; i < M; i++) { const v = (3.35 + 0.1 * r()) * (2.1565 + 0.001 * r()); s += v; s2 += v * v; }
  near(Math.sqrt(s2 / M - (s / M) ** 2), R.u, 0.01, "çarpımın SD'si");
  const D = K.sigFigCalc("sub", "10,03", "10,01"); near(D.u, Math.sqrt(2) * 0.005 / Math.sqrt(3), 1e-12); near(D.rel, 0.2041241452, 1e-8);
  const S = K.sigFigCalc("add", "123,4", "0,0567"); ok(S.ruleP === -1 && Math.abs(S.rule - 123.5) < 1e-9, "toplama kuralı");
  const Q = K.sigFigCalc("div", "1200", "3,0"); ok(Q.A.ambiguous && Q.ruleP === 1, "1200 belirsiz");
  const E = K.sigFigCalc("mul", "9,96", "1,0"); ok(Math.abs(E.rule - 10) < 1e-9 && E.ruleP === 0, "9,96 × 1,0 → 10");
  const X = K.excessDigits("7,3338", R.u); ok(X.excess === 1, "7,3338 bir basamak fazla"); ok(K.excessDigits("7,33", R.u).excess === -1, "7,33 bir basamak eksik");
}

/* ── 1 · Yuvarlama ── */
for (const [n, up, ev] of [[235, 24, 24], [245, 25, 24], [255, 26, 26], [250, 25, 25], [249, 25, 25], [241, 24, 24], [995, 100, 100], [105, 11, 10]]) ok(K.roundHalfUpInt(n) === up && K.roundHalfEvenInt(n) === ev, `yuvarla ${n}`);
{
  let su = 0, se = 0; for (let n = 100; n <= 999; n++) { su += 10 * K.roundHalfUpInt(n) - n; se += 10 * K.roundHalfEvenInt(n) - n; }
  near(su / 900 / 100, 0.005, 1e-12, "tam sayım: yukarı kayma"); abs(se / 900 / 100, 0, 1e-12, "tam sayım: çifte kayma 0");
  const B = K.roundingBatch(200000, "uniform", 5); abs(B.biasUp, 0.005, 4 * B.seUp, "yukarı"); abs(B.biasEven, 0, 4 * B.seEven, "çifte");
  const T = K.roundingBatch(5000, "ties", 2); near(T.biasUp, 0.05, 1e-12, "hep yarı: +0,05"); abs(T.biasEven, 0, 4 * 0.05 / Math.sqrt(5000));
  const D = K.roundingBatch(1000, "uniform", 1); near(D.sumRaw, 5421.09, 1e-9); near(D.sumUp, 5426.2, 1e-9); near(D.sumEven, 5420.5, 1e-9);
}

/* ── Olasılık işlevleri: Simpson integrali ── */
function simpson(f, a, b, n = 20000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; }
for (const z of [-3, -1.96, -0.5, 0, 0.7, 2.5]) near(K.normCdf(z), 0.5 + Math.sign(z) * simpson((t) => Math.exp(-t * t / 2) / Math.sqrt(2 * Math.PI), 0, Math.abs(z)), 3e-7, `Φ(${z})`);
for (const [x2, nu] of [[5.3213, 10], [63.9, 10], [3.2, 1.5], [0.4, 3], [30, 25]]) {
  const pdf = (t) => Math.exp((nu / 2 - 1) * Math.log(t) - t / 2 - (nu / 2) * Math.LN2 - K.lnGamma(nu / 2));
  near(K.chi2Q(x2, nu), simpson(pdf, x2, x2 + 400, 400000), 2e-6, `Q(χ²=${x2}, ν=${nu})`);
}

/* ── 2 · Yayılım ── */
{
  const L = K.linearProp("pendulum", [1, 2.006], [0.002, 0.005]);
  const g = 4 * Math.PI ** 2 / 2.006 ** 2; near(L.y, g, 1e-12); near(L.uc, g * Math.hypot(0.002, 2 * 0.005 / 2.006), 1e-10, "sarkaç u_c");
  near(L.shift, 0.5 * (6 * g / 2.006 ** 2) * 0.005 ** 2, 1e-4, "ikinci mertebe kayma (analitik g_TT = 6g/T²)");
  const D = K.linearProp("density", [52.3, 2.5, 4], [0.1, 0.02, 0.02]), rho = 4 * 52.3 / (Math.PI * 6.25 * 4);
  near(D.uc, rho * Math.hypot(0.1 / 52.3, 2 * 0.02 / 2.5, 0.02 / 4), 1e-10, "yoğunluk");
  for (const r of [-0.9, 0, 0.5, 0.9]) near(K.linearProp("diff", [10.03, 10.01], [0.02, 0.03], r).uc, Math.sqrt(0.02 ** 2 + 0.03 ** 2 - 2 * r * 0.02 * 0.03), 1e-12, "fark r");
  near(K.linearProp("area", [12, 8], [0.3, 0.3], 0.5).uc, Math.sqrt((8 * 0.3) ** 2 + (12 * 0.3) ** 2 + 2 * 0.5 * 8 * 12 * 0.09), 1e-12, "alan korelasyon");
  near(K.linearProp("inverse", [0.5], [0.2]).shift, 0.04 / 0.125, 1e-4, "1/x kayma u²/x³");
  near(K.crossProb("inverse", [0.5], [0.2]), simpson((t) => Math.exp(-t * t / 2) / Math.sqrt(2 * Math.PI), 2.5, 12), 1e-6, "sıfırı geçme");
  // bağımsız Monte Carlo (LCG + Box–Muller) ile karşılaştırma
  const rr = normals(lcg(99)), M = 200000, ys = new Float64Array(M);
  for (let i = 0; i < M; i++) { const Lv = 1 + 0.002 * rr(), Tv = 2.006 + 0.005 * rr(); ys[i] = 4 * Math.PI ** 2 * Lv / (Tv * Tv); }
  const mean = ys.reduce((a, b) => a + b, 0) / M, sd = Math.sqrt(ys.reduce((a, b) => a + (b - mean) ** 2, 0) / (M - 1));
  const mc = K.monteCarlo("pendulum", [1, 2.006], [0.002, 0.005], 0, 200000, 4);
  abs(mc.mean, mean, 4 * sd / Math.sqrt(M) * Math.SQRT2, "MC ortalaması"); near(mc.sd, sd, 0.01, "MC SD");
  const md = K.monteCarlo("diff", [10.03, 10.01], [0.02, 0.02], 0.9, 200000, 2), ud = Math.sqrt(0.0008 - 2 * 0.9 * 0.0004);
  near(md.sd, ud, 0.01, "korelasyonlu fark"); abs(md.lo95, 0.02 - 1.959964 * ud, 0.03 * ud); abs(md.hi95, 0.02 + 1.959964 * ud, 0.03 * ud);
  const mi = K.monteCarlo("inverse", [0.5], [0.2], 0, 100000, 1); abs(mi.flipFrac, 0.00621, 0.0012, "işaret değiştiren oran");
  abs(mi.lo95, 1 / (0.5 + 2.07942 * 0.2), 0.01, "1/x alt yüzdelik: P(x<0) + P(x > 1/y) = 0,025, z(0,98121) = 2,0794");
  const md0 = K.monteCarlo("pendulum", [1, 2.006], [0.002, 0.005], 0, 100000, 1);
  near(md0.sd, 0.05254515079611387, 1e-9, "varsayılan MC SD"); near(md0.lo95, 9.708695726475327, 1e-9);
  assert.throws(() => K.linearProp("pendulum", [1, 2], [-1, 0])); assert.throws(() => K.monteCarlo("diff", [1, 1], [1, 1], 1, 100, 1)); checks += 2;
}

/* ── 3 · Sistematik ve rastgele ── */
{
  const S = K.measureSeries({ b: 0.3, s: 1.006, sigma: 0.5, seed: 1 }); S.add(40000); const st = S.stats();
  near(S.bias, 0.3 + 0.006 * S.X0, 1e-12); abs(st.errX, S.bias, 4 * 0.5 / 200, "ortalama → sistematik"); near(st.sdX, 0.5, 0.02, "SD → σ"); near(st.semX, st.sdX / 200, 1e-12);
  const Z = K.measureSeries({ b: -0.4, s: 1, sigma: 0, seed: 3 }); Z.add(10); ok(Math.abs(Z.stats().errX + 0.4) < 1e-9 && Z.stats().sdX < 1e-9, "gürültüsüz: hata = b");
  // iki noktalı kalibrasyonun bağımsız benzetimi
  const rr = normals(lcg(5)), X = 54.53, res = [];
  for (let t = 0; t < 4000; t++) { let m1 = 0, m2 = 0; for (let i = 0; i < 20; i++) { m1 += 0.3 + 1.006 * 10 + 0.5 * rr(); m2 += 0.3 + 1.006 * 90 + 0.5 * rr(); } m1 /= 20; m2 /= 20; const sh = (m2 - m1) / 80, bh = m1 - sh * 10; res.push((0.3 + 1.006 * X - bh) / sh - X); }
  const rm = res.reduce((a, b) => a + b, 0) / res.length, rs = Math.sqrt(res.reduce((a, b) => a + (b - rm) ** 2, 0) / (res.length - 1));
  near(K.calUncertainty(0.5, 1.006, X), rs, 0.04, "u_kal"); abs(rm, 0, 4 * rs / Math.sqrt(4000));
  const ks = []; for (let sd = 1; sd <= 1500; sd++) ks.push(K.residualBias(0.3, 1.006, X, K.calibrate(0.3, 1.006, 0.5, sd)));
  const km = ks.reduce((a, b) => a + b, 0) / ks.length; near(Math.sqrt(ks.reduce((a, b) => a + (b - km) ** 2, 0) / (ks.length - 1)), rs, 0.06, "çekirdeğin kalibrasyonu da aynı saçılımda");
  const C = K.calibrate(0.3, 1.006, 0, 1); near(C.sHat, 1.006, 1e-12); near(C.bHat, 0.3, 1e-10); abs(K.residualBias(0.3, 1.006, X, C), 0, 1e-10, "gürültüsüz kalibrasyon kusursuz");
  const D = K.measureSeries({ b: 0.3, s: 1.006, sigma: 0.5, seed: 1 }); near(D.X0, 54.52966755256057, 1e-12); near(D.bias, 0.6271780053153637, 1e-12);
}

/* ── 4 · Uydurma ── */
function nelder(f, x0, step) { // bağımsız en küçükleme: Nelder–Mead
  const n = x0.length; let P = [x0.slice()]; for (let i = 0; i < n; i++) { const p = x0.slice(); p[i] += step[i]; P.push(p); }
  let F = P.map(f);
  for (let it = 0; it < 20000; it++) {
    const idx = F.map((v, i) => i).sort((a, b) => F[a] - F[b]); P = idx.map((i) => P[i]); F = idx.map((i) => F[i]);
    if (Math.abs(F[n] - F[0]) < 1e-15 * (1 + Math.abs(F[0]))) break;
    const c = new Array(n).fill(0); for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) c[j] += P[i][j] / n;
    const tr = (t) => c.map((v, j) => v + t * (P[n][j] - v));
    const xr = tr(-1), fr = f(xr);
    if (fr < F[0]) { const xe = tr(-2), fe = f(xe); [P[n], F[n]] = fe < fr ? [xe, fe] : [xr, fr]; }
    else if (fr < F[n - 1]) { P[n] = xr; F[n] = fr; }
    else { const xc = tr(0.5), fc = f(xc); if (fc < F[n]) { P[n] = xc; F[n] = fc; } else { for (let i = 1; i <= n; i++) { P[i] = P[i].map((v, j) => P[0][j] + 0.5 * (v - P[0][j])); F[i] = f(P[i]); } } }
  }
  return P[0];
}
function hessInvDiag(f, p, h) { // sayısal Hessian'ın tersinin köşegeni × 2 = parametre varyansı
  const n = p.length, H = [];
  for (let i = 0; i < n; i++) { H.push([]); for (let j = 0; j < n; j++) { const e = (a, b) => { const q = p.slice(); q[i] += a; q[j] += b; return f(q); }; H[i].push((e(h[i], h[j]) - e(h[i], -h[j]) - e(-h[i], h[j]) + e(-h[i], -h[j])) / (4 * h[i] * h[j])); } }
  const A = H.map((r, i) => r.map((v) => v / 2).concat(H.map((_, k) => (k === i ? 1 : 0))));
  for (let c = 0; c < n; c++) { const d = A[c][c]; for (let k = 0; k < 2 * n; k++) A[c][k] /= d; for (let r = 0; r < n; r++) if (r !== c) { const m = A[r][c]; for (let k = 0; k < 2 * n; k++) A[r][k] -= m * A[c][k]; } }
  return A.map((r, i) => r[n + i]);
}
for (const [law, model, noise, lev] of [["lin", "lin", "abs", 1], ["quad", "lin", "abs", 1], ["quad", "quad", "abs", 1], ["pow", "loglog", "rel", 5], ["lin", "quad", "abs", 2]]) {
  const d = K.genData(law, 12, noise, lev, 1), F = K.fitModel(model, d.x, d.y, d.s);
  const chi = (p) => d.x.reduce((t, x, i) => { const f = model === "lin" ? p[0] + p[1] * x : model === "quad" ? p[0] + p[1] * x + p[2] * x * x : p[0] + p[1] * Math.log(x); const yy = model === "loglog" ? Math.log(d.y[i]) : d.y[i], ss = model === "loglog" ? d.s[i] / d.y[i] : d.s[i]; return t + ((yy - f) / ss) ** 2; }, 0);
  const start = model === "loglog" ? [0, 1] : model === "quad" ? [0, 0, 0] : [0, 1];
  const p = nelder(chi, start, start.map(() => 0.5));
  const kp = model === "loglog" ? [F.lnA, F.params[1]] : F.params;
  kp.forEach((v, i) => abs(v, p[i], 1e-5 * (1 + Math.abs(v)), `${law}/${model} parametre ${i}`));
  near(F.chi2, chi(p), 1e-7, "χ² minimumu");
  const v = hessInvDiag(chi, p, p.map((x) => 1e-3 * (1 + Math.abs(x))));
  const ks = model === "loglog" ? [F.sig[0] / F.params[0], F.sig[1]] : F.sig;
  ks.forEach((s, i) => near(s, Math.sqrt(v[i]), 1e-4, `${law}/${model} σ ${i}`));
}
{ // işaret dizisi testi: bütün dizilişlerin tam sayımı (n+ = 6, n− = 5)
  const n = 11, list = []; for (let m = 0; m < 1 << n; m++) { let c = 0; for (let i = 0; i < n; i++) if (m >> i & 1) c++; if (c === 6) list.push(m); }
  let s = 0, s2 = 0; for (const m of list) { let runs = 1; for (let i = 1; i < n; i++) if ((m >> i & 1) !== (m >> (i - 1) & 1)) runs++; s += runs; s2 += runs * runs; }
  const R = K.runsTest([1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1]); near(R.expected, s / list.length, 1e-12, "E[runs]"); near(R.sd ** 2, s2 / list.length - (s / list.length) ** 2, 1e-12, "Var[runs]"); ok(R.runs === 2, "2 dizi");
}
{
  const P = K.pullScan("lin", "lin", "abs", 1, 1, 12, 1, 2000); abs(P.coverage, 0.6827, 0.035, "kapsama"); near(P.sd / P.meanSig, 1, 0.05, "SD/σ"); abs(P.meanChi2nu, 1, 0.03);
  const P2 = K.pullScan("lin", "lin", "abs", 1, 0.5, 12, 1, 500); abs(P2.meanChi2nu, 4, 0.2, "küçük beyan χ²/ν ≈ 4");
  const P3 = K.pullScan("pow", "loglog", "rel", 5, 1, 12, 1, 1000); abs(P3.mean, 1.5, 0.004, "üs"); abs(P3.coverage, 0.6827, 0.05);
  const W = K.genData("quad", 12, "abs", 1, 1), FW = K.fitModel("lin", W.x, W.y, W.s); ok(FW.chi2 / FW.nu > 5 && K.runsTest(FW.res).z < -2, "yanlış model yapılı artık");
  const Lg = K.fitModel("loglog", [1, 2, 3, 4], [1, -1, 2, 3], [1, 1, 1, 1]); ok(Lg.undefinedLog === 1, "y ≤ 0'da log tanımsız");
  const d = K.genData("lin", 12, "abs", 1, 1), f = K.fitModel("lin", d.x, d.y, d.s); near(f.params[1], 1.8922048635896338, 1e-12); near(f.chi2, 5.321287962374046, 1e-10);
}
for (const bad of [() => K.readingBatch("ruler", 3, 1), () => K.genData("lin", 2, "abs", 1, 1), () => K.measureSeries({ b: 0, s: 0, sigma: 1, seed: 1 }), () => K.roundingBatch(10, "x", 1)]) { assert.throws(bad); checks++; }
console.log(`G ölçme-belirsizlik: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

/* ── Tarayıcı ── */
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
      page.setDefaultTimeout(15000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const fill = async (id, v) => { await page.fill("#" + id, v); };
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.getAttribute("aria-label")).map((e) => e.id));
      ok(unlabeled.length === 0, "etiketsiz denetim: " + unlabeled.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      // 1
      await has("scR", "1 mm"); await has("scU", "0,29 mm"); await has("scTrue", "gizli"); await has("bRms", "0,284 mm"); await has("bFu", "58,0 %");
      await fill("scUser", "214,5"); await page.click("#scCheck"); await has("scTrue", "214,448 mm"); await has("scSim", "214 mm"); await has("scYou", "+0,05 mm"); await has("scStatus", "1 ondalık fazla");
      await sel("scInst", "vernier"); ok(await page.locator("#scK").isDisabled(), "verniyede k kilitli"); await has("scR", "0,1 mm"); await has("scTrue", "gizli");
      await sel("scInst", "burette"); await sel("scK", "2"); await has("scR", "0,05 mL"); await has("scU", "0,0144 mL");
      await page.click("#sfP3"); await has("sfGum", "0,0200 ± 0,0041"); await has("sfRule", "0,02");
      await page.click("#sfP4"); await has("sfStatus", "belirsiz");
      await page.click("#sfP1"); await has("sfGum", "7,334 ± 0,062"); await has("sfCmp", "kural 2 basamak eksik"); await has("sfRep", "1 basamak fazla");
      await fill("sfRepIn", "7,334"); await has("sfRep", "uygun"); await fill("sfA", "x"); await has("sfStatus", "İki kutuya");
      await sel("rdMode", "ties"); await has("rdUp", "+0,05000"); await range("rdN", 10000); await has("rdNv", "10 000");
      await page.locator("h1").click(); await page.keyboard.press("r");
      ok((await page.locator("#scInst").inputValue()) === "ruler" && (await page.locator("#rdMode").inputValue()) === "uniform", "R sıfırlar (1)");
      await has("rdSumUp", "5426,2"); await has("sfGum", "7,334 ± 0,062"); await has("scTrue", "gizli");
      // klavye
      await page.locator("#tab-read").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-fit").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-prop").getAttribute("aria-selected")) === "true", "ArrowRight");
      // 2
      await has("prY", "9,8107 m/s²"); await has("prUc", "0,0527"); await has("prMcSd", "0,0525"); await has("prMc95", "[9,7087; 9,9150]"); await has("prStatus", "uyumlu");
      await page.click("#prEdge"); await has("prMcMean", "tanımsız"); await has("prStatus", "tanımsız");
      await page.click("#prSafe"); await has("prY", "0,2000"); ok(!(await read("prMcMean")).includes("tanımsız"), "güvenli 1/x tanımlı"); await has("prStatus", "u_c yeterli, simetrik aralık değil"); await has("prStatus", "sağa çarpık");
      await page.click("#prCorr"); await has("prUc", "0,00894"); await has("prROut", "0,90");
      await sel("prFormula", "density"); await has("prY", "2,6636"); ok(await page.locator("#prRField").isHidden(), "3 girdide korelasyon yok");
      await fill("prU1", "-1"); await page.waitForTimeout(100); await has("prStatus", "okunamadı");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("prY", "9,8107"); ok((await page.locator("#prFormula").inputValue()) === "pendulum", "R sıfırlar (2)");
      // 3
      await page.click("#tab-sys"); await page.waitForTimeout(700); ok(Number((await read("syN")).replace(/\D/g, "")) > 10, "ölçüm ilerliyor");
      await page.click("#syRun"); ok((await read("syRun")) === "Devam et", "duraklat");
      await has("syErrE", "+0,6272"); await has("syMeanE", "54,530");
      await sel("sySpeed", "10000"); await page.click("#syRun"); await page.waitForFunction(() => +document.getElementById("syN").textContent.replace(/\D/g, "") > 20000, null, { timeout: 30000 }); checks++;
      const errTxt = await read("syErr"); ok(Math.abs(parseFloat(errTxt.replace("−", "-").replace(",", ".")) - 0.6272) < 0.02, "uzun ortalama sistematik hataya yakınsar " + errTxt);
      await page.click("#syCal"); ok(await page.locator("#syCalStats").isVisible(), "kalibrasyon kartları"); await has("syCr", "−0,0159"); await has("syN", "0");
      await page.click("#syUncal"); ok(await page.locator("#syCalStats").isHidden(), "kalibrasyon kalktı");
      await range("syNoise", 0); await page.click("#syAdd100"); await has("sySd", "0,000"); await has("syRand", "0,0000 mm"); ok(!(await read("syRand")).startsWith("−"), "işaretsiz sıfır");
      await page.locator("h1").click(); await page.keyboard.press(" "); await page.keyboard.press("r"); ok((await page.locator("#syNoise").inputValue()) === "0.5" && (await read("syRun")) === "Duraklat", "R sıfırlar (3)");
      // 4
      await page.click("#tab-fit"); await has("ftP1", "1,89 ± 0,10"); await has("ftChi", "0,53"); await has("ftStatus", "kabul edilebilir");
      await page.click("#ftPre2"); await has("ftStatus", "Model yanlış"); await has("ftChi", "6,39");
      await page.click("#ftPre3"); await has("ftP1", "1,477 ± 0,021"); await has("ftStatus", "gerçek 1,5");
      await page.click("#ftPre4"); await has("ftChi", "2,13"); await has("ftStatus", "Sınırda"); await page.click("#ftScan"); ok(await page.locator("#ftScanStats").isVisible(), "tarama"); await has("ftSc2", "3,99");
      await page.click("#ftPre3"); await sel("ftNoise", "abs"); await range("ftSigma", 5); await range("ftN", 60); await page.fill("#ftSeed", "3"); await page.locator("#ftSeed").dispatchEvent("change");
      await sel("ftLaw", "lin"); await sel("ftNoise", "abs"); await range("ftSigma", 5); await sel("ftModel", "loglog");
      const lg = await read("ftStatus"); ok(/tanımsız|log–log/.test(lg), "log–log sınır: " + lg);
      await range("ftN", 5); await sel("ftModel", "quad"); ok((await read("ftChiE")).includes("ν = 2"), "N = 5, parabol ν = 2");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("ftP1", "1,89 ± 0,10"); ok((await page.locator("#ftModel").inputValue()) === "lin", "R sıfırlar (4)");
      ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      ok(await page.evaluate(() => Object.isFrozen(MeasureLab) && !Object.getOwnPropertyDescriptor(window, "MeasureLab").writable), "çekirdek salt okunur");
      ok(await page.locator(".digest").first().isVisible(), "Keşif Defteri görünür");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G ölçme-belirsizlik: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
