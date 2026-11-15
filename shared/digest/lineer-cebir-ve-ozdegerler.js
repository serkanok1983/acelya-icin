window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["lineer-cebir-ve-ozdegerler"] = {
  slug: "lineer-cebir-ve-ozdegerler",
  title: "Lineer Cebir: Eleme, Alt Uzaylar ve Spektrum",
  field: "Matematik",
  level: "Lisans",
  minutes: 45,
  tagline:
    "Bir matrise dört soru sorulur: denklem takımı çözülür mü, hangi yönler sıfıra gider, hangileri yalnız ölçeklenir, tam çözüm yoksa en iyisi ne? Kesirlerle tam cevaplar ve kayan noktanın bunlardan sapışı.",
  hook:
    "İki bin yıllık bir Çin kitabındaki eleme yöntemi bugün her bilgisayarda çalışıyor, ama aynı veriyi iki farklı yoldan çözen iki program birbirinden yüzde altıdan fazla ayrı sonuç verebiliyor. Hangisi yanılıyor ve neden? Cevap, matrisin hangi yönleri ezip hangilerini koruduğunda saklı.",
  bigIdea:
    "Bir matrisin <strong>rankı</strong>, <strong>dört temel alt uzayı</strong> ve <strong>özdeğerleri</strong> kesin cevaplı sorulardır; kayan noktalı bir algoritmanın bu cevaplara ne kadar yaklaşacağını ise <strong>koşul sayısı</strong> ve yöntemin kendisi belirler.",
  story: [
    "Bilinen en eski eleme tarifi, <em>Dokuz Bölümde Matematik Sanatı</em> (Jiuzhang suanshu) adlı Çin derlemesinin sekizinci bölümündedir: \"Dikdörtgen Diziler\". Orada iki ile beş denklemli on sekiz problem, katsayılar dikdörtgen bir dizi halinde yazılıp satırlardan katları çıkarılarak çözülür; ispat yoktur, yalnız yöntem vardır. Kitaba bilinen ilk atıf MS 179 tarihlidir; bazı kısımlarının MÖ 150 dolaylarına uzandığı düşünülür. Avrupa'da Newton 1669–1670'te, bildiği cebir kitaplarında eşanlı denklemleri çözmeyi öğreten bir ders bulunmadığını yazıp bir tane ekledi; notları 1707'de <em>Arithmetica Universalis</em> olarak basıldı. Bugün okullarda öğretilen algoritmaya Gauss'un adı ise, konunun tarihiyle ilgili bir karışıklık yüzünden, ancak 1950'lerde verildi.",
    "Gauss'un bu işle gerçek bağı başka bir hikâyeden gelir. Giuseppe Piazzi 1 Ocak 1801'de Ceres'i keşfetti, yaklaşık 40 gün izledi ve cisim Güneş'in parıltısında kayboldu. Elde birkaç gözlem ve çözülmesi zor yörünge denklemleri vardı. Kayıtlara göre Franz Xaver von Zach'ın Ceres'i yeniden bulmasını sağlayan, 24 yaşındaki Gauss'un en küçük kareler çözümlemesiyle yaptığı öngörüydü. Yöntemin ilk açık ve derli toplu yayını ise Adrien-Marie Legendre'nin 1805 tarihli çalışmasıdır; Gauss 1809'da yöntemi 1795'ten beri kullandığını yazınca bir öncelik tartışması başladı. Gauss 1810'da simetrik eleme için bir gösterim geliştirdi; on dokuzuncu yüzyılın elle hesap yapan hesapçıları en küçük karelerin <strong>normal denklemlerini</strong> bu gösterimle çözdü.",
    "Özdeğerin kökü mekaniktedir. Euler dönen katı cisimlerde asal eksenlerin önemini gördü; Lagrange bu eksenlerin eylemsizlik matrisinin özvektörleri olduğunu fark etti. Cauchy fikri ikinci dereceden yüzeyleri sınıflandırmaya ve her boyuta taşıdı, özdeğere \"karakteristik kök\" dedi; \"karakteristik denklem\" adı ondan kalmadır. Almanca <em>eigen</em> (\"kendi\") sözcüğünü bu anlamda ilk kez 1904'te Hilbert kullandı; Helmholtz'un benzer bir kullanımından etkilenmiş olabilir. Sayısal tarafta Richard von Mises 1929'da kuvvet yöntemini yayımladı; Heinz Rutishauser 1950'lerin ortasında LU çarpanlamasına dayanan LR algoritmasını kurdu; John Francis ile Vera Kublanovskaya, LU yerine dik QR çarpanlamasını koyan QR algoritmasını birbirinden habersiz geliştirip 1961 dolaylarında yayımladı. Bu sayfanın üçüncü sekmesi o algoritmanın en yalın biçimini ve Wilkinson kaydırmalı sürümünü yan yana çalıştırır.",
    "Tekil değer ayrışımı (SVD) da birkaç kez keşfedildi: Beltrami 1873'te, Jordan 1874'te, Sylvester 1889'da; Erhard Schmidt 1907'de aynı fikri integral operatörleri için kurdu ve en iyi düşük ranklı yaklaşım problemini o ortamda çözdü. C. Eckart ile G. Young 1936'da sonucu matrisler için yeniden buldu; teorem bugün onların adını taşır, 1960'ta Mirsky bütün birim-değişmez normlara genelleştirdi. İlk pratik hesap yöntemleri Jacobi türü döndürmelerdi (Kogbetliantz 1954–1955, Hestenes 1958; sayfanın karşılaştırmada kullandığı tek taraflı Jacobi Hestenes'inkidir). Householder yansımalarına dayanan ve bugünkü kütüphanelerin temeli olan yöntem 1965'te Golub ile Kahan'dan, en yaygın sürümü 1970'te Golub ile Reinsch'ten geldi. Veri sıkıştırmadan arama motorlarına, temel bileşenler çözümlemesinden kuantum dolanıklığına kadar bugün aynı ayrışım çalışıyor.",
  ],
  core: [
    {
      heading: "Eleme: tam cevap ve işlemin bedeli",
      body:
        "Gauss eleme, satırlardan katlarını çıkarıp pivotların altını sıfırlar; geri adımda her pivot 1 yapılıp üstü temizlenir ve <strong>indirgenmiş basamak biçimi</strong> (RREF) çıkar. Pivot sayısı <strong>rank</strong>tır. rank A &lt; rank [A | b] ise takım çelişkilidir; ikisi eşit ve n'ye eşitse tek çözüm, n'den küçükse n − rank serbest değişkenli bir aile vardır. Kesirlerle yapılan hesapta yuvarlama yoktur, bu cevaplar yanlış olamaz. Bedeli sayarken her çarpanı bir bölme, pivot satırında pivotun sağındaki (b dahil) her sıfır olmayan girdiyi bir çarpma say: yoğun n×n bir takımın ileri elemesi tam n(n−1)(2n+5)/6 işlem tutar, çünkü k. pivotun altında n − k satır vardır ve her biri n − k + 2 işlem ister. Çıkarmalar da sayılırsa toplam kabaca 2n³/3 olur; iki sayım da n³ mertebesindedir.",
      formula: "n(n−1)(2n+5)/6 = n³/3 + n²/2 − 5n/6",
      formulaNote: "Oran 1 + 3/(2n) − 5/(2n²): n = 3'te 1.222, n = 200'de 1.0074. Boyutu iki katına çıkarmak işi kabaca sekiz katına çıkarır.",
    },
    {
      heading: "Dört temel alt uzay ve hangisinin neye dik olduğu",
      body:
        "m×n bir A matrisi iki uzay arasında çalışır. Girdi tarafında (ℝⁿ) <strong>satır uzayı</strong> C(Aᵀ) ve <strong>çekirdek</strong> N(A), çıktı tarafında (ℝᵐ) <strong>sütun uzayı</strong> C(A) ve <strong>sol çekirdek</strong> N(Aᵀ) yaşar. Boyutlar rank–sıfırlık teoremine uyar: rank + boyut N(A) = n, rank + boyut N(Aᵀ) = m. Diklik tanımın kendisinden gelir: Av = 0, A'nın her satırının v ile iç çarpımının sıfır olması demektir; yani satır uzayı çekirdeğe diktir. Aynı akıl yürütme Aᵀ için sütun uzayını sol çekirdeğe dik yapar. Sütun uzayı ile çekirdek arasında ise böyle bir bağ yoktur: kare matriste ikisi de ℝ³'te çizilebilir ama farklı soruların cevabıdır ve aralarındaki açı herhangi bir değer alabilir. A simetrikse C(A) = C(Aᵀ) olur ve dikliğe kavuşurlar.",
      formula: "N(A) ⟂ C(Aᵀ) · N(Aᵀ) ⟂ C(A)",
      formulaNote: "Sayfanın varsayılan rank 2 matrisinde çekirdek doğrusu sütun uzayı düzlemiyle 90° değil, asin(1/√15) = 14.963° açı yapar.",
    },
    {
      heading: "Karakteristik polinom, katlar ve kusurlu matrisler",
      body:
        "Av = λv'nin sıfırdan farklı çözümü, ancak A − λI tekil olduğunda vardır: det(λI − A) = 0. Bu n. dereceden polinomun λⁿ⁻¹ katsayısı −iz A, sabit terimi (−1)ⁿ det A'dır; bu yüzden özdeğerlerin toplamı iza, çarpımı determinanta eşittir. Bir kökün polinomdaki katı <strong>cebirsel kat</strong>, A − λI'nın çekirdek boyutu <strong>geometrik kat</strong>tır ve hep geometrik ≤ cebirsel olur. Her özdeğerde ikisi eşitse A köşegenleşir: A = PDP⁻¹. Bir özdeğerde geometrik kat eksik kalırsa matris <strong>kusurlu</strong>dur; özvektörler uzayı germeye yetmez ve en iyi yapılabilecek Jordan biçimidir. Kusurun sayısal bir bedeli vardır: ε büyüklüğünde bir bozulma, iki katlı bir Jordan bloğundaki özdeğeri √ε kadar oynatabilir.",
      formula: "det(λI − A) = λⁿ − (iz A)λⁿ⁻¹ + … + (−1)ⁿ det A",
      formulaNote: "Kusurlu hazır matrisin polinomu (λ − 3)(λ − 2)²; λ = 2 için cebirsel kat 2, geometrik kat 1.",
    },
    {
      heading: "QR algoritması: neden çalışır, ne kadar hızlı?",
      body:
        "Bilgisayarlar özdeğerleri polinomun köklerinden değil, QR algoritmasından bulur. Aₖ = QₖRₖ çarpanlamasının ters sırayla çarpılması Aₖ₊₁ = RₖQₖ = QₖᵀAₖQₖ verir: her adım bir benzerlik dönüşümüdür, özdeğerler korunur. Mutlak değerce sıralı özdeğerler birbirinden ayrıksa, kaydırmasız yinelemede alt köşegen girdisi aᵢ₊₁,ᵢ her adımda yaklaşık |λᵢ₊₁/λᵢ| çarpanıyla küçülür: yakınsama <strong>doğrusal</strong>dır ve iki özdeğer birbirine yakınsa yavaştır. |λᵢ₊₁| = |λᵢ| ise (ör. ±1) hiç yakınsamaz. Kaydırmalı sürüm, köşegende beklenen özdeğere yakın bir μ çıkarıp A − μI'yı çarpanlar; ilgili oran sıfıra yaklaştığı için yakınsama doğrusal olmaktan çıkar ve birkaç adımda biter. Simetrik matrisin son matrisi köşegendir; değilse üst üçgen, karmaşık çiftler için 2×2 bloklu kalır.",
      formula: "|a<sub>i+1,i</sub><sup>(k)</sup>| ≈ C·|λ<sub>i+1</sub>/λ<sub>i</sub>|<sup>k</sup>",
      formulaNote: "λ = 2 + √2, 2, 2 − √2 için oranlar 0.5858 ve 0.2929; 10⁻¹² eşiğine kaydırmasız 51, Wilkinson kaydırmasıyla 5 adımda varılır.",
    },
    {
      heading: "En küçük kareler, koşul sayısı ve SVD",
      body:
        "Ax = b çözümsüzse ‖Ax − b‖'yi en küçük yapan x aranır. En iyi Ax, b'nin sütun uzayına dik izdüşümüdür; artık r = b − Ax sütunlara diktir: Aᵀr = 0, yani <strong>normal denklemler</strong> AᵀAx = Aᵀb. Örnek: 01 sekmesindeki çözümsüz 4×2 takım, (0, 1), (1, 2), (2, 2), (3, 4) noktalarına y = c₀ + c₁x doğrusu uydurmaktır. AᵀA = [[4, 6], [6, 14]] ve Aᵀb = (9, 18) verir; 4c₀ + 6c₁ = 9 ile 6c₀ + 14c₁ = 18'den c₀ = c₁ = 0.9, artıklar (0.1, 0.2, −0.7, 0.4) ve ‖r‖² = 0.70 çıkar. 04 sekmesindeki \"01'in dört noktası\" düğmesi aynı sonucu gösterir. Normal denklemler kâğıt üstünde kusursuzdur, ama AᵀA'nın <strong>koşul sayısı</strong> κ(A)²'dir: verideki 10⁻¹⁶'lık yuvarlama hatası κ² kadar büyüyebilir. QR yolu (A = QR, Rx = Qᵀb) AᵀA'yı hiç kurmaz; artık küçükse hata κ ile sınırlı kalır; değiştirilmiş Gram–Schmidt, klasik sürümün kaybettiği dikliği büyük ölçüde korur. En genel araç <strong>tekil değer ayrışımı</strong>dır: A = UΣVᵀ, U ve V dik, Σ köşegeninde σ₁ ≥ σ₂ ≥ … ≥ 0. κ = σ<sub>max</sub>/σ<sub>min</sub> olur ve ilk k terimi tutmak, Eckart–Young teoremine göre rankı en çok k olan matrisler arasında A'ya en yakın olanı verir.",
      formula: "‖A − Aₖ‖<sub>F</sub>² = σ²ₖ₊₁ + … + σ²ᵣ · ‖A − Aₖ‖₂ = σₖ₊₁",
      formulaNote: "Aₖ = σ₁u₁v₁ᵀ + … + σₖuₖvₖᵀ. Saklanacak sayı mn yerine k(m + n + 1): 20×20 desende k = 3 için 400 yerine 123.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar dört sekmedir. <strong>01 · Gauss eleme ve rank</strong> bir takımı kesirlerle adım adım RREF'e indirir; <strong>Gösterilen adım</strong> kaydırıcısı ve <strong>Sonraki adım</strong> düğmesi her satır işlemini gösterir, işlem sayaçları sayımı kuramla karşılaştırır. <strong>02 · Alt uzaylar</strong> dört temel alt uzayın bazlarını, boyutlarını ve aralarındaki açıları ölçer; 3×3 matrislerde döndürülebilir bir 3B görünüm çizer. <strong>03 · Özdeğerler (n×n)</strong> karakteristik polinomu tam kurar ve kayan noktalı QR algoritmasının alt köşegeni nasıl söndürdüğünü bir log grafiğinde izletir. <strong>04 · En küçük kareler ve SVD</strong> içindeki <strong>Deney</strong> menüsüyle eğri uydurma, küçük bir matrisin SVD'si ve 20×20 desenin rank-k yaklaşımı arasında geçilir. 2×2 dönüşümlerin geometrisi (determinant alanı, özdoğrultular, SVD elipsi) komşu Matris Dönüşümleri sayfasındadır.",
    experiments: [
      {
        title: "Eleme ne kadar iş? n³/3 ne zaman doğru?",
        predict:
          "Yoğun bir n×n takımın ileri elemesi kabaca n³/3 çarpma-bölme ister. 3×3'te sayılan işlem bu öncü terime ne kadar yakın olur: tam mı, %20 fazla mı, iki katı mı?",
        do:
          "01 sekmesinde varsayılan \"3×3 · tek çözüm\" takımını oku, sonra <strong>Hazır sistem</strong> menüsünden \"5×5 · yoğun (işlem sayımı)\"nı seç. Her ikisinde <strong>İleri eleme: sayılan çarpma + bölme</strong> ile <strong>Öncü terim n³/3 · ölçülen / öncü</strong> kutularını not et; ardından aşağıdaki boyut taramasında oran sütununu izle.",
        observe:
          "3×3'te 11 işlem, öncü terim 9.000, oran 1.222; geri adım 6 işlem, çözüm x₁ = 2 · x₂ = 3 · x₃ = −1. 5×5'te 50 ve 41.667, oran 1.200. Tarama tablosunda oran n = 10'da 1.1250, n = 200'de 1.0074'e iner.",
        explain:
          "Sayım tam olarak n(n−1)(2n+5)/6'dır; n³/3'ü n²/2 − 5n/6 izler. Oranı 1 + 3/(2n) − 5/(2n²) yapan bu alt terimler küçük n'de belirgindir, n büyüdükçe söner. Öncü terim büyük takımlar için bir yasa, küçükler için yalnız bir ölçektir.",
      },
      {
        title: "Çekirdek neye diktir?",
        predict:
          "Kare bir matriste çekirdek ve sütun uzayı ikisi de ℝ³'te çizilebilir. Çekirdek doğrusu sütun uzayı düzlemine dik midir, yoksa yalnız satır uzayına mı?",
        do:
          "02 sekmesinde varsayılan \"3×3 · rank 2\" matrisini aç. <strong>Satır uzayı ⟂ çekirdek</strong> ile <strong>Çekirdek ile sütun uzayı arasındaki açı (3×3)</strong> kutularını oku; <strong>3B görünümde gösterilen</strong> menüsünden \"Sütun uzayı C(A) ile çekirdek N(A) aynı eksenlerde\"yi seçip tuvali sürükle. Sonra hazır \"3×3 · simetrik rank 2 (çizge Laplace'ı)\" ve \"3×3 · 1…9, rank 2\" matrislerini dene.",
        observe:
          "Satır–çekirdek: en büyük |cos θ| = 0, en küçük açı 90.000°. Çekirdek–sütun uzayı: 14.963°. Bazlar N(A) = (2, −1, 0) ve N(Aᵀ) = (1, 1, −1). Laplace matrisinde açı 90.000° olur ve durum satırı \"A simetrik\" der; 1…9 matrisinde de 90.000° çıkar ama sayfa bunun bir rastlantı olduğunu yazar.",
        explain:
          "Av = 0, her satırın v ile iç çarpımının sıfır olmasıdır; satır uzayının dikliği tanımdan gelir. Sütun uzayının normali sol çekirdektir, (1, 1, −1); çekirdek yönü u ile bu normal n arasındaki açının tümleyeni asin(|u·n|/(‖u‖‖n‖)) = asin(1/√15) = 14.963°. Simetrik matriste satırlar sütunlardır, dikliğe kavuşulur. 1…9 matrisinde N(A) ile N(Aᵀ) aynı doğru olduğundan dik çıkar; genel kural değildir.",
      },
      {
        title: "QR ne kadar hızlı, ne zaman hiç yakınsamaz?",
        predict:
          "Kaydırmasız QR'de alt köşegen her adımda |λᵢ₊₁/λᵢ| kadar küçülüyorsa, λ = 2 + √2, 2, 2 − √2 için iki oran kaç olur? Özdeğerleri ±1 olan bir matriste ne olur?",
        do:
          "03 sekmesinde varsayılan \"3×3 simetrik: 2, 2 ± √2\" ile <strong>QR adım sayısı: kaydırmasız · Wilkinson</strong> kutusunu ve oran tablosunu oku. Sonra \"2×2 takas: λ = ±1, eşit büyüklük\"ü, en son \"3×3 kusurlu: λ = 2 çift, tek özvektör\"ü seç ve <strong>QR yöntemi</strong> menüsünü \"Wilkinson kaydırmalı, küçültmeli\" yap.",
        observe:
          "Simetrik matriste 51 · 5 adım; ölçülen oranlar 0.5858 ve 0.2929, kuramla aynı. Polinom λ³ − 6λ² + 10λ − 4, çarpanlar (λ − 2)(λ² − 4λ + 2). Takas matrisinde \"500 adımda yakınsamadı · 1\". Kusurlu matriste Köşegenleşme \"cebirsel 2 > geometrik 1\" der; Wilkinson λ = 2'yi 1.999999964 verir, |fark| 3.6 × 10⁻⁸.",
        explain:
          "2/(2 + √2) = 0.5858 ve (2 − √2)/2 = 0.2929: doğrusal yakınsama. ±1'de oran 1'dir, kaydırmasız yöntem iki özdeğeri ayıramaz; kaydırma oranı sıfıra çeker. Kusurlu matristeki hata 10⁻¹⁶ değil √ε ≈ 1.5 × 10⁻⁸ ölçeğindedir: iki katlı bir Jordan bloğu ε'luk bozulmayı √ε kadar büyütür.",
      },
      {
        title: "Aynı veri, iki taban, yüzde altılık hata",
        predict:
          "x ∈ [1000, 1001] aralığında bir parabol uydururken sütunlar 1, x, x² neredeyse paraleldir. Normal denklemler, klasik ve değiştirilmiş Gram–Schmidt'ten hangisi en çok yanılır? Sütunları ortalamak neyi değiştirir?",
        do:
          "04 sekmesinde <strong>Deney</strong> = \"En küçük kareler: doğru / parabol\" iken \"x ∈ [1000, 1001] parabol\" düğmesine bas; <strong>Koşul sayısı κ(A)</strong>, <strong>κ(AᵀA) = κ(A)²</strong> ve yöntem tablosundaki göreli hataları oku. Sonra \"Aynısı, ortalanmış\" düğmesine bas.",
        observe:
          "κ = 1.1 × 10¹³, κ² = 1.3 × 10²⁶. Göreli hatalar: Normal denklemler + Cholesky 0.0653, QR: klasik Gram–Schmidt 2.6 × 10⁻⁶, değiştirilmiş Gram–Schmidt 5.1 × 10⁻¹⁵. Ortalanınca κ = 11.6 ve bütün hatalar 10⁻¹⁵ mertebesine iner; c₂ = 4.38 iki tabanda da aynıdır.",
        explain:
          "κ² = 1.3 × 10²⁶, 1/ε ≈ 4.5 × 10¹⁵'i çok aşar: normal denklemler verideki yuvarlamayı sonucu bozacak kadar büyütür. Artık küçük olduğundan QR'nin hatası κ ile sınırlıdır (tablodaki ε·κ satırı yalnız bir üst sınırdır); klasik GS dikliği yitirir, değiştirilmiş GS korur. Ortalamak eğriyi değil tabanı değiştirir; uydurulan değerler aynı kalır, sütunlar dikleşir.",
      },
    ],
  },
  wow: [
    {
      title: "Gauss'un adı 1950'lerde konuldu",
      body:
        "Satır elemesinin bilinen ilk tarifi Dokuz Bölüm'ün \"Dikdörtgen Diziler\" bölümündeki on sekiz problemdir; Newton 1669–1670'te kendi dersini yazdı. Okulda öğretilen algoritmaya \"Gauss eleme\" denmesi ise ancak 1950'lerde, konunun tarihine dair bir karışıklıkla yerleşti. Gauss'un asıl katkısı, en küçük karelerin normal denklemleri için geliştirdiği simetrik eleme gösterimiydi.",
    },
    {
      title: "Bir psikometri dergisindeki matris teoremi",
      body:
        "En iyi rank-k yaklaşımının kesik SVD olduğunu söyleyen teorem, C. Eckart ile G. Young'ın 1936'da <em>Psychometrika</em> dergisinde yayımladığı makaleyle anılır. Oysa Erhard Schmidt aynı problemi 1907'de integral operatörleri için çözmüştü. Sayfadaki 20×20 halka deseninde 3 terim, 400 sayının yerine 123 sayıyla deseni %23.92 göreli hatayla kurar.",
    },
    {
      title: "Koşul sayısının karesi: 10¹³'ten 10²⁶'ya",
      body:
        "x ∈ [1000, 1001] aralığındaki parabol uydurmada A'nın koşul sayısı 1.1 × 10¹³'tür; normal denklemlerin matrisi AᵀA'nınki 1.3 × 10²⁶. Çift duyarlıklı sayılar yalnız yaklaşık 16 anlamlı basamak taşıdığından, aynı veriden normal denklemler %6.5 göreli hatalı katsayı verir; değiştirilmiş Gram–Schmidt ile QR ise 5.1 × 10⁻¹⁵ hatayla doğru cevaba ulaşır.",
    },
  ],
  worked: {
    title: "Üçlü köşegen bir matrisin spektrumu ve QR adım sayısı",
    prompt:
      "A = [[2, 1, 0], [1, 2, 1], [0, 1, 2]] matrisinin karakteristik polinomunu, özdeğerlerini ve özvektörlerini bul; iz ve determinantla denetle. Sonra kaydırmasız QR algoritmasının a₂₁ girdisini 10⁻¹²‖A‖<sub>F</sub> eşiğinin altına kaç adımda indireceğini kestir. (Sayfada 03 sekmesinin varsayılan matrisi.)",
    steps: [
      "λI − A = [[λ − 2, −1, 0], [−1, λ − 2, −1], [0, −1, λ − 2]]. İlk satıra göre açarsan: (λ − 2)[(λ − 2)² − 1] − (λ − 2) = (λ − 2)[(λ − 2)² − 2] = (λ − 2)(λ² − 4λ + 2) = λ³ − 6λ² + 10λ − 4.",
      "Kökler: λ = 2 ve λ = 2 ± √2, yani 3.4142, 2 ve 0.5858. Denetim: toplam 6 = iz A (2 + 2 + 2), çarpım 2·(4 − 2) = 4 = det A. Polinomun λ² katsayısı −6 ve sabit terimi −4 de bunu söyler.",
      "Özvektörler (A − λI)v = 0'dan: λ = 2 + √2 için (1, √2, 1), λ = 2 için (1, 0, −1), λ = 2 − √2 için (1, −√2, 1). İkişer iç çarpımlar 1 + 0 − 1 = 0 ve 1 − 2 + 1 = 0: A simetrik olduğu için özvektörler diktir (spektral teorem), A = QΛQᵀ.",
      "QR hızı: a₂₁ her adımda kabaca |λ₂/λ₁| = 2/3.4142 = 0.5858 kadar küçülür, a₃₂ ise |λ₃/λ₂| = 0.2929 kadar. Yavaş olan a₂₁'dir. ‖A‖<sub>F</sub> = √(3·4 + 4·1) = 4, eşik 4 × 10⁻¹²; a₂₁ = 1'den başlarsa k ≥ ln(4 × 10⁻¹²)/ln 0.5858 = (−26.24)/(−0.535) ≈ 49 adım gerekir.",
      "Sayfada dene: QR adım sayısı kutusu 51 · 5 gösterir; ölçülen oranlar 0.5858 ve 0.2929. İki adımlık fark başlangıçtandır: ilk adımlarda a₂₁ 1, 0.748, 0.559, 0.372 diye, yani 0.5858'den daha yavaş küçülür; oran ancak sonra kuramsal değerine oturur.",
    ],
    result:
      "p(λ) = (λ − 2)(λ² − 4λ + 2); özdeğerler 2 + √2, 2, 2 − √2; özvektörler (1, √2, 1), (1, 0, −1), (1, −√2, 1), birbirine dik. Kaydırmasız QR kabaca 49 adım ister, sayfa 51 sayar; Wilkinson kaydırması 5 adımda biter.",
  },
  misconceptions: [
    {
      myth: "Çekirdek, sütun uzayına diktir.",
      truth:
        "Çekirdek girdi uzayında, sütun uzayı çıktı uzayında yaşar; kare matriste ikisi aynı ℝ³'e çizilebilse de aralarında bir diklik kuralı yoktur. Garanti edilen diklikler satır uzayı ⟂ çekirdek ve sütun uzayı ⟂ sol çekirdektir. 02 sekmesinin varsayılan matrisinde çekirdek ile sütun uzayı 14.963° açı yapar; dikliği yalnız simetrik matrisler (ya da rastlantılar) sağlar.",
    },
    {
      myth: "Özdeğerler bilgisayarda karakteristik polinomun kökleri bulunarak hesaplanır.",
      truth:
        "Polinom katsayıları, köklerin yerini çok hassas biçimde belirler; küçük bir katsayı hatası kökleri kaydırabilir. Bu yüzden pratikte QR gibi benzerlik dönüşümleri kullanılır. Sayfa polinomu yalnız kesirlerle tam hesap yapabildiği için kurar ve QR'nin verdiği değerleri onun tam köklerine göre ölçer.",
    },
    {
      myth: "Tekrarlı özdeğer varsa matris köşegenleşmez.",
      truth:
        "Köşegenleşme için gereken, her özdeğerde geometrik katın cebirsel kata eşit olmasıdır. 03 sekmesindeki \"3×3 tekrarlı ama köşegenleşen\" matrisin polinomu (λ − 5)(λ − 2)²'dir ve köşegenleşir; \"3×3 kusurlu\" matris aynı biçimde (λ − 3)(λ − 2)² polinomuna sahipken λ = 2'de tek bir özvektör bulur. Fark katta değil, A − λI'nın çekirdeğindedir.",
    },
    {
      myth: "Normal denklemler en küçük karelerin en doğru çözümüdür, çünkü formülü kesindir.",
      truth:
        "Tam aritmetikte normal denklemler, QR ve SVD aynı x'i verir. Kayan noktada ise AᵀA kurmak koşul sayısının karesini alır. 04 sekmesindeki kötü koşullu parabolde normal denklemler %6.5 göreli hata yapar, değiştirilmiş Gram–Schmidt 5.1 × 10⁻¹⁵. Formülün kesin olması, hesaplanış yolunun kararlı olduğu anlamına gelmez.",
    },
  ],
  glossary: [
    { term: "Rank", definition: "Matrisin doğrusal bağımsız sütun (eşdeğer olarak satır) sayısı; eleme sonundaki pivot sayısı." },
    { term: "RREF", definition: "İndirgenmiş satır basamak biçimi: her pivot 1, pivot sütunlarının geri kalanı sıfır; her matrisin tek bir RREF'i vardır." },
    { term: "Çekirdek (sıfır uzayı) N(A)", definition: "Av = 0'ı sağlayan bütün v vektörlerinin kümesi; boyutu n − rank'tır." },
    { term: "Sol çekirdek N(Aᵀ)", definition: "Aᵀy = 0'ı sağlayan y vektörleri; sütun uzayına dik olan çıktı uzayı doğrultuları." },
    { term: "Cebirsel ve geometrik kat", definition: "Bir özdeğerin karakteristik polinomda kaç kez kök olduğu ile A − λI çekirdeğinin boyutu; ikincisi birinciyi aşamaz." },
    { term: "Kusurlu matris", definition: "En az bir özdeğerinde geometrik katı cebirsel katından küçük olan, bu yüzden köşegenleşmeyen kare matris." },
    { term: "Koşul sayısı κ(A)", definition: "En büyük tekil değerin en küçüğe oranı; girdideki göreli hatanın çözümde en çok kaç kat büyüyebileceğinin ölçüsü." },
    { term: "Tekil değer ayrışımı (SVD)", definition: "Her matrisin A = UΣVᵀ biçiminde, iki dik matris ve negatif olmayan köşegen bir matrisin çarpımı olarak yazılması." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede matris, determinantı hesaplanan bir sayı tablosudur. Üniversitede ilk <strong>Lineer Cebir</strong> dersi onu bir dönüşüm olarak ele alır ve bu sayfanın dört sekmesini sırayla işler: eleme ve rank, dört temel alt uzay, özdeğerler ve köşegenleştirme, dik izdüşüm ve en küçük kareler; dersin sonunda SVD gelir. <strong>Diferansiyel Denklemler</strong> dersinde x' = Ax sisteminin çözümü e<sup>λt</sup>v kiplerinin toplamıdır ve kararlılık özdeğerlerin işaretinden okunur; kusurlu bir matris orada t·e<sup>λt</sup> terimleri olarak ortaya çıkar.",
      "<strong>Sayısal Analiz</strong> ya da <strong>Sayısal Lineer Cebir</strong> dersi, bu sayfanın ikinci yarısını, yani kayan noktanın tam cevaptan nasıl ve ne kadar saptığını konu edinir: koşul sayısı, geriye doğru kararlılık, pivot seçimi, Householder yansımaları, Hessenberg indirgemesi ve çift kaydırmalı QR, Golub–Kahan SVD'si. Fizikte aynı spektral teorem <strong>Kuantum Mekaniği</strong>'nde gözlenebilirlerin gerçek özdeğerleri olarak, mühendislikte titreşim kipleri olarak, veri biliminde temel bileşenler çözümlemesi olarak karşına çıkar.",
    ],
    topics: ["Vektör uzayları ve baz", "Jordan biçimi", "Spektral teorem", "Koşul sayısı ve kararlılık", "Householder ve QR", "Temel bileşenler çözümlemesi", "Doğrusal diferansiyel denklem sistemleri"],
  },
  quiz: [
    {
      question:
        "Yoğun bir 100×100 takımın elemesi bir bilgisayarda 1 milisaniye sürüyorsa, aynı yöntemle 400×400 bir takım yaklaşık ne kadar sürer?",
      options: ["4 ms", "16 ms", "64 ms", "400 ms"],
      answer: 2,
      explanation:
        "İş n³ ile ölçeklenir (öncü terim n³/3): boyut 4 katına çıkınca iş 4³ = 64 katına çıkar. Alt terimler n = 100'de bile yalnız %1.5 kadar ek getirir; sayfanın taramasında oran n = 100'de 1.0148'dir.",
    },
    {
      question:
        "3×3 bir A'nın rankı 2'dir. Hangisi her zaman doğrudur?",
      options: [
        "Çekirdek doğrusu sütun uzayı düzlemine diktir.",
        "Çekirdek doğrusu, A'nın üç satırına da diktir.",
        "Sol çekirdek ile çekirdek aynı doğrudur.",
        "Sütun uzayı ile satır uzayı aynı düzlemdir.",
      ],
      answer: 1,
      explanation:
        "Av = 0 demek, her satırın v ile iç çarpımının sıfır olması demektir; bu yüzden çekirdek satır uzayına her zaman diktir. Öteki üç ifade ancak özel durumlarda (ör. A simetrikse) doğrudur; sayfanın varsayılan matrisinde çekirdek ile sütun uzayı arasında 14.963° vardır.",
    },
    {
      question:
        "Özdeğerleri 5, 4 ve 1 olan simetrik bir matriste kaydırmasız QR uygulanıyor. Hangi alt köşegen girdisi en yavaş söner ve adım başına küçülme çarpanı nedir?",
      options: ["a₂₁, 0.8", "a₃₂, 0.25", "a₂₁, 0.2", "İkisi de aynı hızda, 0.5"],
      answer: 0,
      explanation:
        "a₂₁ yaklaşık |λ₂/λ₁| = 4/5 = 0.8, a₃₂ ise |λ₃/λ₂| = 1/4 = 0.25 çarpanıyla küçülür. Yakın özdeğerler (5 ile 4) yavaş yakınsama demektir; kaydırma bu yüzden icat edildi. Sayfada \"3×3 simetrik\" matriste aynı kural 0.5858 ve 0.2929 olarak ölçülür.",
    },
  ],
  next: [
    { href: "matris-donusumleri.html", title: "Matris Dönüşümleri: Düzlemi Dört Sayıyla Yeniden Çizmek", why: "Bu sayfanın n×n hesaplarının 2×2 geometrisi: determinant alan çarpanı olarak, özdoğrultular, kuvvet yinelemesi, Markov zinciri ve SVD'nin çizdiği elips." },
    { href: "diferansiyel-denklemler.html", title: "Diferansiyel Denklemler ve Dinamik Sistemler: Yön Alanından Rezonansa", why: "Doğrusal sistemlerin faz portresi özdeğerlerle, iz τ ve determinant Δ ile sınıflandırılır; doğrusal olmayan dengelerin kararlılığı Jacobian'ın özdeğerlerinden okunur." },
    { href: "denklem-denklestirme.html", title: "Kimyasal Denklem Denkleştirme: Atom Sayımı, Matris Yöntemi ve Stokiyometri", why: "Bir tepkimeyi denkleştirmek, atom matrisinin çekirdeğini bulmaktır: rank, çözüm uzayı ve taban vektörleri kimya diliyle." },
    { href: "kuantum-dalga.html", title: "Kuantum Dalga Fonksiyonu: Kuyular, Süperpozisyon ve Tünelleme", why: "Schrödinger denklemi ızgarada üçlü köşegen bir matrisin özdeğer problemine dönüşür; enerjiler Sturm dizisiyle, özfonksiyonlar özvektör olarak bulunur." },
  ],
  sources: [
    { title: "MIT OpenCourseWare · 18.06 Linear Algebra (G. Strang)", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", note: "Gilbert Strang'in lineer cebir dersi: ders videoları, notlar ve problem setleri (İngilizce)." },
    { title: "Wikipedia · Gaussian elimination", url: "https://en.wikipedia.org/wiki/Gaussian_elimination", note: "Tarihçe: Dokuz Bölüm'ün sekizinci bölümü, Newton'un notları, Gauss'un 1810 gösterimi ve adın 1950'lerde yerleşmesi; işlem sayısı (İngilizce)." },
    { title: "Wikipedia · Least squares", url: "https://en.wikipedia.org/wiki/Least_squares", note: "Legendre 1805, Gauss 1809 ve öncelik tartışması; Ceres'in kayboluşu ve yeniden bulunuşu (İngilizce)." },
    { title: "Wikipedia · Eigenvalues and eigenvectors", url: "https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors", note: "Euler, Lagrange, Cauchy ve Hilbert'in 1904'teki \"eigen\"i; von Mises'in kuvvet yöntemi ve Francis ile Kublanovskaya'nın QR algoritması (İngilizce)." },
    { title: "Wikipedia · Singular value decomposition", url: "https://en.wikipedia.org/wiki/Singular_value_decomposition", note: "Tarihçe: Beltrami 1873, Jordan 1874, Sylvester 1889, Schmidt 1907, Eckart ve Young 1936; Kogbetliantz ve Hestenes'in Jacobi yöntemleri, Golub–Kahan 1965, Golub–Reinsch 1970; Eckart–Young teoremi (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
