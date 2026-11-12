window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["robotik-ve-kinematik"] = {
  slug: "robotik-ve-kinematik",
  title: "Robotik ve Kinematik: Eklem Açılarından Uç Noktaya ve Geri",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Açılardan uç noktaya gitmek tek satırlık bir hesap; geri dönmek ise iki, bir ya da hiç çözümü olan bir bulmaca. Jacobian bu iki yönü birbirine bağlar ve kolun nerede çaresiz kaldığını söyler.",
  hook:
    "Elini masadaki bardağa uzattığında beynin omuz ve dirsek açılarını hiç hesaplamadan seçer. Robota aynı işi yaptırmak için ise şu soruyu çözmek gerekir: ucun (1,20; 0,60) m'ye gitmesi için eklemler kaç dereceye dönmeli? Cevap çoğu zaman iki tanedir, bazen hiç yoktur. Kol tam gerilmeye yaklaşırken ucu tabana doğru çekmek için eklemlerin giderek daha hızlı dönmesi gerekir; gerildiği anda hiçbir sonlu hız yetmez.",
  bigIdea:
    "Bir robot kolunda <strong>ileri kinematik</strong> (açılardan konuma) her zaman tek bir cevap verir; <strong>ters kinematik</strong> (konumdan açılara) ise birden çok ya da hiç cevap verebilir. İkisini birbirine bağlayan <strong>Jacobian</strong>'ın determinantı det J = L₁L₂ sin θ₂ sıfıra yaklaştıkça kol bazı yönlerde hareket edemez hâle gelir.",
  story: [
    "“Robot” sözcüğü bir fabrikadan değil, bir tiyatro sahnesinden çıktı. Karel Čapek 1920'de yazdığı <em>R.U.R.</em> oyununda insan yerine çalışan yapay işçilere bu adı verdi; oyun Ocak 1921'de sahnelendi. Karel Čapek, sözcüğün asıl mucidinin ağabeyi ressam Josef Čapek olduğunu bir gazete yazısında anlatmıştır. Kök, Çekçede serflerin efendileri için yaptığı karşılıksız angarya anlamındaki <em>robota</em>dır. İlginç olan şu: oyundaki robotlar metal makineler değil, insanla karıştırılabilecek yapay biyolojik varlıklardı. Yirmi yıl sonra, Mayıs 1941'de <em>Astounding Science Fiction</em>'da yayımlanan “Liar!” öyküsünde Isaac Asimov <strong>robotics</strong> sözcüğünü kullandı; Oxford İngilizce Sözlüğü'ne göre bu, sözcüğün bilinen ilk kaydıdır.",
    "Bilim kurgu gerçeğe dönüşmekte gecikmedi. George Devol, programlanabilir bir el aktarma makinesi için 10 Aralık 1954'te patent başvurusu yaptı; patent 13 Haziran 1961'de verildi. Devol, iş ortağı Joseph Engelberger ile dünyanın ilk robot üreticisi sayılan Unimation şirketini kurdu. 1961'de ilk <strong>Unimate</strong>, General Motors'un New Jersey'deki (Ewing Township) Inland Fisher Guide fabrikasında çalışmaya başladı ve sıcak döküm parçalarını hattan almak gibi işçiler için tehlikeli bir işi üstlendi. Hidrolik tahrikli, beş serbestlik dereceli bu kol yaklaşık 1,8 ton (4000 libre) ağırlığındaydı ve yapacağı hareketleri bir manyetik tamburda saklıyordu.",
    "Kolları hesaplanabilir kılan dil de aynı yıllarda kuruldu. Jacques Denavit ve Richard Hartenberg 1955'te <em>Journal of Applied Mechanics</em>'te yayımladıkları makalede her eklemi dört sayıyla (θ, d, a, α) tanımlayan, eklemden ekleme matris çarpımıyla geçen bir gösterim önerdiler; bu sayfadaki A<sub>i</sub> = Rot(θ<sub>i</sub>)·Trans(L<sub>i</sub>, 0) matrisleri o gösterimin düzlemdeki en yalın hâlidir. 1969'da Stanford Üniversitesi'nde Victor Scheinman altı serbestlik dereceli <strong>Stanford kolu</strong>nu tasarladı: tabanda iki döner eklem, bir kayar eklem ve küresel bir bilek. Farklı eklem türlerini bir arada taşıdığı için bugün de ders kitaplarında kinematik örneği olarak kullanılır. Bugünkü kaynak, montaj ve cerrahi robotları üç boyutta, çoğu altı eklemle, ama bu sayfadaki aynı üç soruyu çözerek çalışır: uç nerede, oraya nasıl gidilir, nerede takılınır.",
  ],
  core: [
    {
      heading: "İleri kinematik: açıları topla, vektörleri ekle",
      body:
        "İki bağlantılı düzlemsel kolda birinci bağlantı θ₁ açısıyla durur, ikincisi ona göre θ₂ kadar döner; ikinci bağlantının yatayla yaptığı açı θ₁ + θ₂ olur. Uç nokta iki vektörün toplamıdır. Aynı hesabı matrislerle de yapabilirsin: her eklem için önce θ<sub>i</sub> kadar dön, sonra bağlantı boyunca L<sub>i</sub> kadar ilerle. Bu iki hareket 3×3 bir <strong>homojen matrise</strong> sığar; kolun tamamı T = A₁A₂ çarpımıdır. T'nin sol üst 2×2 bloğu ucun yönelimini, son sütunu konumunu verir. Sayfada iki yol aynı noktayı bulur; aradaki fark 2,2 × 10⁻¹⁶ m, yani yalnız bilgisayarın yuvarlama hatası kadardır.",
      formula: "x = L₁cos θ₁ + L₂cos(θ₁+θ₂), y = L₁sin θ₁ + L₂sin(θ₁+θ₂)",
      formulaNote: "Homojen biçim: A<sub>i</sub> = [[cos θ<sub>i</sub>, −sin θ<sub>i</sub>, L<sub>i</sub>cos θ<sub>i</sub>], [sin θ<sub>i</sub>, cos θ<sub>i</sub>, L<sub>i</sub>sin θ<sub>i</sub>], [0, 0, 1]]. Üçüncü boyutta aynı fikir 4×4 matrislerle sürer.",
    },
    {
      heading: "Çalışma alanı: bir halka ve iki kat kaplama",
      body:
        "Uç, tabandan en çok L₁ + L₂, en az |L₁ − L₂| uzağa gidebilir; erişilebilir bölge bir <strong>halkadır</strong>. Alanı π[(L₁+L₂)² − (L₁−L₂)²] = 4πL₁L₂ olur: L₁ = 1, L₂ = 0,7 m için 8,7965 m². Aynı sonuca değişken değiştirmeyle de ulaşılır: eklem açısı düzlemindeki küçük bir dθ₁dθ₂ karesi, uçta |det J|·dθ₁dθ₂ alanlı bir parçaya dönüşür. Eklem uzayının tamamını taradığında halkayı iki kez kaplarsın (dirsek yukarı ve dirsek aşağı), bu yüzden integralin yarısını almak gerekir. Dirsek |θ₂| ≤ θ<sub>sınır</sub> ile kısıtlanırsa iç yarıçap büyür ve alan 2πL₁L₂(1 − cos θ<sub>sınır</sub>) olur: ±90°'de 4,3982 m².",
      formula: "A = ½ ∬ |L₁L₂ sin θ₂| dθ₁ dθ₂ = 4πL₁L₂",
      formulaNote: "θ₁ üzerinden integral 2π, |sin θ₂| üzerinden 4 verir; ½ ile çarpınca 4πL₁L₂.",
    },
    {
      heading: "Ters kinematik: kosinüs teoremi ve iki dal",
      body:
        "Taban, dirsek ve uç bir üçgen oluşturur; kenarları L₁, L₂ ve r = √(x² + y²). <strong>Kosinüs teoremi</strong> cos θ₂'yi doğrudan verir. Arkkosinüs işaret bilmez: θ₂ ve −θ₂ aynı üçgeni verir, bu yüzden genelde iki çözüm vardır. Sayfanın kuralında θ₂ < 0 <strong>dirsek yukarı</strong>, θ₂ > 0 <strong>dirsek aşağı</strong> dalıdır. Hedef halkanın sınırındaysa iki dal birleşir ve tek çözüm kalır; |cos θ₂| > 1 çıkarsa hedefe ulaşılamaz. L₁ = L₂ iken hedef tam tabandaysa θ₁ keyfidir: sonsuz çözüm vardır.",
      formula: "cos θ₂ = (x² + y² − L₁² − L₂²) / (2L₁L₂),  θ₁ = atan2(y, x) − atan2(L₂sin θ₂, L₁ + L₂cos θ₂)",
      formulaNote: "İki θ₂ değerinin her biri kendi θ₁'ini verir. Altı eklemli kollarda dal sayısı daha da artabilir.",
    },
    {
      heading: "Jacobian, tekillik ve kuvvet",
      body:
        "<strong>Jacobian</strong> J, eklem hızlarını uç hızına çeviren 2×2 matristir: v = Jθ′ (θ′ = dθ/dt). Determinantı hesaplandığında θ₁ tümüyle düşer: det J = L₁L₂ sin θ₂. Kol gerginken (θ₂ = 0°) ya da katlıyken (±180°) det J = 0 olur; uç radyal yönde hareket edemez, θ′ = J⁻¹v tanımsızlaşır. Yakınında eklem hızları patlar: uç tabana doğru r′ hızıyla giderken |θ′₂| = r|r′|/(L₁L₂|sin θ₂|). Birim eklem hızlarının uçta çizdiği şekil bir elipstir; yarı eksenleri J'nin tekil değerleri σ₁ ve σ₂, alanı πσ₁σ₂ = π|det J|'dir. Aynı matrisin devriği kuvveti taşır: uç F kuvveti uygularken eklemlerde gereken tork τ = JᵀF. Bu, sanal işten gelir: τ·θ′ = F·v, yani eklemlerin gücü uçtaki güce eşittir.",
      formula: "J = [[−L₁sin θ₁ − L₂sin θ₁₂, −L₂sin θ₁₂], [L₁cos θ₁ + L₂cos θ₁₂, L₂cos θ₁₂]],  det J = L₁L₂ sin θ₂",
      formulaNote: "θ₁₂ = θ₁ + θ₂. Hız J ile, kuvvet Jᵀ ile taşınır; tekillikte kolun hareket edemediği yönde kuvveti tork harcamadan taşıması da buradan gelir.",
    },
    {
      heading: "Sayısal arayış: Jᵀ, DLS ve Newton",
      body:
        "Analitik çözüm her kol için bulunamaz; o zaman tahmin edip düzeltirsin. Hata e = hedef − uç olsun. <strong>Newton</strong> adımı Δθ = J⁻¹e'dir; çözüme yakınken hatanın karesiyle küçülür (mertebe 2) ama tekilliğe yakın J⁻¹ büyür ve adım fırlar. <strong>Jacobian devriği</strong> Δθ = αJᵀe her zaman hatayı azaltan yönde, ama doğrusal ve yavaş ilerler. <strong>Sönümlü en küçük kareler</strong> (DLS) ikisinin arasında durur: Δθ = Jᵀ(JJᵀ + λ²I)⁻¹e. Her tekil yönde adım σe/(σ² + λ²) olur; bu en çok e/(2λ) olabilir, yani tekillikte bile sınırlıdır. Bedeli, hatanın her adımda yalnız λ²/(σ<sub>min</sub>² + λ²) oranında küçülmesidir.",
      formula: "Δθ<sub>DLS</sub> = Jᵀ(JJᵀ + λ²I)⁻¹e,  e<sub>k+1</sub>/e<sub>k</sub> → λ²/(σ<sub>min</sub>² + λ²)",
      formulaNote: "λ → 0 iken Newton'a, λ büyüdükçe küçük adımlı Jᵀ'ye yaklaşır. Yerel yöntemlerin hepsi başlangıç tahmininin yakınındaki dalı bulur.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarda dört sekme var: <strong>01 · İleri kinematik</strong>, <strong>02 · Ters kinematik</strong>, <strong>03 · Jacobian ve tekillik</strong> ve <strong>04 · Yörünge planlama</strong>. Kartların bir kısmı kuramın formülünü, bir kısmı sayfanın kendi ölçümünü gösterir: örneklenmiş hücreleri sayarak bulunan alan, sonlu farklarla alınan Jacobian, sanal işle bulunan tork, konum örneklerinden türetilen hız. Fark kartları ikisini karşılaştırır. Zaman türevleri üs işaretiyle yazılır: θ′ = dθ/dt, θ″ = d²θ/dt². Model yalnız kinematiktir; kütle, yerçekimi ve motor sınırları yoktur.",
    experiments: [
      {
        title: "Halkanın alanı ve ızgaranın payı",
        predict: "L₁ = 1,00 m ve L₂ = 0,70 m kolun ucu kaç metrekare tarar? Hücreleri küçülttükçe ölçülen alan kurama yukarıdan mı, aşağıdan mı yaklaşır?",
        do: "01 · İleri kinematik sekmesinde varsayılan kolla <strong>Alan ızgarası</strong> menüsünü sırayla 60 (kaba), 120 ve 240 (ince) yap. Sonra önce <strong>Dirsek ±90° ile sınırlı</strong>, ardından <strong>Eşit bağlantılar</strong> düğmesine bas (bu sırayla: ±90° düğmesi bağlantı boylarını değiştirmez, eşit bağlantılardan sonra basılırsa 1,00 + 1,00 m kolu sınırlar).",
        observe: "Ölçülen alan 9,1838 → 8,9975 → 8,9036 m², kuram hep 8,7965 m²; fark +4,40 → +2,29 → +1,22 %. Jacobian integrali kartı 8,7965 m² ve 0,0000 % gösterir. ±90° sınırında iç yarıçap 1,221 m'ye büyür ve alan 4,3982 m²'ye iner (ölçülen 4,5439); eşit bağlantılarda iç delik kapanır, sınırlar 0,000 … 2,000 m, kuram 12,5664 m².",
        explain: "Sınırı kesen her hücre tümüyle dolu sayılır; ortalama yarısı boş olduğundan fazlalık kabaca ½ · çevre · h kadardır (60 hücrede ≈ %4), h yarıya inince fark da yaklaşık yarıya iner. ½∬|det J| integrali ise ızgaraya bağlı değildir: halkayı iki kez (iki dirsek dalıyla) kaplayan dönüşümün alan çarpanını toplar.",
      },
      {
        title: "İki çözüm, üç yöntem",
        predict: "(1,20; 0,60) hedefine kaç farklı dirsek duruşuyla ulaşılır? Newton, Jᵀ ve DLS'den hangisi en az yinelemede yakınsar ve hangi dalı bulur?",
        do: "02 · Ters kinematik sekmesinde varsayılan hedefe bak, yakınsama grafiğini izle. Sonra <strong>Öbür dala başla (θ₂ = −30°)</strong> düğmesine bas.",
        observe: "Dirsek yukarı (57,15°; −77,21°), dirsek aşağı (−4,02°; 77,21°). Jᵀ 27, DLS 8, Newton 5 yineleme; Newton ölçülen mertebe 2,06, DLS ölçülen oran 0,04242, kuram λ²/(σ<sub>min</sub>² + λ²) de 0,04242. Yöntem dirsek aşağıyı bulur. Öbür dalda Jᵀ 65, DLS 10, Newton 11 yineleme ve hepsi dirsek yukarıya varır.",
        explain: "Arkkosinüsün iki işareti iki dal verir. Sayısal yöntemler yereldir: başlangıç tahmininin bulunduğu taraftaki çözüme inerler. Newton'un hatası her adımda karesiyle küçülür; DLS'nin oranı sabittir ve çözümdeki en küçük tekil değerden hesaplanabilir.",
      },
      {
        title: "Gergin kolda patlayan eklem hızı",
        predict: "Uç 0,20 m/s ile tabana doğru giderken θ₂ = 60°'den 2°'ye inince eklem hızları kaç kat büyür? 0°'de ne olur?",
        do: "03 · Jacobian ve tekillik sekmesinde varsayılan ayarları oku (Uç hızının yönü: Radyal, tabana doğru). Sonra <strong>Tekilliğe yakın (θ₂ = 2°)</strong> ve <strong>Gergin (θ₂ = 0°)</strong> düğmelerine bas.",
        observe: "det J 0,6062 → 0,0244 m²; elips alanı 1,9045 → 0,0767 m²; gereken θ′ (−0,187; 0,488) → (−5,730; 13,915) rad/s, ters kinematikle ölçülen de aynı. Koşul sayısı 4,182 → 138,3 → ∞ (tekil). Gergin kolda θ′ “tanımsız: det J = 0” yazar. Tork kartı ile sanal işle ölçülen tork her durumda eşittir.",
        explain: "θ′₂ = r|r′|/(L₁L₂ sin θ₂): 1,4799 · 0,2 / 0,6062 = 0,488 rad/s, 1,6997 · 0,2 / 0,02443 ≈ 13,9 rad/s, yani yaklaşık 29 kat. Elips bir eksen boyunca ezilir; o yönde hız üretmek giderek daha büyük eklem hızı ister.",
      },
      {
        title: "Açıları düz çizgide mi, ucu düz çizgide mi götürmeli?",
        predict: "A'dan B'ye giderken iki açıyı aynı zaman profiliyle değiştirirsen uç düz bir çizgi çizer mi? Kübikten beşinci derece profile geçmek neyi değiştirir?",
        do: "04 · Yörünge planlama sekmesinde varsayılanla <strong>Oynat</strong>'a bas ve kartları oku. Sonra <strong>Beşinci derece profil</strong> düğmesine bas.",
        observe: "Eklem yolu AB doğrusundan 59,8 cm sapar ve t = 0,93 s'de engele çarpar; Kartezyen doğru engelden 26,4 cm uzaktan geçer ama θ₁ için 2,185 rad/s ister (T<sub>min</sub> 2,19 s, seçili 2,0 s'yi aşar). Büyük açılı eklem θ₁'dir (Δθ₁ = 115,84°): kübikte tepe hızı 1,5164 rad/s, tepe ivmesi ve θ″(0) 3,033 rad/s². Beşinci derecede θ″(0) = 0,000 olur, tepe ivme 2,9183'e iner, buna karşılık tepe hız 1,8955 rad/s'ye çıkar.",
        explain: "Kinematik doğrusal değildir: açılar arasında doğru, uçta eğri demektir. Kübik profilin ivmesi t = 0'da sıfırdan 6Δθ/T²'ye sıçrar (sonsuz sarsıntı); beşinci derece uçlarda hız ve ivmeyi sıfırlar, bedeli %25 daha yüksek tepe hızdır (1,875 / 1,5).",
      },
    ],
  },
  wow: [
    {
      title: "İlk robotlar etten kemikten yapılmıştı",
      body:
        "Čapek'in 1920 tarihli R.U.R. oyunundaki robotlar dişli ve kablodan değil, insana benzeyen yapay biyolojik dokudan yapılmıştı; fabrikada birleştiriliyorlardı. Karel'in kendi anlatımına göre sözcüğü bulan da o değil, ağabeyi Josef Čapek'ti. Metal robot imgesi sonradan geldi.",
    },
    {
      title: "“Robotik” bir bilim kurgu öyküsünde doğdu",
      body:
        "Oxford İngilizce Sözlüğü'ne göre <em>robotics</em> sözcüğünün bilinen ilk kaydı, Isaac Asimov'un Mayıs 1941'de Astounding Science Fiction'da yayımlanan “Liar!” öyküsüdür. Asimov bu adı gerçek bir mühendislik dalı için değil, kurguladığı bir gelecek için kullandı; dal ona yetişti.",
    },
    {
      title: "Alanı yalnız çarpım belirler",
      body:
        "İki bağlantılı kolun ucunun taradığı alan 4πL₁L₂'dir; bağlantıların toplamı değil çarpımı önemlidir. 1,0 m + 0,7 m bir kol ile 1,4 m + 0,5 m bir kol aynı 8,7965 m²'yi tarar, biri daha uzağa uzansa da. Sayfada L₁ = 1,40 ve L₂ = 0,50 yapıp kuram kartına bak.",
    },
  ],
  worked: {
    title: "Bir hedef, iki duruş, iki farklı yük",
    prompt:
      "L₁ = 1,00 m ve L₂ = 0,70 m kolun ucu (1,20; 0,60) m noktasına gidecek ve orada yüzeye aşağı doğru 10 N bastıracak, yani F = (0; −10) N. İki eklem çözümünü bul, det J'yi hesapla ve her iki duruşta eklemlerin vermesi gereken torkları karşılaştır.",
    steps: [
      "Erişim: r² = 1,20² + 0,60² = 1,80 m², r = 1,3416 m. Halka 0,30 ile 1,70 m arasında, hedef içeride. cos θ₂ = (1,80 − 1,00 − 0,49)/(2 · 1,00 · 0,70) = 0,31/1,40 = 0,2214.",
      "θ₂ = ±arccos 0,2214 = ±77,21°. atan2(0,60; 1,20) = 26,565° ve atan2(0,70 sin 77,21°; 1,00 + 0,70 cos 77,21°) = atan2(0,6826; 1,155) = 30,584°. Dirsek aşağı (θ₂ = +77,21°): θ₁ = 26,565° − 30,584° = −4,02°. Dirsek yukarı (θ₂ = −77,21°): θ₁ = 26,565° + 30,584° = 57,15°.",
      "det J = L₁L₂ sin θ₂ = 1,00 · 0,70 · sin 77,21° = 0,6826 m² (yukarı dalda işareti eksi). Büyüklüğü en büyük olası değer L₁L₂ = 0,70 m²'ye yakın: kol tekillikten uzak, iyi bir duruşta.",
      "τ = JᵀF. F<sub>x</sub> = 0 olduğundan τ₁ = (L₁cos θ₁ + L₂cos θ₁₂)F<sub>y</sub> = x·F<sub>y</sub> = 1,20 · (−10) = −12,0 N·m; iki dalda da aynı, çünkü omuz yalnız ucun yatay uzaklığını görür. τ₂ = L₂cos θ₁₂ · F<sub>y</sub> = (x − L₁cos θ₁)F<sub>y</sub>.",
      "Dirsek aşağı: τ₂ = (1,20 − cos 4,02°)(−10) = (1,20 − 0,9975)(−10) ≈ −2,02 N·m. Dirsek yukarı: τ₂ = (1,20 − cos 57,15°)(−10) = (1,20 − 0,5425)(−10) ≈ −6,57 N·m. Aynı uç, aynı kuvvet; dirsek motoru yukarı duruşta üç kattan fazla zorlanır.",
      "Sayfada dene: 03 · Jacobian ve tekillik sekmesinde θ₁ = −4°, θ₂ = 77° yap (açılar tam derece adımlıdır), F<sub>x</sub> 0, F<sub>y</sub> −10 kalsın. Tork kartı (−12,022; −2,047) N·m, det J 0,6821 m² gösterir; θ₁ = 57°, θ₂ = −77°'de (−12,024; −6,578) N·m. Küçük farklar yuvarlanmış açılardan gelir.",
    ],
    result:
      "Çözümler (−4,02°; 77,21°) ve (57,15°; −77,21°); |det J| = 0,6826 m². Omuz torku iki dalda da −12,0 N·m, dirsek torku ise dirsek aşağıda ≈ −2,0, dirsek yukarıda ≈ −6,6 N·m. Ters kinematiğin iki çözümü arasındaki seçim, motor yükü gibi fiziksel ölçütlerle yapılır.",
  },
  misconceptions: [
    {
      myth: "Erişilebilir her noktaya kol tek bir duruşla ulaşır.",
      truth:
        "İki bağlantılı kolda halkanın içindeki her noktaya iki duruşla (dirsek yukarı, dirsek aşağı) ulaşılır; yalnız sınırda iki dal birleşir. 02 · Ters kinematik sekmesindeki <strong>Sınıra yakın (1,69; 0)</strong> düğmesiyle dalların (5,20°; −12,63°) ve (−5,20°; 12,63°) olarak birbirine yaklaştığını gör. Altı eklemli sanayi kollarında dal sayısı daha da artar.",
    },
    {
      myth: "Newton yöntemi en hızlısı olduğuna göre her zaman en iyisidir.",
      truth:
        "Varsayılan hedefte Newton 5 yinelemeyle kazanır. Ama <strong>Erişim dışı (2,00; 0,50)</strong> hedefinde kol gerilir, J tekilleşir ve Newton 3,267 m hatayla savrulur. Jᵀ ulaşılabilecek en kısa uzaklıkta, 0,3616 m'de durur; DLS λ = 0,10 iken 0,5737 m'de sıçrar, λ = 0,30 yapınca 37 yinelemede 0,3616 m'ye iner. Hız ile sağlamlık arasında bir seçim var.",
    },
    {
      myth: "Uç düz gitsin istiyorsan iki açıyı aynı anda düzgünce değiştirmek yeter.",
      truth:
        "Açılar arasında doğrusal bir yol uçta eğri çizer. 04 · Yörünge planlama sekmesinin varsayılanında bu eğri AB doğrusundan 59,8 cm sapar ve engele çarpar. Ucu gerçekten düz götürmek için her an ters kinematik çözülür; bu Kartezyen yol da tekilliğe yaklaştığında çok yüksek eklem hızı ister (<strong>Deliğin kıyısından geçen doğru</strong>'da θ′₁ 6,235 rad/s).",
    },
    {
      myth: "Kol tam gerginken en güçlü ve en becerikli hâlindedir.",
      truth:
        "Gergin kol tekildir: det J = 0, elips bir doğru parçasına ezilir ve uç radyal yönde hiç hız üretemez. Öte yandan τ = JᵀF gereği kol boyunca etkiyen bir kuvveti eklem torku harcamadan taşır. Yani gergin kol bir yönde güçlü, aynı yönde hareketsizdir; bu ikisi aynı olgunun iki yüzüdür.",
    },
  ],
  glossary: [
    { term: "İleri kinematik", definition: "Eklem açıları bilinirken ucun konumunu ve yönelimini hesaplamak; her zaman tek bir cevabı vardır." },
    { term: "Ters kinematik", definition: "Ucun istenen konumu için eklem açılarını bulmak; iki, bir, sonsuz ya da hiç çözüm çıkabilir." },
    { term: "Homojen dönüşüm matrisi", definition: "Dönme ve ötelemeyi tek bir matris çarpımında birleştiren, düzlemde 3×3, uzayda 4×4 matris." },
    { term: "Çalışma alanı", definition: "Ucun ulaşabildiği noktaların kümesi; iki bağlantılı düzlemsel kolda iç yarıçapı |L₁ − L₂|, dış yarıçapı L₁ + L₂ olan halka." },
    { term: "Jacobian (J)", definition: "Eklem hızlarını uç hızına çeviren kısmi türevler matrisi: v = Jθ′. Devriği kuvveti eklem torkuna çevirir: τ = JᵀF." },
    { term: "Tekillik", definition: "det J = 0 olan duruş; kol bazı yönlerde hareket edemez ve o yönlere yakın hızlar için eklem hızları sınırsız büyür." },
    { term: "Yöndürülebilirlik elipsi", definition: "Birim büyüklükteki bütün eklem hızlarının uçta ürettiği hızların oluşturduğu elips (İngilizce <em>manipulability ellipse</em>); yarı eksenleri J'nin tekil değerleri, alanı π|det J|." },
    { term: "Sönümlü en küçük kareler (DLS)", definition: "Ters kinematik adımı Δθ = Jᵀ(JJᵀ + λ²I)⁻¹e; λ sönümü tekilliğe yakın adımın patlamasını önler, yakınsamayı yavaşlatır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki her şey <strong>Doğrusal Cebir</strong> ve <strong>Çok Değişkenli Kalkülüs</strong> derslerinin doğrudan uygulamasıdır: homojen matrisler bileşke dönüşümdür, Jacobian çok değişkenli zincir kuralıdır, elips tekil değer ayrışımıdır, ½∬|det J| da değişken değiştirme formülüdür. Mühendislik fakültelerindeki <strong>Robotiğe Giriş</strong> dersinde aynı fikirler üç boyuta taşınır: her eklem dört Denavit–Hartenberg parametresiyle 4×4 bir matrise yazılır, altı eklemli bir kolun ters kinematiği için bilekteki eksenlerin kesiştiği özel yapılar kullanılır, tekillikler omuz, dirsek ve bilek tekillikleri diye sınıflanır.",
      "Sayfanın bilerek dışarıda bıraktığı şey <strong>dinamiktir</strong>. Gerçek kolda kütle ve eylemsizlik vardır; hareket denklemi M(θ)θ″ + C(θ, θ′)θ′ + g(θ) = τ biçimindedir ve Lagrange mekaniğiyle türetilir. Torkları üretecek motorları ve onları süren geri besleme döngülerini <strong>Kontrol Sistemleri</strong> dersi, yineleme yöntemlerinin yakınsamasını <strong>Sayısal Analiz</strong> dersi inceler. Yörünge planlama, engelden kaçınma ve en kısa süreli hareket ise eniyileme problemleri olarak lisansüstü düzeye kadar uzanır.",
    ],
    topics: ["Denavit–Hartenberg gösterimi", "Tekil değer ayrışımı", "Değişken değiştirme ve Jacobian", "Newton ve Levenberg–Marquardt yöntemleri", "Lagrange dinamiği", "Yörünge eniyilemesi"],
  },
  quiz: [
    {
      question: "Birinci kol L₁ = 1,0 m, L₂ = 0,7 m; ikinci kol L₁ = 1,4 m, L₂ = 0,5 m. Hangisinin ucu daha geniş bir alan tarar?",
      options: ["Birinci, çünkü bağlantıları birbirine daha yakın", "İkinci, çünkü daha uzağa uzanır (1,9 m)", "İkisi de aynı alanı tarar", "Bu bilgiyle karar verilemez"],
      answer: 2,
      explanation: "Halkanın alanı π[(L₁+L₂)² − (L₁−L₂)²] = 4πL₁L₂'dir. 1,0 · 0,7 = 1,4 · 0,5 = 0,7 m², ikisi de 8,7965 m². İkinci kol daha uzağa uzanır ama iç deliği de daha büyüktür (0,9 m'ye karşı 0,3 m).",
    },
    {
      question: "Uç sabit 0,20 m/s ile tabana doğru gidiyor. Dirsek açısı θ₂ = 60°'den 2°'ye inince dirsek ekleminin hızı yaklaşık kaç kat olur?",
      options: ["Yaklaşık 2 kat", "Yaklaşık 29 kat", "Yaklaşık 870 kat", "Değişmez, çünkü uç hızı aynı"],
      answer: 1,
      explanation: "|θ′₂| = r|r′|/(L₁L₂|sin θ₂|). sin 60° / sin 2° ≈ 24,8; r de 1,48 m'den 1,70 m'ye çıktığı için oran 28,5 olur. Sayfada θ′₂ 0,488'den 13,915 rad/s'ye çıkar. θ₂ → 0'da hız sınırsız büyür.",
    },
    {
      question: "Kübik zaman profili yerine beşinci derece profil seçilince, aynı Δθ ve T için ne olur?",
      options: ["Başlangıç ivmesi sıfır olur ama tepe hız yaklaşık %25 artar", "Hem başlangıç ivmesi hem tepe hız azalır", "Başlangıç hızı sıfırdan farklı olur", "Hiçbir şey değişmez; yalnız formül farklıdır"],
      answer: 0,
      explanation: "Kübik s = 3u² − 2u³'ün ikinci türevi u = 0'da 6'dır: ivme sıfırdan birden başlar. 10u³ − 15u⁴ + 6u⁵ ise uçlarda hızı ve ivmeyi sıfırlar; bunun bedeli tepe hız katsayısının 1,5'ten 1,875'e çıkmasıdır. Sayfada 1,5164 → 1,8955 rad/s.",
    },
  ],
  next: [
    { href: "matris-donusumleri.html", title: "Matris Dönüşümleri: Düzlemi Dört Sayıyla Yeniden Çizmek", why: "Determinantın alan çarpanı olduğunu ve AB ile BA'nın neden farklı olduğunu ölç: Jacobian ve homojen matrislerin arkasındaki doğrusal cebir." },
    { href: "tork-denge.html", title: "Tork ve Denge: Kaldıraç, Ağırlık Merkezi ve Statik", why: "τ = JᵀF'nin tek eklemli hâli: kaldıraç, kiriş ve merdivende ΣF = 0 ve Στ = 0 ile kuvvetin döndürme etkisi." },
    { href: "mekatronik-muhendisligi.html", title: "Mekatronik Mühendisliği Laboratuvarı", why: "Eklemleri gerçekten döndüren parçalar: DC motor, enkoder, servo konumlama ve dişli oranı seçimi." },
    { href: "kontrol-kurami.html", title: "Kontrol Kuramı: Transfer Fonksiyonu, Kök Yeri, Bode ve PID", why: "Planlanan yörüngeyi motora izletmek bir geri besleme problemidir: kutuplar, kararlılık payları ve PID ayarı." },
  ],
  sources: [
    { title: "Wikipedia · Inverse kinematics", url: "https://en.wikipedia.org/wiki/Inverse_kinematics", note: "Analitik ve sayısal ters kinematik, Jacobian tersi ve sözde tersiyle yinelemeli çözüm (İngilizce)." },
    { title: "Wikipedia · Denavit–Hartenberg parameters", url: "https://en.wikipedia.org/wiki/Denavit%E2%80%93Hartenberg_parameters", note: "Her eklemi dört parametreyle tanımlayan 1955 gösterimi ve homojen matrislerle bileşke dönüşüm (İngilizce)." },
    { title: "Wikipedia · Unimate", url: "https://en.wikipedia.org/wiki/Unimate", note: "Devol'un “Programmed Article Transfer” patenti, Engelberger ve Unimation, 1961'de General Motors'ta ilk kurulum, ağırlık ve serbestlik derecesi (İngilizce)." },
    { title: "Wikipedia · R.U.R.", url: "https://en.wikipedia.org/wiki/R.U.R.", note: "Čapek'in 1920 oyunu, “robot” sözcüğünün kökeni ve Josef Čapek'in payı (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
