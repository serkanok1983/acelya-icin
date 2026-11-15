window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["fibo"] = {
  slug: "fibo",
  title: "Fibonacci: Bir Resimden Üç Ayrı Matematik",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline: "Yedi karenin alanını tek çarpımla bul; kirişlerle yay uzunluğunu ölç, teğeti kesintisiz bir eğrinin eğriliğinin neden sıçrayabildiğini keşfet.",
  hook: "Kenarı 1, 1, 2, 3, 5, 8 ve 13 cm olan yedi kareyi boşluk bırakmadan diz: 13 × 21 cm bir dikdörtgen çıkar. İçlerine çeyrek çemberler çizince tanıdık bir spiral belirir. Alan eşitliği tamdır; peki çizdiğin eğri de tam bir altın spiral midir?",
  bigIdea: "Aynı Fibonacci resmi kesin bir alan özdeşliğini, yaklaşık bir uzunluk hesabını ve birbirinden farklı iki eğri modelini taşıyabilir; hangi sonucu ölçtüğümüzü ayırmak matematiğin parçasıdır.",
  story: [
    "Pisa'lı Leonardo'nun 1202 tarihli <em>Liber abaci</em> kitabı, tüccarların hesaplarından sayı problemlerine uzanıyordu. Bugün Fibonacci adıyla anılan diziyi ünlü yapan sorusu, her çiftin belirli bir olgunlaşma süresinden sonra yeni bir çift ürettiği ideal bir tavşan hesabıydı. Bu bir biyolojik gözlem yasası değildi; varsayımları belirlenmiş bir sayma problemiydi. Burada aynı yinelemeyi başka bir nesneye, karelerin kenarlarına uyguluyoruz: F₀ = 0, F₁ = 1 ve sonraki her terim önceki ikisinin toplamı.",
    "Karelerle oynamak, cebir başlamadan bir gerekçe görmeyi sağlar. Justin Cheigh, Steven J. Miller ve çalışma arkadaşlarının <em>An Invitation to Fibonacci Digits</em> yazısında anlattıkları sınıf etkinliği de bu kapıdan girer: yan yana gelen iki 1 × 1 kareye, oluşan dikdörtgenin uzun kenarına uyan bir kare eklenir; 2, 3, 5, 8… kendiliğinden ortaya çıkar. Aynı bölgenin alanını hem parçalardan hem dış sınırdan hesaplamak bir özdeşlik verir. Üniversiteye uzanan adım, çizimi tekrar etmekle yetinmeyip her n için çalışan cebirsel gerekçeyi yazmaktır.",
    "Yayları ekleyince yeni bir soru doğar. Alan özdeşliğinin doğruluğu, çeyrek çemberlerin bir logaritmik spiral olmasını gerektirmez. Bir çizgi gözümüze pürüzsüz görünebilir; teğeti aynı yönde sürerken ne kadar hızlı döndüğü değişebilir. Bu küçük ayrım, dizilerden kalkülüse geçişin somut bir örneğidir: sayıları saymak, uzunluğu toplamak ve eğriliği türevle ölçmek farklı işlerdir."
  ],
  core: [
    {
      heading: "Sayı ile uzunluğu birbirine karıştırma",
      body: "Fibonacci sayısı Fᵢ bir tam sayıdır; kendi başına santimetre taşımaz. Sayfada <strong>birim uzunluk</strong> s seçince i. karenin kenarı sFᵢ cm olur. Kare sayısı n, döşemeye kaç parça koyduğunu; s ise bütün yapıyı hangi ölçekte yaptığını belirler. n = 7 için boyutlar 13s ile 21s'dir. n'yi 8 yapmak 21s kenarlı yeni bir kare ekler; s'yi iki katına çıkarmak mevcut yedi karenin her birini büyütür. Görüntü ekrana yeniden sığdırıldığı için bu farkı piksel boyundan değil cm kartlarından okumalısın.",
      formula: "Kenar = sFᵢ; alan = s²Fᵢ²; dış çevre = 2s(Fₙ + Fₙ₊₁)",
      formulaNote: "s uzunluk birimi taşır; alan cm², çevre cm cinsindedir. Dış çevre, kare çevrelerinin ayrı ayrı toplamı değildir."
    },
    {
      heading: "Alan özdeşliğinin iki kanıtı",
      body: "Birinci yol geometriktir: kare içleri örtüşmeden Fₙ × Fₙ₊₁ dikdörtgenini doldurur. İkinci yol <strong>teleskopik toplam</strong>dır: Fᵢ₊₁ − Fᵢ₋₁ = Fᵢ eşitliğini Fᵢ ile çarp. Fᵢ² = FᵢFᵢ₊₁ − Fᵢ₋₁Fᵢ çıkar. i = 1'den n'ye topladığında bir satırdaki pozitif çarpım sonraki satırın negatif çarpımıyla gider; yalnız son çarpım ve F₀F₁ kalır. n = 0 için boş toplamı 0 kabul etmek de aynı özdeşlikle uyumludur. Bilgisayarın 500 örnekte eşitlik bulması bu genel cebirsel kanıtın yerini tutmaz.",
      formula: "∑ᵢ₌₁ⁿ Fᵢ² = FₙFₙ₊₁ − F₀F₁ = FₙFₙ₊₁",
      formulaNote: "Boyutsuz özdeşlik. Fiziksel döşemenin alanını bulmak için iki tarafı s² ile çarp. n = 1 tek kare, n = 0 boş toplamdır."
    },
    {
      heading: "Kiriş sayısı artınca ne yakınsar?",
      body: "Yarıçapı R olan çeyrek çemberin yay uzunluğu L = πR/2'dir. Yayı m eşit açısal parçaya bölüp komşu noktaları doğrularla birleştirirsen her kiriş 2R sin[π/(4m)] uzunluğundadır. Kirişler eğriyi içten kestikleri için toplamları L'den küçüktür. Sayfa bu toplamı gerçekten nokta koordinatlarının Öklid uzaklıklarından hesaplar, ayrıca kapalı formülle karşılaştırır. m iki katına çıkınca gerçek yay değişmez; onu temsil eden kırık çizgi iyileşir. Sinüsün Taylor açılımı, büyük m için bağıl eksikliğin yaklaşık m⁻² ile azaldığını verir.",
      formula: "Lₘ = 2mR sin[π/(4m)]; (L − Lₘ)/L ≈ π²/(96m²)",
      formulaNote: "L ve Lₘ uzunluk, bağıl eksiklik boyutsuzdur; yüzde için 100 ile çarp. Yaklaşık eşitlik büyük m içindir, sonlu m'nin tam hata formülü 1 − sin u/u, u = π/(4m)'dir."
    },
    {
      heading: "Teğet yönü aynı; dönüş hızı farklı",
      body: "<strong>Teğet</strong> eğrinin yerel yönünü gösterir. <strong>Eğrilik</strong> κ ise birim yol boyunca bu yönün ne kadar değiştiğini ölçer. Çemberde bir turda yön 2π radyan değişir ve 2πR yol alınır: κ = 1/R. Fibonacci döşemesinin komşu çeyrek yayları aynı noktada aynı teğet yönüyle birleşir. Fakat R = 5 cm'den R = 8 cm'ye geçince eğrilik 0,2 cm⁻¹'den 0,125 cm⁻¹'e sıçrar. Birleşimde bu iki tek yanlı değer farklı olduğundan tek bir eğrilik değeri yoktur; yalnız teğetin sürekliliği bunu çözmez.",
      formula: "κ = ‖dT/dℓ‖; çemberde κ = 1/R",
      formulaNote: "T birim teğet vektörü, ℓ eğri boyunca yay uzunluğudur. κ'nin birimi uzunluğun tersidir. İlk iki yarıçap 1 ve 1 olduğundan o birleşimde eğrilik sıçramaz."
    },
    {
      heading: "Altın spiral başka bir eğridir",
      body: "<strong>Logaritmik spiral</strong> r(θ) = r₀eᵇᶿ biçiminde tanımlanır. Altın spiral için her çeyrek turda yarıçapın φ = (1 + √5)/2 katına çıkması istenir; e<sup>bπ/2</sup> = φ koşulu b = 2 ln φ/π verir. x = r cos θ ve y = r sin θ türevlerinden eğrilik κ = 1/[r√(1+b²)] bulunur: çember yaylarındaki basamaklar yerine sürekli değişir. Sayfa karşılaştırmanın başlangıç eğriliğini eşitlemek için r₀ = R/√(1+b²) seçer. Böylece κ(0) = 1/R, κ(π/2) = 1/(Rφ). Bu bir başlangıç eğriliği eşlemesidir; iki eğrinin konumları veya en iyi geometrik uyumları eşleştirilmez.",
      formula: "b = 2 ln φ/π; κ(θ) = (1/R)e<sup>−bθ</sup> [bu karşılaştırmada]",
      formulaNote: "θ radyan, b boyutsuz, r₀ ve R uzunluktur. Her grafikte kendi açısal parametresi kullanılır. Çeyrek çember dizisi tam logaritmik spiral değildir."
    }
  ],
  lab: {
    intro: "Üç sekme bağımsızdır. <strong>Kareleri döşe</strong> 1–12 kareyi, seçtiğin s cm ölçeğinde çizer. <strong>Kesin alan hesabı</strong> n = 0–500 için tam sayılarla çalışır; yüzlerce kare çizmez. <strong>Yay ve eğrilik</strong> kendi s = 1 cm ölçeğini kullanır: kare indisi i ve kiriş sayısı m değişir. Her sekmenin ayrı sıfırlama düğmesi vardır. Ondalık uzunluklar yuvarlanır; kesin toplamın tüm tam sayı basamakları korunur.",
    experiments: [
      {
        title: "Büyütmek mi, bir kare eklemek mi?",
        predict: "Yedi kareyi iki kat büyütünce alan iki kat mı olur? Sekizinci kareyi eklemek aynı sonucu verir mi?",
        do: "<strong>Kareleri döşe</strong> sekmesinde <strong>Döşemeyi sıfırla</strong>: n = 7, s = 1 cm. <strong>Birim uzunluk s</strong>'yi 2 cm yap. Sonra yeniden sıfırla ve <strong>Bir kare ekle</strong>'ye bas. En son <strong>Çeyrek çember yaylarını göster</strong> işaretini kaldır.",
        observe: "İlk durumda 13 × 21 cm, 273 cm² alan, 68 cm dış çevre ve 51,8363 cm yay toplamı var. s = 2 cm olunca 26 × 42 cm, 1092 cm², 136 cm ve 103,6726 cm görürsün. Oysa n = 8, s = 1 cm için 34 × 21 cm, 714 cm² ve 110 cm çıkar. Yayları gizlemek bu alan ve çevreleri değiştirmez.",
        explain: "Ölçek uzunlukları s ile, alanları s² ile çarpar. Yeni kare eklemek ise parçaların listesini değiştirir: 13²'den sonra 21² = 441 cm² eklenir; 273 + 441 = 714. Çizimin ekrana sığdırılması fiziksel boyut kartlarını geçersiz kılmaz."
      },
      {
        title: "Yüz terim, tek çarpım ve boş toplam",
        predict: "İlk yüz Fibonacci sayısının karelerini tek tek toplamak ile F₁₀₀F₁₀₁ çarpımı arasında yuvarlama farkı çıkar mı? n = 0 seçersen ne kalır?",
        do: "<strong>Kesin alan hesabı</strong> sekmesinde <strong>Son indis n</strong>'yi önce 7 yap; ardından <strong>Hesabı sıfırla</strong> ile n = 100'e dön. Toplamı, çarpımı ve kesin farkı karşılaştır. Son olarak <strong>Boş toplam: n = 0</strong>'a bas.",
        observe: "n = 7'de 273 = 13 × 21. n = 100'de F₁₀₀ = 354224848179261915075, F₁₀₁ = 573147844013817084101; toplam ve çarpım aynı 42 basamaklı tam sayıdır, kesin fark 0'dır. n = 0'da F₀ = 0, F₁ = 1 ve iki sonuç da 0 olur; bir adet sıfır kenarlı kare çizilmez.",
        explain: "Bu sekme BigInt tam sayı işlemleri yapar; sonuçları kayan noktalı ondalık sayılara dönüştürmez. Eşitlik için gerekçe yalnız bilgisayar çıktısı değil, Fᵢ² = FᵢFᵢ₊₁ − Fᵢ₋₁Fᵢ toplamındaki iptallerdir. n = 0 için boş toplam tanımı uç terimlerle tutarlıdır."
      },
      {
        title: "Bir eğriyi sekiz doğruyla ölçmek",
        predict: "m = 8'den 16'ya geçince kiriş hesabının eksik yüzdesi yaklaşık ikiye mi, dörde mi bölünür?",
        do: "<strong>Yay ve eğrilik</strong> sekmesinde <strong>Yayı sıfırla</strong>: <strong>İncelenen kare i</strong> = 5, <strong>Kiriş sayısı m</strong> = 8. Uzunlukları ve eksik oranı oku. <strong>Kiriş sayısını ikiye katla</strong>'ya bas; sonra m'yi 1 yaparak tek kiriş sınırını incele.",
        observe: "R = 5 cm için gerçek yay 7,853982 cm. m = 8'de kiriş toplamı 7,841371 cm ve eksiklik %0,160561; m = 16'da 7,850828 cm ve %0,040155. İlk yüzde yaklaşık 3,9986 kat büyüktür. m = 1'de tek kiriş 7,071068 cm, eksiklik %9,968368 olur.",
        explain: "Tek kiriş 5√2 cm'dir. Daha çok parça, eğrinin içini kesmenin kaybını azaltır. 1 − sin u/u ≈ u²/6 ve u = π/(4m) olduğundan m'yi iki katına çıkarmak öncü hata terimini dörtte bire indirir; sonlu m'de tam dört kat olması gerekmez."
      },
      {
        title: "Köşe yoksa eğrilik de sürekli midir?",
        predict: "İki yay aynı yönde birleşiyorsa eğrilikleri mutlaka eşit midir? i = 1 neden özel olabilir?",
        do: "<strong>Yay ve eğrilik</strong>'te <strong>Yayı sıfırla</strong>. Eğrilik kartını, teğet açı farkını ve alttaki iki modeli karşılaştır. <strong>İncelenen kare i</strong>'yi 1 yap. İlk iki yayın biçimini görmek için ayrıca <strong>Kareleri döşe</strong> sekmesinde s = 1 cm ve <strong>Kare sayısı n</strong> = 2 seç; yaylar görünür olsun.",
        observe: "i = 5'te teğet farkı 0,000000°, eğrilikler 0,200000 ve 0,125000 cm⁻¹. Başlangıç eğriliği eşlenmiş logaritmik modelin çeyrek tur değeri 0,123607 cm⁻¹'dir. i = 1'de iki çember eğriliği de 1,000000 cm⁻¹ olur; logaritmik model çeyrek turda 0,618034 cm⁻¹'e iner. Döşemenin ilk iki yayı birlikte bir yarım çemberdir.",
        explain: "Teğet, yönü; eğrilik, birim uzunluk başına yön değişimini ölçer. F₁ = F₂ = 1 olduğu için ilk birleşim istisnadır. Diğer komşu yarıçaplar farklıdır. Başlangıçta aynı eğrilik veya yakındaki bir sayısal değer, bütün eğrilerin özdeş olduğunu göstermez."
      }
    ]
  },
  wow: [
    {
      title: "132 cm kare çevresi, 68 cm dış sınır",
      body: "Varsayılan yedi karenin kenarları toplamı 1 + 1 + 2 + 3 + 5 + 8 + 13 = 33 cm; ayrı ayrı çevreleri toplamı 132 cm'dir. Döşemenin dış çevresi yalnız 68 cm! Aradaki 64 cm, içte paylaşılan toplam 32 cm sınırın iki kez sayılmasıdır. Parçaların alanları toplanır; dış çevreleri aynı biçimde toplanamaz."
    },
    {
      title: "Spiralin başlangıcında yarım çember var",
      body: "İlk iki karenin yarıçapları 1 ve 1 cm, yay merkezleri de aynı noktadır. İki çeyrek yay birleşince π cm uzunluğunda bir yarım çember çıkar. Eğrilik bu ilk birleşimde de 1 cm⁻¹ kalır. Bu yüzden ‘her birleşimde eğrilik sıçrar’ ifadesi yanlıştır; ilk sıçrama 1 cm yarıçaptan 2 cm yarıçapa geçerken olur."
    },
    {
      title: "Çizilemeyeni kesin hesaplamak",
      body: "n = 500 için F₅₀₀ sayısı 105 basamak, kareler toplamı F₅₀₀F₅₀₁ ise 209 basamaktır. Kesin hesap sekmesi bütün bu basamakları korur; çizim sekmesi en çok 12 kare gösterir. Hesabın doğruluğu ile ekrandaki ayrıntı başka sınırlara sahiptir. Buna karşılık π içeren yay uzunluğu sonlu ondalık gösterimde yaklaşık kalır."
    }
  ],
  worked: {
    title: "Yedi kareyi yarım santimetrelik birimle yapmak",
    prompt: "n = 7 ve s = 0,50 cm için dış dikdörtgenin alanını, çevresini ve yedi çeyrek yayın toplam uzunluğunu bul. Alan özdeşliğini ve yay uzunluğu integralini kullan; ardından Kareleri döşe sekmesinde değerleri karşılaştır.",
    steps: [
      "Yinelemeden F₇ = 13, F₈ = 21 ve F₉ = 34. Kenarlar 0,50 cm, 0,50 cm, 1 cm, 1,50 cm, 2,50 cm, 4 cm ve 6,50 cm'dir. Dış dikdörtgen 6,50 × 10,50 cm olur.",
      "Alan A = s²∑Fᵢ² = s²F₇F₈ = (0,50 cm)² × 13 × 21 = 68,25 cm². Burada karelerin boyutsuz alan katsayıları toplamı 273'tür; s² birimi ve ölçeği geri getirir.",
      "Dış çevre P = 2s(F₇ + F₈) = 2 × 0,50 cm × 34 = 34 cm. İçte kalan ortak kenarları dış çevreye katmıyoruz.",
      "Bir çember yayını açıyla parametreleyince hızın büyüklüğü Rᵢ = sFᵢ olur. Bu yüzden Lᵢ = ∫₀<sup>π/2</sup> Rᵢ dθ = πsFᵢ/2. θ radyandır; integral cm verir. Yayın döşemedeki yönü veya merkezi uzunluğunu değiştirmez.",
      "Fᵢ = Fᵢ₊₂ − Fᵢ₊₁ eşitliğini toplamak ∑ᵢ₌₁⁷Fᵢ = F₉ − F₂ = 34 − 1 = 33 verir. Toplam L = (πs/2) × 33 = 8,25π cm ≈ 25,9181 cm. Sayfada n = 7, s = 0,50 cm seçince alan, çevre ve yay kartları bu üç sonucu verir."
    ],
    result: "A = 68,25 cm²; P = 34 cm; L = 8,25π cm ≈ 25,9181 cm. Alan ve çevre bu ayarlarda tam sonlu ondalıklıdır; yay uzunluğunun ondalık yazımı yaklaşık değerdir."
  },
  misconceptions: [
    { myth: "Fibonacci karelerine çizilen yaylar tam bir altın spiraldir.", truth: "Çeyrek çemberlerin eğriliği parça parça sabittir ve farklı yarıçaplı birleşimlerde sıçrar. Altın logaritmik spiralin eğriliği sürekli değişir. Ardışık Fibonacci oranlarının φ'ye yaklaşması, sonlu çember yaylarını bu eğriyle özdeş yapmaz." },
    { myth: "İki yay arasında köşe yoksa bütün türev özellikleri aynıdır.", truth: "Aynı teğet yönü, aynı eğrilik demek değildir. Yay uzunluğuna göre parametrelenmiş eğrinin birim teğeti sürekli kalırken türevi iki yanda farklı olabilir; R = 5 ve 8 cm birleşiminde olan budur." },
    { myth: "500 örnekte doğru çıkan eşitlik bütün n'ler için kanıtlanmıştır.", truth: "Sonlu kontroller hata yakalamaya yarar. Genel kanıt, her n için yazılabilen teleskopik toplamdan veya kare ekleme kuralının tümevarımla doğrulanmasından gelir. BigInt aritmetiğin tam olması bu mantıksal ayrımı değiştirmez." },
    { myth: "Kiriş sayısını artırmak gerçek yayı uzatır; ölçek arttığında kare sayısı da artar.", truth: "Kiriş sayısı aynı yayı ne kadar iyi yaklaşık hesapladığını değiştirir. s ise mevcut karelerin uzunluk ölçeğidir; n'yi değiştirmez. Bu sayfada sayım, ölçek ve sayısal çözünürlük ayrı kontrollerdir." }
  ],
  glossary: [
    { term: "Yineleme bağıntısı", definition: "Bir dizinin yeni terimini önceki terimlerinden belirleyen kural; burada Fₙ₊₁ = Fₙ + Fₙ₋₁." },
    { term: "Teleskopik toplam", definition: "Komşu terimlerin birbirini götürmesiyle yalnız uç terimlerin kaldığı toplam." },
    { term: "Birim uzunluk s", definition: "Boyutsuz Fibonacci sayısını uzunluğa çeviren ölçek; i. karenin kenarı sFᵢ'dir." },
    { term: "Kiriş", definition: "Bir eğri üzerindeki iki noktayı birleştiren doğru parçası; burada çember yayını içten yaklaşık temsil eder." },
    { term: "Birim teğet", definition: "Eğrinin yönünü gösteren, uzunluğu 1 olan vektör; eğrilik bunun yay uzunluğuna göre değişimiyle tanımlanır." },
    { term: "Eğrilik κ", definition: "Birim yol boyunca teğet yönünün değişim büyüklüğü; çemberde 1/R ve birimi uzunluğun tersidir." },
    { term: "Logaritmik spiral", definition: "Kutupsal yarıçapı açıyla r = r₀eᵇᶿ biçiminde değişen eğri; altın türünde her çeyrek tur yarıçapı φ katına çıkarır." },
    { term: "BigInt", definition: "JavaScript'te bu sayfadaki büyük tam sayı toplam ve çarpımlarını kayan nokta yuvarlamasına uğratmadan saklayan sayı türü." }
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "<strong>Lineer Cebir</strong>'de yineleme iki bileşenli bir duruma dönüşür: (Fₙ₊₁, Fₙ)ᵀ = A(Fₙ, Fₙ₋₁)ᵀ, A = [[1,1],[1,0]]. Karakteristik denklem λ² − λ − 1 = 0; kökler φ ve ψ = (1 − √5)/2'dir. F₀ = 0, F₁ = 1 koşulları Fₙ = (φⁿ − ψⁿ)/√5 verir. |ψ/φ| < 1 olduğu için Fₙ₊₁/Fₙ → φ; bu, oran limitinin cebirsel nedenidir. Limitin varlığını baştan varsayıp q = 1 + 1/q çözmek aday değeri verir; ikinci kökün katkısının sönmesini incelemek yakınsamayı gerekçelendirir.",
      "<strong>Kalkülüs</strong>'te kiriş toplamlarının limiti yay uzunluğu integraline; teğet vektörünün türevi eğriliğe götürür. <strong>Sayısal Analiz</strong>'de ise bir sonlu yaklaşımın hata mertebesini ölçersin: bu eşit açılı kirişlerde bağıl hata yaklaşık π²/(96m²). Sayfanın tam sayı hesabı, kayan noktalı geometrisi ve sonlu piksel çizimi farklı kesinlik düzeyleridir. <strong>Diferansiyel Geometri</strong> bu ayrımı eğrinin konumundan, teğetinden ve eğriliğinden ayrı ayrı konuşan bir dile dönüştürür."
    ],
    topics: ["Teleskopik toplam ve tümevarım", "Matris yinelemeleri ve özdeğerler", "Yay uzunluğu integrali", "Eğrilik ve geometrik süreklilik", "Taylor açılımı ve hata mertebesi"]
  },
  quiz: [
    { question: "Kare sayısı sabitken birim uzunluk s üç katına çıkarılıyor. Alan, dış çevre ve toplam yay uzunluğu nasıl değişir?", options: ["Üçü de üç katına çıkar.", "Alan dokuz; çevre ve yay üç katına çıkar.", "Alan üç; çevre ve yay dokuz katına çıkar.", "Çizim ekrana sığdığı için hiçbiri değişmez."], answer: 1, explanation: "Alan s², uzunluklar s ile orantılıdır. Otomatik ekran ölçeği geometrinin cm ve cm² değerlerini değiştirmez." },
    { question: "R = 5 cm ve R = 8 cm çeyrek yayları aynı noktada aynı teğet yönüyle birleşiyor. Hangisi doğrudur?", options: ["Eğrilikler de eşittir, çünkü köşe yoktur.", "Birleşimde eğrilik iki yarıçapın ortalamasıdır.", "Tek yanlı eğrilikler 0,2 ve 0,125 cm⁻¹; birleşimde tek bir eğrilik yoktur.", "Her iki yayın eğriliği uzunlukları arttığı için sıfırdır."], answer: 2, explanation: "Çemberin eğriliği 1/R'dir. Yönün sürekliliği, bu yönün birim yol başına değişim hızının sürekliliğini gerektirmez." },
    { question: "Aynı m için R = 1 cm ve R = 5 cm çeyrek yaylarının kiriş hesabındaki bağıl eksiklikleri nasıl karşılaştırılır?", options: ["5 cm yarıçapta beş kat büyüktür.", "5 cm yarıçapta yirmi beş kat büyüktür.", "1 cm yarıçapta beş kat büyüktür.", "Eşittir; 1 − sin u/u ifadesinde R sadeleşir."], answer: 3, explanation: "Hem yay hem kiriş toplamı R ile orantılıdır. Mutlak uzunluk hatası beş kat büyür, bağıl hata aynı kalır; u = π/(4m)." }
  ],
  next: [
    { href: "fibo+pascal.html", title: "Fibonacci ve Pascal", why: "Aynı yinelemenin sayma tarafına geç: şerit döşemeleri, binom katsayıları ve sığ köşegen toplamları." },
    { href: "lineer-cebir-ve-ozdegerler.html", title: "Lineer Cebir ve Özdeğerler: Eleme, Alt Uzaylar ve Spektrum", why: "Fibonacci yinelemesini ilerleten 2 × 2 matrisin özdeğerleriyle oran limitini bağla." },
    { href: "taylor-serisi.html", title: "Taylor Serisi", why: "Sin u/u açılımından kiriş hatasının neden m⁻² ile küçüldüğünü türet." },
    { href: "tek-sayi-toplam3.html", title: "Tek Sayılardan Kareye", why: "Başka bir alan özdeşliğini gerçek hücrelerle kur: L katmanları, kare halkası ve aynı hücrelerden oluşan dikdörtgen." }
  ],
  sources: [
    { title: "Williams College · An Invitation to Fibonacci Digits", url: "https://web.williams.edu/Mathematics/sjmiller/public_html/math/papers/FibOutreachPaper_Digits40.pdf", note: "Cheigh ve çalışma arkadaşlarının kare döşeme etkinliği; aynı dikdörtgenin alanından kareler toplamı özdeşliği." },
    { title: "OpenStax Calculus 3 · Arc Length and Curvature", url: "https://openstax.org/books/calculus-volume-3/pages/3-3-arc-length-and-curvature", note: "§3.3: parametrik eğrilerde yay uzunluğu, birim teğet ve eğrilik. Kiriş ve logaritmik spiral hesapları bu tanımlarla türetilir." },
    { title: "MIT 18.06 · Fibonacci", url: "https://www.mit.edu/~18.06/Spring17/Fibonacci.pdf", note: "Tam sayı hesabı, matris yinelemesi, iki özdeğer ve altın orana yakınsama; bu defterde indisler F₀ = 0, F₁ = 1 olarak sabittir." },
    { title: "MacTutor · Leonardo Pisano Fibonacci", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Fibonacci/", note: "St Andrews Üniversitesi matematik tarihi arşivi; Liber abaci'nin 1202 tarihi ve kitaptaki ideal tavşan problemi." }
  ],
  revision: "Kasım 2026"
};
