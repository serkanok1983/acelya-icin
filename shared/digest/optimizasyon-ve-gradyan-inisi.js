window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["optimizasyon-ve-gradyan-inisi"] = {
  slug: "optimizasyon-ve-gradyan-inisi",
  title: "Optimizasyon ve Gradyan İnişi: Vadiden Aşağı Akıllı Adımlar",
  field: "Matematik",
  level: "Lisans",
  minutes: 35,
  tagline:
    "Yokuş aşağı adım atmak en eski arama yöntemidir; ama adım biraz uzarsa iniş patlar, vadi daralırsa sürünür. Dışbükeylik, κ, momentum ve köşedeki optimumun matematiği.",
  hook:
    "Gözün bağlı, sisli bir dağdasın ve en alçak noktayı arıyorsun; tek bildiğin ayağının altındaki eğim. Eğimin tersine bir adım at, tekrarla: gradyan inişi budur. Şaşırtıcı olan şu: sayfadaki vadide adım boyunu 2'den 2,05'e çıkarmak, yerinde sayan bir salınımı patlamaya çevirir; altmış adım sonra f, 10,6 yerine 3688 olur. Peki eşiği kim koyar, ve bir topa momentum vermek yolu neden sekiz ila on kat kısaltır?",
  bigIdea:
    "Gradyan inişinin kaderini yüzeyin eğrilikleri belirler: en dik eğrilik L adımın üst sınırını (η &lt; 2/L), en yatık eğrilik m ise hızı koyar; aralarındaki oran <strong>κ = L/m</strong> ne kadar büyükse iniş o kadar yavaştır ve momentum bu bedeli κ'dan √κ'ya indirir.",
  story: [
    "Yokuş aşağı inme fikri genellikle Augustin-Louis Cauchy'ye atfedilir: en hızlı azalma yönünde adım atmayı ilk kez 1847'de önerdi. Jacques Hadamard 1907'de benzer bir yöntemi bağımsız olarak buldu; doğrusal olmayan problemlerde yakınsamanın ilk ciddi incelemesi ise Haskell Curry'nin 1944 tarihli çalışmasıdır. Yani yöntem, onu her gün milyarlarca kez çalıştıran bilgisayarlardan yüz yıl önce kâğıt üzerinde doğdu.",
    "Kısıtlı problemlerin hikâyesi başka bir yerden, üretim planlamasından başlar. Leonid Kantorovich 1939'da bir kontrplak üretiminin verimini artırmakla görevlendirildiğinde bugün <strong>doğrusal programlama</strong> dediğimiz tekniği geliştirdi. Bu çalışma Batı'da uzun süre fark edilmedi; George Dantzig 1946–47'de ABD Hava Kuvvetleri için planlama problemlerinin genel biçimini kurdu ve 1947'de <strong>simpleks yöntemini</strong> icat etti. Dantzig yöntemi John von Neumann'a anlattığında von Neumann, oyun kuramındaki bir problemle denkliği görüp hemen <strong>dualite</strong> kuramını sezdi. Kantorovich ve Tjalling Koopmans 1975'te Nobel Ekonomi Ödülü'nü paylaştı. 1979'da Leonid Khachiyan doğrusal programın polinom zamanda çözülebildiğini elipsoid yöntemiyle gösterdi, ama yöntem pratikte yavaştı. 1984'te Narendra Karmarkar'ın <strong>iç nokta</strong> yöntemi hem polinom zamanlı hem de gerçekten hızlıydı: köşeden köşeye yürümek yerine uygun bölgenin içinden optimuma süzülüyordu.",
    "Hızlandırma fikri Sovyet matematiğinden geldi. Boris Polyak 1964'te, önceki adımın bir kısmını bir sonrakine taşıyan <strong>ağır top</strong> (momentum) yöntemini yayımladı; Yurii Nesterov 1983'te dışbükey problemlerde hatayı O(1/k²) hızında azaltan hızlandırılmış gradyan yöntemini verdi. Momentum, 1986'da Rumelhart, Hinton ve Williams'ın geri yayılım makalesiyle sinir ağı eğitimine girdi. Diederik Kingma ile Jimmy Ba'nın <strong>Adam</strong> yöntemi Aralık 2014'te arXiv'de çıktı ve 2015'te ICLR'de yayımlandı; bugün derin öğrenmede yaygın biçimde kullanılır.",
    "Algoritmaları sınamak için matematikçiler bilerek zor yüzeyler tasarladı. Howard Rosenbrock 1960'ta muz biçimli, kıvrık ve dar bir vadi önerdi; David Himmelblau 1972 tarihli <em>Applied Nonlinear Programming</em> kitabında dört eşit derin çukurlu bir işlev verdi; Rastrigin 1974'te yumurta kolisi gibi düzenli dizilmiş sayısız yerel minimumu olan bir yüzey tanımladı. Bu tür yüzeylerde yokuş aşağı inmek yetmez; 1983'te Kirkpatrick, Gelatt ve Vecchi, 1953 tarihli Metropolis algoritmasını gezgin satıcı problemine uygulayıp yönteme <strong>benzetilmiş tavlama</strong> adını verdiler: metali yavaş soğutup kusursuz kristale ulaştırmanın sayısal karşılığı.",
  ],
  core: [
    {
      heading: "Dışbükeylik: kiriş testi ve eğrilik",
      body:
        "Bir işlevin grafiğinde iki nokta seç ve aralarına bir ip ger. Eğri her yerde ipin altında kalıyorsa işlev <strong>dışbükeydir</strong>. Bunun cebirsel adı Jensen eşitsizliğidir. İki kez türevlenebilir bir işlev için eşdeğer test daha kısadır: tek değişkende f″ ≥ 0, çok değişkende <strong>Hessian</strong> matrisinin bütün özdeğerleri ≥ 0. Dışbükeyliğin ödülü büyüktür: her yerel minimum küreseldir. Daha alçak bir y noktası olsaydı, x* ile y arasındaki kiriş x*'ın hemen yanında bile daha alçak noktalar verirdi, yani x* yerel minimum olamazdı. Bu yüzden dışbükey bir problemde nereden inersen in aynı en küçük değere varırsın.",
      formula: "f(t·a + (1 − t)·b) ≤ t·f(a) + (1 − t)·f(b),  0 ≤ t ≤ 1",
      formulaNote: "Sayfa bu eşitsizliği 4000 rastgele (a, b, t) üçlüsünde sınar ve sonucu f″'nün taramasıyla karşılaştırır; sayfadaki altı işlevin hepsinde iki test aynı kararı verir.",
    },
    {
      heading: "m, L ve koşul sayısı κ",
      body:
        "Dışbükeylik bir evet-hayır sorusudur, hız ise nicel bir sorudur. Eğrilik her yerde en az m &gt; 0 ise işlev <strong>güçlü dışbükeydir</strong>; en çok L ise <strong>L-düzgündür</strong> (gradyan çok hızlı değişmez). İkinci dereceden f = ½xᵀAx işlevinde m ve L, A'nın en küçük ve en büyük özdeğeridir; eş yükselti eğrileri elipstir ve eksenlerinin oranı √κ'dır. x⁴ dışbükeydir ama minimumda f″ = 0, yani m = 0: orada eğri düzleşir ve iniş sabit oranlı değil, kuvvet yasasıyla sürünerek yaklaşır.",
      formula: "m·I ≼ ∇²f ≼ L·I,   κ = L/m",
      formulaNote: "≼ sırası 'aradaki matris pozitif yarı tanımlı' demektir: her yönde eğrilik m ile L arasında.",
    },
    {
      heading: "Adımın eşiği ve en iyi adım",
      body:
        "Gradyan inişi x<sub>k+1</sub> = x<sub>k</sub> − η∇f(x<sub>k</sub>) kuralıdır. İkinci dereceden işlevde bu kural, A'nın her özyönündeki bileşeni ayrı ayrı (1 − ηλ) ile çarpar. Hata ancak her çarpanın mutlak değeri 1'den küçükse söner; en tehlikeli yön en dik olanıdır, çünkü orada çarpan 1 − ηL'dir. η &gt; 1/L olunca bu çarpan negatife döner ve bileşen her adımda işaret değiştirir: <strong>zikzak</strong> başlar. η = 2/L'de çarpan tam −1'dir; daha büyük her η'da salınım büyür. Hızı ise yavaş yön belirler: en iyi η, iki uç çarpanı eşitleyen 2/(m + L)'dir ve oran (κ − 1)/(κ + 1) olur. Hatayı ε katına indirmek yaklaşık (κ/2)·ln(1/ε) adım ister: κ on kat büyürse adım sayısı da on kat büyür.",
      formula: "η &lt; 2/L,   η* = 2/(m + L),   ρ* = (κ − 1)/(κ + 1)",
      formulaNote: "ρ her adımda hatanın çarpıldığı oran. κ = 10 için ρ* = 9/11 ≈ 0,818; κ = 1000 için 0,998.",
    },
    {
      heading: "Momentum, Nesterov, Adam ve Newton",
      body:
        "Ağır top yöntemi önceki adımın β katını yeni adıma ekler. Dik yönde işaret değiştiren adımlar ardışık olarak birbirini söndürür, yavaş yönde aynı işaretli adımlar birikir. İki terimli bu yinelemenin her özdeğerdeki davranışı z² − (1 + β − ηλ)z + β = 0 karakteristik denkleminin kökleriyle belirlenir. Parametreler uygun seçilince bütün köklerin modülü eşitlenir ve oran (√κ − 1)/(√κ + 1) olur: adım sayısı κ yerine √κ ile büyür. Nesterov gradyanı 'ileriye bakarak' hesaplar; oranı 1 − 1/√κ ağır topunkinden biraz yavaştır, ama √κ ölçeğini yalnız ikinci dereceden işlevlerde değil, bütün güçlü dışbükey ve L-düzgün işlevlerde güvenceye alır. Ağır topun bu en iyi parametreleri ise ikinci dereceden olmayan bazı dışbükey işlevlerde yakınsamayı bile garanti etmez. Adam her koordinatın adımını o koordinattaki gradyanların büyüklüğüne göre ölçekler; doğrusal bir yineleme olmadığı için basit bir oran kuramı yoktur. Newton yöntemi ise eğriliği doğrudan kullanır: ikinci dereceden işlevde tek adımda tam minimuma iner, ama her adımda Hessian'la bir doğrusal sistem çözmek gerekir.",
      formula: "x<sub>k+1</sub> = x<sub>k</sub> − η∇f(x<sub>k</sub>) + β(x<sub>k</sub> − x<sub>k−1</sub>),   ρ = (√κ − 1)/(√κ + 1)",
      formulaNote: "En iyi ağır top parametreleri (L = 1, m = 1/κ): η = 4/(√L + √m)², β = ((√κ − 1)/(√κ + 1))². κ = 100'de oran 0,98'den 0,82'ye iner.",
    },
    {
      heading: "Çok çukurlu yüzeyler ve köşedeki optimum",
      body:
        "Dışbükey olmayan bir yüzeyde gradyan inişi yerel bir kuraldır; hangi çukura düşeceğini başlangıç noktası seçer. Uzay, minimumların <strong>çekim havzalarına</strong> bölünür ve havza sınırları eyer noktalarından ve tepelerden geçer. Benzetilmiş tavlama yokuş yukarı bir adımı da e<sup>−Δf/T</sup> olasılığıyla kabul eder; T sıcakken arama çukurlar arasında gezinir, yavaş soğudukça en derin çukurda kalma olasılığı artar. Doğrusal programlama ise öbür uçtur: uygun bölge dışbükey bir çokgen, amaç doğrusaldır; bu yüzden yerel optimum yoktur ve en büyük değer bir köşededir. İç nokta yöntemi kısıtları bir logaritmik <strong>engelle</strong> yumuşatır; her μ için engelli problemin çözümü x(μ), <strong>merkezî yolu</strong> çizer. Dual değişkenler uᵢ = μ/sᵢ seçilince dualite aralığı tam olarak mμ olur: μ küçüldükçe hem optimuma yaklaşırsın hem de ne kadar uzakta olduğunu kesin bilirsin.",
      formula: "en büyük c·x + μ·Σ ln s<sub>i</sub>,   dualite aralığı = m·μ",
      formulaNote: "sᵢ ≥ 0 i'inci kısıtın aylağı (ne kadar boşluk kaldığı), m kısıt sayısı. Aralık, optimumdan uzaklığın kanıtlı bir üst sınırıdır.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var ve her kartta ölçülen değer kuramın yanında durur. <strong>01 · Dışbükeylik</strong> kiriş testini, ikinci türevi ve 40 rastgele başlangıçtan inişi bir arada gösterir; altında iki değişkenli ½xᵀAx için λ₁, λ₂ ve açı θ kaydırıcıları vardır. <strong>02 · Öğrenme oranı</strong> κ, η, vadinin açısı ve başlangıç noktasıyla çalışır; η = 1/λ_max, η = en iyi, η = 2/λ_max ve η = 2,05/λ_max düğmeleri kritik değerlere atlar, haritaya dokunmak başlangıcı taşır. <strong>03 · Momentum ve yöntemler</strong> gradyan inişi, ağır top, Nesterov, Adam ve Newton'u aynı yüzeyde yarıştırır. <strong>04 · Yerel minimumlar ve DP köprüsü</strong> Himmelblau ve Rastrigin yüzeylerinde havzaları ve tavlamayı, altında da beş kısıtlı bir doğrusal programı ve engel yöntemini gösterir. R tuşu etkin sekmeyi varsayılana döndürür; rastgele süreçler tohumludur, aynı tohum aynı sayıları verir.",
    experiments: [
      {
        title: "İki çukur, iki kader",
        predict: "Varsayılan işlev x⁴ − 2x² + 0,5x'in iki çukuru var. 40 rastgele başlangıçtan inen gradyan inişi hep derin çukuru mu bulur? Kiriş testi dışbükey olmadığını yakalar mı?",
        do: "01 · Dışbükeylik sekmesinde varsayılanla başla ve kartları oku. Sonra İşlev menüsünden önce x², ardından x⁴ seç. En sonda alttaki Birinci özdeğer λ₁ kaydırıcısını −0,5'e çek.",
        observe: "İki çukurda 4000 kirişin 1247'si ihlal ediliyor (31,18 %), en küçük f″ −4,0000 (x = 0,000) ve karar 'Dışbükey değil'. Başlangıçlar ikiye bölünüyor: 24'ü x ≈ −1,057'deki küresel minimuma (f = −1,5148), 16'sı x ≈ 0,930'daki yerel minimuma (f = −0,5167). x²'de ihlal 0 / 4000 ve 40 başlangıcın hepsi tek noktada. x⁴'te de ihlal yok ama m = 0: 20 000 adımdan sonra bile uç nokta 0'dan 2,7 × 10⁻³ uzakta. λ₁ = −0,5 yapınca iki boyutlu yüzey eyere döner: 3000 çiftin 768'i ihlal, ölçülen m −0,50000 ve κ 'tanımsız'.",
        explain: "İki test aynı şeyi iki dilde söyler: f″ &lt; 0 olan yerde eğri aşağı bükülür ve kirişin üstüne çıkar. Dışbükey olmayan işlevde hangi çukura düşüleceğini başlangıç belirler. x⁴'ün yavaşlığı ise dışbükeyliğin yetmediğini gösterir; sabit oranlı yakınsama için m &gt; 0, yani güçlü dışbükeylik gerekir.",
      },
      {
        title: "Eşik nerede, en iyi adım ne kadar?",
        predict: "κ = 10'luk vadide η = 2,05, eşiği yalnız yüzde 2,5 aşıyor. İniş yavaşlar mı, patlar mı? En hızlı iniş için η'yı eşiğe olabildiğince yaklaştırmak mı gerekir?",
        do: "02 · Öğrenme oranı sekmesinde önce varsayılanı (η = 1,500) oku, sonra sırayla η = 2/λ_max, η = 2,05/λ_max, η = en iyi ve η = 1/λ_max düğmelerine bas. Son olarak Koşul sayısı κ kaydırıcısını 2'ye (κ = 100) ve 3'e (κ = 1000) çekip her seferinde η = en iyi düğmesine bas.",
        observe: "η = 1,5'te kuram ve ölçüm 0,85000; 10⁻⁶'ya inmek 80 adım (kestirim 85,0). η = 2'de ölçülen oran 1,00000 ve 'yakınsamaz': f(x₆₀) = 10,6, başlangıçtaki 10,8'den neredeyse farksız. η = 2,05'te oran 1,05000, f(x₆₀) = 3688; ölçülen eşik 2,000000. En iyi düğmesi η'yı 1,818'e koyar: 69 adım (kestirim 68,9); ölçülen en iyi η 1,81790, kuram 1,81818. η = 1/λ_max'ta zikzak '—' ama adım 123'e çıkar. κ = 100'de en iyi η ile 686 adım (kestirim 690,8), κ = 1000'de 6902 adım (6907,8).",
        explain: "Eşiği dik yön koyar: orada çarpan 1 − ηλ_max ve |·| &gt; 1 olunca salınım her adımda büyür. Hızı ise yavaş yön koyar; en iyi η 2/(λ_min + λ_max) eşikten biraz geride durur ve iki yöndeki çarpanları eşitler. η = 1/λ_max dik yönü tek adımda söndürür ama yavaş yönde çok kısa adım atar. Adım sayısı κ ile neredeyse doğru orantılı büyür: (κ/2)·ln 10⁶.",
      },
      {
        title: "Momentum √κ kazandırır",
        predict: "κ = 100'lük vadide, en iyi parametrelerle ağır top gradyan inişinden kaç kat az adım atar: 2 mi, 10 mu, 100 mü? Adam her zaman en hızlısı mı?",
        do: "03 · Momentum ve yöntemler sekmesinde Parametre seçimi 'Kuramsal en iyi' iken tabloyu oku. Koşul sayısı κ kaydırıcısını 1'e (κ = 10) ve 3'e (κ = 1000) çekip tabloyu tekrar oku. Sonra İşlev menüsünden Rosenbrock'u seç.",
        observe: "κ = 100'de toleransa inen adımlar: Newton 1, ağır top 87, Nesterov 158, Adam 685, gradyan inişi 691. Ağır topun ölçülen oranı 0,81837, kuram (√κ − 1)/(√κ + 1) = 0,81818. κ = 10'da 69 (GD), 26 (ağır top), 44 (Nesterov), 241 (Adam). κ = 1000'de 6908, 295, 519, 2707; adım oranı GD/ağır top 23,42, kuramsal 31,63, √κ = 31,62. Rosenbrock'ta (η = 0,001): gradyan inişi 32 400, ağır top 3051, Nesterov 3098, Adam (η = 0,01) 5458, Newton 6; Newton'un ilk adımı uzaklığı hiç azaltmıyor (1,0 × ‖x₀ − x*‖).",
        explain: "Momentumlu yinelemenin karakteristik kökleri κ'ya değil √κ'ya bağlıdır; κ büyüdükçe kuramsal kazanç √κ'ya yaklaşır. Ölçülen kazanç kuramdan küçüktür, çünkü en iyi parametrelerde kökler çakışır ve hata ρᵏ yerine k·ρᵏ gibi azalır. Adam ölçekten bağımsız adım attığı için κ = 10 gibi kolay bir vadide GD'den bile yavaştır. Newton ikinci dereceden işlevde tek adımda tam çözümü verir; Rosenbrock'ta ise yüzey her yerde değiştiği için birkaç adım gerekir.",
      },
      {
        title: "Havzalar, tavlama ve köşe",
        predict: "Rastrigin yüzeyinde 121 yerel minimum var. Rastgele bir başlangıçtan inen gradyan inişi küresel minimumu yüzde kaç bulur? Tavlama bunu kaça çıkarabilir? Doğrusal programın optimumu çokgenin neresindedir?",
        do: "04 · Yerel minimumlar ve DP köprüsü sekmesinde önce Himmelblau tablosunu oku. İşlev menüsünden Rastrigin'i seç; Başlangıç sıcaklığı T₀'ı 30'da bırakıp sonra 0,001'e al, ardından T₀ = 30 ile Adım sayısını 20 000 yap. Aşağıdaki programda varsayılan c = (3, 2) ile köşe tablosunu ve engel kartlarını oku, Engel ağırlığı μ kaydırıcısını −2'ye (μ = 0,01) çek; son olarak 'Kenara paralel amaç (c = (1, 1))' düğmesine bas.",
        observe: "Himmelblau'nun dört havzası başlangıçların 24,5 / 26,5 / 23,5 / 25,5 %'ini, ızgaranın 23,72–25,99 %'ini alıyor; dördü de f = 0. Rastrigin'de küresele varan pay 1,00 ± 0,31 %, havza sayısı 121 · 121. Tavlama T₀ = 30 ve 5000 adımla 62,5 ± 3,4 %, T₀ = 0,001 ile 13,0 ± 2,4 %, 20 000 adımla 99,0 ± 0,7 % başarı veriyor. Programda Z* = 11,000, köşe 3'te (3; 1). μ = 0,1'de dualite aralığı 0,5000 · 0,5000, asıl eksiklik 1,996 μ; μ = 0,01'de aralık 0,05000, eksiklik 2,000 μ. c = (1, 1) ile Z* = 4,000 ve 'çoklu optimum: köşe 3 ve 4 ve aralarındaki kenar', eksiklik 1,015 μ.",
        explain: "Rastrigin'de küresel havza kabaca 1 × 1 birimlik bir kare, kutu 10,24 × 10,24; şans bu yüzden yaklaşık (1/10,24)² ≈ 0,95 %'tir (kenardaki havzalar kırpıldığı için daha küçüktür). Tavlama sıcakken yokuş yukarı adımları kabul ederek havzalar arasında gezinir; T₀ çok küçükse açgözlü aramaya döner. Doğrusal amaç bir kenar boyunca ya hep artar ya hep azalır; optimum köşededir, amaç kenara paralelse bütün kenardır. Dualite aralığı tam 5μ; asıl eksiklik yalnız optimumda bağlayıcı kısıtlardan gelir: köşe 3'te K1 ve K3, yani 2μ; kenara paralel amaçta yalnız K1, yani yaklaşık 1μ.",
      },
    ],
  },
  wow: [
    {
      title: "Patentli bir algoritma",
      body:
        "AT&T, Karmarkar'ın 1984 tarihli iç nokta yöntemi için Nisan 1985'te patent başvurusu yaptı; ABD patenti 4 744 028 Mayıs 1988'de verildi. Bir matematik yönteminin patentlenmesi yazılım patentleri tartışmasını alevlendirdi; bazı sayısal analizciler yöntemin bilinen bir engelli Newton yöntemine denk olduğunu savundu. Patentin süresi çoktan doldu; yöntem bugün herkesin malı.",
    },
    {
      title: "Dantzig'in 70 kişisi",
      body:
        "Dantzig'in özgün örneği 70 kişiyi 70 işe en iyi biçimde atamaktı. Bütün olasılıkları denemek 70! ≈ 1,2 × 10¹⁰⁰ atama demektir, yani bir googoldan (10¹⁰⁰) fazla. Simpleks yöntemi bu olasılıkların neredeyse hiçbirine bakmadan, çok boyutlu bir çokyüzlünün köşeleri arasında yürüyerek optimuma ulaşır.",
    },
    {
      title: "Kontrplaktan Nobel'e",
      body:
        "Kantorovich doğrusal programlamayı 1939'da, bir kontrplak üretiminin verimini artırma göreviyle geliştirdi; Dantzig'in simpleks yönteminden sekiz yıl önce. Çalışma Batı'da uzun süre fark edilmedi. 1975'te Kantorovich ve Koopmans, 'kaynakların en iyi dağıtımı kuramına katkıları' için Nobel Ekonomi Ödülü'nü paylaştı.",
    },
  ],
  worked: {
    title: "κ = 10'luk vadide üç yöntem",
    prompt:
      "f(x) = ½xᵀAx işlevinde A'nın özdeğerleri λ_min = 0,1 ve λ_max = 1 olsun (κ = 10). (a) Gradyan inişinin ıraksamadığı en büyük η nedir? (b) η = 1,5 ile oran ve hatayı 10⁻⁶ katına indirmek için gereken adım sayısı nedir? (c) En iyi η, oran ve adım sayısı nedir? (d) En iyi parametreli ağır top yöntemi kaç adım ister?",
    steps: [
      "Her özyöndeki bileşen her adımda (1 − ηλ) ile çarpılır. Iraksamamak için |1 − η·λ_max| ≤ 1, yani η ≤ 2/λ_max = 2 gerekir; η = 2'de dik bileşen yalnız işaret değiştirir, sönmez. Sayfada 'η = 2/λ_max' ölçülen oranı 1,00000 gösterir.",
      "η = 1,5: çarpanlar |1 − 0,15| = 0,85 ve |1 − 1,5| = 0,50. Oran büyük olandır, ρ = 0,85. Gereken adım k ≈ ln 10⁶ / ln(1/ρ) = 13,816 / 0,1625 ≈ 85,0. Sayfa varsayılanda '80 · 85,0' gösterir. Ölçülen değer küçük, çünkü kestirim bütün hatanın yavaş yönde olduğunu varsayar; oysa x₀ = (−4; 3) için yavaş bileşen başta ‖x₀‖'ın yalnız 0,39'udur ve bu, ln(1/0,39)/0,1625 ≈ 6 adım kazandırır.",
      "En iyi η iki çarpanı eşitler: 1 − 0,1η = −(1 − η) ⇒ η* = 2/(0,1 + 1) = 1,818. Oran ρ* = (κ − 1)/(κ + 1) = 9/11 = 0,81818; adım ≈ 13,816 / ln(11/9) = 13,816 / 0,2007 ≈ 68,9. 'η = en iyi' düğmesi '69 · 68,9' verir.",
      "Ağır top: √κ = 3,162, ρ = (√κ − 1)/(√κ + 1) = 2,162/4,162 = 0,5195; adım ≈ 13,816 / ln(1/0,5195) = 13,816 / 0,6549 ≈ 21,1. 03 · Momentum ve yöntemler sekmesinde κ kaydırıcısını 1'e çekince tablo '26 · 21,1' gösterir; ölçülen değer büyük, çünkü çakışan kökler hataya k çarpanı ekler.",
    ],
    result:
      "η ≤ 2 güvenli sınır; η = 1,5 ile ρ = 0,85 ve yaklaşık 85 adım, en iyi η = 1,818 ile ρ = 0,818 ve yaklaşık 69 adım, ağır topla ρ = 0,52 ve yaklaşık 21 adım (ölçülen 26). Momentumun kazancı κ = 10'da yaklaşık üç kattır (ölçülen 69/26 ≈ 2,7); κ = 1000'de kuramda otuz kata yaklaşır, sayfada ölçülen 23 kattır.",
  },
  misconceptions: [
    {
      myth: "Öğrenme oranı büyüdükçe iniş hızlanır.",
      truth:
        "Yalnız bir yere kadar. η = 2/L'de dik yöndeki bileşen sönmez, daha büyük her η'da patlar: sayfada 2,05 ile altmış adımda f 10,8'den 3688'e çıkar. Üstelik en hızlı η eşiğin kendisi değil, ondan geride duran 2/(m + L)'dir; daha büyük adım dik yönde zikzakı büyütür.",
    },
    {
      myth: "Gradyan inişi her zaman en küçük değeri bulur.",
      truth:
        "Bu yalnız dışbükey işlevlerde güvencelidir. İki çukurlu işlevde 40 başlangıcın 16'sı yerel minimumda kalır; Rastrigin'de rastgele başlangıçların yalnız yaklaşık yüzde biri küresel minimuma varır. Gradyan inişi yalnız bulunduğu yerin eğimini görür.",
    },
    {
      myth: "Momentum adımı büyütmekten ibarettir.",
      truth:
        "Momentum yinelemenin yapısını değiştirir: dik yöndeki salınımları söndürür, yavaş yöndeki adımları biriktirir. Etkisi karakteristik köklerde görülür ve oran κ yerine √κ'ya bağlı hale gelir. Rosenbrock'ta aynı η = 0,001 ile gradyan inişi 32 400, ağır top 3051 adım atar.",
    },
    {
      myth: "Adam her problemde en iyi yöntemdir.",
      truth:
        "Adam gürültülü, ölçekleri karışık problemlerde güçlüdür, ama evrensel kazanan değildir. Sayfadaki κ = 10'luk vadide Adam 241 adım atarken en iyi adımlı gradyan inişi 69, ağır top 26 adımda biter. Yöntemin iyi olduğu yer probleme bağlıdır.",
    },
  ],
  glossary: [
    { term: "Dışbükey işlev", definition: "Grafiği, üzerindeki herhangi iki noktayı birleştiren kirişin hiçbir yerde üstüne çıkmayan işlev; her yerel minimumu küreseldir." },
    { term: "Hessian", definition: "İkinci kısmi türevlerin matrisi; özdeğerleri işlevin farklı yönlerdeki eğriliklerini verir." },
    { term: "Güçlü dışbükeylik (m)", definition: "Eğriliğin her yerde en az m &gt; 0 olması; eğrilik L ile de sınırlıysa uygun adımlı gradyan inişine sabit oranlı (doğrusal) yakınsama sağlar." },
    { term: "Koşul sayısı (κ)", definition: "En büyük eğriliğin en küçüğe oranı, κ = L/m; vadinin ne kadar uzun ve dar olduğunun ölçüsü." },
    { term: "Öğrenme oranı (η)", definition: "Gradyan inişinde her adımda gradyanın çarpıldığı adım boyu; ikinci dereceden işlevde η &lt; 2/L olmalıdır." },
    { term: "Momentum (ağır top)", definition: "Önceki adımın β katını yeni adıma ekleyen yöntem; kötü koşullu vadilerde gereken adım sayısını κ'dan √κ ölçeğine indirir." },
    { term: "Çekim havzası", definition: "Bir yerel minimuma inen bütün başlangıç noktalarının kümesi; sınırları eyer noktalarından ve tepelerden geçer." },
    { term: "Dualite aralığı", definition: "Dual problemin verdiği üst sınır ile bulunan çözümün amaç değeri arasındaki fark; optimumdan uzaklığın kanıtlı sınırıdır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın ilk üç sekmesi, lisans son sınıf ve lisansüstü <strong>Dışbükey Optimizasyon</strong> derslerinin ilk haftalarının özüdür ve dayandığı araçlar lisansın ilk yıllarındandır: <strong>Çok Değişkenli Kalkülüs</strong> gradyanı ve Hessian'ı, <strong>Doğrusal Cebir</strong> özdeğerleri ve spektral yarıçapı, <strong>Sayısal Yöntemler</strong> dersleri de Newton yöntemini ve kayan nokta hatalarını verir (bkz. <a href=sayisal-analiz.html>Sayısal Analiz</a>). Bir sonraki adım kısıtlı problemlerdir: Lagrange çarpanları, Karush–Kuhn–Tucker koşulları ve dualite. İç nokta yöntemlerinin karmaşıklık kuramı da bu çerçevede kurulur.",
      "Makine öğrenmesinde aynı fikirler üç değişiklikle karşına çıkar. Gradyan tam değil, rastgele bir veri parçasından kestirilir (<strong>rastlantısal gradyan inişi</strong>), bu yüzden buradaki kesin oranlar yerine beklenen değerler ve öğrenme oranı takvimleri konuşulur. Boyut milyonlarca ya da milyarlarcadır, Hessian'ı kurmak bile olanaksızdır; momentum ve Adam bu yüzden vardır. Ve kayıp yüzeyi dışbükey değildir; havzalar, eyer noktaları ve düz bölgeler eğitimin gündelik gerçeğidir. <strong>Yöneylem Araştırması</strong> ise doğrusal programlamayı tamsayılı programlamaya, ağ akışlarına ve çizelgelemeye taşır.",
    ],
    topics: ["Dışbükey analiz", "KKT koşulları ve dualite", "İç nokta yöntemleri", "Rastlantısal gradyan inişi", "Ön koşullandırma", "Kısıtlı ve tamsayılı programlama"],
  },
  quiz: [
    {
      question: "Bir vadinin koşul sayısı κ = 100'den κ = 10 000'e çıkıyor. En iyi adımlı gradyan inişinin ve en iyi parametreli ağır topun gereken adım sayısı yaklaşık kaç katına çıkar?",
      options: ["İkisi de 100 katına", "GD 100 katına, ağır top 10 katına", "GD 10 katına, ağır top 100 katına", "İkisi de değişmez"],
      answer: 1,
      explanation: "GD'nin adım sayısı yaklaşık (κ/2)·ln(1/ε), yani κ ile orantılıdır: 100 kat. Ağır topun oranı (√κ − 1)/(√κ + 1) olduğu için adım sayısı √κ ile büyür: √100 = 10 kat. Sayfada κ = 100'den 1000'e geçince GD 691'den 6908'e, ağır top 87'den 295'e çıkar.",
    },
    {
      question: "f(x, y) = 2x² + 8y² işlevine sabit adımlı gradyan inişi uygulanıyor. η hangi değeri aşınca iniş ıraksar?",
      options: ["0,5", "0,25", "0,125", "0,1"],
      answer: 2,
      explanation: "Hessian köşegendir, özdeğerleri 4 ve 16'dır; L = 16. Eşik η = 2/L = 0,125'tir: daha büyük η'da y yönündeki çarpan |1 − 16η| 1'i aşar. 0,1 ise en iyi adımdır, 2/(m + L) = 2/20; oranı (κ − 1)/(κ + 1) = 3/5 olur.",
    },
    {
      question: "İşaret kısıtları dahil sekiz eşitsizlik kısıtlı bir doğrusal programda engel (iç nokta) yöntemi μ = 0,001'de durduruluyor. Bulunan noktanın amaç değeri optimumdan en çok ne kadar uzaktır?",
      options: ["0,001", "0,008", "0,125", "Bilinemez; köşe sayımı gerekir"],
      answer: 1,
      explanation: "Merkezî yol üzerindeki noktada dual değişkenler uᵢ = μ/sᵢ seçilince dualite aralığı tam m·μ = 8 × 0,001 = 0,008 olur. Zayıf dualiteye göre gerçek optimum bu iki değerin arasındadır, yani eksiklik 0,008'i aşamaz. Sayfadaki beş kısıtlı programda aralık 5μ, gerçek eksiklik ise yaklaşık 2μ'dür.",
    },
  ],
  next: [
    { href: "lineer-cebir-ve-ozdegerler.html", title: "Lineer Cebir ve Özdeğerler: Eleme, Alt Uzaylar ve Spektrum", why: "κ, oran ve zikzak, hepsi Hessian'ın özdeğerlerinden okunur; özdeğerleri ve en küçük kareleri buradan derinleştir." },
    { href: "cok-degiskenli-kalkulus.html", title: "Çok Değişkenli Kalkülüs: Gradyan, Lagrange ve Çift İntegral", why: "Gradyanın neden en dik çıkış yönü olduğu ve kısıtlı optimumu bulan Lagrange çarpanları." },
    { href: "yoneylem-arastirmasi.html", title: "Yöneylem Araştırması: Doğrusal Programlama, Simpleks ve Kritik Yol", why: "Buradaki doğrusal program köprüsünün devamı: simpleks adımları, gölge fiyatlar ve kritik yol." },
    { href: "makine-ogrenmesi-derin-ogrenme-llm.html", title: "Makine Öğrenmesi: Gradyan İnişi, Sinir Ağları ve Dil Modelleri", why: "Gradyan inişini gerçek bir kayıp işlevinde, sinir ağı eğitiminde ve dil modellerinde iş başında gör." },
  ],
  sources: [
    { title: "Wikipedia · Gradient descent", url: "https://en.wikipedia.org/wiki/Gradient_descent", note: "Cauchy 1847, Hadamard 1907 ve Curry 1944 tarihçesi; Nesterov'un dışbükey problemlerde O(1/k²) hızı (İngilizce)." },
    { title: "Wikipedia · Stochastic gradient descent", url: "https://en.wikipedia.org/wiki/Stochastic_gradient_descent", note: "Polyak'ın 1964 ağır top yöntemi, momentumun 1986'da geri yayılımla sinir ağlarına girişi ve Adam (İngilizce)." },
    { title: "Wikipedia · Linear programming", url: "https://en.wikipedia.org/wiki/Linear_programming", note: "Kantorovich, Dantzig ve simpleks, von Neumann ve dualite, Khachiyan, Karmarkar ve 70 kişilik atama örneği (İngilizce)." },
    { title: "Wikipedia · Karmarkar's algorithm", url: "https://en.wikipedia.org/wiki/Karmarkar%27s_algorithm", note: "İç nokta yöntemi, ABD patenti 4 744 028 ve çevresindeki tartışma (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
