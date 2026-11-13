window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["geometrinin-temelleri"] = {
  slug: "geometrinin-temelleri",
  title: "Geometrinin Temelleri: Beş Kabulden Hacme",
  field: "Matematik",
  level: "Lise",
  minutes: 45,
  tagline:
    "Açılar, üçgenler, alan, benzerlik ve hacim: okul geometrisinin her formülü birkaç kabulden, kesip yeniden dizmekten ve ölçeklemekten çıkar. Sayfada her birini ölçüp nedenini görürsün.",
  hook:
    "Bir kulenin boyunu ona tırmanmadan bulabilirsin: kulenin gölgesi 60 m, yanındaki 1 metrelik çubuğun gölgesi 1,19 m ise kule yaklaşık 50 m'dir. Aynı akıl yürütme bir kâğıt üzerinde kusursuz çalışır, ama bir kürenin üzerinde bozulur: orada üç açısı da dik olan bir üçgen çizilebilir.",
  bigIdea:
    "Düzlem geometrisinin sonuçları paralellik kabulüne, eşlik ve benzerliğe dayanır: üçgenin açıları 180° eder, alan kesip dizmekle korunur, benzer şekillerde uzunluk k, alan k², hacim k³ katına çıkar; piramit ve kürenin hacmi ise ancak bir sınır süreciyle bulunur.",
  story: [
    "Öklid'in <em>Öğeler</em>'i MÖ 300 dolayında yazıldı. On üç kitaptan oluşur ve birkaç tanım, beş ortak kavram ve beş <strong>postulatla</strong> (kanıtsız kabul edilen önermeyle) başlar; sonraki yüzlerce önerme yalnızca bunlardan çıkarılır. Kitap ilk kez 1482'de Venedik'te basıldı ve basım sayısında yalnızca İncil'in onu geçtiği tahmin edilir. Bugün okulda öğrendiğin açı kuralları, üçgen eşliği, alan formülleri ve son kitaplardaki piramit ve koni hacimleri bu düzenin içinden gelir.",
    "Beşinci postulat ötekilere benzemiyordu: uzun ve apaçık olmaktan uzaktı. İki bin yılı aşkın bir süre onu ötekilerden türetmeye çalıştılar. Proklos (5. yüzyıl) Batlamyus'un ispatının hatalı olduğunu not etti ve kendi hatalı ispatını verdi; İbnü'l-Heysem, Ömer Hayyam, Nasirüddin Tusi ve 18. yüzyılda Girolamo Saccheri de denedi. John Playfair 1795'te postulatın bugün okullarda öğretilen eşdeğer biçimini yaydı: bir doğruya dışındaki bir noktadan tek bir paralel çizilir. Sonunda Lobaçevski 1829'da, János Bolyai 1831'de, paralelin tek olmadığı ve yine çelişkisiz olan bir geometri yayımladı; Gauss benzer sonuçlara varmış ama yayımlamamıştı. Eugenio Beltrami 1868'de beşinci postulatın ötekilerden bağımsız olduğunu kesin olarak gösterdi.",
    "Hacim ayrı bir zorluk çıkardı. Arşimet <em>Küre ve Silindir Üzerine</em>'de (MÖ 225 dolayı) kürenin, içine tam sığdığı silindirin hacminin 2/3'ü olduğunu ve yüzeyinin en büyük dairesinin dört katı olduğunu gösterdi; mezar taşına bir silindirle küre konmasını istediği anlatılır ve Cicero mezarı otlar arasında bu işaretten tanıdığını yazmıştır. 1635'te Bonaventura Cavalieri kesitleri karşılaştırma ilkesini kitaplaştırdı; 5. yüzyılda Çin'de Zu Chongzhi ve oğlu Zu Gengzhi küre hacmine benzer bir yoldan varmıştı. 1900'de David Hilbert'in açık problemler listesinin üçüncüsü şunu soruyordu: piramidin hacmi, alanda olduğu gibi kesip dizerek bulunabilir mi? Max Dehn'in 1901 tarihli makalesi cevabın hayır olduğunu gösterdi.",
  ],
  core: [
    {
      heading: "Paralellikten 180°'ye",
      body:
        "Bir kesen iki doğruyu kestiğinde sekiz açı oluşur. <strong>Ters açılar</strong> her zaman eşittir, çünkü ikisi de aynı komşu açının bütünleridir; bunun için paralellik gerekmez. <strong>Yöndeş</strong>, iç ters ve dış ters açıların eşitliği ise doğruların paralel olmasına bağlıdır (Öklid I.29). Üçgenin açı toplamı buradan çıkar: C köşesinden AB'ye paralel bir doğru çizersen, A ve B açılarının iç ters kopyaları C'nin iki yanına yerleşir ve üçü birlikte bir doğru açısı oluşturur. Bir köşeden çizilen köşegenler n kenarlı dışbükey çokgeni n − 2 üçgene böler.",
      formula: "∠A + ∠B + ∠C = 180° · n-gende iç açılar toplamı = (n − 2)·180°",
      formulaNote: "İspat, C'den geçen paralelin tek olmasına, yani beşinci postulata dayanır. Küre yüzeyinde paralel hiç yoktur ve toplam 180°'den büyüktür.",
    },
    {
      heading: "Eşlik, benzerlik ve Tales",
      body:
        "İki üçgenin eş olduğunu söylemek için altı ölçümün hepsine bakmak gerekmez: <strong>KAK</strong>, <strong>AKA</strong> ve <strong>KKK</strong> tek bir üçgen belirler. KKA belirlemez: ∠A dar ve b·sin A &lt; a &lt; b ise pergelle çizilen çember ışını iki yerde keser ve iki farklı üçgen çıkar. a ≥ b ise, yani açının karşısındaki kenar daha uzunsa, tek üçgen kalır; KKA'yı genel bir ölçüt olmaktan çıkaran iki çözümlü durumdur. Açılar toplamı sabit olduğundan iki açı üçüncüyü de verir; bu yüzden AA bir <strong>benzerlik</strong> ölçütüdür: biçim belli, boy serbesttir. Temel orantı teoremi (Tales) bunun en çok kullanılan sonucudur ve Öklid onu alanlarla ispatlar: DE ∥ BC ise DBE ve DCE üçgenleri aynı tabanlı ve aynı yükseklikli olduğundan alanları eşittir.",
      formula: "DE ∥ BC ⇒ |AD|/|AB| = |AE|/|AC| = |DE|/|BC| = t · Alan(ADE) = t²·Alan(ABC)",
      formulaNote: "Oranlar paralelin kestiği parçalar içindir; |AD|/|DB| = |AE|/|EC| ise t/(1 − t)'dir.",
    },
    {
      heading: "Alan: kesip yeniden dizmek",
      body:
        "Alan birim karelerle sayılır; geri kalan her formül parçaları taşımaktan çıkar. Paralelkenarın bir ucundan dik kesilen üçgen öbür uca taşınınca aynı taban ve yükseklikte bir dikdörtgen olur: yan kenar alana girmez. Üçgenin orta tabandan kesilen üst parçası bir orta nokta çevresinde 180° döndürülünce yüksekliği yarıya inmiş bir paralelkenar çıkar; yamukta aynı kesik tabanları toplar. Daireyi dilimleyip dilimleri ters yüz dizince şekil, genişliği çevrenin yarısı (πr), yüksekliği r olan bir dikdörtgene yaklaşır. π'nin tanımı çevre/çap oranıdır; dairenin alanında aynı sayının çıkması ise kanıtlanması gereken bir teoremdir.",
      formula: "A<sub>paralelkenar</sub> = b·h · A<sub>üçgen</sub> = b·h/2 · A<sub>yamuk</sub> = (b + c)·h/2 · A<sub>daire</sub> = πr · r = πr²",
      formulaNote: "h her zaman tabana dik yüksekliktir. Dilim düzenlemesi bir limit düşüncesidir; Arşimet onu iç ve dış çokgenlerle sıkıştırarak kesinleştirdi.",
    },
    {
      heading: "Ölçek ve dik üçgende oranlar",
      body:
        "Bir şekli k katına büyütürsen her uzunluk k, her küçük kare iki yönde birden büyüdüğü için alan k², her küçük küp üç yönde büyüdüğü için hacim k³ katına çıkar. Bu yüzden iki kat büyük bir heykel dört kat boya, sekiz kat bronz ister. Aynı benzerlik trigonometriyi doğurur: dar açısı α olan bütün dik üçgenler AA ile benzerdir, öyleyse karşı/hipotenüs oranı üçgenin boyuna değil yalnızca α'ya bağlıdır. Bu orana <strong>sinüs</strong> denir. Özel açıların tam değerleri çizimden gelir: kenarı 2 olan eşkenar üçgenin yarısı 1, √3, 2 kenarlı 30°–60°–90° üçgenidir.",
      formula: "sin α = karşı/hipotenüs · cos α = komşu/hipotenüs · tan α = karşı/komşu = sin α / cos α",
      formulaNote: "Tanım yalnız 0° &lt; α &lt; 90° için çalışır; her açıya genişletmek birim çemberin işidir.",
    },
    {
      heading: "Hacim: Cavalieri ve sınır süreci",
      body:
        "Her yükseklikte kesit alanları eşit olan iki cismin hacimleri eşittir (<strong>Cavalieri ilkesi</strong>); bu yüzden eğik prizma da dik prizma gibi taban × yüksekliktir. Piramitte kesit, tepeden uzaklığın karesiyle büyür. Cismi n katmana bölüp her katmanı üstündeki ya da altındaki kesitle doldurursan iki basamaklı toplam elde edersin; ikisi de Σk²/n³ biçimindedir ve n büyüdükçe 1/3'e yaklaşır. Dehn'in sonucu, piramitte kesip dizmenin tek başına yetmediğini gösterir. Küre için Arşimet'in fikri: yarım kürenin z yüksekliğindeki kesiti π(R² − z²), içinden koni oyulmuş silindirin kesiti πR² − πz²; her yükseklikte eşit oldukları için hacimler de eşittir. Lisansta aynı fikir kesit integrali olarak yazılır.",
      formula: "V = ∫<sub>0</sub><sup>h</sup> A(z) dz · V<sub>piramit</sub> = B·h/3 · V<sub>küre</sub> = (4/3)πR³ · S<sub>küre</sub> = 4πR²",
      formulaNote: "Piramitte tepeden z uzaklıktaki kesit A(z) = B·(z/h)² olduğundan integral B·h/3 verir; basamak toplamları bu integralin alt ve üst Riemann toplamlarıdır.",
    },
  ],
  lab: {
    intro:
      "Sayfa beş sekmeli bir laboratuvardır: <strong>01 · Açılar ve paralellik</strong> (paralel iki doğru ve bir kesen; üçgenin iç açıları ve kanıt adımları), <strong>02 · Eşlik ve benzerlik</strong> (verilenlerle kaç üçgen kurulabilir, Tales, ölçek k), <strong>03 · Alan</strong> (kes ve yeniden diz; çember ve daire), <strong>04 · Dik üçgende oranlar</strong> (aynı açı, farklı boy; gölgeyle yükseklik) ve <strong>05 · Hacim</strong> (Cavalieri, piramit ve koni basamakları, küpün üç piramidi, Arşimet'in silindiri). Açılar çizimdeki doğruların yönlerinden, alanlar ve hacimler ızgara noktaları sayılarak ölçülür; bu yüzden sayımlarda binde birkaç düzeyinde sapma görürsün. Dürüst bir not: 04'teki üçgenlerin kenarları sinüs ve kosinüsle kurulmuştur; o sekme sinüsü bağımsız olarak ölçmez, oranın boydan bağımsız olduğunu gösterir. Sekmelerin altında üç düzeyli alıştırma (ipucu ve adım adım çözümle) ve sekiz hata kartı vardır; yanıtlar hiçbir yere gönderilmez.",
    experiments: [
      {
        title: "Paralellik bozulunca hangi eşitlik yıkılır?",
        predict:
          "Alt doğruyu 8° eğersen yöndeş açılar yine eşit kalır mı? Ya ters açılar ve karşı durumlu iç açılar? Doğrular hangi tarafta kesişir?",
        do:
          "01 · Açılar ve paralellik sekmesinde varsayılanla başla (∠1 = 60°, çift “Yöndeş açılar (1 ve 5)”). “Doğrular paralel” kutusunu kaldır; eğim 8° olur. Sonra “Karşılaştırılan açı çifti” menüsünden “Ters açılar (1 ve 3)” ve “Karşı durumlu iç açılar (4 ve 5)” seç.",
        observe:
          "Paralelken ∠1 ve ∠5 ikisi de 60,0°, fark 0°. Kutuyu kaldırınca ∠5 52,0° olur, “ölçülen fark: 8,0°”, ve doğrular sağ tarafta kesişir. Ters açılarda fark 0° kalır. Karşı durumlu iç açılarda “ölçülen toplam: 172,0° · sapma 8,0°”.",
        explain:
          "Ters açıların eşitliği yalnız bir kesişme noktasına bakar, paralellik istemez. Yöndeş, iç ters ve karşı durumlu açıların ilişkileri ise iki ayrı doğruyu karşılaştırır ve paralelliğe dayanır; sapma tam olarak iki doğru arasındaki açıya eşittir. İç açıların toplamının 180°'den küçük kaldığı tarafta doğruların buluşması, beşinci postulatın kendisidir.",
      },
      {
        title: "KKA: aynı verilerle iki üçgen",
        predict:
          "∠A = 35°, b = 8, a = 5,5 verilirse kaç üçgen çizilebilir? a'yı 3,5'e indirir ya da 9'a çıkarırsan ne olur?",
        do:
          "02 · Eşlik ve benzerlik sekmesinde “KKA: iki üçgen” düğmesine bas. Sonra üçüncü kaydırıcıyı (a = |BC|) 3,5'e, ardından 9'a getir. Son olarak “KKA: teğet” düğmesine bas.",
        observe:
          "Kurulabilen üçgen sayısı 2: “a 5,50 · b 8,00 · c 3,52” (B 123,5°) ve “c 9,59” (B 56,5°). Durum satırı C'nin ışına uzaklığını 4,59 verir. a = 3,5'te 0 üçgen, a = 9'da 1 üçgen (c 14,30). Teğette (30°, 8, 4) tek bir dik üçgen: B 90,0°.",
        explain:
          "Pergelin çizdiği çember, yarıçapı a, merkezi C olan çemberdir; ışını iki, bir ya da sıfır yerde keser. Ayırıcı değer C'nin ışına uzaklığıdır: b·sin A = 8·sin 35° ≈ 4,59. İki çözümün B açıları 123,5° ve 56,5°, toplamları 180°: çember ışını, ikizkenar bir üçgenin taban köşelerinde keser. Bu yüzden KKA bir eşlik ölçütü değildir.",
      },
      {
        title: "Kesip dizmek ve daire dilimleri",
        predict:
          "Tabanı 6, yüksekliği 4 olan üçgeni kesip yeniden dizersen hangi şekil ve hangi alan çıkar? Daireyi 6 yerine 96 dilime bölünce dilimlerin toplam alanı değişir mi?",
        do:
          "03 · Alan sekmesinde “Şekil” menüsünden Üçgen seç ve “Kes ve taşı” kaydırıcısını %100'e getir. Sonra “Çemberin çevresi” bölümünde r = 3 iken “Dilim / kenar sayısı n” kaydırıcısını 6, 12 ve 96'ya getir; en son “Gösterim” menüsünden “İç ve dış çokgen” seçip n = 96'da bak.",
        observe:
          "Üçgen “Paralelkenar”a döner: taban 6,0, yükseklik 2,00, nokta sayımıyla alan 12,00 (formül 12,00). Dilimlerde dizilen şeklin genişliği n = 6'da 9,000, 12'de 9,317, 96'da 9,423 (πr = 9,425); yükseklik 2,598, 2,898, 2,998. Sayılan alan ise hep 28,3 dolayında kalır (n = 96'da 28,27). Çokgen kipinde 3,14103 &lt; π &lt; 3,14271.",
        explain:
          "Parçalar yalnız kayar ve döner, bu yüzden alan korunur. Dilimler hep aynı dairenin parçalarıdır, alanları n'ye bağlı değildir; değişen yalnızca dizilen şeklin dikdörtgene ne kadar benzediğidir. Genişlik n·r·sin(180°/n), yükseklik r·cos(180°/n) olduğundan ikisi de n büyüdükçe πr ve r'ye yaklaşır. Arşimet 96-genle π'yi 3 10/71 ile 3 1/7 arasına sıkıştırmıştı.",
      },
      {
        title: "Piramidin üçte biri ve Arşimet'in halkası",
        predict:
          "Taban 3 × 3, yükseklik 4 olan piramidi 5 katmanlı basamaklarla içten ve dıştan kuşatırsan hacim hangi iki sayı arasında kalır? Katman sayısı 60 olunca bu aralık ne kadar daralır?",
        do:
          "05 · Hacim sekmesinde “Piramit ve koni” bölümünde “Katman sayısı n”yi 5, 20 ve 60'a getir. Sonra Küre bölümünde R = 3, “Kesit yüksekliği z / R” = 0,6 iken iki kesiti karşılaştır.",
        observe:
          "n = 5: içteki basamaklar 8,640, dıştakiler 15,840, tam değer 12,000, aralık 7,200. n = 20: 11,115 ile 12,915. n = 60: 11,702 ile 12,302, yani taban × yüksekliğin 0,3250 ve 0,3417 katı. Kürede daire 18,10 cm², halka 18,10 cm²; sayılan küre hacmi 113,10 cm³ ve küre/silindir oranı 0,6667.",
        explain:
          "İki toplamın farkı tam olarak en alttaki katmandır (taban · h / n = 36/5 = 7,200), bu yüzden n büyüdükçe sıfıra iner ve iki toplam B·h/3'e sıkışır. Bu bir sınır sürecidir; Dehn'in teoremi piramitte kesip dizmenin tek başına yetmediğini gösterir. Kürede iki kesit her yükseklikte eşit olduğundan Cavalieri ilkesiyle yarım küre = silindir − koni = (2/3)πR³ olur.",
      },
    ],
  },
  wow: [
    {
      title: "Üç dik açılı üçgen",
      body:
        "Kuzey Kutbu'ndan aralarında 90° boylam farkı olan iki meridyen boyunca ekvatora in ve ekvatoru üçüncü kenar al: üç açının üçü de 90°, toplam 270°. Fazlalık (π/2 radyan) tam olarak bu üçgenin alanının R²'ye oranıdır; alan 4πR²'nin sekizde biri, yani πR²/2. Bir tarlanın açılarını ölçen biri 180° bulur, çünkü tarla Dünya'ya göre çok küçüktür.",
    },
    {
      title: "Alanda olan hacimde olmaz",
      body:
        "Alanları eşit iki çokgenden biri sonlu sayıda parçaya kesilip ötekine dönüştürülebilir (Bolyai–Gerwien). Hacimde bu bozulur: Max Dehn'in 1901 tarihli makalesi, aynı hacimli bir küp ile düzgün bir dörtyüzlünün düzlem yüzlü parçalara kesilip birbirine dönüştürülemeyeceğini gösterdi. Gauss da piramit formülünün ispatlarının bir sınır sürecine dayanmak zorunda kalmasından yakınmıştı.",
    },
    {
      title: "Arşimet'in mezar taşı",
      body:
        "Küre, içine tam sığdığı silindirin hacminin 2/3'üdür ve yüzeyi 4πR², silindirin yan yüzeyine (2πR · 2R) eşittir. Arşimet bu sonucu o kadar sevdi ki mezar taşına bir silindirle küre konmasını istedi; Cicero mezarı otlar arasında bu işaretten tanıdığını yazdı. Sayfada R = 3 cm iken hacim 113,10 cm³, yüzey 113,10 cm² çıkar: aynı sayı, iki farklı birim.",
    },
  ],
  worked: {
    title: "Gölgeyle kule yüksekliği ve ölçüm hatası",
    prompt:
      "Güneşin yükseklik açısı 40° iken bir kulenin gölgesi 60 m (tepenin yere izdüşümünden ölçülmüş), yere dik dikilen 1,0 m'lik çubuğun gölgesi 1,19 m'dir. (a) Kulenin yüksekliğini benzerlik ve tan ile bul. (b) Açıyı 1° yanlış okumak sonucu ne kadar değiştirir?",
    steps: [
      "Güneş ışınları paralel kabul edilir. Kule–gölge–ışın ile çubuk–gölge–ışın, ikisi de dik açılı ve aynı 40° açıyı paylaşan iki üçgendir; AA ile benzerdirler. Çubuğun gölgesi 1,0 m / tan 40° = 1,0 / 0,8391 = 1,19 m.",
      "Benzerlikten H / 60 m = 1,0 m / 1,1918 m, yani H = 60 · 1,0 / 1,1918 ≈ 50,3 m. (Yuvarlanmış 1,19 ile 50,4 m çıkar; ara sonuçları yuvarlamamak bu yüzden önemlidir.)",
      "Aynı sonucu tek adımda tan verir: H = 60 m · tan 40° = 60 · 0,8391 = 50,35 m ≈ 50,3 m. Benzerlik ve tan aynı bilginin iki yazılışıdır.",
      "Hata: H(α) = 60·tan α. 39° için 48,6 m, 41° için 52,2 m. Türevle: dH/dα = 60 / cos²α = 60 / 0,5868 ≈ 102,2 m/radyan; 1° = π/180 radyan olduğundan bir derece ≈ 1,78 m, yani yüksekliğin yaklaşık %3,5'i.",
    ],
    result:
      "H ≈ 50,3 m; açıdaki 1° hata yüksekliği yaklaşık ±1,8 m kaydırır. Sayfada 04 · Dik üçgende oranlar sekmesinde güneşi 40°, 39° ve 41°'ye getirerek 50,3 m, 48,6 m ve 52,2 m değerlerini görebilirsin.",
  },
  misconceptions: [
    {
      myth: "Kenarları 3 katına çıkan bir şeklin alanı da 3 katına çıkar.",
      truth:
        "Alan iki uzunluğun çarpımıdır, ikisi de 3 katına çıkar: alan 9, hacim 27 katına çıkar. 02 sekmesinde k = 3 seçince sayımlar 3,000, 9,000 ve 26,979 (kuram 27,000) verir.",
    },
    {
      myth: "İki kenarı ve bir açısı eşit olan iki üçgen eştir.",
      truth:
        "Açı iki kenarın arasındaysa (KAK) evet. Açı kenarlardan birinin karşısındaysa (KKA) hayır: ∠A = 35°, b = 8, a = 5,5 ile c = 3,52 ve c = 9,59 olan iki farklı üçgen kurulur.",
    },
    {
      myth: "Paralelkenarın alanı taban çarpı yan kenardır.",
      truth:
        "Alan taban çarpı tabana dik yüksekliktir. Eğik yan kenar yükseklikten uzundur; 03 sekmesinde kaymayı değiştirdiğinde yan kenar uzar ama sayılan alan 24,00'te kalır.",
    },
    {
      myth: "Ters açıların eşit olması için doğruların paralel olması gerekir.",
      truth:
        "Ters açılar tek bir kesişme noktasında oluşur ve ikisi de aynı açının bütünleridir; her zaman eşittir. Paralellik yalnız iki ayrı doğrudaki açıları (yöndeş, iç ters, karşı durumlu) bağlar.",
    },
  ],
  glossary: [
    { term: "Postulat (aksiyom)", definition: "Kanıtsız kabul edilen ve öteki önermelerin ondan türetildiği başlangıç önermesi." },
    { term: "Playfair aksiyomu", definition: "Bir doğruya dışındaki bir noktadan tek bir paralel çizilebileceğini söyleyen, beşinci postulatın eşdeğer biçimi." },
    { term: "Yöndeş açılar", definition: "Bir kesenin iki doğruyla yaptığı, kesenin aynı yanında ve doğrulara göre aynı konumda duran açı çifti." },
    { term: "Eşlik (≅)", definition: "Biri taşınarak ve döndürülerek ötekinin üzerine tam oturabilen iki şeklin ilişkisi." },
    { term: "Benzerlik (∼)", definition: "Karşılık gelen açıları eşit, karşılık gelen kenarları aynı k oranında olan iki şeklin ilişkisi." },
    { term: "Açı fazlası", definition: "Küre üzerindeki bir üçgenin açıları toplamının 180°'yi aşan kısmı; radyan cinsinden alan/R²'ye eşittir." },
    { term: "Cavalieri ilkesi", definition: "Her yükseklikteki kesit alanları eşit olan iki cismin hacimlerinin eşit olduğunu söyleyen ilke." },
    { term: "Tüketme yöntemi", definition: "Bir alanı ya da hacmi içten ve dıştan gittikçe yaklaşan şekillerle sıkıştırarak bulan eski Yunan sınır yöntemi." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın üç fikri lisansta yeni adlarla döner. Ölçeklemede k² ve k³, lineer cebirde bir dönüşümün alanı ve hacmi determinantı kadar büyütmesi olur. Cavalieri'nin kesitleri, Kalkülüs derslerinde V = ∫A(z)dz kesit integraline ve dönel cisimlerin hacmine dönüşür; piramidin basamakları da Riemann toplamlarının ilk örneğidir. Dik üçgendeki oranlar birim çemberle her açıya genişler ve dalgaların, dönmelerin dili olur.",
      "Paralellik postulatının hikâyesi diferansiyel geometride sürer: kürede açı fazlasının alanla orantılı olması, Gauss–Bonnet teoreminin en basit hâlidir ve eğriliği tanımlamanın bir yoludur. Fizikte ve mühendislikte ölçekleme yasaları aynı hesaba dayanır: bir yapının ağırlığı k³ ile, onu taşıyan kesit k² ile büyür. Teknik çizim, yer ölçmeciliği ve bilgisayar grafiği de benzer üçgenler ve açı ölçümüyle çalışır.",
    ],
    topics: ["Analitik geometri", "Lineer cebir: determinant", "Kalkülüs: kesit integrali", "Riemann toplamları", "Diferansiyel geometri", "Ölçekleme yasaları"],
  },
  quiz: [
    {
      question:
        "Bir heykelin maketi her yönde 3 kat büyütülerek dökülecek. Maketi boyamak 0,5 L boya, dökmek 2 kg bronz istiyordu. Büyük heykel için ne gerekir?",
      options: ["1,5 L boya, 6 kg bronz", "4,5 L boya, 18 kg bronz", "4,5 L boya, 54 kg bronz", "9 L boya, 54 kg bronz"],
      answer: 2,
      explanation:
        "Boya yüzeyle, yani alanla ölçeklenir: 3² = 9 kat, 0,5 · 9 = 4,5 L. Bronz hacimle ölçeklenir: 3³ = 27 kat, 2 · 27 = 54 kg. Uzunluk k, alan k², hacim k³.",
    },
    {
      question:
        "KKA kurulumunda ∠A = 35° ve b = 8 sabit. a = |BC| aşağıdakilerden hangisi olursa iki farklı üçgen çizilebilir?",
      options: ["a = 4", "a = 6", "a = 8,5", "a = 12"],
      answer: 1,
      explanation:
        "C'nin ışına uzaklığı b·sin A = 8·sin 35° ≈ 4,59. Çember ışını iki yerde (A'nın önünde) kesmek için a bu uzaklıktan uzun, b'den kısa olmalı: 4,59 &lt; a &lt; 8. a = 4'te üçgen yok; a = 8,5 ve 12'de tek üçgen var.",
    },
    {
      question:
        "R = 3 cm olan kürenin hacmi 113,10 cm³, yüzeyi 113,10 cm² çıkıyor. R = 6 cm olunca ne olur?",
      options: [
        "İki sayı yine eşit kalır",
        "Hacim 904,78 cm³, yüzey 452,39 cm²",
        "Hacim 452,39 cm³, yüzey 904,78 cm²",
        "İkisi de 4 katına çıkar",
      ],
      answer: 1,
      explanation:
        "Yarıçap 2 katına çıkınca hacim 2³ = 8, yüzey 2² = 4 katına çıkar: 113,10 · 8 = 904,78 cm³ ve 113,10 · 4 = 452,39 cm². R = 3'teki eşitlik birimler yüzünden bir rastlantıdır: V/S = R/3, ve cm³ ile cm² zaten karşılaştırılamaz.",
    },
  ],
  next: [
    { href: "pisagor.html", title: "Pisagor Teoremi: Kanıtlar, Üçlüler ve Eğri Yüzey", why: "Basamağın sıradaki adımı: alanlarla Pisagor kanıtları, açı 90°'den sapınca kosinüs teoremi ve küre üzerinde dik üçgen." },
    { href: "birim-cember.html", title: "Birim Çember: Sinüs, Kosinüs ve Dönmeler", why: "Dik üçgende tanımlanan sinüs ve kosinüs burada her açıya genişler; dalgalar ve dönmeler bu tanımdan çıkar." },
    { href: "konik-kesitler.html", title: "Konik Kesitler: Elips, Parabol ve Hiperbol", why: "Hacim sekmesindeki koniyi bu kez eğik düzlemlerle kesersin: çember, elips, parabol ve hiperbol çıkar." },
    { href: "riemann-toplamlari.html", title: "Riemann Toplamları ve Sayısal İntegral", why: "Piramidin iç ve dış basamakları burada genel bir yönteme döner: alanı dikdörtgen, yamuk ve parabollerle ölçüp hatanın n ile nasıl küçüldüğünü görürsün." },
  ],
  sources: [
    { title: "Euclid's Elements (Wikipedia)", url: "https://en.wikipedia.org/wiki/Euclid%27s_Elements", note: "MÖ 300 dolayı, 13 kitap, 1482 Venedik baskısı; XII. kitapta tüketme yöntemiyle piramit, koni ve silindir hacimleri." },
    { title: "Parallel postulate (Wikipedia)", url: "https://en.wikipedia.org/wiki/Parallel_postulate", note: "Beşinci postulatı ispat girişimleri (Proklos, İbnü'l-Heysem, Hayyam, Tusi, Saccheri), Playfair 1795, Lobaçevski 1829, Bolyai 1831, Beltrami 1868." },
    { title: "Hilbert's third problem (Wikipedia)", url: "https://en.wikipedia.org/wiki/Hilbert%27s_third_problem", note: "1900'de sorulan problem, Dehn'in 1901 makalesi, küp ve düzgün dörtyüzlü, Bolyai–Gerwien teoremi, Gauss'un sınır süreci üzerine yakınması." },
    { title: "Cavalieri's principle (Wikipedia)", url: "https://en.wikipedia.org/wiki/Cavalieri%27s_principle", note: "Cavalieri'nin 1635 kitabı, Zu Chongzhi ve Zu Gengzhi, yarım küre = silindir − koni kesit karşılaştırması." },
    { title: "On the Sphere and Cylinder (Wikipedia)", url: "https://en.wikipedia.org/wiki/On_the_Sphere_and_Cylinder", note: "MÖ 225 dolayı; küre/silindir hacim oranı 2/3, yüzey 4πr², mezar taşı ve Cicero'nun mezarı bulması." },
  ],
  revision: "Kasım 2026",
};
