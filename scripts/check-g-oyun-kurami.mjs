// G · oyun-kurami.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın algoritmalarını yeniden kullanmaz:
// karma stratejiler üzerinde ızgara araması ve doğrudan sapma sınaması, 2×2 ve kare oyunlarda kapalı biçimler,
// simpleks yerine ızgara üzerinde maksimin araması ve ikillik sertifikası, Markov matrisinin tersi yerine dağılımın
// tur tur ileri yürütülmesi ve sınırda durağan dağılım (kuvvet yinelemesi), kapalı biçimli maç değerleri,
// Press–Dyson'ın yayımlanmış gaspçı olasılıkları (11/13, 1/2, 7/26, 0), RK4 yerine orta nokta yöntemi,
// doğrusallaştırılmış dönme süresi 2π√3, bağımsız bir üreteçle (64 bit LCG) Monte Carlo.
// Kullanım: node scripts/check-g-oyun-kurami.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "oyun-kurami";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.GameLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };

/* ── Kabuk ── */
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(!/fonts\.googleapis|atlas\.css|atlas\.js|stem-content|cdn\.|https?:\/\/[^"]*\.js"/.test(html.replace(/<details[\s\S]*<\/details>/, "")), "dış betik, Google Fonts ya da CDN yok");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Oyun Kuramı: ") && title.length <= 80, "başlık biçimi ve uzunluğu: " + title.length);
ok(/<body class="app-page" data-page="oyun-kurami">/.test(html) && /<meta name="description" content="[^"]{60,}"/.test(html), "kabuk ve açıklama");
ok(/<link rel="stylesheet" href="shared\/theme\.css">/.test(html) && /<script src="shared\/app\.js"><\/script>/.test(html), "theme.css ve app.js");
ok(/viewport-fit=cover/.test(html) && /<html lang="tr" class="app-root">/.test(html), "viewport ve kök");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(html.replace(/★/g, "")), "emoji yok");
ok(!/body\s*\{[^}]*overflow\s*:\s*hidden/.test(html), "body overflow:hidden yok");
ok(/href="dogal-secilim\.html"/.test(html), "doğal seçilim bağlantısı");
ok(html.includes("hiçbir oyuncuyu zarara sokmadan en az birinin") && !html.includes("iki oyuncuyu birden zarara"), "Pareto tanımı (güçlü)");
ok(html.includes("Axelrod'unkine en yakın düzenle") && !html.includes("2004'te aynı düzenle"), "2004 turnuvası: en yakın düzen (SEP)");

function lcg(seed) { let s = BigInt(seed); return () => { s = (s * 6364136223846793005n + 1442695040888963407n) & ((1n << 64n) - 1n); return Number(s >> 11n) / 2 ** 53; }; }
const randGame = (r, m, n, lo = -5, hi = 5) => Array.from({ length: m }, () => Array.from({ length: n }, () => lo + (hi - lo) * r()));
const ev = (A, x, y) => { let s = 0; for (let i = 0; i < x.length; i++) for (let j = 0; j < y.length; j++) s += x[i] * A[i][j] * y[j]; return s; };
/* Bağımsız denge sınaması: her saf sapmanın kazancını doğrudan hesapla */
function isNash(A, B, x, y, tol = 1e-7) {
  const u = ev(A, x, y), v = ev(B, x, y);
  for (let k = 0; k < x.length; k++) { const e = x.map((_, i) => (i === k ? 1 : 0)); if (ev(A, e, y) > u + tol) return false; }
  for (let l = 0; l < y.length; l++) { const e = y.map((_, j) => (j === l ? 1 : 0)); if (ev(B, x, e) > v + tol) return false; }
  return true;
}

/* ── 1 · Nash dengesi ── */
{
  const G = K.GAMES;
  // kapalı biçimler
  let M = K.mixed2x2(G.bos.A, G.bos.B); near(M.p, 3 / 5, 1e-12, "BoS p"); near(M.q, 2 / 5, 1e-12, "BoS q"); near(M.u, 6 / 5, 1e-12); near(M.v, 6 / 5, 1e-12);
  M = K.mixed2x2(G.stag.A, G.stag.B); near(M.p, 3 / 4, 1e-12, "geyik p");
  M = K.mixed2x2(G.hd.A, G.hd.B); near(M.p, 4 / 6, 1e-12, "şahin–güvercin V/C"); near(M.u, (4 / 2) * (1 - 4 / 6), 1e-12, "ESS kazancı (V/2)(1 − V/C)");
  M = K.mixed2x2(G.mp.A, G.mp.B); near(M.p, 0.5, 1e-12); ok(!K.mixed2x2(G.pd.A, G.pd.B).ok, "PD: iç denge yok");
  ok(JSON.stringify(K.pureNashBR(G.pd.A, G.pd.B).eq) === "[[1,1]]", "PD tek saf denge (B, B)");
  ok(K.pureNashBR(G.mp.A, G.mp.B).eq.length === 0 && K.pureNashBR(G.rps.A, G.rps.B).eq.length === 0, "yazı tura, TKM: saf denge yok");
  ok(K.supportEnum(G.coord3.A, G.coord3.B).eq.length === 7, "üçlü eşgüdüm: 2³ − 1 = 7 denge");
  const sh = K.supportEnum(G.shapley.A, G.shapley.B).eq; ok(sh.length === 1 && sh[0].x.every((v) => Math.abs(v - 1 / 3) < 1e-12), "Shapley oyunu: tek denge (1/3, 1/3, 1/3)");
  ok(JSON.stringify(K.paretoPure(G.pd.A, G.pd.B)) === "[[0,0],[0,1],[1,0]]", "PD Pareto: (B, B) dışındakiler");
  const D = K.iesds(G.pd.A, G.pd.B); ok(D.rows.length === 1 && D.rows[0] === 1 && D.cols[0] === 1, "PD baskınlık elemesi");
  // rastgele oyunlar: her bulunan denge bağımsız sınamadan geçer; 2×2'de ızgara aramasıyla karşılaştırılır
  const r = lcg(11);
  for (let t = 0; t < 300; t++) {
    const m = t % 2 ? 3 : 2, A = randGame(r, m, m), B = randGame(r, m, m), S = K.supportEnum(A, B);
    ok(S.eq.length >= 1 && S.eq.length % 2 === 1, `rastgele ${m}×${m}: denge sayısı tek (${S.eq.length})`);
    for (const e of S.eq) { ok(isNash(A, B, e.x, e.y), "denge koşulu"); near(e.u, ev(A, e.x, e.y), 1e-9); near(e.v, ev(B, e.x, e.y), 1e-9); }
    const pure = []; for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) { const x = new Array(m).fill(0), y = new Array(m).fill(0); x[i] = 1; y[j] = 1; if (isNash(A, B, x, y, 0)) pure.push([i, j]); }
    ok(JSON.stringify(K.pureNashBR(A, B).eq) === JSON.stringify(pure) && JSON.stringify(K.pureNashBrute(A, B).eq) === JSON.stringify(pure), "saf dengeler: tanımdan");
    if (m === 2) {
      const mix = K.mixed2x2(A, B), inner = S.eq.filter((e) => !e.pure);
      ok(mix.ok === (inner.length === 1), "iç denge varlığı iki yolda aynı");
      if (mix.ok) { abs(mix.p, inner[0].x[0], 1e-9); abs(mix.q, inner[0].y[0], 1e-9); }
      // ızgara: p, q ∈ {0, 1/400, …}; iç denge yakınında ε-Nash bir nokta bulunmalı
      if (mix.ok) { const g = 400, pi = Math.round(mix.p * g) / g, qi = Math.round(mix.q * g) / g; ok(isNash(A, B, [pi, 1 - pi], [qi, 1 - qi], 10 * 5 / g), "ızgarada ε-denge"); }
    }
  }
  assert.throws(() => K.pureNashBR([[1, 2]], [[1]])); assert.throws(() => K.mixed2x2([[1, 2, 3], [1, 2, 3]], [[1, 2, 3], [1, 2, 3]])); assert.throws(() => K.supportEnum([[NaN, 1], [1, 1]], [[1, 1], [1, 1]])); checks += 3;
  ok(K.isDegenerate([[1, 1], [0, 0]], [[1, 1], [0, 0]]), "dejenere oyun tanınır");
}

/* ── 2 · Sıfır toplamlı oyunlar ── */
{
  const Z = K.ZS;
  // yayımlanmış/kapalı değerler
  near(K.zeroSumLP(Z.mp.A).v, 0, 1e-12); near(K.zeroSumLP(Z.rps.A).v, 0, 1e-12); near(K.zeroSumLP(Z.saddle.A).v, 2, 1e-12, "eyer");
  const [[a, b], [c, d]] = Z.pen.A, vPen = (a * d - b * c) / (a + d - b - c);
  near(K.zeroSumLP(Z.pen.A).v, vPen, 1e-12, "penaltı kapalı biçim"); near(K.zeroSumLP(Z.pen.A).x[0], (d - c) / (a + d - b - c), 1e-12, "penaltı p*");
  near(K.zeroSumLP(Z.g23.A).v, 1, 1e-12, "2×3 değer"); near(K.graphical2(Z.g23.A).p, 0.6, 1e-12);
  near(K.zeroSumLP(Z.skew.A).v, 0.3, 1e-12, "eğik 3×3");
  const r = lcg(21);
  for (let t = 0; t < 200; t++) {
    const m = 2 + (t % 2), n = 2 + ((t >> 1) % 2), A = randGame(r, m, n), L = K.zeroSumLP(A);
    // ikillik sertifikası: x* her sütuna en az v, y* her satıra en çok v bırakır
    ok(L.x.every((v) => v >= -1e-12) && L.y.every((v) => v >= -1e-12), "olasılıklar ≥ 0");
    near(L.x.reduce((s, v) => s + v, 0), 1, 1e-10); near(L.y.reduce((s, v) => s + v, 0), 1, 1e-10);
    for (let j = 0; j < n; j++) ok(L.x.reduce((s, xi, i) => s + xi * A[i][j], 0) >= L.v - 1e-9, "x* güvencesi");
    for (let i = 0; i < m; i++) ok(A[i].reduce((s, aij, j) => s + aij * L.y[j], 0) <= L.v + 1e-9, "y* güvencesi");
    // ızgara maksimini: v'yi aşamaz ve ona yaklaşır
    let best = -Infinity; const g = m === 2 ? 4000 : 150;
    if (m === 2) for (let k = 0; k <= g; k++) { const p = k / g; best = Math.max(best, Math.min(...A[0].map((_, j) => p * A[0][j] + (1 - p) * A[1][j]))); }
    else for (let k = 0; k <= g; k++) for (let l = 0; l <= g - k; l++) { const x = [k / g, l / g, (g - k - l) / g]; best = Math.max(best, Math.min(...A[0].map((_, j) => x[0] * A[0][j] + x[1] * A[1][j] + x[2] * A[2][j]))); }
    ok(best <= L.v + 1e-9 && best >= L.v - (m === 2 ? 0.02 : 0.25), `ızgara maksimini ${best} ≤ v = ${L.v}`);
    const I = K.zeroSumIndiff(A); if (I.eq.length) near(I.eq[0].v, L.v, 1e-8, "kayıtsızlık = LP");
    if (m === 2) near(K.graphical2(A).v, L.v, 1e-9, "grafik = LP");
    const S = K.saddle(A); ok(S.maximin <= L.v + 1e-9 && L.v <= S.minimax + 1e-9, "saf maksimin ≤ v ≤ saf minimaks");
    const F = K.fictitiousPlay(A, 3000); ok(F.lower <= L.v + 1e-9 && L.v <= F.upper + 1e-9, "hayali oyun sınırları v'yi kapsar");
  }
  // yinelenen oyun: denge karışımı sömürücüye karşı v; düzgün karışım güvence düzeyine iner (bağımsız tohumlar)
  const L = K.zeroSumLP(Z.pen.A);
  for (let s = 1; s <= 5; s++) {
    const R = K.repeatedPlay(Z.pen.A, L.x, "br", 20000, s); ok(Math.abs(R.mean - vPen) < 4 * R.se + 1e-3, `x* ortalaması v'ye yakın (tohum ${s})`);
    const U = K.repeatedPlay(Z.pen.A, [0.5, 0.5], "br", 20000, s); ok(Math.abs(U.mean - 0.75) < 4 * U.se + 2e-3, "düzgün karışım 0,75'e sömürülür");
    const C = K.repeatedPlay(Z.pen.A, L.x, "uniform", 20000, s); abs(C.theory, (L.x[0] * (a + b) + L.x[1] * (c + d)) / 2, 1e-12); ok(Math.abs(C.mean - C.theory) < 4 * C.se, "düzgün rakip");
  }
  // hayali oyun: TKM'de boşluk t^(−1/2) civarında daralır (ölçülen, bu oyuna özgü)
  const F = K.fictitiousPlay(Z.rps.A, 100000), sl = K.logSlope(F.trace, 10000); ok(sl < -0.3 && sl > -0.8, "TKM günlük eğim " + sl);
  ok(F.x.every((v) => Math.abs(v - 1 / 3) < 0.01), "TKM sıklıkları 1/3'e yakın");
  const Fs = K.fictitiousPlay(Z.saddle.A, 1000); abs(Fs.lower, 2, 1e-12); abs(Fs.x[0], 1, 1e-12, "eyerde saf strateji");
}

/* ── 3 · Yinelenen tutsak ikilemi ── */
{
  const pay = { T: 5, R: 3, P: 1, S: 0 }, par = { g: 1 / 3, user: [1, 1, 0, 1, 0] }, A = (k) => K.automaton(k, par);
  // kapalı biçimler
  for (const d of [0, 0.3, 0.5, 0.9, 0.99]) {
    near(K.exactMatch(A("alld"), A("grim"), pay, d, 0).a, (1 - d) * pay.T + d * pay.P, 1e-10, "hep bozma × tetikçi");
    near(K.exactMatch(A("tft"), A("alld"), pay, d, 0).a, (1 - d) * pay.S + d * pay.P, 1e-10, "kısas × hep bozma");
    near(K.exactMatch(A("tft"), A("tft"), pay, d, 0).a, pay.R, 1e-12); near(K.exactMatch(A("allc"), A("alld"), pay, d, 0).a, pay.S, 1e-12);
    near(K.exactMatch(A("rand"), A("allc"), pay, d, 0).a, (pay.R + pay.T) / 2, 1e-12);
    // kısas × sürekli bozan-sonra-işbirliği eden değil; Pavlov × hep bozma: İ, B, İ, B… → (S + δP)/(1 + δ)
    near(K.exactMatch(A("wsls"), A("alld"), pay, d, 0).a, (pay.S + d * pay.P) / (1 + d), 1e-10, "Pavlov × hep bozma");
  }
  // matrisin tersi yerine dağılımı tur tur ileri yürüt (bağımsız)
  function forward(a, b, delta, eps, rounds = 4000) {
    let dist = new Map([[a.start + "," + b.start, 1]]), tot = 0, w = 1;
    for (let t = 0; t < rounds; t++) {
      const nd = new Map(); let u = 0;
      for (const [k, pr] of dist) {
        const [sa, sb] = k.split(",").map(Number), qa = a.p[sa] * (1 - eps) + (1 - a.p[sa]) * eps, qb = b.p[sb] * (1 - eps) + (1 - b.p[sb]) * eps;
        for (const ma of [0, 1]) for (const mb of [0, 1]) {
          const q = pr * (ma ? qa : 1 - qa) * (mb ? qb : 1 - qb); if (!q) continue;
          u += q * (ma ? (mb ? pay.R : pay.S) : (mb ? pay.T : pay.P));
          const key = a.next(sa, ma, mb) + "," + b.next(sb, mb, ma); nd.set(key, (nd.get(key) || 0) + q);
        }
      }
      tot += w * u; w *= delta; dist = nd; if (w < 1e-15) break;
    }
    return (1 - delta) * tot;
  }
  const keys = K.STRATS, r = lcg(31);
  for (let t = 0; t < 60; t++) {
    const u = [0, 0, 0, 0, 0].map(() => Math.round(r() * 1e6) / 1e6), p2 = { g: r(), user: u };
    const i = keys[Math.floor(r() * keys.length)], j = keys[Math.floor(r() * keys.length)], delta = [0, 0.5, 0.9, 0.95][t % 4], eps = [0, 0.01, 0.05, 0.2][(t >> 2) % 4];
    near(K.exactMatch(K.automaton(i, p2), K.automaton(j, p2), pay, delta, eps).a, forward(K.automaton(i, p2), K.automaton(j, p2), delta, eps), 1e-9, `${i}×${j} δ=${delta} ε=${eps}`);
  }
  // gürültü: kısas kendi kopyasıyla δ → 1 sınırında (T + R + P + S)/4 (SEP); cömert kısas çok daha iyi
  abs(K.exactMatch(A("tft"), A("tft"), pay, 1 - 1e-7, 0.01).a, 2.25, 2e-3, "kısas × kısas, gürültülü sınır");
  ok(K.exactMatch(A("gtft"), A("gtft"), pay, 0.95, 0.05).a > K.exactMatch(A("tft"), A("tft"), pay, 0.95, 0.05).a + 0.3, "cömert kısas gürültüye dayanıklı");
  // turnuva: bağımsız tohumlar, ölçülen ≈ kesin
  for (const seed of [1, 2, 3]) {
    const T = K.tournament(keys, par, pay, 0.9, 0.02, 1500, seed);
    let md = 0, sd = 0; for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { const d = Math.abs(T.meas[i][j] - T.exact[i][j]); md = Math.max(md, d); sd += d / 64; }
    ok(md < 0.12 && sd < 0.025, `turnuva ölçülen–kesin farkı en çok ${md}, ortalama ${sd} (tohum ${seed})`); abs(T.meanRounds, 10, 0.25, "ortalama maç uzunluğu 1/(1 − δ)");
  }
  // Press–Dyson gaspçı stratejisi: yayımlanmış olasılıklar ve durağan dağılımda (s_X − P) = χ(s_Y − P)
  const Z = K.zdExtort(pay, 3); near(Z.p[0], 11 / 13, 1e-12); near(Z.p[1], 1 / 2, 1e-12); near(Z.p[2], 7 / 26, 1e-12); near(Z.p[3], 0, 1e-12);
  function stationary(pX, pY) { // bir tur bellekli iki strateji, durumlar (X, Y) = İİ, İB, Bİ, BB; kuvvet yinelemesi
    const qY = [pY[0], pY[2], pY[1], pY[3]]; let v = [0.25, 0.25, 0.25, 0.25];
    for (let it = 0; it < 20000; it++) { const n = [0, 0, 0, 0]; for (let s = 0; s < 4; s++) { const a = pX[s], b = qY[s]; n[0] += v[s] * a * b; n[1] += v[s] * a * (1 - b); n[2] += v[s] * (1 - a) * b; n[3] += v[s] * (1 - a) * (1 - b); } v = n; }
    return [v[0] * pay.R + v[1] * pay.S + v[2] * pay.T + v[3] * pay.P, v[0] * pay.R + v[1] * pay.T + v[2] * pay.S + v[3] * pay.P];
  }
  for (let t = 0; t < 20; t++) { const q = [0.05 + 0.9 * r(), 0.05 + 0.9 * r(), 0.05 + 0.9 * r(), 0.05 + 0.9 * r()], [sx, sy] = stationary(Z.p, q); abs(sx - pay.P, 3 * (sy - pay.P), 1e-6, "ZD doğrusal bağ"); }
  // sayfanın kesin değeri δ → 1'de aynı bağı verir
  const zu = K.automaton("user", { user: [1, ...Z.p] }), opp = K.automaton("user", { user: [1, 0.3, 0.7, 0.2, 0.9] }), e = K.exactMatch(zu, opp, pay, 1 - 1e-7, 0);
  abs(e.a - pay.P, 3 * (e.b - pay.P), 1e-4, "ZD, sayfanın kesin değeri");
  // halk teoremi eşiği: ölçülen kesişim kuramsal eşiğe yakın, birkaç tohumda ve başka kazançlarda
  for (const [pp, seed] of [[pay, 1], [pay, 2], [{ T: 4, R: 3, P: 1, S: 0 }, 3], [{ T: 7, R: 3, P: 1, S: 0 }, 4]]) {
    const ds = []; for (let k = 1; k <= 49; k++) ds.push(k / 50);
    const sc = K.grimScan(pp, ds, 400, seed); abs(sc.cross, (pp.T - pp.R) / (pp.T - pp.P), 0.04, "δ* ölçülen");
  }
  near(K.grimThreshold(pay), 0.5, 1e-12); near(K.tftAltThreshold(pay), 2 / 3, 1e-12);
  const c = K.checkPay(pay); ok(c.order && c.rca, "PD koşulları"); ok(!K.checkPay({ T: 3, R: 5, P: 1, S: 0 }).order, "sıra bozuk");
  assert.throws(() => K.exactMatch(A("tft"), A("tft"), pay, 1, 0)); assert.throws(() => K.automaton("user", { user: [1, 2, 0, 0, 0] })); assert.throws(() => K.automaton("xyz")); checks += 3;
}

/* ── 4 · Evrimsel oyunlar ── */
{
  // orta nokta yöntemiyle bağımsız yineleyici integrali
  function midpoint(A, x0, T, h) { let x = x0.slice(); const f = (x) => { const g = A.map((r) => r.reduce((s, a, j) => s + a * x[j], 0)), phi = x.reduce((s, v, i) => s + v * g[i], 0); return x.map((v, i) => v * (g[i] - phi)); }; for (let t = 0; t < Math.round(T / h); t++) { const k1 = f(x), xm = x.map((v, i) => v + h / 2 * k1[i]), k2 = f(xm); x = x.map((v, i) => v + h * k2[i]); } return x; }
  for (const [V, C, x0] of [[4, 6, 0.1], [4, 8, 0.9], [1, 10, 0.5], [6, 4, 0.2], [2, 20, 0.05]]) {
    const tr = K.replicator(K.hdMatrix(V, C), [x0, 1 - x0], 120, 0.01, 10), xe = tr[tr.length - 1][1][0];
    abs(xe, C > V ? V / C : 1, C > V ? 1e-6 : 2e-2, `şahin–güvercin V=${V} C=${C}`);
    abs(xe, midpoint(K.hdMatrix(V, C), [x0, 1 - x0], 120, 0.002)[0], 1e-4, "orta nokta ile aynı");
    for (const m of [0, 0.3, 0.77, 1]) near(K.hdE(V, C, V / C, m) - K.hdE(V, C, m, m), C / 2 * (V / C - m) ** 2, 1e-12, "ESS 2. koşulu kapalı biçim");
  }
  // TKM: a = b'de x₁x₂x₃ korunur; merkeze yakın dönme süresi 2π√3
  const H = (x) => Math.log(x[0] * x[1] * x[2]);
  let tr = K.replicator(K.rpsMatrix(1, 1), [0.5, 0.3, 0.2], 100, 0.01, 1); abs(H(tr[tr.length - 1][1]) - H([0.5, 0.3, 0.2]), 0, 1e-9, "H korunur");
  tr = K.replicator(K.rpsMatrix(1, 1), [0.335, 0.333, 0.332], 120, 0.01, 1); abs(K.periodOf(tr, 0).period, 2 * Math.PI * Math.sqrt(3), 2e-3, "doğrusal dönme süresi");
  near(K.rpsEigen(1, 1).period, 2 * Math.PI * Math.sqrt(3), 1e-12);
  tr = K.replicator(K.rpsMatrix(1.5, 1), [0.5, 0.3, 0.2], 200, 0.01, 10); ok(tr[tr.length - 1][1].every((v) => Math.abs(v - 1 / 3) < 1e-3), "a > b: içe sönüm");
  tr = K.replicator(K.rpsMatrix(1, 1.5), [0.5, 0.3, 0.2], 200, 0.01, 10); ok(Math.min(...tr[tr.length - 1][1]) < 1e-3, "a < b: sınıra açılım");
  const mp = midpoint(K.rpsMatrix(1, 1.2), [0.4, 0.35, 0.25], 30, 0.001), rk = K.replicator(K.rpsMatrix(1, 1.2), [0.4, 0.35, 0.25], 30, 0.01, 1);
  for (let i = 0; i < 3; i++) abs(rk[rk.length - 1][1][i], mp[i], 1e-5, "TKM orta nokta ile aynı");
  // özdeğerler: merkezde Jacobian'ı sonlu farkla, izdüşümlü 2×2 sistemin izi ve determinantı
  for (const [a, b] of [[1, 1], [1.5, 1], [1, 2.5]]) {
    const A = K.rpsMatrix(a, b), c = [1 / 3, 1 / 3, 1 / 3], h = 1e-6, F = (x1, x2) => K.repField(A, [x1, x2, 1 - x1 - x2]);
    const f0 = F(c[0], c[1]), fx = F(c[0] + h, c[1]), fy = F(c[0], c[1] + h), J = [[(fx[0] - f0[0]) / h, (fy[0] - f0[0]) / h], [(fx[1] - f0[1]) / h, (fy[1] - f0[1]) / h]];
    const tr2 = J[0][0] + J[1][1], det = J[0][0] * J[1][1] - J[0][1] * J[1][0], E = K.rpsEigen(a, b);
    abs(tr2 / 2, E.re, 1e-5, "Re λ"); abs(Math.sqrt(det - tr2 * tr2 / 4), E.im, 1e-5, "Im λ");
  }
  // sonlu nüfus: zaman ortalaması V/C'ye yakın, birkaç tohumda
  for (let s = 1; s <= 4; s++) { const w = K.wrightFisherHD(4, 6, 1000, 0.1, 2000, s), tail = w.trace.slice(200); abs(tail.reduce((p, q) => p + q, 0) / tail.length, 2 / 3, 0.01, "WF ortalaması"); }
  assert.throws(() => K.replicator([[0, 1], [1, 0]], [0.5, 0.6], 1, 0.1)); checks++;
}
console.log(`G oyun-kurami: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

/* ── Tarayıcı ── */
if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  ok(fs.existsSync(new URL(`../shared/digest/${SLUG}.js`, import.meta.url)), "Keşif Defteri dosyası var");
  let browser;
  const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await ctx.newPage();
      await page.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      page.setDefaultTimeout(15000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const settle = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const pressR = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); await settle(); };
      const labels = async () => { const u = await page.evaluate(() => [...document.querySelectorAll("main input, main select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label")).map((e) => e.id)); ok(u.length === 0, "etiketsiz denetim: " + u.join(",")); };
      await labels();
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-9; })), "varsayılanlar adım ızgarasında");
      ok(await page.evaluate(() => !document.querySelector('main input[type="number"]')), "type=number yok");
      // 1
      await has("neBRres", "(Bozma, Bozma)"); await has("neBruteE", "işaretlemeyle aynı"); await has("neDom", "Kalan: Bozma × Bozma"); await has("neMix", "İç karma denge yok"); await has("neSupp", "1 denge"); await has("neParE", "Pareto etkin olmayan denge: (Bozma, Bozma)"); await has("neStatus", "(İşbirliği, İşbirliği) iki oyuncuya");
      await sel("neGame", "bos"); await has("neMix", "p = 0,6000 · q = 0,4000"); await has("nePay", "satır 1,200 · sütun 1,200"); await has("neOdd", "3: tek");
      await sel("neGame", "stag"); await has("neMix", "p = 0,7500"); await has("neStatus", "hiçbir saf dengedekinden yüksek değil");
      await sel("neGame", "hd"); await has("neMix", "p = 0,6667 · q = 0,6667");
      await sel("neGame", "coord3"); await has("neSupp", "7 denge: 3 saf, 4 karma"); await has("neOdd", "7: tek"); ok((await page.locator("#neEdit input").count()) === 18, "3×3 düzenleyici");
      await sel("neGame", "shapley"); await has("neSupp", "1 denge: 0 saf, 1 karma");
      await sel("neGame", "pd"); await page.locator("#neA00").fill("6"); await page.locator("#neB00").fill("6"); await has("neBRres", "(İşbirliği, İşbirliği)"); ok((await page.locator("#neGame").inputValue()) === "custom", "düzenleme özel oyuna geçirir");
      await page.locator("#neA00").fill("abc"); ok((await page.locator("#neA00").getAttribute("aria-invalid")) === "true", "geçersiz girdi işaretlenir"); await has("neBRres", "(İşbirliği, İşbirliği)");
      await page.locator("#neA00").fill("−0,5"); await has("neBRres", "(Bozma, Bozma)");
      await sel("neSize", "3"); ok((await page.locator("#neEdit input").count()) === 18, "boyut 3");
      await page.click("#neRand"); const t1 = await read("neSupp"); ok(/\d+ denge/.test(t1), "rastgele oyun"); await labels();
      for (let k = 0; k < 9; k++) await page.locator("#ne" + "A" + Math.floor(k / 3) + (k % 3)).fill("0"); for (let k = 0; k < 9; k++) await page.locator("#neB" + Math.floor(k / 3) + (k % 3)).fill("0");
      await has("neOddE", "dejenere"); await has("neStatus", "dejenere");
      await pressR(); await has("neBRres", "(Bozma, Bozma)"); ok((await page.locator("#neEdit input").count()) === 8, "R sıfırlar (1)");
      await page.click("#neReset"); await has("neBRres", "(Bozma, Bozma)");
      // sekme klavyesi
      await page.locator("#tab-ne").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-ev").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-zs").getAttribute("aria-selected")) === "true", "ArrowRight");
      // 2
      await has("zsLP", "0,0000"); await has("zsInd", "0,0000"); await has("zsGr", "0,0000"); await has("zsSad", "−1,000 ≤ 1,000"); await has("zsRep", "0,0032 ± 0,0283"); await has("zsFPb", "L = −0,0010 · U = 0,0130"); await has("zsFPxE", "günlük eğim −0,50");
      await sel("zsGame", "pen"); await has("zsLP", "0,7909"); await has("zsX", "(0,3636; 0,6364)"); await has("zsY", "(0,4545; 0,5455)"); await has("zsRep", "0,7918"); await has("zsStatus", "sömürücü rakibe karşı bile");
      await sel("zsRow", "uni"); await has("zsRepE", "güvence düzeyi 0,7500"); await has("zsRep", "0,7509"); await has("zsStatus", "Denge dışı karışım sömürüldü");
      await sel("zsOpp", "col0"); await has("zsRepE", "beklenen 0,7500");
      await sel("zsGame", "saddle"); await has("zsLP", "2,0000"); await has("zsSadE", "eyer noktası"); await has("zsGr", "—");
      await sel("zsGame", "rps"); await sel("zsT", "100000"); await has("zsFPbE", "arada");
      await sel("zsSize", "2x3"); ok((await page.locator("#zsEdit input").count()) === 6, "2×3 düzenleyici"); await labels();
      await page.locator("#zsA00").fill("2,5"); ok(!(await read("zsLP")).includes("NaN"), "düzenleme");
      await range("zsN", 100); await settle(); await has("zsNOut", "100"); await range("zsN", 20000); await settle(); await has("zsNOut", "20\u202f000");
      await page.click("#zsNew"); ok((await page.locator("#zsSeed").inputValue()) === "2", "yeni tohum");
      await pressR(); await has("zsRep", "0,0032 ± 0,0283"); ok((await page.locator("#zsGame").inputValue()) === "mp" && (await page.locator("#zsOpp").inputValue()) === "br", "R sıfırlar (2)");
      // 3
      await page.click("#tab-pd"); await settle();
      await has("pdChk", "T > R > P > S: evet · 2R > T + S: evet"); await has("pdTop", "Tetikçi (grim) · 2,546"); await has("pdTopE", "2,544"); await has("pdDiffE", "ortalama maç 20,01 tur"); await has("pdTft", "3,000 · kesin 3,000");
      await has("pdGrim", "ölçülen 0,498 · kuram 0,500"); await has("pdNow", "Hayır"); await has("pdZD", "10⁻⁵");
      ok((await page.locator("#pdU1").inputValue()) === "0,846154" && (await page.locator("#pdU3").inputValue()) === "0,269231", "gaspçı olasılıkları");
      ok((await page.locator("#pdRank tr").count()) === 8 && (await page.locator("#pdPair tr").count()) === 8, "tablolar");
      await page.click("#pdNoisy"); await settle(); await has("pdTft", "kesin 2,516"); await has("pdGtft", "kesin 2,869"); await has("pdWsls", "kesin 2,785"); await has("pdTop", "Hep bozma"); await has("pdZDe", "ε > 0 bağı bozar"); await has("pdStatus", "misilleme zincirine");
      await page.click("#pdShort"); await settle(); await has("pdNow", "Evet"); await has("pdStatus", "bozmak kazandırır");
      await range("pdT", 2); await settle(); await has("pdChk", "T > R > P > S: hayır"); await has("pdGrim", "—"); await has("pdStatus", "tutsak ikilemi değil");
      await range("pdDelta", 0); await settle(); await has("pdDiffE", "ortalama maç 1,00 tur"); ok(!(await page.locator("main").textContent()).includes("NaN"), "δ = 0'da NaN yok");
      await range("pdDelta", 0.99); await range("pdEps", 0.2); await range("pdM", 50); await settle(); ok(!(await read("pdDiff")).includes("—"), "sınır değerler");
      await sel("pdUPre", "wsls"); ok((await page.locator("#pdU4").inputValue()) === "1", "Pavlov hazır değeri"); await has("pdZD", "—");
      await page.locator("#pdU2").fill("1,5"); ok((await page.locator("#pdU2").getAttribute("aria-invalid")) === "true", "1'den büyük olasılık reddedilir");
      await page.locator("#pdU2").fill("0,25"); await settle(); ok((await page.locator("#pdUPre").inputValue()) === "custom", "kendi değerlerin");
      await pressR(); await has("pdTop", "Tetikçi (grim) · 2,546"); ok((await page.locator("#pdUPre").inputValue()) === "zd", "R sıfırlar (3)");
      await page.click("#pdReset"); await settle(); await has("pdGrim", "0,498");
      // 4
      await page.click("#tab-ev"); await settle();
      await has("evS0", "0,6667"); await has("evE0", "kuram V/C = 0,6667"); await has("evS2", "0,6682 ± 0,031"); await has("evS3", "0,963"); await has("evE3", "0,963"); await has("evS5", "0,6674"); await has("evE5", "0,6667");
      ok(!(await page.locator("#evFormula").innerHTML()).includes("&lt;"), "formül kutusunda ham etiket yok");
      await range("evC", 8); await settle(); await has("evS0", "0,5000"); await has("evS5", "1,0000");
      await range("evC", 2); await settle(); await has("evE0", "C ≤ V"); await has("evS5", "—"); await has("evStatus", "C ≤ V");
      await range("evV", 10); await range("evC", 0.5); await range("evX0", 0.99); await range("evN", 2000); await settle(); ok(!(await page.locator("#panel-ev").textContent()).includes("NaN"), "sınır değerler (4)");
      await sel("evMode", "rps"); await settle(); await has("evS0", "0,0000 ± 0,5774i"); await has("evE0", "10,8828"); await has("evE2", "kuram 0"); await has("evStatus", "yansız döngü");
      await page.click("#evNear"); await settle(); await has("evS1", "10,88");
      await page.click("#evDamp"); await settle(); await has("evStatus", "içe doğru sönümlenir"); await has("evS4", "—");
      await page.click("#evUnst"); await settle(); await has("evStatus", "kenarına yaklaşır");
      await range("evR0", 0.9); await range("evP0", 0.9); await settle(); await has("evStatus", "Başlangıç geçersiz");
      await sel("evMode", "ipd"); await settle(); await has("evS1", "3,000"); await has("evStatus", "işbirliği yerleşmiş"); ok(await page.locator("#evIPD").isVisible() && !(await page.locator("#evHD").isVisible()), "denetim grupları");
      await page.click("#tab-pd"); await page.click("#pdNoisy"); await settle(); await page.click("#tab-ev"); await settle(); await has("evStatus", "ε = 0,05");
      await pressR(); ok((await page.locator("#evMode").inputValue()) === "hd", "R sıfırlar (4)"); await has("evS0", "0,6667");
      await page.click("#tab-pd"); await page.click("#pdReset"); await page.click("#tab-ev"); await sel("evMode", "rps"); await page.click("#evReset"); await settle(); await has("evR0Out", "0,50"); ok((await page.locator("#evMode").inputValue()) === "rps", "sekme sıfırlama modeli korur");
      for (const t of ["ne", "zs", "pd", "ev"]) { await page.click("#tab-" + t); await settle(); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${t}: yatay taşma yok`); }
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].filter((c) => c.offsetParent).every((c) => c.width > 0)), "görünür tuvaller çizildi");
      ok(await page.evaluate(() => Object.isFrozen(GameLab) && !Object.getOwnPropertyDescriptor(window, "GameLab").writable), "çekirdek salt okunur");
      ok(await page.locator(".digest").first().isVisible(), "Keşif Defteri görünür");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G oyun-kurami: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
