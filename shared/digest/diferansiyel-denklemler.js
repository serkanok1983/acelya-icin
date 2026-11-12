window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["diferansiyel-denklemler"] = {
  slug: "diferansiyel-denklemler",
  title: "Diferansiyel Denklemler: Yerel Kuraldan Bütün Öyküye",
  field: "Matematik",
  level: "Lisans",
  minutes: 45,
  tagline:
    "Denklem her noktada yalnızca “şimdi nasıl değişiyorum” der. Dört sekmede o yerel kuraldan bütün öyküyü çıkar: sayısal hatayı ölç, dengeleri özdeğerlerle sına, limit çevrimi ve rezonansı yakala.",
  hook:
    "Aynı denklemi aynı adımla (h = 0.025) çöz: Euler 6.39×10⁻⁴ hata yapar, RK4 3.40×10⁻¹⁰. Arada yaklaşık iki milyon kat var ve ikisi de aynı eğim kuralını izliyor. Peki eğimi nerede okuduğun neden bu kadar önemli? Ve bir yöntemin “dördüncü mertebe” olduğunu, ona güvenmeden nasıl ölçersin?",
  bigIdea:
    "Bir diferansiyel denklemin davranışını çoğu zaman çözümü yazmadan okursun: dengeler ve onların <strong>özdeğerleri</strong> neyin çekip neyin ittiğini söyler, sayısal yöntem ise hatası adımla nasıl küçüldüğü ölçülerek sınanır.",
  story: [
    "Leonhard Euler, bugün kendi adıyla anılan yöntemi 1768–1770'te yayımlanan <em>Institutionum calculi integralis</em> kitabında önerdi: bulunduğun noktadaki eğimi al, kısa bir h adımı boyunca sabit say, yeni noktada aynısını yap. Fikir o kadar sadedir ki iki buçuk yüzyıl sonra bile her sayısal çözücünün ilk dersidir. Yaklaşık 1900'de iki Alman matematikçi, Carl Runge (1895) ve Wilhelm Kutta (1901), eğimi adımın içinde birkaç yerde okuyup ağırlıklı ortalamasını alarak aynı adımdan çok daha fazla doğruluk çıkardı. Bu sayfanın RK4'ü, onların adını taşıyan ailenin en ünlü üyesidir.",
    "Aynı dönemde Henri Poincaré başka bir soru soruyordu: çözümü formülle yazamıyorsak, yörüngelerin <em>biçimi</em> hakkında ne söyleyebiliriz? 1889'da İsveç Kralı II. Oscar'ın yarışmasını üç cisim problemi üzerine yazdığı bir çalışmayla kazandı. Düzlemdeki akışlar için bugün Poincaré–Bendixson teoremi diye bilinen sonucun zayıf bir biçimini 1892'de ortaya attı ama tam kanıtlayamadı; kanıtı 1901'de Ivar Bendixson verdi. Bir dengenin yakınında doğrusal sistemin akışı doğru tarif ettiğini söyleyen teoremse çok daha geç geldi: David Grobman (1959) ve Philip Hartman (1960). Bu teorem bir koşul koyar: hiçbir özdeğerin gerçel kısmı sıfır olmamalıdır.",
    "Yirminci yüzyılın başında denklemler elektronikten ve biyolojiden geldi. Philips'te vakum tüplü devrelerle çalışan Balthasar van der Pol, genliği başlangıca değil devrenin kendisine bağlı kararlı salınımlar inceledi. 1926 tarihli makalesinde, yavaş birikip birden boşalan türlerine “gevşeme salınımları” adını verdi. Bugün bunları <strong>limit çevrim</strong> denen yalıtılmış kapalı yörüngelerin bir türü sayıyoruz. 1927'de van der Mark ile birlikte, devreyi belirli frekanslarda sürdüklerinde düzensiz bir gürültü duyduklarını <em>Nature</em>'da bildirdiler; o gürültünün deterministik kaos olduğu çok sonra anlaşıldı. Aynı dönemde Alfred Lotka (1925) ve Vito Volterra (1926) av ile avcının döngüsünü birbirinden bağımsız olarak aynı denklemlerle yazdılar.",
  ],
  core: [
    {
      heading: "Yön alanı, başlangıç değeri ve denge",
      body:
        "y′ = f(t, y) her (t, y) noktasında çözüm eğrisinin eğimini söyler; sayfanın ilk tuvalindeki kısa çizgiler tam budur. f yeterince düzgünse (Lipschitz koşulu) bir başlangıç değeri tek bir çözüm seçer, bu yüzden çözüm eğrileri birbirini kesmez. f(y*) = 0 olan sabit çözümlere <strong>denge</strong> denir. Lojistik denklem y′ = y(1 − y/4) için y* = 0 ve y* = 4'tür; f′(0) = 1 &gt; 0 olduğu için sıfırın yakınındaki küçük sapmalar büyür, f′(4) = −1 &lt; 0 olduğu için 4'ün yakınındakiler söner. Sayfanın denge tablosu bu doğrusal testi, dengenin iki yanından başlatılan gerçek benzetimle yan yana koyar.",
      formula: "y′ = f(t, y), &nbsp; y(t₀) = y₀; &nbsp; f(y*) = 0, &nbsp; f′(y*) &lt; 0 ⇒ kararlı",
      formulaNote: "Doğrusal test f′(y*) = 0 iken susar; o zaman f'nin işaretine dengenin iki yanından bakmak gerekir.",
    },
    {
      heading: "Mertebe: hata adımla nasıl küçülür?",
      body:
        "p. mertebeden bir yöntemin T anındaki küresel hatası küçük h için yaklaşık C·hᵖ'dir: tek adımda yapılan yerel hata hᵖ⁺¹ kadardır, T/h adım biriktiğinde bir h kuvveti düşer. h yarıya inince hata 2ᵖ kat küçülür; bu yüzden log₂[e(h)/e(h/2)] mertebeyi ölçer. Ama bu bir <em>asimptotik</em> iddiadır, yalnızca h → 0 iken geçerlidir. Sayfanın lojistik denkleminde gözlenen mertebe h = 1'den 0.025'e inerken Euler'de 0.89'dan 1.00'a, Heun'da 2.85'ten 2.01'e, RK4'te 4.45'ten 4.01'e yaklaşır. Büyük adımda C·hᵖ'ye eklenen yüksek mertebe terimler henüz küçük değildir.",
      formula: "e(h) ≈ C·hᵖ ⇒ p ≈ log₂[e(h)/e(h/2)]; &nbsp; Euler p = 1, Heun p = 2, RK4 p = 4",
      formulaNote: "Log–log grafikte hata bir doğru olur ve eğimi p'dir; sayfa eğimi yalnız en küçük üç h'den ölçer.",
    },
    {
      heading: "Açık yöntemlerin kararlılık sınırı",
      body:
        "Doğruluk ile kararlılık ayrı şeylerdir. Test denklemi y′ = λy (λ &lt; 0) için Euler'in her adımı çözümü 1 + hλ ile çarpar. |1 + hλ| &gt; 1 olursa gerçek çözüm sönerken sayısal çözüm işaret değiştirerek büyür; bu yuvarlama değil, yöntemin kendisidir. Gerçel negatif λ için sınır Euler ve Heun'da h|λ| ≤ 2, RK4'te yaklaşık 2.785'tir. Çözümün kendisi yavaş değişirken hızlı sönen bir bileşen varsa (büyük |λ|), adımı doğruluk değil kararlılık belirler: buna <strong>sert</strong> denklem denir. Sayfa ∂f/∂y'yi sayısal yol boyunca hesaplar ve sınır aşılınca durum satırında uyarır.",
      formula: "yₙ₊₁ = (1 + hλ)·yₙ ⇒ kararlılık için |1 + hλ| ≤ 1, yani h ≤ 2/|λ|",
      formulaNote: "Heun'un çarpanı 1 + z + z²/2, RK4'ünki 1 + z + z²/2 + z³/6 + z⁴/24'tür (z = hλ).",
    },
    {
      heading: "İz, determinant ve doğrusallaştırmanın sınırı",
      body:
        "x′ = A·x sisteminde özdeğerler λ² − τλ + Δ = 0'dan gelir; τ iz, Δ determinanttır. Δ &lt; 0 ise özdeğerler zıt işaretli gerçeldir: <strong>eyer</strong>. Δ &gt; 0 ve τ² &gt; 4Δ ise düğüm, τ² &lt; 4Δ ise sarmal; τ'nun işareti kararlılığı verir. τ = 0, Δ &gt; 0 ise özdeğerler saf sanaldır: <strong>merkez</strong>. Doğrusal olmayan bir sistemde dengedeki Jacobian bu sınıflamaya sokulur, ama Hartman–Grobman teoremi yalnız Re λ ≠ 0 iken güvence verir. Doğrusal merkez sınırın tam üstündedir: sönümsüz sarkaçta (b = 0) ve Lotka–Volterra'nın iç dengesinde Jacobian merkez der, gerçek merkez olduklarını ise korunan nicelikler (enerji, V = x − ln x + y − 2 ln y) gösterir.",
      formula: "λ = [τ ± √(τ² − 4Δ)]/2, &nbsp; τ = a + d, &nbsp; Δ = ad − bc",
      formulaNote: "λ = α ± iω ise 2π/ω süre sonra her nokta x(t + 2π/ω) = e^(2πα/ω)·x(t) olur: yörünge aynı ışını bu oranla uzaklaşarak ya da yaklaşarak keser. Sayfa bu oranı ölçer.",
    },
    {
      heading: "İkinci mertebe: homojen + özel çözüm ve rezonans",
      body:
        "m·x″ + c·x′ + k·x = F·cos ωt doğrusaldır, bu yüzden her çözüm x = xₕ + xₚ biçimindedir. xₕ karakteristik denklemin kökleriyle söner ve başlangıç koşulunu taşır; xₚ = A cos(ωt − φ) kalıcı yanıttır ve başlangıçtan bağımsızdır. Genlik eğrisinin tepesi ω₀'da değil ω₀√(1 − 2ζ²)'dedir: sönüm tepeyi sola kaydırır ve basıklaştırır, ζ ≥ 1/√2 iken tepe hiç kalmaz. c = 0'da iki frekansın toplamı <strong>vuru</strong> yapar (zarf periyodu 2π/|ω − ω₀|); tam rezonansta (ω = ω₀) özel çözüm t·sin ω₀t biçimini alır ve genlik doğrusal büyür.",
      formula: "ωᵣ = ω₀√(1 − 2ζ²), &nbsp; ζ = c/(2√(mk)); &nbsp; ω = ω₀, c = 0: x = [F/(2mω₀)]·t·sin ω₀t",
      formulaNote: "Doğrusal büyüme hızı F/(2mω₀)'dır; sayfanın varsayılan m = 1, k = 4, F = 1 değerlerinde 0.2500.",
    },
  ],
  lab: {
    intro:
      "Dört sekmenin her birinde benzetimden <strong>ölçülen</strong> değer, kapalı formülden gelen <strong>kuram</strong> değeri ve aradaki fark yan yana durur. <strong>01 · Yön alanı ve sayısal çözüm</strong>: Hazır denklem, Sayısal yöntem ve Adım h menüleriyle hata ve gözlenen mertebe ölçülür; uygun olmayan adımda durum satırı kararlılık uyarısı verir. <strong>02</strong> hazır matris düğmeleriyle faz portresini ve iz–determinant düzlemini, <strong>03</strong> Model menüsüyle dengeleri ve van der Pol limit çevrimini, <strong>04</strong> hazır durum düğmeleriyle sönümü, rezonansı ve vuruyu ölçer. R tuşu etkin sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Adımı yarıya indir: hata kaç kat küçülür?",
        predict: "h yarıya inince hata Euler'de, Heun'da ve RK4'te kaç kat küçülür? Gözlenen mertebe kuramla hemen tutar mı?",
        do: "Sekme 01'de varsayılan lojistik denklemde Euler, h = 0.5 ile e(h), e(h/2) ve gözlenen mertebeyi oku. Sonra Heun ve RK4'ü seç; her birinde h'yi 1'den 0.025'e indir. Sonunda Zamana bağlı: y′ = −2ty, Euler, h = 1'i dene.",
        observe: "Euler h = 0.5: 0.0137 → 6.64×10⁻³, mertebe 1.04 (+4.46 %). Heun h = 0.5'te 2.26, h = 0.1'de 2.03; RK4 h = 0.5'te 4.18, h = 0.1'de 4.03. Eğim kartları 1.016, 2.036, 4.037. Son denemede kesin y(T) 0.027473 iken Euler −1.500000 verir; durum satırı “h·|∂f/∂y| = 4.00 &gt; 2.000” uyarır.",
        explain: "Hata ≈ C·hᵖ yalnız küçük h'de doğrudur; büyük adımda yüksek mertebe terimler ölçümü bozar. Son denemede ∂f/∂y = −2t'dir. h = 1'de Euler yalnız t = 0 ve t = 1'de eğim okur; adım çarpanları 1 − 2t·h = 1 ve −1'dir. İlk adım sönümü hiç görmez, ikincisi çözümü tam kararlılık sınırında ters çevirir: 1.5 → 1.5 → −1.5. Durum satırı ∂f/∂y'yi aralığın sonuna (t = 2, ∂f/∂y = −4) kadar tarar; oradaki h·|∂f/∂y| = 4 değeri, adım biraz daha sürseydi çarpanın −3 olacağını, yani patlamanın kapıda olduğunu söyler.",
      },
      {
        title: "Doğrusallaştırma ne zaman susar?",
        predict: "Sönümlü sarkaçta b'yi 0'a indirirsen θ = 0 dengesinin doğrusal sınıfı ne olur? Benzetim ne der?",
        do: "Sekme 02'de Merkez düğmesine bas ve yarıçap oranını oku. Sekme 03'te Sönümlü sarkaç, b = 0.3 ile (0, 0) satırını oku; sonra b'yi 0 yap. Son olarak Model menüsünden Av–avcı (Lotka–Volterra) seç.",
        observe: "Merkez: λ = 0.000 ± 1.414i, periyot 4.4429, oran 1.0000. Sarkaçta b = 0.3 iken λ = −0.150 ± 0.989i, kararlı sarmal, “uyumlu”. b = 0'da λ = 0.000 ± 1.000i, doğrusal sınıf “merkez: karar veremez”, benzetim ileri ×1.0, geri ×1.0; Uyum: “doğrusal test susuyor; benzetim: merkez”. Lotka–Volterra'nın (1, 2) dengesi de 0.000 ± 1.414i ile aynı durumdadır.",
        explain: "Re λ = 0 iken doğrusal olmayan terimler, küçük de olsa, yörüngeyi içe ya da dışa itebilir; Hartman–Grobman burada bir şey söylemez. Sarkaçta enerji, Lotka–Volterra'da V korunur. Bu yüzden yörüngeler kapalı kalır.",
      },
      {
        title: "Limit çevrim: genlik neden hep 2?",
        predict: "van der Pol'da başlangıç dengenin hemen yanında. μ'yü 0.5'ten 5'e çıkarırsan genlik büyür mü? Periyot formüllerinden hangisi tutar?",
        do: "Sekme 03'te van der Pol salınıcısı seç; denge tablosunda (0, 0) satırına bak. μ = 0.5, 1, 2 ve 5 için limit çevrim genliğini ve üç periyot kartını kaydet.",
        observe: "(0, 0) kararsız sarmaldır (λ = 0.250 ± 0.968i), ama yörünge kaçmaz. Genlik 2.0025, 2.0086, 2.0199, 2.0215. Periyot 6.3807, 6.6633, 7.6299, 11.6122. Küçük μ formülü μ = 0.5'te −0.01 %, μ = 5'te −27.88 % sapar. Büyük μ asimptotu μ = 2'de −13.24 %, μ = 5'te −4.59 %.",
        explain: "x² &lt; 1 iken sönüm negatiftir ve enerji pompalar, x² &gt; 1 iken enerji çeker; denge genliği bu ikisinin ortalamada sıfırlandığı yerdedir. Ortalama yöntemi küçük μ'de 2 verir. Her iki periyot formülü de asimptotiktir: biri μ → 0, öbürü μ → ∞ iken doğruya yaklaşır.",
      },
      {
        title: "Sönüm tepeyi nereye taşır?",
        predict: "c'yi 0.4'ten 1.2'ye ve 2'ye çıkarırsan rezonans tepesi ω₀ = 2'de mi kalır? c = 0'da ne olur?",
        do: "Sekme 04'te varsayılanla tarama tablosunu oku; sonra c = 1.2, 2 ve 3 yap. Ardından Vuru (c = 0) ve Tam rezonans (c = 0) düğmelerine bas.",
        observe: "ωᵣ: 1.9799, 1.8111, 1.4142; Aₘₐₓ: 1.2563, 0.4368, 0.2887. c = 3'te (ζ = 0.75) “tepe yok”. Vuruda zarf periyodu 31.416, kuram 2π/|1.8 − 2| = 31.416. Tam rezonansta tepeler doğrusal büyür: 0.2500, kuram F/(2mω₀) = 0.2500.",
        explain: "A(ω)'nın paydası (k − mω²)² + (cω)²'dir; türevi sıfırlanınca ωᵣ = ω₀√(1 − 2ζ²) çıkar, yani tepe sola kayar ve ζ ≥ 0.707'de kaybolur. c = 0'da sönen bir xₕ yoktur: iki kosinüs vuru yapar, ω = ω₀'da ise t·sin ω₀t büyür.",
      },
    ],
  },
  wow: [
    {
      title: "İki milyon kat, aynı adım",
      body:
        "Sayfanın lojistik denkleminde h = 0.025 ile Euler 6.39×10⁻⁴, RK4 3.40×10⁻¹⁰ hata yapar. RK4 adım başına dört kez eğim hesapladığı için karşılaştırma tam adil değildir; ama Euler'e dört kat küçük adım verilse bile hatası yine 10⁻⁴ mertebesinde kalır. Mertebe, işlem sayısından çok daha güçlü bir kaldıraçtır.",
    },
    {
      title: "Kaosu doğuran yanlış",
      body:
        "Poincaré'nin II. Oscar'ın 1889 yarışmasını kazanan üç cisim çalışmasında bir hata vardı. Çalışma <em>Acta Mathematica</em>'da basılmak üzereyken, metni yayına hazırlayan Lars Edvard Phragmén hatayı fark etti. Poincaré hatasını kabul etti, yanlış sürümün dağıtılması engellendi ve 1890'da düzeltilmiş bir sürüm yayımlandı. Bugün bu hata kaos kuramının doğumu sayılıyor: hatayı onarırken Poincaré, kaotik hareketin ilk matematiksel tarifine ulaştı.",
    },
    {
      title: "Savaş yıllarındaki balıklar",
      body:
        "Deniz biyoloğu Umberto D'Ancona, Adriyatik balık avı kayıtlarında Birinci Dünya Savaşı (1914–18) yıllarında yakalanan avcı balıkların payının arttığını fark etti. Savaşta avcılık azalmıştı; bu yüzden önce av balıklarının çoğalması beklenirdi. D'Ancona'nın sonradan damadı olacak Volterra, 1926 modelini tam bu bilmeceyi açıklamak için kurdu.",
    },
  ],
  worked: {
    title: "Soğuyan kahve: mertebe ve kararlılık",
    prompt:
      "Oda 20 °C, kahve başlangıçta 80 °C ve Newton soğuma yasası T′ = −k(T − 20), k = 0.08 dk⁻¹. (a) T(10)'u kesin bul. (b) Euler'le h = 5, 2.5 ve 1.25 dk adımlarla T(10)'u hesapla ve gözlenen mertebeyi ölç. (c) Hangi adımda Euler fiziksel olmayan sonuç verir?",
    steps: [
      "Kesin çözüm: u = T − 20 dersen u′ = −ku, u = 60·e^(−kt). T(10) = 20 + 60·e^(−0.8) = 20 + 60 × 0.4493 ≈ 46.96 °C.",
      "Euler'in her adımı u'yu (1 − kh) ile çarpar. h = 5 dk: 1 − 0.4 = 0.6, iki adım: u = 60 × 0.36 = 21.6, T = 41.6 °C. h = 2.5 dk: 0.8⁴ = 0.4096, T = 44.58 °C. h = 1.25 dk: 0.9⁸ ≈ 0.4305, T ≈ 45.83 °C.",
      "Hatalar 5.36, 2.38 ve 1.13 °C. Oranlar 5.36/2.38 ≈ 2.25 ve 2.38/1.13 ≈ 2.11; log₂ ile gözlenen mertebe 1.17, sonra 1.07. Kuram 1'dir; kh = 0.4 henüz küçük olmadığı için değere ancak h küçüldükçe yaklaşılır.",
      "Kararlılık: λ = −k = −0.08 dk⁻¹, Euler sınırı h ≤ 2/k = 25 dk. 12.5 &lt; h &lt; 25 dk iken çarpan negatiftir: sayısal kahve oda sıcaklığının altına iner, sonra üstüne çıkar. h = 30 dk'da çarpan −1.4'tür; dört adımda u = 60 × 1.4⁴ ≈ 230.5, yani T(120) ≈ 250.5 °C. Gerçek değer 20.00 °C'dir.",
      "Sayfada aynı dersi gör: sekme 01'de Zamana bağlı: y′ = −2ty seç, Euler'de h = 1 ile −1.500000, h = 0.5 ile 0.000000, h = 0.1 ile 0.018035 çıkar; kesin değer 0.027473'tür.",
    ],
    result:
      "T(10) ≈ 46.96 °C. Euler 5, 2.5 ve 1.25 dakikalık adımlarla 41.6, 44.58 ve 45.83 °C verir; hata her yarılamada yaklaşık yarıya iner (gözlenen mertebe 1.17 → 1.07 → 1). 12.5 dakikadan uzun adımda sayısal kahve oda sıcaklığının altına iner, 25 dakikadan uzun adımda yöntem kararsızdır: kahve “kaynar”.",
  },
  misconceptions: [
    {
      myth: "Mertebesi yüksek yöntem her adım uzunluğunda daha doğrudur.",
      truth:
        "Mertebe yalnız h → 0 için bir sözdür. Sayfanın lojistik denkleminde h = 1 iken Heun'un hatası 0.0522, Euler'inki 0.0253'tür: ikinci mertebe yöntem iki kat kötüdür. h = 0.5'te sıralama döner (7.24×10⁻³'e karşı 0.0137). C katsayısı yönteme ve denkleme bağlıdır.",
    },
    {
      myth: "Euler'in salınıp büyüyen sonucu bilgisayarın yuvarlama hatasıdır.",
      truth:
        "Yuvarlama 10⁻¹⁶ düzeyindedir. Büyüme yöntemin kendi çarpanından gelir: y′ = λy'de her adım 1 + hλ ile çarpar ve |1 + hλ| &gt; 1 ise hata her adımda büyür. Çare daha küçük adım ya da örtük (kapalı) bir yöntemdir, daha çok basamak değil.",
    },
    {
      myth: "Jacobian'ın özdeğerleri her dengenin türünü kesin olarak söyler.",
      truth:
        "Yalnız hiperbolik dengelerde, yani hiçbir özdeğerin gerçel kısmı sıfır değilken. Doğrusal merkezde doğrusal olmayan terimler karar verir: aynı Jacobian'la denge gerçek bir merkez, yavaş bir çekici ya da yavaş bir itici olabilir. Sayfa bu yüzden her dengeyi ayrıca benzetimle sınar.",
    },
    {
      myth: "Rezonans tepesi her zaman doğal frekansta, ω = ω₀'dadır.",
      truth:
        "Sönümlü salınıcıda genlik tepesi ω₀√(1 − 2ζ²)'dedir ve sönüm arttıkça sola kayar: sayfada c = 0.4'te 1.9799, c = 2'de 1.4142. ζ ≥ 0.707 iken tepe kaybolur. Sönümlü serbest salınımın frekansı ω₀√(1 − ζ²) de başka bir sayıdır; üçü yalnız c → 0 iken birleşir.",
    },
  ],
  glossary: [
    { term: "Yön alanı", definition: "Her (t, y) noktasına f(t, y) eğimli kısa bir çizgi koyan resim; çözüm eğrileri bu çizgilere teğettir." },
    { term: "Denge çözümü", definition: "Zamanla değişmeyen çözüm; otonom bir denklemde f(y*) = 0, sistemde iki sıfır eğrisinin kesiştiği nokta." },
    { term: "Küresel hata ve mertebe", definition: "Sayısal çözümün belirli bir T anında kesin çözümden sapması; küçük h için ≈ C·hᵖ ise yöntem p. mertebedir." },
    { term: "Sert denklem", definition: "Kararlılık sınırının adımı, doğruluğun gerektirdiğinden çok daha küçük olmaya zorladığı denklem; örtük yöntemler bunun için vardır." },
    { term: "Jacobian", definition: "Bir vektör alanının kısmi türevlerinden oluşan matris; dengede doğrusallaştırılmış sistemin A matrisi olur." },
    { term: "Hiperbolik denge", definition: "Jacobian'ın hiçbir özdeğerinin gerçel kısmı sıfır olmayan denge; Hartman–Grobman teoremi yalnız bunlar için geçerlidir." },
    { term: "Limit çevrim", definition: "Komşu yörüngelerin sarılarak yaklaştığı (ya da uzaklaştığı) yalıtılmış kapalı yörünge; genliği başlangıca değil denkleme bağlıdır." },
    { term: "Vuru", definition: "Yakın iki frekanslı salınımın toplamında genliğin 2π/|ω − ω₀| periyotla yavaşça büyüyüp küçülmesi." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfa, mühendislik ve fen fakültelerinin ikinci yılındaki <strong>Diferansiyel Denklemler</strong> dersinin iskeletidir: birinci mertebe denklemler ve yön alanları, sabit katsayılı ikinci mertebe denklemler, homojen + özel çözüm, sistemler ve özdeğerler. Derste e^(At) matris üsteli, Laplace dönüşümü ve varlık–teklik teoremi (Picard–Lindelöf) eklenir. <strong>Sayısal Analiz</strong> dersi ise sayfanın ilk sekmesini derinleştirir: yerel ve küresel hata, kararlılık bölgeleri, örtük yöntemler ve hatayı kendi kestirip adımı ayarlayan uyarlanır Runge–Kutta çözücüleri.",
      "Üçüncü sekme <strong>Doğrusal Olmayan Dinamik</strong> derslerine açılan kapıdır. Orada doğrusallaştırmanın sustuğu yerlerde merkez manifoldu ve korunan nicelikler, bir dengenin kararlılık değiştirip çevresinde limit çevrim doğurduğu Hopf çatallanması (van der Pol'da μ sıfırdan geçerken orijin sarmal çukurdan sarmal kaynağa döner, ama çevrim sıfır genlikten büyümez, birden yaklaşık 2 yarıçapla belirir: alışılmadık, dejenere bir örnek) ve iki boyutlu akışların neden kaotik olamadığını söyleyen Poincaré–Bendixson teoremi işlenir. Üç boyuta geçince Lorenz sisteminde kaos ortaya çıkar. Dördüncü sekmenin matematiği ise <strong>Titreşimler</strong>, <strong>Devre Analizi</strong> ve <strong>Kontrol Sistemleri</strong> derslerinde transfer fonksiyonu ve frekans yanıtı adıyla geri döner.",
    ],
    topics: ["Picard–Lindelöf teoremi", "Matris üsteli e^(At)", "Örtük yöntemler ve sertlik", "Uyarlanır adımlı Runge–Kutta", "Hartman–Grobman teoremi", "Hopf çatallanması", "Poincaré–Bendixson teoremi", "Frekans yanıtı ve Laplace dönüşümü"],
  },
  quiz: [
    {
      question: "RK4 ile h = 0.5'te hata 6.77×10⁻⁵ çıktı. Asimptotik bölgede olduğunu varsayarsan h = 0.25'te hatayı yaklaşık kaç beklersin?",
      options: ["3.4×10⁻⁵", "1.7×10⁻⁵", "4.2×10⁻⁶", "2.6×10⁻⁷"],
      answer: 2,
      explanation: "Dördüncü mertebede h yarıya inince hata 2⁴ = 16 kat küçülür: 6.77×10⁻⁵/16 ≈ 4.2×10⁻⁶. Sayfa 3.74×10⁻⁶ gösterir, yani gözlenen mertebe 4.18'dir; h = 0.5 henüz tam asimptotik değildir.",
    },
    {
      question: "y′ = −50y denklemini açık Euler ile çözüyorsun. Sayısal çözümün büyümemesi için adım en çok ne olabilir?",
      options: ["h = 0.5", "h = 0.04", "h = 0.02", "Her h çalışır, çünkü kesin çözüm söner"],
      answer: 1,
      explanation: "Euler çarpanı 1 + hλ = 1 − 50h; |1 − 50h| ≤ 1 için h ≤ 2/50 = 0.04. h &gt; 0.02 iken çarpan negatiftir ve çözüm işaret değiştirerek söner; h &gt; 0.04'te ise büyür. Kesin çözümün sönmesi yöntemi kurtarmaz.",
    },
    {
      question: "Doğrusal olmayan bir sistemin bir dengesinde Jacobian'ın izi 0, determinantı 2'dir. Ne söyleyebilirsin?",
      options: ["Denge kesinlikle bir merkezdir", "Denge kesinlikle kararsızdır", "Doğrusallaştırma karar veremez; doğrusal olmayan terimlere bakmak gerekir", "Denge bir eyerdir"],
      answer: 2,
      explanation: "τ = 0, Δ = 2 özdeğerleri ±1.414i yapar: doğrusal merkez. Re λ = 0 olduğu için Hartman–Grobman geçerli değildir. Lotka–Volterra'da korunan V gerçek merkezi kanıtlar; başka bir sistemde aynı Jacobian yavaş bir sarmal da olabilir.",
    },
  ],
  next: [
    { href: "yay-kutle.html", title: "Yay-Kütle Sistemi: Salınım, Sönüm ve Rezonans", why: "Dördüncü sekmenin fiziği: yay, enerji, üç sönüm rejimi ve rezonans eğrisi, bu kez gerçek birimlerle ölçülür." },
    { href: "av-avci-lotka-volterra.html", title: "Av–Avcı Modeli: Lotka–Volterra Döngüleri ve Ötesi", why: "Burada yalnız doğrusal merkez örneği olan Lotka–Volterra'nın ekolojisi: hasat, gerçekçi av–avcı modeli ve rekabet." },
    { href: "lorenz-cekici.html", title: "Lorenz Çekicisi: Kaos ve Kelebek Etkisi", why: "Üçüncü boyut eklenince Poincaré–Bendixson'ın yasağı kalkar: kelebek etkisi, faz hacmi ve Lorenz haritası." },
    { href: "radyoaktif-bozunma.html", title: "Radyoaktif Bozunma: Rastlantıdan Doğan Yasa", why: "En basit diferansiyel denklem y′ = −λy'nin, tek tek rastlantısal bozunmalardan nasıl doğduğunu gösterir." },
  ],
  sources: [
    { title: "Wikipedia · Euler method", url: "https://en.wikipedia.org/wiki/Euler_method", note: "Yöntemin türetilişi, yerel ve küresel hata, y′ = λy için kararlılık; Euler'in 1768–1770 kitabına atıf (İngilizce)." },
    { title: "Wikipedia · Runge–Kutta methods", url: "https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods", note: "Klasik RK4, Butcher tablosu, Runge (1895) ve Kutta (1901) makaleleri, kararlılık bölgeleri (İngilizce)." },
    { title: "Wikipedia · Van der Pol oscillator", url: "https://en.wikipedia.org/wiki/Van_der_Pol_oscillator", note: "Gevşeme salınımları, limit çevrim, μ = 0'da 2 yarıçaplı çevrimin belirdiği Hopf geçişi, van der Pol ile van der Mark'ın 1927 gözlemi (İngilizce)." },
    { title: "Wikipedia · Lotka–Volterra equations", url: "https://en.wikipedia.org/wiki/Lotka%E2%80%93Volterra_equations", note: "Lotka ve Volterra'nın modeli, D'Ancona'nın Adriyatik verisi, korunan nicelik ve iç dengenin merkez olması (İngilizce)." },
    { title: "MacTutor · Henri Poincaré", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Poincare/", note: "II. Oscar yarışması, Phragmén'in bulduğu hata ve 1890'daki düzeltilmiş sürüm (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
