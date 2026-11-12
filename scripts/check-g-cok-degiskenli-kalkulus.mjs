// G · cok-degiskenli-kalkulus.html — kalıcı denetim.
// Çekirdek (KERNEL-BEGIN … KERNEL-END) node'da yüklenir ve sayfanın formüllerini KULLANMAYAN başvurularla
// karşılaştırılır: burada elle yazılmış türevler ve kritik noktalar, Lagrange problemlerinin kapalı çözümleri,
// Simpson/kutupsal kaba kuvvet integraller, Maclaurin serisiyle erf, Legendre polinom kesinliği.
// `--browser`: Playwright ile gerçek arayüz (390 px açık tema ve 1280 px koyu tema).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html = fs.readFileSync(new URL('../cok-degiskenli-kalkulus.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} }; vm.createContext(context); vm.runInContext(source, context);
const K = context.window.MultiCalcLab; assert(K, 'MultiCalcLab yok');
let checks = 0;
const near = (a, e, tol = 1e-10, msg = '') => { assert(Number.isFinite(a) && Math.abs(a - e) <= tol * Math.max(1, Math.abs(e)), `${msg} ${a} ≠ ${e} (tol ${tol})`); checks++; };
const ok = (c, msg = 'koşul') => { assert(c, msg); checks++; };
const eq = (a, b, msg = '') => { assert.equal(a, b, msg); checks++; };
const PI = Math.PI, E = Math.exp;

// 1) Ayrıştırıcı ve sembolik türev: elle yazılmış fonksiyon ve türevler
const HAND = {
  kubik: [(x, y) => x ** 3 - 3 * x + y ** 3 - 3 * y, (x, y) => 3 * x * x - 3, (x, y) => 3 * y * y - 3, (x, y) => 6 * x, (x, y) => 6 * y, () => 0],
  kase: [(x, y) => x * x + 2 * y * y, x => 2 * x, (x, y) => 4 * y, () => 2, () => 4, () => 0],
  eyer: [(x, y) => x * x - y * y, x => 2 * x, (x, y) => -2 * y, () => 2, () => -2, () => 0],
  gauss: [(x, y) => E(-(x * x + y * y)), (x, y) => -2 * x * E(-(x * x + y * y)), (x, y) => -2 * y * E(-(x * x + y * y)), (x, y) => (4 * x * x - 2) * E(-(x * x + y * y)), (x, y) => (4 * y * y - 2) * E(-(x * x + y * y)), (x, y) => 4 * x * y * E(-(x * x + y * y))],
  dipol: [(x, y) => x * E(-(x * x + y * y)), (x, y) => (1 - 2 * x * x) * E(-(x * x + y * y)), (x, y) => -2 * x * y * E(-(x * x + y * y)), (x, y) => (4 * x ** 3 - 6 * x) * E(-(x * x + y * y)), (x, y) => x * (4 * y * y - 2) * E(-(x * x + y * y)), (x, y) => y * (4 * x * x - 2) * E(-(x * x + y * y))],
  dalga: [(x, y) => Math.sin(x) * Math.cos(y), (x, y) => Math.cos(x) * Math.cos(y), (x, y) => -Math.sin(x) * Math.sin(y), (x, y) => -Math.sin(x) * Math.cos(y), (x, y) => -Math.sin(x) * Math.cos(y), (x, y) => -Math.cos(x) * Math.sin(y)],
  maymun: [(x, y) => x ** 3 - 3 * x * y * y, (x, y) => 3 * x * x - 3 * y * y, (x, y) => -6 * x * y, x => 6 * x, x => -6 * x, (x, y) => -6 * y]
};
eq(Object.keys(K.PRESETS).sort().join(), Object.keys(HAND).sort().join(), 'hazır ayar listesi');
const pts = [[0.3, -1.2], [-2.1, 0.7], [1.55, 1.9], [0, 0], [-0.8, -0.45]];
for (const [id, H] of Object.entries(HAND)) {
  const F = K.makeFn(K.PRESETS[id].src);
  for (const [x, y] of pts) ['f', 'fx', 'fy', 'fxx', 'fyy', 'fxy'].forEach((k, i) => near(F[k](x, y), H[i](x, y), 1e-12, id + ' ' + k));
  for (const [x, y] of pts) { const d = K.partials(F, x, y, 1e-3); near(d.fx, H[1](x, y), 1e-5, id + ' merkezî fx'); near(d.fy, H[2](x, y), 1e-5, id + ' merkezî fy'); }
}
for (const [src, fn] of [['2x^2 - 3y', (x, y) => 2 * x * x - 3 * y], ['-x^2', x => -x * x], ['2^-x', x => 2 ** -x], ['x*y/(1+x^2)', (x, y) => x * y / (1 + x * x)], ['sqrt(x^2+y^2+1)', (x, y) => Math.sqrt(x * x + y * y + 1)], ['ln(2+cos(x*y))', (x, y) => Math.log(2 + Math.cos(x * y))], ['atan(y/(x+3))', (x, y) => Math.atan(y / (x + 3))], ['tanh(x)·sinh(y) − cosh(x)', (x, y) => Math.tanh(x) * Math.sinh(y) - Math.cosh(x)], ['pi x²', x => PI * x * x], ['2,5*e^y', (x, y) => 2.5 * Math.exp(y)], ['(x+1)^(y+2)', (x, y) => (x + 1) ** (y + 2)], ['abs(x-y)', (x, y) => Math.abs(x - y)]]) {
  const F = K.makeFn(src);
  for (const [x, y] of [[0.4, 0.9], [1.3, -0.6], [0.05, 2.2]]) {
    near(F.f(x, y), fn(x, y), 1e-13, src);
    const h = 1e-5; near(F.fx(x, y), (fn(x + h, y) - fn(x - h, y)) / (2 * h), 2e-7, src + ' ∂x'); near(F.fy(x, y), (fn(x, y + h) - fn(x, y - h)) / (2 * h), 2e-7, src + ' ∂y');
    near(F.fxy(x, y), (fn(x + h, y + h) - fn(x + h, y - h) - fn(x - h, y + h) + fn(x - h, y - h)) / (4 * h * h), 2e-4, src + ' ∂xy');
  }
}
for (const bad of ['sin x', '(x', 'x y z', 'xy', '2..3', 'x $ y', '', 'foo(x)', 'x^', 'ln(-1-x^2-y^2)']) { assert.throws(() => K.makeFn(bad), undefined, bad); checks++; }
// sabit üslü kuvvet kuralı: üs aritmetiği metinde sadeleşir (x^(−2 − 1) değil x^(−3))
for (const [src, fx] of [['x^(-2)*y', '−2·x^(−3)·y'], ['x^-2', '−2x^(−3)'], ['x^(1/3)+y', '1 / 3·x^(−2 / 3)'], ['(x^2+y^2)^(-3/2)', '−3·(x² + y²)^(−2.5)·x'], ['x^(2-3)', '−x^(−2)'], ['x^3*y^2', '3·x²·y²']]) { const F = K.makeFn(src); eq(F.fxText, fx, src + ' metni'); for (const [x, y] of [[0.7, 1.3], [1.9, -0.4]]) { const h = 1e-6; near(F.fx(x, y), (F.f(x + h, y) - F.f(x - h, y)) / (2 * h), 1e-6, src + ' sade türev değeri'); } }
// merkezî fark: büyük h'de hata h² ile (kubik, fxxx = 6 → hata = h²)
{ const F = K.makeFn(K.PRESETS.kubik.src); for (const h of [1e-1, 1e-2, 1e-3]) near(K.partials(F, 0.5, 1.5, h).fx - (-2.25), h * h, 1e-6, 'merkezî fark hatası h²'); }

// 2) Kritik noktalar: elle bulunmuş listeler
const CRIT = {
  kubik: [[-1, -1, 'max'], [-1, 1, 'eyer'], [1, -1, 'eyer'], [1, 1, 'min']], kase: [[0, 0, 'min']], eyer: [[0, 0, 'eyer']], gauss: [[0, 0, 'max']],
  dipol: [[-Math.SQRT1_2, 0, 'min'], [Math.SQRT1_2, 0, 'max']], dalga: [[-PI / 2, 0, 'min'], [0, -PI / 2, 'eyer'], [0, PI / 2, 'eyer'], [PI / 2, 0, 'max']], maymun: [[0, 0, 'belirsiz']]
};
for (const [id, list] of Object.entries(CRIT)) {
  const r = K.criticalPoints(K.makeFn(K.PRESETS[id].src));
  eq(r.points.length, list.length, id + ' kritik nokta sayısı');
  list.forEach(([x, y, k], i) => { near(r.points[i].x, x, 1e-6, id + ' x'); near(r.points[i].y, y, 1e-6, id + ' y'); eq(r.points[i].kind, k, id + ' tür'); if (k !== 'belirsiz') eq(r.points[i].ring, k, id + ' çevre'); });
}
{ const m = K.criticalPoints(K.makeFn(K.PRESETS.maymun.src)).points[0]; eq(m.ring, 'eyer'); eq(m.changes, 6, 'maymun eyeri: 3 vadi'); eq(m.agree, null); }
// gradyan seviye eğrisine dik
for (const id of ['kubik', 'gauss', 'dipol', 'dalga', 'eyer']) { const F = K.makeFn(K.PRESETS[id].src), sc = K.scales(F); for (const [x, y] of [[0.5, 1.5], [-1.3, 0.4], [2, -2]]) { const a = K.levelAngle(F, x, y, 0.004, sc); if (a.defined) near(a.angle, 90, 2e-5, id + ' dik açı'); } }
{ const F = K.makeFn(K.PRESETS.kase.src); eq(K.levelAngle(F, 0, 0, 0.004, K.scales(F)).defined, false, 'kritik noktada açı tanımsız'); }

// 3) Yönlü türev, tarama, doğrusallaştırma
{
  const F = K.makeFn(K.PRESETS.kase.src);
  for (const th of [0, 37, 90, 200, 296]) { const d = K.directional(F, 1, -1, th), u = [Math.cos(th * PI / 180), Math.sin(th * PI / 180)]; near(d.theory, 2 * u[0] - 4 * u[1], 1e-13); near(d.measured, 2 * u[0] - 4 * u[1], 1e-7); }
  const sw = K.sweep(F, 1, -1); near(sw.angle, 360 + Math.atan2(-4, 2) * 180 / PI, 1e-5, 'en dik yön'); near(sw.max, Math.sqrt(20), 1e-7, '|∇f|');
  for (const th of [0, 45, 120]) for (const s of [1.5, 0.5, 0.01]) { const u = [Math.cos(th * PI / 180), Math.sin(th * PI / 180)], ex = s * s * (u[0] ** 2 + 2 * u[1] ** 2); const r = K.linError(F, 1, -1, th, s); near(r.E, ex, 1e-9); near(r.Q, ex, 1e-12); }
  near(K.linSeries(F, 1, -1, 0).slope, 2, 1e-6, 'karesel azalma');
  const G = K.makeFn(K.PRESETS.eyer.src); near(K.linSeries(G, 1, 1, 0).slope, 2, 1e-6); eq(K.linSeries(G, 0.5, 0.5, 45).slope, null, 'x²−y² 45°: hata tam sıfır');
  const M = K.makeFn(K.PRESETS.maymun.src); near(K.linSeries(M, 0, 0, 0).slope, 3, 1e-6, 'uᵀHu = 0: kübik azalma');
  const D = K.makeFn(K.PRESETS.dalga.src); const sl = K.linSeries(D, 0.7, 0.3, 10).slope; ok(Math.abs(sl - 2) < 0.02, 'dalga eğim ~2: ' + sl);
}

// 4) Lagrange: kapalı çözümler
for (const c of [0.25, 1, 2.35, 4]) {
  const r = K.lagrangeStudy('lin', 'cember', c, 'max'); near(r.brute.f, Math.sqrt(5 * c), 1e-12); near(r.best.f, Math.sqrt(5 * c), 1e-12); near(r.best.lambda, Math.sqrt(5) / (2 * Math.sqrt(c)), 1e-10); near(r.sens, Math.sqrt(5) / (2 * Math.sqrt(c)), 1e-3); near(r.angle, 0, 1e-6);
  const m = K.lagrangeStudy('lin', 'cember', c, 'min'); near(m.brute.f, -Math.sqrt(5 * c), 1e-12); near(m.angle, 180, 1e-6);
  const e = K.lagrangeStudy('lin', 'elips', c, 'max'); near(e.best.f, 2 * Math.sqrt(2 * c), 1e-12); near(e.best.lambda, Math.sqrt(2 / c), 1e-10); near(e.brute.f, 2 * Math.sqrt(2 * c), 1e-12);
  const p = K.lagrangeStudy('carpim', 'cember', c, 'max'); near(p.brute.f, c / 2, 1e-12); near(p.best.lambda, 0.5, 1e-10); near(p.sens, 0.5, 1e-6); eq(p.sols.length, 4);
  const pe = K.lagrangeStudy('carpim', 'elips', c, 'min'); near(pe.brute.f, -c, 1e-12); near(pe.best.lambda, -1, 1e-10);
  const k = K.lagrangeStudy('kase', 'cember', c, 'max'); near(k.brute.f, 2 * c, 1e-12); near(k.best.lambda, 2, 1e-10);
  const kmin = K.lagrangeStudy('kase', 'cember', c, 'min'); near(kmin.brute.f, c, 1e-12); near(kmin.best.lambda, 1, 1e-10);
}
for (const c of [-2, -0.75, 0.5, 2]) {
  const r = K.lagrangeStudy('kase', 'dogru', c, 'min'); near(r.brute.f, 2 * c * c / 3, 1e-12); near(r.best.lambda, 4 * c / 3, 1e-9); near(r.best.x, 2 * c / 3, 1e-7); near(r.sens, 4 * c / 3, 1e-6);
  eq(K.lagrangeStudy('kase', 'dogru', c, 'max').brute.unbounded, true);
  const p = K.lagrangeStudy('carpim', 'dogru', c, 'max'); near(p.brute.f, c * c / 4, 1e-12); near(p.best.lambda, c / 2, 1e-9); eq(K.lagrangeStudy('carpim', 'dogru', c, 'min').brute.unbounded, true);
  const l = K.lagrangeStudy('lin', 'dogru', c, 'max'); eq(l.brute.unbounded, true); eq(l.sols.length, 0, 'x+2y doğruda: Lagrange noktası yok');
}
{ const z = K.lagrangeStudy('kase', 'dogru', 0, 'min'); near(z.brute.f, 0, 1e-12); eq(z.angle, null, '∇f = 0'); }

// 5) Çift integral
const erfS = x => { let s = 0, t = x; for (let n = 0; n < 200; n++) { s += t / (2 * n + 1); t *= -x * x / (n + 1); } return 2 / Math.sqrt(PI) * s; };
for (const [x, v] of [[0.5, 0.5204998778130465], [1, 0.8427007929497149], [2, 0.9953222650189527]]) near(K.erf(x), v, 1e-14, 'erf tablo');
for (const x of [0.25, 1.7, 3]) near(K.erf(x), erfS(x), 1e-12, 'erf seri');
{ const g = K.glNodes(12); near(g.w.reduce((a, b) => a + b), 2, 1e-14); for (let k = 0; k <= 23; k++) near(g.x.reduce((s, x, i) => s + g.w[i] * x ** k, 0), k % 2 ? 0 : 2 / (k + 1), 1e-13, 'GL derece ' + k); }
const simpson = (f, a, b, n = 400) => { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; };
const QF = { bir: () => 1, kare: (x, y) => x * x + y * y, gauss: (x, y) => E(-(x * x + y * y)), xy: (x, y) => x * y };
const brute = (f, reg, a) => reg === 'kare' ? simpson(x => simpson(y => f(x, y), -a, a, 600), -a, a, 600)
  : reg === 'ucgen' ? simpson(x => simpson(y => f(x, y), 0, a - x, 600), 0, a, 600)
    : simpson(r => r * simpson(t => f(r * Math.cos(t), r * Math.sin(t)), 0, 2 * PI, 200), 0, a, 2000);
for (const a of [0.5, 1, 2.3, 4]) for (const fid of Object.keys(QF)) for (const reg of ['kare', 'disk', 'ucgen']) {
  const F = K.makeFn(K.QFUNCS[fid]), ex = K.exactIntegral(fid, reg, a), ref = brute(QF[fid], reg, a);
  const scale = Math.max(Math.abs(ref), a ** 4 * 1e-3, 1);
  if (ex !== null) ok(Math.abs(ex - ref) <= 1e-8 * scale, `${fid} ${reg} ${a} kesin ${ex} / ${ref}`);
  const A = K.iterated(F.f, reg, a, 'dydx'), B = K.iterated(F.f, reg, a, 'dxdy');
  ok(Math.abs(A - ref) <= 1e-8 * scale, `${fid} ${reg} ${a} dydx`); ok(Math.abs(A - B) <= 1e-11 * scale, 'Fubini');
}
// Gauss üçgen: tek katlı ∫₀^a e^(−x²) (√π/2) erf(a−x) dx (seri erf ile)
for (const a of [1, 2]) near(K.iterated(K.makeFn(K.QFUNCS.gauss).f, 'ucgen', a, 'dydx'), simpson(x => E(-x * x) * Math.sqrt(PI) / 2 * erfS(a - x), 0, a, 2000), 1e-10, 'Gauss üçgen');
// Riemann
{ const one = K.makeFn('1').f; for (const n of [2, 3, 16, 101]) { near(K.riemann(one, 'ucgen', 1.7, n).sum, 1.7 ** 2 / 2, 1e-12, 'üçgen yarım ağırlık: alan tam'); near(K.riemann(one, 'kare', 1.3, n).sum, 4 * 1.69, 1e-12); }
  const sq = K.makeFn(K.QFUNCS.kare).f; for (const n of [4, 10, 40]) near(K.riemann(sq, 'kare', 1, n).sum, 8 / 3 - 2 * (2 / n) ** 2 / 3, 1e-12, 'orta nokta hatası: 2·(2/3 − h²/6)·2, h = 2/n');
  near(K.riemannSeries(sq, 'kare', 1, 8 / 3).slope, -2, 1e-6); eq(K.riemannSeries(one, 'ucgen', 1, 0.5).slope, null);
  const ds = K.riemannSeries(sq, 'disk', 1, PI / 2).slope; ok(ds > -2.2 && ds < -1.2, 'disk eğim ' + ds);
  for (const n of [1, 7, 50]) { near(K.polar(one, 2, n, true), 4 * PI, 1e-12, 'kutupsal alan'); near(K.polar(one, 2, n, false), 4 * PI, 1e-12, 'r olmadan: 2π·a'); }
  near(K.polar(K.makeFn(K.QFUNCS.gauss).f, 4, 200, true), PI * (1 - E(-16)), 2e-4, 'Gauss → π');
  near(K.polar(K.makeFn(K.QFUNCS.gauss).f, 4, 2000, true), PI, 2e-6, 'Gauss → π, n = 2000');
}
// Monte Carlo: yansız, standart hata dürüst, eğim ~ −1/2
{ const f = K.makeFn(K.QFUNCS.kare).f; let inside = 0; const T = 400; for (let s = 1; s <= T; s++) { const r = K.monteCarlo(f, 'disk', 1, 400, s); if (Math.abs(r.est - PI / 2) <= 2 * r.se) inside++; } ok(inside / T > 0.9 && inside / T < 0.99, '2σ kapsama ' + inside / T);
  for (const seed of [1, 50]) { const sl = K.mcRms(f, 'disk', 1, seed, PI / 2).slope; ok(sl < -0.4 && sl > -0.6, 'MC eğim ' + sl); }
  eq(K.monteCarlo(f, 'disk', 1, 1000, 7).est, K.monteCarlo(f, 'disk', 1, 1000, 7).est, 'tohum tekrarlanabilir'); }
console.log(`G cok-degiskenli-kalkulus: ${checks.toLocaleString('tr-TR')} bağımsız türev, kritik nokta, Lagrange, integral ve Monte Carlo kontrolü PASS`);

if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright'); const { createServer } = await import('node:http'); const { join, extname } = await import('node:path'); const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); });
  await new Promise(r => server.listen(0, '127.0.0.1', r)); let browser; const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [['light', 390], ['dark', 1280]]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
      await page.addInitScript(t => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      page.setDefaultTimeout(8000); const errors = [];
      page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); }); page.on('response', r => { if (r.status() >= 400) errors.push(r.status() + ' ' + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/cok-degiskenli-kalkulus.html`);
      const read = id => page.locator('#' + id).textContent(), has = async (id, t) => { const v = await read(id); assert(v.includes(t), `${id}: “${v}” içinde “${t}” yok`); checks++; };
      const range = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v);
      const sel = (id, v) => page.locator('#' + id).selectOption(v);
      ok(/10⁻¹⁶·\|f\|\/h/.test(await page.locator('#panel-g .mc-note').first().textContent()), 'yuvarlama notu |f| içermeli');
      // her denetimin etiketi
      eq(await page.evaluate(() => [...document.querySelectorAll('main input, main select')].filter(e => !(e.labels && e.labels.length)).map(e => e.id).join()), '', 'etiketsiz denetim');
      eq(await page.evaluate(() => [...document.querySelectorAll('main canvas')].every(c => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), true);
      // 01
      await has('gF', '−2.5'); await has('gFxM', '−2.249999'); await has('gFxT', '−2.25'); await has('gAngle', '90.000°'); await has('gCritCount', '4'); await has('gCritRows', 'eyer (4 işaret değişimi)');
      await range('gH', 12); await has('gStatus', 'yuvarlama'); await range('gH', 1); await has('gFxM', '−2.24');
      await page.locator('#gToCrit').click(); await has('gXOut', '1.00'); await has('gYOut', '1.00'); await has('gAngle', 'tanımsız'); await has('gGrad', '≈ 0');
      await sel('gFn', 'maymun'); await has('gCritRows', 'karar yok'); await has('gCritRows', '6 işaret değişimi');
      await page.locator('#gExpr').fill('xy'); await page.locator('#gApply').click(); await has('gErr', 'Bilinmeyen ad'); eq(await page.locator('#gFn').inputValue(), 'maymun');
      await page.locator('#gExpr').fill('x*y + 0.5*x^2'); await page.locator('#gExpr').press('Enter'); eq(await page.locator('#gFn').inputValue(), 'ozel'); await has('gFormula', '∂f/∂x = y + x'); await has('gCritCount', '1');
      await range('gX', -2.5); await range('gY', 2.5); await has('gXOut', '−2.50');
      await page.locator('#gMap').focus(); await page.keyboard.press('ArrowRight'); await has('gXOut', '−2.45'); await page.locator('#g3d').focus(); await page.keyboard.press('ArrowLeft');
      await page.locator('#gReset').click(); await has('gF', '−2.5'); eq(await page.locator('#gFn').inputValue(), 'kubik');
      // 02
      await page.locator('#tab-d').click(); await has('dDt', '2'); await has('dMax', '296.57°'); await has('dGrad', '4.47214'); await has('dLinE', '0.25'); await has('dSlope', '2.000'); await has('dPlane', '(y + 1.00)');
      await page.locator('#dToGrad').click(); await has('dThetaOut', '297°'); await page.locator('#dToLevel').click(); await has('dThetaOut', '27°');
      await sel('dFn', 'maymun'); await range('dX', 0); await range('dY', 0); await has('dGrad', '≈ 0'); await has('dSlope', '3.000');
      await range('dTheta', 359); await range('dS', 1.5); await has('dSOut', '1.50'); await page.locator('#dReset').click(); await has('dThetaOut', '0°'); await has('dDm', '2');
      // 03
      await page.locator('#tab-l').click(); await has('lBrute', '2.236067977'); await has('lLambda', '1.118034'); await has('lAngle', '0.0000°'); await has('lSens', '1.11805');
      await sel('lCon', 'dogru'); eq(await page.locator('#lC').getAttribute('min'), '-2'); await has('lBrute', 'sınırsız'); await has('lRows', 'yakınsamadı');
      await sel('lObj', 'kase'); await sel('lMode', 'min'); await has('lBrute', '0.6666666667'); await has('lLambda', '1.333333'); await range('lC', -2); await has('lBrute', '2.666666667');
      await sel('lObj', 'carpim'); await sel('lCon', 'cember'); await sel('lMode', 'max'); await range('lC', 4); await has('lBrute', '2'); await has('lLambda', '0.5');
      await page.locator('#lReset').click(); await has('lBrute', '2.236067977'); await has('lCOut', '1.00');
      // 04
      await page.locator('#tab-q').click(); await has('qExact', '1.570796327'); await has('qRiem', '1.677734375'); await has('qPolarNoR', '%'); await has('qFubB', 'fark ≈ 0');
      await page.locator('#qGaussPi').click(); await has('qPolar', '3.141697028'); await has('qSqrt', '1.77245385'); await has('qExact', '3.141592'); await has('qAOut', '4.00');
      await page.locator('#qFubini').click(); await has('qExact', '0.6666666667'); await has('qFubA', '0.666666666667'); await has('qPolar', 'yalnız disk');
      await sel('qFn', 'gauss'); await has('qExactLabel', 'Referans'); await sel('qFn', 'bir'); await has('qErr', '≈ 0'); await has('qSlope', 'tanımsız');
      await page.locator('#qExpr').fill('x^2*y'); await page.locator('#qApply').click(); eq(await page.locator('#qFn').inputValue(), 'ozel');
      await range('qN', 200); await range('qN', 2); await range('qA', 0.5); await range('qMcK', 5); await range('qSeed', 100); await has('qMc', '±');
      await page.locator('#qReset').click(); await has('qRiem', '1.677734375');
      // klavye: sekmeler ve R
      await page.locator('#tab-q').focus(); await page.keyboard.press('Home'); eq(await page.locator('#tab-g').getAttribute('aria-selected'), 'true');
      await page.keyboard.press('ArrowLeft'); eq(await page.locator('#tab-q').getAttribute('aria-selected'), 'true'); await page.keyboard.press('End'); await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-g').getAttribute('aria-selected'), 'true');
      await range('gX', 2); await page.locator('h1').click(); await page.keyboard.press('r'); await has('gXOut', '0.50');
      for (const t of ['g', 'd', 'l', 'q']) { await page.locator('#tab-' + t).click(); eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'yatay taşma ' + t); }
      eq(await page.evaluate(() => Object.isFrozen(MultiCalcLab) && !Object.getOwnPropertyDescriptor(window, 'MultiCalcLab').writable), true);
      assert.deepEqual(errors, []); checks++;
      await page.close();
    }
    console.log(`G cok-degiskenli-kalkulus: ${checks - before} gerçek arayüz kontrolü (390 px açık, 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise(r => server.close(r)); }
}
