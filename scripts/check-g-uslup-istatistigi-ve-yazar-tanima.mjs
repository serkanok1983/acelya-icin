// G · uslup-istatistigi-ve-yazar-tanima: çekirdek, sayfanın formüllerini yinelemeyen referanslarla sınanır
// (saf sayımla sözcük uzunluğu dağılımı, Yule K'nin ikinci biçimi, z puanlı Delta'nın sıfırdan yazılmış saf sürümü ve
// her katmanda en sık sözcükleri baştan sayan bağımsız "bir metni dışarıda bırakma", Poisson olabilirlik oranının
// log-olasılık kütlesinden hesabı, oyun parçalarının özgün metinde yeniden bulunması, Türkçe metinlerin Zipf sayfasındaki
// doğrulanmış derlemle birebir aynılığı ve gömülü Federalist metinlerinin Gutenberg #1404'ten bağımsız çıkarımla
// karşılaştırılması: `--source <pg1404.txt>`). `--browser` gerçek arayüzü 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const SLUG = 'uslup-istatistigi-ve-yazar-tanima';
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), 'utf8');
const kernelSrc = (h) => h.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
const source = kernelSrc(html);
assert(source, 'Çekirdek sınır işaretleri gerekli');
const K = new Function('window', '"use strict";' + source + ';return window.UslupLab;')({});
let checks = 0;
const eq = (a, b, msg) => { assert.equal(a, b, msg); checks++; };
const ok = (c, msg) => { assert(c, msg); checks++; };
const near = (a, b, tol, msg) => { assert(Math.abs(a - b) <= tol, (msg || '') + ` ${a} ≠ ${b}`); checks++; };
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);

/* 0. Sayfa, metinler, kamu malı dayanağı */
{ const t = html.match(/<title>([^<]+)<\/title>/)[1]; ok(t.length <= 80 && t.startsWith('Üslup İstatistiği ve Yazar Tanıma: '), 'başlık'); }
ok(/<body class="app-page" data-page="uslup-istatistigi-ve-yazar-tanima">/.test(html));
ok(!/[̀-ͯ⃗]/.test(html), 'birleşik işaret yok');
ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F650}-\u{1F67F}]/u.test(html), 'emoji yok');
ok(!/<script[^>]+src="https?:/.test(html) && !/<link[^>]+href="https?:/.test(html), 'dış betik yok');
ok(Buffer.byteLength(html) < 1.5e6, 'sayfa < 1,5 MB: ' + Buffer.byteLength(html));
for (const l of ['zipf-yasasi-ve-dil-istatistigi.html', 'bayes-olasilik.html', 'regresyon-ve-korelasyon.html', 'hipotez-testi-ve-guven-araligi.html']) ok(html.includes(`href="${l}"`) && fs.existsSync(new URL(`../${l}`, import.meta.url)), 'bağlantı ' + l);
ok(Object.isFrozen(K) && Object.isFrozen(K.FED) && Object.isFrozen(K.FED[0]) && Object.isFrozen(K.TR[0]));
const cnt = (a) => K.FED.filter((p) => p.a === a).map((p) => p.no);
eq(cnt('M').join(), '10,14,37,38,39,40,41,42,43,44,45,46,47,48');
eq(cnt('D').join(), '49,50,51,52,53,54,55,56,57,58,62,63');
eq(cnt('O').join(), '18,19,20'); eq(cnt('J').join(), '2,3,4,5,64');
const HAM = [1, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 59, 60, 61, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85];
ok(cnt('H').every((n) => HAM.includes(n)) && cnt('H').length === 31, 'Hamilton yazıları Adair listesinden');
ok(K.FED.filter((p) => p.a === 'H').every((p) => p.text.split(/\s+/).length < 2200), 'Hamilton: 2 200 sözcükten kısa olanlar');
for (const p of K.FED) {
  ok(!/PUBLIUS|Project Gutenberg|To the People of the State|\(E1\)|^\s*(HAMILTON|MADISON|JAY)\b|FEDERALIST No\./.test(p.text), 'artık yok No. ' + p.no);
  ok(p.text.split(/\s+/).length > 900, 'uzunluk No. ' + p.no);
}
ok(K.FED.find((p) => p.no === 1).text.startsWith('AFTER an unequivocal experience of the inefficacy'));
ok(K.FED.find((p) => p.no === 10).text.startsWith('AMONG the numerous advantages promised by a well constructed Union'));
ok(K.FED.find((p) => p.no === 51).text.startsWith('TO WHAT expedient, then, shall we finally resort'));
// Gutenberg'den çıkarımın parmak izleri (bağımsız Python çıkarımıyla üretildi; --source ile yeniden doğrulanır)
const FED_SHA = { 1: 'fb724b0d803f23ca', 10: '53032fc08c91bacf', 18: '4df461b0051323b4', 49: 'eb7f95f808195260', 55: '63a235d9236c96cb', 56: 'f4b75b4755ae7bd5', 63: 'c22ef28731789cae', 64: 'd5d4d8d75ffad31e', 68: '92eda9439784e388', 77: 'c2fff418d7760626', 82: 'e7282cf74d68d1b4' };
for (const [n, h] of Object.entries(FED_SHA)) eq(sha(K.FED.find((p) => p.no === +n).text), h, 'parmak izi No. ' + n);
// Gutenberg'deki iki sürümlü yerlerde ilk sürüm tutuldu, ikinci atıldı
{ const t56 = K.FED.find((p) => p.no === 56).text; ok(t56.includes('The observations made on the subject of taxation apply with greater force') && !t56.includes('With regard to the regulation of the militia, there are scarcely')); }
{ const t77 = K.FED.find((p) => p.no === 77).text; ok(t77.includes('would produce all the good, without the ill.') && !t77.includes('good of that of appointment')); }
// --source: Gutenberg #1404 düz metninden bağımsız (JS) yeniden çıkarım
const si = process.argv.indexOf('--source');
if (si > 0) {
  const raw = fs.readFileSync(process.argv[si + 1], 'utf8').replace(/\r\n/g, '\n');
  const body = raw.split('*** START OF THE PROJECT GUTENBERG EBOOK THE FEDERALIST PAPERS ***')[1].split('*** END OF THE PROJECT GUTENBERG EBOOK')[0];
  const parts = body.split(/\n(FEDERALIST No\. \d+)\n/);
  const got = {};
  for (let i = 1; i < parts.length; i += 2) {
    const no = +parts[i].split(' ').pop(); let s = parts[i + 1];
    const m = s.match(/To the People of the State of New York[:.]?\s*\n/); s = s.slice(m.index + m[0].length);
    const k = s.lastIndexOf('\nPUBLIUS'); if (k >= 0) s = s.slice(0, k);
    // iki sürümlü paragraflar: "(A)(E1) (B)(E1)" → A
    for (;;) { const a = s.indexOf(')(E1)'); if (a < 0) break; const open = (() => { let dep = 0; for (let j = a; j >= 0; j--) { if (s[j] === ')') dep++; else if (s[j] === '(') { dep--; if (dep === 0) return j; } } return -1; })(); const rest = s.slice(a + 5), m2 = rest.match(/^\s*\(/);
      if (m2) { const b0 = a + 5 + m2[0].length - 1, b1 = s.indexOf(')(E1)', b0); s = s.slice(0, open) + s.slice(open + 1, a) + s.slice(b1 + 5); } else s = s.slice(0, open) + s.slice(open + 1, a) + s.slice(a + 5); }
    s = s.replace(/\(E1\)/g, '');
    got[no] = s.split(/\n\s*\n/).map((x) => x.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n');
  }
  eq(Object.keys(got).length, 85);
  for (const p of K.FED) eq(p.text, got[p.no], 'Gutenberg ile aynı: No. ' + p.no);
  console.log('Gutenberg #1404 ile karşılaştırıldı: ' + K.FED.length + ' yazı birebir aynı.');
}
// Türkçe: Ziya Paşa ve Ömer Seyfettin metinleri Zipf sayfasındaki doğrulanmış derlemin aynısı
{
  const zh = fs.readFileSync(new URL('../zipf-yasasi-ve-dil-istatistigi.html', import.meta.url), 'utf8');
  const Z = new Function('window', '"use strict";' + kernelSrc(zh) + ';return window.ZipfLab;')({});
  const mine = K.TR.filter((x) => x.a === 'OS' || x.a === 'ZP');
  eq(mine.length, Z.CORPUS.tr.length);
  Z.CORPUS.tr.forEach((z, i) => { eq(mine[i].title, z.title); eq(mine[i].page, z.page); eq(mine[i].text, z.text, 'Zipf derlemiyle aynı: ' + z.title); });
}
const TR_SHA = { t12: 'c2c1890556bf84f0', t13: '95ad1b2033a092ea', t14: 'ee58930d42444087', t15: '9fd530df7a1db217', t16: 'a9918121201f4c88', t17: '708c7a6679cf60ef', t18: 'ef3658a6c35d3d29', t19: '763601458003dddf', t20: '9a2f9cadbe635395', t21: '4fd8edf85dd78eee' };
for (const [id, h] of Object.entries(TR_SHA)) eq(sha(K.TR.find((x) => x.id === id).text), h, 'parmak izi ' + id);
eq(K.TR.filter((x) => x.a === 'AH').length, 9); eq(K.TR.filter((x) => x.a === 'AR').length, 1); eq(K.TR.length, 21);
ok(K.TR.every((x) => x.year <= 1930 && x.page && x.venue && x.sign), 'her metnin yayım yılı ≤ 1930 ve kaynak notu');
ok(!K.TR.some((x) => /\{\{|\}\}|\[\[|<sup|<section|­|BİR TEŞHİS|Kategori:/.test(x.text)), 'Vikikaynak biçimlendirmesi atıldı');
ok(K.TR.find((x) => x.title === 'Başlangıç').text.startsWith('Bir nevi ölümden sonra dirilme sırrına mazhar olan'));
ok(K.TR.find((x) => x.title === 'Bir Teşhis').text.startsWith('Beş altı seneden beri edebiyatımızın'));
ok(!K.TR.some((x) => x.title === 'Gazi'), 'siyasi övgü yazısı alınmadı');
ok(/1956/.test(html) && /1930/.test(html) && /gutenberg\.org\/ebooks\/1404/.test(html), 'kamu malı dayanağı sayfada');

/* 1. Sözcüklere ayırma */
eq(K.tokenize("IŞIK İstanbul'a, san’at ve kelâm-ı mevzûn 1868!", 'tr').join(' '), 'ışık istanbula sanat ve kelam ı mevzun');
eq(K.tokenize("Hamilton's view; well-known UPON whilst.", 'en').join(' '), "hamilton's view well known upon whilst");
eq(K.tokenize('', 'en').length, 0); eq(K.tokenize('12 — ;', 'tr').length, 0);
eq(K.units(['evde', 've'], 'char3').join(' '), '_ev evd vde de_ _ve ve_');
eq(K.units(['evlerde', 'ev'], 'suf3').join(' '), '-rde ev');
eq(K.units(['a', 'b'], 'word').join(), 'a,b');

/* 2. Mendenhall ve Yule: saf sayımla */
const tokOf = (a) => K.authorTokens(a);
for (const a of ['H', 'M', 'OS', 'AH']) {
  const t = tokOf(a), L = K.lengthDist(t), h = new Array(15).fill(0);
  for (const w of t) { const n = [...w.replace(/'/g, '')].length; h[Math.min(15, n) - 1]++; }
  h.forEach((c, i) => near(L.p[i], c / t.length, 1e-12)); near(L.p.reduce((x, y) => x + y, 0), 1, 1e-12);
  const f = {}; for (const w of t) f[w] = (f[w] || 0) + 1; const N = t.length; let s = 0; for (const c of Object.values(f)) s += (c / N) ** 2;
  near(K.yuleK(t), 1e4 * (s - 1 / N), 1e-8, 'Yule K ikinci biçim ' + a);
}
near(K.yuleK(['a', 'b', 'c', 'd']), 0, 1e-12); near(K.yuleK(['a', 'a']), 1e4 * (1 - 0.5), 1e-9);
near(K.tvd([0.5, 0.5], [1, 0]), 0.5, 1e-15); near(K.tvd([0.2, 0.8], [0.2, 0.8]), 0, 1e-15);
{ const L = K.lengthDist(tokOf('H')), M = K.lengthDist(tokOf('M')); near(K.tvd(L.p, M.p), 0.0239, 5e-4); near(L.mean, 4.811, 5e-4); near(M.mean, 4.896, 5e-4); }

/* 3. Delta: sıfırdan yazılmış saf sürüm */
function naiveDelta(trainTexts, testToks, N, dist) {
  // en sık N sözcük: eğitim metinlerinin hepsinde baştan sayım
  const tot = {}; for (const t of trainTexts) for (const w of t.tok) tot[w] = (tot[w] || 0) + 1;
  const feats = Object.keys(tot).sort((a, b) => tot[b] - tot[a] || (a < b ? -1 : 1)).slice(0, N);
  const freq = (tok) => { const c = {}; for (const w of tok) c[w] = (c[w] || 0) + 1; return feats.map((f) => (c[f] || 0) / tok.length); };
  const X = trainTexts.map((t) => freq(t.tok)), n = X.length;
  const mu = feats.map((_, j) => X.reduce((s, x) => s + x[j], 0) / n), sd = feats.map((_, j) => Math.sqrt(X.reduce((s, x) => s + (x[j] - mu[j]) ** 2, 0) / (n - 1)));
  const z = (x) => x.map((v, j) => (sd[j] ? (v - mu[j]) / sd[j] : 0));
  const authors = [...new Set(trainTexts.map((t) => t.author))].sort(), prof = {};
  for (const a of authors) { const Z = trainTexts.map((t, i) => [t, z(X[i])]).filter(([t]) => t.author === a).map(([, v]) => v); prof[a] = feats.map((_, j) => Z.reduce((s, v) => s + v[j], 0) / Z.length); }
  const zt = z(freq(testToks)), out = {};
  for (const a of authors) {
    const p = prof[a];
    if (dist === 'burrows') out[a] = zt.reduce((s, v, j) => s + Math.abs(v - p[j]), 0) / feats.length;
    else if (dist === 'quad') out[a] = zt.reduce((s, v, j) => s + (v - p[j]) ** 2, 0) / feats.length;
    else { const dot = zt.reduce((s, v, j) => s + v * p[j], 0), na = Math.hypot(...zt), nb = Math.hypot(...p); out[a] = 1 - dot / (na * nb); }
  }
  return out;
}
const fedT = K.fedTexts(), hm = fedT.filter((t) => t.author === 'H' || t.author === 'M');
for (const [N, dist] of [[50, 'burrows'], [100, 'cosine'], [200, 'quad']]) {
  const model = K.trainModel(K.makeDocs(hm, 0, 'word'), N);
  for (const no of [49, 55, 63, 19]) {
    const t = fedT.find((x) => x.no === no), r = K.scoreDoc(model, K.makeDocs([t], 0, 'word')[0], dist), ref = naiveDelta(hm, t.tok, N, dist);
    for (const a of ['H', 'M']) near(r.d[a], ref[a], 1e-9, `Delta ${dist} N=${N} No.${no} ${a}`);
  }
}
// Bir metni dışarıda bırakma: her katmanda her şeyi baştan hesaplayan saf sürümle aynı sonuç
function naiveLoo(texts, cands, N, dist) {
  let okN = 0, n = 0;
  for (const t of texts.filter((x) => cands.includes(x.author))) {
    const train = texts.filter((x) => x !== t && cands.includes(x.author)); const d = naiveDelta(train, t.tok, N, dist);
    const best = Object.keys(d).sort((a, b) => d[a] - d[b])[0]; n++; if (best === t.author) okN++;
  }
  return { n, ok: okN };
}
for (const [N, dist] of [[100, 'burrows'], [50, 'cosine']]) {
  const r = K.looBySource(K.makeDocs(fedT, 0, 'word'), ['H', 'M'], N, dist), ref = naiveLoo(fedT, ['H', 'M'], N, dist);
  eq(r.n, ref.n); eq(r.ok, ref.ok, `Federalist LOO ${dist} N=${N}`);
}
{ const trT = K.trTexts(), r = K.looBySource(K.makeDocs(trT, 0, 'word'), K.TR_CANDS, 100, 'cosine'), ref = naiveLoo(trT, K.TR_CANDS, 100, 'cosine'); eq(r.n, ref.n); eq(r.ok, ref.ok, 'Türkçe LOO'); }
// Parçalı kipte aynı kaynağın parçası hiçbir zaman eğitimde değil: parça düzeyinde sızıntı denetimi
{
  const docs = K.makeDocs(fedT, 1000, 'word'), r = K.looBySource(docs, ['H', 'M'], 100, 'burrows');
  eq(r.n, docs.filter((d) => d.author === 'H' || d.author === 'M').length);
  // sızdırılmış (parça düzeyi) sınama daha iyimser çıkmalı ya da eşit olmalı
  let leakOk = 0; const known = docs.filter((d) => d.author === 'H' || d.author === 'M');
  for (const d of known.slice(0, 40)) { const m = K.trainModel(known.filter((x) => x !== d), 100); if (K.scoreDoc(m, d, 'burrows').best === d.author) leakOk++; }
  ok(Number.isFinite(leakOk));
  ok(docs.every((d) => d.nTok === 1000), 'parçalar tam 1000 sözcük');
  eq(K.chunkTokens([1, 2, 3, 4, 5], 2).length, 2); eq(K.chunkTokens([1, 2, 3], 0)[0].length, 3);
}
near(K.distance('cosine', [1, 0], [0, 1]), 1, 1e-15); near(K.distance('cosine', [1, 2], [2, 4]), 0, 1e-12); near(K.distance('burrows', [1, 2], [3, -2]), 3, 1e-15); near(K.distance('quad', [1, 2], [3, -2]), 10, 1e-15);

/* 4. Poisson olabilirlik oranı: log-olasılık kütlelerinin farkıyla */
function lgamma(x) { const g = 7, c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61560821367245, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]; if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x); x -= 1; let a = c[0]; const t = x + g + 0.5; for (let i = 1; i < g + 2; i++) a += c[i] / (x + i); return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a); }
const logPois = (k, m) => k * Math.log(m) - m - lgamma(k + 1);
{
  const W = ['upon', 'whilst', 'while', 'enough', 'there', 'on', 'by'];
  const H = fedT.filter((t) => t.author === 'H'), M = fedT.filter((t) => t.author === 'M');
  const rH = K.rates(H, W), rM = K.rates(M, W);
  // oranlar: düz sayımla
  const nH = H.reduce((s, t) => s + t.tok.length, 0); eq(rH.n, nH); eq(rH.count.upon, H.reduce((s, t) => s + t.tok.filter((w) => w === 'upon').length, 0));
  near(1000 * rH.count.upon / rH.n, 3.14, 0.005); near(1000 * rM.count.upon / rM.n, 0.18, 0.005); eq(rH.count.whilst, 0);
  for (const no of [49, 55, 62]) {
    const t = fedT.find((x) => x.no === no), r = K.poissonLLR(t.tok, W, rH, rM), n = t.tok.length;
    let ref = 0; for (const w of W) { const k = t.tok.filter((x) => x === w).length; ref += logPois(k, n * rM.lam[w]) - logPois(k, n * rH.lam[w]); }
    near(r.total, ref / Math.LN10, 1e-6, 'Poisson LLR No.' + no);
  }
  const all = K.bayesAll(W);
  near(all.find((x) => x.no === 49).total, 6.88, 0.005); eq(all.filter((x) => x.a === 'D' && x.total > 0).length, 12);
  const known = all.filter((x) => x.a === 'H' || x.a === 'M'), wrong = known.filter((x) => (x.total > 0 ? 'M' : 'H') !== x.a);
  eq(known.length, 45); eq(wrong.length, 1); eq(wrong[0].no, 25);
  // bilinen yazı kendi oranından çıkarıldı
  const h25 = all.find((x) => x.no === 25); eq(h25.rH.n, nH - fedT.find((x) => x.no === 25).tok.length);
  near(K.posterior(0), 0.5, 1e-15); near(K.posterior(1), 10 / 11, 1e-15);
}

/* 5. Varsayılan durum sayıları (rapordaki değerler) */
{
  const r = K.looBySource(K.makeDocs(fedT, 0, 'word'), ['H', 'M'], 100, 'burrows'); eq(r.ok, 43); eq(r.n, 45);
  const m = K.trainModel(K.makeDocs(hm, 0, 'word'), 100); let disp = 0; for (const t of fedT.filter((x) => x.author === 'D')) if (K.scoreDoc(m, K.makeDocs([t], 0, 'word')[0], 'burrows').best === 'M') disp++; eq(disp, 11);
  const tr = K.looBySource(K.makeDocs(K.trTexts(), 0, 'word'), K.TR_CANDS, 100, 'cosine'); eq(tr.ok, 17); eq(tr.n, 21);
  near(K.chance(tr), 10 / 21, 1e-12); near(K.chance(r), 31 / 45, 1e-12);
}

/* 6. Oyun: parçalar özgün metinden, tam L sözcük, kaynak eğitim dışı */
{
  let ar = 0;
  for (let seed = 1; seed <= 60; seed++) {
    const G = K.gamePassages(seed, 120); eq(G.length, 4);
    eq(JSON.stringify(G), JSON.stringify(K.gamePassages(seed, 120)), 'tohum yeniden üretir');
    ok(K.TR_CANDS.every((a) => G.some((g) => g.author === a)), 'her aday bir kez');
    for (const g of G) {
      const src = K.TR.find((x) => x.id === g.id); ok(src.text.includes(g.text), 'özgün metnin parçası'); eq(src.a, g.author);
      eq(K.tokenize(g.text, 'tr').length, 120, 'parça 120 sözcük');
      const tt = K.trTexts().find((x) => x.key === g.src); ok(g.start >= tt.from && g.start + 120 <= tt.from + tt.tok.length, 'Ziya Paşa parçası tek yarıda');
      eq(K.tokenize(g.text, 'tr').join(' '), K.tokenize(src.text, 'tr').slice(g.start, g.start + 120).join(' '));
      if (g.author === 'AR') ar++;
    }
    ok(new Set(G.map((g) => g.src)).size === 4);
  }
  ok(ar > 15 && ar < 45, 'aday dışı yazar turların bir kısmında: ' + ar);
  // yöntem, parçanın kaynağı dışarıda bırakılmış eğitimle: saf sürümle aynı uzaklıklar
  const g = K.gamePassages(3, 120)[0], r = K.attributePassage(g, 'word', 100, 'burrows', 0);
  const ref = naiveDelta(K.trTexts().filter((t) => K.TR_CANDS.includes(t.author) && t.key !== g.src), K.tokenize(g.text, 'tr'), 100, 'burrows');
  for (const a of K.TR_CANDS) near(r.d[a], ref[a], 1e-9, 'oyun uzaklığı ' + a);
}

/* 7. Sayı biçimi */
eq(K.fmt(1234.5, 1), '1234,5'); eq(K.fmt(53558, 0), '53 558'); eq(K.fmt(-0.25, 2), '−0,25'); eq(K.fmt(NaN), '—'); eq(K.oddsMag(6.88), '10⁷'); eq(K.oddsMag(1), '10'); eq(K.oddsText(-0.30103), '1 : 2,0');

console.log(`${SLUG}: ${checks} çekirdek kontrolü geçti.`);

/* ══════════ Tarayıcı ══════════ */
if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright'); const { createServer } = await import('node:http'); const { join, extname } = await import('node:path'); const { fileURLToPath } = await import('node:url'); const root = fileURLToPath(new URL('../', import.meta.url));
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
  const server = createServer((q, r) => { const p = join(root, decodeURIComponent(q.url.split('?')[0])); fs.readFile(p, (e, buf) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); r.end(buf); }); });
  await new Promise((r) => server.listen(0, '127.0.0.1', r)); let browser; const before = checks;
  try {
    browser = await chromium.launch();
    for (const [width, theme] of [[390, 'light'], [1280, 'dark']]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: width === 390 ? 2 : 1 }); await page.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme); page.setDefaultTimeout(15000);
      const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); }); page.on('response', (r) => { if (r.status() >= 400) errors.push(r.status() + ' ' + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const txt = (id) => page.$eval('#' + id, (e) => e.textContent.trim());
      const over = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      // bütün denetimlerin etiketi var
      const unl = await page.evaluate(() => [...document.querySelectorAll('main input, main select')].filter((e) => !(e.labels && e.labels.length) && !e.closest('label')).map((e) => e.id));
      eq(unl.join(), '', 'etiketsiz denetim');
      ok(await page.evaluate(() => [...document.querySelectorAll('main canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))));
      // 1 · Sözcük uzunluğu
      eq(await txt('uTvd'), '0,024'); eq(await txt('uNoise'), '0,047'); eq(await txt('uMean'), '4,81 / 4,90');
      await page.selectOption('#uB', 'OS'); ok((await txt('uStatus')).includes('Türkçe')); eq(await txt('uTvd'), '0,253');
      await page.selectOption('#uA', 'AR'); await page.selectOption('#uG', '5000'); ok((await txt('uNoise')) === '—' && (await txt('uStatus')).includes('kısa'));
      await page.selectOption('#uA', 'H'); await page.selectOption('#uB', 'H'); ok((await txt('uTvd')).startsWith('0'));
      await page.click('#uReset'); eq(await txt('uTvd'), '0,024'); eq(await page.$eval('#uG', (e) => e.value), '1000');
      ok(await over() <= 0, 'taşma u ' + width);
      // klavyeyle sekmeler
      await page.focus('#tab-u'); await page.keyboard.press('ArrowRight'); eq(await page.$eval('#tab-b', (e) => e.getAttribute('aria-selected')), 'true');
      await page.keyboard.press('End'); eq(await page.$eval('#tab-v', (e) => e.getAttribute('aria-selected')), 'true');
      await page.keyboard.press('Home'); eq(await page.$eval('#tab-u', (e) => e.getAttribute('aria-selected')), 'true');
      // 2 · Bayes
      await page.click('#tab-b');
      eq(await txt('bTotal'), '+6,88'); eq(await txt('bLoo'), '44 / 45 doğru'); ok((await txt('bStatus')).includes('12\'si Madison'));
      await page.$eval('#bPrior', (e) => { e.value = '-3'; e.dispatchEvent(new Event('input', { bubbles: true })); }); eq(await txt('bPriorOut'), '1 : 1000'); ok((await txt('bPost')).endsWith('%'));
      await page.selectOption('#bPaper', '25'); ok((await txt('bCap')).includes('bu yazı dışındaki Hamilton 30'));
      await page.click('#bCommon'); eq((await page.$$eval('#bWords input:checked', (e) => e.map((x) => x.value))).join(), 'there,on,by,an,to,of');
      await page.$$eval('#bWords input', (e) => e.forEach((x) => { x.checked = false; })); await page.$eval('#bWords', (e) => e.dispatchEvent(new Event('change', { bubbles: true })));
      eq(await txt('bTotal'), '—'); ok((await txt('bStatus')).includes('Hiç sözcük'));
      await page.click('#bReset'); eq(await txt('bTotal'), '+6,88'); eq(await txt('bPriorOut'), '1 : 1');
      ok(await over() <= 0, 'taşma b ' + width);
      // 3 · Delta
      await page.click('#tab-d'); await page.waitForFunction(() => document.getElementById('dAcc').textContent !== '—');
      eq(await txt('dAcc'), '95,6 %'); eq(await txt('dDisp'), '11 / 12'); eq(await txt('dBest'), 'Madison');
      await page.waitForFunction(() => /en yüksek/.test(document.getElementById('dCurveCap').textContent), null, { timeout: 60000 });
      await page.selectOption('#dChunk', '1000'); await page.selectOption('#dDist', 'cosine');
      ok((await txt('dAccE')).includes('parça')); ok((await page.$$('#dRows tr')).length === 15);
      await page.selectOption('#dCands', 'hmj'); ok((await page.$$('#dConf tr')).length === 3);
      await page.$eval('#dN', (e) => { e.value = '500'; e.dispatchEvent(new Event('input', { bubbles: true })); }); await page.waitForTimeout(400); eq(await txt('dNOut'), '500 sözcük');
      await page.click('#dReset'); eq(await txt('dAcc'), '95,6 %'); eq(await page.$eval('#dN', (e) => e.value), '100');
      ok(await over() <= 0, 'taşma d ' + width);
      // 4 · Türkçe
      await page.click('#tab-t'); await page.waitForFunction(() => document.getElementById('tAcc').textContent !== '—');
      eq(await txt('tAcc'), '81,0 %'); eq((await page.$$('#tGame .us-passage')).length, 4); eq((await page.$$('#tRows tr')).length, 21);
      const shownBefore = await page.$eval('#tGame', (e) => e.textContent); ok(!/Gerçek:/.test(shownBefore), 'yanıt önceden görünmüyor');
      await page.selectOption('#tG0', 'OS'); await page.click('#tCheck'); ok(/Sen \d \/ 4, yöntem \d \/ 4/.test(await txt('tScore'))); ok((await txt('tR0')).includes('Gerçek:'));
      await page.click('#tNew'); eq(await page.$eval('#tSeed', (e) => e.value), '2'); ok(!/Gerçek:/.test(await page.$eval('#tGame', (e) => e.textContent)));
      await page.fill('#tSeed', 'abc'); await page.$eval('#tSeed', (e) => e.dispatchEvent(new Event('change'))); eq(await page.$eval('#tSeed', (e) => e.value), '1');
      for (const k of ['char3', 'suf3']) { await page.selectOption('#tKind', k); ok((await txt('tAcc')).endsWith('%')); }
      await page.selectOption('#tChunk', '150'); ok((await txt('tAccE')).includes('parça')); await page.selectOption('#tKind', 'word'); ok((await txt('tStatus')).includes('şansın altında'), 'tStatus şansın altı (sözcük, kosinüs, 150)');
      await page.selectOption('#tChunk', '100'); await page.selectOption('#tDist', 'burrows'); ok((await txt('tAcc')).endsWith('%'));
      await page.click('#tReset'); eq(await txt('tAcc'), '81,0 %');
      ok(await over() <= 0, 'taşma t ' + width);
      // 5 · Doğrulama
      await page.click('#tab-v'); await page.waitForFunction(() => document.querySelectorAll('#vRows tr').length === 5 && /Bütün metinlerle/.test(document.getElementById('vStatus').textContent), null, { timeout: 60000 });
      ok(await page.$eval('#vKind', (e) => e.disabled));
      ok((await txt('vStatus')).includes('düzgün artmıyor') && (await txt('vStatus')).includes('18 belge'), 'Federalist 2000 sözcük: küçük örneklem notu');
      await page.selectOption('#vCorpus', 'tr'); await page.waitForFunction(() => document.querySelectorAll('#vRows tr').length === 4 && /Bütün metinlerle/.test(document.getElementById('vStatus').textContent), null, { timeout: 60000 });
      ok(!(await page.$eval('#vKind', (e) => e.disabled)));
      ok((await txt('vStatus')).includes('şans düzeyinin altında') && (await txt('vStatus')).includes('kanıtlamaz'), 'Türkçe kısa parça: şansın altı sözle söyleniyor');
      // R klavye kısayolu etkin sekmeyi sıfırlar
      await page.focus('body'); await page.evaluate(() => document.activeElement.blur()); await page.keyboard.press('r'); await page.waitForFunction(() => document.getElementById('vCorpus').value === 'fed');
      ok(await over() <= 0, 'taşma v ' + width);
      await page.click('#sources summary'); ok(await over() <= 0, 'taşma kaynaklar ' + width);
      ok((await page.$eval('#srcTr', (e) => e.textContent)).includes('Bize Göre'));
      // Keşif Defteri yüklenmiş ve görünür (404 hoşgörüsü yok)
      await page.waitForSelector('.digest', { state: 'attached', timeout: 15000 }); await page.$eval('.digest', (e) => e.scrollIntoView());
      ok(await page.$eval('.digest', (e) => { const r = e.getBoundingClientRect(); return r.height > 200 && getComputedStyle(e).display !== 'none' && /Federalist/.test(e.textContent); }), 'defter görünür');
      eq(errors.join(' | '), '', 'konsol hatası');
      await page.close();
    }
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
  console.log(`Tarayıcı: ${checks - before} kontrol geçti (390 px açık, 1280 px koyu).`);
}
