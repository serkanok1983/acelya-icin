// G · atmosfer-ve-hava.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın tümleyicilerini yeniden kullanmaz:
// 1976 standart atmosferinin katman katman kapalı barometrik formülü ve yayımlanmış taban basınçları,
// Clausius–Clapeyron ODE'sinin küçük adımlı tümlemesi, kuru parsel için Poisson + hipsometrik kapalı biçim,
// LCL için basınçta ikiye bölme, nemli parsel için her adımda örtük (ikiye bölmeli) entalpi denklemi,
// CAPE için kapalı biçimli çevre basıncı üzerinde bağımsız parsel, f-düzleminde kapalı biçimli eylemsizlik çözümü.
// Kullanım: node scripts/check-g-atmosfer-ve-hava.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const SLUG = "atmosfer-ve-hava";
const html = fs.readFileSync(new URL(`../${SLUG}.html`, import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.AtmosLab;
let checks = 0;
const near = (a, b, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${label} ${a} ≠ ${b} (tol ${tol})`); checks++; };
const nearAbs = (a, b, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - b) <= tol, `${label} ${a} ≠ ${b} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
ok(Object.isFrozen(K), "çekirdek dondurulmuş");

/* ── Yayımlanmış sabitler (Wikipedia sayfalarından, sayfanın kendi tablosundan bağımsız yazıldı) ── */
const PUB = [[0, 288.15, -6.5, 101325], [11000, 216.65, 0, 22632.1], [20000, 216.65, 1, 5474.89], [32000, 228.65, 2.8, 868.019], [47000, 270.65, 0, 110.906], [51000, 270.65, -2.8, 66.9389], [71000, 214.65, -2, 3.95642]];
const g0 = 9.80665, M = 0.0289644, Rs = 8.31432;
PUB.forEach(([h, T, L, P], i) => { const b = K.STD_LAYERS[i]; ok(b.h === h && b.T === T && Math.abs(b.L * 1000 - L) < 1e-12 && b.P === P, `katman ${i}`); });
near(K.G0, g0, 0); near(K.M_AIR, M, 0); near(K.R_STAR, Rs, 0); near(K.CP_D, 1003.5, 0); near(K.L_V, 2.501e6, 0); near(K.R_V, 461.5, 0); near(K.EPS, 0.622, 0); near(K.OMEGA, 7.2921e-5, 0); near(K.DH_VAP, 40650, 0);
ok(K.BOLTON.a === 611.2 && K.BOLTON.b === 17.67 && K.BOLTON.c === 243.5, "Bolton sabitleri");

/* ── 1. Basınç: katman katman kapalı barometrik formül ── */
function closedP(z) {
  let i = 0; while (i + 1 < PUB.length && z >= PUB[i + 1][0]) i++;
  const [h, Tb, L, Pb] = PUB[i], Lm = L / 1000, gMR = g0 * M / Rs;
  // taban basıncını tablodan değil, alttan kapalı biçimle zincirle
  let P = 101325; for (let j = 0; j < i; j++) { const [hj, Tj, Lj] = PUB[j], dz = PUB[j + 1][0] - hj, l = Lj / 1000; P *= l ? (Tj / (Tj + l * dz)) ** (gMR / l) : Math.exp(-gMR * dz / Tj); }
  return Lm ? P * (Tb / (Tb + Lm * (z - h))) ** (gMR / Lm) : P * Math.exp(-gMR * (z - h) / Tb);
}
const prof10 = K.integrateP(K.stdT, 84000, 10);
for (const z of [0, 500, 5000, 8848, 11000, 15000, 20000, 25000, 32000, 40000, 47000, 51000, 60000, 71000, 80000, 84000]) near(K.profileP(prof10, z), closedP(z), z % 10 ? 1e-7 : 2e-9, `p(${z})`); // ızgara dışı: ln p doğrusal ara değer
for (const [h, , , P] of PUB) near(closedP(h), P, 6e-6, `tablo ${h}`); // tablo 6 anlamlı basamak
const tab10 = K.stdTableCheck(prof10), tab100 = K.stdTableCheck(K.integrateP(K.stdT, 84000, 100));
tab10.forEach((c, i) => { ok(Math.abs(c.rel) < 6e-6, `tablo farkı ${c.h}`); near(c.rel, tab100[i].rel, 1e-6, "10 m ve 100 m aynı"); });
ok(K.stdTableCheck(K.integrateP(K.stdT, 84000, 2500)).some((c) => Math.abs(c.rel) > 1e-4), "2500 m adımda kırılma hatası görünür");
near(K.scaleHeight(288), Rs * 288 / (M * g0), 1e-14); near(K.isoP(8000, 250), 101325 * Math.exp(-8000 * M * g0 / (Rs * 250)), 1e-14);
{ // yarı basınç yüksekliği: kapalı biçimle ikiye bölme
  let lo = 0, hi = 11000; for (let k = 0; k < 80; k++) { const m = (lo + hi) / 2; if (closedP(m) > 101325 / 2) lo = m; else hi = m; }
  nearAbs(K.profileHeightAtP(prof10, 101325 / 2), lo, 0.05, "yarı basınç");
}
{ // Kaynama: dT/dp = R T²/(ΔH p) ODE'si, ln p'de RK2 ile
  for (const p of [101325, 89874.6, 54019.9, 31000, 5000, 700]) { let T = 373.15, x = Math.log(101325); const X = Math.log(p), n = 4000, h = (X - x) / n; for (let k = 0; k < n; k++) { const f = (TT) => 8.314462618 * TT * TT / 40650; const k1 = f(T), k2 = f(T + h / 2 * k1); T += h * k2; } near(K.boilingPoint(p), T, 1e-8, `kaynama ${p}`); }
}

/* ── 2. Nem, kuru parsel, LCL, nemli parsel, föhn ── */
for (const [T, RH] of [[25, 50], [0, 60], [-10, 80], [35, 20], [10, 100], [30, 5]]) {
  const Td = K.dewPoint(T, RH); near(611.2 * Math.exp(17.67 * Td / (Td + 243.5)), RH / 100 * 611.2 * Math.exp(17.67 * T / (T + 243.5)), 1e-12, "e_s(T_d) = RH·e_s(T)");
  // Wikipedia varsayılan Magnus sabitleriyle (17,625; 243,04) çiğ noktası 0,2 K içinde
  const g = Math.log(RH / 100) + 17.625 * T / (243.04 + T); nearAbs(Td, 243.04 * g / (17.625 - g), 0.2, "Magnus karşılaştırması");
}
const ps = 101300, kap = 287.0530 / 1003.5;
near(K.KAPPA, Rs / M / 1003.5, 1e-12);
function rs(Tk, p) { const e = 611.2 * Math.exp(17.67 * (Tk - 273.15) / (Tk - 273.15 + 243.5)); return 0.622 * e / (p - e); }
function lclRef(Tc, RH, p0) {
  const T0 = Tc + 273.15, e0 = RH / 100 * 611.2 * Math.exp(17.67 * Tc / (Tc + 243.5)), r = 0.622 * e0 / (p0 - e0), k = (Rs / M) / 1003.5;
  let lo = 20000, hi = p0; for (let i = 0; i < 100; i++) { const m = (lo + hi) / 2; if (rs(T0 * (m / p0) ** k, m) > r) hi = m; else lo = m; }
  const T = T0 * (hi / p0) ** k; return { p: hi, T, z: 1003.5 / g0 * (T0 - T), r };
}
// örtük nemli adım: c_p(Tn − T) + L(r_s(Tn,pn) − r_s(T,p)) = R_d·(T + Tn)/2·ln(pn/p); z: hipsometrik
function moistRef(T, p, z, pEnd, n = 20000) {
  const Rd = Rs / M, h = (pEnd - p) / n;
  for (let i = 0; i < n; i++) { const pn = p + h, F = (Tn) => 1003.5 * (Tn - T) + 2.501e6 * (rs(Tn, pn) - rs(T, p)) - Rd * (T + Tn) / 2 * Math.log(pn / p); let a = T - 5, b = T + 1; for (let k = 0; k < 60; k++) { const m = (a + b) / 2; if (F(m) > 0) b = m; else a = m; } const Tn = (a + b) / 2; z += Rd * (T + Tn) / 2 / g0 * Math.log(p / pn); T = Tn; p = pn; }
  return { T, p, z };
}
for (const [Tc, RH, Hm] of [[25, 50, 2500], [15, 80, 3000], [30, 80, 3000], [20, 90, 2500], [35, 20, 3000], [0, 60, 2000]]) {
  const r = K.liftExperiment({ Tc, RH, ps, Hm }), L = lclRef(Tc, RH, ps);
  nearAbs(r.lcl.z, L.z, 0.05, "LCL yüksekliği"); nearAbs(r.lcl.T, L.T, 1e-4, "LCL sıcaklığı"); nearAbs(r.lcl.p, L.p, 0.2, "LCL basıncı");
  if (r.gdMeas !== null) near(r.gdMeas, g0 / 1003.5, 1e-9, "Γ_d");
  ok(Math.abs(r.espy / r.lcl.z - 1) < 0.03, `Espy %3 içinde (${r.espy} / ${r.lcl.z})`);
  // tepeye bağımsız nemli tümleme: LCL'den Hm'ye (z eşleşene dek basınçta ilerleyip ara değer)
  if (r.lcl.z < Hm) {
    const ref = moistRef(L.T, L.p, L.z, r.top.p); nearAbs(ref.z, Hm, 0.5, "tepe yüksekliği"); nearAbs(ref.T, r.top.T, 2e-3, "tepe sıcaklığı");
    const Tlee = ref.T * (ps / ref.p) ** K.KAPPA; nearAbs(r.Tlee, Tlee, 2e-3, "föhn T");
    near(r.latentP, r.dT, 2e-3, "basınç düzeltmeli gizli ısı = ölçülen ısınma");
    ok(r.dT > r.latent && r.dT < r.latent * 1.15, "basınçsız tahmin ısınmayı biraz küçük verir");
    // formül ile ölçülen nemli oran %0,5 içinde; tam ifade 10⁻⁴ içinde
    ok(Math.abs(r.moist.meas / r.moist.formula - 1) < 5e-3 && Math.abs(r.moist.meas / r.moist.exact - 1) < 1e-4, "nemli oran");
  } else { nearAbs(r.dT, 0, 1e-6, "yoğuşmasız gidiş-dönüş"); ok(!r.condensed, "yoğuşma yok"); }
}
{ const r = K.liftExperiment({ Tc: 20, RH: 100, ps, Hm: 2000 }); ok(r.lcl.z === 0 && r.gdMeas === null && r.dewLapse === null, "RH = %100: kuru kesim yok"); }
// Wikipedia'nın "tipik ~5 °C/km" nemli oranı ve 9,8 K/km kuru oranı
ok(Math.abs(K.moistLapseFormula(288.15, 90000) * 1000 - 5) < 1, "nemli oran ~5 K/km"); nearAbs(K.GAMMA_D * 1000, 9.77, 0.01, "kuru oran");

/* ── 3. Kararlılık: N², salınım, CAPE ── */
for (const lap of [[6.5, 6.5, 6.5, 0], [-8, 6.5, 6.5, 0], [11, 6.5, 6.5, 0], [9, 6.5, 7, 0], [3, 5, 8, 2]]) {
  const env = K.makeEnv(20, lap);
  // çevre basıncı kapalı biçimle
  const base = [293.15]; const tops = [1000, 3000, 11000, 16000]; for (let i = 0; i < 4; i++) base.push(base[i] - lap[i] / 1000 * (tops[i] - (i ? tops[i - 1] : 0)));
  const pEnv = (z) => { let P = 101325, zb = 0; for (let i = 0; i < 4; i++) { const zt = Math.min(z, tops[i]); if (zt <= zb) break; const l = lap[i] / 1000, T0 = base[i]; P *= l ? ((T0 - l * (zt - zb)) / T0) ** (g0 * M / (Rs * l)) : Math.exp(-g0 * M * (zt - zb) / (Rs * T0)); zb = tops[i]; } return P; };
  for (const z of [0, 700, 2500, 9000, 14000]) near(env.p(z), pEnv(z), 1e-9, "çevre basıncı");
  for (const z0 of [500, 2000, 7000, 13500]) {
    const i = env.layerOf(z0), Tz = env.T(z0), N2 = g0 / Tz * (g0 / 1003.5 - lap[i] / 1000);
    near(K.N2profile(env, z0), N2, 1e-4, "N²"); near(K.N2theory(env, z0), N2, 1e-12);
    if (N2 > 1e-6) { const s = K.oscStepper(env, z0, 30); while (s.cross.length < 5) s.step(1); near(K.measuredPeriod(s.cross), 2 * Math.PI / Math.sqrt(N2), 1e-5, "periyot"); }
    else if (N2 < -1e-6) { const s = K.oscStepper(env, z0, 10); while (Math.abs(s.z - z0) < 200) s.step(1); near(K.growthRate(s), Math.sqrt(-N2), 2e-3, "büyüme hızı"); }
  }
  for (let i = 0; i < 4; i++) { const st = K.layerStability(env, i); ok(st.measured === st.rule || Math.abs(st.G - st.gm) < 3e-4, `katman ${i} sınıfı`); ok((st.bDry > 0) === (st.G > K.GAMMA_D), "kuru işaret"); }
}
{ // CAPE: kapalı biçimli çevre üzerinde bağımsız parsel (kuru kapalı biçim + örtük nemli)
  const lap = [9, 6.5, 7, 0], env = K.makeEnv(26, lap), snd = K.sounding(env, 70);
  const L = lclRef(26, 70, 101325);
  // parsel sıcaklığı p'nin fonksiyonu; çevrenin z(p)'si env'den bağımsız olarak kapalı p(z)'nin tersinden
  const zOfP = (p) => { let lo = 0, hi = 16000; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (env.p(m) > p) lo = m; else hi = m; } return lo; };
  let T = L.T, p = L.p, cape = 0, prevB = null, prevZ = null; const n = 3000, pEnd = env.p(16000), h = (pEnd - p) / n, Rd = Rs / M;
  // LCL'nin altındaki kuru kesim
  for (let k = 0; k <= 400; k++) { const pp = 101325 + (L.p - 101325) * k / 400, z = zOfP(pp), b = g0 * (299.15 * (pp / 101325) ** K.KAPPA - env.T(z)) / env.T(z); if (prevB !== null && snd.lfc !== null && z > snd.lfc) cape += Math.max(0, (prevB + b) / 2) * (z - prevZ); prevB = b; prevZ = z; }
  for (let i = 0; i < n; i++) { const pn = p + h, F = (Tn) => 1003.5 * (Tn - T) + 2.501e6 * (rs(Tn, pn) - rs(T, p)) - Rd * (T + Tn) / 2 * Math.log(pn / p); let a = T - 5, bb = T + 1; for (let k = 0; k < 60; k++) { const m = (a + bb) / 2; if (F(m) > 0) bb = m; else a = m; } T = (a + bb) / 2; p = pn; const z = zOfP(p), b = g0 * (T - env.T(z)) / env.T(z); if (z > snd.lfc && prevZ < snd.el) cape += Math.max(0, (prevB + b) / 2) * (Math.min(z, snd.el) - Math.max(prevZ, snd.lfc)); prevB = b; prevZ = z; }
  near(snd.cape, cape, 5e-3, "CAPE"); ok(snd.cape > 2000 && snd.lfc > snd.lclZ && snd.el > 10000, "fırtına sondası");
  const w = K.releaseParcel(snd); near(w.wEL, Math.sqrt(2 * snd.cape), 1e-4, "w(EL) = √(2·CAPE)");
  const stable = K.sounding(K.makeEnv(15, [6.5, 6.5, 6.5, 0]), 70); ok(stable.lfc === null && stable.cape === 0 && K.releaseParcel(stable) === null, "standart: CAPE yok");
}

/* ── 4. Coriolis: kapalı biçim ── */
for (const lat of [45, -45, 20, 70, -10]) {
  const f = 2 * 7.2921e-5 * Math.sin(lat * Math.PI / 180); near(K.coriolisF(lat), f, 1e-14);
  for (const k of [0, 2e-5, 1e-4]) {
    const a = 1e-3 / 1.225, P = { f, k, a }, s = K.planeStepper(P), d = f * f + k * k;
    // u + i v = w; dw/dt = i a − (k + i f) w, w(0) = 0 → w = w∞ (1 − e^{−(k + i f) t})
    const wInf = { re: a * f / d, im: a * k / d };
    while (s.t < 2.5e5) s.step(60);
    const e = Math.exp(-k * s.t), c = Math.cos(f * s.t), sn = Math.sin(f * s.t), E = { re: e * c, im: -e * sn };
    near(s.u, wInf.re - (wInf.re * E.re - wInf.im * E.im), 1e-8, "u"); near(s.v, wInf.im - (wInf.re * E.im + wInf.im * E.re), 1e-8, "v");
    const n = s.ups.length; if (k <= 2e-5 && s.t > 2 * 2 * Math.PI / Math.abs(f)) ok(n >= 2 && !s.dead, "geçişler kaydedildi");
    if (n >= 2) near((s.ups[n - 1] - s.ups[0]) / (n - 1), 2 * Math.PI / Math.abs(f), 1e-7, "eylemsizlik periyodu");
    if (s.dead) ok(Math.exp(-k * s.t) < 1e-3, "salınım gerçekten söndü");
    if (!k && n >= 2) near(Math.abs(s.xs[n - 1] - s.xs[n - 2]) / (s.ups[n - 1] - s.ups[n - 2]), 1e-3 / (1.225 * Math.abs(f)), 1e-7, "ortalama hız = v_g");
    else { const ss = K.steadyFriction(1e-3, 1.225, f, k); near(ss.angle, Math.atan(k / Math.abs(f)) * 180 / Math.PI, 1e-12); near(ss.speed, a / Math.sqrt(d), 1e-12); }
  }
}
ok(K.geostrophic(1e-3, 1.2, 0) === null, "f = 0: v_g tanımsız");
for (const [lat, sign, expect] of [[45, 1, 1], [-45, 1, -1], [45, -1, -1], [-45, -1, 1]]) {
  const V = { f: K.coriolisF(lat), k: 2e-5, rho: 1.225, s: 4e5, dp: 2000, sign }; const tr = { x: 6e5, y: 0, u: 0, v: 0 }; let Ls = 0;
  for (let t = 0; t < 86400; t += 60) { K.vortexStep(tr, V, 60); Ls += tr.x * tr.v - tr.y * tr.u; }
  ok(Math.sign(Ls) === expect, `dönüş yönü φ=${lat}, ${sign > 0 ? "alçak" : "yüksek"}`);
}
console.log(`G atmosfer: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

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
  const DIGEST = `/shared/digest/${SLUG}.js`; // defter yazıldı: 404 artık hata sayılır
  assert(fs.existsSync(join(root, DIGEST)), "defter dosyası var olmalı");
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
      const until = async (fn, ms = 30000) => { await page.waitForFunction(fn, null, { timeout: ms }); checks++; };
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("input,select")].filter((e) => !e.closest(".digest") && !document.querySelector(`label[for="${e.id}"]`) && !e.getAttribute("aria-label")).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      ok(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].every((c) => c.getAttribute("role") === "img" && c.getAttribute("aria-label"))), "tuvaller role=img");
      // 1 · basınç
      await has("pzP", "540,2 hPa"); await has("pzPiso", "559,9 hPa"); await has("pzHalf", "5,477 km"); await has("pzBoil", "82,9 °C"); await has("pzTable", "2,8 × 10⁻⁴ %");
      await page.click("#pzTropo"); await has("pzP", "226,3 hPa"); await has("pzT", "216,65 K");
      await range("pzAlt", 84); await has("pzBoil", "Tanımsız"); await has("pzStatus", "üçlü nokta");
      await range("pzAlt", 0); await has("pzBoil", "100,0 °C"); await has("pzP", "1013,3 hPa");
      await sel("pzStep", "2500"); await has("pzStatus", "katman sınırları adımın içine"); await sel("pzStep", "1000");
      await page.click("#pzT250"); await has("pzH", "7,318 km");
      await page.click("#pzReset"); await has("pzP", "540,2 hPa"); ok((await page.locator("#pzStep").inputValue()) === "10", "basınç sıfırlama");
      // klavye
      await page.locator("#tab-press").focus(); await page.keyboard.press("End"); ok((await page.locator("#tab-cor").getAttribute("aria-selected")) === "true", "End");
      await page.keyboard.press("Home"); await page.keyboard.press("ArrowRight"); ok((await page.locator("#tab-lift").getAttribute("aria-selected")) === "true", "ArrowRight");
      // 2 · parsel
      await has("lfTd", "13,87 °C"); await has("lfLCL", "1394 m"); await has("lfEspy", "1392 m"); await has("lfGd", "9,7724 K/km"); await has("lfGm", "4,853 K/km"); await has("lfLee", "30,7 °C"); await has("lfWarm", "+5,66 K");
      await page.click("#lfDry"); await has("lfRain", "yoğuşma yok"); await has("lfWarm", "0,00 K"); await has("lfStatus", "doymadan");
      await page.click("#lfSat"); await has("lfLCL", "0 m"); await has("lfGd", "—"); await has("lfStatus", "sis");
      await range("lfRH", 5); await range("lfT", -10); await has("lfTOut", "−10,0 °C"); await range("lfT", 40); await range("lfPs", 700); await range("lfHm", 5000); await has("lfHmOut", "5000 m");
      await page.click("#lfFoehn"); await has("lfHmOut", "3000 m");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("lfLCL", "1394 m");
      // 3 · kararlılık
      await page.click("#tab-stab"); await sel("stSpeed", "300");
      await has("stN2", "1,166 × 10⁻⁴"); await has("stCape", "0 J/kg");
      await until(() => /^\d+,\d s$/.test(document.getElementById("stPer").textContent) && /dk \(/.test(document.getElementById("stPerTh").textContent) && !/yarım/.test(document.getElementById("stPerTh").textContent));
      await has("stPer", "581,8 s");
      await page.click("#stStorm"); await has("stCape", "2696 J/kg"); await has("stW", "73,43 m/s"); await has("stLevels", "745 · 864 · 11 443 m");
      await page.click("#stInv"); await has("stRows", "inversiyon"); await has("stN2", "6,177 × 10⁻⁴");
      await page.click("#stSuper"); await has("stRows", "mutlak kararsız"); await sel("stSpeed", "300");
      await until(() => /× 10/.test(document.getElementById("stPer").textContent));
      await range("stL1", -10); await range("stL1", 12); await has("stL1Out", "12,0 K/km"); await range("stZ0", 15800); await range("stDisp", 500); await has("stDispOut", "500 m");
      await page.click("#stRun"); ok((await read("stRun")) === "Devam et", "duraklat");
      await page.locator("h1").click(); await page.keyboard.press(" "); ok((await read("stRun")) === "Duraklat", "boşluk devam ettirir");
      await page.click("#stReset"); await has("stZ0Out", "2000 m"); await has("stN2", "1,166 × 10⁻⁴");
      // 4 · Coriolis
      await page.click("#tab-cor"); await range("coSpeed", 24);
      await has("coF", "1,031 × 10⁻⁴"); await has("coVg", "7,92 m/s");
      await until(() => /^\d+,\d{3} sa$/.test(document.getElementById("coTi").textContent));
      await has("coTiTh", "16,924 sa"); await until(() => /^7,92 m\/s$/.test(document.getElementById("coVm").textContent));
      await until(() => document.getElementById("coSense").textContent === "saat yönünün tersine");
      await page.click("#coSouth"); await range("coSpeed", 24); await has("coVgNote", "batıya"); await until(() => document.getElementById("coSense").textContent === "saat yönünde");
      await page.click("#coSurf"); await range("coSpeed", 24); await until(() => /\+?0,00 %\)?$/.test(document.getElementById("coAngTh").textContent) && /44,12°/.test(document.getElementById("coAng").textContent), 40000);
      await page.click("#coEq"); await has("coVg", "Tanımsız"); await has("coTi", "—"); await has("coStatus", "Ekvatordasın"); await has("coStatus", "uç hıza"); await range("coSpeed", 24); await until(() => document.getElementById("coVm").textContent === "8,16 m/s"); // sürtünme açıkken: a/k uç hızı, "sabit ivme" değil
      await range("coLat", 3); await has("coStatus", "geçerli değildir");
      await range("coLat", -90); await range("coLat", 90); await range("coGrad", 0.2); await range("coGrad", 5); await range("coRho", 0.4); await has("coRhoOut", "0,400"); await range("coRho", 1.3);
      await sel("coSys", "high"); await page.locator("h1").click(); await page.keyboard.press("r"); ok((await page.locator("#coSys").inputValue()) === "low" && (await page.locator("#coLat").inputValue()) === "45", "R sıfırlar (4)");
      ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma yok`);
      ok(await page.evaluate(() => Object.isFrozen(AtmosLab) && !Object.getOwnPropertyDescriptor(window, "AtmosLab").writable), "çekirdek salt okunur");
      assert.deepEqual(errors, []); checks++;
      await ctx.close();
    }
    console.log(`G atmosfer: ${checks - before} kalıcı tarayıcı kontrolü (390 açık, 1280 koyu) PASS`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
