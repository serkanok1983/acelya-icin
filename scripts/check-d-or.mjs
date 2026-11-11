// Yöneylem araştırması laboratuvarı: çekirdek hesapların bağımsız yöntemlerle denetimi.
//   node scripts/check-d-or.mjs            → yalnız çekirdek (tarayıcısız)
//   node scripts/check-d-or.mjs --browser  → ayrıca 390 px açık ve 1280 px koyu temada arayüz
// Sayfanın çekirdeği HTML içindeki KERNEL-BEGIN/END arasından okunur; buradaki referanslar
// (kayan noktalı köşe sayımı, yol sayımıyla en uzun yol, Simpson integrali) o kodu yinelemez.
import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../yoneylem-arastirmasi.html", import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "Çekirdek sınırları (KERNEL-BEGIN/END) bulunamadı");
// Çekirdek sayfanın kendi kodudur; vm bağlamı yerine işlev olarak yüklenir (Monte Carlo on kat hızlı çalışır).
const K = new Function(source + ";return {Q,qParse,qAdd,qSub,qMul,qDiv,qCmp,qNum,qStr,lpMake,lpGraph,lpDual,lpPerturb,simplexStart,simplexChoose,simplexPivot,simplexPath,OR_ACTIVITIES,cpm,pert,projectPlan,normalCdf,monteCarlo,shareBelow};")();
let checks = 0;
const ok = (cond, msg) => { assert(cond, msg); checks++; };
const eq = (a, b, msg) => { if (msg === undefined) assert.equal(a, b); else assert.equal(a, b, `${msg}: ${a} ≠ ${b}`); checks++; };
const near = (a, b, tol = 1e-9, msg = "") => { assert(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${msg} ${a} ≠ ${b}`); checks++; };
const qeq = (q, text, msg = "") => { assert.equal(K.qStr(q), text, msg); checks++; };

/* ── 1. Kesirler ── */
qeq(K.qParse("0.5"), "1/2"); qeq(K.qParse("-1.25"), "-5/4"); qeq(K.qParse(18), "18"); qeq(K.qParse("7/21"), "1/3");
qeq(K.qAdd(K.Q(1, 3), K.Q(1, 6)), "1/2"); qeq(K.qDiv(K.Q(3, 4), K.Q(-9, 8)), "-2/3"); qeq(K.qMul(K.Q(2, 3), K.Q(3, 2)), "1");
eq(K.qCmp(K.Q(1, 3), K.Q(33333, 100000)), 1);
assert.throws(() => K.Q(1, 0)); assert.throws(() => K.qParse("abc")); checks += 2;
// 0.1 + 0.2 = 0.3 tam olarak (kayan noktada değil)
qeq(K.qAdd(K.qParse("0.1"), K.qParse("0.2")), "3/10");

/* ── 2. Doğrusal program: bağımsız kayan noktalı referans ── */
// Referans: bölgeyi büyük bir kutuyla kes, bütün sınır çiftlerinin kesişimlerini say.
function refLP(c, A, r, M = 1e7) {
  const L = [...A.map((row, i) => [row[0], row[1], r[i]]), [-1, 0, 0], [0, -1, 0], [1, 0, M], [0, 1, M]];
  let best = -Infinity, at = null, any = false;
  for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) {
    const det = L[i][0] * L[j][1] - L[j][0] * L[i][1];
    if (Math.abs(det) < 1e-12) continue;
    const x = (L[i][2] * L[j][1] - L[j][2] * L[i][1]) / det, y = (L[i][0] * L[j][2] - L[j][0] * L[i][2]) / det;
    if (!L.every((l) => l[0] * x + l[1] * y <= l[2] + 1e-6 * Math.max(1, Math.abs(l[2])))) continue;
    any = true;
    const z = c[0] * x + c[1] * y;
    if (z > best) { best = z; at = [x, y]; }
  }
  if (!any) return { status: "infeasible" };
  return best > 1e5 ? { status: "unbounded" } : { status: "optimal", z: best, at };
}
const cfgOf = (c1, c2, r1, b1, r2, a2, r3, a3) => ({ c: [c1, c2], A: [[1, b1], [a2, 2], [a3, 2]], r: [r1, r2, r3] });
function checkLP(cfg, label) {
  const P = K.lpMake(cfg), G = K.lpGraph(P), D = K.lpDual(P);
  const ref = refLP(cfg.c, cfg.A, cfg.r);
  eq(G.status, ref.status, `${label}: durum`);
  const runs = ["bland", "dantzig"].map((rule) => K.simplexPath(P, rule));
  for (const S of runs) {
    eq(S.status, G.status, `${label}: simpleks durumu (${S.rule})`);
    ok(S.pivots <= 10, `${label}: pivot sayısı`);
    // Z her pivotta azalmaz; her ara tablo uygun bir köşedir.
    for (let k = 0; k < S.steps.length; k++) {
      const v = S.steps[k].values;
      assert([v.x, v.y, ...v.s].every((q) => q.n >= 0n), `${label}: uygun olmayan temel çözüm`);
      assert(G.vertices.some((w) => K.qCmp(w.x, v.x) === 0 && K.qCmp(w.y, v.y) === 0), `${label}: simpleks adımı bir köşe değil`);
      if (k) assert(K.qCmp(v.z, S.steps[k - 1].values.z) >= 0, `${label}: Z azaldı`);
    }
    checks++;
  }
  if (G.status === "unbounded") { eq(D.status, "infeasible", `${label}: ikil olursuz olmalı`); return { G, D, runs }; }
  near(K.qNum(G.z), ref.z, 1e-7, `${label}: Z`);
  eq(D.status, "optimal"); eq(K.qCmp(D.z, G.z), 0, `${label}: güçlü ikillik`);
  for (const S of runs) {
    eq(K.qCmp(S.z, G.z), 0, `${label}: simpleks Z (${S.rule})`);
    ok(G.optimal.some((i) => K.qCmp(G.vertices[i].x, S.x) === 0 && K.qCmp(G.vertices[i].y, S.y) === 0), `${label}: simpleks optimum köşede bitmeli`);
    // İkil değerler: negatif değil, ikil uygun, tamamlayıcı gevşeklik, kuram aralığının içinde.
    const y = S.duals, last = S.steps[S.steps.length - 1].values;
    for (let k = 0; k < 3; k++) {
      ok(y[k].n >= 0n);
      ok(K.qCmp(y[k], D.lo[k]) >= 0 && (D.hi[k] === null || K.qCmp(y[k], D.hi[k]) <= 0), `${label}: ikil değer aralık dışında (${S.rule}, K${k + 1})`);
      ok(K.qMul(y[k], last.s[k]).n === 0n, `${label}: tamamlayıcı gevşeklik`);
    }
    for (let j = 0; j < 2; j++) {
      const lhs = [0, 1, 2].reduce((t, k) => K.qAdd(t, K.qMul(P.A[k][j], y[k])), K.Q(0));
      ok(K.qCmp(lhs, P.c[j]) >= 0, `${label}: ikil uygunluk`);
      eq(K.qCmp(K.qSub(lhs, P.c[j]), S.reduced[j]), 0, `${label}: indirgenmiş maliyet`);
    }
  }
  // Sonlu fark: içbükeylik gereği ileri fark ≤ sağ türev (lo), geri fark ≥ sol türev (hi).
  let exact = 0;
  for (let k = 0; k < 3; k++) {
    const m = K.lpPerturb(P, k, "0.01");
    if (m.forward.status === "optimal") { ok(K.qCmp(m.forward.value, D.lo[k]) <= 0, `${label}: ileri fark`); if (K.qCmp(m.forward.value, D.lo[k]) === 0) exact++; }
    if (D.hi[k] === null) eq(m.backward.status, "infeasible", `${label}: geri yönde olursuzluk`);
    else { eq(m.backward.status, "optimal"); ok(K.qCmp(m.backward.value, D.hi[k]) >= 0, `${label}: geri fark`); if (K.qCmp(m.backward.value, D.hi[k]) === 0) exact++; }
  }
  return { G, D, runs, exact };
}
// Varsayılan sorun (Hillier–Lieberman, cam atölyesi)
{
  const { G, D, runs } = checkLP(cfgOf(3, 5, 4, 0, 12, 0, 18, 3), "varsayılan");
  qeq(G.z, "36"); qeq(G.rep.x, "2"); qeq(G.rep.y, "6"); eq(G.vertices.length, 5); eq(G.multiple, "none"); eq(G.degenerate, false);
  eq(G.vertices.map((v) => `${K.qStr(v.x)},${K.qStr(v.y)}:${K.qStr(v.z)}`).join(" "), "0,0:0 4,0:12 4,3:27 2,6:36 0,6:30");
  eq(G.slack.map(K.qStr).join(","), "2,0,0");
  eq(D.lo.map(K.qStr).join(","), "0,3/2,1"); eq(D.hi.map(K.qStr).join(","), "0,3/2,1");
  const [bland, dantzig] = runs;
  eq(bland.pivots, 3); eq(bland.steps.map((s) => `${K.qStr(s.values.x)},${K.qStr(s.values.y)}`).join(" "), "0,0 4,0 4,3 2,6");
  eq(dantzig.pivots, 2); eq(dantzig.steps.map((s) => `${K.qStr(s.values.x)},${K.qStr(s.values.y)}`).join(" "), "0,0 0,6 2,6");
  eq(bland.duals.map(K.qStr).join(","), "0,3/2,1"); eq(dantzig.duals.map(K.qStr).join(","), "0,3/2,1");
  // İlk Bland pivotu: x girer, oranlar 4 ve 6, s1 çıkar.
  const c0 = bland.steps[0].choice; eq(c0.enter, 0); eq(c0.leave, 2); eq(c0.ratios.map((q) => (q ? K.qStr(q) : "-")).join(","), "4,-,6");
  // Son tablo (ders kitabındaki): satırlar s1, y, x.
  const last = bland.steps[3];
  eq(last.z.map(K.qStr).join(","), "0,0,0,3/2,1,36");
  const P = K.lpMake(cfgOf(3, 5, 4, 0, 12, 0, 18, 3));
  for (let k = 0; k < 3; k++) { const m = K.lpPerturb(P, k, "0.01"); eq(K.qStr(m.forward.value), ["0", "3/2", "1"][k]); eq(K.qStr(m.backward.value), ["0", "3/2", "1"][k]); }
}
// Hazır düzenler
{
  const multi = checkLP(cfgOf(3, 2, 4, 0, 12, 0, 18, 3), "çoklu");
  eq(multi.G.multiple, "edge"); qeq(multi.G.z, "18"); eq(multi.G.optimal.length, 2); eq(multi.G.degenerate, false);
  eq(multi.D.lo.map(K.qStr).join(","), "0,0,1");
  ok(K.qStr(multi.runs[0].x) + "," + K.qStr(multi.runs[0].y) === "4,3" && multi.runs[0].steps.at(-1).choice.alt.length === 1, "Bland (4,3)'te biter ve seçenek optimumu bildirir");
  eq(K.qStr(multi.runs[1].x) + "," + K.qStr(multi.runs[1].y), "4,3");
  const deg = checkLP(cfgOf(3, 5, 2, 0, 12, 0, 18, 3), "dejenere");
  eq(deg.G.degenerate, true); qeq(deg.G.z, "36"); eq(deg.G.rep.active.join(","), "0,1,2");
  eq(deg.D.lo.map(K.qStr).join(","), "0,3/2,0"); eq(deg.D.hi.map(K.qStr).join(","), "3,5/2,1");
  const unb = checkLP(cfgOf(3, 5, 4, -1, 12, -2, 18, -2), "sınırsız");
  eq(unb.G.status, "unbounded"); eq(unb.G.ray.d.map(K.qStr).join(","), "1,1"); qeq(unb.G.ray.gain, "8");
  eq(unb.runs[0].steps.at(-1).choice.status, "unbounded");
  const flat = checkLP(cfgOf(0, 0, 4, 0, 12, 0, 18, 3), "amaç sıfır"); eq(flat.G.multiple, "all"); eq(flat.runs[0].pivots, 0);
  const point = checkLP(cfgOf(3, 5, 0, 0, 0, 0, 0, 3), "tek nokta"); eq(point.G.vertices.length, 1); qeq(point.G.z, "0");
  // Negatif sağ taraf: grafik yöntem olursuzu görür, simpleks başlamaz.
  const bad = K.lpMake({ c: [3, 5], A: [[1, 0], [0, 2], [3, 2]], r: [-1, 12, 18] });
  eq(K.lpGraph(bad).status, "infeasible"); assert.throws(() => K.simplexStart(bad)); checks++;
}
// Kaydırıcı ızgarasından tohumlu örneklem + bütün köşe değerleri
{
  let seed = 20261111; const rnd = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
  const pick = (min, max, step) => min + step * Math.floor(rnd() * (Math.round((max - min) / step) + 1));
  const tally = { optimal: 0, unbounded: 0, degenerate: 0, multiple: 0, exact: 0, fd: 0, pivB: 0, pivD: 0 };
  const N = 6000;
  for (let t = 0; t < N; t++) {
    const cfg = cfgOf(pick(0, 10, 0.5), pick(0, 10, 0.5), pick(0, 10, 0.5), pick(-2, 2, 0.5), pick(0, 24, 1), pick(-2, 2, 0.5), pick(0, 36, 1), pick(-2, 6, 0.5));
    const res = checkLP(cfg, JSON.stringify(cfg));
    tally[res.G.status]++;
    if (res.G.status === "optimal") { if (res.G.degenerate) tally.degenerate++; if (res.G.multiple !== "none") tally.multiple++; tally.exact += res.exact; tally.fd += 6; tally.pivB += res.runs[0].pivots; tally.pivD += res.runs[1].pivots; }
  }
  for (const c1 of [0, 3, 10]) for (const c2 of [0, 5, 10]) for (const r1 of [0, 4, 10]) for (const b1 of [-2, 0, 2]) for (const r2 of [0, 12, 24]) for (const a2 of [-2, 0, 2]) for (const r3 of [0, 18, 36]) for (const a3 of [-2, 0, 3, 6]) checkLP(cfgOf(c1, c2, r1, b1, r2, a2, r3, a3), "köşe ızgarası");
  ok(tally.optimal > 1000 && tally.unbounded > 20 && tally.degenerate > 50 && tally.multiple > 50, "örneklem bütün durumları kapsamalı");
  console.log(`  LP örneklemi (${N}): optimum ${tally.optimal}, sınırsız ${tally.unbounded}, dejenere ${tally.degenerate}, çoklu ${tally.multiple}; sonlu fark türevle tam eşit ${tally.exact}/${tally.fd}; ortalama pivot Bland ${(tally.pivB / tally.optimal).toFixed(2)}, Dantzig ${(tally.pivD / tally.optimal).toFixed(2)}`);
}

/* ── 3. Kritik yol: yol sayımıyla en uzun yol ── */
const ACTS = K.OR_ACTIVITIES, IDX = new Map(ACTS.map((a, i) => [a.id, i]));
const SUCC = ACTS.map((a) => ACTS.filter((b) => b.pred.includes(a.id)).map((b) => IDX.get(b.id)));
function allPaths() {
  const out = [], walk = (i, path) => { path = [...path, i]; if (!SUCC[i].length) out.push(path); SUCC[i].forEach((s) => walk(s, path)); };
  ACTS.forEach((a, i) => { if (!a.pred.length) walk(i, []); });
  return out;
}
const PATHS = allPaths();
eq(PATHS.map((p) => p.map((i) => ACTS[i].id).join("")).sort().join(" "), "ABEHI ACFGI ACFHI ADGI");
function checkCpm(dur, eps) {
  const c = K.cpm(dur, eps), len = (p) => p.reduce((s, i) => s + dur[i], 0), longest = Math.max(...PATHS.map(len));
  near(c.T, longest, 1e-12, "proje süresi");
  for (let i = 0; i < ACTS.length; i++) {
    // Toplam bolluk = T − (i'den geçen en uzun yol): geçişlerden bağımsız tanım.
    near(c.TF[i], longest - Math.max(...PATHS.filter((p) => p.includes(i)).map(len)), 1e-9, "toplam bolluk");
    ok(c.FF[i] >= -1e-12 && c.FF[i] <= c.TF[i] + 1e-12, "serbest bolluk aralığı");
    near(c.EF[i] - c.ES[i], dur[i], 1e-12); near(c.LF[i] - c.LS[i], dur[i], 1e-12);
  }
  const want = PATHS.filter((p) => Math.abs(len(p) - longest) <= eps).map((p) => p.join(",")).sort().join(" ");
  eq(c.paths.map((p) => p.join(",")).sort().join(" "), want, "kritik yollar");
  return c;
}
{
  const c = checkCpm([3, 6, 4, 4, 2, 3, 3, 4, 2], 0);
  eq(c.T, 17); eq(c.paths.map((p) => p.map((i) => ACTS[i].id).join("")).join(" "), "ABEHI");
  eq(c.ES.join(","), "0,3,3,3,9,7,10,11,15"); eq(c.EF.join(","), "3,9,7,7,11,10,13,15,17");
  eq(c.LS.join(","), "0,3,4,8,9,8,12,11,15"); eq(c.LF.join(","), "3,9,8,12,11,11,15,15,17");
  eq(c.TF.join(","), "0,0,1,5,0,1,2,0,0"); eq(c.FF.join(","), "0,0,0,3,0,0,2,0,0");
  let seed = 7; const rnd = () => ((seed = (Math.imul(seed, 1103515245) + 12345) >>> 0) / 4294967296);
  for (let t = 0; t < 3000; t++) checkCpm(ACTS.map(() => Math.floor(rnd() * 12)), 0); // tam sayılar: sık sık eşit yollar
  for (let t = 0; t < 1000; t++) checkCpm(ACTS.map(() => rnd() * 20), 1e-9);
  assert.throws(() => K.cpm([1, 2, 3], 0)); assert.throws(() => K.pert(3, 2, 5)); checks += 2;
}
// PERT: beta-PERT ortalaması ve varyansı, yoğunluğun doğrudan integraliyle
const simpson = (fn, a, b, n = 4000) => { const h = (b - a) / n; let s = fn(a) + fn(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * fn(a + i * h); return (h * s) / 3; };
for (const [a, m, b] of [[2, 3, 4], [3, 5, 13], [2, 3, 10], [1, 2, 3], [2, 4, 14], [0.5, 6, 20]]) {
  const al = 1 + (4 * (m - a)) / (b - a), be = 1 + (4 * (b - m)) / (b - a), w = (x) => ((x - a) / (b - a)) ** (al - 1) * ((b - x) / (b - a)) ** (be - 1);
  const m0 = simpson(w, a, b, 40000), mean = simpson((x) => x * w(x), a, b, 40000) / m0, variance = simpson((x) => (x - mean) ** 2 * w(x), a, b, 40000) / m0, p = K.pert(a, m, b);
  near(p.te, mean, 2e-5, "beta ortalaması"); near(p.varBeta, variance, 2e-4, "beta varyansı"); near(p.te, (a + 4 * m + b) / 6); near(p.varPert, ((b - a) / 6) ** 2);
}
{
  const abm = ACTS.map((a) => [...a.abm]), plan = K.projectPlan(abm);
  eq(plan.exact, true); eq(plan.T, 17); eq(plan.ref.map((i) => ACTS[i].id).join(""), "ABEHI");
  near(plan.sigmaPert ** 2, 32 / 9); near(plan.sigmaBeta ** 2, 4); eq(plan.TF.join(","), "0,0,1,5,0,1,2,0,0");
  // Kesirli beklenen süreler: 1/12 gün biriminde tam hesap
  const sw = abm.map((v) => [...v]); sw[2] = [2, 4, 14]; const p2 = K.projectPlan(sw);
  near(p2.T, 52 / 3); eq(p2.paths.map((p) => p.map((i) => ACTS[i].id).join("")).join(" "), "ACFHI"); near(p2.TF[1], 1 / 3);
  const tie = abm.map((v) => [...v]); tie[6] = [3, 5, 7]; const p3 = K.projectPlan(tie);
  eq(p3.paths.length, 2); eq(p3.ref.map((i) => ACTS[i].id).join(""), "ABEHI");
}

/* ── 4. Normal dağılım ve Monte Carlo ── */
for (const z of [-4, -2.5, -1, -0.53, 0, 0.3, 0.5303, 1, 1.96, 3, 5]) near(K.normalCdf(z), 0.5 + simpson((t) => Math.exp(-t * t / 2) / Math.sqrt(2 * Math.PI), 0, z, 2000), 2e-7, "Φ(" + z + ")");
near(K.normalCdf(1.959964), 0.975, 2e-7);
{
  const abm = ACTS.map((a) => [...a.abm]), plan = K.projectPlan(abm);
  const a1 = K.monteCarlo(abm, 1, 20000, plan.ref), a2 = K.monteCarlo(abm, 1, 20000, plan.ref), b1 = K.monteCarlo(abm, 2, 20000, plan.ref);
  eq(a1.mean, a2.mean); eq(K.shareBelow(a1.T, 18), K.shareBelow(a2.T, 18)); ok(a1.mean !== b1.mean, "tohum sonucu değiştirmeli");
  for (let i = 1; i < a1.n; i++) assert(a1.T[i] >= a1.T[i - 1]);
  checks++;
  let seSum = 0;
  for (const seed of [1, 2, 3, 7, 11, 23, 42]) {
    const mc = K.monteCarlo(abm, seed, 40000, plan.ref), se = mc.pathSd / Math.sqrt(mc.n);
    ok(Math.abs(mc.pathMean - plan.T) < 4.5 * se, `yol ortalaması Σtₑ (tohum ${seed})`);
    near(mc.pathSd, plan.sigmaBeta, 0.02, `yol σ = beta σ (tohum ${seed})`);
    ok(mc.mean > plan.T + 0.1, "birleşme yanlılığı: ortalama süre T_E'den büyük");
    ok(mc.T[0] >= 9 - 1e-9 && mc.T[mc.n - 1] <= 29 + 1e-9, "süreler [en büyük Σa, en büyük Σb] = [9, 29] aralığında");
    for (const D of [15, 17, 18, 20]) ok(K.shareBelow(mc.T, D) <= K.shareBelow(mc.path, D) + 1e-12, "bütün ağ, tek yoldan daha olası olamaz");
    ok(mc.crit[0] === 1 && mc.crit[8] === 1, "A ve I her yolda");
    near(mc.crit[1] + mc.crit[2] + mc.crit[3], 1, 1e-9, "A'dan sonra tek bir dal kritik (eşitlik ölçüsü sıfır)");
    seSum += mc.switched;
  }
  ok(seSum / 7 > 0.2 && seSum / 7 < 0.6, "yol değişimi oranı beklenen aralıkta");
  // Kesin süreler: rastgelelik yok
  const det = abm.map((v) => [v[1], v[1], v[1]]), pd = K.projectPlan(det), md = K.monteCarlo(det, 5, 500, pd.ref);
  eq(pd.sigmaPert, 0); eq(md.sd, 0); eq(md.T[0], pd.T); eq(K.shareBelow(md.T, pd.T), 1); eq(K.shareBelow(md.T, pd.T - 0.5), 0);
}
console.log(`D yöneylem: ${checks.toLocaleString("tr-TR")} çekirdek kontrolü (köşe sayımı ↔ simpleks ↔ ikil, yol sayımı ↔ CPM, integral ↔ PERT/normal, Monte Carlo) PASS`);

/* ── 5. Arayüz (isteğe bağlı) ── */
if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => {
    const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
    res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream");
    res.end(fs.readFileSync(file));
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let browser;
  try {
    browser = await chromium.launch();
    for (const view of [{ width: 390, height: 900, theme: "light" }, { width: 1280, height: 900, theme: "dark" }]) {
      const before = checks;
      const page = await browser.newPage({ viewport: { width: view.width, height: view.height }, deviceScaleFactor: 2 });
      await page.addInitScript((theme) => { localStorage.setItem("acelya-theme", theme); localStorage.setItem("acelya-sound-muted", "1"); }, view.theme);
      page.setDefaultTimeout(8000);
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      // Defter dosyası henüz yokken shared/digest/<slug>.js 404 verir; bu beklenen tek ağ hatasıdır.
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource.*404/.test(m.text())) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400 && !/shared\/digest\/|favicon/.test(r.url())) errors.push(`${r.status()} ${r.url()}`); });
      await page.goto(`http://127.0.0.1:${server.address().port}/yoneylem-arastirmasi.html`);
      const click = (id) => page.locator("#" + id).click();
      const read = async (id) => (await page.locator("#" + id).evaluate((e) => e.innerText)).replace(/\s+/g, " ").trim();
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, v);
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `${view.width}px ${id}: "${text}" yok → "${t.slice(0, 260)}"`); checks++; };
      const lacks = async (id, text) => { const t = await read(id); assert(!t.includes(text), `${view.width}px ${id}: "${text}" olmamalı`); checks++; };
      const noOverflow = async () => { eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${view.width}px yatay taşma`); };
      const painted = async (id) => { ok(await page.locator("#" + id).evaluate((c) => { const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; const seen = new Set(); for (let i = 0; i < d.length; i += 4 * 97) seen.add(d[i] + "," + d[i + 1] + "," + d[i + 2]); return seen.size > 3; }), `${id} boş`); };
      eq(await page.evaluate(() => document.documentElement.dataset.theme || "dark"), view.theme);

      // 1. sekme
      await has("lpOptPoint", "(2, 6)"); await has("lpOptZ", "36"); await has("lpDualZ", "36"); await has("lpBinding", "K2, K3"); await has("lpKind", "Tek optimum");
      await has("lpVertexRows", "D 2 6 36 K2, K3"); await has("lpConsRows", "K1 2 4 2 0 0 0"); await has("lpConsRows", "K2 12 12 0 1.5 1.5 1.5"); await has("lpConsRows", "K3 18 18 0 1 1 1");
      await has("lpProblem", "Z = 3x + 5y"); await has("lpProblem", "K3: 3x + 2y ≤ 18"); await painted("lpCanvas"); await noOverflow();
      await range("lpR3", 19); await has("lpOptZ", "37"); await has("lpR3Out", "19");            // gölge fiyat 1: +1 saat → +1
      await range("lpR3", 18); await range("lpR2", 13); await has("lpOptZ", "37.5");              // gölge fiyat 1.5
      await range("lpR2", 12); await range("lpR1", 5); await has("lpOptZ", "36");                 // aylak kısıt: değişmez
      await click("lpPreMulti"); await has("lpKind", "Çoklu optimum"); await has("lpStatus", "K3 kenarına paralel"); await has("lpOptZ", "18"); await has("lpOptPoint", "(4, 3) … (2, 6)");
      await click("lpPreDegenerate"); await has("lpKind", "dejenere"); await has("lpConsRows", "K1 2 2 0 0 … 3 0 3"); await has("lpConsRows", "K2 12 12 0 1.5 … 2.5 1.5 2.5"); await has("lpConsRows", "K3 18 18 0 0 … 1 0 1"); await has("lpStatus", "K1, K2, K3");
      await click("lpPreUnbounded"); await has("lpKind", "Sınırsız"); await has("lpStatus", "(1, 1) yönünde"); await has("lpOptZ", "sınırsız"); await has("lpProblem", "K1: x − y ≤ 4"); await painted("lpCanvas");
      await range("lpR1", 0); await range("lpB1", 0); await range("lpA2", 0); await range("lpA3", 3); await has("lpStatus", "doğru parçasına indi"); await has("lpConsRows", "K1 0 0 0 ≥ 3 3 olursuz");
      await range("lpC1", 0); await range("lpC2", 0); await has("lpStatus", "ikisi de 0"); await has("lpOptPoint", "her uygun nokta");
      await click("lpReset"); await has("lpOptPoint", "(2, 6)"); await has("lpC1Out", "3");

      // 2. sekme
      await click("tab-simplex"); eq(await page.locator("#panel-lp").isHidden(), true);
      await has("spStep", "0 / 3"); await has("spPoint", "(0, 0)"); await has("spEnter", "x"); await has("spLeave", "s₁"); await has("spStatus", "Bland kuralı"); await has("spRows", "18 ÷ 3 = 6");
      eq(await page.locator("#spBack").isDisabled(), true); eq(await page.locator("#spRows .is-pivot").count(), 1); eq(await read("spRows .is-pivot"), "1"); await painted("spCanvas");
      await click("spNext"); await has("spPoint", "(4, 0)"); await has("spZ", "12"); await has("spEnter", "y"); await has("spLeave", "s₃");
      await click("spNext"); await has("spPoint", "(4, 3)"); await has("spZ", "27"); await has("spRows", "−3/2"); await has("spEnter", "s₁");
      await click("spNext"); await has("spPoint", "(2, 6)"); await has("spZ", "36"); await has("spStatus", "y₂ = 3/2"); await has("spStatus", "3 pivotta"); eq(await page.locator("#spNext").isDisabled(), true);
      await has("spDualRows", "3/2 1.5 1.5 1.5"); await has("spDualCaption", "tam olarak aynı"); await has("spRows", "Z 0 0 0 3/2 1 36"); eq(await page.locator("#spRows .is-pivot").count(), 0);
      await click("spBack"); await has("spPoint", "(4, 3)"); await has("spDualCaption", "henüz gölge fiyat değildir");
      await page.locator("#spRule").selectOption("dantzig"); await has("spStep", "0 / 2"); await has("spEnter", "y"); await has("spStatus", "Dantzig kuralı");
      await click("spNext"); await has("spPoint", "(0, 6)"); await click("spNext"); await has("spPoint", "(2, 6)"); await has("spZ", "36");
      await page.locator("#spPreset").selectOption("degenerate"); await has("spStep", "0 / 2"); await click("spNext"); await click("spNext"); await has("spStatus", "dejenere"); await has("spDualCaption", "aralığın içinden");
      await page.locator("#spPreset").selectOption("unbounded"); await has("spStep", "0 / 1"); await click("spNext"); await has("spStatus", "Sınırsız"); await has("spDualCaption", "ikil sorun olursuz");
      await page.locator("#spPreset").selectOption("multi"); await page.locator("#spRule").selectOption("bland"); await click("spNext"); await click("spNext"); await has("spStatus", "seçenek optimum"); await has("spPoint", "(4, 3)");
      await page.locator("#spPreset").selectOption("default"); await click("spNext"); await click("spReset"); await has("spStep", "0 / 3"); eq(await page.locator("#spRule").inputValue(), "bland"); await noOverflow();
      await page.locator("h1").click(); await page.keyboard.press("Space"); await has("spStep", "1 / 3"); await page.keyboard.press("r"); await has("spStep", "0 / 3");
      await click("tab-lp"); await has("lpOptPoint", "(2, 6)"); await click("lpPreMulti"); await click("tab-simplex"); eq(await page.locator("#spPreset").inputValue(), "multi");
      await click("tab-lp"); await range("lpC1", 7); await click("tab-simplex"); eq(await page.locator("#spPreset").inputValue(), "custom"); await click("tab-lp"); await click("lpReset");

      // 3. sekme
      await click("tab-cpm");
      await has("cpT", "17 gün"); await has("cpPath", "A → B → E → H → I"); await has("cpSigma", "1.886"); await has("cpZ", "0.53"); await has("cpPNormal", "%70.2");
      await has("cpRows", "A · Tasarım — 2 3 4 3 0.111 0.143 0 3 0 3 0 0 %100"); await has("cpRows", "D · Yazılım iskeleti A 2 3 10 4 1.778 1.714 3 7 8 12 5 3");
      await has("cpProbRows", "%70.2"); await has("cpProbRows", "%69.1"); await has("cpStatus", "Monte Carlo"); await painted("cpNet"); await painted("cpGantt"); await painted("cpHist"); await noOverflow();
      const pmc = Number((await read("cpPMC")).match(/%([\d.]+)/)[1]); ok(pmc > 55 && pmc < 68, "Monte Carlo olasılığı beklenen aralıkta: " + pmc);
      const first = await read("cpPMC"); await range("cpSeed", 2); ok((await read("cpPMC")) !== first, "tohum değişince ölçüm değişmeli"); await range("cpSeed", 1); eq(await read("cpPMC"), first);
      await range("cpDeadline", 30); await has("cpPNormal", "%100"); await range("cpDeadline", 17); await has("cpPNormal", "%50"); await has("cpZ", "0");
      await click("cpPreSwitch"); await has("cpPath", "A → C → F → H → I"); await has("cpT", "17.333"); eq(await page.locator("#cpAct").inputValue(), "2"); eq(await page.locator("#cpB").inputValue(), "14");
      // Hazır düzen varsayılanlardan başlar: az önce 17'ye çekilen hedef 18'e döner, sonuç yinelenebilir.
      eq(await page.locator("#cpDeadline").inputValue(), "18"); await has("cpPNormal", "%62"); await has("cpPMC", "%46 ± 0.7 puan"); await has("cpDiff", "−16 puan"); await has("cpProbRows", "−18.5 puan");
      await range("cpA", 15); eq(await page.locator("#cpM").inputValue(), "15"); eq(await page.locator("#cpB").inputValue(), "15"); await has("cpRows", "C · Elektronik siparişi A 15 15 15 15 0 0");
      await range("cpDeadline", 15); await range("cpSeed", 7);
      await click("cpPreCertain"); await has("cpStatus", "kesin"); await has("cpZ", "tanımsız"); await lacks("cpPMC", "NaN");
      // Düzenlenen C (15, 15, 15) geri alınır: varsayılan m değerleriyle iki yol 16 günde eşitlenir.
      await has("cpT", "16 gün"); await has("cpRows", "C · Elektronik siparişi A 4 4 4 4 0 0"); eq(await page.locator("#cpDeadline").inputValue(), "18"); eq(await page.locator("#cpSeed").inputValue(), "1"); await has("cpPMC", "%100 ± 0 puan"); await has("cpDiff", "0 puan"); await lacks("cpDiff", "+");
      await click("cpReset"); await has("cpPMC", "%67.4 ± 0.6 puan"); await has("cpDiff", "−2.8 puan"); await has("cpProbRows", "+1.3 puan"); await has("cpProbRows", "−3 puan"); await has("cpProbRows", "%35.5"); await has("cpMean", "17.412 / 17 gün");
      await range("cpDeadline", 17); await has("cpPMC", "%44.5 ± 0.7 puan"); await range("cpDeadline", 18);
      await page.locator("#cpAct").selectOption("6"); eq(await page.locator("#cpM").inputValue(), "3");
      await click("cpReset"); await has("cpT", "17 gün"); eq(await page.locator("#cpDeadline").inputValue(), "18"); eq(await page.locator("#cpAct").inputValue(), "0");
      const box = await page.locator("#cpNet").boundingBox(); await page.locator("#cpNet").click({ position: { x: box.width * 0.52, y: box.height * 0.5 } }); eq(await page.locator("#cpAct").inputValue(), "5");

      // Sekme klavyesi, API, taşma
      await page.locator("#tab-cpm").focus(); await page.keyboard.press("Home"); eq(await page.locator("#tab-lp").getAttribute("aria-selected"), "true");
      await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-simplex").getAttribute("aria-selected"), "true");
      await page.keyboard.press("End"); eq(await page.locator("#tab-cpm").getAttribute("aria-selected"), "true"); await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-lp").getAttribute("aria-selected"), "true");
      eq(await page.evaluate(() => Object.isFrozen(YoneylemLab) && !Object.getOwnPropertyDescriptor(window, "YoneylemLab").writable), true);
      eq(await page.evaluate(() => { try { window.YoneylemLab = 1; } catch (_) {} return typeof window.YoneylemLab; }), "object");
      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content input, .app-content select")].every((e) => document.querySelector(`label[for="${e.id}"]`))), true);
      await noOverflow(); assert.deepEqual(errors, []); checks++;
      console.log(`D yöneylem: ${view.width}px ${view.theme} temada ${checks - before} arayüz kontrolü PASS`);
      await page.close();
    }
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
