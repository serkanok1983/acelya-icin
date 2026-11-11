window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["mekatronik-muhendisligi"] = {
  slug: "mekatronik-muhendisligi",
  title: "Mekatronik: Kendi Hatasını Düzelten Makineler",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Motor, sensör ve denetleyici tek döngüde: DC motorun iki zaman sabiti, enkoderin sayım hatası, ADC'nin örtüşmesi, ayrık PID'nin kararlılık sınırı ve en iyi dişli oranı, hepsi ölçülüp kuramla karşılaştırılıyor.",
  hook: "Aynı DC motor, aynı 24 V, anahtar saniyede bin kez açılıp kapanıyor ve zamanın tam yarısında açık. Kapalı dönemde motorun uçlarını kısa devre eden sürücüyle mil 2273.6 dev/dk döner, boşta hızın yarısı; uçları yalnız bir diyota bırakan sürücüyle 4397.0 dev/dk, neredeyse tam hız. Motor da kaynak da aynı; değişen tek şey, akımın sıfıra inince ne yaptığı.",
  bigIdea:
    "Mekatronik bir makinenin davranışı parçaların arasındaki bağlardan doğar: motor sabiti elektriği mekaniğe, dişli motoru yüke, enkoder ve ADC mili sayılara, denetleyici de bu sayıları komuta bağlar; her bağ kendi hatasını ve sınırını taşır ve <strong>kapalı çevrim geri besleme</strong> ancak bu sınırlar içinde çalışır.",
  story: [
    "1788'de James Watt, ortağı Matthew Boulton'ın önerisiyle buhar makinesine dönen iki ağır top ekledi. Makine hızlandıkça toplar merkezkaç etkisiyle açılıp yükseliyor, bir kol düzeneği buhar vanasını kısıyordu; makine yavaşlayınca toplar iniyor, vana açılıyordu. Fikrin kendisi yeni değildi; 17. yüzyılda yel değirmenlerinde değirmen taşlarının aralığını ayarlamak için benzer bir düzenek kullanılmıştı. Ama Watt'ın <strong>merkezkaç regülatörü</strong> buhar makineleriyle birlikte bütün sanayiye yayıldı ve kendi hızını kendisi tutan makinenin simgesi oldu. İçinde bugünkü her mekatronik sistemin üç parçası vardı: ölçen (toplar), karar veren (kol oranı) ve uygulayan (vana). İki de kusuru vardı: yük artınca makine hedef hızın biraz altında kalıyordu ve makineler hızlandıkça bazı regülatörler vanayı açıp kapayarak durmadan salınmaya başladı.",
    "Bu salınımın ilk sistematik kararlılık analizini, elektromanyetizmanın denklemlerini yazan James Clerk Maxwell yaptı. 1868'de yayımlanan <em>On Governors</em> (Regülatörler Üzerine) makalesinde regülatörün hareketini diferansiyel denklemlerle yazdı ve sistemin sakinleşip sakinleşmeyeceğinin bu denklemlerin köklerine bağlı olduğunu gösterdi. Basit durumlar için koşulları buldu, genel problemi ise matematikçilere bıraktı. Edward Routh 1877'de Adams Ödülü'nü kazanan denemesinde, Adolf Hurwitz ise 1895'te ondan bağımsız olarak bu soruyu çözdü: bir sistemin kararlı olup olmadığını denklemi çözmeden söyleyen ölçütler buldular. Kontrol kuramı, bir buhar makinesinin titremesinden doğdu.",
    "1922'de Rus asıllı Amerikalı mühendis Nicolas Minorsky, ABD Donanması için otomatik dümen üzerinde çalışırken deneyimli dümencileri izledi. İyi bir dümenci yalnızca geminin rotadan ne kadar saptığına bakmıyordu; sapmanın ne zamandır sürdüğünü ve ne hızla büyüdüğünü de hesaba katıyordu. Minorsky bu üç sezgiyi tek bir denkleme döktü: bugün <strong>PID</strong> dediğimiz denetleyici. Yalnızca sapmaya orantılı dümen, sürekli esen sert bir rüzgârda gemiyi rotanın biraz dışında bırakıyordu; geçmişi biriktiren integral terimi bu kalıcı sapmayı siliyor, değişim hızına bakan türev terimi salınımı sönümlüyordu. Aynı üç terim sonra basınçlı havayla çalışan fabrika kontrolcülerine, oradan elektroniğe ve bugün sayısız PLC ve mikrodenetleyici yazılımına taşındı.",
    "1961'de New Jersey'deki bir General Motors fabrikasında Unimate işe başladı: George Devol'un 1954'te patent başvurusu yaptığı, Devol ve Joseph Engelberger'in kurduğu Unimation şirketinin ürettiği, yaklaşık 1.8 ton ağırlığında, hidrolik kollu ve programını dönen bir bellek tamburunda saklayan ilk endüstriyel robot. Kalıptan çıkan sıcak döküm parçalarını insan eli değmeden taşıyordu. Mekanik, elektronik ve kontrol artık tek bir makinede iç içeydi ama bu birleşimin bir adı yoktu. 1969'da, şirketin kendi anlatımına göre, Japon Yaskawa Electric şirketinde mühendis Tetsuro Mori, <em>mechanics</em> ile <em>electronics</em> kelimelerini birleştirerek <strong>mechatronics</strong> kelimesini önerdi. (Kelime 1951'de Amerikan Servomechanisms şirketinin bir dergi reklamında da geçmişti; onu bir disiplinin adı yapan Yaskawa'dır.) 1980'lerde mikroişlemciler makinelerin içine girince elektroniğin yanına yazılım da eklendi. Sayfadaki dört sekme bu birleşimi parça parça kurar: önce motorun kendi fiziği, sonra mili sayıya çeviren sensörler, ardından ikisini kapalı döngüde buluşturan servo, en sonda adım motoru ve dişli seçimi.",
  ],
  core: [
    {
      heading: "DC motor: iki denklem, tek bir K sabiti",
      body: "Fırçalı bir DC motorda elektrik ve mekanik aynı sabitle birbirine bağlıdır. Sargıdaki akım tork üretir (K·I); dönen mil de sargıda hızıyla orantılı bir <strong>zıt EMK</strong> (K·ω) doğurur. SI birimlerinde tork sabiti ile zıt EMK sabiti aynı sayıdır, sayfa ikisine de K der. Gerilim uygulandığı anda akım önce <strong>elektriksel zaman sabiti</strong> τ<sub>e</sub> = L/R ile yükselir, mil hızlandıkça zıt EMK onu geri çeker; hız ise çok daha yavaş olan <strong>mekanik zaman sabiti</strong> τ<sub>m</sub> = J·R/(K² + R·b) ile oturur. Sayfanın varsayılan motorunda τ<sub>e</sub> = 0.5 ms, τ<sub>m</sub> = 15.873 ms ve oran 31.7'dir; bu yüzden akım, kararlı değerine inmeden önce yaklaşık 1.8 ms'de 11.03 A'lik bir tepe yapar: zıt EMK büyümeye başladığında akım duruş değerinin (12 A) ancak %92'sine varmıştır. Kararlı durumda tork–hız ilişkisi bir doğrudur: boşta hız K·V/(K² + R·b), duruş torku K·V/R. Mekanik güç T·ω bu doğru üzerinde tam ortada, T<sub>s</sub>/2'de en büyüktür; verim ise çok daha hafif bir yükte zirve yapar. En güçlü nokta en verimli nokta değildir.",
      formula: "L·dI/dt = V − R·I − K·ω<br>J·dω/dt = K·I − b·ω − T<sub>L</sub><br>ω = (K·V − R·T<sub>L</sub>)/(K² + R·b)",
      formulaNote:
        "Varsayılanlarla (24 V, 2 Ω, 0.05 N·m/A, 200 g·cm², 10 µN·m·s/rad) boşta hız 4547.3 dev/dk, duruş torku 0.600 N·m, en büyük güç 71.43 W · 0.300 N·m, en yüksek verim yaklaşık 83.6 %, 0.05 N·m civarında (kapalı biçim 83.64 % · 0.049 N·m; dinamometrenin 25 noktalı ölçümü 83.63 % · 0.051 N·m). Bunlar öğretim değerleridir; fırça düşümü, demir kaybı ve kuru sürtünme yoktur.",
    },
    {
      heading: "PWM: ortalama model ne zaman doğrudur?",
      body: "Bir sürücü motora 'yarım gerilim' vermek için gerilimi kısmaz; anahtarı periyodun D kesri kadar açık tutar. Sargının endüktansı akımı yumuşatır ve motor çoğu zaman ortalama gerilim D·V ile beslenmiş gibi davranır. Bu <strong>ortalama model</strong>, akım hiç kesilmediği sürece kesin sonuç verir: model doğrusaldır, bir periyot üzerinden tümlenince türevler sıfırlanır ve ortalama hız tam olarak D·V'nin hızıdır. Senkron sürücüde kapalı dönemde uçlar kısa devre edilir, akım gerekirse eksiye iner ve bu koşul her zaman sağlanır. Diyotlu sürücüde ise akım sıfıra inince durur. Kabaca, ortalama akım dalgalanmanın yarısından küçükse periyodun bir kısmında akım yoktur (<strong>kesintili iletim</strong>), o aralıkta uçlarda zıt EMK görünür, ortalama uç gerilimi D·V'yi aşar ve motor beklenenden hızlı döner.",
      formula: "ω<sub>ort</sub> = (K·D·V − R·T<sub>L</sub>)/(K² + R·b)<br>ΔI ≈ D·(1 − D)·V/(L·f)",
      formulaNote:
        "İkinci formül, τ<sub>e</sub> periyottan çok uzunken tepeden tepeye akım dalgalanmasıdır: varsayılan 5 kHz'te 1.200 A, üstel kapalı çözüm 1.196 A. Frekansı artırmak dalgalanmayı küçültür, ortalama hızı değiştirmez.",
    },
    {
      heading: "Mili sayıya çevirmek: enkoderin ve ADC'nin hataları",
      body: "Artımlı enkoder diskteki N yarığı iki kanaldan (A ve B) okur. İki kanal çeyrek yarık kaymış olduğu için hangisinin önde gittiği yönü söyler; bütün kenarlar sayılınca turda C = 4N sayım çıkar. Hızı sayımdan iki yolla kestirirsin. <strong>M yöntemi</strong> sabit bir T<sub>w</sub> penceresinde kenar sayar; bir sayım fazla ya da eksik okumak Δn kadar hız hatasıdır ve bu hata hızdan bağımsızdır, yani yavaş milde göreli olarak büyür. <strong>T yöntemi</strong> iki A kenarı arasındaki saat darbelerini sayar; yavaş milde aralık uzun, darbe çok, hata küçüktür. İki yöntemin en kötü hatası belli bir hızda eşitlenir. Analog sensörde ise ADC gerilimi Δ = V<sub>ref</sub>/2<sup>N</sup> genişliğinde basamaklara böler; hata [−Δ/2, Δ/2]'ye düzgün yayılırsa RMS'i Δ/√12'dir. Örnekleme de bir bedel ister: f<sub>s</sub>/2'nin üstündeki bir frekans, örneklerde başka bir frekansla birebir aynı görünür. Buna <strong>örtüşme</strong> denir ve örneklemeden sonra hiçbir yazılım onu geri alamaz.",
      formula: "Δn = 60/(C·T<sub>w</sub>)<br>n<sub>kesişme</sub> = 60·√(f<sub>saat</sub>/(C·N·T<sub>w</sub>))<br>e<sub>RMS</sub> = Δ/√12,  f<sub>görünen</sub> = |f − k·f<sub>s</sub>|",
      formulaNote:
        "n dev/dk, T<sub>w</sub> s, f<sub>saat</sub> Hz; k, f/f<sub>s</sub>'ye en yakın tam sayıdır. Varsayılan enkoderde (N = 100, ×4, 10 ms, 1 MHz) Δn = 15.00 dev/dk ve kesişme 3000 dev/dk; varsayılan 8 bitlik, 5 V'luk ADC'de Δ = 19.53 mV.",
    },
    {
      heading: "Ayrık PID ile servo: ikinci derece model ve örnekleme sınırı",
      body: "Servo sekmesindeki denetleyici her T<sub>s</sub>'de enkoderi okur ve u = K<sub>p</sub>·e + K<sub>i</sub>·Σe·T<sub>s</sub> + K<sub>d</sub>·(ω<sub>ref</sub> − ω<sub>ölç</sub>) gerilimini bir sonraki örneğe kadar sabit tutar. Endüktansı ihmal edip (L = 0) motor denklemine K<sub>i</sub> = 0 olan bu yasayı koyunca, kütle–yay–sönümleyiciyle aynı biçimde ikinci derece bir denklem çıkar. K<sub>p</sub> yay gibi davranır, K<sub>d</sub> zıt EMK ile sürtünmenin yanına ek bir sönüm koyar. Buradan sönüm oranı ζ, doğal frekans ω<sub>n</sub> ve aşım gelir. Gerçek denetleyici ise sürekli bakmaz: örnekler arasında kördür ve hızı geriye dönük bir farktan hesaplar. T<sub>s</sub> büyüdükçe aynı kazançlarla aşım artar, sonunda ayrık döngü kararsızlaşır; bu sınır, ayrık kutupların |z| = 1 çemberini geçtiği T<sub>s</sub>'dir. Doğrusal kuramın görmediği iki şey daha vardır: gerilim ±V<sub>max</sub>'ta doyar ve doyma süresince integral boşuna büyüyebilir (<strong>integral şişmesi</strong>); bilinen bir hareket profilinde ise gereken gerilimi önceden veren <strong>ileri besleme</strong>, geri beslemeye yalnız modelin karşılayamadığını bırakır.",
      formula: "J·R·θ″ + (K² + R·b + K·K<sub>d</sub>)·θ′ = K·K<sub>p</sub>·(r − θ)<br>ω<sub>n</sub> = √(K·K<sub>p</sub>/(J·R)),  ζ = (K² + R·b + K·K<sub>d</sub>)/(2·√(J·R·K·K<sub>p</sub>))",
      formulaNote:
        "J rotor ile yükün toplamıdır. Bu kapalı biçimler örnekleme, nicemleme ve doymayı içermez; sayfa ayrık yanıtı onların yanında ölçer. Çözümlü örnek bu denklemi adım adım kurar.",
    },
    {
      heading: "Dişli oranı: yük motor milinden nasıl görünür?",
      body: "Motor yükü n oranlı kayıpsız bir dişliyle döndürüyorsa motor mili yükün n katı hızla döner ve motor torku yüke n kat büyüyerek ulaşır. Yükün eylemsizliği ise motor milinden J<sub>L</sub>/n² kadar görünür: <strong>yansıyan eylemsizlik</strong>. Sabit tork veren bir motorla yükü en çabuk hızlandıran oranı arıyorsan iki etki çekişir. Küçük oranda tork yüke az çarpılarak ulaşır; büyük oranda motor kendi rotorunu n² kat fazla hızlandırmak zorunda kalır. Yük ivmesi α<sub>L</sub> = n·T<sub>m</sub>/(J<sub>L</sub> + n²·J<sub>m</sub>) ifadesinin türevi sıfırlanınca en iyi oran çıkar: yansıyan eylemsizlik rotorunkine eşit olmalıdır. Bu sonuç bir varsayıma dayanır: motor torku hızdan bağımsızdır. Gerçek bir DC motorun torku hızla doğrusal düşer. Hız tavanı kısa harekette bile hissedilir: sayfadaki DC motorla 1 rad'lık harekette en iyi oran 10 değil yaklaşık 7'dir. Uzun bir harekette zamanın çoğu tavan hızda geçer; yük tarafındaki tavan ω<sub>nl</sub>/n olduğundan oran daha da küçülür (20 rad'da 3.4).",
      formula: "n* = √(J<sub>L</sub>/J<sub>m</sub>)<br>t = √(2·θ<sub>L</sub>·(J<sub>L</sub> + n²·J<sub>m</sub>)/(n·T<sub>m</sub>))",
      formulaNote:
        "İkinci formül, sabit torkla durgun hâlden θ<sub>L</sub> açısına varma süresidir (yük sona kadar ivmelenir, frenleme yoktur). Varsayılanlarla (J<sub>m</sub> = 200, J<sub>L</sub> = 20 000 g·cm², 0.30 N·m, 1 rad) n* = 10 ve en kısa süre 51.64 ms.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeden oluşur ve her birinin kendi <strong>Sıfırla</strong> düğmesi vardır; form denetimi odakta değilken <kbd>R</kbd> etkin sekmeyi sıfırlar. Her kart benzetimin ölçtüğü değeri gösterir, altındaki satır kuramın verdiğini ve farkı yazar. Dinamometre, PWM, çekme torku ve dişli taraması gibi ağır ölçümler bir an 'ölçülüyor…' der, sonra dolar. <strong>01 · DC motor</strong> sekmesinde gerilim, direnç, endüktans, K, J, sürtünme ve yük torku kaydırıcıları ile PWM'in görev oranı, frekansı ve 'Kapalı dönemde' seçimi bulunur. <strong>02 · Sensörler ve sinyal</strong> enkoderi (yarık sayısı, kod çözme, mil hızı, sayım penceresi, zamanlayıcı saati) ve ADC'yi (çözünürlük, aralık, genlik, frekans, örnekleme frekansı) ayrı hazır düğmelerle sınar. <strong>03 · Servo konumlama</strong> ayrık PID'yi sürekli zamanlı eşiyle yan yana çizer; '<strong>Kararlılık sınırını ölç</strong>' düğmesi T<sub>s</sub>'yi tarar. <strong>04 · Adım motoru ve dişli seçimi</strong> bir adım motorunu ve dişli oranı taramasını içerir. Bütün motor ve sensör sayıları öğretim değeridir. Adım motorundaki salınım sönümü, sargıların etkisini temsil eden etiketli bir terimdir; dişliler kayıpsız ve boşluksuzdur. T yönteminin RMS okuması, sayım kesri 0 ya da 1'e yakınken nadir olaylarla belirlendiği için yaklaşık ±%15 oynar; deneylerde onun yerine kesin olan en büyük hata kullanılır.",
    experiments: [
      {
        title: "Diyotlu PWM motoru neden hızlandırır?",
        predict:
          "Görev oranı D = 50 %, 24 V. Ortalama model motorun 12 V'ta, yani boşta hızın yarısında (2273.6 dev/dk) dönmesini bekler. Kapalı dönemde akımı bir diyota bırakan sürücüde mil daha yavaş mı, aynı mı, daha hızlı mı döner?",
        do: "01 · DC motor sekmesinde Sıfırla'ya, sonra 'Diyotlu PWM, 1 kHz' düğmesine bas. PWM kartlarını ve son üç periyodun akım grafiğini oku. Ardından 'Kapalı dönemde' menüsünü 'senkron: uçlar kısa devre' yap ve aynı kartları yeniden oku. Son olarak diyota geri dön ve 'Sabit yük torku T<sub>L</sub>' kaydırıcısını 0.15 N·m'ye getir.",
        observe:
          "Diyotlu sürücüde ortalama hız 4397.0 dev/dk (ortalama modelden +93.39 %), iletim kipi 'kesintili': akım sürenin 48.7 %'inde sıfır, uç geriliminin ortalaması 23.21 V, D·V'nin neredeyse iki katı. Senkron sürücüde 2273.6 dev/dk, modelle aynı; dalgalanma 5.557 A (kuram 5.545 A). T<sub>L</sub> = 0.15 N·m'de diyotlu sürücü de 'sürekli' iletime geçer ve ortalama hız 1136.8 dev/dk, ortalama modelle aynı olur.",
        explain:
          "Boştaki motor yalnız sürtünmeyi karşılayacak kadar akım ister (diyotlu sürücüde kartta 0.092 A); 1 kHz'teki 5.5 A'lik dalgalanmanın yanında bu hiçtir, akım her periyotta sıfıra çarpar. Akım yokken uçlarda zıt EMK (K·ω ≈ 23 V) görünür; ortalama uç gerilimi bu yüzden D·V'nin çok üstüne çıkar. Yük ortalama akımı (3.024 A) dalgalanmanın yarısının üstüne çıkarınca akım kesilmez, model yine doğrusal olur ve ortalama model kesinleşir. Hafif yükte diyotlu sürücüyle hızı ortalama gerilimle ayarlayamazsın; senkron sürücü ya da hız geri beslemesi gerekir.",
      },
      {
        title: "Yavaş milde sayım, hızlı milde saat",
        predict:
          "Mil 23 dev/dk dönüyor, enkoder turda 400 sayım veriyor, pencere 10 ms. M yönteminin bir penceresine kaç kenar düşer? Hangi yöntemin hatası daha küçük çıkar? 5000 dev/dk'da sıralama değişir mi?",
        do: "02 · Sensörler ve sinyal sekmesinde 'Yavaş mil (23 dev/dk)' düğmesine bas; M ve T yöntemi kartlarını ve kesişme hızını oku. Sonra 'Hızlı mil (5000 dev/dk)' düğmesine bas, ardından 'Mil hızı n' kaydırıcısını 4990 dev/dk'ya çek. En sonda ADC bölümünde 'Örtüşme: 950 Hz' düğmesine bas.",
        observe:
          "23 dev/dk'da pencerede beklenen sayım 1.533: M yöntemi 'RMS 7.486 · en büyük 8.000 dev/dk' okur (kuram 7.483 ve 8.000), göreli hata 34.8 %; T yönteminin en büyük hatası 0.00367 %. 5000 dev/dk'da M yönteminin en büyük hatası 10.00 dev/dk, yani 0.200 %. T kartı burada 0 % gösterir ve altındaki not nedenini söyler: her A periyoduna tam 120 saat darbesi düşer. 4990 dev/dk'da kesir bozulur ve T yönteminin en büyük hatası 0.628 %'e çıkar. Kesişme hızı 3000 dev/dk. Örtüşme hazırında 950 Hz'lik sinyal örneklerde 50.00 Hz görünür (kuram |950 − 1·1000| = 50.00 Hz).",
        explain:
          "M yönteminin çözünürlüğü Δn = 60/(C·T<sub>w</sub>) = 15 dev/dk'dır ve hızdan bağımsızdır; 23 dev/dk'lık milde pencere 1 ya da 2 kenar görür, sonuç ya 15 ya 30 dev/dk'dır. T yönteminde bir A periyodu 1 MHz'lik saatten yaklaşık 26 000 darbe toplar, bir darbelik belirsizlik önemsizleşir. Hız arttıkça M'nin hatası küçülür, T'ninki büyür; 60·√(f<sub>saat</sub>/(C·N·T<sub>w</sub>)) = 3000 dev/dk'nın altında T, üstünde M kazanır. Hızlı mildeki 0 %, kusursuz saatle tam sayıya denk gelen hızın özel durumudur. Örtüşmede bilgi kaybolur: 950 Hz ile 50 Hz aynı örnekleri üretir; ayrımı ancak ADC'den önceki analog süzgeç yapar.",
      },
      {
        title: "Örnekleme süresi bir kazançtır",
        predict:
          "Kazançlar sabitken denetleyici her 1 ms yerine her 12 ms'de bir bakarsa aşım ne olur? Ayrık döngü hangi T<sub>s</sub>'de kararsızlaşır? 90° yerine 360°'lik bir basamakta, sürücü 24 V'ta doyarken integral terimi aşımı nasıl etkiler?",
        do: "03 · Servo konumlama sekmesinde Sıfırla'ya bas ve aşım, yerleşme ve en büyük |z| kartlarını oku. 'Yavaş örnekleme (12 ms)' düğmesine bas, sonra 'Kararlılık sınırını ölç' düğmesine bas. Ardından 'Doyma ve integral şişmesi' düğmesine bas; aşımı ve doymada geçen süreyi okuduktan sonra 'İntegral şişmesine karşı koruma' kutusunu işaretle.",
        observe:
          "Varsayılanda aşım 5.63 % (sürekli eşi 5.79 %), yerleşme 90.7 ms, en büyük |z| 0.9557. 12 ms'de aşım 25.02 %'e, yerleşme 185.3 ms'ye çıkar, sürekli eşi ise 5.79 %'te kalır; en büyük |z| 0.8214 olur. Kararlılık sınırı 17.497 ms ölçülür (kuram 17.497 ms). Doyma hazırında ilk anda K<sub>p</sub>·r = 50.27 V istenir; sürücü 27.0 ms boyunca 24 V'ta kalır ve aşım 59.99 % olur. Koruma açılınca aşım 29.66 %'e, doyma süresi 16.0 ms'ye iner.",
        explain:
          "|z| 'her örnekte ne kadar sönüyor' sorusunun cevabıdır; saniye başına sönüm −ln|z|/T<sub>s</sub>'dir: 1 ms'de yaklaşık 45 s⁻¹, 12 ms'de yalnız yaklaşık 16 s⁻¹. Yani daha küçük |z| burada daha hızlı sönüm demek değildir. Örnekler arasında denetleyici kördür ve hızı bir örnek geriden ölçer; bu gecikme sönüm payını yer, 17.5 ms'de tüketir. Doymada döngü fiilen açıktır: hata büyük kaldıkça integral birikir ve mil hedefi geçtikten sonra bu birikim boşalırken mili ileri iter. Sıkıştırma tipi koruma, doymadayken integralin aynı yönde büyümesini durdurur.",
      },
      {
        title: "En iyi dişli oranı hareketin uzunluğuna bağlı mı?",
        predict:
          "J<sub>m</sub> = 200 ve J<sub>L</sub> = 20 000 g·cm². Sabit torklu bir motor için en iyi oran kaçtır? Aynı yükü 20 rad döndüren, 1. sekmedeki 24 V'luk DC motor için en iyi oran bundan büyük mü çıkar, küçük mü?",
        do: "04 · Adım motoru ve dişli seçimi sekmesinin dişli bölümünde Sıfırla'ya bas ve en iyi oran, en kısa süre ve seçilen n'deki süre kartlarını oku. 'n'yi n*'a getir' düğmesine bas. Sonra 'Uzun hareket, DC motor' düğmesine bas; en sonda 'Seçilen dişli oranı n' kaydırıcısını 10.0'a çek.",
        observe:
          "Sabit torkta tarama n = 10.000 bulur (kuram n* = 10.000), en kısa süre 51.64 ms; n = 5'te süre 57.74 ms ve yansıyan eylemsizlik 800.0 g·cm², rotorun 4 katı. n* düğmesinden sonra yansıyan eylemsizlik 200.0 g·cm²'ye, rotorunkine eşitlenir. DC motorla 20 rad'lık harekette en iyi oran n = 3.433, en kısa süre 269.80 ms; n = 10'da süre 451.75 ms'ye uzar ve yük tarafındaki hız tavanı 454.7 dev/dk'ya düşer.",
        explain:
          "Sabit torkta n* = √(J<sub>L</sub>/J<sub>m</sub>) = √100 = 10; bu oranda yük motor milinden rotor kadar ağır görünür. DC motorun torku hızla düşer ve uzun harekette zamanın çoğu tavan hızda geçer. Yük tarafındaki tavan ω<sub>nl</sub>/n olduğu için büyük oran hareketi yavaşlatır: n = 10'da yük en fazla 454.7 dev/dk (yaklaşık 48 rad/s) dönebilir ve 20 rad en az 0.42 s sürer. Eylemsizlik eşlemesi bir ivme kuralıdır; hız sınırlı bir harekette en iyi oranı hareketin kendisi belirler ve kapalı bir formülü yoktur.",
      },
    ],
  },
  wow: [
    {
      title: "Dümencinin üç sezgisi bir savaş gemisinde",
      body: "Minorsky'nin denetleyicisi USS New Mexico zırhlısında denendi. Yalnızca orantılı ve integral terimlerle gemi rotadan yaklaşık ±2° sapıyordu; türev terimi eklenince sapma ±1/6°'ye indi, kayıtlara göre çoğu dümencinin tutturabildiğinden daha iyi. Donanma sistemi yine de benimsemedi; gerekçe teknik değil, personelin direnciydi.",
    },
    {
      title: "Adı 'Sır' olan düzenek",
      body: "Maxwell'in makalesiyle aynı yıllarda, 1868 civarında Robert Whitehead torpidosunu sabit derinlikte tutmaya uğraşıyordu. Yalnızca basınç sensörüyle çalışan düzenek dalıp çıkarak salınıyordu. Whitehead basınç ölçerin yanına, torpidonun burnunun ne kadar aşağı ya da yukarı baktığını ölçen bir sarkaç ekledi. Burnun eğimi derinliğin değişim hızını ele verir; sarkaç bugünkü türev teriminin işini görüyordu. Salınım söndü. Sarkaçla basınç ölçeri birleştiren düzenek uzun süre sır gibi saklandı ve adı da buradan geldi: 'The Secret' (Sır).",
    },
    {
      title: "Bir zamanlar tescilli marka olan kelime",
      body: "Yaskawa, 'mechatronics' kelimesini 1971'de Japonya'da 46-32714 numarasıyla tescilli marka olarak kaydettirdi; yani bir süre bu kelime bir şirkete aitti. Şirket daha sonra kelimenin kullanım hakkını herkese bıraktı ve kelime pek çok dile girdi. Bugün Türkiye'de de birçok üniversitede 'Mekatronik Mühendisliği' adını taşıyan bölümler var; bir mühendislik dalının adı, bir şirketin marka defterinden çıkıp ders kataloglarına girmiş oldu.",
    },
  ],
  worked: {
    title: "Servonun aşımı ve izleme hatası, motor denkleminden",
    prompt:
      "Servo sekmesinin varsayılan düzeni: R = 2 Ω, K = 0.05 N·m/A, b = 10 µN·m·s/rad, rotor 200 g·cm² ile yük 300 g·cm², K<sub>p</sub> = 8 V/rad, K<sub>d</sub> = 0.12 V·s/rad, K<sub>i</sub> = 0. Endüktansı ve örneklemeyi ihmal ederek (a) 90°'lik basamaktaki aşımı ve tepe zamanını, (b) mil ω<sub>max</sub> = 60 rad/s sabit hızla giderken konum hatasını, (c) hız ileri beslemesi açıkken 600 rad/s²'lik ivme evresindeki hatayı bul. Sonuçları sayfanın ölçtüğüyle karşılaştır.",
    steps: [
      "Modeli kur. L = 0'da akım I = (u − K·θ′)/R olur; J·θ″ = K·I − b·θ′ denklemine koyup R ile çarpınca J·R·θ″ = K·u − (K² + R·b)·θ′. Basamakta ω<sub>ref</sub> = 0 olduğu için u = K<sub>p</sub>·(r − θ) − K<sub>d</sub>·θ′; yerine koy: J·R·θ″ + (K² + R·b + K·K<sub>d</sub>)·θ′ = K·K<sub>p</sub>·(r − θ). Bu, kütle–yay–sönümleyici denklemidir.",
      "Sayıları yerleştir. J = 500 g·cm² = 5.0·10⁻⁵ kg·m², J·R = 1.0·10⁻⁴; K·K<sub>p</sub> = 0.40; K² + R·b + K·K<sub>d</sub> = 0.0025 + 0.00002 + 0.006 = 0.00852 (birimleri J·R·s⁻¹ ile aynı). ω<sub>n</sub> = √(0.40/1.0·10⁻⁴) = √4000 ≈ 63.25 rad/s. ζ = 0.00852/(2·√(1.0·10⁻⁴·0.40)) = 0.00852/0.01265 ≈ 0.674.",
      "Aşım e^(−πζ/√(1 − ζ²)) = e^(−π·0.674/0.739) ≈ e^(−2.863) ≈ 0.0571, yani 5.71 %; tepe zamanı π/(ω<sub>n</sub>·√(1 − ζ²)) = π/(63.25·0.739) ≈ 67.2 ms. Sayfa ayrık döngüde 5.63 % ve 64.3 ms, endüktansı da içeren sürekli eşinde 5.79 % ve 66.1 ms ölçer: el hesabı bir yüzde puanının onda biri kadar yakındır.",
      "Yamuk profilde türev terimi ω<sub>ref</sub> − ω'ya uygulandığı için sabit hızda sıfırdır. θ″ = 0 ve θ′ = ω<sub>max</sub> koyunca (K² + R·b)·ω<sub>max</sub> = K·K<sub>p</sub>·e kalır: e = 0.00252·60/0.40 = 0.378 rad ≈ 21.7°. Mil hedefin hep bu kadar gerisinden koşar, çünkü zıt EMK'yı karşılayacak gerilimi yalnız hata üretebilir. Sayfa 'Yamuk profil' hazırında 21.6° ölçer.",
      "Hız ileri beslemesi u'ya (K + R·b/K)·ω<sub>ref</sub> ekler; K ile çarpılınca tam (K² + R·b)·ω<sub>ref</sub> olur ve sabit hız hatası sıfırlanır (sayfa 0.0447° ölçer). İvme evresinde ise eylemsizlik için gereken tork karşılanmaz: J·R·α = K·K<sub>p</sub>·e, e = 1.0·10⁻⁴·600/0.40 = 0.15 rad ≈ 8.59°. Sayfa 8.46° ölçer. İvme ileri beslemesi (J·R/K)·α<sub>ref</sub> bu terimi de önceden verir; 'Hız + ivme ileri beslemesi' hazırında hareket boyunca en büyük hata 0.328°'ye iner.",
    ],
    result:
      "ω<sub>n</sub> ≈ 63.25 rad/s, ζ ≈ 0.674, aşım ≈ 5.71 %, tepe zamanı ≈ 67.2 ms; sabit hızda izleme hatası ≈ 21.7°, hız ileri beslemesiyle ivme evresinde ≈ 8.59°. Geri besleme hatayı ancak hata varken düzeltir; modeli bilinen kısmı önceden veren ileri besleme en büyük hatayı 26.2°'den 0.328°'ye indirir.",
  },
  misconceptions: [
    {
      myth: "PWM ile sürülen motor her zaman ortalama gerilimin hızında döner.",
      truth:
        "Bu yalnız akım hiç kesilmezken doğrudur. Sayfadaki diyotlu sürücü D = 50 %'de boştaki motoru 4397.0 dev/dk döndürür, ortalama model 2273.6 der; akım sürenin 48.7 %'inde sıfırdır ve o aralıkta uçlarda zıt EMK görünür. Yük ortalama akımı dalgalanmanın yarısının üstüne çıkarınca ya da sürücü senkron olunca ortalama model yeniden kesinleşir.",
    },
    {
      myth: "Adım motoru adım saydığı için konumunu her zaman bilir; mikroadım konumu da o kadar inceltir.",
      truth:
        "Konumu bilen motor değil, darbeleri sayan sürücüdür. Sayfadaki 'Yük fazla' hazırında 0.25 N·m'lik yük, 600 adım/s'deki çekme torkunu (0.202 N·m) aştığı için rotor 1 saniyelik koşuda 872 tam adım kaçırır; yük etkin bir tork olduğu için sonunda mili geri bile döndürür. Sürücü bunların hiçbirini bilmez. Mikroadım da çözünürlüğü artırır ama doğruluğu artırmaz: 1/16'da bir mikroadımı kaydırmak için yalnız 0.039 N·m yeter ve 0.050 N·m'lik yük rotoru durgunken 1.3 mikroadım kaydırır. Konumu gerçekten bilmek için döngüyü bir enkoderle kapatmak gerekir.",
    },
    {
      myth: "Orantı kazancını artırmak servoyu her zaman daha iyi yapar.",
      truth:
        "K<sub>p</sub> artınca ω<sub>n</sub> √K<sub>p</sub> ile büyür ama ζ 1/√K<sub>p</sub> ile küçülür. Sayfada K<sub>p</sub>'yi 8'den 16 V/rad'e çıkarmak aşımı 5.63 %'ten 20.43 %'e taşır ve ayrık döngünün kararlılık sınırını 17.50 ms'den 11.10 ms'ye çeker. Hızlı yanıt, daha hızlı örnekleme ve daha fazla sönüm ister.",
    },
    {
      myth: "En iyi dişli oranı her zaman yansıyan eylemsizliğin rotorunkine eşit olduğu orandır.",
      truth:
        "n* = √(J<sub>L</sub>/J<sub>m</sub>) torku hızdan bağımsız bir motorda en büyük ivmeyi verir. Hız tavanı olan bir DC motorla uzun bir harekette en iyi oran küçülür: sayfada 20 rad'lık harekette tarama n = 3.433 bulur, n* = 10'da hareket 269.80 ms yerine 451.75 ms sürer.",
    },
  ],
  glossary: [
    {
      term: "Zıt EMK",
      definition:
        "Dönen motor milinin sargıda ürettiği, hızla orantılı (K·ω) ve uygulanan gerilime karşı koyan gerilim.",
    },
    {
      term: "Mekanik zaman sabiti (τm)",
      definition:
        "Endüktans ihmal edildiğinde motor hızının son değerinin %63.2'sine çıkma süresi, J·R/(K² + R·b).",
    },
    {
      term: "Görev oranı (D)",
      definition:
        "PWM periyodunda anahtarın iletimde kaldığı sürenin periyoda oranı.",
    },
    {
      term: "Kesintili iletim",
      definition:
        "Diyotlu bir sürücüde akımın periyodun bir kısmında sıfıra inip orada kaldığı çalışma; ortalama model bu durumda geçersizdir.",
    },
    {
      term: "Dörtlü (×4) kod çözme",
      definition:
        "Çeyrek yarık kaymış A ve B kanallarının bütün kenarlarını sayarak turda 4N sayım ve dönüş yönü elde etme.",
    },
    {
      term: "Örtüşme",
      definition:
        "f<sub>s</sub>/2'nin üstündeki bir frekansın örneklerde |f − k·f<sub>s</sub>| frekanslı bir sinyalle ayırt edilemez görünmesi.",
    },
    {
      term: "İntegral şişmesi",
      definition:
        "Çıkış doymadayken PID'nin integral teriminin boşuna birikmesi ve hedef geçildikten sonra boşalırken aşımı büyütmesi.",
    },
    {
      term: "Yansıyan eylemsizlik",
      definition:
        "n oranlı bir dişlinin ardındaki J<sub>L</sub> yükünün motor milinden görünen eylemsizliği, J<sub>L</sub>/n².",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede geri besleme bir sezgidir: hatayı ölç, ters yönde it. <strong>Sistem Dinamiği</strong> ve <strong>Kontrol Sistemleri</strong> derslerinde bu sezgi bir dile dönüşür. Motoru, yükü ve dişliyi buradaki gibi diferansiyel denklemlerle yazarsın; <strong>Laplace dönüşümü</strong> onları cebire çevirir ve DC motor V'den ω'ya bir transfer fonksiyonu olur. Maxwell'in 1868'de baktığı kökler burada 'kutuplar' adını alır; iki zaman sabiti birbirinden uzakken kutuplar yaklaşık −1/τ<sub>e</sub> ve −1/τ<sub>m</sub>'dir, birbirine yaklaşınca karmaşık bir çift olurlar ('Büyük endüktans' hazırında hız bu yüzden aşıp salınır). Kök yer eğrisi, Bode ve Nyquist diyagramları, servo sekmesindeki 'kazanç büyüyünce aşım artar' olgusunu frekans dilinde ölçer. <strong>Sayısal Kontrol</strong> dersinde aynı iş Z-dönüşümüyle yapılır; sayfadaki |z| ve 17.5 ms'lik sınır bu analizin doğrudan ürünüdür.",
      "Sensör tarafında <strong>Sinyaller ve Sistemler</strong> örnekleme kuramını kurar: örtüşmenin neden geri alınamadığı, nicemleme gürültüsünün neden Δ/√12 olduğu, süzgecin örneklemeden önce neden gerektiği. <strong>Güç Elektroniği</strong> PWM sürücüyü, H köprüsünü, senkron doğrultmayı ve kesintili iletimi ayrıntılandırır; <strong>Elektrik Makineleri</strong> fırçalı motordan adım motoruna, oradan fırçasız ve asenkron motorlara uzanır. Bütün bunlar sonunda <strong>Gömülü Sistemler</strong> dersinde bir mikrodenetleyicinin zamanlayıcısına, ADC'sine ve kesme rutinine sığmak zorundadır; enkoder sayıcısı ve PID döngüsü genellikle tam orada, sabit bir T<sub>s</sub> ile döner. Mekatronik, makine, elektrik ve bilgisayar mühendisliğinin buluştuğu yerdir; bu üç alandan birini seçsen bile bu döngüyle karşılaşırsın.",
    ],
    topics: [
      "Sistem dinamiği ve elektromekanik modelleme",
      "Laplace ve Z-dönüşümü",
      "Kararlılık: kutuplar, Routh–Hurwitz, Nyquist",
      "PID ayarı, ileri besleme ve durum uzayı kontrolü",
      "Örnekleme kuramı ve nicemleme",
      "Güç elektroniği: PWM ve H köprüsü",
      "Elektrik makineleri ve sürücüler",
      "Gömülü ve gerçek zamanlı sistemler",
    ],
  },
  quiz: [
    {
      question:
        "1. sekmedeki varsayılan motorda besleme gerilimini 24 V'tan 12 V'a indiriyorsun; öbür her şey aynı. En büyük mekanik güç ve en yüksek verim nasıl değişir?",
      options: [
        "İkisi de yarıya iner",
        "Güç dörtte bire iner, en yüksek verim değişmez",
        "Güç yarıya iner, verim dörtte bire iner",
        "Güç değişmez, verim artar",
      ],
      answer: 1,
      explanation:
        "Boşta hız da duruş torku da V ile orantılıdır; güç, T<sub>s</sub>/2'de ikisinin çarpımının dörtte biri olduğu için V² ile ölçeklenir: 71.43 W'tan 17.86 W'a. Verim ise iki gücün oranıdır; gerilim yarıya inince en verimli noktanın torku da yarıya iner (0.051'den 0.025 N·m'ye) ama oran aynı kalır: sayfa iki durumda da 83.63 % ölçer.",
    },
    {
      question:
        "Varsayılan enkoderde (C = 400 sayım/tur, N = 100, T<sub>w</sub> = 10 ms) M ve T yöntemlerinin kesişme hızı 1 MHz'lik saatle 3000 dev/dk. Zamanlayıcı saatini 10 MHz'e çıkarırsan kesişme hızı yaklaşık kaç olur?",
      options: ["300 dev/dk", "949 dev/dk", "9487 dev/dk", "30 000 dev/dk"],
      answer: 2,
      explanation:
        "n<sub>kesişme</sub> = 60·√(f<sub>saat</sub>/(C·N·T<sub>w</sub>)) olduğu için saat 10 kat artınca kesişme √10 ≈ 3.16 kat yükselir: 3000·3.16 ≈ 9487 dev/dk. Hızlı saat T yöntemini daha yüksek hızlara kadar üstün tutar. 949 dev/dk ise saati 100 kHz'e düşürmenin sonucudur.",
    },
    {
      question:
        "Servoda (L = 0 modeli) K<sub>p</sub>'yi 8'den 16 V/rad'e çıkarıyorsun. Doğal frekans ω<sub>n</sub> ve sönüm oranı ζ ne olur?",
      options: [
        "ω<sub>n</sub> iki katına çıkar, ζ değişmez",
        "ω<sub>n</sub> √2 kat artar, ζ √2 kat azalır",
        "ω<sub>n</sub> değişmez, ζ yarıya iner",
        "İkisi de √2 kat artar",
      ],
      answer: 1,
      explanation:
        "ω<sub>n</sub> = √(K·K<sub>p</sub>/(J·R)) √K<sub>p</sub> ile büyür; ζ'nin payı K<sub>p</sub>'ye bağlı değildir, paydası √K<sub>p</sub> ile büyür. Sayfa ω<sub>n</sub>'yi 63.25'ten 89.44 rad/s'ye, ζ'yi 0.674'ten 0.476'ya taşır; daha az sönüm, aşımın 5.63 %'ten 20.43 %'e çıkmasının nedenidir.",
    },
  ],
  next: [
    {
      href: "otonom-araclar-ve-iha.html",
      title: "Otonom Araçlar ve İHA Laboratuvarı",
      why: "Buradaki servo döngüsünün araç ölçeğindeki eşi: rüzgârlı irtifa tutmada PID, GPS ile ivmeölçeri birleştiren Kalman süzgeci, yol izleme ve algılama menzilinden güvenlik payı.",
    },
    {
      href: "plc-hidrolik-pnomatik-cnc-cadcam.html",
      title: "PLC, Hidrolik, Pnömatik, CNC ve CAD/CAM Sistemleri",
      why: "Motorları ve silindirleri sıraya koyan otomasyon katmanı: tarama çevrimli merdiven mantığı, pnömatik silindir sıralaması, G-kodu yorumlama ve takım yolu hesabı.",
    },
    {
      href: "elektronik-muhendisligi.html",
      title: "Elektronik Mühendisliği: Analog Devre Laboratuvarı",
      why: "Sensör ile ADC arasındaki analog katman: diyot ve doğrultucu, transistörlü yükselteç, işlemsel yükselteç ve RC alçak geçiren süzgeç; örtüşmeyi örneklemeden önce durduran süzgeç türü.",
    },
    {
      href: "makine-muhendisligi.html",
      title: "Makine Mühendisliği: Çevrim, Dişli, Titreşim ve Isı",
      why: "Buradaki kayıpsız dişlinin diş sayısıyla kurulmuş hâli: kademeli dişli zincirinde devir, tork ve kavrama verimiyle kaybolan güç.",
    },
  ],
  sources: [
    {
      title: "Wikipedia · PID controller",
      url: "https://en.wikipedia.org/wiki/PID_controller",
      note: "Watt regülatörü, Maxwell, Whitehead torpidosu, Minorsky ve USS New Mexico denemeleri; PID terimleri, integral şişmesi, ileri besleme ve dijital uygulama (İngilizce).",
    },
    {
      title: "Wikipedia · Mechatronics",
      url: "https://en.wikipedia.org/wiki/Mechatronics",
      note: "Kelimenin Yaskawa'daki kökeni, marka tescili, Servomechanisms, Inc.'in 1951 reklamı ve disiplinin alt alanları (İngilizce).",
    },
    {
      title: "MIT OpenCourseWare · 2.004 Dynamics and Control II",
      url: "https://ocw.mit.edu/courses/2-004-dynamics-and-control-ii-spring-2008/",
      note: "Elektrik ve mekanik sistemlerin toplu parametreli modelleri, basamak ve rampa yanıtı, frekans yanıtı ve geri beslemeyle kompanzasyon; ders notları ve laboratuvarlar (İngilizce).",
    },
    {
      title: "Wikipedia · Aliasing",
      url: "https://en.wikipedia.org/wiki/Aliasing",
      note: "Örneklenmiş sinyalde frekansların katlanması, Nyquist sınırı ve örneklemeden önce alçak geçiren süzgeç gereği (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
