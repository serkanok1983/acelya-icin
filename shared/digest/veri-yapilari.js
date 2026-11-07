window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["veri-yapilari"] = {
  slug: "veri-yapilari",
  title: "Veri Yapıları: Doğru Rafı Seçmek",
  field: "Bilgisayar Bilimi",
  level: "Lise",
  minutes: 35,
  tagline:
    "Aynı sayılar bir dizide, bir zincirde, yedi yuvalı bir tabloda ya da bir ağaçta saklanabilir. Hangisini seçtiğin, bir aramanın sekiz milyar adım mı yoksa otuz üç adım mı süreceğini belirler.",
  hook:
    "Kalın bir sözlükte 'zürafa'yı bulmak için birinci sayfadan başlamazsın; kitabı ortasından açar, yarısını tek bakışta elersin ve yirmi açışta iş biter. Peki bir bilgisayar, dünyadaki sekiz milyar insanın listesinde bir ismi kaç adımda bulur? Cevap listenin büyüklüğüne değil, nasıl saklandığına bağlıdır: yanlış rafta sekiz milyar adım, doğru rafta otuz üç.",
  bigIdea:
    "Bir <strong>veri yapısı</strong> yalnızca veriyi saklamaz; hangi işlemin ucuz, hangisinin pahalı olacağını belirleyen bir sözleşmedir. Dizi erişimi, bağlı liste eklemeyi, hash tablosu aramayı, ağaç sıralı tutmayı ucuzlatır; hiçbiri her şeyi birden ucuzlatamaz.",
  story: [
    "1945'te John von Neumann, EDVAC raporunda bilgisayar belleğini numaralı hücrelerden oluşan tek bir sıra olarak tarif etti. <strong>Dizi</strong> bu fikrin doğrudan çocuğudur: yan yana hücreler, bir başlangıç adresi ve bir çarpma işlemiyle istediğin elemana tek adımda ulaşırsın. Ama daha o yıllarda bu sıranın yetmediği görüldü. Alan Turing 1946'daki ACE raporunda, bir alt programa dalarken dönüş adresini 'gömmek' (bury) ve işi bitince 'çıkarmak' (unbury) gerektiğini yazdı; bugün buna <strong>yığın</strong> diyoruz. 1957'de Münih'te Friedrich Bauer ve Klaus Samelson aynı fikri formül çözümlemek için kullandı ve 'Keller' (mahzen) ilkesi adıyla patent başvurusu yaptı; Avustralya'da Charles Hamblin aynı yıl bağımsız olarak aynı yapıya ulaştı.",
    "Bağlı liste bir yapay zekâ programının ihtiyacından doğdu. 1955–56'da RAND'da Allen Newell, Cliff Shaw ve Herbert Simon, mantık teoremlerini ispatlayan Logic Theorist'i yazarken ispatların ne kadar uzayacağını önceden bilmiyorlardı; bu yüzden her parçanın bir sonrakinin adresini taşıdığı, istenildiği yerden büyüyebilen zincirler kurdular ve bunun için IPL dilini tasarladılar. Hash tablosunun ilk kaydı daha da eskidir: IBM'den Hans Peter Luhn, Ocak 1953 tarihli bir iç yazışmada anahtarları yuvalara dağıtıp çakışanları zincirlemeyi önerdi. 1962'de Moskova'da Georgy Adelson-Velsky ve Evgenii Landis, ekleme sırasında kendini dengeleyen ilk ağacı (AVL) yayımladı; 1964'te J. W. J. Williams, Communications of the ACM'de 'Algorithm 232: Heapsort' ile heap'i tanıttı.",
    "1968'de Donald Knuth, The Art of Computer Programming'in birinci cildinin büyük bölümünü bu yapılara ayırdı; 1976'da Niklaus Wirth ders kitabına 'Algoritmalar + Veri Yapıları = Programlar' adını verdi. Konu bugün de merkezdedir: Python'daki her sözlük (dict) bir hash tablosu, Linux çekirdeğinin işlem zamanlayıcısı bir kırmızı-siyah ağaç, tarayıcının geri tuşu bir yığındır. Linus Torvalds 2006'da bir e-postada 'kötü programcılar kodu, iyi programcılar veri yapılarını ve aralarındaki ilişkileri dert eder' diye yazmıştı. Bu sayfadaki beş küçük laboratuvar tam da o dertle ilgilidir: aynı sayıları farklı raflara koyup hangi işlemin ucuzladığını, hangisinin pahalılaştığını kendi gözünle görmek.",
  ],
  core: [
    {
      heading: "Dizi: adres hesabı tek adımda",
      body:
        "Dizinin bütün gücü bitişik bellekten gelir. Beşinci elemanı istediğinde bilgisayar beş hücre saymaz; başlangıç adresine beş kere eleman boyunu ekler ve doğrudan oraya gider. Bu yüzden <strong>erişim O(1)</strong>'dir: eleman sayısı on da olsa on milyon da olsa aynı sürede. Bedeli ise sıkışıklıktır. Başa bir eleman eklemek istediğinde yer açmak için var olan her elemanı bir sağa kaydırmak gerekir; n elemanlık dizide bu n taşıma demektir. Sayfadaki 'Başa Ekle' düğmesi bunu hep aklında tutman için var.",
      formula: "adres(i) = taban + i × eleman_boyu",
      formulaNote: "Çarpma ve toplama sabit sürede yapılır; i ne kadar büyük olursa olsun tek adımdır.",
    },
    {
      heading: "Bağlı liste: ucuz ekleme, pahalı bulma",
      body:
        "Bağlı listede her <strong>düğüm</strong> iki şey taşır: değerin kendisi ve bir sonraki düğümün adresi, yani bir <strong>işaretçi</strong>. Elemanlar bellekte dağınık durabilir; zincir onları adreslerle birbirine bağlar. Başa eklemek iki adres değiştirmekten ibarettir, kimse kaydırılmaz. Ama 'sekizinci düğüme git' demek baştan sekiz işaretçi izlemek demektir; <strong>erişim O(n)</strong>. Sık yapılan hata şudur: 'ortaya ekleme O(1)' demek, ortayı bulma maliyetini unutmaktır. Düğümü elinde tutuyorsan ekleme ucuz, düğümü aramak hâlâ pahalıdır.",
      formula: "düğüm = { değer, sonraki }",
      formulaNote: "Çift yönlü listede bir de 'önceki' alanı vardır; sondan silme de O(1) olur, bellek bir işaretçi daha yer.",
    },
    {
      heading: "Yığın ve kuyruk: davranış sözleşmesi",
      body:
        "Yığın (stack) ve kuyruk (queue) aslında bellek düzeni değil, <strong>soyut veri tipi</strong>dir: ne saklandığını değil, hangi işlemlerin yapılabileceğini söylerler. Yığında yalnızca tepeye koyar, tepeden alırsın: son giren ilk çıkar (LIFO). Kuyrukta arkaya koyar, önden alırsın: ilk giren ilk çıkar (FIFO). İkisi de dizi ya da bağlı listeyle kurulabilir, önemli olan sözleşmedir. Bir fonksiyon başka bir fonksiyonu çağırdığında dönüş adresi yığına konur; geri al (undo) tuşu yığındır; yazıcı kuyruğu ve genişlik öncelikli arama ise kuyruk. Sayfada aynı beş sayı iki sekmede iki farklı sırayla çıkar.",
      formula: "Yığın: push, pop, peek · Kuyruk: enqueue, dequeue, peek",
      formulaNote: "Hepsi O(1): yalnızca uçlara dokunulur, ortaya hiç bakılmaz.",
    },
    {
      heading: "Hash tablosu: anahtardan yuvaya tek atlayış",
      body:
        "Hash tablosu aramayı adres hesabına çevirir. Bir <strong>hash fonksiyonu</strong> anahtarı bir yuva numarasına dönüştürür; sayfadaki tablo bunun en yalın hâlini kullanır: anahtarın 7'ye bölümünden kalan. 42 için kalan 0, 15 için 1. Aynı yuvaya düşen anahtarlar <strong>çakışır</strong> ve bir zincire eklenir. Aramanın gerçek maliyeti bu zincirin uzunluğudur. Elemanların yuvalara oranına <strong>yük faktörü</strong> α denir; iyi bir fonksiyon anahtarları eşit dağıtırsa ortalama zincir yaklaşık α uzunluğundadır. Ama kötü bir fonksiyon ya da kötü niyetli girdi her şeyi tek yuvaya yığabilir; o zaman hash tablosu sıradan bir bağlı listeye döner.",
      formula: "h(k) = k mod 7 · α = n / m",
      formulaNote: "n eleman sayısı, m yuva sayısı (sayfada 7). Başlangıçtaki 9 eleman için α = 9/7 ≈ 1.29.",
    },
    {
      heading: "Ağaçlar: yükseklik her şeydir",
      body:
        "İkili arama ağacında (BST) her düğümün solunda kendinden küçükler, sağında büyükler durur. Arama her adımda bir karşılaştırma yapıp bir alt ağacı tümden eler; sözlüğü ortadan açmanın aynısı. Maliyet düğüm sayısı değil, kökten en uzak yaprağa olan <strong>derinlik</strong>tir. Dengeli ağaçta derinlik yaklaşık log₂ n olur: bir milyon düğüm için yirmi, sekiz milyar için otuz üç. Sıralı veri gelirse ağaç tek yönlü zincire dönüşür ve derinlik n'ye çıkar; AVL ve kırmızı-siyah ağaçlar bunu döndürmelerle engeller. Heap ise ağacın daha gevşek bir akrabasıdır: yalnızca 'ebeveyn çocuktan küçük' kuralı vardır, bu da en küçüğü hep kökte tutar ve ağaç işaretçisiz, düz bir dizide saklanabilir.",
      formula: "derinlik<sub>dengeli</sub> ≈ log₂ n · heap: çocuklar 2i+1, 2i+2 · ebeveyn ⌊(i−1)/2⌋",
      formulaNote: "log₂(1 000 000) ≈ 19.9; log₂(8 000 000 000) ≈ 32.9. Heap dizisinde i indeksli düğümün çocukları hesapla bulunur, adresle değil.",
    },
  ],
  lab: {
    intro:
      "Sayfada beş ayrı laboratuvar var: dizi/bağlı liste sekmeleri ('Başa Ekle', 'Sona Ekle', 'Baştan Sil', 'Ortaya Ekle'), yığın/kuyruk/deque sekmeleri ('Push / Enqueue', 'Pop / Dequeue', 'Peek (Gözetle)'), 'Değer ekle' kutulu yedi yuvalı hash tablosu ('Ekle', 'Sil', 'Ara'), değer kutulu ikili arama ağacı tuvali ve 'Ekle (insert)' / 'Min. Çıkar (extract-min)' düğmeli min-heap. Her panelin altındaki bilgi satırı eleman sayısını, yük faktörünü, derinliği ya da en küçük elemanı anında yazar; tahminlerini o satırla karşılaştır.",
    experiments: [
      {
        title: "Aynı beş sayı, iki farklı çıkış sırası",
        predict:
          "Yığın ve kuyruk sekmeleri aynı beş sayıyla başlar: 42, 17, 93, 8, 56. Her ikisinde de üç kez çıkarma yaparsan hangi iki sayı kalır? Önce yaz, sonra dene.",
        do:
          "'Stack (LIFO)' sekmesinde 'Pop / Dequeue' düğmesine üç kez bas, kalanı not et. Sonra 'Queue (FIFO)' sekmesine geç (sekme değişince veri kendiliğinden sıfırlanır) ve yine üç kez bas. Her sekmede bir de 'Peek (Gözetle)' düğmesini dene.",
        observe:
          "Yığında 42 ve 17 kalır; 56, 8 ve 93 sondan gitmiştir ('←TOP' etiketi hep en sağdadır). Kuyrukta 8 ve 56 kalır; 42, 17 ve 93 önden gitmiştir. Peek yığında 56'yı, kuyrukta 'FRONT→' yazan 42'yi bir saniyeliğine aydınlatır ve hiçbir şeyi çıkarmaz.",
        explain:
          "İki yapı da aynı diziyi kullanıyor; farkı yaratan tek şey hangi uca dokunulduğu sözleşmesidir. Yığın en son koyulanı geri verir, kuyruk en eskiyi. Bilgi satırındaki 'Push O(1) · Pop O(1)' bu yüzden doğrudur: hiçbir işlem ortadaki elemanlara bakmaz.",
      },
      {
        title: "Yedi yuvalı tabloda bir yuvanın şişmesi",
        predict:
          "hash(k) = k mod 7. Sıfırlanmış tabloda 15, 8, 50 ve 64 zaten [1] yuvasındadır. 29, 36 ve 43'ü eklersen hangi yuvaya düşerler? 4'ü eklersen? 'En uzun zincir' ve 'Yük faktörü' kaç olur?",
        do:
          "'Sıfırla' ile örnek verileri yükle ve bilgi satırını oku. 'Değer ekle' kutusuna 64 yazıp 'Ara'ya bas. Sonra sırayla 29, 36, 43 yazıp her birinde 'Ekle'ye bas; en son 43'ü ve 4'ü 'Ara' ile ara.",
        observe:
          "Başlangıç: 'Toplam 9 · Yük faktörü 1.29 · En uzun zincir 4'. 64 için 'Yuva [1], zincir 4. sırada'. 29, 36 ve 43 üçü de [1] yuvasına gider; satır 'Toplam 12 · Yük faktörü 1.71 · En uzun zincir 7' olur ve 43 'zincir 7. sırada' bulunur. 4 ise boş [4] yuvasına düşer; aramak tek adımdır.",
        explain:
          "29, 36 ve 43'ün hepsi 7k+1 biçimindedir; 7'ye bölümünden kalan 1'dir. Hash fonksiyonu anahtarları ayırt edemediğinde 'O(1) ortalama' iddiası çöker: [1] yuvası yedi elemanlık bir bağlı listeye dönüşmüştür. Gerçek tablolar yük faktörü belli bir eşiği aşınca yuva sayısını artırıp her şeyi yeniden dağıtır; sayfadaki tablo bunu bilerek yapmaz ki şişmeyi görebilesin.",
      },
      {
        title: "Sıralı ekleme ağacı zincire çevirir",
        predict:
          "'Sıfırla' 11 düğümlü, derinliği 4 olan dengeli bir ağaç yükler. 95, 100, 105 ve 110'u bu sırayla eklersen derinlik kaç olur? Dört düğüm için derinlik dört mü artar, bir mi?",
        do:
          "'Sıfırla'ya bas ve bilgi satırını oku. Değer kutusuna 95 yazıp 'Ekle', sonra 100, 105, 110 için aynısını yap; her eklemede derinliği not et. Ardından yeniden 'Sıfırla', kutuya 50 yazıp 'Sil'e bas ve kökte kimin oturduğuna bak.",
        observe:
          "'BST — 11 düğüm · Derinlik: 4' ile başlar; her eklemede derinlik birer artar: 12 düğüm/5, 13/6, 14/7, 15 düğüm/8. Yeni düğümler 90'ın sağından aşağı inen tek sıra bir merdiven oluşturur. 50 silindiğinde kökte 55 belirir; düğüm sayısı 10, derinlik yine 4.",
        explain:
          "Her yeni değer ağaçtaki her şeyden büyük olduğu için hep sağa gider; dört ekleme dört kat derinlik. Aynı 11 sayıyı küçükten büyüğe eklesen derinlik 11 olurdu, yani düz bir bağlı liste. Silmede kökün yerini sağ alt ağacın en küçüğü (55) alır; böylece 'sol küçük, sağ büyük' kuralı bozulmaz. AVL ve kırmızı-siyah ağaçların işi, bu merdiveni her eklemede döndürmelerle yeniden dengelemektir.",
      },
      {
        title: "'Min. Çıkar' düğmesi aslında bir sıralama makinesi",
        predict:
          "Heap dizisi [3, 8, 15, 17, 22, 42, 50, 30] ile başlar. Bir kez 'Min. Çıkar'dan sonra dizi küçükten büyüğe sıralı mı olur? Sekiz kez basarsan çıkan sayılar hangi sırada gelir?",
        do:
          "'Sıfırla'ya bas, diziyi ve altındaki ağaç satırlarını oku. 'Min. Çıkar (extract-min)' düğmesine bir kez bas; 0.4 saniyelik vurgudan sonra yeni diziyi yaz. Sonra sekiz kez bitene kadar bas ve her seferinde 'Min:' değerini not et. En son 'Sıfırla' yap, kutuya 1 yazıp 'Ekle (insert)'e bas.",
        observe:
          "İlk çıkarmadan sonra dizi [8, 17, 15, 30, 22, 42, 50] olur: 17 ile 15 yer değiştirmiş, sıralı değil; ama kökte doğru şekilde 8 oturur. Çıkanlar sırayla 3, 8, 15, 17, 22, 30, 42, 50: küçükten büyüğe. 1 eklendiğinde önce dizinin sonuna (9. hücre) iner, sonra üç basamak yukarı çıkıp köke oturur: [1, 3, 15, 8, 22, 42, 50, 30, 17].",
        explain:
          "Heap yalnızca 'ebeveyn ≤ çocuk' kuralını tutar; kardeşler arasında sıra yoktur, bu yüzden dizi karışık görünür ama kök hep en küçüktür. Her çıkarma kökü son elemanla değiştirip onu aşağı yüzdürür: en fazla derinlik kadar, yani log₂ n adım. Sekiz çıkarma sıralı bir dizi üretir; 1964'te Williams'ın tarif ettiği heapsort tam olarak budur ve n log n adımda biter. Yukarı yüzen 1 ise her seviyede ebeveyniyle bir kez karşılaştırılır: 8 elemanlık heap'te en fazla üç karşılaştırma.",
      },
    ],
  },
  wow: [
    {
      title: "Bir hatanın adını taşıyan site",
      body:
        "Her fonksiyon çağrısı dönüş adresini çağrı yığınına koyar. Bir fonksiyon kendini durmadan çağırırsa yığın için ayrılan bellek dolar ve program 'stack overflow' (yığın taşması) hatasıyla çöker. 2008'de Jeff Atwood ve Joel Spolsky, programcıların soru-cevap sitesine bu hatanın adını verdi: Stack Overflow. Bugün bir veri yapısı terimi, dünyanın en çok ziyaret edilen programlama sitesinin adıdır.",
    },
    {
      title: "Kredi kartındaki son rakam Luhn'un imzasıdır",
      body:
        "Hash tablosunu Ocak 1953'te bir IBM iç yazışmasında tarif eden Hans Peter Luhn, 1954'te bir de sağlama formülü için patent başvurusu yaptı. Luhn algoritması, kart numarasının rakamlarını ikide bir ikiyle çarpıp toplar; toplamın 10'a bölünmesi gerekir. Bugün hemen her banka kartı, yanlış yazılmış tek bir rakamı daha bankaya sorulmadan yakalayan bu küçük hesapla biter.",
    },
    {
      title: "Çekirdeğin içindeki kırmızı-siyah ağaç",
      body:
        "Linux çekirdeğinin 2007'de (sürüm 2.6.23) gelen Tamamen Adil Zamanlayıcısı (CFS), çalışmayı bekleyen her işlemi şimdiye kadar aldığı işlemci süresine göre bir kırmızı-siyah ağaca yerleştirir. Sıradaki işlem her zaman ağacın en solundaki düğümdür; ekleme ve çıkarma binlerce işlemde bile log n adımda biter. Telefonunda uygulamalar arasında geçiş yaparken o ağaç saniyede binlerce kez dengeleniyor.",
    },
  ],
  worked: {
    title: "Sekiz milyar isimde bir isim: üç raf, üç maliyet",
    prompt:
      "Dünyadaki 8 000 000 000 kişinin kimlik numarası bir yerde saklanacak ve tek bir numara aranacak. Bilgisayar saniyede yaklaşık 10⁹ karşılaştırma yapsın. Sırasız dizi, dengeli ikili arama ağacı ve yük faktörü 0.67 olan hash tablosu için en kötü ve ortalama arama süresini bul.",
    steps: [
      "Sırasız dizi ya da bağlı liste: aranan numara en sonda olabilir, en kötü durumda 8 × 10⁹ karşılaştırma gerekir. Süre: 8 × 10⁹ / 10⁹ = 8 saniye. Ortalama durumda yarısı, yani yaklaşık 4 saniye.",
      "Dengeli ikili arama ağacı: her karşılaştırma kalan adayların yarısını eler. Adım sayısı log₂(8 × 10⁹) = log₂(8) + log₂(10⁹) ≈ 3 + 29.9 = 32.9, yani en fazla 33 karşılaştırma. Süre: 33 × 10⁻⁹ s = 33 nanosaniye; tek bir saniyede 30 milyon arama.",
      "Hash tablosu: önce anahtardan yuva hesaplanır (1 işlem), sonra o yuvadaki zincir taranır. İyi dağılımla ortalama zincir yük faktörü kadar, yani 0.67 elemandır; toplam yaklaşık 2 işlem, 2 nanosaniye. Ama en kötü durumda (bütün anahtarlar aynı yuvada) yeniden 8 saniyeye döner.",
      "Bedelleri karşılaştır: dizi en az belleği kullanır ama aramada çaresizdir; ağaç 33 adımda bulur ve üstelik 'bu numaradan büyük ilk numara' gibi sıralı soruları da yanıtlar; hash tablosu en hızlıdır ama sıra bilmez ve 8 milyar eleman için 12 milyar yuvalık yer ayırır (8 / 0.67 ≈ 12).",
    ],
    result:
      "Aynı veri, aynı bilgisayar: 8 saniye, 33 nanosaniye ya da 2 nanosaniye. Yapı seçimi donanımı değiştirmeden hızı yüz milyon kat değiştirebilir; buna karşılık her yapı bir şeyden vazgeçer: bellek, sıra ya da en kötü durum güvencesi.",
  },
  misconceptions: [
    {
      myth: "Bağlı listede ekleme her zaman O(1)'dir.",
      truth:
        "Ekleme, yerini bildiğin düğümün yanına O(1)'dir. 'Ortaya ekle' dediğinde önce ortayı bulmak gerekir ve bu baştan n/2 işaretçi izlemek demektir. Sayfadaki karşılaştırma tablosundaki yıldız (O(1)*) tam bu uyarıyı taşır: düğüm elindeyse ucuz, aranacaksa O(n).",
    },
    {
      myth: "Hash tablosunda arama her zaman tek adımdır.",
      truth:
        "O(1) ortalama bir beklentidir; iyi bir hash fonksiyonu ve makul bir yük faktörü ister. Sayfada 29, 36 ve 43'ü eklediğinde [1] yuvasının zinciri yediye çıkar ve 43'ü bulmak yedi karşılaştırma alır. Gerçek tablolar yük faktörü eşiği aşınca büyüyüp yeniden dağıtır; bu da tek seferlik O(n) bir iştir.",
    },
    {
      myth: "Min-heap küçükten büyüğe sıralı bir dizidir.",
      truth:
        "Heap yalnızca ebeveyn-çocuk ilişkisini sıralar, kardeşleri değil. İlk 'Min. Çıkar'dan sonra sayfadaki dizi [8, 17, 15, 30, 22, 42, 50] olur: 17, 15'ten önce gelir ama kural bozulmamıştır. Heap sana 'en küçük hangisi' sorusunu O(1)'de yanıtlar; 'üçüncü en küçük hangisi' sorusu için üç çıkarma gerekir.",
    },
    {
      myth: "İkili arama ağacında arama hep log n sürer.",
      truth:
        "Yalnızca ağaç dengeliyse. 10, 20, 30, …, 110'u sırayla eklersen her değer bir öncekinin sağına gider ve 11 düğümlük ağacın derinliği 11 olur: bu bir bağlı listedir ve arama O(n)'dir. Sayfada 95, 100, 105, 110'u ekleyerek merdiveni kendin kur; AVL ve kırmızı-siyah ağaçlar bu yüzden icat edildi.",
    },
  ],
  glossary: [
    { term: "Soyut veri tipi", definition: "Verinin nasıl saklandığını değil, hangi işlemlerin yapılabileceğini tanımlayan sözleşme; yığın ve kuyruk böyle tanımlanır." },
    { term: "Büyük-O, O(n)", definition: "Bir işlemin maliyetinin eleman sayısı n büyüdükçe en fazla nasıl büyüdüğünü söyleyen gösterim; O(1) sabit, O(log n) çok yavaş, O(n) doğrusal büyür." },
    { term: "Amortize maliyet", definition: "Nadir ve pahalı bir işlemin (örneğin dizinin büyütülmesi) bedelini uzun bir işlem dizisine yayınca işlem başına düşen maliyet." },
    { term: "İşaretçi", definition: "Başka bir verinin bellekteki adresini tutan değer; bağlı listede 'sonraki' alanı budur." },
    { term: "Yük faktörü (α)", definition: "Hash tablosundaki eleman sayısının yuva sayısına oranı; ortalama zincir uzunluğunun ölçüsü." },
    { term: "Çakışma", definition: "İki farklı anahtarın aynı yuvaya düşmesi; zincirleme ya da açık adresleme ile çözülür." },
    { term: "Derinlik (yükseklik)", definition: "Ağaçta kökten en uzak yaprağa giden yoldaki düğüm sayısı; arama maliyetinin üst sınırı." },
    { term: "Tam ikili ağaç", definition: "Son seviye dışında her seviyesi dolu, son seviyesi soldan sağa doldurulmuş ağaç; heap'in dizide boşluksuz saklanmasını sağlar." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede 'ekleme O(n)' demek yeter; lisansta bu cümlenin üç ayrı anlamı olduğunu öğrenirsin: en kötü durum, ortalama durum ve <strong>amortize</strong> durum. Dinamik dizi dolunca iki katına çıkarılır; o tek işlem O(n)'dir ama n ekleme boyunca toplam maliyet yine O(n) kaldığı için işlem başına O(1) düşer. Hash tablosunda 'ortalama' sözcüğü de bir olasılık varsayımı taşır; evrensel hash aileleri bu varsayımı kötü niyetli girdiye karşı bile güvenceye alır. Bir de modelin görmediği şey vardır: bellek hiyerarşisi. Dizi önbellek satırlarını sırayla doldurur, bağlı liste her düğümde belleğe ayrı bir yolculuk yapar; bu yüzden pratikte 'O(n) kaydırma' çoğu zaman 'O(1) işaretçi takibi'nden hızlıdır.",
      "İleri derslerde ağaçlar diskle buluşur: veritabanı indeksleri, her düğümü bir disk bloğu kadar geniş olan <strong>B-ağaçları</strong>dır ve milyarlarca kaydı üç dört okumayla bulur. Fibonacci heap bazı işlemleri amortize O(1)'e indirir, kalıcı (persistent) veri yapıları eski sürümleri silmeden yeni sürüm üretir ve fonksiyonel dillerin temelidir. Çizgeler için komşuluk listesi ile matris seçimi, algoritmanın O(V+E) mi O(V²) mi olacağını belirler. Sonunda her veri yapısı aynı sorunun bir cevabıdır: hangi işlemleri ucuz tutmak istiyorsun ve bunun için neyden vazgeçmeye razısın?",
    ],
    topics: ["Amortize analiz", "Bellek hiyerarşisi ve önbellek yerelliği", "AVL, kırmızı-siyah ve B-ağaçları", "Evrensel hashing", "Fibonacci heap", "Kalıcı veri yapıları", "Çizge gösterimleri"],
  },
  quiz: [
    {
      question: "Sayfadaki tabloda hash(k) = k mod 7'dir ve 15 numaralı anahtar [1] yuvasındadır. Aşağıdakilerden hangisi 15 ile aynı yuvaya düşer?",
      options: ["29", "30", "31", "32"],
      answer: 0,
      explanation: "29 = 4 × 7 + 1, kalan 1. 30, 31 ve 32'nin kalanları sırasıyla 2, 3 ve 4'tür. Aynı kalanı veren anahtarlar çakışır ve aynı zincire eklenir.",
    },
    {
      question: "Bir min-heap'in dizi gösterimi için hangisi doğrudur?",
      options: [
        "Dizi her zaman küçükten büyüğe sıralıdır.",
        "Her ebeveyn çocuklarından küçük ya da eşittir; dizinin sıralı olması gerekmez.",
        "En büyük eleman her zaman dizinin son hücresindedir.",
        "Herhangi bir elemanı aramak O(log n) sürer.",
      ],
      answer: 1,
      explanation: "Heap kuralı yalnızca ebeveyn ile çocuk arasındadır; sayfadaki [8, 17, 15, 30, 22, 42, 50] dizisi geçerli bir heap'tir ama sıralı değildir. En büyük eleman bir yapraktadır ama hangi yaprak olduğu belli değildir; rastgele arama O(n)'dir.",
    },
    {
      question: "Boş bir ikili arama ağacına 10, 20, 30, …, 110 sayıları bu sırayla eklenirse ağacın derinliği kaç olur?",
      options: ["Derinlik 4", "Derinlik 11", "Yaklaşık 3.5", "Derinlik 1"],
      answer: 1,
      explanation: "Her yeni sayı ağaçtaki her şeyden büyük olduğu için hep sağa gider; 11 düğüm tek bir zincir oluşturur ve derinlik 11'dir. Aynı sayılar dengeli eklenseydi derinlik 4 olurdu (sayfadaki örnek ağaç gibi).",
    },
  ],
  next: [
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme", why: "O(1), O(log n), O(n) etiketlerinin arkasındaki matematik: büyüme hızlarını ölçmeyi ve karşılaştırmayı öğren." },
    { href: "siralama-algoritmalari.html", title: "Sıralama Algoritmaları", why: "'Min. Çıkar'ı sekiz kez basınca yaptığın heapsort'u, hızlı sıralama ve birleştirmeli sıralamayla yan yana izle." },
    { href: "yol-bulma-algoritmalari.html", title: "Yol Bulma Algoritmaları", why: "Kuyruk BFS'i, öncelik kuyruğu Dijkstra'yı çalıştırır; veri yapısı seçiminin bir haritada yolu nasıl bulduğunu gör." },
    { href: "isaretciler-ve-bellek-yonetimi.html", title: "İşaretçiler ve Bellek Yönetimi", why: "Bağlı listedeki 'sonraki' adresinin ve çağrı yığınının bellekte gerçekten neye karşılık geldiğini keşfet." },
  ],
  sources: [
    { title: "MIT OpenCourseWare · 6.006 Introduction to Algorithms (2020)", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/", note: "Diziler, bağlı listeler, hash tabloları, ikili arama ağaçları ve heap'ler için ders videoları ve notlar (İngilizce, açık ders)." },
    { title: "Python belgeleri · Veri Yapıları (tutorial 5)", url: "https://docs.python.org/3/tutorial/datastructures.html", note: "Liste, yığın ve kuyruk olarak liste kullanımı, sözlükler (hash tablosu) ve kümeler; her kavramı birkaç satır kodla deneyebilirsin." },
    { title: "Python belgeleri · heapq modülü", url: "https://docs.python.org/3/library/heapq.html", note: "Sayfadaki min-heap'in aynısı: dizi gösterimi, 2i+1 / 2i+2 kuralı ve heapsort örneği." },
    { title: "Wikipedia · Hash table", url: "https://en.wikipedia.org/wiki/Hash_table", note: "Luhn'un 1953 yazışması, yük faktörü, zincirleme ve açık adresleme; tarihçe ve karmaşıklık tablosu (İngilizce)." },
  ],
  revision: "Ekim 2026",
};
