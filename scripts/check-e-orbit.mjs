// Gezegen Savunması: yörünge çekirdeğinin bağımsız başvurularla denetimi.
// HTML uygulamadır; buradaki başvurular (RK4, vis-viva, Kepler, hiperbol geometrisi) çekirdeğin kodunu yinelemez.
// Kullanım: node scripts/check-e-orbit.mjs [--browser]
import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../gezegen-savunmasi.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'Orbit kernel boundaries are required');
const win = {};
new Function('window', source)(win);
const K = win.OrbitGame;
assert(K && Object.isFrozen(K), 'window.OrbitGame must be a frozen object');

let checks = 0;
const ok = (cond, msg) => { assert(cond, msg); checks++; };
const near = (actual, expected, tol, msg = '') => {
  assert(Math.abs(actual - expected) <= tol * Math.max(1, Math.abs(expected)), `${msg} ${actual} ≠ ${expected} (tol ${tol})`);
  checks++;
};
const TAU = 2 * Math.PI;

/* ── Sabitler ve kapalı formlar ── */
near(K.GM, 1, 0); near(K.R, 1, 0); near(K.R0, 1.1, 0); near(K.DT, 0.005, 0);
for (const r of [1, 1.1, 2, 3, 4.6, 7.5]) {
  near(K.circularSpeed(r), Math.sqrt(1 / r), 1e-14);
  near(K.escapeSpeed(r) / K.circularSpeed(r), Math.SQRT2, 1e-14);
}

/* ── Bağımsız başvuru bütünleyici: klasik RK4, küçük adım ── */
function rk4(state, t, h = 1e-3) {
  let [x, y, vx, vy] = state;
  const f = (x, y, vx, vy) => { const r3 = Math.hypot(x, y) ** 3; return [vx, vy, -x / r3, -y / r3]; };
  const n = Math.round(t / h);
  for (let i = 0; i < n; i++) {
    const a = f(x, y, vx, vy);
    const b = f(x + 0.5 * h * a[0], y + 0.5 * h * a[1], vx + 0.5 * h * a[2], vy + 0.5 * h * a[3]);
    const c = f(x + 0.5 * h * b[0], y + 0.5 * h * b[1], vx + 0.5 * h * b[2], vy + 0.5 * h * b[3]);
    const d = f(x + h * c[0], y + h * c[1], vx + h * c[2], vy + h * c[3]);
    x += (h / 6) * (a[0] + 2 * b[0] + 2 * c[0] + d[0]);
    y += (h / 6) * (a[1] + 2 * b[1] + 2 * c[1] + d[1]);
    vx += (h / 6) * (a[2] + 2 * b[2] + 2 * c[2] + d[2]);
    vy += (h / 6) * (a[3] + 2 * b[3] + 2 * c[3] + d[3]);
  }
  return [x, y, vx, vy];
}
const run = (b, n) => { for (let i = 0; i < n; i++) K.step(b); return b; };

/* ── 1. Dairesel yörünge daire kalır ve T sonra başa döner ── */
{
  const b = K.launchState(90, 1);
  const T = TAU * Math.sqrt(1.1 ** 3);
  let rmin = Infinity, rmax = 0;
  const n = Math.round((20 * T) / K.DT);
  for (let i = 0; i < n; i++) { K.step(b); const r = Math.hypot(b.x, b.y); rmin = Math.min(rmin, r); rmax = Math.max(rmax, r); }
  ok(rmax - rmin < 2e-5, `daire bozuldu: ${rmin}..${rmax}`);
  // 20 tur sonra çözümsel konum (saat yönünde, tepeden başlar)
  const t = n * K.DT, w = Math.sqrt(1 / 1.1 ** 3);
  const err = Math.hypot(b.x - 1.1 * Math.sin(w * t), b.y - 1.1 * Math.cos(w * t));
  ok(err < 2e-3, `20 turda faz kayması ${err}`);
  // ikinci mertebe: adım yarılanınca faz hatası dörtte bire iner
  const half = K.launchState(90, 1);
  for (let i = 0; i < 2 * n; i++) K.step(half, K.DT / 2);
  const errHalf = Math.hypot(half.x - 1.1 * Math.sin(w * t), half.y - 1.1 * Math.cos(w * t));
  ok(err / errHalf > 3.8 && err / errHalf < 4.2, `yakınsama oranı ${err / errHalf}`);
  const one = run(K.launchState(90, 1), Math.round(T / K.DT));
  ok(Math.hypot(one.x - 1.1 * Math.sin(w * Math.round(T / K.DT) * K.DT), one.y - 1.1 * Math.cos(w * Math.round(T / K.DT) * K.DT)) < 1e-4, 'bir tur sonra dönüş');
}

/* ── 2. Enerji ve açısal momentum korunumu; RK4 ile konum uyumu ── */
for (const [angle, ratio] of [[90, 1], [90, 1.1], [90, 1.2], [90, 1.3], [-90, 1.25], [75, 1.2], [80, 1.35], [60, 1.3]]) {
  const b = K.launchState(angle, ratio);
  const el = K.elements(b);
  const E0 = K.energy(b), h0 = K.angularMomentum(b);
  // bağımsız: a = 1/(2/r − v²)
  const v2 = b.vx ** 2 + b.vy ** 2;
  near(el.a, 1 / (2 / 1.1 - v2), 1e-12, 'a');
  near(el.T, TAU * (1 / (2 / 1.1 - v2)) ** 1.5, 1e-12, 'T');
  near(el.rp + el.ra, 2 * el.a, 1e-12, 'rp+ra');
  const ref = rk4([b.x, b.y, b.vx, b.vy], 5);
  const c = run(K.launchState(angle, ratio), 1000);
  ok(Math.hypot(c.x - ref[0], c.y - ref[1]) < 2e-4, `RK4 uyumu ${angle}/${ratio}: ${Math.hypot(c.x - ref[0], c.y - ref[1])}`);
  let worst = 0;
  const n = Math.round((30 * el.T) / K.DT);
  for (let i = 0; i < n; i++) {
    K.step(b);
    if (i % 50 === 0) {
      worst = Math.max(worst, Math.abs((K.energy(b) - E0) / E0));
      // vis-viva: v² = GM(2/r − 1/a)
      const r = Math.hypot(b.x, b.y);
      near(b.vx ** 2 + b.vy ** 2, 2 / r - 1 / el.a, 2e-4, 'vis-viva');
    }
  }
  ok(worst < 2e-4, `enerji sapması ${angle}/${ratio}: ${worst}`);
  near(K.angularMomentum(b), h0, 1e-10, 'açısal momentum');
}

/* ── 3. Kaçış eşiği ve düşme eşiği ── */
{
  ok(K.elements(K.launchState(90, 1.41)).kind === 'eliptik', '1.41 bağlı');
  ok(K.elements(K.launchState(90, 1.42)).kind === 'kacar', '1.42 kaçar');
  ok(K.elements(K.launchState(0, 1.42)).kind === 'kacar', 'dik atış 1.42 kaçar');
  ok(K.elements(K.launchState(0, 1.41)).kind === 'duser', 'dik atış 1.41 geri düşer');
  for (const angle of [90, 45, 0, -60]) {
    near(K.elements(K.launchState(angle, Math.SQRT2)).eps, 0, 1e-15, 'parabol ε');
    const b = K.launchState(angle, 1.5);
    const eps = K.energy(b);
    run(b, 40000);
    ok(Math.hypot(b.x, b.y) > 50, 'kaçan mermi uzaklaşır');
    near(Math.hypot(b.vx, b.vy), Math.sqrt(2 * eps + 2 / Math.hypot(b.x, b.y)), 3e-5, 'kaçışta vis-viva');
  }
  // yatay atışta düşme eşiği: yerberi = R ⇒ v/v_c = √(2R/(r₀+R))
  const edge = Math.sqrt(2 / 2.1);
  ok(edge > 0.97 && edge < 0.98, 'eşik aralığı');
  ok(K.elements(K.launchState(90, 0.97)).kind === 'duser', '0.97 düşer');
  ok(K.elements(K.launchState(90, 0.98)).kind === 'eliptik', '0.98 dolanır');
  for (const [ratio, falls] of [[0.8, true], [0.97, true], [0.98, false], [1, false]]) {
    const w = K.createWorld({ lab: true });
    const s = K.fire(w, 90, ratio);
    while (!s.dead && s.revs < 1 && w.t < 30) K.advance(w);
    ok((s.fate === 'planet') === falls, `dünya içinde ${ratio}: ${s.fate}`);
    if (falls) { near(Math.hypot(s.hx, s.hy), 1, 1e-6, 'yüzeyde silinir'); ok(w.shells.length === 0, 'mermi silindi'); }
  }
}

/* ── 4. Kepler'in üçüncü yasası: ölçülen periyot ── */
{
  const ratios = [[90, 1], [90, 1.1], [90, 1.2], [90, 1.3], [-90, 1.15], [75, 1.25]];
  for (const [angle, ratio] of ratios) {
    const w = K.createWorld({ lab: true });
    const s = K.fire(w, angle, ratio);
    while (s.revs < 2 && !s.dead && w.t < 200) K.advance(w);
    ok(s.revs === 2, `iki tur ${angle}/${ratio} (${s.fate})`);
    const v2 = (ratio * Math.sqrt(1 / 1.1)) ** 2, a = 1 / (2 / 1.1 - v2);
    near(s.Tmeas, TAU * a ** 1.5, 2e-5, 'ölçülen T');
    near(s.Tmeas ** 2 / a ** 3, 4 * Math.PI ** 2, 5e-5, 'T²/a³');
    ok(s.driftMax > 0 && s.driftMax < 2e-5, `sapma küçük ${s.driftMax}`);
  }
}

/* ── 5. Hiperbolik/eliptik yaklaşma: yerberi ve sapma açısı ── */
for (const [eps, q, dir] of [[0.1, 1.5, 1], [0.25, 2, -1], [0.02, 1.2, 1], [-0.03, 1.8, -1], [0.05, 3, 1]]) {
  const b = K.asteroidState(0.7, eps, q, dir);
  near(Math.hypot(b.x, b.y), K.R_SPAWN, 1e-12, 'doğuş uzaklığı');
  near(K.energy(b), eps, 1e-12, 'yaklaşma enerjisi');
  const el = K.elements(b);
  near(el.rp, q, 1e-9, 'yerberi (öğeler)');
  near(el.e, 1 + 2 * eps * q, 1e-9, 'dışmerkezlik e = 1 + 2εq/GM');
  ok(el.kind === (eps < 0 ? 'eliptik' : 'kacar'), 'ıskalayan yaklaşma sınıfı');
  let rmin = Infinity, swept = 0, px = b.x, py = b.y, guard = 0;
  do {
    K.step(b);
    swept += Math.atan2(px * b.y - py * b.x, px * b.x + py * b.y);
    px = b.x; py = b.y;
    rmin = Math.min(rmin, Math.hypot(b.x, b.y));
  } while ((Math.hypot(b.x, b.y) < K.R_SPAWN || b.x * b.vx + b.y * b.vy < 0) && guard++ < 1e6);
  near(rmin, q, 2e-5, 'ölçülen yerberi');
  // r = p/(1 + e cos f) ⇒ giriş ve çıkış arasında süpürülen açı 2f(r_s)
  const e = 1 + 2 * eps * q, p = q * (1 + e);
  const f = Math.acos((p / K.R_SPAWN - 1) / e);
  near(Math.abs(swept), 2 * f, 2e-3, 'süpürülen açı 2f');
  ok(Math.sign(swept) === dir, 'dolanma yönü');
}
// Oyundaki asteroitler: yerberi < R, mutlaka düşer
for (const eps of [-0.03, 0, 0.1, 0.25]) for (const q of [0, 0.3, 0.7]) {
  const el = K.elements(K.asteroidState(2, eps, q, 1));
  ok(el.kind === 'duser', `asteroit düşer ε=${eps} q=${q}`);
}

/* ── 6. Süpürme testi ── */
{
  near(K.sweep(-2, 0, 2, 0, 0, 0, 0, 0, 1), 0.25, 1e-12, 'çap boyunca');
  ok(K.sweep(-2, 1.01, 2, 1.01, 0, 0, 0, 0, 1) === -1, 'ıskalar');
  ok(K.sweep(0.5, 0, 2, 0, 0, 0, 0, 0, 1) === 0, 'içeride başlar');
  ok(K.sweep(1.5, 0, 3, 0, 0, 0, 0, 0, 1) === -1, 'uzaklaşır');
  near(K.sweep(0, 0, 0, 0, 3, 0, 0, 0, 1), 2 / 3, 1e-12, 'hareketli daire');
  // tek adımda gezegeni baştan sona geçen mermi yakalanır
  ok(K.sweep(-5, 0.2, 5, -0.1, 0, 0, 0, 0, 1) > 0, 'tünelleme yok');
  let seed = 42;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 6 - 3;
  for (let i = 0; i < 400; i++) {
    const [ax, ay, bx, by, cx, cy, dx, dy] = [rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd(), rnd()];
    const rad = 0.3 + Math.abs(rnd()) / 3;
    let brute = -1;
    for (let k = 0; k <= 4000; k++) {
      const t = k / 4000;
      if (Math.hypot(ax + (bx - ax) * t - cx - (dx - cx) * t, ay + (by - ay) * t - cy - (dy - cy) * t) <= rad) { brute = t; break; }
    }
    const got = K.sweep(ax, ay, bx, by, cx, cy, dx, dy, rad);
    if (brute < 0) ok(got < 0 || got > 0.999, `sahte temas ${got}`);
    else near(got, brute, 6e-4, 'kaba kuvvetle uyum');
  }
}

/* ── 7. Aylar aynı GM ile Kepler dairesinde ── */
for (const m of K.MOONS) {
  const T = TAU * Math.sqrt(m.r ** 3);
  const p0 = K.moonPosition(m, 0), p1 = K.moonPosition(m, T), h = 1e-5, p2 = K.moonPosition(m, h);
  near(Math.hypot(p0.x, p0.y), m.r, 1e-12, 'ay yarıçapı');
  ok(Math.hypot(p1.x - p0.x, p1.y - p0.y) < 1e-9, 'ay T sonra başa döner');
  near(Math.hypot(p2.x - p0.x, p2.y - p0.y) / h, Math.sqrt(1 / m.r), 1e-6, 'ay hızı = dairesel hız');
  ok(m.r - m.radius > K.R0 + 0.5 && m.r + m.radius < K.VIEW, 'ay görüş alanında, namludan uzak');
}
ok(K.MOONS[1].r - K.MOONS[1].radius > K.MOONS[0].r + K.MOONS[0].radius, 'aylar çakışmaz');

/* ── 8. Dünya: belirlenimcilik, edilgen oyuncu, temizlik ── */
const waveOne = K.waveSpec(1);
ok(waveOne.count === 4 && waveOne.interval === 5, '1. dalga planı');
for (let n = 1; n < 30; n++) {
  const a = K.waveSpec(n), b = K.waveSpec(n + 1);
  ok(b.count >= a.count && b.interval <= a.interval && b.epsMax >= a.epsMax && b.bigChance >= a.bigChance, `dalga ${n} zorlaşır`);
  ok(b.interval >= 1.8 && b.count <= 12, 'tavanlar');
}
for (let seed = 1; seed <= 25; seed++) {
  const w = K.createWorld({ seed });
  let firstImpact = null, spawned = 0, healthAt20 = null;
  while (!w.over && w.t < 200) {
    K.advance(w);
    for (const ev of w.events) if (ev.type === 'spawn') spawned++;
    w.events.length = 0;
    if (firstImpact === null && w.impacts) firstImpact = w.t;
    if (healthAt20 === null && w.t >= 20) healthAt20 = w.health;
    for (const a of w.asteroids) assert(Math.hypot(a.x, a.y) > K.R - 1e-9, 'asteroit gezegenin içinde kaldı');
  }
  ok(w.over, 'edilgen oyuncu sonunda yenilir');
  ok(firstImpact > 8, `ilk çarpma erken: ${firstImpact}`);
  ok(healthAt20 >= 3, `20 τ'da kalkan ${healthAt20}`);
  ok(w.t > 35, `edilgen oyuncu ${w.t} τ'da bitti`);
  ok(w.impacts + w.asteroids.length <= spawned && w.impacts >= K.MAX_HEALTH, 'her çarpma bir asteroit');
  const again = K.createWorld({ seed });
  while (!again.over && again.t < 200) { K.advance(again); again.events.length = 0; }
  ok(again.tick === w.tick && again.rng === w.rng, 'aynı tohum aynı oyun');
}
{
  // deney modu: asteroit doğmaz, kalkan düşmez
  const w = K.createWorld({ lab: true });
  for (let i = 0; i < 20000; i++) K.advance(w);
  ok(w.asteroids.length === 0 && w.health === K.MAX_HEALTH && w.wave === 0 && !w.over, 'deney modu sakin');
  // ateş hızı sınırı ve mermi tavanı
  const g = K.createWorld({ seed: 3 });
  ok(K.fire(g, 90, 1.3) !== null && K.fire(g, 90, 1.3) === null, 'bekleme süresi');
  for (let i = 0; i < 5000; i++) { K.advance(g); K.fire(g, 90, 1.3); }
  ok(g.shells.length <= 6, 'mermi tavanı');
  // kaçan mermi silinir
  const e = K.createWorld({ lab: true });
  const s = K.fire(e, 20, 1.6);
  while (!s.dead && e.t < 100) K.advance(e);
  ok(s.fate === 'escaped' && Math.hypot(s.x, s.y) > K.R_FAR && e.shells.length === 0, 'kaçan mermi silinir');
  // gezegenden uzaklaşan asteroit de silinir (ıskalayan yörünge elle eklenir)
  const far = K.createWorld({ lab: true });
  const rock = K.asteroidState(1, 0.2, 2.5, 1);
  Object.assign(rock, { id: 99, radius: 0.24, hp: 1, big: false, dead: false });
  far.asteroids.push(rock);
  while (far.asteroids.length && far.t < 200) K.advance(far);
  ok(far.asteroids.length === 0 && far.health === K.MAX_HEALTH, 'ıskalayan asteroit silinir');
  // aya çarpan mermi silinir
  const m = K.createWorld({ seed: 1 });
  let hitMoon = false;
  for (let a = -90; a <= 90 && !hitMoon; a += 2) hitMoon = K.predict(m, a, 1.3, 20, 1).fate === 'moon';
  ok(hitMoon, 'oyunda ay engeldir');
  let labMoon = false;
  const lm = K.createWorld({ lab: true });
  for (let a = -90; a <= 90 && !labMoon; a += 2) labMoon = K.predict(lm, a, 1.3, 20, 1).fate === 'moon';
  ok(!labMoon, 'deney modunda ay engel değil');
}

/* ── 9. Öngörü, gerçek adımlarla aynı sonucu verir; 1. dalga basit bir stratejiyle kazanılır ── */
function scripted(seed, untilWave) {
  const w = K.createWorld({ seed });
  let promised = 0, kept = 0, pending = null;
  while (!w.over && w.wave < untilWave && w.t < 120) {
    K.advance(w);
    for (const ev of w.events) if (pending && ev.type === 'kill' && ev.id === pending) { kept++; pending = null; }
    w.events.length = 0;
    if (w.tick % 100 !== 0 || !K.canFire(w) || !w.asteroids.length) continue;
    let best = null;
    for (const ratio of [1, 1.2, 1.4, 1.6]) for (let angle = -90; angle <= 90; angle += 10) {
      const p = K.predict(w, angle, ratio, 12);
      if (p.fate === 'hit' && (!best || p.time < best.time)) best = { angle, ratio, time: p.time, id: p.hit.id };
    }
    if (best && best.id !== pending) { K.fire(w, best.angle, best.ratio); promised++; pending = best.id; }
  }
  return { w, promised, kept };
}
for (const seed of [1, 2, 3, 4, 5, 6]) {
  const { w, promised, kept } = scripted(seed, 2);
  ok(!w.over && w.wave === 2, `tohum ${seed}: 1. dalga geçildi`);
  ok(w.impacts <= 1, `tohum ${seed}: ${w.impacts} çarpma`);
  ok(w.destroyed >= 3 && w.score >= 30, `tohum ${seed}: ${w.destroyed} asteroit`);
  ok(kept >= promised - 1, `tohum ${seed}: öngörülen ${promised} vuruşun ${kept} tanesi tuttu`);
}

console.log(`E yörünge: ${checks.toLocaleString('tr-TR')} bağımsız Kepler, korunum, süpürme ve oyun dengesi kontrolü PASS`);

/* ── İsteğe bağlı tarayıcı regresyonu ── */
if (process.argv.includes('--browser')) {
  const { createServer } = await import('node:http');
  const { createRequire } = await import('node:module');
  const { fileURLToPath } = await import('node:url');
  const { join, extname } = await import('node:path');
  const root = fileURLToPath(new URL('..', import.meta.url));
  const { chromium } = createRequire(import.meta.url)('playwright');
  const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.m4a': 'audio/mp4' };
  const server = createServer((req, res) => {
    const f = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': mime[extname(f)] || 'application/octet-stream' });
    res.end(fs.readFileSync(f));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  let browser, bchecks = 0;
  const bok = (c, m) => { assert(c, m); bchecks++; };
  try {
    browser = await chromium.launch();
    for (const [width, height, theme, touch] of [[390, 844, 'light', true], [1280, 900, 'dark', false]]) {
      const tag = `${width}/${theme}`;
      const ctx = await browser.newContext({ viewport: { width, height }, hasTouch: touch, locale: 'tr-TR' });
      await ctx.addInitScript((t) => { try { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); } catch (_) {} }, theme);
      const page = await ctx.newPage();
      page.setDefaultTimeout(10000);
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
      const snap = () => page.evaluate(() => window.OrbitGameUi.snapshot());
      const text = (id) => page.locator(`#${id}`).textContent();
      await page.goto(`${base}/gezegen-savunmasi.html?seed=7`);
      await page.waitForFunction(() => document.getElementById('gameTouchBar'));
      await page.waitForTimeout(700);
      // başlangıç: hiçbir şey akmıyor
      let s = await snap();
      bok(s.mode === 'ready' && s.tick === 0 && s.asteroids === 0, `${tag} başlangıçta bekler`);
      bok((await text('overlayTitle')).includes('Başlamak için tıkla/dokun'), `${tag} başlangıç yazısı`);
      bok((await page.evaluate(() => document.documentElement.dataset.theme === 'light')) === (theme === 'light'), `${tag} tema`);
      bok(await page.evaluate(() => Object.isFrozen(window.OrbitGame)), `${tag} çekirdek donuk`);
      const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      bok(await overflow() <= 0, `${tag} yatay taşma yok`);
      // alana tıklamak başlatır ama ateş etmez
      const canvas = page.locator('#gameCanvas');
      await canvas.scrollIntoViewIfNeeded();
      const box = await canvas.boundingBox();
      await page.mouse.click(box.x + box.width * 0.75, box.y + box.height * 0.25);
      await page.waitForTimeout(500);
      s = await snap();
      bok(s.mode === 'playing' && s.tick > 20 && s.fired === 0 && s.wave === 1, `${tag} tıklayınca başlar`);
      bok(await page.locator('#overlay').isHidden(), `${tag} kaplama kalkar`);
      // fareyle nişan + ateş
      await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.1);
      await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.1);
      await page.waitForTimeout(200);
      s = await snap();
      bok(s.fired === 1 && s.aim === 0, `${tag} işaretçiyle nişan ve ateş (${s.aim}°)`);
      bok((await text('kindDisplay')).length > 2 && (await text('epsDisplay')).includes('GM/R'), `${tag} son mermi okumaları`);
      // klavye: nişan, hız, ateş
      await page.locator('body').click({ position: { x: 5, y: 5 } }).catch(() => {});
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('KeyD');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('KeyW');
      s = await snap();
      bok(s.aim === 2 && Math.abs(s.ratio - 1.02) < 1e-9, `${tag} klavye nişan/hız (${s.aim}, ${s.ratio})`);
      await page.waitForTimeout(700);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(150);
      bok((await snap()).fired === 2, `${tag} Enter ateş eder`);
      // dokunmatik çubuk
      const fireTouch = page.locator('#gameTouchBar [data-control="fire"]');
      if (await fireTouch.isVisible()) {
        await page.waitForTimeout(700);
        await fireTouch.click();
        await page.waitForTimeout(150);
        bok((await snap()).fired === 3, `${tag} dokunmatik ateş`);
        await page.locator('#gameTouchBar [data-control="left"]').click();
        bok((await snap()).aim === 1, `${tag} dokunmatik nişan`);
        const bb = await fireTouch.boundingBox();
        bok(bb.x >= 0 && bb.x + bb.width <= width, `${tag} dokunmatik düğme ekranda`);
      }
      // Space duraklatır
      await page.keyboard.press('Space');
      const p1 = await snap();
      await page.waitForTimeout(400);
      const p2 = await snap();
      bok(p1.mode === 'paused' && p2.tick === p1.tick, `${tag} duraklatma zamanı durdurur`);
      bok((await text('overlayTitle')).includes('Duraklatıldı'), `${tag} duraklatma yazısı`);
      await page.keyboard.press('Space');
      await page.waitForTimeout(300);
      bok((await snap()).tick > p2.tick, `${tag} devam eder`);
      // kaydırıcı odaktayken oyun kısayolları çalışır; ok tuşu yalnız kaydırıcıyı oynatır (çift sayılmaz)
      await page.locator('#angleRange').focus();
      const k0 = await snap();
      await page.keyboard.press('Space');
      bok((await snap()).mode === 'paused', `${tag} kaydırıcı odaktayken Space duraklatır`);
      await page.keyboard.press('KeyA');
      await page.keyboard.press('KeyW');
      s = await snap();
      bok(s.aim === k0.aim - 1 && Math.abs(s.ratio - k0.ratio - 0.01) < 1e-9, `${tag} kaydırıcı odaktayken A/W (${s.aim}, ${s.ratio})`);
      await page.keyboard.press('ArrowLeft');
      s = await snap();
      bok(s.aim === k0.aim - 2 && (await page.locator('#angleRange').inputValue()) === String(k0.aim - 2), `${tag} ok tuşu kaydırıcıda bir adım (${s.aim})`);
      await page.keyboard.press('Space');
      await page.waitForTimeout(750);
      bok((await snap()).mode === 'playing', `${tag} kaydırıcı odaktayken Space devam ettirir`);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(150);
      s = await snap();
      bok(s.fired === k0.fired + 1, `${tag} kaydırıcı odaktayken Enter ateş eder`);
      bok(await page.evaluate(() => document.activeElement?.id === 'angleRange'), `${tag} klavye odağı kaydırıcıda kalır`);
      // kaydırıcıyla verilen açıyı alanın üstünde gezen fare bozmaz; alana bilerek basınca fare yeniden nişan alır
      await page.locator('#angleRange').fill('-35');
      await canvas.scrollIntoViewIfNeeded();
      const cb = await canvas.boundingBox();
      await page.mouse.move(cb.x + cb.width * 0.8, cb.y + cb.height * 0.2);
      await page.mouse.move(cb.x + cb.width * 0.7, cb.y + cb.height * 0.15, { steps: 4 });
      await page.waitForTimeout(100);
      bok((await snap()).aim === -35, `${tag} fare elle verilen açıyı bozmaz (${(await snap()).aim}°)`);
      await page.waitForTimeout(700);
      await page.mouse.click(cb.x + cb.width * 0.5, cb.y + cb.height * 0.1);
      await page.waitForTimeout(150);
      s = await snap();
      bok(s.aim === 0 && s.fired === k0.fired + 2, `${tag} alana tıklamak nişan alır ve ateş eder (${s.aim}°, ${s.fired})`);
      await page.mouse.move(cb.x + cb.width * 0.9, cb.y + cb.height * 0.4, { steps: 3 });
      await page.waitForTimeout(100);
      bok((await snap()).aim === 90, `${tag} tıklamadan sonra fare nişanı sürdürür (${(await snap()).aim}°)`);
      await page.keyboard.press('KeyA');
      await page.mouse.move(cb.x + cb.width * 0.5, cb.y + cb.height * 0.1, { steps: 3 });
      bok((await snap()).aim === 89, `${tag} klavye nişanı fareden geri alır`);
      // R her şeyi sıfırlar
      await page.locator('#speedRange').fill('1.37');
      await page.locator('#angleRange').fill('-35');
      await page.locator('body').click({ position: { x: 5, y: 5 } }).catch(() => {});
      await page.keyboard.press('KeyR');
      s = await snap();
      bok(s.mode === 'playing' && s.t < 0.3 && s.aim === 90 && s.ratio === 1 && s.shells === 0 && s.asteroids === 0 && s.score === 0 && s.health === 5 && s.fired === 0 && s.last === null, `${tag} R her şeyi sıfırlar ${JSON.stringify(s)}`);
      bok((await page.locator('#speedRange').inputValue()) === '1' && (await page.locator('#angleRange').inputValue()) === '90', `${tag} kaydırıcılar sıfırlandı`);
      bok((await text('fateLine')).includes('Henüz atış yok') && (await text('keplerDisplay')) === '—', `${tag} okumalar sıfırlandı`);
      // deney modu
      await page.locator('#labCheck').check();
      await page.locator('#rateSelect').selectOption('8');
      await page.locator('#fireBtn').click();
      await page.waitForFunction(() => window.OrbitGameUi.snapshot().last?.revs >= 1);
      await page.waitForTimeout(350);
      s = await snap();
      bok(s.lab && s.asteroids === 0 && s.wave === 0, `${tag} deney modunda asteroit yok`);
      bok(Math.abs(s.last.Tmeas - 7.2488) < 2e-3, `${tag} ölçülen periyot ${s.last.Tmeas}`);
      bok((await text('periodDisplay')) === '7.249 τ' && (await text('measuredDisplay')) === '7.249 τ' && (await text('diffDisplay')) === '0.00 %', `${tag} kuram/ölçüm kartları`);
      bok((await text('epsDisplay')) === '−0.4545 GM/R' && (await text('aDisplay')) === '1.100 R', `${tag} ε ve a`);
      // Kepler III okuması: ölçülen T²/a³, kuram 4π² = 39.478
      const kep = await text('keplerDisplay');
      bok(kep.endsWith(' τ²/R³') && Math.abs(parseFloat(kep) - 4 * Math.PI ** 2) < 2e-3, `${tag} T²/a³ okuması ${kep}`);
      // fareyle basılan düğme odağı tutmaz: Enter ateş eder, düğmeyi yeniden tetiklemez
      const firedBefore = (await snap()).fired;
      await page.locator('.presets button[data-speed="1.2"]').click();
      await page.waitForTimeout(350);
      bok(await page.evaluate(() => document.activeElement === document.body), `${tag} tıklanan düğme odağı bırakır`);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(150);
      s = await snap();
      bok(s.fired === firedBefore + 1 && Math.abs(s.ratio - 1.2) < 1e-9 && s.aim === 90, `${tag} hazır atıştan sonra Enter ateş eder`);
      bok((await text('keplerDisplay')) === '—', `${tag} tur dolmadan T²/a³ boş`);
      // sınırdaki yerberi fazladan basamakla yazılır; ömre sığmayan düşüş söylenir
      await page.locator('#angleRange').fill('76');
      bok((await text('planKind')) === 'eliptik yörünge' && (await text('planLine')).includes('Yerberi 1.0004 R'), `${tag} sınırda yerberi basamağı: ${await text('planLine')}`);
      await page.locator('#speedRange').fill('1.41');
      await page.locator('#angleRange').fill('0');
      bok((await text('planKind')) === 'düşer' && (await text('planLine')).includes("600 τ'luk mermi ömrüne sığmaz"), `${tag} ömre sığmayan düşüş: ${await text('planLine')}`);
      await page.locator('.presets button[data-speed="1.42"]').click();
      bok((await text('planKind')) === 'kaçar', `${tag} 1.42 kaçar`);
      await page.locator('.presets button[data-speed="0.8"]').click();
      bok((await text('planKind')) === 'düşer', `${tag} 0.80 düşer`);
      await page.locator('#previewCheck').uncheck();
      await page.waitForTimeout(150);
      bok((await snap()).preview === null, `${tag} öngörü kapanır`);
      await page.locator('#previewCheck').check();
      await page.waitForTimeout(150);
      bok((await snap()).preview.fate === 'planet', `${tag} öngörü düşüşü gösterir`);
      await page.waitForTimeout(8000 / 8 + 300);
      bok((await snap()).asteroids === 0, `${tag} deney modunda asteroit doğmaz`);
      // oyuna dönüş: yeniden bekleme durumu
      await page.locator('#labCheck').uncheck();
      s = await snap();
      bok(s.mode === 'ready' && !s.lab && s.rate === 1, `${tag} oyuna dönünce bekler`);
      bok(await overflow() <= 0, `${tag} sonunda taşma yok`);
      assert.deepEqual(errors, [], `${tag} konsol hataları`);
      bchecks++;
      await ctx.close();
    }
    // edilgen oyuncu gerçek zamanda 20 s dolmadan yenilmez
    const page = await browser.newPage();
    await page.addInitScript(() => { try { localStorage.setItem('acelya-sound-muted', '1'); } catch (_) {} });
    await page.goto(`${base}/gezegen-savunmasi.html?seed=11`);
    await page.waitForTimeout(600);
    await page.locator('#toggleBtn').click();
    await page.waitForTimeout(20000);
    const s = await page.evaluate(() => window.OrbitGameUi.snapshot());
    bok(s.mode === 'playing' && s.health >= 3 && s.t > 17 && s.t < 20.5, `edilgen 20 s: ${JSON.stringify(s)}`);
    console.log(`E yörünge tarayıcı: ${bchecks} kontrol PASS (390 açık, 1280 koyu, edilgen 20 s)`);
  } finally {
    await browser?.close();
    await new Promise((r) => server.close(r));
  }
}
