window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kalp-dolasim"] = {
  slug: "kalp-dolasim",
  title: "Kalp ve Dolaşım: Pompa, Esnek Depo ve Oksijen",
  field: "Biyoloji",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Kasılırken sertleşen bir odacık, her atımın bir kısmını depolayan esnek bir aort ve oksijeni basınca göre bırakan bir molekül. Basınç–hacim döngüsünü, windkessel'i ve Fick ilkesini ölç.",
  hook:
    "Dakikada 70 kez atan bir kalpte aort kapağı her döngünün ancak üçte biri kadar bir süre açık kalır: sayfadaki modelde 0.857 saniyenin 0.248 saniyesi. Geri kalan zamanda karıncık aorta tek damla kan vermez, ama kan çevredeki damarlara akmayı sürdürür. Kalp sustuğu o uzun aralıkta kanı ileri iten nedir?",
  bigIdea:
    "Dolaşım üç fiziksel parçanın uyumudur: kasılırken sertleşip gevşerken yumuşayan bir odacık (<strong>zamanla değişen elastans</strong>), atımları depolayıp sürekli akışa çeviren esnek bir aort (<em>τ = RC</em>'li bir <strong>windkessel</strong>) ve oksijeni kısmi basınca göre bağlayıp bırakan <strong>hemoglobin</strong>; üçü de ölçülebilir yasalara uyar: Frank–Starling, Ohm ve Fick.",
  story: [
    "Galenos'tan beri on dört yüzyıl boyunca hekimler, kanın karaciğerde besinden yapıldığını ve organlarda tüketildiğini öğretti. İngiliz hekim William Harvey 1628'de Frankfurt'ta yayımladığı <em>De Motu Cordis</em>'te (Kalbin ve Kanın Hareketi Üzerine) bu fikri bir çarpma işlemiyle yıktı. Karıncığın her atımda attığı kanı bilerek küçük tuttu ve atım sayısıyla çarptı: yarım saatte bile kalpten, bütün vücutta bulunandan fazla kan geçiyordu. O kadar kanı ne besin yetiştirebilirdi ne de damarlar alabilirdi; kan tükenmiyor, dönüyor olmalıydı. Kanıtı bir kütle dengesiydi; iki buçuk yüzyıl sonra Fick aynı mantığı oksijene uygulayacaktı. Harvey atardamarı toplardamara bağlayan yolu hiç göremedi. Kılcalları, onun 1657'deki ölümünden kısa süre sonra Marcello Malpighi mikroskopla kurbağa akciğerinde gördü ve 1661'de yayımladı.",
    "Kalbin bir pompa olduğu anlaşılınca soru değişti: pompa kendini nasıl ayarlıyor? Alman fizyolog Otto Frank 1895'te kurbağa karıncığını farklı hacimlere doldurup kasılmasını basınç–hacim düzleminde çizdi: daha çok dolan karıncık daha yüksek basınç geliştiriyordu. Londra'da Ernest Starling, köpekte kalbi ve akciğerleri vücut dolaşımı yerine dolumu ve direnci ayarlanabilen yapay bir devreye bağladı ve aynı sonuca bütün bir pompa için vardı. 1915'teki Linacre Dersi'nde (basımı 1918) bunu 'kalbin yasası' diye özetledi: kasılmanın enerjisi, kas liflerinin kasılmadan önceki uzunluğuna bağlıdır. Yasa ikisinin adını taşır, ama ilk gözlem onların değildir: Joseph Coats ve Henry Bowditch 1869'da Leipzig'de, Carl Ludwig'in enstitüsünde, kurbağa kalbinde dolum basıncıyla kasılma basıncı arasındaki ilişkiyi görmüştü. Sarkomer düzeyindeki açıklama ise ancak kayan filament kuramından sonra, 1960'larda geldi.",
    "Kalbin attığı kanı karşılayan atardamarların payını da Frank yazdı. Esnekliklerinin işlevini Stephen Hales 1733'te, dönemin yangın pompalarında kesik kesik basılan suyu düzgün bir fışkırmaya çeviren hava odasına benzetmişti; Almancası <em>Windkessel</em>. Frank 1899'da bu benzetmeyi bir diferansiyel denkleme çevirdi: esnek bir depo ve bir direnç, bugünkü dille bir RC devresi. Pompanın kendisi için aynı sadelikte bir model yetmiş yıldan uzun bekledi. 1970'lerin başında Hiroyuki Suga ve Kiichi Sagawa, köpek karıncığında yükü değiştirdikçe döngülerin uç-sistolik köşelerinin tek bir doğruya dizildiğini ve basıncın hacme oranının her atımda yükten bağımsız biçimde artıp azaldığını gösterdi: karıncık, sertliği zamanla değişen bir yay gibi davranıyordu. Bu sayfa iki fikri birleştirir: zamanla değişen bir elastans, üç elemanlı bir windkessel'e kan atar.",
    "Oksijenin yolculuğu Kopenhag'da çözülmeye başladı. Gustav von Hüfner hemoglobinin oksijen bağlama eğrisini hiperbol sanıyordu; Christian Bohr, Karl Hasselbalch ve August Krogh 1904'te bütün kanla yaptıkları ölçümlerde eğrinin S biçimli olduğunu ve karbondioksit arttıkça sağa kaydığını gösterdi. Etki Bohr'un adını taşır, ama ölçüm aygıtını yapan Krogh ömrü boyunca onu ilk gösterenin kendisi olduğunu söyledi. Daha önce, 1890'larda, İskoç fizyolog John Scott Haldane maden patlamalarında ölen işçilerin cesetlerini inceleyip öldürücü gazın karbon monoksit olduğunu bulmuş, gazı kapalı bir odada kendi üzerinde denemiş ve madenlere erken uyarı için kanarya ya da beyaz fare götürülmesini önermişti. Kalp debisini ölçmenin yolunu ise Adolf Fick vermişti: Würzburg'daki bir bilim derneğinin 9 Temmuz 1870 tarihli tutanağına geçen kısa bir notta, dokunun aldığı oksijeni arter kanıyla karışık venöz kanın oksijen içeriği farkına bölmeyi önerdi. Ama karışık venöz kan kalbin sağ tarafındadır; insanda oraya ulaşmanın yolunu 1929'da kendi kalbine sonda sokan Werner Forssmann açtı.",
  ],
  core: [
    {
      heading: "Dört evre, iki kapak",
      body:
        "Kapaklar kas değildir; tek yönlü vanalar gibi yalnız basınç farkıyla açılıp kapanır. Döngü dört evreye ayrılır. <strong>Dolum</strong>da mitral kapak açıktır, kan kulakçıktan karıncığa akar. Kasılma başlayınca karıncık basıncı kulakçığınkini geçer ve mitral kapanır; aort kapağı henüz kapalı olduğundan hacim değişmeden basınç yükselir: <strong>izovolümik kasılma</strong>. Basınç aortunkini aşınca aort kapağı açılır ve <strong>atım</strong> (ejeksiyon) başlar. Gevşeyen karıncığın basıncı aortun altına inince kapak kapanır; iki kapak yine kapalıyken basınç düşer: <strong>izovolümik gevşeme</strong>. <strong>Sistol</strong> mitralin kapanışından aort kapağının kapanışına, <strong>diyastol</strong> oradan bir sonraki mitral kapanışına sürer. Sayfanın varsayılan atımında (70 atım/dk) dört evre 0.094, 0.248, 0.096 ve 0.419 s sürer; sistol döngünün 0.40'ıdır. Modelde kasılma yavaş başladığı için izovolümik kasılma, Guyton ve Hall'un verdiği 0.02–0.03 s'den uzundur; sayfa bunu açıkça yazar.",
      formula: "Q = HR × SV, &nbsp;SV = EDV − ESV, &nbsp;EF = SV/EDV",
      formulaNote:
        "Varsayılan atımda EDV 119.6 mL, ESV 49.6 mL, SV 70.1 mL (çıkarma yuvarlamadan önce yapılır), EF 58.6 %; Q = 70 atım/dk × 70.1 mL ≈ 4.90 L/dk. Kalp debisini, karbon monoksitin kısaltması CO ile karışmasın diye Q ile gösteriyoruz; sayfa harfin üstüne, birim zamandaki hacmi anlatan bir nokta koyar. Oksijen tüketimi VO₂ için de aynı nokta kullanılır.",
    },
    {
      heading: "Zamanla sertleşen yay: elastans ve basınç–hacim döngüsü",
      body:
        "Karıncığı bir yay gibi düşün: basıncı, içindeki hacmin bir eşik hacmi V₀'ı ne kadar aştığıyla orantılıdır. Orantı katsayısı <strong>elastans</strong> E'dir (mmHg/mL), yani sertlik. Kas kasıldıkça E büyür, gevşedikçe küçülür; Suga ve Sagawa'nın <strong>zamanla değişen elastans</strong> modeli budur. Basıncı hacme karşı çizersen her atım saat yönünün tersine dolaşılan, dörtgene benzer bir <strong>basınç–hacim döngüsü</strong> verir; dört kenarı dört evredir. E'nin en büyük değeri E<sub>es</sub>, farklı yüklerdeki döngülerin sol üst köşelerinden geçen <strong>uç-sistolik basınç–hacim ilişkisinin</strong> (ESPVR) eğimidir ve kasılabilirliğin ölçüsüdür. Alt kenarı ise üstel <strong>uç-diyastolik ilişki</strong> (EDPVR) belirler: çok dolan karıncık sertleşir. Döngünün alanı, karıncığın bir atımda kana yaptığı iştir, <strong>atım işi</strong>: sayfada 1.031 J. Dakikada 70 atımla bu yaklaşık 1.2 W'lık bir dış güçtür.",
      formula: "P(t) = E(t)·[V(t) − V<sub>0</sub>], &nbsp;SW = −∮P dV",
      formulaNote:
        "Döngü saat yönünün tersine dolaşıldığı için ∮P dV negatiftir; eksi işareti alanı pozitif yapar. 1 mmHg·mL = 1.333×10⁻⁴ J olduğundan varsayılan döngünün yaklaşık 7740 mmHg·mL'lik alanı 1.031 J eder.",
    },
    {
      heading: "Ön yük, ard yük, kasılabilirlik: Frank–Starling",
      body:
        "Atım hacmini üç şey belirler. <strong>Ön yük</strong>, kasılmadan önce karıncığı geren dolumdur: sayfada sol kulakçık basıncı P<sub>LA</sub> ve ondan belirlenen EDV. <strong>Ard yük</strong>, atılan kanın karşısındaki yüktür: çevresel direnç ve atardamarların sertliği. <strong>Kasılabilirlik</strong> ise E<sub>es</sub>'tir. Uç-sistolik nokta iki doğrunun kesişimindedir: ESPVR üzerinde P<sub>es</sub> = E<sub>es</sub>(V<sub>es</sub> − V₀), ard yük doğrusunda P<sub>es</sub> = E<sub>a</sub>·SV. Burada <strong>etkin atardamar elastansı</strong> E<sub>a</sub> ard yükü tek bir sayıya indirir. V<sub>es</sub> = EDV − SV yazıp iki denklemi eşitlersen aşağıdaki bağlaşım formülü çıkar: daha çok dolan karıncık (büyük EDV) daha çok atar. Buna <strong>Frank–Starling mekanizması</strong> denir. Gerçek kasta gerilen sarkomerde aktin ve miyozin daha uygun örtüşür ve kasılma aygıtının kalsiyuma duyarlılığı artar. Sayfada eğri dolum basıncına karşı yatıklaşır; sebep kas değil, üstel EDPVR'dir: aynı basınç artışı çok dolmuş karıncığa daha az kan sokar.",
      formula: "SV = (EDV − V<sub>0</sub>)·E<sub>es</sub>/(E<sub>es</sub> + E<sub>a</sub>), &nbsp;E<sub>a</sub> ≈ (R + Z<sub>c</sub>)/T",
      formulaNote:
        "Sunagawa ve arkadaşlarının (1983) kestirimi. Varsayılan atımda 72.78 mL verir, sayfa 70.07 mL ölçer (−3.72 %). Ard yük artınca E<sub>a</sub> büyür ve SV düşer; kasılabilirlik artınca E<sub>es</sub> büyür ve SV artar.",
    },
    {
      heading: "Windkessel: aort bir kondansatördür",
      body:
        "Kalp kanı kesik kesik atar, ama çevreye akış kesilmez: aort ve büyük atardamarlar sistolde gerilip atılan kanın bir kısmını depolar, diyastolde geri yaylanıp onu ileri iter. Bu esnekliğin ölçüsü <strong>kompliyans</strong>tır, C = ΔV/ΔP (mL/mmHg). Frank'in iki elemanlı modelinde aort bir C, kılcallara giden yol bir R'dir ve kütle korunumu tek bir diferansiyel denklem verir. Diyastolde aort kapağı kapalıdır, giriş sıfırdır ve basınç <strong>τ = RC</strong> zaman sabitiyle üstel olarak iner: bir RC devresindeki kondansatörün boşalmasıyla aynı yasa. Varsayılan değerlerde τ = 1.17 × 1.70 = 1.989 s; kalp dursa basınç iki saniyede başlangıçtakinin %37'sine inerdi. Bir atım boyunca ortalama alınca C'de biriken kan sıfırdır ve geriye <strong>Ohm yasası</strong> kalır: ortalama basınç farkı, debi çarpı dirençtir. Sayfa, aort girişinin dalga direnci olan küçük bir <strong>karakteristik empedans</strong> Z<sub>c</sub> (R'nin yaklaşık yüzde dördü) ekleyen üç elemanlı sürümü kullanır.",
      formula: "C·dP/dt = Q<sub>giriş</sub>(t) − (P − P<sub>v</sub>)/R<br>diyastolde: P − P<sub>v</sub> = (P<sub>0</sub> − P<sub>v</sub>)·e<sup>−t/τ</sup>, &nbsp;τ = RC",
      formulaNote:
        "Birim denetimi: (mmHg·s/mL)·(mL/mmHg) = s. Kararlı durumda bir atımın integrali C·ΔP = 0 verir; buradan <span class=ov>P</span> − P<sub>v</sub> = Q·R çıkar (üç elemanlı modelde R + Z<sub>c</sub>). Sayfa ortalama basıncı bu yolla 99.32 mmHg ile 0.00 % farkla doğrular.",
    },
    {
      heading: "Hemoglobin: S biçimli eğri, Bohr kayması ve Fick",
      body:
        "Her hemoglobin molekülünde dört hem vardır ve bağlanma <strong>işbirlikçidir</strong> (kooperatif): bir oksijenin bağlanması ötekilerinkini kolaylaştırır. Bu yüzden doygunluk eğrisi hiperbol değil, S biçimlidir. Akciğerde (P<sub>O₂</sub> = 100 mmHg) kan yüzde 97.7 doygundur; dinlenimdeki dokuda P<sub>O₂</sub> 40 mmHg civarına inince kan eğrinin dik kısmına girer ve oksijen bırakır. Yarı doygunluk basıncı <strong>P₅₀</strong>, Severinghaus eğrisinde 26.86 mmHg'dir; Hill eğimi orada 2.66'dır. Asit, CO₂, sıcaklık ve 2,3-BPG eğriyi sağa kaydırır (<strong>Bohr etkisi</strong>): çalışan dokuda aynı oksijen daha yüksek bir P<sub>O₂</sub>'de bırakılır. Kanın oksijen içeriği bağlı ve çözünmüş oksijenin toplamıdır. Kararlı durumda dokunun tükettiği oksijen, debi ile arter ve karışık venöz kan arasındaki içerik farkının çarpımıdır. Bu kütle dengesi <strong>Fick ilkesi</strong>dir ve kalp debisini ölçmenin klasik yoludur.",
      formula: "C<sub>O2</sub> = 1.34·Hb·S + 0.003·P<sub>O2</sub><br>Q = VO<sub>2</sub> / (C<sub>a</sub> − C<sub><span class=ov>v</span></sub>)",
      formulaNote:
        "C mL O₂/dL, Hb g/dL, P mmHg cinsindendir. Dinlenimde C<sub>a</sub> = 19.95 ve C<sub><span class=ov>v</span></sub> = 14.95 mL/dL; fark 5.00 mL/dL = 50 mL/L, Q = (250 mL/dk)/(50 mL/L) = 5.00 L/dk.",
    },
  ],
  lab: {
    intro:
      "Sayfa üç sekmelidir. <strong>Kalp döngüsü</strong> sekmesinde Nabız (kalp hızı) kaydırıcısı, dört hazır nabız düğmesi (Yavaş: 50, Dinlenim: 70, Hızlı: 120, Çok hızlı: 170 atım/dk), bir dolaşım şeması, Wiggers diyagramı ve basınç–hacim döngüsü vardır. <strong>Frank–Starling ve yük</strong> sekmesi ön yükü (P<sub>LA</sub>), ard yükü (çevresel direnç R ve Arteriyol yarıçapı r/r₀), Kasılabilirlik E<sub>es</sub>'i ve Atardamar kompliyansı C'yi değiştirir; altı hazır deney, kendiliğinden yapılan on bir noktalı bir Frank–Starling taraması ve diyastolik iniş grafiği içerir. <strong>Oksijen taşıma</strong> sekmesi ayrışma eğrisini, Bohr kaymasını, karbon monoksiti ve Fick ilkesini hesaplar. İlk iki sekme aynı benzetilen dolaşımı paylaşır. Her ayar değişikliğinden sonra kartlar 'ölçülüyor' yazar; atımlar periyodik kararlı duruma varınca ilk kararlı atımın değerleri gösterilir. Model yalnız sol kalp ve sistemik dolaşımdır: refleks, kulakçık kasılması, sağ kalp ve kapak hastalığı yoktur. Sayfa da bu defter de bir eğitim modelidir; tıbbi tanı ya da tedavi önerisi değildir.",
    experiments: [
      {
        title: "Hızlı kalp daha çok mu pompalar?",
        predict:
          "Nabız 70'ten 120 atım/dk'ya çıkınca kalp debisi Q ne olur? 170'te 120'dekinden de fazla mı olur? Q = HR × SV'yi düşün: atım hacmi SV sabit kalır mı?",
        do: "Kalp döngüsü sekmesinde sırayla Dinlenim: 70, Hızlı: 120 ve Çok hızlı: 170 atım/dk düğmelerine bas. Her birinde kartlar kararlı değerleri gösterince Atım hacmi SV, Kalp debisi ve Sistol / diyastol süresi kartlarını ve durum satırındaki evre sürelerini oku; Wiggers diyagramında turkuaz dolum bandının daralışını izle.",
        observe:
          "70'te SV 70.1 mL, Q 4.90 L/dk, sistol döngünün 0.40'ı. 120'de SV 56.7 mL'ye iner ama Q 6.81 L/dk'ya çıkar; sistol payı 0.57, dolum 0.131 s. 170'te SV 25.4 mL'ye, Q 4.32 L/dk'ya düşer: EDV 67.6 mL'ye iner, sistol döngünün 0.68'ini kaplar, dolum 0.044 s'ye kısalır ve durum satırı kırmızı çerçeveyle modelin geçerlik sınırının aşıldığını yazar.",
        explain:
          "Nabız artınca sistol biraz, diyastol çok kısalır (Guyton ve Hall: dinlenimde döngünün 0.4'ü, üç katı nabızda 0.65'i sistoldür). Bir noktadan sonra karıncığın dolmaya vakti kalmaz ve SV'nin düşüşü HR'nin artışını yutar; bu modelde debi yaklaşık 130 atım/dk'da 6.95 L/dk ile tepe yapar. Gerçek kalpte sempatik uyarı gevşemeyi hızlandırır, kasılmayı güçlendirir ve toplardamar dönüşünü artırır; model bunları içermediği için düşüş burada daha erken gelir.",
      },
      {
        title: "Daha çok dolan kalp daha çok atar",
        predict:
          "Dolum basıncını 8'den 16 mmHg'ye, yani iki katına çıkarırsan atım hacmi de iki katına çıkar mı? Taramadaki eğrinin her mmHg başına kazancı düşük ve yüksek dolumda aynı mı olur?",
        do: "Frank–Starling ve yük sekmesinde Ön yük: P<sub>LA</sub> 16 mmHg düğmesine bas; kartları ve durum satırını oku. Sonra Frank–Starling taraması tablosunu ve altındaki notu oku; Frank–Starling eğrisinin yatay ekseni menüsünü Uç-diyastolik hacim EDV'ye çevir.",
        observe:
          "SV 70.1 → 84.5 mL (+20.54 %), EDV 119.6 → 142.1 mL, basınç 143.3/96.6 mmHg. Tabloda SV, 2 mmHg'deki 42.5 mL'den 30 mmHg'de 97.7 mL'ye çıkar; not, SV'nin 2–4 mmHg arasında her mmHg için 6.8 mL, 26–30 mmHg arasında yalnız 0.8 mL arttığını söyler. EDV ekseninde noktalar neredeyse bir doğruya dizilir. Uç-sistolik noktalardan geçen doğru E<sub>es</sub> = 2.800 mmHg/mL ve V₀ = 10.00 mL verir.",
        explain:
          "Atım hacmi kasılma öncesi hacmi izler; iki kat dolum basıncı iki kat hacim getirmez, çünkü EDPVR üsteldir ve çok dolmuş karıncık sertleşir. Bağlaşım formülü P<sub>LA</sub> 16'da 87.70 mL verir, ölçüm 84.45 mL'dir (−3.70 %). Uç-sistolik noktaların doğrusu modelde varsayılmıştır; uydurmanın tam çıkması bir keşif değil, modelin kuruluşudur. Suga ve Sagawa aynı doğruyu gerçek köpek kalbinde ölçmüştü.",
      },
      {
        title: "Direnç mi, sertlik mi? τ = RC'yi ölç",
        predict:
          "Çevresel direnci iki katına çıkarmak ile atardamar kompliyansını yarıya indirmek, diyastolik inişin zaman sabiti τ'yu nasıl değiştirir? Hangisi nabız basıncını (sistolik − diyastolik) büyütür, hangisi ortalama basıncı yükseltir?",
        do: "Frank–Starling ve yük sekmesinde Ard yük: R iki katı (2.34) düğmesine bas; kartları, durum satırını ve Ölçülen ve kuram tablosundaki Diyastolik iniş τ satırını oku. Sonra Sert atardamarlar: C yarıya (0.85) ve Arteriyol yarıçapı %84 (arteriyol direnci ×2) düğmelerini dene.",
        observe:
          "R iki katı: 163.5/132.5 mmHg, ortalama 147.7 mmHg; nabız basıncı 39.2'den 31.0 mmHg'ye daralır, SV 53.1 mL'ye düşer (−24.25 %), τ = 3.9780 s (kuram R<sub>etkin</sub>·C ile 0.00 %). C yarıya: 123.3/63.9 mmHg, nabız basıncı 59.4 mmHg'ye açılır, ortalama 95.3 mmHg ile neredeyse yerinde kalır, τ = 0.9945 s. Arteriyol yarıçapı %84: R<sub>etkin</sub> kartı 1.760 mmHg·s/mL, basınç 144.4/110.0 mmHg, τ = 2.9920 s.",
        explain:
          "Ortalama basıncı Ohm yasası belirler: direnç iki katına çıkınca debi düşse de ortalama basınç fırlar, çünkü modelde baroreseptör refleksi yoktur. Nabız basıncını ise C ve τ belirler: uzun τ'da aort diyastolde az boşalır ve diyastolik basınç yükselir; küçük C'de aynı atım daha büyük bir basınç dalgalanması yapar. Yaşla sertleşen atardamarlarda nabız basıncının açılması bu mekanizmaya dayanır. Yarıçapın %16 küçülmesi arteriyol direncini (1/0.84)⁴ = 2.01 katına çıkarır; modelde R'nin yarısı arteriyollerde olduğu için toplam direnç 1.504 kat artar.",
      },
      {
        title: "Ağır egzersizde oksijen: Bohr kayması ve Fick",
        predict:
          "Ağır egzersizde doku dakikada 250 yerine 3000 mL oksijen tüketir, kalp debisi 5'ten 20 L/dk'ya çıkar. Doku kandaki oksijenin yüzde kaçını alır? Karışık venöz P<sub>O₂</sub> kaça iner?",
        do: "Oksijen taşıma sekmesinde önce Dinlenim, sonra Ağır egzersiz düğmesine bas. O₂ çekim oranı, Karışık venöz P<sub><span class=ov>v</span>O₂</sub>, Venöz doygunluk ve Fick ile ölçülen debi kartlarını, Bohr etkisi tablosunu ve Ölçülen ve kuram tablosunun altındaki notta 1 puanlık S<sub><span class=ov>v</span>O₂</sub> hatasının etkisini oku.",
        observe:
          "Dinlenim: çekim oranı 25.1 %, P<sub><span class=ov>v</span>O₂</sub> 41.3 mmHg, S<sub><span class=ov>v</span>O₂</sub> 73.7 %, Fick 5.00 L/dk, hata etkisi 4.0 %. Ağır egzersiz: çekim 75.8 %, P<sub><span class=ov>v</span>O₂</sub> 21.9 mmHg, S<sub><span class=ov>v</span>O₂</sub> 23.4 %, Fick 20.00 L/dk, hata etkisi 1.3 %; doku P₅₀'si 28.32'den 35.29 mmHg'ye çıkar. Bohr tablosu: kaymasız eğri aynı oksijeni ancak 18.7 mmHg'de bırakırdı; aynı venöz basınca inerken kayma 13.47 yerine 15.00 mL/dL bıraktırır (+11.34 %).",
        explain:
          "Asit, CO₂ ve ısı eğriyi sağa iter; oksijen daha yüksek bir P<sub>O₂</sub>'de bırakılır ve mitokondriye doğru difüzyonu süren basınç farkı korunur. Dinlenimde kan oksijeninin yaklaşık dörtte üçünü geri getirir: egzersizin kullandığı yedek budur. Fick sonucunun girilen debiye tam eşit çıkması bağımsız bir ölçüm değil, kütle dengesidir; sayfa venöz noktayı aynı dengeden bulur. Gerçek ölçümün zayıf yeri a − <span class=ov>v</span> farkıdır: dinlenimde fark küçük olduğundan küçük bir doygunluk hatası debiyi daha çok kaydırır.",
      },
    ],
  },
  wow: [
    {
      title: "Harvey'nin hesabı, bugünkü sayılarla",
      body:
        "Sayfanın varsayılan atımı 70.1 mL'dir; dakikada 70 atımla 4.90 L/dk eder. Bu, saatte yaklaşık 294 litredir: erişkindeki yaklaşık 5 litre kan saatte 60 kez döner. Aynı hızla 80 yıl atan bir kalp yaklaşık 2.9 milyar kez kasılır ve 200 milyon litreden fazla kan pompalar. Harvey'nin 1628'de bilerek küçük tuttuğu sayılarla bile vardığı sonuç buydu: bu kadar kanı hiçbir besin yeniden yapamaz, kan dönmek zorundadır.",
    },
    {
      title: "Bohr etkisinin Bohr'u, atomun Bohr'unun babası",
      body:
        "Hemoglobin eğrisinin CO₂ ile sağa kaymasını 1904'te tarif eden Danimarkalı fizyolog Christian Bohr, kuantum kuramının kurucularından Niels Bohr'un babasıdır. Aynı çalışmanın ortağı August Krogh 1920'de kılcallar üzerine çalışmasıyla, Niels Bohr 1922'de atomun yapısı üzerine çalışmasıyla Nobel aldı. Babanın etkisi bu sayfada hâlâ ölçülüyor: dinlenimdeki doku koşulları, aynı venöz basınca inerken kana 4.44 yerine 5.00 mL/dL oksijen bıraktırıyor (+12.71 %).",
    },
    {
      title: "Kendi kalbine giden sonda",
      body:
        "1929'da Eberswalde'de genç bir hekim olan Werner Forssmann, kendi kolunu uyuşturup bir toplardamarına ince bir idrar sondası soktu, bir kat aşağıdaki röntgen bölümüne yürüdü ve floroskop altında sondayı kalbine kadar ilerletip sağ kulakçığında filme kaydetti. Ödül yerine azar aldı: kayıtlara göre ünlü cerrah Ferdinand Sauerbruch onu izinsiz deney yaptığı için kovdu; Forssmann sonunda kardiyolojiyi bırakıp ürolog oldu. Makalesini okuyan André Cournand ve Dickinson Richards yöntemi Fick ilkesiyle insanda kalp debisini ölçmeye çevirdi. Üçü, deneyden 27 yıl sonra, 1956 Nobel Fizyoloji veya Tıp Ödülü'nü paylaştı.",
    },
  ],
  worked: {
    title: "Windkessel'i basınç eğrisinden ölçmek",
    prompt:
      "Sayfanın varsayılan atımında HR = 70 atım/dk, SV = 70.07 mL, ortalama aort basıncı 99.32 mmHg, nabız basıncı 39.2 mmHg ve diyastolik inişin zaman sabiti τ = 1.989 s ölçülüyor; toplardamar ucundaki basınç P<sub>v</sub> = 0 mmHg. Toplam direnci ve atardamar kompliyansını bul; sonucu kaba SV/PP kestirimiyle karşılaştır.",
    steps: [
      "Debiyi saniye birimine çevir: Q = SV × HR = 70.07 mL × (70/60) s⁻¹ = 81.75 mL/s (4.90 L/dk).",
      "Ohm yasası: R<sub>toplam</sub> = (<span class=ov>P</span> − P<sub>v</sub>)/Q = 99.32 mmHg / 81.75 mL/s = 1.215 mmHg·s/mL. Bu, Guyton ve Hall'un toplam çevresel direnç için verdiği yaklaşık 1 PRU (mmHg·s/mL) mertebesidir. Sayfada R = 1.17 ve Z<sub>c</sub> = 0.045 mmHg·s/mL; toplamları tam 1.215.",
      "Diyastolde aort kapağı kapalıdır; Z<sub>c</sub>'den akım geçmez ve basınç yalnız R üzerinden boşalır: τ = R·C. Buradan C = τ/R = 1.989 s / 1.17 mmHg·s/mL = 1.70 mL/mmHg. Birim: s/(mmHg·s/mL) = mL/mmHg. R yerine toplam direnci kullansaydın 1.64 mL/mmHg bulurdun, yüzde 3.7 eksik.",
      "Kaba kestirim: atılan kanın tümü atardamarlarda depolansaydı C ≈ SV/PP = 70.07/39.2 ≈ 1.79 mL/mmHg olurdu. Sayfa 1.788 mL/mmHg ölçer, gerçek C'den %5.21 büyük; çünkü atım sürerken kanın bir kısmı çoktan çevreye akıp gider.",
      "Anlamı: aort kapağı bir atımda yaklaşık 0.61 s kapalı kalır (izovolümik gevşeme, dolum ve izovolümik kasılma). Bu sürede basınç yalnız e<sup>−0.61/1.989</sup> ≈ 0.74 katına iner: kapanışta yaklaşık 109 mmHg olan basınç bir sonraki açılışta 80.1 mmHg'dir. Kalp dursa basınç τ ≈ 2 s'de başlangıçtakinin e⁻¹ ≈ %37'sine, 5τ ≈ 10 s'de yüzde birin altına inerdi.",
    ],
    result:
      "R<sub>toplam</sub> ≈ 1.22 mmHg·s/mL, C ≈ 1.70 mL/mmHg, τ = RC ≈ 2.0 s. Diyastolik iniş kompliyansı doğru verir; SV/PP oranı onu %5 büyük kestirir ve atardamarlar sertleştikçe (τ kısaldıkça) hata büyür: C yarıya inince %33.",
  },
  misconceptions: [
    {
      myth: "Kalp kanı boş atardamarlara pompalar; iki atım arasında atardamarlarda akış durur.",
      truth:
        "Atardamarlar hep dolu ve gerilidir; varsayılan atımda aort basıncı diyastolde bile 80 mmHg'nin altına inmez. Sistolde atılan kanın bir kısmı esnek aortta depolanır, diyastolde aort geri yaylanıp onu ileri iter. Sayfada aort kapağı 0.857 saniyelik döngünün yalnız 0.248 saniyesinde açıktır, ama dolaşım şemasındaki noktalar arteriyollerde hiç durmaz; kalp dursa basınç τ ≈ 2 s'lik bir üstelle yavaşça inerdi.",
    },
    {
      myth: "Ortalama arter basıncı, diyastolik basınca nabız basıncının üçte biri eklenerek bulunur; 120/80 için her zaman 93 mmHg'dir.",
      truth:
        "Ortalama basınç tanım gereği basıncın bir atım boyunca zaman ortalamasıdır, ∫P dt / T. Üçte bir kuralı, dinlenimde koldan ölçülen dalganın biçimine dayanan bir kestirimdir; dalganın biçimi değişince doğru pay da değişir. Sayfanın aort dalgası daha dolgundur: 119.3/80.1 mmHg için zaman ortalaması 99.3 mmHg, üçte bir kuralı 93.1, Guyton ve Hall'un 0.6·P<sub>d</sub> + 0.4·P<sub>s</sub> kuralı 95.75 mmHg verir (+3.73 %). Tam olan Ohm yasasıdır: Q·(R + Z<sub>c</sub>) = 99.32 mmHg, fark 0.00 %.",
    },
    {
      myth: "Anemi ile karbon monoksit zehirlenmesi aynı şeydir; ikisi de kanın taşıdığı oksijeni yarıya indirir.",
      truth:
        "Sayfada iki durumun arter oksijen içeriği neredeyse aynıdır: Hb 7.5 g/dL'lik anemide 10.12, %50 HbCO'da 10.29 mL/dL. Ama doku oksijeni anemide 28.4 mmHg'de, karbon monoksitte 14.8 mmHg'de bulur. Hemoglobin CO'ya oksijenden 200–250 kat kadar sıkı tutunur ve CO, kalan hemlerin oksijeni bırakmasını da zorlaştırır: eğri sola kayar, doku P₅₀'si 28.32'den 14.07 mmHg'ye düşer. Oksijeni mitokondriye iten basınç farkı çöker; bu yüzden aynı içerikte CO çok daha tehlikelidir.",
    },
    {
      myth: "Toplardamar kanı oksijensizdir; mavi rengi de bundandır.",
      truth:
        "Dinlenimde karışık venöz kan hâlâ yaklaşık dörtte üç doygundur: sayfada S<sub><span class=ov>v</span>O₂</sub> 73.7 %, P<sub><span class=ov>v</span>O₂</sub> 41.3 mmHg. Doku arterdeki oksijenin yalnız dörtte birini alır; kalan yedek ağır egzersizde kullanılır (çekim oranı 75.8 %). Kan her zaman kırmızıdır, toplardamar kanı yalnız daha koyudur; damarların deriden mavimsi görünmesi ışığın deride saçılıp soğurulma biçiminden gelir.",
    },
  ],
  glossary: [
    { term: "Sistol ve diyastol", definition: "Sistol, mitral kapağın kapanışından aort kapağının kapanışına süren kasılma ve atım evresi; diyastol, oradan bir sonraki mitral kapanışına süren gevşeme ve dolum evresidir." },
    { term: "Atım hacmi (SV) ve ejeksiyon fraksiyonu (EF)", definition: "Bir atımda atılan kan, SV = EDV − ESV; EF bunun uç-diyastolik hacme oranıdır, dinlenimde yaklaşık yüzde 60." },
    { term: "Elastans (E)", definition: "Basıncın hacimle değişim oranı, ΔP/ΔV (mmHg/mL); bir odacığın sertliği ve kompliyansın tersi." },
    { term: "ESPVR", definition: "Farklı yüklerde alınan basınç–hacim döngülerinin uç-sistolik noktalarından geçen doğru; eğimi E<sub>es</sub> kasılabilirliği ölçer, hacim eksenini V₀'da keser." },
    { term: "Ön yük ve ard yük", definition: "Ön yük, kasılmadan önce karıncığı geren dolumdur (EDV ya da dolum basıncı); ard yük, atılan kanın karşısındaki yüktür (direnç ve atardamar sertliği)." },
    { term: "Kompliyans (C)", definition: "Hacim değişiminin basınç değişimine oranı, ΔV/ΔP (mL/mmHg); atardamarların esnekliği. Windkessel'de diyastolik inişin zaman sabiti τ = RC'dir." },
    { term: "P₅₀", definition: "Hemoglobinin yarı doygun olduğu oksijen kısmi basıncı; standart koşullarda yaklaşık 27 mmHg. Büyümesi eğrinin sağa kaydığını, oksijenin daha kolay bırakıldığını gösterir." },
    { term: "Fick ilkesi", definition: "Kararlı durumda dokunun tükettiği oksijen, kalp debisi ile arter ve karışık venöz kanın oksijen içeriği farkının çarpımıdır: Q = VO₂/(C<sub>a</sub> − C<sub><span class=ov>v</span></sub>)." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede kalp bir pompa, kan basıncı iki sayıdır; üniversitede (önce <strong>Fizyoloji</strong>, sonra <strong>Biyofizik</strong> ve <strong>Biyomedikal Mühendisliği</strong> derslerinde) dolaşım bir <strong>dinamik sistem</strong>dir. Bu sayfanın çekirdeği iki diferansiyel denklemdir: karıncık hacmi için dV/dt = Q<sub>mitral</sub> − Q<sub>aort</sub>, aort basıncı için C·dP<sub>C</sub>/dt = Q<sub>aort</sub> − (P<sub>C</sub> − P<sub>v</sub>)/R. Kapaklar yalnız basınç farkıyla açılan diyotlardır ve sistem dördüncü mertebe Runge–Kutta yöntemiyle 0.5 ms'lik adımlarla çözülür. <strong>Sistem Modelleme</strong> derslerinde aynı dolaşım elektrik eşdeğeriyle kurulur: basınç gerilim, debi akım, direnç direnç, kompliyans sığa, kanın eylemsizliği bobindir. RC devresi sayfasındaki denklemler burada hiç değişmeden yeniden çıkar.",
      "Sonraki adımlar modelin bıraktığı yerlerden başlar. Aort tek bir kondansatör değil, basınç dalgasının saniyede birkaç metre hızla yayıldığı esnek bir borudur: <strong>nabız dalgası hızı</strong> ve dallanmalardan <strong>yansıyan dalgalar</strong>, aort basıncındaki dikrotik çentiği ve kolda ölçülen sistolik basıncın aorttakinden farklı çıkmasını açıklar. <strong>Baroreseptör refleksi</strong> bu sayfada olmayan geri besleme döngüsüdür: basınç yükselince nabız ve direnç düşer. Sağ kalp, akciğer dolaşımı ve toplardamar dönüşü eklenince Guyton'un debi ve toplardamar dönüşü eğrileri ile <strong>çok bölmeli dolaşım modelleri</strong> ortaya çıkar. Karıncığı kasan elektrik sinyali <strong>EKG ve elektrofizyoloji</strong> konusudur: aksiyon potansiyeli, iyon kanalı modelleri ve kalbin ileti sistemi. Oksijen tarafında Hill ve Adair denklemleri ile hemoglobin allosterisinin Monod–Wyman–Changeux modeli seni bekler.",
    ],
    topics: [
      "Fizyoloji: kalp döngüsü ve hemodinamik",
      "Biyofizik: elastans ve basınç–hacim analizi",
      "Biyomedikal Mühendisliği: dolaşım modelleri",
      "Sistem Modelleme: elektrik eşdeğer devreler",
      "Nabız dalgası hızı ve dalga yansıması",
      "Baroreseptör refleksi",
      "EKG ve elektrofizyoloji",
      "Hemoglobin allosterisi",
    ],
  },
  quiz: [
    {
      question:
        "Direnç değişmeden atardamar kompliyansı yarıya inerse (sertleşme), diyastolik inişin zaman sabiti τ ve nabız basıncı nasıl değişir?",
      options: [
        "τ yarıya iner, nabız basıncı büyür",
        "τ iki katına çıkar, nabız basıncı küçülür",
        "τ değişmez, yalnız ortalama basınç yükselir",
        "τ yarıya iner, nabız basıncı küçülür",
      ],
      answer: 0,
      explanation:
        "τ = RC olduğundan C'nin yarıya inmesi τ'yu yarıya indirir. Aynı atım daha az esnek bir depoya sığınca basınç daha çok yükselir ve diyastolde daha hızlı boşalır: sayfada τ 1.989'dan 0.9945 s'ye iner, nabız basıncı 39.2'den 59.4 mmHg'ye çıkar. Ortalama basınç 99.3'ten 95.3 mmHg'ye neredeyse yerinde kalır, çünkü onu Ohm yasası, Q·R belirler.",
    },
    {
      question:
        "Bir sporcuda VO₂ = 3000 mL/dk, arter kanında 20 mL O₂/dL, karışık venöz kanda 5 mL O₂/dL ölçülüyor. Fick ilkesine göre kalp debisi kaçtır?",
      options: ["15 L/dk", "20 L/dk", "60 L/dk", "200 L/dk"],
      answer: 1,
      explanation:
        "Fark 20 − 5 = 15 mL/dL = 150 mL/L; Q = (3000 mL/dk)/(150 mL/L) = 20 L/dk. 200 L/dk desilitreyi litreye çevirmeyi unutmaktan, 15 L/dk yalnız arter içeriğini, 60 L/dk yalnız venöz içeriği kullanmaktan gelir. Sayfanın Ağır egzersiz durumu 19.78 ve 4.78 mL/dL ile tam 20.00 L/dk verir.",
    },
    {
      question:
        "Sayfada dolum basıncı sabitken çevresel direnç R iki katına çıkarılıyor; modelde refleks yok. Hangisi olur?",
      options: [
        "SV ve ortalama basınç birlikte artar",
        "SV düşer, ortalama basınç yükselir, EDV değişmez",
        "SV değişmez, yalnız diyastolik basınç yükselir",
        "EDV büyür ve Frank–Starling SV'yi tamamen korur",
      ],
      answer: 1,
      explanation:
        "Ard yük artınca E<sub>a</sub> büyür; uç-sistolik nokta ESPVR üzerinde yukarı kayar, ESV 49.6'dan 66.5 mL'ye çıkar ve SV 70.1'den 53.1 mL'ye iner. Dolum basıncı sabit olduğu için EDV 119.6 mL'de kalır. Debi 3.72 L/dk'ya düşse de ortalama basınç Q·R gereği 147.7 mmHg'ye çıkar.",
    },
  ],
  next: [
    {
      href: "akiskanlar-mekanigi.html",
      title: "Akışkanlar Mekaniği: Süreklilik, Bernoulli ve Viskozite",
      why: "Arteriyol direncindeki dördüncü kuvvetin kaynağı: Hagen–Poiseuille yasasını ince borularda ölç, R ∝ 1/r⁴'ün nereden geldiğini gör.",
    },
    {
      href: "elektronik-devre.html",
      title: "Geçici Rejim: RC, RL ve RLC Devreleri",
      why: "Windkessel'in elektrikteki ikizi: kondansatörün boşalması aynı τ = RC yasasına uyar; kare dalga girişi de kalbin kesik kesik atımına benzer.",
    },
    {
      href: "enzim-kinetigi.html",
      title: "Enzim Kinetiği (Michaelis–Menten)",
      why: "İşbirliksiz bağlanmanın hiperbolik doygunluk eğrisi; hemoglobinin S biçimli eğrisini onunla karşılaştır.",
    },
    {
      href: "fotosentez-solunum.html",
      title: "Fotosentez ve Hücresel Solunum",
      why: "Dokunun dakikada çektiği oksijen nereye gidiyor: mitokondrideki elektron taşıma sisteminin son alıcısına.",
    },
  ],
  sources: [
    {
      title: "OpenStax · Anatomy and Physiology 2e, 19.3 Cardiac Cycle",
      url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-3-cardiac-cycle",
      note: "Kalp döngüsünün evreleri, izovolümik kasılma ve gevşeme, kulakçık kasılmasının dolumdaki payı ve kalp sesleri; açık ders kitabı (İngilizce). Verdiği hacimler Guyton ve Hall'unkilerden biraz farklıdır (ör. EDV yaklaşık 130 mL).",
    },
    {
      title: "Wikipedia · Windkessel effect",
      url: "https://en.wikipedia.org/wiki/Windkessel_effect",
      note: "İki, üç ve dört elemanlı windkessel modelleri, diyastoldeki üstel iniş, Hales'in yangın pompası benzetmesi ve Otto Frank'in 1899 makalesi (İngilizce).",
    },
    {
      title: "Wikipedia · Bohr effect",
      url: "https://en.wikipedia.org/wiki/Bohr_effect",
      note: "1904 deneyleri ve S biçimli eğrinin keşfi, Krogh'un öncelik iddiası, hemoglobinin R ve T hâlleri, karbon monoksitin kalan hemlere etkisi (İngilizce).",
    },
    {
      title: "Nobel Prize · Physiology or Medicine 1956",
      url: "https://www.nobelprize.org/prizes/medicine/1956/summary/",
      note: "Cournand, Forssmann ve Richards: kalp kateterizasyonu ve dolaşımdaki patolojik değişiklikler üzerine buluşlar (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
