window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["veri-yapilari"] = {
  slug: "veri-yapilari",
  title: "Veri Yapıları: Doğru Rafı Seçmek",
  field: "Bilgisayar Bilimi",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Aynı veriyi beş farklı rafa diz ve her işlemin bedelini say: kopyalanan eleman, izlenen işaretçi, yoklanan yuva, yapılan karşılaştırma. Sayacın yanında kuramın söylediği sayı durur.",
  hook:
    "Bin sayfalık bir sözlükte 'zürafa'yı bulmak için birinci sayfadan başlamazsın; kitabı ortasından açar, yarısını tek bakışta elersin ve en çok on açışta doğru sayfadasındır. Peki bir bilgisayar, dünyadaki sekiz milyar insanın listesinde bir ismi kaç adımda bulur? Cevap listenin büyüklüğüne değil, nasıl saklandığına bağlıdır: yanlış rafta sekiz milyar adım, doğru rafta otuz üç.",
  bigIdea:
    "Bir <strong>veri yapısı</strong> yalnızca veriyi saklamaz; hangi işlemin ucuz, hangisinin pahalı olacağını belirleyen bir sözleşmedir. Dizi erişimi, bağlı liste uçlara eklemeyi, hash tablosu aramayı, ağaç sıralı tutmayı ucuzlatır; hiçbiri her şeyi birden ucuzlatamaz.",
  story: [
    "1945'te John von Neumann, EDVAC raporunda bilgisayar belleğini numaralı hücrelerden oluşan tek bir sıra olarak tarif etti. <strong>Dizi</strong> bu fikrin doğrudan çocuğudur: yan yana hücreler, bir başlangıç adresi ve bir çarpma işlemiyle istediğin elemana tek adımda ulaşırsın. Ama daha o yıllarda bu sıranın yetmediği görüldü. Alan Turing, 1945 sonunda yazıp 1946'da sunduğu ACE raporunda, bir alt programa dalarken dönüş adresini 'gömmek' (bury) ve işi bitince 'çıkarmak' (unbury) gerektiğini yazdı; bugün buna <strong>yığın</strong> diyoruz. 1957'de Münih'te Friedrich Bauer ve Klaus Samelson aynı fikri formül çözümlemek için kullandı ve 'Keller' (mahzen) ilkesi adıyla patent başvurusu yaptı; Avustralya'da Charles Hamblin aynı yıl bağımsız olarak aynı yapıya ulaştı.",
    "Bağlı liste bir yapay zekâ programının ihtiyacından doğdu. 1955–56'da RAND Corporation'dan Allen Newell ile Cliff Shaw ve Carnegie Teknoloji Enstitüsü'nden Herbert Simon, mantık teoremlerini ispatlayan Logic Theorist'i yazarken ispatların ne kadar uzayacağını önceden bilmiyorlardı; bu yüzden her parçanın bir sonrakinin adresini taşıdığı, istenildiği yerden büyüyebilen zincirler kurdular ve bunun için IPL dilini tasarladılar. Hash tablosunun ilk kaydı daha da eskidir: IBM'den Hans Peter Luhn, Ocak 1953 tarihli bir iç yazışmada anahtarları yuvalara dağıtıp çakışanları zincirlemeyi önerdi. 1962'de Moskova'da Georgy Adelson-Velsky ve Evgenii Landis, ekleme sırasında kendini dengeleyen ilk ağacı (AVL) yayımladı; 1964'te J. W. J. Williams, Communications of the ACM'de 'Algorithm 232: Heapsort' ile heap'i tanıttı; aynı yıl Robert Floyd, bir diziyi aşağıdan yukarı heap'e çeviren ve beşinci sekmede adıyla anılan kurulum yöntemini yayımladı.",
    "1968'de Donald Knuth, The Art of Computer Programming'in birinci cildinin iki bölümünden birini, kitabın kabaca yarısını bu yapılara ayırdı; 1976'da Niklaus Wirth ders kitabına 'Algoritmalar + Veri Yapıları = Programlar' adını verdi. Konu bugün de merkezdedir: Python'daki her sözlük (dict) bir hash tablosu, Linux çekirdeğinin işlem zamanlayıcısı bekleyen işleri bir kırmızı-siyah ağaçta tutar, tarayıcının geri tuşu bir yığındır. Linus Torvalds 2006'da bir e-postada 'kötü programcılar kodu, iyi programcılar veri yapılarını ve aralarındaki ilişkileri dert eder' diye yazmıştı. Bu sayfadaki beş laboratuvar tam da o dertle ilgilidir: aynı veriyi farklı raflara koyup her işlemin bedelini tek tek saymak ve sayacın gösterdiğini kuramın söylediğiyle yan yana görmek.",
  ],
  core: [
    {
      heading: "Dizi ve bağlı liste: kaydırmak ya da yürümek",
      body:
        "Dizinin gücü bitişik bellekten gelir. 5 numaralı hücreyi istediğinde bilgisayar hücreleri tek tek saymaz; başlangıç adresine beş kere eleman boyunu ekler ve doğrudan oraya gider. Erişim bu yüzden n ne olursa olsun tek adımdır. Bedeli sıkışıklıktır: n elemanlı dizide i. konuma yer açmak için i ve sonrasındaki <strong>n − i</strong> eleman birer hücre kayar; başa eklemek bütün diziyi oynatır. Bağlı listede ise her <strong>düğüm</strong> değerin yanında bir sonraki düğümün adresini, yani bir <strong>işaretçi</strong> taşır. Araya eklemek yalnızca iki işaretçi yazmaktır, kimse kaydırılmaz; ama adres hesaplanamadığı için o konuma baştan yürümek gerekir: tek yönlü listede i − 1 adım. İkisi aynı işin iki ayrı faturasıdır; birinci sekmenin alt bölümü ikisini aynı işlemde yan yana sayar.",
      formula: "adres(i) = taban + i × eleman_boyu<br>Dizi, i. konuma ekleme: n − i kaydırma<br>Tek yönlü liste: i − 1 işaretçi izleme + 2 işaretçi yazma",
      formulaNote: "n, işlemden önceki eleman sayısıdır. Uçlarda (i = 0 ve i = n) liste hiç yürümez; çift yönlü liste yakın uçtan yürüdüğü için adım sayısı min(i, n − 1 − i) olur.",
    },
    {
      heading: "Yığın, kuyruk ve halka tampon: sözleşme ile bellek ayrı şeylerdir",
      body:
        "Yığın (stack) ve kuyruk (queue) bellek düzeni değil, <strong>soyut veri tipi</strong>dir: neyin nerede durduğunu değil, hangi işlemlerin yapılabileceğini söylerler. Yığında yalnızca tepeye koyar, tepeden alırsın: son giren ilk çıkar. Kuyrukta arkaya koyar, önden alırsın: ilk giren ilk çıkar. Deque iki ucu da açar. Kuyruğu düz bir diziyle kurarsan önden her çıkarışta kalan herkesi bir hücre öne çekmen gerekir. <strong>Halka tampon</strong> bunu bir indis hilesiyle çözer: elemanlar yerinde durur, yalnızca «baş» ve «son» indisleri ilerler ve dizinin ucuna gelince başa dolanır. İkinci sekmede aynı dizinin üç sözleşmeyle nasıl davrandığını, altında da yığının iki klasik işini görürsün: parantez denetimi ve sonek (postfix) hesabı.",
      formula: "son = (baş + adet) mod kapasite",
      formulaNote: "Dolu tamponda da boş tamponda da baş ile son aynı hücreyi gösterir; ikisini ayırt etmek için adet ayrıca tutulur. Dört uç işlemi de O(1)'dir, hiçbir eleman taşınmaz.",
    },
    {
      heading: "Hash tablosu: yük faktörü ve iki çakışma çözümü",
      body:
        "Hash tablosu aramayı adres hesabına çevirir: bir <strong>hash fonksiyonu</strong> anahtarı m yuvadan birinin numarasına dönüştürür. Aynı yuvaya düşen anahtarlar <strong>çakışır</strong>. <strong>Zincirleme</strong> çakışanları o yuvaya bağlı bir listeye dizer; <strong>doğrusal yoklama</strong> ise sağdaki ilk boş yuvaya yerleştirir. Her şeyi <strong>yük faktörü</strong> α = n ÷ m yönetir. Her anahtar yuvalara eşit olasılıkla ve bağımsız düşüyorsa bir zincirin beklenen uzunluğu α'dır; tabloda olmayan bir anahtar o zincirin tamamını tarar, yani ortalama α karşılaştırma yapar. Bulunan anahtar için hesabı kendin kurabilirsin: i. sırada eklenen anahtarın zincirinde ondan önce ortalama (i − 1) ÷ m anahtar vardır; bunu i = 1…n için ortalarsan 1 + (n − 1) ÷ 2m çıkar. Doğrusal yoklamada dolu yuvalar bitişik <strong>kümeler</strong> oluşturur ve her yeni çakışma kümeyi uzatır; tabloda olmayan bir anahtarı aramanın maliyeti α ile değil, kabaca 1 ÷ (1 − α)² ile büyür. Ders kitaplarındaki doğrusal yoklama formülleri m → ∞ limitidir. Sayfa, Donald Knuth'un çözümlemesindeki sonlu m değerini kuram sütununa, limiti de yanına yazar: m = 64, α = 0,750'de bulunmayan arama için limit 8,500 derken tam değer 6,134'tür.",
      formula: "Zincirleme: bulunmayan α · bulunan 1 + (n − 1) ÷ 2m<br>Doğrusal yoklama (m → ∞): bulunan ½(1 + 1 ÷ (1 − α)) · bulunmayan ½(1 + 1 ÷ (1 − α)²)",
      formulaNote: "Zincirlemede anahtar karşılaştırması, doğrusal yoklamada bakılan yuva sayılır. α = 0,750'de bulunmayan aramanın tam değeri m büyüdükçe 8,500 limitine yaklaşır: m = 64 için 6,134; m = 128 için 6,981; m = 512 için 8,003.",
    },
    {
      heading: "Arama ağaçları: yükseklik her şeydir",
      body:
        "İkili arama ağacında (BST) her düğümün solunda kendinden küçükler, sağında büyükler durur. Arama her düğümde bir karşılaştırma yapıp bir alt ağacı tümden eler; sözlüğü ortadan açmanın aynısı. Maliyeti düğüm sayısı değil <strong>yükseklik</strong> belirler: sayfanın kullandığı tanımla kökten en uzak yaprağa giden yoldaki kenar sayısı. Yüksekliği h olan ağaç en çok 2<sup>h+1</sup> − 1 düğüm alır; n düğüm için bu, yüksekliğin ⌊log₂ n⌋'den küçük olamayacağını söyler. Sekiz milyar anahtarı olabilecek en sığ ağaca dizersen yükseklik 32 kenar olur; bir arama en çok 33 karşılaştırma yapar. Ama BST biçimini ekleme sırasından alır: sıralı girdi onu tek kollu bir zincire çevirir, h = n − 1. <strong>AVL ağacı</strong> her düğümde iki alt ağacın yükseklik farkını en çok 1 tutar; fark 2 olunca tek ya da çift <strong>dönüş</strong>le toparlanır. Güvencesi bir sayma sorusundan çıkar: yüksekliği h olan en seyrek AVL ağacı, kökün altında h − 1 ve h − 2 yükseklikli en seyrek iki ağaç taşır. Bu Fibonacci benzeri yineleme 1, 2, 4, 7, 12, 20, 33… diye büyür; düğüm sayısı üstel arttığına göre yükseklik logaritmik kalmak zorundadır.",
      formula: "N(h) = N(h − 1) + N(h − 2) + 1, N(0) = 1, N(1) = 2<br>h<sub>AVL</sub> ≤ 1,44 log₂(n + 2) − 1,33<br>Rastgele sırayla kurulan BST, ortalama arama: 2(1 + 1 ÷ n)H<sub>n</sub> − 3",
      formulaNote: "H<sub>n</sub> = 1 + 1/2 + … + 1/n. 15 anahtarda 12 ≤ 15 < 20 olduğundan AVL yüksekliği 4'ü aşamaz; 31 anahtarda sınır 5'tir. Rastgele sıra beklenen değeri n = 15 için 4,079 karşılaştırmadır ve büyük n'de yaklaşık 1,39 log₂ n gibi büyür.",
    },
    {
      heading: "Heap: dizide saklanan ağaç ve doğrusal kurulum",
      body:
        "İkili yığın (heap) arama ağacının daha gevşek bir akrabasıdır: tek kuralı 'ebeveyn çocuğundan küçük'tür. Kardeşler arasında sıra yoktur, ama en küçük eleman hep köktedir. Ağaç soldan sağa boşluksuz dolduğu için işaretçi gerekmez; düz bir dizide durur ve çocukların yeri hesapla bulunur. Eklenen eleman dizinin sonuna konur ve ebeveyninden küçük olduğu sürece yukarı çıkar: düzey başına 1, toplamda en çok ⌊log₂ n⌋ karşılaştırma. En küçüğü çıkarınca son eleman köke taşınır ve küçük çocuğuyla yer değiştirerek iner: düzey başına en çok 2 karşılaştırma. Bir diziyi toptan heap'e çevirmenin yolu ise Floyd yöntemidir: son ebeveynden köke doğru her düğümü aşağı indir. Düğümlerin yarısı yapraktır ve hiç inmez, dörtte biri en çok bir düzey, sekizde biri en çok iki düzey iner. İnilen düzeylerin toplamı n ÷ 4 + 2n ÷ 8 + 3n ÷ 16 + … serisiyle sınırlıdır ve bu seri n'ye yakınsar; düzey başına 2 karşılaştırmayla kurulum 2n'nin altında kalır.",
      formula: "çocuklar: 2i + 1, 2i + 2 · ebeveyn: ⌊(i − 1) ÷ 2⌋<br>Floyd: karşılaştırma ≤ 2(n − s) &lt; 2n<br>n ardışık ekleme, en kötü durum: ⌊log₂ 1⌋ + ⌊log₂ 2⌋ + … + ⌊log₂ n⌋",
      formulaNote: "s, n'nin ikilik yazımındaki 1'lerin sayısıdır. n = 1000 = 1111101000₂ için s = 6, sınır 2 × 994 = 1988; ardışık eklemenin en kötü durumu 7987 karşılaştırmadır.",
    },
  ],
  lab: {
    intro:
      "Sayfada beş sekme var ve her biri gerçek bir uygulamanın işlem sayaçlarını gösterir; süre ölçülmez. «01 · Dizi ve bağlı liste»de büyüyen dizinin kopya sayacı ile araya ekleme ve silme karşılaştırması; «02 · Yığın, kuyruk, deque»de halka tampon, parantez denetimi ve sonek hesaplayıcı; «03 · Hash tablosu»nda aynı anahtarları tutan zincirleme ve doğrusal yoklama tabloları; «04 · Arama ağaçları»nda aynı ekleme sırasıyla büyüyen BST ve AVL; «05 · İkili yığın (heap)»te etkileşimli min-heap ve kurulum deneyi durur. Kartlarda '(ölçülen)' yazan sayı sayaçtan, altındaki satır kuramdan gelir. Rastgelelik tohumludur: aynı ayar her zaman aynı sayıyı verir. Her sekmenin kendi «Sekmeyi sıfırla» düğmesi vardır; klavyede <kbd>R</kbd> aynı işi yapar. En altta altı yapıyı beş işlemde karşılaştıran gerekçeli bir tablo bulunur.",
    experiments: [
      {
        title: "Aynı işlem, iki fatura: dizi kaydırır, liste yürür",
        predict:
          "On elemanlı bir dizi ile baş ve kuyruk işaretçisi tutan tek yönlü bir liste var. Başa eklemek, ortaya eklemek ve son elemanı silmek: hangisinde hangi yapı daha az iş yapar? Kuyruk işaretçisi elindeyken son elemanı silmek bedava mıdır?",
        do:
          "Birinci sekmenin alt bölümüne in ('Araya ekleme ve silme') ve «Sekmeyi sıfırla»ya bas. Sırayla şunları yap, her seferinde dört kartı oku: «Baş (i = 0)» ve «i. konuma ekle»; «Sonun ardı (i = n)» ve «i. konuma ekle»; «Orta» ve «i. konuma ekle»; «Son eleman (i = n − 1)» ve «i. elemanı sil». Sonra 'Liste türü'nü «Çift yönlü» yap (yapı on elemanla yeniden kurulur), «Son eleman (i = n − 1)» ve «i. elemanı sil»e bas.",
        observe:
          "Başa eklemede 'Dizi: kaydırılan eleman' 10, 'Liste: izlenen işaretçi' 0, 'Liste: yazılan işaretçi' 2 olur. Sonun ardına eklemede ikisi de 0'dır. Ortada (n = 12, i = 6) dizi 6 eleman kaydırır, liste 5 işaretçi izler. Son elemanı silerken (n = 13) dizi 0 kaydırır, liste 11 işaretçi izler; 'Bu oturumun toplamı' 16 · 16'da eşitlenir. Çift yönlü listede aynı silme 0 işaretçi izler ve 2 işaretçi yazar.",
        explain:
          "Dizi n − i eleman kaydırır: başta en pahalı, sonda bedava. Liste i − 1 adım yürür: başta bedava, ortaya doğru pahalı. Şaşırtan satır son elemanın silinmesidir: kuyruk işaretçisi son düğümü gösterir ama ondan öncekini göstermez; yeni kuyruğu bulmak için baştan n − 2 = 11 adım yürümek gerekir. Çift yönlü liste her düğümde bir 'önceki' işaretçisi daha taşıyarak bu yürüyüşü siler; bedeli düğüm başına fazladan bir işaretçilik bellek ve araya eklemede 2 yerine 4 yazımdır.",
      },
      {
        title: "Sekiz hücrede on bir ekleme: kuyruk başa dolanır",
        predict:
          "Sekiz hücrelik bir dizide kuyruk tutuyorsun: 6 eleman ekle, 4'ünü önden çıkar, 5 eleman daha ekle. Son elemanlar nereye yazılır? Başı hep 0. hücrede tutan düz bir dizi bu arada kaç eleman kaydırırdı, halka tampon kaç eleman taşır?",
        do:
          "İkinci sekmede «Sarma gösterisi»ne bas ve kartları oku. Sonra iki kez «Arkaya ekle»ye (kutuda sırayla 12 ve 13 yazar), bir kez de «Önden çıkar»a bas. Aşağıdaki sonek hesaplayıcıda 'Hazır ifade'den «5 + (1 + 2) × 4 − 3»ü seç ve «Bir adım» ile ilerle; parantez dengesinde «Yanlış sıra: ([)]» seçip «Sonuna kadar»a bas.",
        observe:
          "Gösteriden sonra 'baş indisi' 4, 'son indisi' 3 = (4 + 7) mod 8, 'Adet / kapasite' 7 / 8'dir ve altında 'dizinin ucundan dolanma: 1 kez' yazar; 9, 10 ve 11 dizinin başındaki 0., 1. ve 2. hücrelere yazılmıştır. 'Taşınan eleman' 0'dır; düz dizi 14 eleman kaydırırdı. 12, 3. hücreye yazılır (8 / 8); 13 'Taşma' iletisiyle reddedilir. «Önden çıkar» 5'i 4. hücreden alır. Sonek yığını 5 · 5 1 · 5 1 2 · 5 3 · 5 3 4 · 5 12 · 17 · 17 3 · 14 diye ilerler: sonuç 14, en büyük derinlik 3. Parantezde ileti: '2. konumdaki «)», yığının tepesindeki «[» (1. konum) ile eşleşmiyor'.",
        explain:
          "Kuyruğun önünden çıkan her eleman arkasında boş bir hücre bırakır; son indisi dizinin ucuna gelince mod işlemiyle o boşluklara döner; sayaçtaki tek dolanma budur. Düz dizinin 14 kaydırması dört çıkarmadan gelir: geride kalan 5, 4, 3 ve 2 eleman birer hücre öne çekilirdi. Dolu tamponda baş ile son yine aynı hücreyi gösterdiği için doluluk indislerden değil adetten anlaşılır. Sonek yazımında parantez ve öncelik kuralı gerekmez, çünkü yığın 'en son bekleyen iki sayıyı' kendiliğinden verir; parantez denetimi de aynı kurala dayanır: en son açılan önce kapanmalıdır.",
      },
      {
        title: "Tablo dolarken: zincir uzar, küme patlar",
        predict:
          "64 yuvalı tabloda 48 anahtar var (α = 0,750). Tabloda olmayan bir anahtarı aramak zincirlemede ve doğrusal yoklamada ortalama kaç adım tutar? Ders kitabı limiti doğrusal yoklama için 8,5 diyor; 64 yuvada tutar mı? 10 anahtar daha eklersen maliyet yüzde kaç artar? Hash fonksiyonu kötüyse?",
        do:
          "Üçüncü sekmede «Sekmeyi sıfırla»ya bas ve tablonun dört satırını oku. 'Anahtar sayısı n'yi 58 yap. Sonra n'yi 48'e geri al ve «Tabloyu ikiye katla (m → 2m)»ye bas. Son olarak sekmeyi sıfırla ve 'Hash fonksiyonu'nu «Kötü: rakamların toplamı mod m» yap.",
        observe:
          "Başlangıçta 'Doğrusal yoklama, bulunmayan' satırı 9,287 | 6,271 | 6,134 (limit 8,500) | +2,2 % yazar; 'Zincirleme, bulunmayan' 0,751 | 0,740 | 0,750 | −1,3 %. n = 58'de α 0,906 olur: zincirleme 0,908 | 0,897 | 0,906'ya, doğrusal yoklama 24,699 | 16,871 | 16,566'ya (limit 57,389) çıkar; en uzun küme 54 yuvadır. İkiye katlayınca durum satırı 48 anahtardan 32'sinin yuva değiştirdiğini söyler; α 0,375'e, doğrusal yoklama 2,115 | 1,763 | 1,753'e iner. Kötü fonksiyonda yalnızca 21 / 64 yuva kullanılır: zincirleme bulunmayan 2,274 (kuram 0,750), doğrusal yoklama bulunmayan 34,452 (kuram 6,134) olur.",
        explain:
          "Zincirlemede maliyet α ile doğru orantılıdır: yüzde 21 fazla anahtar, yüzde 21 fazla karşılaştırma. Doğrusal yoklamada dolu yuvalar birleşip kümeler kurar ve olmayan bir anahtar, düştüğü kümenin sonuna kadar yürür; aynı on anahtar maliyeti 2,7 katına çıkarır. Tabloyu büyütmenin bedeli bütün anahtarları yeniden yerleştirmektir. 'Bu tablo' tek bir örnektir ve rastgele sapar; kuramla 100 tablonun ortalaması karşılaştırılır. Limit formülü sonsuz büyük tablo içindir, 64 yuvada fazla söyler. Kötü fonksiyon ise kuramın varsayımını, düzgün dağılımı bozar: rakam toplamları dar bir aralığa yığılır.",
      },
      {
        title: "Girdi sırası: ağacı zincire çevirir, heap'i yorar",
        predict:
          "Aynı 15 anahtarı rastgele yerine küçükten büyüğe eklersen BST'nin yüksekliği kaç olur, AVL'ninki kaç? 31 anahtarda? Bir heap'i bin elemanı tek tek ekleyerek kurmak her zaman n log n karşılaştırma mı tutar?",
        do:
          "Dördüncü sekmede «Sekmeyi sıfırla»ya bas ve kartları oku. 'Ekleme sırası'nı «Küçükten büyüğe (sıralı)» yap; sonra 'Başlangıç anahtar sayısı'nı 31'e çek. Beşinci sekmeye geç, alttaki 'Yığını kurmak' bölümünde n = 1000 iken 'Girdi sırası'nı sırayla «Rastgele», «Büyükten küçüğe (ekleme için en kötü)» ve «Küçükten büyüğe (zaten bir heap)» yap.",
        observe:
          "Rastgele sırada BST yüksekliği 6, AVL yüksekliği 4'tür; ortalama arama 4,267 ve 3,333 karşılaştırma, AVL 8 dönüş yapmıştır. Sıralı girdide BST yüksekliği 14'e, ortalama arama 8,000'e çıkar; AVL 11 dönüşle yüksekliği 3'te, ortalamayı 3,267'de tutar. 31 anahtarda BST 30 ve 16,000; AVL 4 (üst sınır 5) ve 4,161 gösterir, 26 dönüşle. Heap kurulumunda rastgele girdi: Floyd 1885, ardışık ekleme 2309 karşılaştırma (eleman başına 2,309; en kötü durum 7987). Büyükten küçüğe: Floyd 1982, ardışık ekleme 7987 (kuramla fark 0), Floyd'un 4,03 katı. Küçükten büyüğe: ikisi de 999.",
        explain:
          "Sıralı girdide her yeni anahtar öncekilerin hepsinden büyüktür ve en sağa asılır: BST bir bağlı listeye döner, yükseklik n − 1, ortalama arama (n + 1) ÷ 2 olur. AVL aynı girdiyi dönüşlerle karşılar; dönüş birkaç işaretçi değiştirir, sıralı dolaşmayı bozmaz. Heap'te azalan girdi en kötü durumdur: her yeni eleman köke kadar çıkar, toplam ⌊log₂ 1⌋ + … + ⌊log₂ 1000⌋ = 7987 eder. Rastgele girdide yeni eleman çoğu zaman alt düzeylerde kalır ve ardışık ekleme de doğrusal büyür: 'n log n' ortalama değil, en kötü durumdur. Floyd'un sınırı girdiye bağlı değildir; bin elemanda 1988'i aşamaz.",
      },
    ],
  },
  wow: [
    {
      title: "Bir hatanın adını taşıyan site",
      body:
        "Her fonksiyon çağrısı dönüş adresini çağrı yığınına koyar. Bir fonksiyon kendini durmadan çağırırsa yığın için ayrılan bellek dolar ve program 'stack overflow' (yığın taşması) hatasıyla çöker. 2008'de Jeff Atwood ve Joel Spolsky'nin programcılar için kurduğu soru-cevap sitesi adını bu hatadan aldı: Stack Overflow. Bir veri yapısının en ünlü kazası, böylece yazılım dünyasının en çok başvurulan adreslerinden birinin tabelası oldu.",
    },
    {
      title: "Kredi kartındaki son rakam Luhn'un imzasıdır",
      body:
        "Hash tablosunu Ocak 1953'te bir IBM iç yazışmasında tarif eden Hans Peter Luhn, 1954'te bir de sağlama formülü için patent başvurusu yaptı. Luhn algoritması kart numarasının rakamlarını sağdan başlayarak birer atlayıp ikiyle çarpar (sonuç iki basamaklıysa rakamlarını toplar) ve hepsini toplar; toplam 10'a tam bölünmelidir. Bugün banka kartlarının numarası, yanlış yazılmış tek bir rakamı daha bankaya sorulmadan yakalayan bu küçük hesabın denetim rakamıyla biter.",
    },
    {
      title: "Çekirdeğin içindeki kırmızı-siyah ağaç",
      body:
        "Linux çekirdeğinin 2007'de (sürüm 2.6.23) gelen Tamamen Adil Zamanlayıcısı (CFS), çalışmayı bekleyen her işlemi şimdiye kadar aldığı (önceliğine göre ağırlıklandırılmış) işlemci süresine göre bir kırmızı-siyah ağaca yerleştirir. Sıradaki işlem her zaman ağacın en solundaki düğümdür; ekleme ve çıkarma binlerce işlemde bile log n adımda biter. 2023'te CFS'in yerini alan EEVDF zamanlayıcısı da işleri aynı tür ağaçta tutar; Android telefonlar Linux çekirdeği kullandığından, uygulamalar arasında geçerken cebinde bu ağaç çalışır.",
    },
  ],
  worked: {
    title: "Bin ekleme: ikiye katlamak mı, sekizer sekizer büyümek mi?",
    prompt:
      "Boş bir dinamik diziye art arda n = 1000 eleman ekleniyor. Dizi dolduğunda yeni bir blok ayrılıyor ve eski elemanların hepsi oraya kopyalanıyor. (a) Kapasite 1'den başlayıp her seferinde ikiye katlanırsa, (b) 8'den başlayıp her seferinde 8 hücre artarsa toplam kaç ek kopya yapılır ve ekleme başına kaç kopya düşer? (c) n = 2000 olunca ne değişir? Sonuçları birinci sekmedeki 'Ekleme sayısı n', 'Büyüme kuralı' ve 'Sabit artış k' denetimleriyle karşılaştır.",
    steps: [
      "İkiye katlama: dizi 1, 2, 4, …, 512 kapasitelerinde dolar ve her seferinde o anki bütün elemanlar kopyalanır. Bu 10 yeniden boyutlandırmadır; toplam = 1 + 2 + 4 + … + 512 = 2¹⁰ − 1 = 1023 kopya. Son kapasite 1024'tür, 24 hücre (% 2,3) boş bekler.",
      "Ekleme başına 1023 kopya ÷ 1000 ekleme = 1,023 kopya. Genel hâli: toplam = 2<sup>⌈log₂ n⌉</sup> − 1 ve 2<sup>⌈log₂ n⌉</sup> < 2n olduğundan toplam hep 2n'den küçüktür. En kötü an büyümenin hemen sonrasıdır: n = 1025'te toplam 2047 kopya, ekleme başına 1,997; sınır 2 aşılmaz.",
      "Sabit artış, k = 8: kapasiteler 8, 16, 24, … diye gider. 1000 ekleme için j = ⌈1000 ÷ 8⌉ − 1 = 124 kez büyünür ve sırasıyla 8, 16, …, 992 eleman kopyalanır. Toplam = 8 × (1 + 2 + … + 124) = 8 × 124 × 125 ÷ 2 = 62 000 kopya; ekleme başına 62 kopya (sayfada 62,000). Hiç boş hücre kalmaz, ama iş 60 katına çıkmıştır.",
      "n = 2000: katlamada toplam 2¹¹ − 1 = 2047 kopya, ekleme başına 1,024; değişmedi sayılır. Sabit artışta j = 249, toplam = 8 × 249 × 250 ÷ 2 = 249 000 kopya, ekleme başına 124,500. Eleman sayısı iki katına çıkınca toplam yaklaşık dört katına (249 000 ÷ 62 000 ≈ 4,02), ekleme başına kopya iki katına çıkmıştır: birincisi bir geometrik seri, ikincisi bir aritmetik seridir.",
      "Ölçeği büyüt: bir milyon eklemede katlama 2 000 000'dan az kopya yapar. Sabit artışta j = 124 999 olur ve toplam 8 × 124 999 × 125 000 ÷ 2 ≈ 6,25 × 10¹⁰ kopyaya varır. Sayfanın kaydırıcısı 4096'da biter; bu son adım formülün uzatılmasıdır, bir ölçüm değildir.",
    ],
    result:
      "İkiye katlamada 1000 ekleme 1023 ek kopya (ekleme başına 1,023), sekizer büyümede 62 000 ek kopya (ekleme başına 62) ister. Katlamalı büyümede eklemenin <strong>amortize</strong> maliyeti sabittir, sabit artışta n ile doğru orantılı büyür. Bedel bellektir: katlanan dizi büyümenin hemen ardından yarı yarıya boştur. Model yalnızca kopyaları sayar; bellek ayırmanın kendi süresi ve önbellek etkileri hesapta yoktur.",
  },
  misconceptions: [
    {
      myth: "Bağlı listede ekleme her zaman O(1)'dir.",
      truth:
        "Sabit olan işaretçi yazımıdır, konuma varmak değil. Sayfada on elemanlı tek yönlü listenin ortasına (i = 5) eklerken liste 2 işaretçi yazar ama önce 4 işaretçi izler; yol i ile büyür. Ekleme ancak düğüm zaten elindeyse ya da uçlardaysan O(1)'dir. Tek yönlü listede son elemanı silmek ise kuyruk işaretçisine rağmen n − 2 adım ister.",
    },
    {
      myth: "Hash tablosunda arama her zaman tek adımdır.",
      truth:
        "O(1) bir ortalamadır ve iki şey ister: anahtarları düzgün dağıtan bir fonksiyon ve makul bir yük faktörü. Sayfada «Kötü: rakamların toplamı mod m» seçildiğinde doğrusal yoklamada olmayan bir anahtar ortalama 34,452 yuvaya bakar; iyi fonksiyonla aynı tabloda kuram 6,134'tür. İyi fonksiyonda bile α 0,750'den 0,906'ya çıkınca bu sayı 6,134'ten 16,566'ya fırlar.",
    },
    {
      myth: "Bir heap'i elemanları tek tek ekleyerek kurmak her zaman n log n sürer.",
      truth:
        "n log n en kötü durumdur ve azalan girdide yaşanır: bin elemanda 7987 karşılaştırma. Rastgele girdide yeni eleman çoğu zaman birkaç düzeyden fazla çıkmaz; sayfa aynı bin eleman için 2309 karşılaştırma sayar ve n = 2000'de eleman başına sayı neredeyse aynı kalır (2,313). Girdi ne olursa olsun doğrusal kalan yöntem Floyd'unkidir.",
    },
    {
      myth: "İkili arama ağacında arama hep log n sürer.",
      truth:
        "Yalnızca ağaç dengeliyse. Sayfada 15 anahtarı «Küçükten büyüğe (sıralı)» eklediğinde BST'nin yüksekliği 14 olur ve ortalama arama 8,000 karşılaştırmaya çıkar: bu bir bağlı listedir. Aynı girdide AVL yüksekliği 3'te tutar. Güvence ağacın adından değil, dengeleme kuralından gelir.",
    },
  ],
  glossary: [
    { term: "Soyut veri tipi", definition: "Verinin nasıl saklandığını değil, hangi işlemlerin yapılabileceğini tanımlayan sözleşme; yığın, kuyruk ve deque böyle tanımlanır." },
    { term: "Büyük-O, O(n)", definition: "Bir işlemin maliyetinin eleman sayısı n büyüdükçe en fazla nasıl büyüdüğünü söyleyen gösterim; O(1) sabit kalır, O(log n) çok yavaş, O(n) doğrusal büyür." },
    { term: "Amortize maliyet", definition: "Nadir ve pahalı bir işlemin (örneğin dizinin büyütülmesi) bedelini uzun bir işlem dizisine yayınca işlem başına düşen maliyet." },
    { term: "Halka tampon", definition: "Baş ve son indisleri dizinin ucundan başa dolanan sabit kapasiteli dizi; iki uçtan ekleme ve çıkarmayı eleman taşımadan yapar." },
    { term: "Yük faktörü (α)", definition: "Hash tablosundaki anahtar sayısının yuva sayısına oranı, α = n ÷ m; zincirlemede bir zincirin beklenen uzunluğudur." },
    { term: "Doğrusal yoklama", definition: "Çakışan anahtarı sağdaki ilk boş yuvaya yerleştiren açık adresleme yöntemi; bitişik dolu yuvalar küme oluşturur ve n < m ister." },
    { term: "Yükseklik", definition: "Ağaçta kökten en uzak yaprağa giden yoldaki kenar sayısı (tek düğümde 0); bir aramanın en çok yükseklik + 1 karşılaştırma yapacağını söyler." },
    { term: "Tam ikili ağaç", definition: "Son düzeyi dışında her düzeyi dolu, son düzeyi soldan sağa doldurulmuş ağaç; heap'in dizide boşluksuz saklanmasını sağlar." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede 'ekleme O(n)' demek yeter; lisansta, genellikle <strong>Veri Yapıları</strong> ve <strong>Algoritma Analizi</strong> derslerinde, bu cümlenin üç ayrı anlamı olduğunu öğrenirsin: en kötü durum, ortalama durum ve <strong>amortize</strong> durum. Dinamik dizi dolunca iki katına çıkarılır; o tek işlem O(n)'dir, ama n ekleme boyunca yapılan kopyalamaların toplamı 1 + 2 + 4 + … < 2n kalır ve işlem başına O(1) düşer. Hash tablosunda 'ortalama' sözcüğü bir olasılık varsayımı taşır; evrensel hash aileleri bu varsayımı kötü niyetli girdiye karşı bile güvenceye alır. Bir de bu sayfanın saymadığı şey vardır: bellek hiyerarşisi. Dizi önbellek satırlarını sırayla doldurur, bağlı liste her düğümde belleğe ayrı bir yolculuk yapar; bu yüzden küçük ve orta boyutlarda 'O(n) kaydırma' ölçümlerde sık sık 'O(1) işaretçi takibi'ni geçer. Doğrusal yoklamanın gerçek tablolarda hâlâ kullanılmasının bir nedeni de budur: yokladığı yuvalar bellekte yan yanadır.",
      "İleri derslerde ağaçlar diskle buluşur: veritabanı indeksleri, her düğümü bir disk bloğu kadar geniş olan <strong>B-ağaçları</strong>dır ve milyarlarca kaydı üç dört okumayla bulur. Fibonacci heap bazı işlemleri amortize O(1)'e indirir, kalıcı (persistent) veri yapıları eski sürümleri silmeden yeni sürüm üretir ve fonksiyonel dillerin temelidir. Çizgeler için komşuluk listesi ile matris seçimi, algoritmanın O(V+E) mi O(V²) mi olacağını belirler. Sonunda her veri yapısı aynı sorunun bir cevabıdır: hangi işlemleri ucuz tutmak istiyorsun ve bunun için neyden vazgeçmeye razısın?",
    ],
    topics: ["Amortize analiz", "Bellek hiyerarşisi ve önbellek yerelliği", "AVL, kırmızı-siyah ve B-ağaçları", "Evrensel hashing ve açık adresleme", "Fibonacci heap", "Kalıcı veri yapıları", "Çizge gösterimleri"],
  },
  quiz: [
    {
      question: "Kapasitesini her dolduğunda 8 hücre artıran bir diziye 1000 eleman eklemek 62 000 ek kopya gerektiriyor. Aynı diziye 2000 eleman eklenirse toplam ek kopya yaklaşık kaç olur?",
      options: ["Yaklaşık 64 000; yalnızca birkaç büyüme daha eklenir", "Yaklaşık 124 000; eleman iki katı, kopya iki katı", "Yaklaşık 249 000; eleman iki katı, kopya dört katı", "Yaklaşık 4000; ekleme başına 2 kopyayı geçemez"],
      answer: 2,
      explanation: "Sabit artışta kopyalar 8 + 16 + 24 + … biçiminde bir aritmetik seridir ve toplamı n² ÷ (2k) gibi büyür: n iki katına çıkınca toplam dört katına çıkar (sayfada tam değer 249 000). 'Ekleme başına 2 kopya' sınırı yalnızca ikiye katlayan dizi için geçerlidir; orada 2000 ekleme 2047 kopya ister.",
    },
    {
      question: "64 yuvalı tabloda 48 anahtar var (α = 0,750). Tablo 128 yuvaya büyütülüp anahtarlar yeniden yerleştiriliyor. Tabloda olmayan bir anahtarı aramanın beklenen maliyeti nasıl değişir?",
      options: [
        "İki yöntemde de tam yarıya iner, çünkü α yarıya inmiştir.",
        "Zincirlemede yarıya iner (0,750 → 0,375); doğrusal yoklamada yarıdan çok daha fazla düşer (6,134 → 1,753).",
        "Zincirlemede değişmez, yalnızca doğrusal yoklamada düşer.",
        "İkisinde de değişmez; anahtar sayısı aynı kaldı.",
      ],
      answer: 1,
      explanation: "Zincirlemede olmayan anahtar bir zincirin tamamını tarar ve beklenen zincir uzunluğu α'dır: maliyet α ile doğru orantılıdır. Doğrusal yoklamada maliyet 1 ÷ (1 − α)² ile büyüdüğü için dolu tabloda α'daki küçük bir düşüş bile büyük kazanç getirir; sayfanın sonlu m değerleriyle 6,134'ten 1,753'e, yaklaşık 3,5 kat. Tabloları yük faktörü bir eşiği aşınca büyütmenin gerekçesi budur.",
    },
    {
      question: "Bin eleman boş bir min-heap'e tek tek ekleniyor. Girdi rastgele sıradayken sayfa eleman başına 2,309 karşılaştırma, büyükten küçüğe sıradayken 7,987 karşılaştırma sayıyor. Eleman sayısı 2000'e çıkarılırsa bu iki sayı için hangisi beklenir?",
      options: [
        "İkisi de iki katına çıkar.",
        "İkisi de yaklaşık 1 artar, çünkü ağaca bir düzey eklenmiştir.",
        "Rastgele girdide neredeyse aynı kalır; azalan girdide yaklaşık 1 artar.",
        "Rastgele girdide yaklaşık 1 artar; azalan girdide aynı kalır.",
      ],
      answer: 2,
      explanation: "Azalan girdide her yeni eleman köke kadar çıkar, yani ⌊log₂ i⌋ karşılaştırma yapar; n iki katına çıkınca ağaca bir düzey eklenir ve ortalama yaklaşık 1 artar (sayfada 8,982). Rastgele girdide yeni eleman çoğu zaman alt düzeylerde durur; eleman başına maliyet ağacın yüksekliğine bağlı değildir ve neredeyse sabit kalır (sayfada 2,313). 'n log n' en kötü durumun adıdır, her girdinin değil.",
    },
  ],
  next: [
    { href: "algoritmalar.html", title: "Algoritmalar: Adımları Say", why: "Kuyruk BFS'i, yığın DFS'i yönetir; çizgeler sekmesinde BFS, DFS ve Dijkstra'yı çalıştır, sıralama ve aramada karşılaştırmaları kuramla yan yana say." },
    { href: "veritabanlari.html", title: "Veritabanları: İlişkisel Model, Sorgular ve İndeksler", why: "Diskteki indeksler ikili ağaç değil, düğüm başına çok anahtar tutan B+ağacıdır; ikinci sekmede kendin kur ve aramanın kaç düğüm okuduğunu say." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme: Sınıflar, NP ve Yaklaşık Çözümler", why: "O, Ω ve Θ'nın farkı: Büyüme sınıfları sekmesinde tanık sabitleriyle bir maliyetin sınıfını sına, sınıfları aynı grafikte yarıştırıp daha hızlı bir makinenin neden çok daha büyük n kazandırmadığını gör." },
    { href: "isaretciler-ve-bellek-yonetimi.html", title: "İşaretçiler ve Bellek Yönetimi", why: "Bağlı listedeki 'sonraki' adresinin ve çağrı yığınının bellekte gerçekten neye karşılık geldiğini keşfet." },
  ],
  sources: [
    { title: "MIT OpenCourseWare · 6.006 Introduction to Algorithms (2020)", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", note: "Diziler, bağlı listeler, hash tabloları, ikili arama ağaçları ve heap'ler için ders videoları ve notlar (İngilizce, açık ders)." },
    { title: "Python belgeleri · Veri Yapıları (tutorial 5)", url: "https://docs.python.org/3/tutorial/datastructures.html", note: "Liste, yığın ve kuyruk olarak liste kullanımı, sözlükler (hash tablosu) ve kümeler; her kavramı birkaç satır kodla deneyebilirsin." },
    { title: "Python belgeleri · heapq modülü", url: "https://docs.python.org/3/library/heapq.html", note: "Sayfadaki min-heap'in aynısı: dizi gösterimi, 2i+1 / 2i+2 kuralı ve heapsort örneği." },
    { title: "Wikipedia · Hash table", url: "https://en.wikipedia.org/wiki/Hash_table", note: "Luhn'un 1953 yazışması, yük faktörü, zincirleme ve açık adresleme; tarihçe ve karmaşıklık tablosu (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
