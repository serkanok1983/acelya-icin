window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["algoritmalar"] = {
  slug: "algoritmalar",
  title: "Algoritmalar: Adımları Sayma Sanatı",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Aynı 40 çubuğu sıralamak için bir yöntem 780 karşılaştırma yapar, öteki 165 dolayında bitirir. Fark bilgisayarın hızında değil, adımların girdiyle nasıl büyüdüğünde gizli.",
  hook:
    "1959'da Moskova'da 25 yaşındaki bir İngiliz öğrenci, makine çevirisi için sözcükleri hızla sıralamak zorundaydı. Bulduğu numara altmış küsur yıl sonra hâlâ pek çok dilin hazır sıralama işlevinin çekirdeğinde duruyor. Peki aynı 40 sayıyı sıralamak neden bir yöntemle 780, ötekiyle 165 karşılaştırma ister; ve bir milyar sayı içinde aranan 30 bakışta nasıl bulunur?",
  bigIdea:
    "Bir algoritmanın kalitesi tek bir girdideki hızı değil, girdi büyüdükçe <strong>adım sayısının nasıl büyüdüğüdür</strong>: log n, n, n log n, n² ve 2ⁿ arasındaki fark, bilgisayarın hızından çok daha önemlidir.",
  story: [
    "Algoritma bilgisayardan çok daha yaşlıdır. MÖ 300 civarında Öklid, <em>Elementler</em>'in VII. kitabında iki sayının en büyük ortak bölenini bulan bir yöntem yazdı: büyüğü küçüğe böl, kalanla devam et, kalan sıfır olunca dur. Bu yöntem bugün bilgisayarının her güvenli bağlantısında, RSA anahtarları üretilirken hâlâ çalışır. Sözcüğün kendisi ise 9. yüzyıl Bağdat'ından gelir: matematikçi Muhammed bin Musa el-Harezmî (yaklaşık 780–850), Hint rakamlarıyla hesap yapmayı anlatan bir kitap yazdı. Kitabın Arapça aslı kayıp; elimizdeki 12. yüzyıl Latince çevirisi <em>Dixit Algorizmi</em>, yani 'Harezmî dedi ki' sözleriyle açılır. Çevirmenler yazarın adını Latinceye böyle uydurmuştu. Adım adım hesap yöntemlerine o günden beri <strong>algoritma</strong> deniyor. Aynı yazarın başka bir kitabının adındaki 'el-cebr' sözcüğü de cebir oldu.",
    "1843'te Ada Lovelace, Charles Babbage'ın hiç inşa edilemeyen Analitik Makinesi için Bernoulli sayılarını hesaplayan bir adım dizisi yayımladı; çoğu tarihçi bunu bir makine için yazılmış ilk program sayar. Program hiç çalışmadı, çünkü makine yoktu. 1936'da Alan Turing, 'mekanik bir yöntem' sözünün tam olarak ne demek olduğunu matematiksel biçimde tanımladı ve şaşırtıcı bir şey kanıtladı: bazı soruların hiçbir algoritmayla çözülemeyeceğini. Algoritma kavramı o gün bir tarif olmaktan çıkıp bir bilim nesnesi oldu.",
    "Bilgisayarlar gelince sıralama ilk büyük problem oldu. 1945'te John von Neumann, henüz yapılmamış EDVAC bilgisayarı için bir birleştirmeli sıralama programı yazdı; Donald Knuth'a göre bu, kayıtlı programlı bir bilgisayar için yazılan ilk programlardan biridir. 1956'da Edsger Dijkstra, Amsterdam'da bir kafede, kendi anlatımına göre kâğıt kalem kullanmadan yirmi dakikada en kısa yol algoritmasını tasarladı. 1959'da Tony Hoare, Moskova Devlet Üniversitesi'nde misafir öğrenciyken bir makine çevirisi projesi için sözcükleri sıralamanın hızlı bir yolunu ararken <strong>Quicksort</strong>'u buldu; 1961'de yayımladı. 1968'de Knuth'un <em>The Art of Computer Programming</em>'i algoritmaların adımlarını saymayı başlı başına bir bilim hâline getirdi.",
    "Bugün bir harita uygulaması rota çizerken, bir arama motoru sonuç sıralarken, bir oyun karakteri yol bulurken bu sayfadaki fikirlerin büyütülmüş sürümleri çalışır. Ölçek inanılmazdır: bir milyon kaydı kabarcık sıralamasıyla sıralamak yaklaşık 5×10¹¹ karşılaştırma ister, birleştirmeli sıralamayla yaklaşık 2×10⁷; aradaki fark 25 000 kat. Bu farkı donanımla kapatamazsın; ancak daha iyi bir fikirle kapatırsın.",
  ],
  core: [
    {
      heading: "Algoritma: sonlu, kesin, her girdide çalışan tarif",
      body:
        "Bir yemek tarifi 'bir tutam' derken algoritma 'tam 3 gram' der. Her adım belirsizliksiz olmalı, adımlar bir gün bitmeli ve yöntem yalnızca denediğin örnekte değil, geçerli <em>her</em> girdide doğru sonuç vermeli. Öklid'in yöntemi bunun en eski örneğidir: 1071 ile 462'nin en büyük ortak bölenini bulmak için 1071 = 2×462 + 147, 462 = 3×147 + 21, 147 = 7×21 + 0 yazarsın; son sıfırdan önceki kalan, 21, cevaptır. Üç bölme, bitti. Sayfadaki sıralama sekmelerinin her biri de aynı sorunun (küçükten büyüğe diz) farklı bir tarifidir; hepsi doğru sonuca varır ama aynı sayıda adımla değil.",
      formula: "ebob(a, b) = ebob(b, a mod b), ebob(a, 0) = a",
      formulaNote: "a mod b, a'nın b'ye bölümünden kalandır. Her adımda kalan küçüldüğü için yöntem mutlaka biter.",
    },
    {
      heading: "Saniye değil, adım say: O-gösterimi",
      body:
        "Kabarcık sıralaması 40 çubuk için her seferinde tam 780 karşılaştırma yapar; çünkü dıştaki döngü 39 tur atar ve turlar 39, 38, …, 1 karşılaştırma içerir. Toplam n(n−1)/2'dir. n'i 10 katına çıkarırsan bu sayı yaklaşık 100 katına çıkar; işte <strong>O(n²)</strong> bunu söyler. Birleştirmeli sıralama diziyi ikiye böle böle log₂n katman oluşturur ve her katmanda en çok n karşılaştırma yapar: <strong>O(n log n)</strong>. Bunu bir yineleme bağıntısı özetler: T(n) = 2T(n/2) + (n − 1); iki yarıyı sırala, sonra en çok n − 1 karşılaştırmayla birleştir. n = 40'ta sayfada çoğunlukla 159–171, en kötü durumda 177 karşılaştırma görürsün. Çok daha iyisi mümkün mü? Hayır: yalnızca karşılaştırarak sıralayan hiçbir yöntem 40 elemanı en kötü durumda ⌈log₂ 40!⌉ = 160 karşılaştırmadan azla garanti edemez. Birleştirmeli sıralamanın en kötüsü olan 177, bu sınırın yalnızca 17 üstündedir.",
      formula: "n(n−1)/2 = 780 (n = 40) · n log₂n ≈ 213 (n = 40)",
      formulaNote: "O-gösterimi sabitleri ve küçük terimleri atar; iki algoritmanın büyüme biçimini karşılaştırır, saniyesini vermez.",
    },
    {
      heading: "Yarıya bölmenin gücü: logaritma",
      body:
        "Sıralı bir listede ortadaki elemana bakarsın; aradığın ondan küçükse sol yarı, büyükse sağ yarı kalır. Her bakış listeyi yarıya indirir. 20 elemanlık sayfa dizisi 20 → 10 → 5 → 2 → 1 → 0 diye erir; en çok 5 bakış. Bir milyon eleman için 20, bir milyar için 30 bakış yeter; çünkü 2³⁰ ≈ 1,07 milyar. Doğrusal arama ise en kötü durumda her elemana bakar: bir milyar bakış. Tek şart listenin sıralı olmasıdır; aynı numara sözlükte, telefon rehberinde ve bir sayının karekökünü bulurken de çalışır.",
      formula: "en çok adım = ⌊log₂ n⌋ + 1",
      formulaNote: "n = 20 için ⌊4,32⌋ + 1 = 5; n = 10⁹ için ⌊29,9⌋ + 1 = 30.",
    },
    {
      heading: "Özyineleme ve aynı işi tekrar tekrar yapmak",
      body:
        "Fibonacci'nin tanımı kendini çağırır: F(n) = F(n−1) + F(n−2). Bunu olduğu gibi koda dökersen F(6) için 25 çağrı yapılır ve F(2) beş kez, sıfırdan hesaplanır; sayfadaki çağrı ağacında bunu sayabilirsin. Çağrı sayısı C(n) = C(n−1) + C(n−2) + 1 kuralıyla büyür ve kapalı biçimi C(n) = 2F(n+1) − 1'dir: n = 40 için 331 160 281 çağrı. Her sonucu bir tabloya yazıp ikinci kez sorulduğunda tablodan okursan (<strong>memoizasyon</strong>) aynı iş 39 toplamaya iner. Sayfanın 'O(2ⁿ)' etiketi kaba bir üst sınırdır; gerçek büyüme oranı altın oran φ ≈ 1,618'dir, yani n'i 5 artırmak süreyi φ⁵ ≈ 11 katına çıkarır.",
      formula: "C(n) = 2·F(n+1) − 1 · F(n) ≈ φⁿ/√5",
      formulaNote: "C(40) = 2·165 580 141 − 1 = 331 160 281. Memoizasyonla aynı sonuç n − 1 toplamayla bulunur.",
    },
    {
      heading: "Kuyruk mu, yığın mı: BFS ve DFS",
      body:
        "Bir grafı keşfederken sıradaki düğümü nereden aldığın her şeyi belirler. <strong>BFS</strong> bir kuyruk kullanır: ilk eklenen ilk çıkar, bu yüzden grafı katman katman tarar ve başlangıca en yakın düğümleri önce bulur. Ağırlıksız bir grafta BFS'in bir düğüme ilk ulaştığı an, o düğüme giden en az kenarlı yoldur. <strong>DFS</strong> bir yığın (ya da özyineleme) kullanır: son eklenen ilk çıkar, bu yüzden bir dalın dibine kadar iner, sonra geri döner. Sayfadaki grafta A'dan J'ye en kısa yol 3 kenardır (A→C→F→J); BFS J'yi üçüncü katmanda bulurken DFS ona 8 kenarlık dolambaçlı bir yoldan varır. İkisi de her düğümü tam bir kez ziyaret eder; komşular bir komşuluk listesinde tutulursa toplam iş O(düğüm + kenar) olur.",
      formula: "BFS: kuyruk (ilk giren ilk çıkar) · DFS: yığın (son giren ilk çıkar)",
      formulaNote: "Kenarlara ağırlık eklendiğinde BFS yetmez; sırayı 'en ucuz önce' yapan Dijkstra devreye girer.",
    },
  ],
  lab: {
    intro:
      "Sayfada yedi panel var. Sıralama panelinde beş sekme (<strong>Bubble, Selection, Insertion, Merge, Quick</strong>), <strong>▶ Başlat</strong>, <strong>↺ Yeni Dizi</strong> ve animasyonu dört kat hızlandıran <strong>⚡ Hızlı</strong> düğmeleri; dizi her zaman 40 çubuktur, değerler 10–89 arası rastgeledir ve altta <strong>Karşılaştırma</strong> ile <strong>Yer Değiştirme</strong> sayaçları akar. Dikkat: Başlat diziyi yenilemez, elindeki diziyi sıralar; sekme değiştirmek ve Yeni Dizi yeniler. Yer Değiştirme sayacı her sekmede aynı şeyi saymaz (Insertion'da kaydırma, Merge'de sağ parçadan alınan eleman). Arama panelinde <strong>Hedef</strong> kutusu (varsayılan 42), <strong>Doğrusal Ara</strong>, <strong>İkili Ara</strong> ve <strong>↺ Sıfırla</strong>; dizi 20 sıralı sayıdır (5–84 arası, tekrar edebilir); iki arama düğmesi aynı dizide çalışır, yeni diziyi yalnızca Sıfırla çeker. Özyineleme panelinde <strong>Fibonacci(6)</strong> ve <strong>Faktöriyel(5)</strong>, dinamik programlama panelinde <strong>n =</strong> kutusu (5–45) ve <strong>Karşılaştır</strong>, graf panelinde <strong>BFS/DFS</strong> sekmeleri ve <strong>▶ Keşfe Başla</strong> var; keşif her zaman A'dan başlar. Big-O grafiğinin yatay ekseni n = 0–20, düşey ekseni 0–120 adımdır; 120'yi aşan eğriler tavanda kırpılır. Paradigma kartlarına tıklayınca altta kısa bir açıklama açılır.",
    experiments: [
      {
        title: "780 sabit; sıralı diziye Quick'in tuzağı",
        predict:
          "Bubble sekmesinde Karşılaştırma sayacı diziye göre değişir mi? Sıralama bittikten sonra aynı diziye bir kez daha Başlat dersen sayaçlar ne gösterir? Aynı şeyi Quick ile yaparsan?",
        do:
          "Bubble sekmesinde ⚡ Hızlı'ya bas, Başlat'a bas ve bitmesini bekle (yaklaşık 5 saniye). Sayaçları not et; Yeni Dizi deyip tekrarla. Sonra sıralanmış diziyle bir kez daha Başlat. Ardından Quick sekmesine geç: önce rastgele diziyi sırala, bitince aynı sıralı diziye tekrar Başlat.",
        observe:
          "Bubble her seferinde tam 780 karşılaştırma yapar; Yer Değiştirme genellikle 300–460 arasında, ortalama 385 çıkar. Sıralı diziye ikinci Başlat: yine 780 karşılaştırma, 0 yer değiştirme. Quick rastgele dizide çoğunlukla 160–235 karşılaştırmayla biter (ortanca 187); sıralı diziye ikinci kez uygulandığında ise çoğunlukla 540–700 karşılaştırma (ortanca 624) ve ona yakın sayıda yer değiştirme gösterir: kendi rastgele sonucunun üç katı, Bubble'ın 780'ine yakın. Merge rastgele dizide 159–171 dolayında kalır, sıralı dizide 116'ya iner.",
        explain:
          "Kabarcık kodu erken çıkış yapmaz; karşılaştırma sayısı 40·39/2 = 780'e kilitlidir, yer değiştirme sayısı ise dizideki ters sıralı çiftlerin sayısıdır (sıralı dizide sıfır). Quick her parçanın son elemanını pivot seçer; sıralı dizide pivot hep en büyük olur ve dizi 39-0, 38-0, … diye dengesiz bölünür. 40 değer birbirinden farklı olsaydı karşılaştırma tam 780 çıkardı; dizide tekrarlar hemen her zaman bulunduğundan pivota eşit elemanlar sağ parçaya düşer ve sayı biraz azalır. Gerçek kütüphaneler pivotu bu yüzden rastgele ya da birkaç adayın ortancasından seçer.",
      },
      {
        title: "Aynı dizide 20 bakış mı, 5 bakış mı?",
        predict:
          "Dizide hiç bulunmayan 99'u ararsan doğrusal arama kaç adım atar, ikili arama kaç adım? En sağdaki çubuğun değerini ararsan? Peki en soldaki çubuğu ararken hangisi kazanır?",
        do:
          "Hedef kutusuna 99 yaz; Doğrusal Ara'ya bas, animasyon bitince (yaklaşık 4 saniye) alt satırdaki adım sayısını oku, sonra İkili Ara'ya bas. Aynısını 1 ile, ardından çubukların üstünde yazan en sağdaki ve en soldaki değerle tekrarla. Dizi sen Sıfırla demedikçe değişmez.",
        observe:
          "Hedef 99: doğrusal 20 adım, ikili 5 adım, ikisi de 'bulunamadı'. Hedef 1: doğrusal 20, ikili 4. En sağdaki değer: doğrusal 20 adım (değer tekrar ediyorsa ilk kopyada, bir-iki adım erken durur), ikili en çok 5. En soldaki değer: doğrusal 1 adım, ikili 3–4 adım; burada doğrusal arama kazanır. Hangi hedefi verirsen ver ikili arama 5'i geçmez. Varsayılan 42 ise dizilerin yalnızca beşte birinde bulunur.",
        explain:
          "Doğrusal arama bulamayınca 20 elemanın hepsine bakmak zorundadır; aranan baştaysa tek bakışta bitirir. Demek ki adım sayısı 1 ile n arasında gezer: en iyi durum O(1), en kötü durum O(n). İkili arama ilk bakışını hep ortaya (10. çubuğa) yapar, bu yüzden en soldaki elemana bile birkaç adımda iner; ama 20 → 10 → 5 → 2 → 1 → 0 diye yarıladığı için en kötü durumu ⌊log₂20⌋ + 1 = 5 bakıştır. Sola giden yarı hep bir eleman kısa kaldığından 1'i 4 adımda, 99'u 5 adımda eler. 42'nin dizide olma olasılığı 1 − (79/80)²⁰ ≈ 0,22'dir.",
      },
      {
        title: "Beş adım ileri, on bir kat yavaş",
        predict:
          "n = 30, 35 ve 40 için naif özyinelemenin süreleri hangi oranla büyür? Dinamik programlama kutusu kaç milisaniye gösterir? n = 45 girersen iki kutu aynı sayıyı mı yazar?",
        do:
          "Önce Özyineleme panelinde Fibonacci(6)'ya bas ve ağaçta fib(2)'nin kaç kez hesaplandığını say. Sonra n kutusuna sırayla 30, 35, 40 yazıp Karşılaştır'a bas; her seferinde iki süreyi ve sonucu not et. En son 45 gir.",
        observe:
          "Ağaçta fib(2) beş kez, toplam 25 çağrı görünür. Naif süre her +5'te kabaca 11 katına çıkar: 30'da on milisaniye dolayı, 35'te yüz milisaniye dolayı, 40'ta bir-iki saniye (cihaza göre değişir); sonuç 102 334 155'tir (sayfa basamakları tarayıcının diline göre nokta ya da virgülle ayırır). DP kutusu her n'de 1 ms'nin altında kalır. n = 45'te DP 1 134 903 170 yazarken naif kutu yine 102 334 155 gösterir ve süresinin yanına 'naif hesap n = 40'ta kesildi' notunu düşer.",
        explain:
          "Çağrı sayısı C(n) = 2F(n+1) − 1: n = 30, 35, 40 için 2,7 milyon, 29,9 milyon, 331 milyon. Oran φ⁵ ≈ 11,09. Memoizasyon her alt problemi bir kez çözer: n − 1 toplama (n = 40 için 39), ölçülemeyecek kadar kısa. n = 45'teki uyumsuzluk sayfanın bilinçli korumasıdır: naif hesap 40'ta kesilir, yoksa sekme on beş saniye kadar kilitlenirdi. Naif F(45) 3,67 milyar çağrı isterdi.",
      },
      {
        title: "Katman katman mı, dibe kadar mı?",
        predict:
          "BFS A'dan başlarsa düğümleri hangi sırayla keşfeder? DFS? J'ye hangisi daha az kenarla varır? Her iki yöntem de 10 düğümün hepsini görür mü?",
        do:
          "BFS sekmesinde ▶ Keşfe Başla'ya bas; her düğümün altında beliren #numaraları ve alttaki 'kuyrukta … düğüm var' mesajını izle. Bittiğinde keşif sırasını not et. ↺ Sıfırla, DFS sekmesine geç ve tekrarla.",
        observe:
          "BFS: A → B → C → D → E → F → G → I → H → J; alt satırdaki 'kuyrukta … düğüm var' sayısı 0, 1, 2, 2, 3, 3, 3, 2, 1, 0 diye yükselip iner. DFS: A → B → D → G → E → C → F → H → J → I; dokuzuncu olarak J'ye varıp I'ya en sona döner. İkisi de 10 düğümü tam bir kez ziyaret eder. BFS'te J üçüncü katmandadır (3 kenar), DFS'in J'ye giden izi 8 kenardır.",
        explain:
          "BFS kuyruğu A'nın komşuları B ve C ile başlar, onların komşularıyla devam eder; A'ya uzaklık 1 olan düğümler, 2 olanlardan önce çıkar. Mesajdaki sayı, düğüm kuyruktan alındıktan hemen sonraki boydur. Bu yüzden ağırlıksız grafta bir düğüme ilk varış en kısa yoldur. DFS ise kenar listesindeki ilk ziyaret edilmemiş komşuya hemen dalar: A-B-D-G-E-C-F-H-J zinciri biter, sonra geri dönüp G'nin öteki komşusu I'yı bulur. Sıra, kenar listesinin yazılışına bağlıdır; liste değişse sıra da değişirdi.",
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
        "2006'da Java'nın standart kütüphanesindeki ikili arama ve birleştirmeli sıralama kodunda bir hata açıklandı: ortayı bulan (alt + üst) / 2 toplama işlemi, bir milyardan (2³⁰'dan) fazla elemanlı dizilerde taşıyor ve negatif indeks üretiyordu. Hata yaklaşık dokuz yıl fark edilmeden durmuştu; kodu yazan Joshua Bloch, aynı tuzağı Jon Bentley'nin 1986 tarihli <em>Programming Pearls</em> kitabındaki örneğin de taşıdığını yazdı. Beş satırlık bir algoritma bile 'her girdide doğru' olmayı zor kılar.",
    },
    {
      title: "Otuz altı bin yıl ile bir göz kırpması arası",
      body:
        "Naif özyinelemeyle F(100) hesaplamak 2F(101) − 1 ≈ 1,15 × 10²¹ çağrı ister. Saniyede bir milyar çağrı yapan bir bilgisayar bunu yaklaşık 36 000 yılda bitirir; bin kat hızlı bir makine 36 yılda. Aynı sayıyı memoizasyonla 99 toplama verir: F(100) = 354 224 848 179 261 915 075. Donanım 1000 kat, algoritma 10¹⁹ kat kazandırdı.",
    },
  ],
  worked: {
    title: "Fibonacci(40): kaç çağrı, kaç saniye?",
    prompt:
      "Sayfadaki naif özyineleme n = 40 için kaç fonksiyon çağrısı yapar? Bir çağrı yaklaşık 4 ns sürerse ekranda kaç saniye görmeyi beklersin? Dinamik programlama kaç işlemle aynı sonuca ulaşır?",
    steps: [
      "Çağrı sayısını tanımla: n ≤ 1 için tek çağrı, C(0) = C(1) = 1. n ≥ 2 için fonksiyon kendini iki kez çağırır: C(n) = C(n−1) + C(n−2) + 1. Küçükleri hesapla: C(2) = 3, C(3) = 5, C(4) = 9, C(5) = 15, C(6) = 25. Sayfadaki Fibonacci(6) ağacında 12 'çağrılıyor…' satırı ile 13 'temel durum' satırı vardır: 12 + 13 = 25 çağrı; sayarak doğrula.",
      "Örüntüyü yakala: 3, 5, 9, 15, 25 sayıları 2F(n+1) − 1'dir; F(7) = 13 için 2·13 − 1 = 25. Demek ki C(40) = 2·F(41) − 1 = 2·165 580 141 − 1 = 331 160 281 çağrı.",
      "Süreyi tahmin et: 331 160 281 çağrı × 4 ns/çağrı ≈ 1,32 × 10⁹ ns ≈ 1,3 s. Bir çağrının süresi tarayıcıya ve işlemciye göre birkaç nanosaniye ile on nanosaniye arasında oynar; ekranda 1–3 saniye arası bir değer olağandır. Sonuç: F(40) = 102 334 155.",
      "Memoizasyonla: her F(k), k = 2…40, bir kez hesaplanır; 39 toplama. Bir toplama birkaç nanosaniye sürer, tablo erişimleriyle birlikte toplam 1 ms'nin çok altındadır; sayfa çoğunlukla 0.1 ms ya da daha küçük bir değer gösterir.",
      "Ölçeklendir: n'i 5 artırmak çağrı sayısını φ⁵ ≈ 11,09 katına çıkarır. C(45) ≈ 3,67 milyar çağrı ≈ 15 s; sayfa bu yüzden naif hesabı 40'ta durdurur.",
    ],
    result:
      "Naif yöntem 331 160 281 çağrı ve yaklaşık bir-iki saniye; memoizasyon 39 toplama ve bir milisaniyeden az. Aynı cevap, 8 milyon kat fark.",
  },
  misconceptions: [
    {
      myth: "O(n log n) bir algoritma her girdide O(n²) olandan hızlıdır.",
      truth:
        "O-gösterimi büyük n için büyüme biçimini söyler, küçük n'de kimin önde olduğunu değil. Sayfada 40 elemanda Insertion ortalama 420 karşılaştırma yaparken Merge 165 yapar; ama Insertion ek bellek kullanmaz ve küçük parçalarda sabitleri daha ufaktır. Python'un Timsort'u ve Java'nın sıralayıcısı tam bu yüzden kısa parçaları eklemeli sıralamayla bitirir.",
    },
    {
      myth: "Özyineleme yavaştır; döngü her zaman daha iyidir.",
      truth:
        "Yavaş olan özyineleme değil, aynı alt problemi tekrar tekrar çözmektir. Merge Sort ve Quick Sort özyinelemelidir ve en hızlı sıralamalar arasındadır; her çağrı farklı bir parçayı işler. Naif Fibonacci'yi öldüren şey F(2)'nin beş kez hesaplanmasıdır; memoizasyon özyinelemeyi korur, tekrarı siler.",
    },
    {
      myth: "İkili arama her listede çalışır.",
      truth:
        "Yalnızca sıralı listede çalışır; sayfadaki arama dizisi bu yüzden hep sıralı gelir. Sıralamak n log n adım ister; tek bir arama yapacaksan doğrusal aramanın n adımı daha ucuzdur. İkili arama, aynı listede çok sayıda arama yapacağında kazandırır.",
    },
    {
      myth: "Bilgisayarlar hızlandıkça algoritma seçimi önemini yitirir.",
      truth:
        "Tam tersi: girdi büyüdükçe fark açılır. Naif F(100) saniyede milyar çağrıyla 36 000 yıl sürer; bin kat hızlı makine bunu 36 yıla indirir, memoizasyon ise bir mikrosaniyeye. Donanım sabit bir çarpan verir, algoritma büyüme biçimini değiştirir.",
    },
  ],
  glossary: [
    { term: "Algoritma", definition: "Bir problemi, her geçerli girdide sonlu sayıda kesin adımla çözen yöntem." },
    { term: "O-gösterimi (Big-O)", definition: "Adım sayısının girdi büyüklüğü n ile hangi biçimde büyüdüğünü sabitleri atarak yazan gösterim; O(n²), O(n log n), O(log n) gibi." },
    { term: "Logaritma (log₂ n)", definition: "n'i 1'e indirmek için kaç kez yarıya bölmek gerektiğini söyleyen sayı; log₂ 1 024 = 10." },
    { term: "Özyineleme", definition: "Bir fonksiyonun aynı problemin daha küçük bir örneği için kendini çağırması." },
    { term: "Temel durum", definition: "Özyinelemenin kendini çağırmadan doğrudan cevap verdiği en küçük girdi; onsuz çağrılar hiç bitmez." },
    { term: "Memoizasyon", definition: "Bir alt problemin cevabını ilk hesapta bir tabloya yazıp sonraki sorularda tablodan okuma; dinamik programlamanın temel aracı." },
    { term: "Pivot", definition: "Quick Sort'un diziyi 'küçükler sola, büyükler sağa' diye böldüğü referans eleman; seçimi dengeyi belirler." },
    { term: "Kuyruk ve yığın", definition: "İki bekleme listesi: kuyrukta ilk giren ilk çıkar (BFS), yığında son giren ilk çıkar (DFS)." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede bir algoritma 'çalışıyor' demek yeterlidir; lisansta iki soru daha sorulur: <strong>neden her girdide doğru</strong> ve <strong>tam olarak kaç adım</strong>? İlkine döngü değişmeziyle cevap verilir: 'her turun sonunda ilk i eleman sıralıdır' gibi, baştan sona doğru kalan bir cümle. İkincisine yineleme bağıntılarıyla: birleştirmeli sıralama için T(n) = 2T(n/2) + n yazılır ve Master teoremi bunun n log n büyüdüğünü söyler. Sonra bir alt sınır gelir: her karşılaştırma iki yola ayrılan bir karar ağacı kurar; n! sıralamayı ayırt etmek için ağacın derinliği en az log₂(n!) ≈ n log₂n − 1,44n olmalıdır. Hiçbir karşılaştırma sıralaması bunu aşamaz; birleştirmeli sıralama neredeyse ona dokunur.",
      "Oradan sonra yol çatallanır. Dijkstra ve A* ağırlıklı graflarda en kısa yolu bulur. Dinamik programlama, sırt çantası ve dizi hizalama gibi alt problemleri çakışan soruları çözer. Rastgele algoritmaların analizi ise Quick Sort'un pivot şansını beklenen değer hesabına bağlar: rastgele pivotla beklenen karşılaştırma sayısı yaklaşık 2n ln n ≈ 1,39 n log₂n'dir. En büyük soru ise hâlâ açıktır: cevabı hızla doğrulanabilen her problem hızla çözülebilir mi? Bu, P ile NP'nin eşit olup olmadığı sorusudur ve 1971'den beri kimse yanıtlayamadı. Bu sayfadaki 331 milyon çağrı ile 39 toplama arasındaki uçurum, o sorunun küçük bir modelidir.",
    ],
    topics: ["Döngü değişmezi ve doğruluk ispatı", "Yineleme bağıntıları ve Master teoremi", "Karşılaştırmalı sıralama alt sınırı", "Dijkstra ve A*", "Dinamik programlama", "Rastgele algoritmalar", "P ve NP"],
  },
  quiz: [
    {
      question: "Sayfadaki 40 çubuklu dizide kabarcık sıralaması kaç karşılaştırma yapar?",
      options: ["40", "385", "780", "1600"],
      answer: 2,
      explanation: "Kod erken çıkış yapmadığı için karşılaştırma sayısı diziden bağımsızdır: 39 + 38 + … + 1 = 40·39/2 = 780. 385 civarı olan şey ortalama yer değiştirme sayısıdır.",
    },
    {
      question: "Naif özyinelemeli Fibonacci bir bilgisayarda n = 40 için 1,3 saniye sürüyor. Aynı kod n = 50 için yaklaşık ne kadar sürer?",
      options: ["Yaklaşık 1,6 saniye", "Yaklaşık 13 saniye", "Yaklaşık 2,5 dakika", "Yaklaşık 22 dakika"],
      answer: 2,
      explanation: "Çağrı sayısı n'deki her artışta φ ≈ 1,618 katına çıkar; on adım φ¹⁰ ≈ 123 kat demektir: 1,3 s × 123 ≈ 160 s. 22 dakika, sayfadaki kaba O(2ⁿ) etiketini harfiyen alıp 2¹⁰ = 1024 ile çarpınca çıkar; gerçek büyüme tabanı 2 değil φ'dir.",
    },
    {
      question: "Ağırlıksız bir grafta başlangıçtan bir düğüme en az kenarlı yolu hangisi garanti eder?",
      options: ["Yalnızca DFS", "Yalnızca BFS", "Her ikisi de", "Hiçbiri; Dijkstra gerekir"],
      answer: 1,
      explanation: "BFS kuyruk sayesinde düğümleri başlangıca uzaklık sırasıyla keşfeder; bir düğüme ilk varış en kısa yoldur. DFS sayfadaki J'ye 8 kenarlık yoldan varır, oysa en kısa yol 3'tür. Dijkstra ağırlıklı kenarlar için gerekir.",
    },
  ],
  next: [
    { href: "siralama-algoritmalari.html", title: "Sıralama: Adımlar ve Kararlılık", why: "Kabarcık, seçmeli ve eklemeli sıralamayı etiketli kayıtlarda adım adım izle: eşit anahtarlar yer değiştiriyor mu, hangi bölge kesinleşti, döngü değişmezi ne diyor?" },
    { href: "siralama-yarisi.html", title: "Sıralama Yarışı: Aynı Girdi, Farklı İş", why: "Kabarcık, son-pivotlu hızlı ve birleştirmeli sıralama aynı dizinin kopyasında yarışır; karşılaştırmalar, ana diziye ve tampona yazmalar ayrı sayılır." },
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma: Az Adım mı, Az Maliyet mi?", why: "BFS'in yetmediği yer: hücre bedelleri farklı bir ızgarada BFS en az adımı, Dijkstra ve A* en az maliyeti bulur; aynı haritada karşılaştır." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme", why: "O, Ω ve Θ'yı birbirinden ayır; en kötü, ortalama ve amorti edilmiş analizin hangi soruyu yanıtladığını büyüme sınıfları karşılaştırıcısıyla gör." },
  ],
  sources: [
    { title: "MIT OpenCourseWare · 6.006 Introduction to Algorithms (Spring 2020)", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", note: "Ders videoları ve notlar: sıralama, ikili arama, graf taraması, dinamik programlama (İngilizce, açık ders)." },
    { title: "Khan Academy · Algorithms", url: "https://www.khanacademy.org/computing/computer-science/algorithms", note: "İkili arama, asimptotik gösterim, özyineleme, sıralama ve BFS üzerine lise düzeyinde etkileşimli ders (İngilizce)." },
    { title: "Vikipedi · Algoritma", url: "https://tr.wikipedia.org/wiki/Algoritma", note: "Terimin kökeni (el-Harezmî), tarihçe ve temel sınıflandırma, Türkçe." },
    { title: "Wikipedia · Big O notation", url: "https://en.wikipedia.org/wiki/Big_O_notation", note: "O-gösteriminin kesin tanımı, sık karşılaşılan büyüme sınıfları ve örnekler (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
