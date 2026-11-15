/**
 * Açelya'nın Yeri — Service Worker
 *
 * Kurulumda yalnızca çevrimdışı kabuk. Ziyaret edilen sayfa ve kaynakları
 * istek geldikçe saklanır. Worker kurulurken açık olan dersin dosyaları,
 * yükleme bittikten sonra küçük gruplar halinde yakalanır.
 * Listeler ve VERSION, node scripts/build-sw.mjs ile üretilir.
 */

// --- generated:version ---
const VERSION = "acelya-e11be4ae3c";
// --- end:version ---

// --- generated:core ---
const CORE = [
  "index.html",
  "404.html",
  "ogrenme-yollari.html",
  "onsart.html",
  "shared/app.js",
  "shared/catalog.js",
  "shared/digest.css",
  "shared/digest.js",
  "shared/icons.js",
  "shared/theme.css",
  "shared/yollar-view.js",
  "shared/yollar.css",
  "shared/yollar.js",
  "manifest.json",
  "favicon.svg",
  "favicon-32.png",
  "apple-touch-icon.png",
];
// --- end:core ---

const SCOPE = new URL(self.registration.scope);
const CACHE_PREFIX = "acelya:" + SCOPE.pathname + ":";
const STATIC_CACHE = CACHE_PREFIX + VERSION + "-static";
const VISITED_CACHE = CACHE_PREFIX + "visited";
const RUNTIME_CACHE = CACHE_PREFIX + "runtime";
const CORE_URLS = new Set(CORE.map((file) => new URL(file, SCOPE).href));
const HOME = new URL("index.html", SCOPE).href;
const DIGEST_CSS = new URL("shared/digest.css", SCOPE).pathname;
const CDN_HOSTS = new Set(["cdn.jsdelivr.net", "cdnjs.cloudflare.com", "www.gstatic.com", "fonts.gstatic.com", "unpkg.com"]);
const OFFLINE_HTML = '<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Çevrimdışı</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,sans-serif;background:#06080f;color:#e8ecf4;text-align:center;padding:24px}a{color:#5eead4}</style></head><body><div><h1>Şu an çevrimdışısın</h1><p>Bu sayfa önbellekte yok. Bağlantı gelince yeniden dene.</p><a href="' + HOME + '">Ana sayfa</a></div></body></html>';

function inScope(url) {
  return url.origin === SCOPE.origin && url.pathname.startsWith(SCOPE.pathname);
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(STATIC_CACHE);
    await cache.addAll(CORE.map((file) => new Request(new URL(file, SCOPE), { cache: "reload" })));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    // Ziyaret verileri ve aynı origin'deki diğer uygulamaların önbellekleri kalır.
    const oldShells = keys.filter((name) => name.startsWith(CACHE_PREFIX) && name.endsWith("-static") && name !== STATIC_CACHE);
    await Promise.all(oldShells.map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

let legacyName;
async function findLegacyCache() {
  // Önceki sürüm tüm siteyi önceden alıyordu. O dosyalar çevrimdışı
  // yedek olarak yerinde kalır, güncel önbelleğe topluca kopyalanmaz.
  const names = (await caches.keys()).filter((name) => /^acelya-[0-9a-f]+-static$/.test(name));
  for (const cacheName of names) {
    if (await caches.match(HOME, { cacheName })) return cacheName;
  }
  return null;
}

async function cachedResponse(request, cacheName, navigation = false) {
  const url = new URL(request.url);
  const options = { ignoreSearch: inScope(url) };
  const current = await caches.match(request, { cacheName, ...options });
  if (current) return current;

  if (navigation && url.pathname === SCOPE.pathname) {
    const home = await caches.match(HOME, { cacheName: STATIC_CACHE });
    if (home) return home;
  }

  const legacy = await (legacyName ??= findLegacyCache());
  if (!legacy) return undefined;
  const legacyCache = cacheName === RUNTIME_CACHE ? legacy.replace(/-static$/, "-runtime") : legacy;
  return caches.match(request, { cacheName: legacyCache, ...options });
}

async function store(cacheName, request, response) {
  try {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
  } catch (_) {
    // Depolama dolu olduğunda ağdaki yanıt kullanılabilir.
  }
}

async function networkFirst(event, cacheName, { navigation = false, stylesheet = false } = {}) {
  const { request } = event;
  try {
    const response = await fetch(request, stylesheet ? { cache: "no-cache" } : undefined);
    const usable = response.ok || response.type === "opaque";
    if (usable) event.waitUntil(store(cacheName, request, response.clone()));
    if (!stylesheet || usable) return response;
  } catch (_) {}

  const cached = await cachedResponse(request, cacheName, navigation);
  if (cached) return cached;
  if (navigation) {
    return new Response(OFFLINE_HTML, { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
  return new Response("", { status: 503, headers: stylesheet ? { "Content-Type": "text/css; charset=utf-8" } : {} });
}

async function cacheFirst(event, cacheName) {
  const { request } = event;
  const cached = await caches.match(request, { cacheName });
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok || response.type === "opaque") event.waitUntil(store(cacheName, request, response.clone()));
    return response;
  } catch (_) {
    return (await cachedResponse(request, cacheName)) || new Response("", { status: 503 });
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  if (inScope(url)) {
    const isCore = CORE_URLS.has(url.origin + url.pathname);
    const navigation = request.mode === "navigate" || request.headers.get("Accept")?.includes("text/html");
    if (navigation) {
      event.respondWith(networkFirst(event, isCore ? STATIC_CACHE : VISITED_CACHE, { navigation: true }));
    } else if (url.pathname === DIGEST_CSS) {
      event.respondWith(networkFirst(event, STATIC_CACHE, { stylesheet: true }));
    } else if (isCore) {
      event.respondWith(cacheFirst(event, STATIC_CACHE));
    } else {
      event.respondWith(networkFirst(event, VISITED_CACHE));
    }
  } else if (CDN_HOSTS.has(url.hostname)) {
    event.respondWith(cacheFirst(event, RUNTIME_CACHE));
  } else if (url.hostname === "fonts.googleapis.com") {
    event.respondWith(networkFirst(event, RUNTIME_CACHE, { stylesheet: true }));
  }
});

async function rememberVisit(page, resources) {
  const visited = new Map([[page.href, VISITED_CACHE]]);
  for (const resource of resources) {
    if (typeof resource !== "string" || !URL.canParse(resource)) continue;
    const url = new URL(resource);
    const local = inScope(url) && /\.(?:css|js|json|svg|png|jpg|jpeg|webp|woff2?|m4a)$/i.test(url.pathname);
    if (local && !CORE_URLS.has(url.href)) visited.set(url.href, VISITED_CACHE);
    if (url.protocol === "https:" && (CDN_HOSTS.has(url.hostname) || url.hostname === "fonts.googleapis.com")) {
      visited.set(url.href, RUNTIME_CACHE);
    }
  }
  const entries = [...visited];
  for (let i = 0; i < entries.length; i += 3) {
    await Promise.allSettled(entries.slice(i, i + 3).map(async ([url, cacheName]) => {
      if (await caches.match(url, { cacheName })) return;
      const response = await fetch(url, { mode: cacheName === RUNTIME_CACHE ? "no-cors" : "same-origin" });
      if (response.ok || response.type === "opaque") await store(cacheName, url, response);
    }));
  }
}

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    event.waitUntil(self.skipWaiting());
    return;
  }
  if (event.data?.type !== "CACHE_VISIT" || !Array.isArray(event.data.resources) || !event.source?.url) return;
  const page = new URL(event.source.url);
  if (!inScope(page) || !/^[a-z0-9+_-]+\.html$/i.test(page.pathname.slice(SCOPE.pathname.length)) || CORE_URLS.has(page.href)) return;
  page.hash = "";
  event.waitUntil(rememberVisit(page, event.data.resources));
});
