window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["maxwell-denklemleri-ve-alanlar"] = {
  slug: "maxwell-denklemleri-ve-alanlar",
  title: "Maxwell Denklemleri: Akı, Dolaşım ve Işık",
  field: "Fizik",
  level: "Lisans",
  minutes: 40,
  tagline:
    "Dört denklem, iki soru: kapalı bir yüzeyden ne kadar alan çıkıyor, kapalı bir yol boyunca alan ne kadar dönüyor? İkisini birlikte sorunca ışığın hızı kendiliğinden ortaya çıkıyor.",
  hook:
    "Dolan bir kondansatörün plakaları arasında hiçbir yük akmaz; yine de çevresinde, telin çevresindeki kadar gerçek bir manyetik alan vardır. Bu alanı ne döndürüyor? Maxwell'in cevabı, ışığın ne olduğunu da söyledi.",
  bigIdea:
    "Maxwell denklemleri alanın yalnız iki şeyini söyler, <strong>kapalı yüzeyden akısını</strong> ve <strong>kapalı yol boyunca dolaşımını</strong>; değişen E'nin B'yi, değişen B'nin E'yi döndürdüğü kabul edilince boşlukta hızı 1/√(μ₀ε₀) = c olan bir dalga çıkar.",
  story: [
    "Michael Faraday'ın defterinde 29 Ağustos 1831 tarihli bir deney kayıtlıdır: bir demir halkanın iki yanına iki ayrı bobin sarmış, birini pile bağladığı anda öbüründeki galvanometrenin iğnesi kısa bir an oynamıştı. Akım değil, akımın <em>değişimi</em> öteki bobinde akım doğuruyordu. Joseph Henry benzer gözlemleri 1832'de bağımsız olarak yaptı, ama ilk yayımlayan Faraday oldu. Faraday düşüncelerini matematik diliyle yazmadı; uzayı dolduran kuvvet çizgileriyle düşündü. Bu çizgileri denkleme döken kişi bir kuşak sonra James Clerk Maxwell oldu.",
    "Maxwell, 1861–1862'de dört bölüm hâlinde yayımlanan <em>On Physical Lines of Force</em> makalesinin üçüncü bölümünde Ampère yasasına yeni bir terim ekledi: <strong>yer değiştirme akımı</strong>. Ders kitapları bu terimi genellikle dolan kondansatörün çelişkisiyle tanıtır (bu sayfanın 02. sekmesi de öyle yapar). Tarihî kayıt daha karışıktır: Maxwell terimi dönen moleküler girdaplardan oluşan bir mekanik modelle türetmiş, açıklamasında dielektriklerin kutuplanmasını öne çıkarmıştı; aklından tam olarak neyin geçtiği hâlâ tartışılır. Kesin olan şudur: aynı makalede bulduğu dalga hızı ışık hızına çok yakın çıktı.",
    "Asıl birleştirici metin, Royal Society'de 8 Aralık 1864'te okunan ve 1865'te <em>Philosophical Transactions</em>'ın 155. cildinde (s. 459–512) yayımlanan <em>A Dynamical Theory of the Electromagnetic Field</em>'dir. Maxwell burada yirmi denklem yazdı ve ışığın, alan içinde elektromanyetik yasalarla yayılan bir bozulma olduğu sonucuna vardı. Bugün bildiğimiz dört denklemi 1884'te Oliver Heaviside yazdı: on altısında okulu bırakmış, telgraf memurluğu yapmış bu kendi kendini yetiştirmiş mühendis, Maxwell'in yirmi denkleminin on ikisini diverjans ve rotasyonel diliyle dört diferansiyel denkleme indirdi.",
    "Dalgaları ilk kez laboratuvarda üreten ve yakalayan Heinrich Hertz oldu. 1886–1889 arasında Karlsruhe'de, aralarında 7.5 mm'lik kıvılcım aralığı bulunan iki bir metrelik telden bir verici kurdu; frekansı yaklaşık 50 MHz'ti. Alıcı, uçları arasında mikrometre ayarlı kıvılcım aralığı olan tek bir tel halkaydı. Vericiyi bir çinko levhadan yaklaşık 12 metre uzağa koyarak duran dalgalar oluşturdu; yansımayı, kutuplanmayı ölçtü ve dalgaların ışık hızıyla ilerlediği sonucuna vardı. Hertz 1894'te, 36 yaşında öldü.",
  ],
  core: [
    {
      heading: "Akı: kapalı yüzey yalnız içeriyi sayar",
      body:
        "Kapalı bir yüzeyi küçük hücrelere böl, her hücrede alanın dışa dik bileşenini hücre alanıyla çarp ve topla: bu <strong>akıdır</strong>. Gauss yasası, sonucun yüzeyin biçimine ve dışarıdaki yüklere hiç bakmadığını söyler. Dışarıdaki bir yükün çizgileri yüzeye bir yerden girer, başka bir yerden çıkar; giren ve çıkan akı birbirini götürür. Bu yüzden 01. sekmede küre de olsa, merkezden kaydırılmış bir küp de olsa ölçülen değer içerideki yükü verir. Diverjans teoremi aynı yasayı noktasal biçime çevirir: alan bir noktadan net olarak yalnız orada yük varsa dışarı fışkırır.",
      formula: "∮ E·dA = Q<sub>iç</sub>/ε₀  ⇔  ∇·E = ρ/ε₀",
      formulaNote: "2 nC için Q/ε₀ = 225.88 N·m²/C. Simetri yoksa yasa akıyı verir ama alanı tek başına vermez.",
    },
    {
      heading: "∮B·dA = 0: kutuplu küre ile mıknatıs neden ayrışır?",
      body:
        "Sayfadaki iki kürenin dışarıdaki alanı aynı biçimdedir: ikisi de birer dipol. İçeride ise yolları ayrılır. Kutuplanmış kürede E içeride düzgündür ve P'ye ters yönlüdür (−P/(3ε₀)), çünkü yüzeyde <strong>bağlı yük</strong> σ = P cos θ birikmiştir: bir yarıküre artı, öbürü eksi. Mıknatıslanmış kürede B içeride de düzgündür ama M ile aynı yöndedir ((2/3)μ₀M = 10.0 mT), çünkü onun kaynağı yüzeyde dönen akımlardır, manyetik yük değil. Kaynak küreyi kesen bir yüzey kutuplu kürede artı yüklü yarının bir parçasını sarar ve net elektrik akısı görür; mıknatısta ise B çizgileri içeriden geri döndüğü için her çizgi yüzeyden bir kez girer, bir kez çıkar. Tek bir manyetik kutup hiç gözlenmedi; ikinci Gauss yasası bunu söyler.",
      formula: "∮ B·dA = 0  ⇔  ∇·B = 0",
      formulaNote: "Kesilen kutuplu kürede sarılan bağlı yük πR²P(1 − u₀²) = 5.890 nC; mıknatısta karşılığı tam sıfırdır.",
    },
    {
      heading: "Dolaşım: Faraday, ve akı geçmeyen yoldaki E",
      body:
        "Kapalı bir yol boyunca alanın yola teğet bileşenini topla: bu <strong>dolaşımdır</strong>. Faraday yasası, E'nin dolaşımının yolun sardığı manyetik akının değişim hızına eşit olduğunu söyler (eksi işareti Lenz kuralı). Sonsuz bir solenoidde B yalnız içeridedir, ama indüklenen E dışarıda da vardır: (R²/2r)|dB/dt|. Solenoidi sarmayan bir yolda E sıfır değildir, ama yolun bir yanında akışla aynı, öbür yanında ters yönde ilerlenir ve toplam sıfır çıkar. Sayfa E'nin biçimini eş merkezli çemberlerdeki simetriden alır; ölçtüğü şey bu alanın keyfi biçimli yollardaki sayısal çizgi integrali ve ayrıca yolun içindeki akının zaman türevidir. İki bağımsız hesabın uyuşması, Stokes teoreminin sınavıdır.",
      formula: "∮ E·dl = −dΦ<sub>B</sub>/dt  ⇔  ∇×E = −∂B/∂t",
      formulaNote: "Yolu solenoidin dışında büyütmek dolaşımı değiştirmez: akı yalnız solenoidin içindedir. Yolda E zayıflar, yol uzar, çarpım aynı kalır.",
    },
    {
      heading: "Yer değiştirme akımı: aynı yol, iki yüzey",
      body:
        "Ampère yasası bir yolun dolaşımını yolun sınırladığı yüzeyden geçen akıma bağlar. Ama bir yolun sınırladığı sonsuz sayıda yüzey vardır. Dolan kondansatörde düz disk (S₁) teli keser ve I'yı sayar; aynı yoldan plakaların arasına inen bir kap (S₂) teli hiç kesmez. Yalnız iletim akımıyla iki yüzey farklı cevap verir. Maxwell'in terimi ε₀ dΦ<sub>E</sub>/dt bu açığı kapatır: plakalar arasında yük birikirken E büyür ve değişen elektrik akısı, kesilen akımın yerini tam tutar. Yolu plakaların arasına indirirsen iki yüzey de yalnız yer değiştirme akımını sayar ve B = μ₀I<sub>d</sub>/(2πs) olur: orada hiç yük akmadığı hâlde B sıfır değildir. Bu terim olmadan ∇×B = μ₀J ile ∇·J = −∂ρ/∂t (yük korunumu) çelişir, çünkü bir rotasyonelin diverjansı her zaman sıfırdır.",
      formula: "∮ B·dl = μ₀(I<sub>iç</sub> + ε₀ dΦ<sub>E</sub>/dt)  ⇔  ∇×B = μ₀J + μ₀ε₀ ∂E/∂t",
      formulaNote: "ε₀ dΦ_E/dt bir yük akışı değildir; birimi amperdir ve Ampère yasasında akımla aynı rolü oynar.",
    },
    {
      heading: "Dört denklemden dalga denklemine",
      body:
        "Yükün ve akımın olmadığı boşlukta Faraday'ın iki yanının rotasyonelini al ve sağ yana Ampère–Maxwell'i koy: ∇×(∇×E) = −μ₀ε₀ ∂²E/∂t². Vektör özdeşliği ∇×(∇×E) = ∇(∇·E) − ∇²E ve ∇·E = 0 ile bu, ∇²E = μ₀ε₀ ∂²E/∂t² dalga denklemidir. Hızı CODATA 2022 sabitlerinden 1/√(μ₀ε₀) = 299792457.9998 m/s çıkar; tanım gereği tam olan c = 299792458 m/s'den farkı yalnız sabitlerin 11 basamağa yuvarlanmasıdır. x yönünde giden E<sub>y</sub> = f(x − ct) için Faraday B<sub>z</sub> = E<sub>y</sub>/c verir: E, B ve ilerleme yönü karşılıklı diktir, enerji akısı Poynting vektörü S = E×B/μ₀ ile taşınır.",
      formula: "∇²E = μ₀ε₀ ∂²E/∂t²,  c = 1/√(μ₀ε₀),  E = cB",
      formulaNote: "04. sekmede 100 MHz ve E₀ = 30 V/m: λ = 2.998 m, B₀ = 100.1 nT, ⟨S⟩ = 1.194 W/m², ⟨u⟩ = 3.984 nJ/m³.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var. <strong>01 · Gauss yasaları (akı)</strong> bir kapalı yüzeyin (küre ya da küp) her hücresinde alanı hesaplayıp toplar ve sonucu kuramla karşılaştırır; <strong>Ağ</strong> menüsü hücre sayısını, alttaki grafik bağıl hatanın N ile nasıl küçüldüğünü gösterir. <strong>02 · Faraday ve Ampère–Maxwell</strong> sekmesinin <strong>Deney</strong> menüsünde iki deney var: değişen solenoid akısı ve dolan kondansatör. <strong>03 · Elektromanyetik dalga (FDTD)</strong> bir Gauss darbesini bir boyutlu Yee ızgarasında yürütür; <strong>Sona atla</strong> ölçümleri hemen verir. <strong>04 · Denklemlerin özeti ve birimler</strong> dört denklemi, dalga denkleminin türetimini ve bir düzlem dalga hesabını toplar. Her sekmede <strong>Fark</strong>, (ölçülen − kuram)/kuram oranıdır; kuram sıfırken sayfa yüzde yerine ölçülen değerin çıkan akıya oranını verir.",
    experiments: [
      {
        title: "Dışarıdaki yük akıyı değiştirir mi?",
        predict: "Varsayılan kürede (a = 0.8 m) q₁ = 2 nC içeride, q₂ = −1 nC dışarıda. q₁'i de dışarı çıkarırsan toplam akı ne olur? Yüzeyi küpe çevirip kaydırırsan ne değişir?",
        do: "01. sekmede varsayılan değerleri oku. Sonra <strong>Yükler dışarıda</strong> düğmesine bas (x₁ = −1.2 m). Ardından <strong>Kayık küp</strong>'ü dene (küp, x_c = 0.6 m, a = 0.7 m) ve altı yüzün tablosuna bak.",
        observe: "Varsayılanda ölçülen 225.97 N·m²/C, kuram 225.88 N·m²/C (fark +0.039 %). Yükler dışarıdayken ölçülen −0.088751 N·m²/C: çıkan akı Φ₊ = 32.394, giren Φ₋ = −32.483, net değer Φ₊'nın yalnız −0.274 %'si; <strong>Ağ</strong>'ı 128 yapınca −0.0054490 N·m²/C'ye (−0.017 %) iner. Kayık küpte ölçülen 112.96, kuram 112.94 N·m²/C, Q_iç = 1.000 nC: küp artık q₂'yi de sarıyor.",
        explain: "Dışarıdaki yükün çizgileri yüzeye girip yeniden çıkar; katkısı sıfırdır ama yerel alanı değiştirir, bu yüzden Φ₊ ve Φ₋ tek tek büyüktür. Küçük artık orta nokta toplamının hatasıdır, ağı sıklaştırınca 1/N² gibi küçülür. Küpte toplam yine Q_iç/ε₀'dır: 2 − 1 = 1 nC için 112.94 N·m²/C.",
      },
      {
        title: "Mıknatısı kesmek tek kutup verir mi?",
        predict: "Merkezi kaynak kürenin yüzeyinde duran bir küre (x_c = 0.5 m, a = 0.5 m) mıknatıslanmış kürenin +x yanındaki bir parçasını sarıyor (yüzeyde θ < 60° kapağını). Net B akısı sıfır mı çıkar? Aynı yüzey kutuplanmış küreyi kesince elektrik akısı?",
        do: "<strong>Mıknatısı kes</strong> düğmesine bas, sonucu oku; <strong>Ağ</strong>'ı 64 ve 128 yap. Sonra <strong>Kutuplu küreyi kes</strong>'e bas ve sarılan bağlı yükü oku.",
        observe: "Mıknatısta net akı 51.80 µWb; ama giren ve çıkan akılar 5.614 mWb ve −5.563 mWb kadar büyüktür, net değer Φ₊'nın yalnız 0.923 %'si. Ağ sıklaştıkça işareti değişerek ve düzensizce küçülür: 64'te −0.598 %, 128'de 0.255 %. Kutuplu kürede ise ölçülen 666.67 N·m²/C, kuram 665.28 N·m²/C (fark +0.209 %), Q_b,iç = 5.890 nC.",
        explain: "Mıknatısın içindeki B çizgileri kesilen yüzeyden çıkar ama küre içinden geri dönüp yine aynı yüzeyden girer; artık değer kenarı kesen hücrelerin sayısal hatasıdır, fiziksel bir yük değildir. Kutuplanmış kürede ise yüzeyde gerçek bir bağlı yük σ = P cos θ vardır; kesilen yüzey artı yüklü kutup kapağını sarar. Dış alanları aynı olan iki kaynağı Gauss yasası ayırır.",
      },
      {
        title: "Akı geçmeyen yolda E var mı?",
        predict: "Solenoidi sarmayan küçük bir çember (r = 3 cm, merkezi x = 12 cm) üzerinde E sıfır mı? Dolaşım sıfır mı? Varsayılan çemberde (r = 8 cm) dolaşımı πR²·dB/dt ile kestir.",
        do: "02. sekmede Deney: <strong>Faraday: değişen akı, dönen E</strong>. Varsayılan kartları oku, sonra <strong>Solenoidi sarmayan yol</strong>'a bas. Ardından <strong>B tepedeyken</strong>'i dene; son olarak <strong>Sıfırla</strong>'ya bas ve Yarıçap r'yi 0.15 m'ye çıkar.",
        observe: "Varsayılanda ∮E·dl = −49.35 mV, −dΦ/dt = −49.34 mV, kuram −49.35 mV; dB/dt = 6.283 T/s, A_∩ = 78.540 cm². Sarmayan yolda üçü de 0 V, ama yolda ortalama |E| = 66.51 mV/m. B tepedeyken (B = 20.00 mT) dB/dt = 0 olur ve hepsi sıfırlanır. r = 0.15 m'de dolaşım yine −49.35 mV, ortalama |E| 98.17'den 52.36 mV/m'ye düşer.",
        explain: "Kuram −πR²·B₀·2πf = −π(0.05 m)²·6.283 T/s = −49.35 mV. Dolaşımı B değil, B'nin değişimi belirler; bu yüzden en büyük alan anında sıfırdır. E solenoidin dışında da vardır, ama solenoidi sarmayan bir yolda iki yanın katkısı birbirini götürür. Solenoidi saran her yol aynı akıyı sardığı için aynı dolaşımı verir.",
      },
      {
        title: "Kondansatörde iki yüzey, bir cevap",
        predict: "Plaka yarıçapı 10 cm, yol yarıçapı s = 5 cm. Plakalara inen bir kap (S₂) teli kesmez. S₂'den geçen akım ne olur, payları nasıl bölünür? Biot–Savart toplamından J_d'yi çıkarırsan ne olur? Yolu plakaların arasına indirirsen B ne kadar küçülür?",
        do: "Deney: <strong>Ampère–Maxwell: dolan kondansatör</strong>. Varsayılan kartları oku. Sonra <strong>Yol plakadan geniş</strong>'e (s = 0.20 m), ardından <strong>Maxwell terimi olmadan</strong>'a, en son <strong>Yol plakaların arasında</strong>'ya (z₀ = 0) bas.",
        observe: "Varsayılanda ∮B·dl/μ₀ = 1.00000 A, S₁ = 1.00000 A (tümü iletim), S₂ = 1.00000 A = plakadaki akım 0.7500 A + ε₀dΦ_E/dt 0.2500 A. Geniş yolda S₂'nin tamamı yer değiştirme akımıdır (1.000 A). Maxwell terimi olmadan Biot–Savart 0.991145 A verir (−0.885 %) ve hiçbir yüzeyle uyuşmaz. Yol aralıktayken S₁ = S₂ = 0.250000 A, plakadaki akım 0 A, ölçülen 0.250321 A; yolda B = 1.001 µT (varsayılandaki 4.000 µT'nin dörtte biri).",
        explain: "Plakada akım dışa doğru yayılır; s = 5 cm'deki kap duvarı bu akımın I(1 − s²/a²) = 0.75 A'lik kısmını keser, kalan s²/a² = 0.25'lik pay aralıktaki değişen E'den gelir. J_d olmadan akım plakalarda açık uçlu kalır: kapalı olmayan bir akımın Biot–Savart alanı Ampère yasasını sağlamaz. Aralıkta yol yalnız J_d·πs² = I·s²/a² akımını sarar, bu yüzden B = μ₀I(s²/a²)/(2πs) olur.",
      },
    ],
  },
  wow: [
    {
      title: "Işık hızı, iki masa deneyinden",
      body:
        "ε₀ durgun yükler arasındaki kuvveti, μ₀ akımlar arasındaki kuvveti ölçekler; ikisinin tanımında da ışık geçmez. Yine de 1/√(μ₀ε₀) CODATA 2022 değerleriyle 299792457.9998 m/s çıkar. Maxwell 1864'te, denklemlerinden çıkan dalga hızının ölçülen ışık hızıyla bu kadar iyi uyuşmasından yola çıkarak ışığın bir elektromanyetik bozulma olduğu sonucuna vardı.",
    },
    {
      title: "μ₀ artık ölçülüyor",
      body:
        "2019'a kadar μ₀ amperin tanımı gereği tam 4π×10⁻⁷ H/m'ydi. SI yeniden tanımlanınca c, h ve e tam oldu; μ₀ ise deneyle belirlenen bir sabite dönüştü. CODATA 2022 değeri 4π × 0.99999999987(16) × 10⁻⁷ H/m: eski değerden farkı kendi belirsizliğinin içinde kalıyor.",
    },
    {
      title: "Bugünkü bilgisayar yöntemi 1966'dan",
      body:
        "Sayfanın 03. sekmesindeki ızgara, Kane Yee'nin 1966'da önerdiği düzendir: E ve H bileşenleri uzayda ve zamanda yarım adım kaydırılmış noktalarda tutulur. 'FDTD' kısaltmasını Allen Taflove 1980'de koydu. Yöntem bugün antenlerden fotonik yapılara kadar pek çok elektromanyetik benzetimde kullanılır; bu sekmedeki tek boyutlu sürüm onun en yalın hâlidir.",
    },
  ],
  worked: {
    title: "Dolan kondansatörde yer değiştirme akımı",
    prompt:
      "Yarıçapı a = 10.0 cm olan dairesel plakalı bir kondansatör I = 1.00 A sabit akımla dolduruluyor; kenar alanı yok sayılıyor. Plakalar arasında (a) dE/dt'yi, (b) yer değiştirme akım yoğunluğunu J_d, (c) eksenden s = 5.0 cm'lik çemberin içinden geçen yer değiştirme akımını ve (d) plakaların arasında bu çember üzerindeki B'yi bul. Sonucu sayfanın S₂ kartıyla karşılaştır.",
    steps: [
      "Plakalar arasındaki alan E = σ/ε₀ = Q/(ε₀πa²). Türevini al: dE/dt = I/(ε₀πa²) = (1.00 A)/(8.854×10⁻¹² F/m × 0.03142 m²) ≈ 3.595×10¹² V/(m·s). Sayfa bunu 3595 GV/(m·s) olarak yazar.",
      "J_d = ε₀ dE/dt = I/(πa²) = 1.00 A / 0.03142 m² ≈ 31.83 A/m². ε₀ sadeleşir: yer değiştirme akımının toplamı, plakalara gelen akımın ta kendisidir.",
      "s = 5.0 cm'lik dairenin içinden geçen pay alan oranıdır: I_d = J_d·πs² = I·s²/a² = 1.00 A × 0.25 = 0.250 A.",
      "Simetriden B çember boyunca sabit ve teğettir: B·2πs = μ₀I_d, yani B = μ₀I·s/(2πa²) = (4π×10⁻⁷ T·m/A × 1.00 A × 0.050 m)/(2π × 0.0100 m²) = 1.0×10⁻⁶ T = 1.0 µT. Aynı uzaklıkta telin çevresinde B = μ₀I/(2πs) = 4.0 µT olurdu; aralıkta yolun sardığı akım dörtte birdir.",
      "Sayfada dene: 02. sekmede Ampère–Maxwell deneyinin varsayılanında yol plakaların 5 cm üstündedir ve yolda B = 4.000 µT okunur; S₂ kabı 0.2500 A yer değiştirme akımı (bulduğumuz sayı) ile plakanın 0.7500 A'lik payını toplar. <strong>Yol plakaların arasında</strong>'ya basınca (z₀ = 0) Biot–Savart toplamı 0.250321 A ve yolda B = 1.001 µT verir: kuramdan farkı +0.128 %, kaynağı parçalanmış akım şeritleri.",
    ],
    result:
      "dE/dt ≈ 3.6×10¹² V/(m·s), J_d ≈ 31.8 A/m², 5 cm'lik çemberden 0.25 A yer değiştirme akımı geçer ve aralıkta o çember üzerinde B ≈ 1.0 µT olur. Değişen E, kesilen akımın yerini tam tutar.",
  },
  misconceptions: [
    {
      myth: "Yer değiştirme akımı, plakalar arasındaki boşluktan sızan bir yük akışıdır.",
      truth:
        "Aralıktan hiçbir yük geçmez. ε₀ dΦ_E/dt, değişen elektrik alanın Ampère yasasındaki payıdır; birimi amperdir ve manyetik alanı tıpkı bir akım gibi döndürür, ama taşınan bir şey yoktur.",
    },
    {
      myth: "Manyetik alanın sıfır olduğu yerde indüklenen E de sıfırdır.",
      truth:
        "Sonsuz solenoidin dışında B sıfırdır, ama değişen içerideki akı dışarıda da E = (R²/2r)|dB/dt| büyüklüğünde dönen bir alan doğurur. Faraday yasası noktasal olarak ∇×E = −∂B/∂t der: dışarıda E'nin dönmesi sıfırdır, kendisi değil.",
    },
    {
      myth: "Bir mıknatısı ikiye kesersen yalnız kuzey kutbunu ayırmış olursun.",
      truth:
        "Her parça yeniden iki kutuplu bir mıknatıstır. B çizgilerinin başı ve sonu yoktur; mıknatısın yarısını saran bir yüzey de net sıfır akı görür. Kutuplanmış bir dielektrikte ise yüzeyde gerçek bağlı yük vardır ve kesilen yüzey onu sayar.",
    },
    {
      myth: "Gauss yasası her durumda alanı bulmaya yeter.",
      truth:
        "Yasa her kapalı yüzeyde akıyı verir; ama alanı çıkarmak için simetri gerekir (küre, sonsuz tel, sonsuz düzlem). Kayık küpün yüzlerinde alan bir yerden öbürüne değişir; sayfa onu hücre hücre toplamak zorunda kalır.",
    },
  ],
  glossary: [
    { term: "Akı (Φ)", definition: "Bir vektör alanının yüzeye dik bileşeninin yüzey boyunca toplamı; elektrik akısının birimi V·m, manyetik akınınki weber (Wb = T·m²)." },
    { term: "Dolaşım", definition: "Alanın kapalı bir yolun teğeti boyunca çizgi integrali; E için birimi volttur ve indüklenen emk'ye eşittir." },
    { term: "Diverjans ve rotasyonel", definition: "∇·F bir noktadan net dışa akışı, ∇×F o noktadaki dönmeyi ölçer; Gauss ve Stokes teoremleri bunları akı ve dolaşıma bağlar." },
    { term: "Yer değiştirme akımı", definition: "ε₀ dΦ_E/dt terimi; yük taşımadan, değişen elektrik alan aracılığıyla manyetik alanı döndüren akım payı." },
    { term: "Bağlı yük", definition: "Kutuplanmış bir maddede moleküllerin hizalanmasıyla yüzeyde (σ = P·n) ya da içeride beliren, maddeden ayrılamayan yük." },
    { term: "Poynting vektörü (S)", definition: "S = E×B/μ₀; elektromanyetik enerjinin birim alandan birim zamanda akışı, W/m²." },
    { term: "Courant sayısı (S)", definition: "S = cΔt/Δx; FDTD'de bir zaman adımında dalganın kaç hücre yol aldığı. Bir boyutlu Yee ızgarası S ≤ 1 iken kararlıdır." },
    { term: "Sayısal dağılım", definition: "Ayrık ızgarada dalga hızının dalga boyuna bağlı hâle gelmesi; kısa dalgalar ızgarada c'den yavaş ilerler." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Fizik II'de Maxwell denklemleri genellikle integral biçimde, simetrik örneklerle görülür; <strong>Elektromanyetik Teori</strong> dersinde ise diferansiyel biçim, skaler ve vektör potansiyeller (φ, A), ayar (gauge) serbestliği, sınır koşulları ve ışıma ön plana çıkar. Bu sayfada ölçtüğün kavramlar oradaki ilk adımlardır: diverjans ve Stokes teoremleri (<strong>Vektör Analizi</strong> ya da Çok Değişkenli Kalkülüs), maddede D = ε₀E + P ve H = B/μ₀ − M alanları, kutuplanmış küre ile mıknatıslanmış kürenin klasik sınav problemleri ve sınırda Fresnel katsayılarının türetilişi. Maxwell denklemlerinin Lorentz dönüşümleri altında biçim değiştirmemesi de özel göreliliğin doğuşunda belirleyici oldu.",
      "03. sekmedeki yöntem <strong>Hesaplamalı Elektromanyetik</strong> derslerinin çekirdeğidir. Yee'nin 1966 ızgarası, 1928'de Courant, Friedrichs ve Lewy'nin bulduğu koşullu kararlılık ilkesine uyar: bir boyutta S = cΔt/Δx ≤ 1. S < 1'de sayısal dağılım darbeyi yavaşlatır ve dar darbede etkisi büyür; S = 1'de bir boyutlu ızgara dalgayı tam öteler. Gerçek mühendislik kodları bunu üç boyuta, kayıplı ve dağınık ortamlara, mükemmel eşlenmiş soğurucu katmanlara (PML) genişletir. Kuantum tarafında ise aynı alanlar foton olarak nicemlenir: kuantum elektrodinamiği.",
    ],
    topics: ["Vektör analizi: Gauss ve Stokes teoremleri", "Maddede Maxwell denklemleri (D, H)", "Potansiyeller ve ayar dönüşümü", "Elektromanyetik ışıma ve antenler", "Dalga kılavuzları ve Fresnel denklemleri", "FDTD ve CFL kararlılığı", "Özel görelilik ve alan tensörü"],
  },
  quiz: [
    {
      question: "Solenoidi saran çember yolun yarıçapını 8 cm'den 15 cm'ye çıkarırsan (solenoidin yarıçapı 5 cm) ∮E·dl ne olur?",
      options: ["Yol uzadığı için yaklaşık iki katına çıkar", "Değişmez; yol aynı akıyı sarıyor", "Sıfıra iner, çünkü yol solenoidin dışında", "Yolda E zayıfladığı için yarıya iner"],
      answer: 1,
      explanation: "Akı yalnız solenoidin içindedir; onu saran her yol aynı dΦ/dt'yi görür. Solenoidin dışında E ∝ 1/r azalır, yol uzunluğu ∝ r artar ve çarpım sabit kalır. Sayfada dolaşım −49.35 mV'ta kalırken ortalama |E| 98.17'den 52.36 mV/m'ye düşer.",
    },
    {
      question: "03. sekmede kırılma indisi n₂ = 3 olan bir dielektriğe gelen darbe için yansıma katsayısı r ve yansıyan enerji payı R ne olur?",
      options: ["r = −0.5, R = 0.25", "r = −0.67, R = 0.44", "r = 0.5, R = 0.5", "r = −0.33, R = 0.11"],
      answer: 0,
      explanation: "Normal gelişte r = (n₁ − n₂)/(n₁ + n₂) = (1 − 3)/(1 + 3) = −0.5; eksi işareti yansıyan alanın ters döndüğünü söyler. Enerji payı alanın karesidir: R = 0.25, geri kalan T = 0.75 geçer. Varsayılan n₂ = 1.5 için aynı formül r = −0.2 ve R = 0.04 verir; sayfa −0.20000 ve 0.03993 ölçer.",
    },
    {
      question: "Courant sayısı 0.50 iken ölçülen darbe hızı c'den biraz küçük çıkıyor ve dar darbede (σ = 3 mm) fark büyüyor. Sebebi nedir?",
      options: ["Boşluğun kırılma indisi 1'den büyüktür", "Mur sınırı darbeyi frenler", "Izgaranın sayısal dağılımı: kısa dalga boyları ayrık ızgarada c'den yavaş ilerler", "Darbenin enerjisi zamanla azalır"],
      answer: 2,
      explanation: "Ayrık türevler kısa dalga boylarında sürekli türevden sapar; S < 1'de bu yavaşlama gerçektir. Geniş darbede hata −0.0416 %, yalnız birkaç hücre genişliğindeki dar darbede −0.6888 %'dir. S = 1.00'da bir boyutlu ızgara dalgayı tam öteler ve fark 0.0000 % olur; S > 1'de ise şema kararsızdır.",
    },
  ],
  next: [
    { href: "manyetik-alan.html", title: "Manyetik Alan Laboratuvarı: Akımdan Alana, Alandan Akıma", why: "B'nin kaynakları ayrıntısıyla: halkanın Biot–Savart toplamı, Ampère yolu, paralel tellerin çekimi ve bobinden mıknatıs geçirerek Faraday–Lenz." },
    { href: "lorentz-kuvveti.html", title: "Lorentz Kuvveti: Yüklü Parçacık Laboratuvarı", why: "Alanların yüklere ne yaptığı: F = q(E + v×B) ile çember ve sarmal yörüngeler, siklotron ve kütle spektrometresi." },
    { href: "elektromanyetik-dalgalar-ve-polarizasyon.html", title: "Elektromanyetik Dalgalar ve Polarizasyon: Malus, Brewster, Dalga Plakaları", why: "Denklemlerin öngördüğü dalganın yönü: doğrusal, dairesel ve eliptik polarizasyon, Malus yasası, Fresnel katsayıları ve Brewster açısı ölçülerek." },
    { href: "optik-yansima-kirilma.html", title: "Işığın Yansıması ve Kırılması: Snell, Fresnel ve Tam İç Yansıma", why: "03. sekmedeki r ve R'nin eğik gelişe genişlemesi: Snell yasası, Fresnel katsayıları ve tam iç yansıma." },
  ],
  sources: [
    { title: "OpenStax · University Physics Vol. 2, 16.1 Maxwell's Equations and Electromagnetic Waves", url: "https://openstax.org/books/university-physics-volume-2/pages/16-1-maxwells-equations-and-electromagnetic-waves", note: "Dört denklem, yer değiştirme akımı ve kondansatörde aynı sınırı paylaşan iki yüzey örneği (İngilizce, açık ders kitabı)." },
    { title: "Wikipedia · A Dynamical Theory of the Electromagnetic Field", url: "https://en.wikipedia.org/wiki/A_Dynamical_Theory_of_the_Electromagnetic_Field", note: "Makalenin 8 Aralık 1864'te okunuşu, Phil. Trans. 155 (1865), yirmi denklem ve ışığın elektromanyetik bozulma oluşu (İngilizce)." },
    { title: "Wikipedia · Displacement current", url: "https://en.wikipedia.org/wiki/Displacement_current", note: "Kondansatör tartışması ve Maxwell'in terimi 1861 makalesinin üçüncü bölümünde moleküler girdap modeliyle türetişi; asıl güdünün tartışmalı oluşu (İngilizce)." },
    { title: "Wikipedia · Heinrich Hertz", url: "https://en.wikipedia.org/wiki/Heinrich_Hertz", note: "1886–1889 Karlsruhe deneyleri: kıvılcım aralıklı dipol, halka alıcı, yaklaşık 50 MHz, çinko levhayla duran dalgalar ve kutuplanma (İngilizce)." },
    { title: "NIST CODATA · vacuum magnetic permeability μ₀", url: "https://physics.nist.gov/cgi-bin/cuu/Value?mu0", note: "μ₀ = 1.25663706127(20)×10⁻⁶ N/A², 2022 önerilen değeri; ε₀ aynı sitenin ayrı sayfasında: 8.8541878188(14)×10⁻¹² F/m." },
  ],
  revision: "Kasım 2026",
};
