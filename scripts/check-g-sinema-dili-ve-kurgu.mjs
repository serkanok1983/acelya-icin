// G · sinema-dili-ve-kurgu.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// makara süresi için "24 kare/s'de 90 ft/dk" bağıntısı (Wikipedia, 35 mm movie film), teker yanılsaması için
// karelerin kaba kuvvetle örneklenip en yakın kolun aranması, topun adımı için ince ızgarada tarama, görüş açısı
// için Wikipedia'nın 50 mm tablo değerleri, netlik sınırları için bulanıklık dairesinin ikiye bölmeyle kökü ve
// yaklaşık formül 2u²Nc/f², kadraj için ışın–düzlem kesişimi, 180° kuralı için kişilerin ekrandaki sırasının
// doğrudan döndürülmüş koordinatlarla hesabı, kurgu istatistikleri için bağımsız sıralama, FSEK 26–27. md. ile
// ABD 95 yıl kuralından elle yazılmış beklenen tablo.
// Kullanım: node scripts/check-g-sinema-dili-ve-kurgu.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "sinema-dili-ve-kurgu";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.CinemaLab;
let checks = 0;
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
let seed = 7; const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const D2R = Math.PI / 180;

/* ── Kabuk ── */
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(!/fonts\.googleapis|cdn\.|<script src="https?:/.test(html), "dış betik yok");
ok(!/<(iframe|video|img|embed|object)\b/i.test(html), "gömülü görüntü ya da film yok");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Sinema Dili ve Kurgu: ") && title.length <= 80, "başlık " + title.length);
ok(/<body class="app-page" data-page="sinema-dili-ve-kurgu">/.test(html) && /<meta name="description" content="[^"]{60,}"/.test(html), "kabuk ve açıklama");
ok(/<link rel="stylesheet" href="shared\/theme\.css">/.test(html) && /<script src="shared\/app\.js"><\/script>/.test(html), "theme.css ve app.js");
ok(/viewport-fit=cover/.test(html) && /<html lang="tr" class="app-root">/.test(html), "viewport ve kök");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(html), "emoji yok");
ok(!/body\s*\{[^}]*overflow\s*:\s*hidden/.test(html) && !/type="number"/.test(html), "overflow:hidden ve type=number yok");
for (const l of ["perspektif-ve-simetri", "mercek-isinlari", "algi-psikolojisi", "anlati-yapisi-ve-edebiyat-cozumlemesi"]) ok(html.includes(`href="${l}.html"`), "komşu bağlantı " + l);
for (const l of ["perspektif-ve-simetri", "mercek-isinlari", "algi-psikolojisi"]) ok(fs.existsSync(new URL(`../${l}.html`, import.meta.url)), "komşu sayfa var " + l);
ok(/AcelyaTouch\?\.guard\(c, \(x, y\) => ctHitIdx/.test(html) && /AcelyaTouch\?\.guard\(c, \(x, y\) => edHit/.test(html), "sürüklenen tuvallerde dokunma koruması");
// Dış bağlantılar yalnız izinli arşiv alanına ve yalnız kamu malı filmlere
const ext = [...html.matchAll(/href="(https?:[^"]+)"/g)].map((m) => m[1]);
ok(ext.length === 4 && ext.every((u) => u.startsWith("https://archive.org/details/")), "dış bağlantılar yalnız archive.org: " + ext.join(" "));
ok(!/Potyomkin|Potemkin/.test(ext.join(" ")) && !/keaton|birth.?of.?a.?nation/i.test(ext.join(" ")), "korunan filmlere bağlantı yok");

/* ── 1 · Kare hızı ── */
{
  for (const [ft, fps, sec] of [[845, 24, 845 / 90 * 60], [740, 18, 740 * 16 / 18], [1000, 24, 1000 / 90 * 60], [90, 24, 60]]) abs(K.runtime(ft, fps).seconds, sec, 1e-9, `makara ${ft}`);
  abs(K.runtime(845, 24).seconds / 60, 9.39, 0.01, "Wikipedia: 24'te yaklaşık 9 dk"); ok(K.runtime(845, 13).seconds / 60 > 16.5 && K.runtime(845, 12).seconds / 60 < 19, "12–14'te yaklaşık 17 dk");
  abs(K.runtime(100, 24).metres, 30.48, 1e-9, "ft → m");
  assert.throws(() => K.runtime(0, 24)); assert.throws(() => K.runtime(100, 0)); checks += 2;
  for (const [fps, bl, hz] of [[24, 2, 48], [24, 3, 72], [16, 3, 48], [18, 1, 18]]) { const P = K.projection(fps, bl); abs(P.flashHz, hz, 1e-12, "çakma"); abs(P.frameMs * fps, 1000, 1e-9); }
  ok(K.fusionBand(24) === "low" && K.fusionBand(48) === "mid" && K.fusionBand(72) === "mid" && K.fusionBand(96) === "high", "titreşim bantları");
  abs(K.exposure(24, 180), 1 / 48, 1e-15, "180° = 1/48 s");
  // teker: kaba kuvvet — kare k'de kol açıları; ardışık iki karede bir kolun en kısa yer değiştirmesi
  for (let t = 0; t < 4000; t++) {
    const fps = 1 + Math.floor(60 * rnd()), n = 2 + Math.floor(11 * rnd()), rev = Math.round(48 * rnd()) / 4, W = K.wheelAlias(rev, n, fps);
    const a0 = 0, a1 = 360 * rev / fps;
    let best = Infinity; for (let j = -n * 30; j <= n * 30; j++) { const d = a1 + j * 360 / n - a0; if (Math.abs(d) < Math.abs(best) - 1e-9) best = d; }
    abs(Math.abs(W.alias), Math.abs(best), 1e-9, "en yakın kol");
    if (!W.ambiguous) abs(W.alias, best, 1e-9, "yön");
    abs(W.apparent, W.alias / 360 * fps, 1e-12);
  }
  ok(K.wheelAlias(3, 8, 24).kind === "still" && K.wheelAlias(1, 8, 24).kind === "true" && K.wheelAlias(2, 8, 24).kind === "backward" && K.wheelAlias(3.5, 8, 24).kind === "slow", "teker türleri");
  abs(K.wheelAlias(2, 8, 24).apparent, -1, 1e-12, "2 tur/s, 8 kol, 24: −1 tur/s");
  ok(K.wheelAlias(1.5, 8, 24).ambiguous, "yarım aralık belirsiz");
  // top: ince ızgarada en büyük adım
  for (const fps of [1, 2, 5, 12, 16, 24, 48, 60]) { let m = 0; for (let i = 0; i <= 20000; i++) { const t = 2 * i / 20000; m = Math.max(m, Math.abs(K.ballX(t + 1 / fps) - K.ballX(t))); } abs(K.ballMaxStep(fps), m, 1e-6, "top adımı " + fps); }
  for (const fps of [7, 24, 60]) for (let i = 0; i < 200; i++) { const t = 10 * rnd(), s = K.sampleTime(t, fps); ok(s <= t + 1e-12 && t - s < 1 / fps + 1e-12 && Math.abs(s * fps - Math.round(s * fps)) < 1e-9, "örnekleme"); }
}

/* ── 2 · Sanal kamera ── */
{
  abs(K.aov(50), 39.6, 0.05, "50 mm yatay"); abs(K.aov(50, 24), 27.0, 0.05, "dikey"); abs(K.aov(50, 43.3), 46.8, 0.05, "köşegen"); abs(K.aov(50, 22.2), 25.0, 0.05, "APS-C");
  for (let t = 0; t < 600; t++) {
    const f = 14 + 186 * rnd(), s = 0.8 + 39 * rnd(), camH = 0.2 + 4.8 * rnd(), aspect = [1.19, 1.33, 1.375, 1.85, 2.39][t % 5];
    const F = K.framing({ f, s, camH, aspect }); if (F.clamped) continue;
    const sh = 36 / aspect, p = F.pitch * D2R;
    // başın tepesi ekranda nerede? ışın açısı − eğim, f'ye izdüşüm
    const vTop = f * Math.tan(Math.atan((1.75 - camH) / s) - p), vMid = f * Math.tan(Math.atan((0.875 - camH) / s) - p);
    if (F.rule === "head") abs(vTop, (0.5 - 0.08) * sh, 1e-9, "baş boşluğu %8"); else abs(vMid, 0, 1e-9, "kişinin ortası merkezde");
    ok(vTop <= (0.5 - 0.08) * sh + 1e-9, "baş kadrajın içinde ya da boşluk payında");
    // alt kenar ışını kişinin düzlemini nerede keser?
    const lo = p - Math.atan(sh / 2 / f);
    if (lo > -89 * D2R) { const yb = camH + s * Math.tan(lo); abs(F.yBottom, yb, 1e-9, "alt kenar"); abs(F.bottomFrac, (1.75 - yb) / 1.75, 1e-9); }
  }
  const F0 = K.framing({ f: 50, s: 4, camH: 1.6, aspect: 1.85 });
  ok(K.shotScale(F0.bottomFrac).name === "Amerikan plan", "varsayılan Amerikan plan"); abs(F0.pitch, -7.1359, 1e-3, "varsayılan eğim");
  ok(K.shotScale(K.framing({ f: 24, s: 30, camH: 1.6, aspect: 1.85 }).bottomFrac).key === "els", "çok uzak plan");
  ok(K.shotScale(K.framing({ f: 85, s: 2.4, camH: 1.6, aspect: 1.85 }).bottomFrac).key === "cu", "yakın plan");
  for (let i = 0; i + 1 < K.SCALES.length; i++) ok(K.SCALES[i].max < K.SCALES[i + 1].max, "eşikler artan");
  ok(K.angleClass(K.eyeAngle(0.3, 3), 0).name === "Alçak açı" && K.angleClass(K.eyeAngle(1.6, 4), 0).name === "Göz hizası" && K.angleClass(K.eyeAngle(5, 2), 0).name === "Kuşbakışı" && K.angleClass(0, 12).dutch && !K.angleClass(0, 4).dutch, "açı sınıfları");
  // netlik alanı: bulanıklık dairesi = c köklerini ikiye bölmeyle bul
  const root = (g, a, b) => { for (let i = 0; i < 200; i++) { const m = (a + b) / 2; if ((g(a) > 0) === (g(m) > 0)) a = m; else b = m; } return (a + b) / 2; };
  for (let t = 0; t < 400; t++) {
    const f = 14 + 186 * rnd(), N = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16][t % 8], s = 0.8 + 59 * rnd(), D = K.dof(f, N, s);
    const g = (x) => K.blurCircle(f, N, s, x) - K.COC;
    abs(D.near, root(g, f / 1000 * 1.0001, s), 1e-6 * s, "yakın sınır");
    if (Number.isFinite(D.far)) abs(D.far, root(g, s, 1e7), 1e-6 * D.far, "uzak sınır"); else ok(g(1e9) < 0, "uzak sınır sonsuz");
    // bulanıklık dairesini ışın çizimiyle bağımsız hesapla: x'teki noktanın görüntüsü v = fx/(x−f); algılayıcı s'nin görüntüsünde
    const vs = f * s * 1000 / (s * 1000 - f), x = s * (0.3 + 2 * rnd()), vx = f * x * 1000 / (x * 1000 - f), b = (f / N) * Math.abs(vx - vs) / vx;
    abs(K.blurCircle(f, N, s, x), b, 1e-9 * (1 + b), "ışın çizimi ile bulanıklık");
    if (s < D.H / 10 && s * 1000 > 20 * f) abs(D.depth, 2 * (s * 1000) ** 2 * N * K.COC / f ** 2 / 1000, 0.06 * D.depth, "yaklaşık 2u²Nc/f² (u ≫ f, u ≪ H)");
  }
  const D0 = K.dof(50, 2.8, 4); abs(D0.near, 3.6017, 1e-4); abs(D0.far, 4.4974, 1e-4); abs(D0.H, 35.7643, 1e-4, "varsayılan netlik");
  abs(K.blurCircle(50, 2.8, 4, 19), 0.17845, 1e-5, "15 m gerideki ağaç");
  for (const [r, mode, used] of [[1.85, "letterbox", (16 / 9) / 1.85], [2.39, "letterbox", (16 / 9) / 2.39], [1.375, "pillarbox", 1.375 / (16 / 9)], [16 / 9, "full", 1]]) { const F = K.fitScreen(r); ok(F.mode === mode, "gösterim " + r); abs(F.used, used, 1e-12); abs(F.lost, 1 - used, 1e-12); }
  abs(K.keepFraming(4, 50, 100), 8, 1e-12, "kadrajı koru");
}

/* ── 3 · Süreklilik ── */
{
  // bağımsız: kamera koordinatına döndürme
  const screen = (C, T, P) => { const a = Math.atan2(T[1] - C[1], T[0] - C[0]); const dx = P[0] - C[0], dy = P[1] - C[1]; const fwd = dx * Math.cos(a) + dy * Math.sin(a), left = -dx * Math.sin(a) + dy * Math.cos(a); return { x: -left / fwd / Math.tan(30 * D2R), depth: fwd }; };
  for (let t = 0; t < 3000; t++) {
    const th = 360 * rnd(), d = 0.8 + 7.2 * rnd(), aim = ["A", "B", "M"][t % 3], C = K.camPos(th, d), T = K.aimPoint(aim);
    for (const P of [K.SCENE.A, K.SCENE.B]) { const v = K.viewOf(C, T, P), w = screen(C, T, P); if (w.depth > 0.05) { abs(v.x, w.x, 1e-9, "ekran x"); abs(v.depth, w.depth, 1e-9); ok(v.visible === Math.abs(w.x) <= 1, "görünürlük"); } }
    const side = K.sideOfAxis(C);
    if (aim === "M" && side !== 0) {
      const a = screen(C, T, K.SCENE.A), b = screen(C, T, K.SCENE.B);
      if (a.depth > 0.05 && b.depth > 0.05) ok((b.x > a.x) === (side < 0), "çizginin altında A solda, üstünde sağda");
      // aynalanan kamera sırayı ters çevirir
      const Cm = [C[0], -C[1]], a2 = screen(Cm, T, K.SCENE.A), b2 = screen(Cm, T, K.SCENE.B);
      if (a2.depth > 0.05 && b2.depth > 0.05 && a.depth > 0.05 && b.depth > 0.05) ok(Math.sign(b.x - a.x) === -Math.sign(b2.x - a2.x), "aynalama sırayı çevirir");
    }
    if (Math.abs(C[1]) < 0.15) ok(side === 0, "çizgi üzerinde");
  }
  const R = K.cutCheck({ theta: 200, d: 2.2, aim: "B" }, { theta: 340, d: 2.2, aim: "A" });
  ok(!R.crossed && !R.neutral && R.sh1.order === 1 && R.sh2.order === 1 && R.sh1.gazeA === 1 && R.sh2.gazeB === -1 && !R.sameTarget && !R.jump, "varsayılan karşılıklı çekim");
  abs(R.angle, 140, 0.5, "ortadan bakınca açı");
  const X = K.cutCheck({ theta: 200, d: 2.2, aim: "B" }, { theta: 20, d: 2.2, aim: "A" });
  ok(X.crossed && X.sh2.order === -1, "çizgiyi aşmak sırayı çevirir");
  const J = K.cutCheck({ theta: 260, d: 3.5, aim: "M" }, { theta: 280, d: 3.5, aim: "M" });
  ok(J.jump && Math.abs(J.angle - 20) < 1e-9, "30°'den az: atlama");
  ok(!K.cutCheck({ theta: 260, d: 3.5, aim: "M" }, { theta: 300, d: 3.5, aim: "M" }).jump && !K.cutCheck({ theta: 260, d: 2, aim: "M" }, { theta: 270, d: 6, aim: "M" }).jump, "30° üstü ya da ölçek farkı");
  ok(K.cutCheck({ theta: 200, d: 2.2, aim: "B" }, { theta: 0, d: 3, aim: "A" }).neutral, "çizgi üzerinde nötr");
}

/* ── 4 · Kurgu ── */
{
  for (let t = 0; t < 1500; t++) {
    const n = 2 + Math.floor(59 * rnd()), T = 20 + 5 * Math.floor(33 * rnd()), mode = ["even", "accel", "decel", "metric", "free"][t % 5], cuts = K.makeCuts(n, T, mode, 1 + t);
    ok(cuts.length === n - 1, "kesme sayısı");
    const L = K.lengthsFrom(cuts, T);
    abs(L.reduce((a, b) => a + b, 0), T, 1e-9, "toplam");
    ok(cuts.every((c) => Math.abs(c * 24 - Math.round(c * 24)) < 1e-6), "kare sınırı"); ok(L.every((l) => l >= 2 / 24 - 1e-9), "en az iki kare");
    const S = K.shotStats(L), srt = [...L].sort((a, b) => a - b), med = n % 2 ? srt[(n - 1) / 2] : (srt[n / 2 - 1] + srt[n / 2]) / 2;
    abs(S.asl, T / n, 1e-9, "OPS"); abs(S.median, med, 1e-12, "ortanca"); abs(S.cpm, (n - 1) * 60 / T, 1e-9, "dakikada kesme");
    let v = 0; for (const l of L) v += (l - T / n) ** 2; abs(S.cv, Math.sqrt(v / n) / (T / n), 1e-9, "değişkenlik");
    if (mode === "even" && T * 24 % n === 0) ok(S.cv < 1e-9, "eşit planlar");
    if (mode === "accel" && n >= 6) ok(S.second < S.first, "hızlanan"); if (mode === "decel" && n >= 6) ok(S.second > S.first, "yavaşlayan");
  }
  ok(JSON.stringify(K.makeCuts(12, 60, "free", 5)) === JSON.stringify(K.makeCuts(12, 60, "free", 5)), "tohum yinelenebilir");
  const c = K.makeCuts(12, 60, "even"); ok(c.join() === "5,10,15,20,25,30,35,40,45,50,55", "eşit kesmeler");
  const m = K.moveCut(c, 0, 9.9, 60); abs(m[0], 10 - 2 / 24, 1e-12, "komşuya iki kareden fazla yaklaşmaz");
  abs(K.moveCut(c, 0, -3, 60)[0], 2 / 24, 1e-12, "başa sıkışma"); abs(K.moveCut(c, 3, 21.01, 60)[3], 21, 1e-12, "kareye oturur");
  ok(K.addCut(c, 7.5, 60).length === 12 && K.addCut(c, 5.04, 60) === null, "imleçte kes");
  const mist = K.BENCH.find((b) => b.key === "mist"); abs(mist.asl, 5.4, 0.05, "The Mist 5,4 s");
  abs(K.BENCH.find((b) => b.key === "vertov").asl, 2.3, 0.05, "Kameralı Adam ~2,3 s"); abs(K.BENCH.find((b) => b.key === "ark").asl, 5760, 1e-9, "Rus Gemisi");
}

/* ── 5 · Hak hesabı (FSEK 26–27: ölümü izleyen yılın 1 Ocak'ından 70 yıl; ABD: yayımdan 95 yıl) ── */
{
  const expect = { lumiere: [2019, true, true, true], melies: [2009, true, true, true], porter: [2012, true, true, true], vertov: [2025, true, true, true], potemkin: [2045, false, true, false], keaton: [2037, false, true, false], uzkinay: [2027, false, true, false], ertugrul: [2050, false, true, false] };
  for (const w of K.WORKS) {
    if (w.key === "custom") continue;
    const R = K.pdStatus({ pub: w.pub, death: w.death }), e = expect[w.key];
    ok(R.trFree === e[0] && R.tr === e[1] && R.us === e[2] && R.pageOk === e[3], "hak " + w.key + " " + JSON.stringify(R));
  }
  ok(K.pdStatus({ pub: 1930, death: 1940 }).us && !K.pdStatus({ pub: 1931, death: 1940 }).us, "ABD sınırı 1930");
  ok(K.pdStatus({ pub: 1920, death: 1955 }).tr && !K.pdStatus({ pub: 1920, death: 1956 }).tr, "Türkiye sınırı: 1955 ölüm → 2026");
  ok(!K.pdStatus({ pub: 1900, death: null }).tr && K.pdStatus({ pub: 1900, death: null }).trFree === null, "yaşayan sahip");
  // sayfada bağlantı verilen dört film çekirdekteki hesapla kamu malı
  for (const k of ["lumiere", "melies", "porter", "vertov"]) { const w = K.WORKS.find((x) => x.key === k); ok(K.pdStatus(w).pageOk && w.death < 1956 && w.pub <= 1930, "bağlantı dayanağı " + k); }
}
/* ── Sayılara Türkçe ek (çekirdek dışındaki yardımcı): 1800–2100 yılları ve yüzdeler, elle yazılmış okunuş tablosuyla ── */
{
  const code = html.slice(html.indexOf("/* ── Sayılara Türkçe ek"), html.indexOf("const deg = (x, d = 0)"));
  const { suf } = new Function(code + "; return { suf };")();
  const one = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"], ten = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
  const last = (n) => (n % 10 ? one[n % 10] : n % 100 ? ten[(n % 100) / 10] : n % 1000 ? "yüz" : "bin");
  const ABL = { bir: "den", iki: "den", "üç": "ten", "dört": "ten", "beş": "ten", "altı": "dan", yedi: "den", sekiz: "den", dokuz: "dan", on: "dan", yirmi: "den", otuz: "dan", "kırk": "tan", elli: "den", "altmış": "tan", "yetmiş": "ten", seksen: "den", doksan: "dan", "yüz": "den", bin: "den" };
  const POSS = { bir: "i", iki: "si", "üç": "ü", "dört": "ü", "beş": "i", "altı": "sı", yedi: "si", sekiz: "i", dokuz: "u", on: "u", yirmi: "si", otuz: "u", "kırk": "ı", elli: "si", "altmış": "ı", "yetmiş": "i", seksen: "i", doksan: "ı", "yüz": "ü", bin: "i" };
  for (let y = 1800; y <= 2100; y++) { const w = last(y); ok(suf(String(y), "den") === "'" + ABL[w], "ayrılma eki " + y); ok(suf(String(y), "de") === "'" + ABL[w].slice(0, 2), "bulunma eki " + y); }
  for (let i = 1; i <= 1000; i++) { const s = (i / 10).toFixed(1).replace(".", ",") + " %", w = i % 10 ? one[i % 10] : last(i / 10); ok(suf(s, "i") === "'" + POSS[w], "iyelik eki " + s); }
  ok(suf("2019", "den") === "'dan" && suf("2009", "den") === "'dan" && suf("2045", "de") === "'te" && suf("83 %", "i") === "'ü", "yazarın örnekleri");
}
console.log(`G ${SLUG}: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

/* ── Tarayıcı ── */
if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const { canvasInkAll, assertCanvasDrawn } = await import("./lib/canvas-check.mjs");
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
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const settle = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const pressR = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); await settle(); };
      const drawn = async (tab) => { for (const st of await canvasInkAll(page, `#panel-${tab} canvas`)) assertCanvasDrawn(st, { minInk: 300, minDistinct: 3, label: tab + " " + st.id }); checks++; };
      const noNaN = async (tab) => ok(!(await page.locator("#panel-" + tab).textContent()).includes("NaN"), "NaN yok " + tab);
      const u = await page.evaluate(() => [...document.querySelectorAll("main input, main select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label")).map((e) => e.id));
      ok(u.length === 0, "etiketsiz denetim: " + u.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-6; })), "varsayılanlar adım ızgarasında");
      ok(await page.evaluate(() => Object.isFrozen(CinemaLab) && !Object.getOwnPropertyDescriptor(window, "CinemaLab").writable), "çekirdek salt okunur");
      // 1
      await has("frGap", "41,67 ms"); await has("frGapE", "pozlama 20,83 ms"); await has("frFlash", "48 Hz"); await has("frFlashE", "48–80 Hz"); await has("frStep", "5,2 %"); await has("frWheel", "15,0°"); await has("frWheelApp", "1,00 tur/s · gerçek hızıyla ileri"); await has("frRun", "9 dk 23 s"); await has("frRunE", "13\u202F520 kare");
      await page.click("#frSilent"); await settle(); await has("frFlash", "48 Hz"); await has("frRun", "14 dk 5 s"); await has("frBladesOut", "3 kanat"); await has("frWheelApp", "1,00 tur/s · yön belirsiz"); await has("frStatus", "tam yarısı"); await has("frStatus", "48 ışık çakması");
      await page.click("#frStill"); await settle(); await has("frWheelApp", "duruyor görünür"); await has("frStatus", "durmuş görünür");
      await range("frRev", 2); await settle(); await has("frWheelApp", "1,00 tur/s · geri dönüyor görünür"); await has("frStatus", "geri dönüyor");
      await range("frRev", 1.5); await settle(); await has("frWheelAppE", "yön belirsizdir"); await has("frWheelApp", "yön belirsiz"); ok(!(await read("frWheelApp")).includes("geri"), "yarım aralıkta ana okuma yön adı vermez");
      await range("frFps", 8); await settle(); await has("frStatus", "kesik kesik"); await has("frFlashE", "altında");
      await sel("frReel", "740"); await range("frFps", 18); await settle(); await has("frRun", "10 dk 58 s");
      await range("frFps", 60); await range("frBlades", 2); await settle(); await has("frFlash", "120 Hz"); await has("frFlashE", "80 Hz üstü");
      await range("frShutter", 0); await settle(); await has("frGapE", "anlık"); await range("frFps", 1); await range("frRev", 12); await range("frSpokes", 2); await settle(); await noNaN("fr");
      await page.click("#frPlay"); await page.waitForTimeout(250); await has("frPlay", "Durdur"); await page.click("#frPlay"); await has("frPlay", "Oynat");
      await pressR(); await has("frRun", "9 dk 23 s"); await has("frWheel", "15,0°"); ok((await page.locator("#frFps").inputValue()) === "24", "R sıfırlar (1)");
      await page.click("#phiPlay"); await page.waitForTimeout(300); await has("phiPlay", "Durdur");
      await range("phiIsi", 200); await sel("phiSeen", "beta"); await page.click("#phiLog"); await has("phiList", "100 ms + 200 ms boşluk: bir ışık gidip geliyor"); await has("phiOut", "300 ms");
      await page.click("#phiReset"); ok((await page.locator("#phiList li").count()) === 0, "phi sıfırlandı"); await has("phiPlay", "Başlat");
      await drawn("fr");
      // sekme klavyesi
      await page.locator("#tab-fr").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-hi").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-cm").getAttribute("aria-selected")) === "true", "ArrowRight"); await settle();
      // 2
      await has("cmScale", "Amerikan plan"); await has("cmAngle", "Göz hizası"); await has("cmAov", "39,6°"); await has("cmAovE", "dikey 22,0°"); await has("cmDof", "3,60 m – 4,50 m"); await has("cmDofE", "hiperfokal 35,76 m"); await has("cmBlur", "0,178 mm"); await has("cmBlurE", "7,1 katı"); await has("cmFit", "96,1 %'i kullanılıyor"); await has("cmScaleE", "83 %'ü kadar");
      await page.click("#cmP1"); await settle(); await has("cmScale", "Çok uzak plan"); await has("cmDof", "sonsuz");
      await page.click("#cmP2"); await settle(); await has("cmScale", "Yakın plan");
      await page.click("#cmP3"); await settle(); await has("cmAngle", "Alçak açı");
      await page.click("#cmP4"); await settle(); await has("cmStatus", "belirgin biçimde bulanık"); await has("cmAovE", "tele");
      await range("cmRoll", 15); await settle(); await has("cmAngle", "eğik");
      await page.uncheck("#cmFocusLock"); await range("cmFocus", 30); await settle(); ok(!(await page.locator("#cmFocus").isDisabled()), "netlik kaydırıcısı açık");
      await sel("cmAspect", "2.39"); await settle(); await has("cmFit", "74,4 %"); await sel("cmFitMode", "crop"); await settle(); await has("cmFit", "25,6 %'sı kırpılıyor"); await has("cmFitE", "sağdan ve soldan");
      await sel("cmAspect", "1.375"); await settle(); await has("cmFitE", "üstten ve alttan"); await sel("cmFitMode", "box"); await settle(); await has("cmFit", "77,3 %'ü kullanılıyor");
      await range("cmH", 5); await range("cmS", 0.8); await range("cmF", 14); await settle(); await has("cmAngle", "Kuşbakışı"); await noNaN("cm");
      await pressR(); await has("cmScale", "Amerikan plan"); ok(await page.locator("#cmFocus").isDisabled(), "R sıfırlar (2)");
      await page.check("#cmKeep"); await range("cmF", 100); await settle(); ok((await page.locator("#cmS").inputValue()) === "8", "kadrajı koru: 100 mm → 8 m"); await has("cmScale", "Amerikan plan"); await has("cmStatus", "Kadraj korunuyor");
      await page.click("#cmReset"); await has("cmSOut", "4,0 m");
      await drawn("cm");
      // 3
      await page.click("#tab-ct"); await settle();
      await has("ctRule", "Korunuyor"); await has("ctS1", "A solda · B ortada"); await has("ctS2", "A ortada · B sağda"); await has("ctEye", "Uyumlu"); await has("ct30", "Uygulanmaz"); await has("ctAng", "140,"); await has("ctStatus", "kuralına uyuyor");
      await page.click("#ctP2"); await settle(); await has("ctRule", "Çizgi aşıldı"); await has("ctS2E", "A, B'nin sağında"); await has("ctEye", "Bozuluyor"); await has("ctStatus", "aşıyor");
      await page.click("#ctP3"); await settle(); await has("ct30", "Atlama kesmesi riski"); await has("ctAng", "20,0°");
      await page.click("#ctP4"); await settle(); await has("ctRule", "çizginin üzerinde");
      await range("ct1d", 0.8); await range("ct1a", 0); await sel("ct1t", "A"); await settle(); await noNaN("ct");
      await pressR(); await has("ctRule", "Korunuyor"); ok((await page.locator("#ct1a").inputValue()) === "200", "R sıfırlar (3)");
      // sürükleme: Kamera 2'yi çizginin üstüne taşı
      await page.locator("#ctStage").scrollIntoViewIfNeeded(); await settle();
      const bx = await page.locator("#ctStage").boundingBox();
      const pos = await page.evaluate(() => { const c = document.getElementById("ctStage"), r = c.getBoundingClientRect(), K = CinemaLab, half = r.width < 520 ? 4.6 : 5.6, sc = Math.min(r.width, r.height * 1.6) / (2 * half), C = K.camPos(340, 2.2); return { x: r.width / 2 + sc * C[0], y: r.height / 2 - sc * C[1], sc }; });
      await page.mouse.move(bx.x + pos.x, bx.y + pos.y); await page.mouse.down(); await page.mouse.move(bx.x + pos.x, bx.y + pos.y - 2 * pos.sc, { steps: 6 }); await page.mouse.up(); await settle();
      ok((await page.locator("#ct2a").inputValue()) !== "340", "sürükleme kamerayı taşır"); await has("ctRule", "Çizgi aşıldı");
      await page.click("#ctReset"); await has("ctRule", "Korunuyor");
      await drawn("ct");
      // 4
      await page.click("#tab-ed"); await settle();
      await has("kuSame", "Evet, piksel piksel"); await has("kuCount", "0 not");
      await sel("kuCtx", "grave"); await settle(); await has("kuSame", "Evet"); await sel("kuRead", "grief"); await page.click("#kuNote"); await sel("kuCtx", "cake"); await sel("kuRead", "none"); await page.click("#kuNote");
      await has("kuCount", "2 not"); await has("kuMatch", "1 / 2"); await has("kuCountE", "mezar → keder");
      await page.click("#kuPlay"); await page.waitForTimeout(300); await has("kuPlay", "Durdur"); await page.click("#kuPlay"); await has("kuPlay", "Oynat");
      await has("edAsl", "5,000 s"); await has("edMed", "5,000 s"); await has("edCpm", "11,0"); await has("edCv", "0,000"); await has("edTrend", "Dengeli"); await has("edStatus", "The Mist");
      await sel("edMode", "accel"); await settle(); await has("edTrend", "Hızlanıyor"); await has("edAsl", "5,000 s"); await has("edMed", "4,292 s"); await has("edMinMax", "1,75 / 10,50 s");
      await sel("edMode", "decel"); await settle(); await has("edTrend", "Yavaşlıyor");
      await sel("edMode", "metric"); await settle(); await has("edMinMax", "4,29 / 5,71 s");
      await sel("edMode", "even"); await range("edN", 30); await range("edT", 90); await settle(); await has("edAsl", "3,000 s"); await has("edStatus", "2000 sonrası");
      await range("edN", 2); await range("edT", 180); await settle(); await has("edAsl", "90,000 s"); await has("edStatus", "1930–40"); await page.click("#edDel"); await has("edNOut", "2 plan");
      await range("edN", 12); await range("edT", 60); await settle();
      await range("edSel", 3); await page.click("#edRight"); await settle(); await has("edSelOut", "3. kesme · 15,50 s"); await has("edMinMax", "4,50 / 5,50 s"); await page.click("#edLeft"); await page.click("#edLeft"); await has("edSelOut", "14,50 s");
      await page.click("#edDel"); await has("edNOut", "11 plan"); await has("edAsl", "5,455 s");
      // zaman çizelgesine dokun: imleç; imleçte kes
      await page.locator("#edLine").scrollIntoViewIfNeeded(); await settle();
      const lb2 = await page.locator("#edLine").boundingBox();
      const xAt = (t) => lb2.x + (12 + (lb2.width - 24) * t / 60);
      await page.mouse.click(xAt(15), lb2.y + lb2.height * 0.7); await settle(); await page.click("#edCut"); await has("edNOut", "12 plan"); await has("edSelOut", "15,00 s");
      // kesmeyi sürükle
      await page.locator("#edLine").scrollIntoViewIfNeeded(); await settle(); const lb3 = await page.locator("#edLine").boundingBox(); const xx = (t) => lb3.x + (12 + (lb3.width - 24) * t / 60);
      await page.mouse.move(xx(25), lb3.y + 6); await page.mouse.down(); await page.mouse.move(xx(27), lb3.y + 6, { steps: 5 }); await page.mouse.up(); await settle();
      const after = await page.evaluate(() => document.getElementById("edSelOut").textContent); ok(/2[67],\d\d s/.test(after), "kesme sürüklendi: " + after);
      await page.click("#edPlay"); await page.waitForTimeout(400); await has("edPlay", "Durdur"); await page.click("#edPlay");
      await page.click("#edNew"); await settle(); ok((await page.locator("#edMode").inputValue()) === "free", "yeni rastgele dizi"); await noNaN("ed");
      await pressR(); await has("edAsl", "5,000 s"); await has("kuCount", "0 not"); ok((await page.locator("#edMode").inputValue()) === "even", "R sıfırlar (4)");
      await drawn("ed");
      // 5
      await page.click("#tab-hi"); await settle();
      await has("pdTr", "Kamu malı"); await has("pdTrE", "2019'dan beri"); await has("pdUs", "Kamu malı"); await has("pdUsE", "en geç 1998'den beri"); await has("pdUse", "Bağlantı verilebilir");
      await sel("pdWork", "melies"); await settle(); await has("pdTrE", "2009'dan beri"); await sel("pdWork", "porter"); await settle(); await has("pdTrE", "2012'den beri");
      await sel("pdWork", "potemkin"); await settle(); await has("pdTr", "Korunuyor"); await has("pdTrE", "2045'te serbest kalır"); await has("pdUs", "Kamu malı"); await has("pdUsE", "2021'den beri"); await has("pdUse", "Yalnız anlatılır"); await has("pdStatus", "senaryo ortağı");
      await sel("pdWork", "keaton"); await settle(); await has("pdTrE", "2037'de serbest kalır"); await has("pdUsE", "2022'den beri"); await sel("pdWork", "vertov"); await settle(); await has("pdTrE", "2025'ten beri"); await has("pdUsE", "2025'ten beri");
      await sel("pdWork", "uzkinay"); await settle(); await has("pdTrE", "2027'de"); await sel("pdWork", "ertugrul"); await settle(); await has("pdTrE", "2050'de"); await sel("pdWork", "vertov"); await settle(); await has("pdUse", "Bağlantı");
      await range("pdPub", 1931); await settle(); ok((await page.locator("#pdWork").inputValue()) === "custom", "özel örnek"); await has("pdUs", "Korunuyor"); await has("pdUsE", "2027'de serbest kalır"); await has("pdStatus", "öldü");
      await page.check("#pdAlive"); await settle(); await has("pdTrE", "yaşadıkça"); await has("pdDeathOut", "yaşıyor"); await noNaN("hi");
      await pressR(); await has("pdTrE", "2019"); ok((await page.locator("#pdWork").inputValue()) === "lumiere", "R sıfırlar (5)");
      ok((await page.locator('#panel-hi a[href^="https://archive.org/details/"]').count()) === 4, "dört arşiv bağlantısı");
      await page.waitForSelector(".digest", { state: "attached", timeout: 15000 }); await page.locator(".digest").scrollIntoViewIfNeeded(); ok(await page.locator(".digest").isVisible(), "Keşif Defteri görünür"); ok((await page.locator(".digest").textContent()).includes("Sinema Dili ve Kurgu"), "defter bu sayfanın defteri");
      for (const t of ["fr", "cm", "ct", "ed", "hi"]) { await page.click("#tab-" + t); await settle(); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${t}: yatay taşma yok`); }
      ok(!(await page.locator("main").textContent()).includes("NaN"), "NaN yok");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
