window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["tasarim-desenleri"] = {
  slug: "tasarim-desenleri",
  title: "Tasarım Desenleri: Programcıların Ortak Sözlüğü",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bir mimarın 1977'de evler için yazdığı 253 'desen', 1994'te dört programcının elinde 23 yazılım desenine dönüştü. Sayfada 23'ünü de aç, kodunu oku, akrabalarını haritada izle; ilk wiki bile bu desenleri tartışmak için kurulmuştu.",
  hook:
    "Bir arkadaşın grup sohbetine tek bir mesaj yazıyor, kırk telefon aynı anda titriyor. Yazan, kimin dinlediğini bilmiyor. Bu sayfadaki her tıklama da aynı fikirle çalışır: bir şey değişince abone olan herkese haber ver. Fikrin adı <strong>Observer</strong>. Dört programcı 1994'te böyle 23 fikre ad koyup bir kitapta topladı; yazarlardan biri on beş yıl sonra 'birini çıkarırdım' dedi. Hangisini, neden?",
  bigIdea:
    "Tasarım deseni hazır kod değil, tekrar eden bir sorunun <strong>adlandırılmış</strong> çözümüdür: ad + sorun + çözüm + bedel. Adı bilen iki programcı, bir sayfalık tasarımı tek kelimeyle anlatabilir.",
  story: [
    "Hikâye bir mimarla başlar. Christopher Alexander 1977'de <em>A Pattern Language</em> adlı kalın bir kitap yayımladı: kasabadan kapı koluna 253 'desen'. Her desen bir sorunu, sorunun geçtiği ortamı ve denenmiş bir çözümü anlatıyordu; 159 numaralı desen 'Her odaya iki yönden ışık' diyordu; Alexander'ın gözlemine göre insanlar tek yönden ışık alan, göz kamaştıran odalardan kaçıyor, iki duvarı pencereli odalarda toplanıyordu. Alexander'ın tanımı sonradan yazılımcıların kutsal cümlesi oldu: bir desen, 'çevremizde tekrar tekrar ortaya çıkan bir sorunu ve o sorunun çözümünün özünü öyle anlatır ki bu çözümü milyon kez, her seferinde farklı biçimde kullanabilirsin'. Çözüm bir plan değil, bir fikirdir; ev her seferinde başka olur.",
    "1987'de Kent Beck ve Ward Cunningham bu fikri yazılıma taşıdı. Orlando'daki OOPSLA konferansında sundukları bildiride, Smalltalk ile pencere tasarlayan acemi kullanıcılara beş küçük desenden oluşan bir 'desen dili' verdiklerini ve sonuçların şaşırtıcı derecede iyi olduğunu anlattılar. Asıl patlama 1994 sonbaharında, Portland'daki OOPSLA'da geldi: Erich Gamma, Richard Helm, Ralph Johnson ve John Vlissides'in <em>Design Patterns: Elements of Reusable Object-Oriented Software</em> kitabı. Dört yazar 'Gang of Four' diye anıldı, kitap da kısaca GoF. İçinde 23 desen vardı: 5 oluşturucu, 7 yapısal, 11 davranışsal. Örnekler C++ ve Smalltalk ile yazılmıştı; Java'nın duyurulmasına daha yarım yıl vardı. Her desen aynı on üç başlıkla anlatılıyordu: amaç, güdü, uygulanabilirlik, yapı, katılımcılar, sonuçlar, bilinen kullanımlar, ilişkili desenler... Bu sayfadaki ayrıntı paneli o şablonun kısaltılmış hâlidir: Problem, Çözüm, Artılar, Eksiler, UML, Kod, Gerçek dünya.",
    "Kitap bir topluluğun içine doğdu. Aynı yıl ilk PLoP (Pattern Languages of Programs) konferansı toplandı; 1995'te Ward Cunningham, desen yazarları birbirinin metnini düzeltebilsin diye tarayıcıdan düzenlenebilen bir site kurdu: WikiWikiWeb, dünyanın ilk wiki'si. Eleştiri de gecikmedi. Peter Norvig birkaç yıl sonra 'Dinamik Dillerde Tasarım Desenleri' sunumunda 23 desenin 16'sının Lisp ya da Dylan'da ya görünmez olduğunu ya da çok daha basit yazıldığını gösterdi; buradan çıkan ders, desenlerin bir kısmının dilin eksiğini kapatan yamalar olduğuydu. 2009'da, kitabın on beşinci yılında yapılan söyleşide Gamma, yazarların kitabı yeniden düzenlemeyi konuştuğunu anlattı ve kendi adayını söyledi: Singleton; 'kullanımı neredeyse her zaman bir tasarım kokusudur'. Yazarların yolu da ilginç: Vlissides 2005'te öldü; Gamma, Beck ile JUnit'i, IBM'de Eclipse'i, 2011'den sonra Microsoft'ta Visual Studio Code'u yaptı. Kod yazarken VS Code açıyorsan, ekranının arkasında bir GoF yazarı var.",
  ],
  core: [
    {
      heading: "Desen = ad + sorun + çözüm + bedel",
      body:
        "GoF her desenin dört zorunlu parçası olduğunu söyler. <strong>Ad</strong>: 'Observer' dediğinde karşındaki bir sayfalık açıklamayı anında kafasında kurar; sözlük budur. <strong>Sorun</strong>: desenin ne zaman uygulanacağı, hangi ortamda. <strong>Çözüm</strong>: sınıfların ve nesnelerin genel düzeni; somut kod değil, kodu yazarken izlenecek şema. <strong>Bedel</strong> (sonuçlar): her desen bir şey verip bir şey alır; sayfadaki 'Artılar / Eksiler' kutuları tam bu dördüncü parçadır. Eksisi yazılmamış bir desen anlatımı yarımdır: bedelini bilmediğin çözümü başka seçeneklerle karşılaştıramazsın.",
      formula: "Desen = Ad + Sorun + Çözüm + Sonuçlar",
      formulaNote: "Sayfada 'Amaç' ad ve niyeti, 'Problem' sorunu, 'Çözüm + UML' çözümü, 'Artılar/Eksiler' sonuçları karşılar.",
    },
    {
      heading: "Üç aile: doğum, iskelet, konuşma",
      body:
        "GoF 23 deseni üç kutuya koyar. <strong>Oluşturucu</strong> (creational) desenler nesnelerin nasıl doğacağıyla ilgilenir: 'new' yazmak yerine kim, ne zaman, hangi sınıfı üretsin? Factory Method, Builder, Singleton buradadır. <strong>Yapısal</strong> (structural) desenler nesnelerin nasıl birleşip büyük yapılar kuracağını anlatır: klasörlerin içinde klasörler (Composite), eski bir fişi yeni prize uyduran çevirici (Adapter), bir nesneyi katman katman saran kılıflar (Decorator). <strong>Davranışsal</strong> (behavioral) desenler nesnelerin birbiriyle nasıl konuşacağını düzenler: bir düğmeye basılınca kimin haberi olacak (Observer), geri alma nasıl yapılacak (Command), hangi sıralama algoritmasının seçileceği (Strategy). Konuşma biçimleri doğum biçimlerinden çok daha çeşitlidir; bu yüzden en kalabalık aile 11 desenle davranışsal olandır.",
      formula: "5 oluşturucu + 7 yapısal + 11 davranışsal = 23",
      formulaNote: "Sayfadaki sekmeler aynı sayıları verir; GoF'un 1994'teki bölümlemesi bugün de kullanılır.",
    },
    {
      heading: "Kalıtım yerine bileşim: 2ⁿ'ye karşı n",
      body:
        "GoF'un iki büyük ilkesi vardır: 'arayüze programla, uygulamaya değil' ve 'sınıf kalıtımı yerine nesne bileşimini tercih et'. İkincisinin sebebi sayılabilir. Bir karakterin kalkan, çift zıplama, mıknatıs ve hız gibi n bağımsız özelliği olsun. Her birleşim için bir alt sınıf yazarsan 2<sup>n</sup> sınıf gerekir: 4 özellikte 16, 10 özellikte 1024. Decorator deseni ise her özelliği, karakterle aynı arayüzü taşıyan bir 'kılıf' yapar; kılıfları iç içe geçirirsin. Sınıf sayısı n + 2'de kalır (arayüz, çıplak karakter, n kılıf; GoF'un çiziminde kılıfların ortak bir soyut üst sınıfı da vardır, o zaman n + 3) ve birleşimler çalışma anında kurulur. Sayfadaki Bridge deseni aynı hesabın M×N'ye karşı M+N sürümüdür: 3 kumanda × 4 cihaz için 12 sınıf yerine 7.",
      formula: "Kalıtım: 2<sup>n</sup> sınıf  ·  Decorator: n + 2 sınıf",
      formulaNote: "n = bağımsız, birbiriyle birleşebilen özellik sayısı. n = 2'de iki yol eşittir (4 sınıf); n = 3'te 8'e karşı 5 olur ve fark her yeni özellikte ikiye katlanarak açılır.",
    },
    {
      heading: "Observer: biri değişir, herkes duyar",
      body:
        "Bir <strong>özne</strong> (subject) kendisini izleyenlerin listesini tutar; durumu değişince listedeki herkesin update() metodunu çağırır. Özne izleyicilerin kim olduğunu bilmek zorunda değildir, yalnızca ortak arayüzü bilir; izleyici de istediği zaman abone olup çıkabilir. Bu sayfa da böyle çalışır: her desen kartına bir tıklama dinleyicisi takılıdır, kart tıklanınca ayrıntı paneli ve ilişki haritası güncellenir. Tarayıcıdaki addEventListener ile Node.js'teki EventEmitter doğrudan Observer'dır; telefonuna düşen bildirimler de aynı fikrin ağ üzerinden çalışan akrabası olan yayınla-abone ol düzenini kullanır. Bedeli de vardır: abonelikten çıkmayı unutan izleyici bellekte asılı kalır ('memory leak'); bir izleyici başka bir özneyi tetiklerse A→B→C→A döngüsü doğabilir. Sayfadaki 'Observer Cascade' anti-kartı tam bunu anlatır.",
      formula: "notify(): her izleyici için update()  →  N izleyiciye N çağrı",
      formulaNote: "Özne 1, izleyici N; bildirim maliyeti izleyici sayısıyla doğrusal büyür.",
    },
    {
      heading: "Strategy ve State: aynı çizim, farklı niyet",
      body:
        "Sayfada Strategy ve State'in UML'ini yan yana koy: ikisi de 'Context → arayüz ← somut sınıflar' biçimindedir, çizgi çizgi aynı. Fark niyettedir. <strong>Strategy</strong>'de algoritmayı dışarıdan biri seçer: Sorter'a QuickSort ya da MergeSort verirsin, Sorter bunu bilmez, sadece kullanır. <strong>State</strong>'te ise durumlar kendilerini değiştirir: sayfadaki LockedState, anahtar varsa ctx.setState(new UnlockedState()) diyerek bağlamı başka bir duruma geçirir. Strategy 'nasıl yapılsın' sorusunun, State 'şu an hangi aşamadayız' sorusunun cevabıdır. Bir desen çizimiyle değil, çözdüğü sorunla tanınır; bu yüzden GoF her desene 'ilişkili desenler' bölümü koymuştur.",
      formula: "Strategy: istemci seçer  ·  State: durum kendini değiştirir",
      formulaNote: "Sayfanın ilişki haritasında Strategy'ye tıklarsan State mor çerçeveyle vurgulanır; State'e tıklarsan da Strategy. GoF da ikisini akraba sayar.",
    },
  ],
  lab: {
    intro:
      "Bu sayfada kaydırıcı yok; kontroller tıklanabilir. Üstte dört <strong>kategori sekmesi</strong> (Tümü, Creational, Structural, Behavioral), altında 23 <strong>desen kartı</strong>; karta tıklayınca <strong>ayrıntı paneli</strong> dolar. Daha aşağıda 15 düğümlü <strong>Sık Birlikte Kullanılan Desenler</strong> haritası var: bir düğüme ya da karta tıklayınca o desenin ilişkili saydıkları mor çerçeveyle vurgulanır, haritanın altındaki satır da listeyi yazıyla verir. En altta 6 <strong>anti-pattern</strong> kartı ve 8 <strong>framework</strong> kartı durur. Görevlerde sayacağın her şey sayfanın kendi verisinden gelir.",
    experiments: [
      {
        title: "Üç ailenin nüfus sayımı",
        predict:
          "Hangi aile en kalabalık olur: nesne üretenler, yapı kuranlar, davranış düzenleyenler? Oran 1:1:1'e mi yakın, yoksa biri açık ara önde mi?",
        do: "Sırayla Creational, Structural ve Behavioral sekmelerine tıkla; her sekmede kart sayısını say. Sonra her kartın altındaki tek satırlık 'amaç' cümlelerini oku ve hangi fiillerin tekrar ettiğine bak.",
        observe:
          "5, 7 ve 11 kart; toplam 23. Creational amaçlarının dördünde 'oluştur' ya da 'inşa et' geçer; Behavioral amaçlarında 'bildirir', 'iletir', 'kapsüller', 'dolaşır' gibi iletişim fiilleri öne çıkar. Davranışsal aile tek başına toplamın yarısına yakındır.",
        explain:
          "Bir nesneyi üretmenin sınırlı sayıda yolu var: doğrudan, bir fabrikadan, adım adım, kopyalayarak, tek örnek olarak. Nesnelerin birbiriyle konuşma biçimleri ise çok daha çeşitli: haber verme, sırayla devretme, geri alma, sırayla dolaşma, durum değiştirme. GoF'un 1994'teki dağılımı bu asimetriyi yansıtır.",
      },
      {
        title: "Haritadaki okların yönü",
        predict:
          "Proxy'ye tıklayınca hangi düğümler vurgulanır? Sonra o düğümlerden birine tıklarsan Proxy de vurgulanır mı? 'Akrabalık' iki yönlü mü?",
        do: "İlişki haritasında Proxy'ye tıkla, mor çerçeveli düğümleri ve haritanın altındaki satırı not et. Ardından Adapter'a tıkla ve Proxy'nin durumuna bak. Son olarak Composite'e ve Decorator'a tıklayıp vurgulanan düğüm sayılarını ve satırdaki 'haritada yer almayanlar' listesini karşılaştır.",
        observe:
          "Proxy: Adapter ve Decorator vurgulanır (satır: 2 ilişkili desen). Adapter: Facade ve Decorator vurgulanır, satır üçüncüyü de yazar (Bridge, haritada yok); Proxy vurgulanmaz. Composite'in üç akrabasından yalnızca Decorator haritadadır; Iterator ve Visitor satırda kalır. Decorator ise dört düğümü birden (Adapter, Composite, Strategy, Chain of Responsibility) vurgular ve haritanın en 'sosyal' deseni olur.",
        explain:
          "Harita yönlüdür: her desenin kaydında kendi 'ilişkili desenler' listesi var ve bu listeler simetrik değil. Proxy, Adapter'ı anar; Adapter'ın kaydı Proxy'yi anmaz. Haritada 23 desenden 15'i yer alır; sekizi (Prototype, Bridge, Flyweight, Interpreter, Iterator, Mediator, Memento, Visitor) dışarıda kalır. Haritadaki 15 desenden üçüne, Builder, Proxy ve Observer'a, öteki 14'ünün hiçbiri işaret etmez; en çok işaret edilenler dörder okla Abstract Factory, Composite ve Strategy'dir. Bir görselleştirme verinin tamamını değil bir kesitini gösterir; okları sayınca fark edersin.",
      },
      {
        title: "Artı-eksi terazisi",
        predict:
          "23 desenin kaçında ayrıntı panelindeki 'Eksiler' satırı sayısı 'Artılar'dan fazla? Sence hangi desen en kötü dereceyi alır?",
        do: "Tümü sekmesinde kartlara sırayla tıkla; her desen için Artılar ve Eksiler kutularındaki '·' ile ayrılmış satırları say. Sonra anti-pattern kartlarına ve 8 framework kartına bakıp aynı desenin adını kaç kartta gördüğünü say.",
        observe:
          "Yalnızca iki desende eksi artıyı geçer: Singleton (3 artı, 4 eksi) ve Flyweight (2 artı, 3 eksi). Observer 3'e 3, Interpreter 2'ye 2 berabere. Buna rağmen Singleton 8 framework kartının 4'ünde geçer; Strategy ve Chain of Responsibility 5'er kartta. Yedi desen (Iterator, Flyweight, Memento, Visitor, Interpreter, Prototype, Bridge) hiçbir framework kartında anılmaz.",
        explain:
          "Singleton'ın eksilerinden biri sayfada açıkça yazar: 'Dependency Injection daha iyi alternatif'. Gamma'nın 2009'da 'çıkarırdım' dediği desen tam da budur; yine de en çok kullanılanlardan biri olmaya devam eder, çünkü en kolay yazılanıdır. Flyweight ise tersine, nadiren gerekir ama gerektiğinde (bir metin editöründe milyon karakter) başka çare yoktur. Eksi sayısı 'kötü desen' demek değildir; 'dikkatli kullan' demektir.",
      },
      {
        title: "Katmanları soyma: Java I/O",
        predict:
          "Decorator kartındaki kod üç iç içe 'new' içeriyor. Hangisi dosyayı gerçekten açar, hangileri yalnızca sarar? Anti-pattern kartlarındaki katman sınırı kaç?",
        do: "Decorator kartına tıkla ve kod örneğini içten dışa oku. Sonra 'Decorator Spaghetti' anti-kartını bul ve önerilen üst sınırı oku. En sonunda framework bölümündeki 'Java I/O Streams' kartında aynı hiyerarşinin nasıl adlandırıldığına bak.",
        observe:
          "En içte FileInputStream('f.gz') dosyayı açar; onu GZIPInputStream sarar ve sıkıştırılmış baytları açar; en dışta BufferedInputStream okumaları tamponlar. Bir kaynak, iki kılıf; anti-kartın önerdiği sınır 3–4 katman. Framework kartı bu hiyerarşiyi 'Decorator (klasik örnek!)' diye anar, InputStreamReader'ı ise Adapter sayar.",
        explain:
          "Üç nesne de InputStream türündendir, ama rolleri farklı: FileInputStream desenin 'çıplak bileşeni'dir, baytları gerçekten diskten okur; GZIPInputStream ve BufferedInputStream ise kılıftır, içtekinin read()'ini çağırıp kendi işini ekler. Sıra derleyici için serbesttir ama anlam taşır: tampon en dıştaysa açılmış baytları, GZIP'in içindeyse sıkıştırılmış baytları tamponlar. İki bağımsız özelliği (sıkıştırma, tampon) üç kaynak türüyle (dosya, ağ, bellek) kalıtımla birleştirmek 3 × 2² = 12 sınıf isterdi; kılıflarla 3 + 2 = 5 sınıf yetiyor. InputStreamReader'ın Adapter olması da öğreticidir: o yeni bir özellik eklemez, bayt arayüzünü karakter arayüzüne çevirir. Aynı iç içe geçirme, iki ayrı desen.",
      },
    ],
  },
  wow: [
    {
      title: "İlk wiki, desenleri tartışmak için kuruldu",
      body:
        "25 Mart 1995'te Ward Cunningham, desen yazarlarının birbirinin metnini düzeltebilmesi için c2.com'da herkesin tarayıcıdan düzenleyebildiği bir site açtı: Portland Pattern Repository'nin WikiWikiWeb'i. Adını Honolulu havalimanındaki 'Wiki Wiki' servis otobüsünden aldı; Hawaii dilinde 'çabuk' demek. 2001'de Wikipedia aynı fikirle kuruldu. Yani bugün ödev yaparken açtığın ansiklopedi, soyağacında yazılım desenlerine kadar gider.",
    },
    {
      title: "Yazarı bile birini çıkarmak istiyor",
      body:
        "Kitabın on beşinci yılı olan 2009'da yayımlanan bir söyleşide Erich Gamma, yazarların kitabı bugün olsa nasıl düzenleyeceklerini konuştuğunu anlattı. Kendi adayı Singleton'dı: 'Kullanımı neredeyse her zaman bir tasarım kokusudur.' Öteki yazarlar ikna olmadı, desen kitapta kaldı. Bu sayfanın ayrıntı panelinde de Singleton, eksisi artısından fazla olan iki desenden biridir ve anti-pattern listesinin ilk sırasında 'Singleton Overuse' durur. Peter Norvig de 23 desenin 16'sının Lisp ve Dylan'da ya görünmez olduğunu ya da çok daha basit yazıldığını göstermişti: desenlerin bir kısmı dilin eksiğini kapatan yamadır.",
    },
    {
      title: "Mimar 253 desen yazdı, programcılar 23",
      body:
        "Christopher Alexander'ın 1977 tarihli A Pattern Language kitabında kasaba ölçeğinden pencere pervazına 253 numaralı desen vardır; 159 numara 'her odaya iki yönden ışık' der. Gamma ve arkadaşları bu kitabı okuyup fikri yazılıma uyarladı; GoF'un giriş bölümü Alexander'ın tanımını kelimesi kelimesine alıntılar. Alexander 1996'da OOPSLA'da programcılara bir açılış konuşması yaptı; onlara, desenlerin kendisi için yalnızca bir yazım biçimi değil, insanların içinde daha iyi yaşadığı yapılar kurma aracı olduğunu hatırlattı ve yazılımda da aynı ölçütün aranıp aranmadığını sordu.",
    },
  ],
  worked: {
    title: "Kalıtım patlaması sayımı",
    prompt:
      "Bir oyun karakterinin dört bağımsız gücü var: kalkan, çift zıplama, mıknatıs, hız. Her güç açık ya da kapalı olabilir ve güçler birleşebilir. (a) Her birleşim için ayrı alt sınıf yazarsan kaç sınıf gerekir? (b) Decorator ile kaç sınıf? (c) 10 güç olsaydı?",
    steps: [
      "Birleşimleri say: her güç için iki seçenek (var/yok), dört güç bağımsız. 2 × 2 × 2 × 2 = 2<sup>4</sup> = 16 birleşim. Hiç gücü olmayan 'çıplak karakter' de bu 16'nın içinde; yani 1 temel sınıf + 15 alt sınıf = 16 sınıf.",
      "Decorator ile yapıyı kur: bir Karakter arayüzü (1), çıplak karakter sınıfı (1), her güç için aynı arayüzü taşıyan bir kılıf sınıfı (4). Toplam 1 + 1 + 4 = 6 sınıf. 'Kalkanlı ve hızlı karakter' artık bir sınıf değil, çalışma anında kurulan bir nesnedir: new Hiz(new Kalkan(new Karakter())).",
      "Sayfadaki Java I/O örneğiyle karşılaştır: new BufferedInputStream(new GZIPInputStream(new FileInputStream(...))) aynı zincirdir. FileInputStream çıplak karakterin, GZIPInputStream ile BufferedInputStream iki kılıfın karşılığıdır.",
      "Genelle: n güç için kalıtım K(n) = 2<sup>n</sup>, Decorator D(n) = n + 2 sınıf ister. Bir güç daha eklemek kalıtımda sınıf sayısını ikiye katlar (K(n+1) = 2·K(n)), Decorator'da yalnızca bir artırır (D(n+1) = D(n) + 1). n = 10'da 1024'e karşı 12. Bedeli de yaz: her çağrı zincirde katman katman iner, hata ayıklarken hangi kılıfın sorumlu olduğunu bulmak zorlaşır. Sayfadaki anti-kart bu yüzden 3–4 katman sınırı önerir.",
    ],
    result:
      "Dört güç için kalıtım 16 sınıf, Decorator 6 sınıf ister; on güçte fark 1024'e karşı 12'ye açılır. Üstel büyümeye karşı doğrusal büyüme: GoF'un 'kalıtım yerine bileşim' ilkesinin aritmetiği budur.",
  },
  misconceptions: [
    {
      myth: "Tasarım deseni, indirip projeye eklenen hazır bir kod parçasıdır.",
      truth:
        "Desen bir kütüphane değil, bir tariftir. GoF kitabındaki örnek kodlar C++ ve Smalltalk'tı; aynı Observer bugün JavaScript'te addEventListener, Java'da PropertyChangeListener, Python'da bir liste ve bir for döngüsü olarak yazılır. Alexander'ın cümlesini hatırla: aynı çözümü 'milyon kez, her seferinde farklı biçimde'.",
    },
    {
      myth: "Ne kadar çok desen kullanılırsa kod o kadar profesyonel olur.",
      truth:
        "Sayfadaki altı anti-pattern kartının üçü tam bu yanılgıyı anlatır: Golden Hammer, Pattern Proliferation, Decorator Spaghetti. Desen bir sorunun cevabıdır; sorun yoksa desen de yoktur. Gamma bile Singleton'ı 'tasarım kokusu' sayar. Önce sorunu yaz, deseni sonra seç.",
    },
    {
      myth: "Strategy ile State aynı şeydir, UML'leri zaten özdeş.",
      truth:
        "Çizim aynı, niyet farklı. Strategy'de algoritmayı dışarıdaki istemci seçer ve genellikle değiştirmez; State'te nesnenin kendisi aşamadan aşamaya geçer, sayfadaki LockedState'in ctx.setState çağırması gibi. Bir desen çizimiyle değil, çözdüğü sorunla tanınır.",
    },
    {
      myth: "Python'daki @decorator, GoF'un Decorator deseniyle aynı şeydir.",
      truth:
        "Akrabadırlar ama aynı değiller. Python'un @ işareti bir fonksiyonu tanımlandığı anda başka bir fonksiyonla sarar; GoF Decorator'ı ise aynı arayüzü taşıyan nesneleri çalışma anında iç içe geçirir ve istediğin zaman katman ekleyip çıkarırsın. Sayfanın 'gerçek dünya' satırı ikisini yan yana anar; sarma fikri ortak, mekanizma farklı.",
    },
  ],
  glossary: [
    { term: "Sınıf ve nesne", definition: "Sınıf bir kalıp, nesne o kalıptan üretilmiş somut bir örnektir; 'new' bir nesne doğurur." },
    { term: "Arayüz (interface)", definition: "Bir nesnenin dışarıya söz verdiği metot listesi; içinin nasıl yazıldığını gizler." },
    { term: "Kalıtım", definition: "Bir sınıfın başka bir sınıfın alanlarını ve metotlarını devralması; 'bir türüdür' ilişkisi." },
    { term: "Bileşim (composition)", definition: "Bir nesnenin başka nesneleri içinde tutarak iş yaptırması; 'bir parçası vardır' ilişkisi." },
    { term: "Gevşek bağlılık", definition: "İki parçanın birbirinin iç ayrıntısını bilmeden, yalnızca arayüz üzerinden çalışması." },
    { term: "Kapsülleme", definition: "Verinin ve onu değiştiren kodun bir arada tutulup dışarıdan doğrudan erişimin kapatılması." },
    { term: "UML", definition: "Sınıfları kutu, ilişkileri ok olarak çizen standart diyagram dili; sayfadaki metin diyagramları bunun sadeleştirilmiş hâli." },
    { term: "Anti-pattern", definition: "Sık görülen ama sorunu çözmek yerine büyüten bir çözüm kalıbı; adlandırılmış bir tuzak." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede bir program 'çalışıyorsa' iyidir; üniversitede soru değişir: altı ay sonra başka biri bu kodu değiştirebilir mi? Yazılım mühendisliği ve nesne yönelimli tasarım dersleri GoF'un iki ilkesini açarak başlar ve <strong>SOLID</strong> ilkelerine ulaşır: tek sorumluluk, açık-kapalı, Liskov yerine geçme, arayüz ayrımı, bağımlılığın tersine çevrilmesi. Beşli tek kişinin buluşu değildir: açık-kapalı ilkesi Bertrand Meyer'in 1988 tarihli kitabından, yerine geçme ilkesi Barbara Liskov'un 1987'deki konuşmasından gelir; Robert C. Martin bunları 2000'de derleyip yaygınlaştırdı, baş harflerinden SOLID sözcüğünü de Michael Feathers türetti. Sayfadaki 'Open/Closed' ve 'SRP' kısaltmaları bu listeden gelir. Martin Fowler'ın 1999'daki <em>Refactoring</em> kitabı ise kötü kodu adım adım desenlere doğru yeniden biçimlendirmeyi öğretir; desenler hedef, refactoring yoldur. Mimari ölçekte aynı fikirler MVC (1979'da Xerox PARC'ta Trygve Reenskaug), katmanlı mimari ve mikroservisler olarak karşına çıkar.",
      "Köprünün öteki ucunda desenlerin sorgulandığı yer var. Fonksiyonel programlamada bir fonksiyonu parametre olarak geçirebildiğin için Strategy deseni bir satıra iner; Norvig'in 16/23 gözlemi burada ders olur: JavaScript'te liste.sort((a, b) => a - b) yazdığında bir Strategy nesnesi geçirmiş olursun, ama ortada ne arayüz ne sınıf vardır. Eşzamanlı programlamada yeni desen aileleri doğar: üretici-tüketici, aktör modeli, kilit yerine mesajlaşma. Derleyici derslerinde Interpreter ve Visitor, soyut sözdizimi ağacı üzerinde gezinirken yeniden ortaya çıkar. Ve Java 9'un java.util.Observer'ı 'kullanımdan kaldırılmış' işaretlemesi sana şunu öğretir: desen kalıcıdır, kütüphanedeki hâli değil.",
    ],
    topics: ["SOLID ilkeleri", "Refactoring ve kod kokuları", "Mimari desenler (MVC, katmanlı, mikroservis)", "Fonksiyonel programlama ve yüksek dereceli fonksiyonlar", "Eşzamanlılık desenleri", "Soyut sözdizimi ağacı ve Visitor"],
  },
  quiz: [
    {
      question: "Bir trafik lambası nesnesinde her renk ayrı bir sınıftır; Kırmızı sınıfı süresi dolunca lambayı kendisi Yeşil'e geçirir. Sınıf çizimi Strategy ile aynıdır. Bu hangi desendir ve onu Strategy'den ayıran nedir?",
      options: [
        "Strategy; çünkü çizimler özdeş",
        "Observer; çünkü bir değişiklik bildiriliyor",
        "State; çünkü geçişi dışarıdaki istemci değil, durum nesneleri kendileri yapıyor",
        "Singleton; çünkü tek bir lamba var",
      ],
      answer: 2,
      explanation: "Strategy'de algoritmayı istemci seçer ve bağlama verir; State'te durum sınıfları bağlamı bir sonraki duruma kendileri geçirir, sayfadaki LockedState'in ctx.setState(new UnlockedState()) çağrısı gibi. Çizim aynı, niyet farklı: desen çözdüğü sorunla tanınır.",
    },
    {
      question: "Beş bağımsız özelliğin her birleşimi için alt sınıf yazarsan kaç sınıf gerekir; Decorator ile kaç?",
      options: ["32'ye karşı 7", "25'e karşı 5", "10'a karşı 5", "32'ye karşı 32"],
      answer: 0,
      explanation: "Kalıtım 2⁵ = 32 sınıf (temel sınıf dâhil); Decorator 1 arayüz + 1 temel + 5 kılıf = 7 sınıf. Üstel büyümeye karşı doğrusal büyüme, 'kalıtım yerine bileşim' ilkesinin aritmetiğidir.",
    },
    {
      question: "new BufferedInputStream(new GZIPInputStream(new FileInputStream(\"f.gz\"))) ifadesi hangi deseni gösterir?",
      options: ["Adapter", "Decorator", "Composite", "Proxy"],
      answer: 1,
      explanation: "FileInputStream baytları okur; GZIPInputStream ve BufferedInputStream aynı InputStream arayüzünü taşıyarak onu sarar ve içtekinin read()'ine kendi işini ekler: biri sıkıştırmayı açar, öteki tamponlar. Arayüz değiştirilseydi Adapter, erişim denetlenseydi Proxy olurdu; burada yalnızca sorumluluk ekleniyor.",
    },
  ],
  next: [
    { href: "programlama-paradigmalari.html", title: "Programlama Paradigmaları", why: "Desenlerin üstünde durduğu zemin: kapsülleme, kalıtım, çok biçimlilik ve fonksiyonel bakış." },
    { href: "yazilim-muhendisligi.html", title: "Yazılım Mühendisliği", why: "Desenlerin büyük resmi: gereksinim, mimari, test ve bakım; kodun altı ay sonra da değiştirilebilir kalması." },
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "Composite'in ağacı, Iterator'ın dolaştığı liste: desenlerin üzerinde çalıştığı yapılar." },
    { href: "derleyici-ve-yorumlayicilar.html", title: "Derleyici ve Yorumlayıcılar", why: "Interpreter ve Visitor desenlerinin doğal yuvası olan sözdizimi ağacı." },
  ],
  sources: [
    { title: "Wikipedia · Design Patterns (Gang of Four kitabı)", url: "https://en.wikipedia.org/wiki/Design_Patterns", note: "Kitabın 1994 OOPSLA'sındaki çıkışı, 5 + 7 + 11 desenin listesi, Norvig'in 16/23 gözlemi ve Gamma'nın Singleton sözü (İngilizce)." },
    { title: "Wikipedia · Software design pattern", url: "https://en.wikipedia.org/wiki/Software_design_pattern", note: "Alexander'dan Beck ve Cunningham'a desen fikrinin yazılıma geçişi; desen türleri ve eleştiriler." },
    { title: "Wikipedia · WikiWikiWeb", url: "https://en.wikipedia.org/wiki/WikiWikiWeb", note: "İlk wiki'nin Portland Pattern Repository için 1995'te kuruluşu." },
    { title: "MDN · Proxy (JavaScript)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy", note: "Proxy deseninin dile gömülmüş hâli; sayfadaki 'JavaScript Proxy API' örneğini kendi tarayıcında dene." },
  ],
  revision: "Kasım 2026",
};
