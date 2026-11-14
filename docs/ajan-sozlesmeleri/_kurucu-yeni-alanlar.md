# Yeni alanlar — kurucu ek tanımı (12 Kasım 2026)

Read `docs/ajan-sozlesmeleri/_kurucu-ortak.md` (the STEM lab builder brief) for the shared engineering rules: standard shell
(shared/theme.css + shared/app.js, `data-page`, meta description, back link via app.js), frozen computing core exposed
read-only between /* KERNEL-BEGIN */ … /* KERNEL-END */ when the page computes anything, permanent test
`scripts/check-g-<slug>.mjs` (pure-node checks against independent references + `--browser` UI checks at 390 px light
and 1280 px dark), builder report `.shots/briefs/<slug>.md`, Turkish UI, no external scripts/fonts, no emoji, no
combining diacritics, one number format (decimal comma, "−", narrow no-break space thousands from 10 000), sources you
actually opened, no git state changes, no `npm run build`, edit only your three files.

## What is different for the new (non-STEM) fields — binding
The user's principle: **knowledge comes before form.** Do not bend the subject to fit the STEM lab template. Choose the
presentation that teaches the field best: interactive maps, timelines, argument trees, text analysis, audio, the reader
as the subject of an experiment, comparison tables, close reading of a source, step-by-step rule application, a
data explorer… Tabs are optional (use them if the material naturally splits; 2–5 are fine). "Measured vs theory" may
become "data vs claim", "rule vs exception", "argument vs counter-argument", "your response vs the population". What
stays: every page makes the reader *do* or *check* something, not only read; accuracy; sources; neutrality.

- Goal of each page: introduce the field, give its foundations at a solid first-year university level, accessible to a
  motivated high-school reader, and show how the field actually knows what it claims (its evidence and methods).
- Present real debates and competing schools as such; do not settle open questions; date any current figures.
- Copyright: only public-domain texts/recordings/images, or your own text. No song lyrics, no long quotations
  (≤ 15 words, attributed), no copyrighted images or recordings.
- Psychology pages: experiments run on the reader are for learning; store nothing, send nothing; say so. No diagnosis
  or clinical advice.
- Mobile: the page must pass `node scripts/audit-mobile.mjs --only <slug> --width 360` and
  `node scripts/audit-scroll.mjs --only <slug> --tabs` (whole-page scrolling with a finger everywhere; for draggable
  canvases use `window.AcelyaTouch.guard(el, hit)` from shared/app.js — see sarkac.html `nearBob`). Long tables/lists
  scroll with the page on phones, not inside small boxes.
- Audio (music pages): Web Audio only on user action, volume-limited, a visible stop button; everything must also be
  understandable without sound.
- `<title>` at most 80 characters.

Final gates: `node scripts/check-site.mjs --only <slug>` exits 0 (an "ana menüde yok" warning is expected; there is no
digest yet, so a digest 404 in smoke is the only allowed failure), `timeout 120 node scripts/smoke.mjs --only <slug>
--tabs` 0 JS errors, `node scripts/check-g-<slug>.mjs --browser` passes, the two mobile audits pass. Take screenshots
(1280 dark, 390 light), look at them, fix defects. Report briefly: what was built and why this form, key on-screen
values, test counts, sources opened, deviations, unresolved.
