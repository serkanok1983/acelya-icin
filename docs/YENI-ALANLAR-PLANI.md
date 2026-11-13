# Yeni alanlar planı (12 Kasım 2026)

STEM planı (`docs/YENI-SAYFA-PLANI.md`) tamamlandı. Uzun vadeli vizyon: teorisi olan, okunmaya ve öğrenilmeye değer
her alan. Kullanıcı 12 Kasım'da üç halkalı öneriyi ve ilk grubu onayladı.

## İlke: bilgi biçimden önce gelir

Kullanıcının sözüyle: "Konu gerektirdiğinde biçimde dilediğin kadar özgür olabilirsin; anlatım şekline uydurmak için
teorinin kendisini eğip bükmeyelim, en iyi anlatım şekli ne ise ona uyalım. Esas amaç bilgiyi sunmak, alanı
tanıtmak, temeli en iyi şekilde vermek."

- Laboratuvar kalıbı (dört sekme, "ölçülen ile kuram") STEM'de doğaldı; yeni alanlarda zorunlu değildir. Konuya en
  uygun anlatım seçilir: harita, zaman çizelgesi, argüman ağacı, metin çözümleme, okurun kendi üzerinde deney, ses,
  karşılaştırmalı tablo, kaynak metinden okuma…
- Değişmeyenler: doğruluk ve kaynak (her olgu açılmış bir kaynaktan), akıcı Türkçe, yansızlık, erişilebilirlik ve
  mobil uyum (`npm run test:mobile`), Keşif Defteri ve üçlü hat (kurucu → ayrı yazar → bağımsız doğrulayıcı).
- Her sayfa okura bir şey yaptırır ya da sınatır; yalnız anlatmakla kalmaz. "Ölçülen–kuram" yerine "veri–iddia",
  "argüman–karşı argüman", "kural–istisna" gibi eşleşmeler kullanılabilir.

## Yeni menü kategorileri ve defter alanları

Dil ve Edebiyat · Zihin ve Davranış · Tarih ve Toplum · Felsefe ve Mantık · Sanat ve Müzik · İnsan Bedeni
(`scripts/check-site.mjs` FIELDS ve `docs/icerik-rehberi.md` güncellendi; izinli kaynaklara SEP, IEP, Britannica, TDK,
Nişanyan Sözlük, Our World in Data, ICS stratigrafi, Library of Congress, Project Gutenberg, müzeler eklendi.)

## Üç halka

1. **Laboratuvar biçimine doğrudan oturanlar:** müzik kuramı, dilbilim, etimoloji, algı psikolojisi, karar ve
   bilişsel yanlılıklar, anatomi ve fizyoloji, paleontoloji ve derin zaman, bilim tarihi.
2. **Farklı etkileşim isteyenler:** mantık ve felsefe, tarih (veri ve harita ağırlıklı), sosyoloji ve antropoloji
   (modeller), sanat (perspektif, simetri, desen), yapay zekânın felsefi yanı.
3. **Özen isteyenler (en son, ayrı kurallarla):** teoloji (karşılaştırmalı tarih ve düşünce okulları, hiçbir inancı
   doğrulamadan ya da çürütmeden), psikiyatri (tanı/tedavi tavsiyesi yok; tanı sistemlerinin tarihi ve istatistiği),
   bilinç (kuramlar çatışan okullar olarak), edebiyat ve sinema (yalnız kamu malı metinler; yapı çözümlemesi).

## 1. grup (8 sayfa) ✔ 12 Kasım (P)

| Sayfa | Kategori | Öz |
|---|---|---|
| `muzik-kurami-ve-akort` | Sanat ve Müzik | harmonik dizi, aralıklar ve uyuşum, Pisagor / saf / eşit akort, komalar, Türk makam müziğinin perde sistemi |
| `turkcenin-ses-yapisi` | Dil ve Edebiyat | ünlü uyumu, ünsüz benzeşmesi, ünlü düşmesi ve daralması, hece yapısı; kural ve istisna |
| `zipf-yasasi-ve-dil-istatistigi` | Dil ve Edebiyat | sıklık–sıra yasası, Heaps yasası, sözcük uzunluğu ve kısalma, n-gram; kamu malı metinler |
| `algi-psikolojisi` | Zihin ve Davranış | yanılsamalar, Weber–Fechner ve Stevens, sinyal saptama (d′, ROC), tepki süresi ve Hick yasası |
| `karar-ve-bilissel-yanliliklar` | Zihin ve Davranış | beklenen fayda, beklenti kuramı, çapalama, taban oranı yanılgısı, çerçeveleme; tartışmalar ve tekrar sorunu yansız |
| `mantik-ve-argumantasyon` | Felsefe ve Mantık | önermeler mantığı, geçerlilik ve sağlamlık, safsatalar, paradokslar (Zenon, yalancı, sorites) |
| `derin-zaman-ve-radyometrik-tarihleme` | Yer ve Çevre Bilimleri | jeolojik zaman ölçeği, izokron tarihleme, kitlesel yok oluşlar, fosil kaydının yanlılığı |
| `bilim-tarihinden-deneyler` | Tarih ve Toplum | Eratosthenes, Galileo'nun eğik düzlemi, Kepler ve Mars verisi, Cavendish; tarihî deneyleri yeniden kurmak |

## 2. grup (8 sayfa) ✔ 13 Kasım (R) — kullanıcı "öneri listesinden devam" dedi

| Sayfa | Kategori | Öz |
|---|---|---|
| `anatomi-ve-fizyoloji` | İnsan Bedeni (yeni menü kategorisi) | kas–iskelet kaldıraçları, solunum mekaniği ve akciğer hacimleri, gözün optiği ve kırma kusurları |
| `etimoloji-ve-dil-aileleri` | Dil ve Edebiyat | dil aileleri, düzenli ses denklikleri ve karşılaştırmalı yöntem, Türkçenin alıntı katmanları, halk etimolojisi |
| `tarihsel-veri-ve-haritalar` | Tarih ve Toplum | Minard'ın 1812 haritası, Snow'un kolera haritası, tarihsel nüfus tahminleri ve belirsizlikleri, kaynak eleştirisi |
| `sosyal-modeller-ve-aglar` | Tarih ve Toplum | Schelling ayrışma modeli, Granovetter eşik modeli, küçük dünya ağları; model ile gerçeklik arasındaki mesafe |
| `perspektif-ve-simetri` | Sanat ve Müzik | doğrusal perspektif ve kaçış noktaları, anamorfoz, şerit ve duvar kâğıdı simetri grupları, İslam geometrik desenleri |
| `felsefi-dusunce-deneyleri` | Felsefe ve Mantık | tramvay, Theseus'un gemisi, Çin odası, Mary'nin odası, cehalet peçesi; sezgi ve argüman |
| `epistemoloji` | Felsefe ve Mantık | bilgi tanımı ve Gettier, şüphecilik, temelcilik–bağdaşımcılık, tümevarım sorunu, Bayesçi epistemoloji |
| `aruz-ve-hece-olcusu` | Dil ve Edebiyat | hece ağırlığı, aruz kalıpları ve taktiî, imale ve zihaf, hece ölçüsü ve durak; yalnız kamu malı şiir |

## 3. grup (8 sayfa) ✔ 13 Kasım (S) — kullanıcı "yakın konulardan devam, üçüncü halka en son" dedi

| Sayfa | Kategori | Öz |
|---|---|---|
| `sozdizimi-ve-dilbilgisi` | Dil ve Edebiyat | öbek yapısı ve ağaçlar, Türkçenin eklemeli yapısı ve biçimbirim çözümlemesi, sözcük dizimi tipolojisi, yapısal belirsizlik |
| `anlambilim-ve-edimbilim` | Dil ve Edebiyat | anlam ilişkileri, gönderge ve anlam (Frege), niceleyici kapsamı, Grice'ın ilkeleri ve sezdirim, söz edimleri, önvarsayım |
| `arkeoloji-ve-tarihleme` | Tarih ve Toplum | stratigrafi ve Harris matrisi, radyokarbon ve kalibrasyon, dendrokronoloji, seriasyon; göreli ve mutlak tarih |
| `demografi-ve-nufus` | Tarih ve Toplum | nüfus piramidi, yaşam tablosu ve yaşam beklentisi, doğurganlık hızları, demografik geçiş, nüfus projeksiyonu |
| `mimarlik-tarihi-ve-yapi` | Sanat ve Müzik | kemer, tonoz ve kubbe; itki çizgisi ve asılı zincir, Pantheon, Ayasofya, Süleymaniye, Gotik; oran sistemleri |
| `bellek-ve-ogrenme` | Zihin ve Davranış | Ebbinghaus unutma eğrisi, aralıklı tekrar, seri konum etkisi, çalışma belleği; okur üzerinde deney, hiçbir şey kaydedilmez |
| `bilim-felsefesi` | Felsefe ve Mantık | sınır çizme sorunu, yanlışlanabilirlik, Duhem–Quine, Kuhn ve paradigmalar, Lakatos, bilimsel gerçekçilik tartışması |
| `takvimler-ve-zaman-olcumu` | Tarih ve Toplum | Jülyen ve Gregoryen takvim, Hicrî ve Rumî takvim, Metonik döngü, artık yıl kuralları, tarih dönüştürme |

## 4. grup: üçüncü halka (8 sayfa) ✔ 13 Kasım (T) — kullanıcı listeyi onayladı; genişleme planı tamamlandı

Ayrı kurallar: `.shots/briefs/_ucuncu-halka.md` (kurucu, yazar, doğrulayıcı için bağlayıcı). İki yeni kategori: Din ve İnanç, Sinema.
Bu grupla genişleme planı tamamlanır; ardından `docs/DEVAM-PLANI.md` 4.S (Öğrenme Yolları ve Önşart, atlas ve omurganın kaldırılması) gelir.

| Sayfa | Kategori | Öz |
|---|---|---|
| `karsilastirmali-dinler-tarihi` | Din ve İnanç | din biliminin yöntemi, "din" tanımları, geleneklerin doğuşu ve yayılışı, kutsal metinlerin derlenme tarihi, nüfus tahminleri; hiçbir inanç doğrulanmaz ya da çürütülmez |
| `din-felsefesi-ve-kelam` | Din ve İnanç | ontolojik, kozmolojik, tasarım argümanları ve itirazları, kötülük sorunu, Pascal'ın bahsi, kelâm okulları ve felsefe; argüman haritası, kazanan ilan edilmez |
| `psikiyatri-tarihi-ve-tani-sistemleri` | Zihin ve Davranış | Kraepelin'den DSM-5-TR ve ICD-11'e, güvenirlik ve kappa, taban oranı ve tarama istatistiği, kategorik ve boyutsal modeller; tanı ya da tedavi tavsiyesi yok |
| `psikometri-ve-olcme` | Zihin ve Davranış | klasik test kuramı, güvenirlik ve Cronbach alfa, geçerlik, faktör analizi, madde tepki kuramı; yalnız yapay veri |
| `bilinc-kuramlari` | Zihin ve Davranış | zor sorun, bilincin nöral bağıntıları, maskeleme ve dikkat kırpması deneyleri, küresel çalışma alanı, bütünleşik bilgi kuramı, yüksek düzey kuramlar; çatışan okullar |
| `anlati-yapisi-ve-edebiyat-cozumlemesi` | Dil ve Edebiyat | Aristoteles, Freytag, Propp'un işlevleri, Genette (sıra, süre, odaklanma), çerçeve öyküler; yalnız kamu malı metinler |
| `uslup-istatistigi-ve-yazar-tanima` | Dil ve Edebiyat | Mendenhall, Federalist yazıları ve Mosteller–Wallace, Burrows Delta, Türkçe kamu malı metinlerle yazar tanıma |
| `sinema-dili-ve-kurgu` | Sinema | kare hızı ve hareket algısı, çekim ölçekleri, 180 derece kuralı, Kuleşov etkisi, montaj kuramları, ortalama çekim süresi; yalnız kamu malı filmler |
