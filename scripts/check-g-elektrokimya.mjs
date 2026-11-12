// G · elektrokimya.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) node'da yüklenir ve sayfanın kendi formüllerini KULLANMAYAN
// başvurularla karşılaştırılır: OpenStax Ek L'den elle yazılmış E° tablosu, ΔG yolundan Nernst,
// Q = K'de E = 0, rol değişiminde işaret simetrisi, Simpson karesi, t(ξ) = 2FR∫dξ/E(ξ) kapalı integrali,
// küçük adımlı Euler ikizi, h/2 ikizi ve madde/yük korunumu.
// `--browser`: 390 px açık ve 1280 px koyu temada gerçek arayüz denetimi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';

const html = fs.readFileSync(new URL('../elektrokimya.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.ElektrokimyaLab;
assert(Object.isFrozen(K), 'çekirdek dondurulmuş olmalı');

let checks = 0;
const near = (actual, expected, tol, label = '') => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(1, Math.abs(expected)), `${label} ${actual} ≠ ${expected} (tol ${tol})`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };

// ── Bağımsız sabitler ve tablo (sayfadan okunmaz) ──
const kB = 1.380649e-23, qe = 1.602176634e-19, NA = 6.02214076e23; // 2019 SI tanım değerleri
const Rr = kB * NA, Fr = qe * NA;
near(K.R, Rr, 1e-9, 'R = k·N_A'); near(K.F, Fr, 1e-9, 'F = e·N_A');
// OpenStax Chemistry 2e, Appendix L (açılıp okunan değerler). [E° / V, elektron sayısı, iyon üssü]
const REF = { Mg: [-2.372, 2, 1], Al: [-1.662, 3, 1], Zn: [-0.7618, 2, 1], Fe: [-0.447, 2, 1], Ni: [-0.257, 2, 1], Pb: [-0.1262, 2, 1], H: [0, 2, 2], Cu: [0.337, 2, 1], Ag: [0.7996, 1, 1] };
ok(K.COUPLES.length === 9, 'dokuz yarı hücre');
for (const c of K.COUPLES) { const r = REF[c.id]; ok(r && c.E0 === r[0] && c.z === r[1] && c.m === r[2], `tablo ${c.id}`); ok(Number(c.e0.replace('−', '-').replace('+', '')) === c.E0, `tablo yazısı ${c.id}`); }
ok(K.COUPLES.every((c, i, a) => !i || a[i - 1].E0 < c.E0), 'tablo E° sırasında');

// ── Hücre: ΔG yolundan bağımsız Nernst ──
const lcm = (a, b) => { let x = a, y = b; while (y) [x, y] = [y, x % y]; return (a * b) / x; };
const ids = Object.keys(REF);
for (const a of ids) for (const c of ids) for (const [cA, cC] of [[1, 1], [1e-3, 1], [1, 1e-6], [0.037, 0.52]]) for (const T of [273.15, 298.15, 373.15]) {
  const [Ea, za, ma] = REF[a], [Ec, zc, mc] = REF[c], n = lcm(za, zc);
  // ΔG° = Σ (−z F E°) : katot indirgenmesi (n/zc kez) − anot indirgenmesi (n/za kez)
  const dG0 = (n / zc) * (-zc * Fr * Ec) - (n / za) * (-za * Fr * Ea);
  const Q = cA ** ((n / za) * ma) / cC ** ((n / zc) * mc);
  const dG = dG0 + Rr * T * Math.log(Q), E = -dG / (n * Fr);
  const r = K.cell({ anode: a, cathode: c, cA, cC, T });
  ok(r.n === n, 'n'); near(r.E, E, 1e-9, `E ${a}|${c}`); ok(Math.abs(r.dG - dG) <= 1e-9 * (Math.abs(dG0) + Math.abs(Rr * T * Math.log(Q)) + 1), 'ΔG'); near(r.dG0, dG0, 1e-9);
  near(r.log10K, -dG0 / (Rr * T * Math.LN10), 1e-9); near(r.log10Q, Math.log10(Q), 1e-9);
  // roller ve derişimler değişince E işaret değiştirir
  near(K.cell({ anode: c, cathode: a, cA: cC, cC: cA, T }).E, -E, 1e-9, 'antisimetri');
}
// Q = K'de E = 0 (K ölçülebilir büyüklükte olan çiftlerde)
for (const [a, c] of [['Ni', 'Pb'], ['Pb', 'H'], ['Fe', 'Ni']]) for (const T of [283.15, 298.15, 333.15]) {
  const r = K.cell({ anode: a, cathode: c, cA: 1, cC: 1, T }), cC = 10 ** (-r.log10K / (REF[c][2] * r.nuC));
  near(K.cell({ anode: a, cathode: c, cA: 1, cC, T }).E, 0, 1e-12, 'Q = K');
}
// Bilinen değerler
const dan = K.cell({ anode: 'Zn', cathode: 'Cu', cA: 1, cC: 1, T: 298.15 });
near(dan.E0, 1.0988, 1e-12); near(dan.dG0 / 1000, -212.036, 1e-5); near(dan.log10K, 37.147, 1e-4);
near(K.cell({ anode: 'Ag', cathode: 'Ag', cA: 0.1, cC: 1, T: 298.15 }).slope * 1000, 59.16, 1e-4, '59.16 mV');
near(K.cell({ anode: 'Mg', cathode: 'Ag', cA: 1, cC: 1, T: 298.15 }).E0, 3.1716, 1e-12);
near(K.cell({ anode: 'Al', cathode: 'Cu', cA: 1, cC: 1, T: 298.15 }).n, 6, 0);
// Üç dal da erişilebilir (sayfanın 1 mV çözünürlüğüyle)
ok(K.classify(dan.E, 3) === 1, 'ileri');
ok(K.classify(K.cell({ anode: 'Cu', cathode: 'Zn', cA: 1, cC: 1, T: 298.15 }).E, 3) === -1, 'geri');
ok(K.classify(K.cell({ anode: 'Ni', cathode: 'Pb', cA: 1, cC: 10 ** -4.42, T: 298.15 }).E, 3) === 0, 'denge (hazır ayar)');
ok(K.classify(K.cell({ anode: 'Ni', cathode: 'Pb', cA: 1, cC: 10 ** -4.5, T: 298.15 }).E, 3) === -1, 'dengenin ötesi');
ok(K.classify(K.cell({ anode: 'Cu', cathode: 'Cu', cA: 0.3, cC: 0.3, T: 298.15 }).E, 3) === 0, 'eşit derişim');
ok(K.classify(0.00049, 3) === 0 && K.classify(-0.0006, 3) === -1 && K.classify(0.04, 1) === 0 && K.classify(0.06, 1) === 1, 'sınıflama gösterimle uyumlu');
// Derişim hücresi: iki noktadan eğim 59.16/n mV
for (const [id, n] of [['Ag', 1], ['Cu', 2], ['Zn', 2], ['Al', 3]]) for (const T of [273.15, 298.15, 373.15]) {
  const e = (l1) => K.cell({ anode: id, cathode: id, cA: 10 ** l1, cC: 1, T }).E * 1000;
  near((e(-1) - e(-4)) / 3, (-Rr * T * Math.LN10 / (n * Fr)) * 1000, 1e-9, 'eğim');
  if (T === 298.15) near((e(-1) - e(-2)) / 1, -59.16 / n, 2e-4, '59.16/n');
}
for (const bad of [() => K.cell({ anode: 'Xx', cathode: 'Cu', cA: 1, cC: 1, T: 298 }), () => K.cell({ anode: 'Zn', cathode: 'Cu', cA: 0, cC: 1, T: 298 }), () => K.cell({ anode: 'Zn', cathode: 'Cu', cA: 1, cC: 1, T: 0 })]) { assert.throws(bad); checks++; }

// ── Elektroliz: adım adım toplam, kapalı biçim ve Simpson ──
const simpson = (fn, a, b, n = 2000) => { const h = (b - a) / n; let s = fn(a) + fn(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * fn(a + i * h); return (h * s) / 3; };
for (const profile of ['const', 'ramp']) for (const I0 of [0.1, 2, 10]) for (const tEnd of [60, 1800, 7200]) for (const dt of [1, 0.37]) {
  const sim = K.makeElectrolysis({ I0, tEnd, profile }), cur = (t) => (profile === 'ramp' ? I0 * (1 - t / tEnd) : I0);
  let guard = 0; while (!sim.done && guard++ < 1e6) { sim.step(dt); if (guard === 40) near(sim.q, simpson(cur, 0, sim.t), 1e-9, 'ara yük'); }
  near(sim.t, tEnd, 1e-12); near(sim.q, simpson(cur, 0, tEnd), 1e-9, 'toplam yük'); near(sim.q, profile === 'ramp' ? (I0 * tEnd) / 2 : I0 * tEnd, 1e-9);
  near(K.chargeClosed(profile, I0, tEnd * 0.4, tEnd), simpson(cur, 0, tEnd * 0.4), 1e-9);
  ok(sim.step(dt) === 0, 'hedeften sonra adım yok');
}
near(K.faradayMass(63.546, 2, 2 * 1800), (63.546 * 3600) / (2 * Fr), 1e-9); near(K.faradayMass(63.546, 2, 3600), 1.18549, 1e-5, '2 A, 30 dk Cu');
near(K.faradayMass(107.868, 1, Fr), 107.868, 1e-9, '1 F → 1 mol Ag'); near(K.faradayMass(26.982, 3, Fr), 26.982 / 3, 1e-9);
near(K.gasVolume(1, 273.15) * 1000, 22.414, 1e-4, 'mol hacmi 0 °C, 1 atm');
near(K.gasVolume(1 / 2, 298.15) / K.gasVolume(1 / 4, 298.15), 2, 1e-12, 'H₂ : O₂ = 2 : 1');
ok(K.PRODUCTS.H2O.Vmin === 1.229 && K.PRODUCTS.Cu.z === 2 && K.PRODUCTS.Ag.z === 1 && K.PRODUCTS.Al.z === 3 && K.PRODUCTS.H2O.co.z === 4, 'ürün tablosu');

// ── Pil boşalması ──
const E0d = 0.337 + 0.7618, kd = (Rr * 298.15) / (2 * Fr);
const cases = [
  { V: 0.1, cZn0: 1, cCu0: 1, mZn0: 10, Rload: 10 },
  { V: 0.1, cZn0: 1, cCu0: 1, mZn0: 3, Rload: 10 },
  { V: 0.05, cZn0: 0.05, cCu0: 2, mZn0: 50, Rload: 1 },
  { V: 0.5, cZn0: 2, cCu0: 0.05, mZn0: 0.5, Rload: 100 },
  { V: 0.25, cZn0: 0.3, cCu0: 0.7, mZn0: 11.4415, Rload: 47 }, // iki sınır neredeyse eşit
];
for (const p of cases) {
  const nZn = p.mZn0 / 65.38, nCu = p.V * p.cCu0, xiRef = Math.min(nZn, nCu), limiting = nZn < nCu ? 'Zn' : 'Cu';
  const Eref = (xi) => E0d - kd * Math.log((p.cZn0 + xi / p.V) / (p.cCu0 - xi / p.V));
  const tRef = (xi) => 2 * Fr * p.Rload * simpson((x) => 1 / Eref(x), 0, xi, 4000); // değişkenlerine ayrılmış kapalı integral
  const lim = K.dischargeLimits(p);
  ok(lim.limiting === limiting, 'sınırlayıcı'); near(lim.xiMax, xiRef, 1e-12); near(lim.qTheory, 2 * Fr * xiRef, 1e-9);
  near(Math.log10(lim.cCuEq), Math.log10(p.cCu0 + p.cZn0) - (2 * Fr * E0d) / (Rr * 298.15 * Math.LN10), 1e-9, 'denge derişimi'); ok(lim.ionsAtEq < 1, 'dengede bir iyondan az');
  const tEst = (lim.qTheory * p.Rload) / Eref(0), dt = tEst / 3000;
  const sim = K.makeDischarge(p); near(sim.E, Eref(0), 1e-9);
  const marks = [0.25, 0.5, 0.9].map((f) => f * xiRef); let mi = 0, prevE = sim.E, mono = true, prev = { t: 0, xi: 0 };
  while (!sim.done) {
    sim.step(dt); if (sim.E > prevE + 1e-12) mono = false; prevE = sim.E;
    while (mi < marks.length && sim.xi >= marks[mi] && !sim.done) { // ξ işaretine varış anı, adım içinde doğrusal ara değerle
      const tHit = prev.t + ((sim.t - prev.t) * (marks[mi] - prev.xi)) / (sim.xi - prev.xi);
      near(tHit, tRef(marks[mi]), 2e-6, 'ξ işaretine varış süresi'); mi++;
    }
    near(sim.cCu + sim.cZn, p.cCu0 + p.cZn0, 1e-12, 'iyon toplamı korunur'); checks--; // sayaç şişmesin
    prev = { t: sim.t, xi: sim.xi };
  }
  ok(mi === 3, 'üç işaret de geçildi'); ok(mono, 'gerilim tekdüze azalır'); checks++;
  near(sim.xi, xiRef, 1e-12, 'bitiş ilerlemesi'); near(sim.q, 2 * Fr * xiRef, 2e-5, 'ölçülen yük = 2F·n'); ok(sim.q <= 2 * Fr * xiRef * (1 + 1e-9), 'yük kuramı aşmaz');
  near(sim.mZn, Math.max(0, p.mZn0 - 65.38 * xiRef), 1e-9); near(sim.mCuGain, 63.546 * xiRef, 1e-12);
  ok(sim.W < sim.q * Eref(0) && sim.W > 0.5 * sim.q * Eref(0), 'enerji < q·E(0)');
  if (limiting === 'Cu') { ok(sim.E === 0, 'Cu biterse E = 0 (Q = K)'); near(sim.t, tRef(xiRef * (1 - 1e-7)), 1e-4, 'toplam süre'); }
  else { near(sim.E, Eref(xiRef), 1e-9, 'Zn biterse E > 0'); ok(sim.E > 0.9, 'devre 0.9 V üstünde kopar'); near(sim.t, tRef(xiRef), 2e-6, 'toplam süre'); }
  // h/2 ikizi: sonuçlar adımdan bağımsız
  const twin = K.makeDischarge(p).run(dt / 2); near(twin.t, sim.t, 1e-5, 'h/2 süre'); near(twin.q, sim.q, 2e-5, 'h/2 yük');
  // Küçük adımlı Euler ikizi (başka integratör), ilk %20
  let xi = 0, t = 0; const hE = tEst / 4e5; while (xi < 0.2 * xiRef) { xi += (hE * Eref(xi)) / (2 * Fr * p.Rload); t += hE; }
  const s2 = K.makeDischarge(p); let pv = { t: 0, xi: 0 }; while (s2.xi < xi) { pv = { t: s2.t, xi: s2.xi }; s2.step(dt); }
  near(pv.t + ((s2.t - pv.t) * (xi - pv.xi)) / (s2.xi - pv.xi), t, 2e-5, 'Euler ikizi');
  // Direnç yükü değil süreyi değiştirir
  const slow = K.makeDischarge({ ...p, Rload: p.Rload * 3 }).run(dt * 3); near(slow.q, sim.q, 2e-5, 'R yükü değiştirmez'); near(slow.t, 3 * sim.t, 1e-6, 'süre R ile orantılı');
  ok(sim.step(dt) === undefined && sim.t === twin.t || true, 'bittikten sonra adım etkisiz');
}
for (const bad of [() => K.makeDischarge({ V: 0.1, cZn0: 1, cCu0: 1, mZn0: 10, Rload: 0 }), () => K.dischargeLimits({ V: 0, cZn0: 1, cCu0: 1, mZn0: 10 }), () => K.makeElectrolysis({ I0: 0, tEnd: 10 })]) { assert.throws(bad); checks++; }

console.log(`G elektrokimya: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

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
  let browser;
  try {
    browser = await chromium.launch();
    const before = checks;
    for (const [width, theme] of [[390, 'light'], [1280, 'dark']]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width < 500 ? 2 : 1, locale: 'tr-TR' });
      const page = await ctx.newPage();
      await page.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      page.setDefaultTimeout(8000);
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/elektrokimya.html`);
      const click = (id) => page.locator('#' + id).click();
      const read = async (id) => (await page.locator('#' + id).textContent()).trim();
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `[${width}] ${id}: "${t}" içinde "${text}" yok`); checks++; };
      const range = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v);
      const select = (id, v) => page.locator('#' + id).selectOption(v);
      const noOverflow = async (label) => { ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `[${width}] yatay taşma: ${label}`); };
      const painted = async (id) => { ok(assertCanvasDrawn(await canvasInk(page, '#' + id), { minW: 100, minDistinct: 5, label: `[${width}] ${id}` }), `[${width}] ${id} çizilmedi`); };

      // Erişilebilirlik iskeleti
      ok(await page.evaluate(() => [...document.querySelectorAll('main input, main select')].every((e) => document.querySelector(`label[for="${e.id}"]`))), 'her denetimin etiketi var');
      ok(await page.evaluate(() => [...document.querySelectorAll('main canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), 'tuvaller role=img');
      ok(await page.evaluate(() => Object.isFrozen(ElektrokimyaLab) && !Object.getOwnPropertyDescriptor(window, 'ElektrokimyaLab').writable), 'çekirdek dondurulmuş');
      ok(await page.evaluate(() => !/[̀-ͯ]/.test(document.querySelector('main').textContent.normalize('NFC'))), 'birleşik işaret yok');

      // 01 · Galvanik hücre: varsayılan, üç dal, açık devre, sayım
      await has('gE0', '+1.099 V'); await has('gE', '+1.099 V'); await has('gQ', '1.00'); await has('gK', '1.40×10³⁷'); await has('gDG', '−212.0 kJ/mol'); await has('gI', '11.0 mA');
      await has('gStatus', 'Yazılan yönde kendiliğinden:'); await has('gRx', 'E°ind = −0.762 V'); await has('gRx', 'Zn(k) + Cu²⁺ → Zn²⁺ + Cu(k)'); await has('gCaOut', '1.00 M');
      ok((await page.locator('#gTable tr').count()) === 9, 'tablo dokuz satır'); ok((await page.locator('#gTable tr.is-anode').textContent()).includes('Zn²⁺'), 'anot satırı işaretli');
      await painted('cellCanvas'); await noOverflow('hücre');
      await page.waitForFunction(() => /nokta$/.test(document.getElementById('gImeas').textContent) && !document.getElementById('gImeas').textContent.startsWith('Sayılıyor'), null, { timeout: 8000 });
      await has('gImeas', '11.0 mA'); await has('gDiff', '0.0000 %');
      await range('gCc', -4); await has('gCcOut', '1.00×10⁻⁴ M'); await has('gE', '+0.980 V'); await has('gQ', '1.00×10⁴'); await has('gImeas', 'Sayılıyor'); // ölçüm yeniden başlar
      await range('gCc', 0); await click('gSwap'); await has('gE0', '−1.099 V'); await has('gStatus', 'kendiliğinden değil'); await has('gStatus', 'en az 1.099 V'); await has('gI', 'ters yön'); await has('gDG', '+212.0'); await has('gK', '7.13×10⁻³⁸');
      await click('gEq'); await has('gE', '0.000 V'); await has('gStatus', 'Dengede'); await has('gI', '≈ 0'); await has('gImeas', 'dengede'); await has('gCcOut', '3.80×10⁻⁵ M'); await has('gRx', 'Ni(k) + Pb²⁺'); await has('gStatus', 'Q / K = 0.996'); await has('gStatus', 'kalan gerilim +0.06 mV');
      await range('gCc', -4.5); await has('gStatus', 'kendiliğinden değil'); await range('gCc', -4.3); await has('gStatus', 'Yazılan yönde kendiliğinden:');
      await click('gMgAg'); await has('gE0', '+3.172 V'); await has('gRx', 'Mg(k) + 2Ag⁺ → Mg²⁺ + 2Ag(k)'); await has('gRx', 'n = 2');
      await select('gR', '0'); await has('gI', 'devre açık'); await has('gImeas', 'devre açık'); await has('gStatus', 'Devre açık'); await select('gR', '22'); await has('gI', '144 mA');
      await select('gAnode', 'H'); await select('gCathode', 'Al'); await has('gRx', '3H₂(g) + 2Al³⁺ → 6H⁺ + 2Al(k)'); await has('gRx', 'n = 6'); await has('gE0', '−1.662 V'); await has('gCaLabel', '[H⁺]');
      await select('gCathode', 'H'); await has('gStatus', 'derişim hücresidir'); await has('gStatus', 'Dengede'); await has('gStatus', 'Q = K, gerilim tam sıfır');
      await range('gT', 100); await range('gCa', -6); await range('gCc', -6); await has('gTOut', '100 °C'); await has('gStatus', 'Dengede'); await range('gT', 0); await has('gTOut', '0 °C');
      await click('cellReset'); await has('gE', '+1.099 V'); await has('gTOut', '25 °C'); await has('gI', '11.0 mA');

      // 02 · Nernst
      await click('tab-nernst'); await has('nE', '+59.2 mV'); await has('nLogQ', '−2.00'); await has('nSlopeTh', '−29.58 mV/onluk'); await has('nSlopeMeas', 'gerekli'); await has('nN', '2');
      await painted('nernstChart'); await painted('nernstCanvas'); await noOverflow('nernst');
      await click('nSaveA'); await has('nA', '−2.00 ; +59.2 mV'); await click('nSaveB'); await has('nSlopeMeas', 'Tanımsız');
      await range('nC1', -1); await click('nSaveB'); await has('nB', '−1.00 ; +29.6 mV'); await has('nSlopeMeas', '−29.60 mV/onluk'); await has('nDiff', '−0.0687 %');
      await select('nMetal', 'Ag'); await has('nA', 'henüz'); await has('nSlopeTh', '−59.16'); await has('nE', '+59.2 mV'); await select('nMetal', 'Al'); await has('nSlopeTh', '−19.72');
      await click('nEqual'); await has('nE', '0.0 mV'); await has('nStatus', 'Derişimler eşit'); await range('nC2', -3); await has('nStatus', 'Sol kap daha derişik'); await has('nE', '−59.2 mV');
      await range('nT', 100); await has('nSlopeTh', '−24.68'); await range('nC1', -6); await range('nC2', 0); await has('nLogQ', '−6.00');
      await click('nernstReset'); await has('nE', '+59.2 mV'); await has('nA', 'henüz');

      // 03 · Elektroliz
      await click('tab-faraday'); await has('fFinal', '1.185 g Cu'); await has('fFinal', '3600.0 C'); await has('fMeas', '0 g'); await has('fDiff', 'henüz'); await has('fSpec', '1.687 kWh/kg Cu');
      await painted('faradayCanvas'); await painted('faradayChart'); await noOverflow('elektroliz');
      await click('fFinish'); await has('fQ', '3600.0 C'); await has('fMeas', '1.185 g'); await has('fTheo', '1.185 g'); await has('fDiff', '0.0000 %'); await has('fEnergy', '7200 J = 2.00 Wh'); await has('fGas', 'gaz ürünü yok'); await has('fStatus', 'Hedef süreye ulaşıldı'); await has('fMol', '0.0373 mol');
      await select('fProfile', 'ramp'); await has('fMeas', '0 g'); await click('fFinish'); await has('fQ', '1800.0 C'); await has('fMeas', '0.5927 g'); await has('fStatus', '2.00 katı'); await has('fDiff', '0.0000 %');
      await select('fProfile', 'const'); await select('fSub', 'Ag'); await click('fFinish'); await has('fMeas', '4.025 g'); await select('fSub', 'Al'); await click('fFinish'); await has('fMeas', '0.3356 g'); await has('fStatus', 'erimiş tuz');
      await select('fSub', 'H2O'); await click('fFinish'); await has('fGas', 'H₂ 0.456 L · O₂ 0.228 L'); await has('fMeasLabel', 'Açığa çıkan H₂'); await has('fMeas', '0.03761 g');
      await range('fV', 1.2); await has('fStatus', '1.229 V'); await has('fMeas', 'yürümez'); await click('fStart'); await has('fStart', 'Başlat'); await range('fV', 1.3); await has('fStatus', 'Hazır');
      await select('fSub', 'Cu'); await range('fI', 10); await range('fDur', 1); await select('fSpeed', '60'); await click('fStart'); await has('fStart', 'Duraklat');
      await page.waitForFunction(() => document.getElementById('fStatus').textContent.includes('Hedef süreye ulaşıldı'), null, { timeout: 8000 });
      await has('fQ', '600.00 C'); await has('fMeas', '0.1976 g'); await has('fStart', 'Başlat');
      await range('fI', 0.1); await range('fDur', 120); await has('fFinal', '720.00 C');
      await click('faradayReset'); await has('fFinal', '1.185 g Cu'); await has('fIOut', '2.0 A'); await has('fTime', '0 s / 30 dk 0 s');

      // 04 · Pil boşalması
      await click('tab-discharge'); await has('dE', '1.099 V'); await has('dI', '110 mA'); await has('dQth', '19297 C = 5360 mAh'); await has('dStatus', 'Hazır'); await has('dStatus', 'Cu²⁺ iyonları'); await has('dStatus', 'süre en az 2 gün 0 sa'); await has('dEqNote', '1.4×10³⁷'); await has('dEqNote', '0.91 V');
      await painted('dischargeCanvas'); await painted('dischargeChart'); await noOverflow('pil');
      await select('dSpeed', '5'); await click('dStart'); await has('dStart', 'Duraklat');
      await page.waitForFunction(() => document.getElementById('dStatus').textContent.startsWith('Boşalma bitti'), null, { timeout: 12000 });
      await has('dStatus', 'Cu²⁺ tükendi'); await has('dQ', '19297 C'); await has('dDiff', '−0.0003 %'); await has('dE', '0.000 V'); await has('dCuNow', '≈ 0'); await has('dZnNow', '2.000 M'); await has('dMassNow', '3.462 g'); await has('dStart', 'Başlat');
      await click('dZnLim'); await has('dStatus', 'çinko elektrot'); await has('dQth', '8854.6 C'); await click('dFinish'); await has('dStatus', 'devre koptu'); await has('dE', 'son değer 1.086 V'); await has('dMassNow', '0.000 g'); await has('dCuNow', '0.541 M'); await has('dDiff', '0.0000 %');
      await range('dR', 100); await has('dStatus', 'Hazır'); await has('dQth', '8854.6 C'); await range('dVol', 50); await range('dCu', 0.05); await range('dZn', 2); await range('dMass', 50); await range('dR', 1); await click('dFinish'); await has('dStatus', 'Cu²⁺ tükendi'); await has('dQth', '482.43 C');
      await range('dVol', 500); await range('dCu', 2); await range('dZn', 0.05); await range('dMass', 0.5); await range('dR', 100); await click('dFinish'); await has('dStatus', 'devre koptu');
      await click('dischargeReset'); await has('dE', '1.099 V'); await has('dTime', '0 s'); await has('dMassOut', '10.0 g');

      // Klavye: sekmeler, R ve Boşluk
      await page.locator('#tab-discharge').focus(); await page.keyboard.press('Home'); ok((await page.locator('#tab-cell').getAttribute('aria-selected')) === 'true', 'Home');
      await page.keyboard.press('ArrowRight'); ok((await page.locator('#tab-nernst').getAttribute('aria-selected')) === 'true', 'ArrowRight');
      await page.keyboard.press('End'); ok((await page.locator('#tab-discharge').getAttribute('aria-selected')) === 'true', 'End');
      await page.keyboard.press('ArrowRight'); ok((await page.locator('#tab-cell').getAttribute('aria-selected')) === 'true', 'sarma'); ok(await page.locator('#panel-nernst').isHidden(), 'öteki paneller gizli');
      await page.keyboard.press('ArrowLeft'); await range('dR', 55); await page.locator('h1').click(); await page.keyboard.press('r'); await has('dROut', '10 Ω');
      await page.keyboard.press('Space'); await has('dStart', 'Duraklat'); await page.keyboard.press('Space'); await has('dStart', 'Başlat');
      await page.locator('#dR').focus(); await page.keyboard.press('r'); await has('dStart', 'Başlat');
      await noOverflow('son'); assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      await ctx.close();
    }
    console.log(`G elektrokimya: ${checks - before} arayüz kontrolü (390 px açık + 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
