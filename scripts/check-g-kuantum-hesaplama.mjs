// G · kuantum-hesaplama.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// Pauli matrislerinden üstel biçimle kurulan kapılar (küresel evreye kadar), SU(2) → SO(3) eşlemesi R_ij = ½ Tr(σ_i U σ_j U†),
// eleman formülüyle kurulan tam devre matrisleri ve onlarla yoğun çarpım, ara ölçümlü devrelerde çok tohumlu Monte Carlo,
// Φ⁺ ve tekli durumun kapalı biçimli bağıntıları cos(a − b), rastgele çarpım durumlarında |S| ≤ 2, ikili entropi formülü,
// Deutsch–Jozsa için bütün fonksiyonların sayımı ve 2⁻ⁿ Σ(−1)^f toplamı, Grover için yoğun yineleme matrisi ve
// genliklerin kapalı biçimi, klasik arama beklentisinin hipergeometrik toplamı, gürültü için yoğunluk matrisi evrimi.
// Kullanım: node scripts/check-g-kuantum-hesaplama.mjs [--browser] [--dump]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "kuantum-hesaplama";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.QuantumLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1e-300, Math.abs(b)), `${label} ${a} ≠ ${b} (göreli ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };

/* ── Kabuk ── */
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(/<body class="app-page" data-page="kuantum-hesaplama">/.test(html), "data-page");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Kuantum Hesaplama: ") && [...title].length <= 80, "başlık biçimi ve uzunluğu");
ok(/name="description"/.test(html) && /shared\/theme\.css/.test(html) && /shared\/app\.js/.test(html), "meta, theme.css, app.js");
ok(!/fonts\.googleapis|cdn\.|unpkg|jsdelivr|<script src="http/.test(html), "CDN yok");
ok(!/[̀-ͯ⃗]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}☀-➿]/u.test(html), "emoji yok");
ok(!/type="number"/.test(html), "type=number yok");
ok(!/siyah çizgi/.test(html) && /ince düşey çizgi: ±1σ/.test(html), "hata çubuğu açıklaması temaya bağlı renk adı vermez");
ok(/ölçümlerin yaklaşık üçte ikisi kuramın 1σ yakınına/.test(html), "1σ cümlesi doğru");
ok(!/body\s*\{[^}]*overflow\s*:\s*hidden/.test(html), "body overflow:hidden yok");
for (const l of ["elektromanyetik-dalgalar-ve-polarizasyon", "kuantum-mekanigi", "lineer-cebir-ve-ozdegerler", "algoritma-karmasikligi", "hesaplama-teorisi", "asal-rsa"]) ok(fs.existsSync(new URL(`../${l}.html`, import.meta.url)) && html.includes(`href="${l}.html"`), "bağlantı " + l);

/* ── Bağımsız karmaşık matris aracı ── */
const C = (r, i = 0) => ({ r, i });
const mul = (a, b) => C(a.r * b.r - a.i * b.i, a.r * b.i + a.i * b.r), add = (a, b) => C(a.r + b.r, a.i + b.i), conj = (a) => C(a.r, -a.i), sc = (a, k) => C(a.r * k, a.i * k);
const mm = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((s, a, k) => add(s, mul(a, B[k][j])), C(0))));
const dag = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const tr = (A) => A.reduce((s, row, i) => add(s, row[i]), C(0));
const fromK = (M) => M.map((row) => row.map(([r, i]) => C(r, i)));
const I2 = [[C(1), C(0)], [C(0), C(1)]], SX = [[C(0), C(1)], [C(1), C(0)]], SY = [[C(0), C(0, -1)], [C(0, 1), C(0)]], SZ = [[C(1), C(0)], [C(0), C(-1)]];
const expRot = (n, a) => I2.map((row, i) => row.map((_, j) => add(sc(I2[i][j], Math.cos(a / 2)), mul(C(0, -Math.sin(a / 2)), add(add(sc(SX[i][j], n[0]), sc(SY[i][j], n[1])), sc(SZ[i][j], n[2]))))));
function equalUpToPhase(A, B, tol = 1e-12) { // A = e^{iγ} B
  let ph = null; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) if (Math.hypot(B[i][j].r, B[i][j].i) > 0.1) { const b = B[i][j], a = A[i][j], d = b.r * b.r + b.i * b.i; ph = C((a.r * b.r + a.i * b.i) / d, (a.i * b.r - a.r * b.i) / d); }
  if (Math.abs(Math.hypot(ph.r, ph.i) - 1) > tol) return false;
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const z = mul(ph, B[i][j]); if (Math.hypot(z.r - A[i][j].r, z.i - A[i][j].i) > tol) return false; }
  return true;
}
const r2 = Math.SQRT1_2;
const AX = { X: [[1, 0, 0], Math.PI], Y: [[0, 1, 0], Math.PI], Z: [[0, 0, 1], Math.PI], H: [[r2, 0, r2], Math.PI], S: [[0, 0, 1], Math.PI / 2], T: [[0, 0, 1], Math.PI / 4] };
function so3(U) { const P = [SX, SY, SZ]; return P.map((a) => P.map((b) => tr(mm(mm(a, U), mm(b, dag(U)))).r / 2)); }
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; } // bağımsız LCG

/* ── 1 · Tek kübit ── */
{
  for (const [g, [n, a]] of Object.entries(AX)) ok(equalUpToPhase(fromK(K.gate(g)), expRot(n, a)), `${g} = e^{iγ} R_n(${a})`);
  for (const th of [-3, -1, 0, 0.4, 1.7, Math.PI]) for (const [g, n] of [["Rx", [1, 0, 0]], ["Ry", [0, 1, 0]], ["Rz", [0, 0, 1]]]) { const A = fromK(K.gate(g, th)), B = expRot(n, th); A.forEach((row, i) => row.forEach((z, j) => abs(Math.hypot(z.r - B[i][j].r, z.i - B[i][j].i), 0, 1e-14, `${g}(${th}) tam eşit`))); }
  // birimsellik ve cebir: HZH = X, S² = Z, T² = S, HXH = Z
  const G = (g) => fromK(K.gate(g)); const close = (A, B) => A.every((row, i) => row.every((z, j) => Math.hypot(z.r - B[i][j].r, z.i - B[i][j].i) < 1e-14));
  ok(close(mm(mm(G("H"), G("Z")), G("H")), G("X")), "HZH = X"); ok(close(mm(G("S"), G("S")), G("Z")), "S² = Z"); ok(close(mm(G("T"), G("T")), G("S")), "T² = S"); ok(close(mm(mm(G("H"), G("X")), G("H")), G("Z")), "HXH = Z");
  for (const g of ["X", "Y", "Z", "H", "S", "T"]) ok(close(mm(G(g), dag(G(g))), I2), g + " birimsel");
  // Bilinen durumlar
  const v = (seq, th = 0, ph = 0) => K.runSingle(th, ph, seq).vm.at(-1);
  const vclose = (a, b) => a.every((x, i) => Math.abs(x - b[i]) < 1e-14);
  ok(vclose(v([{ g: "H" }]), [1, 0, 0]), "H|0⟩ = |+⟩"); ok(vclose(v([{ g: "H" }, { g: "S" }]), [0, 1, 0]), "SH|0⟩ = |+i⟩");
  ok(vclose(v([{ g: "H" }, { g: "T" }]), [r2, r2, 0]), "TH|0⟩ φ = 45°"); ok(vclose(v([{ g: "X" }]), [0, 0, -1]), "X|0⟩ = |1⟩");
  ok(vclose(v([{ g: "H" }, { g: "Z" }, { g: "H" }]), [0, 0, -1]), "HZH|0⟩ = |1⟩");
  // Rastgele diziler: çekirdeğin iki yolu ve bağımsız SO(3) eşlemesi
  const r = rng(11), names = ["X", "Y", "Z", "H", "S", "T", "Rx", "Ry", "Rz"];
  for (let t = 0; t < 300; t++) {
    const seq = [], L = 1 + Math.floor(r() * 24); for (let i = 0; i < L; i++) { const g = names[Math.floor(r() * 9)]; seq.push(g[0] === "R" ? { g, theta: (r() * 2 - 1) * Math.PI } : { g }); }
    const th = r() * Math.PI, ph = r() * 2 * Math.PI, run = K.runSingle(th, ph, seq);
    let U = I2; for (const s of seq) U = mm(fromK(K.gate(s.g, s.theta || 0)), U);
    const R = so3(U), v0 = [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)], vExp = R.map((row) => row.reduce((s, x, j) => s + x * v0[j], 0));
    run.vm.at(-1).forEach((x, i) => abs(x, vExp[i], 1e-12, "SO(3) eşlemesi"));
    ok(run.dev < 1e-12, "matris ve dönme yolu uyuşur"); abs(run.norm, 1, 1e-12, "norm");
    // Taban olasılıkları: doğrudan iç çarpım
    const psi = run.psi.map(([a, b]) => C(a, b)), ip = (k0, k1) => { const z = add(mul(conj(k0), psi[0]), mul(conj(k1), psi[1])); return z.r * z.r + z.i * z.i; };
    const ref = { Z: ip(C(1), C(0)), X: ip(C(r2), C(r2)), Y: ip(C(r2), C(0, r2)) };
    for (const b of ["X", "Y", "Z"]) { abs(K.basisProb(run.psi, b), ref[b], 1e-12, "taban " + b); abs(K.basisProbBloch(run.vm.at(-1), b), ref[b], 1e-12, "Bloch taban " + b); }
  }
  // Tohumlu atışlar: 400 tohumda ortalama ve varyans
  for (const [p, N] of [[0.5, 1000], [0.146, 1000], [0.9, 100]]) {
    let s = 0, s2 = 0; for (let seed = 1; seed <= 400; seed++) { const k = K.sampleCount(p, N, seed); s += k; s2 += k * k; }
    const m = s / 400, vv = s2 / 400 - m * m; abs(m, p * N, 4 * Math.sqrt(p * (1 - p) * N / 400), "binom ortalama"); near(vv, p * (1 - p) * N, 0.2, "binom varyans");
  }
  ok(K.sampleCount(1, 1000, 3) === 1000 && K.sampleCount(0, 1000, 3) === 0, "kesin sonuçlar");
}

/* ── 2 · Devre benzeticisi ── */
function denseMat(n, st, outcome) { // eleman formülüyle, Kronecker kullanmadan
  const N = 1 << n, bit = (i, q) => (i >> (n - 1 - q)) & 1, M = Array.from({ length: N }, () => Array.from({ length: N }, () => C(0)));
  const others = (i, j, qs) => { for (let q = 0; q < n; q++) if (!qs.includes(q) && bit(i, q) !== bit(j, q)) return false; return true; };
  const U = { H: [[C(r2), C(r2)], [C(r2), C(-r2)]], X: SX, Y: SY, Z: SZ, S: [[C(1), C(0)], [C(0), C(0, 1)]], T: [[C(1), C(0)], [C(0), C(r2, r2)]] };
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    if (U[st.g]) { if (others(i, j, [st.t])) M[i][j] = U[st.g][bit(i, st.t)][bit(j, st.t)]; }
    else if (st.g === "CNOT") { const jj = bit(j, st.c) ? j ^ (1 << (n - 1 - st.t)) : j; if (i === jj) M[i][j] = C(1); }
    else if (st.g === "CZ") { if (i === j) M[i][j] = C(bit(i, st.c) && bit(i, st.t) ? -1 : 1); }
    else if (st.g === "SWAP") { const a = bit(j, st.t), b = bit(j, st.c); let jj = j; if (a !== b) jj = j ^ (1 << (n - 1 - st.t)) ^ (1 << (n - 1 - st.c)); if (i === jj) M[i][j] = C(1); }
    else if (st.g === "M") { if (i === j && bit(i, st.t) === outcome) M[i][j] = C(1); }
  }
  return M;
}
function denseRun(n, steps, outcomes) {
  let v = Array.from({ length: 1 << n }, (_, i) => C(i === 0 ? 1 : 0));
  steps.forEach((st, k) => { const M = denseMat(n, st, outcomes[k]); v = M.map((row) => row.reduce((s, z, j) => add(s, mul(z, v[j])), C(0))); if (st.g === "M") { const nr = Math.sqrt(v.reduce((s, z) => s + z.r * z.r + z.i * z.i, 0)); v = v.map((z) => sc(z, 1 / nr)); } });
  return v;
}
function randomCircuit(n, L, r, withM) {
  const G = withM ? ["H", "X", "Z", "CNOT", "CZ", "SWAP", "M"] : ["H", "X", "Z", "Y", "S", "T", "CNOT", "CZ", "SWAP"], out = [];
  for (let i = 0; i < L; i++) { const g = G[Math.floor(r() * G.length)], t = Math.floor(r() * n); let c = Math.floor(r() * (n - 1)); if (c >= t) c++; out.push(["CNOT", "CZ", "SWAP"].includes(g) ? { g, t, c } : { g, t }); }
  return out;
}
{
  const r = rng(5);
  for (let t = 0; t < 120; t++) {
    const n = 2 + (t % 2), steps = randomCircuit(n, 1 + Math.floor(r() * 14), r, t % 3 === 0), run = K.runCircuit(n, steps, 1 + t), ref = denseRun(n, steps, run.outcomes);
    ref.forEach((z, i) => abs(Math.hypot(z.r - run.state.re[i], z.i - run.state.im[i]), 0, 1e-12, "devre durumu"));
    const chk = K.denseCheck(n, steps, run); ok(chk.dev < 1e-12 && chk.unit < 1e-12, "çekirdeğin kendi denetimi");
  }
  // Ara ölçümlü devrelerde kesin dağılım ↔ çok tohumlu Monte Carlo
  for (const [n, steps] of [[2, [{ g: "H", t: 0 }, { g: "CNOT", c: 0, t: 1 }, { g: "M", t: 0 }, { g: "H", t: 1 }]], [3, [{ g: "H", t: 0 }, { g: "H", t: 1 }, { g: "M", t: 1 }, { g: "CNOT", c: 1, t: 2 }, { g: "H", t: 1 }, { g: "CZ", c: 0, t: 2 }, { g: "H", t: 2 }]]]) {
    const P = K.exactProbs(n, steps), cnt = new Array(1 << n).fill(0), T = 20000;
    for (let s = 1; s <= T; s++) { const st = K.runCircuit(n, steps, s).state, u = (s * 0.6180339887498949) % 1; let acc = 0; for (let i = 0; i < st.re.length; i++) { acc += st.re[i] ** 2 + st.im[i] ** 2; if (u < acc || i === st.re.length - 1) { cnt[i]++; break; } } }
    P.forEach((p, i) => abs(cnt[i] / T, p, 5 * Math.sqrt(p * (1 - p) / T) + 1e-9, "ara ölçüm dağılımı"));
    abs(P.reduce((a, b) => a + b, 0), 1, 1e-12, "olasılık toplamı");
    const c = K.circuitShots(n, steps, 10000, 3); P.forEach((p, i) => abs(c[i] / 10000, p, 5 * Math.sqrt(p * (1 - p) / 10000) + 1e-9, "atış sayımı"));
  }
  // Dolanıklık: Ry(θ) q0, CNOT → entropi H₂(cos²(θ/2))
  for (const th of [0, 0.3, 1, Math.PI / 2, 2.5, Math.PI]) {
    const s = K.qstate(2); K.apply1q(s, 0, K.gate("Ry", th)); K.applyCtrl(s, 0, 1, K.gate("X"));
    const p = Math.cos(th / 2) ** 2, h = [p, 1 - p].reduce((a, x) => a - (x > 0 ? x * Math.log2(x) : 0), 0), e = K.entanglement(s);
    abs(e.entropy, h, 1e-9, "dolanıklık entropisi"); abs(e.purity, p * p + (1 - p) ** 2, 1e-12, "saflık");
  }
  const ghz = K.runCircuit(3, [{ g: "H", t: 0 }, { g: "CNOT", c: 0, t: 1 }, { g: "CNOT", c: 1, t: 2 }]).state; abs(K.entanglement(ghz).entropy, 1, 1e-12, "GHZ entropi");
  abs(K.entanglement(K.runCircuit(2, [{ g: "H", t: 0 }, { g: "H", t: 1 }]).state).entropy, 0, 1e-12, "çarpım durumu entropi 0");
  ok(K.checkStep(2, { g: "CNOT", t: 1, c: 1 }) && K.checkStep(2, { g: "H", t: 2 }) && !K.checkStep(3, { g: "SWAP", t: 0, c: 2 }), "adım doğrulama");
  // Bell bağıntıları: kapalı biçimler
  const bell = [{ g: "H", t: 0 }, { g: "CNOT", c: 0, t: 1 }], singlet = [{ g: "X", t: 1 }, { g: "H", t: 0 }, { g: "CNOT", c: 0, t: 1 }, { g: "Z", t: 0 }];
  for (let t = 0; t < 40; t++) { const a = (r() * 2 - 1) * Math.PI, b = (r() * 2 - 1) * Math.PI; abs(K.corrExact(2, bell, a, b), Math.cos(a - b), 1e-12, "Φ⁺ cos(a − b)"); abs(K.corrExact(2, singlet, a, b), -Math.cos(a - b), 1e-12, "Ψ⁻ −cos(a − b)"); abs(K.corrExact(2, [...bell, { g: "M", t: 0 }], a, b), Math.cos(a) * Math.cos(b), 1e-12, "ölçülmüş Bell cos a cos b"); }
  const best = { a: 0, a2: Math.PI / 2, b: Math.PI / 4, b2: -Math.PI / 4 };
  abs(K.chsh(2, bell, best, 100, 1).Sth, 2 * Math.SQRT2, 1e-12, "Tsirelson"); abs(K.chsh(2, singlet, best, 100, 1).Sth, -2 * Math.SQRT2, 1e-12, "tekli −2√2");
  // Rastgele çarpım durumları: |S| ≤ 2 (bağımsız: tek kübit dönmeleriyle hazırlanır, açılar rastgele)
  let maxS = 0;
  for (let t = 0; t < 300; t++) {
    // çarpım durumu, Bloch vektörlerinden kapalı biçim: E = (sin a·x₀ + cos a·z₀)(sin b·x₁ + cos b·z₁)
    const ang = { a: r() * 6.3, a2: r() * 6.3, b: r() * 6.3, b2: r() * 6.3 }, v = [0, 1].map(() => { const th = r() * Math.PI, ph = r() * 6.3; return [Math.sin(th) * Math.cos(ph), Math.cos(th)]; });
    const E = (x, y) => (Math.sin(x) * v[0][0] + Math.cos(x) * v[0][1]) * (Math.sin(y) * v[1][0] + Math.cos(y) * v[1][1]);
    maxS = Math.max(maxS, Math.abs(E(ang.a, ang.b) + E(ang.a, ang.b2) + E(ang.a2, ang.b) - E(ang.a2, ang.b2)));
  }
  ok(maxS <= 2 + 1e-12, "çarpım durumu |S| ≤ 2 (başvuru)");
  for (const steps of [[{ g: "H", t: 0 }, { g: "H", t: 1 }], [{ g: "X", t: 0 }, { g: "H", t: 1 }], [...bell, { g: "M", t: 1 }]]) for (let t = 0; t < 30; t++) { const ang = { a: r() * 6.3, a2: r() * 6.3, b: r() * 6.3, b2: r() * 6.3 }; ok(Math.abs(K.chsh(2, steps, ang, 10, 1).Sth) <= 2 + 1e-12, "dolanık olmayan devre |S| ≤ 2"); }
  // Ölçülen S: 200 tohumda ortalama ve dağılım
  { let s = 0, s2 = 0, sd = 0; const T = 200; for (let seed = 1; seed <= T; seed++) { const c = K.chsh(2, bell, best, 1000, seed); s += c.S; s2 += c.S * c.S; sd += c.sS; } const m = s / T, emp = Math.sqrt(s2 / T - m * m); abs(m, 2 * Math.SQRT2, 4 * emp / Math.sqrt(T), "ortalama S"); near(sd / T, emp, 0.15, "σ(S) tahmini ~ gözlenen dağılım"); }
}

/* ── 3 · Deutsch–Jozsa ── */
{
  const binom = (n, k) => { let v = 1; for (let i = 1; i <= k; i++) v = v * (n - k + i) / i; return v; };
  for (let n = 1; n <= 4; n++) {
    const N = 1 << n, sv = K.djSurvey(n);
    ok(sv.count === 2 + binom(N, N / 2), `n=${n} fonksiyon sayısı`); ok(sv.maxQ === N / 2 + 1, `n=${n} klasik en kötü 2ⁿ⁻¹+1`); ok(sv.errors === 0, "hatasız");
    abs(sv.minConst, 1, 1e-12, "sabitte P = 1"); abs(sv.maxBal, 0, 1e-12, "dengelide P = 0");
    for (const kind of ["const0", "const1", "parity", "lsb", "msb", "random"]) {
      const f = K.djOracle(kind, n, 3), run = K.djRun(n, f); let sum = 0, ones = 0; for (const v of f) { sum += v ? -1 : 1; ones += v; }
      ok(kind.startsWith("const") ? ones === 0 || ones === N : ones === N / 2, `${kind} vaadi tutar`);
      abs(run.pZero, (sum / N) ** 2, 1e-12, "P(0…0) = (2⁻ⁿ Σ(−1)^f)²"); abs(run.residual, 0, 1e-12, "yardımcı kübit |−⟩'de kalır");
      // Aşama 2 genlikleri (−1)^f/√N, aşama 3 Walsh–Hadamard dönüşümü
      for (let x = 0; x < N; x++) { abs(run.stages[2].re[x], (f[x] ? -1 : 1) / Math.sqrt(N), 1e-12, "faz geri tepmesi");
        let w = 0; for (let y = 0; y < N; y++) { let d = 0, z = x & y; while (z) { d ^= z & 1; z >>= 1; } w += (f[y] ? -1 : 1) * (d ? -1 : 1); } abs(run.stages[3].re[x], w / N, 1e-12, "Walsh–Hadamard"); }
      // klasik sıralı algoritma: kendi döngümüzle
      let q = 1; while (q < N / 2 + 1 && f[q] === f[0]) q++; const expQ = q < N / 2 + 1 ? q + 1 : N / 2 + 1; ok(K.djClassical(f).queries === Math.min(expQ, N / 2 + 1), "klasik sorgu sayısı");
    }
  }
  ok(K.djClassical(K.djOracle("msb", 4)).queries === 9, "ilk bit fonksiyonu en kötü durum");
}

/* ── 4 · Grover ── */
{
  for (const [n, t, M] of [[2, 2, 1], [3, 5, 1], [3, 1, 2], [4, 7, 3], [5, 13, 1], [5, 0, 4], [4, 3, 8]]) {
    const N = 1 << n, marked = K.groverMarked(n, t, M); ok(new Set(marked).size === M && marked.includes(t), "işaretli küme");
    const run = K.groverRun(n, marked, 60), mk = new Set(marked);
    // Yoğun matris: G = (2|s⟩⟨s| − I)·O
    const G = Array.from({ length: N }, (_, i) => Array.from({ length: N }, (_, j) => (2 / N - (i === j ? 1 : 0)) * (mk.has(j) ? -1 : 1)));
    let v = Array(N).fill(1 / Math.sqrt(N)); const th = Math.asin(Math.sqrt(M / N));
    for (let k = 0; k <= 60; k++) {
      if (k) v = G.map((row) => row.reduce((s, g, j) => s + g * v[j], 0));
      v.forEach((x, i) => abs(run.amps[k][i], x, 1e-10, "yoğun yineleme genliği"));
      for (let i = 0; i < N; i++) abs(Math.abs(run.amps[k][i]), Math.abs(mk.has(i) ? Math.sin((2 * k + 1) * th) / Math.sqrt(M) : Math.cos((2 * k + 1) * th) / Math.sqrt(N - M)), 1e-10, "kapalı biçim genlik");
      abs(run.P[k], K.groverTheory(N, M, k), 1e-10, "P(k)");
    }
    ok(run.imagMax < 1e-12, "genlikler gerçel");
    const peak = K.firstPeak(run.P), kopt = K.groverOpt(N, M);
    if (2 * M < N) { let best = 0; for (let k = 0; k <= kopt + 2; k++) if (run.P[k] > run.P[best] + 1e-12) best = k; ok(peak === best && kopt === best, `ilk tepe = ⌊π/4θ⌋ (N=${N}, M=${M})`); } else ok(peak === null, "M = N/2: P sabit");
    // Klasik arama: hipergeometrik beklenti Σ_t P(T > t)
    let E = 0, surv = 1; for (let s = 0; s <= N - M; s++) { E += surv; surv *= (N - M - s) / (N - s); }
    near(E, (N + 1) / (M + 1), 1e-12, "hipergeometrik beklenti"); const cl = K.classicalSearch(N, marked, 4000, 7); abs(cl.mean, E, 4 * cl.sdMean, "klasik ortalama");
  }
  near(K.groverTheory(4, 1, 1), 1, 1e-12, "N = 4 tek adım"); ok(K.groverOpt(256, 1) === 12 && K.groverOpt(32, 1) === 4, "k_en iyi");
  // Gürültü: 3 kübitte yoğunluk matrisi ρ → (1 − p)GρG† + p·I/N, çok tohumlu atış ortalamasıyla
  for (const [n, M, k, p] of [[3, 1, 2, 0.1], [3, 2, 5, 0.05], [4, 1, 3, 0.2]]) {
    const N = 1 << n, marked = K.groverMarked(n, 1, M), mk = new Set(marked);
    const G = Array.from({ length: N }, (_, i) => Array.from({ length: N }, (_, j) => (2 / N - (i === j ? 1 : 0)) * (mk.has(j) ? -1 : 1)));
    let rho = Array.from({ length: N }, () => Array(N).fill(1 / N));
    for (let j = 0; j < k; j++) { const GR = G.map((row) => rho[0].map((_, c) => row.reduce((s, g, m) => s + g * rho[m][c], 0))); rho = GR.map((row, a) => row.map((_, b) => (1 - p) * row.reduce((s, x, m) => s + x * G[b][m], 0) + (a === b ? p / N : 0))); }
    const Pref = marked.reduce((s, i) => s + rho[i][i], 0); near(K.groverNoisy(N, M, k, p), Pref, 1e-10, "gürültü formülü = yoğunluk matrisi");
    const Pk = K.groverRun(n, marked, k).P[k]; let hits = 0; const T = 60, shots = 2000; for (let s = 1; s <= T; s++) hits += K.groverShots(n, marked, k, p, shots, s, Pk);
    abs(hits / (T * shots), Pref, 4 * Math.sqrt(Pref * (1 - Pref) / (T * shots)), "gürültülü atışlar");
  }
}
console.log(`G ${SLUG}: ${checks} çekirdek kontrolü PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  ok(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`, import.meta.url)), "defter dosyası var"); // her 404 hata sayılır
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
      const select = async (id, v) => { await page.locator("#" + id).selectOption(String(v)); await page.waitForTimeout(150); };
      const click = async (id) => { await page.click("#" + id); await page.waitForTimeout(150); };
      const noOverflow = async (label) => ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "yatay taşma yok: " + label);
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("main input,main select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id));
      ok(unlabeled.length === 0, "etiketsiz denetim: " + unlabeled.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-6; })), "varsayılanlar adım ızgarasında");
      ok(await page.evaluate(() => Object.isFrozen(window.QuantumLab) && !Object.getOwnPropertyDescriptor(window, "QuantumLab").writable), "çekirdek dondurulmuş (tarayıcı)");
      if (process.argv.includes("--dump")) {
        for (const t of ["bloch", "circ", "dj", "gr"]) { await click("tab-" + t); console.log("== " + t, JSON.stringify(await page.evaluate((t) => Object.fromEntries([...document.querySelectorAll(`#panel-${t} strong[id], #panel-${t} output, #panel-${t} .qc-status, #panel-${t} .qc-seq`)].map((e) => [e.id, e.textContent])), t), null, 1)); }
        await click("tab-bloch");
      }
      // 1 · Kübit
      await has("blSeq", "henüz kapı yok"); await has("blAlpha", "1,0000"); await has("blVecM", "(0,0000; 0,0000; 1,0000)"); await has("blN0", "1000 / 1000"); await has("blZ", "σ = 0");
      await click("blgH"); await has("blVecM", "(1,0000; 0,0000; 0,0000)"); await has("blBeta", "0,7071"); await has("blProbs", "0,5000 ; 0,5000"); await has("blF", "0,5050"); await has("blZ", "+0,32");
      await click("blgT"); await has("blVecR", "(0,7071; 0,7071; 0,0000)"); await has("blAngles", "90,0° ; 45,0°"); await has("blBeta", "0,5000 + 0,5000i");
      await select("blBasis", "X"); await has("blPth", "0,8536"); await select("blBasis", "Y"); await has("blPth", "0,8536");
      await click("blSeed"); await has("blMeasStatus", "tohum 2");
      await range("blAng", -180); await has("blAngOut", "−180°"); await click("blgRx"); await has("blSeq", "Rx(−180°)");
      await click("blUndo"); await has("blCount", "2 / 24");
      for (let i = 0; i < 22; i++) await page.locator("#blgS").click(); await has("blCount", "24 / 24"); ok(await page.locator("#blgX").isDisabled(), "en çok 24 kapı"); ok((await read("blDev")).includes("10⁻") || (await read("blDev")) === "0", "24 kapıda sapma yuvarlama düzeyinde");
      await click("blClear"); await range("blTh0", 180); await has("blVecM", "−1,0000)"); await range("blTh0", 90); await range("blPh0", 359); await has("blPh0Out", "359°");
      await click("blPlus"); await has("blPth", "1,0000"); await has("blMeasStatus", "öz durumunda"); await click("blPlusI"); await has("blPth", "1,0000"); await click("blHZH"); await has("blVecM", "(0,0000; 0,0000; −1,0000)");
      await click("blHT"); await has("blPth", "0,5000"); await has("blStatus", "φ yalnız X ve Y");
      await page.locator("#blSphere").focus(); await page.keyboard.press("ArrowRight"); await has("blAzOut", "−30°"); await page.keyboard.press("ArrowUp"); await has("blElOut", "25°");
      await click("blReset"); await has("blAzOut", "−35°"); await has("blSeq", "henüz kapı yok"); await has("blN0", "1000 / 1000"); await noOverflow("kübit");
      // 2 · Devre
      await click("tab-circ"); await page.waitForTimeout(300);
      await has("cxList", "H(q0) · CNOT(q0→q1)"); await has("cxDev", "0"); await has("cxPur", "0,5000"); await has("cxEnt", "1,0000 bit"); await has("chS", "+2,896 ± 0,044"); await has("chSth", "+2,8284"); await has("chSig", "+20,5 σ");
      ok((await page.locator("#cxTable tr").count()) === 4, "4 satır");
      await click("cxSinglet"); await has("chSth", "−2,8284"); await click("cxProd"); await has("cxEnt", "0,0000 bit"); await has("chStatus", "dolanık değil");
      await click("cxMeasB"); await has("chSth", "+1,4142"); await has("cxStatus", "ara ölçüm"); await has("chStatus", "Ara ölçüm dolanıklığı bozdu");
      await click("cxGhz"); await has("cxDim", "8 genlik"); ok((await page.locator("#cxTable tr").count()) === 8, "8 satır"); await has("cxEnt", "1,0000 bit"); await has("chStatus", "q2 ölçülmüyor");
      await select("cxN", "2"); await has("cxList", "H(q0) · CNOT(q0→q1)"); // q2 adımı düşer
      await click("cxSwap3"); await has("cxTable", "|01⟩"); ok((await page.locator("#cxTable tr:nth-child(2) td:nth-child(3)").textContent()) === "1,0000", "SWAP sonucu |01⟩");
      await click("cxClear"); await has("cxList", "yok"); await select("cxGate", "CNOT"); await select("cxT", "1"); await select("cxC", "1"); await has("cxMsg", "aynı kübit"); ok(await page.locator("#cxAdd").isDisabled(), "geçersiz adım eklenemez");
      await select("cxC", "0"); await select("cxGate", "H"); await select("cxT", "0"); await click("cxAdd"); await select("cxGate", "CNOT"); await select("cxT", "1"); await click("cxAdd"); await has("cxList", "H(q0) · CNOT(q0→q1)");
      await click("chSame"); await has("chSth", "+2,0000"); await click("chOpt"); await range("chB2", 45); await has("chB2Out", "45°");
      await click("cxPop"); await has("cxList", "H(q0)"); await click("cxSeed");
      await click("cxReset"); await has("chS", "+2,896 ± 0,044"); await has("chB2Out", "−45°"); await noOverflow("devre");
      // 3 · Deutsch–Jozsa
      await click("tab-dj"); await has("djNOut", "3 (N = 8 girdi)"); await has("djP0", "0,000000"); await has("djShots", "0 / 1000 → dengeli"); await has("djCl", "2 sorgu"); await has("djClW", "5 sorgu"); await has("djClTh", "5"); await has("djAll", "72 ; 0"); await has("djF", "0110 1001");
      ok(await page.locator("#djSeed").isDisabled(), "tohum yalnız rastgele f'de");
      await click("djWorst"); await has("djCl", "9 sorgu → dengeli"); await has("djAll", "12 872 ; 0"); await has("djClTh", "9");
      await click("djConst"); await has("djP0", "1,000000"); await has("djShots", "1000 / 1000 → sabit"); await has("djCl", "9 sorgu → sabit");
      await click("djDeutsch"); await has("djClTh", "2"); await has("djStatus", "Deutsch");
      await select("djKind", "random"); await range("djN", 4); const f1 = await read("djF"); await click("djSeed"); ok((await read("djF")) !== f1, "yeni rastgele f"); await has("djP0", "0,000000");
      await click("djReset"); await has("djF", "0110 1001"); await noOverflow("dj");
      // 4 · Grover
      await click("tab-gr"); await has("grNOut", "5 (N = 32)"); await has("grTheta", "10,18°"); await has("grKopt", "4 (π/4θ = 4,42)"); await has("grKmeas", "k = 4, P = 0,9992"); await has("grPk", "0,999182"); await has("grPkTh", "0,999182"); await has("grCl", "16,32 ± 0,15"); await has("grClTh", "16,50 ; N/2 = 16");
      await click("grOver"); await has("grKOut", "9"); await has("grStatus", "aşırı dönme");
      await click("grFour"); await has("grNOut", "2 (N = 4)"); await has("grPk", "1,000000"); await has("grTheta", "30,00°");
      await click("grBig"); await has("grTOut", "173 = 10101101"); await has("grKopt", "12"); await has("grKmeas", "k = 12");
      await click("grNoisy"); await has("grNoiseOut", "0,020"); await has("grShotTh", "0,7855"); await has("grStatus", "Gürültü p = 0,020");
      await range("grM", 128); await has("grKmeas", "P sabit"); await has("grStatus", "M = N/2");
      await range("grN", 2); ok(Number(await page.locator("#grM").inputValue()) <= 2 && Number(await page.locator("#grT").inputValue()) <= 3, "n küçülünce M ve hedef sıkıştırılır");
      await click("grReset"); await range("grK", 0); await has("grStatus", "k = 0"); await click("grStep"); await has("grKOut", "1");
      await click("grPlay"); await page.waitForTimeout(1500); await click("grPlay"); ok(Number(await page.locator("#grK").inputValue()) >= 2, "oynatma k'yı artırdı");
      await click("grReset"); await has("grPk", "0,999182"); await noOverflow("grover");
      // klavye: sekmeler ve R kısayolu
      await page.locator("#tab-gr").focus(); await page.keyboard.press("Home"); ok((await page.locator("#tab-bloch").getAttribute("aria-selected")) === "true", "Home");
      await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-circ").getAttribute("aria-selected")) === "true", "ArrowRight");
      await page.keyboard.press("End"); ok((await page.locator("#tab-gr").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("ArrowLeft"); ok((await page.locator("#tab-dj").getAttribute("aria-selected")) === "true", "ArrowLeft");
      await range("djN", 1); await page.locator("h1").click(); await page.keyboard.press("r"); await page.waitForTimeout(200); await has("djNOut", "3 (N");
      await page.locator("#djN").focus(); await page.keyboard.press("r"); await page.waitForTimeout(100); await has("djNOut", "3 (N");
      { const dg = await page.evaluate(async () => { for (let i = 0; i < 50 && !document.querySelector(".digest"); i++) await new Promise((r) => setTimeout(r, 100)); const el = document.querySelector(".digest"); return el ? el.getBoundingClientRect().height : 0; }); ok(dg > 200, "Keşif Defteri görünür"); }
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); server.close(); }
}
