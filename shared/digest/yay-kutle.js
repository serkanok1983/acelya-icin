window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["yay-kutle"] = {
  slug: "yay-kutle",
  title: "Yay ve Kütle: Saati Cebe Sığdıran Salınım",
  field: "Fizik",
  level: "Lise",
  minutes: 25,
  tagline:
    "Sarkacı yerçekimi geri çağırır, bloğu yay. Bu tek fark periyodu kütleye bağlar, yerçekiminden kurtarır; aynı denklem cep saatinden gökdelenlere, oradan moleküllere uzanır.",
  hook: "Sarkaçlı bir duvar saatini Ay'a götürsen yaklaşık iki buçuk kat yavaş işler. Kolundaki mekanik saati götürsen tik-takı neredeyse hiç değişmez. Fark tek bir parçada saklı: içindeki salınıcıyı yerçekimi değil, saç teli inceliğinde bir yay geri çağırır.",
  bigIdea:
    "Geri çağıran kuvvet dengeden uzaklıkla doğru orantılı olduğunda (<em>F = −kx</em>) hareket kusursuz bir sinüs dalgasına dönüşür ve periyodu yalnızca kütlenin yay sertliğine oranı belirler: <em>T = 2π√(m/k)</em>; genlik de yerçekimi de bu formülde yoktur.",
  story: [
    "1676'da Robert Hooke, yayımladığı bir metne anlamsız görünen bir harf dizisi ekledi: <em>ceiiinosssttuv</em>. Dönemin bilginleri bir buluşun önceliğini, içeriğini ele vermeden güvenceye almak için böyle şifreler yayımlardı. 1678'de <em>De Potentia Restitutiva, or of Spring</em> (Geri Getirme Gücü ya da Yay Üzerine) adlı çalışmasında şifreyi çözdü: harfler, alfabetik sıraya dizilmiş <strong>ut tensio, sic vis</strong> cümlesiydi; 'uzama nasılsa, kuvvet de öyle'. Hooke aynı çalışmada yasayı 1660'tan beri bildiğini yazar; bunu yalnızca kendi beyanından biliyoruz.",
    "Hooke'un aklındaki uygulama saatti. Cep saatlerinde ileri geri dönen çark, yaysız haliyle saati süren ana yayın gücüne çok duyarlıydı; ana yay gevşedikçe saat yavaşlıyordu. Çarka ince, sarmal bir <strong>denge yayı</strong> eklemek onu kendi doğal frekansında salınan bir harmonik salınıcıya dönüştürdü. Buluşun kime ait olduğu bugün de tartışmalıdır: fikir büyük olasılıkla Hooke'tan çıktı, ama 1670'lerin ortasında çalışan ilk denge yaylı saati Christiaan Huygens yaptırdı. Kaba tahminlere göre cep saatlerinin hatası günde birkaç saatten on dakika mertebesine indi; saat bir süs eşyası olmaktan çıkıp gerçek bir ölçüm aletine dönüştü.",
    "Aynı model bugün çok daha büyük ve çok daha küçük ölçeklerde çalışıyor. Bir gökdelen, kütlesi katlarında, yayı çelik iskeletinde olan dev bir yay–kütle sistemidir; rüzgâr onu kendi doğal frekansına yakın bir ritimde iterse salınım büyür. 1970'lerden beri bazı yüksek yapılara, binanın frekansına ayarlanmış ikinci bir salınan kütle yerleştirilir: <strong>ayarlı kütle sönümleyici</strong>. Öbür uçta, bir moleküldeki iki atomu bağlayan kimyasal bağ da küçük bir yay gibi titreşir. Hooke'un tek satırlık yasası, saatçilerin sırrından fiziğin en çok kullanılan modeline dönüştü.",
  ],
  core: [
    {
      heading: "Hooke yasası: uzama kadar kuvvet",
      body: "Bloğu denge konumundan x kadar çekersen yay onu ters yönde, x ile orantılı bir kuvvetle geri çeker: iki kat çekersen iki kat kuvvet. Orantı katsayısı <strong>yay sabiti</strong> k'dır ve birimi N/m'dir; 20 N/m'lik bir yayı 10 cm uzatmak 2 N ister. Bu doğrusallık bir sınıra kadar geçerlidir: gerçek bir yayı fazla zorlarsan kalıcı biçimde uzar ve yasa bozulur. Sayfadaki yay ise ideal bir modeldir; her uzamada Hooke yasasına tam uyar.",
      formula: "F = −k·x",
      formulaNote:
        "Eksi işareti, kuvvetin daima yer değiştirmenin tersine, yani dengeye doğru baktığını söyler.",
    },
    {
      heading: "İvme konumu kovalar",
      body: "Newton'un ikinci yasasını Hooke yasasıyla birleştir: ma = −kx, yani a = −(k/m)·x. İvme konumla orantılıdır ve hep ters yöndedir; blok dengeden ne kadar uzaksa o kadar sert geri çağrılır. Bu koşulu sağlayan hareket sinüs biçimli bir salınımdır. Sayfa hareketi küçük zaman adımlarıyla hesaplamaz; doğrudan bu çözümü çizer: blok her seferinde x = 0.80 m'den durgun bırakılır ve <em>x = 0.8·cos(ωt)</em> boyunca gidip gelir.",
      formula: "x(t) = A·cos(ωt),  ω = √(k/m)",
      formulaNote:
        "ω açısal frekanstır (rad/s); sayfanın üst satırındaki ilk sayı budur.",
    },
    {
      heading: "Periyot: genlik neden yok?",
      body: "Bir tam gidiş-dönüş, ωt açısı 2π kadar ilerlediğinde tamamlanır. Genliğin formülde olmamasının sezgisel nedeni şu: bloğu iki kat uzağa çekersen iki kat yol alır, ama yay da onu iki kat kuvvetle iter. Hareket, eskisinin iki kat büyütülmüş bir kopyası olur: büyütülmüş yolun karşılık gelen her noktasında (örneğin dengeden geçerken ya da yolun yarısında) hız da tam iki kattır. Yol ve hız aynı oranda büyür, süre değişmez. Aynı x noktasında ise hızlar iki kat farklı değildir; hız v = ω√(A² − x²) ile hem genliğe hem konuma bağlıdır. Sarkaçta bu yalnızca küçük açılarda yaklaşık doğrudur; ideal yayda tam doğrudur. Bir fark daha var: sarkacın periyodunda kütle yoktur, burada vardır. Çünkü geri çağıran kuvveti yerçekimi değil yay sağlar ve yay ağır bloğa fazladan kuvvet uygulamaz.",
      formula: "T = 2π√(m/k)",
      formulaNote:
        "Kütleyi 4 katına çıkarmak periyodu 2 katına çıkarır; yay sabitini 4 katına çıkarmak yarıya indirir. Yalnızca m/k oranı önemlidir.",
    },
    {
      heading: "Hız ve çeyrek periyotluk kayma",
      body: "Hız, konumun değişim hızıdır ve hız eğrisi konum eğrisinden çeyrek periyot kaymıştır. Blok uç noktada bir an durur (v = 0), dengeden geçerken en hızlıdır. En büyük hız, genlikle açısal frekansın çarpımıdır. Grafikte mavi eğri x'i, turuncu eğri v'yi çizer: mavi eğri tepedeyken turuncu sıfırdan geçer, mavi sıfırdan geçerken turuncu tepededir.",
      formula: "v(t) = −Aω·sin(ωt),  v<sub>max</sub> = Aω",
      formulaNote:
        "Sayfada A = 0.8 m olduğundan v<sub>max</sub> = 0.8·ω; varsayılan ayarda 0.8 × 4.47 ≈ 3.58 m/s.",
    },
    {
      heading: "Enerji: yayda saklanan, blokta koşan",
      body: "Gerilmiş ya da sıkışmış yay enerji depolar: ½kx². Hareket eden blok kinetik enerji taşır: ½mv². Uç noktada enerjinin tamamı yaydadır, dengede tamamı bloktadır; toplam hep aynıdır. Sayfa enerji göstermez ama hesabı kolaydır: varsayılan ayarda (k = 20 N/m, A = 0.8 m) toplam enerji 6.4 J'dür. Gerçek bir yayda sürtünme bu enerjiyi yavaş yavaş ısıya çevirir; sayfada sönüm olmadığı için genlik hiç küçülmez.",
      formula: "E = ½kx² + ½mv² = ½kA²",
      formulaNote:
        "Toplam enerji kütleye değil, yay sabitine ve genliğin karesine bağlıdır.",
    },
  ],
  lab: {
    intro:
      "Sayfada iki kaydırıcı var: <strong>Kütle m</strong> (0.5–5.0 kg, 0.1 kg adımlarla) ve <strong>Yay sabiti k</strong> (5–80 N/m, 1 N/m adımlarla). Üst satır anlık ω, T, x ve v değerlerini gösterir. <strong>Konum / hız grafiği</strong> kutusu işaretliyken alttaki grafikte mavi eğri x'i, turuncu eğri v'yi çizer; grafik dolunca son yaklaşık 4.5 saniyelik simülasyon zamanını gösterir. <strong>Sıfırla</strong> düğmesi ve kaydırıcıların her oynatılışı hareketi baştan başlatır: blok x = 0.80 m'den durgun bırakılır. Genlik 0.8 m'de sabittir; sönüm ve duraklatma düğmesi yoktur. Simülasyon her ekran karesinde 0.016 s ilerler: 60 Hz'lik bir ekranda gerçek zamandan yaklaşık %4 yavaş, 120 Hz'lik bir ekranda neredeyse iki kat hızlı akar. Bu yüzden süreyi kronometreyle değil, üst satırdaki T değerinden ve grafikteki dalga sayısından oku.",
    experiments: [
      {
        title: "Dört kat kütle, kaç kat süre?",
        predict:
          "k = 20 N/m iken kütleyi 1.0 kg'dan 4.0 kg'a çıkarırsan periyot ne olur: dört katına mı çıkar, iki katına mı, yoksa sarkaçtaki gibi hiç değişmez mi?",
        do: "Yay sabiti k'yı 20 N/m'de bırak, Kütle m'yi 1.0 kg yap ve üst satırdaki ω ile T'yi not et. Sonra kütleyi 4.0 kg yap. Her iki ayarda grafiğin dolmasını bekleyip pencereye kaç tam dalga sığdığını say.",
        observe:
          "1.0 kg'da ω = 4.47 rad/s, T = 1.40 s; 4.0 kg'da ω = 2.24 rad/s, T = 2.81 s. Grafikteki dalga sayısı yaklaşık 3.2'den 1.6'ya iner. 2.81 tam olarak 2 × 1.40 değildir, çünkü gerçek değerler 1.405 ve 2.810 s'dir; ekran yuvarlar.",
        explain:
          "T kütlenin kareköküyle büyür: √4 = 2. Sarkaçta kütle sadeleşir, çünkü yerçekimi ağır cisme orantılı olarak daha büyük kuvvet uygular. Yay ise ağır bloğa fazladan kuvvet uygulamaz; aynı kuvvet daha büyük kütleyi daha yavaş ivmelendirir.",
      },
      {
        title: "Sert yay, hızlı blok",
        predict:
          "m = 1.0 kg iken yay sabitini 20'den 80 N/m'ye çıkarırsan periyot ve en büyük hız nasıl değişir? Grafikteki mavi eğrinin yüksekliği değişir mi?",
        do: "Kütle m = 1.0 kg, Yay sabiti k = 20 N/m ile başla. Değerler hızla aktığı için, blok kesikli 'denge' çizgisinden geçerken üst satırdaki v'nin ulaştığı en büyük büyüklüğü birkaç geçiş boyunca izle; grafikte turuncu tepelerin yüksekliğine de bak. Sonra k'yı 80 N/m yap ve aynısını tekrarla.",
        observe:
          "T 1.40 s'den 0.70 s'ye iner, ω 4.47'den 8.94 rad/s'ye çıkar. Dengeden geçerken |v| yaklaşık 3.58 m/s'den 7.16 m/s'ye yükselir. Mavi x eğrisinin tepeleri yine ±0.8 m'dedir; turuncu v eğrisinin tepeleri iki kat yükselir ve pencereye altıdan fazla dalga sığar.",
        explain:
          "Dört kat sert yay periyodu √4 = 2 kat kısaltır. Genlik sabit kaldığı için blok aynı yolu yarı sürede almak zorundadır; bu yüzden en büyük hız v<sub>max</sub> = Aω da iki katına çıkar.",
      },
      {
        title: "İkiz sistemler",
        predict:
          "m = 0.5 kg, k = 10 N/m düzeneği ile m = 4.0 kg, k = 80 N/m düzeneğinden hangisi daha hızlı salınır? Hangisinde daha çok enerji vardır?",
        do: "Önce Kütle m = 0.5 kg, Yay sabiti k = 10 N/m yap; ω, T ve grafiği incele. Sonra m = 4.0 kg, k = 80 N/m yap. İstersen ara ayar olarak m = 2.0 kg, k = 40 N/m'yi de dene.",
        observe:
          "Üç ayarda da ω = 4.47 rad/s ve T = 1.40 s; animasyon da grafik de birebir aynıdır. Ekrandaki hiçbir şey bu düzenekleri birbirinden ayırt ettirmez.",
        explain:
          "Hareket yalnızca k/m oranına bağlıdır ve üç ayarda da oran 20 s⁻²'dir. Ama düzenekler aynı değildir: toplam enerji ½kA² ile 3.2 J'den 25.6 J'ye, uç noktadaki yay kuvveti kA ile 8 N'dan 64 N'a çıkar. Aynı hareketin arkasında sekiz kat farklı kuvvetler olabilir.",
      },
      {
        title: "2π saniyelik saat ve öteki uç",
        predict:
          "m = 5.0 kg ve k = 5 N/m için ω kaç olur, periyot neden tam 2π saniye çıkmalı? Sonra öteki uç olan m = 0.5 kg, k = 80 N/m için periyodu tahmin et.",
        do: "Kütle m'yi 5.0 kg, Yay sabiti k'yı 5 N/m yap; üst satırı oku ve grafiğin dolmasını bekle. Ardından m = 0.5 kg, k = 80 N/m yap.",
        observe:
          "İlk ayarda ω = 1.00 rad/s, T = 6.28 s; en büyük hız yalnızca 0.80 m/s, turuncu eğri neredeyse düzdür ve pencereye bir dalganın ancak yaklaşık dörtte üçü sığar. İkinci ayarda ω = 12.65 rad/s, T = 0.50 s; pencereye dokuz dalga sığar ve turuncu hız eğrisinin tepeleri grafiğin dışına taşar.",
        explain:
          "ω = 1 rad/s, faz açısının saniyede 1 radyan ilerlemesidir; tam tur 2π radyan olduğu için 2π ≈ 6.28 s sürer. İki uç arasındaki periyot oranı √160 ≈ 12.6'dır, çünkü m/k oranı 1'den 1/160'a iner. Grafiğin hız ölçeği sabittir: k/m yaklaşık 120 s⁻²'yi (ω ≈ 11 rad/s) aşınca hız tepeleri pencereden taşar. Bu fiziğin değil, çizimin sınırıdır.",
      },
    ],
  },
  wow: [
    {
      title: "Gökdelenin tepesinde 660 tonluk sarkaç",
      body: "Taipei 101 gökdeleninin 92. katından 5.5 metre çaplı, yaklaşık 660 tonluk çelik bir küre sarkar. Bu bir ayarlı kütle sönümleyicidir: frekansı binanınkine ayarlanmıştır; rüzgâr binayı itince küre gecikmeli salınıp onu hareketinin tersine çeker, sönümleyiciler de enerjiyi ısıya çevirir. 2015'te Soudelor tayfunu küreyi 1 metre savurdu; o güne dek kaydedilen en büyük hareketi buydu. Dikkat: küreyi geri çağıran bir yay değil, yerçekimidir; halatlar onu yalnızca kavisli bir yolda tutar. Yani bu bir sarkaçtır ve frekansını kütle değil halat boyu belirler. Küçük salınımlarda denklemi yay–kütleninkiyle aynıdır; k/m'nin yerini g/L alır.",
    },
    {
      title: "Molekül de bir yay",
      body: "Hidrojen klorür (HCl) molekülündeki bağ, yay sabiti yaklaşık 500 N/m olan bir yay gibi davranır; sayfadaki en sert yaydan altı kat serttir. Ama klor atomu neredeyse hiç kıpırdamaz, salınan hidrojendir ve kütlesi yaklaşık 1.7×10⁻²⁷ kg'dır. ω = √(k/m) bu yüzden devasa çıkar: bağ saniyede yaklaşık 8.7×10¹³ kez titreşir ve dalga boyu yaklaşık 3.5 mikrometre olan kızılötesi ışığı soğurur. Kızılötesi spektroskopi molekülleri bu 'yay seslerinden' tanır.",
    },
    {
      title: "Saniyede 32 768 titreşim",
      body: "Kuvars kol saatlerinde minik bir diyapazon biçiminde kesilmiş kuvars kristali saniyede 32 768 kez titreşir. Sayı rastgele değildir: 32 768 = 2<sup>15</sup>. Saatin devresi bu frekansı on beş kez art arda ikiye bölerek tam 1 Hz'lik bir tık elde eder. Kristalin titreşimi de esnek bir cismin salınımıdır; diyapazonun kolları hem kütle hem yay görevi görür. Kuvars ayrıca piezoelektriktir: bükülünce elektrik gerilimi üretir, gerilim uygulanınca bükülür. Devre bu sayede titreşimi hem besler hem sayar.",
    },
  ],
  worked: {
    title: "Periyottan kütle bulmak",
    prompt:
      "k = 20 N/m'lik bir yaya bağlı bilinmeyen bir kütlenin periyodu 2.51 s ölçülüyor. Kütleyi bul. Sonra A = 0.80 m genlik için en büyük hızı ve toplam enerjiyi hesapla; sonucu sayfada doğrula.",
    steps: [
      "Periyot formülünü kütle için çöz: T = 2π√(m/k) ise T² = 4π²·m/k, yani m = kT²/(4π²).",
      "Sayıları yerleştir: T² = 2.51² ≈ 6.30 s², 4π² ≈ 39.48. m = 20 N/m × 6.30 s² / 39.48 ≈ 3.19 kg; sayfa kütleyi 0.1 kg adımlarla ayarladığı için 3.2 kg al. Birim denetimi: (N/m)·s² = (kg·m/s²)·s²/m = kg.",
      "Açısal frekansı bul: ω = √(k/m) = √(20/3.2) = √6.25 = 2.50 rad/s. En büyük hız: v<sub>max</sub> = Aω = 0.80 m × 2.50 rad/s = 2.0 m/s.",
      "Toplam enerji uç noktada tamamen yaydadır: E = ½kA² = ½ × 20 N/m × (0.80 m)² = 6.4 J. Denetim: dengede tamamen kinetiktir, ½·m·v<sub>max</sub>² = ½ × 3.2 kg × (2.0 m/s)² = 6.4 J.",
      "Sayfada dene: Kütle m = 3.2 kg, Yay sabiti k = 20 N/m. Üst satırda ω = 2.50 rad/s ve T = 2.51 s görmelisin; blok dengeden geçerken |v| 2.0 m/s'ye yaklaşır.",
    ],
    result:
      "m ≈ 3.2 kg, v<sub>max</sub> = 2.0 m/s, E = 6.4 J. Bu yöntem tartıya, dolayısıyla yerçekimine ihtiyaç duymaz; bilinen bir yay ve bir saat yeter. İlke olarak ağırlıksız bir uzay istasyonunda da aynı biçimde çalışır.",
  },
  misconceptions: [
    {
      myth: "Bloğu daha uzağa çekersen bir gidiş-dönüş daha uzun sürer.",
      truth:
        "İdeal yayda periyot genlikten tamamen bağımsızdır: iki kat yol, iki kat hızla alınır. Sarkaçta bu yalnızca küçük açılarda yaklaşık doğrudur; yay–kütlede yay Hooke bölgesinde kaldıkça tam doğrudur. Sayfada genlik 0.8 m'de sabit olduğundan bunu doğrudan deneyemezsin; ama T = 2π√(m/k) formülünde A yoktur.",
    },
    {
      myth: "Sarkaçta olduğu gibi, yayda da kütle periyodu etkilemez.",
      truth:
        "Sarkaçta geri çağıran kuvvet yerçekimidir ve kütleyle orantılı büyür; bu yüzden kütle sadeleşir. Yayın kuvveti yalnızca uzamaya bağlıdır, kütleyi umursamaz. Sayfada k = 20 N/m iken kütleyi 1.0 kg'dan 4.0 kg'a çıkar: T 1.40 s'den 2.81 s'ye çıkar.",
    },
    {
      myth: "Denge noktasında kuvvet sıfır olduğuna göre blok orada durur.",
      truth:
        "Kuvvet ve ivme dengede sıfırdır ama hız en büyüktür; blok dengeden en hızlı geçer. Durduğu yerler uç noktalardır ve orada kuvvet en büyüktür. Grafikte mavi eğri sıfırdan geçerken turuncu eğrinin tepede olduğuna bak.",
    },
    {
      myth: "Yay–kütle saati de Ay'da yavaşlar; düşey asılırsa yerçekimi periyodu değiştirir.",
      truth:
        "g periyot formülünde yoktur. Yayı düşey asmak denge konumunu mg/k kadar aşağı kaydırır, ama blok bu yeni denge çevresinde aynı T = 2π√(m/k) ile salınır. Bu yüzden yay–kütle düzeneği Ay'da da Dünya'daki periyotla çalışır; sarkaç ise yaklaşık 2.45 kat yavaşlar.",
    },
  ],
  glossary: [
    {
      term: "Hooke yasası",
      definition:
        "Esneklik sınırı içinde, esnek bir cismin uzamasının uygulanan kuvvetle doğru orantılı olduğunu söyleyen yasa; yay için F = −kx.",
    },
    {
      term: "Yay sabiti (k)",
      definition:
        "Yayın sertliği, yani metre başına uzama için gereken kuvvet; birimi N/m (= kg/s²), 20 N/m'lik yay 10 cm uzayınca 2 N ile çeker.",
    },
    {
      term: "Denge konumu",
      definition:
        "Bloğa etkiyen net kuvvetin sıfır olduğu konum; bu yatay düzenekte yayın hiç kuvvet uygulamadığı, kesikli 'denge' çizgisiyle gösterilen yerdir (düşey asılı yayda ise mg/k kadar aşağı kayar).",
    },
    {
      term: "Genlik (A)",
      definition: "Denge konumundan en büyük uzaklaşma; bu sayfada sabit 0.8 m.",
    },
    {
      term: "Periyot (T) ve frekans (f)",
      definition:
        "T bir tam gidiş-dönüşün süresidir; f = 1/T saniyedeki salınım sayısıdır, birimi hertz.",
    },
    {
      term: "Açısal frekans (ω)",
      definition:
        "Salınımın faz açısının değişim hızı, rad/s; yay–kütlede ω = √(k/m) = 2π/T.",
    },
    {
      term: "Faz",
      definition:
        "x = A·cos(ωt + φ) ifadesindeki açı; salınımın döngünün hangi noktasında olduğunu söyler.",
    },
    {
      term: "Esneklik sınırı",
      definition:
        "Bir cismin kuvvet kalkınca eski biçimine dönebildiği en büyük zorlanma; aşılırsa kalıcı şekil değişimi başlar.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede yay–kütle bir formüldür; üniversitede ilk tanıştığın <strong>diferansiyel denklemlerden</strong> biridir: m·x″ + k·x = 0. Bu denklem 'ikinci türevi kendisinin eksi bir katı olan fonksiyon hangisi?' diye sorar; cevap sinüs ve kosinüstür. Denkleme hızla orantılı bir sürtünme terimi c·x′ eklersen <strong>sönümlü salınıcı</strong> elde edersin. Sağ tarafa periyodik bir dış kuvvet F₀·cos(Ωt) koyarsan sürülen salınıcı olur: sürücü frekans Ω doğal frekans ω₀ = √(k/m)'ye yaklaştıkça genlik büyür. Buna <em>rezonans</em> denir; tepenin ne kadar yükseleceğini sönüm belirler. Ayarlı kütle sönümleyiciler bu denklemin iki kütleli bir sürümüyle tasarlanır. Aynı denklem elektronikte bir LC devresini anlatır: bobinin indüktansı kütlenin, kondansatörün 1/C değeri yay sabitinin rolünü oynar.",
      "Yay–kütlenin her yerde karşına çıkmasının derin bir nedeni var. Bir sistemin enerjisi kararlı bir denge noktasında en küçük değerini alıyorsa, o noktanın çok yakınında enerji eğrisi hemen her zaman ½kx² gibi bir paraboldür (Taylor açılımının ilk anlamlı terimi). Yani kararlı dengenin çevresindeki küçük salınımların çoğu harmoniktir. Birbirine yaylarla bağlı çok sayıda kütle <strong>normal modlara</strong> ayrışır; bunları bulmak lineer cebirdeki özdeğer problemidir ve zincir uzadıkça modlar dalgalara dönüşür. Kuantum mekaniğinde aynı salınıcının enerjisi yalnızca ħω(n + ½) basamaklarında bulunabilir; HCl'nin kızılötesi soğurması bu basamaklar arasındaki bir atlamadır.",
    ],
    topics: [
      "Diferansiyel denklemler",
      "Sönümlü ve sürülen salınıcı",
      "Rezonans",
      "Normal modlar ve özdeğerler",
      "LC devreleri",
      "Kuantum harmonik salınıcı",
    ],
  },
  quiz: [
    {
      question:
        "Bir yay–kütle düzeneği 1.4 s periyotla salınıyor. Yay sabiti 8 katına, kütle 2 katına çıkarılırsa yeni periyot kaç saniye olur?",
      options: ["5.6 s", "1.4 s (değişmez)", "0.7 s", "0.35 s"],
      answer: 2,
      explanation:
        "T, √(m/k) ile orantılıdır. m/k oranı 2/8 = 1/4 katına iner; karekökü 1/2 olduğundan T = 1.4 s × ½ = 0.7 s. 0.35 s karekökü unutmanın, 5.6 s ise oranı ters çevirmenin sonucudur. Kural: yalnızca m/k oranı önemlidir ve periyoda karekök olarak yansır.",
    },
    {
      question:
        "Bir yay–kütle düzeneği Dünya'dan Ay'a (yerçekimi yaklaşık altı kat küçük) götürülüp düşey asılıyor. Periyodu ne olur?",
      options: [
        "Yaklaşık 2.45 kat uzar",
        "Değişmez",
        "Altı kat uzar",
        "Salınım hiç olmaz",
      ],
      answer: 1,
      explanation:
        "g, T = 2π√(m/k) içinde yoktur; yerçekimi yalnızca denge konumunu mg/k kadar kaydırır. 2.45 kat uzama sarkaç için doğru cevaptır; iki salınıcıyı ayıran temel fark budur.",
    },
    {
      question:
        "Sayfada m = 1.0 kg, k = 80 N/m iken (A = 0.8 m) blok dengeden geçerken hızı yaklaşık kaçtır?",
      options: ["0.70 m/s", "3.58 m/s", "7.16 m/s", "64 m/s"],
      answer: 2,
      explanation:
        "ω = √(80/1.0) ≈ 8.94 rad/s ve v<sub>max</sub> = Aω = 0.8 × 8.94 ≈ 7.16 m/s. 0.70 bu ayardaki periyodun saniye cinsinden değeri, 64 ise uç noktadaki kuvvet kA'nın newton cinsinden değeridir; birimlere bakmak bu tuzakları ayıklar.",
    },
  ],
  next: [
    {
      href: "sarkac.html",
      title: "Sarkaç",
      why: "Aynı sinüs, farklı geri çağıran kuvvet: orada Kütle m kaydırıcısı periyodu kıpırdatmaz, Yerçekimi g menüsünden Ay'ı seçmek ise yaklaşık 2.5 kat uzatır. Burada olanın tam tersi.",
    },
    {
      href: "is-enerji.html",
      title: "İş–Enerji İlkesi",
      why: "Yay yok ama enerji hesabı aynı: Eğim açısı ve Sürtünme μ kaydırıcılarıyla eğik düzlemde kayan bloğun KE, PE, W_net ve Isı çubuklarını izle; bu sayfada olmayan sürtünmenin mekanik enerjiyi nasıl ısıya çevirdiğini gör.",
    },
    {
      href: "duran-dalgalar.html",
      title: "Duran Dalgalar",
      why: "Yaylarla bağlı kütleler sonsuz küçülüp sıklaşırsa gerilmiş bir tele dönüşür ve tek doğal frekans yerine bir frekans merdiveni çıkar; Harmonik Mod (n) kaydırıcısıyla n = 1–5 modlarını, düğüm ve karın noktalarını gör.",
    },
    {
      href: "diferansiyel-denklemler.html",
      title: "Diferansiyel Denklemler",
      why: "Bu sayfada olmayan iki şey orada var: Sönüm c = 0 iken Başlangıç konumu kaydırıcısıyla genliği değiştir ve x(t) tepelerinin aralığının değişmediğini gör; sonra Sönüm c'yi aç, faz düzlemindeki kapalı elips içe doğru sarmala döner.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 1, 15.1 Simple Harmonic Motion",
      url: "https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion",
      note: "Hooke yasasından periyot ve enerji formüllerine, çözümlü örneklerle (İngilizce, açık ders kitabı).",
    },
    {
      title: "PhET · Kütleler ve Yaylar",
      url: "https://phet.colorado.edu/tr/simulations/masses-and-springs",
      note: "Sönüm, yerçekimi ve enerji gösterimi olan bir yay laboratuvarı; bu sayfada olmayanları orada dene.",
    },
    {
      title: "HyperPhysics · Simple Harmonic Motion",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/shm.html",
      note: "Basit harmonik hareketin denklemleri ve kısa, formül odaklı özetler.",
    },
    {
      title: "Wikipedia · Hooke's law",
      url: "https://en.wikipedia.org/wiki/Hooke%27s_law",
      note: "Yasanın tarihi: Hooke'un 1660 iddiası, 1676'da yayımlanan ceiiinosssttuv anagramı ve 1678'deki çözümü 'ut tensio, sic vis' (İngilizce).",
    },
  ],
  revision: "Ekim 2026",
};
