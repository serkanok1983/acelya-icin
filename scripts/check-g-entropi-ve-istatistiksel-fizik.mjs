// G · entropi-ve-istatistiksel-fizik.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// Pascal üçgeni (BigInt), mikro durumların kaba kuvvetle sayımı, 4×4 Ising örgüsünün 2¹⁶ durumla tam toplamı,
// Onsager serbest enerjisinin sayısal türevi, Ehrenfest ana denkleminin olasılık vektörüyle evrimi.
// Kullanım: node scripts/check-g-entropi-ve-istatistiksel-fizik.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "entropi-ve-istatistiksel-fizik";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.EntropyLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");

/* ── 1. Kesin sayım: Pascal üçgeni, BigInt faktöriyel ── */
const pascal = [[1n]];
for (let n = 1; n <= 400; n++) { const p = pascal[n - 1], r = [1n]; for (let k = 1; k < n; k++) r.push(p[k - 1] + p[k]); r.push(1n); pascal.push(r); }
for (const n of [1, 2, 7, 50, 199, 400]) for (const k of [0, 1, Math.floor(n / 3), Math.floor(n / 2), n]) {
  ok(K.binomBig(n, k) === pascal[n][k], `C(${n},${k})`);
  const ln = Math.log(Number(pascal[n][k] >> BigInt(Math.max(0, pascal[n][k].toString(2).length - 60)))) + Math.max(0, pascal[n][k].toString(2).length - 60) * Math.LN2;
  near(K.lnC(n, k), ln, 1e-11, "lnC"); near(K.bigLn(pascal[n][k]), ln, 1e-11, "bigLn");
}
{ let f = 1n; for (let n = 1; n <= 3000; n++) { f *= BigInt(n); if ([1, 5, 30, 170, 1000, 3000].includes(n)) { const st = K.stirling(n); near(st.exact, K.bigLn(f), 1e-12, "ln N!"); near(st.simple, n * Math.log(n) - n, 1e-12); if (n >= 30) near(st.absFull, 1 / (12 * n), 0.02 / (12 * n) + 1e-12, "Stirling artığı ≈ 1/12N"); } } }
for (const [N, n] of [[100, 50], [4, 2], [2000, 1000], [100, 100], [37, 5]]) {
  const r = K.coins(N, n); ok(r.W === K.binomBig(N, n), "W");
  let sum = 0n; for (let k = Math.ceil(0.45 * N - 1e-9); k <= Math.floor(0.55 * N + 1e-9); k++) sum += K.binomBig(N, k);
  near(r.central, Number((sum * 10n ** 15n) / (1n << BigInt(N))) / 1e15, 1e-12, "orta şerit");
}
{ const r = K.coins(100, 50); near(r.lnW, 66.78384165, 1e-9); near(r.lnWS, 100 * Math.LN2, 1e-12); near(r.central, 0.7287469759, 1e-8); }

/* ── Einstein katıları: kaba kuvvet sayımı ── */
function brute(Ns, q) { // q kuantayı Ns osilatöre dağıtmanın bütün yolları
  let count = 0; const rec = (i, left) => { if (i === Ns - 1) { count++; return; } for (let k = 0; k <= left; k++) rec(i + 1, left - k); }; rec(0, q); return count;
}
for (const [N, q] of [[1, 5], [3, 6], [4, 4], [6, 3], [2, 9]]) near(Math.exp(K.lnOmegaE(N, q)), brute(N, q), 1e-9, "Ω");
{
  const e = K.einsteinPair(3, 3, 6), tot = brute(6, 6);
  for (let a = 0; a <= 6; a++) near(e.P[a], brute(3, a) * brute(3, 6 - a) / tot, 1e-12, "P(q_A)");
  ok(e.mode === 3, "küçük katı modu");
  const s = K.einsteinPair(300, 200, 100); ok(s.mode === 60, "Schroeder modu 60"); near(s.sd, 5.36120, 1e-5); near(s.sdTh, 5.36656, 1e-5);
  let sum = 0n; for (let a = 0; a <= 100; a++) sum += K.omegaBig(300, a) * K.omegaBig(200, 100 - a);
  ok(sum === K.binomBig(100 + 500 - 1, 100), "Σ Ω_AΩ_B = Ω(N_A + N_B)"); near(s.lnTotal, K.bigLn(sum), 1e-12);
  const t = K.kTEinstein(300, 60), lo = K.bigLn(K.omegaBig(300, 59)), hi = K.bigLn(K.omegaBig(300, 61));
  near(t.exact, 2 / (hi - lo), 1e-10, "kT kesin"); near(t.stirling, 1 / Math.log(1 + 300 / 60), 1e-12); ok(K.kTEinstein(300, 0).exact === null, "q = 0'da T tanımsız");
  for (const r of [0.05, 0.2, 1, 3]) { const w = K.widthScan(r); ok(Math.abs(w.slope + 0.5) < 0.02, `eğim ${w.slope}`); near(w.coef, Math.sqrt((1 + r) / (2 * r)), 0.05, "katsayı"); }
  ok(K.widthScan(0) === null, "q = 0 taraması yok");
}

/* ── 2. Boltzmann: Monte Carlo, kesin mikrokanonik dağılım ── */
for (const [N, qb] of [[2000, 1], [2000, 3], [500, 2]]) {
  const mc = K.einsteinMC(N, qb, 11);
  for (let s = 0; s < 10 * qb + 20; s++) mc.sweep();
  for (let s = 0; s < 400; s++) { mc.sweep(); mc.accumulate(); }
  ok(mc.n.reduce((a, b) => a + b, 0) === N * qb, "enerji korunumu");
  const tot = 400 * N, q = N * qb;
  for (let k = 0; k <= 3 * qb; k++) { // kesin: C(q − k + N − 2, N − 2)/C(q + N − 1, N − 1), BigInt ile
    const ex = Number((K.binomBig(q - k + N - 2, N - 2) * 10n ** 12n) / K.binomBig(q + N - 1, N - 1)) / 1e12;
    near(mc.hist[k] / tot, ex, 0.006, `P(${k}) N=${N} q̄=${qb}`);
  }
  const f = K.fitBoltzmann(mc.hist); near(f.kT, 1 / Math.log(1 + 1 / qb), 0.015, "kT ölçülen");
}
{ const h = new Float64Array(40); for (let k = 0; k < 40; k++) h[k] = 1e6 * 0.4 * 0.6 ** k; near(K.fitBoltzmann(h).kT, -1 / Math.log(0.6), 1e-9, "geometrik uyum"); }
{
  const g = K.collisions2D(2000, 5), m0 = g.moments();
  g.collide(30000); const m1 = g.moments();
  near(m1.energy, m0.energy, 1e-11, "enerji"); ok(Math.hypot(m1.px, m1.py) < 1e-12, "momentum");
  for (let s = 0; s < 300; s++) { g.collide(1000); g.accumulate(); }
  const f = K.fitMB(g.hist, g.vsum); near(f.kT, 0.5, 0.02, "2-B MB kT"); const av = g.averages(); near(av.v, Math.sqrt(Math.PI / 4), 0.01, "⟨v⟩"); near(av.flatness, 2, 0.03, "düzleşme");
  let integ = 0; for (let v = 0.0005; v < 8; v += 0.001) integ += K.mb2d(v, 0.7) * 0.001; near(integ, 1, 1e-6, "MB normu");
}

/* ── 3. Ising: 4×4 tam toplam, Onsager çözümü ── */
function exact4(T) {
  const L = 4; let Z = 0, sm = 0, se = 0;
  for (let c = 0; c < 1 << 16; c++) {
    let E = 0, M = 0; const s = (x, y) => ((c >> (((y + L) % L) * L + ((x + L) % L))) & 1 ? 1 : -1);
    for (let y = 0; y < L; y++) for (let x = 0; x < L; x++) { M += s(x, y); E -= s(x, y) * (s(x + 1, y) + s(x, y + 1)); }
    const w = Math.exp(-E / T); Z += w; sm += w * Math.abs(M) / 16; se += w * E / 16;
  }
  return { m: sm / Z, e: se / Z };
}
for (const T of [1.8, 2.5, 3.5]) {
  const ex = exact4(T), lat = K.ising(4, 3); lat.setT(T); for (let i = 0; i < 2000; i++) lat.sweep();
  let m = 0, e = 0; const n = 300000; for (let i = 0; i < n; i++) { lat.sweep(); m += Math.abs(lat.m); e += lat.e; }
  near(m / n, ex.m, 0.01, `4×4 ⟨|m|⟩ T=${T}`); near(e / n, ex.e, 0.01, `4×4 ⟨e⟩ T=${T}`);
  const E0 = lat.E; lat.recount(); ok(lat.E === E0, "artımlı enerji");
}
near(K.TC, 2.269185314, 1e-9); near(Math.sinh(2 / K.TC), 1, 1e-12, "sinh(2J/kT_c) = 1");
for (const k of [0, 0.3, 0.9, 0.999]) { let s = 0; const n = 20000, h = Math.PI / 2 / n; for (let i = 0; i <= n; i++) s += (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) / Math.sqrt(1 - k * k * Math.sin(i * h) ** 2); near(K.ellipticK(k), s * h / 3, 1e-8, "K(k)"); }
function betaF(b) { // −βf, Onsager çift integrali (orta nokta kuralı)
  const n = 400, h = Math.PI / n; let s = 0; const c2 = Math.cosh(2 * b) ** 2, s2 = Math.sinh(2 * b);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) s += Math.log(c2 - s2 * (Math.cos((i + 0.5) * h) + Math.cos((j + 0.5) * h)));
  return Math.LN2 + 0.5 * s * h * h / (Math.PI * Math.PI);
}
for (const T of [1.5, 2.0, 2.6, 3.5]) { const b = 1 / T, d = 1e-4; near(K.onsagerE(T), -(betaF(b + d) - betaF(b - d)) / (2 * d), 2e-4, `u(T=${T})`); }
near(K.onsagerE(K.TC), -Math.SQRT2, 1e-9, "u(T_c)");
{ const u = Math.exp(-4); near(K.onsagerM(1), 1 - 2 * u ** 2 - 8 * u ** 3 - 34 * u ** 4 - 152 * u ** 5, 1e-7, "düşük T serisi"); ok(K.onsagerM(K.TC) === 0 && K.onsagerM(3) === 0, "T ≥ T_c'de m = 0"); near(K.onsagerM(2), 0.9113194, 1e-6); }
for (const seed of [1, 2, 3]) {
  const a = K.analyseScan(K.isingScan({ Ls: [16, 32], eq: 400, meas: 2000, seed }).run());
  ok(a.cross !== null && Math.abs(a.cross - K.TC) < 0.06, `Binder kesişimi ${a.cross}`);
  ok(a.chiPeak !== null && a.chiPeak > K.TC && a.chiPeak < K.TC + 0.12, `χ tepesi ${a.chiPeak}`);
}
near(K.parabolaPeak([1, 2, 4], [0, 3, -3]).x, 2.25, 1e-12); near(K.crossing([2, 2.5], [1, 0], [0, 1]), 2.25, 1e-12);

/* ── 4. Geri dönüşsüzlük ── */
for (const N of [4, 10, 300]) {
  const g = K.freeGas(N, 7); ok(g.leftAt(0) === N, "başlangıçta hepsi solda");
  let n = 0, s1 = 0, s2 = 0, all = 0; for (let t = 3, tEnd = N <= 10 ? 30003 : 1503; t < tEnd; t += 0.05) { const f = g.leftAt(t) / N; n++; s1 += f; s2 += f * f; if (f === 1) all++; }
  const m = s1 / n; near(m, 0.5, 0.01, "ortalama pay"); near(Math.sqrt(s2 / n - m * m), 0.5 / Math.sqrt(N), 0.04, "dalgalanma");
  if (N <= 10) near(all / n, 2 ** -N, 0.3 * 2 ** -N, "hepsi solda");
  const tr = 13.37; g.reverse(tr); ok(g.leftAt(2 * tr - 1e-9) === N, "ters çevirme: geri dönüş"); ok(g.leftAt(tr) === K.freeGas(N, 7).leftAt(tr), "ters çevirme anında konum aynı");
  const out = { x: new Float64Array(N), y: new Float64Array(N) }; g.posAt(57.3, out); ok(out.x.every((x) => x >= 0 && x <= 2) && out.y.every((y) => y >= 0 && y <= 1), "kutuda");
}
for (const N of [4, 8, 12]) {
  const u = K.ehrenfest(N, 5); u.step(4e6 * (N / 4));
  near(u.fullMean, 2 ** N, 0.06, `Kac dönüşü N=${N}`); near(u.halfMean, Number((1n << BigInt(N)) * 10n ** 9n / K.binomBig(N, N / 2)) / 1e9, 0.02, "Kac N/2");
  near(K.kacTime(N, N), 2 ** N, 1e-12);
  let p = new Float64Array(N + 1); p[N] = 1; // ana denklem
  for (let t = 1; t <= 3 * N; t++) { const q = new Float64Array(N + 1); for (let k = 0; k <= N; k++) { if (k > 0) q[k - 1] += p[k] * k / N; if (k < N) q[k + 1] += p[k] * (N - k) / N; } p = q; let mean = 0; p.forEach((v, k) => (mean += v * k)); near(K.ehrenfestMean(N, t), mean, 1e-10, "Ehrenfest ortalaması"); }
}
{ const a = K.rng(42), b = K.rng(42), c = K.rng(43); const xa = [a(), a(), a()], xb = [b(), b(), b()]; ok(xa.every((x, i) => x === xb[i]) && xa[0] !== c(), "tohum belirleyici"); }
for (const bad of [() => K.coins(0, 0), () => K.einsteinPair(0, 1, 1), () => K.ising(1, 1), () => K.collisions2D(5, 1), () => K.ehrenfest(1, 1)]) { assert.throws(bad); checks++; }
console.log(`G entropi: ${checks.toLocaleString("tr-TR")} bağımsız sayım, Monte Carlo, Onsager ve Kac kontrolü PASS`);

/* ── Tarayıcı ── */
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
      const has = async (id, t) => { const v = await read(id); assert(v.includes(t), `${id}: "${v}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const until = async (fn, ms = 20000) => { await page.waitForFunction(fn, null, { timeout: ms }); checks++; };
      // Etiketler
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      // 1 · varsayılan
      await has("coinLnW", "66,7838"); await has("coinW", "1,008 × 10²⁹"); await has("coinCentral", "72,87 %");
      await page.click("#coin100"); await has("coinLnW", "0,0000"); await has("coinLnWS2", "kullanılamaz"); await has("microStatus", "S = 0");
      await page.click("#coin2000"); await has("coinCentral", "99,9993 %");
      await page.click("#coin4"); await has("coinW", "6"); await range("coinN", 2000); await has("coinnOut", "1000");
      await sel("microMode", "einstein"); await has("einMode", "60"); await has("einSd", "5,361");
      await page.click("#einSmall"); await has("einCaption", "Bütün bölüşümler"); await has("einMode", "3");
      await range("einQ", 0); await has("einSlope", "tanımsız"); await has("microStatus", "Enerji yok");
      await page.click("#einCold"); await has("einT", "tanımsız"); await has("microStatus", "B'den A'ya");
      await page.click("#microReset"); await has("coinLnW", "66,7838"); ok(await page.locator("#coinStats").isVisible(), "sıfırlama iki durumlu sisteme döner");
      await page.keyboard.press("Escape");
      // Sekme klavyesi
      await page.locator("#tab-micro").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-irrev").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-boltz").getAttribute("aria-selected")) === "true", "ArrowRight");
      // 2 · Boltzmann
      await sel("bzSpeed", "60");
      await until(() => /±/.test(document.getElementById("bzV2").textContent));
      const kT = parseFloat((await read("bzV2")).replace(",", ".")); ok(Math.abs(kT - 1.4427) < 0.03, `kT ${kT}`);
      await sel("bzMode", "gas"); await sel("bzSpeed", "60");
      await until(() => /±/.test(document.getElementById("bzV2").textContent));
      const kT2 = parseFloat((await read("bzV2")).replace(",", ".")); ok(Math.abs(kT2 - 0.5) < 0.03, `gaz kT ${kT2}`);
      await has("bzV3", "0,500000");
      await page.click("#bzRun"); ok((await read("bzRun")) === "Devam et", "duraklat");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("bzL1", "Tarama"); ok((await page.locator("#bzMode").inputValue()) === "einstein", "R sıfırlar");
      // 3 · Ising
      await page.click("#tab-ising");
      await page.click("#isLow"); await sel("isL", "16"); await sel("isInit", "cold"); await sel("isSpeed", "300");
      await until(() => /^\d,\d{3}$/.test(document.getElementById("isM").textContent), 30000);
      await page.waitForTimeout(1500);
      const m = parseFloat((await read("isM")).replace(",", ".")); ok(Math.abs(m - 0.9541) < 0.03, `|m| T=1,8 ${m}`);
      await range("isT", 1); await has("isTOut", "1,00"); await range("isT", 4); await has("isTOut", "4,00"); await has("isMTh", "0,000");
      await sel("isScanSize", "8,16"); await page.click("#isScanBtn");
      await until(() => /^\d,\d{3}$/.test(document.getElementById("isTcBinder").textContent) || /bulunamadı/.test(document.getElementById("isTcBinder").textContent), 60000);
      await has("isTcOns", "2,2692"); await has("isScanStatus", "Onsager");
      for (const q of ["e", "chi", "U", "m"]) await sel("isChartQ", q);
      await page.click("#isReset"); await has("isTOut", "2,27"); ok((await page.locator("#isL").inputValue()) === "64", "Ising sıfırlama");
      // 4 · Geri dönüşsüzlük
      await page.click("#tab-irrev"); await page.click("#irN4"); await sel("irSpeed", "20");
      await until(() => /\(\d+\/\d+\)/.test(document.getElementById("irV5").textContent));
      await page.click("#irReverse"); await until(() => /yeniden sol yarıda/.test(document.getElementById("irStatus").textContent), 20000);
      { const [tr, tb] = [...(await read("irStatus")).matchAll(/t = ([\d,]+)τ/g)].map((x) => parseFloat(x[1].replace(",", "."))); ok(Math.abs(tb - 2 * tr) < 0.02, `geri dönüş 2·t_r'de: ${tr} → ${tb}`); }
      await range("irN", 1); await has("irNOut", "1"); await range("irN", 2000); await has("irNOut", "2000");
      await sel("irMode", "urn"); await page.click("#urn4");
      await until(() => /dönüş\)/.test(document.getElementById("irE3").textContent));
      await page.waitForTimeout(1500);
      const tf = parseFloat((await read("irV3")).replace(/ /g, "").replace(",", ".")); ok(Math.abs(tf - 16) < 1.5, `Kac N=4 ${tf}`);
      await range("urnN", 1000); await has("irV3", "henüz yok"); await has("irStatus", "ölçülemez");
      await page.locator("h1").click(); await page.keyboard.press("r"); ok((await page.locator("#irMode").inputValue()) === "gas", "R sıfırlar (4)");
      ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      ok(await page.evaluate(() => Object.isFrozen(EntropyLab) && !Object.getOwnPropertyDescriptor(window, "EntropyLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G entropi: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
