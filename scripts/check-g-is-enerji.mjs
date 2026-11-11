// G · is-enerji.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) node'da yüklenir ve sayfanın kendi formüllerini KULLANMAYAN
// başvurularla karşılaştırılır: sabit ivmeli ve basit harmonik kapalı çözümler, bağımsız Simpson integralleri,
// y = f(x) eğrisi için ayrı türetilmiş boncuk denklemi ve ayrı bir RK4, döngüde enerji + N = 0 koşulları,
// kapalı biçimli dönüm noktaları, bağımsız periyot integrali (Gauss–Chebyshev), sabit güçle kaldırmanın
// kapalı çözümü ve Cardano kökü. `--browser`: 390 px açık ve 1280 px koyu temada gerçek arayüz denetimi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../is-enerji.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.IsEnerjiLab;
assert(Object.isFrozen(K), 'çekirdek dondurulmuş olmalı');
assert(!Object.getOwnPropertyDescriptor(context.window, 'IsEnerjiLab').writable, 'çekirdek salt okunur');

let checks = 0;
const TAU = 2 * Math.PI, g0 = 9.81, D2R = Math.PI / 180;
const near = (actual, expected, tol, label = '') => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(1, Math.abs(expected)), `${label} ${actual} ≠ ${expected} (tol ${tol})`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };
const simpson = (f, a, b, n = 2000) => { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return (s * h) / 3; };
const root = (f, a, b) => { let fa = f(a); for (let i = 0; i < 200; i++) { const c = (a + b) / 2, fc = f(c); if ((fc < 0) === (fa < 0)) { a = c; fa = fc; } else b = c; } return (a + b) / 2; };

/* ── 1 · İş ve iş–enerji teoremi ── */
// 1a · Sabit kuvvet: sabit ivmeli hareketin kapalı çözümü
for (const F0 of [5, 20, 60]) for (const th of [0, 30, 60]) for (const m of [0.5, 2, 10]) for (const mu of [0, 0.2, 0.6]) for (const v0 of [0, 2]) {
  const c = Math.cos(th * D2R), s = Math.sin(th * D2R), N = m * g0 - F0 * s;
  const M = K.makeWork({ kind: 'const', F0, theta: th, m, mu, v0 }), sim = K.runWork(M), S = sim.S;
  if (N < 0) { ok(S.status === 'lift', 'kalkış: model dışı'); continue; }
  const a = (F0 * c - mu * N) / m;
  if (v0 === 0 && F0 * c <= mu * N) { ok(S.status === 'stuck' && S.W === 0 && S.x === 0, `kımıldamaz F=${F0} θ=${th} m=${m} μ=${mu}`); continue; }
  if (a < 0 && v0 * v0 < 2 * -a * 10) { // durur
    const d = (v0 * v0) / (2 * -a);
    near(S.x, d, 1e-9, 'durma mesafesi v₀²/2|a|'); near(S.t, v0 / -a, 1e-9, 'durma süresi');
    ok(S.status === 'stuck' || S.status === 'back', 'durunca kalır ya da geri döner'); continue;
  }
  const vL = Math.sqrt(v0 * v0 + 2 * a * 10);
  ok(S.status === 'end', 'rayın sonu');
  near(S.v, vL, 1e-9, `v_L F=${F0} θ=${th} m=${m} μ=${mu}`); near(S.t, Math.abs(a) > 1e-12 ? (vL - v0) / a : 10 / v0, 1e-9, 't_L');
  near(S.W, F0 * c * 10, 1e-9, 'W_F = F cosθ L'); near(S.Wf, -mu * N * 10, 1e-9, 'W_s = −μ(mg − F sinθ)L');
  near(0.5 * m * (S.v ** 2 - v0 ** 2), S.W + S.Wf, 1e-9, 'ΔK = W_net');
}
// 1b · Yay benzeri profil: m x″ = C(1 − x/L) − μmg, basit harmonik kapalı çözüm
for (const [F0, th, m, mu] of [[40, 0, 2, 0.1], [40, 30, 3, 0.2], [60, 45, 5, 0.05], [25, 10, 1, 0]]) {
  const c = Math.cos(th * D2R), s = Math.sin(th * D2R), C = F0 * (c + mu * s), w = Math.sqrt(C / (m * 10)), xe = 10 * (1 - (mu * m * g0) / C);
  const x = (t) => xe - xe * Math.cos(w * t), tL = root((t) => x(t) - 10, 0, Math.PI / w);
  const sim = K.runWork(K.makeWork({ kind: 'linear', F0, theta: th, m, mu }));
  const Wa = simpson((q) => F0 * (1 - q / 10) * c, 0, 10), Wf = -mu * simpson((q) => m * g0 - F0 * (1 - q / 10) * s, 0, 10);
  if (xe > 5) { ok(sim.S.status === 'end', 'yay profili sona varır'); near(sim.S.t, tL, 1e-9, 'harmonik çözümden t_L'); near(sim.S.v, Math.sqrt((2 * (Wa + Wf)) / m), 1e-9, 'v_L Simpson'); near(sim.S.W, Wa, 1e-10, 'W_F = F₀L/2 cosθ'); near(sim.S.Wf, Wf, 1e-10, 'W_s'); }
}
// 1c · Parçalı profil: bağımsız parçalı doğrusal fonksiyon, Simpson ve ayrı bir velocity-Verlet
const pw = (n, q) => { const i = Math.min(3, Math.floor(q / 2.5)); return n[i] + ((n[i + 1] - n[i]) * (q - 2.5 * i)) / 2.5; };
for (const [nodes, th, m, mu] of [[[20, 30, 10, -10, 0], 30, 2, 0.2], [[40, 0, 40, 0, 40], 0, 2, 0.1], [[10, 20, 30, 40, 40], 60, 8, 0.3], [[35, -20, 30, 5, -5], 15, 1, 0]]) {
  const c = Math.cos(th * D2R), s = Math.sin(th * D2R), M = K.makeWork({ kind: 'piece', nodes, theta: th, m, mu }), sim = K.runWork(M), S = sim.S;
  const Wa = [0, 1, 2, 3].reduce((acc, i) => acc + simpson((q) => pw(nodes, q) * c, 2.5 * i, 2.5 * (i + 1), 200), 0);
  const Nf = (q) => m * g0 - pw(nodes, q) * s;
  if (S.status === 'end') {
    const Wf = -mu * [0, 1, 2, 3].reduce((acc, i) => acc + simpson(Nf, 2.5 * i, 2.5 * (i + 1), 200), 0);
    near(sim.theory().Wapp, Wa, 1e-11, 'kapalı parçalı integral'); near(S.W, Wa, 2e-7, 'ölçülen Σ F·Δx'); near(S.Wf, Wf, 2e-7, 'ölçülen sürtünme işi');
    // Düğümün üstüne düşen adımda yamuk kuralı kırığı kesip atar: göreli hata ~1e-7, görünen 3 basamağın çok altında.
    near(S.v, Math.sqrt((2 * (Wa + Wf)) / m), 1e-7, 'v_L'); near(0.5 * m * S.v * S.v, S.W + S.Wf, 5e-7, 'ΔK = W_net');
    let x = 0, v = 0, t = 0; const h = 1e-5, acc = (q) => (pw(nodes, q) * c - mu * Nf(q)) / m; let a = acc(0);
    while (x < 10) { const x1 = x + v * h + 0.5 * a * h * h, a1 = acc(Math.min(x1, 10)), v1 = v + 0.5 * (a + a1) * h; if (x1 >= 10) { t += (h * (10 - x)) / (x1 - x); break; } x = x1; v = v1; a = a1; t += h; }
    near(S.t, t, 2e-6, 'ayrı Verlet ile varış süresi');
  } else ok(S.status === 'stuck' || S.status === 'back', 'parçalı profil durur');
}
// 1d · Geri dönen blok: dönüş noktaları arasındaki sürtünme ve teorem
{
  const nodes = [30, 20, -30, -30, -30], M = K.makeWork({ kind: 'piece', nodes, theta: 0, m: 1, mu: 0.05 }), sim = K.runWork(M), S = sim.S;
  ok(S.turns.length >= 2, 'en az bir dönüş'); ok(S.status === 'back' || S.status === 'stuck', `geri dönüş: ${S.status}`);
  near(0.5 * S.v * S.v, S.W + S.Wf, 1e-6, 'ΔK = W_net (dönüşlü)');
  let wf = 0; const pts = S.turns.concat([S.x]);
  for (let i = 1; i < pts.length; i++) wf += -0.05 * g0 * Math.abs(pts[i] - pts[i - 1]);
  near(S.Wf, wf, 1e-6, 'sürtünme işi = −μmg × toplam yol'); near(S.path, pts.slice(1).reduce((a, q, i) => a + Math.abs(q - pts[i]), 0), 1e-9, 'toplam yol');
  near(S.W, simpson((q) => pw(nodes, q), 0, S.x, 2000), 1e-6, 'korunumlu kuvvetin işi yalnız uç noktalara bağlı');
}
ok(K.runWork(K.makeWork({ kind: 'const', F0: 60, theta: 60, m: 0.5, mu: 0.2 })).S.status === 'lift', 'F sinθ > mg: kalkış');
ok(K.runWork(K.makeWork({ kind: 'const', F0: 0, theta: 0, m: 2, mu: 0 })).S.status === 'stuck', 'kuvvet yok');
for (const bad of [() => K.makeWork({ kind: 'x', m: 1, mu: 0, theta: 0 }), () => K.makeWork({ kind: 'const', m: 0, mu: 0, theta: 0 }), () => K.makeWork({ kind: 'const', m: 1, mu: -1, theta: 0 }), () => K.makeWork({ kind: 'piece', nodes: [1, 2], m: 1, mu: 0, theta: 0 }), () => K.makeWork({ kind: 'const', m: 1, mu: 0, theta: 85 })]) { assert.throws(bad, (e) => e.name === 'RangeError'); checks++; }

/* ── 2 · Kaykay pisti ── */
// 2a · Bağımsız başvuru: y = f(x) eğrisinde boncuk, ẍ = −(g + f″ẋ²)(f′ + sgn(ẋ)μ)/(1 + f′²); ilk durma noktası
function beadFirstStop(f1, f2, x0, mu, h = 2e-5) {
  const acc = (x, v) => -(g0 + f2(x) * v * v) * (f1(x) + Math.sign(v || 1) * mu) / (1 + f1(x) ** 2);
  let x = x0, v = 0;
  for (let i = 0; i < 5e6; i++) {
    const k1x = v, k1v = acc(x, v), k2x = v + 0.5 * h * k1v, k2v = acc(x + 0.5 * h * k1x, v + 0.5 * h * k1v), k3x = v + 0.5 * h * k2v, k3v = acc(x + 0.5 * h * k2x, v + 0.5 * h * k2v), k4x = v + h * k3v, k4v = acc(x + h * k3x, v + h * k3v);
    const xn = x + (h / 6) * (k1x + 2 * k2x + 2 * k3x + k4x), vn = v + (h / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
    if (i > 10 && vn <= 0) return x + (xn - x) * (v / (v - vn));
    x = xn; v = vn;
  }
  return NaN;
}
for (const [kind, f, f1, f2, h0] of [
  ['u', (x) => (x * x) / 5, (x) => 0.4 * x, () => 0.4, 4],
  ['u', (x) => (x * x) / 5, (x) => 0.4 * x, () => 0.4, 2.5],
  ['double', (x) => 2.5 * ((x / 3) ** 2 - 1) ** 2, (x) => (10 / 9) * x * ((x / 3) ** 2 - 1), (x) => (10 / 27) * x * x - 10 / 9, 2],
]) for (const mu of [0, 0.05, 0.15]) {
  const T = K.makeTrack(kind), sim = K.makeSkate(T, { m: 50, h: h0, mu }), x0 = T.geo(sim.S.u)[0];
  near(f(x0), h0, 1e-12, 'bırakma noktası');
  let prevD = sim.S.d;
  while (sim.S.status === 'run' && sim.S.d === prevD && sim.S.t < 30) sim.step(1e-3);
  const xs = T.geo(sim.S.u)[0], ref = beadFirstStop(f1, f2, x0, mu);
  near(xs, ref, 2e-6, `${kind} μ=${mu} ilk durma noktası (bağımsız boncuk)`);
  const st = sim.state(); near(st.K, 0, 1e-9, 'durmada K = 0');
  near(st.U + st.Eth, sim.S.E0, mu ? 2e-9 : 1e-10, 'U + E_ısı = E₀');
  if (mu === 0) near(f(xs), h0, 1e-8, 'sürtünmesiz: aynı yüksekliğe döner');
  else ok(f(xs) < h0, 'sürtünme: daha alçağa döner');
}
// 2b · Uzun koşuda korunum: RK4, h/2 ikizinde açık Euler hatası yarıya iner (birinci mertebe)
for (const [kind, h0] of [['u', 4], ['double', 2], ['double', 3.5]]) {
  const T = K.makeTrack(kind), run = (method, dt, tEnd) => { const s = K.makeSkate(T, { m: 50, h: h0, method }); let mx = 0; while (s.S.t < tEnd && s.S.status === 'run') { s.step(dt); const q = s.state(); mx = Math.max(mx, Math.abs(q.K + q.U - s.S.E0) / s.S.E0); } const q = s.state(); return { mx, end: (q.K + q.U - s.S.E0) / s.S.E0 }; };
  ok(run('rk4', 1e-3, 60).mx < 1e-8, `${kind} RK4 60 s korunum`);
  const e1 = run('euler', 1e-3, 3), e2 = run('euler', 5e-4, 3);
  ok(e1.end > 0, 'açık Euler enerjiyi artırır'); near(e1.end / e2.end, 2, 0.08, 'açık Euler birinci mertebe (h/2 ikizi)');
  const s1 = run('semi', 1e-3, 3), s2 = run('semi', 5e-4, 3);
  ok(s1.end < 0, 'yarı örtük Euler bu pistte enerji kaybettirir'); near(s1.end / s2.end, 2, 0.08, 'yarı örtük Euler birinci mertebe');
}
// 2c · Döngü: en küçük yükseklik 2.5R, tepe N/mg = (2h − 5R)/R, ayrılma yüksekliği (2h + R)/3
for (const R of [0.5, 1, 1.2, 1.8, 2.5]) {
  near(K.loopMinHeight(R).h, 2.5 * R, 5e-6, `ikiye bölme h_min R=${R}`);
  for (const k of [1.3, 1.8, 2.2]) {
    const h = k * R, sim = K.makeSkate(K.makeTrack('loop', R), { m: 70, h });
    while (sim.S.status === 'run' || sim.S.status === 'flight') sim.step(1e-3);
    ok(sim.S.status === 'landed', 'ayrılan kaykaycı piste düşer');
    near(sim.S.det.y, (2 * h + R) / 3, 2e-6, `ayrılma yüksekliği R=${R} h=${h}`);
    const D = sim.S.det, cx = 2.5, cy = R; near(Math.hypot(D.x - cx, D.y - cy), R, 1e-9, 'ayrılma noktası çember üstünde');
    near(D.vx ** 2 + D.vy ** 2, g0 * (D.y - R), 1e-5, 'ayrılmada v² = g(y − R)');
    const L = sim.S.flight; near(L.tau > 0 ? 1 : 0, 1, 0, 'uçuş süresi');
    const P = sim.state(); near(P.K + P.U, sim.S.E0, 1e-6, 'uçuşta enerji korunur');
  }
  for (const k of [2.6, 3.5]) {
    const h = k * R; if (h > 7.4) continue;
    const sim = K.makeSkate(K.makeTrack('loop', R), { m: 70, h }); while (sim.S.status === 'run') sim.step(1e-3);
    ok(sim.S.status === 'end' && sim.S.loopDone, 'döngü tamam'); near(sim.S.minNloop, (2 * h - 5 * R) / R, 1e-5, `tepede N/mg R=${R} h=${h}`);
    near(sim.S.endV, Math.sqrt(2 * g0 * h), 1e-6, 'çıkışta v = √(2gh)');
  }
  { const sim = K.makeSkate(K.makeTrack('loop', R), { m: 70, h: 0.9 * R }); while (sim.S.status === 'run' && sim.S.d > 0) sim.step(1e-3); ok(sim.S.det === null && sim.S.status === 'run', 'h < R: ayrılmaz, geri kayar'); }
}
near(K.loopMinHeight(1.2, { mu: 0.05 }).h / 1.2, 3.593, 2e-3, 'sürtünmeli döngü: 2.5R\'den yüksek');
ok(Number.isNaN(K.loopMinHeight(1.2, { mu: 0.3 }).h), 'rampa yetmez');
// 2d · Tümsek: tepede eğrilik yarıçapı (sonlu farkla) ve pistte kalma sınırı h = y_tepe + ρ/2
{
  const T = K.makeTrack('hump'), y = (u) => 3 * (1 - Math.tanh((u - 3) / 1.2)) + 2.5 * Math.exp(-(((u - 10) / 2.5) ** 2));
  const uc = root((u) => (y(u + 1e-6) - y(u - 1e-6)), 9.5, 10.5), e = 1e-4, y2 = (y(uc + e) - 2 * y(uc) + y(uc - e)) / (e * e), rho = 1 / Math.abs(y2);
  near(uc, T.crest, 1e-6, 'tepe'); near(rho, 1.25, 2e-4, 'tepe eğrilik yarıçapı ρ ≈ 1.25 m');
  const stays = (h) => { const s = K.makeSkate(T, { m: 1, h }); while (s.S.status === 'run') s.step(1e-3); return s.S.status === 'end'; };
  let lo = 2.6, hi = 3.6; for (let i = 0; i < 30; i++) { const mid = (lo + hi) / 2; if (stays(mid)) lo = mid; else hi = mid; }
  near(lo, y(uc) + rho / 2, 2e-4, 'pistte kalma sınırı'); ok(stays(3.1) && !stays(3.15), '3.10 m kalır, 3.15 m ayrılır');
  const s = K.makeSkate(T, { m: 50, h: 2.9 }); while (s.S.status === 'run') s.step(1e-3); near(s.S.endV, Math.sqrt(2 * g0 * (2.9 - y(17))), 1e-7, 'tümsek sonu hızı');
}
// 2e · Durma eşiği ve sınırlar
{ const T = K.makeTrack('u'), s = K.makeSkate(T, { m: 50, h: 0.1, mu: 0.3 }); ok(s.S.status === 'stuck', 'eğim < μ: kımıldamaz'); }
for (const bad of [() => K.makeTrack('x'), () => K.makeTrack('loop', 0.1), () => K.makeSkate(K.makeTrack('u'), { m: 1, h: 6 }), () => K.makeSkate(K.makeTrack('u'), { m: 0, h: 1 }), () => K.makeSkate(K.makeTrack('u'), { m: 1, h: 1, method: 'x' })]) { assert.throws(bad, (e) => e.name === 'RangeError'); checks++; }

/* ── 3 · Potansiyel eğrileri ── */
const runPot = (P, x0, v0, tEnd) => { const s = K.makePotSim(P, x0, v0); while (s.S.t < tEnd && s.S.status === 'run') s.step(1e-3); return s; };
// Bağımsız periyot: Gauss–Chebyshev (ikinci tür değil, x = c + d·cos θ ile birinci tür ağırlığı) — 2∫dx/v
const gcPeriod = (U, m, E, a, b, n = 6000) => { let s = 0; const c = (a + b) / 2, d = (b - a) / 2; for (let i = 1; i <= n; i++) { const th = ((2 * i - 1) * Math.PI) / (2 * n), x = c + d * Math.cos(th), w = Math.sqrt(1 - Math.cos(th) ** 2) * d; s += w / Math.sqrt((2 * (E - U(x))) / m); } return (2 * s * Math.PI) / n; };
for (const m of [0.5, 1, 2]) {
  const P = K.makePot('spring', m); ok(P.eq.length === 1 && Math.abs(P.eq[0].x) < 1e-12 && P.eq[0].stable, 'yay: tek kararlı denge');
  for (const A of [0.05, 1, 2]) { const s = runPot(P, A, 0, 12); near(s.period(), TAU * Math.sqrt(m / 20), 1e-9, 'yay periyodu genlikten bağımsız'); near(s.S.xMin, -A, 1e-9, 'simetrik dönüm'); }
  const G = K.makePot('grav', m); near(G.eq[0].x, (-m * g0) / 20, 1e-12, 'düşey yay dengesi −mg/k');
  for (const x0 of [-2, 0, 1]) {
    const E = 10 * x0 * x0 + m * g0 * x0, r = [(-m * g0 - Math.sqrt((m * g0) ** 2 + 40 * E)) / 20, (-m * g0 + Math.sqrt((m * g0) ** 2 + 40 * E)) / 20], I = K.wellInterval(G, E, x0), s = runPot(G, x0, 0, 8);
    near(I.x1, r[0], 1e-11, 'kök x₁'); near(I.x2, r[1], 1e-11, 'kök x₂'); near(s.S.xMin, r[0], 1e-9, 'ölçülen x₁'); near(s.S.xMax, r[1], 1e-9, 'ölçülen x₂'); near(s.period(), TAU * Math.sqrt(m / 20), 1e-9, 'düşey yay periyodu');
  }
}
{
  const P = K.makePot('double', 1), U = (x) => 2 * (x * x - 1) ** 2;
  ok(P.eq.length === 3 && P.eq[1].stable === false && P.eq[0].stable && P.eq[2].stable, 'çift kuyu: iki kararlı, bir kararsız');
  near(P.eq[0].x, -1, 1e-12); near(P.eq[1].x, 0, 1e-12); near(P.eq[2].x, 1, 1e-12); near(P.eq[2].k, 16, 1e-10, 'U″(±a) = 8U₀/a²'); near(P.eq[1].k, -8, 1e-10, 'U″(0) = −4U₀/a²');
  for (const x0 of [1.02, 1.1, 1.3, 1.6, 1.9, -1.9]) {
    const E = U(x0), q = Math.sqrt(E / 2), r = E < 2 ? [Math.sqrt(1 - q), Math.sqrt(1 + q)] : [-Math.sqrt(1 + q), Math.sqrt(1 + q)];
    if (x0 < 0) r[0] = -r[1];
    const I = K.wellInterval(P, E, x0), s = runPot(P, x0, 0, 15), Tref = gcPeriod(U, 1, E, r[0], r[1]);
    near(I.x1, r[0], 1e-10, 'çift kuyu x₁'); near(I.x2, r[1], 1e-10, 'çift kuyu x₂'); near(s.S.xMin, r[0], 1e-8, 'ölçülen x₁'); near(s.S.xMax, r[1], 1e-8, 'ölçülen x₂');
    near(K.periodIntegral(P, E, r[0], r[1]), Tref, 1e-6, 'sayfanın integrali ≈ Gauss–Chebyshev'); near(s.period(), Tref, 1e-6, 'ölçülen periyot = integral');
    if (x0 === 1.02) near(s.period(), TAU / 4, 2e-3, 'küçük genlikte 2π√(m/16)');
  }
  const top = K.makePotSim(P, 0, 0); ok(top.S.status === 'eq', 'kararsız dengede hareket yok');
}
{
  const P = K.makePot('lj', 1), U = (x) => x ** -12 - 2 * x ** -6;
  ok(P.eq.length === 1, 'LJ: tek denge'); near(P.eq[0].x, 1, 1e-12, 'denge x = σ'); near(P.eq[0].k, 72, 1e-9, 'U″(σ) = 72ε/σ²');
  for (const x0 of [1.02, 1.15, 1.6, 0.9]) {
    const E = U(x0), r6 = [1 + Math.sqrt(1 + E), 1 - Math.sqrt(1 + E)], r = [r6[0] ** (-1 / 6), r6[1] ** (-1 / 6)];
    const I = K.wellInterval(P, E, x0), s = runPot(P, x0, 0, 15), Tref = gcPeriod(U, 1, E, r[0], r[1]);
    near(I.x1, r[0], 1e-10, 'LJ x₁'); near(I.x2, r[1], 1e-10, 'LJ x₂'); near(s.period(), Tref, 1e-6, 'LJ periyot');
    ok(s.period() > TAU / Math.sqrt(72), 'LJ: genlik büyüdükçe periyot uzar');
  }
  const esc = runPot(P, 0.85, 0, 30); ok(esc.S.status === 'escape' && K.wellInterval(P, U(0.85), 0.85).x2 === null, 'E > 0: bağlı değil');
}
for (const bad of [() => K.makePot('x'), () => K.makePot('spring', 0)]) { assert.throws(bad, (e) => e.name === 'RangeError'); checks++; }

/* ── 4 · Güç ── */
// 4a · Vinç: kuvvet sınırlı kalkış + sabit güç evresinin kapalı çözümü
function liftExact(M, h, P, g = g0) {
  const Fm = 1.5 * M * g, a1 = Fm / M - g, v1 = P / Fm, t1 = v1 / a1, y1 = (v1 * v1) / (2 * a1), vt = P / (M * g);
  if (y1 >= h) { const v = Math.sqrt(2 * a1 * h); return { t: v / a1, v }; }
  // y₂(v) = [−(v² − v₁²)/2 − v_t(v − v₁) − v_t² ln((v_t − v)/(v_t − v₁))]/g; v, v_t'ye üstel yaklaşır:
  // Λ = ln((v_t − v)/(v_t − v₁)) için sabit nokta yinelemesi, sonra t₂ = (v_t·t₂ − y₂ = (v² − v₁²)/2g özdeşliğinden).
  let v = vt;
  for (let i = 0; i < 60; i++) { const Lam = -(g * (h - y1) + (v * v - v1 * v1) / 2 + vt * (v - v1)) / (vt * vt); v = vt - (vt - v1) * Math.exp(Lam); }
  return { t: t1 + (h - y1 + (v * v - v1 * v1) / (2 * g)) / vt, v };
}
for (const [M, h, Pin, eta] of [[500, 20, 10000, 0.8], [2000, 50, 30000, 1], [50, 2, 1000, 0.4], [1000, 10, 5000, 0.9]]) {
  const L = K.makeLift({ M, h, Pin, eta }); while (L.S.status === 'run') L.step(1e-3);
  const ex = liftExact(M, h, eta * Pin);
  near(L.S.t, ex.t, 1e-8, `kaldırma süresi M=${M}`); near(L.S.v, ex.v, 1e-8, 'tepe hızı');
  near(L.tIdeal, (M * g0 * h) / (eta * Pin), 1e-12, 'Mgh/P'); ok(L.S.t > L.tIdeal, 'gerçek süre ideal süreden uzun');
  near(L.S.W, M * g0 * h + 0.5 * M * L.S.v ** 2, 1e-9, 'enerji dengesi ∫F·v dt'); near(L.Ein(), L.S.W / eta, 1e-12, 'giriş enerjisi');
  near(L.vTerm, (eta * Pin) / (M * g0), 1e-12, 'v_son = P/(Mg)');
}
// 4b · Bisiklet: Cardano kökü ve enerji dengesi
for (const [m, grade, P, eta] of [[80, 6, 250, 0.97], [150, 15, 600, 0.9], [60, 0, 100, 1], [100, 10, 300, 0.95]]) {
  const B = K.makeBike({ m, grade, P, D: 2000, eta }), al = Math.atan(grade / 100), c3 = 0.5 * 1.2 * 0.4, c1 = m * g0 * (Math.sin(al) + 0.005 * Math.cos(al)), p = c1 / c3, q = (-eta * P) / c3;
  const disc = Math.sqrt((q * q) / 4 + (p ** 3) / 27), vC = Math.cbrt(-q / 2 + disc) + Math.cbrt(-q / 2 - disc);
  near(B.vSteady, vC, 1e-10, `Cardano kararlı hız ${grade}%`);
  if (B.S.status === 'slow') { ok(vC < 1, 'yavaş: model dışı'); continue; }
  while (B.S.status === 'run') B.step(0.01);
  near(B.S.v, vC, 1e-6, 'yokuş sonunda kararlı hıza varılmış'); near(B.h, 2000 * Math.sin(al), 1e-12, 'tırmanış');
  const bal = m * g0 * B.h + 0.005 * m * g0 * Math.cos(al) * 2000 + B.S.Wair + 0.5 * m * B.S.v ** 2 + B.S.Ein * (1 - eta);
  near(B.S.Ein, bal, 1e-6, 'bisiklet enerji dengesi');
  ok(B.S.t > B.tIdeal, 'kayıplar süreyi uzatır');
}
ok(K.makeBike({ m: 150, grade: 15, P: 100, D: 2000, eta: 0.9 }).S.status === 'slow', 'çok dik: model dışı');
// 4c · Birimler (SI tanımları)
near(K.UNITS.kWh, 3.6e6, 0); near(K.UNITS.Wh, 3600, 0); near(K.UNITS.kcal / K.UNITS.cal, 1000, 1e-15); near(K.UNITS.cal, 4.184, 0); ok(K.UNITS.eV === 1.602176634e-19, 'eV tam değer');

/* ── 5 · Varsayılan durumların görünen başvuru sayıları ── */
{ const s = K.runWork(K.makeWork({ kind: 'const', F0: 20, theta: 30, m: 2, mu: 0.2 })).S; near(s.v, 12.40827, 1e-6); near(s.t, 1.61183, 1e-5); near(s.W, 173.205, 1e-6); near(s.Wf, -19.24, 1e-9); }
near(K.loopMinHeight(1.2).h, 3.0, 1e-6);
{ const L = K.makeLift({ M: 500, h: 20, Pin: 10000, eta: 0.8 }); while (L.S.status === 'run') L.step(1e-3); near(L.S.t, 12.4565, 1e-5); near(L.tIdeal, 12.2625, 1e-9); }
console.log(`G iş-enerji: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright');
  const { createServer } = await import('node:http');
  const { join, extname } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const rootDir = fileURLToPath(new URL('../', import.meta.url));
  const server = createServer((req, res) => {
    const file = join(rootDir, decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream');
    res.end(fs.readFileSync(file));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  let browser;
  const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [['light', 390], ['dark', 1280]]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width < 500 ? 2 : 1, locale: 'tr-TR' });
      await ctx.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(8000);
      const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/is-enerji.html`);
      const text = (id) => page.locator('#' + id).textContent();
      const has = async (id, part) => { const t = await text(id); assert(t.includes(part), `[${width}] #${id}: "${t}" içinde "${part}" yok`); checks++; };
      const waitHas = async (id, part, ms = 8000) => { await page.waitForFunction(([i, p]) => document.getElementById(i).textContent.includes(p), [id, part], { timeout: ms }); checks++; };
      const range = (id, v) => page.locator('#' + id).evaluate((e, val) => { e.value = val; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v));
      const select = (id, v) => range(id, v);
      const clean = async (label) => {
        const bad = await page.evaluate(() => [...document.querySelectorAll('[role=tabpanel]:not([hidden]) td, [role=tabpanel]:not([hidden]) strong, [role=tabpanel]:not([hidden]) output, [role=tabpanel]:not([hidden]) .ie-status, [role=tabpanel]:not([hidden]) .bar span')].map((e) => e.textContent).filter((t) => /NaN|undefined|Infinity|null|−0\.0+(?!\d)/.test(t)));
        assert.deepEqual(bad, [], `[${width}] ${label}`); checks++;
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `[${width}] yatay taşma: ${label}`); checks++;
      };
      const ends = async (ids) => { for (const id of ids) for (const end of ['min', 'max']) { await page.locator('#' + id).evaluate((e, w) => { e.value = e[w]; e.dispatchEvent(new Event('input', { bubbles: true })); }, end); await page.waitForTimeout(40); await clean(`${id} ${end}`); } };
      // Erişilebilirlik
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll('.app-content input, .app-content select')].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      assert.equal(await page.evaluate(() => [...document.querySelectorAll('.app-content canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), true); checks++;
      assert.equal(await page.evaluate(() => /[\u0300-\u036f\u20d0-\u20ff]/.test(document.querySelector('.app-content').textContent.normalize('NFC'))), false, 'birleşik işaret yok'); checks++;
      assert.equal(await page.evaluate(() => Object.isFrozen(IsEnerjiLab)), true); checks++;

      // 01 · İş
      await has('wFOut', '20 N'); await has('wThOut', '30°'); await has('wMOut', '2.0 kg'); await has('wMuOut', '0.20');
      await page.click('#wSkip'); await has('wStatus', 'rayın sonuna'); await has('wWF', '173.205'); await has('wWFt', '173.205'); await has('wWs', '−19.240'); await has('wWst', '−19.240');
      await has('wDK', '153.965'); await has('wWnet', '153.965'); await has('wVm', '12.408'); await has('wVt', '12.408'); await has('wVd', '0.00 %'); await has('wT', '1.612'); await has('wN', '9.62 N');
      await page.click('#wPreWall'); await has('wStatus', 'kımıldamaz'); await has('wWF', '0.000'); await has('wWFd', '0.000 J'); await has('wDK', '0.000');
      await page.click('#wPreFree'); await page.click('#wSkip'); await has('wWs', '0.000'); await has('wWsd', '0.000 J'); await has('wVm', '13.161');
      await page.click('#wPreSpring'); await page.click('#wSkip'); await has('wWF', '200.000'); await has('wWs', '−19.620'); await has('wVm', '13.431'); await has('wKindOut', 'yay benzeri');
      await page.click('#wReset'); await select('wKind', 'piece'); assert.equal(await page.locator('#wNodes').isVisible(), true); checks++; await page.click('#wSkip'); await has('wWFt', '86.603'); await has('wVm', '7.574'); await has('wVt', '7.574');
      await range('wF', 60); await select('wKind', 'const'); await range('wTh', 60); await range('wM', 0.5); await has('wStatus', 'raydan kalkar'); await has('wWF', '—'); await clean('kalkış');
      await page.click('#wReset'); await has('wFOut', '20 N'); await has('wKindOut', 'sabit'); await has('wSpeedOut', '×0.5');
      await range('wV0', 5); await range('wF', 0); await page.click('#wSkip'); await has('wStatus', 'durdu'); await has('wX', '6.371'); await clean('durma');
      await page.click('#wReset');
      await ends(['wF', 'wTh', 'wM', 'wMu', 'wV0']); await select('wKind', 'piece'); await ends(['wN0', 'wN1', 'wN2', 'wN3', 'wN4']);
      // Parçalı profilde düğüm sürükleme
      { await page.locator('#wChart').scrollIntoViewIfNeeded(); const box = await page.locator('#wChart').boundingBox(); const before = await page.locator('#wN0').inputValue();
        await page.mouse.move(box.x + 52, box.y + box.height * 0.5); await page.mouse.down(); await page.mouse.move(box.x + 52, box.y + box.height * 0.8, { steps: 4 }); await page.mouse.up();
        assert.notEqual(await page.locator('#wN0').inputValue(), before, 'düğüm sürüklendi'); checks++; }
      await page.click('#wReset');

      // 02 · Kaykay pisti
      await page.click('#tab-skate'); await has('kHOut', '4.00 m'); await has('kTrackOut', 'U biçimli'); await has('kMethodOut', 'RK4');
      await page.waitForTimeout(600); assert.match(await text('kErr'), /^(< 1×10⁻¹²|−?\d\.\d\d×10⁻1[0-9])$/); checks++; await has('kVd', '0.00 %'); await has('kStatus', 'geri döner');
      assert.equal(await page.locator('#kRowMin').isHidden(), true); checks++;
      await select('kTrack', 'loop'); await has('kHOut', '3.50 m'); await has('kROut', '1.20 m'); assert.equal(await page.locator('#kRowMin').isVisible(), true); checks++;
      await page.click('#kBisect'); await has('kMinM', '3.0000'); await has('kMinT', '3.0000'); await has('kMinD', '0.000 %');
      await waitHas('kStatus', 'Pistin sonuna', 9000); await has('kTopM', '0.833'); await has('kTopT', '0.833'); await has('kVd', '0.00 %');
      await range('kH', 2.5); await waitHas('kStatus', 'pistten ayrıldı', 9000); await has('kDetM', '2.0667'); await has('kDetT', '2.0667'); await has('kDetD', '0.000 %'); await has('kN', 'uçuşta'); await has('kTopT', '0 (ayrılır)');
      await range('kR', 2); await page.click('#kBisect'); await has('kMinM', '5.0000'); await has('kMinT', '5.0000');
      await range('kMu', 0.05); await page.click('#kBisect'); await has('kMinT', 'kapalı form yok'); await has('kMinD', '—'); await clean('sürtünmeli döngü');
      await range('kMu', 0); await range('kR', 1.2);
      await select('kTrack', 'hump'); await has('kHOut', '2.90 m'); await waitHas('kStatus', 'Pistin sonuna', 9000);
      await range('kH', 3.5); await waitHas('kStatus', 'pistten ayrıldı', 9000); await has('kStatus', 'h ≤ 3.125 m');
      await select('kTrack', 'double'); await has('kHOut', '2.00 m'); await has('kStatus', 'hapsolur'); await range('kH', 3); await has('kStatus', 'iki kuyu arasında');
      await range('kMu', 0.1); await page.waitForTimeout(800); await has('kStatus', 'ısıya çevirdi'); assert.notEqual(await text('kHeat'), '0.0 J'); checks++;
      await select('kTrack', 'u'); await range('kMu', 0); await select('kMethod', 'euler'); await page.waitForTimeout(800); await has('kStatus', 'arttı'); await has('kMethodOut', 'açık Euler');
      await select('kMethod', 'semi'); await page.waitForTimeout(800); await has('kStatus', 'azaldı'); assert.match(await text('kStatus'), /şimdiden %\d+\.\d\d azaldı/); assert.doesNotMatch(await text('kStatus'), /%[−-]/); checks += 2;
      await page.click('#kReset'); await has('kMethodOut', 'RK4'); await has('kHOut', '4.00 m'); await has('kMOut', '50 kg');
      for (const t of ['u', 'loop', 'hump', 'double']) { await select('kTrack', t); await ends(['kH', 'kMu', 'kM']); if (t === 'loop') await ends(['kR']); }
      await range('kMu', 0.3); await select('kTrack', 'u'); await range('kH', 0.1); await has('kStatus', 'sürtünme'); await clean('kımıldamaz');
      await page.click('#kReset');

      // 03 · Potansiyel eğrisi
      await page.click('#tab-pot'); await has('pKindOut', 'yay'); await has('pE', '14.400 J'); await has('pX1t', '−1.2000'); await has('pX2t', '1.2000'); await has('pT0', '1.4050'); await has('pTi', '1.4050');
      await waitHas('pTm', '1.4050', 6000); await has('pT0d', '0.00 %'); await has('pTid', '0.000 %');
      await select('pKind', 'grav'); await has('pX0Out', '0.00 m'); await has('pX1t', '−0.9810'); await has('pStatus', 'kararlı'); await waitHas('pTm', '1.4050', 6000);
      await select('pKind', 'double'); await has('pX1t', '0.5568'); await has('pT0', '1.5708'); await has('pTi', '1.7666'); await waitHas('pTm', '1.7666', 7000); await has('pTid', '0.000 %'); await has('pStatus', 'kararsız');
      await page.click('#pPreTop'); await has('pStatus', 'kararsız dengenin'); await has('pTm', 'hareket yok'); await has('pTi', 'sonsuz (ayırıcı)'); await clean('tepe');
      await range('pV0', 0.05); await has('pStatus', 'iki kuyuyu'); await has('pT0', 'geçersiz');
      await page.click('#pPreBig'); await has('pX1t', '−1.9000'); await has('pT0', 'geçersiz');
      await select('pKind', 'lj'); await has('pT0', '0.7405'); await has('pTi', '0.9476'); await waitHas('pTm', '0.9476', 7000); assert.equal(await page.locator('#pPreTop').isHidden(), true); checks++;
      await range('pX0', 0.85); await has('pX2t', 'sonsuza'); await has('pStatus', 'bağlı değil'); await clean('kaçış');
      await page.click('#pPreSmall'); await has('pX0Out', '1.03 m');
      for (const k of ['spring', 'grav', 'double', 'lj']) { await select('pKind', k); await ends(['pX0', 'pV0', 'pM']); }
      { await select('pKind', 'spring'); await page.locator('#pStage').scrollIntoViewIfNeeded(); const box = await page.locator('#pStage').boundingBox(); await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5); const v = +(await page.locator('#pX0').inputValue()); assert(Math.abs(v) < 0.3, `tıklama x₀ ≈ 0: ${v}`); checks++; }
      await page.click('#pReset'); await has('pE', '14.400 J'); await has('pKindOut', 'yay');

      // 04 · Güç ve verim
      await page.click('#tab-power'); await has('gR1t', '12.26'); await has('gR2t', '1.6310'); await has('gPinOut', '10.0 kW'); await has('gEtaOut', '0.80');
      await page.click('#gSkip'); await has('gR1m', '12.456'); await has('gR1d', '+1.58 %'); await has('gR2m', '1.6310'); await has('gR3d', '0.0000 %'); await has('gR4m', '0.7946'); await has('gStatus', 'kinetik enerji');
      await has('gTrade', '61.31'); await has('gTrade', '4.09');
      await select('gScen', 'bike'); await has('gScenOut', 'bisiklet'); await has('gR2t', '4.3692'); await has('gR1t', '387.7'); await page.click('#gSkip'); await has('gR1m', '460.8'); await has('gR2m', '4.3692'); await has('gR3d', '0.0000 %'); await has('gStatus', 'yükselme %84.7');
      await range('gGrade', 15); await range('gBm', 150); await range('gBP', 100); await has('gStatus', 'model dışı'); await has('gR2t', '< 1 m/s'); await clean('yavaş');
      await ends(['gBm', 'gGrade', 'gBP', 'gD', 'gBeta']);
      await select('gScen', 'lift'); await ends(['gM', 'gH', 'gPin', 'gEta']);
      await page.click('#gReset'); await has('gMOut', '500 kg'); await has('gR1t', '12.26');
      await has('gUnitTable', '3.600×10⁶'); await has('gUnitTable', '860.4');
      await page.click('#gExBread'); await has('gUnitTable', '334.7'); await has('gUnitNote', 'öğretim değeri');
      await page.locator('#gUval').fill('2,5'); await page.selectOption('#gUnit', 'kJ'); await has('gUnitTable', '2500.0'); await page.locator('#gUval').fill('abc'); await has('gUnitTable', 'Geçerli bir sayı');
      await page.locator('#gUval').fill('1'); await page.selectOption('#gUnit', 'kWh');

      // Klavye: sekmeler, Boşluk, R
      await page.locator('#tab-power').focus(); await page.keyboard.press('Home'); assert.equal(await page.locator('#tab-work').getAttribute('aria-selected'), 'true'); checks++;
      await page.keyboard.press('ArrowRight'); assert.equal(await page.locator('#tab-skate').getAttribute('aria-selected'), 'true'); checks++;
      await page.keyboard.press('End'); assert.equal(await page.locator('#tab-power').getAttribute('aria-selected'), 'true'); checks++;
      await page.keyboard.press('ArrowRight'); assert.equal(await page.locator('#tab-work').getAttribute('aria-selected'), 'true'); checks++;
      await page.keyboard.press('ArrowLeft'); assert.equal(await page.locator('#tab-power').getAttribute('aria-selected'), 'true'); checks++;
      assert.equal(await page.locator('#panel-work').isHidden(), true); checks++;
      await page.click('#tab-skate'); await page.locator('h1').click(); await range('kM', 80); await page.keyboard.press('r'); await has('kMOut', '50 kg');
      await page.keyboard.press('Space'); await has('kToggle', 'Devam et'); const tA = await text('kT'); await page.waitForTimeout(300); assert.equal(await text('kT'), tA); checks++;
      await page.keyboard.press('Space'); await has('kToggle', 'Duraklat');
      await page.locator('#kM').focus(); await page.keyboard.press('r'); await has('kToggle', 'Duraklat');
      await clean('son'); assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      await ctx.close();
    }
    console.log(`G iş-enerji: ${checks - before} arayüz kontrolü (390 px açık + 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
