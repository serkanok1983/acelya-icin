/**
 * Ortak tuval denetimi: bir tuvalin gerçekten çizildiğini bütün piksellere bakarak ölçer.
 *
 * Eski testler tuvali her 97. pikselden (ya da her 4. pikselden) örnekleyip "kaç ayrı renk var" diye
 * bakıyordu; ince çizgili sahnelerde örneklem çizgileri ıskalayıp yanlış düşüyor ya da yanlış geçiyordu
 * (bkz. docs/simulasyon-notlari.md, "Test notu (H)"). Buradaki yardımcı tuvalin TÜM ImageData'sını
 * sayfanın içinde okur ve sağlam istatistikler döndürür:
 *
 *   ink      arka plan renginden `tol`'dan fazla ayrılan piksel sayısı (|ΔR|+|ΔG|+|ΔB|+|ΔA|)
 *   distinct ayrı RGB renk sayısı (saydamlık yok sayılır; eski testlerle aynı ölçü)
 *   bbox     mürekkebin sınır kutusu {x0, y0, x1, y1} (mürekkep yoksa null)
 *   bg       arka plan olarak alınan renk [r, g, b, a] (varsayılan: en sık görülen renk)
 *   w, h     tuvalin piksel boyutu
 *
 * Kullanım (Playwright):
 *   import { canvasInk, canvasInkAll, assertCanvasDrawn } from './lib/canvas-check.mjs';
 *   const st = await canvasInk(page, '#sahne');            // ya da canvasInk(page.locator('#sahne'))
 *   assertCanvasDrawn(st, { minInk: 400, minDistinct: 4, label: 'sahne' });
 *   for (const st of await canvasInkAll(page, 'main canvas')) assertCanvasDrawn(st);
 */
import assert from 'node:assert/strict';

/** Sayfa içinde çalışır; kendi kendine yeter (kapanış değişkeni kullanmaz). */
function inkStatsInPage(c, opts) {
  const o = opts || {};
  const tol = o.tol == null ? 24 : o.tol;
  const w = c.width, h = c.height;
  const id = c.id || '';
  if (!w || !h) return { id, w, h, ink: 0, distinct: 0, bbox: null, bg: null };
  const d = c.getContext('2d').getImageData(0, 0, w, h).data;
  const px = new Uint32Array(d.buffer, d.byteOffset, w * h);
  const counts = new Map();
  for (let i = 0; i < px.length; i++) { const v = px[i]; counts.set(v, (counts.get(v) || 0) + 1); }
  let bgIdx = 0;
  if (Array.isArray(o.bg)) bgIdx = -1;
  else if (o.bg === 'corner') bgIdx = 0;
  else { let best = -1, bestV = px[0]; for (const [v, n] of counts) if (n > best) { best = n; bestV = v; } bgIdx = px.indexOf(bestV); }
  const bg = bgIdx < 0 ? o.bg.slice(0, 4) : [d[4 * bgIdx], d[4 * bgIdx + 1], d[4 * bgIdx + 2], d[4 * bgIdx + 3]];
  if (bg.length < 4) bg.push(255);
  let ink = 0, x0 = w, y0 = h, x1 = -1, y1 = -1;
  const rgb = new Set();
  for (let y = 0, i = 0; y < h; y++) {
    for (let x = 0; x < w; x++, i += 4) {
      rgb.add(d[i] << 16 | d[i + 1] << 8 | d[i + 2]);
      const diff = Math.abs(d[i] - bg[0]) + Math.abs(d[i + 1] - bg[1]) + Math.abs(d[i + 2] - bg[2]) + Math.abs(d[i + 3] - bg[3]);
      if (diff > tol) { ink++; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
  }
  return { id, w, h, ink, distinct: rgb.size, bbox: ink ? { x0, y0, x1, y1 } : null, bg };
}

/**
 * Tek bir tuvalin istatistikleri.
 * @param target Playwright Page (selector ile) ya da Locator/ElementHandle (selector olmadan)
 * @param selector CSS seçici (target bir Page ise)
 * @param opts { tol = 24, bg = 'mode' | 'corner' | [r,g,b,a] }
 */
export async function canvasInk(target, selector, opts) {
  if (selector && typeof selector === 'object' && !Array.isArray(selector)) { opts = selector; selector = undefined; }
  if (selector == null) return target.evaluate(inkStatsInPage, opts || {});
  return target.locator(selector).first().evaluate(inkStatsInPage, opts || {});
}

/** Seçiciye uyan bütün tuvallerin istatistikleri (sırasıyla). */
export async function canvasInkAll(page, selector, opts) {
  const n = await page.locator(selector).count();
  const out = [];
  for (let i = 0; i < n; i++) out.push(await page.locator(selector).nth(i).evaluate(inkStatsInPage, opts || {}));
  return out;
}

/**
 * Tuvalin çizildiğini doğrular; düşerse istatistikleri iletide gösterir.
 * @param stats canvasInk sonucu
 * @param o { minInk = 400, minDistinct = 4, minW = 0, minSpan = 0 (mürekkep kutusunun genişliği/tuval genişliği), label }
 */
export function assertCanvasDrawn(stats, o = {}) {
  const { minInk = 400, minDistinct = 4, minW = 0, minSpan = 0, label = stats?.id || 'tuval' } = o;
  const info = `${label}: ${stats.w}×${stats.h}, mürekkep ${stats.ink} px, ${stats.distinct} renk` +
    (stats.bbox ? `, kutu ${stats.bbox.x0},${stats.bbox.y0}–${stats.bbox.x1},${stats.bbox.y1}` : ', kutu yok');
  assert.ok(stats.w > minW, `${info} — tuval çok dar (en az ${minW + 1} px beklenirdi)`);
  assert.ok(stats.ink >= minInk, `${info} — boş görünüyor (en az ${minInk} mürekkep pikseli beklenirdi)`);
  assert.ok(stats.distinct >= minDistinct, `${info} — çok az renk (en az ${minDistinct} beklenirdi)`);
  if (minSpan > 0) assert.ok(stats.bbox && (stats.bbox.x1 - stats.bbox.x0 + 1) >= minSpan * stats.w, `${info} — çizim çok dar bir alanda (genişliğin en az %${Math.round(minSpan * 100)}'i beklenirdi)`);
  return true;
}
