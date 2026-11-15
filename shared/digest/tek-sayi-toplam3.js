window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["tek-sayi-toplam3"] = {
  slug: "tek-sayi-toplam3",
  title: "Tek Sayılardan Kareye: Say, Eşle, Kanıtla",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 25,
  tagline: "Bir kareye eklenen L katmanı neden tek sayıda hücre taşır? Hücreleri dikdörtgene eşle, ardından büyük bir bütçenin tamamlayabildiği kareyi kesin olarak bul.",
  hook: "73 kare karon var. 8 × 8'lik döşemeyi bitirince 9 karo artıyor; ama 9 × 9'a ulaşmak için 17 yeni karo satın alman gerekmiyor, yalnız 8 karo eksik. Bir sonraki katmanın büyüklüğü ile gereken ek miktar arasındaki farkı resimde görebilir misin?",
  bigIdea: "İlk n pozitif tek sayı, bir kareyi oluşturan ayrık L katmanlarının hücre sayılarıdır; bu sayım hem Σ(2k − 1) = n² eşitliğini hem de bir bütçenin hangi iki ardışık kare arasında kaldığını açıklar.",
  story: [
    "Bir sayı örüntüsü bulmakla onu kanıtlamak arasındaki mesafe bazen tek bir köşe hücresidir. 5 × 5'lik kareyi 6 × 6 yapmak için yeni alt satıra 6, sağ sütunun kalan kısmına 5 hücre koyarsın. Sonuç 11'dir; 12 saydıysan ortak köşeyi iki kez saymışsındır. Çizimin asıl gücü birkaç toplamı güzelleştirmesi değil, her büyüklükte aynı sayma kuralını göstermesidir.",
    "I. K. Lundqvist'in MIT OpenCourseWare'de yayımlanan, ilk slaydında 5 Mayıs 2004 tarihi bulunan <em>Proofs</em> dersinde tek sayı toplamı bir tümevarım örneğidir; başlangıç n = 0 alınır. Keith Schwarz'ın Stanford için hazırladığı 2013 güz dönemi <em>Mathematical Foundations of Computing</em> notları da aynı toplamı cebir ve hücre çizimleriyle inceler. Bu örnek bilgisayar biliminin temel derslerine boşuna girmemiştir: bir döngünün her adımında neyin doğru kaldığını anlamak, bütün sonuçları tek tek denemekten farklı bir iştir.",
  ],
  core: [
    {
      heading: "Köşeyi bir kez say",
      body: "k. katmanın alt satırında k hücre vardır. Sağ sütunda, o satırın köşesi çıkarılınca k − 1 hücre kalır. Böylece katman 2k − 1 hücre taşır. Katmanlar birbirine karışmadan n × n kareyi kapladığı için toplam n²'dir. Burada n bir kenardaki hücre sayısıdır; boyutsuzdur. Hücre kenarı a uzunluk birimi olursa aynı sayım n²a² alan verir.",
      formula: "k + (k − 1) = 2k − 1<br>Σ<sub>k=1…n</sub> (2k − 1) = n²",
      formulaNote: "k ≥ 1; n = 0 için hiç katman yoktur ve boş toplam 0'dır.",
    },
    {
      heading: "Örneklerden bütün doğal sayılara",
      body: "<strong>Matematiksel tümevarım</strong> iki iş ister: bir başlangıcı doğrulamak ve doğru olan herhangi bir durumdan sonrakine geçmek. Boş kare 0² = 0 ile başlatır. İlk k katman k² hücreyse yeni katmanın 2k + 1 hücresi toplamı (k + 1)² yapar. Bu genel adım bütün doğal sayıları kapsar. Ekrandaki 16 dolu kare örneği tek başına bu sonsuz iddiayı kanıtlamaz; genel hücre sayımı kanıtın neden çalıştığını açıklar.",
      formula: "S₀ = 0<br>S<sub>k+1</sub> = S<sub>k</sub> + 2k + 1 = k² + 2k + 1 = (k + 1)²",
      formulaNote: "k. katmanın büyüklüğü 2k − 1; k'dan k + 1'e geçerken eklenen büyüklük 2k + 1'dir.",
    },
    {
      heading: "Halkayı taşı, sayıyı koru",
      body: "n × n karenin sol üstünden m × m kareyi çıkar. Kalan şekil ortalanmış bir çerçeve değildir. Alt şerit A, n(n − m) hücre taşır. Üst sağ şerit B, m(n − m) hücre taşır; döndürülüp A'nın sağına gelince n + m sütunlu, n − m satırlı dikdörtgen oluşur. Her kaynak hücre bir hedefe gider ve her hedef bir kez kullanılır: bu bir <strong>birebir eşleme</strong>dir. Aynı zamanda m + 1'den n'ye kadar L katmanlarını toplamış olursun.",
      formula: "Σ<sub>k=m+1…n</sub> (2k − 1) = n² − m² = (n − m)(n + m)",
      formulaNote: "0 ≤ m ≤ n tam sayıları için geçerlidir. n = m'de iki hücre kümesi de boştur.",
    },
    {
      heading: "Bir bütçe, iki kare sınırı",
      body: "L hücre bütçesiyle tamamlanabilen en büyük karenin kenarındaki hücre sayısı <strong>tam sayı karekökü</strong>dür: √L'nin aşağı yuvarlanmış değeri. Sonuç yalnız n² ≤ L koşulunu sağlamamalı; bir sonraki kare bütçeyi aşmalıdır. Kalan r = L − n² hücre sonraki katmanın bir bölümünü doldurur. Katmanın tamamı 2n + 1 hücre, satın alınması gereken ek miktar ise 2n + 1 − r'dir.",
      formula: "n = ⌊√L⌋, n² ≤ L < (n + 1)²<br>r = L − n², 0 ≤ r < 2n + 1",
      formulaNote: "L ≥ 0 bir tam sayıdır. Tam kare bütçede r = 0 olur; bir sonraki katman yine yeni hücre ister.",
    },
    {
      heading: "Kesin hesap için bir aralık değişmezi",
      body: "Sayfanın büyük sayı hesabı yaklaşık karekök almaz. Alt ve üst tam sayı sınırları için alt² ≤ L < üst² koşulunu korur. Aralıktaki orta tam sayının karesi L'yi aşarsa üst sınır, aşmazsa alt sınır değiştirilir. <strong>Döngü değişmezi</strong> denen bu koşul her adımda doğru kalır. Üst − alt = 1 olunca alt, aranan tam sayı kareköktür. BigInt çarpma ve karşılaştırmaları tam sayılarla yapar; çizim sınırı hesap sınırından ayrıdır.",
      formula: "alt² ≤ L < üst² ve üst − alt = 1<br>⇒ alt = ⌊√L⌋",
      formulaNote: "Girdi en çok 120 rakamdır. Bütçe çizimi n ≤ 16'da yapılır; daha büyük n için sonuç ve eşitsizlikler yine kesindir.",
    },
  ],
  lab: {
    intro: "Üç sekme bağımsızdır; her birinin <strong>Sıfırla</strong> düğmesi yalnız o sekmeyi başlangıcına döndürür. Hücre resimlerinin sayısal eşdeğeri tablolardadır. Kaydırıcılarda ok tuşlarını kullanabilirsin. Bütçe kutusuna yazdıktan sonra <strong>Hesapla</strong>'ya bas veya Enter kullan; yalnız yazmak sonucu değiştirmez.",
    experiments: [
      {
        title: "Bir sonraki kare kaç hücre ister?",
        predict: "5 × 5 kareyi 6 × 6 yaparken 10, 11 veya 12 hücreden hangisini eklersin? İki kolun köşesini nerede saydığını düşün.",
        do: "Kareyi kur sekmesinde Sıfırla'ya bas: Katman sayısı n = 5 olur. Katmanların sayısal tablosunu aç. Sonraki katman'a bir kez bas; ardından n kaydırıcısını 0'a indir.",
        observe: "n = 5'te sayım 25, son katman 9'dur; tablo 1, 3, 5, 7, 9 hücreyi toplar. n = 6'da sayım 36 ve son katman 11 olur. Sayım − formül iki durumda da 0'dır. n = 0'da sayım 0; son katman alanında sayı yerine katman olmadığı yazılıdır.",
        explain: "6 + 5 = 11 yeni hücre gelir. n = 0, son terimi −1 olan bir toplam değildir; hiç terimi olmayan toplamdır. Genel geçiş hesabı, gözlemi tümevarım kanıtına dönüştürür.",
      },
      {
        title: "40 hücre gerçekten aynı 40 hücre mi?",
        predict: "n = 7, m = 3 halkası dikdörtgene dönüşünce kaç hücre taşımalı? Yalnız toplamların eşitliği, her hücrenin doğru eşlendiğini gösterir mi?",
        do: "Halkadan dikdörtgene sekmesinde Sıfırla'ya bas. Birebir eşleme tablosunu aç. İzlenen hücre kimliği'ni önce 12, sonra 13 yap. Son olarak n = m = 6 düğmesine bas.",
        observe: "Başlangıçta 49 − 9 = 40; dikdörtgen 10 sütun ve 4 satırdır. A / B sayıları 28 / 12; eşlenmeyen / çift kullanılan hedef 0 / 0'dır. Kimlik 12, B parçasında (6; 2)'den (7; 3)'e; kimlik 13, A'da (0; 3)'ten (0; 0)'a gider. n = m = 6 seçilince hücre sayısı 0 olur ve kimlik seçimi kapanır.",
        explain: "Kaynak koordinatları (sütun; satır) biçiminde ve 0'dan başlar. A ötelenir, B döner; iki hedef bölge ayrıdır. 7 + 9 + 11 + 13 = 40 sayımı ile hücre kimliklerinin eşlemesi birbirini tamamlar. Genel dönüşümün tersi, bunun yalnız bu örneğe özgü olmadığını gösterir.",
      },
      {
        title: "Kalan, katman maliyeti, eksik",
        predict: "73 hücre için kalan 9 ise sonraki kareye kaç hücre eksiktir? Bütçeyi 80'den 81'e çıkarınca hangi okuma sıçrar?",
        do: "Bütçeden kareye sekmesinde Sıfırla'ya bas. Altındaki bütçe sınırları tablosunu oku. Sırayla 80 hücre ve 81 hücre düğmelerine bas; sonra Toplam hücre bütçesi L kutusuna 0 yazıp Hesapla'ya bas.",
        observe: "73'te n = 8, kare 64, kalan 9, sonraki katmanın maliyeti 17 ve eksik 8'dir. 80'de n yine 8, kalan 16, eksik 1 olur. 81'de n = 9, kalan 0, sonraki katmanın maliyeti ve eksik miktar 19'dur. 0 bütçede n = 0, kalan 0 ve ilk kareye eksik 1'dir.",
        explain: "81 sınırına gelince 17 hücrelik katman tamamlanır. Artık sıradaki hedef 100'dür; 100 − 81 = 19. Bütçenin artması kalan sayacını her zaman artırmaz: yeni kare bitince kalan sıfıra dönebilir.",
      },
      {
        title: "Resim bittiğinde hesap da biter mi?",
        predict: "Çizilemeyecek kadar büyük bir karede doğru sonucu nasıl sınarsın? Ondalık karekökün ekranda düzgün görünmesi yeterli mi?",
        do: "Bütçeden kareye sekmesinde Sıfırla'ya bas. L kutusuna 288 yazıp Hesapla; ardından 289 ile tekrarla. Son olarak 10³⁰ hücre düğmesine bas. Bu düğme tam sayıyı yazar; kutu 10^30 gibi üs gösterimini kabul etmez.",
        observe: "288'de n = 16, kare 256, kalan 32 ve eksik 1'dir; hücreler çizilir. 289'da n = 17, kalan 0 ve eksik 35 olur; hücre çizimi kapanır. 10³⁰'da n = 10¹⁵, kalan 0 ve sonraki katmanın maliyeti 2.000.000.000.000.001 hücredir. Tablo bu değerleri üs kısaltması olmadan tam rakamlarıyla gösterir.",
        explain: "Çizim sınırı matematiksel bir sınır değildir. Her sonuç için n² ≤ L < (n + 1)² eşitsizliklerini tam sayılarla kontrol edebilirsin. Büyük bütçede milyonlarca hücreyi temsil ediyormuş gibi görünen küçük bir resim üretmek yerine hesap açıkça resimden ayrılır.",
      },
    ],
  },
  wow: [
    {
      title: "Her tek sayı iki karenin farkıdır",
      body: "Pozitif tek sayı 2k − 1, tam olarak k² − (k − 1)²'dir. Örneğin 101 = 51² − 50² = 2.601 − 2.500. Aynı açılım başka bir sınırı da gösterir: tam sayı kareleri 4'e bölündüğünde yalnız 0 veya 1 kalanını verir; bu yüzden 4'e göre 2 kalanını veren 6, 10, 14 gibi sayılar iki tam sayı karesinin farkı olamaz.",
    },
    {
      title: "Ortadan başlayan on tek sayı",
      body: "Toplam 1'den başlamıyorsa mutlaka kare çıkmaz. 101 + 103 + … + 119 toplamında 10 terim vardır; bunlar 51. katmandan 60. katmana uzanır. Sonuç 60² − 50² = 1.100'dür: 10 × 110'luk bir dikdörtgen. Bu örnek sayfanın halka kaydırıcı sınırını aşar, fakat aynı genel hücre sayımıyla hesaplanır.",
    },
    {
      title: "120 rakamlık bütçede tek hücrelik eksik",
      body: "Bütçeye 120 tane 9 yazarsan L = 10¹²⁰ − 1 olur. Tamamlanan karenin kenarında n = 10⁶⁰ − 1 hücre bulunur. Kalan 2 × 10⁶⁰ − 2 hücre olmasına rağmen bir sonraki kareye yalnız 1 hücre eksiktir. Çünkü o sonraki karenin alanı tam 10¹²⁰'dir. Çok büyük kalan ile çok küçük eksik aynı anda mümkündür.",
    },
  ],
  worked: {
    title: "Bir hücre eşlemesinin tersini kur",
    prompt: "n = 7 ve m = 3 için halka ile 10 × 4 dikdörtgen arasında hücre kaybolmadığını göster. Dikdörtgendeki (7; 3) hücresinin kaynağını bul. Ayrıca her hücrenin kenarı a = 2 cm seçilse toplam alan kaç cm² olur? Sayfadaki koordinatlar hücre indisidir; 2 cm seçimi bu kâğıt üzerindeki örneğin ölçeğidir.",
    steps: [
      "Kaynağı ayır: A'da 0 ≤ x < 7 ve 3 ≤ y < 7; B'de 3 ≤ x < 7 ve 0 ≤ y < 3. Sayıları 7 × 4 = 28 ve 4 × 3 = 12'dir; toplam 40 hücre.",
      "A dönüşümü (x; y) → (x; y − 3) olsun. Hedefteki ilk 7 sütunun bütün 4 satırını doldurur. Tersi (u; v) → (u; v + 3) olduğundan aynı hedefe iki A hücresi gidemez.",
      "B dönüşümü (x; y) → (9 − y; x − 3) olsun. Son 3 sütunu doldurur: 7 ≤ u < 10, 0 ≤ v < 4. Tersi (u; v) → (v + 3; 9 − u)'dur. (7; 3)'ün kaynağı (6; 2) çıkar; sayfada kimlik 12 bunu gösterir.",
      "İki hedef bölge ayrıdır ve birlikte 10 × 4 dikdörtgenin tamamıdır. Her bölgede ters dönüşüm bulunduğundan eşleme hem birebirdir hem örtendir. Böylece 49 − 9 = 40 = 10 × 4 yalnız eşit alanlar değil, aynı hücrelerin iki düzenidir.",
      "Hücre sayısını fiziksel alana çevir: bir hücre a² = 4 cm²; toplam alan 40 × 4 = 160 cm². Dikdörtgenin kenarları 10a = 20 cm ve 4a = 8 cm; çarpımları yine 160 cm²'dir. Ekran a = 1 birim ölçeğini kullanır ve 40 hücre gösterir.",
    ],
    result: "(7; 3) hedefi B parçasındaki (6; 2) kaynağına aittir. Ters dönüşümler 40 hücrenin eksiksiz, tek kullanımlı eşlemesini kanıtlar; 2 cm hücre kenarında alan 160 cm² olur.",
  },
  misconceptions: [
    { myth: "16 kareyi denediysem eşitliği bütün doğal sayılar için kanıtladım.", truth: "Sonlu sayıda doğru örnek genel iddiayı tek başına kanıtlamaz. Her k için geçerli hücre ayrımı veya başlangıçla birlikte tümevarım adımı gerekir. Sayım − formül = 0, seçtiğin örneğin kontrolüdür." },
    { myth: "n = 0'da son tek sayı 2n − 1 = −1 olur.", truth: "k. katmanın 2k − 1 formülü k ≥ 1 içindir. n = 0 toplamında hiç k seçilmez. Toplam 0'dır; son katman yoktur." },
    { myth: "Kare halkasında ortadaki kare çıkarılır; dış ve iç kenarın farkı halka kalınlığıdır.", truth: "Bu sayfada küçük kare sol üst köşeden çıkarılır. n − m, oluşan dikdörtgenin satır sayısıdır. Ortalanmış bir çerçevenin her yandaki kalınlığıyla aynı büyüklük değildir." },
    { myth: "Sonraki katman 17 hücreyse mutlaka 17 yeni hücre gerekir.", truth: "Elindeki kalanı kullanırsın. 73 bütçede tamamlanan kare 64, kalan 9'dur; 17 hücrelik katmanı bitirmek için 17 − 9 = 8 ek hücre gerekir. Toplam maliyet ile eksik miktar farklıdır." },
  ],
  glossary: [
    { term: "L katmanı", definition: "Bir kareyi, kenarında bir hücre daha bulunan kareye tamamlayan satır ve sütun hücreleri; ortak köşe bir kez sayılır." },
    { term: "Boş toplam", definition: "Hiç terim seçmeyen toplam; değeri 0'dır. Burada sıfır katmanın toplamıdır." },
    { term: "Tümevarım", definition: "Bir başlangıç durumunu ve herhangi bir durumdan sonrakine geçişi kanıtlayarak doğal sayılar boyunca ilerleyen ispat yöntemi." },
    { term: "Birebir eşleme", definition: "Her kaynak elemanı bir hedefe bağlayan, her hedefi de tam bir kez kullanan eşleme; bijeksiyon." },
    { term: "Tam sayı karekökü", definition: "L ≥ 0 için karesi L'yi aşmayan en büyük tam sayı; ⌊√L⌋." },
    { term: "Döngü değişmezi", definition: "Bir algoritmanın her adımında korunan koşul; burada alt² ≤ L < üst²." },
    { term: "BigInt", definition: "JavaScript'te büyük tam sayılarla kesin tamsayı işlemleri yapmayı sağlayan sayı türü; bellek ve süre gereksinimini ortadan kaldırmaz." },
    { term: "Boyutsuz sayım", definition: "Hücre adedi gibi uzunluk veya alan birimi taşımayan sayı; alan için ayrıca bir hücrenin alanıyla çarpılır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "<strong>Ayrık Matematik</strong>'te iki sonlu kümenin aynı büyüklükte olduğunu göstermek için onları tek tek saymak zorunda değilsin; aralarında bijeksiyon kurabilirsin. Buradaki parçalara ayrılmış koordinat dönüşümü bunun somut bir örneğidir. Tersini yazmak hem iki kaynağın aynı hedefte birleşmesini hem de boşta hedef kalmasını dışlar. n = m sınırında eşleme boş kümeler arasında kalır; 0 = 0 sonucu genel bağıntının doğal parçasıdır.",
      "<strong>Algoritmalara Giriş</strong>'te bütçe sorusu bir doğruluk kanıtına dönüşür. Başlangıç aralığı karekökü içerir, aralık daraltılırken eşitsizlik korunur ve tam sayı aralığı sonunda uzunluk 1'e iner. Bu üç adım başlangıç, korunma ve sonlanmadır. İkiye bölme adım sayısı L'nin rakam sayısıyla aynı mertebede büyür; fakat büyük tam sayı çarpmasının maliyeti sabit değildir. Ayrıca hücreleri gerçekten çizmek n² nesne ister. Sonucu kısa bir tamsayıyla hesaplayabilmek, o sayıda nesneyi ekrana veya belleğe sığdırabilmek anlamına gelmez.",
    ],
    topics: ["Matematiksel tümevarım", "Sonlu kümeler ve bijeksiyon", "İkili arama", "Döngü değişmezleri", "Bit karmaşıklığı", "Boyut analizi"],
  },
  quiz: [
    { question: "8 × 8'lik kareden 9 × 9'luk kareye geçerken kaç hücre eklenir?", options: ["8 hücre", "16 hücre", "17 hücre", "18 hücre"], answer: 2, explanation: "Yeni alt satır 9, sağ sütunun kalan kısmı 8 hücredir: 9 + 8 = 17. 9² − 8² = 81 − 64 de aynı sonucu verir. 18 saymak ortak köşeyi iki kez sayar." },
    { question: "L = 80 bütçede n = 8 bulunuyor. Bir sonraki kareye kaç hücre eksiktir?", options: ["1 hücre", "16 hücre", "17 hücre", "19 hücre"], answer: 0, explanation: "8² = 64 ve kalan 16'dır. Yeni katman 17 hücre istediği için eksik 1'dir; doğrudan 9² − 80 = 1. 16 kalan, 17 katmanın toplam maliyetidir." },
    { question: "n = 7, m = 3 halkasında hücre kenarı 1 cm'den 2 cm'ye çıkarılırsa hangisi doğrudur?", options: ["Hücre sayısı 80, alan 80 cm² olur", "Hücre sayısı 40, alan 80 cm² olur", "Hücre sayısı 160, alan 160 cm² olur", "Hücre sayısı 40, alan 160 cm² olur"], answer: 3, explanation: "Eşleme yine 7² − 3² = 40 hücreyi taşır. Her hücrenin alanı uzunluğun karesiyle büyür: (2 cm)² = 4 cm². Toplam 40 × 4 = 160 cm²; sayım değişmez." },
  ],
  next: [
    { href: "tek-sayi-toplam4.html", title: "Farklar ve Toplamlar", why: "Karelerin ardışık farkını açık indislerle hesapla; aritmetik toplamı ve orta nokta integral toplamını karşılaştır." },
    { href: "tek-sayi-toplam5.html", title: "Tek Sayılar: Toplamdan Seriye", why: "Tek sayılara geometrik ağırlık ver; sonlu toplamın kalanını ve normalize edilmiş olasılıkları incele." },
    { href: "fibo+pascal.html", title: "Fibonacci ve Pascal: İki Sayma Yolu", why: "Aynı döşemeleri iki farklı biçimde saymanın Fibonacci toplamını nasıl verdiğini araştır." },
  ],
  sources: [
    { title: "MIT OCW · I. K. Lundqvist · Proofs", url: "https://ocw.mit.edu/courses/16-01-unified-engineering-i-ii-iii-iv-fall-2005-spring-2006/0599163e36acf0715fa1323a0e78fe3b_20_proofs.pdf", note: "İlk slayt 5 Mayıs 2004 tarihli; PDF sayfa 10'daki 19–20. slaytlarda n = 0 tabanı ve tek sayı toplamının tümevarımı. Barındırıldığı ders 2005–2006 dönemine aittir." },
    { title: "Stanford CS103 · Keith Schwarz · Mathematical Foundations of Computing", url: "https://theory.stanford.edu/~trevisan/cs103-14/keith.pdf", note: "2013 güz dönemi notları; basılı sayfa 86–90'da tek sayı toplamı, geometrik düzenlemeler ve L katmanı. Bijeksiyonlar Bölüm 6'da geliştirilir." },
    { title: "Python 3.14 belgeleri · math.isqrt", url: "https://docs.python.org/3.14/library/math.html#math.isqrt", note: "Tam sayı karekökünü karesi bütçeyi aşmayan en büyük tam sayı olarak tanımlar. Sayfanın hesabı Python kullanmaz; JavaScript BigInt ve aralık daraltma ile bağımsız uygulanmıştır." },
  ],
  revision: "Kasım 2026",
};
