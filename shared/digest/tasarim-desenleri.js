window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["tasarim-desenleri"] = {
  slug: "tasarim-desenleri",
  title: "Tasarım Desenleri: Her Çözümün Bir Bedeli",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Dokuz tasarım deseni bu sayfada gerçekten çalışıyor: çağrıları, sınıfları ve dokunulan birimleri say, formülle karşılaştır. Her desen bir şey verip bir şey alır; 23 desenlik katalog bedeli de yazar.",
  hook:
    "Dört dinleyicili bir listeye tek bir olay yolluyorsun; dinleyicilerden biri haberi alır almaz kendini listeden siliyor. Kaç bildirim teslim edilir? Listeyi olduğu gibi dolaşan program sayıyor: dört değil, üç. Hata iletisi yok, yalnızca bir bildirim kayıp. 1994'te böyle 23 fikre ad koyan dört yazardan biri, on beş yıl sonra içlerinden birini kitaptan çıkarmak istediğini söyledi. Hangisini, neden?",
  bigIdea:
    "Tasarım deseni hazır kod değil, tekrar eden bir sorunun <strong>adlandırılmış</strong> çözümüdür; her çözüm bir değişikliği kolaylaştırırken bir başkasını zorlaştırır. İyi tasarım, bu takası sayarak seçmektir.",
  story: [
    "Hikâye bir mimarla başlar. Christopher Alexander ve çalışma arkadaşları 1977'de <em>A Pattern Language</em> adlı kalın bir kitap yayımladı: bölge ve kasaba ölçeğinden odadaki eşyalara inen, numaralanmış 253 'desen'. Her desen bir sorunu, sorunun geçtiği ortamı ve denenmiş bir çözümü anlatıyordu; 159 numaralı desen 'Her odaya iki yönden ışık' diyordu; Alexander'ın gözlemine göre insanlar tek yönden ışık alan, göz kamaştıran odalardan kaçıyor, iki duvarı pencereli odalarda toplanıyordu. Alexander'ın tanımı sonradan yazılımcıların kutsal cümlesi oldu: bir desen, 'çevremizde tekrar tekrar ortaya çıkan bir sorunu ve o sorunun çözümünün özünü öyle anlatır ki bu çözümü milyon kez, her seferinde farklı biçimde kullanabilirsin'. Çözüm bir plan değil, bir fikirdir; ev her seferinde başka olur.",
    "1987'de Kent Beck ve Ward Cunningham bu fikri yazılıma taşıdı. Orlando'daki OOPSLA konferansının bir atölyesine sundukları kısa raporda, Smalltalk ile pencere tasarlayacak kullanıcılara küçük bir 'desen dili' verdiklerini, rapora da bu dilden beş desen koyduklarını anlattılar; uygulamayı kullanacak kişiler pencerelerini kendileri tasarlayabilmişti. Asıl patlama 1994 sonbaharında geldi; kitap ekim ayında Portland'daki OOPSLA'da okurla buluştu: Erich Gamma, Richard Helm, Ralph Johnson ve John Vlissides'in <em>Design Patterns: Elements of Reusable Object-Oriented Software</em> kitabı. Dört yazar 'Gang of Four' diye anıldı, kitap da kısaca GoF. İçinde 23 desen vardı: 5 oluşturucu, 7 yapısal, 11 davranışsal. Örnekler C++ ve Smalltalk ile yazılmıştı; Java henüz duyurulmamıştı; o, 1995 baharında gelecekti. Her desen aynı on üç başlıkla anlatılıyordu: amaç, güdü, uygulanabilirlik, yapı, katılımcılar, sonuçlar, bilinen kullanımlar, ilişkili desenler... Bu sayfanın sonundaki katalog o başlıklardan ikisini tutar: desenin amacı ve bedeli.",
    "Kitap bir topluluğun içine doğdu. Aynı yıl ilk PLoP (Pattern Languages of Programs) konferansı toplandı; 1995'te Ward Cunningham, desen yazarları birbirinin metnini düzeltebilsin diye tarayıcıdan düzenlenebilen bir site kurdu: WikiWikiWeb, dünyanın ilk wiki'si. Eleştiri de gecikmedi. Peter Norvig 1996'daki 'Dinamik Dillerde Tasarım Desenleri' sunumunda 23 desenin 16'sının Lisp ya da Dylan'da ya görünmez olduğunu ya da çok daha basit yazıldığını gösterdi; buradan çıkan ders, desenlerin bir kısmının dilin eksiğini kapatan yamalar olduğuydu. 2009'da, kitabın on beşinci yılında yapılan söyleşide Gamma, yazarların kitabı yeniden düzenlemeyi konuştuğunu anlattı ve kendi adayını söyledi: Singleton; 'kullanımı neredeyse her zaman bir tasarım kokusudur'. Yazarların yolu da ilginç: Vlissides 2005'te öldü; Gamma, Beck ile JUnit'i, IBM'de Eclipse'i, 2011'den sonra Microsoft'ta Visual Studio Code'u yaptı. Kod yazarken VS Code açıyorsan, ekranının arkasında bir GoF yazarı var.",
  ],
  core: [
    {
      heading: "Desen = ad + sorun + çözüm + bedel",
      body:
        "GoF her desenin dört zorunlu parçası olduğunu söyler. <strong>Ad</strong>: 'Observer' dediğinde karşındaki bir sayfalık açıklamayı anında kafasında kurar; sözlük budur. <strong>Sorun</strong>: desenin ne zaman, hangi ortamda uygulanacağı. <strong>Çözüm</strong>: sınıfların ve nesnelerin genel düzeni; somut kod değil, kodu yazarken izlenecek şema. <strong>Bedel</strong> (sonuçlar): her desen bir şey verip bir şey alır. Bedeli yazılmamış bir desen anlatımı yarımdır: neye mal olduğunu bilmediğin çözümü, desensiz yazılmış yalın kodla karşılaştıramazsın. Bu sayfa o karşılaştırmayı sayarak yapar: her sekmede desenli ve desensiz iki program yan yana çalışır, çağrılar, sınıflar ve dokunulan birimler sayılır.",
      formula: "Desen = Ad + Sorun + Çözüm + Sonuçlar",
      formulaNote: "Sayfada her sekmenin altındaki «Bedeli» kutusu ve katalogdaki son sütun dördüncü parçadır.",
    },
    {
      heading: "Observer: bildirimleri saymak",
      body:
        "Bir <strong>konu</strong> (subject) gözlemcilerinin listesini tutar; olay yayımlayınca listedeki herkesin guncelle() yöntemini sırayla çağırır. Konu gözlemcilerini yalnız bu ortak yöntemle tanır; hangisinin ne yapacağını bilmez. Desenin gücü de bedeli de buradan gelir. Sayım yalındır: liste değişmiyorsa E olay, n gözlemciye E·n bildirim eder. Gözlemcilerden biri aldığı olaya karşılık yeni olay yayımlıyorsa (sayfadaki Türetici, c halkalı zincir) her olay 1 + c yayıma dönüşür. «Zincirleme» hazır düzeninde n = 3, c = 2 için sayfa 9 çağrı sayar; iç içe yayım önce derine indiği için Günlük, türetilmiş olayları asıl olaydan önce görür. Formülün koşulu 'liste değişmiyorsa'dır. Dolaşılırken kısalan canlı listede bir gözlemci atlanır; aboneliği kaldırılmayan kapalı pencere bildirim almayı sürdürür. «Unutulan abonelik» düzeninde iki olayın 12 bildiriminden 6'sı kapanmış pencerelere gider.",
      formula: "Toplam bildirim = E · n · (1 + c)",
      formulaNote: "E olay, n gözlemci, c zincir uzunluğu; liste değişmiyorsa geçerlidir. Koşulsuz yeniden yayımda sayfa döngüyü derinlik 12'de keser: n = 3 için tek olay 36 bildirim eder.",
    },
    {
      heading: "Strategy ve State: aynı tablo, iki eksen",
      body:
        "Üç kargo türü ve iki işlem (ücret, teslim günü) altı kural eder: r × c hücreli bir tablo. Kodu yazmanın iki yolu bu tabloyu iki ayrı eksende dilimler. <strong>Koşullu düzende</strong> birim işlemdir: her işlev, içinde tür başına bir dal taşır. <strong>Strategy düzeninde</strong> birim türdür: her nesne, içinde işlem başına bir yöntem taşır. Hücreler de sonuç da aynıdır; fark ekleme yaparken çıkar. Yeni tür koşullu düzende bütün c işleve birer dal ekletir, Strategy'de tek bir yeni nesnedir. Yeni işlem ise Strategy'de bütün r nesneye dokunur, koşullu düzende tek bir yeni işlevdir. Hangi eksenin büyüyeceğini bilmeden 'doğru' düzen seçilemez. İki ekseni birden, eski koda dokunmadan ve tür denetiminden vazgeçmeden büyütebilme sorusuna <strong>ifade problemi</strong> (expression problem) denir; adı 1998'de Philip Wadler koydu. Bu iki düzenin ikisi de sorunu çözmez, yalnızca birer yarısını kolaylaştırır. State aynı tablonun durum × olay hâlidir. Koşullu düzenin bir bedeli daha var: türü bulana kadar dalları sırayla sınar, k'inci sıradaki tür k karşılaştırma ister; nesne düzeni tek bir dolaylı çağrı yapar.",
      formula: "Yeni tür: koşullu düzende c birim değişir · desende 1 birim eklenir<br>Yeni işlem: koşullu düzende 1 birim eklenir · desende r birim değişir",
      formulaNote: "r tür (ya da durum), c işlem (ya da olay). Yazılan yeni hücre sayısı iki düzende de aynıdır: (r + dr)(c + dc) − r·c.",
    },
    {
      heading: "Bileşim: çarpımı toplama çevirmek",
      body:
        "GoF'un iki büyük öğüdünden biri 'sınıf kalıtımı yerine nesne bileşimini yeğle' der; gerekçesi sayılabilir. n bağımsız özelliğin (tampon, sıkıştırma, şifre…) her birleşimine ayrı bir alt sınıf yazarsan boş olmayan 2<sup>n</sup> − 1 birleşim çıkar; sıra da önemliyse sayı çok daha hızlı büyür. Sayfa birleşimleri tek tek üretip sayar: n = 4 için 15 ve 64, n = 10 için 1023 ve 9864100. <strong>Decorator</strong> her özelliği bir sarmalayıcı yapar: n sınıf yeter, birleşim çalışma anında kurulur. <strong>Bridge</strong> aynı fikri iki eksene uygular: N bileşen × M platform için N·M sınıf yerine N + M. Bu kazanç, her bileşen platformların ortak ilkel işlemleriyle çizilebildiği sürece geçerlidir; bir çifte özel davranış gerekirse özel durumlar geri gelir. <strong>Abstract Factory</strong> ise sınıf sayısını azaltmaz, M fabrika ekleyerek N·M + M'ye çıkarır; azalttığı şey istemci kodunda platforma bakan yerlerin sayısıdır: N'den 1'e.",
      formula: "Alt sınıf: 2<sup>n</sup> − 1  ·  Decorator: n<br>Kalıtım: N·M  ·  Bridge: N + M  ·  Abstract Factory: N·M + M",
      formulaNote: "Yalnız somut sınıflar sayılır; ortak arayüzler ayrıca gerekir. Sıra da önemliyse alt sınıf sayısı Σ n!/(n − k)! olur (k = 1…n).",
    },
    {
      heading: "Singleton: imzada görünmeyen bağımlılık",
      body:
        "Singleton bir sınıfın tek örneği olmasını sağlar ve ona her yerden erişim verir. Sorun ikinci yarıdadır: her yerden erişilen, değiştirilebilen bir nesne, onu kullanan bütün kodu görünmez bir iple birbirine bağlar. Sayfadaki üç test bunu sayıya döker. «fatura» KDV'yi %20 varsayar; «indirim günü» oranı 10, «muaf ürün» 0 yapar ve geri almaz. «fatura» ancak ötekilerden önce koşarsa geçer: k testin k! sıralamasından yalnız (k − 1)! tanesinde. k = 3 için 6'dan 2. Nesneyi her testten önce sıfırlamak ya da her teste yeni bir nesne vermek (<strong>bağımlılık enjeksiyonu</strong>) bütün sıralamaları geçirir. İlki unutulabilen bir disiplin kuralıdır; ikincisi bağımlılığı işlevin imzasına taşır, bedeli de nesneyi ihtiyaç duyan her yere elden ele taşımaktır. Sayfa eşzamanlı kodu göstermez; orada tek örnek ayrıca kilit ister.",
      formula: "Hepsi geçen sıralama: ortak nesnede (k − 1)!  ·  yalıtılmış nesnede k!",
      formulaNote: "Bu sayım sayfadaki kurguya özgüdür: k testten yalnız biri varsayılan değere güvenir, ötekiler onu değiştirir.",
    },
  ],
  lab: {
    intro:
      "Dört sekme var: <strong>01 · Observer</strong>, <strong>02 · Strategy ve State</strong>, <strong>03 · Decorator ve Composite</strong>, <strong>04 · Fabrika, Adapter, Singleton</strong>. Kartların çoğu 'ölçülen · kuram · fark' biçimindedir: ölçülen, sayfada çalışan küçük programdan sayılır; kuram kapalı formüldür. Her sekmede bir «Sekmeyi sıfırla» düğmesi, bir «Bedeli» kutusu ve çalışan sınıfın kendi kaynağını gösteren «Çalışan kod» bölümü bulunur. Sayılan şey süre ya da bellek değil; çağrı, nesne, birim ve sınıftır. Fiyatlar, boyutlar, platformlar ve testler öğretim amaçlı kurgudur; sıkıştırma ve şifre oyuncak örneklerdir.",
    experiments: [
      {
        title: "Kendini listeden çıkaran gözlemci",
        predict:
          "Listede sırayla Ekran, Tek seferlik alarm, Günlük ve Grafik var; alarm ilk bildirimde kendini listeden çıkarıyor. Tek bir olayda kaç guncelle() çağrısı yapılır: dört mü, üç mü? Program hata verir mi?",
        do: "«01 · Observer» sekmesinde hazır düzenlerden «Kendini çıkaran»a bas: dolaşma biçimi «Canlı liste üzerinde (klasik hata)» olur ve bir olay yayımlanır. Kartları ve çağrı günlüğünü oku, «Olay yayımla»ya bir kez daha bas. Karşı deney: «Sekmeyi sıfırla»; Günlük ile Grafik'in işaretini kaldır, Tek seferlik alarmı işaretle, Günlük ile Grafik'i yeniden işaretle; dolaşma «Kopya üzerinde (güvenli)» iken «Olay yayımla».",
        observe:
          "İlk olayda 'ölçülen 3 · kuram 4 · fark −1'; günlükte 'Günlük ATLANDI: bu yayımı hiç almadı' satırı, çizenekte kırmızı bir çarpı. İkinci olay 3 / 3 / 0, toplam 6 / 7 / −1: kayıp bildirim geri gelmez. Karşı deneyde aynı dört gözlemci aynı sırayla 4 / 4 / 0 verir.",
        explain:
          "Konu canlı listeyi dizin sayarak dolaşır. Alarm ikinci sıradayken kendini çıkarınca Günlük onun yerine kayar; sayaç bir sonraki sıraya geçer ve Grafik'i çağırır, Günlük'ü hiç görmez. Kopya üzerinde dolaşınca liste yayımın başındaki hâliyle kalır. Hatanın sinsi yanı sessizliğidir: alarm listenin sonundaysa arkasında atlanacak kimse olmaz ve canlı listede de 4 / 4 / 0 çıkar. Bildirim sırası Observer'ın verdiği bir söz değildir.",
      },
      {
        title: "Yeni tür mü, yeni işlem mi?",
        predict:
          "Üç kargo türü ve iki işlem var: altı kural. Dron türünü eklemek için koşullu düzende kaç eski işleve, Strategy düzeninde kaç eski nesneye dokunman gerekir? Tür yerine yeni bir işlem (karbon tahmini) eklenirse hangisi kazanır?",
        do: "«02 · Strategy ve State» sekmesinde yalnız «Yeni tür ekle: Dron» kutusunu işaretle ve «Ekleme yapınca neye dokunulur?» tablosunu oku. İşareti kaldır, yalnız «Yeni işlem ekle: karbon tahmini»ni işaretle; sonra ikisini birden. Aşağıdaki otomatta «Yeni durum ekle: Bakımda»yı, ardından «Yeni olay ekle: bakım anahtarı»nı işaretle.",
        observe:
          "Dron: Koşullu 2 değiştirilen, 0 eklenen; Strategy 0 değiştirilen, 1 eklenen; yeni hücre 2. Karbon: Koşullu 0 ve 1, Strategy 3 ve 0; yeni hücre 3. İkisi birden: 2 ve 1'e karşı 3 ve 1, yeni hücre 6. Hepsinde ölçülen kurama eşit. Otomatta «Bakımda» tek başına: Koşullu 4 değiştirilen, State 1 eklenen, hücre 16; ama erişilebilir durum 'ölçülen 3 · beklenen 4 · fark −1'. Olay da eklenince 20 hücre ve 4 / 4 / 0.",
        explain:
          "Aynı r × c hücre iki eksende gruplanır. Koşullu düzen işlem eklemeyi, Strategy ve State tür ya da durum eklemeyi tek bir yeni birime indirir; öteki yönde bütün eski birimlere dokunulur. Yazılan yeni hücre sayısı ise hep aynıdır: desen işi azaltmaz, nereye yazılacağını değiştirir. «Bakımda» durumu da bir uyarı taşır: sınıfı yazmak yetmez, oraya götüren bir geçiş yoksa durum çizenekte kesik çizgili, yani ölü kod olarak kalır.",
      },
      {
        title: "Aynı sarmalayıcılar, altı sıra",
        predict:
          "Tampon, Sıkıştır ve Şifrele altı ayrı sırayla dizilebilir. 32 karakterlik tekrarlı metin için hedefe ulaşan çıktı hep aynı uzunlukta mı olur? Sıralardan biri hata verir mi?",
        do: "«03 · Decorator ve Composite» sekmesinde «Sekmeyi sıfırla»ya bas; çıktı uzunluğunu ve yazma çağrısını oku. Sarmalayıcı sırasında Tampon'un ↓ düğmesine bir kez bas. Sonra Şifrele'nin ↑ düğmesine iki kez basıp onu en öne al ve «Aynı sarmalayıcılar, bütün sıralamalar» tablosuna bak. Son olarak «Tekrarsız metin»e bas, sarmalayıcılardan yalnız Sıkıştır'ı işaretli bırak.",
        observe:
          "Başta çıktı «;e=h?kAn»: '8 karakter · girdi 32 · oran 0.25', yazma çağrısı 20 / 20 / 0, hedefe yazma 4 / 4 / 0. Tampon bir sıra sona gidince 16 karakter ve hedefe 2 yazma. Şifrele en öndeyken 64 karakter, oran 2.00. Tablodaki altı sıralamadan biri 8, ikisi 16, üçü 64 karakter verir; hepsi geri çözülür. Tekrarsız metin yalnız Sıkıştır'la da 64 karakter olur.",
        explain:
          "Sıkıştır yalnız kendisine gelen parçadaki tekrarları sayar: tampon 8'lik blok verirse «8a», kaynak 4'lük parça verirse «4a4a» yazar. Şifre her konumda anahtarı kaydırdığı için aynı harfleri farklı harflere çevirir; ardından gelen Sıkıştır tekrar bulamaz, her karaktere bir sayaç ekleyip metni ikiye katlar. Hiçbir sıra hata vermez, çünkü hepsi aynı arayüzü sunar. Decorator'ın bedeli budur: yanlış sıra çalışır, yalnızca kötü sonuç verir. Çağrı sayımı da tutar: 1·8 + 3·4 = 20.",
      },
      {
        title: "Üç test, altı sıra, bir ortak nesne",
        predict:
          "Üç test aynı Ayarlar nesnesinden KDV oranını okuyor ve şu anki sırada üçü de geçiyor. Kodlarına hiç dokunmadan yalnız sıralarını değiştirirsen yine geçerler mi? Altı sıralamanın kaçında hepsi geçer?",
        do: "«04 · Fabrika, Adapter, Singleton» sekmesinin Singleton bölümünde «fatura» satırındaki ↓ düğmesine bir kez, sonra bir kez daha bas; her seferinde sonuç tablosunu ve altındaki açıklamayı oku. Ardından «Ayarlar nesnesi nasıl elde ediliyor?» menüsünden önce «Singleton, her testten önce sıfırlanır»ı, sonra «Enjekte edilir: her teste yeni nesne verilir»i seç.",
        observe:
          "Başta geçen test '3 / 3', oluşturulan nesne 1 / 1 / 0, hepsi geçen sıralama 2 / 2 / 0 ve 'Evet: 6 sıralamadan 4 tanesinde test kalıyor'. «fatura» ikinci sıraya inince '2 / 3': 120 bekledi, 110 buldu. Üçüncü sıraya inince 100 buldu. Öteki iki seçenekte bu sırada da '3 / 3', nesne 3 / 3 / 0, sıralama 6 / 6 / 0.",
        explain:
          "«fatura»nın kodunda hata yok; hata, kendisinden önce koşan testin ortak nesnede bıraktığı oranda. Bağımlılık işlevin imzasında görünmediği için testi okuyarak bulunamaz. «fatura» ancak ilk sıradaysa geçer: 3! = 6 sıralamadan (3 − 1)! = 2 tanesi. Sıfırlama işe yarar ama unutulabilen bir kuraldır; enjeksiyonda unutulacak bir şey kalmaz, bedeli nesneyi gereken her yere taşımaktır.",
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
        "Kitabın on beşinci yılı olan 2009'da yayımlanan bir söyleşide Erich Gamma, yazarların kitabı bugün olsa nasıl düzenleyeceklerini konuştuğunu anlattı. Kendi adayı Singleton'dı: 'Kullanımı neredeyse her zaman bir tasarım kokusudur.' Yazarlar arasında görüş birliği çıkmadı; kitap da yeniden yazılmadı, Singleton yerinde duruyor. Sayfanın dördüncü sekmesi gerekçeyi sayıya döker: ortak Ayarlar nesnesini kullanan üç testin altı sıralamasından yalnız ikisinde hepsi geçer. Peter Norvig de 1996'da 23 desenin 16'sının Lisp ve Dylan'da ya görünmez olduğunu ya da çok daha basit yazıldığını göstermişti: desenlerin bir kısmı dilin eksiğini kapatan yamadır.",
    },
    {
      title: "Mimar 253 desen yazdı, programcılar 23",
      body:
        "Christopher Alexander ve arkadaşlarının 1977 tarihli A Pattern Language kitabında bölge ölçeğinden odadaki eşyalara inen, numaralanmış 253 desen vardır; 159 numara 'her odaya iki yönden ışık' der. Gamma ve arkadaşları bu kitabı okuyup fikri yazılıma uyarladı; GoF'un giriş bölümü Alexander'ın tanımını kelimesi kelimesine alıntılar. Alexander 1996'da OOPSLA'da programcılara davetli bir konuşma yaptı; onlara, desenlerin kendisi için yalnızca bir yazım biçimi değil, insanların içinde daha iyi yaşadığı yapılar kurma aracı olduğunu hatırlattı ve yazılımda da aynı ölçütün aranıp aranmadığını sordu.",
    },
  ],
  worked: {
    title: "N bileşen, M platform: üç tasarımın sınıf sayımı",
    prompt:
      "Bir arayüz kitaplığı N = 6 bileşeni (düğme, onay kutusu, kaydırıcı…) M = 5 platformda çizecek. (a) Kalıtımla, Bridge ile ve Abstract Factory ile kaç somut sınıf gerekir? (b) Altıncı platform kaç yeni sınıf ister? (c) Arayüz 5. platformda kurulurken platform kaç kez sınanır? (d) Bridge hangi N, M için kazandırmaz?",
    steps: [
      "Kalıtımda her (bileşen, platform) çifti ayrı bir sınıftır: N·M = 6·5 = 30. Bridge iki ekseni ayırır: N soyutlama + M uygulayıcı = 6 + 5 = 11 sınıf, yani 19 sınıf daha az. Sayfada «04» sekmesinde N = 6, M = 5 yap: kartlar 30 / 30 / 0 ve 11 / 11 / 0 gösterir; 'aynı çıktıyı veren çift' 30 / 30 / 0'dır, yani iki model her çiftte aynı çizimi üretir.",
      "Abstract Factory, kalıtımdaki 30 ürün sınıfını aynen tutar ve her platform için bir fabrika sınıfı ekler: N·M + M = 30 + 5 = 35. Sınıf sayısı azalmaz, artar. Sayfadaki kart 35 / 35 / 0 gösterir.",
      "Altıncı platform kalıtımda her bileşen için bir sınıf ister: N = 6 yeni sınıf. Bridge'de tek bir yeni uygulayıcı yeter: 1 sınıf. Kart '6 / 1' yazar. Abstract Factory'de 6 ürün sınıfına bir fabrika eklenir: 7 yeni sınıf.",
      "Fabrikasız kodda her bileşeni oluştururken platform zinciri baştan sınanır; j'inci sıradaki platform j karşılaştırmada bulunur. «5. iOS» seçiliyken N·j = 6·5 = 30 karşılaştırma yapılır. Fabrikayla platform bir kez seçilir: j = 5 karşılaştırma. Kart '30 / 5' gösterir; platforma bakan kod noktası 6'dan 1'e iner. Abstract Factory'nin kazancı budur.",
      "Fark N·M − (N + M) = (N − 1)(M − 1) − 1 olarak yazılabilir. Bridge'in kazandırması için (N − 1)(M − 1) > 1 gerekir. M = 1 ise fark −1'dir: tek platformda Bridge bir sınıf fazla ister (N = 8 için 8'e karşı 9). N = M = 2'de iki sayı eşittir (4 ve 4). Kazanç ancak iki eksen birlikte büyüyünce açılır: N = M = 8'de 64'e karşı 16.",
    ],
    result:
      "Kalıtım 30, Bridge 11, Abstract Factory 35 somut sınıf ister; yeni platform sırasıyla 6, 1 ve 7 sınıf ekler. Bridge yalnız (N − 1)(M − 1) > 1 iken ve her bileşen ortak ilkel işlemlerle çizilebiliyorsa kazandırır; Abstract Factory sınıf sayısını değil, platform kararının verildiği yer sayısını azaltır (6 → 1). Ortak arayüzler bu sayımların dışındadır.",
  },
  misconceptions: [
    {
      myth: "Tasarım deseni, indirip projeye eklenen hazır bir kod parçasıdır.",
      truth:
        "Desen bir kütüphane değil, bir tariftir. GoF kitabındaki örnekler C++ ve Smalltalk'la yazılmıştı; bu sayfadaki Konu sınıfı aynı fikrin yirmi küsur satırlık bir JavaScript hâlidir. Tarayıcının addEventListener'ı aynı fikrin başka bir biçimidir: tek seferlik dinleyiciyi { once: true } seçeneğiyle tarayıcı kendisi kaldırır, olay işlenirken eklenen dinleyici de o olayda çağrılmaz. Alexander'ın cümlesini hatırla: aynı çözümü 'milyon kez, her seferinde farklı biçimde'.",
    },
    {
      myth: "Ne kadar çok desen kullanılırsa kod o kadar iyi olur.",
      truth:
        "Desen bir sorunun cevabıdır; sorun yoksa geriye yalnız bedeli kalır. Sayfada sayabilirsin: tek platformlu bir projede Bridge, kalıtımdan bir sınıf fazla ister (N = 8, M = 1 için 8'e karşı 9); iki türlük bir kural için Strategy gereksiz nesne ve dolaylılık getirir; her sarmalayıcı çağrı yığınına bir katman ekler. Önce sorunu ve hangi yönde büyüyeceğini yaz, deseni sonra seç.",
    },
    {
      myth: "Strategy ile State aynı desendir; sınıf çizimleri zaten özdeş.",
      truth:
        "Çizim aynı, niyet farklı. Sayfadaki kargo örneğinde türü dışarıdan sen seçersin ve seçilen nesne başka bir türe geçmez: Strategy. Otomatta ise her durum yöntemi bir sonraki durumu kendisi döndürür; «Jeton var» durumunda ürün seçilince makine stoka göre «Boşta»ya ya da «Tükendi»ye geçer: State. Bir desen çizimiyle değil, çözdüğü sorunla tanınır.",
    },
    {
      myth: "Abstract Factory sınıf sayısını N·M'den N + M'ye indirir.",
      truth:
        "İndirmez. N + M'yi veren Bridge'dir, o da yalnız her bileşen ortak ilkel işlemlerle anlatılabildiğinde. Abstract Factory'de N·M ürün sınıfı yerinde durur, üstüne M fabrika eklenir: N·M + M. Varsayılan N = 4, M = 3 için sayfa 12, 7 ve 15 sayar. Fabrikanın kazancı başka yerdedir: istemci platforma N yerde değil, tek yerde bakar. Bedeli de vardır: yeni bir bileşen türü bütün fabrikaları değiştirir.",
    },
  ],
  glossary: [
    { term: "Arayüz (interface)", definition: "Bir nesnenin dışarıya söz verdiği yöntem listesi; içinin nasıl yazıldığını gizler." },
    { term: "Kalıtım", definition: "Bir sınıfın başka bir sınıfın alanlarını ve yöntemlerini devralması; 'bir türüdür' ilişkisi." },
    { term: "Bileşim (composition)", definition: "Bir nesnenin başka nesneleri içinde tutarak iş yaptırması; 'bir parçası vardır' ilişkisi." },
    { term: "Konu ve gözlemci", definition: "Konu olayı yayımlayan, gözlemci ona abone olup bildirim alan nesnedir; konu gözlemcilerini yalnız ortak arayüzleriyle tanır." },
    { term: "Sarmalayıcı", definition: "Sardığı nesneyle aynı arayüzü sunan, kendi işini yapıp gerisini içindekine devreden nesne." },
    { term: "Dolaylı çağrı", definition: "Hangi kodun çalışacağının derlemede değil, çalışma anında o anki nesneye bakılarak belirlendiği çağrı." },
    { term: "Ortak değiştirilebilir durum", definition: "Programın birden çok yerinden erişilip değiştirilebilen veri; kullanan parçaları görünmeden birbirine bağlar." },
    { term: "Bağımlılık enjeksiyonu", definition: "Bir işlevin ihtiyaç duyduğu nesneyi kendisi bulması yerine dışarıdan parametre olarak alması." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede bir program 'çalışıyorsa' iyidir; üniversitede soru değişir: altı ay sonra başka biri bu kodu değiştirebilir mi? Yazılım mühendisliği ve nesne yönelimli tasarım dersleri GoF'un iki ilkesini açarak başlar ve <strong>SOLID</strong> ilkelerine ulaşır: tek sorumluluk, açık-kapalı, Liskov yerine geçme, arayüz ayrımı, bağımlılığın tersine çevrilmesi. Beşli tek kişinin buluşu değildir: açık-kapalı ilkesi Bertrand Meyer'in 1988 tarihli kitabından, yerine geçme ilkesi Barbara Liskov'un 1987'deki konuşmasından gelir; Robert C. Martin bunları 2000'de derleyip yaygınlaştırdı, baş harflerinden SOLID sözcüğünü de Michael Feathers türetti. İkinci sekmedeki ekleme tablosu açık-kapalı ilkesinin sayılmış hâlidir ve sınırını da gösterir: bir düzen ancak tek bir eksende 'değiştirmeden genişletilebilir'. Martin Fowler'ın 1999'daki <em>Refactoring</em> kitabı ise kötü kodu adım adım desenlere doğru yeniden biçimlendirmeyi öğretir; desenler hedef, refactoring yoldur. Mimari ölçekte aynı fikirler MVC (1979'da Xerox PARC'ta Trygve Reenskaug), katmanlı mimari ve mikroservisler olarak karşına çıkar.",
      "Köprünün öteki ucunda desenlerin sorgulandığı yer var. Fonksiyonel programlamada bir fonksiyonu parametre olarak geçirebildiğin için Strategy deseni bir satıra iner; Norvig'in 16/23 gözlemi burada ders olur: JavaScript'te liste.sort((a, b) => a - b) yazdığında karşılaştırma kuralını dışarıdan vermiş olursun, ama ortada ne arayüz ne sınıf vardır. Programlama dilleri dersinde ifade problemiyle yeniden karşılaşırsın: türleri ve işlemleri aynı anda, eski kodu değiştirmeden büyütmenin yolları aranır. Eşzamanlı programlamada yeni desen aileleri doğar: üretici-tüketici, aktör modeli, kilit yerine mesajlaşma. Derleyici derslerinde Interpreter ve Visitor, soyut sözdizimi ağacı üzerinde gezinirken yeniden ortaya çıkar. Ve 2017'de Java 9'un java.util.Observer ile Observable'ı 'kullanımdan kaldırılmış' diye işaretlemesi sana şunu öğretir: desen kalıcıdır, kütüphanedeki hâli değil.",
    ],
    topics: ["SOLID ilkeleri", "Refactoring ve kod kokuları", "İfade problemi", "Fonksiyonel programlama ve yüksek dereceli fonksiyonlar", "Birim testi ve bağımlılık enjeksiyonu", "Eşzamanlılık desenleri", "Soyut sözdizimi ağacı ve Visitor"],
  },
  quiz: [
    {
      question: "Bir konunun listesinde 5 gözlemci var; biri, aldığı olaya karşılık c = 3 halkalı bir zincirle yeni olay yayımlayan bir türetici. Liste hiç değişmiyor. 4 olay yayımlanırsa toplam kaç guncelle() çağrısı yapılır?",
      options: ["20", "32", "60", "80"],
      answer: 3,
      explanation: "Her olay 1 + c = 4 yayıma dönüşür; her yayım listedeki 5 gözlemcinin hepsine ulaşır. E · n · (1 + c) = 4 · 5 · 4 = 80. Türeticisiz aynı liste 20 çağrıyla yetinirdi: tek bir gözlemcinin davranışı bütün sistemin yükünü dört katına çıkarır ve konu bunu bilmez.",
    },
    {
      question: "Bir çizim programında 5 şekil türü ve 3 işlem (alan, çevre, çiz) var. Dördüncü işlem olarak 'dışa aktar' eklenecek. Eski birimlerden kaçı değişir?",
      options: [
        "Koşullu düzende 3 işlev, tür-nesnesi düzeninde 0 nesne",
        "Koşullu düzende 0 işlev (1 yeni işlev yazılır), tür-nesnesi düzeninde 5 nesne",
        "İki düzende de 5 birim",
        "İki düzende de 0 birim; yalnız yeni kod yazılır",
      ],
      answer: 1,
      explanation: "Yeni işlem tabloya bir sütun ekler: 5 yeni hücre. Koşullu düzende bu hücreler tek bir yeni işlevde toplanır, eski işlevlere dokunulmaz. Her türün bir nesne olduğu düzende ise 5 nesnenin her birine bir yöntem eklenir. Yeni bir şekil türü eklenseydi durum tersine dönerdi: 3 eski işlev değişir, tek bir yeni nesne yazılırdı.",
    },
    {
      question: "32 karakterlik tekrarlı metin Tampon → Sıkıştır → Şifrele sırasında 8 karaktere iniyor, Tampon → Şifrele → Sıkıştır sırasında 64 karaktere çıkıyor. Bunun nedeni nedir?",
      options: [
        "Şifreleme metni iki katına çıkarır",
        "Tampon ikinci sırada blokları ikiye böler",
        "Konuma göre kayan şifre tekrarları bozar; tekrar bulamayan sıkıştırma her karaktere bir sayaç ekler",
        "İkinci sırada katmanlar geri çözülemediği için çıktı bozulur",
      ],
      answer: 2,
      explanation: "Şifre uzunluğu değiştirmez; yalnız her konumda başka bir kaydırma uygular, böylece 'aaaaaaaa' sekiz farklı karaktere dönüşür. Tekrar sayan sıkıştırma artık her koşuyu 1 uzunlukta görür ve her karakteri iki karakterle yazar: 32 → 64. İki sıra da geri çözülür ve hata vermez; sarmalayıcıların sırası yalnız sonucun kalitesini belirler.",
    },
  ],
  next: [
    { href: "programlama-paradigmalari.html", title: "Programlama Paradigmaları: Aynı Problem, Farklı Düşünme Biçimleri", why: "Aynı problemi buyurgan, fonksiyonel, özyineli ve mantıksal tarzda çalıştırıp atamaları, çağrı yığını derinliğini ve geri izlemeleri sayar; desenlerin üzerinde durduğu zemin." },
    { href: "yazilim-muhendisligi.html", title: "Yazılım Mühendisliği: Sürüm, Test, Tahmin ve Akış", why: "Singleton deneyindeki kırılgan testlerin devamı: testlerin kapsamasını ve mutasyon skorunu ölç, commit grafiğinde dal açıp birleştir." },
    { href: "bicimsel-diller-ve-otomata-teorisi.html", title: "Biçimsel Diller ve Otomata Teorisi", why: "State sekmesindeki geçiş tablosunun kuramı: tabloyu kendin doldur, sonlu otomatı adım adım çalıştır, NFA'yı DFA'ya çevir." },
    { href: "veri-yapilari.html", title: "Veri Yapıları Laboratuvarı", why: "Composite'in ağacı ve Tampon'un bloğu burada birer veri yapısı olur: halka tampon, BST ile AVL yüksekliği, her işlem sayaçlı gerçek bir uygulamada." },
  ],
  sources: [
    { title: "Wikipedia · Design Patterns (Gang of Four kitabı)", url: "https://en.wikipedia.org/wiki/Design_Patterns", note: "Kitabın Ekim 1994'te OOPSLA'daki çıkışı, 5 + 7 + 11 desenin listesi, Norvig'in 16/23 gözlemi ve Gamma'nın Singleton'ı çıkarma isteği (İngilizce)." },
    { title: "Wikipedia · Software design pattern", url: "https://en.wikipedia.org/wiki/Software_design_pattern", note: "Alexander'dan Beck ve Cunningham'a desen fikrinin yazılıma geçişi; desen türleri ve eleştiriler." },
    { title: "Wikipedia · WikiWikiWeb", url: "https://en.wikipedia.org/wiki/WikiWikiWeb", note: "İlk wiki'nin Portland Pattern Repository için 1995'te kuruluşu." },
    { title: "MDN · EventTarget.addEventListener()", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener", note: "Observer fikrinin tarayıcıdaki biçimi: dinleyici ekleme, once seçeneğiyle tek seferlik dinleyici, olay sırasında eklenen dinleyicinin davranışı (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
