window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["atislar"] = {
  slug: "atislar",
  title: "Eğik Atış: Parabol, Hava ve En İyi Açı",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 30,
  tagline:
    "Boşlukta top bir parabol çizer ve en uzağa 45° ile gider. Havada yol bozulur, menzil kısalır, en iyi açı düşer. Tartaglia'nın güllelerinden Ay'daki golf vuruşuna atışın matematiği.",
  hook:
    "Ders kitabına göre saniyede 25 metreyle, 45° açıyla vurulan bir futbol topu 63.7 metre gider. Havayı hesaba katan bu sayfada ise top 42.8 metrede yere iner; üstelik en uzağa 45° ile değil, 42° ile gider. Galileo'nun 1638'de kanıtladığı 45° kuralı yanlış mı, yoksa yalnızca havasız bir dünyanın kuralı mı?",
  bigIdea:
    "Boşlukta eğik atış iki bağımsız hareketin, yatayda sabit hızın ve düşeyde serbest düşmenin birleşimidir ve bir <strong>parabol</strong> çizer; hızın karesiyle büyüyen hava direnci bu iki hareketi birbirine kenetler, menzili kısaltır ve en iyi açıyı 45°'nin altına çeker.",
  story: [
    "1512'de Fransız askerleri Brescia'yı yağmalarken katedrale sığınan on iki yaşlarındaki Niccolò'nun çenesi ve damağı bir kılıç darbesiyle yarıldı. Annesinin bakımıyla iyileşti ama konuşması bozuk kaldı; ona 'kekeme' anlamına gelen <strong>Tartaglia</strong> lakabı takıldı, yara izlerini de ömrü boyu sakalının altında sakladı. Kendi kendini yetiştiren bu matematikçi, ticaret hesabı öğreten okullarda ders vererek ve topçularla mimarlara soru başına ücretle akıl satarak geçindi. 1537'de yayımladığı <em>Nova Scientia</em> (Yeni Bilim), top güllelerinin yolunu matematikle inceleyen ilk kitap sayılır. Vardığı sonuçlardan biri, en uzun atışın namlu yatayla 45° yaptığında elde edildiğiydi. Ama çizdiği yol bugünkü gözle yanlıştı: gülle namludan bir süre dümdüz gidiyor, sonra bir çember yayı üzerinde kıvrılıyor, en sonunda dikey bir çizgiyle yere iniyordu. Kitapları 18. yüzyıla kadar sıradan topçuların başvuru kaynağı oldu; Galileo'nun da bol notlu kopyaları vardı.",
    "Doğru resmi Galileo çizdi. 1638'de yayımlanan <em>İki Yeni Bilim</em>'in dördüncü gününde atılan cismin hareketini iki parçaya ayırdı: yatayda değişmeyen bir hız ve düşeyde düzgün hızlanan bir düşüş. İkisinin birleşimi bir <strong>paraboldür</strong>. Buradan 45°'nin en uzun atışı verdiğini ve 45°'den eşit miktarda sapan iki açının aynı uzaklığa düştüğünü kanıtladı, açıya göre menzil ve yükseklik tabloları hazırladı. Kitabın konuşmacılarından Sagredo bu kanıt karşısında, yalnız matematikte bulunan kesin kanıtların gücünün kendisini hayranlık ve sevinçle doldurduğunu söyler. En uzun atışın 45° ile, topçuların deyişiyle kadranın 'altıncı noktasında' yapıldığını topçulardan zaten duymuştur; ama nedenini anlamak, başkalarının tanıklığından da tekrar tekrar denemekten de çok daha değerlidir. Galileo havanın bu düzeni bozduğunu da biliyordu: direnç hızlı cisimlerde daha büyüktü, düşen cismin hızı sınırsızca artmayıp bir üst değere ulaşıyordu; etki yavaş atışlarda küçük, top güllesi gibi hızlı atışlarda büyüktü.",
    "Havayı denkleme Newton soktu. 1687'de <em>Principia</em>'nın ikinci kitabını dirençli ortamlarda harekete ayırdı: direnç hızla orantılıysa eğik atışın yolunu tam olarak buldu; gerçeğe daha yakın olan, hızın karesiyle büyüyen dirençte ise düşey hareketi çözdü ama eğik atışın yolunu kapalı biçimde bulamadı. 18. yüzyılda Johann Bernoulli ve Leonhard Euler problemi integrallere indirgedi; o integraller de ancak sayısal olarak hesaplanabiliyordu. Ölçüm de geldi: İngiliz matematikçi ve askerî mühendis <strong>Benjamin Robins</strong>, 1742'de yayımladığı <em>New Principles of Gunnery</em> (Topçuluğun Yeni İlkeleri) kitabında mermi hızını balistik sarkacıyla ölçtü, havanın hızlı ve yavaş harekete gösterdiği direnç farkını deneylerle inceledi ve tüfek mermilerinin yolundan sapmasını dönmelerine bağladı. Kitabı Almancaya Euler çevirdi ve çeviriye kendi eleştirel yorumlarını ekledi. Bugün de x(t) ve y(t) için kapalı bir formül yoktur; bu sayfa topun yolunu, 20. yüzyılda atış tablolarını hesaplayan ilk bilgisayarlar gibi, küçük zaman adımlarıyla sayısal olarak bulur.",
  ],
  core: [
    {
      heading: "İki bağımsız hareket",
      body:
        "Top elden çıktığı anda onu ileri iten bir kuvvet kalmaz; havasız ortamda tek kuvvet aşağı yönlü ağırlıktır. Yatayda kuvvet olmadığı için yatay hız fırlatmadaki v₀·cos θ değerinde sabit kalır. Düşeyde top, yukarı doğru v₀·sin θ hızıyla başlayan bir serbest düşme yapar. İki hareket birbirinden habersizdir: masadan yatay fırlatılan bir top ile aynı anda masanın kenarından bırakılan bir top yere aynı anda değer. Vektör diliyle bu, sabit ivmeli hareketin tek denklemidir: <strong>r</strong>(t) = <strong>r</strong>₀ + <strong>v</strong>₀t + ½<strong>g</strong>t², burada <strong>g</strong> = (0, −g). Bileşenler arasında t'yi yok edince y, x'in ikinci dereceden bir fonksiyonu çıkar: yol bir paraboldür.",
      formula: "x = v₀ cos θ · t,   y = h₀ + v₀ sin θ · t − ½gt²",
      formulaNote: "t = x/(v₀ cos θ) yerine konunca y = h₀ + x·tan θ − g·x²/(2v₀²cos²θ) olur: x'in ikinci dereceden fonksiyonu, yani parabol.",
    },
    {
      heading: "Menzil, 45° ve tümler açılar",
      body:
        "Yerden yapılan atışta top havada T = 2v₀ sin θ/g kadar kalır ve bu sürede yatayda v₀ cos θ hızıyla ilerler. Çarpım, 2 sin θ cos θ = sin 2θ özdeşliğiyle sadeleşir. sin 2θ en büyük değeri olan 1'e 2θ = 90°'de, yani θ = 45°'de ulaşır. Aynı özdeşlik bir sürpriz de saklar: sin 2θ = sin(180° − 2θ) olduğundan toplamı 90° olan <strong>tümler açılar</strong> (30° ile 60°, 20° ile 70°) aynı menzili verir. Dik atış süreyi, yatık atış yatay hızı kazanır ve çarpımları eşit çıkar: 25 m/s'de 30°'lik atış 7.96 m yükselip 2.55 s uçar, 60°'lik atış 23.89 m yükselip 4.41 s uçar; ikisi de 55.17 m'de iner. Menzil v₀² ile büyür, g ile küçülür: hızı iki katına çıkarmak menzili dört katına çıkarır.",
      formula: "R = v₀² sin 2θ / g",
      formulaNote: "25 m/s ve g = 9.81 m/s² için 45°'de R = 625/9.81 = 63.71 m. Yalnız hava yokken ve top atıldığı yüksekliğe inerken geçerlidir.",
    },
    {
      heading: "Yüksekten atış ve güvenlik parabolü",
      body:
        "Top yerden 2 m yukarıda bırakılınca inişte fazladan süre kazanır; bu süreyi yatay yola çevirmek için biraz daha yatık atmak kârlıdır. En iyi açıyı türevle boğuşmadan bulmanın zarif bir yolu var. Aynı v₀ ile bütün açılarda atılan parabolleri üst üste çiz: hepsi tek bir zarf eğrisinin, <strong>güvenlik parabolünün</strong> altında kalır ve her biri ona bir noktada teğet olur. Zarfı bulmak için yol denklemini u = tan θ'nın ikinci dereceden fonksiyonu olarak yazıp ∂y/∂u = 0 koymak yeter. Topun erişebileceği en uzak yer noktası, zarfın yeri kestiği noktadır; oraya değen parabolün atış açısı tan θ* = v₀²/(gR<sub>maks</sub>) ile verilir. Sonucun bir yorumu daha var: en iyi açıda çıkış ve çarpma hız vektörleri birbirine diktir, yani atış açısı ile iniş açısının toplamı 90°'dir. h₀ = 0'da tan θ* = 1, yani 45°; h₀ büyüdükçe en iyi açı küçülür ve çok yüksek bir uçurumdan atışta yatay atışa yaklaşır.",
      formula: "y<sub>zarf</sub> = h₀ + v₀²/(2g) − gx²/(2v₀²),   R<sub>maks</sub> = (v₀/g)·√(v₀² + 2gh₀),   tan θ* = v₀/√(v₀² + 2gh₀)",
      formulaNote: "R<sub>maks</sub>, y<sub>zarf</sub> = 0 koşulundan çıkar; √(v₀² + 2gh₀) çarpma hızıdır. Gülle, 13.5 m/s ve h₀ = 2.0 m: θ* = 42.21°, R<sub>maks</sub> = 20.48 m, iniş açısı 47.79°; aynı gülle yerden atılsa 45° ve 18.58 m.",
    },
    {
      heading: "Hava direnci: hareketler birbirine bağlanır",
      body:
        "Gündelik hızlarda havanın freni hızın karesiyle büyür ve her an hızın tersine yönelir. Bileşenlere ayırınca yatay denklemde bile |v| = √(vₓ² + v<sub>y</sub>²) görünür: yatay frenin büyüklüğü düşey hıza bağlıdır. Galileo'nun iki bağımsız hareketi artık birbirine kenetlenmiştir; denklemler doğrusal değildir ve x(t), y(t) için kapalı çözüm yoktur. (Direnç hızla doğru orantılı olsaydı bileşenler ayrışır, üstel fonksiyonlarla tam çözülürdü.) Doğal ölçek, frenin ağırlığa eşitlendiği <strong>limit hızdır</strong>. Uzunluğu v<sub>t</sub>²/g, zamanı v<sub>t</sub>/g biriminde ölçersen denklemden m, ρ, C<sub>d</sub> ve A kaybolur; yerden atışta yolun biçimini yalnız v₀/v<sub>t</sub> ve θ belirler. Fırlatmadaki fren/ağırlık oranı F<sub>d</sub>/mg = (v₀/v<sub>t</sub>)² bu yüzden tek başına topun havayı ne kadar hissedeceğini söyler: 25 m/s'de futbol topu için 0.678, masa tenisi topu için 8.03, gülle için 0.027. En iyi açı neden düşer? Dik atış havada daha uzun kalır ve fren yatay hızı daha uzun süre törpüler. Yol simetrisini de kaybeder: futbol topu 45° ile çıkıp 54.6° ile iner.",
      formula: "m·d<strong>v</strong>/dt = m<strong>g</strong> − ½ρC<sub>d</sub>A·|<strong>v</strong>|·<strong>v</strong>,   v<sub>t</sub> = √(2mg/(ρC<sub>d</sub>A))",
      formulaNote: "ρ hava yoğunluğu (deniz düzeyinde, 20 °C'de 1.204 kg/m³), A = πd²/4 kesit alanı, C<sub>d</sub> biçime bağlı birimsiz sürüklenme katsayısı. Limit hız ve v<sub>t</sub>²/g uzunluğu: masa tenisi topu 8.82 m/s ve 7.9 m, futbol topu 30.36 m/s ve 94 m, gülle 152.5 m/s ve 2.4 km. Boşluktaki menzil bu uzunluktan çok kısaysa hava ihmal edilebilir.",
    },
    {
      heading: "Bilgisayarda uçuş ve modelin sınırları",
      body:
        "Kapalı çözüm olmayınca zaman küçük adımlara bölünür. Sayfa her 1 ms'lik adımda <strong>RK4</strong> (dördüncü mertebeden Runge–Kutta) yöntemiyle eğimi adım içinde dört kez hesaplar ve ağırlıklı ortalamasını alır; tepe ve iniş anlarını son adımın içinde Newton yöntemiyle bulur. Hava kapalıyken Fark sütunu 0.00 % gösterir, çünkü sabit ivmede RK4 parabolü tam izler. Havalı uçuşun sınavı enerji defteridir: havaya giden enerji W<sub>d</sub>, sürüklenme gücü ½ρC<sub>d</sub>A|v|³'ün integralidir ve (E<sub>k</sub> + E<sub>p</sub> + W<sub>d</sub>)/E₀ inişte 1.000000 çıkar. Model üç şeyi bilerek dışarıda bırakır. Biri dönen topa hıza dik etkiyen <strong>Magnus kaldırmasıdır</strong>; geri dönüşlü golf ve beyzbol vuruşlarını belirgin biçimde uzatır. İkincisi C<sub>d</sub>'nin hızla değişmesidir: belirli bir hızda sınır tabaka türbülanslı olur ve C<sub>d</sub> birden düşer (<strong>sürüklenme krizi</strong>); golf topunun gamzeleri bu geçişi daha düşük hızlara çeker. Üçüncüsü rüzgârdır, çünkü fren topun havaya göre hızına bağlıdır.",
      formula: "s<sub>n+1</sub> = s<sub>n</sub> + (Δt/6)(k₁ + 2k₂ + 2k₃ + k₄)",
      formulaNote: "s = (x, y, vₓ, v<sub>y</sub>, W<sub>d</sub>) durum vektörü; k₁…k₄ adımın başında, iki kez ortasında ve sonunda hesaplanan eğimler. Toplam hata Δt⁴ ile küçülür: varsayılan atışta adım 20 ms'den 10 ms'ye inince menzil hatası 2.6×10⁻⁹ m'den 1.6×10⁻¹⁰ m'ye, yani 16'da birine düşer.",
    },
  ],
  lab: {
    intro:
      "Sayfa açılınca futbol topu 25 m/s ile 45°'den bir kez kendiliğinden fırlatılır. <strong>Atış</strong> panelinde <strong>Atış hızı v₀</strong> (0–100 m/s, 0.5'er), <strong>Atış açısı θ</strong> (0–90°, 1'er) ve <strong>Atış yüksekliği h₀</strong> (0–50 m) kaydırıcıları ile <strong>Tipik atışı yükle</strong> düğmesi; <strong>Top</strong> panelinde <strong>Top türü</strong> menüsü ve kütle, çap, C<sub>d</sub> kaydırıcıları; <strong>Ortam ve görünüm</strong> panelinde <strong>Gök cismi ve hava</strong> menüsü (Dünya, Denver, Mars, Ay) ve <strong>Hava direnci</strong> kutusu var. Sahnenin altında <strong>Fırlat</strong>, <strong>Duraklat</strong>, <strong>Sıfırla</strong>, <strong>İzleri temizle</strong> ve <strong>Açı taraması</strong> düğmeleri ile <strong>Grafik</strong> menüsü durur; sahnede sürükleyip bırakarak da nişan alabilirsin (okun yönü açıyı, boyu hızı verir). Tablo, RK4 ile 1 ms'lik adımlarla hesaplanan uçuşu (<em>Benzetim</em>) hava direnci olmayan formüllerle (<em>Boşlukta</em>) karşılaştırır; <em>Fark</em> sütunu hava kapalıyken sayısal hatayı, açıkken havanın etkisini gösterir. Açı taraması 0° ile 90° arasında 181 ayrı uçuş hesaplar ve en iyi açıyı 0.001°'ye kadar inceltir; bir kez çalıştırınca her ayar değişikliğinde kendini yeniler. Bir ayarı değiştirmek o anki atışı soluk bir ize çevirir; yeni sayılar için yeniden Fırlat'a (ya da <kbd>Boşluk</kbd> tuşuna) bas.",
    experiments: [
      {
        title: "Boşlukta tümler açılar",
        predict:
          "Hava yokken 25 m/s ile 30° ve 60° atışlarından hangisi daha uzağa gider? R = v₀² sin 2θ/g ikisi için de 625 × 0.866/9.81 ≈ 55.17 m diyor. Hangisi daha yükseğe çıkar, hangisi daha uzun uçar?",
        do: "Futbol topu seçiliyken <strong>Hava direnci</strong> kutusunu kaldır. Atış hızı 25.0 m/s'de kalsın; açıyı 30° yapıp Fırlat'a bas, sonra 60° ile tekrarla. Ardından Açı taraması'na bas ve Grafik'teki R(θ) eğrisine bak.",
        observe:
          "İki atış da 55.17 m'de iner, Fark 0.00 %. 30°'lik atış 7.964 m yükselip 2.548 s uçar; 60°'lik atış 23.89 m yükselip 4.414 s uçar. Tablonun tarama satırları θ* = 45.00° ve R<sub>maks</sub> = 63.71 m gösterir; altındaki tarama notu tümler açıların eşitliğini sin 2θ = sin(180° − 2θ) ile yazar.",
        explain:
          "Menzil yatay hız ile sürenin çarpımıdır: 21.65 m/s × 2.548 s ile 12.50 m/s × 4.414 s aynı 55.17 m'yi verir. RK4 bir parabolü tam izlediği için hava kapalıyken Fark sütunu sıfırdır; sonraki deneylerde görünen her fark havadan gelir.",
      },
      {
        title: "Hava açılınca 45° kuralı bozulur",
        predict:
          "Hava direnci açıkken 25 m/s'lik futbol topu en uzağa hangi açıyla gider: tam 45° mi, daha dik mi, daha yatık mı? Boşluktaki 63.71 metrenin ne kadarı kalır? Daha hızlı toplarda en iyi açı nereye kayar?",
        do: "Hava direnci kutusunu yeniden işaretle, açıyı 45° yap ve Fırlat'a bas; tarama açık değilse Açı taraması'na da bas. Sonra açıyı 30° ve 60° yapıp tablonun altındaki tarama notunu oku. Son olarak Top türünden beyzbolu seçip hızı 45 m/s'ye, ardından golfü seçip 70 m/s'ye getir.",
        observe:
          "45°: R = 42.84 m (−32.76 %), iniş açısı 54.6°. Tarama: θ* = 41.97°, R<sub>maks</sub> = 43.04 m (Fark −32.45 %). Tümler açılar artık eşit değil: tarama notu 30° için 39.83 m, 60° için 36.21 m yazar. Beyzbol 45 m/s: 40.26° ve 111.3 m (boşlukta 206.4 m). Golf 70 m/s: 38.22° ve 203.8 m (499.5 m).",
        explain:
          "Fren yatay hızı uçuş boyunca törpüler; dik atış havada uzun kaldığı için daha çok kaybeder ve yatık olan kazanır. Fırlatmadaki F<sub>d</sub>/mg kartı (0.678, 1.28, 2.34) büyüdükçe en iyi açı 45°'den uzaklaşır. Gerçek golf topu geri dönüşün kaldırmasıyla bundan çok daha uzağa gider; sayfa o kuvveti modellemez.",
      },
      {
        title: "Limit hız: masa tenisi topu ve gülle",
        predict:
          "Hava yokken 30 m'den bırakılan bir cisim yere √(2gh) = 24.26 m/s ile çarpar. Havada 2.7 g'lık masa tenisi topu ve 7.26 kg'lık gülle hangi hızla çarpar? v<sub>t</sub> = √(2mg/(ρC<sub>d</sub>A)) ile iki limit hızı hesapla.",
        do: "Top türünden masa tenisi topunu seç. Atış hızını 0'a, Atış yüksekliğini 30.0 m'ye getir, Grafik menüsünden Hız v(t)'yi seç ve Fırlat'a bas. Sonra gülleyi seçip Fırlat'a yeniden bas.",
        observe:
          "Masa tenisi topu: çarpma hızı 8.818 m/s (−63.65 %), uçuş 4.024 s (boşlukta 2.473 s); limit hız kartı 8.821 m/s gösterir ve |v| eğrisi kesikli limit hız çizgisine yaslanır. Enerjinin 86.8 %'i havaya gider. Gülle: 24.11 m/s (−0.63 %), limit hızı 152.5 m/s.",
        explain:
          "Limit hız kütlenin kesit alanına oranının kareköküyle büyür. Masa tenisi topu v<sub>t</sub>/g ≈ 0.9 s'lik zaman ölçeğinde limite yaklaşır: ilk 9 metrede limit hızın %95'ine ulaşır, kalan 21 metreyi neredeyse sabit hızla iner. Gülle için 30 m, 152.5 m/s'lik limite yaklaşmaya bile yetmez; çarparken limitin yalnız %16'sındadır. Boşlukta sadeleşen kütle, havada v<sub>t</sub> üzerinden sahneye çıkar.",
      },
      {
        title: "Gülle: yüksekten atışta en iyi açı",
        predict:
          "Gülle 2.0 m yükseklikten 13.5 m/s ile bırakılıyor. Boşlukta en uzağa hangi açı götürür? tan θ* = v₀/√(v₀² + 2gh₀) ile hesapla. Bu kadar ağır bir topta hava bu açıyı ne kadar kaydırır?",
        do: "Top türünden gülleyi seç ve Tipik atışı yükle'ye bas (13.5 m/s, 38°, 2.0 m). Hava direnci açıkken Fırlat'a bas, gerekirse Açı taraması'na da bas ve tablonun tarama satırlarını oku. Sonra Hava direnci kutusunu kaldırıp taramayı yeniden oku; en son Atış yüksekliğini 0'a indir.",
        observe:
          "Tipik atış: 20.18 m, boşlukta 20.30 m (−0.56 %). Tarama: θ* = 42.15° ve 20.36 m; formül 42.21° ve 20.48 m verir. Hava kapalıyken tarama da 42.21° bulur. h₀ = 0'da en iyi açı 45.00°'ye, en büyük menzil 18.58 m'ye döner.",
        explain:
          "Yüksekten atılan gülle inişte fazladan süre kazanır, biraz yatık atmak bu süreyi yatay yola çevirir. Gülle için F<sub>d</sub>/mg yalnız 0.0078 olduğundan hava en iyi açıyı yalnız 0.06° kaydırır. Atıcının 38°'de bırakması hata değildir: R(θ) tepe civarında düzdür ve 4° yatık atış yalnız 18 cm kaybettirir.",
      },
    ],
  },
  wow: [
    {
      title: "Ay'da golf: 'miller ve miller' değil, 37 metre",
      body:
        "6 Şubat 1971'de Apollo 14 komutanı Alan Shepard, Ay yürüyüşünün sonunda örnek toplama küreğinin sapına taktığı bir 6 numara demir sopa başıyla iki golf topuna vurdu. Kalın eldivenler ve sert giysi yüzünden tek elle vurabildi; ikinci topun 'miller, miller ve miller' gittiğini söyledi. 2021'de yüksek çözünürlüklü film taramalarıyla yapılan analiz mesafeleri yaklaşık 22 ve 37 metre buldu. Fizik Ay'dan yanaydı: sayfada 30 m/s ve 45° ile vurulan golf topu Ay'da 555.6 m gider, Dünya'daki hava dirençli uçuşun 7.98 katı. 37 metreye ise en iyi açıda √(gR) ≈ 7.7 m/s yeterdi; Dünya'da aynı vuruş 6 metre kadar giderdi. Topu uzağa göndermeyen fizik değil, giysiydi.",
    },
    {
      title: "Stratosfere tırmanan top mermisi",
      body:
        "23 Mart 1918 sabahı Paris'e düşen mermiler, 120 km ötedeki bir Alman topundan geliyordu; ne uçak ne top sesi duyulduğu için Parisliler önce çok yüksekten uçan bir zeplinden bombalandıklarını sandı. Paris Topu'nun sayıları kaynaktan kaynağa değişir; yaygın kabul gören değerlere göre mermi namludan 1640 m/s ile çıkıyor, 182 saniyelik uçuşunda 42.3 km'ye tırmanıyordu. Bu yükseklik ancak Ekim 1942'deki ilk başarılı V-2 uçuşunda aşıldı. Yolun çoğu havanın çok seyrek olduğu yüksekliklerde geçtiği için menzil 130 km'ye ulaşabiliyordu ve hesaplara Dünya'nın dönüşü (Coriolis etkisi) de katıldı. Yine de hava bedelini almıştı: düz zemin varsayan boşluk formülü bu hızla en çok v₀²/g ≈ 274 km verir.",
    },
    {
      title: "Dönen top yolunu büker",
      body:
        "1672'de Isaac Newton, ışık ve renkler üzerine yazdığı ünlü mektupta Cambridge'de tenis oynayanları izlerken fark ettiği bir şeyi anlattı: eğik vurulup dönen top havada kıvrılıyordu. 1742'de Benjamin Robins tüfek mermilerinin yolundan sapmasını dönmeleriyle açıkladı. Etki adını, 1852'de dönen bir pirinç silindir ve bir hava üfleyiciyle gösteren Heinrich Gustav Magnus'tan aldı. Geri dönüşle vurulan golf topunda bu kuvvet yukarı yönlüdür ve topu havada daha uzun tutar. Sayfa onu modellemez: 70 m/s ve 12° ile vurulan golf topu sayfada 129.3 m'de iner, oysa bu top hızındaki gerçek bir sürüş vuruşu 200 metreyi rahatça geçer.",
    },
  ],
  worked: {
    title: "Gülle: süre, menzil ve en iyi açı",
    prompt:
      "Bir atıcı 7.26 kg'lık gülleyi yerden 2.0 m yükseklikte, yatayla 38° açı yaparak 13.5 m/s hızla bırakıyor. Hava direncini ihmal ederek (g = 9.81 m/s²) uçuş süresini, menzili ve en büyük yüksekliği bul. Sonra aynı hızla en uzağa götüren açıyı ve o menzili hesapla. Son olarak ihmalin haklı olup olmadığını limit hızla sına (ρ = 1.204 kg/m³, C<sub>d</sub> = 0.45, çap 12 cm).",
    steps: [
      "Bileşenler: vₓ = 13.5 · cos 38° = 10.64 m/s, v<sub>y</sub> = 13.5 · sin 38° = 8.311 m/s. Yatayda ivme yoktur, düşeyde −g vardır: x = 10.64·t ve y = 2.0 + 8.311·t − 4.905·t² (metre ve saniye).",
      "Uçuş süresi: y = 0, t için ikinci dereceden bir denklemdir; pozitif kök T = (v<sub>y</sub> + √(v<sub>y</sub>² + 2gh₀))/g = (8.311 + √(69.08 + 39.24))/9.81 = (8.311 + 10.41)/9.81 = 1.908 s.",
      "Menzil ve tepe: R = vₓ·T = 10.64 m/s × 1.908 s = 20.30 m. En büyük yükseklik H = h₀ + v<sub>y</sub>²/(2g) = 2.0 m + 3.521 m = 5.521 m. Sayfada gülleyi seçip Tipik atışı yükle'ye basınca Boşlukta sütunu aynı üç sayıyı gösterir.",
      "En iyi açı: √(v₀² + 2gh₀) = √(182.25 + 39.24) = 14.88 m/s; gülle yere bu hızla çarpar. tan θ* = 13.5/14.88 = 0.9071, yani θ* = 42.21°. R<sub>maks</sub> = (v₀/g)·√(v₀² + 2gh₀) = 1.376 s × 14.88 m/s = 20.48 m. İniş açısı 47.79°'dir: 42.21° + 47.79° = 90°, iki hız vektörü diktir.",
      "Hava direnci: A = π(0.12 m)²/4 = 0.01131 m², v<sub>t</sub> = √(2 · 7.26 · 9.81/(1.204 · 0.45 · 0.01131)) = 152.5 m/s. Fırlatmada F<sub>d</sub>/mg = (13.5/152.5)² = 0.0078: fren ağırlığın yüzde birinden küçüktür. Sayfanın RK4 hesabı hava dirençli menzili 20.18 m bulur, yani yalnız 11 cm (0.56 %) kısa.",
    ],
    result:
      "Gülle 1.91 s uçar ve 20.30 m'ye düşer. En iyi açı 45° değil 42.21°'dir ve yalnız 18 cm kazandırır; 38°'de bırakış hızını 0.07 m/s (yüzde 0.5) artırmak aynı kazancı verir. Atıcıların 42°'den de yatık bırakması bu yüzden bir hata değildir: insan kolu yatık doğrultuda daha hızlı itebilir.",
  },
  misconceptions: [
    {
      myth: "En uzağa atış her zaman 45° ile yapılır.",
      truth:
        "Bu yalnız havasız ortamda ve top atıldığı yüksekliğe inerken doğrudur. Yüksekten atışta en iyi açı düşer: 2.0 m'den 13.5 m/s ile atılan gülle için 42.21°. Havada da düşer: 25 m/s'lik futbol topu için 41.97°, 70 m/s'lik golf topu için 38.22°, 25 m/s'lik masa tenisi topu için 33.47°. Hava yükseldikçe seyreliyorsa tablo yine değişebilir: stratosfere tırmanan uzun menzilli top mermilerinde en iyi açı 45°'nin üstüne çıkabilir. Açı taraması'yla her durumu kendin bul.",
    },
    {
      myth: "Boşlukta ağır top hafif toptan daha uzağa gider.",
      truth:
        "Boşlukta menzil formülünde kütle yoktur: ağır top daha çok çekilir ama o kadar da zor ivmelenir. Havada fark doğar, ama sebebi ağırlığın topu 'taşıması' değil, frenin ağırlığa oranıdır. Aynı 25 m/s ve 45° ile gülle 62.40 m, masa tenisi topu 11.87 m gider; Hava direnci kutusunu kaldırınca ikisi de 63.71 m'ye düşer.",
    },
    {
      myth: "Tepe noktasında topun hızı sıfırdır.",
      truth:
        "Tepede sıfır olan yalnız hızın düşey bileşenidir. Havasız ortamda yatay bileşen hiç değişmez: 25 m/s ve 45° ile atılan top tepeden 17.68 m/s ile geçer. İvme ise yolun her yerinde, tepede de, g'dir. Hava dirençli uçuşta en küçük hız tepeden biraz sonra gelir: tepede fren topu hâlâ yavaşlatırken yerçekimi hıza dik olduğu için onu henüz hızlandırmaz. Sayfanın futbol topu tepeden 13.26 m/s ile geçer, 0.25 s sonra 13.03 m/s ile en düşük hıza iner. Uçuşu tepe civarında Duraklat'la dondur; v oku yataydır, kaybolmaz.",
    },
    {
      myth: "Top, atıcının verdiği bir 'atış kuvvetini' taşır; bu kuvvet tükenince düşmeye başlar.",
      truth:
        "Top elden ya da sopadan ayrıldıktan sonra ona yalnız ağırlık ve hava direnci etki eder; hızını bir kuvvet değil eylemsizlik korur. Bu sezgi Orta Çağ'ın 'impetus' (itki) kuramına kadar uzanır ve Tartaglia'nın önce dümdüz giden gülle yolunda da izi görülür. Gerçekte top fırladığı andan itibaren düşer, yol en baştan eğridir. Uçuşu Duraklat: oklar yalnız v, mg ve F<sub>d</sub>'dir; ileri doğru bir kuvvet oku yoktur.",
    },
  ],
  glossary: [
    { term: "Menzil (R)", definition: "Topun fırlatıldığı nokta ile yere değdiği nokta arasındaki yatay uzaklık." },
    { term: "Tümler açılar", definition: "Toplamı 90° olan iki açı; havasız ortamda ve yerden atışta aynı menzili verirler." },
    { term: "Güvenlik parabolü", definition: "Aynı hızla bütün açılarda atılan yolların zarfı; topun erişebileceği noktaları erişemeyeceklerinden ayırır." },
    { term: "Sürüklenme kuvveti (F<sub>d</sub>)", definition: "Havanın harekete zıt yönde uyguladığı direnç; gündelik hızlarda ½ρC<sub>d</sub>Av² ile verilir." },
    { term: "Limit hız (v<sub>t</sub>)", definition: "Sürüklenmenin ağırlığa eşitlendiği düşüş hızı, √(2mg/(ρC<sub>d</sub>A)); F<sub>d</sub>/mg = (v/v<sub>t</sub>)² ile havanın etkisini ölçer." },
    { term: "Magnus etkisi", definition: "Dönen topa hızına dik yönde etkiyen kuvvet; geri dönüş topu yukarı iter, yan dönüş yolunu sağa ya da sola büker." },
    { term: "Sürüklenme krizi", definition: "Küredeki sınır tabakanın türbülanslı hâle geldiği kritik bir hızda sürüklenme katsayısının birden düşmesi." },
    { term: "RK4 (Runge–Kutta)", definition: "Her adımda eğimi dört noktada hesaplayıp ağırlıklı ortalamasını alan sayısal çözüm yöntemi; hatası adımın dördüncü kuvvetiyle küçülür." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede eğik atış iki formüldür; <strong>Fizik I</strong>'de vektörlerle kinematiğin ilk büyük örneği olur: konum, hız ve ivme vektörleri, bileşenlere ayırma, sabit ivmeli hareket. Aynı ders Newton yasalarının uygulamalarında sürüklenmeyi ve limit hızı da işler (OpenStax University Physics 4.3 ve 6.4). <strong>Diferansiyel Denklemler</strong> dersinde düşey düşüş değişkenlerine ayrılabilen bir denklemdir ve v(t) = v<sub>t</sub> tanh(gt/v<sub>t</sub>) gibi tam çözümler verir; eğik atış ise iki bileşeni birbirine bağlayan doğrusal olmayan bir sistemdir. <strong>Klasik Mekanik</strong> dersinde konu hava dirençli atış olarak geri döner: doğrusal dirençte denklemler ayrışır ve üstel fonksiyonlarla tam çözülür. Karesel dirençte hız vektörünün yatayla yaptığı açıyı bağımsız değişken alırsan yatay hız ile bu açı arasındaki bağıntı kapalı biçimde çıkar, ama x, y ve t yine sayısal integral ister. Aynı derste boyut analizi de öğrenilir: 7.26 m/s ile 45°'den atılan masa tenisi topu, 25 m/s'lik futbol topunun yolunu tam 11.85 kat küçültülmüş olarak çizer, çünkü ikisinde de v₀/v<sub>t</sub> = 0.82'dir.",
      "<strong>Sayısal Yöntemler</strong> dersinde bu sayfanın kodu bir ödev gibidir: Euler ve RK4, adım seçimi ve kararlılık, iniş anını adımın içinde Newton yöntemiyle bulmak (olay bulma), korunan bir büyüklükle hatayı denetlemek. 1945'te tamamlanan ENIAC, ilk elektronik genel amaçlı bilgisayarlardan biri, ABD Ordusu'nun topçu atış tablolarını, yani tam bu tür denklemlerin sayısal çözümlerini hesaplamak için yapılmıştı. <strong>Akışkanlar Mekaniği</strong> C<sub>d</sub>'nin nereden geldiğini anlatır: belirleyici olan Reynolds sayısı Re = ρvd/μ'dür (μ havanın viskozitesi, 20 °C'de 1.81×10⁻⁵ Pa·s). Düz bir kürede C<sub>d</sub>, Re yaklaşık 3×10⁵'e gelince 0.45 civarından birden düşer. 25 m/s'deki futbol topu için Re ≈ 3.7×10⁵'tir; dikişleri ve panelleri krizi düz küreden daha düşük hızlara çektiği için top krizin öte yanındadır ve sayfa ona 0.20 gibi küçük bir C<sub>d</sub> verir. Sonraki duraklar <strong>dış balistik</strong> (yükseklikle seyrelen hava, Coriolis, dönme) ve Magnus kaldırmasıdır; spor biyomekaniği de modelin bilmediği insanı ekler: atıcının üretebildiği hız açıya bağlıdır.",
    ],
    topics: [
      "Vektörlerle kinematik",
      "Doğrusal olmayan diferansiyel denklemler",
      "Boyut analizi ve ölçekleme",
      "Sayısal integrasyon (Euler, RK4) ve olay bulma",
      "Reynolds sayısı ve sürüklenme krizi",
      "Magnus etkisi ve kaldırma",
      "Dış balistik",
      "Spor biyomekaniği",
    ],
  },
  quiz: [
    {
      question:
        "Bir golf topunu yerden aynı hız ve açıyla önce Dünya'da havasız ortamda, sonra Ay'da (g = 1.62 m/s², Dünya'nınkinin yaklaşık altıda biri) vuruyorsun. Menzil ve uçuş süresi nasıl değişir?",
      options: [
        "Menzil yaklaşık 6 kat, süre yaklaşık 2.5 kat artar",
        "Menzil de süre de yaklaşık 6 kat artar",
        "Menzil yaklaşık 36 kat, süre 6 kat artar",
        "Menzil de süre de yaklaşık 2.5 kat artar",
      ],
      answer: 1,
      explanation:
        "R = v₀² sin 2θ/g ve T = 2v₀ sin θ/g'nin ikisi de 1/g ile ölçeklenir: 9.81/1.62 = 6.06. Sayfada 30 m/s ve 45° ile Ay'da 555.6 m ve 26.19 s, Dünya'nın Boşlukta sütununda 91.74 m ve 4.325 s okunur; Ay'daki durum satırı da iki oranı 6.06 diye yazar. √(9.81/1.62) ≈ 2.46 ise aynı yükseklikten hızsız bırakılan cismin düşme süresinin oranıdır, çünkü orada t = √(2h/g)'dir.",
    },
    {
      question:
        "Gülle (7.26 kg, 12 cm) ve masa tenisi topu (2.7 g, 4 cm) aynı 25 m/s hız ve 45° ile atılıyor; C<sub>d</sub> ikisinde de 0.45. Hangisi doğrudur?",
      options: [
        "Masa tenisi topu daha büyük sürüklenme kuvveti görür, bu yüzden kısa düşer",
        "Gülle 9 kat büyük sürüklenme kuvveti görür ama bu kuvvet ağırlığının yalnız %2.7'sidir; masa tenisi topunda ağırlığın 8 katıdır",
        "Kütle önemsiz olduğu için ikisi de aynı yere düşer",
        "Gülle ağır olduğu için havada daha çok yavaşlar",
      ],
      answer: 1,
      explanation:
        "F<sub>d</sub> = ½ρC<sub>d</sub>Av² kütleye değil kesit alanına bağlıdır; çap 3 kat olduğundan güllede kuvvet 9 kattır (1.91 N'a karşı 0.21 N). Belirleyici olan F<sub>d</sub>/mg = (v/v<sub>t</sub>)²'dir: gülle için 0.0269, masa tenisi topu için 8.03. Sayfada gülle 62.40 m, masa tenisi topu 11.87 m gider; boşlukta ikisi de 63.71 m.",
    },
    {
      question:
        "Havasız ortamda bir top 10 m yükseklikteki bir yerden 10 m/s hızla atılıyor (g = 9.81 m/s²). En uzağa yaklaşık hangi açı götürür?",
      options: ["45°", "Yaklaşık 30°", "Yaklaşık 60°", "0°, yani yatay atış"],
      answer: 1,
      explanation:
        "tan θ* = v₀/√(v₀² + 2gh₀) = 10/√(100 + 196.2) = 10/17.21 = 0.581, θ* ≈ 30.2°. Yükseklik inişe fazladan süre katar, yatık atış bu süreyi yatay yola çevirir; tamamen yatay atış ise yükselerek kazanılacak süreden vazgeçer. Sayfada h₀ = 10 m, 10 m/s ve hava kapalıyken Açı taraması 30.16° ve 17.54 m bulur.",
    },
  ],
  next: [
    {
      href: "serbest-dusme.html",
      title: "Serbest Düşme",
      why: "Atışın düşey yarısı tek başına: Galileo'nun rampaları, Ay'da çekiç ile tüy ve limit hıza giden düşüşün tam çözümü.",
    },
    {
      href: "diferansiyel-denklemler.html",
      title: "Diferansiyel Denklemler",
      why: "Bu sayfanın çözdüğü denklemin türü: hareket yasasını değişim yasası olarak oku; denge, kararlılık, faz düzlemi ve adım adım sayısal çözüm.",
    },
    {
      href: "akiskanlar-mekanigi.html",
      title: "Akışkanlar Mekaniği",
      why: "Sürüklenmedeki ½ρv², Bernoulli denklemindeki dinamik basınçla aynı terimdir; akışın düzenli mi çalkantılı mı olacağına karar veren Reynolds sayısını orada ölç.",
    },
    {
      href: "is-enerji.html",
      title: "İş ve Enerji",
      why: "Bu sayfanın enerji defterinin aslı: rampadan kayan kutuda sürtünmenin, burada havanın yaptığı negatif iş, kinetik ve potansiyel enerjinin toplamından eksilen miktara eşittir.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 1, 4.3 Projectile Motion",
      url: "https://openstax.org/books/university-physics-volume-1/pages/4-3-projectile-motion",
      note: "Bileşenlere ayırma, menzil ve uçuş süresi, yüksekten atış; çözümlü örnekler (İngilizce, açık ders kitabı).",
    },
    {
      title: "OpenStax · University Physics Vol. 1, 6.4 Drag Force and Terminal Speed",
      url: "https://openstax.org/books/university-physics-volume-1/pages/6-4-drag-force-and-terminal-speed",
      note: "Sürüklenme kuvveti ½ρC<sub>d</sub>Av², limit hız ve hızla orantılı direncin integralle çözümü; çözümlü örnekler (İngilizce, açık ders kitabı).",
    },
    {
      title: "Wikipedia · Magnus effect",
      url: "https://en.wikipedia.org/wiki/Magnus_effect",
      note: "Dönen topun kaldırması; Newton (1672), Robins (1742) ve Magnus (1852) tarihçesi, golf ve beyzbol örnekleri.",
    },
    {
      title: "Wikipedia · Alan Shepard",
      url: "https://en.wikipedia.org/wiki/Alan_Shepard",
      note: "Apollo 14'te Ay'daki golf vuruşları ve 2021 film analizinin bulduğu yaklaşık 22 m ile 37 m.",
    },
  ],
  revision: "Kasım 2026",
};
