// G · dairesel-hareket.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// kapalı biçimli çember kinematiği, açı değişkeninde ayrı bir RK4 sarkaç, enerji korunumu, etkin potansiyelin
// kaba taraması, vektör biçiminde kuvvet dengesinin ikiye bölmeyle (bisection) çözümü ve düz çizginin döndürülmesi.
// Kullanım: node scripts/check-g-dairesel-hareket.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../dairesel-hareket.html", import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.CircleLab;
let checks = 0;
const near = (a, e, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - e) <= tol * Math.max(1, Math.abs(e)), `${label} ${a} ≠ ${e} (tol ${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
const g = 9.80665, DT = 1e-3;
near(K.G, g, 0, "g"); ok(Object.isFrozen(K), "çekirdek dondurulmuş");

/* ── 1. Düzgün dairesel hareket: kapalı biçim çember, sürat/yarıçap korunumu, kiriş formülü ── */
for (const [r, v] of [[1.5, 3], [0.5, 8], [3, 0.5], [0.5, 0.5], [3, 8], [1, 2.2]]) {
  const w = v / r; let s = { x: r, y: 0, vx: 0, vy: v }; const vs = [[0, v]];
  const n = 4000;
  for (let i = 1; i <= n; i++) { s = K.rattle(s, DT, r, K.ZERO, false); vs.push([s.vx, s.vy]); }
  near(Math.hypot(s.x, s.y), r, 1e-12, "yarıçap"); near(Math.hypot(s.vx, s.vy), v, 1e-12, "sürat");
  // konum: x = r cos ωt (faz hatası (ωdt)²/12 mertebesinde)
  const th = Math.atan2(s.y, s.x), ex = (w * n * DT) % (2 * Math.PI), dph = Math.atan2(Math.sin(th - ex), Math.cos(th - ex));
  ok(Math.abs(dph) < (w * DT) ** 2 * w * n * DT / 5 + 1e-9, `faz ${dph}`);
  near(s.T, v * v / r, 2 * (w * DT) ** 2, "ip kuvveti/m");
  // |Δv|/Δt, kesin kinematikte 2v sin(ωΔt/2)/Δt — burada hız vektörleri doğrudan dönen vektör olarak kurulur
  for (const k of [1, 20, 100, 500]) {
    const [ax, ay] = K.diffAccel(...vs[n - k], ...vs[n], k * DT), am = Math.hypot(ax, ay);
    const exact = Math.hypot(-v * Math.sin(w * n * DT) + v * Math.sin(w * (n - k) * DT), v * Math.cos(w * n * DT) - v * Math.cos(w * (n - k) * DT)) / (k * DT);
    near(am, exact, 1e-4 + 2 * (w * DT) ** 2 * w * n * DT, "Δv/Δt");
    if (k === 1) near(am, v * v / r, 2e-4, "Δt→0 limiti");
  }
}
// varsayılan durum sayıları (rapordaki): r = 1.5, v = 3, Δt = 20 ms
{ const v = 3, r = 1.5, w = 2, dt = 0.02; near(2 * v * Math.sin(w * dt / 2) / dt, 5.9996, 1e-4, "varsayılan beklenti"); near(2 * Math.PI / w, 3.14159, 1e-5); }
// ip kesilince: kuvvet yok → teğet doğru boyunca düz gider (sayfa bunu x += v dt ile yapar; burada kontrol yalnızca geometri)
ok(K.dAngle(1, 0, 0, 1) > 0 && Math.abs(K.dAngle(1, 0, 0, 1) - Math.PI / 2) < 1e-15, "dAngle");

/* ── 2. Düzgün olmayan: θ(t) = ω₀t + αt²/2 kapalı biçimiyle konum, sonlu farklı ivme bileşenleri ── */
for (const [r, w0, al] of [[1.5, 0.5, 0.5], [0.5, 4, -2], [3, 0, 2], [1, 2, -0.75], [2, 1, 0]]) {
  let s = { x: r, y: 0, vx: 0, vy: w0 * r }, th = 0; const buf = [];
  const n = 3000;
  for (let i = 1; i <= n; i++) { const o = s; s = K.rattle(o, DT, r, K.tangential(al), false); th += K.dAngle(o.x, o.y, s.x, s.y); buf.push([s.vx, s.vy, s.x, s.y, th]); }
  const t = n * DT, thEx = w0 * t + 0.5 * al * t * t;
  near(th, thEx, 2e-5 * Math.max(1, Math.abs(thEx)), "θ(t)");
  near(Math.hypot(s.x, s.y), r, 1e-12, "yarıçap");
  near(Math.hypot(s.vx, s.vy), Math.abs(w0 + al * t) * r, 2e-5 * r * Math.max(1, Math.abs(w0 + al * t)), "sürat = |ω|r");
  const a = buf[n - 11], b = buf[n - 1], c = buf[n - 6], h2 = 10 * DT;
  const [ax, ay] = K.diffAccel(a[0], a[1], b[0], b[1], h2), rr = Math.hypot(c[2], c[3]), ux = c[2] / rr, uy = c[3] / rr;
  const tm = t - 5 * DT, wm = w0 + al * tm;
  // merkezi farkın kesme hatası ≈ (h²/6)·|d²a/dt²| ≈ (h²/6)·ω⁴r (h = 5 ms); aşağıdaki pay bunun iki katı
  const fdTol = 2 * (5 * DT) ** 2 / 6 * (wm ** 4 * r + 6 * Math.abs(al * wm * wm) * r) + 2e-5;
  ok(Math.abs(ax * -uy + ay * ux - al * r) < fdTol, `a_t ${ax * -uy + ay * ux} vs ${al * r}`);
  ok(Math.abs(-(ax * ux + ay * uy) - wm * wm * r) < fdTol, "a_c");
  near((b[4] - a[4]) / h2, wm, 1e-5, "ω ölçümü");
}

/* ── 3a. Düşey çember: açı değişkeninde bağımsız RK4 sarkaç, enerji ve ip kuvveti ── */
function pendulum(L, vb, T, dt = 1e-4) { // φ'' = −(g/L) sin φ; φ alttan, saat yönü tersine
  let ph = 0, om = vb / L; const n = Math.round(T / dt);
  const f = (p, o) => [o, -g / L * Math.sin(p)];
  for (let i = 0; i < n; i++) { const k1 = f(ph, om), k2 = f(ph + dt / 2 * k1[0], om + dt / 2 * k1[1]), k3 = f(ph + dt / 2 * k2[0], om + dt / 2 * k2[1]), k4 = f(ph + dt * k3[0], om + dt * k3[1]); ph += dt / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]); om += dt / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]); }
  return { ph, om };
}
for (const [L, vb] of [[1, 7.5], [0.5, 6], [2, 4], [1, 3], [1.5, 10]]) {
  let s = { x: 0, y: -L, vx: vb, vy: 0, slack: false };
  const E0 = 0.5 * vb * vb - g * L; let worst = 0, slack = false;
  for (let i = 1; i <= 1500; i++) {
    const o = s; s = K.rattle(o, DT, L, K.gravity(g), true); if (s.slack) { slack = true; break; }
    worst = Math.max(worst, Math.abs(0.5 * (s.vx ** 2 + s.vy ** 2) + g * s.y - E0) / Math.max(1, Math.abs(E0)));
    if (i % 500 === 0) {
      const ref = pendulum(L, vb, i * DT);
      near(s.x, L * Math.sin(ref.ph), 2e-4, "x"); near(s.y, -L * Math.cos(ref.ph), 2e-4, "y");
      // ip kuvveti (adım ortası) — ortadaki duruma göre m(v²/L + g cos φ)
      const mx = (o.x + s.x) / 2, my = (o.y + s.y) / 2, v2 = ((o.vx + s.vx) / 2) ** 2 + ((o.vy + s.vy) / 2) ** 2, cph = -my / Math.hypot(mx, my);
      near(s.T, v2 / L + g * cph, 3e-3, "gerilme");
    }
  }
  ok(!slack || vb < Math.sqrt(5 * g * L), "tam turda gevşeme yok");
  ok(worst < 1e-4, `enerji ${worst}`);
}
// Tepede ve altta gerilme farkı 6mg (tam tur), enerjiden: m(v_b²/L + g) − m((v_b² − 4gL)/L − g) = 6mg
{ const th = K.loopTheory(1, 7.5); near(th.tension(0, 0.5) - th.tension(Math.PI, 0.5), 6 * 0.5 * g, 1e-12, "6mg"); near(th.vTop, Math.sqrt(7.5 ** 2 - 4 * g), 1e-12); near(th.vBotMin, Math.sqrt(5 * g), 1e-12); }
// Gevşeme açısı: bisection ile T(φ) = 0 (enerjiden v², radyal Newton yasasından T) ve benzetimdeki ilk gevşeme
for (const [L, vb] of [[1, 6], [1, 5], [0.5, 4.5], [2, 9], [1, 7.0]]) {
  const T = (ph) => (vb * vb - 2 * g * L * (1 - Math.cos(ph))) / L + g * Math.cos(ph);
  let lo = 0, hi = Math.PI; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (T(m) > 0) lo = m; else hi = m; }
  const th = K.loopTheory(L, vb);
  near(th.slackPhi, lo, 1e-9, "gevşeme açısı kapalı biçim");
  let s = { x: 0, y: -L, vx: vb, vy: 0, slack: false }, prevT = null, prevPh = null, found = null;
  for (let i = 0; i < 20000 && !found; i++) {
    const o = s; s = K.rattle(o, DT, L, K.gravity(g), true);
    if (s.slack) { const u = prevT / (prevT - s.lam1), po = Math.atan2(o.x, -o.y); found = prevPh + u * (po - prevPh); break; }
    prevT = s.T; prevPh = Math.atan2((o.x + s.x) / 2, -(o.y + s.y) / 2);
  }
  near(found, lo, 2e-3, `benzetimde gevşeme (L=${L}, v=${vb})`);
}
// İp yeniden gerilince dışa radyal hız sıfırlanır (enerji kaybı), iç bileşen korunur
{ const s = K.rattle({ x: 0, y: 0.999, vx: 0.3, vy: 2, slack: true }, 0.01, 1, K.ZERO, true); ok(!s.slack && s.jerk > 0, "yeniden gerilme"); near(s.vx * s.x + s.vy * s.y, 0, 1e-12, "radyal hız sıfır"); }

/* ── 3b. Konik sarkaç: etkin potansiyelin kaba taraması ve tümleştirme ── */
for (const L of [0.2, 0.5, 1, 2]) for (const w of [0, 2, 3.5, 4, 6, 10]) {
  // U(θ) = −g L cos θ − ½ ω² L² sin² θ (birim kütle başına; dönen düzlemde) — en küçüğü tarama ile
  let best = 0, bu = Infinity; for (let i = 0; i <= 180000; i++) { const t = i / 180000 * Math.PI / 2, u = -g * L * Math.cos(t) - 0.5 * w * w * L * L * Math.sin(t) ** 2; if (u < bu) { bu = u; best = t; } }
  const th = K.coneTheory(w, L).theta;
  near(th, best, 2e-5, `konik kuram L=${L} ω=${w}`);
  if (Math.abs(w - Math.sqrt(g / L)) / Math.sqrt(g / L) < 0.15) continue; // kritik yakınında yerleşme çok yavaş
  let s = [5 * Math.PI / 180, 0]; const f = K.coneDeriv(w, L, 2.5);
  for (let i = 0; i < 40000; i++) s = K.rk4(f, s, DT);
  near(s[0], best, 5e-5, `konik tümleştirme L=${L} ω=${w}`);
}
near(K.coneTheory(4, 1).theta * 180 / Math.PI, 52.198, 1e-4, "varsayılan 52.20°");

/* ── 3c. Viraj: vektör biçiminde kuvvet dengesi + bisection ile eşikler; benzetimli tarama ── */
function feasible(v, r, beta, mu) {
  // Bilinmeyenler N (yüzeye dik, yukarı-içe) ve f (yüzey boyunca, aşağı-içe). Yatay iç: ma = v²/r; düşey: 0.
  const n = [-Math.sin(beta), Math.cos(beta)], t = [-Math.cos(beta), -Math.sin(beta)]; // (dış +x, yukarı +y)
  const need = [-v * v / r, g]; // N·n + f·t = need (kütle başına)
  const det = n[0] * t[1] - n[1] * t[0], N = (need[0] * t[1] - need[1] * t[0]) / det, F = (n[0] * need[1] - n[1] * need[0]) / det;
  return { ok: N > 0 && Math.abs(F) <= mu * N, N, F };
}
const bis = (fn, a, b) => { for (let i = 0; i < 100; i++) { const m = (a + b) / 2; if (fn(m)) b = m; else a = m; } return (a + b) / 2; };
for (const r of [10, 50, 200]) for (const bd of [0, 10, 20, 35, 45]) for (const mu of [0, 0.1, 0.3, 0.7, 1]) {
  const beta = bd * Math.PI / 180, th = K.bankTheory(r, beta, mu);
  const F = K.bankForces(1.7, beta), ref = feasible(Math.sqrt(1.7 * r), r, beta, mu);
  near(F.N, ref.N, 1e-12, "N"); near(F.f, ref.F, 1e-12, "f");
  if (mu > 0 || bd === 0) {
    if (Math.tan(beta) > mu) near(th.vMin, bis((v) => feasible(v, r, beta, mu).ok, 0, th.vIdeal), 1e-9, "v_min"); else ok(th.vMin === 0 && feasible(0, r, beta, mu).ok, "durarak tutunur");
    if (1 - mu * Math.tan(beta) > 1e-9) near(th.vMax, bis((v) => !feasible(v, r, beta, mu).ok, Math.max(th.vIdeal, 0), 1e12), 1e-9, "v_max"); else ok(th.vMax === Infinity && feasible(1e4, r, beta, mu).ok, "sınırsız");
  }
  const av = K.bankAvail(beta, mu);
  if (Number.isFinite(av.hi)) near(av.hi, th.vMax ** 2 / r, 1e-9, "H_hi"); if (Math.tan(beta) > mu) near(av.lo, th.vMin ** 2 / r, 1e-9, "H_lo");
}
near(K.bankTheory(50, 0, 0.7).vMax, 18.52654, 1e-6, "düz viraj"); near(K.bankTheory(50, 20 * Math.PI / 180, 0).vIdeal, 13.3591, 1e-5);
// Sayfadaki taramanın aynısı: sürat 5 m/s² ile artar, kısıt kuvveti H ölçülür, |f|/N'nin −μ, 0, +μ geçişleri ara değerle
function sweep(r, bd, mu) {
  const beta = bd * Math.PI / 180; let s = { x: r, y: 0, vx: 0, vy: 0 }, t = 0, lq = null, lv = null; const out = { vMin: null, vId: null, vMax: null };
  while (5 * t < 60) {
    t += DT; const v = Math.min(60, 5 * t), n = K.rattle(s, DT, r, K.ZERO, false), sp = Math.hypot(n.vx, n.vy);
    s = { x: n.x, y: n.y, vx: -n.y / r * v, vy: n.x / r * v };
    const F = K.bankForces(n.T, beta), q = F.f / F.N;
    if (lq !== null) for (const [key, lvl] of [["vMin", -mu], ["vId", 0], ["vMax", mu]]) if (out[key] === null && lq < lvl && q >= lvl) out[key] = lv + (sp - lv) * (lvl - lq) / (q - lq);
    if (sp > 0) { lq = q; lv = sp; }
  }
  return out;
}
for (const [r, bd, mu] of [[50, 0, 0.7], [50, 20, 0], [50, 20, 0.3], [10, 35, 0.2], [200, 10, 0.5]]) {
  const th = K.bankTheory(r, bd * Math.PI / 180, mu), m = sweep(r, bd, mu);
  if (Math.tan(bd * Math.PI / 180) > mu) near(m.vMin, th.vMin, 2e-4, "tarama v_min");
  if (bd > 0) near(m.vId, th.vIdeal, 2e-4, "tarama ideal");
  if (th.vMax < 60) near(m.vMax, th.vMax, 2e-4, "tarama v_max"); else ok(m.vMax === null, "60 m/s üstü");
}

/* ── 4. Dönen çerçeve: döndürülmüş düz çizgi = sözde kuvvetli RK4; merkezden radyal fırlatmada kapalı biçim ── */
for (const [Om, v, r0, psi, carry] of [[1, 0.8, 0, 0, false], [-2, 1.5, 0.5, 90, false], [3, 0.2, 1, 180, true], [0.5, 3, 0.3, 45, true], [0, 1, 0.2, 30, false]]) {
  const ps = psi * Math.PI / 180, vix = v * Math.cos(ps), viy = v * Math.sin(ps) + (carry ? Om * r0 : 0);
  let s = [r0, 0, vix, viy - Om * r0], err = 0;
  for (let i = 1; i <= 2000; i++) {
    s = K.rk4(K.rotDeriv(Om), s, DT); const t = i * DT;
    // bağımsız: eylemsiz konumu −Ωt kadar döndür (elle yazılmış dönme matrisi)
    const X = r0 + vix * t, Y = viy * t, c = Math.cos(Om * t), sn = Math.sin(Om * t), xr = X * c + Y * sn, yr = -X * sn + Y * c;
    err = Math.max(err, Math.hypot(xr - s[0], yr - s[1]));
    const [kx, ky] = K.toRotating(X, Y, Om * t); near(kx, xr, 1e-12); near(ky, yr, 1e-12);
  }
  ok(err < 1e-9, `iki yol farkı ${err}`);
}
{ // merkezden radyal: dönen çerçevede yanal sapma kesin −v t sin(Ωt); varsayılan t_m = 0.5 s
  const Om = 1, v = 0.8, t = 0.5, [xr, yr] = K.toRotating(v * t, 0, Om * t);
  near(yr, -v * t * Math.sin(Om * t), 1e-12, "kesin sapma"); near(yr * 100, -19.1770, 1e-4, "−19.177 cm"); near(-Om * v * t * t * 100, -20, 1e-12);
}
console.log(`G dairesel-hareket: ${checks.toLocaleString("tr-TR")} bağımsız çekirdek kontrolü PASS`);

/* ── Tarayıcı ── */
if (process.argv.includes("--browser")) {
  const { chromium } = await import("playwright");
  const { createServer } = await import("node:http");
  const { join, extname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = fileURLToPath(new URL("../", import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname)); if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" })[extname(file)] || "application/octet-stream"); res.end(fs.readFileSync(file)); });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const before = checks; let browser;
  try {
    browser = await chromium.launch();
    for (const [width, themeName] of [[390, "light"], [1280, "dark"]]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
      await page.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, themeName);
      page.setDefaultTimeout(8000);
      const errors = []; page.on("pageerror", (e) => errors.push(e.message)); page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/dairesel-hareket.html`);
      const read = (id) => page.locator("#" + id).textContent();
      const has = async (id, t) => { const x = await read(id); assert(x.includes(t), `${id}: "${x}" ⊅ "${t}"`); checks++; };
      const waitHas = async (id, t, ms = 20000) => { await page.waitForFunction(([i, s]) => document.getElementById(i).textContent.includes(s), [id, t], { timeout: ms }); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, v);
      // etiketler: her denetimin <label for> karşılığı var
      const unlabeled = await page.evaluate(() => [...document.querySelectorAll("main input, main select, .app-content input, .app-content select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).map((e) => e.id));
      assert.deepEqual(unlabeled, []); checks++;
      // 01 varsayılan
      await has("uROut", "1.5 m"); await has("uVOut", "3.0 m/s"); await has("uDtOut", "20 ms");
      await waitHas("uAccTh", "fark"); await has("uAccTh", "6.0000 m/s²"); await has("uAccFin", "5.9996"); await waitHas("uOmega", "2.0000"); await has("uPeriodTh", "3.142 s");
      await range("uDt", 500); await waitHas("uAccFin", "5.7531"); await waitHas("uAccTh", "fark −4.11 %"); await has("uAccFinDiff", "−4.11 %");
      await page.locator("#uMode").selectOption("T"); ok(await page.locator("#uTField").isVisible(), "T alanı"); await has("uTOut", "3.1 s");
      await range("uR", 3); await range("uT", 0.5); await waitHas("uSpeedTh", "37.699"); // sınır: 2π·3/0.5
      await page.click("#uCut"); await waitHas("uStatus", "İp kesildi", 4000); await page.waitForTimeout(400); await has("uOmegaTh", "ip kesik");
      await page.click("#uReset"); await has("uVOut", "3.0 m/s"); await has("uROut", "1.5 m"); ok(await page.locator("#uVField").isVisible(), "v alanı geri");
      // klavye: Boşluk duraklatır, R sıfırlar (odak gövdedeyken)
      await page.locator("h1").click(); await page.keyboard.press("Space"); await has("uToggle", "Devam et"); await page.keyboard.press("r"); await has("uToggle", "Duraklat");
      // sekmeler ve klavye
      await page.locator("#tab-uni").focus(); await page.keyboard.press("End"); ok(await page.locator("#tab-rot").getAttribute("aria-selected") === "true", "End");
      await page.keyboard.press("Home"); ok(await page.locator("#tab-uni").getAttribute("aria-selected") === "true", "Home");
      await page.keyboard.press("ArrowRight"); ok(await page.locator("#tab-non").getAttribute("aria-selected") === "true", "→");
      // 02
      await waitHas("nAtTh", "fark"); await has("nAtTh", "0.7500 m/s²"); await has("nW0Out", "0.5 rad/s"); await has("nAlphaOut", "0.50 rad/s²");
      await range("nAlpha", -2); await range("nW0", 4); await page.waitForTimeout(2600); await has("nStatus", "durdu");
      await range("nAlpha", 0); await waitHas("nPhi", "0.00°"); await has("nAtTh", "α = 0");
      await page.click("#nReset"); await has("nAlphaOut", "0.50");
      // 03
      await page.click("#tab-dyn"); await has("cWOut", "4.00 rad/s"); await waitHas("cEq", "52.20°", 25000); await has("cEqTh", "52.20°");
      await range("cW", 2); await waitHas("cTenTh", "T = mg = 4.903 N", 3000); // ω < ω_k: yerleşmeden önce de kuram mg
      await range("cW", 4); await waitHas("cTenTh", "kuram mω²L: 8.000 N", 3000);
      await range("cW", 2); await waitHas("cEq", "0.00°", 25000); await has("cTen", "4.903 N"); await has("cCritNote", "ω ≤ ω_k");
      await page.click("#dPresetFlat"); await has("kBankOut", "0°"); await waitHas("kNeed", "0.45"); await has("kVidTh", "tanımsız");
      await range("kV", 20); await waitHas("dStatus", "Fazla hızlı", 4000);
      await page.click("#dPresetBankMu"); await page.click("#kSweep"); await waitHas("kVmax", "19.12", 20000); await has("kVmin", "5.32"); await has("kVid", "13.36"); await has("kVmaxTh", "19.12");
      await page.click("#dPresetBank0"); await has("kMuOut", "0.00"); await has("kVOut", "13.4 m/s");
      await page.click("#dPresetLoop"); await waitHas("lVtop", "4.126", 6000); await has("lVtopTh", "4.126"); await waitHas("lTbot", "33.0", 6000); await has("lTtop", "3.6");
      await range("lV", 7); await waitHas("lSlack", "°", 6000); await has("dStatus", "gevşer");
      await range("lV", 0); await waitHas("lTbotTh", "hareketsiz", 3000); await range("lV", 12); await has("lVOut", "12.00");
      await page.click("#dReset"); await has("lVOut", "7.50 m/s");
      // 04
      await page.click("#tab-rot"); await waitHas("rDefl", "−19.177 cm", 6000); await has("rCor", "−20.000 cm"); await has("rDeflSide", "sağına");
      await range("rOmega", 0); await waitHas("rDefl", "0.000 cm", 6000); await has("rStatus", "Ω = 0");
      await range("rOmega", -3); await range("rTm", 0.1); await waitHas("rDeflSide", "soluna", 4000); await has("rDefl", "cm");
      await page.click("#rReset"); await has("rOmegaOut", "1.00 rad/s");
      ok(await page.evaluate(() => Object.isFrozen(window.CircleLab) && !Object.getOwnPropertyDescriptor(window, "CircleLab").writable), "dondurulmuş global");
      for (const t of ["uni", "non", "dyn", "rot"]) { await page.click("#tab-" + t); await page.waitForTimeout(150); ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `taşma yok ${t} ${width}`); }
      assert.deepEqual(errors, []); checks++;
      await page.close();
    }
    console.log(`G dairesel-hareket: ${checks - before} gerçek tarayıcı UI/ön ayar/sınır/klavye kontrolü PASS (390 açık, 1280 koyu)`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
