// G · periyodik-tablo.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) node'da yüklenir ve sayfanın kendi formüllerini KULLANMAYAN başvurularla
// karşılaştırılır: NIST ASD'den indirilip buraya elle gömülen temel hâl dizilimleri, terim çoklukları ve iyonlaşma
// enerjileri; Wikipedia "Slater's rules" sayfasındaki demir örneği; elektron elektron dolaşan ikinci bir Slater
// uygulaması; kaba kuvvetle üretilen Madelung sırası; PubChem, Wikipedia yarıçap sayfası ve "Mendeleev's predicted
// elements" sayfasından elle yazılmış değerler; bağımsız Pearson hesabı.
// `--browser`: 390 px açık ve 1280 px koyu temada gerçek arayüz denetimi.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../periyodik-tablo.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.PeriyodikLab;
assert(Object.isFrozen(K) && Object.isFrozen(K.ELEMENTS) && Object.isFrozen(K.ELEMENTS[0]), 'çekirdek dondurulmuş olmalı');

let checks = 0;
const near = (a, e, tol, label = '') => { assert(Number.isFinite(a) && Math.abs(a - e) <= tol, `${label} ${a} ≠ ${e} (tol ${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
const L = 'spdf';

// ── NIST ASD (Ionization Energies, nötr atomlar, 11 Kasım 2026'da indirildi): dizilim | 2S+1 | IE (eV; yarı deneysel ya da kuramsal olanlar boş) ──
const NIST = '1s|2|13.598434599702 1s2|1|24.587389011 1s2.2s|2|5.391714996 1s2.2s2|1|9.322699 1s2.2s2.2p|2|8.298019 1s2.2s2.2p2|3|11.2602880 1s2.2s2.2p3|4|14.53413 1s2.2s2.2p4|3|13.618055 1s2.2s2.2p5|2|17.42282 1s2.2s2.2p6|1|21.564541 [Ne].3s|2|5.13907696 [Ne].3s2|1|7.646236 [Ne].3s2.3p|2|5.985769 [Ne].3s2.3p2|3|8.15168 [Ne].3s2.3p3|4|10.486686 [Ne].3s2.3p4|3|10.3600167 [Ne].3s2.3p5|2|12.967633 [Ne].3s2.3p6|1|15.7596119 [Ar].4s|2|4.34066373 [Ar].4s2|1|6.1131549210 [Ar].3d.4s2|2|6.56149 [Ar].3d2.4s2|3|6.828120 [Ar].3d3.4s2|4|6.746187 [Ar].3d5.4s|7|6.76651 [Ar].3d5.4s2|6|7.4340380 [Ar].3d6.4s2|5|7.9024681 [Ar].3d7.4s2|4|7.88101 [Ar].3d8.4s2|3|7.639878 [Ar].3d10.4s|2|7.726380 [Ar].3d10.4s2|1|9.394197 [Ar].3d10.4s2.4p|2|5.9993020 [Ar].3d10.4s2.4p2|3|7.899435 [Ar].3d10.4s2.4p3|4|9.78855 [Ar].3d10.4s2.4p4|3|9.752368 [Ar].3d10.4s2.4p5|2|11.81381 [Ar].3d10.4s2.4p6|1|13.9996055 [Kr].5s|2|4.1771281 [Kr].5s2|1|5.69486745 [Kr].4d.5s2|2|6.21726 [Kr].4d2.5s2|3|6.634126 [Kr].4d4.5s|6|6.75885 [Kr].4d5.5s|7|7.09243 [Kr].4d5.5s2|6|7.11938 [Kr].4d7.5s|5|7.36050 [Kr].4d8.5s|4|7.45890 [Kr].4d10|1|8.336839 [Kr].4d10.5s|2|7.576234 [Kr].4d10.5s2|1|8.993820 [Cd].5p|2|5.7863558 [Cd].5p2|3|7.343918 [Cd].5p3|4|8.608389 [Cd].5p4|3|9.009808 [Cd].5p5|2|10.451236 [Cd].5p6|1|12.1298437 [Xe].6s|2|3.89390572743 [Xe].6s2|1|5.2116646 [Xe].5d.6s2|2|5.5769 [Xe].4f.5d.6s2|1|5.5386 [Xe].4f3.6s2|4| [Xe].4f4.6s2|5|5.52475 [Xe].4f5.6s2|6|5.58187 [Xe].4f6.6s2|7|5.643722 [Xe].4f7.6s2|8|5.670385 [Xe].4f7.5d.6s2|9|6.14980 [Xe].4f9.6s2|6|5.8638 [Xe].4f10.6s2|5|5.939061 [Xe].4f11.6s2|4|6.0215 [Xe].4f12.6s2|3|6.1077 [Xe].4f13.6s2|2|6.184402 [Xe].4f14.6s2|1|6.254160 [Xe].4f14.5d.6s2|2|5.425871 [Xe].4f14.5d2.6s2|3|6.825070 [Xe].4f14.5d3.6s2|4|7.549571 [Xe].4f14.5d4.6s2|5|7.86403 [Xe].4f14.5d5.6s2|6|7.83352 [Xe].4f14.5d6.6s2|5|8.43823 [Xe].4f14.5d7.6s2|4|8.96702 [Xe].4f14.5d9.6s|3|8.95883 [Xe].4f14.5d10.6s|2|9.225554 [Xe].4f14.5d10.6s2|1|10.437504 [Hg].6p|2|6.1082873 [Hg].6p2|-|7.4166799 [Hg].6p3|4|7.285516 [Hg].6p4|3|8.418070 [Hg].6p5|2|9.31751 [Hg].6p6|1|10.74850 [Rn].7s|2|4.0727411 [Rn].7s2|1|5.2784239 [Rn].6d.7s2|2|5.380235 [Rn].6d2.7s2|3|6.30670 [Rn].5f2.6d.7s2|4| [Rn].5f3.6d.7s2|5|6.19405 [Rn].5f4.6d.7s2|6|6.265608 [Rn].5f6.7s2|7|6.02576 [Rn].5f7.7s2|8|5.97381 [Rn].5f7.6d.7s2|9|5.992241 [Rn].5f9.7s2|6|6.19785 [Rn].5f10.7s2|5|6.281878 [Rn].5f11.7s2|4|6.36840 [Rn].5f12.7s2|3| [Rn].5f13.7s2|2| [Rn].5f14.7s2|1|6.62621 [Rn].5f14.7s2.7p|2|4.96'.split(' ').map((s) => { const [sh, m, ie] = s.split('|'); return { sh, mult: m === '-' ? null : Number(m), ie: ie ? Number(ie) : null }; });
ok(NIST.length === 103, 'NIST başvurusu 103 element');
const NOBLE_CONF = {};
function nistOcc(z) { // NIST yazımı: [Ne].3s2.3p, [Cd].5p, [Hg].6p2 ...
  const occ = {}; let parts = NIST[z - 1].sh.split('.');
  const core = { '[He]': 2, '[Ne]': 10, '[Ar]': 18, '[Kr]': 36, '[Xe]': 54, '[Rn]': 86, '[Cd]': 48, '[Hg]': 80 }[parts[0]];
  if (core) { Object.assign(occ, nistOcc(core)); parts = parts.slice(1); }
  for (const p of parts) { const m = /^(\d[spdf])(\d*)$/.exec(p); occ[m[1]] = (occ[m[1]] || 0) + (m[2] ? Number(m[2]) : 1); }
  return occ;
}
const same = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].every((k) => (a[k] || 0) === (b[k] || 0));

// ── Veri bütünlüğü ──
ok(K.ELEMENTS.length === 118 && K.ELEMENTS.every((e, i) => e.z === i + 1), '118 element sırayla');
ok(new Set(K.ELEMENTS.map((e) => e.s)).size === 118, 'semboller tekil');
ok(K.el(26).s === 'Fe' && K.el(79).n === 'Altın' && K.el(118).s === 'Og', 'sembol/ad örnekleri');
for (const e of K.ELEMENTS) ok(Object.values(K.parse(e.conf)).reduce((a, b) => a + b, 0) === e.z, 'elektron sayısı ' + e.s);
// Konum: her (satır, sütun) tekil, periyot uzunlukları 2, 8, 8, 18, 18, 32, 32
ok(new Set(K.ELEMENTS.map((e) => e.row + ',' + e.col)).size === 118, 'kutular çakışmıyor');
ok(JSON.stringify([1, 2, 3, 4, 5, 6, 7].map((p) => K.ELEMENTS.filter((e) => e.period === p).length)) === '[2,8,8,18,18,32,32]', 'periyot uzunlukları');
ok(K.el(26).group === 8 && K.el(57).group === null && K.el(2).block === 's' && K.el(2).group === 18, 'grup ve blok örnekleri');

// ── NIST ile karşılaştırma: dizilim (Z ≤ 103) ve IE ──
for (let z = 1; z <= 103; z++) ok(same(K.parse(K.el(z).conf), nistOcc(z)), 'NIST dizilimi ' + z);
let ieCount = 0;
for (let z = 1; z <= 103; z++) { const e = K.el(z), r = NIST[z - 1]; if (e.ie == null) continue; ieCount++; if (r.ie != null) near(e.ie, r.ie, 6e-5, 'NIST IE ' + e.s); }
ok(ieCount === 100 && K.el(91).ie === null && K.el(100).ie === null && K.el(104).ie === null, 'IE: 100 element, Pa/Fm/Md/Z≥104 boş');

// ── Madelung sırası: kaba kuvvet ve ders kitabı dizisi ──
const brute = []; for (let n = 1; n <= 8; n++) for (let l = 0; l < n && l < 4; l++) brute.push([n, l]);
brute.sort((a, b) => (a[0] + a[1]) * 100 + a[0] - ((b[0] + b[1]) * 100 + b[0]));
ok(JSON.stringify(brute.map(([n, l]) => n + L[l])) === JSON.stringify(K.ORDER.map((s) => s.key)), 'Madelung sırası kaba kuvvetle aynı');
ok(K.ORDER.slice(0, 19).map((s) => s.key).join(' ') === '1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f 6d 7p', 'ders kitabı sırası');
function myAufbau(n) { const occ = {}; let left = n; for (const [nn, l] of brute) { if (!left) break; const c = Math.min(2 * (2 * l + 1), left); occ[nn + L[l]] = c; left -= c; } return occ; }
for (let z = 1; z <= 118; z++) { ok(same(K.aufbau(z), myAufbau(z)), 'aufbau ' + z); ok(K.fillSequence(z).length === z, 'dolum dizisi ' + z); }
for (const z of [7, 30, 57, 80]) for (let c = 0; c <= z; c++) ok(same(K.aufbau(z, c), myAufbau(c)), `kısmi dolum ${z}/${c}`);
// İstisnalar: NIST dizilimi ile bağımsız Madelung karşılaştırması
const exc = []; for (let z = 1; z <= 103; z++) if (!same(nistOcc(z), myAufbau(z))) exc.push(K.el(z).s);
ok(exc.join(' ') === 'Cr Cu Nb Mo Ru Rh Pd Ag La Ce Gd Pt Au Ac Th Pa U Np Cm Lr', 'NIST\'e göre 20 istisna: ' + exc.join(' '));
ok(JSON.stringify(K.EXCEPTIONS.map((z) => K.el(z).s)) === JSON.stringify(exc), 'sayfanın istisna listesi');
ok(K.ELEMENTS.filter((e) => e.z >= 104).every((e) => !e.exception), 'Z ≥ 104 karşılaştırılmaz');
const cr = K.electronInfo(24); ok(cr.differences.map((d) => d.key + d.rule + d.meas).join(',') === '4s21,3d45', 'Cr farkı');
ok(K.el(46).ruleConf === '[Kr] 4d8 5s2' && K.el(64).ruleConf === '[Xe] 4f8 6s2' && K.el(29).ruleConf === '[Ar] 3d9 4s2', 'kural dizilimleri');
ok(K.electronInfo(26, 18).ruleText === '[Ne] 3s2 3p6' && K.electronInfo(26, 0).ruleText === '—', 'kısmi dizilim yazımı');

// ── Hund: eşleşmemiş elektron = NIST terim çokluğu − 1 (Ce ve 2S+1 vermeyen Pb dışında) ──
const hundMiss = [];
for (let z = 1; z <= 103; z++) { const m = NIST[z - 1].mult; if (m == null) continue; if (K.unpaired(nistOcc(z)) !== m - 1) hundMiss.push(K.el(z).s); }
ok(hundMiss.join(' ') === 'Ce', 'Hund çokluğu yalnız Ce\'de tutmaz: ' + hundMiss.join(' '));
for (let l = 0; l < 4; l++) for (let e = 0; e <= 2 * (2 * l + 1); e++) { const b = K.hund(l, e); ok(b.length === 2 * l + 1 && b.reduce((a, x) => a + x.up + x.down, 0) === e && b.every((x) => x.up || !x.down), `hund ${l}/${e}`); }
near(K.unpaired(K.parse(K.el(24).conf)), 6, 0, 'Cr 6 eşleşmemiş'); near(K.unpaired(K.parse(K.el(64).conf)), 8, 0, 'Gd 8');

// ── Değerlik elektronu ve grup numarası ──
for (const e of K.ELEMENTS) { if (e.pred) continue; const v = K.valence(e.z); if (v.groupCheck !== null) ok(v.groupCheck === true, 'değerlik–grup ' + e.s); }
ok(K.valence(46).count === 10 && K.valence(8).count === 6 && K.valence(2).count === 2 && K.valence(26).count === 8 && K.valence(64).count === 10, 'değerlik örnekleri');
ok(K.el(71).ruleBlock === 'd' && K.el(57).ruleBlock === 'f' && K.el(2).ruleBlock === 's' && K.el(26).ruleBlock === 'd', 'kural bloğu');

// ── Slater: Wikipedia "Slater's rules" demir örneği ──
const fe = K.parse(K.el(26).conf);
near(K.slater(26, fe, '4sp').Zeff, 3.75, 1e-9, 'Fe 4s'); near(K.slater(26, fe, '3d').Zeff, 6.25, 1e-9, 'Fe 3d');
near(K.slater(26, fe, '3sp').Zeff, 14.75, 1e-9, 'Fe 3s3p'); near(K.slater(26, fe, '2sp').Zeff, 21.85, 1e-9, 'Fe 2s2p'); near(K.slater(26, fe, '1s').Zeff, 25.70, 1e-9, 'Fe 1s');
ok(K.slater(26).group === '4sp' && K.slater(46).group === '4d' && K.slater(64).group === '6sp', 'en dış grup');
// Elektron elektron dolaşan bağımsız uygulama (grup listesi burada yeniden yazılır)
const ORD = ['1s', '2s', '2p', '3s', '3p', '3d', '4s', '4p', '4d', '4f', '5s', '5p', '5d', '5f', '6s', '6p', '6d', '7s', '7p'];
const grp = (k) => (k === '1s' ? 0 : ['2s', '2p'].includes(k) ? 1 : ['3s', '3p'].includes(k) ? 2 : k === '3d' ? 3 : ['4s', '4p'].includes(k) ? 4 : k === '4d' ? 5 : k === '4f' ? 6 : ['5s', '5p'].includes(k) ? 7 : k === '5d' ? 8 : k === '5f' ? 9 : ['6s', '6p'].includes(k) ? 10 : k === '6d' ? 11 : 13);
function slater2(z, occ) {
  const els = []; for (const k of ORD) for (let i = 0; i < (occ[k] || 0); i++) els.push(k);
  const tg = Math.max(...els.map(grp)), target = els.findLast((k) => grp(k) === tg), n = Number(target[0]), sp = /[sp]/.test(target[1]);
  let S = 0, skipped = false;
  for (const k of els) { const g = grp(k), nk = Number(k[0]); if (g === tg && !skipped) { skipped = true; continue; }
    if (g === tg) S += target === '1s' ? 0.3 : 0.35; else if (g > tg) continue; else if (sp) S += nk === n - 1 ? 0.85 : nk <= n - 2 ? 1 : 0; else S += 1; }
  return z - S;
}
for (let z = 1; z <= 118; z++) near(K.slater(z).Zeff, slater2(z, K.parse(K.el(z).conf)), 1e-9, 'Slater ikizi ' + z);
// Tek elektron formülü: hidrojen tam sonuç (indirgenmiş kütle farkı NIST'e göre −0.05 %)
const h = K.slaterSummary(1); near(h.Zeff, 1, 0, 'H Z_etkin'); near(h.ieModel, 13.605693, 1e-6, 'H IE model'); near(h.rModel, 52.917721, 1e-6, 'H yarıçap = a0');
near(K.slaterSummary(11).ieModel, 13.605693 * 2.2 ** 2 / 9, 1e-9, 'Na IE model'); near(K.slaterSummary(11).Zeff, 2.2, 1e-12, 'Na Z_etkin');
near(K.slaterSummary(55, true).ieModel, 13.605693 * 2.2 ** 2 / 4.2 ** 2, 1e-9, 'Cs n*');
ok(K.slaterSummary(87, true).ieModel === null, 'n = 7 için n* yok');
// Toplam enerji farkı: tek elektronlu grupta tek elektron formülüyle aynı; azot elle: 5(3.9/2)² − 4(4.25/2)² Ry
near(K.slaterSummary(3, false, 'diff').ieModel, K.slaterSummary(3).ieModel, 1e-9, 'Li iki model aynı');
near(K.slaterSummary(7, false, 'diff').ieModel, 13.605693 * (5 * 1.95 ** 2 - 4 * 2.125 ** 2), 1e-9, 'N enerji farkı');
// Hata ölçümü: tablo boyunca ortalama |hata|
const mae = (ns, kind) => { const a = K.ELEMENTS.filter((e) => !e.pred).map((e) => K.slaterSummary(e.z, ns, kind).ieErr).filter((x) => x != null).map(Math.abs); return a.reduce((x, y) => x + y, 0) / a.length; };
near(mae(false, 'one'), 1.018, 0.002, 'tek elektron IE hatası'); near(mae(false, 'diff'), 0.434, 0.002, 'enerji farkı IE hatası');
const p3 = K.seriesStats('p3', false, 'one'); near(p3.ie.mean, 2.21, 0.005, '3. periyot IE hatası'); near(p3.rCalc.mean, 0.065, 0.002, '3. periyot yarıçap hatası');
ok(K.SERIES.find((s) => s.id === 'g1').zs.join(',') === '1,3,11,19,37,55,87' && K.SERIES.find((s) => s.id === 'p6').zs.length === 32, 'seriler');

// ── Pearson: bağımsız hesap ──
const pr = (x, y) => { const n = x.length, mx = x.reduce((a, b) => a + b) / n, my = y.reduce((a, b) => a + b) / n; let a = 0, b = 0, c = 0; for (let i = 0; i < n; i++) { a += (x[i] - mx) * (y[i] - my); b += (x[i] - mx) ** 2; c += (y[i] - my) ** 2; } return a / Math.sqrt(b * c); };
near(K.pearson([1, 2, 3, 4], [3, 5, 7, 9]).r, 1, 1e-12, 'kusursuz doğru'); near(K.pearson([1, 2, 3, 4], [2, 1, 4, 3]).r, 0.6, 1e-12, 'elle r = 0.6');
ok(K.pearson([1, 2], [1, 2]) === null && K.pearson([1, 1, 1], [1, 2, 3]) === null, 'tanımsız r');
const xs = [], ys = []; for (let z = 1; z <= 103; z++) { const e = K.el(z), r = NIST[z - 1]; if (e.rCalc != null && e.ie != null) { xs.push(e.rCalc); ys.push(e.ie); } }
near(K.correlation('rCalc', 'ie').r, pr(xs, ys), 1e-12, 'yarıçap–IE r'); near(K.correlation('rCalc', 'ie').r, -0.824, 0.002, 'yarıçap–IE r değeri');
const tr = K.ieTrends(); ok(tr.byPeriod.every((q) => q.r > 0.7 && q.n === 8) && tr.byGroup.every((q) => q.r < -0.6), 'IE periyotta artar, grupta azalır');
near(tr.byPeriod[0].r, 0.789, 0.001, '2. periyot r'); near(tr.byGroup[0].r, -0.914, 0.001, '1. grup r');
// IE düşüşleri: NIST değerlerinden kaba kuvvet
const dips = []; for (let z = 1; z < 103; z++) { const a = K.el(z), b = K.el(z + 1); if (a.period === b.period && a.ie != null && b.ie != null && b.ie < a.ie) dips.push(b.s); }
ok(JSON.stringify(K.ieDips().map((d) => K.el(d.to).s)) === JSON.stringify(dips), 'IE düşüşleri');
const kinds = Object.fromEntries(K.ieDips().map((d) => [K.el(d.to).s, d.kind]));
ok(['B', 'Al', 'Ga', 'In', 'Tl'].every((s) => kinds[s] === 'p1') && ['O', 'S', 'Se'].every((s) => kinds[s] === 'p4') && K.ieDips().length === 22, 'düşüş türleri');

// ── Veri: açılan kaynaklardan elle yazılmış değerler ──
const SP = { 26: { rho: 7.874, mp: 1811, ea: 0.163 }, 31: { mp: 302.91, rho: 5.91 }, 17: { ea: 3.617 }, 74: { mp: 3695 }, 76: { rho: 22.57 }, 1: { rho: 0.00008988 }, 80: { mp: 234.32 } }; // PubChem
for (const [z, o] of Object.entries(SP)) for (const [k, v] of Object.entries(o)) near(K.el(Number(z))[k], v, 1e-12, `PubChem ${z} ${k}`);
for (const [z, c, e] of [[1, 53, 25], [11, 190, 180], [55, 298, 260], [26, 156, 140], [86, 120, null], [18, 71, null], [2, 31, null], [10, 38, null]]) { ok(K.el(z).rCalc === c, 'Clementi ' + z); ok(K.el(z).rEmp === e, 'Slater 1964 ' + z); }
// Doğrulayıcı (12 Kasım 2026): Slater 1964'te soy gaz yok; en.wikipedia.org "List of chemical elements" kütle numaraları
ok(K.ELEMENTS.filter((e) => e.rEmp != null).length === 88 && K.el(103).m === '[266]' && K.el(106).m === '[267]' && K.el(108).m === '[271]', 'deneysel yarıçap sayısı ve kütle numaraları');
ok(K.el(85).mp === null && K.el(87).mp === null && K.el(85).rho === null && K.ELEMENTS.filter((e) => e.z >= 100).every((e) => e.mp === null), 'öngörü değerleri alınmadı');
ok(K.ELEMENTS.filter((e) => e.z > 86).every((e) => e.rCalc === null), 'Clementi Z ≤ 86');
ok([K.ELEMENTS.filter((e) => e.rho != null).length, K.ELEMENTS.filter((e) => e.mp != null).length, K.ELEMENTS.filter((e) => e.ea != null).length, K.ELEMENTS.filter((e) => e.en != null).length].join() === '95,97,57,69', 'veri sayıları');

// ── Mendeleyev: komşular, tahmin, bütün tablo hatası, tarihsel tablo ──
const nb = (z) => Object.values(K.neighbours(z)).map((q) => (q ? K.el(q).s : '-')).join(',');
ok(nb(32) === 'Si,Sn,Ga,As' && nb(31) === 'Al,In,Zn,Ge' && nb(21) === '-,Y,Ca,Ti' && nb(57) === '-,Ac,Ba,Ce' && nb(89) === 'La,-,Ra,Th' && nb(1) === '-,Li,-,He', 'komşular');
near(K.estimate(32, 'mass').est, (28.085 + 118.71 + 69.723 + 74.922) / 4, 1e-12, 'Ge kütle tahmini'); near(K.estimate(32, 'mass').rel, (72.86 - 72.63) / 72.63, 1e-9, 'Ge göreli hata');
near(K.estimate(31, 'mass').est, (26.982 + 114.82 + 65.38 + 72.63) / 4, 1e-12, 'Ga kütle tahmini');
near(K.estimate(31, 'rho').est, (2.7 + 7.31 + 7.134 + 5.323) / 4, 1e-12, 'Ga yoğunluk tahmini');
near(K.estimate(32, 'mass', ['up', 'down']).est, (28.085 + 118.71) / 2, 1e-12, 'yalnız üst-alt');
ok(K.estimate(32, 'mass', []).est === null && K.estimate(21, 'mass', ['up']).skipped[0].why === 'komşu yok', 'komşusuz tahmin');
const te = K.tableError('mass', ['up', 'down', 'left', 'right']);
// bağımsız: bütün elementlerde elle ortalama
const absr = []; for (const e of K.ELEMENTS) { const vs = Object.values(K.neighbours(e.z)).filter(Boolean).map((q) => K.el(q).mass); if (vs.length < 2) continue; absr.push(Math.abs(vs.reduce((a, b) => a + b) / vs.length - e.mass) / e.mass); }
near(te.mean, absr.reduce((a, b) => a + b) / absr.length, 1e-12, 'tablo hatası ortalaması'); ok(te.count === absr.length, 'tablo hatası sayısı');
const ga = K.MENDELEEV.find((q) => q.z === 31).rows, ge = K.MENDELEEV.find((q) => q.z === 32).rows; // en.wikipedia.org "Mendeleev's predicted elements"
ok(ga[0].pred === 68 && ga[0].real === 69.723 && ga[1].pred === 6.0 && ga[1].real === 5.91 && ga[4].pred === 5.5 && ga[4].real === 5.88, 'eka-alüminyum');
ok(ge[0].pred === 72 && ge[0].real === 72.63 && ge[1].pred === 5.5 && ge[1].real === 5.323 && ge[4].pred === 4.7 && ge[4].real === 4.228 && ge[6].pred === 1.9 && ge[6].real === 1.879, 'eka-silisyum');
ok(K.MENDELEEV[0].rows[0].pred === 44 && K.MENDELEEV[3].rows[0].pred === 100, 'eka-bor, eka-manganez');
assert.throws(() => K.el(0)); assert.throws(() => K.parse('[Ar] 3d11')); assert.throws(() => K.seriesStats('x')); checks += 3;

console.log(`G periyodik-tablo: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS`);
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
      await page.goto(`http://127.0.0.1:${server.address().port}/periyodik-tablo.html`);
      const click = (sel) => page.locator(/^[[.]/.test(sel) ? sel : '#' + sel).click();
      const read = async (id) => (await page.locator('#' + id).textContent()).replace(/ /g, ' ').trim();
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `[${width}] ${id}: "${t}" içinde "${text}" yok`); checks++; };
      const select = (id, v) => page.locator('#' + id).selectOption(String(v));
      const noOverflow = async (label) => { ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `[${width}] yatay taşma: ${label}`); };
      const painted = async (id) => { ok(await page.locator('#' + id).evaluate((c) => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; const s = new Set(); for (let i = 0; i < d.length; i += 4 * 97) s.add(d[i] + ',' + d[i + 1] + ',' + d[i + 2] + ',' + d[i + 3]); return c.width > 100 && s.size > 4; }), `[${width}] ${id} çizilmedi`); };
      const cellVal = async (z) => (await page.locator(`.cell[data-z="${z}"] .val`).textContent()).trim();

      // İskelet ve erişilebilirlik
      ok(await page.evaluate(() => [...document.querySelectorAll('main input, main select')].every((e) => document.querySelector(`label[for="${e.id}"]`) || e.closest('label'))), 'her denetimin etiketi var');
      ok(await page.evaluate(() => [...document.querySelectorAll('main canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), 'tuvaller role=img');
      ok(await page.evaluate(() => Object.isFrozen(PeriyodikLab) && !Object.getOwnPropertyDescriptor(window, 'PeriyodikLab').writable), 'çekirdek dondurulmuş');
      ok(await page.evaluate(() => !/[̀-ͯ]/.test(document.querySelector('main').textContent.normalize('NFC'))), 'birleşik işaret yok');
      ok((await page.locator('.cell').count()) === 118, '118 kutu');
      ok(await page.evaluate(() => document.querySelector('.pt-wrap').scrollWidth >= 660), 'tablo kendi çerçevesinde');

      // 01 · Dizilim (varsayılan Fe)
      await has('aRule', '[Ar] 3d⁶ 4s²'); await has('aMeas', '[Ar] 3d⁶ 4s²'); await has('aVerdict', 'Kural tutuyor'); await has('aBlock', 'd-blok (3d)'); await has('aValence', '8 · 4s ve 3d'); await has('aUnpaired', '4 · 4'); await has('aCountOut', '26 / 26');
      await has('aStatus', '20 elementin'); await has('ptDetail', 'Demir'); await has('ptDetail', '7.90 eV'); await painted('aCanvas'); await noOverflow('dizilim');
      await click('[data-az="24"]'); await has('aRule', '[Ar] 3d⁴ 4s²'); await has('aMeas', '[Ar] 3d⁵ 4s¹'); await has('aVerdict', '4s: kural 2, ölçülen 1 · 3d: kural 4, ölçülen 5'); await has('aUnpaired', '4 · 6');
      await click('[data-az="46"]'); await has('aMeas', '[Kr] 4d¹⁰'); await has('aVerdict', '5s: kural 2, ölçülen 0'); await has('aValence', '10 ·'); await has('aUnpaired', '2 · 0');
      await click('[data-az="64"]'); await has('aVerdict', '4f: kural 8, ölçülen 7 · 5d: kural 0, ölçülen 1'); await has('aBlock', 'f-blok (4f)'); await has('aUnpaired', '6 · 8');
      await click('[data-az="74"]'); await has('aVerdict', 'Kural tutuyor'); await select('aEl', 71); await has('aBlock', 'd-blok (5d) · tabloda f-blok yerinde');
      await select('aEl', 110); await has('aVerdict', 'Z ≥ 104'); await select('aEl', 2); await has('aValence', 'He 18. sütunda');
      await select('aEl', 11); await page.locator('#aCount').fill('0'); await has('aRule', 'henüz elektron yok'); await has('aCountOut', '0 / 11'); await painted('aCanvas');
      await click('aStep'); await click('aStep'); await click('aStep'); await has('aRule', '[He] 2s¹'); await has('aLast', '3 / 11 · 2s'); await has('aVerdict', 'yarım'); await has('aPlay', 'Sürdür');
      await page.locator('#aCount').fill('11'); await has('aRule', '[Ne] 3s¹'); await has('aPlay', 'Baştan oynat');
      await select('aSpeed', 12); await click('aPlay'); await has('aPlay', 'Durdur');
      await page.waitForFunction(() => document.getElementById('aCountOut').textContent.trim() === '11 / 11' && document.getElementById('aPlay').textContent === 'Baştan oynat', null, { timeout: 6000 }); await has('aMeas', '[Ne] 3s¹'); checks++;
      await click('aCore'); await painted('aCanvas'); await click('aufbauReset'); await has('aCountOut', '26 / 26'); ok(!(await page.locator('#aCore').isChecked()), 'çekirdek kutusu sıfırlandı');
      // Tablo: tıklama, klavye, arama, renk, aile
      await click('.cell[data-z="29"]'); await has('aMeas', '[Ar] 3d¹⁰ 4s¹'); await has('ptDetail', 'Bakır'); ok((await page.locator('.cell[data-z="29"]').getAttribute('aria-pressed')) === 'true', 'seçili kutu');
      await page.locator('.cell[data-z="29"]').focus(); await page.keyboard.press('ArrowRight'); ok(await page.evaluate(() => document.activeElement.dataset.z === '30'), 'sağ ok'); await page.keyboard.press('ArrowUp'); await page.keyboard.press('Enter'); await has('aMeas', '[Ne] 3s² 3p¹');
      await page.keyboard.press('End'); ok(await page.evaluate(() => document.activeElement.dataset.z === '18'), 'End satır sonu'); await page.keyboard.press(' '); await has('aRule', '[Ne] 3s² 3p⁶');
      await page.locator('#ptSearch').fill('ger'); await has('ptStatus', 'Bulundu: 32 · Ge · Germanyum'); await has('aMeas', '[Ar] 3d¹⁰ 4s² 4p²');
      await page.locator('#ptSearch').fill('ka'); await has('ptStatus', '5 eşleşme: C, Ca, Cd, Sn, Cf'); ok((await page.locator('.cell.hit').count()) >= 3, 'çoklu eşleşme vurgulu');
      await page.locator('#ptSearch').fill('79'); await page.locator('#ptSearch').press('Enter'); await has('aMeas', '5d¹⁰ 6s¹'); ok(await page.evaluate(() => document.activeElement.dataset.z === '79'), 'Enter kutuya geçer');
      await page.locator('#ptSearch').fill('xyz'); await has('ptStatus', 'eşleşme yok'); await page.locator('#ptSearch').fill('');
      await select('ptFamily', 'halojen'); await has('ptStatus', '6 element'); ok((await page.locator('.cell.hit').count()) === 6, 'halojenler'); await select('ptFamily', 'metal'); await has('ptStatus', '91 element'); await select('ptFamily', 'ametal'); await has('ptStatus', '20 element'); await select('ptFamily', 'all');
      await select('ptColor', 'exc'); ok((await cellVal(24)) === 'kural dışı' && (await cellVal(26)) === '', 'istisna renklendirmesi'); await has('ptLegend', '20 element');
      await select('ptColor', 'ie'); ok((await cellVal(2)) === '24.59' && (await cellVal(91)) === '—', 'IE kutuları'); await has('ptLegend', 'değer yok (18)');
      await select('ptColor', 'rho'); ok((await cellVal(1)) === '0.090 g/L' && (await cellVal(76)) === '22.6', 'yoğunluk kutuları');
      await select('ptColor', 'cat'); ok((await cellVal(43)) === '[98]', 'kütle kutusu'); await noOverflow('tablo');

      // 02 · Eğilimler
      await click('tab-trend'); await has('tTitle', 'Yoğunluk'); await click('trendReset'); await has('tTitle', '1. iyonlaşma enerjisi (eV), atom numarasına karşı'); await has('tCount', '100 / 118 (18 eksik)'); await has('tRange', 'Cs 3.8939 eV · He 24.5874 eV'); await has('tR', '22 / 91 adım');
      ok((await page.locator('#ptColor').inputValue()) === 'ie', 'eğilim sekmesi tabloyu IE ile renkler');
      ok((await page.locator('#tTrendTable tbody tr').count()) === 13, 'eğilim tablosu'); await has('tTrendTable', '+0.789'); await has('tTrendTable', '−0.914');
      ok((await page.locator('#tDipTable tbody tr').count()) === 22, 'düşüş tablosu'); await has('tDipTable', 'Be → B'); await has('tDipTable', '−1.025 eV'); await has('tDipTable', 'P → S'); await has('tDipTable', '−0.127 eV');
      await painted('tCanvas'); await noOverflow('eğilim');
      await click('.cell[data-z="8"]'); await has('tSel', 'O · 13.6181 eV');
      await click('tPresetGroup'); await has('tR', 'r = +0.603 · n = 44'); await has('tStatus', 'Grup numarası tek başına');
      await click('tPresetRadius'); await has('tR', 'r = −0.824 · n = 86'); await click('tPresetEn'); await has('tR', 'r = +0.910 · n = 69'); await painted('tCanvas');
      await select('tFilter', 'd'); await has('tCount', 'çift'); await select('tX', 'z'); await select('tY', 'mp'); await has('tTitle', 'Erime noktası');
      await select('tView', 'z'); await select('tFilter', 'all'); await select('tProp', 'rho'); await has('tCount', '95 / 118 (23 eksik)'); ok(await page.locator('#tLog').isChecked(), 'yoğunluk log'); await has('tRange', 'H 8.988×10⁻⁵ g/cm³ · Os 22.57 g/cm³'); await painted('tCanvas');
      await select('tProp', 'ea'); await has('tCount', '57 / 118'); await select('tProp', 'mp'); await has('tCount', '97 / 118');
      await click('trendReset'); await has('tCount', '100 / 118'); ok(!(await page.locator('#tLog').isChecked()), 'log sıfırlandı');

      // 03 · Slater
      await click('tab-slater'); await has('sConf', '(1s²) (2s² 2p⁶) (3s¹)'); await has('sS', '8.80'); await has('sZeff', '2.20 (Z = 11)'); await has('sIEm', '7.32 eV'); await has('sIEr', '5.139 eV'); await has('sIEd', '+42.4 %');
      await has('sZback', '1.84'); await has('sRm', '216 pm'); await has('sRc', '190 pm · +13.9 %'); await has('sSeriesStats', 'IE ortalama |hata| 221.0 % (8 element), yarıçap 6.5 % (8)');
      await has('sTable', '0.85'); await has('sTable', '8.80'); await painted('sCanvas'); await noOverflow('slater');
      await click('[data-sz="26"]'); await has('sZeff', '3.75'); await has('sS', '22.25'); await click('[data-sz="30"]'); await has('sZeff', '4.35'); await click('[data-sz="7"]'); await has('sZeff', '3.90'); await has('sIEd', '+256.0 %'); await has('sStatus', 'Toplam enerji farkı modelini dene');
      await select('sIE', 'diff'); await has('sIEm', '12.93 eV'); await has('sIEd', '−11.1 %'); await has('sSeriesStats', '38.4 %');
      await select('sIE', 'one'); await click('[data-sz="55"]'); await select('sN', 'nstar'); await has('sIEm', '3.73 eV'); await has('sIEd', '−4.1 %'); await has('sStatus', '%15 içinde');
      await select('sEl', 87); await has('sIEm', 'n* yok'); await has('sStatus', 'n = 7 için');
      for (const q of ['ie', 'r']) { await select('sQty', q); await painted('sCanvas'); }
      await select('sSeries', 'g1'); await has('sTitle', '1. grup'); await select('sEl', 112); await has('sStatus', 'Z ≥ 104');
      await click('.cell[data-z="9"]'); await has('sZeff', '5.20'); await click('slaterReset'); await has('sZeff', '2.20 (Z = 11)'); await has('sIEmLabel', '(n = 3)');

      // 04 · Mendeleyev
      await click('tab-mend'); await has('mUsed', 'Si 28.085 (üst) · Sn 118.71 (alt) · Ga 69.723 (sol) · As 74.922 (sağ)'); await has('mEst', '72.86 (4 komşu)'); await has('mReal', 'gizli'); await has('mErr', 'gizli');
      ok((await cellVal(32)) === '?' && (await page.locator('.cell.nb').count()) === 4, 'gizli kutu ve komşular'); await has('ptDetail', 'gizli');
      await has('mTableErr', '118 element · ortanca |hata| 11.8 %'); await painted('mCanvas'); await noOverflow('mendeleyev');
      ok((await page.locator('#mHist tbody tr').count()) === 19, 'tarih tablosu'); await has('mHist', '−2.5 %'); await has('mHist', '+3.3 %');
      await click('mReveal'); await has('mReal', '72.630'); await has('mErr', '+0.23'); await has('mRel', '+0.32 %'); await has('mStatus', '%5 içinde'); await has('ptDetail', '72.630');
      await click('[data-mz="31"]'); await has('mReal', 'gizli'); await has('mEst', '69.95'); await select('mProp', 'mp'); await has('mEst', '816.8 K'); await click('mReveal'); await has('mReal', '302.91 K'); await has('mRel', '+169.66 %'); await has('mStatus', '%30');
      await select('mProp', 'rho'); await click('mReveal'); await has('mEst', '5.617 g/cm³'); await has('mRel', '−4.96 %');
      await click('[data-mz="21"]'); await select('mProp', 'mass'); await has('mUsed', 'girmeyen: üst (komşu yok)'); await has('mEst', '58.95 (3 komşu)');
      await click('mUp'); await click('mDown'); await click('mLeft'); await click('mRight'); await has('mEst', 'kullanılabilir komşu yok'); await has('mStatus', 'Hiç komşu seçili değil'); await painted('mCanvas');
      await click('.cell[data-z="50"]'); await has('mEl', '50 · Sn'); await click('mendReset'); await has('mEst', '72.86'); ok(await page.locator('#mUp').isChecked(), 'komşular sıfırlandı');

      // Sekme klavyesi ve kısayollar
      await page.locator('#tab-mend').focus(); await page.keyboard.press('Home'); ok((await page.locator('#tab-aufbau').getAttribute('aria-selected')) === 'true', 'Home');
      await page.keyboard.press('ArrowRight'); ok((await page.locator('#tab-trend').getAttribute('aria-selected')) === 'true', 'ArrowRight');
      await page.keyboard.press('End'); ok((await page.locator('#tab-mend').getAttribute('aria-selected')) === 'true', 'End');
      await page.keyboard.press('ArrowRight'); ok((await page.locator('#tab-aufbau').getAttribute('aria-selected')) === 'true', 'sarma'); ok(await page.locator('#panel-trend').isHidden(), 'öteki paneller gizli');
      await select('aEl', 47); await page.locator('h1').click(); await page.keyboard.press('r'); await has('aCountOut', '26 / 26');
      await page.keyboard.press('Space'); await has('aPlay', 'Durdur'); await page.keyboard.press('Space'); await has('aPlay', 'Sürdür');
      await page.locator('#aSpeed').focus(); await page.keyboard.press('r'); await has('aPlay', 'Sürdür');
      await noOverflow('son'); assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      await ctx.close();
    }
    console.log(`G periyodik-tablo: ${checks - before} arayüz kontrolü (390 px açık + 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}

