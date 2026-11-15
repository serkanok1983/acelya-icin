# Öğrenme Yolları, Önşart ve yeni gruplandırma — proje planı (13 Kasım 2026)

**15 Kasım 2026 kapanışı.** U1–U10 ve genel değerlendirmeden sonraki düzeltme turları tamamlandı.
Katalogda 326 kayıt, 11 meslek yolu, üç seçmeli yol ve sekiz önşart dizisi var. Yol ve önşart dizilerindeki
tüm basamaklar açılabiliyor. Son doğrulanan uygulama commit'i `de1b44a`, Pages yayını `a1944c9` ve service
worker sürümü `acelya-b5c62b91e5`. [Canlı site](https://serkanok1983.github.io/acelya-icin/)

Kullanıcının isteği (13 Kasım): "Önce işi planla, yapıyı kur, sonra optimum sıra ile icra et." Hedef meslekler
(bilgisayar, elektrik-elektronik, genetik, endüstri mühendisi, hekim, mimar, hukukçu vb.) için öğrenme yolları;
temel uygulamalı matematik, teorik matematik, temel fizik, kimya, dilbilgisi vb. için önşart dizileri; işin sonunda
dengeli bir menü (bir grupta 100, ötekinde 3 ders olmasın; "256 sayfa 8 grup gibi").

Değişmeyen ilke: ana liste "geniş liste, dilediğini seç, hemen oku" olarak kalır. Yollar ve önşart isteğe bağlı
rehberdir; hiçbir sayfa bir yola kilitlenmez.

## 1. Menü: on dengeli grup

Menü grupları disiplin (defterdeki `field`) ile aynı şey değildir: `field` ince etiket olarak kalır, menü onu kaba
gruplara toplar. Büyük gruplar içinde ara başlıklar (alt bölümler) vardır; arama yapılınca ara başlıklar gizlenir.

| Grup | Başlangıç (231) | İlk planın hedefi (264) | Kapanış (326) | İlk plandaki ara başlıklar |
|---|---|---|---|---|
| Matematik | 45 | 52 | 53 | Sayılar ve Temeller · Cebir ve Geometri · Analiz · Olasılık ve İstatistik · Ayrık Matematik ve Yapılar · Fraktallar ve Kaos |
| Fizik | 48 | 48 | 48 | Mekanik · Akışkanlar ve Isı · Dalgalar, Ses ve Işık · Elektrik ve Manyetizma · Modern Fizik |
| Yer ve Uzay | 11 | 11 | 11 | — |
| Kimya | 15 | 16 | 16 | — |
| Yaşam ve Sağlık | 15 | 23 | 23 | Hücre ve Kalıtım · Beden ve Sağlık · Ekoloji ve Evrim |
| Bilgisayar Bilimi | 26 | 27 | 27 | Donanım ve Alt Düzey · Algoritmalar ve Veri · Kuram · Sistemler ve Ağlar · Yazılım · Yapay Zekâ ve Güvenlik |
| Mühendislik | 22 | 26 | 26 | Yapı ve Malzeme · Makine ve Taşıt · Elektrik ve Kontrol · Endüstri ve Süreç |
| İnsan ve Toplum | 18 | 26 | 53 | Zihin ve Davranış · Tarih ve Toplum · Ekonomi ve Siyaset · Hukuk |
| Dil, Felsefe ve Sanat | 18 | 22 | 56 | Dil ve Edebiyat · Felsefe ve Din · Sanat ve Sinema · Mimarlık ve Kent |
| Oyunlar | 13 | 13 | 13 | — |

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

İlk plandaki 33 ders U2–U5'te tamamlandı. Bunların 12'si önşart, 21'i yol dersiydi. Finans Matematiği iki yolda ortak.

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
- U4 ✔ 14 Kasım: hukuka-giris, anayasa-hukuku-ve-temel-haklar, ceza-hukukunun-genel-ilkeleri,
  borclar-ve-sozlesme-hukuku, hukuk-felsefesi, populasyon-genetigi, biyoinformatik-ve-dizi-hizalama, gen-muhendisligi.
  Menüde "İnsan ve Toplum" > "Hukuk" ara başlığı. 9 ders hazırlanıyor (U5). Devir notu: `docs/DEVIR-NOTU.md`.
- **U5, 15 Kasım:** ısı transferi, zemin mekaniği, kuyruk kuramı ve benzetim, kalite kontrol, finans matematiği, yapı fiziği,
  kent planlama, gelişim psikolojisi ve sosyal psikoloji eklendi. Öğrenme yollarındaki dokuz boşluk kapandı. Menü 264
  derse ulaştı. Perspektif, mimarlık tarihi, yapı fiziği ve kent planlama “Mimarlık ve Kent” ara başlığında toplandı.
  Masaüstü ana sayfasında başlık ile ders listesi aynı belge içinde kayar.
- **U6, 15 Kasım** · Psikoloji ve psikanaliz için 11 ders eklendi. Menü 275 derse ulaştı ve
  “Psikoloji Kuramları” ile “Psikanaliz ve Psikoterapi” ara başlıkları açıldı. Psikolog yolunda 11 yeni ders,
  Hekim yolunda bilişsel psikoloji, motivasyon ve psikoterapi araştırmaları yer alıyor. Aynı turda ana sayfa
  araması ve iki temadaki bildirilen kontrast sorunları düzeltildi.

## 5. Düşünce tarihi: kuramcılar ve ekoller (kullanıcı isteği, 13 Kasım 2026)

Kullanıcı: "Freud, Adler, Jung, Lacan vb. tüm major fikirler olsun. Felsefe tarafını da böyle isterim (Kant, Hegel,
Fichte, Nietzsche, Schopenhauer, Kierkegaard, Spinoza vb.). Sosyal bilimde de Locke, Haldun, Weber, Habermas, Marx, Smith,
Keynes vb. Özetle haberdar olmamız gereken klasik/modern herkes olsun."

Biçim önerisi: kişi başına değil, ekol/dönem başına bir sayfa (bir düşünür birden çok sayfada geçebilir). Her sayfada:
her düşünürün temel soruları, ana kavramları, başlıca eserleri (tarihli), etkilediği/etkilendiği kişiler, en güçlü
eleştiriler ve yanıtlar (SEP/IEP); etkileşim: kavram haritası, argüman haritası, zaman çizelgesi, "kim söyledi?",
kamu malı metinlerden yakın okuma (yazar 1956'dan önce ölmüşse kısa alıntı; değilse yalnız açımlama). Yansızlık:
hiçbir okul kazanan ilan edilmez. Ayrıca aranabilir bir **Düşünürler Dizini** sayfası: her düşünür → hangi sayfalarda.

### U6 · Psikoloji ve psikanaliz (11 ders, tamamlandı)
Psikoloji ekolleri ve tarihi (Wundt, James, Gestalt) · Freud ve klasik psikanaliz · psikanalizden ayrılanlar
(Adler, Jung, Rank, Reich) · ego psikolojisi ve nesne ilişkileri (Anna Freud, Klein, Winnicott, Bowlby, Erikson,
Kohut) · Lacan ve yapısalcı psikanaliz; Fromm, Horney · davranışçılık ve öğrenme kuramları (Pavlov, Watson,
Thorndike, Skinner, Bandura) · hümanistik ve varoluşçu psikoloji (Maslow, Rogers, Frankl, May) · bilişsel psikoloji
ve bilişsel terapi (Piaget ve Vygotsky gelişim sayfasıyla bağlı; Beck, Ellis) · kişilik kuramları · psikopatoloji
modelleri ve psikoterapi ekolleri · motivasyon ve duygu kuramları.

### U7 · Felsefe tarihi (14 ders, tamamlandı)
Sokrates öncesi · Platon · Aristoteles · Helenistik felsefe (Stoa, Epikür, şüphecilik) · Orta Çağ ve İslam felsefesi
(Augustinus, Farabi, İbn Sina, Gazali, İbn Rüşd, Aquinas) · Rasyonalistler (Descartes, Spinoza, Leibniz) · Empiristler
(Locke, Berkeley, Hume) · Kant · Alman idealizmi (Fichte, Schelling, Hegel) · 19. yüzyıl (Schopenhauer, Kierkegaard,
Nietzsche, Mill) · fenomenoloji ve varoluşçuluk (Husserl, Heidegger, Sartre, Beauvoir, Camus) · analitik felsefe
(Frege, Russell, Wittgenstein, Viyana Çevresi, Quine) · pragmatizm · yapısalcılık ve sonrası (Saussure, Lévi-Strauss,
Foucault, Derrida, Deleuze).

Dersler dönemlere göre “Dil, Felsefe ve Sanat” grubunda toplandı. Düşünürler Dizini bu derslerde ele alınan 56
düşünürü ad, kavram ve dönem filtresiyle bulur. Kartlardan dersin ilgili savına gidilir.

### U8 · Sosyal bilimler ve siyaset kuramı (10 ders, tamamlandı)
Toplum sözleşmesi ve siyaset felsefesi (Machiavelli, Hobbes, Locke, Rousseau, Montesquieu) · İbn Haldun ve tarih
felsefesi (Vico, Hegel, Spengler, Toynbee) · klasik iktisat (Smith, Ricardo, Malthus, Mill) · Marx ve Marksist gelenek
· sosyolojinin kurucuları (Comte, Durkheim, Weber, Simmel, Tönnies) · neoklasik iktisat, Keynes ve karşıtları (Marshall,
Keynes, Hayek, Friedman, Avusturya okulu, kurumsal iktisat) · Frankfurt Okulu ve Habermas · 20. yüzyıl sosyal kuramı
(Parsons, Merton, Goffman, Bourdieu, Giddens, Luhmann) · antropoloji kuramları (Malinowski, Boas, Lévi-Strauss, Geertz)
· modern siyaset kuramı (Arendt, Schmitt, Berlin, Rawls, Nozick, Taylor, MacIntyre, feminist kuram).

Yeni dersler “İnsan ve Toplum” grubundaki “Siyaset Kuramı”, “İktisat Düşüncesi” ve “Sosyal Kuram ve
Antropoloji” ara başlıklarında. Düşünürler Dizini 104 kişiyi 24 derse bağlar. Locke, Hegel, Mill ve Lévi-Strauss
her biri tek kartta iki dersle yer alır. Menü 300 kayıt içerir.

## 6. Okuma ve izleme yetkinliği: edebiyat ve sinema ekolleri (kullanıcı isteği, 13 Kasım 2026)

Kullanıcı: "300 ders de olur 500 ders de, bunu STEM diye sınırlandırmayalım. Okuyan okuyucu bir film izlediğinde, bir
roman okuduğunda her detayı, her katmanı, her değişimi okuyabilmeli, farkındalığı artmalı, analiz yeteneği güçlenmeli.
Bu bağlamda psikoloji ile beraber edebiyat ve sinema ekolleri de güçlendirilebilir. Anlatım, kurgu, karakter psikolojisi vb."

Amaç: okura bir eseri katman katman okuma araçları vermek. Her sayfa çözümleme yaptırır: kamu malı metin ve filmlerde
(yazar/yönetmen 1956'dan önce ölmüş, ABD için 1930 ve öncesi yayım) okur katmanları kendisi işaretler; telifli
çağdaş eserler yalnız kendi sözlerimizle, görüntü ve uzun alıntı olmadan anılır. Psikoloji sayfalarıyla (U6) bağlanır:
karakterin savunma mekanizmaları, arketipler, motivasyon, bağlanma örüntüleri kurgu karakterlerinde okunur.

### U9 · Edebiyat kuramı ve çözümleme (10 ders, tamamlandı)
Edebiyat akımları (klasisizm, romantizm, realizm, natüralizm, sembolizm, modernizm, postmodernizm; Türk edebiyatında
Divan, Tanzimat, Servet-i Fünun, Millî Edebiyat, Garip, İkinci Yeni) · eleştiri kuramları I (Rus biçimciliği, Yeni
Eleştiri, yapısalcılık ve göstergebilim: Saussure, Barthes) · eleştiri kuramları II (okur tepkisi/alımlama: Iser, Jauss;
psikanalitik, Marksist, feminist, postkolonyal: Said; yapısöküm) · karakter ve karakter psikolojisi (düz/yuvarlak,
karakter arkı, motivasyon, iç çatışma, arketipler ve kahramanın yolculuğu tartışmalı bir model olarak, güvenilmez
anlatıcı) · anlatım teknikleri (bakış açısı, iç monolog, bilinç akışı, serbest dolaylı anlatım, zaman kurgusu —
mevcut Anlatı Yapısı sayfasına bağlanır) · imge, sembol, alegori, ironi ve söz sanatları (retorik) · dram ve tiyatro
(Aristoteles'ten Shakespeare, Ibsen, Çehov, Brecht'in epik tiyatrosu, absürt tiyatro) · türlerin poetikası (trajedi,
komedi, roman, öykü, polisiye, bilimkurgu, fantastik: Todorov) · şiir çözümleme (imge, ses, ölçü; aruz sayfasına bağlı)
· metinlerarasılık ve uyarlama (romandan filme).

U9 ile birlikte psikoloji kapsamı 5 dersle genişletildi. Gestalt ve algı, evrimsel psikoloji ve karşılaştırmalı
yöntem, kültürel ve eleştirel psikoloji, ilişkisel psikanaliz ve zihinselleştirme, sistemik psikoloji ve aile
yaklaşımları Psikolog öğrenme yoluna eklendi. Psikoloji Ekolleri Dizini 72 düşünür ve araştırmacıyı önceki ve
yeni derslerle ilişkilendirir.

### U10 · Sinema kuramı, akımları ve film çözümleme (9 ders, tamamlandı)
Sinema akımları (Sovyet montajı, Alman dışavurumculuğu, klasik Hollywood, İtalyan yeni gerçekçiliği, Fransız Yeni Dalgası,
Japon sineması, Yeşilçam ve Türk sineması, Dogme, çağdaş) · film kuramları (biçimci: Eisenstein, Arnheim; gerçekçi:
Bazin, Kracauer; auteur kuramı; göstergebilim: Metz; psikanalitik ve feminist: Mulvey; bilişsel: Bordwell) · senaryo ve
dramaturji (üç perde ve alternatifleri, çatışma, karakter arkı, alt metin) · mizansen (kadraj, ışık, renk, set,
kostüm) · kurgu ve zaman (mevcut Sinema Dili ve Kurgu sayfasının devamı: anlatı kurgusu, paralel kurgu, elips,
geri dönüş) · ses ve film müziği (diegetik/diegetik olmayan, leitmotif) · oyunculuk yöntemleri (Stanislavski, Method,
Brecht) · belgesel ve deneysel sinema · film çözümleme atölyesi (kamu malı filmler üzerinde sahne sahne okuma).

Yeni sayfalar ve Sinema Dili ve Kurgu, “Dil, Felsefe ve Sanat” grubundaki “Sinema” alt başlığında.
Film Çözümleme Atölyesi, 1903 tarihli The Great Train Robbery ile 1910 tarihli Frankenstein’ın kamu malı
ve ses izi bulunmayan arşiv kopyalarında 17 bölümü zaman damgası, gözlem ve soruyla açar.

## 7. U10 sonrası genel değerlendirme ve kapanış

Genel değerlendirme önce içerik derinliğini, ders kalitesini ve öğrenme yolu boşluklarını ele aldı.
Ardından ana sayfa, yol sayfaları ve ders içi gezinme incelendi. Bulgular yedi turda ele alındı.

| Tamamlanan tur | Commit | Uygulanan değişiklik |
|---|---|---|
| İlk düzeltmeler | `5050188` | Spirometri ve film kare hızı açıklamaları düzeltildi. Dersten geri dönüldüğünde arama sorgusu, kategori ve kaydırma korunuyor. Keşif Defteri bağlantısı klavye odağını defter başlığına taşıyor. |
| Seçmeli yollar ve ortak istatistik | `9f10f06` | Üç seçmeli yol mevcut derslerden kuruldu. Veri ve Örnekleme, Olasılık ve İstatistik dizisinin ilk basamağı oldu. |
| UI/UX | `b046d39` | Telefonda kategori seçicisi, boş sonuçta “Tüm kategorilerde ara” ve yol kartlarında görünür “Sıradaki ders” eklendi. |
| Ders içi gezinme ve performans | `8287545` | Atölye, Keşif Defteri ve Sıradaki ders bağlantıları ortak konumdan açılıyor. PWA, kabuğu kurulumda ve ders kaynaklarını ziyaret sırasında önbelleğe alıyor. |
| Ders kalitesi | `d9a147b` | Mini sınavlarda doğru cevap konumları çeşitlendirildi. Edebiyat, sinema ve psikolojide 18 deftere yeni örnekler üzerinden gerekçeli sorular eklendi. |
| Kaynak denetimi | `f03d8ef` | 212 OpenStax adresi denetlendi. Üç bağlantı ilgili bölüme taşındı, bir bölüm etiketi düzeltildi. Yalnız Wikipedia'ya dayanan 30 deftere 31 birincil kaynak eklendi. |
| Son doğrulama | `de1b44a` | Yol, önşart ve Keşif Defteri tamamlanma işaretleri aynı kayda bağlandı. Eski işaretler birleştiriliyor ve dersten dönüldüğünde yolun sıradaki basamağı güncelleniyor. |

### Seçmeli yolların kapsamı

Seçmeli yollar, bir konuyu baştan öğrenmek isteyenler için pedagojik bir sıra sunar. Her ders ana katalogdan
ve aramadan doğrudan açılabilir. Yol seçimi, önşartlar ve tamamlanma durumu erişimi kısıtlamaz. Kullanıcı
ister sırayı izler, ister bir konuyu merakından açıp okur. Yol ve kart metinleri kullanıcının öğrenci
olduğunu veya belirli bir düzeyde başladığını varsaymaksızın gereken önbilgiyi açıklar.

- Edebiyat ve Çözümleme, Sinema ve Film Çözümleme, Düşünce Tarihi ve Sosyal Kuram yolları mevcut dersleri sıralar.
  Yoldan açılan derste önceki ve sıradaki basamaklara geçilebilir.
- İktisatçı yolunda klasik iktisat, Marx ve neoklasik iktisat ile Keynes dersleri bir düşünce seçkisi oluşturur.
- Veri ve Örnekleme, Olasılık ve İstatistik dizisinin ilk dersi. Psikolog, Hekim ve İktisatçı yollarının
  yöntem bölümleri aynı derse bağlanır.

### Son doğrulama ve yayın

- Statik denetim 331 sayfa ve 326 Keşif Defteri için 0 hata verdi. Katalog ve service worker üretim
  kontrolleri, yol ve katalog denetimindeki 1483 kontrol, Keşif Defteri sınavları ve çevrimdışı PWA testi geçti.
- Tam site tarayıcı testi 331 sayfada JavaScript veya konsol hatası, başarısız yerel istek ya da görünmeyen
  Keşif Defteri bulmadı.
- Canlıda 360 px dokunmatik Chromium emülasyonunda ve 1280 px masaüstünde arama ve dersten dönüş,
  defter başlığına odaklanma, sınav geri bildirimi ve sinema yolundaki tamamlanma akışı geçti.
  Dört değişen yayın dosyası uygulama commit'iyle eşleşti. [Canlı site](https://serkanok1983.github.io/acelya-icin/) ·
  [Sinema ve Film Çözümleme yolu](https://serkanok1983.github.io/acelya-icin/ogrenme-yollari.html#sinema-cozumleme)

### Açık bakım notları

Statik denetimdeki 158 uyarının 156'sı OpenStax bölüm doğrulama hatırlatması. İki içerik uyarısı
Anatomi ve Fizyoloji Defteri'ndeki uzun çözüm adımı ve Aruz ve Hece Ölçüsü Defteri'ndeki altı kaynakla ilgili.
Fiziksel telefon ve tablet ile ekran okuyucu denetimi ayrı doğrulama kapsamı olarak açık.
Komutlar ve bakım ayrıntıları devir notunda. [Devir Notu](DEVIR-NOTU.md#7-açık-bakım-notları)
