# Keşif Defteri — İçerik Rehberi

Bu belge, her konu sayfasının altına eklenen **Keşif Defteri** bölümünün
yazım standardını ve veri şemasını tanımlar. Yeni bir defter yazarken ya da
var olanı düzeltirken bu rehbere ve örnek dosyaya (`shared/digest/sarkac.js`)
uy. Doğrulama: `node scripts/check-site.mjs`.

## Kime yazıyoruz?

Lise hazırlık dönemindeki meraklı bir öğrenciye ve onunla birlikte öğrenen
yetişkine. Okur zeki ama henüz ders terimlerini bilmiyor olabilir. Önce
merak, sonra kavram, sonra derinlik. Hiçbir yerde "kolay" diye
küçümseme, hiçbir yerde jargonla korkutma.

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
  level: "Lise",                           // Lise hazırlık | Lise | Lise ileri | Lise–Lisans
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

- https://openstax.org/ · https://ocw.mit.edu/ · https://phet.colorado.edu/
- https://tr.wikipedia.org/wiki/ · https://en.wikipedia.org/wiki/
- https://tr.khanacademy.org/ · https://www.khanacademy.org/
- http://hyperphysics.phy-astr.gsu.edu/ · https://www.feynmanlectures.caltech.edu/
- https://mathworld.wolfram.com/ · https://www.3blue1brown.com/
- https://goldbook.iupac.org/ · https://webbook.nist.gov/ · https://www.nist.gov/ · https://physics.nist.gov/ · https://www.bipm.org/
- https://www.ncbi.nlm.nih.gov/ · https://www.biointeractive.org/
- https://science.nasa.gov/ · https://www.nasa.gov/ · https://www.esa.int/ · https://www.jpl.nasa.gov/
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
