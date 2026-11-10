// Girişsiz erişim, yerel oyun rekorları ve kapalı depolama denetimi.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = fileURLToPath(new URL('..', import.meta.url));
const out = path.join(root, '.shots/public-access');
mkdirSync(out, { recursive: true });
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.m4a': 'audio/mp4' };
const server = createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://local').pathname));
  if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
let checks = 0;
const errors = [], retiredRequests = [];
const check = (value, expected, message) => { assert.deepEqual(value, expected, message); checks++; };
function track(page) {
  page.on('pageerror', e => errors.push(e.message));
  page.on('request', req => { if (/\/shared\/(auth|activity|firebase-config)\.js|firebaseio\.com|firebase-database|firebase-app/.test(req.url())) retiredRequests.push(req.url()); });
}
try {
  for (const width of [1280, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, serviceWorkers: 'block' });
    const page = await ctx.newPage(); track(page);
    await page.goto(`${base}/index.html`);
    check(await page.locator('#gamePage').isVisible(), true, 'Ana menü doğrudan görünür');
    check(await page.locator('input[type=password], #loginForm').count(), 0, 'Giriş formu yok');
    check(await page.locator('.menu-card').count() > 100, true, 'Katalog açılır');
    await page.locator('#searchInput').fill('hilbert');
    await page.locator('a.menu-card[href="hilbert-egrisi.html"]').click();
    await page.waitForURL('**/hilbert-egrisi.html');
    check(new URL(page.url()).pathname, '/hilbert-egrisi.html', 'Katalogdan doğrudan konu');
    await page.goto(`${base}/sarkac.html`);
    await page.waitForSelector('#kesif-defteri');
    check(new URL(page.url()).pathname, '/sarkac.html', 'Derin bağlantı girişe yönlenmez');
    await page.evaluate(() => { for (const s of [localStorage, sessionStorage]) { s.setItem('acelya-user', 'legacy'); s.setItem('loggedIn', 'true'); s.setItem('acelya-after-login', 'bilgi.html'); } });
    await page.goto(`${base}/index.html`);
    check(await page.evaluate(() => [localStorage, sessionStorage].flatMap(s => ['acelya-user', 'loggedIn', 'acelya-after-login'].map(k => s.getItem(k)))), [null, null, null, null, null, null], 'Eski oturum temizlenir');
    check(new URL(page.url()).pathname, '/index.html', 'Eski hedefe yönlenmez');
    await page.screenshot({ animations: "disabled", path: path.join(out, `index-${width}.png`) });
    await page.goto(`${base}/bilgi.html`);
    check(await page.locator('h1').textContent(), 'Merakla başlayıp deneyle ilerle', 'Kişisel rapor yerine Hakkında');
    await page.goto(`${base}/oyun-2048.html`);
    await page.waitForFunction(() => window.AcelyaLeaderboard);
    check(await page.evaluate(() => AcelyaLeaderboard.fetch('oyun-2048')), { local: 0 }, 'Yeni tarayıcıda temiz rekor');
    check(await page.evaluate(() => AcelyaLeaderboard.submit('oyun-2048', 128)), true, 'İlk rekor');
    check(await page.evaluate(() => AcelyaLeaderboard.submit('oyun-2048', 32)), false, 'Düşük skor rekoru ezmez');
    check(await page.evaluate(() => AcelyaLeaderboard.submit('oyun-2048', 256)), true, 'Yüksek skor saklanır');
    await page.reload();
    await page.waitForFunction(() => document.querySelector('#best')?.textContent === '256');
    check(await page.evaluate(() => AcelyaLeaderboard.fetch('oyun-2048')), { local: 256 }, 'Yenilemede rekor korunur');
    check(await page.evaluate(async () => {
      const r = [];
      for (const value of [10, 8, 0, 4]) r.push(await AcelyaLeaderboard.submit('hanoi-kuleleri', value, { higherBetter: false }));
      return r;
    }), [true, true, true, false], 'Düşük skor hedefinde sıfır da geçerli rekor');
    check(await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('acelya-device-best-v1'))['oyun-2048'])), ['local'], 'Kayıt bir aile hesabına bağlanmaz');
    await ctx.close();
  }
  const blocked = await browser.newContext({ serviceWorkers: 'block' });
  await blocked.addInitScript(() => {
    for (const method of ['getItem', 'setItem', 'removeItem']) Storage.prototype[method] = () => { throw new DOMException('disabled', 'SecurityError'); };
  });
  const page = await blocked.newPage(); track(page);
  await page.goto(`${base}/index.html`);
  check(await page.locator('.menu-card').count() > 100, true, 'Depolama kapalıyken katalog');
  await page.goto(`${base}/sarkac.html`);
  check(new URL(page.url()).pathname, '/sarkac.html', 'Depolama kapalıyken doğrudan erişim');
  await page.waitForSelector('#kesif-defteri');
  check(await page.locator('#kesif-defteri').isVisible(), true, 'Depolama kapalıyken defter');
  await blocked.close();
  check(retiredRequests, [], 'Kimlik/etkinlik/Firebase isteği yok');
  check(errors, [], 'JavaScript hatası yok');
  console.log(JSON.stringify({ checks, errors, retiredRequests }));
} finally {
  await browser.close(); server.close();
}
