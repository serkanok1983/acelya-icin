# Laboratuvar kurucu — ortak görev tanımı (11 Kasım 2026, zayıf laboratuvarların yeniden kurulumu)

Working directory: the repo root (static Turkish STEM site "Açelya'nın Yeri", a university-level interactive
basic-sciences encyclopedia; no build step, every page is one self-contained HTML file).

Read first, in this order:
1. docs/ajan-istemleri.md — the COMMON block, section "0. Laboratuvar kurucu" (YOUR ROLE: all of its hard
   requirements and its "Lessons" list are binding) and "Çalıştırma notları".
2. sarkac.html completely (the gold standard for a single-experiment lab).
3. statik.html and scripts/check-f1-statics.mjs (the current pattern for a multi-tab lab: role=tab tabs with
   arrow/Home/End keys, one reset per tab, a frozen read-only computing core exposed as a window global between
   /* KERNEL-BEGIN */ and /* KERNEL-END */ markers so node tests can load it, and a permanent check script with
   pure-node core checks plus optional `--browser` Playwright checks at 390 px light / 1280 px dark).
4. The CURRENT <slug>.html (what exists today — it is thin or weak; keep the topic, the data-page slug and the
   file name) and the CURRENT shared/digest/<slug>.js (an independently fact-checked digest: its story, concepts
   and vocabulary tell you what the lab must let the reader discover; its lab section will be rewritten for your
   new page by another agent afterwards). Also grep docs/simulasyon-notlari.md for your slug: it lists the known
   weaknesses you are here to remove.

YOUR JOB: rebuild <slug>.html from scratch as a production-quality, correct, university-level interactive lab
following the PAGE BRIEF in your task message. The brief names the tabs and the physics/mathematics; you design
the details. Every experiment must put a MEASURED value (from the simulation/integration/counting) next to the
THEORY value with the difference, state the model's assumptions and limits in the UI, and be something a
motivated high-school student can operate and a first-year university student can learn from.

Then:
- Write a permanent test scripts/check-g-<slug>.mjs: independent pure-node checks of the core against references
  that do NOT reuse the page's own formulas (closed forms, conservation laws, a different integrator or brute
  force, published values you actually opened), plus `--browser` UI checks (every tab, presets, resets, boundary
  values, keyboard, no console errors, no horizontal overflow at 390 px, labels on every control).
- Write the builder report to .shots/briefs/<slug>.md: title/purpose; every control (label, id, range, step,
  default, unit); every readout (id, formula); canvases; model and constants with sources you opened; exact
  reference numbers AS DISPLAYED for the default state and for four digest experiments (Tahmin → Dene → Gözle →
  Açıkla), each reproducible with the page's real controls; limitations; test results. Another agent rewrites
  the digest's lab from this report alone.

Rules:
- Create/modify ONLY <slug>.html, scripts/check-g-<slug>.mjs and .shots/briefs/<slug>.md
  (+ scratch under .shots/tmp-g-<slug>/, deleted at the end; never delete other folders).
- Do NOT touch shared/digest/<slug>.js, index.html, package.json, docs/, shared/ or any other page.
- No external scripts, fonts or CDNs. No emoji. Turkish UI text, fluent and natural. One number format across
  the page (state it in the report). No combining diacritical marks over letters.
- No state-changing git commands. Do not run `npm run build`. Pass slugs to smoke.mjs with `--only`.
- Write a complete working page to disk within the first ~20 minutes, then iterate. Edit by whole-file writes or
  small scripts. If a web request is blocked, do not retry or wait for approval; label the value as a teaching
  value instead. Prefix browser commands with `timeout 120`; set
  PLAYWRIGHT_BROWSERS_PATH=$HOME/Library/Caches/ms-playwright if the browser is not found.
- Take screenshots (dark 1280, light 390, every tab), LOOK at them and fix visual defects (overlaps, clipped
  labels, invisible text in light theme, unreadable canvases).
- Real-world or historical figures only from a source you actually opened; otherwise teaching values, labelled.
- For economics / international-relations pages: every model is a model — name its assumptions, present
  competing schools as such, no policy conclusions as fact, no undated current figures, strict neutrality.

Final gates: `node scripts/check-site.mjs --only <slug>` exits 0; `node scripts/smoke.mjs --only <slug> --tabs`
0 errors (a 404 for nothing — the digest file exists); `node scripts/check-g-<slug>.mjs --browser` passes.
The existing digest will temporarily describe the old page; that is expected.

Report back briefly: what was built, default-state numbers, test counts, deviations from the brief, unresolved.
