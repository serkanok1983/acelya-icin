// G · ay-evreleri.html kalıcı denetimi.
// Çekirdek (KERNEL-BEGIN/END arası) sayfadan okunur. Başvurular sayfanın formüllerini yeniden kullanmaz:
// kosinüs teoremi, Monte Carlo alan sayımı, 3B gözlemci vektörleriyle doğuş taraması, teğet doğruları,
// Dünya yüzeyinde nokta nokta disk örtüşmesi, düğüm açısının doğrudan sayımı, almanak Güneş konumu,
// 1 s adımlı gün taraması ve orta nokta ışınım integrali kullanılır.
// Kullanım: node scripts/check-g-ay-evreleri.mjs [--browser]
import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync(new URL("../ay-evreleri.html", import.meta.url), "utf8");
const source = html.split("/* KERNEL-BEGIN */")[1]?.split("/* KERNEL-END */")[0];
assert(source, "KERNEL sınırları gerekli");
const win = {};
new Function("window", source)(win);
const K = win.MoonLab, C = K.C;
let checks = 0;
const near = (a, e, tol = 1e-9, label = "") => { assert(Number.isFinite(a) && Math.abs(a - e) <= tol * Math.max(1, Math.abs(e)), `${label} ${a} ≠ ${e} (tol ${tol})`); checks++; };
const nearAbs = (a, e, tol, label = "") => { assert(Number.isFinite(a) && Math.abs(a - e) <= tol, `${label} ${a} ≠ ${e} (±${tol})`); checks++; };
const ok = (c, label) => { assert(c, label); checks++; };
const D2R = Math.PI / 180;

/* ── Sabitler: açılan kaynaklardaki değerler ── */
near(C.R_MOON, 1737.4, 0); near(C.R_SUN, 695700, 0); near(C.R_EARTH, 6371, 0); near(C.A_MOON, 384400, 0); near(C.PERIGEE, 363300, 0); near(C.APOGEE, 405500, 0);
near(C.INC, 5.145, 0); near(C.D_SUN, 149.6e6, 0); near(C.Y_SID, 365.256, 0); near(C.P_SID, 27.321661554, 0); near(C.P_SYN, 29.530588861, 0); near(C.P_DRA, 27.212220815, 0); near(C.P_ANOM, 27.554549886, 0);
ok(Object.isFrozen(K) && Object.isFrozen(C), "çekirdek dondurulmuş");
// NASA'nın 29,53 günlük sinodik ayı, yıldızıl ay ve yıldızıl yıldan çıkmalı
nearAbs(K.synodic(C.P_SID, C.Y_SID), 29.53, 0.005, "1/S = 1/P − 1/Y");

/* ── 1. Evreler ── */
let seed = 12345; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
for (const E of [0, 1, 10, 30, 45, 60, 89, 90, 91, 120, 135, 150, 179, 180, 181, 225, 270, 300, 315, 359]) {
  for (const [d, D] of [[384400, 149.6e6], [363300, 147.095e6], [405500, 152.1e6]]) {
    const r = Math.sqrt(D * D + d * d - 2 * D * d * Math.cos(E * D2R)); // Güneş–Ay uzaklığı (kosinüs teoremi)
    const cpsi = (r * r + d * d - D * D) / (2 * r * d);
    near(Math.cos(K.phaseAngle(E, d, D) * D2R), cpsi, 1e-9, "ψ kosinüs teoremi E=" + E);
  }
  const psi = K.phaseAngle(E);
  // bağımsız Monte Carlo: diskte rastgele noktalar
  let lit = 0, n = 0; const sx = Math.sin(psi * D2R), sz = Math.cos(psi * D2R);
  while (n < 60000) { const x = 2 * rnd() - 1, y = 2 * rnd() - 1, q = x * x + y * y; if (q >= 1) continue; n++; if (x * sx + Math.sqrt(1 - q) * sz > 0) lit++; }
  nearAbs(lit / n, (1 + Math.cos(psi * D2R)) / 2, 0.006, "Monte Carlo kesir E=" + E);
  nearAbs(K.litGrid(psi), K.illum(psi), 0.0015, "ızgara kesir E=" + E);
}
near(K.illum(K.phaseAngle(0)), 0, 1e-12); near(K.illum(K.phaseAngle(180)), 1, 1e-12);
nearAbs(K.illum(K.phaseAngle(45)), 0.14709, 1e-5, "varsayılan k"); nearAbs(K.phaseAngle(45), 134.8957, 1e-4, "varsayılan ψ");
near(K.dichotomy(), Math.acos(C.A_MOON / C.D_SUN) / D2R, 1e-9, "yarım aydınlık"); nearAbs(K.dichotomy(), 89.853, 0.0005);
for (const [E, nm] of [[0, "Yeni Ay"], [6, "Yeni Ay"], [7, "Büyüyen Hilal"], [45, "Büyüyen Hilal"], [84, "İlk Dördün"], [90, "İlk Dördün"], [97, "Büyüyen Şişkin Ay"], [180, "Dolunay"], [187, "Küçülen Şişkin Ay"], [270, "Son Dördün"], [277, "Küçülen Hilal"], [354, "Yeni Ay"]]) { assert.equal(K.phaseName(E), nm, "ad " + E); checks++; }
assert.throws(() => K.phaseAngle(10, 1e9, 1e6)); checks++;

/* ── 2. Yıldızıl ve sinodik ay: ayrı, daha ince adımlı sayım ── */
for (const Y of [365.256, 182.628, 91.314, Infinity]) {
  const run = K.monthRun(C.P_SID, Y); run.advance(400);
  const S = Y === Infinity ? C.P_SID : (C.P_SID * Y) / (Y - C.P_SID);
  // bağımsız: açıları 0,001 gün adımla izle, tam turları say
  let nSid = 0, nSyn = 0, tSid = 0, tSyn = 0; const dt = 0.001;
  for (let i = 1; i <= 400 / dt; i++) {
    const t0 = (i - 1) * dt, t1 = i * dt, f = (t) => t / C.P_SID, g = (t) => t / C.P_SID - (Y === Infinity ? 0 : t / Y);
    if (Math.floor(f(t1)) > Math.floor(f(t0))) { nSid++; tSid = t1; }
    if (Math.floor(g(t1)) > Math.floor(g(t0))) { nSyn++; tSyn = t1; }
  }
  ok(run.sid.length === nSid && run.syn.length === nSyn, `tur sayısı Y=${Y}`);
  nearAbs(run.sid[run.sid.length - 1], tSid, 0.0011, "son yıldızıl olay"); nearAbs(run.syn[run.syn.length - 1], tSyn, 0.0011, "son sinodik olay");
  const m = run.measured(); near(m.sid, C.P_SID, 1e-9, "ölçülen P"); near(m.syn, S, 1e-9, "ölçülen S");
  near(K.synodic(C.P_SID, Y), S, 1e-12);
  run.syn.forEach((t, i) => near(t, (i + 1) * S, 1e-9, "olay zamanı ara değer"));
}
{ const run = K.monthRun(); run.advance(C.Y_SID); ok(run.sid.length === 13 && run.syn.length === 12, "bir yılda 13 yıldızıl, 12 sinodik"); nearAbs(run.measured().syn - run.measured().sid, 2.209, 0.0005, "S − P"); }
assert.throws(() => K.monthRun(30, 20)); checks++;

/* ── 3. Doğuş/batış: 3B vektörlerle bağımsız tarama ── */
function scan(E12, S = C.P_SYN) {
  // ekliptik = ekvator. Güneş boylamı 0 sabit kabul (Dünya'nın yörünge hareketi sinodik ayın içinde).
  // Zenit boylamı: öğlen Güneş'te, Güneş'e göre 360°/24 sa döner. Ay boylamı: E12 + 360 (t−12)/(24 S).
  const alt = (t) => { const z = 15 * (t - 12), m = E12 + 360 * (t - 12) / (24 * S); const zx = Math.cos(z * D2R), zy = Math.sin(z * D2R), mx = Math.cos(m * D2R), my = Math.sin(m * D2R); return Math.asin(zx * mx + zy * my) / D2R; };
  const ev = { rise: [], set: [], transit: [] }; const h = 1 / 3600;
  let ap = alt(0);
  for (let t = h; t <= 24 + 1e-9; t += h) {
    const a = alt(t);
    if (ap < 0 && a >= 0) ev.rise.push(t); if (ap >= 0 && a < 0) ev.set.push(t);
    const da0 = alt(t - h) - alt(t - 2 * h), da1 = a - alt(t - h);
    if (t > 2 * h && da0 > 0 && da1 <= 0 && a > 0) ev.transit.push(t - h);
    ap = a;
  }
  return ev;
}
for (const E of [0, 30, 90, 120, 180, 200, 270, 330, 359]) {
  const a = K.moonEvents(E), b = scan(E);
  for (const k of ["rise", "set", "transit"]) {
    ok(a[k].length === b[k].length, `${k} sayısı E=${E}: ${a[k].length} / ${b[k].length}`);
    a[k].forEach((t, i) => nearAbs(t, b[k][i], 4 / 3600, `${k} E=${E}`));
    const th = K.eventTheory(E, { rise: -90, transit: 0, set: 90 }[k]);
    if (a[k].length) nearAbs(th, a[k][0], 1e-6, "kapalı biçim " + k); else ok(th === null, "kapalı biçim yok " + k);
  }
}
{
  const ev = K.moonEvents(180); nearAbs(ev.rise[0], 18 + 0.25 * 24 / (1 - 1 / C.P_SYN) - 6, 1e-6, "dolunay doğuşu");
  nearAbs(ev.rise[0], 18.2103, 1e-4); const fq = K.moonEvents(90); nearAbs(fq.transit[0], 18.2103, 1e-4, "ilk dördün meridyen"); ok(fq.set.length === 0, "ilk dördün o gün batmaz");
  nearAbs(K.altitude(K.moonHour(90, 18)), 90 - 360 * 6 / (24 * C.P_SYN), 1e-9, "18.00 yüksekliği");
  const tr = K.moonEvents(90, C.P_SYN, 0, 48).transit; nearAbs((tr[1] - tr[0] - 24) * 60, 24 * 60 / (C.P_SYN - 1), 0.01, "günlük gecikme");
  nearAbs((tr[1] - tr[0] - 24) * 60, 50.47, 0.005);
  // bir sinodik ayda doğuşsuz gün sayısı: 29 günde bir kez
  let missing = 0; for (let day = 0; day < 30; day++) { const E = (360 * day) / C.P_SYN; if (!K.moonEvents(E).rise.length) missing++; } ok(missing === 1, "ayda bir doğuşsuz gün: " + missing);
}

/* ── 4. Gölge geometrisi: teğet doğruları ── */
for (const D of [147.095e6, 149.6e6, 152.1e6]) for (const d of [363300, 370000, 384400, 395000, 405500]) {
  const s = K.shadow(D, d), Lsm = D - d;
  // Güneş tepesi (0, Rs) ile Ay tepesi (Lsm, Rm) arasındaki doğru eksen ile Güneş'ten x = Lsm·Rs/(Rs−Rm)'de kesişir
  const slope = (C.R_MOON - C.R_SUN) / Lsm, xApex = -C.R_SUN / slope;
  near(s.Lu, xApex - Lsm, 1e-10, "tam gölge uzunluğu"); near(s.LuNum, s.Lu, 1e-7, "açısal ölçüt");
  near(s.margin, s.Lu - (d - C.R_EARTH), 1e-9); ok(s.total === (d < s.dCrit), "tam ↔ d < d*");
  // d*'yi kendi ikiye bölmemizle bul
  let lo = 300000, hi = 450000; for (let k = 0; k < 100; k++) { const m = (lo + hi) / 2; const L = (D - m) * C.R_MOON / (C.R_SUN - C.R_MOON); if (L > m - C.R_EARTH) lo = m; else hi = m; } near(s.dCrit, lo, 1e-8, "d*");
  ok((s.thetaM > s.thetaS) === s.total, "görünür çap ölçütü tutarlı");
  // Dünya gölgesi: (0,Rs)→(D,Re) doğrusu Ay uzaklığında
  const yAt = (x) => C.R_SUN + (C.R_EARTH - C.R_SUN) * x / D; near(s.ru, yAt(D + d), 1e-10, "tam gölge yarıçapı");
  const yP = (x) => C.R_SUN - (C.R_EARTH + C.R_SUN) * x / D; near(s.rp, -yP(D + d), 1e-10, "yarı gölge yarıçapı");
  near(s.LE, -C.R_SUN / ((C.R_EARTH - C.R_SUN) / D) - D, 1e-10, "Dünya gölge uzunluğu");
}
{ const p = K.shadow(149.6e6, 363300), a = K.shadow(149.6e6, 405500), m = K.shadow(); ok(p.total && !a.total && !m.total, "yerberide tam, yeröte ve ortalamada halkalı");
  nearAbs(m.Lu, 373575, 1, "L ortalama"); nearAbs(m.dCrit, 379957, 1); nearAbs(p.width, 155.3, 0.1); nearAbs(m.ru / C.R_MOON, 2.65, 0.005); nearAbs(m.totality * 60, 100.8, 0.1, "tam evre dk"); }

/* ── 5. Tutulma sınırları: Dünya yüzeyinde nokta nokta örtüşme ── */
function solarLimitBrute(D, d) {
  // Güneş +x yönünde D'de; Ay, yer merkezinden θ açıyla ayrık. Dünya yüzeyinde (Ay'a bakan yarım) gözlemciler.
  const overlap = (th) => {
    const mx = d * Math.cos(th), my = d * Math.sin(th);
    for (let i = 0; i <= 360; i++) { const a = (i / 360) * 2 * Math.PI, ox = C.R_EARTH * Math.cos(a), oy = C.R_EARTH * Math.sin(a);
      const sx = D - ox, sy = -oy, ux = mx - ox, uy = my - oy, ls = Math.hypot(sx, sy), lu = Math.hypot(ux, uy);
      if (ox * ux + oy * uy < 0 || ox * sx + oy * sy < 0) continue; // Ay ve Güneş ufkun üstünde olmalı
      const sepA = Math.acos(Math.max(-1, Math.min(1, (sx * ux + sy * uy) / (ls * lu))));
      if (sepA < Math.asin(C.R_SUN / ls) + Math.asin(C.R_MOON / lu)) return true; }
    return false; };
  let lo = 0, hi = 3 * D2R; for (let k = 0; k < 50; k++) { const m = (lo + hi) / 2; if (overlap(m)) lo = m; else hi = m; } return lo / D2R;
}
for (const [D, d] of [[149.6e6, 384400], [147.095e6, 363300], [152.1e6, 405500]]) {
  const L = K.limits(D, d); nearAbs(L.solar, solarLimitBrute(D, d), 0.004, "Güneş tutulma sınırı");
  nearAbs(L.rhoU, Math.atan(K.shadow(D, d).ru / d) / D2R, 0.002, "tam gölge açısal yarıçapı");
  nearAbs(L.rhoP, Math.atan(K.shadow(D, d).rp / d) / D2R, 0.002, "yarı gölge açısal yarıçapı");
}

/* ── 6. Tutulma sayımı: düğüm açısının doğrudan sayımı ── */
nearAbs(K.nodePeriod() / 365.25, 18.6, 0.01, "düğüm dönemi yıl"); nearAbs(K.eclipseYear() / 2, 173.31, 0.01, "yarım tutulma yılı");
function brute(years, sunNode, inc, B, full) {
  // her kavuşumda Güneş–düğüm açısı x_n = x0 + n·360·S/tutulma yılı (+180° dolunay); |β| = asin(sin i · |sin u|)
  const EY = 1 / (1 / C.Y_SID + 1 / (1 / (1 / C.P_DRA - 1 / C.P_SID))), N = Math.floor((years * C.Y_SID) / C.P_SYN + (full ? 0.5 : 1)); let c = 0, n = 0;
  for (let k = 0; k < N; k++) { const t = (k + (full ? 0.5 : 0)) * C.P_SYN; if (t > years * C.Y_SID) break; n++; const x = (sunNode + (360 * t) / EY + (full ? 180 : 0)) * D2R; const u = Math.atan2(Math.sin(x), Math.cos(inc * D2R) * Math.cos(x)); if (Math.abs(Math.asin(Math.sin(inc * D2R) * Math.sin(u))) / D2R < B) c++; }
  return { c, n };
}
for (const [years, node] of [[10, 30], [50, 0], [50, 137], [200, 250]]) {
  const r = K.eclipses({ years, sunNode: node, ecc: false }), L = K.limits(), b = brute(years, node, C.INC, L.solar, false), bl = brute(years, node, C.INC, L.umbral, true);
  nearAbs(r.newMoons, b.n, 1, "yeni ay sayısı"); nearAbs(r.solar, b.c, Math.max(2, 0.03 * b.c), `Güneş tutulması sayısı ${years}y/${node}°`);
  nearAbs(r.umbral, bl.c, Math.max(2, 0.03 * bl.c), `Ay tutulması sayısı ${years}y/${node}°`);
  if (years >= 50) { nearAbs(r.solar / r.newMoons, r.estimate.solar, 0.02, "Güneş kesri ~ tahmin"); nearAbs(r.umbral / r.fullMoons, r.estimate.umbral, 0.02, "Ay kesri ~ tahmin"); nearAbs(r.spacing, K.eclipseYear() / 2, 1.0, "mevsim aralığı"); }
}
{
  const r = K.eclipses({ years: 200, sunNode: 30 });
  nearAbs(r.solar / r.newMoons, 0.185, 0.01, "200 yıl Güneş"); nearAbs(r.umbral / r.fullMoons, 0.1177, 0.01, "200 yıl Ay");
  const dC = K.shadow().dCrit;
  for (const e of r.events.filter((x) => x.type === "total" && !x.full)) ok(e.d < dC + 1, "tam tutulmada Ay yakın: " + e.d);
  for (const e of r.events.filter((x) => x.type === "annular")) ok(e.d > dC - 6400, "halkalıda Ay uzak: " + e.d);
  for (const e of r.events) { ok(e.sep <= Math.abs(e.beta) + 1e-9, "en küçük ayrılık ≤ |β|"); if (!e.full) ok(Boolean(e.type) === (e.sep < K.limits(C.D_SUN, e.d).solar), "sınıf"); }
  const z = K.eclipses({ years: 10, inc: 0 }); ok(z.solar === z.newMoons && z.umbral === z.fullMoons && z.lunarTotal === z.fullMoons, "i = 0: her kavuşum tutulma");
  const def = K.eclipses({ years: 10, sunNode: 30 }); ok(def.newMoons === 124 && def.solar === 24 && def.umbral === 16 && def.total === 5 && def.annular === 9 && def.partial === 10, "varsayılan onyıl");
  nearAbs(def.estimate.seasonHalfWidth, 16.65, 0.01);
}
assert.throws(() => K.eclipses({ years: 0 })); checks++;
/* ── 7. Mevsimler: bağımsız düşük duyarlıklı Güneş konumu, zaman adımlı tarama, ayrı integral ── */
{
  const SE = K.SEASON; near(SE.OBLIQ, 23.44, 0); near(SE.ECC, 0.0167, 0); near(SE.LON_PERI, 102.94719, 0); near(SE.S0, 1361.0, 0); near(SE.A_EARTH, 149.598e6, 0); ok(Object.isFrozen(SE), "SEASON donuk");
  // Almanak düşük duyarlıklı Güneş konumu (2025; 1 Ocak 2025 12.00 UT = J2000 + 9132 gün)
  const almanac = (N) => { const n = 9131 + N, L = 280.460 + 0.9856474 * n, g = (357.528 + 0.9856003 * n) * D2R, lam = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * D2R; return Math.asin(Math.sin(23.44 * D2R) * Math.sin(lam)) / D2R; };
  let maxApprox = 0;
  for (let N = 1; N <= 365; N++) {
    const o = K.sunOrbit(N); nearAbs(o.delta, almanac(N), 0.45, "δ almanak N=" + N);
    const M = 2 * Math.PI * (N - SE.N_PERI) / SE.YEAR; nearAbs(o.E - SE.ECC * Math.sin(o.E), M, 1e-12, "Kepler denklemi");
    near(o.rOverA, 1 - SE.ECC * Math.cos(o.E), 1e-12); maxApprox = Math.max(maxApprox, Math.abs(K.declApprox(N) - o.delta));
  }
  ok(maxApprox < 1.5 && maxApprox > 0.3, "kosinüs yaklaşımı 0,3°–1,5° sapar: " + maxApprox);
  near(K.sunOrbit(SE.N_PERI).rOverA, 1 - SE.ECC, 1e-12, "günberi"); near(K.sunOrbit(SE.N_PERI + SE.YEAR / 2).rOverA, 1 + SE.ECC, 1e-12, "günöte");
  nearAbs(K.sunOrbit(SE.N_PERI).rOverA * SE.A_EARTH / 1e6, 147.095, 0.01, "günberi uzaklığı (NASA 147,095)");
  nearAbs(100 * (1 / (1 - SE.ECC) ** 2 - 1), 3.43, 0.005); nearAbs(100 * (1 / (1 + SE.ECC) ** 2 - 1), -3.26, 0.005);
  const sd = K.seasonDates(); nearAbs(sd.march, 79.5, 1.0, "Mart ekinoksu"); nearAbs(sd.june, 172, 1.0, "Haziran gündönümü"); nearAbs(sd.september, 265.5, 1.0, "Eylül ekinoksu"); nearAbs(sd.december, 355.5, 1.0, "Aralık gündönümü");
  ok(sd.september - sd.march > 186 && sd.september - sd.march < 187, "kuzey yazı daha uzun");
  for (const eps of [0, 10, 23.44, 45, 90]) { let mx = -99; for (let N = 1; N <= 365; N++) mx = Math.max(mx, K.sunOrbit(N, { eps }).delta); nearAbs(mx, eps, eps === 90 ? 1 : 0.02, "en büyük δ = ε"); }
  // gün içi: Dünya'yı 1 s adımla döndür, Güneş vektörü sabit
  const brute = (phi, d) => { let above = 0, max = -99; const n = 86400; for (let i = 0; i < n; i++) { const H = 2 * Math.PI * (i + 0.5) / n - Math.PI; const zx = Math.cos(phi * D2R) * Math.cos(H), zz = Math.sin(phi * D2R); const a = Math.asin(zx * Math.cos(d * D2R) + zz * Math.sin(d * D2R)) / D2R; if (a > 0) above++; max = Math.max(max, a); } return { h: above / 3600, max }; };
  for (const phi of [-90, -66.56, -34, 0, 23.44, 41, 60, 66.56, 70, 89.9, 90]) for (const d of [-23.44, -10, 0, 10, 23.44]) {
    if (Math.abs(phi) === 90 && d === 0) continue; // Güneş tam ufukta: tanımsız sınır
    const b = brute(phi, d); nearAbs(K.dayLength(phi, d), b.h, 0.002, `gündüz φ=${phi} δ=${d}`); nearAbs(K.dayScan(phi, d).hours, b.h, 0.003, "tarama gündüz");
    nearAbs(K.noonAltitude(phi, d), b.max, 0.01, "öğle yüksekliği"); nearAbs(K.dayScan(phi, d).maxAlt, K.noonAltitude(phi, d), 1e-9);
    // ışınım: orta nokta toplamı (100.000 adım)
    let q = 0; const n = 100000; for (let i = 0; i < n; i++) { const H = 2 * Math.PI * (i + 0.5) / n; q += Math.max(0, Math.sin(phi * D2R) * Math.sin(d * D2R) + Math.cos(phi * D2R) * Math.cos(d * D2R) * Math.cos(H)); }
    for (const r of [0.983, 1, 1.0167]) { nearAbs(K.insolation(phi, d, r), 1361 * q / n / (r * r), 0.02, `Q φ=${phi} δ=${d}`); nearAbs(K.insolationNum(phi, d, r), K.insolation(phi, d, r), 0.05, "Simpson"); }
  }
  near(K.insolation(0, 0, 1), 1361 / Math.PI, 1e-12, "ekvator ekinoks"); near(K.insolation(90, 23.44, 1), 1361 * Math.sin(23.44 * D2R), 1e-12, "kutup gündönümü");
  // İstanbul (41° K): eski sayfanın düzeltilmiş değerleri
  nearAbs(K.noonAltitude(41, K.sunOrbit(172).delta), 72.44, 0.01); nearAbs(K.noonAltitude(41, K.sunOrbit(355).delta), 25.56, 0.01);
  nearAbs(K.dayLength(41, 23.44), 14.95, 0.01); nearAbs(K.dayLength(41, -23.44), 9.05, 0.01);
  nearAbs(Math.sin(72.44 * D2R) / Math.sin(25.56 * D2R), 2.2, 0.01, "öğle akısı oranı 2,2");
  // mevsimler eğiklikten: ε = 0'da iki yarım yıl arasındaki fark yalnız uzaklıktan (±%7'yi geçmez), ε = 23,44'te kat kat
  for (const phi of [-60, -41, 0, 41, 60]) { const a = K.sunOrbit(172, { eps: 0 }), b = K.sunOrbit(355, { eps: 0 }); const ratio = K.insolation(phi, a.delta, a.rOverA) / K.insolation(phi, b.delta, b.rOverA); ok(ratio > 0.93 && ratio < 0.94, "ε=0 oranı " + ratio); }
  { const a = K.sunOrbit(172), b = K.sunOrbit(355); ok(K.insolation(41, a.delta, a.rOverA) / K.insolation(41, b.delta, b.rOverA) > 3, "41° K yaz/kış > 3"); ok(K.insolation(-41, a.delta, a.rOverA) < K.insolation(-41, b.delta, b.rOverA), "güneyde ters"); }
  assert.throws(() => K.sunOrbit(10, { eps: 95 })); checks++;
}

console.log(`G ay-evreleri: ${checks.toLocaleString("tr-TR")} bağımsız evre, ay, doğuş, gölge, tutulma ve mevsim kontrolü PASS`);

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
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  let browser;
  try {
    browser = await chromium.launch();
    for (const [theme, width] of [["light", 390], ["dark", 1280]]) {
      const before = checks;
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width === 390 ? 2 : 1, locale: "tr-TR" });
      await ctx.addInitScript((t) => { localStorage.setItem("acelya-theme", t); localStorage.setItem("acelya-sound-muted", "1"); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(6000);
      const errors = []; page.on("pageerror", (e) => errors.push(e.message)); page.on("console", (m) => { if (m.type() === "error" && !/404/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/ay-evreleri.html`);
      const click = (id) => page.locator("#" + id).click(), read = async (id) => (await page.locator("#" + id).textContent()).trim();
      const has = async (id, t) => { const s = await read(id); assert(s.includes(t), `[${width}] #${id}: "${s}" içinde "${t}" yok`); checks++; };
      const range = (id, v) => page.locator("#" + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event("input", { bubbles: true })); }, v);
      const pick = (id, v) => page.locator("#" + id).selectOption(v);
      const eq = (a, b, label) => { assert.equal(a, b, `[${width}] ${label || ""}`); checks++; };
      const clean = async (sel) => { const t = await page.locator(sel).innerText(); assert(!/NaN|Infinity|undefined|null/.test(t), `[${width}] ${sel} bozuk sayı`); checks++; };
      const noOverflow = async () => eq(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "yatay taşma");
      const drawn = async (id) => eq(await page.evaluate((id) => { const c = document.getElementById(id), d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; const set = new Set(); for (let i = 0; i < d.length; i += 4 * 97) set.add(d[i] + "," + d[i + 1] + "," + d[i + 2]); return set.size > 4; }, id), true, id + " boş");

      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content input, .app-content select")].filter((e) => !document.querySelector(`label[for="${e.id}"]`)).length), 0, "etiketsiz denetim");
      eq(await page.evaluate(() => [...document.querySelectorAll(".app-content canvas")].filter((c) => c.getAttribute("role") !== "img" || !c.getAttribute("aria-label")).length), 0, "rolsüz tuval");
      eq(await page.evaluate(() => Object.isFrozen(MoonLab) && !Object.getOwnPropertyDescriptor(window, "MoonLab").writable), true, "çekirdek salt okunur");
      // her kaydırıcıda varsayılan ve hazır değerler adımla erişilebilir
      eq(await page.evaluate(() => [...document.querySelectorAll('input[type="range"]')].filter((e) => { const st = +e.step, k = (+e.value - +e.min) / st; return Math.abs(k - Math.round(k)) > 1e-6; }).length), 0, "adım dışı varsayılan");

      /* 01 · Evreler */
      await has("pName", "Büyüyen Hilal"); await has("pKTheory", "%14,71"); await has("pKMeas", "%14,71"); await has("pPsi", "134,90°"); await has("pAge", "3,69 gün"); await has("pDich", "89,853°"); await has("pWax", "sağ yanı");
      await pick("pHemi", "south"); await has("pWax", "sol yanı"); await has("pStatus", "Güney Yarım Küre'den");
      for (const [e, nm, k] of [[0, "Yeni Ay", "%0,00"], [90, "İlk Dördün", "%50,13"], [180, "Dolunay", "%100,00"], [270, "Son Dördün", "%50,13"], [315, "Küçülen Hilal", "%14,71"]]) { await page.locator(`.pPre[data-e="${e}"]`).click(); await has("pName", nm); await has("pKTheory", k); await clean("#panel-phase"); if (e === 90) await has("pStatus", "89,853°'de (dördünden önce)"); if (e === 270) await has("pStatus", "270,147°'de (küçülen evrede"); }
      await has("pWax", "sağ yanı"); // güneyde küçülen: sağ
      await range("pE", 359); await has("pName", "Yeni Ay"); await range("pE", 7); await has("pName", "Büyüyen Hilal");
      await click("pPlay"); await has("pPlay", "Duraklat"); await page.waitForTimeout(600); await click("pPlay"); ok(+(await page.locator("#pE").inputValue()) > 7, "oynatma ilerletir");
      await click("pReset"); await has("pName", "Büyüyen Hilal"); eq(await page.locator("#pHemi").inputValue(), "north", "sıfırla yarım küre"); await has("pEOut", "45°");
      await page.locator("h1").click(); await page.keyboard.press("Space"); await has("pPlay", "Duraklat"); await page.keyboard.press("r"); await has("pPlay", "Oynat"); await has("pEOut", "45°");
      await drawn("pTop"); await drawn("pDisc"); await noOverflow();

      /* 02 · Sinodik ve yıldızıl ay */
      await click("tab-month"); await has("mSynT", "29,5306 gün"); await has("mPSid", "—"); await has("mPSidT", "ilk tura 27,32 gün");
      await click("mSkip"); await has("mPSid", "27,3217 gün"); await has("mSyn", "29,5306 gün"); await has("mTurns", "13 yıldızıl tur · 12 evre"); await has("mExtra", "2,209 gün"); await has("mExtraT", "2,209 gün"); await has("mAngle", "26,93°"); await has("mStatus", "13,37"); await has("mDiff", "%±0,0000");
      eq(await page.locator("#mRows tr").count(), 8, "olay satırları");
      await pick("mY", "182.628"); await has("mPSid", "—"); await click("mSkip"); await has("mSynT", "32,1281 gün"); await has("mSyn", "32,1281 gün");
      await pick("mY", "inf"); await click("mSkip"); await has("mSyn", "27,3217 gün"); await has("mExtraT", "0 gün"); await has("mAngle", "0,00°"); await clean("#panel-month");
      await click("mReset"); eq(await page.locator("#mY").inputValue(), "365.256", "sıfırla Y"); await has("mT", "0,00 gün");
      await click("mPlay"); await page.waitForTimeout(700); await click("mPlay"); ok(!(await read("mT")).startsWith("0,00"), "zaman akar");
      await range("mSpeed", 30); await has("mSpeedOut", "30 gün/s"); await page.locator("h1").click(); await page.keyboard.press("r"); await has("mSpeedOut", "8 gün/s");
      await drawn("mStage"); await noOverflow();

      /* 03 · Ay ne zaman doğar? */
      await click("tab-rise"); await has("rRise", "12.00"); await has("rTransit", "18.13"); await has("rSet", "yok"); await has("rAltSunset", "87,0°"); await has("rLag", "50,47 dk"); await has("rLagT", "48,76 dk"); await has("rName", "İlk Dördün"); await has("rRiseT", "fark");
      await page.locator('.rPre[data-e="180"]').click(); await has("rRise", "18.13"); await has("rSet", "05.47"); await has("rTransit", "yok"); await has("rStatus", "Dolunay Güneş batarken doğar"); await has("rLag", "50,47 dk"); // doğrulayıcı: −24…48 sa taraması her hazırda gecikme verir
      await page.locator('.rPre[data-e="270"]').click(); await has("rTransit", "05.47"); await has("rSet", "12.00"); await has("rLag", "50,47 dk");
      await page.locator('.rPre[data-e="0"]').click(); await has("rRise", "05.47"); await has("rTransit", "12.00"); await has("rSet", "18.13"); await has("rAltSunset", "3,0°"); await has("rStatus", "hemen hemen birlikte"); await has("rLag", "50,4"); await page.locator('.rPre[data-e="180"]').click(); await has("rAltSunset", "ufkun altında");
      await range("rE", 359); await clean("#panel-rise"); await range("rClock", 0); await has("rClockOut", "00.00"); await range("rClock", 1440); await has("rClockOut", "24.00"); await clean("#panel-rise");
      await click("rReset"); await has("rEOut", "90°"); await has("rClockOut", "18.00");
      await drawn("rSky"); await drawn("rChart"); await noOverflow();

      /* 04 · Tutulmalar */
      await click("tab-ecl"); await has("eShadowRows", "373.575 km"); await has("eShadowStatus", "Halkalı tutulma"); await has("eSolar", "24 / 124 · %19,4"); await has("eLunar", "16 / 124 · %12,9"); await has("eKinds", "5 · 9 · 10"); await has("eSeason", "173,5 gün"); await has("eSolarT", "%18,5"); await has("eLimits", "Güneş 1,473°");
      await click("ePeri"); await has("eDOut", "363.300 km"); await has("eShadowStatus", "Tam tutulma"); await has("eShadowRows", "155 km");
      await click("eApo"); await has("eDOut", "405.500 km"); await has("eShadowStatus", "Halkalı");
      await range("eD", 379900); await has("eShadowStatus", "Tam tutulma"); await range("eD", 380000); await has("eShadowStatus", "Halkalı");
      await range("eSun", 147.095); await has("eSunOut", "147,095"); await range("eSun", 152.1); await has("eSunOut", "152,100"); await clean("#panel-ecl");
      await pick("eMode", "lunar"); await click("eMean"); await has("eShadowRows", "1.382.651 km"); await has("eShadowRows", "1 sa 41 dk"); await has("eShadowStatus", "2,65 katı");
      await click("eFlat"); await has("eSolar", "124 / 124"); await has("eStatus", "Eğiklik sıfır"); await has("eSeasonT", "karıştı");
      await range("eInc", 0.5); await has("eStatus", "ıskalayamaz"); await range("eInc", 10); await range("eYears", 50); await clean("#panel-ecl"); await range("eYears", 1); await clean("#panel-ecl");
      await click("eReset"); await has("eSolar", "24 / 124"); eq(await page.locator("#eMode").inputValue(), "solar", "sıfırla kesit");
      for (const id of ["eShadow", "eNodes", "eChart"]) await drawn(id);
      await noOverflow();

      /* 05 · Mevsimler */
      await click("tab-season"); await has("sNOut", "21 Haziran (gün 172)"); await has("sLatOut", "41,00° K"); await has("sDecl", "23,44°"); await has("sNoon", "72,44°"); await has("sDay", "14 sa 57 dk"); await has("sDayT", "fark");
      await has("sQ", "483,3 W/m²"); await has("sQNum", "483,3 W/m²"); await has("sDist", "152,025 milyon km"); await has("sDistT", "%+3,43"); await has("sDistT", "%−3,26"); await has("sStatus", "oran 3,25"); await has("sDates", "22 Haziran");
      await page.locator('.sDate[data-n="355"]').click(); await has("sNoon", "25,56°"); await has("sDay", "9 sa 03 dk"); await has("sDist", "%+3,32");
      await page.locator('.sDate[data-n="172"]').click(); await page.locator('.sLatP[data-lat="90"]').click(); await has("sDayT", "kutup gündüzü"); await has("sDay", "24 sa 00 dk"); await has("sQ", "524,2 W/m²"); await has("sStatus", "kutup dairesinin"); await has("sStatus", "yıl boyu ufukta"); // doğrulayıcı: kutupta 0/0 oranı yok
      await page.locator('.sLatP[data-lat="66.56"]').click(); await has("sStatus", "neredeyse sıfır"); await has("sStatus", "tam üzerinde"); ok(!/oran \d{1,3}(\.\d{3})+/.test(await read("sStatus")), "kutup dairesinde saçma oran yok"); // doğrulayıcı düzeltmesi
      await page.locator('.sLatP[data-lat="-34"]').click(); await has("sLatOut", "34,00° G"); await has("sNoon", "32,56°");
      await range("sLat", -90); await has("sNoon", "Güneş doğmuyor"); await has("sDayT", "kutup gecesi"); await has("sQ", "0,0 W/m²"); await clean("#panel-season");
      await page.locator('.sLatP[data-lat="0"]').click(); await page.locator('.sDate[data-n="80"]').click(); await has("sDay", "12 sa 00 dk");
      await click("sNoTilt"); await has("sEpsOut", "0,00°"); await has("sStatus", "Eğiklik sıfır"); await has("sDecl", "0,00°");
      await range("sEps", 90); await range("sN", 1); await range("sN", 365); await clean("#panel-season");
      await page.locator("#sFixR").check(); await has("sDist", "sabit"); await clean("#panel-season");
      await page.locator("h1").click(); await page.keyboard.press("r"); await has("sEpsOut", "23,44°"); eq(await page.locator("#sFixR").isChecked(), false, "sıfırla r=a"); await has("sNoon", "72,44°");
      for (const id of ["sOrbit", "sDeclChart", "sQChart"]) await drawn(id);
      await noOverflow();

      // sekme klavyesi
      await page.locator("#tab-season").focus(); await page.keyboard.press("Home"); eq(await page.locator("#tab-phase").getAttribute("aria-selected"), "true", "Home");
      await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-month").getAttribute("aria-selected"), "true", "sağ ok"); eq(await page.locator("#panel-month").isVisible(), true, "panel görünür");
      await page.keyboard.press("End"); eq(await page.locator("#tab-season").getAttribute("aria-selected"), "true", "End"); await page.keyboard.press("ArrowRight"); eq(await page.locator("#tab-phase").getAttribute("aria-selected"), "true", "sarma");
      await page.keyboard.press("ArrowLeft"); eq(await page.locator("#tab-season").getAttribute("tabindex"), "0", "tabindex");
      // form denetimindeyken R yok sayılır
      await click("tab-ecl"); await range("eYears", 20); await page.locator("#eYears").focus(); await page.keyboard.press("r"); await has("eYearsOut", "20 yıl");
      await noOverflow();
      assert.deepEqual(errors, [], `[${width}] konsol hataları`); checks++;
      console.log(`G ay-evreleri: ${width} px ${theme} · ${checks - before} arayüz denetimi PASS`);
      await ctx.close();
    }
  } finally { await browser?.close(); await new Promise((r) => server.close(r)); }
}
