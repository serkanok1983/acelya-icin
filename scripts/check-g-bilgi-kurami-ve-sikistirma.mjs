// G · bilgi-kurami-ve-sikistirma: çekirdek, sayfanın formüllerini yinelemeyen referanslarla sınanır
// (doğal logaritmayla entropi, kod uzunluk vektörlerinin Kraft altında kaba kuvvet taranmasıyla en iyi önek kodu,
// harf çiftlerinden doğrudan Σ p(a,b) log p(b|a), aritmetik kodun aralığının kapalı biçimle yeniden kurulması,
// ders kitabı LZ78 örneği, 2ⁿ hata deseninin sayımı, bütün veri × hata çiftleri üzerinden Hamming ortalaması,
// giriş dağılımı ızgarasında karşılıklı bilginin en büyüğü olarak kapasite). `--browser` gerçek arayüzü
// 390 px açık ve 1280 px koyu temada dener.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const SLUG = 'bilgi-kurami-ve-sikistirma';
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'Çekirdek sınır işaretleri gerekli');
const K = new Function('window', '"use strict";' + source + ';return window.InformationLab;')({});
let checks = 0;
const eq = (a, b, msg) => { assert.equal(a, b, msg); checks++; };
const ok = (c, msg) => { assert(c, msg); checks++; };
const near = (a, b, tol, msg) => { assert(Math.abs(a - b) <= tol, (msg || '') + ` ${a} ≠ ${b}`); checks++; };
ok(Object.isFrozen(K) && Object.isFrozen(K.SOURCES));
{ const t = html.match(/<title>([^<]+)<\/title>/)[1]; ok(t.length <= 80 && t.startsWith('Bilgi Kuramı ve Sıkıştırma: '), 'başlık'); }
ok(!/[̀-ͯ]/.test(html), 'birleşik işaret yok');

/* Bağımsız referanslar */
const Hln = (w) => { const s = w.reduce((a, b) => a + b, 0); return -w.filter((x) => x > 0).reduce((a, x) => a + (x / s) * Math.log(x / s), 0) / Math.log(2); };
let lcg = 12345; const rnd = () => { lcg = (Math.imul(lcg, 1103515245) + 12345) >>> 0; return lcg / 4294967296; };

/* 1. Entropi */
for (let n = 1; n <= 40; n++) near(K.entropy(new Array(n).fill(3)), Math.log(n) / Math.log(2), 1e-12);
near(K.h2(0.5), 1, 1e-15); eq(K.h2(0), 0); eq(K.h2(1), 0); near(K.h2(0.1), 0.4689955935892812, 1e-15);
for (let t = 0; t < 200; t++) { const w = Array.from({ length: 1 + Math.floor(rnd() * 8) }, () => Math.floor(rnd() * 20)); if (!w.some((x) => x > 0)) continue; near(K.entropy(w), Hln(w), 1e-12); ok(K.entropy(w) <= Math.log2(w.length) + 1e-12); }
near(K.entropy(K.SOURCES.abcde.w), 2.1219280948873624, 1e-13); near(K.entropy(K.SOURCES.loaded.w), 0.5 + 0.5 * Math.log2(10), 1e-13);
assert.throws(() => K.entropy([0, 0])); assert.throws(() => K.entropy([1, -1])); checks += 2;
// Şaşkınlık ortalaması: 20 tohumda kuramın 4 SE'si içinde; eşit olasılıkta tam H.
for (const key of ['biased', 'loaded', 'abcde']) { const w = K.SOURCES[key].w, H = K.entropy(w), sd = Math.sqrt(K.varentropy(w));
  near(sd ** 2, w.reduce((a, x) => { const p = x / w.reduce((s, y) => s + y, 0); return a + p * Math.log2(p) ** 2; }, 0) - H * H, 1e-12);
  for (let seed = 1; seed <= 20; seed++) { const R = K.sampleSurprise(w, 5000, seed); eq(R.counts.reduce((a, b) => a + b, 0), 5000); near(R.mean, H, 4 * sd / Math.sqrt(5000), key + ' ' + seed); } }
{ const R = K.sampleSurprise([1, 1, 1, 1, 1, 1], 777, 3); near(R.mean, Math.log2(6), 1e-12); eq(R.path.at(-1)[0], 777); }
{ const R = K.sampleSurprise([0, 5, 0, 5], 2000, 1); eq(R.counts[0] + R.counts[2], 0); }

/* 2. Metin: kendi sayımımız, koşullu entropi doğrudan Σ p(a,b) log p(b|a) */
eq(K.normText('İSTANBUL, Iğdır! 2026 rüzgâr', 'tr'), 'istanbul ığdır rüzgar'); eq(K.normText('If It Is', 'en'), 'if it is'); eq(K.normText(' a\n\tb ', 'tr'), 'a b'); eq(K.normText('.,!', 'tr'), '');
for (const [raw, lang] of [[K.SAMPLE_TR, 'tr'], [K.SAMPLE_EN, 'en'], ['abababab', 'tr'], ['aaab', 'tr']]) {
  const t = Array.from(K.normText(raw, lang)), st = K.textStats(t.join('')), c1 = {}, c2 = {}, cf = {};
  t.forEach((x) => { c1[x] = (c1[x] || 0) + 1; });
  for (let i = 0; i + 1 < t.length; i++) { c2[t[i] + '|' + t[i + 1]] = (c2[t[i] + '|' + t[i + 1]] || 0) + 1; cf[t[i]] = (cf[t[i]] || 0) + 1; }
  near(st.H1, Hln(Object.values(c1)), 1e-12); eq(st.K, Object.keys(c1).length); eq(st.Kp, Object.keys(c2).length);
  let hc = 0; const np = t.length - 1; for (const [k, v] of Object.entries(c2)) { const a = k.split('|')[0]; hc -= (v / np) * Math.log2(v / cf[a]); }
  near(st.Hcond, hc, 1e-12, 'koşullu ' + raw.slice(0, 10)); if (t.length > 100) ok(st.Hcond <= st.H1);
}
{ const st = K.textStats(K.normText(K.SAMPLE_TR, 'tr')); eq(st.N, 1362); eq(st.K, 29); near(st.H1, 4.304363, 5e-7); near(st.Hcond, 3.094282, 5e-7); eq(st.symbols[0], ' '); }
{ const st = K.textStats(K.normText(K.SAMPLE_EN, 'en')); eq(st.N, 1161); eq(st.K, 25); near(st.H1, 4.007239, 5e-7); eq(st.symbols.slice(0, 3).join(''), ' et'); }
eq(K.textStats('').H1, null); eq(K.textStats('a').Hcond, null);
// 2 × 2: tanımdan ortak bilgi
for (let t = 0; t < 300; t++) { const v = [0, 0, 0, 0].map(() => Math.floor(rnd() * 30)); if (!v.some((x) => x)) continue; const J = K.joint2x2(...v), s = v.reduce((a, b) => a + b, 0), P = v.map((x) => x / s);
  const px = [P[0] + P[1], P[2] + P[3]], py = [P[0] + P[2], P[1] + P[3]]; let I = 0; [[0, 0, 0], [1, 0, 1], [2, 1, 0], [3, 1, 1]].forEach(([k, i, j]) => { if (P[k] > 0) I += P[k] * Math.log(P[k] / px[i] / py[j]) / Math.LN2; });
  near(J.I, I, 1e-12); ok(J.I >= -1e-12 && J.I <= Math.min(J.HX, J.HY) + 1e-12); near(J.HXY, Hln(v), 1e-12); }
near(K.joint2x2(25, 25, 25, 25).I, 0, 1e-15); near(K.joint2x2(50, 0, 0, 50).I, 1, 1e-15); near(K.joint2x2(45, 5, 5, 45).I, 1 - K.h2(0.1), 1e-14); near(K.joint2x2(72, 8, 18, 2).I, 0, 1e-15);

/* 3. Huffman: Kraft altında bütün uzunluk vektörlerini tarayan kaba kuvvetle en iyi önek kodu */
function bestPrefix(P) { const n = P.length; let best = Infinity; const L = new Array(n);
  const rec = (i, kraft) => { if (kraft > 1 + 1e-12) return; if (i === n) { const v = P.reduce((a, p, j) => a + p * L[j], 0); if (v < best) best = v; return; } for (let l = 1; l <= n; l++) { L[i] = l; rec(i + 1, kraft + 2 ** -l); } };
  rec(0, 0); return best; }
const isPrefixFree = (codes) => { const c = codes.filter((x) => x !== null); for (const a of c) for (const b of c) if (a !== b && b.startsWith(a)) return false; return new Set(c).size === c.length; };
for (let t = 0; t < 150; t++) { const n = 2 + Math.floor(rnd() * 5), w = Array.from({ length: n }, () => 1 + Math.floor(rnd() * 20)), H = K.huffman(w), s = w.reduce((a, b) => a + b, 0), P = w.map((x) => x / s);
  near(H.L, bestPrefix(P), 1e-12, 'Huffman en iyi ' + w); ok(isPrefixFree(H.codes)); near(H.kraft, 1, 1e-12); const Hs = K.entropy(w); ok(H.L >= Hs - 1e-12 && H.L < Hs + 1);
  const msg = Array.from({ length: 50 }, () => Math.floor(rnd() * n)), bits = K.huffEncode(H, msg); eq(K.huffDecode(H, bits).join(), msg.join()); eq(bits.length, msg.reduce((a, i) => a + H.codes[i].length, 0)); }
eq(K.huffman(K.SOURCES.abcde.w).codes.join(), '11,00,01,100,101'); near(K.huffman(K.SOURCES.abcde.w).L, 2.2, 1e-12); eq(K.huffman(K.SOURCES.dyadic.w).codes.join(), '0,10,110,111');
{ const H = K.huffman([0, 7, 0]); eq(H.codes.join(), ',0,'); eq(H.L, 1); eq(H.kraft, 0.5); eq(K.huffDecode(H, '000').join(), '1,1,1'); eq(H.merges.length, 0); }
eq(K.huffDecode(K.huffman([1, 1, 1]), '1'), null);
// Blok kodları: H ≤ Lₖ/k < H + 1/k; kod sayısı ve blok ağırlıkları kaba kuvvetle.
for (const w of [K.SOURCES.biased.w, K.SOURCES.abcde.w, [3, 1, 1], [1, 0, 2]]) { const H = K.entropy(w);
  for (let k = 1; k <= 3; k++) { const B = K.blockCode(w, k); ok(B.ok); ok(B.perSym >= H - 1e-12 && B.perSym < H + 1 / k, `blok ${w} ${k}`); eq(B.size, w.filter((x) => x > 0).length ** k); near(B.H.kraft, 1, 1e-12); } }
near(K.blockCode(K.SOURCES.biased.w, 2).perSym, 0.645, 1e-12); near(K.blockCode(K.SOURCES.biased.w, 3).perSym, 0.5326666666666667, 1e-12);
eq(K.blockCode(new Array(30).fill(1), 4).ok, false);
{ const M = K.blockMeasure(K.SOURCES.biased.w, 2, 12000, 1); near(M.perSym, 0.645, 0.02); eq(M.n, 12000); }

/* 4. Aritmetik kod: aralığı kapalı biçimle yeniden kur, ikili kesrin içinde olduğunu ve uzunluk sınırlarını denetle */
function intervalRef(w, msg) { const c = w.map(BigInt), T = c.reduce((a, b) => a + b, 0n), m = msg.length; let low = 0n, prod = 1n;
  for (let i = 0; i < m; i++) { let cum = 0n; for (let s = 0; s < msg[i]; s++) cum += c[s]; low += cum * prod * T ** BigInt(m - 1 - i); prod *= c[msg[i]]; } return { low, high: low + prod, D: T ** BigInt(m) }; }
for (let t = 0; t < 120; t++) { const n = 2 + Math.floor(rnd() * 5), w = Array.from({ length: n }, () => Math.floor(rnd() * 12)); if (w.filter((x) => x > 0).length < 1) continue;
  const pos = w.map((x, i) => i).filter((i) => w[i] > 0), m = 1 + Math.floor(rnd() * 60), msg = Array.from({ length: m }, () => pos[Math.floor(rnd() * pos.length)]);
  const A = K.arithEncode(w, msg), R = intervalRef(w, msg), b = BigInt(A.nbits), j = BigInt('0b' + A.bits), info = -msg.reduce((a, i) => a + Math.log(w[i] / w.reduce((x, y) => x + y, 0)), 0) / Math.LN2;
  ok(j * R.D >= R.low << b && (j + 1n) * R.D <= R.high << b, 'ikili aralık içeride'); near(A.info, info, 1e-9);
  ok(A.nbits >= info - 1e-9 && A.nbits <= Math.ceil(info - 1e-9) + 1, `uzunluk ${A.nbits} ${info}`); eq(K.arithDecode(w, A.bits, m).join(), msg.join()); }
{ const S = K.SOURCES.abcde, msg = K.sampleIdx(S.w, 40, 1, 7); eq(msg.map((i) => S.labels[i]).join(''), 'ABAAACAABEAADCCBBACEBCABBADAAEAACBAEABBB'); const A = K.arithEncode(S.w, msg); eq(A.nbits, 82); near(A.info, 81.877124, 1e-5); eq(K.huffEncode(K.huffman(S.w), msg).length, 86); }
{ const A = K.arithEncode([1, 0], [0, 0, 0]); eq(A.nbits, 1); eq(K.arithDecode([1, 0], A.bits, 3).join(), '0,0,0'); }
assert.throws(() => K.arithEncode([1, 1], [])); assert.throws(() => K.arithEncode([1, 0], [1])); assert.throws(() => K.arithEncode([0.5, 0.5], [0])); checks += 3;

/* 5. LZ */
{ const b = [...'ABBCBCABABCAABCAAB'].map((c) => c.charCodeAt(0)), t = K.lz78(b);
  eq(t.map(([k, c]) => k + String.fromCharCode(c)).join(' '), '0A 0B 2C 3A 2A 4A 6B'); eq(K.lz78Bits(t), 14 + 56); eq(K.lz78Decode(t).join(), b.join()); }
{ const t = K.lz78([65, 66, 65]); eq(t.map((x) => x.join(':')).join(' '), '0:65 0:66 1:-1'); eq(K.lz78Decode(t).join(), '65,66,65'); }
{ const b = new Array(10).fill(97), t = K.lz77(b, 1024, 15); eq(t.map((x) => x.join(':')).join(' '), '0:0:97 1:8:97'); eq(K.lz77Bits(t.length, 1024, 15), 44); }
const lz77Ref = (toks) => { const out = []; for (const [o, l, c] of toks) { for (let i = 0; i < l; i++) out.push(out[out.length - o]); out.push(c); } return out; };
const inputs = [K.utf8(K.SAMPLE_TR), K.utf8(K.SAMPLE_EN), K.utf8(K.repText(60)), K.randomBytes(1000, 1), K.randomLetters(1000, 2), [7], [], K.utf8('çöğüşı İ ' .repeat(30))];
for (const b of inputs) for (const [W, L] of [[256, 15], [1024, 15], [4096, 255]]) { const t = K.lz77(b, W, L);
  eq(lz77Ref(t).join(), b.join()); eq(K.lz77Decode(t).join(), b.join()); ok(t.every(([o, l, c]) => o >= 0 && o <= W - 1 && l >= 0 && l <= L && c >= 0 && c < 256 && (l === 0) === (o === 0))); eq(K.lz78Decode(K.lz78(b)).join(), b.join()); }
{ const b = K.utf8(K.SAMPLE_TR); eq(b.length, 1543); eq(K.lz77(b, 1024, 15).length, 445); eq(K.lz78(b).length, 566); eq(K.lz78Bits(K.lz78(b)), 9157); near(K.byteStats(b).H1, 4.625817, 5e-7); }
{ const b = K.utf8(K.repText(60)); eq(b.length, 720); eq(K.lz77(b, 1024, 15).length, 54); }
{ const b = K.randomBytes(1000, 1), c = new Array(256).fill(0); b.forEach((x) => c[x]++); near(K.byteStats(b).H1, Hln(c), 1e-12); ok(K.lz77Bits(K.lz77(b, 1024, 15).length, 1024, 15) > 8000); ok(K.lz78Bits(K.lz78(b)) > 8000); }

/* 6. Güvercin yuvası: kaba kuvvet sayım */
for (let n = 1; n <= 12; n++) for (let k = 1; k <= n; k++) { let shorter = 0, shrink = 0; for (let L = 0; L < n; L++) { shorter += 2 ** L; if (L <= n - k) shrink += 2 ** L; }
  const G = K.pigeon(n, k); eq(G.all, BigInt(2 ** n)); eq(G.shorter, BigInt(shorter)); eq(G.canShrink, BigInt(shrink)); ok(G.frac < G.bound); }
eq(K.pigeon(64, 1).all, 18446744073709551616n); assert.throws(() => K.pigeon(4, 5)); checks++;
{ const T = K.pigeonTrial(200, 64, 1, 1024, 15); eq(T.shrunk77, 0); eq(T.shrunk78, 0); ok(T.mean77 > 512 && T.mean78 > 512); }

/* 7. Kanal */
for (const n of [1, 3, 5, 7, 9]) for (const p of [0, 0.01, 0.1, 0.3, 0.5]) { let s = 0; for (let e = 0; e < 2 ** n; e++) { let w = 0; for (let j = 0; j < n; j++) w += (e >> j) & 1; if (w > n / 2) s += p ** w * (1 - p) ** (n - w); } near(K.repTheory(n, p), s, 1e-14, `tekrar ${n} ${p}`); }
near(K.repTheory(3, 0.1), 0.028, 1e-15); near(K.repTheory(25, 0.5), 0.5, 1e-12); assert.throws(() => K.repTheory(4, 0.1)); checks++;
// Hamming: bütün 16 veri × 7 tek hata düzelir; en küçük uzaklık 3; kuram bütün veri × hata çiftlerinin ortalaması.
{ const cw = []; for (let d = 0; d < 16; d++) { const D = [3, 2, 1, 0].map((j) => (d >> j) & 1), c = K.hamEncode(D); cw.push(c); eq(K.hamSyndrome(c), 0);
    for (let e = 0; e < 7; e++) { const r = c.slice(); r[e] ^= 1; const R = K.hamDecode(r); eq(R.s, e + 1); eq(R.d.join(), D.join()); } }
  let dmin = 7; for (let a = 0; a < 16; a++) for (let b = a + 1; b < 16; b++) dmin = Math.min(dmin, cw[a].reduce((s, x, i) => s + (x !== cw[b][i] ? 1 : 0), 0)); eq(dmin, 3);
  eq(K.hamEncode([1, 0, 1, 1]).join(''), '0110011'); }
for (const p of [0.01, 0.1, 0.2, 0.5]) { let ber = 0, blk = 0;
  for (let d = 0; d < 16; d++) { const D = [3, 2, 1, 0].map((j) => (d >> j) & 1), c = K.hamEncode(D);
    for (let e = 0; e < 128; e++) { let w = 0; const r = c.map((x, j) => { const f = (e >> j) & 1; w += f; return x ^ f; }); const P = p ** w * (1 - p) ** (7 - w) / 16, R = K.hamDecode(r), errs = R.d.reduce((s, x, i) => s + (x !== D[i] ? 1 : 0), 0); ber += P * errs / 4; if (errs) blk += P; } }
  const T = K.hamTheory(p); near(T.ber, ber, 1e-14, 'Hamming BER ' + p); near(T.blk, blk, 1e-14); near(T.blk, 1 - (1 - p) ** 7 - 7 * p * (1 - p) ** 6, 1e-14); }
// Kapasite: giriş dağılımı ızgarasında I(X;Y)'nin en büyüğü.
for (const p of [0, 0.02, 0.1, 0.25, 0.4, 0.5]) { let best = 0; for (let i = 0; i <= 1000; i++) { const q = i / 1000, y1 = q * (1 - p) + (1 - q) * p; best = Math.max(best, K.h2(y1) - K.h2(p)); } near(K.capacity(p), best, 1e-6, 'C ' + p); }
for (const [R, p] of [[0.8, 0.1], [4 / 7, 0.1], [0.3, 0.2], [1, 0.05]]) { const pb = K.pbMin(R, p); near(K.h2(pb), 1 - K.capacity(p) / R, 1e-12); }
eq(K.pbMin(1 / 3, 0.1), 0); near(K.pbMin(1, 0.1), 0.1, 1e-12); near(K.pbMin(0.5, 0.5), 0.5, 1e-12);
for (let seed = 1; seed <= 6; seed++) { for (const n of [1, 3, 5]) { const S = K.simRep(n, 0.1, 20000, seed), P = K.repTheory(n, 0.1); near(S.rate, P, 4 * Math.sqrt(P * (1 - P) / 20000), `tekrar ölçüm ${n} ${seed}`); }
  const T = K.hamTheory(0.1), S = K.simHamming(0.1, 20000, seed); near(S.ber, T.ber, 4 * Math.sqrt(T.varErrs / 20000) / 4); near(S.bler, T.blk, 4 * Math.sqrt(T.blk * (1 - T.blk) / 20000)); }
eq(K.simRep(3, 0, 1000, 1).err, 0); eq(K.simHamming(0, 1000, 1).bitErr, 0);
{ const S = K.simRep(3, 0.1, 100000, 1); eq(S.err, 2813); const H = K.simHamming(0.1, 25000, 1); eq(H.bitErr, 6811); }

console.log(`G ${SLUG}: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright'); const { createServer } = await import('node:http'); const { join, extname } = await import('node:path'); const { fileURLToPath } = await import('node:url'); const root = fileURLToPath(new URL('../', import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, '127.0.0.1', r)); let browser; const before = checks;
  // defter yazıldı: 404 artık hata sayılır, defter görünür olmalı
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [['light', 390], ['dark', 1280]]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: width === 390 ? 2 : 1 }); await page.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme); page.setDefaultTimeout(8000);
      const errors = []; page.on('pageerror', (e) => errors.push(e.message));
      page.on('response', (r) => { if (r.status() >= 400) errors.push(r.status() + ' ' + r.url()); });
      page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      await page.waitForSelector('section.digest', { timeout: 8000 }); checks++;
      { const body = await page.evaluate(() => document.querySelector('main').textContent); ok(!/Enigma/.test(body) && !/"ğ"den sonra/.test(body), 'yanlış ğ/Enigma cümlesi'); ok(body.includes('ortalama L yine aynıdır'), 'Huffman tekliği notu'); ok(body.includes('kuramsal bit hatası (128 desen)'), 'Hamming etiketi bit hatası'); }
      const txt = (id) => page.locator('#' + id).textContent();
      const is = async (id, v) => { await page.waitForFunction(([i, x]) => document.getElementById(i)?.textContent === x, [id, v], { timeout: 4000 }).catch(() => {}); eq(await txt(id), v, id); };
      const has = async (id, v) => { await page.waitForFunction(([i, x]) => document.getElementById(i)?.textContent.includes(x), [id, v], { timeout: 4000 }).catch(() => {}); const t = await txt(id); ok(t.includes(v), `${id}: "${t}" içinde "${v}" yok`); };
      const set = async (id, v) => { await page.evaluate(([i, x]) => { const e = document.getElementById(i); e.value = String(x); e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); }, [id, v]); };
      const click = (id) => page.locator('#' + id).click();
      const fits = async () => { eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'yatay taşma'); };
      const inked = async (t) => { const r = await page.evaluate((t) => [...document.querySelectorAll('#panel-' + t + ' canvas')].map((c) => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, bg = d[0] + ',' + d[1] + ',' + d[2]; let ink = 0; const cols = new Set(); for (let i = 0; i < d.length; i += 4) { const k = d[i] + ',' + d[i + 1] + ',' + d[i + 2]; cols.add(k); if (k !== bg) ink++; } return [c.id, ink, cols.size, c.width]; }), t); for (const [id, ink, n, w] of r) ok(w > 0 && ink > 400 && n > 3, `${id} tuvali boş (${ink}, ${n})`); };
      // Etiketler
      eq(await page.evaluate(() => [...document.querySelectorAll('main input, main select, main textarea')].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id).join()), '', 'etiketsiz denetim');
      eq(await page.evaluate(() => [...document.querySelectorAll('main canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), true);
      // 01 · Shannon entropisi
      await is('eH', '2,1610 bit'); await is('eHmax', '2,5850 bit'); await is('eRed', '16,4 %'); await is('eMeas', '2,1631 bit'); await is('eDiff', '+0,18 σ/√N'); await is('ePlug', '2,1628 bit');
      await has('eStatus', 'fark 0,18 standart hata'); await is('eTN', '1362 · 29'); await is('eTH1', '4,304 bit'); await is('eTHc', '3,094 bit'); await is('eTMax', '4,858 bit');
      await is('eJI', '0,5310 bit'); await is('eJHXY', '1,4690 bit'); await is('eJI2', '0,5310 bit');
      await set('eSrc', 'biased'); await is('eH', '0,4690 bit'); await is('eMeas', '0,4674 bit'); await is('eNOut', '2'); eq(await page.locator('#eW3').isVisible(), false);
      await set('eSrc', 'coin'); await is('eH', '1,0000 bit'); await is('eDiff', '0,0000 bit'); await has('eStatus', 'eşit olasılıklı');
      await set('eSrc', 'die'); await is('eH', '2,5850 bit'); await is('eRed', '0,0 %');
      await set('eW1', 5); eq(await page.locator('#eSrc').inputValue(), 'custom'); await is('eWO1', '5');
      for (const id of ['eW1', 'eW2', 'eW3', 'eW4', 'eW5', 'eW6']) await set(id, 0); await is('eH', '—'); await has('eStatus', 'Bütün ağırlıklar sıfır');
      await set('eW4', 3); await is('eH', '0,0000 bit'); await has('eStatus', 'Tek bir sembolün olasılığı 1');
      await set('eSrc', 'tr'); await is('eH', '4,3044 bit'); eq(await page.locator('#eWF').isVisible(), false); await set('eSrc', 'en'); await is('eH', '4,0072 bit');
      await set('eSamples', '100'); await has('eMeasE', 'N = 100 örnek'); await click('eNew'); eq(await page.locator('#eSeed').inputValue(), '2');
      await click('eTxRep'); await is('eTH1', '1,000 bit'); await is('eTHc', '0,000 bit'); await has('eTStatus', 'tamamen kurallı');
      await set('eSrc', 'typed'); await is('eH', '1,0000 bit'); await set('eText', '!!!'); await is('eTH1', '—'); await has('eTStatus', 'Metinde harf yok'); await is('eH', '—'); await has('eStatus', 'Metinde hiç harf yok');
      await click('eTxEn'); await is('eTN', '1161 · 25'); await click('eTxTr');
      await click('eJInd'); await is('eJI', '0,0000 bit'); await has('eJStatus', 'bağımsız'); await click('eJCopy'); await is('eJI', '1,0000 bit'); await is('eJHYX', '0,0000 bit'); await click('eJSkew'); await is('eJI', '0,0000 bit');
      for (const id of ['eJa', 'eJb', 'eJc', 'eJd']) await set(id, 0); await is('eJI', '—'); await has('eJStatus', 'tanımsız');
      await inked('ent'); await click('eReset'); await is('eH', '2,1610 bit'); await is('eMeas', '2,1631 bit'); await is('eJI', '0,5310 bit'); await is('eTH1', '4,304 bit'); eq(await page.locator('#eSrc').inputValue(), 'loaded'); await fits();
      await page.locator('#tab-ent').focus(); await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-huf').getAttribute('aria-selected'), 'true');
      // 02 · Huffman ve aritmetik kodlama
      await is('hH', '2,1219 bit'); await is('hL', '2,2000 bit/sembol'); await is('hGap', '+0,0781 bit'); await is('hKraft', '1,0000'); await is('hMeasL', '2,1981 bit'); await is('hEff', '96,5 %');
      await has('hStatus', '0,0381'); eq(await page.locator('#hRows tr').count(), 5); eq(await page.locator('#hBlocks tr').count(), 3);
      await is('hMsgN', '40'); await is('hBits', '86 bit'); await is('hHn', '84,9 bit'); await is('hInfo', '81,88 bit'); await is('hArBits', '82 bit'); await is('hRT', 'İkisi de aynı'); await is('hStepOut', '4 / 4');
      await click('hFirst'); await is('hStepOut', '0 / 4'); await has('hTreeCap', 'Başlangıç'); await click('hNext'); await is('hStepOut', '1 / 4'); await has('hTreeCap', '"D" ve "E"'); await set('hStep', 4); await has('hTreeCap', 'Ağaç tamam');
      await set('hSrc', 'dyadic'); await is('hGap', '0,0000 bit'); await has('hStatus', 'ikinin kuvveti'); await is('hRT', 'İkisi de aynı');
      await set('hSrc', 'biased'); await is('hL', '1,0000 bit/sembol'); await has('hBlocks', '0,6450'); await has('hBlocks', '0,5327');
      await set('hSrc', 'tr'); await is('hH', '4,3044 bit'); await is('hL', '4,3429 bit/sembol'); eq(await page.locator('#hMsg').inputValue(), 'deniz feneri yanar'); await is('hMsgN', '18'); await is('hRT', 'İkisi de aynı');
      await set('hMsg', 'qqq xyz'); await is('hMsgN', '3'); await has('hMsgNe', '4 karakter atlandı'); await set('hMsg', '123'); await is('hBits', '—'); await has('hMsgStatus', 'hiçbiri yok');
      await click('hGen'); await is('hMsgN', '40'); await is('hRT', 'İkisi de aynı');
      await set('hSrc', 'en'); await is('hH', '4,0072 bit'); await is('hMsgN', '20');
      await set('hSrc', 'tab1'); await is('hH', '2,1610 bit'); await set('hMsg', '666661'); await is('hMsgN', '6'); await is('hBits', '9 bit');
      await set('hMsg', 'A'.repeat(500)); await is('hMsgN', '—'); await set('hMsg', '6'.repeat(500)); await is('hMsgN', '400'); await has('hMsgNe', 'ilk 400');
      await inked('huf'); await click('hReset'); await is('hL', '2,2000 bit/sembol'); await is('hArBits', '82 bit'); await fits();
      await page.locator('#tab-huf').focus(); await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-lz').getAttribute('aria-selected'), 'true');
      // 03 · LZ
      await is('zOrig', '1543 bayt'); await is('z77', '9790 bit'); await is('z78', '9157 bit'); await is('zH1', '7138 bit'); await is('zRT', 'Bayt bayt aynı'); await has('zDefE', 'geri açma ✓'); await has('zDef', ' bit');
      await is('zP2n', '16'); await is('zPsh', '15'); await is('zPfrac', '93,75 %'); await is('zPmeas', 'LZ77 0 / 200 · LZ78 0 / 200'); eq(await page.locator('#zTokRows tr').count(), 20);
      await set('zSrc', 'rep'); await is('zOrig', '720 bayt'); await is('z77', '1188 bit'); await is('z78', '1673 bit'); await has('zStatus', 'Tekrarlı metin'); await has('zStatus', 'çok altında');
      await set('zSrc', 'rndB'); await is('zOrig', '1000 bayt'); await is('z77', '12 760 bit'); await is('z78', '10 065 bit'); await has('zStatus', 'küçülmedi'); await has('zStatus', 'güvenilmez'); eq(await page.locator('#zText').evaluate((e) => e.readOnly), true);
      await click('zNew'); eq(await page.locator('#zSeed').inputValue(), '2'); await is('zRT', 'Bayt bayt aynı');
      await set('zSrc', 'rndL'); await has('zStatus', 'log₂ 26'); await set('zSrc', 'en'); await is('zOrig', '1187 bayt'); eq(await page.locator('#zSeed').isDisabled(), true);
      await set('zSrc', 'own'); eq(await page.locator('#zText').evaluate((e) => e.readOnly), false); await has('zOrigE', ' karakter'); await set('zText', ''); await is('z77', '—'); await has('zStatus', 'Metin boş'); await set('zText', 'aaaa'); await is('zRT', 'Bayt bayt aynı');
      await set('zAlg', 'lz78'); await has('zTokRows', '—'); eq(await page.locator('#zTokRows tr').count(), 3);
      await set('zW', '4096'); await set('zL', '255'); await set('zPn', 64); await is('zP2n', '1,845 × 10¹⁹'); await set('zPk', 64); await is('zPfrac', '5,42 × 10⁻²⁰'); await set('zPn', 3); await is('zPkOut', '3 bit'); await is('zPfrac', '12,50 %');
      await inked('lz'); await click('zReset'); await is('z77', '9790 bit'); await is('zPfrac', '93,75 %'); eq(await page.locator('#zSrc').inputValue(), 'tr'); await fits();
      await page.locator('#tab-lz').focus(); await page.keyboard.press('End'); eq(await page.locator('#tab-ch').getAttribute('aria-selected'), 'true');
      // 04 · Kanal
      await is('cC', '0,5310 bit/kullanım'); await is('cRepTh', '0,02800'); await is('cRepMeas', '0,02813'); await is('cHamTh', '0,06688'); await is('cHamMeas', '0,06811'); await is('cLim', '→ 0');
      await has('cRepMeasE', '+0,25 σ'); await has('cHamMeasE', '+1,12 σ'); await has('cStatus', '0,00851');
      await is('cCode', '0110011'); await is('cRecv', '0110111'); await is('cSyn', '101 = 5'); await is('cDec', '1011'); await has('cDecE', '✓');
      await set('cE2', 2); await is('cSyn', '111 = 7'); await has('cDecE', '✗'); await has('cHStatus', 'İki hata'); await set('cE1', 0); await set('cE2', 0); await is('cSyn', '000 = 0'); await has('cHStatus', 'Hata yok');
      await set('cData', '10'); await is('cCode', '—'); await set('cData', '0000'); await is('cCode', '0000000');
      await set('cRep', '1'); await is('cRepTh', '0,1000'); await has('cStatus', 'Kodsuz'); await is('cLim', '0,1000');
      await set('cRep', '25'); await has('cRepTh', '× 10⁻'); await set('cP', 0.3); await set('cRep', '3'); await is('cLim', '0,1640');
      await set('cP', 0); await is('cC', '1,0000 bit/kullanım'); await is('cRepMeas', '0'); await has('cStatus', 'kusursuz'); await set('cP', 0.5); await is('cC', '0,0000 bit/kullanım'); await has('cStatus', 'kapasite sıfır');
      await set('cN', '10000'); await has('cRepMeasE', '/ 10 000 bit');
      await inked('ch'); await click('cReset'); await is('cRepMeas', '0,02813'); await is('cSyn', '101 = 5'); await fits();
      // R tuşu ve Home
      await set('cP', 0.2); await page.locator('h1').click(); await page.keyboard.press('r'); await is('cPOut', '0,100');
      await page.locator('#tab-ch').focus(); await page.keyboard.press('Home'); eq(await page.locator('#tab-ent').getAttribute('aria-selected'), 'true');
      for (const t of ['huf', 'lz', 'ch', 'ent']) { await click('tab-' + t); await fits(); eq(await page.locator('#panel-' + t).isVisible(), true); await inked(t); }
      assert.deepEqual(errors, []); checks++; await page.close();
    }
    console.log(`G ${SLUG}: ${checks - before} tarayıcı kontrolü PASS (390 px açık, 1280 px koyu)`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
