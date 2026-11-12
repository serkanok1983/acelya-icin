# Yeni sayfa planı (taslak, 11 Kasım 2026)

Durum: 175 sayfanın hepsi artık aynı biçimde. Her sayfada çok sekmeli bir laboratuvar var; dondurulmuş bir
hesap çekirdeği, kalıcı bir test (`scripts/check-g-*`) ve bağımsız olarak doğrulanmış bir Keşif Defteri ile
geliyor. İki istisna var: aşağıdaki 1. aşamadaki 11 sayfa ve oyunlar. Bu belge sıradaki büyümeyi aynı
biçimde planlar. Kullanıcı 12 Kasım'da planı onayladı.

## Üretim hattı (değişmez)

Her yeni sayfa G/H turlarındaki hattan geçer:

1. **Kurucu.** `.shots/briefs/_kurucu-ortak.md` ve sayfaya özel bir özet. Sayfa 4 sekmeli olur;
   çekirdek `window.*Lab` olarak dışa açılır. Kurucu ayrıca `check-g-<slug>.mjs` testini ve
   `.shots/briefs/<slug>.md` raporunu yazar.
2. **Farklı bir yazar.** `_yazar-ortak.md` ile `shared/digest/<slug>.js` defterini yazar.
3. **Üçüncü, bağımsız doğrulayıcı ve editör.** `_dogrulayici-ortak.md` ile bilimi kendi koduyla yeniden
   türetir, her sayıyı tarayıcıda canlı olarak doğrular ve tarih ile atıfları çürütmeye çalışır.

Yeni sayfa için ek adımlar:

- `index.html` menüsüne kart eklenir.
- `docs/sayfa-katalogu.md` güncellenir.
- Komşu sayfaların defterlerine "sonraki durak" bağlantısı eklenir.
- `npm run build` ve `scripts/sync-meta.mjs` çalıştırılır.
- Kategori değişirse `scripts/build-catalog.mjs` güncellenir.

Gruplar 8'er sayfadır. Her grup bitince ortak denetimler çalıştırılır; commit ve yayın yalnızca onayla
yapılır.

## 1. aşama: eski biçimde kalan 11 sayfayı taşımak (öncelik: yüksek)

Bu sayfalar ayrı bir "Bilim Atlası / STEM Omurgası" sisteminde duruyor. İçeriklerini
`shared/stem-content.js`, `stem-bridge.js` ve `atlas.js` dosyalarından alıyorlar, Google Fonts
kullanıyorlar ve Keşif Defterleri yok (smoke raporundaki "digest yok" listesi).

| Sayfa | Önerilen laboratuvar sekmeleri |
|---|---|
| `lineer-cebir-ve-ozdegerler` | Gauss eleme ve rank · alt uzaylar ve çekirdek · özdeğerler ve köşegenleştirme (3×3) · en küçük kareler ve QR/SVD |
| `cok-degiskenli-kalkulus` | kısmi türev ve gradyan alanı · yönlü türev ve teğet düzlem · Lagrange çarpanları · çift integral (Riemann → kutupsal) |
| `diferansiyel-denklemler` | yön alanı ve Euler/RK4 hata mertebesi · doğrusal sistemler ve faz portresi · denge kararlılığı (Jacobian) · ikinci mertebe ve rezonans |
| `maxwell-denklemleri-ve-alanlar` | Gauss yasası (akı sayımı) · Faraday ve indüksiyon özeti · yer değiştirme akımı · 1-B FDTD ile EM dalga, c = 1/√(μ₀ε₀) ölçümü |
| `entropi-ve-istatistiksel-fizik` | mikro durum sayımı ve S = k ln W · Boltzmann dağılımı (Monte Carlo) · Ising modeli ve faz geçişi · serbest genleşme ve geri dönüşsüzlük |
| `kimyasal-denge-ve-gibbs-enerjisi` | Q ve K, Le Chatelier · ΔG° = −RT ln K · van 't Hoff ve sıcaklık · çözünürlük ve ortak iyon |
| `gen-ifadesi-ve-molekuler-biyoloji` | transkripsiyon ve çeviri (kodon tablosu) · mutasyonun proteine etkisi · lac operon mantığı · gen ağı ve geri besleme (anahtar/salınıcı) |
| `algoritma-karmasikligi` | büyüme sınıfları ve ölçülen sayım · P, NP ve indirgeme (3-SAT → klik, küçük boyut) · NP-tam bir problemin kaba kuvvet patlaması · yaklaşık algoritmalar ve oran |
| `bilimsel-yontem-olcme-ve-belirsizlik` | anlamlı basamak ve yuvarlama · belirsizlik yayılımı (formül ve Monte Carlo) · sistematik ve rastgele hata · grafik uydurma ve artıklar |
| `hareket-ve-grafikler` | x–t, v–t, a–t okuma · eğim ve alan · hareket dedektörü benzetimi · grafikten harekete bulmacası |
| `momentum-itme-ve-carpismalar` | itme–momentum (F–t alanı) · esnek ve esnek olmayan çarpışma (1-B) · 2-B çarpışma ve kütle merkezi · roket denklemi |

Not: `momentum-itme-ve-carpismalar` ile mevcut fizik sayfaları, `diferansiyel-denklemler` ile
`lorenz-cekici` ve `av-avci-lotka-volterra` arasında çakışma denetimi yapılmalı. Bilim Atlası haritası
(`bilim-atlasi.html`) ve `bilgi.html` gezinme sayfası olarak kalır.

## 2. aşama: kapsam boşlukları (yeni sayfalar)

Önerilen yeni kategori **Yer ve Çevre Bilimleri** (şu an hiç yok). Ötekiler mevcut kategorileri
tamamlar. Her biri 4 sekmeli laboratuvar.

**Yer ve çevre bilimleri (5)**
- `depremler-ve-sismik-dalgalar`: P ve S dalgaları, üç istasyondan merkez üssü, büyüklük–enerji, Gutenberg–Richter.
- `levha-tektonigi`: yayılma hızı, manyetik şeritler, sıcak nokta zinciri yaşları, izostazi.
- `iklim-ve-sera-etkisi`: enerji dengesi ve katmanlı atmosfer, radyatif zorlama, geri beslemeler. Model olarak sunulur; güncel siyasa yorumu yok.
- `atmosfer-ve-hava`: kuru ve nemli adyabatik soğuma, çiğ noktası, bulut tabanı, basınç sistemleri, Coriolis.
- `okyanus-ve-gelgitler`: gelgit kuvveti, Ay ve Güneş katkısı, sızıntı ve tuzluluk, derin su dalgaları.

**Matematik ve istatistik (5)**
- `hipotez-testi-ve-guven-araligi`: örnekleme dağılımı, p-değeri, I./II. tür hata, güç.
- `regresyon-ve-korelasyon`: en küçük kareler, R², artık incelemesi, aykırı değer etkisi, korelasyon ≠ nedensellik.
- `kombinatorik-ve-sayma`: permütasyon ve kombinasyon sayımı, güvercin yuvası, içerme–dışlama, Catalan.
- `sayisal-analiz`: kök bulma (bisection, Newton, yakınsama mertebesi), kayan nokta hataları, sayısal türev ve integral hatası.
- `optimizasyon-ve-gradyan-inisi`: dışbükeylik, öğrenme oranı, momentum, yerel minimumlar, doğrusal programlamaya köprü.

**Fizik (4)**
- `elektromanyetik-dalgalar-ve-polarizasyon`: Malus yasası, Brewster açısı, dairesel polarizasyon.
- `yari-iletkenler-ve-bant-yapisi`: bant aralığı, katkılama, Fermi düzeyi, p–n eklemi (elektronik sayfasına köprü).
- `lazer-ve-uyarilmis-salim`: Einstein katsayıları, nüfus terslenmesi, üç ve dört düzeyli sistemler.
- `yenilenebilir-enerji`: rüzgâr gücü (Betz sınırı), güneş paneli I–V ve verim, hidroelektrik.

**Kimya (4)**
- `termokimya-ve-hess-yasasi`: kalorimetre, ΔH döngüleri, bağ enerjileri.
- `cozeltiler-ve-koligatif-ozellikler`: Raoult yasası, kaynama ve donma noktası, osmotik basınç, van 't Hoff faktörü.
- `spektroskopi-beer-lambert`: absorbans–derişim, kalibrasyon doğrusu, IR ve UV tepe okuma.
- `organik-kimya-ve-izomeri`: fonksiyonel gruplar, yapı izomerleri sayımı, kiralite (molekül şekli sayfasıyla bağlantılı).

**Biyoloji (4)**
- `sinir-hucresi-ve-aksiyon-potansiyeli`: Nernst ve GHK, Hodgkin–Huxley benzetimi, eşik, refrakter dönem.
- `salgin-modelleri-sir`: R₀, sürü bağışıklığı eşiği, aşılama, tohumlu stokastik SIR. Model olarak sunulur; tıbbi tavsiye yok.
- `nufus-ekolojisi`: üstel ve lojistik büyüme, taşıma kapasitesi, yaş yapısı ve Leslie matrisi.
- `homeostaz-ve-geri-besleme`: glukoz–insülin, sıcaklık düzenlemesi, negatif ve pozitif geri besleme.

**Disiplinlerarası ve mühendislik (6)**
- `bilgi-kuramı-ve-sikistirma`: Shannon entropisi, Huffman kodu, kanal kapasitesi.
- `sinyal-isleme-ve-modulasyon`: örnekleme ve Nyquist, FFT, AM ve FM, sayısal süzgeç.
- `kontrol-kurami`: transfer fonksiyonu, kök yeri, Bode ve faz payı.
- `robotik-ve-kinematik`: iki eklemli kolda ileri ve ters kinematik, Jacobian ve tekillik.
- `kuantum-hesaplama`: kübit ve Bloch küresi, kapılar, Deutsch–Jozsa, Grover adım sayısı.
- `oyun-kurami`: Nash dengesi, tutuklu ikilemi turnuvası, karma stratejiler. Model ve okullar olarak sunulur; yansız.

Toplam: 1. aşamada 11, 2. aşamada 28 sayfa. Sekizerli 5 grup olur; her grup bir oturumda tamamlanabilir.

## Sıralama önerisi

1. **1. aşama, grup A:** 8 STEM Omurgası sayfası (lineer cebir … algoritma karmaşıklığı). ✔ 12 Kasım (J; `docs/simulasyon-notlari.md`).
2. **1. aşama, grup B:** 3 Bilim Atlası dersi, artı Yer bilimlerinden 5 sayfa. Yeni kategori ve menü düzeni bu grupta kurulur. ✔ 12 Kasım (K).
3. **2. aşama:** matematik/istatistik ile biyoloji (listede 9 sayfa). ✔ 12 Kasım (L).
4. **2. aşama:** fizik ile kimya (8).
5. **2. aşama:** disiplinlerarası ve mühendislik (6), artı ilk dört grupta biriken düzeltmeler.

## Kararlar (kullanıcı, 12 Kasım 2026)

- "Yer ve Çevre Bilimleri" ayrı bir menü kategorisi olacak.
- STEM Omurgası ve Bilim Atlası dersleri standart laboratuvar kabuğuna geçecek; atlas haritası (`bilim-atlasi.html`) kalır.
- Plan bu sırayla başlıyor: önce 1. aşama, grup A (8 STEM Omurgası sayfası).

## Küçük açık işler (bir sonraki turda)

- `fonksiyon-grafigi`: `1e3` bilimsel gösterimi 1·e·3 diye okunuyor. Sözdizimi kutusunda belirtilmeli ya da desteklenmeli.
- Seyrek piksel örneklemli tuval denetimi 24 testte duruyor (bkz. `docs/simulasyon-notlari.md`, H test notu). Hepsi bütün pikselleri sayan bir ortak yardımcıya taşınmalı.
- `kimyasal-denge-ve-gibbs-enerjisi`: çözünürlük sekmesinde 0,010 M Cl⁻ varsayılanında iyonik şiddet
  uyarısı tam eşiğin üstünde (I = 0,0100000160 > 0,01). Eşik biraz değişirse uyarı kaybolur; eşik ya da
  varsayılan bilinçli seçilmeli.
- `cok-degiskenli-kalkulus`: türev metni bazen sadeleşmemiş görünüyor (`2x^(−2 − 1)`); matematik doğru.
- `lineer-cebir-ve-ozdegerler`: en küçük kareler grafiğinde eksen etiketleri yuvarlanıyor (0,75 → "0,8").
- `kara-cisim-isimasi`: Mars yüzey sıcaklığı 208 K; NASA Mars bilgi sayfası şimdi ≈ 214 K veriyor
  (`iklim-ve-sera-etkisi` kurucusunun notu). Kaynak açılıp güncellenmeli.
- `diferansiyel-denklemler`: ifade ipucu `log`, `sinh`, `cosh` desteğini söylemiyor; LV satırında karışık
  hassasiyet ("×1.00" / "×1.0").

- `homeostaz-ve-geri-besleme`: ateş senaryosunda ayar noktası sıçraması son RK4 aşamasına düşüyor (terleme tepesi
  404 W, ince adımla 407 W; ≈ %1). Çekirdek dondurulmuş; sıçramayı adım sınırına hizalamak gerekir.
- `sinir-hucresi-ve-aksiyon-potansiyeli`: "sürekli ateşleme eşiği 6,228" 400 ms protokolünden; 3 s'de ≈ 6,234 µA/cm².
  Başlık metni protokolü söylüyor; uzun protokol seçeneği eklenebilir.

## Uzun vadeli vizyon (kullanıcı, 12 Kasım 2026)

Bu plan tamamlandıktan sonra kapsam STEM'in ötesine genişleyecek. Ölçüt: teorisi olan, okunmaya ve öğrenilmeye
değer her alan. Kullanıcının saydığı alanlar: felsefe, tarih, sosyoloji, antropoloji, paleontoloji, psikoloji,
psikiyatri, sanat, edebiyat, dilbilim, etimoloji, bilim tarihi, sinema, müzik, teoloji, bilinç, yapay zekâ,
anatomi, fizyoloji vb.

İlkeler (taslak):
- Aynı biçim korunur: her sayfada ölçülebilir ya da modellenebilir deneyleri olan bir laboratuvar ve bağımsız olarak
  doğrulanmış bir Keşif Defteri bulunur. Bu alanlarda "laboratuvar"ın ne olacağı sayfa sayfa düşünülür (örnekler:
  dilbilimde ses değişimi kuralları ve Zipf yasası, müzikte akort ve armoni oranları, paleontolojide radyometrik
  tarihleme, fizyolojide dolaşım ve solunum modelleri, psikolojide algı ve karar deneyleri, tarihte nüfus ve veri okuma).
- Yansızlık kuralları ekonomi ve uluslararası ilişkiler sayfalarındaki kadar katı uygulanır: okullar ve yorumlar
  okul olarak sunulur; inanç ve teoloji konuları saygılı ve betimleyici anlatılır; psikiyatri ve tıp sayfaları tıbbi
  tavsiye vermez.
- Ayrıntılı alan planı, bu belgedeki STEM planı bittiğinde ayrı bir belge olarak yazılır.
