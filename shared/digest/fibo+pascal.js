window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["fibo+pascal"] = {
  slug: "fibo+pascal",
  title: "Fibonacci ve Pascal: Taşların Saydığı Özdeşlik",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline: "Pascal'ın sığ köşegenlerini domino döşemeleriyle açıkla; renk seçeneklerinden bir polinom, bir üreteç fonksiyonu ve ortalama domino sayısı çıkar.",
  hook: "Altı hücrelik bir şeride iki domino ve iki kare yerleştir. Tam altı farklı sıra vardır. Pascal üçgenindeki 6'nın, Fibonacci dizisindeki 13'ün ve birazdan ekleyeceğin renklerin aynı küçük döşemeyle ilgisi ne?",
  bigIdea: "Pascal'ın sığ köşegen toplamı ile Fibonacci yinelemesi, kare ve domino döşemelerinin aynı kümesini iki ayrı yoldan sayar; renk eklemek bu sayımı bir polinoma dönüştürür.",
  story: [
    "Bir sayı örüntüsü görünce ‘hep böyle gider’ demek çekicidir. Arthur T. Benjamin ile Jennifer J. Quinn, <em>An Alternate Approach to Alternating Sums</em> makalelerinin başında daha keskin bir soru sorar: sonlu bir özdeşliğin iki tarafı hangi nesneleri sayıyor? Aynı makalede kare ve domino döşemeleri, binom katsayılarıyla Fibonacci sayıları arasındaki bağı görünür kılar. Bu sayfanın hedefi de bir üçgenin içinde tanıdık sayıları bulmaktan öte, her sayıya karşılık gelen nesneleri tek tek kurmaktır.",
    "Altı hücrelik bir şeridin ilk taşı kareyse geriye beş, dominoysa dört hücre kalır. Ama aynı döşemeleri ilk taş yerine toplam domino sayısına göre de ayırabilirsin. Birinci ayrım yineleme bağıntısını, ikinci ayrım Pascal katsayılarının toplamını verir. İki yöntem birbirine benzer resimler üretmek zorunda değildir; önemli olan aynı döşemeleri eksiksiz ve tekrarsız saymalarıdır.",
    "Renkler bu bağı bozmaz, zenginleştirir. Her domino iki renkten birini alabiliyorsa, üç dominolu her taş sırası sekiz renkli döşemeye dönüşür. Böylece bir tek sayı yerine domino sayısını da saklayan bir polinom elde ederiz. Aynı polinomun türevi, eş olasılıklı bir seçimde ortalama kaç domino göreceğimizi hesaplar. Sayma, cebir ve olasılık burada aynı nesnenin farklı sorularıdır."
  ],
  core: [
    {
      heading: "Satırın toplamı başka, sığ köşegen başka",
      body: "Pascal üçgeninin en üst satırı r = 0'dır; her satırdaki sütun j = 0'dan başlar. C(r,j), r yerden j tanesini seçmenin sayısıdır. Aynı satırı toplamak 2ʳ verir. Buradaki <strong>sığ köşegen</strong> ise r + j = n koşulunu izler: j = k seçince r = n − k ve hücre C(n−k,k) olur. n = 8 için hücreler (8;0), (7;1), (6;2), (5;3), (4;4); değerler 1,7,15,10,1'dir. Sonuç 34 = F₉; n'inci satırın toplamı olan 256 değildir.",
      formula: "∑<sub>k=0</sub><sup>⌊n/2⌋</sup> C(n−k,k) = Fₙ₊₁",
      formulaNote: "F₀ = 0, F₁ = 1. Üst sınır, k ≤ n−k koşulundan gelir. n ve k indis/sayım değişkenleridir; tüm sayılar boyutsuzdur."
    },
    {
      heading: "Neden C(n,k) değil C(n−k,k)?",
      body: "n hücrelik bir şeritte k domino 2k hücre kaplar; geriye n−2k kare kalır. Ama sıraladığın nesneler hücreler değil taşlardır: k + (n−2k) = n−k taş. Bu taş yuvalarının k tanesini domino seçmek yeterlidir. Verilen K/D sırasından döşeme, döşemeden de K/D sırası tek biçimde geri okunur. Bu <strong>bire bir eşleme</strong> sayesinde C(n−k,k) tam olarak k dominolu grubu sayar. n = 6, k = 2 için dört taşın ikisi domino: C(4,2) = 6. C(6,2) = 15 ise iki hücre seçer; geçerli döşemeleri saymaz.",
      formula: "Taş sayısı = n−k; k dominolu döşeme sayısı = C(n−k,k)",
      formulaNote: "K bir hücrelik kare, D iki hücrelik domino. Taşlar şeridin yönünde yerleşir; örtüşme, boşluk ve ek döndürme seçeneği yoktur."
    },
    {
      heading: "Boş şerit neden bir kez sayılır?",
      body: "<strong>Tₙ</strong>, n hücrelik şeridin bütün renksiz döşemelerini saysın. İlk taş kareyse Tₙ₋₁, domino ise Tₙ₋₂ seçenek vardır; bu iki sınıf ayrık ve bütün döşemeleri kapsar. Başlangıçta T₁ = 1. T₀ da 1'dir: hiçbir taş koymamak tek bir boş diziliştir. Böylece T₂ = T₁ + T₀ = 2, yani KK ve D olur. Başlangıç değerlerini Fibonacci'nin F₀ = 0, F₁ = 1 tanımıyla karşılaştırınca bir indislik kayma görünür: Tₙ = Fₙ₊₁. Boş şeridi sıfır kez saymak bu yinelemeyi bozar.",
      formula: "T₀ = T₁ = 1; Tₙ = Tₙ₋₁ + Tₙ₋₂ (n ≥ 2); Tₙ = Fₙ₊₁",
      formulaNote: "n = 0'da döşeme sayısı 1, taş sayısı 0'dır. İki sayı farklı soruların yanıtıdır."
    },
    {
      heading: "Renkler sayımı bir polinoma dönüştürür",
      body: "Kare tek renkli kalsın, her domino birbirinden bağımsız olarak t renkten birini alsın. Sabit bir taş sırasında k domino varsa tᵏ renk seçimi vardır. Bu yüzden k grubunun katkısı C(n−k,k)tᵏ olur. t = 1 renksiz sayımı geri getirir; t = 0 domino kullanımını yasaklar ve yalnız karelerden oluşan tek döşemeyi bırakır. k = 0'da renk seçilecek nesne yoktur: boş çarpım 1'dir. Burada t bir olasılık değildir; arayüzde tam sayı renk adedidir. Zₙ(t)'yi bir polinom olarak tutunca her katsayı hangi k grubundan geldiğini saklar.",
      formula: "Zₙ(t) = ∑ₖ C(n−k,k)tᵏ; Zₙ(t) = Zₙ₋₁(t) + tZₙ₋₂(t)",
      formulaNote: "Z₀(t) = Z₁(t) = 1. Yinelemede ilk domino için t renk seçeneği vardır. Toplam ve bağımsız yineleme sayfada ayrı hesaplanır."
    },
    {
      heading: "Bir türev, ortalama domino sayısını verir",
      body: "Bütün renkli döşemeler eş olasılıklı seçilsin. K, bu seçimdeki domino sayısı olsun. k grubunun olasılığı C(n−k,k)tᵏ/Zₙ(t)'dir. Polinomu türevleyip t ile çarpmak her terimin başına k getirir: tZ′ₙ(t) = ∑kC(n−k,k)tᵏ. Toplam sayıya böldüğünde <strong>beklenen değer</strong> çıkar. Sayfanın ortalama kartı bu aynı hesabı doğrudan tam sayı ağırlıklarından yapar; rastgele örnek üretmez. Türev, polinom değişkeni t'ye göre alınır, sonra seçilen tam sayı renk adedinde değerlendirilir.",
      formula: "E[K] = tZ′ₙ(t)/Zₙ(t) = [∑ₖ kC(n−k,k)tᵏ]/[∑ₖ C(n−k,k)tᵏ]",
      formulaNote: "Eş olasılıklılık renkli döşemeler içindir; farklı k grupları eş olasılıklı değildir. Ortalama domino adedidir, kesirli çıkabilir. t = 0'da K = 0 kesin olur."
    }
  ],
  lab: {
    intro: "<strong>Sığ köşegen</strong> sekmesi n = 0–40 aralığında Pascal hücrelerini gösterir. <strong>Döşemeleri say</strong> n ≤ 12 için K/D dizilerini gerçekten üretir; sıra kaydırıcısıyla hepsine ulaşılır. <strong>Renkli dominolar</strong> n ≤ 100 ve t = 0–5 için kesin sayımları toplar. Üç sekmenin ayarları bağımsızdır. Sayımlar BigInt tam sayıdır; grafikteki yüzde ve ortalama ondalıkları yaklaşık gösterilir. Her deney kendi sıfırlama düğmesiyle başlar.",
    experiments: [
      {
        title: "34'ü üçgenin hangi hücreleri yapar?",
        predict: "Toplam indisi 8 olan sığ köşegen 2⁸ = 256 mı, başka bir sayı mı verir?",
        do: "<strong>Sığ köşegen</strong>'de <strong>Köşegeni sıfırla</strong>: n = 8, k = 2. <strong>Seçili terim k</strong>'yi 0'dan 4'e götür; gerçek Pascal hücresini ve tabloyu karşılaştır. Sonra <strong>Toplam indisi n</strong>'yi 6, ardından 0 yap.",
        observe: "n = 8'de 1 + 7 + 15 + 10 + 1 = 34 = F₉. k = 2'nin hücresi (6;2), değeri 15'tir. n = 6'da 1 + 5 + 6 + 1 = 13 = F₇. n = 0'da yalnız C(0,0) = 1 vardır ve F₁ ile fark 0'dır.",
        explain: "Satır numarası n'de sabit kalmaz; k arttıkça n−k azalır. Bu yüzden satır toplamı 2ⁿ uygulanamaz. Her n'de sonuç Fₙ₊₁ olur; indis kayması boş şeridin tek döşemesinden gelir."
      },
      {
        title: "Bir binom katsayısının altı nesnesi",
        predict: "Altı hücreye iki domino koymanın sayısı C(6,2) = 15 mi, C(4,2) = 6 mı?",
        do: "<strong>Döşemeleri say</strong>'da <strong>Döşemeleri sıfırla</strong>: <strong>Şerit uzunluğu n</strong> = 6, <strong>Domino sayısı k</strong> = 2. <strong>Diziliş sırası (1'den başlar)</strong>'nı 1–6 arasında gezdir. Ardından k'yi 0,1,2,3 yaparak bütün grupları karşılaştır.",
        observe: "Sırayla KKDD, KDKD, KDDK, DKKD, DKDK, DDKK çıkar. Her biri 4 taşla 6 hücreyi kaplar. Seçili grup 6/6, tüm k'lar 13/13 gösterir. k = 0,1,2,3 için grup büyüklükleri 1,5,6,1'dir; toplamları 13 olur.",
        explain: "İki domino dört hücre, iki kare iki hücre kaplar. Seçtiğin yerler bu dört taşın sırasıdır. Gruplar domino sayılarına göre ayrıldığı için birbirleriyle örtüşmez; hepsini toplamak ilk taşa göre bulunan Fibonacci sayımıyla aynı sonucu verir."
      },
      {
        title: "Sıfır uzunluk ve çizimin sınırı",
        predict: "Şerit boşsa kaç taş gerekir, kaç farklı döşeme vardır? n = 12'de dört domino grubunu ekrandaki birkaç resimle sınırlı mı sanmalıyız?",
        do: "<strong>Döşemeleri say</strong>'da önce <strong>Döşemeleri sıfırla</strong>'ya bas; <strong>Şerit uzunluğu n</strong>'yi 0 yap. Sonra n = 12, <strong>Domino sayısı k</strong> = 4 seç. Sıra kaydırıcısını en sona getir; <strong>Sonraki diziliş</strong> düğmesinin durumunu izle.",
        observe: "Boş durumda kod ∅, taş/hücre 0/0; seçili ve toplam döşeme sayıları 1'dir. n = 12, k = 4 için 70 = C(8,4) diziliş, bütün k'larda 233 = F₁₃ vardır. 70. sıra DDDDKKKK'dir; 8 taş, 12 hücre. Son sırada ileri düğmesi kapanır.",
        explain: "Boş diziliş de bir nesnedir. Galeri bir anda en çok sekiz diziliş gösterir, ancak kaydırıcı üretilmiş 70 dizilişin tamamına gider. n ≤ 12 üretim sınırı, matematiksel özdeşliğin geçerlilik sınırı değildir."
      },
      {
        title: "İki renk sayımı iki katına mı çıkarır?",
        predict: "Sekiz hücrede domino renk sayısı 1'den 2'ye çıkarsa toplam 34'ten 68'e mi çıkar?",
        do: "<strong>Renkli dominolar</strong>'da <strong>Renkleri sıfırla</strong>: n = 8, t = 2, k = 3. Katkı tablosunu ve ortalamayı oku. <strong>Tek renk: Fibonacci</strong>'ye bas. Ardından <strong>Domino renk sayısı t</strong>'yi 0 yap; seçili k = 3 kalırken sonucu incele.",
        observe: "t = 2'de katkılar 1,14,60,80,16; toplam ve yineleme 171/171, seçili k = 3 katkısı 80, ortalama 2,561404. Tek renkte toplam 34, ortalama 2,088235 olur. t = 0'da toplam 1, k = 3 katkısı 0, ortalama 0'dır; yalnız k = 0 katkısı 1 kalır.",
        explain: "k dominolu her sıra 2ᵏ renkli sıraya dönüşür; farklı gruplar aynı çarpanla büyümez. Ortalama, bütün renkli döşemelerin eş olasılıklı seçildiği modelin sonucudur. Çubuklar rastgele bir deneyin ölçülmüş frekansları değildir."
      }
    ]
  },
  wow: [
    {
      title: "İki renk, ikinin kuvvetlerine kapı açar",
      body: "t = 2 için yineleme Zₙ = Zₙ₋₁ + 2Zₙ₋₂ olur. Karakteristik kökleri 2 ve −1; Z₀ = Z₁ = 1 koşulları Zₙ(2) = [2ⁿ⁺¹ + (−1)ⁿ]/3 verir. n = 8'de (512 + 1)/3 = 171. n = 100'de aynı ifade 845100400152152934331135470251 renkli döşeme sayar; bu sayıların her birini çizmek gerekmez."
    },
    {
      title: "En çok domino, en büyük grup demek değil",
      body: "n = 8, t = 2'de dört domino şeridi tek renksiz sırayla doldurur: DDDD. Her biri iki renkten seçildiği için 2⁴ = 16 renkli seçenek vardır. Üç domino ise C(5,3) = 10 farklı taş sırasına, her sıra 2³ renklendirmeye sahiptir: toplam 80. Daha az dominolu grup burada beş kat büyüktür; renk seçimi kadar yerleşim sayısı da önemlidir."
    },
    {
      title: "Renkleri silmek eş olasılıklılığı korumaz",
      body: "n = 6, t = 2 için 43 renkli döşeme vardır. Bunlardan biri eş olasılıklı seçilip renkleri silinirse KKKKKK düzeni 1/43 olasılıkla görülür. Belirli bir iki dominolu düzen, örneğin KKDD, dört farklı renklendirmeden gelebilir: olasılığı 4/43'tür. Renkli döşemelerin eşit olasılığı, renksiz K/D sıralarını eşit olasılıklı yapmaz."
    }
  ],
  worked: {
    title: "171 döşemeden ortalama 2,561404 domino",
    prompt: "Sekiz hücrelik şeritte kareler tek renkli, her domino iki renkten biri olsun. Bütün renkli döşemeler eş olasılıklı seçildiğinde tam üç domino gelme olasılığını ve beklenen domino sayısını bul. Renkli dominolar sekmesinin varsayılanını kullan. n,t,k sayımlardır; metre veya saniye birimi taşımazlar.",
    steps: [
      "Sabit k = 0,1,2,3,4 için binom katsayıları 1,7,15,10,1. Bu yüzden Z₈(t) = 1 + 7t + 15t² + 10t³ + t⁴.",
      "t = 2 koy: katkılar 1,14,60,80,16. Toplam Z₈(2) = 171; bağımsız yineleme de 1,1,3,5,11,21,43,85,171 dizisini verir.",
      "Tam üç domino için 80 renkli döşeme var. P(K = 3) = 80/171 ≈ 0,467836, yani yaklaşık %46,7836. Bu grubun olasılığı 1/5 değildir; beş k grubu eşit büyüklükte değildir.",
      "Z′₈(t) = 7 + 30t + 30t² + 4t³; Z′₈(2) = 219. Dolayısıyla E[K] = 2 × 219/171 = 438/171 = 146/57 ≈ 2,561404 domino/döşeme.",
      "Doğrudan kontrol: ağırlıklı toplam 0×1 + 1×14 + 2×60 + 3×80 + 4×16 = 438. Sayfanın durum satırında 438/171 kesri, kartta 2,561404 görülür. Tek bir döşemede kesirli domino bulunmaz; kesir, bu eş olasılıklı kümenin ortalamasıdır."
    ],
    result: "P(K = 3) = 80/171 ≈ %46,7836; E[K] = 146/57 ≈ 2,561404 domino/döşeme. Tam sayılar ve kesirler kesin, ondalık gösterimler yuvarlanmıştır."
  },
  misconceptions: [
    { myth: "Pascal üçgeninin n'inci satırını toplarsam Fibonacci sayısını bulurum.", truth: "n'inci satırın toplamı 2ⁿ'dir. Fibonacci bağlantısı r+j=n olan sığ köşegende, C(n−k,k) terimleriyle kurulur ve Fₙ₊₁ verir." },
    { myth: "k domino için n hücreden k tanesini seçmek yeterlidir.", truth: "Bir domino iki hücre kaplar; taş sırasını hücrelerden bağımsız seçemezsin. k domino ve n−2k kare toplam n−k taş eder; doğru seçim C(n−k,k)'dir." },
    { myth: "Boş şeritte hiç döşeme yoktur, o yüzden sayı 0'dır.", truth: "Boş şeridin tek döşemesi boş dizidir. Taş sayısı 0, döşeme sayısı 1'dir. Bu başlangıç, T₂ = T₁ + T₀ = 2 ile KK ve D seçeneklerini doğru sayar." },
    { myth: "t renk olasılığıdır; renk sayısını iki katına çıkarmak her grubu iki kat büyütür.", truth: "t renk adedidir. k dominolu bir sıra tᵏ biçimde renklenir; t'nin iki katına çıkması bu grubu 2ᵏ kat büyütür. Grafik ancak bütün renkli döşemeler eş olasılıklı seçilirse bir k olasılık dağılımı olarak yorumlanır." }
  ],
  glossary: [
    { term: "Binom katsayısı C(r,j)", definition: "r farklı yerden j tanesini seçmenin sayısı; 0 ≤ j ≤ r için r!/[j!(r−j)!]." },
    { term: "Sığ köşegen", definition: "Bu sayfada Pascal hücrelerinin satır ve sütun indisleri toplamı r+j=n sabit kalan dizisi." },
    { term: "Bire bir eşleme", definition: "İki kümenin elemanlarını, her elemanın tam bir karşılığı olacak biçimde eşleştirme; sonlu kümelerin sayılarının eşitliğini kanıtlar." },
    { term: "Boş döşeme", definition: "Sıfır hücrelik şeridi hiçbir taş kullanmadan dolduran tek boş diziliş." },
    { term: "Sayma polinomu Zₙ(t)", definition: "tᵏ katsayısında k dominolu renksiz döşemelerin sayısını saklayan polinom." },
    { term: "Biçimsel kuvvet serisi", definition: "Değişkenine sayı vermeden katsayıları üzerinde cebir yapılan seri; burada xⁿ katsayısı n uzunluklu şeridin sayımıdır." },
    { term: "Üreteç fonksiyonu", definition: "Bir dizinin terimlerini kuvvet serisi katsayıları olarak paketleyen ifade; burada G(x,t)=∑ₙ≥₀Zₙ(t)xⁿ." },
    { term: "Beklenen değer", definition: "Bir niceliğin olasılıklarla ağırlıklandırılmış ortalaması; burada eş olasılıklı renkli döşemelerde domino adedi." }
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "<strong>Ayrık Matematik</strong>'te bir sonraki araç <strong>üreteç fonksiyonu</strong>dur: G(x,t) = ∑ₙ≥₀Zₙ(t)xⁿ. Boş döşeme 1 katkısını, ilk kare xG'yi, t renkten bir ilk domino tx²G'yi verir. Böylece G = 1 + xG + tx²G; çözünce G = 1/(1−x−tx²). Burada x, uzunluğu işaretleyen biçimsel değişkendir; ona bir gerçek sayı değeri verilmiyor, dolayısıyla bir yakınsaklık iddiası yapılmıyor. t = 1 için G = 1/(1−x−x²); Fₙ dizisinin üreteci x/(1−x−x²) olduğundan pay farkı, Tₙ = Fₙ₊₁ indis kaymasının cebirsel izidir.",
      "<strong>Olasılık</strong>'ta aynı sayma polinomunu normalize ederek P(K=k) dağılımını kurarsın. Ortalama için tZ′/Z, ikinci faktöriyel moment için t²Z″/Z = E[K(K−1)] kullanılır. K² = K(K−1) + K olduğundan varyans t²Z″/Z + tZ′/Z − (tZ′/Z)²'dir; n = 8, t = 2 için 2054/3249 ≈ 0,632195 çıkar. Sayfa varyansı göstermez; bu, aynı polinomdan elde edilen ek bir hesaptır. Türevler polinom üzerinden alınır ve seçilen t'de değerlendirilir. Eş olasılıklı örnek uzayının hangisi olduğunu açık söylemek şarttır: renkli döşemeyi eşit olasılıkla seçmek, renksiz taş sıralarını veya k gruplarını eşit olasılıkla seçmekle aynı deney değildir."
    ],
    topics: ["Bire bir eşleme ve iki yoldan sayma", "Yinelemeler ve başlangıç koşulları", "Biçimsel üreteç fonksiyonları", "Sayma polinomları", "Beklenen değer ve varyans"]
  },
  quiz: [
    { question: "n = 7 hücrelik şeritte tam k = 2 domino bulunan kaç renksiz döşeme vardır?", options: ["C(7,2) = 21", "C(5,2) = 10", "C(3,2) = 3", "F₇ = 13"], answer: 1, explanation: "İki domino dört hücre, kalan üç kare üç hücre kaplar. Toplam beş taşın ikisini domino seçersin: C(5,2) = 10." },
    { question: "n = 0 ve domino renk sayısı t = 5 iken Z₀(5) kaçtır?", options: ["0; şerit yoktur.", "5; beş renk vardır.", "1; boş diziliş tektir.", "Tanımsız; 0'a bölünür."], answer: 2, explanation: "Renk verilecek domino yoktur. Boş döşeme tek nesnedir; k = 0 katkısı boş çarpım olarak 1 kalır." },
    { question: "n = 8,t = 2 için bütün renkli döşemeler eş olasılıklı. Tam üç domino olasılığı hangisidir?", options: ["1/5; beş farklı k değeri vardır.", "10/34; yalnız renksiz sayılar gerekir.", "2/8; renkleri hücre sayısına böleriz.", "80/171; bu grubun renkli sayısını toplam renkli sayıya böleriz."], answer: 3, explanation: "k = 3 grubunda C(5,3)×2³ = 80 renkli döşeme; tüm gruplarda 171 vardır. Eşit olasılıklı olan gruplar değil, bu 171 ayrı renkli döşemedir." }
  ],
  next: [
    { href: "fibo.html", title: "Fibonacci: Kareler, Alan ve Eğrilik", why: "Aynı diziyi kare kenarlarına dönüştür; bir bölgenin alanını iki yoldan hesaplamakla burada nesneleri iki yoldan saymayı karşılaştır." },
    { href: "pascal-ucgeni.html", title: "Pascal Üçgeni Laboratuvarı", why: "Binom katsayılarının kombinasyon, binom açılımı ve modüler desenlerle ilişkisini genişlet." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme: Sınıflar, NP ve Yaklaşık Çözümler", why: "Bütün döşemeleri üretmenin üstel işiyle sayıyı yinelemeyle bulmanın doğrusal işini ayır; farkı Büyüme sınıfları sekmesinde 2ⁿ ile n'yi yarıştırarak gör." }
  ],
  sources: [
    { title: "Benjamin ve Quinn · An Alternate Approach to Alternating Sums", url: "https://math.hmc.edu/benjamin/wp-content/uploads/sites/5/2019/06/An-Alternate-Approach-to-Alternating-Sums.pdf", note: "Yazarların özgün makalesi; sığ köşegen toplamı ve k dominolu şeritlerin C(n−k,k) ile sayımı. Makaledeki fₙ, bu defterin Fₙ₊₁ sayısına karşılık gelir." },
    { title: "Harvey Mudd · Domino and Square Tilings", url: "https://math.hmc.edu/funfacts/domino-and-square-tilings/", note: "Francis Su ve çalışma arkadaşlarının üniversite kaynağı; ilk kare veya dominoya göre ayırarak Fibonacci yinelemesini kurma." },
    { title: "MIT 6.042J · Generating Functions", url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2005/840900ac0e6c7e44abeed795b655ab47_ln11.pdf", note: "2005 ders notları: biçimsel seriler ve Fibonacci üreteç fonksiyonu. Renk değişkenli ifade, bu sayfanın açık sayma kuralından türetilir." }
  ],
  revision: "Kasım 2026"
};
