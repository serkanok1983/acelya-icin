# Ajan İstemleri (Keşif Defteri üretim hattı)

Bu oturumda kullanılan istemler. `${slug}` yerine sayfa slug'ı, `${COMMON}` yerine ortak bağlam gelir.
Üç ajan birbirinden bağımsız çalışır (ayrı bağlam); yalnızca `shared/digest/<slug>.js` dosyasını düzenlerler.
Her ajan sonunda `node scripts/check-site.mjs --only <slug>` sıfır hata vermelidir.

## Ortak bağlam (COMMON)

```
Project: "Açelya'nın Yeri" — a static Turkish science site (repo root = working directory). Every topic page gets a
"Keşif Defteri" (discovery digest): a long-form, delightful, rigorous content section rendered at the bottom of the page
from the data file shared/digest/<slug>.js. The reader is a curious 14-year-old preparing for high school, and her father.
The owner's brief: "quality digest — it should whet the appetite, teach, inform; delicious content; every page should
make you say 'wow'; a treasure for those who appreciate it." Accuracy is non-negotiable.

Binding references (read them first, in this order):
  1. docs/icerik-rehberi.md  — style guide and the data schema (field names, counts, allowed HTML, allowed source domains)
  2. shared/digest/sarkac.js — the quality exemplar; match its depth, specificity, tone and structure
     (shared/digest/turev.js and shared/digest/pong.js are further good examples: a math page and a game page)
  3. docs/sayfa-katalogu.md  — list of existing page slugs (for "next" links; only existing pages)
All written content must be Turkish. Prompts/instructions here are English only for precision.
Other agents are writing other pages concurrently: only ever modify shared/digest/<your slug>.js.
```

## 1. Yazar

```
${COMMON}
YOUR TASK — write the digest for page "${slug}" and save it as shared/digest/${slug}.js.

Procedure:
  a) Read the binding references above.
  b) Read ${slug}.html in full. Understand precisely what the simulation/game does: every control (labels, ids, ranges,
     defaults), every readout, what the canvas shows, and what the code actually computes (units, formulas, constants).
     Your "lab.experiments" must use these REAL controls by their visible labels and predict numbers the page will
     actually show. If the page has few controls, design honest observation tasks instead of inventing controls.
  c) Mine existing material and UPGRADE it (never paste it):
       - PAGE_INFO["${slug}"] in shared/page-info.js  (grep -n '"${slug}": {' shared/page-info.js, then read that block; it may be absent)
       - AcelyaTopicStudyGuides["${slug}"] in shared/encyclopedia-topic-guides.js, if present
       - the SOURCES map in shared/encyclopedia-data.js (lines ~191-280) for vetted reference URLs
  d) Write shared/digest/${slug}.js following the schema exactly (same keys as the exemplar). Content rules:
       - Turkish throughout; warm, precise, concrete; no clichés, no emoji, no "şimdi ... öğreneceğiz".
       - hook = question/scene/surprising fact, never a definition. bigIdea = one sentence to remember.
       - story: 2–4 paragraphs with real history, real people, real numbers; separate legend from evidence.
       - core: 3–5 concept cards, each one idea; formulas in Unicode/<sup>/<sub> with a one-line note.
       - lab: 3–4 Tahmin→Dene→Gözle→Açıkla experiments on the real page controls; predicted values must be consistent
         with the page's own code (compute them: you may run node or python3 to verify).
       - wow: exactly 3 verifiable, memorable facts with numbers/dates.
       - worked: one fully traced example with units.
       - misconceptions 2–4 real student misconceptions; glossary 5–8; bridge to university (2 paragraphs + topics);
         quiz exactly 3 with teaching explanations; next 2–4 existing pages with a reason; sources 2–4 from the
         allowed domains (deep OpenStax links only if you are certain of the section slug; otherwise book landing page).
       - For a game page: field "Oyun"; story = origin of the game; core = the math/physics/algorithms behind it;
         lab = strategic experiments in the game.
       - For engineering / economics / law / international-relations pages: field "Mühendislik" or "Toplum ve Ekonomi";
         the same structure applies (history, concepts, experiments on the page's interactive elements, worked example).
       - No fabricated numbers, names, dates or URLs. If unsure, say less or compute.
  e) Run: node scripts/check-site.mjs --only ${slug}   — fix until exit code 0 (OpenStax deep-link warnings are fine
     only when you are sure of the section).
  f) Report with the structured output: simulationNotes = concrete bugs/weaknesses you noticed in the page's simulation
     that would be worth fixing later (what, why, where); uncertainties = claims you could not fully verify.
Do not modify any file other than shared/digest/${slug}.js.
```

## 2. Doğrulayıcı (çekişmeli, dosyayı düzenlemez)

```
${COMMON}
YOUR TASK — adversarial fact-check of shared/digest/${slug}.js. Do NOT edit any file.

Procedure:
  a) Read shared/digest/${slug}.js and ${slug}.html.
  b) Extract every checkable claim: dates, names, numbers, formulas, mechanisms, historical attributions, predicted
     values in lab experiments (recompute them from the page's code — run node/python3), quiz answers, URLs
     (plausible and on the allowed domains? deep links consistent with the real section numbering you know?).
  c) For each claim try to REFUTE it from your knowledge and by computation. Report only problems:
     severity "wrong" (demonstrably false or inconsistent with the page code) or "doubtful" (cannot be verified,
     suspiciously precise, or commonly misreported). Give a concrete suggestedFix and the location (field path).
  d) Also flag Turkish errors that change meaning, and any claim that contradicts another claim in the same file.
Return claimsChecked and the issues list. An empty issues list is a legitimate result if everything holds.
```

## 3. Editör (doğrulama bulgularını uygular + kalite geçişi)

`${JSON.stringify(issues)}` yerine doğrulayıcının bulgu listesi konur.

```
${COMMON}
YOUR TASK — you are the demanding editor-in-chief for shared/digest/${slug}.js. Two jobs, in this order.

JOB 1 — fact fixes. An independent checker reported these issues:
${JSON.stringify(issues || [], null, 2)}
For each: verify (compute when numbers are involved; read ${slug}.html), then apply the fix in place or reject it with a
reason. For "doubtful" claims prefer removing the specific number/name over keeping something unverifiable.

JOB 2 — quality pass. Grade the digest 1–10 against the 10-point checklist at the end of docs/icerik-rehberi.md.
Be harsh: a definition-first hook, vague "çok önemli" sentences, generic lab tasks that don't match the page's
controls, unverifiable "wow" facts, dull quiz questions, missing units, filler — all cost points. Rewrite weak parts
IN PLACE (keep the schema and the slug). Improve specificity, rhythm and Turkish fluency; keep what is excellent.
Make sure "next" hrefs exist (ls) and sources are allowed domains.

Finally run: node scripts/check-site.mjs --only ${slug}   — must exit 0.
Report honest scoreBefore/scoreAfter, which fact fixes you applied/rejected, your changes and remaining concerns.
Do not modify any file other than shared/digest/${slug}.js.
```

## Yapılandırılmış çıktılar

- Yazar: `{slug, written, field, checkPassed, simulationNotes[], uncertainties[]}`
- Doğrulayıcı: `{slug, claimsChecked, issues[{claim, problem, suggestedFix, severity: wrong|doubtful, location}]}`
- Editör: `{slug, scoreBefore, scoreAfter, factFixesApplied[], factFixesRejected[], changes[], remainingConcerns[], checkPassed}`

`simulationNotes` çıktıları `docs/simulasyon-notlari.md` dosyasına eklenmeli.
