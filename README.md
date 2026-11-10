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
yıldız arka planını, PWA kaydını sağlar; sayfalar hesapsız açılır. Oyun sayfaları
ayrıca skor tablosu, mobil kontroller ve ses katmanını yükler.

## Yapı

```
index.html              ana menü (kategoriler, arama)
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
node scripts/smoke.mjs --only sarkac --digest --tabs --width 390
npm run test:a7      # A7'nin beş laboratuvarında sayısal sonuçlar ve etkileşimler
npm run test:fractals # dört fraktalın hesap çekirdekleri ve sınır durumları
npm run test:b2      # Penrose, Barnsley ve üç limit deneyinin matematiksel denetimi
npm run test:public  # girişsiz erişim, eski oturum temizliği ve yerel rekorlar
npm run shot -- sarkac --theme light --scroll digest   # ekran görüntüsü
```

Yeni bir konu eklerken:

1. `<slug>.html` sayfasını yaz (`<body class="app-page" data-page="<slug>">`,
   `shared/theme.css` ve `shared/app.js` dahil).
2. `index.html` içindeki `MENU` listesine ekle.
3. `shared/digest/<slug>.js` defterini içerik rehberine göre yaz.
4. `npm run check` ve `npm run build:sw` çalıştır.

## Dağıtım

Güncel yayın yolu GitHub Pages'in `gh-pages` dalıdır. GitHub Actions
kullanılamadığı için aynı denetimleri yerelde yapan yardımcı kullanılır:

```bash
npm run deploy:check # denetler ve commit'lenmiş HEAD'den _site paketini oluşturur
npm run deploy       # denetler, paketler ve gh-pages dalına yayınlar
```

Paketleme HEAD'den yapıldığı için yayınlanacak değişiklikler önce commit
edilmelidir. Pages ayarı: **Deploy from a branch → gh-pages / (root)**.
Her kodlama turunun sonunda denetim ve build sonrasında commit oluşturulur,
`git push origin main` ve `npm run deploy` çalıştırılır; canlı sitenin yeni
`sw.js` sürümünü sunduğu doğrulanır (kullanıcının 10 Kasım 2026 talimatı).
Depodaki Actions workflow'u korunur; katı defter denetimi eksik defterler
tamamlanmadan geçmez. Güncel kapsam ve devam sırası
[`docs/DEVAM-PLANI.md`](docs/DEVAM-PLANI.md) içindedir.

## Yerel kayıtlar

Site kullanıcı adı veya şifre istemeden açılır. İlerleme, sınav sonuçları,
tema tercihi ve oyun skorları yalnızca bu tarayıcıda tutulur; etkinlik kaydı
ve Firebase bağlantısı kaldırılmıştır. Oyun rekorları cihazlar arasında
paylaşılmaz. `bilgi.html` herkese açık Hakkında sayfasıdır.

Eski hesap/şifre dosyası yayından kaldırıldı; geçmiş Git commit'leri ve
önceden yazılmış uzak veriler bu değişiklikle silinmez. Eski Firebase örnek
ayar dosyası yalnız tarihsel başvuru olarak durur, uygulama tarafından yüklenmez.
Tarayıcı destekliyorsa hikâyeler Web Speech API ile Türkçe seslendirilir.
