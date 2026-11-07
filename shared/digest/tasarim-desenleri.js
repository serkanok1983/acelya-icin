window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["tasarim-desenleri"] = {
  slug: "tasarim-desenleri",
  title: "Tasarım Desenleri: Programcıların Ortak Sözlüğü",
  field: "Bilgisayar Bilimi",
  level: "Lise ileri",
  minutes: 35,
  tagline:
    "Bir mimarın 1977'de evler için yazdığı 253 'desen', 1994'te dört programcının elinde 23 yazılım desenine dönüştü. Bugün her büyük programın içinde aynı 23 fikir döner; ilk wiki bile bu desenleri tartışmak için kuruldu.",
  hook:
    "1972'de bir barda sektirilen Pong topu, 2025'te telefonundaki sohbet uygulaması ve bu sayfanın kendisi aynı fikri kullanır: bir şey değişince ona bakanların hepsine haber ver. Bu fikrin bir adı var, Observer. Peki dört programcı 1994'te böyle 23 fikri bir kitaba koyduğunda neden 'yazılım mühendisliğinde devrim' dendi ve neden yazarlardan biri on beş yıl sonra 'birini kitaptan çıkarırdım' dedi?",
  bigIdea:
    "Tasarım deseni hazır kod değil, tekrar eden bir sorunun <strong>adlandırılmış</strong> çözümüdür: ad + sorun + çözüm + bedel. Adı bilmek, iki programcının bir saatlik tartışmayı tek kelimeyle bitirmesini sağlar.",
  story: [
    "Hikâye bir mimarla başlar. Christopher Alexander 1977'de <em>A Pattern Language</em> adlı kalın bir kitap yayımladı: kasabadan kapı koluna 253 'desen'. Her desen bir sorunu, sorunun geçtiği ortamı ve denenmiş bir çözümü anlatıyordu; 159 numaralı desen 'Her odaya iki yönden ışık' diyordu, çünkü tek pencereli odaların gözleri yorduğu gözlenmişti. Alexander'ın tanımı sonradan yazılımcıların kutsal cümlesi oldu: bir desen, 'çevremizde tekrar tekrar ortaya çıkan bir sorunu ve o sorunun çözümünün özünü öyle anlatır ki bu çözümü milyon kez, her seferinde farklı biçimde kullanabilirsin'. Çözüm bir plan değil, bir fikirdir; ev her seferinde başka olur.",
    "1987'de Kent Beck ve Ward Cunningham bu fikri yazılıma taşıdı. Orlando'daki OOPSLA konferansında sundukları bildiride, Smalltalk ile pencere tasarlayan acemi kullanıcılara beş küçük desenden oluşan bir 'desen dili' verdiklerini ve sonuçların şaşırtıcı derecede iyi olduğunu anlattılar. Asıl patlama 1994 sonbaharında, Portland'daki OOPSLA'da geldi: Erich Gamma, Richard Helm, Ralph Johnson ve John Vlissides'in <em>Design Patterns: Elements of Reusable Object-Oriented Software</em> kitabı. Dört yazar 'Gang of Four' diye anıldı, kitap da kısaca GoF. İçinde 23 desen vardı: 5 oluşturucu, 7 yapısal, 11 davranışsal. Örnekler C++ ve Smalltalk ile yazılmıştı; Java daha bir yaşında bile değildi. Her desen aynı on üç başlıkla anlatılıyordu: amaç, güdü, uygulanabilirlik, yapı, katılımcılar, sonuçlar, bilinen kullanımlar, ilişkili desenler... Bu sayfadaki ayrıntı paneli o şablonun kısaltılmış hâlidir: Problem, Çözüm, Artılar, Eksiler, UML, Kod, Gerçek dünya.",
    "Kitap bir topluluk doğurdu. 1994'te ilk PLoP konferansı toplandı; 1995'te Ward Cunningham, desen yazarları birbirinin metnini düzeltebilsin diye tarayıcıdan düzenlenebilen bir site kurdu: WikiWikiWeb, dünyanın ilk wiki'si. Eleştiri de gecikmedi. Peter Norvig 1996'da 23 desenin 16'sının Lisp ya da Dylan gibi dillerde ya görünmez ya da çok daha basit olduğunu gösterdi; ona göre desenlerin bir kısmı, dilin eksiğini kapatan geçici yamalardı. 2009'da, kitabın on beşinci yılında Gamma'ya hangi deseni çıkaracağı sorulduğunda cevabı netti: Singleton; 'kullanımı neredeyse her zaman bir tasarım kokusudur'. Yazarların yolu da ilginç: Vlissides 2005'te öldü; Gamma, Beck ile JUnit'i, IBM'de Eclipse'i, 2011'den sonra Microsoft'ta Visual Studio Code'u yaptı. Bugün kullandığın editörün arkasında bir GoF yazarı var.",
  ],
  core: [
    {
      heading: "Desen = ad + sorun + çözüm + bedel",
      body:
        "GoF her desenin dört zorunlu parçası olduğunu söyler. <strong>Ad</strong>: 'Observer' dediğinde karşındaki bir sayfalık açıklamayı anında kafasında kurar; sözlük budur. <strong>Sorun</strong>: desenin ne zaman uygulanacağı, hangi ortamda. <strong>Çözüm</strong>: sınıfların ve nesnelerin genel düzeni; somut kod değil, kodu yazarken izlenecek şema. <strong>Bedel</strong> (sonuçlar): her desen bir şey verip bir şey alır; sayfadaki 'Artılar / Eksiler' kutuları tam bu dördüncü parçadır. Eksisi yazılmamış bir desen anlatımı eksiktir; GoF bunu özellikle vurgular.",
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
        "GoF'un iki büyük ilkesi vardır: 'arayüze programla, uygulamaya değil' ve 'sınıf kalıtımı yerine nesne bileşimini tercih et'. İkincisinin sebebi sayılabilir. Bir karakterin kalkan, çift zıplama, mıknatıs ve hız gibi n bağımsız özelliği olsun. Her birleşim için bir alt sınıf yazarsan 2<sup>n</sup> sınıf gerekir: 4 özellikte 16, 10 özellikte 1024. Decorator deseni ise her özelliği, karakterle aynı arayüzü taşıyan bir 'kılıf' yapar; kılıfları iç içe geçirirsin. Sınıf sayısı n + 2'de kalır (arayüz, çıplak karakter, n kılıf) ve birleşimler çalışma anında kurulur. Sayfadaki Bridge deseni aynı hesabın M×N'ye karşı M+N sürümüdür: 3 kumanda × 4 cihaz için 12 sınıf yerine 7.",
      formula: "Kalıtım: 2<sup>n</sup> sınıf  ·  Decorator: n + 2 sınıf",
      formulaNote: "n = bağımsız, birbiriyle birleşebilen özellik sayısı. n = 1'de iki yol eşittir; n = 3'ten sonra fark hızla açılır.",
    },
    {
      heading: "Observer: biri değişir, herkes duyar",
      body:
        "Bir <strong>özne</strong> (subject) kendisini izleyenlerin listesini tutar; durumu değişince listedeki herkesin update() metodunu çağırır. Özne izleyicilerin kim olduğunu bilmek zorunda değildir, yalnızca ortak arayüzü bilir; izleyici de istediği zaman abone olup çıkabilir. Bu sayfa da böyle çalışır: her desen kartına bir tıklama dinleyicisi takılıdır, kart tıklanınca ayrıntı paneli ve ilişki haritası güncellenir. Tarayıcıdaki addEventListener, Node.js'teki EventEmitter, telefonundaki bildirimler hep Observer'dır. Bedeli de vardır: abonelikten çıkmayı unutan izleyici bellekte asılı kalır ('memory leak'); bir izleyici başka bir özneyi tetiklerse A→B→C→A döngüsü doğabilir. Sayfadaki 'Observer Cascade' anti-kartı tam bunu anlatır.",
      formula: "notify(): her izleyici için update()  →  N izleyiciye N çağrı",
      formulaNote: "Özne 1, izleyici N; bildirim maliyeti izleyici sayısıyla doğrusal büyür.",
    },
    {
      heading: "Strategy ve State: aynı çizim, farklı niyet",
      body:
        "Sayfada Strategy ve State'in UML'ini yan yana koy: ikisi de 'Context → arayüz ← somut sınıflar' biçimindedir, çizgi çizgi aynı. Fark niyettedir. <strong>Strategy</strong>'de algoritmayı dışarıdan biri seçer: Sorter'a QuickSort ya da MergeSort verirsin, Sorter bunu bilmez, sadece kullanır. <strong>State</strong>'te ise durumlar kendilerini değiştirir: sayfadaki LockedState, anahtar varsa ctx.setState(new UnlockedState()) diyerek bağlamı başka bir duruma geçirir. Strategy 'nasıl yapılsın' sorusunun, State 'şu an hangi aşamadayız' sorusunun cevabıdır. Bir desen çizimiyle değil, çözdüğü sorunla tanınır; bu yüzden GoF her desene 'ilişkili desenler' bölümü koymuştur.",
      formula: "Strategy: istemci seçer  ·  State: durum kendini değiştirir",
      formulaNote: "Sayfanın ilişki haritasında Strategy'ye tıklarsan State'in kalınlaştığını görürsün; GoF da ikisini akraba sayar.",
    },
  ],
  lab: {
    intro:
      "Bu sayfada kaydırıcı yok; kontroller tıklanabilir. Üstte dört <strong>kategori sekmesi</strong> (Tümü, Creational, Structural, Behavioral), altında 23 <strong>desen kartı</strong>; karta tıklayınca <strong>ayrıntı paneli</strong> dolar. Daha aşağıda 15 düğümlü <strong>Sık Birlikte Kullanılan Desenler</strong> haritası (düğüme tıklayınca ilişkili düğümlerin çerçevesi kalınlaşır), 6 <strong>anti-pattern</strong> kartı ve 8 <strong>framework</strong> kartı var. Görevlerde sayacağın her şey sayfanın kendi verisinden gelir.",
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
          "Proxy'ye tıklayınca hangi düğümler kalınlaşır? Sonra o düğümlerden birine tıklarsan Proxy de kalınlaşır mı? İlişki iki yönlü mü?",
        do: "İlişki haritasında Proxy'ye tıkla, kalınlaşan çerçeveleri not et. Ardından Adapter'a tıkla ve Proxy'nin durumuna bak. Son olarak Composite'e ve Decorator'a tıklayıp kalınlaşan düğüm sayılarını karşılaştır.",
        observe:
          "Proxy: Adapter ve Decorator kalınlaşır. Adapter: Facade ve Decorator kalınlaşır, Proxy kalınlaşmaz. Composite yalnızca Decorator'ı kalınlaştırır; Decorator ise dört düğümü (Adapter, Composite, Strategy, Chain of Responsibility) kalınlaştırır ve haritanın en 'sosyal' deseni olur.",
        explain:
          "Harita yönlüdür: her desenin veri satırında kendi 'ilişkili desenler' listesi var ve bu listeler simetrik değil. Composite'in verisinde üç akraba yazar (Iterator, Decorator, Visitor) ama haritada 23 desenden yalnızca 15'i olduğu için Iterator ve Visitor görünmez; sekiz desen (Prototype, Bridge, Flyweight, Interpreter, Iterator, Mediator, Memento, Visitor) haritada yok. Builder, Proxy ve Observer'a ise hiçbir düğüm işaret etmez. Bir görselleştirme, verinin tamamını değil bir kesitini gösterir; sayarak fark edersin.",
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
          "Decorator kartındaki kod üç iç içe 'new' içeriyor. Hangisi dosyayı gerçekten açar, hangisi en dışta kalır? Anti-pattern kartlarındaki katman sınırı kaç?",
        do: "Decorator kartına tıkla ve kod örneğini içten dışa oku. Sonra 'Decorator Spaghetti' anti-kartını bul ve önerilen üst sınırı oku. En sonunda framework bölümündeki 'Java I/O Streams' kartında aynı hiyerarşinin nasıl adlandırıldığına bak.",
        observe:
          "En içte FileInputStream('f.gz') dosyayı açar; onu GZIPInputStream sarar ve sıkıştırılmış baytları açar; en dışta BufferedInputStream okumaları tamponlar. Üç katman; anti-kartın önerdiği sınır 3–4. Framework kartı bu hiyerarşiyi 'Decorator (klasik örnek!)' diye anar, InputStreamReader'ı ise Adapter sayar.",
        explain:
          "Her katman aynı InputStream arayüzünü taşır; dıştaki, içtekinin read()'ini çağırıp kendi işini ekler. Bu yüzden sıralama serbest ama anlamlıdır: önce aç, sonra çöz, sonra tamponla. Üç bağımsız özellik için kalıtımla 2³ = 8 sınıf gerekirdi; burada üç kılıf yetiyor. InputStreamReader'ın Adapter olması da öğreticidir: o yeni bir özellik eklemez, bayt arayüzünü karakter arayüzüne çevirir. Aynı iç içe geçirme, iki ayrı desen.",
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
        "Kitabın on beşinci yılı olan 2009'da Erich Gamma'ya dört yazarın hangi deseni çıkaracağı soruldu. Cevabı Singleton'dı: 'Kullanımı neredeyse her zaman bir tasarım kokusudur.' Bu sayfanın ayrıntı panelinde de Singleton, eksisi artısından fazla olan iki desenden biridir ve anti-pattern listesinin ilk sırasında 'Singleton Overuse' durur. Peter Norvig daha 1996'da 23 desenin 16'sının Lisp gibi dillerde ya görünmez ya da çok daha basit olduğunu göstermişti: desenlerin bir kısmı dilin eksiğini kapatan yamadır.",
    },
    {
      title: "Mimar 253 desen yazdı, programcılar 23",
      body:
        "Christopher Alexander'ın 1977 tarihli A Pattern Language kitabında kasaba ölçeğinden pencere pervazına 253 numaralı desen vardır; 159 numara 'her odaya iki yönden ışık' der. Gamma ve arkadaşları bu kitabı okuyup fikri yazılıma uyarladı; GoF'un giriş bölümü Alexander'ın tanımını kelimesi kelimesine alıntılar. Alexander 1996'da OOPSLA'da programcılara konuşma yaptı ve kendi fikrinin bir başka alanda bu kadar yayılmasına şaşırdığını söyledi.",
    },
  ],
  worked: {
    title: "Kalıtım patlaması sayımı",
    prompt:
      "Bir oyun karakterinin dört bağımsız gücü var: kalkan, çift zıplama, mıknatıs, hız. Her güç açık ya da kapalı olabilir ve güçler birleşebilir. (a) Her birleşim için ayrı alt sınıf yazarsan kaç sınıf gerekir? (b) Decorator ile kaç sınıf? (c) 10 güç olsaydı?",
    steps: [
      "Birleşimleri say: her güç için iki seçenek (var/yok), dört güç bağımsız. 2 × 2 × 2 × 2 = 2<sup>4</sup> = 16 birleşim. Hiç gücü olmayan 'çıplak karakter' de bu 16'nın içinde; yani 1 temel sınıf + 15 alt sınıf = 16 sınıf.",
      "Decorator ile yapıyı kur: bir Karakter arayüzü (1), çıplak karakter sınıfı (1), her güç için aynı arayüzü taşıyan bir kılıf sınıfı (4). Toplam 1 + 1 + 4 = 6 sınıf. 'Kalkanlı ve hızlı karakter' artık bir sınıf değil, çalışma anında kurulan bir nesnedir: new Hiz(new Kalkan(new Karakter())).",
      "Sayfadaki Java I/O örneğiyle karşılaştır: new BufferedInputStream(new GZIPInputStream(new FileInputStream(...))) tam bu zincirdir; üç kılıf, üç özellik.",
      "Genelle: n güç için kalıtım 2<sup>n</sup>, Decorator n + 2 sınıf. n = 10'da 1024'e karşı 12. Bedeli de yaz: her çağrı zincirde katman katman iner, hata ayıklarken hangi kılıfın sorumlu olduğunu bulmak zorlaşır. Sayfadaki anti-kart bu yüzden 3–4 katman sınırı önerir.",
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
      "Lisede bir program 'çalışıyorsa' iyidir; üniversitede soru değişir: altı ay sonra başka biri bu kodu değiştirebilir mi? Yazılım mühendisliği ve nesne yönelimli tasarım dersleri GoF'un iki ilkesini açarak başlar ve <strong>SOLID</strong> ilkelerine ulaşır: tek sorumluluk, açık-kapalı, Liskov yerine geçme, arayüz ayrımı, bağımlılığın tersine çevrilmesi. Sayfadaki 'Open/Closed' ve 'SRP' kısaltmaları bu listeden gelir. Martin Fowler'ın 1999'daki <em>Refactoring</em> kitabı ise kötü kodu adım adım desenlere doğru yeniden biçimlendirmeyi öğretir; desenler hedef, refactoring yoldur. Mimari ölçekte aynı fikirler MVC (1979'da Xerox PARC'ta Trygve Reenskaug), katmanlı mimari ve mikroservisler olarak karşına çıkar.",
      "Köprünün öteki ucunda desenlerin sorgulandığı yer var. Fonksiyonel programlamada bir fonksiyonu parametre olarak geçirebildiğin için Strategy deseni bir satıra iner; Norvig'in 16/23 gözlemi burada ders olur. Eşzamanlı programlamada yeni desen aileleri doğar: üretici-tüketici, aktör modeli, kilit yerine mesajlaşma. Derleyici derslerinde Interpreter ve Visitor, soyut sözdizimi ağacı üzerinde gezinirken yeniden ortaya çıkar. Ve Java 9'un java.util.Observer'ı 'kullanımdan kaldırılmış' işaretlemesi sana şunu öğretir: desen kalıcıdır, kütüphanedeki hâli değil.",
    ],
    topics: ["SOLID ilkeleri", "Refactoring ve kod kokuları", "Mimari desenler (MVC, katmanlı, mikroservis)", "Fonksiyonel programlama ve yüksek dereceli fonksiyonlar", "Eşzamanlılık desenleri", "Soyut sözdizimi ağacı ve Visitor"],
  },
  quiz: [
    {
      question: "Sayfadaki 23 GoF deseninin en kalabalık ailesi hangisidir ve kaç desen içerir?",
      options: ["Creational, 11", "Structural, 7", "Behavioral, 11", "Behavioral, 7"],
      answer: 2,
      explanation: "Sekmeler 5 Creational, 7 Structural, 11 Behavioral gösterir. Nesnelerin konuşma biçimleri, üretilme biçimlerinden çok daha çeşitlidir; davranışsal aile toplamın yarısına yakındır.",
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
      explanation: "Her katman aynı InputStream arayüzünü taşır ve içtekinin read()'ine kendi işini ekler: aç, çöz, tamponla. Arayüz değiştirilseydi Adapter, erişim denetlenseydi Proxy olurdu; burada yalnızca sorumluluk ekleniyor.",
    },
  ],
  next: [
    { href: "programlama-paradigmalari.html", title: "Programlama Paradigmaları", why: "Desenlerin üstünde durduğu zemin: kapsülleme, kalıtım, çok biçimlilik ve fonksiyonel bakış." },
    { href: "yazilim-muhendisligi.html", title: "Yazılım Mühendisliği", why: "Desenlerin büyük resmi: gereksinim, mimari, test ve bakım; kodun altı ay sonra da değiştirilebilir kalması." },
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "Composite'in ağacı, Iterator'ın dolaştığı liste: desenlerin üzerinde çalıştığı yapılar." },
    { href: "derleyici-ve-yorumlayicilar.html", title: "Derleyici ve Yorumlayıcılar", why: "Interpreter ve Visitor desenlerinin doğal yuvası olan sözdizimi ağacı." },
  ],
  sources: [
    { title: "Wikipedia · Design Patterns (Gang of Four kitabı)", url: "https://en.wikipedia.org/wiki/Design_Patterns", note: "Kitabın tarihi, 23 desenin listesi, Norvig ve Gamma'nın eleştirileri (İngilizce)." },
    { title: "Wikipedia · Software design pattern", url: "https://en.wikipedia.org/wiki/Software_design_pattern", note: "Alexander'dan Beck ve Cunningham'a desen fikrinin yazılıma geçişi; desen türleri ve eleştiriler." },
    { title: "Wikipedia · WikiWikiWeb", url: "https://en.wikipedia.org/wiki/WikiWikiWeb", note: "İlk wiki'nin Portland Pattern Repository için 1995'te kuruluşu." },
    { title: "MDN · Proxy (JavaScript)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy", note: "Proxy deseninin dile gömülmüş hâli; sayfadaki 'JavaScript Proxy API' örneğini kendi tarayıcında dene." },
  ],
  revision: "Ekim 2026",
};
