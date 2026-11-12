// G · gen-ifadesi-ve-molekuler-biyoloji.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) node'da yüklenir ve sayfanın kendi formüllerini KULLANMAYAN başvurularla
// karşılaştırılır: amino aside göre gruplanmış ayrı bir genetik şifre tablosu, dize işlemleriyle kurulan iplikler,
// küçük L için 4^L dizinin tamamını sayarak bulunan kesin ORF beklentisi ve büyük Monte Carlo, kapalı biçimin ODE'yi
// sonlu farkla sağlaması, moment (Lyapunov) denklemlerinden Fano çarpanı, OpenStax Tablo 16.2, kendi kök bulucusuyla
// sayılan denge noktaları, repressilatörün 6. derece karakteristik polinomunun Durand–Kerner kökleri.
// `--browser`: 390 px açık ve 1280 px koyu temada gerçek arayüz denetimi.
import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../gen-ifadesi-ve-molekuler-biyoloji.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const win = {};
new Function('window', source)(win); // vm bağlamı bu çekirdekte çok yavaş; ayrı bir işlev kapsamı yeterli
const K = win.GeneLab;
assert(Object.isFrozen(K), 'çekirdek dondurulmuş olmalı');

let checks = 0;
const near = (actual, expected, tol, label = '') => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(1, Math.abs(expected)), `${label} ${actual} ≠ ${expected} (tol ${tol})`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };
const rng = (a) => { let x = (a * 2654435761) >>> 0 || 1; return () => { x ^= x << 13; x >>>= 0; x ^= x >>> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; }; // ayrı üreteç (xorshift32; sayfa mulberry32 kullanır)

// ── 01 · Genetik şifre: amino aside göre gruplanmış bağımsız tablo ──
const GROUPS = { F: 'UUU UUC', L: 'UUA UUG CUU CUC CUA CUG', I: 'AUU AUC AUA', M: 'AUG', V: 'GUU GUC GUA GUG', S: 'UCU UCC UCA UCG AGU AGC', P: 'CCU CCC CCA CCG', T: 'ACU ACC ACA ACG', A: 'GCU GCC GCA GCG', Y: 'UAU UAC', H: 'CAU CAC', Q: 'CAA CAG', N: 'AAU AAC', K: 'AAA AAG', D: 'GAU GAC', E: 'GAA GAG', C: 'UGU UGC', W: 'UGG', R: 'CGU CGC CGA CGG AGA AGG', G: 'GGU GGC GGA GGG', '*': 'UAA UAG UGA' };
const REF = {};
for (const [aa, list] of Object.entries(GROUPS)) for (const c of list.split(' ')) { ok(!(c in REF), 'kodon iki kez: ' + c); REF[c] = aa; }
ok(Object.keys(REF).length === 64 && Object.keys(K.CODE).length === 64, '64 kodon');
for (const c of Object.keys(REF)) ok(K.CODE[c] === REF[c], 'kodon ' + c);
ok(Object.values(REF).filter((a) => a !== '*').length === 61, '61 anlamlı kodon (OpenStax 15.1)');
ok(K.STOPS.slice().sort().join() === 'UAA,UAG,UGA' && K.CODE.AUG === 'M', 'dur ve başlangıç');

// İplikler ve çeviri
const comp = (s) => s.replace(/[ACGT]/g, (c) => ({ A: 'T', T: 'A', G: 'C', C: 'G' })[c]);
const refTranslate = (rna) => { const i = rna.indexOf('AUG'); if (i < 0) return { aug: -1, prot: '', stop: null }; let prot = ''; for (let p = i; p + 3 <= rna.length; p += 3) { const a = REF[rna.substr(p, 3)]; if (a === '*') return { aug: i, prot, stop: p }; prot += a; } return { aug: i, prot, stop: null }; };
const r1 = rng(11);
for (let trial = 0; trial < 500; trial++) {
  const n = 1 + Math.floor(r1() * 200); let s = ''; for (let i = 0; i < n; i++) s += 'ACGT'[Math.floor(r1() * 4)];
  const T = K.transcribe(s, 'coding'), rna = s.split('T').join('U');
  ok(T.mrna === rna && T.template === comp(s), 'kodlayan → mRNA ve kalıp');
  for (let i = 0; i < n; i++) ok({ A: 'U', T: 'A', G: 'C', C: 'G' }[T.template[i]] === T.mrna[i], 'mRNA kalıba tamamlayıcı');
  const tmpl = [...comp(s)].reverse().join(''); // kalıp iplik 5′→3′ yazılmış
  ok(K.transcribe(tmpl, 'template').mrna === rna, 'kalıptan antiparalel mRNA');
  const ref = refTranslate(rna), aug = rna.indexOf('AUG'), tr = K.translate(rna, aug);
  ok(tr.codons.map((c) => c.aa).join('') === ref.prot && (tr.stop ? tr.stop.pos : null) === ref.stop, 'çeviri');
  const fr = K.frames(rna);
  for (let f = 0; f < 3; f++) { let x = ''; for (let p = f; p + 3 <= n; p += 3) x += REF[rna.substr(p, 3)]; ok(fr[f] === x, 'çerçeve ' + f); }
}
const DEF = 'AGGAGGTCAGCTATGGCATCCAAAGGTGAAGAACTGTTCACCGGTTGGCACTAAGCTCGAGC';
const dT = K.transcribe(DEF, 'coding'), dTr = K.translate(dT.mrna, dT.mrna.indexOf('AUG'));
ok(dT.mrna.indexOf('AUG') === 12 && dTr.codons.map((c) => c.aa).join('') === 'MASKGEELFTGWH' && dTr.stop.codon === 'UAA' && dTr.stop.pos === 51, 'örnek gen');
for (const [raw, err] of [['', 'empty'], ['ACGU', 'rna'], ['ACGX', 'char'], ['A'.repeat(301), 'long']]) ok(K.parseDNA(raw).error === err, 'girdi hatası ' + err);
ok(K.parseDNA('ac gt\n12').seq === 'ACGT', 'küçük harf, boşluk, rakam ayıklanır');

// ORF: bağımsız sayım (her dur kodonundan geriye, aynı çerçevedeki AUG'lar)
const refOrfs = (rna, k) => { let c = 0; for (let f = 0; f < 3; f++) { const cod = []; for (let p = f; p + 3 <= rna.length; p += 3) cod.push(rna.substr(p, 3)); let starts = []; for (let j = 0; j < cod.length; j++) { if (REF[cod[j]] === '*') { for (const s0 of starts) if (j - s0 >= k) c++; starts = []; } else if (cod[j] === 'AUG') starts.push(j); } } return c; };
const r2 = rng(5);
for (let trial = 0; trial < 300; trial++) { const L = 30 + Math.floor(r2() * 400); let s = ''; for (let i = 0; i < L; i++) s += 'ACGU'[Math.floor(r2() * 4)]; for (const k of [1, 3, 10, 30]) ok(K.orfs(s, k).length === refOrfs(s, k), 'ORF sayımı'); }
// Kesin beklenti: L ≤ 9 için bütün 4^L dizi sayılır
for (const L of [6, 7, 8, 9]) for (const k of [1, 2]) {
  let tot = 0; const N = 4 ** L;
  for (let x = 0; x < N; x++) { let s = '', y = x; for (let i = 0; i < L; i++) { s += 'ACGU'[y & 3]; y >>= 2; } tot += refOrfs(s, k); }
  near(K.orfExpected(L, k), tot / N, 1e-12, `tam sayım L=${L} k=${k}`);
}
// Büyük Monte Carlo (ayrı üreteç)
for (const [L, k, M] of [[300, 10, 4000], [1000, 30, 3000], [600, 20, 3000]]) {
  const r = rng(L + k); let sum = 0, sum2 = 0;
  for (let q = 0; q < M; q++) { let s = ''; for (let i = 0; i < L; i++) s += 'ACGU'[Math.floor(r() * 4)]; const c = refOrfs(s, k); sum += c; sum2 += c * c; }
  const mean = sum / M, se = Math.sqrt((sum2 / M - mean * mean) / M);
  ok(Math.abs(mean - K.orfExpected(L, k)) < 4 * se, `ORF Monte Carlo L=${L} k=${k}: ${mean} vs ${K.orfExpected(L, k)}`);
  near(K.orfAsymptotic(L, k), (L / 64) * (61 / 64) ** (k - 1), 1e-12, 'asimptotik');
  ok(K.orfAsymptotic(L, k) > K.orfExpected(L, k), 'sonlu uzunluk beklentiyi azaltır');
}
near(K.orfExpected(1000, 30), 3.2889, 1e-4, 'varsayılan beklenti');
for (let s = 1; s <= 10; s++) { const st = K.orfStudy(1000, 30, 200, s); ok(Math.abs(st.mean - K.orfExpected(1000, 30)) < 3.5 * st.se, 'tohum ' + s); }

// ── 02 · mRNA ve protein ──
const lyapunovFano = (q) => { // moment denklemleri: d<mm>, d<mp>, d<pp> = 0 doğrusal sistemi
  const m = q.km / q.gm, p = q.kp * m / q.gp;
  const vm = m; // Var m: 0 = km + gm m − 2 gm Var m
  const cmp = q.kp * vm / (q.gm + q.gp); // 0 = kp Var m − (gm+gp) Cov
  const vp = (q.kp * m + q.gp * p + 2 * q.kp * cmp) / (2 * q.gp); // 0 = kp m + gp p + 2 kp Cov − 2 gp Var p
  return { m, p, fm: vm / m, fp: vp / p };
};
const r3 = rng(9);
for (let trial = 0; trial < 200; trial++) {
  const q = { km: 0.1 + 4.9 * r3(), gm: 0.05 + 0.95 * r3(), kp: 0.1 + 9.9 * r3(), gp: 0.005 + 0.195 * r3() };
  const S = K.exprSteady(q), L = lyapunovFano(q);
  near(S.m, L.m, 1e-12, 'm*'); near(S.p, L.p, 1e-12, 'p*'); near(S.fanoP, L.fp, 1e-12, 'Fano kuramı'); near(S.burst, q.kp / q.gm, 1e-12, 'b');
  for (const t of [0.3, 2, 10, 60]) { // kapalı biçim ODE'yi sonlu farkla sağlar
    const h = 1e-4 * Math.max(1, t), a = K.exprAnalytic(q, t), ap = K.exprAnalytic(q, t + h), am = K.exprAnalytic(q, t - h);
    near((ap.m - am.m) / (2 * h), q.km - q.gm * a.m, 1e-5, 'dm/dt'); near((ap.p - am.p) / (2 * h), q.kp * a.m - q.gp * a.p, 1e-5 * S.p, 'dp/dt');
  }
  const z = K.exprAnalytic(q, 0); near(z.m, 0, 1e-12); near(z.p, 0, 1e-9 * S.p);
}
{ // eşit hızlar sınırı
  const q = { km: 1, gm: 0.1, kp: 1, gp: 0.1 }, t = 7, a = K.exprAnalytic(q, t), b = K.exprAnalytic({ ...q, gp: 0.1 + 1e-7 }, t);
  near(a.p, b.p, 1e-5, 'γm = γp sınırı');
}
for (const q of [{ km: 1, gm: 0.2, kp: 2, gp: 0.02 }, { km: 0.2, gm: 0.1, kp: 5, gp: 0.02 }, { km: 3, gm: 1, kp: 0.5, gp: 0.2 }]) {
  const I = K.exprIntegrate(q, 8 * Math.max(1 / q.gp, 1 / q.gm), 0.05);
  near(I.cross.m50, Math.LN2 / q.gm, 1e-4, 'mRNA yarı yükselme'); near(I.cross.m63, 1 / q.gm, 1e-4, 'mRNA 1/γm');
  near(I.cross.p50, K.exprAnalyticCross(q, 'p', 0.5), 1e-4, 'protein yarı'); ok(I.maxErr < 1e-6, 'RK4 hatası');
  // bağımsız: protein yarı yükselme anı ikiye bölmeyle, kapalı biçimin kendi yazımıyla
  const pf = (t) => 1 - (q.gm * Math.exp(-q.gp * t) - q.gp * Math.exp(-q.gm * t)) / (q.gm - q.gp); let lo = 0, hi = 1e4; for (let i = 0; i < 200; i++) { const c = (lo + hi) / 2; if (pf(c) < 0.5) lo = c; else hi = c; }
  near(I.cross.p50, lo, 1e-4, 'protein yarı (bağımsız)');
  ok(I.cross.p63 > 1 / q.gp, 'protein %63 anı 1/γp\'den geç');
}
// Gillespie: birkaç tohum, ölçüm kuramla belirsizlik içinde
for (const q of [{ km: 1, gm: 0.2, kp: 2, gp: 0.02 }, { km: 5, gm: 0.5, kp: 0.5, gp: 0.02 }, { km: 0.2, gm: 0.1, kp: 5, gp: 0.02 }]) {
  const S = K.exprSteady(q); let fpSum = 0, n = 0;
  for (let seed = 1; seed <= 4; seed++) {
    const G = K.gillespie(q, { burn: 5 / q.gp + 5 / q.gm, window: 500 / q.gp, seed, batches: 20 });
    ok(Math.abs(G.m.mean - S.m) < 5 * G.m.meanSE + 1e-9, 'mRNA ortalaması'); ok(Math.abs(G.p.mean - S.p) < 5 * G.p.meanSE, 'protein ortalaması');
    ok(Math.abs(G.m.fano - 1) < 0.08, 'mRNA Fano ≈ 1: ' + G.m.fano); ok(Math.abs(G.p.fano - S.fanoP) / S.fanoP < 0.2, `protein Fano ${G.p.fano} ~ ${S.fanoP}`);
    ok(Math.abs(G.burst - S.burst) / S.burst < 0.05, 'patlama boyu'); fpSum += G.p.fano; n++;
  }
  ok(Math.abs(fpSum / n - S.fanoP) / S.fanoP < 0.1, 'dört tohum ortalaması Fano');
}
{ const G = K.gillespie({ km: 1, gm: 0.2, kp: 2, gp: 0.02 }, { burn: 250, window: 100, seed: 3, record: 50, recFrom: 250, recTo: 350 }); ok(G.tr.length >= 50 && G.tr[0][0] >= 250 && G.tr.at(-1)[0] <= 350 + 1e-6, 'kayıt penceresi'); }

// ── 03 · lac ──
const OPENSTAX = [['yok', true, false], ['düşük', true, true], ['yok', false, false], ['yüksek', false, true]]; // Tablo 16.2 transkripsiyon sütunu: No / Some / No / Yes
for (const n of [1, 1.5, 2, 3, 4]) { const t = K.lacTruth(n); t.forEach((r, i) => { ok(r.glucose === OPENSTAX[i][1] && r.lactose === OPENSTAX[i][2] && r.cls === OPENSTAX[i][0], `doğruluk tablosu n=${n} satır ${i}`); ok(r.cap === !r.glucose && r.repressor === !r.lactose, 'CAP/baskılayıcı'); }); }
for (const glucose of [true, false]) { let prev = -1; for (let i = 0; i <= 400; i++) { const v = K.lacLevel({ glucose, I: i / 40, n: 2 }); ok(v >= prev - 1e-15 && v <= (glucose ? 0.1 : 1) + 1e-12, 'tekdüze ve sınırlı'); prev = v; } }
near(K.lacLevel({ glucose: false, I: 1, n: 3 }), 0.01 + 0.99 * 0.5, 1e-12, 'I = K yarı');
// Geri besleme: süpürme eşikleri katlanma noktalarında; aradaki her I'de üç denge, dışarıda bir
for (const n of [1.5, 2, 2.5, 3, 4]) for (const a0 of [0.01, 0.02, 0.05]) {
  const p = { K: 1, eps: 0.01, a0, n }, F = K.fbFolds(p);
  const count = (I) => { const g = (y) => K.fbF(y, I, p) - y; let c = 0, prev = g(0); for (let i = 1; i <= 20000; i++) { const v = g(i / 20000); if (prev * v < 0) c++; prev = v; } return c; };
  if (!F.bistable) { ok(count(1) === 1 && count(3) === 1, 'tek durum'); continue; }
  if (F.on.I > 5) continue;
  const S = K.fbSweep(p, 5, 0.01);
  ok(Math.abs(S.Ion - F.on.I) <= 0.0051 && Math.abs(S.Ioff - F.off.I) <= 0.0051, `eşikler n=${n} a0=${a0}: ${S.Ion}/${F.on.I} ${S.Ioff}/${F.off.I}`);
  ok(count((F.on.I + F.off.I) / 2) === 3 && count(F.off.I * 0.97) === 1 && count(F.on.I * 1.03) === 1, 'denge sayısı');
  const st = K.fbSteadyStates((F.on.I + F.off.I) / 2, p); ok(st.length === 3 && st[0].stable && !st[1].stable && st[2].stable, 'kararlılık');
}
for (const a0 of [0.01, 0.05, 0.2]) ok(!K.fbFolds({ K: 1, eps: 0.01, a0, n: 1 }).bistable, 'n = 1 tek değerli');
{ const p = { K: 1, eps: 0.01, a0: 0.02, n: 2 }; near(K.fbRelax(0.01, 2.4, p, 2000), 0.018, 0.05, 'geçmiş: kapalı'); ok(K.fbRelax(1, 2.4, p, 2000) > 0.7, 'geçmiş: açık'); }

// ── 04 · Anahtar ──
for (const n of [1.2, 1.5, 2, 3, 4]) {
  const ac = K.toggleAlphaCrit(n), s = Math.pow(n - 1, -1 / n);
  near(ac, s * (1 + s ** n), 1e-12, 'α_c = s(1+s^n)'); near(n * s ** n / (1 + s ** n), 1, 1e-12, 'eşikte simetrik noktada eğim 1');
  for (const [a, expect] of [[ac * 0.9, 1], [ac * 1.15, 3]]) {
    // bağımsız: u-v düzleminde kendi taramamızla sabit nokta sayısı (u = α/(1+v^n), v = α/(1+u^n))
    let c = 0; const g = (u) => a / (1 + Math.pow(a / (1 + u ** n), n)) - u; let pr = g(0); for (let i = 1; i <= 200000; i++) { const v = g(a * i / 200000); if (pr * v < 0 || v === 0) c++; pr = v; }
    ok(c === expect && K.toggleFixed(a, n).length === expect, `anahtar denge sayısı n=${n} α=${a}`);
  }
  if (ac < 19) { const sw = K.toggleSweep(n, 0.5, 20, 0.02); ok(sw && sw.alpha >= ac - 1e-9 && sw.prev < ac + 0.02, `α_c taraması n=${n}: ${sw?.alpha} ~ ${ac}`); }
}
near(K.toggleAlphaCrit(2), 2, 1e-12, 'n = 2: α_c = 2'); ok(K.toggleAlphaCrit(1) === Infinity, 'n = 1 eşik yok');
{ const r2r = rng(3); for (let i = 0; i < 40; i++) { const u0 = 20 * r2r(), v0 = 20 * r2r(); if (Math.abs(u0 - v0) < 0.05) continue; const end = K.toggleRun(u0, v0, 10, 2, 60); ok((end.u > end.v) === (u0 > v0) && Math.abs(Math.max(end.u, end.v) - 9.899) < 0.01, 'köşegen ayırıcı'); } }
// ── 04 · Repressilatör ──
const polyRoots = (c) => { // Durand–Kerner, monik polinom katsayıları (yüksekten düşüğe)
  const n = c.length - 1, cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], cd = (a, b) => { const d = b[0] ** 2 + b[1] ** 2; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
  let z = Array.from({ length: n }, (_, k) => { const r = 1.3, t = 2 * Math.PI * k / n + 0.4; return [r * Math.cos(t), r * Math.sin(t)]; });
  const ev = (x) => { let v = [1, 0]; for (let i = 1; i <= n; i++) { v = cm(v, x); v[0] += c[i]; } return v; };
  for (let it = 0; it < 2000; it++) z = z.map((zi, i) => { let d = [1, 0]; z.forEach((zj, j) => { if (j !== i) d = cm(d, [zi[0] - zj[0], zi[1] - zj[1]]); }); const f = cd(ev(zi), d); return [zi[0] - f[0], zi[1] - f[1]]; });
  return z;
};
for (const q0 of [{ a: 100, a0: 0, b: 0.2 }, { a: 50, a0: 0.5, b: 1 }, { a: 20, a0: 0, b: 0.2 }, { a: 300, a0: 2, b: 1.5 }]) for (const n of [1.3, 1.8, 2.5, 3.5]) {
  const q = { ...q0, n };
  let lo = 0, hi = q.a + q.a0 + 1, p = Math.pow(q.a, 1 / (n + 1)); for (let i = 0; i < 300; i++) { const f = p - q.a / (1 + p ** n) - q.a0, df = 1 + q.a * n * p ** (n - 1) / (1 + p ** n) ** 2; if (f > 0) hi = p; else lo = p; let np = p - f / df; if (!(np > lo && np < hi)) np = (lo + hi) / 2; p = np; } // korumalı Newton
  const h = 1e-6 * p, a = -(q.a / (1 + (p + h) ** n) - q.a / (1 + (p - h) ** n)) / (2 * h); // sonlu farkla eğim
  near(K.repFixed(q), p, 1e-9, 'denge p*');
  // ((λ+1)(λ+β))³ + (aβ)³ = 0 → (λ² + (1+β)λ + β)³ + (aβ)³
  const B = 1 + q.b, C = q.b, P2 = [1, B, C], mul = (x, y) => { const r = Array(x.length + y.length - 1).fill(0); x.forEach((u, i) => y.forEach((v, j) => { r[i + j] += u * v; })); return r; };
  const P6 = mul(mul(P2, P2), P2); P6[6] += (a * q.b) ** 3;
  const roots = polyRoots(P6), maxRe = Math.max(...roots.map((r) => r[0])), L = K.repLinear(q);
  near(L.re, maxRe, 1e-6, `en büyük Re λ n=${n}`);
  const top = roots.filter((r) => Math.abs(r[0] - maxRe) < 1e-6); near(L.im, Math.abs(top[0][1]), 1e-5, 'Im λ');
}
for (const q of [{ a: 100, a0: 0, b: 0.2 }, { a: 50, a0: 0, b: 1 }, { a: 20, a0: 0, b: 0.2 }]) {
  const nc = K.repNCrit(q);
  ok(K.repRun({ ...q, n: nc + 0.25 }, 800).sustained && !K.repRun({ ...q, n: nc - 0.25 }, 800).sustained, `n_c çevresinde salınım ${nc}`);
  const sw = K.repSweepN(q, 1, 4, 0.05); ok(sw >= nc - 1e-9 && sw - 0.05 < nc + 0.02, `n taraması ${sw} ~ ${nc}`);
  const near1 = K.repRun({ ...q, n: Math.ceil((nc + 0.02) / 0.05) * 0.05 }, 800), lin = K.repLinear({ ...q, n: Math.ceil((nc + 0.02) / 0.05) * 0.05 });
  ok(near1.period !== null && Math.abs(near1.period - lin.period) / lin.period < 0.12, `eşikte periyot doğrusal kurama yakın: ${near1.period} / ${lin.period}`);
}
{ // periyot: ayrı ölçüm (zirveler arası) sayfanınkiyle aynı
  const r = K.repRun({ a: 100, a0: 0, b: 0.2, n: 2 }, 800, 0.01, 80000), tr = r.tr.filter((x) => x[0] > 400), pk = [];
  for (let i = 1; i < tr.length - 1; i++) if (tr[i][1] > tr[i - 1][1] && tr[i][1] >= tr[i + 1][1]) pk.push(tr[i][0]);
  near(r.period, (pk.at(-1) - pk[0]) / (pk.length - 1), 0.01, 'periyot zirve aralığıyla');
  near(r.period, 42.42, 0.001, 'varsayılan periyot');
}

console.log(`G gen-ifadesi: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);

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
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); }); // defter artık var: 404 dahil hiçbir konsol hatası hoş görülmez
      page.on('response', (r) => { if (r.status() >= 400) errors.push(r.status() + ' ' + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/gen-ifadesi-ve-molekuler-biyoloji.html`);
      const click = (id) => page.locator('#' + id).click();
      const read = async (id) => (await page.locator('#' + id).textContent()).trim();
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `[${width}] ${id}: "${t}" içinde "${text}" yok`); checks++; };
      const lacks = async (id, text) => { const t = await read(id); assert(!t.includes(text), `[${width}] ${id}: "${t}" içinde "${text}" olmamalı`); checks++; };
      const range = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v);
      const select = (id, v) => page.locator('#' + id).selectOption(v);
      const noOverflow = async (label) => { ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `[${width}] yatay taşma: ${label}`); };
      const painted = async (id) => { ok(await page.locator('#' + id).evaluate((c) => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; const s = new Set(); for (let i = 0; i < d.length; i += 4 * 97) s.add(d[i] + ',' + d[i + 1] + ',' + d[i + 2]); return c.width > 100 && s.size > 5; }), `[${width}] boş tuval ${id}`); };
      const noNaN = async (panel) => { const t = await page.locator('#panel-' + panel).innerText(); ok(!/NaN|undefined|Infinity/.test(t), `[${width}] ${panel} NaN/undefined`); };
      const rangeReach = async (id, v) => ok(await page.locator('#' + id).evaluate((e, v) => { const mn = +e.min, st = +e.step; return Math.abs(((v - mn) / st) - Math.round((v - mn) / st)) < 1e-6 && v >= mn && v <= +e.max; }, v), `${id}=${v} adımla erişilebilir`);

      ok(await page.evaluate(() => [...document.querySelectorAll('main input, main select')].every((e) => document.querySelector(`label[for="${e.id}"]`))), 'her denetimin etiketi var');
      ok(await page.evaluate(() => [...document.querySelectorAll('main canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), 'tuvaller role=img');
      ok(await page.evaluate(() => Object.isFrozen(GeneLab) && !Object.getOwnPropertyDescriptor(window, 'GeneLab').writable), 'çekirdek dondurulmuş');
      ok(await page.evaluate(() => !/[̀-ͯ]/.test(document.querySelector('main').textContent.normalize('NFC'))), 'birleşik işaret yok');
      ok(await page.evaluate(() => !document.querySelector('link[href*="atlas"],link[href*="stem-bridge"],script[src*="atlas"],script[src*="stem"],link[href*="fonts.googleapis"]')), 'eski STEM/Atlas ve Google Fonts yok');
      for (const [id, v] of [['dKm', 0.2], ['dGm', 0.1], ['dKp', 5], ['dKm', 5], ['dGm', 0.5], ['dKp', 0.5], ['lI', 2.4], ['lN', 1], ['gA', 1.5], ['rN', 1.65], ['orfK', 10], ['orfL', 300]]) await rangeReach(id, v);

      // 01
      await has('txAUG', '13. nükleotit · çerçeve +1'); await has('txPLen', '13 amino asit'); await has('txStop', 'UAA · 52. nükleotitte'); await has('txProt', 'MASKGEELFTGWH');
      await has('txProt', 'Met–Ala–Ser'); await has('txStrands', "5′-AGGAGGUCAG"); await has('txStrands', '3′-TCCTCCAGTC'); await has('txFrames', 'RRSAMASKGEELFTGWH*AR');
      await has('orfExp', '3.29'); await has('orfMeas', '2.99 ± 0.14'); await has('orfAsym', '3.88'); await has('orfGene', '0 ORF'); await painted('txCanvas'); await painted('orfChart'); await noOverflow('tx');
      await click('txPNoStop'); await has('txPLen', '(dur yok)'); await has('txStatus', 'dur kodonu yok'); await has('txStop', 'yok');
      await click('txPNoAug'); await has('txAUG', 'yok'); await has('txStatus', 'AUG yok');
      await page.locator('#txSeq').fill('ACGU'); await has('txStatus', 'U var'); await has('txAUG', 'yok');
      const rc = [...DEF].reverse().map((c) => ({ A: 'T', T: 'A', G: 'C', C: 'G' })[c]).join('');
      await page.locator('#txSeq').fill(rc); await select('txStrand', 'template'); await has('txProt', 'MASKGEELFTGWH'); await has('txStatus', 'ters tamamlayıcısıdır');
      await click('txPRand'); await has('txLen', '120 nt'); await noNaN('tx');
      await range('orfL', 300); await range('orfK', 10); await has('orfExp', '2.11'); await range('orfK', 100); await has('orfExp', '0'); await has('orfStatus', 'neredeyse hiç'); await noNaN('tx');
      await click('txReset'); await has('txPLen', '13 amino asit'); await has('orfExp', '3.29'); await has('orfLOut', '1000 nt');
      await click('txPlay'); await has('txPlay', 'Duraklat'); await page.waitForTimeout(400); await click('txPlay'); await has('txPlay', 'Sürdür'); await painted('txCanvas');

      // 02
      await click('tab-dyn'); await has('dMs', '5.00 mRNA'); await has('dPs', '500 protein'); await has('dTm', '3.47 dk · 3.47 dk'); await has('dTp', '39.9 dk · 39.9 dk'); await has('dTp63', '55.3 dk · 55.3 dk · 50.0 dk');
      await has('dFp', '· 10.09'); await has('dFm', '· 1'); await has('dB', '· 10.0'); await has('dRule', '11.0'); await painted('dynCanvas'); await painted('gilCanvas'); await noOverflow('dyn');
      await click('dPBurst'); await has('dB', '· 50.0'); await has('dPs', '500 protein'); await has('dFp', '· 42.67'); await noNaN('dyn');
      await click('dPCalm'); await has('dB', '· 1.00'); await has('dMs', '10.0 mRNA');
      await range('dKm', 5); await range('dGm', 0.05); await range('dKp', 10); await range('dGp', 0.005); await select('dWin', '2000'); await has('dynStatus', 'kısaltıldı'); await noNaN('dyn');
      await range('dKm', 0.1); await range('dGm', 1); await range('dKp', 0.1); await range('dGp', 0.2); await has('dynStatus', 'hiç mRNA taşımaz'); await noNaN('dyn');
      await click('dynReset'); await has('dMs', '5.00 mRNA'); await has('dKmOut', '1.0 mRNA/dk');

      // 03
      await click('tab-lac'); ok((await page.locator('#lTruth .ge-ok').count()) === 4, 'OpenStax tablosuyla dört satır uyuşuyor'); checks++; ok((await read('lTruth')).includes('evet · uyuşuyor') && !(await read('lTruth')).includes('yüksek · uyuşuyor'), 'OpenStax sütunu kaynağın sözcüğünü (Yes → evet) yazar');
      await has('lOn', '2.945 K · 2.948 K'); await has('lOff', '1.905 K · 1.901 K'); await has('lWidth', '1.040 K'); await has('lCur', 'kapalı'); await has('lStates', '2 / 3'); await has('lLevel', '85.4 %');
      await painted('lacCurve'); await painted('lacLoop'); await noOverflow('lac');
      await select('lHist', 'on'); await has('lCur', 'indüklenmiş'); await has('lacStatus', 'açık kalır');
      await select('lGlu', '1'); await has('lLevel', '8.5 % · düşük'); await has('lacStatus', 'katabolit');
      await click('lPN1'); await has('lOn', 'sıçrama yok'); await has('lWidth', '0 (tek'); await has('lacStatus', 'n = 1');
      await click('lacReset'); await has('lCur', 'kapalı'); await range('lN', 4); await range('lA0', 0.2); await range('lI', 5); await noNaN('lac'); await range('lI', 0); await has('lLevel', '1.0 %'); await noNaN('lac');
      await click('lacReset'); await click('lPMid'); await has('lCur', 'indüklenmiş'); await click('lPMid'); await has('lCur', 'kapalı');

      // 04
      await click('tab-net'); await has('gFixed', '2 / 3'); await has('gEnd', '(9.90, 0.10) · (9.90, 0.10)'); await has('gAc', '2.02 (önceki adım 2.00) · 2.000'); await has('gGain', '2.560');
      await has('rPer', '42.42'); await has('rPerLin', '24.53'); await has('rRe', '+0.0453'); await has('rNc', 'tara düğmesine bas · 1.611'); await has('rMin', '122.4 dk');
      await painted('togCanvas'); await painted('repCanvas'); await noOverflow('net');
      await click('gPulse'); await has('gEnd', '(u, v) = (0.10, 9.90)'); await has('togStatus', "v'nin yüksek");
      await click('gPWeak'); await has('gFixed', '1 / 1'); await has('togStatus', 'α > 2.000');
      await range('gN', 1); await has('gAc', 'n = 1'); await noNaN('net'); await click('togReset'); await range('gU0', 4); await range('gV0', 4); await has('togStatus', 'köşegen');
      await click('togReset'); await has('gU0Out', '3.0');
      await click('rSweep'); await has('rNc', '1.65 (önceki 1.60) · 1.611');
      await click('rPNear'); const per = await read('rPerLin'); const m = per.match(/ölçülenden ([−+])([\d.]+) %/); ok(m && +m[2] < 10, 'eşikte doğrusal periyot ölçülene yakın: ' + per);
      await range('rN', 1.3); await has('rPer', 'salınım yok'); await has('repStatus', 'Salınım yok'); await noNaN('net');
      await range('rN', 4); await range('rA', 500); await range('rB', 2); await range('rA0', 5); await noNaN('net'); await range('rA', 5); await noNaN('net');
      await click('repReset'); await has('rPer', '42.42'); await click('rPlay'); await has('rPlay', 'Duraklat'); await page.waitForTimeout(300); await click('rPlay'); await has('rPlay', 'Oynat');
      await select('rHalf', '10'); await has('rMin', 'dk'); await lacks('rMin', '122.4');

      // Klavye
      await page.locator('#tab-net').focus(); await page.keyboard.press('Home'); ok((await page.locator('#tab-tx').getAttribute('aria-selected')) === 'true', 'Home');
      await page.keyboard.press('ArrowRight'); ok((await page.locator('#tab-dyn').getAttribute('aria-selected')) === 'true', 'ArrowRight');
      await page.keyboard.press('End'); ok((await page.locator('#tab-net').getAttribute('aria-selected')) === 'true', 'End');
      await page.keyboard.press('ArrowRight'); ok((await page.locator('#tab-tx').getAttribute('aria-selected')) === 'true', 'sarma'); ok(await page.locator('#panel-dyn').isHidden(), 'öteki paneller gizli');
      await page.keyboard.press('ArrowRight'); await range('dKm', 3); await page.locator('h1').click(); await page.keyboard.press('r'); await has('dKmOut', '1.0 mRNA/dk');
      await click('tab-tx'); await page.locator('h1').click(); await page.keyboard.press('Space'); await has('txPlay', 'Duraklat'); await page.keyboard.press('Space'); await has('txPlay', 'Sürdür');
      await page.locator('#orfK').focus(); await page.keyboard.press('r'); await has('txPlay', 'Sürdür');
      await noOverflow('son'); assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      await ctx.close();
    }
    console.log(`G gen-ifadesi: ${checks - before} arayüz kontrolü (390 px açık + 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
