window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["lorenz-cekici2"] = {
  slug: "lorenz-cekici2",
  title: "Lorenz: Görüntüden Ölçüme",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline: "Bir yörüngeyi farklı açılardan gör, yönlü kesitlerle örnekle ve adımı küçülterek hesabı sına. Faz uzayındaki görüntüyle sayısal kanıt arasındaki mesafeyi ölç.",
  hook: "Ekrandaki iki çizgi kesişiyor. Sistem aynı duruma iki kez mi geldi, yoksa bakış açısı farklı noktaları üst üste mi düşürdü? Bir resmi anlamak için önce hangi bilgiyi sakladığını bulmak gerekir.",
  bigIdea: "Faz uzayının izdüşümü, yönlü kesit ve adım yarılama aynı akış hakkında farklı bilgiler verir; hiçbiri tek başına sonsuz zaman davranışının kanıtı değildir.",
  story: [
    "Edward N. Lorenz, 1963 tarihli Deterministic Nonperiodic Flow makalesinde ısıl konveksiyonun sadeleştirilmiş bir modelinden üç diferansiyel denklem elde etti. Modelde x akışın dönmesine, y ve z sıcaklık alanının bileşenlerine karşılık gelir. Kelebeğe benzeyen çizim bu yüzden bir hava parçacığının gökyüzündeki yolu değildir: üç durum değişkeninin birlikte nasıl değiştiğini gösterir. Makalenin §5'inde denklemler, §7'sinde sayısal sonuçlar incelenir.",
    "Lorenz'in çalışmasının çarpıcı yanı, kesin kurallarla belirlenen bir sistemde periyodik olmayan hareketi ve tahminin sınırlarını aynı soruya dönüştürmesiydi. Bu laboratuvar σ = 10, ρ = 28, β = 8/3 değerlerini sabit tutar; başlangıç olarak seçtiği (1; 1; 1), bu sayfanın deney düzenidir. Gerçek atmosferin nicel tahminini yapmıyoruz. Sorular daha küçük ve denetlenebilir: bir bakış açısı neyi örter, bir kesit hangi geçişleri toplar, hesaplanan son nokta adım küçülünce nasıl değişir?",
    "Poincaré kesiti, sürekli hareketi belirli bir yüzeyden geçiş anlarında kaydeder. Böylece bir zaman eğrisinden bir nokta dizisine geçilir. MIT'nin dönüş haritası dersinde de kullanılan bu düşünce, salınımlardan yürüyen robotlara kadar işe yarar: her anı saklamak yerine aynı tür olaya tekrar bakarsın. Ancak hangi yüzeyi ve hangi geçiş yönünü seçtiğin, topladığın verinin anlamını belirler.",
  ],
  core: [
    {
      heading: "Üç koordinat, tek durum",
      body: "Durum u = (x; y; z), sistemin o andaki üç değişkenidir. F(u) ise bu durumdaki değişim hızını verir. Denklem bir sonraki noktayı doğrudan söylemez; onu zaman boyunca çözmek gerekir. Sayfa bunu klasik dördüncü mertebe Runge–Kutta, kısaca RK4 ile yapar. İlk sekmedeki kamera yalnız bu hesaplanmış veriyi döndürür; yeni bir fiziksel çözüm üretmez. Zaman kaydırıcısı da bütün izi kısaltmak yerine seçilen örneği turuncu gösterir.",
      formula: "dx/dt = 10(y − x)<br>dy/dt = x(28 − z) − y<br>dz/dt = xy − (8/3)z",
      formulaNote: "x, y, z ve t boyutsuzdur. Bir görüntüdeki piksel uzaklığını metre veya saniye diye okuyamazsın.",
    },
    {
      heading: "İzdüşüm bir koordinatı saklar",
      body: "x–y grafiğinde aynı noktaya düşen iki durumun z değerleri farklı olabilir. Örneğin (1; 1; 1) ve (1; 1; 10), bu izdüşümde aynıdır. Kamerayı döndürmek derinliği başka bir yönde görünür yapar. Lorenz'in düzgün vektör alanı için bir başlangıç değer probleminin çözümü yerel olarak tektir: farklı yörüngeler tam faz uzayında kesişip sonra farklı yönlere ayrılamaz. Ekrandaki kesişme bu tekliği ihlal etmez. Küçük grafiklerin çizim ölçekleri de birbirinden bağımsızdır.",
      formula: "π<sub>xy</sub>(x; y; z) = (x; y)",
      formulaNote: "İzdüşüm bilgi kaybettirir. Çizilen doğru parçaları da yalnız ardışık sayısal örnekleri birleştirir; tam çözümün biçimini aralarında kanıtlamaz.",
    },
    {
      heading: "Kesit, düzlemin yönlü bölümüdür",
      body: "z = c düzlemindeki bir nokta hâlâ iki serbest koordinat taşır: x ve y. Yukarı geçiş için normal hız xy − βc pozitif, aşağı geçiş için negatif olmalıdır. Teğet temas bu deneyde geçiş sayılmaz. Ardışık kesit durumları arasında, yeniden dönen noktalar için iki boyutlu bir dönüş haritası kurulabilir. Sayfadaki (xₙ; xₙ₊₁) saçılımı bunun yalnız bir izdüşümüdür; y bilgisini attığı için tek değerli xₙ₊₁ = f(xₙ) fonksiyonu varsayamazsın.",
      formula: "S₊ = {(x; y; c) : xy − βc > 0}<br>(xₙ; yₙ) → (xₙ₊₁; yₙ₊₁)",
      formulaNote: "n zaman adımı değil, saklanan geçişlerin sırasıdır. m nokta max(0, m − 1) ardışık çift verir; yeniden dönüş her kesit noktası için peşinen garanti değildir.",
    },
    {
      heading: "Olay, iki hesap adımının arasında olabilir",
      body: "Yukarı yönde z₀ < c ≤ z₁ bulunduğunda sayfa iki örnek arasında doğrusal ara değerleme yapar; x ve y'yi de aynı α ile hesaplar. Ardından normal hızın işaretini denetler. Bu, kesite en yakın zaman örneğini seçmekten farklıdır. Fakat RK4 kullanılması kesit noktasını otomatik olarak dördüncü mertebede doğru yapmaz: enine, teğetlikten uzak geçişlerde doğrusal ara değerleme genel olarak O(h²) hata ekler. Teğete yaklaşınca zaman hatası büyüyebilir; bir adım içindeki birden fazla geçişin hepsi yakalanmayabilir.",
      formula: "α = (c − z₀)/(z₁ − z₀)<br>t<sub>geçiş</sub> ≈ t₀ + αh",
      formulaNote: "Kesitte h = 0,005 sabittir. İlk geçişleri atmak yerleşme veya istatistiksel yakınsama kanıtı değildir; ortalama dönüş aralığı da periyot değildir.",
    },
    {
      heading: "Aynı son zamanı üç kez hesapla",
      body: "Euler her adımda başlangıç eğimini kullanır: uₖ₊₁ = uₖ + hF(uₖ). RK4 dört eğimin ağırlıklı birleşimini kullanır. Düzgün çözüm ve sabit son zaman için, yeterince küçük h'de ve yuvarlama baskın değilken, küresel hata Euler'de O(h), RK4'te O(h⁴) olur. u_h(T) − u(T) = C hᵖ + daha küçük terimler ve C ≠ 0 ise ardışık çözümler arasındaki farkların oranı 2ᵖ'ye yaklaşır. Ekrandaki oran, tablonun referansa uzaklıklarını bölerek hesaplanmaz; üç çözümün birbirine uzaklıklarını kullanır.",
      formula: "d₁ = ‖u<sub>h</sub> − u<sub>h/2</sub>‖₂; d₂ = ‖u<sub>h/2</sub> − u<sub>h/4</sub>‖₂<br>d₁/d₂ → 2ᵖ",
      formulaNote: "Beklenen sınır Euler için 2, RK4 için 16'dır. Sonlu h'de tam eşitlik gerekmez; bu deney kesin hata sınırı, kaos kanıtı veya uzun zaman istatistiklerinin doğrulaması değildir.",
    },
  ],
  lab: {
    intro: "Üç sekmenin ayarları ve Sıfırla düğmeleri bağımsızdır. Hesap, bir ayarı değiştirince yenilenir; animasyon beklemek gerekmez. Faz uzayı ve kesit h = 0,005 ile yürür. Hesaba güven sekmesinde adımı sen seçersin. Aşağıdaki sayılar bu uygulamanın çift duyarlıklı hesabına aittir; özellikle uzun zaman kesit sayıları kesin matematiksel sabitler değildir.",
    experiments: [
      {
        title: "Kamera mı değişti, durum mu?",
        predict: "x–z görünümünden x–y görünümüne geçince Seçilen (x; y; z) kartındaki sayılar değişmeli mi?",
        do: "1 · Faz uzayı sekmesinde Sıfırla'ya bas. Hesaplanan süre T = 40, Seçilen zaman t = 10,00 kalsın. Önce x–z görünümü, sonra x–y görünümü düğmesine bas; Dönme açısı ve Bakış eğimi kaydırıcılarını da değiştir. Son olarak t'yi 0 yap.",
        observe: "t = 10'da kart (−4,903; −3,744; 24,691), hesaplanan adım sayısı 8000 gösterir. Kamera değişince bu sayılar aynı kalır; küçük izdüşümlerde de aynı durum işaretlidir. t = 0'da kart (1,000; 1,000; 1,000) olur, bütün 0–40 izi yine görünür.",
        explain: "Kamera koordinatları çizim için dönüştürür; denklemi yeniden tanımlamaz. Zaman seçimi bir örneği işaretler, geçmişi silmez. 8000 adım, 40/0,005 hesabıdır; başlangıç örneğiyle birlikte 8001 nokta saklanır.",
      },
      {
        title: "Bir düzlemden kaç kez geçildi?",
        predict: "İlk 10 geçişi attıktan sonra 156 nokta kaldıysa kaç ardışık çift çizilir? Kesiti yükseltip hiç nokta bulamamak sonsuz gelecek hakkında ne söyler?",
        do: "2 · Poincaré kesiti sekmesinde Sıfırla'ya bas: c = 27, Yukarı, T = 120, ilk 10 geçiş atılsın. Sayıları kaydet. Geçiş yönü'nü Aşağı yapıp karşılaştır. Sonra yeniden Sıfırla ve Yüksek kesit: c = 60 düğmesine bas.",
        observe: "Yukarıda Bulunan / atılan / saklanan = 166 / 10 / 156; ardışık çift 155, ortalama aralık 0,7323'tür. Son geçiş t = 119,9971 ve (−13,346; −18,627; 27,000); normal hız 176,604'tür. Aşağı yönde 165 / 10 / 155 ve 154 çift, ortalama 0,7321 görülür. c = 60'ta bu 0–120 penceresinde geçiş yoktur; son geçiş ve ortalama aralık çizgiyle gösterilir.",
        explain: "Yön seçimi farklı olayları toplar; sonlu zaman penceresinde yukarı ve aşağı sayıları eşit olmak zorunda değildir. 156 noktayı sırayla eşlemek 155 çift verir. Sıfır olay, seçilen hesap aralığının sonucudur. Geçişler bağımsız rastgele örnekler olmadığı için ortalama aralığı bir güven aralığı ya da yörüngenin periyodu diye sunamayız.",
      },
      {
        title: "RK4 için neden yaklaşık 16?",
        predict: "Adım yarıya inince dördüncü mertebe bir yöntemde son nokta farkları yaklaşık kaç kat küçülür? Oranın tam 16 olmaması yöntemin mertebesini değiştirir mi?",
        do: "3 · Hesaba güven sekmesinde Sıfırla'ya bas: başlangıç (1; 1; 1), T = 1, en büyük h = 0,005. Üç tablo satırını ve d₁/d₂ kartlarını oku. Son zaman T'yi 0,5 yapıp RK4 oranını yeniden kontrol et.",
        observe: "T = 1'de h, h/2, h/4 için RK4'ün ince referansa uzaklıkları yaklaşık 2,534 × 10⁻⁶; 1,717 × 10⁻⁷; 1,351 × 10⁻⁸'dir. Euler uzaklıkları 4,609; 2,040; 0,9670 olur. Oran kartları Euler için 2,393 / 2, RK4 için 15,294 / 16 gösterir. T = 0,5'te RK4 oranı 16,335'tir.",
        explain: "Bu oranlar sabit kısa son zamanda h küçülmesinin etkisini araştırır. Genel başlangıçta referans da h/32 ile hesaplanmış RK4 yaklaşımıdır; tablo kesin hata değildir. Varsayılanda h/16 ve h/32 referansları arasındaki yaklaşık 5,869 × 10⁻¹¹ fark, onların yakınlığını gösterir; bir üst hata sınırı vermez. Eşit h, eşit maliyet de değildir: Euler adım başına bir, RK4 dört türev değerlendirmesi yapar.",
      },
      {
        title: "Tam çözümle hesap makinesini sına",
        predict: "x = y = 0 ile başlanırsa iki kanat arasında dolaşma bekler misin? Bu özel başlangıç için sayısal hatayı nasıl doğrudan ölçebilirsin?",
        do: "3 · Hesaba güven sekmesinde önce Sıfırla, sonra Tam çözümü sına düğmesine bas. Başlangıç (0; 0; 10), T = 1 ve h = 0,005 olur. Referansı, tabloyu ve oranları incele; aşağıdaki çözümlü örnekle karşılaştır.",
        observe: "Tam son durum (0; 0; 0,6948345122…) olup kartta (0,000; 0,000; 0,695) görünür. Euler hatası üç adım boyunda yaklaşık 0,01235; 0,006176; 0,003088, RK4 hatası 4,935 × 10⁻¹⁰; 3,067 × 10⁻¹¹; 1,914 × 10⁻¹² olur. Oranlar 2,000 ve 16,093'e yuvarlanır.",
        explain: "İlk iki denklem bu eksende sıfırdır; üçüncü denklem dz/dt = −(8/3)z'ye iner. Referans artık başka bir sayısal yörünge değil, üstel fonksiyonla bilinen tam çözümdür; değerlendirmesi yine kayan noktayla yapılır. Kaotik parametrelerde böyle özel, kaotik olmayan çözümler bulunabilir. Bu eksenin sönmesi, genel başlangıçların da orijine gittiğini göstermez.",
      },
    ],
  },
  wow: [
    {
      title: "İki kanadın cebirsel akrabası",
      body: "Denklemlerde x ve y'nin işaretlerini birlikte değiştir, z'yi koru. İlk iki türev de işaret değiştirir, xy ise aynı kalır. Bu yüzden (x(t); y(t); z(t)) bir çözümse (−x(t); −y(t); z(t)) de bir çözümdür. İki kanada benzeyen düzenin bir simetrisi vardır; bu, tek bir yörüngenin iki tarafta eşit süre geçirdiğini söylemez.",
    },
    {
      title: "Hacim küçülürken uzaklık büyüyebilir",
      body: "Vektör alanının diverjansı −10 − 1 − 8/3 = −41/3'tür. Tam akışın taşıdığı küçük bir faz hacmi V(t) = V(0) exp(−41t/3) ile küçülür. Bu, üç yöndeki toplam hacim değişimidir; her yöndeki uzaklığın küçüldüğü anlamına gelmez. Bir yönde gerilme, öteki yönlerdeki daha güçlü sıkışmayla birlikte olabilir. Bu sonuç denklemlerden çıkar; sayfa hacmi ölçmez.",
    },
    {
      title: "Üç denklemin içinde çözülebilen bir doğru",
      body: "x = y = 0 doğrusu değişmezdir. z(0) = 10 için bir boyutsuz zaman sonra z yaklaşık 0,694835 olur; çözüm sonsuz zamanda sıfıra yaklaşır. Buna rağmen ρ = 28'de orijin kararsızdır: x–y doğrultularındaki lineerleştirmenin karakteristik denklemi λ² + 11λ − 270 = 0, bir pozitif kök taşır. Bir doğru boyunca çekilmek, bütün yönlerden kararlı olmak değildir.",
    },
  ],
  worked: {
    title: "Aynı eksende tam çözüm, Euler ve RK4",
    prompt: "Başlangıç (0; 0; 10), β = 8/3, son zaman T = 1 ve h = 0,005 olsun. Euler'in son z değerini tam çözümle karşılaştır; RK4'ün neden çok daha küçük hata verdiğini adım çarpanından gör. Bütün nicelikler boyutsuzdur.",
    steps: [
      "x = y = 0 değişmez olduğundan dz/dt = −βz kalır. Değişkenleri ayır: dz/z = −βdt. Başlangıcı kullanınca z(t) = 10 exp(−βt); z(1) ≈ 0,694834512228 çıkar.",
      "Adım sayısı N = T/h = 200. Euler'de zₖ₊₁ = (1 − βh)zₖ ve βh = 1/75. Böylece z₂₀₀ = 10(74/75)²⁰⁰ ≈ 0,682482104053 bulunur.",
      "Mutlak son nokta hatası |0,682482104053 − 0,694834512228| ≈ 0,012352408175'tir. x ve y sıfır kaldığı için bu, üç boyutlu Öklid hatasıyla aynıdır; tablodaki ilk Euler satırını verir.",
      "Doğrusal z' = −βz denklemine RK4 uygula. Bir adımın çarpanı R(q) = 1 + q + q²/2 + q³/6 + q⁴/24, q = −βh = −1/75'tir. 200 adım sonunda 10R(−1/75)²⁰⁰ ≈ 0,694834512721; hata yaklaşık 4,935 × 10⁻¹⁰ olur.",
      "h'yi yarılayınca Euler hatası yaklaşık 0,006176281231'e, RK4 hatası 3,067 × 10⁻¹¹'e iner. Bunlar tam referansa uzaklıklardır; ekrandaki d₁/d₂ kartları ise h, h/2, h/4 çözümlerinin birbirine uzaklıklarından ayrı hesaplanır.",
    ],
    result: "Aynı 200 adımda Euler hatası yaklaşık 0,01235, RK4 hatası 4,935 × 10⁻¹⁰'dur. Bu özel, düzgün üstel çözüm sayısal yöntemi sınar; genel Lorenz hareketinin uzun zaman doğruluğunu garanti etmez.",
  },
  misconceptions: [
    { myth: "Kelebek resmi uzayda uçan bir parçacığın yoludur.", truth: "Eksenler durum değişkenleridir: akış ve sıcaklık alanının kiplerini temsil eder. Hepsi boyutsuzdur. Kamera yalnız bu faz uzayı verisinin çizimini değiştirir." },
    { myth: "xₙ → xₙ₊₁ grafiği mutlaka tek değişkenli bir fonksiyondur.", truth: "Kesit durumu x ve y gerektirir. y'yi çizimden çıkarmak, bir sonraki x'i yalnız önceki x'in belirlediğini kanıtlamaz. Köşegene yakın bir çift de bütün durumun döndüğünü veya yörüngenin periyodik olduğunu göstermez." },
    { myth: "RK4 oranı 16 çıkmadıysa algoritma yanlıştır.", truth: "16, baskın dördüncü mertebe hata teriminin geçerli olduğu küçük adım sınırıdır. Sabit sonlu h'de yüksek mertebeli terimler ve yuvarlama etkili olabilir. h ve T'yi değiştirerek araştırmak gerekir; tek oran yöntem mertebesini belirlemez." },
    { myth: "İnce iki hesap anlaşıyorsa uzun yörünge kesin doğrudur.", truth: "Yakın iki yaklaşık sonuç bir hata garantisi değildir. Uzun zaman noktasal doğruluk, kesit istatistikleri ve geometrik görünüm ayrı sorulardır. Sayfa bunları tek bir doğruluk iddiasına birleştirmez." },
  ],
  glossary: [
    { term: "Faz uzayı", definition: "Her noktası sistemin bütün durum değişkenlerini birlikte belirten uzay; burada üç boyutlu (x; y; z)." },
    { term: "İzdüşüm", definition: "Bir uzayı daha az koordinatla gösterme işlemi; farklı durumlar aynı ekran noktasına düşebilir." },
    { term: "Poincaré kesiti", definition: "Akışa enine seçilen yüzey bölümü; bu laboratuvarda z = c üzerinde normal hızın seçilen işareti taşıdığı noktalar." },
    { term: "Dönüş haritası", definition: "Bir kesit durumunu, yeniden dönüyorsa aynı yönlü kesitteki bir sonraki durumuna götüren kural." },
    { term: "Doğrusal ara değerleme", definition: "İki örnek arasındaki değeri doğru parçasıyla kestirme; burada geçiş zamanı ve konumu için kullanılır." },
    { term: "Küresel hata mertebesi", definition: "Sabit son zamanda adım h küçülürken sayısal hatanın başlıca hangi h kuvveti gibi azaldığı." },
    { term: "Değişmez küme", definition: "Tam çözümün, içinde başlayınca içinde kaldığı küme; x = y = 0 ekseni burada bir örnektir." },
    { term: "Diverjans", definition: "Vektör alanının yerel hacim değişimini belirleyen türev toplamı; uzaklık değişimiyle aynı şey değildir." },
  ],
  bridge: {
    heading: "Diferansiyel denklemlerden sayısal analize",
    body: [
      "Diferansiyel Denklemler dersinde çözümün varlığı ve tekliği, denge noktaları, lineerleştirme ve değişmez kümeler bu laboratuvarın dilini kurar. Dinamik Sistemler dersinde akış Φₜ ve kesit S kullanılır: dönüş süresi τ(s) tanımlıysa P(s) = Φ<sub>τ(s)</sub>(s). Üç boyutlu akışın enine kesiti iki boyutludur. Yerel dönüş haritasının türevi kararlılık hakkında bilgi verir; yalnız (xₙ; xₙ₊₁) çiziminden bu iki boyutlu türevi çıkaramazsın.",
      "Sayısal Analiz dersinde ise ayrıklaştırma, yuvarlama ve olay bulma hataları ayrılır. Aynı sabit T'de h, h/2, h/4 hesapları yakınsama mertebesini sınamaya yardım eder; tam eksen çözümü bağımsız bir karşılaştırma sağlar. Kesit için zaman aralığını daraltan olay çözücüleri ve daha yüksek dereceli ara değerleme ayrıca incelenir. Uzun zamanlı kaotik bir hesapta tek bir noktanın doğruluğu ile bir dağılımın doğruluğu ayrı araştırmalardır; ikincisi için de yalnız güzel bir resim yeterli olmaz.",
    ],
    topics: ["Başlangıç değer problemi", "Çözümün tekliği", "Lineerleştirme", "Poincaré dönüş haritası", "Runge–Kutta yöntemleri", "Olay bulma ve yakınsama"],
  },
  quiz: [
    {
      question: "x–y izdüşümünde iki yörünge parçası kesişti. Hangisi zorunlu sonuçtur?",
      options: ["Tam faz uzayında aynı duruma geldiler", "Sistem artık deterministik değildir", "Yalnız çizimdeki x ve y koordinatları çakışır; z farklı olabilir", "Yörünge periyodiktir"],
      answer: 2,
      explanation: "İzdüşüm z bilgisini saklar. Tam durumun tekrarı hakkında karar vermek için üç koordinat gerekir; üstelik çizim sonlu sayısal örnekleri doğru parçalarıyla birleştirir.",
    },
    {
      question: "Bir kesitte 166 yönlü geçiş bulundu; ilk 30'u atıldı. Alt grafikte kaç ardışık (xₙ; xₙ₊₁) çifti kalır?",
      options: ["166", "136", "135", "30"],
      answer: 2,
      explanation: "136 nokta kalır. Sıradaki her komşu çifti bir kez eşlediğin için 135 çift vardır. Son noktayı ilkine bağlamak kapalı ve periyodik bir dizi varsayardı; sayfa bunu yapmaz.",
    },
    {
      question: "Sabit kısa T'de u<sub>h</sub> − u = C h⁴ + daha küçük terimler, C ≠ 0 ve yuvarlama ihmal edilebilir olsun. ‖u<sub>h</sub> − u<sub>h/2</sub>‖ / ‖u<sub>h/2</sub> − u<sub>h/4</sub>‖ neye yaklaşır?",
      options: ["2'ye", "4'e", "16'ya", "Her zaman tam sıfıra"],
      answer: 2,
      explanation: "İlk farkın baskın terimi C h⁴(1 − 1/16), ikincininki C(h/2)⁴(1 − 1/16)'dır. Normların oranında ortak çarpanlar gider ve 16 kalır. Varsayımlar sonlu bir ayarda tam 16 görülmesini veya uzun zaman için hata garantisini gerektirmez.",
    },
  ],
  next: [
    { href: "lorenz-cekici.html", title: "Lorenz: Başlangıç ve Duyarlılık", why: "Parametreleri, yakın başlangıçları ve sonlu zaman duyarlılığını ayrı deneylerle incele." },
    { href: "mandelbrot+lorenz.html", title: "Harita ve Akış", why: "Ayrık bir güncelleme ile sürekli bir türevin neden farklı nesneler olduğunu karşılaştır." },
    { href: "cift-sarkac.html", title: "Çift Sarkaç", why: "Faz uzayı ve başlangıç koşulu fikirlerini mekanik bir sistemle ilişkilendir." },
  ],
  sources: [
    { title: "Edward N. Lorenz · Deterministic Nonperiodic Flow (1963)", url: "https://people.ucsc.edu/~rmont/classes/chao/2013/Orig_Papers/Lorentz_EN.pdf", note: "Özgün makale; §5–7'de konveksiyon denklemleri, denge analizi ve sayısal sonuçlar. Journal of the Atmospheric Sciences 20, 130–141; UCSC kopyası." },
    { title: "MIT · Russ Tedrake, Underactuated Robotics: Poincaré Maps", url: "https://underactuated.mit.edu/simple_legs.html", note: "Enine kesit, dönüş süresi ve haritası; kesit boyutu ile periyodik hareketin kararlılığı arasındaki bağlantı. Bu sayfanın x koordinatlarını tek başına kullanmak için ek bir indirgeme gerekçesi gerekir." },
    { title: "Cleve Moler · Numerical Computing with MATLAB, Ordinary Differential Equations", url: "https://www.mathworks.com/content/dam/mathworks/mathworks-dot-com/moler/odes.pdf", note: "§7.4: Euler, klasik dört aşamalı RK4 ve adım yarılama; klasik RK4 tek başına bir hata kestirimi üretmez. Lorenz modeli ve sayısal çözüm örnekleri de bulunur." },
  ],
  revision: "Kasım 2026",
};
