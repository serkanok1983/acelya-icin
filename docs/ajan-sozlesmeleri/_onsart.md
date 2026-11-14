# Önşart dersleri — kurucu, yazar ve doğrulayıcı için ek kurallar (13 Kasım 2026, U2–U3) — BINDING

Plan: `docs/OGRENME-YOLLARI-PLANI.md`. Yol verisi: `shared/yollar.js` (read it: your page is a step in one or more
önşart sequences; the steps before and after it are listed there — do not re-teach the next page, link to it).
These rules add to `_kurucu-ortak.md`, `_kurucu-yeni-alanlar.md`, `_yazar-ortak.md`, `_dogrulayici-ortak.md`; where
they conflict, these win.

## Who the page is for
A reader who wants the foundation they missed, possibly an adult returning to mathematics, possibly a strong
high-school student. Start from zero within the page's topic, never condescend, and end at the point where a
first-year university course takes over. Level in the digest: start "Lise hazırlık" or "Lise", never "Lisans".

## What every önşart page must have
1. **Build-up in small steps.** A sequence of short interactive sections, each introducing one idea with a visual or
   manipulable model (number line, area model, balance scale, grid, unit circle, code runner…) before the symbol.
2. **Practice with feedback.** A generator of exercises with seeded randomness, graded instantly, with a worked
   solution shown step by step on request and a hint level before the solution. Difficulty levels (at least three).
   Answers are parsed tolerantly (Turkish decimal comma AND dot, spaces, fractions like 3/4 where sensible) and the
   parser is unit-tested. Nothing is stored or sent; say so.
3. **Common mistakes.** At least five typical errors of this topic, each shown as a wrong worked step the reader can
   inspect, with why it is wrong (e.g. (a+b)² = a²+b², 1/2 + 1/3 = 2/5, log(a+b) = log a + log b).
4. **Why it is true.** For mathematics pages: at least one honest justification or proof per central rule, at the
   reader's level (an area picture, a counting argument, an algebraic derivation), not only the rule.
5. **Bridge.** A closing section "Bundan sonra" linking to the next pages of the önşart sequence (existing pages only;
   use plain text for planned pages listed in `shared/yollar.js` `planned`) and naming where the topic reappears
   in university courses.
6. **Turkish terminology** as used in Turkish schools and university textbooks (pay, payda, bölen, kat, üs, kök,
   ifade, denklem, eşitsizlik, çarpan, köşegen, açıortay, teğet…). Where usages differ, give both.

## Programming page (programlamaya-giris)
- The reader writes and runs real code in the page. Use a small, safe, self-written interpreter for a tiny teaching
  language with Turkish-friendly syntax OR a JavaScript subset executed in a sandboxed Web Worker with a step limit
  and timeout — your choice, justify it in the report. No eval of reader code on the main thread; no network; an
  infinite loop must stop cleanly with a clear message.
- Concepts in order: değer ve değişken, ifade, koşul, döngü, fonksiyon, liste; tracing (a step-through view of
  variables), then small exercises checked against hidden test cases.

## Validator duty
Check each numbered rule above with PASS/FAIL, solve at least ten generated exercises by hand in every difficulty
and compare with the page's grading, try malformed answers against the parser, and verify every justification is
mathematically correct (no circular argument, no false generalisation from examples).

## U3 additions (13 Kasım 2026): science/language foundations and the physician path — BINDING

### Medicine pages (bagisiklik-ve-mikrobiyoloji, farmakokinetik, epidemiyoloji-ve-klinik-arastirma, tibbi-goruntuleme-fizigi)
- The page teaches the SCIENCE behind medicine. No diagnosis, no screening of the reader, no treatment, dose or
  medication advice, no "should I take X?" content. Every patient, trial and measurement dataset is synthetic and
  labelled "yapay veri" unless it is a published aggregate you actually opened (then cite it with its year).
- Drug examples: use generic names only; any real pharmacokinetic parameter (half-life, volume of distribution,
  bioavailability…) only from a source you opened, shown as a typical published value for teaching, with an explicit
  on-page note "Bu bir doz önerisi değildir; ilaç kullanımı için hekime ya da eczacıya danışın." Prefer an invented
  drug ("İlaç A") for interactive dose simulations.
- Vaccines, antibiotics, radiation: report the scientific evidence and consensus accurately (WHO, CDC/NIH, peer-reviewed
  sources on allowed domains); do not create false balance; real controversies (e.g. historical trial ethics, the
  Wakefield retraction) are reported as what the record shows, with dates.
- Radiation doses only from opened sources (typical effective doses per examination), with ranges and units (mSv).
- A short, calm note: "Sağlıkla ilgili kararlar için bir sağlık profesyoneline başvurun; acil durumda 112."
- Non-stigmatising, person-first language for illnesses.

### Language pages (turkce-dilbilgisinin-temelleri, akademik-yazma-ve-kaynak-kullanimi)
- Terminology and rules follow TDK (Yazım Kılavuzu, Güncel Türkçe Sözlük at sozluk.gov.tr / tdk.gov.tr) and standard
  Turkish grammar books; where school grammar and linguistics differ (e.g. ek-fiil, sıfat-fiil adları, cümle öğesi
  analyses), say so. Example sentences: your own, or from public-domain texts (author died before 1956) with source.
- Exercises parse Turkish text: normalise case with Turkish rules (İ/i, I/ı), tolerate punctuation and spaces.
- Academic writing: describe citation styles (APA, Chicago, ISNAD — the Turkish style) in your own words with your own
  example references (real public-domain works or clearly invented ones); do not reproduce copyrighted style-guide
  text. Plagiarism, paraphrase and quotation exercises use public-domain source passages only. Source evaluation
  exercises use invented or clearly labelled examples; never label a real outlet as unreliable.

### Science foundations (mol-ve-stokiyometri, hucre-biyolojisi)
- Constants and atomic masses from IUPAC/NIST (opened); the 2019 SI redefinition of the mole stated correctly.
- Cell sizes, organelle counts, membrane transport rates: from opened sources, with ranges; mark textbook idealisations.

## U4 additions (13 Kasım 2026): the jurist and genetics paths — BINDING

### Law pages (hukuka-giris, anayasa-hukuku-ve-temel-haklar, ceza-hukukunun-genel-ilkeleri, borclar-ve-sozlesme-hukuku, hukuk-felsefesi)
- The page teaches how law works and how lawyers reason. No legal advice for the reader's own situation, no "what
  should I do", no templates to use in real disputes. A calm note: "Bu sayfa hukuki danışmanlık değildir; somut bir
  durum için bir avukata ya da baro adli yardım bürosuna başvurun."
- Turkish legislation only from official sources you open (mevzuat.gov.tr, resmigazete.gov.tr; Anayasa Mahkemesi at
  anayasa.gov.tr; Yargıtay/Danıştay sites), quoted ≤ 15 words per quotation and otherwise paraphrased, always with the
  law's number, article and the date of the version you read ("13 Kasım 2026'da mevzuat.gov.tr'deki metin"). Laws
  change: state that the reader must check the current text. Article numbers must be right.
- Court decisions: only real, citable decisions you opened (AYM bireysel başvuru, AİHM via hudoc.echr.coe.int, landmark
  foreign cases from official or Wikipedia pages), with court, date, number; otherwise use clearly invented cases
  ("Olay: A ile B…") labelled "kurgusal olay".
- Political neutrality is strict: constitutional history, amendments, emergency rule, closures of parties etc. are
  reported factually with dates and sources, never judged; where scholars disagree, present the positions.
- Comparative law: civil law vs common law, other systems described accurately without ranking.
- Exercises: invented fact patterns (olay) where the reader applies a rule step by step (e.g. kast/taksir, haksız fiil
  unsurları, sözleşmenin kurulması: icap ve kabul), graded on the reasoning steps the page defines; say clearly that
  real cases depend on details and courts' interpretation.

### Genetics pages (populasyon-genetigi, biyoinformatik-ve-dizi-hizalama, gen-muhendisligi)
- Real sequences only from public databases you opened (NCBI GenBank/RefSeq, UniProt, Ensembl) with accession numbers,
  or clearly synthetic sequences. Algorithms (Needleman–Wunsch, Smith–Waterman, BLOSUM62 values, neighbour joining)
  implemented in the page and checked against independent computation.
- Gene editing and human genetics: accurate science, ethics presented as debate with dates (Asilomar 1975, He Jiankui
  2018 and the response, international summit statements); no protocols that enable misuse (no step-by-step wet-lab
  procedures for pathogens or human germline editing); conceptual level only for lab methods.
- Human population genetics: no ranking of groups, no genetic determinism claims; note the limits of "race" as a
  biological category per current scientific consensus with sources.

## U5 ek kuralları — mühendislik, mimarlık, finans ve psikoloji

- Birimleri girişte ve sonuçta göster. Öğretim değerlerini gerçek malzeme, ölçüm,
  saha etüdü veya yönetmelik verisi gibi sunma. Mühendislikte sınır koşullarını
  ve hangi süreçlerin model dışında kaldığını belirt. Taşıma gücü ile oturmayı,
  kontrol limitleri ile şartname sınırlarını ayrı hesap ve yorumlarla göster.
- Finans modellerinde dönem, oran, nakit akışı işareti ve ödeme zamanını açıkla.
  Örnekleri kurgusal tut. Getiri tahmini, güncel piyasa verisi veya kişisel
  yatırım tavsiyesi verme.
- Kent planlamada ölçütü, ölçeği, varsayımları ve seçeneğin kimin erişimini nasıl
  değiştirdiğini belirt. Kurgusal ağı ve nüfusu açıkça etiketle.
- Psikolojide yapay sonuçları etiketle. Kuram, gözlem ve nedensel kanıtın
  ağırlığını ayrı tartış. Etkinlikler kişilik puanı, tanı veya klinik yönlendirme
  üretmez. Girilen yanıtı saklama veya gönderme.
