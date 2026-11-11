// Kimya mühendisliği laboratuvarı: çekirdek, sayfadan bağımsız yazılmış yöntemlerle denetlenir.
// Reaktör: test tarafında ayrı RK4 ve ayrı kök arama; damıtma: akış debileriyle kütle dengesi ve Fenske;
// ısı değiştirici: test tarafında ayrı RK4 + ikiye bölmeli atış, enerji dengesi ve limitler.
// Kullanım: node scripts/check-d-chemeng.mjs [--browser]
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../kimya-muhendisligi.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'Çekirdek sınırları (KERNEL-BEGIN/END) gerekli');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(source, context);
const K = context.window.ChemEngLab;
assert(Object.isFrozen(K), 'ChemEngLab dondurulmuş olmalı');

let checks = 0;
const near = (actual, expected, tol = 1e-9, label = '') => {
  assert(Math.abs(actual - expected) <= tol * Math.max(1, Math.abs(expected)), `${label} ${actual} ≠ ${expected} (tol ${tol})`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };
const eq = (a, b, label) => { assert.equal(a, b, label); checks++; };

/* ── Bağımsız yardımcılar (çekirdeği kullanmaz) ── */
const rk4 = (f, y0, t0, t1, n) => {
  const h = (t1 - t0) / n; let y = y0.slice(), t = t0;
  const add = (a, b, s) => a.map((v, i) => v + s * b[i]);
  for (let i = 0; i < n; i++) {
    const k1 = f(t, y), k2 = f(t + h / 2, add(y, k1, h / 2)), k3 = f(t + h / 2, add(y, k2, h / 2)), k4 = f(t + h, add(y, k3, h));
    y = y.map((v, j) => v + (h / 6) * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j])); t += h;
  }
  return y;
};
const root = (f, a, b, iter = 300) => { let fa = f(a); for (let i = 0; i < iter; i++) { const m = (a + b) / 2, fm = f(m); if ((fa < 0) === (fm < 0)) { a = m; fa = fm; } else b = m; } return (a + b) / 2; };
// 5 noktalı Gauss–Legendre, alt aralıklara bölünmüş
const GL = [[0, 128 / 225], [Math.sqrt(5 - 2 * Math.sqrt(10 / 7)) / 3, (322 + 13 * Math.sqrt(70)) / 900], [Math.sqrt(5 + 2 * Math.sqrt(10 / 7)) / 3, (322 - 13 * Math.sqrt(70)) / 900]];
const gauss = (f, a, b, panels = 400) => {
  let sum = 0; const w = (b - a) / panels;
  for (let p = 0; p < panels; p++) {
    const c = a + (p + 0.5) * w, h = w / 2;
    for (const [x, wt] of GL) sum += x === 0 ? wt * f(c) * h : wt * (f(c + h * x) + f(c - h * x)) * h;
  }
  return sum;
};

/* ── 1. Reaktörler ── */
const orders = [0.5, 1, 2], generic = [1.5, 3];
const DAS = [0.01, 0.1, 0.5, 1, 1.5, 1.99, 2, 2.5, 5, 20, 100];
for (const n of [...orders, ...generic]) for (const Da of DAS) {
  // CSTR: tasarım denkleminin artığı ve bağımsız kök
  const Xc = K.cstrX(n, Da);
  near(Da * Math.pow(1 - Xc, n) - Xc, 0, 1e-12, `CSTR artık n=${n} Da=${Da}`);
  near(Xc, root((X) => Da * Math.pow(1 - X, n) - X, 0, 1), 1e-12, 'CSTR kök');
  near(K.cstrNumeric(n, Da), Xc, 1e-12, 'CSTR sayısal');
  // PFR: bağımsız RK4 (X değişkeniyle, 4000 adım); yarım mertebede tükenme noktasının ötesi kapalı formda X = 1
  const Xp = K.pfrX(n, Da);
  const exhausted = n < 1 && Da >= 1 / (1 - n);
  if (!exhausted) {
    const [Xi] = rk4((t, y) => [Da * Math.pow(Math.max(1 - y[0], 0), n)], [0], 0, 1, 4000);
    near(Xi, Xp, n < 1 && Da > 1.9 ? 1e-6 : 1e-9, `PFR RK4 n=${n} Da=${Da}`);
    // ters yön: Da = ∫ dX/(1−X)^n; X → 1 ucundaki tekilliğe yaklaşan durumlar bu kareleme için atlanır
    if (Xp < 0.99) near(gauss((x) => Math.pow(1 - x, -n), 0, Xp, 4000), Da, 1e-6, `PFR integral n=${n} Da=${Da}`);
  } else eq(Xp, 1, 'yarım mertebe tükenme');
  near(K.pfrNumeric(n, Da).X, Xp, 2e-6, `sayfa RK4 n=${n} Da=${Da}`);
  // Sıra: CSTR ≤ seri ≤ PFR, N ile tekdüze artış
  let prev = Xc;
  for (const N of [1, 2, 3, 5, 10, 30]) {
    const s = K.seriesX(n, Da, N);
    if (N === 1) near(s.X, Xc, 1e-12, 'N=1 tek CSTR');
    ok(s.X >= prev - 1e-12 && s.X <= Xp + 1e-12, `sıra n=${n} Da=${Da} N=${N}`);
    prev = s.X;
    // her tankta mol dengesi: c_giriş − c = (Da/N)·c^n
    let cin = 1;
    for (const Xi of s.stages) { const c = 1 - Xi; near(cin - c, (Da / N) * Math.pow(c, n), n < 1 ? 1e-7 : 1e-11, 'tank dengesi') /* n < 1: c = 1 − X çıkarması √c'de büyür */; cin = c; }
    near(K.seriesNumeric(n, Da, N), s.X, 1e-11, 'seri sayısal');
    if (n === 1) near(s.X, 1 - Math.pow(1 + Da / N, -N), 1e-12, 'birinci mertebe N tank');
  }
  // N → ∞ limiti PFR; hata N ile ~1/N küçülür
  const e100 = Xp - K.seriesX(n, Da, 100).X, e1000 = Xp - K.seriesX(n, Da, 1000).X;
  ok(e1000 <= e100 + 1e-12 && e1000 < 2e-3, `N→∞ n=${n} Da=${Da}: ${e100} ${e1000}`);
  // n ≥ 1 için hata 1/N ile küçülür; yarım mertebede tükenme noktası bu düzeni bozar, orada yalnız yakınsama istenir
  if (n >= 1 && e100 > 1e-6) ok(e100 / e1000 > 5 && e100 / e1000 < 20, `1/N yakınsama n=${n} Da=${Da}: ${e100 / e1000}`);
}
// Hedef dönüşüm: hacim oranları
for (const n of [...orders, ...generic]) for (const X of [0.05, 0.3, 0.5, 0.9, 0.99]) {
  near(K.cstrX(n, K.daCstr(n, X)), X, 1e-10, 'daCstr tersi');
  near(K.pfrX(n, K.daPfr(n, X)), X, 1e-10, 'daPfr tersi');
  near(K.daPfr(n, X), gauss((x) => Math.pow(1 - x, -n), 0, X, 2000), 1e-9, 'daPfr Gauss');
  near(K.daPfrNumeric(n, X), K.daPfr(n, X), n <= 2 ? 2e-6 : 1e-5, 'daPfr Simpson');
  ok(K.daCstr(n, X) > K.daPfr(n, X), 'pozitif mertebede CSTR daha büyük');
  for (const N of [1, 3, 10]) {
    const Da = K.daSeries(n, X, N);
    near(K.seriesX(n, Da, N).X, X, 1e-10, 'daSeries tersi');
    ok(Da <= K.daCstr(n, X) * (1 + 1e-9) && Da >= K.daPfr(n, X) * (1 - 1e-9), 'seri hacmi arada');
  }
}
near(K.daCstr(1, 0.9) / K.daPfr(1, 0.9), 9 / Math.log(10), 1e-12, 'n=1 X=0.9 oranı');
near(K.daCstr(2, 0.9) / K.daPfr(2, 0.9), 10, 1e-12, 'n=2 X=0.9 oranı');
near(K.pfrX(0.5, 1), 0.75, 1e-14); eq(K.pfrX(0.5, 2), 1); eq(K.exhaustionDa(0.5), 2); eq(K.exhaustionDa(1), Infinity);
ok(K.cstrX(0.5, 1e6) < 1, 'CSTR sonlu hacimde X = 1 olmaz');
// Varsayılan durum ve hazır değerler (rapordaki sayılar)
{
  const r = K.reactor({ n: 1, k: 0.2, CA0: 2, v0: 10, V: 100, N: 3, Xt: 0.9 });
  near(r.tau, 10); near(r.Da, 2); near(r.Xcstr, 2 / 3); near(r.Xseries, 0.784); near(r.Xpfr, 1 - Math.exp(-2));
  near(r.target.Vcstr, 450); near(r.target.Vpfr, 50 * Math.log(10)); near(r.target.ratio, 9 / Math.log(10));
  near(r.target.VpfrNum, r.target.Vpfr, 1e-8);
  // CSTR mol dengesi boyutlu: F_A0·X = k·C_A^n·V
  near(r.FA0 * r.Xcstr, 0.2 * 2 * (1 - r.Xcstr) * 100, 1e-12);
  const s = K.reactor({ n: 2, k: 0.1, CA0: 2, v0: 10, V: 100, N: 3, Xt: 0.9 });
  near(s.Da, 2); near(s.Xcstr, 0.5); near(s.Xpfr, 2 / 3); near(s.target.ratio, 10);
  const h = K.reactor({ n: 0.5, k: 0.4, CA0: 1, v0: 10, V: 100, N: 3, Xt: 0.9 });
  near(h.Da, 4); eq(h.Xpfr, 1); eq(h.XpfrNum, 1); near(h.exhaustionV, 50); near(h.Xcstr, (-16 + Math.sqrt(256 + 64)) / 2, 1e-12);
  const m = K.reactor({ n: 1, k: 0.2, CA0: 2, v0: 10, V: 100, N: 20, Xt: 0.9 });
  near(m.Xseries, 1 - Math.pow(1.1, -20), 1e-12);
}
for (const bad of [() => K.cstrX(0, 1), () => K.pfrX(1, -1), () => K.seriesX(1, 1, 0), () => K.seriesX(1, 1, 2.5), () => K.daPfr(1, 1), () => K.reactor({ n: 1, k: 0, CA0: 1, v0: 1, V: 1, N: 1, Xt: 0.5 })]) { assert.throws(bad); checks++; }
const reactorChecks = checks;

/* ── 2. Damıtma ── */
const stepCount = (alpha, xD, xB) => { // toplam riflü: test tarafında bağımsız basamak sayımı
  let x = xD, n = 0;
  while (x > xB && n < 10000) { x = x / (alpha - (alpha - 1) * x); n++; }
  return n;
};
for (const alpha of [1.1, 1.5, 2.5, 4, 5]) for (const xD of [0.8, 0.95, 0.99]) for (const xB of [0.01, 0.05, 0.2]) {
  const nmin = K.fenske(alpha, xD, xB);
  // Fenske'nin dayandığı özellik: toplam riflüde her kademe x/(1−x) oranını α'ya böler
  const t = K.mccabe({ alpha, zF: 0.5, q: 1, xD, xB, total: true });
  eq(t.N, stepCount(alpha, xD, xB), 'toplam riflü basamak sayısı');
  if (Math.abs(nmin - Math.round(nmin)) > 1e-9) eq(t.N, Math.ceil(nmin), `Fenske tavanı α=${alpha} xD=${xD} xB=${xB}`);
  ok(t.Nfrac > t.N - 1 && t.Nfrac <= t.N, 'kesirli basamak aralığı');
  // Son basamağın payı ln[x/(1−x)] ölçeğinde oranlanır: toplam riflüde kesirli sayı Fenske değerinin kendisidir
  near(t.Nfrac, nmin, 1e-9, `kesirli basamak = Fenske α=${alpha} xD=${xD} xB=${xB}`);
  let odds = xD / (1 - xD);
  for (const st of t.stages) { odds /= alpha; near(st.x / (1 - st.x), odds, 1e-9, 'α bölmesi'); }
  for (const zF of [0.25, 0.5, 0.75]) for (const q of [-0.5, 0, 0.5, 1, 1.5]) {
    const p = K.qPoint(alpha, zF, q);
    // bağımsız kesişim: q doğrusu boyunca ikiye bölme
    const onQ = q === 1 ? null : (x) => (q * x - zF) / (q - 1);
    if (q === 1) near(p.x, zF, 1e-12);
    else {
      const [a, b] = q > 1 ? [zF, 1] : [0, zF];
      const f = (x) => alpha * x / (1 + (alpha - 1) * x) - onQ(x);
      ok(f(a) * f(b) <= 0, `q kesişimi aralıkta α=${alpha} zF=${zF} q=${q}`);
      near(p.x, root(f, a, b), 1e-10, 'q kesişimi');
    }
    near(p.y, alpha * p.x / (1 + (alpha - 1) * p.x), 1e-12);
    const base = K.mccabe({ alpha, zF, q, xD, xB, R: 1000 });
    near(base.DF * xD + base.BF * xB, zF, 1e-12, 'bileşen dengesi'); near(base.DF + base.BF, 1, 1e-12, 'toplam denge');
    if (base.rminRaw > 0) {
      // R = R_min doğrusu pinç noktasından geçer
      near(base.rmin / (base.rmin + 1) * p.x + xD / (base.rmin + 1), p.y, 1e-10, 'R_min pinçten geçer');
      for (const f of [0.5, 0.999999, 1]) { const m = K.mccabe({ alpha, zF, q, xD, xB, R: base.rmin * f }); eq(m.feasible, false); eq(m.reason, 'pinch'); eq(m.N, Infinity); }
    } else eq(base.rmin, 0);
    let prevN = Infinity;
    for (const mult of [1.02, 1.2, 1.5, 3, 20]) {
      const R = base.rminRaw > 0 ? base.rmin * mult : 0.2 * mult;
      const m = K.mccabe({ alpha, zF, q, xD, xB, R });
      if (m.reason === 'feed-left') { ok(m.feed.x <= xB, 'besleme solda'); eq(m.N, null); continue; }
      if (m.reason === 'cap') { ok(mult === 1.02 || alpha <= 1.5, `sınır aşımı yalnız zor durumda α=${alpha} mult=${mult}`); continue; }
      eq(m.feasible, true, `α=${alpha} zF=${zF} q=${q} xD=${xD} xB=${xB} R=${R} ${m.reason}`);
      // Akış debileriyle (F = 1) bağımsız işletme doğruları
      const D = (zF - xB) / (xD - xB), B = 1 - D, L = R * D, V = (R + 1) * D, Ls = L + q, Vs = V - (1 - q);
      near(m.rect.m, L / V, 1e-11); near(m.rect.b, D * xD / V, 1e-11);
      near(m.strip.m, Ls / Vs, 1e-8, 'sıyırma eğimi'); near(m.strip.b, -B * xB / Vs, 1e-8, 'sıyırma kesişimi');
      // İşletme doğruları q doğrusu üstünde kesişir, denge eğrisinin altında
      if (q !== 1) near(m.feed.y, (q * m.feed.x - zF) / (q - 1), 1e-9); else near(m.feed.x, zF, 1e-12);
      ok(m.feed.y < alpha * m.feed.x / (1 + (alpha - 1) * m.feed.x), 'kesişim dengenin altında');
      // Her basamak: denge noktası + doğru işletme doğrusu; besleme kademesi kesişimi ilk geçen kademe
      let y = xD;
      m.stages.forEach((st, i) => {
        near(st.y, y, 1e-12); near(st.y, alpha * st.x / (1 + (alpha - 1) * st.x), 1e-10, 'denge');
        const line = st.x > m.feed.x ? m.rect : m.strip;
        y = line.m * st.x + line.b;
        if (i + 1 < m.feedStage) ok(st.x > m.feed.x, 'besleme öncesi'); else ok(st.x <= m.feed.x, 'besleme sonrası');
      });
      eq(m.N, m.stages.length); ok(m.stages[m.N - 1].x <= xB && (m.N === 1 || m.stages[m.N - 2].x > xB), 'son kademe x_B altına iner');
      ok(m.N >= t.N, 'N ≥ N_min'); ok(m.N <= prevN, `R arttıkça N artmaz: ${m.N} ${prevN}`);
      prevN = m.N;
    }
    // R → ∞ limiti toplam riflü sayısına iner
    eq(K.mccabe({ alpha, zF, q, xD, xB, R: 1e7 }).N, t.N, 'R→∞');
  }
}
{
  const m = K.mccabe({ alpha: 2.5, zF: 0.5, q: 1, xD: 0.95, xB: 0.05, R: 1.65 });
  near(m.rmin, 1.1, 1e-12); near(m.ratio, 1.5, 1e-12); near(m.nmin, Math.log(361) / Math.log(2.5), 1e-12); eq(m.N, 12); eq(m.feedStage, 6); near(m.DF, 0.5, 1e-12);
  eq(K.mccabe({ alpha: 2.5, zF: 0.5, q: 1, xD: 0.95, xB: 0.05, R: 1.1 }).reason, 'pinch');
  eq(K.mccabe({ alpha: 2.5, zF: 0.5, q: 1, xD: 0.95, xB: 0.05, R: 1.15 }).N, 21);
  eq(K.mccabe({ alpha: 2.5, zF: 0.5, q: 1, xD: 0.95, xB: 0.05, total: true }).N, 7);
  const h = K.mccabe({ alpha: 1.5, zF: 0.5, q: 1, xD: 0.95, xB: 0.05, R: 4 });
  near(h.rmin, 3.5, 1e-12); eq(h.N, 34); eq(h.feedStage, 17);
  const rich = K.mccabe({ alpha: 5, zF: 0.75, q: 1, xD: 0.8, xB: 0.05, R: 0.2 });
  ok(rich.rminRaw < 0 && rich.rmin === 0 && rich.ratio === null && rich.feasible, 'R_min = 0 durumu');
  const left = K.mccabe({ alpha: 5, zF: 0.25, q: -0.5, xD: 0.95, xB: 0.2, R: 0.5 });
  ok(left.reason === 'feed-left' || left.reason === 'pinch', 'modelin dışı işaretlenir');
}
for (const bad of [() => K.mccabe({ alpha: 1, zF: 0.5, q: 1, xD: 0.9, xB: 0.1, R: 2 }), () => K.mccabe({ alpha: 2, zF: 0.95, q: 1, xD: 0.9, xB: 0.1, R: 2 }), () => K.mccabe({ alpha: 2, zF: 0.5, q: 1, xD: 0.9, xB: 0.1, R: 0 }), () => K.fenske(2, 0.1, 0.9)]) { assert.throws(bad); checks++; }
const distChecks = checks - reactorChecks;

/* ── 3. Isı değiştirici ── */
const solveHx = (c, n = 4000) => { // bağımsız: RK4 + ikiye bölmeli atış, kararlı yönde
  const UA = c.U * c.A / 1000, a = UA / c.Ch, b = UA / c.Cc;
  if (c.flow === 'co') { const [Th, Tc] = rk4((t, y) => [-a * (y[0] - y[1]), b * (y[0] - y[1])], [c.Thi, c.Tci], 0, 1, n); return { Tho: Th, Tco: Tc }; }
  const f = (t, y) => [-a * (y[0] - y[1]), -b * (y[0] - y[1])];
  if (c.Cc >= c.Ch) { const g = root((g) => rk4(f, [c.Thi, g], 0, 1, n)[1] - c.Tci, c.Tci - 1, c.Thi + 1, 60); return { Tho: rk4(f, [c.Thi, g], 0, 1, n)[0], Tco: g }; }
  const g = root((g) => rk4(f, [g, c.Tci], 1, 0, n)[0] - c.Thi, c.Tci - 1, c.Thi + 1, 60);
  return { Tho: g, Tco: rk4(f, [g, c.Tci], 1, 0, n)[1] };
};
const hxGrid = [];
for (const Ch of [0.5, 2, 4, 10]) for (const Cc of [0.5, 2, 4.1, 10]) for (const UAset of [[100, 1], [500, 8], [1500, 20]]) for (const T of [[150, 20], [60, 50], [200, 0]]) hxGrid.push({ Ch, Cc, U: UAset[0], A: UAset[1], Thi: T[0], Tci: T[1] });
for (const base of hxGrid) {
  const res = {};
  for (const flow of ['co', 'counter']) {
    const c = { ...base, flow }, e = K.exchanger(c), p = K.profile(c), span = c.Thi - c.Tci;
    res[flow] = e;
    near(e.NTU, c.U * c.A / 1000 / Math.min(c.Ch, c.Cc), 1e-12); near(e.Cr, Math.min(c.Ch, c.Cc) / Math.max(c.Ch, c.Cc), 1e-12);
    ok(e.eps > 0 && e.eps <= 1, 'ε aralığı');
    // Sayısal profil ↔ ε–NTU; enerji dengesi; U·A·ΔT_lm
    near(p.Qhot, e.Q, 2e-6, `Q sayısal ${flow} ${JSON.stringify(base)}`); near(p.Qcold, p.Qhot, 1e-8, 'enerji dengesi');
    near(p.Tho, e.Tho, 2e-6 * span); near(p.Tco, e.Tco, 2e-6 * span);
    near(e.Qlmtd, e.Q, 1e-9, `UA·LMTD ${flow} ${JSON.stringify(base)}`);
    near(c.Ch * (c.Thi - e.Tho), c.Cc * (e.Tco - c.Tci), 1e-10, 'kapalı form enerji dengesi');
    ok(Math.abs(p.residual) < 1e-7 * span, `atış artığı ${p.residual}`);
    // Bağımsız çözücü (kısa aralıkta; çok sert durumlarda adım sayısı artırılır)
    const ref = solveHx(c, e.NTU > 5 ? 2500 : 600);
    near(ref.Tho, e.Tho, 1e-7 * span, `bağımsız Tho ${flow} ${JSON.stringify(base)}`); near(ref.Tco, e.Tco, 1e-7 * span, 'bağımsız Tco');
    // İkinci yasa: sıcaklıklar giriş aralığında, profiller hiçbir yerde kesişmez
    ok(e.Tco <= c.Thi + 1e-9 && e.Tho >= c.Tci - 1e-9, 'giriş aralığı');
    ok(p.Th.every((th, i) => th - p.Tc[i] > -1e-9 * span), 'yerel sıcaklık farkı negatif olmaz');
    if (flow === 'co') ok(e.Tco <= e.Tho + 1e-9, 'paralel akımda kesişme yok');
    near(p.Th[0], c.Thi, 1e-9 * span); near(flow === 'co' ? p.Tc[0] : p.Tc[p.steps], c.Tci, 1e-7 * span);
  }
  ok(res.counter.eps >= res.co.eps - 1e-12, 'karşı akım ≥ paralel akım');
  near(res.co.epsOther, res.counter.eps, 1e-14); near(res.counter.epsOther, res.co.eps, 1e-14);
}
for (const NTU of [0, 0.01, 0.5, 1, 2, 5, 20, 60]) {
  near(K.effectiveness('counter', NTU, 1), NTU / (1 + NTU), 1e-14, 'dengeli karşı akım');
  near(K.effectiveness('co', NTU, 1), (1 - Math.exp(-2 * NTU)) / 2, 1e-13);
  for (const d of [1e-12, 1e-9, 1e-6, 1e-3]) near(K.effectiveness('counter', NTU, 1 - d), NTU / (1 + NTU), Math.max(1e-12, 2 * d * (1 + NTU)), `C_r → 1 sürekliliği NTU=${NTU} d=${d}`);
  for (const flow of ['co', 'counter']) near(K.effectiveness(flow, NTU, 0), 1 - Math.exp(-NTU), 1e-13, 'C_r = 0');
  for (const Cr of [0.1, 0.5, 0.9, 0.999]) {
    const u = NTU * (1 - Cr);
    near(K.effectiveness('counter', NTU, Cr), (1 - Math.exp(-u)) / (1 - Cr * Math.exp(-u)), 1e-10, 'ders kitabı biçimi');
    ok(K.effectiveness('counter', NTU, Cr) >= K.effectiveness('co', NTU, Cr) - 1e-15, 'karşı ≥ paralel');
  }
}
for (const Cr of [0, 0.3, 1]) { near(K.effectiveness('co', 500, Cr), 1 / (1 + Cr), 1e-12, 'paralel sınır'); near(K.effectiveness('counter', 5000, Cr), 1, 2e-4, 'karşı akım sınırı'); }
near(K.lmtd(40, 40), 40); near(K.lmtd(40, 40 * (1 + 1e-9)), 40, 1e-8); near(K.lmtd(40, 40 * (1 + 1e-6)), 40, 1e-6); near(K.lmtd(100, 20), 80 / Math.log(5), 1e-14); eq(K.lmtd(10, 0), 0);
for (const [a, b] of [[80, 30], [5, 4.999], [1, 100]]) ok(K.lmtd(a, b) < (a + b) / 2 && K.lmtd(a, b) > Math.sqrt(a * b), 'geometrik < logaritmik < aritmetik ortalama');
{
  const d = { Thi: 150, Tci: 20, Ch: 2, Cc: 4, U: 500, A: 8 };
  const cn = K.exchanger({ ...d, flow: 'counter' }), co = K.exchanger({ ...d, flow: 'co' });
  near(cn.NTU, 2); near(cn.Cr, 0.5); near(cn.eps, (1 - Math.exp(-1)) / (1 - 0.5 * Math.exp(-1)), 1e-13); near(co.eps, (1 - Math.exp(-3)) / 1.5, 1e-13);
  near(cn.Q, 201.396084874, 1e-9); near(cn.Tho, 49.3019575629, 1e-9); near(cn.Tco, 70.3490212186, 1e-9); near(cn.LMTD, 50.3490212186, 1e-9);
  near(co.Q, 164.703574816, 1e-9); ok(cn.Tco > cn.Tho && co.Tco < co.Tho, 'kesişme yalnız karşı akımda');
  const bal = K.exchanger({ ...d, Cc: 2, flow: 'counter' });
  eq(bal.Cr, 1); near(bal.eps, 2 / 3, 1e-14); near(bal.LMTD, 130 / 3, 1e-12); near(bal.dT1, bal.dT2, 1e-12); near(bal.Q, 520 / 3, 1e-12);
  const big = K.exchanger({ ...d, U: 1500, A: 20, flow: 'counter' }), bigCo = K.exchanger({ ...d, U: 1500, A: 20, flow: 'co' });
  near(big.NTU, 15); ok(big.eps > 0.999 && Math.abs(bigCo.eps - 2 / 3) < 1e-6, 'büyük yüzey sınırları');
}
for (const bad of [() => K.exchanger({ flow: 'co', Thi: 20, Tci: 20, Ch: 1, Cc: 1, U: 1, A: 1 }), () => K.exchanger({ flow: 'x', Thi: 50, Tci: 20, Ch: 1, Cc: 1, U: 1, A: 1 }), () => K.effectiveness('counter', 1, 1.2), () => K.lmtd(-1, 2), () => K.profile({ flow: 'co', Thi: 50, Tci: 20, Ch: 0, Cc: 1, U: 1, A: 1 })]) { assert.throws(bad); checks++; }
const hxChecks = checks - reactorChecks - distChecks;
console.log(`D kimya mühendisliği: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS (reaktör ${reactorChecks}, damıtma ${distChecks}, ısı değiştirici ${hxChecks})`);

/* ── İsteğe bağlı gerçek tarayıcı denetimi ── */
if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright');
  const { createServer } = await import('node:http');
  const { join, extname } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const rootDir = fileURLToPath(new URL('../', import.meta.url));
  const server = createServer((req, res) => {
    const file = join(rootDir, decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!file.startsWith(rootDir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
    res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream');
    res.end(fs.readFileSync(file));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  let browser;
  try {
    browser = await chromium.launch();
    for (const view of [{ width: 390, height: 900, theme: 'light' }, { width: 1280, height: 900, theme: 'dark' }]) {
      const before = checks;
      const ctx = await browser.newContext({ viewport: { width: view.width, height: view.height }, deviceScaleFactor: 2 });
      const page = await ctx.newPage();
      await page.addInitScript((theme) => { localStorage.setItem('acelya-theme', theme); localStorage.setItem('acelya-sound-muted', '1'); }, view.theme);
      page.setDefaultTimeout(5000);
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      // Defter dosyası henüz yazılmamış olabilir: yalnız o 404 hoş görülür, başka her başarısız istek hatadır.
      page.on('console', (m) => { if (m.type() === 'error' && !m.text().startsWith('Failed to load resource')) errors.push(m.text()); });
      page.on('response', (r) => { if (r.status() >= 400 && !r.url().endsWith('/shared/digest/kimya-muhendisligi.js')) errors.push(`${r.status()} ${r.url()}`); });
      await page.goto(`http://127.0.0.1:${server.address().port}/kimya-muhendisligi.html`);
      const click = (id) => page.locator('#' + id).click();
      const read = (id) => page.locator('#' + id).textContent();
      const range = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event(e.tagName === 'SELECT' || e.type === 'checkbox' ? 'change' : 'input', { bubbles: true })); }, v);
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `${view.width}px #${id}: "${t}" içinde "${text}" yok`); checks++; };
      const lacks = async (id, text) => { const t = await read(id); assert(!t.includes(text), `${view.width}px #${id}: "${t}" içinde "${text}" olmamalı`); checks++; };
      const noOverflow = async (label) => { eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${view.width}px yatay taşma: ${label}`); };
      const painted = async (id) => { ok(await page.locator('#' + id).evaluate((c) => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++; return n > 500; }), `${id} boş`); };
      eq(await page.evaluate(() => document.documentElement.dataset.theme || 'dark'), view.theme, 'tema');
      // 01 · Reaktörler
      await has('rxDa', '2.000'); await has('rxTau', '10.00 dk'); await has('rxXc', '0.66667'); await has('rxXcNum', '0.66667'); await has('rxXs', '0.78400'); await has('rxXp', '0.86466'); await has('rxXpNum', '0.86466');
      await has('rxXpDiff', '< % 0.0001'); await has('rxVc', '450.0'); await has('rxVp', '115.1'); await has('rxVpNum', '115.1'); await has('rxRatio', '3.909'); await has('rxKOut', '0.20 dk⁻¹'); await has('rxSeriesName', '3 CSTR seri');
      await painted('rxLevenspiel'); await painted('rxSeries'); await noOverflow('reaktör');
      await click('rxPresetSecond'); await has('rxDa', '2.000'); await has('rxXc', '0.50000'); await has('rxXp', '0.66667'); await has('rxRatio', '10.000'); await has('rxKOut', 'L·mol⁻¹·dk⁻¹');
      await click('rxPresetHalf'); await has('rxDa', '4.000'); await has('rxXp', '1.00000'); await has('rxXpNum', '1.00000'); await has('rxStatus', '50.0 L'); await has('rxStatus', 'tükenir'); await has('rxStatus', 'boş yere durur'); await has('rxKOut', '0.40 √(mol/L)·dk⁻¹'); await has('rxOrderOut', '−r = k·√C');
      await range('rxV', 50); await has('rxXp', '1.00000'); await lacks('rxStatus', 'boş yere'); await has('rxStatus', 'boşta hacim kalmaz'); await range('rxV', 40); await has('rxXp', '0.96000'); await lacks('rxStatus', 'tükenir');
      await click('rxPresetMany'); await has('rxXs', '0.85136'); await has('rxSeriesName', '20 CSTR seri'); await has('rxStatus', '20 tanklı seri');
      await range('rxN', 1); await has('rxXs', '0.66667'); await has('rxStatus', 'tek CSTR ile aynıdır');
      await click('rxPreset99'); await has('rxVc', '4950.0'); await has('rxVp', '230.3'); await has('rxRatio', '21.498'); eq(await page.locator('#rxView').inputValue(), 'target'); await has('rxCaption', 'gereken hacimler'); await painted('rxLevenspiel');
      await range('rxV', 1000); await range('rxK', 1); await has('rxDa', '100.000'); await range('rxK', 0.01); await range('rxV', 10); await range('rxV0', 50); await has('rxDa', '0.002'); await noOverflow('reaktör uçlar');
      await click('rxReset'); await has('rxDa', '2.000'); eq(await page.locator('#rxView').inputValue(), 'same'); eq(await page.locator('#rxN').inputValue(), '3');
      // 02 · Damıtma
      await click('tab-ds'); eq(await page.locator('#panel-rx').isHidden(), true);
      await has('dsRmin', '1.100'); await has('dsRatio', '1.500'); await has('dsFenske', '6.43 → 7 kademe'); await has('dsCount', '7 basamak (kesirli 6.43)'); await has('dsStages', '12 (kesirli 11.59)'); await has('dsFeed', '6. kademe'); await has('dsPinch', '(0.500, 0.714)'); await has('dsDF', '0.500'); await has('dsQOut', 'doymuş sıvı');
      await painted('dsDiagram'); await painted('dsTradeoff'); await noOverflow('damıtma');
      await click('dsPresetPinch'); await has('dsStages', '∞'); await has('dsStatus', 'Ayırma mümkün değil: sonsuz kademe'); await has('dsFeed', 'tanımsız'); await has('dsROut', '1.10');
      await range('dsR', 0.5); await has('dsStatus', 'Ayırma mümkün değil: sonsuz kademe'); await has('dsRatio', '0.455');
      await click('dsPresetNear'); await has('dsStages', '21 (kesirli 20.17)'); await has('dsFeed', '11. kademe'); await lacks('dsStatus', 'mümkün değil');
      await click('dsPresetTotal'); await has('dsStages', '7 (kesirli 6.43)'); await has('dsROut', '∞'); await has('dsRatio', '∞'); await has('dsFeed', 'yok'); eq(await page.locator('#dsR').isDisabled(), true); await has('dsStatus', 'Toplam riflü');
      await click('dsPresetHard'); await has('dsRmin', '3.500'); await has('dsStages', '34 (kesirli 33.98)'); await has('dsFenske', '14.52 → 15 kademe'); await has('dsCount', '15 basamak (kesirli 14.52)'); eq(await page.locator('#dsR').isDisabled(), false);
      await click('dsReset'); await range('dsQ', 0); await has('dsQOut', 'doymuş buhar'); await has('dsPinch', '(0.286, 0.500)'); await has('dsRmin', '2.100'); await has('dsStatus', 'mümkün değil');
      await range('dsQ', -0.5); await range('dsAlpha', 5); await range('dsZF', 0.25); await range('dsXB', 0.2); await range('dsR', 10); assert((await read('dsStatus')).length > 20); checks++; await noOverflow('damıtma uçlar');
      await range('dsAlpha', 1.1); await range('dsQ', 1); await range('dsR', 10); await range('dsXB', 0.01); await range('dsXD', 0.99); assert((await read('dsStages')).length > 0); checks++; await painted('dsDiagram');
      await click('dsReset'); await has('dsStages', '12'); eq(await page.locator('#dsTotal').isChecked(), false);
      // 03 · Isı değiştirici
      await click('tab-hx');
      await has('hxNTU', '2.000'); await has('hxCr', '0.500'); await has('hxEps', '0.7746 (kuram 0.7746)'); await has('hxEpsOther', '0.6335'); await has('hxTho', '49.30 °C'); await has('hxTco', '70.35 °C'); await has('hxLMTD', '50.35 K'); await has('hxQmax', '260.0 kW');
      await has('hxQnum', '201.40'); await has('hxQeps', '201.40'); await has('hxQlm', '201.40'); await has('hxQcold', '201.40'); await has('hxQepsDiff', '< % 0.0001'); await has('hxStatus', 'sıcaklık kesişmesi');
      await painted('hxProfile'); await painted('hxEff'); await noOverflow('ısı değiştirici');
      await click('hxPresetCo'); await has('hxEps', '0.6335'); await has('hxEpsOther', '0.7746'); await has('hxTho', '67.65'); await has('hxTco', '61.18'); await has('hxQnum', '164.70'); await has('hxOtherLabel', 'Karşı akımda'); await lacks('hxStatus', 'kesişmesi yalnız');
      await click('hxPresetBalanced'); await has('hxCr', '1.000'); await has('hxEps', '0.6667 (kuram 0.6667)'); await has('hxLMTD', '43.33 K'); await has('hxQlm', '173.33'); await has('hxStatus', 'Dengeli durum'); await has('hxStatus', '43.33 K');
      await range('hxFlow', 'co'); await has('hxEps', '0.4908'); await has('hxStatus', '0.5'); await has('hxStatus', '85.0 °C'); eq((await read('hxStatus')).split('yaklaşır').length, 2, 'dengeli paralel akım tek cümle'); eq((await read('hxStatus')).split('sınırına dayanır').length, 2);
      await click('hxPresetLong'); await has('hxNTU', '15.000'); await has('hxEps', '0.9997'); await has('hxEpsOther', '0.6667'); await has('hxQlmDiff', '%');
      await range('hxCh', 10); await range('hxCc', 0.5); await has('hxNTU', '60.000'); await has('hxEps', '1.0000'); await has('hxStatus', 'alanı büyütmek'); await has('hxQlm', '65.00'); await has('hxQnum', '65.00');
      await range('hxCh', 0.5); await range('hxCc', 0.5); await range('hxFlow', 'co'); await has('hxEps', '0.5000'); await noOverflow('ısı değiştirici uçlar');
      await click('hxReset'); await has('hxNTU', '2.000'); eq(await page.locator('#hxFlow').inputValue(), 'counter');
      // Klavye: sekmeler ve R kısayolu
      await page.locator('#tab-hx').focus(); await page.keyboard.press('Home'); eq(await page.locator('#tab-rx').getAttribute('aria-selected'), 'true'); eq(await page.evaluate(() => document.activeElement.id), 'tab-rx');
      await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-ds').getAttribute('aria-selected'), 'true'); await page.keyboard.press('End'); eq(await page.locator('#tab-hx').getAttribute('aria-selected'), 'true');
      await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-rx').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowLeft'); eq(await page.locator('#tab-hx').getAttribute('aria-selected'), 'true');
      eq(await page.locator('#tab-rx').getAttribute('tabindex'), '-1'); eq(await page.locator('#panel-hx').isHidden(), false); eq(await page.locator('#panel-ds').isHidden(), true);
      await range('hxA', 20); await has('hxNTU', '5.000'); await page.locator('h1').click(); await page.keyboard.press('r'); await has('hxNTU', '2.000');
      await page.locator('#hxA').focus(); await range('hxA', 20); await page.keyboard.press('r'); await has('hxNTU', '5.000'); await click('hxReset');
      // Düğme odaktayken (hazır değere basıldıktan hemen sonra) R çalışır
      await click('hxPresetLong'); await has('hxNTU', '15.000'); eq(await page.evaluate(() => document.activeElement.id), 'hxPresetLong'); await page.keyboard.press('r'); await has('hxNTU', '2.000');
      // Dondurulmuş API, etiketler, taşma, hata yok
      eq(await page.evaluate(() => Object.isFrozen(ChemEngLab) && !Object.getOwnPropertyDescriptor(window, 'ChemEngLab').writable && !Object.getOwnPropertyDescriptor(window, 'ChemEngLab').configurable), true);
      eq(await page.evaluate(() => [...document.querySelectorAll('.ke-root input, .ke-root select')].every((e) => document.querySelector(`label[for="${e.id}"]`))), true, 'her denetimin etiketi var');
      eq(await page.evaluate(() => [...document.querySelectorAll('.ke-root canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), true);
      eq(await page.evaluate(() => getComputedStyle(document.querySelector('#panel-hx .ke-grid')).gridTemplateColumns.split(' ').length), 1 + (view.width >= 760 ? 1 : 0), 'sütun sayısı');
      await noOverflow('son'); assert.deepEqual(errors, []); checks++;
      console.log(`D kimya mühendisliği: ${checks - before} gerçek tarayıcı kontrolü PASS (${view.width} px, ${view.theme === 'light' ? 'aydınlık' : 'karanlık'})`);
      await ctx.close();
    }
  } finally {
    await browser?.close();
    await new Promise((r) => server.close(r));
  }
}
