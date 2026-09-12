/**
 * Açelya'nın Yeri — Service Worker
 * Çevrimdışı kullanım için önbellekleme
 */
const CACHE_NAME = "acelya-v11-content-depth";
const STATIC_ASSETS = [
  "index.html",
  "bilim-atlasi.html",
  "bilimsel-yontem-olcme-ve-belirsizlik.html",
  "hareket-ve-grafikler.html",
  "momentum-itme-ve-carpismalar.html",
  "lineer-cebir-ve-ozdegerler.html",
  "cok-degiskenli-kalkulus.html",
  "diferansiyel-denklemler.html",
  "maxwell-denklemleri-ve-alanlar.html",
  "entropi-ve-istatistiksel-fizik.html",
  "kimyasal-denge-ve-gibbs-enerjisi.html",
  "gen-ifadesi-ve-molekuler-biyoloji.html",
  "algoritma-karmasikligi.html",
  "shared/theme.css",
  "shared/atlas.css",
  "shared/stem-bridge.css",
  "shared/app.js",
  "shared/atlas.js",
  "shared/stem-content.js",
  "shared/stem-bridge.js",
  "shared/encyclopedia-data.js",
  "shared/encyclopedia-topic-guides.js",
  "shared/encyclopedia-layer.js",
  "shared/encyclopedia-layer.css",
  "shared/auth.js",
  "shared/icons.js",
  "shared/game-kit.js",
  "shared/game-juice.js",
  "shared/game-mobile.css",
  "shared/game-mobile.js",
  "shared/game-hooks.js",
  "shared/leaderboard.js",
  "shared/chart-safe.js",
  "favicon-32.png",
  "favicon.svg",
  "apple-touch-icon.png",
  "manifest.json",
];

// Kurulum: kritik dosyaları önbelleğe al
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const freshRequests = STATIC_ASSETS.map(
        (asset) => new Request(asset, { cache: "reload" })
      );
      return cache.addAll(freshRequests).catch((err) => {
        console.warn("SW önbellek kurulum hatası (bazı dosyalar eksik olabilir):", err);
      });
    })
  );
  self.skipWaiting();
});

// Aktivasyon: eski önbellekleri temizle
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch: önbellek öncelikli, yoksa ağ
self.addEventListener("fetch", (event) => {
  // Sadece GET isteklerini işle
  if (event.request.method !== "GET") return;

  // HTML sayfaları için ağ öncelikli
  if (event.request.headers.get("Accept")?.includes("text/html")) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // Statik dosyalar için önbellek öncelikli
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    // Çevrimdışı ve önbellekte yok — hata döndür
    return new Response("Çevrimdışı — içerik mevcut değil", { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Çevrimdışı ve önbellekte yok — index sayfasına yönlendir
    return caches.match("index.html");
  }
}
