# Fizik kapsam haritası

10 Kasım 2026 · F1 kapsam çalışması

Bu harita, bir konunun menüde görünmesiyle deneylerinin tamamlanmasını
birbirinden ayırır. Mevcut kapsam, HTML kontrolleri, hesaplar ve Keşif
Defterleri üzerinden çıkarıldı. Bir satırın burada bulunması, o alanın
bütün lisans müfredatını karşıladığı veya eski sayfanın yeniden bağımsız
incelemeden geçtiği anlamına gelmez. F1'in üç yeni sayfası ayrı kurucu,
yazar ve doğrulayıcı/editör hattından geçti.

## Mekanik

| Konu | Ön koşul | Mevcut deney / F1 katkısı | Açık kalan deney |
|---|---|---|---|
| Kinematik, kuvvet ve momentum | Birimler, vektörler, grafik eğimi/alanı | `hareket-ve-grafikler`, `atislar`, `serbest-dusme`; `momentum-itme-ve-carpismalar` ve `newton-hareket-yasalari` | İki boyutlu çarpışmada vektörel momentum ve kütle merkezi; eğrisel harekette teğetsel/normal ivmenin birlikte ölçülmesi. |
| İş, enerji, basit makineler | Kuvvet, yer değiştirme, tork | `is-enerji`; F1 `basit-makineler`: palanga, eğik düzlem, çark–mil, vida; giriş işi–yararlı iş–kayıp bütçesi | Gerçek mekanizmalarda değişken kayıp ve hız bağımlılığı. Sabit verim modeli vida dişi sürtünmesini veya kilitlenmeyi açıklamaz. |
| Denge ve statik | Vektör bileşenleri, moment, integral | `tork-denge`: kaldıraç, temas/devirme, merdiven; F1 `statik`: yayılı yük bileşkesi, mesnetler, üç çubuk kafes ve kısıt matrisi | F2 mukavemet: kesme/moment dağılımı, gerilme, sehim ve burkulma; çelik yapılar bu temelden sonra. Denge tek başına dayanım sonucu değildir. |
| Dönme ve açısal momentum | Tork, enerji, eylemsizlik momenti | `tork-denge` kısıtlı kaldıraç dinamiği; `dairesel-hareket` merkezcil kuvvet | Kaymadan yuvarlanma, öteleme+dönme enerji paylaşımı, dış torksuz açısal momentum korunumu. Merkezcil kuvvet sayfası bunların yerine geçmez. |
| Salınım ve kütleçekim | Newton yasaları, enerji, türev | `sarkac`, `yay-kutle`, `cift-sarkac`; `kepler-yasalari` yörünge deneyleri | Zorlanmış mekanik salınımda genlik–faz–frekans taraması; yörünge enerjisi ve kaçış sınırının ayrı deneyle sınanması. |
| Akışkanlar | Basınç, kuvvet dengesi, enerji ve debi | `basinc`, `kaldirma-kuvveti`, `akiskanlar-mekanigi`: Venturi, Torricelli, Poiseuille | F2: boru kayıpları, pompa–sistem eğrisi, akış rejimleri ve `hidrolik-sistemler` güç bütçesi. |

Kapsam karşılaştırmasının temel mekanik sırası için
[MIT 8.01SC ders izlencesi](https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/syllabus/)
incelendi. Yukarıdaki eksik deneyler, bu izlence ile depo içeriği arasındaki
editoryal eşlemedir; bir kurumun site hakkındaki değerlendirmesi değildir.

## Elektrik ve manyetizma

| Konu | Ön koşul | Mevcut deney / F1 katkısı | Açık kalan deney |
|---|---|---|---|
| Yük, elektrik alan, potansiyel | Vektörler, ters kare, türev | F1 `elektrostatik`: iki kaynak yük, süperpozisyon, test yükü kuvveti ve sayısal −grad V karşılaştırması | Sürekli çizgi/yüzey yüklerinin doğrudan integrali; sınır değer problemleri. |
| Akı, Gauss, iletken ve yalıtkan | Yüzey integrali, simetri | F1 `elektrostatik`: izole iletken kabuk ve sabit hacim yükü taşıyan yalıtkan küre; iç/dış alan, potansiyel ve akı | Dış alanda indüklenen yüzey yükleri, elektrostatik ekranlama ve malzeme polarizasyonu. Küresel model bunları çözmez. |
| Kapasitans, devre ve enerji | Potansiyel farkı, yük korunumu | `elektrik-devresi-simulasyonu`: düğüm analizi; `elektronik-devre`: RC/RL/RLC geçici rejim; `alternatif-akim`: frekans yanıtı | Plaka geometrisi, C=εA/d, dielektrik ve enerji/kuvvet ilişkisi; sabit Q ile sabit V koşullarının karşılaştırılması. C kaydırıcısı bu geometri deneyinin karşılığı değildir. |
| Manyetik alan ve kuvvet | Akım, vektörel çarpım | `manyetik-alan`: bobin akımı/sarım sayısı; `lorentz-kuvveti`: yüklü parçacık, hız seçici ve spektrometre | Sonlu tel/halkanın Biot–Savart integrali, manyetik dipol torku, Ampère dolaşımının sayısal karşılaştırması. |
| İndüksiyon ve elektromanyetik dalga | Akı, türev, enerji | `maxwell-denklemleri-ve-alanlar`: dört yasa anlatımı ve düzlem dalga; RL/RLC geçici rejimleri | Hareketli iletken/halka ile Faraday–Lenz deneyleri, mekanik iş–elektrik gücü bütçesi ve karşılıklı indüksiyon. Anlatım veya RL eğrisi tek başına bu deneylerin yerini tutmaz. |

Sıra ve kavram ayrımları için
[MIT 8.02x ders izlencesi](https://ocw.mit.edu/courses/8-02x-physics-ii-electricity-magnetism-with-an-experimental-focus-spring-2005/pages/syllabus/)
incelendi; deney eksikleri yine depo üzerinden yapılan eşlemedir.

## Isı ve termodinamik

| Konu | Ön koşul | Mevcut deney | Açık kalan deney |
|---|---|---|---|
| Sıcaklık, ısı, hâl değişimi | Enerji, birimler, grafikler | `ideal-gaz` sıcaklık ve tanecik hareketi; `termodinamik` ideal gaz süreçleri | Kalorimetri, özgül ısı, gizli ısı, ısıl genleşme; sıcaklık sabitken enerji alışverişini gösteren hâl değişimi. |
| Birinci/ikinci yasa, entropi | İş integrali, olasılık | `termodinamik`: PV/TS, Carnot/Otto/Stirling; `entropi-ve-istatistiksel-fizik`: mikro durum ve istatistiksel köprü | Sonlu sıcaklık farkıyla ısı alışverişinde entropi üretimi ve tersinir referansla karşılaştırma. |
| Isı aktarımı | Sıcaklık farkı, güç, malzeme modeli | `kara-cisim-isimasi`: ışınım tayfı ve toplam güç | İletim ve taşınım; seri ısıl dirençler, geçici ısınma/soğuma. Işınım diğer aktarım mekanizmalarını tamamlamaz. |

Başlangıç kapsamı
[OpenStax University Physics 2, Sıcaklık ve Isı](https://openstax.org/books/university-physics-volume-2/pages/1-introduction)
bölümündeki konu ayrımlarıyla karşılaştırıldı.

## Dalgalar ve optik

| Konu | Ön koşul | Mevcut deney | Açık kalan deney |
|---|---|---|---|
| Dalga, girişim, ses | Salınım, faz, süperpozisyon | `dalga-superpozisyonu`, `duran-dalgalar`, `doppler-etkisi`; `fourier-ses`, `ses-sentezleyici` | Atma yayılımında ortam sınırı ve enerji yansıması; dispersif ortamda faz ve grup hızını ayrı ölçme. |
| Geometrik optik | Geometri, trigonometrik oranlar | `optik-yansima-kirilma`: Snell/Fresnel, prizma, fiber; `mercek-isinlari`: iki mercekte ara/son görüntü ve büyütme, mercek yapıcı ile ince/kalın mercek–Snell karşılaştırması ve küresel sapma | Bu alt kapsam için bu taramada yeni deney açığı kaydedilmedi; dalga optiği aşağıdaki satırda ayrı ele alınır. |
| Fiziksel optik | Yol farkı, dalga boyu, polarizasyon | `klasik-girisim`, `kirinim-izgarasi`; yansıma sayfasında s/p kutuplanma | Malus yasası, ardışık polarizörler; dairesel açıklık ve çözünürlük. s/p Fresnel karşılaştırması bütün polarizasyon konusunu kapsamaz. |

## Modern fizik

| Konu | Ön koşul | Mevcut deney | Açık kalan deney |
|---|---|---|---|
| Özel görelilik | Referans çerçevesi, hız, uzay-zaman grafiği | `gorelilik-uzayzaman`: ışık saati, eşzamanlılık, uzunluk, ikizler | Göreli momentum/enerji ve çarpışmada dört-momentum korunumu. |
| Fotonlar ve madde dalgaları | Enerji, momentum, dalga boyu | `kara-cisim-isimasi`, `fotoelektrik`, `kuantum-mekanigi`, `atom-orbitalleri` | Compton saçılmasında açı–dalga boyu kayması ve enerji/momentum bütçesi; de Broglie dalga boyunun kontrollü saçılmayla karşılaştırılması. |
| Kuantum ve çekirdek | Olasılık, özdeğer, enerji | `kuantum-dalga`: kuyular, özdurumlar, tünelleme; `radyoaktif-bozunma`, `nukleer-fizik` | Spin ölçümü/Stern–Gerlach ve uyumsuz gözlenebilirler. Mevcut dalga fonksiyonu görselleştirmesi spin deneyi değildir. |

Modern fizik ayrımları için
[OpenStax University Physics 3, Fotonlar ve Madde Dalgaları](https://openstax.org/books/university-physics-volume-3/pages/6-introduction)
ve kitabın [içindekiler dizini](https://openstax.org/books/university-physics-volume-3/pages/index)
incelendi.

## Uygulama sırası

1. F1: elektrostatik, basit makineler, statik; üç yeni laboratuvar ve defter.
2. F2: mukavemet → çelik yapılar; hidrolik sistemler ve akışkanlar kapsamı.
3. Sonraki temel fizik grupları planlanırken bu tablodaki eksikler üzerinden
   kabul ölçütü yaz: hangi kontrol, hangi hesap/ölçüm, hangi sınır durumu?
   Henüz bu eksikler için sayfa açılmış veya geliştirme tamamlanmış değildir.

Eski D/E grupları silinmedi. Güncel sıra ve yayın durumu
[`DEVAM-PLANI.md`](DEVAM-PLANI.md) içindedir. Her yeni deneyden sonra bu
tablo, menü ve sayfa sayıları birlikte güncellenmelidir.
