// Sayısal analiz: çekirdeğin bağımsız denetimi (kapalı biçimler, BigInt tam rasyonel aritmetik, Cardano, kaba
// kuvvet ikiye bölme, polinom kesinliği, seri açılımları) ve isteğe bağlı tarayıcı denetimi (390 px açık, 1280 px koyu).
// Kullanım: node scripts/check-g-sayisal-analiz.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "sayisal-analiz";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.NumLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");

/* ── 0. Ayrıştırıcı: Math ile karşılaştırma, bilimsel gösterim, güvenlik, sembolik türev ── */
{
  const cases = [["x^2 - 2", (x) => x * x - 2], ["2x + 3", (x) => 2 * x + 3], ["1e3x", (x) => 1000 * x], ["2.5e-3*x", (x) => 0.0025 * x], ["1E+2 + x", (x) => 100 + x],
    ["2e", () => 2 * Math.E], ["2ex", (x) => 2 * Math.E * x], ["-x^2", (x) => -(x * x)], ["2^3^2", () => 512], ["sin(x)cos(x)", (x) => Math.sin(x) * Math.cos(x)],
    ["log(x)", (x) => Math.log(x)], ["0,5x", (x) => 0.5 * x], ["π x", (x) => Math.PI * x], ["x(x+1)", (x) => x * (x + 1)], ["exp(cos(x))", (x) => Math.exp(Math.cos(x))],
    ["4/(1 + x²)", (x) => 4 / (1 + x * x)], ["cbrt(x) − sqrt(abs(x))", (x) => Math.cbrt(x) - Math.sqrt(Math.abs(x))], ["arctan(x)/(1+x)", (x) => Math.atan(x) / (1 + x)]];
  for (const [src, fn] of cases) { const P = K.parse(src, 0); ok(P.ok, `ayrıştı: ${src}`); for (const x of [0.3, 1.7, 2.9]) near(P.f(x), fn(x), 1e-14, src); }
  for (const bad of ["alert(1)", "x;1", "constructor", "x[0]", "this", "1e400", "sin x", "(x", "x +", "__proto__", "x.y.z", "`x`"]) { const P = K.parse(bad, 0); ok(!P.ok && typeof P.error === "string", `reddedildi: ${bad}`); }
  ok(!K.evalConst("x + 1").ok && K.evalConst("2^53 + 1").value === 2 ** 53, "sabit ifade");
  // türev: kapalı biçimler
  const D = [["x^3 - 2x + 2", [(x) => 3 * x * x - 2, (x) => 6 * x, () => 6]], ["atan(x)", [(x) => 1 / (1 + x * x), (x) => -2 * x / (1 + x * x) ** 2, (x) => (6 * x * x - 2) / (1 + x * x) ** 3]],
    ["sqrt(x)", [(x) => 0.5 / Math.sqrt(x), (x) => -0.25 * x ** -1.5, (x) => 0.375 * x ** -2.5]], ["x^x", [(x) => x ** x * (Math.log(x) + 1)]], ["exp(sin(x))", [(x) => Math.cos(x) * Math.exp(Math.sin(x))]]];
  for (const [src, ds] of D) { const P = K.parse(src, ds.length); ds.forEach((d, k) => { for (const x of [0.4, 1.3]) near(P.D[k + 1](x), d(x), 1e-12, `${src} türev ${k + 1}`); }); }
  const P5 = K.parse("exp(x)", 5); near(P5.D[5](1), Math.E, 1e-15, "e^x beşinci türev");
}

/* ── 1. Kök bulma ── */
{
  const cardano = Math.cbrt(-1 + Math.sqrt(1 - 8 / 27)) + Math.cbrt(-1 - Math.sqrt(19 / 27)); // x³ − 2x + 2
  let lo = 0.5, hi = 1; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (Math.cos(m) - m > 0) lo = m; else hi = m; } // Dottie, kaba ikiye bölme
  const presets = Object.fromEntries(K.ROOTS.map((p) => [p.id, K.rootCase(p)]));
  near(presets.sqrt2.r, Math.SQRT2, 0, "√2"); near(presets.dottie.r, lo, 2e-16, "Dottie"); near(presets.cycle.r, cardano, 4e-16, "Cardano");
  for (const P of Object.values(presets)) for (const k of ["bisect", "newton", "secant", "fixed"]) ok(P.methods[k].rows.length <= 102, "en çok 100 adım");
  const S = presets.sqrt2.methods;
  ok(S.bisect.reached && S.newton.reached && S.secant.reached && S.fixed.reached, "√2: dördü de yakınsar");
  near(S.newton.st.pLast, 2, 0.03, "Newton p"); near(S.newton.C, 1 / (2 * Math.SQRT2), 0.01, "Newton sabiti");
  near(S.secant.st.pLast, (1 + Math.sqrt(5)) / 2, 0.06, "kiriş p ≈ φ"); near(S.bisect.st.rate, 0.5, 0.05, "ikiye bölme oranı"); near(S.bisect.st.slope, 1, 0.05, "ikiye bölme p ≈ 1");
  near(S.fixed.st.rate, 1 - 0.25 * 2 * Math.SQRT2, 0.03, "sabit nokta oranı |1 − λf′|"); ok(S.newton.rows.length - 1 === 6 && S.bisect.rows.length === 51, "adım sayıları");
  // ikiye bölmede aralık tam yarılanır
  S.bisect.rows.forEach((q, i) => { if (i > 0) near(q.b - q.a, (S.bisect.rows[i - 1].b - S.bisect.rows[i - 1].a) / 2, 0, "yarılanma"); });
  const D = presets.dottie.methods; near(D.fixed.st.rate, Math.sin(lo), 0.002, "cos x yinelemesi oranı sin r"); near(D.newton.st.pLast, 2, 0.01, "Dottie Newton");
  const C = presets.cycle.methods; ok(C.newton.status === "cycle" && C.newton.period === 2 && C.newton.rows.every((q, i) => q.x === i % 2), "Newton 0 → 1 → 0 döngüsü");
  ok(C.bisect.reached && C.secant.reached, "döngü probleminde öteki yöntemler bulur");
  const Db = presets.double.methods; ok(Db.bisect.status === "nosign", "çift kökte işaret değişimi yok");
  near(Db.newton.st.rate, 0.5, 0.03, "çift kökte Newton oranı 1/2"); near(Db.newton.st.slope, 1, 0.03, "çift kökte p = 1"); near(Db.secant.st.rate, 2 / (1 + Math.sqrt(5)), 0.03, "çift kökte kiriş 1/φ");
  ok(Db.fixed.th.kind === "repel" && Db.fixed.status === "maxiter", "çift kökte g′(r) = 1");
  ok(presets.double.band.band > 1e-8 && presets.double.band.band < 1e-6, "çift kökte bant ≈ √ε");
  const A = presets.atan.methods; ok(A.newton.status === "diverged", "arctan: Newton ıraksar"); near(A.fixed.st.pLast, 3, 0.01, "g = x − atan x: p = 3"); near(A.fixed.C, 1 / 3, 0.01, "sabit 1/3");
  // arctan sınırı: 2x = (1 + x²) atan x, bağımsız ikiye bölme
  let a = 1, b = 2; for (let i = 0; i < 200; i++) { const m = (a + b) / 2; if (2 * m - (1 + m * m) * Math.atan(m) > 0) a = m; else b = m; }
  near(a, 1.3917452002707, 1e-12, "sınır x₀");
  const P = K.parse("atan(x)", 3);
  ok(K.newton(P.f, P.D[1], a - 0.01).status === "converged" && K.newton(P.f, P.D[1], a + 0.01).status === "diverged", "sınırın iki yanı");
  { const c = K.rootCase({ id: "atan", src: "atan(x)", a: -1, b: 2, x0: 1.3, x1: 1, lam: 1 }); near(c.methods.newton.st.pLast, 3, 0.01, "f″(0) = 0: Newton kübik"); near(c.methods.newton.C, 2 / 3, 0.01, "|f‴/(3f′)|"); }
  // başka köke giden yöntem o köke göre ölçülür
  { const c = K.rootCase({ id: "custom", src: "x^2 - 2", a: 1, b: 2, x0: -3, x1: -2, lam: 0.25 }); ok(c.methods.newton.other && Math.abs(c.methods.newton.ref + Math.SQRT2) < 1e-15, "−√2'ye giden Newton"); near(c.methods.newton.st.pLast, 2, 0.05, "−√2'de p = 2"); }
  { const c = K.rootCase({ id: "custom", src: "exp(x) - 3", a: 0, b: 2, x0: 0, x1: 2, lam: 0.3 }); near(c.r, Math.log(3), 4e-16, "özel ifade: ln 3"); }
  { const c = K.rootCase({ id: "custom", src: "x^2 + 1", a: 0, b: 2, x0: 0.5, x1: 1, lam: 0.1 }); ok(c.ok && c.r === null, "kök yok"); }
  ok(!K.rootCase({ id: "custom", src: "3 + 4", a: 0, b: 1, x0: 0, x1: 1, lam: 1 }).ok, "x'siz ifade");
}

/* ── 2. Kayan nokta: BigInt ile bağımsız bit ve tam değer hesabı ── */
{
  const dv = new DataView(new ArrayBuffer(8));
  const hex = (x) => { dv.setFloat64(0, x); return dv.getBigUint64(0).toString(16).padStart(16, "0"); };
  for (const x of [0.1, 1, -2.5, 1 / 3, 5e-324, 1.7976931348623157e308, -0, Infinity]) ok(BigInt("0b" + K.bits(x).str).toString(16).padStart(16, "0") === hex(x), `bitler ${x}`);
  ok(hex(0.1) === "3fb999999999999a" && K.bits(0.1).E === 1019 && K.bits(0.1).Mhex === "999999999999a", "0,1 = 0x3FB999999999999A");
  ok(K.bits(5e-324).kind === "subnormal" && K.bits(-0).sign === 1 && K.bits(NaN).kind === "nan", "türler");
  // tam ondalık: m·2^q'yu BigInt ile 10^1100 ölçeğinde bağımsız hesapla
  const exact = (x) => { const s = hex(Math.abs(x)), b = BigInt("0x" + s), E = Number(b >> 52n), M = b & ((1n << 52n) - 1n); const m = E ? M | (1n << 52n) : M, q = (E || 1) - 1075; return { m, q }; };
  for (const x of [0.1, 0.2, 0.3, 1 / 3, 1e-310, 123456.789, 2 ** 70 + 2 ** 20]) {
    const { m, q } = exact(x), sc = 1100n, num = q >= 0 ? (m << BigInt(q)) * 10n ** sc : (m * 10n ** sc) >> BigInt(-q);
    const s = K.exactDecimal(x), [ip, fp = ""] = s.split("."); ok(BigInt(ip + fp.padEnd(1100, "0")) === num, `tam ondalık ${x}`);
  }
  ok(K.exactDecimal(0.1) === "0.1000000000000000055511151231257827021181583404541015625", "0,1'in tam değeri");
  near(K.reprError("0.1").rel, 2 ** -54 / 0.1 * 1.0000000000000000555, 1e-12, "0,1 temsil hatası"); // |fl(0,1) − 0,1| = 2⁻⁵⁴·0,1·…
  near(K.reprError("0.1").abs, 5.551115123125783e-18, 1e-12, "0,1 mutlak hata");
  ok(K.reprError("0.5").exact && K.reprError("1e400").overflow && K.reprError("1e-400").rel === 1, "tam, taşma, alttan taşma");
  for (const s of ["0.1", "0.3", "2.675", "1e23", "123.456", "9007199254740993"]) { const r = K.reprError(s); ok(r.rel <= 2 ** -53 * (1 + 1e-12), `normal sayıda göreli hata ≤ u: ${s}`); }
  ok(K.reprError("1e-310").rel > 2 ** -53, "alt normalde göreli hata u'yu aşar");
  const e64 = K.epsLoop(64), e32 = K.epsLoop(32); ok(e64.eps === Number.EPSILON && e64.steps === 52 && e32.eps === 2 ** -23 && e32.steps === 23, "makine epsilonu");
  const ad = K.addCase("0,1", "0,2"); ok(!ad.equal && ad.ulps === 1 && ad.diff === 2 ** -54 && ad.exact === "0.3", "0,1 + 0,2"); ok(K.addCase("0.5", "0.25").equal, "tam toplam");
  ok(K.decimalSum("-1.25", "0.005") === "-1.245" && K.decimalSum("1e3", "2") === "1002", "ondalık toplam");
  ok(K.nextUp(1) - 1 === Number.EPSILON && K.ulp(1) === Number.EPSILON && K.nextUp(0) === 5e-324 && K.nextDown(1) === 1 - 2 ** -53, "komşular");
  // sadeleşme: seri referansı ile kararlı formül birbirini tutar; saf formül ölçeğe uyar
  for (let p = -3; p <= -0.75; p += 0.25) { const x = 10 ** p, c = K.cosCancel(x); near(c.stable, c.ref, 6e-16, `kosinüs referansı ${p}`); }
  ok(K.cosCancel(1e-8).naive === 0 && K.cosCancel(1e-8).relNaive === 1, "x = 10⁻⁸: %100");
  { let worst = 0; for (let p = -7; p <= -1; p += 0.01) { const c = K.cosCancel(10 ** p); worst = Math.max(worst, c.relNaive / c.scale); } ok(worst < 2.5 && worst > 0.3, `saf hata ≲ ε/x² (en kötü oran ${worst})`); }
  for (const b of [1e3, 1e4, 1e5, 1e6]) { const q = K.quadCancel(b), st = 2 / (-b - Math.sqrt(b * b - 4)); near(q.ref, st, 3e-16, `kök referansı ${b}`); near(q.ref * q.ref + b * q.ref + 1, 0, 1e-12, "kök denklemi sağlar"); }
  ok(K.quadCancel(1e8).relNaive > 0.1, "b = 10⁸: basamaklar gider");
  // toplama: referans = BigInt tam rasyonel toplam (küçük N), sınırlar, float harmonik donması
  for (const [kind, prec] of [["harm", 32], ["harm", 64], ["basel", 32], ["tenth", 64]]) {
    const st = K.sumStudy(kind, prec, [100, 1000]);
    const T = K.SERIES[kind], R = prec === 32 ? Math.fround : (v) => v;
    let num = 0n; const SH = 1200n; for (let k = 1; k <= 1000; k++) { const { m, q } = exact(R(T(k))); num += m << (SH + BigInt(q)); }
    const big = Number(num >> (SH - 60n)) / 2 ** 60; near(st.rows[1].exact, big, 1e-16, `tam toplam ${kind}/${prec}`);
    for (const r of st.rows) { const u = st.u; ok(r.eF <= (r.N - 1) * u && r.eB <= (r.N - 1) * u && r.eK <= 2.01 * u && r.eP <= Math.ceil(Math.log2(r.N)) * u, `sınırlar ${kind}/${prec}/${r.N}`); }
  }
  { const st = K.sumStudy("harm", 32, [2100000, 3000000, 10000000]); ok(st.rows[0].fwd === st.rows[2].fwd && st.rows[0].fwd === 15.403682708740234, "float harmonik toplam 15,403683'te donar"); near(st.rows[2].exact, Math.log(1e7) + 0.5772156649015329 + 0.5e-7, 2e-7, "H(10⁷) ≈ ln N + γ"); ok(st.rows[2].eK < 1.2e-7 && st.rows[2].eF > 0.07, "Kahan ve ileri"); }
}

/* ── 3. Sayısal türev ── */
{
  for (const D of K.DIFFS) {
    const P = K.parse(D.src, 5), s = K.diffStudy(P, D.x), [F, C, R] = s.meth;
    near(F.fitT.slope, 1, 0.03, `${D.id} ileri eğim`); near(C.fitT.slope, 2, 0.03, `${D.id} merkezi eğim`); near(R.fitT.slope, 4, 0.05, `${D.id} Richardson eğim`);
    for (const m of s.meth) { near(m.fitR.slope, -1, 0.06, `${D.id} ${m.id} yuvarlama eğimi`); ok(m.hCross > m.hTheory / 4 && m.hCross < m.hTheory * 1.5, `${D.id} ${m.id} h* ${m.hCross} ~ ${m.hTheory}`); }
    // ölçülen en küçük hatalar: ileri ≈ √ε, merkezi ≈ ε^(2/3) mertebesinde (göreli)
    ok(F.best.r < 3e-8 && F.best.r > 1e-11 && C.best.r < 1e-10 && C.best.r < F.best.r / 30, `${D.id} en iyi hatalar`);
  }
  near(Math.sqrt(2 * Number.EPSILON), 2.107e-8, 1e-3, "√(2ε)"); near(K.diffStudy(K.parse("exp(x)", 5), 1).meth[1].hTheory, Math.cbrt(1.5 * Number.EPSILON), 1e-12, "∛(1,5ε)");
  // h'nin temsil edilebilir olması ve tam türev
  { const q = K.dq(Math.exp, 1, 1e-5); near(q.hp, (1 + 1e-5) - 1, 0, "temsil edilen h"); }
  { const T = K.richTable(Math.exp, 1, 0.4, 6); near(T[3][3], Math.E, 2e-12, "Richardson tablosu"); ok(Math.abs(T[5][0] - Math.E) > 1e-5, "ilk sütun yavaş"); near(Math.abs(T[1][1] - Math.E) / Math.abs(T[2][1] - Math.E), 16, 0.05, "ilk sütun h⁴"); }
}

/* ── 4. Sayısal integral ── */
{
  for (const m of [2, 3, 4, 5]) {
    const G = K.GL[m], C = K.GL_CLOSED[m];
    G.x.forEach((x, i) => { near(x, C.x[i], 3e-16, `düğüm ${m}`); near(G.w[i], C.w[i], 5e-16, `ağırlık ${m}`); ok(G.its[i] <= 8, "Newton adımı az"); });
    near(G.w.reduce((a, b) => a + b, 0), 2, 1e-15, "ağırlık toplamı 2");
    // kesinlik: rastgele katsayılı 2m − 1. derece polinom [−1, 1]'de tam, x^(2m) değil
    for (let t = 0; t < 5; t++) { const c = Array.from({ length: 2 * m }, (_, k) => Math.sin(7 * k + t)); const f = (x) => c.reduce((s, ck, k) => s + ck * x ** k, 0); const exactI = c.reduce((s, ck, k) => s + (k % 2 ? 0 : 2 * ck / (k + 1)), 0); near(K.gauss(f, -1, 1, 1, m), exactI, 2e-15, `kesinlik ${m}`); }
    let fm = 1; for (let i = 2; i <= m; i++) fm *= i; let f2 = 1; for (let i = 2; i <= 2 * m; i++) f2 *= i;
    const E = K.glExactness(m); near(E.even, fm ** 4 / ((2 * m + 1) * f2 * f2), 1e-9, `x^(2m) hata sabiti ${m}`); ok(Math.abs(E.odd) < 1e-16, "x^(2m−1) tam");
  }
  near(K.GL_CLOSED[3].x[2], Math.sqrt(0.6), 0, "√(3/5)"); near(K.GL_CLOSED[5].w[2], 128 / 225, 0, "128/225");
  { let s = 0, t = 1; for (let k = 0; k < 30; k++) { s += t; t /= 4 * (k + 1) * (k + 1); } near(K.INTS.find((q) => q.id === "periodic").I, 2 * Math.PI * s, 1e-15, "2π I₀(1) serisi"); }
  near(K.INTS.find((q) => q.id === "runge").I, 0.4 * Math.atan(5), 0, "Runge integrali");
  for (const I of K.INTS) { const P = K.parse(I.src, 0); near(K.adaptiveSimpson(P.f, I.a, I.b).v, I.I, 2e-9, `uyarlamalı ${I.id}`); }
  { const f = (x) => 3 * x * x + 2 * x; near(K.trap(f, 0, 1, 4), 2 + 1 / 32, 1e-15, "yamuk kapalı biçim: h²/12·Δf′"); near(K.simpson((x) => x ** 3, 0, 2, 1), 4, 1e-15, "Simpson kübikte tam"); }
  const want = { exp: [2, 4, 4, 6], pi: [2, 6, 6], sqrt: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5] };
  for (const [id, ps] of Object.entries(want)) { const I = K.INTS.find((q) => q.id === id), st = K.intStudy(K.parse(I.src, 0).f, I.a, I.b, I.I); ps.forEach((p, i) => near(st.rules[i].order, p, 0.03, `${id} ${st.rules[i].id} mertebe`)); }
  { const I = K.INTS.find((q) => q.id === "periodic"), st = K.intStudy(K.parse(I.src, 0).f, I.a, I.b, I.I); ok(st.rules[0].pts[4].e < 1e-13 && st.rules[0].pts[2].e > 1e-3, "periyodikte yamuk üstel"); }
  // Runge: barisentrik interpolasyon polinomu kendisine tam döner; Chebyshev hızı ρ
  for (const kind of ["equi", "cheb"]) { const nd = K.interpNodes(6, kind); nd.ys = nd.xs.map((x) => x ** 6 - x ** 3 + 0.5); for (const x of [-0.93, 0.11, 0.77]) near(K.bary(nd, x), x ** 6 - x ** 3 + 0.5, 1e-13, "polinom tam"); }
  { const pts = []; for (let n = 10; n <= 40; n += 2) pts.push([n, Math.log10(K.rungeCase(n).cheb.maxErr)]); const f = K.linfit(pts); near(10 ** -f.slope, (1 + Math.sqrt(26)) / 5, 0.01, "Chebyshev ρ"); }
  { const a = K.rungeCase(10), b = K.rungeCase(20); ok(b.equi.maxErr > 20 * a.equi.maxErr && Math.abs(b.equi.at) > 0.9, "eşit aralıkta ıraksama uçlarda"); ok(b.cheb.maxErr < a.cheb.maxErr / 5, "Chebyshev azalır"); }
  near(K.rungeCase(12).equi.maxErr, 3.6630, 1e-3, "n = 12 eşit aralık");
}
console.log(`G sayısal analiz: ${checks.toLocaleString("tr-TR")} bağımsız ayrıştırıcı, kök, kayan nokta, türev ve integral kontrolü PASS`);

if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
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
      page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      await page.locator(".digest").first().waitFor({ state: "visible", timeout: 15000 }); ok(await page.evaluate(() => !!(window.ACELYA_DIGEST && window.ACELYA_DIGEST["sayisal-analiz"])), "defter yüklendi ve görünür");
      const has = async (id, t) => { const v = await read(id); assert(v.includes(t), `${id}: "${v}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const fill = async (id, v) => { await page.fill("#" + id, v); await page.press("#" + id, "Enter"); };
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label") && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuval etiketleri");
      ok(await page.evaluate(() => [...document.querySelectorAll("#f2Bits button")].length === 64 && [...document.querySelectorAll("#f2Bits button")].every((b) => b.getAttribute("aria-label"))), "64 bit düğmesi etiketli");
      // 1 · Kök bulma
      await has("r1Root", "1,4142135623730951"); await has("r1Band", "3,22 × 10⁻¹³"); await has("r1Deriv", "2,828");
      await has("r1Cmp", "Newton6yakınsadı2,2 × 10⁻¹⁶1,9842C 0,353 · 0,354"); await has("r1Cmp", "1,6671,618 (φ)"); await has("r1Cmp", "0,9751");
      await has("r1Status", "Ölçülen p = 1,984, kuram 2,000"); ok((await page.locator("#r1Rows tr").count()) === 7, "Newton tablosu 7 satır");
      await sel("r1Method", "bisect"); ok((await page.locator("#r1Rows tr").count()) === 51, "ikiye bölme 51 satır"); await has("r1Status", "0,5160");
      await sel("r1Preset", "cycle"); await sel("r1Method", "newton"); await has("r1Cmp", "döngü (dönem 2)"); await has("r1Status", "0 → 1 → 0 → 1"); await has("r1Root", "−1,7692923542386314");
      await sel("r1Preset", "double"); await has("r1Cmp", "f(a), f(b) aynı işaretli"); await has("r1Cmp", "0,507 · 0,500"); await has("r1Cmp", "0,627 · 0,618"); await has("r1Status", "kuramın ikinci mertebesi geçersiz"); await has("r1Band", "1,19 × 10⁻⁷");
      await sel("r1Method", "fixed"); await has("r1Status", "|g′(r)| = |1 − λf′(r)| = 1,0000");
      await sel("r1Preset", "atan"); await sel("r1Method", "newton"); await has("r1Cmp", "ıraksadı"); await has("r1Status", "1,3917"); await has("r1Status", "3,89 × 10⁶");
      await fill("r1X0", "1,3"); await has("r1Status", "Ölçülen p = 3,000"); await has("r1Status", "0,667");
      await sel("r1Preset", "dottie"); await sel("r1Method", "fixed"); await has("r1Root", "0,7390851332151607"); await has("r1Status", "0,6737"); await range("r1Lam", 0.6); await has("r1LamOut", "0,60");
      await sel("r1Preset", "custom"); await fill("r1Expr", "1e3x - 2"); await has("r1Root", "0,002"); await fill("r1Expr", "alert(1)"); await has("r1ExprErr", "Tanınmayan ad"); await has("r1Root", "0,002");
      await fill("r1Expr", "x^2 - 2"); await fill("r1X0", "-3"); await fill("r1X1", "-2"); await has("r1Root", "−1,414213562373095"); await has("r1RootNote", "yöntemlerle"); await fill("r1A", "1"); await fill("r1B", "2"); await has("r1Root", "1,41421356237309"); await has("r1Cmp", "başka köke yakınsadı");
      await fill("r1A", "abc"); await has("r1ExprErr", "Sayı okunamadı");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("r1Root", "1,4142135623730951"); ok((await page.locator("#r1Method").inputValue()) === "newton", "R sıfırlar");
      await page.click("#r1Reset"); await has("r1Status", "1,984");
      // sekme klavyesi
      await page.locator("#tab-root").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-int").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-float").getAttribute("aria-selected")) === "true", "ArrowRight");
      ok(await page.locator("#panel-root").isHidden(), "tek panel görünür");
      // 2 · Kayan nokta
      await has("f2Exact", "0,1000000000000000055511151231257827021181583404541015625"); await has("f2Parts", "E = 1019 (e = −4)"); await has("f2Mant", "0x999999999999a");
      await has("f2Rep", "5,551 × 10⁻¹⁷"); await has("f2RepNote", "u'nun 0,500 katı"); await has("f2Ulp", "1,388 × 10⁻¹⁷"); await has("f2UlpRel", "2⁻⁵⁶");
      await has("f2Eps", "2,220446049250313 × 10⁻¹⁶"); await has("f2EpsSteps", "52"); await has("f2EpsD", "birebir"); await has("f2Sum", "0,30000000000000004"); await has("f2SumDiff", "+1 ulp"); await has("f2SumDiffAbs", "5,551 × 10⁻¹⁷");
      await sel("f2Prec", "32"); await has("f2Eps", "1,1920928955078125 × 10⁻⁷"); await has("f2EpsSteps", "23");
      await fill("f2A", "0,5"); await fill("f2B", "0,25"); await has("f2SumDiff", "0: aynı double");
      await page.click("#f2Third"); await has("f2Shortest", "0,3333333333333333"); await has("f2RepNote", "ifade double aritmetiğiyle");
      await page.click("#f2Big"); await has("f2Shortest", "9007199254740992");
      await page.click("#f2Tiny"); await has("f2Kind", "alt normal"); await has("f2Shortest", "5 × 10⁻³²⁴");
      await page.click("#f2NegZero"); await has("f2Kind", "eksi sıfır");
      await page.click("#f2P1"); await page.locator('#f2Bits button[data-bit="0"]').click(); await has("f2Shortest", "−1"); await page.locator('#f2Bits button[data-bit="1"]').click(); await has("f2Kind", "sonsuz"); await has("f2Shortest", "−∞"); await page.locator('#f2Bits button[data-bit="63"]').click(); await has("f2Kind", "NaN");
      await fill("f2Num", "1e400"); await has("f2Rep", "taşma"); await fill("f2Num", "x+1"); await has("f2NumErr", "x kullanılamaz");
      await has("f2CanErrN", "5,24 × 10⁻⁹"); await has("f2CanScale", "2,22 × 10⁻⁸"); await range("f2CanP", -8); await has("f2CanStatus", "%100"); await has("f2CanNaive", "0");
      await sel("f2Can", "quad"); await has("f2CanPOut", "1,00 × 10⁴"); await range("f2CanP", 8); await has("f2CanErrN", "0,255"); await has("f2CanScale", "0,555");
      await has("f2SumRows", "14,357357978820"); await has("f2SumRows", "2,46 × 10⁻³"); await has("f2SumStatus", "470 kat");
      await range("f2N", 7); await has("f2SumStatus", "15,403682708740234 değerinde donmuş: k = 2 097 152. terimden beri");
      await range("f2N", 6.5); await has("f2SumStatus", "k = 2 097 152. terimden beri"); await range("f2N", 6.25); ok(!(await read("f2SumStatus")).includes("donmuş"), "N = 1 778 279'da henüz donmamış");
      await sel("f2Series", "basel"); await range("f2N", 4); await has("f2SumStatus", "k = 4097. terimden beri"); await sel("f2Series", "harm"); await range("f2N", 7); await has("f2NOut", "10 000 000");
      await sel("f2SumPrec", "64"); await sel("f2Series", "tenth"); await range("f2N", 2); await has("f2SumRows", "9,99999999999998");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("f2Exact", "0,1000000000000000055"); await has("f2SumRows", "2,46 × 10⁻³"); ok((await page.locator("#f2Can").inputValue()) === "cos", "R sekmeyi sıfırlar");
      // 3 · Sayısal türev
      await page.click("#tab-diff");
      await has("d3Exact", "2,718281828459045"); await has("d3Fit", "1,001 · 1"); await has("d3Fit", "2,000 · 2"); await has("d3Fit", "4,000 · 4"); await has("d3Fit", "8,8 × 10⁻⁹ · 2,1 × 10⁻⁸"); await has("d3Fit", "5,5 × 10⁻⁶ · 6,9 × 10⁻⁶");
      await has("d3AtRows", "2,7182954199389098"); await has("d3Status", "kesme ve yuvarlama hataları denk"); await has("d3RichCap", "4,9 × 10⁻¹⁶");
      await range("d3H", -8); await has("d3HOut", "1,00 × 10⁻⁸"); await has("d3Status", "ileri farkta yuvarlama hatası baskın"); await range("d3H", -16); await has("d3HNote", "ulp");
      await range("d3H", 0); await has("d3HOut", "h = 1"); await sel("d3H0", "0.1"); await has("d3RichCap", "h₀ = 0,100");
      await sel("d3Preset", "sqrt"); await has("d3Fit", "1,7 × 10⁻¹⁰ · 4,2 × 10⁻¹⁰"); await has("d3Exact", "5");
      await sel("d3Preset", "sin"); await has("d3Exact", "0,5403023058681398");
      await sel("d3Preset", "custom"); await fill("d3Expr", "ln(x)"); await fill("d3X", "-1"); await has("d3ExprErr", "tanımlı değil"); await fill("d3X", "2"); await has("d3Exact", "0,5");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("d3Exact", "2,718281828459045"); await has("d3HOut", "1,00 × 10⁻⁵");
      // 4 · Sayısal integral
      await page.click("#tab-int");
      await has("i4Rows", "Yamuk91,72051859216430182,2 × 10⁻³2,002,002"); await has("i4Rows", "Simpson171,71828197405189181,5 × 10⁻⁷4,004,004"); await has("i4I", "1,718281828459045");
      await has("i4Exact", "5,55556 × 10⁻³5,55556 × 10⁻³"); ok((await page.locator("#i4Nodes tr").count()) === 14, "14 düğüm satırı");
      await has("i4Equi", "3,66"); await has("i4Cheb", "0,0692"); await has("i4Rho", "1,2174 · 1,2198");
      await range("i4Deg", 20); await has("i4Equi", "59,8"); await has("i4EquiAt", "−0,975"); await range("i4Deg", 2); await has("i4DegOut", "2"); await range("i4Deg", 40); await has("i4DegOut", "40");
      await sel("i4Preset", "pi"); await range("i4N", 4); await has("i4Status", "beklenen 4 değil 6"); await has("i4Rows", "Simpson333,1415926535528363,7 × 10⁻¹¹6,006,006");
      await sel("i4Preset", "periodic"); await has("i4Rows", "üstel"); await has("i4Status", "üstel yakınsar"); await has("i4I", "7,954926521012844");
      await sel("i4Preset", "sqrt"); await has("i4Status", "h^1,5"); await range("i4N", 0); await has("i4NOut", "1"); await range("i4N", 10); await has("i4NOut", "1024");
      await sel("i4Preset", "custom"); await fill("i4Expr", "x^3"); await fill("i4A", "0"); await fill("i4B", "2"); await has("i4I", "4"); await has("i4INote", "uyarlamalı");
      await fill("i4B", "-1"); await has("i4ExprErr", "büyük olmalı"); await fill("i4Expr", "1/x"); await fill("i4A", "-1"); await fill("i4B", "1"); await has("i4ExprErr", "tanımsız");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("i4Rows", "Yamuk91,7205185921643018"); await has("i4DegOut", "12");
      ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      ok(await page.evaluate(() => Object.isFrozen(NumLab) && !Object.getOwnPropertyDescriptor(window, "NumLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G sayısal analiz: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
