window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["basit-makineler"] = {
  slug: "basit-makineler",
  title: "Basit Makineler: Kuvvetin Yol Bedeli",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 30,
  tagline: "Bir yükü daha küçük kuvvetle kaldırmak için neyi artırırsın? Palanga, eğik düzlem, çark–mil ve vidada yol, tork ve enerji hesabını aynı ilkeyle birleştir.",
  hook: "100 kg'lık bir yükü yaklaşık 13 N teğet kuvvetle kaldıran bir vida düşün. Bu sayı bir enerji mucizesi değil: elin metrelerce giderken yük yalnız milimetrelerce ilerler. Küçülen kuvvetin bedelini nerede ödediğini dört mekanizmada bul.",
  bigIdea: "Bir basit makine, hareketin geometrisini değiştirerek kuvvet ile yolu değiş tokuş eder; kayıplar varsa giriş işi, yükün kazandığı enerjiden büyüktür.",
  story: [
    "Roma dönemi mimarı Vitruvius, <em>Mimarlık Üzerine</em> adlı eserinin X. kitabının ikinci bölümünde yapı taşlarını yükselten düzenekleri anlatır: üst ve alt bloklardan geçirilen ip, bir mile sarılır; kol çevrildikçe taş yükselir. Üçüncü bölümde doğrusal ve dairesel hareketin birlikte çalışmasını tartışır. Bu, makinelerin tek bir kişi tarafından bir anda icat edildiği hikâyesi değil, kullanılan mekanizmaların yazılı bir kaydıdır.",
    "Vitruvius'un tarifindeki ip, makara ve mil burada ayrı deneylere dönüşüyor. Modern iş hesabıyla soruyu keskinleştirebiliriz: 40 kg yükü 1 m yükseltmek, g = 9,81 m/s² ile 392,4 J enerji ister. İdeal altı kollu palangada 65,4 N kuvveti 6 m boyunca uygulamak tam bu enerjiyi sağlar. Kolları artırmak kuvveti azaltır; aynı yük ve yüksekliğin enerji gereksinimini silmez.",
    "Gerçek mekanizmada ip bükülür, yataklar sürtünür, parçalar ısınır. Bu sayfa palanga, çark–mil ve vidanın bütün kayıplarını seçilen bir toplam verimle temsil ediyor. Eğik düzlemde ise sürtünme kuvveti ayrıca hesaplanıyor. Bu iki yaklaşımı ayırmak, ideal bir bağıntıyı bir makinenin ölçülmüş performansı sanmayı önler."
  ],
  core: [
    {
      heading: "Kuvvet kazancı ile verim farklı oranlardır",
      body: "Yükün ağırlığı mg, giriş kuvveti F olsun. <strong>Mekanik kazanç</strong> mg/F, kuvvetlerin oranıdır; <strong>verim</strong> ise yararlı çıkış işinin giriş işine oranıdır. Sayfadaki hareketler sabit hızla gerçekleştiğinden yükün kinetik enerjisi değişmez; yararlı çıktı mgh'dir. Kuvvetler yol boyunca sabit ve kendi hareket yönleriyle paralel olduğunda giriş işi Fs olur. Pozitif iş ve yükselme için η = mgh/(Fs) eşitliğini düzenleyince mg/F = ηs/h çıkar. Kuvvet kazancı birden büyük olabilir; bu, verimin birden büyük olduğu anlamına gelmez.",
      formula: "W<sub>giriş</sub> = Fs = mgh + W<sub>kayıp</sub><br>η = mgh/(Fs), &nbsp; M = mg/F = η(s/h)",
      formulaNote: "F newton, s ve h metre, işler joule; M ve η boyutsuzdur. Sıfır giriş işinde η oranı tanımsızdır. Kayıp, enerjinin yok olması değil bu modelde iç enerjiye aktarılmasıdır."
    },
    {
      heading: "Palangada sayılacak şey destek kollarıdır",
      body: "İdeal, tek kesintisiz ip kütlesiz ve uzamaz; sürtünmesiz makaralardan geçerken her koldaki gerilim T aynıdır. Yükü taşıyan n düşey kol varsa sabit hızda nT = mg; serbest uç kuvveti F = T olur. Yük dh kadar yükselince n destek kolunun toplam boyu n dh kısalır. İpin toplam boyunu korumak için serbest uçta ds = n dh gerekir. Böylece aynı n hem kuvvet oranını hem yol oranını belirler. Sabit bir makara yalnız yönü değiştirir: n = 1. Makaraların toplam sayısını saymak, destek kollarını saymanın yerini tutmaz.",
      formula: "nT = mg, &nbsp; F<sub>ideal</sub> = mg/n<br>s = nh, &nbsp; F = mg/(nη)",
      formulaNote: "Son bağıntı sayfanın toplu verim modelidir; η < 1 iken ayrı ip gerilimleri hesaplanmaz. Yük kütlesine hareketli blok da dahildir."
    },
    {
      heading: "Eğik düzlemde kaybı kuvvetlerden çıkar",
      body: "Kutu yüzeye paralel çekilerek sabit hızla yukarı kayarken ağırlığın yüzeye dik bileşeni mg cos θ, aşağı yönlü paralel bileşeni mg sin θ'dır. Normal kuvvet N = mg cos θ; kinetik sürtünme fₖ = μₖN aşağı yönlüdür. Paralel kuvvet dengesi F = mg sin θ + μₖmg cos θ verir. L yolunun düşey karşılığı h = L sin θ olduğundan sürtünme kaybı μₖmgL cos θ'dır. Sabit bir h'ye ulaşmak için L = h/sin θ yazıldığında kayıp μₖmgh cot θ olur: daha sığ bir rampa, bu ideal sürtünme modelinde aynı yüksekliğe çıkarken daha çok enerji kaybettirir.",
      formula: "F = mg(sin θ + μₖ cos θ)<br>η = sin θ/(sin θ + μₖ cos θ)",
      formulaNote: "Verim formülü giriş işi pozitifken geçerlidir. μₖ ampirik, boyutsuz bir kinetik sürtünme katsayısıdır; harekete başlama eşiğini vermez. L sabitken θ'yı değiştirmek, aynı h karşılaştırması değildir."
    },
    {
      heading: "Çark ve vida: dönmeyi yola çevirmek",
      body: "Çark ile mil aynı φ açısı kadar döner. Büyük yarıçap R'de giriş yolu Rφ, küçük yarıçap r'de yük yolu rφ olur; ideal tork dengesi FR = mgr'dir. Tek ağızlı vidada ise bir tam turda el 2πR yol alırken yük p kadar ilerler. İdeal durumda bir tur için F·2πR = mgp yazmak kuvveti verir. q turda φ = 2πq'dur. Sayfadaki p kontrolü milimetre gösterir; formüle metre olarak girer. p burada tek ağızlı vidanın hem adımı hem bir tur ilerlemesidir; çok ağızlı vidada bu iki uzunluk aynı olmak zorunda değildir.",
      formula: "Çark–mil: M<sub>ideal</sub> = R/r<br>Vida: M<sub>ideal</sub> = 2πR/p<br>τ<sub>vida,giriş</sub> = mgp/(2πη)",
      formulaNote: "R'yi artırmak vidanın giriş kuvvetini azaltır, sabit p ve η için gerekli torku azaltmaz. Tork N·m ile, dönme işi ∫τ dφ joule ile ifade edilir; aynı boyut farklı nicelikleri özdeş yapmaz."
    },
    {
      heading: "Sanal iş: dört düzenek için bir denklem",
      body: "İdeal, kayıpsız ve tek bağımsız hareketi olan düzeneği çok küçük, geometrik kısıtla uyumlu bir miktar ilerlet. Giriş kuvvetinin işi F ds, yükün enerji artışı mg dh olmalıdır. h = h(s) ise F = mg dh/ds çıkar. Palangada dh/ds = 1/n; rampada sin θ; çark–milde r/R; vidada p/(2πR). Dört ayrı kuvvet formülü tek bir geometrik türevden doğar. Bu, <strong>sanal iş</strong> yaklaşımının bu sistemlerdeki karşılığıdır. Verimle kurulan toplu kayıp modeli ya da kinetik sürtünme ayrıca eklenir; ideal bağıntı tek başına gerçek kayıpları tahmin etmez.",
      formula: "F ds = mg dh &nbsp; ⇒ &nbsp; F = mg·dh/ds<br>Dönme için: δW = τ δφ",
      formulaNote: "Burada kuvvet ve tork hareket boyunca işi sağlayan yönleriyle kullanılır. Sabit hız/kayıpsızlık varsayımı esastır; ivmelenen parçaların kinetik enerjisini eklemeden bu dengeyi dinamiğe taşıyamazsın."
    }
  ],
  lab: {
    intro: "Dört sekmede de <strong>Bu deneyi sıfırla</strong> düğmesi yalnız o deneyi varsayılanlarına döndürür. Kartlar kuvveti ve oranları, alttaki tablo yolları ve işleri verir. Renkli çubuk bir enerji bütçesidir; fiziksel ölçüm veya zamanla çalışan bir animasyon değildir. g her deneyde 9,81 m/s². Aşağıdaki sonuçlar kuramsal hesaplardan gelir; son basamaklarda ekrandaki yuvarlama uygulanmıştır.",
    experiments: [
      {
        title: "Dört kolun kazancı neden 3,2?",
        predict: "Dört destek kolu ve %80 verim, yük/çekme kuvveti oranını 4 mü yoksa daha küçük mü yapar?",
        do: "Palanga sekmesinde Bu deneyi sıfırla: Yük kütlesi m = 40 kg, Destekleyici ip kolu n = 4, Yükselme h = 1 m, Seçilen toplam verim η = 0,8. Kartları ve giriş yolu satırını oku. Sonra η'yı 1 yap; ardından n menüsünden 6 kol seç. m ve h değişmesin.",
        observe: "Başta ideal kuvvet 98,1 N, verime göre kuvvet 122,625 N; geometrik kazanç 4, yük/çekme oranı 3,2'dir. 4 m ip çekilir: 490,5 J = 392,4 J + 98,1 J. η = 1 ve n = 4 iken kuvvet 98,1 N, kayıp 0 olur. n = 6'da kuvvet 65,4 N, giriş yolu 6 m; giriş ve yararlı iş yine 392,4 J'dir.",
        explain: "M = ηn = 0,8·4 = 3,2. İdeal durumda ek destek kolları kuvveti düşürürken aynı oranda ip yolu ekler. Sayfadaki seçilen η, daha çok gerçek makaranın otomatik olarak aynı verimde çalışacağını iddia etmez."
      },
      {
        title: "Rampadaki 271,8627 joule nereye gider?",
        predict: "Açı ve yol sabitken sürtünmeyi kaldırmak yükselmeyi değiştirir mi; hangi enerji terimi sıfırlanır?",
        do: "Eğik düzlem sekmesinde Bu deneyi sıfırla: m = 40 kg, Düzlem boyunca yol L = 4 m, Eğim θ = 30°, Kinetik sürtünme μₖ = 0,2. Normal ve sürtünme satırlarını oku. μₖ'yı 0'a indir. Son olarak μₖ'yı yeniden 0,2 yapıp θ'yı 90°'ye getir.",
        observe: "Başta h = 2 m, N = 339,8284 N ve fₖ = 67,9657 N. Çekme kuvveti 264,1657 N, giriş işi 1.056,6627 J, yararlı enerji 784,8 J, kayıp 271,8627 J; hesaplanan iş verimi %74,2716. μₖ = 0 iken F = 196,2 N, kayıp 0 ve verim %100; h yine 2 m. Düşey 90° sınırında N = fₖ = 0, F = 392,4 N, h = 4 m; giriş ve yararlı iş 1.569,6 J olur.",
        explain: "Yukarı kaymada sürtünme yerçekiminin paralel bileşenine eklenir. Kayıp fₖL = 67,965673689·4 ≈ 271,8627 J'dir. Düşey sınırda paralel çekiş yüzeye bastırmadığı için bu modelin normal kuvveti sıfırlanır. 30° ile 90° karşılaştırmasında L sabit, h farklıdır."
      },
      {
        title: "Çarkı büyüt: kuvvet yarıya, yol ikiye",
        predict: "Çarkın yarıçapı iki katına çıkarken mil aynı kalırsa bir turdaki yükselme, giriş torku ve iş nasıl değişir?",
        do: "Çark–mil sekmesinde Bu deneyi sıfırla: m = 20 kg, Çark yarıçapı R = 0,4 m, Mil yarıçapı r = 0,1 m, Dönüş sayısı q = 1 tur, η = 0,8. Yalnız Çark yarıçapı R'yi 0,8 m yap; Mil yarıçapı r'yi değiştirme.",
        observe: "Verime göre çekme kuvveti 61,3125 N'dan 30,6563 N'a iner. Giriş yolu 2,5133 m'den 5,0265 m'ye çıkar. Düşey yükselme iki durumda da 0,6283 m, giriş torku 24,525 N·m'dir. Giriş işi 154,0951 J, yararlı enerji 123,2761 J, kayıp 30,819 J olarak kalır. Geometrik kazanç 4'ten 8'e; yük/çekme oranı 3,2'den 6,4'e çıkar.",
        explain: "Yükün yolu r·2π olduğu için sabit r ve bir turda değişmez. R iki katına çıkınca F yarıya iner, böylece FR torku ve Fs işi korunur. Mil yarıçapını büyütmek aynı deney olmaz: o, bir turda yükselen yüksekliği de değiştirir."
      },
      {
        title: "Vidanın adımını yarıya indir, turu ikiye çıkar",
        predict: "Aynı yükü aynı 10 mm yüksekliğe kaldırırken daha ince adım, toplam giriş işini azaltır mı?",
        do: "Vida sekmesinde Bu deneyi sıfırla: m = 100 kg, Kol yarıçapı R = 0,2 m, Bir tur ilerleme p = 5 mm, Dönüş sayısı q = 2 tur, η = 0,3. Sonra p'yi 2,5 mm, q'yu 4 tur yap. Diğerlerini koru.",
        observe: "İlk durumda çekme kuvveti 13,0109 N, giriş torku 2,6022 N·m, el yolu 2,5133 m'dir. İkinci durumda bunlar 6,5055 N, 1,3011 N·m ve 5,0265 m olur. Her ikisinde h = 0,01 m = 10 mm; enerji bütçesi 32,7 J = 9,81 J + 22,89 J'dir. Geometrik kazanç 251,3274'ten 502,6548'e çıkar.",
        explain: "p yarıya inince kuvvet ve tork yarıya iner; aynı h = pq için tur sayısı iki katına çıkar. İş, tork ile açının çarpımıdır ve aynı kalır. Bu sonuç η'nın sabit tutulduğu modele aittir; gerçek bir vidanın adım değişikliğinin verimi veya kilitlenmesi burada hesaplanmaz."
      }
    ]
  },
  wow: [
    { title: "Daha uzun kol, aynı giriş torku", body: "Vida sekmesini sıfırla; yalnız Kol yarıçapı R değerini 0,2 m'den 0,4 m'ye çıkar. Kuvvet 13,0109 N'dan 6,5055 N'a iner; fakat giriş torku iki durumda da 2,6022 N·m'dir. El yolu 2,5133 m'den 5,0265 m'ye çıkar, giriş işi 32,7 J kalır. Sabit adım ve verimde uzun kol aynı torku daha küçük kuvvetle üretir; vidanın gerektirdiği torku küçültmez." },
    { title: "Kuvvet oranı 5, yükseltme verimi sıfır", body: "Eğik düzlemde m = 40 kg, L = 4 m, θ = 0° ve μₖ = 0,2 seç. 78,48 N kuvvetle yatay kayma vardır; mg/F = 5 olmasına rağmen yükselme h = 0'dır. Girişteki 313,92 J'nin tamamı sürtünme kaybıdır; yükseltme için tanımlanan iş verimi %0. Geometrik yükseltme kazancı bu sınırda tanımlı değildir." },
    { title: "Yol sıfırsa %80, ölçülmüş bir oran değildir", body: "Palangada varsayılan m = 40 kg, n = 4 ve seçilen η = 0,8 değerlerini koruyup h = 0 yap. Modelin gerekli kuvveti hâlâ 122,625 N'dur; fakat s = 0 ve iki iş de 0 J olur. Tablodaki hesaplanan iş verimi 0/0 olduğu için “—” görünür. Girilen model parametresi ile bir hareketten hesaplanan oran farklıdır. Gösterilen kuvvet yukarı hareket modelinin değeridir; sürtünmeli gerçek düzeneği hareketsiz tutmak için gereken kuvvet bu η hesabından belirlenmez." }
  ],
  worked: {
    title: "200 N sınırı için kaç destek kolu?",
    prompt: "80 kg toplam yükü sabit hızla 1,5 m kaldırmak istiyorsun. Toplu verim η = 0,8 ve g = 9,81 m/s². Sayfadaki 1, 2, 4 ve 6 destek kolu seçeneklerinden hangisi giriş kuvvetini 200 N'ı aşmadan sağlar? Giriş yolunu, işi ve kaybı bul. 200 N burada verilen bir tasarım sınırıdır; sayfada ayrı bir kontrol değildir.",
    steps: [
      "Ağırlık mg = (80 kg)(9,81 m/s²) = 784,8 N. F = mg/(nη) ≤ 200 N koşulu n ≥ 784,8/(0,8·200) = 4,905 verir. Sürekli bir n seçemeyiz; koşulu sağlayan mevcut seçeneklerin en küçüğü 6 koldur. Dört kol 245,25 N gerektirir.",
      "Altı kolda F = 784,8/(6·0,8) = 163,5 N. İdeal kuvvet 784,8/6 = 130,8 N'dur; modeldeki kayıplar giriş kuvvetini yükseltir. Yol kısıtı s = nh = 6·1,5 m = 9 m verir.",
      "Yükün kazandığı enerji W_yararlı = mgh = (784,8 N)(1,5 m) = 1.177,2 J. Giriş işi W_giriş = Fs = (163,5 N)(9 m) = 1.471,5 J.",
      "Kayıp 1.471,5 − 1.177,2 = 294,3 J. Denetim: 1.177,2/1.471,5 = 0,8. Palanga sekmesini sıfırlayıp m = 80 kg, n = 6, h = 1,5 m ve η = 0,8 seçerek bu bütçeyi tabloda doğrula."
    ],
    result: "Seçenekler içinde 6 kol gerekir: F = 163,5 N, s = 9 m, W_giriş = 1.471,5 J ve kayıp 294,3 J. Bu sonuç sabit hız, uzamaz ip ve seçilen toplam verim koşulları içindir."
  },
  misconceptions: [
    { myth: "Kuvvet kazancı 4 ise dört kat enerji kazanırım.", truth: "İdeal makinede kuvvet dörtte bire inerken giriş yolu dört katına çıkar. Sabit yük ve yükselmede yararlı iş mgh değişmez; kayıplar varsa giriş işi bundan büyüktür." },
    { myth: "Makaraları saymam, palanganın kazancını verir.", truth: "İdeal palangada yükü taşıyan ip kollarını saymalısın. Sabit makara yön değiştirebilir; yükü destekleyen kol sayısını mutlaka artırmaz. Kayıplı modelde kuvvet oranı ayrıca η ile çarpılır." },
    { myth: "Sığ rampa her koşulda daha az iş gerektirir.", truth: "Aynı h için sığ rampa daha uzundur. Bu Coulomb modelinde kayıp μₖmgh cot θ'dır; μₖ > 0 iken açı küçüldükçe büyür. Açı değişirken L'yi sabit tutarsan aynı yüksekliğe çıkmış olmazsın." },
    { myth: "Verimi bilinen vidanın kendiliğinden geri dönüp dönmeyeceği de bellidir.", truth: "Burada η yalnız yukarı kaldırmadaki toplam iş oranıdır. Kendiliğinden kilitlenme için diş geometrisi, statik sürtünme ve temas modeli gerekir. Sabit η hesabı bu bilgileri içermez." }
  ],
  glossary: [
    { term: "Mekanik kazanç", definition: "Çıkış kuvveti büyüklüğünün giriş kuvveti büyüklüğüne oranı; bu sayfada mg/F." },
    { term: "İdeal geometrik kazanç", definition: "Kayıpsız ve geometrik kısıtla uyumlu harekette giriş yolunun yükün yükselmesine oranı; yerel biçimi ds/dh." },
    { term: "Verim η", definition: "Pozitif giriş işi için yararlı çıkış işinin giriş işine bölümü; burada yararlı çıktı mgh olarak seçilir." },
    { term: "Destekleyici ip kolu", definition: "Hareketli yükü veya bloğunu taşıyan ve yukarı yönlü gerilim uygulayan ip parçası." },
    { term: "Normal kuvvet", definition: "Temas yüzeyinin cisme yüzeye dik doğrultuda uyguladığı kuvvet; paralel çekilen rampada mg cos θ." },
    { term: "Kinetik sürtünme", definition: "Temas yüzeylerinin göreli kaymasına karşı koyan kuvvet; bu yaklaşık modelde büyüklüğü μₖN." },
    { term: "Tork", definition: "Bir kuvvetin seçilen eksen çevresindeki döndürme etkisi; teğet kuvvette büyüklüğü kuvvet ile yarıçapın çarpımı." },
    { term: "Bir tur ilerleme", definition: "Vida bir tam tur döndüğünde eksen boyunca alınan yol; tek ağızlı vida için diş adımı p'ye eşittir." }
  ],
  bridge: {
    heading: "Geometriden sanal işe, oradan dinamiğe",
    body: [
      "Fizik I ve Mühendislik Statiği derslerinde serbest cisim diyagramı ile kuvvet ve tork dengesi kurarsın. Analitik Mekanik'te aynı düzenek bir genelleştirilmiş koordinatla anlatılabilir: palanganın giriş yolu s ya da vidanın dönme açısı φ. Kısıt h = h(s) veya h = h(φ), yükün potansiyel enerjisi U = mgh ile birleşince gerekli ideal kuvvet dU/ds, ideal tork dU/dφ olur. Vida için h = pφ/(2π) yazıp türev al: τ = mgp/(2π). Bu birimce N·m'dir; φ radyan olarak boyutsuz alınır.",
      "Dinamikte giriş ve çıkış hızları da kısıttan bağlanır: dh/dt = (dh/ds)(ds/dt). İdeal sabit hızlı harekette Fv_giriş = mgv_yük, yani kuvvet kazancının karşılığı hız kaybıdır. Parçalar ivmeleniyorsa enerji bütçesine öteleme ve dönmenin kinetik enerjileri eklenir. Gerçek tasarımda elastikiyet, yatak torku ve yük/hıza bağlı sürtünme modelleri gerekir; bu sayfa onları sabit η'ya veya rampanın μₖN modeline indirger."
    ],
    topics: ["Fizik I: iş ve enerji", "Mühendislik Statiği: kuvvet ve tork dengesi", "Analitik Mekanik: sanal iş ve kısıtlar", "Makine Elemanları: verim ve sürtünme"]
  },
  quiz: [
    {
      question: "Yükü 1 m yükselten dört kollu palangada η = 0,75. Geometrik kazanç ve yük/çekme kuvveti oranı sırasıyla nedir?",
      options: ["4 ve 3", "3 ve 4", "4 ve 4", "4 ve 5,333…"],
      answer: 0,
      explanation: "Geometrik oran n = 4'tür; 4 m ip gerekir. Modelde M = ηn = 0,75·4 = 3. Verimin azalması geometrik yolu değiştirmez, gerekli giriş kuvvetini artırır."
    },
    {
      question: "Çark–milde yük, mil yarıçapı, tur sayısı ve η sabit. Çark yarıçapı iki katına çıkarsa hangisi doğrudur?",
      options: ["Yükün yükselmesi iki katına çıkar.", "Giriş torku yarıya iner.", "Giriş kuvveti yarıya iner; yol iki katına çıkar, giriş işi aynı kalır.", "Kayıp enerji mutlaka sıfır olur."],
      answer: 2,
      explanation: "F = mgr/(Rη), s = Rφ. R iki katına çıkınca F yarıya, s iki katına gider. h = rφ, tork FR ve iş Fs değişmez; burada η'nın da aynı tutulması gerekir."
    },
    {
      question: "Kutu yatay düzlemde sabit hızla kayıyor: m > 0, L > 0, μₖ > 0. Yararlı çıktı mgh olarak tanımlanınca iş verimi nedir?",
      options: ["%100; hız sabit olduğu için kayıp yoktur.", "%0; giriş işi pozitif ama yükselme sıfırdır.", "Tanımsız; her yatay harekette giriş işi sıfırdır.", "mg/F ile aynı sayıdır."],
      answer: 1,
      explanation: "θ = 0 olduğundan h = 0. Buna karşılık F = μₖmg > 0 ve W_giriş = FL > 0: η = 0/W_giriş = 0 tanımlıdır. μₖ da sıfır olsaydı giriş işi 0 olur, 0/0 verimi tanımsız kalırdı."
    }
  ],
  next: [
    { href: "tork-denge.html", title: "Tork ve Denge", why: "Çark ve palanganın öncesine dön: kuvvet kolları, ağırlık merkezi ve dönme dengesini incele." },
    { href: "is-enerji.html", title: "İş–Enerji", why: "Sabit hızlı kaldırmanın ötesinde, net işin kinetik enerjiyi nasıl değiştirdiğini izle." },
    { href: "statik.html", title: "Statik: Yük, Mesnet ve Denge", why: "İdeal makineyi taşıyan yapıda denge denklemleri, destek kuvvetleri ve temas sınırlarını araştır." }
  ],
  sources: [
    { title: "OpenStax Physics · 9.3 Simple Machines", url: "https://openstax.org/books/physics/pages/9-3-simple-machines", note: "Palanga, çark–mil ve vida geometrisi; giriş/çıkış yolları, ideal kazanç ve iş verimi. Figür 9.10–9.11." },
    { title: "OpenStax University Physics I · 6.2 Friction", url: "https://openstax.org/books/university-physics-volume-1/pages/6-2-friction", note: "Kinetik sürtünmenin yönü, μₖN modeli ve statik sürtünmeden ayrımı. Denklem 6.2." },
    { title: "OpenStax College Physics 2e · 9.5 Simple Machines", url: "https://openstax.org/books/college-physics-2e/pages/9-5-simple-machines", note: "Mekanik kazanç tanımı ve tork dengesinden kuvvet oranı; iş ve enerji bağlantısı." },
    { title: "Vitruvius · On Architecture, Book X", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Vitruvius/10%2A.html", note: "Özgün antik eserin İngilizce çevirisi, University of Chicago LacusCurtius arşivi. X.2: makaralı kaldırma düzenekleri; X.3: doğrusal ve dairesel hareket ilişkisi." }
  ],
  revision: "Kasım 2026"
};
