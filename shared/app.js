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

  /* ── Sayfa bilgi metinleri ── */
  const PAGE_INFO = {
    "newton-hareket-yasalari": {
      title: "Newton Hareket Yasaları",
      text: `<p>Sir Isaac Newton, 1687'de yayımladığı <em>Principia</em> ile hareketin üç temel yasasını ortaya koydu. Birinci yasa (eylemsizlik): Bir cisim üzerine net kuvvet etki etmedikçe duruyorsa durmaya, hareket ediyorsa sabit hızla hareket etmeye devam eder. Günlük hayatta bunu otobüs ani kalktığında geriye savrulurken, ani fren yaptığında öne doğru fırlarken yaşarız.</p><p>İkinci yasa, ivmenin sırrını verir: F = m·a. Yani bir cisme uygulanan net kuvvet, cismin kütlesiyle ivmesinin çarpımına eşittir. Aynı kuvveti küçük bir arabaya ve bir kamyona uyguladığımızda arabanın daha büyük ivmeyle hızlanması bu yüzden. Üçüncü yasa (etki-tepki) ise her kuvvete eşit büyüklükte ve zıt yönde bir tepki kuvveti olduğunu söyler: Duvara yumruk attığında elinin acımasının sebebi duvarın da sana aynı kuvvetle karşılık vermesidir.</p><p>Bu üç yasa, roketlerin uzaya fırlatılmasından köprü tasarımına, spor biyomekaniğinden araba kazalarının analizine kadar sayısız mühendislik ve fizik probleminde kullanılır. Klasik mekaniğin temel taşlarıdır.</p>`,
    },
    "normal-dagilim": {
      title: "Normal Dağılım",
      text: `<p>Normal dağılım, doğada en sık karşımıza çıkan istatistiksel dağılımdır — çan eğrisi olarak da bilinir. Ortalama etrafında simetrik olarak yayılan bu dağılımda verilerin yaklaşık %68'i ortalamadan bir standart sapma uzaklıkta, %95'i iki standart sapma içinde yer alır.</p><p>Bu dağılımın bu kadar yaygın olmasının sebebi <em>Merkezi Limit Teoremi</em>'dir: Yeterince büyük örneklemlerde, altta yatan dağılım ne olursa olsun, örneklem ortalamalarının dağılımı normale yaklaşır. İnsan boyları, sınav puanları, üretim hataları... hemen her yerde onu görürüz.</p><p>Gerçek dünyada normal dağılım; kalite kontrolden finansal risk analizine, ilaç dozajı hesaplamalarından sosyal bilimlerdeki anket değerlendirmelerine kadar pek çok alanda karar verme süreçlerinin temelini oluşturur. Z-skoru sayesinde herhangi bir değerin ortalamadan ne kadar uzak olduğunu standart birimlerle ifade edebiliriz.</p>`,
    },
    "optik-yansima-kirilma": {
      title: "Optik: Yansıma ve Kırılma",
      text: `<p>Işık bir ortamdan başka bir ortama geçerken hızı değişir ve bu da ışığın doğrultusunun değişmesine, yani kırılmasına yol açar. Snell Yasası bu olayı zarif bir denklemle açıklar: n₁·sinθ₁ = n₂·sinθ₂. Burada n kırılma indisi, θ ise ışığın normalle yaptığı açıdır. Kırılma indisi büyük olan ortamda ışık yavaşlar ve normale yaklaşır.</p><p>Yansıma ise ışığın bir yüzeye çarpıp geri dönmesidir; gelme açısı her zaman yansıma açısına eşittir. Ayna karşısında kendimizi görmemizden tutun da fiber optik kablolarda ışığın kilometrelerce yol almasına kadar her şey bu iki temel olayın sonucudur. Işık çok yoğun ortamdan az yoğun ortama geçerken belirli bir kritik açıyı aşarsa tam iç yansıma gerçekleşir — hiç kırılma olmaz, tüm ışık yansır.</p><p>Optik olaylar hayatımızın her yerinde: Gözlük camları ışığı kırarak retina üzerinde net görüntü oluşturur, elmasın parlaklığı yüksek kırılma indisinden kaynaklanır, serap olayları sıcak asfaltta ışığın kırılmasıyla oluşur. TYT ve AYT fizikte bu konu, dalga modeliyle derinlemesine işlenir.</p>`,
    },
    "pascal-ucgeni": {
      title: "Pascal Üçgeni ve Sierpinski",
      text: `<p>Pascal Üçgeni, her sayının üstündeki iki sayının toplamı olduğu basit bir kurala dayanır ama içinden binom açılımı katsayıları, Fibonacci dizisi, üçgensel sayılar ve kombinasyon hesapları çıkar. (a+b)ⁿ açılımındaki katsayıları sırayla üçgenin n'inci satırında bulursun.</p><p>Daha da şaşırtıcı olan: Pascal Üçgeni'nde tek sayıları boyayıp çift sayıları boş bırakırsan, karşına Sierpinski Üçgeni çıkar — yani bir fraktal! Bu, matematiğin farklı alanlarının nasıl derin bağlarla birbirine bağlı olduğunun en güzel örneklerinden biridir.</p><p>Pascal Üçgeni kombinatorik problemlerde, olasılık hesaplarında ve hatta bilgisayar biliminde dinamik programlama algoritmalarında karşımıza çıkar. Basit bir toplama kuralıyla inşa edilen bu üçgen, matematiğin derin yapısını keşfetmek için mükemmel bir oyun alanıdır.</p>`,
    },
    "penrose-dosemesi": {
      title: "Penrose Döşemesi",
      text: `<p>Penrose döşemesi, 1974'te Roger Penrose'un keşfettiği, düzlemi periyodik olmayan (kendini hiç tam olarak tekrar etmeyen) şekilde kaplayan bir döşeme biçimidir. Yalnızca iki farklı eşkenar dörtgen (kalın ve ince) kullanarak düzlemi sonsuza kadar, boşluksuz ve üst üste binmeden kaplayabilirsiniz — ama desen asla kendini tekrar etmez!</p><p>Bu döşemede altın oran (φ) her yerde karşınıza çıkar: Kalın ve ince parçaların sayılarının oranı, kenar uzunlukları, açılar... hepsi altın orana bağlıdır. Penrose döşemesinin keşfi, başlangıçta yalnızca matematiksel bir merak gibi görülse de 1984'te doğada yarı kristallerin (quasicrystal) keşfiyle büyük bir önem kazandı. Dan Shechtman bu keşifle 2011 Nobel Kimya Ödülü'nü aldı.</p><p>Döşemenin en büyüleyici yanı, yerel kurallarla (eşleştirme kuralları) inşa edilmesine rağmen ortaya küresel bir düzen çıkmasıdır. Parçaların kenarlarındaki desenler bir yapboz gibi birbirine oturur; yanlış yerleştirirseniz ileride mutlaka boşluk kalır. Bu, düzen ile kaos arasındaki sınırda duran büyüleyici bir geometri harikasıdır.</p>`,
    },
    "periyodik-tablo": {
      title: "Periyodik Tablo",
      text: `<p>Periyodik tablo, bilinen 118 elementi atom numaralarına göre sıralayan, kimyanın alfabesidir. Dmitri Mendeleyev 1869'da elementleri artan atom kütlesine göre dizdiğinde, benzer kimyasal özelliklerin periyodik olarak tekrar ettiğini fark etti — henüz keşfedilmemiş elementlerin yerini boş bırakacak kadar kendine güveniyordu ve haklı çıktı!</p><p>Tabloda soldan sağa gidildikçe atom yarıçapı küçülür, iyonlaşma enerjisi ve elektronegatiflik artar. Gruplar (dikey sütunlar) benzer kimyasal davranış gösteren elementleri bir araya getirir: 1A grubu alkali metaller suyla patlayıcı tepkime verirken, 8A grubu soy gazlar neredeyse hiç tepkimeye girmez. Geçiş metalleri renkli bileşikler oluşturur, lantanit ve aktinitler iç orbital doldurur.</p><p>Modern periyodik tablo, kuantum mekaniğinin öngörüleriyle şekillenmiştir: Elektronların orbitallere yerleşim düzeni (Aufbau ilkesi, Pauli dışarlama ilkesi, Hund kuralı) elementlerin periyot ve gruplarını belirler. Bu yüzden periyodik tablo yalnızca bir liste değil, evrendeki maddenin derin yapısını ortaya koyan bir haritadır.</p>`,
    },
    "ph-indikator": {
      title: "pH ve İndikatörler",
      text: `<p>pH, bir çözeltinin asidik mi yoksa bazik mi olduğunu 0-14 arası bir ölçekte ifade eder. pH = -log[H⁺] formülüyle hesaplanır; pH 7 nötr, 7'den küçük asidik, 7'den büyük baziktir. Saf suda H⁺ ve OH⁻ iyon derişimleri eşit olduğu için pH tam 7'dir.</p><p>İndikatörler, pH'a bağlı olarak renk değiştiren özel maddelerdir. Turnusol asitte kırmızı, bazda mavi olur; fenolftalein asitte renksiz, bazda pembe-mor ton alır. Evrensel indikatör ise geniş bir pH aralığında farklı renkler göstererek yaklaşık pH değerini tahmin etmemizi sağlar. Kırmızı lahana suyu bile doğal bir indikatör olarak kullanılabilir!</p><p>pH kavramı hayatımızın her alanında kritiktir: Mide özsuyu pH ~2 ile proteinleri sindirir, kanımız pH 7.35-7.45 aralığını tampon sistemleriyle korur, toprak pH'ı bitki yetiştiriciliğini belirler. Asit-baz titrasyonunda eşdeğerlik noktasında indikatörün renk değiştirmesi, derişimi bilinmeyen çözeltinin miktarını hesaplamamızı sağlar.</p>`,
    },
    pisagor: {
      title: "Pisagor Teoremi",
      text: `<p>Pisagor teoremi, matematiğin en ünlü denklemlerinden biridir: a² + b² = c². Bir dik üçgende, dik kenarların kareleri toplamı hipotenüsün karesine eşittir. Bu teorem yalnızca geometride değil, fizikte vektör bileşenlerinden mühendislikte mesafe hesaplamalarına kadar her yerde karşımıza çıkar.</p><p>Teoremin güzelliği, Pisagor'dan bin yıl önce Babillilerin ve eski Mısırlıların da bu ilişkiyi pratikte kullanmış olmasında yatar — Mısır'da Nil taştıktan sonra tarlaları yeniden ölçmek için 3-4-5 üçgeni kullanılırdı. Bugün GPS sisteminiz konumunuzu hesaplarken, perde arkasında Pisagor teoremi harıl harıl çalışır.</p><p>Bu simülasyonda dik üçgenin kenarlarını değiştirerek teoremi görsel olarak keşfedebilir, alanlar arasındaki ilişkiyi karelerle kanıtlayabilirsiniz. Pisagor teoremi, matematiğin evrenselliğinin en güzel örneklerinden biridir — kültürden ve zamandan bağımsız, her yerde aynı gerçeği söyler.</p>`,
    },
    "radyoaktif-bozunma": {
      title: "Radyoaktif Bozunma",
      text: `<p>Radyoaktif bozunma, kararsız atom çekirdeklerinin enerji ve parçacık yayarak daha kararlı hale gelme sürecidir. Alfa bozunmasında helyum çekirdeği (2 proton + 2 nötron), beta bozunmasında elektron veya pozitron, gama bozunmasında ise yüksek enerjili foton yayılır. Her bozunma türü, çekirdeğin atom ve kütle numarasını farklı şekilde değiştirir.</p><p>Bozunmanın en önemli özelliği <strong>yarı ömür</strong> kavramıdır: Belirli bir miktar radyoaktif maddenin yarısının bozunması için geçen süre. Bu süre her izotop için sabittir ve uranyum-238'de 4,5 milyar yıl iken, polonyum-214'te sadece 164 mikrosaniyedir! Karbon-14'ün 5730 yıllık yarı ömrü sayesinde arkeologlar fosillerin ve tarihi eserlerin yaşını belirleyebilir.</p><p>Bu simülasyonda farklı izotopların bozunma eğrilerini inceleyebilir, yarı ömür ile bozunma hızı arasındaki üstel ilişkiyi gözlemleyebilirsiniz. Radyoaktif bozunma, nükleer tıptan enerji üretimine, jeolojik tarihlendirmeden duman dedektörlerine kadar pek çok alanda kullanılır.</p>`,
    },
    "rastgele-yuruyus": {
      title: "Rastgele Yürüyüş",
      text: `<p>Rastgele yürüyüş, her adımda yönün rastgele seçildiği basit ama şaşırtıcı derecede derin bir matematiksel modeldir. Bir sarhoşun sokak lambasından uzaklaşma mesafesini düşünün: Her adımda eşit olasılıkla ileri veya geri gider. Sezgilerimizin aksine, bir veya iki boyutta rastgele yürüyen biri <strong>mutlaka</strong> başlangıç noktasına sonsuz kez geri döner!</p><p>Rastgele yürüyüş modelleri finans, fizik, biyoloji ve bilgisayar bilimlerinde yaygın olarak kullanılır. Borsa fiyat hareketleri (Brown hareketi), bir polen tanesinin suda izlediği zigzaglı yol, bir proteinin hücre içindeki difüzyonu — hepsi rastgele yürüyüşün farklı yüzleridir. Einstein'ın 1905'te yayımladığı Brown hareketi makalesi, atomların varlığını kanıtlayan en önemli çalışmalardan biriydi.</p><p>Bu simülasyonda bir ve iki boyutta rastgele yürüyüşleri görselleştirebilir, çok sayıda yürüyüşçünün istatistiksel davranışını inceleyebilirsiniz. Basit kuralların nasıl karmaşık ve güzel desenler üretebildiğini görmek için harika bir araçtır.</p>`,
    },
    "riemann-toplamlari": {
      title: "Riemann Toplamları",
      text: `<p>Bir eğrinin altındaki alanı hesaplamak istediğinizi düşünün. Alanı küçük dikdörtgenlere bölüp toplarsanız, <strong>Riemann toplamı</strong>nı elde edersiniz. Dikdörtgenleri sol uç, sağ uç veya orta noktadan başlatabilirsiniz — her biri farklı bir yaklaşım verir. Dikdörtgen sayısı arttıkça toplam, gerçek integral değerine yaklaşır.</p><p>Riemann toplamının güzelliği, integrali sezgisel olarak anlamamızı sağlamasıdır. Limit alarak dikdörtgen sayısını sonsuza gönderdiğinizde, toplam tam olarak belirli integrale dönüşür. Bu fikir, 19. yüzyılda Bernhard Riemann tarafından titizlikle formüle edildi ve calculus'un temel taşlarından biri haline geldi.</p><p>Bu simülasyonda farklı fonksiyonlar için Riemann toplamlarını görselleştirebilir, dikdörtgen sayısını değiştirerek yaklaşımın gerçek değere nasıl yakınsadığını izleyebilirsiniz. Sol, sağ ve orta nokta yöntemlerini karşılaştırarak hangisinin daha hızlı yakınsadığını keşfedin.</p>`,
    },
    sarkac: {
      title: "Basit Sarkaç ve Harmonik Hareket",
      text: `<p>Bir ipin ucuna bağlı kütlenin ileri geri salınımı, fiziğin en zarif sistemlerinden biridir. Küçük açılarda basit sarkaç <strong>basit harmonik hareket</strong> yapar ve periyodu T = 2π√(L/g) formülüyle yalnızca ip uzunluğuna (L) ve yerçekimi ivmesine (g) bağlıdır — kütleden bağımsızdır! Galileo'nun 1583'te Pisa Katedrali'nde sallanan bir avizeyi izleyerek bu keşfi yaptığı söylenir.</p><p>Sarkacın enerjisi kinetik ve potansiyel enerji arasında sürekli dönüşür. En alt noktada hız ve kinetik enerji maksimum, en uç noktalarda potansiyel enerji maksimumdur. Sürtünme olmadığında toplam mekanik enerji korunur ve sarkaç sonsuza kadar aynı genlikle salınır. Sarkaç aynı zamanda zaman ölçümünde devrim yaratmıştır: Christiaan Huygens 1656'da ilk sarkaçlı saati yapmıştır.</p><p>Bu simülasyonda sarkacın uzunluğunu, kütlesini ve başlangıç açısını değiştirerek periyot, hız ve enerji grafiklerini canlı izleyebilirsiniz. Büyük açılarda harmonik yaklaşımın bozulduğunu ve periyodun uzadığını gözlemleyin.</p>`,
    },
    "serbest-dusme": {
      title: "Serbest Düşme",
      text: `<p>Galileo'nun Pisa Kulesi'nden top bıraktığı efsanesi doğru olmasa da, serbest düşme fiziğin en temel hareketlerinden biridir. Hava direnci ihmal edildiğinde <strong>tüm cisimler kütlelerinden bağımsız olarak aynı ivmeyle düşer</strong>: g ≈ 9,8 m/s². Tüy ve çekicin Ay'da aynı anda yere düştüğünü gösteren Apollo 15 deneyi, bu gerçeğin en etkileyici kanıtıdır.</p><p>Serbest düşmede hız v = g·t, alınan yol h = ½g·t² formülleriyle hesaplanır. 1 saniyede 4,9 metre, 2 saniyede 19,6 metre, 3 saniyede 44,1 metre düşersiniz — mesafe zamanın karesiyle arttığı için düşüş hızla ivmelenir. Gerçek dünyada hava direnci devreye girdiğinde cisim <strong>limit hız</strong>a ulaşır ve artık ivmelenmez; paraşütçülerin serbest düşüşte saatte yaklaşık 200 km'de sabitlenmesi bu yüzdendir.</p><p>Bu simülasyonda farklı kütlelerdeki cisimleri bırakarak düşme süresini ve hızını ölçebilir, hava direncinin etkisini açıp kapatarak limit hız kavramını deneyimleyebilirsiniz. Serbest düşme, Newton mekaniğinin en yalın ve en öğretici örneklerinden biridir.</p>`,
    },
    "sezar-sifre": {
      title: "Sezar Şifresi",
      text: `<p>Sezar şifresi, tarihin en eski ve en basit şifreleme yöntemlerinden biridir. Adını Roma İmparatoru Jül Sezar'dan alır — Sezar generallerine gönderdiği gizli mesajlarda her harfi alfabede 3 harf ileri kaydırarak şifrelerdi. Örneğin A → D, B → E, C → F... Bu yönteme <strong>kaydırma şifresi</strong> de denir.</p><p>Çözmesi günümüz standartlarına göre çocuk oyuncağıdır (sadece 25 olası anahtar vardır), ama 2000 yıl önce bu basit yöntem yeterince güvenliydi çünkü düşmanların çoğu okuma yazma bile bilmiyordu! Sezar şifresi, kriptografinin temel kavramlarını anlamak için harika bir başlangıçtır: düz metin, şifreli metin, anahtar ve şifreleme/çözme algoritmaları.</p><p>Bu simülasyonda mesajları istediğiniz kaydırma miktarıyla şifreleyip çözebilir, farklı anahtarları deneyerek kriptanalizin (şifre kırma) temellerini keşfedebilirsiniz. Modern şifreleme yöntemleri (AES, RSA) çok daha karmaşık olsa da, temel prensipler Sezar'dan beri aynıdır: Bilgiyi, yalnızca doğru anahtara sahip kişilerin okuyabileceği hale dönüştürmek.</p>`,
    },
    "sierpinski-fraktali-peano-egrisi-altin-oran": {
      title: "Sierpinski, Peano ve Altın Oran",
      text: `<p>Bu sayfa, matematiğin üç büyüleyici kavramını bir araya getirir. <strong>Sierpinski Üçgeni</strong>, bir eşkenar üçgenin ortasındaki ters üçgeni çıkarıp kalan üçgenlerde aynı işlemi sonsuz kez tekrarlayarak elde edilen bir fraktaldır. Alanı sıfıra yaklaşır ama çevresi sonsuza gider. Aynı desen, Pascal Üçgeni'nde tek sayıları boyadığınızda da karşınıza çıkar!</p><p><strong>Peano Eğrisi</strong>, bir doğru parçasının sürekli kıvrılarak koca bir kareyi <em>tamamen</em> doldurabileceğini gösteren şaşırtıcı bir matematiksel yapıdır. 1890'da Giuseppe Peano'nun keşfettiği bu "uzay dolduran eğri", tek boyut ile iki boyut arasındaki sınırı bulanıklaştırır. <strong>Altın Oran</strong> (φ ≈ 1,618) ise doğada, sanatta ve mimaride tekrar tekrar karşımıza çıkan estetik bir sayıdır — ayçiçeğinden Mimar Sinan'ın eserlerine kadar.</p><p>Bu simülasyonda üç kavramı yan yana etkileşimli olarak keşfedin: Sierpinski'nin iterasyonlarını artırın, Peano eğrisinin kareyi nasıl doldurduğunu izleyin ve altın dikdörtgenin spiralle dansını gözlemleyin. Matematiğin güzelliğini üç farklı pencereden seyredin.</p>`,
    },
    "siralama-algoritmalari": {
      title: "Sıralama Algoritmaları",
      text: `<p>Bir deste iskambil kağıdını sıralamak kolaydır, ama bir bilgisayarın milyonlarca veriyi sıralaması gerektiğinde işler değişir. <strong>Sıralama algoritmaları</strong>, verileri belirli bir düzene koymak için kullanılan adım adım yöntemlerdir. Bubble Sort (kabarcık sıralaması) en basit ama en yavaş olanıdır; her geçişte komşu elemanları karşılaştırarak büyük olanı sona taşır.</p><p>Daha hızlı algoritmalar farklı stratejiler kullanır: Quick Sort bir "pivot" seçip diziyi bölerek çalışır (böl ve yönet), Merge Sort diziyi küçük parçalara ayırıp sıralı olarak birleştirir, Insertion Sort ise elinizdeki kağıtları tek tek doğru yere yerleştirmeye benzer. En hızlı genel amaçlı sıralama algoritmaları O(n log n) karmaşıklığa sahiptir — yani veri 10 katına çıkınca işlem süresi yaklaşık 33 katına çıkar.</p><p>Bu simülasyonda farklı algoritmaları görsel olarak karşılaştırabilir, hızlarını adım adım izleyebilir ve hangi durumda hangi algoritmanın daha verimli olduğunu keşfedebilirsiniz. Sıralama algoritmaları, bilgisayar biliminin en temel ve en çok çalışılmış konularından biridir.</p>`,
    },
    "taylor-serisi": {
      title: "Taylor Serisi",
      text: `<p>Taylor serisi, karmaşık fonksiyonları sonsuz bir polinom toplamı olarak ifade etmenin zarif bir yoludur. Temel fikir şudur: Bir fonksiyonun belirli bir noktadaki değerini ve tüm türevlerini biliyorsanız, fonksiyonu o nokta etrafında istediğiniz hassasiyette yaklaşık olarak hesaplayabilirsiniz. f(x) ≈ f(a) + f'(a)(x-a) + f''(a)(x-a)²/2! + f'''(a)(x-a)³/3! + ...</p><p>Bu seri, bilgisayarların sinüs, kosinüs, üstel ve logaritma gibi fonksiyonları hesaplamasının temel yöntemidir. Hesap makinenizde sin(0,5)'e bastığınızda, perde arkasında Taylor serisi çalışır! Serinin harika bir özelliği, ne kadar çok terim eklerseniz yaklaşımın o kadar isabetli olmasıdır. Bazı fonksiyonlar için yakınsama o kadar hızlıdır ki birkaç terim bile mükemmel sonuç verir.</p><p>Bu simülasyonda sin(x), cos(x), e^x gibi fonksiyonların Taylor açılımlarını görselleştirebilir, terim sayısını artırarak polinomun gerçek fonksiyona nasıl sarıldığını izleyebilirsiniz. Brook Taylor'ın 1715'te yayımladığı bu fikir, modern bilimin vazgeçilmez hesaplama araçlarından biridir.</p>`,
    },
    "tek-sayi-toplam": {
      title: "Tek Sayı Toplamları",
      text: `<p>Ardışık tek sayıları topladığınızda inanılmaz bir desen ortaya çıkar: 1 = 1², 1+3 = 4 = 2², 1+3+5 = 9 = 3², 1+3+5+7 = 16 = 4²... Yani ardışık n tane tek sayının toplamı her zaman n²'dir! Bu basit ama şaşırtıcı sonuç, sayılar teorisinin en estetik örüntülerinden biridir ve cebirsel olarak (2k-1) serisinin toplam formülüyle kanıtlanır.</p><p>Bu örüntüyü görsel olarak da açıklayabiliriz: 1 tane nokta ile bir kare (1×1) oluşur. 3 nokta daha eklerseniz 2×2'lik kare, 5 nokta daha eklerseniz 3×3'lük kare... Her seferinde bir L şekli (gnomon) ekleyerek kareyi büyütmüş olursunuz. Bu geometrik yorum, sayısal örüntünün nedenini gözler önüne serer.</p><p>Bu simülasyonda farklı n değerleri için tek sayı toplamlarını görselleştirebilir, karelerin nasıl oluştuğunu adım adım izleyebilirsiniz. Sayıların ardındaki gizli simetriyi keşfetmek için harika bir başlangıçtır.</p>`,
    },
    termodinamik: {
      title: "Termodinamik",
      text: `<p>Termodinamik, ısı, iş ve enerji arasındaki ilişkileri inceleyen fiziğin devasa bir dalıdır. Dört temel yasayla yönetilir: Sıfırıncı yasa "ısıl denge" kavramını tanımlar — A ile B aynı sıcaklıktaysa ve B ile C de aynı sıcaklıktaysa, A ile C de aynı sıcaklıktadır. Birinci yasa enerjinin korunumudur: Bir sisteme verilen ısı, sistemin iç enerji artışı ile yaptığı işin toplamına eşittir (ΔU = Q - W).</p><p>İkinci yasa belki de en derin olanıdır: Evrendeki toplam <strong>entropi</strong> (düzensizlik) sürekli artar. Bu yüzden kırılan bir bardak kendiliğinden eski haline dönmez, sıcak çay soğur ama soğuk çay kendiliğinden ısınmaz. Üçüncü yasa ise mutlak sıfıra (0 Kelvin) yaklaştıkça entropinin minimuma indiğini söyler.</p><p>Termodinamik, buhar makinelerinden buzdolaplarına, araba motorlarından insan metabolizmasına kadar her şeyi açıklar. Enerji verimliliği, yenilenebilir enerji ve iklim değişikliği tartışmalarının temelinde hep termodinamik yatar. Bu simülasyonda izotermal, izobarik ve adyabatik süreçleri görsel olarak keşfedebilirsiniz.</p>`,
    },
    "tork-denge": {
      title: "Tork ve Denge",
      text: `<p>Bir kapıyı menteşesine yakın yerden itmekle kolun ucundan itmek arasındaki farkı hiç düşündünüz mü? İşte bu, <strong>tork</strong> kavramıdır: τ = r × F. Tork, kuvvetin döndürme etkisidir ve hem kuvvetin büyüklüğüne hem de dönme eksenine olan dik uzaklığa (moment kolu) bağlıdır. Anahtarı ucundan tutarak sıkmanın daha kolay olması bu yüzdendir.</p><p>Bir cisim dengedeyse iki koşul birden sağlanmalıdır: Net kuvvet sıfır olmalı (<strong>öteleme dengesi</strong>) ve net tork sıfır olmalı (<strong>dönme dengesi</strong>). Tahterevallide farklı ağırlıktaki iki kişinin dengeyi sağlamak için farklı uzaklıklara oturması, tork dengesinin klasik örneğidir. Kütle merkezi kavramı da burada devreye girer: Bir cismin tüm kütlesinin toplandığı varsayılan noktadır.</p><p>Bu simülasyonda kuvvetleri ve moment kollarını değiştirerek tork hesaplamaları yapabilir, cisimlerin hangi koşullarda dengede kaldığını veya dönmeye başladığını gözlemleyebilirsiniz. Tork ve denge, köprü tasarımından kaldıraçlara, vücut biyomekaniğinden robot kollarına kadar mühendisliğin her dalında kritik öneme sahiptir.</p>`,
    },
    turev: {
      title: "Türev",
      text: `<p>Türev, bir fonksiyonun anlık değişim hızını ölçen matematiksel bir araçtır. Bir arabanın hız göstergesini düşünün: Konum-zaman grafiğinin eğimi size hızı, hız-zaman grafiğinin eğimi ise ivmeyi verir — işte türev tam olarak budur. Matematiksel olarak f'(x) = lim[h→0] (f(x+h)-f(x))/h şeklinde tanımlanır: İki noktayı birleştiren sekant doğrusunun eğiminin, noktalar birbirine sonsuz yaklaştığındaki limit değeri.</p><p>Türevin gücü, optimizasyon problemlerinde ortaya çıkar: Bir fonksiyonun maksimum veya minimum noktalarını bulmak için türevini sıfıra eşitlersiniz. Şirketler kârlarını maksimize etmek, mühendisler malzeme maliyetini minimize etmek için türev kullanır. Türev aynı zamanda değişimin dilidir: Nüfus artış hızı, salgının yayılma temposu, bir roketin ivmelenmesi — hepsi türevle modellenir.</p><p>Bu simülasyonda farklı fonksiyonların türevlerini görselleştirebilir, sekantın teğete nasıl dönüştüğünü adım adım izleyebilir ve türevin geometrik anlamını keşfedebilirsiniz. Newton ve Leibniz'in 17. yüzyılda bağımsız olarak geliştirdiği türev hesabı, modern bilimin belki de en önemli matematiksel aracıdır.</p>`,
    },
    vektorler: {
      title: "Vektörler",
      text: `<p>Vektörler, hem büyüklüğü hem de yönü olan niceliklerdir — fizikteki en temel kavramlardan biridir. Hız, kuvvet, ivme, momentum, elektrik alan... hepsi vektörel büyüklüklerdir. Vektörleri toplarken asla sayısal değerleri doğrudan toplayamazsınız; uç uca ekleme veya paralelkenar yöntemini kullanmanız gerekir. 3 N kuzey + 4 N doğu = 5 N kuzeydoğu (Pisagor!)</p><p>Her vektör, bileşenlerine ayrılabilir: F_x = F·cosθ, F_y = F·sinθ. Bu ayrıştırma, karmaşık kuvvet problemlerini basitleştirmenin anahtarıdır. Eğik düzlemde kayan bir cisim, eğik atıştaki bir top, köprüyü çeken halatlar — hepsi vektör analiziyle çözülür. Skaler çarpım (iş hesabı) ve vektörel çarpım (tork, manyetik kuvvet) iki farklı çarpma işlemidir ve her biri farklı fiziksel anlam taşır.</p><p>Bu simülasyonda vektörleri görsel olarak toplayıp çıkarabilir, bileşenlerine ayırabilir ve bileşke vektörün yön ve büyüklüğünü anlık görebilirsiniz. Vektörler olmadan fizik yapmak, pusulasız denize açılmak gibidir — yönünüzü asla tam olarak bilemezsiniz.</p>`,
    },
    "yay-kutle": {
      title: "Yay-Kütle Sistemi",
      text: `<p>Yay-kütle sistemi, basit harmonik hareketin en temel ve en öğretici örneğidir. Hooke Yasası'na göre yayın uyguladığı kuvvet F = -k·x'tir; burada k yay sabiti (sertlik), x ise denge konumundan uzaklıktır. Eksi işareti, kuvvetin her zaman denge konumuna doğru yöneldiğini gösterir — buna <strong>geri çağırıcı kuvvet</strong> denir.</p><p>Sistemin periyodu T = 2π√(m/k) formülüyle hesaplanır. Yay sertleştikçe (k artar) periyot kısalır, kütle arttıkça (m artar) periyot uzar. Enerji sürekli olarak kinetik ve potansiyel formlar arasında salınır: Denge noktasında kinetik enerji maksimum, uç noktalarda potansiyel enerji maksimumdur. Sürtünme eklendiğinde <strong>sönümlü harmonik hareket</strong> devreye girer ve genlik zamanla azalır.</p><p>Bu simülasyonda kütleyi ve yay sabitini değiştirerek salınımı gözlemleyebilir, konum-zaman ve hız-zaman grafiklerini eş zamanlı izleyebilir, hatta sönüm katsayısı ekleyerek gerçek hayattaki amortisör davranışını modelleyebilirsiniz. Yay-kütle sistemi, deprem yalıtımından araba süspansiyonuna kadar pek çok mühendislik uygulamasının temelidir.</p>`,
    },
    "kepler-yasalari": {
      title: "Kepler Yasaları",
      text: `<p>Johannes Kepler, 17. yüzyılın başında Tycho Brahe'nin hassas gözlem verilerini kullanarak gezegenlerin hareketini açıklayan üç devrimsel yasa ortaya koydu. <strong>Birinci yasa (elips yasası)</strong>: Her gezegen Güneş etrafında eliptik bir yörüngede dolanır ve Güneş bu elipsin odaklarından birinde bulunur. Bu, binlerce yıldır kabul gören dairesel yörünge inancını yıkan büyük bir sıçramaydı.</p><p><strong>İkinci yasa (alanlar yasası)</strong>: Gezegeni Güneş'e bağlayan hayali çizgi, eşit zaman aralıklarında eşit alanlar tarar. Yani gezegen Güneş'e yaklaştıkça hızlanır, uzaklaştıkça yavaşlar. Dünya ocak ayında (günberi) temmuz ayına (günöte) göre daha hızlı hareket eder! <strong>Üçüncü yasa (periyotlar yasası)</strong> ise bir gezegenin yörünge periyodunun karesi ile ortalama uzaklığının küpü arasında sabit bir oran olduğunu söyler: T² ∝ a³.</p><p>Kepler yasaları, Newton'ın evrensel kütle çekim yasasına giden yolu açmış ve gök mekaniğinin temelini atmıştır. Bugün uydu yörüngelerinden ötegezegen keşfine kadar uzayla ilgili her hesaplamada Kepler'in izleri vardır.</p>`,
    },
    "kirinim-izgarasi": {
      title: "Kırınım Izgarası",
      text: `<p>Birbirine çok yakın aralıklarla dizilmiş binlerce ince yarıktan oluşan kırınım ızgarası, ışığın dalga doğasını en etkileyici şekilde gözler önüne serer. Işık bu yarıklardan geçerken her bir yarık yeni bir dalga kaynağı gibi davranır ve bu dalgalar birbiriyle girişim yapar. Sonuç: Ekranda parlak ve karanlık çizgilerden oluşan büyüleyici bir desen!</p><p>Parlak çizgilerin (maksimumların) oluştuğu açılar, ünlü <strong>ızgara denklemi</strong> ile hesaplanır: d·sinθ = n·λ. Burada d yarıklar arası mesafe, θ sapma açısı, n maksimumun derecesi (0, ±1, ±2...), λ ise ışığın dalga boyudur. Işığın dalga boyu büyüdükçe veya yarık aralığı küçüldükçe saçaklar birbirinden uzaklaşır. Beyaz ışık kullanıldığında her dalga boyu farklı açıda kırınıma uğradığı için gökkuşağı benzeri renkli bir spektrum oluşur.</p><p>Kırınım ızgaraları, spektroskopide elementlerin parmak izini okumak için kullanılır: Her element kendine özgü dalga boylarında ışık yayar ve bu sayede yıldızların kimyasal bileşimini milyonlarca ışık yılı öteden belirleyebiliriz. CD ve DVD'lerin üzerindeki gökkuşağı renkleri de aslında doğal birer kırınım ızgarasıdır!</p>`,
    },
    "duran-dalgalar": {
      title: "Duran Dalgalar",
      text: `<p>Bir ipin iki ucunu sabitleyip titreştirdiğinizde, gelen ve yansıyan dalgaların üst üste binmesiyle <strong>duran dalga</strong> oluşur. Adının aksine bu dalga hiçbir yere ilerlemez; enerjiyi hapsolmuş gibi belirli noktalar arasında salındırır. Duran dalga deseninde hiç hareket etmeyen noktalara <strong>düğüm noktası</strong>, maksimum genlikle titreşen noktalara ise <strong>karın noktası</strong> denir.</p><p>Bir ipte oluşabilecek duran dalgalar ipin uzunluğuna ve dalga boyuna bağlıdır: L = n·λ/2 (n = 1, 2, 3...). n=1 temel frekansı (ilk harmonik), daha büyük n değerleri ise üst harmonikleri verir. Gitarda aynı tele farklı perdelerden basarak farklı notalar çıkarmanızın sebebi budur: Parmağınız ipi kısaltarak duran dalganın dalga boyunu ve dolayısıyla frekansı değiştirir.</p><p>Duran dalgalar sadece iplerde değil, hava sütunlarında (flüt, org), deprem dalgalarında, mikrodalga fırınlarda ve hatta kuantum mekaniğinde parçacıkların kutu içindeki davranışında bile karşımıza çıkar. Bir konser salonunun akustiği, istenmeyen duran dalgaları engelleyecek şekilde tasarlanır.</p>`,
    },
    "kara-cisim-isimasi": {
      title: "Kara Cisim Işıması",
      text: `<p><strong>Kara cisim</strong>, üzerine düşen tüm elektromanyetik radyasyonu soğuran ve ısıtıldığında bu enerjiyi karakteristik bir spektrumda geri yayan idealize edilmiş bir nesnedir. Güneş, erimiş demir, akkor halindeki bir ampul teli — hepsi yaklaşık olarak kara cisim gibi davranır. Sıcaklık arttıkça yayılan ışığın rengi değişir: Kırmızı → turuncu → sarı → beyaz → mavi.</p><p>Kara cisim ışımasını klasik fizik açıklayamadı. Rayleigh-Jeans yasası düşük frekanslarda tutarlıydı ama yüksek frekanslara çıkıldığında sonsuz enerji öngörüyordu — bu felakete <strong>morötesi katastrof</strong> adı verildi. Çözümü 1900'de Max Planck getirdi: Enerjinin sürekli değil, <em>kuantum</em> adı verilen kesikli paketler halinde (E = h·f) yayıldığını öne sürdü. Bu fikir kuantum mekaniğinin doğuşu oldu!</p><p>Wien'in yer değiştirme yasası (λ<sub>max</sub>·T = 2,898×10<sup>−3</sup> m·K) sayesinde bir yıldızın renginden sıcaklığını hesaplayabiliriz. Stefan-Boltzmann yasası (P ∝ T⁴) ise sıcaklığın dördüncü kuvvetiyle yayılan toplam gücün nasıl arttığını gösterir. Kara cisim ışıması, termal kameralardan kozmik mikrodalga fon ışımasına kadar evreni anlamamızda kilit rol oynar.</p>`,
    },
    "nukleer-fizik": {
      title: "Nükleer Fizik: Bağlanma Enerjisi",
      text: `<p>Atom çekirdeğini bir arada tutan kuvvet, evrendeki en güçlü temel kuvvet olan <strong>güçlü nükleer kuvvet</strong>tir. Protonlar birbirini elektriksel olarak iterken, bu kuvvet onları çekirdeğin içinde bir arada tutar. İlginç olan şu: Çekirdeği oluşturan proton ve nötronların toplam kütlesi, oluşturdukları çekirdeğin kütlesinden daha <em>büyüktür</em>! Aradaki farka <strong>kütle eksiği</strong> denir ve bu eksik kütle Einstein'ın E = mc² formülü uyarınca bağlanma enerjisine dönüşmüştür.</p><p><strong>Nükleon başına bağlanma enerjisi</strong> grafiği, nükleer fiziğin en önemli eğrilerinden biridir. Demir-56 (Fe-56) en yüksek bağlanma enerjisine sahip çekirdektir; bu yüzden evrendeki en kararlı elementtir. Demirden hafif çekirdekler birleştiğinde (<strong>füzyon</strong>) enerji açığa çıkar — yıldızlar böyle parlar. Demirden ağır çekirdekler bölündüğünde (<strong>fisyon</strong>) enerji açığa çıkar — nükleer santraller ve atom bombası böyle çalışır.</p><p>Bağlanma enerjisi, yıldızların neden demirden sonra çöktüğünü, süpernova patlamalarında ağır elementlerin nasıl oluştuğunu ve nükleer reaktörlerin nasıl çalıştığını anlamanın anahtarıdır. Vücudumuzdaki kalsiyumdan akciğerlerimizdeki oksijene kadar demirden ağır tüm elementler, bir zamanlar süpernova patlamalarında oluşmuştur — hepimiz kelimenin tam anlamıyla yıldız tozuyuz!</p>`,
    },
    "yildiz-yasam-dongusu": {
      title: "Yıldız Yaşam Döngüsü ve H-R Diyagramı",
      text: `<p>Yıldızlar da tıpkı canlılar gibi doğar, yaşar ve ölür — sadece çok daha görkemli bir şekilde. Her şey dev bir moleküler bulutun kütle çekimiyle çökmesiyle başlar. Merkezde sıcaklık 10 milyon Kelvin'i aştığında hidrojen füzyonu ateşlenir ve bir <strong>ana kol yıldızı</strong> doğar. Güneşimiz tam 4,6 milyar yıldır bu aşamada ve önünde yaklaşık 5 milyar yıl daha var.</p><p><strong>Hertzsprung-Russell (H-R) Diyagramı</strong>, yıldızların sıcaklık (veya rengi) ile parlaklığı arasındaki ilişkiyi gösteren astrofiziğin en önemli grafiğidir. Yıldızların yaklaşık %90'ı ana kol üzerinde yer alır; küçük ve soğuk kırmızı cüceler sağ altta, dev mavi süper devler sol üstte bulunur. Bir yıldızın H-R diyagramındaki konumu, onun kütlesini, yaşını ve evrimsel geleceğini tek bakışta ortaya koyar.</p><p>Küçük kütleli yıldızlar (Güneş gibi) yakıtları bitince kırmızı deve dönüşür, dış katmanlarını uzaya savurarak gezegenimsi bulutsu oluşturur ve geriye <strong>beyaz cüce</strong> kalır. Büyük kütleli yıldızlar ise demir çekirdek oluşturduktan sonra çöker ve muazzam bir <strong>süpernova</strong> patlamasıyla ölür; geriye nötron yıldızı veya kara delik kalır. Bu patlamalar evrene karbon, oksijen, demir gibi yaşam için gerekli elementleri saçar.</p>`,
    },
    "takimyildiz-haritasi": {
      title: "Takımyıldız Haritası",
      text: `<p>Geceleri gökyüzüne baktığınızda gördüğünüz yıldızların oluşturduğu desenler, binlerce yıldır insanlığın hayal gücünü beslemiştir. <strong>Takımyıldızlar</strong>, gökyüzünde birbirine yakın görünen yıldız gruplarına verilen isimlerdir. Uluslararası Astronomi Birliği (IAU) bugün 88 takımyıldızı resmi olarak tanır. Büyük Ayı (Ursa Major), Orion (Avcı) ve Cassiopeia en bilinenlerindendir.</p><p>Takımyıldızlar aslında fiziksel olarak birbirine yakın olmayan, Dünya'dan bakıldığında aynı doğrultuda görünen yıldızlardan oluşur. Örneğin Orion'un kemerindeki üç yıldız gökyüzünde yan yana dizilmiş gibi görünse de, aslında birbirlerinden yüzlerce ışık yılı uzaktadırlar. Bu bir tür kozmik perspektif yanılsamasıdır! Kutup Yıldızı (Polaris), Küçük Ayı takımyıldızının kuyruğunda yer alır ve Dünya'nın dönme eksenine çok yakın olduğu için her zaman kuzeyi gösterir.</p><p>Takımyıldız haritaları, gökyüzünü mevsimlere göre düzenler: Yaz Üçgeni (Vega, Deneb, Altair) yaz gecelerinin, Orion ise kış gecelerinin habercisidir. Antik denizciler yönlerini bulmak, çiftçiler ekim-hasat zamanlarını belirlemek için takımyıldızlara bakardı. Bugün bile amatör gökbilimciler ve astrofotoğrafçılar için takımyıldız haritaları vazgeçilmez bir rehberdir.</p>`,
    },
    "lorenz-cekici2": {
      title: "Lorenz Çekicisi (3B)",
      text: `<p>Lorenz çekicisi, kaos teorisinin en ikonik yapılarından biridir. 1963'te meteorolog Edward Lorenz, hava durumunu modellemeye çalışırken basit üç diferansiyel denklemin inanılmaz derecede karmaşık ve öngörülemez davranışlar üretebildiğini keşfetti. Bu keşif, <strong>kelebek etkisi</strong> kavramının doğmasına yol açtı: Bir kelebeğin kanat çırpışı bile, teorik olarak, dünyanın öbür ucunda bir kasırgayı tetikleyebilir.</p><p>Lorenz sisteminin denklemleri görünüşte zararsızdır: dx/dt = σ(y-x), dy/dt = x(ρ-z)-y, dz/dt = xy-βz. Ama çözümleri 3B uzayda kelebek kanadını andıran büyüleyici bir fraktal yapı oluşturur. Yörünge asla kendini tekrar etmez ama belirli bir bölgede (çekicide) sonsuza kadar dolanır durur. Başlangıç koşullarındaki en ufak değişiklik, kısa sürede tamamen farklı bir yörüngeye yol açar — işte bu, kaosun özüdür.</p><p>Bu simülasyonda Lorenz çekicisini üç boyutlu olarak döndürüp yakınlaştırabilir, farklı başlangıç koşullarının nasıl bambaşka yörüngeler ürettiğini ve çekicinin fraktal yapısını keşfedebilirsiniz. Kaos teorisi, deterministik sistemlerin bile uzun vadede öngörülemez olabileceğini göstererek bilim dünyasında bir devrim yaratmıştır.</p>`,
    },
    molekul: {
      title: "Molekül",
      text: `<p>Moleküller, iki veya daha fazla atomun kimyasal bağlarla bir araya gelmesiyle oluşan, maddenin kimyasal özelliklerini taşıyan en küçük yapı taşlarıdır. Bir su molekülü (H₂O) iki hidrojen ve bir oksijen atomundan oluşur ve bu basit birleşim, yaşamın temelini oluşturur. Molekülleri bir arada tutan bağlar <strong>kovalent bağ</strong> (elektron paylaşımı), <strong>iyonik bağ</strong> (elektron transferi) ve <strong>metalik bağ</strong> olarak üç ana gruba ayrılır.</p><p>Moleküllerin üç boyutlu yapısı, işlevlerini belirleyen en kritik faktördür. VSEPR kuramı (Değerlik Kabuğu Elektron Çifti İtmesi), molekül geometrisini tahmin etmemizi sağlar: Elektron çiftleri birbirini iterek mümkün olan en uzak konumlara yerleşir. Örneğin CO₂ doğrusal (180°), H₂O açısal (≈104,5°), NH₃ üçgen piramit şeklindedir. Bu geometrik farklar, moleküllerin polaritesini, kaynama noktasını ve kimyasal tepkimelerdeki davranışını kökten değiştirir.</p><p>Bu simülasyonda molekülleri üç boyutlu olarak inceleyebilir, bağ açılarını ölçebilir ve farklı atomların nasıl bir araya geldiğini keşfedebilirsiniz. DNA'nın çift sarmal yapısından proteinlerin karmaşık katlanmalarına, ilaç moleküllerinin hedef proteinlere kenetlenmesinden nanoteknolojiye kadar her şey moleküler yapı anlayışımıza dayanır.</p>`,
    },
    "tek-sayi-toplam3": {
      title: "Tek Sayıların Toplamı ve Kareleri",
      text: `<p>Ardışık tek sayıların toplamı, matematiğin en zarif sürprizlerinden birini barındırır: İlk n tek sayının toplamı tam olarak n²'ye eşittir! 1+3=4=2², 1+3+5=9=3², 1+3+5+7=16=4²... Bu desen sonsuza kadar devam eder. Pisagorcular bu keşfi geometrik olarak da kanıtlamışlardı: Noktaları kare şeklinde dizdiğinizde, her yeni L-şeklindeki katman bir sonraki tek sayı kadar nokta ekler.</p><p>Bu ilişki yalnızca estetik bir güzellik değil, cebirsel ispatı da son derece öğreticidir: Aritmetik dizi toplam formülüyle (n/2)(2a₁+(n-1)d) kullanıldığında, a₁=1 ve d=2 için sonuç n² çıkar. Bu, matematiğin farklı yollarının aynı gerçeğe nasıl ulaştığını gösteren harika bir örnektir.</p><p>Tek sayı toplamları sayı teorisinin kapılarını aralar: Kare sayılar, üçgensel sayılar, dikdörtgensel sayılar... hepsi birbiriyle bağlantılıdır. Bu simülasyonda tablo ve adım adım görselleştirme ile bu ilişkileri keşfedebilir, farklı sınır değerleri için toplamların nasıl kusursuz kareler oluşturduğunu gözlemleyebilirsiniz.</p>`,
    },
    "tek-sayi-toplam4": {
      title: "Tek Sayı Toplamı — Adım Adım Keşif",
      text: `<p>Matematikte bazen en basit desenler en derin gerçekleri saklar. Ardışık tek sayıları topladığınızda ortaya çıkan kare sayılar, antik Yunan'dan beri matematikçileri büyülemiştir. 1=1², 1+3=4=2², 1+3+5=9=3², 1+3+5+7=16=4²... Bu mükemmel kareler zinciri sonsuza kadar bozulmadan devam eder.</p><p>Bu ilişkiyi görsel olarak anlamak için kare bir ızgara düşünün: 1×1'lik bir kareye, 3 birimlik L-şeklinde bir çerçeve ekleyince 2×2'lik kare elde edilir. 5 birimlik bir çerçeve daha 3×3 yapar. Her çerçeve, kenar uzunluğunu 1 artırmak için gereken tam birim sayısıdır — ve bu sayı her zaman bir sonraki tek sayıdır.</p><p>Adım adım ilerleyen bu simülasyonla, her yeni tek sayı eklendiğinde toplamın nasıl bir tam kareye dönüştüğünü izleyebilir, cebirsel ispatı ve geometrik yorumu bir arada görebilirsiniz. Bu, sayıların gizli dünyasına açılan büyüleyici bir penceredir.</p>`,
    },
    "tek-sayi-toplam5": {
      title: "Tek Sayı Toplamı — Seri Yaklaşımı",
      text: `<p>Ardışık tek sayıların toplamının kare sayıları vermesi, matematiğin en temel ve en şaşırtıcı sonuçlarından biridir. Bu desen sadece ilk birkaç sayı için değil, istediğiniz kadar ileri götürseniz bile bozulmadan çalışır — işte matematiksel ispatın gücü tam da burada yatar.</p><p>Formülün arkasındaki mantık aslında çok basittir: Aritmetik dizilerin toplamı, (terim sayısı) × (ilk terim + son terim) / 2 formülüyle hesaplanır. Tek sayılar için ilk terim 1, son terim 2n−1, terim sayısı n olduğundan toplam = n × (1+2n−1)/2 = n × 2n/2 = n² olur. Cebir, geometrik sezgiyi kusursuz bir kesinliğe dönüştürür.</p><p>Bu seri yaklaşımı simülasyonunda, formülün adım adım nasıl çalıştığını, farklı n değerleri için toplamın nasıl n²'ye ulaştığını ve aradaki ilişkiyi keşfedebilirsiniz. Sayı teorisi ve cebirin kesişim noktasında duran bu basit ama derin gerçek, matematiğin güzelliğini en yalın haliyle sunar.</p>`,
    },
    "mandelbrot+lorenz": {
      title: "Mandelbrot + Lorenz: Fraktal ve Kaos",
      text: `<p>Bu özel simülasyon, matematiğin en büyüleyici iki yapısını bir araya getiriyor: Mandelbrot kümesi ve Lorenz çekicisi. Her ikisi de basit denklemlerden doğan inanılmaz karmaşıklığın örnekleridir. Mandelbrot kümesi z → z² + c formülüyle, Lorenz çekicisi ise konveksiyon akışını modelleyen üç diferansiyel denklemle üretilir. Biri fraktal geometrinin, diğeri kaos teorisinin bayrak gemisidir.</p><p>Mandelbrot kümesi karmaşık düzlemde tanımlanır ve sonsuz detaya sahip bir kıyı şeridi oluşturur — ne kadar yakınlaşırsanız yakınlaşın, her zaman keşfedilecek yeni desenler bulursunuz. Lorenz çekicisi ise 3B uzayda bir kelebek kanadı şeklinde dolanan, asla kendini tekrar etmeyen ama belirli bir bölgeden çıkamayan bir yörünge çizer.</p><p>Bu iki yapıyı aynı simülasyonda incelemek, deterministik kaos ile fraktal geometri arasındaki derin bağlantıyı hissetmenizi sağlar. Her ikisi de doğanın temel bir özelliğini yansıtır: Basit kurallar, inanılmaz derecede karmaşık ve güzel yapılar üretebilir.</p>`,
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
    const content = document.querySelector(".app-content");
    if (!content || document.getElementById("appInfoToggle")) return;
    const info = PAGE_INFO[pageId];
    if (!info) return;
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
    content.appendChild(toggle);
    content.appendChild(card);
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
    initInfoPanel();
    loadActivityTracker();
    loadGameKit();
    setTimeout(() => showIntro(false), 120);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
