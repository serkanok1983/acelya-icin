window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["elektronik-muhendisligi"] = {
  slug: "elektronik-muhendisligi",
  title: "Analog Elektronik: Kum Tanesinden Yükseltece",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir kum tanesine birkaç yabancı atom karıştır: önce akımı tek yöne geçiren bir kapı, sonra işareti iki yüz kat büyüten bir yükselteç çıkar. Dört analog devrede el hesabını ölçümle yarıştır.",
  hook:
    "1946'da tanıtılan ENIAC, 17 468 vakum tüpüyle 150 kilowatt yakıyordu; mühendisleri arıza sıklığını ancak iki günde bir yanan tüpe indirebildi. Ertesi yıl iki fizikçi, bir germanyum parçasına iki altın temas bastırıp tüpün işini ısıtıcısız bir kristalde yaptı. Bir kaya parçası nasıl hem akımı tek yöne geçirir, hem de bir milivoltluk işareti iki yüz katına büyütür?",
  bigIdea:
    "Elektroniğin tamamı tek bir numaraya dayanır: <strong>küçük bir sinyalle büyük bir akımı yönetmek</strong>. Diyot akıma yön verir, transistör onu bir musluk gibi kısar ya da açar; negatif geri besleme de bu huysuz musluğu, kazancı iki direncin oranına bağlı hassas bir yükseltece çevirir.",
  story: [
    "16 Aralık 1947'de Bell Laboratuvarları'nda John Bardeen ve Walter Brattain, bir germanyum kristalinin üstüne plastik bir kamaya sarılmış altın folyoyla iki temas bastırdı ve girişteki küçük sinyalin çıkışta büyüdüğünü gördü: ilk <strong>transistör</strong>. Adı, 'transfer' ve 'rezistör' sözcüklerinden John Pierce koydu. Nokta temasları titizlik isteyen, kırılgan bir yapıydı. Grup lideri William Shockley birkaç hafta içinde çok daha sağlam bir fikir geliştirdi: iki PN eklemini sırt sırta koyan <em>eklem transistörü</em>. Çalışan örnekleri 1950'de yapıldı, 1951'de duyuruldu; üçü 1956 Nobel Fizik Ödülü'nü paylaştı. O sırada vakum tüpü hâlâ elektroniğin kralıydı: ısıtılan bir flamandan kopan elektronları boşlukta yöneten, kırılgan, sıcak ve kısa ömürlü bir cam ampul. Transistör aynı işi katı bir kristalin içinde, ısıtıcısız ve çok daha küçük bir hacimde yapıyordu.",
    "Sorun kısa sürede değişti: transistör küçülmüş ve ucuzlamıştı, ama bir bilgisayar binlerce parçanın tek tek elle lehimlenmesini istiyordu; Bell'den Jack Morton buna 'sayıların tiranlığı' dedi. 1958 yazında Texas Instruments'a yeni giren Jack Kilby, tatil hakkı olmadığı için boş laboratuvarda tek başına kaldı ve transistörü, direnci ve kondansatörü aynı germanyum parçasının üstüne işledi. 12 Eylül 1958'de osiloskopta bir sinüs dalgası belirdi: ilk <strong>tümleşik devre</strong>. Birkaç ay sonra Fairchild'da Robert Noyce, Jean Hoerni'nin düzlemsel silisyum işlemini kullanarak bileşenleri çipin üstüne buharlaştırılmış alüminyum yollarla bağladı; bugünkü çiplerin atası budur. 1959–1960'ta yine Bell'de Mohamed Atalla ve Dawon Kahng, kapısı yalıtılmış transistörü, <strong>MOSFET</strong>'i yapıp gösterdi. 1965'te Gordon Moore, <em>Electronics</em> dergisinde çip başına bileşen sayısının her yıl ikiye katlandığını yazdı; 1971'de Intel'in 4004 işlemcisi 2300 transistörle çıktı.",
    "Elektroniğin öteki yarısı sayılarla değil, sürekli sinyallerle uğraşır; bu sayfanın konusu da odur. 1947'de John Ragazzini ve arkadaşları, toplama ve integral alma gibi matematik 'işlemlerini' yapan yükselteçlere <strong>işlemsel yükselteç</strong> adını verdi; bunlar analog bilgisayarların yapı taşıydı. Laboratuvarın üçüncü sekmesindeki 'Toplayıcı' ve 'İntegral alıcı' bağlantıları, adını o makinelerden alan işlemlerin ta kendisidir. 1968'de Fairchild'da David Fullagar'ın tasarladığı μA741, içine konan tek bir kondansatörle geri besleme altında kararlı kalan op-amp'ların ilk yaygın örneği oldu ve yarım yüzyıl sonra hâlâ üretiliyor. Sayfanın 'tek kutuplu' yükselteç modeli, o kondansatörün yarattığı baskın kutbun matematikteki karşılığıdır. Transistörün yükselteç değil anahtar olarak kullanıldığı dijital dünyanın öyküsü ise Mantık Devreleri Laboratuvarı'nın defterinde anlatılır.",
  ],
  core: [
    {
      heading: "PN eklemi: akıma tek yön veren kapı",
      body:
        "Saf silisyumda her atom dört değerlik elektronunu dört komşusuyla paylaşır; serbest taşıyıcı azdır ve kristal zayıf bir iletkendir. Milyonda bir dolayında atomu beş değerlik elektronlu fosforla değiştirirsen serbest elektronlar artar (<strong>N-tipi</strong>); üç değerlik elektronlu borla değiştirirsen elektron eksikleri, yani <strong>boşluklar</strong> dolaşır (<strong>P-tipi</strong>). İkisi yan yana gelince sınırda elektronlar boşluklara dolar ve taşıyıcısız ince bir <strong>boşaltım bölgesi</strong> oluşur. P tarafına artı gerilim verirsen bu bölge daralır ve akım geçer; ters çevirirsen genişler ve akım durur. Akım gerilimle doğrusal değil, üstel büyür: n = 1 için akımı on katına çıkaran artış V<sub>T</sub>·ln 10'dur; sayfa bunu 27 °C'ta 59.56 mV olarak ölçer. 'Eşik 0.7 V' sözü, silisyumda akımın miliamper düzeyine vardığı yeri anlatır; germanyumda bu yaklaşık 0.3 V, bir LED'de 1.8–3.3 V'tur. Sayfanın 'Schottky benzeri' öğretim diyodu aynı 5 V, 1 kΩ devresinde 230.0 mV'ta dengelenir: 0.7 bir doğa sabiti değil, I<sub>s</sub> ile n'nin sonucudur. Denklemin türevi, diyodun küçük sinyallere gösterdiği <strong>dinamik direnci</strong> verir: r<sub>d</sub> = dV/dI ≈ nV<sub>T</sub>/I. 1 mA'de yaklaşık 26 Ω, varsayılan 4.307 mA'de 6.005 Ω; diyot sabit bir direnç değil, çalışma noktasına göre değişen bir eğimdir.",
      formula: "I = I<sub>s</sub>·(e<sup>V/(nV<sub>T</sub>)</sup> − 1),   V<sub>T</sub> = kT/q ≈ 26 mV",
      formulaNote: "Shockley diyot denklemi. I_s doyma akımı, k Boltzmann sabiti, T mutlak sıcaklık, q elektron yükü; 27 °C'ta V_T = 25.86 mV. n ideallik katsayısı 1–2 arasındadır. Yüksek akımda gövde direnci, ters yönde kırılma ve hızlı işaretlerde eklem sığası bu modelin dışında kalır; sayfa da onları içermez.",
    },
    {
      heading: "Yük doğrusu: üstel eğriyle doğrunun kesiştiği yer",
      body:
        "Diyodu bir kaynağa dirençle seri bağladığında iki denklem aynı anda sağlanmalıdır: diyodun üstel eğrisi ve Kirchhoff'un gerilim yasası, V<sub>s</sub> = I·R + V<sub>D</sub>. İkincisi I–V düzleminde bir doğrudur (<strong>yük doğrusu</strong>); devrenin gerçekten oturduğu <strong>çalışma noktası</strong> ikisinin kesişimidir. Bu denklem temel fonksiyonlarla çözülemez; sayfa Newton yöntemiyle teğeti izleyerek beş yinelemede 692.9 mV ve 4.307 mA bulur. El hesabı aynı işi tek satırda yapar: V<sub>D</sub> ≈ 0.7 V varsay, I ≈ (V<sub>s</sub> − 0.7 V)/R. Bu kestirme neden bu kadar iyi tutar? Çünkü diyot gerilimi akımın logaritmasıdır, V<sub>D</sub> = nV<sub>T</sub>·ln(I/I<sub>s</sub> + 1); akım on kat değişse V<sub>D</sub> yalnızca 60 mV kadar oynar. Kuralın akımda yaptığı bağıl hata (0.7 V − V<sub>D</sub>)/(V<sub>s</sub> − V<sub>D</sub>) kadardır: paydadaki, dirence kalan gerilimdir. 5 V'luk devrede 7.1 mV'luk yanlış 4.307 V'a bölünür ve %0.17 eder; 1 V'luk devrede 70.6 mV'luk yanlış 370.6 mV'a bölünür ve %19'a çıkar. Kural, kaynak gerilimi diyot düşümünden çok büyükken güvenilirdir.",
      formula: "V<sub>s</sub> = I·R + V<sub>D</sub>   ·   0.7 V modeli: I ≈ (V<sub>s</sub> − 0.7 V)/R",
      formulaNote: "V_s kaynak gerilimi, R seri direnç, V_D diyot gerilimi. Kesin çözüm Lambert W fonksiyonuyla yazılabilir; uygulamada Newton yinelemesi ya da yük doğrusu çizimi kullanılır.",
    },
    {
      heading: "Transistörlü yükselteç: kazancı akım belirler, direnç dizginler",
      body:
        "NPN transistör, N-P-N dizilmiş iki PN eklemidir; ortadaki ince P katmanı <strong>baz</strong>dır. Baz–emetör eklemini ileri yönde açtığında emetörden çıkan elektronların büyük çoğunluğu incecik bazı geçip kolektöre ulaşır; ileri aktif bölgede kolektör akımı baz akımının <strong>β</strong> katıdır. Yükseltmenin kaynağı ise yine o üstel eğridir: I<sub>C</sub> ≈ I<sub>s</sub>·e<sup>V<sub>BE</sub>/V<sub>T</sub></sup>. Türevini al: <strong>geçiş iletkenliği</strong> g<sub>m</sub> = dI<sub>C</sub>/dV<sub>BE</sub> = I<sub>C</sub>/V<sub>T</sub>. Bazdaki küçük bir v<sub>g</sub> değişimi kolektör akımını g<sub>m</sub>·v<sub>g</sub> kadar değiştirir; bu akım R<sub>C</sub>'den geçerken çıkış −g<sub>m</sub>·R<sub>C</sub>·v<sub>g</sub> olur. Sayfanın varsayılan katında I<sub>C</sub> = 1.378 mA, g<sub>m</sub> = 1.378 mA / 25.86 mV = 53.28 mS ve kazanç −53.28 mS × 3.9 kΩ = −207.8'dir. Kazanç böylece çalışma akımına, o da sıcaklığa ve parçaya bağlıdır. Emetöre bir R<sub>E</sub> koyup köprüleme kondansatörünü sökersen akımdaki her artış emetör gerilimini yükseltip V<sub>BE</sub>'yi kısar: negatif geri besleme. Kazanç −g<sub>m</sub>R<sub>C</sub>/(1 + g<sub>m</sub>R<sub>E</sub>(1 + 1/β)) = −3.809'a iner ve dirençlerin oranına, −R<sub>C</sub>/R<sub>E</sub> = −3.9'a yaklaşır. Üstel eğrinin bedeli de vardır: seriye açınca ikinci harmoniğin temel bileşene oranı v<sub>g</sub>/(4V<sub>T</sub>) çıkar; 1 mV'luk girişte %0.967, 10 mV'ta yaklaşık %10.",
      formula: "g<sub>m</sub> = I<sub>C</sub>/V<sub>T</sub>   ·   A<sub>v</sub> = −g<sub>m</sub>·R<sub>C</sub>   ·   C<sub>E</sub> yokken A<sub>v</sub> ≈ −R<sub>C</sub>/R<sub>E</sub>",
      formulaNote: "Orta bant küçük sinyal kazancı; v_g ≪ V_T iken geçerlidir. β birimsiz bir orandır ve parçadan parçaya değişir; iyi tasarım onun tam değerine güvenmez. Sayfanın transistörü öğretim değerleriyle (I_s = 10 fA, β_R = 2) kurulmuş Ebers–Moll modelidir: Early etkisi, eklem sığaları ve gövde dirençleri yoktur, bu yüzden gerçek bir katta kazanç daha düşük ve frekansa bağlı çıkar.",
    },
    {
      heading: "Op-amp ve negatif geri besleme: altın kurallar ve bedeli",
      body:
        "İşlemsel yükselteç iki girişi arasındaki farkı devasa bir sayıyla çarpar; 741'de bu açık çevrim kazancı tipik olarak 200 000 dolayındadır. Tek başına işe yaramaz: birkaç mikrovoltluk fark çıkışı raya yapıştırır. Numara, çıkışın bir parçasını eksi girişe geri yollamaktır. O zaman iki kural doğar: girişler akım çekmez ve çıkış, iki girişi <strong>eşitleyene</strong> kadar hareket eder. Eviren devrede artı giriş topraktadır; eksi giriş 'sanal toprak' olur, v<sub>g</sub>/R1 akımı yalnızca R<sub>f</sub>'den geçebilir ve çıkış −(R<sub>f</sub>/R1)·v<sub>g</sub> olur. Kesin ifade için A'yı sonlu al: çıkıştan eksi girişe dönen kesir β = R1/(R1 + R<sub>f</sub>) ise kazanç G = G<sub>ideal</sub>/(1 + 1/(Aβ)) olur: hata, <strong>çevrim kazancı</strong> Aβ'nın tersi kadardır. Varsayılanda A₀β = 9091, kazanç −10.00 yerine −9.999'dur. A frekansla da düşer. Tek kutuplu modelde A(f) = A₀/(1 + j·f/f<sub>p</sub>) ve f<sub>p</sub> = GBW/A₀'dır; bunu G'de yerine koyunca kapalı çevrim yine tek kutuplu çıkar; −3 dB frekansı f<sub>p</sub>·(1 + A₀β) ≈ GBW·β olur. Yaygın 'bant = GBW/|G|' kuralı, 1/β kazanca eşitken, yani evirmeyen katta tutar. Eviren katta 1/β = 1 + |G|'dir (gürültü kazancı): −10 kazançlı katın bandı 100.0 kHz değil, 1 MHz/11 = 90.92 kHz'tir. Sayfa kaba kuralı, hatasıyla (+9.99 %) birlikte kesin değerin yanında gösterir.",
      formula: "G = G<sub>ideal</sub> / (1 + 1/(A₀β))   ·   f<sub>−3dB</sub> = f<sub>p</sub>·(1 + A₀β) ≈ GBW·β",
      formulaNote: "A₀ doğru akımdaki açık çevrim kazancı, β geri besleme kesri, GBW = A₀·f_p kazanç–bant genişliği çarpımı. Eviren: G_ideal = −R_f/R1; evirmeyen: 1 + R_f/R1. Kurallar yalnızca negatif geri besleme varken ve çıkış raylara dayanmamışken geçerlidir. Sayfanın modelinde yükselme hızı sınırı, giriş kayma gerilimi ve ikinci kutup yoktur.",
    },
    {
      heading: "Süzgeç: −3 dB noktası, zaman sabiti ve Q",
      body:
        "Bir direnç ile bir kondansatör frekansa bağlı bir gerilim bölücüdür: kondansatörün empedansı 1/(jωC), frekans yükseldikçe küçülür. Çıkışı kondansatörden alırsan H(jω) = 1/(1 + jωRC) bulursun: bir <strong>alçak geçiren süzgeç</strong>. <strong>Kesim frekansı</strong> f<sub>c</sub> = 1/(2πRC), iki empedansın büyüklükçe eşitlendiği yerdir; orada çıkış 1/√2 ≈ 0.7071'e (−3 dB), güç yarıya iner ve faz 45° kayar. Bunun çok üstünde |H| ≈ f<sub>c</sub>/f olur: frekans on katına çıkınca genlik onda bire, yani 20 dB düşer. Aynı RC çarpımı zaman bölgesinde basamak yanıtının %63.2'ye varma süresidir; sayfa τ'yu basamaktan (100.0 µs), f<sub>c</sub>'yi frekans taramasından (1.592 kHz) ayrı ayrı ölçer ve ikisi 1/(2πτ) bağıntısıyla aynı sayıyı verir. Araya bir bobin girince devre ikinci dereceden olur. Seri RLC'de rezonansta, f₀ = 1/(2π√(LC)), bobin ile kondansatörün gerilimleri birbirini götürür ve kaynak yalnızca R'yi görür. <strong>Kalite katsayısı</strong> Q = (1/R)·√(L/C) büyüdükçe geçirilen bant daralır, Δf = f₀/Q, ama basamak yanıtı daha uzun çınlar: zarfın zaman sabiti 2L/R = Q/(π·f₀). Keskin seçicilik ile hızlı yerleşme aynı anda elde edilemez. Geri beslemeli op-amp'ın kapalı çevrim yanıtı da aynı tek kutuplu biçimdedir.",
      formula: "H(jω) = 1/(1 + jωRC),  f<sub>c</sub> = 1/(2πRC)   ·   Q = (1/R)·√(L/C),  Δf = f₀/Q",
      formulaNote: "R ohm, C farad, L henry, f hertz. Kaynak iç dirençsiz, çıkış yüksüz ve elemanlar ideal sayılır; gerçek bobinin sargı direnci Q'yu düşürür, çıkışa bağlanan yük kesim frekansını kaydırır.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar dört sekmedir: <strong>01 · Diyot ve doğrultucu</strong> (üstte A bölümü diyot ve yük doğrusu, altta B bölümü doğrultucu), <strong>02 · Transistörlü yükselteç</strong>, <strong>03 · İşlemsel yükselteç</strong> ve <strong>04 · Süzgeçler</strong>. Her kart, sayısal çözümden ya da zaman bölgesi benzetiminden <em>ölçülen</em> değeri üstte, el formülünün verdiği kuram değerini ve aradaki farkı alt satırda gösterir; 'fark', (ölçülen − kuram)/|kuram| oranıdır. Diyot ve transistör kartlarında karşılaştırılan şey 0.7 V'luk el hesabıdır ve fark, el hesabının çözümden sapmasıdır. Dirençler, kondansatörler ve bobinler E12 dizisinden seçilir; sayılar ondalık noktayla ve dört anlamlı basamakla yazılır. Her sekmede hazır durum düğmeleri ve <strong>Sekmeyi sıfırla</strong> vardır; <kbd>R</kbd> tuşu da açık sekmeyi sıfırlar. Modelin sınırlarını akılda tut: elemanlar ve kaynaklar idealdir (parazitik sığa ve endüktans, gürültü, tolerans, ısınma, kaynak iç direnci yok); hazır diyotlar ve transistör parametreleri bir ürünün katalog verisi değil, öğretim değerleridir; diyot yalnızca Shockley denklemidir, transistör Early etkisiz Ebers–Moll modelidir, işlemsel yükselteç tek kutupludur. Buradaki sayılar bir tasarımın ilk kestirimi içindir; gerçek devre için veri sayfası ve tam bir SPICE modeli gerekir.",
    experiments: [
      {
        title: "0.7 V kuralı ne zaman yanıltır?",
        predict:
          "5 V'luk kaynak, 1 kΩ direnç ve bir diyot: el hesabı (5 − 0.7) V / 1 kΩ = 4.300 mA der. Gerçek akım bundan ne kadar farklıdır? Kaynağı 1.0 V'a, sonra 0.5 V'a indirirsen kural hâlâ tutar mı? Eklem 50 °C ısınırsa diyot gerilimi artar mı, azalır mı?",
        do: "<strong>01 · Diyot ve doğrultucu</strong> sekmesinin A bölümünde varsayılan değerlerle başla ve kartları oku. <strong>Kaynak gerilimi V<sub>s</sub></strong> kaydırıcısını 1.0 V'a, sonra 0.5 V'a getir. Yeniden 5.0 V yap ve <strong>Eklem sıcaklığı</strong>nı 77 °C'a çıkar. Son olarak sıcaklığı 27 °C'a döndür ve <strong>Akım ekseni</strong> menüsünden <strong>Logaritmik (ileri yön)</strong> seçeneğini aç.",
        observe:
          "5.0 V: V<sub>D</sub> = 692.9 mV, I = 4.307 mA; alt satır '0.7 V modeli: 4.300 mA · fark −0.17 %' yazar ve Newton 5 yinelemede bitmiştir. 1.0 V: V<sub>D</sub> = 629.4 mV, I = 370.6 µA; model 300.0 µA der (fark −19.04 %); r<sub>d</sub> = 69.80 Ω, dV<sub>D</sub>/dT = −1.860 mV/K. 0.5 V: model 0 A der, çözüm 2.276 µA bulur; durum satırı fark yüzdesinin neden yazılmadığını açıklar. 5.0 V ve 77 °C: V<sub>D</sub> 610.0 mV'a düşer; V<sub>T</sub> 25.86 mV'tan 30.17 mV'a, I<sub>s</sub> 10 fA'den 7.280 pA'e çıkar; dV<sub>D</sub>/dT kartı −1.686 mV/K gösterir. Logaritmik eksende eğri doğruya döner; 'Akımı on katına çıkaran gerilim artışı' kartı 27 °C'ta 59.56 mV yazar.",
        explain:
          "Diyot gerilimi akımın logaritmasıdır; miliamper düzeyinde hep 0.6–0.7 V dolayında kalır. Hatayı büyüten, dirence kalan gerilimin küçülmesidir: aynı yanlış 5 V'luk devrede 4.3 V'a, 1 V'luk devrede 0.37 V'a bölünür. 0.5 V'ta 'akım yok' demek düpedüz yanlıştır: üstel eğrinin dirseği yoktur. Eklem ısınınca V<sub>T</sub> büyür, ama I<sub>s</sub> 728 katına çıkar ve gerilim düşer: sabit akımda dV<sub>D</sub>/dT = (V<sub>D</sub> − 3V<sub>T</sub> − 1.11 V)/T. Kitaplardaki 'yaklaşık −2 mV/K' daha küçük akımlar içindir. Logaritmik eksendeki eğim n·V<sub>T</sub>·ln 10'dur: n böyle ölçülür.",
      },
      {
        title: "Kazancı kim belirliyor: transistör mü, dirençler mi?",
        predict:
          "Varsayılan katta R<sub>C</sub> = 3.9 kΩ ve R<sub>E</sub> = 1 kΩ. Köprüleme kondansatörü C<sub>E</sub> bağlıyken kazanç −R<sub>C</sub>/R<sub>E</sub> = −3.9 mu olur, çok daha büyük mü? β'yı 200'den 100'e indirmek kazancı C<sub>E</sub> varken mi, yokken mi daha çok değiştirir? Girişi 1 mV'tan 10 mV'a çıkarırsan çıkış aynı biçimde on kat mı büyür?",
        do: "<strong>02 · Transistörlü yükselteç</strong> sekmesinde varsayılan kartları oku. <strong>Akım kazancı β</strong> kaydırıcısını 100 yap ve kazancı not et. <strong>Emetör köprüleme kondansatörü C<sub>E</sub> bağlı</strong> kutusunun işaretini kaldır; β'yı yeniden 200'e getirip iki kazancı karşılaştır. <strong>Sekmeyi sıfırla</strong>'ya bas, <strong>Giriş genliği (tepe)</strong> kaydırıcısını 10 mV'a getir; ardından <strong>Girişi büyüt</strong> düğmesine bas.",
        observe:
          "Varsayılan (C<sub>E</sub> bağlı, β = 200): I<sub>C</sub> = 1.378 mA (el hesabı 1.343 mA, fark −2.54 %), g<sub>m</sub> = 53.28 mS, kazanç −207.8, bozulma 0.967 %. β = 100: I<sub>C</sub> = 1.321 mA, kazanç −199.2. C<sub>E</sub> yokken: β = 100 için −3.788, β = 200 için −3.809; bozulma 0.000 %. 10 mV giriş (C<sub>E</sub> bağlı): kazanç −211.7, bozulma 9.63 %, 2. harmonik 9.61 % (kuram 9.67 %), tepeler +1.723 V / −2.537 V. Girişi büyüt (100 mV): temel bileşenin kazancı −64.61'e düşer, bozulma 31.83 % olur; V<sub>C</sub> 1.397 V ile 11.89 V arasında kalır ve durum satırı alt tepenin doymayla düzleştiğini yazar.",
        explain:
          "C<sub>E</sub> emetörü işaret için toprağa bağlar; kazanç −g<sub>m</sub>R<sub>C</sub> olur ve g<sub>m</sub> = I<sub>C</sub>/V<sub>T</sub> üzerinden çalışma akımına bağlanır: β yarıya inince akımla birlikte %4 düşer. C<sub>E</sub> sökülünce R<sub>E</sub> işareti de geri besler: kazanç yaklaşık 55 kat küçülür, ama β'ya duyarlılığı %0.6'ya iner ve bozulma kaybolur. Negatif geri besleme kazançtan alır, kararlılık ve doğrusallık verir. 10 mV'ta kırpılma yoktur; tepeleri eşitsiz kılan, üstel I<sub>C</sub>(V<sub>BE</sub>) eğrisidir ve ikinci harmonik v<sub>g</sub>/(4V<sub>T</sub>) kuralına uyar. 100 mV'ta çıkış doymaya çarpar; küçük sinyal kazancı artık çıkışı tarif etmez.",
      },
      {
        title: "Altın kuralların bedeli: kazanç ve bant genişliği",
        predict:
          "R1 = 1 kΩ, R<sub>f</sub> = 10 kΩ, GBW = 1 MHz. Eviren kat −10, aynı dirençlerle evirmeyen kat +11 kazanç verir: hangisinin bandı daha geniştir? 'Bant = GBW/kazanç' kuralı ikisi için ne söyler? Açık çevrim kazancı 100 dB'den 20 dB'ye, yani yalnızca 10 kata düşerse −10 hâlâ −10 mudur?",
        do: "<strong>03 · İşlemsel yükselteç</strong> sekmesinde varsayılan <strong>Eviren yükselteç</strong> ile başla; '−3 dB bant genişliği' ve 'Kaba kural GBW/|G|' kartlarını oku. <strong>Bağlantı</strong> menüsünden <strong>Evirmeyen yükselteç</strong>'i seç ve aynı iki kartı karşılaştır. Yeniden Eviren'e dön ve <strong>f ≈ bant kenarı</strong> düğmesine bas. <strong>Sekmeyi sıfırla</strong>'ya, ardından <strong>A₀ = 20 dB</strong> düğmesine bas.",
        observe:
          "Eviren: genlik oranı 9.998; ideal kazanç −10.00, sonlu A₀ ile −9.999; bant 90.92 kHz (kuram 90.92 kHz). Kaba kural kartı 100.0 kHz ve 'ölçülenden fark +9.99 % · gürültü kazancı 1/β = 11.00' yazar. Evirmeyen: oran 11.00, bant yine 90.92 kHz; kaba kural 90.91 kHz (fark −0.01 %). Eviren, bant kenarı (91.20 kHz): oran 7.059, faz 134.9°. A₀ = 20 dB: oran 4.762; ideal −10.00, sonlu A₀ ile −4.762; bant 190.9 kHz; çevrim kazancı A₀β = 0.9091.",
        explain:
          "İki katın geri besleme ağı aynıdır, β = 1/11; bant f<sub>p</sub>·(1 + A₀β) = 10 Hz × 9092 = 90.92 kHz'tir ve kazancın −10 mu +11 mi olduğuna bakmaz. 'GBW/|G|' kuralı evirmeyen katta 1/β = G olduğu için tutar; evirende 1/β = 1 + |G| = 11'dir ve kural bandı %10 fazla söyler. 91.20 kHz'te oran 9.999/√2 dolayına iner, çıkış 45° daha gecikir: bir RC süzgeçle aynı tek kutup. A₀ = 10 iken çevrim kazancı 1'in altındadır ve G = −10/(1 + 1/0.9091) = −4.762 olur. Değişmeyen, çarpımdır: 9.999 × 90.92 kHz ve 4.762 × 190.9 kHz, ikisi de 909.1 kHz. Geri besleme kazancı bantla takas eder.",
      },
      {
        title: "−3 dB'nin iki yüzü ve Q'nun bedeli",
        predict:
          "1 kΩ ve 100 nF'lık RC alçak geçiren süzgeçte kesim frekansı kaç hertzdir? Kesim frekansının on katında çıkış girişin kaçta biri olur? Aynı frekansta aynı iki elemanla kurulan yüksek geçiren ne kadarını geçirir? Bir RLC süzgecin bandını daralttığında basamak yanıtı kısalır mı, uzar mı?",
        do: "<strong>04 · Süzgeçler</strong> sekmesinde varsayılan <strong>RC alçak geçiren</strong> açıkken kartları oku; giriş frekansı 1.585 kHz'tir. <strong>f ≈ 10·f_c</strong> düğmesine bas. <strong>Süzgeç</strong> menüsünden <strong>RC yüksek geçiren</strong>'i seç; frekans yerinde kalır. Sonra <strong>Dar bant RLC</strong> düğmesine bas ve basamak yanıtına bak; <strong>f ≈ üst −3 dB kenarı</strong> düğmesine bas. Son olarak <strong>Direnç R (E12)</strong> kaydırıcısını 10 kΩ'a getir.",
        observe:
          "Alçak geçiren, 1.585 kHz: oran 0.7086 (−2.99 dB), faz −44.9°; f<sub>c</sub> = 1.592 kHz, τ = 100.0 µs. 15.85 kHz: oran 0.09991 (−20.01 dB), faz −84.3°. Yüksek geçiren, aynı frekans: oran 0.9950 (−0.04 dB), faz 5.7°. Dar bant RLC (100 Ω, 100 mH, 10 nF): f₀ = 5.033 kHz, Q = 31.62, Δf = 159.2 Hz (kenarlar 4.95 kHz ve 5.11 kHz), çınlama frekansı 5.032 kHz, zarf 2.000 ms; 5.012 kHz'te oran 0.9671, faz 14.7°. Üst kenar (5.113 kHz): oran 0.7070 (−3.01 dB), faz −45.0°. R = 10 kΩ: Q = 0.3162, Δf = 15.92 kHz; çınlama kartı '—' ve 'aşırı sönümlü, salınım yok' yazar.",
        explain:
          "f<sub>c</sub> = 1/(2π × 1 kΩ × 100 nF) = 1.592 kHz; kaydırıcı 0.01 dekatlık adımlarla ilerlediğinden başlangıç frekansı 1.585 kHz'tir ve oran 0.7071 yerine 0.7086 çıkar. Bir dekat yukarıda çıkış onda bire iner: tek kutbun eğimi dekat başına 20 dB'dir. Alçak ve yüksek geçiren aynı bölücünün iki ucudur; karelerinin toplamı 1 eder. RLC'nin bant kenarında da oran 1/√2, faz 45°'dir. Δf = R/(2πL) = 159.2 Hz, zarf 2L/R = 2.000 ms; çarpımları R ne olursa olsun 1/π'dir: dar bant, uzun çınlama demektir. R 100 katına çıkınca Q 0.5'in altına iner ve salınım söner.",
      },
    ],
  },
  wow: [
    {
      title: "Bir yaz tatili, bir Nobel",
      body:
        "Jack Kilby 1958'de Texas Instruments'a yeni girdiği için yaz tatiline hak kazanmamıştı; herkes gidince boş laboratuvarda tek başına çalıştı ve 12 Eylül 1958'de bütün devreyi tek bir germanyum parçasına sığdırdı. Tümleşik devredeki payı için Nobel Fizik Ödülü'nü 2000 yılında, 42 yıl sonra paylaştı. Aynı fikre bağımsız ulaşan Robert Noyce 1990'da ölmüştü; Nobel ölenlere verilmez.",
    },
    {
      title: "1965'te yazılan tahmin, 2300'den 19 milyara",
      body:
        "Gordon Moore'un 19 Nisan 1965 tarihli yazısı, çip başına bileşen sayısının her yıl ikiye katlanacağını ve 1975'te 65 000'e varacağını öngörüyordu; Moore 1975'te bu süreyi iki yıla çekti. 1971'deki Intel 4004'te 2300 transistör vardı; Apple'ın 2023'teki A17 Pro işlemcisinde 19 milyar. Elli iki yılda yaklaşık sekiz milyon kat: 2²³ ≈ 8.4 milyon olduğundan bu, 23 katlama, yani ortalama 2.3 yılda bir ikiye katlanma demektir.",
    },
    {
      title: "Her diyot bir termometredir",
      body:
        "Sayfadaki diyodu 5 V ve 1 kΩ ile sürüp eklemi 27 °C'tan 77 °C'a ısıt: akım neredeyse aynı kalırken (4.307 mA'den 4.390 mA'e) diyot gerilimi 692.9 mV'tan 610.0 mV'a iner. Elli derecede 82.9 mV, yani derece başına yaklaşık 1.7 mV. Aynı aralıkta doyma akımı 10 fA'den 7.280 pA'e, 728 katına çıkar; gerilimi düşüren odur. Eğim neredeyse sabit olduğundan ucuz bir silisyum eklem, üzerinden sabit akım geçirilip gerilimi okunarak sıcaklık algılayıcısı olarak kullanılabilir.",
    },
  ],
  worked: {
    title: "Doğrultucuya süzgeç kondansatörü seçmek",
    prompt:
      "Tepe değeri 10.0 V olan 50 Hz'lik bir kaynak, yarım dalga doğrultucuyla R<sub>L</sub> = 1 kΩ'luk bir yükü besliyor. Çıkıştaki dalgalanmanın tepeden tepeye 0.4 V'u geçmemesi isteniyor. E12 dizisinden bir kondansatör seç, formülün varsayımlarını denetle ve sonucu sayfadaki benzetimle karşılaştır. Aynı kondansatörle köprü doğrultucuya geçilirse ne değişir?",
    steps: [
      "Tepe gerilimini ve yük akımını kestir: diyot iletirken yaklaşık 0.7 V düşürür, V<sub>tepe</sub> ≈ 10.0 − 0.7 = 9.300 V. Yük akımı I ≈ 9.300 V / 1 kΩ = 9.300 mA.",
      "Dalgalanma formülünü kur: diyot kapalıyken yükü yalnızca kondansatör besler, C·dV/dt = −I. Akım sabit sayılır ve boşalma bütün bir periyot (1/f) sürerse ΔV ≈ I/(f·C) olur. C ≥ I/(f·ΔV) = 9.300 mA / (50 Hz × 0.4 V) = 465 µF; E12'de bir üstü 470 µF. Bu değerle ΔV ≈ 9.300 mA / (50 Hz × 470 µF) = 395.7 mV.",
      "Varsayımı denetle: 'akım sabit' demek, dalgalanmanın tepe gerilime göre küçük olması demektir; ölçütü f·R<sub>L</sub>·C = 50 × 1000 × 470×10⁻⁶ = 23.50 ≫ 1. Üstel boşalmayı kesin alırsan V<sub>tepe</sub>·(1 − e<sup>−1/23.5</sup>) = 9.300 V × 0.04166 = 387.4 mV: doğrusal yaklaşım yalnızca %2 fazla veriyor.",
      "Benzetimle karşılaştır: sayfada <strong>01 · Diyot ve doğrultucu</strong> sekmesinin B bölümü bu değerlerle açılır ve ΔV = 361.0 mV ölçer (kuram 395.7 mV, fark −8.77 %). Kalan farkın iki kaynağı durum satırında yazar: kondansatör 20 ms değil 18.82 ms boşalır, çünkü periyodun 1.180 ms'si dolmaya gider; ortalama akım da 9.300 mA değil 9.071 mA'dir. Bu iki ölçümle I<sub>ort</sub>·t<sub>boş</sub>/C = 9.071 mA × 18.82 ms / 470 µF = 363.2 mV, ölçülenin %0.61 yakınında. Formül bu devrede güvenli taraftadır: dalgalanmayı büyük tahmin eder.",
      "Diyodun yükünü gör, sonra köprüye geç: bir periyotta yüke giden 9.071 mA × 20 ms ≈ 181 µC'luk yük, kondansatöre yalnızca kısa dolma aralığında girebilir; sayfa diyot tepe akımını 320.0 mA, ortalama yük akımının 35.28 katı ölçer. <strong>Devre</strong> menüsünden <strong>Tam dalga (köprü, dört diyot)</strong> seçilirse kondansatör periyotta iki kez dolar (m = 2) ama akım yolunda iki diyot vardır: V<sub>tepe</sub> ≈ 10.0 − 1.4 = 8.600 V, ΔV ≈ 8.600 mA / (2 × 50 Hz × 470 µF) = 183.0 mV. Sayfa 155.4 mV ölçer; diyot tepe akımı 139.6 mA'e iner.",
    ],
    result:
      "470 µF yeterlidir: el formülü 395.7 mV, benzetim 361.0 mV verir. Köprü dalgalanmayı yarıdan fazla azaltır (155.4 mV) ama çıkıştan bir diyot düşümü daha götürür. Diyot tepe akımındaki 320.0 mA gerçek bir devre için üst sınırdır: sayfanın kaynağı iç dirençsizdir, gerçek bir transformatörün sargı direnci ve kaçak endüktansı bu darbeyi yayar ve alçaltır.",
  },
  misconceptions: [
    {
      myth: "Transistör akımı büyütür; yani girişteki enerjiyi çoğaltır.",
      truth:
        "Transistör bir musluktur, pompa değil. Kolektördeki büyük akım ve enerji besleme kaynağından gelir; baz sinyali yalnızca musluğu ne kadar açacağını söyler. Sayfadaki katta çıkışın V<sub>CC</sub>'yi aşamaması ve büyük girişte kırpılması bunun görünen yüzüdür: çıkış gücü girişten yaratılmaz, kaynaktan alınır.",
    },
    {
      myth: "Silisyum diyot 0.7 V'un altında hiç iletmez, üstünde serbestçe iletir.",
      truth:
        "Diyot akımı gerilimle üstel büyür; keskin bir duvar yoktur. 0.7 V, akımın miliamper düzeyine geldiği yerdir. Her 60 mV geriye gidişte akım on kat düşer (n = 1): 0.5 V'ta hâlâ akım vardır, yalnızca 0.7 V'takinin iki binde biri kadar. Sayfada 0.5 V'luk kaynak 1 kΩ üzerinden 2.276 µA sürer. 'Eşik' bir doğa yasası değil, pratik bir kısaltmadır.",
    },
    {
      myth: "Dirençler kazancı 10 yapınca op-amp çipi de 10 kat yükseltiyordur.",
      truth:
        "Çipin kendisi hâlâ yüz bin kat ve fazlasını yükseltir. Negatif geri besleme, çıkışın bir parçasını eksi girişe yollayarak iki giriş arasındaki farkı neredeyse sıfıra çeker; görünen kazanç dirençlerin oranı olur. Çipin kazancı büyüdükçe sonuç dirençlere daha da sadık kalır. Tersini sayfada görürsün: A₀'ı 10'a indirdiğinde aynı iki direnç −10 değil −4.762 verir.",
    },
    {
      myth: "Kesim frekansı, süzgecin işareti kestiği frekanstır; altı tam geçer, üstü hiç geçmez.",
      truth:
        "Tek kutuplu bir süzgeçte geçiş yumuşaktır. Kesim frekansında çıkış hâlâ girişin %70.7'sidir; on katında %10'u, yüz katında %1'i geçer. Eğim dekat başına yalnızca 20 dB'dir. Daha dik bir geçiş için daha yüksek dereceli süzgeç gerekir; bedeli, RLC deneyinde gördüğün çınlamadır.",
    },
  ],
  glossary: [
    { term: "Boşaltım bölgesi", definition: "P ve N bölgelerinin sınırında hareketli taşıyıcıların tükendiği ince katman; ileri gerilimde daralır, ters gerilimde genişler." },
    { term: "Isıl gerilim (V<sub>T</sub>)", definition: "kT/q oranı; 27 °C'ta 25.86 mV'tur ve diyot ile transistör denklemlerindeki üstelin ölçeğini belirler." },
    { term: "Çalışma noktası (Q noktası)", definition: "İşaret yokken devrenin oturduğu doğru akım ve gerilim değerleri; eleman eğrisi ile yük doğrusunun kesişimidir." },
    { term: "Dalgalanma (ΔV)", definition: "Doğrultucu çıkışındaki gerilimin, kondansatörün dolup boşalması yüzünden tepeden tepeye yaptığı değişim." },
    { term: "Geçiş iletkenliği (g<sub>m</sub>)", definition: "Kolektör akımındaki değişimin onu doğuran baz–emetör gerilimi değişimine oranı; I<sub>C</sub>/V<sub>T</sub>'ye eşittir, birimi siemenstir." },
    { term: "Negatif geri besleme", definition: "Çıkışın bir kısmını girişe ters yönde geri yollayarak sistemi dengeye zorlama; kazancı eleman oranlarına bağlar, karşılığında kazançtan harcar." },
    { term: "Kesim frekansı (f<sub>c</sub>)", definition: "Çıkış genliğinin geçirme bandındaki değerinin 1/√2'sine, yani −3 dB'ye indiği frekans; RC süzgeçte 1/(2πRC)." },
    { term: "Kalite katsayısı (Q)", definition: "Rezonans frekansının −3 dB bant genişliğine oranı; büyüdükçe süzgeç daha seçici olur ve daha uzun çınlar (çalışma noktasındaki Q ile ilgisi yoktur)." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede diyot 'tek yönlü geçit', transistör 'yükselteç'tir; üniversitede ikisi de <strong>katıhal fiziği</strong>nden türetilir: silisyumda elektronların geçmesi gereken yaklaşık 1.1 elektronvoltluk bant aralığı, katkı atomlarının bu aralığa yerleştirdiği enerji düzeyleri ve Shockley denklemindeki üstel ifadeyi doğuran Boltzmann dağılımı. Elektronik I dersinde transistörün çalışma noktası çevresindeki küçük sinyal modeli kurulur; sayfadaki r<sub>d</sub> = nV<sub>T</sub>/I ve g<sub>m</sub> = I<sub>C</sub>/V<sub>T</sub> bunun ilk iki örneğidir. İşaretler ve Sistemler dersinde yükselteç ve süzgeç birer transfer fonksiyonuna dönüşür; frekansa göre davranışları Fourier ile Laplace dönüşümleriyle, kutuplar ve Bode diyagramlarıyla incelenir. Kontrol teorisi de aynı negatif geri beslemeyi ele alır, ama bir uyarıyla: geri beslenen sinyal çok gecikirse yükselteç osilatöre dönüşür. 741'in içindeki o tek kondansatör tam bu tehlikeye karşı konmuştur.",
      "Bu sayfanın bilerek dışarıda bıraktığı her ayrıntı, sonraki derslerin bir başlığıdır. Early etkisi transistöre sonlu bir çıkış direnci kazandırır ve tek katın kazancına üst sınır koyar. Eklem sığaları hibrit-π modeline girer ve yükseltecin üst kesim frekansını belirler; sayfadaki 'frekanstan bağımsız kazanç' yalnızca orta bant için doğrudur. Op-amp'ın ikinci kutbu faz payı ve kararlılık sorusunu açar; yükselme hızı sınırı büyük işaretlerde bandı ayrıca kısar; kayma gerilimi ve gürültü küçük işaretlerin alt sınırını çizer. Tasarımcı bütün bunları elle değil, sayfadaki Newton yinelemesinin ve zaman adımlamasının büyük ölçekli hâli olan SPICE türü benzetim programlarıyla hesaplar; el hesabı ise sonucun akla yatkın olup olmadığını denetlemek için hep elinin altında durur. Bu laboratuvarın her kartındaki 'ölçülen ile kuram' karşılaştırması, o alışkanlığın küçük bir provasıdır.",
    ],
    topics: ["Yarı iletken fiziği ve bant teorisi", "Küçük sinyal modelleri (hibrit-π)", "Frekans yanıtı ve Bode diyagramları", "Geri besleme, kararlılık ve faz payı", "Aktif süzgeçler ve osilatörler", "SPICE ile devre benzetimi", "Gürültü ve sinyal bütünlüğü"],
  },
  quiz: [
    {
      question: "Yarım dalga doğrultucuda (V<sub>p</sub> = 10.0 V, 50 Hz, 470 µF, 1 kΩ) ΔV ≈ I/(m·f·C) formülü 395.7 mV veriyor. Hiçbir elemanı değiştirmeden köprü doğrultucuya geçilirse aynı formül yaklaşık kaç verir?",
      options: ["395.7 mV; dalgalanma doğrultucu türüne bağlı değildir", "Yaklaşık 198 mV; tam yarısı", "Yaklaşık 183 mV; yarısından biraz az", "Yaklaşık 791 mV; iki katı"],
      answer: 2,
      explanation: "Köprüde kondansatör periyotta iki kez dolar (m = 2), bu dalgalanmayı yarıya indirir. Ama akım yolunda iki diyot vardır; tepe gerilim 9.300 V'tan 8.600 V'a, yük akımı da 9.300 mA'den 8.600 mA'e düşer. Sonuç 395.7 mV × (8.600/9.300)/2 = 183.0 mV'tur. Sayfanın benzetimi 155.4 mV ölçer; formül burada da fazla tahmin eder.",
    },
    {
      question: "Ortak emetörlü bir katta R<sub>C</sub> ve R<sub>E</sub> aynı kalıyor; kolektör akımı, baz bölücüsü ve besleme yeniden ayarlanarak yarıya indiriliyor (kat hâlâ ileri aktif bölgede). Köprüleme kondansatörü bağlıyken ve bağlı değilken gerilim kazancı nasıl değişir?",
      options: [
        "İkisinde de yarıya iner",
        "Bağlıyken yaklaşık yarıya iner; bağlı değilken neredeyse değişmez",
        "Bağlıyken değişmez; bağlı değilken yarıya iner",
        "İkisinde de değişmez; kazancı yalnızca β belirler",
      ],
      answer: 1,
      explanation: "C_E bağlıyken kazanç −g_m·R_C'dir ve g_m = I_C/V_T akımla doğru orantılıdır: akım yarıya inerse kazanç da iner. C_E yokken kazanç −g_m·R_C/(1 + g_m·R_E) biçimindedir; g_m·R_E ≫ 1 olduğu sürece pay ve paydadaki g_m sadeleşir ve sonuç −R_C/R_E'ye yakın kalır. Sayfada g_m·R_E ≈ 53 iken kazanç −3.809'dur; g_m yarıya inse yaklaşık −3.74 olurdu.",
    },
    {
      question: "GBW = 1 MHz olan tek kutuplu bir op-amp, R1 = R<sub>f</sub> = 1 kΩ ile eviren yükselteç olarak bağlanıyor (kazanç −1). −3 dB bant genişliği yaklaşık kaçtır?",
      options: ["1 MHz; çünkü |G| = 1", "500 kHz; çünkü 1/β = 2", "2 MHz; çünkü kazanç 1'den küçük sayılır", "100 kHz; bant genişliği kazançtan bağımsızdır"],
      answer: 1,
      explanation: "Bant genişliğini kazanç değil, geri besleme kesri belirler: f ≈ GBW·β. Eviren katta β = R1/(R1 + R_f) = 1/2, yani gürültü kazancı 1/β = 1 + |G| = 2'dir ve bant 500 kHz çıkar. 'GBW/|G|' kuralı burada iki kat yanılır. Aynı op-amp gerilim izleyici olarak bağlansaydı β = 1 olur, bant 1 MHz'e çıkardı. Sayfada R_f'yi 1 kΩ yaparak 500.0 kHz'i ölçebilirsin.",
    },
  ],
  next: [
    { href: "mantik-devresi.html", title: "Mantık Devreleri Laboratuvarı", why: "Transistörü yükselteç değil anahtar olarak kullanınca açılan dünya: kapılar ve doğruluk tabloları, Karnaugh ile sadeleştirme, toplayıcıların gecikmesi ve bir biti tutan ardışıl devreler." },
    { href: "elektronik-devre.html", title: "Geçici Rejim: RC, RL ve RLC Devreleri", why: "Süzgeç sekmesindeki basamak yanıtının ayrıntısı: kondansatörün dolma eğrisinden τ'yu ölç, kare dalgayı RC süzgeçten geçir, RLC devresinde aşmayı ve sönüm oranını incele." },
    { href: "alternatif-akim.html", title: "Alternatif Akım: RLC Devresi, Fazörler ve Rezonans", why: "Buradaki genlik oranı ve faz kartlarının arkasındaki dil: seri RLC devresini sinüsle sür, dönen fazörleri izle, rezonansta empedansın R'ye inişini gör." },
    { href: "elektrik-muhendisligi.html", title: "Elektrik Mühendisliği: Güç, İletim ve Dönüşüm", why: "Milivoltlardan kilovoltlara: üç fazlı güç, iletim hattı kayıpları ve transformatör verimi; doğrultucunun bağlandığı şebekenin öteki ucu." },
  ],
  sources: [
    { title: "OpenStax · University Physics Vol. 3, 9.7 Semiconductor Devices", url: "https://openstax.org/books/university-physics-volume-3/pages/9-7-semiconductor-devices", note: "PN eklemi, boşaltım bölgesi, diyot akım denklemi ve eklem transistörü; bir önceki bölüm katkılamayı anlatır (İngilizce, açık ders kitabı)." },
    { title: "Computer History Museum · The Silicon Engine: Invention of the Point-Contact Transistor", url: "https://www.computerhistory.org/siliconengine/invention-of-the-point-contact-transistor/", note: "Aralık 1947'deki ilk transistörün müze anlatımı; Silicon Engine zaman çizelgesinin sonraki sayfaları eklem transistörü, tümleşik devre ve MOS transistörle sürer (İngilizce)." },
    { title: "Wikipedia · Operational amplifier", url: "https://en.wikipedia.org/wiki/Operational_amplifier", note: "Altın kurallar, eviren/evirmeyen devreler, sonlu kazanç ve bant genişliği, 741'in tarihi ve gerçek op-amp sınırları (İngilizce)." },
    { title: "MIT OpenCourseWare · 6.002 Circuits and Electronics", url: "https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/", note: "Lisans düzeyinde devre ve elektronik dersi: doğrusal olmayan elemanlar, yükselteçler ve küçük sinyal modeli, birinci ve ikinci dereceden devreler, frekans bölgesi; video dersler ve problem setleri (İngilizce; dersin transistörü MOSFET'tir)." },
  ],
  revision: "Kasım 2026",
};
