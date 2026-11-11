// G · fotosentez-solunum.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) node'da yüklenir ve sayfanın formüllerini KULLANMAYAN başvurularla
// karşılaştırılır: elle yazılmış atom denklikleri (kaba kuvvet), Wikipedia/OpenStax tablosundan elle yazılmış
// ATP defteri, hc = 1239.84198 eV·nm, ikiye bölmeyle çözülen ışık eğrisi kökleri, binom sayım sınırları,
// analitik kararlı durum ve tam sayı proton korunumu.
// `--browser`: 390 px açık ve 1280 px koyu temada gerçek arayüz denetimi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../fotosentez-solunum.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.FotosentezLab;
assert(Object.isFrozen(K), 'çekirdek dondurulmuş olmalı');

let checks = 0;
const near = (actual, expected, tol, label = '') => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(1, Math.abs(expected)), `${label} ${actual} ≠ ${expected} (tol ${tol})`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };

// ── Sabitler ──
near(K.F, 96485.33212, 1e-9, 'F'); near(K.R, 8.314462618, 1e-9, 'R');
ok(K.DG_GLUCOSE === -2880 && K.DG_ATP_STD === -30.5 && K.DG_ATP_CELL === -57, 'kaynaklı ΔG değerleri');
ok(K.H_NADH === 10 && K.H_FADH2 === 6 && K.PHOTONS_PER_O2 === 8, 'proton ve foton sayıları');

// ── 01 · Atom denkliği: elle kurulan koşullarla kaba kuvvet ──
for (let a = 0; a <= 12; a++) for (let b = 0; b <= 12; b++) for (let c = 0; c <= 12; c++) {
  for (let d = 0; d <= 12; d += 3) {
    const q = K.equation('photo', a, b, c, d), r = K.balance(q.left, q.right);
    const want = a === 6 && 2 * b === 12 + 2 * d && 2 * a + b === 6 + 2 * c + d;
    assert.equal(r.balanced, want, `fotosentez ${a},${b},${c},${d}`); checks++;
  }
  const q = K.equation('resp', a, b, c, 0), r = K.balance(q.left, q.right);
  assert.equal(r.balanced, b === 6 && 2 * c === 12 && 6 + 2 * a === 2 * b + c, `solunum ${a},${b},${c}`); checks++;
}
const parsed = K.parseFormula('C6H12O6'); ok(parsed.C === 6 && parsed.H === 12 && parsed.O === 6, 'glikoz formülü');
for (const bad of ['', 'c6', '6C', 'C6H12O6+']) { assert.throws(() => K.parseFormula(bad)); checks++; }

// ── 01 · ATP defteri: Wikipedia (Cellular respiration) tablosunun elle yazılmış hâli ──
// Glikoliz: −2 + 4 ATP, 2 NADH (sitoplazma); PDH: 2 NADH; Krebs: 2 GTP/ATP, 6 NADH, 2 FADH₂.
const ref = (PN, PF, sh) => (-2 + 4) + 2 + (2 + 6) * PN + 2 * PF + 2 * (sh === 'malat' ? PN : PF);
for (const sh of ['malat', 'gliserol']) for (let PN = 1; PN <= 3.0001; PN += 0.05) for (let PF = 0.5; PF <= 2.5001; PF += 0.1) {
  const L = K.ledger({ PN, PF, shuttle: sh });
  near(L.total, ref(PN, PF, sh), 1e-12, 'defter'); near(K.closedTotal({ PN, PF, shuttle: sh }), L.total, 1e-12, 'kapalı');
  ok(L.sub === 4 && L.co2 === 6, 'substrat ATP 4, CO₂ 6');
}
near(K.ledger({ PN: 2.5, PF: 1.5, shuttle: 'malat' }).total, 32, 1e-12); near(K.ledger({ PN: 2.5, PF: 1.5, shuttle: 'gliserol' }).total, 30, 1e-12);
near(K.ledger({ PN: 3, PF: 2, shuttle: 'malat' }).total, 38, 1e-12); near(K.ledger({ PN: 3, PF: 2, shuttle: 'gliserol' }).total, 36, 1e-12);
// Ara toplamlar: ilk 5 basamak glikolizdir (net 2 ATP, 2 NADH)
const L5 = K.ledger({ PN: 2.5, PF: 1.5, shuttle: 'malat' }, 5); ok(L5.sub === 2 && L5.stages.gly.nadhC === 2 && L5.co2 === 0, 'glikoliz ara toplamı');
near(K.ledger({ PN: 2.5, PF: 1.5, shuttle: 'malat' }, 0).total, 0, 1e-12);
// Verim: 32 × 30.5 / 2880 = %33.9 (OpenStax 7.4: "yaklaşık %34")
near(K.efficiency(32, -30.5), 976 / 2880, 1e-12); near(K.efficiency(32, -57), 1824 / 2880, 1e-12);
ok(Math.abs(K.efficiency(32, -30.5) - 0.34) < 0.005, '%34 ile uyum');

// ── 02 · Foton enerjisi: hc = 1239.84198 eV·nm, N_A·hc = 119626.566 kJ·nm/mol ──
for (let l = 400; l <= 720; l += 7) {
  const p = K.photon(l); near(p.eV, 1239.841984 / l, 1e-8, 'eV'); near(p.kJmol, 119626.5658 / l, 1e-8, 'kJ/mol');
  near(K.maxEfficiency(l), 480 / (8 * 119626.5658 / l), 1e-8, 'en büyük verim');
  near(K.fluxFromPower(1, l), l / 119626.5658 * 1000, 1e-8, 'W → µmol');
}
near(K.maxEfficiency(680), 0.3411, 2e-4, '680 nm verim'); near(K.maxEfficiency(600), 0.3009, 2e-4, '600 nm ≈ %30 (kaynak)');
near(114 * 4.184, K.storedPerCO2(), 0.01, '114 kcal ≈ 480 kJ');
// Spektrum tepeleri kaynaktaki yerlerde (±2 nm)
const argmax = (p, a, b) => { let best = a, v = -1; for (let l = a; l <= b; l += 0.25) { const e = K.eps(p, l); if (e > v) { v = e; best = l; } } return best; };
near(argmax('a', 400, 500), 430, 2 / 430); near(argmax('a', 600, 720), 662, 2 / 662); near(argmax('b', 400, 520), 453, 2 / 453); near(argmax('b', 600, 720), 642, 2 / 642);
ok(K.eps('k', 560) < 0.02 && K.eps('k', 450) > 0.95, 'karotenoit 400–550 nm');
for (let l = 400; l <= 720; l += 5) for (const D of [0.2, 1, 3]) for (const eta of [0, 0.5, 1]) {
  const A = K.absorptance(l, D), q = K.quantumYield(l, eta);
  ok(A >= 0 && A <= 1 && q >= 0 && q <= 1 + 1e-12, 'olasılıklar 0…1');
  near(K.o2Rate(l, 100, D, eta), 100 * A * q / 8, 1e-12);
}
ok(K.quantumYield(700, 1) < 0.2 && K.absorptance(700, 1) * K.quantumYield(700, 1) < 0.05 * K.absorptance(680, 1) * K.quantumYield(680, 1) && K.absorptance(700, 1) > 0.05, 'kırmızı düşüş: soğurma sürer, verim düşer');
// Binom sayım sınırları ve iç tutarlılık
for (const [l, D, eta] of [[680, 1, 0.5], [450, 1, 0.2], [550, 2, 0.5], [500, 1, 1], [640, 0.4, 0]]) for (const seed of [1, 2, 3, 4]) {
  const n = 40000, ctr = K.makePhotonCounter({ l, D, eta, seed }).step(n), A = K.absorptance(l, D), p = A * K.quantumYield(l, eta);
  ok(Math.abs(ctr.absorbed - n * A) <= 4.5 * Math.sqrt(n * A * (1 - A)) + 1, `soğurma binom ${l}`);
  ok(Math.abs(ctr.effective - n * p) <= 4.5 * Math.sqrt(n * p * (1 - p)) + 1, `etkin binom ${l}`);
  const by = ctr.byPigment; ok(by.a + by.b + by.k === ctr.absorbed && ctr.o2 === Math.floor(ctr.effective / 8) && ctr.n === n, 'sayım tutarlı');
}
{ const a = K.makePhotonCounter({ l: 680, D: 1, eta: 0.5, seed: 1 }).step(100000), b = K.makePhotonCounter({ l: 680, D: 1, eta: 0.5, seed: 1 }).step(100000); ok(a.o2 === b.o2 && a.absorbed === b.absorbed, 'tohumlu tekrar'); }

// ── 03 · Işık eğrisi: kök ikiye bölmeyle ──
const bisect = (f, a, b) => { let fa = f(a); for (let i = 0; i < 200; i++) { const m = (a + b) / 2, fm = f(m); if ((fm > 0) === (fa > 0)) { a = m; fa = fm; } else b = m; } return (a + b) / 2; };
for (const alpha of [0.02, 0.05, 0.12]) for (const theta of [0, 0.3, 0.7, 0.95, 1]) for (const Pm of [2, 18.5, 40]) for (const I of [0, 10, 250, 1000, 2000]) {
  const x = alpha * I, g = K.gross(I, alpha, theta, Pm);
  if (x === 0) { ok(g === 0, 'karanlıkta 0'); continue; }
  const quad = P => theta * P * P - (x + Pm) * P + x * Pm, ref = bisect(quad, 0, Math.min(x, Pm));
  if (theta < 1) near(g, ref, 1e-7, 'küçük kök'); ok(g <= Math.min(x, Pm) + 1e-12, 'Blackman üst sınırı');
  if (theta === 1) near(g, Math.min(x, Pm), 1e-12); if (theta === 0) near(g, x * Pm / (x + Pm), 1e-12);
}
for (const alpha of [0.03, 0.05, 0.1]) for (const theta of [0, 0.5, 0.7, 1]) for (const [Pm, Rd] of [[18.5, 1], [10, 3], [40, 0.4]]) {
  near(K.compensation(alpha, theta, Pm, Rd), bisect(I => K.gross(I, alpha, theta, Pm) - Rd, 0, 1e5), 1e-8, 'I_c');
  near(K.i90(alpha, theta, Pm), bisect(I => K.gross(I, alpha, theta, Pm) - 0.9 * Pm, 0, 1e7), 1e-8, 'I_90');
}
ok(K.compensation(0.05, 0.7, 1, 2) === null, 'Pmaks ≤ Rd: kompansasyon yok');
near(K.pmax(420, 25), 45 * 420 / 1020, 1e-12); near(K.rdark(1, 35), 2, 1e-12); near(K.rdark(1, 15), 0.5, 1e-12);
// Ölçüm turu: ince ızgarada ölçülen değerler kurama yaklaşır
{ const p = { C: 420, T: 25, alpha: 0.05, theta: 0.7, Rd25: 1 }, Pm = K.pmax(420, 25);
  const m100 = K.measureCurve(K.sweep(p, 100)), m1 = K.measureCurve(K.sweep(p, 1, 0, 7, 20000));
  near(m1.Ic, K.compensation(0.05, 0.7, Pm, 1), 1e-3, 'ince ızgara I_c'); near(m1.alpha, 0.05, 2e-3, 'ince ızgara α');
  ok(m100.Ic > K.compensation(0.05, 0.7, Pm, 1) && m100.alpha < 0.05, 'kaba ızgarada kiriş: I_c büyük, eğim küçük');
  const mB = K.measureCurve(K.sweep({ ...p, theta: 1 }, 1)); near(mB.I90, 0.9 * Pm / 0.05, 1e-3, 'Blackman: doymuş tepe ile I_90');
  near(m1.I90, bisect(I => K.gross(I, 0.05, 0.7, Pm) - 0.9 * (m1.top + 1), 0, 20000), 1e-3, 'ölçülen tepeye göre I_90'); ok(m1.I90 < K.i90(0.05, 0.7, Pm), 'doymamış tepe I_90\'ı küçültür');
  const n1 = K.sweep(p, 100, 1, 7), n2 = K.sweep(p, 100, 1, 7); ok(n1.every((q, i) => q[1] === n2[i][1]), 'gürültü tohumlu'); }

// ── 04 · Proton itici kuvvet ──
for (const T of [0, 25, 37, 45]) { const s = Math.log(10) * 8.314462618 * (T + 273.15) / 96485.33212 * 1000; near(K.nernstSlope(T), s, 1e-9); near(K.pmf(-170, 0.5, T), -170 - 0.5 * s, 1e-9); }
near(K.nernstSlope(25), 59.16, 1e-4); near(K.energyPerProton(-200), 19.297, 1e-4); near(K.minHperATP(-200), 57 / 19.297066, 1e-5); near(K.nadhEnergy(), 2 * 96.48533212 * 1.14, 1e-9);
// Adım adım simülasyon: tam sayı korunum, kompleks sayıları, kararlı durum
for (const rate of [2, 10, 20]) for (const fad of [0, 0.3, 1]) for (const unc of [0, 0.5, 1]) for (const adp of [true, false]) for (const n of [3.67, 4, 4.33]) {
  const s = K.makeETC({ rate, fad, unc, adp, n }); s.run(30);
  ok(s.Hm + s.Hi === K.ETC.M0 + K.ETC.I0, 'toplam proton sabit');
  ok(s.pumped - s.syn - s.leak === s.stored && s.stored >= 0, 'korunum');
  const bc = s.byComplex; ok(bc.I === 4 * s.nadh && bc.III === 4 * s.pairs && bc.IV === 2 * s.pairs && s.pumped === 10 * s.nadh + 6 * s.fadh && s.pairs === s.nadh + s.fadh, 'kompleks sayıları');
  ok(Math.abs(s.fadh - fad * s.pairs) <= 1, 'FADH₂ payı');
  if (!adp) ok(s.syn === 0, 'ADP yokken ATP yok'); if (unc === 0) ok(s.leak === 0, 'ayırıcısız sızıntı yok');
  near(s.atp, s.syn / n, 1e-12);
}
// Analitik kararlı durum (ayırıcısız): H̄·r·(1 − x/240) = ks·(x − Δp_min)
for (const [rate, fad, n] of [[10, 0, 4], [5, 0.5, 3.67], [20, 0.2, 4.33]]) {
  const s = K.makeETC({ rate, fad, unc: 0, adp: true, n }), Hbar = 10 * (1 - fad) + 6 * fad, dpMin = 57000 / (n * 96485.33212) * 1000;
  near(s.dpMin, dpMin, 1e-9, 'Δp_min');
  const x = (Hbar * rate + 2 * dpMin) / (2 + Hbar * rate / 240);
  s.run(80); let sum = 0, a0 = s.atp, p0 = s.pairs; for (let i = 0; i < 4000; i++) { s.step(); sum += s.dp; }
  near(sum / 4000, x, 0.01, 'kararlı |Δp|');
  near((s.atp - a0) / (s.pairs - p0), K.poTheory(fad, n), 0.02, 'kararlı P/O');
}
{ const a = K.makeETC({ rate: 10, fad: 0, unc: 0, adp: true, n: 4 }).run(60), b = K.makeETC({ rate: 10, fad: 0, unc: 0.5, adp: true, n: 4 }).run(60), c = K.makeETC({ rate: 10, fad: 0, unc: 0, adp: false, n: 4 }).run(60);
  ok(b.atp < a.atp && b.pairs > a.pairs && b.leak > 0, 'ayırıcı: ATP düşer, solunum artar'); ok(c.dp > 230 && c.pairs < a.pairs, 'ADP yok: solunum denetimi'); }
for (const call of [() => K.ledger({ PN: 0, PF: 1, shuttle: 'malat' }), () => K.ledger({ PN: 2, PF: 1, shuttle: 'x' }), () => K.gross(-1, 0.05, 0.5, 10), () => K.gross(1, 0.05, 1.5, 10), () => K.makeETC({ rate: 1, fad: 2, unc: 0, adp: true, n: 4 })]) { assert.throws(call); checks++; }
console.log(`G fotosentez-solunum: ${checks} bağımsız denklik, defter, foton, kök, binom ve proton korunumu kontrolü PASS`);

// Ölçülen I₉₀'ın üst sınırla yakınsaması (bağımsız: kuram kapalı biçimden değil, ikiye bölmeyle)
{ const p = { C: 420, T: 25, alpha: 0.05, theta: 0.7, Rd25: 1 }, Pm = K.pmax(420, 25); let lo = 0, hi = 1e6; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (K.gross(m, 0.05, 0.7, Pm) < 0.9 * Pm) lo = m; else hi = m; }
  const errs = [2000, 10000, 50000].map(Im => Math.abs(K.measureCurve(K.sweep(p, 100, 0, 7, Im)).I90 / lo - 1)); ok(errs[0] > errs[1] && errs[1] > errs[2] && errs[2] < 0.02, 'I₉₀ üst sınırla yakınsar'); }
if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright');
  const { createServer } = await import('node:http');
  const { join, extname } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  let browser; const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [['light', 390], ['dark', 1280]]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
      await page.addInitScript(t => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      page.setDefaultTimeout(8000);
      const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/fotosentez-solunum.html`);
      const read = id => page.locator('#' + id).textContent(), click = id => page.locator('#' + id).click();
      const has = async (id, t) => { const s = await read(id); assert(s.includes(t), `${id}: "${s}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v));
      const select = (id, v) => page.locator('#' + id).selectOption(String(v));
      // Etiketler: her denetimin <label for> karşılığı var
      eq(await page.evaluate(() => [...document.querySelectorAll('main input,main select')].every(e => document.querySelector(`label[for="${e.id}"]`))), true);
      // 01
      await has('lTotal', '32.00 ATP'); await has('lClosed', '32.00 ATP'); await has('lRange', 'aralıkta'); await has('lEff', '33.9 %'); await has('lOxShare', '87.5 %'); await has('lCO2', '6 / 6'); await has('eqStatus', 'Denk:');
      await select('lShuttle', 'gliserol'); await has('lTotal', '30.00'); await click('lOld'); await has('lTotal', '36.00'); await select('lShuttle', 'malat'); await has('lTotal', '38.00'); await has('lRange', 'üstünde');
      await select('lDG', '57'); await has('lEff', '75.2 %');
      await range('eqB', 7); await has('eqStatus', 'Denk değil'); await click('eqTrace'); await has('eqStatus', '¹⁸O'); await select('eqKind', 'resp'); await has('eqStatus', '−2880');
      await click('ledgerReset'); await click('lStep'); await has('lTotal', 'eksik: 1 / 11'); await has('lRange', 'bitmedi'); await click('lAll'); await has('lTotal', '32.00 ATP');
      await range('lPN', 1); await range('lPF', 0.5); await has('lTotal', '15.00'); await has('lRange', 'altında'); await click('ledgerReset'); await has('lTotal', '32.00 ATP');
      // 02
      await click('tab-light'); await has('pEmol', '175.9 kJ/mol'); await has('pE', '1.823 eV'); await has('pRateMeas', 'başlamadı'); await has('pEff', '34.1 %');
      await click('pBurst'); await has('pCount', '100000 foton'); const m = await read('pRateMeas'); assert(/µmol/.test(m)); checks++;
      await click('pGreen'); await has('pLOut', '550 nm'); await has('pRateMeas', 'başlamadı'); await click('pFar'); await has('pStatus', 'Kırmızı düşüş');
      await range('pFlux', 0); await has('pRateMeas', 'ışık yok'); await select('pMode', 'power'); eq(await page.locator('#pPowerField').isVisible(), true); await has('pStatus', 'W/m²');
      await click('lightReset'); await has('pLOut', '680 nm'); eq(await page.locator('#pFluxField').isVisible(), true);
      await click('pRun'); await page.waitForTimeout(600); await click('pRun'); const n1 = await read('pCount'); assert(!n1.startsWith('0 foton')); checks++;
      // 03
      await click('tab-curve'); await has('cIcTh', '20.3'); await has('cI90Th', '1234'); await has('cPmax', '18.53'); await has('cAlphaMeas', '0.0455');
      await click('cBlackman'); await has('cThetaOut', '1.00'); await has('cI90Th', '334');
      await range('cRd25', 3); await range('cT', 45); await range('cCO2', 100); await has('cIcTh', 'tanımsız'); await has('cIcMeas', 'hiç pozitif'); await has('cStatus', 'kompansasyon noktası yoktur');
      await click('curveReset'); await select('cStep', '25'); await has('cIcMeas', '20.'); await select('cNoise', '1'); await has('cStatus', 'Gürültü'); await click('curveReset'); await has('cIcMeas', '22.0');
      // Okumaların üst sınırı: ölçülen I₉₀ kurama yavaşça yaklaşır (2000 → 835, 10000 → 1131, 50000 → 1213; kuram 1234)
      await has('cI90Meas', '835'); await select('cMax', '10000'); await has('cI90Meas', '1131'); await select('cMax', '50000'); await has('cI90Meas', '1213'); await has('cStatus', 'asimptot'); await click('curveReset'); eq(await page.locator('#cMax').inputValue(), '2000'); await has('cI90Meas', '835');
      // 04
      await click('tab-proton'); await has('xDp', '−200.8 mV'); await has('xPN', '2.50'); await has('xMinH', '2.94'); await has('sPO', '—');
      await click('sFast'); await has('sPO', '2.503'); await has('sPOth', '2.500'); await has('sCons', '0 (biriken');
      await click('sDNP'); await click('sFast'); const po = +(await read('sPO')).replace('−', '-'); assert(po < 2.0 && po > 0.5, 'ayırıcıyla P/O düşer'); checks++; await has('sStatus', 'ısıya');
      await click('sNoADP'); await click('sFast'); await has('sATP', '0.00'); await has('sStatus', 'solunum denetimi');
      await select('xN', '3.67'); await has('xPN', '2.72'); await click('sToLedger'); eq(await page.locator('#tab-ledger').getAttribute('aria-selected'), 'true'); await has('lPNOut', '2.70'); await has('lPFOut', '1.65');
      await click('tab-proton'); await click('protonReset'); await has('xPN', '2.50'); await has('sTime', '0.0 s');
      await range('xPsi', 0); await range('xpH', 0); await has('xMinH', 'gradyan yok');
      // Klavye: sekmeler ve kısayollar
      await page.locator('#tab-proton').focus(); await page.keyboard.press('Home'); eq(await page.locator('#tab-ledger').getAttribute('aria-selected'), 'true');
      await page.keyboard.press('ArrowLeft'); eq(await page.locator('#tab-proton').getAttribute('aria-selected'), 'true'); await page.keyboard.press('End'); eq(await page.locator('#tab-proton').getAttribute('aria-selected'), 'true');
      await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-ledger').getAttribute('aria-selected'), 'true');
      await click('tab-light'); await page.locator('h1').click(); await page.keyboard.press('Space'); await page.waitForTimeout(300); await has('pRun', 'Durdur'); await page.keyboard.press('r'); await has('pRun', 'Saymaya başla');
      eq(await page.evaluate(() => Object.isFrozen(FotosentezLab) && !Object.getOwnPropertyDescriptor(window, 'FotosentezLab').writable), true);
      for (const t of ['ledger', 'light', 'curve', 'proton']) { await click('tab-' + t); eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true); }
      assert.deepEqual(errors, []); checks++;
      await page.close();
    }
    console.log(`G fotosentez-solunum: ${checks - before} gerçek arayüz kontrolü (390 px açık, 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise(r => server.close(r)); }
}
function eq(a, b) { assert.equal(a, b); checks++; }
