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
    "1940'ta G. H. Hardy, sayılar teorisi ile görelilikte henüz kimsenin savaşa yarar bir kullanım bulmadığını ve uzun yıllar bulunmasının pek olası görünmediğini yazdı. Bugün telefonundaki güvenli bağlantıların bir kısmı, iki büyük asalın çarpımını geri bölmenin ne kadar zor olduğuna yaslanıyor. İki asalı çarpmak bir an sürerken, çarpımı yeniden asallarına ayırmak neden evrenin yaşından uzun sürebilir?",
  bigIdea:
    "Asallar tam sayıların <strong>atomlarıdır</strong>: tek tek düzensiz, toplu hâlde 1/ln x yoğunluğuyla şaşırtıcı ölçüde düzenli dağılırlar; RSA bu dünyanın bir asimetrisine yaslanır: büyük bir asal bulmak ve iki asalı çarpmak kolaydır, çarpımı yeniden asallarına ayırmak ise bildiğimiz kadarıyla çok zordur.",
  story: [
    "Asallarla ilgili en eski iki büyük fikir bugün de ders kitaplarının ilk sayfasındadır. Öklid'in <em>Elementler</em>'inde (MÖ 300 dolayı, IX. kitap, 20. önerme) asalların sonsuz olduğu tek paragrafta kanıtlanır: elindeki bütün asalları çarp ve 1 ekle. Çıkan sayı listedeki hiçbir asala bölünmez; öyleyse ya kendisi asaldır ya da listede olmayan bir asala bölünür. Her iki durumda da liste eksiktir. Eleğin hikâyesi bir aktarmadır. Dünya'nın çevresini ölçen, İskenderiye Kütüphanesi'nin başındaki Eratosthenes'in (MÖ 3. yüzyıl) bu konudaki kendi yazıları bize ulaşmadı. Yöntemi, üç yüzyılı aşkın bir süre sonra Gerasalı Nikomakhos <em>Aritmetiğe Giriş</em>'te ona atfeder. Adın kanıtı ikinci elden, yöntemin kendisi ise sayfada adım adım çalışan algoritmanın ta kendisidir: işaretsiz ilk sayı asaldır, katlarını çiz, devam et.",
    "Tek tek bakınca asallar düzensizdir: 89'dan sonra 97'ye kadar boşluk vardır, 101 ile 103 ise yan yanadır. Toplu bakınca bir yoğunluk çıkar. Carl Friedrich Gauss, 1849'da Encke'ye yazdığı mektupta, bunu 1792 ya da 1793'te, on beş on altı yaşındayken gördüğünü anlatır: x civarında bir sayının asal çıkma şansı yaklaşık 1/ln x'tir. Sonraki yıllarda boş kalan çeyrek saatlerde bin sayılık blokların asallarını saymıştır. Elimizdeki kanıt, elli yıldan uzun süre sonra yazılmış bu kendi anlatımıdır. Adrien-Marie Legendre aynı sezgiyi 1798'de yayımlamış, 1808'de x/(ln x − 1.08366) biçimine getirmişti. Asıl soru, bu kestirimin ne kadar yanıldığıdır. Bernhard Riemann 1859'da, sayılar teorisi üzerine yazdığı tek makalede, farkı ζ(s) = 1 + 2<sup>−s</sup> + 3<sup>−s</sup> + … fonksiyonunun karmaşık sıfırlarına bağladı ve aşikâr olmayan sıfırların hepsinin gerçel kısmının 1/2 olmasını çok olası buldu. <strong>Riemann hipotezi</strong> diye anılan bu iddia Hilbert'in 1900 listesine ve Clay Enstitüsü'nün 2000'de koyduğu bir milyon dolarlık Milenyum Problemleri'ne girdi; hâlâ açıktır. Jacques Hadamard ile Charles de la Vallée Poussin, 1896'da birbirinden bağımsız olarak <strong>asal sayı teoremini</strong> kanıtladı: π(x) ile x/ln x'in oranı 1'e gider.",
    "G. H. Hardy, 1940 tarihli <em>Bir Matematikçinin Savunması</em>'nda sayılar teorisini savaştan uzak, zararsız bir uğraş diye övdü. Otuz yedi yıl sonra bu uğraş şifrelemenin ortasındaydı. Whitfield Diffie ile Martin Hellman 1976'da, açık bir kanaldan gizli anahtar kurulabileceğini gösterdi. Ron Rivest, Adi Shamir ve Leonard Adleman 1977'de aynı asimetriyi iki asalın çarpımına bağladı. Eşdeğer bir yöntem 1973'te GCHQ'da Clifford Cocks tarafından gizlice kurulmuş, 1997'de açıklanmıştı. Ağustos 1977'de Martin Gardner, Scientific American'daki Mathematical Games köşesinde yeni şifreyi okurlara anlattı. Yazının başlığı, böyle bir şifreyi kırmanın milyonlarca yıl süreceğini söylüyordu. Köşede 129 basamaklı bir n ile şifrelenmiş bir cümle ve çözene 100 dolar vardı. Sonradan RSA-129 diye anılan sayı, Nisan 1994'te altı yüzü aşkın gönüllünün yaklaşık 1600 makinesinde ikinci dereceden elekle çarpanlarına ayrıldı; makinelerden ikisi faks makinesiydi. Açılan cümle 'The Magic Words are Squeamish Ossifrage' idi. On yedi yılı kısaltan şey yalnız daha hızlı bilgisayarlar değil, arada bulunan daha iyi algoritmalardı. Yarış bitmedi: 829 bitlik RSA-250, 2020'de sayı cismi kalburuyla yaklaşık 2700 çekirdek-yılda ayrıldı. Bugün en az 2048 bit önerilir. Sayfanın uzatma kartı, oyuncak saldırıların bu boyda evrenin yaşını kaç kat aştığını ölçmeden, ölçülen sabitle uzatır.",
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
      formulaNote: "Schoenfeld'in (1976) sınırı Riemann hipotezine bağlıdır ve |π(x) − li(x)| içindir. li(x) = Li(x) + li(2), li(2) ≈ 1.04516. 10⁷'de sınır 2028.0'dır; sayfa aynı sayıyı |π(x) − Li(x)| için yazar, ölçülen fark 338.4 asaldır.",
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
        "65<sup>17</sup>'yi 16 çarpmayla değil, üssün ikili yazılışını izleyerek 5 çarpmayla hesaplarsın: her bitte kare al, bit 1 ise bir kez de tabanla çarp, her adımda mod al. İş üssün bit uzunluğuyla büyür; 2048 bitlik bir üs en çok yaklaşık 4000 çarpma ister. Bu hız asallığı sınamayı mümkün kılar. Fermat'nın küçük teoremi p asalsa a<sup>p−1</sup> ≡ 1 (mod p) der; öyleyse a<sup>n−1</sup> ≢ 1 çıkarsa n kesinlikle bileşiktir. Ama bileşik olduğu hâlde n ile aralarında asal her tabanda sınamayı geçen <strong>Carmichael sayıları</strong> vardır; en küçüğü 561 = 3·11·17'dir. <strong>Miller–Rabin</strong> sınaması (Miller 1976, Rabin 1980) bir adım daha atar: asal modülde x² ≡ 1'in çözümleri yalnız ±1'dir. n − 1 = 2<sup>s</sup>·d yaz, a<sup>d</sup>'den başla ve kare alarak ilerle; zincir −1'e uğramadan 1'e varırsa 1'in ±1 olmayan bir karekökünü bulmuşsundur ve n bileşiktir. Monier ve Rabin'in 1980 sınırı, 9'dan büyük tek bileşik n için güçlü yalancı sayısını en çok φ(n)/4 diye keser. 9 istisnadır: 2 güçlü yalancısı vardır, φ(9)/4 = 1.50 onları kapsamaz. k bağımsız tabanın hepsi birden yanılma olasılığı 4<sup>−k</sup>'den küçüktür.",
      formula: "n − 1 = 2<sup>s</sup>·d:  a<sup>d</sup> ≡ 1  ya da bir j < s için  a<sup>2<sup>j</sup>·d</sup> ≡ −1 (mod n)",
      formulaNote: "Bu koşulu sağlamayan a bir tanıktır. 561'de 560 = 2⁴·35 ve taban 2 için zincir 263, 166, 67, 1: −1'e uğramadan 1'e varıldı; 67² ≡ 1 ve gcd(66, 561) = 33 bir çarpan bile verir.",
    },
    {
      heading: "RSA neden çalışır, güvenliği neye yaslanır?",
      body:
        "Anahtar iki büyük asalla kurulur: n = pq açıklanır, φ(n) = (p − 1)(q − 1) gizli kalır. e, φ(n) ile aralarında asal seçilir ve d = e<sup>−1</sup> mod φ(n) genişletilmiş Öklid'le bulunur. Şifreleme c = m<sup>e</sup> mod n, çözme c<sup>d</sup> mod n'dir. m neden geri gelir? e·d = 1 + kφ(n) olduğundan m<sup>ed</sup> = m·(m<sup>φ(n)</sup>)<sup>k</sup> ≡ m; gcd(m, n) > 1 olan nadir m'ler için eşitlik Çin kalan teoremiyle mod p ve mod q'da ayrı ayrı doğrulanır. Güvenlik n'den φ(n)'ye geçişin zorluğundadır. φ(n)'yi bilen, p + q = n − φ(n) + 1 ve pq = n'den ikinci dereceden bir denklemle p ile q'yu hemen bulur; d'yi bilen de n'yi polinom zamanda çarpanlarına ayırabilir. En saf saldırı <strong>deneme bölmesidir</strong>: küçük asala kadar yaklaşık √n/2 bölme. Pollard'ın 1975'teki <strong>rho yöntemi</strong> x ↦ x² + c dizisini dolaştırır; dizi mod p'de doğum günü paradoksu yüzünden yaklaşık √p adımda kendini tekrarlar ve gcd çarpanı ele verir: n<sup>1/4</sup> mertebesi. İkisi de bit sayısında üsteldir. Bilinen en iyi klasik yöntem, sayı cismi kalburu, alt-üsteldir ama polinom değildir; çarpanlara ayırmanın polinom zamanda yapılamayacağı ise kanıtlanmış değildir.",
      formula: "e·d ≡ 1 (mod φ(n)) ⇒ (m<sup>e</sup>)<sup>d</sup> ≡ m (mod n);   deneme bölmesi ≈ √n/2,  rho ≈ √p ≈ n<sup>1/4</sup>",
      formulaNote: "n'ye 4 bit eklemek rho işini 2 kat, deneme bölmesini 4 kat artırır; sayfadaki tarama rho eğimini 1/4 kuramına karşı 0.252 ± 0.005 ölçer.",
    },
  ],
  lab: {
      intro:
      "Sayfa üç sekmedir; adresin sonuna #elek, #mod ya da #rsa yazarak doğrudan açabilirsin. <strong>Asal elek ve dağılım</strong> sekmesinde Eratosthenes eleği paneli Üst sınır N (10–400), Hız, Bir adım, Otomatik çalıştır, Baştan başlat ve kendi Sıfırla düğmesiyle ızgarayı yürütür; bileşikler en küçük asal çarpanlarının renginde çizilir. Aynı anda arka planda 10⁷'ye kadar parçalı bir eleme çalışır. Asal sayıların dağılımı panelinde Sınır x, 10³…10⁷ düğmeleri, Grafik menüsü ve ayrı bir Sıfırla vardır. <strong>Modüler aritmetik</strong> sekmesinde Euler tablosu, Fermat ve Miller–Rabin paneli (Sınanan sayı n, hazır sayılar, Rastgele taban sayısı k, Tohum), Öklid algoritması ve Hızlı üs alma panelleri vardır. <strong>RSA</strong> sekmesinde Asal p, Asal q, Anahtar tohumu, Rastgele asal, Ders kitabı örneği, Açık üs e, Mesaj m (sayı) ve Şifrele / Çöz ile anahtar kurulur. Saldırı panelinde Saldırı tohumu (rho ve tarama), Çarpanlara ayır, Durdur ve Taramayı yeniden başlat bulunur. Açılıştaki anahtar ders kitabı örneği değildir: Anahtar tohumu 1977 ve 20 bitle çekilen iki asaldır (p = 894 667, q = 878 641, e = 65537). Saldırı ve tarama yalnız RSA sekmesi açıkken ilerler.",
    experiments: [
      {
        title: "Neden p²'den başlanır, neden √N'de durulur?",
        predict:
          "N = 100 iken katları çizilecek asallar hangileri? Sıra 7'ye geldiğinde 7'nin hangi katları zaten çizilmiştir? Toplam kaç çizme beklersin; 2p'den başlansaydı kaç olurdu?",
        do:
          "Eratosthenes eleği panelinde Sıfırla'ya bas (Üst sınır N = 100). Bir adım'a üç kez bas; Şu anki asal p kartını, Çizme işlemi kartını ve durum satırını oku. Bir adım'a bir kez daha bas. Sonra Üst sınır N kutusuna 400 yaz ve Bir adım'a eleme bitene kadar bas.",
        observe:
          "Üç basıştan sonra p = 7 ve Çizme işlemi 96 / 104'tür. Durum satırı 14, 21, 28, 35, 42'nin zaten çizili olduğunu, 8 çizmenin 3'ünün yeni ve 5'inin eski olduğunu yazar; yeni olanlar 49, 77 ve 91'dir. Dördüncü basışta kart 'bitti' der: π(100) = 25, çizme 104 / 104 (2p'den 113), yeniden çizme 30 / 30, sıradaki işaretsiz sayı 11 ve 11² = 121 > 100. N = 400'de π(400) = 78, çizme 511 / 511 (2p'den 572), yeniden çizme 190 / 190; kullanılan asalların sonuncusu 19, sıradaki işaretsiz sayı 23'tür.",
        explain:
          "k < p ise k·p'nin p'den küçük bir asal çarpanı vardır; p²'den başlamak 100'de 9 boş çizmeyi önler (113 − 104). 11² = 121 > 100 olduğu için 11 hiçbir şey çizmez: 100'ü aşmayan her bileşiğin √100 = 10'u aşmayan bir asal çarpanı vardır. Yine de 104 çizmenin 30'u eski bir sayıya denk gelir. 30 = 2·3·5 gibi bir sayı, her küçük asal çarpanı için bir kez çizilir.",
      },
      {
        title: "Gauss'un yoğunluğu: x/ln x mi, Li(x) mi?",
        predict:
          "x = 10⁷'de x/ln x asal sayısını yüzde kaç eksik sayar? Li(x) yanılırsa hangi yönde ve kaç asal? Riemann hipotezinin izin verdiği en büyük fark ölçülenin kaç katıdır?",
        do:
          "Asal sayıların dağılımı panelinde Eleme (bu cihazda) kartı '664 579 asal' yazınca 10⁷ düğmesine bas. π(x), x/ln x ve Li(x) kartlarını, tabloyu ve durum satırını oku. Sonra 10⁶ düğmesine bas, İkiz asal çiftleri π₂(x) kartını oku ve Grafik menüsünden İkiz asallar ve Hardy–Littlewood görünümünü seç.",
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
          "Modüler aritmetik sekmesinde Fermat ve Miller–Rabin paneli Sınanan sayı n = 561, Rastgele taban sayısı k = 5 ve Tohum 1980 ile açılır. Fermat sınaması, taban 2 ile Miller–Rabin, taban 2 kartlarını, Yalancı tabanlar kartını ve taban haritasını oku. Sonra 2047 = 23·89 düğmesine bas. Zinciri adım adım görmek için Hızlı üs alma panelindeki 2⁵⁶⁰ mod 561 düğmesine bas.",
        observe:
          "Fermat kartı geçti der: 2⁵⁶⁰ ≡ 1, yani “muhtemelen asal”. Miller–Rabin kartı kaldı der: kesin bileşik. Zincir 263, 166, 67, 1, 1; 67² ≡ 1 ama 67 ≢ ±1 ve gcd(66, 561) = 33. Yalancı tabanlar kartı 'Fermat 320 · güçlü 10' yazar, sınır φ(n)/4 = 80'dir. Haritada 240 gri, 310 mor ve 10 kırmızı hücre vardır. 2047'de taban 2 Miller–Rabin'i de kandırır (güçlü 242, sınır 484), ama k = 5 tabanın 2'si tanıktır.",
        explain:
          "561 bir Carmichael sayısıdır: 560; 3 − 1, 11 − 1 ve 17 − 1'e bölünür, bu yüzden 561 ile aralarında asal her a için a⁵⁶⁰ ≡ 1. Fermat onu ancak ortak bölenli bir tabana denk gelirse yakalar. Miller–Rabin asal modülde 1'in karekökünün yalnız ±1 olduğunu kullanır; 67 bunu çiğner ve bir çarpan da verir. 2047, 2 tabanında güçlü sahte asaldır; tabanların rastgele seçilmesinin nedeni budur.",
      },
      {
        title: "40 bitlik anahtarı kır, eğimi ölç",
        predict:
          "Açılıştaki n = 786 091 107 547 (40 bit) için deneme bölmesi kaç bölme yapar? Rho, √p ≈ 937 kuramına göre kaç yineleme alır? n'ye 4 bit eklemek rho işini kaç kat artırmalı; taramadaki eğim kaç çıkmalı?",
        do:
          "RSA sekmesini aç. Saldırı tohumu (rho ve tarama) 1 iken saldırı ile tarama kendiliğinden ilerler; bitmelerini bekle. Deneme bölmesi ve Pollard rho satırlarını, Bulunan çarpanlar kartını, iki tarama kartını ve 2048 bitlik n için uzatma kartını oku. Sonra Saldırı tohumu kutusuna 2 yazıp kutudan çık.",
        observe:
          "Tohum 1 dururken deneme bölmesi 439 321 bölme yapar; (p + 1)/2'ye oranı 1.000'dır. Pollard rho 853 yinelemede biter, yineleme/√p = 0.910'dur ve deneme bölmesi rho'nun 515 katı iş yapar. Bulunan çarpanlar 878 641 · 894 667, yeniden hesaplanan d = 506 291 572 673'tür. Rho eğimi 0.252 ± 0.005 (kuram 1/4, fark +0.4 SE), deneme bölmesi eğimi 0.500, yineleme/√p ortalaması 0.670 ± 0.033'tür. Uzatma kartı rho ≈ 9.0×10¹⁵³ yineleme ve saniyede 10⁹ işlemle 2.8×10¹³⁷ yıl yazar. Tohum 2'ye geçince aynı n 573 yinelemede ayrılır; tarama da baştan başlar.",
        explain:
          "Deneme bölmesi küçük asala kadar 2'yi, sonra her tek sayıyı dener: tam sayı (p + 1)/2, dengeli anahtarda yaklaşık √n/2'dir ve bit başına eğim 1/2'dir. Rho'da dizi mod p'de yaklaşık √p adımda döngüye girer; √p ≈ n^(1/4) olduğundan eğim 1/4'tür ve 0.252 bununla uyumludur. Tek anahtarda oran çok dağılır; kart, %90'ının 0.2 ile 1.5 √p arasında kaldığını yazar, ortalamayı tarama verir. Uzatma, 2048 bitlik bir ölçüm değil: ölçülen 0.67 sabitiyle √p = 2⁵¹² kuramının uzatmasıdır.",
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
        "Fermat 1640'ta 2<sup>2<sup>k</sup></sup> + 1 biçimindeki bütün sayıların asal olduğunu sandı; Euler 1732'de F₅ = 4 294 967 297 = 641·6 700 417 ile yanıldığını gösterdi. 78 basamaklı F₈ = 2²⁵⁶ + 1'in 16 basamaklı asal çarpanını, 1 238 926 361 552 897'yi, 1980'de Richard Brent ve John Pollard rho yönteminin Brent'in hızlandırdığı biçimiyle buldu; geriye 62 basamaklı bir asal kaldı. Rho'nun işi n'nin boyuna değil küçük çarpana bağlıdır: √p ≈ 3.5×10⁷ mertebesi, 1980'in bilgisayarı için bile erişilebilir bir sayıdır.",
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
      "Sayfada dene: RSA sekmesinde Ders kitabı örneği'ne bas. Adımlar n = 3233, φ = 3120, d = 2753, c = 2790 (4 kare + 1 çarpma) ve çözülen 65'i (11 kare + 4 çarpma) yazar. d kartının alt satırı λ ile d' = 413'tür; Vikipedi bu üssü kullanır ve 2753 ≡ 413 (mod 780) olduğundan ikisi de 65'i verir. 17 ve 3120 (RSA'da d) düğmesi aynı bölmeleri ve s = −367'yi gösterir. e = 65537 seçersen de d = 2753 ve c = 2790 çıkar, çünkü 65537 = 21·3120 + 17; şifreleme 17 çarpmaya çıkar.",
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
        "561 = 3·11·17, kendisiyle aralarında asal 320 tabanın hepsinde aⁿ⁻¹ ≡ 1 verir; Fermat onu yalnız ortak bölenli bir tabana denk gelirse yakalar ve böyle Carmichael sayıları sonsuz çoktur. Miller–Rabin aynı hesaba karekök denetimini ekler; 561'de taban 2 bile yeter. 9'dan büyük tek bileşik bir sayıda güçlü yalancılar en çok φ(n)/4 tanedir, bu da tabanların dörtte birinden azdır. 20 bağımsız tabanın hep birlikte yanılma olasılığı 4⁻²⁰'nin altındadır, yani yaklaşık 10⁻¹²'den küçüktür.",
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
    { term: "Euler fonksiyonu φ(n)", definition: "1 ≤ k ≤ n ve gcd(k, n) = 1 koşulunu sağlayan k'ların sayısı; asal p için p − 1, n = pq için (p − 1)(q − 1)." },
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
        "400'ü aşmayan her bileşiğin √400 = 20'yi aşmayan bir asal çarpanı vardır; 20'nin altındaki en büyük asal 19'dur. 23'ün ilk çizilecek katı 23² = 529 olurdu, bu da 400'ü aşar. Sayfada N = 400 bitince kullanılan asallar 2'den 19'a kadardır; sıradaki işaretsiz sayı 23'tür.",
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
    { href: "siber-guvenlik.html", title: "Siber Güvenlik Laboratuvarı: Şifre, Özet ve Anahtar", why: "Aynı matematik orada oyuncak boyutta çalışır: küçük asallarla Diffie–Hellman ve RSA, kare-al-çarp adım sayısı, dinleyicinin ayrık logaritma aramasının kaç deneme sürdüğü; yanında gerçek SHA-256 ile çığ etkisi ve HMAC." },
    { href: "grup-teorisi.html", title: "Grup Teorisi: Simetrinin Cebiri", why: "Euler teoreminin öbür kanıtı: mod n'de tersi olan kalanlar bir gruptur ve Lagrange teoremi her mertebenin φ(n)'yi böldüğünü söyler; sayfadaki n = 5 tablosu oradaki Z₅ˣ'tir." },
    { href: "algoritmalar.html", title: "Algoritmalar: Adımları Say", why: "Adım saymanın dili orada: doğrusal ve ikili arama aynı sıralı dizide yarışır, gerçek algoritmaların işlem sayıları log–log eksende çizilip eğimleri ölçülür." },
    { href: "kuantum-hesaplama.html", title: "Kuantum Hesaplama: Kübit, Dolanıklık, Deutsch–Jozsa ve Grover", why: "RSA'nın kuantum tehdidi nedir, ne değildir: kübitler, girişim ve Grover'ın karesel hızlanması; Shor'un neden büyük, hatasız makine gerektirdiği." },
  ],
  sources: [
    { title: "Vikipedi · Asal sayı", url: "https://tr.wikipedia.org/wiki/Asal_say%C4%B1", note: "Tanım, aritmetiğin temel teoremi, Öklid'in kanıtı ve Eratosthenes eleği (Türkçe)." },
    { title: "Wikipedia · Prime number theorem", url: "https://en.wikipedia.org/wiki/Prime_number_theorem", note: "x/ln x ve Li(x) yaklaşımları, Gauss ile Legendre'nin tahminleri, 1896 kanıtları ve Riemann hipotezinin hata payına etkisi (İngilizce)." },
    { title: "Wikipedia · Miller–Rabin primality test", url: "https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test", note: "Güçlü yalancılar, dörtte bir sınırı, Carmichael sayıları ve belirli taban kümeleriyle kesin sınama (İngilizce)." },
    { title: "Wikipedia · RSA (cryptosystem)", url: "https://en.wikipedia.org/wiki/RSA_(cryptosystem)", note: "OAEP, PSS ve bilinen saldırılar. Örnek p = 61, q = 53, e = 17, m = 65, c = 2790 kullanır; gizli üssü λ(n) üzerinden d = 413'tür. Sayfa φ(n) üzerinden d = 2753 alır, ikisi de çözer (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
