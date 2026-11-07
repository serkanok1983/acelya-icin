# Ajan İstemleri (Keşif Defteri üretim hattı)

Bu oturumda kullanılan istemler. `${slug}` yerine sayfa slug'ı, `${COMMON}` yerine ortak bağlam gelir.
Üç ajan birbirinden bağımsız çalışır (ayrı bağlam); yalnızca `shared/digest/<slug>.js` dosyasını düzenlerler.
Her ajan sonunda `node scripts/check-site.mjs --only <slug>` sıfır hata vermelidir.

## Ortak bağlam (COMMON)

```
Project: "Açelya'nın Yeri" — a static Turkish science site (repo root = working directory). The goal is a university-level
basic-sciences STEM encyclopedia in Turkish. Every topic page gets a "Keşif Defteri" (discovery digest): a long-form,
delightful, rigorous content section rendered at the bottom of the page from the data file shared/digest/<slug>.js.
Readers range from a motivated high-school student to a first/second-year university student, and her father. The digest
climbs in layers: hook, big idea and story open to everyone; concept cards climbing from intuition to first-year
university depth; worked example and university bridge at first-year university level.
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

## 0. Laboratuvar kurucu (Kasım 2026)

İnce ya da yanlış fizik içeren bir sayfayı `sarkac.html` standardında sıfırdan yazar. Defter yazarı bu ajanın
raporuyla çalışır; rapor `.shots/briefs/<slug>.md` dosyasına yazdırılır (git dışı). Sayfaya özgü fizik özeti
(`PAGE BRIEF`) her sayfa için ayrıca yazılır: model, denetimler, okumalar, ölçülen–kuram çiftleri ve defterin
kullanacağı deneyler.

```
${COMMON-PROJECT}
YOUR ROLE: laboratory builder. Rebuild <slug>.html from scratch as a production-quality, physically correct,
university-level interactive lab. The gold standard is sarkac.html — read it completely first: real SI units; a
fixed-step integrator driven by an accumulator with the frame time clamped (Math.min(0.05, elapsed)) so it is
frame-rate independent (shared/app.js wraps requestAnimationFrame for a global pause); hand-drawn stage and chart
canvases (no chart libraries, no CDN scripts); labelled sliders/selects whose <output> shows value + unit; readouts that
put MEASURED values next to THEORY values with the % difference; Space/R shortcuts ignored inside form controls;
DPR-aware canvases via ResizeObserver; theme-aware colours from document.documentElement.dataset.theme (Canvas 2D cannot
resolve "var(--x)"); one column under 760 px, no horizontal overflow at 390 px.
Hard requirements: sarkac.html skeleton (app-root, theme.css, viewport-fit=cover, <title>, meta description, app.js in
<head>, <body class="app-page" data-page="<slug>">, <div class="app-content"> with <h1> and one <p class="hint">);
no body{overflow:hidden}; Turkish UI text without emoji; <label for> on every control, aria-live readouts, role="img"
canvases; physics verified numerically with a node script (scratch under .shots/tmp-<slug>/, deleted at the end);
a single self-contained HTML file; do not modify any other file. Do not uppercase labels that contain symbols.
Lessons from the previous rebuilds (reviewers flagged these; avoid them):
- Every preset value must be reachable with its slider step, and each tab needs a reset to its defaults.
- Use one rounding helper everywhere; a card and the status line must agree, especially at boundary values.
- Never print a measured value for a quantity that is not defined in the current state (use thresholds relative to
  the problem's scale, not absolute epsilons); say why instead.
- When the configuration is physically unobservable or outside the model's validity, the status line must say so.
- Changing a parameter must restart any running measurement; never leave a card stuck at "ölçülüyor…".
- Decimal number boxes: do not use type="number" (on a lang="tr" page Chrome displays a decimal comma, while the
  site writes decimal points); use type="text" inputmode="decimal" and parse with value.replace(",", ".").
- Event times (zero crossings, peaks, separations) must be located inside the integration step by interpolation, not
  snapped to the step's end; otherwise readouts flicker on the 1/DT grid and can even take impossible signs.
- Changing a parameter that alters the motion (length, gravity…) must restart from the stated initial condition; a
  silent change of amplitude makes the measured value depend on when the reader moved the slider.
- Estimators from binned data: represent a bin by the mean of its points, not its centre, and fit slopes locally on
  raw points; check every quoted measurement over several seeds or starts, not only the default one.
- Never attribute a numerical artefact or a physical effect to one cause without measuring it (e.g. step error vs
  rounding: run an h/2 twin; a heart model's stroke volume fell at 120 bpm because afterload rose, not because
  filling shortened: the end-diastolic volume had barely moved). Status lines that explain a mechanism need the numbers.
- An asymptotic formula in a page brief is not a finite-N result. 1 − π/ln N for the 2D return probability gives
  54.5 % at N = 1000; the exact value is 67.8 %. Check every such formula at the N the page will display.
- No combining marks in labels, notes or canvas text: a dot (U+0307) or bar (U+0304) over a letter slides sideways or
  vanishes in the site fonts. Write the plain letter and explain the notation in words, or use
  <span class="ov">x</span> with .ov { text-decoration-line: overline } for a bar.
Testing: check-site --only <slug> (exit 0), smoke --only <slug> (0 errors), shot.mjs dark / light / --width 390 --full;
look at every screenshot. Own Playwright scripts: set localStorage "acelya-user", "loggedIn" = "true" and
"acelya-sound-muted" = "1" with context.addInitScript (login gate).
Report (sections): title/purpose; controls (label, id, range, default, unit); readouts (id, formula); canvases;
model and constants with sources; reference numbers for the default state and each experiment (measured vs theory);
limitations; test results.
=== PAGE BRIEF ===
<model, controls, readouts and the experiments the digest will use>
```

## 4. Doğrulayıcı + editör tek oturumda (Kasım 2026)

Doğrulayıcının bulgularını editörün uygulaması için iki ayrı oturum açmak yerine aynı ajan önce çürütmeye çalışır,
sonra editör olarak düzeltir. Yazardan bağımsızlık korunur; koordinatör arada beklemez.

```
${COMMON}
SLUG: <slug>. YOUR TASK — two jobs on shared/digest/<slug>.js, in this order. Modify only that file.
JOB 1 — adversarial fact-check. You did not write this digest; assume it contains errors.
  a) Read the digest, <slug>.html, and .shots/briefs/<slug>.md if it exists. The page is the final authority.
  b) Extract every checkable claim: dates, names, numbers, formulas, mechanisms, attributions, predicted lab values,
     quiz answers, URLs.
  c) Try to REFUTE each claim: from knowledge, by computation (reproduce the page's code in node), and by fetching a
     source where possible. Keep a list: wrong / doubtful / quality, with location and suggested fix.
JOB 2 — editor-in-chief.
  a) Apply every fix you are confident about; for doubtful claims prefer removing the number or name.
  b) Grade 1–10 against the checklist and the "Üniversite düzeyi" section; be harsh; rewrite weak parts in place.
  c) "next" hrefs exist, sources on allowed domains, revision set.
  d) check-site --only <slug> exits 0; one smoke run with --digest.
Time budget: about 30 minutes. Prefer node reproductions over real-time browser runs; prefix browser commands with
`timeout 120`; give every Playwright wait a timeout; never wait in real time more than 60 s; if the browser hangs or
fails twice, stop using it. Only delete your own scratch folder.
Report: claimsChecked; issues (severity · location · one line) applied/rejected with reason; scoreBefore/scoreAfter;
main changes; simulationNotes; remaining uncertainties.
```

## Çalıştırma notları (Kasım 2026)

- Playwright, komut sandbox'ında işlemciyi yanlış algılayıp tarayıcıyı bulamıyor. `smoke.mjs`, `shot.mjs` ve ajanların
  kendi Playwright betikleri `required_permissions: ["all"]` ve
  `PLAYWRIGHT_BROWSERS_PATH=$HOME/Library/Caches/ms-playwright` ile çalıştırılmalı.
- 14 ajanlık bir dalga, tarayıcıda gerçek zamanlı doğrulama döngüleri yüzünden iki saati aştı; dosyalar ilk 30
  dakikada yazılmıştı. Ajanları 5–6'lık gruplarla çalıştır, her istemde 30 dakikalık bütçe ve `timeout` kuralı olsun,
  her grup bitince commit'le.
- Ajan raporları kaybolabilir: kurucu raporlarını dosyaya yazdır (`.shots/briefs/`), sayfa sayılarını oradan al.
- `smoke.mjs` sayfayı yalnız varsayılan sekmesiyle açar; sekme içindeki bir kod yolunu değiştirdikten sonra bütün
  sekmeleri (ve sekme içi düzenleri) bir Playwright betiğiyle tek tek açıp `pageerror` dinle. 7 Kasım'da hava sütunu
  sekmesindeki bir `ReferenceError` duman testinden geçti, ancak böyle yakalandı.
- Bağlantı kesintisi bütün ajanları aynı anda düşürebilir (6 Kasım, A3'ün altı kurucusu 55. dakikada). Kurucular
  sayfayı erken diske yazıp üzerinde yinelemeli; düşen ajan `resume` ile, diskteki durum anlatılarak kaldığı yerden
  sürdürülür.
- Bir ajan yalnız kendi geçici klasörünü silmeli; ortak `.shots/` klasörünü toptan silmesin.
- Web isteği otomatik denetime takılırsa alt ajanın onay isteği kullanıcıya hiç ulaşmaz; ajan beklerse durur. 7 Kasım'da
  konik kesitler yazarı böyle takıldı, dört saat sonra hiç dosya yazmadan düştü. İstemlere "engellenen isteği
  tekrarlama, onay bekleme; ayrıntıyı çıkar ya da çekinceyle yaz" ve "ilk 15 dakikada tam bir taslağı diske yaz"
  kuralları eklendi. Düşen yazarın yerine açılan yenisine, eskisinin doğruladıkları "baş başlangıç" olarak verilir.
- Kurucular sayfa yazarken yayın: ana ağaçta `npm run build` çalıştırma (sw.js ve katalog yarım sayfaları özetler);
  `deploy-manual.sh --publish` commit'lenmemiş değişiklik varken zaten durur. HEAD'den `.shots/` altına bir çalışma
  ağacı aç (`git worktree add .shots/yayin-wt -b yayin-x HEAD`; sandbox'ta `.git/worktrees` yazımı için tam izin
  gerekir), sync-meta, build, commit ve yayını orada yap; sonra ana ağaçta `git merge --ff-only yayin-x`, ağacı ve
  dalı sil, `git push origin main`'i ayrı komut olarak çalıştır. Komutları `;` ile değil `&&` ile bağla: 7 Kasım'da
  başarısız bir `worktree add`'den sonra derleme ana ağaçta çalıştı ve geri almak gerekti.
- Örnek defter (`sarkac.js`) de doğrulayıcıdan geçebilir; istemde "sesini, yapısını ve uzunluğunu koru, yalnız
  yanlışı düzelt" denmeli. 7 Kasım'da yaklaşık iki düzine düzeltmeyle 7'den 9'a çıktı, yapı aynı kaldı.
- Sitenin giriş kapısı oturum yoksa `index.html`'e yönlendirir. `smoke.mjs` ve `shot.mjs` bunu aşıyor; ajanların kendi
  Playwright betikleri `context.addInitScript` ile `acelya-user`, `loggedIn = "true"` ve `acelya-sound-muted = "1"`
  yazmalı.
- Doğrulayıcıların bulduğu sayfa hataları çoğunlukla aynı türden: hazır değere kaydırıcıyla ulaşılamaması, kart ile
  durum satırının sınır değerde çelişmesi, tanımsız bir nicelik için "ölçülen" değer yazılması (mutlak eşikler),
  gözlenemeyen bir düzenin uyarısız bırakılması. Kurucu istemindeki "Lessons" listesi bunlar için.
- Birleşik işaretler (üst nokta U+0307, üst çizgi U+0304) yalnız defterde değil sayfada da bozuk görünür: 7 Kasım'da
  kalp sayfasında Q̇ "Q`" gibi, karışık venöz v̄'nin çizgisi hiç görünmüyordu. Kurucu istemine kural olarak eklendi;
  sayfa etiketlerini doğrularken bir ekran görüntüsüne bak.

## Yapılandırılmış çıktılar

- Yazar: `{slug, written, field, checkPassed, simulationNotes[], uncertainties[]}`
- Doğrulayıcı: `{slug, claimsChecked, issues[{claim, problem, suggestedFix, severity: wrong|doubtful, location}]}`
- Editör: `{slug, scoreBefore, scoreAfter, factFixesApplied[], factFixesRejected[], changes[], remainingConcerns[], checkPassed}`

`simulationNotes` çıktıları `docs/simulasyon-notlari.md` dosyasına eklenmeli.
