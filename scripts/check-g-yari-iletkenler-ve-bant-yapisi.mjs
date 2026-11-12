// G · yari-iletkenler-ve-bant-yapisi.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// Kronig–Penney için 2×2 aktarım matrisi ve yoğun tarama, zincir için yoğun matriste Jacobi döndürmeleri,
// Fermi–Dirac integrali için seri açılımı ve E değişkeninde orta nokta kuralı, Varshni türevi için merkezi fark,
// yük nötrlüğü için bağımsız artık hesabı, Poisson için Poisson–Boltzmann denkleminin ilk integrali ve Gauss yasası,
// NSM Ioffe arşivinin 300 K tablo değerleri (açıldı: 12 Kasım 2026).
// Kullanım: node scripts/check-g-yari-iletkenler-ve-bant-yapisi.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "yari-iletkenler-ve-bant-yapisi";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.SemiconductorLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1e-300, Math.abs(b)), `${label} ${a} ≠ ${b} (göreli ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };

/* ── Kabuk ── */
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(/<body class="app-page" data-page="yari-iletkenler-ve-bant-yapisi">/.test(html), "data-page");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Yarı İletkenler ve Bant Yapısı: ") && title.length <= 80, "başlık biçimi ve uzunluğu: " + title.length);
ok(/<meta name="description" content="[^"]{60,}">/.test(html), "açıklama");
ok(/shared\/theme\.css/.test(html) && /shared\/app\.js/.test(html) && !/fonts\.googleapis|cdn\.|<script src="http/.test(html), "yalnız theme.css ve app.js");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}☀-➿]/u.test(html), "emoji yok");
ok(!/body\s*\{[^}]*overflow:\s*hidden/.test(html), "body overflow hidden yok");

/* ── 1 · Kronig–Penney: aktarım matrisiyle dağılım bağıntısı ── */
// Bir hücre: a boyunca serbest yayılma, sonra λδ(x) sıçraması. ψ = A e^{iqx} + B e^{−iqx}; yarı iz cos(ka)'dır.
function transferHalfTrace(x, P) {
  // Boyutsuz: a = 1, q = x. Serbest yayılma matrisi (ψ, ψ') tabanında: [[cos x, sin x / x], [−x sin x, cos x]].
  // Delta: ψ' sıçraması (2mλ/ħ²)ψ = 2P ψ (a = 1 birimiyle). İz/2 = cos x + P sin x / x olmalı.
  const c = Math.cos(x), s = Math.sin(x);
  const M = [[c, s / x], [-x * s, c]], D = [[1, 0], [2 * P, 1]];
  const T = [[D[0][0] * M[0][0] + D[0][1] * M[1][0], D[0][0] * M[0][1] + D[0][1] * M[1][1]], [D[1][0] * M[0][0] + D[1][1] * M[1][0], D[1][0] * M[0][1] + D[1][1] * M[1][1]]];
  return { half: (T[0][0] + T[1][1]) / 2, det: T[0][0] * T[1][1] - T[0][1] * T[1][0] };
}
for (const P of [0, 0.3, 1, 3, 12]) for (const x of [0.2, 1, 2.5, 3.3, 5, 7.7, 9.9]) { const t = transferHalfTrace(x, P); abs(t.det, 1, 1e-12, "birim determinant"); abs(K.kpF(x, P), t.half, 1e-12, `F(x=${x},P=${P}) aktarım matrisi`); }
// Yoğun taramayla bant kenarları (ikiye bölmeden bağımsız)
for (const P of [0.1, 1, 3, 12]) {
  const edges = []; let prev = Math.abs(K.kpF(1e-6, P)) <= 1;
  for (let i = 1; i <= 400000; i++) { const x = 4 * Math.PI * i / 400000, al = Math.abs(K.kpF(x, P)) <= 1; if (al !== prev) edges.push(x); prev = al; }
  const b = K.kpBands(P, 1, 4);
  abs(b[0].xb, edges[0], 1e-4, `P=${P} 1. alt kenar`); abs(b[0].xt, edges[1], 1e-4, "1. üst kenar"); abs(b[1].xb, edges[2], 1e-4, "2. alt kenar"); abs(b[1].xt, edges[3], 1e-4, "2. üst kenar");
}
// Zayıf potansiyel sınırı: aralık / (4P·E_a) → 1
for (const P of [0.01, 0.003]) { const g = K.kpGap(1, P, 0.5), Ea = 1.054571817e-34 ** 2 / (2 * 9.1093837015e-31 * 0.25e-18) / 1.602176634e-19; abs(g / (4 * P * Ea), 1, 0.01, "zayıf potansiyel sınırı"); }
abs(K.kpEa(0.5) * Math.PI ** 2, 1.5041, 1e-3, "E₁(a = 0,5 nm)");
// E(k) kökleri koşulu sağlar ve bant içinde tekdüzedir
for (const P of [0.5, 3, 12]) for (const j of [1, 2, 3]) { let last = j % 2 ? -Infinity : Infinity; for (let i = 0; i <= 20; i++) { const ka = Math.PI * i / 20, x = K.kpX(j, ka, P); abs(K.kpF(x, P), Math.cos(ka), 1e-9, "F(x) = cos ka"); ok(j % 2 ? x >= last - 1e-12 : x <= last + 1e-12, "tekdüze"); last = x; } }
// Etkin kütle: 1. bant tepesinde kapalı −P/π²; P → 0 tabanında 1; bağımsız sonlu fark (Newton ile kök)
for (const P of [0.5, 3, 12]) abs(K.kpMass("t1", P).analytic, -P / Math.PI ** 2, 1e-12, "m*(tepe) = −P/π²");
abs(K.kpMass("b1", 1e-4).analytic, 1, 1e-3, "P → 0, m* → m");
function newtonX(target, x0, P) { let x = x0; for (let i = 0; i < 60; i++) { const f = Math.cos(x) + P * Math.sin(x) / x - target, d = -Math.sin(x) + P * (x * Math.cos(x) - Math.sin(x)) / (x * x); x -= f / d; } return x; }
for (const P of [0.5, 3, 12]) for (const edge of ["b1", "t1", "b2"]) {
  const x0 = K.kpMass(edge, P).x0, h = 1e-3, ka = edge === "b1" ? h : Math.PI - h;
  const x1 = newtonX(Math.cos(ka), x0 + (edge === "t1" ? -1e-4 : 1e-4), P), mFD = h * h / (x1 * x1 - x0 * x0);
  abs(K.kpMassMeasured(edge, P), mFD, 2e-3 * Math.abs(mFD) + 1e-6, `m*(${edge}, P=${P}) Newton sonlu farkı`);
  abs(K.kpMassMeasured(edge, P), K.kpMass(edge, P).analytic, 5e-4 * Math.abs(K.kpMass(edge, P).analytic), "ölçülen = kapalı türev");
}
// Zincir: yoğun matriste Jacobi
function jacobiEig(A) {
  const n = A.length, a = A.map((r) => r.slice());
  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += a[i][j] ** 2; if (off < 1e-24) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) { if (Math.abs(a[p][q]) < 1e-300) continue; const th = (a[q][q] - a[p][p]) / (2 * a[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const akp = a[k][p], akq = a[k][q]; a[k][p] = c * akp - s * akq; a[k][q] = s * akp + c * akq; }
      for (let k = 0; k < n; k++) { const apk = a[p][k], aqk = a[q][k]; a[p][k] = c * apk - s * aqk; a[q][k] = s * apk + c * aqk; } }
  }
  return a.map((r, i) => r[i]).sort((x, y) => x - y);
}
for (const [N, dE, t] of [[1, 4, 0.5], [2, 4, 0.5], [8, 4, 0.5], [17, 3, 1.2], [60, 4, 0.5]]) {
  const H = Array.from({ length: 2 * N }, () => Array(2 * N).fill(0));
  for (let i = 0; i < N; i++) { H[N + i][N + i] = dE; if (i < N - 1) { H[i][i + 1] = H[i + 1][i] = -t; H[N + i][N + i + 1] = H[N + i + 1][N + i] = t; } }
  const ref = jacobiEig(H), c = K.chain(N, dE, t), mine = [...c.s, ...c.p].sort((x, y) => x - y);
  mine.forEach((v, i) => abs(v, ref[i], 1e-9, `zincir N=${N} özdeğer ${i}`));
  abs(c.gapMeasured, Math.min(...c.p) - Math.max(...c.s), 1e-12, "aralık");
}
const c8 = K.chain(8, 4, 0.5); abs(c8.widthMeasured, 1.8794, 1e-4, "N=8 genişlik"); abs(c8.gapMeasured, 2.1206, 1e-4, "N=8 aralık");
ok(K.chain(60, 4, 1.2).gapMeasured < 0, "t = 1,2 eV, N = 60: örtüşme");

/* ── 2 · Taşıyıcılar ── */
// Ioffe 300 K tabloları
const ioffe = { si: { Eg: 1.12, ni: 1e10, Nc: 3.2e19, Nv: 1.8e19 }, ge: { Eg: 0.661, ni: 2.0e13, Nc: 1.0e19, Nv: 5.0e18 }, gaas: { Eg: 1.424, ni: 2.1e6, Nc: 4.7e17, Nv: 9.0e18 } };
for (const [id, r] of Object.entries(ioffe)) {
  abs(K.Eg(id, 300), r.Eg, 0.006, id + " E_g(300 K) Ioffe");
  near(K.Nc(id, 300), r.Nc, 0.035, id + " N_c"); near(K.Nv(id, 300), r.Nv, 0.06, id + " N_v");
  near(K.ni(id, 300), r.ni, id === "ge" ? 0.02 : 0.15, id + " n_i Ioffe");
  for (const T of [150, 300, 600]) abs(K.dEgdT(id, T), (K.Eg(id, T + 0.01) - K.Eg(id, T - 0.01)) / 0.02, 1e-9, "dE_g/dT merkezi fark");
}
abs(K.dosMass(K.Nc("si", 300), 300), 1.18, 0.01, "Si m_c* (Ioffe 1,18)"); abs(K.dosMass(K.Nv("si", 300), 300), 0.81, 0.01, "Si m_v* (Ioffe 0,81)");
// Fermi–Dirac integrali: seri (η < 0) ve E'de orta nokta kuralı (her η)
const F12series = (eta) => { let s = 0; for (let k = 1; k < 400; k++) s += (k % 2 ? 1 : -1) * Math.exp(k * eta) / k ** 1.5; return s; };
const F12mid = (eta) => { const top = Math.max(eta, 0) + 60, n = 400000, h = top / n; let s = 0; for (let i = 0; i < n; i++) { const e = (i + 0.5) * h; s += Math.sqrt(e) / (1 + Math.exp(e - eta)); } return s * h * 2 / Math.sqrt(Math.PI); };
for (const eta of [-30, -8, -3, -1, -0.2]) { const id = "si", T = 300, c = K.carriers(id, T, K.Eg(id, T) + eta * K.C.kB * T); near(c.n / K.Nc(id, T), F12series(eta), 2e-6, `F½(${eta}) seri`); }
for (const eta of [-2, 0, 1.5, 5, 12]) { const id = "gaas", T = 300, c = K.carriers(id, T, K.Eg(id, T) + eta * K.C.kB * T); near(c.n / K.Nc(id, T), F12mid(eta), 2e-5, `F½(${eta}) orta nokta`); }
// İçkin düzey ve kütle etkisi
for (const id of ["si", "ge", "gaas"]) for (const T of [200, 300, 500]) { const il = K.intrinsicLevel(id, T), c = K.carriers(id, T, il.EF); abs(Math.log(c.n / c.p), 0, 1e-6, "n = p"); const nI = K.ni(id, T); near(c.n * c.p, nI * nI, id === "ge" && T === 500 ? 2e-3 : 5e-4, `np = n_i² ${id} ${T}`); }
// Arrhenius eğimi: E_g − T·dE_g/dT (sayısal türevle)
for (const id of ["si", "ge", "gaas"]) { const a = K.arrhenius(id, 250, 350), Tm = a.Tm, d = (K.Eg(id, Tm + 0.01) - K.Eg(id, Tm - 0.01)) / 0.02; abs(a.EA, K.Eg(id, Tm) - Tm * d, 1e-3, id + " Arrhenius etkinleşme enerjisi"); }
abs(K.arrhenius("si", 250, 350).EA, 1.2, 0.002, "Si eğimi ≈ 1,20 eV");

/* ── 3 · Katkılama ── */
function residual(id, T, ND, NA, EF, inc) {
  const g = K.Eg(id, T), kT = K.C.kB * T, m = K.MATERIALS[id];
  const n = K.Nc(id, T) * F12mid((EF - g) / kT), p = K.Nv(id, T) * F12mid(-EF / kT);
  const NDp = inc ? ND / (1 + 2 * Math.exp((EF - (g - m.Ed)) / kT)) : ND, NAm = inc ? NA / (1 + 4 * Math.exp((m.Ea - EF) / kT)) : NA;
  return { r: (p + NDp - n - NAm) / Math.max(ND, NA, K.ni(id, T)), n, p };
}
for (const [id, T, ND, NA, inc] of [["si", 300, 1e16, 0, true], ["si", 40, 1e16, 0, true], ["si", 700, 1e16, 0, true], ["si", 300, 0, 1e15, true], ["ge", 300, 1e16, 0, true], ["gaas", 300, 1e17, 0, true], ["si", 300, 1e16, 5e15, true], ["si", 300, 1e19, 0, true], ["si", 300, 1e16, 0, false]]) {
  const s = K.neutrality(id, T, ND, NA, inc), rr = residual(id, T, ND, NA, s.EF, inc);
  abs(rr.r, 0, 2e-4, `nötrlük artığı ${id} ${T} K`); near(s.n, rr.n, 1e-3, "n bağımsız");
}
// Tam iyonlaşma ve yozlaşmamış durumda ikinci dereceden çözüm
for (const [id, T, ND, NA] of [["si", 300, 1e16, 0], ["si", 600, 1e16, 0], ["ge", 400, 1e15, 0], ["si", 300, 0, 1e15], ["si", 300, 1e16, 5e15]]) { const s = K.neutrality(id, T, ND, NA, false), q = K.quadratic(id, T, ND, NA); near(s.n, q.n, 2e-3, `ikinci derece ${id} ${T}`); near(s.p, q.p, 2e-3, "p"); }
// Yarı iyonlaşma sıcaklığı: Boltzmann koşulunu bağımsız ikiye bölmeyle çöz
for (const [id, ND] of [["si", 1e16], ["ge", 1e16], ["si", 1e15]]) {
  const m = K.MATERIALS[id]; let lo = 5, hi = 1000; for (let i = 0; i < 100; i++) { const T = (lo + hi) / 2; if (K.Nc(id, T) / 2 * Math.exp(-m.Ed / (K.C.kB * T)) > ND / 2) hi = T; else lo = T; }
  abs(K.halfIonTheory(id, ND, 0), lo, 1e-6, "yarı iyonlaşma kuramı"); abs(K.halfIonMeasured(id, ND, 0), lo, 0.01 * lo, "sayısal yarı iyonlaşma Boltzmann'a yakın");
}
abs(K.halfIonMeasured("si", 1e16, 0), 84.5, 0.1, "Si 10¹⁶: 84,5 K");
const Ti = K.intrinsicTheory("si", 1e16, 0); near(K.ni("si", Ti), 1e16, 1e-9, "içkin sıcaklık"); abs(K.intrinsicMeasured("si", 1e16, 0, true), Ti, 0.5, "ölçüt (3 − √5)/2");
const fz = K.freezeSlope("si", 1e16, 0); abs(fz.EA, 0.0225, 0.0012, "donma eğimi ≈ ΔE_d/2");
// İçkin özdirenç: Ioffe 3,2·10⁵ Ω·cm (n_i = 10¹⁰ ile); sayfanın n_i'siyle %25 içinde
near(K.conductivity("si", K.ni("si", 300), K.ni("si", 300)).rho, 3.2e5, 0.25, "Si içkin özdirenç");
near(1 / (1.602176634e-19 * 1e16 * 1400), K.conductivity("si", 1e16, 0).rho, 1e-12, "ρ = 1/(qnμ)");

/* ── 4 · p–n eklemi ── */
for (const [id, NA, ND, V] of [["si", 1e17, 1e16, 0], ["si", 1e17, 1e16, -5], ["si", 1e17, 1e16, 0.5], ["ge", 1e17, 1e16, 0], ["gaas", 1e16, 1e17, -2], ["si", 1e15, 1e15, 0], ["si", 1e19, 1e19, 0], ["si", 1e19, 1e15, 0]]) {
  const T = 300, r = K.poisson(id, T, NA, ND, V), vt = K.C.kB * T, eps = K.MATERIALS[id].epsr * K.C.eps0, q = K.C.q;
  ok(r.conv, "Newton yakınsadı");
  // Gauss: toplam yük sıfır; en büyük alan = pozitif yük / ε
  let Qp = 0, Qn = 0; for (let i = 0; i < r.x.length - 1; i++) { const dx = r.x[i + 1] - r.x[i], rh = 0.5 * (r.rho[i] + r.rho[i + 1]); if (rh > 0) Qp += rh * dx; else Qn += rh * dx; }
  abs((Qp + Qn) / Qp, 0, 2e-3, "yük nötrlüğü");
  // Poisson–Boltzmann ilk integrali: εE(0)²/2 = q[V_T(p₀ − p_L) + V_T(n₀ − n_L) + N_A(ψ₀ − ψ_L)] (p tarafından)
  const M = (r.x.length - 1) / 2, NAm = NA * 1e6, NDm = ND * 1e6;
  const firstP = q * (vt * (r.p[M] - r.p[0]) + vt * (r.n[M] - r.n[0]) + NAm * (r.psi[M] - r.psi[0]));
  const firstN = q * (vt * (r.p[M] - r.p[2 * M]) + vt * (r.n[M] - r.n[2 * M]) - NDm * (r.psi[M] - r.psi[2 * M]));
  const E0 = 0.5 * (Math.abs(r.E[M - 1]) + Math.abs(r.E[M]));
  near(Math.sqrt(2 * firstP / eps), E0, 0.02, `ilk integral p tarafı ${id} ${NA}/${ND} ${V}`); near(Math.sqrt(2 * firstN / eps), E0, 0.02, "ilk integral n tarafı");
  abs(r.intE, K.vbi(id, T, NA, ND) - V, 0.002 * (K.vbi(id, T, NA, ND) - V) + 1e-4, "∫E dx = V_bi − V");
  // Bağımsız deplesyon yaklaşımı
  const Vb = vt * Math.log(NA * ND / K.ni(id, T) ** 2) - V, W = Math.sqrt(2 * eps * Vb / q * (1 / NAm + 1 / NDm)), Wc = Math.sqrt(2 * eps * (Vb - 2 * vt) / q * (1 / NAm + 1 / NDm));
  near(K.depletion(id, T, NA, ND, V).W, W, 1e-12, "deplesyon W");
  if (Math.max(NA / ND, ND / NA) < 1e3) near(r.W, Wc, 0.005, `sayısal W ≈ 2kT/q düzeltmeli ${id} ${NA}/${ND} ${V}`);
}
const def = K.poisson("si", 300, 1e17, 1e16, 0);
abs(def.W * 1e9, 322.3, 0.1, "varsayılan W 322,3 nm"); abs(K.vbi("si", 300, 1e17, 1e16), 0.7812, 1e-4, "varsayılan V_bi");
const one = K.poisson("si", 300, 1e19, 1e15, 0); ok(one.Emax > 5 * K.depletion("si", 300, 1e19, 1e15, 0).Emax, "p⁺n: taşan boşluk tabakası, alan yaklaşımın çok üstünde");
// Diyot
const Is = K.satCurrent("si", 300, 1e17, 1e16), vt = K.C.kB * 300;
{ const q = 1.602176634e-19, nI = K.ni("si", 300), Dn = 1400 * vt, Dp = 450 * vt; near(Is, q * 0.01 * nI * nI * (Dn / (Math.sqrt(Dn * 1e-6) * 1e17) + Dp / (Math.sqrt(Dp * 1e-6) * 1e16)), 1e-12, "I_s el hesabı"); }
for (const [id, nId] of [["si", 1], ["si", 1.5], ["ge", 1], ["gaas", 2]]) {
  const IsX = K.satCurrent(id, 300, 1e17, 1e16), Vf = K.curveVoltageAt(1e-3, IsX, nId, 300);
  near(K.diodeI(Vf, IsX, nId, 300), 1e-3, 1e-6, "I(V_F) = 1 mA");
  const sl = Vf - K.curveVoltageAt(1e-4, IsX, nId, 300); near(sl, nId * vt * (Math.log1p(1e-3 / IsX) - Math.log1p(1e-4 / IsX)), 1e-6, "on kat eğimi");
  const h = 0.01, num = (Math.log1p(1e-3 / K.satCurrent(id, 300 + h, 1e17, 1e16)) * nId * K.C.kB * (300 + h) - Math.log1p(1e-3 / K.satCurrent(id, 300 - h, 1e17, 1e16)) * nId * K.C.kB * (300 - h)) / (2 * h);
  near(K.dVdTTheory(id, 300, 1e17, 1e16, nId, 1e-3), num, 1e-4, "dV/dT kapalı türev");
}
const VfSi = K.curveVoltageAt(1e-3, Is, 1, 300); ok(VfSi > 0.55 && VfSi < 0.7, "Si V_F(1 mA) 0,55–0,70 V"); abs(VfSi, 0.6140, 1e-4, "varsayılan V_F");
ok(K.curveVoltageAt(1e-3, K.satCurrent("ge", 300, 1e17, 1e16), 1, 300) < 0.3, "Ge V_F < 0,3 V");
ok(K.curveVoltageAt(1e-3, K.satCurrent("gaas", 300, 1e17, 1e16), 1, 300) > 0.95, "GaAs V_F > 0,95 V");
abs(vt * Math.LN10 * 1000, 59.53, 0.01, "300 K'de 59,53 mV/on kat");
for (const call of [() => K.Eg("cu", 300), () => K.neutrality("x", 300, 1, 0, true)]) { assert.throws(call); checks++; }
console.log(`G yarı iletkenler: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

/* ── Tarayıcı ── */
if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  ok(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`, import.meta.url)), "defter dosyası var");
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
      const pressR = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); };
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("main input, main select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      ok(unlabeled.length === 0, "etiketsiz denetim: " + unlabeled.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-9; })), "varsayılanlar adım ızgarasında");
      ok(await page.evaluate(() => [...document.querySelectorAll(".sc-stats")].every((s) => s.getAttribute("aria-live") === "polite")), "aria-live okumalar");
      // 1
      await has("bdE1", "1,504 eV"); await has("bdGap", "1,379 eV"); await has("bdGapT", "1,829 eV"); await has("bdGapTe", "−24,6 %"); await has("bdW1", "0,909 eV");
      await has("bdM", "1,1250"); await has("bdMT", "1,1250"); await has("bdChW", "1,879 eV"); await has("bdChG", "2,121 eV"); await has("bdChInf", "2,000 eV");
      await page.click("#bdWeak"); await has("bdGap", "0,290 eV"); await has("bdGapTe", "−4,9 %"); await has("bdStatus", "Zayıf potansiyel");
      await page.click("#bdTight"); await sel("bdEdge", "t1"); await has("bdM", "−1,2159"); await has("bdStatus", "tepesinde etkin kütle"); await sel("bdEdge", "b2"); ok(!(await read("bdM")).includes("—"), "b2 kütlesi");
      await page.click("#bdFree"); await has("bdM", "—"); await has("bdGap", "0,000 eV"); await has("bdStatus", "P = 0");
      await page.click("#bdTwo"); await has("bdChW", "1,000 eV"); await has("bdChG", "3,000 eV");
      await page.click("#bdOverlap"); await has("bdChG", "−0,794 eV"); await has("bdChainCap", "örtüşüyor");
      await range("bdN", 1); await has("bdChW", "0,000 eV"); await has("bdChainCap", "Tek atom"); await range("bdP", 15); await range("bdA", 0.2); ok(!(await page.locator("#panel-bd").textContent()).includes("NaN"), "sınır değerlerde NaN yok");
      await pressR(); await has("bdGap", "1,379 eV"); ok((await page.locator("#bdEdge").inputValue()) === "b1", "R sıfırlar (1)");
      await page.click("#bdReset"); await has("bdChW", "1,879 eV");
      // sekme klavyesi
      await page.locator("#tab-bd").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-pn").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); ok((await page.locator("#tab-bd").getAttribute("aria-selected")) === "true", "Home");
      await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-tc").getAttribute("aria-selected")) === "true", "ArrowRight");
      await page.keyboard.press("ArrowLeft"); ok((await page.locator("#tab-bd").getAttribute("aria-selected")) === "true", "ArrowLeft");
      // 2
      await page.click("#tab-tc");
      await has("tcEg", "1,1245 eV"); await has("tcNi", "8,68 × 10⁹ cm⁻³"); await has("tcNie", "−13,2 %"); await has("tcEi", "0,5549 eV"); await has("tcN", "8,677 × 10⁹"); await has("tcNP", "1,00000"); await has("tcArrE", "1,2000 eV"); await has("tcArrEe", "1,1997 eV"); await has("tcMass", "1,181m₀"); await has("tcStatus", "formülü 0,000 % ayrışıyor"); await has("tcStatus", "sayısal doğrulukla");
      ok(await page.locator("#tcShift").isDisabled(), "elle kaydırma kapalıyken kaydırıcı kilitli");
      await page.click("#tcEdge"); await has("tcNe", "+2,360 %"); await has("tcNP", "0,97694"); await has("tcStatus", "2,69 kT"); await has("tcStatus", "+2,360 %"); await has("tcStatus", "0,97694"); ok(!(await page.locator("#tcShift").isDisabled()), "kaydırıcı açık");
      await range("tcShift", 0.6); ok(!(await read("tcN")).includes("—"), "yozlaşmış E_F"); await has("tcStatus", "bandın içine girdi");
      await page.click("#tcHotGe"); await has("tcNi", "1,87 × 10¹⁶"); await has("tcNP", "0,99909"); await has("tcStatus", "Fermi–Dirac"); ok(!(await read("tcStatus")).includes("sayısal doğrulukla"), "Ge 500 K: np = n_i² sapması açıklanır"); await has("tcArrE", "0,7939 eV"); await has("tcStatus", "katkının etkisi silinmeye");
      await sel("tcMat", "gaas"); await range("tcT", 300); await has("tcNie", "+10,3 %");
      await range("tcT", 100); await sel("tcMat", "si"); await has("tcNi", "2,23 × 10⁻¹¹"); await has("tcStatus", "bu bir ortalamadır"); await range("tcT", 800); ok(!(await page.locator("#panel-tc").textContent()).includes("NaN"), "800 K NaN yok");
      await pressR(); await has("tcNi", "8,68 × 10⁹"); ok(!(await page.locator("#tcManual").isChecked()), "R sıfırlar (2)");
      // 3
      await page.click("#tab-dp");
      await has("dpEF", "E_c − E_F = 0,209 eV"); await has("dpMaj", "9,96 × 10¹⁵"); await has("dpSimplee", "−0,35 %"); await has("dpMin", "7555"); await has("dpIon", "99,65 %"); await has("dpSig", "2,24 S/cm"); await has("dpSige", "0,447 Ω·cm");
      await has("dpTf", "84,5 K"); await has("dpStatus", "katkısız kristalin 8,7 × 10⁵ katı"); await has("dpTi", "655 K"); await has("dpFz", "0,0220 eV"); await has("dpFze", "0,0225 eV");
      await page.click("#dpCold"); await has("dpIon", "1,29 %"); await has("dpStatus", "Donma bölgesi"); await has("dpMaj", "1,29 × 10¹⁴");
      await page.uncheck("#dpInc"); await has("dpTf", "—"); await has("dpStatus", "gerçekçi değil"); await has("dpStatus", "Tam iyonlaşma varsayıldı"); await has("dpStatus", "anlamsız"); ok(!(await read("dpStatus")).includes("Katkılı (doyum)"), "40 K tam iyonlaşma: doyum denmez"); await page.check("#dpInc");
      await page.click("#dpHot"); await has("dpMaj", "2,79 × 10¹⁶"); await has("dpStatus", "İçkin bölgeye"); await has("dpSimplee", "+178,58 %");
      await page.click("#dpComp"); await has("dpMaj", "4,97 × 10¹⁵"); await has("dpTfe", "dengeleme");
      await page.click("#dpPType"); await has("dpEF", "E_F − E_v = 0,254 eV"); await has("dpMaj", "p = 9,99 × 10¹⁴"); await has("dpTf", "74,4 K");
      await range("dpND", 11); await range("dpNA", 11); await has("dpStatus", "Katkısız"); await has("dpSige", "3,2 × 10⁵");
      await range("dpNA", 16); await range("dpND", 16); await has("dpStatus", "tam dengeliyor");
      await range("dpNA", 11); await range("dpND", 19); await has("dpStatus", "yozlaşmaya"); await range("dpT", 20); ok(!(await page.locator("#panel-dp").textContent()).includes("NaN"), "20 K NaN yok");
      await pressR(); await has("dpMaj", "9,96 × 10¹⁵");
      // 4
      await page.click("#tab-pn");
      await has("pnVbi", "0,7812 V"); await has("pnW", "322,3 nm"); await has("pnWT", "333,3 nm"); await has("pnWTe", "322,1 nm"); await has("pnEm", "4,54 × 10⁴ V/cm"); await has("pnIs", "48,4 fA");
      await has("pnWT", "sayısalın farkı −3,3 %"); await has("pnStatus", "sayısalın farkı −3,3 %"); await has("pnStatus", "+0,04 %"); await has("pnVf", "0,6140 V"); await has("pnSl", "59,53 mV"); await has("pnTc", "−2,258 mV/K"); await has("pnI", "0 A");
      await page.click("#pnRev"); await has("pnW", "902,8 nm"); await has("pnWTe", "sayısalın farkı 0,00 %"); await has("pnI", "−48,4 fA"); await has("pnStatus", "Ters gerilim");
      await page.click("#pnFwd"); await has("pnW", "180,9 nm"); await has("pnI", "12,1 µA");
      await page.click("#pnOne"); await has("pnStatus", "Çok tek yanlı"); await has("pnVf", "0,5587 V");
      await page.click("#pnGe"); await has("pnVbi", "0,3809 V"); await has("pnVf", "0,1958 V"); await has("pnIs", "513 nA");
      await page.click("#pnGaAs"); await has("pnVbi", "1,2066 V"); await has("pnVf", "1,0354 V");
      await page.click("#pnReset"); await range("pnN", 2); await has("pnSl", "119,05 mV"); await has("pnStatus", "İdealite");
      await range("pnV", 0.7); await has("pnW", "—"); await has("pnStatus", "Poisson çözümü gösterilmiyor"); await range("pnV", 1.2); ok(!(await page.locator("#panel-pn").textContent()).includes("NaN"), "1,2 V NaN yok");
      await range("pnV", -10); await range("pnNA", 19); await range("pnND", 19); await has("pnStatus", "kırılma"); await range("pnT", 450); await range("pnNA", 14); await range("pnND", 14); ok(!(await page.locator("#panel-pn").textContent()).includes("NaN"), "sınırlarda NaN yok");
      await pressR(); await has("pnW", "322,3 nm"); ok((await page.locator("#pnMat").inputValue()) === "si", "R sıfırlar (4)");
      for (const t of ["bd", "tc", "dp", "pn"]) { await page.click("#tab-" + t); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${t}: yatay taşma yok`); ok(await page.evaluate((t) => [...document.querySelectorAll("#panel-" + t + " canvas")].every((c) => c.width > 0 && c.height > 0), t), t + " tuvalleri çizildi"); }
      ok(await page.evaluate(() => Object.isFrozen(SemiconductorLab) && !Object.getOwnPropertyDescriptor(window, "SemiconductorLab").writable), "çekirdek salt okunur");
      ok(await page.locator(".digest").first().isVisible(), "Keşif Defteri görünür");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G yarı iletkenler: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
