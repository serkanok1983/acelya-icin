window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["cizge-teorisi"] = {
  slug: "cizge-teorisi",
  title: "Çizge Teorisi: Köprülerden Algoritmalara",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Yedi köprü, bir nehir ve 1736'da 'bunun matematikle pek ilgisi yok' diyen Euler. Noktalarla çizgilerden kurulu bu dünya bugün harita uygulamalarının, sosyal ağların ve internetin omurgası.",
  hook:
    "Königsberg'in yedi köprüsünün her birinden tam bir kez geçen bir yürüyüş var mı? Euler'e anlatılana göre kimi 'olmaz' diyordu, kimi kuşkuluydu; 'olur' diyen yoktu. Euler bütün rotaları denemedi: her kara parçasına kaç köprü indiğini saydı ve 'olmaz'ı kanıtladı. Sayfadaki tuvalde aynı sayımı yapacak, sonra tek bir köprüyle cevabı değiştireceksin.",
  bigIdea:
    "Bir çizgede önemli olan nesnelerin yeri değil, <strong>kimin kime kaç kenarla bağlı olduğudur</strong>: köprü bulmacası düğüm derecelerini saymaya, en kısa yol sorusu ise kenarlar üzerinde sistemli bir aramaya indirgenir.",
  story: [
    "Pregel Nehri, Königsberg'i (bugünkü Kaliningrad) dört kara parçasına bölüyordu: kuzey ve güney kıyıları, ortadaki Kneiphof adası ve doğudaki Lomse. Yedi köprünün dördü Kneiphof'u kıyılara bağlıyordu (her kıyıya iki), biri Kneiphof'u Lomse'ye; kalan ikisi Lomse'den kıyılara uzanıyordu. Kentin bilmecesi, her köprüden tam bir kez geçen bir yürüyüşün olup olmadığıydı. Soru St. Petersburg'daki Leonhard Euler'e ulaştı. Euler çözümünü 26 Ağustos 1735'te St. Petersburg Akademisi'nde sundu; makale, akademinin 1736 tarihli cildinde 1741'de basıldı. Makale, Leibniz'in 'konum geometrisi' (<em>geometria situs</em>) dediği ama hangi soruları kapsadığı henüz belirsiz olan alanı anarak açılır ve köprü sorusunu bu alanın bir örneği olarak sunar. Mektuplarında Euler daha mesafelidir. 3 Nisan 1736'da, çözümü kanıtıyla birlikte isteyen Danzig'li dostu Carl Ehler'e, böyle bir çözümün matematikle pek ilgisi olmadığını, yalnızca akla dayandığını ve neden bir matematikçiden beklendiğini anlamadığını yazar. Aynı yıl İtalyan matematikçi ve mühendis Giovanni Marinoni'ye ise sorunun sıradan olduğunu, ama ne geometrinin ne cebirin ne de sayma sanatının çözmeye yetmediği için ilgisini çektiğini söyler.",
    "Euler'in kanıtı bir sayımdı. Çizge çizmedi; bölgelere A, B, C, D, köprülere a'dan g'ye harfler verdi ve yürüyüşü, geçilen bölgelerin harf dizisi olarak yazdı: yedi köprüden geçen bir yürüyüş sekiz harf tutar. Bir bölgeye tek sayıda, k tane köprü iniyorsa o bölgenin harfi dizide (k + 1)/2 kez geçmek zorundadır. Beş köprülü ada A üç kez, üçer köprülü B, C ve D ikişer kez: toplam dokuz harf, oysa dizide sekiz yer var. Euler aynı makalede genel kuralı da verdi: tek sayıda köprü inen bölge ikiden fazlaysa yürüyüş yoktur; tam iki tane varsa yürüyüş birinde başlar, ötekinde biter; hiç yoksa her yerden başlanabilir. Kuralın 'ikiden fazlaysa yürüyüş yok' yarısını kanıtladı; 'sıfır ya da iki tane varsa yürüyüş var' yarısını ise kanıtsız bıraktı. O yarıyı Carl Hierholzer kanıtladı; makalesi 1871'deki ölümünden sonra, 1873'te yayımlandı.",
    "Alanın adı bile yüz kırk yıldan uzun bekledi. 'Graph' sözcüğünü 1878'de J. J. Sylvester, kimyacıların molekül çizimlerinden esinlenerek <em>Nature</em> dergisinde kullandı. O sırada Kirchhoff elektrik devrelerini çözmek (1847), Cayley ise ağaçları ve hidrokarbon izomerlerini saymak için bu yapılarla çoktan çalışmıştı; Francis Guthrie'nin 1852'de ortaya attığı dört renk problemi ise bir asırdan uzun süre çözümsüz kalacaktı. Alanın ilk ders kitabını 1936'da Macar matematikçi Dénes Kőnig yazdı. Türkçede 'çizge' sözcüğü kullanılır; böylece fonksiyon grafiğiyle karışmaz: burada eksen yok, yalnızca düğümler ve kenarlar var.",
    "Asıl patlama bilgisayarla geldi. Edsger Dijkstra 1956'da Amsterdam'daki Matematik Merkezi'nde yeni ARMAC bilgisayarını tanıtmak için herkesin anlayacağı bir soru aradı: iki Hollanda kenti arasındaki en kısa yol. Bulduğu yöntem, A* gibi hızlandırılmış torunlarıyla bugün de rota yazılımlarının çekirdeğinde. 1998'de Sergey Brin ve Larry Page, web sayfalarını düğüm, bağlantıları yönlü kenar sayan PageRank yöntemini yayımladı. Sosyal ağlar arkadaş önerilerini, biyologlar protein etkileşimlerini, epidemiyologlar salgınları aynı dille modelliyor. Sayfadaki tuval işte bu dilin alfabesi.",
  ],
  core: [
    {
      heading: "Derece ve el sıkışma önermesi",
      body:
        "Bir <strong>çizge</strong> düğümlerden ve her biri iki düğümü bağlayan kenarlardan oluşur. Aynı iki düğümü birden çok kenar bağlayabiliyorsa <strong>çoklu çizge</strong> denir; Königsberg böyledir, çünkü ada iki kıyının her birine ikişer köprüyle bağlıdır. Bir düğümün <strong>derecesi</strong> ona değen kenarların sayısıdır; paralel kenarların her biri ayrı sayılır. <em>El sıkışma önermesinin</em> kanıtı bir çift sayımdır: bütün (düğüm, kenar) değmelerini düğümlere göre sayarsan derecelerin toplamını, kenarlara göre sayarsan her kenardan tam iki değme, yani 2|E| bulursun. Önermenin bir sonucu daha da kullanışlıdır: çift derecelerin toplamı çift olduğuna göre tek derecelerin toplamı da çift olmalıdır; bu ancak tek dereceli düğüm sayısı çiftse olur. Euler ikisini de makalesinin 16. ve 17. bölümlerinde köprüler için yazar: her köprü iki bölgeye birden sayılır, bu yüzden tek sayıda köprü inen bölgelerin sayısı bir, üç ya da beş olamaz. Sayfadaki Euler testi, kenar olduğu sürece her sonucun sonuna 'Derece toplamı 14 = 2 × 7 kenar' gibi bir satır ekler.",
      formula: "Σ<sub>v</sub> der(v) = 2·|E|",
      formulaNote: "|E| kenar sayısı. Bir düğümü kendine bağlayan <em>ilmek</em> dereceye 2 katar (sayfa ilmek eklemez). Sonuç: her çizgede tek dereceli düğüm sayısı çifttir.",
    },
    {
      heading: "Euler'in teoremi: koşullar ve kanıt fikri",
      body:
        "Kenarı olan bütün düğümler tek bir bağlantılı parçadaysa yalnızca dereceler karar verir. Hiç tek dereceli düğüm yoksa başladığın yere dönen bir <strong>Euler devresi</strong>, tam iki tane varsa birinden başlayıp ötekinde biten bir <strong>Euler yolu</strong> vardır; dört ya da daha fazlaysa ikisi de yoktur. Gereklilik bir eşleme argümanıdır: uç olmayan bir düğümden her geçiş bir giriş ve bir çıkış kenarı harcar. Yeterliliğin kanıtı bir algoritmadır (Hierholzer). Bütün dereceler çiftse, kullanılmamış kenarlardan yürüyen biri ancak başladığı düğümde takılabilir: başka bir düğüme her girişinde o düğümün tek sayıda kenarını harcamıştır, demek ki bir çıkış kalmıştır. Böylece kapalı bir yürüyüş bulunur. Kenar kaldıysa yürüyüş üzerinde kullanılmamış kenarı olan bir düğüm vardır (bağlantılılık bunu garanti eder); oradan yeni bir kapalı yürüyüş başlatılıp araya eklenir. Her kenara bir kez bakıldığı için yöntem O(|E|) sürer. Tam iki tek dereceli düğüm varsa aralarına hayalî bir kenar konup devre bulunur, sonra o kenar çıkarılır. Sayfadaki Euler testi dereceleri rozetlerle gösterir, tek dereceli düğümleri kehribar rengi halkayla işaretler ve bu yöntemle bulduğu örnek bir yürüyüşü yazar.",
      formula: "Euler devresi ⇔ her der(v) çift  ·  Euler yolu ⇔ tam iki der(v) tek",
      formulaNote: "İki koşulda da kenarı olan düğümler tek bir bağlantılı parçada olmalı; kenarsız düğümler hesaba katılmaz. Gerekliliği Euler (1736), yeterliliği Hierholzer (1873) gösterdi.",
    },
    {
      heading: "BFS ve DFS: ne zaman işaretlediğin önemlidir",
      body:
        "Bir çizgeyi baştan sona gezmenin iki temel yolu vardır. <strong>Genişlik öncelikli arama</strong> (BFS) bir <em>kuyruk</em> kullanır: başlangıcın bütün komşularını, sonra onların komşularını ziyaret eder ve bir düğümü kuyruğa koyduğu anda işaretler. Böylece her düğüm bir kez, başlangıca en az kaç kenarla ulaşıldığını gösteren <em>katmanına</em> yazılır. <strong>Derinlik öncelikli arama</strong> (DFS) ise bir düğüme girer girmez onu işaretler, ilk ziyaret edilmemiş komşuya dalar ve tıkanınca geri döner; özyinelemeyle ya da bir yığınla yazılır. Komşuluk listesiyle iki arama da her düğüme ve kenara sabit sayıda bakar: O(|V| + |E|). Ağaç dışında kalan kenarlar da bir iz bırakır: BFS'de katmanları en fazla bir farklı düğümleri, yönsüz bir çizgedeki DFS'de ise bir düğümü kendi atasına bağlarlar. Sayfa komşuları küçük numaradan büyüğe dener; Ev Çizgesi'nde 0'dan BFS '0 → 1 → 4 → 2 → 3', DFS '0 → 1 → 2 → 3 → 4' verir.",
      formula: "BFS: kuyruk, katman = en az kenar sayısı  ·  DFS: yığın ya da özyineleme",
      formulaNote: "Başlangıçtan ulaşılan n düğüm için arama ağacında tam n − 1 kenar olur; sayfa bunları mor çizer ve sayısını okuma satırına yazar (Ev Çizgesi'nde '4 kenarlık arama ağacı').",
    },
    {
      heading: "Dijkstra: gevşetme ve neden doğru çalıştığı",
      body:
        "Kenarların ağırlığı (mesafe, süre, maliyet) farklıysa en az kenarlı yol en ucuz yol olmayabilir. Dijkstra her düğüme bir <strong>tahmini uzaklık</strong> yazar: başlangıca 0, geri kalanına sonsuz. Her adımda kesinleşmemiş düğümler arasından tahmini en küçük olanı, u'yu, kesinleştirir ve komşularının tahminlerini <em>gevşetir</em>. Neden doğru? Tümevarımla, daha önce kesinleşenlerin tahminleri gerçek uzaklıklarıdır. u'ya giden herhangi bir P yolu kesinleşmiş bölgeden ilk kez bir x düğümünde çıksın. P'de x'ten önceki y kesinleşmiş ve kesinleşirken x'i gevşetmiştir; bu yüzden d(x) ≤ d(y) + w(y, x) ≤ P'nin x'e kadarki uzunluğu. u en küçük tahminle seçildiği için d(u) ≤ d(x); P'nin kalanı negatif olmayan kenarlardan oluştuğu için de uzunluk(P) ≥ d(x) ≥ d(u). Kanıtın kilidi <strong>negatif olmayan ağırlıklardır</strong>: yönlü bir örnekte s→a 2, s→b 3, b→a −2 olsun; Dijkstra a'yı 2'de kesinleştirir, oysa gerçek uzaklık 1'dir. Negatif ağırlıkta Bellman–Ford gibi bir yöntem gerekir; sayfa bu yüzden negatif ağırlığı kabul etmez. Çoklu çizgede her paralel kenar ayrı gevşetilir, yani yalnızca en hafifi etkili olur.",
      formula: "d(v) ← min( d(v), d(u) + w(u, v) ),  w ≥ 0",
      formulaNote: "u yeni kesinleşen düğüm. Sayfanın yaptığı gibi her adımda bütün düğümleri taramak O(|V|² + |E|) sürer; ikili yığınla O((|V| + |E|) log |V|)'ye iner.",
    },
    {
      heading: "Ağaç: en az kenarla bağlı kalmak",
      body:
        "Döngüsü olmayan bağlantılı çizgeye <strong>ağaç</strong> denir. n düğümlü her ağaçta tam n − 1 kenar vardır. Kanıt bir yaprak sökme tümevarımıdır: en uzun yolun ucu bir <em>yapraktır</em>, yani derecesi 1'dir (yoksa yol uzardı ya da döngü kapanırdı); yaprağı kenarıyla birlikte sökünce n − 1 düğümlü bir ağaç kalır. Ağaç bu yüzden en az kenarla bağlı kalmaktır: bir kenar eksilirse çizge kopar, bir kenar eklenirse tam bir döngü oluşur. Sayfadaki Yıldız bir ağaçtır: 7 düğüm, 6 kenar. Ev Çizgesi değildir: 5 düğüm, 6 kenar; fazladan iki kenar iki <em>bağımsız</em> döngü demektir, kare 0–1–2–4 ve çatı üçgeni 2–3–4. Dış beşgen 0–1–2–3–4 de bir döngüdür ama bu ikisinden, ortak kenarları 2–4 atılarak elde edilir. BFS ya da DFS'nin mor kenarları her zaman başlangıcın bulunduğu parçanın bir <strong>kapsayan ağacıdır</strong>, çünkü her düğüm tek bir ebeveynden keşfedilir. Kaç kapsayan ağaç olduğunu Kirchhoff'un matris-ağaç teoremi söyler: derece matrisinden komşuluk matrisini çıkararak bulunan Laplace matrisinin herhangi bir kofaktörü. Ev Çizgesi'nin 11, Königsberg çoklu çizgesinin 21 kapsayan ağacı vardır.",
      formula: "ağaç ⇔ bağlantılı + döngüsüz  ⇒  |E| = |V| − 1",
      formulaNote: "Bağlantılı bir çizgede |E| − |V| + 1 bağımsız döngü sayısıdır: Ev Çizgesi'nde 6 − 5 + 1 = 2, Königsberg'de 7 − 4 + 1 = 4.",
    },
  ],
  lab: {
    intro:
      "Tuvalin altındaki dört mod düğmesi tıklamanın ne yapacağını seçer: <strong>Düğüm Ekle</strong> (boş yere tıkla; düğümü sürükleyerek taşı), <strong>Kenar Ekle</strong> (iki düğüme sırayla tıkla), <strong>Ağırlık Ver</strong> (bir kenara ya da üstündeki sayıya tıkla) ve <strong>Sil</strong>. Yeni kenarların ve Ağırlık Ver'in kullandığı değer <strong>Kenar ağırlığı</strong> kutusundadır; negatif sayı kabul edilmez. Aynı iki düğüm arasına ikinci bir kenar eklenebilir: paralel kenarlar ayrı kavisler olarak çizilir ve Sil, tıkladığın noktaya en yakın kenarı siler. <strong>Arama</strong> menüsü BFS ya da DFS'yi, yanındaki <strong>Başlangıç</strong> menüsü ilk düğümü seçer; <strong>Çalıştır</strong> aramayı başlatır, <strong>Euler testi</strong> dereceleri sayar. <strong>En kısa yol (Dijkstra)</strong> satırında Başlangıç ve Hedef seçip <strong>Dijkstra</strong>'ya basılır. En alttaki <strong>Üçgen</strong>, <strong>Ev Çizgesi</strong>, <strong>Yıldız</strong>, <strong>Königsberg</strong> ve <strong>Ağırlıklı</strong> düğmeleri hazır çizgeler yükler, <strong>Temizle</strong> tuvali boşaltır. Sonuçlar üstteki okuma satırına yazılır. Düğüm taşımak sonucu silmez; düğüm ya da kenar ekleyip silmek ve ağırlık değiştirmek ekrandaki sonucu yeniden hesaplatır.",
    experiments: [
      {
        title: "Königsberg'i Euler gibi say, sonra bugünkü Kaliningrad'ı kur",
        predict:
          "Königsberg örneğinde ada A beş köprüyle, B, C ve D üçer köprüyle bağlı. Euler testi ne diyecek? A ile B arasındaki iki köprüden birini yıkarsan yürüyüş hangi iki kara parçasında başlayıp bitmek zorunda kalır? Ardından A ile C arasındaki köprülerden birini de yıkarsan?",
        do:
          "Königsberg düğmesine bas ve Euler testi'ne tıkla. Sil moduna geç ve A ile B arasındaki iki kavisten birine tıkla; okuma satırı Euler testini kendiliğinden yeniler. Sonra A ile C arasındaki iki kavisten birini de sil.",
        observe:
          "İlk okuma: 'Euler yolu da devresi de yok: 4 düğümün derecesi tek — 0 (A): 5, 1 (B): 3, 2 (C): 3, 3 (D): 3' ve 'Derece toplamı 14 = 2 × 7 kenar'. Bir A–B köprüsü gidince: 'Euler yolu var, devre yok: tek dereceli iki düğüm 2 (C) ve 3 (D)', örnek C → A → B → D → A → C → D. Bir A–C köprüsü de gidince tek dereceliler 0 (A) ve 3 (D) olur, örnek A → B → D → A → C → D; satır 'Derece toplamı 10 = 2 × 5 kenar' der.",
        explain:
          "Her girişin bir çıkışı olmalı; yürüyüşün başlamadığı ve bitmediği her kara parçasının derecesi çift olmalı. Königsberg'de dört derecenin dördü de tek, oysa bir yürüyüşün yalnızca iki ucu var. Bir köprüyü yıkmak ya da eklemek iki ucunun derecesini birer değiştirir. İkinci adım bugünkü Kaliningrad'dır: İkinci Dünya Savaşı'ndaki bombardımanda iki köprü yıkıldı, iki başkası sonradan yerini bir otoyola bıraktı. Euler'in köprülerinin yerinde bugün beş köprü var; iki ada 3'er, iki kıyı 2'şer köprülü. Yürüyüş artık mümkün, ama bir adada başlayıp ötekinde bitmek zorunda.",
      },
      {
        title: "Kuyruk mu, özyineleme mi: Ev Çizgesi'nde BFS ile DFS",
        predict:
          "Ev Çizgesi'nde 0'ın komşuları 1 ve 4'tür. BFS önce bütün komşuları gezer, DFS bir koldan gidebildiği kadar derine iner. 0'dan başlayan DFS'nin ziyaret sırası ne olur, mor kenarlar nasıl bir şekil çizer? Başlangıcı evin sağ üst köşesi 2 yaparsan BFS'nin katmanları nasıl değişir?",
        do:
          "Ev Çizgesi'ni yükle. Arama menüsünde BFS, Başlangıç menüsünde 0 seç ve Çalıştır'a bas; halkaların belirme sırasını izle. Sonra DFS seçip yeniden çalıştır. Ardından Başlangıç'ı 2 yapıp iki aramayı tekrarla.",
        observe:
          "Başlangıç 0: BFS '0 → 1 → 4 → 2 → 3', katmanlar '0: {0} · 1: {1, 4} · 2: {2, 3}'; DFS '0 → 1 → 2 → 3 → 4' ve dört mor kenar tek bir uzun yol çizer. Başlangıç 2: BFS '2 → 1 → 3 → 4 → 0', katmanlar '0: {2} · 1: {1, 3, 4} · 2: {0}'; DFS '2 → 1 → 0 → 4 → 3'. Her aramada okuma satırı '4 kenarlık arama ağacı' der; halkalar yaklaşık üçte bir saniye arayla belirir.",
        explain:
          "BFS kuyruğa giren düğümü hemen işaretler, böylece her düğüm başlangıca en az kaç kenarla ulaşıldığını gösteren katmana bir kez yazılır. DFS bir düğüme girer girmez onu işaretler ve ilk ziyaret edilmemiş komşuya dalar; Ev Çizgesi'nde 0'dan dalan DFS bütün köşeleri tek kolda dolaşır, yani bir Hamilton yolu bulur. Ağaç dışı kenarlar kurala uyar: DFS'de 4–0 ve 4–2, 4'ü atalarına bağlar; BFS'de 2–3 ve 2–4, katmanları en fazla bir farklı düğümleri bağlar.",
      },
      {
        title: "Az kenar mı, az ağırlık mı: BFS ile Dijkstra",
        predict:
          "Ağırlıklı örnekte 0'dan 4'e en az kenarlı yol 0 → 5 → 4'tür: 14 + 15 = 29 birim. BFS ağırlıklara hiç bakmaz. Dijkstra da aynı yolu mu seçer? Sonra 2–5 kenarının ağırlığını 2'den 9'a çıkarırsan rota nereye kayar?",
        do:
          "Ağırlıklı örneği yükle. Arama'da BFS, Başlangıç 0 ile Çalıştır'a bas ve 4'ün katmanına bak. En kısa yol satırında Başlangıç 0, Hedef 4 seçip Dijkstra'ya bas. Sonra Kenar ağırlığı kutusuna 9 yaz, Ağırlık Ver moduna geç ve 2 ile 5 düğümleri arasındaki kenarın üstünde yazan 2'ye tıkla.",
        observe:
          "BFS: '0 → 1 → 5 → 2 → 4 → 3', katmanlar '0: {0} · 1: {1, 5} · 2: {2, 4} · 3: {3}'; mor ağaçta 4'e giden yol 0 → 5 → 4'tür. Dijkstra: '0 → 5 → 2 → 4 · toplam ağırlık 24 · 3 kenar'. Ağırlık değişince okuma satırı '2 ↔ 5 kenarının ağırlığı 2 → 9' yazar ve yolu yeniden hesaplar: '0 → 1 → 2 → 4 · toplam ağırlık 25 · 3 kenar'.",
        explain:
          "BFS 'kaç kenar?', Dijkstra 'kaç birim?' sorusunu cevaplar; ikisi ancak bütün ağırlıklar eşitse aynı yolu verir. 2–5 kenarı ucuzken üç kenarlık yol (24) iki kenarlık yoldan (29) 5 birim ucuzdur. Kenar pahalanınca rota, ilk adımı en ucuz olan 0 → 1 → 2 → 4'e kayar. BFS'yi yeniden çalıştırırsan sonucu değişmez: BFS ağırlık okumaz.",
      },
      {
        title: "Paralel kenarlar: Dijkstra en hafifini seçer",
        predict:
          "Üç düğümlü bir çizgede 0 ile 1 arasında ağırlıkları 5 ve 2 olan iki ayrı kenar, 1–2'de 4, 0–2'de 7 olsun. 0'dan 2'ye en kısa yol hangisi, toplam kaç? Ağırlığı 2 olan kenarı silersen yol nasıl değişir?",
        do:
          "Temizle'ye bas. Düğüm Ekle modunda üç düğümü bir üçgen gibi yerleştir (0, 1, 2). Kenar Ekle moduna geç; kutuya 5 yazıp 0 ile 1'e, 2 yazıp yine 0 ile 1'e, 4 yazıp 1 ile 2'ye, 7 yazıp 0 ile 2'ye tıkla. En kısa yol satırında Başlangıç 0, Hedef 2 seçip Dijkstra'ya bas. Sonra Sil modunda üzerinde 2 yazan kavise tıkla.",
        observe:
          "İkinci 0–1 kenarı eklenince okuma satırı 'Bu iki düğüm arasında artık 2 paralel kenar var' der ve iki ayrı kavis görünür. Dijkstra: '0 → 1 → 2 · toplam ağırlık 6 · 2 kenar · 0–1 arasındaki 2 paralel kenardan en hafifi (2) kullanıldı'; yalnızca üzerinde 2 yazan kavis morlaşır. Silince: '0 ↔ 1 kenarı (ağırlık 2) silindi. Bu iki düğüm arasında 1 kenar kaldı.' ve yeniden hesaplanan yol '0 → 2 · toplam ağırlık 7 · 1 kenar'.",
        explain:
          "Çoklu çizgede iki düğüm arasındaki her kenar ayrı bir seçenektir. Dijkstra 0'ı kesinleştirince iki paralel kenarı da gevşetir: 1'in tahmini önce 5, sonra 2 olur. 1 üzerinden 2 + 4 = 6, doğrudan kenar 7 olduğu için yol 1'den geçer. Hafif kenar gidince 1 üzerinden yol 5 + 4 = 9'a çıkar ve doğrudan kenar kazanır. Euler sayımında ise paralel kenarların hepsi dereceye katılır; Königsberg'in A'sı bu yüzden 5 derecelidir.",
      },
    ],
  },
  wow: [
    {
      title: "Bir kafe terasında, kâğıtsız kalemsiz, yirmi dakika",
      body:
        "Edsger Dijkstra yıllar sonra bir söyleşide, en kısa yol algoritmasını 1956'da Amsterdam'da nişanlısıyla alışverişten yorulup bir kafe terasına oturduklarında, yaklaşık yirmi dakikada ve kâğıt kalem kullanmadan tasarladığını anlatır; yöntemin sadeliğini biraz da buna bağlar. Gösterim için ARMAC'a 64 Hollanda kentinden oluşan sadeleştirilmiş bir harita verdi: 64, çünkü bir kentin numarası altı bite sığıyordu. Yöntem ancak 1959'da, 'Çizgelerle ilgili iki problem üzerine bir not' adlı üç sayfalık bir yazıda yayımlandı. Öteki problem de bir ağaçtı: enstitünün sonraki bilgisayarının arka panelindeki uçları en az kabloyla bağlamak, yani en küçük kapsayan ağaç.",
    },
    {
      title: "Bilgisayar yardımıyla kanıtlanan ilk büyük teorem",
      body:
        "1852'de Francis Guthrie, İngiltere'nin kontluklar haritasını boyarken komşu bölgeleri ayırmak için dört rengin yettiğini fark etti. Harita bir çizgedir: bölgeler düğüm, ortak sınırlar kenar. Kanıt 1976'da geldi: Kenneth Appel ve Wolfgang Haken sorunu bin sekiz yüzü aşkın özel yapılandırmaya indirip her birini bilgisayara denetletti; hesap bin saati aştı. İnsanın baştan sona elle denetleyemediği bir kanıtın kanıt sayılıp sayılamayacağı uzun süre tartışıldı. 1997'de Robertson, Sanders, Seymour ve Thomas yapılandırma sayısını 633'e indirdi; 2005'te Georges Gonthier ve Benjamin Werner kanıtı Coq kanıt denetleyicisinde baştan sona biçimselleştirdi.",
    },
    {
      title: "Her köprüden iki kez geçmek mümkün",
      body:
        "Euler makalesinin 18. bölümünde bir not daha düşer: Königsberg'de her köprüden tam iki kez geçen bir yürüyüş vardır, çünkü her köprü 'sanki ikiye bölünmüş' olur ve her bölgeye inen köprü sayısı çiftleşir. Sayfada dene: Kenar Ekle ile her köprünün yanına bir kenar daha koy (A–B ve A–C için ikişer, öteki üç köprü için birer). Dereceler 10, 6, 6, 6 olur ve Euler testi 'Euler devresi var' der. Fikir her bağlantılı çizgeye genellenir: bütün kenarları ikiye katlarsan bütün dereceler çift olur, yani her kenardan tam iki kez geçen kapalı bir yürüyüş her zaman vardır.",
    },
  ],
  worked: {
    title: "Dijkstra'yı elle izlemek: Ağırlıklı örnekte 0'dan 4'e",
    prompt:
      "Ağırlıklı örnekteki kenarları dakika olarak düşün: 0–1: 7, 0–5: 14, 1–2: 10, 1–5: 9, 2–3: 11, 2–5: 2, 3–4: 6, 4–5: 15, 4–2: 8. 0'dan 4'e en kısa süreyi Dijkstra ile bul ve hedefte durmanın neden güvenli olduğunu açıkla.",
    steps: [
      "Başlangıç: d(0) = 0 dk, öteki beş düğüm ∞. Kesinleşmemişler arasında en küçük tahmin 0'ındır; 0 kesinleşir. Komşuları gevşet: d(1) = 0 + 7 = 7 dk, d(5) = 0 + 14 = 14 dk.",
      "En küçük tahmin 1'in (7 dk); 1 kesinleşir. d(2) = 7 + 10 = 17 dk. 5 için 7 + 9 = 16 dk, 14'ten büyük olduğu için değişmez.",
      "En küçük tahmin 5'in (14 dk); 5 kesinleşir. 2 için 14 + 2 = 16 < 17: d(2) = 16 dk, 'önceki' = 5. 4 için d(4) = 14 + 15 = 29 dk.",
      "En küçük tahmin 2'nin (16 dk); 2 kesinleşir. d(3) = 16 + 11 = 27 dk; 4 için 16 + 8 = 24 < 29: d(4) = 24 dk, 'önceki' = 2.",
      "Şimdi en küçük tahmin hedefin: d(4) = 24 dk, 3'ünki 27 dk. Durmak güvenlidir: 4'e 3 üzerinden giden her yol en az 27 dk tutar ve ağırlıklar negatif olmadığı için ucuzlayamaz. 'Önceki' notlarını geriye izle: 4 ← 2 ← 5 ← 0. Sayfada Başlangıç 0, Hedef 4 ile Dijkstra'ya basınca okuma satırı '0 → 5 → 2 → 4 · toplam ağırlık 24 · 3 kenar' yazar.",
    ],
    result:
      "En kısa yol 0 → 5 → 2 → 4, toplam 24 dakika. Üç kenarlık bu yol, iki kenarlık 0 → 5 → 4'ten (29 dk) ve en ucuz ilk adımla başlayan 0 → 1 → 2 → 4'ten (25 dk) kısadır.",
  },
  misconceptions: [
    {
      myth: "Çizge, fonksiyon grafiği gibi bir şeydir; kenarın ekrandaki uzunluğu da önemlidir.",
      truth:
        "İngilizcede ikisine de 'graph' dense de bunlar farklı nesnelerdir. Fonksiyon grafiğinde eksenler ve koordinatlar vardır; çizgede yalnızca kimin kime bağlı olduğu. Ağırlıklı örnekte Dijkstra'yı çalıştırıp 0 ile 5 düğümlerini birbirine yaklaştır: kenar kısalır ama ağırlığı 14 kalır, mor yol da yerinde durur. Metro haritaları da böyledir: çizimdeki mesafe gerçek mesafe değildir.",
    },
    {
      myth: "En kısa yol, en az kenardan geçen yoldur.",
      truth:
        "Yalnızca bütün kenarlar eşit ağırlıktaysa doğrudur; o zaman BFS ile Dijkstra aynı cevabı verir. Ağırlıklı örnekte BFS 4'ü 2. katmana koyar (0 → 5 → 4, 29 birim), Dijkstra ise üç kenarlık 0 → 5 → 2 → 4'ü (24 birim) seçer.",
    },
    {
      myth: "BFS'nin kuyruğunu yığınla değiştirirsen DFS elde edersin.",
      truth:
        "Tek başına yetmez. BFS düğümü kuyruğa koyarken işaretler; kuyruk yığınla değiştirilip işaretleme yerinde bırakılırsa çıkan ağaç bir DFS ağacı olmayabilir. Ev Çizgesi'nde 0'dan böyle bir arama 0–1, 0–4, 4–2, 4–3 kenarlarını seçer; ağaç dışında kalan 1–2 ve 2–3 kenarları ayrı dalları birbirine bağlar. Yönsüz bir çizgenin DFS ağacında bu olamaz. Gerçek DFS düğümü ziyaret ettiği anda işaretler; sayfadaki DFS böyle çalışır ve 0'dan 0 → 1 → 2 → 3 → 4 yolunu çizer.",
    },
    {
      myth: "Bir çizgede tek dereceli düğüm sayısı herhangi bir sayı olabilir; üç tane de olur.",
      truth:
        "Olamaz. Derecelerin toplamı kenar sayısının iki katıdır, yani çifttir; çift bir toplama ulaşmak için tek sayıların adedi çift olmalıdır. Sayfada ne yaparsan yap, paralel kenar eklesen bile, Euler testi 1, 3 ya da 5 tek dereceli düğüm raporlayamaz.",
    },
  ],
  glossary: [
    { term: "Düğüm (köşe)", definition: "Çizgenin temel nesnesi; şehir, kişi, atom, web sayfası ya da kara parçası gibi herhangi bir şeyi temsil eden nokta." },
    { term: "Kenar ve paralel kenar", definition: "Kenar iki düğüm arasındaki bağlantıdır; aynı iki düğümü bağlayan birden çok kenara paralel kenar, bunlara izin veren çizgeye çoklu çizge denir." },
    { term: "Derece", definition: "Bir düğüme değen kenar sayısı; paralel kenarların her biri ayrı sayılır." },
    { term: "Euler yolu ve devresi", definition: "Her kenarı tam bir kez kullanan, düğümlerden ise istediği kadar geçebilen yürüyüş; başladığı düğümde bitiyorsa devre, bitmiyorsa yol adını alır." },
    { term: "Bağlantılı çizge", definition: "Her düğümden her düğüme bir yolun bulunduğu çizge; Euler testi yalnızca kenarı olan düğümlerin tek parçada olmasını ister." },
    { term: "Ağaç ve kapsayan ağaç", definition: "Döngüsü olmayan bağlantılı çizge ağaçtır; bir çizgenin bütün düğümlerini içeren ağaca kapsayan ağaç denir." },
    { term: "Ağırlıklı çizge", definition: "Her kenarına bir sayı (mesafe, süre, maliyet) atanmış çizge; en kısa yol bu sayıların toplamını en küçükler." },
    { term: "Gevşetme", definition: "Dijkstra'da bir düğümün tahmini uzaklığını, yeni kesinleşen bir komşu üzerinden daha kısa bir yol bulununca küçültme adımı." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Üniversitede çizge kuramı iki kapıdan girer. <strong>Ayrık Matematik</strong> dersinde kendisi bir ispat alanıdır: el sıkışma önermesi gibi çift sayımlar, Euler–Hierholzer teoremi, düzlemsel çizgeler için Euler'in V − E + F = 2 formülü, boyama ve eşleştirme problemleri. <strong>Algoritmalar ve Veri Yapıları</strong> dersinde ise bir araç kutusudur: BFS ve DFS O(|V| + |E|) sürede çalışır; Dijkstra, sayfadaki gibi her adımda bütün düğümleri tarayan hâliyle O(|V|² + |E|), ikili yığınla O((|V| + |E|) log |V|) adım alır. Fark büyük ağlarda ortaya çıkar: on milyon düğümlü, yirmi beş milyon kenarlı bir yol ağında |V|² = 10<sup>14</sup> işlem, saniyede bir milyar işlemle bir günden uzun sürer; (|V| + |E|) log₂ |V| ise yaklaşık 8 × 10<sup>8</sup> işlemdir, bir saniyeden az. <strong>Lineer Cebir</strong> de buraya bağlanır: bir çizge komşuluk matrisi A ile yazılır ve A<sup>k</sup> matrisinin (i, j) girdisi i'den j'ye k kenarlı yürüyüşleri sayar. Kirchhoff'un matris-ağaç teoremi kapsayan ağaçları Laplace matrisinin bir determinantıyla sayar, PageRank ise bağlantılardan kurulan bir geçiş matrisinin baskın özvektörüdür.",
      "Sonra sınırlar başlar. Her kenardan bir kez geçmeyi derece saymak çözer; her düğümden bir kez geçmek (<strong>Hamilton yolu</strong>; adını, 1857'de bir onikiyüzlünün köşelerini dolaştıran Icosian oyununu tasarlayan William Rowan Hamilton'dan alır) için ise bilinen hiçbir polinom zamanlı yöntem yoktur. Gezgin satıcı problemi bu zorluğun simgesidir ve <strong>NP-tamlık</strong> kavramının kalbindedir. Ağırlıklar negatifse Dijkstra yerini Bellman–Ford'a, bütün düğüm çiftleri isteniyorsa Floyd–Warshall'a bırakır; <strong>Yöneylem Araştırması</strong> dersinde aynı çizgeler akış ve atama problemlerine dönüşür. Öte yanda ağ bilimi vardır: Stanley Milgram'ın ilk sonuçlarını 1967'de duyurduğu mektup deneylerinde hedefe ulaşan zincirler ortalama beş buçuk ile altı adım tuttu, ama mektupların çoğu yolda kaldı: bir denemede 296 mektuptan yalnızca 64'ü ulaştı. Watts ve Strogatz 1998'de bu 'küçük dünya' ağlarını, Barabási ve Albert 1999'da az sayıda çok yüksek dereceli düğümün baskın olduğu ölçeksiz ağları modelledi.",
    ],
    topics: ["Ayrık matematik ve çift sayım", "Euler–Hierholzer teoremi", "Düzlemsel çizgeler ve Euler formülü", "Algoritma karmaşıklığı ve öncelik kuyruğu", "Bellman–Ford ve negatif ağırlıklar", "Hamilton yolu ve NP-tamlık", "Laplace matrisi ve matris-ağaç teoremi", "Ağ bilimi: küçük dünya ve ölçeksiz ağlar"],
  },
  quiz: [
    {
      question: "Bir partide 9 kişinin her biri tam 3 kişiyle el sıkışmış olabilir mi?",
      options: ["Evet; 9 kişi bunun için yeterince kalabalık", "Hayır; derecelerin toplamı tek olurdu", "Yalnızca bazı çiftler iki kez el sıkışırsa", "Yalnızca herkes herkesi tanıyorsa"],
      answer: 1,
      explanation: "Kişiler düğüm, el sıkışmalar kenar olsun. Derecelerin toplamı 9 × 3 = 27 çıkar; oysa her el sıkışma iki kişiye sayıldığı için bu toplam kenar sayısının iki katı, yani çift olmalıdır. İki kez el sıkışmak (paralel kenar) da kurtarmaz: her kenar yine iki uçla sayılır. Euler'in kuralı da bu yüzden yalnızca 'hiç', 'iki' ve 'ikiden fazla' tek bölgeden söz eder.",
    },
    {
      question: "Königsberg çizgesine (dereceler A: 5, B: 3, C: 3, D: 3) iki kıyı B ile C arasına yeni bir köprü eklenirse ne olur?",
      options: ["A ile D arasında bir Euler yolu açılır", "B ile C arasında bir Euler yolu açılır", "Bir Euler devresi oluşur", "Hâlâ hiçbir Euler yürüyüşü yoktur"],
      answer: 0,
      explanation: "Yeni köprü B ve C'nin derecesini 4'e çıkarır; A (5) ve D (3) tek kalır. Tam iki tek dereceli düğüm varsa yol vardır ve o ikisinde başlayıp biter. Sayfa da 'tek dereceli iki düğüm 0 (A) ve 3 (D)' der. Devre için bir köprü daha, ör. A–D, gerekir.",
    },
    {
      question: "Dijkstra'nın kesinleştirdiği bir uzaklığın sonradan küçülmeyeceği hangi varsayıma dayanır?",
      options: ["Çizgenin bağlantılı olmasına", "Kenar ağırlıklarının negatif olmamasına", "Paralel kenar bulunmamasına", "Ağırlıkların tam sayı olmasına"],
      answer: 1,
      explanation: "Seçilen düğümün tahmini, kesinleşmemiş her düğümünkinden küçük ya da eşittir; oradan devam eden bir yol ancak negatif bir kenarla ucuzlayabilir. Negatif ağırlık bu zinciri kırar ve Bellman–Ford gerekir. Kopuk çizge, paralel kenar ve kesirli ağırlık sorun değildir: sayfa 'yol yok' der, en hafif paralel kenarı kullanır ve kesirli toplamı yazar.",
    },
  ],
  next: [
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma Algoritmaları", why: "Aynı Dijkstra'yı bir ızgara üzerinde, engellerle ve A* gibi hızlandırmalarla izle." },
    { href: "veri-yapilari.html", title: "Veri Yapıları Laboratuvarı", why: "BFS'yi BFS yapan kuyruk, DFS'nin elle yazılmış hâlindeki yığın: bu yapıların kendisi." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı", why: "O(|V|² + |E|) ile O((|V| + |E|) log |V|) arasındaki fark neden milyon düğümde hayati?" },
    { href: "besin-agi.html", title: "Besin Ağı", why: "Kim kimi yiyor: ekosistem de düğüm ve kenarlardan kurulu yönlü bir çizgedir." },
  ],
  sources: [
    { title: "Wikipedia · Seven Bridges of Königsberg", url: "https://en.wikipedia.org/wiki/Seven_Bridges_of_K%C3%B6nigsberg", note: "Euler'in derece argümanı, 1735 sunumu ve 1741 baskısı, bugünkü beş köprü; Euler makalesinin metnine bağlantı (İngilizce)." },
    { title: "Wikipedia · Eulerian path", url: "https://en.wikipedia.org/wiki/Eulerian_path", note: "Euler ve Hierholzer teoremi, Hierholzer algoritması ve çoklu çizgelerde Euler yürüyüşleri (İngilizce)." },
    { title: "Wikipedia · Dijkstra's algorithm", url: "https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm", note: "Tarihçe, 1956 kafe anekdotu, doğruluk kanıtı ve karmaşıklık analizi (İngilizce)." },
    { title: "MIT OpenCourseWare · 6.042J Mathematics for Computer Science", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/", note: "Lisans düzeyi ayrık matematik dersi: çizgeler, ağaçlar, boyama ve ispat teknikleri; ders videoları ve problem setleri (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
