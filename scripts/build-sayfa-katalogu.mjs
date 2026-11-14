#!/usr/bin/env node
// docs/sayfa-katalogu.md'yi ana menüden (index.html MENU) ve shared/catalog.js'ten yeniden üretir.
// Kullanım: node scripts/build-sayfa-katalogu.mjs   (önce `npm run build` ile katalog güncel olmalı)
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const root = fileURLToPath(new URL("..", import.meta.url));
const idx = readFileSync(path.join(root, "index.html"), "utf8");
const a = idx.indexOf("const MENU = [");
const MENU = vm.runInNewContext(idx.slice(a + 13, idx.indexOf("];\n", a) + 1));
const sb = { window: {} };
vm.runInNewContext(readFileSync(path.join(root, "shared/catalog.js"), "utf8"), sb);
const C = sb.window.ACELYA_CATALOG;

let o = "# Sayfa Kataloğu\n\nAna menüdeki gruplar, ara başlıklar ve sayfalar (`scripts/build-sayfa-katalogu.mjs` üretir; plan: `docs/OGRENME-YOLLARI-PLANI.md`). `next` bağlantıları için slugları buradan seç; başlık hedefin `<title>`ıyla aynı olmalı. Öğrenme yolları ve önşart dizileri `shared/yollar.js` içinde.\n";
for (const c of MENU) {
  o += `\n## ${c.title} (${c.items.length})\n`;
  let sub = null;
  for (const it of c.items) {
    if ((it.sub || "") !== sub) { sub = it.sub || ""; o += sub ? `\n### ${sub}\n\n` : "\n"; }
    const slug = it.href.replace(/\.html$/, "");
    const t = (readFileSync(path.join(root, it.href), "utf8").match(/<title>([^<]+)<\/title>/) || [])[1] || "";
    const lv = C[slug]?.level || "";
    o += `- \`${slug}\` — ${it.label} (sayfa başlığı: ${t.trim()})${lv ? " · " + lv : ""}\n`;
  }
}
writeFileSync(path.join(root, "docs/sayfa-katalogu.md"), o);
console.log(`docs/sayfa-katalogu.md yazıldı: ${MENU.reduce((n, c) => n + c.items.length, 0)} sayfa, ${MENU.length} grup`);
