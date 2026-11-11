// G · mitoz-mayoz.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini YENİDEN KULLANMAZ:
// evre sayımları kuraldan elle yazılmış bir tabloyla, gametler her lokusta 2:2 ayrışma (Mendel) ve kromatit
// korunumuyla, bağımsız dağılım ki-kare uyumuyla ve çok tohumlu ortalamayla, rekombinant oranı Mather formülüyle
// (Poisson) ve aralığa düşme olasılığıyla (tek kiazma), ayrılmama oranları hatalı mayoz sayısından tam sayımla
// denetlenir. İnsan sayıları (2^23, 2^46) BigInt ile hesaplanır.
// Kullanım: node scripts/check-g-mitoz-mayoz.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../mitoz-mayoz.html", import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.MeiosisLab;
let checks = 0;
const ok = (c, label) => { assert(c, label); checks++; };
const eq = (a, b, label) => { assert.equal(a, b, label); checks++; };
const near = (a, b, tol, label) => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label}: ${a} ≠ ${b} (tol ${tol})`); checks++; };

ok(Object.isFrozen(K), "çekirdek dondurulmuş");

/* ── 1. Mitoz: kuraldan yazılmış evre tablosu ── */
const MIT = { G1: [2, 1], S: [4, 1], G2: [4, 1], pro: [4, 1], meta: [4, 1], ana: [4, 2], telo: [4, 2], cyto: [2, 1] }; // [C, kromozom/2n]
for (let n2 = 2; n2 <= 46; n2 += 2) {
  const m = K.mitosis(n2);
  eq(m.stages.map(s => s.key).join(","), Object.keys(MIT).join(","), "mitoz evre sırası");
  for (const st of m.stages) {
    const a = K.at(m, st.start + st.dur * 0.999999);
    for (const c of a.counts) { near(c.C, MIT[st.key][0], 1e-9, `mitoz ${st.key} C`); eq(c.chromosomes, MIT[st.key][1] * n2, `mitoz ${st.key} kromozom`); }
    eq(a.cells.length, st.key === "cyto" ? 2 : 1, "hücre sayısı");
  }
  // DNA korunumu: bölünmeden önceki toplam = iki yavrunun toplamı
  near(K.count(m.ana, n2 / 2).C, K.count(m.daughters[0], n2 / 2).C + K.count(m.daughters[1], n2 / 2).C, 1e-9, "DNA korunumu");
  ok(m.identical, "yavrular ana hücreyle aynı");
  // bağımsız karşılaştırma: her yavruda her çiftten bir anne + bir baba, tek kromatitli, tümüyle tek renkli
  for (const d of m.daughters) for (let k = 0; k < n2 / 2; k++) { const cs = d.filter(c => c.pair === k); eq(cs.map(c => c.origin).sort().join(""), "mp", "yavru çifti"); ok(cs.every(c => c.cts.length === 1 && c.cts[0].length === 1 && c.cts[0][0][2] === c.origin), "yavru kromatidi"); }
  // S evresi: DNA tekdüze artar, 2C'den 4C'ye
  let prev = 0; for (let i = 0; i <= 50; i++) { const s = m.stages[1], C = K.at(m, s.start + s.dur * i / 50 * 0.999999).counts[0].C; ok(C >= prev - 1e-12 && C >= 2 - 1e-12 && C <= 4 + 1e-12, "S tekdüze"); prev = C; }
}
{ const m = K.mitosis(4); eq(K.at(m, -5).stage.key, "G1", "zaman alt sınırı"); eq(K.at(m, 1e9).stage.key, "cyto", "zaman üst sınırı"); near(K.at(m, 1e9).p, 1, 1e-12, "son an"); near(m.total, 17.4, 1e-9, "mitoz süresi"); }
const tr = K.track(K.mitosis(4), 200); near(tr[0].C, 2, 1e-12, "iz başı"); near(tr[200].C, 2, 1e-12, "iz sonu"); near(Math.max(...tr.map(d => d.C)), 4, 1e-12, "iz tepe"); eq(Math.max(...tr.map(d => d.chrom)), 8, "iz 4n");

/* ── 2. Mayoz: evre tablosu, 2:2 ayrışma, kromatit korunumu ── */
const MEI = { G1: [2, 2], S: [4, 2], G2: [4, 2], proI: [4, 2], metaI: [4, 2], anaI: [4, 2], teloI: [4, 2], cytoI: [2, 1], proII: [2, 1], metaII: [2, 1], anaII: [2, 2], teloII: [2, 2], cytoII: [1, 1] }; // [C, kromozom/n]
const segLen = (ct, o) => ct.reduce((s, [a, b, q]) => s + (q === o ? b - a : 0), 0);
for (const mode of ["none", "single", "fixed", "poisson"]) for (let n2 = 2; n2 <= 12; n2 += 2) for (let seed = 1; seed <= 30; seed++) {
  const m = K.meiosis(n2, { seed, mode, pos: 0.37 }), n = n2 / 2;
  for (const st of m.stages) { const a = K.at(m, st.start + st.dur * 0.999999); for (const c of a.counts) { near(c.C, MEI[st.key][0], 1e-9, `mayoz ${st.key} C`); eq(c.chromosomes, MEI[st.key][1] * n, `mayoz ${st.key} kromozom`); } }
  eq(m.gametes.length, 4, "dört gamet");
  for (const g of m.gametes) { eq(g.length, n, "gamet n"); eq(g.map(c => c.pair).join(","), Array.from({ length: n }, (_, k) => k).join(","), "her çiftten bir"); }
  for (let k = 0; k < n; k++) {
    const cts = m.gametes.map(g => g[0 + k].cts[0]);
    // her lokusta tam iki anne, iki baba alel (Mendel'in 2:2 ayrışması, krossing-over ne olursa olsun)
    for (const x of [0.001, 0.13, 0.37, 0.5, 0.81, 0.999]) eq(cts.filter(ct => K.originAt(ct, x) === "m").length, 2, "2:2 ayrışma");
    near(cts.reduce((s, ct) => s + segLen(ct, "m"), 0), 2, 1e-9, "anne DNA korunumu");
    for (const ct of cts) { let e = 0; for (const [a, b] of ct) { near(a, e, 1e-12, "parçalar bitişik"); e = b; } near(e, 1, 1e-12, "kromatit tam"); }
    const nEv = m.events.filter(e => e.pair === k).length, rec = cts.filter(ct => ct.length > 1).length;
    if (mode === "none") eq(rec, 0, "krossing-oversuz rekombinant yok");
    if (mode === "single" || mode === "fixed") eq(rec, 2, "tek kiazma iki rekombinant kromatit");
    if (mode === "poisson" && nEv === 0) eq(rec, 0, "kiazmasız bivalent");
  }
  if (mode === "none") eq(new Set(m.gametes.map(g => K.signature(g))).size, n === 0 ? 1 : Math.min(2, 2), "kiazmasız iki gamet tipi");
}
{ const a = K.meiosis(8, { seed: 42 }), b = K.meiosis(8, { seed: 42 }), c = K.meiosis(8, { seed: 43 }); eq(JSON.stringify(a.gametes), JSON.stringify(b.gametes), "aynı tohum aynı mayoz"); ok(JSON.stringify(a.gametes) !== JSON.stringify(c.gametes), "farklı tohum"); }
{ const m = K.meiosis(4, { seed: 1 }); eq(m.events.length, 2, "varsayılan iki kiazma"); eq(new Set(m.gametes.map(g => K.signature(g))).size, 4, "tohum 1: dört farklı gamet"); }

// Poisson modelinde kiazma her zaman o noktada anne ve baba DNA'sı taşıyan iki kromatit arasındadır:
// aralığa tek kiazma düşerse (dışarıda kaç tane olursa olsun) dört kromatitten tam ikisi rekombinanttır.
{ const r = K.mulberry32(77); let seen = 0;
  for (let i = 0; i < 4000; i++) { const g = K.meiosis(2, { rnd: r, mode: "poisson", mapLen: 1.5 }); const inside = g.events.filter(e => e.x > 0.2 && e.x < 0.4).length; if (inside !== 1) continue; seen++;
    eq(g.gametes.filter(gam => K.originAt(gam[0].cts[0], 0.2) !== K.originAt(gam[0].cts[0], 0.4)).length, 2, "aralıkta tek kiazma iki rekombinant"); }
  ok(seen > 500, "yeterli örnek"); }

/* ── 3. Bağımsız dağılım ── */
for (const n of [1, 2, 3, 5]) { // çok tohumlu ortalama, kapalı biçimle değil 400 bağımsız tekrarla
  for (const N of [1, 3, 8]) { let s = 0, s2 = 0; const R = 400; for (let seed = 1; seed <= R; seed++) { const d = K.assortment({ n, N, seed }).distinct; s += d; s2 += d * d; } const mu = s / R, sd = Math.sqrt(Math.max(1e-12, s2 / R - mu * mu));
    // bağımsız beklenti: her tip bir mayozda 2/2^n olasılıkla görülür (n=1'de kesin)
    const pSeen = n === 1 ? 1 : 2 / 2 ** n, exp = 2 ** n * (1 - (1 - pSeen) ** N); near(mu, exp, 4 * sd / Math.sqrt(R) + 1e-9, `farklı tip ortalaması n=${n} N=${N}`); near(K.expectedDistinct(n, N), exp, 1e-9, "beklenen formül"); }
}
{ const r = K.assortment({ n: 3, N: 20000, seed: 7 }); eq(r.distinct, 8, "2^3 tipin hepsi");
  const th = [1, 3, 3, 1].map(x => x / 8); let chi = 0; r.hist.forEach((f, k) => { chi += (f * r.total - th[k] * r.total) ** 2 / (th[k] * r.total); }); ok(chi < 2 * 16.27, "binom uyumu (gamet çiftleri bağımlı; eşik iki katı)"); near(r.allM, 1 / 8, 0.01, "hepsi anne 1/8"); }
{ const r = K.assortment({ n: 10, N: 10000, seed: 1 }); eq(r.all, 1024, "2^10"); ok(r.distinct > 1000, "1024 tipin çoğu"); }
const H = K.human(); eq(BigInt(H.gametes), 2n ** 23n, "2^23"); eq(H.gametes, 8388608, "8 388 608"); eq(BigInt(H.zygotes), (2n ** 23n) ** 2n, "(2^23)^2"); eq(H.zygotes, 70368744177664, "70 368 744 177 664");

/* ── 4. Rekombinasyon ── */
for (const d of [2, 10, 25, 40]) { const r = K.recombination({ d, mode: "single", N: 20000, seed: 3 }); near(r.rf, (r.xB - r.xA) / 2, 4 * r.se + 1e-9, `tek kiazma d=${d}`); near(r.theory, d / 100, 1e-12, "r = d"); }
for (const d of [5, 20, 45]) { const r = K.recombination({ d, mode: "poisson", N: 20000, seed: 5 });
  // Mather: r = (1 − P(aralıkta kiazma yok))/2; aralıkta ortalama kiazma = 2·(xB − xA) (bivalent başına ortalama 2)
  const mather = (1 - Math.exp(-2 * (r.xB - r.xA))) / 2; near(r.rf, mather, 4 * r.se + 1e-9, `Poisson d=${d}`); near(r.theory, mather, 1e-12, "Haldane = Mather"); ok(r.theory < d / 100, "Haldane < doğrusal"); }
// sınır değerler dahil kaydırıcının her konumunda (0.02–0.98, adım 0.01) ölçülen ile kuram aynı olmalı (B tam 0.30'da kiazma uç parçadadır)
for (let k = 2; k <= 98; k++) { const pos = +(k / 100).toFixed(2), r = K.recombination({ mode: "fixed", pos, N: 20, seed: 3 }); eq(r.rf, r.theory, `sabit konum ${pos}: ölçülen = kuram`); }
for (const [pos, exp] of [[0.05, 0], [0.2, 0.5], [0.29, 0.5], [0.6, 0]]) { const r = K.recombination({ mode: "fixed", pos, N: 300, seed: 2 }); eq(r.rf, exp, `sabit konum ${pos}`); eq(r.theory, exp, "sabit konum kuramı"); }
{ const a = K.recombination({ d: 10, N: 1000, seed: 1 }); eq(a.rec, 430, "varsayılan 430 rekombinant"); eq(a.total, 4000, "4000 gamet"); }

/* ── 5. Ayrılmama ── */
for (const stage of ["MI", "MII"]) for (const p of [0, 0.3, 1]) for (const n2 of [2, 4, 8]) for (let pair = 0; pair < n2 / 2; pair++) {
  const r = K.nondisjunction({ n2, pair, stage, p, N: 600, seed: 11 + pair });
  // tam sayım: hatalı her mayoz MI'de 2+2, MII'de 1+1 anormal gamet verir
  const per = stage === "MI" ? 2 : 1;
  eq(r.counts.plus, per * r.errors, "n+1 sayısı"); eq(r.counts.minus, per * r.errors, "n−1 sayısı"); eq(r.counts.plus + r.counts.minus + r.counts.normal, 4 * 600, "toplam");
  ok(r.consistent, "kromozom sayısı tutarlı");
  if (p === 0) eq(r.errors, 0, "p=0"); if (p === 1) eq(r.errors, 600, "p=1");
  if (p === 0.3) near(r.errors / 600, 0.3, 4 * Math.sqrt(0.3 * 0.7 / 600), "hata sıklığı");
}
eq(JSON.stringify(K.ndTheory("MI", 1)), JSON.stringify({ plus: 0.5, minus: 0.5, normal: 0 }), "MI kuramı");
eq(JSON.stringify(K.ndTheory("MII", 1)), JSON.stringify({ plus: 0.25, minus: 0.25, normal: 0.5 }), "MII kuramı");
{ const m = K.meiosis(6, { seed: 9, nd: { stage: "MI", pair: 1 } }); eq(m.cellsI.map(c => K.copies(c, 1)).sort().join(","), "0,4", "MI: bir hücre iki homolog"); eq(m.gametes.map(g => K.copies(g, 1)).sort().join(","), "0,0,2,2", "MI gametleri"); }
{ const m = K.meiosis(6, { seed: 9, nd: { stage: "MII", pair: 2 } }); eq(m.gametes.map(g => K.copies(g, 2)).sort().join(","), "0,1,1,2", "MII gametleri"); }

for (const bad of [() => K.mitosis(3), () => K.mitosis(0), () => K.meiosis(48), () => K.meiosis(4, { mode: "x" }), () => K.meiosis(4, { mode: "fixed", pos: 1 }), () => K.meiosis(4, { nd: { stage: "MI", pair: 2 } }), () => K.recombination({ d: 60 }), () => K.assortment({ n: 0, N: 5 }), () => K.nondisjunction({ p: 2 }), () => K.replicate(K.replicate(K.diploid(2)))]) { assert.throws(bad); checks++; }

console.log(`G mitoz-mayoz: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

if (process.argv.includes("--browser")) {
  const { createRequire } = await import("node:module");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const { chromium } = createRequire(join(root, "package.json"))("playwright");
  const server = createServer((req, res) => {
    const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname));
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
    res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream");
    res.end(fs.readFileSync(file));
  });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  let browser;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const before = checks;
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width === 390 ? 2 : 1, locale: "tr-TR" });
      await ctx.addInitScript(t => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(6000);
      const errors = []; page.on("pageerror", e => errors.push(e.message)); page.on("console", m => { if (m.type() === "error" && !/404/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/mitoz-mayoz.html`);
      const click = id => page.locator("#" + id).click(), read = async id => (await page.locator("#" + id).textContent()).trim();
      const norm = s => s.replace(/[  ]/g, " ");
      const has = async (id, t) => { const s = norm(await read(id)); assert(s.includes(t), `[${width}] #${id}: "${s}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, v);
      const pick = (id, v) => page.locator("#" + id).selectOption(v);
      const type = async (id, v) => { await page.locator("#" + id).fill(v); await page.locator("#" + id).dispatchEvent("change"); };
      const weq = (a, b, l) => { assert.equal(a, b, `[${width}] ${l}`); checks++; };
      const clean = async sel => { const t = await page.locator(sel).innerText(); assert(!/NaN|Infinity|undefined|null/.test(t), `[${width}] ${sel} bozuk sayı`); checks++; };
      const noOverflow = async () => weq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "yatay taşma");
      const drawn = async ids => { for (const id of ids) weq(await page.evaluate(id => { const c = document.getElementById(id), d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++; return n > 500; }, id), true, id + " boş"); };

      weq(await page.evaluate(() => [...document.querySelectorAll(".app-content input, .app-content select")].filter(e => !document.querySelector(`label[for="${e.id}"]`)).length), 0, "etiketsiz denetim");
      weq(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].filter(c => c.getAttribute("role") !== "img" || !c.getAttribute("aria-label")).length), 0, "rolsüz tuval");
      weq(await page.evaluate(() => Object.isFrozen(MeiosisLab) && !Object.getOwnPropertyDescriptor(window, "MeiosisLab").writable), true, "çekirdek salt okunur");
      weq(await page.evaluate(() => /[̀-ͯ⃐-⃿]/.test(document.querySelector(".app-content").innerText)), false, "birleşik işaret yok");
      weq(await page.locator("p.hint").count(), 1, "tek ipucu");

      /* 01 Mitoz */
      await has("mitStage", "İnterfaz · G1"); await has("mitC", "2.00C"); await has("mitChr", "4"); await has("mitSame", "—");
      await range("mitTime", 9.0); await has("mitStage", "Metafaz"); await has("mitC", "4.00C"); await has("mitChr", "4"); await has("mitCt", "8"); await has("mitChrTh", "fark 0");
      await range("mitTime", 11.3); await has("mitStage", "Anafaz"); await has("mitChr", "8"); await has("mitCt", "8"); await has("mitCTh", "kural: 4C");
      await range("mitTime", 17.4); await has("mitStage", "Sitokinez"); await has("mitC", "2.00C"); await has("mitChr", "4"); await has("mitSame", "Evet"); await has("mitCells", "2 hücre"); await has("mitPlay", "Baştan oynat");
      await range("mitTime", 4.0); await has("mitStage", "İnterfaz · S"); await has("mitCTh", "eşlenen pay");
      await click("mitNext"); await has("mitStage", "İnterfaz · G2"); await click("mitNext"); await has("mitStage", "Profaz"); await click("mitPrev"); await has("mitStage", "İnterfaz · G2");
      await range("mitN", 8); await has("mitNOut", "8 (n = 4)"); await has("mitStage", "İnterfaz · G1"); await has("mitChr", "8"); await range("mitTime", 11.3); await has("mitChr", "16");
      await range("mitN", 2); await range("mitTime", 17.4); await has("mitChr", "2"); await has("mitSame", "Evet");
      await click("mitReset"); await has("mitNOut", "4"); await has("mitTimeOut", "0.00 s");
      await click("mitPlay"); await has("mitPlay", "Duraklat"); await page.waitForTimeout(500); await page.locator("h1").click(); await page.keyboard.press("Space"); await has("mitPlay", "Devam et");
      weq(+(await page.locator("#mitTime").inputValue()) > 0.1, true, "zaman ilerledi");
      await page.keyboard.press("r"); await has("mitTimeOut", "0.00 s"); await has("mitPlay", "Oynat");
      await page.locator("#mitN").focus(); await page.keyboard.press("r"); await has("mitTimeOut", "0.00 s");
      await drawn(["mitCanvas", "mitChart"]); await clean("#panel-mit"); await noOverflow();

      /* 02 Mayoz */
      await click("tab-mei"); await has("meiStage", "İnterfaz · G1"); await has("meiGametes", "Gamet 1 · 2 kromozom · 1.00C"); await has("meiEvents", "4 tanesi birbirinden farklı"); await has("meiEvents", "uçtan 0.53");
      await range("meiTime", 10.5); await has("meiStage", "Metafaz I"); await has("meiC", "4.00C"); await has("meiChr", "4");
      await range("meiTime", 11.5); await has("meiStage", "Anafaz I"); await has("meiChr", "4"); await has("meiChrTh", "(2n)");
      await range("meiTime", 15.0); await has("meiStage", "Sitokinez I"); await has("meiC", "2.00C"); await has("meiChr", "2"); await has("meiCt", "4"); await has("meiChrTh", "(n)");
      await range("meiTime", 20.0); await has("meiStage", "Anafaz II"); await has("meiChr", "4"); await has("meiC", "2.00C");
      await range("meiTime", 24.5); await has("meiStage", "Sitokinez II"); await has("meiC", "1.00C"); await has("meiChr", "2"); await has("meiCells", "4 hücre");
      await click("meiNew"); weq(await page.locator("#meiSeed").inputValue(), "2", "tohum + 1"); await has("meiStage", "İnterfaz · G1"); await has("meiEvents", "tohum 2");
      await pick("meiCross", "none"); await has("meiEvents", "krossing-over yok"); await has("meiEvents", "2 tanesi birbirinden farklı"); weq(await page.locator("#meiPosField").isHidden(), true, "konum gizli");
      await pick("meiCross", "fixed"); weq(await page.locator("#meiPosField").isVisible(), true, "konum görünür"); await range("meiPos", 0.25); await has("meiEvents", "uçtan 0.25");
      await type("meiSeed", "abc"); weq(await page.locator("#meiSeed").inputValue(), "1", "geçersiz tohum"); await type("meiSeed", "9999999"); weq(await page.locator("#meiSeed").inputValue(), "999999", "tohum üst sınır");
      await range("meiN", 8); await has("meiGametes", "4 kromozom"); await range("meiTime", 24.5); await has("meiChr", "4");
      await click("meiReset"); weq(await page.locator("#meiSeed").inputValue(), "1", "sıfırla tohum"); await has("meiEvents", "uçtan 0.53");
      await page.locator("h1").click(); await page.keyboard.press("Space"); await has("meiPlay", "Duraklat"); await page.waitForTimeout(300); await page.keyboard.press("Space"); await has("meiPlay", "Devam et");
      await range("meiTime", 7.0); await drawn(["meiCanvas", "meiChart"]); await clean("#panel-mei"); await noOverflow();

      /* 03 Çeşitlilik */
      await click("tab-var"); await has("varDistinct", "16 / 16"); await has("varExpected", "beklenen 14.89"); await has("varFreq", "2.50 %"); await has("varFreqTh", "6.25 %");
      await has("humGam", "8 388 608"); await has("humZyg", "70 368 744 177 664");
      await range("varN", 10); await has("varAll", "1 024"); await pick("varRuns", "10000"); await has("varDistinct", "/ 1 024"); await has("varAllNote", "10 000 mayoz, 40 000 gamet"); await has("varStatus", "10 000 mayozda"); await clean("#panel-var");
      await range("varN", 1); await has("varDistinct", "2 / 2");
      await has("recRF", "10.75 %"); await has("recTh", "10.00 %"); await has("recCount", "430 rekombinant");
      await pick("recMode", "poisson"); await has("recTh", "9.06 %"); await has("recStatus", "Haldane");
      await pick("recMode", "fixed"); weq(await page.locator("#recPosField").isVisible(), true, "konum görünür"); weq(await page.locator("#recDField").isHidden(), true, "d gizli"); await has("recRF", "50.00 %"); await has("recTh", "50.00 %"); await range("recPos", 0.3); await has("recRF", "50.00 %"); await has("recTh", "50.00 %"); await range("recPos", 0.2);
      await range("recPos", 0.5); await has("recRF", "0.00 %"); await has("recSE", "rastgele hata yok");
      await click("varReset"); await has("varDistinct", "16 / 16"); await has("recRF", "10.75 %"); await range("recD", 45); await has("recTh", "45.00 %"); await range("recD", 1); await has("recDOut", "1 cM");
      await drawn(["varCurve", "varHist", "recCanvas"]); await clean("#panel-var"); await noOverflow();

      /* 04 Ayrılmama */
      await click("tab-nd"); await has("ndPlus", "50.00 %"); await has("ndMinus", "50.00 %"); await has("ndNorm", "0.00 %"); await has("ndZygNote", "2n + 1 = 5");
      await pick("ndStage", "MII"); await has("ndPlus", "25.00 %"); await has("ndNorm", "50.00 %"); await has("ndStatus", "yarısı anormal");
      await range("ndP", 0); await has("ndNorm", "100.00 %"); await has("ndStatus", "p = 0"); await range("ndP", 30); await clean("#panel-nd");
      await range("ndN", 8); weq(await page.locator("#ndPair option").count(), 4, "dört çift seçeneği"); await pick("ndPair", "3"); await has("ndStatus", "4. çift"); await has("ndZygNote", "2n + 1 = 9");
      await range("ndN", 2); weq(await page.locator("#ndPair").inputValue(), "0", "çift sınıra çekilir");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("ndPlus", "50.00 %"); weq(await page.locator("#ndStage").inputValue(), "MI", "sıfırla aşama");
      await drawn(["ndCanvas", "ndBars"]); await clean("#panel-nd"); await noOverflow();

      /* sekme klavyesi */
      await page.locator("#tab-nd").focus(); await page.keyboard.press("Home"); weq(await page.locator("#tab-mit").getAttribute("aria-selected"), "true", "Home");
      await page.keyboard.press("ArrowLeft"); weq(await page.locator("#tab-nd").getAttribute("aria-selected"), "true", "ArrowLeft sarar");
      await page.keyboard.press("ArrowRight"); weq(await page.locator("#tab-mit").getAttribute("aria-selected"), "true", "ArrowRight");
      await page.keyboard.press("End"); weq(await page.locator("#panel-nd").isVisible(), true, "End");
      assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      console.log(`G mitoz-mayoz: [${theme} ${width}] ${checks - before} arayüz kontrolü PASS`);
      await ctx.close();
    }
  } finally { await browser?.close(); await new Promise(r => server.close(r)); }
}
