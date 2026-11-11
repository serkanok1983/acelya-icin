window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["manyetik-alan"] = {
  slug: "manyetik-alan",
  title: "Manyetik Alan: Akımdan Alana, Alandan Akıma",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir halkayı çokgen parçalarla topla, Ampère yolunu yıldıza çevir, iki telin çekimini ölç, bobinden mıknatıs geçir: alanın akımdan doğduğunu, değişen akının da yeniden akım doğurduğunu sayılarla sına.",
  hook: "1820'de Kopenhag'da bir pusula iğnesi, hemen üstündeki tele akım verildiği anda kuzeyi bıraktı ve tele dik dönmeye çalıştı; akım kesilince yeniden kuzeyi gösterdi. Yakında ne bir mıknatıs vardı ne de iğneye dokunan bir el; yalnızca pile bağlı bir metal tel. Ardından ters soru geldi ve yanıtı on bir yıl bekletti: bir mıknatıs, bir telde akım doğurabilir mi?",
  bigIdea:
    "Manyetik alanın kaynağı akımdır: her tel parçasının katkısı toplanarak alan bulunur (Biot–Savart), kapalı bir yol boyunca alanın toplamı yalnızca o yolun sardığı akımı bilir (Ampère), bir devreden geçen akı değişince de devrede <em>ε = −N·dΦ/dt</em> kadar gerilim doğar (Faraday–Lenz).",
  story: [
    "Teli tutan, Kopenhag Üniversitesi'nde fizik profesörü Hans Christian Ørsted'di: pil devresinin telini pusula iğnesinin üzerine, ona paralel uzatmıştı. Sık anlatılan hikâyeye göre iğnenin saptığını bir ders sırasında, tamamen tesadüfen gördü; tarihçiler \"tesadüf\" kısmına şüpheyle bakar, çünkü Ørsted elektrik ile manyetizma arasında bir bağı yıllardır arıyordu ve ilk sonuçları zayıf ve kafa karıştırıcıydı. Kesin olan şu: Temmuz 1820'de bulgularını Latince kısa bir yazıyla yayımladı ve Londra Kraliyet Cemiyeti ona aynı yıl <strong>Copley Madalyası</strong>'nı verdi. Şaşırtıcı olan yalnızca etkinin varlığı değil, biçimiydi: o güne kadar bilinen kuvvetler iki cismi birleştiren doğru boyunca çeker ya da iterdi; bu etki ise teli çepeçevre sarıyordu.",
    "Haber Paris'e Eylül 1820'de ulaştı: François Arago deneyi Fransız Bilimler Akademisi'nde gösterdi ve birkaç ay içinde iki ayrı ilerleme geldi. Jean-Baptiste Biot ile Félix Savart, düz bir telin alanının telden uzaklaştıkça azalışını ölçtüler; bugün her küçük tel parçasının katkısını veren yasa onların adını taşır. André-Marie Ampère ise iki paralel telden aynı yönde akım geçince tellerin birbirini çektiğini, zıt yönde geçince ittiğini gösterdi. İşin içinde tek bir mıknatıs yoktu; manyetizma, akımların birbirine uyguladığı bir kuvvetti. Ampère daha da cesur bir fikir öne sürdü: demir mıknatısların gücü de maddenin içindeki küçük dairesel akımlardan geliyor olabilirdi. Ayrıntıları onun hayal ettiği gibi çıkmadı: bugün maddenin mıknatıslığını elektronların yörünge hareketine, ama çoğunlukla <em>spin</em> denen ve klasik bir dönen akımla tam açıklanamayan içsel özelliğine bağlıyoruz. Yine de “mıknatıs, içindeki akımlardır” sezgisi ilk yaklaşım olarak işe yarar.",
    "Michael Faraday soruyu tersine çevirdi. 1821'de akım taşıyan bir telin bir mıknatısın çevresinde durmadan döndüğünü gösterdi: elektrik enerjisini harekete çeviren ilk düzenek, elektrik motorunun atası. 1831'de de değişen bir manyetik alanın bir telde akım doğurduğunu buldu; dikkat çekici olan, sabit duran bir mıknatısın hiçbir şey yapmaması, yalnızca hareket eden ya da değişen alanın akım doğurmasıydı. 1834'te Heinrich Lenz indüklenen akımın yönünü tek bir kurala bağladı: akım, kendisini doğuran değişime karşı koyacak yönde akar. 1860'larda James Clerk Maxwell bütün bu parçaları birkaç denklemde birleştirdi ve ışığın, elektrik ve manyetik alanların birbirini besleyerek ilerlediği bir dalga olduğunu çıkardı. Bugün elektriğin büyük kısmını üreten jeneratörler Faraday'ın ilkesiyle çalışır.",
    "Ampère'in paralel telleri uzun süre bir ölçü birimini de taşıdı. 2019'a kadar amper şöyle tanımlanıyordu: boşlukta 1 m arayla duran iki sonsuz uzun, ince, paralel telden geçtiğinde tellerin her metresine 2×10⁻⁷ N kuvvet uygulatan akım. Bu tanım boşluğun manyetik geçirgenliğini tam olarak μ₀ = 4π×10⁻⁷ N/A² yapıyordu. 20 Mayıs 2019'da SI birimleri yeniden tanımlandı: artık temel yük e = 1.602176634×10⁻¹⁹ C kesin bir sayıdır ve amper ondan gelir. Bedeli şu: μ₀ artık ölçülen bir nicelik. CODATA 2022 değeri 1.25663706127×10⁻⁶ N/A²; eski tanım değerinden yaklaşık on milyarda 1.3 kadar küçük, ölçüm belirsizliğiyle aynı mertebede. Sayfa bu güncel değerle hesaplar.",
  ],
  core: [
    {
      heading: "Biot–Savart: alanı parça parça toplamak",
      body: "Bir teli kısa doğru parçalarına böl. Her parça kendi çevresinde küçük bir alan üretir; büyüklüğü uzaklığın karesiyle azalır ve yönü hem parçaya hem de parçadan noktaya uzanan doğruya diktir. Toplam alan, bütün bu katkıların vektörel toplamıdır. Halkanın merkezinde hesap bir satırdır: her parça merkeze tam R uzaklıkta ve doğrultuya dik durur, katkıların hepsi eksen yönündedir; toplam uzunluk 2πR olduğundan B = (μ₀I/4πR²)·2πR = μ₀I/(2R). Sayfa halkayı n kenarlı bir çokgenle temsil eder ve her kenarın katkısını orta noktasından hesaplar (<strong>orta nokta kuralı</strong>). Her kenar 2R·sin(π/n) uzunluğunda ve orta noktası merkeze R·cos(π/n) uzaklıkta; orta nokta kuralıyla n kenarın katkısı μ₀I·n·sin(π/n)/[2πR·cos²(π/n)] eder. Gerçek halkaya oranı n·sin(π/n)/[π·cos²(π/n)] ≈ 1 + 5π²/(6n²): sin x/x ≈ 1 − x²/6 ve 1/cos²x ≈ 1 + x² çarpılınca 1 + 5x²/6 kalır (x = π/n). Parça sayısı iki katına çıkınca hata dörtte birine iner.",
      formula: "d<span class=vec>B</span> = (μ₀I/4π) · d<span class=vec>l</span> × <span class=vec>r</span> / r³",
      formulaNote:
        "r, tel parçasından alanın ölçüldüğü noktaya uzanan vektör. Halka merkezinde μ₀I/(2R), sonsuz düz telde μ₀I/(2πd) sonucunu verir.",
    },
    {
      heading: "Ampère yasası: yol ne olursa olsun",
      body: "Kapalı bir yol çiz, yolu küçük adımlara böl, her adımda alanın adım boyunca bileşenini adım boyuyla çarpıp topla. <strong>Ampère yasası</strong> bu toplamın yalnızca yolun sardığı net akıma bağlı olduğunu söyler: yolun biçimi, boyu, ortalama alan şiddeti hesaba girmez. Nedeni sonsuz bir düz telde açıkça görülür: alan çembersel ve büyüklüğü μ₀I/(2πr) olduğundan, bir adımın katkısı yalnızca adımın telden görüldüğü açıya bağlıdır, B·dl = (μ₀I/2π)·dφ. İçeride kalan bir telin çevresinde açılar 2π'ye tamamlanır; dışarıdaki bir tel için ileri ve geri dönüşler birbirini götürür, toplam sıfırdır. Uzun bir solenoidin içinden ve dışından geçen dikdörtgen bir yol seçince aynı yasa B = μ₀nI sonucunu iki satırda verir.",
      formula: "∮ <span class=vec>B</span> · d<span class=vec>l</span> = μ₀ · I<sub>sarılan</sub>",
      formulaNote:
        "Sabit akımlar için geçerlidir. Yol bir telin tam üstünden geçerse alan orada sonsuzdur ve integral tanımsız olur; sayfa bu durumda ölçüm yazmaz.",
    },
    {
      heading: "Süperpozisyon: iki halka, uzun bir bobin",
      body: "Alanlar toplandığı için karmaşık düzenekler basit parçalardan kurulur. Bir halkanın ekseni üzerindeki alan B(z) = μ₀IR²/[2(R² + z²)^(3/2)]. Aynı akımı taşıyan iki halkayı s arayla yerleştirirsen ortadaki alanın biçimi s'ye bağlıdır: halkalar yakınsa merkezde tepe, uzaksa çukur oluşur. Tam s = R'de ikinci türev sıfırlanır ve merkezdeki alan (4/5)^(3/2)·μ₀I/R olur; buna <strong>Helmholtz çifti</strong> denir. Sayfada R/4 içinde en büyük sapma s/R = 0.8'de 2.759 %, 1.0'da 0.408 %, 1.2'de 1.777 % çıkar. Halkaları sıkça dizersen solenoid elde edersin: uzun bir bobinin ortasında alan μ₀nI'ya, ucunda bunun yarısına yaklaşır, çünkü uç, birleşik iki yarı-sonsuz bobinden birinin tek başına kalmış hâlidir.",
      formula: "B<sub>uç</sub> / B<sub>orta</sub> → ½  (ℓ ≫ R)",
      formulaNote:
        "Sayfanın sonlu solenoid düzeneğinde (ℓ = 0.4 m, R = 0.02 m) ölçülen oran 0.5018; bobin kısaldıkça oran ½'den büyür.",
    },
    {
      heading: "Paralel teller ve amperin eski tanımı",
      body: "Tel 1, d uzaklıktaki tel 2'nin bulunduğu yerde B₁ = μ₀I₁/(2πd) büyüklüğünde bir alan üretir. Bu alanın içinde akım taşıyan tel 2'nin her parçasına dF = I₂ dl × B₁ kuvveti etkir. İki akım aynı yöndeyse kuvvet tel 1'e doğrudur (çekme), zıt yöndeyse uzağa (itme). Tel 2 de tel 1'e eşit büyüklükte ve zıt yönde kuvvet uygular: Newton'un üçüncü yasası. Formül sonsuz uzun tel içindir; tel 1'in uzunluğu Λ sonluysa ortadaki alan (Λ/2)/√((Λ/2)² + d²) çarpanıyla küçülür. I₁ = I₂ = 1 A, d = 1 m koyunca formül μ₀/(2π) verir; 2019'a kadar bu sonuç tanım gereği tam 2×10⁻⁷ N/m idi, bugün ölçülen μ₀ ile 1.99999999974×10⁻⁷ N/m.",
      formula: "F/ℓ = μ₀ I₁ I₂ / (2πd)",
      formulaNote:
        "Uzaklık iki katına çıkınca kuvvet yarıya iner: log–log grafikte eğimi −1 olan bir doğru.",
    },
    {
      heading: "Faraday–Lenz: değişen akı gerilim doğurur",
      body: "Bir sarımdan geçen <strong>manyetik akı</strong> Φ, alanın yüzeye dik bileşeninin yüzey üzerindeki toplamıdır. Akı değişince devrede bir <strong>emk</strong> (elektromotor kuvvet) doğar: N sarımda ε = −N·dΦ/dt. Eksi işareti <strong>Lenz yasası</strong>dır: indüklenen akım, kendi alanıyla akının değişimine karşı koyar. Bu bir enerji korunumu ifadesidir; ters yönde olsaydı küçük bir itiş mıknatısı kendi kendine hızlandırırdı. Bobinin ekseninde sabit v hızıyla ilerleyen bir dipol mıknatıs için akı Φ(z) = μ₀ma²/[2(a² + z²)^(3/2)], emk de ε = −N·v·dΦ/dz. Bu ifade z = ∓a/2'de en büyük olur: akı orada en hızlı değişir, mıknatıs tam bobinin içindeyken ise akı en büyük ama emk sıfırdır. Raylarda kayan bir çubukta akı B·L·x olduğundan emk BLv'dir.",
      formula: "ε<sub>tepe</sub> = (3/4)(4/5)^(5/2) · Nμ₀mv / a² ≈ 0.4293 · Nμ₀mv / a²",
      formulaNote:
        "dΦ/dz'nin en büyük olduğu yer, a² + z² = 5z² koşulundan z = a/2 çıkar. Sayfanın modeli bobinin öz-indüktansını yok sayar: akım anında ε/R olur.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört sekme var: <strong>01 · Akımın alanı</strong> (düz tel, tek halka, Helmholtz çifti, sonlu solenoid), <strong>02 · Ampère yasası</strong> (düzleme dik üç tel ve biçimini seçtiğin kapalı bir yol; teller tuvalde sürüklenebilir), <strong>03 · Paralel teller</strong> ve <strong>04 · İndüksiyon</strong> (bobinden geçen mıknatıs, düzgün alanda dönen bobin, raylarda kayan çubuk). Her kartta sayfanın sayısal olarak ölçtüğü değer, kapalı formülün verdiği değer ve aradaki fark yan yana durur; fark (ölçülen − kuram)/|kuram| olarak, \"+0.20 %\" biçiminde yazılır. Her sekmenin kendi <strong>Sıfırla</strong> düğmesi var; <strong>R</strong> tuşu açık sekmeyi sıfırlar. 04'te <strong>Başlat</strong>, <strong>Sona atla</strong> ve <strong>Oynatma hızı</strong> menüsü vardır, <strong>Boşluk</strong> tuşu başlatıp duraklatır; bir ayarı değiştirmek deneyi baştan kurar. Model sınırları sayfada yazılıdır: ince teller, sabit akımlar, boşluk, demir çekirdek yok; indüksiyonda öz-indüktans yok, mıknatıs sabit hızla itilir.",
    experiments: [
      {
        title: "Halkayı çokgenle yaklaşmak",
        predict:
          "8 kenarlı bir \"halka\", merkezde gerçek halkadan daha güçlü mü daha zayıf mı alan verir? Kenar sayısını iki katına çıkarınca hata yarıya mı, dörtte birine mi iner?",
        do: "01 · Akımın alanı sekmesinde Sıfırla'ya bas (Tek halka, I = 10 A, R = 0.10 m, z = 0). Parça sayısı menüsünü sırayla 8, 16, 32, 64 ve 1024 yap; her seferinde ölçülen B'yi, farkı ve \"Merkezde ölçülen / μ₀I/(2R)\" kartını yaz. Son olarak 1024 parçada Ölçüm noktası z kaydırıcısını 0.100 m'ye getir.",
        observe:
          "Kapalı biçim her zaman 62.83 µT. Ölçülen değer 71.73 µT (+14.17 %), 64.90 µT (+3.29 %), 63.34 µT (+0.81 %), 62.96 µT (+0.20 %) ve 62.83 µT (0.00 %); oran kartı 1.14169, 1.03290, 1.00808, 1.00201, 1.00001. z = 0.100 m'de alan 22.21 µT'ye iner.",
        explain:
          "Sayfanın hesabı hep fazla verir: her kenar, orta noktası merkeze R·cos(π/n) kadar yakın bir parça sayılır ve 1/r² ağırlığı bu yakınlığı büyütür. (Düz kenarlı gerçek bir çokgenin tam alanı da çemberinkinden büyüktür ama daha az: tan(π/n)/(π/n) katı, 8 kenarda 1.055; aradaki fark orta nokta kuralının kendi hatasıdır.) 16'dan 32'ye ve 32'den 64'e geçerken fark yaklaşık dörde bölünür (3.29 → 0.81 → 0.20); hata 1/n² ile azalır. z = R'de alan merkezdekinin 22.21/62.83 ≈ 0.354 katıdır, yani tam 2^(−3/2): (R² + R²)^(3/2) paydası 2√2 kat büyür.",
      },
      {
        title: "Ampère: yolun biçimi önemsiz, sarılan akım önemli",
        predict:
          "Üç telden ikisi yolun içinde (5 A ve −3 A), biri dışarıda (8 A). Çemberi kareye ya da dalgalı yıldıza çevirirsen ∮ B·dl değişir mi? Yolu tellerin hiçbirini sarmayacak yere taşırsan ne olur?",
        do: "02 · Ampère yasası sekmesinde Sıfırla'ya bas. Yolun biçimi menüsünde Kare'yi, sonra Dalgalı yıldız'ı seç; yıldızdayken Yoldaki nokta sayısı'nı 8 yap. Nokta sayısını 256'ya geri al, biçimi Kare yap ve Yolun boyu'nu 1.20 m'ye çıkar. Son olarak Sıfırla'ya basıp Yolun merkezi x'i −1.00 m, y'yi 1.00 m yap.",
        observe:
          "Çember: μ₀ × 2.0001 A (fark +0.01 %), yol 3.770 m. Kare: μ₀ × 2.0000 A, yol 4.800 m, ortalama |B| 1.834 µT. Yıldız: μ₀ × 1.9990 A (−0.05 %), yol 5.872 m, ortalama |B| 2.082 µT. Yıldız ve 8 nokta: μ₀ × 1.7838 A (−10.81 %). Boyu 1.20 m olan kare tel 3'ü de içine alır: μ₀ × 10.0002 A, I<sub>sarılan</sub> 10.0 A. Yol (−1, 1)'e taşınınca ölçülen 0 T·m; ortalama |B| ise 1.075 µT, sıfır değil.",
        explain:
          "Yol uzadıkça ve alanın güçlü olduğu yerlere yaklaştıkça ortalama |B| değişir, ama integral değişmez: her adımın katkısı yalnızca adımın telden görüldüğü açıya bağlıdır. Tablodaki tek tel satırları bunu tek tek gösterir; dışarıdaki tel 0.0000 A katkı verir. 8 noktalı yıldızın −10.81 %'lik farkı fizik değil, kaba bölme hatasıdır. Son durumda alan yolun her yerinde var, yine de toplam sıfır: Ampère yasası alanın kendisini değil, kapalı yol boyunca dolaşımını söyler.",
      },
      {
        title: "İki tel, bir kuvvet ve eski amper",
        predict:
          "10 A taşıyan iki paralel tel 10 cm arayla duruyor. Bir metrelik parçaya kaç gramlık bir ağırlık kadar kuvvet etkir? Aralığı ikiye katlarsan, ya da akımlardan birini ters çevirirsen ne değişir?",
        do: "03 · Paralel teller sekmesinde Sıfırla'ya bas ve kartları oku. Teller arası uzaklık d'yi 0.20 m yap. Sıfırla'dan sonra Tel 2 akımı I₂'yi −10.0 A yap. Yeniden Sıfırla'ya bas; Tel 1'in uzunluğu Λ menüsünü 1 m, d'yi 0.50 m yap. Son olarak Eski tanım: 1 A, 1 A, 1 m düğmesine bas.",
        observe:
          "Varsayılanda B₁ = 20.00 µT, F/ℓ = 200.0 µN/m, çekme; kuram 200.0 µN/m, ağırlık karşılığı 20.39 mg; tel 1'e de 200.0 µN/m etkir, F₁ + F₂ = 0 N/m. d = 0.20 m'de 100.0 µN/m. I₂ = −10 A'de yine 200.0 µN/m, ama itme. Λ = 1 m, d = 0.50 m'de ölçülen 28.25 µN/m, sonsuz tel kuramından −29.38 % farklı; sonlu tel düzeltmesiyle (çarpan 0.70710678) fark −0.13 %'e iner. Eski tanım düğmesi 200.0 nN/m verir; μ₀ kartı μ₀/(4π×10⁻⁷) − 1 = −1.32×10⁻¹⁰ yazar.",
        explain:
          "Kuvvet 1/d ile azalır ve akımların çarpımının işaretiyle yön değiştirir. Kısa tel 1'de uçlardan gelen katkılar eksiktir, bu yüzden sonsuz tel formülü burada iyi değildir. Kalan −0.13 %'lük fark da gerçektir: tel 2'nin ölçülen 0.1 m'lik parçası boyunca alan sabit değildir, düzeltme çarpanı ise yalnızca ortadaki noktayı hesaba katar. Eski tanım düğmesi, 2019'a kadar amperi tanımlayan düzeneğin sayısal karşılığıdır; −1.32×10⁻¹⁰, μ₀'ın artık ölçülen bir sayı olmasının izidir.",
      },
      {
        title: "Mıknatıs bobinden geçerken: iki tepe ve Lenz",
        predict:
          "Mıknatıs bobine yaklaşırken ve uzaklaşırken emk'nin işareti ne olur? Mıknatısı iki kat hızlı itersen tepe emk ve dirençte açığa çıkan ısı kaç katına çıkar? Bobin yarıçapını iki katına çıkarırsan?",
        do: "04 · İndüksiyon sekmesinde Sıfırla'ya bas (Bobinden geçen mıknatıs: m = 1.0 A·m², v = 0.5 m/s, N = 100, a = 0.030 m, R = 5.0 Ω). Ağır çekimde Başlat'a bas, akımın yönünü ve durum satırını izle; sonra Sona atla. Mıknatısın hızı v'yi 1.0 m/s yapıp Sona atla. Sıfırla'ya basıp Bobin yarıçapı a'yı 0.060 m yap ve yine Sona atla.",
        observe:
          "Varsayılanda 1. tepe −29.96 mV (kuram −29.97 mV, büyüklük farkı −0.03 %), z = −1.50 cm'de; 2. tepe 29.96 mV, z = 1.50 cm'de. ∫ ε dt ÷ ∫ |ε| dt ≈ 1.4×10⁻¹⁶, dirençte ısı 16.14 µJ. v = 1.0 m/s'de tepeler ±59.93 mV, ısı 32.29 µJ. a = 0.060 m'de tepeler ±7.491 mV, z = ∓3.00 cm, ısı 2.018 µJ.",
        explain:
          "Yaklaşırken akı artar, emk eksidir; indüklenen akım bobini yaklaşan kuzey kutbuna kuzey kutbunu gösteren bir mıknatısa çevirir ve onu iter. Uzaklaşırken akım yön değiştirir ve bobin mıknatısı geri çeker: hareket iki durumda da frenlenir (Lenz). Başlangıç ve bitiş simetrik olduğundan iki tepenin alanları birbirini götürür. Hız iki katına çıkınca emk iki katına çıkar, geçiş süresi yarıya iner: ε² dört katına çıkarken süre yarıya indiği için ısı yalnızca iki katına çıkar. Tepe 1/a² ile azalır ve hep z = ∓a/2'de oluşur. Isıyı iten el sağlar; model hızı sabit tuttuğu için frenlenme görünmez.",
      },
    ],
  },
  wow: [
    {
      title: "Bir tel, bir gezegenle yarışır",
      body: "5 amper taşıyan düz bir telin 1 santimetre ötesindeki alan B = μ₀I/(2πr) ≈ 2×10⁻⁷ T·m/A × 5 A / 0.01 m = 10⁻⁴ T, yani 100 µT'dir. Dünya'nın yüzeydeki alanı yerine göre yaklaşık 25–65 µT'dir ve pusulayı döndüren yatay bileşeni bundan da küçüktür. Yani bir santimetre mesafede sıradan bir tel, pusula iğnesi üzerinde yaklaşık 6 400 km yarıçaplı bütün gezegenden daha baskındır. Telden 10 cm uzaklaşınca alan 10 µT'ye düşer ve çoğu yerde Dünya yeniden üstün gelir.",
    },
    {
      title: "Tanımın kendisi on milyarda bir kaydı",
      body: "2019'a kadar 1 m arayla duran ve 1'er amper taşıyan iki sonsuz telin metre başına kuvveti tanım gereği tam 2×10⁻⁷ N'du. 20 Mayıs 2019'dan beri amper temel yükten tanımlandığı için bu kuvvet artık hesaplanan bir sonuçtur: CODATA 2022'nin μ₀ değeriyle 1.99999999974×10⁻⁷ N/m. Fark yaklaşık 1.3×10⁻¹⁰, μ₀'ın 1.6×10⁻¹⁰'luk göreli belirsizliği mertebesinde. Sayfadaki \"Eski tanım\" düğmesi bu sayıyı yazar.",
    },
    {
      title: "MR: Dünya'nın on binlerce katı",
      body: "Hastanelerdeki MR cihazlarının çoğu 1.5 T ile, bir kısmı 3 T ile çalışır. 1.5 T, Dünya'nın yaklaşık 50 µT'lik alanının 30 000 katıdır. Bu alanı üreten, alanı düzleştiren ek bobinlerle donatılmış kısa ve kalın bir solenoiddir; kaba hesap yine sayfadakiyle aynıdır: n·I = B/μ₀ ≈ 1.5 T / (1.2566×10⁻⁶ T·m/A) ≈ 1.2 milyon amper-sarım/metre. Sayfanın varsayılan solenoidi (40 sarım, 0.4 m, 2 A) yalnızca 200 amper-sarım/metre ile 251.3 µT verir. Bu kadar akımı ısınmadan taşımak için MR bobininin teli süperiletkendir ve sıvı helyumla soğutulur.",
    },
  ],
  worked: {
    title: "Düşey raylarda düşen çubuğun limit hızı",
    prompt:
      "Kütlesi m = 0.1 kg olan bir çubuk, aralarında L = 0.5 m bulunan iki düşey ray üzerinde sürtünmesiz kayıyor; rayların üst ucuna R = 1 Ω'luk bir direnç bağlı. Rayların düzlemine dik B = 0.5 T'lik düzgün alan var. Çubuk durgun bırakılıyor. Limit hızı, zaman sabitini ve limit hızda dirençte harcanan gücü bul (g = 9.80665 m/s²; öz-indüktans ve rayların direnci yok). Sayfada: 04 · İndüksiyon, Düzenek \"Raylarda kayan çubuk\", Çubuğun hareketi \"Düşey raylarda düşüyor\", varsayılan B, L, R, m.",
    steps: [
      "Çubuk v hızıyla düşerken devrenin alanı her saniye L·v kadar büyür, akı B·L·x olur: emk ε = BLv, akım I = BLv/R. Akım taşıyan çubuğa alan F = BIL = B²L²v/R büyüklüğünde, harekete karşı (yukarı) bir kuvvet uygular. Lenz yasasının mekanikteki yüzü budur.",
      "Newton'un ikinci yasası: m·dv/dt = mg − (B²L²/R)·v. Sağ taraf sıfır olunca hız sabitlenir: v<sub>∞</sub> = mgR/(B²L²) = (0.1 kg × 9.80665 m/s² × 1 Ω) / (0.25 T² × 0.25 m²) = 0.980665 / 0.0625 m/s ≈ 15.69 m/s. Birim denetimi: T·m = N/A olduğundan (N·Ω)/(T²·m²) = Ω·A²/N = W/N = m/s.",
      "Denklem birinci mertebe doğrusaldır: v(t) = v<sub>∞</sub>(1 − e<sup>−t/τ</sup>), τ = mR/(B²L²) = 0.1/0.0625 s = 1.6 s. t = τ'da hız limit hızın 1 − e⁻¹ ≈ 0.632'sine, yaklaşık 9.92 m/s'ye ulaşır.",
      "Limit hızda emk BLv<sub>∞</sub> = 0.25 T·m × 15.69 m/s ≈ 3.923 V, akım 3.923 A, fren kuvveti BIL ≈ 0.981 N = mg. Dirençteki güç ε²/R ≈ 15.39 W, yerçekiminin gücü mg·v<sub>∞</sub> = 0.980665 N × 15.69 m/s ≈ 15.39 W ile aynıdır: kaybedilen potansiyel enerjinin tamamı ısıya döner.",
      "Sayfayla karşılaştır: Sona atla'dan sonra zaman sabiti kartı 1.6000 s (kuram 1.6000 s), limit hız kartı 10τ sonundaki hızı 15.6899 m/s olarak, kuramı 15.6906 m/s olarak yazar; aradaki fark v<sub>∞</sub>·e⁻¹⁰ kadardır. Bu sürede çubuk yaklaşık 226 m düşer: model sonsuz uzun ve sürtünmesiz raylar varsayar.",
    ],
    result:
      "v<sub>∞</sub> = mgR/(B²L²) ≈ 15.69 m/s, τ = mR/(B²L²) = 1.6 s, limit hızda dirençte ≈ 15.39 W. Alan iki katına çıkarsa her ikisi de dörtte birine iner (B = 1 T'de sayfa 3.9227 m/s ve 0.4000 s yazar). Gerçek bir devrede öz-indüktans, akımın ε/R'ye ulaşması için ayrıca L/R kadar bir gecikme ekler.",
  },
  misconceptions: [
    {
      myth: "∮ B·dl sıfırsa yolun üzerinde alan da sıfırdır.",
      truth:
        "Ampère yasası alanın kendisini değil, kapalı yol boyunca dolaşımını verir. Sayfada yol hiçbir teli sarmazken ∮ B·dl = 0 T·m olur ama ortalama |B| 1.075 µT'dir: dışarıdaki tellerin katkısı yolun bir yanında artı, öbür yanında eksi birikip sıfırlanır. Yasadan alanın kendisini çıkarmak ancak simetri varsa mümkündür (sonsuz tel, uzun solenoid).",
    },
    {
      myth: "Akı en büyükken indüklenen emk de en büyüktür.",
      truth:
        "Emk akının kendisine değil, değişim hızına bağlıdır. Mıknatıs bobinin tam içindeyken akı en büyüktür ama o an değişmez, emk sıfırdır; tepeler z = ∓a/2'dedir. Dönen bobinde de akı θ = 0°'de en büyüktür, emk ise bobin düzlemi alana paralelken (θ = 90°), akı sıfırdan geçerken tepe yapar.",
    },
    {
      myth: "İndüklenen akım mıknatısı hep iter.",
      truth:
        "Lenz yasası mıknatısı değil, değişimi hedef alır. Yaklaşan mıknatısı bobin iter; uzaklaşan mıknatısı ise akım yön değiştirdiği için geri çeker. İki durumda da sonuç aynıdır: hareket frenlenir ve harcanan iş dirençte ısıya döner.",
    },
    {
      myth: "Manyetik alan çizgileri kuzey kutbunda başlar, güney kutbunda biter.",
      truth:
        "Çizgiler dışarıda kuzeyden çıkıp güneye girer ama mıknatısın ya da bobinin içinden güneyden kuzeye geçerek kapalı bir döngü tamamlar; kapalı her yüzeyden giren akı kadarı çıkar (∮ B·dA = 0) ve tek kutuplu mıknatıs hiç gözlenmemiştir. Sayfa bobinden geçen akıyı tam bu özellikle hesaplar: bobin düzleminin dışında kalan kısmından geçen akının eksisini alır.",
    },
  ],
  glossary: [
    {
      term: "Biot–Savart yasası",
      definition:
        "Akım taşıyan küçük bir tel parçasının bir noktada ürettiği alanı veren, toplandığında bütün telin alanını bulduran yasa.",
    },
    {
      term: "Ampère yasası",
      definition:
        "Sabit akımlar için kapalı bir yol boyunca B·dl toplamının μ₀ ile yolun sardığı net akımın çarpımına eşit olduğunu söyleyen yasa.",
    },
    {
      term: "Boşluğun manyetik geçirgenliği (μ₀)",
      definition:
        "Akım ile ürettiği alan arasındaki orantı sabiti; 2019'dan beri ölçülen bir nicelik, CODATA 2022 değeri 1.25663706127×10⁻⁶ N/A².",
    },
    {
      term: "Tesla (T)",
      definition:
        "Manyetik alanın SI birimi; 1 mT = 10⁻³ T, 1 µT = 10⁻⁶ T ve Dünya'nın alanı yaklaşık 50 µT.",
    },
    {
      term: "Helmholtz çifti",
      definition:
        "Aynı akımı taşıyan, yarıçapları kadar arayla yerleştirilmiş iki eş halka; merkezlerinde alan çok düzgündür.",
    },
    {
      term: "Manyetik akı (Φ)",
      definition:
        "Alanın bir yüzeye dik bileşeninin o yüzey üzerindeki toplamı; birimi weber (Wb = T·m²).",
    },
    {
      term: "Emk (ε)",
      definition:
        "Bir devrede yükleri dolaştıran, volt cinsinden ölçülen etki; indüksiyonda N sarım için −N·dΦ/dt.",
    },
    {
      term: "Lenz yasası",
      definition:
        "İndüklenen akımın, kendisini doğuran akı değişimine karşı koyacak yönde akması kuralı.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "<strong>Fizik II</strong> dersinde bu sayfanın dört sekmesi sırayla işlenir: Biot–Savart, Ampère, paralel teller ve Faraday. <strong>Elektromanyetik Teori</strong> dersinde aynı yasalar diferansiyel biçime geçer: ∇·B = 0 alan çizgilerinin kapalı olduğunu, ∇×B = μ₀J Ampère yasasını, ∇×E = −∂B/∂t Faraday yasasını söyler. Sayfanın alan çizgilerini çizerken kullandığı <strong>vektör potansiyeli</strong> A (B = ∇×A) burada doğal araç olur; Biot–Savart toplamının A için yazılmış biçimi daha basittir. Maxwell, Ampère yasasına değişen elektrik alanı temsil eden bir terim ekleyince alanların ışık hızında, c = 1/√(μ₀ε₀), yayılan dalgalar oluşturduğu ortaya çıktı.",
      "Sayfanın bilerek yaptığı sadeleştirmeler, sonraki derslerin konusudur. Gerçek bir bobinde <strong>öz-indüktans</strong> vardır: akımın kendi değişimi de bir emk doğurur ve akım ε/R'ye bir L/R zaman sabitiyle ulaşır; bu, <strong>Devre Analizi</strong> derslerinde RL devresi ve alternatif akımda indüktif reaktans olarak karşına çıkar. Demir çekirdekler alanı yüzlerce kat büyütür ama doyuma ve histerezise yol açar. Kalın iletkenlerde değişen akı <strong>girdap akımları</strong> doğurur; indüksiyonlu ocaklar ve manyetik frenler bundan yararlanır. Transformatör, jeneratör ve motor tasarımı bu temelin üzerine kurulur.",
    ],
    topics: [
      "Biot–Savart ve vektör potansiyeli",
      "Ampère yasası ve Maxwell'in düzeltmesi",
      "Faraday yasası ve hareketsel emk",
      "Öz ve karşılıklı indüktans, RL devreleri",
      "Girdap akımları ve manyetik frenleme",
      "Manyetik malzemeler ve histerezis",
      "Maxwell denklemleri ve elektromanyetik dalgalar",
    ],
  },
  quiz: [
    {
      question:
        "Bobinden geçen mıknatısı iki kat hızlı itersen (diğer her şey aynı), tepe emk ve bütün geçiş boyunca dirençte açığa çıkan ısı ne olur?",
      options: [
        "Tepe emk iki katına, ısı dört katına çıkar",
        "Tepe emk iki katına, ısı da iki katına çıkar",
        "Tepe emk değişmez, ısı iki katına çıkar",
        "İkisi de değişmez; akının toplam değişimi aynıdır",
      ],
      answer: 1,
      explanation:
        "Emk, akının zamanla değişim hızıdır: aynı akı değişimi yarı sürede olunca ε iki katına çıkar. Isı ∫ε²/R dt'dir: ε² dört katına çıkar ama geçiş süresi yarıya iner, sonuç iki kat. Sayfada v = 0.5 m/s'de 29.96 mV ve 16.14 µJ, v = 1.0 m/s'de 59.93 mV ve 32.29 µJ.",
    },
    {
      question:
        "Düşey raylarda düşen çubuk deneyinde alanı B = 0.5 T'den 1 T'ye çıkarırsan limit hız ve zaman sabiti ne olur?",
      options: [
        "İkisi de yarıya iner",
        "Limit hız yarıya iner, zaman sabiti değişmez",
        "İkisi de dörtte birine iner",
        "Limit hız dörtte birine iner, zaman sabiti iki katına çıkar",
      ],
      answer: 2,
      explanation:
        "Fren kuvveti B²L²v/R'dir: B iki katına çıkınca aynı hızda kuvvet dört kat olur. Bu yüzden v∞ = mgR/(B²L²) ve τ = mR/(B²L²) ikisi de dörtte birine iner. Sayfa 15.6906 m/s ve 1.6000 s'den 3.9227 m/s ve 0.4000 s'ye geçer.",
    },
    {
      question:
        "Sayfa halkayı çokgenle temsil ediyor; 32 parçada merkezdeki alan formülden +0.81 % farklı. 128 parçada fark yaklaşık ne olur?",
      options: ["+0.41 %", "+0.20 %", "+0.05 %", "0.00 %, çünkü 128 kenar tam bir halkadır"],
      answer: 2,
      explanation:
        "Orta nokta kuralının hatası 1/n² ile azalır: oran yaklaşık 1 + 5π²/(6n²). Parça sayısı dört katına çıkınca hata 16'da birine iner: 0.81/16 ≈ 0.05. Sayfada 64 parçada +0.20 %, 128 parçada +0.05 % okunur; hiçbir sonlu çokgen tam halka değildir, yalnızca fark yuvarlamanın altına iner.",
    },
  ],
  next: [
    {
      href: "lorentz-kuvveti.html",
      title: "Lorentz Kuvveti: Yüklü Parçacık Laboratuvarı",
      why: "Burada alanı ürettin; orada alanın içine yüklü bir parçacık bırakırsın. Ölçülen yörünge yarıçapını ve periyodu r = mv/(|q|B) ve T = 2πm/(|q|B) ile karşılaştır, hız seçicide ve kütle spektrometresinde izotopları ayır.",
    },
    {
      href: "alternatif-akim.html",
      title: "Alternatif Akım: RLC Devresi, Fazörler ve Rezonans",
      why: "Bu sayfanın yok saydığı öz-indüktans orada baş roldedir: seri RLC devresinde bobindeki akımın gerilimin gerisinde kalışını fazörlerle izle ve rezonans frekansını bul.",
    },
    {
      href: "elektrik-muhendisligi.html",
      title: "Elektrik Mühendisliği: Güç, İletim ve Dönüşüm",
      why: "Dönen bobinin ürettiği alternatif gerilimin şebekedeki hâli: üç fazlı gücü topla, iletim kaybının gerilimle nasıl azaldığını ve bir transformatörün verim tepesini ölç.",
    },
    {
      href: "maxwell-denklemleri-ve-alanlar.html",
      title: "Maxwell Denklemleri ve Alanlar",
      why: "Ampère, Faraday ve kapalı alan çizgileri tek bir kuramda birleşir; akı, dolaşım ve indüksiyonun elektromanyetik dalgaya nasıl vardığını gör.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 2, 12.6 Solenoids and Toroids",
      url: "https://openstax.org/books/university-physics-volume-2/pages/12-6-solenoids-and-toroids",
      note: "Solenoid alanının halka katkıları Biot–Savart ile toplanarak ve Ampère yasasıyla türetilmesi; aynı bölümün önceki kısımları Biot–Savart, paralel teller ve Ampère yasasını işler (İngilizce, açık ders kitabı).",
    },
    {
      title: "NIST CODATA · Vacuum magnetic permeability",
      url: "https://physics.nist.gov/cgi-bin/cuu/Value?mu0",
      note: "μ₀ için CODATA 2022 önerilen değeri 1.25663706127(20)×10⁻⁶ N/A²; sayfanın kullandığı sabit.",
    },
    {
      title: "NIST · Ampere: Introduction",
      url: "https://www.nist.gov/si-redefinition/ampere-introduction",
      note: "2019'a kadarki paralel tel tanımı ve 20 Mayıs 2019'dan beri temel yüke dayanan yeni tanım (İngilizce).",
    },
    {
      title: "OpenStax · University Physics Vol. 2, 13.1 Faraday's Law",
      url: "https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law",
      note: "Manyetik akı ve N sarımlı bobinde ε = −N dΦ/dt; Lenz yasası ve hareketsel emk sonraki kısımlarda (13.2, 13.3) işlenir (İngilizce, açık ders kitabı).",
    },
  ],
  revision: "Kasım 2026",
};
