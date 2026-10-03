window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["altin-oran"] = {
  slug: "altin-oran",
  title: "Altın Oran: Kendine Benzeyen Sayı",
  field: "Matematik",
  level: "Lise",
  minutes: 30,
  tagline:
    "φ = 1,618…; parçanın bütüne benzediği tek oran. Beşgende, Fibonacci dizisinde, ayçiçeğinin tohum sarmallarında gerçekten var; Parthenon'da ve insan yüzünde ise çoğunlukla sonradan uydurulmuş.",
  hook:
    "Bir ayçiçeğinin ortasına yakından bak: tohumlar iki yönde sarmal çizer. Saat yönündekileri sayarsan 34, ötekileri 55 bulursun; büyük bir çiçekte 55 ve 89. Neden hep bu sayılar? Ve neden aynı sayı, 2300 yıl önce yazılmış bir Yunan geometri kitabının bir tanımından da çıkıyor?",
  bigIdea:
    "Altın oran, bir parçayı ayırdığında kalanın yine aynı oranı taşıdığı tek orandır: <strong>φ² = φ + 1</strong>. Bu kendine benzerlik Fibonacci dizisinde, beşgende, logaritmik spiralde ve bitkilerin tohum diziliminde aynı sayıyı doğurur; ama her güzel şeyin içinde değildir.",
  story: [
    "Altın oranın en eski güvenilir kaydı Öklid'in <em>Elementler</em>'idir (MÖ 300 civarı). Öklid ona 'altın' demedi; 'bir doğruyu <strong>aşırı ve orta oranda bölmek</strong>' dedi: bütün büyük parçaya nasıl oranlanıyorsa, büyük parça küçüğe öyle oranlansın. Bu bölmeye ihtiyacı vardı, çünkü düzgün beşgeni pergel ve cetvelle çizmenin yolu buradan geçer: beşgenin köşegeni kenarına tam bu oranla bölünür. Pisagorcuların beşgen yıldızı simge olarak kullandığı anlatılır; ama onların bu oranı bilinçli olarak incelediğine dair elimizde metin yoktur. 'Altın kesit' adı ancak 1835'te Alman matematikçi Martin Ohm'un bir kitabında görülür; φ harfinin ise 20. yüzyılın başında heykeltıraş Fidias'ın adının ilk harfinden seçildiği söylenir.",
    "Sayı, ikinci kez bambaşka bir kapıdan girdi. 1202'de Pisalı Leonardo (Fibonacci), <em>Liber Abaci</em> adlı hesap kitabında bir tavşan sorusu sordu: her ay yeni bir çift doğuran ve ikinci ayından itibaren üreyen çiftler on iki ay sonra kaça ulaşır? Cevap 377'ydi ve aylık sayılar 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377 diye gidiyordu: her sayı önceki ikisinin toplamı. Aynı dizi Hindistan'da çok daha önce, şiir vezinlerindeki kısa ve uzun heceleri sayan Virahanka ve Hemaçandra gibi bilginler tarafından bulunmuştu. Ardışık terimlerin oranının 1,618…'e yaklaştığını ise 17. yüzyılın başında Kepler fark etti. Bir geometri tanımı ile bir sayma sorusu aynı sayıda buluşmuştu.",
    "Sonra efsane başladı. 1509'da Luca Pacioli, Leonardo da Vinci'nin çizimleriyle süslü <em>De divina proportione</em> ('İlahi Oran') kitabını bastı ve sayıya kutsal bir hava kattı. 1854'te Adolf Zeising, insan bedeninden bitkilere her güzel biçimin altın oranla kurulduğunu ilan etti; Parthenon'un, Mona Lisa'nın ve insan yüzünün φ ile ölçüldüğü iddiaları buradan türedi. Kanıt ne diyor? Parthenon MÖ 447–432'de yapıldı, mimarlarının φ'yi hedeflediğine dair hiçbir belge yok ve dikdörtgeni nereden ölçtüğünüze göre oran 1,5 ile 1,8 arasında oynuyor. George Markowsky 1992'de bu iddiaları tek tek sınadı ve çoğunun, istenen sonucu veren ölçüm noktalarını sonradan seçmeye dayandığını gösterdi. Nautilus kabuğu da altın spiral değildir: her tam turda yaklaşık 3 kat büyür, altın spiral ise 6,85 kat.",
    "Peki gerçek nerede? Bitkilerin yaprak ve tohum diziliminde: büyüme noktasında her yeni tohum bir öncekinden <strong>altın açı</strong> kadar (137,5°) dönerek yerleşir ve bu, yüzeyi en sıkı dolduran düzen olduğu için sarmal sayıları Fibonacci sayıları çıkar. Penrose döşemelerinde ve 1982'de keşfedilen yarı kristallerde: beş katlı simetriyi taşıyan her yapı φ'yi taşır. Ve bilgisayar biliminde: Öklid'in bölme algoritması en çok adımı ardışık iki Fibonacci sayısında atar; dengeli arama ağaçlarının en kötü yüksekliği φ ile ölçülür. Altın oran süslemenin değil, kendine benzerliğin sayısıdır.",
  ],
  core: [
    {
      heading: "Tanım: bütünün parçaya benzemesi",
      body:
        "Bir çubuğu a (büyük) ve b (küçük) diye iki parçaya böl. Bütünün büyüğe oranı, büyüğün küçüğe oranına eşitse bölme altındır: (a + b)/a = a/b. Bu orana x dersen eşitlik x = 1 + 1/x olur, yani <strong>x² = x + 1</strong>. İkinci dereceden bu denklemin pozitif kökü φ'dir. Formülün söylediği şey basit ama derindir: φ'nin karesi kendisinden bir fazla, tersi kendisinden bir eksiktir. Başka hiçbir pozitif sayı bunu yapamaz.",
      formula: "φ = (1 + √5)/2 ≈ 1,618 034",
      formulaNote: "1/φ = φ − 1 ≈ 0,618 ve φ² = φ + 1 ≈ 2,618: aynı ondalık basamaklar, üç farklı sayı.",
    },
    {
      heading: "Fibonacci oranları φ'ye nasıl yaklaşır",
      body:
        "Dizide her terim önceki ikisinin toplamıdır: F<sub>n+1</sub> = F<sub>n</sub> + F<sub>n−1</sub>. İki yanı F<sub>n</sub>'ye bölersen oran r<sub>n</sub> = F<sub>n+1</sub>/F<sub>n</sub> için r<sub>n</sub> = 1 + 1/r<sub>n−1</sub> çıkar; bu tam da x = 1 + 1/x denklemidir. Oranlar φ'nin bir altına bir üstüne düşerek yaklaşır: 3/2 = 1,5; 5/3 = 1,667; 8/5 = 1,6; 13/8 = 1,625; 21/13 = 1,615; 89/55 = 1,61818. Hiçbir oran tam φ olmaz, çünkü φ irrasyoneldir; ama fark her adımda yaklaşık 2,6 kat küçülür.",
      formula: "F<sub>n</sub> = (φ<sup>n</sup> − (−1/φ)<sup>n</sup>) / √5",
      formulaNote: "Binet formülü. İkinci terim n ≥ 1 için 0,5'ten küçüktür; bu yüzden F<sub>n</sub>, φ<sup>n</sup>/√5'in en yakın tam sayıya yuvarlanmışıdır.",
    },
    {
      heading: "Altın dikdörtgen ve logaritmik spiral",
      body:
        "Kenarları φ oranında olan bir dikdörtgenden bir kare kes; kalan parça yine altın dikdörtgendir. Bunu sonsuza dek sürdürüp her kareye çeyrek çember çizersen altın spiral belirir: her çeyrek turda merkezden uzaklık φ katına çıkar, tam turda φ⁴ ≈ 6,85 katına. Bu bir <strong>logaritmik spiral</strong>dir: açı eşit adımlarla artarken yarıçap eşit <em>katlarla</em> büyür. Jakob Bernoulli bu eğriye 'spira mirabilis' dedi ve mezar taşına kazınmasını istedi; büyütüp döndürdüğünde kendine dönüşen tek spiraldir.",
      formula: "r(θ) = r₀ · φ<sup>θ/90°</sup>",
      formulaNote: "Bu sayfadaki spiral her 45°'de φ katına çıkar, yani r(θ) = r₀ · φ<sup>θ/45°</sup>: altın spiralden iki kat daha dik, bir turda 47 kat büyüyen bir logaritmik spiral.",
    },
    {
      heading: "Altın açı: en irrasyonel sayının işi",
      body:
        "φ'yi sürekli kesir olarak yazarsan içinde yalnızca birler vardır: 1 + 1/(1 + 1/(1 + …)). Kesirli yaklaşımları Fibonacci oranlarıdır ve bunlar her irrasyonel sayınınkinden daha yavaş yakınsar; bu anlamda φ 'en irrasyonel' sayıdır. Bir bitki büyüme noktasına her yeni tohumu bir öncekinden 360°/φ² ≈ 137,5° döndürerek koyarsa, tohumlar hiçbir zaman aynı ışın üzerine düşmez ve yüzey en düzgün biçimde dolar. 137° ya da 138° bile denense belirgin boşluklar ve ışınlar oluşur. Sayfadaki spiral 45° adımla gidiyor; o yüzden toplar sekiz düz ışına diziliyor.",
      formula: "α = 360° / φ² ≈ 137,508°",
      formulaNote: "Aynı sayı 360°·(1 − 1/φ)'dir: tam turun küçük altın parçası.",
    },
    {
      heading: "Beşgen: φ'nin doğduğu yer",
      body:
        "Düzgün beşgende köşegenin kenara oranı tam φ'dir; köşegenler birbirini altın oranda keser ve ortada yeni, küçük bir beşgen bırakır. Bu yüzden beşgen yıldız (pentagram) kendi içinde sonsuza kadar tekrar eder. Aynı gerçeği trigonometri de söyler: cos 36° = φ/2 ve cos 72° = 1/(2φ). Üç boyutta da öyle: ikosahedronun 12 köşesi, kenarları 2 ve 2φ olan üç dik altın dikdörtgenin köşeleridir. Beş katlı simetri gördüğün her yerde φ saklıdır.",
      formula: "cos 36° = φ/2 ≈ 0,809",
      formulaNote: "36° = 180°/5; beşgenin her iç açısı 108°, köşegenlerin kenarla yaptığı açı 36°.",
    },
  ],
  lab: {
    intro:
      "Bu sayfada kaydırıcı ya da menü yok; yalnızca üç boyutlu bir sahne var. Kontroller farenin kendisi: <strong>sol tuşla sürükle</strong> sahneyi döndürür, <strong>tekerlek</strong> yakınlaştırıp uzaklaştırır, <strong>sağ tuşla sürükle</strong> kaydırır (dokunmatik ekranda tek parmak döndürür, iki parmak yakınlaştırır). Kod 100 sarı top üretir: ilki merkezden 0,1 birim uzakta, her sonraki top bir öncekinden φ kat daha uzakta ve 45° daha dönmüş. Toplar ayrıca yavaşça öne-arkaya salınır.",
    experiments: [
      {
        title: "Yüz toptan kaçı görünüyor?",
        predict: "Kod 100 top çiziyor. Sayfa açıldığında kaçını görebileceğini tahmin et: hepsini mi, yarısını mı, bir avucunu mu?",
        do: "Sayfayı yenile, hiçbir şeye dokunmadan ekrandaki topları say. Merkezdeki iç içe geçmiş yumruyu tek tek saymaya çalışma; onu bir grup olarak al.",
        observe: "Geniş ekranda yaklaşık 12 top: ortada 4–5 topun kaynaştığı bir yumru, çevresinde gittikçe seyrelen 7–8 top. Kalan 88 top ekranın dışındadır.",
        explain: "Uzaklıklar toplanarak değil çarpılarak büyür: 0,1 × φⁿ. Onuncu top 12,3 birimde, on ikinci top 32 birimdedir; kamera ise 20 birim uzaktan yaklaşık 15 birimlik bir yarıçap görür. Üstel büyüme on adımda 123 kat demektir.",
      },
      {
        title: "Sekiz ışın",
        predict: "Spiral deyince kıvrımlı bir eğri beklersin. Toplar düz çizgiler üzerine de dizilebilir mi? Kaç çizgi olurdu?",
        do: "Sahneye dokunmadan ya da tekerlekle biraz uzaklaşarak topların merkezden geçen düz doğrular üzerinde olup olmadığına bak. Sağa (3 yönü) ve yukarı (12 yönü) düşen topları bul.",
        observe: "Toplar merkezden çıkan sekiz düz ışına dizilir: 0°, 45°, 90°… Aynı ışın üzerindeki iki komşu top arasında tam sekiz top vardır ve dıştaki içtekinden yaklaşık 47 kat uzaktadır: sağdaki ışında 0,1; 4,7; 221 birim.",
        explain: "45°, 360°'yi tam böler; sekiz adımda başa dönülür. φ⁸ ≈ 46,98 olduğu için her ışında uzaklık 47 kat atlar. Bitki 137,5° kullanır; bu açı tam turu asla eşit bölmez, o yüzden tohumlar ışın değil sarmal çizer.",
      },
      {
        title: "Çeyrek tur testi: bu altın spiral mi?",
        predict: "Gerçek altın spiral her çeyrek turda φ ≈ 1,62 kat büyür. Sağdaki toptan (3 yönü) yukarıdaki topa (12 yönü) geçince uzaklık kaç katına çıkar: 1,6 mı, 2,6 mı?",
        do: "Sayfa yeni açılmışken sağ ışında, merkeze en yakın seçilebilen topu bul (4,7 birimde); sonra ondan iki top sonraki, tam yukarıdaki topu (12,3 birimde). Göz kararı ya da ekrana cetvel tutarak uzaklıkları karşılaştır.",
        observe: "Yukarıdaki top, sağdakinden yaklaşık 2,6 kat uzaktadır; soldaki (6,85 kat) ise yarım turda altın spiralin tam turda yaptığını yapar. Uzaklıklar 4,7 → 12,3 → 32,2 birim.",
        explain: "Çeyrek turda iki adım atılıyor: φ² ≈ 2,618. Sayfanın spirali logaritmik ama altın değil; altın spiral için adım açısı 90° ya da büyüme çarpanı √φ ≈ 1,27 olmalıydı.",
      },
      {
        title: "Yandan bak: içeri akan dalga",
        predict: "Toplar düzlem içinde durmuyor; öne-arkaya salınıyor. Bir gidiş-dönüş kaç saniye sürer, komşu toplar aynı anda mı tepeye çıkar?",
        do: "Sol tuşla yatay sürükleyip sahneyi yandan görene kadar (90° kadar) döndür; toplar bir çizgiye dizilsin. Bir topun aynı yönde iki kez tepeye çıkışı arasındaki süreyi saatle ölç; sonra merkezdeki ve en dıştaki topların tepe anlarını karşılaştır.",
        observe: "Her top yaklaşık 6,3 saniyede bir gidiş-dönüş yapar ve toplam 1 birim (iki buçuk top çapı) yol alır. Dıştaki toplar içtekilerden biraz önce tepeye çıkar; dalga dıştan merkeze doğru akıyor gibi görünür.",
        explain: "Kod z = 0,5·sin(t + 0,1·n) kullanır: genlik 0,5, periyot 2π ≈ 6,28 s, her top bir öncekinden 0,1 radyan (5,7°) ileride. Ekrandaki on iki top arasında toplam faz farkı 1,1 radyan, yani yaklaşık 1,1 saniyedir.",
      },
    ],
  },
  wow: [
    {
      title: "137,5° ve ayçiçeğinin sarmalları",
      body:
        "Bir ayçiçeği tohumlarını altın açıyla, her seferinde 137,5° dönerek yerleştirir; sonuç olarak gözün seçtiği sarmallar iki yönde 34 ve 55, büyük başlarda 55 ve 89 ya da 89 ve 144 tane olur: hepsi ardışık Fibonacci sayıları. 1992'de Stéphane Douady ve Yves Couder bunu bitkisiz tekrarladı: yağ dolu bir kabın ortasına eşit aralıklarla damlatılan mıknatıslı damlacıklar birbirini iterek kendiliğinden 137,5°'lik açıyla dizildi. Fibonacci bitkinin bilgisi değil, sıkışıklığın fiziğiydi.",
    },
    {
      title: "Mil-kilometre çevirmek için Fibonacci yeter",
      body:
        "1 mil = 1,609 km, φ = 1,618; fark binde altı. Bu yüzden ardışık iki Fibonacci sayısı neredeyse bir mil-kilometre tablosudur: 5 mil ≈ 8 km, 8 mil ≈ 13 km, 55 mil ≈ 89 km (gerçek değer 88,5 km). İngiltere'de bir yol levhasını kafadan kilometreye çevirmek için dizinin bir sonraki terimine atlamak yeter.",
    },
    {
      title: "İmkânsız kristal, Nobel ve φ",
      body:
        "1982'de Dan Shechtman bir alüminyum-mangan alaşımının kırınım deseninde beş katlı simetri gördü. Ders kitaplarına göre kristaller bunu yapamazdı; Shechtman'ın laboratuvarından ayrılması istendi. Desen, Roger Penrose'un 1970'lerde çizdiği iki parçalı döşemenin üç boyutlu akrabasıydı: o döşemede uçurtma ve ok parçalarının sayı oranı φ'ye yaklaşır ve yarı kristallerin atom düzeni de aynı oranı taşır. Shechtman 2011 Nobel Kimya Ödülü'nü aldı; 'yarı kristal' artık bir madde sınıfının adı.",
    },
  ],
  worked: {
    title: "10 santimetrelik çubuğu altın oranda böl",
    prompt:
      "Elinde 10,0 cm uzunluğunda bir çubuk var. Onu öyle böl ki bütünün büyük parçaya oranı, büyük parçanın küçük parçaya oranına eşit olsun. Parçaların uzunluğunu bul ve altın oranı doğrula.",
    steps: [
      "Büyük parçaya x cm de; küçük parça 10 − x cm olur. Koşul: 10/x = x/(10 − x). İçler dışlar çarpımı: x² = 10(10 − x), yani x² + 10x − 100 = 0.",
      "İkinci derece denklemi çöz: x = (−10 + √(100 + 400))/2 = (−10 + √500)/2 = (−10 + 22,36)/2 ≈ 6,18 cm. Negatif kökü at; bir uzunluk negatif olamaz. Küçük parça: 10 − 6,18 = 3,82 cm.",
      "Doğrula: 10,0/6,18 ≈ 1,618 ve 6,18/3,82 ≈ 1,618. İki oran da φ. Kısa yol: büyük parça her zaman bütünün 1/φ ≈ 0,618 katıdır, küçük parça 1/φ² ≈ 0,382 katı.",
      "Kendine benzerliği gör: şimdi 6,18 cm'lik parçayı aynı kuralla böl: 3,82 ve 2,36 cm. Sonra 3,82'yi böl: 2,36 ve 1,46 cm. Dizi 10 → 6,18 → 3,82 → 2,36 → 1,46: her terim önceki ikisinin farkı. Fibonacci'nin tersine işleyen hali.",
    ],
    result:
      "Parçalar 6,18 cm ve 3,82 cm. Çubuğun uzunluğu ne olursa olsun büyük parça bütünün 0,618'i, küçük parça 0,382'sidir; ve her parça yeniden aynı oranda bölünebilir.",
  },
  misconceptions: [
    {
      myth: "Altın oran bütün güzel şeylerde vardır: Parthenon, Mona Lisa, insan yüzü, nautilus.",
      truth:
        "Bu iddiaların çoğu 19. yüzyılda ortaya atıldı ve istenen oranı veren ölçüm noktalarının sonradan seçilmesine dayanır; 1,6 civarında bir sayıya herhangi bir şekilde ulaşmak kolaydır. Parthenon'un mimarlarının φ'yi hedeflediğine dair belge yok, nautilus turda yaklaşık 3 kat büyür (altın spiral 6,85). Kanıtı sağlam örnekler bitki dizilimi, beşgen ve yarı kristallerdir; Le Corbusier'nin Modulor sistemi gibi bilinçli tasarımlar da vardır ama bunlar istisnadır.",
    },
    {
      myth: "Fibonacci dizisinde yeterince ilerlersen oran tam olarak 1,618 olur.",
      truth:
        "Hiçbir zaman. φ irrasyoneldir; iki tam sayının oranı ona ancak yaklaşır. Oranlar bir alttan bir üstten yaklaşır (1,5; 1,667; 1,6; 1,625; …) ve fark her adımda yaklaşık 2,6 kat küçülür ama asla sıfır olmaz. 1,618 de φ'nin kendisi değil, dört basamağa yuvarlanmış halidir.",
    },
    {
      myth: "Fibonacci spirali ile altın spiral aynı şeydir.",
      truth:
        "Yakın akrabadır ama aynı değildir. Fibonacci spirali 1, 1, 2, 3, 5, 8 kenarlı karelere çizilen çeyrek çemberlerden oluşur; her çeyrek turda büyüme 1,5; 1,667; 1,6… diye değişir ve ancak uzaklaştıkça φ'ye yaklaşır. Altın spiral ise her çeyrekte tam φ kat büyüyen pürüzsüz bir logaritmik eğridir. Bu sayfadaki spiral ise ikisi de değildir: her 45°'de φ kat büyür.",
    },
    {
      myth: "Bitkiler Fibonacci sayılarını 'bilir'.",
      truth:
        "Bitki sayı saymaz. Büyüme noktasında yeni tohum, öncekilerin en az ittiği boşluğa yerleşir; bu basit kural ardışık tohumlar arasında 137,5°'lik açıyı doğurur ve Fibonacci sayıları bunun sonucu olarak ortaya çıkar. Douady ve Couder'in mıknatıslı damlacıkları da aynı deseni verir. Üstelik kural bazen bozulur: incelenen yüzlerce ayçiçeğinin yaklaşık dörtte biri tam Fibonacci sayısı vermez.",
    },
  ],
  glossary: [
    { term: "Altın oran (φ)", definition: "(1 + √5)/2 ≈ 1,618; bir bütünün büyük parçaya oranının, büyük parçanın küçüğe oranına eşit olduğu bölme oranı." },
    { term: "Fibonacci dizisi", definition: "1, 1, 2, 3, 5, 8, 13, …; her terimin önceki ikisinin toplamı olduğu dizi; ardışık terim oranları φ'ye yaklaşır." },
    { term: "Altın dikdörtgen", definition: "Kenar oranı φ olan dikdörtgen; bir kare kesildiğinde kalan parça yine altın dikdörtgendir." },
    { term: "Logaritmik spiral", definition: "Açı eşit adımlarla artarken yarıçapın eşit katlarla büyüdüğü eğri, r = a·e<sup>bθ</sup>; büyütülünce kendine benzer." },
    { term: "Altın açı", definition: "360°/φ² ≈ 137,5°; bitkilerin ardışık yaprak ve tohumlarını yerleştirdiği, tam turu asla eşit bölmeyen dönme açısı." },
    { term: "Filotaksi", definition: "Bitkilerde yaprak, tohum ve dalların gövde ya da çiçek tablası üzerindeki dizilim düzeni." },
    { term: "Sürekli kesir", definition: "Bir sayıyı iç içe kesirler olarak yazma biçimi; φ'ninki yalnızca birlerden oluşur: 1 + 1/(1 + 1/(1 + …))." },
    { term: "İrrasyonel sayı", definition: "İki tam sayının oranı olarak yazılamayan sayı; ondalık açılımı sonsuz ve tekrarsızdır. φ, √5 ile birlikte irrasyoneldir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede φ bir ikinci derece denklemin köküdür; üniversitede bir <strong>özdeğer</strong>: Fibonacci adımı (F<sub>n+1</sub>, F<sub>n</sub>) → (F<sub>n+1</sub> + F<sub>n</sub>, F<sub>n+1</sub>) bir 2×2 matrisle yazılır ve o matrisin özdeğerleri φ ile −1/φ'dir. Binet formülü, bu matrisin n'inci kuvvetinden başka bir şey değildir; aynı yöntem her doğrusal yineleme bağıntısını, nüfus modellerini ve Markov zincirlerini çözer. Sayılar kuramında φ, sürekli kesirler ve Diophantine yaklaşımın baş kahramanıdır: Hurwitz teoremi her irrasyonel sayının |α − p/q| < 1/(√5·q²) koşulunu sağlayan sonsuz kesri olduğunu söyler ve √5 sabiti tam olarak φ yüzünden iyileştirilemez.",
      "Bilgisayar bilimlerinde φ, en kötü durumun ölçüsüdür: Öklid algoritmasının adım sayısı için Lamé'nin 1844 tarihli sınırı ardışık Fibonacci sayılarından gelir; AVL ağacının yüksekliği en çok 1,44·log₂n'dir ve 1,44 = 1/log₂φ'dir; Fibonacci yığınları adını buradan alır. Fizikte ve dinamik sistemlerde ise 'en irrasyonel' olmak bir dayanıklılık ölçüsüdür: KAM teorisine göre altın oranlı frekans oranına sahip yörüngeler, bozucu etkiler altında en son parçalanan yörüngelerdir. Penrose döşemeleri ve yarı kristaller, periyodik olmadan düzenli olmanın φ ile nasıl mümkün olduğunu gösterir.",
    ],
    topics: ["Doğrusal yineleme bağıntıları ve özdeğerler", "Sürekli kesirler ve Diophantine yaklaşım", "Algoritma analizi: Öklid, AVL, Fibonacci yığını", "Aperiodik döşemeler ve yarı kristaller", "Filotaksi modelleri", "KAM teorisi ve kaos"],
  },
  quiz: [
    {
      question: "Aşağıdaki denklemlerden hangisinin pozitif kökü altın orandır?",
      options: ["x² = 2x", "x² = x + 1", "x² + x = 2", "x = 1 + x²"],
      answer: 1,
      explanation: "Tanımdan (a + b)/a = a/b ⇒ x = 1 + 1/x ⇒ x² = x + 1. Çözümü (1 + √5)/2 ≈ 1,618. İlk seçenek 2, üçüncüsü 1 verir; dördüncünün gerçel kökü yoktur.",
    },
    {
      question: "Sayfadaki spiralde aynı ışın üzerindeki iki komşu top arasında uzaklık kaç katına çıkar?",
      options: ["φ ≈ 1,62 kat", "φ⁴ ≈ 6,85 kat", "φ⁸ ≈ 47 kat", "8 kat"],
      answer: 2,
      explanation: "Her top bir öncekinden 45° dönmüş ve φ kat uzaktadır; aynı ışına dönmek sekiz adım sürer, dolayısıyla uzaklık φ⁸ ≈ 46,98 kat atlar. Gerçek altın spiral bir tam turda yalnızca φ⁴ ≈ 6,85 kat büyür.",
    },
    {
      question: "Hangi iddianın arkasında en sağlam kanıt vardır?",
      options: ["Parthenon'un cephesi altın dikdörtgendir", "Ayçiçeği tohum sarmallarının sayıları ardışık Fibonacci sayılarıdır", "Nautilus kabuğu altın spiraldir", "Güzel bulunan yüzler φ oranındadır"],
      answer: 1,
      explanation: "Ayçiçeği sayıları ölçülebilir ve mekanizması (altın açıyla yerleşim) hem matematiksel hem deneysel olarak gösterilmiştir. Parthenon ve yüz iddiaları seçmeli ölçüme dayanır; nautilus turda yaklaşık 3 kat büyür, altın spiralin 6,85 katı değil.",
    },
  ],
  next: [
    { href: "fibo.html", title: "Fibonacci Spirali", why: "Karelerden örülen Fibonacci spiralini adım adım izle; bu sayfadaki 45°'lik spiralle farkını gör." },
    { href: "penrose-dosemesi.html", title: "Penrose Döşemesi", why: "Beş katlı simetri ve uçurtma/ok oranının φ'ye yaklaştığı periyodik olmayan döşeme." },
    { href: "pascal-ucgeni.html", title: "Pascal Üçgeni", why: "Üçgenin eğik köşegenlerini topla: Fibonacci sayıları ortaya çıkar." },
    { href: "koch-kar-tanesi.html", title: "Koch Kar Tanesi", why: "Kendine benzerliğin öteki yüzü: oranla büyüyen spiral yerine sonsuza dek bölünen kenar." },
  ],
  sources: [
    { title: "Vikipedi · Altın oran", url: "https://tr.wikipedia.org/wiki/Alt%C4%B1n_oran", note: "Tanım, tarihçe, Fibonacci bağlantısı ve sanattaki iddialara eleştirel bakış (Türkçe)." },
    { title: "Wolfram MathWorld · Golden Ratio", url: "https://mathworld.wolfram.com/GoldenRatio.html", note: "Sürekli kesir, Binet formülü, beşgen ve trigonometrik özdeşlikler; formül odaklı başvuru (İngilizce)." },
    { title: "Wikipedia · Golden angle", url: "https://en.wikipedia.org/wiki/Golden_angle", note: "137,5°'nin türetilişi ve filotaksideki rolü; Douady–Couder deneyine bağlantılar (İngilizce)." },
    { title: "Nobel Prize · 2011 Kimya Ödülü özeti", url: "https://www.nobelprize.org/prizes/chemistry/2011/summary/", note: "Dan Shechtman ve yarı kristallerin keşfi; beş katlı simetri ve Penrose döşemesi bağlantısı (İngilizce)." },
  ],
  revision: "Ekim 2026",
};
