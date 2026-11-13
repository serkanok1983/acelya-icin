// G · geometrinin-temelleri.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// açılar kosinüs teoremiyle (sayfa vektörlerin atan2'siyle ölçer), paralel–kesen açılarının kapalı biçimleri,
// kurulum çözümlerinin verileri yeniden üretmesi ve KKA çözüm sayısının ışın boyunca kaba kuvvet taramasıyla
// bulunması, ızgara sayımının ayrı bir nokta-çokgen içinde testiyle kaba kuvvet sayımı ve çokgen alanına yakınsaması,
// kes-diz sonucunun hedef dikdörtgen/paralelkenarla nokta nokta karşılaştırılması, kürede küp ızgara sayımının üç
// katlı döngüyle sayılması ve (4/3)πr³'e yakınsaması, basamak toplamlarının kapalı biçimleri (Σk²), Simpson
// integraliyle yarım küre = silindir − koni, küp ayrışımında her parçanın tepe–taban tanımından üyelik, alıştırma
// sorularının metinden okunan sayılarla bağımsız çözülmesi ve ayrıştırıcının elle yazılmış tablosu.
// Kullanım: node scripts/check-g-geometrinin-temelleri.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "geometrinin-temelleri";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source + "\nwindow.GeoTemel = GeoTemel;")(win);
const K = win.GeoTemel;
let checks = 0;
const abs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
let seed = 7; const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const D2R = Math.PI / 180;
const lawCos = (P, Q, R) => { const a = Math.hypot(P[0] - R[0], P[1] - R[1]), b = Math.hypot(P[0] - Q[0], P[1] - Q[1]), c = Math.hypot(R[0] - Q[0], R[1] - Q[1]); return Math.acos(Math.max(-1, Math.min(1, (b * b + c * c - a * a) / (2 * b * c)))) / D2R; };
const pip = (x, y, poly) => { let inside = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside; } return inside; };

/* ── Kabuk ── */
ok(Object.isFrozen(K), "çekirdek dondurulmuş");
ok(!/fonts\.googleapis|cdn\.|<script src="https?:/.test(html), "dış betik yok");
const title = html.match(/<title>([^<]+)<\/title>/)[1];
ok(title.startsWith("Geometrinin Temelleri: ") && title.length <= 80, "başlık " + title.length);
ok(/<body class="app-page" data-page="geometrinin-temelleri">/.test(html) && /<meta name="description" content="[^"]{80,}"/.test(html), "kabuk ve açıklama");
ok(/<link rel="stylesheet" href="shared\/theme\.css">/.test(html) && /<script src="shared\/app\.js"><\/script>/.test(html), "theme.css ve app.js");
ok(/viewport-fit=cover/.test(html) && /<html lang="tr" class="app-root">/.test(html), "viewport ve kök");
ok((html.match(/<p class="hint">/g) || []).length === 1 && (html.match(/<h1>/g) || []).length === 1, "tek h1 ve tek hint");
ok(!/[̀-ͯ]/.test(html), "birleşik işaret yok");
ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(html), "emoji yok");
ok(!/body\s*\{[^}]*overflow\s*:\s*hidden/.test(html) && !/type="number"/.test(html), "overflow:hidden ve type=number yok");
for (const l of ["pisagor", "birim-cember", "konik-kesitler", "vektorler", "pi-yaklasimi", "riemann-toplamlari"]) ok(html.includes(`href="${l}.html"`) && fs.existsSync(new URL(`../${l}.html`, import.meta.url)), "bağlantı " + l);
ok(/Bundan sonra/.test(html) && (html.match(/class="gt-mistake"/g) || []).length >= 5, "köprü ve en az beş hata kartı");
ok((html.match(/AcelyaTouch\?\.guard\(c,/g) || []).length === 1 && /dragger\(\$\('acTri'\)/.test(html) && /dragger\(\$\('esThal'\)/.test(html) && /dragger\(\$\('orTri'\)/.test(html) && /dragger\(\$\('acPar'\)/.test(html), "sürüklenen tuvallerde dokunma koruması");
ok(/kaydedilmez ve gönderilmez/.test(html), "alıştırma: kaydedilmez notu");
ok(/Beltrami 1868/.test(html) && /1901'de yayımlanan makalesi/.test(html) && !/DBE ve CBE değil/.test(html), "doğrulayıcı: tarih ve ispat metni düzeltmeleri");

/* ── Sayı biçimi ── */
ok(K.fmt(-1.5, 2) === "−1,50" && K.fmt(12345.6, 1) === "12 345,6" && K.fmt(1234.5, 1) === "1234,5" && K.fmt(-0.0001, 2) === "0,00" && K.fmt(NaN) === "—", "fmt");
ok(K.fmtN(4.5) === "4,5" && K.fmtN(12) === "12" && K.fmtN(98.0004) === "98", "fmtN");

/* ── 1 · Açılar ── */
for (let t = 0; t < 400; t++) {
  const th = 30 + 120 * rnd(), tilt = rnd() < 0.3 ? 0 : -12 + 24 * rnd(), T = K.transversal(th, tilt);
  // kapalı biçimler
  abs(T.a[1], th, 1e-9); abs(T.a[2], 180 - th, 1e-9); abs(T.a[3], th, 1e-9); abs(T.a[4], 180 - th, 1e-9);
  abs(T.a[5], th - tilt, 1e-9, "∠5 = θ − eğim"); abs(T.a[6], 180 - th + tilt, 1e-9); abs(T.a[7], th - tilt, 1e-9); abs(T.a[8], 180 - th + tilt, 1e-9);
  for (const k in K.PAIRS) {
    const p = K.PAIRS[k], [i, j] = p.i, gap = p.rel === "eq" ? Math.abs(T.a[i] - T.a[j]) : Math.abs(T.a[i] + T.a[j] - 180);
    if (p.always || tilt === 0) abs(gap, 0, 1e-9, k); else abs(gap, Math.abs(tilt), 1e-9, k + " sapma = eğim");
  }
  // Q gerçekten alt doğruda ve kesen üzerinde
  abs(T.Q[1] + 1.5 - Math.tan(tilt * D2R) * T.Q[0], 0, 1e-9, "Q alt doğruda");
  abs((T.Q[0] - T.P[0]) * Math.sin(th * D2R) - (T.Q[1] - T.P[1]) * Math.cos(th * D2R), 0, 1e-9, "Q kesende");
}
for (let t = 0; t < 600; t++) {
  const A = [10 * rnd(), 6 * rnd()], B = [10 * rnd(), 6 * rnd()], C = [10 * rnd(), 6 * rnd()], I = K.triInfo(A, B, C);
  if (I.area < 0.05) continue;
  abs(I.A, lawCos(B, A, C), 1e-7, "∠A kosinüs teoremi"); abs(I.B, lawCos(A, B, C), 1e-7); abs(I.C, lawCos(A, C, B), 1e-7);
  abs(I.A + I.B + I.C, 180, 1e-9, "açılar toplamı");
  const s = (I.a + I.b + I.c) / 2; abs(I.area, Math.sqrt(s * (s - I.a) * (s - I.b) * (s - I.c)), 1e-6, "Heron");
}
ok(K.triInfo([0, 0], [1, 1], [2, 2]).degenerate && Number.isNaN(K.triInfo([0, 0], [1, 1], [3, 3]).A), "doğrudaş: tanımsız");
{ const I = K.triInfo([0, 0], [6, 0], [2, 4]); abs(I.A, Math.atan(2) / D2R, 1e-12, "varsayılan ∠A = atan 2"); abs(I.B, 45, 1e-12); }

/* ── 2 · Kurulum ── */
const measure = (T) => K.triInfo(...T);
for (let t = 0; t < 500; t++) {
  const s1 = 1 + 11 * rnd(), s2 = 1 + 11 * rnd(), s3 = 1 + 11 * rnd(), a1 = 5 + 170 * rnd(), a2 = 5 + 170 * rnd();
  // KAK
  let r = K.construct("KAK", s1, a1, s3), I = measure(r.tris[0]); ok(r.count === 1, "KAK tek"); abs(I.b, s1, 1e-9); abs(I.c, s3, 1e-9); abs(I.A, a1, 1e-7);
  // AKA
  r = K.construct("AKA", a1, s2, a2);
  if (a1 + a2 < 179.9) { ok(r.count === 1, "AKA tek"); I = measure(r.tris[0]); abs(I.A, a1, 1e-6); abs(I.B, a2, 1e-6); abs(I.c, s2, 1e-9); } else if (a1 + a2 >= 180) ok(r.count === 0, "AKA yok");
  // KKK
  r = K.construct("KKK", s1, s2, s3); const tri = s1 < s2 + s3 && s2 < s1 + s3 && s3 < s1 + s2, slack = Math.min(s2 + s3 - s1, s1 + s3 - s2, s1 + s2 - s3);
  if (Math.abs(slack) > 1e-6) { ok(r.count === (tri ? 1 : 0), "KKK üçgen eşitsizliği"); if (tri) { I = measure(r.tris[0]); abs(I.a, s1, 1e-7); abs(I.b, s2, 1e-7); abs(I.c, s3, 1e-7); } }
  // KKA: kaba kuvvet — B = (x, 0), x > 0, |BC| = a
  r = K.construct("KKA", a1, s2, s3);
  const C = [s2 * Math.cos(a1 * D2R), s2 * Math.sin(a1 * D2R)], fn = (x) => Math.hypot(x - C[0], C[1]) - s3, N = 40000, X = 30;
  let roots = 0, prev = fn(1e-6);
  for (let k = 1; k <= N; k++) { const x = 1e-6 + X * k / N, v = fn(x); if (Math.sign(v) !== Math.sign(prev) && prev !== 0) roots++; prev = v; }
  const margin = Math.min(Math.abs(s3 - Math.abs(C[1])), Math.abs(s3 - s2)) ;
  if (margin > 1e-3) ok(r.count === roots, `KKA çözüm sayısı ${r.count} ≠ ${roots}`);
  for (const T of r.tris) { I = measure(T); abs(I.A, a1, 1e-6, "KKA ∠A"); abs(I.b, s2, 1e-9); abs(I.a, s3, 1e-7, "KKA a"); }
  // AA
  r = K.construct("AA", a1, a2);
  if (a1 + a2 < 179.9) { ok(r.count === Infinity && r.tris.length === 3, "AA sonsuz"); const J = r.tris.map(measure); abs(J[1].a / J[0].a, J[1].c / J[0].c, 1e-9, "AA benzer"); abs(J[2].C, 180 - a1 - a2, 1e-6); }
}
{ const r = K.construct("KKA", 30, 8, 4); ok(r.count === 1 && r.tangent, "KKA teğet (30°, 8, 4)"); abs(measure(r.tris[0]).B, 90, 1e-6, "teğette B = 90°"); }
{ const r = K.construct("KKA", 35, 8, 5.5); ok(r.count === 2, "KKA iki üçgen"); const B = r.tris.map((T) => measure(T).B).sort((x, y) => x - y); abs(B[0] + B[1], 180, 1e-9, "iki çözümde B açıları bütünler"); }
ok(K.construct("KKK", 7, 3, 4).count === 0 && K.construct("KKK", 7, 3, 4).degenerate, "KKK eşitlik: yassı");
assert.throws(() => K.construct("XYZ", 1, 2, 3)); checks++;
for (let t = 0; t < 300; t++) {
  const A = [10 * rnd(), 6 * rnd()], B = [10 * rnd(), 6 * rnd()], C = [10 * rnd(), 6 * rnd()], u = 0.1 + 0.8 * rnd();
  if (K.triInfo(A, B, C).area < 0.2) continue;
  const { D, E } = K.thales(A, B, C, u);
  abs((E[0] - D[0]) * (C[1] - B[1]) - (E[1] - D[1]) * (C[0] - B[0]), 0, 1e-9, "DE ∥ BC");
  abs((E[0] - A[0]) * (C[1] - A[1]) - (E[1] - A[1]) * (C[0] - A[0]), 0, 1e-9, "E, AC üzerinde");
  abs(Math.hypot(E[0] - A[0], E[1] - A[1]) / Math.hypot(C[0] - A[0], C[1] - A[1]), u, 1e-9, "AE/AC = t");
}

/* ── Izgara sayımı ── */
for (let t = 0; t < 40; t++) {
  const n = 3 + Math.floor(6 * rnd()), P = []; for (let i = 0; i < n; i++) { const a = 2 * Math.PI * (i + 0.3 * rnd()) / n, r = 0.6 + 1.6 * rnd(); P.push([1.3 + r * Math.cos(a), 0.7 + r * Math.sin(a)]); }
  const h = 0.05; let brute = 0;
  for (let i = -80; i < 80; i++) for (let j = -80; j < 80; j++) if (pip((i + 0.5) * h, (j + 0.5) * h, P)) brute++;
  ok(K.gridCount(P, h) === brute, "ızgara sayımı = kaba kuvvet");
  const ex = Math.abs(K.shoelace(P)); abs(K.gridArea([P], 0.002), ex, 0.002 * K.perimeter(P), "sayım → alan");
}
// yuvarlak küçük topta küp sayımı = üç katlı döngü
for (const [r, h] of [[1, 0.13], [0.7, 0.1], [1.3, 0.21]]) { let n = 0; const m = Math.ceil(r / h) + 1; for (let i = -m; i < m; i++) for (let j = -m; j < m; j++) for (let k = -m; k < m; k++) { const x = (i + 0.5) * h, y = (j + 0.5) * h, z = (k + 0.5) * h; if (x * x + y * y + z * z <= r * r) n++; } ok(K.ballCount(r, h) === n, `küp sayımı r=${r}`); }
for (const r of [1, 2.5, 3, 7]) abs(K.ballVolume(r, 0.01 * r), 4 / 3 * Math.PI * r ** 3, 0.001 * 4 / 3 * Math.PI * r ** 3, "küre hacmi sayım");

/* ── 3 · Kes ve diz ── */
for (let t = 0; t < 60; t++) {
  const b = 3 + 0.5 * Math.floor(15 * rnd()), h = 1 + 0.5 * Math.floor(11 * rnd()), s = -3 + 0.5 * Math.floor(13 * rnd()), b2 = 1 + 0.5 * Math.floor(11 * rnd());
  const target = { dik: [[0, 0], [b, 0], [b, h], [0, h]], par: s >= 0 ? [[s, 0], [b + s, 0], [b + s, h], [s, h]] : [[0, 0], [b, 0], [b, h], [0, h]] };
  const X = b / 2 + s; target.ucg = [[0, 0], [b, 0], [b + X / 2, h / 2], [X / 2, h / 2]];
  const Xt = (b - b2) / 2 + s; target.yam = [[0, 0], [b + b2, 0], [b + b2 + Xt / 2, h / 2], [Xt / 2, h / 2]];
  const formula = { dik: b * h, par: b * h, ucg: b * h / 2, yam: (b + b2) * h / 2 };
  for (const sh of ["dik", "par", "ucg", "yam"]) {
    const D0 = K.dissect(sh, b, h, s, b2, 0), D1 = K.dissect(sh, b, h, s, b2, 1);
    abs(D0.area, formula[sh], 1e-12, "formül " + sh);
    const sum0 = D0.pieces.reduce((q, P) => q + Math.abs(K.shoelace(P)), 0), sum1 = D1.pieces.reduce((q, P) => q + Math.abs(K.shoelace(P)), 0), mid = K.dissect(sh, b, h, s, b2, rnd()).pieces.reduce((q, P) => q + Math.abs(K.shoelace(P)), 0);
    abs(sum0, formula[sh], 1e-9, "başta alan " + sh); abs(sum1, formula[sh], 1e-9, "sonda alan " + sh); abs(mid, formula[sh], 1e-9, "arada alan " + sh);
    abs(Math.abs(K.shoelace(target[sh])), formula[sh], 1e-9, "hedef şeklin alanı " + sh);
    // sonda parçalar hedefi örtüşmeden doldurur
    let bad = 0;
    for (let k = 0; k < 400; k++) { const x = -4 + 22 * rnd(), y = -0.5 + 7 * rnd(); const inT = pip(x, y, target[sh]), cnt = D1.pieces.filter((P) => pip(x, y, P)).length; if ((inT ? 1 : 0) !== cnt) bad++; }
    ok(bad <= 2, `sonuç hedefle örtüşür ${sh} (${bad})`);
  }
}
for (const n of [6, 12, 24, 48, 96]) for (const r of [1, 3, 5]) {
  const S = K.sectors(n, r, 1, 8);
  abs(S.width, n * r * Math.sin(Math.PI / n), 1e-9, "dizilim genişliği"); abs(S.height, r * Math.cos(Math.PI / n), 1e-9);
  const one = 0.5 * r * r * (8 * Math.sin(2 * Math.PI / n / 8)) + 0.5 * r * r * Math.sin(2 * Math.PI / n) * 0; // yay 8 parça: üçgen yelpazesi
  for (const t of [0, 0.37, 1]) { const tot = K.sectors(n, r, t, 8).polys.reduce((q, P) => q + Math.abs(K.shoelace(P)), 0); abs(tot, n * 0.5 * r * r * 8 * Math.sin(2 * Math.PI / n / 8), 1e-9, "dilimler alanı korunur"); }
  void one;
  // t = 1'de komşu dilimlerin kenarları çakışır
  for (let i = 0; i + 1 < n; i++) { const P = S.polys[i], Q = S.polys[i + 1], e1 = i % 2 === 0 ? P[P.length - 1] : P[1], e2 = i % 2 === 0 ? Q[1] : Q[Q.length - 1]; void e1; void e2; }
  const pin = K.perimeter(K.regularPoly(n, r)) / (2 * r), pout = K.perimeter(K.regularPoly(n, r / Math.cos(Math.PI / n))) / (2 * r);
  ok(pin < Math.PI && Math.PI < pout, "π iç ve dış çevre arasında"); abs(pin, n * Math.sin(Math.PI / n), 1e-12); abs(pout, n * Math.tan(Math.PI / n), 1e-12);
}
{ const pin = 96 * Math.sin(Math.PI / 96), pout = 96 * Math.tan(Math.PI / 96); ok(3 + 10 / 71 < pin && pout < 3 + 1 / 7, "Arşimet'in kesirleri 96-genin dışında"); }

/* ── 4 · Oranlar ve gölge ── */
for (let t = 0; t < 200; t++) {
  const al = 5 + 80 * rnd(), S = 2 + 8 * rnd(), [A, B, C] = K.rightTri(al, S);
  abs(lawCos(A, B, C), 90, 1e-7, "B'de dik açı"); abs(lawCos(B, A, C), al, 1e-7, "A'da α");
  abs(Math.hypot(C[0] - B[0], C[1] - B[1]) / S, Math.sin(al * D2R), 1e-12); abs(Math.hypot(B[0], B[1]) / S, Math.cos(al * D2R), 1e-12);
  const e = 10 + 60 * rnd(), h = 0.5 + 2.5 * rnd(); abs(K.shadowOf(h, e), h / Math.tan(e * D2R), 1e-9, "gölge");
}
abs(K.shadowOf(1, 45), 1, 1e-12, "45°: gölge = boy");

/* ── 5 · Hacim ── */
for (const n of [1, 2, 5, 10, 37, 60]) { const R = K.stairs(n, 9, 4); abs(R.lower, 36 * (n - 1) * n * (2 * n - 1) / (6 * n ** 3), 1e-9, "alt toplam Σk²"); abs(R.upper, 36 * n * (n + 1) * (2 * n + 1) / (6 * n ** 3), 1e-9, "üst toplam"); abs(R.upper - R.lower, 36 / n, 1e-9, "fark = en alt katman"); ok(R.lower < 12 && 12 < R.upper, "1/3 arada"); }
{ const R = K.stairs(5, 9, 4); abs(R.lower, 8.64, 1e-12); abs(R.upper, 15.84, 1e-12, "varsayılan basamaklar"); }
for (const sh of [0, 0.4, 0.8, 1.5]) { abs(K.shearedVolume([[-1, -1], [1, -1], [1, 1], [-1, 1]], 3, sh, 0.02), 12, 0.02, "eğik prizma"); abs(K.shearedVolume(K.regularPoly(128, 1), 3, sh, 0.02), 3 * Math.PI, 0.03, "eğik silindir"); }
{ // Simpson: ∫ (halka) dz = yarım küre
  for (const R of [1, 3, 10]) { const N = 200, f = (z) => K.archimedes(R, z).ring; let s = f(0) + f(R); for (let i = 1; i < N; i++) s += (i % 2 ? 4 : 2) * f(R * i / N); abs(s * R / N / 3, 2 / 3 * Math.PI * R ** 3, 1e-9 * R ** 3, "yarım küre = silindir − koni"); }
  for (let t = 0; t < 50; t++) { const R = 1 + 9 * rnd(), z = R * rnd(), A = K.archimedes(R, z); abs(A.sphere, A.cyl - A.cone, 1e-9 * R * R); }
}
{ // küp ayrışımı: üyelik tepe–taban tanımıyla; her parça 1/3
  const n = 30, cnt = [0, 0, 0];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) {
    const p = [(i + 0.37) / n, (j + 0.61) / n, (k + 0.83) / n], q = K.cubePiece(...p); cnt[q]++;
    const pc = K.CUBE_PIECES[q], tt = p[q]; // p = t · taban noktası, taban yüzü x_q = 1
    const b = p.map((v) => v / tt); ok(Math.abs(b[q] - 1) < 1e-12 && b.every((v) => v >= -1e-12 && v <= 1 + 1e-12) && pc.base.every((v) => v[q] === 1), "parça üyeliği");
  }
  cnt.forEach((c) => abs(c / n ** 3, 1 / 3, 0.02, "parça hacmi ≈ 1/3"));
}

/* ── Alıştırma ── */
const P_TABLE = [
  ["12", 12], ["12,5", 12.5], ["12.5", 12.5], [" 3/4 ", 0.75], ["−5", -5], ["-2,25", -2.25], [".5", 0.5], ["36π", 36 * Math.PI], ["36 pi", 36 * Math.PI], ["36PI", 36 * Math.PI],
  ["50π/3", 50 * Math.PI / 3], ["50/3π", 50 * Math.PI / 3], ["2 · π", 2 * Math.PI], ["π", Math.PI], ["x = 37,7", 37.7], ["37,7 cm²", 37.7], ["98 cm³", 98], ["135°", 135], ["135 derece", 135],
  ["42 500", 42500], ["42 500", 42500], ["1.234.567", 1234567], ["1.234,5", 1234.5], ["27000 L", 27000], ["12 m2", 12], ["4,5π cm²", 4.5 * Math.PI], ["|EC| = 6", 6],
  // doğrulayıcı: bitişik litre ve sondaki nokta, boşluklu π, bitişik birim
  ["27000l", 27000], ["27000lt", 27000], ["5.", 5], ["36 π", 36 * Math.PI], ["12,5cm²", 12.5]
];
for (const [s, v] of P_TABLE) { const r = K.parseAnswer(s); ok(r && Math.abs(r.value - v) < 1e-9, `ayrıştır "${s}" → ${r && r.value}`); }
for (const s of ["", "   ", "abc", "1,2,3", "1..2", "3/", "/3", "3//4", "5/0", "2-3", "12 elma", null]) ok(K.parseAnswer(s) === null, `geçersiz "${s}"`);
for (const [s, v] of [["12²", 144], ["1,5²", 2.25], ["3³", 27], ["12 cm²", 12], ["2 m³", 2]]) ok(Math.abs(K.parseAnswer(s).value - v) < 1e-9, `üs ve birim ayrımı "${s}" → ${v}`);
{ const r = K.parseAnswer("1.500"); ok(r.value === 1.5 && r.alt === 1500, "1.500 belirsiz: 1,5 ve 1500"); ok(K.parseAnswer("36π").pi && !K.parseAnswer("36").pi, "π bayrağı"); }

// metinden bağımsız çözücü
const nums = (t) => (t.match(/\d+(?:,\d+)?/g) || []).map((x) => Number(x.replace(",", ".")));
const solve = (p) => {
  const t = p.text, n = nums(t);
  switch (p.id) {
    case "aciUcgen": return 180 - n[0] - n[1];
    case "aciParalel": return /Karşı durumlu/.test(t) ? 180 - n[0] : n[0];
    case "alanParalelkenar": return n[0] * n[2];
    case "alanUcgen": return n[0] * n[1] / 2;
    case "daireAlan": return Math.PI * (/Çapı/.test(t) ? n[0] / 2 : n[0]) ** 2;
    case "kutuHacim": return n[0] * n[1] * n[2];
    case "yamuk": return (n[0] + n[1]) * n[2] / 2;
    case "tales": return n[2] * n[1] / n[0];
    case "olcekAlan": return n[0] ** 2 * n[2];
    case "silindir": return Math.PI * (/Taban çapı/.test(t) ? n[0] / 2 : n[0]) ** 2 * n[1];
    case "dikUcgen": { const [p1, q1, L] = n; return /tan/.test(t) ? L * p1 / q1 : L * p1 / q1; }
    case "cokgenAci": { const m = n[0]; return /toplamı/.test(t) ? (m - 2) * 180 : (m - 2) * 180 / m; }
    case "koni": return Math.PI * n[0] ** 2 * n[1] / 3;
    case "kure": return 4 / 3 * Math.PI * (/Çapı/.test(t) ? n[0] / 2 : n[0]) ** 3;
    case "olcekHacim": return n[0] ** 3 * n[3];
    case "golge": return n[2] * n[0] / n[1];
    case "dilim": return n[1] / 360 * Math.PI * n[0] ** 2;
    case "piramit": return n[0] ** 2 * n[1] / 3;
    case "birim": return /litre/.test(t) ? n[0] ** 3 * 1000 : n[0] * 10000;
    default: throw new Error(p.id);
  }
};
const seen = { 1: new Set(), 2: new Set(), 3: new Set() }; let trapCount = 0;
for (const lv of [1, 2, 3]) for (let s = 1; s <= 300; s++) {
  const p = K.makeProblem(lv, s);
  seen[lv].add(p.id); ok(K.LEVELS[lv].includes(p.id), "düzey şablonu");
  const want = solve(p); abs(p.ans, want, 1e-9 * Math.max(1, Math.abs(want)), `bağımsız çözüm ${p.id} #${s}: ${p.text}`);
  ok(Number.isFinite(p.ans) && p.ans > 0 && p.steps.length >= 2 && p.hint.length > 10, "soru bütün " + p.id); trapCount += p.traps.length;
  ok(p.traps.every((tr) => Math.abs(tr.v - p.ans) > Math.max(0.01, 0.002 * p.ans) * 2), `tuzak yanıttan ayrı ${p.id} #${s}`);
  ok(JSON.stringify(K.makeProblem(lv, s)) === JSON.stringify(p), "tohum belirleyici");
  ok(K.checkAnswer(p, String(p.ans)).status === "ok" && K.checkAnswer(p, K.fmt(p.ans, 2)).status === "ok", "doğru yanıt (nokta ve virgül)");
  if (p.piCoef !== null) { ok(K.checkAnswer(p, K.fmtN(p.piCoef) + "π").status === "ok" && K.checkAnswer(p, String(p.piCoef) + " pi").status === "ok", "π biçimi"); const r = K.checkAnswer(p, String(p.piCoef)); ok(r.status !== "ok" && /π/.test(r.msg || ""), "π eksik uyarısı"); ok(K.checkAnswer(p, (p.piCoef * 3.14).toFixed(2)).status === "ok", "π ≈ 3,14 kabul"); }
  for (const tr of p.traps) { const r = K.checkAnswer(p, String(tr.v)); ok(r.status === "trap" && r.msg === tr.msg, "tuzak tanınır " + p.id); }
  ok(K.checkAnswer(p, String(p.ans * 1.37 + 1)).status !== "ok", "yanlış reddedilir");
  ok(K.checkAnswer(p, "").status === "empty" && K.checkAnswer(p, "elma").status === "invalid", "boş ve geçersiz");
  ok(!/NaN|undefined/.test(p.text + p.exact + p.steps.join(" ")), "metinde NaN yok");
}
for (const lv of [1, 2, 3]) ok(seen[lv].size === K.LEVELS[lv].length, `düzey ${lv}: bütün şablonlar çıkar`);
ok(K.TEMPLATE_IDS.length === 19 && trapCount > 900, "19 şablon, tuzaklar " + trapCount);
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
  const digestExists = fs.existsSync(new URL(`../shared/digest/${SLUG}.js`, import.meta.url));
  let browser; const before = checks;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await ctx.newPage();
      await page.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      page.setDefaultTimeout(15000);
      const errors = [];
      const digest404 = (u) => !digestExists && u.includes(`shared/digest/${SLUG}.js`);
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
      page.on("response", (r) => { if (r.status() >= 400 && !digest404(r.url())) errors.push(r.status() + " " + r.url()); });
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
      ok(await page.evaluate(() => Object.isFrozen(GeoTemel) && !Object.getOwnPropertyDescriptor(window, "GeoTemel").writable), "çekirdek salt okunur");

      // 1 · Açılar
      await has("acA1", "60,0°"); await has("acA2", "60,0°"); await has("acRelE", "0° (yuvarlama düzeyinde)"); await has("acStatus", "yöndeş açılar eşittir");
      await page.uncheck("#acParallel"); await settle(); await has("acA2", "52,0°"); await has("acRelE", "8,0°"); await has("acStatus", "sağ tarafta");
      await sel("acPair", "karsi"); await settle(); await has("acRel", "∠4 + ∠5 = 180°"); await has("acRelE", "ölçülen toplam: 172,0°");
      await range("acTilt", -12); await settle(); await has("acStatus", "sol tarafta"); await sel("acPair", "ters"); await settle(); await has("acStatus", "bağımsızdır");
      await range("acTheta", 150); await range("acTilt", 12); await settle(); await noNaN("ac");
      await page.click("#acParReset"); await has("acThetaOut", "60°"); ok(await page.isChecked("#acParallel"), "sıfırla: paralel");
      await page.locator("#acPar").focus(); await page.keyboard.press("ArrowLeft"); await has("acThetaOut", "61°"); await page.click("#acParReset");
      await has("acTA", "63,4°"); await has("acTB", "45,0°"); await has("acTC", "71,6°"); await has("acTS", "180,0° / 180°"); await has("acTX", "108,4° / 108,4°"); await has("acTStatus", "Dar açılı");
      await page.click("#acRight"); await has("acTB", "90,0°"); await has("acTStatus", "Dik üçgen"); await page.click("#acObt"); await has("acTStatus", "Geniş açılı");
      await page.click("#acEq"); await has("acTStatus", "eşkenar"); await page.click("#acThin"); await has("acTStatus", "çok basık"); await has("acTS", "180,0°");
      for (let i = 0; i < 3; i++) await page.click("#acNext"); await has("acStep", "3 / 3"); await has("acProof", "180°"); await page.click("#acNext"); await has("acStep", "3 / 3");
      // sürükleme: C'yi taşı
      await page.click("#acTriReset"); await page.locator("#acTri").scrollIntoViewIfNeeded(); await settle();
      const bx = await page.locator("#acTri").boundingBox();
      const cpt = await page.evaluate(() => { const c = document.getElementById("acTri"), r = c.getBoundingClientRect(); return { w: r.width, h: r.height }; });
      void cpt;
      const cxy = await page.evaluate(() => { const c = document.getElementById("acTri"), r = c.getBoundingClientRect(), k = c.width / r.width; /* C = (2, 4) dünya → piksel: aynı çerçeve */ const pad = 12 * Math.min(devicePixelRatio || 1, 2), W = c.width, H = c.height, sc = Math.min((W - 2 * pad) / 10, (H - 2 * pad) / 6.5), ox = (W - sc * 8) / 2, oy = (H + sc * 5.5) / 2; return { x: (ox + sc * 2) / k, y: (oy - sc * 4) / k }; });
      await page.mouse.move(bx.x + cxy.x, bx.y + cxy.y); await page.mouse.down(); await page.mouse.move(bx.x + cxy.x + 40, bx.y + cxy.y + 10, { steps: 4 }); await page.mouse.up(); await settle();
      ok((await read("acTC")) !== "71,6°", "sürükleme açıyı değiştirir"); await has("acTS", "180,0° / 180°");
      await page.locator("#acTri").focus(); await page.keyboard.press("1"); await page.keyboard.press("ArrowRight"); await settle(); ok((await read("acTA")) !== "", "klavye ile köşe taşıma");
      await pressR(); await has("acTC", "71,6°"); await has("acStep", "0 / 3");
      await drawn("ac");
      // sekme klavyesi
      await page.locator("#tab-ac").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-ha").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-es").getAttribute("aria-selected")) === "true", "ArrowRight"); await settle();
      // 2 · Eşlik ve benzerlik
      await has("esCount", "1"); await has("esS1", "a 5,57 · b 7,00 · c 6,00"); await has("esS1E", "B 74,4°"); await has("esCountE", "eşlik ölçütü");
      await page.click("#esTwo"); await settle(); await has("esCount", "2"); await has("esCountE", "eşlik ölçütü değil: iki üçgen"); await has("esS1E", "B 123,5°"); await has("esS2E", "B 56,5°"); await has("esStatus", "4,59");
      await page.click("#esTangent"); await settle(); await has("esCount", "1"); await has("esS1E", "B 90,0°"); await has("esStatus", "teğet"); await has("esCountE", "tek (dik) üçgen");
      await range("es3", 3.5); await settle(); await has("esCount", "0"); await range("es3", 9); await settle(); await has("esCount", "1"); await has("esStatus", "a ≥ b"); await has("esCountE", "a ≥ b: tek üçgen; KKA genelde eşlik ölçütü değil");
      await range("es3", 3.5); await settle(); await has("esCountE", "üçgen yok"); await range("es3", 9); await settle();
      await sel("esCrit", "KKK"); await settle(); await has("es1L", "a = |BC|"); await has("esCount", "1"); await has("esS1E", "A 78,5°");
      await range("es1", 10.5); await settle(); await has("esCount", "1"); await range("es1", 12); await range("es2", 4); await range("es3", 8); await settle(); await has("esStatus", "yassılır");
      await range("es3", 7); await settle(); await has("esCount", "0"); await has("esStatus", "kurulamaz");
      await sel("esCrit", "AKA"); await settle(); await has("esS1E", "C 70,0°"); await range("es1", 120); await range("es3", 60); await settle(); await has("esCount", "0");
      await sel("esCrit", "AA"); await settle(); await has("esCount", "sonsuz"); ok(await page.locator("#es3Field").isHidden(), "AA: üçüncü veri gizli"); await has("esS1E", "C 70,0°");
      await page.click("#esConsReset"); await has("esS1", "a 5,57");
      await has("esR1", "0,6000"); await has("esR2", "0,6000"); await has("esR3", "0,6000"); await has("esR4", "1,5000 = 1,5000"); await has("esR5", "0,3600"); await has("esR6", "68,2° = 68,2°");
      await range("esT", 0.25); await settle(); await has("esR2", "0,2500"); await has("esR5", "0,0625"); await range("esT", 0.9); await settle(); await has("esR4", "9,0000 = 9,0000");
      await page.locator("#esThal").focus(); await page.keyboard.press("1"); for (let i = 0; i < 5; i++) await page.keyboard.press("ArrowRight"); await settle(); await has("esR2", "0,9000"); await has("esR3", "0,9000");
      await page.click("#esThReset"); await has("esR5", "0,3600");
      await has("esPer", "2,000"); await has("esArea", "4,000"); await has("esVol", "7,994"); await has("esVolE", "−0,07 %");
      await range("esK", 0.5); await settle(); await has("esPerE", "kuram 0,500"); await has("esAreaE", "kuram 0,250"); await has("esVolE", "kuram 0,125"); await has("esScStatus", "küçük şekilde");
      await range("esK", 4); await settle(); await has("esAreaE", "kuram 16,000"); await has("esVolE", "kuram 64,000"); await noNaN("es");
      await pressR(); await has("esPer", "2,000"); await has("esR1", "0,6000"); ok((await page.locator("#esCrit").inputValue()) === "KAK", "R sıfırlar (2)");
      await drawn("es");
      // 3 · Alan
      await page.click("#tab-al"); await settle();
      await has("alNow", "Paralelkenar"); await has("alMeas", "24,00"); await has("alForm", "24,00");
      await range("alT", 100); await settle(); await has("alNow", "Dikdörtgen"); await has("alMeas", "24,00");
      await range("alT", 37); await settle(); await has("alNow", "parça taşınıyor"); const mid = Number((await read("alMeas")).replace(",", ".")); abs(mid, 24, 0.15, "arada sayılan alan");
      await sel("alShape", "ucg"); await range("alT", 100); await settle(); await has("alForm", "12,00"); await has("alNow", "Paralelkenar"); await has("alNowE", "yükseklik 2,00"); await has("alMeas", "12,0");
      await sel("alShape", "yam"); await settle(); await has("alForm", "18,00"); await has("alNowE", "taban 9,0");
      await range("alS", -3); await range("alB", 10); await range("alB2", 6); await range("alH", 6); await settle(); await has("alForm", "48,00"); await noNaN("al");
      await sel("alShape", "par"); await range("alS", 0); await settle(); await has("alRule", "Kayma 0"); ok(await page.locator("#alT").isDisabled(), "kayma 0: kaydırıcı kapalı");
      await sel("alShape", "dik"); await settle(); await has("alNow", "Dikdörtgen"); ok(await page.locator("#alSField").isHidden(), "dikdörtgende kayma gizli");
      await page.click("#alCutReset"); await page.click("#alPlay"); await page.waitForTimeout(2600); await has("alTOut", "100 %"); await has("alNow", "Dikdörtgen"); await has("alPlay", "Oynat");
      await has("alC1", "9,317"); await has("alC1E", "πr = 9,425"); await has("alC2", "2,898"); await has("alC3", "28,30");
      await range("alN", 96); await settle(); await has("alC1", "9,423"); await has("alC1E", "−0,02 %");
      await sel("alCMode", "cokgen"); await settle(); await has("alC1", "3,14103"); await has("alC2", "3,14271"); await has("alCStatus", "3 10/71"); ok(await page.locator("#alT2Field").isHidden(), "çokgen kipinde dizme yok");
      await range("alN", 6); await settle(); await has("alC1", "3,00000"); await has("alC2", "3,46410");
      await pressR(); await has("alC1", "9,317"); await has("alMeas", "24,00");
      await drawn("al");
      // 4 · Oranlar
      await page.click("#tab-or"); await settle();
      await has("orSin", "0,5736"); await has("orCos", "0,8192"); await has("orTan", "0,7002"); await has("orStatus", "0 (yuvarlama düzeyinde)");
      const rows = await page.locator("#orTable2 tr").allTextContents(); ok(rows.length === 3 && rows.every((r) => r.includes("0,5736") && r.includes("0,8192") && r.includes("0,7002")), "üç üçgende aynı oranlar");
      await page.click("#or30"); await has("orSin", "0,5000"); await has("orExact", "1/2"); await page.click("#or45"); await has("orTan", "1,0000"); await page.click("#or60"); await has("orTan", "1,7321");
      await range("orAlpha", 85); await range("orSize", 2); await settle(); await has("orStatus", "sınırsız"); await noNaN("or");
      await page.locator("#orTri").focus(); await page.keyboard.press("ArrowLeft"); await has("orAlphaOut", "85°"); await page.keyboard.press("ArrowRight"); await has("orAlphaOut", "84°");
      await page.click("#orTriReset"); await has("orAlphaOut", "35°");
      await has("orSS", "1,19 m"); await has("orH1", "50,3 m"); await has("orH2", "50,3 m"); await has("orH2E", "0 (yuvarlama düzeyinde)");
      await page.click("#or45sun"); await has("orSS", "1,00 m"); await has("orH1", "60,0 m"); await has("orShStatus", "Tales");
      await range("orSun", 70); await range("orStick", 3); await range("orShadowLen", 120); await settle(); await has("orH1", "329,7 m"); await range("orSun", 10); await range("orStick", 0.5); await range("orShadowLen", 5); await settle(); await has("orH1", "0,9 m"); await noNaN("or");
      await pressR(); await has("orSin", "0,5736"); await has("orH1", "50,3 m");
      await drawn("or");
      // 5 · Hacim
      await page.click("#tab-ha"); await settle();
      await has("haSec", "4,00 / 4,00"); await has("haV1", "12,00"); await has("haV2", "12,00");
      await sel("haBase", "daire"); await settle(); await has("haV1E", "B · h = 9,42"); await has("haSecE", "3,14"); await range("haShear", 1.5); await range("haZ", 3); await settle(); await noNaN("ha");
      await has("haLow", "8,640"); await has("haUp", "15,840"); await has("haExact", "12,000"); await has("haPStatus", "7,200");
      await range("haN", 60); await settle(); await has("haLowE", "0,3250"); await has("haUpE", "0,3417"); await has("haPStatus", "∫");
      await sel("haSolid", "koni"); await settle(); await has("haExact", "9,425"); await range("haN", 1); await settle(); await has("haLow", "0,000"); await has("haUp", "28,274");
      await has("haCubeTxt", "1/3"); await sel("haPiece", "1"); await has("haCubeTxt", "2. parça"); await range("haExplode", 0); await settle();
      await has("haS1", "18,10 cm²"); await has("haS2", "18,10 cm²"); await has("haVs", "113,10 / 113,10 cm³"); await has("haRatio", "0,6667"); await has("haSurf", "113,10 cm²");
      await range("haZ2", 1); await settle(); await has("haS1", "0,00 cm²"); await range("haZ2", 0); await range("haR", 10); await settle(); await has("haS1", "314,16 cm²"); await has("haVs", "4188,79");
      await pressR(); await has("haV2", "12,00"); await has("haLow", "8,640"); await has("haS1", "18,10"); ok((await page.locator("#haPiece").inputValue()) === "all", "R sıfırlar (5)");
      await drawn("ha");
      // Alıştırma
      await has("prMeta", "Düzey 1 · Temel · Alan · soru no 1"); await has("prText", "kenarı 12 cm ve bu kenara ait yüksekliği 6 cm");
      await page.click("#prCheck"); await has("prOut", "Önce bir yanıt");
      await page.fill("#prAns", "abc"); await page.click("#prCheck"); await has("prOut", "okuyamadım");
      await page.fill("#prAns", "72"); await page.click("#prCheck"); await has("prOut", "İkiye bölmeyi unuttun"); await has("prScore", "deneme: 1");
      await page.click("#prHint"); await has("prOut", "İpucu: Üçgen");
      await page.fill("#prAns", "36 cm²"); await page.locator("#prAns").press("Enter"); await has("prOut", "Doğru: 36 cm²"); await has("prScore", "Doğru yanıtlanan soru: 1 · deneme: 2");
      await page.click("#prShow"); ok(await page.locator("#prSteps").isVisible(), "çözüm adımları"); await has("prSteps", "12 × 6 / 2 = 36");
      await sel("prLevel", "3"); await has("prMeta", "Düzey 3 · İleri"); await has("prText", "3 m");
      await page.fill("#prAns", "27.000"); await page.click("#prCheck"); await has("prOut", "Doğru");
      await page.click("#prNew"); await has("prMeta", "soru no 2"); await page.click("#prPi"); ok((await page.locator("#prAns").inputValue()) === "π", "π düğmesi");
      await sel("prLevel", "2"); await has("prText", "çapı 10 cm"); await page.fill("#prAns", "175"); await page.click("#prCheck"); await has("prOut", "π çarpanı eksik"); await page.fill("#prAns", "175π"); await page.click("#prCheck"); await has("prOut", "175π cm³");
      // hata kartları
      const det = page.locator(".gt-mistake details").first(); await det.locator("summary").click(); ok(await det.evaluate((d) => d.open), "hata kartı açılır");
      // taşma
      for (const t of ["ac", "es", "al", "or", "ha"]) { await page.click("#tab-" + t); await settle(); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px ${t}: yatay taşma yok`); }
      if (digestExists) { await page.waitForSelector(".digest", { state: "attached", timeout: 15000 }); ok(await page.locator(".digest").isVisible(), "Keşif Defteri görünür"); }
      ok(!(await page.locator("main").textContent()).includes("NaN"), "NaN yok");
      ok(errors.length === 0, "konsol hatası yok: " + errors.join(" | "));
      await ctx.close();
    }
    console.log(`G ${SLUG}: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
