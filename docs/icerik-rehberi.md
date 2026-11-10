# Keşif Defteri — İçerik Rehberi

Bu belge, her konu sayfasının altına eklenen **Keşif Defteri** bölümünün
yazım standardını ve veri şemasını tanımlar. Yeni bir defter yazarken ya da
var olanı düzeltirken bu rehbere ve örnek dosyaya (`shared/digest/sarkac.js`)
uy. Doğrulama: `node scripts/check-site.mjs`.

## Kime yazıyoruz?

Hedef, Türkçe ve **üniversite düzeyinde bir temel bilimler (STEM)
ansiklopedisi**. Okur yelpazesi meraklı bir lise öğrencisinden lisansın ilk
iki yılındaki öğrenciye ve onlarla birlikte öğrenen yetişkine uzanır. Defter
bu yüzden katman katman yükselir: kanca, büyük fikir ve hikâye herkese
açıktır; kavram kartları lise sezgisinden başlayıp lisans düzeyine
(kalkülüs ve vektör dili, türetme, modelin varsayımları) tırmanır; çözümlü
örnek ve köprü lisans birinci sınıf düzeyindedir. Hiçbir yerde "kolay" diye
küçümseme, hiçbir yerde açıklanmamış jargonla korkutma.

## Üniversite düzeyi (temel bilim sayfaları)

Fizik, kimya, biyoloji, matematik ve yer-uzay sayfalarında defterin tavanı
lisans ilk yıl ders kitaplarıdır (ör. OpenStax University Physics,
Calculus, Chemistry 2e). Somut beklentiler:

- **Kavramlar:** son bir-iki kart lisans düzeyinde olsun: denklemin
  türetilişi ya da taslağı (ör. F = q(E + v×B)'den r = mv/(qB)), diferansiyel
  denklem biçimi, geçerlilik koşulları ve modelin nerede bozulduğu.
- **Laboratuvar:** deneyler ölçme ile kuramı karşılaştırsın: sayfanın
  ölçtüğü değer, formülün verdiği değer ve aradaki farkın nedeni.
- **Çözümlü örnek:** birimli, sayısal, lisans ilk yıl sınavında
  sorulabilecek nitelikte bir problem.
- **Köprü:** gerçek ders adları (Fizik II, Modern Fizik, Elektromanyetik
  Teori, Termodinamik, Diferansiyel Denklemler…) ve sonraki kavramlar.
- **Sınav:** üç sorudan en az biri ezber değil akıl yürütme istesin
  (ölçekleme, sınır durumu, birim analizi).
- **Düzey etiketi:** lisans araçlarını kullanan defterler için
  `Lise–Lisans`, doğrudan lisans konusu olanlar için `Lisans`.

## Ses ve üslup

- **İştah açsın.** İlk cümle bir soru, bir sahne ya da şaşırtıcı bir olgu
  olsun; tanımla başlama.
- **Somut ol.** Sayı, tarih, isim, ölçek ver: "çok hızlı" değil, "saatte
  11 derece".
- **Dürüst ol.** Model sınırlarını, yaklaşımları ve "neden böyle" sorusunun
  cevabı bilinmeyen yerleri açıkça söyle. Efsane ile kanıtı ayır ("anlatılır",
  "kayıtlara göre").
- **Sayfaya bağla.** Laboratuvar görevleri, sayfadaki gerçek kontrolleri
  adıyla kullanmalı (kaydırıcı, düğme, menü). Sayfada kontrol azsa ne
  gözlenebileceğini dürüstçe yaz; uydurma kontrol icat etme.
- **Türkçe, temiz, sıcak.** Kısa cümleler, etken çatı, gereksiz yabancı
  terim yok. Terimi ilk geçtiği yerde kalın yap ve bir cümlede açıkla.
  "Şimdi ... öğreneceğiz" gibi ders kitabı kalıpları yok. Emoji yok.
  Ünlem nadiren.
- **Doğruluk kaliteden önce gelir.** Emin olmadığın sayıyı yazma; ya
  hesapla ya da genel ifade kullan. Kaynak uydurma.

## Şema

Dosya: `shared/digest/<slug>.js` (slug = sayfa dosya adı, `.html` olmadan).

```js
window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["<slug>"] = {
  slug: "<slug>",
  title: "Başlık: Alt başlık",            // 3–8 kelime, sayfa başlığından daha iyi olabilir
  field: "Fizik",                          // Matematik | Fizik | Kimya | Biyoloji | Bilgisayar Bilimi | Yer ve Uzay | Mühendislik | Toplum ve Ekonomi | Oyun
  level: "Lise",                           // Lise hazırlık | Lise | Lise ileri | Lise–Lisans | Lisans
  minutes: 25,                             // okuma + deney süresi
  tagline: "…",                            // 1–2 cümle, ≤ 220 karakter; meta description olarak da kullanılır
  hook: "…",                               // 1–3 cümle; soru, sahne ya da şaşırtıcı olgu
  bigIdea: "…",                            // tek cümle; aklında tek bir şey kalacaksa bu
  story: ["…", "…", "…"],                  // 2–4 paragraf; tarih, insan, neden önemli
  core: [                                  // 3–5 kavram, katman katman
    { heading: "…", body: "…", formula: "T = 2π√(L/g)", formulaNote: "…" },
  ],
  lab: {
    intro: "…",                            // sayfadaki kontrollerin kısa tarifi
    experiments: [                         // 3–4 deney, sayfanın GERÇEK kontrolleriyle
      { title: "…", predict: "…", do: "…", observe: "…", explain: "…" },
    ],
  },
  wow: [{ title: "…", body: "…" }],        // tam 3; aklında kalacak, doğrulanabilir olgular
  worked: { title: "…", prompt: "…", steps: ["…"], result: "…" },  // çözümlü örnek, 3–5 adım
  misconceptions: [{ myth: "…", truth: "…" }],   // 2–4
  glossary: [{ term: "…", definition: "…" }],    // 5–8
  bridge: { heading: "Üniversiteye köprü", body: ["…", "…"], topics: ["…"] },
  quiz: [{ question: "…", options: ["…", "…", "…", "…"], answer: 2, explanation: "…" }],  // tam 3
  next: [{ href: "slug.html", title: "…", why: "…" }],   // 2–4; dosya var olmalı
  sources: [{ title: "…", url: "https://…", note: "…" }], // 2–4; izinli alan adlarından
  revision: "Ekim 2026",
};
```

### Alanlarda HTML

Şu etiketler kullanılabilir: `strong, em, sup, sub, code, kbd, br, span,
small, ul, ol, li, a, mark`. Başka her şey düz metne çevrilir. Matematik
için Unicode ve `<sup>/<sub>` kullan (√, π, θ, ², ₀ …); MathJax yok.
Üst çizgi (ortalama x̄, tümleyen Ā) için birleşik U+0304 ya da tek parça
Ā kullanma: defter yazı tiplerinde çizgi harfin yanına kayıyor. Bunun
yerine `<span class=ov>x</span>` yaz (öznitelik tırnaksız, çünkü alanlar
çift tırnaklı JS dizeleridir). Aynısı şapka (kestirim r̂, fazör V̂) ve
vektör oku (p⃗) için de geçerli: `<span class=hat>r</span>`,
`<span class=vec>p</span>`. Üst nokta (Q̇) için düz harf yaz, anlamını
sözle açıkla. check-site birleşik işaretleri hata sayar; üç sınıf
`shared/theme.css`'te tanımlı, sayfa etiketlerinde de kullanılır.

### Oyun sayfaları

Oyunlar için de defter yazılır; `field: "Oyun"`. Hikâye oyunun kökenini,
kavramlar oyunun arkasındaki matematiği/fiziği/algoritmayı anlatır
(ör. Tetris'te olasılık ve geometri, 2048'de üstel büyüme, Pong'da yansıma).
Laboratuvar bölümü oyundaki stratejik deneylerdir.

## Kaynak kuralları

Yalnızca aşağıdaki alan adlarıyla başlayan bağlantılar kabul edilir
(`scripts/check-site.mjs` denetler). Derin sayfa bağlantısı (ör. OpenStax
bölüm sayfası) yalnızca bölüm numarası ve başlığından eminsen kullanılır;
emin değilsen kitabın ana sayfasını ver.

- https://openstax.org/ · https://ocw.mit.edu/ · https://tubes.mit.edu/ · https://phet.colorado.edu/
- https://math.bu.edu/ · https://dummit.cos.northeastern.edu/ (üniversite ders notları)
- https://engineeringstatics.org/ · https://engcourses-uofa.ca/ (açık statik ders kitabı ve University of Alberta mühendislik dersleri)
- https://www.numdam.org/ (özgün matematik yayınlarının arşivi)
- https://pi.math.cornell.edu/ · https://mathshistory.st-andrews.ac.uk/ (ders notları ve matematik tarihi)
- https://tilings.math.uni-bielefeld.de/ · https://www.math.utah.edu/ · https://www.cs.toronto.edu/ (döşemeler, ders notları ve akademik çalışmalar)
- https://www.mathworks.com/ · https://maths-people.anu.edu.au/ (Moler'in sayısal hesap kitabı ve özgün IFS araştırmaları)
- https://webhomes.maths.ed.ac.uk/ · https://www.mit.edu/ (özgün matematik makaleleri ve üniversite ders notları)
- https://people.ucsc.edu/ · https://underactuated.mit.edu/ · https://courses.seas.harvard.edu/ (özgün dinamik sistem makaleleri ve üniversite ders notları)
- https://math.hmc.edu/ · https://web.williams.edu/ · https://research.monash.edu/ (özgün kombinatorik makaleleri ve üniversite araştırma yayınları)
- https://theory.stanford.edu/ (ispat, tümevarım ve ayrık matematik ders notları)
- https://www.computerhistory.org/ (Computer History Museum, hesap makineleri ve bilgisayar tarihi)
- https://www.cryptomuseum.com/ · https://www.codesandciphers.org.uk/ · https://blog.sciencemuseum.org.uk/ (özgün şifreleme aygıtları, teknik incelemeler ve müze araştırmaları)
- https://www.cs.cornell.edu/ · https://courses.cs.cornell.edu/ (bilgisayar bilimi ders notları)
- https://xlinux.nist.gov/dads/ · https://inst.eecs.berkeley.edu/~cs188/ (algoritma tanımları ve arama yöntemleri)
- https://en.bilgem.tubitak.gov.tr/ (TÜBİTAK BİLGEM kriptoloji etkinlikleri)
- https://alvyray.com/ (Alvy Ray Smith'in özgün renk dönüşümü makaleleri)
- https://newt.phys.unsw.edu.au/ (UNSW müzik akustiği araştırmaları ve ders notları)
- https://penelope.uchicago.edu/ (University of Chicago antik metin arşivi)
- https://www.cs.yale.edu/ · https://www.cs.auckland.ac.nz/ (özgün algoritma makalelerinin üniversite arşivleri)
- https://moogfoundation.org/ (Bob Moog Foundation ve Moogseum özgün aygıt/sergi kayıtları)
- https://tr.wikipedia.org/wiki/ · https://en.wikipedia.org/wiki/
- https://tr.khanacademy.org/ · https://www.khanacademy.org/
- http://hyperphysics.phy-astr.gsu.edu/ · https://www.feynmanlectures.caltech.edu/
- https://mathworld.wolfram.com/ · https://www.3blue1brown.com/
- https://goldbook.iupac.org/ · https://webbook.nist.gov/ · https://www.nist.gov/ · https://physics.nist.gov/ · https://www.bipm.org/
- https://www.ncbi.nlm.nih.gov/ · https://pubmed.ncbi.nlm.nih.gov/ · https://www.biointeractive.org/
- https://science.nasa.gov/ · https://www.nasa.gov/ · https://www.esa.int/ · https://www.jpl.nasa.gov/ ·
  https://nssdc.gsfc.nasa.gov/ (NASA gezegen bilgi sayfaları)
- https://developer.mozilla.org/ · https://docs.python.org/ · https://www.w3.org/
- https://plato.stanford.edu/entries/ · https://www.nobelprize.org/ · https://arxiv.org/abs/
- https://acikders.tuba.gov.tr/ · https://bilimgenc.tubitak.gov.tr/ · https://www.tubitak.gov.tr/
- https://www.un.org/ · https://data.worldbank.org/ · https://data-explorer.oecd.org/ · https://www.tcmb.gov.tr/ · https://www.imf.org/

## Kalite ölçütü (editör kontrol listesi)

1. İlk üç cümle okuru yakalıyor mu? Tanımla başlıyorsa yeniden yaz.
2. Her kavram kartı tek bir fikir anlatıyor mu; formül varsa notu var mı?
3. Laboratuvar deneyleri sayfada gerçekten yapılabiliyor mu? Gözlenecek
   sayılar sayfanın verdiği değerlerle tutarlı mı?
4. "Vay" notları doğrulanabilir mi? Tarih ve sayı yanlışsa sil.
5. Çözümlü örnek baştan sona takip edilebiliyor mu, birimler yazılı mı?
6. Yanılgılar gerçek öğrenci yanılgıları mı, yoksa uydurma mı?
7. Sözlük tanımları tek cümle ve kesin mi?
8. Köprü, lise ile lisans arasındaki gerçek bağı anlatıyor mu?
9. Sınav soruları metinden cevaplanabiliyor mu; açıklamalar öğretiyor mu?
10. Sonraki duraklar var olan sayfalara mı gidiyor ve neden gidildiği yazılı mı?
