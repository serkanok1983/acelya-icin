#!/usr/bin/env node
/**
 * G grubu (yeniden kurulan 18 laboratuvar) testlerini sırayla çalıştırır.
 * Kullanım: node scripts/check-g-all.mjs [--browser] [--only slug1,slug2]
 * Her betik kendi çekirdek (ve --browser ile arayüz) kontrollerini yapar; biri düşerse çıkış kodu 1 olur.
 */
import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const onlyAt = args.indexOf("--only");
const only = onlyAt >= 0 ? new Set(args[onlyAt + 1].split(",")) : null;
const pass = args.includes("--browser") ? ["--browser"] : [];
const files = readdirSync(here)
  .filter((f) => /^check-g-.+\.mjs$/.test(f) && f !== "check-g-all.mjs")
  .filter((f) => !only || only.has(f.slice(8, -4)))
  .sort();

const failed = [];
for (const f of files) {
  const started = Date.now();
  const r = spawnSync(process.execPath, [join(here, f), ...pass], { encoding: "utf8" });
  const ok = r.status === 0;
  const last = (r.stdout || "").trim().split("\n").filter(Boolean).slice(-1)[0] || "";
  console.log(`${ok ? "✓" : "✗"} ${f.slice(8, -4)} (${((Date.now() - started) / 1000).toFixed(0)} s) ${ok ? last : ""}`);
  if (!ok) {
    failed.push(f);
    console.log((r.stdout || "").split("\n").slice(-15).join("\n"));
    console.log((r.stderr || "").split("\n").slice(-15).join("\n"));
  }
}
console.log(`\n${files.length - failed.length} / ${files.length} G testi geçti${failed.length ? " · düşen: " + failed.join(", ") : ""}`);
process.exit(failed.length ? 1 : 0);
