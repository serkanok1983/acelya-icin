// G · karar-ve-bilissel-yanliliklar.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// birikimli beklenti değeri yerine azalan dağılım üzerinden Choquet toplamı, beklenen fayda tutarlılığı için
// rastgele artan fayda fonksiyonlarıyla kaba kuvvet araması, St. Petersburg beklenen değeri için doğrudan seri
// toplamı, Bernoulli fiyatları için yayımlanmış değerler (Wikipedia: 20,88; 10,95; 3,35) ve 1000 terimlik bağımsız
// bir ikiye bölme, kesinlik eşdeğerleri için kapalı biçimler, Monte Carlo için bağımsız bir üreteç (64 bit LCG),
// yayımlanmış oranlar için makalelerden ayrıca yazılmış bir tablo.
// Kullanım: node scripts/check-g-karar-ve-bilissel-yanliliklar.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "karar-ve-bilissel-yanliliklar";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.DecisionLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };

/* ── Kabuk ── */
ok(Object.isFrozen(K) && Object.isFrozen(K.PROBLEMS) && Object.isFrozen(K.PROBLEMS.P1.opts[0]), "çekirdek dondurulmuş");
ok(!/fonts\.googleapis|cdn\.|<script src="https?:/.test(html), "dış betik, Google Fonts ya da CDN yok");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Karar ve Bilişsel Yanlılıklar: ") && title.length <= 80, "başlık biçimi ve uzunluğu: " + title.length);
ok(/<body class="app-page" data-page="karar-ve-bilissel-yanliliklar">/.test(html) && /<meta name="description" content="[^"]{60,}"/.test(html), "kabuk ve açıklama");
ok(/<link rel="stylesheet" href="shared\/theme\.css">/.test(html) && /<script src="shared\/app\.js"><\/script>/.test(html), "theme.css ve app.js");
ok(/viewport-fit=cover/.test(html) && /<html lang="tr" class="app-root">/.test(html), "viewport ve kök");
ok(!/[̀-ͯ⃗]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(html), "emoji yok");
ok(!/body\s*\{[^}]*overflow\s*:\s*hidden/.test(html), "body overflow:hidden yok");
ok(!/localStorage|sessionStorage|indexedDB|fetch\(|XMLHttpRequest|sendBeacon/.test(html.split("<script>")[1]), "yanıtlar saklanmıyor ve gönderilmiyor");
ok(/href="bayes-olasilik\.html"/.test(html) && /href="mikro-ekonomi-ve-uretim-faktorleri\.html"/.test(html), "ilgili sayfalara bağlantı");
ok(/yatırım ya da para tavsiyesi vermez/.test(html) && /12 Kasım 2026/.test(html), "tavsiye yok notu ve tarih");

/* ── Yayımlanmış oranlar: makalelerden ayrıca okunmuş tablo ── */
const PUB = { // [1. seçenek %, 2. seçenek %, N]
  P1: [18, 82, 72], P2: [83, 17, 72], P3: [20, 80, 95], P4: [65, 35, 95], P3n: [92, 8, 95], P4n: [42, 58, 95],
  P7: [14, 86, 66], P8: [73, 27, 66], AD1: [72, 28, 152], AD2: [22, 78, 155],
};
for (const [id, [a, b, n]] of Object.entries(PUB)) {
  const P = K.PROBLEMS[id];
  ok(P.opts[0].pct === a && P.opts[1].pct === b && P.N === n && a + b === 100, `${id} yayımlanmış oranlar`);
  for (const o of P.opts) near(o.pr.reduce((s, q) => s + q[1], 0), 1, 1e-12, `${id} olasılık toplamı`);
}
// seçeneklerin içeriği (Kahneman ve Tversky 1979, Tablo I ve Problem 1–2; Tversky ve Kahneman 1981)
near(K.ev(K.PROBLEMS.P1.opts[0].pr), 2409, 1e-12, "P1 A beklenen değer"); near(K.ev(K.PROBLEMS.P3n.opts[0].pr), -3200, 1e-12, "P3′ A");
near(K.ev(K.PROBLEMS.P8.opts[0].pr), 6, 1e-12); near(K.ev(K.PROBLEMS.P8.opts[1].pr), 6, 1e-12, "P8 eşit beklenen değer");
near(K.ev(K.PROBLEMS.AD1.opts[1].pr), 200, 1e-12, "Asya hastalığı B = 200"); near(K.ev(K.PROBLEMS.AD2.opts[1].pr), -400, 1e-12, "D = −400");
// P4 = P3'ün dörtte biri, P8 = P7'nin 1/450'si (bağımsızlık aksiyomunun sınandığı yapı)
for (const [x, y, f] of [["P3", "P4", 0.25], ["P3n", "P4n", 0.25], ["P7", "P8", 1 / 450]]) for (let i = 0; i < 2; i++) {
  const nz = (pr) => pr.filter((q) => q[0] !== 0); const a = nz(K.PROBLEMS[x].opts[i].pr)[0], b = nz(K.PROBLEMS[y].opts[i].pr)[0];
  ok(a[0] === b[0] && Math.abs(a[1] * f - b[1]) < 1e-12, `${y} = ${x} × ${f}`);
}
ok(K.MAMMO.tp === 8 && K.MAMMO.fp === 95 && K.MAMMO.sick === 10 && K.MAMMO.healthy === 990 && K.ANCHOR.asc === 512 && K.ANCHOR.desc === 2250 && K.ANCHOR.truth === 40320, "mamografi ve çapalama verisi");
ok(K.TK92.a === 0.88 && K.TK92.b === 0.88 && K.TK92.l === 2.25 && K.TK92.g === 0.61 && K.TK92.d === 0.69, "1992 parametreleri");

/* ── Beklenti kuramı: Choquet toplamıyla bağımsız başvuru ── */
function lcg(seed) { let s = BigInt(seed); return () => { s = (s * 6364136223846793005n + 1442695040888963407n) & ((1n << 64n) - 1n); return Number(s >> 11n) / 2 ** 53; }; }
const wRef = (p, c) => (p <= 0 ? 0 : p >= 1 ? 1 : Math.exp(c * Math.log(p) - Math.log(Math.exp(c * Math.log(p)) + Math.exp(c * Math.log1p(-p))) / c));
const vRef = (x, P) => (x >= 0 ? Math.pow(x, P.a) : -P.l * Math.pow(-x, P.b));
function choquet(pr, P) {
  // kazanç: Σ_i [v(x_i) − v(x_{i+1})]·w⁺(P(X ≥ x_i)), x'ler azalan; kayıp simetrik
  const xs = [...new Set(pr.map((q) => q[0]))];
  const g = xs.filter((x) => x > 0).sort((a, b) => b - a), l = xs.filter((x) => x < 0).sort((a, b) => a - b);
  let V = 0;
  g.forEach((x, i) => { const nxt = i + 1 < g.length ? g[i + 1] : 0, Pge = pr.filter((q) => q[0] >= x).reduce((s, q) => s + q[1], 0); V += (vRef(x, P) - vRef(nxt, P)) * wRef(Pge > 1 - 1e-12 ? 1 : Pge, P.g); });
  l.forEach((x, i) => { const nxt = i + 1 < l.length ? l[i + 1] : 0, Ple = pr.filter((q) => q[0] <= x).reduce((s, q) => s + q[1], 0); V += (vRef(x, P) - vRef(nxt, P)) * wRef(Ple > 1 - 1e-12 ? 1 : Ple, P.d); });
  return V;
}
{
  const r = lcg(7);
  for (let t = 0; t < 400; t++) {
    const P = { a: 0.3 + 0.9 * r(), b: 0.3 + 0.9 * r(), l: 0.5 + 3.5 * r(), g: 0.3 + 0.7 * r(), d: 0.3 + 0.7 * r() };
    const n = 1 + Math.floor(r() * 5); let ps = Array.from({ length: n }, () => r()); const sum = ps.reduce((s, x) => s + x, 0); ps = ps.map((x) => x / sum);
    const pr = ps.map((p) => [Math.round(-5000 + 10000 * r()), p]);
    if (r() < 0.2) pr.push([pr[0][0], 0]);
    near(K.cpt(pr, P), choquet(pr, P), 1e-9, "CPT = Choquet");
  }
  for (const p of [0, 0.001, 0.01, 0.33, 0.5, 0.9, 0.999, 1]) for (const c of [0.3, 0.61, 0.69, 1]) near(K.wTK(p, c), wRef(p, c), 1e-12, `w(${p})`);
  for (const p of [0.01, 0.2, 0.5, 0.8]) near(K.wTK(p, 1), p, 1e-15, "γ = 1 doğrusal");
  // tek sonuçlu kazanç: V = w(p) v(x); kesin sonuç: V = v(x)
  near(K.cpt([[3000, 1]], K.TK92), 3000 ** 0.88, 1e-12); near(K.cpt([[4000, 0.8], [0, 0.2]], K.TK92), wRef(0.8, 0.61) * 4000 ** 0.88, 1e-12);
  near(K.cpt([[-3000, 1]], K.TK92), -2.25 * 3000 ** 0.88, 1e-12);
  // ağırlık monotonluğu (γ, δ ≥ 0,3 sürgü aralığı)
  for (const c of [0.3, 0.45, 0.61]) { let prev = -1; for (let i = 0; i <= 1000; i++) { const w = K.wTK(i / 1000, c); assert(w >= prev - 1e-15); prev = w; } checks++; }
  // sabit nokta ve karma eşik
  near(K.wTK(K.fixedPoint(0.61), 0.61), K.fixedPoint(0.61), 1e-9, "w(p*) = p*"); ok(K.fixedPoint(1) === null, "γ = 1: sabit nokta yok");
  for (const P of [K.TK92, { a: 1, b: 1, l: 2, g: 1, d: 1 }, { a: 0.7, b: 0.9, l: 1.5, g: 0.5, d: 0.8 }]) { const X = K.mixedThreshold(100, P); abs(choquet([[X, 0.5], [-100, 0.5]], P), 0, 1e-8, "karma eşikte V = 0"); }
  near(K.mixedThreshold(100, { a: 1, b: 1, l: 2, g: 1, d: 1 }), 200, 1e-12, "doğrusal: X = λ·100");
  assert.throws(() => K.cpt([[1, 0.5]], K.TK92)); assert.throws(() => K.cpt([[1, 1]], { a: 1, b: 1, l: 1, g: 0.2, d: 1 })); assert.throws(() => K.wTK(1.2, 0.6)); checks += 3;
}
/* Model kararları: varsayılanla 10 çoğunluktan 9'u, uymayan Problem 7; ağırlıksız/doğrusal ön ayarlar */
{
  const ids = ["P1", "P2", "P3", "P4", "P3n", "P4n", "P7", "P8", "AD1", "AD2"];
  const modal = (id) => (K.PROBLEMS[id].opts[0].pct > K.PROBLEMS[id].opts[1].pct ? 0 : 1);
  const pickRef = (id, P) => { const [A, B] = K.PROBLEMS[id].opts.map((o) => choquet(o.pr, P)); return A > B ? 0 : B > A ? 1 : -1; };
  const miss = ids.filter((id) => pickRef(id, K.TK92) !== modal(id));
  ok(JSON.stringify(miss) === '["P7"]', "TK92: yalnız Problem 7 uymuyor: " + miss);
  for (const id of ids) ok(K.choose(K.PROBLEMS[id].opts[0].pr, K.PROBLEMS[id].opts[1].pr, K.TK92).pick === pickRef(id, K.TK92), id + " seçimi");
  const noW = { ...K.TK92, g: 1, d: 1 };
  for (const [x, y] of [["P1", "P2"], ["P3", "P4"], ["P3n", "P4n"], ["P7", "P8"]]) ok([x, y].filter((id) => pickRef(id, noW) !== modal(id)).length === 1, `ağırlıksız (beklenen fayda, u = v): ${x}/${y} çiftinde tam biri kaçar`);
  ok(pickRef("AD1", noW) === 0 && pickRef("AD2", noW) === 1, "ağırlıksız: çerçeveleme büküm ile");
  ok(ids.filter((id) => pickRef(id, noW) === modal(id)).length === 6, "ağırlıksız: 6 / 10");
  ok(K.chooseEV(K.PROBLEMS.AD1.opts[0].pr, K.PROBLEMS.AD1.opts[1].pr).pick === -1, "Asya hastalığında beklenen değer eşit");
}
/* Beklenen fayda tutarlılığı: rastgele artan fayda fonksiyonlarıyla kaba kuvvet */
{
  const r = lcg(3);
  const pref = (pr, u) => pr.reduce((s, [x, p]) => s + p * u(x), 0);
  for (const pair of K.PAIRS) {
    const A = K.PROBLEMS[pair.a], B = K.PROBLEMS[pair.b];
    const xs = [...new Set([...A.opts, ...B.opts].flatMap((o) => o.pr.map((q) => q[0])))].sort((a, b) => a - b);
    for (const c1 of [0, 1]) for (const c2 of [0, 1]) {
      let found = false;
      for (let t = 0; t < 4000 && !found; t++) {
        // artan, u(0) = 0; çerçevelemede sonuç "kurtulan kişi" ile eşlenir (600 + x kayıp çerçevesinde)
        const pts = xs.map(() => r()).sort((a, b) => a - b), base = pts[xs.indexOf(0)] ?? 0;
        const tab = new Map(xs.map((x, i) => [x, pts[i] - base]));
        const u = pair.id === "framing" ? null : (x) => tab.get(x);
        let ok1, ok2;
        if (pair.id === "framing") {
          const lives = [0, 200, 600], lv = lives.map(() => r()).sort((a, b) => a - b), U = (n) => lv[lives.indexOf(n)];
          const toLives = (pr, loss) => pr.map(([x, p]) => [loss ? 600 + x : x, p]);
          ok1 = (c1 === 0 ? 1 : -1) * (pref(toLives(A.opts[0].pr, false), U) - pref(toLives(A.opts[1].pr, false), U)) > 0;
          ok2 = (c2 === 0 ? 1 : -1) * (pref(toLives(B.opts[0].pr, true), U) - pref(toLives(B.opts[1].pr, true), U)) > 0;
        } else {
          ok1 = (c1 === 0 ? 1 : -1) * (pref(A.opts[0].pr, u) - pref(A.opts[1].pr, u)) > 0;
          ok2 = (c2 === 0 ? 1 : -1) * (pref(B.opts[0].pr, u) - pref(B.opts[1].pr, u)) > 0;
        }
        found = ok1 && ok2;
      }
      ok(found === K.euConsistent(pair.id, c1, c2), `${pair.id} (${c1}, ${c2}): bir u ${found ? "bulundu" : "yok"}`);
    }
    // çoğunluk kalıbı her çiftte tutarsız
    const m = (P) => (P.opts[0].pct > P.opts[1].pct ? 0 : 1);
    ok(!K.euConsistent(pair.id, m(A), m(B)), `${pair.id}: yayımlanmış çoğunluk kalıbı beklenen faydayla bağdaşmaz`);
  }
  assert.throws(() => K.euConsistent("xyz", 0, 0)); assert.throws(() => K.euConsistent("allais", 2, 0)); checks += 2;
}

/* ── St. Petersburg ── */
{
  const evSeries = (W) => { let s = 0; for (let k = 1; k <= 200; k++) s += 2 ** -k * Math.min(2 ** k, W); return s; };
  for (const W of [2, 3, 100, 1024, 1025, 10000, 1e6, 1e9]) near(K.stEV(W), evSeries(W), 1e-12, `E(W=${W})`);
  ok(K.stEV(Infinity) === Infinity, "sınırsız kasa: ∞");
  // Bernoulli fiyatları: yayımlanmış (Wikipedia) değerler ve 1000 terimlik bağımsız ikiye bölme
  const ceRef = (w) => { const f = (c) => { let s = 0; for (let k = 1; k <= 1000; k++) s += 2 ** -k * Math.log(w - c + 2 ** k); return s - Math.log(w); }; let lo = 0, hi = w + 2; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (f(m) > 0) lo = m; else hi = m; } return lo; };
  for (const [w, pub] of [[1e6, 20.88], [1000, 10.95], [2, 3.35]]) { const c = K.stCE(w, 1, Infinity); abs(c, pub, 0.01, `Bernoulli w=${w}`); abs(c, ceRef(w), 1e-9, `bağımsız ikiye bölme w=${w}`); }
  // güç faydası: kasa sınırlıyken doğrudan sonlu toplamla
  for (const [w, rho, W] of [[1000, 0.5, 1e6], [10, 2, 1e4], [1e5, 3, 1e9], [2, 0.1, 100]]) {
    const u = (x) => (x ** (1 - rho) - 1) / (1 - rho), L = Math.floor(Math.log2(W));
    const f = (c) => { let s = 0; for (let k = 1; k <= L; k++) s += 2 ** -k * u(w - c + 2 ** k); return s + 2 ** -L * u(w - c + W) - u(w); };
    let lo = 0, hi = w + 2; for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (f(m) > 0) lo = m; else hi = m; }
    abs(K.stCE(w, rho, W), lo, 1e-8, `CE ρ=${rho} W=${W}`);
  }
  for (const W of [100, 1e6]) near(K.stCE(1000, 0, W), K.stEV(W), 1e-12, "ρ = 0: fiyat = beklenen değer");
  ok(K.stCE(1000, 0, Infinity) === Infinity, "ρ = 0, sınırsız: ∞");
  ok(K.stCE(1e6, 0.1, Infinity) > K.stCE(1e6, 1, Infinity) && K.stCE(1e6, 1, Infinity) > K.stCE(1e6, 2, Infinity), "ρ arttıkça fiyat düşer");
  // kesinlik eşdeğeri: kapalı biçimler
  for (const w of [2, 1000, 1e6]) { near(K.coinCE(w, 1, 1000), Math.sqrt(w * (w + 1000)) - w, 1e-9, "log: geometrik ortalama"); near(K.coinCE(w, 0.5, 1000), ((Math.sqrt(w + 1000) + Math.sqrt(w)) / 2) ** 2 - w, 1e-9, "ρ = ½"); near(K.coinCE(w, 2, 1000), 2 / (1 / w + 1 / (w + 1000)) - w, 1e-8, "ρ = 2: harmonik ortalama"); }
  near(K.coinCE(1000, 0, 1000), 500, 1e-12);
  // Monte Carlo: bağımsız üreteçle kasa sınırlı ortalama, ve sayfanın simülasyonu birkaç tohumda
  for (const W of [100, 1e4]) {
    const r = lcg(99); let s = 0; const n = 200000; for (let i = 0; i < n; i++) { let k = 1; while (r() < 0.5) k++; s += Math.min(2 ** k, W); }
    abs(s / n, K.stEV(W), 0.05 * K.stEV(W), `LCG ortalaması W=${W}`);
    for (let seed = 1; seed <= 6; seed++) { const S = K.stSimulate(20000, W, seed); ok(Math.abs(S.mean - K.stEV(W)) < 4 * S.se, `sayfa simülasyonu W=${W} tohum ${seed}`); }
  }
  const ratios = []; for (let seed = 1; seed <= 21; seed++) { const S = K.stSimulate(100000, Infinity, seed); ratios.push(S.mean / Math.log2(100000)); }
  ratios.sort((a, b) => a - b); ok(ratios[10] > 0.6 && ratios[10] < 1.6, "sınırsız: ortanca ortalama/log₂ n " + ratios[10]);
  const S = K.stSimulate(1000, Infinity, 5); ok(S.trace[S.trace.length - 1][0] === 1000 && Math.abs(S.trace[S.trace.length - 1][1] - S.mean) < 1e-12, "iz son noktası");
  assert.throws(() => K.stSimulate(0, 100, 1)); assert.throws(() => K.stEV(1)); assert.throws(() => K.stCE(-1, 1, 100)); checks += 3;
}
/* ── Bayes (mamografi) ── */
near(K.posterior(0.01, 0.8, 0.096), 0.008 / (0.008 + 0.99 * 0.096), 1e-12, "Bayes yüzde biçimi");
abs(K.MAMMO.tp / (K.MAMMO.tp + K.MAMMO.fp), 0.0777, 1e-4, "8/103 = %7,77 (Gigerenzer ve Hoffrage, Tablo 2: 7,77)");
console.log(`G ${SLUG}: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

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
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/${SLUG}.html`);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, s) => { const t = await read(id); ok(t.includes(s), `#${id} "${t}" ⊅ "${s}"`); };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, String(v));
      const sel = (id, v) => page.locator("#" + id).selectOption(String(v));
      const settle = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const pressR = async () => { await page.locator("h1").click(); await page.keyboard.press("r"); await settle(); };
      const labels = async () => { const u = await page.evaluate(() => [...document.querySelectorAll("main input, main select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.closest("label")).map((e) => e.id)); ok(u.length === 0, "etiketsiz denetim: " + u.join(",")); };
      await labels();
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvallerde role=img");
      ok(await page.evaluate(() => [...document.querySelectorAll('main input[type="range"]')].every((r) => { const v = +r.value, mn = +r.min, st = +r.step; return Math.abs((v - mn) / st - Math.round((v - mn) / st)) < 1e-6; })), "varsayılanlar adım ızgarasında");
      ok(await page.evaluate(() => !document.querySelector('main input[type="number"]')), "type=number yok");
      ok(await page.evaluate(() => Object.keys(localStorage).every((k) => /^acelya-(theme|sound-muted)$/.test(k) || !/karar|yanit|answer/i.test(k))), "yanıt anahtarı yok");
      // 1 · Seçimler
      await has("secCount", "0 / 10"); await has("secEU", "—");
      await page.click("#q-P1-1"); await has("r-P1", "%82"); await has("r-P1", "aynı"); await has("r-P1", "Beklenen değer: A için 2409");
      await page.click("#q-P2-0"); await has("chk-allais", "hiçbir fayda fonksiyonu"); await has("secEU", "1 / 1");
      await page.click("#q-P3-1"); await page.click("#q-P4-1"); await has("chk-certainty", "uygun bir fayda"); await has("secEU", "1 / 2"); await has("secModal", "3 / 4");
      ok((await page.locator("#q-P4-1").getAttribute("aria-pressed")) === "true", "seçili düğme işaretli");
      const f1 = await page.locator("#adQ1").getAttribute("data-frame");
      await page.click(`#q-${f1}-0`); ok(await page.locator("#adOther").isVisible(), "öteki çerçeve düğmesi");
      await page.click("#adOther"); const f2 = f1 === "AD1" ? "AD2" : "AD1"; await page.click(`#q-${f2}-1`);
      await has("chk-framing", "aynı sonuçlar arasında farklı"); await has("r-" + f2, f2 === "AD1" ? "%28" : "%78");
      await page.locator("#mxX").fill("abc"); await page.click("#mxGo"); ok((await page.locator("#mxX").getAttribute("aria-invalid")) === "true", "geçersiz karma kumar girdisi");
      await page.locator("#mxX").fill("150"); await page.click("#mxGo"); await has("mxOut", "λ ≈ 1,50"); await has("mxOut", "274"); await has("secCountE", "X = 150");
      // 4'te yanıtlar görünür
      await page.click("#tab-bk"); await settle();
      await has("bkMatch", "9 / 10"); await has("bkEV", "/ 10"); await has("bkYou", "/ 6"); await has("bkMxE", "senin eşiğin: 150"); await has("bkMx", "274,1");
      await has("bkStatus", "Problem 7"); await has("bkStatus", "%86"); ok((await page.locator("#bkTable [role=row]").count()) === 11, "tablo satırları");
      await has("bk-P1", "senin seçimin: B"); await has("bkW1", "0,0553"); await has("bkFix", "0,339");
      await page.click("#bkLinear"); await settle(); await has("bkStatus", "beklenen değere indirgenir"); await has("bkAOut", "1,00"); await has("bkMx", "100,0");
      await page.click("#bkTK"); await page.click("#bkNoW"); await settle(); await has("bkStatus", "kesinlik etkisi (Problem 1–4) kaybolur"); await has("bkMatch", "6 / 10");
      await page.click("#bkOnlyW"); await settle(); await has("bkStatus", "yalnız olasılık ağırlığı");
      await range("bkG", 0.3); await range("bkD", 0.3); await range("bkA", 0.3); await range("bkB", 1.2); await range("bkL", 4); await settle(); ok(!(await page.locator("#panel-bk").textContent()).includes("NaN"), "sınır değerlerde NaN yok");
      await pressR(); await has("bkGOut", "0,61"); await has("bkMatch", "9 / 10");
      await page.locator("#bkG").focus(); await page.keyboard.press("ArrowRight"); await settle(); await has("bkGOut", "0,62"); await page.click("#bkReset"); await has("bkGOut", "0,61");
      // sekme klavyesi
      await page.locator("#tab-bk").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-ok").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); ok((await page.locator("#tab-sec").getAttribute("aria-selected")) === "true", "Home");
      await pressR(); await has("secCount", "0 / 10"); ok((await page.locator("#mxX").inputValue()) === "", "R sıfırlar (1)"); ok(await page.locator("#r-P1").isHidden(), "sonuçlar gizlendi");
      await page.keyboard.press("ArrowRight"); await page.locator("#tab-sec").focus(); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-yar").getAttribute("aria-selected")) === "true", "ArrowRight");
      // 2 · Yargılar
      await page.click("#lindaTF"); await has("lindaRes", "%85"); await has("lindaRes", "142"); await has("lindaRes", "çoğunluk gibi");
      await page.click("#lindaT"); await has("lindaRes", "bağlaç kuralına uydun");
      const fmtIsP = await page.locator("#mamInP").isVisible();
      if (fmtIsP) { await has("mamQ", "%9,6"); await page.locator("#mamP").fill("7,8"); await page.click("#mamGoP"); }
      else { await has("mamQ", "990"); await page.locator("#mamH").fill("8"); await page.locator("#mamD").fill("103"); await page.click("#mamGoF"); }
      await has("mamRes", "%7,77"); await has("mamRes", "bir yüzde puan içinde"); await has("mamRes", "%16"); await has("mamRes", "%46");
      await page.click("#mamSwitch"); ok((await page.locator("#mamInP").isVisible()) === !fmtIsP && (await page.locator("#mamRes").isHidden()), "öteki biçim");
      if (!fmtIsP) { await page.locator("#mamP").fill("80"); await page.click("#mamGoP"); } else { await page.locator("#mamH").fill("9"); await page.locator("#mamD").fill("8"); await page.click("#mamGoF"); ok((await page.locator("#mamH").getAttribute("aria-invalid")) === "true", "hasta > pozitif reddedilir"); await page.locator("#mamH").fill("80"); await page.locator("#mamD").fill("100"); await page.click("#mamGoF"); }
      await has("mamRes", "72,2 yüzde puan uzakta");
      await page.click("#anStart"); const shown = await read("anShow"); ok(/^(1 × 2|8 × 7)/.test(shown), "çarpım gösterildi: " + shown);
      ok(await page.locator("#anStart").isDisabled(), "süre içinde başlat kapalı");
      await page.waitForSelector("#anIn:not([hidden])", { timeout: 9000 }); await has("anShow", "Süre doldu");
      await page.locator("#anEst").fill("40.320"); await page.click("#anGo"); await has("anRes", "1,00 katı"); await has("anRes", shown.startsWith("1") ? "artan sıra" : "azalan sıra"); await has("anRes", "2250"); await has("anRes", "40 320");
      await pressR(); ok(await page.locator("#lindaRes").isHidden() && await page.locator("#anRes").isHidden() && await page.locator("#mamRes").isHidden(), "R sıfırlar (2)");
      // 3 · Beklenen fayda
      await page.click("#tab-bf"); await settle();
      await has("bfEV", "∞"); await has("bfCE", "20,87"); await has("bfMean", "46,10"); await has("bfDiff", "ortalama / log₂ n"); await has("bfCoin", "499,88"); await has("bfRhoOut", "1,0");
      await sel("bfW", "1000000"); await settle(); await has("bfEV", "20,907"); await has("bfDiffE", "standart hata"); await has("bfStatus", "fayda kavramına gerek bırakmadan");
      await sel("bfW", "inf"); await sel("bfWealth", "1000"); await settle(); await has("bfCE", "10,95"); await has("bfCoin", "414,21");
      await sel("bfWealth", "2"); await settle(); await has("bfCE", "3,35"); await has("bfStatus", "borçlanarak");
      await page.click("#bfLin"); await settle(); await has("bfCE", "∞"); await has("bfStatus", "risk yansız"); await has("bfCoin", "500,00");
      await range("bfRho", 3); await settle(); ok(!(await page.locator("#panel-bf").textContent()).includes("NaN"), "ρ = 3 NaN yok");
      await sel("bfW", "100"); await sel("bfN", "100"); await settle(); await has("bfEV", "7,563");
      await page.click("#bfNew"); ok((await page.locator("#bfSeed").inputValue()) === "2", "yeni tohum");
      await page.locator("#bfSeed").fill("abc"); await page.locator("#bfSeed").dispatchEvent("change"); ok((await page.locator("#bfSeed").inputValue()) === "1", "geçersiz tohum 1'e döner");
      await pressR(); await has("bfCE", "20,87"); ok((await page.locator("#bfW").inputValue()) === "inf", "R sıfırlar (3)");
      // 5 · Okullar
      await page.click("#tab-ok"); await settle();
      await sel("repG-anc", "0"); await sel("repG-ego", "0"); await has("repStatus", "2 / 6");
      ok(await page.locator("#repR-ego").isHidden(), "sonuç önce gizli");
      await page.click("#repShow"); await has("repR-ego", "3531"); await has("repR-ego", "Senin tahminin: Tekrarlandı."); await has("repR-anc", "Tahminin tuttu"); await has("repR-frm", "yarısı"); await has("repStatus", "1 tanesi tuttu");
      await page.click("#repReset"); ok(await page.locator("#repR-ego").isHidden() && (await page.locator("#repG-anc").inputValue()) === "", "sekme sıfırlama (5)");
      await labels();
      for (const t of ["sec", "yar", "bf", "bk", "ok"]) { await page.click("#tab-" + t); await settle(); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${t}: yatay taşma yok`); }
      await page.click("#tab-bf"); await settle();
      ok(await page.evaluate(() => [...document.querySelectorAll("main canvas")].filter((c) => c.offsetParent).every((c) => c.width > 0)), "görünür tuvaller çizildi");
      ok(await page.evaluate(() => Object.isFrozen(DecisionLab) && !Object.getOwnPropertyDescriptor(window, "DecisionLab").writable), "çekirdek salt okunur");
      ok(!(await page.locator("main").textContent()).includes("NaN") && !(await page.locator("main").textContent()).includes("undefined"), "NaN ya da undefined yok");
      await page.waitForSelector(".digest", { state: "attached", timeout: 15000 }); await page.locator(".digest").scrollIntoViewIfNeeded();
      ok(await page.locator(".digest").isVisible(), "Keşif Defteri görünür");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
