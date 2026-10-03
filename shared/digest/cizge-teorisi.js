window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["cizge-teorisi"] = {
  slug: "cizge-teorisi",
  title: "Çizge Teorisi: Köprülerden Algoritmalara",
  field: "Matematik",
  level: "Lise",
  minutes: 30,
  tagline:
    "Yedi köprü, bir nehir ve 1736'da 'bunun matematikle pek ilgisi yok' diyen Euler. Noktalarla çizgilerden kurulu bu dünya bugün harita uygulamalarının, sosyal ağların ve internetin omurgası.",
  hook:
    "Königsberg'in yedi köprüsünü, hiçbirinden iki kez geçmeden tek bir yürüyüşte dolaşabilir misin? Kasabalılar yıllarca denedi. Euler 1735'te haritaya bakmadan, yalnızca her bölgeye kaç köprü bağlandığını sayarak 'hayır' dedi. Sayfadaki tuvalde aynı sayma oyununu sen de yapacaksın; hem de iki tıkla.",
  bigIdea:
    "Bir çizgede önemli olan nesnelerin yeri değil, <strong>kimin kime bağlı olduğudur</strong>: köprü bulmacasından harita uygulamasına kadar her soru ya düğümlerin derecesini saymaya ya da kenarlar üzerinde sistemli gezinmeye indirgenir.",
  story: [
    "Pregel Nehri, Königsberg'i (bugünkü Kaliningrad) dört kara parçasına bölüyordu: iki kıyı, ortadaki Kneiphof adası ve nehrin iki kolu arasındaki doğu bölgesi. Bunları yedi köprü bağlıyordu ve şehrin bilmecesi şuydu: her köprüden tam bir kez geçen bir yürüyüş var mı? Soru 1735'te St. Petersburg'daki Leonhard Euler'e ulaştı. Euler, Danzig belediye başkanı Carl Ehler'e yazdığı mektupta bu tür bir sorunun matematikle pek ilgisi olmadığını ve neden bir matematikçiden çözüm beklendiğini anlamadığını söyler; yine de çözdü. 26 Ağustos 1735'te Akademi'de sundu, 1736 tarihli makalesi 1741'de basıldı. Euler nokta ve çizgi çizmedi; bölgelere A, B, C, D harflerini verdi ve her bölgeye bağlanan köprüleri saydı.",
    "Euler'in fikri bir sayma argümanıydı. Bir bölgeye bir köprüden girip başka bir köprüden çıkarsın; demek ki yürüyüşün başlamadığı ve bitmediği her bölgenin köprü sayısı <strong>çift</strong> olmalı. Königsberg'de ise dört bölgenin köprü sayıları 5, 3, 3 ve 3'tü: dördü de tek. En fazla iki bölge başlangıç ve bitiş olabileceğine göre böyle bir yürüyüş olamazdı. Euler bu koşulun gerekli olduğunu gösterdi; koşul sağlandığında yolun gerçekten var olduğunu ise 1873'te, ölümünden sonra yayımlanan çalışmasıyla Carl Hierholzer kanıtladı. Aradaki 137 yıl, 'olamaz' demekle 'hep olur' demenin farklı zorlukta işler olduğunu hatırlatır.",
    "Alanın adı bile yüz kırk yıl bekledi. 'Graph' sözcüğünü 1878'de J. J. Sylvester, kimyacıların molekül çizimlerinden esinlenerek <em>Nature</em> dergisinde kullandı. O sırada Kirchhoff elektrik devrelerini (1847) ve Cayley hidrokarbon izomerlerini (1870'ler) saymak için çoktan ağaç yapılarını kullanıyordu; 1852'de Francis Guthrie'nin ortaya attığı dört renk problemi ise bir asırdan uzun süre çözümsüz kalacaktı. İlk ders kitabını 1936'da Macar matematikçi Dénes Kőnig yazdı. Türkçede 'çizge' sözcüğü, fonksiyon grafiğiyle karışmasın diye seçilmiştir: burada eksen yok, yalnızca düğümler ve kenarlar var.",
    "Asıl patlama bilgisayarla geldi. 1956'da Edsger Dijkstra, Amsterdam'da bir kafe terasında, kâğıt kalem olmadan, iki şehir arasındaki en kısa yolu bulan algoritmasını tasarladı; amacı yeni ARMAC bilgisayarını halka 64 Hollanda şehrinden oluşan bir haritayla göstermekti. 1959'da üç sayfalık bir not olarak yayımlanan bu yöntem, bugün her navigasyon uygulamasının çekirdeğinde yaşıyor. 1998'de Brin ve Page web sayfalarını düğüm, bağlantıları kenar sayıp PageRank'i kurdu; sosyal ağlar arkadaş önerilerini, biyologlar protein etkileşimlerini, epidemiyologlar salgınları aynı dille modelliyor. Sayfadaki tuval işte bu dilin alfabesi.",
  ],
  core: [
    {
      heading: "Düğüm, kenar, derece: her şey sayılabilir",
      body:
        "Bir <strong>çizge</strong>, bir düğüm kümesi ile bu düğümleri ikişer ikişer bağlayan kenarlardan oluşur. Düğüm şehir, kişi, atom ya da web sayfası olabilir; kenar köprü, arkadaşlık, bağ ya da bağlantı. Bir düğümün <strong>derecesi</strong>, ona bağlanan kenar sayısıdır. Her kenarın iki ucu olduğu için bütün derecelerin toplamı kenar sayısının tam iki katıdır; buna <em>el sıkışma kuralı</em> denir: bir partide el sıkışmaların toplamı hep çifttir. Küçük bir sonuç büyük iş görür: tek dereceli düğümlerin sayısı hiçbir çizgede tek olamaz. Sayfadaki Yıldız örneğinde merkez 6, uçlar 1 derecelidir; toplam 12, kenar sayısı 6.",
      formula: "Σ der(v) = 2·|E|",
      formulaNote: "|E| kenar sayısı. Her kenar iki ucuyla iki kez sayıldığı için toplam hep çifttir; tek dereceli düğüm sayısı da öyle.",
    },
    {
      heading: "Euler'in kuralı: yol mu, devre mi, hiçbiri mi?",
      body:
        "Bağlantılı bir çizgede her kenardan tam bir kez geçen bir gezinti arıyorsan yalnızca dereceleri saymak yeter. Tek dereceli düğüm hiç yoksa başladığın yere dönen bir <strong>Euler devresi</strong> vardır. Tam iki tane varsa birinden başlayıp ötekinde biten bir <strong>Euler yolu</strong> vardır. Dörtten fazla değil, dört bile fazladır: dört ya da daha çok tek dereceli düğüm varsa hiçbir gezinti bütün kenarları tek seferde tüketemez. Sayfadaki Euler düğmesi tam bu üç durumu ayırt eder; önce çizgenin bağlantılı olup olmadığına bakar, sonra tek dereceli düğümleri listeler.",
      formula: "tek dereceli düğüm sayısı ∈ {0, 2} ⇔ Euler gezintisi var",
      formulaNote: "Çizge bağlantılıysa geçerlidir. 0 için devre (kapalı), 2 için yol (açık). Gerekliliği Euler (1736), yeterliliği Hierholzer (1873) gösterdi.",
    },
    {
      heading: "BFS ve DFS: kuyruk mu, yığın mı?",
      body:
        "Bir çizgeyi baştan sona gezmenin iki temel yolu vardır. <strong>Genişlik öncelikli arama</strong> (BFS) başlangıcın tüm komşularını, sonra komşuların komşularını ziyaret eder; halka halka yayılır ve kenarları eşit sayan çizgelerde en az kenarlı yolları bulur. <strong>Derinlik öncelikli arama</strong> (DFS) bir koldan gidebildiği kadar derine iner, tıkanınca geri döner; labirent çözmenin yoludur. Sayfanın kodunda iki algoritma arasındaki tek fark, bekleyen düğümlerin listeden hangi uçtan alındığıdır: BFS önden alır (<em>kuyruk</em>: ilk giren ilk çıkar), DFS arkadan alır (<em>yığın</em>: son giren ilk çıkar). Mor halkalar ziyaret sırasını, mor kenarlar her düğümün hangi düğümden keşfedildiğini gösterir.",
      formula: "BFS: kuyruk (FIFO) · DFS: yığın (LIFO)",
      formulaNote: "Her iki arama da bağlantılı n düğümlü bir çizgede tam n − 1 keşif kenarı üretir; bu kenarlar bir arama ağacı oluşturur.",
    },
    {
      heading: "Dijkstra: tahminleri gevşetmek",
      body:
        "Kenarların ağırlığı (mesafe, süre, maliyet) farklıysa en az kenarlı yol en ucuz yol olmayabilir. Dijkstra'nın yöntemi her düğüme bir <strong>tahmini uzaklık</strong> yazar: başlangıca 0, geri kalanına sonsuz. Sonra tekrar tekrar, kesinleşmemiş düğümler arasında tahmini en küçük olanı seçer, onu kesinleştirir ve komşularına 'benim üzerimden gelsen daha mı kısa olur?' diye sorar; kısa oluyorsa komşunun tahminini küçültür. Bu güncellemeye <em>gevşetme</em> denir. Hedef kesinleştiğinde durur; en kısa yol, her düğümün 'kimden geldim' notunu geriye doğru izleyerek çıkar. Sayfadaki En Kısa Yol satırı tam bu algoritmayı çalıştırır ve toplam ağırlığı okur.",
      formula: "d(v) ← min( d(v), d(u) + w(u,v) )",
      formulaNote: "u yeni kesinleşen düğüm, w(u,v) kenar ağırlığı. Negatif ağırlık yoksa kesinleşen tahmin bir daha küçülmez; yöntemin doğruluğu buna dayanır.",
    },
    {
      heading: "Ağaç: en az kenarla bağlı kalmak",
      body:
        "Döngüsü olmayan bağlantılı çizgeye <strong>ağaç</strong> denir. n düğümlü bir ağaçta tam n − 1 kenar vardır: bir kenar eksilse çizge kopar, bir kenar fazla olsa döngü oluşur. Sayfadaki Yıldız bir ağaçtır: 7 düğüm, 6 kenar. Ev Çizgesi değildir: 5 düğüm, 6 kenar, yani iki döngü. BFS ya da DFS çalıştırdığında mora boyanan kenarlar her zaman bir ağaçtır, çünkü her düğüm tek bir ebeveynden keşfedilir. Bir çizgenin bütün düğümlerini kapsayan böyle ağaçlara <em>kapsayan ağaç</em> denir; elektrik şebekesinde, bilgisayar ağlarında ve aile soyağacında aynı yapı karşına çıkar.",
      formula: "ağaç: bağlantılı + döngüsüz ⇒ |E| = |V| − 1",
      formulaNote: "|V| düğüm sayısı. Ev Çizgesi'nde 6 − (5 − 1) = 2 fazla kenar vardır; bu, bağımsız döngü sayısıdır.",
    },
  ],
  lab: {
    intro:
      "Tuvale tıklayarak düğüm eklersin; <strong>Kenar Ekle</strong> modunda iki düğüme sırayla tıklayınca aralarına ağırlığı 1 olan bir kenar çizilir (ağırlıklar yalnızca örnek çizgelerde farklıdır). <strong>Sil</strong> modu düğüm ya da kenar siler. Algoritma menüsü BFS/DFS seçer, <strong>Çalıştır</strong> hep 0 numaralı düğümden başlar. <strong>Euler</strong> düğmesi dereceleri sayar; <strong>En Kısa Yol</strong> satırındaki Başlangıç ve Hedef kutuları Dijkstra'yı besler. Sonuçlar üstteki okuma satırında yazar. Düğümleri sürükleyebilirsin; sürüklemek bağlantıları değiştirmez.",
    experiments: [
      {
        title: "Königsberg'i Euler gibi say",
        predict:
          "Königsberg düğmesine basmadan önce düşün: dört düğüm, yedi köprü. Gerçek şehirde dört bölgenin de derecesi tekti ve yürüyüş yoktu. Sayfanın okuma satırı 'Euler yolu yok' mu diyecek, 'var' mı?",
        do:
          "Königsberg örneğini yükle ve Euler düğmesine bas. Sonra Sil moduna geç, 0 ile 1 arasındaki çizgiye bir kez tıkla, yeniden Euler'e bas. Aynı çizgiye bir kez daha tıkla ve son kez Euler'e bas.",
        observe:
          "İlk okuma şaşırtır: 'Euler Yolu var! Tek dereceli düğümler: 2, 3'. Çünkü sayfadaki örnek gerçek haritanın kopyası değildir: 0 ile 1 arasında iki köprü üst üste çizilidir (yedi kenar altı gibi görünür) ve dereceler 4, 4, 3, 3'tür; gerçek şehirde 5, 3, 3, 3 idi. İlk tıklamada çizgi ekranda kalır ama kenarlardan biri silinir: 'Euler yolu yok. 4 düğümün derecesi tek (0, 1, 2, 3)'. İkinci tıklamada çizgi kaybolur, dereceler 2, 2, 3, 3 olur ve yol yeniden vardır.",
        explain:
          "Her girişin bir çıkışı olmalı; başlangıç ve bitiş dışındaki her düğümün derecesi çift kalmalı. Tek dereceli düğüm sayısı 0 ya da 2 ise gezinti var, 4 ise yok. Üst üste çizilen iki köprü ekranda tek çizgi görünse de derece sayımına ikişer katkı yapar: çizgenin nasıl göründüğü değil, nasıl bağlandığı önemlidir. Euler'in asıl Königsberg'ini bu sayfada kuramazsın, çünkü Kenar Ekle aynı çifte ikinci kenarı reddeder; dereceleri sayarak yine de aynı sonuca ulaşırsın.",
      },
      {
        title: "Kuyruk mu, yığın mı: Ev Çizgesi'nde BFS ile DFS",
        predict:
          "Ev Çizgesi'nde arama 0'dan başlar; 0'ın komşuları 1 ve 4'tür. BFS '0 → 1 → 4 → …' diye gidecek. DFS ikinci sırada hangi düğümü ziyaret eder, 1'i mi 4'ü mü? Kaç kenar mora boyanır?",
        do:
          "Ev Çizgesi'ni yükle. Algoritma menüsünde 'BFS (Genişlik Öncelikli)' seç, Çalıştır'a bas; mor halkaların belirme sırasını ve mor kenarları say. Sonra 'DFS (Derinlik Öncelikli)' seçip yeniden Çalıştır.",
        observe:
          "BFS: 'Ziyaret sırası: 0 → 1 → 4 → 2 → 3'. DFS: '0 → 4 → 2 → 3 → 1'. Her iki aramada da altı kenardan tam dördü mora boyanır (5 düğüm − 1), ama hangi dördü olduğu değişir: BFS'de 0–1, 0–4, 1–2, 4–3; DFS'de 0–1, 0–4, 4–3, 4–2. Halkalar yaklaşık üçte bir saniye arayla belirir.",
        explain:
          "0'dan sonra 1 ve 4 bu sırayla bekleme listesine konur. BFS listeyi önden okur ve 1'i alır; DFS arkadan okur ve 4'ü alır, sonra 4'ün komşularına dalar. Mor kenarlar arama ağacıdır: her düğüm tek bir ebeveynden keşfedildiği için düğüm sayısının bir eksiği kadar kenar olur. Ev Çizgesi'nin iki döngüsünü kapatan 2–3 ve 4–0 benzeri kenarlar ağaç dışında kalır.",
      },
      {
        title: "En ucuz ilk adım en kısa yolu vermez",
        predict:
          "Ağırlıklı örnekte 0'dan 4'e gideceksin. 0'dan çıkan en ucuz kenar 7 (0–1). 'Hep en ucuz kenarı seç' stratejisi seni 0 → 1 → 2 → 4'e götürür: 7 + 10 + 8 = 25. İki kenarlık 0 → 5 → 4 ise 14 + 15 = 29. Dijkstra hangisini, kaç birimle bulacak?",
        do:
          "Ağırlıklı örneği yükle. En Kısa Yol satırında Başlangıç 0, Hedef 4 yaz ve Dijkstra düğmesine bas. Sonra Hedef'i 3 yapıp bir kez daha bas. Son olarak Başlangıç 3, Hedef 5 dene.",
        observe:
          "'0 → 5 → 2 → 4 · Toplam ağırlık: 24.0': ilk adımı en pahalı (14) olan yol kazanır, çünkü 5–2 kenarı yalnızca 2'dir. Hedef 3 için '0 → 5 → 2 → 3 · 27.0'; 0 → 1 → 2 → 3 yolu 28 ile ikinci kalır. 3'ten 5'e ise '3 → 2 → 5 · 13.0'; iki kenarlık 3 → 4 → 5 yolu 21 eder.",
        explain:
          "Dijkstra açgözlüdür ama kenar bazında değil, toplam uzaklık bazında: her adımda başlangıca tahmini uzaklığı en küçük düğümü kesinleştirir ve komşularının tahminlerini gevşetir. Pahalı bir ilk adım, arkasından gelen ucuz kenarla kendini kurtarabilir. Çözümlü örnekte 0 → 4 için bu izi adım adım sürüyoruz.",
      },
      {
        title: "Kendi çizgeni kur: dört düğümlü tam çizge",
        predict:
          "Dört düğümün her çifti birbirine bağlıysa 6 kenar olur ve her düğümün derecesi 3'tür. Euler ne diyecek? Tek bir kenar silersen cevap değişir mi, kaç düğümün derecesi tek kalır?",
        do:
          "Temizle'ye bas. Düğüm Ekle modunda üç düğümü geniş bir üçgen gibi yerleştir (0, 1, 2), dördüncüyü (3) üçgenin ortasına koy; böylece hiçbir kenar kesişmez. Kenar Ekle moduna geç ve altı çifti sırayla bağla; her kenarın ağırlığı otomatik 1 olur. Euler'e bas. Sonra Sil modunda 0–3 kenarının ortasına tıkla, yeniden Euler. En son Başlangıç 0, Hedef 3 ile Dijkstra.",
        observe:
          "Önce 'Euler yolu yok. 4 düğümün derecesi tek (0, 1, 2, 3)'. Kenarı silince 'Euler Yolu var! Tek dereceli düğümler: 0, 3'. Dijkstra: '0 → 1 → 3 · Toplam ağırlık: 2.0'. 0 → 2 → 3 de aynı uzunluktadır; sayfa eşitlikte küçük numaralı düğümü önce kesinleştirdiği için 1 üzerinden gider.",
        explain:
          "El sıkışma kuralı: derecelerin toplamı kenar sayısının iki katıdır (tam çizgede 12 = 2 · 6), bu yüzden tek dereceli düğüm sayısı hep çifttir ve tek bir kenar silmek 4'ü 2'ye indirir. Bütün ağırlıklar 1 olduğunda Dijkstra en az kenarlı yolu bulur; yani BFS'nin yaptığı işi yapar. Ağırlıklı örnekte ikisinin ayrıştığını az önce gördün. Dördüncü düğümü ortaya koyunca kenarların kesişmemesi de bir teoremdir: dört düğümlü tam çizge düzlemseldir, beş düğümlüsü değildir.",
      },
    ],
  },
  wow: [
    {
      title: "Bir kafe terasında, kâğıtsız kalemsiz, yirmi dakika",
      body:
        "Edsger Dijkstra, 1956'da Amsterdam'da nişanlısıyla kahve içerken en kısa yol algoritmasını kafasında tasarladığını, yaklaşık yirmi dakika sürdüğünü ve kâğıt kalem kullanmadığını anlatır; sadeliğinin sırrının bu olduğunu söyler. Amaç yeni ARMAC bilgisayarını halka 64 Hollanda şehrinden oluşan bir haritada göstermekti. Yöntem 1959'da üç sayfalık bir not olarak yayımlandı. Bugün telefonundaki her rota hesabı o yirmi dakikanın torunudur.",
    },
    {
      title: "Bilgisayarın ispatladığı ilk büyük teorem",
      body:
        "1852'de Francis Guthrie bir İngiltere haritasını boyarken fark etti: komşu bölgeler farklı renkte olacak şekilde dört renk hep yetiyor gibiydi. Harita bir çizgedir; bölgeler düğüm, sınırlar kenar. İspat 124 yıl sonra, 1976'da geldi: Kenneth Appel ve Wolfgang Haken 1936 özel durumu bilgisayara denetletti, hesap bin saatten uzun sürdü. Bazı matematikçiler 'insanın okuyamadığı ispat ispat mıdır' diye tartıştı. 2005'te Georges Gonthier ispatın her adımını Coq adlı ispat denetleyicisiyle biçimsel olarak doğruladı.",
    },
    {
      title: "Königsberg'de bugün beş köprü var",
      body:
        "Yedi köprüden ikisi İkinci Dünya Savaşı bombardımanında yıkıldı, ikisi sonradan sökülüp yerlerine karayolu yapıldı; üçü ayakta ve biri 1935'te yeniden inşa edildi. Euler'in çizgesi bugün beş kenarlı: iki bölgenin derecesi 2, ikisinin 3. Yani bugünün Kaliningrad'ında Euler yolu artık mümkün; tek dereceli iki bölgenin birinden başlayıp ötekinde bitirmen gerekir. Sayfadaki örnekte 0–1 çizgisinden ikisini silip Euler'e basarak aynı durumu kurabilirsin.",
    },
  ],
  worked: {
    title: "Dijkstra'yı elle izlemek: Ağırlıklı örnekte 0'dan 4'e",
    prompt:
      "Ağırlıklı örnekteki kenarları dakika olarak düşün: 0–1: 7, 0–5: 14, 1–2: 10, 1–5: 9, 2–3: 11, 2–5: 2, 3–4: 6, 4–5: 15, 4–2: 8. 0'dan 4'e en kısa süreyi Dijkstra ile bul.",
    steps: [
      "Başlangıç: d(0) = 0 dk, diğer beş düğüm ∞. Kesinleşmemişler arasında en küçük tahmin 0'ındır; 0 kesinleşir. Komşuları gevşet: d(1) = 0 + 7 = 7, d(5) = 0 + 14 = 14.",
      "En küçük tahmin: 1 (7 dk). 1 kesinleşir. Komşular: d(2) = 7 + 10 = 17; 5 için 7 + 9 = 16, ama 14'ten büyük, değişmez.",
      "En küçük tahmin: 5 (14 dk). 5 kesinleşir. Komşular: 2 için 14 + 2 = 16 < 17, güncelle: d(2) = 16, 'önceki' = 5. 4 için d(4) = 14 + 15 = 29.",
      "En küçük tahmin: 2 (16 dk). 2 kesinleşir. Komşular: d(3) = 16 + 11 = 27; 4 için 16 + 8 = 24 < 29, güncelle: d(4) = 24, 'önceki' = 2.",
      "En küçük tahmin: 4 (24 dk) ve bu hedef; dur. 'Önceki' notlarını geriye izle: 4 ← 2 ← 5 ← 0. Sayfaya Başlangıç 0, Hedef 4 yazıp Dijkstra'ya basınca aynı satırı görürsün.",
    ],
    result:
      "En kısa yol 0 → 5 → 2 → 4, toplam 24 dakika. Üç kenarlık bu yol, iki kenarlık 0 → 5 → 4'ten (29 dk) ve en ucuz adımla başlayan 0 → 1 → 2 → 4'ten (25 dk) daha kısadır.",
  },
  misconceptions: [
    {
      myth: "Çizge, fonksiyon grafiği gibi bir şeydir.",
      truth:
        "İkisinin İngilizcesi aynı sözcük olsa da ortak yanları yoktur. Fonksiyon grafiğinde eksenler ve koordinatlar vardır; çizgede yalnızca düğümler ve aralarındaki bağlantılar. Tuvaldeki bir düğümü sürüklediğinde çizge değişmez; koordinatlar yalnızca çizim içindir.",
    },
    {
      myth: "Uzun çizilen kenar daha ağır, kısa çizilen daha hafiftir.",
      truth:
        "Ağırlık kenarın üstündeki sarı sayıdır, ekrandaki uzunluğu değil. Ağırlıklı örnekte 0–5 kenarını sürükleyip kısacık yap; Dijkstra yine 14 sayar. Metro haritaları da böyledir: çizimdeki mesafe gerçek mesafe değildir.",
    },
    {
      myth: "En kısa yol, en az kenardan geçen yoldur.",
      truth:
        "Yalnızca bütün kenarlar eşit ağırlıktaysa doğrudur; o zaman BFS ile Dijkstra aynı cevabı verir. Ağırlıklı örnekte 0'dan 4'e üç kenarlık yol (24), iki kenarlık yoldan (29) daha kısadır.",
    },
    {
      myth: "Bir çizgede tek dereceli düğüm sayısı herhangi bir sayı olabilir; üç tane de olur.",
      truth:
        "Olamaz. Derecelerin toplamı kenar sayısının iki katıdır, yani çifttir; çift sayıya ulaşmak için tek sayıların adedi çift olmalıdır. Sayfada ne yaparsan yap Euler düğmesi 1 ya da 3 tek dereceli düğüm raporlayamaz; dene.",
    },
  ],
  glossary: [
    { term: "Düğüm (tepe)", definition: "Çizgenin temel nesnesi; şehir, kişi, atom, web sayfası gibi herhangi bir şeyi temsil eden nokta." },
    { term: "Kenar", definition: "İki düğüm arasındaki bağlantı; yönsüz çizgede iki yönde de geçerlidir, sayfadaki tüm kenarlar yönsüzdür." },
    { term: "Derece", definition: "Bir düğüme bağlı kenarların sayısı; Euler yolu sorusunun tek anahtarı." },
    { term: "Yol ve devre", definition: "Ardışık kenarlardan oluşan gezinti yol, başladığı düğümde biten yol devredir; Euler yolu her kenarı tam bir kez kullanır." },
    { term: "Bağlantılı çizge", definition: "Her düğümden her düğüme en az bir yolun bulunduğu çizge; kopuk parçalar varsa Euler yolu ve Dijkstra yolu bulunamaz." },
    { term: "Ağaç", definition: "Döngüsü olmayan bağlantılı çizge; n düğümlü ağaçta tam n − 1 kenar vardır." },
    { term: "Ağırlıklı çizge", definition: "Her kenarına bir sayı (mesafe, süre, maliyet) atanmış çizge; en kısa yol bu sayıların toplamını en küçükler." },
    { term: "Gevşetme", definition: "Dijkstra'da bir düğümün tahmini uzaklığını, yeni kesinleşen komşu üzerinden daha kısa bir yol bulununca küçültme adımı." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Üniversitede çizge teorisi iki kapıdan girer. Ayrık matematik dersinde kendisi bir ispat alanıdır: el sıkışma kuralı gibi sayma argümanları, düzlemsel çizgeler için Euler'in V − E + F = 2 formülü, dört renk teoremi ve eşleştirme problemleri. Algoritma dersinde ise bir araç kutusudur: BFS ve DFS doğrusal zamanda çalışır; Dijkstra, sayfadaki gibi her adımda bütün düğümleri tarayan hâliyle n² adım alır, ikili yığın denen bir veri yapısıyla (V + E)·log V'ye iner. Kenar sayısı milyonlara ulaşan yol ağlarında bu fark, saniyeler ile saatler arasındaki farktır. <strong>Lineer cebir</strong> de buraya bağlanır: bir çizgeyi komşuluk matrisi olarak yazarsan PageRank bu matrisin bir özvektörüne dönüşür.",
      "Sonra sınırlar başlar. Her kenardan bir kez geçmek (Euler) derece saymakla çözülürken her düğümden bir kez geçmek (Hamilton yolu, 1857'de Hamilton'ın ikosyan oyunundan) bilinen hiçbir hızlı yöntemle çözülemez; gezgin satıcı problemi bu zorluğun simgesidir ve <strong>NP-zorluk</strong> kavramının kalbindedir. Öte yanda ağ bilimi vardır: Stanley Milgram'ın 1967'deki mektup deneyi, tanıdık zincirlerinin ortalama altı el değiştirmede hedefe ulaştığını öne sürdü; Watts ve Strogatz 1998'de 'küçük dünya' ağlarını, Barabási ve Albert 1999'da az sayıda devasa dereceli 'göbek' düğümlü ölçeksiz ağları modelledi. Beyin, besin ağı, elektrik şebekesi, salgın: hepsi aynı tuvalde düğüm ve kenardır.",
    ],
    topics: ["Ayrık matematik ve ispat", "Düzlemsel çizgeler ve Euler formülü", "Algoritma karmaşıklığı ve öncelik kuyruğu", "Hamilton yolu ve NP-zorluk", "Komşuluk matrisi ve PageRank", "Ağ bilimi: küçük dünya ve ölçeksiz ağlar", "Eşleştirme ve akış problemleri"],
  },
  quiz: [
    {
      question: "Bir çizgede tam üç düğümün derecesi tek olabilir mi?",
      options: ["Evet, dereceler her türlü dağılabilir", "Hayır; tek dereceli düğüm sayısı daima çifttir", "Yalnızca çizge bağlantılı değilse olabilir", "Yalnızca ağırlıklı çizgelerde olabilir"],
      answer: 1,
      explanation: "Derecelerin toplamı kenar sayısının iki katı, yani çifttir. Üç tek sayının toplamı tektir; bu yüzden tek dereceli düğümler hep çift adettedir. Euler'in 'en fazla iki tek dereceli düğüm' kuralı bu yüzden 0 ya da 2 der, 1 demez.",
    },
    {
      question: "Sayfadaki BFS ile DFS'nin kodundaki tek fark nedir?",
      options: ["BFS 0'dan, DFS son düğümden başlar", "BFS kenar ağırlıklarını kullanır, DFS kullanmaz", "Bekleyen düğümler BFS'de listenin önünden, DFS'de arkasından alınır", "DFS yalnızca ağaçlarda çalışır"],
      answer: 2,
      explanation: "İkisi de 0'dan başlar ve ağırlığa bakmaz. BFS bekleme listesini kuyruk gibi (ilk giren ilk çıkar), DFS yığın gibi (son giren ilk çıkar) kullanır. Ev Çizgesi'nde bu tek satırlık fark 0 → 1 → 4 → 2 → 3 ile 0 → 4 → 2 → 3 → 1 arasındaki farkı yaratır.",
    },
    {
      question: "Üçgen örneğinde (0–1: 3, 1–2: 4, 2–0: 5) Başlangıç 0, Hedef 2 için Dijkstra ne bulur?",
      options: ["0 → 1 → 2, toplam 7", "0 → 2, toplam 5", "0 → 1 → 2, toplam 5", "Yol bulunamaz"],
      answer: 1,
      explanation: "Doğrudan kenar 5, dolambaçlı yol 3 + 4 = 7. Dijkstra toplam ağırlığı en küçük olanı seçer: 0 → 2, 5.0. Pisagor üçlüsü 3-4-5 burada yalnızca etiket; kenar uzunlukları geometrik değil, sayısaldır.",
    },
  ],
  next: [
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma Algoritmaları", why: "Aynı Dijkstra'yı bir ızgara üzerinde, engellerle ve A* gibi hızlandırmalarla izle." },
    { href: "veri-yapilari.html", title: "Veri Yapıları", why: "BFS'yi BFS yapan kuyruk, DFS'yi DFS yapan yığın: bu yapıların kendisi." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı", why: "n² adımlık Dijkstra ile log'lu Dijkstra arasındaki fark neden milyon düğümde hayati?" },
    { href: "besin-agi.html", title: "Besin Ağı", why: "Kim kimi yiyor: ekosistem de düğüm ve kenarlardan kurulu yönlü bir çizgedir." },
  ],
  sources: [
    { title: "Wikipedia · Seven Bridges of Königsberg", url: "https://en.wikipedia.org/wiki/Seven_Bridges_of_K%C3%B6nigsberg", note: "Euler'in 1736 makalesi, argümanın özeti ve köprülerin bugünkü durumu (İngilizce)." },
    { title: "Wikipedia · Dijkstra's algorithm", url: "https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm", note: "Algoritmanın tarihçesi, 1956 kafe anekdotu, sözde kod ve karmaşıklık analizi (İngilizce)." },
    { title: "Wolfram MathWorld · Graph Theory", url: "https://mathworld.wolfram.com/GraphTheory.html", note: "Terimlerin kesin tanımları ve alanın alt başlıklarına açılan kısa ansiklopedi girişi." },
    { title: "Khan Academy · Algorithms (BFS ve çizge gösterimi)", url: "https://www.khanacademy.org/computing/computer-science/algorithms", note: "Genişlik öncelikli arama ve çizgelerin komşuluk listesi/matrisi ile temsili; alıştırmalı (İngilizce)." },
  ],
  revision: "Ekim 2026",
};
