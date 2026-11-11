// G · dna-replikasyon.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) node'da yüklenir ve sayfanın kendi formüllerini KULLANMAYAN başvurularla
// karşılaştırılır: düzenli ifadeyle baz sayımı ve dize çevirme ile tamamlayıcı, OpenStax 14.2 sabitleri,
// tamsayı aritmetiğiyle Okazaki sınırları ve nükleotit nükleotit ilerleyen kaba kuvvet çatal, nüfus özyinelemesiyle
// Meselson–Stahl kesirleri ve azot korunumu, baz baz Bernoulli denemesi ve binom dağılımıyla hata sayısı,
// amino aside göre gruplanmış ayrı bir genetik şifre tablosuyla çeviri.
// `--browser`: 390 px açık ve 1280 px koyu temada gerçek arayüz denetimi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../dna-replikasyon.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.DnaLab;
assert(Object.isFrozen(K), 'çekirdek dondurulmuş olmalı');

let checks = 0;
const near = (actual, expected, tol, label = '') => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(1, Math.abs(expected)), `${label} ${actual} ≠ ${expected} (tol ${tol})`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };
const rng = (a) => () => { a = (a * 1103515245 + 12345) % 2147483648; return a / 2147483648; }; // ayrı bir üreteç (LCG)

// ── 01 · Çift sarmal ──
// OpenStax Biology 2e 14.2: 0.34 nm, 3.4 nm/tur → 10 bç/tur, çap 2 nm
ok(K.BP_RISE_NM === 0.34 && Math.abs(K.BP_PER_TURN - 3.4 / 0.34) < 1e-12 && K.HELIX_DIAM_NM === 2, 'sarmal sabitleri');
const cnt = (s, b) => (s.match(new RegExp(b, 'g')) || []).length;
const compRef = (s) => s.replace(/[ATGC]/g, (c) => ({ A: 'T', T: 'A', G: 'C', C: 'G' })[c]);
const r1 = rng(7);
for (let trial = 0; trial < 400; trial++) {
  const n = 1 + Math.floor(r1() * 120); let s = ''; for (let i = 0; i < n; i++) s += 'ACGT'[Math.floor(r1() * 4)];
  const d = K.duplex(s), bot = compRef(s), both = s + bot;
  ok(K.complement(s) === bot && K.reverseComplement(s) === [...bot].reverse().join(''), 'tamamlayıcı');
  ok(d.ds.A === cnt(both, 'A') && d.ds.T === cnt(both, 'T') && d.ds.G === cnt(both, 'G') && d.ds.C === cnt(both, 'C'), 'çift iplik sayımı');
  ok(d.ds.A === d.ds.T && d.ds.G === d.ds.C && d.ds.A + d.ds.G === d.ds.T + d.ds.C, 'Chargaff çift iplikte');
  const at = cnt(s, '[AT]'), gc = cnt(s, '[GC]');
  ok(d.hbonds === 2 * at + 3 * gc && d.at === at && d.gc === gc, 'H-bağı');
  near(d.tmWallace, 2 * at + 4 * gc, 1e-12, 'Wallace'); near(d.tmGC, 64.9 + (41 * (gc - 16.4)) / n, 1e-12, 'GC formülü');
  ok(d.wallaceValid === n < 14 && d.gcValid === n >= 14, 'geçerlilik aralığı');
  near(d.lengthNm, n * 0.34, 1e-12); near(d.turns, n / 10, 1e-12);
}
ok(K.duplex('ATGCGATACGTA').hbonds === 29, 'örnek dizi 29 bağ');
ok(K.reverseComplement('GAATTC') === 'GAATTC', 'EcoRI palindrom');
ok(K.parseSeq(' atg c\n').seq === 'ATGC', 'küçük harf ve boşluk');
ok(K.parseSeq('ATGX').error === 'char' && K.parseSeq('ATGX').pos === 4, 'geçersiz harf');
ok(K.parseSeq('AUG').error === 'rna', 'U'); ok(K.parseSeq('').error === 'empty', 'boş');
ok(K.parseSeq('A'.repeat(121)).error === 'long' && K.parseSeq('A'.repeat(120)).ok, 'en çok 120');

// ── 02 · Çatal: kaba kuvvet (nükleotit nükleotit) ──
ok(K.canExtend('3') && !K.canExtend('5'), 'yalnız 3′ ucuna ekleme');
function bruteFork(L, ell) { // primaz: tek iplik boşluğu ell'e ulaşınca; çatal sona varınca kalan boşluğa bir primer
  const starts = []; let lastB = 0;
  for (let x = 1; x <= L; x++) { if (x - lastB === ell && x < L) { starts.push(x); lastB = x; } }
  if (L - lastB > 0) starts.push(L);
  return starts;
}
for (const L of [2000, 3000, 9999, 10000, 10001, 17000, 20000]) for (const ell of [100, 150, 333, 1000, 1999, 2000]) for (const v of [50, 100, 1000]) {
  const ref = bruteFork(L, ell), S = K.makeFork({ L, ell, v, primer: 10 });
  const dt = ell / v / 7; let prevLead = 0; const prev3 = new Map(); let maxGap = 0;
  while (!S.done) {
    S.step(dt);
    ok(S.lead >= prevLead, 'öncü 3′ ucu yalnız çatal yönünde ilerler'); checks--; prevLead = S.lead;
    for (const f of S.frags) { const p = prev3.get(f.b); if (p !== undefined) { assert(f.end3 <= p + 1e-9, 'geciken parça 5′→3′ (sola) büyür'); } prev3.set(f.b, f.end3); }
    if (S.forkTime === null) maxGap = Math.max(maxGap, S.xf - S.lagSynth());
  }
  ok(S.frags.length === ref.length && S.frags.every((f, i) => f.b === ref[i]), `parça sınırları L=${L} ℓ=${ell}`);
  ok(S.frags.length === K.fragmentFormula(L, ell) && S.frags.length === Math.ceil(L / ell), '⌈L/ℓ⌉');
  ok(S.primersLaid() === ref.length + 1 && S.rnaLeft() === 2 && S.nicks() === 0, 'primer ve çentik sayımı');
  near(S.lagSynth(), L, 1e-9, 'geciken iplik tamamen yazıldı'); near(S.lead, L, 1e-12);
  near(S.forkTime, L / v, 1e-12, 'çatal süresi');
  // kaba kuvvet bitiş: her parça başladığı yerde (b/v) başlar, boyu kadar sürer; sonra (ilk parça dışında) Pol I primer boyunca
  let tRef = 0; ref.forEach((b, i) => { const a = i ? ref[i - 1] : 0; tRef = Math.max(tRef, (b + (b - a)) / v + (i ? 10 / v : 0)); });
  near(S.doneTime, tRef, 1e-9, 'bitiş süresi'); near(K.forkFinishTime(L, ell, v, 10), tRef, 1e-9, 'bitiş formülü');
  ok(S.doneTime <= L / v + (ell + 10) / v + 1e-9, 'gecikme en çok (ℓ + primer) / v');
  ok(maxGap <= ell + v * dt + 1e-6, 'geciken iplik çatalın en çok ℓ gerisinde');
  if (ref.length > 1) near(S.meanLen(), ell, 1e-12, 'ortalama parça');
  // h/2 ikizi: olay anları adımdan bağımsız
  const T = K.makeFork({ L, ell, v, primer: 10 }).run(dt / 2.3); near(T.doneTime, S.doneTime, 1e-9, 'h/2'); ok(T.frags.length === S.frags.length, 'h/2 parça');
}
// hız parça sayısını değiştirmez, süreyi değiştirir
{ const a = K.makeFork({ L: 10000, ell: 1000, v: 1000 }).run(0.01), b = K.makeFork({ L: 10000, ell: 1000, v: 500 }).run(0.01); ok(a.frags.length === b.frags.length, 'hız'); near(b.forkTime, 2 * a.forkTime, 1e-12); }
// dağınık boylar: çok tohumda ortalama ℓ'ye, sayı L/ℓ'ye yakın
{ let sumN = 0, sumMean = 0; for (let seed = 1; seed <= 200; seed++) { const S = K.makeFork({ L: 20000, ell: 500, v: 1000, jitter: true, seed }).run(0.05); sumN += S.frags.length; sumMean += S.meanLen(); for (const f of S.frags.slice(0, -1)) assert(f.b - f.a >= 350 && f.b - f.a <= 650); }
  near(sumMean / 200, 500, 0.01, 'dağınık ortalama'); near(sumN / 200, 20000 / 500 + 0.5, 0.03, 'dağınık sayı ≈ L/ℓ + 1/2'); }
for (const bad of [() => K.makeFork({ L: 0, ell: 100, v: 10 }), () => K.makeFork({ L: 100, ell: 5, v: 10, primer: 10 }), () => K.makeFork({ L: 100, ell: 50, v: 0 })]) { assert.throws(bad); checks++; }

// ── 03 · Meselson–Stahl: nüfus özyinelemesi ──
function popRef(model, g) { let HH = 1, HL = 0, LL = 0; for (let i = 0; i < g; i++) { if (model === 'semi') [HH, HL, LL] = [0, 2 * HH + HL, HL + 2 * LL]; else [HH, HL, LL] = [HH, 0, HH + 2 * LL]; } const t = HH + HL + LL; return { 1: HH / t, 0.5: HL / t, 0: LL / t }; }
for (const model of ['semi', 'cons', 'disp']) for (const n0 of [8, 32, 128]) for (const seed of [1, 2, 9]) {
  const hist = K.msSimulate({ model, gens: 4, n0, seed });
  for (let g = 0; g <= 4; g++) {
    const mols = hist[g]; ok(mols.length === n0 * 2 ** g, 'molekül sayısı');
    let heavy = 0; for (const [a, b] of mols) for (let i = 0; i < K.SEG; i++) heavy += a[i] + b[i];
    ok(heavy === n0 * 2 * K.SEG, 'azot-15 korunur');
    const bands = K.msBands(K.msDensities(mols, false)), th = K.msTheory(model, g, false);
    if (model !== 'disp') {
      const ref = popRef(model, g), want = Object.entries(ref).filter(([, f]) => f > 0).map(([p, f]) => ({ pos: +p, frac: f })).sort((x, y) => y.pos - x.pos);
      ok(bands.length === want.length && th.length === want.length, `${model} g=${g} bant sayısı`);
      want.forEach((w, i) => { near(bands[i].pos, w.pos, 1e-12); near(bands[i].frac, w.frac, 1e-12); near(th[i].pos, w.pos, 1e-12); near(th[i].frac, w.frac, 1e-12); });
    } else {
      const d = K.msDensities(mols, false), mean = d.reduce((s, x) => s + x, 0) / d.length;
      ok(bands.length === 1, 'dağılımlı tek bant'); near(mean, 2 ** -g, 1e-12, 'dağılımlı ortalama'); near(th[0].pos, 2 ** -g, 1e-12);
    }
    // ısıtılmış: iplik yoğunlukları
    const s = K.msDensities(mols, true), thS = K.msTheory(model, g, true);
    if (model !== 'disp') { const hv = s.filter((x) => x === 1).length / s.length; near(hv, 2 ** -g, 1e-12, 'ağır iplik payı'); ok(s.every((x) => x === 0 || x === 1), 'iplikler bütün'); near(thS[0].frac, 2 ** -g, 1e-12); }
    else if (g > 0) ok(thS.length === 1, 'dağılımlı iplik tek bant');
  }
}
// dağılımlı 1. nesil: molekül yoğunluğu ~ Binom(128, 1/2)/128, sd = 0.0442
{ const d = K.msDensities(K.msSimulate({ model: 'disp', gens: 1, n0: 4096, seed: 3 })[1], false); const m = d.reduce((s, x) => s + x, 0) / d.length, sd = Math.sqrt(d.reduce((s, x) => s + (x - m) ** 2, 0) / d.length); near(sd, Math.sqrt(0.25 / 128), 0.05, 'dağılımlı yayılma'); }
ok(K.msMatches('semi', 1) && K.msMatches('semi', 2) && K.msMatches('disp', 1) && !K.msMatches('disp', 2) && !K.msMatches('cons', 1) && !K.msMatches('cons', 2), '1958 eşleşmesi');
ok(K.msMatches('semi', 0) === null && K.msMatches('semi', 3) === null, 'kaynakta olmayan nesil');

// ── 04 · Hata: Bernoulli ve binom ──
near(K.errorRate(-5, true, true), 1e-9, 1e-9); near(K.errorRate(-5, false, false), 1e-5, 1e-9); near(K.errorRate(-3, true, false), 1e-5, 1e-9);
// küçük genom: baz baz Bernoulli ile aynı dağılım (ortalama ve sıfır payı)
{ const p = 0.01, G = 300, n = 20000, sim = K.simulateErrors({ p, G, copies: n, seed: 5 }), r = rng(11); let bern = 0, z = 0, zs = 0;
  for (let c = 0; c < n; c++) { let k = 0; for (let i = 0; i < G; i++) if (r() < p) k++; bern += k; if (!k) z++; }
  const ms = sim.reduce((a, b) => a + b, 0) / n; zs = sim.filter((x) => !x).length / n;
  near(ms, G * p, 0.03, 'Bernoulli ortalama'); near(bern / n, G * p, 0.03); near(zs, (1 - p) ** G, 0.06, 'binom sıfır payı'); near(z / n, (1 - p) ** G, 0.06);
  const v = sim.reduce((a, b) => a + (b - ms) ** 2, 0) / (n - 1); near(v, G * p * (1 - p), 0.05, 'binom varyansı'); }
for (const [p, G] of [[1e-9, 4.6e6], [1e-9, 6e9], [1e-7, 3e9], [1e-5, 4.6e6]]) for (const seed of [1, 2, 3]) {
  const E = p * G, n = Math.max(20, Math.min(2000, Math.floor(3e6 / E))), sim = K.simulateErrors({ p, G, copies: n, seed }), m = sim.reduce((a, b) => a + b, 0) / n;
  ok(Math.abs(m - E) <= 5 * Math.sqrt(E / n) + 1e-12, `ortalama 5σ içinde p=${p} G=${G}`);
}
{ let s = 0; for (let k = 0; k < 200; k++) s += K.poisson(k, 6); near(s, 1, 1e-10, 'Poisson toplamı'); let f = 1; for (let k = 0; k < 15; k++) { if (k) f *= k; near(K.poisson(k, 2.5), 2.5 ** k * Math.exp(-2.5) / f, 1e-9, 'Poisson'); } ok(K.poisson(0, 0) === 1 && K.poisson(3, 0) === 0, 'λ = 0'); }
assert.throws(() => K.simulateErrors({ p: 0, G: 10, copies: 1 })); checks++;

// ── Okuma çerçevesi: ayrı şifre tablosu ──
const CODE = { Phe: 'TTT TTC', Leu: 'TTA TTG CTT CTC CTA CTG', Ile: 'ATT ATC ATA', Met: 'ATG', Val: 'GTT GTC GTA GTG', Ser: 'TCT TCC TCA TCG AGT AGC', Pro: 'CCT CCC CCA CCG', Thr: 'ACT ACC ACA ACG', Ala: 'GCT GCC GCA GCG', Tyr: 'TAT TAC', Dur: 'TAA TAG TGA', His: 'CAT CAC', Gln: 'CAA CAG', Asn: 'AAT AAC', Lys: 'AAA AAG', Asp: 'GAT GAC', Glu: 'GAA GAG', Cys: 'TGT TGC', Trp: 'TGG', Arg: 'CGT CGC CGA CGG AGA AGG', Gly: 'GGT GGC GGA GGG' };
const REF = {}; for (const [aa, cs] of Object.entries(CODE)) for (const c of cs.split(' ')) REF[c] = aa;
ok(Object.keys(REF).length === 64, '64 kodon'); for (const c of Object.keys(REF)) ok(K.AA[c] === REF[c], `şifre ${c}`);
const tr = (s) => { const o = []; for (let i = 0; i + 3 <= s.length; i += 3) { const a = REF[s.slice(i, i + 3)]; o.push(a); if (a === 'Dur') break; } return o; };
ok(tr(K.FRAME).join(' ') === 'Met Lys Ala Trp Arg Glu Phe Gln Tyr Dur', 'özgün çerçeve');
for (let pos = 1; pos <= 30; pos++) {
  for (const base of 'ACGT') {
    const r = K.analyse(K.FRAME, { type: 'sub', pos, base, n: 1 }), mut = K.FRAME.slice(0, pos - 1) + base + K.FRAME.slice(pos);
    ok(r.mut === mut && r.p1.map((x) => x.aa).join() === tr(mut).join(), 'yerine geçme çevirisi');
    const k = Math.floor((pos - 1) / 3), a = tr(K.FRAME)[k], b = tr(mut)[k], old = K.FRAME[pos - 1];
    const want = old === base ? 'none' : a === b ? 'silent' : b === 'Dur' ? 'nonsense' : a === 'Dur' ? 'stoploss' : 'missense';
    ok(r.kind === want, `sınıf ${pos}${base}`);
    if (old !== base) ok(r.sub === ('AG'.includes(old) === 'AG'.includes(base) ? 'transition' : 'transversion'), 'geçiş / çapraz geçiş');
  }
  for (const type of ['ins', 'del']) for (const n of [1, 2, 3]) {
    if (type === 'del' && pos + n - 1 > 30) continue;
    const r = K.analyse(K.FRAME, { type, pos, base: 'C', n }), mut = type === 'ins' ? K.FRAME.slice(0, pos - 1) + 'C'.repeat(n) + K.FRAME.slice(pos - 1) : K.FRAME.slice(0, pos - 1) + K.FRAME.slice(pos - 1 + n);
    ok(r.mut === mut && r.mut.length === 30 + (type === 'ins' ? n : -n), 'uzunluk'); ok((r.kind === 'frameshift') === (n % 3 !== 0), 'çerçeve kayması 3n değilse');
    const p0 = tr(K.FRAME), p1 = tr(mut); let ch = 0;
    if (n % 3) { for (let i = 0; i < Math.max(p0.length, p1.length); i++) if (p0[i] !== p1[i]) ch++; }
    else { // çerçeve içi: en uzun ortak baş + son ile hizala (ayrı yazım: dize birleştirme ile)
      let best = 0; for (let a = 0; a <= Math.min(p0.length, p1.length); a++) { if (p0.slice(0, a).join() !== p1.slice(0, a).join()) break; for (let b = 0; a + b <= Math.min(p0.length, p1.length); b++) { if (b && p0.slice(p0.length - b).join() !== p1.slice(p1.length - b).join()) break; best = Math.max(best, a + b); } }
      ch = Math.max(p0.length, p1.length) - best; ok(ch >= 1 && ch <= 2 || p1.length < p0.length - 1, `çerçeve içi en çok iki konum ${type}${pos} ${p1}`); }
    ok(r.changed === ch, `değişen sayısı ${type}${pos}/${n}`);
  }
}

console.log(`G dna-replikasyon: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

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
      await page.goto(`http://127.0.0.1:${server.address().port}/dna-replikasyon.html`);
      const click = (id) => page.locator('#' + id).click();
      const read = async (id) => (await page.locator('#' + id).textContent()).trim();
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `[${width}] ${id}: "${t}" içinde "${text}" yok`); checks++; };
      const range = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v);
      const check = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.checked = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v);
      const select = (id, v) => page.locator('#' + id).selectOption(v);
      const type = (v) => page.locator('#hSeq').fill(v);
      const noOverflow = async (label) => { ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `[${width}] yatay taşma: ${label}`); };
      const painted = async (id) => { ok(await page.locator('#' + id).evaluate((c) => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; const s = new Set(); for (let i = 0; i < d.length; i += 4 * 97) s.add(d[i] + ',' + d[i + 1] + ',' + d[i + 2]); return c.width > 100 && s.size > 4; }), `[${width}] ${id} çizilmedi`); };
      const rangeReach = async (id, v) => ok(await page.locator('#' + id).evaluate((e, v) => { const mn = +e.min, st = +e.step; return Math.abs(((v - mn) / st) - Math.round((v - mn) / st)) < 1e-9 && v >= mn && v <= +e.max; }, v), `${id}=${v} adımla erişilebilir`);

      ok(await page.evaluate(() => [...document.querySelectorAll('main input, main select')].every((e) => document.querySelector(`label[for="${e.id}"]`))), 'her denetimin etiketi var');
      ok(await page.evaluate(() => [...document.querySelectorAll('main canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), 'tuvaller role=img');
      ok(await page.evaluate(() => Object.isFrozen(DnaLab) && !Object.getOwnPropertyDescriptor(window, 'DnaLab').writable), 'çekirdek dondurulmuş');
      ok(await page.evaluate(() => !/[̀-ͯ]/.test(document.querySelector('main').textContent.normalize('NFC'))), 'birleşik işaret yok');
      for (const [id, v] of [['fL', 10000], ['fEll', 1000], ['fV', 1000], ['fV', 100], ['fP', 10], ['fP', 5], ['mGen', 2], ['eBase', -5]]) await rangeReach(id, v);

      // 01 · Çift sarmal
      await has('hN', '12 bç'); await has('hHB', '29'); await has('hHBth', '29 (2·7 + 3·5)'); await has('hGC', '41.7 %'); await has('hDs', '7 · 7 · 5 · 5');
      await has('hRatio', 'A/T = 1.000 · G/C = 1.000'); await has('hSingle', 'A/T = 1.333 · G/C = 1.500'); await has('hPur', '12 / 12 = 1.000');
      await has('hLen', '4.08 nm'); await has('hTurns', '1.2 tur'); await has('hTmW', '34.0 °C'); await has('hTmG', '26.0 °C (geçerli değil');
      await has('hTop', '5′-ATGCGATACGTA-3′'); await has('hBot', '3′-TACGCTATGCAT-5′'); await has('hBot53', '5′-TACGTATCGCAT-3′');
      await painted('helixCanvas'); await noOverflow('sarmal');
      await type('atgx'); await has('hStatus', '4. konumdaki "X"'); await has('hN', '12 bç'); await type('AUG'); await has('hStatus', 'RNA');
      await type(''); await has('hStatus', 'Dizi boş'); await type('A'.repeat(121)); await has('hStatus', '121 baz'); await type('A'); await has('hN', '1 bç'); await has('hRatio', 'A/T = 1.000 · G/C = —');
      await click('hPGC'); await has('hTmG', '72.3 °C'); await has('hTmW', '80.0 °C (geçerli değil'); await has('hHB', '60'); await has('hTurns', '2.0 tur');
      await click('hPAT'); await has('hSingle', 'A/T = 1.222'); await has('hSingle', 'G ve C yok'); await has('hTmG', '31.3 °C'); await has('hGC', '0.0 %');
      await click('hPEco'); await has('hStatus', 'palindrom'); await has('hBot53', '5′-GAATTC-3′'); await has('hTmW', '16.0 °C');
      await has('hTmG', '— (geçerli değil: N < 14'); ok(!/[−-]\d/.test(await read('hTmG')), 'GC formülü eksi değer göstermez');
      await click('hPRand'); await has('hN', '30 bç'); await has('hStatus', 'Chargaff kuralı sağlanıyor');
      await type('ACGT'.repeat(30)); await has('hN', '120 bç'); await painted('helixCanvas'); await noOverflow('120 baz');
      await click('helixReset'); await has('hN', '12 bç'); await has('hHB', '29');

      // 02 · Çatal
      await click('tab-fork'); await has('fFragTh', '10'); await has('fPrimTh', '11'); await has('fTforkTh', '10.00 s'); await has('fStatus', 'Hazır'); await has('fFrag', '0');
      await painted('forkCanvas'); await painted('forkChart'); await noOverflow('çatal');
      await click('fFinish'); await has('fFrag', '10'); await has('fPrim', '11'); await has('fMean', '1000.0 nt'); await has('fTfork', '10.00 s'); await has('fNick', '2 primer · 0 çentik');
      await has('fStatus', 'fark 0'); await has('fStatus', '11.01 s'); await has('fLag', '10000 nt'); await has('fStart', 'Baştan oynat');
      await range('fEll', 300); await has('fFragTh', '34'); await has('fFrag', '0'); await click('fFinish'); await has('fFrag', '34'); await has('fPrim', '35');
      await range('fV', 100); await has('fTforkTh', '100 s'); await click('fFinish'); await has('fFrag', '34'); await has('fTfork', '100 s');
      await click('forkReset'); await check('fJit', true); await has('fFragThLabel', 'Beklenen'); await click('fFinish'); await has('fFrag', '10'); await has('fMean', '1043.1 nt');
      await click('fWrong'); await has('fStatus', 'Olmaz'); await has('fStatus', '3′-OH');
      await click('forkReset'); await select('fMult', '20'); await click('fStart'); await has('fStart', 'Duraklat');
      await page.waitForFunction(() => document.getElementById('fStatus').textContent.startsWith('Bitti'), null, { timeout: 8000 });
      await has('fFrag', '10'); await has('fStart', 'Baştan oynat');
      await range('fL', 2000); await range('fEll', 2000); await click('fFinish'); await has('fFrag', '1'); await has('fMean', 'henüz'); await range('fL', 20000); await range('fEll', 100); await click('fFinish'); await has('fFrag', '200');
      await click('forkReset'); await has('fLOut', '10000 nt'); await has('fFrag', '0');

      // 03 · Meselson–Stahl
      await click('tab-ms'); await has('mBands', '0.500 (melez) · 100.0 %'); await has('mObs', 'uyuyor'); await has('mCount', '64 molekül'); await has('mHeavy', '50.00 %');
      await painted('msCanvas'); await painted('msChart'); await noOverflow('ms');
      await click('mNext'); await has('mGenOut', '2. nesil'); await has('mBands', '0.500 (melez) · 50.0 %  |  0.000 (hafif) · 50.0 %'); await has('mDiff', '0.00 yüzde puan'); await has('mObs', 'uyuyor');
      await select('mModel', 'cons'); await range('mGen', 1); await has('mBands', '1.000 (ağır) · 50.0 %'); await has('mObs', 'uymuyor');
      await select('mModel', 'disp'); await has('mObs', 'uyuyor'); await range('mGen', 2); await has('mBands', '0.250 (arada) · 100.0 %'); await has('mObs', 'uymuyor'); await has('mStatus', 'dağılıyor');
      await check('mDen', true); await select('mModel', 'semi'); await range('mGen', 1); await has('mBands', '1.000 (ağır) · 50.0 %  |  0.000 (hafif) · 50.0 %'); await has('mObs', 'çift iplik');
      await range('mGen', 0); await check('mDen', false); await has('mObs', '0. nesil'); await range('mGen', 4); await has('mObs', 'yalnız 1. ve 2.'); await has('mBands', '0.000 (hafif) · 87.5 %');
      await select('mGuess', 'semi'); await has('mStatus', 'Kararın doğru'); await select('mGuess', 'disp'); await has('mStatus', 'Kararını sına');
      await select('mN0', '128'); await has('mCount', '2048 molekül');
      await click('msReset'); await has('mGenOut', '1. nesil'); await has('mCount', '64 molekül');

      // 04 · Hata ve onarım
      await click('tab-err'); await has('eExp', '0.00460 hata / kopya'); await has('eMean', '0.00600'); await has('eZero', '99.4 %'); await has('eZeroTh', '99.5 %'); await has('eRate', '10⁻⁹');
      await painted('errChart'); await noOverflow('hata');
      await has('mutKind', 'anlamsız'); await has('mutLen', '9 → 3 amino asit'); await has('mutChanged', '7 / 10'); await has('mutStatus', 'TGG → TGA');
      await check('eProof', false); await check('eMMR', false); await has('eExp', '46.0 hata / kopya'); await has('eRate', '10⁻⁵ (polimeraz 10⁻⁵)');
      await check('eProof', true); await check('eMMR', true); await select('eGenome', '6000000000'); await has('eExp', '6.00 hata / kopya');
      await select('eGenome', 'custom'); await range('eLogG', 10); await range('eBase', -3); await check('eProof', false); await check('eMMR', false); await has('eCopies', 'azaltıldı'); await has('eExp', '10⁷ hata');
      await range('eLogG', 3); await range('eBase', -6); await check('eProof', true); await check('eMMR', true); await has('eVar', 'tanımsız'); await has('eStatus', 'Hiç hata');
      await select('mutType', 'ins'); await range('mutPos', 4); await range('mutN', 1); await has('mutKind', 'çerçeve kayması'); await has('mutFrame', '+1 kaydı');
      await range('mutN', 3); await has('mutKind', 'çerçeve içi ekleme'); await has('mutChanged', '1 (hizalanarak'); await has('mutLen', '9 → 10'); await select('mutType', 'del'); await range('mutN', 1); await has('mutFrame', '−1 kaydı');
      await select('mutType', 'sub'); await range('mutPos', 9); await select('mutBase', 'C'); await has('mutKind', 'sessiz'); await range('mutPos', 3); await select('mutBase', 'A'); await has('mutKind', 'başlangıç kodonu kayboldu'); await has('mutStatus', 'ATG → ATA'); await has('mutStatus', 'Ile');
      for (const q of [1, 2]) { await range('mutPos', q); await select('mutBase', 'C'); await has('mutKind', 'başlangıç kodonu kayboldu'); }
      await range('mutPos', 4); await select('mutBase', 'C'); await has('mutKind', 'yanlış anlamlı'); await range('mutPos', 10); await has('mutKind', 'yanlış anlamlı'); await has('mutStatus', 'TGG → CGG');
      await select('mutType', 'del'); await range('mutPos', 1); await range('mutN', 3); await has('mutKind', 'çerçeve içi silme'); await has('mutStatus', 'başlangıç kodonu bozuldu'); await range('mutPos', 4); ok(!(await read('mutStatus')).includes('başlangıç'), 'ATG korunursa uyarı yok'); await select('mutType', 'sub');
      await range('mutPos', 28); await select('mutBase', 'C'); await has('mutKind', 'dur kodonu kayboldu'); await range('mutPos', 30); await has('mutPosOut', '30. baz');
      await click('errReset'); await has('eExp', '0.00460'); await has('mutKind', 'anlamsız');

      // Klavye
      await page.locator('#tab-err').focus(); await page.keyboard.press('Home'); ok((await page.locator('#tab-helix').getAttribute('aria-selected')) === 'true', 'Home');
      await page.keyboard.press('ArrowRight'); ok((await page.locator('#tab-fork').getAttribute('aria-selected')) === 'true', 'ArrowRight');
      await page.keyboard.press('End'); ok((await page.locator('#tab-err').getAttribute('aria-selected')) === 'true', 'End');
      await page.keyboard.press('ArrowRight'); ok((await page.locator('#tab-helix').getAttribute('aria-selected')) === 'true', 'sarma'); ok(await page.locator('#panel-fork').isHidden(), 'öteki paneller gizli');
      await page.keyboard.press('ArrowRight'); await range('fEll', 500); await page.locator('h1').click(); await page.keyboard.press('r'); await has('fEllOut', '1000 nt');
      await page.keyboard.press('Space'); await has('fStart', 'Duraklat'); await page.keyboard.press('Space'); await has('fStart', 'Başlat');
      await page.locator('#fEll').focus(); await page.keyboard.press('r'); await has('fStart', 'Başlat');
      await noOverflow('son'); assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      await ctx.close();
    }
    console.log(`G dna-replikasyon: ${checks - before} arayüz kontrolü (390 px açık + 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
