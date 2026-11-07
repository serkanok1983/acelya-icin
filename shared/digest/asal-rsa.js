window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["asal-rsa"] = {
  slug: "asal-rsa",
  title: "Asal Sayılar ve RSA: Elekten Şifreye",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "İki asalı çarpmak bir an sürer, çarpımdan asalları geri bulmak yıllar. Eratosthenes'in eleğinden Riemann'ın sorusuna, 561'in hilesinden RSA anahtarına uzanan yol bu asimetride saklı.",
  hook:
    "1940'ta G. H. Hardy, sayılar teorisinde henüz kimsenin savaşa yarar bir kullanım bulmadığını ve uzun yıllar bulunmasının pek olası görünmediğini yazdı. Bugün telefonundaki güvenli bağlantıların bir kısmı, iki büyük asalın çarpımını geri bölmenin ne kadar zor olduğuna yaslanıyor. İki asalı çarpmak bir an sürerken, çarpımı yeniden asallarına ayırmak neden evrenin yaşından uzun sürebilir?",
  bigIdea:
    "Asallar tam sayıların <strong>atomlarıdır</strong>: tek tek düzensiz, toplu hâlde 1/ln x yoğunluğuyla şaşırtıcı ölçüde düzenli dağılırlar; RSA bu dünyanın bir asimetrisine yaslanır: büyük bir asal bulmak ve iki asalı çarpmak kolaydır, çarpımı yeniden asallarına ayırmak ise bildiğimiz kadarıyla çok zordur.",
  story: [
    "Asallarla ilgili en eski iki büyük fikir bugün de ders kitaplarının ilk sayfasındadır. Öklid'in <em>Elementler</em>'inde (MÖ 300 dolayı, IX. kitap, 20. önerme) asalların sonsuz olduğu tek paragrafta kanıtlanır: elindeki bütün asalları çarp ve 1 ekle. Çıkan sayı listedeki hiçbir asala bölünmez; öyleyse ya kendisi asaldır ya da listede olmayan bir asala bölünür. Her iki durumda da liste eksiktir. Eleğin hikâyesi ise bir aktarmaya dayanır. Dünya'nın çevresini ölçen, İskenderiye Kütüphanesi'nin başındaki Eratosthenes'in (MÖ 3. yüzyıl) bu konudaki kendi yazıları bize ulaşmadı; yöntemi ona üç yüzyılı aşkın bir süre sonra Gerasalı Nikomakhos'un <em>Aritmetiğe Giriş</em>'i atfeder. Adın kanıtı ikinci elden, yöntemin kendisi ise sayfada adım adım çalışan algoritmanın ta kendisidir: işaretsiz ilk sayı asaldır, katlarını çiz, devam et.",
    "Tek tek bakınca asallar düzensizdir: 89'dan sonra 97'ye kadar boşluk vardır, 101 ile 103 ise yan yanadır. Toplu bakınca bir yasa belirir. Carl Friedrich Gauss, 1849'da Encke'ye yazdığı bir mektupta, 1792 ya da 1793'te, on beş on altı yaşlarındayken asalların x civarındaki sıklığının yaklaşık 1/ln x olduğunu fark ettiğini, sonraki yıllarda da boş kalan çeyrek saatlerde bin sayılık blokların asallarını saydığını anlatır. Elimizdeki kanıt, elli yıldan uzun süre sonra yazılmış bu kendi anlatımıdır. Adrien-Marie Legendre ise 1798'de benzer bir formül yayımlamış, 1808'de onu x/(ln x − 1.08366) biçimine getirmişti. Asıl sıçrama 1859'da geldi: Bernhard Riemann, sayılar teorisi üzerine yazdığı tek makalede asalların sayısını ζ(s) = 1 + 2<sup>−s</sup> + 3<sup>−s</sup> + … fonksiyonunun karmaşık sıfırlarına bağladı ve aşikâr olmayan sıfırların hepsinin gerçel kısmının 1/2 olmasını 'çok olası' buldu. <strong>Riemann hipotezi</strong> adını alan bu soru Hilbert'in 1900'deki ünlü listesine, Clay Enstitüsü'nün 2000'de ilan ettiği bir milyon dolarlık Milenyum Problemleri'ne girdi ve hâlâ açıktır. Riemann'ın yolundan giden Jacques Hadamard ile Charles de la Vallée Poussin ise 1896'da, birbirinden bağımsız olarak, <strong>asal sayı teoremini</strong> kanıtladı: π(x) ile x/ln x'in oranı 1'e gider.",
    "Hardy'nin 1940 tarihli <em>Bir Matematikçinin Savunması</em>'nda gündelik işlerden uzak, 'temiz' bir uğraş diye övdüğü sayılar teorisi, otuz yedi yıl sonra şifrelemenin merkezindeydi (açık anahtarlı şifrelemenin doğuşunu Siber Güvenlik sayfası anlatıyor). Ağustos 1977'de Martin Gardner, Scientific American'daki köşesinde yeni yöntemi okurlarına tanıttı ve 129 basamaklı bir n ile şifrelenmiş bir cümle yayımladı. Çözene 100 dolar ödül vardı; köşenin başlığı böyle bir şifrenin kırılmasının milyonlarca yıl süreceğini söylüyordu. Sonradan RSA-129 diye anılan sayı, Nisan 1994'te internet üzerinden çalışan yaklaşık 600 gönüllünün bilgisayarlarıyla, ikinci dereceden elek (quadratic sieve) yöntemiyle çarpanlarına ayrıldı; açılan cümle 'The Magic Words are Squeamish Ossifrage' idi. On yedi yılı kısaltan şey yalnız daha hızlı bilgisayarlar değil, aradaki yıllarda bulunan daha iyi algoritmalardı. Yarış sürüyor: 829 bitlik RSA-250, 2020'de sayı cismi kalburuyla yaklaşık 2700 çekirdek-yılda ayrıldı. Bugün en az 2048 bit önerilir; sayfanın uzatma paneli, oyuncak saldırıların bu boyda evrenin yaşını kaç kat aştığını gösterir.",
  ],
  core: [
    {
      heading: "Atomlar ve elek: p²'den başla, √N'de dur",
      body:
        "1'den büyük olup yalnız 1'e ve kendisine bölünen sayıya <strong>asal</strong> denir. <strong>Aritmetiğin temel teoremi</strong>, her doğal sayının asalların çarpımı olarak, sıra dışında tek türlü yazıldığını söyler: 3233 = 53·61 ve başka yolu yoktur. 1'in asal sayılmamasının nedeni budur; sayılsaydı 6 = 2·3 = 1·2·3 = 1·1·2·3 diye sonsuz yazılış olurdu. Eratosthenes eleği bu yapıyı kullanır. İşaretsiz ilk sayı p asaldır; katlarını çiz. Çizmeye p²'den başlamak yeter: k < p için k·p'nin p'den küçük bir asal çarpanı vardır ve o sayı çoktan çizilmiştir. Durmak için √N yeter: N'yi aşmayan bileşik bir sayı a·b ise a ile b'nin ikisi birden √N'den büyük olamaz. Maliyet şaşırtıcı biçimde küçüktür. p'nin katları yaklaşık N/p çizme ister, toplam N·Σ 1/p olur; asalların terslerinin toplamı ıraksar ama çok yavaş, ln ln N gibi büyür. Bu yüzden eleme neredeyse doğrusal sürede biter.",
      formula: "Σ<sub>p ≤ √N</sub> (⌊N/p⌋ − p + 1) ≈ N·(ln ln √N + M),  M ≈ 0.2615",
      formulaNote: "Sol taraf sayfanın saydığı tam çizme sayısıdır: N = 100 için 104 (2p'den başlansaydı 113), kaba kestirim 110. M, Meissel–Mertens sabitidir.",
    },
    {
      heading: "Asal sayı teoremi: x/ln x, Li(x) ve Riemann'ın sorusu",
      body:
        "x civarında seçilen bir sayının asal olma olasılığı yaklaşık 1/ln x'tir: 1000 civarında yedide bir, bir milyon civarında on dörtte bir, 10⁷ civarında on altıda bir. Bu yoğunluğu 2'den x'e toplarsan <strong>logaritmik integral</strong> Li(x) çıkar; kaba biçimi x/ln x'tir. Asal sayı teoremi ikisinin de π(x)'e oranının 1'e gittiğini söyler, ama hızları çok farklıdır: 10⁷'de x/ln x asalları %6.64 eksik sayar, Li(x) yalnız %0.051 fazla. Nedeni açılımda görünür: Li(x) ≈ x/ln x + x/(ln x)² + 2x/(ln x)³ + …; x/ln x yalnız ilk terimdir ve atılan terimler ln x büyüdükçe, yani çok yavaş küçülür. Asıl soru Li(x) ile π(x) arasındaki farktır. Riemann bu farkı ζ fonksiyonunun sıfırlarına bağladı: sıfırların gerçel kısmı ne kadar büyükse hata o kadar büyüyebilir. Riemann hipotezi doğruysa hata √x·ln x mertebesinde kalır; bu, asalların 'olabildiğince rastgele' dağıldığını söylemenin kesin biçimidir. 1896 kanıtı yalnız gerçel kısmı 1 olan doğruda sıfır bulunmadığını kullanır ve çok daha zayıf bir hata payı verir.",
      formula: "π(x) ~ x/ln x ~ Li(x) = ∫<sub>2</sub><sup>x</sup> dt/ln t;   RH ⇒ |π(x) − li(x)| < √x·ln x/(8π), x ≥ 2657",
      formulaNote: "Son eşitsizlik Schoenfeld'in (1976) Riemann hipotezine dayanan sınırıdır; li(x) = Li(x) + 1.045. 10⁷'de sınır 2028, sayfanın ölçtüğü |π(x) − Li(x)| ise 338.4 asaldır.",
    },
    {
      heading: "Saat aritmetiği: Euler teoremi ve modüler ters",
      body:
        "Mod n hesapta yalnız kalanlarla çalışırsın: 17 ≡ 2 (mod 15). Toplama ve çarpma kalanlarla uyumludur, bölme değildir; a'ya bölmek, a·a<sup>−1</sup> ≡ 1 olan bir <strong>modüler ters</strong> bulmak demektir ve bu ancak gcd(a, n) = 1 iken mümkündür. Böyle kalanların sayısı Euler'in φ(n)'sidir: asal p için p − 1, n = pq için (p − 1)(q − 1). <strong>Euler teoremi</strong>, gcd(a, n) = 1 ise a<sup>φ(n)</sup> ≡ 1 (mod n) der. Kısa bir kanıtı var: n ile aralarında asal r<sub>1</sub>, …, r<sub>φ</sub> kalanlarının her birini a ile çarparsan aynı kalanlar yalnız sıraları karışmış olarak geri gelir, çünkü a tersinir olduğundan iki farklı r aynı yere düşemez. İki listenin çarpımını eşitle: a<sup>φ</sup>·R ≡ R; R de tersinirdir, öyleyse a<sup>φ</sup> ≡ 1. Tersi bulmanın yolu <strong>genişletilmiş Öklid algoritmasıdır</strong>: bölmeleri yaparken her kalanı a·s + n·t biçiminde taşırsın; kalan 1'e indiğinde a·s ≡ 1 (mod n), yani s terstir. Yöntem çok hızlıdır: Lamé'nin 1844 sınırına göre bölme sayısı, küçük sayının basamak sayısının beş katını geçmez.",
      formula: "a<sup>φ(n)</sup> ≡ 1 (mod n);   a·s + n·t = 1 ⇒ a<sup>−1</sup> ≡ s (mod n)",
      formulaNote: "Örnek: 17·(−367) + 3120·2 = 1, öyleyse 17⁻¹ ≡ −367 ≡ 2753 (mod 3120). Sayfadaki '17 ve 3120 (RSA'da d)' düğmesi bu satırları gösterir.",
    },
    {
      heading: "Hızlı üs alma ve asallık sınaması: Fermat'dan Miller–Rabin'e",
      body:
        "65<sup>17</sup>'yi 16 çarpmayla değil, üssün ikili yazılışını izleyerek 5 çarpmayla hesaplarsın: her bitte kare al, bit 1 ise bir kez de tabanla çarp, her adımda mod al. İş üssün bit uzunluğuyla büyür; 2048 bitlik bir üs en çok yaklaşık 4000 çarpma ister. Bu hız asallığı sınamayı mümkün kılar. Fermat'nın küçük teoremi p asalsa a<sup>p−1</sup> ≡ 1 (mod p) der; öyleyse a<sup>n−1</sup> ≢ 1 çıkarsa n kesinlikle bileşiktir. Ama bileşik olduğu hâlde n ile aralarında asal her tabanda sınamayı geçen <strong>Carmichael sayıları</strong> vardır; en küçüğü 561 = 3·11·17'dir. <strong>Miller–Rabin</strong> sınaması (Miller 1976, Rabin 1980) bir adım daha atar: asal modülde x² ≡ 1'in çözümleri yalnız ±1'dir. n − 1 = 2<sup>s</sup>·d yaz, a<sup>d</sup>'den başla ve kare alarak ilerle; zincir −1'e uğramadan 1'e varırsa 1'in ±1 olmayan bir karekökünü bulmuşsundur ve n bileşiktir. 9'dan büyük bileşik bir tek n için tabanların en çok dörtte biri bu sınamayı kandırabilir; k rastgele tabanın hepsi birden en çok 4<sup>−k</sup> olasılıkla yanılır.",
      formula: "n − 1 = 2<sup>s</sup>·d:  a<sup>d</sup> ≡ 1  ya da bir j < s için  a<sup>2<sup>j</sup>·d</sup> ≡ −1 (mod n)",
      formulaNote: "Bu koşulu sağlamayan a bir tanıktır. 561'de 560 = 2⁴·35 ve taban 2 için zincir 263, 166, 67, 1: −1'e uğramadan 1'e varıldı; 67² ≡ 1 ve gcd(66, 561) = 33 bir çarpan bile verir.",
    },
    {
      heading: "RSA neden çalışır, güvenliği neye yaslanır?",
      body:
        "Anahtar iki büyük asalla kurulur: n = pq açıklanır, φ(n) = (p − 1)(q − 1) gizli kalır. e, φ(n) ile aralarında asal seçilir ve d = e<sup>−1</sup> mod φ(n) genişletilmiş Öklid'le bulunur. Şifreleme c = m<sup>e</sup> mod n, çözme c<sup>d</sup> mod n'dir. m neden geri gelir? e·d = 1 + kφ(n) olduğundan m<sup>ed</sup> = m·(m<sup>φ(n)</sup>)<sup>k</sup> ≡ m; gcd(m, n) > 1 olan nadir m'ler için eşitlik Çin kalan teoremiyle mod p ve mod q'da ayrı ayrı doğrulanır. Güvenlik n'den φ(n)'ye geçişin zorluğundadır. φ(n)'yi bilen, p + q = n − φ(n) + 1 ve pq = n'den ikinci dereceden bir denklemle p ile q'yu hemen bulur; d'yi bilen de n'yi verimli biçimde çarpanlarına ayırabilir. En saf saldırı <strong>deneme bölmesidir</strong>: küçük asala kadar yaklaşık √n/2 bölme. Pollard'ın 1975'teki <strong>rho yöntemi</strong> x ↦ x² + c dizisini dolaştırır; dizi mod p'de doğum günü paradoksu yüzünden yaklaşık √p adımda kendini tekrarlar ve gcd çarpanı ele verir: n<sup>1/4</sup> mertebesi. İkisi de bit sayısında üsteldir. Bilinen en iyi klasik yöntem, sayı cismi kalburu, alt-üsteldir ama polinom değildir; çarpanlara ayırmanın polinom zamanda yapılamayacağı ise kanıtlanmış değildir.",
      formula: "e·d ≡ 1 (mod φ(n)) ⇒ (m<sup>e</sup>)<sup>d</sup> ≡ m (mod n);   deneme bölmesi ≈ √n/2,  rho ≈ √p ≈ n<sup>1/4</sup>",
      formulaNote: "n'ye 4 bit eklemek rho işini 2 kat, deneme bölmesini 4 kat artırır; sayfadaki tarama rho eğimini 1/4 kuramına karşı 0.252 ± 0.005 ölçer.",
    },
  ],
  lab: {
    intro:
      "Sayfa üç sekmedir; adresin sonuna #elek, #mod ya da #rsa yazarak doğrudan açabilirsin. <strong>Asal elek ve dağılım</strong> sekmesinde Üst sınır N (10–400), Hız, Bir adım, Otomatik çalıştır, Baştan başlat ve Sıfırla ile ızgara eleği yürür; bileşikler en küçük asal çarpanlarının renginde çizilir. Aynı anda arka planda 10⁷'ye kadar parçalı bir eleme çalışır; Sınır x kaydırıcısı, 10³…10⁷ düğmeleri ve dört görünümlü Grafik menüsü π(x)'i, göreli hataları, ardışık farkları ve ikiz asalları gösterir. <strong>Modüler aritmetik</strong> sekmesinde Euler teoremi tablosu, Fermat ve Miller–Rabin paneli (Sınanan sayı n, hazır sayılar, Rastgele taban sayısı k, Tohum), Öklid algoritması ve Hızlı üs alma panelleri vardır. <strong>RSA</strong> sekmesinde Asal p, Asal q, Rastgele asal, Ders kitabı örneği, Açık üs e, Mesaj m (sayı) ve Şifrele / Çöz ile anahtar kurulur; saldırı panelinde Çarpanlara ayır, Durdur ve Taramayı yeniden başlat düğmeleri bulunur. Açılıştaki anahtar ders kitabı örneği değildir: 1977 tohumuyla çekilen 20 bitlik iki asaldır (p = 894 667, q = 878 641, e = 65537). Saldırılar ve tarama yalnız RSA sekmesi açıkken ilerler.",
    experiments: [
      {
        title: "Neden p²'den başlanır, neden √N'de durulur?",
        predict:
          "N = 100 iken katları çizilecek asallar hangileri? Sıra 7'ye geldiğinde 7'nin hangi katları zaten çizilmiştir? Toplam kaç çizme beklersin; 2p'den başlansaydı kaç olurdu?",
        do:
          "Sıfırla'ya bas (N = 100). Bir adım'a üç kez bas ve kartlarla durum satırını oku; sonra bir kez daha bas. Ardından Üst sınır N'yi 400 yap ve Bir adım'a eleme bitene kadar bas.",
        observe:
          "Üç basıştan sonra p = 7 ve Çizme işlemi 96 / 104; durum satırı 14, 21, 28, 35, 42'nin zaten çizili olduğunu, 7'nin 8 çizmesinden 3'ünün yeni olduğunu yazar (49, 77, 91). Dördüncü basışta eleme biter: π(100) = 25, 104 çizme (2p'den 113), 30 yeniden çizme, durma sayısı 11. N = 400'de π = 78, 511 çizme (572), 190 yeniden çizme; son kullanılan asal 19, durma sayısı 23.",
        explain:
          "k < p ise k·p'nin p'den küçük bir asal çarpanı vardır; p²'den başlamak 100'de 9 boş çizmeyi önler. 11² = 121 > 100 olduğu için 11 hiçbir şey çizmez: 100'ü aşmayan her bileşiğin √100 = 10'u aşmayan bir asal çarpanı vardır. Yine de çizmelerin yaklaşık üçte biri boşa gider (30 / 104): 30 = 2·3·5 gibi sayılar her küçük asal çarpanı için bir kez çizilir.",
      },
      {
        title: "Gauss'un yoğunluğu: x/ln x mi, Li(x) mi?",
        predict:
          "x = 10⁷'de x/ln x asal sayısını yüzde kaç eksik sayar? Li(x) yanılırsa hangi yönde ve kaç asal? Riemann hipotezinin izin verdiği en büyük fark ölçülenin kaç katıdır?",
        do:
          "Asal sayıların dağılımı panelinde Eleme kartı '664 579 asal' yazınca 10⁷ düğmesine bas; tabloyu, kartları ve durum satırını oku. Sonra 10⁶'ya geç, İkiz asal çiftleri kartını oku ve Grafik menüsünden 'İkiz asallar ve Hardy–Littlewood' görünümünü seç.",
        observe:
          "π(10⁷) = 664 579; x/ln x 620 420.7 (−6.64 %), Li(x) 664 917.4 (+0.051 %, yani +338.4 asal). Durum satırı Riemann hipotezinin sınırını √x·ln x/(8π) = 2028.0 olarak yazar; ölçülen fark bunun altıda biri. 10⁶'da ikiz çiftler 8169; Hardy–Littlewood'un integral biçimi 8248.0 (+0.97 %), kaba biçimi 6917.5 (−15.32 %) verir. Grafikte integral biçim sıfır çizgisine yaklaşır (10⁷'de −0.38 %); kaba biçim ise 10⁷'de bile ikizleri %13.83 eksik sayar.",
        explain:
          "x/ln x, Li(x)'in açılımındaki ilk terimdir; atılan x/(ln x)² + … terimleri çok yavaş küçüldüğü için %6.6'lık hata 10⁷'de hâlâ büyüktür. Li(x) ise yerel yoğunluk 1/ln t'yi tek tek toplar. Aradaki 338 asal, hipotezin öngördüğü √x ölçeğinin rahatça içindedir. İkizlerde de aynı ders geçerli: iki biçim asimptotik olarak eşdeğerdir, ama kaba formülün hatası ancak 1/ln x hızında söner, yoğunluğu toplayan integral biçim çok daha iyidir. Hardy–Littlewood tahmini ise bir sanıdır, kanıt değil.",
      },
      {
        title: "561'in hilesi: Fermat kanar, Miller–Rabin yakalar",
        predict:
          "561 = 3·11·17 bileşiktir. 2⁵⁶⁰ mod 561 kaç çıkar? 1 ile 560 arasındaki tabanlardan kaçı Fermat sınamasını, kaçı Miller–Rabin'i kandırır? Kuramın sınırı φ(561)/4 kaçtır?",
        do:
          "Modüler aritmetik sekmesinde Fermat ve Miller–Rabin paneli açılışta n = 561, k = 5, tohum 1980 ile gelir; kartları ve taban haritasını oku. Sonra '2047 = 23·89' düğmesine bas. Zinciri elle izlemek için Hızlı üs alma'daki '2⁵⁶⁰ mod 561' düğmesini kullan.",
        observe:
          "'Fermat sınaması, taban 2' geçti der: 2⁵⁶⁰ ≡ 1. 'Miller–Rabin, taban 2' kaldı: zincir 263, 166, 67, 1, 1; 67² ≡ 1 ama 67 ≢ ±1 ve gcd(66, 561) = 33. Yalancı tabanlar kartı 'Fermat 320 · güçlü 10' ve sınır φ(n)/4 = 80 yazar; haritada 240 gri, 310 mor, 10 kırmızı hücre vardır. 2047'de taban 2 Miller–Rabin'i de kandırır (güçlü 242, sınır 484), ama 5 rastgele tabanın 2'si tanıktır.",
        explain:
          "561 bir Carmichael sayısıdır: 560; 3 − 1, 11 − 1 ve 17 − 1'e bölünür, bu yüzden 561 ile aralarında asal her a için a⁵⁶⁰ ≡ 1. Fermat onu ancak ortak bölenli bir tabana denk gelirse yakalar. Miller–Rabin asal modülde 1'in karekökünün yalnız ±1 olduğunu kullanır; 67 bunu çiğner ve bir çarpan da verir. 2047, 2 tabanında güçlü sahte asaldır; tabanların rastgele seçilmesinin nedeni budur.",
      },
      {
        title: "40 bitlik anahtarı kır, eğimi ölç",
        predict:
          "Açılıştaki n = 786 091 107 547 (40 bit) için deneme bölmesi kaç bölme yapar? Rho, √p ≈ 937 kuramına göre kaç yineleme alır? n'ye 4 bit eklemek rho işini kaç kat artırmalı; taramadaki eğim kaç çıkmalı?",
        do:
          "RSA sekmesini aç ve dokunmadan bekle: saldırı ve tarama Saldırı tohumu 1 ile kendiliğinden başlar. Saldırı tablosunu, Bulunan çarpanlar kartını, iki tarama kartını ve uzatma kartını oku. Sonra tohumu 2 yap: saldırı aynı n'de yeniden koşar, tarama da baştan başlar.",
        observe:
          "Deneme bölmesi 439 321 bölme yapar, (p + 1)/2'ye tam eşit (oran 1.000). Rho, n'yi 853 yinelemede 878 641 · 894 667 diye ayırır: yineleme/√p = 0.910; deneme bölmesi rho'nun 515 katı iş yapar. Bulunan çarpanlar kartı d = 506 291 572 673'ü yeniden hesaplar. Tarama eğimi 0.252 ± 0.005 (kuram 1/4, fark +0.4 SE), deneme bölmesi eğimi 0.500, yineleme/√p ortalaması 0.670 ± 0.033. Tohum 2 aynı n'de 573 yineleme verir.",
        explain:
          "Deneme bölmesi küçük asala kadar her tek sayıyı dener: (p + 1)/2 ≈ √n/2, bit başına 1/2 eğim. Rho'da dizi mod p'de yaklaşık √p adımda döngüye girer; √p ≈ n^(1/4) olduğundan eğim 1/4'tür ve 0.252 bununla uyumludur. Tek anahtarın sabiti 0.2 ile 1.5 arasında savrulur, ortalamayı tarama verir. Uzatma kartı 2048 bit için 9.0×10¹⁵³ rho yinelemesi, saniyede 10⁹ işlemle 2.8×10¹³⁷ yıl yazar: ölçüm değil, kuramın uzatması.",
      },
    ],
  },
  wow: [
    {
      title: "561: asal kılığındaki bileşik",
      body:
        "1899'da Alwin Korselt bir ölçüt verdi: kare çarpanı olmayan bileşik n'nin her asal böleni p için p − 1, n − 1'i bölüyorsa n, Fermat sınamasını aralarında asal her tabanda geçer. Ama örnek vermedi. Robert Carmichael 1910'da en küçüğünü yayımladı: 561 = 3·11·17, çünkü 560 hem 2'ye, hem 10'a, hem 16'ya bölünür. Bu sayılar bugün onun adını taşır; sonrakiler 1105 ve 1729'dur. Sonsuz çok oldukları seksen yılı aşkın bir süre yalnız bir sanı olarak kaldı; 1994'te W. R. Alford, Andrew Granville ve Carl Pomerance kanıtladı.",
    },
    {
      title: "Rho'nun en ünlü avı: F₈",
      body:
        "Fermat 1640'ta 2<sup>2<sup>k</sup></sup> + 1 biçimindeki bütün sayıların asal olduğunu sandı; Euler 1732'de F₅ = 4 294 967 297 = 641·6 700 417 ile yanıldığını gösterdi. 78 basamaklı F₈ = 2²⁵⁶ + 1'in 16 basamaklı asal çarpanını, 1 238 926 361 552 897'yi, 1980'de Richard Brent ve John Pollard rho yönteminin Brent'in hızlandırdığı biçimiyle buldu; geriye 62 basamaklı bir asal kaldı. Rho'nun işi n'ye değil küçük çarpana bağlıdır: √p ≈ 3.5×10⁷ adım, 1980'in bilgisayarı için bile erişilebilir bir sayı.",
    },
    {
      title: "Yetmiş milyondan 246'ya",
      body:
        "İkiz asal sanısı, farkı 2 olan sonsuz sayıda asal çifti olduğunu söyler ve hâlâ kanıtsızdır; sayfa 10⁷'nin altında 58 980 ikiz çift sayar. 2013'te Yitang Zhang, farkı 70 milyonu aşmayan sonsuz sayıda asal çifti olduğunu kanıtlayarak ilk sonlu sınırı koydu. Aynı yıl James Maynard bağımsız bir yöntemle sınırı 600'e indirdi; Terence Tao'nun başlattığı açık işbirliği Polymath ile 2014'te sınır 246'ya düştü. Sınırı 2'ye indirmek, ikiz asal sanısını kanıtlamak demektir.",
    },
  ],
  worked: {
    title: "Ders kitabı anahtarı: p = 61, q = 53, e = 17",
    prompt:
      "Ders kitabı anahtarını baştan sona kur: p = 61, q = 53, e = 17. n ve φ(n)'yi bul, d'yi genişletilmiş Öklid algoritmasıyla hesapla, m = 65'i tekrarlı kare almayla şifrele ve sonucu çözerek m'yi geri al. Her adımda kaç modüler çarpma yaptığını say.",
    steps: [
      "n = 61·53 = 3233 (12 bit), φ(n) = 60·52 = 3120. 17 asaldır ve 3120'yi bölmez, öyleyse gcd(17, 3120) = 1 ve e geçerlidir. φ'nin neden gizli kaldığına bir bak: p + q = n − φ(n) + 1 = 114 olur ve φ'yi bilen biri t² − 114t + 3233 = 0 denkleminden 61 ile 53'ü hemen bulur.",
      "d için bölmeler: 3120 = 183·17 + 9; 17 = 1·9 + 8; 9 = 1·8 + 1. Geriye doğru yerine koy: 1 = 9 − 8 = 2·9 − 17 = 2·(3120 − 183·17) − 17 = 2·3120 − 367·17. Demek ki 17·(−367) ≡ 1 (mod 3120) ve d = 3120 − 367 = 2753. Doğrulama: 17·2753 = 46 801 = 15·3120 + 1.",
      "Şifrele: 17 = 10001₂. 65'ten başla ve dört kez kare al, her seferinde mod 3233: 65² = 4225 → 992; 992² → 1232; 1232² → 1547; 1547² → 789. Son bit 1 olduğundan bir kez de 65 ile çarp: 789·65 = 51 285 → 2790. Şifreli metin c = 2790; 4 kare + 1 çarpma = 5 işlem, saf yöntem 16 çarpma isterdi.",
      "Çöz: 2753 = 101011000001₂ (12 bit, beş tane 1), yani 11 kare + 4 çarpma. Zincir: 2790 → 2269 → 1425 → ·c 2393 → 806 → 3036 → ·c 3213 → 400 → ·c 615 → 3197 → 1296 → 1689 → 1215 → 1977 → 3065 → ·c 65. Neden m geri geldi? e·d = 1 + 15·3120 olduğundan c<sup>d</sup> ≡ 65·(65<sup>3120</sup>)<sup>15</sup> ≡ 65 (mod 3233); gcd(65, 3233) = 1 ve Euler teoremi.",
      "Sayfada dene: RSA sekmesinde Ders kitabı örneği'ne bas; adımlar n = 3233, φ = 3120, d = 2753, c = 2790 (4 kare + 1 çarpma) ve çözülen 65'i (11 kare + 4 çarpma) yazar. '17 ve 3120 (RSA'da d)' düğmesi aynı bölmeleri ve s = −367'yi gösterir. e = 65537 seçersen de d = 2753 ve c = 2790 çıkar, çünkü 65537 = 21·3120 + 17; yalnız şifreleme 17 çarpmaya çıkar.",
    ],
    result:
      "n = 3233, φ(n) = 3120, d = 2753; m = 65 → c = 2790 (5 modüler çarpma) → 2790<sup>2753</sup> mod 3233 = 65 (15 modüler çarpma). Saf yöntemle çözme 2752 çarpma isterdi.",
  },
  misconceptions: [
    {
      myth: "RSA'nın güvenliği matematiksel olarak kanıtlanmıştır.",
      truth:
        "Kanıtlanan yalnız şudur: φ(n)'yi ya da d'yi bulmak, n'yi çarpanlarına ayırmak kadar zordur. Çarpanlara ayırmanın gerçekten zor olduğu bir varsayımdır; polinom zamanlı klasik bir algoritmanın olmadığı kanıtlanmadı ve d'siz şifre çözmenin çarpanlara ayırmaya denk olup olmadığı da bilinmiyor. Yeterince büyük bir kuantum bilgisayar, Shor algoritmasıyla bu varsayımı yıkardı. Sayfadaki deneme bölmesi ve rho yalnız en saf saldırılardır.",
    },
    {
      myth: "Fermat sınamasını birkaç tabanda geçen sayı asaldır.",
      truth:
        "561 = 3·11·17, kendisiyle aralarında asal 320 tabanın hepsinde aⁿ⁻¹ ≡ 1 verir; Fermat onu yalnız ortak bölenli bir tabana denk gelirse yakalar ve böyle Carmichael sayıları sonsuz çoktur. Miller–Rabin aynı hesaba karekök denetimini ekler; 561'de taban 2 bile yeter. Bileşik bir sayıyı kandıran taban oranı en çok dörtte bir olduğu için 20 rastgele taban yanılma olasılığını 4⁻²⁰ ≈ 10⁻¹²'nin altına indirir.",
    },
    {
      myth: "Sayılar büyüdükçe asallar seyrekleşir ve bir yerde tükenir.",
      truth:
        "Seyrekleşir ama tükenmez. Öklid'in kanıtı her sonlu listenin dışında bir asal bulur; yoğunluk 1/ln x olarak azalır ama sıfıra inmez: 10⁶ ile 10⁷ arasında hâlâ 586 081 asal var. Ardışık asallar arasında istenen uzunlukta boşluk da vardır (n! + 2, n! + 3, …, n! + n sayılarının hepsi bileşiktir), ama boşluktan sonra asallar yine gelir. Sayfada 10⁷'ye kadarki en büyük boşluk 154'tür.",
    },
    {
      myth: "Sayfadaki RSA, internette kullanılan RSA'nın ta kendisidir.",
      truth:
        "Dolgusuz 'ders kitabı RSA'sı belirlenimcidir ve değiştirilebilirdir. Ders kitabı örneğinde c' = 2¹⁷·c mod n = 3017 çözülünce 130 = 2m çıkar: saldırgan anahtarı bilmeden mesajı ikiye katladı. Gerçek sistemler şifrelerken rastgele OAEP dolgusu, imzalarken özet ve PSS dolgusu kullanır, en az 2048 bitlik n seçer ve RSA ile mesajın kendisini değil kısa bir simetrik anahtarı taşır. TLS 1.3'te RSA yalnız imza için kullanılır.",
    },
  ],
  glossary: [
    { term: "Asal sayı", definition: "1'den büyük olup yalnız 1'e ve kendisine bölünen doğal sayı; 1, çarpanlara ayırma tek türlü olsun diye asal sayılmaz." },
    { term: "Aritmetiğin temel teoremi", definition: "1'den büyük her doğal sayının asalların çarpımı olarak, çarpanların sırası dışında tek türlü yazılabilmesi." },
    { term: "Asal sayma fonksiyonu π(x)", definition: "x'i aşmayan asal sayıların sayısı; π(100) = 25, π(10⁷) = 664 579." },
    { term: "Logaritmik integral Li(x)", definition: "∫₂ˣ dt/ln t; asal yoğunluğu 1/ln t'nin toplamı ve π(x)'in en iyi basit kestirimi, 10⁷'de yalnız %0.051 fazla." },
    { term: "Euler fonksiyonu φ(n)", definition: "1 ile n arasında n ile aralarında asal olan sayıların sayısı; n = pq için (p − 1)(q − 1)." },
    { term: "Modüler ters", definition: "a·a⁻¹ ≡ 1 (mod n) sağlayan kalan; yalnız gcd(a, n) = 1 iken vardır ve genişletilmiş Öklid algoritmasıyla bulunur." },
    { term: "Carmichael sayısı", definition: "Bileşik olduğu hâlde n ile aralarında asal her a için aⁿ⁻¹ ≡ 1 (mod n) sağlayan sayı; en küçüğü 561." },
    { term: "Tanık ve güçlü yalancı", definition: "Miller–Rabin'de bir n'nin bileşik olduğunu kanıtlayan taban tanık, bileşik n'yi 'muhtemelen asal' diye geçiren taban güçlü yalancıdır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede asal bir tanımdır; üniversitede üç dersin kesiştiği yerdir. <strong>Sayılar Teorisi</strong> kongrüansları, Çin kalan teoremini (gerçek RSA yazılımları çözmeyi mod p ve mod q'da ayrı yapıp birleştirir), ilkel kökleri ve ikinci dereceden karşılıklılığı işler. <strong>Soyut Cebir</strong> aynı malzemeyi yapı olarak görür: mod n'de tersi olan kalanlar bir gruptur, Euler teoremi Lagrange teoreminin bir sonucudur ve sayfadaki tablonun 'grup devirli değil' uyarısı ilkel kökün ne zaman var olduğu sorusudur. <strong>Algoritmalar ve Karmaşıklık</strong> maliyeti girdinin bit sayısıyla ölçmeyi öğretir: n'nin kendisi değil, onu yazmak için gereken log₂ n bit girdinin boyudur. Bu ölçüde Öklid ve hızlı üs alma polinom, deneme bölmesi ve rho üsteldir. 2002'de Agrawal, Kayal ve Saxena asallığın rastgelelik kullanmadan polinom zamanda sınanabildiğini kanıtladı (AKS); çarpanlara ayırma için böyle bir algoritma bilinmiyor, olmadığı da kanıtlanmadı. En iyi bilinen klasik yöntem olan <strong>sayı cismi kalburu</strong> yaklaşık exp(1.92·(ln n)<sup>1/3</sup>(ln ln n)<sup>2/3</sup>) adım ister: üstelden yavaş, polinomdan hızlı büyür.",
      "Asal sayı teoreminin kanıtı <strong>Analitik Sayılar Teorisi</strong>'ndedir. Kapı Euler'in 1737'de bulduğu çarpımdır: ζ(s) = Σ n<sup>−s</sup> = Π<sub>p</sub> (1 − p<sup>−s</sup>)<sup>−1</sup>; bu eşitlik aritmetiğin temel teoreminin analiz diliyle söylenişidir. Riemann ζ'yi karmaşık düzleme taşıdı ve π(x)'i sıfırlar üzerinden bir toplam olarak yazan açık formülü kurdu; Dirichlet'nin, a ile n aralarında asalsa a, a + n, a + 2n, … dizisinde sonsuz asal bulunduğunu söyleyen teoremi (1837) de benzer araçlarla kanıtlanır. <strong>Kriptografi</strong> dersinde RSA'nın yanına <strong>eliptik eğri kriptografisi</strong> gelir: aynı güvenlik çok daha kısa anahtarla, bir eğri grubundaki ayrık logaritma problemiyle sağlanır. Shor algoritmasının ikisini birden tehdit etmesi kuantum sonrası kriptografiyi doğurdu; o hikâye Siber Güvenlik sayfasında.",
    ],
    topics: [
      "Sayılar Teorisi: kongrüanslar ve Çin kalan teoremi",
      "Soyut Cebir: (ℤ/nℤ)ˣ grubu ve ilkel kökler",
      "Algoritmalar ve Karmaşıklık: AKS (2002) ve P sınıfı",
      "Sayı cismi kalburu (GNFS)",
      "Eliptik eğri kriptografisi",
      "Riemann zeta fonksiyonu ve açık formül",
      "Analitik Sayılar Teorisi: Dirichlet teoremi",
      "Kuantum sonrası kriptografi",
    ],
  },
  quiz: [
    {
      question: "Dengeli bir RSA modülünde n'nin uzunluğu 40 bitten 80 bite çıkarsa Pollard rho'nun beklenen yineleme sayısı yaklaşık kaç katına çıkar?",
      options: ["2 katına", "2¹⁰ ≈ 1000 katına", "2²⁰ ≈ 1 milyon katına", "2⁴⁰ katına"],
      answer: 1,
      explanation:
        "Rho yaklaşık √p adım ister ve dengeli anahtarda √p ≈ n^(1/4)'tür. n, 2⁴⁰ kat büyürse n^(1/4), 2¹⁰ ≈ 1024 kat büyür. Deneme bölmesi (≈ √n/2) ise 2²⁰ ≈ 1 milyon kat yavaşlar. Sayfadaki tarama bunu ölçer: log₂(yineleme) bit başına 0.252 artar, 40 bitte yaklaşık 10; yani 2¹⁰ kat.",
    },
    {
      question: "N = 400'e kadar Eratosthenes eleği yaparken katlarını çizmen gereken en büyük asal hangisidir?",
      options: ["19", "23", "199", "397"],
      answer: 0,
      explanation:
        "400'ü aşmayan her bileşiğin √400 = 20'yi aşmayan bir asal çarpanı vardır; 20'nin altındaki en büyük asal 19'dur. 23'ün katlarından ilk çizilecek olanı 23² = 529 olurdu, bu da 400'ü aşar. Sayfada N = 400'de durma sayısı 23, kullanılan asallar 2'den 19'a kadardır.",
    },
    {
      question: "p = 5, q = 11, e = 3 olan küçük bir RSA anahtarında gizli üs d kaçtır?",
      options: ["d = 7", "d = 13", "d = 27", "d = 37"],
      answer: 2,
      explanation:
        "φ(n) = 4·10 = 40 ve d, 3·d ≡ 1 (mod 40) olmalıdır. 3·27 = 81 = 2·40 + 1 olduğundan d = 27. Ötekiler tutmaz: 3·13 = 39 ≡ −1, 3·7 = 21, 3·37 = 111 ≡ 31. Sayfada Asal p = 5, Asal q = 11, e = 3 yazarsan d kartı 27 gösterir.",
    },
  ],
  next: [
    { href: "siber-guvenlik.html", title: "Siber Güvenlik ve Kriptografi", why: "RSA'nın 1977'deki doğuşu, GCHQ'da gizli kalan keşif ve kuantum sonrası standartlar orada; aynı 'ileri kolay, geri zor' fikrini Diffie–Hellman ile p = 23 üstünde elle kur." },
    { href: "grup-teorisi.html", title: "Grup Teorisi", why: "Euler teoreminin öbür kanıtı: mod n'de tersi olan kalanlar bir gruptur ve Lagrange teoremi her mertebenin φ(n)'yi böldüğünü söyler; sayfadaki n = 5 tablosu oradaki Z₅ˣ'tir." },
    { href: "algoritmalar.html", title: "Algoritmalar", why: "Öklid algoritmasının 2300 yıllık hikâyesi aynı 1071 ve 462 örneğiyle orada; adım saymanın dili, O-gösterimi, √n ile log n arasındaki uçurumu netleştirir." },
    { href: "internet-ve-ag-teknolojileri.html", title: "İnternet ve Ağ Teknolojileri", why: "Katmanlar, portlar ve protokoller: HTTPS (port 443) ve TLS 1.3 ağ yığınının neresinde durur? Bu sayfadaki imza, HTTPS sertifikalarını doğrulayan işlemin oyuncak hâlidir." },
  ],
  sources: [
    { title: "Vikipedi · Asal sayı", url: "https://tr.wikipedia.org/wiki/Asal_say%C4%B1", note: "Tanım, aritmetiğin temel teoremi, Öklid'in kanıtı ve Eratosthenes eleği (Türkçe)." },
    { title: "Wikipedia · Prime number theorem", url: "https://en.wikipedia.org/wiki/Prime_number_theorem", note: "x/ln x ve Li(x) yaklaşımları, Gauss ile Legendre'nin tahminleri, 1896 kanıtları ve Riemann hipotezinin hata payına etkisi (İngilizce)." },
    { title: "Wikipedia · Miller–Rabin primality test", url: "https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test", note: "Güçlü yalancılar, dörtte bir sınırı, Carmichael sayıları ve belirli taban kümeleriyle kesin sınama (İngilizce)." },
    { title: "Wikipedia · RSA (cryptosystem)", url: "https://en.wikipedia.org/wiki/RSA_(cryptosystem)", note: "Anahtar üretimi, p = 61 ve q = 53 ile çözümlü örnek, dolgu şemaları (OAEP, PSS) ve bilinen saldırılar (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
