#!/usr/bin/env node
/**
 * Açelya — site tutarlılık denetimi (derleme adımı olmayan statik site için)
 *
 *  - her sayfada data-page, viewport, lang="tr", <title>
 *  - sayfalar arası bağlantılar ve ana menü bağlantıları çözülüyor mu
 *  - index.html menüsünde olmayan sayfa var mı
 *  - sw.js önbellek listesi dosyaları var mı
 *  - shared/digest/<slug>.js dosyaları şemaya uyuyor mu (bağlantı, kaynak, HTML)
 *
 * Kullanım: node scripts/check-site.mjs [--require-digests] [--quiet] [--only slug1,slug2]
 * Çıkış kodu: hata varsa 1.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import vm from "node:vm";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const args = process.argv.slice(2);
const REQUIRE_DIGESTS = args.includes("--require-digests");
const QUIET = args.includes("--quiet");
const ONLY = (() => { const i = args.indexOf("--only"); return i >= 0 ? args[i + 1].split(",") : null; })();

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const SKIP_DIGEST = new Set(["index", "404", "bilgi", "bilim-atlasi"]);
const ALLOWED_TAGS = new Set(["p", "strong", "em", "b", "i", "sup", "sub", "code", "kbd", "var", "br", "span", "small", "ul", "ol", "li", "a", "mark"]);
const FIELDS = new Set(["Matematik", "Fizik", "Kimya", "Biyoloji", "Bilgisayar Bilimi", "Yer ve Uzay", "Yer ve Çevre Bilimleri", "Mühendislik", "Toplum ve Ekonomi", "Oyun", "Dil ve Edebiyat", "Zihin ve Davranış", "Tarih ve Toplum", "Felsefe ve Mantık", "Sanat ve Müzik", "İnsan Bedeni"]);
const LEVELS = new Set(["Lise hazırlık", "Lise", "Lise ileri", "Lise–Lisans", "Lisans"]);
const SOURCE_PREFIXES = [
  "https://openstax.org/", "https://ocw.mit.edu/", "https://phet.colorado.edu/",
  "https://tr.wikipedia.org/wiki/", "https://en.wikipedia.org/wiki/",
  "https://tr.khanacademy.org/", "https://www.khanacademy.org/",
  "http://hyperphysics.phy-astr.gsu.edu/", "https://www.feynmanlectures.caltech.edu/",
  "https://mathworld.wolfram.com/", "https://www.3blue1brown.com/", "https://oeis.org/",
  "https://plato.stanford.edu/", "https://iep.utm.edu/", "https://www.britannica.com/", "https://sozluk.gov.tr/", "https://www.nisanyansozluk.com/", "https://ourworldindata.org/", "https://stratigraphy.org/", "https://www.loc.gov/", "https://www.gutenberg.org/", "https://www.metmuseum.org/", "https://www.si.edu/", "https://www.nps.gov/", "https://www.tdk.gov.tr/", "https://islamansiklopedisi.org.tr/",
  "https://www.nrel.gov/", "https://www.energy.gov/", "https://refractiveindex.info/", "https://www.ioffe.ru/SVA/NSM/", "http://www.ioffe.ru/SVA/NSM/", "https://janaf.nist.gov/",
  "https://goldbook.iupac.org/", "https://webbook.nist.gov/", "https://www.nist.gov/", "https://www.itl.nist.gov/div898/handbook/", "https://physics.nist.gov/", "https://www.bipm.org/",
  "https://www.ncbi.nlm.nih.gov/", "https://pubmed.ncbi.nlm.nih.gov/", "https://www.biointeractive.org/",
  "https://tubes.mit.edu/",
  "https://math.bu.edu/", "https://dummit.cos.northeastern.edu/",
  "https://engineeringstatics.org/", "https://engcourses-uofa.ca/",
  "https://steelconstruction.info/", "https://www.enerpac.com/", "https://www.parker.com/",
  "https://www.20sim.com/", "https://academy.boschrexroth.com/", "https://www.ksb.com/",
  "https://www.numdam.org/",
  "https://pi.math.cornell.edu/", "https://mathshistory.st-andrews.ac.uk/",
  "https://tilings.math.uni-bielefeld.de/", "https://www.math.utah.edu/", "https://www.cs.toronto.edu/",
  "https://www.mathworks.com/", "https://maths-people.anu.edu.au/",
  "https://webhomes.maths.ed.ac.uk/", "https://www.mit.edu/",
  "https://people.ucsc.edu/", "https://underactuated.mit.edu/", "https://courses.seas.harvard.edu/",
  "https://math.hmc.edu/", "https://web.williams.edu/", "https://research.monash.edu/",
  "https://theory.stanford.edu/",
  "https://www.computerhistory.org/",
  "https://www.cryptomuseum.com/", "https://www.codesandciphers.org.uk/", "https://blog.sciencemuseum.org.uk/",
  "https://www.cs.cornell.edu/", "https://courses.cs.cornell.edu/",
  "https://xlinux.nist.gov/dads/", "https://www.postgresql.org/docs/", "https://www.sqlite.org/", "https://inst.eecs.berkeley.edu/~cs188/", "https://en.bilgem.tubitak.gov.tr/",
  "https://alvyray.com/",
  "https://newt.phys.unsw.edu.au/",
  "https://penelope.uchicago.edu/",
  "https://www.cs.yale.edu/", "https://www.cs.auckland.ac.nz/", "https://moogfoundation.org/",
  "https://science.nasa.gov/", "https://www.nasa.gov/", "https://www.esa.int/", "https://www.jpl.nasa.gov/",
  "https://nssdc.gsfc.nasa.gov/",
  "https://earthobservatory.nasa.gov/", "https://climate.nasa.gov/",
  "https://www.noaa.gov/", "https://gml.noaa.gov/", "https://www.weather.gov/", "https://oceanservice.noaa.gov/",
  "https://tidesandcurrents.noaa.gov/", "https://www.ngdc.noaa.gov/", "https://www.ncei.noaa.gov/",
  "https://www.usgs.gov/", "https://earthquake.usgs.gov/", "https://pubs.usgs.gov/",
  "https://www.ipcc.ch/", "https://www.iris.edu/", "https://www.wmo.int/", "https://wmo.int/",
  "https://developer.mozilla.org/", "https://docs.python.org/", "https://www.w3.org/",
  "https://plato.stanford.edu/entries/", "https://www.nobelprize.org/", "https://arxiv.org/abs/",
  "https://acikders.tuba.gov.tr/", "https://bilimgenc.tubitak.gov.tr/", "https://www.tubitak.gov.tr/",
  "https://www.un.org/", "https://data.worldbank.org/", "https://data-explorer.oecd.org/", "https://www.tcmb.gov.tr/", "https://www.imf.org/",
];

const pages = readdirSync(ROOT).filter((f) => f.endsWith(".html")).map((f) => f.replace(/\.html$/, "")).sort();
const pageSet = new Set(pages);
const html = Object.fromEntries(pages.map((p) => [p, readFileSync(join(ROOT, `${p}.html`), "utf8")]));

/* ── Sayfa temel kontrolleri ── */
for (const p of pages) {
  const s = html[p];
  if (!/<html[^>]*\blang="tr"/.test(s)) err(`${p}.html: <html lang="tr"> yok`);
  if (!/name="viewport"/.test(s)) err(`${p}.html: viewport meta yok`);
  if (!/<title>[^<]+<\/title>/.test(s)) err(`${p}.html: <title> yok`);
  if (p !== "index") {
    const m = s.match(/<body[^>]*data-page="([^"]+)"/);
    if (!m) err(`${p}.html: <body data-page> yok`);
    else if (m[1] !== p) err(`${p}.html: data-page="${m[1]}" dosya adıyla uyuşmuyor`);
    if (!/shared\/app\.js/.test(s)) err(`${p}.html: shared/app.js yüklenmiyor`);
    if (!/shared\/theme\.css/.test(s)) err(`${p}.html: shared/theme.css yüklenmiyor`);
  }
  // iç bağlantılar
  const links = [...s.matchAll(/href="([a-z0-9+-]+\.html)(?:[#?][^"]*)?"/gi)].map((m) => m[1]);
  for (const l of links) if (!existsSync(join(ROOT, l))) err(`${p}.html: kırık bağlantı ${l}`);
  // sabitlenmemiş CDN
  for (const m of s.matchAll(/src="(https:\/\/cdn\.jsdelivr\.net\/npm\/[^"@/]+)\//g)) err(`${p}.html: sürümsüz CDN paketi ${m[1]}`);
}

/* ── Ana menü ── */
const menuHrefs = new Set([...html.index.matchAll(/href: "([^"]+\.html)"/g)].map((m) => m[1]));
for (const h of menuHrefs) if (!existsSync(join(ROOT, h))) err(`index.html menüsü var olmayan sayfaya gidiyor: ${h}`);
for (const p of pages) {
  if (["index", "404", "bilgi"].includes(p)) continue;
  if (!menuHrefs.has(`${p}.html`)) warn(`${p}.html ana menüde yok`);
}

/* ── Service worker listesi ── */
if (existsSync(join(ROOT, "sw.js"))) {
  const sw = readFileSync(join(ROOT, "sw.js"), "utf8");
  for (const m of sw.matchAll(/"([a-z0-9+\/._-]+\.(?:html|js|css|m4a|png|svg|json))"/gi)) {
    if (!existsSync(join(ROOT, m[1]))) err(`sw.js: listede olmayan dosya ${m[1]}`);
  }
}

/* ── Defterler ── */
function loadDigest(slug) {
  const file = join(ROOT, "shared", "digest", `${slug}.js`);
  if (!existsSync(file)) return null;
  const sandbox = { window: {} };
  try {
    vm.runInNewContext(readFileSync(file, "utf8"), sandbox, { filename: file, timeout: 2000 });
  } catch (e) {
    err(`digest/${slug}.js: çalıştırılamadı: ${e.message}`);
    return null;
  }
  const d = sandbox.window.ACELYA_DIGEST?.[slug];
  if (!d) err(`digest/${slug}.js: window.ACELYA_DIGEST["${slug}"] tanımlı değil`);
  return d || null;
}

function checkHtml(where, value) {
  if (typeof value !== "string") return;
  // HTML'de etiket "<" ya da "</" işaretinden hemen sonra harfle başlar; "< Z" metindir
  for (const m of value.matchAll(/<\/?([a-zA-Z][a-zA-Z0-9]*)/g)) {
    if (!ALLOWED_TAGS.has(m[1].toLowerCase())) err(`${where}: izinsiz HTML etiketi <${m[1]}>`);
  }
  if (/\bTODO\b|lorem ipsum|\[\.\.\.\]/i.test(value)) err(`${where}: yer tutucu metin`);
  if (/[\u0302\u0304\u0305\u0307\u20d7]/.test(value)) {
    err(`${where}: birleşik harf üstü işaret (x̄, r̂, Q̇, p⃗) yazı tiplerinde kayıyor; <span class=ov>x</span>, <span class=hat>r</span> ya da <span class=vec>p</span> yaz`);
  }
}

function checkText(where, value, min, max) {
  if (typeof value !== "string" || !value.trim()) {
    err(`${where}: boş`);
    return;
  }
  checkHtml(where, value);
  const len = value.replace(/<[^>]+>/g, "").length;
  if (min && len < min) warn(`${where}: çok kısa (${len} karakter)`);
  if (max && len > max) warn(`${where}: çok uzun (${len} karakter)`);
}

function checkArray(where, value, min, max) {
  if (!Array.isArray(value)) {
    err(`${where}: dizi değil`);
    return false;
  }
  if (value.length < min) err(`${where}: en az ${min} öğe olmalı (${value.length})`);
  if (max && value.length > max) warn(`${where}: en fazla ${max} öğe önerilir (${value.length})`);
  return true;
}

let digestCount = 0;
const missingDigests = [];
for (const slug of pages) {
  if (SKIP_DIGEST.has(slug)) continue;
  if (ONLY && !ONLY.includes(slug)) continue;
  const s = html[slug];
  if (/data-stem-page=|class="[^"]*atlas-experience/.test(s)) continue;
  const d = loadDigest(slug);
  if (!d) {
    missingDigests.push(slug);
    continue;
  }
  digestCount++;
  const w = (k) => `digest/${slug}.js › ${k}`;
  if (d.slug !== slug) err(`${w("slug")}: "${d.slug}" ≠ "${slug}"`);
  checkText(w("title"), d.title, 8, 90);
  if (!FIELDS.has(d.field)) err(`${w("field")}: "${d.field}" tanımlı alanlardan değil`);
  if (!LEVELS.has(d.level)) err(`${w("level")}: "${d.level}" tanımlı düzeylerden değil`);
  if (!(Number.isFinite(d.minutes) && d.minutes >= 5 && d.minutes <= 90)) err(`${w("minutes")}: 5–90 arası sayı olmalı`);
  checkText(w("tagline"), d.tagline, 60, 240);
  checkText(w("hook"), d.hook, 60, 420);
  checkText(w("bigIdea"), d.bigIdea, 40, 360);
  if (checkArray(w("story"), d.story, 2, 4)) d.story.forEach((p, i) => checkText(w(`story[${i}]`), p, 200, 1400));
  if (checkArray(w("core"), d.core, 3, 5)) {
    d.core.forEach((c, i) => {
      checkText(w(`core[${i}].heading`), c.heading, 4, 80);
      checkText(w(`core[${i}].body`), c.body, 150, 1200);
      if (c.formula !== undefined) checkHtml(w(`core[${i}].formula`), c.formula);
      if (c.formulaNote !== undefined) checkHtml(w(`core[${i}].formulaNote`), c.formulaNote);
    });
  }
  if (!d.lab || !checkArray(w("lab.experiments"), d.lab?.experiments, 3, 4)) err(`${w("lab")}: eksik`);
  else {
    if (d.lab.intro) checkHtml(w("lab.intro"), d.lab.intro);
    d.lab.experiments.forEach((e, i) => ["title", "predict", "do", "observe", "explain"].forEach((k) => checkText(w(`lab.experiments[${i}].${k}`), e[k], k === "title" ? 4 : 30, k === "title" ? 90 : 600)));
  }
  if (checkArray(w("wow"), d.wow, 3, 3)) d.wow.forEach((x, i) => { checkText(w(`wow[${i}].title`), x.title, 4, 80); checkText(w(`wow[${i}].body`), x.body, 80, 700); });
  if (!d.worked || !checkArray(w("worked.steps"), d.worked?.steps, 2, 6)) err(`${w("worked")}: eksik`);
  else { checkText(w("worked.prompt"), d.worked.prompt, 30, 500); d.worked.steps.forEach((st, i) => checkText(w(`worked.steps[${i}]`), st, 20, 500)); if (d.worked.result) checkHtml(w("worked.result"), d.worked.result); }
  if (checkArray(w("misconceptions"), d.misconceptions, 2, 4)) d.misconceptions.forEach((m, i) => { checkText(w(`misconceptions[${i}].myth`), m.myth, 10, 200); checkText(w(`misconceptions[${i}].truth`), m.truth, 40, 600); });
  if (checkArray(w("glossary"), d.glossary, 5, 8)) d.glossary.forEach((g, i) => { checkText(w(`glossary[${i}].term`), g.term, 2, 60); checkText(w(`glossary[${i}].definition`), g.definition, 20, 260); });
  if (!d.bridge?.body) err(`${w("bridge")}: eksik`);
  else {
    const body = Array.isArray(d.bridge.body) ? d.bridge.body : [d.bridge.body];
    body.forEach((p, i) => checkText(w(`bridge.body[${i}]`), p, 120, 1400));
    if (d.bridge.topics !== undefined) checkArray(w("bridge.topics"), d.bridge.topics, 2, 8);
  }
  if (checkArray(w("quiz"), d.quiz, 3, 3)) {
    d.quiz.forEach((q, i) => {
      checkText(w(`quiz[${i}].question`), q.question, 15, 300);
      if (!checkArray(w(`quiz[${i}].options`), q.options, 3, 4)) return;
      q.options.forEach((o, j) => checkText(w(`quiz[${i}].options[${j}]`), o, 2, 200));
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) err(`${w(`quiz[${i}].answer`)}: geçersiz indeks`);
      checkText(w(`quiz[${i}].explanation`), q.explanation, 30, 500);
    });
  }
  if (checkArray(w("next"), d.next, 2, 4)) {
    d.next.forEach((n, i) => {
      if (!/^[a-z0-9+-]+\.html$/.test(n.href || "")) err(`${w(`next[${i}].href`)}: "${n.href}" biçimi yanlış`);
      else if (!existsSync(join(ROOT, n.href))) err(`${w(`next[${i}].href`)}: ${n.href} yok`);
      else if (n.href === `${slug}.html`) err(`${w(`next[${i}].href`)}: sayfa kendine bağlanıyor`);
      checkText(w(`next[${i}].title`), n.title, 3, 80);
      checkText(w(`next[${i}].why`), n.why, 20, 240);
    });
  }
  if (checkArray(w("sources"), d.sources, 2, 5)) {
    d.sources.forEach((src, i) => {
      checkText(w(`sources[${i}].title`), src.title, 4, 140);
      if (!SOURCE_PREFIXES.some((pre) => String(src.url || "").startsWith(pre))) err(`${w(`sources[${i}].url`)}: izinli alan adlarından değil: ${src.url}`);
      if (/openstax\.org\/books\//.test(src.url || "")) warn(`${w(`sources[${i}].url`)}: derin OpenStax bağlantısı; bölüm adını doğrula`);
    });
  }
  if (!d.revision) warn(`${w("revision")}: yok`);
}

if (missingDigests.length && !ONLY) {
  const msg = `Defteri olmayan sayfa: ${missingDigests.length} (${missingDigests.slice(0, 12).join(", ")}${missingDigests.length > 12 ? ", …" : ""})`;
  (REQUIRE_DIGESTS ? err : warn)(msg);
}

/* ── Rapor ── */
if (!QUIET) {
  console.log(`Sayfa: ${pages.length} · Defter: ${digestCount} · Uyarı: ${warnings.length} · Hata: ${errors.length}`);
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}
for (const e of errors) console.log(`  ✗ ${e}`);
process.exit(errors.length ? 1 : 0);
