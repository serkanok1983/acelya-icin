window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["ucak-muhendisligi-ve-aerodinamik"] = {
  slug: "ucak-muhendisligi-ve-aerodinamik",
  title: "Aerodinamik: Havayı Aşağı İten Kanat",
  field: "Mühendislik",
  level: "Lise",
  minutes: 35,
  tagline:
    "Dört yüz tonluk bir uçağı havada tutan şey, atmosfer basıncının yüzde yedisi kadar bir fark. Kanadın bu farkı nasıl yarattığı, ne zaman yaratamadığı ve bunu ilk ölçen iki bisiklet tamircisinin hikâyesi.",
  hook:
    "Bir Boeing 747 kalkışta yaklaşık 400 ton çeker; kanadının altı ile üstü arasındaki basınç farkı ise metrekare başına yalnızca 7 kilopaskal, yani atmosfer basıncının yüzde yedisi kadardır. Bu kadar küçük bir fark bu kadar büyük bir ağırlığı nasıl taşır? Ve neden burnu biraz fazla kaldıran bir pilot, hızı ne olursa olsun, o farkı bir anda kaybeder?",
  bigIdea:
    "Kanat havayı aşağı doğru saptırır; hava da kanadı yukarı iter. Bu itme <em>L = ½ρv²SC<sub>L</sub></em> ile ölçülür ve <strong>hücum açısı</strong> büyüdükçe artar, ta ki akış kanadın sırtından kopup kaldırmanın çöktüğü <strong>tutunma kaybına</strong> kadar.",
  story: [
    "Uçuşun matematiği, motorlardan bir yüzyıl önce başladı. 1799'da İngiliz baronet George Cayley küçük bir gümüş diskin bir yüzüne bir kanat, bir gövde ve bir kuyruk çizdi; öteki yüzüne ise kanada etkiyen kuvveti ikiye ayıran bir diyagram: havaya karşı dik <strong>kaldırma</strong> ve harekete karşı duran <strong>sürükleme</strong>. Bu ayrım küçük görünür ama devrimdir: kuşlar gibi kanat çırparak değil, sabit bir kanatla kaldırma üretip itkiyi ayrı bir kaynaktan alarak uçulabilirdi. Cayley 1804'te bir model planör uçurdu; 1853'te tam boy bir planörün vadiyi aşarken içinde arabacısının oturduğu anlatılır. Alman mühendis Otto Lilienthal 1891'den 1896'ya kadar kendi yaptığı planörlerle iki binden fazla süzülüş yaptı, kanat profillerini ölçüp tablolar yayımladı ve 1896'da bir düşüşte hayatını kaybetti. Tabloları sonraki herkesin başlangıç noktasıydı.",
    "Dayton'da bisiklet dükkânı işleten Wilbur ve Orville Wright, Lilienthal'in tablolarıyla tasarladıkları 1901 planöründen hayal kırıklığıyla döndü: kanat hesaplanan kaldırmanın ancak üçte birini veriyordu. Suçu yorumda değil veride aradılar. 1901 sonbaharında dükkânın arkasına 1.8 metrelik bir rüzgâr tüneli kurup iki yüze yakın küçük kanat biçimini kendi yaptıkları terazide ölçtüler. Hatanın büyüğü, yüz yıldır herkesin kullandığı Smeaton katsayısındaydı: 0.005 sanılan sayı aslında 0.0033 dolayındaydı. Doğru veriyle tasarlanan 1902 planörü, kanat bükme ve hareketli dümenle üç eksende kontrol edilen ilk hava aracı oldu. 17 Aralık 1903 sabahı Kitty Hawk'ta ilk motorlu uçuş 12 saniye sürdü ve 36.6 metre kat etti; aynı gün dördüncü uçuş 59 saniyede 260 metreye ulaştı. Wright'ların üstünlüğü motor değil, ölçüm ve kontroldü.",
    "Kuram, uygulamanın birkaç yıl ardından geldi. 1902'de Martin Kutta ve 1906'da Nikolay Jukovski, kaldırmayı kanadın çevresindeki havanın <strong>sirkülasyonuna</strong> bağladı: birim açıklık başına L′ = ρV<sub>∞</sub>Γ. 1904'te Ludwig Prandtl Heidelberg'deki bir matematik kongresinde, akışkanın yalnızca yüzeye yapışık incecik bir tabakada sürtünme hissettiğini öne süren kısa bir bildiri sundu; <strong>sınır tabaka</strong> kavramı bugün aerodinamiğin omurgasıdır. 1915'te ABD'de kurulan NACA, 1933'te tek bir raporda 78 akraba kanat profilini ölçüp dört haneli bir adlandırma sistemi getirdi: NACA 2412, yüzde 2 kamberi veter uzunluğunun yüzde 40'ında olan, yüzde 12 kalınlıkta bir profildir ve bugün hâlâ Cessna 172'nin kanadındadır. NACA 1958'de NASA'ya dönüştü.",
    "Sayfadaki çizim bu yüz yıllık birikimin bir karikatürüdür: kaldırma katsayısı açıyla doğru orantılı artar, 14 derece dolayında akış ayrılır, ötesinde 'derin stall' yazar. Gerçek bir kanat tasarımında ise mühendis Navier–Stokes denklemlerini süper bilgisayarda çözer, sonra sonucu rüzgâr tünelinde doğrular, sonra da uçuş testinde bir kez daha. Türkiye'de TUSAŞ'ın 2023'te ilk uçuşunu yapan Hürjet'i de bu üçlü süzgeçten geçti. Bu defterde önce denklemi, sonra onu bozan açıyı, sonra da sayfanın nerede dürüst nerede kaba olduğunu göreceksin.",
  ],
  core: [
    {
      heading: "Kaldırma denklemi: dört çarpan",
      body:
        "Kaldırma kuvveti dört şeyle büyür: havanın yoğunluğu ρ, hızın karesi v², kanat alanı S ve kanadın biçimiyle açısını tek sayıda toplayan <strong>kaldırma katsayısı</strong> C<sub>L</sub>. ½ρv² çarpanına <strong>dinamik basınç</strong> denir; deniz seviyesinde (ρ = 1.225 kg/m³) 60 m/s hız için 2205 Pa'dır, yani atmosfer basıncının yüzde ikisi. Yolcu uçaklarının 11 km'de uçmasının bir nedeni budur: orada hava deniz seviyesinin yaklaşık 0.30 katı yoğunluktadır, aynı kaldırma için uçak çok daha hızlı gidebilir ve sürükleme buna rağmen düşük kalır.",
      formula: "L = ½ρv²SC<sub>L</sub>",
      formulaNote: "Düz uçuşta L = W (ağırlık). Hızı iki katına çıkarırsan aynı açıda kaldırma dört katına çıkar.",
    },
    {
      heading: "Hücum açısı: C<sub>L</sub>'nin ayar düğmesi",
      body:
        "<strong>Hücum açısı</strong> α, kanadın veter çizgisi ile gelen hava arasındaki açıdır; uçağın burnunun ufka göre açısı değil. Küçük açılarda C<sub>L</sub> açıyla neredeyse tam doğrusal artar. İnce kanat kuramı eğimi 2π/radyan, yani derece başına yaklaşık 0.11 verir; gerçek kanatlarda 0.09–0.10 çıkar. Kamberli (sırtı şişkin) bir profil sıfır açıda bile kaldırır; sıfır kaldırma için burnu biraz aşağı, NACA 2412'de yaklaşık −2°'ye çevirmek gerekir. Sayfa tam bu doğruyu kullanır: C<sub>L</sub> = 0.25 + 0.09·α.",
      formula: "C<sub>L</sub> ≈ a·(α − α<sub>0</sub>),  a ≈ 0.1/°",
      formulaNote: "α₀ sıfır-kaldırma açısı; simetrik profilde 0°, kamberli profilde negatif.",
    },
    {
      heading: "Basınç mı, momentum mu? İkisi de",
      body:
        "Kaldırmayı iki dille anlatabilirsin ve ikisi de doğrudur. <strong>Bernoulli</strong> dili: kanadın sırtında hava hızlanır, basınç düşer; altında yavaşlar, basınç yükselir; fark yüzeyle çarpılınca kaldırma çıkar. <strong>Newton</strong> dili: kanat geçerken havayı aşağı saptırır, saniyede tonlarca havaya aşağı yönlü momentum verir, hava da kanadı yukarı iter. Yanlış olan, ikisinin arasına sıkıştırılan ünlü hikâyedir: 'üstten giden hava daha uzun yol kat ettiği için alttakiyle aynı anda firar kenarına varmak zorunda.' Böyle bir zorunluluk yoktur; duman tünelinde üstten giden hava alttakinden <em>önce</em> varır. Hızlanmanın gerçek nedeni kanadın çevresine sardığı sirkülasyondur.",
      formula: "L′ = ρ·V<sub>∞</sub>·Γ",
      formulaNote: "Kutta–Jukovski teoremi: birim açıklık başına kaldırma, yoğunluk × hız × sirkülasyon.",
    },
    {
      heading: "Sınır tabaka ve tutunma kaybı",
      body:
        "Prandtl'ın tabakası birkaç milimetre kalınlığındadır ama bütün hikâye orada döner. Kanadın sırtında hava önce hızlanıp basıncı düşürür, sonra firar kenarına doğru yeniden yavaşlayıp basıncı yükseltir; sınır tabakadaki yorgun hava bu 'yokuş yukarı' basınca karşı ilerlemek zorundadır. Açı büyüdükçe yokuş dikleşir; 15°–18° dolayında tabaka yüzeyden kopar, sırtın üstünde girdaplı bir ölü bölge oluşur ve C<sub>L</sub> birden düşer. Buna <strong>tutunma kaybı</strong> (stall) denir. Hızla değil açıyla ilgilidir: yavaşlayan pilot kaldırmayı korumak için burnu kaldırır ve açıyı aşar; ama aynı şey 500 km/sa'de sert bir manevrada da olur.",
      formula: "v<sub>stall</sub> = √(2W / (ρ·S·C<sub>L,maks</sub>))",
      formulaNote: "Kaldırmanın ağırlığa yettiği en düşük hız. Flap C_L,maks'ı büyütür ve bu hızı düşürür.",
    },
    {
      heading: "Sürükleme ve L/D: uçağın kalitesi",
      body:
        "Sürükleme de aynı kalıpla yazılır: D = ½ρv²SC<sub>D</sub>. C<sub>D</sub> iki parçadır: biçim ve sürtünmeden gelen sabit kısım, bir de kaldırmanın bedeli olan <strong>indüklenmiş sürükleme</strong>. Kanat ucunda alttaki yüksek basınç üste dolanır, bir girdap bırakır ve bu girdap enerji götürür; uzun ince kanat (yüksek <strong>açıklık oranı</strong>) bu kaybı küçültür. Bir uçağın kalitesi L/D oranıdır: motor dursa kaç metre ileri gidip bir metre alçalırsın. Yolcu uçaklarında 17–20, yarış planörlerinde 50'nin üstündedir. Breguet menzil denklemi bu oranı doğrudan kilometreye çevirir.",
      formula: "C<sub>D</sub> = C<sub>D,0</sub> + C<sub>L</sub>² / (π·e·AR)",
      formulaNote: "AR = b²/S açıklık oranı, e ≈ 0.8–0.95 verim çarpanı. C_L iki katına çıkınca indüklenmiş sürükleme dört katına çıkar.",
    },
  ],
  lab: {
    intro:
      "Üstteki çizimin üç düğmesi var: <strong>Hücum Açısını Artır</strong>, <strong>Hücum Açısını Azalt</strong> ve <strong>Sıfırla (0°)</strong>. Her basış açıyı 2° değiştirir; alt sınır −2°, üst sınır 22°. Çizimin altındaki satır α'yı, sayfanın hesapladığı C<sub>L</sub>'yi ve akışın durumunu yazar. Dürüst bir uyarı: çizimde kanat, akım çizgileri, basınç okları ve L–D okları hep birlikte eğilir; kanadın akıma göre açısı görsel olarak değişmez, basınç okları da açıdan bağımsızdır. Gözün değil, alttaki sayıların peşinden git; asıl görsel değişim 16°'de gelir.",
    experiments: [
      {
        title: "Her iki derece için 0.18",
        predict: "0°'de satır C<sub>L</sub>≈0.25 yazar. Beş kez 'Artır'a basıp 10°'ye çıkınca kaç yazacak? Artış her adımda aynı mı olacak?",
        do: "'Sıfırla (0°)' ile başla, sonra 'Hücum Açısını Artır'a beş kez bas; her basışta α ve C<sub>L</sub> değerlerini bir tabloya yaz. Akış açıklamasının hangi açılarda değiştiğine de bak.",
        observe: "0.25, 0.43, 0.61, 0.79, 0.97, 1.15: her adımda tam 0.18 artar. Açıklama 0° ve 2°'de 'Tutunmuş (laminer)', 4°–8°'de 'türbülansa geçiş', 10°'de 'Sınır tabaka kalınlaşıyor' olur. L oku her adımda uzar.",
        explain: "Sayfa C<sub>L</sub> = 0.25 + 0.09·α doğrusunu kullanır; 0.09 derece başına eğim, 2° adımda 0.18 eder. Gerçek kanatlarda da küçük açılarda bu doğrusallık geçerlidir; ince kanat kuramı 0.11/° verir. 0.25'lik başlangıç, kamberli bir profilin sıfır açıda bile kaldırdığını söyler.",
      },
      {
        title: "Burnu aşağı: kaldırma nerede sıfırlanır?",
        predict: "Doğru C<sub>L</sub> = 0.25 + 0.09·α ise −2°'de kaç çıkmalı? Sayfa bunu mu yazacak? Sıfır kaldırma için kaç derece gerekirdi?",
        do: "'Sıfırla (0°)' sonra 'Hücum Açısını Azalt'a bir kez bas; ikinci kez basıp bir şey değişip değişmediğine bak. L okunun boyunu 0°'dekiyle karşılaştır.",
        observe: "α = −2°'de satır C<sub>L</sub>≈0.10 yazar, doğrunun verdiği 0.07 değil; ikinci basış −2°'de kalır. Tuhaf olan: L oku 0°'dekinden daha uzundur, çünkü okun boyu açının mutlak değeriyle çizilir, C<sub>L</sub> ile değil.",
        explain: "Sayfa C<sub>L</sub>'yi 0.10'un altına indirmez (kodda bir alt sınır var). Doğruyu uzatırsan sıfır kaldırma yaklaşık −2.8°'de çıkar; gerçek NACA 2412 için bu açı −2° dolayındadır. Kamberli profil, burnu hafif aşağı çevrilmeden 'kaldırmayı bırakmaz'; simetrik bir profil ise tam 0°'de sıfır verir.",
      },
      {
        title: "Tutunma kaybından sonra C<sub>L</sub> ne yapar?",
        predict: "Gerçek bir kanatta tutunma kaybından sonra C<sub>L</sub> düşer. Sayfada 14°'den 22°'ye çıkarken sayı düşecek mi, yoksa yeniden tırmanacak mı?",
        do: "0°'den başlayıp 'Artır'a yedi kez basarak 14°'ye gel; satırı oku, çizime bak. Sonra 16°, 18°, 20° ve 22° için aynı şeyi yap.",
        observe: "14°: C<sub>L</sub>≈1.51 ve 'STALL başlangıcı' yazar ama akım çizgileri hâlâ kanada yapışıktır. 16°'de resim değişir: çizgiler sırttan kopar, kırmızı dalgalı iz belirir, alt yüzey okları kırmızıya döner, C<sub>L</sub> 1.39'a düşer. Sonra 18°'de 1.57, 20°'de 1.75, 22°'de 1.93: sayı yeniden tırmanır ve 14°'deki değeri geçer.",
        explain: "Sayfa 14°'den sonra doğrudan sabit 0.3 çıkarır ama eğimi korur; bu yüzden 'derin stall'da C<sub>L</sub> saçma biçimde büyür. Gerçek ölçümlerde C<sub>L</sub> tepe yaptıktan sonra hızla düşer, çünkü ayrılmış akış sırttaki düşük basıncı yok eder. Modelin sınırı tam burada: tutunma kaybının olduğunu bilir, sonucunu bilmez.",
      },
      {
        title: "Kartlardan hesap: havanın ne kadarı motorun içinden geçer?",
        predict: "Bypass oranı 9 olan bir turbofanda, motora giren havanın yüzde kaçı yanma odasından geçer? Yüzde 10 mu, 50 mi, 90 mı?",
        do: "'İtki Sistemleri' bölümünde <strong>Turbofan</strong> kartına tıkla; CFM56 (BPR≈5.5), GE90 (BPR≈9) ve F119 (BPR≈0.3) değerlerini oku. Her biri için çekirdek payını 1/(1+BPR) ile hesapla.",
        observe: "CFM56: 1/6.5 ≈ yüzde 15; GE90: 1/10 = yüzde 10; F119: 1/1.3 ≈ yüzde 77. Yolcu uçağı motorunda havanın onda dokuzu yanma odasına hiç uğramaz; fanın arkasından geçip gider.",
        explain: "İtki, havaya verilen momentumdur: F = ṁ·Δv. Aynı itkiyi çok havayı az hızlandırarak üretmek, az havayı çok hızlandırmaktan daha az enerji ister; itki verimi yaklaşık 2/(1 + v<sub>çıkış</sub>/v<sub>uçuş</sub>) ile büyür. Yüksek bypass bu yüzden hem daha az yakıt yakar hem daha sessizdir. Savaş uçağı ise ses üstü hız için düşük bypass ve sıcak, hızlı jet ister.",
      },
    ],
  },
  wow: [
    {
      title: "İlk uçuş, bir 747'nin kanat açıklığından kısaydı",
      body:
        "17 Aralık 1903'te Orville Wright'ın ilk motorlu uçuşu 12 saniye sürdü ve 36.6 metre kat etti. Bir Boeing 747-400'ün kanat açıklığı 64.4 metredir: Flyer, bugünkü bir jumbo jetin kanadının bir ucundan ötekine bile ulaşamazdı. Aynı günün dördüncü uçuşu 59 saniyede 260 metreye vardı; sonra bir rüzgâr uçağı yerde yuvarlayıp parçaladı ve Flyer bir daha hiç uçmadı.",
    },
    {
      title: "Manş'ı pedal çevirerek geçen kanat",
      body:
        "12 Haziran 1979'da bisikletçi Bryan Allen, Paul MacCready'nin tasarladığı Gossamer Albatross ile Manş Denizi'ni 2 saat 49 dakikada, 35.8 kilometre pedal çevirerek geçti. Uçağın boş ağırlığı yaklaşık 32 kilogram, kanat açıklığı 29.8 metreydi; yani bir Boeing 737 kadar geniş, bir bisiklet kadar ağır. Denize birkaç karış yükseklikte uçtu, çünkü yere yakın uçmak indüklenmiş sürüklemeyi azaltır.",
    },
    {
      title: "Dönen parçası olmayan motor, Mach 9.6",
      body:
        "16 Kasım 2004'te NASA'nın insansız X-43A'sı, scramjet motoruyla yaklaşık 10 saniye boyunca Mach 9.6'ya, saatte 11 bin kilometreye yakın hıza ulaştı. Scramjetin kompresörü, türbini, pervanesi yoktur; havayı sıkıştıran şey uçağın kendi hızıdır ve yakıt, yanma odasından ses üstü hızla geçen havanın içinde yanar. Bu yüzden kendi başına kalkamaz: X-43A bir roketle Mach 7'ye kadar taşındı.",
    },
  ],
  worked: {
    title: "Küçük bir uçağın seyir açısı ve tutunma kaybı hızı",
    prompt:
      "Kütlesi 1100 kg, kanat alanı 16.2 m² olan tek motorlu bir uçak (Cessna 172 ölçüleri) deniz seviyesinde 60 m/s hızla düz uçuyor. Gereken C<sub>L</sub>'yi, sayfanın modelinde buna karşılık gelen hücum açısını ve sayfanın C<sub>L,maks</sub> = 1.51 değeriyle tutunma kaybı hızını bul.",
    steps: [
      "Düz uçuşta kaldırma ağırlığa eşit: W = m·g = 1100 kg × 9.81 m/s² = 10 790 N.",
      "Dinamik basınç: q = ½ρv² = 0.5 × 1.225 kg/m³ × (60 m/s)² = 2205 Pa. Kanat alanıyla çarp: q·S = 2205 Pa × 16.2 m² = 35 720 N. Kanat, C<sub>L</sub> = 1 olsaydı 3.3 uçak taşırdı.",
      "C<sub>L</sub> = W/(q·S) = 10 790 / 35 720 ≈ 0.30. Sayfanın doğrusuyla açıyı çöz: 0.30 = 0.25 + 0.09·α ⇒ α ≈ 0.6°. Seyirde kanat neredeyse düz uçar; sayfada 0° ile 2° arasındadır.",
      "Tutunma kaybı hızı: v = √(2W/(ρ·S·C<sub>L,maks</sub>)) = √(21 580 / (1.225 × 16.2 × 1.51)) = √(21 580 / 29.97) = √720 ≈ 26.8 m/s. Bu yaklaşık 97 km/sa, havacılık diliyle 52 knot.",
      "Karşılaştır: gerçek Cessna 172'nin flapsız tutunma kaybı hızı el kitabında 50 knot dolayındadır. Sayfanın kaba modeli bile yüzde birkaç içinde doğru çıkar; çünkü formülün gücü C<sub>L,maks</sub>'ın kendisinde değil, karekökün altındaki 2W/ρS oranındadır.",
    ],
    result:
      "Seyirde C<sub>L</sub> ≈ 0.30 ve α ≈ 0.6°; kaldırma 27 m/s'nin (97 km/sa) altında ağırlığa yetmez. Yavaşladıkça pilot açıyı 0.6°'den 14°'ye doğru büyütmek zorundadır; hız düşer ama tutunma kaybını yapan hız değil, açıdır.",
  },
  misconceptions: [
    {
      myth: "Üstten giden hava, alttan gidenle firar kenarında aynı anda buluşmak zorundadır; uzun yolu aynı sürede gittiği için hızlanır.",
      truth:
        "Böyle bir buluşma kuralı yoktur. Duman tünelinde üstten giden hava alttakinden önce varır; üstteki hız farkı bu 'kuralın' öngördüğünden çok daha büyüktür. Üst yüzeyin uzun olması da şart değildir: kâğıt gibi düz bir levha da açı verildiğinde kaldırır. Hızlanmanın nedeni kanadın akışa verdiği sirkülasyondur.",
    },
    {
      myth: "Kaldırmayı ya Bernoulli ya Newton açıklar; biri doğruysa öteki yanlıştır.",
      truth:
        "İkisi aynı olayın iki muhasebesidir. Kanadın yüzeyindeki basınç farkını toplarsan kaldırmayı bulursun (Bernoulli dili); kanadın arkasında aşağı sapan havanın saniyedeki momentumunu toplarsan yine aynı kaldırmayı bulursun (Newton dili). Basınç farkı olmadan hava aşağı sapamaz, hava aşağı sapmadan basınç farkı sürmez.",
    },
    {
      myth: "Tutunma kaybı, uçağın çok yavaşlayıp 'havada duramaması'dır.",
      truth:
        "Tutunma kaybı bir hız değil açı olayıdır: kanat kritik hücum açısını aştığında akış sırttan kopar. Yavaş uçuşta pilot kaldırmayı korumak için burnu kaldırdığından açı sınıra yaklaşır, bu yüzden ikisi karışır. Ama sert bir dönüşte ya da ani bir çekişte uçak yüksek hızda da tutunma kaybına girer. Sayfada 14°'de ne yazdığına bak: hız denklemde yok.",
    },
    {
      myth: "Uçaklar ters uçabildiğine göre kanat profilinin biçimi önemsizdir.",
      truth:
        "Ters uçan akrobasi pilotu burnu kaldırarak kanada yine pozitif hücum açısı verir; kamberli profil ters durumda daha verimsizdir ama açı yetince kaldırır. Akrobasi uçaklarının çoğu bu yüzden simetrik profil kullanır: her iki yöne eşit davranır. Biçim önemsiz değil, açıyla birlikte önemlidir.",
    },
  ],
  glossary: [
    { term: "Hücum açısı (α)", definition: "Kanadın veter çizgisi ile gelen hava akımı arasındaki açı; uçağın ufka göre burun açısıyla karıştırılmamalı." },
    { term: "Veter (chord)", definition: "Kanat profilinin hücum kenarını firar kenarına bağlayan düz çizgi ve onun uzunluğu c." },
    { term: "Kamber", definition: "Profilin orta çizgisinin veterden sapması; kamberli profil sıfır açıda da kaldırır, simetrik profil kaldırmaz." },
    { term: "Kaldırma katsayısı (C_L)", definition: "Kaldırmayı dinamik basınç ve alandan arındıran boyutsuz sayı: C_L = L/(½ρv²S); biçime ve açıya bağlıdır." },
    { term: "Dinamik basınç (q)", definition: "½ρv²; hareket hâlindeki havanın 'bastırma gücü', birimi paskal. Pitot tüpü doğrudan bunu ölçer." },
    { term: "Sınır tabaka", definition: "Yüzeye yapışık, hızın sıfırdan serbest akım hızına çıktığı ince katman; sürtünme ve ayrılma burada olur." },
    { term: "Tutunma kaybı (stall)", definition: "Kritik hücum açısı aşıldığında akışın kanat sırtından ayrılması ve kaldırmanın ani düşüşü." },
    { term: "Açıklık oranı (AR)", definition: "Kanat açıklığının karesinin alana oranı, b²/S; büyük AR indüklenmiş sürüklemeyi azaltır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede kaldırma tek bir denklemdir; uçak mühendisliğinin ilk yıllarında bu denklemin nereden geldiği sorulur. Akışkanlar mekaniğinde havanın hareketi <strong>Navier–Stokes denklemleri</strong>yle yazılır; bunların genel çözümü bilinmez, ama sürtünmeyi ihmal eden potansiyel akış kuramı Kutta–Jukovski teoremini ve C<sub>L</sub> = 2πα sonucunu kalemle türetmeye izin verir. Prandtl'ın sınır tabaka denklemleri sürtünmeyi geri getirir ve ayrılmanın nerede başlayacağını söyler. Hız sese yaklaştığında hava sıkışır; <strong>Mach sayısı</strong>, şok dalgaları ve ok açılı kanatlar sıkıştırılabilir aerodinamik dersinin konusudur.",
      "İkinci sıçrama hesaplamadır. Hesaplamalı akışkanlar dinamiği (CFD) kanadın çevresini milyonlarca küçük hücreye böler ve her hücrede korunum denklemlerini sayısal olarak çözer; sayfadaki C<sub>L</sub> doğrusu, böyle bir hesabın ya da rüzgâr tüneli ölçümünün tek satırlık özetidir. Uçuş mekaniği dersi kararlılığı türevlerle yazar: burun yukarı sapınca kuyruk onu geri çevirir mi? Yapı dersi kanadı σ = M·y/I ile bükülen bir kiriş olarak görür; itki dersi jet motorunu Brayton çevrimiyle, yani termodinamikle anlatır. Hepsinin ortak dili aynıdır: türev, integral ve diferansiyel denklem.",
    ],
    topics: ["Navier–Stokes denklemleri", "Potansiyel akış ve ince kanat kuramı", "Sınır tabaka ve ayrılma", "Sıkıştırılabilir akış ve Mach sayısı", "Hesaplamalı akışkanlar dinamiği (CFD)", "Uçuş mekaniği ve kararlılık türevleri", "Brayton çevrimi ve jet itkisi"],
  },
  quiz: [
    {
      question: "Aynı irtifada ve aynı hücum açısında uçan bir uçak hızını iki katına çıkarırsa kaldırma kuvveti ne olur?",
      options: ["Değişmez", "İki katına çıkar", "Dört katına çıkar", "Yarıya iner"],
      answer: 2,
      explanation: "L = ½ρv²SC_L; ρ, S ve C_L sabitken kaldırma v² ile büyür, 2² = 4. Düz uçuşta kalmak için pilot açıyı küçültüp C_L'yi dörtte bire indirmek zorundadır.",
    },
    {
      question: "Sayfada 'Sıfırla (0°)' dedikten sonra 'Hücum Açısını Artır'a beş kez basarsan satırda hangi C<sub>L</sub> değeri görünür?",
      options: ["0.90", "1.15", "1.51", "0.25"],
      answer: 1,
      explanation: "Beş basış α = 10° yapar; sayfanın doğrusu C_L = 0.25 + 0.09 × 10 = 1.15. 1.51 ise 14°'deki tepe değerdir.",
    },
    {
      question: "Tutunma kaybını (stall) doğrudan belirleyen büyüklük hangisidir?",
      options: ["Uçağın hızı", "Motor gücü", "Hücum açısının kritik değeri aşması", "Uçağın ağırlığı"],
      answer: 2,
      explanation: "Akış, kritik hücum açısı aşıldığında kanat sırtından kopar; bu her hızda olabilir. Hız ve ağırlık yalnızca pilotun o açıya ne zaman yaklaşacağını belirler: ağır ya da yavaş uçakta gereken C_L büyüktür, dolayısıyla açı sınıra yakındır.",
    },
  ],
  next: [
    { href: "akiskanlar-mekanigi.html", title: "Akışkanlar: Bernoulli ve Viskozite", why: "Kanadın sırtında basıncı düşüren denklemi boruda ve suda gör; sınır tabakanın kökü olan viskozite burada." },
    { href: "serbest-dusme.html", title: "Serbest Düşme ve Hava Direnci", why: "Sürükleme denklemi ½ρv²C_D'nin en çıplak hâli: düşen cisim ve limit hız." },
    { href: "otonom-araclar-ve-iha.html", title: "Otonom Araçlar ve İHA", why: "Aynı kanat ve pervane fiziği, bu kez pilotu bilgisayar olan araçlarda." },
    { href: "metalurji-ve-malzeme-muhendisligi.html", title: "Metalurji ve Malzeme Mühendisliği", why: "Sayfadaki Al 2024, Ti-6Al-4V ve karbon fiberin neden seçildiği: dayanım, yorulma ve yoğunluk." },
  ],
  sources: [
    { title: "OpenStax · University Physics Vol. 1, 14.6 Bernoulli's Equation", url: "https://openstax.org/books/university-physics-volume-1/pages/14-6-bernoullis-equation", note: "Bernoulli denkleminin türetimi, uygulamaları ve kanat örneği (İngilizce, açık ders kitabı)." },
    { title: "Wikipedia · Lift (force)", url: "https://en.wikipedia.org/wiki/Lift_(force)", note: "Kaldırmanın Bernoulli ve Newton açıklamaları, yaygın yanlış anlatımlar ve sirkülasyon kuramı; kaynaklı ve dengeli." },
    { title: "Wikipedia · Wright brothers", url: "https://en.wikipedia.org/wiki/Wright_brothers", note: "1901 rüzgâr tüneli, Smeaton katsayısı, 1902 planörü ve 17 Aralık 1903 uçuşlarının belgeli anlatımı." },
    { title: "HyperPhysics · Bernoulli Equation", url: "http://hyperphysics.phy-astr.gsu.edu/hbase/pber.html", note: "Formül odaklı kısa özet; kanat ve venturi örneklerine bağlantılar." },
  ],
  revision: "Ekim 2026",
};
