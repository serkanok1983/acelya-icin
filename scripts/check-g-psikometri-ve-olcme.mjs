// Psikometri ve ölçme: çekirdeğin bağımsız denetimi (Simpson integraliyle normal dağılım, Wikipedia'daki yayımlanmış
// değerler: Spearman–Brown örneği, Spearman 1904 g yükleri, stanin yüzdeleri, z = 1 için %84,13; sayfanınkinden farklı
// bir üreteçle (sfc32) büyük örneklem Monte Carlo, kapalı biçimler, kesik normal kuramı, kaba kuvvet ızgaraları,
// sayısal türevle bilgi fonksiyonu) ve isteğe bağlı tarayıcı denetimi (390 px açık, 1280 px koyu).
// Kullanım: node scripts/check-g-psikometri-ve-olcme.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "psikometri-ve-olcme";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.PsychometricsLab;
let checks = 0;
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
const title = html.match(/<title>([^<]*)<\/title>/)[1];
ok(title.length <= 80 && title.startsWith("Psikometri: "), `başlık (${title.length})`);
ok(/<body[^>]*data-page="psikometri-ve-olcme"/.test(html), "data-page");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
const script = html.split("<script>\n(() => {")[1];
ok(!/localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|sendBeacon|WebSocket/.test(script), "sayfa betiği depolamaya ya da ağa dokunmaz");
ok(/sentetik/.test(html) && /112/.test(html) && /sağlık profesyoneline başvur/.test(html), "sentetik etiketi ve yardım notu");
for (const l of ["regresyon-ve-korelasyon.html", "hipotez-testi-ve-guven-araligi.html", "bilimsel-yontem-olcme-ve-belirsizlik.html", "algi-psikolojisi.html"]) ok(html.includes(`href="${l}"`), `bağlantı ${l}`);

ok(html.includes("Bu sekmedeki tablo ham (düzeltilmemiş) korelasyonlardır"), "Spearman tablosu ham diye etiketli");
/* ── Bağımsız araçlar ── */
function sfc(seed) { let a = seed | 0, b = 0x9e3779b9 | 0, c = 0x243f6a88 | 0, d = 0xb7e15162 | 0; const f = () => { const t = (((a + b) | 0) + d) | 0; d = (d + 1) | 0; a = b ^ (b >>> 9); b = (c + (c << 3)) | 0; c = (c << 21) | (c >>> 11); c = (c + t) | 0; return (t >>> 0) / 4294967296; }; for (let i = 0; i < 20; i++) f(); return f; }
function nrm(r) { // Marsaglia kutupsal
  let u, v, s; do { u = 2 * r() - 1; v = 2 * r() - 1; s = u * u + v * v; } while (s >= 1 || s === 0); return u * Math.sqrt(-2 * Math.log(s) / s);
}
function simpsonPhi(z) { const n = 4000, a = -10, h = (z - a) / n, f = (x) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI); let s = f(a) + f(z); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; }
function cov2(x, y) { const n = x.length; let mx = 0, my = 0; for (let i = 0; i < n; i++) { mx += x[i]; my += y[i]; } mx /= n; my /= n; let s = 0; for (let i = 0; i < n; i++) s += (x[i] - mx) * (y[i] - my); return s / (n - 1); }
const corr = (x, y) => cov2(x, y) / Math.sqrt(cov2(x, x) * cov2(y, y));
function alphaRaw(X) { const k = X[0].length, cols = [...Array(k).keys()].map((j) => X.map((r) => r[j])), tot = X.map((r) => r.reduce((a, b) => a + b, 0)); return k / (k - 1) * (1 - cols.reduce((s, c) => s + cov2(c, c), 0) / cov2(tot, tot)); }

/* ── Normal dağılım ── */
for (const z of [-3, -1.96, -1, -0.25, 0, 0.6, 1, 1.75, 2.5]) abs(K.Phi(z), simpsonPhi(z), 2e-7, `Φ(${z})`);
abs(100 * K.Phi(1), 84.13, 0.005, "z = 1 → %84,13 (Wikipedia)"); abs(100 * K.Phi(0.6), 72.57, 0.005, "z = 0,6 → %72,57");
for (const p of [0.001, 0.02, 0.1, 0.5, 0.84, 0.975, 0.999]) abs(K.Phi(K.PhiInv(p)), p, 1e-9, `Φ(Φ⁻¹(${p}))`);
abs(K.PhiInv(0.975), 1.959964, 1e-5, "1,96");
// stanin: Wikipedia tablosundaki yüzdeler ve sınırlar
{ const pct = [4, 7, 12, 17, 20, 17, 12, 7, 4], edges = [-Infinity, -1.75, -1.25, -0.75, -0.25, 0.25, 0.75, 1.25, 1.75, Infinity];
  pct.forEach((p, i) => { abs(100 * (simpsonPhi(Math.min(edges[i + 1], 9)) - simpsonPhi(Math.max(edges[i], -9.99))), p, 0.6, `stanin ${i + 1} payı`); ok(K.stanine((Math.max(edges[i], -3) + Math.min(edges[i + 1], 3)) / 2) === i + 1, `stanin ${i + 1}`); });
  ok(K.stanine(0.2499) === 5 && K.stanine(0.25) === 6 && K.stanine(-0.2501) === 4 && K.stanine(-5) === 1 && K.stanine(5) === 9, "stanin sınırları"); }
{ const s = K.scores(39, 30, 6); abs(s.z, 1.5, 1e-12, "z"); abs(s.T, 65, 1e-12, "T"); abs(s.dev, 122.5, 1e-12, "100/15"); ok(s.stanine === 8, "stanin 8"); }

/* ── Spearman–Brown ── */
abs(K.spearmanBrown(0.5, 2), 2 / 3, 1e-12, "SB 0,5 → 2/3"); abs(Math.ceil(50 * K.sbLength(0.8, 0.95)), 238, 0, "50 madde ,80 → ,95 için yaklaşık 238 (Wikipedia)");
for (const r of [0.3, 0.6, 0.85]) for (const t of [0.7, 0.9]) abs(K.spearmanBrown(r, K.sbLength(r, t)), t, 1e-12, "SB tersi");
// paralel maddelerle SB kesin: k maddenin güvenirliği tek maddeninkinden SB ile
{ const one = K.popStats({ k: 1, lam: 0.6, err: 1, het: "eq" }).rel; for (const k of [2, 5, 17, 40]) abs(K.popStats({ k, lam: 0.6, err: 1, het: "eq" }).rel, K.spearmanBrown(one, k), 1e-12, `SB paralel k=${k}`); }

/* ── Klasik test kuramı: kapalı biçimler ── */
for (const [k, lam, err] of [[10, 0.6, 1], [4, 1.2, 0.5], [30, 0.2, 1.8]]) {
  const P = K.popStats({ k, lam, err, het: "eq" }), rel = (k * lam) ** 2 / ((k * lam) ** 2 + k * err * err);
  abs(P.rel, rel, 1e-12, "güvenirlik kapalı biçim"); abs(P.alpha, rel, 1e-12, "eşit yükte α = güvenirlik"); abs(P.omega, rel, 1e-12, "ω");
  const d = 0.5, c = (k * lam) ** 2, tot = c + k * err * err; abs(K.popStats({ k, lam, err, het: "eq", delta: d }).retest, c / Math.sqrt(tot * (tot + c * d * d)), 1e-12, "yeniden test kapalı biçim");
}
{ const P = K.popStats({ k: 10, lam: 0.6, err: 1, het: "cong" }); ok(P.alpha < P.rel - 0.01, "farklı yükte α < güvenirlik"); abs(P.omega, P.rel, 1e-12, "konjenerik ω = güvenirlik");
  const L = K.loadings({ k: 10, lam: 0.6, het: "cong" }); abs(L.reduce((a, b) => a + b) / 10, 0.6, 1e-12, "yük ortalaması λ"); abs(L[0], 0.24, 1e-12, "0,4λ"); abs(L[9], 0.96, 1e-12, "1,6λ"); }
{ const P = K.popStats({ k: 10, lam: 0.6, err: 1, het: "two" }); // A: 5 madde, B: 5 madde, ilişki 0,3
  const tv = 2 * 9 + 2 * 0.3 * 9, rel = tv / (tv + 10); abs(P.rel, rel, 1e-12, "iki boyut güvenirlik"); ok(Number.isNaN(P.omega), "iki boyutta kuramsal ω tanımsız"); ok(P.alpha < P.rel, "iki boyutta α < güvenirlik"); }
// α'nın ortalama kovaryans biçimi: kc̄ / (v̄ + (k − 1)c̄)
{ const C = K.popCov({ k: 7, lam: 0.8, err: 0.9, het: "cong" }); let v = 0, c = 0; for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) (i === j ? (v += C[i][i] / 7) : (c += C[i][j] / 42)); abs(K.alphaOf(C), 7 * c / (v + 6 * c), 1e-12, "α ortalama kovaryans biçimi"); }
// sayfanın örneklemi: α ve yarıya bölme bağımsız yeniden hesap
{ const o = { k: 10, lam: 0.6, err: 1, het: "eq", N: 200, seed: 1, delta: 0 }, S = K.simulate(o), s = K.cttSample(o);
  abs(s.alpha, alphaRaw(S.X), 1e-10, "α örneklem yeniden hesap"); abs(s.alpha, 0.7869, 5e-4, "varsayılan α 0,787");
  const a = S.X.map((r) => r[0] + r[2] + r[4] + r[6] + r[8]), b = S.X.map((r) => r[1] + r[3] + r[5] + r[7] + r[9]); abs(s.split.rh, corr(a, b), 1e-10, "yarı korelasyonu"); abs(s.split.sb, 2 * corr(a, b) / (1 + corr(a, b)), 1e-10, "SB yarı");
  abs(s.relSample, cov2(S.T, S.T) / cov2(S.X.map((r) => r.reduce((p, q) => p + q)), S.X.map((r) => r.reduce((p, q) => p + q))), 1e-10, "örneklem var T / var X"); }
// büyük örneklem: sayfanın üreteci kuramı tutturur
{ const o = { k: 8, lam: 0.7, err: 1, het: "cong", N: 40000, seed: 3, delta: 0.4 }, s = K.cttSample(o), P = K.popStats(o);
  abs(s.alpha, P.alpha, 0.006, "büyük N α"); abs(s.omega, P.omega, 0.006, "büyük N ω (tek etmen uyumu)"); abs(s.retest, P.retest, 0.01, "büyük N yeniden test"); abs(s.rTX, Math.sqrt(P.rel), 0.006, "büyük N corr(T, X) = √güvenirlik"); }
// bağımsız Monte Carlo (sfc32, Marsaglia): eşit yükte α
{ const r = sfc(11), k = 6, X = []; for (let n = 0; n < 60000; n++) { const t = nrm(r); X.push(Array.from({ length: k }, () => 0.5 * t + 0.8 * nrm(r))); } abs(alphaRaw(X), K.popStats({ k, lam: 0.5, err: 0.8, het: "eq" }).alpha, 0.006, "bağımsız MC α"); }
// SÖH, kestirim, zayıflama
abs(K.sem(10, 0.787), 10 * Math.sqrt(0.213), 1e-12, "SÖH"); abs(K.kelley(65, 50, 0.8), 62, 1e-12, "kestirim");
abs(K.attenuate(0.6, 0.7, 0.8), 0.6 * Math.sqrt(0.56), 1e-12, "zayıflama"); abs(K.disattenuate(K.attenuate(0.6, 0.7, 0.8), 0.7, 0.8), 0.6, 1e-12, "düzeltme tersi");
{ const A = K.attSim({ rho: 0.6, rx: 0.7, ry: 0.8, N: 100000, seed: 2 }); abs(A.robs, A.rexp, 0.01, "büyük N zayıflama"); abs(A.rcorr, 0.6, 0.015, "büyük N düzeltme"); }
{ let over = 0; for (let s = 1; s <= 200; s++) if (K.attSim({ rho: 1, rx: 0.3, ry: 0.3, N: 50, seed: s }).rcorr > 1) over++; ok(over > 50, `ρ = 1, düşük güvenirlikte düzeltme sık sık 1'i aşar (${over}/200)`); }

/* ── Geçerlik ── */
{ const o = { tau: 0.5, mu: 0.2, phi: 0.3 }, R = K.mtmmPop(o);
  abs(R[0][3], 0.5, 1e-12, "A₁–A₂ = τ"); abs(R[0][1], 0.5 * 0.3 + 0.2, 1e-12, "A₁–B₁ = τφ + μ"); abs(R[0][4], 0.15, 1e-12, "A₁–B₂ = τφ"); abs(R[0][2], 0.5 * 0.18 + 0.2, 1e-12, "A–C 0,6φ"); abs(R[1][5], 0.5 * 0.09, 1e-12, "B–C 0,3φ");
  const C = K.mtCriteria(R, 200); ok(C.c1 === 9 && C.c2 === C.n2 && C.c3 === C.n3 && C.c4 === 6, "kuramsal iyi ölçme bütün ölçütleri sağlar"); ok(C.n2 === 36 && C.n3 === 36, "karşılaştırma sayıları");
  const M = K.mtCriteria(K.mtmmPop({ tau: 0.25, mu: 0.45, phi: 0.3 }), 200); ok(M.c3 === 0 && M.c2 === 36, "yöntem baskın: 3. ölçüt çöker");
  const Ch = K.cholesky(K.mtPhi(0.7)); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) abs(Ch[i].reduce((s, v, k) => s + v * Ch[j][k], 0), K.mtPhi(0.7)[i][j], 1e-12, "Cholesky");
  const S = K.mtmmSim({ ...o, N: 40000, seed: 5 }); let mx = 0; for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) mx = Math.max(mx, Math.abs(S.R[i][j] - R[i][j])); ok(mx < 0.025, `büyük N MTMM kuramı tutturur (${mx})`);
  const D = K.mtCriteria(K.mtmmSim({ ...o, N: 200, seed: 1 }).R, 200); ok(D.c1 === 9 && D.c2 === 36 && D.c3 === 36 && D.c4 === 4, "varsayılan örneklem ölçütleri"); abs(D.rc, Math.tanh(1.96 / Math.sqrt(197)), 1e-12, "eşik"); }
// seçim: kesik iki değişkenli normal kuramı (bağımsız formül)
for (const [rho, q] of [[0.5, 0.3], [0.7, 0.1], [0.3, 0.5]]) {
  const c = K.PhiInv(1 - q), lam = Math.exp(-c * c / 2) / Math.sqrt(2 * Math.PI) / q, v = 1 + c * lam - lam * lam, rs = rho * Math.sqrt(v) / Math.sqrt(rho * rho * v + 1 - rho * rho);
  const S = K.selectSim({ rho, q, N: 200000, seed: 4 }); abs(S.rSel, rs, 0.012, `seçilmiş grupta r (ρ ${rho}, q ${q})`); abs(S.rAll, rho, 0.008, "bütün grupta r"); abs(S.nSel / 200000, q, 1e-4, "seçilen pay");
}
{ const S = K.selectSim({ rho: 0.5, q: 0.3, N: 500, seed: 1 }); ok(S.nSel === 150, "varsayılan 150 seçilen"); abs(S.rSel, 0.2349, 5e-4, "varsayılan seçilmiş r"); }

/* ── Faktör analizi ── */
{ const R = K.SPEARMAN.R.map((r) => r.slice()), F = K.faFit(R, 1, false);
  F.L.forEach((r, i) => abs(r[0], K.SPEARMAN.g[i], 0.0006, `Spearman g yükü ${i}`)); // Wikipedia g yükleri
  assert.deepEqual([0.83, 0.78, 0.70, 0.66, 0.63, 0.67, 0.67, 0.65, 0.57, 0.64, 0.54, 0.51, 0.45, 0.51, 0.40], [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5], [3, 4], [3, 5], [4, 5]].map(([i, j]) => R[i][j])); checks++;
  ok(R.every((r, i) => r.every((v, j) => v === R[j][i])), "simetrik"); abs(R[4][0], 0.66, 0, "psychclassics: ses ayırt etme–Klasikler 0,66"); abs(R[5][4], 0.40, 0, "müzik–ses 0,40");
  const E = K.jacobiEigen(R); abs(E.values.reduce((a, b) => a + b), 6, 1e-10, "özdeğer toplamı = iz");
  let v = [1, 1, 1, 1, 1, 1]; for (let it = 0; it < 500; it++) { const w = R.map((r) => r.reduce((s, x, j) => s + x * v[j], 0)); const n = Math.hypot(...w); v = w.map((x) => x / n); } abs(R.map((r) => r.reduce((s, x, j) => s + x * v[j], 0)).reduce((s, x, i) => s + x * v[i], 0), E.values[0], 1e-9, "kuvvet yinelemesi ilk özdeğer");
  E.values.forEach((lv, f) => { const u = E.vectors.map((r) => r[f]); const Ru = R.map((r) => r.reduce((s, x, j) => s + x * u[j], 0)); u.forEach((x, i) => abs(Ru[i], lv * x, 1e-9, "özvektör")); });
  const I = K.invert(R); for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) abs(R[i].reduce((s, x, k) => s + x * I[k][j], 0), i === j ? 1 : 0, 1e-10, "ters matris");
  const T = K.tetrads(R); ok(T.length === 45, "45 dörtlü fark"); abs(T.reduce((a, b) => a + Math.abs(b), 0) / 45, 0.0381, 5e-4, "dörtlü fark ortalaması"); }
{ const R1 = K.faPop("one", 0); ok(K.tetrads(R1).every((t) => Math.abs(t) < 1e-12), "tek faktörde dörtlü farklar sıfır"); const F = K.faFit(R1, 1, false); [0.9, 0.8, 0.7, 0.6, 0.5, 0.4].forEach((l, i) => abs(F.L[i][0], l, 1e-6, "tek faktör yük geri bulunur")); abs(F.rmsr, 0, 1e-8, "tam uyum"); }
for (const phi of [0, 0.4]) { const R2 = K.faPop("two", phi), F = K.faFit(R2, 2, true); abs(F.rmsr, 0, 1e-8, `iki faktör tam uyum φ ${phi}`); [0.64, 0.49, 0.36, 0.64, 0.49, 0.36].forEach((h, i) => abs(F.h[i], h, 1e-6, "ortak varyans")); if (phi === 0) F.L.forEach((r, i) => { abs(Math.abs(r[i < 3 ? 0 : 1]), [0.8, 0.7, 0.6][i % 3], 1e-4, "varimax basit yapı"); abs(r[i < 3 ? 1 : 0], 0, 1e-4, "çapraz yük 0"); }); }
{ // varimax ölçütünü ızgarada en çoklar
  const U = K.faFit(K.faSample("two", 0.4, 300, 1), 2, false).L, V = K.varimax(U), crit = (L) => [0, 1].reduce((s, f) => { const h = L.map((r) => r[0] ** 2 + r[1] ** 2); const q = L.map((r, i) => r[f] ** 2 / h[i]); const m = q.reduce((a, b) => a + b) / q.length; return s + q.reduce((a, b) => a + (b - m) ** 2, 0); }, 0);
  let best = -Infinity; for (let a = 0; a < Math.PI / 2; a += 0.0005) { const c = Math.cos(a), s = Math.sin(a); best = Math.max(best, crit(U.map((r) => [c * r[0] + s * r[1], -s * r[0] + c * r[1]]))); }
  ok(crit(V) >= best - 1e-6, "varimax ızgaradan iyi"); V.forEach((r, i) => abs(r[0] ** 2 + r[1] ** 2, U[i][0] ** 2 + U[i][1] ** 2, 1e-10, "döndürme h²'yi korur")); }
{ const PA = K.parallelAnalysis(6, 22, 200, 1); abs(PA.reduce((a, b) => a + b), 6, 1e-9, "rastgele özdeğer toplamı"); abs(PA[0], 1.78, 0.03, "22 kişide ilk rastgele özdeğer ≈ 1,8"); ok(PA.every((v, i) => i === 0 || v < PA[i - 1]), "azalan"); }

/* ── Madde tepki kuramı ── */
for (const [a, b, c] of [[1, -1, 0], [1.8, 0.5, 0], [0.6, 1.5, 0.2], [2.2, -0.3, 0.25]]) {
  for (const t of [-2, -0.5, 0.7, 2.4]) { const h = 1e-5, p = K.irtP(t, a, b, c), dp = (K.irtP(t + h, a, b, c) - K.irtP(t - h, a, b, c)) / (2 * h); abs(K.irtInfo(t, a, b, c), dp * dp / (p * (1 - p)), 1e-7, "bilgi = P′²/(PQ)"); }
  abs(K.irtP(b, a, b, c), c + (1 - c) / 2, 1e-12, "θ = b'de orta nokta");
  let bt = 0, bv = -1; for (let t = -6; t <= 6; t += 0.0005) { const v = K.irtInfo(t, a, b, c); if (v > bv) { bv = v; bt = t; } } abs(bt, b + Math.log((1 + Math.sqrt(1 + 8 * c)) / 2) / a, 0.001, "3PL bilgi tepesi (ızgara)");
}
{ const bank = K.makeBank(1); ok(bank.length === 60 && Object.isFrozen(bank), "60 madde"); ok(bank.every((x) => x.a >= 0.9 && x.a <= 2.2 && x.b >= -2.6 && x.b <= 2.6 && x.c === 0), "banka aralıkları"); ok(bank.every((x, i) => i === 0 || x.b >= bank[i - 1].b - 0.09), "güçlükler kabaca sıralı");
  // EAP: bağımsız Simpson karesi (−6…6)
  const items = bank.slice(20, 28), resp = [1, 1, 0, 1, 0, 0, 1, 0].map(Boolean), E = K.eap(items, resp);
  const like = (t) => Math.exp(-t * t / 2) * items.reduce((s, it, i) => s * (resp[i] ? K.irtP(t, it.a, it.b, 0) : 1 - K.irtP(t, it.a, it.b, 0)), 1);
  const simp = (f) => { const n = 6000, h = 12 / n; let s = f(-6) + f(6); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(-6 + i * h); return s * h / 3; };
  const z = simp(like), m = simp((t) => t * like(t)) / z, sdv = Math.sqrt(simp((t) => t * t * like(t)) / z - m * m); abs(E.theta, m, 2e-3, "EAP ortalama"); abs(E.se, sdv, 2e-3, "EAP ss");
  const C = K.catRun({ theta: 2, se: 0.3, max: 30, seed: 1, bank });
  let b0 = null, bi = -1; for (const it of bank) { const v = K.irtInfo(0, it.a, it.b, 0); if (v > bi) { bi = v; b0 = it; } } ok(C.steps[0].item.id === b0.id, "ilk madde θ = 0'da en bilgilendirici");
  ok(new Set(C.steps.map((s) => s.item.id)).size === C.n, "madde tekrarı yok"); ok(C.se < 0.3 && C.steps.slice(0, -1).every((s) => s.se >= 0.3), "durma kuralı");
  for (let i = 1; i < C.n; i++) { const used = new Set(C.steps.slice(0, i).map((s) => s.item.id)), th = C.steps[i - 1].theta; let best = -1; for (const it of bank) if (!used.has(it.id)) best = Math.max(best, K.irtInfo(th, it.a, it.b, 0)); abs(K.irtInfo(th, C.steps[i].item.a, C.steps[i].item.b, 0), best, 1e-12, "en çok bilgi seçimi"); }
  ok(C.n === 19, "varsayılan 19 madde"); abs(C.theta, 1.81, 0.005, "varsayılan kestirim 1,81"); const F = K.fixedRun({ theta: 2, seed: 1, bank }, 19); abs(F.theta, 1.36, 0.005, "sabit test 1,36"); abs(F.se, 0.46, 0.005, "sabit test hata 0,46");
  const Bh = K.catBatch({ theta: 2, se: 0.3, max: 30, seed: 1, bank }, 100), Bm = K.catBatch({ theta: 0, se: 0.3, max: 30, seed: 1, bank }, 100);
  ok(Bh.rmseCat < 0.75 * Bh.rmseFix, `uç düzeyde uyarlamalı daha iyi (${Bh.rmseCat} / ${Bh.rmseFix})`); ok(Bm.rmseCat / Bm.rmseFix > 0.8 && Bm.rmseCat / Bm.rmseFix < 1.2, "ortada benzer"); }

/* ── Normlar ve Flynn ── */
{ const S = K.normSample({ mu: 30, sd: 6, shape: "normal", N: 500, seed: 1 }); abs(K.mean(S), 30.07, 0.005, "norm ortalaması"); ok(S.every(Number.isInteger), "tam sayı puanlar"); abs(K.pctRank([1, 2, 2, 3], 2), 0.5, 1e-12, "yüzdelik sıra"); abs(K.pctRank(S, 39), 0.93, 1e-9, "varsayılan yüzdelik sıra");
  const B = K.normSample({ mu: 50, sd: 10, shape: "skew", N: 100000, seed: 2 }), m = K.mean(B), s = K.sd(B), sk = B.reduce((a, x) => a + ((x - m) / s) ** 3, 0) / B.length; abs(m, 50, 0.15, "çarpık ortalama"); abs(s, 10, 0.15, "çarpık ss"); ok(sk < -1, `sola çarpık (${sk})`); }
{ const F = K.flynn({ y0: 1990, y: 2020, gain: 3, cut: 130 }); abs(F.infl, 9, 1e-12, "kayma"); abs(F.above, 1 - simpsonPhi((130 - 109) / 15), 1e-6, "eşik üstü pay"); abs(F.aboveNew, 1 - simpsonPhi(2), 1e-6, "%2,28"); }

console.log(`G psikometri: ${checks} çekirdek kontrolü PASS`);

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
      await page.addInitScript((th) => { localStorage.setItem("acelya-theme", th); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      page.setDefaultTimeout(15000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      const sent = []; page.on("request", (r) => { if (["fetch", "xhr", "ping", "websocket", "eventsource"].includes(r.resourceType())) sent.push(r.resourceType() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      await page.waitForTimeout(300);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { const v = await read(id); assert(v.includes(s), `${width}px ${id}: "${v}" içinde "${s}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); e.dispatchEvent(new Event("change", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const reset = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); };
      const noOverflow = async (label) => ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${label} taşma yok`);
      const inked = (id) => page.locator("#" + id).evaluate((c) => { const g = c.getContext("2d"), d = g.getImageData(0, 0, c.width, c.height).data; const r0 = d[0], g0 = d[1], b0 = d[2]; let n = 0; for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - r0) + Math.abs(d[i + 1] - g0) + Math.abs(d[i + 2] - b0) > 40) n++; return n / (d.length / 4); });
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuval etiketleri");
      ok(await page.evaluate(() => !/[̀-ͯ]/.test(document.querySelector(".app-content").textContent)), "birleşik işaret yok");
      // 1 · güvenirlik
      await has("gvAlpha", "0,787 · 0,783"); await has("gvStatus", "50'ye indirip \"Yeni örneklem\""); await has("gvRel", "0,783 · 0,753"); await has("gvOmega", "0,788 · 0,783"); await has("gvSplit", "0,628 → 0,772"); await has("gvRetest", "0,762 · 0,783"); await has("gvRtx", "0,885 · 0,868");
      await has("gvSb", "2,44 kat"); await has("gvSb", "25 madde"); await has("gvSem", "4,62"); await has("gvBand95", "56,0 – 74,0"); await has("gvKel", "61,8");
      await has("atExp", "0,449"); await has("atObs", "0,458"); await has("atCorr", "0,613");
      for (const id of ["gvChart", "gvBand"]) ok((await inked(id)) > 0.004, `${id} çizili`);
      await sel("gvN", "50"); await has("gvStatus", "50 kişiyle bu sapma"); await sel("gvN", "200"); await sel("gvHet", "cong"); await has("gvAlpha", "0,778 · 0,770"); await has("gvStatus", "fark −0,013");
      await sel("gvHet", "two"); await has("gvSplit", "0,187 → 0,315"); await has("gvOmega", "· —"); await has("gvStatus", "bölmeye bağlıdır");
      await sel("gvHet", "eq"); await range("gvDelta", 0.5); await has("gvRetest", "0,706 · 0,716"); await has("gvRetestD", "düşürür");
      await range("gvK", 40); await has("gvKOut", "40"); await has("gvSb", "kısaltılabilir");
      await range("atRx", 0.3); await range("atRy", 0.3); await range("atRho", 1); await has("atCorr", "1,184"); await has("atStatus", "1'i aştı");
      await page.click("#gvNew"); ok((await page.inputValue("#gvSeed")) === "2", "yeni tohum");
      await range("gvTarget", 0.95); await has("gvTargetOut", "0,95"); await range("gvObs", 30); await has("gvObsOut", "30");
      await noOverflow("güvenirlik");
      await reset(); await has("gvAlpha", "0,787 · 0,783"); await has("atCorr", "0,613"); ok((await page.inputValue("#gvSeed")) === "1", "tohum sıfırlandı");
      // sekme klavyesi
      await page.locator("#tab-gv").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-nr").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-gc").getAttribute("aria-selected")) === "true", "ArrowRight"); ok(await page.locator("#panel-gv").isHidden(), "tek panel");
      // 2 · geçerlik
      await has("gcVal", "0,508 · 0,500"); await has("gcHtmm", "0,322 · 0,295"); await has("gcHthm", "0,128 · 0,095"); await has("gcCrit", "9 / 9"); await has("gcCrit", "4 / 6 üçgen");
      await has("selAll", "0,465"); await has("selSel", "0,235"); await has("selN", "150");
      for (const id of ["gcMatrix", "selChart"]) ok((await inked(id)) > 0.004, `${id} çizili`);
      await page.click("#gcMethod"); await has("gcCrit", "Sağlanmıyor — 3"); await has("gcStatus", "Yöntem varyansı"); await has("gcVal", "0,248 · 0,250");
      await page.click("#gcBlur"); await has("gcStatus", "çok yüksek"); await sel("gcView", "pop"); await has("gcVal", "0,500 · 0,500"); await has("gcCrit", "36 / 36");
      await range("gcTau", 0.9); await range("gcMu", 0.4); await has("gcMuOut", "0,05"); await has("gcStatus", "0,95'i aşamaz");
      await range("selQ", 1); await has("selN", "500"); await has("selSel", "0,465");
      await noOverflow("geçerlik");
      await reset(); await has("gcVal", "0,508 · 0,500"); await has("selSel", "0,235");
      // 3 · faktör analizi
      await page.click("#tab-fa"); await has("faPos", "15 / 15"); await has("faRmsr", "0,0284"); await has("faTet", "0,0381"); await has("faStatus", "0,958, 0,882, 0,803, 0,750, 0,673, 0,646"); await has("faStatus", "daha küçüktür (%62,9)"); await has("faLoad", "%62,9"); await has("faLoad", "0,917");
      ok(await page.locator("#faPhiBox").isHidden(), "Spearman'da φ yok");
      for (const id of ["faMatrix", "faScree", "faPlane"]) ok((await inked(id)) > 0.004, `${id} çizili`);
      await sel("faNf", "2"); await has("faRmsr", "0,0136"); await has("faStatus", "22 kişiyle");
      await sel("faData", "two"); ok(await page.locator("#faPhiBox").isVisible(), "φ görünür"); await has("faRmsr", "0,0124"); await has("faLoad", "0,803"); await has("faStatus", "2 faktörü");
      await sel("faRot", "none"); await has("faStatus", "Döndürmesiz"); await has("faRmsr", "0,0124");
      await sel("faNf", "1"); await has("faRmsr", "0,1542"); await has("faStatus", "olumlu yığılım tek bir genel faktör gerektirmez");
      await sel("faData", "one"); await has("faStatus", "0,94, 0,77, 0,74, 0,61, 0,54, 0,38"); await range("faPhi", 0.9);
      await noOverflow("faktör analizi");
      await reset(); await has("faRmsr", "0,0284"); ok((await page.inputValue("#faData")) === "spearman", "veri sıfırlandı");
      // 4 · madde tepki kuramı
      await page.click("#tab-mt"); await has("mtP", "%73,1 · %28,9 · %28,9"); await has("mtI", "0,197 · 0,666 · 0,074"); await has("mtSe", "0,936 → 1,03");
      ok(await page.locator("#mtC").isDisabled(), "2PL'de c kapalı");
      await has("catEst", "1,81 ± 0,30"); await has("catEstD", "19 madde"); await has("catFix", "1,36 ± 0,46"); ok((await page.locator("#catTable tr").count()) === 19, "19 satır");
      for (const id of ["mtIcc", "mtInfo", "catChart"]) ok((await inked(id)) > 0.004, `${id} çizili`);
      await sel("mtModel", "3pl"); await sel("mtItem", "2"); await has("mtBOut", "1,50"); await has("mtCOut", "0,20"); await has("mtP", "%43,1"); await has("mtID", "θ = 1,95"); await has("mtSe", "0,902 → 1,05");
      await range("mtB", 0); await has("mtBOut", "0,00"); await sel("mtItem", "0"); await has("mtBOut", "−1,00"); await sel("mtItem", "2"); await has("mtBOut", "0,00");
      await sel("mtModel", "1pl"); ok(await page.locator("#mtA").isDisabled(), "1PL'de a kapalı"); await has("mtAOut", "1,00");
      await range("mtTheta", 3); await has("mtThetaOut", "3,0");
      await page.click("#catRunBatch"); await has("catBatch", "0,347 · 0,555"); await has("catBatchD", "20,4 madde");
      await range("catTheta", 0); await has("catEst", "0,02 ± 0,30"); await has("catBatch", "—"); await page.click("#catRunBatch"); await has("catBatch", "0,251 · 0,250");
      await page.click("#catNext"); ok((await page.inputValue("#catSeed")) === "2", "yeni katılımcı");
      await sel("catMax", "10"); await has("catStatus", "sınırına ulaşıldı"); ok((await page.locator("#catTable tr").count()) <= 10, "en çok 10");
      await noOverflow("madde tepki");
      await reset(); await has("mtP", "%73,1 · %28,9 · %28,9"); await has("catEst", "1,81 ± 0,30"); ok((await page.inputValue("#mtModel")) === "2pl", "model sıfırlandı");
      // 5 · normlar
      await page.click("#tab-nr"); await has("nrZ", "1,51"); await has("nrT", "65,1 · 122,6"); await has("nrSta", "8"); await has("nrPct", "%93,4"); await has("nrEmp", "%93,0"); await has("nrMs", "30,07 · 5,93"); await has("nrStatus", "normale yakın");
      await has("flMean", "109,0"); await has("flAbove", "%8,08 · %2,28"); await has("flInfl", "+9,0 puan");
      for (const id of ["nrCurve", "flChart"]) ok((await inked(id)) > 0.004, `${id} çizili`);
      await sel("nrShape", "skew"); await has("nrEmp", "%99,4"); await has("nrStatus", "yüzdelik sırası (altında kalanlar + eşitlerin yarısı) %99,4"); await has("nrPct", "%93,2"); await has("nrStatus", "yanıltır");
      await range("flGain", -1); await has("flMean", "97,0"); await has("flAbove", "%1,39"); await range("flY", 1990); await has("flInfl", "0,0 puan");
      await range("nrX", 0); await has("nrSta", "1"); await range("nrX", 100); await has("nrSta", "9");
      await noOverflow("normlar");
      await reset(); await has("nrZ", "1,51"); await has("flMean", "109,0");
      ok(await page.evaluate(() => Object.keys(localStorage).every((k) => /^acelya-/.test(k))), "ayar saklanmıyor");
      await page.waitForSelector(".digest", { state: "attached", timeout: 15000 }); await page.locator(".digest").first().scrollIntoViewIfNeeded(); ok(await page.locator(".digest").first().isVisible(), "Keşif Defteri görünür");
      assert.deepEqual(sent, [], "ağ isteği yok"); checks++;
      ok(await page.evaluate(() => Object.isFrozen(PsychometricsLab) && !Object.getOwnPropertyDescriptor(window, "PsychometricsLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G psikometri: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS (Keşif Defteri görünür)`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
