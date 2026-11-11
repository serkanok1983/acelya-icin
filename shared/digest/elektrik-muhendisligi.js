window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["elektrik-muhendisligi"] = {
  slug: "elektrik-muhendisligi",
  title: "Elektrik Mühendisliği: Enerji Yolda Nasıl Kaybolmaz?",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline: "Üç faz, yüksek gerilim ve transformatör aynı sorunun üç cevabıdır: enerjiyi en az kayıpla taşımak. Üç fazın gücünü topla, 1/V² yasasını ölç, bir transformatörün verim tepesini ara.",
  hook: "Evindeki prizde 230 V var; o enerjiyi şehre getiren hattın telleri arasında ise 400 000 V. Aynı 100 MW'ı 100 km öteye 0.4 kV ile yollamaya kalksaydık tellerden 151.9 kA akması, hattın da teslim ettiği gücün yaklaşık 3900 katını ısıya çevirmesi gerekirdi. Gerilimi bin kat yükseltmek kaybı neden tam bir milyon kat küçültür?",
  bigIdea: "Taşınan güç gerilim ile akımın çarpımı, yolda ısıya dönen güç ise akımın karesiyle orantılıdır; bu yüzden güç mühendisliğinin bütün hünerleri (yüksek gerilim, transformatör, üç faz, kompanzasyon) aynı işi görür: aynı gücü <strong>daha az akımla</strong> taşımak.",
  story: [
    "1882'de Edison'ın şirketi New York'ta 110 V doğru akım satmaya başladığında santralin nereye kurulacağı tartışılmazdı: şehrin ortasına. Tel direnci yüzünden bir santral ancak bir milden (1.6 km) yakın müşterilere hizmet verebiliyordu. Çare belliydi ama doğru akımda uygulanamıyordu: gerilimi yolda yükseltip evin kapısında yeniden düşürmek. Bunu değişen manyetik akıyla çalışan transformatör yapar, o da yalnız alternatif akımla işler. Mart 1886'da William Stanley, Massachusetts'in Great Barrington kasabasında 500 V ile dağıtıp transformatörlerle 100 V'a indirdiği bir sistemle 23 iş yerini aydınlattı.",
    "Sonrası ‘akımlar savaşı’ diye anılır ve burada kayıtla efsaneyi ayırmak gerekir. Kayıtlara geçen şudur: mühendis Harold Brown, Edison'ın laboratuvarından destek alarak alternatif akımın öldürücülüğünü göstermek için 30 Temmuz 1888'de Columbia College'da bir köpeği seyirci önünde öldürdü; 6 Ağustos 1890'da William Kemmler elektrikli sandalyede idam edilen ilk insan oldu, temyiz masraflarını Westinghouse karşılamıştı. Savaş bir zaferle değil bir şirket evliliğiyle bitti: Nisan 1892'de Edison'ın şirketi Thomson-Houston ile birleşip General Electric oldu ve yeni şirket de alternatif akım üretti. 1903'te öldürülen fil Topsy'nin bu savaşın parçası olduğu sık anlatılır; oysa savaş yaklaşık on yıl önce bitmişti ve Edison'ın o gün yapılanla bir ilgisi yoktu.",
    "Asıl dönüm noktası tek bir dahinin değil, birkaç kişinin işidir. Galileo Ferraris dönen manyetik alanı 1885'te kendi başına inceledi ve çalışmasını 1888 baharında Torino Bilimler Akademisi'ne sundu. Nikola Tesla 1887 sonbaharında başvurduğu çok fazlı motor patentlerini Mayıs 1888'de aldı; aynı yılın temmuzunda George Westinghouse bunların lisansını satın aldı. Bugünkü üç telli üç fazlı düzeni olgunlaştıran ise Berlin'de AEG'de çalışan Mihail Dolivo-Dobrovolski oldu: 1891'e gelindiğinde sincap kafesli motoru da üç fazlı transformatörü de hazırdı. Sınav 1891'deki Frankfurt Elektroteknik Sergisi'ydi. Neckar kıyısındaki Lauffen'de bir su türbininin çevirdiği 300 beygirlik üreteç, 24 Ağustos akşamı 175 km uzaktaki sergiye güç yolladı. Frekans 40 Hz'di; ilk işletme gerilimi için kaynakların bir kısmı 8 kV, bir kısmı 15 kV yazar; sonraki denemelerde 25 kV'a çıkıldı. Ölçülen ortalama verim, türbinden yüke yüzde 75'ti.",
    "Geriye hesap kalmıştı. Sinüsle değişen gerilim ve akımları zaman içinde izlemek, her devre için bir diferansiyel denklem çözmek demekti. 1865'te Breslau'da doğan, 1889'da Amerika'ya göç eden Charles Proteus Steinmetz, 1893'te Chicago'daki Uluslararası Elektrik Kongresi'ne sunduğu ‘Complex Quantities and Their Use in Electrical Engineering’ başlıklı bildirisiyle bu işi cebire indirdi: her sinüsü, uzunluğu etkin değeri ve açısı fazı gösteren bir karmaşık sayıyla, yani bir <strong>fazörle</strong> temsil et; türev almak j·ω ile çarpmaya dönüşsün. Bu sayfanın çekirdeği de tam böyle çalışır: bütün okumalar birkaç karmaşık sayı işleminden çıkar, zaman ekseni yalnızca sonucu sınamak için örneklenir.",
  ],
  core: [
    {
      heading: "Güç üçgeni: akımın çalışan ve gezinen payı",
      body: "Bir motorun sargısı akımı gerilimin gerisine iter; aradaki açı φ'dir. Akımın gerilimle aynı fazdaki bileşeni iş yapar: <strong>aktif güç</strong> P, birimi watt. Çeyrek periyot geride kalan bileşen ise manyetik alanı her yarım periyotta kurup geri verir; ortalaması sıfır olan bu alışverişin ölçüsü <strong>reaktif güç</strong> Q'dur, birimi var. Hattın taşımak zorunda olduğu akımı ikisi birlikte belirler: <strong>görünür güç</strong> S, birimi volt-amper. Üçü bir dik üçgen kurar ve cos φ = P/S oranına <strong>güç katsayısı</strong> denir. Sayfanın açılışında P = 12.80 kW, Q = 9.600 kvar, S = 16.00 kVA: 3-4-5 üçgeninin 3.2 katı. Yükün yanına kondansatör bağlamak (<strong>kompanzasyon</strong>) Q'nun bir kısmını yerinde karşılar; P değişmez, hipotenüs ve onunla birlikte hat akımı kısalır.",
      formula: "P = √3·V<sub>L</sub>·I·cos φ,  Q = √3·V<sub>L</sub>·I·sin φ,  S = √(P² + Q²)<br>Q<sub>C</sub> = P·(tan φ₁ − tan φ₂)<br>I₂ / I₁ = cos φ₁ / cos φ₂",
      formulaNote: "V<sub>L</sub> hat (fazlar arası) gerilimi, I hat akımıdır; hepsi etkin değer. İkinci satır güç katsayısını cos φ₁'den cos φ₂'ye çıkaran batarya gücünü, üçüncüsü aynı aktif güçte hat akımının ne kadar küçüldüğünü verir.",
    },
    {
      heading: "Üç faz: titreşen üç güç, dümdüz bir toplam",
      body: "Tek fazda anlık güç p = v·i sabit değildir. Etkin değerleri V ve I olan iki sinüsü çarp: p = V·I·[cos φ + cos(2ωt − φ)]. İlk terim ortalamadır; ikincisi şebeke frekansının iki katıyla, 100 Hz ile titreşir. Tek fazlı bir motorun mili bu yüzden saniyede yüz kez itilip bırakılır. Şimdi aynı yükten üç tane al ve gerilimlerini 120° arayla kaydır. Titreşen terimlerin açıları 2 × 120° = 240° arayla dizilir; 0°, 240° ve 480° (yani 120°) açılı üç eşit fazör kapalı bir üçgen çizer, toplamları sıfırdır. Geriye yalnız sabit terim kalır. Dengeli üç fazlı bir motor bu yüzden titreşimsiz döner ve üç telle yetinir. Kollar eşit değilse titreşen terimler birbirini götürmez; artan genlik |ΣV·I| olur ve toplam güç yeniden 100 Hz ile dalgalanır.",
      formula: "p<sub>k</sub>(t) = V<sub>f</sub>·I·[cos φ + cos(2ωt − 2θ<sub>k</sub> − φ)],  θ<sub>k</sub> = 0°, 120°, 240°<br>p<sub>a</sub> + p<sub>b</sub> + p<sub>c</sub> = 3·V<sub>f</sub>·I·cos φ = √3·V<sub>L</sub>·I·cos φ<br>Dengesiz yük: tepe–tepe dalgalanma = 2·|ΣV·I|",
      formulaNote: "V<sub>f</sub> = V<sub>L</sub>/√3 faz–nötr gerilimidir. Son satırdaki toplam, fazörlerin eşlenik alınmadan çarpımıdır; eşlenikli toplam ΣV·I* ise P + jQ'yu verir.",
    },
    {
      heading: "1/V² yasası: kaybı akım yaratır, akımı gerilim küçültür",
      body: "Teslim edilecek güç P belli olsun. Hat gerilimi V ise gereken akım I = P/(√3·V·cos φ) olur. Uzunluğu L, kesiti A, özdirenci ρ olan bir iletkenin direnci R = ρL/A'dır ve üç iletkenin her birinde I²R kadar güç ısıya döner. Akımı yerine koyunca gerilim paydaya karesiyle yerleşir. İki kat gerilim dörtte bir kayıp, bin kat gerilim milyonda bir kayıp demektir; kesiti iki katına çıkarmak ise kaybı ancak yarıya indirir ve iki kat metal ister. Logaritmik eksenlerde bu yasa eğimi −2 olan bir doğrudur; sayfa eğimi 25 noktadan ölçer. Modelin dışında kalanlar da önemlidir: hattın reaktansı ve sığası, korona, iletkenin ısıl sınırı. Gerçek uzun hatlarda taşınabilecek gücü çoğu zaman direnç değil bunlar belirler.",
      formula: "P<sub>kayıp</sub> = 3·I²·R = P²·ρ·L / (A·V²·cos²φ)<br>d(ln P<sub>kayıp</sub>) / d(ln V) = −2",
      formulaNote: "V alıcı uçtaki fazlar arası gerilimdir ve sabit tutulur. cos²φ paydadadır: düşük güç katsayısı da kaybı büyütür.",
    },
    {
      heading: "Verim tepesi: değişen kayıp sabit kayba eşitlenince",
      body: "Transformatörün iki kaybı vardır. <strong>Çekirdek kaybı</strong> P<sub>ç</sub> gerilime bağlıdır, yük olsa da olmasa da ödenir. <strong>Bakır kaybı</strong> sargı direncinde doğar ve akımın karesiyle büyür: yük anma akımının x katıysa x²·P<sub>cu</sub>. Çıkış gücü x ile doğru orantılı sayılırsa kayıp/çıkış oranı (P<sub>ç</sub>/x + x·P<sub>cu</sub>) ile orantılıdır. x'e göre türevini sıfırla: −P<sub>ç</sub>/x² + P<sub>cu</sub> = 0. Verim, iki kaybın eşitlendiği yükte en yüksektir. Sayfada 250 W ve 750 W için kural 57.74 % verir, sayısal arama ise 56.54 % bulur. Fark hata değildir: türetme çıkış gerilimini sabit saydı; oysa endüktif yükte V₂ yük arttıkça düşer, çıkış gücü x'ten yavaş büyür ve tepe biraz sola kayar. Eğri tepede çok yassıdır: çekirdek hesabına göre iki yük arasındaki verim farkı 0.001 puanı bulmaz.",
      formula: "η(x) = x·S·cos φ / (x·S·cos φ + P<sub>ç</sub> + x²·P<sub>cu</sub>)<br>dη/dx = 0  ⇒  x²·P<sub>cu</sub> = P<sub>ç</sub>  ⇒  x* = √(P<sub>ç</sub> / P<sub>cu</sub>)",
      formulaNote: "S anma görünür gücü, P<sub>cu</sub> anma akımındaki bakır kaybıdır. Kural, çıkış geriliminin yükle değişmediği varsayımıyla tamdır.",
    },
    {
      heading: "İki deneyle bir transformatörün içini okumak",
      body: "Gerçek transformatörü, ideal bir transformatörün önüne eklenmiş dört elemanla modelleriz: sargı direnci R ve kaçak akıyı temsil eden X seri kolda; çekirdek kaybını temsil eden R<sub>c</sub> ile mıknatıslanma reaktansı X<sub>m</sub> paralel kolda. Dördünü iki ölçüm ayırır. <strong>Boşta çalışma deneyinde</strong> sekonder açıktır, yük akımı yoktur; voltmetre, ampermetre ve wattmetre yalnız paralel kolu görür. <strong>Kısa devre deneyinde</strong> sekonder kısa devre edilir ve primer gerilimi anma akımı akana dek yükseltilir. Bunun için anma geriliminin yalnız 4.27 %'si yeter; çekirdek neredeyse uyur ve ölçüm seri kola aittir. ‘Neredeyse’ sözcüğü önemlidir: paralel kol o küçük gerilimde de akım çeker; 102.4 V'u kolun empedansına bölersen yaklaşık 18 mA bulursun (sayfa bu değeri ayrıca yazmaz). Klasik formüller bunu yok saydığı için R'yi 0.114 %, X'i 0.084 % küçük bulur; boşta deneyinden bilinen kol çıkarılınca fark kapanır.",
      formula: "Boşta: R<sub>c</sub> = V₀² / P₀,  X<sub>m</sub> = V₀² / Q₀,  Q₀ = √((V₀·I₀)² − P₀²)<br>Kısa devre: Z = V<sub>k</sub> / I<sub>k</sub>,  R = P<sub>k</sub> / I<sub>k</sub>²,  X = √(Z² − R²)",
      formulaNote: "Değerler primere indirgenmiştir. Sayfa paralel kolu primer uçlarına bağlayan yaklaşık eşdeğer devreyi kullanır; doyma ve histerezis modelde yoktur.",
    },
  ],
  lab: {
    intro: "Sayfanın üç sekmesi var: <strong>01 · Üç faz ve güç üçgeni</strong>, <strong>02 · Enerji iletimi</strong>, <strong>03 · Transformatör</strong>. Her sekmenin kendi <strong>Sıfırla</strong> düğmesi bulunur; <kbd>R</kbd> açık sekmeyi sıfırlar, <kbd>Boşluk</kbd> ilk sekmedeki fazör animasyonunu duraklatır. Okumalar animasyondan bağımsız hesaplanır. Kartlarda ölçülen değerin yanında kuramın verdiği değer durur; sayılar ondalık noktayla ve dört anlamlı basamakla yazılır.",
    experiments: [
      {
        title: "Üç dalga topla, düz çizgi çıksın",
        predict: "Her fazın gücü saniyede yüz kez inip çıkıyorsa üçünün toplamı da dalgalanmaz mı? Kollardan birinin empedansını yarıya indirirsen ne değişir?",
        do: "İlk sekmede <strong>Sıfırla</strong>'ya bas. ‘Anlık güç’ grafiğindeki kalın çizgiye ve dalgalanma kartlarına bak. Sonra <strong>Dengesizlik: ilk kolun empedans çarpanı k</strong> kaydırıcısını 0.50 yap; son olarak <strong>Yük bağlantısı</strong> menüsünden Üçgen (Δ) seç.",
        observe: "Dengeli yükte a fazının gücü −1.067 kW … 9.600 kW arasında, ölçülen 100.00 Hz ile salınır; toplam 12.80 kW'ta dümdüzdür, ölçülen dalgalanma ‘10⁻⁹'dan küçük’, kuram 0. k = 0.50 olunca hat akımları 46.19 / 23.09 / 23.09 A, P = 17.07 kW, nötr akımı 23.09 A, dalgalanma ölçülen 62.50 %, kuram 62.50 %. Üçgende nötr yoktur, P = 51.20 kW; dalgalanma yine 62.50 %.",
        explain: "Dengeli yükte titreşen üç terim 240° arayla dizilir ve birbirini götürür. k = 0.50, a koluna ikinci bir eş yük bağlamak gibidir: fazladan 23.09 A'lık tek fazlı yükün V<sub>f</sub>·I = 230.9 V × 23.09 A ≈ 5.333 kW genlikli titreşimi karşılıksız kalır. Tepe–tepe 10.67 kW, P'ye oranı 62.50 %. Aynı fazladan akım yıldızda nötrden döner.",
      },
      {
        title: "Kondansatörle akımı kıs, sonra fazla kaçır",
        predict: "Aktif güce hiç dokunmadan hat akımını yüzde kaç azaltabilirsin? Bataryayı gereğinden büyük seçmek zararsız mıdır?",
        do: "İlk sekmeyi sıfırla. <strong>Hedef cos φ</strong> 0.95 iken <strong>Bataryayı hedefe ayarla</strong> düğmesine bas; kartları oku. Ardından <strong>Batarya gücü Q<sub>C</sub></strong> kaydırıcısını önce 9.6 kvar, sonra 20.0 kvar yap ve güç üçgenini izle.",
        observe: "Düğme Q<sub>C</sub>'yi 5.4 kvar yapar (gereken 5.393 kvar, 35.76 µF). cos φ 0.800 geri → 0.950 geri; hat akımı 23.09 A → 19.44 A, azalma 15.8 %; P hep 12.80 kW. 9.6 kvar'da cos φ 1.000, akım 18.48 A, azalma 20.0 %. 20.0 kvar'da Q₂ = −10.40 kvar, cos φ 0.776 ileri, akım 23.80 A: ‘3.1 % artış’.",
        explain: "Aynı P için hat akımı 1/cos φ ile orantılıdır: 0.80/0.95 = 0.842, yani yaklaşık yüzde 16 azalma. Tesisi besleyen hattın kaybı akımın karesiyle gider; sayfa bunu göstermez ama hesabı kısadır: 0.842² = 0.709, yani yaklaşık yüzde 29 daha az kayıp. Batarya yükün Q'sunu aşınca üçgen aşağı devrilir: tesis şebekeye reaktif güç verir, hipotenüs yeniden uzar. Hat, Q'nun yönüne değil büyüklüğüne bakar.",
      },
      {
        title: "Gerilimi yükselt, kaybı karesiyle düşür",
        predict: "100 MW'ı 100 km'ye taşırken gerilimi 154 kV'tan 400 kV'a çıkarmak kaybı kaça böler? Aynı işi iletkeni kalınlaştırarak yapmak ne kadara mal olur?",
        do: "İkinci sekmede <strong>Sıfırla</strong>'ya bas. <strong>İletim gerilimi (fazlar arası)</strong> menüsünde dört sınıfı sırayla seç; tabloyu, durum satırını ve ‘log–log eğim, ölçülen’ kartını oku. 154 kV'a dönüp <strong>Faz başına iletken kesiti A</strong> kaydırıcısını 1000 mm² yap.",
        observe: "R = 5.640 Ω. 400 kV: 151.9 A, kayıp 390.6 kW. 154 kV: 394.6 A, 2.635 MW. 34.5 kV: 1.762 kA, 52.50 MW; durum satırı ‘Model sınırında’ der. 0.4 kV: 151.9 kA, 390.6 GW; ‘Bu düzen çalıştırılamaz’. Ölçülen eğim her ayarda −2.0000. 154 kV'ta ‘Kayıp / gönderilen güç’ kartı 2.57 %, tablonun ‘Kayıp / teslim’ sütunu 2.64 % yazar: paydalar farklıdır. Kesit 1000 mm² olunca R = 2.820 Ω, kayıp 1.318 MW.",
        explain: "400/154 = 2.60 ve 2.60² = 6.75: kayıp 2.635 MW'tan 390.6 kW'a tam bu oranda iner. 0.4 kV'tan 400 kV'a gerilim bin, kayıp bir milyon kat değişir. Kesiti ikiye katlamak kaybı yalnız yarıya indirir ve iki kat alüminyum ister. Eğim tam −2 çıkar, çünkü modelde hat yalnız dirençtir; 0.4 kV satırı gerçek bir tasarımı değil, I²R'nin ölçeğini gösterir.",
      },
      {
        title: "Verim tepesini ve kısa devre deneyini sorgula",
        predict: "250 W çekirdek, 750 W bakır kaybı olan transformatör hangi yükte en verimlidir? Yük kapasitif olursa tepe ne yana kayar? Mıknatıslanma akımı büyürse kısa devre deneyinin hatası ne olur?",
        do: "Üçüncü sekmeyi sıfırla; ‘En verimli yük’, ‘Kuram’ ve ‘Fark’ kartlarını oku. <strong>Yükün türü</strong> menüsünden Kapasitif seç, sonra Endüktif'e dön. <strong>Mıknatıslanma akımı</strong> kaydırıcısını 5.0 % yap ve kısa devre tablosundaki ‘Fark’ sütununa bak.",
        observe: "Endüktif yükte tepe 56.54 % yük, kuram 57.74 % yük, fark −2.07 %; en yüksek verim 97.837 %. Kapasitifte V₂ = 242.7 V, regülasyon −1.10 %, tepe 58.10 % (fark +0.64 %). Kısa devre: 102.4 V, 20.83 A, 749.1 W; klasik R 1.726 Ω (−0.114 %), X 4.604 Ω (−0.084 %), düzeltilmiş satırlar 0 %. Mıknatıslanma 5.0 % iken farklar −0.353 % ve −0.187 %.",
        explain: "Kural V₂'yi sabit sayar. Endüktif yükte V₂ yükle düşer, çıkış gücü x'ten yavaş artar, tepe sola kayar; kapasitif yükte V₂ yükselir ve tepe sağa geçer. Durum satırı tepe noktasında V₂'nin boştaki değerinden −2.04 % farklı olduğunu yazar; tepenin kayması (−2.07 %) bununla neredeyse aynıdır, kapasitif yükte de öyle (+0.67 % ve +0.64 %). Bu bir yasa değil, bu sayılardan çıkan bir gözlemdir. Kısa devre deneyinde 20.83 A'in küçük bir kısmı paralel koldan geçer; kol büyüdükçe (5.0 %) klasik formülün hatası büyür. Nedeni böyle sınanır.",
      },
    ],
  },
  wow: [
    {
      title: "1891: bir nehir 175 km öteyi aydınlatıyor",
      body: "Frankfurt Elektroteknik Sergisi 16 Mayıs – 19 Ekim 1891 arasında 1 200 000 ziyaretçi ağırladı; girişini 1000 ampul aydınlatıyor, içeride elektrikle çalışan yapay bir şelale akıyordu. Sergideki motorları ve lambaları çalıştıran enerjinin bir bölümü 175 km uzaktan, Lauffen'deki bir su türbininden geliyordu. Hat için yaklaşık 60 ton, 4 mm çapında bakır tel çekilmişti; 32 kutuplu üreteç dakikada 150 devirle dönüyor, yani 40 Hz üretiyordu. Türbinden yüke ölçülen ortalama verim yüzde 75'ti. Bugün aynı uzaklıkta yüzde 75 kabul edilemez sayılır; 1891'de ise uzak bir şelalenin bir şehri aydınlatabileceğinin ilk büyük ölçekli kanıtıydı.",
    },
    {
      title: "Bin kat gerilim, milyon kat fark",
      body: "Sayfadaki 100 km'lik alüminyum hattın faz başına direnci 5.640 Ω'dur. 100 MW'ı 400 kV ile taşırken 151.9 A akar ve 390.6 kW ısıya döner: teslim edilen gücün 0.391 %'si. Aynı güç 0.4 kV ile istenseydi akım 151.9 kA, kayıp 390.6 GW olurdu. İki kayıp arasındaki oran tam 10⁶'dır, çünkü gerilim 10³ kat değişmiştir. Uzun mesafeye enerji taşımanın ancak transformatör yaygınlaştıktan sonra mümkün olmasının bütün sırrı bu karedir.",
    },
    {
      title: "Üç tel, iki telin işini dörtte üç metalle görür",
      body: "Kâğıt kalemle yapılacak bir karşılaştırma: aynı gücü, aynı uzaklığa, teller arasındaki gerilim ve toplam kayıp aynı kalacak biçimde taşı. Tek fazda iki tel gerekir ve kayıp 2·P²ρL/(V²A₁) olur; üç fazda üç tel vardır ama kayıp P²ρL/(V²A₃)'tür. İki ifadenin paydasında aynı cos²φ çarpanı da vardır, oranı değiştirmez. Kayıpları eşitlersen A₃ = A₁/2 çıkar: üç ince tel toplam 1.5·A₁ kesit ister, tek fazın iki teli 2·A₁. Üç faz yüzde 25 daha az iletkenle aynı işi yapar, üstüne gücü titreşimsiz verir.",
    },
  ],
  worked: {
    title: "Bir atölyenin güç üçgeni ve kompanzasyon bataryası",
    prompt: "400 V, 50 Hz'lik üç fazlı şebekeye yıldız bağlı dengeli bir yükün her kolu |Z| = 10 Ω, cos φ = 0.80 (endüktif). Hat akımını, P, Q ve S'yi bul. Güç katsayısını 0.95'e çıkaracak batarya gücünü, üçgen bağlı bataryanın faz başına sığasını ve yeni hat akımını hesapla. Bunlar ilk sekmenin açılış değerleridir; sonucu sayfayla karşılaştır.",
    steps: [
      "Faz gerilimi V<sub>f</sub> = V<sub>L</sub>/√3 = 400 V / 1.732 = 230.9 V. Yıldızda hat akımı kol akımına eşittir: I = V<sub>f</sub>/|Z| = 230.9 V / 10 Ω = 23.09 A.",
      "S = √3·V<sub>L</sub>·I = 1.732 × 400 V × 23.09 A = 16.00 kVA. cos φ = 0.80 ise sin φ = 0.60: P = 16.00 × 0.80 = 12.80 kW, Q = 16.00 × 0.60 = 9.600 kvar.",
      "Hedef cos φ₂ = 0.95 için tan φ₂ = 0.3287. Şebekeden çekilecek reaktif güç Q₂ = P·tan φ₂ = 12.80 kW × 0.3287 = 4.207 kvar. Bataryanın vermesi gereken: Q<sub>C</sub> = 9.600 − 4.207 = 5.393 kvar.",
      "Üçgen bağlı bataryada her kondansatör hat gerilimini görür ve ω·C·V<sub>L</sub>² kadar reaktif güç verir; ω = 2π × 50 Hz = 314.2 rad/s. C = Q<sub>C</sub>/(3·ω·V<sub>L</sub>²) = 5393 var / (3 × 314.2 rad/s × (400 V)²) = 35.76 µF.",
      "Yeni görünür güç S₂ = P/cos φ₂ = 12.80 kW / 0.95 = 13.47 kVA, yeni hat akımı I₂ = S₂/(√3·V<sub>L</sub>) = 19.45 A. Azalma 1 − 0.80/0.95 = 15.8 %. Hat kaybı I² ile gittiği için (0.80/0.95)² = 0.709: kayıp yaklaşık yüzde 29 azalır.",
    ],
    result: "I = 23.09 A, P = 12.80 kW, Q = 9.600 kvar, S = 16.00 kVA; Q<sub>C</sub> = 5.393 kvar, faz başına 35.76 µF, yeni akım 19.45 A. Sayfada ‘Bataryayı hedefe ayarla’ değeri kaydırıcının 0.1 kvar adımına, 5.4 kvar'a yuvarlar; bu yüzden kartlarda 35.81 µF ve 19.44 A görürsün.",
  },
  misconceptions: [
    {
      myth: "Reaktif güç, boşa harcanan enerjidir.",
      truth: "Reaktif güç tüketilmez; yük ile şebeke arasında her çeyrek periyotta gidip gelir ve ortalaması sıfırdır. Zararı dolaylıdır: bu alışverişi taşıyan akım hattın direncinde gerçek ısı üretir ve transformatörün kapasitesini doldurur. Sayfada cos φ 0.80'den 0.95'e çıkınca P aynı kalır, hat akımı 23.09 A'den 19.44 A'e iner.",
    },
    {
      myth: "Güç V²/R ise gerilimi yükseltmek hattaki kaybı artırır.",
      truth: "V²/R'deki V, direncin iki ucu arasındaki gerilimdir; hattın toprağa ya da öbür faza göre gerilimi değildir. 154 kV'luk hatta bir iletken boyunca düşen gerilim yalnız I·R = 394.6 A × 5.640 Ω ≈ 2.23 kV'tur ve 3·(2.23 kV)²/5.640 Ω yine 2.635 MW verir. Hat gerilimi yükselince akım, akımla birlikte bu düşüm küçülür.",
    },
    {
      myth: "Transformatör en verimli hâline tam yükte ulaşır.",
      truth: "Verim, bakır kaybı çekirdek kaybına eşitlenince tepe yapar. Sayfadaki transformatörde bu 56.54 % yükte olur (97.837 %); tam yükte verim 97.47 %'ye iner, çünkü bakır kaybı 750.0 W'a çıkmıştır. Boşta ise çıkış sıfırdır ama 250.0 W çekirdek kaybı ödenmeye devam eder.",
    },
    {
      myth: "Kompanzasyon bataryası ne kadar büyükse o kadar iyidir.",
      truth: "Batarya yükün reaktif gücünü aşarsa tesis bu kez şebekeye reaktif güç verir ve hat akımı yeniden büyür. Sayfada 9.600 kvar'lık yüke 20.0 kvar bağlanınca cos φ 0.776 ileri olur, akım 23.80 A'e çıkar: hiç batarya yokken akan 23.09 A'den fazla.",
    },
  ],
  glossary: [
    { term: "Fazör", definition: "Sinüsle değişen bir gerilimi ya da akımı, uzunluğu etkin değeri ve açısı fazı olan tek bir karmaşık sayıyla gösteren temsil." },
    { term: "Hat ve faz gerilimi", definition: "Hat gerilimi iki faz iletkeni arasında, faz gerilimi bir faz ile nötr arasında ölçülür; dengeli sistemde V<sub>L</sub> = √3·V<sub>f</sub>." },
    { term: "Aktif güç (P)", definition: "Anlık gücün bir periyottaki ortalaması; ısıya, ışığa ya da mekanik işe dönüşen güçtür, birimi watt." },
    { term: "Reaktif güç (Q)", definition: "Manyetik ya da elektrik alanda depolanıp her çeyrek periyotta geri verilen enerjinin alışveriş hızının ölçüsü; birimi var." },
    { term: "Güç katsayısı (cos φ)", definition: "Aktif gücün görünür güce oranı P/S; sinüs biçimli dengeli sistemde gerilim ile akım arasındaki faz açısının kosinüsüdür." },
    { term: "Kompanzasyon", definition: "Endüktif yükün reaktif gücünü yükün yanına bağlanan kondansatörlerle yerinde karşılayıp hat akımını azaltma işlemi." },
    { term: "Gerilim regülasyonu", definition: "Sekonder geriliminin boştaki değeri ile yükteki değeri arasındaki farkın yükteki gerilime oranı; kapasitif yükte negatif olabilir." },
    { term: "Kaçak reaktans", definition: "Sargılardan yalnız birini halkalayan manyetik akının eşdeğer devredeki karşılığı olan seri reaktans." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki her hesap, <strong>Devre Analizi</strong> dersinin ‘sinüzoidal sürekli hâl’ bölümünün uygulamasıdır: diferansiyel denklem yerine karmaşık empedans, türev yerine j·ω çarpanı, güç için S = V·I*. Üç fazlı sistemlerin çözümünde dengeli yük tek faza indirgenir; dengesiz yük için <strong>simetrili bileşenler</strong> yöntemi öğrenilir ve sayfadaki |ΣV·I| terimi orada negatif sıralı akım bileşeni olarak yeniden karşına çıkar. <strong>Elektrik Makineleri</strong> dersi transformatörün eşdeğer devresini Faraday yasasından kurar, paralel kolu iki sargının arasına alan tam T devresini, çekirdeğin doymasını ve histerezis eğrisini ekler. Sayfanın ‘taban empedans’ı (Z<sub>b</sub> = V²/S = 115.2 Ω) ise güç mühendislerinin birim (per-unit) sisteminin ilk adımıdır.",
      "<strong>Güç Sistemleri Analizi</strong>'nde iletim hattı yalnız direnç olmaktan çıkar: birim uzunluk başına endüktans ve sığa eklenir, uzun hat için dalga denklemi çözülür. O zaman taşınabilecek gücü direnç değil reaktans ve kararlılık sınırı belirler; reaktif gücün gerilimi nasıl taşıdığı, yük akışı denklemlerinin Newton–Raphson ile çözümü ve kısa devre hesapları aynı dersin konularıdır. Buradaki 1/V² yasası ve verim tepesi iki küçük optimizasyon problemidir; <strong>Kalkülüs</strong>'teki ‘türevi sıfıra eşitle’ adımının mühendislikte nasıl kullanıldığını ve varsayım değişince (sabit V₂) sonucun nasıl kaydığını gösterir. <strong>Elektromanyetik Alan Teorisi</strong> ise kaçak akının, korona boşalmasının ve deri etkisinin nereden geldiğini açıklar.",
    ],
    topics: ["Fazörler ve karmaşık güç", "Simetrili bileşenler", "Birim (per-unit) sistemi", "Transformatörün T eşdeğer devresi", "İletim hattı modelleri", "Reaktif güç ve gerilim denetimi", "Yük akışı"],
  },
  quiz: [
    {
      question: "Aynı hat aynı gücü aynı güç katsayısıyla taşıyor. İletim gerilimi 154 kV'tan 400 kV'a çıkarılırsa hat kaybı yaklaşık kaçta birine iner?",
      options: ["2.6'da birine", "5.2'de birine", "6.75'te birine", "17.5'te birine"],
      answer: 2,
      explanation: "Akım gerilimle ters orantılı azalır, kayıp akımın karesiyle gider: (400/154)² = 2.60² ≈ 6.75. Sayfada kayıp 2.635 MW'tan 390.6 kW'a iner. 2.6 yalnız akımın küçülme oranıdır; kayıp için karesini almak gerekir.",
    },
    {
      question: "Dengeli yükün reaktif gücü 9.600 kvar, hat akımı 23.09 A. Yanına tam 19.2 kvar'lık (yükün Q'sunun iki katı) batarya bağlanırsa şebekeden çekilen hat akımı ne olur?",
      options: ["Sıfıra iner", "18.48 A olur", "Yine 23.09 A olur", "İki katına, 46.19 A'e çıkar"],
      answer: 2,
      explanation: "Şebekenin gördüğü reaktif güç 9.600 − 19.2 = −9.600 kvar olur: büyüklük aynı, yön ters. S = √(P² + Q²) değişmediği için akım yine 23.09 A'dir; güç katsayısı bu kez 0.800 ileridir. En küçük akım (18.48 A) Q'nun tam sıfırlandığı 9.6 kvar'da elde edilir.",
    },
    {
      question: "Bir transformatörün çekirdek kaybı 250 W, anma akımındaki bakır kaybı 1000 W. Çıkış gerilimi sabit sayılırsa verim anma akımının yüzde kaçında en yüksektir?",
      options: ["25 %", "50 %", "71 %", "100 %"],
      answer: 1,
      explanation: "Tepe koşulu x²·P<sub>cu</sub> = P<sub>ç</sub>: x = √(250/1000) = 0.50. Yarı yükte bakır kaybı 0.25 × 1000 = 250 W olur ve çekirdek kaybına eşitlenir. Sayfada Seri direnç R'yi 2.0 % yaparsan bu duruma gelirsin: kural 50.00 %, gerilim düştüğü için ölçülen tepe 49.01 %.",
    },
  ],
  next: [
    { href: "alternatif-akim.html", title: "Alternatif Akım: RLC Devresi, Fazörler ve Rezonans", why: "Faz açısının nereden geldiğini tek fazlı RLC devresinde gör; buradaki cos φ'nin kaynağı oradaki empedanstır." },
    { href: "karmasik-sayilar.html", title: "Karmaşık Sayılar", why: "Fazörleri döndüren ve 120° arayla dizen aritmetiği düzlemde izle; j ile çarpmanın neden çeyrek tur olduğunu gör." },
    { href: "manyetik-alan.html", title: "Manyetik Alan Laboratuvarı: Akımdan Alana, Alandan Akıma", why: "Transformatörün çekirdeğini ve sargılarını birbirine bağlayan manyetik alanın temelini kur." },
    { href: "elektrik-devresi-simulasyonu.html", title: "DC Devre Laboratuvarı: Ohm ve Kirchhoff Yasaları", why: "I²R kaybının ve gerilim düşümünün doğru akımdaki en yalın hâline dön." },
  ],
  sources: [
    { title: "OpenStax University Physics 2 · 15.6 Transformers", url: "https://openstax.org/books/university-physics-volume-2/pages/15-6-transformers", note: "İdeal transformatör bağıntıları, çözümlü örnekler ve enerjinin neden yüksek gerilimle iletildiğinin I²R kaybı üzerinden açıklaması." },
    { title: "MIT OCW · 6.061 Introduction to Electric Power Systems (J. L. Kirtley Jr., 2011)", url: "https://ocw.mit.edu/courses/6-061-introduction-to-electric-power-systems-spring-2011/", note: "Çok fazlı sistemler, karmaşık güç, transformatör ve iletim hattı modelleri için lisans düzeyinde ders notları." },
    { title: "Wikipedia · International Electrotechnical Exhibition (1891)", url: "https://en.wikipedia.org/wiki/International_Electrotechnical_Exhibition", note: "Lauffen–Frankfurt iletimi: 175 km, 40 Hz, yüzde 75 ortalama verim, tel ve ziyaretçi sayıları. Bu madde ilk işletme gerilimini 8 kV verir; Dolivo-Dobrovolski maddesi 15 kV yazar." },
    { title: "Wikipedia · War of the currents", url: "https://en.wikipedia.org/wiki/War_of_the_currents", note: "Great Barrington (1886), Brown'un gösterileri (1888), Kemmler (1890) ve 1892'deki General Electric birleşmesinin tarihleri." },
  ],
  revision: "Kasım 2026",
};
