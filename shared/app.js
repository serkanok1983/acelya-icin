/**
 * Açelya — ortak kabuk: yıldızlar, ana sayfa, sesler, giriş rehberi
 */

/* Sesler — sayfa scriptlerinden önce kullanılabilir */
(function initSounds() {
  const SOUND_PREF_KEY = "acelya-sound-muted";
  const SOUND_FILES = {
    hit: "hit.m4a",
    explode: "explode.m4a",
    laser: "laser.m4a",
    thrust: "thrust.m4a",
  };
  const soundCache = {};
  let unlocked = false;
  let muted = false;
  try {
    muted = localStorage.getItem(SOUND_PREF_KEY) === "1";
  } catch (_) {
    // Depolama kapalıysa ses tercihi yalnız bu oturumda tutulur.
  }
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
      if (!unlocked || muted) return;
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
    isMuted() {
      return muted;
    },
    setMuted(value) {
      muted = Boolean(value);
      Object.values(soundCache).forEach((sound) => {
        sound.muted = muted;
        if (muted) sound.pause();
      });
      try {
        localStorage.setItem(SOUND_PREF_KEY, muted ? "1" : "0");
      } catch (_) {
        // Tercihin saklanamaması ses kontrolünü engellememeli.
      }
      window.dispatchEvent(
        new CustomEvent("acelya-sound-change", { detail: { muted } }),
      );
      return muted;
    },
    toggleMuted() {
      return window.AcelyaSounds.setMuted(!muted);
    },
  };

  function unlockAudio() {
    unlocked = true;
    // Ses bağlamını açmak için sessizce dene — muted ile garantili sessiz
    Object.keys(SOUND_FILES).forEach((key) => {
      const s = getSound(key);
      if (!s) return;
      s.muted = true;
      s.play()
        .then(() => {
          s.pause();
          s.currentTime = 0;
          s.muted = muted;
          s.volume = key === "thrust" ? 0.35 : 0.55;
        })
        .catch(() => {
          s.muted = muted;
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
  const GAME_IDS = new Set([
    "pong",
    "asteroids",
    "snake",
    "breakout",
    "oyun-2048",
    "yasam-oyunu",
    "tetris",
    "gezegen-savunmasi",
    "formul-hafiza",
    "mayin-tarlasi",
    "hanoi-kuleleri",
    "uzay-kosucusu",
    "isik-sondurme",
  ]);
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
        if (PauseState.paused) {
          const keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "Space"];
          keys.forEach((code) => {
            document.dispatchEvent(
              new KeyboardEvent("keyup", {
                code,
                key: code === "Space" ? " " : code,
                bubbles: true,
              }),
            );
          });
        }
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
    "bilim-atlasi": {
      type: "Simülasyon",
      intro:
        "Temel bilimleri birbirine bağlayan ana keşif haritası. Konu dünyalarını incele, ön koşullu rotayı izle ve tamamladığın durakları cihazında sakla.",
      controls: [
        "Arama alanına kavram, düzey veya anahtar sözcük yaz",
        "Konu kartlarından anlatıma ya da laboratuvara geç",
        "Duraklardaki onay kutularıyla ilerlemeni kaydet",
      ],
      learn:
        "Bilimsel yöntemden matematiksel modellere, fizikten canlı sistemlere uzanan kavram bağlarını ve öğrenme sırasını görürsün.",
    },
    "bilimsel-yontem-olcme-ve-belirsizlik": {
      type: "Simülasyon",
      intro:
        "İyi bir bilimsel iddiayı sınanabilir yapan öğeleri ve her ölçümde bulunan belirsizliği keşfet. Sanal cetvelle veri topla; çözünürlük, rastgele değişim ve sistematik kaymayı ayır.",
      controls: [
        "Önce tahminini yaz, sonra cetvel ayarlarını değiştir",
        "Ölçüm Al ile tekrarlı veri topla; ortalama ve aralığı karşılaştır",
        "Görev panosunu Tahmin → Test → Gözle → Açıkla sırasıyla tamamla",
      ],
      learn:
        "Değişken, kontrol, tekrarlı ölçüm, doğruluk, kesinlik, çözünürlük ve ölçüm belirsizliği kavramlarını kanıta dayalı bir deney akışı içinde kullanırsın.",
    },
    "hareket-ve-grafikler": {
      type: "Fizik",
      intro:
        "Konum-zaman grafiğinin eğimini hıza, hız-zaman grafiğinin alanını yer değiştirmeye bağlayan hareket laboratuvarı.",
      controls: [
        "Başlangıç konumu, ilk hız, ivme ve süreyi ayarla",
        "Oynat ile hareketi ve iki grafiği eş zamanlı izle",
        "Tahminini sonuçlarla karşılaştırıp görev açıklamasını yaz",
      ],
      learn:
        "Referans noktası, yer değiştirme, hız, ivme, grafik eğimi ve grafik altında kalan alan arasındaki ilişkileri kurarsın.",
    },
    "momentum-itme-ve-carpismalar": {
      type: "Fizik",
      intro:
        "İki arabanın bir boyutlu çarpışmasında toplam momentumu, kinetik enerjiyi ve esneklik katsayısını karşılaştır.",
      controls: [
        "Kütleleri, başlangıç hızlarını ve esneklik katsayısını ayarla",
        "Çarpıştır ile sistemi çalıştır; önce/sonra değerlerini oku",
        "Sistem sınırını belirleyip Tahmin → Test → Gözle → Açıkla görevini tamamla",
      ],
      learn:
        "Momentum korunumu ile kinetik enerji korunumunun aynı iddia olmadığını; itmenin momentum değişimine eşitliğini gözlemlersin.",
    },
    "lineer-cebir-ve-ozdegerler": {
      type: "Matematik",
      intro:
        "Matrisleri uzayı dönüştüren makineler olarak incele; özdeğerlerin tekrarlı dönüşümlerdeki doğal yönleri nasıl belirlediğini keşfet.",
      controls: [
        "a, b ve d ile simetrik 2×2 matrisi değiştir",
        "Vektör açısını ayarla; v ile Av'yi karşılaştır",
        "Altın özdoğrultuları determinant ve özdeğerlerle birlikte oku",
      ],
      learn:
        "Lineer dönüşüm, determinant, baz, özvektör, köşegenleştirme ve izdüşüm fikirlerini geometrik bir bütün olarak kurarsın.",
    },
    "cok-degiskenli-kalkulus": {
      type: "Matematik",
      intro:
        "Bir yüzeyin seviye haritasında dolaş; kısmi türevleri ve gradyanı yerel değişim yönü olarak gör.",
      controls: [
        "(x,y) noktasını değiştir",
        "xy bağlaşımıyla yüzey biçimini dönüştür",
        "Yürüyüş yönünü çevirip yönlü türevi karşılaştır",
      ],
      learn:
        "Kısmi türev, gradyan, yönlü türev, Jacobian ve çift integral arasında temsil geçişi yaparsın.",
    },
    "diferansiyel-denklemler": {
      type: "Matematik",
      intro:
        "Bir sistemin anlık değişim yasasından zaman grafiği ve faz yörüngesi üret; sönümle kararlılığın izini sür.",
      controls: [
        "Yay sabiti ve sönümü değiştir",
        "Başlangıç konumu ile hızını ayarla",
        "x(t) grafiğini (x,v) faz portresiyle karşılaştır",
      ],
      learn:
        "Başlangıç koşulu, denge, kararlılık, faz uzayı ve sayısal çözümün ne söylediğini ayırt edersin.",
    },
    "maxwell-denklemleri-ve-alanlar": {
      type: "Fizik",
      intro:
        "Elektrik ve manyetik alanların boşlukta birbirini üreten bir dalga olarak nasıl ilerlediğini Maxwell çerçevesinde incele.",
      controls: [
        "Göreli frekansı ve alan genliğini değiştir",
        "Fazı ilerletip iki alanı birlikte izle",
        "Frekans–dalga boyu ilişkisini sonuç panelinden oku",
      ],
      learn:
        "Akı, dolaşım, indüksiyon, yer değiştirme akımı ve elektromanyetik enerji akışını tek kuramda birleştirirsin.",
    },
    "entropi-ve-istatistiksel-fizik": {
      type: "Fizik",
      intro:
        "Parçacıkların sol–sağ dağılımlarını say; makrodurum olasılığının ve Boltzmann entropisinin parçacık sayısıyla nasıl keskinleştiğini gör.",
      controls: [
        "Toplam parçacık sayısını değiştir",
        "Soldaki parçacık sayısını denge çevresinde kaydır",
        "Çokluk, olasılık ve lnΩ değerini birlikte karşılaştır",
      ],
      learn:
        "Mikrodurum, makrodurum, çokluk ve ikinci yasanın istatistiksel anlamını birbirinden ayırırsın.",
    },
    "kimyasal-denge-ve-gibbs-enerjisi": {
      type: "Kimya",
      intro:
        "Standart Gibbs enerjisi, sıcaklık ve anlık bileşimden K ile Q'yu hesaplayarak tepkimenin net yönünü bul.",
      controls: [
        "ΔG° ve sıcaklığı değiştir; K'nın yanıtını izle",
        "log₁₀Q ile karışımın anlık bileşimini değiştir",
        "ΔG işaretini ileri, geri ve denge bölgeleriyle karşılaştır",
      ],
      learn:
        "Dinamik dengeyi; Q, K, ΔG ve katalizörün farklı rollerini nicel biçimde yorumlarsın.",
    },
    "gen-ifadesi-ve-molekuler-biyoloji": {
      type: "Biyoloji",
      intro:
        "Transkripsiyon, translasyon ve yıkım hızlarından mRNA ile protein düzeylerinin zamana bağlı yanıtını üret.",
      controls: [
        "Transkripsiyon ve translasyon hızlarını değiştir",
        "mRNA ve protein yıkımını ayrı ayrı ayarla",
        "Denge düzeylerini ve yarı ömürleri karşılaştır",
      ],
      learn:
        "DNA–RNA–protein akışını kromatin, RNA işlenmesi, geri besleme ve moleküler gürültüyle birlikte düşünürsün.",
    },
    "algoritma-karmasikligi": {
      type: "Bilgisayar Bilimi",
      intro:
        "Girdi boyutunu büyüt; log n'den 2ⁿ'e farklı maliyet sınıflarının aynı logaritmik grafikte nasıl ayrıştığını gör.",
      controls: [
        "n değerini 2 ile 100 arasında değiştir",
        "Beş büyüme sınıfının işlem sayılarını karşılaştır",
        "Grafiğin logaritmik düşey ölçeğini hesaba kat",
      ],
      learn:
        "O, Ω, Θ; en kötü, ortalama ve amorti edilmiş analiz ile zaman–bellek değiş tokuşunu ayırt edersin.",
    },
    pong: {
      type: "Oyun",
      intro:
        "Sol raketi yönet, bilgisayarın dönüşlerini oku ve 20 sayıya önce ulaş. Space topu isteğe bağlı hızlandırır; hız arttıkça tepki süren kısalır.",
      controls: [
        "↑ ↓ veya parmağını dikey kaydır — raketi yönet",
        "Space — topu hızlandır; P — oyunu duraklat",
      ],
      learn:
        "Topun hareketi konum ve hız vektörleriyle güncellenir. Duvara çarpmada düşey hızın, rakete çarpmada yatay hızın işareti değişir. Bilgisayar raketi ise hedef konuma gecikmeli yaklaşan basit bir geri besleme denetleyicisidir.",
      strategy:
        "Top raketine nerede çarparsa bir sonraki yörüngenin nasıl değişeceğini tahmin et. Space kullanmadan beş sayı almayı dene; sonra aynı hedefi daha yüksek hızda tekrarla.",
      deeper:
        "Üniversite köprüsü: vektörel yansıma, ayrık zamanlı hareket ve oransal denetim (P-kontrol).",
    },
    asteroids: {
      type: "Oyun",
      intro:
        "Uzay gemini döndür, kısa itişlerle hız vektörünü değiştir ve kayaları lazerle parçala. Büyük kayalar daha küçük parçalara ayrılır; üç canın bittiğinde görev yeniden başlar.",
      controls: [
        "← → — geminin yönünü döndür",
        "↑ — motor itişi; Space — lazer; P — duraklat",
      ],
      learn:
        "Gemi baktığı yöne değil, mevcut hız vektörünün götürdüğü yöne ilerler. İtiş bu vektöre yeni bir bileşen ekler; bu, Newton’un birinci ve ikinci yasalarının oyunlaştırılmış bir modelidir. Ekranın karşı kenarından dönmek torus topolojisine benzer.",
      strategy:
        "Motoru sürekli açık tutma: kısa darbelerle hızını düzelt, sonra dönüp nişan al. Küçük asteroitlerin puanı yüksek ama hedef alanı küçüktür.",
      deeper:
        "Üniversite köprüsü: vektör bileşenleri, sayısal zaman adımları, dairesel olmayan çarpışma sınırları ve toroidal uzay.",
    },
    snake: {
      type: "Oyun",
      intro:
        "Yılanı yönlendir, renkli yemleri topla ve kendi gövdene çarpmadan büyü. Kenarlar duvar değildir: bir kenardan çıkınca karşı kenardan devam edersin.",
      controls: [
        "Ok tuşları veya kaydırma — yön değiştir",
        "Her yem +10 puan; her 100 puanda tempo artar; P — duraklat",
      ],
      learn:
        "Yılan gövdesi bir kuyruk veri yapısı gibi güncellenir: yeni baş öne eklenir, yem yenmediyse son parça çıkarılır. Çarpışma denetimi yeni başın gövde koordinatlarından biriyle eşleşip eşleşmediğini sınar.",
      strategy:
        "Alanı küçük döngülere bölmek yerine uzun ve geri dönüş yolu açık rotalar kur. Hız yükselmeden önce ani ters dönüş yapamayacağını hesaba kat.",
      deeper:
        "Üniversite köprüsü: kuyruk veri yapıları, durum güncellemesi, ayrık ızgara geometrisi ve yol planlama.",
    },
    breakout: {
      type: "Oyun",
      intro:
        "Topu raket üzerinde tut, 40 tuğlanın tamamını kır ve artan hıza uyum sağla. Her on tuğlada hız yaklaşık %8 artar.",
      controls: [
        "← → veya yatay kaydırma — raketi taşı",
        "P — duraklat; Yeni Oyun — tahtayı sıfırla",
      ],
      learn:
        "Topun konumu her karede hız vektörüyle güncellenir. Bir yüzeye çarpınca yüzeye dik hız bileşeninin işareti çevrilir; bu, ideal esnek yansımanın sadeleştirilmiş modelidir.",
      strategy:
        "Raketin merkezini topun öngörülen iniş noktasına götür. Üst köşelerde açılan koridorlar topun tuğlaların arkasında uzun süre kalmasını sağlayabilir.",
      deeper:
        "Üniversite köprüsü: çarpışma normalleri, vektörel yansıma, ayrık zaman adımı ve tünelleme hatası.",
    },
    "oyun-2048": {
      type: "Oyun",
      intro:
        "Aynı değerli karoları birleştirerek 2048’e ulaş. Her geçerli hamleden sonra boş bir hücrede çoğunlukla 2, bazen 4 doğar.",
      controls: ["Ok tuşu / kaydırma — bütün karoları seçilen yöne taşı"],
      learn:
        "Her karo 2ⁿ biçimindedir; iki eşit karo birleşince üs bir artar. 2048 = 2¹¹ olduğundan hedef karoda on bir kat ikileme birikmiştir. Her hamle, belirsiz bir yeni karoyla değişen bir durum uzayında karar verir.",
      strategy:
        "En büyük karoyu bir köşede tutup değerleri o köşeye doğru sıralamayı dene. Boş hücre sayısını korumak, tek hamlede yüksek puan almaktan çoğu zaman değerlidir.",
      deeper:
        "Üniversite köprüsü: logaritmalar, durum uzayı, açgözlü sezgiseller ve beklenen değerle karar verme.",
    },
    "yasam-oyunu": {
      type: "Oyun",
      intro:
        "Başlangıç desenini çiz ve yalnızca yerel komşuluk kurallarının bütün sistemi nasıl dönüştürdüğünü izle. Izgaranın karşı kenarları birbirine bağlıdır.",
      controls: [
        "Çiz — tıkla veya sürükle; Rastgele — yeni başlangıç üret",
        "Oynat / Durdur — otomatik evrim; Adım — tek nesil ilerle",
      ],
      learn:
        "Canlı hücre 2–3 komşuyla yaşar; ölü hücre tam 3 komşuyla doğar. Merkezi yönetim olmadan sabit, salınımlı ve hareketli örüntülerin belirmesi ‘ortaya çıkan davranış’a güçlü bir örnektir.",
      strategy:
        "Üç hücrelik yatay bir çizgiyle başlayıp periyot-2 salınımını gözle. Sonra beş hücrelik desenler kurup hangilerinin söndüğünü, hangilerinin kararlı kaldığını sınıflandır.",
      deeper:
        "Üniversite köprüsü: hücresel otomatlar, dinamik sistemler, başlangıç koşullarına duyarlılık ve evrensel hesaplama fikri.",
    },
    tetris: {
      type: "Oyun",
      intro:
        "Yedi tetrominoyu döndürüp yerleştir, boşluksuz satırlar kur ve yükselen tempoda tahtayı açık tut. Her on satır yeni bir seviye başlatır.",
      controls: [
        "← → — taşı; ↑ — döndür; ↓ — hızlandır",
        "Space — anında düşür; P — duraklat",
      ],
      learn:
        "Tetrominolar dört eş kareden oluşan poliominolardır. Döndürme matris dönüşümüne, çarpışma denetimi ise ızgara üzerindeki doluluk testine karşılık gelir. İyi oyun, yüzey yüksekliği ve kapalı boşluklar arasında optimizasyon yapar.",
      strategy:
        "Derin kuyular ve üstü kapanmış boşluklar oluşturma. Sonraki parçayı kullanarak yalnız mevcut hamleyi değil, iki adımlık yüzey profilini düşün.",
      deeper:
        "Üniversite köprüsü: dönüşüm matrisleri, sezgisel arama, çok ölçütlü optimizasyon ve durum uzayı.",
    },
    "gezegen-savunmasi": {
      type: "Oyun",
      intro:
        "Ana gezegeni yaklaşan cisimlerden koru. Mermiler ve düşmanlar, ekrandaki gezegenlerin çekimi altında eğri yollar izler.",
      controls: [
        "← → veya dokunup sürükleme — namluyu yönlendir",
        "Space / basılı tut — ateş; P — duraklat",
      ],
      learn:
        "Çekim ivmesi uzaklığın karesiyle azalır ve her zaman gezegene yönelir. Oyun, bu ivmeyi küçük zaman adımlarında hıza; hızı da konuma ekleyerek yörüngeyi yaklaşık hesaplar.",
      strategy:
        "Hedefin bulunduğu yere değil, çekim altında eğilecek yolun biraz ilerisine nişan al. Yakın gezegenlerin mermiyi hangi yöne saptırdığını karşılaştır.",
      deeper:
        "Üniversite köprüsü: ters-kare kuvveti, Euler tipi sayısal integrasyon, başlangıç değer problemi ve yörünge mekaniği.",
    },
    "formul-hafiza": {
      type: "Oyun",
      intro:
        "Sekiz fizik kavramını doğru denklemle eşleştir. Amaç yalnız sembol biçimini ezberlemek değil, denklemin hangi büyüklükleri ilişkilendirdiğini hatırlamaktır.",
      controls: ["Karta dokun/tıkla — çevir; iki kart bir denemedir"],
      learn:
        "Mekanik, elektrik, dalgalar, akışkanlar ve modern fizikten seçilen bağıntıları birlikte tekrar edersin. Denklem doğru görünse bile birim analiziyle sınanmalıdır; örneğin kuvvetin birimi kg·m/s²’dir.",
      strategy:
        "Kartın yalnız yerini değil türünü de kodla: ‘kavram kartı, sol üst’ gibi. Eşleşince formülü sesli okuyup her sembolün anlamını söyle.",
      deeper:
        "Üniversite köprüsü: boyut analizi, ölçekleme, model varsayımları ve aynı sembolün farklı bağlamlarda değişen anlamı.",
    },
    "mayin-tarlasi": {
      type: "Oyun",
      intro:
        "Sayıların sekiz komşu içindeki mayın sayısını verdiği alanda güvenli hücreleri çıkarımla bul. İlk açılan hücre ve çevresi güvenlidir.",
      controls: [
        "Sol tık/dokun — aç; sağ tık veya uzun bas — bayrak",
        "İmleç altındaki yüzde, yerel kısıtlardan üretilen yaklaşık güven olasılığıdır",
      ],
      learn:
        "Her açık sayı bir kısıt denklemidir: çevresindeki bilinmeyen mayınların toplamı, sayıdan yerleştirilmiş bayraklar çıkarılınca kalan değere eşittir. Gösterilen yüzde kesin çözüm değil, bu yerel kısıtların basit bir tahminidir.",
      strategy:
        "Bir sayının kalan kapalı komşu sayısı kalan mayın sayısına eşitse hepsi mayındır; kalan mayın sıfırsa diğerlerinin hepsi güvenlidir.",
      deeper:
        "Üniversite köprüsü: koşullu olasılık, kısıt sağlama problemleri, Bayesçi güncelleme ve bilgi kazancı.",
    },
    "hanoi-kuleleri": {
      type: "Oyun",
      intro:
        "Diskleri soldan sağ kuleye taşı: her hamlede yalnız üstteki disk oynar ve büyük disk küçük diskin üzerine gelemez. Disk sayısı büyüdükçe gereken iş hızla artar.",
      controls: [
        "Bir kuleye dokun — üst diski seç; hedef kuleye dokun — yerleştir",
        "Geri Al — son hamle; Çöz — özyinelemeli çözümü adım adım göster",
      ],
      learn:
        "n diski taşımak için önce n−1 diski yardımcı kuleye, en büyük diski hedefe, sonra n−1 diski hedefe taşımak gerekir. Bu T(n)=2T(n−1)+1 bağıntısını ve minimum 2ⁿ−1 hamleyi üretir.",
      strategy:
        "Önce en büyük diskin hedefe gidebilmesi için hangi kulenin boş kalması gerektiğini düşün. Dört diskte minimumun 15, beş diskte 31 olduğunu oyunda doğrula.",
      deeper:
        "Üniversite köprüsü: özyineleme, matematiksel tümevarım, üstel büyüme ve algoritma karmaşıklığı.",
    },
    "isik-sondurme": {
      type: "Oyun",
      intro:
        "Bir hücreye dokununca kendisi ile dikey-yatay komşuları terslenir. Bütün ışıkları söndürmek için hamle dizisini keşfet.",
      controls: [
        "Hücreye dokun — artı biçimli beşliyi tersle",
        "Geri Al — son hamle; İpucu — o anda en çok ışığı azaltan adayı vurgula",
      ],
      learn:
        "Her ışığı 0/1, her hamleyi mod 2 toplama olarak düşünebilirsin: aynı düğmeye iki kez basmak etkisini yok eder. Böylece oyun GF(2) üzerinde doğrusal denklem sistemine dönüşür.",
      strategy:
        "İlk satır için bir seçim yapıp sonraki satırlarda yalnız üstte kalan ışığı söndüren düğmeye basmayı dene. Aynı düğmeye iki kez basmanın gereksiz olduğunu unutma.",
      deeper:
        "Üniversite köprüsü: ikili matrisler, Gauss eliminasyonu, sonlu cisimler ve tersinir dönüşümler.",
    },
    "uzay-kosucusu": {
      type: "Oyun",
      intro:
        "Asteroit ve lazerlerden kaç, yıldız zincirleriyle kombonu büyüt, kalkan-mıknatıs-hız güçlerini doğru zamanda kullan. Üç zıplama hakkın vardır.",
      controls: [
        "Tıkla / Space / ↑ — zıpla; havada tekrar bas — ek zıplama",
        "P — duraklat; oyun bitince tıkla veya Space — yeniden başlat",
      ],
      learn:
        "Düşey harekette her karede yerçekimi hıza, hız konuma eklenir; bu yüzden zıplama yolu yaklaşık paraboldür. Mesafe arttıkça oyun hızı yükselerek tepki süresini azaltır.",
      strategy:
        "Bütün zıplamaları bir anda tüketme. İlk zıplamayı engelin tabanına yakın yap, havadaki hakları düzeltme payı olarak sakla; yıldız zincirlerinde mıknatısın menzilini gözle.",
      deeper:
        "Üniversite köprüsü: sabit ivmeli hareket, ayrık simülasyon, çarpışma kutuları ve uyarlanabilir zorluk eğrisi.",
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
        "Tekil elektron algılamaları ekranda noktalar oluşturur. Yollar ayırt edilemezken noktalar girişim saçaklarında birikir; yol bilgisi fiziksel olarak kaydedildiğinde koherens ve saçak görünürlüğü azalır.",
      controls: [
        "Otomatik ateş — sürekli elektron",
        "Yol ölçümü — yolları ayırt edilebilir yap",
        "Tek yarık — kırınım karşılaştırması",
        "λ, d, L kaydırıcıları",
      ],
      learn:
        "Born kuralında |ψ|² olasılık yoğunluğunu verir. Ölçüm aygıtıyla etkileşim fiziksel bir süreçtir; bilinçli gözlemci gerekmez.",
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
    "Bilgisayar Bilimi": "💻",
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    const hasInfo = typeof PAGE_INFO !== "undefined" && PAGE_INFO[pageId];
    const isGame = GAME_IDS.has(pageId);
    const hasNotebook = hasInfo || isGame;

    const title = document.title.split("|")[0].trim() || slugToTitle(pageId);
    const bar = document.createElement("header");
    bar.className = "app-topbar";
    bar.innerHTML = `
      <a class="app-home" href="index.html" aria-label="Ana sayfaya dön">← <span class="app-home-label">Ana sayfa</span></a>
      <span class="app-topbar-title">${title}</span>
      <div class="app-topbar-actions">
        ${hasNotebook ? '<button type="button" class="app-btn-icon" id="appInfoBtn" title="Araştırma defterini aç" aria-label="Araştırma defterini aç">📓</button>' : ""}
        ${isGame ? '<button type="button" class="app-btn-icon" id="appPauseBtn" title="Oyunu duraklat (P)" aria-label="Oyunu duraklat">⏯️</button>' : ""}
        ${isGame ? '<button type="button" class="app-btn-icon" id="appSoundBtn" title="Oyun sesini kapat" aria-label="Oyun sesini kapat">🔊</button>' : ""}
        <button type="button" class="app-btn-theme" id="appThemeBtn" title="Tema değiştir" aria-label="Temayı değiştir">${themeIcon}</button>
        <button type="button" class="app-btn-icon" id="appHelpBtn" title="Görev brifingi" aria-label="Görev brifingini aç">ℹ️</button>
      </div>`;
    document.body.prepend(bar);

    if (hasNotebook) {
      document
        .getElementById("appInfoBtn")
        .addEventListener("click", showInfoOverlay);
    }
    if (isGame) {
      document.getElementById("appPauseBtn").addEventListener("click", togglePause);
      document.getElementById("appSoundBtn").addEventListener("click", () => {
        const muted = window.AcelyaSounds?.toggleMuted?.();
        updateSoundUI(Boolean(muted));
      });
      updateSoundUI(Boolean(window.AcelyaSounds?.isMuted?.()));
    }
    document.getElementById("appThemeBtn").addEventListener("click", toggleTheme);
    document
      .getElementById("appHelpBtn")
      .addEventListener("click", () => showIntro(true));
  }

  /* ── Pause ── */
  let pauseDialogDismiss = null;

  function togglePause() {
    const paused = !window.AcelyaPause?.isPaused();
    window.AcelyaPause?.setPaused(paused);
    updatePauseUI(paused);
  }

  function updatePauseUI(paused) {
    const btn = document.getElementById("appPauseBtn");
    if (btn) {
      btn.textContent = paused ? "▶️" : "⏯️";
      btn.title = paused ? "Oyuna devam et (P)" : "Oyunu duraklat (P)";
      btn.setAttribute("aria-label", paused ? "Oyuna devam et" : "Oyunu duraklat");
      btn.setAttribute("aria-pressed", paused ? "true" : "false");
    }
    let overlay = document.getElementById("appPauseOverlay");
    if (paused) {
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "appPauseOverlay";
        overlay.className = "app-pause-overlay";
        overlay.innerHTML =
          '<div class="app-pause-card" role="dialog" aria-modal="true" aria-labelledby="appPauseTitle"><span class="app-pause-kicker">OYUN BEKLEMEDE</span><div class="app-pause-text" id="appPauseTitle">⏸ Duraklatıldı</div><div class="app-pause-hint">Hazır olduğunda kaldığın yerden devam et.</div><button type="button" class="app-btn-primary" id="appPauseResume">Devam et</button></div>';
        document.body.appendChild(overlay);
        document.getElementById("appPauseResume").addEventListener("click", togglePause);
      }
      overlay.classList.remove("hidden");
      if (!pauseDialogDismiss) {
        pauseDialogDismiss = activateAccessibleDialog(
          overlay,
          document.getElementById("appPauseResume"),
          () => {
            if (window.AcelyaPause?.isPaused()) {
              window.AcelyaPause.setPaused(false);
              updatePauseUI(false);
            }
          },
        );
      }
    } else {
      if (overlay) overlay.classList.add("hidden");
      if (pauseDialogDismiss) {
        const dismiss = pauseDialogDismiss;
        pauseDialogDismiss = null;
        dismiss("programmatic");
      }
    }
  }

  function updateSoundUI(muted) {
    const btn = document.getElementById("appSoundBtn");
    if (!btn) return;
    btn.textContent = muted ? "🔇" : "🔊";
    btn.title = muted ? "Oyun sesini aç" : "Oyun sesini kapat";
    btn.setAttribute("aria-label", muted ? "Oyun sesini aç" : "Oyun sesini kapat");
    btn.setAttribute("aria-pressed", muted ? "true" : "false");
  }

  // Klavye: P tuşu ile pause toggle (sadece oyun sayfalarında)
  document.addEventListener("keydown", (e) => {
    if (e.key === "p" || e.key === "P") {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      )
        return;
      if (!GAME_IDS.has(pageId)) return;
      const blockingDialog = Array.from(
        document.querySelectorAll('[role="dialog"]'),
      ).some(
        (dialog) =>
          dialog.getClientRects().length > 0 &&
          !dialog.closest("#appPauseOverlay"),
      );
      if (blockingDialog) return;
      e.preventDefault();
      togglePause();
    }
  });

  // Gerçek zamanlı oyunlar arka planda akıp kullanıcıyı cezalandırmasın.
  document.addEventListener("visibilitychange", () => {
    if (!GAME_IDS.has(pageId) || document.visibilityState !== "hidden") return;
    if (window.AcelyaPause?.isPaused()) return;
    window.AcelyaPause?.setPaused(true);
    updatePauseUI(true);
  });

  function activateAccessibleDialog(overlay, initialFocus, onDismiss) {
    const dialog = overlay.querySelector('[role="dialog"]');
    if (!dialog) return () => {};

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const changedSiblings = Array.from(document.body.children).filter(
      (element) => element !== overlay && !element.inert,
    );
    const previousOverflow = document.body.style.overflow;
    let closed = false;

    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("tabindex", "-1");
    changedSiblings.forEach((element) => {
      element.inert = true;
    });
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      Array.from(
        dialog.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element instanceof HTMLElement);

    const dismiss = (reason = "action") => {
      if (closed) return;
      closed = true;
      overlay.removeEventListener("keydown", handleKeydown);
      changedSiblings.forEach((element) => {
        element.inert = false;
      });
      document.body.style.overflow = previousOverflow;
      onDismiss(reason);
      if (previousFocus?.isConnected) previousFocus.focus();
    };

    function handleKeydown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss("escape");
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first || !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    overlay.addEventListener("keydown", handleKeydown);
    queueMicrotask(() => {
      const target = initialFocus || getFocusable()[0] || dialog;
      target.focus();
    });
    return dismiss;
  }

  /* ── Temel Bilgi overlay ── */
  function showInfoOverlay() {
    if (window.AcelyaEncyclopedia?.open) {
      window.AcelyaEncyclopedia.open();
      return;
    }

    const info = typeof PAGE_INFO !== "undefined" ? PAGE_INFO[pageId] : null;
    if (!info) {
      // Oyunlarda ansiklopedi betiği henüz yüklenmediyse rehber güvenli geri dönüştür.
      showIntro(true);
      return;
    }

    let overlay = document.getElementById("appInfoOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "appInfoOverlay";
      overlay.className = "app-intro-overlay";
      document.body.appendChild(overlay);
    }
    overlay.classList.remove("is-hidden");
    window.AcelyaPause?.setPaused(true);

    overlay.innerHTML = `
      <div class="app-intro-card" role="dialog" aria-labelledby="appInfoTitle">
        <span class="badge">📚 Temel Bilgi</span>
        <h2 id="appInfoTitle">${info.title}</h2>
        ${info.text}
        <div class="app-intro-actions">
          <button type="button" class="app-btn-primary" id="appInfoCloseBtn">Anladım</button>
        </div>
      </div>`;

    const closeButton = document.getElementById("appInfoCloseBtn");
    const dismiss = activateAccessibleDialog(overlay, closeButton, () => {
      overlay.classList.add("is-hidden");
      window.AcelyaPause?.setPaused(false);
    });
    closeButton.onclick = () => dismiss();
  }

  /* —— Giriş paneli —— */
  function showIntro(force) {
    const key = `acelya-guide-${pageId}`;
    const sessionKey = `${key}-session`;
    let guideAlreadySeen = false;
    try {
      guideAlreadySeen =
        localStorage.getItem(key) === "1" ||
        sessionStorage.getItem(sessionKey) === "1";
    } catch (_) {
      // Depolama kapalıysa rehber yine çalışır; yalnızca tercih saklanmaz.
    }
    if (!force && guideAlreadySeen) return;

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

    const guideTitle = document.title.split("|")[0].trim() || slugToTitle(pageId);
    overlay.innerHTML = `
      <div class="app-intro-card" role="dialog" aria-labelledby="appIntroTitle">
        <span class="badge">${badge} ${g.type}</span>
        <h2 id="appIntroTitle">${guideTitle}</h2>
        <p><strong>Ne yapıyorsun?</strong> ${g.intro}</p>
        <p><strong>Kontroller</strong></p>
        <ul>${g.controls.map((c) => `<li>${c}</li>`).join("")}</ul>
        <p><strong>Öğrenme notu:</strong> ${g.learn}</p>
        ${g.strategy || g.deeper ? `<div class="app-game-briefing">
          ${g.strategy ? `<p><strong>🎯 Ustalık deneyi</strong>${g.strategy}</p>` : ""}
          ${g.deeper ? `<p><strong>🔬 Derin bağlantı</strong>${g.deeper}</p>` : ""}
        </div>` : ""}
        <div class="app-intro-actions">
          <button type="button" class="app-btn-primary" id="appIntroStart">Başla</button>
          <button type="button" class="app-btn-ghost" id="appIntroAgain">Bir daha gösterme</button>
        </div>
      </div>`;

    const rememberSession = () => {
      try {
        sessionStorage.setItem(sessionKey, "1");
      } catch (_) {
        // Tercihin saklanamaması rehberi kapatmayı engellememeli.
      }
    };
    const rememberPermanently = () => {
      try {
        localStorage.setItem(key, "1");
        sessionStorage.setItem(sessionKey, "1");
      } catch (_) {
        // Tercihin saklanamaması rehberi kapatmayı engellememeli.
      }
    };
    const startButton = document.getElementById("appIntroStart");
    const dismiss = activateAccessibleDialog(overlay, startButton, (reason) => {
      if (reason === "escape") rememberSession();
      overlay.classList.add("is-hidden");
      window.AcelyaPause?.setPaused(false);
    });
    startButton.onclick = () => {
      rememberSession();
      dismiss();
    };
    document.getElementById("appIntroAgain").onclick = () => {
      rememberPermanently();
      dismiss();
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
      if (h1 && h1.parentNode) {
        h1.parentNode.insertBefore(hint, h1.nextSibling);
      } else {
        hud.appendChild(hint);
      }
    }
    if (hint && !hint.dataset.enhanced) {
      hint.dataset.enhanced = "1";
      const short = g.controls.slice(0, 3).join(" · ");
      hint.innerHTML = `<strong>${g.type === "Oyun" ? "Nasıl oynanır" : "Nasıl kullanılır"}:</strong> ${short}`;
    }
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

  function loadStylesheetOnce(href) {
    if (document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function ensureNotebookButton() {
    if (pageId === "bilgi" || document.body.classList.contains("atlas-experience")) return null;
    let button = document.getElementById("appInfoBtn");
    if (button) return button;
    const actions = document.querySelector(".app-topbar-actions");
    if (!actions) return null;
    button = document.createElement("button");
    button.type = "button";
    button.className = "app-btn-icon";
    button.id = "appInfoBtn";
    button.title = "Araştırma defterini aç";
    button.setAttribute("aria-label", "Araştırma defterini aç");
    button.textContent = "📓";
    button.addEventListener("click", showInfoOverlay);
    actions.insertBefore(button, actions.firstChild);
    return button;
  }

  function initEncyclopediaLayer() {
    const body = document.body;
    if (
      !body ||
      pageId === "bilgi" ||
      body.classList.contains("atlas-experience") ||
      body.dataset.encyclopedia === "ready"
    ) {
      return;
    }

    const allInfo = typeof PAGE_INFO !== "undefined" ? PAGE_INFO : {};
    const guide = getGuide(pageId);
    const info =
      allInfo[pageId] ||
      (GAME_IDS.has(pageId)
        ? {
            title: document.title.split("|")[0].trim() || slugToTitle(pageId),
            text: `<p>${guide.intro}</p><p>${guide.learn}</p>`,
          }
        : null);
    if (!info) return;

    const trigger = ensureNotebookButton();
    if (!trigger) return;
    loadStylesheetOnce("shared/encyclopedia-layer.css");
    loadScriptOnce("shared/encyclopedia-topic-guides.js", () => {
      loadScriptOnce("shared/encyclopedia-data.js", () => {
        loadScriptOnce("shared/encyclopedia-layer.js", () => {
          const mounted = window.AcelyaEncyclopedia?.mount({
            pageId,
            info,
            allInfo,
            trigger,
          });
          if (mounted) body.dataset.encyclopedia = "ready";
        });
      });
    });
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
    // page-info.js'i yükle (topbar'daki bilgi butonu için gerekli)
    if (
      !document.querySelector("script[src='shared/page-info.js']") &&
      typeof PAGE_INFO === "undefined"
    ) {
      const s = document.createElement("script");
      s.src = "shared/page-info.js";
      s.onload = function () {
        s.dataset.loaded = "true";
        ensureNotebookButton();
        initEncyclopediaLayer();
      };
      document.head.appendChild(s);
    }
    initStars();
    initTopbar();
    if (typeof PAGE_INFO !== "undefined") {
      ensureNotebookButton();
      initEncyclopediaLayer();
    }
    enhanceHints();
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
