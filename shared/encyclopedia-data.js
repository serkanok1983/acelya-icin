/**
 * Açelya'nın Yeri — merkezî ansiklopedi zenginleştirme verisi
 *
 * PAGE_INFO içindeki 142 konu metnini kopyalamaz. Konu aileleri, güvenilir
 * başvuru kaynakları ve sorgulama kalıplarını tek yerde tutar; sayfaya özgü
 * kavramları mevcut PAGE_INFO metnindeki vurgulardan çıkarır.
 */
(function exposeEncyclopediaData(root) {
  "use strict";

  const GROUPS = {
    mathematics: new Set([
      "altin-oran",
      "asal-rsa",
      "barnsley-egreltiotu",
      "bayes-olasilik",
      "birim-cember",
      "cizge-teorisi",
      "collatz",
      "fibo",
      "fibo+pascal",
      "fonksiyon-grafigi",
      "grup-teorisi",
      "hilbert-egrisi",
      "integral",
      "julia-fraktali",
      "karmasik-sayilar",
      "koch-kar-tanesi",
      "konik-kesitler",
      "lissajous",
      "lorenz-cekici",
      "lorenz-cekici2",
      "mandelbrot+lorenz",
      "mandelbrot-fraktali",
      "matris-donusumleri",
      "normal-dagilim",
      "pascal-ucgeni",
      "penrose-dosemesi",
      "pi-yaklasimi",
      "pisagor",
      "rastgele-yuruyus",
      "riemann-toplamlari",
      "sierpinski-fraktali-peano-egrisi-altin-oran",
      "taylor-serisi",
      "tek-sayi-toplam",
      "tek-sayi-toplam3",
      "tek-sayi-toplam4",
      "tek-sayi-toplam5",
      "turev",
      "vektorler",
      "yoneylem-arastirmasi",
    ]),
    mechanics: new Set([
      "akiskanlar-mekanigi",
      "atislar",
      "basinc",
      "cift-sarkac",
      "dairesel-hareket",
      "is-enerji",
      "kaldirma-kuvveti",
      "kepler-yasalari",
      "newton-hareket-yasalari",
      "sarkac",
      "serbest-dusme",
      "tork-denge",
      "yay-kutle",
    ]),
    waves: new Set([
      "dalga-superpozisyonu",
      "doppler-etkisi",
      "duran-dalgalar",
      "fourier-ses",
      "kirinim-izgarasi",
      "klasik-girisim",
      "mercek-isinlari",
      "optik-yansima-kirilma",
      "renk-teorisi",
      "ses-sentezleyici",
    ]),
    electricity: new Set([
      "alternatif-akim",
      "elektrik-devresi-simulasyonu",
      "elektronik-devre",
      "lorentz-kuvveti",
      "mantik-kapilari",
      "manyetik-alan",
    ]),
    modernSpace: new Set([
      "ay-evreleri",
      "fotoelektrik",
      "gorelilik-uzayzaman",
      "gunes-sistemi",
      "kara-cisim-isimasi",
      "kuantum-dalga",
      "kuantum-mekanigi",
      "nukleer-fizik",
      "radyoaktif-bozunma",
      "sicim-teorisi",
      "takimyildiz-haritasi",
      "termodinamik",
      "yildiz-yasam-dongusu",
    ]),
    chemistry: new Set([
      "asit-baz-titrasyonu",
      "atom-orbitalleri",
      "denklem-denklestirme",
      "elektrokimya",
      "ideal-gaz",
      "kimyasal-kinetik",
      "kristal-yapilar",
      "molekul",
      "molekul-sekli",
      "periyodik-tablo",
      "ph-indikator",
    ]),
    biology: new Set([
      "av-avci-lotka-volterra",
      "besin-agi",
      "dna-replikasyon",
      "dogal-secilim",
      "enzim-kinetigi",
      "fotosentez-solunum",
      "genetik-caprazlama",
      "kalp-dolasim",
      "mitoz-mayoz",
    ]),
    computing: new Set([
      "algoritmalar",
      "bicimsel-diller-ve-otomata-teorisi",
      "bilgisayar-sistemleri-ve-mimarisi",
      "derleyici-ve-yorumlayicilar",
      "enigma-makinesi",
      "hesaplama-teorisi",
      "internet-ve-ag-teknolojileri",
      "isaretciler-ve-bellek-yonetimi",
      "isletim-sistemleri-ve-linux",
      "makine-dili-assembly-c",
      "makine-ogrenmesi-derin-ogrenme-llm",
      "mantik-devresi",
      "programlama-paradigmalari",
      "sezar-sifre",
      "siber-guvenlik",
      "siralama-algoritmalari",
      "siralama-yarisi",
      "tasarim-desenleri",
      "veri-yapilari",
      "veritabanlari",
      "yazilim-muhendisligi",
      "yol-bulma-algoritmalari",
    ]),
    engineering: new Set([
      "elektrik-muhendisligi",
      "elektrikli-araclar",
      "elektronik-muhendisligi",
      "gemi-makineleri-isletme-muhendisligi",
      "kimya-muhendisligi",
      "maden-muhendisligi",
      "makine-muhendisligi",
      "mekatronik-muhendisligi",
      "metalurji-ve-malzeme-muhendisligi",
      "otomotiv-muhendisligi",
      "otonom-araclar-ve-iha",
      "plc-hidrolik-pnomatik-cnc-cadcam",
      "ucak-muhendisligi-ve-aerodinamik",
      "uretim-planlama-ve-endustri-muhendisligi",
    ]),
    society: new Set([
      "isletme-bilimi-ve-yonetim",
      "makro-ekonomi-ve-para-politikalari",
      "mikro-ekonomi-ve-uretim-faktorleri",
      "roma-hukuku",
      "uluslararasi-iliskiler",
    ]),
    games: new Set([
      "asteroids",
      "breakout",
      "formul-hafiza",
      "gezegen-savunmasi",
      "hanoi-kuleleri",
      "isik-sondurme",
      "mayin-tarlasi",
      "oyun-2048",
      "pong",
      "snake",
      "tetris",
      "uzay-kosucusu",
      "yasam-oyunu",
    ]),
  };

  const SOURCES = {
    physics1: {
      label: "OpenStax — University Physics, Cilt 1",
      url: "https://openstax.org/details/books/university-physics-volume-1",
    },
    physics2: {
      label: "OpenStax — University Physics, Cilt 2",
      url: "https://openstax.org/details/books/university-physics-volume-2",
    },
    physics3: {
      label: "OpenStax — University Physics, Cilt 3",
      url: "https://openstax.org/details/books/university-physics-volume-3",
    },
    phet: {
      label: "PhET — Etkileşimli bilim simülasyonları",
      url: "https://phet.colorado.edu/tr/",
    },
    calculus: {
      label: "OpenStax — Calculus, Cilt 1",
      url: "https://openstax.org/details/books/calculus-volume-1",
    },
    algebra: {
      label: "OpenStax — Algebra and Trigonometry 2e",
      url: "https://openstax.org/details/books/algebra-and-trigonometry-2e",
    },
    mathworld: {
      label: "Wolfram MathWorld — Matematik ansiklopedisi",
      url: "https://mathworld.wolfram.com/",
    },
    chemistry: {
      label: "OpenStax — Chemistry 2e",
      url: "https://openstax.org/details/books/chemistry-2e",
    },
    iupac: {
      label: "IUPAC Gold Book — Kimya terimleri",
      url: "https://goldbook.iupac.org/",
    },
    nistChem: {
      label: "NIST Chemistry WebBook",
      url: "https://webbook.nist.gov/chemistry/",
    },
    biology: {
      label: "OpenStax — Biology 2e",
      url: "https://openstax.org/details/books/biology-2e",
    },
    ncbi: {
      label: "NIH / NCBI Bookshelf — Yaşam bilimleri",
      url: "https://www.ncbi.nlm.nih.gov/books/",
    },
    hhmi: {
      label: "HHMI BioInteractive",
      url: "https://www.biointeractive.org/",
    },
    nasa: {
      label: "NASA Science",
      url: "https://science.nasa.gov/",
    },
    nist: {
      label: "NIST CSRC — Bilgisayar güvenliği terimleri",
      url: "https://csrc.nist.gov/glossary",
    },
    mdn: {
      label: "MDN — Web ve bilgisayar bilimi öğrenme yolu",
      url: "https://developer.mozilla.org/en-US/curriculum/",
    },
    mit: {
      label: "MIT OpenCourseWare",
      url: "https://ocw.mit.edu/",
    },
    nasaAero: {
      label: "NASA Glenn — Beginner's Guide to Aeronautics",
      url: "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/",
    },
    un: {
      label: "Birleşmiş Milletler — Konular ve belgeler",
      url: "https://www.un.org/en/",
    },
    worldBank: {
      label: "Dünya Bankası Açık Verileri",
      url: "https://data.worldbank.org/",
    },
    oecd: {
      label: "OECD Data Explorer",
      url: "https://data-explorer.oecd.org/",
    },
  };

  const PROFILES = {
    mathematics: {
      code: "MAT",
      label: "Matematiksel düşünme",
      icon: "∴",
      accent: "#5eead4",
      why:
        "{title}, bir sonucu ezberlemekten çok örüntünün neden çalıştığını görmeyi sağlar. Cebirsel, geometrik ve sayısal temsiller arasında geçiş yapmak; ispat, modelleme ve problem çözme becerisini güçlendirir.",
      realWorld:
        "Grafik yorumlama, veri analizi, optimizasyon, bilgisayar grafikleri ve mühendislik hesapları aynı matematiksel düşünme alışkanlığına dayanır: nicelikleri tanımla, ilişkiyi kur, sonucu sına.",
      inquiry: [
        "Gördüğün örüntü her zaman geçerli mi? Onu bozabilecek bir karşı örnek arayabilir misin?",
        "Aynı fikri tablo, grafik ve denklemle gösterdiğinde hangi temsil sana daha fazla bilgi veriyor?",
        "{concept} değiştiğinde sonucun nasıl değişeceğini hesaplamadan önce tahmin et.",
      ],
      vocabulary: [
        ["Model", "Bir durumu incelemek için seçilen varsayım ve ilişkilerin matematiksel temsili."],
        ["Değişken", "Farklı değerler alabilen ve bir ilişki içinde izlenen nicelik."],
        ["İspat", "Bir önermenin tanım ve kabul edilmiş sonuçlardan zorunlu olarak çıktığını gösteren akıl yürütme."],
        ["Karşı örnek", "Genel bir iddianın yanlış olduğunu gösteren tek bir geçerli örnek."],
      ],
      misconception: [
        "Birkaç örnekte doğru çıkması, bir iddiayı bütün durumlar için kanıtlar.",
        "Grafiğin görünümü eksen ölçeğinden ve seçilen aralıktan etkilenmez.",
      ],
      check: {
        question: "Bir matematiksel iddianın her durumda doğru olduğunu göstermek için en güçlü yol hangisidir?",
        options: [
          "Tanımlara ve mantıksal adımlara dayanan genel bir ispat kurmak",
          "Yalnızca ilk üç sayısal örneği denemek",
          "Grafiğin göze düzgün görünmesine bakmak",
        ],
        answer: 0,
        explanation:
          "Örnekler güçlü sezgi verir; genel iddia ise ispat ya da eksiksiz bir mantıksal gerekçe ister.",
      },
      sources: [SOURCES.algebra, SOURCES.calculus, SOURCES.mathworld],
    },
    mechanics: {
      code: "FİZ",
      label: "Hareket ve kuvvetler",
      icon: "↗",
      accent: "#60a5fa",
      why:
        "{title}, hareketi yalnızca izlemek yerine hangi etkileşimlerin onu değiştirdiğini açıklamamıza yardım eder. Kuvvet, enerji ve momentum bakışları aynı olayı farklı ama birbirini tamamlayan yollarla okur.",
      realWorld:
        "Araç güvenliği, spor hareketleri, yapı tasarımı, akışkan sistemleri ve uzay uçuşları; hareketin nicel olarak tahmin edilmesine dayanır.",
      inquiry: [
        "Sistemin sınırını nerede çizersen hangi kuvvetler iç, hangileri dış etki olur?",
        "Bir parametreyi iki katına çıkarmadan önce hareketin nasıl değişeceğini tahmin et; sonra simülasyonla sına.",
        "Modelin ihmal ettiği sürtünme, hava direnci ya da esneklik sonucu hangi yönde değiştirir?",
      ],
      vocabulary: [
        ["Sistem", "İncelemek için çevresinden zihinsel olarak ayırdığımız cisim veya cisimler topluluğu."],
        ["Net kuvvet", "Bir cisme etki eden tüm kuvvetlerin vektörel toplamı."],
        ["Korunum", "Belirli koşullarda toplam değeri zamanla değişmeyen fiziksel nicelik ilkesi."],
        ["İdeal model", "Gerçek olayın bazı etkilerini bilinçli olarak ihmal ederek ana ilişkiyi gösteren model."],
      ],
      misconception: [
        "Bir cisim hareket ediyorsa hareket yönünde mutlaka net kuvvet vardır.",
        "Bir simülasyonda görülen sonuç, modelin ihmal ettiği etkilerden bağımsızdır.",
      ],
      check: {
        question: "Bir hareket simülasyonunda tek bir değişkenin etkisini anlamanın en iyi yolu hangisidir?",
        options: [
          "Diğer koşulları sabit tutup o değişkeni kontrollü biçimde değiştirmek",
          "Bütün ayarları aynı anda rastgele değiştirmek",
          "Yalnızca animasyonun en hızlı anına bakmak",
        ],
        answer: 0,
        explanation:
          "Kontrollü karşılaştırma, gözlenen farkı hangi değişkenin oluşturduğunu ayırt etmeyi sağlar.",
      },
      sources: [SOURCES.physics1, SOURCES.phet],
    },
    waves: {
      code: "DAL",
      label: "Dalgalar, ses ve optik",
      icon: "≋",
      accent: "#38bdf8",
      why:
        "{title}, bir bozulmanın uzayda ve zamanda nasıl taşındığını; genlik, frekans, faz ve dalga boyunun gözlediğimiz deseni nasıl belirlediğini gösterir.",
      realWorld:
        "Müzik, görüntüleme, fiber optik iletişim, gürültü kontrolü, radar ve tıbbi ultrason aynı dalga ilkelerinden yararlanır.",
      inquiry: [
        "Kaynağın frekansını değiştirirsen dalga boyu ve algılanan desen nasıl etkilenir?",
        "Aynı olayı zaman grafiği ile uzaydaki dalga resmi farklı olarak nasıl anlatıyor?",
        "{concept} için ölçebileceğin bir nicelik ve sabit tutman gereken bir koşul belirle.",
      ],
      vocabulary: [
        ["Frekans", "Bir saniyedeki tam titreşim ya da döngü sayısı; birimi hertzdir."],
        ["Dalga boyu", "Aynı fazdaki ardışık iki nokta arasındaki uzaklık."],
        ["Genlik", "Denge değerinden en büyük sapma; çoğu dalgada taşınan enerjiyle ilişkilidir."],
        ["Faz", "Bir titreşimin döngü içindeki konumunu belirten büyüklük."],
      ],
      misconception: [
        "Dalga ilerlerken ortamı oluşturan tanecikler de dalgayla birlikte baştan sona gider.",
        "Frekans arttığında dalga hızı her ortamda zorunlu olarak aynı oranda artar.",
      ],
      check: {
        question: "Bir dalga bir ortamda ilerlerken genellikle taşınan nedir?",
        options: [
          "Enerji ve bilgi; ortam tanecikleri ise denge konumu çevresinde hareket eder",
          "Ortamın bütün tanecikleri kaynaktan hedefe kalıcı olarak gider",
          "Yalnızca dalganın rengi taşınır",
        ],
        answer: 0,
        explanation:
          "Mekanik dalgalarda tanecikler yerel olarak titreşir; desen ve enerji ortam boyunca ilerler.",
      },
      sources: [SOURCES.physics1, SOURCES.physics3, SOURCES.phet],
    },
    electricity: {
      code: "EM",
      label: "Elektrik ve manyetizma",
      icon: "ϟ",
      accent: "#a78bfa",
      why:
        "{title}, yüklerin, alanların ve devre elemanlarının birlikte nasıl davrandığını gösterir. Yerel bir devre kuralı ile sistemin enerji aktarımını birlikte okumak elektronik okuryazarlığın temelidir.",
      realWorld:
        "Elektrik şebekeleri, motorlar, sensörler, bilgisayarlar, tıbbi cihazlar ve haberleşme sistemleri elektrik ve manyetik alanların kontrollü kullanımıyla çalışır.",
      inquiry: [
        "Devrede bir bileşeni değiştirdiğinde akım, gerilim ve güçten hangileri doğrudan etkileniyor?",
        "Enerjinin kaynaktan alıcıya hangi yol ve dönüşümlerle ulaştığını izleyebilir misin?",
        "{concept} için yön bilgisinin neden önemli olduğunu bir ok veya devre şemasıyla göster.",
      ],
      vocabulary: [
        ["Elektrik alan", "Bir yükün çevresinde başka bir yüke birim yük başına etki edecek kuvveti tanımlayan alan."],
        ["Potansiyel fark", "Birim yükü iki nokta arasında taşımakla ilişkili enerji farkı."],
        ["Akım", "Bir kesitten birim zamanda geçen net elektrik yükü."],
        ["Güç", "Enerjinin aktarılma veya dönüştürülme hızı."],
      ],
      misconception: [
        "Akım devredeki elemanlar tarafından sırayla tüketilir.",
        "Gerilim ile akım aynı fiziksel niceliğin iki farklı adıdır.",
      ],
      check: {
        question: "Bir devrede enerji kaynağının temel rolü hangisidir?",
        options: [
          "Yüklere enerji aktarımını sağlayan potansiyel fark oluşturmak",
          "Devredeki elektronları her kullanımda tamamen yok etmek",
          "Dirençleri akıma dönüştürmek",
        ],
        answer: 0,
        explanation:
          "Kaynak yükleri yaratmaz; devredeki yüklere enerji kazandıran potansiyel farkı sürdürür.",
      },
      sources: [SOURCES.physics2, SOURCES.phet],
    },
    modernSpace: {
      code: "UZY",
      label: "Enerji, modern fizik ve uzay",
      icon: "⊙",
      accent: "#fbbf24",
      why:
        "{title}, gündelik sezginin ötesindeki ölçekleri kanıtlarla anlamayı sağlar. Işık, madde, enerji ve uzay-zaman hakkındaki modeller; gözlem ile matematiğin birlikte nasıl çalıştığını gösterir.",
      realWorld:
        "GPS zaman düzeltmeleri, görüntüleme sensörleri, nükleer tıp, enerji teknolojileri ve uzay görevleri modern fiziğin ölçülebilir sonuçlarına dayanır.",
      inquiry: [
        "Bu konuda doğrudan gözlenen nicelik hangisi, model yardımıyla çıkarılan sonuç hangisi?",
        "Ölçeği on kat değiştirirsen hangi yaklaşım ya da gündelik sezgi geçerliliğini yitirir?",
        "{concept} için bilim insanlarını ikna edecek nasıl bir gözlem tasarlardın?",
      ],
      vocabulary: [
        ["Model", "Doğrudan göremediğimiz bir sistemi ölçülebilir sonuçlarıyla temsil eden açıklama."],
        ["Spektrum", "Bir ışınımın dalga boyu, frekans ya da enerjiye göre dağılımı."],
        ["Enerji dönüşümü", "Enerjinin toplamı korunurken bir biçimden başka bir biçime geçmesi."],
        ["Kanıt", "Bir iddiayı desteklemek veya sınırlamak için sistematik biçimde elde edilen gözlem ve ölçüm."],
      ],
      misconception: [
        "Bir bilimsel model, gerçekliğin bütün ayrıntılarını eksiksiz kopyalamalıdır.",
        "Doğrudan göremediğimiz bir olgu hakkında ölçüme dayalı kanıt elde edilemez.",
      ],
      check: {
        question: "Doğrudan göremediğimiz bir fiziksel sistemi bilimsel olarak incelemek mümkün müdür?",
        options: [
          "Evet; modelin öngördüğü ölçülebilir etkiler gözlemlerle sınanabilir",
          "Hayır; yalnızca çıplak gözle görülen şeyler bilimin konusudur",
          "Evet; fakat ölçüm yapmadan yalnızca benzetme yeterlidir",
        ],
        answer: 0,
        explanation:
          "Atomlardan kara deliklere kadar pek çok sistem, modellerin öngördüğü dolaylı fakat ölçülebilir etkilerle incelenir.",
      },
      sources: [SOURCES.physics3, SOURCES.nasa, SOURCES.phet],
    },
    chemistry: {
      code: "KİM",
      label: "Kimya ve madde",
      icon: "⚗",
      accent: "#fb7185",
      why:
        "{title}, gözlediğimiz makroskobik değişimleri atom, iyon ve molekül düzeyindeki etkileşimlerle açıklamamıza yardım eder. Denklem, tanecik modeli ve laboratuvar gözlemi aynı olayın üç tamamlayıcı dilidir.",
      realWorld:
        "İlaçlar, bataryalar, gıda, temiz su, yeni malzemeler ve iklim teknolojileri; maddenin yapısı ile tepkime koşullarının kontrol edilmesine dayanır.",
      inquiry: [
        "Gözlediğin değişimi tanecik düzeyinde bir şema ile nasıl açıklarsın?",
        "Sıcaklık, derşim ya da yüzey alanından birini değiştirirken hangilerini sabit tutmalısın?",
        "{concept} ile ilgili modelin hangi koşullarda geçerli olmayabileceğini araştır.",
      ],
      vocabulary: [
        ["Tanecik modeli", "Maddenin atom, molekül veya iyonlardan oluştuğunu kullanarak makroskobik olayları açıklayan model."],
        ["Derişim", "Belirli bir hacim ya da miktardaki karışımda bulunan bileşen miktarı."],
        ["Tepkime", "Kimyasal türlerin atomları korunurken bağların yeniden düzenlendiği dönüşüm."],
        ["Denge", "İleri ve geri süreçlerin hızlarının eşit olduğu dinamik durum."],
      ],
      misconception: [
        "Kimyasal tepkimede atomlar yok olur ve yerlerine tamamen yeni atomlar oluşur.",
        "Bir formülün geçerli olduğu koşulları belirtmeye gerek yoktur.",
      ],
      check: {
        question: "Kimyasal bir olayı en eksiksiz açıklayan yaklaşım hangisidir?",
        options: [
          "Gözlemi, tanecik modelini ve sembolik denklemi birbiriyle ilişkilendirmek",
          "Yalnızca renk değişimine bakıp tanecikleri dikkate almamak",
          "Denklemdeki katsayıları atom alt indislerini değiştirerek ayarlamak",
        ],
        answer: 0,
        explanation:
          "Kimya; gözlenebilir olayı, tanecik düzeyindeki mekanizmayı ve sembolik dili birlikte kullanır.",
      },
      sources: [SOURCES.chemistry, SOURCES.iupac, SOURCES.nistChem],
    },
    biology: {
      code: "BİY",
      label: "Yaşam bilimleri",
      icon: "φ",
      accent: "#4ade80",
      why:
        "{title}, canlı sistemlerde yapı, işlev, bilgi ve enerji akışı arasındaki bağı gösterir. Molekülden hücreye, organizmadan ekosisteme geçerken açıklama düzeyi değişir.",
      realWorld:
        "Sağlık, tarım, biyoteknoloji, salgınların izlenmesi ve doğa koruma kararları; biyolojik sistemlerin değişken ve birbiriyle bağlantılı yapısını anlamayı gerektirir.",
      inquiry: [
        "Bu olayı molekül, hücre, organizma ve popülasyon düzeylerinden hangisinde açıklıyorsun?",
        "Sistemdeki çeşitlilik sonucu nasıl etkiler; tek bir bireyle popülasyon hakkında karar verilebilir mi?",
        "{concept} değiştiğinde kısa ve uzun vadede hangi iki farklı sonuç ortaya çıkabilir?",
      ],
      vocabulary: [
        ["Yapı–işlev ilişkisi", "Bir biyolojik yapının biçimi ve düzeninin yaptığı işle bağlantısı."],
        ["Homeostazi", "Canlı sistemin değişen koşullara karşı iç ortamını belirli sınırlarda tutması."],
        ["Popülasyon", "Aynı türe ait, aynı bölgede ve zamanda yaşayan bireyler topluluğu."],
        ["Geri bildirim", "Bir sürecin çıktısının o süreci azaltacak veya artıracak biçimde yeniden etkilemesi."],
      ],
      misconception: [
        "Bir bireyin yaşamı boyunca kazandığı her özellik kalıtsal olarak yavrularına geçer.",
        "Biyolojik sistemlerde tek bir neden her zaman tek ve değişmez bir sonuç üretir.",
      ],
      check: {
        question: "Karmaşık bir biyolojik sonucu yorumlarken en güvenilir yaklaşım hangisidir?",
        options: [
          "Örneklem, değişkenlik, kontrol grubu ve açıklama düzeyini birlikte değerlendirmek",
          "Tek bir bireydeki sonucu bütün türe genellemek",
          "Yalnızca son gözlemi seçip önceki verileri yok saymak",
        ],
        answer: 0,
        explanation:
          "Canlı sistemler değişkendir; sağlam sonuç için karşılaştırma, yeterli veri ve doğru ölçek gerekir.",
      },
      sources: [SOURCES.biology, SOURCES.ncbi, SOURCES.hhmi],
    },
    computing: {
      code: "BLG",
      label: "Bilgisayar bilimi",
      icon: "⌘",
      accent: "#c084fc",
      why:
        "{title}, bir problemi kesin adımlara, veri temsillerine ve denetlenebilir kurallara ayırmayı öğretir. Doğruluk kadar zaman, bellek, güvenlik ve ölçeklenebilirlik de çözümün parçasıdır.",
      realWorld:
        "Arama motorları, ağlar, yapay zekâ, veri tabanları, oyunlar ve güvenli iletişim; verinin nasıl temsil edildiği ve algoritmaların hangi maliyetle çalıştığıyla şekillenir.",
      inquiry: [
        "Aynı girdiye her zaman aynı çıktı mı geliyor; uç durumlarda algoritma ne yapıyor?",
        "Çözüm doğru olsa bile veri on kat büyüdüğünde zaman ve bellek maliyeti nasıl değişir?",
        "{concept} için bir hata durumu tasarla ve sistemin bunu nasıl ele alması gerektiğini açıkla.",
      ],
      vocabulary: [
        ["Algoritma", "Bir problemi sonlu ve açık adımlarla çözen yöntem."],
        ["Veri yapısı", "Veriyi belirli işlemleri verimli yapacak biçimde düzenleme yöntemi."],
        ["Karmaşıklık", "Girdi büyüdükçe bir algoritmanın zaman veya bellek gereksiniminin nasıl arttığı."],
        ["Soyutlama", "Gereksiz ayrıntıları saklayıp problem için önemli özellikleri öne çıkarma."],
      ],
      misconception: [
        "Bir program küçük bir örnekte çalışıyorsa her girdide doğru ve verimlidir.",
        "Daha fazla veri kullanan bir model, verinin niteliğinden bağımsız olarak her zaman daha güvenilirdir.",
      ],
      check: {
        question: "İki algoritma aynı doğru sonucu veriyorsa hangisini seçmeliyiz?",
        options: [
          "Girdi boyutu, zaman/bellek maliyeti, anlaşılabilirlik ve hata koşullarına göre karşılaştırmalıyız",
          "Adı daha teknik duyulanı seçmeliyiz",
          "Yalnızca en küçük örnekte ilk biteni seçmeliyiz",
        ],
        answer: 0,
        explanation:
          "Algoritma seçimi bağlama bağlıdır; doğruluk zorunlu, maliyet ve bakım özellikleri ise belirleyicidir.",
      },
      sources: [SOURCES.mdn, SOURCES.nist, SOURCES.mit],
    },
    engineering: {
      code: "MÜH",
      label: "Mühendislik laboratuvarı",
      icon: "⌑",
      accent: "#f97316",
      why:
        "{title}, bilimsel ilkeleri gerçek gereksinimlere dönüştürürken yapılan ödünleşimleri görünür kılar. Başarılı tasarım yalnızca çalışmaz; güvenli, ölçülebilir, üretilebilir ve sürdürülebilir olur.",
      realWorld:
        "Ulaşım, enerji, üretim, otomasyon ve altyapı sistemlerinde performans; maliyet, güvenlik, dayanıklılık ve çevresel etkiyle birlikte değerlendirilir.",
      inquiry: [
        "Bu tasarımın başarı ölçütleri neler; hangileri birbiriyle çatışıyor?",
        "Bir bileşen arızalanırsa sistem nasıl güvenli duruma geçebilir?",
        "{concept} için performansı artırırken maliyet veya riskte oluşacak ödünleşimi açıkla.",
      ],
      vocabulary: [
        ["Gereksinim", "Bir tasarımın karşılaması gereken ölçülebilir ihtiyaç veya kısıt."],
        ["Ödünleşim", "Bir özelliği iyileştirirken başka bir özellikte kabul edilen bedel."],
        ["Güvenlik katsayısı", "Belirsizlik ve beklenmeyen yüklere karşı tasarım kapasitesine eklenen pay."],
        ["Geri besleme", "Sistem çıktısını ölçüp davranışı buna göre düzelten kontrol döngüsü."],
      ],
      misconception: [
        "En yüksek performanslı parçaları birleştirmek her zaman en iyi sistemi verir.",
        "Bir prototip bir kez çalıştığında test ve güvenlik payına artık gerek kalmaz.",
      ],
      check: {
        question: "Bir mühendislik tasarımını değerlendirmenin en doğru yolu hangisidir?",
        options: [
          "Gereksinimleri ve kısıtları ölçülebilir testlerle, risk ve ödünleşimlerle birlikte incelemek",
          "Yalnızca en yüksek tepe performansına bakmak",
          "Tek bir başarılı denemeyi bütün koşullar için yeterli saymak",
        ],
        answer: 0,
        explanation:
          "Mühendislik; çalışmanın yanı sıra güvenlik, güvenilirlik, maliyet ve kullanım koşullarını birlikte optimize eder.",
      },
      sources: [SOURCES.mit, SOURCES.nasaAero, SOURCES.nist],
    },
    society: {
      code: "SOS",
      label: "Toplum ve karar sistemleri",
      icon: "§",
      accent: "#f59e0b",
      why:
        "{title}, bireylerin, kurumların ve sistemlerin kararlarını farklı analiz düzeylerinde incelemeyi sağlar. Kavramları tanımlamak kadar kanıtın kaynağını, ölçüm biçimini ve alternatif açıklamaları sorgulamak da önemlidir.",
      realWorld:
        "Ekonomik tercihler, hukuk kuralları, işletme kararları ve uluslararası politika; farklı aktörlerin teşvikleri ile toplumsal sonuçları birlikte değerlendirmeyi gerektirir.",
      inquiry: [
        "Aynı olayı birey, kurum ve sistem düzeylerinde açıkladığında sonuç nasıl değişiyor?",
        "Kullandığın göstergenin ölçemediği veya gizlediği ne olabilir?",
        "{concept} hakkındaki iddiayı desteklemek için hangi karşılaştırmalı veriye ihtiyaç var?",
      ],
      vocabulary: [
        ["Aktör", "Bir sistemde karar alan ve sonucu etkileyebilen birey, kurum veya devlet."],
        ["Teşvik", "Bir davranışı daha olası ya da daha az olası kılan ödül, maliyet veya kural."],
        ["Gösterge", "Karmaşık bir olgunun belirli bir yönünü izlemek için kullanılan ölçülebilir değişken."],
        ["Nedensellik", "Bir etkendeki değişimin, diğer koşullar dikkate alındığında sonuçta değişiklik oluşturması."],
      ],
      misconception: [
        "İki göstergenin birlikte değişmesi, birinin diğerine kesin olarak neden olduğunu kanıtlar.",
        "Tek bir örnek olay, bütün toplumlar ve dönemler için aynı sonucu verir.",
      ],
      check: {
        question: "İki toplumsal göstergenin birlikte değiştiğini görmek neyi tek başına kanıtlar?",
        options: [
          "Bir ilişki olduğunu; nedensellik için ek kanıt ve alternatif açıklamalar gerekir",
          "Birinci göstergenin ikinciye kesinlikle neden olduğunu",
          "Bütün ülkelerde aynı sonucun çıkacağını",
        ],
        answer: 0,
        explanation:
          "Korelasyon bir ipucudur; nedensellik için zaman sırası, mekanizma, karşılaştırma ve karıştırıcı etkenler incelenmelidir.",
      },
      sources: [SOURCES.un, SOURCES.worldBank, SOURCES.oecd],
    },
    games: {
      code: "OYU",
      label: "Oyun ve strateji laboratuvarı",
      icon: "◈",
      accent: "#f472b6",
      why:
        "{title}, kuralları deneyerek strateji geliştirme, geri bildirimi okuma ve bir sonraki hamleyi planlama becerilerini çalıştırır. Oyun, küçük bir karar sistemi laboratuvarı gibi ele alınabilir.",
      realWorld:
        "Planlama, hata sonrası strateji değiştirme, uzamsal akıl yürütme ve tepki zamanı; spordan robotik kontrolüne kadar pek çok alanda kullanılır.",
      inquiry: [
        "Kaybettiğin bir denemede hangi karar sonucu en fazla etkiledi; bunu tek bir değişiklikle sınayabilir misin?",
        "Kısa vadeli puan ile uzun vadeli konum arasında nasıl bir strateji farkı var?",
        "{concept} değiştirilse oyunun en iyi stratejisi nasıl değişirdi?",
      ],
      vocabulary: [
        ["Kural sistemi", "Oyunda hangi durum değişikliklerinin geçerli olduğunu belirleyen açık sınırlar."],
        ["Durum", "Oyunun belirli bir andaki tüm ilgili bilgilerinin birlikte görünümü."],
        ["Geri bildirim", "Bir hamlenin sonucu hakkında oyuncuya verilen görsel, işitsel veya sayısal bilgi."],
        ["Strateji", "Tek bir hamle yerine bir hedefe ulaşmak için izlenen karar ilkeleri."],
      ],
      misconception: [
        "Tek bir başarılı hamle, her oyun durumunda aynı stratejinin en iyi olduğunu gösterir.",
        "Hızlı karar vermek, oyun durumunu okumaktan her zaman daha önemlidir.",
      ],
      check: {
        question: "Bir oyun stratejisini gerçekten karşılaştırmak için ne yapmalısın?",
        options: [
          "Benzer başlangıç koşullarında birden çok deneme yapıp sonuçları kaydetmek",
          "Yalnızca en yüksek tek puanı hatırlamak",
          "Her denemede kuralları ve hızı birlikte değiştirmek",
        ],
        answer: 0,
        explanation:
          "Tekrarlanan ve karşılaştırılabilir denemeler, sonucun şanstan mı stratejiden mi geldiğini ayırt etmeye yardım eder.",
      },
      sources: [],
    },
  };

  const STUDY_PATHS = {
    mathematics: {
      goal:
        "{title} bağlamında {concept} kavramını bir örüntü, temsil ve gerekçeyle açıklayabilmek; ulaşılan sonucu sınayabilmek.",
      prerequisite:
        "Temel işlem önceliği, değişken fikri, koordinat düzlemi ve bir örneğin tek başına genel kanıt olmadığını bilmek.",
      layers: [
        ["SEZGİ", "Örüntüyü yakala", "Önce {concept} değiştiğinde ekrandaki şekil, sayı ya da grafikte neyin birlikte değiştiğine bak. Hesap yapmadan önce yönü tahmin et."],
        ["MODEL", "Temsilleri bağla", "Aynı ilişkiyi sözcük, tablo, grafik ve denklemle anlat. {secondConcept}, bu temsiller arasında hangi bilginin korunduğunu görmene yardım eder."],
        ["SINIR", "İddiayı sına", "Birkaç başarılı örnek güçlü bir sezgi verir; genel sonuç için ispat gerekir. Uç değer, karşı örnek ve eksen ölçeğiyle modelin sınırlarını ara."],
      ],
      example: {
        title: "Tahmin → temsil → gerekçe",
        prompt: "Sayfadaki başlangıç durumunu referans al ve {concept} ile ilişkili tek bir değeri değiştir.",
        steps: [
          "Sonucun artacağını, azalacağını ya da değişmeyeceğini önce gerekçeli biçimde tahmin et.",
          "Aynı değişimi en az iki temsilde —örneğin grafik ve denklemde— izle.",
          "Gözlemini bir kural cümlesine dönüştür; sonra bu kuralı zorlayacak bir uç değer dene.",
        ],
        takeaway: "Bir sonuç, farklı temsiller aynı ilişkiyi gösterdiğinde ve karşı örnek arayışına dayandığında güçlenir.",
      },
      experiment: {
        title: "Tek değişkenli örüntü avı",
        setup: "Sayfadaki etkileşimli modeli ve küçük bir tahmin tablosunu kullan.",
        steps: [
          "Bir giriş değişkeni seç; diğer ayarları sabit tut.",
          "Üç farklı değer için önce tahminini, sonra gözlediğin sonucu kaydet.",
          "Değişim doğrusal mı, orantılı mı, yoksa eşik ya da kıvrım mı gösteriyor diye karşılaştır.",
        ],
        observe: "Tahmininle sonuç arasındaki farkı ve bu farkın hangi varsayımdan doğmuş olabileceğini not et.",
      },
      correction:
        "Örnekler bir iddiayı keşfetmeye yardım eder; bütün durumlar için doğruluk, tanımlara dayanan bir ispat ya da eksiksiz gerekçe ister.",
    },
    mechanics: {
      goal:
        "{title} sisteminde {concept} ile hareket arasındaki ilişkiyi kuvvet, enerji veya momentum modeliyle açıklayıp bir değişimin sonucunu öngörebilmek.",
      prerequisite:
        "Konum–zaman ayrımı, hızın yönlü bir nicelik olduğu, temel vektör toplama ve birim kullanımı.",
      layers: [
        ["SEZGİ", "Hareketi betimle", "Önce cismin nerede olduğunu, hangi yönde hareket ettiğini ve hareketinin nasıl değiştiğini ayır. {concept}, bu betimlemenin hangi parçasını açıklıyor?"],
        ["MODEL", "Etkileşimleri seç", "Sistemin sınırını çiz, dış etkileri belirle ve {secondConcept} ile ölçülebilir büyüklükler arasında ilişki kur. Yönleri oklarla göstermeyi unutma."],
        ["SINIR", "İdealleştirmeyi gör", "Sürtünme, hava direnci, esneklik ve ölçüm belirsizliği modelde yoksa sonuç gerçeğin yaklaşık bir temsilidir; geçerli koşulları açıkça belirt."],
      ],
      example: {
        title: "Serbest cisimden tahmine",
        prompt: "Modeldeki cismi sistem olarak seç ve {concept} ile ilişkili bir ayarı değiştir.",
        steps: [
          "Cisme etki eden dış kuvvetleri ve yönlerini basit bir şemayla göster.",
          "Net etkinin hareketin hangi özelliğini değiştireceğini tahmin et.",
          "Simülasyonu çalıştır; sonuç farklıysa ihmal edilen etkiyi veya başlangıç koşulunu belirle.",
        ],
        takeaway: "Hareket yönü ile net kuvvet yönü aynı olmak zorunda değildir; net kuvvet hızın değişimini belirler.",
      },
      experiment: {
        title: "Kontrollü hareket karşılaştırması",
        setup: "Yalnızca sayfadaki simülasyonu kullan; bir kontrol denemesi belirle.",
        steps: [
          "Kütle, başlangıç hızı ya da kuvvetten yalnızca birini değişken seç.",
          "Kontrol ve deney koşullarında aynı süre sonundaki konum, hız ya da enerjiyi karşılaştır.",
          "Değişkeni iki katına çıkardığında sonucun da iki kat olup olmadığını sınayarak orantıyı yorumla.",
        ],
        observe: "Modelin sabit tuttuğu koşulları ve gerçek bir deneyde belirsizlik yaratacak etkenleri listele.",
      },
      correction:
        "Bir cismin hareket etmesi net kuvvet gerektirmez; net kuvvet sıfırsa hız sabit kalabilir. Kuvvet, hareketin kendisini değil hızın değişimini belirler.",
    },
    waves: {
      goal:
        "{title} içinde {concept} kavramını genlik, frekans, faz ve dalga boyu ilişkileriyle açıklayıp gözlenen deseni yorumlayabilmek.",
      prerequisite:
        "Periyodik hareket, oran–orantı, temel grafik okuma ve hız = yol/zaman ilişkisi.",
      layers: [
        ["SEZGİ", "Tekrarlanan deseni izle", "Bir tepeyi ya da belirgin noktayı takip et: desen ilerlerken ortamın bir noktası nasıl hareket ediyor? {concept}, gördüğün tekrarın hangi özelliğini adlandırıyor?"],
        ["MODEL", "Uzay ile zamanı ayır", "Zaman grafiği tek bir konumun değişimini, anlık dalga resmi ise farklı konumları gösterir. {secondConcept} iki gösterimi birbirine bağlayan ipucudur."],
        ["SINIR", "Ortamı ve doğrusal davranışı belirt", "Dalga hızı ortama bağlıdır; süperpozisyon gibi kurallar doğrusal yaklaşımın geçerli olduğu koşullarda kullanılır. Büyük genlik veya karmaşık ortam sonucu değiştirebilir."],
      ],
      example: {
        title: "Bir dalgayı dört nicelikle oku",
        prompt: "Sayfadaki dalga ya da ışın deseninde {concept} ile ilişkili bir kontrolü değiştir.",
        steps: [
          "Genlik, frekans, dalga boyu ve yayılma hızından hangisinin doğrudan değiştiğini belirle.",
          "Ortam aynıysa v = fλ ilişkisini kullanarak diğer niceliğin yönünü tahmin et.",
          "Desendeki iki eş fazlı nokta veya iki ardışık tepe üzerinden tahminini kontrol et.",
        ],
        takeaway: "Frekans kaynağın salınımını, dalga boyu uzaydaki tekrarı anlatır; hız ve ortam bu ikisini birbirine bağlar.",
      },
      experiment: {
        title: "Frekans–dalga boyu laboratuvarı",
        setup: "Simülasyonda ortamı sabit tut ve gözlenebilir bir referans noktası seç.",
        steps: [
          "Düşük, orta ve yüksek üç frekans için dalga boyunu karşılaştır.",
          "Her koşulda belirli bir sürede geçen tepe sayısını kaydet.",
          "Ortamı değiştirebiliyorsan ikinci turda yalnızca ortamı değiştir ve farkı açıkla.",
        ],
        observe: "Frekans artarken dalga boyunun hangi koşulda azaldığını ve yayılma hızının neye bağlı olduğunu not et.",
      },
      correction:
        "Dalga ilerlerken ortam tanecikleri genellikle kaynakla hedef arasında taşınmaz; denge çevresinde titreşirken enerji ve desen ilerler.",
    },
    electricity: {
      goal:
        "{title} bağlamında {concept} kavramını yük, alan, akım, gerilim ve enerji aktarımı arasında doğru ilişki kurarak açıklayabilmek.",
      prerequisite:
        "Pozitif–negatif yük fikri, kapalı devre, oran–orantı, enerji ve güç arasındaki temel ayrım.",
      layers: [
        ["SEZGİ", "Enerji yolunu izle", "Kaynağın devreye ya da alana ne sağladığını ve enerjinin nerede dönüştüğünü izle. {concept}, bu yolun hangi bölümünü ölçüyor?"],
        ["MODEL", "Yerel kuralı sisteme bağla", "Akım, potansiyel fark ve direnç gibi nicelikleri aynı şeymiş gibi değil, ilişkili ölçümler olarak ele al. {secondConcept} için yön ve referans noktası belirt."],
        ["SINIR", "İdeal elemanı sorgula", "Gerçek kaynakların iç direnci, bileşenlerin ısınması ve ölçüm cihazlarının devreye etkisi vardır; ideal devre modeli bu etkileri yaklaşıklaştırır."],
      ],
      example: {
        title: "Enerji hesabı olan devre okuması",
        prompt: "{concept} ile ilişkili bir bileşeni seç ve devrenin kapalı yolunu baştan sona izle.",
        steps: [
          "Kaynak, iletken ve alıcıyı belirle; akım yönünü ve gerilim ölçülecek iki noktayı işaretle.",
          "Bir bileşen değerini değiştirince akım, gerilim ve güçten hangilerinin değişeceğini tahmin et.",
          "Model sonucunu P = VI enerji aktarım hızıyla tutarlılık açısından kontrol et.",
        ],
        takeaway: "Akım yük akış hızını, gerilim yük başına enerji farkını, güç ise enerji aktarım hızını anlatır.",
      },
      experiment: {
        title: "Güvenli sanal devre deneyi",
        setup: "Yalnızca sayfadaki düşük gerilimli sanal devreyi kullan; gerçek priz veya şebeke elektriğine müdahale etme.",
        steps: [
          "Bir kontrol devresi kurup akım ve gerilim değerlerini kaydet.",
          "Yalnızca bir direnç ya da kaynak değerini değiştir ve yeni değerleri karşılaştır.",
          "Değişimin Ohm yasası ve enerji korunumu ile tutarlı olup olmadığını açıkla.",
        ],
        observe: "Ölçüm noktalarının ve bağlantı biçiminin sonucu neden etkilediğini not et.",
      },
      correction:
        "Akım devre elemanlarında sırayla tüketilmez; yük kapalı yol boyunca hareket ederken enerjisini devre elemanlarına aktarabilir.",
    },
    modernSpace: {
      goal:
        "{title} konusunda {concept} kavramını gözlem, model ve ölçülebilir öngörü ayrımını koruyarak açıklayabilmek.",
      prerequisite:
        "Bilimsel model ile gerçek sistem ayrımı, enerji ve dalga kavramları, bilimsel gösterim ve grafik okuma.",
      layers: [
        ["SEZGİ", "Ölçeği fark et", "{concept}, gündelik deneyimimizin çok altında, çok üstünde ya da çok uzak bir ölçekte olabilir. Önce hangi ölçeğin ve hangi gözlemin söz konusu olduğunu belirle."],
        ["MODEL", "Gözlemden çıkarıma geç", "Doğrudan ölçülen nicelik ile model kullanılarak çıkarılan sonucu ayır. {secondConcept}, bu çıkarımı hangi ölçülebilir belirtiyle destekliyor?"],
        ["SINIR", "Kanıt düzeyini belirt", "Başarılı bir model belirli koşullarda doğru öngörü üretir; her ayrıntıyı kopyalaması gerekmez. Kuramsal öneri, dolaylı kanıt ve doğrudan doğrulama aynı şey değildir."],
      ],
      example: {
        title: "İddiayı kanıta bağla",
        prompt: "Sayfadaki {concept} açıklamasından bir iddia seç.",
        steps: [
          "İddianın doğrudan gözlenen mi, modelden çıkarılan mı olduğunu sınıflandır.",
          "Bu iddia doğruysa hangi ölçüm veya deseni bekleyeceğini yaz.",
          "Alternatif bir açıklamanın aynı sonucu üretip üretemeyeceğini ve nasıl ayırt edileceğini düşün.",
        ],
        takeaway: "Modern fizikte ikna gücü, bir fikrin şaşırtıcı olmasından değil sınanabilir ve tekrarlanabilir öngörülerinden gelir.",
      },
      experiment: {
        title: "Dijital ölçek ve model deneyi",
        setup: "Sayfadaki simülasyon veya görsel modelde tek bir ölçek ya da parametre seç.",
        steps: [
          "Parametreyi bir büyüklük mertebesi değiştirince gözlenecek sonucu önce tahmin et.",
          "Modeli çalıştır ve hangi niceliğin doğrudan gösterildiğini kaydet.",
          "Sonucun model varsayımına mı, ölçüm verisine mi dayandığını iki ayrı cümlede açıkla.",
        ],
        observe: "Modelin hangi aralıkta anlamlı kaldığını ve hangi kanıtın onu yanlışlayabileceğini not et.",
      },
      correction:
        "Bir modeli doğrudan görememek onu bilim dışı yapmaz; modelin ölçülebilir öngörüleri gözlemle sınanabiliyorsa kanıt üretilebilir.",
    },
    chemistry: {
      goal:
        "{title} konusunda {concept} kavramını makroskobik gözlem, tanecik modeli ve sembolik gösterim düzeylerinde ilişkilendirebilmek.",
      prerequisite:
        "Atom–molekül–iyon ayrımı, element sembolleri, kütlenin korunumu ve temel oran–orantı.",
      layers: [
        ["SEZGİ", "Gözleneni kaydet", "Renk, sıcaklık, gaz oluşumu ya da çözünme gibi makroskobik değişimi yorumlamadan önce betimle. {concept}, bu gözlemin hangi yönünü açıklıyor?"],
        ["MODEL", "Taneciklere in", "Atom, iyon veya moleküllerin nasıl yeniden düzenlendiğini düşün; ardından {secondConcept} ile bu tanecik resmini denklem ya da grafik diline bağla."],
        ["SINIR", "Koşulları yaz", "Sıcaklık, basınç, derişim ve çözücü değiştiğinde aynı formül veya yaklaşım geçerli kalmayabilir. Sonucu koşullarıyla birlikte belirt."],
      ],
      example: {
        title: "Üç düzeyli kimya açıklaması",
        prompt: "Sayfadaki {concept} ile ilişkili bir değişimi seç.",
        steps: [
          "Gözlemi yalnızca duyular ve ölçümler düzeyinde bir cümleyle yaz.",
          "Aynı olayı taneciklerin çarpışması, bağları veya dağılımı üzerinden açıkla.",
          "Tanecik açıklamasını uygun sembol, denklem ya da grafikle temsil et; atom ve yük sayılarını kontrol et.",
        ],
        takeaway: "Gözlem, tanecik modeli ve sembolik dil birbiriyle tutarlı olduğunda kimyasal açıklama tamamlanır.",
      },
      experiment: {
        title: "Güvenli dijital kimya karşılaştırması",
        setup: "Yalnızca sayfadaki sanal laboratuvarı kullan; evde kimyasal karıştırma, tatma veya ısıtma yapma.",
        steps: [
          "Sıcaklık, derişim, hacim veya yüzey alanından birini değişken seç.",
          "Kontrol ve deney koşullarındaki gözlenebilir sonucu tabloya yaz.",
          "Farkı taneciklerin sayısı, enerjisi veya çarpışma olasılığıyla açıkla.",
        ],
        observe: "Modelin hangi güvenlik ve laboratuvar ayrıntılarını göstermediğini not et.",
      },
      correction:
        "Kimyasal tepkimede atom türleri yoktan oluşmaz veya yok olmaz; atomlar korunur, bağlar ve tanecik düzeni değişir.",
    },
    biology: {
      goal:
        "{title} bağlamında {concept} kavramını doğru biyolojik ölçekte yapı, işlev, bilgi veya enerji akışıyla açıklayabilmek.",
      prerequisite:
        "Hücre–doku–organizma ayrımı, kalıtsal bilgi fikri, enerji dönüşümü ve popülasyon kavramı.",
      layers: [
        ["SEZGİ", "Doğru ölçeği seç", "{concept} molekül, hücre, organizma, popülasyon veya ekosistem düzeylerinden hangisinde gerçekleşiyor? Gözlemi doğru ölçeğe yerleştir."],
        ["MODEL", "Yapı ile işlevi bağla", "Bir yapı veya süreç değiştiğinde {secondConcept} üzerinden hangi işlevin etkilendiğini ve sistemdeki bilgi ya da enerji akışını izle."],
        ["SINIR", "Çeşitliliği hesaba kat", "Canlı sistemlerde bireysel farklılık, çevre ve rastlantı önemlidir. Tek bireyden bütün popülasyona genelleme yapma; mekanizma ile olasılığı ayır."],
      ],
      example: {
        title: "Ölçekler arası neden zinciri",
        prompt: "{concept} ile başlayan bir biyolojik değişim seç.",
        steps: [
          "Değişimin ilk görüldüğü biyolojik düzeyi belirle.",
          "Bir alt ve bir üst düzeyde ortaya çıkabilecek sonucu neden–sonuç zinciriyle yaz.",
          "Çevre, çeşitlilik veya geri bildirimin bu zinciri nasıl değiştirebileceğini ekle.",
        ],
        takeaway: "Biyolojik açıklamalar, doğru ölçeği ve ölçekler arasındaki mekanizmayı belirttiğinde güçlenir.",
      },
      experiment: {
        title: "Model popülasyon gözlemi",
        setup: "Sayfadaki modelde tek bir çevresel veya biyolojik değişken seç; canlılara zarar veren gerçek deney yapma.",
        steps: [
          "Başlangıç popülasyonunu ve kontrol koşulunu kaydet.",
          "Tek değişkeni değiştirip kısa ve uzun zaman aralıklarında sonucu gözle.",
          "En az üç tekrar düşünerek tek deneme ile genel sonuç arasındaki farkı açıkla.",
        ],
        observe: "Ortalamayla birlikte değişkenliği ve olası geri bildirim döngülerini not et.",
      },
      correction:
        "Bir bireyin yaşamı boyunca kazandığı her özellik kalıtsal değildir; kalıtım, üreme hücreleriyle aktarılan genetik bilgiyle ilişkilidir.",
    },
    computing: {
      goal:
        "{title} konusunda {concept} kavramını girdi, işlem, çıktı ve kaynak maliyetleriyle açıklayıp uç durumlarda sınayabilmek.",
      prerequisite:
        "Değişken, koşul, tekrar, veri türü ve bir işlemi açık adımlara ayırma fikri.",
      layers: [
        ["SEZGİ", "Problemi parçalara ayır", "{concept} hangi girdiyi alıyor, hangi kararı veriyor ve hangi çıktıyı üretiyor? Önce sistemi günlük dille adım adım anlat."],
        ["MODEL", "Temsil ve maliyeti ölç", "Verinin nasıl temsil edildiğini, {secondConcept} ile işlemlerin hangi sırada yürüdüğünü ve girdi büyürken zaman/bellek maliyetini incele."],
        ["SINIR", "Uç durumu ve tehdidi dene", "Boş, çok büyük, hatalı veya kötü niyetli girdide sistem ne yapıyor? Küçük örnekte çalışmak doğruluk, güvenlik ve ölçeklenebilirliği tek başına kanıtlamaz."],
      ],
      example: {
        title: "Algoritmayı masada çalıştır",
        prompt: "{concept} ile ilişkili küçük ama kenar durum içeren bir girdi seç.",
        steps: [
          "Başlangıç durumunu ve beklenen çıktıyı açıkça yaz.",
          "Her adımda değişen veri veya durumu tablo halinde izle.",
          "Boş girdi, yinelenen değer veya beklenmeyen tür ekleyip davranışın hâlâ doğru ve güvenli olup olmadığını kontrol et.",
        ],
        takeaway: "Bir algoritmayı anlamak, yalnızca normal örnekte sonucu değil, durum geçişlerini ve uç koşulları da izlemeyi gerektirir.",
      },
      experiment: {
        title: "Ölçek ve uç durum laboratuvarı",
        setup: "Sayfadaki modelde karşılaştırılabilir iki yöntem, ayar veya girdi boyutu seç.",
        steps: [
          "Küçük girdide doğruluk ve adım sayısını kaydet.",
          "Girdiyi yaklaşık on kat büyüt; süre ve bellek davranışının nasıl değiştiğini gözle.",
          "Bir uç veya geçersiz girdi ekleyip hata mesajının anlaşılır ve güvenli olup olmadığını değerlendir.",
        ],
        observe: "Sonucun doğruluğu ile çözümün maliyetini ayrı sütunlarda karşılaştır.",
      },
      correction:
        "Bir programın birkaç örnekte doğru çıktı vermesi bütün girdilerde doğru, verimli veya güvenli olduğunu göstermez; uç durumlar ve büyüyen veri ayrıca sınanmalıdır.",
    },
    engineering: {
      goal:
        "{title} tasarımında {concept} kavramını gereksinim, ölçülebilir başarı ölçütü, risk ve ödünleşimlerle değerlendirebilmek.",
      prerequisite:
        "Temel kuvvet–enerji–güç kavramları, oran–orantı, grafik okuma ve ölçüm birimleri.",
      layers: [
        ["SEZGİ", "İhtiyacı tanımla", "{concept} hangi kullanıcı ihtiyacını veya sistem işlevini karşılıyor? Çözümden önce başarıyı nasıl ölçeceğini belirle."],
        ["MODEL", "Alt sistemleri bağla", "Girdi, dönüşüm ve çıktıyı izleyerek {secondConcept} ile performans, maliyet, güvenlik ve dayanıklılık arasındaki ödünleşimi görünür kıl."],
        ["SINIR", "Arızayı düşün", "Nominal çalışma tek başına yeterli değildir. Belirsizlik, aşınma, çevre koşulları ve tek bileşen arızasında sistemin güvenli duruma geçip geçmediğini sorgula."],
      ],
      example: {
        title: "Gereksinimden test ölçütüne",
        prompt: "{concept} ile ilgili bir tasarım hedefi seç.",
        steps: [
          "Hedefi ölçülebilir bir gereksinim olarak yaz; birim ve kabul sınırı ekle.",
          "Bu hedefi iyileştirmenin maliyet, kütle, enerji, güvenlik veya çevresel etkideki bedelini belirle.",
          "Normal, sınır ve arıza koşullarını içeren üç aşamalı bir test tanımla.",
        ],
        takeaway: "İyi mühendislik çözümü yalnızca tepe performansı değil, gereksinimler arasındaki dengeli ve doğrulanmış seçimi temsil eder.",
      },
      experiment: {
        title: "Sanal tasarım karşılaştırması",
        setup: "Sayfadaki modelde bir başarı ölçütü ve bir kısıt seç.",
        steps: [
          "Temel tasarımın ölçüt değerini kaydet.",
          "Tek parametreyi değiştirip hem yararı hem oluşan bedeli ölç.",
          "Sınır veya arıza koşulu ekleyip güvenlik payının yeterli olup olmadığını değerlendir.",
        ],
        observe: "Seçiminin hangi gereksinimi önceliklendirdiğini ve hangi koşulda yeniden düşünülmesi gerektiğini not et.",
      },
      correction:
        "En yüksek performanslı bileşenlerin toplamı her zaman en iyi sistem değildir; uyumluluk, güvenlik, maliyet ve çalışma koşulları birlikte optimize edilir.",
    },
    society: {
      goal:
        "{title} konusunda {concept} kavramını aktör, teşvik, kanıt kaynağı ve alternatif açıklamaları ayırarak değerlendirebilmek.",
      prerequisite:
        "Yüzde ve oran okuma, grafik yorumlama, korelasyon ile nedensellik arasındaki temel fark.",
      layers: [
        ["SEZGİ", "Aktörleri ve ölçeği ayır", "{concept} birey, kurum, devlet veya sistem düzeylerinden hangisinde ele alınıyor? Her aktörün hedefi ve kısıtı aynı olmayabilir."],
        ["MODEL", "Göstergeyi mekanizmaya bağla", "{secondConcept} için kullanılan göstergenin neyi ölçtüğünü, neyi dışarıda bıraktığını ve beklenen neden zincirini açıkla."],
        ["SINIR", "Alternatif açıklama ara", "Birlikte değişen iki gösterge nedenselliği tek başına kanıtlamaz. Zaman sırası, seçilim, karıştırıcı etken ve farklı dönem/ülke koşullarını araştır."],
      ],
      example: {
        title: "İddiadan kanıt tablosuna",
        prompt: "{concept} hakkında sayfada geçen veya senin kurduğun bir iddia seç.",
        steps: [
          "İddiadaki aktörü, dönemi, yeri ve sonucu açıkça tanımla.",
          "İddiayı destekleyecek gösterge ile onu zayıflatabilecek alternatif açıklamayı ayrı sütunlara yaz.",
          "Karşılaştırılabilir en az iki grup veya dönem belirleyip hangi ek verinin gerektiğini açıkla.",
        ],
        takeaway: "Toplumsal bir açıklamanın gücü, tek örnekten değil ölçüm tanımından, karşılaştırmadan ve alternatifleri elemesinden gelir.",
      },
      experiment: {
        title: "Veri okuryazarlığı incelemesi",
        setup: "Sayfadaki bir göstergeyi veya güvenilir kaynaklardan küçük bir tabloyu kullan.",
        steps: [
          "Göstergenin tanımını, birimini, dönemini ve veri kaynağını yaz.",
          "Toplam yerine kişi başına değer ya da farklı bir dönem seçince yorumun değişip değişmediğini karşılaştır.",
          "Gözlenen ilişki için en az bir alternatif açıklama ve onu sınayacak veri öner.",
        ],
        observe: "Verinin ölçemediği şeyi ve yorumunun hangi koşullarda geçerli olduğunu açıkça not et.",
      },
      correction:
        "İki göstergenin birlikte değişmesi ilişkiyi gösterir; birinin diğerine neden olduğunu söylemek için mekanizma, zaman sırası ve alternatif açıklamalara karşı ek kanıt gerekir.",
    },
    games: {
      goal:
        "{title} oyununda {concept} kavramını kullanarak bir strateji kurabilmek, sonucu kaydedip stratejiyi geri bildirime göre geliştirebilmek.",
      prerequisite:
        "Oyunun temel kontrolleri, hedefi ve bir denemede yalnızca tek strateji değişikliğini karşılaştırma fikri.",
      layers: [
        ["SEZGİ", "Durumu oku", "{concept}, ekrandaki hangi bilgiyi karar için önemli kılıyor? Hamleden önce kısa vadeli fırsat ile uzun vadeli konumu ayır."],
        ["MODEL", "Karar kuralı kur", "{secondConcept} üzerinden ‘bu durumda şunu yap’ biçiminde açık bir strateji yaz ve aynı başlangıca benzeyen durumlarda uygula."],
        ["SINIR", "Şansı stratejiden ayır", "Tek yüksek puan stratejiyi kanıtlamaz. Benzer koşullarda tekrarlanan denemeler, tepki süresi ve rastlantı etkisini daha iyi ayırır."],
      ],
      example: {
        title: "Bir hamleden stratejiye",
        prompt: "{concept} ile ilişkili sık karşılaştığın bir oyun durumu seç.",
        steps: [
          "Durumu, seçtiğin hamleyi ve beklediğin sonucu denemeden önce yaz.",
          "Aynı karar kuralını benzer üç durumda uygula ve sonucu kaydet.",
          "Başarısız denemede yalnızca tek kuralı değiştirip yeniden karşılaştır.",
        ],
        takeaway: "Strateji, tek hamle değil; benzer durumlarda gerekçeli ve geliştirilebilir bir karar ilkesidir.",
      },
      experiment: {
        title: "Strateji A/B deneyi",
        setup: "Puan, süre veya hamle sayısı gibi tek bir başarı ölçütü seç.",
        steps: [
          "A stratejisini benzer koşullarda üç kez dene ve sonucu kaydet.",
          "Yalnızca bir karar kuralını değiştirerek B stratejisini üç kez uygula.",
          "Ortalama sonuçla birlikte tutarlılığı da karşılaştır; en iyi tek skora göre karar verme.",
        ],
        observe: "Hangi durumlarda A, hangi durumlarda B stratejisinin daha iyi çalıştığını not et.",
      },
      correction:
        "Tek bir başarılı hamle, stratejinin her durumda en iyi olduğunu göstermez; durum bilgisi ve tekrarlanan karşılaştırma gerekir.",
    },
  };

  const STUDY_GUIDES = {
    mathematics: {
      objective:
        "{concept} kavramını yalnız tanımıyla değil; örnek, grafik ya da şekil ve sembolik gösterim arasında bağlantı kurarak açıklayabilmek.",
      prerequisite:
        "Dört işlem, oran düşüncesi, cebirsel semboller ve koordinat düzleminde eksenleri okuma. Bilmediğin bir terim varsa önce aşağıdaki sözlüğe göz at.",
      example: {
        title: "Bir örüntüyü sınama",
        prompt:
          "{title} sayfasında gördüğün ilişkiyi küçük bir örnek üzerinde nasıl güvenilir biçimde sınarsın?",
        steps: [
          "İddiada değişen niceliği ve sabit tutulacak koşulları açıkça yaz.",
          "Kolay hesaplanan en az iki örnek seç; sonucu önce tahmin et, sonra hesapla veya çiz.",
          "Örnekler uyuyorsa bunun henüz genel bir ispat olmadığını belirt; bir karşı örnek ya da genel gerekçe ara.",
        ],
        result:
          "Sonuç, örüntünün hangi koşullarda çalıştığını gösteren bir gerekçe ve sınır cümlesi içermelidir.",
      },
      experiment: {
        question: "Tek bir parametre değiştiğinde temsil nasıl değişiyor?",
        steps: [
          "Başlangıç değerini ve ekranda gözlediğin iki özelliği not et.",
          "Yalnız bir denetimi küçük bir miktar değiştir; diğerlerini aynı bırak.",
          "Tablo, grafik veya şekille önce–sonra karşılaştırması yap ve tahmininle uyuşup uyuşmadığını yaz.",
        ],
        observe:
          "Eksen ölçeği veya seçilen aralık değiştiğinde görünüşün değişebileceğini, matematiksel ilişkinin ise ayrıca kontrol edilmesi gerektiğini gözle.",
      },
      modelLimit:
        "Ekrandaki birkaç örnek güçlü sezgi verir ama bütün durumlar için ispat değildir. Sayısal yuvarlama ve çizim çözünürlüğü de görüntüyü etkileyebilir.",
    },
    mechanics: {
      objective:
        "{concept} kavramını kullanarak hareketin nasıl değişeceğini öngörmek; sistem sınırını, yönleri ve modelin ihmal ettiği etkileri söyleyebilmek.",
      prerequisite:
        "Konum, zaman, hız ve ivme ayrımını; yönlü niceliklerde artı–eksi işaretinin ne anlattığını ve basit oranları bilmek yararlı olur.",
      example: {
        title: "Kuvvetten harekete",
        prompt: "Bir cismin hareketini açıklarken hangi sırayla düşünmelisin?",
        steps: [
          "İncelenecek cismi sistem olarak seç ve ona dışarıdan etki eden kuvvetleri yönleriyle göster.",
          "Kuvvetleri vektörel topla. Net kuvvet sıfırsa ivme sıfırdır; bu, hızın mutlaka sıfır olduğu anlamına gelmez.",
          "Net kuvvet varsa yönünü bul; Fnet = m·a bağıntısıyla ivmenin yönünü ve büyüklüğünü yorumla.",
        ],
        result:
          "Örneğin 2 kg cisme aynı yönde net 6 N uygulanırsa ivme 3 m/s² olur; başlangıç hızı ayrıca bilinmeden konum söylenemez.",
      },
      experiment: {
        question: "Aynı kuvvet farklı kütlelerde nasıl bir hareket değişimi oluşturur?",
        steps: [
          "Simülasyonda kuvveti ve başlangıç koşullarını sabitle, ilk kütledeki hareketi kaydet.",
          "Kütleyi iki katına çıkar ve aynı süre sonunda hız ya da konumu yeniden ölç.",
          "a = F/m beklentisiyle sonucu karşılaştır; fark varsa sürtünme veya başka kuvvetlerin açık olup olmadığını kontrol et.",
        ],
        observe:
          "Aynı net kuvvette kütle büyüdükçe ivmenin azalmasını bekleriz; ekrandaki konum ise başlangıç koşulları ve geçen süreye de bağlıdır.",
      },
      modelLimit:
        "Pek çok hareket modeli cismi noktasal, yüzeyi sürtünmesiz veya hava direncini önemsiz kabul eder. Gerçek ölçümde bu kabulleri açıkça belirt.",
    },
    waves: {
      objective:
        "{concept} ile genlik, frekans, dalga boyu, faz ve hız arasındaki bağı kurmak; zaman grafiğiyle uzaydaki dalga görüntüsünü ayırabilmek.",
      prerequisite:
        "Periyot ve frekansın ters ilişkisi, basit grafik okuma ve hız = yol/zaman düşüncesi.",
      example: {
        title: "Frekans iki katına çıkarsa",
        prompt: "Dalga hızı sabit bir ortamda frekans 4 Hz'den 8 Hz'e çıkarsa dalga boyu ne olur?",
        steps: [
          "Dalga bağıntısını yaz: v = f·λ.",
          "Ortam değişmediği için v sabit kabul edilir.",
          "f iki katına çıktığında çarpımın sabit kalması için λ yarıya iner.",
        ],
        result:
          "Örneğin v = 12 m/s ise λ ilk durumda 3 m, ikinci durumda 1,5 m olur.",
      },
      experiment: {
        question: "Faz farkı üst üste binme desenini nasıl değiştirir?",
        steps: [
          "İki kaynağın genlik ve frekansını eşitle, faz farkını sıfırla ve toplam genliği kaydet.",
          "Faz farkını adım adım artır; güçlenme ve sönme noktalarını not et.",
          "Sonucu yapıcı ve yıkıcı girişim kavramlarıyla açıkla.",
        ],
        observe:
          "Tam sönme yalnız uygun genlik ve faz koşullarında oluşur; doğrusal olmayan sistemlerde basit süperpozisyon geçerli olmayabilir.",
      },
      modelLimit:
        "Çizimler çoğu zaman tek frekanslı, kayıpsız ve doğrusal dalgaları gösterir. Gerçek ortamda soğurma, saçılma ve dağılım görülebilir.",
    },
    electricity: {
      objective:
        "{concept} kavramını kullanarak devrede enerji aktarımını izlemek; akım, gerilim, direnç ve gücü birbiriyle karıştırmadan açıklayabilmek.",
      prerequisite:
        "Elektrik yükü, kapalı devre, seri–paralel bağlantı ve cebirsel denklem çözme hakkında temel fikir.",
      example: {
        title: "Dirençte akım ve güç",
        prompt: "6 V gerilim uygulanan 3 Ω'luk ideal bir dirençte akım ve güç nedir?",
        steps: [
          "Ohm bağıntısından akımı bul: I = V/R = 6/3 = 2 A.",
          "Gücü P = V·I ile hesapla: P = 6·2 = 12 W.",
          "Birimleri kontrol et ve bu hesabın ideal, sıcaklığı sabit bir direnç varsaydığını belirt.",
        ],
        result: "İdeal modelde akım 2 A, dirençte enerji dönüşüm hızı 12 W'tır.",
      },
      experiment: {
        question: "Direnci artırmak akımı ve gücü nasıl etkiler?",
        steps: [
          "Gerilimi sabitle, başlangıç direnci için akım ve gücü kaydet.",
          "Direnci iki katına çıkar; I = V/R ve P = V²/R ile tahmin yap.",
          "Simülasyon değerlerini hesapla karşılaştır ve kaynak sınırı varsa not et.",
        ],
        observe:
          "Sabit ideal gerilim altında direnç iki katına çıkınca akım ve dirençteki güç yarıya iner.",
      },
      modelLimit:
        "İdeal devre telleri ve kaynakları kayıpsız kabul eder. Gerçek kaynakların iç direnci, eleman toleransı ve sıcaklık etkisi vardır.",
    },
    modernSpace: {
      objective:
        "{concept} hakkında doğrudan gözlem ile modelden çıkarılan sonucu ayırmak; iddianın hangi ölçümle sınanabileceğini açıklayabilmek.",
      prerequisite:
        "Üslü gösterim, enerji ve dalga kavramları, grafik okuma ve bilimsel modelin kanıtla sınandığı düşüncesi.",
      example: {
        title: "Ölçümden modele",
        prompt: "Doğrudan göremediğimiz bir sistem hakkında nasıl güvenilir çıkarım yapılır?",
        steps: [
          "Önce gerçekten ölçülen niceliği yaz: örneğin tayftaki çizgi, ışık eğrisi veya parçacık sayımı.",
          "Modelin bu ölçüm için yaptığı nicel öngörüyü belirt.",
          "Belirsizlikleri ve alternatif açıklamaları karşılaştır; modelle uyumun 'kesin kanıt' değil, destek olduğunu söyle.",
        ],
        result:
          "Sağlam sonuç, gözlem–öngörü uyumunu ve modelin hangi koşullarda sınandığını birlikte verir.",
      },
      experiment: {
        question: "Model parametresi değiştiğinde gözlenebilir çıktı nasıl değişiyor?",
        steps: [
          "Ekranda doğrudan ayarlanan parametreyi ve ölçülen çıktıyı ayır.",
          "Parametreyi küçük adımlarla değiştirip en az üç veri noktası kaydet.",
          "Eğilimi çiz ve hangi ek ölçümün iki farklı açıklamayı ayırabileceğini öner.",
        ],
        observe:
          "Görselleştirme gözlenmiş bir fotoğraf olmayabilir; çoğu kez denklemin öngördüğü davranışı görünür kılan temsildir.",
      },
      modelLimit:
        "Aşırı küçük, büyük veya hızlı sistemlerin çizimleri ölçekli değildir. Kuramsal bir olasılık ile deneysel olarak doğrulanmış bulguyu aynı kesinlikte sunma.",
    },
    chemistry: {
      objective:
        "{concept} kavramını makroskobik gözlem, tanecik modeli ve kimyasal semboller olmak üzere üç düzeyde ilişkilendirebilmek.",
      prerequisite:
        "Atom, element, molekül ve iyon ayrımı; basit formül okuma ve maddenin tanecikli yapısı.",
      example: {
        title: "Denklemde atom korunumu",
        prompt: "H₂ + O₂ → H₂O denklemi neden ve nasıl denkleştirilir?",
        steps: [
          "Her iki taraftaki atomları say: solda 2 H ve 2 O; sağda 2 H ve 1 O vardır.",
          "Formüllerin alt indislerini değiştirme; molekül sayılarını belirten katsayıları ayarla.",
          "2H₂ + O₂ → 2H₂O yaz ve yeniden say: iki tarafta 4 H ve 2 O bulunur.",
        ],
        result: "Denkleşmiş denklem atom türü ve sayısının korunduğunu gösterir.",
      },
      experiment: {
        question: "Bir koşul değişikliği gözlenen kimyasal süreci nasıl etkiliyor?",
        steps: [
          "Sıcaklık, derişim veya yüzey alanından yalnız birini değiştir.",
          "Başlangıç ve son durumu süre, renk, pH ya da gaz hacmi gibi ölçülebilir bir nicelikle karşılaştır.",
          "Gözlemi tanecik çarpışmaları veya denge düşüncesiyle açıkla; güvenlik talimatı olmayan gerçek kimyasalı deneme.",
        ],
        observe:
          "Renk değişimi tek başına hangi ürünün oluştuğunu kanıtlamaz; tanımlama için uygun ölçüm ve kontrol gerekir.",
      },
      modelLimit:
        "Tanecik çizimleri ölçekli değildir ve bağları çoğu kez basitleştirir. İdeal gaz, tam ayrışma veya tek basamaklı tepkime gibi kabuller her koşulda geçerli olmaz.",
    },
    biology: {
      objective:
        "{concept} kavramını doğru biyolojik ölçekte açıklamak; yapı–işlev, çeşitlilik ve geri bildirim ilişkilerini örnekle gösterebilmek.",
      prerequisite:
        "Hücrenin canlılığın temel birimi olduğu, kalıtsal bilginin DNA ile ilişkisi ve canlıların enerji/madde alışverişi yaptığı fikri.",
      example: {
        title: "Adil biyoloji karşılaştırması",
        prompt: "Işığın fide büyümesine etkisini sınamak için nasıl bir düzen kurulur?",
        steps: [
          "Aynı tür ve benzer büyüklükte yeterli sayıda fideyi iki gruba ayır.",
          "Yalnız ışık koşulunu değiştir; su, toprak, sıcaklık ve ölçüm süresini aynı tut.",
          "Boy gibi tek ölçü yerine yaprak sayısı ve sağlık belirtisi gibi birden çok veri kaydet; grup ortalamalarını ve değişkenliği karşılaştır.",
        ],
        result:
          "Tek bir bitki bütün türü temsil etmez; tekrarlı ölçüm ve kontrol grubu daha güvenilir yorum sağlar.",
      },
      experiment: {
        question: "Sistemdeki bir değişken kısa ve uzun vadede neyi etkiliyor?",
        steps: [
          "Birey, hücre veya popülasyon ölçeklerinden hangisini incelediğini belirt.",
          "Bir değişken seçip kontrol durumuyla karşılaştır; en az üç gözlem kaydet.",
          "Sonucu 'her zaman' diye genellemeden önce çeşitlilik ve başka olası nedenleri yaz.",
        ],
        observe:
          "Canlı sistemlerde aynı koşul farklı bireylerde farklı büyüklükte sonuç üretebilir; bu değişkenlik verinin parçasıdır.",
      },
      modelLimit:
        "Şemalar bir hücreyi, organizmayı veya ekosistemi seçilmiş parçalarla gösterir. Benzetmeler yararlıdır fakat amaç, niyet veya kusursuzluk ima etmemelidir.",
    },
    computing: {
      objective:
        "{concept} kavramını girdi–işlem–çıktı ve kaynak maliyetiyle açıklamak; uç durumlarda algoritmanın ne yapacağını sınayabilmek.",
      prerequisite:
        "Değişken, koşul, döngü ve liste kavramları; bir problemin açık adımlara ayrılabileceği düşüncesi.",
      example: {
        title: "Doğruluk ve maliyet",
        prompt: "Sekiz öğelik sırasız listede doğrusal arama en kötü durumda kaç karşılaştırma yapar?",
        steps: [
          "Aranan öğenin son sırada veya listede hiç olmadığını düşün.",
          "Algoritma her öğeyi sırayla kontrol edeceği için sekiz öğenin tümüne bakar.",
          "Liste 16 öğeye çıktığında en kötü karşılaştırma sayısı da 16 olur; maliyet girdiyle doğrusal büyür.",
        ],
        result: "Doğrusal aramanın en kötü zaman maliyeti O(n) olarak ifade edilir.",
      },
      experiment: {
        question: "Girdi büyüdüğünde çalışma süresi veya adım sayısı nasıl değişiyor?",
        steps: [
          "Aynı algoritmayı küçük, orta ve iki kat büyük girdilerle çalıştır.",
          "Saat süresi yerine mümkünse karşılaştırma ya da işlem adımını da say.",
          "Sonucu doğrusal, logaritmik veya karesel büyüme beklentisiyle karşılaştır ve uç durum dene.",
        ],
        observe:
          "Tek bir hızlı deneme algoritmanın doğru, güvenli veya ölçeklenebilir olduğunu göstermez.",
      },
      modelLimit:
        "Tarayıcıdaki küçük simülasyon gerçek donanım, ağ gecikmesi, eşzamanlılık ve kötü niyetli girdilerin bütün etkilerini içermez.",
    },
    engineering: {
      objective:
        "{concept} için ölçülebilir bir gereksinim kurmak; performans, güvenlik, maliyet ve çevresel etki arasındaki ödünleşimi açıklamak.",
      prerequisite:
        "Temel fiziksel nicelikler ve birimler, grafik okuma, oransal düşünme ve güvenliğin tasarımın başlangıç koşulu olduğu fikri.",
      example: {
        title: "Tek sayı yerine tasarım ölçütü",
        prompt: "Daha uzun menzilli bir araç bataryası seçerken yalnız enerji kapasitesi neden yeterli değildir?",
        steps: [
          "Gereksinimleri yaz: kullanılabilir enerji, kütle, hacim, tepe güç, şarj süresi, ömür ve güvenlik.",
          "Daha fazla enerji eklemenin kütle, maliyet ve ısı yönetimine etkisini karşılaştır.",
          "Tek bir 'en iyi' yerine kullanım senaryosuna uyan, sınırları ölçülmüş çözümü seç.",
        ],
        result:
          "Mühendislik sonucu, başarı ölçütlerini ve kabul edilen ödünleşimleri açıkça belirtir.",
      },
      experiment: {
        question: "Hangi tasarım seçeneği gereksinimleri daha dengeli karşılıyor?",
        steps: [
          "En az üç ölçüt seç ve her birinin birimini ya da değerlendirme kuralını yaz.",
          "İki tasarımı aynı koşulda karşılaştır; tek bir tepe değeri yerine çalışma aralığını incele.",
          "Arıza durumunu düşün: sistemin güvenli duruma nasıl geçeceğini not et.",
        ],
        observe:
          "Bir ölçütteki iyileşme başka bir ölçütte bedel doğurabilir; bu hata değil, görünür kılınması gereken ödünleşimdir.",
      },
      modelLimit:
        "Ekrandaki prototip malzeme yorulması, üretim toleransı, bakım, insan davranışı ve mevzuat gibi gerçek tasarım etkenlerini bütünüyle içermez.",
    },
    society: {
      objective:
        "{concept} hakkındaki iddiayı gösterge, kaynak, karşılaştırma ve alternatif açıklamalarla değerlendirmek; korelasyonla nedenselliği ayırmak.",
      prerequisite:
        "Yüzde ve oran okuma, tablo/grafik yorumlama, bir verinin tarih ve tanımla birlikte anlam kazandığı düşüncesi.",
      example: {
        title: "Korelasyon tuzağı",
        prompt: "Dondurma satışıyla boğulma vakalarının birlikte artması, birinin diğerine neden olduğunu gösterir mi?",
        steps: [
          "İki göstergenin aynı dönemde arttığını gözle; bu bir korelasyondur.",
          "Ortak üçüncü etken ara: sıcak havada hem dondurma tüketimi hem yüzme etkinliği artabilir.",
          "Nedensellik için zaman sırası, mekanizma ve karşılaştırılabilir gruplar gibi ek kanıt iste.",
        ],
        result: "Birlikte değişim tek başına neden–sonuç kanıtı değildir.",
      },
      experiment: {
        question: "Seçilen gösterge gerçekten hangi olguyu ölçüyor, neyi dışarıda bırakıyor?",
        steps: [
          "Göstergenin tanımını, birimini, dönemini ve veri kaynağını yaz.",
          "Aynı olgu için ikinci bir gösterge bul ve iki ölçümün farklı yönlerini karşılaştır.",
          "Sonucu başka dönem ya da grupla kıyasla; değişen tanım ve bağlamı not et.",
        ],
        observe:
          "Güncel oranlar ve kurum bilgileri değişebilir; sayıyı tarih ve birincil kaynak olmadan ezberleme.",
      },
      modelLimit:
        "Toplumsal modeller insan davranışını seçilmiş değişkenlerle açıklar. Tarihsel bağlam, kurumlar ve ölçülmeyen etkenler sonucu değiştirebilir.",
    },
    games: {
      objective:
        "{concept} kavramını kullanarak bir strateji kurmak; benzer başlangıç koşullarında tekrarlı denemelerle stratejiyi karşılaştırmak.",
      prerequisite:
        "Oyunun temel kontrolleri, hedefi ve geri bildirim işaretleri. Önce yardım düğmesindeki kuralları oku.",
      example: {
        title: "Stratejiyi adil sınama",
        prompt: "Yeni bir oyun stratejisinin gerçekten daha iyi olup olmadığını nasıl anlarsın?",
        steps: [
          "Başlangıç koşulunu ve başarı ölçütünü seç: puan, süre, hamle sayısı veya kaybedilen hak.",
          "İlk stratejiyi en az üç kez, sonra yalnız bir kararı değiştiren ikinci stratejiyi üç kez dene.",
          "Yalnız en iyi puanı değil bütün sonuçları karşılaştır ve şansın etkisini düşün.",
        ],
        result: "Tekrarlı ve benzer koşullu denemeler, strateji farkını daha görünür kılar.",
      },
      experiment: {
        question: "Hız mı planlama mı sonucu daha fazla etkiliyor?",
        steps: [
          "İlk turda hızlı karar ver ve sonucu kaydet.",
          "İkinci turda hamleden önce kısa bir plan yap; diğer koşulları olabildiğince aynı tut.",
          "Puanın yanında hata ve hamle sayısını da karşılaştır.",
        ],
        observe: "Oyun mekaniği gerçek fizik veya gerçek yaşam güvenliğinin tam modeli değildir.",
      },
      modelLimit:
        "Oyun kuralları öğrenme için bilinçli olarak basitleştirilmiştir; ekrandaki çarpışma, hareket veya kaynak sistemi gerçek dünyayla bire bir aynı değildir.",
    },
  };

  const TOPIC_CONCEPTS = {
    "mandelbrot+lorenz": [
      ["Yineleme", "Bir işlemin çıktısını yeniden aynı işlemin girdisi olarak kullanma."],
      ["Fraktal", "Farklı ölçeklerde benzer ayrıntılar gösteren ve yinelemeyle üretilebilen geometrik yapı."],
      ["Çekici", "Dinamik bir sistemin zamanla yaklaştığı durumlar kümesi."],
    ],
    "newton-hareket-yasalari": [
      ["Eylemsizlik", "Net kuvvet yokken cismin hareket durumunu koruma eğilimi."],
      ["Net kuvvet", "Bir cisme etki eden bütün kuvvetlerin vektörel toplamı; ivmeyi belirler."],
      ["Etki–tepki çifti", "İki cismin birbirine eşit büyüklükte ve zıt yönde uyguladığı, farklı cisimler üzerindeki kuvvetler."],
    ],
    "normal-dagilim": [
      ["Ortalama", "Bir veri grubundaki değerlerin toplamının veri sayısına oranı; dağılımın merkezini gösterir."],
      ["Standart sapma", "Değerlerin ortalama çevresinde ne kadar yayıldığını ölçen nicelik."],
      ["Olasılık yoğunluğu", "Sürekli bir değişkenin belirli aralıklarda bulunma olasılığını alanla ilişkilendiren fonksiyon."],
    ],
    "optik-yansima-kirilma": [
      ["Yansıma", "Işığın bir yüzeyden geldiği ortama geri dönmesi; gelme ve yansıma açıları eşittir."],
      ["Kırılma", "Işığın farklı bir ortama geçerken hızı değiştiği için yön değiştirmesi."],
      ["Kırılma indisi", "Işığın boşluktaki hızının ortam içindeki hızına oranı."],
    ],
    "pascal-ucgeni": [
      ["Binom katsayısı", "(a+b)^n açılımındaki terimlerin katsayılarını veren sayı."],
      ["Özyineleme", "Bir yapıyı kendisinin daha küçük örnekleri yardımıyla tanımlama."],
      ["Simetri", "Bir dönüşüm sonrasında yapının belirli özelliklerini koruması."],
    ],
    "penrose-dosemesi": [
      ["Periyodik olmayan döşeme", "Deseni kaplayan fakat öteleme yoluyla düzenli olarak tekrar etmeyen döşeme."],
      ["Yerel eşleşme kuralı", "Parçaların hangi kenarlardan yan yana gelebileceğini belirleyen kısıt."],
      ["Beş katlı simetri", "72 derecelik dönüşlerle ilişkili simetri düzeni."],
    ],
    "periyodik-tablo": [
      ["Atom numarası", "Bir elementin çekirdeğindeki proton sayısı; elementin kimliğini belirler."],
      ["Grup", "Periyodik tabloda benzer değerlik elektron düzenleri ve kimyasal özellikler gösteren dikey sütun."],
      ["Periyot", "Elektronların aynı temel enerji düzeylerinin dolduğu yatay sıra."],
    ],
    pisagor: [
      ["Dik üçgen", "Bir iç açısı 90° olan üçgen."],
      ["Hipotenüs", "Dik üçgende dik açının karşısındaki ve en uzun olan kenar."],
      ["Alan ispatı", "Kenarlar üzerine kurulan karelerin alanlarını karşılaştırarak a²+b²=c² ilişkisini gösteren ispat."],
    ],
    "taylor-serisi": [
      ["Polinom yaklaşımı", "Bir fonksiyonu belirli bir nokta çevresinde türevlerinden kurulan polinomla yaklaşık ifade etme."],
      ["Açılım noktası", "Fonksiyon ile türevlerinin polinomla eşleştirildiği referans değer."],
      ["Kalan terimi", "Sonlu sayıda terim kullanıldığında gerçek değer ile yaklaşım arasındaki hatayı tanımlayan terim."],
    ],
    "tek-sayi-toplam": [
      ["Tek sayı", "2 ile tam bölünmeyen ve 2k−1 biçiminde yazılabilen tam sayı."],
      ["Kare sayı", "Bir tam sayının kendisiyle çarpımı olarak yazılabilen sayı."],
      ["Görsel ispat", "Bir eşitliği geometrik düzenleme veya alan ilişkisiyle zorunlu kılan gösterim."],
    ],
    "tek-sayi-toplam3": null,
    "tek-sayi-toplam4": null,
    "tek-sayi-toplam5": null,
    turev: [
      ["Anlık değişim hızı", "Bir niceliğin başka bir niceliğe göre belirli bir andaki değişim oranı."],
      ["Teğet", "Eğriye bir noktada dokunan ve o noktadaki yerel yönü gösteren doğru."],
      ["Limit", "Girdi bir değere yaklaşırken fonksiyon değerinin yaklaştığı değer."],
    ],
    vektorler: [
      ["Büyüklük", "Bir vektörün uzunluğuyla temsil edilen sayısal değer."],
      ["Yön", "Vektörün uzayda hangi doğrultu ve tarafa baktığını belirten bilgi."],
      ["Bileşen", "Bir vektörün seçilen eksenler üzerindeki izdüşümü."],
    ],
  };

  TOPIC_CONCEPTS["tek-sayi-toplam3"] = TOPIC_CONCEPTS["tek-sayi-toplam"];
  TOPIC_CONCEPTS["tek-sayi-toplam4"] = TOPIC_CONCEPTS["tek-sayi-toplam"];
  TOPIC_CONCEPTS["tek-sayi-toplam5"] = TOPIC_CONCEPTS["tek-sayi-toplam"];

  const GAME_TITLES = {
    asteroids: "Asteroids",
    breakout: "Tuğla Kırmaca",
    "formul-hafiza": "Formül Hafıza",
    "gezegen-savunmasi": "Gezegen Savunması",
    "hanoi-kuleleri": "Hanoi Kuleleri",
    "isik-sondurme": "Işık Söndürme",
    "mayin-tarlasi": "Mayın Tarlası",
    "oyun-2048": "2048",
    pong: "Pong",
    snake: "Yılan Oyunu",
    tetris: "Tetris",
    "uzay-kosucusu": "Uzay Koşucusu",
    "yasam-oyunu": "Conway Yaşam Oyunu",
  };

  function slugToTitle(slug) {
    return (GAME_TITLES[slug] || slug)
      .replace(/\+/g, " ve ")
      .replace(/-/g, " ")
      .replace(/(^|\s)([a-zçğıöşü])/g, (_, lead, letter) =>
        `${lead}${letter.toLocaleUpperCase("tr-TR")}`,
      );
  }

  function profileKeyFor(slug) {
    for (const [key, slugs] of Object.entries(GROUPS)) {
      if (slugs.has(slug)) return key;
    }
    return "mathematics";
  }

  function textFromHtml(html) {
    const box = document.createElement("template");
    box.innerHTML = html || "";
    return (box.content.textContent || "").replace(/\s+/g, " ").trim();
  }

  function shorten(text, max = 235) {
    if (text.length <= max) return text;
    const cut = text.slice(0, max - 1);
    const lastSpace = cut.lastIndexOf(" ");
    return `${cut.slice(0, Math.max(lastSpace, 150)).trim()}…`;
  }

  function sentenceFor(node) {
    const paragraph = node.closest("p")?.textContent || node.parentElement?.textContent || "";
    const normalized = paragraph.replace(/\s+/g, " ").trim();
    const term = node.textContent.replace(/\s+/g, " ").trim();
    const sentences = normalized.match(/[^.!?]+(?:[.!?]+|$)/g) || [normalized];
    return shorten(
      sentences.find((sentence) =>
        sentence.toLocaleLowerCase("tr-TR").includes(term.toLocaleLowerCase("tr-TR")),
      ) || normalized,
    );
  }

  function extractedConcepts(html) {
    const box = document.createElement("template");
    box.innerHTML = html || "";
    const seen = new Set();
    return Array.from(box.content.querySelectorAll("strong, em"))
      .map((node) => ({
        term: node.textContent.replace(/\s+/g, " ").trim(),
        definition: sentenceFor(node),
      }))
      .filter(({ term, definition }) => {
        const key = term.toLocaleLowerCase("tr-TR");
        const predicatePhrase = /(dır|dir|dur|dür|tır|tir|tur|tür|değildir|olur|edilir|yapılır)$/i.test(term);
        if (
          term.length < 3 ||
          term.length > 72 ||
          definition.length < 15 ||
          predicatePhrase ||
          seen.has(key)
        ) {
          return false;
        }
        seen.add(key);
        return true;
      });
  }

  function format(template, values) {
    return template.replace(/\{(\w+)\}/g, (_, key) => values[key] || "");
  }

  function rotateOptions(options, answer, seed) {
    const shift = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0) % options.length;
    const rotated = options.slice(shift).concat(options.slice(0, shift));
    const answerText = options[answer];
    return { options: rotated, answer: rotated.indexOf(answerText) };
  }

  function titleFor(slug, allInfo) {
    return allInfo?.[slug]?.title || GAME_TITLES[slug] || slugToTitle(slug);
  }

  function relatedFor(slug, profileKey, allInfo) {
    const list = Array.from(GROUPS[profileKey] || []);
    const index = Math.max(0, list.indexOf(slug));
    const offsets = [1, -1, 2, -2, 3, -3];
    const related = [];
    offsets.forEach((offset) => {
      if (related.length >= 3 || !list.length) return;
      const candidate = list[(index + offset + list.length) % list.length];
      if (!candidate || candidate === slug || related.some((item) => item.slug === candidate)) return;
      related.push({
        slug: candidate,
        title: titleFor(candidate, allInfo),
        href: `${candidate}.html`,
      });
    });
    return related;
  }

  function resolve(slug, info, allInfo) {
    const profileKey = profileKeyFor(slug);
    const profile = PROFILES[profileKey];
    const title = info?.title || titleFor(slug, allInfo);
    const patched = (TOPIC_CONCEPTS[slug] || []).map(([term, definition]) => ({
      term,
      definition,
    }));
    const extracted = extractedConcepts(info?.text || "");
    const fallback = profile.vocabulary.map(([term, definition]) => ({ term, definition }));
    const seen = new Set();
    const concepts = patched.concat(extracted, fallback).filter(({ term }) => {
      const key = term.toLocaleLowerCase("tr-TR");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    const primary = concepts[0];
    const firstOptions = [
      primary.definition,
      concepts[1]?.definition || profile.misconception[0],
      concepts[2]?.definition || profile.misconception[1],
    ];
    const firstQuiz = rotateOptions(firstOptions, 0, `${slug}-concept`);
    const secondQuiz = rotateOptions(
      profile.check.options,
      profile.check.answer,
      `${slug}-reasoning`,
    );
    const values = { title, concept: primary.term };
    const study = STUDY_GUIDES[profileKey];
    const example = {
      title: study.example.title,
      prompt: format(study.example.prompt, values),
      steps: study.example.steps.map((step) => format(step, values)),
      result: format(study.example.result, values),
    };
    const experiment = {
      question: format(study.experiment.question, values),
      steps: study.experiment.steps.map((step) => format(step, values)),
      observe: format(study.experiment.observe, values),
    };

    return {
      slug,
      title,
      field: profile.label,
      code: profile.code,
      icon: profile.icon,
      accent: profile.accent,
      contextHtml:
        info?.text ||
        `<p>${textFromHtml(title)}; kuralları, geri bildirimi ve strateji seçimlerini deneyebileceğin etkileşimli bir oyun laboratuvarıdır.</p>`,
      why: format(profile.why, values),
      realWorld: format(profile.realWorld, values),
      objective: format(study.objective, values),
      prerequisite: format(study.prerequisite, values),
      example,
      experiment,
      misconception: profile.misconception.map((item) => format(item, values)),
      modelLimit: format(study.modelLimit, values),
      concepts: concepts.slice(0, 3),
      glossary: concepts.slice(0, 5),
      questions: profile.inquiry.map((question) => format(question, values)),
      related: relatedFor(slug, profileKey, allInfo),
      sources: profile.sources,
      quiz: [
        {
          question: `“${primary.term}” kavramını en iyi açıklayan ifade hangisidir?`,
          options: firstQuiz.options,
          answer: firstQuiz.answer,
          explanation: primary.definition,
        },
        {
          question: profile.check.question,
          options: secondQuiz.options,
          answer: secondQuiz.answer,
          explanation: profile.check.explanation,
        },
      ],
      revision: "1 Eylül 2026",
      profileKey,
    };
  }

  root.AcelyaEncyclopediaData = {
    resolve,
    profileKeyFor,
    coveredSlugs: () =>
      Array.from(
        new Set(Object.values(GROUPS).flatMap((group) => Array.from(group))),
      ),
  };
})(window);
