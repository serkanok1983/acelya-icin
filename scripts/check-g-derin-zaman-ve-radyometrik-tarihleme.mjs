// derin-zaman-ve-radyometrik-tarihleme: independent checks of the frozen DeepTimeLab kernel.
// References do not reuse the page's formulas: ICS v2026/06 boundary ages re-typed from the chart PDF,
// forward decay bookkeeping (parent and daughter atoms) for isochrons and concordia, brute-force
// permutation counting for the cross-section puzzles, a separate random generator for Monte Carlo
// checks of the Signor–Lipps gap, and plain clock arithmetic for the "one day" mapping.
// Usage: node scripts/check-g-derin-zaman-ve-radyometrik-tarihleme.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';

const SLUG = 'derin-zaman-ve-radyometrik-tarihleme';
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'Kernel boundaries are required');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.DeepTimeLab;
assert(K && Object.isFrozen(K), 'DeepTimeLab must be a frozen object');
let checks = 0;
const near = (a, b, tol = 1e-9, msg = '') => { assert(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${msg} ${a} ≠ ${b}`); checks++; };
const ok = (cond, msg) => { assert(cond, msg); checks++; };
const eq = (a, b, msg = '') => { assert.equal(a, b, msg || `${a} ≠ ${b}`); checks++; };

/* ── head and title ── */
{
  const title = html.match(/<title>([^<]+)<\/title>/)[1];
  ok(title.length <= 80 && title.startsWith('Derin Zaman ve Radyometrik Tarihleme: '), 'title');
  ok(/data-page="derin-zaman-ve-radyometrik-tarihleme"/.test(html), 'data-page');
  ok(!/[̀-ͯ]/.test(html), 'no combining marks');
  ok(!/<script[^>]+src="https?:/.test(html), 'no external scripts');
}

/* ── ICS v2026/06, re-typed from the chart PDF ── */
const ICS = {
  0: [['Hadean', 4567], ['Archean', 4031], ['Proterozoic', 2500], ['Phanerozoic', 538.8]],
  1: [['Eoarchean', 4031], ['Paleoarchean', 3600], ['Mesoarchean', 3200], ['Neoarchean', 2800], ['Paleoproterozoic', 2500], ['Mesoproterozoic', 1600], ['Neoproterozoic', 1000], ['Paleozoic', 538.8], ['Mesozoic', 251.902], ['Cenozoic', 66.00]],
  2: [['Siderian', 2500], ['Rhyacian', 2300], ['Orosirian', 2050], ['Statherian', 1800], ['Calymmian', 1600], ['Ectasian', 1400], ['Stenian', 1200], ['Tonian', 1000], ['Cryogenian', 720], ['Ediacaran', 635], ['Cambrian', 538.8], ['Ordovician', 486.85], ['Silurian', 443.1], ['Devonian', 419.62], ['Carboniferous', 358.86], ['Permian', 298.9], ['Triassic', 251.902], ['Jurassic', 201.4], ['Cretaceous', 143.1], ['Paleogene', 66.00], ['Neogene', 23.04], ['Quaternary', 2.58]],
  3: [['Paleocene', 66.00], ['Eocene', 56.00], ['Oligocene', 33.9], ['Miocene', 23.04], ['Pliocene', 5.333], ['Pleistocene', 2.58], ['Holocene', 0.0117]],
};
for (const lv of [0, 1, 2, 3]) {
  const L = K.LEVELS[lv];
  eq(L.length, ICS[lv].length, 'level ' + lv + ' count');
  ICS[lv].forEach(([en, base], i) => { eq(L[i].en, en); near(L[i].base, base, 1e-12, en); });
  for (let i = 0; i < L.length; i++) { ok(L[i].base > L[i].top, 'base > top ' + L[i].en); if (i + 1 < L.length) eq(L[i].top, L[i + 1].base); }
  eq(L[L.length - 1].top, 0);
}
for (const [en, u] of [['Archean', 3], ['Phanerozoic', 0.6], ['Ordovician', 1.5], ['Silurian', 0.9], ['Devonian', 1.36], ['Carboniferous', 0.19], ['Permian', 0.15], ['Triassic', 0.024], ['Jurassic', 0.2], ['Cretaceous', 0.6]]) near(K.LEVELS.flat().find((x) => x.en === en).unc, u, 1e-12, en);
ok(K.LEVELS[2].find((u) => u.en === 'Cryogenian').approx && K.LEVELS[2].find((u) => u.en === 'Ediacaran').approx, 'approximate Neoproterozoic bases');
// nesting: every period and era lies inside one unit of the level above (Hadean has no eras)
for (const lv of [1, 2]) for (const u of K.LEVELS[lv]) { const up = K.LEVELS[lv - 1].filter((p) => p.base >= u.base - 1e-9 && p.top <= u.top + 1e-9); eq(up.length, 1, 'nesting ' + u.en); }
for (const u of K.LEVELS[3]) ok(u.base <= 66 && u.top >= 0, 'epochs in Cenozoic');
eq(K.unitAt(2, 100).en, 'Cretaceous'); eq(K.unitAt(2, 66.5).en, 'Cretaceous'); eq(K.unitAt(0, 3000).en, 'Archean'); eq(K.unitAt(3, 0.005).en, 'Holocene'); eq(K.unitAt(1, 4500), null);
// events and extinctions: dates from the sources that were opened
const ev = (n) => K.EVENTS.find((e) => e.name === n).age;
near(ev('Kretase–Paleojen'), 66); near(ev('Permiyen–Triyas'), 252); near(ev('Triyas–Jura'), 201.3); near(ev('Geç Devoniyen'), 372); near(ev('Geç Ordovisiyen'), 445); near(ev('Kambriyen patlaması'), 538.8); near(ev('Jack Hills zirkonları'), 4404); near(ev('Homo sapiens'), 0.3);
eq(K.EVENTS.filter((e) => e.ext).length, 5); eq(K.EXTINCTIONS.length, 5);
for (let i = 1; i < K.EVENTS.length; i++) ok(K.EVENTS[i].age < K.EVENTS[i - 1].age, 'events sorted old → young');

/* ── clock mapping: plain arithmetic ── */
for (const [age, h, m, s] of [[4567, 0, 0, 0], [0, 24, 0, 0], [66, 23, 39, 11], [538.8, 21, 10, 6], [0.3, 23, 59, 54]]) {
  const sec = (4567 - age) / 4567 * 86400, c = K.clockOf(age);
  eq(Math.floor(sec / 3600), h); eq(c.h, h); eq(c.m, m); eq(Math.floor(c.s), s);
}
near(K.yearOf(66).days, 365 * (1 - 66 / 4567), 1e-12); near(K.dayFraction(4567.3), 0); near(K.dayFraction(-1), 1);
near(4567e6 / 86400, 52858, 1e-4, 'years per second'); near(4567 / 365, 12.512, 1e-4, 'Ma per day of year');

/* ── 02 · cross-sections: brute-force permutations ── */
function perms(a) { if (a.length <= 1) return [a]; const out = []; a.forEach((x, i) => { for (const p of perms([...a.slice(0, i), ...a.slice(i + 1)])) out.push([x, ...p]); }); return out; }
const validBrute = (sc) => perms(sc.events.map((e) => e.id)).filter((o) => sc.rel.every(([a, b]) => o.indexOf(a) < o.indexOf(b)));
const expectOrders = [1, 2, 1];
K.SCENES.forEach((sc, k) => {
  const v = validBrute(sc);
  eq(v.length, expectOrders[k], 'valid orders scene ' + k); eq(K.countOrders(sc), v.length);
  const sol = K.solveOrder(sc); ok(K.checkOrder(sc, sol).valid, 'solution valid');
  const sh = K.shuffleOrder(sc, k * 31 + 7); ok(!K.checkOrder(sc, sh).valid, 'initial shuffle is not solved'); eq(new Set(sh).size, sc.events.length);
  // reversed order violates every relation
  eq(K.checkOrder(sc, [...sol].reverse()).ok, 0);
  // every rock unit is visible in the section
  const seen = new Set();
  for (let i = 0; i < 240; i++) for (let j = 0; j < 220; j++) { const id = K.sectionAt(sc, i / 240, 0.9 * (1 - j / 220)); if (id) seen.add(id); }
  for (const e of sc.events) if (e.kind === 'deposit' || e.kind === 'dike') ok(seen.has(e.id), `scene ${k}: ${e.id} visible`);
});
// geometry agrees with the stated relations
{
  const [s1, s2, s3] = K.SCENES, at = K.sectionAt;
  // scene 1: the dike crosses D (D on both sides of K at one level) and is offset by the fault
  let dSides = false; for (let y = 0.52; y < 0.58; y += 0.005) for (let x = 0.4; x < 0.7; x += 0.002) if (at(s1, x, y) === 'D' && at(s1, x + 0.06, y) === 'K' && at(s1, x + 0.14, y) === 'D') dSides = true; ok(dSides, 'K cuts D');
  const dikeX = (y) => { const xs = []; for (let x = 0; x < 1; x += 0.001) if (at(s1, x, y) === 'K') xs.push(x); return xs.length ? (xs[0] + xs[xs.length - 1]) / 2 : null; };
  ok(Math.abs(dikeX(0.1) - (0.6 - 0.1 * 0.1)) < 0.005, 'dike below fault unmoved'); ok(Math.abs(dikeX(0.45) - (0.6 - 0.1 * 0.45)) > 0.02, 'dike above fault offset');
  // the C/D contact is at different heights on the two sides of the fault
  const contact = (x) => { for (let y = 0.3; y < 0.7; y += 0.001) if (at(s1, x, y) === 'D') return y; return null; };
  ok(Math.abs(contact(0.2) - contact(0.85)) > 0.05, 'fault throw visible');
  // erosion: nothing older than U above it; E fills above
  ok(at(s1, 0.5, 0.75) === 'E' && at(s1, 0.5, 0.86) === null, 'E on top, sky above');
  // scene 2: the layers are tilted, C reaches the erosion surface, D contains K1 pebbles (label)
  const topOf = (sc, x, id) => { let t = null; for (let y = 0; y < 0.9; y += 0.002) if (at(sc, x, y) === id) t = y; return t; };
  ok(Math.abs(topOf(s2, 0.85, 'A') - topOf(s2, 0.15, 'A')) > 0.15, 'A–C tilted');
  ok(s2.events.find((e) => e.id === 'D').pebbles.includes('K1'), 'pebbles of K1 in D');
  let k2cutsE = false; for (let y = 0.65; y < 0.79; y += 0.01) if (at(s2, 0.7, y) === 'E' && at(s2, 0.776, y) === 'K2' && at(s2, 0.86, y) === 'E') k2cutsE = true; ok(k2cutsE, 'K2 cuts E');
  // scene 3 brackets: brute force over all valid orders
  const b = K.bracket(s3, 'B'); eq(b.youngerThan.id, 'V'); eq(b.olderThan.id, 'K'); near(b.youngerThan.age, 75.2); near(b.olderThan.age, 68.4);
  const d = K.bracket(s3, 'D'); eq(d.youngerThan.id, 'K'); eq(d.olderThan.id, 'L');
  for (const o of validBrute(s3)) ok(o.indexOf('V') < o.indexOf('B') && o.indexOf('B') < o.indexOf('K'), 'B between V and K');
  const a = K.bracket(s3, 'A'); eq(a.youngerThan, null); eq(a.olderThan.id, 'V');
}

/* ── 03 · Rb–Sr isochron from forward decay bookkeeping ── */
const lamRb = Math.LN2 / 48.8e3; // per Ma, USGS half-life 48.8 Ga
near(K.LAMBDA.rb87 / 1e6 / 1.4204e-11, 1, 1e-4, 'λ Rb per year');
for (const tAge of [50, 500, 1500, 4500]) {
  // atoms per 86Sr: Rb0 decays, radiogenic 87Sr grows; the initial ratio is never used in the fit
  const r0 = 0.7123, xs = [], ys = [];
  for (const rb0 of [0.1, 0.5, 2, 5, 12, 30]) { const rbNow = rb0 * Math.exp(-lamRb * tAge); xs.push(rbNow); ys.push(r0 + (rb0 - rbNow)); }
  const n = xs.length, mx = xs.reduce((s, v) => s + v) / n, my = ys.reduce((s, v) => s + v) / n;
  let sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; }
  const m = sxy / sxx, b = my - m * mx;
  near(K.slopeToAge(m), tAge, 1e-9, 'isochron age'); near(b, r0, 1e-9, 'initial ratio from intercept');
  near(K.ageToSlope(tAge), m, 1e-9);
  const S = K.isoSamples({ t: tAge, r0: 0.704, n: 7, sigma: 0, seed: 3 }), f = K.isoFit(S, 0);
  near(f.t, tAge, 1e-9); near(f.b, 0.704, 1e-12);
  for (const p of S) near(K.modelAge(p, 0.704), tAge, 1e-9, 'model age with the true initial ratio');
}
{ // a wrong assumed initial ratio gives scattered single-sample ages; the isochron does not care
  const S = K.isoSamples({ t: 1500, r0: 0.704, n: 7, sigma: 0, seed: 1 }), ages = S.map((p) => K.modelAge(p, 0.7));
  ok(Math.max(...ages) - Math.min(...ages) > 1000, 'model ages scatter'); ok(ages[0] > ages[6], 'low-Rb sample most biased');
}
{ // ±2σ coverage and MSWD ≈ 1 with honest errors; open system gives large MSWD
  let cover = 0, mswd = 0; const N = 400;
  for (let s = 1; s <= N; s++) { const f = K.isoFit(K.isoSamples({ t: 1500, r0: 0.704, n: 7, sigma: 0.0005, seed: s }), 0.0005); if (Math.abs(f.t - 1500) <= 2 * f.seT) cover++; mswd += f.mswd; }
  ok(Math.abs(cover / N - 0.954) < 0.035, 'coverage ' + cover / N); ok(Math.abs(mswd / N - 1) < 0.1, 'mean MSWD ' + mswd / N);
  const fo = K.isoFit(K.isoSamples({ t: 1500, r0: 0.704, n: 7, sigma: 0.0002, seed: 1, open: true }), 0.0002); ok(fo.mswd > 50, 'open system MSWD ' + fo.mswd);
  // the disturbed sample: Rb loss of 30 % at t/2, independent bookkeeping
  const Sx = K.isoSamples({ t: 1500, r0: 0.704, n: 7, sigma: 0, seed: 1, open: true }), Sc = K.isoSamples({ t: 1500, r0: 0.704, n: 7, sigma: 0, seed: 1 });
  const x = Sc[6].x, rb0 = x * Math.exp(lamRb * 1500), rbAtLoss = rb0 * Math.exp(-lamRb * 750), sr1 = rb0 - rbAtLoss, rbAfter = 0.7 * rbAtLoss, rbNow = rbAfter * Math.exp(-lamRb * 750);
  near(Sx[6].x, rbNow, 1e-9); near(Sx[6].y, 0.704 + sr1 + (rbAfter - rbNow), 1e-9);
}
{ // default state numbers shown on the page
  const f = K.isoFit(K.isoSamples({ t: 1500, r0: 0.704, n: 7, sigma: 0.0002, seed: 1 }), 0.0002);
  eq(Math.round(f.t), 1501); eq(Math.round(2 * f.seT), 2); near(f.b, 0.7038, 1e-4 / 0.7038); near(f.mswd, 2.02, 0.005 / 2.02);
}

/* ── 03 · U–Pb concordia: two clocks with separate bookkeeping ── */
const l238 = Math.LN2 / 4463, l235 = Math.LN2 / 704;
for (const t of [100, 1000, 2700, 4400]) { const c = K.concordia(t); near(c.y, Math.exp(l238 * t) - 1, 1e-12); near(c.x, Math.exp(l235 * t) - 1, 1e-12); near(K.pb206Age(c.y), t, 1e-9); }
for (const [t1, t2] of [[2700, 500], [3500, 0], [1800, 1000], [4400, 300]]) {
  // each zircon: Pb accumulated until t2, fraction f lost, then accumulated again until now
  const pts = [0.1, 0.3, 0.5, 0.7].map((f) => { const g = (l) => (1 - f) * (Math.exp(l * t1) - Math.exp(l * t2)) + (Math.exp(l * t2) - 1); return { x: g(l235), y: g(l238) }; });
  const d = K.discordia(pts);
  near(d.upper, t1, 1e-6, 'upper intercept'); ok(Math.abs(d.lower - t2) < 1e-3, `lower intercept ${d.lower} vs ${t2}`);
  const z = K.zircons({ t1, t2, n: 6, fmax: 0.6, sig: 0, seed: 7 });
  for (const p of z) { near(p.x, (1 - p.f) * (Math.exp(l235 * t1) - Math.exp(l235 * t2)) + Math.exp(l235 * t2) - 1, 1e-9); ok(K.pb206Age(p.y) < t1 && K.pb206Age(p.y) > t2, 'apparent age between events'); }
}
{ const z = K.zircons({ t1: 2700, t2: 500, n: 6, fmax: 0.6, sig: 0.003, seed: 7 }), d = K.discordia(z); eq(Math.round(d.upper), 2712); eq(Math.round(d.lower), 564); }

/* ── 03 · method table ── */
near(K.methodRow(K.METHODS[0], 0.00573).remaining, 0.5); near(K.methodRow(K.METHODS[0], 0.0573).remaining, 2 ** -10);
ok(K.methodRow(K.METHODS[0], 0.04).inRange && !K.methodRow(K.METHODS[0], 1).inRange, 'C-14 range'); ok(K.methodRow(K.METHODS[4], 1000).inRange && !K.methodRow(K.METHODS[4], 0.5).inRange, 'U–Pb range');
near(K.methodRow(K.METHODS[5], 48800).ratio, 1); eq(K.METHODS[5].lo, null);

/* ── 04 · Signor–Lipps: independent Monte Carlo with another generator ── */
function lcg(seed) { let s = seed >>> 0; return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); }
for (const [p, step, E, origin] of [[0.15, 1, 70, 10], [0.05, 1, 70, 0], [0.4, 2, 70, 5], [0.1, 5, 70, 20]]) {
  const r = lcg(Math.round(p * 1000 + step)); let sum = 0, cnt = 0;
  for (let k = 0; k < 40000; k++) { let lad = null; for (let h = 0; h < 100; h += step) if (h >= origin && h < E && r() < p) lad = h; if (lad !== null) { sum += E - lad; cnt++; } }
  const th = K.expectedGap({ origin, E, p }, step);
  ok(Math.abs(sum / cnt - th.eg) < 0.04 * th.eg + 0.05, `gap MC ${sum / cnt} vs ${th.eg}`);
  const nS = Array.from({ length: Math.ceil(100 / step) }, (_, i) => i * step).filter((h) => h >= origin && h < E).length;
  near(th.pf, 1 - (1 - p) ** nS, 1e-12);
}
near(K.expectedGap({ origin: 0, E: 1000, p: 0.2 }, 1).eg, K.gapInfinite(0.2), 1e-6, 'long section → 1 + (1 − p)/p');
near(K.gapInfinite(0.15), 1 + 0.85 / 0.15);
{ // abrupt extinction: every true range ends at ext; finds never above it; spread > 0 for small p
  const sim = K.fossilSim({ n: 30, ext: 70, p: 0.15, seed: 1, step: 1 }), g = K.gapStats(sim);
  ok(sim.taxa.every((t) => t.E === 70 && t.finds.every((h) => h < 70 && h >= t.origin)), 'finds inside ranges');
  eq(g.found, 30); near(g.meanGap, 5.9, 1e-9); near(g.theory, 6.66, 0.005 / 6.66); near(g.spread80, 10.3, 1e-6);
  const d = K.diversity(sim, 50); eq(d.alive, 30); ok(d.seen <= d.alive, 'seen ≤ alive'); eq(K.diversity(sim, 70).alive, 0);
  const many = K.fossilSim({ n: 60, ext: 70, p: 0.9, seed: 2, step: 1 }); ok(K.gapStats(many).spread80 <= 2, 'high p: nearly sharp');
  const grad = K.fossilSim({ n: 60, ext: 70, mode: 'gradual', p: 0.9, seed: 2, step: 1 }); ok(K.gapStats(grad).spread80 > 15, 'gradual: spread');
  let hard = 0, tot = 0; for (let s = 1; s <= 60; s++) { const gm = K.gapStats(K.fossilSim({ n: 40, ext: 70, p: 0.05, mix: 'mixed', seed: s })); hard += gm.hardShare * gm.found; tot += gm.found; } ok(hard / tot > 0.55 && hard / tot < 0.65, 'hard parts over-represented ' + hard / tot); // ≈ 0.99 / (0.99 + 0.67) for ~55 inhabited beds
}
for (const cfg of [{ mix: 'mixed' }, { mode: 'gradual' }, {}]) { // seed-averaged measured gap agrees with the per-taxon expectation
  let m = 0, t = 0; for (let s = 1; s <= 400; s++) { const g = K.gapStats(K.fossilSim({ n: 30, ext: 70, p: 0.15, seed: s, ...cfg })); m += g.meanGap; t += g.theory; }
  ok(Math.abs(m / t - 1) < 0.04, `seed-averaged gap ${JSON.stringify(cfg)} ${m / 400} vs ${t / 400}`);
}
console.log(`${SLUG}: ${checks} bağımsız çekirdek kontrolü PASS`);

/* ── browser ── */
if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright');
  const { createServer } = await import('node:http');
  const { join, extname } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  let browser; const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [['light', 390], ['dark', 1280]]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      page.setDefaultTimeout(8000);
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); }); page.on('response', (q) => { if (q.status() >= 400) errors.push(q.status() + ' ' + q.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator('#' + id).textContent();
      const has = async (id, t) => { const v = await read(id); assert(v.includes(t), `${id}: "${v}" lacks "${t}"`); checks++; };
      const range = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v);
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll('main input, main select')].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      eq(await page.title(), 'Derin Zaman ve Radyometrik Tarihleme: Kayaçların ve Yaşamın Yaşı');
      // 01
      await has('z1Name', 'Kambriyen (Cambrian)'); await has('z1Range', '538,8 ± 0,6 Ma → 486,85 Ma'); await has('z1Dur', '51,95 milyon yıl'); await has('z1Pct', '%1,14'); await has('z1Day', '21:10:06'); await has('z1View', '4,567 milyar yıl'); await has('z1Status', 'Görünümde 15 olay');
      await page.click('[data-view="0,66"]'); await has('z1View', '66,00 – 0 Ma'); await has('z1Status', 'Görünümde 3 olay');
      await page.click('#z1Older'); await has('z1View', '82,50 – 16,50 Ma');
      await page.click('#z1Reset'); await page.click('#z1Zoom'); await has('z1View', '543,0 – 482,7 Ma');
      await page.locator('#z1Events button').nth(12).click(); await has('z1Name', 'Paleosen'); await has('z1View', '82,50 – 49,50 Ma');
      await page.click('#z1Reset'); await page.click('#z1Log'); await has('z1Status', 'Görünümde'); await page.click('#z1Reset'); eq(await page.locator('#z1Log').isChecked(), false);
      // canvas click selects a unit (top eon row at the far left = Hadean)
      await page.locator('#z1Time').scrollIntoViewIfNeeded(); await page.evaluate(() => window.scrollBy(0, -120)); const box = await page.locator('#z1Time').boundingBox(); await page.mouse.click(box.x + 14, box.y + 20); await has('z1Name', 'Hadeyen'); await has('z1Status', 'Hadeyen');
      await page.locator('#z1Time').focus(); await page.keyboard.press('+'); await has('z1View', '2,284 milyar yıl'); await page.keyboard.press('ArrowRight'); await page.click('#z1Reset');
      eq(await page.locator('#z1Ext tr').count(), 5); await has('z1Ext', '372 ve 359'); eq(await page.locator('#z1Events li').count(), 15);
      // 02
      await page.click('#tab-rel'); await has('r2Count', '1 (sıra tek)'); await page.click('#r2Check'); await has('r2Score', '4 / 7'); await has('r2Status', 'Sağlanmayan ilişkiler');
      await page.click('#r2Solve'); await has('r2Score', '7 / 7'); await has('r2Pos', '8 / 8'); await has('r2Status', 'Geçerli sıra');
      // move the top item down with the keyboard-reachable buttons, then check again
      await page.locator('#r2List li').first().locator('button').nth(1).click(); await page.click('#r2Check'); await has('r2Score', '6 / 7');
      await page.locator('#r2Scene').selectOption('1'); await has('r2Count', '2 (bazı çiftler belirsiz)'); await page.click('#r2Solve'); await has('r2Status', '2 geçerli sıra');
      await page.locator('#r2Scene').selectOption('2'); await has('r2Bracket', 'çözünce açılır'); await page.click('#r2Solve'); await has('r2Bracket', 'B: 75,2 ile 68,4 Ma arası'); await has('r2Status', '6,8 milyon yıllık'); await has('r2Status', 'D ise 68,4 ile 61,0 Ma');
      await page.click('#r2Reset'); eq(await page.locator('#r2Scene').inputValue(), '0'); await has('r2Score', '—');
      // 03
      await page.click('#tab-iso'); await has('i3FitT', '1501 ± 2 Ma'); await has('i3FitR', '0,7038 ± 0,0002'); await has('i3FitW', '2,02'); await has('i3Diff', '+1 Ma (+0,09 %)'); await has('i3MyT', '1394 Ma');
      { // model-age table is self-consistent: each age recomputes from the rounded values shown in its row
        const rows = await page.locator('#i3Rows tr').evaluateAll((trs) => trs.map((tr) => [...tr.querySelectorAll('td')].slice(1).map((td) => +td.textContent.replace(/\u202F/g, '').replace(',', '.'))));
        eq(rows.length, 7); eq(rows[0][2], 3261);
        for (const [x, y, age] of rows) eq(Math.round(Math.log1p((y - 0.7) / x) / lamRb), age, `model age row ${x}`);
      }
      await page.click('#i3Best'); await has('i3MyM', '0,0216'); await has('i3Status', 'iyi iş');
      await range('i3Sig', 0); await has('i3FitT', '1500 ± 0 Ma'); await has('i3FitW', 'tanımsız'); await has('i3Status', 'Gürültüsüz');
      await page.click('#i3Open'); await has('i3Status', 'Açık sistem'); await has('i3Rows', '(açık)');
      await page.click('#i3Mystery'); await has('i3True', 'gizli'); await has('i3TOut', 'gizli'); eq(await page.locator('#i3T').isDisabled(), true);
      await page.click('#i3Reset'); eq(await page.locator('#i3T').isDisabled(), false); await has('i3FitT', '1501 ± 2 Ma');
      await page.click('#i3Hist'); await page.click('#i3Hist');
      await has('c3Up', '2712 Ma'); await has('c3Lo', '564 Ma'); await has('c3UpD', '+12 Ma'); await has('c3App', '1562 – 2637 Ma');
      await range('c3Sig', 0); await has('c3Up', '2700 Ma'); await has('c3Lo', '500 Ma'); await range('c3F', 0); await has('c3Status', 'konkordan'); await has('c3Up', '—');
      await range('c3T2', 2000); await range('c3T1', 1500); await range('c3F', 50); await has('c3Status', 'en az 50 milyon yıl'); await page.click('#c3Reset'); await has('c3Up', '2712 Ma');
      await has('m3AgeOut', '50\u202F100 yıl'); await has('m3Status', 'sınırın içinde'); eq(await page.locator('#m3Rows tr.is-hit').count(), 2);
      await range('m3Age', 9.65); await has('m3AgeOut', '4,47 milyar yıl'); eq(await page.locator('#m3Rows tr.is-hit').count(), 3); await has('m3Status', 'kullanılamaz');
      await range('m3Age', 4); await has('m3AgeOut', '10\u202F000 yıl'); await has('m3Status', 'ölçülebilir');
      // 04
      await page.click('#tab-fos'); await has('f4Found', '30 / 30'); await has('f4Gap', '5,90 m'); await has('f4GapTh', '6,66 m'); await has('f4GapD', '−0,76 m'); await has('f4Spread', '10,3 m'); await has('f4Status', "10,3 m'lik"); await has('f4Status', '6,67 m');
      await page.locator('#f4Mix').selectOption('mixed'); await has('f4Status', 'abartır'); await page.locator('#f4Mode').selectOption('gradual'); await has('f4Status', '40–70 m');
      await page.click('#f4Mystery'); await has('f4Gap', 'gizli'); eq(await page.locator('#f4Mode').isDisabled(), true); await page.click('#f4Decide'); await has('f4Status', 'Önce');
      await page.check('#f4GA'); await page.click('#f4Decide'); await has('f4Status', 'bu kesitte yok oluş'); await page.click('#f4Reset'); eq(await page.locator('#f4Guess').isHidden(), true); await has('f4Gap', '5,90 m');
      await range('f4P', 0.9); await has('f4GapTh', '1,11 m');
      await page.locator('body').click({ position: { x: 3, y: 3 } }); await page.keyboard.press('r'); await has('f4Gap', '5,90 m');
      // 05
      await page.click('#tab-day'); await has('d5Event', 'Kambriyen patlaması'); await has('d5Truth', '—'); await page.click('#d5Check'); await has('d5Truth', '21:10:06'); await has('d5Err', '−550,1 dk'); await has('d5Status', 'gerçek yerden 550 dakika erken');
      await page.locator('#d5Ev').selectOption('12'); await has('d5Truth', '—'); await range('d5G', 1419); await page.click('#d5Check'); await has('d5Truth', '23:39:11'); await has('d5Status', 'çok yakın');
      await page.locator('#d5Map').selectOption('year'); await page.click('#d5Check'); await has('d5Truth', '26 Aralık'); await has('d5GOut', 'Temmuz');
      await page.click('#d5Rand'); await has('d5Truth', '—'); await page.click('#d5Reset'); await has('d5GOut', '12:00');
      // keyboard tabs
      await page.locator('#tab-day').focus(); await page.keyboard.press('Home'); eq(await page.locator('#tab-scale').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowLeft'); eq(await page.locator('#tab-day').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-scale').getAttribute('aria-selected'), 'true'); await page.keyboard.press('End'); eq(await page.locator('#tab-day').getAttribute('aria-selected'), 'true');
      for (const t of ['scale', 'rel', 'iso', 'fos', 'day']) { await page.click('#tab-' + t); await page.waitForTimeout(150); eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true); for (const st of await canvasInkAll(page, '#panel-' + t + ' canvas')) assertCanvasDrawn(st, { minDistinct: 4, label: t + ' ' + st.id }); checks++; }
      eq(await page.evaluate(() => Object.isFrozen(window.DeepTimeLab) && !Object.getOwnPropertyDescriptor(window, 'DeepTimeLab').writable), true);
      await page.waitForSelector('section.digest', { timeout: 8000 }); ok(await page.locator('.digest').first().isVisible(), 'Keşif Defteri görünür');
      assert.deepEqual(errors, []); checks++;
      await page.close();
    }
    console.log(`${SLUG}: ${checks - before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
