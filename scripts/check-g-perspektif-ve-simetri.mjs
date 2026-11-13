// G · perspektif-ve-simetri.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// kaçış noktası için çok uzak noktanın doğrudan izdüşümü (sınır), merkezî izdüşümün çapraz oranı koruması,
// döşeme köşelerinin iğne delikli kamera formülüyle doğrudan izdüşümü, anamorfozda ışın–düzlem kesişiminin
// kapalı biçimleri, Wikipedia "Wallpaper group" / "Frieze group" tablolarındaki adlar, orbifold işaretleri ve
// özellikler (en yüksek döndürme, ayna), orbifold maliyetinin rasyonel toplamı, işlem tablolarının kapanışı ve
// kartezyen dikliği, döşemelerin alan dengesi, girih karolarının açı toplamları.
// Kullanım: node scripts/check-g-perspektif-ve-simetri.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "perspektif-ve-simetri";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.PerspectiveLab;
let checks = 0;
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
let seed = 11; const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const D2R = Math.PI / 180;

/* ── Kabuk ── */
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(!/fonts\.googleapis|cdn\.|<script src="https?:/.test(html), "dış betik yok");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Perspektif ve Simetri: ") && title.length <= 80, "başlık " + title.length);
ok(/<body class="app-page" data-page="perspektif-ve-simetri">/.test(html) && /<meta name="description" content="[^"]{60,}"/.test(html), "kabuk ve açıklama");
ok(/<link rel="stylesheet" href="shared\/theme\.css">/.test(html) && /<script src="shared\/app\.js"><\/script>/.test(html), "theme.css ve app.js");
ok(/viewport-fit=cover/.test(html) && /<html lang="tr" class="app-root">/.test(html), "viewport ve kök");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(html), "emoji yok");
ok(!/body\s*\{[^}]*overflow\s*:\s*hidden/.test(html) && !/type="number"/.test(html), "overflow:hidden ve type=number yok");
for (const l of ["grup-teorisi", "matris-donusumleri", "penrose-dosemesi", "altin-oran", "renk-teorisi", "mercek-isinlari"]) ok(html.includes(`href="${l}.html"`) && fs.existsSync(new URL(`../${l}.html`, import.meta.url)), "komşu bağlantı " + l);
ok(/AcelyaTouch\?\.guard\(c, pfHit\)/.test(html), "sürüklenen tuvalde dokunma koruması");

/* ── 1 · İzdüşüm ve kaçış noktaları ── */
{
  // bağımsız iğne delikli kamera: bakış eğimi p, göz başlangıçta
  const pin = (P, d, p) => { const c = Math.cos(p * D2R), s = Math.sin(p * D2R), z = P[1] * s + P[2] * c; return [d * P[0] / z, d * (P[1] * c - P[2] * s) / z]; };
  for (let t = 0; t < 300; t++) {
    const d = 0.5 + 2 * rnd(), p = -30 + 60 * rnd(), cam = K.camera(d, p);
    const P = [-3 + 6 * rnd(), -3 + 6 * rnd(), 5 + 10 * rnd()], q = K.project(P, cam), r = pin(P, d, p);
    abs(q.x, r[0], 1e-9); abs(q.y, r[1], 1e-9);
    const dir = [rnd() - 0.5, rnd() - 0.5, 0.2 + rnd()], v = K.vanish(dir, cam), far = pin([P[0] + 1e8 * dir[0], P[1] + 1e8 * dir[1], P[2] + 1e8 * dir[2]], d, p);
    abs(v.x, far[0], 1e-5 * (1 + Math.abs(v.x)), "kaçış noktası = uzak noktanın izi"); abs(v.y, far[1], 1e-5 * (1 + Math.abs(v.y)));
    // çapraz oran korunur
    const ts = [0, 1 + rnd(), 3 + rnd(), 6 + 2 * rnd()], pts = ts.map((u) => pin([P[0] + u * dir[0], P[1] + u * dir[1], P[2] + u * dir[2]], d, p));
    const cr = (a, b, c2, e) => ((c2 - a) * (e - b)) / ((c2 - b) * (e - a));
    const L = (i) => Math.hypot(pts[i][0] - pts[0][0], pts[i][1] - pts[0][1]);
    abs(cr(0, L(1), L(2), L(3)), cr(...ts), 1e-6, "çapraz oran");
    // yer noktası gidiş-dönüş
    const h = 0.3 + 3 * rnd(), G = [-2 + 4 * rnd(), -h, 4 + 8 * rnd()], g = K.project(G, cam), back = K.groundPoint(g.x, g.y, cam, h);
    abs(back[0], G[0], 1e-9); abs(back[2], G[2], 1e-9, "yer noktası");
  }
  ok(K.vanish([1, 0, 0], K.camera(1, 0)) === null && K.vanish([0, 1, 0], K.camera(1, 0)) === null, "resim düzlemine paralel: kaçış noktası yok");
  for (let t = 0; t < 60; t++) {
    const yaw = -60 + 120 * rnd(), p = -30 + 60 * rnd(), cam = K.camera(1, p), box = K.boxModel({ x: -2 + 4 * rnd(), z: 6 + 6 * rnd(), w: 2, dp: 2, ht: 2, yaw, eye: 0.5 + 3 * rnd() });
    if (Math.abs(yaw) < 1) continue;
    const m = K.measuredVP(box, cam), v = box.dirs.map((dd) => K.vanish(dd, cam));
    for (let i = 0; i < 3; i++) if (v[i]) { ok(m[i].ok, "ölçülen var " + i); abs(m[i].x, v[i].x, 1e-7 * (1 + Math.abs(v[i].x))); abs(m[i].y, v[i].y, 1e-7 * (1 + Math.abs(v[i].y))); }
    abs(v[0].x * v[1].x, -1 / Math.cos(p * D2R) ** 2, 1e-9, "x1·x2 = −d²/cos²p");
    abs(v[0].y, -Math.tan(p * D2R), 1e-9, "ufuk y = −tan p"); abs(v[1].y, -Math.tan(p * D2R), 1e-9);
  }
  const k = (yaw, p) => K.perspKind(K.boxModel({ x: 0, z: 6, w: 2, dp: 2, ht: 2, yaw, eye: 1.6 }), K.camera(1, p));
  ok(k(0, 0) === 1 && k(30, 0) === 2 && k(30, 20) === 3 && k(0, 20) === 2 && k(-45, -10) === 3, "perspektif türleri");
  abs(K.vanish([0, 1, 0], K.camera(1, 20)).y, 1 / Math.tan(20 * D2R), 1e-12, "K3 = d / tan p");
  abs(K.vanish([Math.cos(30 * D2R), 0, Math.sin(30 * D2R)], K.camera(1, 0)).x, Math.sqrt(3), 1e-12, "K1 = cot 30° = 1,732");
  assert.throws(() => K.camera(0, 0)); checks++;
}

/* ── 2 · Döşeme: köşelerin doğrudan izdüşümü ── */
{
  for (const [n, rows, d, h] of [[6, 8, 6, 2], [2, 14, 1, 0.5], [10, 14, 16, 6], [4, 12, 3.5, 2.5], [3, 9, 2, 4]]) {
    const F = K.floorConstruction(n, rows, d, h);
    for (let k = 0; k <= rows; k++) { const y = d * (-h) / (d + k); abs(F.levels[k], y, 1e-9, `düzey ${k} (n=${n})`); }
    abs(F.D.x - F.V.x, d, 1e-12, "uzaklık noktası = d");
    for (let k = 0; k + 2 <= rows; k++) { const D0 = F.levels[k + 1] - F.levels[k], D1 = F.levels[k + 2] - F.levels[k + 1]; abs(D1 / D0, K.bandRatio(k, d), 1e-9, "bant oranı"); }
    // köşegen gerçekten karo köşelerinden geçer
    for (let k = 1; k <= Math.min(n, rows); k++) { const cx = d * (-n / 2 + k) / (d + k), cy = d * (-h) / (d + k), A = F.diag[0], B = F.diag[1]; abs((B.x - A.x) * (cy - A.y) - (B.y - A.y) * (cx - A.x), 0, 1e-9, "köşegen köşeden geçer"); }
  }
  ok(K.naiveLevels(3, 2, 0.5, 0.5).join() === [-2, -1.5, -1.25, -1.125].join(), "göz kararı dizisi");
  assert.throws(() => K.floorConstruction(4, 4, 0, 1)); checks++;
}

/* ── 3 · Anamorfoz ── */
{
  for (const t of [10, 20, 35, 60, 90]) {
    const L = 1, tiny = 1e-5, a = K.anaDesign([[tiny, 0], [0, tiny], [-tiny, 0], [0, -tiny]], t, L);
    abs(Math.abs(a[1][1]), tiny * L, 1e-15, "dikey boy bozulmaz"); abs(Math.abs(a[0][0] - a[2][0]) / (2 * tiny), L / Math.sin(t * D2R), 1e-4, "yatay uzama 1/sin θ");
    const pts = []; for (let i = 0; i < 40; i++) { const u = 2 * Math.PI * i / 40; pts.push([0.1 * Math.cos(u), 0.07 * Math.sin(u)]); }
    const back = K.anaView(K.anaDesign(pts, t, 3), t, 3); pts.forEach((p, i) => { abs(back[i][0], p[0], 1e-12); abs(back[i][1], p[1], 1e-12); });
    ok(K.shapeError(pts, back) < 1e-10, "doğru noktadan sapma yok " + t);
    for (const v of [15, 45, 90]) { const tp = [[1e-5, 0], [-1e-5, 0], [0, 1e-5], [0, -1e-5]], s = K.anaView(K.anaDesign(tp, t, 1), v, 1); abs(K.aspect(s), Math.sin(v * D2R) / Math.sin(t * D2R), 1e-4, `en-boy ${t}→${v}`); }
  }
  ok(K.shapeError([[0, 0], [1, 0], [0, 1]], [[5, 5], [7, 5], [5, 7]]) < 1e-12, "benzerlik uydurması ölçek ve ötelemeyi yok sayar");
}

/* ── 4 · Simetri grupları ── */
{
  // Wikipedia "Wallpaper group" tablosu: ad, orbifold, en yüksek döndürme, ayna var mı
  const WP = { p1: ["o", 1, 0], p2: ["2222", 2, 0], pm: ["**", 1, 1], pg: ["××", 1, 0], cm: ["*×", 1, 1], pmm: ["*2222", 2, 1], pmg: ["22*", 2, 1], pgg: ["22×", 2, 0], cmm: ["2*22", 2, 1], p4: ["442", 4, 0], p4m: ["*442", 4, 1], p4g: ["4*2", 4, 1], p3: ["333", 3, 0], p3m1: ["*333", 3, 1], p31m: ["3*3", 3, 1], p6: ["632", 6, 0], p6m: ["*632", 6, 1] };
  const FR = { p1: "∞∞", p11g: "∞×", p1m1: "*∞∞", p2: "22∞", p2mg: "2*∞", p11m: "∞*", p2mm: "*22∞" };
  ok(K.WALLPAPER.length === 17 && K.WALLPAPER.every((g) => WP[g.name] && WP[g.name][0] === g.orb && WP[g.name][1] === g.rot), "17 grup, ad ve orbifold");
  ok(K.FRIEZE.length === 7 && K.FRIEZE.every((g) => FR[g.name] === g.orb), "7 şerit grubu");
  // bağımsız rasyonel maliyet: pay/payda
  const cost = (sym) => { let num = 0, den = 1, after = false; const add = (a, b) => { num = num * b + a * den; den *= b; };
    for (const ch of sym) { if (ch === "*") { add(1, 1); after = true; } else if (ch === "×") add(1, 1); else if (ch === "o") add(2, 1); else if (ch === "∞") add(after ? 1 : 2, 2); else { const n = +ch; after ? add(n - 1, 2 * n) : add(n - 1, n); } }
    return num / den; };
  for (const s of [...Object.values(WP).map((v) => v[0]), ...Object.values(FR)]) { abs(cost(s), 2, 1e-12, "maliyet 2: " + s); abs(K.orbifoldCost(s), 2, 1e-12); }
  for (const s of ["22", "*33", "632*", "44"]) ok(Math.abs(cost(s) - 2) > 0.01, "duvar kâğıdı değil: " + s);
  // işlem tablolarının kapanışı (tam sayı ötelemeye kadar) ve kartezyen diklik
  const comp = (A, B) => [A[0] * B[0] + A[1] * B[2], A[0] * B[1] + A[1] * B[3], A[2] * B[0] + A[3] * B[2], A[2] * B[1] + A[3] * B[3], A[0] * B[4] + A[1] * B[5] + A[4], A[2] * B[4] + A[3] * B[5] + A[5]];
  const same = (A, B) => A.slice(0, 4).every((v, i) => Math.abs(v - B[i]) < 1e-12) && [4, 5].every((i) => { const r = Math.abs(A[i] - B[i]) % 1; return r < 1e-9 || 1 - r < 1e-9; });
  const cellCount = { p1: 1, p2: 2, pm: 2, pg: 2, cm: 4, pmm: 4, pmg: 4, pgg: 4, cmm: 8, p4: 4, p4m: 8, p4g: 8, p3: 3, p3m1: 6, p31m: 6, p6: 6, p6m: 12 };
  for (const g of K.WALLPAPER) {
    ok(g.ops.length === cellCount[g.name], "hücredeki motif sayısı " + g.name);
    for (const A of g.ops) for (const B of g.ops) ok(g.ops.some((C) => same(comp(A, B), C)), "kapanış " + g.name);
    const Bm = K.LATTICE[g.lat];
    for (const o of g.ops) { // M_kart = B^T · M · B^{-T}
      const b = [[Bm[0][0], Bm[1][0]], [Bm[0][1], Bm[1][1]]], det = b[0][0] * b[1][1] - b[0][1] * b[1][0], bi = [[b[1][1] / det, -b[0][1] / det], [-b[1][0] / det, b[0][0] / det]];
      const M = [[o[0], o[1]], [o[2], o[3]]], mul = (X, Y) => [[X[0][0] * Y[0][0] + X[0][1] * Y[1][0], X[0][0] * Y[0][1] + X[0][1] * Y[1][1]], [X[1][0] * Y[0][0] + X[1][1] * Y[1][0], X[1][0] * Y[0][1] + X[1][1] * Y[1][1]]];
      const C = mul(mul(b, M), bi);
      abs(C[0][0] ** 2 + C[1][0] ** 2, 1, 1e-12, "diklik " + g.name); abs(C[0][0] * C[0][1] + C[1][0] * C[1][1], 0, 1e-12); abs(C[0][1] ** 2 + C[1][1] ** 2, 1, 1e-12);
    }
  }
  // kaba kuvvet bulucu: genel konumdaki motifle her grup kendini tanır; özellikler tabloyla uyuşur
  for (const g of K.WALLPAPER) for (let t = 0; t < 8; t++) {
    const W = K.wallpaper(g.name, K.MOTIFS.flag, { fx: rnd(), fy: rnd(), rot: 360 * rnd(), scale: 1 }, 5);
    const D = K.detectWallpaper(W.copies.flatMap((c) => c.pts), W.B);
    ok(D.name === g.name, `bulucu ${g.name} → ${D.name}`); ok(D.rot === WP[g.name][1] && (D.mirrors.length > 0) === Boolean(WP[g.name][2]), "özellikler " + g.name);
  }
  for (const g of K.FRIEZE) for (let t = 0; t < 8; t++) { const F = K.frieze(g.name, K.MOTIFS.flag, { fx: rnd(), fy: 0.05 + 0.3 * rnd(), rot: 360 * rnd(), scale: 1 }, 8); ok(K.detectFrieze(F.copies.flatMap((c) => c.pts)).name === g.name, "şerit " + g.name); }
  for (let n = 1; n <= 12; n++) for (const m of [false, true]) { const R = K.rosette(n, m, K.MOTIFS.flag, { fx: 0.4, fy: 0.07, rot: 33, scale: 1 }); const D = K.detectRosette(R.copies.flatMap((c) => c.pts)); ok(D.name === (m ? "D" : "C") + n && D.mirrors === (m ? n : 0), "rozet " + n); }
  // simetrik motif ek simetri getirir (sayfadaki örnek)
  const W = K.wallpaper("p4", K.MOTIFS.leaf, { fx: 0.3, fy: 0.3, rot: 315, scale: 1 }, 5); ok(K.detectWallpaper(W.copies.flatMap((c) => c.pts), W.B).name === "p4m", "yaprak p4 → p4m");
  const W2 = K.wallpaper("p4", K.MOTIFS.leaf, { fx: 0.3, fy: 0.3, rot: 320, scale: 1 }, 5); ok(K.detectWallpaper(W2.copies.flatMap((c) => c.pts), W2.B).name === "p4", "yaprak döndürülünce p4");
  assert.throws(() => K.wallpaper("p5", K.MOTIFS.flag, { fx: 0, fy: 0, rot: 0 })); assert.throws(() => K.rosette(0, false, K.MOTIFS.flag, { fx: 0, fy: 0, rot: 0 })); checks += 2;
}

/* ── 5 · Döşemeler, değen çokgenler, girih, renk ── */
{
  const area = (V) => { let a = 0; for (let i = 0; i < V.length; i++) { const p = V[i], q = V[(i + 1) % V.length]; a += p[0] * q[1] - q[0] * p[1]; } return Math.abs(a) / 2; };
  const want = { sq: "p4m", o488: "p4m", hex: "p6m", tri: "p6m" };
  for (const key of Object.keys(K.TILINGS)) {
    const T = K.TILINGS[key], cell = T.cell(), cellA = Math.abs(T.B[0][0] * T.B[1][1] - T.B[0][1] * T.B[1][0]);
    abs(cell.reduce((s, V) => s + area(V), 0), cellA, 1e-9, "alan dengesi " + key);
    for (const V of cell) for (let i = 0; i < V.length; i++) abs(Math.hypot(V[i][0] - V[(i + 1) % V.length][0], V[i][1] - V[(i + 1) % V.length][1]), 1, 1e-9, "birim kenar " + key);
    for (const th of [30, 52, 67.5]) {
      ok(K.detectWallpaper(K.segPoints(K.picPattern(key, th, 4)), T.B).name === want[key], `desen grubu ${key} ${th}`);
      for (const V of cell) { // buluşma noktası köşenin açıortayında (merkez–köşe doğrusunda)
        const c = [V.reduce((s, p) => s + p[0], 0) / V.length, V.reduce((s, p) => s + p[1], 0) / V.length], S = K.picPolygon(V, th);
        let pairs = 0; for (let i = 0; i + 1 < S.length; i++) { if (Math.hypot(S[i][1][0] - S[i + 1][0][0], S[i][1][1] - S[i + 1][0][1]) > 1e-12) continue; const A = S[i][0], X = S[i][1], B2 = S[i + 1][1]; abs(Math.hypot(X[0] - A[0], X[1] - A[1]), Math.hypot(X[0] - B2[0], X[1] - B2[1]), 1e-9, "buluşma noktası iki kenar ortasına eşit uzak (açıortay)"); abs((c[0] - X[0]) * (B2[0] - A[0]) + (c[1] - X[1]) * (B2[1] - A[1]), 0, 1e-9, "merkez de aynı dikmede"); pairs++; i++; }
        ok(pairs === V.length || S.length === V.length, "her köşede bir buluşma " + key);
      }
    }
  }
  for (const g of K.GIRIH) {
    const n = g.angles.length; ok(g.angles.reduce((a, b) => a + b, 0) === (n - 2) * 180 && g.angles.every((a) => a % 36 === 0), "girih açıları " + g.key);
    const V = K.polyFromAngles(g.angles); abs(Math.hypot(V[n - 1][0] - V[0][0], V[n - 1][1] - V[0][1]), 1, 1e-9, "girih kapanır " + g.key);
  }
  for (const [c, w] of [[true, "p3m1"], [false, "p6m"]]) { const T = K.trianglePattern(c, 6); ok(K.detectWallpaper(T.pts, T.B).name === w, "renk ölçütü " + w); }
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
      ok(await page.evaluate(() => Object.isFrozen(PerspectiveLab) && !Object.getOwnPropertyDescriptor(window, "PerspectiveLab").writable), "çekirdek salt okunur");
      // 1
      await has("pfKind", "İki kaçış noktası"); await has("pfV1", "x = 1,732 · y = 0,000"); await has("pfV1E", "fark 0 (yuvarlama düzeyinde)"); await has("pfV2", "x = −0,577"); await has("pfV3", "yok");
      await has("pfProd", "−1,0000 d²"); await has("pfFore", "1,5896"); await has("pfStatus", "ufuk çizgisi üzerindedir"); await has("pfForeE", "7,366 / 4,634");
      await page.click("#pfP3"); await settle(); await has("pfKind", "Üç kaçış noktası"); await has("pfV3", "y = 2,747"); await has("pfProd", "−1,1325 d²"); await has("pfFore", "—"); await has("pfStatus", "altındadır");
      await page.click("#pfP1"); await settle(); await has("pfKind", "Tek kaçış noktası"); await has("pfV1", "yok"); await has("pfV2", "x = 0,000 · y = 0,000"); await has("pfProd", "—");
      await range("pfYaw", 1); await settle(); await has("pfV1", "x = 57,290");
      await range("pfYaw", -60); await range("pfPitch", -30); await range("pfEye", 4); await range("pfZ", 4); await settle(); await noNaN("pf"); await has("pfStatus", "üstündedir");
      await pressR(); await has("pfV1", "x = 1,732"); ok((await page.locator("#pfZ").inputValue()) === "6", "R sıfırlar (1)");
      // sürükleme kutuyu yerde taşır
      await page.locator("#pfStage").scrollIntoViewIfNeeded(); await settle(); const box = await page.locator("#pfStage").boundingBox();
      const center = await page.evaluate(() => { const c = document.getElementById("pfStage"), r = c.getBoundingClientRect(), K = PerspectiveLab, cam = K.camera(1, 0), b = K.boxModel({ x: 0.8, z: 6, w: 2, dp: 2, ht: 2, yaw: 30, eye: 1.6 }); const q = K.project([0.8, -1.6, 6], cam), half = r.width < 520 ? 0.75 : 0.95, sc = r.width / (2 * half); void b; return { x: r.width / 2 + sc * q.x, y: r.height / 2 - sc * q.y }; });
      await page.mouse.move(box.x + center.x, box.y + center.y); await page.mouse.down(); await page.mouse.move(box.x + center.x - 30, box.y + center.y + 12, { steps: 4 }); await page.mouse.up(); await settle();
      ok((await page.locator("#pfX").inputValue()) !== "0.8" && (await page.locator("#pfZ").inputValue()) !== "6", "sürükleme konumu değiştirir");
      await page.click("#pfReset"); await has("pfXOut", "0,8 m");
      await drawn("pf");
      // sekme klavyesi
      await page.locator("#tab-pf").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-is").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-fl").getAttribute("aria-selected")) === "true", "ArrowRight"); await settle();
      // 2
      await has("flDP", "K'den 6,00 karo sağda"); await has("flErr", "0 (yuvarlama düzeyinde)"); await has("flRatio", "Δ₁/Δ₀ = 0,750"); await has("flRatioE", "Δ₇/Δ₆ = 0,857"); await has("flNaive", "0,312 karo"); await has("flFar", "14,0 karo"); await has("flQOut", "2,182 karo");
      await page.click("#flPrev"); await page.click("#flPrev"); await has("flStep", "2 / 4"); await page.click("#flAll"); await has("flStep", "4 / 4");
      await range("flD", 1); await range("flRows", 14); await range("flN", 2); await settle(); await has("flStatus", "Göz çok yakın"); await has("flErr", "0 (yuvarlama"); await noNaN("fl");
      await range("flD", 16); await range("flH", 6); await range("flR", 0.95); await settle(); await noNaN("fl");
      await range("flGuess", 5); await settle(); await has("flQOut", "Tam isabet"); await page.click("#flQNew"); await has("flQOut", "ıskalıyor"); await range("flGuess", 3); await settle(); await has("flQOut", "Tam isabet"); await page.click("#flQShow"); await has("flQOut", "Yanıt: uzaklık noktası K'den 3,0 karo");
      await pressR(); await has("flDP", "6,00 karo"); await has("flQOut", "2,182 karo");
      await drawn("fl");
      // 3
      await page.click("#tab-an"); await settle();
      await has("anStretch", "3,056 kat"); await has("anStretchE", "2,924"); await has("anAspect", "3,056 × asıl"); await has("anErr", "47,5 %");
      await page.click("#anMatch"); await settle(); await has("anStatus", "Doğru noktadasın"); await has("anAspect", "1,000 × asıl"); await has("anErr", "0,0 %");
      await range("anView", 10); await settle(); await has("anStatus", "sıkışmış");
      await sel("anShape", "grid"); await range("anSize", 30); await range("anView", 60); await settle(); await has("anStatus", "yaklaşık kural da bozuluyor"); await sel("anShape", "eye"); await range("anDesign", 90); await settle(); await noNaN("an");
      await sel("anShape", "circle"); await range("anDesign", 20); await range("anSize", 40); await settle(); await has("anStretch", "—"); await has("anStatus", "çizilemez"); await has("anAspect", "—");
      await range("anSize", 39); await settle(); await has("anStatus", "Uyarı: şeklin uzak kenarına giden ışın duvara yalnız 0,5°"); await range("anSize", 30); await settle(); await has("anStretch", "4,328 kat"); await range("anSize", 4); await settle(); await has("anStretch", "2,937 kat");
      await pressR(); await has("anStretch", "3,056 kat"); await page.click("#anFront"); await page.click("#anReset"); await has("anViewOut", "90°");
      await drawn("an");
      // 4
      await page.click("#tab-sy"); await settle();
      await has("sySel", "p4g · 4*2"); await has("syFound", "p4g · 4*2"); await has("syRotN", "4"); await has("syMir", "2 doğrultuda"); await has("syOrb", "2,000"); await has("sySelE", "8 motif");
      await sel("syGroup", "p4"); await sel("syMotif", "leaf"); await range("syX", 0.3); await range("syY", 0.3); await range("syRot", 315); await settle();
      await has("syFound", "p4m · *442"); await has("syFoundE", "daha simetrik"); await has("syStatus", "gerçek grubu p4m");
      await range("syRot", 320); await settle(); await has("syFound", "p4 · 442");
      for (const g of ["p1", "pg", "cm", "pgg", "p31m", "p6m"]) { await sel("syMotif", "flag"); await sel("syGroup", g); await settle(); await has("syFound", g + " · "); }
      await sel("syFam", "frieze"); await settle(); await has("sySel", "p2mg · 2*∞"); await has("syFound", "p2mg"); await sel("syGroup", "p11g"); await settle(); await has("syGl", "var");
      await range("syY", 0); await settle(); await noNaN("sy");
      await sel("syFam", "rosette"); await settle(); ok(await page.locator("#syN").isVisible() && !(await page.locator("#syGroup").isVisible()), "rozet denetimleri");
      await has("syFound", "C6"); await page.check("#syMirror"); await settle(); await has("syFound", "D6"); await range("syN", 1); await settle(); await has("syFound", "D1"); await has("syOrbE", "< 2");
      await pressR(); await has("sySel", "p4g · 4*2"); ok((await page.locator("#syFam").inputValue()) === "wallpaper", "R sıfırlar (4)");
      // sınav
      await page.click("#syQShow"); const ans = (await read("syQOut")).match(/Yanıt: (\S+)/)[1]; ok(Boolean(ans), "yanıt gösterildi");
      await sel("syQAns", ans); await page.click("#syQCheck"); await has("syQOut", "Doğru"); await has("syQScore", "Doğru: 0 / 0");
      await page.click("#syQNew"); await page.click("#syQHint"); await has("syQOut", "İpucu"); const wrong = ans === "p1" ? "p2" : "p1"; await sel("syQAns", wrong);
      await page.click("#syQCheck"); const t1 = await read("syQOut"); ok(/Doğru|Bir daha bak/.test(t1), "denetim yanıtı"); await has("syQScore", "/ 1");
      await sel("syQFam", "frieze"); ok((await page.locator("#syQAns option").count()) === 7, "şerit seçenekleri");
      await drawn("sy");
      // 5
      await page.click("#tab-is"); await settle();
      await has("isGroup", "p4m · *442"); await has("isStar", "8 kollu"); await has("isColourOut", "p3m1 (*333)"); ok((await page.locator("#isGirihBody tr").count()) === 5 && (await page.locator("#isGirihBody .ps-ok").count()) === 5, "girih tablosu");
      await page.uncheck("#isColourOn"); await has("isColourOut", "p6m (*632)");
      await sel("isTil", "hex"); await settle(); await has("isGroup", "p6m · *632"); await sel("isTil", "tri"); await range("isTheta", 20); await settle(); await has("isGroup", "p6m"); await sel("isTil", "sq"); await range("isTheta", 45); await settle(); await has("isStatus", "tek doğru olur"); await range("isTheta", 75); await page.check("#isCircle"); await settle(); await noNaN("is");
      await pressR(); await has("isGroup", "p4m"); await has("isColourOut", "p3m1"); ok((await page.locator("#isTil").inputValue()) === "o488", "R sıfırlar (5)");
      await drawn("is");
      await page.waitForSelector(".digest", { state: "attached", timeout: 15000 }); await page.locator(".digest").scrollIntoViewIfNeeded();
      ok(await page.locator(".digest").isVisible(), "Keşif Defteri görünür"); ok(((await page.locator(".digest").textContent()) || "").includes("K1·K2"), "defter içeriği yüklendi");
      for (const t of ["pf", "fl", "an", "sy", "is"]) { await page.click("#tab-" + t); await settle(); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${t}: yatay taşma yok`); }
      ok(!(await page.locator("main").textContent()).includes("NaN"), "NaN yok");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
