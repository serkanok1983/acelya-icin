// G · limit-ve-sureklilik.html — kalıcı denetim.
// Çekirdek (KERNEL-BEGIN … KERNEL-END) node'da yüklenir ve sayfanın formüllerini KULLANMAYAN başvurularla
// karşılaştırılır: BigInt ile tam kesirli (1 + 1/n)ⁿ ve 60 basamaklı e, kaba kuvvet terim taramaları, Newton ile
// ayrıca çözülen δ denklemleri, Cardano kökü, yoğun örnekleme, alıştırma ifadelerinin metninden kurulan
// fonksiyonların sayısal limitleri. `--browser`: Playwright ile gerçek arayüz (390 px açık + 1280 px koyu).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { canvasInk, assertCanvasDrawn } from './lib/canvas-check.mjs';
const html = fs.readFileSync(new URL('../limit-ve-sureklilik.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} }; vm.createContext(context); vm.runInContext(source, context);
const K = context.window.LimitLab; assert(K, 'LimitLab yok');
let checks = 0;
const ok = (c, msg = 'koşul sağlanmadı') => { assert(c, msg); checks++; };
const eq = (a, b, msg = '') => { assert.equal(a, b, `${msg}: ${a} ≠ ${b}`); checks++; };
const near = (a, b, tol, msg = '') => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${msg} ${a} ≠ ${b} (tol ${tol})`); checks++; };

// ── 0 · biçim ──
eq(K.fmt(12345.678, 2), '12 345,68'); eq(K.fmt(1234.5, 1), '1234,5'); eq(K.fmt(-0.0000001, 3), '0', '−0 yazılmamalı'); eq(K.fmt(-2.5), '−2,5');
eq(K.fmt(Infinity), '∞'); eq(K.fmt(-Infinity), '−∞'); eq(K.fmt(NaN), 'tanımsız'); eq(K.fmtSig(2.2e-16, 2), '2,2·10⁻¹⁶'); eq(K.fmtSig(1e-5, 3), '10⁻⁵'); eq(K.fmtSig(0.0909090909, 6), '0,0909091');

// ── 1 · diziler ──
// e'yi BigInt ile 60 basamak: Σ 1/k!
const SC = 10n ** 60n; let eBig = 0n; { let t = SC; for (let k = 1; k < 60; k++) { eBig += t; t /= BigInt(k); } }
// e − (1 + 1/n)ⁿ < 1/D  ⟺  D·(e·nⁿ − (n+1)ⁿ) < nⁿ   (ölçekli tam sayılarla)
const eGapLess = (n, D) => { const N = BigInt(n), a = (N + 1n) ** N, b = N ** N; return BigInt(D) * (eBig * b - a * SC) < b * SC; };
for (const D of K.EPS_D) {
  const eps = 1 / D;
  for (const id of ['bir', 'isaret']) { const r = K.findN(id, D); eq(r.N, D + 1, id); eq(r.bound, D + 1); eq(r.witness, D); ok(D * 1 >= D, ''); for (let n = r.N; n < r.N + 3000; n++) ok(n > D); }
  { // sin n / n: kaba kuvvet, farklı ifade
    const r = K.findN('sinn', D); let last = 0; for (let n = 1; n <= D + 5000; n++) if (Math.abs(Math.sin(n) / n) >= eps) last = n;
    eq(r.N, last + 1, 'sin n/n en küçük N D=' + D); eq(r.bound, D + 1); ok(r.N <= r.bound, 'güvenceli N geçerli olmalı'); }
  { // (1 + 1/n)ⁿ: BigInt ile
    const r = K.findN('e', D); ok(eGapLess(r.N, D), 'e: N sağlamalı D=' + D); if (r.N > 1) ok(!eGapLess(r.N - 1, D), 'e: N − 1 sağlamamalı D=' + D);
    ok(r.bound >= r.N && eGapLess(r.bound, D), 'e: güvenceli N'); eq(r.bound, Math.ceil(Math.E * D / 2)); }
  for (const L of [-1.5, -0.3, 0, 0.7, 1.5]) { const r = K.findN('salinan', D, L); eq(r.exists, false); ok(r.farDist >= 1 - 1e-12 && r.farDist > eps); eq(Math.max(Math.abs(1 - L), Math.abs(1 + L)), r.farDist); }
}
eq(K.findN('e', 100).N, 135); eq(K.findN('e', 10).N, 13); eq(K.findN('sinn', 1000).N, 989); eq(K.findN('sinn', 10).N, 9);
// monotonluk (BigInt): aₙ < aₙ₊₁ < e
for (let n = 1; n < 60; n++) { const N = BigInt(n); ok((N + 1n) ** N * (N + 1n) ** (N + 1n) < (N + 2n) ** (N + 1n) * N ** N, 'artan ' + n); }
// tahmin denetimi
{ let c = K.checkN('bir', 10, 11); eq(c.valid, true); eq(c.Nmin, 11); c = K.checkN('bir', 10, 4); eq(c.valid, false); eq(c.failAt, 10); near(c.dist, 0.1, 1e-15);
  c = K.checkN('salinan', 10, 7, 0); eq(c.valid, false); ok(c.failAt >= 7 && c.dist >= 1); c = K.checkN('e', 100, 500); eq(c.valid, true); eq(K.checkN('bir', 10, 0).valid, false); }
// kayan nokta tablosu
{ const t = K.eTable(17); eq(t.length, 17); eq(t[15].naive, 1, '10¹⁶: 1 + 1/n = 1'); eq(t[15].kept, 0); eq(t[15].stable, Math.E); for (const k of [9, 10, 11, 12]) ok(t[k - 1].gapNaive < 0, 'doğrudan formül e üstüne çıkar k=' + k);
  for (let k = 1; k <= 15; k++) ok(Math.abs(t[k - 1].gapStable - t[k - 1].theory) <= 0.1 * t[k - 1].theory, 'log1p kuramla örtüşür k=' + k);
  for (let k = 1; k <= 6; k++) { const n = 10 ** k; const N = BigInt(n); ok(Math.abs(t[k - 1].gapStable - Math.E / (2 * n)) < Math.E / (n * n), 'e/(2n) ikinci mertebeye kadar'); }
  ok(Math.abs(t[7].gapNaive - t[7].theory) > 0.1 * t[7].theory && Math.abs(t[6].gapNaive - t[6].theory) < 0.1 * t[6].theory, 'doğrudan formül n = 10⁸de bozulur'); }

// ── 2 · ε–δ ──
const newton = (g, dg, x) => { for (let i = 0; i < 80; i++) x -= g(x) / dg(x); return x; };
const refStar = {
  dogru: (e) => e / 2, delik: (e) => e,
  kare: (e) => newton((x) => x * x - 4 - e, (x) => 2 * x, 3) - 2,
  kok: (e) => 4 - newton((x) => x * x - (2 - e) ** 2, (x) => 2 * x, 1) ** 1,
  sinc: (e) => e >= 1 ? Math.PI : newton((d) => Math.sin(d) - (1 - e) * d, (d) => Math.cos(d) - (1 - e), Math.sqrt(6 * e)),
};
refStar.kok = (e) => 4 - newton((x) => Math.sqrt(x) - (2 - e), (x) => 0.5 / Math.sqrt(x), 3);
for (const id of ['dogru', 'kare', 'delik', 'sinc', 'kok']) {
  const F = K.FN[id];
  for (const e of K.EPS_FN) {
    const r = K.deltaCheck(id, e, 1e-3);
    near(r.star, refStar[id](e), id === 'sinc' ? 1e-12 : 1e-13, `${id} δ* ε=${e}`);
    ok(r.safe <= r.star * (1 + 1e-12), `${id}: ders kitabı δ geçerli`);
    // yoğun örnekleme: şeridin içinde sapma < ε
    let worst = 0; for (let i = 1; i <= 4000; i++) { const h = r.star * i / 4000 * (1 - 1e-9); for (const x of [F.a + h, F.a - h]) { const y = F.f(x); if (Number.isFinite(y)) worst = Math.max(worst, Math.abs(y - F.L)); } }
    ok(worst < e, `${id} ε=${e} şeritte sapma ${worst}`);
    // biraz genişletince bozulur (bağlayıcı yanda)
    const x = F.a + F.side * r.star * (1 + 1e-6); ok(Math.abs(F.f(x) - F.L) >= e, `${id} ε=${e}: δ* en büyük`);
    for (const d of [r.star * 1.5, r.star * 3]) { const q = K.deltaCheck(id, e, d); eq(q.valid, false); ok(Math.abs(q.witness - F.a) < d && Math.abs(q.witness - F.a) > 0 && Math.abs(F.f(q.witness) - F.L) >= e, `${id} tanık`); ok(q.sup >= e, `${id} sup`); }
    const q = K.deltaCheck(id, e, r.star * 0.5); eq(q.valid, true); ok(q.sup < e);
  }
}
near(K.deltaCheck('kare', 0.1, 0.1).sup, 0.41, 1e-14); near(K.deltaCheck('sinc', 1, 1).star, Math.PI, 1e-12); near(K.SINC_MIN_X, newton((x) => Math.tan(x) - x, (x) => 1 / Math.cos(x) ** 2 - 1, 4.49), 1e-14);
for (const id of ['sicrama', 'salinim']) for (const e of K.EPS_FN) for (const L of [-2, -1, -0.4, 0, 0.3, 1, 2]) for (const d of [1, 0.1, 1e-3, 1e-5]) {
  const r = K.deltaCheck(id, e, d, L); eq(r.valid, false); const w = r.witness; ok(Math.abs(w) < d && w !== 0, `${id} tanık şeritte`); ok(Math.abs(K.FN[id].f(w) - L) >= e - 1e-12, `${id} tanık bant dışında`);
}

// ── 3 · tek taraflı ve sonsuz ──
const reach = (v, num) => v === Infinity ? num > 1e5 : v === -Infinity ? num < -1e5 : Math.abs(num - v) < 1e-4;
for (const [id, F] of Object.entries(K.ONE)) {
  const a = K.approachTable(id), last = a[a.length - 1];
  ok(reach(F.left, last.left), id + ' sol'); ok(reach(F.right, last.right), id + ' sağ');
  if (Number.isNaN(F.two)) ok(F.left !== F.right, id + ' iki taraflı yok'); else eq(F.two, F.left);
  const t = K.infTable(id), L6 = t[t.length - 1]; ok(F.pos === Infinity ? L6.pos >= 1e5 : Math.abs(L6.pos - F.pos) < 1e-5, id + ' +∞'); ok(F.neg === -Infinity ? L6.neg <= -1e5 : Math.abs(L6.neg - F.neg) < 1e-5, id + ' −∞');
  for (const y of F.hAsym) ok([F.pos, F.neg].includes(y)); for (const x of F.vAsym) ok([F.left, F.right].some((v) => !Number.isFinite(v) && !Number.isNaN(v)));
}
eq(K.approachTable('usters')[2].left, 0, 'taşma altı'); eq(K.approachTable('usters')[2].right, Infinity, 'taşma'); near(K.approachTable('usters')[1].left, Math.exp(-100), 1e-12);

// ── 4 · belirsiz biçimler ──
for (const [id, I] of Object.entries(K.IND)) { const t = K.indTable(id); near(I.stable(I.xs(6)), I.limit, 1e-5, id + ' yeniden yazım limite gider'); eq(t.rows.length, 16); for (const r of t.rows.slice(0, 3)) near(r.naive, r.stable, 1e-6, id + ' küçük k'); }
eq(K.indTable('delik').breakK, 8); eq(K.indTable('kosinus').breakK, 4); eq(K.indTable('kokoran').breakK, 7); eq(K.indTable('fark').breakK, 7); eq(K.indTable('sinc0').breakK, null); eq(K.indTable('oran').breakK, null);
ok(Number.isNaN(K.indTable('delik').rows[15].naive)); eq(K.indTable('kosinus').rows[7].naive, 0, '(1 − cos 10⁻⁸)/10⁻¹⁶ = 0'); eq(K.indTable('fark').rows[15].naive, 2);
near(K.IND.kosinus.stable(1e-8), 0.5, 1e-15); near(K.IND.fark.stable(1e16), 0.5, 1e-15);
for (let i = 1; i < 157; i++) { const x = i / 100, q = K.areaSqueeze(x); ok(q.small <= q.sector && q.sector <= q.big, 'alan sırası'); ok(q.cos <= q.ratio && q.ratio <= 1, 'cos ≤ sin/x ≤ 1'); }
assert.throws(() => K.areaSqueeze(0)); assert.throws(() => K.areaSqueeze(2)); checks += 2;

// ── 5 · süreklilik, ikiye bölme, kesen ──
eq(K.G(1), 1.5); eq(K.classify(0, true, 1.5).kind, 'surekli'); eq(K.classify(0, true, 3).kind, 'kaldirilabilir'); eq(K.classify(0, false, 1.5).kind, 'kaldirilabilir'); eq(K.classify(0.5, true, 1.5).kind, 'sicrama'); eq(K.classify(-0.1, false, 0).kind, 'sicrama');
eq(K.classify(0.1 + 0.2 - 0.3, true, 0.1 * 15).kind, 'surekli', 'yuvarlama artığı');
const cardano = Math.cbrt(1 + Math.sqrt(26 / 27)) + Math.cbrt(1 - Math.sqrt(26 / 27));
near(K.BIS.kubik.root, cardano, 1e-15); near(K.BIS.kosx.root, 0.7390851332151607, 1e-15); eq(K.BIS.ters.root, null);
for (const id of ['kubik', 'kosx', 'kok2']) {
  const B = K.BIS[id], res = K.bisect(id, 80); ok(res.stop === 'kayan' || res.stop === 'tam', id + ' durmalı'); ok(res.rows.length >= 45 && res.rows.length <= 60, id + ' adım ' + res.rows.length);
  res.rows.forEach((r, i) => { near(r.bound, (B.b - B.a) / 2 ** (i + 1), 1e-15, id + ' sınır yarılanır'); ok(r.err <= r.bound + 1e-16, id + ' hata ≤ sınır n=' + r.n); ok(Math.sign(B.f(r.a)) !== Math.sign(B.f(r.b)) || B.f(r.a) === 0 || B.f(r.b) === 0, id + ' ters işaret'); });
  ok(Math.abs(res.rows.at(-1).c - B.root) < 1e-15 * 4, id + ' son c köke yakın');
}
eq(K.bisect('kubik', 1).rows[0].c, 1.5); eq(K.bisect('kubik', 0).rows.length, 0);
{ const r = K.bisect('ters', 60).rows; ok(Math.abs(r.at(-1).c) < 1e-12, 'süreksizliğe yakınsar'); ok(Math.abs(r.at(-1).fc) > 1e12, '|f(c)| büyür'); eq(r[0].err, null); }
for (const h of [-1, -0.37, 0.01, 0.5, 1]) near(K.secant(h), 2 + h, 1e-12, 'kesen'); ok(Number.isNaN(K.secant(0)));

// ── 6 · ayrıştırıcı ──
const P = (s) => K.parseAnswer(s);
const num = (s, v) => { const r = P(s); eq(r.kind, 'num', s); near(r.value, v, 1e-15, s); };
num('2', 2); num('−3', -3); num('-3', -3); num(' 1,5 ', 1.5); num('1.5', 1.5); num(',5', 0.5); num('+4', 4); num('3/4', 0.75); num('−3/4', -0.75); num('- 3 / 4', -0.75); num('1,5/3', 0.5); num('1 000', 1000); num('0,333', 0.333);
eq(P('3/4').exact, true); eq(P('0,333').dec, 3); eq(P('2').dec, 0); eq(P('0,5').exact, false);
for (const s of ['∞', '+∞', 'sonsuz', 'Sonsuz', 'inf', '+inf']) { const r = P(s); eq(r.kind, 'inf', s); eq(r.sign, 1); }
for (const s of ['-∞', '−∞', '-sonsuz', 'eksi sonsuz', '−inf']) { const r = P(s); eq(r.kind, 'inf', s); eq(r.sign, -1); }
for (const s of ['yok', 'YOK', 'Limit yok', 'yoktur']) eq(P(s).kind, 'none', s);
for (const s of ['', '   ', 'abc', '1,2,3', '1.000,5', '3/0', '2x', 'tanımsız', 'TANIMSIZ', '0/0', '1/2/3', '∞∞', 'e', 'pi']) eq(P(s).kind, 'error', 'hata: "' + s + '"');
ok(/Payda/.test(P('3/0').msg)); ok(/yok/.test(P('tanımsız').msg));

// ── 6 · üreteç: metinden kurulan fonksiyonun sayısal limiti ──
function toFn(expr) {
  let s = expr.replace(/−/g, '-').replace(/·/g, '*').replace(/√/g, 'Q').replace(/sin/g, 'S').replace(/cos/g, 'C');
  s = s.replace(/\(([^()]*)\)²/g, '(($1)*($1))').replace(/x²/g, '(x*x)').replace(/x³/g, '(x*x*x)');
  s = s.replace(/(\d)\s*(x|\(|Q|S|C)/g, '$1*$2').replace(/\)\s*(\(|x)/g, ')*$1').replace(/x\s*\(/g, 'x*(');
  return new Function('x', 'const Q=Math.sqrt,S=Math.sin,C=Math.cos;return ' + s + ';');
}
function numLimit(P) {
  const f = toFn(P.expr), m = P.lim.match(/x → (−?\d+|∞)([⁺⁻]?)/), side = m[2];
  if (m[1] === '∞') { const v1 = f(1e5), v2 = f(1e7); if (Math.abs(v2) > 1e5 && Math.abs(v2) > Math.abs(v1)) return { kind: 'inf', sign: Math.sign(v2) }; return { kind: 'num', value: v2 }; }
  const a = Number(m[1].replace('−', '-')), h = 1e-6;
  const L = f(a - h), R = f(a + h), L2 = f(a - h / 10), R2 = f(a + h / 10);
  const big = (u, u2) => Math.abs(u2) > 1e5 && Math.abs(u2) > Math.abs(u) * 5;
  if (side === '⁺') return big(R, R2) ? { kind: 'inf', sign: Math.sign(R2) } : { kind: 'num', value: R2 };
  if (side === '⁻') return big(L, L2) ? { kind: 'inf', sign: Math.sign(L2) } : { kind: 'num', value: L2 };
  if (big(L, L2) || big(R, R2)) return Math.sign(L2) === Math.sign(R2) ? { kind: 'inf', sign: Math.sign(R2) } : { kind: 'none' };
  // salınım: 0'a giden iki özel dizi
  const k = Number((P.expr.match(/sin\((\d*)\/x\)/) || [])[1] || NaN);
  if (/^sin\(\d*\/x\)$/.test(P.expr)) { const kk = Number.isNaN(k) ? 1 : k; const a1 = f(kk / (Math.PI / 2 + 2 * Math.PI * 1e3)), a2 = f(kk / (1.5 * Math.PI + 2 * Math.PI * 1e3)); return Math.abs(a1 - a2) > 1 ? { kind: 'none' } : { kind: 'num', value: a1 }; }
  return { kind: 'num', value: (L + R) / 2 };
}
const ansText = (A) => A.kind === 'num' ? A.text : A.kind === 'inf' ? (A.sign > 0 ? '∞' : '−∞') : A.kind === 'none' ? 'yok' : A.kind === 'class' ? A.value : A.exactText;
const seen = { 1: new Set(), 2: new Set(), 3: new Set(), 4: new Set() };
for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 250; seed++) {
  const Pb = K.generate(level, seed); assert.deepEqual(JSON.parse(JSON.stringify(K.generate(level, seed))), JSON.parse(JSON.stringify(Pb))); checks++;
  seen[level].add(Pb.type || 'delta'); ok(Pb.hint && Pb.steps.length >= 2, 'ipucu ve adımlar'); ok(!/undefined|NaN|\+ −|− −|\+ \+/.test(Pb.expr + Pb.steps.join(' ') + Pb.hint), 'metin temiz: ' + Pb.expr);
  const g = K.grade(Pb, ansText(Pb.answer)); ok(g.ok, `kendi yanıtını kabul etmeli L${level} s${seed}: ${g.msg}`);
  if (level === 1 || level === 4) {
    const n = numLimit(Pb), A = Pb.answer;
    eq(n.kind, A.kind, `L${level} s${seed} ${Pb.lim} ${Pb.expr}`);
    if (A.kind === 'num') near(n.value, A.value, 1e-4, `L${level} s${seed} ${Pb.expr}`); if (A.kind === 'inf') eq(n.sign, A.sign);
    if (A.kind === 'num') { ok(!K.grade(Pb, String(A.value + 1)).ok, 'yanlış sayı'); ok(!K.grade(Pb, 'yok').ok); ok(!K.grade(Pb, '∞').ok); }
    else { ok(!K.grade(Pb, '0').ok); }
  } else if (level === 2) {
    const a = Pb.at, head = Pb.expr.replace(/^f\(x\) = /, '');
    let f, fa;
    const pw = head.match(/^(.*) \(x < −?\d+\), (.*) \(x ≥ −?\d+\)$/);
    if (pw) { const A1 = toFn(pw[1]), B1 = toFn(pw[2]); f = (x) => x < a ? A1(x) : B1(x); fa = B1(a); }
    else { const body = head.split(', x ≠')[0]; const abs = body.match(/^\|(.*)\| \/ \((.*)\)$/); f = abs ? ((u) => (x) => Math.abs(u(x)) / u(x))(toFn(abs[1])) : toFn(body); const fm = head.match(/f\(−?\d+\) = (−?\d+)$/); fa = fm ? Number(fm[1].replace('−', '-')) : null; }
    const l = f(a - 1e-7), r = f(a + 1e-7);
    const cls = Math.abs(l) > 1e5 || Math.abs(r) > 1e5 ? 'sonsuz' : Math.abs(l - r) > 1e-4 ? 'sicrama' : fa !== null && Math.abs(fa - l) < 1e-4 ? 'surekli' : 'kaldirilabilir';
    eq(cls, Pb.answer.value, `L2 s${seed} ${Pb.expr}`);
    for (const c of Object.keys(K.CLASS_NAMES)) eq(K.grade(Pb, c).ok, c === Pb.answer.value);
  } else {
    const A = Pb.answer, f = (x) => Pb.m * x + Pb.b;
    near(A.max, Pb.eps / Math.abs(Pb.m), 1e-15); near(A.num / A.den, A.max, 1e-15);
    let worst = 0; for (let i = 1; i <= 200; i++) { const h = A.max * i / 200 * (1 - 1e-12); worst = Math.max(worst, Math.abs(f(Pb.a + h) - Pb.L), Math.abs(f(Pb.a - h) - Pb.L)); } ok(worst < Pb.eps, 'δ* geçerli');
    ok(Math.abs(f(Pb.a + A.max * 1.001) - Pb.L) > Pb.eps, 'δ* en büyük');
    ok(K.grade(Pb, String(A.max / 2).replace('.', ',')).ok, 'küçük δ geçerli'); ok(!K.grade(Pb, String(A.max * 1.01)).ok, 'büyük δ geçersiz'); ok(!K.grade(Pb, '0').ok); ok(!K.grade(Pb, '-0,001').ok); ok(K.grade(Pb, `${A.num}/${A.den}`).ok, 'kesir δ');
  }
}
eq([...seen[1]].sort().join(), 'carpan,sinus,sonsuz,tektaraf,yerine'); eq([...seen[2]].sort().join(), 'delik,isaret,kutup,parcali'); eq([...seen[4]].sort().join(), 'kokfark,kokoran,kosinus,salinim,sikistirma,terssin');
{ // doğrulayıcı: çözüm metni sadeleşmiş olmalı (1x, + (−2), − (0), "4/5 = 4/5", yanlış yönelme eki yok)
  const bad = [[/(^|[^\d,.·/⁰-⁹])−?1x/, '1x'], [/\+ \(−/, '+ (−a)'], [/(?<!f)\(0\)/, '(0)'], [/(^|[\s(|:·])−0(?![\d,])/, '−0'], [/−1²/, '−1²'], [/\+ 0\/x/, '+ 0/x'],
    [/(?:^|: |‖ |[Ll]imit |→ 0: |→ ∞: )(−?[\d/,]+) = \1(?=[.;\s]|$)/, 'a = a'], [/(\|[^|]+\|) = \1/, '|A| = |A|'], [/·\(\d+(,\d+)?\)/, 'gereksiz parantez']];
  const dat = (n) => { const d = n % 10, t = Math.floor(n / 10) % 10; return n === 0 ? 'a' : d ? ['', 'e', 'ye', 'e', 'e', 'e', 'ya', 'ye', 'e', 'a'][d] : ['e', 'a', 'ye', 'a', 'a', 'ye', 'a', 'e', 'e', 'a'][t]; };
  for (let level = 1; level <= 4; level++) for (let seed = 1; seed <= 2000; seed++) {
    const Pb = K.generate(level, seed), text = [Pb.hint, ...Pb.steps].join(' ‖ ');
    for (const [re, name] of bad) ok(!re.test(text), `L${level} s${seed} sadeleşmemiş (${name}): ${text}`);
    for (const m of text.matchAll(/(\d+)'(ye|ya|e|a)(?![a-zçğıöşü])/g)) eq(m[2], dat(Number(m[1])), `L${level} s${seed} ek: ${m[0]}`);
  }
  // ayrıştırıcı: karışık sayı, sondaki nokta, büyük harfli INF, binlik ayırıcı
  eq(P('1 1/2').kind, 'error', '1 1/2 = 11/2 okunmamalı'); eq(P('1 2').kind, 'error'); eq(P('Yok.').kind, 'none'); eq(P('INF').kind, 'inf'); eq(P('Artı sonsuz').sign, 1); eq(P('−INF').sign, -1);
  num('1 000 000', 1e6); num('12 345,5', 12345.5); num('5.', 5); eq(P('TANIMSIZ').kind, 'error'); ok(/yok/.test(P('Tanımsız').msg));
  const Pm = K.generate(1, 1); ok(/küçül/.test(K.grade({ answer: { kind: 'inf', sign: -1 }, steps: ['x'] }, '0').msg), '−∞ için "küçülüyor"'); ok(Pm);
}
{ // yuvarlama kuralı
  const Pq = { answer: { kind: 'num', value: 1 / 3, text: '1/3' }, steps: ['x'] };
  ok(K.grade(Pq, '1/3').ok); ok(K.grade(Pq, '0,333').ok); ok(K.grade(Pq, '0.3333').ok); ok(!K.grade(Pq, '0,33').ok); ok(K.grade(Pq, '0,33').near); ok(!K.grade(Pq, '0,334').ok); ok(K.grade(Pq, 'tanımsız').error);
  const Pz = K.generate(1, 4); ok(/0\/0/.test(K.grade(Pz, '0').msg), '0/0 ⇒ 0 yanılgısına özel uyarı');
}
ok(Object.isFrozen(K) && Object.isFrozen(K.FN) && Object.isFrozen(K.EPS_D));
console.log(`G limit-ve-sureklilik: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

// ── tarayıcı ──
if (process.argv.includes('--browser')) {
  const { createRequire } = await import('node:module'); const { createServer } = await import('node:http'); const { join, extname } = await import('node:path'); const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url));
  let chromium; for (const dir of [root, ...(process.env.NODE_PATH || '').split(':').filter(Boolean), '/opt/node-tools']) { try { ({ chromium } = createRequire(join(dir, 'package.json'))('playwright')); break; } catch (_) {} }
  if (!chromium) ({ chromium } = await import('playwright'));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, '127.0.0.1', r)); let browser; const before = checks;
  try {
    browser = await chromium.launch();
    for (const [width, theme] of [[390, 'light'], [1280, 'dark']]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width < 500 ? 2 : 1, locale: 'tr-TR' });
      await ctx.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(6000); const errors = [];
      page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/limit-ve-sureklilik.html`, { waitUntil: 'load' }); await page.waitForTimeout(300);
      const read = async (id) => (await page.locator('#' + id).textContent()).trim();
      const has = async (id, t) => { const s = await read(id); assert(s.includes(t), `[${width}] #${id}: "${s}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v);
      const pick = (id, v) => page.locator('#' + id).selectOption(v), click = (id) => page.locator('#' + id).click();
      const type = async (id, v) => { await page.locator('#' + id).fill(v); await page.locator('#' + id).press('Enter'); };
      const noOverflow = async (w) => eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, `[${width}] yatay taşma: ${w}`);
      const painted = async (id) => ok(assertCanvasDrawn(await canvasInk(page, '#' + id), { minDistinct: 4, label: `[${width}] ${id}` }), `[${width}] ${id} boş`);
      eq(await page.evaluate(() => [...document.querySelectorAll('main input,main select')].filter((e) => !(e.labels && e.labels.length) && !e.getAttribute('aria-label')).map((e) => e.id).join()), '', 'etiketsiz denetim');
      eq(await page.evaluate(() => [...document.querySelectorAll('main canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), true);
      eq(await page.evaluate(() => document.title.length <= 80), true);
      // 01
      await has('sN', 'N = 11'); await has('sBound', 'N = 11'); await has('sWit', 'n = 10'); await has('sAN', '0,0909091'); await has('seqEpsOut', '0,1'); await painted('seqCanvas');
      await type('seqGuess', '11'); await has('seqGuessOut', 'Tam isabet'); await type('seqGuess', '4'); await has('seqGuessOut', 'n = 10'); await type('seqGuess', '50'); await has('seqGuessOut', 'Geçerli'); await type('seqGuess', 'yok'); await has('seqGuessOut', 'yakınsıyor'); await type('seqGuess', '2,5'); await has('seqGuessOut', 'tam sayı');
      await pick('seqFn', 'e'); await range('seqEps', 5); await has('sN', 'N = 135'); await has('sBound', 'N = 136'); await has('sWit', 'n = 134');
      await pick('seqFn', 'sinn'); await range('seqEps', 8); await has('sN', 'N = 989'); await has('sBound', 'N = 1001'); await painted('seqCanvas');
      await pick('seqFn', 'salinan'); await has('sN', 'yok'); eq(await page.locator('#seqLField').isVisible(), true); await range('seqL', 5); await has('seqStatus', 'L = 0,5'); await has('seqStatus', '1,5 uzakta'); await type('seqGuess', 'yok'); await has('seqGuessOut', 'Doğru');
      await has('eBody', '0 (1 + 1/n = 1)'); await has('eBody', "e'nin üstünde"); await has('eStatus', '10⁸');
      await noOverflow('seq'); await page.locator('h1').click(); await page.keyboard.press('r'); await has('sN', 'N = 11'); eq(await page.locator('#seqFn').inputValue(), 'bir');
      // 02
      await click('tab-ed'); await has('eStar', 'δ* = 0,0248457'); await has('eSafe', 'δ = 0,02'); await has('eSup', '0,41'); await has('edStatus', 'fazla büyük'); await has('edStatus', '2,0624228'); await painted('edCanvas');
      await range('edDelta', -200); await has('eYour', '0,01'); await has('edStatus', 'geçerli'); await has('eSup', '0,0401');
      await pick('edFn', 'sinc'); await has('eStar', '0,786683'); await has('eStarE', 'sayısal'); await has('eSafe', '0,774597'); await range('edEps', 0); await has('eStar', '3,14159');
      await pick('edFn', 'kok'); await has('eStar', '3'); await range('edEps', 3); await has('eStar', '0,39'); await has('eSafe', '0,2');
      await pick('edFn', 'salinim'); await has('eStar', 'yok'); eq(await page.locator('#edLField').isVisible(), true); await has('edStatus', 'Hiçbir δ yetmez'); await page.locator('#edZoom').uncheck(); await painted('edCanvas');
      await pick('edFn', 'sicrama'); await range('edL', 10); await has('eSup', '2'); await has('eL', '1 (aday)');
      await pick('edFn', 'delik'); await has('eStar', '0,1'); await has('edBody', '1,9');
      await noOverflow('ed'); await click('edReset'); await has('eStar', '0,0248457'); eq(await page.locator('#edZoom').isChecked(), true);
      // 03
      await click('tab-os'); await has('oLeft', '−∞'); await has('oRight', '+∞'); await has('oTwo', 'yok'); await has('oFa', 'tanımsız'); await has('oAsym', 'düşey x = 0'); await has('osNear', '−1 000 000'); await painted('osCanvas');
      await pick('osFn', 'usters'); await has('oLeft', '0'); await has('oRight', '+∞'); await has('osNear', 'taşma altı'); await has('osNear', 'taşma (∞)'); await has('osStatus', 'taşma altı');
      await pick('osFn', 'tamkisim'); await has('oLeft', '0'); await has('oRight', '1'); await has('oFa', '1'); await has('osStatus', 'sıçrama');
      await pick('osFn', 'arctan'); await has('oTwo', '0'); await has('oInf', 'π/2 ≈ 1,570796 ; −π/2 ≈ −1,570796'); await has('oAsym', 'yatay');
      await pick('osFn', 'terskare'); await has('oTwo', '+∞'); await range('osK', 6); await has('osKOut', '10⁻⁶'); await pick('osFn', 'rasyonel'); await has('oAsym', 'y = 2'); await painted('osCanvas'); await noOverflow('os');
      // 04
      await click('tab-in'); await has('qRatio', '0,896695'); await has('qCos', '0,696707'); await has('sqXOut', '0,8 rad'); await painted('sqCanvas'); await range('sqX', 1); await has('qRatio', '0,999983');
      await has('iLim', '2'); await has('inStatus', '1 + 10⁻⁸'); await has('inBody', '0/0 (NaN)');
      await pick('inFn', 'kosinus'); await has('inStatus', '10⁻⁴'); await has('iLim', '0,5'); await pick('inFn', 'fark'); await has('iForm', '∞ − ∞'); await has('inStatus', '10⁷'); await pick('inFn', 'sinc0'); await has('inStatus', 'hiçbirinde');
      await range('szK', 30); await has('szKOut', '0,001'); await painted('szCanvas'); await noOverflow('in'); await click('inReset'); await has('qRatio', '0,896695'); await has('szKOut', '1');
      // 05
      await click('tab-ct'); await has('cClass', 'kaldırılabilir'); await has('cFa', '3'); await painted('ctCanvas');
      { // noktayı sürükle: f(1) = 3 → 1,5
        const box = await page.locator('#ctCanvas').boundingBox(); const X = (x) => box.x + 46 + (x + 1) / 4 * (box.width - 58), Y = (y) => box.y + 12 + (4 - y) / 5 * (box.height - 38);
        await page.mouse.move(X(1), Y(3)); await page.mouse.down(); await page.mouse.move(X(1), Y(1.5), { steps: 5 }); await page.mouse.up();
        await has('cClass', 'sürekli'); eq(await page.locator('#ctV').inputValue(), '15');
      }
      await range('ctJ', 5); await has('cClass', 'sıçrama'); await has('cRight', '2'); await range('ctJ', 0); await page.locator('#ctDef').uncheck(); await has('cClass', 'kaldırılabilir'); await has('cFa', 'tanımsız');
      await pick('ctMode', 'sonsuz'); await has('cClass', 'sonsuz'); await pick('ctMode', 'salinim'); await has('cClass', 'salınımlı'); await has('cLeft', 'yok');
      await has('bBound', '—'); await click('bsStep'); await has('bN', '1'); await has('bC', '1,5'); await has('bFc', '−0,125'); await has('bBound', '0,5'); await click('bsTen'); await has('bN', '11'); await has('bBound', '0,000488'); await painted('bsCanvas');
      await click('bsAll'); await has('bsStatus', 'Durdu'); ok(Number(await read('bN')) >= 45); await pick('bsFn', 'ters'); await click('bsAll'); await has('bsStatus', 'süreksizliğin'); await has('bErr', 'kök yok');
      await pick('bsFn', 'kok2'); await click('bsTen'); await has('bInt', '1,4140625'); await click('bsReset'); await has('bN', '0');
      await has('rSlope', '2,5'); await range('brH', 0); await has('rSlope', 'tanımsız'); await range('brH', -10); await has('rSlope', '1,9'); await painted('brCanvas');
      await noOverflow('ct'); await click('ctReset'); await has('cClass', 'kaldırılabilir'); eq(await page.locator('#ctMode').inputValue(), 'parcali');
      // 06
      await click('tab-pr'); await has('prQ', '(−4x − 2) / (−2x² + 1)'); await type('prIn', 'tanımsız'); await has('prFb', 'Tanımsız'); await has('prScore', '0 doğru / 0 deneme');
      await type('prIn', '0'); await has('prFb', 'Doğru'); await has('prScore', '1 doğru / 1 deneme'); await click('prNew'); await has('prQ', 'sin(4x) / (5x)'); await type('prIn', '0,8'); await has('prFb', 'Doğru'); await type('prIn', '1'); await has('prFb', 'Değil');
      await click('prHint'); eq(await page.locator('#prHintOut').isVisible(), true); await click('prSol'); await has('prSteps', '4/5');
      await pick('prLevel', '2'); eq(await page.locator('#prIn').isVisible(), false); await page.locator('#prClassBox button[data-class=sonsuz]').click(); await has('prFb', 'Doğru'); await page.locator('#prClassBox button[data-class=sicrama]').click(); await has('prFb', 'Değil');
      await pick('prLevel', '3'); await has('prQ', 'ε = 0,03'); await click('prSol'); await has('prSteps', '|3x + 3| = 3·|x + 1|'); await has('prSteps', '0,03/3 = 0,01'); await type('prIn', '0,01'); await has('prFb', 'tam onu'); await type('prIn', '0.02'); await has('prFb', 'Fazla büyük'); await type('prIn', '1/200'); await has('prFb', 'Geçerli');
      await pick('prLevel', '4'); await type('prIn', '5/2'); await has('prFb', 'Doğru'); await page.locator('#prSeed').fill('4'); await page.locator('#prSeed').press('Enter'); await page.locator('#prSeed').dispatchEvent('change'); await has('prQ', '√(x² + x) − x'); await type('prIn', '0'); await has('prFb', 'Değil');
      await noOverflow('pr'); await click('prReset'); await has('prScore', '0 doğru / 0 deneme'); await has('prTitle', 'Soru 1');
      eq(await page.evaluate(() => [...document.querySelectorAll('.lm-wrong + p')].some((p) => p.textContent.includes('0,499999875'))), true, 'hata 5 tabloyla aynı sayı');
      // klavye, bütünlük
      await page.locator('#tab-pr').focus(); await page.keyboard.press('Home'); eq(await page.locator('#tab-seq').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowLeft'); eq(await page.locator('#tab-pr').getAttribute('aria-selected'), 'true'); await page.keyboard.press('End'); await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-seq').getAttribute('aria-selected'), 'true'); eq(await page.locator('#panel-ed').isHidden(), true);
      await page.locator('#seqEps').focus(); await page.keyboard.press('ArrowRight'); await has('seqEpsOut', '0,05'); await page.keyboard.press('r'); await has('seqEpsOut', '0,05');
      eq(await page.evaluate(() => Object.isFrozen(LimitLab)), true);
      eq(await page.evaluate(() => /[̀-ͯ]/.test(document.querySelector('main').textContent)), false, 'birleşik işaret (NFC)');
      await noOverflow('son'); assert.deepEqual(errors, []); checks++; await ctx.close();
    }
    console.log(`G limit-ve-sureklilik: ${checks - before} gerçek arayüz kontrolü (390 px açık + 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
