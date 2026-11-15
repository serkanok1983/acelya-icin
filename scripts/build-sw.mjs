#!/usr/bin/env node
/**
 * sw.js içindeki önbellek sürümünü ve kabuk listesini üretir.
 * Sürüm adı sitenin dosyalarından ve worker kodundan türetilir.
 *
 * Kullanım: node scripts/build-sw.mjs [--check]   (--check: dosya güncel değilse çıkış kodu 1)
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { createHash } from "node:crypto";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const CHECK = process.argv.includes("--check");
const SW = join(ROOT, "sw.js");

const list = (dir, re) =>
  readdirSync(join(ROOT, dir))
    .filter((f) => re.test(f))
    .sort()
    .map((f) => (dir === "." ? f : `${dir}/${f}`));

const pages = list(".", /\.html$/);
const shared = list("shared", /\.(js|css)$/).filter((f) => !/firebase-config\.example\.js$/.test(f));
const digests = existsSync(join(ROOT, "shared/digest")) ? list("shared/digest", /\.js$/) : [];
const media = ["hit.m4a", "explode.m4a", "laser.m4a", "thrust.m4a", "music-low.m4a", "music-high.m4a", "favicon-32.png", "favicon.svg", "apple-touch-icon.png", "manifest.json"].filter((f) => existsSync(join(ROOT, f)));

const all = [...pages, ...shared, ...digests, ...media];
const core = [
  "index.html", "404.html", "ogrenme-yollari.html", "onsart.html",
  "shared/app.js", "shared/catalog.js", "shared/digest.css", "shared/digest.js",
  "shared/icons.js", "shared/theme.css", "shared/yollar-view.js", "shared/yollar.css", "shared/yollar.js",
  "manifest.json", "favicon.svg", "favicon-32.png", "apple-touch-icon.png",
];
let src = readFileSync(SW, "utf8");
const hash = createHash("sha1");
for (const f of all) hash.update(f).update(readFileSync(join(ROOT, f)));
hash.update(src.replace(/\/\/ --- generated:[\s\S]*?\/\/ --- end:\w+ ---\n/g, "")).update(core.join("\n"));
const version = `acelya-${hash.digest("hex").slice(0, 10)}`;

const fmt = (arr) => arr.map((f) => `  "${f}",`).join("\n");
const replaceBlock = (name, body) => {
  const re = new RegExp(`(// --- generated:${name} ---\\n)[\\s\\S]*?(\\n// --- end:${name} ---)`);
  if (!re.test(src)) throw new Error(`sw.js içinde ${name} işaretçisi yok`);
  src = src.replace(re, `$1${body}$2`);
};
replaceBlock("version", `const VERSION = "${version}";`);
replaceBlock("core", `const CORE = [\n${fmt(core)}\n];`);

const current = readFileSync(SW, "utf8");
if (current === src) {
  console.log(`sw.js güncel (${version})`);
  process.exit(0);
}
if (CHECK) {
  console.log(`sw.js güncel değil; node scripts/build-sw.mjs çalıştır (${version})`);
  process.exit(1);
}
writeFileSync(SW, src);
console.log(`sw.js yazıldı: ${version} · çekirdek ${core.length} dosya · sayfa ${pages.length} · defter ${digests.length}`);
