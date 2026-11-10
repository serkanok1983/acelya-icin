# Devam Planı — Açelya'nın Yeri (ajan devir belgesi)

Bu belge, projeyi bir sonraki ajanın (veya insanın) kaldığı yerden
sürdürebilmesi için yazıldı. Önce **Hedef** ve **Mevcut durum** bölümlerini,
sonra **Yapılacaklar**'ı oku. Teknik ayrıntılar için `README.md`, içerik
standardı için `docs/icerik-rehberi.md`.

Dal: `main` (eski `claude/zealous-archimedes-iwjhpu` dalı main'e birleşmiş durumda).
6–7 Kasım oturumunun commit'leri `origin/main`'e gönderildi ve `gh-pages`'te yayında.
Son durum tarihi: 2026-11-10 (B1: dört fraktal laboratuvarı ve girişsiz kullanım tamamlandı).
A7 (`1101d98`) `origin/main`'e gönderildi ve elle yayımlandı; canlı
service worker sürümü `acelya-ffaf483948` ile doğrulandı.
B1'in yeni yayın paketi `acelya-6d47d9ffc0` sürümündedir; canlı kapanış
kontrolünde bu sürümü karşılaştır. Sıradaki grup B'nin kalan sayfalarıdır.

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
- Keşif Defteri altyapısı + 121 defter (85 doğrulayıcı/editör aşamasından geçti; aşağıda durum tablosu).
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

### 4.1 Kalan 33 sayfa için defter yaz (üniversite hedefine göre sıralı)

Defteri olmayan sayfalar (`node scripts/check-site.mjs` listeler). 6–7 Kasım'da
26 ince sayfa (25'i fizik) yeniden kurulup defterlendi; ince ya da yanlış fizik
içeren bir sayfaya defter yazmak, laboratuvar bölümünü sonra yeniden yazmak
demektir. Kalan temel bilim sayfalarının hepsi ince: 150–680 satır, en çok 6
denetim (yeniden kurulan laboratuvarlar 1800–2000 satır; `lorenz-cekici` 87
satır, tek düğme ve CDN). Bu yüzden hepsi kurucudan başlar:

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
    sırada:
    penrose-dosemesi barnsley-egreltiotu sierpinski-fraktali-peano-egrisi-altin-oran
    lorenz-cekici2 mandelbrot+lorenz fibo fibo+pascal
    tek-sayi-toplam3 tek-sayi-toplam4 tek-sayi-toplam5

C · bilgisayar bilimi ve disiplinler arası
    fourier-ses sezar-sifre siralama-algoritmalari siralama-yarisi
    yol-bulma-algoritmalari enigma-makinesi ses-sentezleyici renk-teorisi

D · mühendislik
    elektrik-muhendisligi kimya-muhendisligi gemi-makineleri-isletme-muhendisligi
    uretim-planlama-ve-endustri-muhendisligi yoneylem-arastirmasi

E · oyunlar
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

### 4.2 Var olan 121 defterin eksik aşamalarını tamamla

A7 ve B1 doğrulama bulguları kapatıldı. Eski 36 defterin eksik aşamaları aşağıda. Durum (10 Kasım 2026):

| Durum | Sayfalar |
|---|---|
| tam hat (yazar + doğrulama + editör) | turev, roma-hukuku, dairesel-hareket, dna-replikasyon, fonksiyon-grafigi, is-enerji, kepler-yasalari, manyetik-alan, matris-donusumleri, newton-hareket-yasalari, serbest-dusme, vektorler, yay-kutle, integral, bayes-olasilik, dalga-superpozisyonu, atom-orbitalleri, molekul-sekli, kimyasal-kinetik, asit-baz-titrasyonu, mitoz-mayoz, enzim-kinetigi, fotosentez-solunum, dogal-secilim, gunes-sistemi, ay-evreleri, yildiz-yasam-dongusu, takimyildiz-haritasi, mekatronik-muhendisligi, periyodik-tablo, grup-teorisi, cizge-teorisi, lorentz-kuvveti, klasik-girisim, fotoelektrik, radyoaktif-bozunma, termodinamik, ideal-gaz, gorelilik-uzayzaman, doppler-etkisi, alternatif-akim, elektrik-devresi-simulasyonu, akiskanlar-mekanigi, tork-denge, kaldirma-kuvveti, basinc, optik-yansima-kirilma, mercek-isinlari, atislar, cift-sarkac, kuantum-dalga, duran-dalgalar, kirinim-izgarasi, elektronik-devre, kara-cisim-isimasi, kuantum-mekanigi, nukleer-fizik, lorenz-cekici, taylor-serisi, riemann-toplamlari, karmasik-sayilar, normal-dagilim, konik-kesitler, av-avci-lotka-volterra, genetik-caprazlama, ph-indikator, kristal-yapilar, denklem-denklestirme, kalp-dolasim, birim-cember, rastgele-yuruyus, pi-yaklasimi, pisagor, asal-rsa, lissajous, pascal-ucgeni, collatz, molekul, mantik-kapilari, besin-agi, mandelbrot-fraktali, julia-fraktali, koch-kar-tanesi, hilbert-egrisi |
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

Defter görünürlüğü: `body{overflow:hidden}` kullanan tam ekran fraktal
sayfaları (altin-oran, barnsley-egreltiotu,
lorenz-cekici2, mandelbrot+lorenz, penrose-dosemesi, sierpinski-…,
fibo+pascal) için `digest.css` gövdeyi kaydırılabilir yapar; `--digest`
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
   (B1); bkz. 3. bölüm. Mandelbrot'un kırpılan −2 ucu, hatalı eşitlik
   kaçış testi ve eksik eksenleri B1'de düzeltildi.
   rastgele-yuruyus'taki √n karışıklığı A6'da düzeltildi.
   Sırada defteri olan
   ama laboratuvarı zayıf temel sayfalar: integral, vektorler, serbest-dusme,
   yay-kutle, newton-hareket-yasalari, dalga-superpozisyonu (aynı yönlü iki
   dalga, faz denetimi yok; duran dalgaların ön koşulu). Bunlar yeniden kurulursa
   defterlerinin laboratuvar bölümü de yeniden yazılmalı (kurucu raporu ile).
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
  Branch = `gh-pages` / (root). Not: betik `--require-digests` kullanmaz
  (33 sayfanın defteri henüz yok); workflow'daki katı denetim tüm defterler
  bitince geçer.

## 5. Kalite çıtası (kısa hatırlatma)

Defter = kanca (soru/sahne, tanım değil) → büyük fikir (tek cümle) → hikâye
(gerçek insanlar, tarihler, sayılar; efsane ile kanıt ayrı) → 3–5 kavram
kartı (formül + not) → sayfanın GERÇEK kontrolleriyle 3–4 deney
(Tahmin→Dene→Gözle→Açıkla, hesaplanmış sayılar) → 3 "vay" → çözümlü örnek
(birimli) → yanılgılar → sözlük → üniversiteye köprü → 3 soruluk sınav →
sonraki duraklar (var olan sayfalar) → izinli alan adlarından kaynaklar.
Türkçe, sıcak, kesin; uydurma sayı/isim/URL yok.
