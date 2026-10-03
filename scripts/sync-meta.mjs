#!/usr/bin/env node
/**
 * Defter etiketlerinden (tagline) sayfalara <meta name="description"> yazar.
 * Var olan açıklamaya dokunmaz; yalnızca eksik olanları tamamlar.
 * --force ile defteri olan her sayfanın açıklamasını defter etiketiyle değiştirir.
 *
 * Kullanım: node scripts/sync-meta.mjs [--force] [--check]
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import vm from "node:vm";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const FORCE = process.argv.includes("--force");
const CHECK = process.argv.includes("--check");

const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const strip = (v) => String(v || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

let changed = 0;
let missing = 0;
for (const file of readdirSync(ROOT).filter((f) => f.endsWith(".html")).sort()) {
  const slug = file.replace(/\.html$/, "");
  const digestFile = join(ROOT, "shared", "digest", `${slug}.js`);
  let html = readFileSync(join(ROOT, file), "utf8");
  const has = /<meta\s+name="description"/i.test(html);
  if (!existsSync(digestFile)) {
    if (!has && !["index", "404"].includes(slug)) missing++;
    continue;
  }
  const sandbox = { window: {} };
  vm.runInNewContext(readFileSync(digestFile, "utf8"), sandbox, { timeout: 2000 });
  const tagline = strip(sandbox.window.ACELYA_DIGEST?.[slug]?.tagline);
  if (!tagline) continue;
  const tag = `<meta name="description" content="${esc(tagline)}">`;
  let next = html;
  if (has) {
    if (!FORCE) continue;
    next = html.replace(/<meta\s+name="description"[^>]*>/i, tag);
  } else if (/<meta\s+name="viewport"[^>]*>/i.test(html)) {
    next = html.replace(/(<meta\s+name="viewport"[^>]*>)/i, `$1\n  ${tag}`);
  } else {
    next = html.replace(/<\/title>/i, `</title>\n  ${tag}`);
  }
  if (next !== html) {
    changed++;
    if (!CHECK) writeFileSync(join(ROOT, file), next);
  }
}
console.log(`${CHECK ? "güncellenecek" : "güncellendi"}: ${changed} sayfa · açıklaması ve defteri olmayan: ${missing}`);
process.exit(CHECK && changed ? 1 : 0);
