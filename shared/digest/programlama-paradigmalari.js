window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["programlama-paradigmalari"] = {
  slug: "programlama-paradigmalari",
  title: "Programlama Paradigmaları: Aynı İş, Farklı Kafalar",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 45,
  tagline:
    "Aynı işi üç küçük yorumlayıcıda adım adım çalıştır; atamaları, fonksiyon uygulamalarını, yığın derinliğini ve birleştirmeleri say. Sonuç hep aynı çıkar; sayılar ise her düşünme biçiminin bedelini gösterir.",
  hook:
    "Altı sayılık bir liste: 3, 8, 5, 2, 7, 4. Çift olanların karelerini topla. Bir program bunu 17 atama ve 13 karşılaştırmayla yapar; bir başkası tek bir değişkene dokunmadan, 15 fonksiyon uygulamasıyla. İkisi de 84 bulur. Üçüncü bir tarzda ise 'nasıl' hiç yazılmaz: yalnızca olgular ve kurallar verilir, cevabı motor arar. Sonuç aynıysa fark tam olarak nerededir?",
  bigIdea:
    "Paradigma bir dil değil, bir <strong>düşünme biçimidir</strong>: programı 'adım adım değişen bir durum' olarak mı, 'birbirine bağlanan fonksiyonlar' olarak mı, 'mesajlaşan nesneler' olarak mı, yoksa 'sağlanması gereken bir tarif' olarak mı görüyorsun? Hepsi aynı şeyleri hesaplayabilir; farklı olan, işin nerede ve hangi sırayla yapıldığıdır.",
  story: [
    "Her şey 1936'da, henüz tek bir bilgisayar yokken başladı. Princeton'da Alonzo Church, 1930'ların başından beri üzerinde çalıştığı sistemi 'hesaplanabilir' sözcüğünün tanımı olarak öne sürdü: yalnızca fonksiyon tanımlamaktan ve fonksiyonu bir şeye uygulamaktan ibaret <strong>lambda hesabı</strong>. İçinde değişken ataması, döngü, bellek yoktu. Aynı yıl İngiltere'de 23 yaşındaki Alan Turing bambaşka bir model yazdı: sonsuz bir şerit üzerinde ileri geri giden, hücre okuyup yazan bir makine. Baştan sona 'durum değiştir' üzerine kuruluydu. İki model birbirinden daha farklı görünemezdi; ama Turing makalesine eklediği bir ekte ikisinin tam olarak aynı fonksiyonları hesapladığının kanıt taslağını verdi, ardından doktora için Princeton'a, Church'ün yanına gitti. Bugünkü bütün paradigma tartışması bu iki kökten büyür: Turing'in makinesi <strong>buyurgan</strong> (imperative) tarzın, Church'ün fonksiyonları <strong>fonksiyonel</strong> tarzın atasıdır.",
    "İlk gerçek diller bu iki yolu izledi. 1957'de IBM'de John Backus'un ekibi Fortran'ı teslim etti: döngü, atama, GOTO; makinenin diliyle düşünen bir dil. Bir yıl sonra MIT'de John McCarthy, Church'ün λ gösterimini ödünç alarak Lisp'i tasarlamaya başladı: listeler, özyineleme ve bir veri gibi elden ele geçen fonksiyonlar. 1968'de Edsger Dijkstra, <em>Communications of the ACM</em>'e GOTO'nun programları takip edilemez hale getirdiğini anlatan bir mektup yazdı; editör Niklaus Wirth başlığı 'Go To Statement Considered Harmful' diye değiştirdi ve bu başlık bir slogan oldu. Döngü, koşul ve alt programlarla yazılan <strong>yapısal programlama</strong> böyle yerleşti. Aynı yıllarda Oslo'da Ole-Johan Dahl ile Kristen Nygaard, benzetim (simülasyon) programları yazmak için tasarladıkları Simula 67'de sınıfı, nesneyi ve bir sınıfı ötekinin üzerine kuran alt sınıfı dile soktular; bugün kalıtım dediğimiz şey oradan gelir. 1970'lerin başında Xerox PARC'ta Alan Kay ve ekibi bu fikri, çocukların da kullanabilmesini hedefledikleri Smalltalk'ta 'birbirine mesaj gönderen nesneler' olarak yeniden kurdu; 'nesne yönelimli' terimi Kay'indir.",
    "Sözcüğün kendisi 1962'de Thomas Kuhn'un bilim tarihinden gelir: paradigma, bir dönemin bilim insanlarının paylaştığı bakış açısıdır. Bilgisayar bilimine 1978'de Robert Floyd'un Turing Ödülü konuşmasıyla girdi: 'The Paradigms of Programming'. Bir yıl önce aynı kürsüden daha sarsıcı bir konuşma yapılmıştı: Fortran'ın babası Backus, 1977 Turing Ödülü konuşmasında kendi yarattığı tarzı eleştirdi. Belleği sözcük sözcük güncelleyen bu tarza 'von Neumann tarzı', işlemci ile bellek arasında her seferinde tek sözcük taşıyan dar kanala da 'von Neumann darboğazı' dedi; programların matematikteki fonksiyonlar gibi birleştirilmesini önerdi. 1972'de Marsilya'da Alain Colmerauer ile Philippe Roussel, Edinburgh'dan Robert Kowalski'nin 'mantık tümcesi bir yordam gibi okunabilir' fikrine yaslanarak, doğal dil cümlelerini çözümlemek için yalnızca olgular ve kurallar yazılan Prolog'u yapmıştı; 1974'te IBM'de Donald Chamberlin ve Raymond Boyce, Edgar Codd'un ilişkisel modelini 'ne istediğini söyle' diyen SEQUEL'e, yani SQL'e dönüştürdü. 1990'da ise bir komite, dağınık tembel fonksiyonel dilleri Haskell adında tek bir dilde topladı; adı, 'currying' kavramının da adını taşıyan mantıkçı Haskell Curry'den gelir.",
    "Bugün saf paradigmalı dil azdır. Python, JavaScript, Kotlin, Swift ve Rust hem döngü hem map/filter hem nesne taşır; Java 2014'te Stream API ile fonksiyonel boru hatlarını içeri aldı, JavaScript 2015'te 'class' söz dizimini. Paradigma kavgası bitmedi ama taraf değiştirdi: soru artık 'hangi dil' değil, 'bu parça için hangi kafa'. Bir oyun döngüsü buyurgan, bir veri temizleme zinciri fonksiyonel, bir arayüz nesne yönelimli, bir veritabanı sorgusu bildirimsel yazılır; hepsi aynı programın içinde. Bu sayfa da bunun küçük bir kanıtıdır: buyurgan, fonksiyonel ve mantıksal tarzı çalıştıran üç ayrı yorumlayıcının üçü de aynı JavaScript dosyasında yazılıdır. Hangi dilin hangi paradigmayı 'desteklediğini' gösteren onay işaretli bir çizelge ise burada bilerek yoktur; o çizgiyi iki dikkatli kişi iki ayrı yere çekebilir.",
  ],
  core: [
    {
      heading: "Buyurgan tarz: program, adım adım değişen bir durumdur",
      body:
        "Birinci sekmenin sol panelindeki sözde kod bir tarif gibidir: toplam ← 0, i ← 0, i &lt; n iken yinele… Her «←» belleğe yazar. Program herhangi bir anda <strong>durum</strong> ile, yani bütün değişkenlerin o anki değerleriyle anlatılır ve her komut bu durumu bir sonrakine taşır. İşlemcinin gerçekten yaptığı da budur: bir yazmacı oku, hesapla, geri yaz. Bedeli, 'şu anda toplam kaç?' sorusunun cevabının baştan beri çalışan her satıra bağlı olmasıdır. Güzel yanı ise yapılan işin sayılabilmesidir. Çiftlerin karelerini toplayan döngüde iki ilk atama vardır; her turda x ile i birer kez yazılır (2n), toplam ise yalnızca çift öğelerde güncellenir (ç). Döngü koşulu n + 1 kez, çiftlik sınaması n kez sorulur. <strong>Yordamsal</strong> (procedural) tarz bu adımları adlı alt programlara böler; kalıp aynıdır, yalnızca paketlenmiştir.",
      formula: "Atama = 2n + ç + 2<br>Karşılaştırma = 2n + 1",
      formulaNote:
        "n liste uzunluğu, ç çift öğe sayısı. Varsayılan listede n = 6, ç = 3: 17 atama, 13 karşılaştırma. Karşılaştırma sayısı veriye bağlı değildir, atama sayısı bağlıdır. Bunlar sayma uzlaşımıdır; işlemci süresi değildir.",
    },
    {
      heading: "Fonksiyonel tarz: değer akar, hiçbir şey değişmez",
      body:
        "Sağ panelde atama yoktur; tek bir ifade vardır: fold(topla, 0, map(kare, filter(çift?, L))). Yorumlayıcı onu adım adım yeniden yazar: filter çiftleri süzer, map karelerini alır, fold toplar. Her aşamanın çıktısı yeni bir listedir; girdi olduğu gibi durur. Temel taş <strong>saf fonksiyon</strong>dur: aynı girdiye hep aynı çıktıyı verir ve dışarıda hiçbir şeyi değiştirmez. Ödülü <strong>gönderimsel saydamlık</strong>tır: bir ifadeyi değeriyle değiştirebilirsin, tıpkı 2 + 3 yerine 5 yazabildiğin gibi; sayfadaki yeniden yazma izi tam olarak bunu yapar. map, filter ve fold birer <strong>yüksek mertebeli fonksiyon</strong>dur: başka bir fonksiyonu parametre olarak alırlar. Değer değişmediği için hesabın <em>ne zaman</em> yapılacağı da serbest kalır: <strong>tembel değerlendirme</strong> bir öğeyi ancak istendiğinde hesaplar. Koşulu sağlayan ilk öğe k. sıradaysa tembel boru hattı k öğede durur, istekli olan N öğenin hepsini işler.",
      formula: "Uygulama = n + 2ç + 3<br>İlk eşleşme: tembel 2k, istekli 2N uygulama",
      formulaNote:
        "çift? n öğeye, kare ile topla ç'şer öğeye uygulanır; filter, map ve fold'un kendileri de birer uygulama sayılır: varsayılan listede 6 + 6 + 3 = 15. Kökü lambda hesabının tek hesap kuralıdır, β-indirgeme: (λx. x·x) 8 → 8·8 → 64.",
    },
    {
      heading: "Nesne yönelimli tarz: durum + davranış, bir arada ve saklı",
      body:
        "Nesne, verisini ve o veriyle ne yapılabileceğini tek bir pakette taşır. Bir banka hesabı nesnesi düşün: bakiye dışarıya kapalıdır; kimse doğrudan 'bakiye = −500' yazamaz, yalnızca 'yatır' iletisini gönderebilir ve nesne eksi parayı reddeder. Bu <strong>sarmalama</strong>dır: durumun değişmesine izin verir ama kapıya bir bekçi koyar. Asıl güç <strong>çok biçimlilik</strong>tedir: a.sesÇıkar() yazdığında hangi kodun çalışacağı yazarken değil, çalışma anında a'nın gerçekten ne olduğuna bakılarak belirlenir; sayfadaki başvuru tablosu buna dinamik gönderim der. Alan Kay'in deyişiyle nesne yönelimli programlama 'sınıf' demek değil, <strong>mesajlaşma</strong> demektir: nesneye ne yapması gerektiğini söylersin, nasıl yapacağını o bilir. Kalıtım ortak davranışı yukarı taşımanın yoludur; kolaydır ama derin hiyerarşiler kırılgan olur. Bu sayfada nesne yönelimli tarzın ayrı bir yorumlayıcısı yok; onu tablodaki satırından ve Tasarım Desenleri sayfasından izleyebilirsin.",
      formula: "nesne = durum + davranış  ·  a.sesÇıkar() → çalışma anında seçilir",
      formulaNote: "Buna geç bağlama (late binding) denir: aynı satır bir köpek nesnesi için havlar, bir kedi nesnesi için miyavlar.",
    },
    {
      heading: "Özyineleme ve yığın: döngünün sayacı nereye gitti?",
      body:
        "Fonksiyonel tarzda döngünün yerini özyineleme alır, ama bedava değildir. fakt(n) = n · fakt(n − 1) tanımında içteki çağrı dönmeden çarpma yapılamaz; bu yüzden her çağrı yığında bir <strong>çerçeve</strong> olarak bekler: n + 1 çağrı, n + 1 katlı yığın. Çare, bekleyen işi bir <strong>birikim parametresi</strong>nde taşımaktır: fakt_k(n, b) = fakt_k(n − 1, b · n). Artık özyineli çağrı fonksiyonun yaptığı son iştir (<strong>kuyruk çağrısı</strong>) ve yorumlayıcı yeni çerçeve açmak yerine eldekini yeniden kullanabilir; ikinci sekmede bu kutuyu işaretleyince derinlik 1'e iner. Bunu yapıp yapmamak bir dil kararıdır: Scheme standardı her uygulamadan ister; Guido van Rossum ise 22 Nisan 2009 tarihli yazısında, hata izlerini bozacağı gerekçesiyle Python'a eklenmesine karşı çıkmıştır. fib başka bir derdi gösterir: iki kola ayrılan özyineleme aynı alt problemi tekrar tekrar çözer. <strong>Not alma</strong> (memoization) her değeri bir kez hesaplayıp tabloya yazar; üstel büyüyen çağrı sayısı doğrusala iner.",
      formula: "Ç(n) = Ç(n − 1) + Ç(n − 2) + 1,  Ç(0) = Ç(1) = 1  ⟹  Ç(n) = 2·F(n + 1) − 1<br>Not almayla: 2n − 1  (n ≥ 2)",
      formulaNote:
        "Ç(n), fib(n) için toplam çağrı sayısı; F Fibonacci dizisi (F(1) = F(2) = 1). fib(6): 2·13 − 1 = 25 çağrı, not almayla 11. En büyük derinlik iki durumda da n'dir: not alma zamanı kısaltır, yığını değil.",
    },
    {
      heading: "Mantıksal tarz: ne'yi söyle, ama motorun nasıl aradığını bil",
      body:
        "Üçüncü sekmede program bir tarif değil, bir bilgi tabanıdır: olgular (ebeveyn(ayla, cem).) ve kurallar (büyükebeveyn(X, Z) :- ebeveyn(X, Y), ebeveyn(Y, Z).). Sen soru sorarsın, cevabı motor arar. İki aracı vardır. <strong>Birleştirme</strong>, iki terimi değişkenlere değer bağlayarak eşitlemeye çalışır: ebeveyn(X, Y) ile ebeveyn(ayla, cem) birleşir ve X = ayla, Y = cem olur; ebeveyn(cem, Z) ile ebeveyn(ayla, cem) birleşmez. <strong>Geri izleme</strong>, bir yol tıkanınca son seçim noktasına dönüp sıradaki tümceyi denemektir. Prolog bunları sabit bir sırayla yapar: en soldaki hedef, tümceler yazıldıkları sırayla, önce derinlemesine (SLD çözümleme). Bu sıra programın anlamına karışır: mantıkça aynı şeyi söyleyen iki kural kümesinden biri biter, öteki sonsuza kadar arar. SQL'de de aynı iş bölümü vardır; orada sırayı bir <strong>sorgu planlayıcı</strong> seçer. Yaygın sınıflamada fonksiyonel ve mantıksal tarz, bildirimsel ailenin iki koludur.",
      formula: "Birleştirme = 1 + m + m²<br>Geri izleme = m² − 1",
      formulaNote:
        "büyükebeveyn(X, Z) sorgusu için; m, ebeveyn olgularının sayısı. Kural başı 1 deneme, ilk hedef m olgu, her biri için ikinci hedef yine m olgu dener. m = 8: 73 birleştirme, 63 geri izleme; aynı işi yapan iç içe iki döngü m² = 64 karşılaştırma yapar.",
    },
  ],
  lab: {
    intro:
      "Sayfada üç sekme, üç gerçek mini yorumlayıcı var; her sonucun yanında <strong>ölçülen · kuram · fark</strong> üçlüsü durur. <strong>01 · Durum mu, dönüşüm mü</strong>: «Görev» menüsü, «Girdi listesi» kutusu ve hazır liste düğmeleriyle aynı işi buyurgan ve fonksiyonel yorumlayıcıda yan yana yürütürsün; altında «Strateji» menüsü, «Liste uzunluğu N» ve «Eşik T» kaydırıcılarıyla istekli–tembel karşılaştırması vardır. <strong>02 · Özyineleme ve yığın</strong>: «İşlev», «Yazım biçimi», n kaydırıcısı ve iki onay kutusu çağrı yığınını çerçeve çerçeve gösterir. <strong>03 · Mantıksal: mini Prolog</strong>: «Hazır bilgi tabanı» ve «Hazır sorgu» menüleri, arama ağacı ve hedef yığını. Her sekmede «Adım», «Oynat» ve «Sekmeyi sıfırla» bulunur. Sayılan şeyler açıkça tanımlanmış uzlaşımlardır (atama, uygulama, çağrı, birleştirme denemesi); süre ya da bellek ölçümü değildir.",
    experiments: [
      {
        title: "Çift sayılar kaça patlar?",
        predict:
          "Görev «Çift sayıların karelerinin toplamı». Varsayılan listede (3, 8, 5, 2, 7, 4) atama 17, fonksiyon uygulaması 15, karşılaştırma 13 çıkıyor. Altı sayının hepsi tek olsa bu üç sayıdan hangileri düşer? Hepsi çift olsa hangisi daha hızlı artar: atama mı, uygulama mı? Hangisi hiç kıpırdamaz?",
        do: "«01 · Durum mu, dönüşüm mü» sekmesinde üç kartı oku. «Hepsi tek» düğmesine, ardından «Hepsi çift» düğmesine bas ve her seferinde kartları ve «İki yorumlayıcının sonucu» satırını kaydet. Sonra «Sekmeyi sıfırla» de ve «Adım» düğmesiyle yavaşça ilerle: solda değişken tablosunu, sağda yeniden yazılan ifadeyi ve «Ara listeler» satırını izle.",
        observe:
          "Hepsi tek (7, 1, 9, 3, 5, 11): atama ölçülen 14 · kuram 14 · fark 0, uygulama 9 · 9 · 0, karşılaştırma 13, «Eşit: 0». Hepsi çift (2, 6, 4, 10, 8, 12): atama 20, uygulama 21, karşılaştırma yine 13, «Eşit: 364». Varsayılan listede buyurgan sürüm 31, fonksiyonel sürüm 15 adımda biter; ara listeler [8, 2, 4] ve [64, 4, 16] olur, son ifade tek bir sayıdır: 84.",
        explain:
          "Atama 2n + ç + 2, uygulama n + 2ç + 3'tür. n = 6 sabitken her çift öğe buyurgan tarafa bir atama (toplam ← …), fonksiyonel tarafa iki uygulama (kare ve topla) ekler; bu yüzden ç = 0'dan 6'ya çıkarken atama 6, uygulama 12 artar. Karşılaştırma 2n + 1'dir: döngü her öğeye bakmak zorundadır, veriden bağımsızdır. Asıl fark sayılarda değil, kayıtta: solda toplam, i ve x yerinde değişir; sağda hiçbir liste değişmez, her adım yeni bir değer üretir.",
      },
      {
        title: "Tembellik ne kazandırır, ne zaman kazandırmaz?",
        predict:
          "1'den 100'e kadar sayıların karelerinden 2500'den büyük olan ilkini arıyorsun. İstekli strateji önce 100 karenin hepsini alır, sonra hepsini süzer. Tembel strateji kaçıncı öğede durur? N'yi 200'e çıkarırsan iki stratejinin uygulama sayısı nasıl değişir? Aranan öğe listede hiç yoksa tembellik işe yarar mı?",
        do: "Birinci sekmenin alt bölümünde N = 100, «Eşik T» = 2500 iken kartları oku. «Strateji» menüsünden «Tembel: öğe ancak istenince hesaplanır» seç. Sonra «Liste uzunluğu N» kaydırıcısını 200'e getir. Son olarak «Eşik T» kaydırıcısını en sağa, 40000'e çek ve iki stratejiyi karşılaştır.",
        observe:
          "İstekli: dokunulan kaynak öğesi 100, uygulama 200. Tembel: 51 öğe, 102 uygulama; iki stratejide de bulunan ilk öğe «2601 (51. öğenin karesi)». N = 200 olunca istekli 400'e çıkar, tembel 102'de kalır. T = 40000'de sonuç «Yok: listede koşulu sağlayan öğe bulunmuyor» olur ve iki strateji de 200 öğe, 400 uygulama yapar. Üstteki şeritlerde tembel sürümün 51. hücreden sonrasına hiç dokunmadığı görülür.",
        explain:
          "Karesi 2500'ü aşan ilk sayı k = ⌊√2500⌋ + 1 = 51'dir. Tembel boru hattında öğeler teker teker ilerler: her biri için bir kare, bir yüklem uygulaması, toplam 2k = 102; cevap bulununca gerisi hiç üretilmez, bu yüzden N'nin büyümesi onu etkilemez. İstekli strateji her aşamada bütün listeyi bitirdiği için 2N yapar. 200² = 40000 eşiği aşmadığından son durumda aranan öğe yoktur; var olmayanı aramak iki stratejide de bütün listeyi dolaşmayı gerektirir.",
      },
      {
        title: "Fibonacci'nin dağı, not defteri ve tek çerçeve",
        predict:
          "fib(6) = 8'i hesaplamak için fib kaç kez çağrılır: 7 mi, 13 mü, daha mı çok? n = 18 olunca bu sayı kaç katına çıkar? «Not alma» kutusu çağrı sayısını mı, yığın derinliğini mi, ikisini birden mi düşürür? Kuyruk özyineli yazım tek başına yığını kısaltır mı?",
        do: "«02 · Özyineleme ve yığın» sekmesinde «İşlev» menüsünden «Fibonacci: fib(n)» seç (n = 6 gelir) ve «Oynat» ile yığının inip çıkmasını izle. «Not alma» kutusunu işaretle. n'yi 18'e çek, kutuyu kapatıp aç. Sonra n = 6'ya dön, «Yazım biçimi»ni «Kuyruk özyineleme: birikim parametresi» yap; kartları oku ve «Kuyruk çağrısı eniyilemesi» kutusunu işaretle.",
        observe:
          "fib(6): toplam çağrı ölçülen 25 · kuram 25 · fark 0, en büyük derinlik 6. Not almayla 11 çağrı, derinlik yine 6. n = 18: 8361 çağrı, derinlik 18, sonuç fib(18) = 2584; not almayla 35 çağrı. Kuyruk biçiminde fib_k(6, 0, 1) = 8 için 7 çağrı ve derinlik 7; eniyileme kutusu açılınca çağrı yine 7, derinlik 1 olur. Düz biçimde bu kutu seçilemez.",
        explain:
          "Düz fib her çağrıda ikiye ayrılır ve aynı alt problemi yeniden çözer: çağrı sayısı 2·F(n + 1) − 1'dir, yani n bir arttığında kabaca 1,6 katına çıkar. Oysa yalnızca n + 1 farklı değer vardır; tablo her birini bir kez hesaplatır ve sayı 2n − 1'e iner. Derinlik değişmez, çünkü en soldaki dal yine n kat iner. Kuyruk biçiminde çerçevelerde bekleyen iş yoktur, ama yorumlayıcı onları atmadıkça yığın kısalmaz; kısaltan yazım değil, yazımın mümkün kıldığı eniyilemedir.",
      },
      {
        title: "Bildirimsel programın da bir çalışma sırası var",
        predict:
          "«ata» ilişkisi iki tümceyle tanımlı: biri doğrudan ebeveyni, öteki özyinelemeyi söylüyor. Özyineli çağrıyı gövdenin sonuna değil başına yazarsan mantık değişmez; peki arama değişir mi? Yalnızca iki tümcenin sırasını değiştirmek sorunu çözer mi?",
        do: "«03 · Mantıksal: mini Prolog» sekmesinde «Hazır sorgu»dan «ata(ayla, Y)» seç, «Tümünü bul» düğmesine bas ve kartları kaydet. «Hazır bilgi tabanı»nı «Sol özyineli kural önce (döngü)» yap, yine «Tümünü bul». Sonra «Aynı kural, tümceler yer değiştirmiş» seç ve tekrarla. Her seferinde hedef yığınını ve altta «Aynı soru, buyurgan yazılmış» panelini oku.",
        observe:
          "Aile ağacı: birleştirme ölçülen 126 · kuram 126 · fark 0, geri izleme 105, «6 çözüm / 27 düğüm» (cem, derya, elif, fırat, hakan, gül); buyurgan döngüler (sözde kodda altsoy(k) yordamı) 112 karşılaştırma yapar, yanıt sırası aynıdır. Sol özyineli sürüm: «≥ 64» birleştirme, «≥ 0 çözüm / 64 düğüm», «Arama kesildi: hedef yığını 64 hedefi aştı». Tümceler yer değiştirince altı yanıt gelir (cem, derya, elif, fırat, gül, hakan), ama arama yine bitmez: «≥ 2000» birleştirme, «≥ 6 çözüm / 284 düğüm»; durum satırı «sol özyinelemeyi gidermedi» der.",
        explain:
          "Motor hep en soldaki hedefi açar. Sol özyineli kuralda ata(ayla, Y) ilk iş olarak ata(ayla, Z) ister, o da bir yenisini; hiçbir olguya bakılmadan yığın büyür. Tümce sırasını değiştirince olgulu tümce önce denendiği için yanıtlar gelir, fakat geri izleme sonunda yine sol özyineli tümceye düşer. Aramayı bitiren şey, gövdedeki hedeflerin sırasıdır: önce ebeveyn(X, Z), sonra ata(Z, Y). Buyurgan döngüler üç durumda da 112 karşılaştırmada biter. Sayfanın adım sınırı sonsuz döngüyü kanıtlamaz, yalnızca sınırın yetmediğini söyler.",
      },
    ],
  },
  wow: [
    {
      title: "Fortran'ın babası kendi tarzına karşı çıktı",
      body:
        "John Backus 1957'de ilk Fortran derleyicisini teslim eden ekibi yönetti; bugünkü bütün döngü-atama tarzının mimarlarından biriydi. Yirmi yıl sonra, 1977 Turing Ödülü konuşmasının başlığı şuydu: 'Programlama von Neumann Tarzından Kurtarılabilir mi?' İşlemci ile bellek arasında her seferinde tek sözcük taşıyan kanala 'von Neumann darboğazı' adını o konuşmada verdi ve programların matematikteki fonksiyonlar gibi birleştirilmesini önerdi. Fonksiyonel programlamanın en ünlü savunusu, buyurgan programlamanın kurucularından birinden geldi.",
    },
    {
      title: "1936: iki model, bir güç",
      body:
        "Alonzo Church'ün lambda hesabında bellek ve atama yoktur, yalnızca fonksiyon vardır; Alan Turing'in makinesinde ise fonksiyon yoktur, yalnızca şerit üzerinde değişen hücreler vardır. İkisi de 1936'da yayımlandı ve birbirinin tam zıddı görünür. Yine de tam olarak aynı fonksiyonları hesaplarlar: Turing denkliğin kanıt taslağını makalesine eklediği bir ekte verdi, ayrıntısını 1937'de yayımladı; doktorasını da Church'ün yanında, Princeton'da yaptı. Birinci sekmede yan yana duran iki panel, 90 yıllık bu denkliğin iki ucudur: ikisi de her şeyi hesaplayabilir, farklı düşündürür.",
    },
    {
      title: "Elli beş çalışan, 450 milyon kullanıcı",
      body:
        "Şubat 2014'te Facebook, WhatsApp'ı 19 milyar dolara satın aldığında, o günkü duyuru ve haberlere göre uygulama 450 milyon aylık kullanıcıya 55 kişilik bir şirketle hizmet veriyordu. Sunucuların dili Erlang'dı: Ericsson'da 1986'da telefon santralleri için Joe Armstrong, Robert Virding ve Mike Williams'ın geliştirdiği, sayfadaki başvuru tablosunun 'Eşzamanlı / aktör' satırında anlatılan tarzı taşıyan dil. Paylaşılan bellek yok, yalnızca birbirine mesaj gönderen milyonlarca küçük süreç; biri çökerse gözetmen onu yeniden başlatır. Bu kadar küçük bir ekibin bu ölçeği taşıyabilmesinde dilin payı sık anılır; tek neden o değildir, ama tarzın neye yaradığının iyi bir örneğidir.",
    },
  ],
  worked: {
    title: "fib(n) kaç çağrı yapar? Yinelemeyi kur, çöz, sayfada sına",
    prompt:
      "fib(n): n &lt; 2 ise n, değilse fib(n − 1) + fib(n − 2) döndürür. Ç(n), fib(n) hesaplanırken yapılan toplam çağrı sayısı olsun (ilk çağrı dahil). Ç(n) için kapalı biçimi bul; n = 6 ve n = 18 için değerini, en büyük yığın derinliğini ve not alma açıkken çağrı sayısını hesapla. Sonuçları «02 · Özyineleme ve yığın» sekmesinde doğrula.",
    steps: [
      "Yinelemeyi kur. n &lt; 2 için işlev kendini çağırmadan döner: Ç(0) = Ç(1) = 1 çağrı. n ≥ 2 için bir çağrı kendisi, artı iki alt ağacın çağrıları: Ç(n) = 1 + Ç(n − 1) + Ç(n − 2). İlk değerler: Ç(2) = 3, Ç(3) = 5, Ç(4) = 9, Ç(5) = 15, Ç(6) = 25 çağrı.",
      "Sabiti yok et. D(n) = Ç(n) + 1 tanımla. Yinelemenin iki yanına 1 ekleyince D(n) = D(n − 1) + D(n − 2) çıkar; başlangıç D(0) = D(1) = 2. Bu, iki katına ölçeklenmiş Fibonacci dizisidir: F(1) = F(2) = 1 ile D(n) = 2·F(n + 1). Öyleyse Ç(n) = 2·F(n + 1) − 1.",
      "Sayıları koy. F(7) = 13 olduğundan Ç(6) = 2·13 − 1 = 25 çağrı. F(19) = 4181 olduğundan Ç(18) = 2·4181 − 1 = 8361 çağrı. n 6'dan 18'e üç katına çıkarken çağrı sayısı 8361/25 ≈ 334 katına çıkıyor: büyüme üsteldir, ardışık terimlerin oranı altın orana (≈ 1,618) yaklaşır.",
      "Derinlik. Yığın, ağacın toplam düğüm sayısı kadar değil, en uzun dalı kadar büyür. En soldaki dal fib(n), fib(n − 1), …, fib(1) diye iner: n çerçeve. n = 6 için derinlik 6, n = 18 için 18 çerçeve. Zaman üstel, bellek doğrusal büyür.",
      "Not alma. Tablo varken fib(n), fib(n − 1)'i gerçekten hesaplatır, fib(n − 2)'yi ise tabloda hazır bulur: M(n) = M(n − 1) + 2, M(1) = 1, dolayısıyla M(n) = 2n − 1 (n ≥ 2). n = 6 için 11, n = 18 için 35 çağrı; tablodan dönen çağrılar da sayılır. Derinlik yine n'dir.",
    ],
    result:
      "Ç(n) = 2·F(n + 1) − 1. Sayfa aynısını gösterir: fib(6) için ölçülen 25 · kuram 25 · fark 0, fib(18) için 8361; not almayla 11 ve 35 çağrı; derinlik 6 ve 18. fib(18) = 2584 değerine 8361 çağrıyla da 35 çağrıyla da varılır: yaklaşık 239 kat fark, aynı tanımı değiştirmeden, yalnızca hesaplananı hatırlayarak.",
  },
  misconceptions: [
    {
      myth: "Python nesne yönelimli bir dildir; o yüzden Python'da fonksiyonel programlama yapılmaz.",
      truth:
        "Python'da her şey nesnedir ama map, filter, lambda, liste üreteçleri ve tembel çalışan üreteç fonksiyonları dilin içindedir; Python belgeleri 'Functional Programming HOWTO' adında ayrı bir rehber taşır ve dili açıkça 'çok paradigmalı' diye tanımlar. Paradigma dilin kimliği değil, o anki kodun biçimidir; sayfanın onay işaretli bir dil çizelgesi vermemesinin nedeni de budur.",
    },
    {
      myth: "Fonksiyonel programlamada döngü olmadığı için bazı şeyler yazılamaz.",
      truth:
        "Lambda hesabı ile Turing makinesinin aynı güçte olduğu 1936–1937'de kanıtlandı: döngüyle yazılabilen her şey özyineleme ya da map/filter/fold ile de yazılabilir. Birinci sekmedeki dört görevin dördünde de iki yorumlayıcı aynı sonucu verir. Fark neyin yazılabildiğinde değil, işin nerede sayıldığında ve nerede hata yapmanın kolay olduğundadır.",
    },
    {
      myth: "Fonksiyonu kuyruk özyineli yazarsam yığın taşması sorunu kendiliğinden çözülür.",
      truth:
        "Yazım yalnızca fırsat yaratır; fırsatı kullanan dilin uygulamasıdır. İkinci sekmede kuyruk biçimindeki fakt_k(5, 1), eniyileme kutusu kapalıyken yine 6 çerçeve biriktirir; kutu açılınca derinlik 1'e iner. Scheme standardı bu eniyilemeyi şart koşar, Python bilerek yapmaz; başka dillerde derleyiciye ve ayarlarına bağlıdır. Güvenmeden önce kullandığın uygulamanın belgesine bak.",
    },
    {
      myth: "Bildirimsel dillerde yalnızca 'ne'yi yazarım; 'nasıl' beni hiç ilgilendirmez.",
      truth:
        "'Nasıl'ı yazan bilgisayar değil, motoru yazan insanlardır ve o motorun bir çalışma sırası vardır. Üçüncü sekmede mantıkça aynı olan üç 'ata' tanımından biri 126 birleştirmede biter, biri hiç yanıt veremeden, biri altı yanıtı verdikten sonra sonsuza kadar arar. SQL'de de aynı sorgu, planlayıcının seçtiği yola göre saniyeler ya da saatler sürebilir. Bildirimsel yazmak, işleyişi bilme zorunluluğunu kaldırmaz; yalnızca çoğu zaman erteler.",
    },
  ],
  glossary: [
    { term: "Paradigma", definition: "Programı kurgulamanın temel biçimi: değişen durum, fonksiyon akışı, mesajlaşan nesneler ya da sonuç tarifi." },
    { term: "Durum (state)", definition: "Bir programın herhangi bir anda bellekte tuttuğu bütün değişken değerlerinin toplamı." },
    { term: "Saf fonksiyon", definition: "Aynı girdiye her zaman aynı çıktıyı veren ve dışarıda hiçbir şeyi değiştirmeyen fonksiyon; matematikteki fonksiyon gibi." },
    { term: "Yüksek mertebeli fonksiyon", definition: "Parametre olarak fonksiyon alan ya da sonuç olarak fonksiyon döndüren fonksiyon; map, filter ve fold gibi." },
    { term: "Tembel değerlendirme", definition: "Bir ifadenin değerinin ancak gerçekten istendiği anda hesaplanması; karşıtı, her aşamayı hemen bitiren istekli değerlendirmedir." },
    { term: "Kuyruk çağrısı", definition: "Bir fonksiyonun yaptığı son iş olan çağrı; dönen değer olduğu gibi iletildiği için çerçevede bekleyen iş kalmaz." },
    { term: "Not alma (memoization)", definition: "Bir fonksiyonun hesapladığı değerleri tabloda saklayıp aynı girdi yeniden gelince hesaplamadan tablodan döndürmesi." },
    { term: "Birleştirme ve geri izleme", definition: "Mantıksal programlamada motorun iki terimi değişkenlere değer bağlayarak eşitlemesi ve çıkmaz yolda son seçim noktasına dönüp sıradaki tümceyi denemesi." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Üniversitede paradigmalar tek tek değil, bir bütün olarak <strong>Programlama Dilleri</strong> dersinde karşına çıkar. MIT'nin efsanevi 6.001 dersi ve kitabı <em>Structure and Interpretation of Computer Programs</em>, Lisp'in bir lehçesiyle başlar: öğrenci önce fonksiyonel düşünür, sonra 'atama'nın programa ne kattığını ve ne kaybettirdiğini görür, en sonunda kendi yorumlayıcısını yazar; bu sayfadaki üç küçük yorumlayıcı o yolculuğun minyatürüdür. Bu sırada lambda hesabı yeniden sahneye çıkar: <strong>tür sistemleri</strong>, yani bir programın çalıştırılmadan belli hataları yapamayacağının gösterilmesi, doğrudan Church'ün sisteminin tipli uzantıları üzerine kuruludur. Yolun bugünkü ucunda bağımlı türler durur: Coq ve Lean gibi dillerde kanıtın kendisi bir programdır ve tür denetleyici onu sınar (Curry–Howard eşlemesi: önerme bir tür, kanıt o türden bir programdır).",
      "İkinci köprü çözümlemedir. <strong>Algoritma Analizi</strong> dersinde bu sayfada yaptığın şeyi, yani bir yineleme bağıntısı kurup kapalı biçimini bulmayı, her algoritma için yaparsın; not alma orada <strong>dinamik programlama</strong> adını alır. Mantık ve Yapay Zekâ derslerinde birleştirme algoritması ile çözümleme (resolution) kanıt arayan programların çekirdeği olarak yeniden görünür; Veritabanı dersinde bildirimsel bir sorgunun arkasındaki planlayıcıyı incelersin. Üçüncü köprü eşzamanlılıktır: İşletim Sistemleri ve Eşzamanlı Programlama derslerinde, paylaşılan bir değişkeni iki iş parçacığının aynı anda güncellemesiyle doğan yarış durumları buyurgan tarzın en pahalı hatası olarak karşına çıkar; fonksiyonel tarzın değişmezliği ve aktör modelinin mesajlaşması orada yalnızca zarif değil, işe yarar araçlardır. Derleyici dersinde ise bütün bu tarzların en sonunda aynı makine koduna indiğini kendin yazarsın: paradigma yüzeydedir; işlemci hep aynı şeyi yapar.",
    ],
    topics: ["Lambda hesabı ve tür sistemleri", "Yorumlayıcı yazmak (SICP)", "Yineleme bağıntıları ve dinamik programlama", "Kuyruk özyineleme ve katlama (fold)", "Birleştirme ve çözümleme (resolution)", "Tembel değerlendirme ve akışlar", "Eşzamanlılık ve aktör modeli", "Bağımlı türler ve program kanıtları"],
  },
  quiz: [
    {
      question: "Varsayılan listenin (3, 8, 5, 2, 7, 4) sonuna 10 ekleyip «Çift sayıların karelerinin toplamı» görevini çalıştırıyorsun. Atama sayısı 17'den, fonksiyon uygulaması 15'ten kaça çıkar?",
      options: ["Atama 20, uygulama 18", "Atama 19, uygulama 16", "Atama 18, uygulama 18", "Atama 20, uygulama 16"],
      answer: 0,
      explanation: "Yeni öğe çift olduğu için n de ç de bir artar. Atama 2n + ç + 2 = 14 + 4 + 2 = 20; uygulama n + 2ç + 3 = 7 + 8 + 3 = 18. Her çift öğe buyurgan tarafa üç atama (x, toplam, i), fonksiyonel tarafa üç uygulama (çift?, kare, topla) ekler; eklenen sayı tek olsaydı artışlar 2 ve 1 olurdu.",
    },
    {
      question: "ilk(filter(kare &gt; 2500, map(kare, [1 … N]))) ifadesinde N'yi 100'den 200'e çıkarıyorsun. İstekli ve tembel stratejinin uygulama sayıları nasıl değişir?",
      options: [
        "İkisi de iki katına çıkar: 400 ve 204",
        "İstekli 200'den 400'e çıkar, tembel 102'de kalır",
        "İkisi de değişmez; aranan öğe aynı yerde",
        "İstekli 200'de kalır, tembel 102'den 202'ye çıkar",
      ],
      answer: 1,
      explanation: "Aranan öğe yine 51. sıradadır (51² = 2601). Tembel strateji 51 öğede durur: 51 kare ve 51 yüklem uygulaması, 102; listenin geri kalanı hiç üretilmediği için N onu etkilemez. İstekli strateji önce bütün kareleri alır, sonra hepsini süzer: 2N, yani 400. Eşiği 40000 yapsaydın öğe bulunmazdı ve ikisi de 400 uygulama yapardı.",
    },
    {
      question: "ata(X, Y) :- ata(X, Z), ebeveyn(Z, Y). kuralı, ata(X, Y) :- ebeveyn(X, Y). tümcesinden önce yazılınca ata(ayla, Y) sorgusu hiç yanıt veremeden kesiliyor. Yalnızca bu iki tümcenin sırasını değiştirirsen ne olur?",
      options: [
        "Hiçbir şey değişmez; yine yanıt gelmez",
        "Altı yanıt gelir ve arama düzgünce biter",
        "Altı yanıt gelir, ama motor yedincisini ararken yine sonsuz özyinelemeye girer",
        "Yanıtlar eksik gelir, çünkü birleştirme tümce sırasına bağlıdır",
      ],
      answer: 2,
      explanation: "Olgulu tümce önce denendiği için yanıtlar bulunur; ama Prolog başka yanıt var mı diye geri izler ve her seviyede sonunda sol özyineli tümceye düşer: ata(ayla, Z) yeniden ata(ayla, Z') ister. Sayfada bu, «≥ 6 çözüm» ve 2000 birleştirme sınırında kesilen arama olarak görünür. Aramayı bitiren, gövdede ebeveyn hedefini özyineli çağrıdan önce yazmaktır.",
    },
  ],
  next: [
    { href: "hesaplama-teorisi.html", title: "Hesaplama Teorisi: Turing Makineleri, Lambda Hesabı ve Çözülemezlik", why: "Buyurgan ve fonksiyonel tarzın iki atasını kendin çalıştır: kurallarını yazdığın bir Turing makinesi ve adım adım indirgenen lambda terimleri; sonunda ikisinin de cevaplayamadığı soru." },
    { href: "veritabanlari.html", title: "Veritabanları: İlişkisel Model, Sorgular ve İndeksler", why: "Bildirimsel tarzın en yaygın örneği: bir SQL sorgusu yaz, motorun onu hangi plana çevirdiğini ve kaç satıra dokunduğunu say; aynı sorguyu indeksle yeniden çalıştır." },
    { href: "derleyici-ve-yorumlayicilar.html", title: "Derleyici ve Yorumlayıcılar", why: "Bu sayfadaki yorumlayıcıların büyüğü nasıl kurulur: kendi yazdığın küçük programın token'lara, söz dizimi ağacına, üç adresli koda ve bir yığın makinesinin bayt koduna dönüşmesi; dört yürütücü aynı sonucu verir mi?" },
    { href: "tasarim-desenleri.html", title: "Tasarım Desenleri: Say, Karşılaştır, Bedelini Gör", why: "Nesne yönelimli tarzın olgun hâli: Observer, Strategy, Decorator gibi desenler sayfada çalışan küçük programlarla sayılır ve her birinin bedeli de gösterilir; 23 klasik desenin kataloğu da orada." },
  ],
  sources: [
    { title: "Wikipedia · Programming paradigm", url: "https://en.wikipedia.org/wiki/Programming_paradigm", note: "Paradigma ailelerinin genel haritası ve tarihçesi (İngilizce)." },
    { title: "Stanford Encyclopedia of Philosophy · The Lambda Calculus", url: "https://plato.stanford.edu/entries/lambda-calculus/", note: "Church'ün 1930'larda kurduğu sistem: fonksiyonel programlamanın matematiksel kökü (İngilizce, ileri düzey)." },
    { title: "Python belgeleri · Functional Programming HOWTO", url: "https://docs.python.org/3/howto/functional.html", note: "Çok paradigmalı bir dilde fonksiyonel tarz: saf fonksiyon, yineleyiciler ve tembel çalışan üreteçler, map/filter." },
    { title: "Wikipedia · SLD resolution", url: "https://en.wikipedia.org/wiki/SLD_resolution", note: "Üçüncü sekmedeki motorun kuralı: Horn tümceleri üzerinde çözümleme, arama ağacı ve Prolog'un derinlik öncelikli stratejisi (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
