const fs = require("fs");
const path = require("path");
const vm = require("vm");
const dir = "/Users/serkanok/Development/HTML/acelya-nin-yeri/acelya-icin/shared";

let entries = {};

// Helper: extract object from JS file by evaluating it
function extractEntries(filePath) {
  const code = fs.readFileSync(filePath, "utf8");
  // Find the object literal assignment
  const match = code.match(/const\s+PAGE_INFO\w*\s*=\s*(\{[\s\S]*\});/);
  if (!match) {
    console.log(`  No match in ${path.basename(filePath)}`);
    return {};
  }
  try {
    const sandbox = {};
    vm.createContext(sandbox);
    const obj = vm.runInContext(`(${match[1]})`, sandbox);
    return obj;
  } catch (e) {
    console.log(`  Error evaluating ${path.basename(filePath)}: ${e.message}`);
    return {};
  }
}

// Extract from app.js
console.log("Processing app.js...");
const appJs = fs.readFileSync(path.join(dir, "app.js"), "utf8");
const piMatch = appJs.match(/const PAGE_INFO = (\{[\s\S]*?\n  \});/);
if (piMatch) {
  try {
    const sandbox = {};
    vm.createContext(sandbox);
    const obj = vm.runInContext(`(${piMatch[1]})`, sandbox);
    Object.assign(entries, obj);
    console.log(`  Got ${Object.keys(obj).length} entries`);
  } catch (e) {
    console.log(`  Error: ${e.message}`);
  }
}

// Extract from fragment files
for (let i = 1; i <= 4; i++) {
  const fn = path.join(dir, `page-info-${i}.js`);
  if (!fs.existsSync(fn)) continue;
  console.log(`Processing page-info-${i}.js...`);
  const obj = extractEntries(fn);
  const newEntries = Object.keys(obj).filter((k) => !entries[k]);
  newEntries.forEach((k) => {
    entries[k] = obj[k];
  });
  console.log(`  ${newEntries.length} new entries`);
}

// Write final
let output = `/**
 * Açelya — Temel Bilgi içerikleri
 * ${Object.keys(entries).length} sayfa için lise seviyesinde metinler
 */
const PAGE_INFO = {\n`;

Object.keys(entries)
  .sort()
  .forEach((key, idx, arr) => {
    const e = entries[key];
    // Escape backticks and dollar signs in template literal
    const safeText = e.text
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`")
      .replace(/\${/g, "\\${");
    output += `  "${key}": {\n    title: "${e.title}",\n    text: \`${safeText}\`,\n  }`;
    output += idx < arr.length - 1 ? ",\n" : "\n";
  });

output += "};\n";
fs.writeFileSync(path.join(dir, "page-info.js"), output);
console.log(
  `\nTotal: ${Object.keys(entries).length} entries written to page-info.js`,
);
