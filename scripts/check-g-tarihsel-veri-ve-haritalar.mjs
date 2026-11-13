// G · tarihsel-veri-ve-haritalar.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// açılmış kaynaklardaki yayımlanmış sayılar (Snow 1855 Gutenberg metni, HistData belgeleri, masswerk.at 2018,
// Wikipedia nüfus tablosu), JavaScript Date ile takvim hesabı, en yakın pompa için ayrı bir kaba kuvvet döngüsü,
// sokak paylarının dört kat ince örneklemle yeniden hesabı, geometrik medyan için ızgara araması,
// büyüme için bileşik faiz biçimi.
// Kullanım: node scripts/check-g-tarihsel-veri-ve-haritalar.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "tarihsel-veri-ve-haritalar";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.TarihVeri;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };

/* ── Kabuk ve metin ── */
ok(Object.isFrozen(K) && Object.isFrozen(K.MIN_TROOPS) && Object.isFrozen(K.POP.biraben) && Object.isFrozen(K.SRC_Q[0].cards), "çekirdek dondurulmuş");
ok(!/fonts\.googleapis|cdn\.|<script src="http/.test(html), "dış betik ya da yazı tipi yok");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}☀-⛿]/u.test(html), "emoji yok");
const title = html.match(/<title>([^<]+)<\/title>/)[1]; ok(title.startsWith("Tarihsel Veri ve Haritalar: ") && [...title].length <= 80, "başlık ≤ 80: " + [...title].length);
ok(/data-page="tarihsel-veri-ve-haritalar"/.test(html) && /shared\/app\.js/.test(html) && /shared\/theme\.css/.test(html) && /<meta name="description"/.test(html), "kabuk");
ok((html.match(/KERNEL-BEGIN/g) || []).length === 1 && (html.match(/defineProperty\(window/g) || []).length === 1, "tek çekirdek, tek küresel");
for (const l of ["salgin-modelleri-sir.html", "nufus-ekolojisi.html", "regresyon-ve-korelasyon.html", "bilim-tarihinden-deneyler.html", "roma-hukuku.html"]) {
  ok(html.includes(`href="${l}"`) && fs.existsSync(new URL(`../${l}`, import.meta.url)), "komşu bağlantı " + l);
}
ok(!/<img\b/i.test(html), "görüntü gömülmemiş: bütün çizimler veriden");
ok(!/%\d/.test(html.replace(/<script[\s\S]*<\/script>/, "")), "yüzde biçimi '23,7 %' (önde % yok)");
ok(!/salgını durdurdu\./.test(html) || html.includes("Mit: \"Kol söküldü, salgın durdu.\""), "kol miti yalnız mit olarak");
ok(html.includes("1815") && /sefer 1812'dedir/.test(html), "HistData 1815 hatası kaynak eleştirisi olarak anılıyor");
ok(html.includes("Thames Ditton") && html.includes("Seething Wells") && html.includes("679, 610, 600 ve 641") && html.includes("420 ölüm") && html.includes("Wellcome"), "doğrulayıcı düzeltmeleri: Lambeth adı, 2019 sürümü, 420 / 616, taranmış baskı");
ok(!/1 birim ≈ 100 m|birimi yaklaşık 100 m/.test(html), "birim 100 m diye yazılmıyor");

/* ── 1 · Minard ── */
{
  ok(K.MIN_TROOPS.length === 51 && K.MIN_CITIES.length === 20 && K.MIN_TEMP.length === 9 && K.MIN_MAIN.length === 35, "HistData satır sayıları 51 / 20 / 9");
  // CSV'den elle aktarılmış örnek satırlar
  const row = (i) => K.MIN_TROOPS[i - 1].join(",");
  ok(row(1) === "24,54.9,340000,A,1" && row(13) === "34.4,55.5,127100,A,1" && row(31) === "26.4,54.4,14000,R,1" && row(45) === "28.3,54.2,28000,R,2" && row(51) === "24.1,54.4,6000,R,3", "örnek satırlar");
  ok(K.MIN_CITIES.map((c) => c[2]).includes("Moscou") && K.MIN_CITIES[17].join() === "37.6,55.8,Moscou", "Moskova");
  const C = K.minardChecks();
  ok(C.startSum === 422000 && C.starts.join() === "340000,60000,22000", "masswerk.at: 422 000 = 340 000 + 60 000 + 22 000");
  ok(C.moscowN === 100000, "Moskova 100 000"); abs(C.moscowPct, 23.7, 0.005, "masswerk.at 23,7 %");
  ok(C.endSum === 10000, "dönüş 10 000"); abs(C.endPct, 2.37, 0.001, "masswerk.at 2,37 %");
  ok(C.vitebsk === 175000 && C.vilnaVitebsk === 165000, "masswerk.at: Vitebsk 175 000, kayıp 165 000");
  ok(C.increases.length === 1 && C.increases[0].from === 12000 && C.increases[0].to === 14000 && C.increases[0].city === "Smorgoni", "geri çekilişteki tek artış");
  ok(C.advanceLoss === 240000 && C.retreatLoss === 96000, "ilerleyiş ve geri çekiliş kayıpları");
  // takvim: JavaScript Date ile
  const d = (m, day) => (Date.UTC(1812, m, day) - Date.UTC(1812, 9, 1)) / 864e5 + 1;
  const dates = [d(9, 18), d(9, 24), d(10, 9), d(10, 14), null, d(10, 28), d(11, 1), d(11, 6), d(11, 7)];
  ok(K.MIN_TEMP.every((t, i) => t[3] === dates[i]), "tarih kodlaması (1 Ekim = 1)");
  ok(C.daysOk === 6 && C.daysN === 6, "gün sütunu 6 çiftte tarihlerle aynı");
  ok(C.missing.agree && C.missing.fwd === d(10, 24) && C.missing.name === "24 Kasım", "eksik tarih 24 Kasım");
  ok(K.dayName(1) === "1 Ekim" && K.dayName(32) === "1 Kasım" && K.dayName(62) === "1 Aralık" && K.dayName(0) === null, "gün adları");
  near(80 * K.R2C, 100, 1e-12, "Réaumur: 80 °R = 100 °C"); near(-30 * K.R2C, -37.5, 1e-12, "Commons: −30 °R = −37,5 °C");
  ok(K.MIN_TEMP.map((t) => t[1]).join() === "0,0,-9,-21,-11,-20,-24,-30,-26", "sıcaklıklar");
  const P = K.minardPoint(16); ok(P.city === "Moscou" && P.n === 100000 && P.dir === "A", "16. nokta Moskova");
  ok(K.minardPoint(27).city === "Studienska" && K.minardPoint(1).city === "Kowno" && K.minardPoint(35).n === 4000, "hazır noktalar");
  ok(K.minardPoint(31).loss === -2000, "artış eksi kayıp");
  for (const bad of [0, 36, 2.5]) { assert.throws(() => K.minardPoint(bad)); checks++; }
}

/* ── 2 · Snow ── */
{
  ok(K.DEATHS.length === 578 && K.PUMPS.length === 13, "HistData: 578 ölüm, 13 pompa");
  ok(K.STREETS.length === 528 && K.STREETS.reduce((s, p) => s + p.length, 0) === 1241, "528 sokak parçası, 1241 nokta");
  abs(K.DEATHS[0][0], 13.588, 0.0006, "1. ölüm x"); abs(K.DEATHS[0][1], 11.096, 0.0006, "1. ölüm y");
  ok(K.PUMPS[K.BROAD][0] === "Broad St", "Broad St pompası");
  // kaba kuvvet, karesel uzaklıkla ayrı döngü
  const cnt = new Array(13).fill(0);
  for (const [x, y] of K.DEATHS) { let b = -1, bd = Infinity; for (let i = 0; i < 13; i++) { const dx = x - K.PUMPS[i][1], dy = y - K.PUMPS[i][2], q = dx * dx + dy * dy; if (q < bd) { bd = q; b = i; } } cnt[b]++; }
  ok(cnt.join() === K.pumpCounts().join(), "en yakın pompa sayıları");
  ok(cnt[K.BROAD] === 359 && cnt.reduce((a, b) => a + b, 0) === 578, "Broad St 359 / 578");
  const S = K.streetShares().shares, S4 = K.streetShares(0.005).shares;
  S.forEach((v, i) => abs(v, S4[i], 0.002, "sokak payı inceltme " + i)); abs(S.reduce((a, b) => a + b, 0), 1, 1e-9, "paylar toplamı");
  abs(S[K.BROAD], 0.086, 0.001, "Broad St sokak payı");
  const g = K.geoMedian(), f = (x, y) => K.DEATHS.reduce((s, [a, b]) => s + Math.hypot(a - x, b - y), 0), f0 = f(g[0], g[1]);
  let worse = true; for (let dx = -0.3; dx <= 0.3001; dx += 0.05) for (let dy = -0.3; dy <= 0.3001; dy += 0.05) if ((dx || dy) && f(g[0] + dx, g[1] + dy) < f0 - 1e-9) worse = false;
  ok(worse, "geometrik medyan ızgarada en küçük");
  // Birim: HistData belgesi "100 m" der; cholera R paketi (lindbrook/cholera, data/pumps.rda) aynı 13 pompanın
  // koordinatlarını bugünkü enlem-boylamla verir. Çift uzaklıklarından birim başına metre (ayrı hesap):
  const LL = [[-0.1396797, 51.51634], [-0.1377801, 51.51662], [-0.1358797, 51.51608], [-0.1346969, 51.51627], [-0.1396123, 51.51491], [-0.1394918, 51.51386], [-0.1365998, 51.51332], [-0.1381692, 51.51127], [-0.1358782, 51.5115], [-0.1335442, 51.51212], [-0.1316052, 51.51231], [-0.1340432, 51.51011], [-0.1394917, 51.51017]];
  const Rm = 6371000, c0 = Math.cos(51.5133 * Math.PI / 180), mr = [];
  for (let i = 0; i < 13; i++) for (let j = i + 1; j < 13; j++) mr.push(Math.hypot((LL[i][0] - LL[j][0]) * c0, LL[i][1] - LL[j][1]) * Math.PI / 180 * Rm / Math.hypot(K.PUMPS[i][1] - K.PUMPS[j][1], K.PUMPS[i][2] - K.PUMPS[j][2]));
  mr.sort((a, b) => a - b); ok(mr[0] > 52 && mr.at(-1) < 56.5 && Math.abs(mr[39] - K.SNOW_UNIT_M) < 1, "birim ≈ 54 m (pompaların enlem-boylamı): " + mr[39].toFixed(2));
  abs(Math.hypot(g[0] - K.PUMPS[K.BROAD][1], g[1] - K.PUMPS[K.BROAD][2]) * K.SNOW_UNIT_M, 23, 1, "medyan pompadan ≈ 23 m");
  const D = K.distStats(K.PUMPS[K.BROAD][1], K.PUMPS[K.BROAD][2]); ok(D.within(100 / K.SNOW_UNIT_M) === 227 && D.within(200 / K.SNOW_UNIT_M) === 510, "100 m ve 200 m içinde");
  // Snow (1855): Cambridge St köşesinin 250 yarda çevresinde on günde 500'ü aşkın ölümcül vaka
  ok(D.within(0.9144 * 250 / K.SNOW_UNIT_M) > 500 && K.distStats(K.PUMPS[K.BROAD][1], K.PUMPS[K.BROAD][2]).within(228.6 / 100) < 500, "250 yarda: 54 m'lik birim Snow'la tutarlı, 100 m'lik değil");
  // Snow (1855) metni: 143 → 116 → 54; 8 Eylül 12, 9'u 11, 10'u 5, 11'i 5, 12'si 1; sonra hiçbir gün 4'ü geçmez
  const A = K.EPI.attacks, h = K.EPI.HANDLE;
  ok(A[13] === 143 && A[14] === 116 && A[15] === 54, "Snow: 143, 116, 54");
  ok(A[h] === 12 && A[h + 1] === 11 && A[h + 2] === 5 && A[h + 3] === 5 && A[h + 4] === 1 && Math.max(...A.slice(h + 5)) <= 4, "Snow: 8–12 Eylül ve sonrası");
  ok(K.epiDay(13) === "1 Eylül" && K.epiDay(h) === "8 Eylül" && K.epiDay(0) === "19 Ağustos" && K.epiDay(12) === "31 Ağustos", "takvim");
  const E = K.epiStats(); ok(E.total === 616 && E.deaths === 616 && E.dated === 571, "HistData: 616 ölüm, 45 tarihsiz");
  abs(E.fall, (143 - 28) / 143 * 100, 1e-12, "zirveden düşüş"); ok(E.after === 55, "8 Eylül ve sonrası 55");
  const G = K.grandCheck(), by = (id) => G.find((r) => r.id === id);
  ok(by("sv").houses === 40046 && by("sv").deaths === 1263 && by("sv").printed === 315 && by("lam").houses === 26107 && by("lam").deaths === 98 && by("lam").printed === 37 && by("rest").houses === 256423 && by("rest").deaths === 1422 && by("rest").printed === 59, "Snow 9. tablo");
  ok(by("sv2").deaths === 2353 && by("sv2").printed === 537 && by("lam2").deaths === 302 && by("lam2").printed === 115, "ikinci yedi hafta");
  abs(1263 * 10000 / 40046, by("sv").computed, 1e-9); abs(by("rest").computed, 55.45, 0.01, "geri kalanı 55,5"); abs(by("sv2").computed, 587.57, 0.01, "537 değil 587,6");
  ok(G.filter((r) => !r.ok).map((r) => r.id).join() === "rest,sv2", "yalnız iki uyuşmazlık");
  const ratio = by("sv").computed / by("lam").computed; ok(ratio > 8 && ratio < 9, "Snow: sekiz ile dokuz kat arası");
  assert.throws(() => K.per10k(1, 0)); checks++;
}

/* ── 3 · Nüfus ── */
{
  ok(K.POP_EST.length === 10, "on tahminci");
  ok(K.POP.hyde[1] === 188 && K.POP.biraben[1340] === 443 && K.POP.biraben[1400] === 374 && K.POP.mcevedy[1] === 170 && K.POP.gapminder[1900] === 1645 && K.POP.durand[1500].join() === "440,540" && K.POP.clark[1] === 256 && K.POP.un[1250] === 400, "tablodan örnek değerler");
  ok(K.POP.prb[1650] === undefined, "PRB 1650 üst sınırı alınmamış");
  ok(K.POP_FLAGS.map((f) => f.id + ":" + f.year).join() === "biraben:1700,mcevedy:1700,thomlinson:1700,clark:1700", "tutarlılık denetimi: yalnız 1700'deki dört değer");
  const S1 = K.popStats(K.popAt(1)); ok(S1.n === 10 && S1.min === 170 && S1.max === 330, "MS 1: 170–330"); abs(S1.ratio, 330 / 170, 1e-12);
  const S17 = K.popStats(K.popAt(1700)); ok(S17.n === 4 && S17.min === 603 && S17.max === 679, "1700: işaretliler dışarıda");
  ok(K.popStats(K.popAt(1700, { flagged: true })).n === 8, "1700: işaretlilerle 8");
  ok(K.popAt(1, { enabled: [] }).length === 0 && K.popStats([]) === null, "boş seçim");
  const Gr = K.popGrowth(1, 1500), lo = Math.min(...Gr.map((x) => x.r)), hi = Math.max(...Gr.map((x) => x.r));
  ok(lo > 0.03 && hi < 0.07, "MS 1–1500 büyüme 0,03–0,07 %/yıl (metindeki aralık)");
  const prb = Gr.find((x) => x.id === "prb"); abs(Math.log1p(Math.pow(600 / 300, 1 / 1499) - 1) * 100, prb.r, 1e-9, "bileşik büyümeden sürekli büyüme");
  ok(html.includes("yılda yüzde 0,03 ile 0,07 arasında"), "metin hesapla tutarlı");
  near(K.householdPop(1000, 5, 0), 5000, 1e-12); near(K.householdPop(1000, 5, 20), 6250, 1e-12); near(K.householdPop(1000, 6, 0) / K.householdPop(1000, 4, 0), 1.5, 1e-12);
  assert.throws(() => K.householdPop(1000, 5, 100)); checks++;
  ok(html.includes("3 377 307") || html.includes("3 377 307"), "1831 sayımı");
}

/* ── 4 · Kaynak eleştirisi ── */
{
  ok(K.SRC_Q.length === 3 && K.SRC_Q.every((q) => q.cards.length === 4 && q.cards.every((c) => K.SRC_TYPES[c.type] && K.SRC_WEIGHTS[c.weight] && c.why.length > 60)), "üç soru, dörder kart");
  for (const q of K.SRC_Q) {
    const all = Object.fromEntries(q.cards.map((c) => [c.id, { type: c.type, weight: c.weight }]));
    const S = K.srcScore(q.id, all); ok(S.correct === 8 && S.total === 8 && S.complete, "tam puan " + q.id);
    ok(K.srcScore(q.id, {}).complete === false && K.srcScore(q.id, {}).correct === 0, "boş yanıt " + q.id);
  }
  ok(new Set(K.SRC_Q.flatMap((q) => q.cards.map((c) => c.type))).size === 3, "üç kaynak türü de kullanılıyor");
  assert.throws(() => K.srcScore("yok", {})); checks++;
}
console.log(`G ${SLUG}: ${checks} bağımsız çekirdek kontrolü PASS`);

/* ── Tarayıcı ── */
if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let browser; const before = checks;
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
      const read = async (id) => (await page.locator("#" + id).textContent()).replace(/ /g, " ");
      const has = async (id, s) => { const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !e.closest("label") && !document.querySelector(`label[for="${e.id}"]`) && !e.getAttribute("aria-label")).map((e) => e.id));
      ok(unlabeled.length === 0, "etiketsiz denetim: " + unlabeled.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll("input[type=range]")].every((e) => { const st = +e.step, v = +e.defaultValue; return Math.abs((v - +e.min) / st - Math.round((v - +e.min) / st)) < 1e-6; })), "varsayılanlar adımda");
      // 1
      await has("minWhere", "Moscou"); await has("minN", "100 000"); await has("minPct", "23,7 %"); await has("minCum", "240 000"); await has("minStatus", "yüzde 23,7");
      ok((await read("minChecks")).includes("?") && !(await read("minChecks")).includes("422 000 ="), "denetimler önce gizli");
      await page.click("#minRun"); await has("minChecks", "340 000 + 60 000 + 22 000 = 422 000"); await has("minChecks", "12 000 → Smorgoni"); await has("minChecks", "2,37 %");
      await page.click("#minPreEnd"); await has("minN", "4000"); await has("minStatus", "10 000"); await has("minT", "−26 °R");
      await sel("minUnit", "C"); await has("minT", "−32,5 °C");
      await page.click("#minPreBer"); await has("minWhere", "Studienska"); await has("minStatus", "28 000");
      await range("minPt", 31); await has("minLoss", "+2000 (artış)"); await has("minStatus", "Geri çekilen bir ordu");
      await page.click("#minPreStart"); await has("minN", "340 000"); await has("minLoss", "—");
      await page.fill("#minGuess", "20"); await page.click("#minGuessBtn"); await has("minGuessOut", "tutmuyor");
      await page.fill("#minGuess", "24"); await page.click("#minGuessBtn"); await has("minGuessOut", "Doğru");
      await page.uncheck("#minLWidth"); await has("minMapCap", "Bant genişliği kapalı");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("minN", "100 000"); ok(await page.locator("#minLWidth").isChecked(), "R sıfırlar (1)"); await has("minGuessOut", "");
      // klavye
      await page.locator("#tab-min").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-src").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-snow").getAttribute("aria-selected")) === "true", "ArrowRight");
      await page.keyboard.press("ArrowLeft"); await page.keyboard.press("ArrowLeft"); ok((await page.locator("#tab-src").getAttribute("aria-selected")) === "true", "ArrowLeft sarar");
      // 2
      await page.click("#tab-snow"); await has("snowNear", "359"); await has("snowNearE", "62,1 %"); await has("snowShare", "8,6 %"); await has("snowRatio", "7,22 kat");
      await page.click("#snowBest"); await has("snowToPump", "≈ 23 m"); await has("snowStatus", "≈ 23 m"); await has("snowMean", "≈ 122 m");
      await page.click("#snowToBroad"); await has("snowToPump", "≈ 0 m"); await has("snowR1", "227"); await has("snowR1E", "200 m içinde 510"); await has("snowMean", "≈ 123 m"); await has("snowMeanE", "ortanca ≈ 117 m");
      await sel("snowPump", "0"); await has("snowNear", "0"); await has("snowRatioE", "seyrek");
      await page.check("#snowCells"); await page.check("#snowColor"); await has("snowMapCap", "Voronoi");
      await page.locator("#snowMap").scrollIntoViewIfNeeded(); const box = await page.locator("#snowMap").boundingBox();
      await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.2); await page.mouse.down(); await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.25); await page.mouse.up();
      ok(+(await page.locator("#snowX").inputValue()) < 8, "fareyle sürükleme işareti taşır");
      await has("snowPeak", "143"); await has("snowFall", "80,4 %"); await has("snowAfter", "55");
      await sel("snowGuess", "10"); await has("snowGuessOut", "Gerçek düşüş 80 %"); await sel("snowGuess", "80"); await has("snowGuessOut", "Doğru tahmin");
      ok((await read("snowGrandRows")).includes("?"), "oranlar önce gizli");
      await page.click("#snowGrand"); await has("snowGrandRows", "55,5"); await has("snowGrandRows", "587,6"); await has("snowGrandStatus", "8,4 kat");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("snowNear", "359"); ok((await read("snowGrandRows")).includes("?") && !(await page.locator("#snowCells").isChecked()), "R sıfırlar (2)");
      // 3
      await page.click("#tab-pop"); await has("popN", "10"); await has("popMin", "170 milyon"); await has("popMax", "330 milyon"); await has("popRatio", "1,94"); await has("popGrowth", "0,034 – 0,066 % / yıl");
      ok((await page.locator("#popFlagRows tr").count()) === 4, "dört işaretli satır");
      await sel("popYear", "1700"); await has("popN", "4"); await page.check("#popFlag"); await has("popN", "8"); await has("popStatus", "tutarsız");
      await sel("popYear", "1340"); await page.uncheck("#pop-biraben"); await page.uncheck("#pop-gapminder"); await has("popN", "1"); await has("popStatus", "yalnız bir tahmin");
      await page.uncheck("#pop-clark"); await has("popStatus", "hiçbiri"); await sel("popScale", "lin");
      await has("mulPop", "5000 kişi"); await range("mulMiss", 20); await has("mulPop", "6250 kişi"); await has("mulRange", "5000 – 7500");
      await page.fill("#mulUnits", "abc"); await has("mulPop", "—"); await page.fill("#mulUnits", "2000"); await range("mulMult", 7); await has("mulPop", "17 500 kişi");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("popN", "10"); await has("mulPop", "5000 kişi"); ok(await page.locator("#pop-clark").isChecked(), "R sıfırlar (3)");
      // 4
      await page.click("#tab-src"); await page.click("#srcCheck"); await has("srcStatus", "Önce");
      for (const [c, t, w] of [["a", "p", "h"], ["b", "p", "h"], ["c", "t", "l"], ["d", "p", "l"]]) { await sel("srcT-" + c, t); await sel("srcW-" + c, w); }
      await page.click("#srcCheck"); await has("srcStatus", "8 seçimin 8'i"); ok(await page.locator("#srcV-c").isVisible(), "gerekçe görünür"); await has("srcV-c", "apokrif");
      await sel("srcQ", "army"); ok(await page.locator("#srcV-a").isHidden(), "soru değişince sıfır");
      for (const c of ["a", "b", "c", "d"]) { await sel("srcT-" + c, "p"); await sel("srcW-" + c, "h"); }
      await page.click("#srcCheck"); await has("srcStatus", "8 seçimin 1'i"); await has("srcV-d", "1812");
      await page.locator("h1").click(); await page.keyboard.press("r"); ok((await page.locator("#srcQ").inputValue()) === "pump", "R sıfırlar (4)");
      ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      ok(await page.evaluate(() => Object.isFrozen(TarihVeri) && !Object.getOwnPropertyDescriptor(window, "TarihVeri").writable), "çekirdek salt okunur");
      // Keşif Defteri yüklenir ve görünür (404 hoşgörüsü yok)
      await page.waitForSelector(".digest", { state: "attached", timeout: 15000 }); await page.locator(".digest").scrollIntoViewIfNeeded();
      ok(await page.locator(".digest").isVisible(), "Keşif Defteri görünür");
      ok((await page.locator(".digest").textContent()).includes("54 m"), "defter birimi 54 m");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
