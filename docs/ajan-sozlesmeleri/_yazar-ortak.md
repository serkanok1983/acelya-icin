# Defter yazarı — yeniden kurulan sayfa için ortak görev tanımı (11 Kasım 2026)

Working directory: the repo root (static Turkish STEM site "Açelya'nın Yeri").

Read first: docs/ajan-istemleri.md — the COMMON block, section "1. Yazar" and "Çalıştırma notları";
docs/icerik-rehberi.md (schema, limits, allowed source domains, "Üniversite düzeyi", the 10-point checklist);
shared/digest/sarkac.js (quality exemplar) and shared/digest/statik.js (a recent multi-tab lab digest).

Situation: <slug>.html has just been REBUILT from scratch as a multi-tab lab by another agent. Its builder
report — every control, readout, model constant and reference number — is .shots/briefs/<slug>.md. The page
exposes a frozen computing core between /* KERNEL-BEGIN */ and /* KERNEL-END */ (scripts/check-g-<slug>.mjs
shows how to load it in node). shared/digest/<slug>.js is the EXISTING digest: its history, story, concept
explanations and sources were independently fact-checked recently, but its tagline, hook, lab section,
worked example, quiz and parts of the core cards describe the OLD page.

YOUR JOB: bring shared/digest/<slug>.js fully in line with the new page, at full quality.
- Read the builder report and the new HTML completely; recompute every number you quote from the page core in
  node, and write numbers in exactly the format the page displays.
- KEEP what is verified and still true (story, history, sources, sound concept cards) — do not reintroduce
  claims a previous fact-checker removed, and do not add new historical claims unless you verify them by
  fetching a source (if a web request is blocked, do not retry or wait for approval: say less).
- REWRITE everything tied to the page: tagline and hook if they refer to old behaviour; lab.intro and 3–4
  Tahmin → Dene → Gözle → Açıkla experiments using the real tab names, control labels, presets and readouts,
  covering the tabs of the new lab; the worked example (first-year university level, with units, reproducible
  on the page where possible); quiz (3 questions, reasoning/scaling rather than recall); core cards and
  misconceptions where the new lab makes a better card possible (derivations the lab lets the reader test);
  "next" links (2–4 existing pages; titles must equal the target's current <title>; reasons must describe what
  the target really contains — check docs/sayfa-katalogu.md and the target file).
- State the model's limits honestly, as the page does. For economics/IR pages keep strict neutrality.
- Turkish must be fluent, warm and natural — not telegraphic, not translated-sounding. No emoji, no combining
  marks over letters. Set revision to "Kasım 2026".

Rules: modify ONLY shared/digest/<slug>.js. Do not edit HTML or anything else; report page bugs as
simulationNotes (precise: what, where, how to reproduce). No state-changing git commands; no `npm run build`;
pass slugs to smoke.mjs with `--only`. Scratch only in .shots/tmp-w-<slug>/ (delete at the end).
Write a complete draft to disk within ~15 minutes, then refine.

Final: `node scripts/check-site.mjs --only <slug>` exits 0.
Report briefly: checkPassed; what was kept vs rewritten; simulationNotes; uncertainties.
