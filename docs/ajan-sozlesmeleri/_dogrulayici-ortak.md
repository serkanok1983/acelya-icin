# Bağımsız doğrulayıcı + editör — yeniden kurulan laboratuvarlar (11 Kasım 2026)

Working directory: the repo root (static Turkish STEM site "Açelya'nın Yeri").

Read first: docs/ajan-istemleri.md — the COMMON block, section "4. Doğrulayıcı + editör tek oturumda" and
"Çalıştırma notları"; docs/icerik-rehberi.md (schema, limits, allowed source domains, "Üniversite düzeyi", the
10-point checklist); shared/digest/sarkac.js (exemplar).

Situation, for each of your slugs: <slug>.html was rebuilt from scratch as a multi-tab lab by one agent
(builder report: .shots/briefs/<slug>.md; frozen computing core between /* KERNEL-BEGIN */ and
/* KERNEL-END */; permanent test scripts/check-g-<slug>.mjs shows how to load the core in node), and
shared/digest/<slug>.js was then rewritten for the new page by a second agent. You are the third,
independent agent. NEITHER the new page NOR the new digest has been independently checked. Assume both
contain errors. Handle your slugs one after the other, each with full care.

JOB 1 — check the PAGE's science/mathematics, independently of its own test script:
- Re-derive the key formulas the page displays and compare against the core's output for several states,
  including boundary values (write your own small reference computations; do not reuse the page's formulas).
- Read every on-page explanatory text, status message, caption and "limits" note for wrong or misleading
  statements. Operate the page in a real browser (Playwright) through each tab's main experiment once.
- You may fix page defects that are small and verified: wrong/misleading text, a wrong formula or constant,
  a caption or status line that contradicts the readouts, a control that silently does nothing, inconsistent
  number formatting (use U+2212 "−" for negative numbers in displayed text where the page mixes forms).
  Edit HTML only with small python/node replace scripts (never a reformatting editor). After any HTML change
  run `node scripts/check-g-<slug>.mjs --browser` (must pass; extend it with an assertion for what you fixed
  when simple). Do not redesign; report larger problems instead.

JOB 2 — adversarial fact-check of the DIGEST, then editor-in-chief (exactly as section 4 describes):
- Recompute every number the digest quotes from the page core; follow each lab experiment's instructions
  literally in the browser at least once per experiment and confirm the reader sees what the digest promises.
- Try to refute every historical/attribution claim; fetch each source URL once (if a request is blocked or
  fails, do not retry or wait for approval — soften or remove). Deep OpenStax links must match their section.
- Fix what is wrong; remove what is doubtful; grade 1–10 against the checklist and the "Üniversite düzeyi"
  section, be harsh, and rewrite weak parts in place. "next" titles must equal the targets' current <title>
  (minus site suffixes) and the reasons must describe what the targets really contain now.
- Turkish must read fluent, warm and natural. For economics/IR pages enforce strict neutrality.

Rules: modify ONLY shared/digest/<your slugs>.js, and for the small fixes <your slugs>.html and
scripts/check-g-<your slugs>.mjs. No state-changing git commands. No `npm run build`. Pass slugs to smoke.mjs
with `--only`. Scratch only under .shots/tmp-v-<first slug>/ (delete at the end; never delete other folders).
Prefix browser commands with `timeout 120`. Budget ~30 minutes per slug.

Final gates per slug: `node scripts/check-site.mjs --only <slug>` exits 0;
`timeout 120 node scripts/smoke.mjs --only <slug> --digest --tabs` 0 errors with the digest visible;
`node scripts/check-g-<slug>.mjs --browser` passes.

Report concisely per slug: page findings (fixed / left open, precise); claimsChecked; digest fixes
(severity · location · one line); scoreBefore/scoreAfter; uncertainties.
