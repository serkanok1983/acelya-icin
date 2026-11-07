# Açelya'nın Yeri — Temel Bilimler Atlası

Liseden üniversite temellerine uzanan, Türkçe, etkileşimli bir bilim
ansiklopedisi. Matematik, fizik, kimya, biyoloji, bilgisayar bilimi,
yer-uzay bilimleri ve mühendislik konuları; her biri çalışan bir
simülasyon ya da oyunla, altında da katmanlı bir **Keşif Defteri** ile
sunulur. Amaç bilgi vermekten öte merak uyandırmak: tahmin et, dene,
gözle, açıkla.

Serkan ❤️ Açelya

## Sayfa anatomisi

Her konu sayfası iki katmandan oluşur:

1. **Laboratuvar** — sayfanın kendi simülasyonu ya da oyunu (`<slug>.html`).
2. **Keşif Defteri** — sayfanın altına `shared/digest.js` tarafından
   `shared/digest/<slug>.js` verisinden üretilen içerik: kanca, büyük fikir,
   hikâye, kavramlar, simülasyonda yapılacak deneyler, "vay" notları,
   çözümlü örnek, yanılgılar, sözlük, üniversiteye köprü, geri bildirimli
   mini sınav, sonraki duraklar ve kaynaklar. Yazım standardı ve şema:
   [`docs/icerik-rehberi.md`](docs/icerik-rehberi.md); örnek:
   [`shared/digest/sarkac.js`](shared/digest/sarkac.js).

Ortak kabuk (`shared/app.js`, `shared/theme.css`) üst çubuğu, temayı,
yıldız arka planını, PWA kaydını ve giriş kapısını sağlar. Oyun sayfaları
ayrıca skor tablosu, mobil kontroller ve ses katmanını yükler.

## Yapı

```
index.html              giriş + ana menü (kategoriler, arama)
bilim-atlasi.html       kavram haritası ve ön koşullu rotalar
<slug>.html             konu sayfaları (simülasyon / oyun)
shared/                 ortak kabuk, atlas, STEM omurgası, oyun katmanı
shared/digest/          sayfa başına Keşif Defteri verisi
docs/                   içerik rehberi ve sayfa kataloğu
scripts/                denetim ve bakım betikleri
sw.js                   service worker (listeleri scripts/build-sw.mjs üretir)
```

## Geliştirme

Derleme adımı yoktur; statik bir sunucu yeter:

```bash
npm start            # python3 -m http.server 8000 → http://localhost:8000/
```

Denetimler (Node 22+):

```bash
npm run check        # bağlantılar, meta etiketleri, defter şeması, sw listesi
npm run build:sw     # sw.js önbellek listelerini ve sürüm adını yeniler
npm install && npx playwright install chromium
npm run smoke        # her sayfayı Chromium'da açar; JS hatası ve defter görünürlüğü
npm run shot -- sarkac --theme light --scroll digest   # ekran görüntüsü
```

Yeni bir konu eklerken:

1. `<slug>.html` sayfasını yaz (`<body class="app-page" data-page="<slug>">`,
   `shared/theme.css` ve `shared/app.js` dahil).
2. `index.html` içindeki `MENU` listesine ekle.
3. `shared/digest/<slug>.js` defterini içerik rehberine göre yaz.
4. `npm run check` ve `npm run build:sw` çalıştır.

## Dağıtım

`main` dalına her push, GitHub Actions ile önce denetim ve tarayıcı duman
testini çalıştırır, sonra GitHub Pages'e dağıtır
(`.github/workflows/deploy-pages.yml`). Repo ayarlarında Pages → Source:
GitHub Actions seçili olmalıdır.

## Gizlilik ve hesaplar

Giriş kartı `shared/auth.js` içindeki aile hesaplarını kullanır; sayfalar
oturum yoksa ana sayfaya yönlendirir. İlerleme, sınav sonuçları ve tema
tercihi yalnızca tarayıcının `localStorage` alanında tutulur. Oyun skorları
ve (yalnızca Açelya için) sayfa gezinti kaydı Firebase Realtime Database'e
yazılır; yapılandırma `shared/firebase-config.js`, önerilen veritabanı
kuralları `shared/firebase-config.example.js` içindedir. Tarayıcı
destekliyorsa hikâyeler Web Speech API ile Türkçe seslendirilir.
