// G · anatomi-ve-fizyoloji.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// kas çizgisinin boyunun sayısal türeviyle moment kolu (sanal iş), kuvvet ve tork dengesinin vektörel toplamı,
// ayağın 2 × 2 doğrusal sistemle serbest cisim çözümü, Hill denkleminin boyutlu biçimi ve kaba ızgarada güç taraması,
// Boyle için ideal gaz mol sayısı, zorlu soluk vermenin RK4 ile tümlenmesi, ince mercek denklemi (1/d₀ + 1/dᵢ = P)
// ve ABCD ışın matrisleriyle göz–gözlük izlemesi, açılmış kaynaklardaki yayımlanmış sayılar (OpenStax, Wikipedia,
// HyperPhysics).
// Kullanım: node scripts/check-g-anatomi-ve-fizyoloji.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "anatomi-ve-fizyoloji";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.BodyLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
const D = Math.PI / 180;

/* ── Kabuk ve metin ── */
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(!/fonts\.googleapis|cdn\.|<script src="http/.test(html), "dış betik ya da yazı tipi yok");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}☀-⛿✀-➿]/u.test(html), "emoji yok");
const title = html.match(/<title>([^<]+)<\/title>/)[1]; ok(title.startsWith("Anatomi ve Fizyoloji: ") && [...title].length <= 80, "başlık ≤ 80: " + [...title].length);
ok(/data-page="anatomi-ve-fizyoloji"/.test(html) && /shared\/app\.js/.test(html) && /shared\/theme\.css/.test(html) && /<meta name="description"/.test(html), "kabuk");
ok((html.match(/<p class="hint">/g) || []).length === 1, "tek hint");
ok(html.includes("Tıbbi tavsiye değildir.") && html.includes("tanı koymaz"), "tıbbi uyarı");
ok(html.includes("hiçbir şey kaydetmez") && html.includes("kaydetmez, göndermez"), "soluk sayımı hiçbir şey saklamıyor");
for (const l of ["kalp-dolasim.html", "sinir-hucresi-ve-aksiyon-potansiyeli.html", "homeostaz-ve-geri-besleme.html", "basit-makineler.html", "tork-denge.html", "mercek-isinlari.html", "optik-yansima-kirilma.html", "ideal-gaz.html"]) ok(html.includes(`href="${l}"`) && fs.existsSync(new URL(`../${l}`, import.meta.url)), "komşu bağlantı " + l);
for (const m of html.matchAll(/href="(https?:[^"]+)"/g)) ok(/^(https:\/\/openstax\.org\/|https:\/\/en\.wikipedia\.org\/wiki\/|http:\/\/hyperphysics\.phy-astr\.gsu\.edu\/)/.test(m[1]), "kaynak izinli alanda: " + m[1]);

/* ── 1 · Kaldıraç ── */
{
  // tork dengesi: dayanak dışındaki bir noktaya göre de net tork 0 (kuvvetler yukarı +)
  for (const [arr, a, b, W] of [["same", 4, 38, 39], ["opp", 5, 3, 50], ["same", 18, 13, 700], ["same", 10, 10, 20]]) {
    const R = K.lever(arr, a, b, W), xF = arr === "opp" ? -a : a, xL = b;
    const forces = [[0, R.J], [xF, arr === "opp" ? -R.F : R.F], [xL, -W]];
    abs(forces.reduce((s, f) => s + f[1], 0), 0, 1e-9, "kuvvet dengesi " + arr);
    for (const P of [-7, 3.3, 50]) abs(forces.reduce((s, f) => s + (f[0] - P) * f[1], 0), 0, 1e-8, "tork dengesi P=" + P);
    near(R.MA * R.speed, 1, 1e-12, "MA × hız oranı = 1");
  }
  ok(K.lever("same", 4, 38, 39).cls === 3 && K.lever("same", 18, 13, 700).cls === 2 && K.lever("opp", 5, 3, 50).cls === 1 && K.lever("same", 10, 10, 1).cls === 0, "sınıflar");
  // ayak: Aşil F (topuk, x = −h), yer N = W (parmak kökü, x = b), kaval kemiği J aşağı (bilek, x = 0). Bilinmeyenler F, J.
  const W = 700, a = 18, b = 13, h = a - b;
  // F + N − J = 0; bilek çevresinde: −h·F + b·N = 0  →  F = W b / h, J = W + F (Cramer)
  const A = [[1, -1], [-h, 0]], rhs = [-W, -b * W], det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  const Fs = (rhs[0] * A[1][1] - A[0][1] * rhs[1]) / det, Js = (A[0][0] * rhs[1] - rhs[0] * A[1][0]) / det;
  const C = K.calfFree(W, a, b); near(C.F, Fs, 1e-12, "baldır F (doğrusal sistem)"); near(C.J, Js, 1e-12, "baldır J"); near(C.naive, K.lever("same", a, b, W).F, 1e-12, "saf ikinci sınıf");
  ok(C.F > W && C.naive < W, "serbest cisim kas kuvveti ağırlıktan büyük, saf hesap küçük");
  assert.throws(() => K.calfFree(700, 10, 13)); assert.throws(() => K.lever("x", 1, 1, 1)); checks += 2;
}
{ // dirsek
  const g = 9.8, d = 0.04, Lh = 0.3, rF = 0.16, rL = 0.38, wF = 2.5 * g, wL = 4 * g;
  const ell = (t) => Math.sqrt(Lh * Lh + d * d - 2 * Lh * d * Math.cos(t)); // kosinüs teoremi
  for (const th of [20, 45, 90, 120, 150, 170]) {
    const t = th * D, E = K.elbow(th), hgt = 1e-6, m = (ell(t + hgt) - ell(t - hgt)) / (2 * hgt); // sanal iş: moment kolu = dℓ/dθ
    near(E.m, m, 1e-7, "moment kolu = dℓ/dθ " + th);
    const tauLoad = (rF * wF + rL * wL) * Math.sin(t); near(E.F, tauLoad / m, 1e-7, "F " + th);
    // forearm serbest cismi: kuvvet toplamı ve hand noktasına göre tork
    const Fx = E.F * E.ux + E.Rx, Fy = E.F * E.uy + E.Ry - wF - wL; abs(Fx, 0, 1e-9); abs(Fy, 0, 1e-9, "kuvvet dengesi " + th);
    const hand = [rL * Math.sin(t), rL * Math.cos(t)], I = [d * Math.sin(t), d * Math.cos(t)], cm = [rF * Math.sin(t), rF * Math.cos(t)];
    const cr = (p, f) => (p[0] - hand[0]) * f[1] - (p[1] - hand[1]) * f[0];
    abs(cr(I, [E.F * E.ux, E.F * E.uy]) + cr([0, 0], [E.Rx, E.Ry]) + cr(cm, [0, -wF]), 0, 1e-9, "el noktasına göre tork " + th);
  }
  const E = K.elbow(90);
  abs(E.Fpar, 470, 0.5, "OpenStax 470 N"); abs(E.Fpar / (6.5 * g), 7.38, 0.005, "7,38 kat"); abs(E.Fpar - 6.5 * g, 407, 0.5, "OpenStax eklem 407 N (paralel)");
  abs(E.F, 474.56, 0.01, "model 90°"); abs(E.R, 411.5, 0.1, "model eklem"); abs(E.m * 100, 3.965, 0.001);
  ok(K.elbow(150).F > K.elbow(90).F && K.elbow(90).F > K.elbow(30).F, "kuvvet açıyla artar (soru yanıtı)");
  abs(K.elbow(30).F, 417.26, 0.01); abs(K.elbow(150).F, 525.65, 0.01);
  ok(K.elbow(90, { d: 0.06 }).F < E.F && K.elbow(90, { d: 0.06 }).speed < E.speed, "yapışma uzaklaşınca kuvvet ve hız düşer");
  assert.throws(() => K.elbow(0)); assert.throws(() => K.elbow(180)); checks += 2;
}
{ // Hill
  const F0 = 1000, v0 = 2;
  for (const k of [0.1, 0.25, 0.6]) {
    const a = k * F0, b = a * v0 / F0;
    for (const u of [0, 0.1, 0.5, 0.9, 1]) { const F = K.hill(u, k).f * F0, v = u * v0; abs((v + b) * (F + a), b * (F0 + a), 1e-9 * F0, "Hill boyutlu k=" + k); }
    let best = 0, bu = 0; for (let i = 0; i <= 100000; i++) { const u = i / 100000, p = K.hill(u, k).p; if (p > best) { best = p; bu = u; } }
    abs(K.hillOpt(k).u, bu, 2e-5, "en büyük güç hızı"); abs(K.hillOpt(k).p, best, 1e-9);
  }
  abs(K.hillOpt(0.25).u, 0.309, 0.0005, "a/F0=0,25 → 0,309"); abs(K.hill(0.3, 0.25).f, 0.31818, 1e-5);
  near(K.forceLength(1), 1, 0); near(K.forceLength(0.5), 0, 0); near(K.forceLength(1.5), 0, 0); near(K.forceLength(1.6), 0, 0); near(K.forceLength(0.75), 0.75, 1e-12, "Wikipedia Eq. 8");
}

/* ── 2 · Solunum ── */
{
  const w = K.SPIRO.woman, wc = K.capacities(w), wt = K.SPIRO.WIKI.woman;
  ok(w.irv === 1900 && w.tv === 500 && w.erv === 700 && w.rv === 1100, "Wikipedia kadın hacimleri");
  ok(wc.vc === wt.vc && wc.ic === wt.ic && wc.frc === wt.frc && wc.tlc === wt.tlc, "kadın tablosu tam toplanır");
  const m = K.SPIRO.man, mc = K.capacities(m), mt = K.SPIRO.WIKI.man;
  ok(m.irv === 3300 && m.tv === 500 && m.erv === 1100 && m.rv === 1200 && mt.vc === 4800 && mt.ic === 3800 && mt.frc === 2400 && mt.tlc === 6000, "Wikipedia erkek tablosu");
  ok(mc.vc - mt.vc === 100 && mc.ic === mt.ic && mc.frc - mt.frc === -100 && mc.tlc - mt.tlc === 100, "erkek satırı 0,1 L yuvarlama farkı");
  ok(mt.tlc === 6000 && wt.tlc === 4200, "OpenStax TLC 6000 / 4200 ile aynı");
  near(K.ventilation(10, 500, 150).ve, 5000, 0, "Wikipedia 10 × 500"); near(K.ventilation(20, 250, 150).ve, 5000, 0, "Wikipedia 20 × 250");
  near(K.ventilation(10, 500, 150).va, 3500, 0); near(K.ventilation(20, 250, 150).va, 2000, 0); near(K.ventilation(12, 500, 150).va, 4200, 0);
  // Boyle: kapalı kapta mol sayısı korunur (n = PV / RT)
  const R = 8.314, T = 310, mmHg = 133.322;
  for (const dV of [-1000, -300, 250, 500, 1000]) { const B = K.boyle(2300, dV, true), n0 = 760 * mmHg * 2.3e-3 / (R * T), n1 = B.P * mmHg * (2300 + dV) * 1e-6 / (R * T); near(n1, n0, 1e-12, "mol korunur ΔV=" + dV); }
  abs(K.boyle(2300, 500, true).P, 624.29, 0.01); near(K.boyle(2300, 500, false).flow, 500, 0); near(K.boyle(2300, 500, false).P, 760, 0);
  // zorlu soluk verme: dV/dt = (lim − V)/τ, RK4
  for (const [lim, tau, Tb] of [[4.8, 0.7, 6], [4.2, 1.6, 6], [2.9, 0.45, 6], [4.2, 1.6, 2]]) {
    let V = 0, t = 0; const h = 1e-3, f = (V) => (lim - V) / tau; let v1 = null;
    while (t < Tb - 1e-12) { const k1 = f(V), k2 = f(V + h / 2 * k1), k3 = f(V + h / 2 * k2), k4 = f(V + h * k3); V += h / 6 * (k1 + 2 * k2 + 2 * k3 + k4); t += h; if (v1 === null && t >= 1 - 1e-9) v1 = V; }
    const F = K.fev(lim, tau, Tb); near(F.fev1, v1, 1e-9, "FEV1 RK4"); near(F.fvc, V, 1e-9, "FVC RK4");
  }
  abs(K.fev(4.8, 0.7, 6).ratio, 0.760, 0.001, "tipik 0,76"); ok(K.fev(4.2, 1.6, 6).ratio < 0.7, "tıkayıcı < 0,70"); ok(K.fev(2.9, 0.45, 6).ratio > 0.85, "kısıtlayıcı yüksek oran");
  ok(K.fev(4.2, 1.6, 2).ratio > K.fev(4.2, 1.6, 6).ratio, "kısa üfleme oranı şişirir");
}

/* ── 3 · Göz ── */
{
  near(K.EYE.P, 1 / 0.02, 1e-12, "OpenStax: 2,00 cm → 50 D"); near(K.EYE.P + 1 / 0.25, 54, 1e-12, "25 cm → 54 D"); near(4 / 50, 0.08, 1e-12, "% 8 uyum");
  // ince mercek: gözlük sonsuzdaki nesnenin görüntüsünü uzak noktaya (gözden 30 cm, gözlükten 28,5 cm) kurar
  const dI = -(0.30 - 0.015); abs(K.spectacleFor(-1 / 0.30, 0.015), 1 / dI, 1e-12, "miyop ince mercek"); abs(K.spectacleFor(-1 / 0.30, 0.015), -3.51, 0.005, "OpenStax −3,51 D");
  const hyp = 1 / (0.25 - 0.015) + 1 / -(1.0 - 0.015); abs(K.lensForNear(1, 0.25, 0.015), hyp, 1e-12, "hipermetrop ince mercek"); abs(hyp, 3.24, 0.005, "OpenStax 3,24 D");
  // ABCD: [1 d; 0 1] yayılma, [1 0; −P 1] mercek; nesneden retinaya y açısı-bağımsızsa (B = 0) görüntü nettir
  const mul = (X, Y) => [[X[0][0] * Y[0][0] + X[0][1] * Y[1][0], X[0][0] * Y[0][1] + X[0][1] * Y[1][1]], [X[1][0] * Y[0][0] + X[1][1] * Y[1][0], X[1][0] * Y[0][1] + X[1][1] * Y[1][1]]];
  const T = (d) => [[1, d], [0, 1]], L = (P) => [[1, 0], [-P, 1]];
  const Bsys = (Do, Peye, Ps, v) => { let M = T(Do - (v ?? 0)); if (v !== null) { M = mul(L(Ps), M); M = mul(T(v), M); } M = mul(L(Peye), M); M = mul(T(0.02), M); return M[0][1]; };
  const solveDo = (Peye, Ps, v) => { let lo = 0.03, hi = 1e6; const f = (x) => Bsys(x, Peye, Ps, v); if (f(lo) * f(hi) > 0) return null; for (let i = 0; i < 300; i++) { const m = Math.sqrt(lo * hi); if (f(lo) * f(m) <= 0) hi = m; else lo = m; } return Math.sqrt(lo * hi); };
  for (const [Rx, age, Ps, v] of [[0, 20, 0, null], [-2.5, 30, 0, null], [-2.5, 30, -2.5, 0.015], [2, 35, 0, null], [2, 35, 2, 0], [-4, 50, -3.75, 0.015], [1, 55, 2.5, 0.015]]) {
    const A = K.accomAmp(age), Rg = K.eyeRange(Rx, A, Ps, v);
    const nr = solveDo(50 - Rx + A, Ps, v); if (!Rg.near.beyond && Rg.near.d !== Infinity) abs(Rg.near.d, nr, 1e-6 * nr, `yakın nokta ABCD Rx=${Rx} yaş=${age}`);
    const fr = solveDo(50 - Rx, Ps, v); if (Rg.far.d !== Infinity) abs(Rg.far.d, fr, 1e-6 * fr, `uzak nokta ABCD Rx=${Rx}`); else ok(fr === null || fr > 1e4, "uzak nokta sonsuz");
    for (const Do of [0.2, 0.5, 3]) { const Le = K.vergenceAtEye(Do, Ps, v), F = K.eyeFocus(Rx, A, Le, 0.004); if (F.where === "on") abs(Bsys(Do, F.Peye, Ps, v), 0, 1e-9, "net görüntüde B = 0"); }
  }
  { const Rg = K.eyeRange(-1 / 0.3, 5, K.spectacleFor(-1 / 0.3, 0.015), 0.015); ok(Rg.far.d === Infinity && !Rg.far.beyond, "düzeltilmiş miyopun uzak noktası sonsuz"); }
  ok(K.eyeRange(5, 2, 0, null).none, "uyum yetmezse net uzaklık yok");
  near(K.accomAmp(20), 12.5, 1e-12, "Hofstetter ortalama 20"); near(K.accomAmp(40, "min"), 5, 1e-12); near(K.accomAmp(40, "max"), 9, 1e-12); near(K.accomAmp(60, "min"), 0, 0);
  ok(K.accomAmp(47.5) < 4.5 && 0.08 * 50 < K.accomAmp(40, "min"), "OpenStax 4 D < Hofstetter en küçük (40 yaş)");
  const F = K.eyeFocus(0, 12.5, -4, 0.004); ok(F.where === "on" && F.acc === 4, "25 cm net");
  const F2 = K.eyeFocus(-2.5, 12.5, 0, 0.004); ok(F2.where === "front", "miyop sonsuza bulanık"); abs(F2.blur / K.ARCMIN, 34.38, 0.01, "bulanıklık 34,4′");
  // keskinlik (Wikipedia: 6 m'de 1,75 mm, harf 5′)
  const Aq = K.acuity(6, 1); abs(Aq.gap * 1000, 1.75, 0.005, "6/6 boşluk 1,75 mm"); abs(Aq.letter / Aq.gap, 5, 1e-6, "harf 5 boşluk"); near(K.acuity(6, 2).snellen, 3, 1e-12, "6/3"); near(K.acuity(6, 0.5).logMAR, Math.log10(2), 1e-12);
  abs(Aq.retina * 1e6, 5.82, 0.01, "ağ tabakada 5,8 µm");
  // su altı: tek yüzey gücü (n2 − n1)/r, r sabit; HyperPhysics indisleri
  const U = K.corneaUnderwater(), r = 0.0078, Pair = (1.376 - 1) / r, Pw = (1.376 - 1.333) / r; near(U.ratio, Pw / Pair, 1e-12, "su altı oranı"); near(U.front, 49, 0, "43 + 6"); abs(U.loss, 43.4, 0.05);
  assert.throws(() => K.vergenceAtEye(0.01, 0, 0.015)); checks++;
}
console.log(`G anatomi-ve-fizyoloji: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

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
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { const t = (await read(id)).replace(/ /g, " "); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const R = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); };
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !e.closest("label") && !document.querySelector(`label[for="${e.id}"]`) && !e.getAttribute("aria-label")).map((e) => e.id));
      ok(unlabeled.length === 0, "etiketsiz denetim: " + unlabeled.join(","));
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll("input[type=range]")].every((e) => { const st = +e.step, v = +e.defaultValue; return Math.abs((v - +e.min) / st - Math.round((v - +e.min) / st)) < 1e-6; })), "varsayılanlar adımda");
      // 1
      await has("levClass", "3. sınıf"); await has("levMA", "0,105"); await has("levF", "371 N"); await has("levJ", "332 N"); await has("levMove", "9,50 cm");
      ok(await page.locator("#levFreeBox").isHidden(), "baldır kartı gizli");
      await sel("levEx", "calf"); await has("levClass", "2. sınıf"); await has("levF", "506 N"); await has("levFree", "1820 N"); await has("levFreeE", "2,60 katı"); await has("levStatus", "F = 1820 N"); await has("levStatus", "W = 700 N"); await has("levFE", "ikinci sınıf modeli"); await has("levJE", "zemin oraya W = 700 N"); await has("levFreeE", "2520 N");
      await sel("levEx", "neck"); await has("levClass", "1. sınıf"); await has("levF", "30 N"); await has("levJ", "80 N");
      await range("levW", 0); await has("levStatus", "Yük sıfır"); await range("levA", 60); await range("levB", 1);
      await sel("levArr", "same"); await range("levA", 10); await range("levB", 10); await range("levW", 100); await has("levClass", "Sınır durumu");
      await has("elbF", "475 N"); await has("elbFpar", "470 N"); await has("elbR", "412 N"); await has("elbM", "3,96 cm"); await has("elbSpeed", "9,6 kat"); await has("elbStatus", "7,38");
      await range("elbTh", 150); await has("elbF", "526 N"); await range("elbTh", 20); await has("elbF", "412 N"); await range("elbTh", 170);
      await range("elbLoad", 0); await range("elbD", 7); await range("elbLoad", 10);
      await has("hillF", "0,318"); await has("hillPE", "0,309"); await range("hillU", 1); await has("hillF", "0,000"); await range("hillU", 0); await has("hillFE", "izometrik");
      await range("flL", 0.4); await has("flFE", "modelin dışında"); await range("hillK", 0.6); await range("hillK", 0.1);
      await page.click('[data-q="lev"][data-a="1"]'); await has("quizLevOut", "Doğru"); await has("quizLevOut", "526 N");
      await R(); await has("levF", "371 N"); await has("elbF", "475 N"); await has("hillF", "0,318"); await has("flF", "1,00"); ok((await read("quizLevOut")) === "", "R soruyu sıfırlar");
      ok((await page.locator("#levEx").inputValue()) === "elbow", "R örneği sıfırlar");
      // klavye
      await page.locator("#tab-lev").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-eye").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-bre").getAttribute("aria-selected")) === "true", "ArrowRight");
      await page.keyboard.press("ArrowLeft"); await page.keyboard.press("ArrowLeft"); ok((await page.locator("#tab-eye").getAttribute("aria-selected")) === "true", "ArrowLeft sarar");
      // 2
      await page.click("#tab-bre");
      await has("spiVC", "4,90 L"); await has("spiVCE", "tablo: 4,80 L (+0,1 L yuvarlama)"); await has("spiTLC", "6,10 L"); await has("spiFRC", "2,30 L"); await has("spiVE", "6,00 L/dk"); await has("spiVA", "4,20 L/dk");
      await sel("spiPre", "woman"); await has("spiVC", "3,10 L"); await has("spiVCE", "toplamla aynı"); await has("spiTLC", "4,20 L"); await has("boyV0", "1,80 L");
      await page.click("#spiPreSlow"); await has("spiVA", "3,50 L/dk"); await has("spiStatus", "Wikipedia");
      await page.click("#spiPreFast"); await has("spiVA", "2,00 L/dk"); await has("spiVE", "5,00 L/dk"); await has("spiStatus", "57 %");
      await range("spiVD", 300); await has("spiVA", "—"); await has("spiStatus", "geçerliliğini yitirir");
      await page.click('[data-q="bre"][data-a="0"]'); await has("quizBreOut", "Doğru");
      await R(); await has("spiVC", "4,90 L"); await has("spiVA", "4,20 L/dk");
      await has("boyP", "760,0 mm Hg"); await has("boyFlow", "500 mL"); await sel("boyAir", "closed"); await has("boyP", "624,3 mm Hg"); await has("boyPE", "−135,7 mm Hg");
      await range("boyDV", -1000); await has("boyPE", "+"); await range("boyDV", 0); await has("boyStatus", "Hacim değişmiyor"); await range("boyDV", 1000);
      await has("fevRatio", "0,76"); await has("fevF1", "3,65 L"); await has("fevFVC", "4,80 L");
      await page.click("#fevPreO"); await has("fevRatio", "0,48"); await has("fevRatioE", "0,70'in altında"); await range("fevT", 2); await has("fevStatus", "olduğundan yüksek");
      await page.click("#fevPreR"); await has("fevRatio", "0,89"); await page.click("#fevPreN"); await has("fevRatio", "0,76");
      await page.click("#cntGo"); await page.click("#cntGo"); await page.click("#cntGo"); await has("cntGo", "Soluk aldım (2)"); await has("cntOut", "Kalan süre");
      await page.click("#cntReset"); await has("cntOut", "Henüz sayım yok");
      await range("fevTau", 2.5); await R(); await has("fevRatio", "0,76"); await has("boyP", "760,0 mm Hg"); ok((await page.locator("#boyAir").inputValue()) === "open", "R hava yolunu açar");
      // 3
      await page.click("#tab-eye");
      await has("eyeA", "12,50 D"); await has("eyeFar", "sonsuz"); await has("eyeNear", "8,0 cm"); await has("eyeAcc", "4,00 D"); await has("eyeImg", "net"); await has("eyeBlur", "0,0 yay dk");
      ok(await page.locator("#eyePs").isDisabled(), "mercek yokken güç kapalı");
      await range("eyeAge", 50); await has("eyeA", "3,50 D"); await has("eyeNear", "28,6 cm"); await has("eyeImg", "retinanın arkasında"); await has("eyeBlur", "6,9 yay dk"); await has("eyeStatus", "presbiyopi");
      await sel("eyeHof", "max"); await has("eyeA", "5,00 D"); await sel("eyeHof", "min"); await has("eyeA", "2,50 D"); await range("eyeAge", 60); await has("eyeA", "0,00 D");
      await R(); await has("eyeA", "12,50 D");
      await page.click("#eyePreMyo"); await has("eyeFar", "40,0 cm"); await has("eyeImg", "retinanın önünde"); await has("eyeBlur", "34,4 yay dk");
      await sel("eyeLens", "contact"); await page.click("#eyeFix"); await has("eyePsOut", "−2,50 D"); await has("eyeFar", "sonsuz"); await has("eyeImg", "net");
      await sel("eyeLens", "glasses"); await page.click("#eyeFix"); await has("eyePsOut", "−2,50 D"); await has("eyeImg", "retinanın önünde"); await has("eyeBlurE", "0,09 D"); await has("eyeStatus", "0,25 D'lik adımına"); await has("eyeStatus", "−2,60 D"); await range("eyeObj", 4); await has("eyeImg", "net"); await range("eyeObj", 12); await range("eyeObj", 0);
      await range("eyeRx", 6); await sel("eyeLens", "none"); await range("eyeAge", 60); await has("eyeFarE", "hiçbir uzaklık net değil"); await range("eyeRx", -8);
      await page.click("#eyePreRead"); await has("eyeObjOut", "25,0 cm");
      ok((await page.locator("#eyeBook").textContent()).includes("−3,51 D") && (await page.locator("#eyeBook").textContent()).includes("3,24 D") && (await page.locator("#eyeBook").textContent()).includes("−3,33 D"), "kitap tablosu");
      await has("acuGap", "1,75 mm"); await has("acuLetter", "8,7 mm"); await has("acuRet", "5,8 µm"); await has("acuSn", "6/6"); await has("acuSnE", "20/20"); await has("acuLog", "0,00"); await has("uwRatio", "0,114");
      await sel("acuV", "0.5"); await has("acuSn", "6/12"); await has("acuLog", "0,30"); await sel("acuV", "0.8"); await has("acuSn", "6/7,5"); await range("acuD", 0.4);
      await page.click('[data-q="eye"][data-a="0"]'); await has("quizEyeOut", "Asıl neden"); await page.click('[data-q="eye"][data-a="1"]'); await has("quizEyeOut", "Doğru");
      await R(); await has("eyeA", "12,50 D"); await has("acuSn", "6/6"); await has("acuGap", "1,75 mm");
      await page.waitForSelector(".digest", { state: "attached", timeout: 15000 }); await page.locator(".digest").scrollIntoViewIfNeeded();
      ok(await page.locator(".digest").isVisible(), "Keşif Defteri görünür");
      ok(((await page.locator(".digest").textContent()) || "").includes("Kaldıraç"), "defter içeriği yüklendi");
      ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      ok(await page.evaluate(() => Object.isFrozen(BodyLab) && !Object.getOwnPropertyDescriptor(window, "BodyLab").writable), "çekirdek salt okunur");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G anatomi-ve-fizyoloji: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
