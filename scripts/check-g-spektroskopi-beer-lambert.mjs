// G · spektroskopi-beer-lambert.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// fotonu dilim dilim Bernoulli denemeleriyle izleyen ayrı bir benzetim (64 bit LCG), üstel sınır exp(−ln10·εcl),
// eğimli bant için Simpson integrali, dimer dengesinin K ve kütle denkliğiyle sınanması, Cramer kuralıyla normal
// denklemler, kalibrasyon belirsizliğinin gerçek σ ile kapalı biçimi, A = 1/ln10 türev koşulu, D65 beyaz noktası
// (0,3127; 0,3290), 2×2 tekil değerlerin kuvvet yinelemesiyle bulunması, NIST spektrumlarından okunan tepe yerleri,
// harmonik düzeylerin ω(v + ½) kapalı biçimi ve Morse düzeylerinin analitik formülü.
// Kullanım: node scripts/check-g-spektroskopi-beer-lambert.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "spektroskopi-beer-lambert";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.SpectroLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };

/* ── Kabuk ── */
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Spektroskopi ve Beer–Lambert Yasası: ") && [...title].length <= 80, "başlık biçimi ve ≤ 80 karakter");
ok(/<body class="app-page" data-page="spektroskopi-beer-lambert">/.test(html) && /name="description"/.test(html), "kabuk");
ok(/shared\/theme\.css/.test(html) && /shared\/app\.js/.test(html), "theme.css ve app.js");
ok(!/fonts\.googleapis|cdn\.|unpkg|jsdelivr|<script src="http/.test(html), "CDN yok");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}☀-➿]/u.test(html), "emoji yok");
ok(!/type="number"/.test(html), "type=number yok");

function lcg(seed) { let s = BigInt(seed); return () => { s = (s * 6364136223846793005n + 1442695040888963407n) & ((1n << 64n) - 1n); return Number(s >> 11n) / 2 ** 53; }; }
function simpson(f, a, b, n = 2000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; }

/* ── 1 · Foton benzetimi ── */
{
  // Bağımsız benzetim: her foton her dilimde ayrı bir Bernoulli denemesi.
  const brute = (eps, l, cmM, S, N, seed) => { const r = lcg(seed), p = Math.LN10 * eps * cmM * 1e-3 * l / S; let t = 0; for (let i = 0; i < N; i++) { let alive = true; for (let k = 0; k < S && alive; k++) if (r() < p) alive = false; if (alive) t++; } return t / N; };
  for (const [eps, l, c, S] of [[2000, 1, 0.2, 100], [1000, 2, 0.5, 50], [5000, 0.5, 0.1, 20], [300, 5, 1, 200]]) {
    const o = { eps, l, c, N: 100000, S, seed: 3, model: "ideal", stray: 0, r: 0, K: 0, fD: 0 };
    const p = Math.LN10 * eps * c * 1e-3 * l / S, Texact = Math.pow(1 - p, S);
    near(K.modelT(o), Texact, 1e-12, "dilim modeli T = (1 − p)^S");
    near(K.limitT(o), Math.exp(-Math.LN10 * eps * c * 1e-3 * l), 1e-12, "S → ∞ sınırı");
    const sd = Math.sqrt(Texact * (1 - Texact) / o.N);
    for (const seed of [1, 2, 3, 4, 5]) { const run = K.photonRun({ ...o, seed }); abs(run.T, Texact, 4.5 * sd, "MC geçirgenlik"); near(run.sigmaA, Math.sqrt((1 - run.T) / (o.N * run.T)) / Math.LN10, 1e-12, "σ_A"); }
    const tb = brute(eps, l, c, S, 20000, 11), sdb = Math.sqrt(Texact * (1 - Texact) / 20000);
    abs(tb, Texact, 4.5 * sdb, "bağımsız dilim dilim benzetim");
    abs(K.photonRun({ ...o, N: 20000, seed: 9 }).T, tb, 4.5 * Math.SQRT2 * sdb, "iki benzetim uyumlu");
    // Derinlik histogramı: soğurulan + geçen = 1
    const nb = K.binsFor(S), th = K.depthTheory(o, nb); near(th.reduce((a, b) => a + b, 0) + Texact, 1, 1e-9, "derinlik dağılımı toplamı");
    const run = K.photonRun(o); ok(run.hist.reduce((a, b) => a + b, 0) + run.trans === o.N, "sayım korunur");
    // Lambert: ardışık eşit derinlik aralıklarında oran sabit
    near(th[1] / th[0], th[nb - 1] / th[nb - 2], 1e-9, "üstel derinlik profili: eşit aralıklarda sabit oran");
    ok(nb >= 2 && S % nb === 0, "histogram kutuları dilimleri eşit böler");
  }
  // Varsayılan durum (rapordaki sayılar)
  const d = { eps: 2000, l: 1, c: 0.2, N: 100000, S: 100, seed: 1, model: "ideal", stray: 0.01, r: 0.6, K: 5000, fD: 0 };
  const r0 = K.photonRun(d); ok(r0.trans === 39503, "varsayılan: 39 503 foton"); abs(r0.A, 0.40337, 1e-5, "varsayılan A");
  near(-Math.log10(K.modelT(d)), 0.401853, 1e-5, "varsayılan model A");
  // Orantılılık: eğim ≈ εl
  const sw = K.sweep(d, "c", Array.from({ length: 11 }, (_, i) => i / 10)), fit = sw.filter((p) => p.x > 0 && p.Abl <= 1);
  abs(K.originSlope(fit), 2 * (1 + 0.0046), 0.02, "A–c eğimi ≈ εl (dilim yanlılığı dahil)");
  // Kaçak ışık doyumu
  for (const s of [0.001, 0.01, 0.05]) { const q = { ...d, model: "stray", stray: s, c: 1, l: 5, eps: 5000 }; near(K.limitT(q), (Math.pow(10, -25) + s) / (1 + s), 1e-12, "kaçak ışık"); abs(-Math.log10(K.limitT(q)), -Math.log10(s / (1 + s)), 1e-9, "doyum A"); const run = K.photonRun({ ...q, S: 500 }); abs(run.strays / run.N, s / (1 + s), 5 * Math.sqrt(s / (1 + s) / run.N), "kaçak foton oranı"); }
  // Eğimli bant: Simpson ile bağımsız ortalama
  for (const [a, r] of [[0.4, 0.6], [1.2, 0.6], [2, 0.9], [0.8, 0.2]]) {
    const q = { ...d, model: "poly", r, c: a / 2 }, ref = simpson((e) => Math.pow(10, -a * e), 1 - r, 1 + r) / (2 * r);
    near(K.limitT(q), ref, 1e-9, "çok renkli kapalı biçim"); ok(-Math.log10(ref) < a, "çok renkli ışık A'yı düşürür");
    const run = K.photonRun({ ...q, S: 400 }), Tm = K.modelT({ ...q, S: 400 }); abs(run.T, Tm, 4.5 * Math.sqrt(Tm * (1 - Tm) / run.N), "çok renkli MC");
  }
  // Dimer dengesi
  for (const c of [1e-5, 2e-4, 6e-4, 1e-3]) for (const Kd of [100, 5000, 20000]) { const s = K.dimerSplit(c, Kd); near(s.D / (s.M * s.M), Kd, 1e-9, "K = [D]/[M]²"); near(s.M + 2 * s.D, c, 1e-12, "kütle denkliği"); }
  const sp = K.dimerSplit(6e-4, 5000); near(sp.M, 2e-4, 1e-12, "√(1 + 8Kc) = 5 olan durum");
  ok(K.photonRun({ ...d, eps: 5000, l: 5, c: 1, S: 5 }).valid === false, "p > 1 geçersiz");
  ok(K.photonRun({ ...d, eps: 5000, l: 5, c: 1, S: 500 }).A === null, "hiç foton geçmezse A tanımsız");
}

/* ── 2 · Kalibrasyon ── */
{
  const r = lcg(5);
  for (let t = 0; t < 40; t++) {
    const n = 4 + Math.floor(r() * 7), x = [], y = [];
    for (let i = 0; i < n; i++) { x.push(r() * 2); y.push(0.01 + 1.8 * x[i] + 0.02 * (r() - 0.5)); }
    const f = K.linfit(x, y), Sx = x.reduce((a, b) => a + b, 0), Sxx = x.reduce((a, b) => a + b * b, 0), Sy = y.reduce((a, b) => a + b, 0), Sxy = x.reduce((a, v, i) => a + v * y[i], 0), det = n * Sxx - Sx * Sx;
    near(f.b1, (n * Sxy - Sx * Sy) / det, 1e-9, "Cramer eğim"); near(f.b0, (Sxx * Sy - Sx * Sxy) / det, 1e-9, "Cramer kesişim");
    const q = x.map((v) => v * v), yq = x.map((v, i) => 0.1 + 0.5 * v - 0.3 * q[i]); ok(Math.abs(K.quadT(x, yq.map((v, i) => v + 1e-6 * Math.sin(i)))) > 50, "gerçek eğrilik büyük t verir");
  }
  const o = { n: 6, cmax: 0.5, noise: "const", sigA: 0.005, sigT: 0.005, stray: 0, cu: 0.3, m: 3, seed: 1 };
  const cs = [0, 0.1, 0.2, 0.3, 0.4, 0.5], cb = 0.25, sxx = cs.reduce((a, c) => a + (c - cb) ** 2, 0), b = 2;
  const trueSc = 0.005 / b * Math.sqrt(1 / 3 + 1 / 6 + (0.3 - cb) ** 2 / sxx);
  const mc = K.calMC(o, 2000);
  abs(mc.sd / trueSc, 1, 0.06, "MC SD ≈ gerçek σ ile formül"); abs(mc.mean, 0.3, 4 * mc.sd / Math.sqrt(2000), "ĉ yansız");
  ok(mc.coverage > 0.925 && mc.coverage < 0.97, "t aralığı kapsaması ≈ %95: " + mc.coverage);
  abs(mc.lodMean / (3 * 0.005 / b), 1, 0.1, "LOD ≈ 3σ/(εl) (s_b'nin yanlılığı ≈ %3)");
  const e = K.calExperiment(o, 1); abs(e.inv.c, 0.29992, 1e-5, "varsayılan ĉ"); abs(e.inv.sc, 0.001632, 1e-6, "varsayılan s_c"); abs(e.fit.b1, 1.98476, 1e-5, "varsayılan eğim");
  near(e.inv.sc, Math.abs(e.fit.syx / e.fit.b1) * Math.sqrt(1 / 3 + 1 / 6 + (e.inv.ym - e.fit.my) ** 2 / (e.fit.b1 ** 2 * sxx)), 1e-9, "ters kestirim formülü");
  // Kaçak ışık eğriltir
  const bent = K.calExperiment({ ...o, cmax: 2, stray: 0.01, cu: 1 }, 1); ok(bent.quad < -5, "kaçak ışıkta anlamlı negatif eğrilik");
  // En iyi absorbans: d/dA [10^A / A] = 0 ⇒ A = 1/ln10
  const g = (A) => Math.pow(10, A) / A; ok(g(1 / Math.LN10 - 1e-4) > g(1 / Math.LN10) && g(1 / Math.LN10 + 1e-4) > g(1 / Math.LN10), "türev koşulu");
  for (const s of [0.002, 0.005, 0.01]) for (const seed of [1, 2, 3]) { const op = K.optimalA(s, 4000, seed); abs(op.Aopt, 1 / Math.LN10, 0.03, "A_opt"); abs(op.relMin / (Math.E * s), 1, 0.06, "en küçük bağıl hata e·σ_T"); }
}

/* ── 3 · UV–Vis ── */
{
  const D = K.xyzOf(() => 1); near(D[1], 1, 1e-12, "D65 Y = 1"); abs(K.WHITE[0], 0.3127, 6e-4, "D65 x"); abs(K.WHITE[1], 0.3290, 6e-4, "D65 y");
  for (const [l0, e, w] of [[430, 25000, 80], [602, 38000, 90]]) { const B = [[l0, e, w]]; near(K.epsAt(B, l0 + w / 2), e / 2, 1e-12, "FWHM"); near(K.peakOf(B).lam, l0, 1e-6, "tepe"); }
  for (const key of Object.keys(K.SPECIES)) {
    const pk = K.peakOf(K.SPECIES[key].bands), c = 0.5 / pk.eps, col = K.colourOf(K.SPECIES[key].bands, c, 1);
    abs(col.angle, 180, 1e-6, key + " tamamlayıcı açı 180°");
    near(col.xyzT[1] + col.xyzA[1], 1, 1e-12, key + " geçen + soğurulan = beyaz");
  }
  const y = K.colourOf(K.SPECIES.yellow.bands, 2e-5, 1); ok(y.domA.nm > 440 && y.domA.nm < 480 && y.domT.nm > 560 && y.domT.nm < 585, "sarı boya: mavi soğurur, sarı görünür");
  const bl = K.colourOf(K.SPECIES.blue.bands, 1.6e-5, 1); ok(bl.domT.nm > 460 && bl.domT.nm < 500, "mavi boya mavi görünür " + bl.domT.nm);
  // Karışım: bağımsız ters matris ve kuvvet yinelemesiyle SVD
  for (const [l1, l2] of [[430, 630], [520, 540], [450, 600], [400, 700]]) {
    const E = K.mixMatrix(l1, l2), det = E[0][0] * E[1][1] - E[0][1] * E[1][0], cY = 1e-5, cB = 1.5e-5, A = [E[0][0] * cY + E[0][1] * cB, E[1][0] * cY + E[1][1] * cB];
    const sol = K.solve2(E, A); near(sol[0], cY, 1e-9, "çözüm"); near(sol[1], cB, 1e-9, "çözüm");
    const M = [[E[0][0] ** 2 + E[1][0] ** 2, E[0][0] * E[0][1] + E[1][0] * E[1][1]], [0, E[0][1] ** 2 + E[1][1] ** 2]]; M[1][0] = M[0][1];
    let v = [1, 0.3]; for (let i = 0; i < 500; i++) { const w = [M[0][0] * v[0] + M[0][1] * v[1], M[1][0] * v[0] + M[1][1] * v[1]], n = Math.hypot(...w); v = w.map((x) => x / n); }
    const lmax = v[0] * (M[0][0] * v[0] + M[0][1] * v[1]) + v[1] * (M[1][0] * v[0] + M[1][1] * v[1]), s1 = Math.sqrt(lmax), s2 = Math.abs(det) / s1;
    near(K.cond2(E).kappa, s1 / s2, 1e-6, "κ = σ₁/σ₂");
    const r = K.mixture({ cY: 10, cB: 15, l1, l2, sig: 0.003, seed: 2, K: 4000 }); for (let j = 0; j < 2; j++) abs(r.sdMC[j] / r.sdTh[j], 1, 0.06, "karışım MC SD");
  }
  ok(K.mixture({ cY: 10, cB: 15, l1: 550, l2: 550, sig: 0.003, seed: 1, K: 100 }).c === null, "aynı λ tekil");
  abs(K.cond2n(K.mixMatrix(430, 630)).kappa, 1, 0.05, "tepelerde ölçekli κ ≈ 1");
  { const good = K.mixture({ cY: 10, cB: 15, l1: 430, l2: 630, sig: 0.003, seed: 1, K: 0 }), valley = K.mixture({ cY: 10, cB: 15, l1: 520, l2: 540, sig: 0.003, seed: 1, K: 0 }); ok(valley.sdTh[0] > 20 * good.sdTh[0], "vadide sinyal zayıf, hata büyük"); }
  for (const [l1, l2] of [[430, 630], [520, 540], [600, 620]]) { const E = K.mixMatrix(l1, l2), n0 = Math.hypot(E[0][0], E[1][0]), n1 = Math.hypot(E[0][1], E[1][1]), cosang = (E[0][0] * E[0][1] + E[1][0] * E[1][1]) / (n0 * n1), kref = Math.sqrt((1 + Math.abs(cosang)) / (1 - Math.abs(cosang))); near(K.cond2n(E).kappa, kref, 1e-6, "ölçekli κ = √[(1+|cos θ|)/(1−|cos θ|)]"); }
  const it = K.isosbesticTheory(); abs(K.epsAt(K.SPECIES.btbA.bands, it.lam) - K.epsAt(K.SPECIES.btbB.bands, it.lam), 0, 1e-6 * it.eps, "ε eşitliği");
  const im = K.isosbesticMeasured(25e-6); abs(im.lam, it.lam, 0.15, "ölçülen eş soğurma"); abs(im.A, it.eps * 25e-6, 1e-4, "eş soğurma A");
  for (const pH of [4, 6.3, 7, 8.8, 10]) abs(K.btbSpectrum(pH, 25e-6, it.lam), it.eps * 25e-6, 1e-9, "her pH aynı A");
  ok(K.isosbesticMeasured(25e-6, true).spread > 0.01, "koşul bozulunca ortak nokta yok");
  near(K.btbFractions(7).base, 0.5, 1e-12, "pH = pK yarı yarıya");
}

/* ── 4 · IR ── */
{
  // NIST WebBook (Coblentz) spektrumlarından bu çalışmada okunan tepe yerleri (cm⁻¹), çözelti / saf sıvı.
  const NIST = { ethanol: [3635, 3330, 2975, 1048, 1088, 880], acetone: [1720, 1357, 1218], acetic: [1709, 1285], hexane: [1466, 1380, 722], ethylacetate: [1240, 1046], benzaldehyde: [2816, 2733, 1711, 1588, 746, 689] };
  for (const [key, list] of Object.entries(NIST)) { const bands = K.IR_MOLS[key].bands.map((b) => b[0]); for (const nu of list) ok(bands.some((b) => Math.abs(b - nu) <= 6), `${key} ${nu} bandı`); }
  // Korelasyon tablosu aralıkları: gerekli her grup için aralıkta bir bant
  const RANGE = { OH_alc: [3200, 3400], OH_acid: [2500, 3300], CH_sp3: [2850, 3020], CH_ar: [3000, 3100], CH_ald: [2700, 2850], CO_double: [1680, 1760], CO_single: [1000, 1300], CC_ar: [1450, 1600] };
  for (const [key, m] of Object.entries(K.IR_MOLS)) {
    for (const g of m.groups) ok(m.bands.some((b) => b[0] >= RANGE[g][0] && b[0] <= RANGE[g][1]), `${key}: ${g} aralığında bant`);
    const hasCO = m.bands.some((b) => b[0] >= 1680 && b[0] <= 1780 && b[1] > 0.3); ok(hasCO === m.groups.includes("CO_double"), `${key}: C=O varlığı`);
    const broadOH = m.bands.some((b) => b[0] > 2900 && b[0] < 3400 && b[2] >= 200); ok(broadOH === (m.groups.includes("OH_alc") || m.groups.includes("OH_acid")), `${key}: geniş O–H`);
    ok(K.gradeQuiz(key, m.groups).perfect, `${key}: tam cevap`); ok(!K.gradeQuiz(key, [...m.groups, "CC_ar"].filter((v, i, a) => a.indexOf(v) === i)).perfect || m.groups.includes("CC_ar"), `${key}: fazla seçim yakalanır`);
    for (const nu of [500, 1700, 3000, 3600]) { const T = K.irT(m.bands, nu); ok(T > 0 && T <= 1, "0 < T ≤ 1"); }
  }
  ok(!K.irBands("ethanol", "gas").some((b) => b[2] > 100), "gaz etanolde geniş bant yok");
  // Osilatör
  const muH = 12 * 1.00782503223 / (12 + 1.00782503223), muD = 12 * 2.01410177812 / (12 + 2.01410177812);
  near(K.reducedMass(K.MASS.C, K.MASS.H), muH, 1e-12, "μ(C–H)");
  const nuSI = (k, mu) => Math.sqrt(k / (mu * 1.66053906660e-27)) / (2 * Math.PI * 299792458) / 100;
  for (const k of [100, 504, 1185, 2000]) {
    near(K.harmonicNu(k, muH), nuSI(k, muH), 1e-12, "ṽ formülü");
    near(K.kFromNu(K.harmonicNu(k, muD), muD), k, 1e-12, "k ↔ ṽ");
    const fd = K.fdLevels({ k, mu: muH, pot: "harm", levels: 4 }), w = nuSI(k, muH);
    fd.levels.forEach((E, v) => near(E, w * (v + 0.5), 3e-4, "harmonik düzey " + v));
    for (const D of [20000, 38000, 60000]) { const fm = K.fdLevels({ k, mu: muH, pot: "morse", D, levels: 4 }), we = w, wx = we * we / (4 * D); fm.levels.forEach((E, v) => abs(E, we * (v + 0.5) - wx * (v + 0.5) ** 2, 1e-4 * E + 0.05, "Morse düzey " + v)); }
  }
  ok(Math.round(K.kFromNu(3034, muH)) === 504, "C–H hazır k = 504 N/m");
  const fH = K.fdLevels({ k: 504, mu: muH, pot: "harm", levels: 2 }).fund, fD = K.fdLevels({ k: 504, mu: muD, pot: "harm", levels: 2 }).fund;
  abs(fH / fD, Math.sqrt(muD / muH), 2e-4, "harmonik izotop oranı"); abs(Math.sqrt(muD / muH), 1.3620, 1e-4, "√(μD/μH)");
  const mH = K.fdLevels({ k: 504, mu: muH, pot: "morse", D: 38000, levels: 2 }).fund, mD = K.fdLevels({ k: 504, mu: muD, pot: "morse", D: 38000, levels: 2 }).fund;
  ok(mH / mD < fH / fD && Math.abs(mH / mD - 3034 / 2266) < 0.01, "Morse oranı NIST CHCl₃/CDCl₃'e yaklaşır: " + (mH / mD).toFixed(4));
}
console.log(`G spektroskopi-beer-lambert: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

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
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      await page.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      page.setDefaultTimeout(8000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); }); // defter yazıldı: 404 artık hata
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, t) => { await page.waitForFunction(([i, x]) => document.getElementById(i).textContent.includes(x), [id, t], { timeout: 4000 }).catch(() => {}); const v = await read(id); assert(v.includes(t), `${id}: "${v}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event(e.tagName === "SELECT" || e.type === "checkbox" ? "change" : "input", { bubbles: true })); }, v);
      const settle = () => page.waitForTimeout(120);
      // Defter görünür
      await page.locator("section.digest").waitFor({ timeout: 15000 }); ok(/Beer–Lambert: Işığın Soğurulmasıyla Ölçmek/.test(await page.locator("section.digest").textContent()), "defter görünür");
      // Her denetimin etiketi
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("main input, main select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      // 1. sekme varsayılan
      await has("abTrans", "39 503 / 100 000".replace(/ /g, " ").replace(" / ", " / "));
      await has("abA", "0,403 ± 0,002"); await has("abBL", "0,400"); await has("abMod", "0,402"); await has("abSlope", "2,015 / 2,000");
      await page.click("#abP1"); await settle(); await has("abStatus", "Kaçak ışık"); await has("abMod", "1,7");
      await page.click("#abP4"); await settle(); await has("abP", "0,5526"); await has("abStatus", "Dilimler kalın"); await has("abStatus", "A = 1,751, εlc = 1,200 değerini 45,9 % aşıyor"); // durum satırı ölçülen A ile tutarlı
      await range("abC", 0); await settle(); await has("abDiff", "—"); await has("abStatus", "soğuran madde yok");
      await range("abEps", 5000); await range("abL", 5); await range("abC", 1); await settle(); await has("abA", "Ölçülemedi"); await has("abStatus", "p = ");
      await range("abS", 500); await settle(); await has("abA", "Ölçülemedi"); await has("abStatus", "Hiç foton geçmedi");
      await page.click("#absReset"); await settle(); await has("abA", "0,403 ± 0,002");
      await page.click("#abP3"); await settle(); await has("abStatus", "Dimerleşme"); await has("abBL", "1,200");
      await page.click("#abP2"); await settle(); await has("abStatus", "Bant içinde");
      await page.keyboard.press("Escape"); await page.locator("h1").click(); await page.keyboard.press("r"); await settle(); await has("abA", "0,403 ± 0,002");
      // Sekme klavyesi
      await page.locator("#tab-abs").focus(); await page.keyboard.press("ArrowRight"); assert.equal(await page.locator("#tab-cal").getAttribute("aria-selected"), "true"); checks++;
      await page.keyboard.press("End"); assert.equal(await page.locator("#tab-ir").getAttribute("aria-selected"), "true"); checks++;
      await page.keyboard.press("Home"); assert.equal(await page.locator("#tab-abs").getAttribute("aria-selected"), "true"); checks++;
      // 2. sekme
      await page.click("#tab-cal"); await settle();
      await has("caCu", "0,2999 ± 0,0016"); await has("caAopt", "0,436 / 0,434"); await has("caB1", "1,9848");
      await page.click("#caP1"); await settle(); await has("caCurvE", "Anlamlı eğrilik"); await has("caStatus", "sistematik sapma"); await has("caStatus", "doğrusal aralık aşıldı");
      await page.click("#caP2"); await settle(); await has("caR2E", "Fotometrik");
      await page.click("#caP3"); await settle(); await has("caStatus", "tayin sınırının altında");
      await range("caN", 4); await range("caM", 1); await settle(); await has("caCovE", "t(2) = 4,303");
      await page.click("#calReset"); await settle(); await has("caCu", "0,2999 ± 0,0016");
      // 3. sekme
      await page.click("#tab-uv"); await settle();
      await has("uvMax", "430,0 nm"); await has("uvAng", "180,00°"); await has("uvDomT", "570,2 nm"); await has("mxK", "1,00"); await has("isMeas", "511,2 nm");
      await range("uvLogC", -6.5); await settle(); await has("uvStatus", "renksiz"); await has("uvDomA", "—");
      await page.locator("#uvSp").selectOption("btbB"); await page.click("#uvP1"); await settle(); await has("uvAmax", "0,478");
      await page.click("#uvP3"); await settle(); await has("uvMax", "Görünür bölgenin dışında"); await has("uvDomT", "nm");
      await page.click("#mxP3"); await settle(); await has("mxY", "Çözüm yok"); await has("mxK", "∞");
      await page.click("#mxP2"); await settle(); await has("mxStatus", "absorbanslar küçük");
      await page.locator("#isEq").check(); await settle(); await has("isMeas", "Ortak nokta yok");
      await range("isPH", 4); await settle(); await has("isFr", "0,1 %");
      await page.click("#uvReset"); await settle(); await has("isMeas", "511,2 nm"); await has("mxK", "1,00");
      // 4. sekme
      await page.click("#tab-ir"); await settle();
      await has("irBand", "3330 cm⁻¹"); await has("osMeas", "3033,2 cm⁻¹"); await has("osRatio", "1,3620"); await has("osNist", "1,3389");
      for (const g of ["OH_alc", "CH_sp3", "CO_single"]) await page.locator("#irq-" + g).check();
      await page.click("#irCheck"); await has("irFeedback", "Tam isabet: 3 / 3");
      await page.locator("#irMol").selectOption("acetone"); await settle(); await page.locator("#irq-OH_alc").check(); await page.click("#irCheck"); await has("irFeedback", "Spektrumda olmayan: O–H, alkol");
      await page.locator("#irSpec").focus(); const c0 = Number(await page.locator("#irCursor").inputValue()); await page.keyboard.press("ArrowLeft"); await settle(); assert.equal(Number(await page.locator("#irCursor").inputValue()), c0 + 5); checks++;
      await page.keyboard.press("Shift+ArrowRight"); await settle(); assert.equal(Number(await page.locator("#irCursor").inputValue()), c0 - 45); checks++;
      await range("irCursor", 1720); await settle(); await has("irBandE", "C=O");
      await page.locator("#irMol").selectOption("ethanol"); await page.locator("#irMedium").selectOption("gas"); await settle(); await has("irStatus", "3632");
      await page.click("#irUnknown"); await settle(); await has("irTitle", "bilinmeyen"); assert.equal(await page.locator("#irTableWrap").isHidden(), true); checks++;
      await page.click("#irCheck"); await has("irFeedback", "Molekülü de tahmin et");
      await page.locator("#osPreset").selectOption("CD"); await settle(); await has("osMeas", "2227,1"); await has("osMu", "1,7246");
      await page.locator("#osPotSel").selectOption("morse"); await settle(); await has("osRatio", "1,3471"); await has("osThE", "Morse kuramı");
      await range("osK", 900); await settle(); assert.equal(await page.locator("#osPreset").inputValue(), "custom"); checks++;
      await page.locator("#osPreset").selectOption("CO"); await settle(); await has("osMeas", "1681,"); await page.locator("#osPotSel").selectOption("harm"); await settle(); await has("osMeas", "1719,9");
      await page.click("#irReset"); await settle(); await has("osMeas", "3033,2 cm⁻¹"); await has("irTitle", "Etanol");
      // Bütün sekmelerde taşma yok
      for (const t of ["abs", "cal", "uv", "ir"]) { await page.click("#tab-" + t); await settle(); assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "yatay taşma: " + t); checks++; }
      assert.equal(await page.evaluate(() => Object.isFrozen(SpectroLab) && !Object.getOwnPropertyDescriptor(window, "SpectroLab").writable), true); checks++;
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G spektroskopi-beer-lambert: ${checks - before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
