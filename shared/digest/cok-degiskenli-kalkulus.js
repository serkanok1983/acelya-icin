window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["cok-degiskenli-kalkulus"] = {
  slug: "cok-degiskenli-kalkulus",
  title: "Çok Değişkenli Kalkülüs: Dağda Pusula, Kısıtta Fiyat",
  field: "Matematik",
  level: "Lisans",
  minutes: 45,
  tagline:
    "Sisli bir dağda en dik yokuşu bulmak, bir çember üzerinde en yüksek noktayı aramak, bir çan eğrisinin altından π'yi çıkarmak: hepsi aynı fikir, birden çok girdiyi aynı anda değiştirmek.",
  hook:
    "Sisli bir dağdasın ve yalnızca ayağının altındaki eğimi hissedebiliyorsun. Bütün yönleri tek tek denemeden en dik yokuşu bulabilir misin? Cevap evet: iki sayı, doğu yönündeki ve kuzey yönündeki eğim, sana bütün yönlerin eğimini birden söyler.",
  bigIdea:
    "Türevlenebilir bir fonksiyon her noktanın yakınında bir düzleme benzer; o düzlemin eğimini taşıyan <strong>gradyan ∇f</strong> en dik yokuşu gösterir, seviye eğrilerine diktir, kısıtlı en iyileri Lagrange koşulu ∇f = λ∇g ile ele verir. Çift integral ise aynı yerel düşünceyi bölgenin tamamına yayıp küçük hücreleri toplar.",
  story: [
    "Kısmi türevin bugün kullandığımız eğri d harfi, ∂, uzun bir yoldan geldi. Nicolas de Condorcet 1770'te bu işareti kısmi diferansiyeller için kullandı; Adrien-Marie Legendre 1786'da kısmi türev anlamında benimsedi, sonra kendisi bıraktı. İşareti 1841'de yeniden kullanıp kalıcı kılan Carl Gustav Jacob Jacobi oldu. Gradyanın simgesi ∇'nın hikâyesi daha da renkli: William Rowan Hamilton işlemciyi 1830'larda tanıttı; adını ise 1870'te William Robertson Smith, Peter Guthrie Tait'e yazdığı bir mektupta önerdi. <em>Nabla</em>, simgenin biçimine benzeyen, Fenikelilere atfedilen bir arp türünün Yunanca adıdır. Tait ve Maxwell bu adı mektuplarında çoğunlukla şakayla karışık kullandılar.",
    "Kısıtlı en iyileme problemi, yani \"bu koşulu bozmadan ne kadar yükseğe çıkabilirim?\" sorusu, Joseph-Louis Lagrange'ın adını taşır. Turin'de 1736'da doğan Lagrange, 1788'de yayımlanan <em>Mécanique analytique</em>'te bugün Lagrange çarpanları dediğimiz yöntemi mekaniğin kısıtlarıyla birlikte sundu (yöntem orada ilk kez yayımlanmıyordu). Fonksiyonların en büyük ve en küçük değerleri için genel biçimini ise 1804'te yayımlanan <em>Leçons sur le calcul des fonctions</em>'da ortaya koydu. <em>Mécanique analytique</em>'in girişinde, kitapta tek bir şekil bulunmayacağını yazar: geometri bile cebire dönüşmüştü. Bugün iktisatçılar aynı çarpana <strong>gölge fiyat</strong> der: kısıt düzeyini bir birim kaydırmanın en iyi değeri ne kadar değiştirdiğini ölçer.",
    "Çift integralin en ünlü hilesi bir çan eğrisi üzerinde oynandı. Abraham de Moivre bu tür integralle 1733'te karşılaştı; Gauss kesin değeri 1809'da yayımladı ve buluşu Laplace'a atfetti. Bugün derslerde anlatılan kısa kanıt (tek boyutlu integrali kendisiyle çarpıp düzlemde kutupsal koordinatlara geçmek) Poisson'a dayandırılır. İki katlı integralin sırasının değiştirilebileceği ise sanıldığı kadar bedava değildir: geniş koşullarda geçerli olduğunu Guido Fubini 1907'de kanıtladı, Leonida Tonelli 1909'da negatif olmayan fonksiyonlar için bir biçimini verdi.",
  ],
  core: [
    {
      heading: "Kısmi türev: bir girdiyi oynat, ötekini dondur",
      body:
        "f(x, y) düzlemin her noktasına bir sayı atar; bunu bir yükseklik haritası gibi düşün. <strong>Kısmi türev</strong> ∂f/∂x, y'yi sabit tutup yalnız x'i değiştirdiğinde eğimdir; yani yüzeyi doğu–batı doğrultusunda kesip tek değişkenli bir eğrinin türevini almaktır. Sayfa bunu iki yoldan bulur: <em>Formül</em> sütunu ifadeyi sembolik olarak türetir, <em>Ölçülen</em> sütunu merkezî fark alır. Merkezî farkın hatası Taylor açılımından gelir ve h² ile küçülür; ama h çok küçülünce bilgisayarın 16 basamaklık yuvarlaması (yaklaşık 10⁻¹⁶·|f|/h) büyür. İki hata h ≈ 10⁻⁵ civarında dengelenir.",
      formula: "∂f/∂x ≈ [f(x+h, y) − f(x−h, y)] / 2h, hata ≈ (h²/6)·∂³f/∂x³",
      formulaNote: "x³ − 3x + y³ − 3y için ∂³f/∂x³ = 6, bu yüzden hata tam olarak h²'dir: h = 10⁻³ iken 10⁻⁶.",
    },
    {
      heading: "Gradyan: en dik yokuşun pusulası",
      body:
        "İki kısmi türevi bir vektörde topla: <strong>∇f = (fₓ, fᵧ)</strong>. Herhangi bir birim yön u = (cos θ, sin θ) boyunca eğim, yani <strong>yönlü türev</strong>, bu vektörle u'nun iç çarpımıdır: Dᵤf = ∇f·u = |∇f| cos(θ − φ). Kosinüs en çok 1 olduğundan en dik yokuş θ = φ'de, yani gradyan yönündedir ve değeri |∇f|'dir. Seviye eğrisi boyunca f değişmediği için o yöndeki eğim sıfırdır; cos(θ − φ) = 0, yani gradyan seviye eğrisine diktir. Bu, r(t) = p + t·u yolu için zincir kuralının özel hâlidir: df/dt = ∇f·r′(t).",
      formula: "Dᵤf = ∇f · u = |∇f| cos(θ − φ)",
      formulaNote: "u birim vektör olmalı; aksi hâlde sonuç yönle birlikte adım boyunu da taşır. ∇f yüzeyin üstünde değil, (x, y) düzleminde yaşar.",
    },
    {
      heading: "Teğet düzlem ve ikinci mertebe: hata neden s² ile küçülür?",
      body:
        "Türevlenebilir bir f, noktanın yakınında <strong>teğet düzlemine</strong> L(x, y) = f₀ + fₓ(x − x₀) + fᵧ(y − y₀) benzer. Ne kadar benzer? İki değişkenli Taylor açılımı, s kadar uzaklaştığında farkın ½s²·uᵀHu olduğunu söyler; burada H, ikinci türevlerden oluşan <strong>Hessian</strong> matrisidir. Hata s² ile küçülür: s'yi yarıya indirirsen hata dörtte bire iner. Ama uᵀHu = 0 olabilir; o zaman sıradaki terim, s³, öne çıkar. Hessian aynı zamanda kritik noktaları sınıflandırır: D = fₓₓfᵧᵧ − fₓᵧ² > 0 ve fₓₓ > 0 ise yerel en küçük, fₓₓ < 0 ise en büyük, D < 0 ise <strong>eyer</strong>; D = 0 ise test susar.",
      formula: "f(p + s·u) − L ≈ ½ s² uᵀHu, D = fₓₓ fᵧᵧ − fₓᵧ²",
      formulaNote: "x² + 2y² gibi ikinci dereceden bir f için yaklaşım tam eşitliktir. Maymun eyeri x³ − 3xy²'de orijinde H = 0, hata s³ ile küçülür.",
    },
    {
      heading: "Lagrange çarpanı: kısıtın fiyatı",
      body:
        "g(x, y) = c eğrisi üzerinde f'nin en büyüğünü arıyorsun. En iyi noktada f'nin seviye eğrisi kısıta değmeli, kesmemeli; kesseydi eğri boyunca biraz daha ilerleyip f'yi artırabilirdin. Değen iki eğrinin normalleri paraleldir: ∇f = λ∇g. Çarpanın da bir anlamı var: kısıt düzeyini c'den c + dc'ye kaydırınca en iyi değer yaklaşık λ·dc kadar değişir. Yani <strong>λ = d(Opt)/dc</strong>, kısıtın gölge fiyatıdır. Sayfa bunu doğrudan ölçer: c ± 0.01 için kaba aramayı yeniden yapar ve merkezî farkla dOpt/dc'yi hesaplar; aradaki küçük fark, merkezî farkın δ² hatasıdır.",
      formula: "∇f = λ∇g, g(x, y) = c, λ = d(Opt)/dc",
      formulaNote: "λ < 0 ise c'yi artırmak en iyi değeri düşürür; çemberde x + 2y'nin en küçüğü −√(5c) böyledir. Kısıt eğrisi sınırsızsa (bir doğru) en iyi değer hiç olmayabilir: ∇f = λ∇g yalnız aday verir.",
    },
    {
      heading: "Çift integral: hücreleri topla, koordinatı akıllıca seç",
      body:
        "∬<sub>R</sub> f dA, bölgeyi küçük hücrelere bölüp her hücrede f × alan toplamanın limitidir. Hücrelerin sınıra tam oturduğu karede, ya da köşegen üzerindeki hücrelerin yarım sayıldığı sayfadaki üçgende, orta nokta kuralının hatası n⁻² ile küçülür. Diskte ise Kartezyen hücreler sınırı merdiven gibi keser ve hata düzensiz iner. Kutupsal hücrelerde alan elemanı <strong>dA = r dr dθ</strong> olur: dış halkadaki bir dilim, içtekinden r ile orantılı olarak daha geniştir. Rastgele noktalarla <strong>Monte Carlo</strong> tahmini boyuttan bağımsız ama yavaştır: hata N<sup>−1/2</sup> ile, yani bir basamak doğruluk için yüz kat nokta. En güzel sonuç bir çan eğrisinden çıkar: tüm düzlemde ∬e<sup>−(x²+y²)</sup> dA = ∫₀<sup>2π</sup>∫₀<sup>∞</sup> e<sup>−r²</sup> r dr dθ = 2π·½ = π; integral, tek boyutlu integralin karesi olduğundan ∫e<sup>−x²</sup> dx = √π.",
      formula: "∬ e<sup>−(x²+y²)</sup> dA = π ⇒ ∫<sub>−∞</sub><sup>∞</sup> e<sup>−x²</sup> dx = √π",
      formulaNote: "Kutupsal geçişteki fazladan r, e<sup>−r²</sup>'nin tam türevini mümkün kılar; tek boyutta bu integralin temel fonksiyonlarla yazılan bir ilkel fonksiyonu yoktur.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var: <strong>01 · Kısmi türev ve gradyan</strong>, <strong>02 · Yönlü türev ve teğet düzlem</strong>, <strong>03 · Lagrange çarpanları</strong>, <strong>04 · Çift integral</strong>. Her sekmede iki tür sayı yan yana durur: <em>ölçülen</em> değerler sayfanın kendi sayısal hesaplarıdır (merkezî fark, 360 yönlük tarama, eğri boyunca kaba arama, hücre ve rastgele nokta toplamı), <em>kuram</em> değerleri ise sembolik türev, Newton yöntemi ve kapalı biçimli integrallerdir. Aradaki fark, ölçümün hatasıdır; deneylerin çoğu bu hatanın adımla, hücre sayısıyla ya da nokta sayısıyla hangi kuvvette küçüldüğünü bulmaktır. Haritada noktayı sürükleyebilir, yüzeyi döndürebilir, <strong>Kendi ifadem</strong> seçeneğiyle kendi f(x, y) ifadeni yazabilirsin. Her sekmede <strong>Sekmeyi sıfırla</strong> düğmesi (ya da R tuşu) var; bütün değerler boyutsuzdur.",
    experiments: [
      {
        title: "Fark adımı ne kadar küçük olmalı?",
        predict: "01 sekmesinde varsayılan f = x³ − 3x + y³ − 3y ve (0.5, 1.5) noktasında ∂f/∂x tam olarak −2.25'tir. Adımı 10⁻¹'den 10⁻²'ye indirince hata kaç kat küçülür? h'yi küçültmeye sonsuza dek devam etmek işe yarar mı?",
        do: "<strong>Fark adımı h = 10⁻ᵏ</strong> kaydırıcısını k = 1, 2, 3, 4, 5, 6, 8, 10, 12 değerlerine getir ve <strong>Formül ∂f/∂x · fark</strong> kartındaki farkı not et. Sonunda <strong>En yakın kritik noktaya git</strong> düğmesine bas.",
        observe: "Fark +0.01, +10⁻⁴, +10⁻⁶, +10⁻⁸ diye her adımda yüz kat küçülür; k = 5'te +1.1·10⁻¹⁰, k = 6'da +1.3·10⁻¹⁰ ile dibe vurur, sonra büyümeye başlar: k = 8'de −8.5·10⁻⁹, k = 10'da −1.9·10⁻⁷, k = 12'de +0.00024 (ölçülen değer −2.249755937). Açı kartı her zaman 90.000° gösterir. Kritik noktada (1.00, 1.00) gradyan kartı \"≈ 0 · yön tanımsız\", açı \"tanımsız\" yazar; tabloda dört kritik nokta vardır: bir yerel en büyük, iki eyer, bir yerel en küçük.",
        explain: "Büyük h'de hata kesme hatasıdır, (h²/6)·∂³f/∂x³ = h²: on kat küçük adım, yüz kat küçük hata. Küçük h'de ise f'nin iki yakın değerini çıkarırken 16 basamağın sonuncuları kaybolur ve bu yuvarlama hatası 10⁻¹⁶·|f|/h gibi büyür. İki hatanın toplamı h ≈ 10⁻⁵ civarında en küçüktür. Gradyan sıfır olduğunda en dik yön diye bir şey kalmaz; seviye eğrisinin teğeti de tanımsızlaşır.",
      },
      {
        title: "En dik yokuş ve teğet düzlemin hatası",
        predict: "02 sekmesinde f = x² + 2y² ve nokta (1, −1). En dik yokuş hangi açıda, eğimi ne kadar? s uzaklığını yarıya indirince teğet düzlemin hatası ne olur?",
        do: "Önce <strong>Taramada en büyük Dᵤf</strong> kartını <strong>Gradyan yönü · |∇f|</strong> kartıyla karşılaştır. <strong>θ'yı gradyan yönüne çevir</strong>, sonra <strong>Seviye eğrisi yönüne</strong> düğmesine bas. Ardından <strong>Yön açısı θ</strong>'yı yeniden 0°'ye getir ve <strong>Uzaklık s</strong> kaydırıcısını 1.5, 1, 0.5 ve 0.1'e getir. Son olarak <strong>Fonksiyon</strong> menüsünden maymun eyerini (x³ − 3xy²) seç, x₀ = y₀ = 0, θ = 0° ve s = 0.5 yap.",
        observe: "Tarama \"296.57° · 4.47214\", gradyan \"296.57° · 4.47214\" verir: √20 = 4.47214. Gradyan düğmesi θ'yı 297°'ye getirir, Dᵤf 4.4720071 olur; seviye eğrisi düğmesi 27°'ye getirir, Dᵤf −0.033948951 olur (açılar tam dereceye yuvarlandığı için sıfır değil). θ = 0°'de |f − L|, s = 1.5, 1, 0.5, 0.1 için 2.25, 1, 0.25, 0.01'dir ve ½s²|uᵀHu| tahmini her seferinde aynıdır (\"oran 1\"); log–log eğim 2.000. Maymun eyerinde gradyan \"|∇f| ≈ 0 · yön tanımsız\", ikinci mertebe tahmini \"0 (uᵀHu = 0)\", |f − L| = 0.125 = 0.5³, eğim 3.000 olur.",
        explain: "∇f = (2x, 4y) = (2, −4); açısı atan2(−4, 2) = −63.43°, yani 296.57°, boyu √20. Gradyana dik bir yönde eğim sıfırdır. x² + 2y² ikinci dereceden olduğu için teğet düzlem hatası tam ½s²·uᵀHu'dur; θ = 0°'de uᵀHu = fₓₓ = 2, hata s²; θ'yı 27°'de bıraksaydın uᵀHu = 2cos²θ + 4sin²θ ≈ 2.41 olur, s = 1.5'te hata 2.71374 çıkardı, oran yine 1. Maymun eyerinde orijinde hem gradyan hem Hessian sıfırdır: ilk sıfır olmayan terim kübiktir, hata s³ ile iner.",
      },
      {
        title: "λ bir fiyattır",
        predict: "03 sekmesinde x + 2y'yi x² + y² = c çemberi üzerinde en büyük yap. c = 1 iken en iyi değer √5 ise c'yi 1.2'ye çıkarınca yaklaşık ne olur? c = 4'te λ ne olur?",
        do: "Varsayılan durumda <strong>Çarpan λ</strong> ile <strong>Ölçülen dOpt/dc (c ± 0.01)</strong> kartlarını karşılaştır, <strong>Ölçülen açı ∇f ile ∇g</strong> kartına bak. Sonra <strong>Kısıt değeri c</strong>'yi 1.2 ve 4 yap. Ardından <strong>Amaç fonksiyonu f</strong> menüsünden f = x·y'yi, <strong>Kısıt</strong> menüsünden doğruyu seç ve <strong>Aranan</strong> menüsünde en büyük ile en küçük arasında geçiş yap.",
        observe: "c = 1'de en iyi değer 2.236067977, nokta (0.44721, 0.89443), açı 0.0000°, λ 1.118034, dOpt/dc 1.11805 (fark +1.4·10⁻⁵). c = 1.2'de en iyi değer 2.449489743 olur; λ·Δc tahmini 2.236 + 0.2 × 1.118 = 2.460 bunu iyi yakalar. λ kartı ise 1.0206207'ye iner. c = 4'te değer 4.472135955 (yarıçap iki kat, değer iki kat), λ 0.55901699. x·y doğru üzerinde en büyük 0.25'tir, (0.50000, 0.50000) noktasında ve λ = 0.5; en küçük arandığında kart \"sınırsız\" der.",
        explain: "∇f = (1, 2) = λ(2x, 2y) ⇒ x = 1/(2λ), y = 1/λ; kısıttan λ = √5/(2√c) ve Opt = √(5c). Türevi dOpt/dc = √5/(2√c), yani tam λ: çarpan, kısıtı gevşetmenin marjinal kazancıdır. λ c büyüdükçe küçülür (azalan getiri). Ölçülen dOpt/dc'deki +1.4·10⁻⁵, δ = 0.01'lik merkezî farkın δ²·Opt‴/6 hatasıdır. Doğru sınırsız olduğu için x·y = x(1 − x) aşağı doğru sınırsızdır: Lagrange noktası vardır ama bu nokta bir en büyüktür.",
      },
      {
        title: "Bir çan eğrisinden π",
        predict: "04 sekmesinde <strong>Gauss → π</strong> düğmesi f = e<sup>−(x²+y²)</sup>'yi a = 4 yarıçaplı diskte toplar. Sonuç π'ye ne kadar yakın olur? Kutupsal toplamda r'yi unutursan ne olur? Varsayılan x² + y² diskte n'yi iki katına çıkarınca kutupsal hata nasıl değişir?",
        do: "<strong>Gauss → π</strong> düğmesine bas; Riemann, kesin değer, iki kutupsal toplam ve <strong>√(kutupsal toplam) · √π</strong> kartlarını oku. Sonra <strong>Boyut a</strong>'yı 1, 2, 3 yap. Ardından <strong>Sekmeyi sıfırla</strong> ve <strong>Hücre sayısı n</strong>'yi 4, 8, 16, 32, 64 yaparak <strong>Kutupsal toplam, r ile</strong> hatasını izle; en sonda <strong>Monte Carlo nokta sayısı N = 10ᵏ</strong>'yı 2'den 5'e çıkar.",
        observe: "a = 4, n = 200'de Riemann 3.141592302, kesin değer 3.1415923 (π(1 − e⁻¹⁶)), hata +2.21·10⁻⁹; kutupsal 3.141697028; r unutulursa 5.5683279, yüzde 77.2 fazla; karekök 1.77248329, √π = 1.77245385. a = 1, 2, 3 için kesin değer 1.985865304, 3.084052377, 3.14120495. Varsayılan x² + y² diskte kutupsal hata −0.049, −0.012, −0.0031, −0.00077, −0.00019: her ikiye katlamada dört kat küçülür. Kartezyen Riemann hatası ise düzensizdir (−0.196, +0.0933, +0.107, +0.0299, +0.0107). Monte Carlo: 1.4353 ± 0.13, 1.57164 ± 0.042, 1.59947 ± 0.013, 1.57046 ± 0.0041.",
        explain: "Disk üzerinde kesin değer π(1 − e<sup>−a²</sup>)'dir; a = 4'te e⁻¹⁶ ≈ 10⁻⁷ olduğundan neredeyse π. r unutulunca her dilim yanlış alanla tartılır: toplam 2π∫₀⁴e<sup>−r²</sup>dr ≈ 2π·√π/2 = π√π ≈ 5.568 olur, yani doğru sonucun tam √π katı. Kutupsal orta nokta kuralı x² + y² için hatayı tam −π/(4n²) yapar: n⁻². Kartezyen hücreler diskin kenarını merdivenle keser; o yüzden düzensiz. Gauss'ta ise kenarda f ≈ 10⁻⁷ olduğundan merdiven önemsizleşir ve Kartezyen toplam kutupsaldan iyi çıkar. Monte Carlo'nun standart hatası her on kat noktada yalnız √10 ≈ 3.2 kat küçülür: N<sup>−1/2</sup>.",
      },
    ],
  },
  wow: [
    {
      title: "π, hiç çember çizmeden",
      body:
        "e<sup>−x²</sup> eğrisinde çember yok, ama altındaki alan √π ≈ 1.77245'tir. Sır ikinci boyutta: iki çan eğrisinin çarpımı e<sup>−(x²+y²)</sup> dönme simetrisine sahiptir ve kutupsal koordinatta integral 2π·½ = π çıkar. Normal dağılımın formülündeki 1/√(2π) çarpanı tam buradan gelir.",
    },
    {
      title: "Kare, iki disk arasında sıkışır",
      body:
        "[−a, a]² karesi a yarıçaplı diski içerir, a√2 yarıçaplı diskin içinde kalır. Bu yüzden ∬e<sup>−(x²+y²)</sup> karede π(1 − e<sup>−a²</sup>) ile π(1 − e<sup>−2a²</sup>) arasındadır. a = 1 için 1.986 ≤ 2.231 ≤ 2.716; a büyüdükçe iki sınır da π'ye sıkışır ve kare integrali, yani (∫e<sup>−x²</sup>)², de π'ye gitmek zorunda kalır.",
    },
    {
      title: "Gradyan inişi 1847'den kalma",
      body:
        "Bugün yapay sinir ağlarını eğiten yöntem, gradyanın tersine küçük adımlar atmak, genellikle Augustin-Louis Cauchy'ye atfedilir; Cauchy bu fikri 1847'de önerdi. Jacques Hadamard 1907'de benzer bir yöntemi bağımsız olarak ortaya attı. Bir kayıp fonksiyonunun milyonlarca değişkeni olabilir; yöntem yine de bu sayfadaki iki değişkenli pusulayla aynıdır.",
    },
  ],
  worked: {
    title: "Çember üzerinde en iyi nokta ve çarpanın anlamı",
    prompt:
      "x² + y² = c çemberi üzerinde f(x, y) = x + 2y'nin en büyük ve en küçük değerlerini Lagrange çarpanlarıyla bul. Sonra en büyük değerin c'ye göre türevinin λ'ya eşit olduğunu göster ve c = 1 için sayfanın 03 sekmesindeki varsayılan değerlerle karşılaştır. (Bütün nicelikler boyutsuz.)",
    steps: [
      "Koşulları yaz: ∇f = (1, 2), ∇g = (2x, 2y). ∇f = λ∇g ⇒ 1 = 2λx ve 2 = 2λy, yani x = 1/(2λ), y = 1/λ. λ = 0 olamaz, çünkü ∇f hiçbir yerde sıfır değildir.",
      "Kısıta koy: 1/(4λ²) + 1/λ² = c ⇒ 5/(4λ²) = c ⇒ λ = ±√5/(2√c). Artı işaret en büyüğü, eksi işaret en küçüğü verir; çember kapalı ve sınırlı olduğundan ikisi de vardır.",
      "Değeri hesapla: f = x + 2y = 1/(2λ) + 2/λ = 5/(2λ) = ±√(5c). c = 1'de en büyük √5 = 2.236067977, (x, y) = (1/√5, 2/√5) = (0.44721, 0.89443) ve λ = √5/2 = 1.118034; en küçük −2.236067977, λ = −1.118034.",
      "Çarpanı yorumla: Opt(c) = √(5c) ⇒ dOpt/dc = √5/(2√c) = λ. Sayfa c ± 0.01 ile ölçüp 1.11805 bulur; fark +1.4·10⁻⁵, merkezî farkın δ²·Opt‴(c)/6 hatasıdır: Opt‴(1) = (3/8)√5 ≈ 0.839, 0.839 × 10⁻⁴ / 6 ≈ 1.4·10⁻⁵.",
      "Geometrik sağlama: en büyük noktada ∇f = (1, 2) ile ∇g = (0.894, 1.789) aynı yönü gösterir, sayfadaki açı kartı 0.0000° okur; en küçükte 180.0000°. Kaba arama (4 000 nokta ve altın oran) aynı değeri hiç türev almadan bulur.",
    ],
    result:
      "En büyük √(5c), en küçük −√(5c); c = 1'de ±2.236067977 ve λ = ±1.118034. c'yi 0.2 artırmak (c = 1.2) en büyük değeri yaklaşık λ·0.2 ≈ 0.224 artırmalı: gerçek değer 2.449489743, artış 0.213. Fark, Opt(c)'nin içbükey olmasından gelen ikinci mertebe terimdir; λ'nın iki uçtaki ortalamasını kullanmak (1.118 ile c = 1.2'deki 1.021'in ortalaması × 0.2 ≈ 0.214) farkın neredeyse tamamını kapatır.",
  },
  misconceptions: [
    {
      myth: "İki kısmi türev de sıfırsa orada bir tepe ya da çukur vardır.",
      truth:
        "∇f = 0 yalnızca düz bir nokta demektir. x² − y² orijinde bir yönde artar, öbür yönde azalır: eyer. Maymun eyeri x³ − 3xy²'de Hessian bile sıfırdır, test susar; 01 sekmesinin çevre taraması orada 6 işaret değişimi sayar, üç vadi ve üç sırt.",
    },
    {
      myth: "x ekseni ve y ekseni boyunca limit aynıysa çok değişkenli limit vardır.",
      truth:
        "Limit bütün yollarda aynı olmalıdır. x²y/(x⁴ + y²) eksenler boyunca ve her doğru boyunca 0'a gider, ama y = x² parabolü boyunca ½'ye gider; orijinde limit yoktur. Aynı nedenle kısmi türevlerin varlığı tek başına türevlenebilirliği güvence altına almaz.",
    },
    {
      myth: "Gradyan yüzeyin üzerinde yukarı doğru uzanan bir oktur.",
      truth:
        "∇f, f'nin girdileriyle aynı düzlemde, (x, y) düzleminde yaşar: haritadaki turuncu ok. Hangi yöne yürürsen en hızlı tırmanacağını söyler; yüzey üzerindeki üç boyutlu teğet vektör (u, Dᵤf) ise ayrı bir nesnedir.",
    },
    {
      myth: "Lagrange çarpanı λ yalnızca denklemi çözmek için uydurulmuş yardımcı bir sayıdır.",
      truth:
        "λ, en iyi değerin kısıta duyarlılığıdır: dOpt/dc. 03 sekmesinde iki kart yan yana durur, ikisi de 1.118 civarındadır. İktisatta gölge fiyat, mekanikte kısıt kuvvetinin büyüklüğüyle ilgili bir nicelik olarak görünür.",
    },
  ],
  glossary: [
    { term: "Kısmi türev", definition: "Öteki değişkenler sabitken fonksiyonun tek bir değişkene göre anlık değişim hızı, ∂f/∂x." },
    { term: "Gradyan (∇f)", definition: "Kısmi türevlerden oluşan, en hızlı artış yönünü gösteren ve boyu o yöndeki eğime eşit olan vektör." },
    { term: "Seviye eğrisi", definition: "f'nin aynı değeri aldığı noktaların oluşturduğu eğri; haritadaki eş yükselti çizgisi." },
    { term: "Yönlü türev", definition: "f'nin birim u yönündeki anlık değişim hızı, Dᵤf = ∇f·u." },
    { term: "Hessian", definition: "İkinci kısmi türevlerin matrisi; teğet düzlemden sapmayı ve kritik noktanın türünü belirler." },
    { term: "Eyer noktası", definition: "Gradyanın sıfır olduğu, bazı yönlerde artan bazı yönlerde azalan, ne tepe ne çukur olan nokta." },
    { term: "Lagrange çarpanı (λ)", definition: "Kısıtlı en iyide ∇f = λ∇g eşitliğini sağlayan ve en iyi değerin kısıt düzeyine göre türevine eşit olan sayı." },
    { term: "Fubini teoremi", definition: "Uygun koşullarda çift integralin, sırası fark etmeksizin iki tek katlı integralin art arda alınmasıyla hesaplanabileceğini söyleyen teorem." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın konuları, mühendislik ve fen fakültelerinde genellikle ikinci ya da üçüncü yarıyılda okutulan <strong>çok değişkenli kalkülüs</strong> (Calculus II–III, Analiz) dersinin çekirdeğidir. Ders buradan üç değişkene, üç katlı integrallere ve <strong>vektör kalkülüsüne</strong> uzanır: Green, Stokes ve diverjans teoremleri, Maxwell denklemlerinin ve akışkanlar mekaniğinin dilidir. Sayfada değişken değiştirme yalnız kutupsal dA = r dr dθ olarak görünür; derste bu, genel bir dönüşümün <strong>Jacobian determinantı</strong> |det J| ile ölçeklenmesine genelleşir. Zincir kuralı da benzer biçimde matris çarpımına dönüşür.",
      "Sayısal tarafta, sayfanın ölçtüğü her üs bir derse açılır. Merkezî farkın h² hatası ile yuvarlamanın 1/h hatası arasındaki denge <strong>Sayısal Analiz</strong>'in ilk konularındandır; n⁻² ile yakınsayan orta nokta kuralı Gauss kareleme ve uyarlamalı yöntemlere, N<sup>−1/2</sup> ile yakınsayan Monte Carlo ise çok boyutlu integralin başka yöntemlerle neredeyse olanaksızlaştığı istatistik fiziğine ve finansa gider. Lagrange çarpanı <strong>Optimizasyon</strong> dersinde eşitsizlik kısıtlarına (Karush–Kuhn–Tucker koşulları) ve iktisattaki gölge fiyata, Gauss integrali de <strong>Olasılık ve İstatistik</strong>'te normal dağılıma bağlanır.",
    ],
    topics: ["Vektör kalkülüsü", "Jacobian ve değişken değiştirme", "Taylor açılımı ve Hessian", "KKT koşulları", "Sayısal türev ve kareleme", "Monte Carlo yöntemleri", "Gradyan inişi"],
  },
  quiz: [
    {
      question: "f'nin üçüncü türevi sıfırdan farklı ve yuvarlama henüz önemsizken, merkezî farkta adımı h = 10⁻²'den h = 10⁻³'e indirirsen hata yaklaşık ne olur?",
      options: ["10 kat küçülür", "100 kat küçülür", "1000 kat küçülür", "Değişmez"],
      answer: 1,
      explanation: "Merkezî farkın hatası h² ile orantılıdır: (h²/6)·f‴. On kat küçük adım, yüz kat küçük hata. 01 sekmesinde fark +10⁻⁴'ten +10⁻⁶'ya iner. Ama bu sonsuza dek sürmez: 01 sekmesindeki fonksiyonda h ≈ 10⁻⁵'in altında yuvarlama hatası (≈ 10⁻¹⁶·|f|/h) büyür ve sonuç yeniden kötüleşir.",
    },
    {
      question: "Bir integrali önce kutupsal orta nokta kuralıyla (hata ∝ n⁻²), sonra Monte Carlo ile (hata ∝ N<sup>−1/2</sup>) hesaplıyorsun. Hatayı 100 kat küçültmek için n'yi ve N'yi kaç katına çıkarmalısın?",
      options: ["n'yi 100, N'yi 100 katına", "n'yi 10, N'yi 10 000 katına", "n'yi 10, N'yi 100 katına", "n'yi 100, N'yi 10 katına"],
      answer: 1,
      explanation: "n⁻²'de 100 kat küçük hata için n'yi √100 = 10 katına çıkarmak yeter. N<sup>−1/2</sup>'de ise N'yi 100² = 10 000 katına çıkarmak gerekir. Monte Carlo'nun gücü hızında değil, boyuttan bağımsız olmasındadır: ızgara yöntemleri boyut arttıkça hücre sayısında patlar.",
    },
    {
      question: "Bir kısıtlı en büyükte λ = 2 bulundu. Kısıt düzeyi c'yi 0.05 artırırsan en büyük değer yaklaşık ne kadar değişir?",
      options: ["0.05 artar", "0.1 artar", "2 artar", "0.025 azalır"],
      answer: 1,
      explanation: "λ = d(Opt)/dc olduğundan ΔOpt ≈ λ·Δc = 2 × 0.05 = 0.1. 03 sekmesinde f = x² + 2y²'yi çemberde en büyük yaparsan λ = 2 ve en büyük değer 2c olur; c'yi 1'den 1.05'e çıkarmak değeri tam 0.1 artırır.",
    },
  ],
  next: [
    { href: "turev.html", title: "Türev: Kesenden Teğete (Limit Laboratuvarı)", why: "Kısmi türevin tek değişkenli kökü: kesen eğiminin limiti, tek yanlı limitler ve adım fazla küçülünce bilgisayarın neden yanılmaya başladığı." },
    { href: "riemann-toplamlari.html", title: "Riemann Toplamları ve Sayısal İntegral", why: "Çift integraldeki hücre toplamının tek boyutlu hâli: dikdörtgen, yamuk ve parabol kurallarının hatasını log–log grafikten ölç, Monte Carlo'yu deterministik kurallarla yarıştır." },
    { href: "taylor-serisi.html", title: "Taylor Serisi: Fonksiyonları Polinomlarla Yakalamak", why: "Teğet düzlemin ve ½s²uᵀHu teriminin arkasındaki fikir: türevlerden polinom kurmak ve kalanın derece arttıkça nasıl küçüldüğünü ölçmek." },
    { href: "integral.html", title: "İntegral: Birikim, Temel Teorem ve Uygulamalar", why: "Birikim fikri, temel teorem, dilimleyerek hacim ve sonsuza uzanan has olmayan integraller: Gauss integralinin tek boyutlu zemini." },
  ],
  sources: [
    { title: "OpenStax · Calculus Volume 3", url: "https://openstax.org/details/books/calculus-volume-3", note: "Kısmi türev, yönlü türev ve gradyan, Lagrange çarpanları, kutupsal koordinatta çift integral; açık lisans ders kitabı (İngilizce)." },
    { title: "MIT OpenCourseWare · 18.02SC Multivariable Calculus", url: "https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/", note: "Aynı konuların ders videoları, notları ve problem setleri (İngilizce)." },
    { title: "Wikipedia · Gaussian integral", url: "https://en.wikipedia.org/wiki/Gaussian_integral", note: "Kutupsal koordinatlarla kanıt ve tarihçe: de Moivre 1733, Gauss 1809, Laplace ve Poisson (İngilizce)." },
    { title: "Wikipedia · Lagrange multiplier", url: "https://en.wikipedia.org/wiki/Lagrange_multiplier", note: "Yöntemin geometrisi ve çarpanın en iyi değerin kısıta göre değişim hızı, yani gölge fiyat olarak yorumu (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
