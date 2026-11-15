window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["sierpinski-fraktali-peano-egrisi-altin-oran"] = {
  slug: "sierpinski-fraktali-peano-egrisi-altin-oran",
  title: "Üç Yapım: Limite Ne Kalır?",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline: "Alanı azalan bir üçgen, limitte kareyi örten bir yol ve altın orana yaklaşan sayılar. Üç deneyde sonlu hesabı, geometrik ölçüyü ve yakınsama hatasını birbirinden ayır.",
  hook: "Bir şeklin alanı sıfıra inerken üç dış kenarı yerinde kalabilir mi? Alanı sıfır olan çizgilerden kurulan bir limit haritası bütün kareyi örtebilir mi? Bu sayfada bir resmi ne kadar sık çizdiğinden çok, hangi nesnenin hangi anlamda limite gittiği önem taşıyor.",
  bigIdea: "Tekrarlanan bir kuralı anlamak için sonlu adımda hesaplanan niceliği, limitteki nesneyi ve bu ikisini bağlayan gerekçeyi ayrı ayrı belirlemek gerekir.",
  story: [
    "Giuseppe Peano, 1890'da <em>Sur une courbe, qui remplit toute une aire plane</em> başlıklı makalesini yayımladı. Bir aralıktaki tek bir parametreden, karedeki bütün noktalara ulaşan sürekli bir harita kurdu. Buradaki eğri, kalın bir kalem izi değildir: parametre değiştikçe konum sıçramadan değişir. Bu harita bire bir değildir; bazı noktalara birden fazla parametre değeriyle ulaşılır.",
    "Sierpiński üçgeninde soru başka yöndedir: dolu bir üçgenin ortalarını tekrar tekrar çıkarınca ne kalır? Her sonlu aşamada pozitif alanlı küçük üçgenler vardır. Bütün aşamalarda kalmayı başaran noktaların kümesi ise sıfır alanlıdır; dış kenarları bile korunduğu için boş değildir. Aynı sayfada görünen Peano yapımıyla akrabalığı tekrar fikridir, alanın son davranışı değil.",
    "Üçüncü deney bir şekil yerine sayıyı dönüştürür. 1 ile başla, tersini alıp 1 ekle: 1, 2, 3/2, 5/3, 8/5… Ardışık Fibonacci sayılarının oranları ortaya çıkar. Bu kez ölçülen şey alan veya yol uzunluğu değil, her oranın φ = (1 + √5)/2 değerinden farkıdır. Görsel olarak artık değişmiyor görünen bir sonuçta bile hesaplanabilir bir hata kalabilir.",
  ],
  core: [
    {
      heading: "Aynı yapımda alan azalır, kenar toplamı artar",
      body: "Sierpiński yapımında her üçgen üç küçük üçgenle değiştirilir; her küçük kenar öncekinin yarısıdır. Bu yüzden parça sayısı 3, tek parçanın alanı 1/4 çarpanıyla değişir. Toplam alanın çarpanı 3/4 olur. Kenar toplamında ise 3 ile 1/2 çarpılır: 3/2. Karttaki Pₙ, bütün küçük üçgenlerin çevrelerinin toplamıdır; dış üçgenin değişmeyen 3a uzunluğundaki çerçevesi değildir.",
      formula: "Nₙ = 3ⁿ<br>ℓₙ = a/2ⁿ<br>Aₙ = (√3a²/4)(3/4)ⁿ<br>Pₙ = 3a(3/2)ⁿ",
      formulaNote: "Başlangıç n = 0, kenar a cm. N bir sayı; ℓ ve P cm, A cm² cinsindedir. Program alanı gerçek köşelerden ayrıca hesaplayıp bağıntıyla karşılaştırır.",
    },
    {
      heading: "Sıfır alan, boş küme değildir",
      body: "Sonlu n'de korunan dolu bölgeleri Kₙ ile gösterelim. Kₙ₊₁, Kₙ'nin içindedir; limit kümesi bütün Kₙ'lerin kesişimidir. Her Kₙ pozitif alan taşırken alanları sıfıra yaklaşır. Buna karşın üç dış kenar hiçbir aşamada çıkarılmaz. Limitteki standart Sierpiński kümesi yarı ölçekli üç kopyadan oluşur; kopyaları dengeleyen D üssü log 3/log 2'dir. Bu yapının örtüşme koşulları altında D, Hausdorff boyutunu da verir. Her tekrar deseninde yalnız kopya saymak aynı sonucu kanıtlamaz.",
      formula: "K = ⋂<sub>n≥0</sub>Kₙ<br>Aₙ/A₀ = (3/4)ⁿ → 0<br>3(1/2)ᴰ = 1 ⇒ D = log 3/log 2 ≈ 1,584963",
      formulaNote: "Burada boyut, küçülen ölçeklerde bir kümeyi örtmek için gereken ayrıntıyla ilgilidir. Sonlu dolu bölgelerin boyutu 2, yalnız sonlu kenar çizgilerinin boyutu 1, ideal Sierpiński kümesininki D'dir.",
    },
    {
      heading: "Hücreleri gezmek ile kareyi örtmek",
      body: "Peano sekmesi kareyi her yönde q = 3ⁿ hücreye ayırır ve N = q² merkezin her birine bir kez uğrar. Komşu merkezler arasındaki uzaklık 1/q; merkez sayısı N olsa da aradaki parça sayısı N−1'dir. Her sonlu yolun alanı 0'dır. Standart limit yapımında iç içe karelerin çapları sıfıra iner; alt yolların uyumu sürekli bir harita, her kare adresine erişim de örtenlik sağlar. Yalnız uzunluğun büyümesi bu iki özelliğin kanıtı değildir.",
      formula: "N = 9ⁿ<br>Lₙ = (N−1)/q = 3ⁿ−3⁻ⁿ<br>Hücre örtüsü = (k+1)/N",
      formulaNote: "Birim karede uzunluklar boyutsuzdur. k, 0'dan başlayan seçili sıradır; başlangıç hücresi de sayılır. Hücre örtüsü, ziyaret edilmiş hücrelerin alan oranıdır; çizginin alanı değildir. Sürekli limitin görüntüsü bütün karedir.",
    },
    {
      heading: "Sabit nokta, neden yaklaşıldığını tek başına söylemez",
      body: "Bir <strong>sabit nokta</strong>, kurala konunca değişmeyen değerdir. r = 1 + 1/r denkleminin pozitif çözümü φ'dir. Ancak bu denklemi çözmek, her başlangıcın ona yaklaşacağını henüz kanıtlamaz. eₙ = rₙ−φ yazıp iki yinelemeyi çıkarınca tam hata bağıntısı elde edilir. r₀ > 0 için r₁ > 1 ve sonraki bütün oranlar da 1'den büyüktür. Bu nedenle n ≥ 1'den sonra mutlak hata en çok 1/φ çarpanıyla küçülür; sıfır değilse işaret değiştirir. İlk adım bu güvencenin dışında kalır.",
      formula: "rₙ₊₁ = 1 + 1/rₙ<br>φ = (1+√5)/2<br>eₙ₊₁ = 1/rₙ − 1/φ = −eₙ/(φrₙ)<br>|eₙ₊₁| ≤ |eₙ|/φ, n ≥ 1",
      formulaNote: "Bütün oranlar ve hatalar boyutsuzdur. r₀ = φ ise hata hep sıfırdır. r₀ = 1 için F₁ = F₂ = 1 tanımıyla rₙ = Fₙ₊₂/Fₙ₊₁; başka başlangıçlara otomatik olarak Fibonacci oranı denmez.",
    },
    {
      heading: "Hata ile denklem kalanı ayrı ölçülerdir",
      body: "Yaklaşım hatası e = r−φ, sayının hedef kökten uzaklığını ölçer. <strong>Denklem kalanı</strong> R = r²−r−1 ise sayıyı kök denklemine koyunca ne kaldığını ölçer. Çarpanlara ayırma bunları bağlar: R = e(r+φ−1). φ yakınında ikinci çarpan yaklaşık √5'tir; dolayısıyla küçük kalan ile küçük hata burada aynı sayı değildir. Ardışık mutlak hataların oranı da 1/(φrₙ)'dir ve rₙ → φ iken 1/φ²'ye yaklaşır.",
      formula: "R = r²−r−1 = (r−φ)(r+φ−1)<br>e = R/(r+φ−1)<br>|eₙ₊₁/eₙ| → 1/φ² ≈ 0,381966",
      formulaNote: "Son oran, sıfır olmayan hata için tanımlıdır. Grafik log₁₀|eₙ| çizer: bir birim aşağı inmek mutlak hatanın on kat küçülmesidir. Çift duyarlıklı sayısal farklar sonsuz basamaklı kesin hesap değildir.",
    },
  ],
  lab: {
    intro: "Üç sekmenin ayarları ve sıfırlama düğmeleri bağımsızdır. İlkinde köşe hesabını alan bağıntısıyla, ikincide gerçek yol uzunluğunu hücre sayımıyla, üçüncüde sayısal hatayı tam hata bağıntısıyla karşılaştır. Peano'da hücre seçmek için dokunabilir veya İncelenen hücre sırası k kaydırıcısını kullanabilirsin; bütün sonuçlar kartlarda ve tablolarda da bulunur.",
    experiments: [
      {
        title: "Alanı çıkar; ölçeklemeyi ayrı dene",
        predict: "Her adımda toplam alanın dörtte biri çıkarsa bütün kenarların uzunluğu da azalır mı? n sabitken başlangıç kenarını ikiye katlamak aynı işlem midir?",
        do: "Sierpiński üçgeni sekmesinde Üçgeni sıfırla'ya bas. Başlangıç kenarı a = 8 cm kalsın; Yapım adımı n'yi 0'a getirip Bir adım ileri ile 1, 2 ve 3'e çık. n = 3'te a'yı 16 cm yap. Küçük üçgenlerin kenarlarını göster seçeneğini açıp kapatarak çizgi kalınlığının hesaplanan alanı değiştirmediğini kontrol et.",
        observe: "n = 0 → 1 → 2 → 3 için parça sayısı 1 → 3 → 9 → 27; alan 27,7128 → 20,7846 → 15,5885 → 11,6913 cm²; kenar toplamı 24 → 36 → 54 → 81 cm olur. İki alan hesabı gösterilen basamaklarda eşleşir. n = 3'te a = 16 cm seçince parça sayısı yine 27, alan 46,7654 cm², kenar toplamı 162 cm'dir.",
        explain: "Yapım adımını artırmak alanı 3/4, kenar toplamını 3/2 ile çarpar. a'yı ikiye katlamak ise alanı dört, bütün uzunlukları iki katına çıkarır; yeni parça üretmez. Ekrana otomatik sığdırma yüzünden görüntünün boyu aynı kalabilir. Dış çerçevenin çevresi a = 8 cm'de her n için 24 cm'dir.",
      },
      {
        title: "Yüzde yüz hücre örtüsü, sıfır çizgi alanı",
        predict: "Bütün hücre merkezlerine bir kez uğramak, hücrelerdeki bütün noktalardan geçmek anlamına gelir mi? 81 merkez arasında kaç doğru parçası gerekir?",
        do: "Peano'nun 3×3 yapımı sekmesinde Yolu sıfırla'ya bas. n = 2, k = 40 değerlerini oku; Son hücreye git'e bas. Sonra Özyineleme düzeyi n'yi 1 yap, k'yi 0'a getir ve Sonraki hücre düğmesiyle 8'e kadar ilerle. İnce hücre ızgarasını göster seçeneğiyle hücreleri ve yolu ayrı incele.",
        observe: "n = 2, k = 40'ta merkez (0,5;0,5), hücre örtüsü 41/81 ≈ %50,617'dir. k = 80'de örtü %100, son merkez (0,944444;0,944444) olur. Tam yol 80 parçadır; uzunluk 8,888889, komşu olmayan ardışık çift sayısı 0'dır. n = 1'de 9 merkez, 8 parça ve 2,666667 uzunluk bulunur; her geçiş 1/3 birimdir.",
        explain: "Tam yol kartı, turuncu kısmın değil bütün yolun uzunluğunu gösterir. %100, 81 hücrenin hepsinin ziyaret edildiğini söyler; sonlu 80 parçalık çizginin alanı hâlâ 0'dır. Kareyi örten nesne, tek bir sonlu merkez yolu değil, uyumlu yapımın sürekli limit haritasının görüntüsüdür.",
      },
      {
        title: "Hedefe ilk hangi oran ulaşır?",
        predict: "r₀ = 1 ile başlayan dizide hedef hata 0,000001 olunca ekrandaki ilk uygun n kaç olur? Oran φ'nin hep aynı tarafında mı kalır?",
        do: "Altın orana yaklaş sekmesinde Oranı sıfırla'ya bas. n = 6 kartlarını oku. Mutlak hata hedefi menüsünü sırayla 0,01, 0,0001 ve 0,000001 yap; her seferinde İlk uygun adıma git'e bas. Son hedefte n'yi bir azaltıp 14. adımı karşılaştır.",
        observe: "Başlangıçtaki r₆ = 21/13 ≈ 1,615384615385; hata yaklaşık −0,00264937, son iki mutlak hatanın oranı 0,380328608'dir. Üç hedefin ilk uygun adımları 5, 10 ve 15'tir. n = 15'te r₁₅ = 1597/987, hata yaklaşık +4,59072×10⁻⁷; n = 14'te hata yaklaşık −1,20186×10⁻⁶ olduğundan son hedef sağlanmaz.",
        explain: "Tam hata bağıntısındaki eksi işareti, φ'nin iki yanına geçişi açıklar. Azalan mutlak hata, işaretli hatanın tek yönde ilerlemesi demek değildir. Logaritmik hata grafiğinde negatif düşey değer görmek de negatif işaretli hata demek değildir: çizilen sayı log₁₀|eₙ|'dir.",
      },
      {
        title: "Yakınsayan bir dizinin ilk hatası büyüyebilir",
        predict: "r₀ = 0,2 seçildiğinde ilk yineleme φ'ye yaklaştırır mı? Fibonacci başlangıcını değiştirmek hedef değeri mi, yaklaşımın yolunu mu değiştirir?",
        do: "Oranı sıfırla'ya bas; Başlangıç oranı r₀'ı 0,2 yap. İncelenen adım n'yi 0, 1, 2, 3 olarak değiştir. Ardından hedef 0,0001 iken İlk uygun adıma git'e bas. Son olarak Fibonacci başlangıcı düğmesini dene.",
        observe: "Oranlar 0,2 → 6 → 1,166666666667 → 1,857142857143 olur. İlk mutlak hata yaklaşık 1,41803'ten 4,38197'ye çıkar; ilk hata oranı 3,090169944'tür. Sonraki hatalar küçülür ve 0,0001 hedefi ilk n = 11'de sağlanır. Fibonacci oranı etiketi bu başlangıçta gösterilmez. Fibonacci başlangıcı, r₀ = 1 ve n = 6'ya döner; seçili toleransı korur.",
        explain: "Hata küçülmesini güvenceye alan rₙ > 1 koşulu n ≥ 1 için geçerlidir; r₀ = 0,2 bunu sağlamaz. Bu yüzden birinci sıçrama büyüktür, ardından kanıtın koşulları sağlanır. Pozitif başlangıçlar aynı φ'ye yakınsar; izledikleri sonlu oranlar ve bir hedefe ulaşma adımları aynı olmak zorunda değildir.",
      },
    ],
  },
  wow: [
    {
      title: "Alan sıfıra iner, dış kenarlar durur",
      body: "a = 8 cm için Sierpiński yapımının dış çerçevesi her aşamada 24 cm'dir. Sekizinci adımda 6.561 dolu üçgenin toplam alanı yaklaşık 2,7744 cm², bütün küçük kenarlarının toplamı 615,09375 cm olur. Limitte alan 0'a iner; üç dış kenar korunur. Sıfır alan, hiç nokta kalmaması değildir.",
    },
    {
      title: "6.561 hücre, yine de sıfır alanlı çizgi",
      body: "Peano'nun n = 4 yaklaşımı 81×81 = 6.561 hücreyi ziyaret eder. Merkezleri birleştiren 6.560 parçanın toplam uzunluğu 6.560/81 ≈ 80,987654 birimdir. Çizgi çok yoğun görünse ve bütün hücrelere uğrasa bile sonlu doğru parçalarının alanı 0'dır; kare alanı 1 olan nesne limit görüntüsüdür.",
    },
    {
      title: "Yaklaşık her beş adımda iki basamak",
      body: "Altın oran yinelemesinde hata küçülme çarpanı limitte 1/φ² ≈ 0,381966'dır. Beş adımlık çarpan yaklaşık 0,00813, yani hata yaklaşık 123 kat küçülür. r₀ = 1 deneyinde 0,01 → 0,0001 → 0,000001 hedeflerinin 5 → 10 → 15 adımlarında sağlanması bunun somut izidir; bu düzen her başlangıç için aynı ilk adımları zorunlu kılmaz.",
    },
  ],
  worked: {
    title: "Kalan küçükse oran ne kadar doğru?",
    prompt: "r₀ = 1 ile başlayan altın oran yinelemesinin altıncı adımında r₆ = 21/13 olsun. Denklem kalanı R₆ ile gerçek yaklaşım hatası e₆'yı ayır. Ardından 0,0001 mutlak hata hedefini ilk sağlayan adımı, hesap ve sayfanın tablosuyla doğrula. Bütün nicelikler boyutsuzdur.",
    steps: [
      "Kök denklemi g(r) = r²−r−1'dir. r₆ = 21/13 için R₆ = 441/169 − 273/169 − 169/169 = −1/169 ≈ −0,00591715976. Bu, r₆−φ değildir.",
      "φ²−φ−1 = 0 olduğundan g(r₆)−g(φ) = (r₆−φ)(r₆+φ−1). Buradan e₆ = R₆/(r₆+φ−1) çıkar. Payda yaklaşık 2,233418604 olduğundan e₆ ≈ −0,00264937337. Sayfadaki hata ve kalan kartları bu iki ayrı değeri verir.",
      "Daha sonraki oranları aynı yinelemeyle üret: r₉ = 89/55, r₁₀ = 144/89. Onuncu adımın kalanı R₁₀ = (144²−144·89−89²)/89² = −1/7921'dir. r₁₀ > 1 olduğundan r₁₀+φ−1 > φ; dolayısıyla |e₁₀| < 1/(7921φ) ≈ 0,000078025 < 0,0001. Bu üst sınır hedefi sağlamaya yeter.",
      "En küçük adımı bulmak için önceki adımı da denetle: e₉ = 89/55−φ ≈ +0,00014782943 hedefi aşar. n ≥ 1 sonrasında mutlak hata sıkı azaldığından daha erken bir adım da yetmez; n = 0 hatası da yaklaşık 0,618'dir.",
      "Oranı sıfırla ile r₀ = 1'e dön; hedef 0,0001 iken İlk uygun adıma git'e bas. n = 10 çıkar. Gösterilen oran 1,617977528090 ve işaretli hata yaklaşık −0,00005646066'dır. Gerçek hata üst sınırdan küçüktür; üst sınırın hataya eşit olması gerekmez.",
    ],
    result: "Altıncı adımda kalan yaklaşık −0,00591716, yaklaşım hatası yaklaşık −0,00264937'dir. Mutlak hata 0,0001 hedefini ilk n = 10 sağlar; bir denklemi neredeyse sağlamak ile köke ne kadar yakın olmak ayrı hesaplarla değerlendirilir.",
  },
  misconceptions: [
    { myth: "Sierpiński üçgeninin alanı sıfırsa sonunda üçgen de yok olur.", truth: "Her sonlu dolu yaklaşımın alanı pozitiftir. Limitte alan sıfır olsa da küme boştur denemez; üç dış kenarın bütün noktaları korunur. Dış çevreyle bütün küçük üçgenlerin kenar toplamı da aynı nicelik değildir." },
    { myth: "Peano'da hücre örtüsü %100 olduysa çizgi kareyi doldurdu.", truth: "Bu yüzde, uğranan merkezlerin hücrelerini sayar. Sonlu yol o hücrelerin bütün noktalarından geçmez ve alanı 0'dır. Kareyi örten, yapımın sürekli limit haritasıdır; kalın çizilmiş pikseller bunu tek başına kanıtlamaz." },
    { myth: "Üç yapım da aynı tür fraktaldır; ekrandaki boyut her aşamada değişmez.", truth: "Sierpiński'nin sonlu dolu bölgeleri boyut 2, ideal kümesi yaklaşık 1,585'tir. Peano'nun sonlu merkez yolu boyut 1, limit görüntüsü olan kare boyut 2'dir. Altın oran sekmesi ise bir sayı dizisinin yakınsamasını inceler; bir fraktal boyut ölçümü yapmaz." },
    { myth: "Altın orana yakınsayan her başlangıçta hata hemen küçülür ve görünen sayı sonunda tam φ olur.", truth: "r₀ = 0,2 için ilk hata büyür; küçülme güvencesi birinci adımdan sonra başlar. Sonlu rasyonel başlangıç ve sonlu sayıda bu işlem rasyonel değer üretir; irrasyonel φ'ye tam eşit olmaz. Ekrandaki basamakların aynı görünmesi veya kayan nokta farkının kaybolması kesin eşitlik kanıtı değildir." },
  ],
  glossary: [
    { term: "İterasyon", definition: "Bir yapım veya hesap kuralının yeniden uygulanması; n adım sayısıdır, fiziksel zaman değildir." },
    { term: "İç içe kümeler", definition: "Her sonraki kümenin öncekinin altkümesi olduğu dizi; Sierpiński limiti bütün bu kümelerin kesişimidir." },
    { term: "Hausdorff boyutu", definition: "Bir kümenin küçük çaplı örtülerinde çapların s kuvvetleri toplamının davranışını ayıran kritik s değeri; alan veya piksel sayısıyla aynı nicelik değildir." },
    { term: "Sürekli harita", definition: "Her noktada girdiyi yeterince az değiştirince çıktıyı istenen ölçüde az değiştiren fonksiyon." },
    { term: "Örten harita", definition: "Hedef kümenin her noktası için en az bir girdi bulunan fonksiyon; farklı girdilerin aynı noktaya gitmesine izin verir." },
    { term: "Sabit nokta", definition: "f kuralı altında değişmeyen r değeri; f(r) = r eşitliğini sağlar." },
    { term: "Mutlak hata", definition: "Bir yaklaşım ile hedef değer arasındaki farkın büyüklüğü; burada |rₙ−φ|." },
    { term: "Denklem kalanı", definition: "Yaklaşık çözüm denklemde yerine konduğunda kalan değer; burada rₙ²−rₙ−1." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "<strong>Kalkülüs II</strong>'de diziler ve geometrik oranlar, alanın neden sıfıra indiğini ve hatanın nasıl küçüldüğünü anlatır. <strong>Gerçel Analiz</strong> ve <strong>Ölçü Kuramı</strong>'nda nesne açıkça belirtilir: iç içe sonlu alanlı kümelerde alanın yukarıdan sürekliliği, Sierpiński limitinin sıfır alanını gerekçelendirir. Buna karşılık sonlu Peano çizgilerinin her biri sıfır alanlı olsa da limit görüntüsü kare olabilir; burada iç içe azalan dolu bölgeler teoremini uygulayamayız. <strong>Topoloji</strong>, süreklilik, örtenlik ve bire birlik arasındaki farkı kesinleştirir.",
      "<strong>Sayısal Analiz</strong>'de sabit nokta yinelemesi için yalnız f(φ) = φ yetmez; hata yayılımı da incelenir. f(r) = 1 + 1/r için f′(φ) = −1/φ², yerel işaret değişimini ve yaklaşım hızını açıklar; bu sayfadaki tam hata bağıntısı ise pozitif başlangıçlara daha geniş bir güvence verir. <strong>Lineer Cebir</strong>'de Fibonacci sayıları [[1,1],[1,0]] matrisinin kuvvetleriyle üretilir. Özdeğerler φ ve −1/φ'dir; baskın özdeğer ardışık terim oranlarının limitini, özdeğer oranı −1/φ² ise hata davranışını anlamaya yardım eder.",
    ],
    topics: ["Dizi ve küme limitleri", "Alan ölçüsü", "Hausdorff boyutu", "Süreklilik ve örtenlik", "Sabit nokta yinelemesi", "Kalan ve hata sınırı", "Özdeğerler"],
  },
  quiz: [
    {
      question: "Sierpiński yapımında n = 3 sabitken a, 8 cm'den 16 cm'ye çıkarılıyor. Hangi sonuç doğrudur?",
      options: ["Üçgen sayısı 54, alan iki katıdır.", "Üçgen sayısı 27, alan dört katı, kenar toplamı iki katıdır.", "Boyut iki katına çıkar, alan değişmez.", "Alan sıfır olur; çünkü limitin alanı sıfırdır."],
      answer: 1,
      explanation: "N₃ = 27 yalnız n'ye bağlıdır. Alan a², uzunluk a ile ölçeklenir: 11,6913 cm² yaklaşık 46,7654 cm²'ye; 81 cm, 162 cm'ye çıkar. n = 3 sonlu olduğundan alan sıfır değildir.",
    },
    {
      question: "Peano'nun n = 2 yolunda k = 80 seçildiğinde hücre örtüsü %100'dür. Buradan hangi sonuç çıkar?",
      options: ["80 doğru parçasının alanı 1'dir.", "Yol artık her kare noktasından geçer.", "81 hücrenin merkezine uğranmıştır; sonlu çizginin alanı yine 0'dır.", "Hücre merkezleri arasında 81 doğru parçası vardır."],
      answer: 2,
      explanation: "0'dan 80'e kadar 81 merkez, aralarında 80 parça vardır. Hücreleri ziyaret etmek hücrelerin bütün noktalarını çizmek değildir. Bütün kareyi örtme sonucu tek bir sonlu çizime değil sürekli limit haritasına aittir.",
    },
    {
      question: "r₀ = 0,2 için ilk hata büyüyor. Buna rağmen rₙ → φ sonucu neden geçerli?",
      options: ["Her yinelemede hata mutlaka yarıya indiği için.", "İlk hata büyüdüğünde bilgisayar daha yüksek duyarlığa geçtiği için.", "r₁ = 6'dan sonra bütün rₙ > 1 ve |eₙ₊₁| ≤ |eₙ|/φ olduğu için.", "Denklem kalanı ile yaklaşım hatası aynı sayı olduğu için."],
      answer: 2,
      explanation: "Pozitif başlangıç r₁ > 1 verir; bu bölge sonraki adımlarda korunur. 1/φ < 1 olduğundan hatalar n ≥ 1 sonrasında geometrik bir üst sınırla sıfıra gider. İlk adımın büyümesi, bu kanıtın koşullarıyla çelişmez.",
    },
  ],
  next: [
    { href: "hilbert-egrisi.html", title: "Hilbert Eğrisi", why: "Peano'nun 3×3 yapımını, farklı bir 2×2 uzay dolduran yol ve onun hücre sıralamasıyla karşılaştır." },
    { href: "koch-kar-tanesi.html", title: "Koch Kar Tanesi", why: "Alan ve uzunluğun farklı limitlerini, bu kez alan eklenen bir yapımda incele." },
    { href: "barnsley-egreltiotu.html", title: "Barnsley Eğreltiotu", why: "Deterministik geometrik yapımdan tohumlu nokta örneklemesine geç; çekici küme ile ziyaret dağılımını ayır." },
  ],
  sources: [
    { title: "Robert L. Devaney · The Sierpinski Triangle", url: "https://math.bu.edu/DYSYS/chaos-game/node2.html", note: "Boston University ders içeriği: orta üçgenleri çıkarma yapımı, 3ⁿ parça ve 2⁻ⁿ uzunluk ölçeği." },
    { title: "MacTutor · Sierpiński's Triangle or Gasket", url: "https://mathshistory.st-andrews.ac.uk/Extras/Sierpinski_triangle/", note: "St Andrews Üniversitesi: aşamalar, sıfıra yaklaşan alan ve limitin log 3/log 2 Hausdorff boyutu." },
    { title: "Giuseppe Peano · Sur une courbe, qui remplit toute une aire plane", url: "https://webhomes.maths.ed.ac.uk/~v1ranick/papers/peano.pdf", note: "1890 tarihli özgün makale, Mathematische Annalen 36, s.157–160; Edinburgh Üniversitesi arşiv kopyası. Sürekli alan dolduran haritanın üçlü basamak yapımı." },
    { title: "MIT 18.06 · Fibonacci", url: "https://www.mit.edu/~18.06/Spring17/Fibonacci.pdf", note: "2017 ders notları: Fibonacci yinelemesinin 2×2 matrisle gösterimi, özdeğerler ve ardışık terim oranlarının altın orana yakınsaması. Bu sayfanın indisleri F₁ = F₂ = 1 ile ayrıca tanımlıdır." },
  ],
  revision: "Kasım 2026",
};
