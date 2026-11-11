window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["algoritmalar"] = {
  slug: "algoritmalar",
  title: "Algoritmalar: Adımları Sayma Sanatı",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Aynı 32 sayıyı bir yöntem 496, bir başkası 123 karşılaştırmayla sıralar. Bu laboratuvar saniye ölçmez, işlem sayar ve her sayacın yanına kuramın o girdi için söylediği değeri koyar.",
  hook:
    "1959'da Moskova'da 25 yaşındaki bir İngiliz öğrenci, makine çevirisi için sözcükleri hızla sıralamak zorundaydı. Bulduğu numara altmış küsur yıl sonra hâlâ pek çok dilin hazır sıralama işlevinin çekirdeğinde duruyor. Peki aynı 32 sayıyı sıralamak neden bir yöntemle 496, ötekiyle 123 karşılaştırma ister; ve bir milyar sayı içinde aranan 30 bakışta nasıl bulunur?",
  bigIdea:
    "Bir algoritmanın kalitesi tek bir girdideki hızı değil, girdi büyüdükçe <strong>işlem sayısının nasıl büyüdüğüdür</strong>: log n, n, n log n, n² ve 2ⁿ arasındaki fark, bilgisayarın hızından çok daha önemlidir.",
  story: [
    "Algoritma bilgisayardan çok daha yaşlıdır. MÖ 300 civarında Öklid, <em>Elementler</em>'in VII. kitabında iki sayının en büyük ortak bölenini bulan bir yöntem yazdı: büyüğü küçüğe böl, kalanla devam et, kalan sıfır olunca dur. Yöntemin genişletilmiş hâli bugün de iş başındadır: RSA şifrelemesinde gizli anahtar onunla hesaplanır. Sözcüğün kendisi ise 9. yüzyıl Bağdat'ından gelir: matematikçi Muhammed bin Musa el-Harezmî (yaklaşık 780–850), Hint rakamlarıyla hesap yapmayı anlatan bir kitap yazdı. Kitabın Arapça aslı kayıp; elimizdeki 12. yüzyıl Latince çevirisi <em>Dixit Algorizmi</em>, yani 'Harezmî dedi ki' sözleriyle açılır. Çevirmenler yazarın adını Latinceye böyle uydurmuştu. Adım adım hesap yöntemlerine o günden beri <strong>algoritma</strong> deniyor. Aynı yazarın başka bir kitabının adındaki 'el-cebr' sözcüğü de cebir oldu.",
    "1843'te Ada Lovelace, Charles Babbage'ın hiç inşa edilemeyen Analitik Makinesi için Bernoulli sayılarını hesaplayan bir adım dizisi yayımladı; bu notlar sık sık bir makine için yayımlanmış ilk program diye anılır. Program hiç çalışmadı, çünkü makine yoktu. 1936'da Alan Turing, 'mekanik bir yöntem' sözünün tam olarak ne demek olduğunu matematiksel biçimde tanımladı ve şaşırtıcı bir şey kanıtladı: bazı soruların hiçbir algoritmayla çözülemeyeceğini. Algoritma kavramı o gün bir tarif olmaktan çıkıp bir bilim nesnesi oldu.",
    "Bilgisayarlar gelince sıralama ilk büyük problem oldu. 1945'te John von Neumann, henüz yapılmamış EDVAC bilgisayarı için bir birleştirmeli sıralama programı yazdı; Donald Knuth'a göre bu, kayıtlı programlı bir bilgisayar için yazılan ilk programlardan biridir. 1956'da Edsger Dijkstra, Amsterdam'da bir kafede, kendi anlatımına göre kâğıt kalem kullanmadan yirmi dakikada en kısa yol algoritmasını tasarladı. 1959'da Tony Hoare, Moskova Devlet Üniversitesi'nde misafir öğrenciyken bir makine çevirisi projesi için sözcükleri sıralamanın hızlı bir yolunu ararken <strong>Quicksort</strong>'u buldu; 1961'de yayımladı. 1968'de Knuth'un <em>The Art of Computer Programming</em> dizisinin ilk cildi çıktı ve algoritmaların adımlarını saymayı başlı başına bir bilim hâline getirdi.",
    "Bugün bir harita uygulaması rota çizerken, bir arama motoru sonuç sıralarken, bir oyun karakteri yol bulurken bu sayfadaki fikirlerin büyütülmüş sürümleri çalışır. Ölçek inanılmazdır: bir milyon kaydı kabarcık sıralamasıyla sıralamak yaklaşık 5×10¹¹ karşılaştırma ister, birleştirmeli sıralamayla yaklaşık 2×10⁷; aradaki fark 25 000 kat. Bu farkı donanımla kapatamazsın; ancak daha iyi bir fikirle kapatırsın.",
  ],
  core: [
    {
      heading: "Saniye değil, işlem say",
      body:
        "Süre makineye, tarayıcıya ve o anki yüke bağlıdır; iki anahtarın kaç kez karşılaştırıldığı ise yalnız yönteme ve girdiye. Sayfa bu yüzden kronometre tutmaz, sayaç tutar. Seçmeli sıralama her turda kalanların en küçüğünü arar: 31 + 30 + … + 1, yani n = 32 için girdi ne olursa olsun tam 496 karşılaştırma. n'yi iki katına çıkarırsan bu sayı yaklaşık dört katına çıkar; <strong>O(n²)</strong> bunu söyler. Birleştirmeli sıralama diziyi ikiye böle böle log₂ n katman kurar ve toplam m elemanlı iki yarıyı en çok m − 1 karşılaştırmayla birleştirir: T(n) = 2T(n/2) + (n − 1). Aynı 32 eleman için en kötü durumu 129, en iyisi 80'dir; <strong>O(n log n)</strong>. Daha da azı mümkün mü? Her karşılaştırma evet ya da hayır der; 32 farklı anahtarın 32! dizilişini birbirinden ayırmak için en kötü durumda en az ⌈log₂ 32!⌉ = 118 soru gerekir. Birleştirmeli sıralamanın en kötüsü bu sınırın yalnız 11 üstündedir. Sınır en kötü diziliş içindir: kolay bir girdide ölçülen sayı onun altında kalabilir.",
      formula: "n(n − 1)/2 = 496 · n log₂ n − n + 1 = 129 · ⌈log₂ n!⌉ = 118  (n = 32)",
      formulaNote: "O-gösterimi sabitleri ve küçük terimleri atar; iki yöntemin büyüme biçimini karşılaştırır, saniyesini vermez. Sayfanın saydığı şey de süre değil, anahtar karşılaştırması ve ana diziye yazmadır.",
    },
    {
      heading: "Ters çift: düzensizliğin sayısı",
      body:
        "Solda duran büyük, sağda duran küçük iki eleman bir <strong>ters çift</strong> oluşturur. Sıralı dizide hiç ters çift yoktur; ters sıralı dizide her çift terstir, n(n − 1)/2 tane. Sayfa bu sayıyı I diye gösterir. Eklemeli sıralamanın her kaydırması tam bir ters çifti giderir, bu yüzden kaydırma sayısı I'dır. İkinci elemandan başlayarak her eleman, yerini bulduğunu anlamak için bir karşılaştırma daha yapar; yalnız dizinin en başına kadar giden eleman bu son soruyu sormaz. Böylece karşılaştırma sayısı I + (n − 1) − L olur; L, kendinden öncekilerin hepsinden küçük olan eleman sayısıdır. Varsayılan dizide I = 311 ve L = 4: 311 + 31 − 4 = 338, sayfadaki sayacın gösterdiği değer. Rastgele bir dizilişte her çift yarı olasılıkla terstir; beklenen I = n(n − 1)/4, yani 32 eleman için 248. Kabarcık sıralaması da yalnız komşuları takas ettiğinden tam I takas yapar; sayfa takası iki yazma saydığı için Yazma sütununda 2·I = 622 görürsün.",
      formula: "Eklemeli: karşılaştırma = I + (n − 1) − L · yazma = I + (n − 1)",
      formulaNote: "Sıralı girdide I = 0 ve L = 0: yalnız n − 1 karşılaştırma. Ters sıralı girdide I = n(n − 1)/2 ve L = n − 1: karşılaştırma yine n(n − 1)/2. Eklemeli sıralamanın hızı, dizinin ne kadar düzensiz olduğuna bağlıdır.",
    },
    {
      heading: "Yarıya bölmenin gücü: logaritma",
      body:
        "Sıralı bir dizide ortadaki göze bakarsın; aradığın ondan küçükse sol yarı, büyükse sağ yarı kalır. Her yoklama aralığı yarıya indirir, bu yüzden n elemanda en kötü durum ⌈log₂(n + 1)⌉ yoklamadır: 31 eleman için 5, bir milyon için 20, bir milyar için 30. Doğrusal arama ise en kötü durumda her göze bakar. Ortalama da hesaplanabilir. 31 elemanlı dizide ikili aramanın yolu dolu bir ağaçtır: 1 hedef ilk yoklamada, 2 hedef ikincide, 4'ü üçüncüde, 8'i dördüncüde, 16'sı beşincide bulunur. Toplam (1·1 + 2·2 + 4·3 + 8·4 + 16·5) = 129 yoklama, ortalama 129/31 ≈ 4,161; sayfanın Ortalama sütunu tam bunu ölçer. Hedeflerin yarısından fazlası en derin düzeyde durduğu için ortalama, en kötü durumun yalnız bir yoklama altındadır. Tek şart dizinin sıralı olmasıdır.",
      formula: "en kötü = ⌈log₂(n + 1)⌉ · ortalama (var) = [(n + 1)(h + 1) − 2·2<sup>h</sup> + 1]/n,  h = ⌊log₂ n⌋",
      formulaNote: "n = 31 için h = 4: (32·5 − 32 + 1)/31 = 129/31. Doğrusal aramada ortalama (n + 1)/2 = 16, en kötü n = 31.",
    },
    {
      heading: "Özyineleme ve aynı işi yeniden yapmak",
      body:
        "Fibonacci'nin tanımı kendini çağırır: F(n) = F(n − 1) + F(n − 2). Bunu olduğu gibi koda dökersen aynı alt problem defalarca, her seferinde sıfırdan çözülür. Çağrı sayısı C(n) = C(n − 1) + C(n − 2) + 1 kuralıyla büyür; C(0) = C(1) = 1 ile başlayınca kapalı biçimi C(n) = 2·F(n + 1) − 1 çıkar. Sayfa naif sürümü gerçekten çalıştırır: n = 32 için 7 049 155 çağrı. Her sonucu ilk hesapta bir tabloya yazıp ikinci kez sorulduğunda tablodan okuyan <strong>bellekli</strong> sürüm aynı sayıyı 63 çağrıyla, aşağıdan yukarı bir döngü 31 toplamayla bulur. Ardışık çağrı sayılarının oranı 2'ye değil altın orana, φ ≈ 1,618'e yaklaşır; büyüme 2ⁿ değil φⁿ hızındadır. <strong>Dinamik programlama</strong> bu fikrin genelidir: en uzun ortak alt dizi probleminde m ve n harfli iki sözcük için m·n gözlü bir tablo doldurmak yeter, oysa naif özyineleme ortak harf azaldıkça patlar.",
      formula: "C(n) = 2·F(n + 1) − 1 · F(n) ≈ φⁿ/√5 · bellekli: 2n − 1 çağrı (n ≥ 2)",
      formulaNote: "C(32) = 2·3 524 578 − 1 = 7 049 155. Sayfada tablodan okuma da bir çağrı sayılır; 2n − 1 buradan gelir.",
    },
    {
      heading: "Kuyruk, yığın, en ucuz önce",
      body:
        "Bir çizgeyi gezerken sıradaki düğümü nereden aldığın her şeyi belirler. <strong>BFS</strong> bir kuyruk kullanır: ilk giren ilk çıkar, çizge katman katman taranır ve bir düğüme ilk varış en az kenarlı yoldur. <strong>DFS</strong> bir yığın kullanır: son giren ilk çıkar, bir dalın dibine kadar inilir; bulunan şey bir yoldur, en kısası olması gerekmez. Kenarların ağırlığı varsa az kenarlı yol pahalı olabilir. <strong>Dijkstra</strong> bu yüzden her adımda uzaklığı en küçük olan, henüz kesinleşmemiş düğümü seçer ve onu bir daha güncellemez. Bu kararın dayanağı tek bir varsayımdır: ağırlıklar negatif değilse, daha uzaktaki bir düğümden geçen hiçbir yol kesinleşmiş uzaklığı düşüremez. Tek bir negatif kenar bu güvenceyi bozar. Sayfanın referansı olan <strong>Bellman–Ford</strong> hiçbir düğümü erken kesinleştirmez: bütün kenarları n − 1 tur boyunca yeniden dener, negatif kenarda da doğru kalır, negatif çevrimi de yakalar. Bedeli daha çok iştir.",
      formula: "Gevşetme: d[v] ← min(d[v], d[u] + w(u, v))",
      formulaNote: "Dijkstra her düğümü bir kez kesinleştirir ve ondan çıkan kenarlara yalnız o anda bakar; Bellman–Ford bütün kenarları en çok n − 1 tur boyunca yeniden dener, yani O(düğüm × kenar) iş yapar. n. turda hâlâ kısalan bir kenar varsa çizgede negatif çevrim vardır ve en kısa yol tanımsızdır.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var ve hiçbiri süre ölçmez: sayılan şey karşılaştırma, yazma, yoklama, incelenen kenar ve işlev çağrısıdır. Her sayacın yanında kuramın o girdi için verdiği değer durur. Tek sayı yazıyorsa kuram kesindir ve fark 0 olmalıdır; iki sayı arasında “…” varsa yalnız bir aralık, “≤” varsa yalnız bir üst sınır bilinir. <strong>01 · Sıralama</strong> sekmesinde <strong>Sıralama yöntemi</strong> (altı yöntem), <strong>Eleman sayısı n</strong> (4–64), <strong>Girdi türü</strong>, <strong>Tohum</strong> ve <strong>Pivot kuralı</strong> seçilir; <strong>Başlat</strong>, <strong>Tek adım</strong>, <strong>Sona git</strong> ve <strong>Adım konumu</strong> önceden bitirilmiş koşunun kaydını oynatır, tablo ise her zaman koşunun tamamını gösterir. <strong>02 · Arama</strong> aynı sıralı dizide doğrusal, ikili ve ara değerlemeli aramayı yan yana koyar. <strong>03 · Çizgeler</strong> dört hazır çizgede BFS, DFS ve Dijkstra'yı çalıştırır; bulunan yolu Bellman–Ford referansıyla karşılaştırır, seçtiğin kenarın ağırlığını −9 ile 20 arasında değiştirmene izin verir. <strong>04 · Büyüme ve dinamik programlama</strong> log-log grafikten eğim okur, Fibonacci çağrılarını ve en uzun ortak alt dizi tablosunu gösterir. Bütün rastgelelik tohumludur: aynı tohum her zaman aynı diziyi, dolayısıyla aşağıdaki sayıların aynısını verir. Sınırları da bil: sıralama canlandırması en çok 64 elemanla, büyüme ölçümü her n için tek bir rastgele diziyle yapılır; “200 koşu ortalaması” bir örneklem ortalamasıdır ve beklenen değerden yüzde bir dolayında sapabilir.",
    experiments: [
      {
        title: "Hızlı sıralamayı en iyi günündeki diziyle çökert",
        predict:
          "Hızlı sıralamaya zaten sıralı 32 eleman verirsen işi kolaylaşır mı, zorlaşır mı? Pivotu parçanın sonundan değil ortasından seçmek ne kadar fark eder? Aynı sıralı diziyi eklemeli sıralamaya verirsen?",
        do:
          "01 · Sıralama sekmesinde <strong>Hızlının en kötüsü</strong> düğmesine bas (hızlı sıralama, sıralı girdi, parçanın son elemanı pivot, n = 32) ve tablodaki Karşılaştırma satırını oku. Pivot kuralını önce <strong>Parçanın ortadaki elemanı</strong>, sonra <strong>Rastgele eleman (tohumlu)</strong> yap. Ardından Sıralama yöntemini <strong>Eklemeli (insertion)</strong> seç; son olarak Girdi türünü <strong>Ters sıralı</strong> yap. Koşuyu izlemek istersen Başlat'a bas ya da Sona git ile bitir.",
        observe:
          "Son eleman pivot: Karşılaştırma 496, Kuram 496, Fark 0; Yazma 0. Durum satırı “n log n yerine n² davranışı” der. Ortadaki eleman: 103 | 103 | 0, yazma 64. Rastgele eleman: 147 karşılaştırma, kuram “103 … 496”, fark “sınır içinde”; 200 koşu ortalaması 139,73, beklenen 139,86 (−0,09 %). Eklemeli sıralama aynı sıralı diziyi 31 karşılaştırmayla geçer; durum satırı bunun 118'lik alt sınırın altında olduğunu, sınırın tek bir kolay girdiyi yasaklamadığını yazar. Ters sıralı girdide eklemeli sıralama 496 | 496 karşılaştırma, 527 | 527 yazma yapar.",
        explain:
          "Sıralı dizide parçanın son elemanı hep en büyüktür; her bölme yalnız pivotu ayırır, öbür yan boş kalır: 31 + 30 + … + 1 = 496. Ortadaki eleman sıralı dizide tam ortancadır; bölmeler dengelenir ve sayı olabilecek en küçük değere, 103'e iner. Rastgele pivot en kötü durumu yok etmez, çok düşük olasılıklı kılar: farklı anahtarlarda beklenen değer her girdi için 2(n + 1)Hₙ − 4n = 139,86'dır. Eklemeli sıralamada iş ters çift sayısına bağlıdır: sıralı dizide I = 0, ters sıralıda I = 496. “En kötü girdi” yönteme göre değişir; birinin en iyisi ötekinin en kötüsüdür.",
      },
      {
        title: "Üç arama, bir dizi: tahmin etmek ne zaman işe yarar?",
        predict:
          "31 elemanlı sıralı dizide 22. elemanı ararken doğrusal, ikili ve ara değerlemeli arama kaçar yoklama yapar? Hedef dizide yoksa hangisi en çok zarar görür? Değerleri gittikçe açılan 255 elemanlı bir dizide ara değerleme yine birinci olur mu?",
        do:
          "02 · Arama sekmesinde <strong>Aramayı sıfırla</strong>'ya bas (n = 31, Hedefin sırası k = 22) ve tabloyu oku. “Hedef dizide var mı?” menüsünü <strong>Yok: k. elemandan hemen sonraki boşluk</strong> yap. Sonra <strong>n = 255, çarpık</strong> düğmesine bas; üç şeritte renkli gözlere ve numaralı ilk sekiz yoklamaya bak.",
        observe:
          "Hedef 52: doğrusal 22, ikili 4, ara değerlemeli 1 yoklama. İkili aramanın ortalaması 4,161 | 4,161, en kötüsü 5 | 5; ara değerlemelinin ortalaması 1,613, en kötüsü 3. Hedef yokken (52,5): doğrusal 31, ikili 5 (ortalama 5 | 5), ara değerlemeli 1. Çarpık dizide hedef 29 173: doğrusal 128, ikili 1, ara değerlemeli 128 yoklama. Ara değerlemelinin ortalaması 67,89, en kötüsü 159; durum satırı bunun ikili aramanın 9,7 katı olduğunu yazar. İkili aramanın sayıları dağılımdan hiç etkilenmez: 7,031 ve 8.",
        explain:
          "İkili arama için 31 = 2⁵ − 1 elemanlı dizi dolu bir ağaçtır; 32 boşluğun hepsine beşinci yoklamada varılır, “yok” ortalaması bu yüzden tam 5'tir. Ara değerleme, hedefin yerini iki uç değer arasındaki oranından kestirir. Ünlü log₂ log₂ n ortalaması yalnız anahtarlar düzgün dağılımdan geliyorsa geçerlidir. Çarpık dizide değerler 2'den 47 298 711'e üstel açılır: 29 173 bu aralığın binde birinden küçüktür, kestirim her turda aralığın en başına düşer ve tek bir gözü eler. Arama doğrusal aramaya döner. İkili arama değerlere değil sıraya baktığı için garantisi bozulmaz.",
      },
      {
        title: "Az kenar mı, az maliyet mi; Dijkstra nerede yanılır?",
        predict:
          "Ağırlıklı ızgarada BFS'in A'dan L'ye bulduğu yol ile Dijkstra'nınki aynı sayıda kenardan geçebilir ama aynı maliyette olur mu? Çizgeye tek bir negatif kenar eklenirse Dijkstra'nın sonucu yine doğru kalır mı?",
        do:
          "03 · Çizgeler sekmesinde <strong>Çizgeyi sıfırla</strong>'ya bas (ızgara, tohum 7, Dijkstra, A'dan L'ye). Tabloyu ve “Hedefe bulunan yol” kartını oku. Yöntemi <strong>BFS: enine arama (kuyruk)</strong>, sonra <strong>DFS: derinlemesine arama (yığın)</strong> yap. Ardından Hazır çizge menüsünden <strong>Negatif kenar (yönlü)</strong> seç ve Yöntemi yeniden <strong>Dijkstra: en ucuz önce</strong> yap. Son olarak Düzenlenecek kenar menüsünde <strong>C → B · ağırlık −4</strong> kenarını seçip Seçili kenarın ağırlığını −3'e getir.",
        observe:
          "Dijkstra: 5 kenar, maliyet 14 | 14, fark 0; yol A → E → F → J → K → L; sapan düğüm 0 / 12. BFS: yine 5 kenar ama yol A → B → C → D → H → L, maliyet 25, referans 14, fark +11. DFS: 11 kenar (fark +6), maliyet 46 (fark +32); 12 düğümün 7'sine gereğinden derin bir daldan ulaşır. Negatif kenarlı çizgede Dijkstra A'dan E'ye 5 bulur, Bellman–Ford 4: fark +1, “3 / 5”, ziyaret sırası A B D C E. Ağırlık −3 olunca fark 0'a, sapan düğüm “0 / 5”e iner ve durum satırı uyarır: negatif kenar var ama bu kez sonucu bozmadı, bunun güvencesi yok.",
        explain:
          "BFS ağırlıklara bakmaz: en az kenarlı yollardan harf sırasında ilk geleni alır. Dijkstra aynı uzunluktaki yolların ucuzunu bulur; DFS ise ilk daldığı dalı izler, bulduğu yalnızca bir yoldur. Negatif kenarlı çizgede Dijkstra B'yi 2 ile kesinleştirir (A → B), ardından D'yi 3, C'yi 5 ile. C'den B'ye −4'lük kenar B'yi 5 − 4 = 1'e indirirdi; ama B çoktan kapanmıştır. Hata D'ye ve E'ye taşınır: üç düğüm birer birim pahalı kalır. Ağırlık −3 iken 5 − 3 = 2, B'nin kesinleşmiş değerine eşittir; düzeltilecek şey kalmaz. Doğru çıkan sonuç yöntemi aklamaz, yalnız bu ağırlıkta şanslı olduğunu gösterir.",
      },
      {
        title: "Eğimi oku, patlamayı say",
        predict:
          "Log-log grafikte seçmeli sıralamanın eğimi 2, birleştirmelinin eğimi 1 mi çıkar? Fibonacci'de n'yi 20'den 30'a çıkarınca naif çağrı sayısı kaç katına çıkar: 1,5 mi, 123 mü, 1 024 mü? Hiç ortak harfi olmayan onar harfli iki sözcük için naif özyineleme kaç çağrı yapar?",
        do:
          "04 · Büyüme ve dinamik programlama sekmesinde <strong>Bu sekmeyi sıfırla</strong>'ya bas ve eğim tablosunu oku; sonra <strong>En büyük n</strong> kaydırıcısını 4 096'ya çek. Fibonacci bölümünde <strong>n</strong> kaydırıcısını 20'den 30'a getir. En uzun ortak alt dizi bölümünde önce varsayılan ALGORITMA / LOGARITMA çiftinin tablosuna bak, sonra <strong>Ortak harf yok</strong> düğmesine bas.",
        observe:
          "n = 8 … 1 024 aralığında ölçülen | kuram eğrisi eğimleri: Seçmeli 2,023 | 2,023; Birleştirmeli 1,292 | 1,298; Hızlı 1,324 | 1,331; Doğrusal arama 0,979 | 0,979; İkili arama 0,252 | 0,252. En büyük n 4 096 olunca Seçmeli 2,016'ya, Birleştirmeli 1,256'ya, İkili arama 0,226'ya iner. Fibonacci n = 20: F = 6 765, naif 21 891 çağrı (kuram aynı, fark 0), bellekli 39, ardışık oran 1,618080. n = 30: naif 2 692 537, bellekli 59. Ortak alt dizi: varsayılan çiftte uzunluk 7 (“LGRITMA”), 9 × 9 = 81 göz, naif 50 çağrı. Ortak harf yokken uzunluk 0, 10 × 10 = 100 göz, naif 369 511 çağrı (kuram aynı, fark 0).",
        explain:
          "Sonlu bir aralıkta eğim asimptotik üsse eşit çıkmaz: n log n eğrisinin log-log grafikteki yerel eğimi 1 + 1/ln n'dir, n = 1 024'te 1,144. Sayfa bu yüzden ölçülen eğimi kapalı biçimin aynı noktalardaki eğimiyle karşılaştırır. Fibonacci'de on adım φ¹⁰ ≈ 123 kat demektir: 21 891 × 123 ≈ 2,69 milyon; bellekli sürüm aynı on adımda yalnız 20 çağrı ekler. Ortak harf yokken naif özyineleme her gözde ikiye dallanır: S(m, n) = S(m − 1, n) + S(m, n − 1) + 1. Çözümü, m + n'nin m'li kombinasyonunun iki katının bir eksiğidir: 2·184 756 − 1 = 369 511. Tablo aynı soruyu 100 gözle yanıtlar.",
      },
    ],
  },
  wow: [
    {
      title: "Yirmi dakika, kâğıtsız kalemsiz",
      body:
        "1956'da Edsger Dijkstra, Amsterdam'da nişanlısıyla bir kafe terasında otururken, yeni ARMAC bilgisayarını tanıtmak için gösterişli bir problem arıyordu: iki şehir arasındaki en kısa yol. Algoritmayı yirmi dakikada, kâğıt kalem olmadan tasarladığını anlattı; 1959'da üç sayfalık bir makale olarak yayımlandı. Bugün her navigasyon uygulamasının çekirdeğinde o yirmi dakikanın torunları çalışır.",
    },
    {
      title: "Dokuz yıl saklanan ortadaki hata",
      body:
        "2006'da Java'nın standart kütüphanesindeki ikili arama ve birleştirmeli sıralama kodunda bir hata açıklandı: ortayı bulan (alt + üst) / 2 toplama işlemi, yaklaşık bir milyar (2³⁰) ve daha çok elemanlı dizilerde 32 bitlik tam sayının sınırını aşıp negatif bir indeks üretebiliyordu. Hata yaklaşık dokuz yıl fark edilmeden durmuştu; kodu yazan Joshua Bloch, aynı tuzağı Jon Bentley'nin 1986 tarihli <em>Programming Pearls</em> kitabındaki örneğin de taşıdığını yazdı. Beş satırlık bir algoritma bile 'her girdide doğru' olmayı zor kılar.",
    },
    {
      title: "Otuz altı bin yıl ile bir göz kırpması arası",
      body:
        "Naif özyinelemeyle F(100) hesaplamak 2F(101) − 1 ≈ 1,15 × 10²¹ çağrı ister. Saniyede bir milyar çağrı yapan bir bilgisayar bunu yaklaşık 36 000 yılda bitirir; bin kat hızlı bir makine 36 yılda. Aşağıdan yukarı bir döngü aynı sayıyı 99 toplamayla verir: F(100) = 354 224 848 179 261 915 075. Donanım 1000 kat, algoritma 10¹⁹ kat kazandırdı.",
    },
  ],
  worked: {
    title: "32 eleman, hızlı sıralama: en kötü, beklenen ve olabilecek en iyi",
    prompt:
      "Birbirinden farklı 32 anahtar, parçanın son elemanını pivot seçen hızlı sıralamayla sıralanıyor; her bölme, parçadaki öteki elemanları pivotla birer kez karşılaştırır. (a) Girdi zaten sıralıysa kaç karşılaştırma yapılır? (b) Girdi rastgele bir permütasyonsa beklenen karşılaştırma sayısı kaçtır? (c) Karşılaştırarak sıralayan herhangi bir yöntemin en kötü durumu en az kaç karşılaştırmadır? (d) n = 64 olunca bu üç sayı kaç katına çıkar?",
    steps: [
      "(a) m elemanlı bir parçanın bölünmesi m − 1 karşılaştırma ister. Sıralı girdide son eleman en büyüktür; bölme yalnız pivotu ayırır ve geriye m − 1 elemanlı tek parça kalır. Toplam 31 + 30 + … + 1 = 32·31/2 = 496 karşılaştırma. Sayfada: Hızlının en kötüsü düğmesi, Karşılaştırma 496 | 496, fark 0.",
      "(b) Rastgele girdide pivotun sırası 1'den n'ye eşit olasılıklıdır ve bölmeden çıkan iki parça da kendi içinde rastgele dizilmiş kalır; aynı akıl yürütme her parçaya yeniden uygulanabilir. Beklenen sayı E(n) için E(n) = (n − 1) + (2/n)·[E(0) + E(1) + … + E(n − 1)] yazılır. Bağıntının n ve n − 1 için yazılmış hâlleri birbirinden çıkarılınca n·E(n) = (n + 1)·E(n − 1) + 2(n − 1) kalır; iki yan n(n + 1)'e bölünüp toplanırsa E(n) = 2(n + 1)Hₙ − 4n bulunur. Burada Hₙ = 1 + 1/2 + … + 1/n.",
      "Formülü önce küçük bir durumda sına: n = 3 için 2·4·(11/6) − 12 = 8/3 verir. Elle: ilk bölme 2 karşılaştırma; pivot ortanca çıkarsa (olasılık 1/3) iş biter, yoksa iki elemanlı parça için 1 karşılaştırma daha gerekir: 2 + 2/3 = 8/3. Tutuyor.",
      "n = 32 için H₃₂ ≈ 4,0585; E(32) = 2·33·4,0585 − 128 ≈ 267,86 − 128 = 139,86 karşılaştırma. Sayfada varsayılan düzende (rastgele permütasyon, tohum 7) tek koşu 175, 200 koşunun ortalaması 139,48, beklenen 139,86, fark −0,27 %. Tek bir koşu beklenen değerden epey sapabilir; ortalama ona yaklaşır.",
      "(c) 32! ≈ 2,63 × 10³⁵ dizilişin her biri farklı bir yanıt ister; k karşılaştırma en çok 2ᵏ durumu ayırır. 2ᵏ ≥ 32! koşulu k ≥ log₂ 32! ≈ 117,7 demektir: en az 118 karşılaştırma. Sayfadaki “En kötü durum alt sınırı” kartı bunu “118 (N ≈ 2,63 × 10³⁵)” diye yazar.",
      "(d) n = 64: en kötü durum 64·63/2 = 2 016 (4,06 kat); beklenen 2·65·H₆₄ − 256 ≈ 360,71 (2,58 kat); alt sınır ⌈log₂ 64!⌉ = 296 (2,51 kat). Eleman sayısı n kaydırıcısını 64'e çekip üçünü de sayfada görebilirsin: sıralı girdide 2 016 | 2 016, rastgele girdide beklenen 360,71, alt sınır kartında 296.",
    ],
    result:
      "Sıralı girdide 496, rastgele girdide beklenen 139,86, hiçbir yöntemin en kötü durumda inemeyeceği taban 118 karşılaştırma. n iki katına çıkınca en kötü durum dört katına, beklenen değer ve alt sınır yalnız iki buçuk katına çıkar: n² ile n log n arasındaki fark budur.",
  },
  misconceptions: [
    {
      myth: "O(n log n) bir yöntem her girdide O(n²) olandan az iş yapar.",
      truth:
        "O-gösterimi büyük n için büyüme biçimini söyler; belli bir girdide kimin önde olduğunu söylemez. Sayfada 32 elemanlı sıralı girdide eklemeli sıralama 31, birleştirmeli sıralama 80, son eleman pivotlu hızlı sıralama 496 karşılaştırma yapar. Rastgele girdide tablo döner: beklenen değerler eklemelide 275,94, birleştirmelide 121,5. Python'un Timsort'u ve Java'nın sıralayıcıları bu yüzden kısa parçalarda eklemeli sıralamaya geçer.",
    },
    {
      myth: "Özyineleme yavaştır; döngü her zaman daha iyidir.",
      truth:
        "Yavaş olan özyineleme değil, aynı alt problemi tekrar tekrar çözmektir. Birleştirmeli ve hızlı sıralama özyinelemelidir ve en az iş yapan sıralamalar arasındadır; her çağrı farklı bir parçayı işler. Naif Fibonacci'yi batıran şey aynı F(k)'nın defalarca sıfırdan hesaplanmasıdır. Bellekli sürüm özyinelemeyi korur, tekrarı siler: sayfada n = 30 için 2 692 537 çağrı 59'a iner.",
    },
    {
      myth: "Dijkstra ağırlıklı her çizgede en kısa yolu bulur.",
      truth:
        "Yalnız ağırlıklar negatif değilken. Yöntem bir düğümü kesinleştirdikten sonra ona bir daha dokunmaz; sonradan işlenen negatif bir kenar daha ucuz bir yol açarsa bunu göremez. Sayfadaki “Negatif kenar (yönlü)” çizgesinde beş düğümün üçünde yanılır. Negatif kenar varsa Bellman–Ford gerekir; negatif çevrim varsa “en kısa yol” sorusunun kendisi tanımsızdır.",
    },
    {
      myth: "Doğru sıralayan iki yöntem aynı çıktıyı verir.",
      truth:
        "Anahtarlar birbirinden farklıysa evet; eşit anahtar varsa hayır. <strong>Kararlı</strong> bir yöntem eşit anahtarlı kayıtların ilk sırasını korur, kararsız olan bozabilir. Kararlılık sınaması düğmesindeki 12 elemanlı dizide seçmeli sıralama 15 eşit çiftten 5'inin sırasını bozar; hızlı sıralama 7'sini, yığın sıralaması 8'ini. Birleştirmeli, eklemeli ve kabarcık sıralaması 15 çiftin hepsini korur. Önce ada, sonra bölüme göre sıralanan bir sınıf listesinde aradaki fark, bölüm içinde adların alfabetik kalıp kalmamasıdır.",
    },
  ],
  glossary: [
    { term: "Algoritma", definition: "Bir problemi, her geçerli girdide sonlu sayıda kesin adımla çözen yöntem." },
    { term: "O-gösterimi (Big-O)", definition: "İşlem sayısının girdi büyüklüğü n ile hangi biçimde büyüdüğünü sabitleri atarak yazan gösterim; O(n²), O(n log n), O(log n) gibi." },
    { term: "Ters çift", definition: "Dizide solda duran büyük, sağda duran küçük iki elemanın oluşturduğu çift; sayısı dizinin sıralı olmaktan ne kadar uzak olduğunu ölçer." },
    { term: "Kararlı sıralama", definition: "Eşit anahtarlı kayıtların girdideki sırasını çıktıda da koruyan sıralama yöntemi." },
    { term: "Pivot", definition: "Hızlı sıralamanın parçayı “küçükler sola, büyükler sağa” diye böldüğü referans eleman; seçimi bölmelerin dengesini belirler." },
    { term: "Yoklama", definition: "Aramada bir gözün hedefle karşılaştırılması; bu sayfada arama yöntemlerinin işi yoklama sayısıyla ölçülür." },
    { term: "Bellekleme (memoizasyon)", definition: "Bir alt problemin yanıtını ilk hesapta bir tabloya yazıp sonraki sorularda tablodan okuma; dinamik programlamanın temel aracı." },
    { term: "Kuyruk ve yığın", definition: "İki bekleme düzeni: kuyrukta ilk giren ilk çıkar (BFS), yığında son giren ilk çıkar (DFS)." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede bir algoritma için “çalışıyor” demek yeterlidir; lisansta, <strong>Veri Yapıları ve Algoritmalar</strong> ile <strong>Algoritma Analizi</strong> derslerinde iki soru daha sorulur: <strong>neden her girdide doğru</strong> ve <strong>tam olarak kaç işlem</strong>? İlkine döngü değişmeziyle yanıt verilir: “her turun sonunda ilk i eleman sıralıdır” gibi, baştan sona doğru kalan bir cümle. İkincisine yineleme bağıntılarıyla: birleştirmeli sıralama için T(n) = 2T(n/2) + n yazılır ve Master teoremi bunun n log n büyüdüğünü söyler. Sonra bir alt sınır gelir: her karşılaştırma iki yola ayrılan bir karar ağacı kurar; n! dizilişi ayırt etmek için ağacın derinliği en az log₂(n!) ≈ n log₂ n − 1,44n olmalıdır. Hiçbir karşılaştırma sıralaması bunun altına inemez; birleştirmeli sıralama neredeyse ona dokunur. Bu sayfadaki Kuram sütunu, o derslerde tahtaya yazılan kapalı biçimlerin sayıya dökülmüş hâlidir.",
      "Oradan sonra yol çatallanır. Dijkstra ve A* negatif olmayan ağırlıklarla en kısa yolu bulur, Bellman–Ford negatif kenarı da taşır. Dinamik programlama, sırt çantası ve dizi hizalama gibi alt problemleri çakışan soruları çözer; sayfadaki en uzun ortak alt dizi tablosu, dizi hizalamada doldurulan tabloların yakın akrabasıdır. Rastgele algoritmaların analizi hızlı sıralamanın pivot şansını beklenen değer hesabına bağlar: rastgele pivotla beklenen karşılaştırma sayısı 2(n + 1)Hₙ − 4n, büyük n'de yaklaşık 2n ln n ≈ 1,39 n log₂ n'dir. <strong>Olasılık</strong> ve <strong>Ayrık Matematik</strong> dersleri bu hesapların dilini verir. En büyük soru ise hâlâ açıktır: yanıtı hızla doğrulanabilen her problem hızla çözülebilir mi? Bu, P ile NP'nin eşit olup olmadığı sorusudur ve 1971'den beri kimse yanıtlayamadı. Bu sayfadaki 7 049 155 çağrı ile 63 çağrı arasındaki uçurum, iyi bir fikrin neyi değiştirebileceğinin küçük bir örneğidir.",
    ],
    topics: ["Döngü değişmezi ve doğruluk ispatı", "Yineleme bağıntıları ve Master teoremi", "Karşılaştırmalı sıralama alt sınırı", "Ortalama durum analizi ve beklenen değer", "Dijkstra, Bellman–Ford ve A*", "Dinamik programlama", "P ve NP"],
  },
  quiz: [
    {
      question: "31 elemanlı sıralı dizide ikili aramanın en kötü durumu 5 yoklamadır. Dizi 1 023 elemana, yani 33 katına çıkarsa en kötü durum kaç yoklama olur?",
      options: ["10", "33", "165", "512"],
      answer: 0,
      explanation: "En kötü durum ⌈log₂(n + 1)⌉'dir: ⌈log₂ 1 024⌉ = 10. Dizi 33 kat büyürken yalnız 5 yoklama eklenir, çünkü her ek yoklama taranabilecek dizi boyunu ikiye katlar. 165, işin n ile orantılı büyüdüğünü sanınca çıkar; o davranış doğrusal aramanındır (31'den 1 023'e).",
    },
    {
      question: "Sayfada naif özyinelemeli Fibonacci n = 20 için 21 891 çağrı yapıyor. n = 30 için yaklaşık kaç çağrı beklersin?",
      options: ["Yaklaşık 44 bin", "Yaklaşık 330 bin", "Yaklaşık 2,7 milyon", "Yaklaşık 22 milyon"],
      answer: 2,
      explanation: "Çağrı sayısı n'deki her artışta φ ≈ 1,618 katına çıkar; on adım φ¹⁰ ≈ 123 kat demektir: 21 891 × 123 ≈ 2,7 milyon (sayfadaki tam değer 2 692 537). 22 milyon, büyümeyi 2ⁿ sanıp 2¹⁰ = 1 024 ile çarpınca çıkar; gerçek taban 2 değil φ'dir.",
    },
    {
      question: "Yönlü bir çizgede kenarlar A → B 2, A → C 5, C → B w, B → D 1, D → E 2. Dijkstra A'dan başlıyor ve kesinleştirdiği düğümü bir daha güncellemiyor. w en az kaç olursa bütün uzaklıkları doğru bulur?",
      options: ["w = −4", "w = −3", "w = −1", "w = 0"],
      answer: 1,
      explanation: "Dijkstra önce B'yi 2 ile kesinleştirir, C'ye ancak 5 ile ulaşır. C üzerinden B'ye giden yolun maliyeti 5 + w'dir; bu, 2'den küçükse B'nin gerçek uzaklığı kaçırılmış olur. 5 + w ≥ 2 koşulu w ≥ −3 verir. Sayfada w = −4 iken üç düğüm yanlıştır, w = −3 iken sapma sıfırdır; ama bu doğruluk yöntemin değil, ağırlığın sayesindedir.",
    },
  ],
  next: [
    { href: "siralama-algoritmalari.html", title: "Sıralama: Adımlar ve Kararlılık", why: "Kabarcık, seçmeli ve eklemeli sıralamayı etiketli kayıtlarda adım adım izle: eşit anahtarlar yer değiştiriyor mu, hangi bölge kesinleşti, döngü değişmezi ne diyor?" },
    { href: "siralama-yarisi.html", title: "Sıralama Yarışı: Aynı Girdi, Farklı İş", why: "Kabarcık, son-pivotlu hızlı ve birleştirmeli sıralama aynı dizinin kopyasında yarışır; karşılaştırmalar, ana diziye ve tampona yazmalar ayrı sayılır." },
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma: Az Adım mı, Az Maliyet mi?", why: "Bu sayfada olmayan A* orada: hücre bedelleri farklı bir ızgarada BFS en az adımı, Dijkstra ve A* en az maliyeti bulur; aynı haritada karşılaştır." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme", why: "O, Ω ve Θ'yı birbirinden ayır; en kötü, ortalama ve amorti edilmiş analizin hangi soruyu yanıtladığını büyüme sınıfları karşılaştırıcısıyla gör." },
  ],
  sources: [
    { title: "MIT OpenCourseWare · 6.006 Introduction to Algorithms (Spring 2020)", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", note: "Ders videoları ve notlar: sıralama, ikili arama, graf taraması, dinamik programlama (İngilizce, açık ders)." },
    { title: "Khan Academy · Algorithms", url: "https://www.khanacademy.org/computing/computer-science/algorithms", note: "İkili arama, asimptotik gösterim, özyineleme, sıralama ve BFS üzerine lise düzeyinde etkileşimli ders (İngilizce)." },
    { title: "Vikipedi · Algoritma", url: "https://tr.wikipedia.org/wiki/Algoritma", note: "Terimin kökeni (el-Harezmî), tarihçe ve temel sınıflandırma, Türkçe." },
    { title: "Wikipedia · Quicksort", url: "https://en.wikipedia.org/wiki/Quicksort", note: "Hoare'nin 1959–1961 öyküsü, Lomuto ve Hoare bölmeleri, en kötü ve ortalama durum analizi (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
