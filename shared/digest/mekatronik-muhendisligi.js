window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["mekatronik-muhendisligi"] = {
  slug: "mekatronik-muhendisligi",
  title: "Mekatronik: Kendi Hatasını Düzelten Makineler",
  field: "Mühendislik",
  level: "Lise",
  minutes: 35,
  tagline:
    "Bir makineyi akıllı yapan güçlü motoru değil, kendi hatasını ölçüp düzeltebilmesidir. Sensör, kontrolcü ve motor arasında saniyede onlarca ila binlerce kez dönen tek bir döngü: geri besleme.",
  hook: "Gözlerini kapat ve işaret parmağını burnunun ucuna götür. Büyük ihtimalle ıskalamazsın: kasların ve eklemlerin kolunun nerede olduğunu beynine sürekli bildirir, beynin de yolda düzeltir. Bir robota aynı şeyi yaptırmak istersen ona hissetmek için sensör, karar vermek için kontrolcü, kıpırdamak için motor vermelisin; en önemlisi de ıskaladığını fark etme yeteneğini.",
  bigIdea:
    "Mekatronik bir sistem istediğini ölçtüğüyle karşılaştırır ve aradaki <strong>hatayı</strong> sürekli küçülten bir komut üretir; makineyi akıllı kılan bu <strong>kapalı çevrim geri beslemedir</strong>, ama döngü fazla sert ya da fazla geç tepki verirse aynı geri besleme makineyi sallar.",
  story: [
    "1788'de James Watt, ortağı Matthew Boulton'ın önerisiyle buhar makinesine dönen iki ağır top ekledi. Makine hızlandıkça toplar merkezkaç etkisiyle açılıp yükseliyor, bir kol düzeneği buhar vanasını kısıyordu; makine yavaşlayınca toplar iniyor, vana açılıyordu. Fikrin kendisi yeni değildi; 17. yüzyılda yel değirmenlerinde değirmen taşlarının aralığını ayarlamak için benzer bir düzenek kullanılmıştı. Ama Watt'ın <strong>merkezkaç regülatörü</strong> buhar makineleriyle birlikte bütün sanayiye yayıldı ve kendi hızını kendisi tutan makinenin simgesi oldu. İçinde bugünkü her mekatronik sistemin üç parçası vardı: ölçen (toplar), karar veren (kol oranı) ve uygulayan (vana). İki de kusuru vardı: yük artınca makine hedef hızın biraz altında kalıyordu ve makineler hızlandıkça bazı regülatörler vanayı açıp kapayarak durmadan salınmaya başladı.",
    "Bu salınımın ilk sistematik kararlılık analizini, elektromanyetizmanın denklemlerini yazan James Clerk Maxwell yaptı. 1868'de yayımlanan <em>On Governors</em> (Regülatörler Üzerine) makalesinde regülatörün hareketini diferansiyel denklemlerle yazdı ve sistemin sakinleşip sakinleşmeyeceğinin bu denklemlerin köklerine bağlı olduğunu gösterdi. Basit durumlar için koşulları buldu, genel problemi ise matematikçilere bıraktı. Edward Routh 1870'lerde, Adolf Hurwitz ise 1895'te ondan bağımsız olarak bu soruyu çözdü: bir sistemin kararlı olup olmadığını denklemi çözmeden söyleyen ölçütler buldular. Kontrol kuramı, bir buhar makinesinin titremesinden doğdu.",
    "1922'de Rus asıllı Amerikalı mühendis Nicolas Minorsky, ABD Donanması için otomatik dümen üzerinde çalışırken deneyimli dümencileri izledi. İyi bir dümenci yalnızca geminin rotadan ne kadar saptığına bakmıyordu; sapmanın ne zamandır sürdüğünü ve ne hızla büyüdüğünü de hesaba katıyordu. Minorsky bu üç sezgiyi tek bir denkleme döktü: bugün <strong>PID</strong> dediğimiz denetleyici. Yalnızca sapmaya orantılı dümen, sürekli esen sert bir rüzgârda gemiyi rotanın biraz dışında bırakıyordu; geçmişi biriktiren integral terimi bu kalıcı sapmayı siliyor, değişim hızına bakan türev terimi salınımı sönümlüyordu. Aynı üç terim sonra basınçlı havayla çalışan fabrika kontrolcülerine, oradan elektroniğe ve bugün sayısız PLC ve mikrodenetleyici yazılımına taşındı.",
    "1961'de New Jersey'deki bir General Motors fabrikasında Unimate işe başladı: George Devol'un 1954'te patent başvurusu yaptığı, Devol ve Joseph Engelberger'in kurduğu Unimation şirketinin ürettiği, yaklaşık 1.8 ton ağırlığında, hidrolik kollu ve programını dönen bir bellek tamburunda saklayan ilk endüstriyel robot. Kalıptan çıkan sıcak döküm parçalarını insan eli değmeden taşıyordu. Mekanik, elektronik ve kontrol artık tek bir makinede iç içeydi ama bu birleşimin bir adı yoktu. 1969'da Japon Yaskawa Electric şirketinde mühendis Tetsuro Mori, <em>mechanics</em> ile <em>electronics</em> kelimelerini birleştirerek <strong>mechatronics</strong> kelimesini önerdi. (Kayıtlar kelimenin 1951'de bir Amerikan dergi reklamında da geçtiğini gösteriyor; onu bir disiplinin adı yapan Yaskawa'dır.) 1980'lerde mikroişlemciler makinelerin içine girince elektroniğin yanına yazılım da eklendi. Sayfadaki altı panel bu zincirin halkalarıdır: döngü şeması, duyular, kaslar, bir robot kol, fabrikanın beyni ve günlük hayattaki uygulamalar.",
  ],
  core: [
    {
      heading: "Algıla, karar ver, hareket et ve yeniden ölç",
      body: "Her mekatronik sistem aynı döngüdür. <strong>Sensör</strong> fiziksel bir büyüklüğü (açı, sıcaklık, mesafe) elektrik sinyaline çevirir. <strong>Kontrolcü</strong> bu ölçümü hedefle karşılaştırır ve bir komut hesaplar. <strong>Aktüatör</strong> komutu harekete, ısıya ya da kuvvete çevirir. Döngüyü kapatan şey, hareketin sonucunun yeniden ölçülmesidir. Sayfadaki iki motor kartı farkı iyi gösterir: <em>Step Motor</em> kartı 'açık çevrim' der; sürücü darbe sayar ve motorun gerçekten döndüğünü varsayar. <em>Servo Motor</em> kartı 'kapalı çevrim' der; mile bağlı bir <strong>enkoder</strong>, yani dönme açısını sayan bir sensör, gerçek konumu kontrolcüye geri bildirir. Açık çevrim ucuz ve basittir ama bir şey ters giderse haberi olmaz.",
      formula: "e = r − y",
      formulaNote:
        "r ayar noktası (istenen değer), y ölçülen değer, e hata. Basit bir geri besleme kontrolcüsü dünyayı yalnızca e üzerinden görür: hata sıfırsa yapacak bir şeyi yoktur.",
    },
    {
      heading: "Orantılı kontrol ve inatçı kalıcı hata",
      body: "En doğal fikir, düzeltmeyi hatayla orantılı yapmaktır: hata büyükse sert, küçükse yumuşak it. Watt'ın regülatörü tam olarak budur. Ama bir tuzak var. Robot kolu yerçekimi sürekli aşağı çekiyorsa, motorun bu çekişe karşı koyması için sürekli bir komut gerekir; orantılı kontrolcü ise komut üretebilmek için sıfırdan farklı bir hataya muhtaçtır. Sonuçta kol, hedefin biraz altında, komutun yerçekimini tam dengelediği noktada durur. Kazancı artırmak bu <strong>kalıcı durum hatasını</strong> küçültür ama sıfırlamaz; üstelik kazanç büyüdükçe sistem hedefi aşıp salınmaya yatkınlaşır. Kontrol mühendisliğinin temel gerilimi budur: hız ile sakinlik arasında bir pazarlık.",
      formula: "u = K<sub>p</sub>·e,   e<sub>kalıcı</sub> = d / K<sub>p</sub>",
      formulaNote:
        "u komut, K<sub>p</sub> orantı kazancı, d sabit bozucu etki. İkinci formül, komutu anında izleyen ideal bir motor modelinde geçerlidir; çözümlü örnekte adım adım çıkıyor.",
    },
    {
      heading: "PID: geçmiş, şimdi ve gelecek",
      body: "Minorsky'nin dümencisi üç soru soruyordu. <strong>P</strong> (orantılı) şimdiye bakar: şu an ne kadar uzağım? <strong>I</strong> (integral) geçmişe bakar: ne zamandır uzağım? Hata küçük ama inatçıysa integral her an biraz daha büyür, ta ki komut bozucu etkiyi tek başına dengeleyip hatayı sıfıra indirene kadar. <strong>D</strong> (türev) geleceğe bakar: hata ne hızla değişiyor? Kol hedefe hızla yaklaşıyorsa D frene basar ve aşmayı azaltır. Her terimin bedeli vardır: fazla integral aşma ve salınım yaratır, motor sınırına dayanınca (doyma) integral boşuna şişmeye devam eder, buna 'integral sarması' (windup) denir; türev ise sensör gürültüsünü büyütür, bu yüzden pratikte çoğu zaman süzülerek kullanılır ya da hiç kullanılmaz.",
      formula: "u(t) = K<sub>p</sub>·e + K<sub>i</sub>∫e dt + K<sub>d</sub>·de/dt",
      formulaNote:
        "Üç kazanç sistemin fiziğine göre ayarlanır; buna döngü ayarı denir. 1940'larda Ziegler ve Nichols bu ayar için bugün hâlâ öğretilen deneysel bir yöntem yayımladı.",
    },
    {
      heading: "Örnekleme: döngü aslında adım adım döner",
      body: "Bir mikrodenetleyici ya da PLC dünyayı sürekli izlemez; belli aralıklarla bakar. Sayfadaki PLC panelindeki 'Girişleri Oku → Programı Çalıştır → Çıkışları Güncelle → Tekrarla' zinciri tam budur ve bir tur milisaniyeler sürer. Ardışık iki ölçüm arasındaki süreye <strong>örnekleme periyodu</strong> (T<sub>s</sub>) denir. Bu sürede kontrolcü kördür ve son hesapladığı komutu uygulamaya devam eder. Örnekleme yavaş ve kazanç büyükse kontrolcü, hedefe çoktan varmış bir kolu itmeye devam eder ve hedefi aşar. Bu yüzden hızlı hareketler hızlı döngü ister: sayfadaki haberleşme kartı EtherCAT için 100 μs'lik çevrimden söz eder. Bilgisayarda integral bir toplama, türev ise iki ardışık ölçümün farkına dönüşür.",
      formula:
        "u[k] = K<sub>p</sub>e[k] + K<sub>i</sub>T<sub>s</sub>Σe[j] + K<sub>d</sub>(e[k] − e[k−1])/T<sub>s</sub>",
      formulaNote:
        "k örnek numarası. Toplam ilk örnekten k'ya kadardır. Çözümlü örnekteki basit modelde kararlılık koşulu, K<sub>p</sub>·T<sub>s</sub> çarpımının 0 ile 2 arasında kalmasıdır.",
    },
    {
      heading: "İleri kinematik: açılardan uç noktaya",
      body: "Sayfadaki robot kolun iki eklemi vardır: θ₁ birinci kolu tabana göre, θ₂ ikinci kolu birinci kola göre döndürür. Bu yüzden ikinci kolun yere göre açısı θ₁ + θ₂'dir. Uç noktanın yeri iki vektörün toplamıdır; buna <strong>ileri kinematik</strong> denir ve her zaman tek bir cevabı vardır. Tersi, yani 'uç şu noktaya gitsin, açılar ne olmalı?' sorusu <strong>ters kinematiktir</strong> ve daha zordur: erişilebilir çoğu nokta için 'dirsek yukarı' ve 'dirsek aşağı' olmak üzere iki çözüm vardır, erişilemeyen noktalar için hiç yoktur. Uç noktanın tabana uzaklığı yalnızca θ₂'ye bağlıdır; θ₁ ise bu uzaklıkta kolu tabanın etrafında döndürür.",
      formula: "x = l₁cos θ₁ + l₂cos(θ₁+θ₂),   y = l₁sin θ₁ + l₂sin(θ₁+θ₂)",
      formulaNote:
        "Uzaklık r = √(l₁² + l₂² + 2l₁l₂cos θ₂). Sayfada l₁ = 90 px, l₂ = 70 px: θ₂ = 0° iken r = 160 px, θ₂ = 180° iken 20 px; çalışma alanı bu iki çember arasındaki halkadır.",
    },
  ],
  lab: {
    intro:
      "Sayfada sayı üreten tek düzenek <strong>Robotik — Kinematik ve ROS</strong> panelindeki tuvaldir. <strong>Eklemi Döndür</strong> düğmesi yalnızca birinci eklemi (θ₁) 30° çevirir; θ₂ hep 30° kalır. <strong>Sıfırla</strong> θ₁ = 45°, θ₂ = 30° konumuna döner. Tuvalin altındaki satır 'θ₁=45° · θ₂=30° · Uç konumu (tabana göre, y yukarı): (82, 131) px · Çalışma alanı: halka (20–160 px)' biçimindedir. Taban tuvalin ortasındadır ve koordinatlar ona göredir: x sağa, y yukarı doğru büyür, ekran genişliği sayıları değiştirmez. İnce çizgiler x ve y eksenlerini, iki kesikli çember çalışma alanı halkasının 20 ve 160 px'lik sınırlarını gösterir. Öteki paneller tıklanınca açıklama kutusunu dolduran kartlardır: altı sensör, altı aktüatör, dört otomasyon ve dört uygulama kartı. En üstteki döngü şeması durağandır; geri beslemeyi canlandıran bir simülasyon yok, onu çözümlü örnekte kâğıt üzerinde yapıyoruz.",
    experiments: [
      {
        title: "Uç noktayı önce hesapla, sonra oku",
        predict:
          "θ₁ = 45°, θ₂ = 30°, kollar 90 ve 70 piksel. Uç nokta tabanın kaç piksel sağında ve kaç piksel yukarısında olur? İkinci kolun yere göre açısını 30° mi, 75° mi alacaksın?",
        do: "Önce kâğıtta hesapla. Sonra Sıfırla'ya bas ve tuvalin altındaki satırdaki 'Uç konumu' değerini oku; sayılar zaten tabana göredir ve y yukarı doğru pozitiftir.",
        observe:
          "Satır 'Uç konumu (tabana göre, y yukarı): (82, 131) px' yazar; tuvalde uç noktanın yanındaki etiket de 'Uç: (82, 131)' gösterir. Hesap: 90·cos 45° + 70·cos 75° ≈ 63.6 + 18.1 = 81.8 ve 90·sin 45° + 70·sin 75° ≈ 63.6 + 67.6 = 131.2. Sayfa en yakın tam sayıya yuvarlar; uyuşuyor.",
        explain:
          "θ₂ göreli bir açıdır: ikinci kol birinci kolun doğrultusundan 30° döner, yere göre 45° + 30° = 75°'dedir. İleri kinematik, eklem açılarından uç noktayı bu vektör toplamıyla bulur. Ekranda ise y aşağı doğru büyür; sayfa kolu çizerken y'nin işaretini çevirir, satıra matematikteki gibi yukarı pozitif y'yi yazar. Robot yazılımları da hep böyle bir koordinat dönüşümüyle başlar.",
      },
      {
        title: "Tek eklemle nereye ulaşılır?",
        predict:
          "Eklemi Döndür'e art arda basarsan uç nokta 'halka (20–160 px)' bölgesinin her yerine uğrar mı? Uç noktanın tabana uzaklığı değişir mi? Başa dönmek için kaç basış gerekir?",
        do: "Sıfırla, sonra Eklemi Döndür'e 12 kez bas ve her seferinde satırdaki θ₁ ile uç konumunu not et. En az iki konum için tabana uzaklığı √(x² + y²) ile hesapla.",
        observe:
          "θ₁ sırasıyla 75°, 105°, …, 345°, 15°, 45° olur; 12. basışta başlangıca döner. Örnek: 75°'de (5, 155), 165°'te (−155, 5), 255°'te (−5, −155), 345°'te (155, −5). Hepsinde uzaklık ≈ 155 px: uç, tuvaldeki dıştaki kesikli çemberin (160 px) hemen içinde dolaşır; iç halkaya ve aradaki bölgeye hiç uğramaz.",
        explain:
          "θ₂ sabitken uç, tabanın etrafında r = √(90² + 70² + 2·90·70·cos 30°) ≈ 154.6 px yarıçaplı tek bir çember çizer. Halkanın geri kalanına ulaşmak için θ₂'yi değiştirmek gerekir, sayfada ise bunun düğmesi yok. Üç boyutta ucun hem konumunu hem yönünü seçebilmek için altı serbestlik derecesi gerekir; yaygın endüstriyel kolların altı eklemli olmasının nedeni budur.",
      },
      {
        title: "Step motor bu 30°'yi atabilir mi?",
        predict:
          "Eklemi Döndür'ün 30°'lik adımını 1.8°/adımlık bir step motorla yapmak istiyorsun. Kaç adım gerekir? Tam sayı çıkar mı?",
        do: "Aktüatörler panelinde Step Motor kartına tıkla; adım açısını ve mikro adım satırını oku. Sonra Servo Motor kartını ve Sensörler panelindeki Pozisyon / Enkoder kartını aç ve iki motorun konumu nasıl bildiğini karşılaştır.",
        observe:
          "Kart 1.8°/adım (200 adım/tur) ve 1/16 mikro adımda 3200 adım/tur yazar. 30 / 1.8 = 16.67: tam sayı değil. 16 adım 28.8°, 17 adım 30.6° verir. Mikro adımla bir adım 0.1125° olur; 267 mikro adım 30.04°'ye götürür, hata 0.04°'ye iner. Step kartı 'açık çevrim' ve 'adım kaçırma' der; servo kartı 'enkoder geri beslemesi' der.",
        explain:
          "Step motor açısı ancak adımın katları olabilir; bir dişli oranı ya da mikro adım bu kuantumu küçültür ama sıfırlamaz. Asıl risk başka: sürücü darbe sayar ve motorun her darbeyi izlediğini varsayar. Yük fazlaysa motor adım kaçırır ve kontrolcünün bundan haberi olmaz. Servoda enkoder gerçek açıyı ölçer, kontrolcü kalan hatayı görüp düzeltir. 3B yazıcılardaki katman kaymaları çoğu zaman bu kör noktanın izidir.",
      },
      {
        title: "Mesafe sensörü aslında saat tutar",
        predict:
          "HC-SR04 1 m uzaktaki bir duvara ses gönderiyor. Yankı kaç milisaniye sonra döner? Sensör 20 °C'ye göre ayarlıysa ve oda 0 °C ise kaç metre okur?",
        do: "Sensörler panelinde Ultrasonik / Lidar kartına tıkla, ölçüm ilkesini ve 2 cm–4 m aralığını oku. Sonra Sıcaklık Sensörü kartını aç. Havada ses hızı için c ≈ 331.3 + 0.606·T m/s yaklaşımını kullan (T °C).",
        observe:
          "20 °C'de c ≈ 343 m/s; ses 2 m gidip döner: 2 / 343 ≈ 5.8 ms. 4 m'lik üst sınır ≈ 23.3 ms, 2 cm'lik alt sınır ≈ 117 μs eder. 0 °C'de c ≈ 331 m/s, yankı ≈ 6.04 ms sonra gelir; 343 m/s varsayan hesap 343 × 0.00604 / 2 ≈ 1.036 m okur: yaklaşık 3.6 cm fazla.",
        explain:
          "Sensör mesafeyi değil zamanı ölçer; mesafe, ses hızı hakkındaki bir varsayımla hesaplanır. Varsayım yanlışsa okuma da yanlıştır. Çözüm ikinci bir sensördür: bir termistör havanın sıcaklığını ölçer, kontrolcü ses hızını düzeltir. IMU kartındaki 'Kalman/Madgwick filtresi' aynı fikrin ileri hâlidir: her sensörün zayıf yanını öbürüyle kapatan <strong>sensör füzyonu</strong>.",
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
      body: "Maxwell'in makalesiyle aynı yıllarda, 1868 civarında Robert Whitehead torpidosunu sabit derinlikte tutmaya uğraşıyordu. Yalnızca basınç sensörüyle çalışan düzenek dalıp çıkarak salınıyordu. Whitehead basınç ölçerin yanına, torpidonun burnunun ne kadar aşağı ya da yukarı baktığını ölçen bir sarkaç ekledi. Burnun eğimi derinliğin değişim hızını ele verir; sarkaç bugünkü türev teriminin işini görüyordu. Salınım söndü. Whitehead, sarkaçla basınç ölçeri birleştiren bu düzeneğe, işleyişi hakkında ipucu vermesin diye yalnızca 'The Secret' (Sır) adını verdi.",
    },
    {
      title: "Bir zamanlar tescilli marka olan kelime",
      body: "Yaskawa, 'mechatronics' kelimesini 1971'de Japonya'da tescilli marka olarak kaydettirdi; yani bir süre bu kelime bir şirkete aitti. Şirket daha sonra kelimenin kullanım hakkını herkese bıraktı ve kelime pek çok dile girdi. Bugün Türkiye'de de birçok üniversitede 'Mekatronik Mühendisliği' adını taşıyan bölümler var; bu adı serbestçe kullanabilmeleri, bir şirketin markasından vazgeçmesi sayesinde.",
    },
  ],
  worked: {
    title: "Robot eklemini hedefe getirmek: P ve PI kontrol, adım adım",
    prompt:
      "Bir eklem 45°'de duruyor ve 75°'ye gitmeli (sayfadaki Eklemi Döndür'ün bir adımı). Kontrolcü her T<sub>s</sub> = 0.1 s'de enkoderi okur, hatayı hesaplar ve motora ω = K<sub>p</sub>·e açısal hız komutu verir; motor bir sonraki ölçüme kadar bu hızla döner. K<sub>p</sub> = 5 s⁻¹ ve K<sub>p</sub> = 25 s⁻¹ için hatanın gidişini bul. Sonra yerçekimini ekle: bu basit modelde yerçekimi, motorun hızından her an 10 °/s çalan sabit bir bozucu etkidir.",
    steps: [
      "Modeli kur. Bir örnekte açı T<sub>s</sub>·ω kadar değişir: θ[k+1] = θ[k] + T<sub>s</sub>·K<sub>p</sub>·e[k]. Hedef sabit olduğu için hata e[k+1] = e[k] − T<sub>s</sub>K<sub>p</sub>e[k] = (1 − K<sub>p</sub>T<sub>s</sub>)·e[k] olur. Birimler: K<sub>p</sub> (s⁻¹) × T<sub>s</sub> (s) boyutsuzdur; parantez, hatanın her örnekte çarpıldığı sayıdır.",
      "K<sub>p</sub> = 5 s⁻¹: çarpan 1 − 0.5 = 0.5. Başlangıçta e = 30°, komut ω = 150 °/s; 0.1 s'de kol 15° döner, hata 15° kalır. Sonra 7.5°, 3.75°, 1.88°, 0.94°: 0.5 saniyede hata 1°'nin altına iner, kol hedefi hiç aşmaz.",
      "K<sub>p</sub> = 25 s⁻¹: çarpan 1 − 2.5 = −1.5. İlk komut 750 °/s; 0.1 s'de kol 75° döner ve hedefi 45° geçer: e = −45°. Sonra +67.5°, −101.25°, +151.9°: her örnekte işaret değiştirip 1.5 katına çıkar. Döngü kararsızdır. Kararlılık için |1 − K<sub>p</sub>T<sub>s</sub>| değeri 1'den küçük olmalı, yani K<sub>p</sub>T<sub>s</sub> çarpımı 0 ile 2 arasında kalmalı; burada K<sub>p</sub> 20 s⁻¹'nin altında kalmalı.",
      "Yerçekimini ekle: θ[k+1] = θ[k] + T<sub>s</sub>(K<sub>p</sub>e[k] − 10 °/s). K<sub>p</sub> = 5 s⁻¹ için bu e[k+1] = 0.5·e[k] + 1° verir. Hata 30° → 16° → 9° → 5.5° → 3.75° → … diye azalır ama 2°'ye yerleşir: o noktada komut 5 × 2 = 10 °/s olur ve yerçekimini tam dengeler. Kalıcı hata d/K<sub>p</sub> = 10/5 = 2°.",
      "İntegrali ekle (K<sub>i</sub> = 5 s⁻²) ve yerçekimli hareketi e = 30°'den yeniden başlat: ω = K<sub>p</sub>e[k] + K<sub>i</sub>T<sub>s</sub>Σe[j]. Hata sürdükçe toplam büyür; sonunda 10 °/s'yi integral tek başına sağlar ve hata sıfıra iner. Bedeli: bilgisayarda çalıştırınca kol yaklaşık 0.7 s'de hedefi 2.6° aşar, sonra geri döner; 2 s'de hata −0.66°, 6 s'de −0.005°. Aşmanın kaynağı, toplamın hatırladığı ilk büyük hatalardır. Kol önce yalnız P ile 2°'de yerleşip integral ancak o zaman açılsaydı, hata hiç aşmadan sıfıra inerdi.",
    ],
    result:
      "K<sub>p</sub>T<sub>s</sub> = 0.5'te hata her örnekte yarıya iner; 2.5'te her örnekte 1.5 katına çıkıp işaret değiştirir. Aynı kontrolcü, yalnızca kazancı yüzünden ya mükemmel ya da tehlikelidir. Sabit bir bozucu varken P tek başına 2°'lik kalıcı hata bırakır; integral terimi onu siler, ama büyük bir başlangıç hatasından yola çıkınca bunu yaklaşık 2.6°'lik bir aşma pahasına yapar.",
  },
  misconceptions: [
    {
      myth: "Kazancı artırmak, yani hataya daha sert tepki vermek, kontrolü her zaman iyileştirir.",
      truth:
        "Bir noktaya kadar sistemi hızlandırır ve kalıcı hatayı küçültür. Ama ölçüm ile tepki arasında her zaman bir gecikme vardır: örnekleme aralığı, motorun ataleti, sensörün tepki süresi. Kazanç büyüdükçe kontrolcü hedefe varmış bir kolu itmeye devam eder ve hedefi aşar. Çözümlü örnekte K<sub>p</sub> 5 s⁻¹'den 25 s⁻¹'ye çıkınca sistem sakin yaklaşmaktan büyüyen salınıma geçiyor.",
    },
    {
      myth: "Step motor adım saydığı için konumunu her zaman bilir.",
      truth:
        "Konumu bilen motor değil, darbeleri sayan sürücüdür ve sürücü motorun her darbeyi izlediğini varsayar. Yük fazla, ivme yüksek ya da rezonans varsa motor adım kaçırır ve kimse fark etmez; sayfadaki Step Motor kartı da bunu dezavantaj olarak yazar. Konumu gerçekten bilmek için bir enkoderle döngüyü kapatmak gerekir.",
    },
    {
      myth: "Sensörün ekranda gösterdiği sayı ölçülen büyüklüğün kendisidir.",
      truth:
        "Sensörlerin çoğu başka bir şeyi ölçüp çevirir: ultrasonik sensör zamanı, termokupl milivolt düzeyinde bir gerilimi, yük hücresi bir direnç değişimini ölçer. Çeviri varsayımlara (ses hızı, kalibrasyon) dayanır ve her ölçüme gürültü karışır. Türev terimi bu gürültüyü büyüttüğü için PID'de çoğu zaman süzgeçle kullanılır.",
    },
    {
      myth: "Robot kolun ucunu belli bir noktaya götüren tek bir açı çifti vardır.",
      truth:
        "İki eklemli bir kolda erişilebilir noktaların çoğuna 'dirsek yukarı' ve 'dirsek aşağı' iki farklı açı çiftiyle ulaşılır; çalışma alanı halkasının dışındaki noktalara hiç ulaşılamaz. Sayfanın 'ters kinematik çok çözümlü olabilir' notunun anlamı budur. Bilekli tipik altı eklemli endüstriyel kollarda aynı uç konumu ve yönü için sekiz farklı açı takımı bulunabilir; yazılım bunlardan eklem sınırlarına ve engellere takılmayanı seçer.",
    },
  ],
  glossary: [
    {
      term: "Geri besleme",
      definition:
        "Bir sistemin çıktısını ölçüp girişine geri vererek davranışını düzeltmesi; hatayı küçültüyorsa negatif geri besleme denir.",
    },
    {
      term: "Açık / kapalı çevrim",
      definition:
        "Açık çevrimde komut sonucu ölçülmeden verilir; kapalı çevrimde sonuç ölçülür ve bir sonraki komut bu ölçüme göre hesaplanır.",
    },
    {
      term: "Ayar noktası (r)",
      definition:
        "Kontrolcünün ulaşmaya çalıştığı hedef değer; örneğin istenen eklem açısı ya da fırın sıcaklığı.",
    },
    {
      term: "Hata (e)",
      definition:
        "Ayar noktası ile ölçülen değerin farkı, e = r − y; basit bir geri besleme kontrolcüsünün tepki verdiği büyüklük.",
    },
    {
      term: "PID denetleyici",
      definition:
        "Komutu hatanın kendisinin, zaman içindeki toplamının ve değişim hızının ağırlıklı toplamı olarak hesaplayan kontrol yasası.",
    },
    {
      term: "Kalıcı durum hatası",
      definition:
        "Sistem yerleştikten sonra kalan sabit hata; sabit bir bozucu karşısında yalnız orantılı kontrol bunu sıfırlayamaz.",
    },
    {
      term: "Örnekleme periyodu (Tₛ)",
      definition:
        "Dijital kontrolcünün ardışık iki ölçümü arasındaki süre; bu aralıkta son komut değişmeden uygulanır.",
    },
    {
      term: "Serbestlik derecesi (DOF)",
      definition:
        "Bir mekanizmanın konumunu tam olarak belirlemek için gereken bağımsız değişken (ör. eklem açısı) sayısı; sayfadaki düzlemsel kol iki eklemle 2 serbestlik derecelidir.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede geri besleme bir sezgidir: hatayı ölç, ters yönde it. Mekatronik ve kontrol derslerinde bu sezgi bir dile dönüşür. Motoru, kolu ya da fırını diferansiyel denklemlerle modellersin; <strong>Laplace dönüşümü</strong> bu denklemleri cebire çevirir ve sistem bir 'transfer fonksiyonu' olur. Maxwell'in 1868'de baktığı kökler burada 'kutuplar' adını alır: hepsi karmaşık düzlemin sol yarısındaysa sistem kararlıdır. Bode ve Nyquist diyagramları, çözümlü örnekteki 'kazanç fazla olunca kararsızlık' olgusunu frekans dilinde ölçer. Dijital kontrolde aynı iş Z-dönüşümüyle yapılır; örnekteki 'K<sub>p</sub>T<sub>s</sub> 0 ile 2 arasında kalsın' koşulu bu analizin en basit örneğidir.",
      "Robotik tarafında ileri kinematik matrislerle yazılır: her eklem bir dönme ve öteleme matrisidir, kol bunların çarpımıdır. Ters kinematik doğrusal olmayan denklem sistemleri, hız ilişkileri ise <strong>Jakobiyen</strong> matrisi demektir. Sensör tarafında olasılık girer: Kalman filtresi gürültülü ölçümleri bir modelle birleştirip en iyi tahmini üretir; telefonların ve dronların yönünü bilmesi buna ya da benzeri füzyon filtrelerine dayanır. Bütün bunlar, gerçek zamanlı çalışan gömülü yazılımın içinde, mikrodenetleyicinin her milisaniyesine sığmak zorundadır. Mekatronik, makine, elektrik ve bilgisayar mühendisliğinin buluştuğu yerdir; bu üç alandan birini seçsen bile bu döngüyle karşılaşırsın.",
    ],
    topics: [
      "Sistem dinamiği ve modelleme",
      "Laplace ve Z-dönüşümü",
      "Kararlılık: kutuplar, Routh–Hurwitz, Nyquist",
      "PID ayarı ve durum uzayı kontrolü",
      "Robot kinematiği ve Jakobiyen",
      "Kalman filtresi ve sensör füzyonu",
      "Gömülü ve gerçek zamanlı sistemler",
    ],
  },
  quiz: [
    {
      question:
        "Çözümlü örnekteki modelde T<sub>s</sub> = 0.02 s ise hangi orantı kazancı döngüyü kararsız yapar?",
      options: [
        "K<sub>p</sub> = 20 s⁻¹",
        "K<sub>p</sub> = 50 s⁻¹",
        "K<sub>p</sub> = 90 s⁻¹",
        "K<sub>p</sub> = 150 s⁻¹",
      ],
      answer: 3,
      explanation:
        "Kararlılık için K<sub>p</sub>T<sub>s</sub> çarpımı 0 ile 2 arasında kalmalı, yani K<sub>p</sub> 100 s⁻¹'nin altında kalmalı. 150 × 0.02 = 3 olur; hata her örnekte (1 − 3) = −2 ile çarpılır: işaret değiştirip iki katına çıkar. Daha hızlı örnekleme daha yüksek kazanca izin verir.",
    },
    {
      question:
        "Yerçekimi bir robot kolu sürekli aşağı çekiyor ve yalnız orantılı kontrolle kol hedefin biraz altında duruyor. Bu kalıcı hatayı hangi terim sıfırlar?",
      options: [
        "Türev terimi, çünkü değişimi önceden sezer",
        "İntegral terimi, çünkü hata sürdükçe komutu büyütür",
        "Kazancı iki katına çıkarmak",
        "Örnekleme periyodunu uzatmak",
      ],
      answer: 1,
      explanation:
        "Kol durduğunda hata sabittir, değişim hızı sıfırdır; türev terimi bir şey üretmez. Kazancı artırmak hatayı küçültür ama sıfırlamaz. İntegral, küçük ama inatçı hatayı biriktirerek komutu, yerçekimini tek başına dengeleyene kadar büyütür; ancak o zaman hata sıfır olabilir.",
    },
    {
      question:
        "Sayfadaki kolda yalnızca θ₁ değişiyor, θ₂ = 30° sabit. Eklemi Döndür'e art arda bastıkça uç nokta ne çizer?",
      options: [
        "20–160 px halkasının tamamını tarar",
        "Taban merkezli, yaklaşık 155 px yarıçaplı bir çember",
        "Tabandan uzaklaşan bir sarmal",
        "Yatay bir doğru parçası",
      ],
      answer: 1,
      explanation:
        "Uç noktanın tabana uzaklığı yalnızca θ₂'ye bağlıdır: √(90² + 70² + 2·90·70·cos 30°) ≈ 154.6 px. θ₁ bu uzaklığı değiştirmez, yalnızca kolu tabanın etrafında döndürür. Halkanın tamamına ulaşmak için θ₂'nin de değişmesi gerekir.",
    },
  ],
  next: [
    {
      href: "plc-hidrolik-pnomatik-cnc-cadcam.html",
      title: "PLC, Hidrolik, Pnömatik, CNC ve CAD/CAM Sistemleri",
      why: "Bu sayfadaki PLC kartlarının canlı hâli: tarama çevrimini adım adım işleyen bir merdiven yorumlayıcısı, sinyal çakışmasını kaskadla çözen pnömatik sıralama, G-kodu yorumlayıcısı ve takım yolu telafisi.",
    },
    {
      href: "otonom-araclar-ve-iha.html",
      title: "Otonom Araçlar ve İHA Laboratuvarı",
      why: "Algıla–kestir–planla–denetle döngüsünün dört halkası canlı deney olarak: İHA irtifasında PID, gürültülü konumda Kalman süzgeci, yol izlemede pure pursuit ve Stanley, algılama menzili ile durma mesafesi.",
    },
    {
      href: "matris-donusumleri.html",
      title: "Matris Dönüşümleri (2B)",
      why: "'Açı (°)' kaydırıcısıyla bir şekli döndür: robot kolun her eklemi tam bu dönme matrisini uygular.",
    },
    {
      href: "diferansiyel-denklemler.html",
      title: "Diferansiyel Denklemler ve Dinamik Sistemler",
      why: "Sönümlü salınım, kararlılık ve Euler adımı: kontrol döngüsünün matematiksel iskeleti ve örneklemenin akrabası.",
    },
  ],
  sources: [
    {
      title: "Wikipedia · PID controller",
      url: "https://en.wikipedia.org/wiki/PID_controller",
      note: "Watt regülatörü, Maxwell, Whitehead torpidosu, Minorsky ve USS New Mexico denemeleri; PID terimleri, ayar yöntemleri ve dijital uygulama (İngilizce).",
    },
    {
      title: "Wikipedia · Mechatronics",
      url: "https://en.wikipedia.org/wiki/Mechatronics",
      note: "Kelimenin Yaskawa'daki kökeni, marka tescili, 1951 reklamı ve disiplinin alt alanları (İngilizce).",
    },
    {
      title: "MIT OpenCourseWare · 2.004 Dynamics and Control II",
      url: "https://ocw.mit.edu/courses/2-004-dynamics-and-control-ii-spring-2008/",
      note: "Geri besleme, transfer fonksiyonları, kararlılık (Routh–Hurwitz, kök yer eğrisi, Bode) ders notları; P, I ve D etkisi laboratuvar föylerinde (İngilizce).",
    },
    {
      title: "MIT OpenCourseWare · 2.12 Introduction to Robotics",
      url: "https://ocw.mit.edu/courses/2-12-introduction-to-robotics-fall-2005/",
      note: "Robot kol kinematiği, Jakobiyen ve hareket kontrolü; ders notları (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
