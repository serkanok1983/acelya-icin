window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["programlama-paradigmalari"] = {
  slug: "programlama-paradigmalari",
  title: "Programlama Paradigmaları: Aynı Soruya Beş Kafa",
  field: "Bilgisayar Bilimi",
  level: "Lise ileri",
  minutes: 35,
  tagline:
    "1936'da iki matematikçi 'hesaplamak nedir' sorusuna iki farklı cevap verdi; biri bugünkü döngülerin, öteki map ve filter'ın atasıdır. Aynı altı sayıyı beş ayrı kafayla işleyip neden hep [4, 16, 36] çıktığını görüyoruz.",
  hook:
    "Sayfadaki beş sekmede aynı iş yapılıyor: altı sayıdan çiftleri seç, karelerini al. C sürümünde üç değişken sürekli değişiyor; Haskell sürümünde hiçbir şey değişmiyor, hatta döngü bile yok; SQL sürümünde ise 'nasıl' yapılacağı hiç yazılmamış. Üçü de aynı cevabı veriyor. Peki bir bilgisayar, kendisine nasıl yapacağı söylenmeden bir işi nasıl yapar?",
  bigIdea:
    "Paradigma bir dil değil, bir <strong>düşünme biçimidir</strong>: programı 'adım adım değişen bir durum' olarak mı, 'birbirine bağlanan fonksiyonlar' olarak mı, 'mesajlaşan nesneler' olarak mı, yoksa 'sağlanması gereken bir tarif' olarak mı görüyorsun? Çoğu modern dil bunların birkaçını aynı anda taşır.",
  story: [
    "Her şey 1936'da, henüz tek bir bilgisayar yokken başladı. Princeton'da Alonzo Church, hesaplamayı yalnızca fonksiyon tanımlayıp fonksiyona fonksiyon uygulamaktan ibaret bir sisteme indirgedi: <strong>lambda hesabı</strong>. İçinde değişken ataması, döngü, bellek yoktu. Aynı yıl İngiltere'de 23 yaşındaki Alan Turing bambaşka bir model yazdı: sonsuz bir şerit üzerinde ileri geri giden, hücre okuyup yazan bir makine. Baştan sona 'durum değiştir' üzerine kuruluydu. İki model birbirinden daha farklı görünemezdi; ama Turing, Church'ün yanına doktora yapmaya gittiğinde ikisinin tam olarak aynı şeyleri hesaplayabildiği kanıtlanmıştı. Bugünkü bütün paradigma tartışması bu iki kökten büyür: Turing'in makinesi <strong>emirli</strong> (imperative) tarzın, Church'ün fonksiyonları <strong>fonksiyonel</strong> tarzın atasıdır.",
    "İlk gerçek diller bu iki yolu izledi. 1957'de IBM'de John Backus'un ekibi Fortran'ı teslim etti: döngü, atama, GOTO; makinenin diliyle düşünen bir dil. Bir yıl sonra MIT'de John McCarthy, Church'ün fikirlerinden esinlenerek Lisp'i tasarladı; listeler, özyineleme ve fonksiyonun bir veri gibi elden ele geçmesi. 1968'de Edsger Dijkstra, <em>Communications of the ACM</em>'e GOTO'nun programları takip edilemez hale getirdiğini anlatan bir mektup yazdı; editör Niklaus Wirth başlığı 'Go To Statement Considered Harmful' diye değiştirdi ve bu başlık bir slogan oldu. Döngü, koşul ve alt programlarla yazılan <strong>yapısal programlama</strong> böyle yerleşti. Aynı yıllarda Oslo'da Ole-Johan Dahl ile Kristen Nygaard, benzetim (simülasyon) programları yazmak için tasarladıkları Simula 67'de 'sınıf', 'nesne' ve 'kalıtım' sözcüklerini icat ettiler; Xerox PARC'ta Alan Kay bu fikri çocuklar için tasarladığı Smalltalk'ta 'birbirine mesaj gönderen nesneler' olarak yeniden kurdu ve 'nesne yönelimli' terimini ortaya attı.",
    "Sözcüğün kendisi 1962'de Thomas Kuhn'un bilim tarihinden gelir: paradigma, bir dönemin bilim insanlarının paylaştığı bakış açısıdır. Bilgisayar bilimine 1978'de Robert Floyd'un Turing Ödülü konuşmasıyla girdi: 'The Paradigms of Programming'. Bir yıl önce aynı kürsüden daha sarsıcı bir konuşma yapılmıştı: Fortran'ın babası Backus, 1977 Turing Ödülü konuşmasında kendi yarattığı tarzı eleştirdi. Değişkenlerin teker teker güncellendiği bu tarza 'von Neumann darboğazı' dedi ve programların matematikteki fonksiyonlar gibi birleştirilmesini önerdi. 1972'de Marsilya'da Alain Colmerauer ile Philippe Roussel, doğal dil cümlelerini çözümlemek için yalnızca gerçekler ve kurallar yazılan Prolog'u yapmıştı; 1974'te IBM'de Donald Chamberlin ve Raymond Boyce, Edgar Codd'un ilişkisel modelini 'ne istediğini söyle' diyen SEQUEL'e, yani SQL'e dönüştürdü. 1990'da ise bir komite, dağınık tembel fonksiyonel dilleri Haskell adında tek bir dilde topladı; adı, 'currying' kavramının da adını taşıyan mantıkçı Haskell Curry'den gelir.",
    "Bugün saf paradigmalı dil azdır. Python, JavaScript, Kotlin, Swift ve Rust hem döngü hem map/filter hem nesne taşır; Java 2014'te Stream API ile fonksiyonel boru hatlarını içeri aldı, JavaScript 2015'te 'class' sözdizimini. Paradigma kavgası bitmedi ama taraf değiştirdi: soru artık 'hangi dil' değil, 'bu parça için hangi kafa'. Bir oyun döngüsü emirli, bir veri temizleme zinciri fonksiyonel, bir arayüz nesne yönelimli, bir veritabanı sorgusu bildirimsel yazılır; hepsi aynı programın içinde. Sayfadaki beş sekme, aynı altı sayıyı bu kafaların her biriyle işleyip hep [4, 16, 36] bulur.",
  ],
  core: [
    {
      heading: "Emirli tarz: program, adım adım değişen bir durumdur",
      body:
        "C sekmesindeki kod bir tarif gibidir: i'yi 0 yap, 6'dan küçükken artır, çiftse kareyi result'a koy, j'yi bir artır. Her satır belleği değiştirir; program bir anda <strong>durum</strong> (bütün değişkenlerin o anki değerleri) ile anlatılır ve her komut bu durumu bir sonrakine taşır. Bu, işlemcinin gerçekten yaptığı şeydir: bir yazmaç oku, hesapla, geri yaz. Bu yüzden emirli kod hızlı ve donanıma yakındır; bedeli ise 'şu anda j kaç?' sorusunun cevabının, baştan beri çalışan her satıra bağlı olmasıdır. Kodun bir satırını anlamak için öncesini zihninde çalıştırman gerekir. <strong>Yordamsal</strong> (procedural) tarz, bu adımları isimli alt programlara bölerek düzen getirir; kalıp aynıdır, yalnızca paketlenmiştir.",
      formula: "x = x + 1",
      formulaNote: "Bu bir denklem değil, bir emirdir: 'x'in eski değerine 1 ekle, sonucu x'e geri yaz.' Matematikte böyle bir x yoktur.",
    },
    {
      heading: "Fonksiyonel tarz: değer akar, hiçbir şey değişmez",
      body:
        "Haskell sekmesinde atama yoktur; <code>input</code> bir kez tanımlanır ve bir daha dokunulmaz. <code>filter even</code> altı sayıdan üçünü süzer, <code>map (^2)</code> üçünün karesini alır ve sonuç yeni bir listedir; eski liste olduğu gibi durur. Bu tarzın temel taşı <strong>saf fonksiyon</strong>dur: aynı girdiye hep aynı çıktıyı verir ve dışarıda hiçbir şeyi değiştirmez. Saf fonksiyonların büyük ödülü <strong>gönderimsel saydamlık</strong>tır: bir ifadeyi değeriyle değiştirebilirsin, tıpkı 2 + 3 yerine 5 yazabildiğin gibi. Bu yüzden test etmek, sırasını değiştirmek ve farklı çekirdeklerde aynı anda çalıştırmak kolaydır. Döngünün yerini <strong>özyineleme</strong> ve map, filter, reduce gibi <strong>yüksek mertebeli fonksiyonlar</strong> alır: fonksiyonlar başka fonksiyonlara parametre olarak verilir.",
      formula: "(f ∘ g)(x) = f(g(x))  →  map (^2) ∘ filter even",
      formulaNote: "Sağdaki önce uygulanır: önce süz, sonra karesini al. Haskell'de nokta (.) tam bu birleştirme işlemidir.",
    },
    {
      heading: "Nesne yönelimli tarz: durum + davranış, bir arada ve saklı",
      body:
        "Nesne, verisini ve o veriyle ne yapılabileceğini tek bir pakette taşır. Sayfadaki <code>BankAccount</code> örneğinde bakiye <code>private</code>'tır: dışarıdan kimse <code>balance = -500</code> yazamaz, yalnızca <code>deposit</code> çağırabilir ve o da eksi para kabul etmez. Bu <strong>sarmalama</strong>dır; durumun değişmesine izin verir ama kapıya bir bekçi koyar. Asıl güç <strong>çok biçimlilik</strong>tedir: <code>a.makeSound()</code> yazdığında hangi kodun çalışacağı yazarken değil, çalışma anında a'nın gerçekten ne olduğuna bakılarak belirlenir. Alan Kay'in deyişiyle nesne yönelimli programlama 'sınıf' demek değil, <strong>mesajlaşma</strong> demektir: nesneye ne yapması gerektiğini söylersin, nasıl yapacağını o bilir. Kalıtım ise ortak davranışı yukarı taşıma yoludur; kolaydır ama derin hiyerarşiler kırılgan olur, bu yüzden deneyimli programcılar 'kalıtım yerine bileşim' der.",
      formula: "nesne = durum + davranış  ·  a.makeSound() → çalışma anında seçilir",
      formulaNote: "Buna geç bağlama (late binding) denir: aynı satır Dog için havlar, Cat için miyavlar.",
    },
    {
      heading: "Bildirimsel ve mantıksal tarz: ne'yi söyle, nasıl'ı devret",
      body:
        "SQL sekmesinde döngü yok, sayaç yok, sıra yok: <code>SELECT number*number WHERE number % 2 = 0</code>. Sen istediğin sonucu tarif edersin; tabloyu nasıl tarayacağına, hangi dizini kullanacağına, işi kaç çekirdeğe böleceğine veritabanı motoru karar verir. Bu 'sihir' değildir; 'nasıl' kısmını senin yerine başkası, yani <strong>sorgu iyileştirici</strong> yazmıştır ve o kısım senin yazacağından çoğu zaman daha iyidir. Mantıksal programlama bunun en uç halidir: Prolog'a yalnızca gerçekler (<em>anne(ayşe, ali)</em>) ve kurallar (<em>ebeveyn(X,Y) :- anne(X,Y)</em>) verirsin, sonra soru sorarsın. Motor, <strong>birleştirme</strong> ile değişkenlere uygun değerler arar; bir yol tıkanırsa <strong>geri izleme</strong> yapıp başka yol dener. HTML ve CSS de bildirimseldir: 'bu kutu kırmızı olsun' dersin, tarayıcı pikselleri boyar.",
      formula: "Bildirimsel: SONUÇ tarifi  ·  Emirli: ADIM listesi",
      formulaNote: "Sayfadaki SQL ile C aynı [4, 16, 36] sonucunu verir; aralarındaki tek fark, döngüyü kimin yazdığıdır.",
    },
    {
      heading: "Paradigma dilin değil, programcının tutumudur",
      body:
        "'Multi-Paradigm (JS/Python)' sekmesi bu sayfanın en önemli dersidir: aynı dilde aynı iş iki kez yazılmıştır. Üstteki <code>filter</code>/<code>map</code> zinciri fonksiyonel kafadır; alttaki <code>for</code> döngüsü ve <code>result2.push</code> emirli kafadır. Dil izin verir, seçim senindir. Dil ve Paradigma Matrisi aynı şeyi 16 dil üzerinde söyler: Python'un, Kotlin'in, Swift'in satırında birden fazla işaret vardır. Paradigmayı bir dilin kimliği değil, bir problemi ele alma biçimi olarak gör: veri dönüştürürken fonksiyonel, bir oyun karakterini modellerken nesne yönelimli, bir sorgu yazarken bildirimsel düşünmek doğaldır. İyi programcı tek bir paradigmanın hayranı değil, her birinin ne zaman işe yaradığını bilen kişidir.",
      formula: "1 dil ≠ 1 paradigma",
      formulaNote: "Matrisin en kalabalık satırları (C#, JavaScript, TypeScript) tek bir paradigma için değil, birkaçını birlikte taşımak üzere tasarlanmış dillerdir.",
    },
  ],
  lab: {
    intro:
      "Bu sayfada kaydırıcı yok; kontroller tıklanabilir. Üstte sekiz <strong>paradigma kartı</strong> (tıklayınca altındaki açıklama kutusu dolar), sonra beş sekmeli <strong>Aynı Problem, Farklı Paradigmalar</strong> kod kutusu, dört sabit <strong>OOP direği</strong> kartı, sekiz tıklanabilir <strong>FP kavramı</strong> kartı (açıklama ve kod örneği açılır), 16 satırlık <strong>Dil &amp; Paradigma Matrisi</strong> ve beş <strong>İleri Seviye</strong> kartı. Aşağıdaki sayılar sayfanın kendi verisinden çıkar; kâğıt kalemle doğrulanabilir.",
    experiments: [
      {
        title: "Beş sekmede 'değişen' kaç şey var?",
        predict:
          "Aynı Problem kutusunda sekmeleri sırayla gezeceksin. Her sekmede 'bir kez atanıp sonra üzerine yazılan' değişkenleri sayacaksın. Hangi sekmede en çok, hangisinde hiç olmaz? Sonuç listesi her sekmede aynı mı çıkar?",
        do: "Sırayla Imperative (C), OOP (Java), FP (Haskell), Declarative (SQL) ve Multi-Paradigm (JS/Python) sekmelerine tıkla. Her kodda ++, += ya da push gibi 'üzerine yazma' izleri ara ve sayfanın altındaki not satırını oku.",
        observe:
          "C'de üç değişken sürekli değişir: i, j ve result dizisi. Java, Haskell ve SQL'de sıfır; sonuç tek seferde üretilir. JS sekmesinde üst yarı sıfır, alt yarı bir (result2). Beş sekmenin beşi de [4, 16, 36] verir.",
        explain:
          "Aynı matematik, farklı kayıt tutma biçimleri. Emirli kod ara durumu bellekte taşır; fonksiyonel ve bildirimsel kod ara durumu hiç adlandırmaz, değer bir fonksiyondan ötekine akar. Java sekmesi dikkat ister: dil nesne yönelimli, ama o beş satır fonksiyonel bir boru hattıdır; sayfanın notu da bunu söyler.",
      },
      {
        title: "Kartlarda bir dil kaç kez geçer?",
        predict:
          "Sekiz paradigma kartının altında örnek diller yazıyor. Sence bir dil yalnızca bir kartta mı görünür? C, Prolog ve Erlang'ın kaç kartta geçtiğini tahmin et; sonra Python için matrise bakınca ne göreceğini düşün.",
        do: "Sekiz kartın 'örnek diller' satırlarını oku ve her dilin kaç kartta geçtiğini say. Sonra aşağıdaki matriste Python satırını bul ve işaretlerini say.",
        observe:
          "C, Pascal ve Fortran iki kartta (Imperative ve Procedural); Prolog iki kartta (Declarative ve Logic); Erlang ve Elixir iki kartta (Functional ve Event-Driven); C# iki kartta (OOP ve Event-Driven). Python kartlarda yalnızca OOP altında, matriste ise üç tam işaret ve bir yarım işaret taşır.",
        explain:
          "Kartlar bir paradigmayı en iyi temsil eden dili seçer; matris ise bir dilin neler yapabildiğini sayar. Prolog'un hem Declarative hem Logic'te olması tutarlıdır: mantıksal programlama bildirimsel ailenin bir üyesidir. Python'un kartta tek, matriste çok görünmesi 'bir dil, bir paradigma' fikrinin neden yanlış olduğunun kanıtıdır.",
      },
      {
        title: "Matrisi sorgula: hangi sütun boş, hangi işaret şüpheli?",
        predict:
          "Yedi sütunda toplam kaç tam işaret (✅) olabilir? En dolu sütun hangisi? Hangi dilin satırı en kalabalık? Ve bir editör gözüyle: tabloda sana yanlış gelen bir işaret bulabilir misin?",
        do: "Matriste her sütundaki ✅ ve ◐ işaretlerini say; sonra her satırdakileri. En sağdaki Concurrent sütununa ve SQL ile C# satırlarına özellikle bak.",
        observe:
          "Sütunlar: Imperative 12, OOP 9, FP 10 tam + 3 yarım, Logic 3, Declarative 3, Reactive 8 tam + 2 yarım, Concurrent 0. Toplam 45 tam, 5 yarım işaret. En kalabalık satırlar C#, JavaScript ve TypeScript (5'er); C, Haskell, Prolog ve SQL tek işaretli. Concurrent sütunu bütünüyle boş; SQL 'Logic' altında ama 'Declarative' altında değil; C# 'Logic' altında tam işaretli.",
        explain:
          "Bu, sayfanın verisindeki gerçek bir pürüzdür ve onu görmek öğrenmenin parçasıdır. SQL mantıksal değil bildirimsel bir dildir; C# bir Prolog değildir; Go, Rust ve Elixir eşzamanlılıkla ünlü olduğu halde Concurrent sütunları boştur. Tablo büyük ihtimalle sütun kaydırılarak doldurulmuştur. Ders: bir tabloyu okumak, tabloya inanmak değildir.",
      },
      {
        title: "Özyinelemeyi elle çalıştır",
        predict:
          "FP kartlarından Recursion'ı açınca <code>sum</code> fonksiyonunu göreceksin. sum([4,16,36]) için fonksiyon kaç kez çağrılır ve sonuç kaç çıkar? Currying kartındaki add(1)(2)(3) ile Higher-Order Functions kartındaki double(5) ne verir?",
        do: "Recursion kartına tıkla, kodu kâğıda geçir ve [4,16,36] için her çağrıyı alt alta yaz. Sonra Currying ve Higher-Order Functions kartlarını aç; kod örneklerinin yorum satırlarındaki sonuçları kendi hesabınla karşılaştır.",
        observe:
          "sum([4,16,36]) = 4 + sum([16,36]) = 4 + 16 + sum([36]) = 4 + 16 + 36 + sum([]) = 56; boş liste çağrısı dahil 4 çağrı. add(1)(2)(3) = 6, double(5) = 10; sayfadaki yorum satırları da aynı sayıları verir.",
        explain:
          "Özyineleme, döngüdeki sayacı çağrı yığınına taşır: her çağrı listenin başını alır, kalanını bir sonraki çağrıya devreder, boş listede durur. Currying'de her parantez bir fonksiyon döndürür; add(1) henüz sayı değil, 'bir eklemeyi bekleyen' bir fonksiyondur. İkisi de 'fonksiyon bir değerdir' fikrinin iki yüzüdür.",
      },
    ],
  },
  wow: [
    {
      title: "Fortran'ın babası kendi tarzına karşı çıktı",
      body:
        "John Backus 1957'de ilk Fortran derleyicisini teslim eden ekibi yönetti; bugünkü bütün döngü-atama tarzının mimarlarından biriydi. Yirmi yıl sonra, 1977 Turing Ödülü konuşmasının başlığı şuydu: 'Programlama von Neumann Tarzından Kurtarılabilir mi?' Değişkenleri teker teker güncellemeye 'von Neumann darboğazı' dedi ve programların matematikteki fonksiyonlar gibi birleştirilmesini önerdi. Fonksiyonel programlamanın en ünlü savunusu, emirli programlamanın kurucularından birinden geldi.",
    },
    {
      title: "1936: iki model, bir güç",
      body:
        "Alonzo Church'ün lambda hesabında bellek ve atama yoktur, yalnızca fonksiyon vardır; Alan Turing'in makinesinde ise fonksiyon yoktur, yalnızca şerit üzerinde değişen hücreler vardır. İkisi de 1936'da yayımlandı ve birbirinin tam zıddı görünür. Yine de tam olarak aynı problemleri çözebildikleri kanıtlandı; Turing bu denkliği makalesine eklediği bir ekte gösterdi, ardından doktorasını Church'ün yanında, Princeton'da yaptı. Bugünkü map/filter ile for döngüsü arasındaki fark, 90 yıllık bu denkliğin iki ucudur: ikisi de her şeyi hesaplayabilir, farklı düşündürür.",
    },
    {
      title: "Elli küsur çalışan, 450 milyon kullanıcı",
      body:
        "Şubat 2014'te Facebook, WhatsApp'ı 19 milyar dolara satın aldığında uygulama 450 milyon aylık kullanıcıya 55 kişilik bir şirketle hizmet veriyordu. Sunucuların dili Erlang'dı: Ericsson'da 1986'da telefon santralleri için Joe Armstrong'un başlattığı, bugün sayfadaki Actor Model kartında anlatılan paradigmayı taşıyan dil. Paylaşılan bellek yok, yalnızca birbirine mesaj gönderen milyonlarca küçük süreç; biri çökerse gözetmen onu yeniden başlatır. Doğru paradigma, bazen bir mühendis ordusunun yerini tutar.",
    },
  ],
  worked: {
    title: "Aynı altı sayı, iki kafa: sayarak karşılaştır",
    prompt:
      "Girdi [1, 2, 3, 4, 5, 6]. Çift sayıların karelerini bul; sonra sonuçları topla. Önce sayfadaki C kodunun yaptığı gibi emirli, sonra Haskell kodunun yaptığı gibi fonksiyonel düşün. Her iki yolda kaç 'adım' atılır, kaç değişken değişir?",
    steps: [
      "Emirli yol, döngü başı: i = 0, j = 0, result boş. i = 0: input[0] = 1, tek, atla. i = 1: 2 çift → result[0] = 4, j = 1. i = 2: 3 tek. i = 3: 4 çift → result[1] = 16, j = 2. i = 4: 5 tek. i = 5: 6 çift → result[2] = 36, j = 3. Döngü biter: 6 tur, 6 çiftlik testi, 3 çarpma; ilk değerler dahil i 7 kez, j 4 kez, result gözleri 3 kez yazıldı. result dizisinin 6 gözünden yalnızca ilk 3'ü dolu; gerçek uzunluk j = 3'tür.",
      "Fonksiyonel yol, birinci aşama: filter even [1,2,3,4,5,6]. even fonksiyonu 6 kez çağrılır; 1, 3, 5 için False, 2, 4, 6 için True. Çıktı yeni bir listedir: [2, 4, 6]. Girdi listesi değişmedi.",
      "İkinci aşama: map (^2) [2,4,6]. Kare fonksiyonu 3 kez çağrılır: 4, 16, 36. Çıktı yine yeni bir listedir: [4, 16, 36]. Toplam 9 fonksiyon çağrısı, 0 atama, 0 sayaç.",
      "Toplam için özyineleme (sayfadaki Recursion kartı): sum [4,16,36] = 4 + sum [16,36] = 4 + 16 + sum [36] = 4 + 16 + 36 + sum [] = 56. Dört çağrı, en derin noktada yığında dört kayıt. Emirli yolda aynı toplam bir sayaçla üç toplama adımında bulunurdu: t = 0 → 4 → 20 → 56.",
      "Karşılaştır: iki yol da 6 çiftlik testi ve 3 çarpma yapar; hesap miktarı aynıdır. Fark kayıt tutmada: emirli yol i, j, result ve t'yi yerinde günceller, fonksiyonel yol her aşamada yeni liste üretir ve hiçbir ismi yeniden kullanmaz. Birinde 'şu an j kaç?' diye sorarsın, ötekinde 'bu ifadenin değeri ne?'",
    ],
    result:
      "Her iki kafa da [4, 16, 36] ve toplam 56'yı bulur. Emirli yol dört değişkene (i, j, result, t) toplam 18 yazma yapar; fonksiyonel yol 9 + 4 = 13 fonksiyon çağrısıyla hiçbir şeyi değiştirmeden aynı yere varır. Paradigma, hesabın miktarını değil biçimini değiştirir.",
  },
  misconceptions: [
    {
      myth: "Python nesne yönelimli bir dildir; o yüzden Python'da fonksiyonel programlama yapılmaz.",
      truth:
        "Python'da her şey nesnedir ama map, filter, lambda ve liste üreteçleri dilin içindedir; Python belgeleri 'Functional Programming HOWTO' adında ayrı bir rehber taşır. Sayfadaki matris Python'a Imperative, OOP ve FP için üç tam işaret verir. Paradigma dilin kimliği değil, o anki kodun biçimidir.",
    },
    {
      myth: "Fonksiyonel programlamada döngü olmadığı için bazı şeyler yazılamaz.",
      truth:
        "Lambda hesabı ile Turing makinesinin aynı gücte olduğu 1936'da kanıtlandı: döngüyle yazılabilen her şey özyineleme ya da map/filter/reduce ile de yazılabilir. Fark neyin yazılabildiğinde değil, kodun nasıl düşünüldüğünde ve nerede hata yapmanın kolay olduğundadır.",
    },
    {
      myth: "Nesne yönelimli programlama demek class yazmak ve kalıtım kullanmak demektir.",
      truth:
        "Terimi ortaya atan Alan Kay'e göre öz, nesnelerin durumlarını saklayıp birbirine mesaj göndermesidir. JavaScript 2015'e kadar 'class' sözcüğü olmadan da nesne yönelimliydi (prototiplerle). Kalıtım bir araçtır; GoF'tan beri tavsiye 'kalıtım yerine bileşim'dir.",
    },
    {
      myth: "Bildirimsel dillerde bilgisayar 'nasıl'ı kendi kendine bulur.",
      truth:
        "Bulan bilgisayar değil, motoru yazan insanlardır. SQL'in arkasında on yıllarca geliştirilmiş bir sorgu iyileştirici vardır; Prolog'un arkasında birleştirme ve geri izleme algoritması. Sen 'nasıl'ı yazmazsın, ama birisi yazmıştır ve sınırları vardır: kötü yazılmış bir sorgu yine saatler sürebilir.",
    },
  ],
  glossary: [
    { term: "Paradigma", definition: "Programı kurgulamanın temel biçimi: değişen durum, fonksiyon akışı, mesajlaşan nesneler ya da sonuç tarifi." },
    { term: "Durum (state)", definition: "Bir programın herhangi bir anda bellekte tuttuğu bütün değişken değerlerinin toplamı." },
    { term: "Yan etki", definition: "Bir fonksiyonun geri döndürdüğü değer dışında dünyada bıraktığı iz: değişken değiştirmek, dosyaya yazmak, ekrana basmak." },
    { term: "Saf fonksiyon", definition: "Aynı girdiye her zaman aynı çıktıyı veren ve yan etkisi olmayan fonksiyon; matematikteki fonksiyon gibi." },
    { term: "Değişmezlik (immutability)", definition: "Bir veri bir kez oluşturulduktan sonra değiştirilmez; değişiklik gerekirse yeni bir kopya üretilir." },
    { term: "Yüksek mertebeli fonksiyon", definition: "Parametre olarak fonksiyon alan ya da sonuç olarak fonksiyon döndüren fonksiyon; map, filter ve reduce gibi." },
    { term: "Çok biçimlilik", definition: "Aynı çağrının, nesnenin çalışma anındaki gerçek türüne göre farklı kod çalıştırması." },
    { term: "Birleştirme ve geri izleme", definition: "Mantıksal programlamada motorun değişkenlere uygun değer araması ve çıkmaz yolda bir önceki seçime dönüp başka yol denemesi." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Üniversitede paradigmalar ayrı bir ders olarak değil, bir bütün olarak 'programlama dilleri' dersinde karşına çıkar. MIT'nin efsanevi 6.001 dersi ve kitabı <em>Structure and Interpretation of Computer Programs</em>, Lisp'in bir lehçesiyle başlar: öğrenci önce fonksiyonel düşünür, sonra 'atama'nın programa ne kattığını ve ne kaybettirdiğini görür, en sonunda kendi yorumlayıcısını yazar. Bu sırada lambda hesabı yeniden sahneye çıkar: üniversitede <strong>tür sistemleri</strong>, yani bir programın çalıştırılmadan doğru olduğunun kanıtlanması, doğrudan Church'ün sisteminin tipli uzantıları üzerine kuruludur. Sayfadaki 'Dependent Types' kartı bu yolun bugünkü ucudur: Coq ve Lean gibi dillerde bir program ile onun doğruluk kanıtı aynı şeydir.",
      "Öteki köprü eşzamanlılıktır. İşlemciler 2005'ten beri saat hızından çok çekirdek sayısıyla büyüyor; paylaşılan değişkeni iki çekirdek aynı anda güncellediğinde ortaya çıkan yarış durumları, emirli tarzın en pahalı hatasıdır. Bu yüzden lisans derslerinde fonksiyonel tarzın değişmezliği, Erlang'ın aktör modeli ve Go'nun kanalları yalnızca zarif değil, zorunlu araçlar olarak öğretilir. Derleyici dersinde ise beş sekmede gördüğün bütün tarzların en sonunda aynı makine koduna indiğini kendin yazarsın: paradigma yüzeydedir, işlemci hep Turing'in makinesidir.",
    ],
    topics: ["Lambda hesabı ve tür sistemleri", "Yorumlayıcı yazmak (SICP)", "Eşzamanlılık ve yarış durumları", "Aktör modeli ve mesajlaşma", "Monadlar ve etkilerin yönetimi", "Mantık programlama ve kısıt çözme", "Bağımlı türler ve program kanıtları"],
  },
  quiz: [
    {
      question: "Sayfadaki beş sekmeden hangisinde çözüm boyunca hiçbir değişkenin üzerine yazılmaz?",
      options: ["Yalnızca Imperative (C)", "Haskell, SQL ve Java Stream sekmeleri", "Yalnızca Multi-Paradigm (JS/Python)", "Hiçbiri; her programda atama vardır"],
      answer: 1,
      explanation: "C'de i, j ve result sürekli değişir; JS sekmesinin alt yarısında result2.push vardır. Haskell, SQL ve Java'nın Stream zinciri ise sonucu tek seferde, yeni bir değer olarak üretir.",
    },
    {
      question: "1977 Turing Ödülü konuşmasında 'von Neumann darboğazı'nı eleştirip fonksiyonel tarzı savunan kişi hangi dilin yaratıcısıydı?",
      options: ["Lisp", "Prolog", "Fortran", "Smalltalk"],
      answer: 2,
      explanation: "John Backus, 1957'de Fortran'ı yapan ekibin başındaydı; yirmi yıl sonra kendi kurduğu emirli tarzı eleştirdi. Lisp McCarthy'nin, Prolog Colmerauer'in, Smalltalk Kay'in işidir.",
    },
    {
      question: "SQL'de SELECT ... WHERE yazdığında döngüyü kim yazar?",
      options: ["Kimse; döngü gerekmez", "Programcı, WHERE içinde", "Veritabanı motorunun sorgu iyileştiricisi", "İşletim sistemi"],
      answer: 2,
      explanation: "Bildirimsel tarzda 'nasıl'ı sen yazmazsın ama birisi yazmıştır: motorun içindeki iyileştirici tabloyu nasıl tarayacağına karar verir. Sihir değil, iş bölümüdür.",
    },
  ],
  next: [
    { href: "hesaplama-teorisi.html", title: "Hesaplama Teorisi", why: "Church ile Turing'in 1936'daki iki modelinin neden aynı güçte olduğunu ve neyin hesaplanamayacağını gör." },
    { href: "tasarim-desenleri.html", title: "Tasarım Desenleri", why: "Nesne yönelimli tarzın olgun hali: 23 desen ve 'kalıtım yerine bileşim' ilkesi." },
    { href: "derleyici-ve-yorumlayicilar.html", title: "Derleyici ve Yorumlayıcılar", why: "Beş sekmedeki bütün tarzların nasıl tek bir makine koduna indiğini izle." },
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "map ve filter'ın üzerinde çalıştığı listeler, yığınlar ve ağaçlar; özyinelemenin doğal evi." },
  ],
  sources: [
    { title: "Wikipedia · Programming paradigm", url: "https://en.wikipedia.org/wiki/Programming_paradigm", note: "Paradigma ailelerinin genel haritası ve tarihçesi (İngilizce)." },
    { title: "Python belgeleri · Functional Programming HOWTO", url: "https://docs.python.org/3/howto/functional.html", note: "Nesne yönelimli bilinen bir dilde fonksiyonel tarz: saf fonksiyon, üreteçler, map/filter." },
    { title: "MDN · Array.prototype.map()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map", note: "Sayfadaki JS sekmesinin dayandığı yüksek mertebeli fonksiyon; tarayıcı konsolunda hemen denenebilir." },
    { title: "Stanford Encyclopedia of Philosophy · The Lambda Calculus", url: "https://plato.stanford.edu/entries/lambda-calculus/", note: "Church'ün 1936 sistemi: fonksiyonel programlamanın matematiksel kökü (İngilizce, ileri düzey)." },
  ],
  revision: "Ekim 2026",
};
