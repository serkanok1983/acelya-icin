#!/usr/bin/env node
/**
 * shared/catalog.js üretir: ana sayfa kartları ve arama için her defterin
 * başlığı, etiketi, alanı, düzeyi ve süresi.
 *
 * Kullanım: node scripts/build-catalog.mjs [--check]
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import vm from "node:vm";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const CHECK = process.argv.includes("--check");
const DIR = join(ROOT, "shared", "digest");
const OUT = join(ROOT, "shared", "catalog.js");

const catalog = {};
if (existsSync(DIR)) {
  for (const file of readdirSync(DIR).filter((f) => f.endsWith(".js")).sort()) {
    const slug = file.replace(/\.js$/, "");
    const sandbox = { window: {} };
    try {
      vm.runInNewContext(readFileSync(join(DIR, file), "utf8"), sandbox, { timeout: 2000 });
    } catch (e) {
      console.error(`${file}: ${e.message}`);
      process.exit(1);
    }
    const d = sandbox.window.ACELYA_DIGEST?.[slug];
    if (!d) continue;
    const text = (v) => String(v || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    catalog[slug] = {
      title: text(d.title),
      tagline: text(d.tagline),
      field: d.field || "",
      level: d.level || "",
      minutes: Number(d.minutes) || 0,
    };
  }
}

const body = `/**
 * Açelya — sayfa kataloğu (scripts/build-catalog.mjs üretir; elle düzenleme)
 * Ana sayfa kartları ve arama için Keşif Defteri özetleri.
 */
window.ACELYA_CATALOG = ${JSON.stringify(catalog, null, 2)};
`;

const current = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
if (current === body) {
  console.log(`catalog.js güncel (${Object.keys(catalog).length} kayıt)`);
  process.exit(0);
}
if (CHECK) {
  console.log("catalog.js güncel değil; node scripts/build-catalog.mjs çalıştır");
  process.exit(1);
}
writeFileSync(OUT, body);
console.log(`catalog.js yazıldı (${Object.keys(catalog).length} kayıt)`);
