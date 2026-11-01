window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["dalga-superpozisyonu"] = {
  slug: "dalga-superpozisyonu",
  title: "Dalga Süperpozisyonu: Sesle Sessizlik Yapmak",
  field: "Fizik",
  level: "Lise",
  minutes: 25,
  tagline:
    "İki dalga karşılaştığında yalnızca toplanır; ama bu basit toplama, ışığın dalga olduğunu kanıtladı, kulaklıklara sessizlik getirdi ve kara deliklerin çarpışmasını duydu.",
  hook: "Uçak pistte hızlanırken gürültü önleyici kulaklığının düğmesine basıyorsun ve motorun uğultusu bir anda uzaklaşıyor. Oysa kulaklık susmuş değil; tam tersine, kulağına ses çalıyor. Sesin üstüne ses ekleyince nasıl sessizlik çıkar?",
  bigIdea:
    "Aynı yerde buluşan dalgaların yer değiştirmeleri <strong>toplanır</strong>; sonucun büyüyüp büyümeyeceğini genlikler değil, dalgaların birbirine göre ne kadar kaydığı, yani <strong>faz farkı</strong> belirler.",
  story: [
    "1690'da Christiaan Huygens, <em>Işık Üzerine İnceleme</em> adlı kitabında ışığın bir dalga olduğunu savundu. Fikri zarifti: bir dalga cephesinin her noktası küçük, yeni dalgacıkların kaynağı gibi davranır ve bu dalgacıkların ortak zarfı bir sonraki cepheyi oluşturur. Ama Huygens'in dalgacıklarında bir eksik vardı: tekrarlanma, yani <strong>dalga boyu</strong> yoktu. Bu yüzden dalgaların birbirini güçlendirip söndürebileceğini öngöremedi. Newton'un ışığı parçacık akışı olarak gören görüşü, onun büyük otoritesiyle birlikte yüz yılı aşkın süre ağır bastı.",
    "Eksik parçayı bir hekim ekledi. Thomas Young, 1802'de yayımladığı ders özetinde, ışıktaki renkli saçakları açıklayan bir 'genel yasa' önerdi: aynı kaynaktan gelen iki dalga ya iş birliği yapar ya da birbirini yok eder. Örneğini müzikten verdi: akordu tam tutmayan iki nota, sesin sırayla güçlenip zayıflamasına yol açar. 1803'te güneş ışığını küçük bir delikten geçirip ince demeti bir kâğıt kartın kenarıyla ikiye böldü ve gölgede açık-koyu şeritler gördü. Bugün okul kitaplarında anlatılan 'çift yarık' çizimi 1807 tarihli kitabında yer alır; tarihçiler Young'ın hangi deneyleri gerçekten yaptığından, hangilerini düşünce deneyi olarak anlattığından emin değil. Kesin olan şu: 1803–1804'te <em>Edinburgh Review</em>'da çıkan imzasız ve sert eleştiriler fikirlerini yıllarca gölgede bıraktı. Dalga kuramı ancak 1810'ların sonundan itibaren, Augustin Fresnel'in ayrıntılı hesaplarıyla kabul görmeye başladı.",
    "Young'ın müzik benzetmesi boşuna değildi. Piyano akortçuları ve müzisyenler aynı olguyu yüzyıllardır kullanır: neredeyse aynı perdedeki iki tel birlikte çalındığında ses 'vuuv-vuuv' diye dalgalanır. Bu dalgalanmaya <strong>vuru</strong> denir ve saniyedeki vuru sayısı iki frekansın farkına eşittir. Akortçu, akort çivisini çevirdikçe vuruların yavaşladığını duyar; vurular tamamen kaybolduğunda iki tel aynı frekanstadır. Kulağın tek başına ayırt edemeyeceği kadar küçük bir frekans farkı, süperpozisyon sayesinde duyulur hâle gelir.",
    "Sessizliği ses ile üretmek fikri de yeni değil. Alman mucit Paul Lueg, ters işaretli bir sesle gürültüyü söndürme yöntemi için 1933'te Almanya'da patent başvurusu yaptı; ABD patenti 1936'da verildi. 1957'de Willard Meeker kulağı saran bir kulaklıkla çalışan bir model geliştirdi, 1980'lerin sonunda ise pilotlar için ilk ticari aktif gürültü önleyici kulaklıklar satışa çıktı. Bugünkü kulaklıklarda küçük bir mikrofon dış gürültüyü dinler, elektronik devre kulağa ulaşacak kısmı hesaplar ve hoparlör bunun ters işaretlisini çalar. Kulak zarında ikisi toplanır ve gürültünün büyük kısmı söner.",
  ],
  core: [
    {
      heading: "Dalgalar birbirinin içinden geçer",
      body: "İki taş atılmış bir gölette halkalar karşılaşınca çarpışıp sekmez; birbirinin içinden geçer ve yoluna aynen devam eder. Buluştukları yerde suyun yüksekliği, iki dalganın o noktadaki yüksekliklerinin <strong>cebirsel toplamıdır</strong>: tepe ile tepe üst üste gelirse daha yüksek bir tepe, tepe ile çukur gelirse düzlük. Buna <strong>süperpozisyon ilkesi</strong> denir. Ortam <em>doğrusal</em> davrandığı sürece geçerlidir; çok büyük genliklerde (kıyıda kırılan dalga, çok yüksek ses) bu basit toplama bozulabilir.",
      formula: "y(x, t) = y<sub>1</sub>(x, t) + y<sub>2</sub>(x, t)",
      formulaNote:
        "Toplanan şey enerji değil, her noktadaki anlık yer değiştirmedir; işaretleri (+ ya da −) ile birlikte.",
    },
    {
      heading: "Faz farkı her şeyi belirler",
      body: "Aynı frekanstaki iki dalgadan biri ötekine göre kaydırılmışsa aradaki kayma bir açıyla ölçülür: <strong>faz farkı</strong> Δφ. Tam bir dalga boyu kayma 360° (2π radyan) demektir. Δφ = 0° iken tepeler çakışır ve genlikler toplanır: <strong>yapıcı girişim</strong>. Δφ = 180° iken tepe çukura denk gelir ve genlikler birbirinden çıkar: <strong>yıkıcı girişim</strong>. Arada her şey mümkündür. Sayfa tam olarak bu ara durumlardan biriyle açılır: iki dalga 90° kayıktır.",
      formula:
        "A = √(A<sub>1</sub>² + A<sub>2</sub>² + 2A<sub>1</sub>A<sub>2</sub>·cos Δφ)",
      formulaNote:
        "Δφ = 0° için A₁ + A₂, Δφ = 180° için |A₁ − A₂|, Δφ = 90° için √(A₁² + A₂²). İki eşit dalga ancak tam zıt fazda sıfıra iner.",
    },
    {
      heading: "Yol farkı faz farkına dönüşür",
      body: "İki hoparlör aynı sesi aynı anda çalıyorsa, odadaki bir noktada faz farkını yaratan şey seslerin kat ettiği yolların farkıdır. Yol farkı bir dalga boyunun tam katıysa dalgalar adım adım gelir ve ses güçlenir; yarım dalga boyunun tek katıysa biri tepe getirirken öteki çukur getirir ve ses zayıflar. Young'ın ışık saçakları da konser salonlarındaki 'ölü noktalar' da bu kuralla açıklanır. Gürültü önleyici kulaklık ise yol farkına güvenmez: zıt fazı, sesi elektronik olarak ters çevirerek üretir.",
      formula: "Δφ = 2π·Δr / λ",
      formulaNote:
        "Yapıcı: Δr = 0, λ, 2λ, … Yıkıcı: Δr = λ/2, 3λ/2, … (Δr yol farkı, λ dalga boyu, aynı birimle).",
    },
    {
      heading: "Vurular: frekanslar biraz farklıysa",
      body: "İki dalganın frekansları biraz farklıysa faz farkı sabit kalmaz, zamanla yavaşça döner. Bir an tepeler çakışır (ses güçlü), biraz sonra tepe çukura denk gelir (ses zayıf), sonra yine çakışır. Sonuç, genliği yavaşça şişip sönen bir dalgadır. Trigonometrideki toplam-çarpım özdeşliği bunu tam olarak gösterir: hızlı titreşen bir 'taşıyıcı' ile onu saran yavaş bir 'zarf'. Kulak zarfı vuru olarak duyar; zarf her turda iki kez sıfırdan geçtiği için vuru frekansı iki frekansın farkıdır.",
      formula: "f<sub>vuru</sub> = |f<sub>1</sub> − f<sub>2</sub>|",
      formulaNote:
        "440 Hz ve 442 Hz'lik iki diyapazon birlikte saniyede 2 vuru verir. Fark büyüdükçe vurular hızlanır ve 'pürüzlü' bir tınıya dönüşür.",
    },
    {
      heading: "Söndürülen enerji nereye gider?",
      body: "Bir dalganın <strong>şiddeti</strong>, yani birim alana taşıdığı güç, genliğin <strong>karesiyle</strong> orantılıdır. Eşit iki dalga yapıcı girişimde genliği iki katına çıkarır; bu, tek dalganın şiddetinin dört katı demektir. Yıkıcı noktalarda ise şiddet sıfırdır. Çok sayıda açık ve koyu bölge üzerinden ortalama alındığında sonuç iki dalganın şiddetlerinin toplamına eşittir. Girişim enerjiyi yaratmaz ya da yok etmez; yalnızca yeniden dağıtır: bazı yerlerden alıp başka yerlere yığar.",
      formula: "I ∝ A²  ·  I<sub>ort</sub> = I<sub>1</sub> + I<sub>2</sub>",
      formulaNote:
        "Yapıcı noktada I = 4I₁, yıkıcı noktada I = 0; ortalama 2I₁. Young'ın açık şeritleri, karanlık şeritlerden 'ödünç alınmış' ışıktır.",
    },
  ],
  lab: {
    intro:
      "Kanvasta <strong>kırmızı</strong> ve <strong>mavi</strong> noktalar iki ayrı dalgayı, <strong>camgöbeği</strong> çizgi ise onların noktadan noktaya toplamını gösterir; ikisi de sola doğru akar. Alttaki 'Toplam Dalga Genliği' grafiği aynı camgöbeği toplamı, −100 ile 100 arasında sabit bir eksenle çizer. Sayfada iki düğme var: <strong>Dalga 1'i Değiştir</strong> ve <strong>Dalga 2'yi Değiştir</strong>. Her basış ilgili dalgaya rastgele bir dalga boyu (yaklaşık 52–314 piksel) ve genlik (30–80 piksel) verir; faz değişmez. Sayısal gösterge ve sıfırlama düğmesi yok: başlangıca dönmek için sayfayı yenile. Açılışta iki dalganın da genliği 50 piksel, dalga boyu yaklaşık 126 pikseldir (ekranda 6,4 dalga) ve mavi dalga kırmızıdan çeyrek dalga boyu (90°) öndedir. Tek cetvelin grafiğin eksenidir; hızlar ise ekranın yenileme hızına bağlıdır.",
    experiments: [
      {
        title: "50 + 50 neden 100 etmiyor?",
        predict:
          "Genliği 50 piksel olan iki dalga 90° kayık biçimde toplanıyor. Camgöbeği toplamın genliği 100 mü, 0 mı, yoksa arada bir yer mi olur? Arada ise tam olarak kaç?",
        do: "Sayfayı yenile ve hiçbir düğmeye basma. Camgöbeği çizginin tepelerini kırmızı ve mavi tepelerle karşılaştır; ardından alttaki grafikte tepelerin eksende hangi değere ulaştığını oku.",
        observe:
          "Camgöbeği dalga her yerde aynı yükseklikte, düzgün bir dalgadır; tepeleri kırmızı ve mavi tepelerin tam ortasına düşer (her birinden yaklaşık 16 piksel uzakta). Grafikte tepeler yaklaşık ±71'e ulaşır: 50'den büyük ama 100'den belirgin biçimde küçük.",
        explain:
          "A = √(50² + 50² + 2·50·50·cos 90°) = √5000 ≈ 70,7 piksel. cos 90° = 0 olduğu için genlikler Pisagor gibi toplanır. Toplam dalga iki dalganın 'ortasında', 45° kaymada durur.",
      },
      {
        title: "Kıpırdamayan bel noktaları",
        predict:
          "Kırmızı dalganın dalga boyu maviden farklı olursa camgöbeği toplam yine düzgün bir dalga mı olur? Bir desen oluşursa desen de dalgalarla birlikte sola akar mı?",
        do: "<strong>Dalga 1'i Değiştir</strong> düğmesine bir kez bas. Kırmızı dalganın sıklığı maviye çok yakın görünüyorsa yeniden bas. Sonra 10 saniye boyunca yalnızca camgöbeği çizgiyi izle.",
        observe:
          "Camgöbeği çizgi boncuk dizisine döner: bazı yerlerde şişkin 'karınlar', bazı yerlerde daralan 'beller'. Karın yüksekliği kabaca A₁ + A₂, bel yüksekliği |A₁ − A₂| olur; kırmızı 70, mavi 50 piksel ise karın 120, bel 20 pikseldir ve grafikte 100'ü aşan tepeler kesilir. Şaşırtıcı olan: dalgacıklar bellerin içinden akıp geçerken beller yerinden kıpırdamaz.",
        explain:
          "Bazı noktalarda iki dalga aynı fazda, bazılarında zıt fazdadır. Bellerin arası λ₁·λ₂/|λ₁ − λ₂|'dir: 126 ve 90 piksellik dalgalar için 315 piksel. Bu kodda iki dalganın zaman içindeki ritmi aynıdır, bu yüzden 'aynı fazda' ve 'zıt fazda' noktalar sabit kalır. Gerçek vurularda frekanslar farklıdır ve beller hareket eder.",
      },
      {
        title: "Uzun dalga daha mı hızlı?",
        predict:
          "Düğmeye bastıktan sonra kırmızı ve mavi dalgaların tepeleri aynı hızla mı akar? Ekranda sabit bir noktadaki kırmızı nokta ile mavi nokta aynı ritimle mi inip çıkar?",
        do: "Düğmelerden birine bas. Bir kırmızı tepeyi ve bir mavi tepeyi gözünle ya da parmağınla birkaç saniye takip et. Sonra gözünü ekranın tek bir dikey çizgisine sabitle ve oradaki iki noktanın iniş-çıkışını say.",
        observe:
          "İki dalga da sola akar ama dalga boyu uzun olan belirgin biçimde daha hızlı gider; dalga boyu iki katı olan, iki kat hızlıdır. Buna karşılık sabit bir noktadaki kırmızı ve mavi noktalar aynı ritimle inip çıkar: 60 Hz'lik bir ekranda yaklaşık 1 saniyede bir. Açılışta iki dalga da kare başına 2 piksel, yani saniyede yaklaşık 120 piksel ilerler.",
        explain:
          "Kod her karede iki dalganın fazını da aynı miktarda (0,1 radyan) ilerletir; yani frekansları hep eşittir. v = f·λ olduğundan uzun dalga daha hızlı gitmek zorundadır. Gerçek bir telde ya da havada hızı ortam belirler; farklı dalga boyları aynı hızla gider ve frekansları farklı olur. Sayfa burada gerçeklikten ayrılır: bütün dalgalara aynı frekansı verir, hızı ise serbest bırakır.",
      },
      {
        title: "Ekran ile grafik neden ters?",
        predict:
          "Kanvastaki camgöbeği çizgi ile alttaki grafik aynı sayılardan çiziliyor. İki resim birebir aynı mı görünür?",
        do: "Sayfayı yenile. Kanvasın sol kenarında camgöbeği çizginin beyaz orta çizginin üstünde mi altında mı olduğuna bak; aynı anda grafiğin sol ucuna bak. Sonra iki düğmeye de birkaç kez basıp büyük dalgalar elde et ve grafiği yeniden incele.",
        observe:
          "İki resim birbirinin ayna görüntüsüdür: kanvasta çizgi orta çizginin üstündeyken grafikte altında kalır. Büyük genliklerde grafiğin tepeleri ±100 sınırında kesilir, kanvas ise ±160 piksele kadar sığdırır.",
        explain:
          "Bilgisayar ekranları y koordinatını yukarıdan aşağıya sayar, matematik grafikleri aşağıdan yukarıya. Sayılar aynı, eksen yönü farklı. Grafik ekseni −100…100'e sabitlendiği için iki dalganın en büyük toplamı (80 + 80 = 160) sığmaz. Bir grafiği okumadan önce eksenine bakmak bu yüzden önemlidir.",
      },
    ],
  },
  wow: [
    {
      title: "Gölgenin ortasındaki parlak nokta",
      body: "1818'de Fresnel, Fransız Bilimler Akademisi'nin yarışmasına ışığın dalga kuramını sundu. Jürideki Siméon Denis Poisson, parçacık görüşünü savunuyordu ve kuramı çürütmek için bir sonuç türetti: kuram doğruysa yuvarlak bir diskin gölgesinin tam ortasında parlak bir nokta olmalıydı. Bu ona saçma görünüyordu. Jüri başkanı François Arago deneyi yaptı: camın üzerine mumla yapıştırdığı 2 mm'lik metal diskin gölgesinde nokta oradaydı. Bugün 'Arago noktası' ya da 'Poisson noktası' diye anılır.",
    },
    {
      title: "Bir protonun binde biri",
      body: "LIGO dedektörleri, dik açılı 4 km'lik iki kolda gidip gelen lazer ışığını girişime sokar. Kollardan biri azıcık uzayıp öteki kısalırsa iki ışın artık tam söndürmez ve dedektöre ışık sızar. 14 Eylül 2015'te bu yolla, kol uzunluklarında bir proton genişliğinin yaklaşık binde biri kadar bir değişim ölçüldü: yaklaşık 1,3 milyar yıl önce birleşen iki kara deliğin yaydığı kütleçekim dalgası. Buluş 2017 Nobel Fizik Ödülü'nü getirdi.",
    },
    {
      title: "Sabun köpüğü patlamadan önce kararır",
      body: "Köpüğün renkleri boya değildir: ince su zarının ön ve arka yüzeyinden yansıyan iki ışın girişim yapar ve hangi rengin güçleneceğini zarın kalınlığı belirler. Zar inceldikçe renkler kayar. Zar dalga boyunun küçük bir kesrinden ince hâle geldiğinde ise o noktada siyah bir leke belirir: ön yüzeyden yansıyan ışık yansırken yarım dalga ters döner, arkadan yansıyan dönmez, ikisi birbirini söndürür. En ince türüne bugün 'Newton siyah filmi' denir.",
    },
  ],
  worked: {
    title: "İki hoparlör ve sessiz nokta",
    prompt:
      "İki hoparlör aynı anda, aynı fazda ve eşit genlikle 340 Hz'lik bir ton çalıyor. Ses hızı 340 m/s. Bir hoparlöre 3,00 m, ötekine 3,50 m uzaklıkta duruyorsun. Ne duyarsın? Biraz yer değiştirince ne olur? İkinci hoparlör 342 Hz'e kayarsa ne değişir?",
    steps: [
      "Dalga boyunu bul: λ = v / f = (340 m/s) / (340 Hz) = 1,00 m.",
      "Yol farkı Δr = 3,50 m − 3,00 m = 0,50 m = λ/2. Faz farkı Δφ = 2π·(0,50 m)/(1,00 m) = π radyan = 180°. Tepe çukura denk gelir. İki sesin buraya eşit genlikle ulaştığını varsayarsak A = |A₁ − A₂| = 0: sessiz nokta. Gerçekte uzak hoparlörün sesi biraz daha zayıf gelir (genlik oranı 3,00/3,50 ≈ 0,86), bu yüzden tek hoparlör şiddetinin yaklaşık %2'si kalır; duvar yansımaları da sessizliği kısmen doldurur.",
      "Yakın hoparlöre 3,00 m, uzak hoparlöre 3,25 m olan bir noktaya geç: Δr = 0,25 m = λ/4, Δφ = 90°. A = √(A² + A²) = A·√2 ≈ 1,41·A. Sayfanın açılış durumu tam budur: 50 piksellik iki dalga 70,7 piksellik bir toplam verir. Şiddet A² ile orantılı olduğu için tek hoparlörün 2 katıdır.",
      "Yol farkını 1,00 m yap (örneğin 3,00 m ve 4,00 m): Δφ = 360°, dalgalar yeniden adım adım gelir. A = 2A, şiddet tek hoparlörün 4 katı.",
      "İkinci hoparlör 342 Hz'e kayarsa faz farkı artık sabit değildir: f<sub>vuru</sub> = |342 Hz − 340 Hz| = 2 Hz. Nerede durursan dur ses saniyede iki kez güçlenip zayıflar; sessiz noktalar odada dolaşmaya başlar.",
    ],
    result:
      "Aynı odada konuma göre sessizlikten (Δr = 0,50 m) dört kat şiddete (Δr = 1,00 m) kadar her şey duyulabilir. Hoparlörler birbirinden birkaç dalga boyu uzaktaysa geniş bir bölgenin ortalama şiddeti iki hoparlörün şiddetlerinin toplamıdır; girişim enerjiyi yalnızca yeniden dağıtır.",
  },
  misconceptions: [
    {
      myth: "İki dalganın toplamının genliği her zaman genliklerin toplamıdır.",
      truth:
        "Bu yalnızca dalgalar tam aynı fazdaysa doğrudur. Toplam genlik faz farkına göre |A₁ − A₂| ile A₁ + A₂ arasında herhangi bir değer alabilir. Sayfa açıldığında 50 ve 50 piksellik iki dalga, 90° kayık oldukları için 100 değil yaklaşık 71 piksel verir.",
    },
    {
      myth: "Karşılaşan iki dalga çarpışır, birbirini bozar ya da geri seker.",
      truth:
        "Doğrusal bir ortamda dalgalar birbirinin içinden geçer. Buluştukları anda yer değiştirmeler toplanır, ayrıldıklarında her biri eski biçimi, hızı ve yönüyle yoluna devam eder. Bir ipte karşılıklı gönderilen iki atma, iç içe geçtikten sonra hiç karşılaşmamış gibi ayrılır.",
    },
    {
      myth: "Yıkıcı girişimde dalgaların enerjisi yok olur.",
      truth:
        "Enerji yok olmaz, yer değiştirir. Söndürmenin olduğu noktalarda eksilen şiddet, güçlendirmenin olduğu noktalarda fazlasıyla görünür; çok sayıda saçak üzerinden alınan ortalama, iki dalganın şiddetlerinin toplamına eşittir. Young deneyinde karanlık şeritlerin ışığı açık şeritlerdedir.",
    },
    {
      myth: "Gürültü önleyici kulaklık ters sesle her türlü sesi tamamen siler.",
      truth:
        "Ters ses en iyi motor uğultusu gibi düzenli ve düşük frekanslı seslerde işe yarar; kısa dalga boylu tiz seslerde ve ani seslerde faz uyumunu zamanında tutturmak zordur. Bu sesleri büyük ölçüde kulaklığın yastıkları pasif olarak keser. Konuşma ve ani sesler bu yüzden hâlâ duyulur.",
    },
  ],
  glossary: [
    {
      term: "Süperpozisyon ilkesi",
      definition:
        "Doğrusal bir ortamda aynı yerde buluşan dalgaların yer değiştirmelerinin cebirsel olarak toplanması.",
    },
    {
      term: "Yapıcı girişim",
      definition:
        "Dalgaların aynı fazda buluşup birbirini güçlendirmesi; toplam genlik A₁ + A₂ olur.",
    },
    {
      term: "Yıkıcı girişim",
      definition:
        "Dalgaların zıt fazda buluşup birbirini zayıflatması; toplam genlik |A₁ − A₂| olur, eşit genlikte sıfıra iner.",
    },
    {
      term: "Faz farkı (Δφ)",
      definition:
        "Aynı frekanstaki iki dalganın birbirine göre kaymasının açı cinsinden ölçüsü; bir tam dalga boyu kayma 360°'ye karşılık gelir.",
    },
    {
      term: "Yol farkı (Δr)",
      definition:
        "İki dalganın kaynaklarından aynı noktaya ulaşırken kat ettikleri uzaklıkların farkı; Δφ = 2π·Δr/λ ile faza dönüşür.",
    },
    {
      term: "Dalga boyu (λ)",
      definition:
        "Bir dalgada art arda iki tepe arasındaki uzaklık; v = f·λ ile hız ve frekansa bağlıdır.",
    },
    {
      term: "Vuru",
      definition:
        "Frekansları biraz farklı iki dalga toplandığında genliğin |f₁ − f₂| frekansıyla periyodik olarak artıp azalması.",
    },
    {
      term: "Doğrusal ortam",
      definition:
        "Tepkisi uyarıyla orantılı olan ortam; süperpozisyon ilkesinin geçerli olduğu koşul.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede süperpozisyon 'iki dalgayı topla' kuralıdır; üniversitede bir teoremdir: <strong>doğrusal bir diferansiyel denklemin</strong> iki çözümünün toplamı da çözümdür. Her karmaşık sinyal sinüslerin toplamı olarak yazılabilir; buna <strong>Fourier analizi</strong> denir. Dalga denklemi doğrusal olduğu için her sinüsü ayrı ayrı çözüp sonuçları toplamak yeter. Ses sıkıştırmadan tıbbi görüntülemeye kadar sinyal işleme bu ikiliye dayanır. Sayfadaki kıpırdamayan beller de bir ders kavramına kapı açar: zarfın hızı olan <strong>grup hızı</strong> Δω/Δk ile verilir. Bu sayfada iki dalganın frekansı eşit olduğu için Δω = 0'dır ve zarf yerinde durur. Dalga boyuna göre hızın değiştiği ortamlara <em>dağıtkan ortam</em> denir; prizmanın beyaz ışığı renklerine ayırması da bunun bir örneğidir.",
      "Aynı ilke modern teknolojinin her yerindedir. Radar ve 5G antenlerinde çok sayıda küçük antenin fazı ayarlanarak ışın istenen yöne 'yönlendirilir'; radyo teleskoplar kıtalar arasında birleştirilip tek dev bir teleskop gibi çalıştırılır. Kuantum mekaniğinde ise toplanan şey dalga fonksiyonlarıdır ve olasılık genliğin karesiyle bulunur; tek tek gönderilen elektronların bile çift yarıktan sonra girişim deseni oluşturması bu yüzdendir. Lise fiziğindeki bu basit toplama kuralı, kuantum bilgisayarlarının da çalışma ilkesinin bir parçasıdır.",
    ],
    topics: [
      "Doğrusal diferansiyel denklemler",
      "Fourier analizi",
      "Grup hızı ve faz hızı",
      "Dağıtkan ortamlar",
      "İnterferometri",
      "Faz dizili antenler",
      "Kuantum süperpozisyonu",
    ],
  },
  quiz: [
    {
      question:
        "Genlikleri 30 cm ve 40 cm olan, aynı frekanslı iki su dalgası aralarında 90° faz farkıyla üst üste biniyor. Toplam dalganın genliği kaçtır?",
      options: ["10 cm", "35 cm", "50 cm", "70 cm"],
      answer: 2,
      explanation:
        "cos 90° = 0 olduğundan A = √(30² + 40²) = √2500 = 50 cm: genlikler bir dik üçgenin kenarları gibi toplanır. 70 cm yalnızca aynı fazda (0°), 10 cm yalnızca zıt fazda (180°) çıkar. 35 cm ise ortalamadır; süperpozisyonda genliklerin ortalaması alınmaz.",
    },
    {
      question:
        "Bir akortçu 440 Hz'lik diyapazonla bir teli birlikte çaldığında saniyede 4 vuru duyuyor. Telin frekansı için ne söylenebilir?",
      options: [
        "Kesinlikle 444 Hz'dir",
        "436 Hz ya da 444 Hz'dir",
        "880 Hz'dir",
        "4 Hz'dir",
      ],
      answer: 1,
      explanation:
        "Vuru frekansı farkın mutlak değeridir: |f − 440 Hz| = 4 Hz. Tel 4 Hz pes ya da 4 Hz tiz olabilir; vuru sayısı tek başına hangisi olduğunu söylemez. Akortçu teli biraz gerer: vurular yavaşlarsa tel pesti, hızlanırsa tizdi.",
    },
    {
      question:
        "Eşit genlikli iki dalganın girişiminde bazı noktalarda şiddet sıfır oluyor. Bu noktalardaki enerjiye ne olur?",
      options: [
        "Isıya dönüşerek kaybolur",
        "Gerçekten yok olur; girişim enerjiyi azaltır",
        "Yapıcı girişim noktalarına yeniden dağılır; ortalama şiddet değişmez",
        "Dalgaların kaynağına geri yansır",
      ],
      answer: 2,
      explanation:
        "Şiddet genliğin karesiyle orantılıdır. Yapıcı noktalarda genlik 2A, şiddet tek dalganın 4 katıdır; yıkıcı noktalarda 0. Bölgenin ortalaması tek dalganın şiddetinin 2 katı, yani iki dalganın toplamıdır. Girişim enerjiyi yaratmaz da yok etmez de; yalnızca yeniden dağıtır.",
    },
  ],
  next: [
    {
      href: "klasik-girisim.html",
      title: "Klasik Girişim — Çift Yarık",
      why: "Young'ın deneyi: dalga boyu, yarık aralığı ve ekran uzaklığı kaydırıcılarıyla saçak aralığının nasıl değiştiğini ölç.",
    },
    {
      href: "duran-dalgalar.html",
      title: "Duran Dalgalar",
      why: "Zıt yönde giden iki dalganın toplamı yerinde durur: harmonik modları, düğüm ve karın noktalarını incele.",
    },
    {
      href: "fourier-ses.html",
      title: "Fourier: Ses Analizi",
      why: "'Harmonik karışım' beş sinüsü üst üste koyar; spektrum çubukları toplamı yeniden bileşenlerine ayırır.",
    },
    {
      href: "birim-cember.html",
      title: "Birim Çember",
      why: "Faz farkının neden bir açı olduğunu gör: θ'yu 90° artırınca yeni sin θ değeri eski cos θ değerine eşit çıkar, yani sin(θ + 90°) = cos θ.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 1, 16.5 Interference of Waves",
      url: "https://openstax.org/books/university-physics-volume-1/pages/16-5-interference-of-waves",
      note: "Süperpozisyon, yapıcı ve yıkıcı girişim; eşit genlikli iki dalga için A = 2A·cos(Δφ/2) türetmesi (İngilizce, açık ders kitabı).",
    },
    {
      title: "OpenStax · University Physics Vol. 1, 17.6 Beats",
      url: "https://openstax.org/books/university-physics-volume-1/pages/17-6-beats",
      note: "Vuru frekansının türetilmesi ve akort örnekleri.",
    },
    {
      title: "PhET · Dalgalarda Girişim ve Kırınım",
      url: "https://phet.colorado.edu/tr/simulations/wave-interference",
      note: "Su, ses ve ışık dalgalarıyla iki kaynak girişimi ve çift yarık; bu sayfada olmayan frekans, kaynak aralığı ve yarık ayarlarıyla.",
    },
    {
      title: "HyperPhysics · Beat Frequencies",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/Sound/beat.html",
      note: "Vuruların toplam-çarpım özdeşliğiyle kısa ve formül odaklı anlatımı.",
    },
  ],
  revision: "Kasım 2026",
};
