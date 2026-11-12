# Devam Planı — Açelya'nın Yeri (ajan devir belgesi)

Bu belge, projeyi bir sonraki ajanın (veya insanın) kaldığı yerden
sürdürebilmesi için yazıldı. Önce **Hedef** ve **Mevcut durum** bölümlerini,
sonra **Yapılacaklar**'ı oku. Teknik ayrıntılar için `README.md`, içerik
standardı için `docs/icerik-rehberi.md`.

Dal: `main` (eski `claude/zealous-archimedes-iwjhpu` dalı main'e birleşmiş durumda).
6–7 Kasım oturumunun commit'leri `origin/main`'e gönderildi ve `gh-pages`'te yayında.
Son durum tarihi: 2026-11-11 (F2, D ve E tamamlandı: her sayfanın defteri var).
A7 (`1101d98`) ve B1 (`7d5dd86`) `origin/main`'e gönderildi ve elle
yayımlandı. B1 canlıda `acelya-6d47d9ffc0` sürümü ve 14 dosyanın yerel
kopyalarıyla birebir eşleşmesiyle doğrulandı; girişsiz erişim yayında.
C grubu `88e8b67` ile main'e gönderilip elle yayımlandı; 27 canlı dosya
özeti ve 15 sekme doğrulandı. F1 `c683705` ile main'e gönderilip elle
yayımlandı; 13 canlı dosya özeti, 10 sekme ve dokuz soru geri bildirimi
doğrulandı. F1'in üç yeni laboratuvarı ve Keşif Defteri ayrı kurucu,
yazar ve doğrulayıcı/editör hattını tamamladı.
F1'in doğrulanmış canlı paket sürümü **`acelya-e9ff569083`**.
**11 Kasım:** F2, D (beş mühendislik laboratuvarı) ve E (on oyun defteri)
tamamlandı; ayrıntı 3. bölümün sonunda. Kullanıcının o oturumdaki açık
onayıyla `84e28e2` olarak main'e gönderildi ve elle yayımlandı; canlıda
**`acelya-3ed95942af`** sürümü ve 21 dosyanın yerel kopyalarla birebir
eşleşmesi doğrulandı.
**11 Kasım, ikinci tur:** eski 36 defterin bağımsız doğrulaması tamamlandı
(4.2); 160 defterin hepsi tam hattan geçmiş durumda. Kullanıcı onayıyla
main'e gönderilip elle yayımlandı; paket sürümü **`acelya-b57bf83881`**. **11 Kasım, üçüncü tur (G):** 4.5'teki on sekiz zayıf laboratuvar sıfırdan
yeniden kuruldu; defterleri yeni sayfalara göre yazılıp bağımsız doğrulandı.
Kullanıcı onayıyla main'e gönderilip elle yayımlandı; paket sürümü
**`acelya-0aa90056b8`**. **11 Kasım, dördüncü tur (H):** "eski 36 defter"
turunda yalnız düzeltilen yirmi bir sayfa aynı hatla sıfırdan yeniden
kuruldu (ayrıntı `docs/simulasyon-notlari.md` → "H"); 39 kalıcı laboratuvar
testi `npm run test:g` ile koşar. Kullanıcı onayıyla main'e gönderilip
yayımlandı (`6c929e7`, paket `acelya-54066734f1`). **12 Kasım, beşinci tur (I):** kalan 24 eski temel sayfa
yeniden kuruldu, kanban algılayıcısı düzeltildi, 4.4 (eski veri katmanları)
tamamlandı. Bu tur henüz commit'lenmedi (onay bekleniyor). Sıradaki iş
`docs/YENI-SAYFA-PLANI.md`.

**10 Kasım yayın talimatı:** Kullanıcı her kodlama turunun sonunda `main`'e
gönderim ve elle yayın istiyor; sonucu canlı siteden kontrol ediyor.
GitHub Actions kotası dolu. Her tamamlanmış grupta kontroller → build →
commit → `git push origin main` → `sh scripts/deploy-manual.sh --publish`
→ canlı sürüm kontrolü sırasını uygula; yeniden onay isteme.

## 1. Hedef (sahibinin sözleriyle)

Proje, lise hazırlık dönemindeki kızı ve biraz da kendisi için: temel
bilimleri sevdirmek, merak uyandırmak, araştırma ve bilgi edinme alışkanlığı
kazandırmak. İstekler:

- Teknik sorunları düzelt; **üretim seviyesine** getir.
- Brifing/"guide" katmanı gereksiz, kaldır (yapıldı).
- En büyük dert **içerik kalitesi ve kullanıcı deneyimi**. İçerik bir
  "quality digest" olsun: iştah açsın, öğretsin, bilgilendirsin, "lezzetli"
  olsun. **Her sayfa "vay" dedirtsin.** Kıymetini bilene muhteşem bir
  kaynak olsun.
- **6 Kasım 2026:** "Üniversite seviyesi temel bilimler STEM ansiklopedisini
  hedefliyoruz." Defterler lise sezgisinden başlayıp lisans ilk yıl
  düzeyine tırmanır; ayrıntı `docs/icerik-rehberi.md` → "Üniversite düzeyi".
  Öncelik temel bilim sayfalarıdır (fizik, kimya, biyoloji, matematik).

## 2. Mimari (kısa)

Statik site, derleme yok, GitHub Pages. Önemli parçalar:

| Parça | Dosya | Not |
|---|---|---|
| Ortak kabuk | `shared/app.js`, `shared/theme.css` | üst çubuk, tema, yıldızlar, PWA; bütün içerikler hesapsız açılır |
| Keşif Defteri | `shared/digest.js`, `shared/digest.css`, `shared/digest/<slug>.js` | her sayfanın altına katmanlı içerik; veri dosyası yoksa sessizce atlanır |
| Katalog | `shared/catalog.js` (üretilir) | ana sayfa kartlarında etiket/düzey/süre, arama |
| Service worker | `sw.js` (listeleri üretilir) | `node scripts/build-sw.mjs` |
| Denetim | `scripts/check-site.mjs` | bağlantı, meta, defter şeması, kaynak alan adları |
| Tarayıcı testi | `scripts/smoke.mjs` | Playwright; `--digest` defter görünürlüğü, `--width 390` mobil taşma |
| Ekran görüntüsü | `scripts/shot.mjs` | `node scripts/shot.mjs sarkac --theme light --scroll digest` |
| Meta açıklama | `scripts/sync-meta.mjs` | defter etiketinden `<meta name="description">` |
| CI | `.github/workflows/deploy-pages.yml` | check → build --check → smoke → deploy |

Komutlar: `npm run check`, `npm run build` (katalog + sw), `npm run smoke`,
`node scripts/sync-meta.mjs`.

Örnek kalite çıtası: `shared/digest/sarkac.js` (elle yazıldı) ve
`sarkac.html` (simülasyon da laboratuvar seviyesine çıkarıldı: kaydırıcılar,
ölçülen periyot, enerji çubukları, RK4). Ajan yazımı iyi örnekler:
`shared/digest/turev.js`, `pong.js`, `roma-hukuku.js`.

## 3. Yapılanlar

- Brifing katmanı (GUIDES, intro overlay, ℹ️) ve eski "araştırma defteri"
  modalının app.js bağlantıları kaldırıldı. Eski veri dosyaları
  (`shared/page-info.js`, `shared/encyclopedia-*.js/.css`) **henüz diskte**;
  yazar ajanlar bunları kaynak olarak okuyor (bkz. Yapılacaklar 4).
- Teknik: 404.html, eksik viewport'lar,
  sürümsüz echarts sabitlendi, 3 gerçek JS hatası düzeltildi
  (kristal-yapilar NaN, elektrik-devresi null chart, mantik-devresi kapsam),
  21 sayfada mobil yatay taşma giderildi (theme.css canvas kuralı + 7 sayfa
  tek tek). Duman testi: 168 sayfada 0 JS hatası.
- Service worker yeniden yazıldı; CI'da denetim adımı; README.
- Keşif Defteri altyapısı + 142 defter (106 doğrulayıcı/editör aşamasından geçti; aşağıda durum tablosu).
- **31 Ekim 2026 oturumu:**
  - Simülasyon hataları düzeltildi: `is-enerji` (animasyon çalışmıyordu, fiziksel
    birimlerle yeniden yazıldı), `kepler-yasalari` (gezegen ekran dışındaydı;
    artık Kepler denklemi çözülüyor, Güneş odakta), `dna-replikasyon` (5′/3′
    yönleri ve primer konumları), `manyetik-alan` (kapat/sıfırla, Chart.js
    yoksa çökme), `serbest-dusme` (g kaydırıcısı adımı).
  - 10 yeni defter tam hattan (yazar → doğrulayıcı → editör) geçti; `dna-replikasyon`
    yeni simülasyona göre güncellenip doğrulayıcı + editörden geçirildi.
  - GitHub Actions kullanılamadığı için elle yayın betiği eklendi (bkz. 4.6).
- **1 Kasım 2026 oturumu:** 16 yeni defter tam hattan geçti (integral,
  bayes-olasilik, dalga-superpozisyonu, atom-orbitalleri, molekul-sekli,
  kimyasal-kinetik, asit-baz-titrasyonu, mitoz-mayoz, enzim-kinetigi,
  fotosentez-solunum, dogal-secilim, gunes-sistemi, ay-evreleri,
  yildiz-yasam-dongusu, takimyildiz-haritasi, mekatronik-muhendisligi).
  Yazarların bulduğu ve içeriği yanlış öğreten 9 simülasyon (ay-evreleri,
  mitoz-mayoz, molekul-sekli, asit-baz-titrasyonu, gunes-sistemi,
  yildiz-yasam-dongusu, takimyildiz-haritasi, atom-orbitalleri, bayes) ile
  4 sayfadaki canvas CSS-değişkeni renk hatası düzeltildi; ayrıntı
  `docs/simulasyon-notlari.md`.
- **6 Kasım 2026 oturumu (üniversite düzeyi hedefi):**
  - 11 laboratuvar `sarkac.html` standardında sıfırdan yazıldı: lorentz-kuvveti
    (Boris itici, hız seçici, E×B, kütle spektrometresi), klasik-girisim
    (tek/çift yarık, beyaz ışık, zarf ve eksik mertebeler), fotoelektrik
    (durdurma gerilimi, V₀–f doğrusundan h ölçümü), radyoaktif-bozunma (tohumlu
    bozunma, ln N uydurması, Mo-99 → Tc-99m zinciri), termodinamik (PV/TS,
    birinci yasa tablosu, Carnot/Otto/Stirling), ideal-gaz (olay güdümlü 2B
    sert disk MD, Maxwell–Boltzmann), gorelilik-uzayzaman (Minkowski diyagramı,
    ikizler), doppler-etkisi (dalga cepheleri, Mach konisi), alternatif-akim
    (RLC, fazörler, rezonans), elektrik-devresi-simulasyonu (düğüm analizi,
    Kirchhoff, Wheatstone, maksimum güç), turev (h → 0, kesme ve yuvarlama
    hatası).
  - Yanlış öğreten 3 sayfa düzeltildi: periyodik-tablo (18 element ekran
    dışındaydı; NIST/CIAAW verileri eklendi), grup-teorisi (Cayley sekmeleri
    çöküyordu, alt grup kafesleri yanlıştı), cizge-teorisi (Königsberg
    çizgesi Euler'in sonucunun tersini veriyordu).
  - 10 yeni defter yazıldı (79 defter); türev defteri yeni laboratuvara göre
    yeniden yazıldı; roma-hukuku ve turev için bekleyen doğrulama bulguları
    işlendi. Bu 14 defter ve roma-hukuku tam hattan geçti (puanlar 9/10).
  - Ortak: `[hidden]` öğeler her sayfada gizli (theme.css), defter sınavında
    sarılan soru başlıkları çerçeveye binmiyor (digest.css), sembol bozan büyük
    harf dönüşümleri kaldırıldı; içerik rehberine "Üniversite düzeyi" ve
    `Lisans` düzeyi eklendi.
- **6 Kasım, ikinci tur (grup A):** akiskanlar-mekanigi (Venturi, Torricelli,
  Poiseuille), tork-denge (kaldıraç dinamiği, iki destekli kiriş, merdiven),
  kaldirma-kuvveti (yüzme dengesi ve salınımı, taşırma kabı, kral tacı) ve
  basinc (hidrostatik paradoks, U-tüpü, hidrolik kaldıraç, barometre)
  yeniden kuruldu; dört defter tam hattan geçti (83 defter). `digest.js`'in
  41 defterde ham `<sub>` gibi etiketler göstermesine yol açan kaçırma hatası
  düzeltildi; `smoke.mjs --digest` artık bunu yakalıyor.
- **6 Kasım, üçüncü tur (grup A2):** optik-yansima-kirilma (Snell ve Fermat,
  Fresnel, Brewster, kritik açı; prizma ve dispersiyon; optik fiber),
  mercek-isinlari (ince mercek, mercek yapıcı denklemi ve kalın mercek,
  mikroskop ve teleskoplar), atislar (hava dirençli eğik atış ve açı taraması;
  Three.js prototipi kaldırıldı), cift-sarkac (Lagrange + RK4, Lyapunov üsteli,
  normal modlar) ve kuantum-dalga (dört potansiyel, süperpozisyon, Gauss paketi,
  tünelleme yarılması) yeniden kuruldu; beş defter tam hattan geçti (88 defter).
  Doğrulayıcıların bulduğu sayfa hataları da düzeltildi: atislar'da Ay oranı,
  mercek-isinlari'nda göz için net görüntü uyarıları, kuantum-dalga'da
  osilatördeki sahte ⟨x⟩ periyodu.
- **7 Kasım (grup A3):** duran-dalgalar (titreştiricili tel, hava sütunu ve
  rezonans tüpü, harmonikler), kirinim-izgarasi (çok yarıklı desen, spektrometre
  ve Rydberg sabiti, CD/DVD), elektronik-devre (RC, RL ve RLC geçici rejim),
  kara-cisim-isimasi (Planck, CIE renkleri, gezegen sıcaklığı), kuantum-mekanigi
  (tek tek elektronlarla girişim, yol işaretçisi, de Broglie) ve nukleer-fizik
  (AME2020 bağlanma enerjisi, izobarlar, fisyon ve füzyon) yeniden kuruldu; altı
  defter tam hattan geçti (94 defter). Kurucuların altısı da 55. dakikada bir
  bağlantı kesintisiyle düştü ve `resume` ile kaldıkları yerden sürdü. Yazar ve
  doğrulayıcıların bulduğu sayfa sorunları düzeltildi: kuantum-mekanigi'nde iki
  sekmenin çelişen örtüşme kuralı, nukleer-fizik'te iki farklı yüzde tabanı,
  kirinim-izgarasi'nda Rayleigh sınırındaki kıl çizgisi kartı, kara-cisim'de
  Dünya'nın eski albedosu (0.306 → NASA'nın güncel 0.294), duran-dalgalar'da
  frekans için sayı kutusu, elektronik-devre'de bozuk not ve etiket.
- **7 Kasım (grup A4, matematik):** lorenz-cekici (çekici, kelebek etkisi ve
  Benettin λ, Lorenz haritası ve ρ taraması), taylor-serisi (polinom yaklaşımı,
  yakınsaklık yarıçapı, seriyle sayı hesabı), riemann-toplamlari (yedi kural,
  log–log yakınsama hızı, Monte Carlo ve boyut laneti), karmasik-sayilar (düzlemde
  işlemler, Euler serisi ve kökler, konform dönüşümler), normal-dagilim (Galton
  tahtası, merkezi limit teoremi, alanlar ve güven aralıkları) ve konik-kesitler
  (koniyi kesmek ve Dandelin küreleri, odak ve doğrultman, yansıma özellikleri)
  yeniden kuruldu; altı defter tam hattan geçti (100 defter). Konik kesitler
  yazarı engellenen bir web isteğinde onay beklerken takıldı ve dört saat sonra
  dosya yazmadan düştü; yerine açılan yazar, öncekinin doğruladıklarıyla 20
  dakikada bitirdi. Örnek defter
  `sarkac.js` de ilk kez doğrulayıcı + editörden geçti (7 → 9). Sayfa
  düzeltmeleri: sarkaç'ta periyot ölçümü titriyordu (geçiş anı adımın sonuna
  yuvarlanıyordu), Lorenz haritasının eğim kestirimi ve "|f′| > 1" kararı
  başlangıca bağlıydı, Lorenz'de yolun kopması yanlış nedene bağlanıyordu (artık
  h/2 ikiziyle ölçülüyor), Riemann'da Richardson notu "daha büyük" durumunu
  "daha küçük" yazıyordu, karmaşık sayılarda kökler listelenmiyordu ve u, v adları
  f = u + iv ile çakışıyordu, konik kesitlerde koni ekseninin kesiti merkezden
  delmediği görünmüyordu. Mandelbrot ve Julia'daki çalışmayan PDF düğmesi
  kaldırıldı; defterlerde üst çizgi artık `<span class=ov>` ile yazılıyor.
- **7 Kasım (grup A5, kimya ve biyoloji):** av-avci-lotka-volterra (Lotka–Volterra,
  gerçekçi av–avcı ve rekabet), genetik-caprazlama (tohumlu mayoz benzetimi, χ² ve
  kesin test, cinsiyete bağlı kalıtım, gen haritalama), ph-indikator (IAPWS su dengesi,
  tam yük dengesiyle pH, soğurma bantlarından renk), kristal-yapilar (birim hücre,
  Miller düzlemleri, toz kırınımı), denklem-denklestirme (formül ayrıştırıcı, BigInt
  Gauss–Jordan ile matris yöntemi, stokiyometri) ve kalp-dolasim (zamanla değişen
  elastans, windkessel, oksijen taşıma) yeniden kuruldu; altı defter tam hattan geçti
  (106 defter). Sayfa düzeltmeleri: denklem'de ortalama basamak NH₄NO₃'ün iç redoksunu
  gizliyordu (2NH₄NO₃ → 2N₂ + O₂ + 4H₂O'da 4 değil 10 e⁻), kristal'de FCC ile HCP'yi
  ayıran üçüncü komşu kabuğu görünmüyordu, kalp'te hızlı nabızda atım hacmi düşüşünün
  ard yükten geldiği yazılmıyordu, genetik'te kraliyet hemofilisi A diye geçiyordu (B),
  pH'ta kaynak renk etiketi sınır değerlerinde "geçiş" diyordu, av-avcı'da Holling II
  döngüsündeki ⟨x⟩ > x* farkı hata gibi okunuyordu. Harf üstü birleşik işaretler (x̄,
  r̂, Q̇, p⃗) site yazı tiplerinde kayıyor ya da kutu çıkıyordu (momentum sayfasının 19
  vektör oku boştu): `theme.css`'e `.ov`, `.hat` ve `.vec` sınıfları eklendi, check-site
  defterlerde birleşik işareti hata sayıyor.
- **7 Kasım (grup A6, matematik):** birim-cember (çember, fazör toplamı, CORDIC),
  rastgele-yuruyus (düzlem, tek boyut ve Pólya geri dönüşü; eski sayfa ortalama uzaklığı
  √N sanıyordu), pi-yaklasimi (Monte Carlo, seri yarışı, Arşimet çokgenleri), pisagor
  (üç kanıt, ilkel üçlüler, küre), asal-rsa (elek, Miller–Rabin, 40 bitlik anahtar) ve
  lissajous (eğri, osiloskop, harmonograf) yeniden kuruldu; altı defter tam hattan geçti
  (112 defter). İki yazar ve bir doğrulayıcı model sınırında koptu, dosyayı yazanlar
  commit'lendi, yazamayanların yerine yenisi açıldı. Sayfa düzeltmeleri: asal sayılarda
  φ(n)/4 sınırı 9'u istisna sayıyor ve rho grafiği başarısız denemeleri de sayıyor;
  birim çemberde 180° ile 270° düğmeleri var. Gelen bağlantıların sözleri yeni
  denetimlerle hâlâ doğru; iki eski başlık ("Asal Sayılar & RSA Fikri") yenilendi.
- **10 Kasım (grup A7):** `pascal-ucgeni` (kesin BigInt katsayıları, tohumlu
  binom deneyi, asal modüller ve Lucas sayımı), `collatz` (BigInt yörünge,
  adım/değer sınırları, durma süreleri ve sınırlı tarama), `molekul` (altı doğru
  yapı, H₂/D₂ Morse kuyusu ve ölçülen titreşim, dipol vektörleri),
  `mantik-kapilari` (kapılar, De Morgan eşdeğerliği, yarım/tam ve dört bit
  toplayıcı) ve `besin-agi` (yönlü yollar, enerji bütçesi, düğüm çıkarma)
  yeniden kuruldu; beş defter kurucu → bağımsız yazar → bağımsız
  doğrulayıcı+editör hattından geçti. Toplam **117 defter; 37 eksik**.
  Eski bozuk PDF düğmeleri ve bu sayfalardaki CDN bağımlılıkları kaldırıldı.
  Etan bağlantısı gibi hatalı modellerin yerine kaynaklı, sınırları açıklanmış
  örnekler geldi. Matematik ve besin ağı sekmelerinin tema/CSS çakışmaları
  görsel kontrolde düzeltildi; beş eski defterin gelen bağlantı metinleri
  yeni kontrollerle eşleştirildi. PubMed ve MIT'nin özgün Shannon makalesi
  alan adları kaynak izin listesine eklendi. `npm run test:a7` artık beş
  laboratuvarı 1280/koyu ve 390/açık görünümde **136 sayısal/etkileşim
  kontrolüyle** sınar; 28 ekran görüntüsünü `.shots/a7/` altına bırakır.
  Bu bir genel bilimsel doğruluk ispatı değildir; belirli referans sonuçların
  geriye dönük denetimidir.
  Genel tarayıcı taraması: **169 sayfa, 105 sekme, 0 JS/konsol hatası**;
  37 yerel başarısız istek yalnız henüz yazılmamış defterlere aittir.
  A7'nin 390 px mobil denetiminde beş defter görünür, 14 sekme çalışır;
  JS/konsol/istek hatası ve yatay taşma yoktur.
  Statik denetim: **0 hata, 94 uyarı** (eksik defter kapsamı ve incelenmesi
  gereken kaynak/biçim uyarıları; A7'nin beş OpenStax uyarısındaki derin
  bağlantılar kaynak incelemesinde doğrulandı).
- **10 Kasım (grup B1 + girişsiz kullanım):** Mandelbrot, Julia, Koch kar
  tanesi ve Hilbert eğrisi üçer deney sekmesiyle yeniden kuruldu. Dört yeni
  defter kurucu → bağımsız yazar → bağımsız doğrulayıcı/editör hattından
  geçti. Toplam **121 defter; 85'i tam hattan geçmiş, 33 sayfada defter yok**.
  Sonlu yineleme bir üyelik ispatı sayılmıyor; sonlu kırık çizgi ile ideal
  limit nesnesi ayrı anlatılıyor. Koch'un çıkıntı yönü, Mandelbrot'un z₀ ve
  kaçış eşitliği, Julia'nın genel başlangıçlar için kaçış yarıçapı düzeltildi.
  Hilbert'te yakınlığın yönü gerçek hücre çiftleriyle sınanıyor; sayısal
  geometri performans ölçümü gibi sunulmuyor. `test:fractals` dört sayfanın
  gerçek hesap çekirdeğinde **44.278 kontrol** yapar.
  Kullanıcı talebiyle giriş formu, açık metin hesap dosyası, etkinlik takibi
  ve Firebase istemcisi kaldırıldı. Menü ve bütün konular doğrudan açılır;
  `bilgi.html` herkese açık Hakkında sayfasıdır. Oyun rekorları bu cihazda
  anonim saklanır. `test:public` **35 kontrolle** temiz tarayıcı, derin bağlantı,
  eski oturum temizliği, yerel rekorlar ve depolama kapalıyken erişimi sınar.
  Eski Git geçmişi ve uzak Firebase verileri bu işlemle silinmedi.
  Doğukan'ın fotoğrafları kullanıcının tercihi gereği kapsam dışında kaldı.
  Son statik denetim **0 hata, 95 uyarı** verdi; yeni Koch OpenStax bölüm
  bağlantısı kaynak metniyle doğrulandı. Dört sayfanın mobil defter/12 sekme
  denetimi hatasız; A7 geriye dönük 136 kontrolü de geçti. Manuel yayın
  betiği ayrıca bütün 169 sayfayı tarar.
- **10 Kasım (grup B2):** `penrose-dosemesi`, `barnsley-egreltiotu` ve
  `sierpinski-fraktali-peano-egrisi-altin-oran` yeniden kuruldu. Her sayfada
  üç bağımsız deney sekmesi, kaynaklı matematik ve sayısal okumalar var.
  Penrose'da yönlü Robinson altbölünmesi ve periyodik karşı örnek;
  Barnsley'de tohumlu afin IFS, alan/kontraksiyon ayrımı ve durağan dağılım;
  Üç Yapım'da Sierpiński alanı, gerçek 3×3 Peano yolu ve altın orana
  yakınsama inceleniyor. Sonlu çizim ile sonsuz limit; geometrik küme ile
  ziyaret yoğunluğu ayrı anlatılıyor. Üç yeni defter kurucu → bağımsız
  yazar → bağımsız doğrulayıcı/editör hattından geçti. Toplam **124 defter;
  88 tam hat, 30 eksik defter; 36 eski defterin incelemesi bekliyor**.
  `test:b2` gerçek HTML hesap çekirdeklerinde **3.848 bağımsız referans ve
  geometri kontrolü** yapar. Üçgenlerin alan/örtüşme denetimi, Peano hücre
  komşuluğu ve düzeyler arası uyum, rasyonel durağan ortalamalar ve 57
  başlangıçtan ilk hata hedefleri kapsanır. Ajan istemlerinin eski giriş
  enjekte etme talimatları temiz, hesapsız tarayıcı bağlamına uyarlandı;
  dört eski defterin sonraki durakları yeni deneylerle eşleştirildi.
  Son mobil denetim: **3 sayfa, 9 sekme, 0 JS/konsol/istek hatası**;
  üç defterin 11'er bölümü görünür, 390 px genişlikte yatay taşma yok.
  Statik denetim: **169 sayfa, 124 defter, 0 hata, 95 mevcut uyarı**;
  B2'nin üç defterinde uyarı yok. Katalog ve service worker güncellendi:
  **`acelya-e4eaddd595`**. Elle yayın betiği 169 sayfayı JS/konsol hatası
  olmadan taradı; 30 başarısız yerel istek yalnız eksik defterlerdi.
  B2 ana paketi (`860c721`) canlıda sekiz dosya özeti ve dokuz sekmeyle
  doğrulandı. Son görsel kontrolde Üç Yapım sekmelerinin ortak düğme
  stiliyle çakışması giderildi; açık/koyu tema ve mobil üç sekme yeniden
  doğrulandı. Yukarıdaki sürüm bu son arayüz düzeltmesini de içerir.
- **10 Kasım (grup B3):** `lorenz-cekici2`, `mandelbrot+lorenz`, `fibo`
  ve `fibo+pascal` üçer bağımsız deneyle yeniden kuruldu. Lorenz2'de gerçek
  3B dönüşüm, yönlü Poincaré kesiti ve Euler/RK4 adım yarılama; Harita ve
  Akış'ta kritik/deneme başlangıcı, türev/sonlu zaman ayrımı ve iki tam
  çözüm var. Fibonacci'de gerçek kare döşemesi, BigInt alan özdeşliği ve
  çember/logaritmik spiral eğriliği; Pascal bağlantısında sığ köşegen,
  üretilen domino döşemeleri ve renkli sayım/üreteç fonksiyonu inceleniyor.
  Dört yeni defter kurucu → bağımsız yazar → bağımsız doğrulayıcı/editör
  hattından geçti. Toplam **128 defter; 92 tam hat, 26 eksik defter**;
  eski **36** defterin inceleme durumu değişmedi.
  `test:b3` gerçek HTML çekirdeklerinde **24.128 kontrol** yapar: Lorenz
  için RK4'ten bağımsız 60 basamaklı Taylor referansları, değişmez eksen ve
  kesit geometrisi; Fibonacci'de hızlı ikiye katlama, örtüşmeyen kareler ve
  yaylar; Pascal'da toplama tablosu ve domino başlangıç bit maskeleriyle
  bağımsız sayım. Hesaplar, sonsuz zamanlı teoremlerin kanıtı sayılmıyor.
  Eski `lorenz-cekici` HTML/defterinde sonlu grafikten bütün periyodik
  yörüngelere hüküm verme, evrensel t≈40 hata sınırı ve istatistiklerin
  kesin değişmezliği iddiaları düzeltildi. Denge istisnaları, uzun zaman
  özdeşliklerinin koşulları ve sınırlı süreli kestirimler açıklandı. Bu
  hedefli inceleme eski A4 sayfasının tamamını yeniden onaylama değildir.
  Menü/katalog adları ve iki eski defterin sonraki durakları yenilendi.
  Sonuç: **169 sayfa, 128 defter, 0 statik hata, 96 uyarı**;
  yeni defterlerde yalnız açılıp doğrulanmış Fibonacci OpenStax §3.3
  bağlantısı uyarı verir. Mobil B3 denetimi dört sayfa/12 sekmede JS,
  konsol, istek hatası ve yatay taşma bulmadı; defterler görünür.
  Eski Lorenz'in üç sekmesi de mobilde yeniden denetlendi. Yayın sürümü
  **`acelya-87a5cbb118`**. Elle yayın ve canlı dosya/sekme kontrolü bu paketle
  tamamlanır; sıradaki üç tek-sayı-toplam sayfası B4'e bırakıldı.
- **10 Kasım (grup B4):** `tek-sayi-toplam3`, `tek-sayi-toplam4` ve
  `tek-sayi-toplam5` dokuz deneyle yeniden kuruldu. İlkinde gerçek L
  hücreleri, ters dönüşümü olan halka/dikdörtgen eşlemesi ve 120 rakama
  kadar kesin bütçe hesabı; ikincide ileri/geri fark, işaretli aritmetik
  eşleme ve doğrusal/ikinci derece Riemann toplamları var. Üçüncüde
  geometrik ağırlıklı sonlu/sonsuz toplam, ilk uygun terim sayısı ve
  olasılık katkısı/koşullu ortalama ayrımı inceleniyor. Eski bozuk PDF
  düğmesi tarayıcı yazdırma raporuyla değişti; üç varsayılan rapor ve
  300 terimlik 11 sayfalık rapor görsel olarak doğrulandı.
  Üç defter kurucu → bağımsız yazar → bağımsız doğrulayıcı/editör
  hattından geçti. Toplam **131 defter; 95 tam hat, 23 eksik defter**;
  eski **36** defterin inceleme durumu değişmedi.
  `test:b4` **53.791 kontrol** yapar: gerçek hücre kümeleri ve uzaklıklar,
  karekök eşitsizlikleri, açılmış fark polinomları, bağımsız kuvvet
  toplamları ve BigInt ortak paydalı rasyonel seri referansları.
  İlk uygun N, kayan nokta bölmesi ve logaritma kullanmadan tamsayı
  eşitsizliğiyle sınanır. Girişsiz erişim regresyonunun 35 kontrolü geçti.
  Menü/katalog ve Fibonacci, Riemann, Taylor defterlerinden gelen
  sonraki duraklar güncellendi. Stanford ve Computer History Museum
  birincil kaynakları izin listesine eklendi.
  Statik sonuç: **169 sayfa, 131 defter, 0 hata, 101 uyarı**. Yeni
  defterlerdeki beş uyarı, açılarak doğrulanan derin OpenStax bağlantılarıdır.
  Son ortak mobil denetimde üç sayfa/dokuz sekme ve üç defter görünür;
  JS, konsol, başarısız istek, ham etiket ve yatay taşma yok.
  Yayın sürümü **`acelya-381af50662`**. B grubu tamamlandı; sırada C var.
- **10 Kasım (grup C):** sekiz sayfa yeniden kuruldu: `fourier-ses`
  (harmonikler, örnekleme/DFT, canlı analiz), `ses-sentezleyici` (ADSR,
  biquad ve notalar), `renk-teorisi` (HSL/HSV, lineer ışık ve ideal filtre),
  `sezar-sifre` (26/29 alfabe, bütün anahtarlar, frekans), `enigma-makinesi`
  (tarihsel rotor/adım/elektrik yolu), `siralama-algoritmalari` (adım ve
  kararlılık), `siralama-yarisi` (karşılaştırma/ana dizi/tampon işi) ve
  `yol-bulma-algoritmalari` (adım–maliyet, güvenli A* sezgisi, erişilmezlik).
  Sekiz defterin her biri kurucu → farklı yazar → üçüncü doğrulayıcı/editör
  hattından geçti. Toplam **139 defter; 103 tam hat, 15 eksik defter**;
  eski **36** defterin tam inceleme durumu değişmedi.
  `test:c`: **22 çekirdek + 4 tarayıcı kripto senaryosu**, **86.345 algoritma**
  ve gerçek Web Audio dahil **41.871 ses/renk kontrolü**. Kriptografide
  yayımlanmış mesajlar, aramada bağımsız Bellman–Ford; ses/renkte Parseval,
  Butterworth, Python colorsys ve gerçek OfflineAudioContext referansları
  kullanıldı. Sınanan modellerin regresyonu, genel bir doğruluk ispatı
  olarak sunulmuyor. Girişsiz kullanımın 35 kontrolü de geçti.
  Bağımsız incelemede Sezar'ın artık birleştirici Unicode işaretleriyle
  ters dönüşü bozan NFC etkileşimi ve normalleştirmeyle genişleyen metnin
  uzunluk sınırı düzeltildi; üç sekmede hata, temizleme ve toparlanma
  gerçek tarayıcıda kalıcı test kapsamına alındı. Fourier referans periyodu
  ve Nyquist sınırı, synth geçiş rejimi ve renk nicemlemesi netleştirildi.
  Yedi eski defterin sonraki durakları, sekiz pasif PAGE_INFO özeti,
  menü/katalog adları ve yeni birincil kaynak alanları güncellendi.
  Statik sonuç: **169 sayfa, 139 defter, 0 hata, 101 mevcut uyarı**;
  yeni sekiz defterde uyarı yok. Son mobil denetimde sekiz defter ve
  15 sekme görünür; JS/konsol/istek hatası ve yatay taşma yok. Renk
  defterindeki uzun işlemin mobil satır taşması operatör aralıklarıyla
  giderildi ve ilgili sayfa yeniden doğrulandı. Fiziksel mikrofon/hoparlör dinlemesi
  yapılmadı; mikrofon yaşam döngüsü kontrollü izin yanıtı ve Web Audio
  MediaStream ile sınandı. Canlı yayın kapanışı aşağıdaki yayın akışını
  izler; sıradaki çalışma **F1** (4.0).
- **10 Kasım F1 (yeni temel fizik laboratuvarları):**
  `elektrostatik`, `basit-makineler`, `statik` sıfırdan eklendi. Üçünde de
  farklı kurucu/yazar/doğrulayıcı kullanıldı: elektrostatik H→Q→M,
  basit makineler M→H→Q, statik Q→M→H (H: history_review,
  Q: quality_baseline, M: builder_molecules). Toplam **172 HTML,
  142 defter, 106 tam inceleme; 15 mevcut eksik defter**. F2 sayfaları
  bu toplamda değildir.
  - Elektrostatik: Coulomb/süperpozisyon, sayısal potansiyel türevi,
    küresel kabuk/hacim yükü ve akı; tekillikler ve yüzey limitleri açık.
  - Basit makineler: palanga, eğik düzlem, çark–mil, vida; kuvvet, yol,
    iş ve kayıp bütçesi birlikte. R/r kontrol çakışması, sıfır kuvvet
    okları ve gizli canvas boyut yarışı kalıcı testlerle kapatıldı.
  - Statik: yayılı yük integrali, kiriş/temas, kafes düğüm kuvvetleri,
    mesnet rankı ve tepki aileleri. Denge, ilk mertebe kinematik yeterlilik
    ve dayanım ayrıldı; h=0 tekilliği sonlu hareket iddiası değildir.
  - Bağımsız editör kapanışları: elektrostatik 9,1→9,4; basit makineler
    9,3→9,5; statik 9,1→9,3. Açık bilimsel veya işlevsel bulgu kalmadı.
    Merkezi fark kartlarının iki ayrı analitik hata normu olduğu ve
    h=0 makine kuvvetinin yukarı hareket modelinden geldiği açıklaştırıldı.
  - `test:f1`: elektrostatikte 22 model + 74 UI; basit makinelerde
    17.801 hesap + 28 UI; statikte 9.803 hesap + 35 UI. Üç defterin
    dört deney reçetesi ve çözümlü örneği bağımsız gerçek UI'da tekrar
    doğrulandı. `test:public`: 35 kontrol geçti.
  - Ana menüye üç sayfa, Maxwell ön koşullarına elektrostatik eklendi;
    tork/iş–enerji/DC devre defterlerinin sonraki durakları bağlandı.
    [`fizik-kapsam-haritasi.md`](fizik-kapsam-haritasi.md) konu → ön koşul
    → mevcut deney → eksik deney eşlemesini tutar. Bu harita, eski
    sayfaların tamamına yeni bir doğruluk onayı verilmesi anlamına gelmez.
  - Son paket: **`acelya-e9ff569083`**. Statik denetimde yeni beş uyarı,
    açılıp bölüm başlıkları doğrulanmış doğrudan OpenStax bağlantılarıdır;
    genel 101 eski uyarıyla toplam 106, hata 0. Yerel entegrasyonda üç
    defter, 10 sekme, dokuz sınav geri bildirimi, üç arama hedefi ve
    Maxwell ön koşul bağlantısı geçti; JS/konsol/istek hatası ve 390 px
    yatay taşması yok. Yayın kapanışı aşağıdaki
    elle yayın akışını izler; sıradaki çalışma **F2**.
- **11 Kasım (F2 kapanışı, D ve E):**
  - **F2:** `mukavemet`, `celik-yapilar`, `hidrolik-sistemler` ve
    `akiskanlar-mekanigi`'nin dördüncü "Boru ve pompa" sekmesi; dört defter
    bağımsız doğrulayıcı/editörden geçti (7→8,5; 6,5→8,5; 6→8,5; 6,5→8,5).
    Sayısal hata çıkmadı; hikâyeler, türetmeler ve Türkçe güçlendirildi.
    `test:f2` geçiyor (mukavemet testinin defter sınavını etiketsiz alan
    sayan denetimi düzeltildi).
  - **D (sıfırdan beş laboratuvar):** `yoneylem-arastirmasi` (grafik DP,
    kesirli simpleks, CPM/PERT), `uretim-planlama-ve-endustri-muhendisligi`
    (EOQ, X̄–R ve ARL, seri hat/CONWIP), `elektrik-muhendisligi` (üç faz,
    iletim, transformatör), `kimya-muhendisligi` (reaktörler, McCabe–Thiele,
    ısı değiştirici), `gemi-makineleri-isletme-muhendisligi` (çift çevrim,
    pervane yasası, enine stabilite). Her biri kurucu → farklı yazar →
    üçüncü doğrulayıcı/editör hattından geçti (defterler 8,5→9).
    Doğrulayıcılar yazarların bulduğu küçük sayfa sorunlarını da kapattı.
    `test:d`: 856.470 + 1.593 + 48.891 + 389.352 + 5.725 çekirdek kontrolü
    ve 390 açık / 1280 koyu arayüz kontrolleri.
  - **E (on oyun):** tetris, snake, breakout, oyun-2048, mayin-tarlasi,
    isik-sondurme, hanoi-kuleleri, yasam-oyunu, formul-hafiza defterleri
    yazar → bağımsız doğrulayıcı/editör hattından geçti (hepsi 9).
    `gezegen-savunmasi` oynanamaz durumdaydı; tutarlı yörünge fiziğiyle
    sıfırdan kuruldu (`test:e`: 31.805 çekirdek kontrolü + tarayıcı), defteri
    yeni oyuna göre baştan yazıldı ve bağımsız doğrulandı.
    Yazar/doğrulayıcıların bulduğu oyun hataları düzeltildi: 2048'de ters
    yukarı/aşağı ve kaybolan rekor, mayın tarlasında çalışmayan ipucu dalı,
    Hanoi'de hep "Çok iyi!" diyen durum satırı, yaşam oyununa dört desen,
    tetris dokunmatik düşürme, breakout raket sınırı. Kalan açıklar
    `docs/simulasyon-notlari.md` → "11 Kasım 2026".
  - Toplam **175 HTML, 160 defter, 124 tam inceleme; eksik defter yok**.
    `check-site --require-digests`: 0 hata. Tam tarama: 175 sayfa, 197 sekme,
    0 JS/konsol/istek hatası; `test:public` 35 kontrol.
  - NIST/SEMATECH istatistik el kitabı kaynak izin listesine eklendi.
- **11 Kasım, ikinci tur (eski 36 defter):** 18 doğrulayıcı/editör ajanı
  ikişer defter aldı (ortak görev tanımı `.shots/briefs/_eski-defter-dogrulama.md`).
  Puanlar 5–7,5'ten 8–9'a çıktı; hatasız sayfa çıkmadı. Öne çıkan sayfa
  hataları: `mantik-devresi` (girişler kapılara hiç ulaşmıyordu, bütün
  tablolar yanlıştı), `pong` (oyun yüklenince donuyordu), `altin-oran`
  (çizilen eğri altın sarmal değildi), `ucak-muhendisligi-ve-aerodinamik`
  (hücum açısı ve ok yönleri; tuval yeniden yazıldı),
  `makine-dili-assembly-c` (üç seviye paneli; makine kodu yeniden yazılıp
  derleyici ve emülatörle doğrulandı), `makine-ogrenmesi-derin-ogrenme-llm`
  (Eğit → NaN), `mikro-ekonomi-ve-uretim-faktorleri` (ters eğimler, bütçeyi
  aşan sepet), `veritabanlari` (SQL alanı ve Venn), `plc-…` (mühürleme),
  `bicimsel-diller-…` (DFA metni), birçok sayfada canvas'a verilen
  `var(--…)` renkleri. Ayrıntı ve kalan açıklar
  `docs/simulasyon-notlari.md` → "eski 36 defterin bağımsız doğrulaması".
  Toplumsal sayfalarda (makro, uluslararası ilişkiler, işletme) tartışmalı
  yargılar ekol/görüş olarak yeniden yazıldı; hızla eskiyen sayılar
  tarihlendi ya da çıkarıldı.
- **11 Kasım, üçüncü tur (G: on sekiz laboratuvar):** `serbest-dusme`,
  `newton-hareket-yasalari`, `yay-kutle`, `vektorler`, `integral`,
  `dalga-superpozisyonu`, `hesaplama-teorisi`,
  `makro-ekonomi-ve-para-politikalari`, `mikro-ekonomi-ve-uretim-faktorleri`,
  `altin-oran`, `elektrikli-araclar`, `otomotiv-muhendisligi`,
  `maden-muhendisligi`, `metalurji-ve-malzeme-muhendisligi`,
  `uluslararasi-iliskiler`, `programlama-paradigmalari`, `veritabanlari`,
  `makine-ogrenmesi-derin-ogrenme-llm` üç sekmeli laboratuvar olarak yeniden
  kuruldu. Hat: kurucu (sayfa + `scripts/check-g-<slug>.mjs` + rapor) →
  farklı yazar (defterin sayfaya bağlı bölümleri; doğrulanmış tarih korunur)
  → üçüncü ajan (sayfanın bilimini kendi hesabıyla yeniden türetir, küçük
  sayfa kusurlarını düzeltir, defteri çürütmeye çalışır). Ortak görev
  tanımları `.shots/briefs/_kurucu-ortak.md`, `_yazar-ortak.md`,
  `_dogrulayici-ortak.md`. Defter puanları 8–8,5'ten 9'a çıktı; hiçbir
  çekirdekte formül hatası çıkmadı, düzeltmeler arayüz/metin/kenar
  durumlarındaydı (en önemlisi: hesaplama teorisinde sayfayı donduran
  indirgeme, makroda q = 0 işaret hatası, otomotivde tutmayan "=").
  Toplam test: `npm run test:g`. Toplumsal sayfalar (makro, mikro,
  uluslararası ilişkiler) varsayımları yazılı modellerdir; güncel rakam,
  süren çatışma ve güncel aktör içermez. 46 defter bağlantısının başlığı ve
  18 gerekçesi yeni sayfalara göre güncellendi. Kullanım limiti altı ajanı
  yarıda kesti; hepsi `SendMessage` ile bağlamları korunarak sürdürüldü.
  Ayrıntı ve açık kalanlar: `docs/simulasyon-notlari.md` → "G".
- **Hattın yeni sırası (6 Kasım):** ince ya da yanlış sayfa → **kurucu**
  (sayfayı yeniden yazar, raporunu `.shots/briefs/<slug>.md`'ye bırakır) →
  **yazar** (raporla) → **doğrulayıcı + editör tek oturumda**. Ajanlar 5–6'lık
  gruplarla, istem başına ~30 dakikalık bütçe ve tarayıcı komutlarında
  `timeout` ile çalışır; her grup bitince commit. İstemler ve çalıştırma
  notları `docs/ajan-istemleri.md`'de.
- **Hattın önceki sırası (1 Kasım):** yazar → (yazar BLOCKER
  bulduysa) sayfa düzeltme ajanı, sayfayla birlikte defterin laboratuvar
  bölümünü de günceller → doğrulayıcı → aynı doğrulayıcı oturumu editör olarak
  devam eder. Ajanlar HTML'i editör aracıyla değil python/node betikleriyle
  düzenlemeli: editör kaydederken tüm dosyayı yeniden biçimlendiriyor.

## 4. Yapılacaklar (sırayla)

### 4.0 Yeni öncelik: temel fizik ve uygulamalı mekanik kapsamı (10 Kasım)

Kullanıcı C grubu sürerken akışkanlar mekaniği, elektrostatik, basit
makineler, statik, çelik yapılar ve hidrolik sistemlerde eksikler bildirdi.
Mevcut sayfa sayısı, konuların eksiksiz işlendiği anlamına gelmiyor.
**C, F1, F2, D ve E tamamlandı (11 Kasım).**

Mekanik, elektrik–manyetizma, ısı, dalgalar/optik ve modern fizik için
konu → ön koşul → mevcut deney → eksik deney eşlemesi
[`fizik-kapsam-haritasi.md`](fizik-kapsam-haritasi.md) dosyasında çıkarıldı.
Menüde ilgili bir kelimenin bulunması, ünitenin tamamlandığına kanıt sayılmaz.

| Konu | Mevcut kapsam | Durum / sonraki iş |
|---|---|---|
| Akışkanlar mekaniği | `akiskanlar-mekanigi`: Venturi, Torricelli, Poiseuille; `basinc` ve `kaldirma-kuvveti` ayrı laboratuvarlar | Menüde tam adıyla görünür. F2’de boru kayıpları, pompa–sistem ilişkisi ve geçerli akış rejimleri için kapsamı genişlet; aynı temel deneyi kopyalama. |
| Elektrostatik | F1 `elektrostatik`: Coulomb/süperpozisyon, alan–potansiyel, akı/Gauss, küresel iletken kabuk ve hacim yüklü yalıtkan | Laboratuvar + defter + bağımsız inceleme tamamlandı. Polarizasyon, kapasitans geometrisi ve genel sınır problemleri bu modelin dışında; kapsam haritasında açık. |
| Basit makineler | F1 `basit-makineler`: palanga, eğik düzlem, çark–mil, vida; `tork-denge` ön koşul | Laboratuvar + defter + bağımsız inceleme tamamlandı. Geometri, kuvvet ve iş/kayıp birlikte; toplam verim modeli gerçek diş sürtünmesi veya kilitlenme yasası sayılmaz. |
| Statik | F1 `statik`: yayılı yük, serbest cisim diyagramları, tepkiler, üç çubuk kafes ve mesnet rankı; `tork-denge` temas/kaldıraç ön koşulu | Laboratuvar + defter + bağımsız inceleme tamamlandı. Sonraki adım F2 mukavemet; denge hesabı dayanım/şekil değiştirme hesabı yerine geçmez. |
| Mukavemet ve çelik yapılar | Eski `makine-muhendisligi` defterinde kısmi eğilme örneği; tam doğrulaması bekliyor. Bağımsız çelik yapı laboratuvarı yok | Önce `mukavemet`: gerilme–şekil değiştirme, kesit özellikleri, kesme/moment, sehim ve burkulma. Sonra `celik-yapilar`: çekme/basınç/eğilme elemanları, bağlantı ve yanal kararlılık; varsayımlar ve kaynaklı malzeme verileriyle eğitim modelleri. |
| Hidrolik sistemler | `basinc` içinde Pascal/pres; eski PLC/hidrolik/pnömatik sayfasında ağırlıkla açıklama kartları | Yeni `hidrolik-sistemler`: pompa, valf, çift etkili silindir, basınç/debi, hız/kuvvet, kayıp ve güç bütçesi. Basınç sayfası ön koşul; PLC sayfası uygulama bağlantısı. |

- **F1 (tamamlandı):** `elektrostatik`, `basit-makineler`, `statik`
  (yeni laboratuvar + defter + bağımsız inceleme).
- **F2 (tamamlandı, 11 Kasım):** `mukavemet`, `celik-yapilar`,
  `hidrolik-sistemler`; akışkanlar sayfasına boru–pompa sekmesi ve defterin
  yeniden bağımsız incelemesi.
- Her yeni sayfa aynı kurucu → bağımsız yazar → bağımsız doğrulayıcı/editör
  hattından geçer. Yapısal örneklerde yalnız akma gerilmesini karşılaştırıp
  bir yapının güvenli olduğuna hükmedilmez; modele dahil olmayan etkiler
  açıklanır. Standartlara dayalı içerik yazılacaksa yürürlük/sürüm ve ilgili
  maddeler o çalışma sırasında birincil kaynaktan doğrulanır.
- 11 Kasım itibarıyla eksik defter yoktur; F2'nin üç yeni sayfası toplam ve
  katalogdadır.

### 4.1 Eksik defterler — tamamlandı (11 Kasım; aşağısı tarihçe)

Defteri olmayan sayfalar (`node scripts/check-site.mjs` listeler). 6–7 Kasım'da
26 ince sayfa (25'i fizik) yeniden kurulup defterlendi; ince ya da yanlış fizik
içeren bir sayfaya defter yazmak, laboratuvar bölümünü sonra yeniden yazmak
demektir. B1–B4'te 14 matematik, C'de sekiz bilgisayar bilimi ve
disiplinler arası sayfa daha yeniden kuruldu. Kalan
sayfalarda önce gerçek hesap, denetim ve ölçüm kapsamını incele; satır sayısı
tek başına kalite ölçütü değildir. Bu listedeki sayfalar kurucudan başlar:

```
A · kurucu → yazar → doğrulayıcı+editör (6'lık gruplar)
    tamamlandı (6 Kasım): akiskanlar-mekanigi tork-denge kaldirma-kuvveti basinc
    (grup A); optik-yansima-kirilma mercek-isinlari atislar cift-sarkac
    kuantum-dalga (grup A2); duran-dalgalar kirinim-izgarasi elektronik-devre
    kara-cisim-isimasi kuantum-mekanigi nukleer-fizik (grup A3, 7 Kasım);
    lorenz-cekici taylor-serisi riemann-toplamlari karmasik-sayilar
    normal-dagilim konik-kesitler (grup A4, 7 Kasım); kristal-yapilar
    denklem-denklestirme ph-indikator genetik-caprazlama av-avci-lotka-volterra
    kalp-dolasim (grup A5, 7 Kasım)
    birim-cember rastgele-yuruyus pi-yaklasimi pisagor asal-rsa lissajous
    (grup A6, 7 Kasım)
    pascal-ucgeni collatz molekul mantik-kapilari besin-agi
    (grup A7, 10 Kasım; yayında)

B · fraktallar ve görsel matematik
    tamamlandı (B1, 10 Kasım): mandelbrot-fraktali julia-fraktali
    koch-kar-tanesi hilbert-egrisi
    tamamlandı (B2, 10 Kasım):
    penrose-dosemesi barnsley-egreltiotu sierpinski-fraktali-peano-egrisi-altin-oran
    tamamlandı (B3, 10 Kasım):
    lorenz-cekici2 mandelbrot+lorenz fibo fibo+pascal
    tamamlandı (B4, 10 Kasım):
    tek-sayi-toplam3 tek-sayi-toplam4 tek-sayi-toplam5

C · bilgisayar bilimi ve disiplinler arası
    tamamlandı (C, 10 Kasım):
    fourier-ses sezar-sifre siralama-algoritmalari siralama-yarisi
    yol-bulma-algoritmalari enigma-makinesi ses-sentezleyici renk-teorisi

F1 · temel fizik ve statik
    tamamlandı (10 Kasım): elektrostatik basit-makineler statik

D · mühendislik (tamamlandı, 11 Kasım)
    elektrik-muhendisligi kimya-muhendisligi gemi-makineleri-isletme-muhendisligi
    uretim-planlama-ve-endustri-muhendisligi yoneylem-arastirmasi

E · oyunlar (tamamlandı, 11 Kasım)
    breakout formul-hafiza gezegen-savunmasi hanoi-kuleleri isik-sondurme
    mayin-tarlasi oyun-2048 snake tetris yasam-oyunu
```

Kapsam dışı (defter yazılmaz): `index`, `404`, `bilgi`, `bilim-atlasi`,
`data-stem-page` taşıyan 8 üniversite sayfası ve `atlas-experience` sınıflı
3 atlas sayfası; `shared/digest.js` bunları zaten atlar.

**Üretim hattı (her sayfa için üç bağımsız ajan, sırayla):**

1. **Yazar** — `docs/icerik-rehberi.md`, `shared/digest/sarkac.js`,
   `docs/sayfa-katalogu.md` okur; `<slug>.html`'i tamamen okur (kontroller,
   okumalar, kodun gerçekten hesapladığı şey); `shared/page-info.js` ve
   `shared/encyclopedia-topic-guides.js` içindeki eski metni kaynak olarak
   kullanıp **yükseltir**; `shared/digest/<slug>.js` yazar; laboratuvar
   deneylerinin tahmin değerlerini sayfanın koduyla (node/python) hesaplar;
   `node scripts/check-site.mjs --only <slug>` sıfır hata verene kadar
   düzeltir. Çıktı: dosya + `simulationNotes` (sayfadaki hata/zayıflıklar)
   + `uncertainties`.
2. **Doğrulayıcı (çekişmeli)** — dosyayı DÜZENLEMEZ; her iddiayı (tarih,
   sayı, formül, isim, deney tahmini, URL) çürütmeye çalışır; yalnız
   sorunları döndürür: `wrong` / `doubtful`, konum, önerilen düzeltme.
3. **Editör** — doğrulayıcının bulgularını uygular (doğrulanamayan sayı/isim
   silinir), sonra rehberin sonundaki 10 maddelik kontrol listesine göre
   1–10 puanlar ve zayıf yerleri yerinde yeniden yazar; check-site 0 hata.

Tam istem metinleri bu oturumda kullanılan İngilizce halleriyle
`docs/ajan-istemleri.md` dosyasında.

**Dikkat edilecekler (bu oturumun dersleri):**

- Sandbox'ta dış ağ kapalıydı; kaynak URL'leri doğrulanamadı. Yeni ortamda
  ağ varsa editör aşamasına "her kaynak URL'sini HEAD isteğiyle doğrula"
  adımı ekle; `openstax.org/books/...` derin bağlantılar check-site'ta uyarı
  verir, bölüm adını doğrula.
- Yazarlar sayfa kodundan türettikleri sayıları yazıyor; **simülasyon
  değişirse defterin laboratuvar bölümü de güncellenmeli.**
- Oyun sayfaları için `field: "Oyun"`; mühendislik/iktisat/hukuk sayfaları
  için `"Mühendislik"` / `"Toplum ve Ekonomi"`.
- Dosya adında `+` olan sayfalar var (`fibo+pascal`, `mandelbrot+lorenz`);
  `shared/digest.js` slug'ı `encodeURIComponent` ile yükler, dosya adı
  birebir `fibo+pascal.js` olmalı.

### 4.2 Var olan 160 defterin aşamaları — tamamlandı (11 Kasım)

11 Kasım 2026 itibarıyla 160 defterin hepsi yazar + bağımsız doğrulama + editör aşamalarından geçti. Aşağıdaki tablo 10 Kasım'daki durumu tarihçe olarak tutar; alt satırlardaki 36 defter 11 Kasım'da doğrulandı.

| Durum | Sayfalar |
|---|---|
| tam hat (yazar + doğrulama + editör) | turev, roma-hukuku, dairesel-hareket, dna-replikasyon, fonksiyon-grafigi, is-enerji, kepler-yasalari, manyetik-alan, matris-donusumleri, newton-hareket-yasalari, serbest-dusme, vektorler, yay-kutle, integral, bayes-olasilik, dalga-superpozisyonu, atom-orbitalleri, molekul-sekli, kimyasal-kinetik, asit-baz-titrasyonu, mitoz-mayoz, enzim-kinetigi, fotosentez-solunum, dogal-secilim, gunes-sistemi, ay-evreleri, yildiz-yasam-dongusu, takimyildiz-haritasi, mekatronik-muhendisligi, periyodik-tablo, grup-teorisi, cizge-teorisi, lorentz-kuvveti, klasik-girisim, fotoelektrik, radyoaktif-bozunma, termodinamik, ideal-gaz, gorelilik-uzayzaman, doppler-etkisi, alternatif-akim, elektrik-devresi-simulasyonu, akiskanlar-mekanigi, tork-denge, kaldirma-kuvveti, basinc, optik-yansima-kirilma, mercek-isinlari, atislar, cift-sarkac, kuantum-dalga, duran-dalgalar, kirinim-izgarasi, elektronik-devre, kara-cisim-isimasi, kuantum-mekanigi, nukleer-fizik, lorenz-cekici, taylor-serisi, riemann-toplamlari, karmasik-sayilar, normal-dagilim, konik-kesitler, av-avci-lotka-volterra, genetik-caprazlama, ph-indikator, kristal-yapilar, denklem-denklestirme, kalp-dolasim, birim-cember, rastgele-yuruyus, pi-yaklasimi, pisagor, asal-rsa, lissajous, pascal-ucgeni, collatz, molekul, mantik-kapilari, besin-agi, mandelbrot-fraktali, julia-fraktali, koch-kar-tanesi, hilbert-egrisi, penrose-dosemesi, barnsley-egreltiotu, sierpinski-fraktali-peano-egrisi-altin-oran, lorenz-cekici2, mandelbrot+lorenz, fibo, fibo+pascal, tek-sayi-toplam3, tek-sayi-toplam4, tek-sayi-toplam5, fourier-ses, sezar-sifre, siralama-algoritmalari, siralama-yarisi, yol-bulma-algoritmalari, enigma-makinesi, ses-sentezleyici, renk-teorisi, elektrostatik, basit-makineler, statik, mukavemet, celik-yapilar, hidrolik-sistemler, yoneylem-arastirmasi, uretim-planlama-ve-endustri-muhendisligi, elektrik-muhendisligi, kimya-muhendisligi, gemi-makineleri-isletme-muhendisligi, tetris, snake, breakout, oyun-2048, mayin-tarlasi, isik-sondurme, hanoi-kuleleri, yasam-oyunu, formul-hafiza, gezegen-savunmasi |
| yazar + editör (doğrulama yok) | altin-oran, pong |
| yalnız yazar | algoritmalar, bicimsel-diller-ve-otomata-teorisi, bilgisayar-sistemleri-ve-mimarisi, derleyici-ve-yorumlayicilar, elektrikli-araclar, elektrokimya, elektronik-muhendisligi, hesaplama-teorisi, internet-ve-ag-teknolojileri, isaretciler-ve-bellek-yonetimi, isletim-sistemleri-ve-linux, isletme-bilimi-ve-yonetim, makine-dili-assembly-c, makine-ogrenmesi-derin-ogrenme-llm, metalurji-ve-malzeme-muhendisligi, mikro-ekonomi-ve-uretim-faktorleri, otomotiv-muhendisligi, programlama-paradigmalari, siber-guvenlik, sicim-teorisi, tasarim-desenleri, ucak-muhendisligi-ve-aerodinamik, uluslararasi-iliskiler, uzay-kosucusu, veri-yapilari, veritabanlari, yazilim-muhendisligi |
| yazar sınır anında kesildi, **önce gözden geçir** (dosya check-site'tan geçiyor ama tamamlandığı belirsiz) | asteroids, maden-muhendisligi, makine-muhendisligi, makro-ekonomi-ve-para-politikalari, mantik-devresi, otonom-araclar-ve-iha, plc-hidrolik-pnomatik-cnc-cadcam |
| elle yazıldı, 7 Kasım'da doğrulayıcı + editörden geçti (referans) | sarkac |

"Yalnız yazar" satırında üniversite hedefine en yakın olanlar önce:
elektrokimya ve sicim-teorisi (temel bilim), sonra hesaplama-teorisi,
bicimsel-diller-ve-otomata-teorisi, algoritmalar, veri-yapilari. Bu
sayfaların bazılarında yanlış öğreten simülasyon hataları var (ör.
elektrokimya'da anot satırındaki işaret, bicimsel-diller'de DFA açıklaması);
`docs/simulasyon-notlari.md`'ye bak, gerekirse önce sayfayı düzelt.

### 4.3 Defterler tamamlanınca (deterministik adımlar)

```bash
node scripts/sync-meta.mjs          # eksik meta description'ları defter etiketinden yaz
                                    # (--force var olanları da değiştirir; sarkac.html'in
                                    #  açıklaması elle yazıldı, --force sonrası geri al)
npm run build                       # shared/catalog.js ve sw.js'i yenile
node scripts/check-site.mjs --require-digests
npm install && npx playwright install chromium
node scripts/smoke.mjs --digest     # 0 JS hatası, "digest yok: 0", "digest görünmüyor: 0"
node scripts/smoke.mjs --width 390  # yatay taşma listesi boş olmalı
```

Defter görünürlüğü: `body{overflow:hidden}` kullanan eski tam ekran fraktal
sayfaları (ör. altin-oran; B3
sayfaları artık normal belge akışında)
için `digest.css` gövdeyi kaydırılabilir yapar; `--digest`
testinde "görünmüyor" çıkarsa o sayfanın kendi CSS'ine bak.

### 4.4 Eski defter katmanlarını kaldır

Tüm defterler yazıldıktan sonra (yazarlar artık bu dosyaları okumayacak):

```bash
git rm shared/page-info.js shared/encyclopedia-data.js \
       shared/encyclopedia-topic-guides.js shared/encyclopedia-layer.js shared/encyclopedia-layer.css
```

`shared/app.js` bunlara artık referans vermiyor; `scripts/build-sw.mjs`
içindeki dışlama deseni (`page-info|encyclopedia-`) silinebilir. README'de
söz edilmiyor. `scripts/apply-shared-theme.py` ve `fix-chart-pages.py`
eski yardımcılar; istenirse kaldırılabilir.

### 4.5 Simülasyon iyileştirmeleri ("vay" etkisinin ikinci yarısı)

`docs/simulasyon-notlari.md` yazar ajanların sayfa kodunda bulduğu somut
hataları ve zayıflıkları listeler (ör. turev.html'de h hiç yakınsamıyor;
birçok sayfada canvas'a `var(--accent)` verilmesi — Canvas API CSS
değişkenlerini tanımaz, renkler kayboluyor; pong HUD; grup-teorisi Cayley
tablosu hataları). Öneri:

1. Önce **gerçek hataları** düzelt (canvas CSS-değişkeni renkleri tüm
   sayfalarda `grep -l "var(--" *.html | xargs grep -l "fillStyle\|strokeStyle"`
   ile bulunabilir; sabit renk ya da `getComputedStyle` kullan).
2. Sonra en çok kullanılan/temel sayfaları `sarkac.html` seviyesine çıkar.
   6–7 Kasım'da yapıldı: turev, periyodik-tablo (düzeltme ve veri), defteri
   olmayan 25 fizik sayfası (ilk turda 10, grup A'da 4, A2'de 5, A3'te 6) ve
   6 matematik sayfası (A4), 6 kimya–biyoloji sayfası (A5) ve 6 matematik sayfası
   (A6), beş karma temel bilim sayfası (A7) ve dört fraktal laboratuvarı
   (B1), üç geometri/limit laboratuvarı (B2), dört dinamik/geometri/sayım
   laboratuvarı (B3), üç hücre/fark/seri laboratuvarı (B4) ve sekiz ses/renk/
   kriptografi/algoritma laboratuvarı (C); bkz. 3. bölüm.
   Mandelbrot'un kırpılan −2 ucu, hatalı eşitlik
   kaçış testi ve eksik eksenleri B1'de düzeltildi.
   rastgele-yuruyus'taki √n karışıklığı A6'da düzeltildi.
   11 Kasım'da (G) on sekiz sayfa daha yeniden kuruldu: integral, vektorler,
   serbest-dusme, yay-kutle, newton-hareket-yasalari, dalga-superpozisyonu,
   hesaplama-teorisi, makro ve mikro ekonomi, altin-oran, elektrikli-araclar,
   otomotiv, maden, metalurji, uluslararasi-iliskiler,
   programlama-paradigmalari, veritabanlari, makine-ogrenmesi.
   11 Kasım'da (H) yirmi bir sayfa daha: elektrokimya, sicim-teorisi,
   bicimsel-diller, algoritmalar, veri-yapilari, bilgisayar mimarisi,
   assembly, isaretciler, isletim-sistemleri, derleyici, tasarim-desenleri,
   yazilim-muhendisligi, internet-ve-ag, siber-guvenlik, elektronik
   (artık analog), mantik-devresi, makine-muhendisligi, plc-cnc, ucak,
   otonom, isletme. 12 Kasım'da (I) son 24 eski temel sayfa da yeniden
   kuruldu (fizik/gökbilim 8, matematik/kimya 8, biyoloji/mekatronik 8; ayrıntı
   `docs/simulasyon-notlari.md` → "I"). 12 Kasım'da (J) `docs/YENI-SAYFA-PLANI.md`
   1. aşama grup A: sekiz STEM Omurgası sayfası standart kabuğa geçti ve defterlendi. Aynı gün (K) grup B: 3 Bilim Atlası
   dersi taşındı ve "Yer ve Çevre Bilimleri" kategorisi 5 sayfayla açıldı. Aynı gün (L) 2. aşamanın ilk grubu:
   matematik/istatistik ve biyolojide 9 yeni sayfa. **Sırada**: 2. aşama, fizik ve kimya (8 yeni sayfa). Bir sayfa yeniden kurulursa
   G hattı uygulanır ve ona bağlanan defterlerin başlık/gerekçeleri taranır.
3. Her değişiklikten sonra ilgili defterin laboratuvar sayılarını yeniden
   hesapla; `node scripts/smoke.mjs --only <slug>` ve ekran görüntüsü.

### 4.6 Kapanış

- Hesaplar ve Firebase istemcisi 10 Kasım'da kaldırıldı. Eski Git geçmişi
  ve önceden yazılmış uzak veriler yeniden yazılmadı/silinmedi. Yeni sürüm
  bu verileri okumaz veya güncellemez; oyun kayıtları cihazda tutulur.
- Yerel `main` commit'lerini her tamamlanmış kodlama turunda `origin/main`'e
  gönder; kullanıcı 10 Kasım'da bu düzeni açıkça yetkilendirdi.
- **Yayın (GitHub Actions kullanılamıyor):** CI'ın yaptığını yerelde
  `scripts/deploy-manual.sh` yapar: check-site → katalog/sw `--check` →
  smoke → `_site` paketi. `npm run deploy:check` yalnız denetler ve paketler;
  `npm run deploy` commit'lenmiş hâli `gh-pages` dalına zorla gönderir.
  Tek seferlik ayar: Settings → Pages → Source = "Deploy from a branch",
  Branch = `gh-pages` / (root). 11 Kasım'dan beri betik de
  `--require-digests` ile çalışır: defteri olmayan sayfa yayına çıkmaz.

## 5. Kalite çıtası (kısa hatırlatma)

Defter = kanca (soru/sahne, tanım değil) → büyük fikir (tek cümle) → hikâye
(gerçek insanlar, tarihler, sayılar; efsane ile kanıt ayrı) → 3–5 kavram
kartı (formül + not) → sayfanın GERÇEK kontrolleriyle 3–4 deney
(Tahmin→Dene→Gözle→Açıkla, hesaplanmış sayılar) → 3 "vay" → çözümlü örnek
(birimli) → yanılgılar → sözlük → üniversiteye köprü → 3 soruluk sınav →
sonraki duraklar (var olan sayfalar) → izinli alan adlarından kaynaklar.
Türkçe, sıcak, kesin; uydurma sayı/isim/URL yok.
