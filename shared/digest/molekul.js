window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["molekul"] = {
  slug: "molekul",
  title: "Moleküller: Atomları Bir Arada Tutan Ne?",
  field: "Kimya",
  level: "Lise–Lisans",
  minutes: 35,
  tagline: "Bir kimyasal bağ, iki top arasındaki çubuktan fazlasıdır: bir enerji kuyusu. Kuyunun biçimini ölç, izotopla titreşimi değiştir ve kutuplu bağların toplamını keşfet.",
  hook: "İki hidrojen atomu birbirini çekiyorsa neden üst üste çökmez? Birbirinden uzaklaşınca neden hemen ayrılmaz? Cevap, aralarında görünmez bir çubuk olmasında değil; uzaklık değiştikçe toplam enerjinin nasıl değiştiğinde.",
  bigIdea: "Kimyasal bağı anlamak için <strong>enerjinin uzaklığa bağlılığını</strong>, molekülün kutupluluğunu anlamak için ise <strong>yük dağılımının yönünü ve simetrisini</strong> birlikte düşünmek gerekir.",
  story: [
    "Bir molekül modelindeki çizgi, büyük bir soruyu tek işarette saklar: Bu iki atomu birlikte tutmak neden enerji bakımından elverişli? Kovalent bağdaki elektronlar yalnız bir çekirdeğe ait küçük bilyeler değildir. Elektronların kuantum durumu, iki çekirdekle etkileşimi ve bütün sistemin enerjisi birlikte değerlendirilir. Çekirdekler çok yaklaşınca enerji yeniden yükselir; en elverişli uzaklık, bütün etkilerin oluşturduğu eğrinin minimumundadır.",
    "Linus Pauling, bağların doğasını ve karmaşık maddelerin yapılarını açıklayan çalışmalarıyla 1954 Nobel Kimya Ödülü'nü aldı. Bu çalışmaların cazibesi, bir kimyasal formülü üç boyutlu ve ölçülebilir bir yapıya bağlamasındaydı. H₂O yazısı atomları sayar; bağ açısı ve elektron dağılımı ise suyun neden kalıcı bir dipol taşıdığını açıklamaya yardım eder. Formül, hikâyenin başlangıcıdır.",
    "Bir enerji eğrisini doğrudan görmek zorunda değilsin: titreşim onun şeklini ele verir. Dar ve dik bir kuyudaki hareket hızlıdır; aynı kuyuya daha ağır bir izotop koyunca yavaşlar. Bu laboratuvarda bunu yaklaşık H₂ ve D₂ modelleriyle ölçebilirsin. Ekrandaki hareket klasik bir benzetimdir; gerçek molekülde izinli titreşim enerjileri kuantumludur. Modelin işe yaradığı yerle sınırını aynı deneyde görmek, bilimsel açıklamanın bir parçasıdır."
  ],
  core: [
    {
      heading: "Bağ bir enerji minimumudur",
      body: "İki atom sonsuz uzakta ve ayrı iken etkin potansiyel enerjiyi sıfır seçelim. Bağlı düzenin minimumu bunun altında kalır. Denge uzaklığında eğim sıfırdır: uzaklığı değiştirmeye çalışan net kuvvet yoktur. Ama biraz sağa ya da sola kaydırırsan kuvvet geri döndürür. Yalnız eğimin sıfır olması yetmez; burada pozitif eğrilik kararlı bir minimumu garanti eder. Eğrilik sıfır çıkarsa daha yüksek dereceli terimleri incelemek gerekir. Bu eğri, çekirdek konumları değişirken elektronik durumun etkisini içeren bir modeldir; iki klasik noktasal yükün Coulomb eğrisi değildir.",
      formula: "F(r) = −dU/dr; U′(rₑ) = 0, U″(rₑ) > 0",
      formulaNote: "r çekirdekler arası uzaklık; pozitif F uzaklığı artıran yöndür. U'nun sıfırını değiştirmek kuvveti değiştirmez."
    },
    {
      heading: "Kuyunun dibindeki yay",
      body: "Denge yakınında Taylor açılımında doğrusal terim kaybolur: U(r) ≈ U(rₑ) + ½k(r − rₑ)². Böylece iki atomun göreli hareketi, bir yaya bağlı indirgenmiş kütlenin hareketine benzer. İndirgenmiş kütle, iki atomun da hareket ettiğini hesaba katar: eş atomlarda μ = m/2. Aynı elektronik potansiyelde daha ağır izotopun periyodu büyür; bağın daha zayıf olduğunu söylemek için tek başına bu gözlem yetmez.",
      formula: "k = U″(rₑ); μ = m₁m₂/(m₁ + m₂); T₀ = 2π√(μ/k)",
      formulaNote: "k N/m, μ kg ise T₀ saniye çıkar. Yaklaşım yalnız kuyunun dibine yakın küçük titreşimler içindir."
    },
    {
      heading: "Morse kuyusu: yay neden sonsuza uzanamaz?",
      body: "Harmonik yayda uzaklık büyüdükçe enerji sınırsız artar; o modelde bağı koparmak için sonsuz enerji gerekir. Morse potansiyeli ise uzaklarda sıfıra yaklaşır, tabanı −Dₑ'dedir. Sayfada Dₑ = 4,75 eV, rₑ = 0,7414 Å ve a = 1,942 Å⁻¹ seçilmiştir. Bunlar yaklaşık H₂ parametreleridir. Kuyu tabanından ölçülen enerji oranına q = (E + Dₑ)/Dₑ dersek, klasik bağlı harekette 0 < q < 1 ve T(E) = T₀/√(1 − q) olur. Enerji büyüdükçe yörünge kuyunun yassı sağ tarafına uzanır ve periyot artar.",
      formula: "U(r) = Dₑ[1 − e<sup>−a(r−rₑ)</sup>]² − Dₑ; k = 2Dₑa²",
      formulaNote: "Dₑ kuyu derinliği, a ters uzunluktur. q → 1⁻ iken klasik periyot sınırsız büyür; bu, gerçek molekülün kuantum düzeylerini hesaplayan bir formül değildir."
    },
    {
      heading: "Kutuplu bağların toplamı sıfır olabilir",
      body: "Bir bağdaki yük ayrımı molekülün tamamında mutlaka net dipol bırakmaz. İki eş vektör ters yönlerdeyse birbirini götürür; açı yapıyorsa genellikle götürmez. CO₂'nin doğrusal simetrisi ile suyun açısal yapısını karşılaştır. Dipol atölyesi bu geometriyi iki ayarlanabilir okla gösterir. Gerçek molekülün dipolü bütün yük dağılımından gelir; atölyedeki 1 D'lik oklar suyun ölçülmüş bağ momentleri değildir. Kimyasal kutupluluk okları + uçtan − uca çizilir; fiziksel dipol momenti vektörünün yönü tersidir, büyüklük hesabı aynıdır.",
      formula: "μ<sub>net</sub>² = μ₁² + μ₂² + 2μ₁μ₂ cos θ",
      formulaNote: "θ iki ok arasındaki açı. Eş büyüklükte iki ok için μnet = 2μ₁ cos(θ/2); θ = 180°'de sonuç sıfırdır."
    },
    {
      heading: "Çubuk modelinin göstermediği elektronlar",
      body: "Tek, çift ve üçlü çizgiler Lewis gösteriminde ortak elektron çiftlerini sayar. Ama çizgi sayısı her olguyu açıklamaz. O₂'nin temel durumunda iki eşleşmemiş elektron bulunur; moleküler orbital kuramı bu elektronları ve paramanyetizmayı açıklar. Moleküler orbital yaklaşımında bağ yapan ve bağ karşıtı orbitallerin dolulukları birlikte önemlidir. Benzer bağları karşılaştırırken artan bağ mertebesi çoğunlukla daha kısa, daha güçlü bağla ilişkilidir; farklı atom çiftlerini yalnız çizgi sayısıyla sıralamak güvenilir değildir.",
      formula: "Bağ mertebesi = ½(N<sub>bağ yapan</sub> − N<sub>bağ karşıtı</sub>)",
      formulaNote: "N ilgili orbitallerdeki elektron sayısıdır. Orbital doluluğu burada hesaplanmaz; galerideki çizgiler yalnız Lewis bağ gösterimidir."
    }
  ],
  lab: {
    intro: "Üç sekme var: <strong>Molekül galerisi</strong>, <strong>Bağ kuyusu ve titreşim</strong> ve <strong>Dipol atölyesi</strong>. Galeri hazır yaklaşık yapıları gösterir; titreşim sekmesi diferansiyel denklemi sayısal olarak çözer; dipol sekmesi bir vektör modelidir. Bağ deneyinde bir ekran saniyesi 5 fs'ye karşılık gelir. Ölçülen periyot, aynı yöndeki denge geçişlerinden elde edilir; iki geçişi bekle. Her sekmenin kendi sıfırlama düğmesi vardır.",
    experiments: [
      {
        title: "Minimumun iki yanında kuvvet",
        predict: "Uzaklık denge değerinden küçükse atomlar daha da mı yaklaşır? Büyükse kuvvet hangi yönde olur?",
        do: "Bağ kuyusu ve titreşim sekmesinde Bağ deneyini sıfırla. Uzaklığı elle incele kaydırıcısını 0,5000 Å'ye getir; ardından Dengeye getir düğmesine bas; son olarak 1,0000 Å'yi seç. İnce ayar için kaydırıcıya odaklanıp ok tuşlarını kullan.",
        observe: "0,5000 Å'de U = −3,051 eV ve F = +28,251 nN; dengede r = 0,7414 Å, U = −4,750 eV, F = 0,000 nN; 1,0000 Å'de U = −4,010 eV ve F = −7,063 nN. Her iki yanda enerji minimumdan daha yüksek, kuvvet ise minimuma yöneliktir.",
        explain: "Pozitif işaret uzaklığı artırma, negatif işaret azaltma yönünü gösterir. Elle incelemede uzaklık sabit tutulur; bunlar hareket ölçümü değildir. Kuvveti yalnız enerjinin işaretinden çıkaramazsın: üç durumda da U negatifken kuvvetin işareti değişti. Belirleyici olan eğimdir."
      },
      {
        title: "Enerji artınca periyot aynı kalıyor mu?",
        predict: "Bir harmonik yay genlikten bağımsız periyoda sahiptir. Molekülü kuyunun daha yukarısına çıkarınca bu sonuç sürer mi?",
        do: "Bağ deneyini sıfırla. %1 enerji düğmesine bas, Sayısal yörüngeden ölçülen T değerini bekle. Ardından %75 enerji düğmesine basıp tekrar ölç. Küçük titreşim T₀, Morse kuramı T(E) ve ölçülen T kutularını karşılaştır.",
        observe: "H₂ için küçük titreşim T₀ iki koşulda da 7,586 fs'dir. %1 enerjide kuram ve ölçüm yaklaşık 7,624 fs, %75'te 15,172 fs verir. Sonuncusu T₀'ın tam iki katıdır. Toplam enerji ekranda sırasıyla −4,702 eV ve −1,188 eV görünür; iki yörünge de bağlıdır.",
        explain: "%75, atomların ayrıldığı sıfırdan değil kuyu tabanından ölçülür: q = 0,75. Bu yüzden T/T₀ = 1/√0,25 = 2. Ölçümün harmonik değerden ayrılması sayısal hata değildir; modelin anaharmonikliğidir. Sayısal hatayı, ölçümü aynı enerjideki Morse kuramıyla karşılaştıran ayrı kutuda görürsün."
      },
      {
        title: "Aynı kuyu, daha ağır atomlar",
        predict: "H₂ yerine D₂ seçince kuyunun şekli mi, titreşimin süresi mi değişir? Süre iki katına mı çıkar?",
        do: "Bağ deneyini sıfırla; enerji varsayılan %25'te kalsın. Titreşimi başlat ve H₂'nin periyodunu ölç. İzotop menüsünden D₂'yi seç; yörünge yeniden başlar. Yeni ölçümü bekle.",
        observe: "H₂ için kuram ve ölçüm 8,760 fs; D₂ için 12,383 fs olur. Oran yaklaşık 1,414'tür. İki koşulda da enerji −3,563 eV ve dönüş uzaklıkları yaklaşık 0,533 Å ile 1,098 Å'dir. Grafik üzerindeki potansiyel kuyu değişmez.",
        explain: "Bu model izotop değişiminde elektronik potansiyeli sabit tutar. Periyot indirgenmiş kütlenin kareköküyle değişir: √(2,014102/1,007825) ≈ 1,41367. Döteryum atomunun kütlesi hidrojeninkinin tam iki katı olmadığından oran da tam √2 değildir. Gerçekte kuantum titreşim düzeyleri de izotopla değişir."
      },
      {
        title: "İki kutuplu bağdan sıfır toplam",
        predict: "İki bağın her biri 1 D ise molekülün toplamı her zaman 2 D midir? Ters yönlü ama eşit olmayan iki bağ birbirini tamamen götürür mü?",
        do: "Galeride H₂O ile CO₂'yi karşılaştır. Dipol atölyesine geç, Dipolleri sıfırla: θ = 104,5°, μ₁ = μ₂ = 1 D. Sonra Eş ve karşıt; ardından Karşıt ama farklı düğmelerine bas.",
        observe: "İlk durumda net büyüklük 1,224 D, skaler toplam 2,000 D'dir. Eş ve karşıt durumda net 0,000 D olur. Karşıt ama farklı, 180°'de 1 D ile 0,5 D'yi toplar: net 0,500 D kalır. Galerideki suyun yaklaşık 1,85 D değeri deneysel bir veridir; bu iki oklu örneğin sonucu değildir.",
        explain: "Vektörlerin büyüklüğü kadar yönü de hesaba katılır. Eş ve zıt oklar iptal olur; farklı büyüklüklerde fark kalır. Açısal geometri ise eş okların bile toplamını sıfırlamaz. Bağ kutupluluğundan molekül kutupluluğuna geçerken simetriyi atlayamazsın."
      }
    ]
  },
  wow: [
    { title: "Bir ekran saniyesinin karşılığı", body: "Buradaki H₂ modelinin küçük titreşim periyodu yaklaşık 7,586 × 10⁻¹⁵ s; bunun tersi yaklaşık 1,32 × 10¹⁴ Hz'dir. Ekranda bir saniye yalnız 5 fs ilerletir. Gördüğün ağır salınım, moleküler zaman ölçeğinin olağanüstü yavaşlatılmış bir temsilidir; gerçek bir mikroskop kaydı değildir." },
    { title: "Sıfır hareket enerjisi bile son söz değil", body: "Klasik model atomları kuyunun dibinde durdurabilir. Kuantum harmonik yaklaşımında en düşük titreşim enerjisi kuyu tabanından ½hν yukarıdadır. Bu sayfanın ν değeriyle yaklaşık 0,273 eV çıkar. Böylece kuyu tabanından koparma enerjisi Dₑ ile temel titreşim düzeyinden koparma enerjisi D₀'ın niçin farklı olduğunu sezebilirsin; 0,273 eV burada harmonik bir kestirimdir." },
    { title: "İki elektron çizgileri aşar", body: "O₂'yi galeride iki çizgiyle görürsün. Oysa temel durumunda iki elektron eşleşmemiştir ve oksijen paramanyetiktir. Aynı moleküle ait bağ çizimi ve manyetik davranış, iki ayrı açıklama düzeyi ister: Lewis yapısı yararlıdır ama bütün elektronik yapının resmi değildir." }
  ],
  worked: {
    title: "Bağ eğriliğinden moleküler saate",
    prompt: "Sayfanın yaklaşık H₂ modelinde Dₑ = 4,75 eV ve a = 1,942 Å⁻¹. Bir atomun kütlesi 1,007825 u. Küçük titreşim periyodunu ve kuyu tabanından %25 enerji için klasik Morse periyodunu bul. 1 eV = 1,602176634 × 10⁻¹⁹ J; 1 u ≈ 1,66053907 × 10⁻²⁷ kg.",
    steps: [
      "Önce SI birimlerine geç: Dₑ ≈ 7,61034 × 10⁻¹⁹ J, a = 1,942 × 10¹⁰ m⁻¹. Aynı atomlar için μ = m/2 ≈ 8,36766 × 10⁻²⁸ kg.",
      "Dengede eğriliği hesapla: k = 2Dₑa² ≈ 574,027 N/m. J/m² = N/m olduğu için birim yay sabitiyle tutarlıdır.",
      "T₀ = 2π√(μ/k) ≈ 7,58605 × 10⁻¹⁵ s = 7,58605 fs. Tek bir atomun kütlesini μ yerine kullanmak süreyi yanlışlıkla √2 kat büyütürdü.",
      "q = 0,25 için T = T₀/√(1 − q) = 7,58605/√0,75 ≈ 8,75962 fs. Toplam enerji ayrılmış atomlara göre E = Dₑ(q − 1) = −3,5625 eV'dir."
    ],
    result: "Küçük titreşim periyodu 7,586 fs; seçilen bağlı yörüngede periyot 8,760 fs. Yaklaşık %15,47'lik artış, aynı kuyunun harmonik yaklaşımdan sapmasıdır."
  },
  misconceptions: [
    { myth: "Bağı kırınca bağda depolanmış enerji açığa çıkar.", truth: "Kararlı, bağlı durumdaki bir molekülü ayrılmış atomlara dönüştürmek enerji gerektirir; tersine bağ oluştuğunda bu enerji farkı çevreye aktarılır. Bir tepkimenin toplam enerji bilançosu, kırılan ve oluşan bütün bağlarla birlikte diğer etkileri de içerir." },
    { myth: "Enerji negatifse kuvvet mutlaka çekicidir.", truth: "Enerji sıfırı seçime bağlıdır; kuvvet eğime bağlıdır. Bu modelde r = 0,5000 Å'de enerji negatifken kuvvet iticidir. Dengedeyse enerji en düşük ama kuvvet sıfırdır." },
    { myth: "Kutuplu bağ içeren her molekül kutupludur.", truth: "Bağ yönleri ve simetri belirleyicidir. CO₂'nin kutuplu C=O bağları simetrik doğrusal yapıda kalıcı net dipol bırakmaz; suyun açısal geometrisinde böyle bir iptal yoktur." },
    { myth: "Ekrandaki titreşim gerçek molekülün yörüngesidir.", truth: "Ekran klasik bir etkin potansiyel modelinin yavaşlatılmış çözümünü gösterir. Gerçek kuantum titreşim durumları sürekli seçilebilir klasik yörüngeler değildir; sıfır nokta enerjisi de bu hareket hesabında yoktur." }
  ],
  glossary: [
    { term: "Denge bağ uzunluğu", definition: "Seçilen elektronik durumun etkin potansiyel enerjisinin minimum olduğu çekirdekler arası uzaklık." },
    { term: "Kuyu derinliği Dₑ", definition: "Ayrılmış atomların enerji düzeyiyle potansiyel minimumu arasındaki fark." },
    { term: "İndirgenmiş kütle", definition: "İki cismin göreli hareketini tek kütleyle yazdıran μ = m₁m₂/(m₁ + m₂) niceliği." },
    { term: "Anaharmoniklik", definition: "Potansiyelin denge çevresindeki tam bir parabol biçiminden sapması." },
    { term: "Dipol momenti", definition: "Pozitif ve negatif yüklerin uzaysal ayrımını büyüklük ve yönüyle anlatan vektörel nicelik." },
    { term: "İzotop", definition: "Proton sayısı aynı, nötron sayısı farklı olan atom türü." },
    { term: "Sıfır nokta enerjisi", definition: "Bir kuantum sisteminin temel durumunda, seçilen klasik minimumun üzerinde kalan enerji." },
    { term: "Paramanyetizma", definition: "O₂ gibi moleküllerde eşleşmemiş elektronların katkısıyla, dış manyetik alanın daha güçlü olduğu bölgeye çekilme eğilimi." }
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Genel Kimya'da Lewis yapıları ve VSEPR ile başlayan yol, Kuantum Kimyası'nda elektronik dalga fonksiyonlarına ve moleküler orbitallere varır. Born–Oppenheimer yaklaşımı, ağır çekirdeklerin hareketiyle elektronların durumunu yaklaşık olarak ayırır; burada kullanılan U(r) böyle bir etkin enerji eğrisi fikridir. Bir eğriyi bilmek, bütün elektronik hesabı yapmış olmak değildir.",
      "Fizik I ve Diferansiyel Denklemler'de μr'' = −dU/dr hareketini, Fizikokimya ve Spektroskopi'de ise izinli titreşim düzeylerini incelersin. Taylor açılımı küçük titreşimde yay modelini verir; yüksek enerjide anaharmoniklik belirginleşir. Sonraki adım, sürekli klasik enerjiyle kuantum düzeyleri arasındaki farkın bir molekülün tayfında nasıl göründüğünü araştırmaktır."
    ],
    topics: ["Genel Kimya: bağ ve molekül geometrisi", "Fizik I: küçük salınımlar", "Fizikokimya: titreşim spektroskopisi", "Kuantum Kimyası: moleküler orbitaller"]
  },
  quiz: [
    { question: "Aynı elektronik potansiyelde iki eş atomun kütlesi dört katına çıkarılırsa küçük titreşim periyodu nasıl değişir?", options: ["Dört katına çıkar", "İki katına çıkar", "Yarıya iner", "Değişmez"], answer: 1, explanation: "İndirgenmiş kütle de dört katına çıkar; k sabittir. T₀ ∝ √μ olduğundan √4 = 2. Kütle değişimi tek başına potansiyelin daha zayıf olduğunu göstermez." },
    { question: "İki eş 1 D'lik bağ dipolünün vektörel toplamı ne zaman sıfır olur?", options: ["Her açı için", "90° açı yapınca", "Aynı yöndeyken", "Aralarındaki açı 180° olduğunda"], answer: 3, explanation: "Eş ve karşıt vektörler birbirini götürür. Aynı yöndeyken 2 D; 90°'de √2 D olur. Eşit olmayan karşıt vektörlerde ise büyüklük farkı kalır." },
    { question: "H₂ modelinde %75 enerjide ölçülen T = 15,172 fs, küçük titreşim T₀ = 7,586 fs. Bu fark tek başına neyi gösterir?", options: ["Sayısal çözüm kesinlikle hatalıdır", "Atomlar mutlaka ayrılmıştır", "Harmonik yaklaşım bu enerjide yeterli değildir", "H₂'nin atom kütlesi değişmiştir"], answer: 2, explanation: "Klasik Morse kuramı da T/T₀ = 1/√(1 − 0,75) = 2 verir. Bu fark anaharmonikliktir. Sayısal hatayı ölçmek için sayısal periyodu aynı enerjideki Morse sonucu ile karşılaştırmalısın." }
  ],
  next: [
    { href: "molekul-sekli.html", title: "Molekül Şekli (VSEPR)", why: "Su açısal, metan dörtyüzlü: bağlar ve ortaklanmamış çiftlerin geometriyle ilişkisini derinleştir." },
    { href: "yay-kutle.html", title: "Yay-Kütle Sistemi: Salınım, Sönüm ve Rezonans", why: "T = 2π√(m/k) bağıntısını makroskopik bir sistemde dene; indirgenmiş kütlenin rolünü karşılaştır." },
    { href: "atom-orbitalleri.html", title: "Atom Orbitalleri: Hidrojen Benzeri Atomun Kesin Çözümü", why: "Elektronu küçük bir top olarak düşünmenin sınırlarını gör; moleküler orbital kuramının ön koşullarına yaklaş." },
    { href: "taylor-serisi.html", title: "Taylor serisi: eğrinin dibindeki parabol", why: "Morse potansiyelinin küçük bir bölgede neden harmonik göründüğünü yaklaşım matematiğiyle incele." }
  ],
  sources: [
    { title: "OpenStax · Chemistry 2e", url: "https://openstax.org/details/books/chemistry-2e", note: "7.2 kovalent bağ, 7.5 bağ enerjisi, 7.6 yapı ve kutupluluk, 8.4 moleküler orbital kuramı: enerji, geometri ve O₂'nin eşleşmemiş elektronları için." },
    { title: "NIST Chemistry WebBook · Hidrojen", url: "https://webbook.nist.gov/cgi/cbook.cgi?ID=C1333740&Mask=FFFF", note: "H₂'nin spektroskopik sabitleri ve denge uzaklığı; sayfanın yuvarlatılmış model parametreleri tam veri uyumu olarak sunulmaz." },
    { title: "MIT OpenCourseWare · Morse potansiyeli sorusu", url: "https://ocw.mit.edu/courses/res-8-009-introduction-to-oscillations-and-waves-summer-2017/mitres_8_009su17_final_ind.pdf", note: "Potansiyel minimumu, eğrilik ve küçük titreşim frekansı arasındaki bağı kuran açık ders problemi." },
    { title: "Nobel Prize · Modern kimyanın gelişimi", url: "https://www.nobelprize.org/prizes/themes/the-nobel-prize-in-chemistry-the-development-of-modern-chemistry/", note: "Pauling'in kimyasal bağ araştırmaları ve 1954 Nobel Kimya Ödülü için tarihsel dayanak." }
  ],
  revision: "Kasım 2026"
};
