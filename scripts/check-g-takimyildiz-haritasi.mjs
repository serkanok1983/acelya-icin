// G · takimyildiz-haritasi.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) node'da yüklenir ve sayfanın formüllerini yinelemeyen referanslarla sınanır:
// Meeus 7. bölüm takvim algoritmasıyla Jülyen günü, yayımlanmış GMST örneği (10 Nisan 1987, 19.21 UT → 8 sa 34 dk
// 57.0896 s), USNO GMST formülü, döndürme matrisleriyle ekvator → ufuk dönüşümü, kaba kuvvet tarama ile doğuş/batış,
// Meeus 25. bölüm Güneş formülü, katalogdan (VizieR V/50) açılan değerlerle yıldız konumları.
// `--browser`: 390 px aydınlık ve 1280 px karanlıkta gerçek arayüz denetimleri.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html = fs.readFileSync(new URL('../takimyildiz-haritasi.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'Çekirdek sınırları (KERNEL-BEGIN/END) gerekli');
const context = { window: {} }; vm.createContext(context); vm.runInContext(source, context);
const K = context.window.SkyLab; assert(K && Object.isFrozen(K), 'SkyLab dondurulmuş olmalı');
let checks = 0;
const near = (a, e, tol, msg = '') => { assert(Math.abs(a - e) <= tol, `${msg} ${a} ≠ ${e} (tol ${tol})`); checks++; };
const ok = (c, msg) => { assert(c, msg); checks++; };
const eq = (a, b, msg = '') => { assert.equal(a, b, `${msg} ${a} ≠ ${b}`); checks++; };
const RAD = Math.PI / 180, DEG = 180 / Math.PI;
let seed = 20261111; const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const mod = (x, m) => ((x % m) + m) % m, w180 = (x) => mod(x + 180, 360) - 180;

// ── 1. Katalog: VizieR V/50'den açılan değerler (sa dk sn, ° ′ ″, V) ──
const pub = [[424, '02 31 48.7', '+89 15 51', 2.02], [2491, '06 45 08.9', '-16 42 58', -1.46], [7001, '18 36 56.3', '+38 47 01', 0.03], [2061, '05 55 10.3', '+07 24 25', 0.50],
  [4730, '12 26 35.9', '-63 05 57', 1.33], [15, '00 08 23.3', '+29 05 26', 2.06], [5191, '13 47 32.4', '+49 18 48', 1.86], [6134, '16 29 24.4', '-26 25 55', 0.96], [8781, '23 04 45.7', '+15 12 19', 2.49]];
for (const [hr, ra, de, v] of pub) {
  const s = K.star(hr), [h, m, sec] = ra.split(' ').map(Number), sg = de[0] === '-' ? -1 : 1, [d, dm, ds] = de.slice(1).split(' ').map(Number);
  near(s.raH, h + m / 60 + sec / 3600, 1e-5, 'α HR ' + hr); near(s.dec, sg * (d + dm / 60 + ds / 3600), 1e-4, 'δ HR ' + hr); near(s.v, v, 1e-9, 'V HR ' + hr);
}
eq(K.STARS.filter((r) => r[3] <= 4.5).length, 904, 'V ≤ 4.5 yıldız sayısı (V/50)');
eq(new Set(K.STARS.map((r) => r[0])).size, K.STARS.length, 'HR tekil');
for (const c of K.CONS) for (const seg of c.lines) for (const h of seg) ok(K.star(h), 'çizim yıldızı yok: ' + h);
eq(K.CONS.length, 16); eq(K.NAMES[424], 'Polaris'); eq(K.NAMES[2491], 'Sirius'); eq(K.star(424).desig, 'α UMi');

// ── 2. Jülyen günü: Meeus 7. bölüm takvim algoritması ──
const jdMeeus = (Y, M, D) => { if (M <= 2) { Y -= 1; M += 12; } const A = Math.floor(Y / 100), B = 2 - A + Math.floor(A / 4); return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + D + B - 1524.5; };
near(K.jdFromLocal('2000-01-01', 720, 0), 2451545.0, 1e-9, 'J2000'); near(K.jdFromLocal('1987-04-10', 0, 0), 2446895.5, 1e-9);
for (let i = 0; i < 2000; i++) { const y = 1900 + Math.floor(rnd() * 200), m = 1 + Math.floor(rnd() * 12), d = 1 + Math.floor(rnd() * 28), min = Math.floor(rnd() * 1440), tz = Math.floor(rnd() * 27) - 12;
  const str = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`; near(K.jdFromLocal(str, min, tz), jdMeeus(y, m, d + (min / 60 - tz) / 24), 1e-8, 'JD ' + str);
  const L = K.localFromJD(K.jdFromLocal(str, min, tz), tz); eq(L.date, str); near(L.minutes, min, 1e-4); }
eq(K.parseDate('2026-02-30'), null); eq(K.parseDate('abc'), null); eq(K.addDays('2026-12-31', 1), '2027-01-01'); eq(K.addDays('2028-03-01', -1), '2028-02-29');
assert.throws(() => K.jdFromLocal('2026-13-01', 0, 0)); checks++;

// ── 3. Yıldız zamanı: yayımlanmış örnek ve USNO formülü ──
{ const g = K.gmstDeg(K.jdFromLocal('1987-04-10', 19 * 60 + 21, 0)) / 15; near(g * 3600, 8 * 3600 + 34 * 60 + 57.0896, 1e-3, 'Meeus/IDL örneği 8 sa 34 dk 57.0896 s'); }
let worstUSNO = 0;
for (let i = 0; i < 3000; i++) { const jd = 2433282.5 + rnd() * 54800, jd0 = Math.floor(jd - 0.5) + 0.5, H = (jd - jd0) * 24, D = jd - 2451545.0, D0 = jd0 - 2451545.0, T = D / 36525;
  const usno = mod(6.697375 + 0.065707485828 * D0 + 1.0027379 * H + 0.0854103 * T + 0.0000258 * T * T, 24); // TT = UT varsayımıyla
  const usno2 = mod(6.697375 + 0.065709824279 * D0 + 1.0027379 * H + 0.0000258 * T * T, 24);
  const dS = Math.abs(w180((K.gmstDeg(jd) / 15 - usno2) * 15)) / 15 * 3600; worstUSNO = Math.max(worstUSNO, dS); ok(dS < 0.25, 'USNO GMST farkı ' + dS + ' s'); void usno; }
near(K.SID_DAY_S, 86164.0905, 1e-3, 'yıldız günü (Wikipedia: 86164.0905 s)'); near(K.SOLAR_SHIFT_S, 235.9095, 1e-3);
for (const lon of [-120, 0, 32.85, 151.21]) { const jd = 2461396.2917; near(K.lstDeg(jd, lon), mod(K.gmstDeg(jd) + lon, 360), 1e-12); }

// ── 4. Ekvator → ufuk: döndürme matrisleriyle bağımsız ──
const horRef = (ra, dec, lat, lst) => { // (x: göksel ekvator yönü, z: kutup) → saat açısı çerçevesi → ufuk (güney, doğu, başucu)
  const H = (lst - ra) * RAD, d = dec * RAD, p = lat * RAD; const v = [Math.cos(d) * Math.cos(H), -Math.cos(d) * Math.sin(H), Math.sin(d)];
  const c = Math.cos((90 - lat) * RAD), s = Math.sin((90 - lat) * RAD); const south = c * v[0] - s * v[2], east = v[1], up = s * v[0] + c * v[2]; void p;
  return { alt: Math.asin(Math.max(-1, Math.min(1, up))) * DEG, az: mod(Math.atan2(east, -south) * DEG, 360) }; };
let worstAlt = 0;
for (let i = 0; i < 20000; i++) { const ra = rnd() * 360, dec = rnd() * 180 - 90, lat = rnd() * 178 - 89, lst = rnd() * 360, a = K.hor(ra, dec, lat, lst), b = horRef(ra, dec, lat, lst);
  worstAlt = Math.max(worstAlt, Math.abs(a.alt - b.alt)); near(a.alt, b.alt, 1e-9, 'yükseklik'); if (Math.abs(b.alt) < 89.9) near(w180(a.az - b.az), 0, 1e-7, 'azimut');
  const e = K.equ(a.alt, a.az, lat, lst); near(e.dec, dec, 1e-8, 'geri dönüş δ'); if (Math.abs(dec) < 89.9) near(w180(e.ra - ra), 0, 1e-7, 'geri dönüş α'); }
// özel durumlar: kutupta h = δ, ekvatorda δ = 0 olan yıldız tam doğudan doğar, başucu geçişi
for (const dec of [-60, -10, 0, 33, 75]) for (const lst of [0, 77, 200]) near(K.hor(10, dec, 90, lst).alt, dec, 1e-9, 'kutupta h = δ');
{ const a = K.hor(0, 0, 0, -90); near(a.alt, 0, 1e-9); near(a.az, 90, 1e-9, 'ekvatorda tam doğu'); near(K.hor(50, 39.93, 39.93, 50).alt, 90, 1e-6, 'başucu'); }
near(K.hor(0, 90, 39.93, 123).alt, 39.93, 1e-9, 'kutup yüksekliği = φ'); near(K.hor(0, -90, -33.87, 5).alt, 33.87, 1e-9);

// ── 5. Doğuş/batış: kaba kuvvet tarama (bağımsız GMST ve dönüşüm, 20 s adım + ikiye bölme) ──
const usnoLst = (jd, lon) => { const jd0 = Math.floor(jd - 0.5) + 0.5, H = (jd - jd0) * 24, D0 = jd0 - 2451545.0, T = (jd - 2451545) / 36525; return mod((6.697375 + 0.065709824279 * D0 + 1.0027379 * H + 0.0000258 * T * T) * 15 + lon, 360); };
const brute = (ra, dec, lat, lon, a, b, dir) => { const f = (jd) => horRef(ra, dec, lat, usnoLst(jd, lon)).alt; const st = 20 / 86400; let t = a, fa = f(a);
  while (t < b) { const t1 = t + st, f1 = f(t1); if ((dir > 0 && fa < 0 && f1 >= 0) || (dir < 0 && fa >= 0 && f1 < 0)) { let lo = t, hi = t1; for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; if ((f(m) < 0) === (dir > 0)) lo = m; else hi = m; } return (lo + hi) / 2; } t = t1; fa = f1; } return null; };
let worstRise = 0, nRise = 0;
for (let i = 0; i < 60; i++) { const r = K.STARS[Math.floor(rnd() * K.STARS.length)], ra = r[1] * 15, dec = r[2], lat = rnd() * 130 - 65, lon = rnd() * 360 - 180, jd0 = 2455000.5 + Math.floor(rnd() * 15000);
  const rs = K.riseSet(ra, dec, lat, lon, jd0); const cls = K.classifyFormula(dec, lat); eq(rs.type, cls === 'normal' ? 'normal' : cls, 'tür');
  ok(rs.transit >= jd0 - 1e-9 && rs.transit < jd0 + 1, 'geçiş gün içinde'); near(Math.abs(w180(usnoLst(rs.transit, lon) - ra)) * 240, 0, 0.3, 'geçişte H = 0 (s)');
  near(horRef(ra, dec, lat, usnoLst(rs.transit, lon)).alt, rs.maxAlt, 1e-4, 'geçişte yükseklik = 90 − |φ − δ|');
  if (rs.type !== 'normal') { const m = K.measureEvents(ra, dec, lat, lon, jd0); eq(m.rise, null); eq(m.set, null); continue; }
  const R = brute(ra, dec, lat, lon, rs.transit - 0.5, rs.transit, 1), S = brute(ra, dec, lat, lon, rs.transit, rs.transit + 0.5, -1);
  const dR = Math.abs(R - rs.rise) * 86400, dS = Math.abs(S - rs.set) * 86400; worstRise = Math.max(worstRise, dR, dS); nRise++; ok(dR < 0.5 && dS < 0.5, `doğuş/batış ${dR} ${dS} s`);
  const m = K.measureEvents(ra, dec, lat, lon, jd0 - 1e-6); near((m.rise - rs.rise) * 86400, 0, 0.01, 'ölçülen doğuş'); near((m.set - rs.set) * 86400, 0, 0.01, 'ölçülen batış'); }
ok(nRise > 20, 'yeterli doğan yıldız ' + nRise);
// Betelgeuse, Ankara, 21 Aralık 2026 22.00 (UTC+3): sayfa varsayılanı
{ const s = K.star(2061), jd = K.jdFromLocal('2026-12-21', 1320, 3), p = horRef(s.ra, s.dec, 39.93, usnoLst(jd, 32.85)); near(p.alt, 41.320, 6e-4); near(p.az, 120.798, 6e-4);
  const rs = K.riseSet(s.ra, s.dec, 39.93, 32.85, jd - 0.5); near(K.localFromJD(rs.rise, 3).minutes, 18 * 60 + 17 + 57 / 60, 1 / 60); near(K.localFromJD(rs.transit, 3).minutes, 41 + 53 / 60, 1 / 60); near(K.localFromJD(rs.set, 3).minutes, 7 * 60 + 5 + 49 / 60, 1 / 60); }

// ── 6. Kutup çevresi sayımı: 720 saat açısında kaba kuvvet ──
for (const lat of [-90, 90, -89.5, -60, -33.87, -0.22, 0, 20, 39.93, 41.01, 69.68, 89.5]) {
  let circ = 0, nev = 0; for (const r of K.STARS) { if (r[3] > 4.5) continue; let lo = 99, hi = -99; for (let k = 0; k < 720; k++) { const a = horRef(0, r[2], lat, k * 0.5).alt; lo = Math.min(lo, a); hi = Math.max(hi, a); } if (lo > 0) circ++; if (hi < 0) nev++; }
  const c = K.counts(lat); eq(c.circM, circ, 'kutup çevresi ' + lat); eq(c.circT, circ, 'formül ' + lat); eq(c.neverM, nev, 'hiç doğmayan ' + lat); eq(c.neverT, nev); eq(c.total, 904); }
{ const c = K.counts(0); eq(c.circM, 0); eq(c.neverM, 0); const c2 = K.counts(39.93); eq(c2.circM, 82); eq(c2.neverM, 138); }
{ const s = Object.fromEntries(K.consStatus(39.93).map((r) => [r.id, r.status])); eq(s.UMi, 'always'); eq(s.Cas, 'always'); eq(s.UMa, 'partcirc'); eq(s.Ori, 'seasonal'); eq(s.Sco, 'seasonal'); eq(s.Cru, 'never');
  const n = Object.fromEntries(K.consStatus(-33.87).map((r) => [r.id, r.status])); eq(n.Cru, 'always'); eq(n.UMi, 'never'); }
// (üst + alt) / 2 = φ ve ölçülen uçlar kapalı biçimle
for (let i = 0; i < 400; i++) { const dec = rnd() * 178 - 89, lat = rnd() * 178 - 89, e = K.dailyExtremes(dec, lat), tu = 1e-6, tl = 1e-6; near(e.up, 90 - Math.abs(lat - dec), tu, 'üst'); near(e.low, Math.abs(lat + dec) - 90, tl, 'alt'); if (Math.abs(lat) < 89.9) near(e.mid, Math.abs(lat), Math.max(tu, tl), '(θüst+θalt)/2'); }
{ const e = K.dailyExtremes(K.star(424).dec, 39.93); near(e.up, 40.666, 1e-3); near(e.low, 39.194, 1e-3); }

// ── 7. Dönüş hızı ve günlük kayma ──
for (const [hr, lat] of [[7001, 39.93], [2491, 39.93], [424, 41.01], [5340, -33.87], [7001, 0.5]]) { const s = K.star(hr); near(K.rotationRate(s.ra, s.dec, lat, 32.85, 2461396.29), 360 / 23.9344696, 1e-4, 'dönüş °/sa'); }
{ const s = K.star(2491), jd0 = K.jdFromLocal('2026-12-01', 0, 3), tr = K.transitsBetween(s.ra, 32.85, jd0, jd0 + 7.0001);
  eq(tr.length, 7); for (let i = 1; i < tr.length; i++) near((tr[i] - tr[i - 1]) * 86400, 86164.0905, 0.01, 'geçiş aralığı');
  const f = (jd) => horRef(s.ra, s.dec, 39.93, usnoLst(jd, 32.85)).alt; const rises = tr.map((t) => brute(s.ra, s.dec, 39.93, 32.85, t - 0.5, t, 1));
  for (let i = 1; i < rises.length; i++) near(86400 - (rises[i] - rises[i - 1]) * 86400, 235.9095, 0.05, 'erken doğma'); void f; }

// ── 8. Güneş: Meeus 25. bölüm düşük duyarlıklı formülüyle ──
for (let i = 0; i < 500; i++) { const jd = 2440000 + rnd() * 30000, T = (jd - 2451545) / 36525, L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T, M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * RAD;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) + (0.019993 - 0.000101 * T) * Math.sin(2 * M) + 0.000289 * Math.sin(3 * M), lam = (L0 + C) * RAD, eps = (23 + 26 / 60 + 21.448 / 3600 - 46.815 / 3600 * T) * RAD;
  const ra = mod(Math.atan2(Math.cos(eps) * Math.sin(lam), Math.cos(lam)) * DEG, 360), dec = Math.asin(Math.sin(eps) * Math.sin(lam)) * DEG, s = K.sun(jd);
  near(w180(s.ra - ra), 0, 0.02, 'Güneş α'); near(s.dec, dec, 0.02, 'Güneş δ'); }

// ── 9. Gece yarısı en yüksekte: günlük kaba kuvvet ──
for (const [hr, lon, tz] of [[2491, 32.85, 3], [2061, 32.85, 3], [6134, 28.96, 3], [7001, 151.21, 10], [3982, -78.51, -5]]) {
  const s = K.star(hr); let best = null; for (let k = -1; k <= 365 && best == null; k++) { const H = (kk) => w180(usnoLst(jdMeeus(2026, 1, 1 + kk) - tz / 24, lon) - s.ra), a = H(k), b = H(k + 1); if (a < 0 && b >= 0 && b - a < 10) best = mod(k - a / (b - a), 365); }
  near(K.midnightCulmination(s.ra, 2026, lon, tz).doy, best, 0.01, 'gece yarısı geçişi ' + hr);
  const op = K.oppositionDate(s.ra, 2026), mc = K.midnightCulmination(s.ra, 2026, lon, tz), dd = mod(mc.doy - op.doy + 182.6, 365.2422) - 182.6, pred = ((tz * 15 - lon) * 4 - K.eqTime(2461041.5 + op.doy)) / (K.SOLAR_SHIFT_S / 60);
  near(dd, pred, 0.6, 'saat dilimi + zaman denklemi açıklaması ' + hr); }
eq(K.midnightCulmination(K.star(2491).ra, 2026, 32.85, 3).date, '2026-01-14'); eq(K.oppositionDate(K.star(2491).ra, 2026).date, '2026-12-31');
// ── 10. Geçersiz girdiler ──
for (const call of [() => K.gmstDeg(NaN), () => K.jdFromLocal('2026-01-01', NaN, 3), () => K.jdFromLocal('1800-01-01', 0, 0), () => K.addDays('x', 1)]) { assert.throws(call); checks++; }
console.log(`G takımyıldız haritası: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek kontrolü PASS (USNO GMST en büyük fark ${worstUSNO.toFixed(3)} s, doğuş/batış en büyük fark ${worstRise.toFixed(3)} s, yükseklik ${worstAlt.toExponential(1)}°)`);

if (process.argv.includes('--browser')) {
  const { createRequire } = await import('node:module'); const { createServer } = await import('node:http'); const { join, extname } = await import('node:path'); const { fileURLToPath } = await import('node:url'); const root = fileURLToPath(new URL('../', import.meta.url));
  let chromium; for (const dir of [root, ...(process.env.NODE_PATH || '').split(':').filter(Boolean), '/opt/node-tools']) { try { ({ chromium } = createRequire(join(dir, 'package.json'))('playwright')); break; } catch (_) {} } if (!chromium) ({ chromium } = await import('playwright'));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); }); await new Promise((r) => server.listen(0, '127.0.0.1', r)); let browser;
  try {
    browser = await chromium.launch(); const before = checks;
    for (const [width, theme] of [[390, 'light'], [1280, 'dark']]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width === 390 ? 2 : 1, locale: 'tr-TR' }); await ctx.addInitScript((t) => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(8000); const errors = []; page.on('pageerror', (e) => errors.push(e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/takimyildiz-haritasi.html`, { waitUntil: 'load' }); await page.waitForTimeout(400);
      const click = (id) => page.locator('#' + id).click(), read = async (id) => (await page.locator('#' + id).textContent()).trim(), set = (id, v) => page.locator('#' + id).evaluate((e, v) => { if (e.type === 'checkbox') e.checked = v; else e.value = v; e.dispatchEvent(new Event(e.tagName === 'SELECT' || e.type === 'checkbox' || e.type === 'date' ? 'change' : 'input', { bubbles: true })); }, v);
      const is = async (id, t) => { assert.equal(await read(id), t, id); checks++; }, has = async (id, t) => { const g = await read(id); assert(g.includes(t), `${id}: "${g}" içinde "${t}" yok`); checks++; };
      const noflow = async (tag) => eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'yatay taşma: ' + tag + ' @' + width);
      const painted = async (id) => ok(await page.evaluate((id) => { const c = document.getElementById(id), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, s = new Set(); for (let i = 0; i < d.length; i += 4 * 97) s.add(d[i] + ',' + d[i + 1] + ',' + d[i + 2]); return c.width > 200 && s.size > 4; }, id), id + ' boş');
      eq(await page.evaluate(() => [...document.querySelectorAll('.app-content input,.app-content select')].filter((e) => !e.labels?.length && !e.getAttribute('aria-label')).map((e) => e.id).join(',')), '', 'etiketsiz denetim');
      eq(await page.evaluate(() => [...document.querySelectorAll('.app-content canvas')].every((c) => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), true);
      eq(await page.evaluate(() => /-\d/.test(document.querySelector('.app-content').innerText.replace(/\d{4}-\d{2}-\d{2}/g, ''))), false, 'kısa çizgili eksi');
      // 01 · varsayılan
      await is('t1LST', '03:12:50'); await is('t1GMST', '01:01:26'); await is('t1UT', '19:00 · JD 2461396.2917'); await is('t1PoleM', '39.93° (kuzey)'); await is('t1PoleD', '0.00°'); await is('t1RotM', '15.041°/sa'); await is('t1RotD', '0.000°/sa');
      await is('t1Count', '430 / 904'); await is('t1Sun', '−51.3°'); await is('t1Sel', 'Betelgeuse: 41.3° · 120.8° (DGD)'); await has('t1Status', 'karanlık gece'); await has('t1Status', 'δ > 50.07°'); await painted('t1Canvas'); await noflow('sky');
      // saat ve tarih: 1 saat ileri → YZ 1 sa 0 dk 9.86 s ilerler
      await click('t1Plus'); await is('t1TimeOut', '23:00'); await is('t1LST', '04:13:00'); await click('t1Minus'); await is('t1LST', '03:12:50');
      await set('t1Time', 1439); await click('t1Plus'); await is('t1TimeOut', '00:59'); eq(await page.locator('#t1Date').inputValue(), '2026-12-22');
      // aynı saatte bir gün sonra yıldız zamanı 3 dk 56 s ileride
      await set('t1Date', '2026-12-22'); await set('t1Time', 1320); await is('t1LST', '03:16:47'); await set('t1Date', '2026-12-21'); await is('t1LST', '03:12:50');
      // gündüz, kutup, ekvator, güney yarıküre
      await set('t1Time', 720); await has('t1Status', 'gündüz'); await set('t1Time', 1320);
      await set('t1Place', 'np'); await is('t1PoleM', '90.00° (kuzey)'); await has('t1Status', 'Kutupta'); await has('t1Count', '/ 904');
      await set('t1Place', 'eq'); await is('t1PoleM', '0.00° (kuzey)'); await has('t1Status', 'Ekvatorda');
      await set('t1Place', 'sydney'); await is('t1PoleM', '33.87° (güney)'); await is('t1PoleT', '33.87°'); await has('t1Status', 'güney ufkunun'); await has('t1LatOut', '33.87° G');
      await set('t1Lat', -90); await is('t1PoleM', '90.00° (güney)'); eq(await page.locator('#t1Place').inputValue(), 'custom'); await set('t1Lon', -180); await has('t1LonOut', '180.00° B'); await set('t1Lon', 180);
      // görünümler ve seçenekler
      for (const v of ['0', '90', '180', '270']) { await set('t1View', v); await page.waitForTimeout(60); await painted('t1Canvas'); } await set('t1View', 'all');
      await set('t1Grid', true); await set('t1Trails', true); await set('t1Mag', 1); await is('t1MagOut', '1.0 kadir'); await page.waitForTimeout(60); await painted('t1Canvas');
      await set('t1Star', '2491'); await has('t1Sel', 'Akyıldız (Sirius)');
      // oynatma ve Boşluk/R
      await page.locator('h1').click(); await page.keyboard.press('Space'); await is('t1Play', 'Duraklat'); await page.waitForTimeout(400); await page.keyboard.press('Space'); await is('t1Play', 'Oynat'); ok((await read('t1TimeOut')) !== '22:00', 'oynatınca saat ilerler');
      await page.keyboard.press('r'); await is('t1TimeOut', '22:00'); await is('t1Count', '430 / 904'); eq(await page.locator('#t1Grid').isChecked(), false); eq(await page.locator('#t1Place').inputValue(), 'ankara');
      // tıklayarak yıldız seçme
      { const pt = await page.evaluate(() => { const c = document.getElementById('t1Canvas'), r = c.getBoundingClientRect(), K = window.SkyLab, s = K.star(2491), jd = K.jdFromLocal('2026-12-21', 1320, 3), p = K.hor(s.ra, s.dec, 39.93, K.lstDeg(jd, 32.85)), R = r.width / 2 - 30, rr = R * (90 - p.alt) / 90; return [r.left + r.width / 2 - rr * Math.sin(p.az * Math.PI / 180), r.top + r.height / 2 - rr * Math.cos(p.az * Math.PI / 180)]; });
        await page.mouse.click(pt[0], pt[1]); await has('t1Sel', 'Akyıldız'); eq(await page.locator('#t1Star').inputValue(), '2491'); }
      await click('t1Reset'); await is('t1Sel', 'Betelgeuse: 41.3° · 120.8° (DGD)');
      // 02 · varsayılan
      await click('tab-pole'); await page.waitForTimeout(150); await is('t2PoleM', '39.93°'); await is('t2Up', '40.67° (K)'); await is('t2Low', '39.19° (K)'); await is('t2Mid', '39.93° · fark 0.00°'); await is('t2CircM', '82'); await is('t2CircT', '82'); await is('t2NeverM', '138'); await is('t2NeverT', '138'); await is('t2Limit', '50.07°'); await is('t2Frac', '% 11.7');
      await has('t2Status', 'hiç batmaz'); await has('t2Status', '1.47°'); await has('t2Status', 'en çok 0.74°'); await painted('t2Side'); await painted('t2Chart'); await noflow('pole');
      eq(await page.locator('#t2Table tbody tr').count(), 16); await has('t2Table', 'Güney Haçı (Crux)hiç görünmez'); await has('t2Table', 'kısmen kutup çevresi · 6/7');
      for (const [lab, c, n] of [['Kuzey Kutbu', String(K.counts(90).circM), String(K.counts(90).neverM)], ['Ekvator', '0', '0']]) { await page.locator('#panel-pole button', { hasText: lab }).click(); await is('t2CircM', c); await is('t2CircT', c); await is('t2NeverM', n); await is('t2NeverT', n); }
      await is('t2Limit', 'yok (ekvator)'); await has('t2Status', 'Ekvatorda');
      await page.locator('#panel-pole button', { hasText: 'Sidney' }).click(); await is('t2PoleM', '33.87°'); await has('t2Table', 'Güney Haçı (Crux)hep görünür'); await has('t2Status', 'hiç doğmaz');
      await set('t2Lat', -90); await is('t2PoleM', '90.00°'); await has('t2Status', 'Kutupta'); await set('t2Lat', 39.93); await set('t2Star', '2491'); await has('t2Status', 'doğar ve batar'); await is('t2Up', '33.35° (G)'); await is('t2Low', '−66.79° (K)'); await is('t2Mid', '39.93° · fark 0.00°'); await set('t2Lat', 60); await set('t2Star', '4554'); await has('t2Status', 'hiç batmaz'); await has('t2Up', '(G)'); await is('t2Mid', '60.00° · fark 0.00°'); await set('t2Lat', -33.87); await set('t2Star', '4730'); await is('t2Mid', '33.87° · fark 0.00°'); await set('t2Lat', 39.93);
      await set('t2Star', '4730'); await has('t2Status', 'hiç doğmaz');
      await page.locator('h1').click(); await page.keyboard.press('r'); await is('t2Up', '40.67° (K)'); eq(await page.locator('#t2Lat').inputValue(), '39.93');
      // 03 · varsayılan
      await click('tab-time'); await page.waitForTimeout(200); await is('t3SidM', '23 sa 56 dk 4.09 s'); await is('t3SidD', '0.000 s'); await is('t3ShiftM', '3 dk 55.91 s'); await is('t3ShiftT', '3 dk 55.91 s'); await is('t3ShiftD', '0.000 s'); await is('t3Month', '1 sa 57 dk 57 s erken');
      await is('t3MidM', '14 Ocak 2027'); await is('t3MidT', '31 Aralık 2026 · fark +13.5 gün'); await has('t3Status', '+13.2 gün öngörür'); eq(await page.locator('#t3Table tbody tr').count(), 7); await has('t3Table', '2 Aralık 2026'); await painted('t3Year'); await noflow('time');
      eq(await page.locator('#t3Grid tbody tr').count(), 16); await has('t3Grid', '27 Aralıkkış'); await has('t3Grid', '16 Haziranyaz'); await has('t3Grid', 'doğmazgörünmez');
      // güney yarıküre: mevsim sütunu altı ay kayar; Sidney'de Avcı yazın, Akrep kışın gece yarısı en yüksekte
      await set('t3Place', 'sydney'); await has('t3Grid', '14 Aralıkyaz'); await has('t3Grid', '2 Hazirankış'); await is('t3MidM', '31 Aralık 2026'); await is('t3MidT', '31 Aralık 2026 · fark 0.0 gün'); await set('t3Place', 'ankara'); await has('t3Grid', '27 Aralıkkış');
      await set('t3Days', 30); eq(await page.locator('#t3Table tbody tr').count(), 30); await set('t3Days', 2); await is('t3SidM', '23 sa 56 dk 4.09 s');
      await set('t3Star', '424'); await has('t3ShiftLab', 'geçiş'); await is('t3ShiftM', '3 dk 55.91 s'); await has('t3Status', 'hiç batmaz');
      await set('t3Star', '4730'); await has('t3Status', 'hiç doğmaz'); await set('t3Place', 'sydney'); await has('t3Status', 'Sidney'); await has('t3Status', 'hiç batmaz'); await set('t3Star', '2491'); await has('t3ShiftLab', 'erken doğma');
      await set('t3Date', '2100-12-01'); await is('t3SidM', '23 sa 56 dk 4.09 s');
      await set('t3Month2', '7'); await click('t3ToMap'); eq(await page.locator('#tab-sky').getAttribute('aria-selected'), 'true'); eq(await page.locator('#t1Date').inputValue(), '2100-07-15'); await is('t1TimeOut', '00:00'); eq(await page.locator('#t1Place').inputValue(), 'sydney');
      await click('t1Reset'); await click('tab-time'); await click('t3Reset'); await is('t3MidM', '14 Ocak 2027'); eq(await page.locator('#t3Place').inputValue(), 'ankara');
      // 04 · varsayılan
      await click('tab-conv'); await page.waitForTimeout(150); await is('t4Alt', '41.320°'); await is('t4Az', '120.798° (DGD)'); await is('t4H', '−40.583° · −2.706 sa'); await is('t4RiseT', '18:17:57'); await is('t4RiseM', '18:17:57'); await is('t4RiseD', '0.00 s'); await is('t4TrT', '00:41:53'); await is('t4SetT', '07:05:49'); await is('t4MaxT', '57.477°'); await is('t4MaxM', '57.477°');
      eq(await page.locator('#t4Steps li').count(), 10); await has('t4Steps', '15.3603°'); await has('t4Steps', 'h = 41.320°'); await has('t4Status', 'ertesi gün'); await painted('t4Dome'); await noflow('conv');
      await set('t4Star', '424'); await has('t4RiseT', 'tanımsız (batmaz)'); await is('t4RiseM', 'ufku kesmez'); await is('t4RiseD', '—'); await has('t4Status', 'hiç batmaz'); await has('t4Steps', 'cos H₀ < −1');
      await set('t4Star', '4730'); await has('t4SetT', 'tanımsız (doğmaz)'); await has('t4Status', 'hiç doğmaz'); await has('t4Status', 'altında');
      await set('t4Place', 'sydney'); await has('t4Status', 'hiç batmaz'); await set('t4Lat', 90); eq(await page.locator('#t4Place').inputValue(), 'custom'); await has('t4Status', 'Kutupta'); await set('t4Lat', -90); await set('t4Lon', -180); await set('t4Time', 0); await set('t4Date', '1900-01-01'); await has('t4Steps', 'JD = 2415020.08333'); await has('t4Steps', '(31 Aralık 1899)');
      await set('t4Lat', 0); await set('t4Star', '2061'); await has('t4Status', 'Doğuş'); await click('t4Reset'); await is('t4Alt', '41.320°');
      // sekme klavyesi
      await page.locator('#tab-conv').focus(); await page.keyboard.press('Home'); eq(await page.locator('#tab-sky').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowLeft'); eq(await page.locator('#tab-conv').getAttribute('aria-selected'), 'true'); await page.keyboard.press('ArrowRight'); eq(await page.locator('#tab-sky').getAttribute('aria-selected'), 'true'); await page.keyboard.press('End'); eq(await page.locator('#tab-conv').getAttribute('aria-selected'), 'true'); eq(await page.locator('#panel-sky').isHidden(), true);
      await noflow('son'); assert.deepEqual(errors, []); checks++; await ctx.close();
    }
    console.log(`G takımyıldız haritası: ${checks - before} arayüz kontrolü PASS (390 px aydınlık + 1280 px karanlık)`);
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
