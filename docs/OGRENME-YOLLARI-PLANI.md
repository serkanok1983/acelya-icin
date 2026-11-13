# Öğrenme Yolları, Önşart ve yeni gruplandırma — proje planı (13 Kasım 2026)

Kullanıcının isteği (13 Kasım): "Önce işi planla, yapıyı kur, sonra optimum sıra ile icra et." Hedef meslekler
(bilgisayar, elektrik-elektronik, genetik, endüstri mühendisi, hekim, mimar, hukukçu vb.) için öğrenme yolları;
temel uygulamalı matematik, teorik matematik, temel fizik, kimya, dilbilgisi vb. için önşart dizileri; işin sonunda
dengeli bir menü (bir grupta 100, ötekinde 3 ders olmasın; "256 sayfa 8 grup gibi").

Değişmeyen ilke: ana liste "geniş liste, dilediğini seç, hemen oku" olarak kalır. Yollar ve önşart isteğe bağlı
rehberdir; hiçbir sayfa bir yola kilitlenmez.

## 1. Menü: on dengeli grup

Menü grupları disiplin (defterdeki `field`) ile aynı şey değildir: `field` ince etiket olarak kalır, menü onu kaba
gruplara toplar. Büyük gruplar içinde ara başlıklar (alt bölümler) vardır; arama yapılınca ara başlıklar gizlenir.

| Grup | Şimdi (231) | Planın sonunda (264) | Ara başlıklar |
|---|---|---|---|
| Matematik | 45 | 52 | Sayılar ve Temeller · Cebir ve Geometri · Analiz · Olasılık ve İstatistik · Ayrık Matematik ve Yapılar · Fraktallar ve Kaos |
| Fizik | 48 | 48 | Mekanik · Akışkanlar ve Isı · Dalgalar, Ses ve Işık · Elektrik ve Manyetizma · Modern Fizik |
| Yer ve Uzay | 11 | 11 | — |
| Kimya | 15 | 16 | — |
| Yaşam ve Sağlık | 15 | 23 | Hücre ve Kalıtım · Beden ve Sağlık · Ekoloji ve Evrim |
| Bilgisayar Bilimi | 26 | 27 | Donanım ve Alt Düzey · Algoritmalar ve Veri · Kuram · Sistemler ve Ağlar · Yazılım · Yapay Zekâ ve Güvenlik |
| Mühendislik | 22 | 26 | Yapı ve Malzeme · Makine ve Taşıt · Elektrik ve Kontrol · Endüstri ve Süreç |
| İnsan ve Toplum | 18 | 27 | Zihin ve Davranış · Tarih ve Toplum · Ekonomi, Hukuk ve Siyaset |
| Dil, Felsefe ve Sanat | 18 | 20 | Dil ve Edebiyat · Felsefe ve Din · Sanat ve Sinema |
| Oyunlar | 13 | 13 | — |

Bilim Atlası ve Üniversite STEM Omurgası kaldırılır; içerikleri kaybolmaz:
- Atlasın mekanik rotası (ölçme → vektörler → hareket → Newton → serbest düşme → iş-enerji → momentum → dairesel
  hareket → Kepler → yay-kütle) "Temel Fizik" önşartının ilk dizisi olur.
- Atlasın STEM rotası (lineer cebir, çok değişkenli kalkülüs, diferansiyel denklemler, Maxwell, entropi, Gibbs,
  gen ifadesi) ilgili önşartların ve yolların ileri basamaklarına dağılır; sayfaları kendi gruplarına girer.
- Atlasın "bilim dünyaları" soruları (Bir örüntüyü nasıl görünür kılarız? …) grupların tek cümlelik açılış sorusu olur.
- Atlasın "tamamlandı" işareti yol sayfalarında sürer (yalnız bu tarayıcıda, try/catch ile).
- Kaldırılanlar: `bilim-atlasi.html`, `shared/atlas.{css,js}`, kullanılmayan `shared/stem-bridge.{css,js}` ve
  `shared/stem-content.js`; bağlantılar (index, bilgi, 404, üç ders sayfası, bir G testi), sw, check-site, README.

## 2. Yeni iki sayfa

- `ogrenme-yollari.html`: hedef mesleğe göre sıralı dersler. Her yol üç basamak: Önşart (önşart dizilerine bağlantı)
  → Çekirdek → İleri ve seçmeli. Her basamakta neden bu sırada olduğunu anlatan tek cümle. Henüz yazılmamış dersler
  "hazırlanıyor" diye sönük gösterilir (yol dürüstçe eksiksiz görünür, boşluklar saklanmaz).
- `onsart.html`: sıfırdan başlayan temel diziler. Her dizi basamaklı; "Buradan başla" sorusu ile okur kendi
  düzeyini seçer.
- Veri tek yerde: `shared/yollar.js` (yollar, diziler, ders → gerekçe). Sayfalar bu veriden çizilir; test, her
  bağlantının var olan bir sayfaya gittiğini ve "hazırlanıyor" dersin dosyası yazıldığında listeden kalktığını denetler.
- Ana sayfada atlas kartının yerine iki kısa kart: "Öğrenme Yolları" ve "Önşart".

### Önşart dizileri

| Dizi | Var olan dersler | Yazılacak |
|---|---|---|
| Uygulamalı matematik (aritmetikten analize) | fonksiyon grafiği, Pisagor, birim çember, konik kesitler, vektörler, karmaşık sayılar, türev, Riemann, integral, Taylor | aritmetik ve sayılar · cebirin temelleri · üstel ve logaritma · geometrinin temelleri · limit ve süreklilik |
| Teorik matematik (teorem, ispat, akıl yürütme) | mantık ve argümantasyon, kombinatorik, asal ve RSA, çizge, grup teorisi | ispat yöntemleri · kümeler, bağıntılar ve fonksiyonlar |
| Olasılık ve istatistik | kombinatorik, Bayes, normal dağılım, rastgele yürüyüş, hipotez testi, regresyon | — |
| Temel fizik | atlasın mekanik rotası, sonra elektrik, dalgalar, ısı | — |
| Temel kimya | atom orbitalleri, periyodik tablo, molekül şekli, denklem denkleştirme, ideal gaz, asit-baz, kinetik | mol ve stokiyometri |
| Temel biyoloji | DNA eşlenmesi, mitoz-mayoz, genetik çaprazlama, enzimler, fotosentez-solunum, doğal seçilim | hücre biyolojisi |
| Dil ve yazı (dilbilgisi) | Türkçenin ses yapısı, sözdizimi, anlambilim, mantık | Türkçe dilbilgisinin temelleri · akademik yazma ve kaynak kullanımı |
| Programlama | algoritmalar, veri yapıları, mantık kapıları | programlamaya giriş |

### Öğrenme yolları (11) ve boşlukları

| Yol | Çekirdek (var olan) | Yazılacak |
|---|---|---|
| Bilgisayar Mühendisi | mantık kapıları → mimari → assembly/C → işaretçiler → veri yapıları → algoritmalar → karmaşıklık → işletim sistemi → ağ → veritabanı → paradigmalar → derleyici → otomata → hesaplama → yazılım müh. | — |
| Elektrik-Elektronik Mühendisi | elektrostatik → devreler → RLC → manyetizma → AC → karmaşık sayı → difer. denklem → Maxwell → EM dalga → yarı iletken → elektronik/elektrik müh. → Fourier → sinyal → kontrol | — |
| Makine Mühendisi | statik → mukavemet → dinamik → termodinamik → akışkanlar → hidrolik → malzeme → makine müh. → kontrol → mekatronik → CNC | ısı transferi |
| İnşaat Mühendisi | statik → mukavemet → çelik yapılar → depremler → akışkanlar/hidrolik → sayısal analiz | zemin mekaniği |
| Endüstri Mühendisi | olasılık → istatistik → regresyon → lineer cebir → optimizasyon → yöneylem → üretim planlama → oyun kuramı → işletme | kuyruk kuramı ve benzetim · kalite kontrol ve İSK · finans matematiği |
| Genetik ve Biyomühendis | DNA → mitoz-mayoz → çaprazlama → gen ifadesi → enzim → organik kimya → spektroskopi → doğal seçilim | popülasyon genetiği · biyoinformatik ve dizi hizalama · gen mühendisliği (PCR, CRISPR) |
| Hekim | anatomi → kalp-dolaşım → sinir hücresi → homeostaz → enzim → gen ifadesi → salgın modelleri → Bayes → hipotez testi → psikiyatri tarihi | bağışıklık ve mikrobiyoloji · farmakokinetik · epidemiyoloji ve klinik araştırma · tıbbi görüntüleme fiziği |
| Mimar | perspektif ve simetri → mimarlık tarihi → altın oran → statik → mukavemet → çelik → depremler → renk | yapı fiziği (ısı, ışık, ses) · kent planlama |
| Hukukçu | mantık → Roma hukuku → epistemoloji → düşünce deneyleri → anlambilim (yorum) → karar yanlılıkları → Bayes (kanıt) → oyun kuramı → uluslararası ilişkiler | hukuka giriş ve normlar hiyerarşisi · anayasa hukuku ve temel haklar · ceza hukukunun genel ilkeleri · borçlar ve sözleşme hukuku · hukuk felsefesi |
| İktisatçı | mikro → makro → oyun kuramı → regresyon → hipotez → optimizasyon → yöneylem → demografi → işletme | finans matematiği |
| Psikolog | algı → bellek → karar → bilinç → psikometri → psikiyatri tarihi → sinir hücresi → istatistik → bilim felsefesi | gelişim psikolojisi · sosyal psikoloji |

Toplam yazılacak: 33 ders (önşart 12, yollar 21; finans matematiği iki yolda ortak).

## 3. Turlar ve sıra

Sıra mantığı: önce yapı (yeni dersler doğru gruba ve yola düşsün), sonra herkesin ortak temeli (önşart), sonra en
boş yollar (hekim ve hukukçu: çekirdeklerinin yarısı eksik), en son tek tük eksikleri olan yollar.

| Tur | İçerik | Ders |
|---|---|---|
| U1 | Yapı: on grup ve ara başlıklar, atlas ve omurganın kaldırılması, `ogrenme-yollari.html`, `onsart.html`, `shared/yollar.js`, testler | 0 |
| U2 | Önşart matematik ve programlama: aritmetik ve sayılar · cebirin temelleri · üstel ve logaritma · geometrinin temelleri · limit ve süreklilik · ispat yöntemleri · kümeler, bağıntılar ve fonksiyonlar · programlamaya giriş | 8 |
| U3 | Önşart fen-dil ve hekim yolu: mol ve stokiyometri · hücre biyolojisi · Türkçe dilbilgisinin temelleri · akademik yazma ve kaynak kullanımı · bağışıklık ve mikrobiyoloji · farmakokinetik · epidemiyoloji ve klinik araştırma · tıbbi görüntüleme fiziği | 8 |
| U4 | Hukukçu ve genetik yolları: hukuka giriş · anayasa hukuku · ceza hukukunun genel ilkeleri · borçlar ve sözleşme hukuku · hukuk felsefesi · popülasyon genetiği · biyoinformatik · gen mühendisliği | 8 |
| U5 | Mühendislik, mimarlık, sosyal: ısı transferi · zemin mekaniği · kuyruk kuramı ve benzetim · kalite kontrol · finans matematiği · yapı fiziği · kent planlama · gelişim psikolojisi · sosyal psikoloji | 9 |

Her içerik turu üçlü hattan (kurucu → ayrı yazar → bağımsız doğrulayıcı) geçer; tam test, sonra yayın.
Hukuk ve tıp sayfalarına üçüncü halka özeni uygulanır: hukuki ya da tıbbi tavsiye yok, mevzuat yalnız resmî
kaynaktan (mevzuat.gov.tr, resmigazete.gov.tr), tarihli; tıpta tanı, doz ya da tedavi önerisi yok, yalnız yapay
hasta verisi.

## 4. Durum

- U1 ✔ 13 Kasım: on grup ve ara başlıklar, atlas ve omurga kaldırıldı, iki rehber sayfası ve `npm run test:yollar`.
  Ders başına gerekçe yerine basamak başına bir cümle yazıldı (ders adı ve katalog özeti zaten görünüyor).
- U2 ✔ 13 Kasım: aritmetik ve sayılar, cebirin temelleri, üstel fonksiyon ve logaritma, geometrinin temelleri, limit ve
  süreklilik, ispat yöntemleri, kümeler-bağıntılar-fonksiyonlar, programlamaya giriş. Ek kurallar: `.shots/briefs/_onsart.md`.
  Matematik 52, Bilgisayar 27 ders; 25 ders hazırlanıyor.
- U3 ✔ 13 Kasım: mol ve stokiyometri, hücre biyolojisi, Türkçe dil bilgisinin temelleri, akademik yazma ve kaynak
  kullanımı, bağışıklık ve mikrobiyoloji, farmakokinetik, epidemiyoloji ve klinik araştırma, tıbbi görüntüleme fiziği.
  Tıp sayfaları `.shots/briefs/_onsart.md` "U3 additions" kurallarıyla (tanı/doz/tedavi önerisi yok, yapay veri etiketli,
  "İlaç A", 112 notu). TDK yazımı: "dil bilgisi", "söz dizimi" sitenin her yerinde ayrı yazıldı. 17 ders hazırlanıyor.
- Sırada U4: hukuka giriş, anayasa hukuku ve temel haklar, ceza hukukunun genel ilkeleri, borçlar ve sözleşme hukuku,
  hukuk felsefesi, popülasyon genetiği, biyoinformatik ve dizi hizalama, gen mühendisliği.
