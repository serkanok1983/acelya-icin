// G · zipf-yasasi-ve-dil-istatistigi: çekirdek, sayfanın formüllerini yinelemeyen referanslarla sınanır
// (saf sayımla sıklık tablosu, tam kuvvet yasasında kapalı biçimli eğim, olabilirliğin ızgarada kaba kuvvetle en büyüğü,
// ζ(2) = π²/6 ve doğrudan toplamla Hurwitz zeta, bilinen β ile üretilmiş kesikli kuvvet yasası örneği, küçük metinde
// bütün permütasyonların sayımıyla ve Monte Carlo karıştırmayla beklenen dağarcık, bağsız Spearman formülü,
// Li'nin ln(k + 1)/ln k sonucu, log n! ile lgamma). `--browser` gerçek arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const SLUG = 'zipf-yasasi-ve-dil-istatistigi';
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'Çekirdek sınır işaretleri gerekli');
const K = new Function('window', '"use strict";' + source + ';return window.ZipfLab;')({});
let checks = 0;
const eq = (a, b, msg) => { assert.equal(a, b, msg); checks++; };
const ok = (c, msg) => { assert(c, msg); checks++; };
const near = (a, b, tol, msg) => { assert(Math.abs(a - b) <= tol, (msg || '') + ` ${a} ≠ ${b}`); checks++; };

/* 0. Sayfa ve metinler */
ok(Object.isFrozen(K) && Object.isFrozen(K.CORPUS) && Object.isFrozen(K.CORPUS.tr[0]));
{ const t = html.match(/<title>([^<]+)<\/title>/)[1]; ok(t.length <= 80 && t.startsWith('Zipf Yasası ve Dil İstatistiği: '), 'başlık'); }
ok(!/[̀-ͯ]/.test(html), 'birleşik işaret yok');
ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F650}-\u{1F67F}]/u.test(html), 'emoji ya da süs işareti yok');
ok(!/<script[^>]+src="https?:/.test(html) && !/<link[^>]+href="https?:/.test(html), 'dış betik yok');
eq(K.CORPUS.tr.length, 11); eq(K.CORPUS.en.length, 5);
eq(K.CORPUS.tr.map((s) => s.title).join('|'), 'Şiir ve İnşâ|Tenezzüh|Kır Sineği|Buse-i Mader|Bir Refikin Defter-i İhtisasatından|Hediye...|Pembe Menekşe|Gizli Mâbed|Yüksek Ökçeler|Diyet|Yuf Borusu Seni Bekliyor'); eq(K.CORPUS.tr.filter((s) => s.author === 'Ömer Seyfettin').length, 10); eq(K.CORPUS.tr[0].author, 'Ziya Paşa'); ok(K.CORPUS.tr.every((s) => s.page && s.text.length > 500));
eq(K.CORPUS.en[0].title, 'The Happy Prince'); eq(K.CORPUS.en[4].title, 'The Remarkable Rocket');
{ const bytes = Buffer.byteLength(JSON.stringify(K.CORPUS)); ok(bytes < 300000, 'gömülü metin < 300 KB: ' + bytes); }
ok(!/Project Gutenberg|START OF THE/i.test(K.corpusText('en')), 'Gutenberg başlığı atılmış');
ok(K.CORPUS.tr[0].text.startsWith('Çünkü mahsûl ve tahsîl') && K.CORPUS.tr[9].text.startsWith('Dar kapısından başka aydınlık') && !/Dadaruh|Raif Efendi|Sabahattin|\u00ad/.test(K.corpusText('tr')) && !/[{}]{2}|Kategori/.test(K.corpusText('tr')));

/* 1. Sözcüklere ayırma ve sayım: saf sayımla */
eq(K.tokenize("IŞIK İstanbul'a, 2026'da gitti — Hasan'la!", 'tr').join(' '), "ışık istanbul'a da gitti hasan'la");
eq(K.tokenize('Dîvan sincâbî Hûn', 'tr').join(' '), 'divan sincabi hun');
eq(K.tokenize("I can't see the Prince's ruby; well-known.", 'en').join(' '), "i can't see the prince's ruby well known");
eq(K.tokenize('', 'tr').length, 0); eq(K.tokenize('123 !!!', 'en').length, 0);
const naive = (us) => { const o = {}; for (const u of us) o[u] = (o[u] || 0) + 1; return o; };
for (const lang of ['tr', 'en']) {
  const tok = K.tokenize(K.corpusText(lang), lang);
  for (const unit of ['form', 'stem', 'pre5', 'bigram']) {
    const us = K.units(tok, unit, lang), T = K.freqTable(us), c = naive(us);
    eq(T.V, Object.keys(c).length); eq(T.N, us.length); eq(T.hapax, Object.values(c).filter((x) => x === 1).length);
    ok(T.words.every((w, i) => c[w] === T.f[i]), 'sayım ' + lang + unit); ok(T.f.every((x, i) => i === 0 || T.f[i - 1] >= x), 'azalan');
  }
}
{ const T = K.freqTable(['b', 'a', 'c', 'a', 'b', 'd']); eq(T.words.join(''), 'bacd'); eq(T.f.join(), '2,2,1,1'); }
{ const tr = K.freqTable(K.tokenize(K.corpusText('tr'), 'tr')), en = K.freqTable(K.tokenize(K.corpusText('en'), 'en'));
  eq(tr.N, 9473); eq(tr.V, 4770); eq(tr.hapax, 3575); eq(tr.words.slice(0, 5).join(' '), 'bir ve bu i ne'); eq(tr.f[0], 338);
  eq(en.N, 16278); eq(en.V, 2170); eq(en.words.slice(0, 4).join(' '), 'the and a to'); }
eq(K.units(['a', 'b', 'c'], 'bigram', 'tr').join('|'), 'a b|b c');
// Ek kesici: belgelenen davranışlar (doğrular ve bilinen yanlışlar)
for (const [w, st] of [['gözlerini', 'göz'], ['geldiler', 'gel'], ['çocuklar', 'çocuk'], ['ağaçları', 'ağaç'], ["hasan'la", 'hasan'], ['bakarak', 'bak'], ['yapacağım', 'yap'], ['gibi', 'gib'], ['dedi', 'ded'], ['evlerinden', 'evler'], ['kitabı', 'kitab'], ['adam', 'adam'], ['ev', 'ev']]) eq(K.stemTr(w).stem, st, 'gövde ' + w);
{ const r = K.stemTr('gözlerinden'); eq(r.stem, 'göz'); eq(r.steps.join(), 'lerinden'); }
for (const w of K.freqTable(K.tokenize(K.corpusText('tr'), 'tr')).words) { const r = K.stemTr(w); ok(w.startsWith(r.stem) && r.stem.length >= 1 && (w.includes("'") || r.steps.length === 0 || r.stem.length >= 3), 'gövde önek ' + w); }
eq(K.stemTr("i'tisaf").stem, 'i'); // belgelenen yanılgı: Osmanlıca ayın işareti de kesme sayılır
for (const [w, st] of [['princes', 'prince'], ["swallow's", 'swallow'], ['cities', 'city'], ['flying', 'fly'], ['looked', 'look'], ['glass', 'glass'], ['quickly', 'quick']]) eq(K.stemEn(w).stem, st, 'İng. ' + w);
eq(K.prefix5("hasan'la"), 'hasan'); eq(K.prefix5('ağaçları'), 'ağaçl');

/* 2. Uydurmalar */
// Tam kuvvet yasası: eğim tam, R² = 1
for (const a of [0.5, 1, 1.7]) { const f = Array.from({ length: 300 }, (_, i) => 1000 * (i + 1) ** -a); const o = K.fitOLS(f); near(o.alpha, a, 1e-12); near(o.r2, 1, 1e-12); near(o.c, Math.log(1000), 1e-9); const o2 = K.fitOLS(f, 10, 50); near(o2.alpha, a, 1e-12); eq(o2.n, 41); }
// Gürültülü veride: merkezlenmiş toplamlarla bağımsız regresyon
{ let s = 7; const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; const f = Array.from({ length: 200 }, (_, i) => Math.max(1, Math.round(5000 * (i + 1) ** -1.1 * (0.6 + 0.8 * r()))));
  const xs = f.map((_, i) => Math.log(i + 1)), ys = f.map(Math.log), mx = xs.reduce((a, b) => a + b) / 200, my = ys.reduce((a, b) => a + b) / 200;
  const b = xs.reduce((a, x, i) => a + (x - mx) * (ys[i] - my), 0) / xs.reduce((a, x) => a + (x - mx) ** 2, 0); near(K.fitOLS(f).alpha, -b, 1e-10); }
eq(K.fitOLS([5, 3]), null); { const o = K.fitOLS([4, 0, 2, 1]); eq(o.n, 3); }
// MLE: ızgarada doğrudan log-olabilirliğin en büyüğü
const llRank = (f, a, r0, r1) => { let Z = 0, M = 0, S = 0; for (let r = r0; r <= r1; r++) { Z += r ** -a; M += f[r - 1]; S += f[r - 1] * Math.log(r); } return -a * S - M * Math.log(Z); };
for (const [f, r0, r1] of [[K.freqTable(K.tokenize(K.corpusText('en'), 'en')).f, 1, 461], [K.freqTable(K.tokenize(K.corpusText('tr'), 'tr')).f, 1, 251], [[50, 20, 0, 9, 7, 3, 3, 1, 0, 1], 1, 10], [[50, 20, 12, 9, 7, 3, 3, 1, 1, 1], 3, 8]]) {
  const m = K.fitRankMLE(f, r0, r1); let best = -Infinity, ba = 0; for (let a = 0.05; a < 3; a += 0.0005) { const l = llRank(f, a, r0, r1); if (l > best) { best = l; ba = a; } }
  near(m.alpha, ba, 6e-4, 'MLE ızgara'); near(m.logL, llRank(f, m.alpha, r0, r1), 1e-6); ok(m.logL >= best - 1e-9);
  // SE: ikinci türevin sayısal hesabı
  const h = 1e-4, d2 = (llRank(f, m.alpha + h, r0, r1) - 2 * m.logL + llRank(f, m.alpha - h, r0, r1)) / h / h; near(m.se, 1 / Math.sqrt(-d2), 1e-3 * m.se + 1e-6);
}
eq(K.fitRankMLE([3, 2], 1, 2), null);
{ const T = K.freqTable(K.tokenize(K.corpusText('tr'), 'tr')); const r5 = T.f.filter((x) => x >= 5).length; eq(r5, 251); near(K.fitRankMLE(T.f, 1, r5).alpha, 0.781, 5e-4); near(K.fitOLS(T.f, 1, r5).alpha, 0.749, 5e-4); near(K.fitOLS(T.f).alpha, 0.570, 5e-4); }
// Hurwitz zeta
near(K.hurwitz(2, 1), Math.PI ** 2 / 6, 1e-12); near(K.hurwitz(4, 1), Math.PI ** 4 / 90, 1e-13);
for (const [b, q] of [[1.5, 3], [2.3, 7], [3.1, 1]]) { let s = 0; for (let k = 0; k < 2e6; k++) s += (q + k) ** -b; s += (q + 2e6) ** (1 - b) / (b - 1); near(K.hurwitz(b, q), s, 1e-8, 'ζ'); }
// Kesikli kuvvet yasası: bilinen β ile üretilen örnek (ters dağılımla, doğrudan toplamla)
function plSample(beta, xmin, n, seed) { const R = K.rng(seed), cdf = []; let s = 0; const Z = K.hurwitz(beta, xmin); for (let x = xmin; x < xmin + 200000; x++) { s += x ** -beta / Z; cdf.push(s); } return Array.from({ length: n }, () => { const u = R(); let lo = 0, hi = cdf.length - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (cdf[m] < u) lo = m + 1; else hi = m; } return xmin + lo; }); }
for (const [beta, seed] of [[2.5, 1], [2.0, 2], [3.0, 3]]) { const xs = plSample(beta, 1, 4000, seed), m = K.plMLE(xs, 1); near(m.beta, beta, 4 * (beta - 1) / Math.sqrt(4000), 'β ' + beta);
  let best = -Infinity, bb = 0; const sl = xs.reduce((a, x) => a + Math.log(x), 0); for (let b = 1.5; b < 3.6; b += 0.0005) { const l = -b * sl - xs.length * Math.log(K.hurwitz(b, 1)); if (l > best) { best = l; bb = b; } } near(m.beta, bb, 6e-4);
  const c = K.fitCSN(xs.slice().sort((a, b) => b - a)); ok(c && Math.abs(c.beta - beta) < 0.2, 'CSN β ' + c.beta); ok(c.D < 0.05); }
{ const xs = [1, 1, 1, 2, 2, 3, 5], beta = 2.2, Z = K.hurwitz(beta, 1); let D = 0; for (let x = 1; x <= 6; x++) { const emp = xs.filter((v) => v >= x).length / xs.length; let mod = 0; for (let k = x; k < 3e5; k++) mod += k ** -beta; mod += (3e5) ** (1 - beta) / (beta - 1); D = Math.max(D, Math.abs(emp - mod / Z)); } near(K.plKS(xs, 1, beta), D, 1e-6, 'KS'); }

/* 3. Yapay Zipf ve yanlılık */
{ const cdf = K.zipfCdf(1, 1000); near(cdf[999], 1, 1e-12); let H = 0; for (let r = 1; r <= 1000; r++) H += 1 / r; near(cdf[0], 1 / H, 1e-12);
  const c = K.sampleZipf(1, 1000, 50000, 3, cdf); eq(c.reduce((a, b) => a + b, 0), 50000); const p = 1 / H; near(c[0] / 50000, p, 4 * Math.sqrt(p * (1 - p) / 50000)); const p2 = 1 / H / 2; near(c[1] / 50000, p2, 4 * Math.sqrt(p2 * (1 - p2) / 50000)); }
{ const R = K.synRepeat(1, 10000, 10, 1); ok(Math.abs(R.oracle.bias) < 0.01, 'kâhin yansız'); ok(R.olsAll.bias < -0.3, 'EKK tümü yanlı'); ok(R.mleAll.bias < -0.08); ok(Math.abs(R.mleF5.bias) < 0.03); ok(R.mleF5.rmse < R.olsF5.rmse); eq(R.oracle.n, 10); }
{ const R = K.synRepeat(1.3, 10000, 5, 1); ok(Math.abs(R.mleF5.bias) < 0.03 && Math.abs(R.oracle.bias) < 0.01); }
{ const F = K.synFits(K.sampleZipf(1, K.SYN_V, 10000, 1), 1); eq(F.V, 3879); eq(F.hapax, 3000); eq(F.r5, 230); near(F.olsAll, 0.616, 5e-4); near(F.mleF5, 0.987, 5e-4); }

/* 4. Heaps ve beklenen dağarcık */
{ const us = 'a b a c b a d e a b'.split(' '), g = K.vocabGrowth(us, [1, 2, 3, 4, 5, 10]); eq(g.map((x) => x[1]).join(), '1,2,2,3,3,5'); }
for (let n = 1; n <= 20; n++) { const fact = Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b, 1); near(Math.exp(K.lgamma(n + 1)), fact, 1e-10 * fact, 'lgamma ' + n); }
near(K.lgamma(101), [...Array(100)].reduce((a, _, i) => a + Math.log(i + 1), 0), 1e-9);
// Küçük metin: bütün permütasyonlar
{ const toks = ['a', 'a', 'a', 'b', 'b', 'c', 'd'], N = toks.length, f = [3, 2, 1, 1];
  const perms = (arr) => arr.length <= 1 ? [arr] : arr.flatMap((x, i) => perms([...arr.slice(0, i), ...arr.slice(i + 1)]).map((p) => [x, ...p]));
  const P = perms(toks); for (let n = 1; n <= N; n++) { const avg = P.reduce((a, p) => a + new Set(p.slice(0, n)).size, 0) / P.length; near(K.expectedV(f, N, n), avg, 1e-9, 'E[V] ' + n); } }
{ const us = K.units(K.tokenize(K.corpusText('en'), 'en'), 'form', 'en'), T = K.freqTable(us), R = K.rng(9), n = 1600; let s = 0; const reps = 60;
  for (let k = 0; k < reps; k++) { const a = us.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } s += new Set(a.slice(0, n)).size; }
  near(K.expectedV(T.f, T.N, n), s / reps, 8, 'Monte Carlo karıştırma'); }
{ const c = []; for (let n = 1; n <= 1e5; n *= 2) c.push([n, Math.round(3 * n ** 0.7)]); const h = K.fitHeaps(c, 100); near(h.beta, 0.7, 2e-3); near(h.K, 3, 0.05); }
{ const us = K.units(K.tokenize(K.corpusText('tr'), 'tr'), 'form', 'tr'), h = K.fitHeaps(K.vocabGrowth(us), 100); near(h.beta, 0.892, 5e-4); }

/* 5. Kısalma ve Spearman */
for (let t = 0; t < 50; t++) { const R = K.rng(t + 1), n = 5 + Math.floor(R() * 40), idx = Array.from({ length: n }, (_, i) => i), x = idx.map(() => R()), y = idx.map(() => R());
  const rk = (v) => { const s = v.map((a, i) => [a, i]).sort((a, b) => a[0] - b[0]), r = []; s.forEach(([, i], j) => { r[i] = j + 1; }); return r; }; const rx = rk(x), ry = rk(y);
  near(K.spearman(x, y), 1 - 6 * rx.reduce((a, r, i) => a + (r - ry[i]) ** 2, 0) / (n * (n * n - 1)), 1e-12, 'Spearman'); }
near(K.spearman([1, 2, 2, 3], [4, 3, 3, 1]), -1, 1e-12); eq(K.avgRanks([5, 1, 5, 3]).join(), '3.5,1,3.5,2');
{ const B = K.brevity(K.freqTable(['aaa', 'b', 'b', 'b', 'cc', 'cc'])); eq(B.classes.map((c) => `${c.lo}-${c.hi}:${c.n}:${c.mean}`).join(' '), '1-1:1:3 2-3:2:1.5'); near(B.tokenMean, (3 + 3 + 4) / 6, 1e-12); near(B.typeMean, 2, 1e-12); }

/* 6. Maymun */
for (const k of [2, 5, 26, 29]) near(K.monkeyAlpha(k, 1 / (k + 1)), Math.log(k + 1) / Math.log(k), 1e-12, 'Li');
near(K.monkeyAlpha(26, 0.2), 1.0685, 1e-4);
{ const st = K.monkeySteps(3, 0.25, 1e9); let s = 0; st.forEach((x) => { s += (x.r1 - x.r0 + 1) * x.p; }); near(s, 1 - 0.75 ** st.length, 1e-9); eq(st.at(-1).L, st.length); eq(st[0].r0, 1); eq(st[0].r1, 3); eq(st[1].r0, 4); eq(st[1].r1, 12); }
for (const [k, q] of [[5, 0.2], [26, 0.3]]) { const t = K.monkey({ k, q, N: 40000, seed: 2 }); eq(t.length, 40000); ok(t.every((w) => w.length > 0 && [...w].every((c) => K.ABC.slice(0, k).includes(c))));
  const one = t.filter((w) => w.length === 1).length / t.length; near(one, q, 4 * Math.sqrt(q * (1 - q) / 40000), 'tek harfli sözcük payı'); const mean = t.reduce((a, w) => a + w.length, 0) / t.length; near(mean, 1 / q, 0.05 / q); }
{ const L = K.letterStats(K.tokenize(K.corpusText('en'), 'en')); eq(L.letters.length, 26); near(L.meanLen, 3.998, 1e-3); near(L.p.reduce((a, b) => a + b, 0), 1, 1e-12); eq(L.letters.slice(0, 4).join(''), 'etao');
  const t = K.monkey({ q: 0.25, N: 20000, seed: 1, letterP: L }); const c = naive(t.join('').split('')), tot = t.join('').length; near(c.e / tot, L.p[0], 0.01); }
{ const T = K.freqTable(K.monkey({ k: 26, q: 0.2, N: 15000, seed: 1 })); eq(T.V, 10175); eq(T.words.slice(0, 3).join(' '), 'l a e'); }
{ const s1 = K.splitHalf(['a', 'b', 'a', 'c', 'a', 'b'], 5); eq(s1.NA + s1.NB, 6); eq(s1.fA.reduce((a, b) => a + b, 0), s1.NA); ok(s1.fB.reduce((a, b) => a + b, 0) <= s1.NB); }

console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright'); const { createServer } = await import('node:http'); const { join, extname } = await import('node:path'); const { fileURLToPath } = await import('node:url'); const root = fileURLToPath(new URL('../', import.meta.url));
  const { canvasInkAll, assertCanvasDrawn } = await import('./lib/canvas-check.mjs');
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, '127.0.0.1', r)); let browser; const before = checks;
  assert(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`, import.meta.url)), 'defter dosyası var olmalı'); // defter yazıldı: 404 artık hata
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [['light', 390], ['dark', 1280]]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: width === 390 ? 2 : 1 }); await page.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme); page.setDefaultTimeout(8000);
      const errors = []; page.on('pageerror', (e) => errors.push(e.message));
      page.on('response', (r) => { if (r.status() >= 400) errors.push(r.status() + ' ' + r.url()); });
      page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      ok(await page.waitForFunction(() => { const d = document.querySelector('.digest'); return d && d.getBoundingClientRect().height > 0 && d.textContent.includes('Kâhin'); }, null, { timeout: 8000 }).then(() => true), 'defter görünür');
      const norm = (s) => s.replace(/ /g, ' ');
      const txt = async (id) => norm(await page.locator('#' + id).textContent());
      const is = async (id, v) => { await page.waitForFunction(([i, x]) => document.getElementById(i)?.textContent.replace(/ /g, ' ') === x, [id, v], { timeout: 6000 }).catch(() => {}); eq(await txt(id), v, id); };
      const has = async (id, v) => { await page.waitForFunction(([i, x]) => document.getElementById(i)?.textContent.replace(/ /g, ' ').includes(x), [id, v], { timeout: 6000 }).catch(() => {}); const t = await txt(id); ok(t.includes(v), `${id}: "${t.slice(0, 200)}" içinde "${v}" yok`); };
      const set = async (id, v) => { await page.evaluate(([i, x]) => { const e = document.getElementById(i); if (e.type === 'checkbox') e.checked = !!x; else e.value = String(x); e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); }, [id, v]); };
      const click = (id) => page.locator('#' + id).click();
      const fits = async () => { eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'yatay taşma'); };
      const inked = async (t) => { for (const st of await canvasInkAll(page, `#panel-${t} canvas`)) assertCanvasDrawn(st, { minInk: 400, minDistinct: 4, label: st.id }), checks++; };
      eq(await page.evaluate(() => [...document.querySelectorAll('main input, main select, main textarea')].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id).join()), '', 'etiketsiz denetim');
      eq(await page.evaluate(() => [...document.querySelectorAll('main canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), true);
      eq(await page.evaluate(() => typeof window.ZipfLab.fitRankMLE === 'function' && Object.isFrozen(window.ZipfLab)), true);
      // 01 · Sıklık ve sıra
      await is('zN', '9473'); await is('zV', '4770'); await is('zHap', '3575'); await is('zMle', '0,781 ± 0,010'); await is('zOls', '0,749'); await is('zCsn', '0,666');
      await has('zMleE', 'sıra 1–251'); await has('zCsnE', 'β = 2,501'); eq(await page.locator('#zTopRows tr').count(), 20); await has('zTopRows', 'bir338338');
      await has('zCmpRows', 'Türkçe · gövde94732933'); await has('zCmpRows', 'İngilizce · biçim16 2782170'); await has('zCmpStatus', 'ilk 9473 sözcükte Türkçe 4770, İngilizce 1573'); await has('zCmpStatus', '3,0 kat'); eq(await page.locator('#zStemRows tr').count(), 8);
      await is('zProbeOut', 'gözlerinden → göz + lerinden  (1 kesim)'); await set('zProbe', 'Yapacağım'); await is('zProbeOut', 'yapacağım → yap + acağ + ım  (2 kesim)'); await set('zProbe', '!!'); await has('zProbeOut', 'Bir sözcük yaz');
      await set('zFmin', '1'); await is('zOls', '0,570'); await is('zMle', '0,706 ± 0,005'); await has('zStatus', '3575 hapaks'); await has('zStatus', 'yatıştırıyor (0,681 → 0,570)');
      await set('zUnit', 'stem'); await is('zV', '2933'); await set('zUnit', 'bigram'); await has('zStatus', 'Sözcük çiftlerinin'); await set('zUnit', 'form'); await set('zFmin', '5');
      await set('zText', 'en'); await is('zN', '16 278'); await is('zMle', '0,882 ± 0,005'); await is('zOls', '1,005');
      await set('zFmin', '1'); await is('zOls', '1,111'); await has('zStatus', 'dikleştiriyor (1,077 → 1,111)'); await set('zFmin', '5'); await is('zOls', '1,005');
      await set('zSplit', true); await has('zStatus', 'İkiye bölmede'); await is('zCsn', '—'); eq(await page.locator('#zSeed').isDisabled(), false); await has('zTopHead', 'f (B)');
            await set('zText', 'own'); eq(await page.locator('#zOwnBox').isVisible(), true); await is('zN', '—'); await has('zStatus', 'Metin boş');
      await set('zOwn', 'kedi köpek kuş '.repeat(5)); await has('zStatus', 'yalnız 15 sözcük');
      { const abc = 'abcdefghij'; const words = []; for (const a of abc) for (const b of abc) words.push('k' + a + b); await set('zOwn', words.join(' ')); await is('zN', '100'); await is('zMle', '—'); await has('zStatus', 'kestirilemez'); await is('zHap', '100'); }
      await set('zSplit', false); await set('zOwn', K.CORPUS.tr[0].text); eq(K.tokenize(K.CORPUS.tr[0].text, 'tr').length, 1813); await is('zN', '1813'); await has('zNe', 'senin metnin');
      await inked('z');
      // Kendi metin Heaps sekmesinde üçüncü çizgi
      await click('tab-h'); await page.waitForTimeout(200); eq(await page.locator('#hRows tr').count(), 3); await click('tab-z');
      await click('zReset'); await is('zN', '9473'); await is('zMle', '0,781 ± 0,010'); eq(await page.locator('#zOwnBox').isVisible(), false); await fits();
      await page.locator('#tab-z').focus(); await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-s').getAttribute('aria-selected'), 'true');
      // 02 · Yapay veri
      await has('sRows', 'En küçük kareler, bütün sıralar0,6160,609 ± 0,006−0,391'); await has('sRows', 'En çok olabilirlik, f ≥ 50,9870,985 ± 0,009−0,015'); await has('sRows', 'Kâhin: gerçek sıralarla1,0021,000 ± 0,0030,000');
      await has('sCap', 'Gözlenen 3879 farklı'); await has('sStatus', 'En çok olabilirlik, f ≥ 5'); await is('sAlphaOut', '1,00');
      await set('sAlpha', 0.6); await set('sN', '100000'); await set('sReps', '10'); await has('sStatus', 'fazla dik'); await has('sRows', 'bütün sıralar0,'); 
      await set('sAlpha', 1.3); await is('sAlphaOut', '1,30'); await has('sTableCap', 'Gerçek α = 1,30');
      await set('sN', '1000'); await has('sTableCap', 'N = 1000'); await set('sReps', '10'); await has('sTableCap', 'tohum 1–10');
      await click('sNew'); eq(await page.locator('#sSeed').inputValue(), '2'); await has('sTableCap', 'tohum 2–11');
      await set('sSeed', 'abc'); eq(await page.locator('#sSeed').inputValue(), '1');
      await inked('s'); await click('sReset'); await has('sRows', '0,6160,609 ± 0,006'); await fits();
      // 03 · Heaps
      await click('tab-h'); await page.waitForTimeout(200);
      await has('hRows', 'Türkçe947347700,8921,36'); await has('hRows', 'İngilizce16 27821700,6504,23'); await has('hStatus', 'karıştırılmış metinde beklenen 756,5');
      await has('bRows', 'Türkçe−0,3397,33 harf5,86 harf'); await has('bStatus', ' harf daha uzun');
      await set('hUnit', 'stem'); await has('hRows', 'Türkçe94732933'); await set('hNmin', '1000'); await has('hStatus', 'birim: gövde');
      await inked('h'); await click('hReset'); await has('hRows', '0,892'); await fits();
      // 04 · Maymun
      await click('tab-m'); await page.waitForTimeout(200);
      await has('mRows', 'Farklı sözcük V217010 175'); await has('mRows', 'Kuramsal α (eşit harfli model)—1,068'); await has('mRows', 'Hapaks oranı (türlerde)49,3 %93,1 %'); await has('mStatus', '1,068');
      await set('mMode', 'en'); eq(await page.locator('#mK').isDisabled(), true); await has('mRows', 'tanımsız'); await has('mStatus', 'basamaklar yumuşar'); await has('mStatus', 'o harfin sıklığının'); ok(!(await txt('mStatus')).includes('(1 − q)/k'), 'harf sıklıklı kipte k yok');
      await has('mRows', 'α, f ≥ 5 en çok olabilirlik0,8820,888'); await has('mRows', 'Hapaks oranı (türlerde)49,3 %92,7 %');
      await set('mMode', 'uni'); await set('mCmp', 'tr'); await click('mMatch'); await is('mKOut', '29'); await is('mQOut', '0,17'); await has('mRows', 'Belirteç N9473'); await has('mRows', '0,7810,774 (136 sıra)'); await has('mRows', '74,9 %93,7 %');
      await set('mK', 2); await set('mQ', 0.5); await has('mRows', '—2,000'); await click('mNew'); eq(await page.locator('#mSeed').inputValue(), '2');
      await inked('m'); await click('mReset'); await has('mRows', '10 175'); await fits();
      // R tuşu ve klavye
      await set('mQ', 0.3); await page.locator('h1').click(); await page.keyboard.press('r'); await is('mQOut', '0,20');
      await page.locator('#tab-m').focus(); await page.keyboard.press('Home'); eq(await page.locator('#tab-z').getAttribute('aria-selected'), 'true');
      await page.keyboard.press('End'); eq(await page.locator('#tab-m').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowLeft'); eq(await page.locator('#tab-h').getAttribute('aria-selected'), 'true');
      for (const t of ['s', 'h', 'm', 'z']) { await click('tab-' + t); await page.waitForTimeout(150); await fits(); eq(await page.locator('#panel-' + t).isVisible(), true); await inked(t); }
      assert.deepEqual(errors, []); checks++; await page.close();
    }
    console.log(`G ${SLUG}: ${checks - before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
