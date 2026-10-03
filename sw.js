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
const VERSION = "acelya-bf5e6014d3";
// --- end:version ---

// --- generated:core ---
const CORE = [
  "index.html",
  "404.html",
  "bilim-atlasi.html",
  "shared/activity.js",
  "shared/app.js",
  "shared/atlas.css",
  "shared/atlas.js",
  "shared/auth.js",
  "shared/catalog.js",
  "shared/chart-safe.js",
  "shared/digest.css",
  "shared/digest.js",
  "shared/firebase-config.js",
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
  "atom-orbitalleri.html",
  "av-avci-lotka-volterra.html",
  "ay-evreleri.html",
  "barnsley-egreltiotu.html",
  "basinc.html",
  "bayes-olasilik.html",
  "besin-agi.html",
  "bicimsel-diller-ve-otomata-teorisi.html",
  "bilgi.html",
  "bilgisayar-sistemleri-ve-mimarisi.html",
  "bilimsel-yontem-olcme-ve-belirsizlik.html",
  "birim-cember.html",
  "breakout.html",
  "cift-sarkac.html",
  "cizge-teorisi.html",
  "cok-degiskenli-kalkulus.html",
  "collatz.html",
  "dairesel-hareket.html",
  "dalga-superpozisyonu.html",
  "denklem-denklestirme.html",
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
  "hilbert-egrisi.html",
  "ideal-gaz.html",
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
  "newton-hareket-yasalari.html",
  "normal-dagilim.html",
  "nukleer-fizik.html",
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
  "shared/digest/pong.js",
  "shared/digest/sarkac.js",
  "shared/digest/turev.js",
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
