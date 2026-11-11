// G · serbest-dusme.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur; başvurular sayfanın formüllerini YENİDEN KULLANMAZ:
// kapalı biçimler burada ayrıca yazılır, enerji korunumu ve çok küçük adımlı açık Euler çapraz denetimi yapılır.
// Kullanım: node scripts/check-g-serbest-dusme.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../serbest-dusme.html", import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.FallLab;
let checks = 0;
const near = (actual, expected, tol = 1e-9, label = "") => {
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= tol * Math.max(1, Math.abs(expected)), `${label} ${actual} ≠ ${expected} (tol ${tol})`);
  checks++;
};
const ok = (cond, label) => { assert(cond, label); checks++; };

/* ── Sabitler: açılan kaynaklardaki değerler ── */
near(K.BODIES.earth.g, 9.80665, 0); near(K.BODIES.moon.g, 1.62, 0); near(K.BODIES.mars.g, 3.73, 0); near(K.BODIES.jupiter.g, 23.12, 0);
near(K.RHO_AIR, 1.225, 0); near(K.MU_AIR, 1.7894e-5, 0);
ok(Object.isFrozen(K) && Object.isFrozen(K.BODIES) && Object.isFrozen(K.theory), "çekirdek dondurulmuş olmalı");

/* ── 1. Boşluk: kapalı biçimler, enerji korunumu, tek sayılar ── */
for (const g of [1.62, 3.73, 9.80665, 23.12]) for (const h of [1, 1.6, 20, 77.5, 200]) for (const v0 of [-30, -4.5, 0, 0.5, 12, 30]) for (const every of [0.05, 0.25, 1]) {
  const p = K.body({ g }), r = K.run(p, h, v0, every), s = r.end;
  const T = (v0 + Math.sqrt(v0 * v0 + 2 * g * h)) / g, vImp = Math.sqrt(v0 * v0 + 2 * g * h);
  near(s.t, T, 1e-10, "T"); near(-s.v, vImp, 1e-10, "v"); near(s.q, 0, 0, "q");
  near(0.5 * s.v * s.v, 0.5 * v0 * v0 + g * h, 1e-10, "enerji");
  if (v0 > 0) { near(s.apex.y, h + v0 * v0 / (2 * g), 1e-10, "tepe"); near(s.apex.t, v0 / g, 1e-9, "tepe anı"); } else ok(s.apex === null, "tepe yok");
  ok(r.marks.length === Math.floor(T / every + 1e-9) + 1, "iz sayısı");
  for (const m of r.marks) near(m.y, Math.max(0, h + v0 * m.t - 0.5 * g * m.t * m.t), 1e-9, "iz");
  const ga = K.galileo(r.marks);
  for (const d2 of ga.second) near(d2, g * every * every, 1e-7, "ikinci fark");
  if (v0 === 0) ga.ratios.forEach((x, i) => near(x, 2 * i + 1, 1e-8, "tek sayı"));
}
{ // varsayılan durum
  const r = K.run(K.body({ g: 9.80665 }), 20, 0, 0.25);
  near(r.end.t, 2.019620, 1e-6); near(-r.end.v, 19.805706, 1e-6); ok(r.marks.length === 9, "9 iz");
  near(K.galileo(r.marks).d[0], 0.5 * 9.80665 * 0.0625, 1e-10);
}

/* ── 2. Parabol uyumu ve g ölçümü ── */
{
  const ts = [0, 0.3, 0.7, 1.1, 1.9, 2.4, 3.3], f = K.fitQuad(ts, ts.map(t => 4.25 - 1.5 * t + 0.875 * t * t));
  near(f.a, 4.25, 1e-9); near(f.b, -1.5, 1e-9); near(f.c, 0.875, 1e-9); ok(f.rss < 1e-18, "artık sıfır");
  assert.throws(() => K.fitQuad([0, 1], [0, 1])); assert.throws(() => K.fitQuad([1, 1, 1, 1], [1, 2, 3, 4])); checks += 2;
  // bağımsız başvuru: üç noktadan geçen parabol (Lagrange) → c
  const c3 = K.fitQuad([0, 1, 3], [2, 5, 29]).c; // y = 2 + 0·t + 3t² → (0,2),(1,5),(3,29)
  near(c3, 3, 1e-10);
}
for (const [g, h, every] of [[9.80665, 20, 0.25], [1.62, 50, 0.5], [23.12, 200, 0.1]]) {
  const m = K.run(K.body({ g }), h, 0, every).marks, ys = m.map(x => x.y);
  const exact = K.measureG(K.noisyTimes(m, 0, 1), ys);
  near(exact.g, g, 1e-8, "gürültüsüz g"); ok(exact.se < 1e-6, "gürültüsüz belirsizlik");
  for (const sigma of [0.002, 0.01, 0.02]) {
    let in1 = 0, in2 = 0, sum = 0, sum2 = 0; const N = 600;
    for (let seed = 1; seed <= N; seed++) {
      const r = K.measureG(K.noisyTimes(m, sigma, seed), ys), z = Math.abs(r.g - g) / r.se;
      ok(Number.isFinite(r.g) && r.se > 0, "sonlu ölçüm");
      if (z < 1) in1++; if (z < 2) in2++; sum += r.g; sum2 += r.g * r.g;
    }
    const mean = sum / N, sd = Math.sqrt(sum2 / N - mean * mean);
    ok(in1 / N > 0.58 && in1 / N < 0.80, `1σ kapsama ${in1 / N}`); ok(in2 / N > 0.88, `2σ kapsama ${in2 / N}`);
    ok(Math.abs(mean - g) < 4 * sd / Math.sqrt(N) + 0.004 * g, `yanlılık ${mean - g} (sd ${sd})`);
  }
  const a = K.noisyTimes(m, 0.01, 7), b = K.noisyTimes(m, 0.01, 7), c = K.noisyTimes(m, 0.01, 8);
  ok(a.every((x, i) => x === b[i]) && a.some((x, i) => x !== c[i]), "tohum belirleyici");
}
{ const r = K.rng(3); let s = 0, s2 = 0; const N = 40000; for (let i = 0; i < N; i++) { const x = K.gauss(r); s += x; s2 += x * x; } ok(Math.abs(s / N) < 0.02 && Math.abs(s2 / N - 1) < 0.03, "normal üreteç"); }

/* ── 3. Hava direnci: bağımsız açık Euler (çok küçük adım) ve kapalı biçimler ── */
function euler(g, m, law, k, h, v0 = 0, dt = 2e-6) {
  let t = 0, y = h, v = v0, q = 0, apex = null, r95 = null;
  const vt = law === "quad" ? Math.sqrt(m * g / k) : m * g / k;
  for (;;) {
    const F = law === "quad" ? -k * v * Math.abs(v) : -k * v, a = -g + F / m, yn = y + v * dt, vn = v + a * dt;
    if (v > 0 && vn <= 0 && !apex) apex = y;
    if (!r95 && -vn >= 0.95 * vt) r95 = { t: t + dt, d: h - yn };
    q += -F * v * dt;
    if (yn <= 0) { const u = y / (y - yn); return { t: t + u * dt, v: v + u * (vn - v), q, apex, r95, vt }; }
    t += dt; y = yn; v = vn;
  }
}
const SPH = [
  { name: "pinpon", r: 0.02, rho: 80.6, cd: 0.47, law: "quad", h: 30 },
  { name: "çelik", r: 0.01, rho: 7850, cd: 0.47, law: "quad", h: 500 },
  { name: "yağmur", r: 0.0015, rho: 1000, cd: 0.47, law: "quad", h: 12 },
  { name: "tüy", r: 0.02, rho: 30, cd: 1.5, law: "quad", h: 5 },
  { name: "ince toz", r: 0.0001, rho: 1000, cd: 0.47, law: "lin", h: 4 },
];
for (const c of SPH) {
  const sp = K.sphere(c), p = K.body({ g: K.G0, m: sp.m, law: sp.law, k: sp.k }), r = K.run(p, c.h, 0, 0).end;
  // kendi formüllerimiz
  const m = 4 / 3 * Math.PI * c.r ** 3 * c.rho, A = Math.PI * c.r ** 2, g = 9.80665;
  near(sp.m, m, 1e-12, "kütle");
  const vt = c.law === "quad" ? Math.sqrt(2 * m * g / (1.225 * c.cd * A)) : 2 * c.r * c.r * c.rho * g / (9 * 1.7894e-5);
  near(p.vt, vt, 1e-11, c.name + " v_t kuram"); near(K.measureTerminal(p), vt, 1e-9, c.name + " v_t ölçülen");
  const tau = vt / g;
  let T, vImp, t95, d95;
  if (c.law === "quad") {
    T = tau * Math.acosh(Math.exp(g * c.h / (vt * vt))); vImp = vt * Math.tanh(T / tau);
    t95 = tau * Math.atanh(0.95); d95 = vt * tau * Math.log(Math.cosh(t95 / tau));
  } else {
    let lo = 0, hi = 1e4; for (let i = 0; i < 200; i++) { const mid = (lo + hi) / 2; if (vt * (mid - tau * (1 - Math.exp(-mid / tau))) < c.h) lo = mid; else hi = mid; }
    T = lo; vImp = vt * (1 - Math.exp(-T / tau)); t95 = tau * Math.log(20); d95 = vt * (t95 - tau * 0.95);
  }
  near(r.t, T, 1e-8, c.name + " T (kapalı biçim)"); near(-r.v, vImp, 1e-8, c.name + " v (kapalı biçim)");
  near(K.theory.fallTime(p, c.h), T, 1e-10); near(K.theory.impactSpeed(p, c.h), vImp, 1e-10); near(K.theory.t95(p), t95, 1e-12); near(K.theory.d95(p), d95, 1e-11);
  ok(r.r95 !== null, c.name + " 0.95 v_t'ye ulaşmalı"); near(r.r95.t, t95, 1e-7, c.name + " t95"); near(r.r95.d, d95, 1e-7, c.name + " d95");
  near(r.q, m * g * c.h - 0.5 * m * r.v * r.v, 1e-8, c.name + " enerji dengesi");
  const e = euler(g, m, c.law, sp.k, c.h, 0, Math.min(2e-6, tau / 2000));
  near(r.t, e.t, 2e-5, c.name + " T (Euler)"); near(-r.v, -e.v, 2e-5, c.name + " v (Euler)"); near(r.q, e.q, 1e-4, c.name + " ∫F·v (Euler)"); near(r.r95.t, e.r95.t, 1e-3, c.name + " t95 (Euler)");
  // yörünge boyunca tanh / üstel çözüm
  for (const mk of K.run(p, c.h, 0, T / 7.3).marks) {
    const drop = c.law === "quad" ? vt * tau * Math.log(Math.cosh(mk.t / tau)) : vt * (mk.t - tau * (1 - Math.exp(-mk.t / tau)));
    const sp2 = c.law === "quad" ? vt * Math.tanh(mk.t / tau) : vt * (1 - Math.exp(-mk.t / tau));
    near(c.h - mk.y, drop, 1e-8, c.name + " y(t)"); near(-mk.v, sp2, 1e-8, c.name + " v(t)");
    near(K.theory.dropAt(p, mk.t), drop, 1e-10); near(K.theory.speedAt(p, mk.t), sp2, 1e-10);
  }
}
{ // büyük argümanlarda taşma yok (tüy, 500 m)
  const sp = K.sphere({ r: 0.02, rho: 30, cd: 1.5 }), p = K.body({ g: K.G0, m: sp.m, law: "quad", k: sp.k });
  ok(Number.isFinite(K.theory.fallTime(p, 500)) && Math.abs(K.theory.impactSpeed(p, 500) - p.vt) < 1e-9, "taşma yok");
  near(K.run(p, 500, 0, 0).end.t, K.theory.fallTime(p, 500), 1e-8);
  // yere 0.95 v_t'ye ulaşmadan varış: r95 tanımsız kalmalı
  const st = K.sphere({ r: 0.02, rho: 7850, cd: 0.47 }), ps = K.body({ g: K.G0, m: st.m, law: "quad", k: st.k });
  ok(K.run(ps, 30, 0, 0).end.r95 === null, "çelik 30 m'de 0.95 v_t'ye ulaşmaz");
}
{ // kütle havada önemlidir; boşlukta değildir
  const light = K.sphere({ r: 0.02, rho: 80.6 }), heavy = K.sphere({ r: 0.02, rho: 7850 });
  ok(light.k === heavy.k, "aynı boyut → aynı k");
  const tl = K.run(K.body({ g: K.G0, m: light.m, law: "quad", k: light.k }), 30, 0, 0).end.t, th = K.run(K.body({ g: K.G0, m: heavy.m, law: "quad", k: heavy.k }), 30, 0, 0).end.t;
  ok(tl > th + 1.5, `hafif küre geç varır (${tl} / ${th})`);
  near(K.run(K.body({ g: K.G0, m: light.m }), 30, 0, 0).end.t, K.run(K.body({ g: K.G0, m: heavy.m }), 30, 0, 0).end.t, 0, "boşlukta eşit");
  // yukarı atış + karesel direnç: Euler ile tepe ve varış
  const p = K.body({ g: K.G0, m: light.m, law: "quad", k: light.k }), r = K.run(p, 3, 12, 0).end, e = euler(K.G0, light.m, "quad", light.k, 3, 12, 1e-6);
  near(r.apex.y, e.apex, 2e-5, "dirençli tepe"); near(r.t, e.t, 2e-5, "dirençli atış süresi"); near(r.q, light.m * (K.G0 * 3 + 0.5 * 144 - 0.5 * r.v * r.v), 1e-8, "dirençli atış enerjisi");
}
{ // Reynolds ve geçerlilik
  near(K.reynolds(0.01, 59.7), 1.225 * 59.7 * 0.02 / 1.7894e-5, 1e-12);
  ok(K.validity("quad", 8e4) === "ok" && K.validity("quad", 500) === "low" && K.validity("quad", 3e5) === "high" && K.validity("lin", 0.02) === "ok" && K.validity("lin", 5) === "high" && K.validity("none", 1e9) === "ok", "geçerlilik sınıfları");
  const fog = K.sphere({ r: 1e-5, rho: 1000, law: "lin" }), pf = K.body({ g: K.G0, m: fog.m, law: "lin", k: fog.k });
  near(pf.vt, 0.0121787, 1e-5, "sis damlası v_t"); ok(K.reynolds(1e-5, pf.vt) < 0.02, "sis Re");
  ok(pf.dt <= pf.tau / 40 + 1e-18, "adım τ/40'ı aşmaz");
}

/* ── 4. Eğik düzlem ── */
function eulerRamp(theta, beta, mu, L, dt = 1e-6) {
  const g = 9.80665, gs = g * Math.sin(theta), gc = g * Math.cos(theta);
  let t = 0, s = 0, v = 0, w = 0;
  const rolls = beta > 0 && Math.tan(theta) <= mu * (1 + beta) / beta;
  for (;;) {
    let a, aw;
    if (beta === 0) { a = gs; aw = 0; } else if (rolls) { a = gs / (1 + beta); aw = a; } else { a = gs - mu * gc; aw = mu * gc / beta; }
    const sn = s + v * dt;
    if (sn >= L) { const u = (L - s) / (sn - s); return { t: t + u * dt, v: v + u * a * dt, w: w + u * aw * dt, rolls }; }
    s = sn; v += a * dt; w += aw * dt; t += dt;
  }
}
for (const beta of [0, 0.4, 0.5, 2 / 3, 1]) for (const deg of [1, 10, 25, 45, 60]) for (const mu of [0.02, 0.3, 1]) for (const L of [0.5, 2, 5]) {
  const th = deg * Math.PI / 180, p = K.ramp({ theta: th, beta, mu, L }), r = K.rampRun(p, 0.1), g = 9.80665;
  const rolls = beta > 0 && Math.tan(th) <= mu * (1 + beta) / beta;
  ok(p.rolls === rolls, "yuvarlanma koşulu");
  const aRef = beta === 0 ? g * Math.sin(th) : rolls ? g * Math.sin(th) / (1 + beta) : g * (Math.sin(th) - mu * Math.cos(th));
  near(p.aTheory, aRef, 1e-12, "a kuram");
  const st = Math.max(1, Math.floor(r.samples.length / 300)), pick = r.samples.filter((_, i) => i % st === 0);
  if (pick.length >= 3) near(2 * K.fitQuad(pick.map(x => x[0]), pick.map(x => x[1])).c, aRef, 1e-8, "a ölçülen");
  near(r.end.t, Math.sqrt(2 * L / aRef), 1e-9, "iniş süresi"); near(r.end.v, Math.sqrt(2 * aRef * L), 1e-9, "uç hız");
  // enerji: öteleme + dönme + sürtünme kaybı = m g L sin θ
  near((0.5 * r.end.v ** 2 + 0.5 * beta * r.end.w ** 2 + r.end.ed) / (g * Math.sin(th) * L), 1, 1e-9, "rampa enerjisi");
  if (rolls) { near(r.end.w, r.end.v, 1e-10, "kaymadan: v = ωr"); near(r.end.ed, 0, 0, "kaymadan: kayıp yok"); near(r.end.phi, L, 1e-9, "dönme yolu = L"); }
  else if (beta > 0) ok(r.end.w < r.end.v && r.end.ed > 0, "kayarken ωr < v ve kayıp > 0");
  if (L === 2 && mu === 0.3) { const e = eulerRamp(th, beta, mu, L); near(r.end.t, e.t, 2e-5, "rampa Euler T"); near(r.end.v, e.v, 2e-5, "rampa Euler v"); near(r.end.w, e.w, 2e-5, "rampa Euler w"); }
  const d = []; for (let i = 1; i < r.marks.length; i++) d.push(r.marks[i].s - r.marks[i - 1].s);
  d.forEach((x, i) => near(x / d[0], 2 * i + 1, 1e-7, "rampada tek sayılar"));
}
{ const p = K.ramp({ theta: 10 * Math.PI / 180, beta: 0.4, mu: 0.3, L: 2 }); near(p.aTheory / p.gs, 5 / 7, 1e-14); near(p.aTheory, 1.2163621, 1e-7); near(p.thetaC * 180 / Math.PI, 46.3972, 1e-5); near(K.rampRun(p, 0.25).end.t, 1.8134207, 1e-7); }
for (const bad of [() => K.body({ g: -1 }), () => K.body({ g: 9.8, law: "quad", k: 0 }), () => K.body({ g: 9.8, law: "x" }), () => K.start(K.body({ g: 9.8 }), 0), () => K.sphere({ r: 0, rho: 1 }), () => K.ramp({ theta: 0, beta: 0.4, mu: 0.3, L: 2 }), () => K.ramp({ theta: 2, beta: 0.4, mu: 0.3, L: 2 }), () => K.measureTerminal(K.body({ g: 9.8 }))]) { assert.throws(bad); checks++; }
/* ── Doğrulayıcı düzeltmeleri (11 Kasım 2026): sayfa metni ── */
// g'nin yükseklikle değişimi 2h/R: Dünya'da %0.01'in, Ay ve Mars'ta %0.03'ün altında (h = 200 m)
ok(2 * 200 / 6.371e6 < 1e-4 && 2 * 200 / 1.7374e6 < 3e-4 && 2 * 200 / 3.3895e6 < 3e-4 && 2 * 200 / 1.7374e6 > 1e-4, "g değişimi sınırları");
ok(html.includes("Dünya'da 0.01 %'den, Ay'da ve Mars'ta 0.03 %'ten küçüktür"), "g değişimi notu gök cismine göre yazılmalı");
ok(html.includes("yazım hatası olabileceğini") && !html.includes("büyük olasılıkla yazım hatası"), "NASA notu: 'may be due to a typo'");
ok(html.includes("9 iz, 8 aralık demektir"), "iz sayısı bırakma noktasını içerir notu");
{ const r = K.run(K.body({ g: 9.80665 }), 20, 0, 0.25); ok(r.marks.length === 9 && K.galileo(r.marks).d.length === 8, "9 iz = 8 aralık"); }
console.log(`G serbest-dusme: ${checks.toLocaleString("tr-TR")} bağımsız kapalı biçim, enerji, Euler çapraz ve istatistik denetimi PASS`);

/* ── Tarayıcı ── */
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
      await page.goto(`http://127.0.0.1:${server.address().port}/serbest-dusme.html`);
      const vacT = (g, h, v0) => (v0 + Math.sqrt(v0 * v0 + 2 * g * h)) / g;
      const vtQ = (r, rho, cd) => Math.sqrt(8 * r * rho * 9.80665 / (3 * 1.225 * cd)).toPrecision(4) + " m/s";
      const airT = (m, cda, h = 1.6) => { const vt = Math.sqrt(m * 9.80665 / (0.5 * 1.225 * cda)); return vt / 9.80665 * Math.acosh(Math.exp(9.80665 * h / (vt * vt))); };
      const click = id => page.locator("#" + id).click(), read = async id => (await page.locator("#" + id).textContent()).trim();
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `[${width}] #${id}: "${t}" içinde "${text}" yok`); checks++; };
      const lacks = async (id, text) => { const t = await read(id); assert(!t.includes(text), `[${width}] #${id}: "${t}" içinde "${text}" olmamalı`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, v);
      const pick = (id, v) => page.locator("#" + id).selectOption(v);
      const type = async (id, v) => { await page.locator("#" + id).fill(v); await page.locator("#" + id).dispatchEvent("change"); };
      const clean = async sel => { const t = await page.locator(sel).innerText(); assert(!/NaN|Infinity|undefined|null/.test(t), `[${width}] ${sel} bozuk sayı: ${t.match(/.{0,30}(NaN|Infinity|undefined|null).{0,30}/)?.[0]}`); checks++; };
      const noOverflow = async () => { eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "yatay taşma"); };
      const eq = (a, b, label) => { assert.equal(a, b, `[${width}] ${label || ""}`); checks++; };

      // her denetimin etiketi, her tuvalin rolü
      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content input, .app-content select")].filter(e => !document.querySelector(`label[for="${e.id}"]`)).length), 0, "etiketsiz denetim");
      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].filter(c => c.getAttribute("role") !== "img" || !c.getAttribute("aria-label")).length), 0, "rolsüz tuval");
      eq(await page.evaluate(() => Object.isFrozen(FallLab) && !Object.getOwnPropertyDescriptor(window, "FallLab").writable), true, "çekirdek salt okunur");

      /* 01 · Boşlukta düşüş */
      await has("vStatus", "Hazır"); await has("vTimeMeas", "—"); await has("vTimeTheory", "kuram 2.0196 s"); await has("vHOut", "20.0 m");
      await click("vSkip");
      await has("vTimeMeas", "2.0196 s"); await has("vSpeedMeas", "19.806 m/s"); await has("vTimeTheory", "fark 0.00 %"); await has("vD2Meas", "0.6129 m");
      await has("vFitG", "9.807 ± 0.000 m/s²"); await has("vFitInfo", "9 iz"); await has("vStatus", "1.00 : 3.00 : 5.00 : 7.00 : 9.00"); await has("vApexMeas", "yok");
      eq(await page.locator("#vRows tr").count(), 9, "iz satırları"); await has("vRows", "15.097"); await has("vGo", "Yeniden bırak");
      await range("vNoise", 5); await has("vFitG", "±"); await lacks("vFitG", "± 0.000"); await has("vFitInfo", "σ"); const fit5 = await read("vFitG");
      await range("vSeed", 2); assert.notEqual(await read("vFitG"), fit5); checks++; await range("vSeed", 1); eq(await read("vFitG"), fit5, "tohum yinelenebilir");
      await has("vTimeMeas", "2.0196 s"); // gürültü hareketi yeniden başlatmaz
      await range("vV0", 10); await has("vStatus", "Hazır"); await has("vTimeMeas", "—"); await click("vSkip");
      await has("vApexMeas", "25.099 m"); await has("vTimeMeas", vacT(9.80665, 20, 10).toFixed(4) + " s"); await has("vStatus", "tek sayı kuralı geçerli değil"); await has("vTableCap", "oran sütunu boş");
      await pick("vBody", "moon"); await range("vV0", 0); await range("vH", 1.5); await pick("vDt", "1"); await click("vSkip"); await has("vTimeMeas", vacT(1.62, 1.5, 0).toFixed(4) + " s"); await has("vStatus", "yalnız 1 tam aralık"); await has("vFitInfo", "en az 5 iz");
      await range("vH", 200); await range("vV0", 30); await pick("vDt", "0.05"); await click("vSkip"); await has("vTimeMeas", vacT(1.62, 200, 30).toFixed(4) + " s"); await has("vTableCap", "toplam " + (Math.floor(vacT(1.62, 200, 30) / 0.05) + 1) + " iz"); await clean("#panel-vac");
      await range("vH", 1); await range("vV0", -30); await pick("vBody", "jupiter"); await click("vSkip"); await clean("#panel-vac"); await has("vTimeTheory", "fark 0.00 %");
      await click("vReset"); await has("vHOut", "20.0 m"); await has("vNoiseOut", "0 ms"); eq(await page.locator("#vBody").inputValue(), "earth", "sıfırla"); await has("vStatus", "Hazır");
      // gerçek zamanlı koşu + klavye: Boşluk başlatır, R sıfırlar; form içinde yok sayılır
      await range("vH", 1); await page.locator("h1").click(); await page.keyboard.press("Space"); await has("vGo", "Duraklat");
      await page.waitForFunction(() => document.getElementById("vGo").textContent === "Yeniden bırak", null, { timeout: 5000 }); await has("vTimeMeas", "0.4516 s");
      await page.keyboard.press("r"); await has("vHOut", "20.0 m"); await has("vTimeMeas", "—");
      await page.locator("#vH").focus(); await page.keyboard.press("r"); await has("vStatus", "Hazır"); await has("vGo", "Bırak");
      await noOverflow();

      /* 02 · Hava direnci */
      await click("tab-drag"); await has("dStatus", "Hazır"); await has("dRows", "8.557 m/s"); await has("dRows", "84.45 m/s"); await has("dDerived", "2.701 g");
      await click("dSkip"); await has("dRows", "4.111 s"); await has("dRows", "2.491 s"); await has("dRows", "1.598 s"); await has("dRows", "8.690 m"); await has("dRows", "ulaşılmadı"); await has("dRows", "695.8 mJ");
      await has("dStatus", "B yere 1.620 s önce değdi"); await has("dStatus", "231000"); await clean("#panel-drag");
      for (const [btn, vt] of [["dPreSteel", vtQ(0.01, 7850, 0.47)], ["dPreRain", vtQ(0.0015, 1000, 0.47)], ["dPreFeather", vtQ(0.02, 30, 1.5)], ["dPrePong", vtQ(0.02, 80.6, 0.47)]]) { await click(btn); await has("dRows", vt); await click("dSkip"); await clean("#panel-drag"); await lacks("dRows", "sürüyor"); }
      await click("dPreFog"); await has("dHOut", "1 m"); await has("dRows", "0.01218 m/s"); eq(await page.locator("#dCd").isDisabled(), true, "Stokes'ta C_d kapalı");
      await click("dSkip"); await has("dRows", "82.11 s"); await has("dRows", "3.720 ms"); await clean("#panel-drag"); await lacks("dStatus", "geçersiz");
      await pick("dZoom", "early"); await page.waitForTimeout(120); await pick("dZoom", "all");
      await range("dH", 500); await has("dStatus", "4 milyondan fazla"); eq(await page.locator("#dGo").isDisabled(), true, "çok uzun düşüş kilitli");
      await click("dPreSteel"); await pick("dLaw", "lin"); await range("dH", 30); await has("dStatus", "Stokes yasası bu cisim için geçersiz"); eq(await page.locator("#dGo").isDisabled(), false, "kilit açıldı");
      await pick("dLaw", "quad"); await type("dR", "abc"); await has("dStatus", "Geçersiz giriş"); eq(await page.locator("#dR").inputValue(), "10", "önceki değer");
      await type("dR", "1,5"); eq(await page.locator("#dR").inputValue(), "1.5", "ondalık virgül"); await type("dR", "500"); eq(await page.locator("#dR").inputValue(), "100", "üst sınır"); await has("dStatus", "aralığına çekildi");
      await type("dR", "0.0001"); eq(await page.locator("#dR").inputValue(), "0.005", "alt sınır"); await clean("#panel-drag");
      await type("dRho", "5"); eq(await page.locator("#dRho").inputValue(), "20", "yoğunluk alt sınırı"); await has("dStatus", "kaldırma kuvveti");
      await click("dPrePong"); await pick("dB", "vacuum"); await click("dSkip"); await has("dRows", "havasız ortamda hız sınırsız artar"); await has("dRows", Math.sqrt(60 / 9.80665).toPrecision(4) + " s"); await clean("#panel-drag");
      await pick("dB", "heavy10"); await click("dSkip"); await has("dRows", "27.01 g"); await pick("dB", "rain"); await click("dSkip"); await clean("#panel-drag");
      await click("dReset"); await has("dHOut", "30 m"); eq(await page.locator("#dR").inputValue(), "20", "sıfırla r"); eq(await page.locator("#dB").inputValue(), "sameSteel", "sıfırla B"); await has("dStatus", "Hazır");
      await range("dH", 1); await click("dGo"); await page.waitForFunction(() => document.getElementById("dGo").textContent === "Yeniden bırak", null, { timeout: 5000 }); await clean("#panel-drag");
      await noOverflow();

      /* 03 · Tüy, çekiç, eğik düzlem */
      await click("tab-gal"); await has("fStatus", "Hazır"); await has("fTHt", "1.4055 s"); await click("fSkip");
      await has("fTH", "1.4055 s"); await has("fTF", "1.4055 s"); await has("fGap", "0.00 ms"); await has("fStatus", "Ay'da");
      await pick("fEnv", "vac"); await click("fSkip"); await has("fTH", "0.5712 s"); await has("fGap", "0.00 ms");
      await pick("fEnv", "air"); await click("fSkip"); await has("fTH", airT(1.32, 0.004).toFixed(4) + " s"); await has("fTF", airT(0.001, 0.005).toFixed(4) + " s"); await has("fGap", ((airT(0.001, 0.005) - airT(1.32, 0.004)) * 1000).toFixed(2) + " ms"); assert(airT(0.001, 0.005) > 0.9 && airT(1.32, 0.004) < 0.58); checks++; await has("fTFt", "fark 0.00 %");
      await range("fH", 0.5); await click("fSkip"); await clean("#panel-gal"); await range("fH", 10); await click("fSkip"); await clean("#panel-gal");
      await has("rStatus", "Hazır"); await has("rATheory", "1.2164 m/s²"); await has("rCrit", "46.4°"); await click("rSkip");
      await has("rAMeas", "1.2164 m/s²"); await has("rRatio", "0.7143"); await has("rRatioT", "5/7"); await has("rGNaive", "7.005 m/s²"); await has("rTime", "1.8134 s"); await has("rEnergy", "71.4 / 28.6 / 0.0 %"); await has("rOdd", "1.00 : 3.00 : 5.00");
      await range("rTheta", 60); await has("rStatus", "kayarak yuvarlanır"); await click("rSkip"); await has("rRatioT", "kayıyor"); await lacks("rEnergy", "/ 0.0 %"); await has("rEnergyT", "toplam 100.000 %");
      await pick("rShape", "block"); eq(await page.locator("#rMu").isDisabled(), true, "blokta μ kapalı"); await click("rSkip"); await has("rRatio", "1.0000"); await has("rCrit", "yok");
      await pick("rShape", "shell"); await range("rTheta", 1); await range("rL", 5); await click("rSkip"); await has("rRatio", "0.6000"); await clean("#panel-gal");
      await pick("rShape", "cyl"); await range("rTheta", 30); await range("rL", 0.5); await pick("rDt", "0.5"); await click("rSkip"); await has("rRatio", "0.6667"); await has("rStatus", "tam aralık sığdı"); await clean("#panel-gal");
      await click("gReset"); await has("fHOut", "1.6 m"); await has("rThetaOut", "10.0°"); eq(await page.locator("#rShape").inputValue(), "solid", "sıfırla"); eq(await page.locator("#fEnv").inputValue(), "moon", "sıfırla ortam"); await has("rAMeas", "—");
      await click("rGo"); await page.waitForFunction(() => document.getElementById("rGo").textContent === "Yeniden bırak", null, { timeout: 6000 }); await has("rTime", "1.8134 s");
      await noOverflow();

      // sekme klavyesi
      await page.locator("#tab-gal").focus(); await page.keyboard.press("Home"); eq(await page.locator("#tab-vac").getAttribute("aria-selected"), "true", "Home");
      await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-drag").getAttribute("aria-selected"), "true", "sağ ok"); eq(await page.locator("#panel-drag").isVisible(), true, "panel görünür");
      await page.keyboard.press("End"); eq(await page.locator("#tab-gal").getAttribute("aria-selected"), "true", "End"); await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-vac").getAttribute("aria-selected"), "true", "sarma");
      await page.keyboard.press("ArrowLeft"); eq(await page.locator("#tab-gal").getAttribute("aria-selected"), "true", "sol ok"); eq(await page.locator("#tab-vac").getAttribute("tabindex"), "-1", "tabindex");
      // tuvaller gerçekten çizildi mi?
      for (const [tab, ids] of [["vac", ["vStage", "vChartY", "vChartV"]], ["drag", ["dStage", "dChartV", "dChartY"]], ["gal", ["fStage", "rStage"]]]) {
        await click("tab-" + tab); await page.waitForTimeout(150);
        for (const id of ids) eq(await page.evaluate(id => { const c = document.getElementById(id), d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++; return n > 500; }, id), true, id + " boş");
      }
      await noOverflow();
      assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      console.log(`G serbest-dusme: ${width} px ${theme} · ${checks - before} arayüz denetimi PASS`);
      await ctx.close();
    }
  } finally { await browser?.close(); await new Promise(r => server.close(r)); }
}
