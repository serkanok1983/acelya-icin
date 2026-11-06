# Devam Planı — Açelya'nın Yeri (ajan devir belgesi)

Bu belge, projeyi bir sonraki ajanın (veya insanın) kaldığı yerden
sürdürebilmesi için yazıldı. Önce **Hedef** ve **Mevcut durum** bölümlerini,
sonra **Yapılacaklar**'ı oku. Teknik ayrıntılar için `README.md`, içerik
standardı için `docs/icerik-rehberi.md`.

Dal: `main` (eski `claude/zealous-archimedes-iwjhpu` dalı main'e birleşmiş durumda).
6 Kasım oturumunun commit'leri yereldedir; `origin/main`'e gönderilmedi.
Son durum tarihi: 2026-11-06.

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
| Ortak kabuk | `shared/app.js`, `shared/theme.css` | üst çubuk, tema, yıldızlar, PWA, **giriş kapısı** (oturum yoksa index.html'e yönlendirir) |
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
- Teknik: giriş kapısı tüm sayfalarda, 404.html, eksik viewport'lar,
  sürümsüz echarts sabitlendi, 3 gerçek JS hatası düzeltildi
  (kristal-yapilar NaN, elektrik-devresi null chart, mantik-devresi kapsam),
  21 sayfada mobil yatay taşma giderildi (theme.css canvas kuralı + 7 sayfa
  tek tek). Duman testi: 168 sayfada 0 JS hatası.
- Service worker yeniden yazıldı; CI'da denetim adımı; README.
- Keşif Defteri altyapısı + 83 defter (aşağıda durum tablosu).
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

### 4.1 Kalan 71 sayfa için defter yaz (üniversite hedefine göre sıralı)

Defteri olmayan sayfalar (`node scripts/check-site.mjs` listeler). 6 Kasım'da
11 ince fizik sayfası yeniden kurulup defterlendi; ince ya da yanlış fizik
içeren bir sayfaya defter yazmak, laboratuvar bölümünü sonra yeniden yazmak
demektir. Bu yüzden sıra:

```
A · kurucu → yazar → doğrulayıcı+editör (ince temel fizik sayfaları;
    önce incele, gerekirse yeniden kur; akiskanlar-mekanigi, tork-denge,
    kaldirma-kuvveti ve basinc 6 Kasım'da tamamlandı)
    optik-yansima-kirilma mercek-isinlari atislar cift-sarkac kuantum-dalga

B · yazar → doğrulayıcı+editör (temel bilim; yazar BLOCKER bulursa kurucuya)
    fizik:    duran-dalgalar kirinim-izgarasi elektronik-devre kara-cisim-isimasi
              kuantum-mekanigi nukleer-fizik mantik-kapilari molekul
    matematik: taylor-serisi riemann-toplamlari karmasik-sayilar normal-dagilim
              konik-kesitler birim-cember lorenz-cekici rastgele-yuruyus
              pi-yaklasimi pisagor asal-rsa lissajous pascal-ucgeni collatz
    kimya:    kristal-yapilar denklem-denklestirme ph-indikator
    biyoloji: genetik-caprazlama av-avci-lotka-volterra kalp-dolasim besin-agi

C · fraktallar ve görsel matematik
    mandelbrot-fraktali julia-fraktali koch-kar-tanesi hilbert-egrisi
    penrose-dosemesi barnsley-egreltiotu sierpinski-fraktali-peano-egrisi-altin-oran
    lorenz-cekici2 mandelbrot+lorenz fibo fibo+pascal
    tek-sayi-toplam3 tek-sayi-toplam4 tek-sayi-toplam5

D · bilgisayar bilimi ve disiplinler arası
    fourier-ses sezar-sifre siralama-algoritmalari siralama-yarisi
    yol-bulma-algoritmalari enigma-makinesi ses-sentezleyici renk-teorisi

E · mühendislik
    elektrik-muhendisligi kimya-muhendisligi gemi-makineleri-isletme-muhendisligi
    uretim-planlama-ve-endustri-muhendisligi yoneylem-arastirmasi

F · oyunlar
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

### 4.2 Var olan 83 defterin eksik aşamalarını tamamla

Bekleyen doğrulama bulgusu kalmadı. Durum (6 Kasım 2026):

| Durum | Sayfalar |
|---|---|
| tam hat (yazar + doğrulama + editör) | turev, roma-hukuku, dairesel-hareket, dna-replikasyon, fonksiyon-grafigi, is-enerji, kepler-yasalari, manyetik-alan, matris-donusumleri, newton-hareket-yasalari, serbest-dusme, vektorler, yay-kutle, integral, bayes-olasilik, dalga-superpozisyonu, atom-orbitalleri, molekul-sekli, kimyasal-kinetik, asit-baz-titrasyonu, mitoz-mayoz, enzim-kinetigi, fotosentez-solunum, dogal-secilim, gunes-sistemi, ay-evreleri, yildiz-yasam-dongusu, takimyildiz-haritasi, mekatronik-muhendisligi, periyodik-tablo, grup-teorisi, cizge-teorisi, lorentz-kuvveti, klasik-girisim, fotoelektrik, radyoaktif-bozunma, termodinamik, ideal-gaz, gorelilik-uzayzaman, doppler-etkisi, alternatif-akim, elektrik-devresi-simulasyonu, akiskanlar-mekanigi, tork-denge, kaldirma-kuvveti, basinc |
| yazar + editör (doğrulama yok) | altin-oran, pong |
| yalnız yazar | algoritmalar, bicimsel-diller-ve-otomata-teorisi, bilgisayar-sistemleri-ve-mimarisi, derleyici-ve-yorumlayicilar, elektrikli-araclar, elektrokimya, elektronik-muhendisligi, hesaplama-teorisi, internet-ve-ag-teknolojileri, isaretciler-ve-bellek-yonetimi, isletim-sistemleri-ve-linux, isletme-bilimi-ve-yonetim, makine-dili-assembly-c, makine-ogrenmesi-derin-ogrenme-llm, metalurji-ve-malzeme-muhendisligi, mikro-ekonomi-ve-uretim-faktorleri, otomotiv-muhendisligi, programlama-paradigmalari, siber-guvenlik, sicim-teorisi, tasarim-desenleri, ucak-muhendisligi-ve-aerodinamik, uluslararasi-iliskiler, uzay-kosucusu, veri-yapilari, veritabanlari, yazilim-muhendisligi |
| yazar sınır anında kesildi, **önce gözden geçir** (dosya check-site'tan geçiyor ama tamamlandığı belirsiz) | asteroids, maden-muhendisligi, makine-muhendisligi, makro-ekonomi-ve-para-politikalari, mantik-devresi, otonom-araclar-ve-iha, plc-hidrolik-pnomatik-cnc-cadcam |
| elle yazıldı (referans) | sarkac |

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
sayfaları (altin-oran, barnsley-egreltiotu, hilbert-egrisi, koch-kar-tanesi,
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
   6 Kasım'da yapıldı: turev, ideal-gaz, periyodik-tablo (düzeltme ve veri)
   ve defteri olmayan 10 fizik sayfası (bkz. 3. bölüm). Sırada defteri olan
   ama laboratuvarı zayıf temel sayfalar: integral, vektorler, serbest-dusme,
   yay-kutle, newton-hareket-yasalari. Bunlar yeniden kurulursa
   defterlerinin laboratuvar bölümü de yeniden yazılmalı (kurucu raporu ile).
3. Her değişiklikten sonra ilgili defterin laboratuvar sayılarını yeniden
   hesapla; `node scripts/smoke.mjs --only <slug>` ve ekran görüntüsü.

### 4.6 Kapanış

- Firebase Realtime Database kuralları konsoldan sıkılaştırılmalı
  (`shared/firebase-config.example.js` içindeki öneri); repodan yapılamaz.
- Yerel `main` commit'lerini `origin/main`'e gönder (sahibinin onayıyla).
- **Yayın (GitHub Actions kullanılamıyor):** CI'ın yaptığını yerelde
  `scripts/deploy-manual.sh` yapar: check-site → katalog/sw `--check` →
  smoke → `_site` paketi. `npm run deploy:check` yalnız denetler ve paketler;
  `npm run deploy` commit'lenmiş hâli `gh-pages` dalına zorla gönderir.
  Tek seferlik ayar: Settings → Pages → Source = "Deploy from a branch",
  Branch = `gh-pages` / (root). Not: betik `--require-digests` kullanmaz
  (71 sayfanın defteri henüz yok); workflow'daki katı denetim tüm defterler
  bitince geçer.

## 5. Kalite çıtası (kısa hatırlatma)

Defter = kanca (soru/sahne, tanım değil) → büyük fikir (tek cümle) → hikâye
(gerçek insanlar, tarihler, sayılar; efsane ile kanıt ayrı) → 3–5 kavram
kartı (formül + not) → sayfanın GERÇEK kontrolleriyle 3–4 deney
(Tahmin→Dene→Gözle→Açıkla, hesaplanmış sayılar) → 3 "vay" → çözümlü örnek
(birimli) → yanılgılar → sözlük → üniversiteye köprü → 3 soruluk sınav →
sonraki duraklar (var olan sayfalar) → izinli alan adlarından kaynaklar.
Türkçe, sıcak, kesin; uydurma sayı/isim/URL yok.
