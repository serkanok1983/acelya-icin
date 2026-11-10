window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["hilbert-egrisi"] = {
  slug: "hilbert-egrisi",
  title: "Hilbert Eğrisi: Bir Çizgi Kareyi Doldurabilir mi?",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline: "Dört hücreden binlercesine: aynı yolu küçültüp döndür. Uzunluğun büyümesini ölç, alan dolduran limiti sonlu çizimden ayır ve komşuluğun neden tek yönde korunduğunu sınayarak gör.",
  hook: "Kalemin ucunun hiç kalınlığı olmasa bir kareyi boyayabilir misin? Sonlu sayıda düz çizgiyle hayır. Ama bir aralıktan kareye giden sürekli bir fonksiyon, karenin her noktasına ulaşabilir: sezginin takıldığı yer çizginin kalınlığı değil, limitin kendisidir.",
  bigIdea: "Hilbert yapısı, <strong>sonlu bir hücre sıralaması</strong> ile <strong>alanı dolduran sürekli limit</strong> arasındaki bağı kurar; bu ikisini ayırmak hem matematiği hem bilgisayardaki uygulamaları anlamanın anahtarıdır.",
  story: [
    "Giuseppe Peano 1890'da ilk alan dolduran eğriyi kurdu; David Hilbert 1891'de bugün kendi adıyla anılan yapıyı sundu. Geometrik fikir şöyle işler: kareyi dört küçük kareye ayır ve merkezlerini U biçiminde dolaş. Her küçük karenin içine aynı fikrin küçültülmüş bir kopyasını yerleştir. Kopyaların yönlerini, birinin çıkışı ötekinin girişine komşu olacak biçimde çevir. Aynı parçayı tekrar etmek yeterli değildir; parçaların nasıl birleştiği de belirleyicidir.",
    "Bilgisayar yalnız sonlu bir mertebe çizer. Her hücreye bir kez uğrayan bu yolun arasında hâlâ ulaşılmamış noktalar vardır. Matematiksel soru daha keskindir: bütün bu yaklaşımlar, her parametre değerine belirli bir konum atayan sürekli bir limit oluşturur mu ve bu limit karedeki her noktaya ulaşır mı? Hilbert yapısında yanıt evettir. Sonlu resim bu teoreme sezgi verir; onun yerine geçmez.",
    "Aynı yapının sonlu hali veri sıralamada da işe yarayabilir: iki boyutlu hücrelere tek bir sıra numarası verilir. Fakat güzel bir geometri, otomatik hız garantisi değildir. Reissmann, Meyer ve Jahre'nin matris çarpımı araştırmasında Hilbert sırasını hesaplamanın maliyeti, incelenen sistemde yerellik kazancını aştı. Bu laboratuvarda da önce neyi ölçtüğünü sor: ardışık adım mı, komşu hücrelerin sıra farkı mı, yoksa gerçekten çalışma süresi mi?"
  ],
  core: [
    {
      heading: "Dört kopya, tek bağlantılı yol",
      body: "n mertebesinde karenin her kenarı 2ⁿ parçaya ayrılır; toplam 4ⁿ hücre vardır. Hilbert sırası her hücre merkezine bir kez uğrar ve art arda gelen merkezler ortak kenarlı hücrelerdedir. Bu nedenle her adımın uzunluğu hücre kenarı ε'dir. Hücre sayısıyla bağlantı sayısını karıştırma: N merkezden geçen açık bir yolun N − 1 bağlantısı olur. Son merkez ilkine bağlanmaz.",
      formula: "N = 4ⁿ; ε = L/2ⁿ; ℓₙ = (4ⁿ − 1)ε = L(2ⁿ − 2⁻ⁿ)",
      formulaNote: "n ve N sayım nicelikleri, boyutsuzdur. L ve ε cm verilirse yol uzunluğu ℓₙ de cm çıkar; sıra numarası j, 0'dan N − 1'e gider."
    },
    {
      heading: "Kare sabit, yol gittikçe uzun",
      body: "Mertebe bir arttığında hücre sayısı dört katına çıkar, adım uzunluğu yarıya iner. Toplam yol bu yüzden yaklaşık iki katına çıkar; sonlu n'de tam iki kat değildir. Dört yarım ölçekli kopyanın yollarına aralarındaki üç bağlantıyı da eklemek gerekir. L sabitken ℓₙ sınırsız büyür. Buna karşılık herhangi bir noktadan kendi hücresinin merkezine olan uzaklık, yarım hücre köşegenini aşmaz; yol o merkezden geçtiği için noktadan yola uzaklık da bu sınırı aşmaz.",
      formula: "ℓₙ₊₁ = 2ℓₙ + 3L/2ⁿ⁺¹; rₙ = √2 L/2ⁿ⁺¹ → 0",
      formulaNote: "rₙ bir uzaklık üst sınırıdır; sayfa bütün noktaların yola uzaklığını tek tek eniyilemez. Küçülen bu sınır, tek başına sürekli bir limit fonksiyonunun varlığını kanıtlamaz."
    },
    {
      heading: "Alan sıfırdan nasıl farklı olabilir?",
      body: "Her sonlu yaklaşım, sıfır kalınlıklı sonlu doğru parçalarından oluştuğu için düzlemsel alanı sıfırdır. Alan dolduran Hilbert eğrisinin görüntüsü ise karenin tamamıdır ve alanı L²'dir. Burada alan, her sonlu resmin alanının sayısal limitinden çıkarılmıyor: önce limit fonksiyonu kuruluyor, sonra onun görüntüsü inceleniyor. Bu iki işlem yer değiştiremez. Ekrandaki çizgi kalınlığı da bu alanlardan hiçbirini ölçmez.",
      formula: "Alan(Hₙ([0,1])) = 0; H([0,1]) = [0,L]² ⇒ Alan(H([0,1])) = L²",
      formulaNote: "Hₙ sonlu çokgen yaklaşımı, H uygun parametrelenmiş limit fonksiyonudur. Sonlu yolun görüntüsü boyut 1, dolu karenin görüntüsü boyut 2'dir."
    },
    {
      heading: "Süreklilik ile örtenlik ayrı işler yapar",
      body: "Süreklilik, parametrede küçük bir değişikliğin konumda ani bir sıçrama yaratmamasıdır. Örtenlik ise karedeki her noktanın en az bir parametre değerinden gelmesidir. Standart Hilbert kuruluşunda parametre aralığı dört eş parçaya, kare de dört alt kareye ayrılır; sonraki bölmeler bu eşleştirmeyi korur. İç içe küçülen kareler konumu belirler. Komşu parçaların uyumlu birleştirilmesi de sürekliliği sağlar. Bu, yalnız merkezleri saymaktan daha güçlü bir yapıdır. Fonksiyon birebir değildir; farklı parametreler aynı noktaya gelebilir.",
      formula: "H: [0,1] → [0,L]²; her P için en az bir t ile H(t) = P",
      formulaNote: "t boyutsuz bir yol parametresidir, fiziksel zaman değildir. Süreklilik, tek başına türevlenebilirlik ya da sonlu uzunluk anlamına gelmez."
    },
    {
      heading: "Komşuluk neden tersine çevrilemez?",
      body: "Sonlu Hilbert sırasında ardışık iki hücre mutlaka kenar komşusudur. Arada k adım varsa düz çizgi uzaklığı en fazla kε olur; çünkü en kısa mesafe, yol boyunca yürümekten uzun olamaz. Ancak düzlemde komşu iki hücre sırada ardışık olmak zorunda değildir. n = 3'te yan yana iki hücrenin indeksleri 5 ve 58 olabilir. Bu yüzden bir veri düzenini değerlendirmek için hangi yakınlık ölçüsünü kullandığını belirtmelisin.",
      formula: "‖Pⱼ − Pᵢ‖ ≤ ε |j − i|; |j − i| = 1 ⇒ ‖Pⱼ − Pᵢ‖ = ε",
      formulaNote: "Pᵢ ve Pⱼ hücre merkezleridir. Ters yönde 'uzaklık ε ise indeks farkı 1' sonucu çıkmaz. Sayfanın karşılaştırma tablosu yalnız ardışık geometrik adımları ölçer."
    }
  ],
  lab: {
    intro: "<strong>Hücreleri dolaş</strong>, <strong>Sonlu yol ve limit</strong> ve <strong>Komşuluk sınaması</strong> sekmeleri bağımsız ayarlara sahiptir. Her birindeki Sıfırla düğmesi o deneyi varsayılana döndürür. İlk iki sekmede uzunluklar cm, üçüncüde uzaklıklar hücre kenarı birimindedir. Animasyon hücre sırasını gösterir; bir hız veya fiziksel yolculuk ölçümü değildir.",
    experiments: [
      {
        title: "Dört hücreye kaç bağlantı gerekir?",
        predict: "Dört hücreyi bir kez dolaşan açık yol dört adım mı, üç adım mı içerir? Mertebeyi 1'den 3'e çıkarınca yol kaç kat uzar?",
        do: "Hücreleri dolaş sekmesinde Sıfırla'ya bas; Kare kenarı L = 10 cm kalsın. Mertebe n'yi 1 yap ve Hücre sırası j ile 0, 1, 2, 3'ü incele. Sona git'e bas. Sonra n = 3 yapıp yeniden Sona git'e bas.",
        observe: "n = 1'de hücreler (0,0) → (0,1) → (1,1) → (1,0) sırasındadır. Hücre kenarı 5,000 cm; tam yol 15,000 cm ve ziyaret 4/4'tür. n = 3'te 64/64 hücre, 63 bağlantı, 1,250 cm adım ve 78,750 cm tam yol görülür. Uzunluk oranı 5,25'tir.",
        explain: "4ⁿ merkez, 4ⁿ − 1 adımla bağlanır. n = 1'de 3×5 = 15 cm; n = 3'te 63×1,25 = 78,75 cm. Hücre sayısı 16 katına çıkarken adım uzunluğu dörtte bire iner; bağlantı sayısındaki −1 nedeniyle toplam uzunluk oranı tam 4 değildir."
      },
      {
        title: "Yaklaşma sınırı küçülürken uzunluk",
        predict: "Mertebe artınca daha kısa adımlar kullanan yolun toplam uzunluğu azalır mı? Sonlu çizginin alanı bir noktada 100 cm² olur mu?",
        do: "Sonlu yol ve limit sekmesinde Sıfırla'ya bas. n = 3 değerlerini oku; Bir mertebe artır ile n = 4'e geç. Ardından Mertebe n kaydırıcısını 7'ye getir; L = 10 cm kalsın.",
        observe: "n = 3'te hesaplanan/formüldeki yol 78,750/78,750 cm, uzaklık sınırı 0,88388 cm'dir. n = 4'te 159,375 cm ve 0,44194 cm; n = 7'de 1.279,922 cm ve 0,05524 cm olur. Sonlu ideal çizginin alanı her seferinde 0 cm²; limit görüntüsünün alanı 100 cm²'dir.",
        explain: "Üst sınır her mertebede yarılanır; yol uzunluğu büyür. Ekrandaki sıfır uzunluğun değil, sonlu ideal çizginin alanıdır. Hesaplanan uzunluk ile formülün uyuşması sonlu bağlantıları doğrular; limitin sürekliliği ve kareyi örtmesi ayrı bir teoremdir."
      },
      {
        title: "Yan yana ama sırada elli üç adım uzakta",
        predict: "Düzlemde ortak bir kenarı paylaşan iki hücrenin sıra numarası mutlaka birer mi artar?",
        do: "Komşuluk sınaması sekmesinde Sıfırla'ya bas; n = 3 ve Hücre sıralaması = Hilbert kalsın. Önce A(0,0), B(1,0) varsayılanını oku. Sonra Sırada en uzak komşular düğmesine bas.",
        observe: "Varsayılanda indeksler A:0, B:3 ve sıra farkı 3'tür. Düğme A(3,0), B(4,0) çiftini seçer: indeksler 5 ve 58, fark 53; merkezler arası uzaklık 1,000 hücre kenarı ve komşuluk Evet'tir.",
        explain: "Düğme bütün ortak kenarlı çiftleri tarar. Aynı komşuluk uzaklığına rağmen Hilbert yolu bu iki merkez arasında 53 adım dolaşır. 'Sırada ardışık ⇒ düzlemde komşu' doğrudur; ok tersine çevrilince bu örnek onu çürütür."
      },
      {
        title: "Tek bir en iyi sıralama var mı?",
        predict: "Ardışık adımları hep kısa olan düzen, düzlemdeki bütün komşuların sıra farkını da en küçük yapar mı?",
        do: "Komşuluk sınaması sekmesinde n = 3 seç. Hücre sıralaması menüsünde Hilbert, Satır taraması ve Morton (Z sırası) seçeneklerini sırayla dene; her birinde Sırada en uzak komşular'a bas. Alt tablodaki Ortalama ve En büyük sütunlarını da karşılaştır.",
        observe: "Ardışık adımların ortalaması/en büyüğü Hilbert'te 1,000/1,000; Satır'da 1,675/7,071; Morton'da 1,460/7,071 hücre kenarıdır. Buna karşılık kenar komşuları arasındaki en büyük indeks farkı sırasıyla 53, 8 ve 22'dir.",
        explain: "İki farklı soru sordun: sıradaki komşuların geometrik uzaklığı ve geometrik komşuların sıradaki uzaklığı. Hilbert ilk ölçütte çok güçlü, ikinci ölçütte burada en küçük değeri vermiyor. Üstelik bu değerlerin hiçbiri tek başına program çalışma süresi veya önbellek başarımı değildir."
      }
    ]
  },
  wow: [
    { title: "10 cm'lik karede yaklaşık 13 m yol", body: "L = 10 cm ve n = 7 için yol 1.279,921875 cm, yani yaklaşık 12,799 m'dir. Her adım yalnız 0,78125 mm'dir. Yolun uzunluğu karenin kenarının yaklaşık 128 katı olabilir; bunun için karenin dışına çıkması gerekmez." },
    { title: "Yolu iki katına çıkar, alanı dört katına", body: "Mertebeyi sabit tutup L'yi 10 cm'den 20 cm'ye çıkarırsan her adım ve toplam uzunluk iki katına çıkar. Limitin görüntü alanı ise 100 cm²'den 400 cm²'ye çıkar. Aynı ölçek değişimi uzunlukta bir, alanda iki kuvvetle görünür." },
    { title: "Sıfır alanlı resimlerin dolu kare limiti", body: "Her sonlu n için çizginin düzlemsel alanı sıfırdır; buna rağmen uygun limit fonksiyonunun görüntüsü dolu karedir. Limit almakla görüntünün alanını hesaplamak her durumda yer değiştirmez. Buradaki şaşırtıcı sonuç, çizgiyi kalınlaştırarak elde edilmez." }
  ],
  worked: {
    title: "Her noktaya bir milimetreden yakın",
    prompt: "L = 10 cm karede, her noktadan yola uzaklığın en fazla 1 mm olduğunu rₙ üst sınırıyla garanti etmek istiyoruz. Bu sınırı sağlayan en küçük mertebeyi, hücre sayısını ve yol uzunluğunu bul.",
    steps: [
      "Birimleri eşitle: 1 mm = 0,1 cm. İstenen koşul rₙ = √2×10 / 2ⁿ⁺¹ ≤ 0,1 cm; buradan 2ⁿ ≥ 50√2 ≈ 70,7107 çıkar.",
      "2⁶ = 64 yetersiz, 2⁷ = 128 yeterli: bu üst sınırla garanti veren en küçük mertebe n = 7'dir. n = 6 için r₆ ≈ 0,11049 cm; n = 7 için r₇ ≈ 0,05524 cm.",
      "Hücre sayısı N = 4⁷ = 16.384; açık yolun bağlantı sayısı 16.383'tür. Hücre kenarı ε = 10/128 = 0,078125 cm.",
      "ℓ₇ = 16.383 × 0,078125 cm = 1.279,921875 cm ≈ 12,799 m. Sonlu yolun alanı hâlâ sıfırdır; 1 mm'lik yakınlık garantisi bütün noktaların yol üzerinde olduğunu söylemez.",
      "Sonlu yol ve limit sekmesinde L = 10 cm, n = 7 seç: Hesaplanan / formüldeki yol kartı 1.279,922 / 1.279,922 cm, uzaklık üst sınırı 0,05524 cm gösterir. Ekrandaki yuvarlama, n = 7 sonucunu değiştirmez."
    ],
    result: "n = 7, 16.384 hücre ve yaklaşık 12,799 m yol. Her noktaya uzaklık üst sınırı yaklaşık 0,5524 mm'dir; bu, alan doldurma değil yakınlık garantisidir."
  },
  misconceptions: [
    { myth: "Her hücreye uğradıysa kareyi doldurmuştur.", truth: "Hücre merkezi tek noktadır; hücrenin bütün noktaları değildir. Sonlu çizim merkezleri ve aralarındaki parçaları içerir. Karenin her noktasını örten nesne uygun sürekli limittir." },
    { myth: "Yolun uzunluğu sonsuza gidiyorsa mutlaka alanı doldurur.", truth: "Sonsuz uzunluk, alan doldurmak için yeterli değildir. Hilbert yapısında iç içe bölmeler, uyumlu parametreleme, süreklilik ve örtenlik ayrıca gerekir. Yalnız ℓₙ → ∞ hesabı bu sonuçları vermez." },
    { myth: "Hilbert sırasında düzlemdeki her komşu sırada da komşudur.", truth: "Ardışık Hilbert hücrelerinin kenar komşusu olması ters önermeyi vermez. n = 3'te indeksleri 5 ve 58 olan iki hücre ortak kenar paylaşır." },
    { myth: "Hilbert sıralaması her bilgisayar işini hızlandırır.", truth: "Yerellik hangi veriye, sorguya ve bellek düzenine bakıldığına bağlıdır. Sıra numarasını hesaplamanın da maliyeti vardır. Burada ölçülen geometrik uzaklıklar bir hız karşılaştırması değildir." }
  ],
  glossary: [
    { term: "Özyineleme", definition: "Bir yapıyı, daha küçük ölçekte aynı kuralın uygulandığı parçalardan kurma yöntemi." },
    { term: "Mertebe n", definition: "Bu laboratuvarda karenin her kenarını 2ⁿ parçaya ayıran sonlu ayrıntı düzeyi." },
    { term: "Parametreleme", definition: "Bir t değerine yol üzerindeki bir konumu atayan fonksiyonla eğriyi anlatma." },
    { term: "Örten fonksiyon", definition: "Hedef kümenin her noktasına en az bir başlangıç değerinden ulaşan fonksiyon." },
    { term: "Düzgün yakınsama", definition: "Yaklaşım hatasının bütün parametre değerlerinde aynı anda sıfıra yaklaştığı fonksiyon dizisi yakınsaması." },
    { term: "Görüntü kümesi", definition: "Bir fonksiyonun tüm girdileri boyunca ulaştığı noktaların oluşturduğu küme." },
    { term: "Yerellik", definition: "Seçilen sıralamanın, belirli bir yakınlık ölçüsüne göre ilişkili verileri ne ölçüde birbirine yakın tuttuğu özellik." },
    { term: "Morton sırası", definition: "Izgara koordinatlarının ikili basamaklarını iç içe geçirerek hücrelere tek bir sıra numarası verme düzeni." }
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Analiz I–II'de fonksiyon dizileriyle karşılaştığında, 'her t için bir limit var' ile 'bütün t'lerde hata birlikte küçülüyor' arasındaki farkı inceleyeceksin. İkincisi düzgün yakınsamadır; sürekli yaklaşımların düzgün limiti de süreklidir. Hilbert kuruluşu ayrıca iç içe karelerle örtenliği kurar. Standart parametrelemede ‖H(t) − H(s)‖ ≤ CL√|t − s| türünde bir sınır vardır: C boyutsuz sabittir. Bu, Hölder sürekliliğinin 1/2 üslü örneğidir; sırada yakın parametrelerin düzlemde de yakın kalmasını nicelleştirir, tersini söylemez.",
      "Ayrık Matematik'te aynı sonlu rota, kare ızgara çizgesinin her köşesini bir kez ziyaret eden bir Hamilton yoludur. Algoritmalar ve Veri Yapıları'nda ise iki koordinattan bir indekse geçmenin maliyetini, sorguların hangi komşulukları kullandığını ve bellek bloklarını incelersin. Geometri ile çalışma süresini ayrı ölçmek gerekir: son sekmedeki iki farklı yakınlık sınaması bunun küçük ama somut bir örneğidir."
    ],
    topics: ["Analiz: fonksiyon dizileri ve düzgün yakınsama", "Topoloji: süreklilik ve örtenlik", "Ayrık Matematik: Hamilton yolları", "Veri Yapıları: uzamsal sıralama ve yerellik"]
  },
  quiz: [
    { question: "L sabitken mertebe n'den n + 1'e geçildiğinde hangisi doğrudur?", options: ["Hücre sayısı iki, adım uzunluğu iki katına çıkar", "Hücre sayısı dört katına çıkar, adım uzunluğu yarıya iner", "Hücre sayısı sabit kalır, yol yarıya iner", "Sonlu yolun alanı dört katına çıkar"], answer: 1, explanation: "N = 4ⁿ ve ε = L/2ⁿ. Açık yolun uzunluğu yaklaşık iki katına çıkar; sonlu mertebede bağlantı sayısındaki −1 nedeniyle tam iki kat değildir." },
    { question: "n = 3'te A ve B kenar komşusu ama Hilbert indeksleri 5 ve 58. Bundan ne çıkar?", options: ["Hilbert yolunda bir kopukluk vardır", "İki hücrenin doğrudan uzaklığı 53 hücredir", "Düzlemde komşuluk, sırada ardışıklığı zorunlu kılmaz", "Hilbert sıralaması her zaman satır taramasından yavaştır"], answer: 2, explanation: "Doğrudan uzaklık bir hücre kenarıdır; sıra farkı 53'tür. Hilbert yolunun ardışık her adımı yine komşu hücreler arasındadır. Geometrik karşı örnek çalışma süresi hakkında tek başına hüküm vermez." },
    { question: "Bir sonlu yaklaşım için rₙ ≤ 0,1 cm bulunması neyi garanti eder?", options: ["Karedeki her nokta yolun üzerindedir", "Yolun kapladığı alan L²'dir", "Limit fonksiyonunun sürekliliği kanıtlanmıştır", "Karedeki her noktanın yola uzaklığı en fazla 0,1 cm'dir"], answer: 3, explanation: "Her nokta kendi hücre merkezine en fazla rₙ uzaktır ve yol bütün merkezlerden geçer. Yakınlık garantisi, tam örtme veya limit fonksiyonunun varlığı ve sürekliliği değildir." }
  ],
  next: [
    { href: "koch-kar-tanesi.html", title: "Koch kar tanesi: uzunluk ve alan", why: "Sınırsız uzayan sınır ile sonlu alanın başka bir ilişkisini incele; sonsuz uzunluğun tek başına alan doldurma olmadığını karşılaştır." },
    { href: "mandelbrot-fraktali.html", title: "Mandelbrot: sonlu hesap ve üyelik", why: "Bir resmin gösterdiği şeyle sonsuz süreç hakkında kanıtlanan şeyi ayırmayı başka bir fraktalda dene." },
    { href: "cizge-teorisi.html", title: "Çizge teorisi: yollar ve bağlantılar", why: "Hücre merkezlerini köşe, ortak kenarlı komşuluğu bağlantı olarak okuyup yol kavramını soyutlaştır." },
    { href: "algoritmalar.html", title: "Algoritmalar: bir sıralamanın maliyeti", why: "Bir geometrik kuralın bilgisayar adımlarına dönüşmesini ve hesap maliyetiyle uygulama kazancını birlikte düşün." }
  ],
  sources: [
    { title: "3Blue1Brown · Hilbert's Curve", url: "https://www.3blue1brown.com/lessons/hilbert-curve/", note: "Grant Sanderson'ın resmi görsel dersi: sonlu yaklaşımlar, alan dolduran limit ve sonsuz matematiğin sonlu kullanım alanları." },
    { title: "MIT · Yufei Zhao, Probabilistic Methods in Combinatorics", url: "https://ocw.mit.edu/courses/18-226-probabilistic-methods-in-combinatorics-fall-2022/mit18_226_f22_lec_full.pdf", note: "§9.6, basılı s. 165–166: alan dolduran eğrinin tanımı, Peano ve Hilbert tarihçesi; Teorem 9.6.7 ve kanıt taslağı Hilbert eğrisinin 1/2 üslü Hölder sürekliliğini verir. İleri okuma." },
    { title: "Reissmann, Meyer ve Jahre · Energy and Locality Effects", url: "https://arxiv.org/abs/1606.06133", note: "Hilbert ve Morton sıralarını matris çarpımında inceleyen araştırma: geometrik yerellik kazancı ile indeks hesaplama maliyetinin ayrı etkileri." }
  ],
  revision: "Kasım 2026"
};
