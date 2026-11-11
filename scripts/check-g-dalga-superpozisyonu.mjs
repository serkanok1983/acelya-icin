// G · Dalga süperpozisyonu: çekirdeğin bağımsız denetimi.
// Başvurular sayfanın kendi formüllerini yinelemez: trigonometrik özdeşlikler ve kaba kuvvet taraması (01),
// doğrudan sinyal örnekleme (02), görüntü yöntemiyle d'Alembert çözümü ve enerji korunumu (03A),
// sürekli Gauss spektrumu üzerinde sayısal integrallerle merkez/genişlik (03B).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html = fs.readFileSync(new URL('../dalga-superpozisyonu.html', import.meta.url), 'utf8');
const source = html.split('/* KERNEL-BEGIN */')[1]?.split('/* KERNEL-END */')[0];
assert(source, 'KERNEL sınırları gerekli');
const context = { window: {} }; vm.createContext(context); vm.runInContext(source, context);
const K = context.window.SuperLab; assert(Object.isFrozen(K));
let checks = 0;
const near = (a, b, tol = 1e-9, msg = '') => { assert(Math.abs(a - b) <= tol * Math.max(1, Math.abs(b)), `${msg} ${a} ≠ ${b}`); checks++; };
const ok = (v, msg) => { assert(v, msg); checks++; };
const TAU = 2 * Math.PI, rad = d => d * Math.PI / 180;

// ── 01: bileşke genlik. Başvuru: A sin(θ+φ1) + B sin(θ+φ2) toplamının sık örneklenmiş en büyük değeri (kaba kuvvet)
const brutePeak = (c, x) => { const T = c.l1 / 2; let m = 0; for (let i = 0; i < 20000; i++) m = Math.max(m, Math.abs(K.sumAt(c, x, T * i / 20000))); return m; };
for (const A1 of [0, 1.3, 3, 5]) for (const A2 of [0, 2, 3]) for (const p2 of [0, 60, 90, 180, 275]) for (const opposite of [false, true]) for (const x of [0, 0.75, 3, 7.35]) {
  const c = { A1, A2, l1: 3, l2: 3, p1: rad(35), p2: rad(p2), opposite };
  near(K.lockin(c, x), brutePeak(c, x), 2e-7, 'lockin/kaba kuvvet');
  // kosinüs teoremi yerine karmaşık toplam: |A1 e^{iα} + A2 e^{iβ}|
  const d = K.localPhase(c, x); near(K.theoryAmp(A1, A2, d), Math.hypot(A1 + A2 * Math.cos(d), A2 * Math.sin(d)), 1e-12);
  near(K.lockin(c, x), Math.hypot(A1 + A2 * Math.cos(d), A2 * Math.sin(d)), 1e-9, 'yerel faz');
}
near(K.lockin({ A1: 3, A2: 2, l1: 3, l2: 3, p1: 0, p2: rad(60), opposite: false }, 3), Math.sqrt(19), 1e-12);
near(K.lockin({ A1: 3, A2: 3, l1: 3, l2: 3, p1: 0, p2: Math.PI, opposite: false }, 1.1), 0, 1e-12);
ok(K.lockin({ A1: 3, A2: 3, l1: 3, l2: 3.1, p1: 0, p2: 0, opposite: false }, 1) === null, 'λ farklıyken genlik tanımsız');
// özdeşlik: sin a + sin b = 2 sin((a+b)/2) cos((a−b)/2), duran dalga
for (const x of [0.2, 1.7, 5.5]) for (const t of [0, 0.31, 2.2]) { const c = { A1: 2, A2: 2, l1: 4, l2: 4, p1: 0, p2: 0, opposite: true }, k = TAU / 4; near(K.sumAt(c, x, t), 4 * Math.sin(k * x) * Math.cos(k * 2 * t), 1e-12); }
// ortalama şiddet = I1 + I2 (çapraz terim ortalaması sıfır)
for (const [a, b] of [[3, 2], [1, 4.5], [5, 5], [0, 2]]) near(K.meanIntensity(a, b), a * a + b * b, 1e-12);
// düğümler: sin(kx + (φ1+φ2)/2) = 0 koşulundan doğrudan
for (const lam of [1, 2.4, 3, 6]) for (const [p1, p2] of [[0, 0], [45, 120], [200, 355]]) for (const A2 of [3, 1.5]) {
  const c = { A1: 3, A2, l1: lam, l2: lam, p1: rad(p1), p2: rad(p2), opposite: true }, e = K.envelope(c), ex = K.extrema(e.xs, e.E, c);
  const mins = ex.mins.filter(m => m.x > -0.005 && m.x < 12.005); ok(mins.length >= 3, 'en az üç düğüm');
  for (const m of mins) { near(Math.sin(TAU / lam * m.x + (rad(p1) + rad(p2)) / 2), 0, 1e-7, 'düğüm konumu'); near(m.v, 3 - A2, 1e-6, 'düğüm genliği'); }
  for (let i = 1; i < mins.length; i++) near(mins[i].x - mins[i - 1].x, lam / 2, 1e-7, 'düğüm aralığı');
  if (A2 !== 3) near(ex.hi / ex.lo, (3 + A2) / (3 - A2), 1e-7, 'DDO'); else ok(ex.lo < 1e-6 * ex.hi, 'tam düğüm');
}
const flat = K.envelope({ A1: 3, A2: 2, l1: 3, l2: 3, p1: 0, p2: 1, opposite: false }); ok(K.extrema(flat.xs, flat.E).mins.length === 0, 'aynı yönde düğüm yok');

// ── 02: vuru. Başvuru: özdeşlik ve doğrudan sayım
for (const t of [0, 0.0123, 0.4, 1.999]) for (const [f1, f2] of [[440, 444], [300, 287.5]]) near(K.beatSignal({ f1, f2, A1: 1, A2: 1 }, t), 2 * Math.cos(Math.PI * (f2 - f1) * t) * Math.cos(Math.PI * (f1 + f2) * t), 1e-9);
for (const f1 of [200, 440, 800]) for (const df of [-20, -7.3, 1, 4, 12.5]) for (const A2 of [1, 0.4]) for (const win of [2, 5]) {
  const c = { f1, f2: f1 + df, A1: 1, A2 }, a = K.beatAnalysis(c, 0, win);
  ok(a.kind === 'ok', `vuru sayılmalı ${f1} ${df} ${win}`); near(a.fBeat, Math.abs(df), 2e-5, 'vuru frekansı');
  near(a.hi, 1 + A2, 2e-4, 'zarf en büyük'); if (A2 !== 1) near(a.lo, 1 - A2, 2e-4, 'zarf en küçük');
  near(a.fBeat / (Math.abs(df) / 2), 2, 2e-5, 'ikiye bölme tuzağı');
  // taşıyıcı tepeleri doğrudan sinyalle tutarlı (döndürme özyinelemesi beatSignal'i yinelemiyor)
  for (const i of [0, 7, a.ts.length - 1]) near(Math.abs(K.beatSignal(c, a.ts[i])), a.as[i], 5e-5, 'tepe değeri');
}
{ // bağımsız sayım: 4 Hz farkta 2 s içinde |zarf| tepe sayısı, sık örneklenmiş hareketli en büyükten
  const c = { f1: 440, f2: 444, A1: 1, A2: 1 }; let count = 0, prev = 0, up = true;
  for (let i = 1; i < 2000; i++) { let m = 0; for (let j = 0; j < 100; j++) m = Math.max(m, Math.abs(K.beatSignal(c, (i + j / 100) / 1000))); if (m > 1 && !up) { up = true; count++; } if (m < 1) up = false; prev = m; }
  ok(count === K.beatAnalysis(c, 0, 2).ups.length, 'yükseliş sayısı kaba sayımla aynı (8)'); ok(count === 8);
}
ok(K.beatAnalysis({ f1: 440, f2: 440, A1: 1, A2: 1 }, 0, 2).kind === 'steady', 'Δf = 0: vuru yok');
ok(K.beatAnalysis({ f1: 440, f2: 440.3, A1: 1, A2: 1 }, 0, 2).kind === 'slow', 'yavaş vuru sayılamaz');
near(K.beatAnalysis({ f1: 440, f2: 440.3, A1: 1, A2: 1 }, 0, 20).fBeat, 0.3, 1e-4);
ok(K.beatAnalysis({ f1: 440, f2: 444, A1: 1, A2: 0 }, 0, 2).kind === 'steady', 'tek ton: vuru yok');

// ── 03A: ip. Başvuru: görüntü yöntemiyle d'Alembert çözümü (periyodik uzatma), şemadan bağımsız
const bump = (s, w) => Math.abs(s) < w ? Math.cos(Math.PI * s / (2 * w)) ** 2 : 0;
function image(x, L, left, right) { // x'i [0, L] içine katla, işaret çarpanını döndür
  let sign = 1, guard = 0; while ((x < 0 || x > L) && guard++ < 50) { if (x < 0) { x = -x; sign *= left === 'free' ? 1 : -1; } else { x = 2 * L - x; sign *= right === 'free' ? 1 : -1; } } return [x, sign];
}
function exact(pulses, w, L, c, left, right, x, t) { // her atma: f(x − x0 ∓ ct); uç yansımaları görüntülerle
  let s = 0;
  for (const p of pulses) for (let m = -6; m <= 6; m++) for (const mirror of [false, true]) {
    // kaynak konumunun açılmış koordinatı: x0 + 2Lm (doğrudan) ya da −x0 + 2Lm (ayna); işaret, o görüntüye giden yansıma sayılarından
    const src = (mirror ? -p.x : p.x) + 2 * L * m, dir = mirror ? -p.dir : p.dir;
    const nL = mirror ? Math.abs(m) + (m > 0 ? 0 : 1) - (m === 0 ? 0 : 0) : Math.abs(m), nR = Math.abs(m);
    const sign = (left === 'free' ? 1 : (-1) ** nL) * (right === 'free' ? 1 : (-1) ** nR);
    s += sign * p.a * bump(x - src - dir * c * t, w);
  }
  return s;
}
for (const [left, right] of [['fixed', 'fixed'], ['free', 'free'], ['fixed', 'free'], ['free', 'fixed']]) for (const w of [0.4, 0.8, 1.6]) for (const [a1, a2] of [[0.03, -0.03], [0.03, 0.03], [0.02, 0], [-0.05, 0.035]]) {
  const st = K.makeString({ left, right }), pulses = [{ a: a1, x: 3, dir: 1 }, { a: a2, x: 7, dir: -1 }]; st.init(pulses, w);
  const E0 = st.energy().total; near(E0, K.pulseEnergy(st.T, w, [a1, a2]), 2e-2, 'başlangıç enerjisi');
  // çözümlemeli enerji: T π²/(4w) Σa² — türevin karesinin sayısal integrali ile
  let q = 0; const n = 20000; for (let i = 0; i < n; i++) { const s = -w + 2 * w * (i + 0.5) / n, d = (bump(s + 1e-6, w) - bump(s - 1e-6, w)) / 2e-6; q += d * d * 2 * w / n; }
  near(K.pulseEnergy(st.T, w, [a1, a2]), st.T * q * (a1 * a1 + a2 * a2), 1e-6, 'enerji integrali');
  let drift = 0;
  for (let i = 1; i <= 1500; i++) {
    st.step(); drift = Math.max(drift, Math.abs(st.energy().total - E0) / E0);
    if (i === 100) { const e = st.energy(); near(e.ke / e.total, (a1 - a2) ** 2 / (2 * (a1 * a1 + a2 * a2)), 2e-3, 'örtüşmede kinetik pay'); let pd = 0; for (let j = 0; j < st.N; j++) pd += (st.u[j + 1] - st.u[j]) ** 2; ok(Math.abs(e.pe - 0.5 * st.T / st.dx * pd) <= 0.01 * e.total, 'potansiyel pay = ½T∫y′² (ağ hatası içinde)'); near(Math.max(...Array.from(st.u, Math.abs)), Math.abs(a1 + a2) , 1e-9, 'örtüşmede tepe'); }
    if (i === 200) for (let j = 0; j <= st.N; j += 5) near(st.u[j], a1 * bump(j * st.dx - 7, w) + a2 * bump(j * st.dx - 3, w), 1e-12, 'geçişten sonra biçim');
    if (i === 700) { if (a1) near(st.u[150] / a1, right === 'free' ? 1 : -1, 1e-10, 'sağ yansıma'); if (a2) near(st.u[350] / a2, left === 'free' ? 1 : -1, 1e-10, 'sol yansıma'); }
  }
  ok(drift < 1e-12, `enerji sapması ${drift}`);
}
{ // serbest uç: uç yer değiştirmesi 2a; sabit uç: 0
  for (const right of ['free', 'fixed']) { const st = K.makeString({ left: 'fixed', right }); st.init([{ a: 0.03, x: 3, dir: 1 }], 0.8); let m = 0; for (let i = 0; i < 700; i++) { st.step(); m = Math.max(m, Math.abs(st.u[st.N])); } near(m, right === 'free' ? 0.06 : 0, 1e-12, 'uç yer değiştirmesi'); }
  // d'Alembert: yansımadan önce ve tek yansımadan sonra, elle yazılmış görüntü çözümü
  const st = K.makeString({ left: 'fixed', right: 'free' }); st.init([{ a: 0.03, x: 3, dir: 1 }], 0.8);
  for (let i = 1; i <= 600; i++) { st.step(); if (i % 50 === 0) for (let j = 0; j <= st.N; j += 7) { const x = j * st.dx, t = i * st.dt; near(st.u[j], 0.03 * (bump(x - 3 - 2 * t, 0.8) + bump(x - (20 - 3 - 2 * t), 0.8)), 1e-12, 'serbest uç görüntüsü'); } }
  const sf = K.makeString({ left: 'fixed', right: 'fixed' }); sf.init([{ a: 0.03, x: 3, dir: 1 }], 0.8);
  for (let i = 1; i <= 600; i++) { sf.step(); if (i % 50 === 0) for (let j = 0; j <= sf.N; j += 7) { const x = j * sf.dx, t = i * sf.dt; near(sf.u[j], 0.03 * (bump(x - 3 - 2 * t, 0.8) - bump(x - (17 - 2 * t), 0.8)), 1e-12, 'sabit uç görüntüsü'); } }
  near(sf.c, Math.sqrt(sf.T / sf.mu), 1e-12); near(sf.c * sf.dt / sf.dx, 1, 1e-12, 'Courant sayısı');
}

// ── 03B: dalga paketi. Başvuru: sürekli Gauss spektrumu üzerinde Simpson integralleri
// ⟨x⟩(t) = x0 + t⟨ω′⟩, Var(t) = σ0² + t² Var(ω′) (başlangıçta gerçel, cıvıltısız paket için tam)
const simpson = (f, a, b, n = 4000) => { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; };
const disp = { linear: [k => k, () => 1], deep: [k => Math.sqrt(9.81 * k), k => 0.5 * Math.sqrt(9.81 / k)], quad: [k => 0.08 * k * k, k => 0.16 * k] };
for (const kind of ['linear', 'deep', 'quad']) for (const lambda0 of [0.5, 1, 1.5]) for (const sigma0 of [0.8, 1, 2.5]) {
  const pk = K.makePacket({ kind, lambda0, sigma0 }), k0 = TAU / lambda0, sk = 1 / (2 * sigma0), W = k => Math.exp(-((k - k0) ** 2) / (2 * sk * sk)), a = k0 - 6 * sk, b = k0 + 6 * sk;
  const n0 = simpson(W, a, b), m1 = simpson(k => W(k) * disp[kind][1](k), a, b) / n0, m2 = simpson(k => W(k) * disp[kind][1](k) ** 2, a, b) / n0;
  near(pk.D.w(k0), disp[kind][0](k0), 1e-12); near(pk.D.d1(k0), disp[kind][1](k0), 1e-12);
  near(pk.D.d1(k0), (disp[kind][0](k0 + 1e-5) - disp[kind][0](k0 - 1e-5)) / 2e-5, 1e-8, 'dω/dk sayısal türev');
  near(pk.D.d2(k0), (disp[kind][1](k0 + 1e-5) - disp[kind][1](k0 - 1e-5)) / 2e-5, 1e-7, 'ω″ sayısal türev');
  near(K.spectrumWidth(pk).sigma, sk, 1e-6, 'Δk');
  for (const t of [0, 5, 20]) {
    const s = K.packetScan(pk, t);
    near(s.centroid, 6 + t * m1, 2e-6, `merkez ${kind} ${lambda0} ${sigma0} ${t}`);
    near(s.sigma, Math.sqrt(sigma0 ** 2 + t * t * (m2 - m1 * m1)), 5e-6, `genişlik ${kind} ${t}`);
    if (t === 0) { near(s.sigma * K.spectrumWidth(pk).sigma, 0.5, 1e-6, 'Δx·Δk = 1/2'); near(s.peak, 1, 1e-9); }
    else ok(s.sigma * K.spectrumWidth(pk).sigma >= 0.5 - 1e-6, 'Δx·Δk ≥ 1/2');
    if (kind === 'quad') { near(s.centroid, 6 + 0.16 * k0 * t, 2e-6, 'karesel merkez kapalı biçim'); near(s.sigma, Math.sqrt(sigma0 ** 2 + (0.16 * t / (2 * sigma0)) ** 2), 5e-6, 'karesel genişlik kapalı biçim'); near(K.sigmaTheory(pk, t), s.sigma, 5e-6); }
    if (kind === 'linear') near(s.sigma, sigma0, 5e-6, 'dağıtmasız: genişlik sabit');
    // alan doğrudan toplamla aynı mı (özyinelemeli faz ilerletme denetimi)
    for (const j of [0, 517, s.n - 1]) { const x = s.xmin + j * s.dx; let re = 0; for (let i = 0; i < pk.M; i++) re += pk.am[i] * Math.cos(pk.ks[i] * (x - 6) - pk.om[i] * t); near(s.re[j], re, 1e-9, 'alan'); }
  }
  // işaretli tepe: kısa sürede ω/k hızıyla ilerler ve gerçekten yerel en büyüktür
  let x = K.crestRefine(pk, 0, 6); near(x, 6, 1e-9, 'başlangıç tepesi'); const vp = disp[kind][0](k0) / k0;
  for (let i = 1; i <= 25; i++) x = K.crestRefine(pk, i * 0.02, x + vp * 0.02);
  near((x - 6) / 0.5, vp, 2e-2, 'faz hızı'); const f = K.packetAt(pk, 0.5, x); ok(Math.abs(f.im) < 1e-9 && f.re > 0, 'tepe: faz sıfır');
}
{ const d = K.makePacket({ kind: 'deep', lambda0: 1 }); near(d.D.w(d.k0) / d.k0 / d.D.d1(d.k0), 2, 1e-12, 'derin su: v_f = 2 v_g'); const q = K.makePacket({ kind: 'quad', lambda0: 1 }); near(q.D.d1(q.k0) / (q.D.w(q.k0) / q.k0), 2, 1e-12, 'karesel: v_g = 2 v_f'); }
console.log(`G dalga süperpozisyonu: ${checks.toLocaleString('tr-TR')} bağımsız çekirdek denetimi PASS`);

if (process.argv.includes('--browser')) {
  const { chromium } = await import('playwright'); const { createServer } = await import('node:http'); const { join, extname } = await import('node:path'); const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url));
  const server = createServer((req, res) => { const file = join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; } res.setHeader('Content-Type', ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' })[extname(file)] || 'application/octet-stream'); res.end(fs.readFileSync(file)); });
  await new Promise(r => server.listen(0, '127.0.0.1', r)); let browser; const before = checks;
  try {
    browser = await chromium.launch();
    for (const [width, theme] of [[390, 'light'], [1280, 'dark']]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: width < 500 ? 2 : 1, locale: 'tr-TR' });
      await ctx.addInitScript(t => { localStorage.setItem('acelya-theme', t); localStorage.setItem('acelya-sound-muted', '1'); }, theme);
      const page = await ctx.newPage(); page.setDefaultTimeout(8000); const errors = [];
      page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errors.push(m.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}/dalga-superpozisyonu.html`); await page.waitForTimeout(400);
      const click = id => page.locator('#' + id).click(), read = async id => (await page.locator('#' + id).textContent()).trim();
      const set = (id, v) => page.locator('#' + id).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event(e.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })); }, String(v));
      const has = async (id, text) => { const t = await read(id); assert(t.includes(text), `${width}px ${id}: "${t}" içinde "${text}" yok`); checks++; };
      const noOverflow = async tag => { ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px yatay taşma: ${tag}`); };
      // her denetimin etiketi var; tuvaller role=img
      ok(await page.evaluate(() => [...document.querySelectorAll('.app-content input,.app-content select')].every(e => e.labels && e.labels.length > 0)), 'etiketsiz denetim');
      ok(await page.evaluate(() => [...document.querySelectorAll('.app-content canvas.ds-canvas')].every(c => c.getAttribute('role') === 'img' && c.getAttribute('aria-label'))), 'tuval etiketi');
      ok(await page.evaluate(() => Object.isFrozen(SuperLab) && !Object.getOwnPropertyDescriptor(window, 'SuperLab').writable), 'çekirdek donuk');
      // 01
      await has('sumAm', '4,359 cm'); await has('sumAt', '4,359 cm'); await has('sumDphi', '60,0°'); await has('sumIr', '1,462'); await has('sumMean_m', '13,000'); await has('sumGap_d', 'aynı yönde düğüm yok');
      await click('sumCons'); await has('sumAm', '6,000 cm'); await has('sumIr', '2,000'); await has('sumStatus', 'Yapıcı');
      await click('sumDest'); await has('sumAm', '0,000 cm'); await has('sumA_d', '0,000 cm'); await has('sumStatus', 'Tam yıkıcı');
      await click('sumQuad'); await has('sumAm', '4,243 cm'); await has('sumIr', '1,000');
      await click('sumStand'); await has('sumGap_m', '1,500 m'); await has('sumGap_t', '1,500 m'); await has('sumSwr_m', '∞'); await has('sumFirst_m', '0,000 m'); await has('sumAm', '0,000 cm'); await has('sumStatus', 'Tam duran dalga');
      await set('sumXp', 3.75); await has('sumAm', '6,000 cm'); await has('sumDphi', '0,0°');
      await click('sumPartial'); await has('sumSwr_m', '3,000'); await has('sumSwr_t', '3,000'); await has('sumStatus', 'Kısmi duran dalga');
      await set('sumL2', 3.4); await has('sumAm', 'tanımsız'); await has('sumA_d', 'λ₁ ≠ λ₂'); await has('sumStatus', 'Dalga boyları farklı');
      await set('sumL2', 3); await set('sumA2', 0); await has('sumStatus', 'Yalnız bir dalga'); await has('sumDphi', 'tanımsız'); await set('sumA1', 0); await has('sumStatus', 'İki genlik de sıfır'); await has('sumIr', '—');
      await set('sumA1', 5); await set('sumA2', 5); await set('sumL1', 1); await set('sumL2', 1); await set('sumP1', 360); await set('sumP2', 360); await set('sumXp', 12); await has('sumGap_m', '0,500 m'); await noOverflow('01 sınır');
      await click('sumToggle'); await has('sumToggle', 'Devam et'); await click('sumReset'); await has('sumAm', '4,359 cm'); await has('sumToggle', 'Duraklat'); ok(await page.locator('#sumDir').inputValue() === 'same', 'sıfırlama yönü geri alır');
      // klavye: sekmeler
      await page.locator('#tab-sum').focus(); await page.keyboard.press('ArrowRight'); ok(await page.locator('#tab-beat').getAttribute('aria-selected') === 'true', 'sağ ok'); await page.keyboard.press('End'); ok(await page.locator('#tab-pulse').getAttribute('aria-selected') === 'true', 'End'); await page.keyboard.press('Home'); ok(await page.locator('#tab-sum').getAttribute('aria-selected') === 'true', 'Home'); await page.keyboard.press('ArrowLeft'); ok(await page.locator('#tab-pulse').getAttribute('aria-selected') === 'true', 'sol ok');
      // 02
      await click('tab-beat'); await page.waitForTimeout(200); await noOverflow('02');
      await has('beatFm', '4,000 Hz'); await has('beatFt', '4,000 Hz'); await has('beatHalf', '2,000 Hz'); await has('beatRatio', '2,000'); await has('beatT_m', '0,2500 s'); await has('beatMax_m', '2,000'); await has('beatCar_m', '442,00 Hz');
      await click('beat1'); await has('beatFm', '1,000 Hz'); await click('beatUneq'); await has('beatMin_m', '0,600'); await has('beatMax_m', '1,400'); await has('beatCar_m', '440,00 Hz'); await has('beatCar_t', '440,00 Hz'); await has('beatFm', '4,000 Hz');
      await set('beatDf', 0); await has('beatFm', 'vuru yok'); await has('beatStatus', 'Vuru yok'); await set('beatDf', 0.3); await has('beatFm', 'sayılamadı'); await has('beatStatus', 'sığmıyor'); await set('beatWin', 20); await has('beatFm', '0,300 Hz');
      await set('beatDf', -20); await set('beatF1', 800); await set('beatWin', 2); await has('beatFm', '20,000 Hz'); await set('beatF1', 200); await set('beatDf', 20); await has('beatFm', '20,000 Hz'); await set('beatA2', 0); await has('beatStatus', 'Tek ton');
      // akort görevi: f₂ gizli; burgu −3,4 Hz'de vuru kaybolur
      await click('beatTask'); await has('beatDfOut', 'gizli'); await has('beatFt', 'gizli'); await has('beatFm', '3,400 Hz'); ok(await page.locator('#beatF1').isDisabled(), 'görevde f₁ kilitli'); { const t = await read('beatRows'); ok(!/44[0-9],[0-9]/.test(t.replace(/3,400/g, '')), 'gizli frekans tabloda görünmemeli: ' + t); }
      await set('beatDf', -3.4); await has('beatStatus', 'Akort tamam'); await has('beatFm', 'vuru yok'); await has('beatStatus', '443,4 Hz');
      await click('beatTask'); await has('beatTask', 'Akort görevini başlat'); ok(!(await page.locator('#beatF1').isDisabled()), 'görev bitince f₁ açık');
      // ses: düğme açılır/kapanır, sayfa hatasız
      await click('beatAudio'); await page.waitForTimeout(150); const pressed = await page.locator('#beatAudio').getAttribute('aria-pressed'); ok(pressed === 'true' || pressed === 'false', 'ses düğmesi durumu'); if (pressed === 'true') { await has('beatAudioState', 'Ses açık'); await set('beatVol', 20); await click('beatAudio'); } await has('beatAudioState', 'Ses kapalı');
      await click('beatReset'); await has('beatFm', '4,000 Hz'); await has('beatDfOut', '+4,0 Hz'); await has('beatDfOut', '444,0 Hz');
      // 03A
      await click('tab-pulse'); await page.waitForTimeout(200); await noOverflow('03A');
      await click('pMeet'); await has('pTime', '1,00 s'); await has('pMax', '0,00 cm'); await has('pShare', '100,0 %'); await has('pMeet_m', '100,0 %'); await has('pMeet_t', '100,0 %'); await has('pStatus', 'tamamı'); await has('potVal', '0,0 µJ'); await has('pE_m', '221,61 µJ'); await has('pE_t', '222,07 µJ');
      await click('pStep'); await has('pTime', '1,05 s');
      await click('pSame'); await click('pMeet'); await has('pMax', '6,00 cm'); await has('pMeet_t', '0,0 %'); await has('pPeak_m', '6,00 cm');
      await click('pFree'); await set('pSpeed', 2); const fast = () => page.evaluate(() => { for (let i = 0; i < 140; i++) document.getElementById('pStep').click(); });
      await fast(); await has('pRr_m', '+1,000'); await has('pEnd_m', '6,00 cm'); await has('pEnd_t', '6,00 cm'); await has('pRl_d', '2. atma yok'); await has('pPass_d', 'yuvarlama');
      await click('pFixed'); await fast(); await has('pRr_m', '−1,000'); await has('pEnd_m', '0,00 cm');
      await set('pA1', 0); await set('pA2', 0); await has('pStatus', 'İki atmanın'); await has('pShare', '—'); await set('pA1', -5); await set('pA2', 5); await set('pW', 1.6); await set('pLeft', 'free'); await fast(); await has('pRl_m', '+1,000'); await has('pRr_m', '−1,000');
      const drift = await read('pDrift'); ok(drift === '0' || /10⁻¹[³⁴⁵⁶⁷⁸⁹]/.test(drift), 'enerji sapması yuvarlama düzeyinde: ' + drift);
      // 03B
      await click('modeB'); await page.waitForTimeout(300); await noOverflow('03B'); await page.evaluate(() => { document.getElementById('wRestart').click(); document.getElementById('wToggle').click(); });
      await has('wTime', '0,00 s'); await has('wProd', '0,500'); await has('wG_t', '0,625 m/s'); await has('wF_t', '1,250 m/s'); await has('wG_d', 't ≥ 0,50 s'); ok((await page.locator('#wRows').textContent()).includes('kuram: ω′(k₀), yaklaşık'), 'derin suda grup hızı kuram notu'); ok((await page.locator('a[href="fourier-ses.html"]').first().textContent()).includes('Fourier: Sesten Örneklere'), 'bağlantı metni hedef başlıkla aynı'); await has('wS_m', '1,000 m'); await has('wK_m', '0,5000');
      await click('wToggle'); await page.waitForTimeout(1500); await click('wToggle'); const vg = Number((await read('wVg')).replace(' m/s', '').replace(',', '.')), vp = Number((await read('wVp')).replace(' m/s', '').replace(',', '.'));
      ok(Math.abs(vg - 0.625) < 0.02, 'ölçülen grup hızı ' + vg); ok(Math.abs(vp - 1.25) < 0.05, 'ölçülen faz hızı ' + vp);
      await set('wDisp', 'linear'); await has('wG_t', '1,000 m/s'); await has('wF_t', '1,000 m/s'); await has('wStatus', 'Dağıtmasız');
      await set('wSpeed', 8); await page.waitForFunction(() => document.getElementById('wStatus').textContent.includes('34 m\'ye ulaştı'), null, { timeout: 20000 }); await has('wStatus', 't = 28,02 s'); await has('wStatus', 'Genişlik değişmedi (1,000 m)');
      await set('wDisp', 'quad'); await set('wLam', 0.5); await set('wSig', 0.8); await set('wSpeed', 8); await has('wG_t', '2,011 m/s'); await has('wF_t', '1,005 m/s');
      await page.waitForFunction(() => document.getElementById('wStatus').textContent.includes('34 m\'ye ulaştı'), null, { timeout: 20000 }); await has('wToggle', 'Devam et'); await has('wS_d', '0,00 %'); await has('wP_d', 'katı');
      // durma koşulu sabit adımda sınanır: durma anı oynatma hızından bağımsız, çekirdekten hesaplananla aynı
      { const pk = K.makePacket({ kind: 'quad', lambda0: 0.5, sigma0: 0.8 }); let t = 0, sc; do { t += 0.02; sc = K.packetScan(pk, t); } while (sc.centroid < 34); await has('wTime', t.toFixed(2).replace('.', ',') + ' s'); await has('wS_m', sc.sigma.toFixed(3).replace('.', ',') + ' m'); }
      await set('wLam', 1.5); await set('wSig', 2.5); await has('wProd', '0,500'); await has('wToggle', 'Duraklat');
      // R ve Boşluk kısayolları (form denetimi dışında)
      await page.locator('h1').click(); await page.keyboard.press('Space'); await has('wToggle', 'Devam et'); await page.keyboard.press('r'); await has('wLamOut', '1,00 m'); ok(await page.locator('#modeA').getAttribute('aria-pressed') === 'true', 'R: A deneyine döner'); await has('pA2Out', '−3,0 cm');
      await noOverflow('son'); assert.deepEqual(errors, [], `${width}px konsol hataları`); checks++;
      await ctx.close();
    }
    console.log(`G dalga süperpozisyonu: ${checks - before} tarayıcı denetimi (390 px açık, 1280 px koyu) PASS`);
  } finally { await browser?.close(); await new Promise(r => server.close(r)); }
}
