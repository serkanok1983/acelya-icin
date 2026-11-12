window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["normal-dagilim"] = {
  slug: "normal-dagilim",
  title: "Normal Dağılım: Toplanan Rastlantıların Çan Eğrisi",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Zar ortalamaları, ölçüm hataları, anket sonuçları: birbirine benzemeyen rastlantılar toplandıkça aynı çana döner. Merkezi limit teoremi nedenini anlatır, standart hata bedelini: dört kat ölçüm, iki kat kesinlik.",
  hook:
    "Galton tahtasına bırakılan bir top on iki sıra çiviye çarpar; her çivide yazı tura atar gibi sağa ya da sola sapar ve nereye düşeceğini kimse söyleyemez. Bin top bırakırsan ise ortadaki kutuya yaklaşık 226 topun düşeceğini önceden hesaplarsın. Aynı çan zar ortalamalarında, ölçüm hatalarında, anket sonuçlarında da çıkar: kimsenin ayarlamadığı bu düzen nereden geliyor?",
  bigIdea:
    "Aynı dağılımdan bağımsız çekilen ve varyansı sonlu olan n değerin ortalaması <span class=ov>x</span>, değerlerin kendi dağılımı ne olursa olsun, n büyüdükçe merkezi μ, standart sapması σ/√n olan bir çan eğrisine, <strong>normal dağılıma</strong> yaklaşır: <em>merkezi limit teoremi</em> budur.",
  story: [
    "Abraham de Moivre, Protestan olduğu için Fransa'dan İngiltere'ye göçmüş bir matematikçiydi. Hiçbir üniversitede kürsü bulamadı, özel ders vererek geçindi ve ömrü boyunca yoksul kaldı; Londra'daki Slaughter's kahvehanesinin müdavimi olduğu, orada satranç oynayarak biraz para kazandığı anlatılır. Uğraştığı soru şuydu: bir para binlerce kez atılırsa tura sayısının belli bir aralığa düşme olasılığı nedir? Binom katsayılarını tek tek toplamak imkânsızdı. De Moivre terimlerin biçimine baktı ve ortadaki terimden ℓ kadar uzaktaki terimin ortadakine oranının, n büyüdükçe e<sup>−2ℓ²/n</sup>'ye yaklaştığını gösterdi: bugün çan eğrisi dediğimiz biçim. Formüldeki sabitin √(2π) olduğunu dostu, İskoç matematikçi James Stirling bulmuştu. De Moivre sonucu 12 Kasım 1733'te yedi sayfalık Latince bir broşürle yalnızca dostlarına dağıttı (bugün iki kopyası bilinir), İngilizcesini 1738'de <em>The Doctrine of Chances</em> (Şans Öğretisi) kitabının ikinci baskısına ekledi. Orada tura sayısının n/2 ± ½√n aralığında kalma olasılığını 0.682688 bulur; bugünkü değer 0.682689'dur. Yine de eğriyi bir olasılık dağılımı olarak değil, binom toplamlarını hesaplamanın bir yolu olarak gördü. Seçtiği ½√n birimi bugünkü dille tam bir standart sapmadır; bu terimi Karl Pearson ancak 1894'te yazıya geçirecekti.",
    "Çan eğrisini olasılık kuramının merkezine 19. yüzyılın başında gök mekaniğiyle uğraşan iki matematikçi taşıdı. Carl Friedrich Gauss 1809'da gök cisimlerinin hareketi üzerine kitabında, ölçüm hatalarının bu eğriye uyduğunu kabul ederek <strong>en küçük kareler</strong> yöntemine bir olasılık gerekçesi verdi; eğri bu yüzden bugün de 'Gauss eğrisi' diye anılır. Gauss'un dayanağı bir varsayımdı: birçok ölçümün aritmetik ortalamasını en olası değer kabul ediyor, hata yasasını buradan çıkarıyordu. Pierre-Simon Laplace 1810'da Akademi'ye sunduğu bir bildiriyle eksik halkayı ekledi: çok sayıda küçük ve bağımsız katkının toplamı, katkılar tek tek nasıl dağılırsa dağılsın yaklaşık olarak normal dağılır. Bu, merkezi limit teoreminin ilk genel biçimiydi ve 1812'deki <em>Théorie analytique des probabilités</em>'de olgunlaştı. Belçikalı Adolphe Quetelet 1835'te 'ortalama insan' (l'homme moyen) fikrini ortaya attı, sonraki yıllarda da eğriyi insan ölçümlerine uyguladı: İskoç askerlerinin göğüs çevreleri ve Fransız askerlik yoklamalarındaki boylar çan biçimli dağılıyordu. Quetelet çanı o kadar sık buldu ki onu toplumun bir doğa yasası saydı; bu genelleme, aşağıdaki yanılgılardan birinin kaynağıdır.",
    "Francis Galton bu düzeni gözle görülür kıldı. 1870'lerde yaptırdığı ve <strong>quincunx</strong> adını verdiği düzenekte, bugün Galton tahtası dediğimiz şeyde, yukarıdan dökülen saçma taneleri sıra sıra çivilere çarpıp alttaki bölmelerde bir çan biriktiriyordu. 1889'da yayımladığı <em>Natural Inheritance</em> (Doğal Kalıtım) kitabında şöyle yazdı: “‘Hata frekansı yasası’nın dile getirdiği o harika kozmik düzen kadar hayal gücünü etkileyen pek az şey bilirim. Yunanlar onu tanısaydı kişileştirir, tanrılaştırırlardı. En çılgın karmaşanın ortasında sükûnetle ve kendini hiç belli etmeden hüküm sürer.” Laplace'ın akıl yürütmesi bugünkü ölçülerle kesin değildi; Chebyshev ve Markov'un çalışmalarının ardından Aleksandr Lyapunov 1901'de teoremi karakteristik fonksiyonlarla, toplanan değişkenlerin aynı dağılımdan gelmesini gerektirmeyen genel bir biçimde kanıtladı. Adını 1920'de George Pólya koydu: Almanca <em>zentraler Grenzwertsatz</em>. Pólya 'merkezi' sözcüğüyle teoremin olasılık kuramındaki merkezî rolünü kastediyordu; Fransız okulu ise sözcüğü, dağılımın kuyruklarını değil merkezini anlatan bir ad olarak okur. İki okuma da yerinde: MLT sekmesinde çan, merkezde kuyruklardan çok önce oturur.",
    "Çan eğrisinin pratikteki bir tuzağını bir bira fabrikası ortaya çıkardı. Dublin'deki Guinness fabrikasında çalışan kimyager William Sealy Gosset, arpa denemelerinde çoğu zaman yalnızca birkaç ölçüme sahipti; σ'yı bilmiyor, örneklemin s'siyle tahmin ediyordu. Küçük n'de bu tahmin de rastlantısal olduğundan (<span class=ov>x</span> − μ)/(s/√n) oranı normalden kalın kuyruklu bir dağılım izler. Gosset bu dağılımı 1908'de <em>Biometrika</em> dergisinde 'Student' takma adıyla yayımladı; Guinness'in çalışanlarının gerçek adlarıyla yayın yapmasını istemediği anlatılır. Bugün adı <strong>Student t dağılımı</strong>dır: Gosset onu sezgi ve deneyle bulmuştu, kesin kanıtını ve t harfini Ronald Fisher getirdi. Aynı dağılımı 1876'da Helmert ve Lüroth da başka bir soru üzerinden bulmuştu; bilimde buluşlar her zaman bulanın adını taşımaz. Son adımı 1937'de Jerzy Neyman attı ve <strong>güven aralığının</strong> ilk kapsamlı kuramını yayımladı. Neyman'ın %95'i tek bir aralığa değil, aralığı kuran yönteme aittir: yöntem tekrar tekrar uygulanırsa aralıkların yüzde 95'i gerçek değeri yakalar. Sayfanın üçüncü sekmesi bu cümleyi sayarak sınar.",
  ],
  core: [
    {
      heading: "Galton tahtası: yazı turadan çana",
      body:
        "Her çivide top p olasılıkla sağa, 1 − p olasılıkla sola sapar ve çiviler birbirinden habersizdir. Topun düştüğü kutunun numarası k, n sırada kaç kez sağa saptığıdır; bu yüzden k <strong>binom dağılımı</strong> izler. k kutusuna C(n, k) farklı sağ-sol dizisi götürür ve her dizinin olasılığı pᵏ(1 − p)ⁿ⁻ᵏ'dir. Ortadaki kutulara giden yollar çok, uçtakilere giden tek bir yol vardır; çan biçimi bu saymadan doğar. 12 sıralı, p = 0.5 tahtada 6 numaralı kutuya 924 yol gider ve olasılığı 924/4096 ≈ 0.226'dır; 0 ve 12 numaralı kutuların her biri 4096'da birdir. Ortalama np, varyans np(1 − p)'dir. n büyüdükçe dağılım aynı ortalama ve varyanslı normal eğriye yaklaşır: <strong>de Moivre–Laplace teoremi</strong>. Sayfadaki tahta idealdir: gerçek bir tahtada top bir önceki sekmenin hızını taşır ve çiviler özdeş değildir.",
      formula: "P(k) = C(n, k)·pᵏ(1 − p)ⁿ⁻ᵏ ≈ Φ((k + ½ − np)/σ) − Φ((k − ½ − np)/σ)",
      formulaNote:
        "σ = √(np(1 − p)); Φ standart normalin birikimli dağılım fonksiyonudur. ½'ler süreklilik düzeltmesidir: k kutusu, sürekli eksende k − ½ ile k + ½ arasındaki şerittir. 12 sıralı p = 0.5 tahtada kutu başına en büyük hata 0.0021'dir.",
    },
    {
      heading: "Çan eğrisi, z puanı ve erf",
      body:
        "Normal dağılımın yoğunluğu iki sayıyla belirlenir: merkez μ ve genişlik σ. Her normal değişken tek bir kaydırma ve ölçeklemeyle standart normale, Z ~ N(0, 1)'e dönüşür; buna <strong>standartlaştırma</strong> denir. z = (x − μ)/σ, 'ortalamadan kaç standart sapma uzakta?' sorusunun cevabıdır; bu yüzden tek bir tablo bütün normal dağılımlara yeter. Olasılıklar eğrinin altındaki alanlardır ve burada şaşırtıcı bir engel çıkar: e<sup>−z²/2</sup>'nin temel fonksiyonlarla (polinomlar, üstel, logaritma, trigonometrik fonksiyonlar ve bunların bileşimleri) yazılabilen bir ilkel fonksiyonu yoktur; bunu 19. yüzyılda Joseph Liouville'in kuramı gösterir. Matematikçiler integrale ad verip onu yeni bir fonksiyon saydılar: <strong>hata fonksiyonu</strong> erf. Sayfa erf'i bir seri ve bir sürekli kesirle yaklaşık 10⁻¹⁵ bağıl hatayla hesaplar; aynı alanı Simpson ve yamuk kurallarıyla da bulur. Varsayılan N = 8 aralıkta [−1, 1] için Simpson 2.1×10⁻⁵, yamuk 2.5×10⁻³ kadar yanılır; N'yi ikiye katlamak ilk hatayı 16'ya, ikincisini 4'e böler. Akılda tutulacak üç sayı: ±1σ içinde %68.27, ±2σ içinde %95.45, ±3σ içinde %99.73.",
      formula: "z = (x − μ)/σ  ·  P(z₁ < Z < z₂) = ½[erf(z₂/√2) − erf(z₁/√2)]",
      formulaNote:
        "erf(x) = (2/√π)∫₀ˣ e<sup>−t²</sup> dt. Standart normalin yoğunluğu φ(z) = e<sup>−z²/2</sup>/√(2π); √(2π) toplam alanı 1 yapar.",
    },
    {
      heading: "Standart hata: ortalamak neden işe yarar?",
      body:
        "n bağımsız ölçümün ortalamasını alırsan ölçümlerin rastlantısal hataları birbirini kısmen götürür. Kesin hesap şöyle: bağımsız değişkenlerin varyansları toplanır; n değerin toplamının varyansı nσ², ortalamanın varyansı ise nσ²/n² = σ²/n olur. Ortalamanın standart sapmasına <strong>standart hata</strong> denir: σ/√n. Bu sonuç merkezi limit teoremine muhtaç değildir; varyansı sonlu her dağılımda ve her n'de tam olarak geçerlidir. Bedeli kareköktür: belirsizliği yarıya indirmek için dört kat, onda birine indirmek için yüz kat ölçüm gerekir. Dikkat: n büyüdükçe küçülen şey ortalamanın yayılımıdır, verinin kendi yayılımı σ değil. MLT sekmesindeki <strong>Standart hata: ortalamaların s'si</strong> kartı, binlerce örneklem ortalamasının ölçülen standart sapmasını σ/√n ile karşılaştırır.",
      formula: "Var(<span class=ov>X</span>) = Var((X₁ + … + Xₙ)/n) = nσ²/n² = σ²/n  ⇒  SE = σ/√n",
      formulaNote:
        "Bağımsızlık şarttır. Ölçümler ortak bir hata payı taşıyorsa (aynı hatalı cetvel, aynı gün, aynı hasta) birbirine pozitif bağlıdır: etkin örneklem büyüklüğü n'den küçük, gerçek belirsizlik σ/√n'den büyük olur. Herkese ortak sistematik bir sapmayı ortalama almak hiç azaltmaz.",
    },
    {
      heading: "Merkezi limit teoremi: ne söyler, ne ister, ne kadar hızlı?",
      body:
        "σ/√n ortalamanın genişliğini verir; merkezi limit teoremi biçimini. X₁, …, Xₙ aynı dağılımdan bağımsız çekilmişse ve varyans σ² sonluysa, standartlaştırılmış ortalama Zₙ'nin dağılımı n → ∞ iken standart normale yaklaşır; ana dağılım düzgün, üstel, iki tepeli ya da 0–1 olabilir. Sonlu varyans şartı süs değildir: Cauchy dağılımından çekilen n değerin ortalaması tek bir değerle aynı dağılıma sahiptir ve hiç daralmaz. Yakınsamanın hızını <strong>birikenler</strong> (kümülantlar) gösterir: momentlerden türetilen bu sayılar bağımsız toplamda tek tek toplanır; ikincisi varyans, üçüncüsü üçüncü merkezî momenttir. n değerin ortalamasının r. birikeni κᵣ/nʳ⁻¹ olduğundan ortalamanın çarpıklığı (κ₃/n²)/(κ₂/n)<sup>3/2</sup> = γ₁/√n, fazlalık basıklığı κ/n hızında söner. Üstel dağılımda γ₁ = 2 olduğu için n = 30'da bile ortalamanın çarpıklığı 0.365'tir; düzgün dağılımda n = 5'te durum satırı 'iyi bir yaklaşım' der. <strong>Berry–Esseen teoremi</strong> bu hıza her n için geçerli bir üst sınır koyar.",
      formula: "Zₙ = (X₁ + … + Xₙ − nμ)/(σ√n) → N(0, 1)  ·  sup<sub>z</sub>|P(Zₙ ≤ z) − Φ(z)| ≤ C·ρ/(σ³√n)",
      formulaNote:
        "'→' dağılımda yakınsamadır: her z için P(Zₙ ≤ z) → Φ(z). ρ = E|X − μ|³. Aynı dağılımlı toplamlarda C için bilinen en iyi üst sınır 0.4748'dir (2011); C'nin 0.4097'den küçük olamayacağı da 1956'dan beri kanıtlıdır.",
    },
    {
      heading: "Güven aralığı: %95 neyin olasılığı?",
      body:
        "μ'yü bilmiyorsun ama σ'yı biliyorsun. Örneklem ortalaması <span class=ov>x</span>, μ'nün çevresinde σ/√n genişliğinde normal dağıldığı için μ'ye 1.96·σ/√n'den yakın düşme olasılığı 0.95'tir. Bu eşitsizliği μ için çözünce aralık çıkar: <span class=ov>x</span> ± 1.96·σ/√n. Olasılık <strong>aralığı kuran yönteme</strong> aittir: her yeni örneklemle yeni bir aralık kurarsan uzun vadede bunların %95'i μ'yü kapsar. Hesaplanmış tek bir aralık μ'yü ya kapsar ya kapsamaz; rastlantısal olan μ değil, aralıktır. σ bilinmiyorsa yerine örneklemin s'si konur. s de rastlantısal olduğundan (<span class=ov>x</span> − μ)/(s/√n) oranı, veri normal dağılıyorsa n − 1 serbestlik dereceli <strong>Student t</strong> dağılımına uyar; kuyrukları normalinkinden kalındır. Kapsamayı korumak için 1.96 yerine daha büyük bir t* kullanılır: n = 10'da 2.262, n = 5'te 2.776. Sayfa bilerek 1.96'yı korur ve kapsamanın n = 5'te %87.8'e düştüğünü gösterir.",
      formula: "<span class=ov>x</span> ± z*·σ/√n  (σ biliniyor)  ·  <span class=ov>x</span> ± t*<sub>n−1</sub>·s/√n  (σ bilinmiyor)",
      formulaNote:
        "%95 için z* = Φ⁻¹(0.975) = 1.960. t*<sub>n−1</sub>, n büyüdükçe 1.960'a iner: n = 30'da 2.045.",
    },
  ],
  lab: {
    intro:
      "Üç sekme de aynı soruyu sorar: ölçtüğün sayı kuramdan kaç <strong>standart hata</strong> (SE) uzakta? Kartlar farkı SE cinsinden yazar; Galton ve MLT sekmelerinde durum satırı fark 2 SE'yi aşmıyorsa 'uyumlu' der, güven aralıklarında kararı kesin binom sınaması verir. <strong>Galton tahtası</strong>: <strong>Çivi sırası sayısı n</strong>, <strong>Her çivide sağa sapma olasılığı p</strong>, üç hazır düğme, <strong>Top bırakma hızı</strong>, <strong>+100 / +1000 / +10 000</strong> ve ilk 10, 100, 1000, 10 000, 100 000 ve 1 000 000 topun istatistiklerini kaydeden <strong>Ölçüm çizelgesi</strong>. <strong>Merkezi limit teoremi</strong>: <strong>Ana dağılım</strong> menüsü (düzgün, üstel, Bernoulli p = 0.1, zar, iki tepeli karışım), <strong>Örneklem büyüklüğü n</strong> ve n = 1, 5, 30 düğmeleri, <strong>Toplanacak örneklem sayısı M</strong>, <strong>Kalanı hemen çek</strong> ve histogramın altında bir Q–Q grafiği. <strong>Alanlar ve güven aralıkları</strong>: z₁ ve z₂ sınırları, z₁ = −∞ ve z₂ = +∞ kutuları, <strong>Sayısal integralin aralık sayısı N</strong>, hazır alanlar (±1, ±2, ±3, ±1.96, Z < 1.645) ve <strong>Yüzdelik q</strong>; altında <strong>Güven düzeyi</strong>, <strong>Örneklem büyüklüğü n</strong>, <strong>Kurulacak aralık sayısı K</strong>, <strong>σ yerine örneklemin s'sini kullan</strong> kutusu ve <strong>Kalanı hemen kur</strong>. Her sekmenin <strong>Tohum</strong> kutusu rastgele sayı üretecini başlatır; varsayılanlar hikâyedeki üç yılı anar: 1889 (Galton), 1810 (Laplace), 1937 (Neyman). Aşağıdaki sayılar bu tohumlarla çıkar: sekmenin <strong>Sıfırla</strong> düğmesi onları geri getirir, <strong>Yeni tohum</strong> ise tekrarlanamayan rastgele bir sayı seçer. <kbd>Boşluk</kbd> duraklatır, <kbd>R</kbd> sekmeyi sıfırlar; odak bir kutuda ya da düğmedeyken ikisi de çalışmaz.",
    experiments: [
      {
        title: "Bin top: binom kuramı tutuyor mu?",
        predict:
          "Varsayılan tahtada (12 sıra, p = 0.5) kuram ortalama np = 6, varyans np(1 − p) = 3 ve çarpıklık 0 der. İlk 1000 topun ölçümü kuramdan kaç standart hata uzaklaşır? Çan eğrisi bu tahtayı ne kadar iyi anlatır ve kusurunu kaç top ele verir?",
        do: "Galton tahtası sekmesinde <strong>Sıfırla</strong>'ya (12 sıra, p = 0.5, tohum 1889), sonra <strong>+1000</strong>'e bas. <strong>Ölçüm çizelgesi</strong>'nin N = 1000 satırını oku: kartlar akmaya devam eden sayımı gösterir, çizelge ise yalnız tohuma, n'ye ve p'ye bağlıdır. Sonra <strong>+10 000</strong>'e on kez basıp N = 10 000 ve N = 100 000 satırlarına bak.",
        observe:
          "N = 1000 satırı: <span class=ov>x</span> = 5.957, s² = 3.124, g₁ = 0.032; χ² p değerleri binom için 0.302, normal yaklaşım için 0.182. Normalin p'si N = 10 000'de 0.033'e, N = 100 000'de < 10⁻⁶'ya düşer; binomunki 0.882 ve 0.689'da kalır. <strong>Normal yaklaşımın en büyük hatası (kuram)</strong> kartı 0.0021 yazar (k = 4: binom 0.1208, normal 0.1188).",
        explain:
          "Bin topta ortalamanın standart hatası σ/√N = 1.732/√1000 ≈ 0.055'tir; 5.957'nin 6'dan farkı −0.79 SE, varyansınki +0.97 SE, çarpıklığınki +0.46 SE: hepsi şans payı içinde. Normal yaklaşım bu tahtada çok iyidir ama kusursuz değildir: kutu başına binde ikilik farkı 10 000 top sezdirir, 100 000 top kesinleştirir. Binom ise modelin kendisidir; onu yalnızca şans eseri, %5 düzeyinde aşağı yukarı yirmi denemede bir reddedersin.",
      },
      {
        title: "Normal yaklaşımın kırıldığı yer: p = 0.1",
        predict:
          "5 sıralı, p = 0.1 olan bir tahtada ortalama np = 0.5'tir: topların çoğu 0 numaralı kutuya düşer. Simetrik bir çan bu dağılımı anlatabilir mi? Normal eğrinin olasılığının ne kadarı imkânsız kutulara (k < 0 ya da k > 5) taşar?",
        do: "<strong>5 sıra, p = 0.1</strong> düğmesine bas; <strong>Normal yaklaşımın en büyük hatası (kuram)</strong> kartını ve durum satırını oku. <strong>+1000</strong>'e bas ve çizelgenin N = 1000 satırındaki iki χ² p değerine bak. Sonra <strong>50 sıra, p = 0.1</strong> düğmesiyle aynısını yap.",
        observe:
          "Kart 0.1585 yazar: k = 0 kutusunun binom olasılığı 0.5905, süreklilik düzeltmeli normalinki 0.4320. Durum satırı, normalin olasılığın 6.80 %'ini imkânsız değerlere verdiğini söyler; grafikte bu kısım kırmızıdır. N = 1000'de χ² p binom için 0.860, normal için < 10⁻⁶. 50 sırada np = 5 olur ve durum satırı kurala uyulduğu için uyarmayı bırakır: en büyük hata 0.0181'e, taşan pay 0.48 %'e iner. Yine de N = 1000'de χ² normali p = 0.001 ile reddeder.",
        explain:
          "Binomun çarpıklığı (1 − 2p)/√(np(1 − p))'dir: 5 sırada 1.193, 50 sırada 0.377. Sol duvara yaslanmış çarpık bir dağılımı simetrik bir çan anlatamaz. np ≥ 5 ve n(1 − p) ≥ 5 kuralı çarpıklığın 1/√5 ≈ 0.45'i aşmamasını garanti eder; bu bir eşiktir, kusursuzluk garantisi değil. Yeterince veri her yaklaşımın izini bulur.",
      },
      {
        title: "Üstel bekleme süreleri çana döner mi?",
        predict:
          "Üstel dağılım sağa çok çarpıktır (γ₁ = 2). 10 000 örneklem ortalamasının çarpıklığı n = 1, 5 ve 30'da kaç olur? Kuram 2/√n der: 2.000, 0.894, 0.365. Ortalamaların standart sapması 1/√n'yi izler mi?",
        do: "Merkezi limit teoremi sekmesinde <strong>Sıfırla</strong>'ya bas (üstel, M = 10 000, tohum 1810). <strong>n = 1</strong>'e, sonra <strong>Kalanı hemen çek</strong>'e bas; çarpıklık ve standart hata kartlarını, Q–Q grafiğini ve durum satırını oku. Aynısını <strong>n = 5</strong> ve <strong>n = 30</strong> ile yinele.",
        observe:
          "Çarpıklık 1.896, 0.937 ve 0.385; standart hata 0.990, 0.4488 ve 0.1831 (kuram 1.000, 0.4472, 0.1826). Çarpıklık ve standart hata farklarının hepsi 1.3 SE'nin altında. Q–Q grafiğinde n = 1'de noktalar solda −1'de yatay bir tabana yapışır, sağda 8'in üstüne fırlar; n = 30'da doğruya yaslanır ama iki uçta da doğrunun üstünde kalır. Durum satırı n = 30'da 'Çan eğrisi merkezde iyi, kuyruklarda hâlâ yanılır' der.",
        explain:
          "Ortalamanın çarpıklığı γ₁/√n hızında söner: n'yi 6 katına çıkarmak çarpıklığı yalnızca √6 ≈ 2.45 kat azaltır. '30 gözlem yeter' kuralı simetrik bir ana dağılım için cömert, üstel gibi çarpık biri için iyimserdir. Turkuaz kesikli eğri ortalamanın tam dağılımıdır, Gamma(n, n); mor çan onu merkezde iyi, kuyruklarda kötü taklit eder. Q–Q'daki iki uçlu yukarı kıvrım sağa çarpıklığın imzasıdır.",
      },
      {
        title: "%95 güven: neyin yüzde 95'i?",
        predict:
          "Önce alan: Z'nin −1.96 ile 1.96 arasında kalma olasılığı kaç? Sonra μ = 50 olan bir ana kütleden n = 10'luk örneklemlerle 100 tane %95'lik aralık kurarsan kaçı μ'yü kapsar; tam 95 mi?",
        do: "Alanlar ve güven aralıkları sekmesinde <strong>±1.96</strong>'ya, sonra <strong>Z < 1.645</strong>'e bas. Güven aralıkları panelindeki <strong>Sıfırla</strong>'ya (%95, n = 10, K = 100, tohum 1937) ve <strong>Kalanı hemen kur</strong>'a bas. K'yı 1000 yapıp <strong>Kalanı hemen kur</strong>'a yine bas. Son olarak K = 10 000 ve n = 5 seç, <strong>σ yerine örneklemin s'sini kullan</strong> kutusunu işaretle ve aralıkları bir kez daha kur.",
        observe:
          "Alan kartı 95.0004 % ve 95.0015 % yazar. 100 aralığın 97'si μ'yü kapsar; ıskalayan üç aralığın üçü de μ'nün sağındadır ve kesin binom sınaması p = 0.516 verir. K = 1000'de tam 950/1000. s ile n = 5'te kapsama 8760/10 000 = 87.6 %, kuramsal kapsama kartı 87.84 %.",
        explain:
          "1.96, Φ⁻¹(0.975) = 1.959964'ün yuvarlanmışıdır: iki kuyruğa %2.5'er kalır. 100 aralıkta ıskalama sayısı Binom(100, 0.05) dağılır: ortalaması 5, standart sapması 2.2; 3 ıskalama şans payı içindedir. %95 tek bir aralığın değil, yöntemin özelliğidir. s de rastlantısal olduğundan küçük n'de 1.96 fazla dar kalır; 4 serbestlik dereceli Student t'nin t* = 2.776 değeri kapsamayı tam %95'e getirir.",
      },
    ],
  },
  wow: [
    {
      title: "Bilgisayarsız benzetim: 3000 karton",
      body:
        "Gosset 1908 makalesinde, problemi analitik olarak çözmeden önce deneyle çözmeye çalıştığını anlatır: 3000 mahkûmun boy ve sol orta parmak ölçümlerini 3000 kartona yazdı, kartları iyice karıştırıp tek tek çekti ve art arda gelen dörder kartı bir örneklem sayarak 750 örneklem kurdu. Aynı deneyi sayfada bir tıkla yap: güven aralıkları panelinde <strong>Sıfırla</strong>'dan sonra n = 4 ve K = 1000 seç, s kutusunu işaretle, <strong>Kalanı hemen kur</strong>'a bas. 1.96 ile kurulan aralıkların yalnızca 844'ü μ'yü yakalar; kuramsal kapsama kartı 85.51 % yazar. Gosset'in tablosu tam bu açığı kapatmak içindi.",
    },
    {
      title: "Çan eğrisinde π'nin işi ne?",
      body:
        "e<sup>−x²/2</sup>'nin temel fonksiyonlarla yazılabilen bir ilkel fonksiyonu yoktur, ama −∞'dan +∞'a integrali tam olarak √(2π)'dir. Hile, integrali kendisiyle çarpıp düzlemde e<sup>−(x²+y²)/2</sup> olarak yazmaktır: bu fonksiyon yalnızca merkeze uzaklığa bağlıdır, kutupsal koordinatlarda integral 2π çıkar. Aynı dönme simetrisi ters yönde de işler: 1850'de John Herschel, iki boyutlu ölçüm hatalarında yatay ve düşey bileşenler bağımsızsa ve olasılık yalnızca uzaklığa bağlıysa, bileşenlerin normal dağılmak zorunda olduğunu gösterdi. 1860'ta James Clerk Maxwell aynı akıl yürütmeyle gaz moleküllerinin hız dağılımını buldu.",
    },
    {
      title: "Altı sigma aslında dört buçuk",
      body:
        "1986'da Motorola'da doğan 'Altı Sigma' kalite hedefi, milyon fırsatta 3.4 hatadır. Oysa normal dağılımda ortalamadan 6σ öteye düşme olasılığı tek yanda milyarda bir kadardır. 3.4 sayısı 4.5σ'dan gelir: yöntem, sürecin ortalamasının zamanla 1.5σ kayabileceğini varsayar ve 6 − 1.5 = 4.5 alır; bu kayma deneyime dayanan, tartışmalı bir varsayımdır. Sayfada dene: z₁ kutusuna 4.5 yaz, z₂ = +∞ kutusunu işaretle; alan kartının alt satırı 0.000003397673, yani milyonda 3.4 gösterir. Kuyruk o kadar hızlı incelir ki 1.5σ'lık bir kayma hata oranını yaklaşık 3400 kat büyütür.",
    },
  ],
  worked: {
    title: "Dolum makinesi: güven aralığı ve gereken örneklem",
    prompt:
      "Bir dolum makinesinin şişeye koyduğu hacmin standart sapması uzun süreli kayıtlardan σ = 10 mL olarak biliniyor; ortalama hacim μ ise ayar kaydıkça değişebiliyor. Rastgele seçilen n = 10 şişenin ortalaması <span class=ov>x</span> = 503.0 mL. (a) μ için %95'lik güven aralığını kur. (b) Yarı genişliği en çok 2 mL olan bir aralık için kaç şişe gerekir? (c) σ bilinmeseydi ve 10 şişenin standart sapması s = 10 mL çıksaydı aralık ne olurdu?",
    steps: [
      "Standart hata: SE = σ/√n = 10 mL/√10 = 3.162 mL. Hacimler normal dağılıyorsa <span class=ov>x</span> tam olarak, değilse merkezi limit teoremiyle yaklaşık olarak N(μ, SE²) dağılır.",
      "(a) %95 için z* = Φ⁻¹(0.975) = 1.960. Yarı genişlik h = z*·SE = 1.960 × 3.162 mL = 6.198 mL. Aralık 503.0 ± 6.2 mL, yani [496.8 mL, 509.2 mL]. Sayfanın ana kütlesinde de σ = 10'dur: %95 ve n = 10 iken <strong>Aralığın yarı genişliği</strong> kartı 6.198 yazar.",
      "(b) h = z*·σ/√n ≤ 2 mL koşulundan √n ≥ 1.960 × 10/2 = 9.80, yani n ≥ 96.04: en az 97 şişe. Sayfada n = 97 için kart 1.990 gösterir. n = 96'da 2.000 yazar, ama gerçek değer 2.0004 mL'dir ve sınırı az farkla aşar.",
      "(c) σ bilinmiyorsa z* yerine 9 serbestlik dereceli Student t'nin t* = 2.262 değeri kullanılır: h = 2.262 × 10 mL/√10 = 7.15 mL, aralık [495.8 mL, 510.2 mL]. Aynı aralığı 1.96 ile kursaydın gerçek kapsama %95 değil yaklaşık %91.8 olurdu; sayfada s kutusu işaretliyken n = 10 için kuramsal kapsama kartı 91.84 % yazar.",
    ],
    result:
      "%95'lik güven aralığı [496.8, 509.2] mL'dir: bu aralığı üreten yöntem uzun vadede 20 seferden 19'unda μ'yü yakalar. Yarı genişliği 6.2 mL'den 2 mL'ye, yani kabaca üçte birine indirmek, şişe sayısını 10'dan 97'ye, yaklaşık on katına çıkarmayı gerektirir: standart hatanın √n bedeli. σ tahmin ediliyorsa aralık t* = 2.262 ile 503.0 ± 7.2 mL'ye genişler.",
  },
  misconceptions: [
    {
      myth: "Hesapladığım %95'lik aralık μ'yü %95 olasılıkla içerir.",
      truth:
        "Bu çerçevede μ sabit bir sayıdır; hesaplanmış bir aralık onu ya içerir ya içermez. %95, yöntemin uzun vadeli başarı oranıdır: tohum 1937 ile kurulan 1000 aralığın 950'si μ'yü kapsar, ama tek bir aralığa bakarak onun kapsayanlardan mı ıskalayanlardan mı olduğunu bilemezsin. 'μ'nün bu aralıkta olma olasılığı' cümlesini kurmak için μ'ye bir önsel dağılım veren Bayesçi bir <strong>güvenilirlik aralığı</strong> gerekir.",
    },
    {
      myth: "Doğadaki her şey normal dağılır.",
      truth:
        "Normal dağılım, çok sayıda küçük ve bağımsız katkının <em>toplandığı</em> yerde ortaya çıkar. Katkılar çarpılarak birleşiyorsa (gelirler, öğütülmüş tanecik boyutları) dağılım sağa çarpıktır ve çoğu zaman logaritması normale yakındır. Bekleme süreleri üstel, nadir olayların sayıları Poisson dağılır; servet gibi büyüklüklerin kuyrukları normalin izin vermeyeceği kadar kalındır. Adı da yanıltır: 'normal' adını yaygınlaştıran Karl Pearson, 1920'de bu adın öteki dağılımları 'anormal' sandırdığından yakınmıştı. Normallik veriyle sınanacak bir varsayımdır; sayfadaki χ² sınaması tam bunu yapar.",
    },
    {
      myth: "Merkezi limit teoremi, örneklem büyüdükçe verinin normalleştiğini söyler.",
      truth:
        "Teorem verinin değil, <strong>ortalamanın</strong> dağılımından söz eder. Üstel bir dağılımdan 10 000 değer çekersen histogramları yine üsteldir; normalleşen, n'li grupların ortalamalarıdır. MLT sekmesinde n'yi büyüttükçe üstteki turkuaz ana dağılım hiç değişmez, yalnızca alttaki ortalamalar histogramı çana döner; n = 1'de iki grafik aynı dağılımı gösterir.",
    },
    {
      myth: "Örneklem büyüdükçe verinin yayılımı, yani standart sapması küçülür.",
      truth:
        "Küçülen, ortalamanın yayılımıdır: σ/√n. Verinin standart sapması σ örneklem büyüdükçe küçülmez; s yalnızca σ'nın daha iyi bir tahmini olur. Galton çizelgesinde 1000 topta s² = 3.124 (s = 1.768), 100 000 topta s² = 3.010 (s = 1.735): ikisi de σ = √3 ≈ 1.732'nin çevresinde. Aynı 100 000 topun ortalamasının standart hatası ise yalnızca 0.005'tir.",
    },
  ],
  glossary: [
    { term: "Binom dağılımı", definition: "Her biri aynı p olasılıklı n bağımsız denemede başarı sayısının dağılımı; ortalaması np, varyansı np(1 − p)." },
    { term: "Normal dağılım N(μ, σ²)", definition: "Yoğunluğu e<sup>−(x−μ)²/(2σ²)</sup>/(σ√(2π)) olan simetrik, çan biçimli sürekli dağılım; μ merkezini, σ genişliğini belirler." },
    { term: "Standartlaştırma (z puanı)", definition: "Bir değeri z = (x − μ)/σ ile ortalamadan kaç standart sapma uzakta olduğuna çevirmek; normal bir değişkeni N(0, 1)'e dönüştürür." },
    { term: "Standart hata (SE)", definition: "Bir kestiricinin, örneğin örneklem ortalamasının, örneklemden örnekleme değişen değerlerinin standart sapması; ortalama için σ/√n." },
    { term: "Merkezi limit teoremi", definition: "Bağımsız, aynı dağılımlı ve varyansı sonlu değişkenlerin standartlaştırılmış ortalamasının n büyüdükçe N(0, 1)'e yaklaştığını söyleyen teorem." },
    { term: "Güven aralığı", definition: "Örneklemden kurulan ve tekrarlanan örneklemelerde gerçek parametreyi belirtilen oranda (ör. %95) kapsayan aralık; olasılık yönteme aittir." },
    { term: "Student t dağılımı", definition: "Normal veride σ yerine s kullanıldığında (<span class=ov>x</span> − μ)/(s/√n) oranının uyduğu, kuyrukları normalden kalın dağılım; n − 1 serbestlik derecesi büyüdükçe N(0, 1)'e yaklaşır." },
    { term: "Çarpıklık (γ₁)", definition: "Dağılımın asimetrisini ölçen üçüncü standart moment, E[(X − μ)³]/σ³; uzun kuyruk sağdaysa pozitif, simetrik dağılımda sıfırdır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede çan eğrisi bir tablodur; üniversitede bir teorem ve bir araç kutusu. <strong>Olasılık</strong> dersinde merkezi limit teoremini <strong>moment üreten</strong> ve <strong>karakteristik fonksiyonlarla</strong> kanıtlarsın: bağımsız değişkenlerin toplamının karakteristik fonksiyonu tek tek fonksiyonların çarpımıdır; standartlaştırılmış toplamda logaritmanın Taylor açılımındaki ikinci dereceden terim −t²/2'ye gider, daha yüksek terimler n büyüdükçe söner ve geriye standart normalin karakteristik fonksiyonu e<sup>−t²/2</sup> kalır. Aynı derste <strong>büyük sayılar yasası</strong> örneklem ortalamasının μ'ye gittiğini söyler; merkezi limit teoremi bu yaklaşmanın √n ölçeğindeki biçimini verir. Lyapunov'un ve daha zayıf olan Lindeberg'in koşulları teoremi özdeş olmayan değişkenlere, çok değişkenli biçimi vektörlere genişletir.",
      "<strong>İstatistik</strong>'te güven aralıkları ile <strong>hipotez testleri</strong> ve <strong>p değerleri</strong> aynı madalyonun iki yüzüdür: %95'lik aralık μ₀'ı dışarıda bırakıyorsa, H₀: μ = μ₀ iki yanlı testte %5 düzeyinde reddedilir. <strong>Ekonometri</strong>'de regresyon katsayılarının standart hataları ve t istatistikleri aynı mantıkla kurulur; <strong>Deney Tasarımı</strong> ve <strong>Biyoistatistik</strong>'te 'kaç denek gerekir?' sorusu, çözümlü örnekteki n ≥ (z*σ/h)² hesabının akrabasıdır. Bayesçi çıkarım μ'ye bir önsel dağılım verir ve 'μ'nün bu aralıkta olma olasılığı %95' cümlesini kurmana izin veren güvenilirlik aralıklarını üretir. Bilgisayar çağında <strong>bootstrap</strong> yöntemi standart hatayı formülsüz, veriden yeniden örnekleyerek kestirir: Gosset'in karıştırılan kartlarının bilgisayardaki akrabası.",
    ],
    topics: [
      "Moment üreten ve karakteristik fonksiyonlar",
      "Büyük sayılar yasası",
      "Lindeberg ve Lyapunov koşulları",
      "Hipotez testleri ve p değerleri",
      "Regresyon ve Ekonometri",
      "Deney Tasarımı: örneklem büyüklüğü ve güç",
      "Bayesçi güvenilirlik aralıkları",
      "Bootstrap ve yeniden örnekleme",
    ],
  },
  quiz: [
    {
      question:
        "12 sıralı, p = 0.5 tahtada kutu numarasının standart sapması √3 ≈ 1.73'tür. Sıra sayısını 48'e çıkarırsan ne olur?",
      options: [
        "Standart sapma yarıya iner: daha çok çivi, daha çok düzen",
        "Standart sapma aynı kalır; yalnızca kutu sayısı artar",
        "Standart sapma iki katına, 3.46'ya çıkar; ama sıra sayısına oranla çan yarı yarıya daralır",
        "Standart sapma dört katına, 6.93'e çıkar",
      ],
      answer: 2,
      explanation:
        "Kutu numarası 48 bağımsız sağ-sol kararının toplamıdır: varyansı np(1 − p) = 48 × 0.25 = 12, standart sapması √12 = 3.46. n dört katına çıkınca toplamın yayılımı √4 = 2 katına çıkar, sağa sapma oranı k/n'ninki √(p(1 − p)/n) ile yarıya iner. Toplam √n ile genişler, ortalama 1/√n ile daralır: standart hatanın öbür yüzü. Varyans kartının alt satırı n = 48'de kuram σ = 3.464 yazar.",
    },
    {
      question:
        "Sayfada tohum 1937 ile kurulan 100 tane %95'lik aralıktan 97'si μ'yü kapsadı. Buna göre hangisi doğrudur?",
      options: [
        "Yöntem bozuk; %95'lik aralıkların tam 95'i kapsamalıydı",
        "Bu aralıklar aslında %97'lik aralıklardır",
        "Iskalama sayısı Binom(100, 0.05) dağılır; 3 ıskalama, beklenen 5'ten şans eseri bir sapmadır",
        "Kapsayan 97 aralığın her biri μ'yü %95 olasılıkla içerir",
      ],
      answer: 2,
      explanation:
        "Her aralık birbirinden bağımsız olarak %5 olasılıkla ıskalar; 100 aralıkta ıskalama sayısının ortalaması 5, standart sapması √(100 × 0.05 × 0.95) ≈ 2.2'dir. 3 ıskalama yalnızca 0.92 SE uzaktadır ve kesin binom sınaması p = 0.516 verir. K = 1000'de oran tam 950/1000'e oturur. Kapsayan bir aralık μ'yü kesinlikle içerir; %95 yöntemin özelliğidir.",
    },
    {
      question:
        "Üstel dağılımın çarpıklığı γ₁ = 2'dir. Örneklem ortalamasının çarpıklığı 0.2'nin altına insin istiyorsan n en az kaç olmalıdır?",
      options: ["10", "30", "101", "400"],
      answer: 2,
      explanation:
        "Ortalamanın çarpıklığı γ₁/√n'dir: 2/√n < 0.2 için √n > 10, yani n > 100. Sayfanın durum satırı tam bu eşiği kullanır ve n en çok 100 olabildiği için üstel ana dağılımda hiç 'iyi bir yaklaşım' demez: n = 100'de çarpıklık tam 0.200'dür. '30 yeter' kuralı çarpık dağılımlar için iyimserdir.",
    },
  ],
  next: [
    { href: "pascal-ucgeni.html", title: "Pascal Üçgeni", why: "Satır n kaydırıcısını 12 yap: toplam 4096, orta katsayı 924. Galton tahtasında eş olasılıklı sağ–sol adımlar için orta kutu olasılığı 924/4096'dır; binom deneyiyle karşılaştır." },
    { href: "rastgele-yuruyus.html", title: "Rastgele Yürüyüş", why: "Galton topunun yolu tek boyutlu bir rastgele yürüyüştür. Düzlemde n adım sonra uzaklığın karesinin ortalaması tam n'dir; ortalama uzaklık ise √n ile orantılı büyür ama √n'nin yaklaşık 0.89'u kadardır." },
    { href: "hipotez-testi-ve-guven-araligi.html", title: "Hipotez Testi ve Güven Aralığı: Örnekleme, p-Değeri, Hata Türleri ve Güç", why: "Çan eğrisinin en çok kullanıldığı yer: örnek ortalamasının dağılımı, güven aralığının gerçek kapsaması, p-değeri ve testin gücü tekrar tekrar ölçülür." },
    { href: "bayes-olasilik.html", title: "Bayes ve Koşullu Olasılık Laboratuvarı", why: "Güven aralığının cevaplamadığı soru: veriyi gördükten sonra bir iddiaya ne kadar inanmalıyım? Önsel, olabilirlik ve sonsalla kanıtla fikir güncellemek." },
  ],
  sources: [
    { title: "Wikipedia · Central limit theorem", url: "https://en.wikipedia.org/wiki/Central_limit_theorem", note: "Klasik, Lyapunov ve Lindeberg biçimleri, yakınsama hızı ve tarihçe: de Moivre, Laplace, Galton'un sözleri ve Pólya'nın 1920'deki adlandırması (İngilizce)." },
    { title: "Vikipedi · Normal dağılım", url: "https://tr.wikipedia.org/wiki/Normal_da%C4%9F%C4%B1l%C4%B1m", note: "Yoğunluk fonksiyonu, standartlaştırma, 68–95–99.7 kuralı ve hata fonksiyonu üzerine Türkçe bir başlangıç." },
    { title: "Wikipedia · Student's t-distribution", url: "https://en.wikipedia.org/wiki/Student%27s_t-distribution", note: "Gosset'in 1908 makalesi ve takma adı, Fisher'ın katkısı, serbestlik derecesi ve t ile kurulan güven aralıkları (İngilizce)." },
    { title: "OpenStax · Introductory Statistics 2e", url: "https://openstax.org/details/books/introductory-statistics-2e", note: "Normal dağılım, merkezi limit teoremi ve güven aralıkları bölümleri; çözümlü örnekler ve alıştırmalarla (İngilizce, açık ders kitabı)." },
  ],
  revision: "Kasım 2026",
};
