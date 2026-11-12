// G · diferansiyel-denklemler.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END) node'da yüklenir; başvurular sayfanın formüllerini KULLANMAZ:
// yöntemlerin y′ = λy için kapalı büyüme çarpanları, kesin çözümlerin ODE'yi sağlaması (sonlu fark),
// özdeğer/özvektör tanımı (A v = λ v), bağımsız bir integratörle (yarı adımlı RK4 / Verlet) yörüngeler,
// Lotka–Volterra'nın korunan niceliği, karmaşık empedans, kapalı biçimli serbest salınım ve vuru formülleri.
// `--browser`: 390 px açık ve 1280 px koyu temada gerçek arayüz denetimi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../diferansiyel-denklemler.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.DiffEqLab;
assert(Object.isFrozen(K), 'çekirdek dondurulmuş olmalı');
assert(!/\beval\s*\(|new Function/.test(source), 'ayrıştırıcı eval kullanmamalı');

let checks = 0;
const TAU = 2 * Math.PI;
const near = (a, e, tol, label = '') => { assert(Number.isFinite(a) && Math.abs(a - e) <= tol * Math.max(1, Math.abs(e)), `${label} ${a} ≠ ${e} (tol ${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };

// ── Ayrıştırıcı: JS Math ile karşılaştır; zararlı/bozuk girdileri reddet ──
const cases = [['y*(1 - y/4)', (t, y) => y * (1 - y / 4)], ['sin(t) - y/2', (t, y) => Math.sin(t) - y / 2], ['-2ty', (t, y) => -2 * t * y], ['2^-1*y', (t, y) => 0.5 * y],
  ['-y^2', (t, y) => -(y * y)], ['exp(-t)cos(2pi t)', (t, y) => Math.exp(-t) * Math.cos(2 * Math.PI * t)], ['sqrt(abs(y)) + ln(1+t^2)', (t, y) => Math.sqrt(Math.abs(y)) + Math.log(1 + t * t)], ['3(y - t)', (t, y) => 3 * (y - t)], ['y − t', (t, y) => y - t], ['2^3^2', () => 512], ['0,5y', (t, y) => 0.5 * y]];
for (const [src, ref] of cases) { const r = K.parseExpression(src); ok(r.ok, 'ayrıştırılamadı: ' + src); for (const [t, y] of [[0.3, -1.2], [1.7, 0.4], [2.2, 3.1]]) near(r.fn(t, y), ref(t, y), 1e-12, src); }
for (const bad of ['', 'y;', 'constructor', 'alert(1)', 'sin y', '(y', 'y)', 'x + y', '2**3', 'y = 1', 'this.y', '`y`', 'a'.repeat(200)]) ok(!K.parseExpression(bad).ok, 'reddedilmeliydi: ' + bad);

// ── Yöntemler: y′ = λy için kapalı büyüme çarpanları ──
for (const lam of [-2, -0.5, 0.7]) for (const h of [0.5, 0.1]) {
  const f = (t, y) => lam * y, z = lam * h, N = 10;
  near(K.integrate1(f, 'euler', 0, 1, N * h, N), (1 + z) ** N, 1e-12, 'Euler çarpanı');
  near(K.integrate1(f, 'heun', 0, 1, N * h, N), (1 + z + z * z / 2) ** N, 1e-12, 'Heun çarpanı');
  near(K.integrate1(f, 'rk4', 0, 1, N * h, N), (1 + z + z * z / 2 + z ** 3 / 6 + z ** 4 / 24) ** N, 1e-12, 'RK4 çarpanı');
}
// Kesin çözümler ODE'yi sağlıyor mu (merkezi fark) ve başlangıçtan geçiyor mu
for (const key of ['logistic', 'linear', 'gauss']) {
  const P = K.ODE1[key], f = K.parseExpression(P.src).fn;
  for (const y0 of [P.y0min, P.y0, P.y0max]) {
    near(P.exact(P.win[0], y0, P.win[0]), y0, 1e-12, key + ' başlangıç');
    for (const t of [0.3, 0.9, 1.6]) { const d = 1e-5, y = P.exact(0, y0, t); if (!Number.isFinite(y)) continue; near((P.exact(0, y0, t + d) - P.exact(0, y0, t - d)) / (2 * d), f(t, y), 1e-6, key + ' ODE'); }
  }
}
// Hata mertebesi: en küçük üç h'nin eğimi
for (const key of ['logistic', 'linear', 'gauss', 'custom']) {
  const P = K.ODE1[key], f = K.parseExpression(P.src).fn, S = K.errorStudy(f, P.exact, P.win[0], P.y0, P.win[1]);
  near(S.slopes.euler.value, 1, 0.06, key + ' Euler eğimi'); near(S.slopes.heun.value, 2, 0.06, key + ' Heun eğimi'); near(S.slopes.rk4.value, 4, 0.04, key + ' RK4 eğimi');
}
{ // y′ = y − t, y₀ = 1: çözüm doğru, her yöntem kesin, eğim tanımsız
  const S = K.errorStudy((t, y) => y - t, K.ODE1.linear.exact, 0, 1, 3);
  for (const m of ['euler', 'heun', 'rk4']) { ok(S.slopes[m].value === null && S.slopes[m].reason === 'floor', 'doğru çözümde eğim tanımsız olmalı'); }
}
{ // Özel ifadede başvuru: bağımsız ince Euler-Richardson karşılaştırması
  const f = (t, y) => Math.sin(t) - y / 2; let y = 1; const n = 600000, h = 6 / n;
  for (let i = 0; i < n; i++) { const t = i * h, k1 = f(t, y); y += h * f(t + h / 2, y + (h / 2) * k1); }
  near(K.errorStudy(f, null, 0, 1, 6).yT, y, 1e-9, 'özel başvuru');
}
{ // Dengeler
  const E = K.equilibria1((t, y) => y * (1 - y / 4), [0, 8, -1, 5]);
  ok(E.autonomous && E.list.length === 2, 'lojistik iki denge'); near(E.list[0].y, 0, 1e-12); near(E.list[1].y, 4, 1e-9); near(E.list[0].dStart, 1, 1e-6); near(E.list[1].dStart, -1, 1e-6);
  ok(E.list[0].cls === 'unstable' && E.list[1].cls === 'stable', 'lojistik kararlılık'); ok(E.list[0].meas[0].escaped && E.list[1].meas[1].d1 < 1e-4, 'lojistik benzetim');
  const G = K.equilibria1((t, y) => -2 * t * y, [0, 2, -2, 2]); ok(!G.autonomous && G.list.length === 1 && G.list[0].cls === 'varying', 'gauss y = 0');
  ok(K.equilibria1((t, y) => y - t, [0, 3, -6, 6]).list.length === 0, 'y − t dengesiz');
  const S = K.equilibria1((t, y) => y * y, [0, 1, -1, 1]); ok(S.list.length === 1 && S.list[0].cls === 'semi', 'y² yarı kararlı');
}

// ── Doğrusal sistemler ──
const rnd = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647) * 6 - 3; })();
for (let i = 0; i < 300; i++) {
  const A = [rnd(), rnd(), rnd(), rnd()].map((v) => Math.round(v * 10) / 10), e = K.eig2(...A);
  if (e.kind === 'zero' || e.kind === 'singular') continue;
  if (e.real) for (const [l, v] of [[e.l1, e.v1], [e.l2, e.v2]]) {
    near((A[0] - l) * (A[3] - l) - A[1] * A[2], 0, 1e-8, 'karakteristik kök');
    if (v) { near(A[0] * v[0] + A[1] * v[1], l * v[0], 1e-8, 'Av = λv'); near(A[2] * v[0] + A[3] * v[1], l * v[1], 1e-8, 'Av = λv'); }
  } else { const re = e.re, im = e.im; near((A[0] - re) * (A[3] - re) - im * im - A[1] * A[2], 0, 1e-8, 'karmaşık kök Re'); near(-im * (A[0] + A[3] - 2 * re), 0, 1e-8, 'karmaşık kök Im'); }
  const det = A[0] * A[3] - A[1] * A[2], tr = A[0] + A[3];
  ok(det < 0 ? e.kind === 'saddle' : tr * tr < 4 * det ? /spiral|centre/.test(e.kind) : /node|deg/.test(e.kind), 'sınıf ' + A);
}
const PRE = { saddle: [1, 2, 2, -2], nodeS: [-2, 1, 1, -2], nodeU: [2, 1, 1, 2], spiralS: [-0.2, -2, 1, -0.4], spiralU: [0.2, -2, 1, 0.2], centre: [0, -2, 1, 0], degS: [-1, 0, 1, -1] };
for (const [kind, A] of Object.entries(PRE)) {
  const m = K.measureLinear(A, 2, 0); ok(m.ok && m.e.kind === kind, kind);
  if (m.complex) { near(m.period, TAU / m.e.im, 1e-7, kind + ' periyot'); near(m.rate, m.e.re, 1e-7, kind + ' büyüme'); }
  else if (kind === 'degS') { const exact = (t) => Math.log(2 * Math.exp(-t) * Math.hypot(1, t)); near(m.fwd, (exact(m.T2) - exact(m.T1)) / (m.T2 - m.T1), 1e-6, 'dejenere ileri'); }
  else { near(m.fwd, m.e.l1, 1e-5, kind + ' ileri'); near(m.bwd, m.e.l2, 1e-5, kind + ' geri'); }
}
{ // Yörünge: bağımsız matris üsteli (seri) ile karşılaştır
  const A = PRE.spiralS, t = 1.3; let term = [1, 0, 0, 1], sum = [1, 0, 0, 1];
  for (let k = 1; k < 40; k++) { term = [term[0] * A[0] + term[1] * A[2], term[0] * A[1] + term[1] * A[3], term[2] * A[0] + term[3] * A[2], term[2] * A[1] + term[3] * A[3]].map((v) => (v * t) / k); sum = sum.map((v, i) => v + term[i]); }
  let x = 2, y = 0; const F = (u, v) => [A[0] * u + A[1] * v, A[2] * u + A[3] * v]; for (let i = 0; i < 1300; i++) [x, y] = K.rk4sys(F, x, y, 0.001);
  near(x, 2 * sum[0], 1e-10, 'e^(At) x'); near(y, 2 * sum[2], 1e-10, 'e^(At) y');
}
ok(!K.measureLinear([0, 0, 0, 0], 1, 1).ok && !K.measureLinear(PRE.saddle, 0, 0).ok, 'tanımsız ölçüm');
ok(K.measureLinear([1, 0, 0, -1], 0, 2).onV2, 'özvektör üzerinde başlangıç');

// ── Doğrusal olmayan sistemler ──
const eqs = (k, p) => K.equilibria2(k, p).map((q) => ({ ...q, pr: K.probe(k, p, q) }));
{
  const C = eqs('competition', {}); assert.equal(JSON.stringify(C.map((q) => [Math.round(q.x * 1e9) / 1e9, Math.round(q.y * 1e9) / 1e9])), '[[0,0],[0,2],[1,1],[3,0]]'); checks++;
  assert.equal(C.map((q) => q.e.kind).join(), 'nodeU,nodeS,saddle,nodeS'); checks++;
  assert.equal(C.map((q) => q.pr.cls).join(), 'unstable,stable,saddle,stable'); checks++;
  near(C[2].e.l1, Math.SQRT2 - 1, 1e-6, 'eyer λ'); near(C[2].e.l2, -Math.SQRT2 - 1, 1e-6, 'eyer λ');
  const P = eqs('pendulum', { b: 0.3 }); ok(P.length === 5, 'sarkaç 5 denge'); P.forEach((q, i) => near(q.x, (i - 2) * Math.PI, 1e-10, 'kπ'));
  ok(P.every((q, i) => (i % 2 ? q.pr.cls === 'saddle' : q.pr.cls === 'stable' && q.pr.turns > 1)), 'sarkaç benzetim');
  near(P[2].e.re, -0.15, 1e-6); near(P[2].e.im, Math.sqrt(1 - 0.0225), 1e-6);
  const P0 = eqs('pendulum', { b: 0 }); ok(P0[2].e.kind === 'centre' && P0[2].pr.cls === 'closed', 'b = 0 merkez');
  ok(eqs('pendulum', { b: 2.5 })[2].e.kind === 'nodeS' && eqs('pendulum', { b: 2.5 })[2].pr.turns < 0.6, 'aşırı sönümlü sarkaç düğüm');
  const LV = eqs('lv', {}); ok(LV.length === 2 && LV[1].e.kind === 'centre' && LV[1].pr.cls === 'closed' && LV[0].pr.cls === 'saddle', 'LV');
  const V = (x, y) => x - Math.log(x) + y - 2 * Math.log(y), tr = K.trajectory2('lv', {}, 1.5, 2, 60), v0 = V(1.5, 2);
  ok(tr.pts.every(([, x, y]) => Math.abs(V(x, y) - v0) < 1e-8), 'LV korunan nicelik');
  const VP = eqs('vdp', { mu: 0.5 }); ok(VP.length === 1 && VP[0].e.kind === 'spiralU' && VP[0].pr.cls === 'unstable', 'vdP orijin');
  ok(eqs('vdp', { mu: 3 })[0].e.kind === 'nodeU', 'vdP μ = 3 düğüm');
}
{ // Limit çevrim: bağımsız Verlet-benzeri değil, yarım adımlı RK4 ile ve başka başlangıçtan
  for (const mu of [0.1, 0.5, 1, 2, 5]) {
    const lc = K.limitCycle(mu), F = (x, y) => [y, mu * (1 - x * x) * y - x];
    let x = 3, y = 0, t = 0; const h = 0.001; const ups = []; let maxX = -Infinity;
    while (t < 300 && ups.length < 4) { const [nx, ny] = K.rk4sys(F, x, y, h); if (t > 150) { if (x < 0 && nx >= 0) ups.push(t + (h * -x) / (nx - x)); maxX = Math.max(maxX, nx); } x = nx; y = ny; t += h; }
    near(lc.period, (ups[3] - ups[0]) / 3, 1e-5, 'vdP periyot ' + mu); near(lc.amp, maxX, 1e-5, 'vdP genlik ' + mu); near(lc.ampMin, -lc.amp, 1e-6, 'simetri');
  }
  near(K.limitCycle(0.1).amp, 2, 1e-3, 'küçük μ genlik'); near(K.limitCycle(0.1).period, TAU * (1 + 0.01 / 16), 1e-5, 'küçük μ periyot');
  const big = K.limitCycle(40).period; near(big, (3 - 2 * Math.log(2)) * 40 + 7.01432 * 40 ** (-1 / 3), 0.003, 'büyük μ asimptotu');
}

// ── İkinci mertebe ──
const freeRef = (m, c, k, x0, v0, t) => { // serbest salınımın kapalı çözümü
  const g = c / (2 * m), w0 = Math.sqrt(k / m);
  if (g < w0) { const wd = Math.sqrt(w0 * w0 - g * g); return Math.exp(-g * t) * (x0 * Math.cos(wd * t) + ((v0 + g * x0) / wd) * Math.sin(wd * t)); }
  if (Math.abs(g - w0) < 1e-12) return Math.exp(-g * t) * (x0 + (v0 + g * x0) * t);
  const s = Math.sqrt(g * g - w0 * w0), r1 = -g + s, r2 = -g - s; return ((v0 - r2 * x0) * Math.exp(r1 * t) - (v0 - r1 * x0) * Math.exp(r2 * t)) / (r1 - r2);
};
for (const [m, c, k] of [[1, 0.4, 4], [1, 4, 4], [1, 3, 1], [0.5, 0, 2]]) {
  const sim = K.simOsc(m, c, k, 0, 1, 1, 0.3, 10, 0.005);
  for (const i of [100, 777, sim.n]) near(sim.x[i], freeRef(m, c, k, 1, 0.3, sim.t[i]), 1e-8, 'serbest çözüm');
  const R = K.oscRoots(m, c, k), H = K.measureHomogeneous(m, c, k, 0, 1, K.simOsc(m, c, k, 0, 1, 1, 0, K.viewTime(m, c, k, 1), 0.005));
  ok(H.ok, 'homojen ölçüm');
  if (H.kind === 'osc') { near(H.gamma, c / (2 * m), 1e-5, 'γ'); near(H.Td, TAU / Math.sqrt(k / m - (c / (2 * m)) ** 2), 1e-5, 'T_d'); }
  else { const fr = (t) => Math.log(Math.abs(freeRef(m, c, k, 1, 0, t))); near(H.rate, (fr(H.t2) - fr(H.t1)) / (H.t2 - H.t1), 1e-6, 'eğim'); near(R.slow + H.corr, (fr(H.t2) - fr(H.t1)) / (H.t2 - H.t1), 1e-9, 'kuram düzeltmesi'); }
}
{ // Süperpozisyon: x − xp homojen kapalı çözüme eşit
  const [m, c, k, F, w] = [1, 0.4, 4, 1, 1.5], sim = K.simOsc(m, c, k, F, w, 1, 0, 20, 0.005), xp = K.particular(m, c, k, F, w), [a0, b0] = xp(0);
  for (const i of [500, 2500, sim.n]) near(sim.x[i] - xp(sim.t[i])[0], freeRef(m, c, k, 1 - a0, -b0, sim.t[i]), 1e-8, 'süperpozisyon');
}
for (const [m, c, k, F, w] of [[1, 0.4, 4, 1, 1.5], [1, 0.4, 4, 1, 1.98], [2, 1, 3, 0.5, 2.5], [0.1, 0.02, 10, 1, 9]]) { // karmaşık empedans
  const Z = { re: k - m * w * w, im: c * w }, A = F / Math.hypot(Z.re, Z.im), phi = Math.atan2(Z.im, Z.re), s = K.measureSteady(m, c, k, F, w);
  near(s.A, A, 1e-5, 'kalıcı genlik'); near(s.phi, phi, 1e-5, 'faz');
}
{ // Tepe: kapalı biçimin ince kaba-kuvvet maksimumu
  const [m, c, k, F] = [1, 0.4, 4, 1]; let best = [0, 0]; for (let w = 1.5; w < 2.5; w += 1e-5) { const A = F / Math.hypot(k - m * w * w, c * w); if (A > best[1]) best = [w, A]; }
  const pk = K.refinePeak(m, c, k, F, 1.9, 2.05); near(pk.w, best[0], 2e-4, 'tepe ω'); near(pk.A, best[1], 1e-5, 'tepe A');
}
{ // Vuru: 2π/|ω − ω₀|; tam rezonans: F/(2mω₀)
  for (const w of [1.8, 1.9, 1.5]) { const b = K.measureBeats(1, 4, 1, w, 0, 0); ok(b.ok, 'vuru ' + w); near(b.meas, TAU / Math.abs(w - 2), 2e-4, 'vuru periyodu ' + w); }
  const r = K.measureBeats(1, 4, 1, 2, 0, 0); ok(r.ok && r.resonant, 'rezonans'); near(r.slope, 0.25, 1e-3, 'rezonans büyümesi');
  ok(K.measureBeats(1, 4, 1, 1, 0, 0).reason === 'far' && K.measureBeats(1, 4, 1, 1.99, 0, 0).reason === 'long', 'vuru sınırları');
  ok(K.measureSteady(1, 0, 4, 1, 1.5) === null && K.measureHomogeneous(1, 0, 4, 1, 2, K.simOsc(1, 0, 4, 1, 2, 0, 0, 30, 0.005)).reason === 'none', 'c = 0 durumları');
}
console.log(`G diferansiyel-denklemler: ${checks} bağımsız çekirdek kontrolü PASS`);

if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright');
  const { createServer } = await import('node:http');
  const { join, extname } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url));
  const server = createServer((req, res) => {
    const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream');
    res.end(fs.readFileSync(file));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  let browser; const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [['light', 390], ['dark', 1280]]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width < 500 ? 2 : 1, locale: 'tr-TR' });
      await ctx.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(8000);
      const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('response', (r) => { if (r.status() >= 400) errors.push(r.status() + ' ' + r.url()); }); page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/diferansiyel-denklemler.html`);
      const text = (id) => page.locator('#' + id).textContent();
      const has = async (id, part) => { const t = await text(id); assert(t.includes(part), `[${width}] #${id}: "${t}" içinde "${part}" yok`); checks++; };
      const range = (id, v) => page.locator('#' + id).evaluate((e, val) => { e.value = val; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v));
      const clean = async (label) => {
        const bad = await page.evaluate(() => [...document.querySelectorAll('[role=tabpanel]:not([hidden]) td, [role=tabpanel]:not([hidden]) th, [role=tabpanel]:not([hidden]) strong, [role=tabpanel]:not([hidden]) output, [role=tabpanel]:not([hidden]) .de-status')].map((e) => e.textContent).filter((t) => /NaN|undefined|Infinity|null/.test(t)));
        assert.deepEqual(bad, [], `[${width}] ${label}`); checks++;
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `[${width}] yatay taşma: ${label}`); checks++;
      };
      const ends = async (ids, label) => { for (const id of ids) for (const end of ['min', 'max']) { await page.locator('#' + id).evaluate((e, w) => { e.value = e[w]; e.dispatchEvent(new Event('input', { bubbles: true })); }, end); await clean(`${label} ${id} ${end}`); } };
      assert.deepEqual(await page.evaluate(() => [...document.querySelectorAll('.app-content input, .app-content select')].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id)), []); checks++;
      assert.equal(await page.evaluate(() => [...document.querySelectorAll('.app-content canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), true); checks++;
      assert.equal(await page.evaluate(() => /[\u0300-\u036f]/.test(document.querySelector('.app-content').textContent.normalize('NFC'))), false); checks++;
      assert.equal(await page.evaluate(() => !document.querySelector('script[src^="http"], link[href*="fonts.g"], link[href*="atlas"], script[src*="stem"]')), true); checks++;

      // 01
      await has('f1Exact', '3.974666'); await has('f1Num', '3.988365'); await has('f1E', '0.0137'); await has('f1E2', '6.64×10⁻³'); await has('f1P', '1.04'); await has('f1SlopeE', '1.016'); await has('f1SlopeH', '2.036'); await has('f1SlopeR', '4.037');
      await has('f1EqRows', '4.0000'); await has('f1EqRows', 'kararsız (itici)'); await has('f1EqRows', 'pencereden çıktı');
      await page.selectOption('#f1Method', 'rk4'); await has('f1P', '(+'); await page.selectOption('#f1H', '0.025'); await clean('rk4 küçük h');
      await page.selectOption('#f1Preset', 'linear'); await range('f1Y0', 1); await has('f1Status', 'yuvarlama düzeyinde kesin'); await has('f1SlopeE', 'tanımsız');
      await page.selectOption('#f1Preset', 'gauss'); await page.selectOption('#f1Method', 'euler'); await page.selectOption('#f1H', '1'); await has('f1Status', 'kararlılık sınırı'); await has('f1Status', 'en düşük −4.00'); await has('f1EqRows', 'zamanla değişir');
      await page.fill('#f1Expr', 'y^2 - t)'); await page.click('#f1Apply'); await has('f1ExprMsg', 'okunamadı'); assert.equal(await page.locator('#f1Preset').inputValue(), 'gauss'); checks++;
      await page.fill('#f1Expr', 'y*(1-y)*(y-2)'); await page.press('#f1Expr', 'Enter'); assert.equal(await page.locator('#f1Preset').inputValue(), 'custom'); checks++; await has('f1Exact', 'başvuru'); await has('f1EqRows', '2.0000'); await has('f1EqRows', '1.0000');
      { await page.locator('#f1Field').scrollIntoViewIfNeeded(); const box = await page.locator('#f1Field').boundingBox(); await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.4); } await clean('tıklama');
      await ends(['f1Y0'], 'f1');
      await page.click('#f1Reset'); await has('f1Num', '3.988365'); assert.equal(await page.locator('#f1Expr').inputValue(), 'y*(1 - y/4)'); checks++;

      // 02
      await page.click('#tab-linear'); await has('l2Type', 'Kararlı sarmal'); await has('l2Lam', '−0.300 ± 1.411i'); await has('l2Meas', '4.4540'); await has('l2Meas', '0.2628'); await has('l2Meas', '0.00 %');
      for (const [b, t] of [['saddle', 'Eyer'], ['nodeS', 'Kararlı düğüm'], ['nodeU', 'Kararsız düğüm'], ['spiralU', 'Kararsız sarmal'], ['centre', 'Merkez'], ['deg', 'Dejenere kararlı'], ['star', 'Kararlı yıldız']]) { await page.click('#l2p-' + b); await has('l2Type', t); await clean(b); }
      await page.click('#l2p-saddle'); await has('l2Meas', '2.0000'); await has('l2Meas', '−3.0000'); await page.click('#l2p-deg'); await has('l2Status', 'ln(t₂/t₁)'); await page.click('#l2p-centre'); await has('l2Meas', 'fark');
      await range('l2X0', 0); await range('l2Y0', 0); await has('l2Status', 'tam dengede');
      await ends(['l2A', 'l2B', 'l2C', 'l2D', 'l2X0', 'l2Y0'], 'l2');
      await page.click('#l2Reset'); await has('l2Type', 'Kararlı sarmal'); await has('l2X0Out', '2.0');
      { await page.locator('#l2Phase').scrollIntoViewIfNeeded(); const box = await page.locator('#l2Phase').boundingBox(); await page.mouse.click(box.x + box.width * 0.3, box.y + box.height * 0.3); } assert.notEqual(await text('l2X0Out'), '2.0'); checks++;
      await page.click('#l2Reset');

      // 03
      await page.click('#tab-nonlin'); await has('n3EqRows', '(3.142, 0.000)'); await has('n3EqRows', 'eyer'); await has('n3EqRows', 'uyumlu'); await has('n3Fate', 'dengesine yaklaştı'); await has('n3Amp', 'yalnız van der Pol');
      await range('n3B', 0); await has('n3EqRows', 'merkez'); await has('n3Status', 'b = 0');
      await page.selectOption('#n3Sys', 'competition'); await has('n3EqRows', '(1.000, 1.000)'); await has('n3EqRows', '(3.000, 0.000)'); await clean('rekabet');
      await page.selectOption('#n3Sys', 'lv'); await has('n3EqRows', 'kapalı yörünge'); await clean('lv');
      await page.selectOption('#n3Sys', 'vdp'); await has('n3Amp', '2.0025'); await has('n3PerT', '6.3814'); await has('n3Per', '6.3807'); await has('n3Fate', 'limit çevrim'); await clean('vdp');
      await ends(['n3Mu', 'n3X0', 'n3Y0'], 'vdp');
      await page.click('#n3Reset'); await has('n3BOut', '0.30'); assert.equal(await page.locator('#n3MuField').isHidden(), true); checks++;

      // 04
      await page.click('#tab-osc'); await has('o4Roots', '−0.2000 ± 1.9900i'); await has('o4DecRows', '0.2000'); await has('o4SsRows', '0.5405'); await has('o4SsRows', '18.92');
      await page.waitForFunction(() => /Tarama tamam/.test(document.getElementById('o4SwCaption').textContent), null, { timeout: 20000 }); checks++;
      await has('o4SwRows', '1.9799'); await has('o4SwRows', '1.2563');
      await page.click('#o4Crit'); await has('o4Regime', 'Kritik'); await has('o4DecRows', '−1.8653'); await has('o4SwRows', 'F = 0');
      await page.click('#o4Over'); await has('o4Regime', 'Aşırı'); await has('o4DecRows', '−0.3820');
      await page.click('#o4Beat'); await has('o4SsRows', '31.416'); assert.equal(/söner/.test(await text('o4Status')), false, 'c = 0 iken durum satırı "söner" dememeli'); checks++; await has('o4SwCaption', 'c = 0');
      await page.click('#o4Res'); await has('o4SsRows', '0.2500'); await has('o4DecRows', 'xₕ ≡ 0');
      await page.click('#o4Under'); await has('o4SsRows', 'F = 0'); await clean('serbest');
      await ends(['o4M', 'o4C', 'o4K', 'o4F', 'o4W', 'o4X0', 'o4V0'], 'o4');
      await page.click('#o4Reset'); await has('o4MOut', '1.0'); await has('o4WOut', '1.50');

      // Klavye
      await page.locator('#tab-osc').focus(); await page.keyboard.press('Home'); assert.equal(await page.locator('#tab-field').getAttribute('aria-selected'), 'true'); checks++;
      await page.keyboard.press('ArrowRight'); assert.equal(await page.locator('#tab-linear').getAttribute('aria-selected'), 'true'); checks++;
      await page.keyboard.press('End'); assert.equal(await page.locator('#tab-osc').getAttribute('aria-selected'), 'true'); checks++;
      await page.keyboard.press('ArrowRight'); assert.equal(await page.locator('#panel-field').isHidden(), false); checks++;
      await page.keyboard.press('ArrowRight');
      await page.locator('h1').click(); await range('l2A', 1); await page.keyboard.press('r'); await has('l2AOut', '−0.2');
      await page.keyboard.press('Space'); await has('l2Pause', 'Devam et'); await page.keyboard.press('Space'); await has('l2Pause', 'Duraklat');
      await page.locator('#l2A').focus(); await page.keyboard.press('r'); await has('l2Pause', 'Duraklat');
      await page.waitForSelector('section.digest', { timeout: 8000 }); checks++;
      await clean('son'); assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      await ctx.close();
    }
    console.log(`G diferansiyel-denklemler: ${checks - before} arayüz kontrolü (390 px açık + 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
