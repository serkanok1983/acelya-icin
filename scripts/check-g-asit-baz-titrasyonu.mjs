// G · asit-baz-titrasyonu.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) node'da yüklenir ve sayfanın formüllerini KULLANMAYAN başvurularla karşılaştırılır:
// OpenStax Chemistry 2e Tablo 14.2 (HCl ve asetik asit titrasyonu, açılıp okunan değerler), OpenStax Ek H'den elle yazılmış
// Kₐ tablosu, kuvvetli asitte kapalı ikinci derece çözüm, zayıf asitte üçüncü derece polinomun Newton kökü, çok protonlu
// asitte kütle ve yük denkliği artıkları, kaba kuvvetle (çok ince ızgarada) bulunan bükülme noktası.
// `--browser`: 390 px açık ve 1280 px koyu temada gerçek arayüz denetimi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../asit-baz-titrasyonu.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.TitrasyonLab;
assert(Object.isFrozen(K), 'çekirdek dondurulmuş olmalı');

let checks = 0;
const near = (a, e, tol, label = '') => { assert(Number.isFinite(a) && Math.abs(a - e) <= tol, `${label}: ${a} ≠ ${e} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
const KW = 1.0e-14;

// ── Sabitler: OpenStax Ek H (Tablo H1) ve Şekil 14.19 ──
const KA = { hno2: [4.6e-4], hf: [6.4e-4], formic: [1.8e-4], acetic: [1.8e-5], hclo: [2.9e-8], boric: [5.4e-10], hcn: [4.9e-10], h3po4: [7.5e-3, 6.2e-8, 4.2e-13], h2co3: [4.3e-7, 4.7e-11], h2c2o4: [6.0e-2, 6.1e-5] };
near(K.KW, KW, 0, 'Kw');
for (const [id, ka] of Object.entries(KA)) { ok(JSON.stringify([...K.ACIDS[id].Ka]) === JSON.stringify(ka), `Ka ${id}`); ok(K.ACIDS[id].forms.length === ka.length + 1, `biçim sayısı ${id}`); }
ok(K.ACIDS.hcl.strong === true, 'HCl kuvvetli');
const RANGES = { mo: [3.1, 4.4], bcg: [3.8, 5.4], mr: [4.2, 6.3], btb: [6.0, 7.6], pr: [6.8, 8.2], pp: [8.0, 10.0], ayr: [10.0, 12.0] };
for (const ind of K.INDICATORS) { const r = RANGES[ind.id]; ok(r && ind.lo === r[0] && ind.hi === r[1], `aralık ${ind.id}`); }
ok(K.INDICATORS.length === 7, 'yedi indikatör');

// ── OpenStax Tablo 14.2: 25.00 mL 0.100 M asit, 0.100 M NaOH ──
const vols = [0, 5, 10, 15, 20, 22, 24, 24.5, 24.9, 25, 25.1, 25.5, 26, 28, 30, 35, 40, 45, 50];
const hclRef = [1.00, 1.18, 1.37, 1.60, 1.95, 2.20, 2.69, 3.00, 3.70, 7.00, 10.30, 11.00, 11.29, 11.75, 11.96, 12.22, 12.36, 12.46, 12.52];
const hacRef = [2.87, 4.14, 4.57, 4.92, 5.35, 5.61, 6.13, 6.44, 7.14, 8.72, 10.30, 11.00, 11.29, 11.75, 11.96, 12.22, 12.36, 12.46, 12.52];
const hcl = { acid: 'hcl', Ca: 0.1, Va: 25, Cb: 0.1 }, hac = { acid: 'acetic', Ca: 0.1, Va: 25, Cb: 0.1 };
vols.forEach((V, i) => {
  // tablo iki ondalıklıdır; 22 mL (2.195) yuvarlama sınırı, 0 mL asetik ve 24 mL asetik tablonun yaklaşık formülü
  near(K.phAt(hcl, V), hclRef[i], V === 22 ? 0.0101 : 0.0051, `Tablo 14.2 HCl ${V} mL`);
  near(K.phAt(hac, V), hacRef[i], [0, 24, 24.5].includes(V) ? 0.0151 : 0.0051, `Tablo 14.2 asetik ${V} mL`);
});

// ── Kuvvetli asit: kapalı çözüm h = (Δ + √(Δ² + 4Kw))/2, Δ = [Cl⁻] − [Na⁺] ──
for (const Ca of [1, 0.1, 0.0316, 1e-3, 1e-4]) for (const Cb of [1, 0.1, 1e-3]) for (const Va of [5, 25, 50]) for (const f of [0, 0.3, 0.999, 1, 1.001, 1.7]) {
  const sys = { acid: 'hcl', Ca, Va, Cb }, V = f * Ca * Va / Cb; if (V > 1e4) continue;
  const d = (Ca * Va - Cb * V) / (Va + V), h = d >= 0 ? (d + Math.sqrt(d * d + 4 * KW)) / 2 : 2 * KW / (-d + Math.sqrt(d * d + 4 * KW));
  near(K.phAt(sys, V), -Math.log10(h), 1e-9, `kuvvetli ${Ca}/${Cb}/${Va}/${f}`);
}
for (const C of [1, 0.1, 1e-3, 1e-4]) near(K.phAt({ acid: 'hcl', Ca: C, Va: 25, Cb: C }, 25), 7, 1e-9, 'eşdeğerlikte 7.00');

// ── Zayıf asit: h³ + (Ka + Na)h² + (Ka(Na − C) − Kw)h − Ka·Kw = 0, Newton (yukarıdan, tek pozitif kök) ──
function cubicRoot(C, Na, Ka) {
  const f = (h) => h ** 3 + (Ka + Na) * h * h + (Ka * (Na - C) - KW) * h - Ka * KW, df = (h) => 3 * h * h + 2 * (Ka + Na) * h + (Ka * (Na - C) - KW);
  let h = 2; for (let i = 0; i < 500; i++) { const n = h - f(h) / df(h); if (!(n > 0)) { h /= 10; continue; } if (Math.abs(n - h) < 1e-15 * h) { h = n; break; } h = n; }
  return h;
}
for (const id of ['hno2', 'hf', 'formic', 'acetic', 'hclo', 'boric', 'hcn']) for (const C of [0.5, 0.1, 1e-3, 1e-4]) for (const f of [0, 0.05, 0.5, 0.95, 1, 1.2]) {
  const sys = { acid: id, Ca: C, Va: 25, Cb: C }, V = 25 * f, Ct = C * 25 / (25 + V), Na = C * V / (25 + V);
  near(K.phAt(sys, V), -Math.log10(cubicRoot(Ct, Na, KA[id][0])), 1e-7, `zayıf ${id} ${C} ${f}`);
}
// Yarı eşdeğerlikte pH ≈ pKa (0.1 M asetik), HH sapması seyreltik HF'de büyük
near(K.phAt(hac, 12.5), -Math.log10(1.8e-5), 0.002, 'asetik yarı yol');
const hf3 = K.phAt({ acid: 'hf', Ca: 1e-3, Va: 25, Cb: 1e-3 }, 12.5);
ok(hf3 - -Math.log10(6.4e-4) > 0.5, 'seyreltik HF: HH başarısız');
// Eşlenik baz formülü 0.1 M asetikte tam çözüme 0.005 içinde
near(K.eqFormula(hac), K.phAt(hac, 25), 0.005, 'Kb formülü');

// ── Çok protonlu: kütle/yük denkliği artıkları, αⱼ₊₁/αⱼ = Kⱼ₊₁/h ──
for (const id of ['h3po4', 'h2co3', 'h2c2o4']) for (const C of [0.1, 0.01]) for (const f of [0, 0.5, 1, 1.5, 2, 2.5]) {
  const sys = { acid: id, Ca: C, Va: 25, Cb: 0.1 }, V = f * C * 25 / 0.1, pH = K.phAt(sys, V), h = 10 ** -pH, Ka = KA[id];
  const a = K.alphas(h, Ka); near(a.reduce((s, x) => s + x, 0), 1, 1e-12, 'Σα = 1');
  for (let j = 0; j < Ka.length; j++) if (a[j] > 1e-250) near(a[j + 1] / a[j] / (Ka[j] / h), 1, 1e-9, 'α oranı');
  const Ct = C * 25 / (25 + V), Na = 0.1 * V / (25 + V), neg = KW / h + Ct * a.reduce((s, x, j) => s + j * x, 0);
  ok(Math.abs(h + Na - neg) <= 1e-10 * (h + Na + neg), `yük denkliği ${id} ${f}`);
}
// Fosforik asit: ara eşdeğerlikte amfoter yaklaşım ±0.15, sıçramalar 25 ve 50 mL'de, üçüncüsü yok
const ph3 = { acid: 'h3po4', Ca: 0.1, Va: 25, Cb: 0.1 };
near(K.phAt(ph3, 25), (2.1249 + 7.2076) / 2, 0.05, '1. eşdeğerlik ≈ (pK1+pK2)/2');
near(K.phAt(ph3, 50), (7.2076 + 12.3768) / 2, 0.15, '2. eşdeğerlik ≈ (pK2+pK3)/2');
const pk = K.peaks(K.curve(ph3, 87.5, 0.01));
ok(pk.length === 2, 'fosforik: iki tepe'); near(pk[0].v, 25, 0.01, 'tepe 1'); near(pk[1].v, 50, 0.01, 'tepe 2');
ok(K.peaks(K.curve({ acid: 'h2co3', Ca: 0.1, Va: 25, Cb: 0.1 }, 62.5, 0.01)).length === 1, 'karbonik: tek tepe');

// ── Ölçülen eşdeğerlik: kaba kuvvet bükülme noktası (kapalı çözüm, 1e-5 mL ızgara) ──
function inflectionStrong(Ca, Va, Cb) {
  const ph = (V) => { const d = (Ca * Va - Cb * V) / (Va + V); const h = d >= 0 ? (d + Math.sqrt(d * d + 4 * KW)) / 2 : 2 * KW / (-d + Math.sqrt(d * d + 4 * KW)); return -Math.log10(h); };
  const Ve = Ca * Va / Cb, step = Ve * 1e-6; let best = -1, bv = 0;
  for (let V = Ve * 0.98; V <= Ve * 1.02; V += step) { const s = ph(V + step / 2) - ph(V - step / 2); if (s > best) { best = s; bv = V; } }
  return bv;
}
for (const [Ca, Cb, Va] of [[0.1, 0.1, 25], [0.01, 0.01, 25], [0.05, 0.1, 30], [1, 1, 10]]) {
  const sys = { acid: 'hcl', Ca, Va, Cb }, Ve = Ca * Va / Cb, ref = inflectionStrong(Ca, Va, Cb);
  for (const dv of [0.02, 0.05, 0.1]) { const m = K.measureEq(K.curve(sys, 2 * Ve, dv)); ok(m !== null, 'ölçüm var'); near(m.v, ref, dv * 0.05, `dpH/dV tepesi ${Ca} ${dv}`); ok(m.v2 !== null && Math.abs(m.v2 - ref) < dv, 'ikinci türev sıfırı'); }
}
// Sıçrama yarıda kesilmişse ölçüm yok
ok(K.measureEq(K.curve(hcl, 24.9, 0.05)) === null, 'sıçrama öncesi ölçüm yok');
// Çok zayıf asitte tepe eşdeğerlikten önce (0.01 M HCN)
const hcnM = K.measureEq(K.curve({ acid: 'hcn', Ca: 0.01, Va: 25, Cb: 0.01 }, 50, 0.05));
ok(hcnM && hcnM.v < 24.7, 'HCN: tepe eşdeğerlikten önce');
// Sıçrama boyu derişimle: 1, 0.1, 0.01, 0.001 M → 8.60, 6.60, 4.60, 2.60
[[1, 8.60], [0.1, 6.60], [0.01, 4.60], [0.001, 2.60]].forEach(([C, j]) => { const s = { acid: 'hcl', Ca: C, Va: 25, Cb: C }; near(K.phAt(s, 25.1) - K.phAt(s, 24.9), j, 0.006, `sıçrama ${C}`); });

// ── interp, volumeAtPH, ders kitabı formülleri ──
const pts = [[0, 1], [1, 3], [3, 4]];
near(K.interp(pts, 0.5), 2, 1e-12, 'interp'); near(K.interp(pts, 2), 3.5, 1e-12, 'interp 2'); ok(K.interp(pts, 4) === null, 'interp dışı');
for (const t of [3, 7, 9, 11]) { const V = K.volumeAtPH(hac, t, 0, 50); near(K.phAt(hac, V), t, 1e-6, `volumeAtPH ${t}`); }
near(K.textbook(hcl, 12.5).pH, -Math.log10(1.25 / 37.5), 1e-12, 'formül kalan H⁺');
near(K.textbook(hac, 10).pH, -Math.log10(1.8e-5) + Math.log10(1 / 1.5), 1e-12, 'formül HH');
near(K.textbook(hac, 0).pH, -Math.log10(Math.sqrt(1.8e-6)), 1e-12, 'formül √(KaC)');
near(K.textbook(hcl, 30).pH, 14 + Math.log10(0.5 / 55), 1e-12, 'formül fazla OH⁻');

// ── Bilinmeyen numune: belirlenimci, aralıkta, dört aday ──
const seen = new Set();
for (let s = 0; s < 2000; s++) { const u = K.unknown(s); ok(K.UNKNOWN_POOL.includes(u.acid) && u.Ca >= 0.05 && u.Ca <= 0.15 && u.Va === 25 && u.Cb === 0.1, 'numune aralıkta'); seen.add(u.acid); if (s < 20) ok(JSON.stringify(K.unknown(s)) === JSON.stringify(u), 'tekrar edilebilir'); }
ok(seen.size === 4, 'dört aday da çıkıyor');
const u1 = K.unknown(1); ok(u1.acid === 'acetic' && u1.Ca === 0.1203, 'numune 1');
for (const bad of [-1, 1.5, 1e7]) { assert.throws(() => K.unknown(bad)); checks++; }
for (const call of [() => K.phAt({ acid: 'x', Ca: 1, Va: 1, Cb: 1 }, 0), () => K.phAt(hcl, -1), () => K.phAt({ ...hcl, Ca: 0 }, 1), () => K.textbook(ph3, 1)]) { assert.throws(call); checks++; }
console.log(`G asit-baz-titrasyonu: ${checks} bağımsız çekirdek kontrolü PASS`);

if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright');
  const { createServer } = await import('node:http');
  const { join, extname } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const before = checks;
  let browser;
  try {
    browser = await chromium.launch();
    for (const [width, theme] of [[390, 'light'], [1280, 'dark']]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width < 500 ? 2 : 1, locale: 'tr-TR' });
      await ctx.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(8000);
      const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/asit-baz-titrasyonu.html`);
      await page.waitForTimeout(300);
      const read = (id) => page.locator('#' + id).textContent();
      const has = async (id, s) => { await page.waitForTimeout(60); const t = await read(id); assert(t.includes(s), `${width} #${id}: "${t}" içinde "${s}" yok`); checks++; };
      const range = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v);
      const click = (id) => page.locator('#' + id).click();
      // Her denetimin etiketi
      const unl = await page.evaluate(() => [...document.querySelectorAll('input,select')].filter((e) => !document.querySelector(`label[for="${e.id}"]`) && !e.closest('label')).map((e) => e.id));
      ok(unl.length === 0, 'etiketsiz denetim: ' + unl.join(','));
      ok(await page.evaluate(() => Object.isFrozen(window.TitrasyonLab) && !Object.getOwnPropertyDescriptor(window, 'TitrasyonLab').writable), 'çekirdek salt okunur');
      // 01 varsayılan
      await has('sVeq', '25.00 mL'); await has('sPH', '1.00'); await has('sCaOut', '0.100 M'); await has('sVmax', '—');
      await click('sOne'); await has('sV', '0.05 mL');
      await click('sFlow'); await page.waitForTimeout(1000); await click('sFlow');
      const v1 = parseFloat(await read('sV')); ok(v1 > 0.25 && v1 < 0.75, `akış zamana bağlı: ${v1}`);
      await click('sAll'); await has('sV', '50.00 mL'); await has('sVmax', '25.000 mL'); await has('sV2', '25.000 mL'); await has('sJump', '3.70 → 10.30 (ΔpH 6.60)'); await has('sEnd', '25.00 mL'); await has('sColour', 'pembe');
      await has('sPoints', '1.48'); await has('sPoints', '7.00'); await has('sPoints', '11.96'); await has('sStatus', 'Ölçülen eşdeğerlik 25.000 mL');
      await click('sPresetDilute'); await has('sCaOut', '0.00100 M'); await has('sVmax', '—'); await click('sAll'); await has('sJump', 'ΔpH 2.60'); await has('sVmax', '25.000 mL');
      await range('sCb', -4); await has('sStatus', 'büret ise 50 mL');
      await range('sCa', -4); await range('sCb', 0); await has('sStatus', 'büret bu kadar küçük');
      await click('sCompare'); await click('strongReset'); await has('sCaOut', '0.100 M'); await has('sV', '0.00 mL'); ok(!(await page.locator('#sCompare').isChecked()), 'sıfırlama karşılaştırmayı kapatır');
      await page.locator('#sDrop').selectOption('1.00'); await click('sAll'); await has('sStatus', 'Damla (1.00 mL)'); await click('strongReset');
      // klavye: Space ve R
      await page.locator('h1').click(); await page.keyboard.press('Space'); await page.waitForTimeout(400); ok((await page.locator('#sFlow').getAttribute('aria-pressed')) === 'true', 'Boşluk büreti açar');
      await page.keyboard.press('KeyR'); await has('sV', '0.00 mL'); ok((await page.locator('#sFlow').getAttribute('aria-pressed')) === 'false', 'R sıfırlar');
      // 02
      await click('tab-weak'); await has('wVeq', '25.00 mL'); await has('wPH', '2.88'); await click('wAll');
      await has('wHalf', '4.75'); await has('wPKa', '4.745 (ölçülen − tablo 0.000)'); await has('wEqPH', '8.72'); await has('wEqF', '8.72'); await has('wHH', '3.50'); await has('wEnd', '25.00 mL (+0.01 %)');
      ok(!(await read('wStatus')).includes('formülü eşdeğerlikte'), 'asetikte Kb formülü uyarısı yok');
      await click('wPresetDilute'); await has('wStatus', 'suyun kendi iyonlaşmasını yok sayar'); await click('wAll'); await has('wHalf', '3.73'); await has('wPKa', '3.194 (ölçülen − tablo +0.541)'); await has('wStatus', 'HH asidin kendi iyonlaşmasını'); await has('wStatus', "7'nin altında bir pH"); await has('wEqF', '6.95 (−0.18)'); await has('wEnd', '25.50 mL (+2.02 %)');
      await click('wPresetHCN'); await click('wAll'); await has('wStatus', 'eşdeğerlikten'); await has('wEnd', '8.22 mL (−67.10 %)');
      await click('wShowHH'); await click('weakReset'); await has('wV', '0.00 mL'); ok((await page.locator('#wAcid').inputValue()) === 'acetic', 'zayıf sıfırlama');
      // 03
      await click('tab-poly'); await has('pEq', '25.000'); await has('pEq', '49.999'); await has('pStatus', '3. noktada pH 12.18');
      await click('pGo1'); await has('pPH', '4.70'); await has('pDom', 'H₂PO₄⁻'); await click('pGo2'); await has('pPH', '9.67');
      await page.locator('#pIndSel').selectOption('mr'); await has('pStatus', 'Metil kırmızısı rengini 25.25 mL');
      await page.locator('#pAcid').selectOption('h2co3'); await has('pEq', 'sıçrama yok'); ok(await page.locator('#pGo2').isEnabled(), '2. nokta düğmesi');
      await page.locator('#pAcid').selectOption('h2c2o4'); await has('pEq', 'belirsiz');
      await click('polyReset'); await has('pV', '0.00 mL'); ok((await page.locator('#pAcid').inputValue()) === 'h3po4', 'çok protonlu sıfırlama');
      // 04
      await click('tab-unknown'); await has('uKnown', '25.00 mL · 0.1000 M'); await click('uAll'); await has('uV', '50.00 mL');
      await range('uCursor', 30.08); await has('uCur', '30.08 mL');
      await page.locator('#uVeqIn').fill('30,08'); await page.locator('#uPHIn').fill('4.74'); await click('uCheck');
      await has('uVerdict', 'doğru (±1 % içinde)'); await has('uVerdict', 'Asit türü: doğru'); await has('uVerdict', 'doğru (±0.10 içinde)');
      await page.locator('#uType').selectOption('strong'); await page.locator('#uVeqIn').fill('27'); await click('uCheck'); await has('uVerdict', 'tolerans dışında'); await has('uVerdict', 'Asit türü: yanlış');
      await click('uReveal'); await has('uVerdict', 'Asetik asit');
      await page.locator('#uSeed').fill('abc'); await page.locator('#uSeed').dispatchEvent('change'); await has('uStatus', 'tam sayı');
      await click('unknownReset'); await has('uV', '0.00 mL');
      // sekme klavyesi
      await page.locator('#tab-unknown').focus(); await page.keyboard.press('Home'); ok((await page.locator('#tab-strong').getAttribute('aria-selected')) === 'true', 'Home');
      await page.keyboard.press('ArrowRight'); ok((await page.locator('#tab-weak').getAttribute('aria-selected')) === 'true', 'ArrowRight');
      await page.keyboard.press('End'); ok((await page.locator('#tab-unknown').getAttribute('aria-selected')) === 'true', 'End');
      await page.keyboard.press('ArrowLeft'); ok(!(await page.locator('#panel-poly').isHidden()), 'ArrowLeft');
      for (const t of ['strong', 'weak', 'poly', 'unknown']) { await click('tab-' + t); await page.waitForTimeout(80); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width} ${t}: yatay taşma yok`); }
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G asit-baz-titrasyonu: ${checks - before} arayüz kontrolü (390 px açık + 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
