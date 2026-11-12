/**
 * Açelya'nın Yeri — Service Worker
 *
 * Strateji
 *  - CORE: kabuk dosyaları, kurulumda atomik olarak önbelleğe alınır (biri bile inmezse kurulum başarısız olur).
 *  - PAGES + DIGESTS: kurulumda "elden geldiğince" alınır; eksikler ilk ziyarette tamamlanır.
 *  - HTML gezinmeleri: ağ öncelikli, çevrimdışıysa önbellek, o da yoksa çevrimdışı sayfası.
 *  - Aynı kaynaklı statik dosyalar: önbellekten sun, arka planda yenile (stale-while-revalidate).
 *  - CDN kütüphaneleri (sürümlü URL'ler): önbellek öncelikli; Google Fonts CSS: stale-while-revalidate.
 *  - Firebase veritabanı trafiğine dokunulmaz.
 *
 * Listeler ve VERSION, `node scripts/build-sw.mjs` ile diskten üretilir; elle düzenleme.
 */

// --- generated:version ---
const VERSION = "acelya-f7dc14effe";
// --- end:version ---

// --- generated:core ---
const CORE = [
  "index.html",
  "404.html",
  "bilim-atlasi.html",
  "shared/app.js",
  "shared/atlas.css",
  "shared/atlas.js",
  "shared/catalog.js",
  "shared/chart-safe.js",
  "shared/digest.css",
  "shared/digest.js",
  "shared/game-hooks.js",
  "shared/game-juice.js",
  "shared/game-kit.js",
  "shared/game-mobile.css",
  "shared/game-mobile.js",
  "shared/icons.js",
  "shared/leaderboard.js",
  "shared/stem-bridge.css",
  "shared/stem-bridge.js",
  "shared/stem-content.js",
  "shared/theme.css",
  "hit.m4a",
  "explode.m4a",
  "laser.m4a",
  "thrust.m4a",
  "music-low.m4a",
  "music-high.m4a",
  "favicon-32.png",
  "favicon.svg",
  "apple-touch-icon.png",
  "manifest.json",
];
// --- end:core ---

// --- generated:pages ---
const PAGES = [
  "akiskanlar-mekanigi.html",
  "algoritma-karmasikligi.html",
  "algoritmalar.html",
  "alternatif-akim.html",
  "altin-oran.html",
  "asal-rsa.html",
  "asit-baz-titrasyonu.html",
  "asteroids.html",
  "atislar.html",
  "atmosfer-ve-hava.html",
  "atom-orbitalleri.html",
  "av-avci-lotka-volterra.html",
  "ay-evreleri.html",
  "barnsley-egreltiotu.html",
  "basinc.html",
  "basit-makineler.html",
  "bayes-olasilik.html",
  "besin-agi.html",
  "bicimsel-diller-ve-otomata-teorisi.html",
  "bilgi.html",
  "bilgisayar-sistemleri-ve-mimarisi.html",
  "bilimsel-yontem-olcme-ve-belirsizlik.html",
  "birim-cember.html",
  "breakout.html",
  "celik-yapilar.html",
  "cift-sarkac.html",
  "cizge-teorisi.html",
  "cok-degiskenli-kalkulus.html",
  "collatz.html",
  "dairesel-hareket.html",
  "dalga-superpozisyonu.html",
  "denklem-denklestirme.html",
  "depremler-ve-sismik-dalgalar.html",
  "derleyici-ve-yorumlayicilar.html",
  "diferansiyel-denklemler.html",
  "dna-replikasyon.html",
  "dogal-secilim.html",
  "doppler-etkisi.html",
  "duran-dalgalar.html",
  "elektrik-devresi-simulasyonu.html",
  "elektrik-muhendisligi.html",
  "elektrikli-araclar.html",
  "elektrokimya.html",
  "elektronik-devre.html",
  "elektronik-muhendisligi.html",
  "elektrostatik.html",
  "enigma-makinesi.html",
  "entropi-ve-istatistiksel-fizik.html",
  "enzim-kinetigi.html",
  "fibo+pascal.html",
  "fibo.html",
  "fonksiyon-grafigi.html",
  "formul-hafiza.html",
  "fotoelektrik.html",
  "fotosentez-solunum.html",
  "fourier-ses.html",
  "gemi-makineleri-isletme-muhendisligi.html",
  "gen-ifadesi-ve-molekuler-biyoloji.html",
  "genetik-caprazlama.html",
  "gezegen-savunmasi.html",
  "gorelilik-uzayzaman.html",
  "grup-teorisi.html",
  "gunes-sistemi.html",
  "hanoi-kuleleri.html",
  "hareket-ve-grafikler.html",
  "hesaplama-teorisi.html",
  "hidrolik-sistemler.html",
  "hilbert-egrisi.html",
  "ideal-gaz.html",
  "iklim-ve-sera-etkisi.html",
  "integral.html",
  "internet-ve-ag-teknolojileri.html",
  "is-enerji.html",
  "isaretciler-ve-bellek-yonetimi.html",
  "isik-sondurme.html",
  "isletim-sistemleri-ve-linux.html",
  "isletme-bilimi-ve-yonetim.html",
  "julia-fraktali.html",
  "kaldirma-kuvveti.html",
  "kalp-dolasim.html",
  "kara-cisim-isimasi.html",
  "karmasik-sayilar.html",
  "kepler-yasalari.html",
  "kimya-muhendisligi.html",
  "kimyasal-denge-ve-gibbs-enerjisi.html",
  "kimyasal-kinetik.html",
  "kirinim-izgarasi.html",
  "klasik-girisim.html",
  "koch-kar-tanesi.html",
  "konik-kesitler.html",
  "kristal-yapilar.html",
  "kuantum-dalga.html",
  "kuantum-mekanigi.html",
  "levha-tektonigi.html",
  "lineer-cebir-ve-ozdegerler.html",
  "lissajous.html",
  "lorentz-kuvveti.html",
  "lorenz-cekici.html",
  "lorenz-cekici2.html",
  "maden-muhendisligi.html",
  "makine-dili-assembly-c.html",
  "makine-muhendisligi.html",
  "makine-ogrenmesi-derin-ogrenme-llm.html",
  "makro-ekonomi-ve-para-politikalari.html",
  "mandelbrot+lorenz.html",
  "mandelbrot-fraktali.html",
  "mantik-devresi.html",
  "mantik-kapilari.html",
  "manyetik-alan.html",
  "matris-donusumleri.html",
  "maxwell-denklemleri-ve-alanlar.html",
  "mayin-tarlasi.html",
  "mekatronik-muhendisligi.html",
  "mercek-isinlari.html",
  "metalurji-ve-malzeme-muhendisligi.html",
  "mikro-ekonomi-ve-uretim-faktorleri.html",
  "mitoz-mayoz.html",
  "molekul-sekli.html",
  "molekul.html",
  "momentum-itme-ve-carpismalar.html",
  "mukavemet.html",
  "newton-hareket-yasalari.html",
  "normal-dagilim.html",
  "nukleer-fizik.html",
  "okyanus-ve-gelgitler.html",
  "optik-yansima-kirilma.html",
  "otomotiv-muhendisligi.html",
  "otonom-araclar-ve-iha.html",
  "oyun-2048.html",
  "pascal-ucgeni.html",
  "penrose-dosemesi.html",
  "periyodik-tablo.html",
  "ph-indikator.html",
  "pi-yaklasimi.html",
  "pisagor.html",
  "plc-hidrolik-pnomatik-cnc-cadcam.html",
  "pong.html",
  "programlama-paradigmalari.html",
  "radyoaktif-bozunma.html",
  "rastgele-yuruyus.html",
  "renk-teorisi.html",
  "riemann-toplamlari.html",
  "roma-hukuku.html",
  "sarkac.html",
  "serbest-dusme.html",
  "ses-sentezleyici.html",
  "sezar-sifre.html",
  "siber-guvenlik.html",
  "sicim-teorisi.html",
  "sierpinski-fraktali-peano-egrisi-altin-oran.html",
  "siralama-algoritmalari.html",
  "siralama-yarisi.html",
  "snake.html",
  "statik.html",
  "takimyildiz-haritasi.html",
  "tasarim-desenleri.html",
  "taylor-serisi.html",
  "tek-sayi-toplam3.html",
  "tek-sayi-toplam4.html",
  "tek-sayi-toplam5.html",
  "termodinamik.html",
  "tetris.html",
  "tork-denge.html",
  "turev.html",
  "ucak-muhendisligi-ve-aerodinamik.html",
  "uluslararasi-iliskiler.html",
  "uretim-planlama-ve-endustri-muhendisligi.html",
  "uzay-kosucusu.html",
  "vektorler.html",
  "veri-yapilari.html",
  "veritabanlari.html",
  "yasam-oyunu.html",
  "yay-kutle.html",
  "yazilim-muhendisligi.html",
  "yildiz-yasam-dongusu.html",
  "yol-bulma-algoritmalari.html",
  "yoneylem-arastirmasi.html",
];
// --- end:pages ---

// --- generated:digests ---
const DIGESTS = [
  "shared/digest/akiskanlar-mekanigi.js",
  "shared/digest/algoritma-karmasikligi.js",
  "shared/digest/algoritmalar.js",
  "shared/digest/alternatif-akim.js",
  "shared/digest/altin-oran.js",
  "shared/digest/asal-rsa.js",
  "shared/digest/asit-baz-titrasyonu.js",
  "shared/digest/asteroids.js",
  "shared/digest/atislar.js",
  "shared/digest/atmosfer-ve-hava.js",
  "shared/digest/atom-orbitalleri.js",
  "shared/digest/av-avci-lotka-volterra.js",
  "shared/digest/ay-evreleri.js",
  "shared/digest/barnsley-egreltiotu.js",
  "shared/digest/basinc.js",
  "shared/digest/basit-makineler.js",
  "shared/digest/bayes-olasilik.js",
  "shared/digest/besin-agi.js",
  "shared/digest/bicimsel-diller-ve-otomata-teorisi.js",
  "shared/digest/bilgisayar-sistemleri-ve-mimarisi.js",
  "shared/digest/bilimsel-yontem-olcme-ve-belirsizlik.js",
  "shared/digest/birim-cember.js",
  "shared/digest/breakout.js",
  "shared/digest/celik-yapilar.js",
  "shared/digest/cift-sarkac.js",
  "shared/digest/cizge-teorisi.js",
  "shared/digest/cok-degiskenli-kalkulus.js",
  "shared/digest/collatz.js",
  "shared/digest/dairesel-hareket.js",
  "shared/digest/dalga-superpozisyonu.js",
  "shared/digest/denklem-denklestirme.js",
  "shared/digest/depremler-ve-sismik-dalgalar.js",
  "shared/digest/derleyici-ve-yorumlayicilar.js",
  "shared/digest/diferansiyel-denklemler.js",
  "shared/digest/dna-replikasyon.js",
  "shared/digest/dogal-secilim.js",
  "shared/digest/doppler-etkisi.js",
  "shared/digest/duran-dalgalar.js",
  "shared/digest/elektrik-devresi-simulasyonu.js",
  "shared/digest/elektrik-muhendisligi.js",
  "shared/digest/elektrikli-araclar.js",
  "shared/digest/elektrokimya.js",
  "shared/digest/elektronik-devre.js",
  "shared/digest/elektronik-muhendisligi.js",
  "shared/digest/elektrostatik.js",
  "shared/digest/enigma-makinesi.js",
  "shared/digest/entropi-ve-istatistiksel-fizik.js",
  "shared/digest/enzim-kinetigi.js",
  "shared/digest/fibo+pascal.js",
  "shared/digest/fibo.js",
  "shared/digest/fonksiyon-grafigi.js",
  "shared/digest/formul-hafiza.js",
  "shared/digest/fotoelektrik.js",
  "shared/digest/fotosentez-solunum.js",
  "shared/digest/fourier-ses.js",
  "shared/digest/gemi-makineleri-isletme-muhendisligi.js",
  "shared/digest/gen-ifadesi-ve-molekuler-biyoloji.js",
  "shared/digest/genetik-caprazlama.js",
  "shared/digest/gezegen-savunmasi.js",
  "shared/digest/gorelilik-uzayzaman.js",
  "shared/digest/grup-teorisi.js",
  "shared/digest/gunes-sistemi.js",
  "shared/digest/hanoi-kuleleri.js",
  "shared/digest/hareket-ve-grafikler.js",
  "shared/digest/hesaplama-teorisi.js",
  "shared/digest/hidrolik-sistemler.js",
  "shared/digest/hilbert-egrisi.js",
  "shared/digest/ideal-gaz.js",
  "shared/digest/iklim-ve-sera-etkisi.js",
  "shared/digest/integral.js",
  "shared/digest/internet-ve-ag-teknolojileri.js",
  "shared/digest/is-enerji.js",
  "shared/digest/isaretciler-ve-bellek-yonetimi.js",
  "shared/digest/isik-sondurme.js",
  "shared/digest/isletim-sistemleri-ve-linux.js",
  "shared/digest/isletme-bilimi-ve-yonetim.js",
  "shared/digest/julia-fraktali.js",
  "shared/digest/kaldirma-kuvveti.js",
  "shared/digest/kalp-dolasim.js",
  "shared/digest/kara-cisim-isimasi.js",
  "shared/digest/karmasik-sayilar.js",
  "shared/digest/kepler-yasalari.js",
  "shared/digest/kimya-muhendisligi.js",
  "shared/digest/kimyasal-denge-ve-gibbs-enerjisi.js",
  "shared/digest/kimyasal-kinetik.js",
  "shared/digest/kirinim-izgarasi.js",
  "shared/digest/klasik-girisim.js",
  "shared/digest/koch-kar-tanesi.js",
  "shared/digest/konik-kesitler.js",
  "shared/digest/kristal-yapilar.js",
  "shared/digest/kuantum-dalga.js",
  "shared/digest/kuantum-mekanigi.js",
  "shared/digest/levha-tektonigi.js",
  "shared/digest/lineer-cebir-ve-ozdegerler.js",
  "shared/digest/lissajous.js",
  "shared/digest/lorentz-kuvveti.js",
  "shared/digest/lorenz-cekici.js",
  "shared/digest/lorenz-cekici2.js",
  "shared/digest/maden-muhendisligi.js",
  "shared/digest/makine-dili-assembly-c.js",
  "shared/digest/makine-muhendisligi.js",
  "shared/digest/makine-ogrenmesi-derin-ogrenme-llm.js",
  "shared/digest/makro-ekonomi-ve-para-politikalari.js",
  "shared/digest/mandelbrot+lorenz.js",
  "shared/digest/mandelbrot-fraktali.js",
  "shared/digest/mantik-devresi.js",
  "shared/digest/mantik-kapilari.js",
  "shared/digest/manyetik-alan.js",
  "shared/digest/matris-donusumleri.js",
  "shared/digest/maxwell-denklemleri-ve-alanlar.js",
  "shared/digest/mayin-tarlasi.js",
  "shared/digest/mekatronik-muhendisligi.js",
  "shared/digest/mercek-isinlari.js",
  "shared/digest/metalurji-ve-malzeme-muhendisligi.js",
  "shared/digest/mikro-ekonomi-ve-uretim-faktorleri.js",
  "shared/digest/mitoz-mayoz.js",
  "shared/digest/molekul-sekli.js",
  "shared/digest/molekul.js",
  "shared/digest/momentum-itme-ve-carpismalar.js",
  "shared/digest/mukavemet.js",
  "shared/digest/newton-hareket-yasalari.js",
  "shared/digest/normal-dagilim.js",
  "shared/digest/nukleer-fizik.js",
  "shared/digest/okyanus-ve-gelgitler.js",
  "shared/digest/optik-yansima-kirilma.js",
  "shared/digest/otomotiv-muhendisligi.js",
  "shared/digest/otonom-araclar-ve-iha.js",
  "shared/digest/oyun-2048.js",
  "shared/digest/pascal-ucgeni.js",
  "shared/digest/penrose-dosemesi.js",
  "shared/digest/periyodik-tablo.js",
  "shared/digest/ph-indikator.js",
  "shared/digest/pi-yaklasimi.js",
  "shared/digest/pisagor.js",
  "shared/digest/plc-hidrolik-pnomatik-cnc-cadcam.js",
  "shared/digest/pong.js",
  "shared/digest/programlama-paradigmalari.js",
  "shared/digest/radyoaktif-bozunma.js",
  "shared/digest/rastgele-yuruyus.js",
  "shared/digest/renk-teorisi.js",
  "shared/digest/riemann-toplamlari.js",
  "shared/digest/roma-hukuku.js",
  "shared/digest/sarkac.js",
  "shared/digest/serbest-dusme.js",
  "shared/digest/ses-sentezleyici.js",
  "shared/digest/sezar-sifre.js",
  "shared/digest/siber-guvenlik.js",
  "shared/digest/sicim-teorisi.js",
  "shared/digest/sierpinski-fraktali-peano-egrisi-altin-oran.js",
  "shared/digest/siralama-algoritmalari.js",
  "shared/digest/siralama-yarisi.js",
  "shared/digest/snake.js",
  "shared/digest/statik.js",
  "shared/digest/takimyildiz-haritasi.js",
  "shared/digest/tasarim-desenleri.js",
  "shared/digest/taylor-serisi.js",
  "shared/digest/tek-sayi-toplam3.js",
  "shared/digest/tek-sayi-toplam4.js",
  "shared/digest/tek-sayi-toplam5.js",
  "shared/digest/termodinamik.js",
  "shared/digest/tetris.js",
  "shared/digest/tork-denge.js",
  "shared/digest/turev.js",
  "shared/digest/ucak-muhendisligi-ve-aerodinamik.js",
  "shared/digest/uluslararasi-iliskiler.js",
  "shared/digest/uretim-planlama-ve-endustri-muhendisligi.js",
  "shared/digest/uzay-kosucusu.js",
  "shared/digest/vektorler.js",
  "shared/digest/veri-yapilari.js",
  "shared/digest/veritabanlari.js",
  "shared/digest/yasam-oyunu.js",
  "shared/digest/yay-kutle.js",
  "shared/digest/yazilim-muhendisligi.js",
  "shared/digest/yildiz-yasam-dongusu.js",
  "shared/digest/yol-bulma-algoritmalari.js",
  "shared/digest/yoneylem-arastirmasi.js",
];
// --- end:digests ---

const STATIC_CACHE = `${VERSION}-static`;
const RUNTIME_CACHE = `${VERSION}-runtime`;
const CDN_HOSTS = new Set(["cdn.jsdelivr.net", "cdnjs.cloudflare.com", "www.gstatic.com", "fonts.gstatic.com", "unpkg.com"]);
const OFFLINE_HTML = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Çevrimdışı</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:Outfit,system-ui,sans-serif;background:#06080f;color:#e8ecf4;text-align:center;padding:24px}a{color:#5eead4}</style></head><body><div><h1>Şu an çevrimdışısın</h1><p>Bu sayfa daha önce açılmadığı için önbellekte yok. Bağlantı gelince yeniden dene.</p><p><a href="index.html">Ana sayfa</a></p></div></body></html>`;

async function precacheBestEffort(cache, urls) {
  await Promise.allSettled(
    urls.map(async (url) => {
      try {
        const res = await fetch(new Request(url, { cache: "reload" }));
        if (res.ok) await cache.put(url, res);
      } catch (_) {
        // İlk ziyarette tamamlanır.
      }
    }),
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await cache.addAll(CORE.map((url) => new Request(url, { cache: "reload" })));
      await precacheBestEffort(cache, [...PAGES, ...DIGESTS]);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  if (url.hostname.endsWith("firebasedatabase.app") || url.hostname.endsWith("firebaseio.com")) return;

  if (request.mode === "navigate" || request.headers.get("Accept")?.includes("text/html")) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  if (CDN_HOSTS.has(url.hostname)) {
    event.respondWith(cacheFirst(request, RUNTIME_CACHE));
    return;
  }

  if (url.hostname === "fonts.googleapis.com") {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
  }
});

async function networkFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (_) {
    const cached = (await cache.match(request)) || (await cache.match(request, { ignoreSearch: true }));
    if (cached) return cached;
    return new Response(OFFLINE_HTML, { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const refresh = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);
  if (cached) return cached;
  const fresh = await refresh;
  return fresh || new Response("", { status: 503 });
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok || response.type === "opaque") cache.put(request, response.clone());
    return response;
  } catch (_) {
    return new Response("", { status: 503 });
  }
}
