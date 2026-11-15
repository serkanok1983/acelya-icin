window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["yari-iletkenler-ve-bant-yapisi"] = {
  slug: "yari-iletkenler-ve-bant-yapisi",
  title: "Yarı İletkenler: Bantlar, Katkı ve p–n Eklemi",
  field: "Fizik",
  level: "Lisans",
  minutes: 40,
  tagline:
    "Silisyumu metalden de camdan da ayıran tek bir sayı var: bant aralığı. Bantların nasıl açıldığını, bir milyonda bir katkının neden her şeyi değiştirdiğini ve diyotun neden 0,6 V civarında açıldığını ölç.",
  hook:
    "Bir metali ısıtınca daha kötü iletir; 1833'te Faraday, gümüş sülfürün tam tersini yaptığını gördü ve buna \"olağanüstü bir durum\" dedi. Yüz yıl sonra cevap kuantum mekaniğinden geldi: kristaldeki elektronun izinli enerjileri bantlara ayrılır ve aradaki boşluk, ısının kaç elektronu karşıya atabileceğine karar verir. Bugün cebindeki telefonun her transistörü bu boşluğun üstünde çalışıyor.",
  bigIdea:
    "Periyodik bir örgüde elektron dalgaları k = π/a'da Bragg yansımasına uğrar ve enerji ekseninde <strong>yasak bir aralık</strong> açılır; yarı iletkenin bütün davranışı (sıcaklıkla çoğalan taşıyıcılar, katkının gücü, diyotun üstel akımı) bu aralığın birkaç kT değil, kırk kT kadar geniş olmasından gelir.",
  story: [
    "Hikâye, adı henüz konmamış bir tuhaflıkla başlar. 1833'te Michael Faraday, gümüş sülfürün ısındıkça elektriği daha iyi ilettiğini kaydetti; bu, bakır gibi metallerin ısınınca daha kötü iletmesinin tam tersiydi. Bugün bu gözlem, sonradan yarı iletken denecek bir maddenin bilinen ilk kaydı sayılıyor. 1874'te Ferdinand Braun metal sülfür kristallerini, örneğin bir galen (kurşun sülfür) kristalini, ince bir metal uçla yokladı ve akımın yalnız bir yönde rahatça geçtiğini gördü: ilk yarı iletken doğrultucu. Bu buluş, yirminci yüzyılın başında radyo gelene kadar işe yaramadı; sonra \"kedi bıyığı\" denen tel uçlu kristal dedektörler olarak kristal radyoların kalbine yerleşti.",
    "Neden böyle olduğunu kimse bilmiyordu, çünkü klasik fizik bir elektronun kristalde nasıl ilerlediğini açıklayamıyordu. 1928'de Felix Bloch, Leipzig'de Heisenberg'in yanında yazdığı doktora tezinde elektronların atom örgüsü içindeki hareketinin kuramını kurdu (makale 1929'da <em>Zeitschrift für Physik</em>'te çıktı): periyodik bir potansiyelde dalga fonksiyonu, örgünün periyoduyla tekrarlanan bir fonksiyonla biçimlenmiş düzlem bir dalgadır. 1931'de Ralph Kronig ile William Penney, sayfanın birinci sekmesindeki tek boyutlu modeli <em>Proceedings of the Royal Society A</em>'da yayımladı; aynı yıl Alan Herries Wilson, yarı iletkenlerin iletkenliğini ilk kez bantlar ve aralarındaki boşlukla açıklayan kuramı yayımladı. Artık metal, yalıtkan ve yarı iletken arasındaki fark tek bir resimle anlatılabiliyordu: bantlar ve aralarındaki boşluk.",
    "Asıl dönüm noktası Bell Laboratuvarları'nda geldi. 23 Şubat 1940'ta New Jersey'deki Holmdel'de Russell Ohl, sınadığı bir silisyum parçasından geçen akımın parlak ışık altında belirgin biçimde sıçradığını gördü. Parça, içindeki safsızlıklar yüzünden iki bölgeye ayrılmıştı; Ohl ve Jack Scaff bu bölgelere, fosforun getirdiği fazla elektronlara ve borun yarattığı eksikliğe göre n ve p adını verdiler. İlk p–n eklemi bulunmuştu ve Ohl'un bu çalışması ilk silisyum güneş hücrelerine yol açtı.",
    "16 Aralık 1947'de John Bardeen ve Walter Brattain, yüksek saflıkta küçük bir germanyum dilimi üzerinde kurdukları nokta temaslı düzenekle işareti ilk kez yükseltti; 23 Aralık'ta laboratuvar yöneticilerine gösterdiler, kazanç 100 kata kadar çıkıyordu. William Shockley 23 Ocak 1948'de eklem transistörünü tasarladı ve kuramını Temmuz 1949'da <em>Bell System Technical Journal</em>'da yayımladı; dördüncü sekmedeki diyot denklemi o makalenin çocuğudur. Üçü 1956 Nobel Fizik Ödülü'nü paylaştı. 12 Eylül 1958'de Texas Instruments'ta Jack Kilby, transistörü, kondansatörü ve direnci tek bir germanyum parçasında birleştiren bir osilatör kurdu; Temmuz 1959'da Robert Noyce, oksidin üstüne serilen alüminyum yollarla bağlanan silisyum tümleşik devrenin patentini başvurdu.",
  ],
  core: [
    {
      heading: "Düzeyler banda, boşluklar aralığa dönüşür",
      body:
        "Tek bir atomda elektronun enerjisi kesikli düzeylerdir. İki atom yaklaşınca her düzey ikiye yarılır; N atom yan yana gelince N düzeye. Komşular arası atlama enerjisi t ise, açık uçlu bir zincirde bandın genişliği 4t·cos(π/(N + 1)) olur ve N büyüdükçe 4t'ye yaklaşır. Sayfadaki zincirde iki atomik düzey ΔE kadar ayrıktır; aralarındaki boşluk ΔE − 4t'ye iner. Bu sayı artıysa bir yalıtkan ya da yarı iletken, eksiyse bantlar örtüşür ve madde metal gibi iletir. Aynı sonuca serbest elektron tarafından da varılır: k = π/a'da elektron dalgasının boyu 2a'dır, her örgü noktasından geri saçılan dalgacıklar aynı evrede toplanır (tek boyutta Bragg koşulu) ve iki duran dalga oluşur. Biri olasılığını engellerin üstünde, öteki aralarında toplar; enerjileri arasındaki fark yasak aralıktır.",
      formula: "E<sub>g</sub> ≈ 2|V<sub>G</sub>| (zayıf potansiyel) · E<sub>g</sub> → ΔE − 4t (sıkı bağ, N → ∞)",
      formulaNote: "V_G potansiyelin G = 2π/a Fourier bileşenidir. İki resim iki uçtur; Kronig–Penney modeli aralarında sürekli geçiş yapar.",
    },
    {
      heading: "Etkin kütle: bandın eğriliği",
      body:
        "Bant kenarının yakınında E(k) bir parabole benzer ve elektron, dış bir kuvvete sanki m* kütleli serbest bir parçacıkmış gibi tepki verir. m* bir kütle ölçümü değil, eğriliğin tersidir: dik kıvrılan bantta küçük, düz bantta büyüktür. Bir bandın tepesinde eğrilik aşağı döner ve m* eksi çıkar; eksi yüklü, eksi kütleli bir elektronun yokluğunu artı yüklü, artı kütleli bir <strong>boşluk</strong> olarak düşünmek aynı hareket denklemini verir. Kronig–Penney modelinde birinci bandın tepesinde kapalı sonuç m*/m = −P/π²'dir; sayfa bunu E(k)'nin sonlu fark eğriliğiyle ölçüp karşılaştırır. Gerçek kristallerde de aynı fikir çalışır: GaAs'ın iletim elektronu 0,063m₀ kadar hafiftir.",
      formula: "1/m* = (1/ħ²)·d²E/dk²",
      formulaNote: "Bant kenarında E ≈ E₀ + ħ²(k − k₀)²/(2m*). Eğrilik eksiyse m* eksidir: orada taşıyıcıyı boşluk olarak say.",
    },
    {
      heading: "Saf kristalde taşıyıcılar: aralığın yarısı belirler",
      body:
        "Isıl dengede bir durumun dolu olma olasılığı Fermi–Dirac dağılımıdır. E_F bant kenarından birkaç kT uzaktaysa dağılımın kuyruğu e^(−(E − E_F)/kT) üstel kuyruğuna iner ve iletim bandındaki elektron sayısı n = N_c·e^(−(E_c − E_F)/kT) olur (Boltzmann yaklaşımı); boşluklar için de aynısı geçerlidir. Saf kristalde n = p olduğundan çarpım E_F'den bağımsızdır ve n_i ortaya çıkar. Üstelde E_g/2 durur, çünkü n_i, np = N_cN_v·e^(−E_g/kT) çarpımının kareköküdür; saf kristalde E_F de aralığın ortasına çok yakındır. Silisyumda 300 K'de E_g/kT ≈ 43: üstel, 10⁻¹⁰ düzeyinde bir çarpan getirir. Aralığı 1 eV'tan 5 eV'a çıkar, bir yalıtkan elde edersin; 0 eV'a indir, bir metal. Varshni bağıntısı E_g(T) = E_g(0) − αT²/(T + β) aralığın ısındıkça daraldığını söyler.",
      formula: "n<sub>i</sub> = √(N<sub>c</sub>N<sub>v</sub>)·e<sup>−E<sub>g</sub>/2kT</sup>,  N<sub>c</sub>, N<sub>v</sub> ∝ T<sup>3/2</sup>",
      formulaNote: "Sayfanın Si katsayılarıyla (NSM Ioffe arşivi) 300 K'de n_i = 8,68 × 10⁹ cm⁻³, tablodaki 1 × 10¹⁰'dan %13 az. Farkın çoğu üsteldedir: Varshni bağıntısı 300 K'de 1,12 değil 1,1245 eV verir ve e^(−0,0045 eV/2kT) n_i'yi %8 küçültür; tablonun kendi N_c, N_v ve 1,12 eV değerleri de 9,4 × 10⁹ verir, yani 1 × 10¹⁰ yuvarlanmış bir değerdir.",
    },
    {
      heading: "Arrhenius eğimi neden 1,20 eV verir?",
      body:
        "Deneyde n_i(T) ölçülür ve ln(n_i/T^(3/2)) ile 1/T çizilir. E_g sabit olsaydı eğim −E_g/(2k) olurdu. Ama E_g(T) sıcaklıkla değişir. Türev al: d[E_g(T)/T]/d(1/T) = E_g − T·dE_g/dT. Yani doğrunun eğimi, aralığın o sıcaklıktaki değerini değil, E_g(T) eğrisine çizilen teğetin T = 0'daki kesişimini verir. Silisyumda 300 K'de dE_g/dT ≈ −0,25 meV/K olduğundan bu bileşim yaklaşık 1,20 eV'tur; optik soğurma ise 1,12 eV ölçer. İkisi de doğrudur, farklı soruları cevaplarlar. Sayfanın ikinci sekmesi bu doğruyu 21 noktaya uydurup eğimden 1,2000 eV çıkarır.",
      formula: "−2k · d ln(n<sub>i</sub>T<sup>−3/2</sup>)/d(1/T) = E<sub>g</sub> − T·dE<sub>g</sub>/dT",
      formulaNote: "Sağ taraf, E_g(T) eğrisine T noktasında çizilen teğetin 0 K'e uzatılmış değeridir.",
    },
    {
      heading: "Katkı, eklem ve diyotun üsteli",
      body:
        "Silisyuma her milyon atomda bir fosfor koymak (≈ 5 × 10¹⁶ cm⁻³) elektron sayısını milyonlarca kat artırır. Isıl dengede np = n_i² kaldığı için boşluklar aynı oranda azalır. Çok soğukta donörler elektronlarını bırakmaz (donma), orta sıcaklıkta n ≈ N_D'de durur (katkılı bölge), çok sıcakta n_i katkıyı geçer (içkin bölge). p ve n bölgeleri birleşince taşıyıcılar karşıya yayılır, geride iyon yüklerinden bir deplesyon katmanı ve V_bi kadar bir potansiyel basamağı kalır. İleri gerilim V bu basamağı alçaltır ve basamağı aşabilen azınlık taşıyıcılarının sayısı e^(qV/kT) ile büyür: Shockley denklemi. Akımı on katına çıkarmak için gereken gerilim (kT/q)·ln 10 ≈ 59,5 mV'tur (300 K); ısınınca n_i² hızla arttığından aynı akım için gereken gerilim yaklaşık 2 mV/K düşer.",
      formula: "V<sub>bi</sub> = (kT/q)·ln(N<sub>A</sub>N<sub>D</sub>/n<sub>i</sub><sup>2</sup>),  I = I<sub>s</sub>(e<sup>qV/nkT</sup> − 1)",
      formulaNote: "I_s ∝ n_i²; n idealite çarpanıdır (ideal diyotta 1). Deplesyon yaklaşımı W = √(2ε(V_bi − V)/q·(1/N_A + 1/N_D)) verir.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar dört sekmeden oluşur ve her kartta sayısal çözümle bulunan değer, kapalı formülün yanında farkıyla durur. <strong>01 · Bantlar nereden gelir?</strong> Kronig–Penney tarağını (Potansiyel gücü P, Örgü sabiti a) ve N atomlu zinciri (Atom sayısı N, Komşular arası atlama t, ΔE) çözer. <strong>02 · Taşıyıcılar ve Fermi düzeyi</strong> Si, Ge ve GaAs için Fermi–Dirac integrallerini ve Arrhenius doğrusunu hesaplar. <strong>03 · Katkılama</strong> yük nötrlüğünü N_D, N_A ve T için çözer; <strong>04 · p–n eklemi</strong> Poisson denklemini ve Shockley diyot eğrisini. Hazır düğmeler yalnız adlarındaki değerleri değiştirir; her sekmenin \"Sekmeyi sıfırla\" düğmesi ve R tuşu varsayılana döndürür.",
    experiments: [
      {
        title: "Aralık nereden açılır, bant nasıl daralır?",
        predict: "Potansiyel gücü P'yi 0,5'ten 12'ye çıkarınca sayısal aralık zayıf potansiyel kuramının 2|V_G| değerini izler mi? Birinci bant genişler mi, daralır mı?",
        do: "Birinci sekmede sırayla \"Serbest elektron (P = 0)\", \"Zayıf örgü (P = 0,5)\", varsayılan (Sekmeyi sıfırla) ve \"Sıkı bağ (P = 12)\" düğmelerine bas. Sonra \"Etkin kütleyi ölç\" menüsünde \"1. bandın tepesinde\"yi seç. Ardından \"İki atom\", \"Kristal (N = 60)\" ve \"Bantlar örtüşür\" düğmeleriyle zincir kartlarını izle.",
        observe: "Aralık 0,000 → 0,290 → 1,379 → 2,994 eV; kuramın farkı −4,9 %, −24,6 %, −59,1 %. P = 12'de birinci bant E₁'in 26,2 %'ine daralır ve tepedeki etkin kütle −1,2159 (kapalı −P/π² ile aynı). Zincirde aralık 3,000 eV (N = 2), 2,003 eV (N = 60, sınır 2,000); t = 1,2 eV'ta −0,794 eV: bantlar örtüşür.",
        explain: "2|V_G| bir pertürbasyon sonucudur ve yalnız zayıf potansiyelde geçerlidir; güçlü potansiyelde elektron engellerin arasına hapsolur, bantlar atomik düzeylere benzeyen dar şeritlere döner (sıkı bağ resmi). Bant düzleştikçe kenardaki eğrilik küçülür ve |m*| büyür: P = 0,5'te tepede m*/m ≈ −0,05, P = 12'de −1,22.",
      },
      {
        title: "Eğim neden 1,12 değil 1,20 eV?",
        predict: "Saf silisyumun Arrhenius doğrusunun eğiminden bulunan enerji, Varshni'nin verdiği 300 K bant aralığına eşit mi olacak?",
        do: "İkinci sekmede \"Oda sıcaklığında Si\" ile başla; Bant aralığı ve Arrhenius kartlarını oku. Sonra \"Ge, 500 K\" düğmesine bas. En sonda \"E_F iletim bandına yakın\" düğmesiyle Fermi düzeyini elle kaydır ve n kartındaki Boltzmann farkını izle.",
        observe: "Si 300 K: E_g = 1,1245 eV, Arrhenius 1,2000 eV, kuram E_g − T·dE_g/dT = 1,1997 eV (+0,02 %). Ge 500 K: n_i = 1,87 × 10¹⁶ cm⁻³, eğim 0,7939 eV, E_g ise 0,5787 eV. Ge'de E_F kenarlardan yalnız 6,4 kT uzakta olduğu için np/n_i² bile 0,99909'dur. E_F kenara 2,69 kT yaklaşınca Boltzmann n'yi +2,360 % fazla verir ve np/n_i² = 0,97694'e düşer.",
        explain: "Eğim E_g(T)'nin teğetinin 0 K kesişimini ölçer; aralık ısındıkça daraldığı için bu değer E_g'den büyüktür. Boltzmann formülü Pauli ilkesini unutur: E_F kenara yaklaşınca durumlar dolar, gerçek n üstelden geri kalır ve kütle etkisi yasası bozulur.",
      },
      {
        title: "Donma, katkılı ve içkin: üç bölge",
        predict: "N_D = 10¹⁶ cm⁻³ fosforlu silisyumda 40 K, 300 K ve 700 K'de elektron yoğunluğu N_D'ye ne kadar yakın olur?",
        do: "Üçüncü sekmede \"n tipi Si, 10¹⁶\" ile başla, sonra \"Donma: 40 K\" ve \"Isınma: 700 K\" düğmelerine bas. Her seferinde Çoğunluk taşıyıcı, Basit yaklaşım ve İyonlaşmış katkı oranı kartlarını oku. Sonra Malzeme menüsünden Germanyum'u seç ve İçkin bölgenin başladığı sıcaklık kartına bak.",
        observe: "40 K: iyonlaşma 1,29 %, n = 1,29 × 10¹⁴ cm⁻³, basit yaklaşım −98,71 % hatalı. 300 K: 99,65 %, n = 9,96 × 10¹⁵, p = 7555 cm⁻³. 700 K: n = 2,79 × 10¹⁶, p = 1,79 × 10¹⁶; basit yaklaşım +178,58 % saparken ikinci dereceden çözüm −0,030 %. İçkin başlangıç Si'de 655 K, Ge'de 472 K.",
        explain: "Donmada kT (3,45 meV) iyonlaşma enerjisinin (45 meV) yanında küçüktür. Isınınca n_i üstel büyür ve katkıyı geçer. Germanyumun aralığı daha dar olduğundan içkin bölgeye çok daha erken girer; ilk transistörlerin sıcakta kararsızlığının bir nedeni.",
      },
      {
        title: "Diyotun \"eşiği\" bir eşik mi?",
        predict: "Silisyum diyotun 1 mA'deki gerilimi sıcaklık 50 K artınca ve idealite 2'ye çıkınca nasıl değişir? On katlık akım başına kaç mV beklersin?",
        do: "Dördüncü sekmede varsayılanla başla ve 1 mA'deki ileri gerilim, On katlık akım başına gerilim ve Sıcaklık katsayısı kartlarını oku. Sıcaklığı 350 K yap, sonra sıfırlayıp İdealite çarpanı n'yi 2 yap. En sonda \"Ge diyot\" düğmesine bas.",
        observe: "300 K: V_F = 0,6140 V, 59,53 mV/on kat, dV_F/dT = −2,258 mV/K. 350 K: V_F = 0,4994 V, 69,45 mV. n = 2: 1,2280 V ve 119,05 mV. Ge diyot: V_bi = 0,3809 V, I_s = 513 nA, V_F = 0,1958 V.",
        explain: "Akım gerilimle üstel büyür; 0,6 V, 1 mA gibi gündelik bir akımın denk geldiği yerdir, bir kapı değildir. Eğim kT/q ile orantılı olduğundan sıcakla artar; I_s ∝ n_i² ise sıcakla öyle hızlı büyür ki V_F düşer. Ge'nin dar aralığı I_s'yi milyonlarca kat büyütür.",
      },
    ],
  },
  wow: [
    {
      title: "Bir milyonda bir, milyon kat",
      body:
        "Silisyumda her santimetreküpte yaklaşık 5 × 10²² atom var. 10¹⁶ cm⁻³ fosfor, yani her beş milyon atomda bir yabancı, sayfanın üçüncü sekmesinde iletkenliği katkısız kristalin 8,7 × 10⁵ katına çıkarır: özdirenç 3,89 × 10⁵ Ω·cm'den 0,447 Ω·cm'ye iner. Tersinden okursan: istenmeyen safsızlıklar da aynı güçle davranır, bu yüzden aygıt silisyumu bu düzeyin çok altında saflıkta olmalıdır.",
    },
    {
      title: "Ohl'un silisyumu ışığa tepki verdi",
      body:
        "23 Şubat 1940'ta Russell Ohl'un sınadığı silisyum parçasından geçen akım, parlak bir ışık altında belirgin biçimde sıçradı. Sebebi, parçanın içinde kendiliğinden oluşmuş bir p–n eklemiydi: ışığın ürettiği elektron–boşluk çiftlerini eklemin alanı ayırıyordu. Aynı keşif hem p–n eklemli diyotun hem de güneş hücresinin başlangıcıdır; bugünkü güneş panellerini çalıştıran fotovoltaik etki budur.",
    },
    {
      title: "Aynı kristal, iki bant aralığı",
      body:
        "Silisyumun bant aralığı 300 K'de 1,12 eV'tur, ama iletkenliğin sıcaklıkla değişiminden \"1,2 eV\" okunur. Hata yok: Arrhenius eğimi E_g − T·dE_g/dT bileşimini ölçer. Sayfa iki sayıyı yan yana koyar: Varshni bağıntısıyla 1,1245 eV, 250–350 K penceresindeki doğrunun eğiminden 1,2000 eV.",
    },
  ],
  worked: {
    title: "Silisyum diyot: basamak, genişlik ve 1 mA gerilimi",
    prompt:
      "300 K'de keskin bir silisyum p–n ekleminde N_A = 10¹⁷ cm⁻³, N_D = 10¹⁶ cm⁻³, n_i = 8,68 × 10⁹ cm⁻³, ε = 11,7ε₀. Yerleşik gerilimi, sıfır gerilimde deplesyon genişliğini ve I_s = 48,4 fA iken 1 mA akım için gereken ileri gerilimi bul. Sonuçları dördüncü sekmenin varsayılan durumuyla karşılaştır.",
    steps: [
      "Isıl gerilim: kT/q = (8,617 × 10⁻⁵ eV/K)(300 K) = 0,02585 V. Oran: N_AN_D/n_i² = 10³³ / (7,53 × 10¹⁹) = 1,33 × 10¹³; ln'i 30,22.",
      "V_bi = 0,02585 V × 30,22 = 0,7812 V. Sayfanın Poisson çözümü −∫E dx = 0,7812 V bulur: denge koşulu tam sağlanır.",
      "Deplesyon yaklaşımı: 2εV_bi/q = 2(1,036 × 10⁻¹² F/cm)(0,7812 V)/(1,602 × 10⁻¹⁹ C) = 1,010 × 10⁷ cm⁻¹; (1/N_A + 1/N_D) = 1,1 × 10⁻¹⁶ cm³ ile çarp: 1,111 × 10⁻⁹ cm², karekökü W = 3,333 × 10⁻⁵ cm = 333,3 nm. Bölgenin yaklaşık 10/11'i hafif katkılı n tarafındadır.",
      "Sayısal çözüm 322,3 nm verir (−3,3 %). Fark, kenarlardaki taşıyıcı kuyruklarındadır: V_bi yerine V_bi − 2kT/q = 0,7295 V konunca W = 333,3 nm × √(0,7295/0,7812) = 322,1 nm, sayısalla 0,04 % içinde.",
      "Diyot: V = (kT/q)·ln(1 + I/I_s) = 0,02585 V × ln(10⁻³ A / 4,84 × 10⁻¹⁴ A) = 0,02585 V × 23,75 = 0,6140 V. On kat akım için ΔV = 0,02585 V × ln 10 = 59,53 mV.",
    ],
    result:
      "V_bi = 0,7812 V, W ≈ 333 nm (yaklaşım) ve 322 nm (Poisson), V_F(1 mA) = 0,6140 V, 59,53 mV/on kat: sayfanın varsayılan kartlarıyla aynı. Basamak 0,78 V olsa da diyot 0,61 V'ta 1 mA geçirir; çünkü akım basamağın tamamen kalkmasını değil, üstel kuyruğun yeterince büyümesini bekler.",
  },
  misconceptions: [
    {
      myth: "Silisyum diyotun 0,7 V'luk bir eşiği vardır; altında akım sıfırdır.",
      truth:
        "Akım her gerilimde e^(qV/nkT) ile büyür; eşik yoktur. Varsayılan diyotta 0,5 V'ta 12,1 µA, 0,6 V'ta 581 µA, 0,614 V'ta 1 mA akar. \"0,6–0,7 V\" yalnız gündelik akımların logaritmik eğride denk geldiği yerdir ve sıcaklıkla yaklaşık 2 mV/K kayar.",
    },
    {
      myth: "Donör eklemek elektron ekler, boşluk sayısı ise aynı kalır.",
      truth:
        "Isıl dengede np = n_i² sabittir: elektronlar milyon kat artınca boşluklar milyon kat azalır, çünkü fazla elektronlar boşluklarla daha sık birleşir. 10¹⁶ cm⁻³ fosforlu silisyumda p yalnız 7555 cm⁻³'tür. Bu kural E_F banda çok yaklaşınca (yozlaşma) bozulur.",
    },
    {
      myth: "Bant aralığı, iletkenliğin Arrhenius grafiğinin eğiminden doğrudan okunur.",
      truth:
        "Aralık sıcaklıkla değiştiği için eğim E_g − T·dE_g/dT verir: silisyumda 1,12 eV yerine yaklaşık 1,20 eV. Ayrıca katkılı bir örnekte eğim, donma bölgesinde katkının iyonlaşma enerjisinin yarısını (sayfada 0,0220 eV, kuram 0,0225 eV) ölçer; hangi bölgede olduğunu bilmeden eğimi yorumlama.",
    },
    {
      myth: "p–n ekleminin uçlarına voltmetre bağlarsan V_bi'yi ölçersin; eklem bir pildir.",
      truth:
        "Dengede Fermi düzeyi her yerde aynıdır ve metal değmelerindeki basamaklar eklemin basamağını tam sıfırlar; denge hâlindeki bir eklemden enerji çekilemez. Eklemin akım vermesi için dışarıdan enerji gerekir: ışık yeni çiftler üretirse alan onları ayırır ve eklem güneş hücresi olur.",
    },
  ],
  glossary: [
    { term: "Bant aralığı (E_g)", definition: "Valans bandının tepesi ile iletim bandının tabanı arasında hiçbir elektron durumunun bulunmadığı enerji aralığı." },
    { term: "Etkin kütle (m*)", definition: "Bant kenarında E(k) eğriliğinin tersi, ħ²/(d²E/dk²); elektronun kristal içinde dış kuvvete tepki verdiği kütle." },
    { term: "Boşluk", definition: "Neredeyse dolu valans bandında eksik bir elektron; artı yüklü ve artı etkin kütleli bir taşıyıcı gibi davranır." },
    { term: "Fermi düzeyi (E_F)", definition: "Fermi–Dirac dağılımında doluluk olasılığının tam 1/2 olduğu enerji; ısıl dengede bütün kristalde aynıdır." },
    { term: "İçkin yoğunluk (n_i)", definition: "Saf kristalde ısıyla oluşan elektron (ve aynı sayıda boşluk) yoğunluğu; katkılı kristalde np = n_i²." },
    { term: "Donör ve akseptör", definition: "Kristale fazla elektron veren (Si'de fosfor) ya da bir elektron eksikliği getiren (Si'de bor) katkı atomları." },
    { term: "Deplesyon bölgesi", definition: "p–n ekleminin iki yanında hareketli taşıyıcıların boşaldığı, yalnız iyonlaşmış katkı yüklerinin kaldığı katman." },
    { term: "İdealite çarpanı (n)", definition: "Diyot denklemindeki e^(qV/nkT) üstelinin düzeltmesi; ideal difüzyon akımında 1, deplesyon bölgesindeki birleşme baskınsa 2'ye yakın." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede yarı iletken \"bazı elektronları serbest olan madde\"dir; üniversitede (önce <strong>Modern Fizik</strong>'te, sonra <strong>Katıhal Fiziği</strong>'nde) bir özdeğer problemidir. Bloch teoremi periyodik potansiyelde dalga fonksiyonunu ψ_k(x) = e^(ikx)u_k(x) biçimine indirger; Kronig–Penney modeli bunun çözülebilen tek boyutlu örneğidir, sıkı bağ ve neredeyse serbest elektron yaklaşımları iki uç sınırdır. Üç boyutta bant yapısı Brillouin bölgesinin yönlerine göre çizilir; silisyumun dolaylı, GaAs'ın doğrudan aralığı (ışık yayıp yayamadıkları) bu çizimden okunur. Taşıyıcı istatistiği ise <strong>İstatistiksel Mekanik</strong>'in Fermi–Dirac dağılımının ilk ciddi uygulamasıdır.",
      "<strong>Yarı İletken Aygıtlar</strong> ya da <strong>Elektronik I</strong> dersinde dördüncü sekmenin denklemleri sürüklenme–difüzyon modeline dönüşür: Poisson denklemi, akım yoğunluğu J = qnμE + qD·dn/dx ve süreklilik denklemleri birlikte çözülür. Shockley diyotu bu sistemin uzun tabanlı, düşük enjeksiyonlu sınırıdır; transistör iki eklemin birbirine çok yakın konmasıdır, MOSFET ise yüzeyde elektrik alanıyla açılıp kapanan bir iletim kanalıdır. LED'ler, lazer diyotlar ve güneş hücreleri aynı eklemin ışıkla konuşan hâlleridir.",
    ],
    topics: ["Bloch teoremi", "Brillouin bölgesi", "Sıkı bağ yaklaşımı", "Fermi–Dirac istatistiği", "Sürüklenme–difüzyon denklemleri", "Bipolar ve MOS transistör", "Doğrudan ve dolaylı bant aralığı"],
  },
  quiz: [
    {
      question: "300 K'de ideal (n = 1) bir silisyum diyot 0,60 V'ta 0,5 mA geçiriyor. Gerilimi 0,72 V'a çıkarırsan akım yaklaşık kaç olur?",
      options: ["Yaklaşık 0,6 mA (doğrusal artış)", "Yaklaşık 5 mA", "Yaklaşık 50 mA", "Yaklaşık 500 mA"],
      answer: 2,
      explanation: "Akım her (kT/q)·ln 10 ≈ 59,5 mV'ta on katına çıkar. 120 mV iki on kattır: 0,5 mA × 100 = 50 mA. Gerçek bir diyotta bu akımlarda seri direnç devreye girer ve artış biraz daha az olur; sayfanın modeli seri direnç içermez.",
    },
    {
      question: "N_D = 10¹⁶ cm⁻³ fosforlu silisyumda oda sıcaklığında p ≈ 7,5 × 10³ cm⁻³'tür. Katkı on katına (10¹⁷ cm⁻³) çıkarılırsa boşluk yoğunluğu ne olur?",
      options: ["On katına çıkar", "Değişmez, çünkü katkı boşluk getirmez", "Yaklaşık on kat azalır", "Yaklaşık yüz kat azalır"],
      answer: 2,
      explanation: "np = n_i² sabit kaldığı ve n ≈ N_D olduğu için p = n_i²/N_D'dir: N_D on kat artınca p on kat azalır (≈ 7,5 × 10² cm⁻³). Bu yüzden ağır katkılı taraf, eklemin azınlık taşıyıcı akımına çok az katkı verir.",
    },
    {
      question: "Saf bir örnekte ln(n_i/T^1,5) ile 1/T arasındaki doğrunun eğimi −2k ile çarpılınca 1,20 eV çıkıyor; optik ölçüm ise 1,12 eV diyor. En iyi açıklama hangisi?",
      options: ["Örnek katkılıdır, eğim katkı enerjisini ölçer", "Bant aralığı sıcaklıkla azaldığı için eğim E_g − T·dE_g/dT verir", "N_c ve N_v'nin T^1,5 bağımlılığı unutulmuştur", "Optik ölçüm her zaman yanlıştır"],
      answer: 1,
      explanation: "T^1,5 çarpanı zaten soldaki ifadeye katılmıştır. E_g(T) azalan bir fonksiyon olduğundan (dE_g/dT < 0) eğim E_g'den büyük çıkar ve teğetin 0 K kesişimini verir. Sayfa 300 K penceresinde 1,2000 eV ölçer, kuram 1,1997 eV der.",
    },
  ],
  next: [
    { href: "kristal-yapilar.html", title: "Kristal Yapılar: Birim Hücre, Paketleme ve X-Işını Kırınımı", why: "Bantları doğuran periyodik örgünün kendisi: birim hücreler, Miller indisleri ve aynı Bragg koşulunun X ışınlarıyla ölçülmesi." },
    { href: "kuantum-mekanigi.html", title: "Kuantum Çift Yarık: Tek Tek Parçacıklarla Girişim", why: "Elektronun dalga olduğunu tek tek parçacıklarla gör ve de Broglie dalga boyunu ölç; k = π/a'daki Bragg yansıması bu dalganın girişimidir." },
    { href: "elektronik-muhendisligi.html", title: "Elektronik Mühendisliği: Analog Devre Laboratuvarı", why: "p–n ekleminin devredeki hâli: diyotlu doğrultucu, transistörlü yükselteç, işlemsel yükselteç ve süzgeçlerde el hesabını ölçümle karşılaştır." },
    { href: "yenilenebilir-enerji.html", title: "Yenilenebilir Enerji: Rüzgâr, Güneş Hücresi ve Hidroelektrik", why: "Aynı eklem ışık altında: güneş hücresinin I–V eğrisini ve en büyük güç noktasını ölç." },
  ],
  sources: [
    { title: "OpenStax · University Physics Vol. 3, 9.6 Semiconductors and Doping", url: "https://openstax.org/books/university-physics-volume-3/pages/9-6-semiconductors-and-doping", note: "Boşluk iletimi, n ve p tipi katkı, çoğunluk ve azınlık taşıyıcıları, Hall etkisi (İngilizce, açık ders kitabı)." },
    { title: "Computer History Museum · The Silicon Engine: Timeline", url: "https://www.computerhistory.org/siliconengine/timeline/", note: "Faraday 1833, Braun 1874, Ohl'un 1940 p–n eklemi, 1947 nokta temaslı transistör, Kilby 1958 ve Noyce 1959 kayıtları (İngilizce)." },
    { title: "Wikipedia · Semiconductor", url: "https://en.wikipedia.org/wiki/Semiconductor", note: "Bant kuramı, katkılama ve tarihçe: Bloch 1928, Wilson 1931 ve erken gözlemler (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
