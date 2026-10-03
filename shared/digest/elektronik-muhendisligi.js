window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["elektronik-muhendisligi"] = {
  slug: "elektronik-muhendisligi",
  title: "Elektronik: Kumdan Düşünen Makineye",
  field: "Mühendislik",
  level: "Lise",
  minutes: 35,
  tagline:
    "Bir kum tanesinin içine birkaç yabancı atom karıştır; akımı tek yöne geçiren bir kapı, sonra bir anahtar, sonra bir bilgisayar çıkar. Elektronik mühendisliği bu zincirin her halkasını tasarlar.",
  hook:
    "1946'da ENIAC, 17.468 vakum tüpüyle 150 kilowatt yakıyor ve birkaç günde bir tüplerinden biri patlıyordu. Bir yıl sonra New Jersey'de iki fizikçi, bir germanyum parçasına iki altın temas bastırdı ve aynı işi fındık büyüklüğünde, ısınmadan yapan bir şey buldu. Bugün telefonunun işlemcisinde ondan on milyarlarca var. Bir kaya parçası nasıl hem akımı tek yöne geçirir, hem sesi yükseltir, hem toplama yapar?",
  bigIdea:
    "Elektroniğin tamamı tek bir numaraya dayanır: <strong>küçük bir sinyalle büyük bir akımı yönetmek</strong>. Diyot akıma yön verir, transistör onu bir musluk gibi kısar ya da açar; geri besleme bu musluğu hassas bir yükselteç, iki seviyeye zorlamak ise onu bir lojik kapı yapar.",
  story: [
    "16 Aralık 1947'de Bell Laboratuvarları'nda John Bardeen ve Walter Brattain, bir germanyum kristalinin üstüne plastik bir kamaya sarılmış altın folyoyla iki temas bastırdı ve girişteki küçük sinyalin çıkışta büyüdüğünü gördü: ilk <strong>transistör</strong>. Adı, 'transfer' ve 'rezistör' sözcüklerinden John Pierce koydu. Grup lideri William Shockley bu nokta-temaslı aygıtı kırılgan buldu ve birkaç hafta içinde çok daha sağlam bir fikir geliştirdi: iki PN eklemini sırt sırta koyan <em>eklem transistörü</em>. Çalışan örneği 1951'de yapıldı; üçü 1956 Nobel Fizik Ödülü'nü paylaştı. O sırada vakum tüpü hâlâ elektroniğin kralıydı: ısıtılan bir flamandan kopan elektronları boşlukta yöneten, kırılgan, sıcak ve kısa ömürlü bir cam ampul. Transistör aynı işi katı bir kristalin içinde, ısıtıcısız, bir pirinç tanesi kadar yerde yapıyordu.",
    "Sorun hemen değişti: transistör ucuzlamıştı ama bir bilgisayar on binlerce transistörün elle lehimlenmesini istiyordu; Bell'den Jack Morton buna 'sayıların tiranlığı' dedi. 1958 yazında Texas Instruments'a yeni giren Jack Kilby, tatil hakkı olmadığı için boş laboratuvarda tek başına kaldı ve transistörü, direnci ve kondansatörü aynı germanyum parçasının üstüne işledi. 12 Eylül 1958'de osiloskopta bir sinüs dalgası belirdi: ilk <strong>tümleşik devre</strong>. Birkaç ay sonra Fairchild'da Robert Noyce, Jean Hoerni'nin düzlemsel silisyum işlemini kullanarak bileşenleri çipin üstüne buharlaştırılmış alüminyum yollarla bağladı; bugünkü çiplerin atası budur. 1959'da yine Bell'de Mohamed Atalla ve Dawon Kahng, kapısı yalıtılmış transistörü, <strong>MOSFET</strong>'i gösterdi. 1965'te Gordon Moore, <em>Electronics</em> dergisinde çip başına bileşen sayısının her yıl ikiye katlandığını yazdı; 1971'de Intel'in 4004 işlemcisi 2.300 transistörle çıktı.",
    "Elektroniğin öteki yarısı sayılarla değil, sürekli sinyallerle uğraşır. 1947'de John Ragazzini ve arkadaşları, toplama ve integral alma gibi matematik 'işlemlerini' yapan yükselteçlere <strong>işlemsel yükselteç</strong> adını verdi; bunlar analog bilgisayarların yapı taşıydı. 1968'de Fairchild'da David Fullagar'ın tasarladığı μA741, içine konan tek bir kondansatörle geri besleme altında kararlı kalan ilk kolay kullanımlı op-amp oldu ve yarım yüzyıl sonra hâlâ üretiliyor. Dijital tarafın temeli ise daha eski: George Boole 1854'te mantığı cebire çevirdi; Claude Shannon 1937'deki yüksek lisans tezinde röle devrelerinin tam olarak bu cebiri hesapladığını gösterdi. Bugün her AND kapısı Boole'un, her flip-flop Shannon'ın mirasıdır.",
    "Üçüncü dalga, bilgisayarı tek çipe sığdırmaktı. 1974'te Texas Instruments'ın hesap makineleri için yaptığı TMS1000, işlemciyi, belleği ve giriş-çıkışı aynı yongada topladı: ilk <strong>mikrodenetleyici</strong>. 2005'te İtalya'nın Ivrea kasabasındaki bir tasarım okulunda Massimo Banzi ve arkadaşları, öğrencilerin elektronik bilmeden devre kurabilmesi için Arduino'yu yaptı; 2016'da Şanghay'daki Espressif, içinde Wi-Fi ve Bluetooth bulunan ESP32'yi birkaç dolara sattı; 2021'de Raspberry Pi Vakfı 4 dolarlık Pico'yu çıkardı. Sayfadaki altı kart bu hikâyenin bugünkü halidir: 1947'nin fındık büyüklüğündeki tek transistörü, 2020'lerde bir okul öğrencisinin masasında Wi-Fi'li bir bilgisayara dönüştü.",
  ],
  core: [
    {
      heading: "PN eklemi: akıma tek yön veren kapı",
      body:
        "Saf silisyumun her atomunun dört komşusuyla paylaşacak dört elektronu vardır; kristal neredeyse yalıtkandır. Milyonda birkaç atomu beş elektronlu fosforla değiştirirsen fazladan serbest elektronlar kalır (<strong>N-tipi</strong>); üç elektronlu borla değiştirirsen elektron eksikleri, yani <strong>boşluklar</strong> dolaşır (<strong>P-tipi</strong>). İkisini yan yana getirdiğinde sınırda elektronlar boşluklara dolar ve taşıyıcısız ince bir <strong>boşaltım bölgesi</strong> oluşur; sayfadaki diyot sekmesinde ortadaki soluk şerit budur. P tarafına artı gerilim uygularsan bu şerit daralır ve akım geçer; ters çevirirsen genişler ve akım durur. Akım gerilimle doğrusal değil, üstel büyür: her 60 milivoltluk artış akımı on katına çıkarır. 'Eşik 0.7 V' sözü, akımın miliamper düzeyine ulaştığı yerin kısaltmasıdır; germanyumda bu 0.3 V, bir LED'de 1.8–3.3 V'tur.",
      formula: "I = I<sub>S</sub>·(e<sup>V/(nV<sub>T</sub>)</sup> − 1),   V<sub>T</sub> = kT/q ≈ 26 mV",
      formulaNote: "Shockley diyot denklemi. Oda sıcaklığında V_T ≈ 26 mV; n idealite katsayısı 1–2 arasındadır. e'nin üssü olduğundan gerilim azıcık artınca akım fırlar.",
    },
    {
      heading: "Transistör: küçük akım büyük akımı, küçük gerilim bir kanalı yönetir",
      body:
        "NPN transistör, N-P-N dizilmiş iki PN eklemidir; ortadaki ince P katmanı <strong>baz</strong>dır. Baz-emiter eklemini 0.7 V ile ileri yönde açtığında emiterden fırlayan elektronların büyük çoğunluğu incecik bazı geçip kolektöre ulaşır; baz akımının yalnızca küçük bir payı geriye kalır. Sonuç: kolektör akımı baz akımının <strong>β</strong> katıdır, β tipik olarak 100–300. BJT akımla kumanda edilen bir musluktur. MOSFET'te ise kapı (gate), kanaldan birkaç nanometrelik cam gibi bir silisyum dioksit katmanıyla yalıtılmıştır; kapıya V<sub>th</sub> eşiğini (çoğunlukla 2–4 V) aşan bir gerilim verildiğinde kaynak ile savak arasında bir elektron kanalı belirir. Kararlı durumda kapı akımı neredeyse sıfırdır; bu yüzden milyarlarca MOSFET bir çipte yan yana durabilir. Her iki aygıt da iki işte kullanılır: ara bölgede <em>yükselteç</em>, tam açık ya da tam kapalı iken <em>anahtar</em>.",
      formula: "I<sub>C</sub> = β·I<sub>B</sub>   (BJT)   ·   V<sub>GS</sub> > V<sub>th</sub> ⇒ kanal açık   (MOSFET)",
      formulaNote: "β bir oran, birimsiz. Anahtar olarak kullanırken baz akımını gerekenden birkaç kat fazla verirsin ki transistör 'doyma'ya, yani tam açığa gitsin.",
    },
    {
      heading: "Op-amp ve negatif geri besleme: iki altın kural",
      body:
        "Bir işlemsel yükselteç iki girişi arasındaki farkı devasa bir sayıyla çarpar; 741'de bu açık çevrim kazancı yüz binler mertebesindedir. Bu haliyle işe yaramaz: birkaç mikrovoltluk fark çıkışı besleme sınırına yapıştırır. Numara, çıkışın bir parçasını eksi girişe geri yollamaktır. O zaman iki kural doğar: girişler akım çekmez ve çıkış, iki girişi <strong>eşitleyene</strong> kadar hareket eder. Sayfadaki eviren devrede artı giriş topraktadır; o hâlde eksi giriş de 'sanal toprak' olur. V<sub>in</sub>, R<sub>in</sub> üzerinden V<sub>in</sub>/R<sub>in</sub> akımı sürer; bu akımın gidecek tek yeri R<sub>f</sub>'dir, çıkış da −(R<sub>f</sub>/R<sub>in</sub>)·V<sub>in</sub> olmak zorundadır. Evirmeyen devrede giriş doğrudan artı uca bağlıdır; R<sub>f</sub>–R<sub>1</sub> bölücüsünün çıkışı V<sub>in</sub>'e eşitlenir, kazanç 1 + R<sub>f</sub>/R<sub>1</sub> olur. Kazanç artık çipe değil, iki ucuz dirence bağlıdır.",
      formula: "Eviren: V<sub>out</sub> = −(R<sub>f</sub>/R<sub>in</sub>)·V<sub>in</sub>   ·   Evirmeyen: V<sub>out</sub> = (1 + R<sub>f</sub>/R<sub>1</sub>)·V<sub>in</sub>",
      formulaNote: "Sayfadaki değerlerle (R_in = 10 kΩ, R_f = 20 kΩ): eviren −2, evirmeyen +3. Fark yükselteci ise V_out = (R_f/R_1)·(V₂ − V₁) verir.",
    },
    {
      heading: "Dijital: yalnızca iki seviye, bu yüzden hatasız",
      body:
        "Analog sinyal her gürültüyü taşır; dijital devre gerilimi iki bölgeye ayırır ('yüksek' ve 'alçak') ve aradaki her şeyi yok sayar. Bu kayıp bir kazançtır: milyarlarca kapıdan geçen bir bit, her aşamada yeniden temizlenir. Kapılar Boole cebirini hesaplar: AND çarpma, OR toplamaya benzer, XOR 'ikisinden tam biri'. Sayfadaki AND ve XOR sütunlarını birlikte okursan bir <strong>yarım toplayıcı</strong> görürsün: XOR toplamın birler basamağı, AND elde. Dört NAND kapısıyla her kapı, dolayısıyla her hesap kurulabilir. Zamanı işin içine sokan parça <strong>flip-flop</strong>tur: D girişindeki biti yalnızca saat darbesinin kenarında kopyalayıp sonraki darbeye kadar tutar. Bellek, sayaç ve işlemci bu tek bitlik hafızadan örülür.",
      formula: "S = A ⊕ B,   C = A·B",
      formulaNote: "Yarım toplayıcı: S toplam biti (XOR), C elde biti (AND). 1 + 1 = 10₂: S = 0, C = 1.",
    },
    {
      heading: "Mikrodenetleyici: tek yongada bilgisayar ve dünyayla konuşma",
      body:
        "Bir mikrodenetleyici, işlemciyi, programın durduğu flaş belleği, değişkenlerin durduğu SRAM'i ve çevre birimlerini aynı çipe koyar. Çevre birimleri dış dünyaya açılan kapılardır: zamanlayıcılar, PWM çıkışları, analog-dijital çevirici (<strong>ADC</strong>) ve seri haberleşme donanımı. Arduino Uno'nun 10 bitlik ADC'si 0–5 V aralığını 1024 basamağa böler; her basamak 4.9 mV'tur. ESP32'nin 12 bitlik ADC'si 3.3 V'u 4096'ya böler, basamak 0.8 mV. Konuşma tarafında UART iki telle, I²C iki telle ama adresli ve çok cihazlı, SPI dört telle ve çok hızlı, CAN ise gürültülü bir otomobilin içinde diferansiyel iki telle çalışır. UART'ta 115200 baud 'saniyede 115200 bit' demektir; her baytın başına bir start, sonuna bir stop biti eklendiğinden gerçek hız saniyede 11.520 bayttır.",
      formula: "ADC adımı = V<sub>ref</sub> / 2<sup>n</sup>   ·   bayt/s ≈ baud / 10 (8N1)",
      formulaNote: "n bit sayısı. 5 V / 2¹⁰ = 4.88 mV. 8N1: 8 veri biti, parite yok, 1 stop biti; start bitiyle birlikte bayt başına 10 bit.",
    },
  ],
  lab: {
    intro:
      "Bu sayfada kaydırıcı yok; üç küçük gösterim ve iki kart kütüphanesi var. Yarı iletken panelinde üç sekme (<strong>Diyot (PN Eklemi)</strong>, <strong>BJT (NPN/PNP)</strong>, <strong>MOSFET (N/P Kanal)</strong>) çizimi ve altındaki açıklama satırını değiştirir. Op-amp panelinde <strong>Eviren</strong>, <strong>Evirmeyen</strong> ve <strong>Fark Yükselteci</strong> düğmeleri devreyi değiştirir; dirençler R<sub>in</sub> = 10 kΩ, R<sub>f</sub> = 20 kΩ sabittir ve kazanç alttaki satırda yazar. Lojik panelinde <strong>A'yı Değiştir</strong>, <strong>B'yi Değiştir</strong> ve <strong>Clock Pulse</strong> düğmeleri var; sonuçlar hem kapı kutularında hem de 'AND: … · OR: …' satırında görünür. Mikrodenetleyici kartlarına tıklayınca ayrıntı kutusu dolar. Deneyler bu gerçek düğmelerle yapılır; sayılar sayfanın kendi kodundan hesaplanmıştır.",
    experiments: [
      {
        title: "Aynı iki direnç, iki farklı kazanç",
        predict:
          "R<sub>in</sub> = 10 kΩ ve R<sub>f</sub> = 20 kΩ ile eviren devrenin kazancı kaçtır? Aynı dirençlerle evirmeyen devrede kazanç 2 mi olur, başka bir şey mi? Hangi devrede giriş empedansı daha yüksektir?",
        do: "Op-amp panelinde önce <strong>Eviren (Inverting)</strong>, sonra <strong>Evirmeyen (Non-Inv)</strong>, sonra <strong>Fark Yükselteci</strong> düğmesine bas; her seferinde çizimdeki direnç etiketlerini ve alttaki açıklama satırını oku.",
        observe:
          "Eviren: 'V<sub>out</sub> = −(R<sub>f</sub>/R<sub>in</sub>) × V<sub>in</sub> = −2 × V<sub>in</sub> · Giriş empedansı = 10 kΩ'. Evirmeyen: '= 3 × V<sub>in</sub> · Giriş empedansı çok yüksek (~MΩ)'. Fark yükselteci: V<sub>out</sub> = (R<sub>f</sub>/R<sub>1</sub>)·(V₂ − V₁). Aynı dirençler, −2 ve +3.",
        explain:
          "Evirende sinyal R<sub>in</sub> üzerinden sanal toprağa akar; kazanç yalnızca iki direncin oranıdır ve işaret ters döner. Evirmeyende giriş, bölücünün tepesine değil doğrudan artı uca bağlıdır; bölücü V<sub>out</sub>·R<sub>1</sub>/(R<sub>1</sub>+R<sub>f</sub>) = V<sub>in</sub> olunca kazanç 1 + 20/10 = 3 çıkar. Giriş empedansı farkı da buradan gelir: evirende kaynak 10 kΩ'luk direnci sürer, evirmeyende neredeyse akım çekilmeyen bir op-amp girişini.",
      },
      {
        title: "Yarım toplayıcı: iki kapıyla 1 + 1 = 10",
        predict:
          "A ve B'nin dört kombinasyonu için AND, OR, XOR ve NAND çıkışlarını bir tabloya yaz. XOR ile AND'i yan yana 'AND XOR' biçiminde iki bitlik bir sayı gibi okursan ne elde edersin?",
        do: "Lojik panelinde <strong>A'yı Değiştir</strong> ve <strong>B'yi Değiştir</strong> düğmeleriyle sırayla (A,B) = (0,0), (1,0), (0,1), (1,1) durumlarını kur; düğme etiketleri o anki değeri gösterir. Her durumda alttaki 'AND: … · OR: … · XOR: … · NAND: …' satırını not et.",
        observe:
          "(0,0): AND 0, OR 0, XOR 0, NAND 1. (1,0) ve (0,1): AND 0, OR 1, XOR 1, NAND 1. (1,1): AND 1, OR 1, XOR 0, NAND 0. 'AND XOR' çifti sırasıyla 00, 01, 01, 10: yani 0, 1, 1, 2. NAND her satırda AND'in tam tersi.",
        explain:
          "İki biti toplarsan toplam biti 'ikisinden tam biri 1' olduğunda 1'dir (XOR), elde biti ise 'ikisi de 1' olduğunda (AND). Bu iki kapı bir yarım toplayıcıdır; önceki basamaktan gelen eldeyi de hesaba katan tam toplayıcı, iki yarım toplayıcıyla bir OR'dan yapılır. 64 bitlik bir işlemcinin toplama birimi bu küçük kalıbın yan yana dizilmiş hâlidir.",
      },
      {
        title: "Saat darbesi gerçekten bir iş yapıyor mu?",
        predict:
          "Gerçek bir D flip-flop, D girişindeki değeri yalnızca saat darbesinin yükselen kenarında kopyalar. O hâlde A'yı değiştirip Clock Pulse'a basmazsan 'D FF' kutusu değişmemeli. Sayfada böyle mi olacak?",
        do: "A = 0 iken 'D FF' kutusunu ve CLK değerini not et. <strong>A'yı Değiştir</strong>'e bas, Clock Pulse'a basmadan D FF'e bak. Sonra <strong>Clock Pulse</strong>'a iki kez bas ve CLK yazısını izle.",
        observe:
          "D FF kutusu A'ya basar basmaz değişir; saat darbesi beklemez. Clock Pulse yalnızca 'CLK = 0' ile 'CLK = 1' arasında gidip gelir, çıkışları hiç etkilemez. Açıklama satırı da bunu söyler: 'D FF: … (A girişi D'ye bağlı)'.",
        explain:
          "Sayfanın kodu D FF çıkışını doğrudan A'ya eşitler; saat girişi çizimde var, mantıkta yok. Gerçek flip-flopta Q, kenar anındaki D'yi alır ve bir sonraki kenara kadar tutar: A sonra değişse bile Q eski değeri hatırlar. Kombinasyonel devre ile ardışıl devre arasındaki fark tam budur: ilki yalnızca şimdiki girişe bakar, ikincisinin hafızası vardır. Sayfa bu kadarını gösterir; gerçek davranışı görmek için Mantık Devresi sayfasına geç.",
      },
      {
        title: "Altı kart, otuz yıllık uçurum",
        predict:
          "Arduino Uno 16 MHz, Teensy 4.0 600 MHz: saat hızı oranı kaç? Uno'nun 2 KB RAM'i ile Teensy'nin 1 MB'ı arasında kaç kat var? Pico'nun 264 KB'ı Uno'nun kaç katı?",
        do: "Mikrodenetleyici panelinde sırayla <strong>Arduino Uno</strong>, <strong>Raspberry Pi Pico</strong> ve <strong>Teensy 4.0</strong> kartlarına tıkla; kart üstündeki özellik satırlarını ve açılan ayrıntı kutusunu oku. Sonra ATtiny85 ve ESP32'ye bak.",
        observe:
          "Saat: 600 / 16 = 37.5 kat. RAM: 1024 KB / 2 KB = 512 kat; Pico 264 / 2 = 132 kat. ATtiny85'in 512 bayt RAM'i Uno'nun dörtte biri. ESP32 240 MHz ve 520 KB ile ortada ama tek Wi-Fi ve Bluetooth taşıyan kart o.",
        explain:
          "Sayılar aynı işi yapan çipler arasında değil, farklı sorulara verilmiş cevaplar arasındaki farktır. Uno 8 bitlik AVR çekirdeğiyle bir LED'i yakmak için fazlasıyla yeterli ve 5 V toleransıyla hoşgörülü; Teensy'nin 32 bitlik Cortex-M7'si ses işlemek için var. ATtiny85 uyku modunda mikroamperlerle aylarca pil ömrü sunar. Mühendislik, en hızlıyı değil, işe ve bütçeye uyanı seçmektir.",
      },
    ],
  },
  wow: [
    {
      title: "Bir yaz tatili, bir Nobel",
      body:
        "Jack Kilby 1958'de Texas Instruments'a yeni girdiği için yaz tatiline hak kazanmamıştı; herkes gidince boş laboratuvarda tek başına çalıştı ve 12 Eylül 1958'de bütün devreyi tek bir germanyum parçasına sığdırdı. Tümleşik devre için Nobel Fizik Ödülü 2000 yılında, 42 yıl sonra geldi. Aynı fikre bağımsız ulaşan Robert Noyce 1990'da ölmüştü; Nobel ölenlere verilmez.",
    },
    {
      title: "1965'te yazılan tahmin, 2.300'den 19 milyara",
      body:
        "Gordon Moore'un 19 Nisan 1965 tarihli yazısı, çip başına bileşen sayısının her yıl ikiye katlanacağını ve 1975'te 65.000'e varacağını öngörüyordu; 1975'te bu süreyi iki yıla çekti. 1971'deki Intel 4004'te 2.300 transistör vardı; Apple'ın 2023'teki A17 Pro işlemcisinde 19 milyar. Elli iki yılda sekiz milyon kat. Hiçbir başka teknoloji bu hızla bu kadar uzun süre büyümedi.",
    },
    {
      title: "Ay'a inen bilgisayar ile masadaki Arduino",
      body:
        "Apollo kılavuz bilgisayarının 4 kilobayt silinebilir belleği, yaklaşık 72 kilobayt sabit program belleği ve 1.024 MHz saat hızı vardı; mantığı yaklaşık 2.800 çipteki NOR kapılarından örülmüştü ve astronotları 1969'da Ay'a indirdi. Sayfadaki Arduino Uno 2 KB RAM ve 32 KB programla bellekte ondan küçük, ama 16 MHz ile yaklaşık 16 kat hızlıdır ve birkaç yüz lira eder. Mesele hız değil, doğru yazılmış program ve iyi kullanılmış her bittir.",
    },
  ],
  worked: {
    title: "Arduino pini bir LED'i transistörle sürüyor",
    prompt:
      "5 V'luk bir Arduino Uno pini en fazla 20 mA verebilir. 2.0 V ileri gerilimli bir LED'i 20 mA ile yakmak, ama pini yormamak istiyorsun. Sayfadaki değerlerle (NPN: V<sub>BE</sub> ≈ 0.7 V, β ≥ 100) seri direnci ve baz direncini hesapla; sonra aynı işi MOSFET'le yapsan ne değişirdi?",
    steps: [
      "Yük direncini bul: LED kolektör ile +5 V arasına, transistör emiterden toprağa. Tam açık transistörün üzerinde yaklaşık 0.2 V kalır. R<sub>C</sub> = (5 − 2.0 − 0.2) V / 0.020 A = 140 Ω. Standart değer 150 Ω seç: akım (5 − 2.2)/150 = 18.7 mA.",
      "Gereken baz akımını bul: I<sub>B</sub> ≥ I<sub>C</sub>/β = 18.7 mA / 100 = 0.187 mA. Anahtar olarak kullanırken emin olmak için bunu birkaç katına çıkar; 1 mA hedefle (zorlanmış β ≈ 19).",
      "Baz direncini hesapla: pin 5 V, baz-emiter eklemi 0.7 V düşürür. R<sub>B</sub> = (5 − 0.7) V / 0.001 A = 4.3 kΩ. Standart 4.7 kΩ ile I<sub>B</sub> = 4.3 V / 4700 Ω = 0.91 mA; 0.91 × 100 = 91 mA > 18.7 mA olduğundan transistör kesinlikle doymada, yani tam açık.",
      "Pinin yükünü kontrol et: pin yalnızca 0.91 mA veriyor, sınırının yirmide biri. LED'in 18.7 mA'i pinden değil, +5 V hattından gelir; transistör bu akıma yalnızca izin verir.",
      "MOSFET ile karşılaştır: kapı yalıtılmış olduğundan kararlı durumda hiç akım çekmez, baz direnci gerekmez. Ama V<sub>GS</sub> eşiği 2–4 V olan sıradan bir MOSFET, 3.3 V'luk bir ESP32 pininden tam açılmayabilir; bu yüzden 'lojik seviyeli' (V<sub>th</sub> ≈ 1–2 V) MOSFET seçilir.",
    ],
    result:
      "150 Ω seri direnç, 4.7 kΩ baz direnci: LED 18.7 mA ile yanar, pin 0.9 mA verir. Transistör yoktan akım yaratmaz; pinin küçük akımı, besleme hattından gelen büyük akıma yalnızca 'geç' der.",
  },
  misconceptions: [
    {
      myth: "Transistör akımı büyütür; yani girişteki enerjiyi çoğaltır.",
      truth:
        "Transistör bir musluktur, pompa değil. Kolektördeki büyük akım ve enerji besleme kaynağından gelir; baz ya da kapı sinyali yalnızca musluğu ne kadar açacağını söyler. Çıkış gücü asla girişten yaratılmaz, bataryadan ya da adaptörden alınır.",
    },
    {
      myth: "Silisyum diyot 0.7 V'un altında hiç iletmez, üstünde serbestçe iletir.",
      truth:
        "Diyot akımı gerilimle üstel büyür; keskin bir duvar yoktur. 0.7 V, akımın miliamper düzeyine geldiği yerdir. Her 60 mV geriye gidişte akım on kat düşer: 0.5 V'ta hâlâ akım vardır, yalnızca binde biri kadar. 'Eşik' bir doğa yasası değil, pratik bir kısaltmadır.",
    },
    {
      myth: "Dirençler kazancı 2 yapınca op-amp çipi de 2 kat yükseltiyordur.",
      truth:
        "Çip hâlâ yüz binlerce kat yükseltir. Negatif geri besleme, çıkışın bir parçasını eksi girişe yollayarak iki giriş arasındaki farkı neredeyse sıfıra çeker; sonuçta görünen kazanç dirençlerin oranı olur. Çipin kazancı büyüdükçe sonuç dirençlere daha da sadık kalır; bu yüzden ucuz bir 741 ile hassas bir devre kurulabilir.",
    },
    {
      myth: "Dijital devrede 1 tam olarak 5 V, 0 tam olarak 0 V'tur.",
      truth:
        "Seviyeler aralıktır. 5 V'luk TTL mantığında giriş 2.0 V'un üstündeyse 'yüksek', 0.8 V'un altındaysa 'alçak' sayılır; aradaki bölge tanımsızdır. Bu pay, gürültüyü yutmanın bedelidir ve dijitalin hatasız kalma sırrıdır. 3.3 V'luk bir kartla 5 V'luk bir kartı doğrudan bağlamadan önce bu aralıklara bakmak gerekir.",
    },
  ],
  glossary: [
    { term: "Yarı iletken", definition: "İletkenliği katkı atomlarıyla, sıcaklıkla ya da gerilimle ayarlanabilen malzeme; silisyum ve germanyum en yaygın örnekleridir." },
    { term: "Katkılama", definition: "Saf kristale milyonda birkaç yabancı atom (fosfor, bor) ekleyerek serbest elektron ya da boşluk kazandırma işlemi." },
    { term: "Boşaltım bölgesi", definition: "P ve N bölgelerinin sınırında hareketli taşıyıcıların tükendiği ince katman; ileri gerilimde daralır, ters gerilimde genişler." },
    { term: "Eşik gerilimi (V<sub>th</sub>)", definition: "MOSFET'in kapı-kaynak gerilimi bu değeri aşınca iletken kanal oluşur; diyotta ise akımın belirgin hâle geldiği gerilim için de kullanılır." },
    { term: "Kazanç", definition: "Çıkış büyüklüğünün giriş büyüklüğüne oranı; birimsizdir, eksi işareti evirmeyi gösterir." },
    { term: "Negatif geri besleme", definition: "Çıkışın bir kısmını girişe ters yönde geri yollayarak sistemi dengeye zorlama; op-amp kazancını dirençlere bağlayan ilke." },
    { term: "Flip-flop", definition: "Bir biti saat darbesinin kenarında alıp sonraki darbeye kadar tutan devre; dijital hafızanın en küçük birimi." },
    { term: "ADC", definition: "Analog-dijital çevirici; sürekli bir gerilimi 2ⁿ basamaklı bir tam sayıya dönüştürür, n çözünürlük biti sayısıdır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede diyot 'tek yönlü geçit', transistör 'yükselteç'tir; üniversitede ikisi de <strong>katıhal fiziği</strong>nden türetilir: silisyumda elektronların geçmesi gereken 1.12 elektronvoltluk bant aralığı, katkı atomlarının bu aralığa yerleştirdiği enerji düzeyleri ve Shockley denklemindeki üstel ifadeyi doğuran Boltzmann dağılımı. Devre analizi dersinde transistörün çevresindeki küçük sinyal modeli kurulur; işaretler ve sistemler dersinde yükselteç bir fonksiyona dönüşür ve frekansa göre davranışı Fourier ile Laplace dönüşümleriyle, Bode diyagramlarıyla incelenir. Kontrol teorisi de aynı negatif geri beslemeyi ele alır, ama bir uyarıyla: geri beslenen sinyal çok gecikirse yükselteç osilatöre dönüşür. 741'in içindeki o tek kondansatör tam bu tehlikeye karşı konmuştur.",
      "Dijital tarafta kapılar, Verilog ya da VHDL gibi donanım tanımlama dilleriyle yazılan ve bir FPGA'ye ya da çipe dökülen tasarımlara dönüşür; bilgisayar mimarisi dersi yarım toplayıcıdan işlemciye giden yolu adım adım kurar. Gömülü sistemler dersinde sayfadaki mikrodenetleyiciler kesmeler, DMA ve gerçek zamanlı işletim sistemleriyle programlanır. Bir de hız meselesi vardır: sinyaller gigahertz'e çıkınca PCB üzerindeki bir bakır yol artık basit bir tel değil, bir iletim hattıdır; empedans, yansıma ve elektromanyetik uyumluluk tasarımın göbeğine oturur. Elektronik mühendisi, atomun kuantum düzeylerinden bir yazılımın zamanlamasına kadar uzanan bu merdivenin her basamağında rahat eden kişidir.",
    ],
    topics: ["Yarı iletken fiziği ve bant teorisi", "Küçük sinyal modelleri", "İşaretler ve sistemler, Bode diyagramları", "Kontrol teorisi ve kararlılık", "Sayısal tasarım ve HDL", "Gömülü sistemler ve RTOS", "Sinyal bütünlüğü ve EMC"],
  },
  quiz: [
    {
      question: "Sayfadaki eviren op-amp devresinde (R<sub>in</sub> = 10 kΩ, R<sub>f</sub> = 20 kΩ) girişe +0.5 V verilirse çıkış kaç volt olur?",
      options: ["+1.0 V", "−1.0 V", "−2.0 V", "+0.25 V"],
      answer: 1,
      explanation: "Kazanç −R_f/R_in = −20/10 = −2; çıkış −2 × 0.5 = −1.0 V. Eksi işaret evirmeyi gösterir: giriş yükselirken çıkış düşer. Evirmeyen devrede aynı giriş +1.5 V verirdi.",
    },
    {
      question: "İki biti toplayan yarım toplayıcıda toplamın birler basamağını hangi kapı verir?",
      options: ["AND", "OR", "XOR", "NAND"],
      answer: 2,
      explanation: "XOR yalnızca girişlerden tam biri 1 iken 1 verir: 0+1 = 1, 1+0 = 1, ama 1+1 = 0 (elde 1). Elde bitini AND verir. Sayfada A ve B'nin dört durumunu dolaşarak tabloyu doğrulayabilirsin.",
    },
    {
      question: "Bir NPN transistörün baz akımı 50 µA ve β = 200 ise kolektör akımı yaklaşık kaçtır (transistör doymada değil)?",
      options: ["0.25 mA", "4 mA", "10 mA", "50 mA"],
      answer: 2,
      explanation: "I_C = β·I_B = 200 × 50 µA = 10.000 µA = 10 mA. Mikroamperleri miliampere çevirmeyi unutma. Bu akımı sağlayan baz değil, kolektör devresindeki besleme kaynağıdır.",
    },
  ],
  next: [
    { href: "mantik-devresi.html", title: "Mantık Devresi Tasarımcısı", why: "Burada tek satırda okuduğun kapıları kendin bağla; gerçek bir flip-flop ve toplayıcı kur." },
    { href: "elektronik-devre.html", title: "RC Devresi", why: "Her çipin içindeki zamanlayıcı: kondansatörün dolma eğrisi ve saat darbelerinin kaynağı." },
    { href: "elektrik-muhendisligi.html", title: "Elektrik Mühendisliği", why: "Çipin dışındaki dünya: güç, motorlar, şebeke ve bu küçük sinyallerin yönettiği büyük enerji." },
    { href: "bilgisayar-sistemleri-ve-mimarisi.html", title: "Bilgisayar Sistemleri ve Mimarisi", why: "Yarım toplayıcıdan işlemciye: kapıların nasıl bir bilgisayara örüldüğü." },
  ],
  sources: [
    { title: "OpenStax · University Physics Vol. 3 (Bölüm 9: Condensed Matter Physics)", url: "https://openstax.org/details/books/university-physics-volume-3", note: "Bant teorisi, katkılama, PN eklemi ve transistörün fiziksel temeli (İngilizce, açık ders kitabı)." },
    { title: "Vikipedi · Transistör", url: "https://tr.wikipedia.org/wiki/Transist%C3%B6r", note: "1947 keşfi, BJT ve MOSFET türleri, tarihçe ve kullanım alanları." },
    { title: "Wikipedia · Operational amplifier", url: "https://en.wikipedia.org/wiki/Operational_amplifier", note: "Altın kurallar, eviren/evirmeyen devreler, 741'in tarihi ve gerçek op-amp sınırları." },
    { title: "MIT OpenCourseWare · 6.002 Circuits and Electronics", url: "https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/", note: "Üniversite birinci sınıf düzeyinde devre ve elektronik dersi; video dersler ve problem setleri." },
  ],
  revision: "Ekim 2026",
};
