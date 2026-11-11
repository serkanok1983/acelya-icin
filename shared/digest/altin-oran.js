window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["altin-oran"] = {
  slug: "altin-oran",
  title: "Altın Oran: Kendine Benzeyen Sayı",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 30,
  tagline:
    "Bir çubuğu öyle böl ki kalan parça bütünün küçük kopyası olsun: φ = 1,618… Beşgende, Fibonacci dizisinde ve ayçiçeğinin sarmallarında gerçekten var; Parthenon'da ve insan yüzünde ise çoğunlukla sonradan uydurulmuş.",
  hook:
    "Bir ayçiçeğinin ortasına yakından bak: tohumlar iki yönde sarmal çizer. Bir yöndekileri sayarsan çoğu zaman 34, ötekileri 55 bulursun; büyük bir başta 55 ve 89. Neden hep bu sayılar? Ve neden aynı sayı, 2300 yıl önce yazılmış bir Yunan geometri kitabının bir tanımından da çıkıyor?",
  bigIdea:
    "Altın oran, bir parçayı ayırdığında kalanın yine aynı oranı taşıdığı tek orandır: <strong>φ² = φ + 1</strong>. Bu kendine benzerlik Fibonacci dizisinde, beşgende, logaritmik spiralde ve bitkilerin tohum diziliminde aynı sayıyı doğurur; ama her güzel şeyin içinde değildir.",
  story: [
    "Altın oranın en eski güvenilir kaydı Öklid'in <em>Elementler</em>'idir (MÖ 300 dolayı). Öklid ona 'altın' demedi; 'bir doğruyu <strong>aşırı ve orta oranda bölmek</strong>' dedi: bütün büyük parçaya nasıl oranlanıyorsa, büyük parça küçüğe öyle oranlansın. Bu bölmeye ihtiyacı vardı, çünkü düzgün beşgeni pergel ve cetvelle çizmenin yolu buradan geçer: beşgende köşegenin kenara oranı tam bu orandır ve kesişen iki köşegen birbirini yine bu oranda böler. Pisagorcuların beşgen yıldızı simge olarak kullandığı anlatılır; ama oranı bilinçli olarak incelediklerini gösteren, kendilerinden kalma tek satır yoktur. 'Altın kesit' (<em>goldener Schnitt</em>) adı basılı olarak ilk kez 1835'te, Alman matematikçi Martin Ohm'un bir ders kitabında görülür. φ harfini ise 1900'lerin başında Mark Barr, heykeltıraş Fidias'ın adının ilk harfi diye önerdi; Barr sonradan Fidias'ın bu oranı kullandığını pek olası bulmadığını da yazdı. Öklid'in iki bin yıl boyunca özel bir adı bile olmayan oranı, altın unvanını oldukça geç almıştır.",
    "Sayı, ikinci kez bambaşka bir kapıdan girdi. 1202'de Pisalı Leonardo (Fibonacci), <em>Liber Abaci</em> adlı hesap kitabında bir tavşan sorusu sordu: her ay yeni bir çift doğuran ve ikinci ayından itibaren üreyen çiftler on iki ay sonra kaça ulaşır? Aylık sayılar 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233 diye gidiyor, cevap 377 çıkıyordu: her sayı önceki ikisinin toplamı. Aynı dizi Hindistan'da çok daha önce, şiir vezinlerindeki kısa ve uzun heceleri sayan Virahanka ve Hemaçandra gibi bilginlerce bulunmuştu. Ardışık terimlerin oranının 1,618…'e yaklaştığını Fibonacci yazmadı; bunu 16. yüzyılda Simon Jacob not etti, 17. yüzyılın başında Kepler yeniden buldu. Bir geometri tanımı ile bir sayma sorusu aynı sayıda buluşmuştu.",
    "Sonra efsane başladı. 1509'da Luca Pacioli, çokyüzlü çizimlerini Leonardo da Vinci'nin yaptığı <em>Divina proportione</em> ('İlahi Oran') kitabını bastı. Pacioli'nin bu oranı sanatçılara güzellik reçetesi diye önerdiği sık söylenir; oysa önerdiği, Vitruvius'un tam sayı oranlarıydı. Leonardo'nun Mona Lisa'da ya da Vitruvius Adamı'nda φ kullandığını gösteren bir belge de yoktur. Asıl kaynak 1854'tür: Adolf Zeising, insan bedeninden bitkilere her güzel biçimin altın oranla kurulduğunu ilan etti; Parthenon, piramitler ve yüz iddiaları buradan türedi. Kanıt ne diyor? George Markowsky 1992'deki 'Altın Oran Hakkındaki Yanılgılar' makalesinde bunları tek tek sınadı: Parthenon'un (MÖ 447–432) mimarlarının φ'yi hedeflediğine dair belge yok; ünlü çizimde yapının bir bölümü altın dikdörtgenin dışında kalıyor, ölçüler kaynaktan kaynağa değişiyor. Göbek yüksekliğinin boya oranının φ olduğu iddiasını destekleyen düzgün bir ölçüm verisi de yok. 'En güzel dikdörtgen' iddiası Fechner'in 1876'daki bir deneyine dayanır; sonraki dikkatli tekrarlar tek bir oranda toplanan bir tercih bulamadı.",
    "Peki gerçek nerede? Bitkilerin yaprak ve tohum diziliminde: büyüme noktasında her yeni taslak, öncekilerin en az engellediği yerde belirir; bu yerel kural çoğu bitkide ardışık taslakları <strong>altın açıya</strong> (137,5°) yakın bir dönmeyle dizer ve sarmal sayıları Fibonacci sayıları çıkar. Penrose döşemelerinde ve 1982'de keşfedilen yarı kristallerde: beş katlı simetri taşıyan yapılar φ'yi de taşır. Ve bilgisayar biliminde: Öklid'in bölme algoritması en çok adımı ardışık iki Fibonacci sayısında atar; AVL ağacının en kötü yüksekliği φ ile ölçülür. Altın oran süslemenin değil, kendine benzerliğin sayısıdır.",
  ],
  core: [
    {
      heading: "Kalan parça bütünün kopyası olsun",
      body:
        "Bir çubuğu a (büyük) ve b (küçük) diye iki parçaya böl. Bütünün büyüğe oranı, büyüğün küçüğe oranına eşitse bölme altındır: (a + b)/a = a/b. Bu orana x dersen eşitlik x = 1 + 1/x olur, yani <strong>x² = x + 1</strong>; pozitif kökü φ'dir. Formülün söylediği şey basit ama derindir: φ'nin karesi kendisinden bir fazla, tersi kendisinden bir eksiktir ve bunu yapan başka pozitif sayı yoktur. 10,0 cm'lik bir çubukta büyük parça 10/φ ≈ 6,18 cm, küçük parça 3,82 cm'dir. Şimdi 6,18'lik parçayı aynı kuralla böl: 3,82 ve 2,36. Sonra 3,82'yi: 2,36 ve 1,46. Dizi 10 → 6,18 → 3,82 → 2,36 → 1,46 diye iner ve her terim önceki ikisinin farkıdır: Fibonacci kuralının geriye doğru işleyen hâli. Kendine benzerlik budur: parça, bütünün küçültülmüş kopyasıdır.",
      formula: "φ = (1 + √5)/2 ≈ 1,618 034",
      formulaNote: "1/φ = φ − 1 ≈ 0,618 ve φ² = φ + 1 ≈ 2,618: aynı ondalık basamaklar, üç farklı sayı.",
    },
    {
      heading: "Fibonacci oranları φ'ye nasıl yaklaşır",
      body:
        "Dizide her terim önceki ikisinin toplamıdır: F<sub>n+1</sub> = F<sub>n</sub> + F<sub>n−1</sub> (F<sub>1</sub> = F<sub>2</sub> = 1). İki yanı F<sub>n</sub>'ye bölersen r<sub>n</sub> = F<sub>n+1</sub>/F<sub>n</sub> oranı için r<sub>n</sub> = 1 + 1/r<sub>n−1</sub> çıkar; bu tam da x = 1 + 1/x denkleminin yinelemesidir. Oranlar φ'nin bir altına bir üstüne düşerek yaklaşır: 3/2 = 1,5; 5/3 = 1,667; 8/5 = 1,6; 13/8 = 1,625; 21/13 = 1,615; 89/55 = 1,61818. Hiçbiri tam φ olmaz, çünkü φ irrasyoneldir. Yaklaşmanın hızı da bellidir: e<sub>n</sub> = r<sub>n</sub> − φ hatası her adımda işaret değiştirir ve yaklaşık φ² ≈ 2,6 kat küçülür. Kapalı biçimi şudur: F<sub>n+1</sub> − φ·F<sub>n</sub> = (−1/φ)<sup>n</sup>, dolayısıyla |e<sub>n</sub>| = 1/(φ<sup>n</sup>·F<sub>n</sub>) ≈ 1/(√5·F<sub>n</sub>²). Paydayı on kat büyütmek hatayı yüz kat küçültür.",
      formula: "F<sub>n</sub> = (φ<sup>n</sup> − (−1/φ)<sup>n</sup>) / √5",
      formulaNote: "Binet formülü. İkinci terimin katkısı her n için 0,5'ten küçüktür; bu yüzden F<sub>n</sub>, φ<sup>n</sup>/√5'in en yakın tam sayıya yuvarlanmışıdır.",
    },
    {
      heading: "Altın dikdörtgen ve logaritmik spiral",
      body:
        "Kenarları φ oranında olan bir dikdörtgenden bir kare kes; kalan parça yine altın dikdörtgendir. Bunu sürdürüp köşeleri birleştiren pürüzsüz eğriyi çizersen <strong>altın spiral</strong> belirir: her çeyrek turda merkezden uzaklık φ katına, tam turda φ⁴ ≈ 6,85 katına çıkar. Karelere çizilen çeyrek çemberler bu eğrinin iyi bir taklididir, kendisi değil. Altın spiral bir <strong>logaritmik spiral</strong>dir: açı eşit adımlarla artarken yarıçap eşit <em>katlarla</em> büyür, r = a·e<sup>bθ</sup>. Türevini alırsan dr/dθ = b·r çıkar; yarıçap ile teğet arasındaki açı her noktada aynıdır (altın spiralde b ≈ 0,306 ve açı ≈ 73°). Büyütmek, eğriyi döndürmekle aynı şeydir. Jakob Bernoulli bu eğriye 'spira mirabilis' dedi ve mezar taşına kazınmasını istedi; Basel'deki taşta ise ustanın kazıdığı, sarmalları eşit aralıklı bir Arşimet spirali durur.",
      formula: "r(θ) = r₀ · φ<sup>θ/90°</sup> = r₀ · e<sup>bθ</sup>,  b = ln φ / (π/2) ≈ 0,306 rad⁻¹",
      formulaNote: "Bu sayfadaki toplar aynı eğrinin 45° aralıklı örnekleridir: n. top r<sub>n</sub> = 0,1 · φ<sup>n/2</sup> birimde, yani her adımda √φ ≈ 1,272 kat uzakta.",
    },
    {
      heading: "Altın açı: en irrasyonel sayının işi",
      body:
        "φ'yi sürekli kesir olarak yazarsan içinde yalnızca birler vardır: 1 + 1/(1 + 1/(1 + …)). Kesirli yaklaşımları Fibonacci oranlarıdır ve paydaya göre ölçüldüğünde bunlar bir irrasyonel sayıya olabilecek en kötü yaklaşımlardır; bu anlamda φ 'en irrasyonel' sayıdır. Tam turu altın oranda bölersen küçük parça 360°/φ² ≈ 137,5° olur. Her yeni tohumu bir öncekinden bu kadar döndürüp merkezden √n ile orantılı uzağa koyan basit model (Vogel, 1979) ayçiçeği başını şaşırtıcı bir sadakatle üretir: 34 adım sonraki tohum 13 tam turun yalnızca 4,7° gerisine, 55 adım sonraki 21 turun 2,9° ilerisine düşer; göz bu yakın komşuları birleştirip 34 ve 55 sarmal görür. Açıyı 137° ya da 138° yaptığında boşluklar ve kollar belirir. Sayfadaki toplar 45° adımla gider; 45° turu tam sekize böldüğü için hepsi sekiz düz ışına dizilir.",
      formula: "α = 360° / φ² = 360° · (1 − 1/φ) ≈ 137,508°",
      formulaNote: "1/φ² ≈ 0,382'nin kesirli yaklaşımları 1/3, 2/5, 3/8, 5/13, 8/21, 13/34, 21/55…: paydalar sarmal sayılarını verir.",
    },
    {
      heading: "Beşgen: φ'nin doğduğu yer",
      body:
        "Düzgün beşgende köşegenin kenara oranı tam φ'dir. Kanıtı iki benzer üçgendir: bir kenar ile iki köşegenin oluşturduğu ikizkenar üçgenin açıları 36°, 72°, 72°'dir; taban açılarından birini ikiye bölünce içinde aynı açılara sahip küçük bir kopyası belirir. Kenara s, köşegene d dersen benzerlik d/s = s/(d − s) verir; bu, Öklid'in aşırı ve orta oran tanımının ta kendisidir ve d/s = φ çıkar. Köşegenler ortada yeni, küçük bir beşgen bırakır; beşgen yıldız (pentagram) bu yüzden kendi içinde sonsuza kadar tekrar eder. Aynı gerçeği trigonometri de söyler: cos 36° = φ/2 ve cos 72° = 1/(2φ). Üç boyutta da öyle: ikosahedronun 12 köşesi, kenarları 2 ve 2φ olan, birbirine dik üç altın dikdörtgenin köşeleridir. Beş katlı simetri gördüğün yerde φ saklıdır.",
      formula: "d/s = φ,  cos 36° = φ/2 ≈ 0,809",
      formulaNote: "36° = 180°/5; beşgenin her iç açısı 108°, köşegenin kenarla yaptığı açı 36°'dir.",
    },
  ],
  lab: {
    intro:
      "Bu sayfada kaydırıcı ya da menü yok; yalnızca üç boyutlu bir sahne var. Kontroller farenin kendisi: <strong>sol tuşla sürükle</strong> sahneyi döndürür, <strong>tekerlek</strong> yakınlaştırıp uzaklaştırır, <strong>sağ tuşla sürükle</strong> kaydırır (dokunmatik ekranda tek parmak döndürür, iki parmak yakınlaştırır). Sahnenin üzerindeyken tekerlek ve parmak sayfayı kaydırmaz; deftere dönmek için üst çubuktaki kitap düğmesine bas. Kod, yarıçapı 0,2 birim olan 100 sarı top üretir: ilki merkezden 0,1 birim uzakta, her sonraki top bir öncekinden √φ ≈ 1,272 kat daha uzakta ve 45° daha dönmüş; kamera 20 birim geriden bakar. Toplar ayrıca yavaşça öne-arkaya salınır. Aşağıdaki sayılar doğrudan bu kuraldan hesaplandı; sen de 0,1 × φ<sup>n/2</sup> ile denetleyebilirsin (ilk top n = 0).",
    experiments: [
      {
        title: "Yüz toptan kaçı görünüyor?",
        predict: "Kod 100 top çiziyor. Sayfa açıldığında kaçını görebileceğini tahmin et: hepsini mi, yarısını mı, beşte birini mi?",
        do: "Sayfayı yenile, hiçbir şeye dokunmadan ekrandaki topları say. Merkezdeki iç içe geçmiş yumruyu tek tek saymaya çalışma; onu bir grup olarak al.",
        observe: "Geniş ekranda 22 top: ortada on kadar topun kaynaştığı bir yumru, çevresinde gittikçe seyrelen 12 top. Dik tutulan telefonda 20 dolayında. Kalan yaklaşık 80 top ekranın dışındadır.",
        explain: "Uzaklıklar toplanarak değil çarpılarak büyür: r<sub>n</sub> = 0,1 × φ<sup>n/2</sup>. n = 20'de 12,3 birim (solda), n = 21'de 15,6 birim (sol altta), n = 22'de 19,9 birim (tam aşağıda). Kamera 20 birim geriden, yukarı-aşağı yönde 20 × tan 37,5° ≈ 15,3 birimlik bir yarıçap görür; 19,9 buna sığmaz. Üstel büyümenin ölçüsü de son toptadır: n = 99 merkezden 2,2 milyar birim uzaktadır.",
      },
      {
        title: "Sekiz ışın, bir tam tur",
        predict: "Spiral deyince kıvrımlı bir eğri beklersin. Toplar düz çizgiler üzerine de dizilebilir mi? Aynı çizgideki iki komşu top arasında uzaklık kaç katına çıkar?",
        do: "Sahneye dokunmadan topların merkezden çıkan düz doğrular üzerinde olup olmadığına bak. Sağ ışında (saat 3 yönü) yumrunun dışındaki ilk topu bul; sonra tekerlekle uzaklaşıp aynı ışındaki bir sonrakini ara.",
        observe: "Toplar sekiz ışına dizilir: 0°, 45°, 90°… Sağ ışındaki toplar 0,1; 0,69; 4,70 ve 32,2 birimdedir: ilk ikisi yumrunun içinde ya da hemen kıyısında, üçüncüsü açıkta, dördüncüsü ancak uzaklaşınca görünür. Her biri bir öncekinden 6,85 kat uzaktadır.",
        explain: "45°, 360°'yi tam böler; sekiz adımda başa dönülür ve uzaklık (√φ)⁸ = φ⁴ ≈ 6,85 kat atlar. Bu, altın spiralin bir tam turdaki büyümesidir. Bitki 137,5° kullanır; bu açı tam turu hiçbir zaman eşit bölmez, o yüzden tohumlar ışın değil sarmal çizer.",
      },
      {
        title: "Ekrana cetvel tut: φ'yi ölç",
        predict: "Sağdaki açık toptan (saat 3) yukarıdakine (saat 12), oradan soldakine (saat 9) geçince merkeze uzaklık her seferinde kaç katına çıkar? Sağdaki ile yukarıdakinin uzaklıklarını toplarsan ne bulursun?",
        do: "Sayfa yeni açılmışken ekrana bir cetvel tut. Yumrunun merkezinden sağ ışındaki açık topa, tam yukarıdaki en dış topa ve tam soldaki en dış topa olan uzaklıkları milimetre olarak ölç; oranlarını al.",
        observe: "Yukarıdaki top sağdakinden yaklaşık 1,62 kat, soldaki 2,62 kat uzaktadır (sahne biriminde 4,70 → 7,60 → 12,30). Sağ ile yukarının toplamı solu verir: 4,70 + 7,60 = 12,30.",
        explain: "Çeyrek turda iki adım atılır: (√φ)² = φ. Bu, altın spiralin tanımıdır; yarım turda φ² olur. Toplamın tutması ise φ² = φ + 1 eşitliğinin cetvelle görülmüş hâlidir: uzaklıklar Fibonacci kuralına uyar. Ölçümün yüzde birkaç sapması toplar öne-arkaya salındığı ve kamera perspektifle baktığı içindir.",
      },
      {
        title: "Yandan bak: içeri akan dalga",
        predict: "Toplar düzlem içinde durmuyor; öne-arkaya salınıyor. Bir gidiş-dönüş kaç saniye sürer, komşu toplar aynı anda mı uca varır?",
        do: "Sol tuşla yatay sürükleyip sahneyi yandan görene kadar (90° kadar) döndür; spiral düzlemi kenardan görününce toplar dikey bir çizgiye yakın dizilir ve salınım sağa-sola gidip gelme olarak görünür. Bir topun aynı uca iki kez varışı arasındaki süreyi saatle ölç; sonra merkezdeki ve en dıştaki topların uca varış anlarını karşılaştır.",
        observe: "Her top yaklaşık 6,3 saniyede bir gidiş-dönüş yapar ve uçtan uca 1 birim (iki buçuk top çapı) yol alır. Dıştaki toplar içtekilerden önce uca varır; dalga dıştan merkeze doğru akıyor gibi görünür.",
        explain: "Kod z = 0,5·sin(t + 0,1·n) kullanır (t saniye, n topun sırası): genlik 0,5 birim, periyot 2π ≈ 6,28 s, her top bir öncekinden 0,1 radyan (5,7°) ileride. Ekrandaki 22 top arasında toplam faz farkı 2,1 radyan, yani yaklaşık 2,1 saniyedir; dalganın içeri akıyor görünmesinin tek sebebi bu gecikme zinciridir.",
      },
    ],
  },
  wow: [
    {
      title: "137,5° ve bitkisiz ayçiçeği",
      body:
        "Ayçiçeği başında gözün seçtiği sarmallar çoğunlukla iki yönde 34 ve 55, büyük başlarda 55 ve 89 ya da 89 ve 144 tanedir: ardışık Fibonacci sayıları. 1992'de Stéphane Douady ve Yves Couder bunu bitkisiz tekrarladı: silikon yağı dolu bir kabın ortasına düzenli aralıklarla bıraktıkları manyetik sıvı damlacıkları birbirini itip kenara doğru sürüklendi; damlatma yeterince sıklaşınca ardışık damlalar arasındaki açı kendiliğinden 137,5°'ye oturdu. Fibonacci bitkinin bilgisi değil, 'en boş yere yerleş' kuralının sonucuydu.",
    },
    {
      title: "Mil-kilometre çevirmek için Fibonacci yeter",
      body:
        "1 mil = 1,609 km, φ = 1,618; fark yalnızca binde beş. Bu yüzden ardışık iki Fibonacci sayısı neredeyse bir mil-kilometre tablosudur: 5 mil ≈ 8 km, 8 mil ≈ 13 km, 55 mil ≈ 89 km (gerçek değer 88,5 km). İngiltere'de bir yol levhasını kafadan kilometreye çevirmek için dizinin bir sonraki terimine atlamak yeter. Bu bir doğa yasası değil, hoş bir rastlantıdır: milin uzunluğunu φ belirlemedi.",
    },
    {
      title: "İmkânsız kristal, Nobel ve φ",
      body:
        "8 Nisan 1982 sabahı Dan Shechtman, bir alüminyum-mangan alaşımının elektron kırınım deseninde beş katlı simetriyle uyumlu, on noktalı halkalar gördü. Ders kitaplarına göre kristaller bunu yapamazdı; bulgusunu savunurken araştırma grubundan ayrılması istendi. Desen, Roger Penrose'un 1970'lerde bulduğu iki parçalı döşemenin akrabasıydı: o döşemede uçurtma ve ok parçalarının sayı oranı φ'dir ve yarı kristallerde atomlar arası kimi uzaklıkların oranı da altın orana bağlıdır. Shechtman 2011 Nobel Kimya Ödülü'nü aldı; 'yarı kristal' artık bir madde sınıfının adı.",
    },
  ],
  worked: {
    title: "89/55, φ'den ne kadar uzak?",
    prompt:
      "F<sub>n+1</sub> = F<sub>n</sub> + F<sub>n−1</sub>, F<sub>0</sub> = 0, F<sub>1</sub> = 1 dizisinin kapalı formülünü bul. Bununla 89/55 oranının φ'den farkını hesap makinesi kullanmadan kestir ve φ'yi altı ondalık basamak doğru veren (hata < 5 × 10⁻⁷) ilk Fibonacci oranını belirle.",
    steps: [
      "Çözümü F<sub>n</sub> = x<sup>n</sup> biçiminde ara: x<sup>n+1</sup> = x<sup>n</sup> + x<sup>n−1</sup> ⇒ x² = x + 1. Kökler φ = (1 + √5)/2 ≈ 1,618034 ve ψ = (1 − √5)/2 = −1/φ ≈ −0,618034. Denklem doğrusal olduğundan genel çözüm F<sub>n</sub> = A·φ<sup>n</sup> + B·ψ<sup>n</sup>'dir.",
      "Başlangıç koşulları: F<sub>0</sub> = 0 ⇒ A + B = 0; F<sub>1</sub> = 1 ⇒ A(φ − ψ) = 1. φ − ψ = √5 olduğundan A = 1/√5, B = −1/√5: Binet formülü. Denetim: F<sub>10</sub> = (122,9919 − 0,0081)/2,23607 = 55.",
      "Hatayı bul: F<sub>n+1</sub> − φ·F<sub>n</sub> = [φ<sup>n+1</sup> − ψ<sup>n+1</sup> − φ<sup>n+1</sup> + φ·ψ<sup>n</sup>]/√5 = ψ<sup>n</sup>(φ − ψ)/√5 = ψ<sup>n</sup>. İki yanı F<sub>n</sub>'ye böl: F<sub>n+1</sub>/F<sub>n</sub> − φ = ψ<sup>n</sup>/F<sub>n</sub>. ψ negatif olduğundan işaret her adımda değişir; büyüklüğü 1/(φ<sup>n</sup>·F<sub>n</sub>) ≈ 1/(√5·F<sub>n</sub>²).",
      "n = 10: 1/(√5 × 55²) = 1/(2,236 × 3025) ≈ 1/6764 ≈ 1,48 × 10⁻⁴; n çift olduğundan oran φ'nin üstündedir. Doğrudan: 89/55 = 1,618182, φ = 1,618034, fark 1,48 × 10⁻⁴.",
      "Altı basamak için 1/(√5·F<sub>n</sub>²) < 5 × 10⁻⁷ ⇒ F<sub>n</sub>² > 894 427 ⇒ F<sub>n</sub> > 946. Bunu sağlayan ilk terim F<sub>16</sub> = 987'dir: 1597/987 = 1,6180344, hata 4,6 × 10⁻⁷.",
    ],
    result:
      "89/55, φ'den yalnızca 1,48 × 10⁻⁴ büyüktür; 1597/987 altı basamağı tutturur. Hata paydanın karesiyle küçülür ve her adımda φ² ≈ 2,62 kat azalır; hiçbir adımda sıfır olmaz.",
  },
  misconceptions: [
    {
      myth: "Parthenon, piramitler, Mona Lisa ve insan bedeni altın orana göre kurulmuştur.",
      truth:
        "Hiçbiri için yapanın φ'yi hedeflediğini gösteren belge yoktur; iddialar 19. yüzyılda ortaya çıktı ve istenen oranı veren ölçüm noktalarını sonradan seçmeye dayanır (Markowsky, 1992). Büyük Piramit'te yan yüz yüksekliğinin taban yarısına oranı gerçekten 1,62'ye yakındır; ama bunu Mısırlıların eğim ölçüsü de açıklar: 14 birim yükseliş, 11 birim yatay (√(1 + (14/11)²) ≈ 1,619). 1,6 dolayında bir sayıya ulaşmak kolaydır; kanıt, ölçüm kuralını ölçmeden önce koymayı ister. Le Corbusier'nin Modulor'u gibi bilinçli tasarımlar vardır ama 20. yüzyıla aittir.",
    },
    {
      myth: "Nautilus kabuğu bir altın spiraldir.",
      truth:
        "Kabuk logaritmik bir spiraldir, bu doğru; ama altın spiral değildir. Altın spiral çeyrek turda φ ≈ 1,62 kat, tam turda 6,85 kat büyür. Ölçülen nautilus kabukları çeyrek turda 1,3 kat dolayında, tam turda yaklaşık 3 kat büyür; yarıçap ile teğet arasındaki açı da 73° değil 80° dolayındadır. İki eğriyi üst üste koyduğunda bir turdan kısa sürede ayrılırlar. Logaritmik spiral, biçimini bozmadan büyüyen her şeyin eğrisidir; büyüme çarpanının φ olması gerekmez.",
    },
    {
      myth: "Fibonacci dizisinde yeterince ilerlersen oran tam olarak 1,618 olur.",
      truth:
        "Hiçbir zaman. φ irrasyoneldir; iki tam sayının oranı ona ancak yaklaşır. Oranlar bir alttan bir üstten yaklaşır (1,5; 1,667; 1,6; 1,625; …) ve fark her adımda yaklaşık 2,6 kat küçülür ama sıfır olmaz. 1,618 de φ'nin kendisi değil, üç ondalık basamağa yuvarlanmış hâlidir; açılımı 1,6180339887… diye tekrarsız sürer.",
    },
    {
      myth: "Bitkiler Fibonacci sayılarını 'bilir'.",
      truth:
        "Bitki sayı saymaz. Büyüme noktasında yeni taslak, büyüme hormonu oksinin öncekiler tarafından en az tüketildiği yerde belirir; bu yerel kural çoğu zaman 137,5°'ye yakın açıyı, o da Fibonacci sayılarını doğurur. Douady ve Couder'in damlacıkları aynı deseni bitkisiz verir. Üstelik kural her zaman tutmaz: 2016'da yayımlanan, 657 ayçiçeği başının sayıldığı gönüllü bilim çalışmasında sarmal sayımlarının yaklaşık dörtte üçü Fibonacci sayısı çıktı; kalanların bir bölümü Lucas sayıları (1, 3, 4, 7, 11, 18, …) gibi akraba dizilere, bir bölümü hiçbirine uymadı.",
    },
  ],
  glossary: [
    { term: "Altın oran (φ)", definition: "(1 + √5)/2 ≈ 1,618; bir bütünün büyük parçaya oranının, büyük parçanın küçüğe oranına eşit olduğu bölme oranı; x² = x + 1 denkleminin pozitif kökü." },
    { term: "Aşırı ve orta oran", definition: "Öklid'in altın bölmeye verdiği ad: bütün büyük parçaya nasıl oranlanıyorsa, büyük parça küçüğe öyle oranlanır." },
    { term: "Fibonacci dizisi", definition: "1, 1, 2, 3, 5, 8, 13, …; her terimin önceki ikisinin toplamı olduğu dizi; ardışık terim oranları φ'ye yaklaşır." },
    { term: "Binet formülü", definition: "F<sub>n</sub> = (φ<sup>n</sup> − (−1/φ)<sup>n</sup>)/√5; Fibonacci sayılarını yineleme yapmadan veren kapalı ifade." },
    { term: "Logaritmik spiral", definition: "Açı eşit adımlarla artarken yarıçapın eşit katlarla büyüdüğü eğri, r = a·e<sup>bθ</sup>; yarıçapla teğet arasındaki açı her noktada aynıdır." },
    { term: "Altın açı", definition: "360°/φ² ≈ 137,5°; tam turun altın oranla bölünmesindeki küçük parça, pek çok bitkide ardışık yaprak ya da tohum taslakları arasındaki dönme açısı." },
    { term: "Filotaksi", definition: "Bitkilerde yaprak, tohum ve dalların gövde ya da çiçek tablası üzerindeki dizilim düzeni." },
    { term: "Sürekli kesir", definition: "Bir sayıyı iç içe kesirler olarak yazma biçimi; φ'ninki yalnızca birlerden oluşur: 1 + 1/(1 + 1/(1 + …))." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede φ bir ikinci derece denklemin köküdür; Lineer Cebir dersinde bir <strong>özdeğer</strong>: Fibonacci adımı (F<sub>n+1</sub>, F<sub>n</sub>) → (F<sub>n+1</sub> + F<sub>n</sub>, F<sub>n+1</sub>), satırları (1, 1) ve (1, 0) olan 2×2 matrisle çarpmaktır ve bu matrisin karakteristik denklemi λ² = λ + 1, özdeğerleri φ ile −1/φ'dir. Matrisi köşegenleştirip n'inci kuvvetini almak Binet formülünü verir; büyük özdeğer büyümeyi, küçük olan çözümlü örnekteki hatayı yönetir. Aynı yöntem Ayrık Matematik'teki her doğrusal yineleme bağıntısını, Diferansiyel Denklemler'deki sabit katsayılı denklemleri, nüfus modellerini ve Markov zincirlerini çözer. Sayılar Teorisi'nde φ, sürekli kesirlerin ve Diophantus yaklaşımının baş kahramanıdır: Hurwitz teoremi her irrasyonel α için |α − p/q| < 1/(√5·q²) koşulunu sağlayan sonsuz kesir olduğunu söyler ve √5 sabiti tam olarak φ yüzünden büyütülemez. Çözümlü örnekteki 1/(√5·F<sub>n</sub>²) hatası tam bu sınıra dayanır.",
      "Algoritma Analizi'nde φ en kötü durumun ölçüsüdür: Öklid algoritmasının adım sayısı için Lamé'nin 1844 tarihli sınırı ardışık Fibonacci sayılarından gelir (adım sayısı, küçük sayının basamak sayısının beş katını geçmez); n düğümlü bir AVL ağacının yüksekliği yaklaşık 1,44·log₂n'yi aşamaz ve 1,44 = 1/log₂φ'dir; Fibonacci yığınları adını buradan alır. Dinamik sistemlerde 'en irrasyonel' olmak bir dayanıklılık ölçüsüdür: Greene'in 1979'daki sayısal çalışması, frekans oranı altın oran olan düzenli yörüngenin, bozucu etki büyütüldüğünde en son parçalananlardan olduğunu gösterdi; KAM teorisi bu dayanıklılığın nedenini, oranın rasyonel sayılara ne kadar kötü yaklaştırılabildiğine bağlar. Katıhal fiziğinde ise Penrose döşemeleri ve yarı kristaller, periyodik olmadan düzenli olmanın φ ile nasıl mümkün olduğunu gösterir.",
    ],
    topics: ["Lineer Cebir: özdeğerler ve köşegenleştirme", "Ayrık Matematik: doğrusal yineleme bağıntıları", "Sayılar Teorisi: sürekli kesirler ve Diophantus yaklaşımı", "Algoritma Analizi: Öklid, AVL, Fibonacci yığını", "Aperiyodik döşemeler ve yarı kristaller", "Dinamik sistemler: KAM teorisi"],
  },
  quiz: [
    {
      question: "Hangi iddianın arkasında en sağlam kanıt vardır?",
      options: ["Parthenon'un cephesi altın dikdörtgendir", "Ayçiçeği başındaki sarmal sayıları çoğunlukla ardışık Fibonacci sayılarıdır", "Nautilus kabuğu altın spiraldir", "İnsanlar en çok altın dikdörtgeni güzel bulur"],
      answer: 1,
      explanation: "Ayçiçeği sayıları sayılabilir ve mekanizması (137,5°'ye yakın açıyla yerleşim) hem modelle hem Douady–Couder deneyiyle gösterilmiştir; yine de her başta tutmaz. Parthenon iddiası seçmeli ölçüme dayanır; nautilus turda yaklaşık 3 kat büyür, altın spiral 6,85 kat; dikdörtgen tercihi deneylerinin sonucu tutarsızdır.",
    },
    {
      question: "Sayfadaki spiralde aynı ışın üzerindeki iki komşu top arasında merkeze uzaklık kaç katına çıkar?",
      options: ["√φ ≈ 1,27 kat", "φ ≈ 1,62 kat", "φ⁴ ≈ 6,85 kat", "8 kat"],
      answer: 2,
      explanation: "Her top bir öncekinden 45° dönmüş ve √φ kat uzaktadır; aynı ışına dönmek sekiz adım sürer, dolayısıyla uzaklık (√φ)⁸ = φ⁴ ≈ 6,85 kat atlar. φ, çeyrek turdaki (iki adımdaki) büyümedir; 8 ise yalnızca adım sayısıdır.",
    },
    {
      question: "89/55 oranı φ'den yaklaşık 1,5 × 10⁻⁴ uzaktadır. Hesap yapmadan: 233/144'ün hatası yaklaşık ne kadardır?",
      options: ["7 × 10⁻⁵ (yaklaşık yarısı)", "5,6 × 10⁻⁵ (2,6 kat küçük)", "2,2 × 10⁻⁵ (6,85 kat küçük)", "1,5 × 10⁻⁶ (yüz kat küçük)"],
      answer: 2,
      explanation: "Hata 1/(√5·F<sub>n</sub>²) ile ölçeklenir. 55'ten 144'e iki adım vardır; payda her adımda φ kat, hata φ² kat değişir. İki adımda hata φ⁴ ≈ 6,85 kat küçülür: 1,48 × 10⁻⁴ / 6,85 ≈ 2,2 × 10⁻⁵. Doğrudan hesap da 1/(√5 × 144²) = 2,16 × 10⁻⁵ verir.",
    },
  ],
  next: [
    { href: "fibo.html", title: "Fibonacci: Kareler, Alan ve Eğrilik", why: "Fibonacci kenarlı kareleri döşe; çeyrek yayların eğriliğinin neden sıçradığını ve bu yüzden tam bir altın spiral olmadığını ölç." },
    { href: "sierpinski-fraktali-peano-egrisi-altin-oran.html", title: "Sierpiński, Peano ve Altın Oran Laboratuvarı", why: "Üçüncü sekmede r → 1 + 1/r yinelemesini istediğin başlangıçtan çalıştır; işaretli hatayı ve ardışık hataların oranını adım adım izle." },
    { href: "penrose-dosemesi.html", title: "Penrose Döşemesi Laboratuvarı", why: "Robinson üçgenlerini böl; iki türün sayı oranının φ'ye yaklaşmasını ve döşemenin neden ötelemeyle kendine çakışmadığını incele." },
    { href: "fibo+pascal.html", title: "Fibonacci ve Pascal: Aynı Döşemeyi İki Kez Say", why: "Bir şeridi kısa ve uzun taşlarla döşe; Fibonacci sayılarının Pascal üçgeninin eğik köşegenlerinden nasıl çıktığını gör." },
  ],
  sources: [
    { title: "MacTutor · The Golden Ratio", url: "https://mathshistory.st-andrews.ac.uk/HistTopics/Golden_ratio/", note: "Öklid'in aşırı ve orta oranından Pacioli'ye, Mästlin'in ilk ondalık hesabından Kepler'e tarihçe (İngilizce)." },
    { title: "Wolfram MathWorld · Golden Ratio", url: "https://mathworld.wolfram.com/GoldenRatio.html", note: "Sürekli kesir, Binet formülü, beşgen ve trigonometrik özdeşlikler; formül odaklı başvuru (İngilizce)." },
    { title: "Wikipedia · Golden ratio", url: "https://en.wikipedia.org/wiki/Golden_ratio", note: "Ohm, Barr ve Zeising'in rolü; Parthenon, piramit ve güzellik iddialarını Markowsky ve Livio'ya dayanarak tartan 'tartışmalı gözlemler' bölümü (İngilizce)." },
    { title: "Wikipedia · Phyllotaxis", url: "https://en.wikipedia.org/wiki/Phyllotaxis", note: "Yaprak ve tohum diziliminin mekanizması: Hofmeister kuralı, oksin ve Douady–Couder'in kendiliğinden örgütlenme çalışması (İngilizce)." },
    { title: "Nobel Prize · 2011 Kimya Ödülü basın duyurusu", url: "https://www.nobelprize.org/prizes/chemistry/2011/press-release/", note: "Dan Shechtman ve yarı kristallerin keşfi; 8 Nisan 1982 gözlemi ve altın oranla bağlantısı (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
