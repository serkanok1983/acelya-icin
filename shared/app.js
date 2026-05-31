/**
 * Açelya — ortak kabuk: yıldızlar, ana sayfa, sesler, giriş rehberi
 */

/* Sesler — sayfa scriptlerinden önce kullanılabilir */
(function initSounds() {
  const SOUND_FILES = {
    hit: "hit.m4a",
    explode: "explode.m4a",
    laser: "laser.m4a",
    thrust: "thrust.m4a",
  };
  const soundCache = {};
  let unlocked = false;
  function getSound(name) {
    if (!SOUND_FILES[name]) return null;
    if (!soundCache[name]) {
      const a = new Audio(SOUND_FILES[name]);
      a.volume = name === "thrust" ? 0.35 : 0.55;
      soundCache[name] = a;
    }
    return soundCache[name];
  }
  window.AcelyaSounds = {
    play(name) {
      if (!unlocked) return;
      const s = getSound(name);
      if (!s) return;
      try {
        s.currentTime = 0;
      } catch (_) {}
      s.play().catch(() => {
        const c = new Audio(SOUND_FILES[name]);
        c.volume = s.volume;
        c.play().catch(() => {});
      });
    },
    hit() {
      window.AcelyaSounds.play("hit");
    },
    explode() {
      window.AcelyaSounds.play("explode");
    },
    laser() {
      window.AcelyaSounds.play("laser");
    },
    thrust() {
      window.AcelyaSounds.play("thrust");
    },
  };

  function unlockAudio() {
    if (unlocked) return;
    unlocked = true;
    const first = getSound("hit");
    if (first) {
      const prev = first.volume;
      first.volume = 0;
      first
        .play()
        .then(() => {
          first.pause();
          first.currentTime = 0;
          first.volume = prev;
        })
        .catch(() => {
          first.volume = prev;
        });
    }
    Object.keys(SOUND_FILES).forEach((key) => {
      const s = getSound(key);
      if (!s) return;
      s.volume = 0;
      s.play()
        .then(() => {
          s.pause();
          s.currentTime = 0;
          s.volume = key === "thrust" ? 0.35 : 0.55;
        })
        .catch(() => {
          s.volume = key === "thrust" ? 0.35 : 0.55;
        });
    });
    window.removeEventListener("pointerdown", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
  }

  window.addEventListener("pointerdown", unlockAudio, { once: true });
  window.addEventListener("keydown", unlockAudio, { once: true });
  window.addEventListener("touchstart", unlockAudio, { once: true, passive: true });
})();

(function () {
  "use strict";

  let pageId = "";
  const PauseState = { paused: false };

  (function installPauseAwareSchedulers() {
    if (window.AcelyaPause) return;
    const rawSetInterval = window.setInterval.bind(window);
    const rawSetTimeout = window.setTimeout.bind(window);
    const rawRaf = window.requestAnimationFrame.bind(window);

    window.setInterval = function wrappedSetInterval(fn, ms, ...args) {
      if (typeof fn !== "function") return rawSetInterval(fn, ms, ...args);
      return rawSetInterval(
        function intervalProxy(...inner) {
          if (PauseState.paused) return;
          fn(...inner);
        },
        ms,
        ...args,
      );
    };

    window.setTimeout = function wrappedSetTimeout(fn, ms, ...args) {
      if (typeof fn !== "function") return rawSetTimeout(fn, ms, ...args);
      return rawSetTimeout(
        function timeoutProxy(...inner) {
          if (PauseState.paused) {
            rawSetTimeout(timeoutProxy, 50, ...inner);
            return;
          }
          fn(...inner);
        },
        ms,
        ...args,
      );
    };

    window.requestAnimationFrame = function wrappedRaf(cb) {
      if (typeof cb !== "function") return rawRaf(cb);
      function rafProxy(ts) {
        if (PauseState.paused) {
          rawRaf(rafProxy);
          return;
        }
        cb(ts);
      }
      return rawRaf(rafProxy);
    };

    window.AcelyaPause = {
      isPaused() {
        return PauseState.paused;
      },
      setPaused(v) {
        PauseState.paused = !!v;
        window.dispatchEvent(
          new CustomEvent("acelya-pause-change", {
            detail: { paused: PauseState.paused },
          }),
        );
      },
    };
  })();

  /* —— Sayfa rehberleri —— */
  const GUIDES = {
    pong: {
      type: "Oyun",
      intro:
        "Klasik Pong: Sol taraftaki raketi sen kontrol edersin, sağdaki bilgisayar. Top file çarptıkça hızlanır; önce 20 sayıya ulaşan kazanır.",
      controls: ["↑ ↓ veya parmağını kaydır — raket", "Space — topu hızlandır"],
      learn: "Açılı çarpışmada top yön değiştirir; hız her 5 puanda artar.",
    },
    asteroids: {
      type: "Oyun",
      intro:
        "Uzay gemini döndür, it ve kayaları lazerle parçala. Büyük kayalar küçüğe bölünür; çarpışırsan patlarsın. Canların bittiğinde oyun biter.",
      controls: ["← → — dönüş", "↑ — itiş", "Space — lazer"],
      learn: "Momentum korunur; sürtünme yoksa gemi kaymaya devam eder.",
    },
    snake: {
      type: "Oyun",
      intro:
        "Yılanı ok tuşlarıyla yönlendir; renkli yemi ye, uzat. Kendine veya duvara çarparsan oyun biter. Duvarlardan geçebilirsin.",
      controls: ["Ok tuşları veya kaydırma — yön", "Her yem +10 puan, hız artar"],
      learn: "Kuyruk takibi: baş hareket eder, son segment eski konuma gelir.",
    },
    breakout: {
      type: "Oyun",
      intro:
        "Topu raketle sektir, renkli tuğlaları kır. Top aşağı düşerse kaybedersin. Her 10 tuğlada top hızlanır.",
      controls: ["← → veya yatay kaydırma — raket"],
      learn: "Çarpışma açısı topun yansıma yönünü belirler.",
    },
    "oyun-2048": {
      type: "Oyun",
      intro:
        "Aynı sayıları birleştirerek 2048’e ulaşmaya çalış. Ok tuşları veya kaydırma ile kutular kayar; boş yerde yeni 2 veya 4 belirir.",
      controls: ["Ok / kaydır — dört yön"],
      learn: "Üsler ve 2’nin kuvvetleri; strateji köşede büyük karo tutmaktır.",
    },
    "yasam-oyunu": {
      type: "Oyun",
      intro:
        "Conway’in Yaşam Oyunu: Hücreler komşularına göre doğar, yaşar veya ölür. Çiz modunda desen yap, Oynat ile evrimi izle.",
      controls: ["Çiz — tıkla/sürükle", "Oynat / Adım / Temizle"],
      learn: "3 canlı komşu → doğum; <2 veya >3 → ölüm; tam 3 → yeni hücre.",
    },
    tetris: {
      type: "Oyun",
      intro:
        "Düşen blokları döndür ve satır doldur. Tam satır silinir; seviye arttıkça hız artar.",
      controls: ["← → — hareket", "↑ — döndür", "↓ — hızlı düşür"],
      learn: "Uzamsal örüntü ve planlama becerisi.",
    },
    "gezegen-savunmasi": {
      type: "Oyun",
      intro:
        "Merkez gezegenin etrafında yörüngeye giren düşmanları vur. Yerçekimi mermi yolunu eğer.",
      controls: ["← → — nişan", "Space / dokun — ateş"],
      learn: "Yörünge hareketi ve merkezcil kuvvet sezgisini pekiştirir.",
    },
    "formul-hafiza": {
      type: "Oyun",
      intro:
        "Fizik formüllerini eşleştir: kartları çevir, çiftleri bul. Az hamlede bitirmeye çalış.",
      controls: ["Karta tıkla — çevir"],
      learn: "Formül adı ile denklemi ilişkilendirerek sınav öncesi tekrar.",
    },
    "mayin-tarlasi": {
      type: "Oyun",
      intro:
        "Mayın tarlasında güvenli hücreleri aç. Sağ tık veya uzun bas ile bayrak koy. Hover’da olasılık ipucu görünür.",
      controls: ["Sol tık — aç", "Sağ / uzun bas — bayrak"],
      learn: "Olasılık ve mantıksal çıkarım; komşu mayın sayısı ipucudur.",
    },
    "optik-yansima-kirilma": {
      type: "Fizik",
      intro:
        "Işık farklı ortamlarda kırılır (Snell: n₁ sin θ₁ = n₂ sin θ₂). Geliş, yansıma ve kırılma ışınlarını canlı izle; tam iç yansıma oluşabilir.",
      controls: ["Kaydırıcılar — açı ve kırılma indisleri n₁, n₂"],
      learn: "Camda ve suda ışığın yavaşlaması; optik TYT/AYT konusu.",
    },
    "yay-kutle": {
      type: "Fizik",
      intro:
        "Yay–kütle sistemi basit harmonik hareket yapar. Kütle ve yay sabiti değiştir; konum/hız grafiğini incele.",
      controls: ["m ve k kaydırıcıları", "Grafik aç/kapa"],
      learn: "T = 2π√(m/k); enerji KE ile PE arasında sürekli dönüşür.",
    },
    sarkac: {
      type: "Fizik",
      intro:
        "Basit sarkaç küçük açılarda harmonik salınım yapar. Açı, açısal hız ve periyot canlı hesaplanır.",
      controls: ["Tekrarla — başlangıç", "İki sarkaç sayfasına geçiş"],
      learn: "T ≈ 2π√(L/g); genlik büyükse periyot biraz uzar (doğrusal olmayan).",
    },
    "cift-sarkac": {
      type: "Fizik",
      intro:
        "Çift sarkaç kaotiktir: çok küçük başlangıç farkı bile büyük yörünge değişimine yol açar.",
      controls: ["Tekrarla", "Grafik modu"],
      learn: "Kaos teorisi; deterministik ama öngörülemez uzun vadeli davranış.",
    },
    turev: {
      type: "Matematik",
      intro:
        "Türev, eğriye teğet çizginin eğimidir. Sekant doğrusunu daraltarak limitte teğete ulaşırsın.",
      controls: ["Fonksiyon seç", "h (sekant adımı) kaydır", "Oynat"],
      learn: "f′(x) = lim[h→0] (f(x+h)−f(x))/h",
    },
    integral: {
      type: "Matematik",
      intro:
        "İntegral, eğri altındaki alanı sonsuz ince dikdörtgenlerin toplamı olarak görülür.",
      controls: ["Fonksiyon ve sınırlar", "Dikdörtgen sayısı n"],
      learn: "Riemann toplamı → belirli integral; alan ve birikim yorumu.",
    },
    "periyodik-tablo": {
      type: "Kimya",
      intro:
        "118 element periyot ve gruplara göre düzenlenir. Grup düğmeleriyle metal/ametal vb. vurgula.",
      controls: ["Grup filtresi", "Elemente tıkla — detay"],
      learn:
        "Periyotta soldan sağa atom numarası artar; gruplar benzer kimyasal özellik.",
    },
    vektorler: {
      type: "Matematik",
      intro:
        "İki vektörü uç uca veya paralelkenar yöntemiyle topla. Bileşenler ve sonuç vektörün büyüklüğü anlık hesaplanır.",
      controls: ["Kaydırıcılar — büyüklük ve açı", "Sonucu ok ve bileşenlerle izle"],
      learn:
        "Fizikte kuvvet, hız ve ivme vektörel büyülerdir; skaler toplama yapılmaz.",
    },
    "birim-cember": {
      type: "Matematik",
      intro:
        "Birim çemberde açı θ için sin θ ve cos θ, yatay ve dikey projeksiyonlardır.",
      controls: ["Açı kaydırıcısı", "Projeksiyon çizgilerini takip et"],
      learn: "sin²θ + cos²θ = 1; trigonometri TYT’nin temel taşıdır.",
    },
    "mandelbrot-fraktali": {
      type: "Matematik",
      intro:
        "Mandelbrot kümesi: zₙ₊₁ = zₙ² + c ile üretilir. Karmaşık düzlemde hangi c noktalarının patlamadığını renklendirir.",
      controls: ["Fare ile yakınlaştır", "Renk paleti / iterasyon"],
      learn: "Fraktal: parça büyütüldüğünde bütüne benzer yapı; sonsuz detay.",
    },
    "kuantum-mekanigi": {
      type: "Fizik",
      intro:
        "Tek tek elektronlar çift yarıktan geçer. Ölçüm yokken ekranda girişim deseni (dalga) birikir; hangi yarıktan geçtiğini ölçersen desen kaybolur ve iki şerit görürsün (parçacık).",
      controls: [
        "Otomatik ateş — sürekli elektron",
        "Gözlemci — hangi yarık ölçümü",
        "Tek yarık — difraksiyon karşılaştırması",
        "λ, d, L kaydırıcıları",
      ],
      learn:
        "Born yorumu: |ψ|² olasılık. Ölçüm süperpozisyonu çökertir — complementarity.",
    },
    "newton-hareket-yasalari": {
      type: "Fizik",
      intro:
        "Cisimlere kuvvet uygula: F=ma ile ivme, sürtünme ve çarpışmaları gözle.",
      controls: ["Kuvvet ekle", "Sürtünme katsayısı", "Çarpışma modu"],
      learn: "I. yasa: dengede net kuvvet sıfır; II: ivme kuvvetle orantılı.",
    },
    "dalga-superpozisyonu": {
      type: "Fizik",
      intro: "İki dalga üst üste bindiğinde genlikler toplanır; girişim oluşur.",
      controls: ["Frekans ve faz farkı", "Oynat / durdur"],
      learn: "Yapıcı girişim (genlik artar) ve yıkıcı girişim (sönüm).",
    },
    "dna-replikasyon": {
      type: "Biyoloji",
      intro: "DNA eşlenirken çift sarmal açılır, yeni ipler sentezlenir.",
      controls: ["Adım adım ilerle", "Oynat"],
      learn: "Helikaz, primaz, polimeraz rolleri; hücre bölünmesi öncesi şart.",
    },
    "atom-orbitalleri": {
      type: "Kimya",
      intro:
        "s, p, d orbitallerinin 3B şekillerini görselleştir. Kuantum sayıları (n, ℓ, mℓ) ile orbital geometrisini keşfet.",
      controls: [
        "Fare / dokunmatik ile 3B döndürme",
        "s, p, d sekmeleri ve alt orbitaller",
        "Enerji seviyesi diyagramı",
        "Otomatik döndürme / üstten / yandan görünüm",
      ],
      learn:
        "s küresel (ℓ=0), p dambıl (ℓ=1), d yonca (ℓ=2). Açısal dalga fonksiyonu |Y(θ,φ)|² orbital şeklini belirler.",
    },
    "ideal-gaz": {
      type: "Kimya",
      intro: "İdeal gaz denklemi PV = nRT: basınç, hacim, mol ve sıcaklık ilişkisi.",
      controls: ["P, V, n, T kaydırıcıları", "Piston animasyonu"],
      learn: "Sıcaklık artınca moleküller daha hızlı çarpar → basınç artabilir.",
    },
    "fourier-ses": {
      type: "Simülasyon",
      intro:
        "Her ses birçok sinüs dalgasının toplamıdır. FFT ile frekans bileşenlerini gör.",
      controls: ["Osilatör veya mikrofon", "Dalga tipi seç"],
      learn: "Müzik ve konuşma — farklı frekansların süperpozisyonu.",
    },
  };

  const TYPE_LABELS = {
    Oyun: "🎮",
    Fizik: "⚛️",
    Matematik: "📐",
    Kimya: "🧪",
    Biyoloji: "🧬",
    Simülasyon: "🔬",
  };

  function slugToTitle(slug) {
    return slug
      .replace(/\+/g, " & ")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function inferType(slug) {
    if (
      [
        "pong",
        "asteroids",
        "snake",
        "breakout",
        "tetris",
        "oyun-2048",
        "yasam-oyunu",
        "gezegen-savunmasi",
        "formul-hafiza",
        "mayin-tarlasi",
      ].includes(slug)
    )
      return "Oyun";
    if (
      slug.includes("fraktal") ||
      slug.includes("fibo") ||
      slug.includes("collatz") ||
      slug.includes("lorenz") ||
      slug.includes("mandelbrot") ||
      slug.includes("julia") ||
      slug.includes("pascal") ||
      slug.includes("hilbert") ||
      slug.includes("penrose") ||
      slug.includes("sierpinski") ||
      slug.includes("koch") ||
      slug.includes("barnsley") ||
      slug.includes("altin") ||
      slug.includes("tek-sayi") ||
      [
        "cizge-teorisi",
        "karmasik-sayilar",
        "pi-yaklasimi",
        "konik-kesitler",
        "matris-donusumleri",
      ].includes(slug)
    )
      return "Matematik";
    if (
      [
        "periyodik-tablo",
        "denklem-denklestirme",
        "asit-baz-titrasyonu",
        "kimyasal-kinetik",
        "atom-orbitalleri",
        "kristal-yapilar",
        "elektrokimya",
        "ideal-gaz",
        "ph-indikator",
        "molekul-sekli",
      ].includes(slug)
    )
      return "Kimya";
    if (
      [
        "dna-replikasyon",
        "mitoz-mayoz",
        "kalp-dolasim",
        "besin-agi",
        "av-avci-lotka-volterra",
        "dogal-secilim",
        "enzim-kinetigi",
        "fotosentez-solunum",
        "genetik-caprazlama",
      ].includes(slug)
    )
      return "Biyoloji";
    if (
      [
        "fourier-ses",
        "sezar-sifre",
        "siralama-algoritmalari",
        "bayes-olasilik",
        "yol-bulma-algoritmalari",
        "siralama-yarisi",
        "mantik-devresi",
        "enigma-makinesi",
        "ses-sentezleyici",
        "renk-teorisi",
      ].includes(slug)
    )
      return "Simülasyon";
    return "Fizik";
  }

  function getGuide(id) {
    if (GUIDES[id]) return GUIDES[id];
    const type = inferType(id);
    const title = slugToTitle(id);
    return {
      type,
      intro: `${title} sayfasındaki simülasyonu keşfet. Kaydırıcıları ve düğmeleri dene; grafik veya animasyon anında güncellenir.`,
      controls: [
        "Sayfadaki kaydırıcı ve düğmeleri kullan",
        "ℹ️ düğmesiyle bu paneli tekrar aç",
      ],
      learn: `${type} dersindeki kavramları görsel olarak pekiştirmek için tasarlandı.`,
    };
  }

  /* —— Yıldız arka planı —— */
  function initStars() {
    if (document.getElementById("starCanvas")) return;
    const canvas = document.createElement("canvas");
    canvas.id = "starCanvas";
    canvas.className = "app-stars";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);

    if (!document.querySelector(".app-aurora")) {
      const aurora = document.createElement("div");
      aurora.className = "app-aurora";
      aurora.setAttribute("aria-hidden", "true");
      document.body.prepend(aurora);
    }

    const ctx = canvas.getContext("2d");
    let stars = [];

    function sync() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function seed() {
      stars = [];
      const n = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.3 + 0.2,
          sp: Math.random() * 0.3 + 0.06,
          a: Math.random() * 0.45 + 0.2,
        });
      }
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
        s.y += s.sp;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(tick);
    }

    sync();
    seed();
    tick();
    window.addEventListener("resize", () => {
      sync();
      seed();
    });
  }

  /* —— Tema —— */
  const THEME_KEY = "acelya-theme";

  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  function updateThemeIcon(theme) {
    const btn = document.getElementById("appThemeBtn");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function initTheme() {
    const saved = getSavedTheme();
    if (saved === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }

  /* —— PWA —— */
  function initPWA() {
    // Manifest linki
    if (!document.querySelector("link[rel='manifest']")) {
      const manifest = document.createElement("link");
      manifest.rel = "manifest";
      manifest.href = "manifest.json";
      document.head.appendChild(manifest);
    }
    // Tema rengi
    if (!document.querySelector("meta[name='theme-color']")) {
      const tc = document.createElement("meta");
      tc.name = "theme-color";
      tc.content = "#06080f";
      document.head.appendChild(tc);
    }
    // Apple web app
    if (!document.querySelector("meta[name='apple-mobile-web-app-capable']")) {
      const apple = document.createElement("meta");
      apple.name = "apple-mobile-web-app-capable";
      apple.content = "yes";
      document.head.appendChild(apple);
    }
    // Service Worker
    if ("serviceWorker" in navigator && !navigator.serviceWorker.controller) {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    }
  }

  /* —— Üst çubuk —— */
  function initTopbar() {
    if (document.querySelector(".app-topbar")) return;

    const currentTheme = getSavedTheme();
    const themeIcon = currentTheme === "dark" ? "☀️" : "🌙";

    const title = document.title.split("|")[0].trim() || slugToTitle(pageId);
    const bar = document.createElement("header");
    bar.className = "app-topbar";
    bar.innerHTML = `
      <a class="app-home" href="index.html">← Ana sayfa</a>
      <span class="app-topbar-title">${title}</span>
      <div class="app-topbar-actions">
        <button type="button" class="app-btn-theme" id="appThemeBtn" title="Tema değiştir">${themeIcon}</button>
        <button type="button" class="app-btn-icon" id="appHelpBtn" title="Yardım">ℹ️</button>
      </div>`;
    document.body.prepend(bar);

    document.getElementById("appThemeBtn").addEventListener("click", toggleTheme);
    document
      .getElementById("appHelpBtn")
      .addEventListener("click", () => showIntro(true));
  }

  /* —— Giriş paneli —— */
  function showIntro(force) {
    const key = `acelya-guide-${pageId}`;
    if (!force && localStorage.getItem(key) === "1") return;

    const g = getGuide(pageId);
    const badge = TYPE_LABELS[g.type] || "📖";

    let overlay = document.getElementById("appIntroOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "appIntroOverlay";
      overlay.className = "app-intro-overlay";
      document.body.appendChild(overlay);
    }
    overlay.classList.remove("is-hidden");
    window.AcelyaPause?.setPaused(true);

    overlay.innerHTML = `
      <div class="app-intro-card" role="dialog" aria-labelledby="appIntroTitle">
        <span class="badge">${badge} ${g.type}</span>
        <h2 id="appIntroTitle">${slugToTitle(pageId)}</h2>
        <p><strong>Ne yapıyorsun?</strong> ${g.intro}</p>
        <p><strong>Kontroller</strong></p>
        <ul>${g.controls.map((c) => `<li>${c}</li>`).join("")}</ul>
        <p><strong>Öğrenme notu:</strong> ${g.learn}</p>
        <div class="app-intro-actions">
          <button type="button" class="app-btn-primary" id="appIntroStart">Başla</button>
          <button type="button" class="app-btn-ghost" id="appIntroAgain">Bir daha gösterme</button>
        </div>
      </div>`;

    document.getElementById("appIntroStart").onclick = () => {
      overlay.classList.add("is-hidden");
      window.AcelyaPause?.setPaused(false);
    };
    document.getElementById("appIntroAgain").onclick = () => {
      localStorage.setItem(key, "1");
      overlay.classList.add("is-hidden");
      window.AcelyaPause?.setPaused(false);
    };
  }

  function enhanceHints() {
    const g = getGuide(pageId);
    let hint = document.querySelector(".hint");
    const hud = document.querySelector(".hud, .app-content, main");
    if (!hint && hud) {
      hint = document.createElement("p");
      hint.className = "hint app-auto-hint";
      const h1 = hud.querySelector("h1");
      if (h1 && h1.nextSibling) hud.insertBefore(hint, h1.nextSibling);
      else hud.appendChild(hint);
    }
    if (hint && !hint.dataset.enhanced) {
      hint.dataset.enhanced = "1";
      const short = g.controls.slice(0, 3).join(" · ");
      hint.innerHTML = `<strong>${g.type === "Oyun" ? "Nasıl oynanır" : "Nasıl kullanılır"}:</strong> ${short}`;
    }
  }

  /* ── Temel Bilgi paneli ── */
  function initInfoPanel() {
    if (typeof PAGE_INFO === "undefined") return;
    let container = document.querySelector(".app-content");
    if (!container) container = document.body;
    if (!container || document.getElementById("appInfoToggle")) return;
    const info = PAGE_INFO[pageId];
    if (!info) return;
    const wrap = document.createElement("div");
    wrap.style.cssText = "max-width:680px;margin:24px auto 0;padding:0 12px;";
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.id = "appInfoToggle";
    toggle.className = "app-info-toggle";
    toggle.innerHTML = `📚 Temel Bilgi <span class="arrow">▾</span>`;
    const card = document.createElement("div");
    card.id = "appInfoCard";
    card.className = "app-info-card collapsed";
    card.innerHTML = `<h3>${info.title}</h3>${info.text}`;
    toggle.addEventListener("click", () => {
      const open = card.classList.toggle("collapsed");
      toggle.classList.toggle("open", !open);
      toggle.querySelector(".arrow").textContent = open ? "▾" : "▴";
    });
    wrap.appendChild(toggle);
    wrap.appendChild(card);
    container.appendChild(wrap);
  }

  function ensureFavicon() {
    if (window.AcelyaIcons) {
      AcelyaIcons.ensureIcons();
      return;
    }
    const s = document.createElement("script");
    s.src = "shared/icons.js";
    s.onload = () => window.AcelyaIcons?.ensureIcons();
    document.head.appendChild(s);
  }

  function loadScriptOnce(src, onload) {
    if (document.querySelector(`script[src="${src}"]`)) {
      onload();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = onload;
    document.head.appendChild(s);
  }

  function loadActivityTracker() {
    loadScriptOnce("shared/firebase-config.js", () => {
      loadScriptOnce("shared/activity.js", trackActivityVisit);
    });
  }

  function trackActivityVisit() {
    if (pageId === "bilgi") return;
    const u =
      window.AcelyaAuth?.getCurrentUser?.() ||
      sessionStorage.getItem("acelya-user") ||
      localStorage.getItem("acelya-user");
    if (u === "acelya" && window.AcelyaActivity) {
      const title = document.title.split("|")[0].trim();
      AcelyaActivity.logPageVisit(pageId, title);
    }
  }

  function loadGameKit() {
    const s = document.createElement("script");
    s.src = "shared/game-kit.js";
    s.onload = () => {
      if (window.AcelyaGameKit) AcelyaGameKit.initGamePage(pageId);
    };
    document.head.appendChild(s);
  }

  function init() {
    const body = document.body;
    if (!body || body.dataset.page === "index") return;
    pageId =
      body.dataset.page ||
      location.pathname.replace(/.*\//, "").replace(/\.html$/, "");
    document.documentElement.classList.add("app-root");
    body.classList.add("app-page");
    initTheme();
    initPWA();
    ensureFavicon();
    initStars();
    initTopbar();
    enhanceHints();
    loadPageInfo();
    loadActivityTracker();
    loadGameKit();
    setTimeout(() => showIntro(false), 120);
  }

  function loadPageInfo() {
    if (typeof PAGE_INFO !== "undefined") {
      initInfoPanel();
      return;
    }
    const s = document.createElement("script");
    s.src = "shared/page-info.js";
    s.onload = initInfoPanel;
    s.onerror = function () {
      console.warn("page-info.js yüklenemedi");
    };
    document.head.appendChild(s);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
