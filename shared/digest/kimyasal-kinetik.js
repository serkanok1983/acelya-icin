window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kimyasal-kinetik"] = {
  slug: "kimyasal-kinetik",
  title: "Kimyasal Kinetik: Tepkimelerin Saati",
  field: "Kimya",
  level: "Lise",
  minutes: 30,
  tagline:
    "Şeker yanmak, elmas grafite dönüşmek 'ister'; ama ikisi de oda sıcaklığında yerinden kıpırdamaz. Sır bir enerji tepesinde ve sıcaklığın o tepeyi aşan molekülleri nasıl çoğalttığında.",
  hook:
    "Kavanozdaki şeker küpü neden kendiliğinden alev almıyor? Oksijenle tepkimesi bol enerji açığa çıkarır, termodinamik 'yan' der; ama küp yıllarca durur, kibrit tutsan bile çoğunlukla yalnızca erir ve kararır. Vücudun ise aynı dönüşümü 37 °C'de alevsiz yapar: bir tepkimenin olabilmesi ile gerçekten olması arasındaki bu uçurumun adı kinetiktir.",
  bigIdea:
    "Bir tepkimenin ne kadar enerji verdiğini termodinamik, <strong>ne kadar hızlı</strong> yürüdüğünü kinetik söyler: hız, çarpışmaların ne kadarının <strong>aktivasyon enerjisi</strong> tepesini aşabildiğine bağlıdır ve bu pay sıcaklıkla <em>k = A·e<sup>−Eₐ/RT</sup></em> kuralına göre büyür.",
  story: [
    "1850'de Alman bilim insanı Ludwig Wilhelmy, asitli suda çözünmüş sakkarozun (sofra şekeri) glikoz ve fruktoza ayrışmasını izledi. Elinde bir <strong>polarimetre</strong> vardı: sakkaroz çözeltisi polarize ışığın düzlemini sağa çevirir, ürün karışımı sola. Çevrilme açısını okuyarak şekerin ne kadarının kaldığını, tepkimeyi hiç durdurmadan dakika dakika ölçebiliyordu. Bulduğu kural sadeydi: dönüşüm hızı, o anda kalan şeker miktarıyla orantılıydı. Wilhelmy bunu bir diferansiyel denklem olarak yazdı, çözdü ve verileriyle karşılaştırdı. Bu, bir tepkime hızının ilk nicel ölçümü sayılır; ama çağdaşları pek ilgilenmedi ve önemi ancak 1884'te Wilhelm Ostwald dikkat çekince anlaşıldı.",
    "1864'te Christiania'da (bugünkü Oslo) iki meslektaş, Peter Waage ve sonradan kayınbiraderi olacak Cato Guldberg, <strong>kütlelerin etkisi yasasını</strong> ortaya koydu: bir tepkimenin itici gücü, tepkimeye girenlerin 'etkin kütlelerinin', yani derişimlerinin çarpımıyla orantılıdır. Bugün hız yasası dediğimiz <em>hız = k[A][B]</em> biçiminin ve denge sabitinin kökü bu fikirdir. 1884'te Hollandalı Jacobus van 't Hoff, <em>Études de dynamique chimique</em> (Kimyasal Dinamik Üzerine Çalışmalar) adlı kitabında tepkime derecesini grafikle bulmanın yeni bir yolunu gösterdi ve hız sabitinin sıcaklıkla nasıl değişebileceğine dair bir bağıntı önerdi. 1901'de verilen ilk Nobel Kimya Ödülü, kimyasal dinamik ve ozmotik basınç yasaları için ona gitti.",
    "1889'da Leipzig'de Ostwald'ın laboratuvarında çalışan İsveçli Svante Arrhenius, Wilhelmy'nin şekerine geri döndü. Sıcaklık birkaç derece artınca tepkime, moleküllerin biraz hızlanmasıyla açıklanamayacak kadar çok hızlanıyordu. Arrhenius'un açıklaması: yalnızca fazladan enerji taşıyan küçük bir 'etkin' molekül azınlığı tepkimeye girer ve bu azınlığın oranı sıcaklıkla üstel biçimde büyür. Bugün onun adıyla anılan denklem buradan doğdu. İlginç bir ayrıntı: Arrhenius 1903'te Nobel aldığında ödül bu denklem için değil, tuzların, asitlerin ve bazların suda iyonlarına ayrıştığını söyleyen elektrolitik ayrışma kuramı içindi.",
    "Ostwald 1890'larda, tepkimeyi hızlandırıp kendisi tükenmeyen maddelere, yani <strong>katalizörlere</strong> bugün de kullandığımıza yakın bir tanım getirdi; 1909 Nobel Kimya Ödülü'nü kataliz, denge ve tepkime hızları üzerine çalışmaları için aldı. Arrhenius'un 'etkin molekülleri' ise 1916'da Max Trautz'un ve 1918'de William Lewis'in birbirinden bağımsız geliştirdiği <strong>çarpışma kuramıyla</strong> somut bir resme kavuştu: molekül çiftleri çarpışır, ama yalnızca yeterince sert ve uygun açıyla çarpışanlar ürün verir. Bugün gübre üretiminden arabaların egzoz dönüştürücülerine, ilaçların vücuttaki ömründen hücrelerimizdeki enzimlere kadar her yerde aynı soru sorulur: ne kadar hızlı?",
  ],
  core: [
    {
      heading: "Hız: eğrinin eğimi",
      body:
        "<strong>Tepkime hızı</strong>, bir maddenin derişiminin birim zamandaki değişimidir; birimi mol/(L·s). İki an arasındaki fark ortalama hızı, derişim–zaman eğrisinin bir noktadaki teğetinin eğimi ise o andaki <em>anlık</em> hızı verir. Sayfadaki grafikte eğri başta en diktir ve giderek yatıklaşır: A azaldıkça hız da azalır. Üstteki <strong>Hız (mol/L·s)</strong> kutusu tam bu anlık eğimi gösterir. aA + bB → cC gibi katsayılı tepkimelerde her maddenin değişimi kendi katsayısına bölünür; böylece hangi maddeyi izlersen izle aynı hız sayısını bulursun.",
      formula: "hız = −Δ[A]/Δt = +Δ[C]/Δt",
      formulaNote: "Eksi işareti, tükenen maddenin derişimi azalırken hızın pozitif çıkması içindir. Sayfadaki A + B → C'de tüm katsayılar 1'dir.",
    },
    {
      heading: "Hız yasası: üsler deneyden gelir",
      body:
        "<strong>Hız yasası</strong>, hızın derişimlere nasıl bağlı olduğunu söyler. m ve n üslerine o maddeye göre <strong>tepkime derecesi</strong> denir ve kural olarak denkleme bakarak değil, ölçerek bulunur. Örneğin H₂ + Br₂ → 2HBr tepkimesinin başlangıç hızında [Br₂]'nin üssü 1 değil 1/2 çıkar, çünkü tepkime arka planda birkaç basamakta yürür. Sayfanın tepkimesi A + B → C olarak yazılmıştır ama kod hızı yalnızca <em>k[A]</em> ile hesaplar: B'nin çok bol olduğu, derişiminin neredeyse hiç değişmediği varsayılır. Buna <strong>yalancı birinci derece</strong> denir; B'nin etkisi k'nın içine gömülmüştür.",
      formula: "hız = k·[A]<sup>m</sup>[B]<sup>n</sup>",
      formulaNote: "k'nın birimi dereceye göre değişir: birinci derecede s⁻¹, ikinci derecede L/(mol·s). Sayfadaki k birinci derecedir, birimi s⁻¹.",
    },
    {
      heading: "Birinci derece: yarılanma hep aynı sürer",
      body:
        "Hız kalan miktarla orantılıysa, madde her eşit zaman aralığında aynı <em>oranda</em> azalır: yarısı gider, sonra kalanın yarısı, sonra onun yarısı. Derişim üstel olarak söner ve yarıya inme süresi, yani <strong>yarı ömür</strong>, başlangıçta ne kadar madde olduğuna hiç bakmaz. 2 mol/L ile başlarsan hız iki kat büyük olur, ama yarılacak miktar da iki kat büyüktür; ikisi sadeleşir. Radyoaktif çekirdekler, vücuttaki pek çok ilacın kandan temizlenmesi ve Wilhelmy'nin şekeri aynı denklemi izler.",
      formula: "[A] = [A]₀·e<sup>−kt</sup>   ·   t<sub>½</sub> = ln 2 / k",
      formulaNote: "Sayfada 25 °C ve katalizörsüz durumda k ≈ 0.174 s⁻¹, dolayısıyla t½ = 0.693 / 0.174 ≈ 3.98 s, yani yaklaşık 4 s. Üç yarı ömür sonra (≈ 12 s) A'nın sekizde biri kalır.",
    },
    {
      heading: "Arrhenius: tepeyi aşanların payı",
      body:
        "Moleküllerin enerjileri eşit değildir; sıcaklık yalnızca ortalamayı belirler. Ürüne dönüşmek için bir çarpışmanın en az <strong>aktivasyon enerjisi</strong> Eₐ kadar enerji taşıması gerekir ve böyle çarpışmaların payı kabaca e<sup>−Eₐ/RT</sup>'dir. Sayfanın kodunda Eₐ = 50 kJ/mol ve <strong>frekans faktörü</strong> A = 1.0 × 10⁸ s⁻¹ seçilmiş. 25 °C'de e<sup>−Eₐ/RT</sup> ≈ 1.7 × 10⁻⁹: milyar çarpışmadan yalnızca bir ya da ikisi tepeyi aşar. Sıcaklık artınca dağılımın kuyruğu kalınlaşır ve bu küçük pay hızla büyür. Dikkat: formüldeki A ile tepkimedeki madde A aynı şey değildir; sayfa ikisi için de aynı harfi kullanıyor.",
      formula: "k = A·e<sup>−Eₐ/RT</sup>   ⇔   ln k = ln A − (Eₐ/R)·(1/T)",
      formulaNote: "T kelvin cinsinden (°C + 273.15), R = 8.314 J/(mol·K). ln k'yı 1/T'ye karşı çizersen doğru çıkar; eğimi −Eₐ/R'dir. Eₐ deneyde böyle ölçülür.",
    },
    {
      heading: "Katalizör: tepeyi aşmak yerine altından tünel",
      body:
        "<strong>Katalizör</strong> tepkimeye daha alçak tepeli başka bir yol açar ve sonunda değişmeden geri çıkar. Yolu alçaltır ama başlangıç ve bitiş noktalarının yüksekliğine dokunmaz: ileri ve geri tepkimeyi aynı oranda hızlandırır, bu yüzden denge sabitini ve tepkimenin toplam enerji değişimini değiştirmez. Sayfa katalizörü basitçe k'yı çarparak modeller: <em>Enzim</em> ×10, <em>Metal</em> ×50. Bu, 25 °C'de tepeyi yaklaşık 5.7 ve 9.7 kJ/mol alçaltmaya denktir. Gerçek enzimler çok daha çarpıcıdır; aşağıdaki 'Vay' notlarından birine bak.",
      formula: "k<sub>kat</sub> / k = e<sup>ΔEₐ/RT</sup>",
      formulaNote: "ΔEₐ, katalizörün tepeyi ne kadar alçalttığıdır (A değişmiyor varsayımıyla). 25 °C'de RT ≈ 2.48 kJ/mol; ×10 için ΔEₐ = RT·ln 10 ≈ 5.7 kJ/mol.",
    },
  ],
  lab: {
    intro:
      "Panelde üç kaydırıcı var: <strong>Sıcaklık (°C)</strong> 0–100 (başta 25), <strong>Başlangıç konsantrasyonu [A]₀ (mol/L)</strong> 0.1–2.0 (başta 1.0) ve üç konumlu <strong>Katalizör</strong> (Yok / Enzim / Metal). Altında <strong>Baştan başlat</strong> ve <strong>Duraklat</strong> düğmeleri. Üstteki dört kutu Zaman (s), Hız (mol/L·s), A (%) ve C (%) değerlerini verir; noktaların yanındaki grafik [A]'yı zamana karşı çizer. Hız kutusu bilimsel gösterim kullanır: '1.74e-1' demek 1.74 × 10⁻¹ = 0.174 demektir. [A]₀'ı değiştirmek deneyi baştan başlatır; sıcaklık ve katalizör ise anında, deney sürerken etki eder. Kullanışlı bir hile: <strong>Duraklat</strong>'a bas, sonra <strong>Baştan başlat</strong>'a bas. Zaman 0.0'da donar ve [A]₀ = 1.0 iken Hız kutusu doğrudan k'yı gösterir; sıcaklık ve katalizör kaydırıcılarını oynattıkça bu sayı canlı güncellenir. Dürüst bir uyarı: sayfanın üstündeki açıklama 'Parçacıklar çarpıştıkça ürün oluşur' der, ama soldaki kutu bir çarpışma simülasyonu değildir. Noktalar birbirinin içinden geçer, yalnızca duvarlardan seker; B molekülleri hiç çizilmez. Her karede her nokta, kalan A oranına göre zar atılarak mavi (A) ya da yeşil (C) boyanır, renklerin titreşmesi bundandır. Noktaların hızı da sıcaklıkla değişmez: Sıcaklık'ı 0'dan 100'e çekip kendin bak. Hesabın tamamı k[A] formülünden gelir; ölçüm için kutulardaki sayılara ve düz grafiğe güven, gerçek çarpışma resmi için kaynaklardaki PhET simülasyonuna bak.",
    experiments: [
      {
        title: "Derişimi dört katına çıkar, yarı ömre bak",
        predict: "25 °C'de, katalizör yokken [A]₀'ı 0.5'ten 2.0 mol/L'ye çıkarırsan başlangıç hızı kaç katına çıkar? A (%) kutusunun 50'ye inmesi daha mı kısa, daha mı uzun sürer?",
        do: "Duraklat'a bas, [A]₀ kaydırıcısını sırayla 0.5, 1.0 ve 2.0'a getir ve her seferinde Zaman 0.0'dayken Hız kutusunu oku (kaydırıcı her oynadığında deney baştan başlar). Sonra her değer için ayrı ayrı: [A]₀'ı ayarla, Devam et'e bas ve A (%) 50'ye, ardından 25'e indiği anlardaki Zaman'ı not et.",
        observe: "Başlangıç hızları 8.69e-2, 1.74e-1 ve 3.47e-1: tam dört kat fark. Ama A (%) her üç durumda da Zaman ≈ 3.9 s'de 50'ye, ≈ 7.9 s'de 25'e iner (kutu yüzdeyi tam sayıya yuvarladığı için, gerçek t½ = 3.99 s'den bir tık önce). Grafikteki eğri üçünde de aynı biçimdedir, çünkü dikey eksen [A]₀'a göre ölçeklenmiştir.",
        explain: "Birinci derecede hız = k[A]: derişim dört kat, hız dört kat. Ama yarılanacak miktar da dört kat büyük; bu yüzden t½ = ln 2 / k derişimden bağımsızdır. İkinci yarılanmanın da birincisiyle aynı süre (≈ 4 s) alması birinci derecenin parmak izidir.",
      },
      {
        title: "On derece kuralını sına",
        predict: "'Sıcaklık 10 °C artınca hız iki katına çıkar' kuralı sayfada 0→10 °C, 25→35 °C ve 90→100 °C aralıklarında aynı oranı mı verir?",
        do: "Duraklat, [A]₀ = 1.0, Katalizör Yok, sonra Baştan başlat. Zaman 0.0'da donmuşken Sıcaklık kaydırıcısını 0, 10, 25, 35, 90 ve 100'e getir ve Hız kutusunu her seferinde oku. Ardışık değerleri birbirine böl.",
        observe: "0 °C: 2.74e-2, 10 °C: 5.97e-2 (×2.18). 25 °C: 1.74e-1, 35 °C: 3.34e-1 (×1.92). 90 °C: 6.42e+0, 100 °C: 1.00e+1 (yalnızca ×1.56). 0'dan 100 °C'ye toplam artış yaklaşık 365 kat.",
        explain: "Oran e<sup>(Eₐ/R)(1/T₁ − 1/T₂)</sup>'dir ve 1/T₁ − 1/T₂ farkı aynı 10 derece için sıcakta küçülür. Kural, Eₐ ≈ 50 kJ/mol civarındaki tepkimeler için oda sıcaklığı çevresinde işe yarayan bir pratik hesaptır; doğa yasası değil.",
      },
      {
        title: "Katalizör mü, ocak mı?",
        predict: "25 °C'de Enzim konumunun sağladığı hızı katalizörsüz yakalamak için sıcaklığı kaç dereceye çıkarman gerekir? Metal için? Katalizör, tepkimenin sonunda oluşan C miktarını değiştirir mi?",
        do: "Duraklat, [A]₀ = 1.0, 25 °C, Baştan başlat. Katalizör'ü Yok, Enzim, Metal konumlarına getirip Hız'ı oku. Sonra Katalizör Yok iken sıcaklığı yükselterek Enzim'in değerini yakalamaya çalış. En son her ayarı Devam et ile sonuna kadar çalıştır ve C (%) kutusuna bak.",
        observe: "Yok 1.74e-1, Enzim 1.74e+0, Metal 8.69e+0. Katalizörsüz 63 °C'de 1.70e+0, 64 °C'de 1.79e+0: Enzim'in yaptığını ancak yaklaşık 63–64 °C yapar. Metal'in değerine ancak 97 °C civarında (8.79e+0) yetişilir. Her durumda C (%) sonunda 100'e ulaşır; değişen yalnızca süredir.",
        explain: "Katalizör tepeyi alçaltır, ısıtmak ise molekülleri tepeye taşır; ikisi de k'yı büyütür. Sayfanın tepkimesi tersinmez yazıldığı için hep %100 ürüne gider; tersinir bir tepkimede de katalizör varılan denge noktasını değiştirmez, yalnızca oraya daha çabuk götürür. Not: sayfa Enzim'e 100 °C'de bile ×10 verir; gerçek enzimlerin çoğu bu sıcaklıktan çok önce bozulur.",
      },
      {
        title: "Yolun ortasında ocağı aç",
        predict: "0 °C'de A yarıya inmişken sıcaklığı birden 50 °C'ye çıkarırsan Hız kutusu kaç katına sıçrar? A (%) da sıçrar mı?",
        do: "Katalizör Yok, [A]₀ = 1.0, Sıcaklık 0, Baştan başlat. A (%) 50'yi gösterdiği anda (Zaman ≈ 24.9 s) Hız'ı oku ve hemen Sıcaklık'ı 50'ye çek. Ardından A (%) 25'e inene kadar izle.",
        observe: "Hız yaklaşık 1.4e-2'den 4.2e-1'e, yani yaklaşık 30 katına sıçrar; A (%) ise 50'de kalır, sıçramaz. Grafikteki düz eğri o noktada keskin bir dirsek yapar ve A, 25'e bir saniyeden kısa sürede (Zaman ≈ 25.7 s) iner. 0 °C'de aynı yol yaklaşık 25 saniye daha sürecekti.",
        explain: "Hız = k[A]: sıcaklık k'yı anında değiştirir ama [A] o an ne ise odur. Soluk kesikli eğri, sıcaklık değişince geçmişi değil 'en baştan bu sıcaklıkta başlasaydı' durumunu çizer ve düz eğriyle aynı zaman ölçeğinde çizilmez; karşılaştırma için onu değil, kutulardaki sayıları kullan.",
      },
    ],
  },
  wow: [
    {
      title: "Elmas sonsuza kadar değil; sadece acelesi yok",
      body:
        "Oda sıcaklığında ve normal basınçta karbonun kararlı biçimi grafittir; elmasın standart oluşum Gibbs enerjisi grafitinkinden yaklaşık 2.9 kJ/mol yüksektir. Yani termodinamik açıdan her elmas grafite dönüşmek 'ister'. Ama dönüşüm için kristaldeki güçlü bağların yeniden düzenlenmesi gerekir ve bu engel o kadar yüksektir ki dönüşüm insan ömrü ölçeğinde gözlenmez. Elmasın kalıcılığı termodinamiğin değil kinetiğin hediyesidir.",
    },
    {
      title: "78 milyon yıl yerine 18 milisaniye",
      body:
        "Orotidin 5′-fosfat dekarboksilaz adlı enzim, DNA ve RNA yapı taşlarının üretimindeki bir adımı hızlandırır. Anna Radzicka ile Richard Wolfenden 1995'te enzimsiz tepkimeyi kuvars tüplerde yüksek sıcaklıklarda ölçtü ve sıcaklık bağımlılığından oda sıcaklığına geri hesapladı (bu sayfadaki ln k – 1/T mantığıyla): yarı ömür yaklaşık 78 milyon yıl. Enzimle aynı adımın yarı ömrü yaklaşık 18 milisaniye; hızlanma yaklaşık 10<sup>17</sup> kat. Sayfadaki ×10'luk 'Enzim' bunun yanında mütevazı kalır: aynı formülle hesaplarsan 10<sup>17</sup>, 25 °C'de tepeyi yaklaşık 97 kJ/mol alçaltmaya denktir.",
    },
    {
      title: "Termometre yerine cırcır böceği",
      body:
        "1897'de fizikçi Amos Dolbear 'Termometre olarak cırcır böceği' başlıklı kısa bir makale yayımladı. Kuralı Fahrenheit cinsindendi: dakikadaki ötüş sayısı N ise sıcaklık T ≈ 50 + (N − 40)/4 °F. Dakikada 120 ötüş, 70 °F yani yaklaşık 21 °C demek. (Margarette W. Brooks benzer bir kuralı 1881'de bir dergiye mektupla bildirmişti.) Vücut sıcaklığı ortama uyan bir hayvanın kaslarını ve sinirlerini süren kimyasal tepkimeler sıcaklıkla hızlandığı için ötüş temposu da hızlanır; yaz gecesi pencereden gelen ses aslında bir kinetik ölçümüdür.",
    },
  ],
  worked: {
    title: "Sayfanın gizli aktivasyon enerjisini bul",
    prompt:
      "Sayfada Duraklat hilesiyle ([A]₀ = 1.0 mol/L) 25 °C'de Hız = 1.74e-1, 35 °C'de 3.34e-1 okunuyor. Bu iki sayıdan aktivasyon enerjisini hesapla; sonra 25 °C'deki yarı ömrü ve 0 °C'deki k'yı tahmin edip sayfayla karşılaştır.",
    steps: [
      "[A] = 1.0 mol/L iken hız = k·[A] sayıca k'ya eşittir: k₁ = 0.174 s⁻¹ (T₁ = 298.15 K), k₂ = 0.334 s⁻¹ (T₂ = 308.15 K).",
      "Arrhenius'u iki sıcaklık için yazıp oranlarsan A sadeleşir: ln(k₂/k₁) = (Eₐ/R)·(1/T₁ − 1/T₂). Sol taraf: ln(0.334/0.174) = ln 1.920 ≈ 0.652.",
      "Sağdaki parantez: 1/298.15 − 1/308.15 = 10/(298.15 × 308.15) ≈ 1.088 × 10⁻⁴ K⁻¹. Buradan Eₐ = 8.314 J/(mol·K) × 0.652 / 1.088 × 10⁻⁴ K⁻¹ ≈ 4.98 × 10⁴ J/mol ≈ 50 kJ/mol. Kodda yazan değer tam 50 kJ/mol; fark yalnızca okunan sayıların yuvarlanmasından.",
      "Yarı ömür: t½ = ln 2 / k₁ = 0.693 / 0.174 s⁻¹ ≈ 3.98 s. Sayfada A (%) kutusu 50'yi Zaman ≈ 3.9 s'de göstermeye başlar; kutu yüzdeyi yuvarladığı için (%50.4 de '50' görünür) gerçek yarılanmadan biraz önce.",
      "0 °C (273.15 K) için: k = 0.174 × e<sup>−(50000/8.314)(1/273.15 − 1/298.15)</sup> = 0.174 × e<sup>−6014 × 3.07 × 10⁻⁴</sup> = 0.174 × e<sup>−1.846</sup> ≈ 0.174 × 0.158 ≈ 0.0275 s⁻¹. Sayfa 2.74e-2 gösterir; buna göre t½ ≈ 0.693 / 0.0274 ≈ 25 s.",
    ],
    result:
      "Eₐ ≈ 50 kJ/mol. 25 °C'de yarı ömür yaklaşık 4 s, 0 °C'de yaklaşık 25 s: 25 derecelik soğuma tepkimeyi altı kattan fazla yavaşlatır. Gerçek laboratuvarlarda da Eₐ tam böyle, birkaç sıcaklıkta k ölçülerek bulunur.",
  },
  misconceptions: [
    {
      myth: "Katalizör dengeyi ürünler yönüne kaydırır, daha çok ürün verir.",
      truth:
        "Katalizör ileri ve geri tepkimeyi aynı oranda hızlandırır; aynı sıcaklıkta denge sabiti ve denge bileşimi değişmez. Kazandırdığı şey zamandır. Sayfada Yok, Enzim ve Metal konumlarının hepsinde C (%) sonunda 100'e ulaşır; yalnızca oraya varış süresi kısalır.",
    },
    {
      myth: "Sıcaklık 10 °C artınca tepkime hızı her zaman iki katına çıkar.",
      truth:
        "Bu, oda sıcaklığı civarında ve Eₐ'sı 50 kJ/mol dolayında olan tepkimeler için kaba bir kuraldır. Oran aktivasyon enerjisine ve sıcaklığa bağlıdır: sayfada 0→10 °C ×2.18, 25→35 °C ×1.92, 90→100 °C yalnızca ×1.56 verir. Eₐ'sı büyük tepkimelerde artış çok daha fazla, küçük olanlarda daha azdır.",
    },
    {
      myth: "Sıcak ortamda moleküller daha sık çarpıştığı için tepkime hızlanır.",
      truth:
        "Çarpışma sıklığı moleküllerin ortalama hızıyla, yani kabaca √T ile artar: 25'ten 35 °C'ye yalnızca yaklaşık %1.7. Oysa sayfada hız neredeyse iki katına çıkıyor. Asıl etki, Eₐ'yı aşacak enerjiye sahip çarpışmaların payının (e<sup>−Eₐ/RT</sup>) büyümesidir. Arrhenius'u 1889'da 'etkin moleküller' fikrine götüren de tam bu uyumsuzluktu.",
    },
    {
      myth: "Bol enerji açığa çıkaran (kendiliğinden) bir tepkime hızlı da olur.",
      truth:
        "Kendiliğindenlik nereye gidileceğini, kinetik ne kadar sürede gidileceğini söyler; ikisi ayrı sorulardır. Şekerin yanması ve elmasın grafite dönüşmesi termodinamik açıdan elverişlidir ama oda sıcaklığında fark edilmeyecek kadar yavaştır. Tepkimeyi bekleten şey aktivasyon enerjisi tepesidir.",
    },
  ],
  glossary: [
    { term: "Tepkime hızı", definition: "Bir maddenin derişiminin birim zamandaki değişimi, katsayısına bölünmüş hâli; birimi mol/(L·s)." },
    { term: "Hız sabiti (k)", definition: "Hız yasasındaki orantı katsayısı; derişime bağlı değildir ama sıcaklık ve katalizörle değişir." },
    { term: "Tepkime derecesi", definition: "Hız yasasında bir maddenin derişimine ait üs; denklemden değil deneyden belirlenir." },
    { term: "Yarı ömür (t½)", definition: "Bir maddenin derişiminin yarıya inmesi için geçen süre; birinci derecede ln 2 / k'dır ve başlangıç derişiminden bağımsızdır." },
    { term: "Aktivasyon enerjisi (Eₐ)", definition: "Tepkimeye girenlerin ürüne dönüşmek için aşması gereken enerji engeli; birimi kJ/mol." },
    { term: "Frekans faktörü (A)", definition: "Arrhenius denklemindeki ön çarpan; uygun yönelimli çarpışmaların ne sıklıkla olduğunu yansıtır, birinci derecede birimi s⁻¹." },
    { term: "Katalizör", definition: "Tepkimeye daha düşük aktivasyon enerjili bir yol açan ve sonunda net olarak tükenmeyen madde." },
    { term: "Etkin çarpışma", definition: "Yeterli enerji ve uygun yönelimle gerçekleşip ürün oluşturan çarpışma." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede hız yasası bir formüldür; üniversitede bir <strong>diferansiyel denklemdir</strong>: d[A]/dt = −k[A]. Birden çok basamağı olan mekanizmalarda bu denklemler birbirine bağlanır; kimyacılar ara ürünler için <em>kararlı durum yaklaşımı</em> kullanır, en yavaş basamağı <em>hız belirleyen basamak</em> olarak ayırır ve deneyle ölçülen hız yasasından görünmeyen mekanizmayı geriye doğru çıkarır. Bilgisayar bu denklemleri sayfanın yaptığı gibi küçük zaman adımlarıyla çözer: kod her karede [A]'yı k·[A]·0.016 kadar azaltıyor, bu Euler yöntemidir. Yöntemin bedelini sayfada görebilirsin: Metal konumunda 58 °C'den, Enzim konumunda 90 °C'den itibaren k·0.016 en az 1 olur ve kod A'nın tamamını tek karede bitirir, oysa gerçek eğri yine yumuşakça sönerdi. Enzimler için aynı mantık Michaelis–Menten modeline, ilaçlar için farmakokinetiğe, kimya mühendisliğinde reaktör tasarımına dönüşür.",
      "Arrhenius denklemi bugün çoğunlukla deneysel bir bağıntı olarak görülür; 'A neden bu değerde, tepenin zirvesinde ne var?' sorusunu ise 1935'te Henry Eyring ve başkalarının geliştirdiği <strong>geçiş hâli kuramı</strong> yanıtlar. Orada tepenin zirvesindeki kararsız yapı, istatistiksel fizik ve Maxwell–Boltzmann enerji dağılımı devreye girer. Atmosfer kimyası, yanma, yarı iletken üretimi ve yaşlanan pillerin ömür tahmini, hep aynı sorunun farklı yüzleridir: bu dönüşüm ne kadar sürer ve onu nasıl hızlandırır ya da yavaşlatırız?",
    ],
    topics: ["Diferansiyel hız yasaları", "Tepkime mekanizmaları", "Kararlı durum yaklaşımı", "Geçiş hâli kuramı", "Maxwell–Boltzmann dağılımı", "Enzim kinetiği", "Reaktör tasarımı"],
  },
  quiz: [
    {
      question: "Sayfada 25 °C'de [A]₀'ı 1.0'dan 2.0 mol/L'ye çıkarıyorsun. Başlangıç hızı ve yarı ömür nasıl değişir?",
      options: ["İkisi de iki katına çıkar", "Hız iki katına çıkar, yarı ömür aynı kalır", "Hız aynı kalır, yarı ömür yarıya iner", "Hız dört katına çıkar, yarı ömür yarıya iner"],
      answer: 1,
      explanation: "Birinci derecede hız = k[A]: derişim iki kat, hız iki kat (1.74e-1'den 3.47e-1'e). Yarı ömür ln 2 / k'dır, derişim içermez; iki durumda da A (%) yaklaşık 3.9 s'de 50'ye iner.",
    },
    {
      question: "Sayfada katalizörsüz, 25 °C'den 35 °C'ye çıkınca Hız 1.74e-1'den 3.34e-1'e, neredeyse iki katına çıkıyor. Asıl neden nedir?",
      options: ["Moleküller yaklaşık iki kat daha sık çarpışır", "Aktivasyon enerjisi Eₐ yarıya iner", "Eₐ'yı aşacak enerjiyle yapılan çarpışmaların payı yaklaşık iki katına çıkar", "A'nın derişimi iki katına çıkar"],
      answer: 2,
      explanation: "Çarpışma sıklığı kabaca √T ile artar: 298 K'den 308 K'ye yalnızca %1.7. Eₐ sabittir (kodda 50 kJ/mol), [A] de sıcaklıkla değişmez. Büyüyen şey tepeyi aşabilen çarpışmaların payıdır: e<sup>−Eₐ/RT</sup> bu 10 derecede 1.92 katına çıkar, k ve hız da onunla birlikte.",
    },
    {
      question: "Birinci dereceden bir tepkimede yarı ömür yaklaşık 4 s. 12 s sonra başlangıçtaki A'nın yaklaşık yüzde kaçı kalır?",
      options: ["%33", "%25", "%12.5", "%0"],
      answer: 2,
      explanation: "12 s, üç yarı ömürdür: ½ × ½ × ½ = ⅛ ≈ %12.5. Sayfada 25 °C'de Zaman 12.0 s iken A (%) kutusu 12 gösterir. %25 iki yarı ömrün (8 s) sonucudur. %0 ise azalmayı doğrusal sanmaktan gelir ('4 s'de yarısı gittiyse 8 s'de hepsi gider'); oysa her yarı ömür yalnızca kalanın yarısını götürür ve madde hiçbir zaman tam sıfıra inmez.",
    },
  ],
  next: [
    { href: "kimyasal-denge-ve-gibbs-enerjisi.html", title: "Kimyasal Denge ve Gibbs Enerjisi", why: "Kinetik 'ne kadar hızlı' diye sorar; buradaki Q–K yön bulucu 'hangi yöne ve nereye kadar' sorusunu ΔG ile yanıtlar." },
    { href: "enzim-kinetigi.html", title: "Enzim Kinetiği", why: "Sayfadaki 'Enzim' konumunun gerçek hâli: Vmax ve Km kaydırıcıları ve inhibitör seçimiyle doymaya giden Michaelis–Menten eğrisi." },
    { href: "radyoaktif-bozunma.html", title: "Radyoaktif Bozunma", why: "Aynı birinci derece matematiği çekirdeklerde: rastgele bozunan çekirdeklerden üstel yasanın doğuşunu izle, yarı ömrü ln N doğrusunun eğiminden ölç." },
    { href: "diferansiyel-denklemler.html", title: "Diferansiyel Denklemler", why: "d[A]/dt = −k[A] tipi denklemleri ve bu sayfanın kodunun kullandığı Euler adımının hatasını genel çerçevede gör." },
  ],
  sources: [
    { title: "OpenStax · Chemistry 2e, 12.4 Integrated Rate Laws", url: "https://openstax.org/books/chemistry-2e/pages/12-4-integrated-rate-laws", note: "Birinci ve ikinci derece için derişim–zaman bağıntıları ve yarı ömür, çözümlü örneklerle (İngilizce, açık ders kitabı)." },
    { title: "OpenStax · Chemistry 2e, 12.5 Collision Theory", url: "https://openstax.org/books/chemistry-2e/pages/12-5-collision-theory", note: "Çarpışma kuramı, aktivasyon enerjisi, Arrhenius denklemi ve ln k – 1/T grafiğinden Eₐ bulma." },
    { title: "PhET · Reaksiyonlar ve Oranlar", url: "https://phet.colorado.edu/tr/simulations/reactions-and-rates", note: "Molekülleri tek tek çarpıştırabildiğin, enerji tepesini görebildiğin bir simülasyon; bu sayfadaki eksik çarpışma resmini tamamlar." },
    { title: "Vikipedi · Arrhenius eşitliği", url: "https://tr.wikipedia.org/wiki/Arrhenius_e%C5%9Fitli%C4%9Fi", note: "Denklemin iki biçimine (R ve Boltzmann sabitiyle) ve kökenine Türkçe kısa giriş." },
  ],
  revision: "Kasım 2026",
};
