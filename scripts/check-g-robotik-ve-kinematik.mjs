// G · robotik-ve-kinematik.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// karmaşık sayı çarpımıyla ileri kinematik, karmaşık adımlı türevle (complex step) Jacobian, alan için 4πL₁L₂ ve
// 2πL₁L₂(1 − cos lim) biçimleri ve kaba kuvvetle iç yarıçap taraması, erişilemeyen hedefte en kısa uzaklığın eklem
// uzayı ızgarasında kaba kuvvetle aranması, hız için v = Jθ′ ve güç denkliği τ·θ′ = F·v, zaman profillerinin
// sınır koşullarından bu dosyada Gauss elemeyle yeniden çözülmesi, çarpışmanın 4 kat ince örneklemle yeniden taranması.
// Kullanım: node scripts/check-g-robotik-ve-kinematik.mjs [--browser] [--dump]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "robotik-ve-kinematik";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.RobotLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1e-300, Math.abs(b)), `${label} ${a} ≠ ${b} (göreli ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
const D = Math.PI / 180, PI = Math.PI;
const wrapRef = (a) => Math.atan2(Math.sin(a), Math.cos(a));
let seed = 12345; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };

/* ── Kabuk ── */
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(/<body class="app-page" data-page="robotik-ve-kinematik">/.test(html), "data-page");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Robotik ve Kinematik: ") && [...title].length <= 80, "başlık biçimi ve uzunluğu");
ok(/name="description"/.test(html) && /shared\/theme\.css/.test(html) && /shared\/app\.js/.test(html), "meta, theme.css, app.js");
ok(!/fonts\.googleapis|cdn\.|unpkg|jsdelivr|<script src="http/.test(html), "CDN yok");
ok(!/[̀-ͯ⃗]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}☀-➿]/u.test(html), "emoji yok");
ok(!/type="number"/.test(html), "type=number yok");
ok((html.match(/role="tab"/g) || []).length === 4, "dört sekme");
ok(/Tuval seçiliyken ←\/→ θ₁'i, ↑\/↓ θ₂'yi 1° değiştirir\.<\/p><\/div>\s*<div class="rb-stats" aria-live="polite">\s*<div class="rb-stat"><small>det J/.test(html), "Jacobian tuvali başlığı ←/→ tuşlarını anlatır");

/* ── Karmaşık sayı yardımcıları (bağımsız ileri kinematik ve karmaşık adımlı türev) ── */
// p = Σ L_k e^{i(θ_1+…+θ_k)}; açılar karmaşık olabilir (complex step için): e^{i(a+ib)} = e^{−b}(cos a + i sin a)
function fkComplex(L, th) { let ax = 0, ay = 0, re = 0, im = 0, rei = 0, imi = 0; for (let k = 0; k < L.length; k++) { ax += th[k][0]; ay += th[k][1]; // ax + i ay: karmaşık açı
    // L e^{i(ax+i ay)} = L e^{−ay}(cos ax + i sin ax) → gerçek açıda ay = 0; complex step için x ve y ayrı ayrı karmaşık:
    // x = L cos(ax + i ay) = L(cos ax cosh ay − i sin ax sinh ay), y = L sin(ax + i ay) = L(sin ax cosh ay + i cos ax sinh ay)
    re += L[k] * Math.cos(ax) * Math.cosh(ay); rei += -L[k] * Math.sin(ax) * Math.sinh(ay);
    im += L[k] * Math.sin(ax) * Math.cosh(ay); imi += L[k] * Math.cos(ax) * Math.sinh(ay); }
  return { x: re, xi: rei, y: im, yi: imi }; }
function jacCS(L, th, h = 1e-30) { const n = L.length, J = [Array(n).fill(0), Array(n).fill(0)]; for (let i = 0; i < n; i++) { const t = th.map((v, k) => [v, k === i ? h : 0]); const p = fkComplex(L, t); J[0][i] = p.xi / h; J[1][i] = p.yi / h; } return J; }
const fkRef = (L, th) => { const p = fkComplex(L, th.map((v) => [v, 0])); return [p.x, p.y]; };

/* ── 1 · İleri kinematik ── */
{
  for (let k = 0; k < 400; k++) {
    const n = k % 2 ? 3 : 2, L = Array.from({ length: n }, () => 0.1 + 1.4 * rnd()), th = L.map(() => (rnd() - 0.5) * 2 * PI);
    const f = K.fk(L, th), m = K.fkMatrix(L, th), r = fkRef(L, th);
    abs(f.x, r[0], 1e-12, "fk x"); abs(f.y, r[1], 1e-12, "fk y"); abs(m.x, r[0], 1e-12, "matris x"); abs(m.y, r[1], 1e-12, "matris y");
    abs(wrapRef(m.phi - th.reduce((a, b) => a + b, 0)), 0, 1e-12, "yönelim"); abs(m.T[0][0] ** 2 + m.T[1][0] ** 2, 1, 1e-12, "dönme ortonormal");
  }
  near(K.fk([1, 0.7], [40 * D, 60 * D]).x, Math.cos(40 * D) + 0.7 * Math.cos(100 * D), 1e-14, "varsayılan x");
  // Alan: 4πL₁L₂ ve 2πL₁L₂(1 − cos lim) (iki bağlantı), π(R² − r²) yarıçapı kaba kuvvetle
  for (const [L, lim] of [[[1, 0.7], PI], [[1, 1], PI], [[0.3, 1.5], PI], [[1.5, 1.5], PI], [[1, 0.7], PI / 2], [[0.8, 0.5], 60 * D]]) {
    const ref = lim === PI ? 4 * PI * L[0] * L[1] : 2 * PI * L[0] * L[1] * (1 - Math.cos(lim)), th = K.workspaceTheory(L, lim);
    near(th.area, ref, 1e-12, "alan formülü"); near(K.workspaceJacobian(L, lim), ref, 1e-6, "Jacobian integrali");
    const errs = [60, 120, 240].map((cells) => K.workspaceGrid(L, { lim2: lim, cells }).area / ref - 1);
    const per = 2 * PI * (th.R + th.r); [60, 120, 240].forEach((cells, i) => { const h = 2 * th.R / cells, ex = errs[i] * ref; ok(ex > 0 && ex < per * h, "ızgara fazlası 0 < ΔA < çevre·h: " + ex); });
    ok(errs[2] < errs[1] && errs[1] < errs[0], "ızgara inceldikçe fark azalır"); near(errs[0] / errs[2], 4, 0.25, "fark ∝ h (60 → 240 hücre ≈ 4 kat)");
  }
  for (const L of [[1, 0.7, 0.3], [0.5, 0.4, 1.4], [1, 1, 1]]) {
    let rmin = Infinity, rmax = 0; for (let a = 0; a < 360; a += 2) for (let b = 0; b < 360; b += 2) { const p = fkRef(L, [0, a * D, b * D]); const r = Math.hypot(...p); rmin = Math.min(rmin, r); rmax = Math.max(rmax, r); }
    const th = K.workspaceTheory(L); abs(th.r, rmin, 2e-3, "3 bağlantı iç yarıçap (tarama)"); abs(th.R, rmax, 1e-9, "3 bağlantı dış yarıçap");
    const g = K.workspaceGrid(L, { cells: 240 }); ok(g.area / th.area - 1 > 0 && g.area / th.area - 1 < 0.03, "3 bağlantı ızgara alanı");
  }
  ok(K.workspaceTheory([1, 0.7, 0.3], PI / 2).area === null && K.workspaceJacobian([1, 0.7, 0.3]) === null, "3 bağlantıda sınırlı alan kapalı biçimsiz");
}

/* ── 2 · Ters kinematik ── */
{
  for (let k = 0; k < 300; k++) {
    const L1 = 0.3 + 1.2 * rnd(), L2 = 0.2 + 1.3 * rnd(), x = (rnd() - 0.5) * 6, y = (rnd() - 0.5) * 6, an = K.ikAnalytic(L1, L2, x, y), r = Math.hypot(x, y);
    ok(an.reachable === (r <= L1 + L2 && r >= Math.abs(L1 - L2)), "erişilebilirlik");
    for (const s of an.sols) { const p = fkRef([L1, L2], s.th); abs(p[0], an.closest[0], 1e-9, "çözüm x"); abs(p[1], an.closest[1], 1e-9, "çözüm y"); }
    ok(an.sols[0].th[1] <= 0 && an.sols[1].th[1] >= 0, "dal işaretleri");
    // dirsek yukarı: dirsek tabandan hedefe bakan doğrunun solunda (çapraz çarpım ≥ 0)
    if (an.reachable && !an.single) { const e = fkRef([L1], [an.sols[0].th[0]]); ok(x * e[1] - y * e[0] >= -1e-9, "dirsek yukarı solda"); }
    if (!an.reachable) { // en kısa uzaklık: eklem ızgarasında kaba kuvvet
      let best = Infinity; for (let a = 0; a < 360; a += 1) for (let b = -180; b <= 180; b += 1) { const p = fkRef([L1, L2], [a * D, b * D]); best = Math.min(best, Math.hypot(p[0] - x, p[1] - y)); }
      ok(an.d <= best + 1e-12 && best - an.d < 0.02 * (L1 + L2), "en kısa uzaklık (kaba kuvvet)");
    }
  }
  const L = [1, 0.7], s0 = [0, 30 * D];
  const runs = Object.fromEntries(["jt", "dls", "newton"].map((m) => [m, K.ikNumeric(L, [1.2, 0.6], s0, { method: m, lambda: 0.1 })]));
  for (const m of ["jt", "dls", "newton"]) { ok(runs[m].status === "converged", m + " yakınsar"); const p = fkRef(L, runs[m].th); abs(Math.hypot(p[0] - 1.2, p[1] - 0.6), 0, 1e-9, m + " hedefte"); }
  ok(runs.jt.iters === 27 && runs.dls.iters === 8 && runs.newton.iters === 5, "varsayılan yineleme sayıları 27 / 8 / 5");
  near(K.convOrder(runs.newton.errs), 2, 0.06, "Newton ikinci mertebe");
  // DLS oranı: σ_min, JᵀJ'nin (karmaşık adımlı J) küçük özdeğerinden
  { const J = jacCS(L, runs.dls.th), a = J[0][0] ** 2 + J[1][0] ** 2, b = J[0][0] * J[0][1] + J[1][0] * J[1][1], c = J[0][1] ** 2 + J[1][1] ** 2, emin = (a + c) / 2 - Math.sqrt(((a - c) / 2) ** 2 + b * b);
    near(K.dlsRate(L, runs.dls.th, 0.1), 0.01 / (emin + 0.01), 1e-9, "DLS kuram oranı"); near(K.convRate(runs.dls.errs), 0.01 / (emin + 0.01), 5e-3, "DLS ölçülen oran"); }
  // Newton tekil başlangıçta durur; JT ve DLS sürer
  ok(K.ikNumeric(L, [1.2, 0.6], [0, 0], { method: "newton" }).status === "singular", "Newton tekil başlangıç");
  ok(K.ikNumeric(L, [1.2, 0.6], [0, 0], { method: "jt" }).status === "converged" && K.ikNumeric(L, [1.2, 0.6], [0, 0], { method: "dls" }).status === "converged", "Jᵀ ve DLS tekil başlangıçtan");
  // Öbür dal
  { const r = K.ikNumeric(L, [1.2, 0.6], [0, -30 * D], { method: "dls" }); abs(r.th[1], K.ikAnalytic(1, 0.7, 1.2, 0.6).sols[0].th[1], 1e-6, "negatif başlangıç → dirsek yukarı"); }
  // Erişim dışı: Jᵀ ve büyük λ'lı DLS hatayı d'ye indirir
  for (const tg of [[2, 0.5], [0.1, 0.1], [2.5, -1]]) {
    const d = K.ikAnalytic(1, 0.7, ...tg).d;
    near(K.ikNumeric(L, tg, s0, { method: "dls", lambda: d > 0.5 ? 0.5 : 0.3 }).err, d, 1e-6, "yeterli λ ile DLS → d");
    if (tg[0] === 2) near(K.ikNumeric(L, tg, s0, { method: "jt" }).err, d, 1e-6, "Jᵀ → d");
  }
  ok(Math.abs(K.ikNumeric(L, [2, 0.5], s0, { method: "dls", lambda: 0.1 }).err - 0.36155) > 1e-3, "küçük λ'lı DLS erişim dışında d'ye inmez (sayfa uyarısı)");
  ok(K.ikNumeric(L, [1.69, 0], s0, { method: "jt" }).status === "maxiter", "sınıra yakın hedefte Jᵀ 2000'de bitmez");
  { const a = K.ikAnalytic(1, 1, 0, 0); ok(a.reachable && a.anyTheta1, "L₁ = L₂ tabanda θ₁ keyfi"); }
}

/* ── 3 · Jacobian ── */
{
  for (let k = 0; k < 300; k++) {
    const n = k % 3 === 2 ? 3 : 2, L = Array.from({ length: n }, () => 0.2 + 1.3 * rnd()), th = L.map(() => (rnd() - 0.5) * 2 * PI), J = K.jacobian(L, th), Jc = jacCS(L, th), Jf = K.jacobianFD(L, th);
    for (let i = 0; i < 2; i++) for (let j = 0; j < n; j++) { abs(J[i][j], Jc[i][j], 1e-12, "J complex step"); abs(Jf[i][j], Jc[i][j], 1e-8, "J sonlu fark"); }
    if (n === 2) {
      abs(K.det2(J), L[0] * L[1] * Math.sin(th[1]), 1e-12, "det J");
      const mp = K.manipulability(L, th); near(mp.s1 * mp.s2, Math.abs(K.det2(Jc)), 1e-9, "σ₁σ₂ = |det|"); abs(mp.areaPoly, PI * Math.abs(K.det2(Jc)), 1e-6 * PI * mp.s1 * mp.s1, "elips alanı");
      near(mp.s1 ** 2 + mp.s2 ** 2, Jc[0][0] ** 2 + Jc[0][1] ** 2 + Jc[1][0] ** 2 + Jc[1][1] ** 2, 1e-9, "Frobenius");
      const F = [(rnd() - 0.5) * 40, (rnd() - 0.5) * 40], tau = K.staticTorque(L, th, F), tvw = K.virtualWorkTorque(L, th, F);
      for (let i = 0; i < 2; i++) { abs(tau[i], Jc[0][i] * F[0] + Jc[1][i] * F[1], 1e-10, "τ = JᵀF"); abs(tvw[i], tau[i], 1e-6, "sanal iş"); }
      if (Math.abs(Math.sin(th[1])) > 0.02) {
        const v = [(rnd() - 0.5) * 2, (rnd() - 0.5) * 2], q = K.jointRates(L, th, v), qm = K.jointRatesIK(L, th, v);
        abs(Jc[0][0] * q[0] + Jc[0][1] * q[1], v[0], 1e-9, "Jθ′ = v (x)"); abs(Jc[1][0] * q[0] + Jc[1][1] * q[1], v[1], 1e-9, "Jθ′ = v (y)");
        if (qm) { near(Math.hypot(...qm), Math.hypot(...q), 1e-4, "ters kinematikle ölçülen θ′"); abs(tau[0] * q[0] + tau[1] * q[1], F[0] * v[0] + F[1] * v[1], 1e-8, "güç denkliği"); }
      }
    }
  }
  // Radyal hız: θ′₂ = −r r′/(L₁L₂ sin θ₂), 1°…179°
  for (const d of [1, 2, 10, 60, 90, 150, 179]) {
    const L = [1, 0.7], th = [30 * D, d * D], p = fkRef(L, th), r = Math.hypot(...p), v = [-0.2 * p[0] / r, -0.2 * p[1] / r], q = K.jointRates(L, th, v), qm = K.jointRatesIK(L, th, v);
    near(q[1], -r * -0.2 / (0.7 * Math.sin(d * D)), 1e-9, "radyal θ′₂"); near(qm[1], q[1], 1e-5, "ölçülen radyal θ′₂ " + d);
  }
  ok(K.jointRates([1, 0.7], [0.3, 0], [0.1, 0]) === null && K.jointRatesIK([1, 0.7], [0.3, 0], [0.1, 0]) === null, "gergin kolda J⁻¹ yok");
  { const t = K.staticTorque([1, 0.7], [0.4, 0], [Math.cos(0.4), Math.sin(0.4)]); abs(t[0], 0, 1e-12, "gergin kolda radyal kuvvet tork istemez"); abs(t[1], 0, 1e-12, "τ₂ = 0"); }
}

/* ── 4 · Yörünge ── */
function solve(A, b) { const n = b.length, M = A.map((r, i) => [...r, b[i]]); for (let c = 0; c < n; c++) { let p = c; for (let i = c + 1; i < n; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i; [M[c], M[p]] = [M[p], M[c]]; for (let i = 0; i < n; i++) if (i !== c) { const f = M[i][c] / M[c][c]; for (let j = c; j <= n; j++) M[i][j] -= f * M[c][j]; } } return M.map((r, i) => r[n] / r[i]); }
{
  // Polinomları sınır koşullarından çöz: kübik s(0)=0, s(1)=1, s′(0)=s′(1)=0; beşinci derece ayrıca s″(0)=s″(1)=0
  const row = (u, der, deg) => Array.from({ length: deg + 1 }, (_, k) => { let c = 1; for (let j = 0; j < der; j++) c *= k - j; return k < der ? 0 : c * u ** (k - der); });
  const cub = solve([row(0, 0, 3), row(1, 0, 3), row(0, 1, 3), row(1, 1, 3)], [0, 1, 0, 0]);
  const qui = solve([row(0, 0, 5), row(1, 0, 5), row(0, 1, 5), row(1, 1, 5), row(0, 2, 5), row(1, 2, 5)], [0, 1, 0, 0, 0, 0]);
  const ev = (c, u, der) => row(u, der, c.length - 1).reduce((s, v, k) => s + v * c[k], 0);
  for (const [name, c] of [["cubic", cub], ["quintic", qui]]) {
    const P = K.PROFILE[name]; let vmax = 0, amax = 0;
    for (let i = 0; i <= 2000; i++) { const u = i / 2000; abs(P.s(u), ev(c, u, 0), 1e-12, name + " s"); abs(P.v(u), ev(c, u, 1), 1e-10, name + " s′"); abs(P.a(u), ev(c, u, 2), 1e-9, name + " s″"); vmax = Math.max(vmax, Math.abs(ev(c, u, 1))); amax = Math.max(amax, Math.abs(ev(c, u, 2))); }
    near(P.kv, vmax, 1e-6, name + " k_v"); near(P.ka, amax, 1e-5, name + " k_a");
  }
  const cfgs = [{ A: [1.4, -0.3], B: [-0.2, 1.3] }, { A: [1.2, 0.35], B: [-1.2, 0.35] }, { A: [0.5, 1.2], B: [1.5, -0.4], branch: "down" }];
  for (const cfg of cfgs) for (const type of ["cubic", "quintic"]) for (const T of [0.8, 2, 5]) {
    const obstacle = { x: 1, y: 1, r: 0.15 }, tr = K.trajectory({ ...cfg, T, type, obstacle }), P = K.PROFILE[type], L = [1, 0.7];
    ok(tr.ok, "yörünge kurulur");
    // uçlar: kendi ileri kinematiğimizle A ve B
    for (const [th, pt] of [[tr.thA, cfg.A], [tr.thB, cfg.B]]) { const p = fkRef(L, th); abs(p[0], pt[0], 1e-9, "uç nokta x"); abs(p[1], pt[1], 1e-9, "uç nokta y"); }
    for (let j = 0; j < 2; j++) { abs(tr.peak.jv[j], P.kv * Math.abs(tr.dth[j]) / T, 1e-5 * P.kv * Math.abs(tr.dth[j]) / T + 1e-9, "tepe hız"); abs(tr.peak.ja[j], P.ka * Math.abs(tr.dth[j]) / T ** 2, 1e-3 * P.ka * Math.abs(tr.dth[j]) / T ** 2 + 1e-6, "tepe ivme"); abs(tr.ends.v0[j], 0, 1e-4 * Math.abs(tr.dth[j]) / T + 1e-9, "θ′(0) = 0"); abs(tr.ends.vT[j], 0, 1e-4 * Math.abs(tr.dth[j]) / T + 1e-9, "θ′(T) = 0"); abs(tr.ends.a0[j], type === "cubic" ? 6 * tr.dth[j] / T ** 2 : 0, 1e-3 * Math.abs(tr.dth[j]) / T ** 2 + 1e-6, "θ″(0)"); }
    ok(Math.abs(tr.dth[0]) <= PI + 1e-12, "Δθ₁ kısa yön");
    // eklem yolu sapması: kendi örneklememiz (4000 nokta) ve nokta–doğru parçası uzaklığı
    let dev = 0; const ab = [cfg.B[0] - cfg.A[0], cfg.B[1] - cfg.A[1]], l2 = ab[0] ** 2 + ab[1] ** 2;
    for (let i = 0; i <= 4000; i++) { const s = P.s(i / 4000), p = fkRef(L, [tr.thA[0] + s * tr.dth[0], tr.thA[1] + s * tr.dth[1]]), u = Math.max(0, Math.min(1, ((p[0] - cfg.A[0]) * ab[0] + (p[1] - cfg.A[1]) * ab[1]) / l2)); dev = Math.max(dev, Math.hypot(p[0] - cfg.A[0] - u * ab[0], p[1] - cfg.A[1] - u * ab[1])); }
    abs(tr.devJ, dev, 2e-4, "eklem yolu sapması"); ok(tr.devC < 1e-12, "Kartezyen yol düz"); ok(tr.cart.bad < 0, "Kartezyen yol erişilebilir");
    // Kartezyen hızlar: v = J θ′ (karmaşık adımlı J) ve uç hızı s′(u)/T·(B − A)
    for (const i of [100, 333, 400, 650]) { const th = [tr.cart.th[0][i], tr.cart.th[1][i]], J = jacCS(L, th), sd = P.v(i / tr.n) / T; abs(J[0][0] * tr.cart.v[0][i] + J[0][1] * tr.cart.v[1][i], sd * ab[0], 1e-3 * (1 + Math.hypot(...tr.cart.v.map((v) => v[i]))), "Kartezyen θ′ → v x"); abs(J[1][0] * tr.cart.v[0][i] + J[1][1] * tr.cart.v[1][i], sd * ab[1], 1e-3 * (1 + Math.hypot(...tr.cart.v.map((v) => v[i]))), "Kartezyen θ′ → v y"); }
    const mt = K.minTime(tr, 2); near(mt.joint, P.kv * Math.max(...tr.dth.map(Math.abs)) / 2, 1e-5, "T_min eklem");
    { const tr2 = K.trajectory({ ...cfg, T: mt.cart, type }); near(Math.max(...tr2.peak.cv), 2, 1e-6, "T_min Kartezyen: tepe hız tam ω_max"); }
    // çarpışma: 4 kat ince örneklem, kendi segment–çember uzaklığımız
    for (const key of ["joint", "cart"]) {
      let first = -1, clear = Infinity; for (let i = 0; i <= 3200; i++) { const s = P.s(i / 3200); let th; if (key === "joint") th = [tr.thA[0] + s * tr.dth[0], tr.thA[1] + s * tr.dth[1]]; else { const x = cfg.A[0] + s * ab[0], y = cfg.A[1] + s * ab[1], a = K.ikAnalytic(1, 0.7, x, y); th = a.sols[cfg.branch === "down" ? 1 : 0].th; }
        const pts = [[0, 0], fkRef([1], [th[0]]), fkRef(L, th)]; for (let k = 0; k < 2; k++) { const a = pts[k], b = pts[k + 1], d = [b[0] - a[0], b[1] - a[1]], u = Math.max(0, Math.min(1, ((1 - a[0]) * d[0] + (1 - a[1]) * d[1]) / (d[0] ** 2 + d[1] ** 2))), c = Math.hypot(a[0] + u * d[0] - 1, a[1] + u * d[1] - 1) - 0.15; clear = Math.min(clear, c); if (c < 0 && first < 0) first = i; } }
      const q = tr.coll[key]; abs(q.clear, clear, 2e-3, "en yakın geçiş " + key); ok((q.first >= 0) === (first >= 0), "çarpışma var/yok " + key); if (first >= 0) abs(q.tFirst, first / 3200 * T, 2 * tr.dt, "ilk çarpışma anı " + key);
    }
  }
  const def = K.trajectory({ A: [1.4, -0.3], B: [-0.2, 1.3], T: 2, obstacle: { x: 1, y: 1, r: 0.15 } });
  ok(def.coll.joint.first >= 0 && def.coll.cart.first < 0, "varsayılan: eklem yolu çarpar, Kartezyen çarpmaz");
  { const h = K.trajectory({ A: [1.2, 0.2], B: [-1.2, 0.1], T: 2 }); ok(h.cart.bad >= 0, "delikten geçen doğru erişim dışı"); abs(h.cart.tBad, 0.86, 0.03, "deliğe giriş anı"); }
  ok(!K.trajectory({ A: [2, 0], B: [0, 1] }).ok && !K.trajectory({ A: [1, 0], B: [0.1, 0] }).ok, "erişilemez uçlar reddedilir");
}
for (const bad of [() => K.fk([1], [0]), () => K.fk([1, -1], [0, 0]), () => K.fk([1, 1], [0]), () => K.ikAnalytic(1, 0.7, NaN, 0), () => K.ikNumeric([1, 0.7], [1, 1], [0, 0], { method: "x" }), () => K.trajectory({ A: [1, 0], B: [0, 1], T: 0 }), () => K.workspaceGrid([1, 1], { cells: 2 }), () => K.minTime(K.trajectory({ A: [1, 0], B: [0, 1] }), 0)]) { assert.throws(bad); checks++; }
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
      const range = async (id, v) => { await page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v)); await page.waitForTimeout(150); };
      const click = async (id) => { await page.click("#" + id); await page.waitForTimeout(200); };
      const noOverflow = async (label) => ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "yatay taşma yok: " + label);
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("main input,main select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id));
      ok(unlabeled.length === 0, "etiketsiz denetim: " + unlabeled.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-6; })), "varsayılanlar adım ızgarasında");
      ok(await page.evaluate(() => Object.isFrozen(window.RobotLab) && !Object.getOwnPropertyDescriptor(window, "RobotLab").writable), "çekirdek dondurulmuş (tarayıcı)");
      ok(await page.evaluate(() => { const c = document.getElementById("fkStage"); const g = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < g.length; i += 4) if (g[i] !== g[0] || g[i + 1] !== g[1]) n++; return n > 1000; }), "sahne çizildi");
      if (process.argv.includes("--dump") && width === 1280) {
        const dump = async (label) => console.log("== " + label, JSON.stringify(await page.evaluate(() => { const p = document.querySelector('[role=tabpanel]:not([hidden])'); return Object.fromEntries([...p.querySelectorAll("strong[id], output, .rb-status")].map((e) => [e.id, e.textContent])); }), null, 1));
        await dump("fk"); for (const b of ["fkStraight", "fkFolded", "fkEqual", "fkLimit"]) { await click("fkReset"); await click(b); await dump(b); } await click("fkReset"); await range("fkCells", 0); await page.locator("#fkCells").selectOption("60"); await page.waitForTimeout(200); await dump("fk60"); await click("fkReset");
        await click("tab-ik"); await dump("ik"); for (const b of ["ikFar", "ikHole", "ikEdge", "ikSing", "ikOther"]) { await click("ikReset"); await click(b); await dump(b); } await click("ikReset"); await click("ikFar"); await range("ikLambda", 0.3); await dump("ikFar λ0.3"); await click("ikReset");
        await click("tab-jac"); await dump("jac"); for (const b of ["jacNear", "jacStraight", "jacFolded", "jacRight"]) { await click("jacReset"); await click(b); await dump(b); } await click("jacReset");
        await click("tab-traj"); await dump("traj"); for (const b of ["trQuintic", "trSlow", "trEdge", "trHole"]) { await click("trajReset"); await click(b); await dump(b); } await click("trajReset");
        await click("tab-fk");
      }
      // 1 · İleri kinematik
      await has("fkTrig", "(0,6445; 1,3322) m"); await has("fkMat", "(0,6445; 1,3322) m"); await has("fkPhi", "100,0°"); await has("fkR", "1,4799 m"); await has("fkBounds", "0,300 … 1,700 m");
      await has("fkArea", "8,9036 m²"); await has("fkAreaTh", "8,7965 m²"); await has("fkAreaDiff", "+1,22 %"); await has("fkAreaJ", "8,7965 m²"); await has("fkAreaJDiff", "0,0000 %");
      await page.locator("#fkCells").selectOption("60"); await page.waitForTimeout(250); await has("fkAreaDiff", "+4,40 %");
      await click("fkStraight"); await has("fkStatus", "kol gergin"); await has("fkR", "1,7000 m");
      await click("fkFolded"); await has("fkStatus", "katlanmış"); await has("fkR", "0,3000 m");
      await click("fkEqual"); await has("fkBounds", "0,000 … 2,000 m"); await has("fkStatus", "iç boşluk kapandı");
      await click("fkReset"); await click("fkLimit"); await has("fkAreaTh", "4,3982 m²"); await has("fkAreaJ", "4,3982 m²"); await has("fkLimOut", "±90°");
      await click("fkReset"); await page.click("#fkThird"); await page.waitForTimeout(400); ok(await page.locator("#fkL3").isVisible(), "bilek alanı görünür"); await has("fkAreaTh", "12,5664 m²"); await has("fkAreaJ", "yalnız iki"); await has("fkStatus", "Bilek eklendi");
      await range("fkLim", 90); await has("fkAreaTh", "kapalı biçim yok");
      await click("fkReset"); ok(await page.locator("#fkThirdFields").isHidden(), "bilek gizli"); await has("fkArea", "8,9036");
      // klavye ve sürükleme
      await page.locator("#fkStage").focus(); await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowUp"); await page.waitForTimeout(150); await has("fkT1Out", "41°"); await has("fkT2Out", "61°");
      await click("fkReset");
      { await page.locator("#fkStage").scrollIntoViewIfNeeded(); await page.evaluate(() => window.scrollBy(0, -120)); await page.waitForTimeout(150); const box = await page.locator("#fkStage").boundingBox(); const pos = await page.evaluate(() => { const L = [1, 0.7], f = window.RobotLab.fk(L, [40 * Math.PI / 180, 60 * Math.PI / 180]); return f.pts[2]; });
        const k = Math.min(box.width, box.height) / (2 * 1.7 * 1.08) * 0.94, sx = box.x + box.width / 2 + pos[0] * k, sy = box.y + box.height / 2 - pos[1] * k;
        await page.mouse.move(sx, sy); await page.mouse.down(); await page.mouse.move(box.x + box.width / 2 + (Math.cos(40 * D) + 0.7) * k, box.y + box.height / 2 - Math.sin(40 * D) * k, { steps: 4 }); await page.mouse.up(); await page.waitForTimeout(200);
        ok(Math.abs(Number(await page.locator("#fkT2").inputValue()) - -40) <= 2, "uç sürüklenince θ₂ değişti: " + await page.locator("#fkT2").inputValue()); }
      await click("fkReset"); await noOverflow("ileri");
      // 2 · Ters kinematik
      await click("tab-ik"); await page.waitForTimeout(200);
      await has("ikUp", "(57,15°; −77,21°)"); await has("ikDown", "(−4,02°; 77,21°)"); await has("ikJt", "27 ·"); await has("ikDls", "8 ·"); await has("ikNewton", "5 ·"); await has("ikDlsRate", "0,04242"); await has("ikDlsRateTh", "0,04242"); await has("ikOrder", "2,06"); await has("ikPick", "dirsek aşağı");
      await click("ikOther"); await has("ikPick", "dirsek yukarı");
      await click("ikSing"); await has("ikNewton", "başlamadı"); await has("ikStatus", "Newton başlamadan durdu");
      await click("ikFar"); await has("ikStatus", "erişim dışında"); await has("ikStatus", "d = 0,3616"); await has("ikJt", "0,36 m"); await has("ikStatus", "Jacobian devriği 0,3616 m"); await has("ikStatus", "en küçük işe yarayan λ = 0,30 m"); await has("ikDlsRate", "—");
      await range("ikLambda", 0.3); await has("ikDls", "0,36 m"); await has("ikStatus", "en kısa uzaklığa indirdi");
      await click("ikHole"); await has("ikStatus", "iç boşlukta"); await has("ikStatus", "0,1586");
      await click("ikEdge"); await has("ikStatus", "Jᵀ 2000 yinelemede"); await has("ikJt", "2000 ·");
      await range("ikL2", 1); await range("ikX", 0); await range("ikY", 0); await has("ikStatus", "Sonsuz çözüm");
      await click("ikReset"); await page.locator("#ikStage").focus(); await page.keyboard.press("ArrowUp"); await page.keyboard.press("Shift+ArrowRight"); await page.waitForTimeout(150); await has("ikYOut", "0,61 m"); await has("ikXOut", "1,30 m");
      { await page.locator("#ikStage").scrollIntoViewIfNeeded(); await page.waitForTimeout(100); const box = await page.locator("#ikStage").boundingBox(); await page.mouse.click(box.x + box.width / 2, box.y + box.height * 0.2); await page.waitForTimeout(200); ok(Math.abs(Number(await page.locator("#ikX").inputValue())) < 0.03 && Number(await page.locator("#ikY").inputValue()) > 0.5, "tıklama hedefi taşıdı"); }
      await click("ikReset"); await has("ikJt", "27 ·"); await noOverflow("ters");
      // 3 · Jacobian
      await click("tab-jac"); await page.waitForTimeout(200);
      await has("jacDetTh", "0,6062 m²"); await has("jacDetFd", "0,6062 m²"); await has("jacArea", "1,9045 m²"); await has("jacAreaTh", "1,9045 m²"); await has("jacRate", "(−0,187; 0,488) rad/s"); await has("jacRateMeas", "(−0,187; 0,488) rad/s"); await has("jacTau", "(−8,660; 0,000) N·m"); await has("jacTauMeas", "(−8,660; 0,000) N·m"); await has("jacCond", "4,182");
      await click("jacNear"); await has("jacRate", "(−5,730; 13,915) rad/s"); await has("jacRateMeas", "(−5,730; 13,915) rad/s"); await has("jacStatus", "Koşul sayısı");
      await click("jacStraight"); await has("jacRate", "tanımsız"); await has("jacCond", "∞"); await has("jacStatus", "kol gergin".replace("kol", "Kol"));
      await click("jacFolded"); await has("jacStatus", "Kol katlı");
      await page.locator("#jacDir").selectOption("tan"); await page.waitForTimeout(150); await click("jacRight"); await has("jacStatus", "Teğet yön");
      await click("jacReset"); await page.locator("#jacStage").focus(); await page.keyboard.press("ArrowDown"); await page.waitForTimeout(150); await has("jacT2Out", "59°"); await click("jacReset"); await has("jacCond", "4,182"); await noOverflow("jacobian");
      // 4 · Yörünge
      await click("tab-traj"); await page.waitForTimeout(250);
      await has("trDth", "115,84° · −13,71°"); await has("trVPk", "1,5164 rad/s"); await has("trVPkTh", "1,5164 rad/s"); await has("trAPk", "3,0328"); await has("trA0", "3,033 rad/s² (kuram 3,033)"); await has("trDev", "59,8 cm"); await has("trCPk", "(2,185; 1,554) rad/s"); await has("trTmin", "1,52 s · 2,19 s"); await has("trClear", "çarpışma t = 0,93 s · 26,4 cm");
      await click("trQuintic"); await has("trVPk", "1,8955"); await has("trVPkTh", "1,8955"); await has("trA0", "0,000 rad/s²"); await has("trTmin", "1,90 s · 2,73 s");
      await click("trSlow"); await has("trStatus", "T = 2,0 s yetmiyor");
      await click("trajReset"); await click("trEdge"); await has("trCPk", "(6,235; 1,962) rad/s"); await has("trStatus", "tekilliğine"); await has("trClear", "engel yok");
      await click("trHole"); await has("trStatus", "iç boşluğa"); await has("trCPk", "erişim dışı");
      await range("trAx", 0); await range("trAy", 0); await has("trStatus", "A noktası erişim");
      await click("trajReset"); await page.selectOption("#trBranch", "down"); await page.waitForTimeout(200); await has("trDth", "105,84° · 13,71°");
      await click("trajReset"); await click("trPlay"); await page.waitForTimeout(700); ok((await read("trPlay")) === "Duraklat", "oynatılıyor"); await page.waitForTimeout(1800); ok((await read("trPlay")) === "Yeniden oynat", "oynatma bitti");
      await page.locator("#trajStage").focus(); await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(150); await has("trBxOut", "−0,25 m");
      // R kısayolu ve sekme klavyesi
      await page.locator("h1").click(); await page.keyboard.press("r"); await page.waitForTimeout(200); await has("trBxOut", "−0,20 m");
      await page.locator("#trT").focus(); await page.keyboard.press("r"); await page.waitForTimeout(100); await has("trTOut", "2,0 s");
      await noOverflow("yörünge");
      await page.locator("#tab-traj").focus(); await page.keyboard.press("Home"); ok((await page.locator("#tab-fk").getAttribute("aria-selected")) === "true", "Home");
      await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-ik").getAttribute("aria-selected")) === "true", "ArrowRight");
      await page.keyboard.press("End"); ok((await page.locator("#tab-traj").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("ArrowLeft"); ok((await page.locator("#tab-jac").getAttribute("aria-selected")) === "true", "ArrowLeft");
      { const dg = await page.evaluate(async () => { for (let i = 0; i < 50 && !document.querySelector(".digest"); i++) await new Promise((r) => setTimeout(r, 100)); const el = document.querySelector(".digest"); return el ? el.getBoundingClientRect().height : 0; }); ok(dg > 200, "Keşif Defteri yüklendi (defter dosyası zorunlu, 404 hata sayılır)"); }
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); server.close(); }
}
