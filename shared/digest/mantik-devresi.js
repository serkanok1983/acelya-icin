window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["mantik-devresi"] = {
  slug: "mantik-devresi",
  title: "Mantık Devresi: Kapılardan Hesaplamaya",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Yedi küçük kapı, iki voltaj seviyesi, bir doğruluk tablosu: 1847'de bir ayakkabıcının oğlunun kurduğu cebir, 1937'de 21 yaşındaki bir öğrencinin elinde devreye dönüştü. Bugün cebinde milyarlarca kopyası var.",
  hook:
    "Elinde yalnızca tek çeşit parça olsa, hepsi birbirinin tıpatıp aynısı, bunlardan bir hesap makinesi yapabilir misin? Yapabilirsin; parçanın adı NAND. Apollo'yu Ay'a götüren bilgisayarın mantığı da neredeyse bütünüyle tek tür kapıdan, binlerce NOR'dan örülmüştü. Bu sayfanın beş sekmesi aynı yolun duraklarıdır: tabloyu yaz, devreyi kur, sadeleştir, eldeyi ölç, sonra çıkışı girişe bağla ve devrenin <em>hatırladığını</em> gör.",
  bigIdea:
    "Geri beslemesiz her mantık devresi bir <strong>doğruluk tablosudur</strong>: n giriş için 2<sup>n</sup> satır, her satırda tek bir çıkış. Kapıları birleştirmek tabloları birleştirmektir; çıkışı girişe geri bağladığın an tablo yetmez olur ve <em>hafıza</em> doğar.",
  story: [
    "George Boole 1815'te İngiltere'nin Lincoln kentinde bir ayakkabıcının oğlu olarak doğdu; üniversitede hiç okumadı, dilleri ve matematiği büyük ölçüde kendi başına öğrendi, on altı yaşında öğretmenlik yaparak ailesini geçindirdi. 1847'de <em>The Mathematical Analysis of Logic</em>, 1854'te <em>An Investigation of the Laws of Thought</em> adlı kitaplarında garip bir cebir önerdi: değişkenler yalnızca 0 ya da 1 olabiliyor, x·x = x oluyor, 've' çarpma gibi, 'veya' toplama gibi davranıyordu. Boole bunu düşüncenin yasalarını yazmak için yapmıştı; aklında devre diye bir şey yoktu. 1849'da Cork'taki Queen's College'ın ilk matematik profesörü oldu; 1864'te, 49 yaşında, yağmur altında derse yürüdükten sonra hastalanıp öldü. Cebri yaklaşık seksen yıl boyunca daha çok mantıkçıların ve matematikçilerin konusu olarak kaldı.",
    "1937'de MIT'de yüksek lisans yapan 21 yaşındaki Claude Shannon, Vannevar Bush'un diferansiyel analizörüne, onun röleli denetim devresine bakıyordu. Röle, bir elektromıknatısın çektiği anahtardır: akım var ya da yok, kontak kapalı ya da açık. Shannon lisansta gördüğü Boole cebrini hatırladı ve iki şeyin aynı olduğunu fark etti: seri bağlı iki anahtar 'VE', paralel bağlı iki anahtar 'VEYA' demekti. Tezi <em>A Symbolic Analysis of Relay and Switching Circuits</em> 1938'de yayımlandı ve devre tasarımını deneme yanılmadan cebire çevirdi: artık bir devreyi önce kâğıtta sadeleştirip sonra kurabiliyordun. Fikir havadaydı: Japonya'da Akira Nakashima ve Sovyetler Birliği'nde Viktor Şestakov da aynı yıllarda, birbirinden bağımsız olarak anahtarlama devrelerini Boole cebriyle yazmaya girişmişti; dünyaya yayılan ise Shannon'ın tezi oldu. Yine o yıllarda Berlin'de Konrad Zuse, Shannon'dan habersiz, yaklaşık 2600 röleyle çalışan Z3'ü kurdu (1941); saniyede 5–10 vuruşluk saatiyle bu makine, programla yönetilen ilk bilgisayarlardan biriydi.",
    "Röle yavaş ve gürültülüydü. 1947'de Bell Laboratuvarları'nda transistör bulundu; 1958'de Texas Instruments'ta Jack Kilby bir transistörü, dirençleri ve kondansatörü tek bir germanyum parçasının üstünde birleştirerek ilk tümleşik devreyi yaptı ve 2000 Nobel Fizik Ödülü'nü paylaştı. 1960'larda MIT Instrumentation Laboratory, Apollo Yönlendirme Bilgisayarı'nın mantığını neredeyse bütünüyle tek tür çipten kurdu: yaklaşık 2800 entegre, hemen hepsi içinde iki tane üç girişli NOR kapısı taşıyan aynı parça. 1971'de Intel 4004 işlemcisinde 2300 transistör vardı; 2020'de Apple M1'de 16 milyar. Aradaki fark yedi milyon kat, ama ilke aynı: Devre kurucu sekmesinde tek tek yerleştirdiğin kapılar, yalnızca çok daha küçük ve çok daha hızlı.",
  ],
  core: [
    {
      heading: "Bir tablo, sayısız ifade",
      body:
        "Bir devreyi tanımlayan şey çizimi ya da formülü değil, <strong>doğruluk tablosudur</strong>: her giriş birleşimi için çıkışın ne olduğu. n girişle 2<sup>n</sup> satır vardır; iki girişte dört satırın her birine 0 ya da 1 yazılabildiğine göre olası işlev sayısı 2⁴ = 16'dır. AND, OR, XOR ve bunların tersleri olan NAND, NOR, XNOR bu on altının en kullanışlı altısıdır. Aynı tabloyu veren ifade ise sonsuz sayıdadır; bu yüzden tablonun kendisinden okunan bir <em>kimlik</em> işe yarar. Tablonun tek bir satırında 1 veren çarpıma <strong>minterim</strong> denir; çıkışın 1 olduğu satırların minterimlerini toplarsan işlevin kanonik biçimini elde edersin ve onu kısaca satır numaralarıyla yazarsın. İlk sekme açılışta ¬(A·B) ile ¬A + ¬B'yi karşılaştırır ve ikisi için de aynı listeyi verir: Σm(0, 1, 2) = ΠM(3). İki ifadenin özdeş olup olmadığını anlamanın en dürüst yolu da budur: bütün satırları denemek. Dört değişkende 16 satır vardır ve hepsi denenebildiği için sonuç bir örnekleme değil, kanıttır. Aynı yöntem 64 girişli bir toplayıcıda işlemez; satır sayısı her yeni girişle ikiye katlanır.",
      formula: "A ⊕ B = Σm(1, 2) = ¬A·B + A·¬B   ·   satır sayısı = 2<sup>n</sup>",
      formulaNote: "Satır numarası, en soldaki değişken en anlamlı bit sayılarak okunur: A = 0, B = 1 satırı 1, A = 1, B = 0 satırı 2'dir. Boole cebrinde 1 + 1 = 1'dir; + işareti 'veya' demektir.",
    },
    {
      heading: "De Morgan ve NAND'ın gizli gücü",
      body:
        "Augustus De Morgan'ın (1806–1871) iki yasası, değil işaretini bir çarpımın içine taşırken çarpımı toplama, toplamı çarpıma çevirir. Bu, NAND'ı özel yapar: aynı kapı hem 'A ve B'nin değili' hem de 'A'nın değili veya B'nin değili'dir. İki girişini birbirine bağlarsan NOT olur; arkasına bir NOT koyarsan AND; girişlerine birer NOT koyarsan OR. Bu üçü neden her şeye yeter? Çünkü her doğruluk tablosu, çıkışın 1 olduğu satırların minterimleri AND ile yazılıp hepsinin OR'lanmasıyla kurulabilir; bu iş yalnızca AND, OR ve NOT ister. Yani yalnızca NAND'larla her tablo, dolayısıyla geri beslemesiz her devre kurulur; buna <strong>işlevsel tamlık</strong> denir ve NOR da tek başına aynı güce sahiptir. Charles Sanders Peirce bunu 1880 dolaylarında fark etmiş ama yayımlamamıştı; Henry Sheffer 1913'te yayımladı ve NAND'ın cebirdeki simgesi bugün 'Sheffer çizgisi' diye anılır. Fabrikalar da NAND'ı sever: CMOS teknolojisinde iki girişli bir NAND 4 transistördür, AND ise NAND artı NOT, yani 6.",
      formula: "¬(A·B) = ¬A + ¬B    ¬(A + B) = ¬A·¬B",
      formulaNote: "İlk sekmedeki De Morgan 1 ve De Morgan 2 düğmeleri iki yanı tabloda karşılaştırır: 4 / 4. İkinci sekmedeki 'Dört NAND ile XOR' hazır devresi XOR'u yalnız NAND'dan kurar ve hedefle 4 / 4 uyuşur.",
    },
    {
      heading: "Komşu hücreler bir değişkeni yutar",
      body:
        "Sadeleştirmenin bütün sırrı tek satırlık bir özdeşliktir: X·Y + X·¬Y = X. İki çarpım yalnızca bir değişkende ayrılıyorsa o değişken düşer. <strong>Karnaugh haritası</strong> (Maurice Karnaugh, 1953) bu çiftleri göze görünür kılar: satır ve sütunlar 00, 01, 11, 10 sırasıyla, yani Gray koduyla dizilir; böylece yan yana duran iki hücre her zaman tek bitte ayrılır, haritanın karşılıklı kenarları da komşudur. İki hücrelik grup bir değişkeni, dört hücrelik grup iki değişkeni, sekiz hücrelik grup üçünü siler. Daha büyük bir gruba katılamayan gruplara <strong>asal implikant</strong> denir; iş, 1'lerin hepsini en az sayıda asalla örtmektir. Değeri hiç sorulmayacak girişler <strong>önemsiz</strong> (X) diye işaretlenir ve grubu büyütmek için bedava kullanılır. Üçüncü sekmenin açılış haritası bunun güzel bir örneğidir: yedi parçalı göstergenin a parçası 0, 2, 3, 5, 6, 7, 8, 9 rakamlarında yanar, 10–15 girişleri hiç gelmez. Sekiz minterimin toplamı 44 kapı girişi isterken sadeleşmiş F = C + A + ¬B·¬D + B·D yalnızca 12 ister; ¬B·¬D grubu haritanın dört köşesidir. Sayfa bu işi elle değil, Quine–McCluskey yöntemiyle yapar: bütün asalları bulur, en küçük örtüyü kesin aramayla seçer ve sonucu tabloyla satır satır karşılaştırır.",
      formula: "X·Y + X·¬Y = X·(Y + ¬Y) = X   ·   2<sup>k</sup> hücrelik grup → n − k harfli terim",
      formulaNote: "Sınırı da sayfada görürsün: 'Dama tahtası' haritasında hiçbir 1'in komşusu yoktur ve kapı girişi 44 → 44 kalır. O işlev dört girişin XOR'udur; iki düzeyli çarpımlar toplamı XOR'u göremez, sayfanın maliyet ölçüsü de çok düzeyli çözümleri saymaz.",
    },
    {
      heading: "Toplama yapan kapılar ve eldenin yolu",
      body:
        "İkilik sayılarda tek basamağı toplamak dört durumdur: 0+0=0, 0+1=1, 1+0=1, 1+1=10. Toplam basamağı tam olarak XOR'un tablosudur, elde basamağı ise AND'in; bu çifte <strong>yarım toplayıcı</strong> denir. Bir önceki basamaktan gelen eldeyi de alan <strong>tam toplayıcı</strong> beş kapıdır: P = A ⊕ B, G = A·B, T = P·C, C' = G + T, S = P ⊕ C. N tanesini zincirlediğinde elde bir basamaktan ötekine dalga gibi yürür; adı da buradan gelir: dalgalı elde toplayıcısı. Bedeli zamandır. Her kapı sonucunu bir τ gecikmesiyle verir; elde her blokta bir VE ve bir VEYA kapısından geçer, yani blok başına 2τ öder, en başta P'nin hazırlanması için bir XOR gecikmesi daha gerekir. XOR'un gecikmesi kτ ise en kötü durumda son elde (2N + k)τ, son toplam biti (2N − 2 + 2k)τ sonra oturur. Dördüncü sekme bu formülü, giriş değişimlerini tek tek benzeterek ölçtüğü en kötü durumla yan yana koyar (4 bite kadar hepsini, daha fazlasında bir örneklemi dener). <strong>Elde öngörülü</strong> yapı ise her eldeyi P ve G sinyallerinden iki kapı düzeyinde doğrudan hesaplar; gecikme bit sayısıyla büyümez, karşılığında daha çok ve daha geniş kapı ister: 4 bitte 20 yerine 26 kapı, 40 yerine 68 kapı girişi.",
      formula: "T<sub>dalgalı</sub> = max(2N + k, 2N − 2 + 2k)·τ   ·   T<sub>öngörülü, 4 bit</sub> = (2k + 2)·τ",
      formulaNote: "k = 1, N = 4 için 9τ ve 4τ. Sayfadaki τ = 10 ns bir öğretim değeridir; model beş girişli kapıyı da τ sayar, bu iyimserdir. Gerçekte geniş kapı yavaştır ve büyük toplayıcılar öngörüyü 4 bitlik öbekler hâlinde kademelendirir.",
    },
    {
      heading: "Döngüyü kapat, hafıza doğsun; saati ekle, düzen gelsin",
      body:
        "Buraya kadarki devrelerde sinyal hep girişten çıkışa aktı; girişler belliyse çıkış bellidir. Buna <strong>kombinasyonel</strong> devre denir. İki NOR kapısının çıkışlarını çaprazlama birbirinin girişine bağladığında kural bozulur: S = R = 0 iken denklemlerin iki ayrı tutarlı çözümü vardır, (Q, Qn) = (1, 0) ve (0, 1). Devre en son hangisine itildiyse orada kalır; bir bitlik bellek budur. Bu <strong>SR kilidi</strong>, 1918'de William Eccles ve Frank Jordan'ın iki vakum tüpüyle kurduğu tetikleme devresinin torunudur. Böyle <strong>ardışıl</strong> devrelerde çıkış girişlere değil, girişlerin <em>tarihine</em> bağlıdır. Tarihi yönetilebilir kılan şey saattir. <strong>D kilidi</strong> saat 1 olduğu sürece saydamdır: D'deki her oynama, bir önceki kartta gördüğün glitch'ler dahil, çıkışa geçer. <strong>Flip-flop</strong> ise yalnız yükselen kenardaki D'yi alır ve sonraki kenara kadar tutar; kombinasyonel mantığın bütün dalgalanması iki kenar arasında kalır. Koşulu şudur: veri, kenardan önce <strong>kurulum süresi</strong> t<sub>k</sub> kadar kıpırdamadan beklemelidir. Flip-flop'ların önüne bir sonraki durumu hesaplayan mantığı koyduğunda <strong>sonlu durum makinesine</strong> varırsın.",
      formula: "Q = ¬(R + Qn),  Qn = ¬(S + Q)   ·   T<sub>saat</sub> ≥ T<sub>mantık</sub> + t<sub>k</sub>",
      formulaNote: "S = 1 kurar, R = 1 sıfırlar, ikisi 0 iken tutar; S = R = 1 iki çıkışı da 0 yapar (yasak durum). Saat koşulunda gerçek tasarım flip-flop'un çıkış gecikmesini de ekler ve kenardan sonraki tutma süresini ayrıca denetler; sayfa elemanları davranışsal işler, çıkış gecikmesini sıfır alır ve tutma süresini modellemez.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın beş sekmesi var. <strong>01 · Kapılar ve doğruluk tablosu</strong>: <strong>İfade 1</strong> ve <strong>İfade 2</strong> kutularına yazdığın iki ifadenin (A–D değişkenleri; <code>¬A</code>, <code>!A</code> ya da <code>A'</code>, yan yana yazım VE, <code>+</code> VEYA, <code>^</code> XOR) tablosu, kapı şeması ve minterim listeleri çıkar; De Morgan 1, Dağılma, Yutma, Konsensüs, Yanlış özdeşlik gibi hazır çiftler vardır. <strong>02 · Devre kurucu</strong>: <strong>+ Giriş</strong>, <strong>+ AND</strong> … <strong>+ Çıkış</strong> düğmeleriyle eleman ekler, bir çıkış pimine sonra bir giriş pimine dokunarak (ya da klavyeyle Kaynak, Hedef ve <strong>Bağla</strong> ile) tel çekersin; <strong>Hazır devre</strong> menüsünde yarım ve tam toplayıcı, seçici, SR kilidi ve dört NAND'lı XOR durur. <strong>03 · Sadeleştirme (Karnaugh)</strong>: hücreye basınca değer 0 → 1 → X diye döner; sayfa asal implikantları, en küçük örtüyü ve kapı girişi kazancını yazar. <strong>04 · Toplayıcılar ve gecikme</strong>: <strong>Toplayıcı yapısı</strong>, <strong>Bit sayısı N</strong> (1–8), <strong>Kapı gecikmesi τ</strong> (1–20 ns) ve önceki/sonraki A, B, C₀ girişleriyle bir giriş değişimi tanımlar, çıkışların ne zaman oturduğunu ölçersin. <strong>05 · Ardışıl mantık</strong>: <strong>Devre</strong> menüsünden kilit, flip-flop, sayıcı, yazmaç ya da dizi algılayıcı seçer; girişleri ve saati düğmelerle sürersin. Model idealdir ve bunu bilerek kullanmalısın: sinyaller yalnız 0 ve 1'dir, gerilim ve gürültü yoktur; kurucuda bağlanmamış pim 0 sayılır; τ'nun nanosaniye değeri bir öğretim değeridir; ardışıl elemanlar davranışsaldır, kurulum süresi bir pencere parametresidir ve tutma süresi modellenmez.",
    experiments: [
      {
        title: "Fazladan bir terim: önce tabloya, sonra haritaya sor",
        predict: "A·B + ¬A·C + B·C ifadesinden B·C terimini silersen tablonun sekiz satırından kaçı değişir? Peki A + B·C ile (A + B)·C kaç satırda aynı çıkışı verir? Hesaplamadan önce sezgini yaz.",
        do: "<strong>01 · Kapılar ve doğruluk tablosu</strong> sekmesinde <strong>Konsensüs</strong> düğmesine bas; 'Karşılaştırma: eşit satır / toplam' kutusunu ve minterim listelerini oku. <strong>Şeması çizilen ifade</strong> menüsünü İfade 2'ye çevirip kapı sayısının nasıl değiştiğine bak. Sonra <strong>Yanlış özdeşlik</strong> düğmesine bas. Son olarak <strong>03 · Sadeleştirme (Karnaugh)</strong> sekmesine geç, <strong>Değişken sayısı</strong>nı 3 yap, <strong>Haritayı ifadeden doldur</strong> kutusuna <code>AB + A'C + BC</code> yazıp <strong>İfadeden doldur</strong>'a bas ve alttaki asal implikant tablosunu incele.",
        observe: "Konsensüs çiftinde kutu <code>8 / 8</code> yazar; iki ifadenin listesi de Σm(1, 3, 6, 7) = ΠM(0, 2, 4, 5) olur. 'Kapı sayısı / derinlik' İfade 1 için <code>5 / 3</code>, İfade 2 için <code>4 / 3</code>'tür. Yanlış özdeşlikte kutu <code>6 / 8</code>'e düşer ve durum satırı ilk karşı örneği verir: satır 4 (A = 1, B = 0, C = 0), ifade 1 → 1, ifade 2 → 0; tabloda satır 4 ve 6 işaretlenir. Haritada sonuç <code>F = ¬A·C + A·B</code> çıkar; asal implikant tablosunda B·C satırı (hücreler 3, 7) hem 'Zorunlu mu?' hem 'Seçildi mi?' sütununda 'hayır' yazar. Kanonik biçim <code>4 / 12 / 8</code>, sadeleşmiş biçim <code>2 / 4 / 4</code>, kapı girişi <code>19 → 7</code>, eşdeğerlik <code>8 / 8</code>.",
        explain: "B·C terimi hiçbir satırı tek başına 1 yapmaz: B·C = B·C·(A + ¬A) = A·B·C + ¬A·B·C ve bu iki parçanın ilkini A·B, ikincisini ¬A·C zaten içerir. Haritada aynı şey göz önündedir: B·C'nin örttüğü 3 ve 7 numaralı hücreler, zorunlu iki grubun birer köşesidir. Buna konsensüs teoremi denir. İkinci çiftte ise sezgi yanıltır: parantezin yeri değişince A tek başına çıkışı 1 yapma gücünü yitirir. Sekiz satırın hepsi denendiği için '8 / 8' bir kanıt, '6 / 8' bir çürütmedir; karşı örnek için tek satır yeter.",
      },
      {
        title: "İki NOR ve bir döngü: aynı giriş, iki farklı çıkış",
        predict: "Çapraz bağlı iki NOR'da A = 0, B = 0 iken Q kaçtır? Bu soruya yalnızca girişlere bakarak cevap verilebilir mi, yoksa oraya nereden gelindiğini de bilmek mi gerekir?",
        do: "<strong>02 · Devre kurucu</strong> sekmesinde <strong>Hazır devre</strong> menüsünden 'SR kilidi (iki NOR; A = S, B = R)' seç ve <strong>Hazır devreyi yükle</strong>'ye bas. 'Geri besleme' ile 'En uzun yol (kapı)' kutularına ve tablonun ilk satırına bak. Sonra giriş anahtarlarından A düğmesine bas, bir kez daha bas; ardından B düğmesine bas, bir kez daha bas. Her adımda durum satırındaki Q ve Qn değerlerini not et. En sonda A ile B'yi birlikte 1 yap.",
        observe: "Geri besleme <code>var · 2 kapı döngüde</code>, en uzun yol <code>tanımsız (döngü var)</code> yazar. Tabloda 01 satırı <code>0 1</code>, 10 satırı <code>1 0</code>, 11 satırı <code>0 0</code>'dır; 00 satırında ise iki sütunda da <code>T</code> durur: çıkış önceki duruma bağlı. Yüklendiğinde Q = 0, Qn = 1'dir. A = 1 yapınca 'Q = 1, Qn = 0' olur; A'yı bırakınca Q = 1 kalır. B = 1 yapınca 'Q = 0, Qn = 1'; B'yi bırakınca Q = 0 kalır. Girişler iki kez (0, 0) oldu, çıkış birinde 1, ötekinde 0. Durum satırı bunu söyler: 'Tablonun 1 satırında birden çok kararlı durum var: devre bit saklıyor.' A = B = 1 iken iki çıkış da 0'dır.",
        explain: "Q = ¬(R + Qn) ve Qn = ¬(S + Q) denklemleri S = R = 0 iken Q = ¬Qn'ye iner; bunu hem (1, 0) hem (0, 1) sağlar. Sayfa her satır için kararlı durumları sayar; birden çok bulursa hücreye T yazar. Doğruluk tablosunun ardışıl devreye yetmediğinin somut hâli budur. S = R = 1'den iki girişi tam aynı anda bırakırsan gerçekte sonucu kapıların küçük gecikme farkı belirler; bu düğmelerle bunu yapamazsın, ama beşinci sekmede 'SR kilidi (saatsiz)' için <strong>Örnek senaryo</strong> tam bunu dener: diyagramda Q ve Qn, S yeniden 1 olana dek taralı X (bilinmiyor) bölgesinde kalır.",
      },
      {
        title: "Elde zinciri: bit sayısını ikiye katla, süreyi ölç",
        predict: "Dört bitlik dalgalı toplayıcı en kötü durumda 9 τ'da oturuyorsa sekiz bitlik olanı kaç τ ister: 18 mi? Elde öngörülü yapı dört bitte ne kazandırır? Sonuç doğru çıksa bile çıkışlar yol boyunca kaç kez boşuna oynar?",
        do: "<strong>04 · Toplayıcılar ve gecikme</strong> sekmesi dalgalı elde, N = 4 bit, τ = 10 ns ve 'elde zinciri' uyarımıyla açılır: girişler 0 + 0 + 1'den 15 + 0 + 1'e geçer. Altı kutuyu ve durum satırındaki elde anlarını oku. <strong>Bit sayısı N</strong> kaydırıcısını 8'e, sonra 1'e ve 2'ye getir; 4'e geri dön. <strong>Toplayıcı yapısı</strong> menüsünden 'Elde öngörülü (4 bit)' seç ve alttaki karşılaştırma tablosuna bak. Son olarak <strong>Glitch örneği</strong> düğmesine bas (yapı kendiliğinden dalgalı eldeye döner ve durum satırı bunu söyler; uyarım 15 + 15 + 0'dan 15 + 0 + 1'e geçiştir) ve <strong>Oynat</strong> ile zamanlama diyagramını izle.",
        observe: "N = 4'te ölçülen yerleşme, ölçülen en kötü durum ve formül üçü de <code>9 τ = 90 ns</code>, fark <code>0 τ</code>'dur; eldeler C₁: 3 τ, C₂: 5 τ, C₃: 7 τ, C₄: 9 τ'da oturur ve 6 fazladan geçiş sayılır. N = 8'de <code>17 τ = 170 ns</code> (en kötü durum '(örneklem)' etiketiyle), N = 1'de <code>3 τ = 30 ns</code>, N = 2'de <code>5 τ = 50 ns</code> okursun. Öngörülü yapıda süre <code>4 τ = 40 ns</code>'ye iner; tablo bedeli gösterir: 20 kapı / 40 kapı girişi yerine 26 kapı / 68 kapı girişi ve 5 girişli kapılar. Glitch örneğinde fazladan geçiş <code>22</code>'ye çıkar, yerleşme yine <code>9 τ = 90 ns</code>'dir, sonuç kutusu <code>16 / 16 · tutuyor</code> yazar.",
        explain: "Süre bit sayısıyla doğrusal büyür ama orantılı değildir: her blok eldeye 2τ ekler, P'yi hazırlayan XOR bir kez ödenir; (2N + 1)τ, N = 8 için 18 değil 17 verir. Öngörülü yapı zinciri keser: XOR ile P, iki kapı düzeyinde elde, XOR ile toplam; 1 + 2 + 1 = 4τ. Glitch işin öbür yüzüdür: toplam biti kendi P'sini 1τ'da, doğru eldeyi çok sonra görür; arada yanlış değere uğrar. Sonuç doğrudur ama o ana kadar çıkışa güvenilmez. Bunlar bir modelin sayılarıdır: saf taşıma gecikmesinde en kısa darbe bile geçer, bütün kapılar τ sayılır; gerçek kapı çok kısa darbeleri yutar, geniş kapı daha yavaştır.",
      },
      {
        title: "Kilit mi, flip-flop mu? Kenara fazla yaklaşan veri",
        predict: "Saat 1 iken D'yi değiştirirsen kilidin çıkışı mı oynar, flip-flop'unki mi? D, yükselen kenardan yalnızca 0,05 T önce değişirse flip-flop hangi değeri yakalar; kurulum süresi 0,1 T yerine 0,04 T olsaydı sonuç değişir miydi?",
        do: "<strong>05 · Ardışıl mantık</strong> sekmesi 'D kilidi ve D flip-flop (yan yana)' ile açılır. D düğmesine bas, <strong>CLK'yi çevir</strong>'e bas, saat 1 iken D'ye bir kez daha bas ve 'Şu anki çıkış' kutusunu oku. Sonra <strong>Örnek senaryo</strong>'ya bas ve zamanlama diyagramında iki Q satırını karşılaştır. Ardından <strong>Kurulum ihlali senaryosu</strong>'na bas; <strong>Kurulum süresi t_k</strong> kaydırıcısını önce 0,04 T'ye, sonra 0,06 T'ye getir.",
        observe: "İlk kenardan sonra 'kilit Q = 1, flip-flop Q = 1' okursun; saat 1 iken D'yi indirince 'kilit Q = 0, flip-flop Q = 1' olur, 'Kenar dışında Q değişimi' kutusu <code>1 / 0</code> yazar. Örnek senaryoda dört kenar vardır (<code>4 / 0</code>); kilit kenar dışında 5, flip-flop 0 kez değişir (<code>5 / 0</code>). İhlal senaryosunda ilk kutu <code>4 / 1</code> olur, ikinci kenar kırmızı üçgenle işaretlenir, flip-flop sonraki kenara kadar taralı X bölgesinde kalır. 'Şu anki çıkış' yine temiz 1'dir; olanı durum satırı saklar: '(2. kenar) … o kenarın sonucu X'. t_k 0,04 T'de ihlal kaybolur (<code>4 / 0</code>), 0,06 T'de geri gelir (<code>4 / 1</code>).",
        explain: "Kilit düzeye, flip-flop kenara duyarlıdır: kilit saat 1 olduğu sürece açık bir kapıdır, flip-flop tek bir anın fotoğrafını çeker. Fotoğrafın net çıkması için veri kenardan önce t_k kadar durmuş olmalıdır. Senaryoda D kenardan 0,05 T önce değişir; pencere 0,04 T ise dışarıda kalır, 0,06 T ise içine düşer (tam 0,05 T'de sayfa kenarı temiz sayar). Gerçek flip-flop böyle bir anda 0'a da 1'e de düşebilir, bir süre arada da kalabilir; sayfa bunu X diye gösterir. Modelin sınırı: elemanlar davranışsaldır, çıkış gecikmesi sıfırdır, kurulum süresi bir pencere parametresidir, tutma süresi modellenmez.",
      },
    ],
  },
  wow: [
    {
      title: "Yüzyılın en ünlü yüksek lisans tezi",
      body:
        "Shannon tezini 1937'de, 21 yaşında yazdı; 1938'de Amerikan Elektrik Mühendisleri Enstitüsü'nün dergisinde yayımlandı. Psikolog Howard Gardner 1985'te bu çalışmayı 'muhtemelen yüzyılın en önemli ve en ünlü yüksek lisans tezi' diye andı. Shannon on yıl sonra bir kez daha çığır açtı: 1948'deki makalesiyle bilgi kuramını kurdu ve bilginin ölçü birimine, meslektaşı John Tukey'nin önerdiği adı verdi: 'bit'.",
    },
    {
      title: "Ay'a tek tür kapıyla gidildi",
      body:
        "Apollo Yönlendirme Bilgisayarı'nın insanlı uçuşlarda kullanılan Block II sürümünde yaklaşık 2800 entegre devre vardı ve bunların neredeyse tamamı aynı çipti: içinde iki tane üç girişli NOR kapısı. Yaklaşık 32 kilogramlık bu kutu, 2048 kelimelik silinebilir çekirdek bellek ve 36 864 kelimelik sabit 'halat' bellekle 1969'da astronotları Ay yüzeyine indirdi. NOR da NAND gibi tek başına tamdır; toplayıcısından kaydedicisine bütün mantık ondan örülmüştü.",
    },
    {
      title: "Beş girişten dört milyar işlev",
      body:
        "n girişli bir doğruluk tablosunun 2ⁿ satırı vardır ve her satıra 0 ya da 1 yazılabilir. Olası işlev sayısı bu yüzden 2 üzeri 2ⁿ'dir: iki girişle 16, üç girişle 256, dört girişle 65 536, beş girişle 4 294 967 296. Altı girişte sayı 2⁶⁴'e, yani yaklaşık 1,8 × 10¹⁹'a varır. Yedi kapı türü, hatta tek başına NAND, yeterince kapı verildiğinde bu uçsuz bucaksız kümenin her üyesini kurmaya yeter; sayfadaki kurucu dört giriş ve yirmi kapıyla sınırlıdır.",
    },
  ],
  worked: {
    title: "Sekiz bitlik toplayıcı bir saat vuruşuna sığar mı?",
    prompt:
      "Sekiz bitlik bir dalgalı elde toplayıcı, beş kapılı tam toplayıcılardan kurulmuş: P = A ⊕ B, G = A·B, T = P·C, C' = G + T, S = P ⊕ C. VE ve VEYA kapıları τ = 10 ns, XOR kapıları 2τ = 20 ns gecikiyor (öğretim değerleri; k = 2). Girişler t = 0'da değişiyor. (a) Son elde C₈ ve son toplam biti S₇ en geç ne zaman oturur? (b) Çıkışı bir yazmaç yakalayacaksa saat en çok hangi frekansta çalışabilir? (c) XOR'lar da τ gecikseydi ne değişirdi? (d) Dört bitte elde öngörülü yapı ne kazandırır?",
    steps: [
      "Hazırlık sinyalleri: G = A·B bir VE kapısıdır, τ = 10 ns'de hazırdır. P = A ⊕ B bir XOR'dur, kτ = 2τ = 20 ns'de hazırdır. Bunlar bütün bloklarda aynı anda, birbirini beklemeden oluşur.",
      "Elde yolu: ilk blokta T = P·C₀ için P beklenir, sonra bir VE (τ), sonra C₁ = G + T için bir VEYA (τ): C₁ = (k + 2)τ = 4τ = 40 ns. Sonraki her blokta P ve G çoktan hazırdır; elde yalnızca bir VE ve bir VEYA'dan geçer, yani blok başına 2τ eklenir: C₂ = 6τ, C₃ = 8τ, …, C<sub>N</sub> = (2N + k)τ. N = 8 için C₈ = (16 + 2)τ = 18τ = 180 ns.",
      "Toplam yolu: S₇ = P₇ ⊕ C₇. C₇ = (2·7 + 2)τ = 16τ'da gelir, üstüne bir XOR (2τ) biner: S₇ = (2N − 2 + 2k)τ = 18τ = 180 ns. İki yol bu kez berabere kalır; T = max(2N + k, 2N − 2 + 2k)·τ = 18τ = 180 ns.",
      "Saat: yazmacın doğru değeri yakalaması için periyot en az bu kadar olmalıdır. Kurulum süresi ve flip-flop'un kendi gecikmesi yok sayılırsa f ≤ 1/T = 1/(180 × 10⁻⁹ s) ≈ 5,56 × 10⁶ Hz = 5,56 MHz. Bu payları eklemek sınırı yalnızca aşağı çeker.",
      "XOR'lar τ gecikseydi (k = 1): C₈ = (16 + 1)τ = 17τ = 170 ns, S₇ = (16 − 2 + 2)τ = 16τ = 160 ns; kritik yol elde çıkışıdır, T = 170 ns ve f ≤ 5,88 MHz. Dört bitte, k = 2 ile: dalgalı yapı max(10, 10)τ = 10τ = 100 ns, elde öngörülü yapı (2k + 2)τ = 6τ = 60 ns; XOR ile P (2τ), iki kapı düzeyinde elde (2τ), XOR ile toplam (2τ).",
    ],
    result:
      "k = 2 için 8 bitlik dalgalı toplayıcı 18τ = 180 ns'de oturur ve tek başına en çok yaklaşık 5,56 MHz'lik bir saate yetişir; k = 1 için 17τ = 170 ns. Sayfada sına: 4. sekmede Bit sayısı N = 8, XOR kapısının gecikmesi '2 τ' seçildiğinde yerleşme, en kötü durum ve formül kutularının üçü de <code>18 τ = 180 ns</code> yazar (en kötü durum '(örneklem)' etiketiyle), fark <code>0 τ</code>'dur; N = 4'e inip yapıyı 'Elde öngörülü (4 bit)' yaptığında <code>6 τ = 60 ns</code> görürsün. Gecikme N ile doğrusal büyüdüğü için 64 bitlik bir dalgalı toplayıcı k = 1 ile 129τ ister; gerçek işlemciler bu yüzden eldeyi önceden hesaplayan, gecikmesi log N ile büyüyen yapılar kullanır.",
  },
  misconceptions: [
    {
      myth: "OR, günlük dildeki 'ya o ya bu' demektir.",
      truth:
        "Kapı dünyasında OR kapsayıcıdır: girişlerin biri <em>ya da ikisi</em> 1 olunca çıkış 1'dir; 11 satırında da 1 verir. 'Yalnızca biri' anlamını XOR taşır ve toplamanın birler basamağını da bu yüzden XOR verir: 1 + 1'in toplam basamağı 0'dır. Boole cebrinde 1 + 1 = 1 yazılmasının nedeni de budur; + işareti toplama değil, 'veya'dır.",
    },
    {
      myth: "Mantıktaki 0 tam 0 volt, 1 tam 5 volttur.",
      truth:
        "0 ve 1 birer voltaj <em>aralığıdır</em>. Klasik 5 voltluk TTL ailesinde bir kapı, girişinde 0,8 V'un altını 'düşük', 2,0 V'un üstünü 'yüksek' sayar; aradaki bant tanımsızdır. Çıkışlar daha sıkı bir söz verir: düşükken en çok 0,4 V, yüksekken en az 2,4 V. Aradaki 0,4 voltluk fark <strong>gürültü payıdır</strong>: hatta o kadar parazit binse bile sonraki kapı sinyali doğru okur ve çıkışında yeniden temiz bir seviye üretir. Bin kapıdan geçen bir bitin bin kapı sonra da aynı bit olması bu sayededir. Bu sayfa ideal 0 ve 1 ile çalışır; gerilim tarafı modelin dışındadır.",
    },
    {
      myth: "Doğruluk tablosu her devreyi tam olarak anlatır.",
      truth:
        "Yalnızca kombinasyonel devreleri anlatır. Geri beslemeli bir devrede, ikinci deneydeki SR kilidinde gördüğün gibi, aynı girişler için iki farklı çıkış mümkündür; sayfa o hücreye değer yerine T yazar. Bu devreler için durum tablosu, karakteristik denklem ya da zamanlama diyagramı gerekir.",
    },
    {
      myth: "Devre doğru sonucu veriyorsa çıkışına her an güvenilir.",
      truth:
        "Sonuç ancak en uzun yol yerleştikten sonra doğrudur. Üçüncü deneydeki glitch örneğinde toplayıcı sonunda doğru toplamı gösterir ama çıkışları o ana kadar 22 kez boşuna yön değiştirir. Saatli tasarımın bütün amacı bu dalgalanmayı görmezden gelmektir: çıkışa yalnızca saat kenarında, her şey durulduktan sonra bakılır; saat periyodu da en uzun yola göre seçilir.",
    },
  ],
  glossary: [
    { term: "Boole cebri", definition: "Değişkenlerin yalnızca 0 ve 1 değerini aldığı, AND, OR ve NOT işlemleriyle çalışan cebir; adını 1847'de temelini atan George Boole'dan alır." },
    { term: "Minterim", definition: "Bütün değişkenleri (düz ya da değilli) içeren ve doğruluk tablosunun tek bir satırında 1 veren çarpım; işlev, 1 olan satırlarının minterimlerinin toplamıdır." },
    { term: "İşlevsel tamlık", definition: "Bir kapı kümesinin bütün Boole işlevlerini kurabilmesi; NAND tek başına, NOR da tek başına bu özelliğe sahiptir." },
    { term: "Asal implikant", definition: "Karnaugh haritasında yalnız 1 ve önemsiz hücrelerden oluşan, daha büyük bir gruba katılamayan grup; başka hiçbir asalın örtmediği bir hücreyi örtüyorsa zorunludur." },
    { term: "Yayılma gecikmesi", definition: "Bir kapının girişi değiştikten sonra çıkışının yeni değerine yerleşmesi için geçen süre; güncel çiplerde pikosaniyelerle ölçülür, bu sayfadaki τ = 10 ns ise bir öğretim değeridir." },
    { term: "Glitch", definition: "Bir çıkışın, girişler farklı uzunlukta yollardan ulaştığı için son değerine varmadan önce yaptığı geçici, fazladan geçiş." },
    { term: "Kilit ve flip-flop", definition: "İkisi de bir bit saklar; kilit saat düzeyi etkinken girişini izler (saydamdır), flip-flop yalnız saat kenarındaki girişi alır ve sonraki kenara kadar tutar." },
    { term: "Kurulum süresi", definition: "Verinin, flip-flop tarafından doğru yakalanabilmesi için saat kenarından önce değişmeden durması gereken en kısa süre; kenardan sonraki karşılığına tutma süresi denir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu beş sekme, üniversitedeki Sayısal Tasarım (Mantık Devreleri) dersinin ilk yarısının iskeletidir: Boole cebri ve kanonik biçimler, Karnaugh haritaları ve Quine–McCluskey ile sadeleştirme, toplayıcılar, kilitler, flip-flop'lar ve sonlu durum makineleri. Derste bunların üstüne zaman biner. Her kapının bir yayılma gecikmesi vardır; iki yazmaç arasında sinyalin geçmek zorunda olduğu en uzun kapı zincirine <strong>kritik yol</strong> denir ve devrenin en yüksek saat frekansını o belirler. Çözümlü örnekteki 18τ hesabı bu <em>statik zamanlama analizinin</em> en küçük örneğidir. Gerçek analiz, sayfanın dışarıda bıraktıklarını da hesaba katar: flip-flop'un çıkış gecikmesi, kenardan sonraki tutma süresi, saatin her flip-flop'a aynı anda varmaması ve kurulum penceresi çiğnendiğinde ortaya çıkan kararsızlık (metastabilite). Sadeleştirme de iki düzeyde kalmaz; çok düzeyli sentez, sayfanın 'Dama tahtası' haritasında göremediği XOR'u bulur.",
      "Flip-flop'ları dizdiğinde kaydedicilere ve <strong>sonlu durum makinelerine</strong> varırsın: durum flip-flop'larda saklanır, bir sonraki durumu kombinasyonel mantık hesaplar. Biçimsel Diller ve Otomata Teorisi dersindeki otomatlar bu devrelerin matematiksel modelidir; beşinci sekmedeki dizi algılayıcı, donanıma gömülmüş bir sonlu otomattır: bütün diziyi değil, yalnızca 'örüntünün kaç biti şu an tutuyor' bilgisini saklar. Örnek senaryosu 1101011010 dizisinde 101 örüntüsünü örtüşen eşleşmeler sayılırken 3, sayılmazken 2 kez bulur ve dört durum için iki flip-flop'un yettiğini yazar. Bir işlemci de toplayıcı, kaydediciler ve onları yöneten bir durum makinesinden oluşur; Bilgisayar Organizasyonu dersi bu yolu adım adım kurar. Üniversitede devreyi artık elle çizmez, Verilog ya da VHDL gibi donanım tanımlama dilleriyle yazıp bir FPGA üzerinde çalıştırırsın; MIT'nin 6.004 dersi kapıdan işlemciye tam bu sırayla ilerler. Shannon'ın devreyle cebir arasında kurduğu köprü, bugün yazılımla donanım arasındaki köprüdür.",
    ],
    topics: ["Çok düzeyli mantık sentezi", "Statik zamanlama analizi ve kritik yol", "Kurulum, tutma süresi ve metastabilite", "Elde öngörülü ve önek toplayıcılar", "Sonlu durum makinesi tasarımı (Moore ve Mealy)", "Verilog / VHDL ve FPGA", "CMOS transistör düzeyinde kapı tasarımı"],
  },
  quiz: [
    {
      question: "Bütün kapıları τ geciken dört bitlik dalgalı elde toplayıcı en kötü durumda 9τ'da oturuyor. Aynı tasarım sekiz bite çıkarılırsa bu süre ne olur?",
      options: [
        "9τ: basamaklar aynı anda çalışır",
        "17τ: her basamak eldeye iki kapı ekler, baştaki XOR bir kez ödenir",
        "18τ: süre bit sayısıyla tam orantılıdır",
        "81τ: süre bit sayısının karesiyle büyür",
      ],
      answer: 1,
      explanation: "Elde her blokta bir VE ve bir VEYA'dan geçer, yani blok başına 2τ; en başta P = A ⊕ B için 1τ daha vardır: (2N + 1)τ. N = 4 için 9, N = 8 için 17. Büyüme doğrusaldır ama sabit terim yüzünden tam iki katı değildir. Dördüncü sekmede Bit sayısı N kaydırıcısını 8'e getirince kutular 17 τ = 170 ns yazar.",
    },
    {
      question: "Dört değişkenli bir Karnaugh haritasında sekiz hücrelik bir grup kaç harfli bir terim verir?",
      options: [
        "8 harf: her hücre bir harf ekler",
        "4 harf: terimde her değişken bulunmak zorundadır",
        "3 harf: grup yalnızca bir değişkeni siler",
        "1 harf: grup her ikiye katlandığında bir değişken düşer",
      ],
      answer: 3,
      explanation: "Tek hücre dört harfli bir minterimdir. Komşu iki hücre tek değişkende ayrılır ve X·Y + X·¬Y = X gereği o değişken düşer; grup her ikiye katlandığında bir harf daha gider: 2 hücre 3 harf, 4 hücre 2 harf, 8 hücre 1 harf. Üçüncü sekmenin açılış haritasında C ve A terimleri böyle sekizer hücrelik gruplardır; 'Dört köşe' haritasında dört hücre F = ¬B·¬D verir.",
    },
    {
      question: "Kurulum ihlali senaryosunda D, ikinci yükselen kenardan 0,05 T önce değişiyor ve flip-flop'un kurulum süresi t_k = 0,1 T. Aşağıdakilerden hangisi ihlali ortadan kaldırır?",
      options: [
        "Flip-flop'un yanına bir D kilidi eklemek",
        "Kurulum süresi 0,2 T olan daha yavaş bir flip-flop kullanmak",
        "Kurulum süresi 0,04 T olan daha hızlı bir flip-flop kullanmak",
        "Aynı senaryoyu daha çok kenarla yinelemek",
      ],
      answer: 2,
      explanation: "İhlal, verinin kenardan önceki t_k penceresinin içinde değişmesidir. Değişim kenardan 0,05 T önceyse pencere bundan dar olmalıdır: 0,04 T'lik pencerede veri dışarıda kalır ve kenar temizdir; 0,2 T'lik pencerede ihlal sürer. Öbür çare veriyi daha erken hazır etmektir: mantığı hızlandırmak ya da saat periyodunu uzatmak. Beşinci sekmede kaydırıcıyı 0,04 T'ye getirince 'Yükselen kenar / kurulum ihlali' kutusu 4 / 1'den 4 / 0'a döner.",
    },
  ],
  next: [
    { href: "mantik-kapilari.html", title: "Mantık Kapıları Laboratuvarı", why: "Aynı konunun daha yalın girişi: tek kapıyı tablosuyla sına, De Morgan eşdeğerliklerini yan yana karşılaştır ve dört bitlik toplayıcıda eldeyi basamak basamak izle." },
    { href: "bilgisayar-sistemleri-ve-mimarisi.html", title: "Bilgisayar Mimarisi Laboratuvarı", why: "Toplayıcı ve yazmaçların bir işlemcide nereye oturduğunu gör: ikiye tümleyen ve IEEE 754 gösterimi, beş aşamalı boru hattı, önbellek ıskaları ve Amdahl yasası." },
    { href: "bicimsel-diller-ve-otomata-teorisi.html", title: "Biçimsel Diller ve Otomata Teorisi", why: "Dizi algılayıcının matematiksel karşılığı: geçiş tablosunu kendin doldurduğun sonlu otomatlar, NFA'dan DFA'ya geçiş ve düzenli ifadeler." },
    { href: "elektronik-muhendisligi.html", title: "Elektronik Mühendisliği: Analog Devre Laboratuvarı", why: "Kapının bir kat altı, 0 ile 1'in ardındaki gerilimler: diyot ve doğrultucu, transistörlü yükselteç, işlemsel yükselteç ve süzgeçler." },
  ],
  sources: [
    { title: "Wikipedia · Logic gate", url: "https://en.wikipedia.org/wiki/Logic_gate", note: "Kapı türleri, simgeler, işlevsel tamlık ve transistör düzeyinde gerçekleme (İngilizce)." },
    { title: "Wikipedia · A Symbolic Analysis of Relay and Switching Circuits", url: "https://en.wikipedia.org/wiki/A_Symbolic_Analysis_of_Relay_and_Switching_Circuits", note: "Shannon'ın 1937 tezi: Boole cebrinin anahtarlama devrelerine uygulanışı ve Gardner'ın değerlendirmesi." },
    { title: "Wikipedia · Apollo Guidance Computer", url: "https://en.wikipedia.org/wiki/Apollo_Guidance_Computer", note: "NOR kapılarından kurulu Ay bilgisayarı: çip sayısı, bellek ve ağırlık verileri." },
    { title: "MIT OpenCourseWare · 6.004 Computation Structures", url: "https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/", note: "Kapılardan işlemciye uzanan lisans dersi; ders notları ve videolar açık (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
