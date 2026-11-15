window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kontrol-kurami"] = {
  slug: "kontrol-kurami",
  title: "Kontrol Kuramı: Kutuplar, Paylar ve PID",
  field: "Mühendislik",
  level: "Lisans",
  minutes: 35,
  tagline:
    "Termostat, hız sabitleyici, dümen: hepsi ölçer, karşılaştırır, düzeltir. Bir çevrimin sakin mi kalacağını, salınıp mı duracağını birkaç sayı söyler: kutuplar, sınır kazancı ve faz payı.",
  hook:
    "Kazancı biraz artırınca denetleyici hedefe daha hızlı koşar; biraz daha artırınca hedefin çevresinde sonsuza dek sallanmaya başlar. Hiçbir parçası bozulmamış bir sistemi tam olarak hangi sayı kararsız yapar, ve iki saniyelik bir gecikme neden onu yıkmaya yeter?",
  bigIdea:
    "Geri beslemeli bir sistemin bütün davranışı kapalı çevrim <strong>kutuplarının</strong> yerinde saklıdır: sol yarı düzlemde kaldıkça sistem sakinleşir, sanal ekseni geçtikleri an salınım büyür; kazanç ve gecikme yalnızca bu kutupları taşır.",
  story: [
    "Dönen iki ağırlıkla hız ayarlamak Watt'tan eskidir: rüzgâr değirmenlerinde değirmen taşlarının arasını böyle ayarlayan düzenekler kullanılıyordu ve fikir çoğu kaynakta 17. yüzyılda Christiaan Huygens'e bağlanır. James Watt <strong>merkezkaç regülatörünü</strong> 1788 dolaylarında buhar makinesine taktı: makine hızlanınca ağırlıklar açılır, buhar vanasını kısar. Ama makineler büyüdükçe regülatör fazla düzeltmeye başladı; vana açılıp kapanarak salındı. 1868'de James Clerk Maxwell, Royal Society bildirilerinde yayımlanan <em>On Governors</em> makalesinde sorunu doğrusal diferansiyel denklemlerle inceledi ve kararlılığın bir polinomun köklerine bağlı olduğunu gösterdi.",
    "Maxwell'in sorusunu genel bir kurala Edward Routh dönüştürdü. İkisi Cambridge'den tanışıktı: 1854'te Routh matematik sınavında birinci (Senior Wrangler), Maxwell ikinci olmuştu. Routh, 1877'de Adams Ödülü'nü alan kararlılık incelemesinde, kökleri hiç bulmadan yalnız katsayılardan kurulan bir tabloyla sağ yarı düzlemde kök olup olmadığını söyleyen yöntemi verdi; Adolf Hurwitz 1895'te aynı soruyu bağımsız olarak çözdü. Bugün <strong>Routh–Hurwitz ölçütü</strong> diye anılan bu yöntem, sayfanın kök yeri sekmesindeki tablodur.",
    "20. yüzyılda geri besleme gemilere ve telefon hatlarına taşındı. Nicolas Minorsky 1922'de dümencileri gözleyerek, iyi bir dümencinin yalnız şimdiki sapmaya değil geçmiş sapmalara ve sapmanın değişim hızına da baktığını yazdı; üç terimli <strong>PID</strong> denetiminin ilk biçimsel çözümlemesi budur. Harold Black 1927'de Hudson Nehri'ni geçen vapurda <strong>negatif geri beslemeli yükselteci</strong> düşündü ve devreyi bir New York Times sayfasının boşluğuna çizdi. Bell Laboratuvarları'ndan Harry Nyquist 1932'de 'Regeneration Theory' makalesiyle kararlılığı frekans yanıtının eğrisinden okumayı öğretti; Hendrik Bode 1938'de bugün kendi adıyla anılan asimptotik çizimleri kullanmaya başladı; 1940 makalesinde ve 1945 kitabında kazanç ile faz arasındaki bağı kurup kazanç ve faz paylarını tasarımın ölçüsü yaptı.",
    "1940'lar kuramı mühendisin masasına getirdi. John Ziegler ve Nathaniel Nichols 1942'de bir denetleyiciyi yalnız sınır kazancı ve salınım periyodu ölçülerek ayarlayan pratik bir tablo yayımladı. Walter Evans 1948 ve 1950 makalelerinde kazanç arttıkça kutupların izlediği yolu, <strong>kök yerini</strong>, elle çizmeyi öğretti; açıları toplamak ve uzunlukları çarpmak için Spirule adlı plastik bir alet de tasarladı. 1948'de Norbert Wiener <em>Cybernetics</em> kitabında makinelerin ve canlıların kendini düzenlemesini aynı geri besleme diliyle anlattı; kitabın adı Yunanca 'dümenci' sözcüğünden gelir. Bir buhar makinesinin vanasından doğan matematik, bugün uçuş denetiminden insülin pompasına kadar her yerde aynı dört soruyu soruyor: ne kadar hızlı, ne kadar aşma, ne kadar pay, ne kadar hata?",
  ],
  core: [
    {
      heading: "Transfer fonksiyonu: diferansiyel denklemden cebire",
      body:
        "Başlangıçta durgun bir doğrusal sistemin denklemine Laplace dönüşümü uygulanınca türevler s ile çarpmaya döner ve çıkışın girişe oranı s'nin bir kesri olur: <strong>transfer fonksiyonu</strong> G(s). Paydanın kökleri <strong>kutuplardır</strong>: her kutup p yanıta bir e<sup>pt</sup> terimi katar. Gerçel kısmı negatif kutup sönen, sanal eksendeki kutup sönmeyen, sağ yarı düzlemdeki kutup büyüyen bir terim verir. İkinci mertebede kutuplar ω<sub>n</sub> yarıçaplı bir çemberin üzerindedir ve negatif gerçel eksenle yaptıkları θ açısı için cos θ = ζ'dır. Payın kökleri, <strong>sıfırlar</strong>, kararlılığı değiştirmez ama terimlerin ağırlığını değiştirir.",
      formula: "G(s) = Kω<sub>n</sub>²/(s² + 2ζω<sub>n</sub>s + ω<sub>n</sub>²),  s = −ζω<sub>n</sub> ± jω<sub>n</sub>√(1 − ζ²)",
      formulaNote: "ζ sönüm oranı, ω<sub>n</sub> doğal frekans (rad/s); ζ < 1'de kutuplar karmaşık eşleniktir ve yanıt ω<sub>d</sub> = ω<sub>n</sub>√(1 − ζ²) ile salınır.",
    },
    {
      heading: "Basamak yanıtını özetleyen dört sayı",
      body:
        "Az sönümlü ikinci mertebe sistemin birim basamak yanıtı kapalı biçimde çözülür; türevini sıfırlayınca ilk tepe t<sub>p</sub> = π/ω<sub>d</sub>'de, aşma da yalnız ζ'ya bağlı bir değerde çıkar. ω<sub>n</sub>'yi iki katına çıkarmak bütün süreleri yarıya indirir ama aşmaya dokunmaz: aşmayı kutupların <em>açısı</em>, hızı kutupların <em>uzaklığı</em> belirler. Salınımın zarfı e<sup>−ζω<sub>n</sub>t</sup> ile söner; zarf ±%2'ye girdiğinde yerleşme biter, kaba kural 4/(ζω<sub>n</sub>) buradan gelir. Son değeri ise eğriyi beklemeden <strong>son değer kuramı</strong> verir: y(∞) = lim s·G(s)·(1/s) = G(0), yeter ki bütün kutuplar sol yarı düzlemde olsun.",
      formula: "%OS = 100·e<sup>−πζ/√(1−ζ²)</sup>,  t<sub>s</sub> = −ln(0,02·√(1 − ζ²))/(ζω<sub>n</sub>)",
      formulaNote: "ζ = 0,5 için aşma 16,30 %, ω<sub>n</sub> = 2 rad/s'de zarf formülü 4,056 s verir; kaba kural 4/(ζω<sub>n</sub>) = 4,000 s. Sağ yarı düzlem sıfırı varsa bu formüller geçersizdir: yanıt önce ters yöne gider.",
    },
    {
      heading: "Kök yeri ve Routh tablosu",
      body:
        "Birim negatif geri beslemeli çevrimde kapalı çevrim kutupları 1 + K·G(s) = 0'ın kökleridir. K sıfırdan sonsuza giderken bu kökler açık çevrim kutuplarından çıkıp ya sıfırlara ya da asimptotlar boyunca sonsuza gider; çizilen yol <strong>kök yeridir</strong>. Birkaç kural yolu hesap yapmadan çizdirir: n − m dal sonsuza gider, asimptotlar tek bir merkezde buluşur ve eşit açılarla ayrılır; iki dalın gerçel eksenden ayrıldığı nokta dK/ds = 0 koşulundan çıkar. Kutupların sanal ekseni kestiği kazanç ise kök bulmadan Routh tablosundan okunur: ilk sütundaki işaret değişimi sayısı sağ yarı düzlemdeki kök sayısına eşittir, bir satırın sıfırlandığı K <strong>sınır kazancı</strong> K<sub>u</sub>'dur. Örneğin s³ + 3s² + 2s + K için s¹ satırı (6 − K)/3'tür: K<sub>u</sub> = 6, s² satırından 3s² + 6 = 0, yani ω = √2 rad/s.",
      formula: "σ = (Σp − Σz)/(n − m),  açılar = (2k + 1)·180°/(n − m)",
      formulaNote: "p kutuplar, z sıfırlar, n ve m sayıları. 1/[s(s + 1)(s + 2)] için merkez −1, açılar 60°, 180°, 300°.",
    },
    {
      heading: "Bode, paylar, Nyquist ve gecikme",
      body:
        "Çevrimi s = jω boyunca incelemek kararlılığa başka bir kapıdan girer. Açık çevrim L(jω)'nın büyüklüğü 1 olduğu frekans <strong>kazanç kesişimi</strong> ω<sub>c</sub>'dir; orada faz −180°'den ne kadar yukarıdaysa o kadar <strong>faz payı</strong> vardır. Faz −180° olduğunda büyüklük 1'in ne kadar altındaysa o kadar <strong>kazanç payı</strong> vardır. Paylar açık çevrimi kararlı, tek kesişimli sistemlerde güvenilirdir; genel cevap <strong>Nyquist ölçütüdür</strong>: L(jω) eğrisinin −1 noktasını saat yönünde sarma sayısı N, açık çevrimdeki sağ yarı düzlem kutbu sayısı P ise kapalı çevrimde Z = N + P kararsız kutup vardır. Ölü zaman e<sup>−sT</sup> büyüklüğü değiştirmez, yalnız fazı ωT kadar düşürür; bu yüzden ω<sub>c</sub>'de faz payını sıfıra indiren gecikme doğrudan hesaplanır.",
      formula: "Z = N + P,  T* = PM₀/ω<sub>c</sub>",
      formulaNote: "PM₀ gecikmesiz faz payı (radyan). 1/[s(s + 1)(s + 2)], K = 1 için PM₀ = 53,411°, ω<sub>c</sub> = 0,44575 rad/s, T* = 2,0913 s.",
    },
    {
      heading: "PID: şimdi, geçmiş ve eğilim",
      body:
        "Oransal terim hatayı şimdi düzeltir, ama tek başına kalıcı bir hata bırakır: düzeltme yapmak için hata gerekir. G(0) = 1 olan tesiste K<sub>p</sub> = 3 ile hata r/(1 + 3) = 0,25'te durur. İntegral terim geçmiş hataları biriktirir ve hata sıfır olmadan durulmaz; kalıcı hatayı yok eden odur. Türev terim eğilime bakar ve sönüm ekler; sayfada olduğu gibi hataya değil ölçülen çıkışa uygulanırsa hedef basamağında ani bir 'tekme' vermez. Gerçek eyleyicinin sınırı vardır: u doymada kaldıkça integral boşuna büyür ve hedef aşıldıktan sonra uzun süre geri itmeye devam eder. Buna <strong>integral şişmesi</strong> (windup) denir; doymadayken integrali durduran <strong>kenetleme</strong> bunun ilacıdır. Ziegler–Nichols tablosu yalnız K<sub>u</sub> ve T<sub>u</sub>'dan bir başlangıç ayarı verir; çeyrek sönüm hedeflediği için çoğu tesiste büyük aşma yapar.",
      formula: "u = K<sub>p</sub>e + K<sub>i</sub>∫e dt − K<sub>d</sub>·dy/dt,  e<sub>∞</sub> = (r − G(0)d)/(1 + K<sub>p</sub>G(0))",
      formulaNote: "İkinci formül yalnız P denetimi (K<sub>i</sub> = 0) içindir; d tesis girişine eklenen yük bozucusu. Ziegler–Nichols: K<sub>p</sub> = 0,6K<sub>u</sub>, T<sub>i</sub> = T<sub>u</sub>/2, T<sub>d</sub> = T<sub>u</sub>/8.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeli bir laboratuvardır ve her sekmede önce benzetimle ölçer, sonra formülle karşılaştırır. <strong>01 · Transfer fonksiyonu ve basamak yanıtı</strong> s düzlemini ve basamak yanıtını (RK4 ile kapalı biçim üst üste) çizer; aşma, tepe zamanı, yükselme ve yerleşme süreleri ölçülen ve formül çiftleri hâlinde yazılır. <strong>02 · Kök yeri</strong> beş açık çevrim seçeneğinde kökleri K ile izler, sınır kazancını Routh tablosuyla, asimptot ve ayrılma noktalarını kurallarla karşılaştırır. <strong>03 · Bode ve kararlılık payları</strong> faz ve kazanç paylarını, Nyquist sayımını ve <strong>Ölü zaman T</strong> kaydırıcısıyla kritik gecikmeyi ölçer. <strong>04 · PID ayarı</strong> seçili kazançları, benzetimle ölçülen K<sub>u</sub> ve T<sub>u</sub>'dan kurulan Ziegler–Nichols ayarıyla yan yana çalıştırır; doyma ve kenetleme onay kutularıyla açılır. Sayılar ondalık virgülle yazılır; R tuşu etkin sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Aşmayı yalnız açı belirler",
        predict: "ζ = 0,2'de aşma kaç yüzde olur? ω<sub>n</sub>'yi iki katına çıkarırsan aşma mı değişir, süreler mi?",
        do: "Transfer fonksiyonu sekmesinde 'ζ = 0,2 (az sönümlü)' düğmesine bas. Sonra Doğal frekans ω<sub>n</sub> kaydırıcısını 2'den 4'e çek. En sonda 'Sağ yarı düzlem sıfırı' düğmesine bas; bu düğme ζ = 0,5, ω<sub>n</sub> = 2, K = 1 ve a = 1'i kendisi kurar.",
        observe: "Ölçülen aşma 52,66 %, formül 52,66 %; tepe zamanı 1,603 s, yerleşme 9,801 s (zarf formülü 9,831 s, kaba kural 10,00 s). ω<sub>n</sub> = 4'te aşma aynı kalır, tepe zamanı 801,6 ms'ye, yerleşme 4,900 s'ye iner: tam yarıya. Sağ yarı düzlem sıfırında (ζ = 0,5, a = 1) yanıt önce aşağı iner: ters yanıt 75,22 %; aşma 28,57 % olur, formülün 16,30 %'sinden +12,26 puan uzak.",
        explain: "Aşma e<sup>−πζ/√(1−ζ²)</sup> yalnız ζ = cos θ'ya bağlıdır; ω<sub>n</sub> kutupları aynı ışın üzerinde dışarı iter ve zamanı ölçekler. Sağ yarı düzlem sıfırı kutuplara dokunmaz ama türev terimini ters işaretle ekler: y = K[s(t) − h(t)/a], ilk anlarda h(t) baskındır. Formül bu tesis için geçerli değildir.",
      },
      {
        title: "Sanal ekseni hangi kazanç geçer?",
        predict: "1/[s(s + 1)(s + 2)] için K kaçta salınım sönmez olur, ve bu salınım hangi frekansta olur?",
        do: "Kök yeri sekmesinde 'K'yı sınır kazancına getir' düğmesine bas; Routh tablosunun s¹ satırına bak. Sonra Kazanç K kaydırıcısını log 1'e (K = 10) çek. En sonda 'K'yı ayrılma noktasına getir' düğmesine bas.",
        observe: "Kaydırıcı log adımına yuvarlandığı için K = 5,998'e gelir; kökler −3,000 ve −9,498 × 10⁻⁵ ± 1,414j olur: sanal eksenin hemen solunda, salınım çok yavaş söner. Ölçülen sınır kazancı 6,00000, Routh 6,00000; kesişme frekansı 1,41421 rad/s iki yoldan da. K = 10'da sağ yarı düzlem kök sayısı '2 · 2': kök bulucu ve Routh aynı şeyi söyler. Ayrılma düğmesi K'yı 0,3846'ya getirir; ölçülen ve kuraldan hesaplanan ayrılma noktası aynı: −0,422650, K = 0,38490.",
        explain: "Karakteristik polinom s³ + 3s² + 2s + K'dır; Routh tablosunun s¹ satırı (6 − K)/3, K = 6'da sıfırlanır. s² satırı 3s² + 6 = 0 yardımcı polinomunu verir, kökleri ±j√2. Ayrılma noktası dK/ds = 0'dan: 3s² + 6s + 2 = 0, s = −1 + 1/√3 ≈ −0,4226.",
      },
      {
        title: "Gecikme faz payını yer, Nyquist sayar",
        predict: "PM = 53,411° ve ω<sub>c</sub> = 0,44575 rad/s iken hangi ölü zaman çevrimi kararlılık sınırına getirir?",
        do: "Bode ve kararlılık payları sekmesinde 'T'yi kritik gecikmenin yakınına getir' düğmesine bas, sonra Ölü zaman T'yi 2,20 s'ye çek. Ardından Açık çevrim G(s) menüsünden (s + 1)/[s(s − 1)(s + 4)] tesisini seç (K = 10, T = 0 olur).",
        observe: "Benzetimle kritik gecikme 2,0913 s, kuram PM₀/ω<sub>c</sub> 2,0913 s. T = 2,05 s'de PM 1,055°, çevrim hâlâ kararlı; T = 2,20 s'de PM −2,776°, N = 2, Z = 2. Kararsız tesiste kazanç payı 0,600000 (−4,44 dB), yani 1'in altında; ama N = −1 (eğri −1'i saat yönünün tersine bir kez sarar), P = 1, Z = 0: kapalı çevrim kararlı. Bu tesiste K'yı 1,67 kat düşürmek, yani 6'nın altına indirmek çevrimi bozar.",
        explain: "e<sup>−jωT</sup>'nin büyüklüğü 1'dir; ω<sub>c</sub> yerinde kalır, faz ω<sub>c</sub>T kadar düşer. 0,9322 rad / 0,44575 rad/s = 2,091 s. Açık çevrimi kararsız tesiste ise kazancı azaltmak değil artırmak kurtarır (K > 6); payların 'GM > 1' yorumu bozulur, doğru sayımı Nyquist yapar.",
      },
      {
        title: "Ziegler–Nichols ve şişen integral",
        predict: "Klasik Ziegler–Nichols ayarı 1/(s + 1)³ tesisinde elle yapılmış yumuşak bir ayardan daha çok mu aşar? Eyleyici ±2'de doyarsa ne olur?",
        do: "PID ayarı sekmesini varsayılanda bırak ve tablodaki seçili ile Ziegler–Nichols sütunlarını karşılaştır. Sonra 'Doyma ve windup' düğmesine bas; İntegral kenetleme kutusunu aç ve kapat.",
        observe: "Ölçülen K<sub>u</sub> 8,00000, T<sub>u</sub> 3,62760 s; Ziegler–Nichols kazançları K<sub>p</sub> 4,80, K<sub>i</sub> 2,65 s⁻¹, K<sub>d</sub> 2,18 s. Aşma: elle ayar 2,43 %, Ziegler–Nichols 52,20 %; ama bozucuda en büyük sapma 0,1556'ya karşı 0,09427, toparlanma 10,16 s'ye karşı 3,600 s. Doymada aşma kenetleme kapalıyken 55,69 %, açıkken 8,09 %.",
        explain: "(s + 1)³'ün fazı ω = √3 rad/s'de −180°'dir ve orada |G| = 1/8: K<sub>u</sub> = 8, T<sub>u</sub> = 2π/√3. Ziegler–Nichols bozucuyu hızlı bastırmak için sert ayarlar, karşılığında hedef basamağında büyük aşma verir. Doymada hata uzun süre aynı işaretli kalır, integral şişer; kenetleme onu doyma boyunca dondurur.",
      },
    ],
  },
  wow: [
    {
      title: "Dümenciyi izleyen mühendis",
      body:
        "Minorsky'nin denetleyicisi USS New Mexico zırhlısında denendiğinde PI denetimiyle gemi rotasından ±2° sapıyordu; türev terimi eklenince sapma ±1/6°'ye indi, çoğu dümencinin tutturabildiğinden iyi. Donanma sistemi yine de benimsemedi.",
    },
    {
      title: "Bir gazete sayfasındaki devre",
      body:
        "Harold Black'in anlattığına göre negatif geri besleme fikri 1927'de New Jersey'den New York'a giden vapurda aklına geldi; devreyi ve denklemleri elindeki New York Times sayfasına çizdi. Buluş daha sonra 'Wave Translation System' adlı ABD patenti oldu.",
    },
    {
      title: "Birinci ile ikinci",
      body:
        "1854 Cambridge matematik sınavında Routh birinci, Maxwell ikinci oldu; Smith Ödülü ilk kez ikisine birlikte verildi. Maxwell 1868'de regülatörlerin kararlılık sorusunu sordu, Routh 1877'de Adams Ödülü'nü getiren incelemesinde genel cevabını verdi. Routh ayrıca efsanevi bir hocaydı: MacTutor'a göre 1862'den başlayarak yirmi iki yıl boyunca her yıl sınavın birincisi onun öğrencisiydi.",
    },
  ],
  worked: {
    title: "Sınır kazancı, faz payı ve kritik gecikme",
    prompt:
      "Birim negatif geri beslemeli bir çevrimde açık çevrim L(s) = K/[s(s + 1)(s + 2)] (zaman saniye). (a) Kapalı çevrimin kararlı kaldığı en büyük K ve o sınırdaki salınım frekansı nedir? (b) K = 1'de kazanç payı kaç dB'dir? (c) K = 1'de faz payını ve çevrimi kararlılık sınırına getiren ölü zamanı bul.",
    steps: [
      "Karakteristik polinom: s(s + 1)(s + 2) + K = s³ + 3s² + 2s + K. Routh tablosu: s³ satırı [1, 2], s² satırı [3, K], s¹ satırı (3·2 − K)/3 = (6 − K)/3, s⁰ satırı K. İlk sütunun işaret değiştirmemesi için 0 < K < 6: K<sub>u</sub> = 6. Sınırda s² satırı 3s² + 6 = 0, kökler ±j√2: ω = 1,414 rad/s (salınım periyodu 4,44 s).",
      "Kazanç payı: faz kesişimi aynı frekanstadır, çünkü ∠L(jω) = −90° − arctan ω − arctan(ω/2) = −180° koşulu ω = √2'de sağlanır. Orada |L| = 1/[√2·√3·√6] = 1/6. K = 1'de GM = 6, yani 20·log₁₀6 = 15,56 dB.",
      "Kazanç kesişimi: |L(jω)| = 1 için ω²(ω² + 1)(ω² + 4) = 1. x = ω² ile x(x + 1)(x + 4) = 1, sayısal çözüm x ≈ 0,1987, ω<sub>c</sub> ≈ 0,4457 rad/s.",
      "Faz payı: PM = 180° − 90° − arctan(0,4457) − arctan(0,2229) = 90° − 24,03° − 12,56° ≈ 53,41° = 0,9322 rad. Ölü zaman ω<sub>c</sub>'de fazı ω<sub>c</sub>T kadar düşürür, büyüklüğe dokunmaz; PM sıfır olur: T* = 0,9322 rad / 0,4457 rad/s ≈ 2,091 s.",
      "Sayfada doğrula: Kök yeri sekmesinde Routh 6,00000 ve 1,41421 rad/s; Bode sekmesinde ω<sub>c</sub> 0,44575 rad/s, PM 53,411°, GM 6,00000 (15,56 dB), kritik gecikme 2,0913 s okunur.",
    ],
    result:
      "K<sub>u</sub> = 6, ω = √2 ≈ 1,414 rad/s; K = 1'de GM = 6 (15,56 dB), PM ≈ 53,41°, kritik gecikme ≈ 2,09 s. Kazanç payı bol olsa bile iki saniyelik bir ölü zaman bu çevrimi salınımın eşiğine getirir.",
  },
  misconceptions: [
    {
      myth: "Kazancı artırmak denetimi hep iyileştirir.",
      truth:
        "Kazanç yanıtı hızlandırır ve kalıcı hatayı küçültür, ama kapalı çevrim kutuplarını da taşır. 1/[s(s + 1)(s + 2)] için K = 6'da kutuplar sanal eksene varır, K = 10'da iki kök sağ yarı düzlemdedir. Yalnız P denetimiyle 1/(s + 1)³ tesisinde kalıcı hatayı 0,05'e indirmek K<sub>p</sub> = 19 ister; oysa K<sub>u</sub> = 8.",
    },
    {
      myth: "Hızlı sistem daha çok aşar.",
      truth:
        "İkinci mertebede aşma yalnız ζ'ya bağlıdır. ω<sub>n</sub>'yi iki katına çıkarmak tepe ve yerleşme sürelerini yarıya indirir, aşma aynı kalır: kutuplar aynı ışın üzerinde orijinden uzaklaşır.",
    },
    {
      myth: "Kazanç payı 1'in altındaysa (negatif dB) çevrim kesinlikle kararsızdır.",
      truth:
        "Bu yorum açık çevrimi kararlı sistemler içindir. (s + 1)/[s(s − 1)(s + 4)] tesisinde K = 10'da GM = 0,600 (−4,44 dB) ama Nyquist sayımı N = −1, P = 1, Z = 0 verir: çevrim kararlıdır ve bu tesis ancak K > 6'da kararlı olur.",
    },
    {
      myth: "Sağ yarı düzlemdeki sıfır sistemi kararsız yapar.",
      truth:
        "Kararlılığı kutuplar belirler; sıfırlar yalnız yanıtın biçimini değiştirir. Sağ yarı düzlem sıfırı kararlı bir sistemde ters yanıt verir: sayfadaki örnekte çıkış önce son değerinin %75,22'si kadar aşağı iner, sonra hedefe döner. Böyle bir sistem, ilk tepkiye bakıp sert düzelten bir denetleyiciyi yanıltır.",
    },
  ],
  glossary: [
    { term: "Transfer fonksiyonu G(s)", definition: "Başlangıçta durgun doğrusal bir sistemde çıkışın Laplace dönüşümünün girişinkine oranı." },
    { term: "Kutup", definition: "Transfer fonksiyonunun paydasının kökü; yanıta e<sup>pt</sup> biçiminde bir terim katar ve kararlılığı belirler." },
    { term: "Sönüm oranı ζ", definition: "İkinci mertebe sistemde salınımın ne kadar çabuk söndüğünü gösteren boyutsuz sayı; kutupların negatif gerçel eksenle yaptığı açının kosinüsü." },
    { term: "Sınır kazancı K<sub>u</sub>", definition: "Kapalı çevrim kutuplarının sanal ekseni kestiği, çevrimin sönmeyen salınım yaptığı kazanç." },
    { term: "Faz payı", definition: "Kazanç kesişim frekansında açık çevrim fazının −180°'den uzaklığı; çevrimin ne kadar ek gecikmeye dayanacağını söyler." },
    { term: "Kazanç payı", definition: "Faz −180° olduğu frekansta kazancın kaç kat artırılabileceği; çoğunlukla dB ile verilir." },
    { term: "Nyquist ölçütü", definition: "Açık çevrim frekans yanıtının −1 noktasını sarma sayısından kapalı çevrimin kararsız kutup sayısını veren kural, Z = N + P." },
    { term: "İntegral şişmesi (windup)", definition: "Eyleyici doymadayken integral terimin büyümeyi sürdürmesi ve hedef aşıldıktan sonra uzun süre ters düzeltmeyi geciktirmesi." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın konusu elektrik, makine, uzay, kimya ve mekatronik mühendisliği bölümlerinde lisansın ikinci yarısında okutulan <strong>Otomatik Kontrol</strong> (Denetim Sistemleri) dersinin ta kendisidir. Öncesinde <strong>Diferansiyel Denklemler</strong> ve <strong>Sinyaller ve Sistemler</strong> derslerinde Laplace dönüşümü, kısmi kesirler ve frekans yanıtı öğrenilir; kontrol dersi bunları tasarıma çevirir: kök yeriyle kazanç seçmek, Bode çiziminde öncül-artçıl kompanzatör kurmak, Nyquist ile kararlılığı kanıtlamak. Sayfanın her sekmesi bu dersin bir ödev türüne karşılık gelir.",
      "Sonraki adım <strong>durum uzayıdır</strong>: sistem tek bir kesir yerine ẋ = Ax + Bu biçiminde yazılır, kutuplar A matrisinin özdeğerleri olur ve çok girişli, çok çıkışlı sistemler aynı dille ele alınır. Oradan denetlenebilirlik ve gözlenebilirlik, kutup yerleştirme, Kalman süzgeci ve LQR gibi en iyi denetim yöntemleri; bilgisayarla denetimde z dönüşümü ve örnekleme; belirsiz modellere karşı dayanıklı (robust) kontrol ve öngörülü denetim (MPC) gelir. Hepsinin altında bu sayfadaki soru yatar: kutuplar nerede ve onları ne kadar itebiliriz?",
    ],
    topics: ["Laplace dönüşümü", "Kök yeri tasarımı", "Öncül-artçıl kompanzatör", "Durum uzayı ve özdeğerler", "Sayısal kontrol ve z dönüşümü", "LQR ve Kalman süzgeci", "Dayanıklı kontrol"],
  },
  quiz: [
    {
      question: "İkinci mertebe bir sistemde ζ sabit tutulup ω<sub>n</sub> iki katına çıkarılırsa ne olur?",
      options: ["Aşma iki katına çıkar, süreler değişmez", "Aşma değişmez, tepe ve yerleşme süreleri yarıya iner", "Aşma yarıya iner, süreler iki katına çıkar", "Hem aşma hem süreler yarıya iner"],
      answer: 1,
      explanation: "Aşma 100·e<sup>−πζ/√(1−ζ²)</sup> yalnız ζ'ya bağlıdır. Süreler 1/ω<sub>n</sub> ile ölçeklenir: t<sub>p</sub> = π/ω<sub>d</sub>, t<sub>s</sub> ≈ 4/(ζω<sub>n</sub>). Sayfada ζ = 0,2'de ω<sub>n</sub>'yi 2'den 4'e çekince aşma 52,66 %'da kalır, tepe zamanı 1,603 s'den 801,6 ms'ye iner.",
    },
    {
      question: "Bir çevrimin faz payı 53,4°, kazanç kesişimi ω<sub>c</sub> = 0,446 rad/s. Çevrime 1 s ölü zaman eklenirse faz payı yaklaşık kaç olur?",
      options: ["Değişmez, çünkü gecikme büyüklüğü değiştirmez", "Yaklaşık 52,4°", "Yaklaşık 28°", "Sıfırın altına iner"],
      answer: 2,
      explanation: "Gecikme ω<sub>c</sub>'yi değiştirmez ama orada fazı ω<sub>c</sub>T = 0,446 rad ≈ 25,5° düşürür: 53,4° − 25,5° ≈ 28°. Faz payını sıfıra indiren gecikme 0,932 rad / 0,446 rad/s ≈ 2,09 s'dir; Bode sekmesinde 1/[s(s + 1)(s + 2)], K = 1 ile dene.",
    },
    {
      question: "1/(s + 1)³ tesisini yalnız P ile denetliyorsun; K<sub>p</sub> = 3'te kalıcı hata 0,25. Hatayı 0,05'e indirmenin yolu nedir?",
      options: ["K<sub>p</sub>'yi 19'a çıkarmak yeter", "K<sub>p</sub>'yi 6'ya çıkarmak yeter", "Bu tesiste P ile olmaz; gereken K<sub>p</sub> = 19 sınır kazancı 8'in üstünde, integral terim eklenmeli", "Türev terimi eklemek kalıcı hatayı sıfırlar"],
      answer: 2,
      explanation: "e<sub>∞</sub> = 1/(1 + K<sub>p</sub>) = 0,05 için K<sub>p</sub> = 19 gerekir. Ama (s + 1)³'ün fazı ω = √3'te −180°'dir ve orada |G| = 1/8: K<sub>p</sub> > 8'de çevrim kararsızdır. Kalıcı hatayı kararlılığı bozmadan sıfırlayan integral terimdir; türev terim s = 0'da sıfır olduğundan kalıcı hataya dokunmaz.",
    },
  ],
  next: [
    { href: "homeostaz-ve-geri-besleme.html", title: "Homeostaz ve Geri Besleme: Döngü, Glukoz–İnsülin, Isı ve İki Durumluluk", why: "Aynı negatif geri besleme bedende: gecikmeli oransal bir döngünün salınım eşiği, glukoz–insülin ve vücut ısısı düzenlemesi, pozitif geri beslemeyle iki durumluluk." },
    { href: "mekatronik-muhendisligi.html", title: "Mekatronik Mühendisliği Laboratuvarı", why: "Buradaki DC motor modelinin kaynağı: motorun kendi fiziği, enkoderle ölçüm ve örneklenmiş, ayrık bir PID ile servo konumlama." },
    { href: "diferansiyel-denklemler.html", title: "Diferansiyel Denklemler ve Dinamik Sistemler: Yön Alanından Rezonansa", why: "Transfer fonksiyonunun arkasındaki denklemler: doğrusal sistemlerde özdeğerler ve faz portresi, ikinci mertebe sönüm ve rezonans." },
    { href: "karmasik-sayilar.html", title: "Karmaşık Sayılar: Düzlemde Döndürme ve Büyütme", why: "s düzlemini ve L(jω)'yı okumak için gereken geometri: karmaşık çarpmada açılar toplanır, uzunluklar çarpılır; Bode'nin fazı ve büyüklüğü tam budur." },
  ],
  sources: [
    { title: "MIT OpenCourseWare · 16.06 Principles of Automatic Control", url: "https://ocw.mit.edu/courses/16-06-principles-of-automatic-control-fall-2012/", note: "Lisans otomatik kontrol dersi: geri besleme, zaman ve frekans uzayında başarım ölçüleri, kök yeri, Nyquist ölçütü ve durum uzayı (İngilizce)." },
    { title: "Wikipedia · Proportional–integral–derivative controller", url: "https://en.wikipedia.org/wiki/Proportional%E2%80%93integral%E2%80%93derivative_controller", note: "PID'nin tarihçesi: merkezkaç regülatörü, Maxwell 1868, Sperry 1911, Minorsky 1922 ve USS New Mexico denemeleri; ayar yöntemleri (İngilizce)." },
    { title: "Wikipedia · Ziegler–Nichols method", url: "https://en.wikipedia.org/wiki/Ziegler%E2%80%93Nichols_method", note: "Ziegler ve Nichols'ın 1942 tablosu, çeyrek sönüm hedefi ve yöntemin sert ayar ile aşma eğilimi (İngilizce)." },
    { title: "MacTutor · Edward John Routh", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Routh/", note: "Routh'un Maxwell ile 1854 sınavı, Adams Ödülü'nü kazanan kararlılık incelemesi ve hocalığı (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
