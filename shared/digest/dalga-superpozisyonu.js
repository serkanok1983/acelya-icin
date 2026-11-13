window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["dalga-superpozisyonu"] = {
  slug: "dalga-superpozisyonu",
  title: "Dalga Süperpozisyonu: Sesle Sessizlik Yapmak",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "İki dalga karşılaşınca yalnızca toplanır. Bu tek kural girişimi, duran dalgayı, vuruyu ve dalga paketini doğurur; laboratuvarda dördünü de ölç ve kuramla karşılaştır.",
  hook: "Uçak pistte hızlanırken gürültü önleyici kulaklığının düğmesine basıyorsun ve motorun uğultusu bir anda uzaklaşıyor. Oysa kulaklık susmuş değil; tam tersine, kulağına ses çalıyor. Sesin üstüne ses ekleyince nasıl sessizlik çıkar?",
  bigIdea:
    "Aynı yerde buluşan dalgaların yer değiştirmeleri <strong>toplanır</strong>; sonucun büyüyüp büyümeyeceğini genlikler değil <strong>faz farkı</strong> belirler. Faz farkı konuma bağlanınca duran dalga, zamana bağlanınca vuru, pek çok dalga birlikte toplanınca dalga paketi doğar.",
  story: [
    "1690'da Christiaan Huygens, <em>Işık Üzerine İnceleme</em> adlı kitabında ışığın bir dalga olduğunu savundu. Fikri zarifti: bir dalga cephesinin her noktası küçük, yeni dalgacıkların kaynağı gibi davranır ve bu dalgacıkların ortak zarfı bir sonraki cepheyi oluşturur. Ama Huygens'in dalgacıklarında bir eksik vardı: tekrarlanma, yani <strong>dalga boyu</strong> yoktu. Bu yüzden dalgaların birbirini güçlendirip söndürebileceğini öngöremedi. Newton'un ışığı parçacık akışı olarak gören görüşü, onun büyük otoritesiyle birlikte yüz yılı aşkın süre ağır bastı.",
    "Eksik parçayı bir hekim ekledi. Thomas Young, Ocak 1802'de yayımladığı ders özetinde, ışıktaki renkli saçakları açıklayan bir 'genel yasa' önerdi: aynı kaynaktan gelen iki dalga ya iş birliği yapar ya da birbirini yok eder. Young ışıktan önce ses üzerine çalışmıştı; akordu tam tutmayan iki notanın sesi sırayla güçlendirip zayıflattığını iyi biliyordu. 1803'te güneş ışığını küçük bir delikten geçirip ince demeti bir kâğıt kartın kenarıyla ikiye böldü ve gölgede açık-koyu şeritler gördü. Bugün okul kitaplarında anlatılan 'çift yarık' çizimi 1807 tarihli kitabında yer alır; tarihçiler Young'ın hangi deneyleri gerçekten yaptığından, hangilerini düşünce deneyi olarak anlattığından emin değil. Kesin olan şu: 1803–1804'te <em>Edinburgh Review</em>'da çıkan imzasız ve sert eleştiriler fikirlerini yıllarca gölgede bıraktı. Dalga kuramı ancak 1810'ların sonundan itibaren, Augustin Fresnel'in ayrıntılı hesaplarıyla kabul görmeye başladı.",
    "Ses ile ışık arasındaki bu bağ boşuna değildi. Piyano akortçuları ve müzisyenler aynı olguyu yüzyıllardır kullanır: neredeyse aynı perdedeki iki tel birlikte çalındığında ses 'vuuv-vuuv' diye dalgalanır. Bu dalgalanmaya <strong>vuru</strong> denir ve saniyedeki vuru sayısı iki frekansın farkına eşittir. Akortçu, akort çivisini çevirdikçe vuruların yavaşladığını duyar; vurular tamamen kaybolduğunda iki tel aynı frekanstadır. Kulağın tek başına ayırt edemeyeceği kadar küçük bir frekans farkı, süperpozisyon sayesinde duyulur hâle gelir.",
    "Sessizliği ses ile üretmek fikri de yeni değil. Alman mucit Paul Lueg, ters işaretli bir sesle gürültüyü söndürme yöntemi için 1933'te Almanya'da patent başvurusu yaptı; ABD patenti 1936'da verildi. 1957'de Willard Meeker kulağı saran bir kulaklıkla çalışan bir model geliştirdi, 1980'lerin sonunda ise pilotlar için ilk ticari aktif gürültü önleyici kulaklıklar satışa çıktı. Bugünkü kulaklıklarda küçük bir mikrofon dış gürültüyü dinler, elektronik devre kulağa ulaşacak kısmı hesaplar ve hoparlör bunun ters işaretlisini çalar. Kulak zarında ikisi toplanır ve gürültünün büyük kısmı söner.",
  ],
  core: [
    {
      heading: "Dalgalar neden toplanabilir?",
      body: "İki taş atılmış bir gölette halkalar karşılaşınca çarpışıp sekmez; birbirinin içinden geçer. Bunun nedeni bir denklemin biçimindedir. Gergin bir ipin küçük enine hareketleri <strong>dalga denklemine</strong> uyar: ∂²y/∂t² = v²·∂²y/∂x². Denklemde y yalnız birinci kuvvetiyle yer alır; y² ya da y·∂y/∂x gibi terimler yoktur. Türev almak toplamayı koruduğu için y₁ ve y₂ birer çözümse y₁ + y₂ de çözümdür. <strong>Süperpozisyon ilkesi</strong> ayrı bir doğa yasası değil, denklemin <em>doğrusal</em> oluşunun sonucudur. Genel çözüm, Jean le Rond d'Alembert'in gergin tel üzerine 1747 tarihli makalesine dayanır: biri sağa, biri sola giden, biçimi keyfî iki dalganın toplamı. Sayfanın 03 sekmesindeki ip bu çözümü adım adım taşır; iki atma iç içe geçip ayrıldıktan sonra tablodaki <em>Geçişten sonra biçim sapması</em> satırı 0 cm yazar. Gerçek ipte büyük genlik gerilimi değiştirir, denklem doğrusallığını yitirir ve bu temiz toplama bozulur.",
      formula: "y(x, t) = f(x − vt) + g(x + vt)",
      formulaNote:
        "f sağa, g sola giden biçimdir; v = √(T/μ). Sayfadaki ipte T = 0,040 N ve μ = 0,010 kg/m (öğretim değerleri), yani v = 2,00 m/s.",
    },
    {
      heading: "Fazör toplaması: genlikler ok gibi eklenir",
      body: "Aynı frekanslı iki salınımı toplamak için sinüsleri tek tek açmak gerekmez. Her salınımı, boyu genliğe ve açısı faza eşit, dönen bir okla göster: <strong>fazör</strong>. İki ok aynı hızla döndüğü için aralarındaki açı, yani <strong>faz farkı</strong> Δφ, hiç değişmez; okları uç uca ekleyince oluşan üçgenin üçüncü kenarı toplam salınımdır ve boyunu kosinüs teoremi verir. Δφ = 0° ise oklar aynı doğrultudadır, genlikler toplanır: <strong>yapıcı girişim</strong>. Δφ = 180° ise zıt yönlüdür, genlikler çıkar: <strong>yıkıcı girişim</strong>. Sayfa bir ara durumla açılır: 3,0 cm ve 2,0 cm'lik iki dalga 60° kayıktır ve bileşke 5,0 cm değil, √19 ≈ 4,359 cm'dir. Ekrandaki ölçülen değer bu formülden gelmez: toplam dalga bir periyot boyunca 32 kez örneklenir, o frekanstaki bileşeni ayıklanır ve formülle yan yana konur.",
      formula:
        "A = √(A<sub>1</sub>² + A<sub>2</sub>² + 2A<sub>1</sub>A<sub>2</sub>·cos Δφ)",
      formulaNote:
        "Δφ = 0° için A₁ + A₂, 180° için |A₁ − A₂|, 90° için √(A₁² + A₂²). Karmaşık sayı diliyle A = |A₁ + A₂·e<sup>iΔφ</sup>|.",
    },
    {
      heading: "Enerji yok olmaz, yer değiştirir: düğümler ve karınlar",
      body: "Bir dalganın enerji yoğunluğu ve <strong>şiddeti</strong> genliğin <strong>karesiyle</strong> orantılıdır. Fazör formülünün karesini al: A² = A₁² + A₂² + 2A₁A₂·cos Δφ. Son terim, yani girişim terimi, faz farkı 0°'den 360°'ye taranırken ortalamada sıfırdır; geriye A₁² + A₂² kalır. Sayfa bunu ölçer: 3,0 ve 2,0 cm için ⟨A²⟩ satırı, seçtiğin faz ne olursa olsun 13,000 cm² yazar. Bu ortalamanın uzaydaki karşılığını görmek için ikinci dalgayı ters yöne çevir. Artık faz farkı konuma bağlıdır: Δφ(x) = π − 2kx − φ₁ − φ₂. Yıkıcı girişim noktaları yerinde durur; bunlar <strong>düğümlerdir</strong> ve aralıkları λ/2'dir. Aralarındaki <strong>karınlarda</strong> genlik A₁ + A₂'ye çıkar: düğümde eksilen şiddet karında fazlasıyla bulunur. Genlikler eşit değilse düğümler sıfıra inmez; en büyük genliğin en küçüğe oranına <strong>duran dalga oranı</strong> (DDO) denir.",
      formula: "⟨A²⟩ = A<sub>1</sub>² + A<sub>2</sub>²<br>DDO = (A<sub>1</sub> + A<sub>2</sub>) / |A<sub>1</sub> − A<sub>2</sub>|",
      formulaNote:
        "Eşit iki dalgada karında şiddet tek dalganın 4 katı, düğümde 0, ortalama 2 katıdır. A₁ = 3,0 cm ve A₂ = 1,5 cm için DDO = 3,000.",
    },
    {
      heading: "Vuru ve ikiye bölme tuzağı",
      body: "Frekanslar biraz farklıysa iki fazör farklı hızlarda döner; aralarındaki açı saniyede Δf tur açılır. Bir an aynı yöne bakarlar (ses güçlü), yarım tur sonra zıt yöne (ses zayıf). Toplam-çarpım özdeşliği aynı şeyi tek satırda söyler: ortalama frekansta hızlı titreşen bir <em>taşıyıcı</em> ve onu saran yavaş bir <em>zarf</em>. Burada bir tuzak var. Zarf çarpanı cos(πΔf·t)'nin frekansı Δf/2'dir; ama kulak zarfın işaretini değil büyüklüğünü duyar ve |cos| her turda iki kez tepe yapar. Saniyedeki <strong>vuru</strong> sayısı bu yüzden Δf/2 değil, Δf'dir. Sayfada 440 Hz ile 444 Hz, sinyalin tepelerinden sayılarak 4,000 Hz vuru verir; zarf kosinüsünün frekansı 2,000 Hz'dir ve ikisinin oranı 2,000 olarak ayrı bir kartta durur. Genlikler eşit değilse zarf A₁ + A₂ ile |A₁ − A₂| arasında gidip gelir, sıfıra inmez; vuru frekansı değişmez.",
      formula: "cos 2πf<sub>1</sub>t + cos 2πf<sub>2</sub>t = 2·cos(πΔf·t)·cos(2πf<sub>ort</sub>t)<br>f<sub>vuru</sub> = |f<sub>1</sub> − f<sub>2</sub>|",
      formulaNote:
        "Δf = f₂ − f₁ ve f_ort = (f₁ + f₂)/2. 440 Hz ile 444 Hz için taşıyıcı 442 Hz, vuru periyodu 1/(4 Hz) = 0,2500 s.",
    },
    {
      heading: "Dalga paketi: grup hızı ve bant genişliği teoremi",
      body: "Vuruyu bu kez uzayda düşün. Dalga sayıları k ve k + Δk, açısal frekansları ω ve ω + Δω olan iki dalganın toplamında zarf cos(½(Δk·x − Δω·t)) biçimindedir ve Δω/Δk hızıyla ilerler. Fark küçüldükçe bu oran türeve yaklaşır: <strong>grup hızı</strong> v<sub>g</sub> = dω/dk. Tek tek tepeler ise <strong>faz hızı</strong> v<sub>f</sub> = ω/k ile gider. ω ile k orantılıysa ikisi eşittir ve paket biçimini korur. Derin suda ω = √(g·k) olduğundan v<sub>g</sub> = v<sub>f</sub>/2'dir: λ₀ = 1,00 m için kuram 1,250 ve 0,625 m/s verir; tepeler paketin arkasında doğar, içinden geçer ve önde söner. İkinci ders <strong>bant genişliği teoremidir</strong>: bir paketi Δx kadar dar yapmak için en az 1/(2Δx) genişliğinde bir dalga sayısı aralığını toplamak gerekir. Sayfadaki 241 sinüslük Gauss paketi tam bu sınırda, Δx·Δk = 0,500 ile başlar; ortam dağıtıcıysa Δk sabit kalırken Δx büyür ve çarpım artar.",
      formula: "v<sub>g</sub> = dω/dk  ·  v<sub>f</sub> = ω/k<br>Δx·Δk ≥ 1/2",
      formulaNote:
        "Δx konumda |ψ|² dağılımının, Δk dalga sayısında spektrumun karesinin standart sapmasıdır. Eşitlik yalnız henüz yayılmamış Gauss paketinde sağlanır.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın üç sekmesi var: <strong>01 · İki dalganın toplamı</strong>, <strong>02 · Vuru</strong> ve <strong>03 · Atma ve dalga paketi</strong>; üçüncüsünde <em>A · Atma ve yansıma</em> ile <em>B · Dalga paketi</em> deneyleri arasında geçiş yaparsın. Her sekmede kartlar ve tablo, toplam dalgadan <strong>ölçülen</strong> değeri <strong>kuramın</strong> verdiği değerle ve aradaki farkla yan yana gösterir. Boşluk tuşu etkin deneyi duraklatır, R tuşu etkin sekmeyi sıfırlar. Sayılar ondalık virgülle yazılır. Model baştan sona doğrusal ve sönümsüzdür; ipteki dalga hızı (2,00 m/s) ile ortam sabitleri öğretim değerleridir. 02'deki ses isteğe bağlıdır; sayfa sessiz de eksiksiz çalışır.",
    experiments: [
      {
        title: "Sessizlik enerjiyi yok eder mi?",
        predict:
          "3,0 cm ve 2,0 cm genlikli iki dalga 60° faz farkıyla toplanınca genlik 5,0 cm mi olur? Faz farkını 0°, 90° ve 180° yaptığında şiddet oranı nasıl değişir; faz farkı üzerinden ortalaması da değişir mi?",
        do: "<strong>01 · İki dalganın toplamı</strong> sekmesinde <strong>İki dalgayı sıfırla</strong> düğmesine bas; dört kartı, fazör üçgenini ve tablodaki <em>Ortalama şiddet ⟨A²⟩</em> satırını incele. Sonra sırayla <strong>Yapıcı (0°)</strong>, <strong>Dik (90°)</strong> ve <strong>Yıkıcı (180°)</strong> düğmelerine bas; bu düğmeler iki genliği de 3,0 cm yapar. Yıkıcı durumdayken <em>Genlik A₂</em> kaydırıcısını 2,0 cm'ye indir.",
        observe:
          "Açılışta Δφ = 60,0°; bileşke genlik ölçülen 4,359 cm, kuram 4,359 cm; şiddet oranı 1,462. Yapıcıda 6,000 cm ve oran 2,000, dikte 4,243 cm ve 1,000, yıkıcıda 0,000 cm ve 0,000: ip dümdüz. Üçünde de ⟨A²⟩ satırı 18,000 cm² ↔ 18,000 cm² yazar. A₂ = 2,0 cm olunca sönüm tam değildir: 1,000 cm, oran 0,077; ⟨A²⟩ 13,000 cm².",
        explain:
          "Fazör üçgeninin üçüncü kenarı √(9 + 4 + 2·3·2·cos 60°) = √19 cm'dir; şiddet oranı 19/13. Şiddet eğrisi I₁ + I₂ çizgisinin üstünde ne kadar alan kazanırsa altında o kadar kaybeder, ortalama hep A₁² + A₂² kalır. Aynı yönde giden eşit iki dalganın her yerde sönmesi de enerjinin yok olması değildir: durum satırının dediği gibi, bu iki dalgayı birlikte üreten kaynak ipe baştan hiç güç aktaramaz.",
      },
      {
        title: "Dört vuru, iki hertzlik kosinüs",
        predict:
          "440 Hz ile 444 Hz birlikte çalıyor. Özdeşlikteki zarf çarpanı cos(πΔf·t)'nin frekansı 2 Hz. Ses saniyede iki kez mi şişer, dört kez mi? İkinci tonu zayıflatırsan vuru yavaşlar mı? Frekansını bilmediğin bir teli yalnız vuru sayarak akort edebilir misin?",
        do: "<strong>02 · Vuru</strong> sekmesinde <strong>440 + 444 Hz</strong> düğmesine bas ve dört kartı oku; istersen <strong>Sesi aç</strong> ile dinle (düzeyi düşük tut). <strong>Eşit olmayan genlik</strong> düğmesine bas. Sonra <strong>Akort görevini başlat</strong>: telin frekansı gizlenir. <em>Akort burgusu</em> kaydırıcısını bir yöne çevir; vuru hızlanırsa geri dön ve vuru kaybolana kadar sürdür.",
        observe:
          "Vuru frekansı ölçülen 4,000 Hz, kuram 4,000 Hz (8 yükseliş sayılır); zarf kosinüsü 2,000 Hz, oran 2,000, vuru periyodu 0,2500 s. Eşit olmayan genlikte vuru yine 4,000 Hz'dir; zarf 1,400 ile 0,600 arasında kalır, ortalama taşıyıcı 442,00 Hz'den 440,00 Hz'e iner. İlk görevde 3,400 Hz vuru sayılır. Burgu −3,0 Hz'e gelince kart “sayılamadı” der; −3,4 Hz'de durum satırı “Akort tamam” yazar: tel 443,4 Hz'ti.",
        explain:
          "Kulak da sayaç da zarfın büyüklüğünü izler; |cos| bir turda iki tepe yaptığı için vuru Δf/2 değil Δf'dir. Vuru sayısı farkın yalnız büyüklüğünü verir: 3,4 vuru hem 443,4 Hz hem 436,6 Hz demek olabilir, yönü burguyu çevirince anlarsın. Burgu −3,0 Hz'deyken fark 0,4 Hz'dir; vuru periyodu 2,5 s olur ve 2 s'lik pencereye iki vuru sığmaz. <em>Dinleme penceresi</em>ni 5 s yaparsan 0,400 Hz olarak sayılır.",
      },
      {
        title: "Dümdüz ipte dalga nerede?",
        predict:
          "+3,0 cm ve −3,0 cm'lik iki atma karşılıklı geliyor. Tam üst üste bindikleri anda ip dümdüz olur. O anda ipin enerjisi sıfır mıdır? Atmalar bu düzlükten yeniden çıkabilir mi? Uçtan dönen atma baş aşağı mı gelir?",
        do: "<strong>03 · Atma ve dalga paketi</strong> sekmesinde <em>A · Atma ve yansıma</em> seçiliyken <strong>Zıt işaretli çift</strong>, ardından <strong>Karşılaşma anına git</strong> düğmesine bas; kartlara, enerji çubuklarına ve alt eksendeki hız eğrisine bak. <strong>0,05 s ilerlet</strong> ile birkaç adım at. Aynısını <strong>Aynı işaretli çift</strong> için yinele. Son olarak <strong>Tek atma, sabit uç</strong> ve <strong>Tek atma, serbest uç</strong> ayarlarını t = 7,00 s geçene kadar izle.",
        observe:
          "Zıt çiftte t = 1,00 s'de en büyük |y| 0,00 cm, kinetik pay 100,0 % (kuram 100,0 %): kinetik 221,6 µJ, potansiyel 0,0 µJ. Aynı işaretli çiftte tepe 6,00 cm, kinetik pay 0,0 %, potansiyel 221,6 µJ. Çiftin toplam enerjisi 221,61 µJ, kuram 222,07 µJ (−0,20 %). t = 2,00 s'den sonra biçim sapması 0 cm'dir. Sabit uçta yansıma katsayısı −1,000, ucun yer değiştirmesi 0,00 cm; serbest uçta +1,000 ve 6,00 cm.",
        explain:
          "Sağa giden atmada ipin enine hızı −c·∂y/∂x, sola gidende +c·∂y/∂x'tir. Zıt işaretli iki atma üst üste gelince yer değiştirmeler birbirini götürür ama hızlar toplanır: dalga o an bütünüyle hız alanında durur ve oradan yeniden doğar. Aynı işaretlide tersi olur. Sabit uç, duvarın arkasından gelen ters işaretli hayalî bir atmayla; serbest uç aynı işaretli bir atmayla toplamdır. −0,20 % fark fizik değil, 0,02 m'lik ağın atmanın eğimini örnekleme hatasıdır.",
      },
      {
        title: "Tepeler paketten hızlı koşuyor",
        predict:
          "Derin suda ilerleyen bir dalga paketinde tek bir tepeyi gözünle izle. Tepe paketle birlikte mi gider, geride mi kalır, öne mi geçer? Paket yol aldıkça genişliği ve Δx·Δk çarpımı değişir mi?",
        do: "03 sekmesinde <strong>B · Dalga paketi</strong> düğmesine bas; <em>Ortam</em> menüsü <em>Derin su: ω = √(g·k)</em> olsun. Noktayla işaretli tepeyi ve düşey merkez çizgisini izle; paket 34 m'ye varıp durunca kartları ve tabloyu oku. Ortamı önce <em>Dağıtmasız: ω = c·k</em>, sonra <em>Karesel: ω = α·k²</em> yapıp yinele. Alttaki dağılım grafiğinde teğetin ve kirişin eğimlerini karşılaştır.",
        observe:
          "Derin suda paket t = 44,72 s'de durur. Grup hızı 0,626 m/s (kuram 0,625 m/s, +0,24 %), faz hızı 1,247 m/s (kuram 1,250 m/s): tepeler arkada doğup önde söner. Genişlik 1,000 m'den 1,508 m'ye (yaklaşık kuram 1,495 m), Δx·Δk 0,500'den 0,754'e çıkar. Dağıtmasız ortamda (t = 28,02 s) iki hız da 1,000 m/s'dir, genişlik değişmez, çarpım 0,500'de kalır. Karesel ortamda (t = 27,86 s) grup hızı 1,005 m/s ↔ 1,005 m/s, faz hızı 0,506 m/s (kuram 0,503 m/s); genişlik 2,443 m ↔ 2,443 m, çarpım 1,221. Durma anı ve bu değerler oynatma hızına bağlı değildir.",
        explain:
          "Grup hızı ω(k) eğrisine çizilen teğetin, faz hızı başlangıçtan çizilen kirişin eğimidir. ω = √(gk) için teğet kirişin yarısı kadar diktir, ω = αk² için iki katı. Her dalga sayısı başka hızla gittiğinden paket yayılır: Δk değişmez, Δx büyür, çarpım 1/2'nin üstüne çıkar. Derin sudaki genişlik kuramı ω(k)'yi ikinci türevde keser; +0,88 % fark bu yaklaşımın payıdır. Grup hızındaki +0,24 % de gerçektir: kuram yalnız merkezdeki eğimi, ω′(k₀)'ı verir; paket merkezi bütün bileşenlerin grup hızlarının ortalamasıyla ilerler. Faz hızı ise yayılan paketin merkezindeki tek bir tepeden ölçülür.",
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
    title: "Fazör üçgeninden duran dalga oranına",
    prompt:
      "Dalga hızı v = 2,00 m/s olan bir ipte dalga boyu λ = 3,0 m olan iki sinüs dalgası var. (a) İkisi de +x yönünde gidiyor; A₁ = 3,0 cm, A₂ = 2,0 cm, 2. dalga 60° önde. Bileşke genliği, fazını ve şiddet oranını bul. (b) 2. dalga −x yönüne çevriliyor, A₂ = 1,5 cm, başlangıç fazları sıfır. En küçük ve en büyük genliği, yerlerini ve duran dalga oranını bul; net güç akışını yorumla.",
    steps: [
      "Ortak büyüklükler: f = v/λ = (2,00 m/s)/(3,0 m) = 0,667 Hz; k = 2π/λ = 2,094 rad/m; ω = 2πf = 4,189 rad/s. İki dalga aynı frekansta olduğu için fazörleri aynı hızla döner ve toplamları yine 0,667 Hz'lik tek bir salınımdır.",
      "(a) Fazörleri bileşenlerine ayır. 1. ok ekseni üzerinde: (3,0; 0) cm. 2. ok 60° açıda: (2,0·cos 60°; 2,0·sin 60°) = (1,000; 1,732) cm. Toplam (4,000; 1,732) cm; boyu A = √(4,000² + 1,732²) = √19 = 4,359 cm. Bileşke 1. dalganın tan⁻¹(1,732/4,000) = 23,4° önündedir. Kosinüs teoremi aynı sonucu verir: √(9 + 4 + 12·cos 60°) cm.",
      "Şiddet oranı: I/(I₁ + I₂) = A²/(A₁² + A₂²) = 19/13 = 1,462. Faz farkı üzerinden ortalama alınırsa cos Δφ terimi düşer ve ⟨A²⟩ = 9 + 4 = 13 cm² kalır. Sayfanın açılış durumunda kartlar tam bunları gösterir: 4,359 cm, 1,462 ve 13,000 cm².",
      "(b) Zıt yönde faz farkı konuma bağlıdır: Δφ(x) = π − 2kx. Yıkıcı noktalar Δφ = π (mod 2π), yani 2kx = 2πn koşulundan x = n·λ/2 = 0; 1,5; 3,0; … m'dedir; genlik orada 3,0 − 1,5 = 1,5 cm'dir. Yapıcı noktalar tam aralarında, x = 0,75; 2,25; 3,75; … m'dedir; genlik 3,0 + 1,5 = 4,5 cm. DDO = 4,5/1,5 = 3,000.",
      "Sayfada sınama: <em>Kısmi duran dalga</em> düğmesi bu durumu kurar. Tablo en küçük genlik noktası aralığını 1,500 m ↔ 1,500 m, DDO'yu 3,000 ↔ 3,000 verir. Ölçüm noktası x<sub>p</sub> = 3,00 m'de Δφ = 180,0°, genlik 1,500 cm, şiddet oranı 2,25/11,25 = 0,200; x<sub>p</sub> = 3,75 m'de Δφ = 0,0°, genlik 4,500 cm, oran 1,800.",
      "Güç akışı: her dalganın taşıdığı güç genliğinin karesiyle orantılıdır. Geri gelen dalga ileri gidenin (1,5/3,0)² = 0,25'ini, yani gücün dörtte birini geri taşır; net akış ileri yönde ve ileri dalganın gücünün 75 %'idir. Genlikler eşit olsaydı net akış sıfır olur, DDO sonsuza giderdi: tam duran dalga.",
    ],
    result:
      "(a) A = √19 ≈ 4,359 cm, 1. dalganın 23,4° önünde; şiddet oranı 1,462. (b) Genlik 1,5 cm ile 4,5 cm arasında değişir, en küçük genlik noktaları λ/2 = 1,5 m arayla dizilir, DDO = 3,000 ve gücün 75 %'i net olarak ileri akar. Tersinden okunursa: bir hat üzerinde DDO ölçmek, geri dönen dalganın genlik oranını (DDO − 1)/(DDO + 1) = 0,5 olarak verir.",
  },
  misconceptions: [
    {
      myth: "Karşılaşan iki dalga çarpışır, birbirini bozar ya da geri seker.",
      truth:
        "Doğrusal bir ortamda dalgalar birbirinin içinden geçer. Buluştukları anda yer değiştirmeler toplanır, ayrıldıklarında her biri eski biçimi, hızı ve yönüyle yoluna devam eder. Sayfanın ipinde bunu ölçebilirsin: iki atma iç içe geçtikten sonra, t = 2,00 s'de biçimleri karşılaşmadan öncekiyle karşılaştırılır ve sapma 0 cm çıkar.",
    },
    {
      myth: "Yıkıcı girişimde dalgaların enerjisi yok olur.",
      truth:
        "Enerji yok olmaz; ya yer ya biçim değiştirir. Sürekli dalgalarda düğümde eksilen şiddet karında fazlasıyla görünür ve ortalama, iki dalganın şiddetlerinin toplamıdır. Zıt işaretli iki atma üst üste gelip ipi dümdüz ettiğinde ise enerji yer değiştirmeden hıza geçer: o an potansiyel enerji sıfır, kinetik pay 100,0 %'dir.",
    },
    {
      myth: "Vuru frekansı iki frekansın ortalamasıdır ya da farkın yarısıdır.",
      truth:
        "Ortalama frekans, duyduğun perdenin, yani taşıyıcının frekansıdır. Farkın yarısı ise özdeşlikteki zarf kosinüsünün frekansıdır; ama ses bu kosinüsün hem artı hem eksi tepesinde güçlenir. Saniyedeki vuru sayısı bu yüzden farkın kendisidir: 440 Hz ile 444 Hz saniyede 2 değil, 4 kez vurur.",
    },
    {
      myth: "Bir dalga paketinde tepeler paketle birlikte, aynı hızla ilerler.",
      truth:
        "Bu yalnız dağıtmasız ortamda doğrudur. Paketin zarfı grup hızıyla (dω/dk), tepeler faz hızıyla (ω/k) gider. Derin suda tepeler paketin iki katı hızla ilerler: arkada belirir, paketin içinden geçer ve önde kaybolur. Enerjiyi ve bilgiyi taşıyan zarftır; sayfadaki paketin merkezi de bu yüzden grup hızıyla yol alır.",
    },
  ],
  glossary: [
    {
      term: "Süperpozisyon ilkesi",
      definition:
        "Doğrusal bir ortamda aynı yerde buluşan dalgaların yer değiştirmelerinin cebirsel olarak toplanması.",
    },
    {
      term: "Doğrusal ortam",
      definition:
        "Tepkisi uyarıyla orantılı olan ortam; süperpozisyon ilkesinin geçerli olduğu koşul.",
    },
    {
      term: "Faz farkı (Δφ)",
      definition:
        "Aynı frekanstaki iki salınımın birbirine göre kaymasının açı cinsinden ölçüsü; bir tam periyotluk kayma 360°'ye karşılık gelir.",
    },
    {
      term: "Fazör",
      definition:
        "Bir sinüs salınımını temsil eden dönen ok: boyu genliği, açısı fazı verir; aynı frekanslı salınımlar fazörleri uç uca eklenerek toplanır.",
    },
    {
      term: "Düğüm ve karın",
      definition:
        "Zıt yönde giden iki dalganın toplamında genliğin en küçük (düğüm) ve en büyük (karın) olduğu, yerinde duran noktalar; komşu düğümlerin arası λ/2'dir.",
    },
    {
      term: "Duran dalga oranı (DDO)",
      definition:
        "Kısmi duran dalgada en büyük genliğin en küçük genliğe oranı: (A₁ + A₂)/|A₁ − A₂|; eşit genliklerde sonsuzdur.",
    },
    {
      term: "Vuru",
      definition:
        "Frekansları biraz farklı iki dalga toplandığında genliğin |f₁ − f₂| frekansıyla periyodik olarak artıp azalması.",
    },
    {
      term: "Grup hızı ve faz hızı",
      definition:
        "Grup hızı dω/dk bir dalga paketinin zarfının, faz hızı ω/k tek tek tepelerin ilerleme hızıdır; dağıtmasız ortamda ikisi eşittir.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede süperpozisyon 'iki dalgayı topla' kuralıdır; üniversitede bir teoremdir: <strong>doğrusal bir diferansiyel denklemin</strong> iki çözümünün toplamı da çözümdür. Fizik I'in dalgalar bölümünde ve Titreşimler ve Dalgalar dersinde bu sayfadaki dört olgu aynı sırayla işlenir; Diferansiyel Denklemler dersi dalga denklemini ve d'Alembert çözümünü kurar. Bir adım sonrası <strong>Fourier analizidir</strong>: her sinyal sinüslerin toplamı olarak yazılabilir ve denklem doğrusal olduğu için her sinüsü ayrı ayrı çözüp sonuçları toplamak yeter. Sayfadaki dalga paketi bunun küçük bir örneğidir; bant genişliği teoremi Δx·Δk ≥ 1/2 de Fourier dönüşümünün genel bir özelliğidir. Hızın dalga boyuna bağlı olduğu ortamlara <em>dağıtıcı ortam</em> denir; prizmanın beyaz ışığı renklerine ayırması da bunun bir örneğidir.",
      "Aynı ilke modern teknolojinin her yerindedir. Radar ve 5G antenlerinde çok sayıda küçük antenin fazı ayarlanarak ışın istenen yöne 'yönlendirilir'; radyo teleskoplar kıtalar arasında birleştirilip tek dev bir teleskop gibi çalıştırılır. Kuantum mekaniğinde ise toplanan şey dalga fonksiyonlarıdır ve olasılık genliğin karesiyle bulunur; tek tek gönderilen elektronların bile çift yarıktan sonra girişim deseni oluşturması bu yüzdendir. Lise fiziğindeki bu basit toplama kuralı, kuantum bilgisayarlarının da çalışma ilkesinin bir parçasıdır.",
      "Modern Fizik ve Kuantum Mekaniği derslerinde aynı matematik yeniden karşına çıkar. Bir parçacığın momentumu p = ħk olduğundan bant genişliği teoremi Δx·Δp ≥ ħ/2 biçimini alır: Heisenberg'in belirsizlik ilkesi. Serbest parçacığın dağılım bağıntısı ω = ħk²/(2m) ise sayfadaki <em>karesel</em> ortamın ta kendisidir; orada ölçtüğün iki sonuç, grup hızının faz hızının iki katı olması ve dar paketin daha hızlı yayılması, serbest bir elektronun dalga paketi için de geçerlidir.",
    ],
    topics: [
      "Dalga denklemi ve d'Alembert çözümü",
      "Fazörler ve karmaşık üstel gösterim",
      "Fourier analizi",
      "Grup hızı, faz hızı ve dağılım bağıntısı",
      "İnterferometri",
      "Faz dizili antenler",
      "Belirsizlik ilkesi ve dalga paketleri",
    ],
  },
  quiz: [
    {
      question:
        "Bir akortçu 440 Hz'lik diyapazonla bir teli birlikte çaldığında saniyede 3 vuru duyuyor. Teli biraz geriyor (frekansı artıyor) ve vuru saniyede 5'e çıkıyor. Tel başlangıçta hangi frekanstaydı?",
      options: ["437 Hz", "441,5 Hz", "443 Hz", "445 Hz"],
      answer: 2,
      explanation:
        "Vuru sayısı farkın yalnız büyüklüğünü verir: |f − 440 Hz| = 3 Hz, yani tel 437 Hz ya da 443 Hz'tir. Germek frekansı yükseltir. Tel 437 Hz olsaydı 440 Hz'e yaklaşır, vuru yavaşlardı; hızlandığına göre tel zaten tizdi: 443 Hz. Yeni frekans 445 Hz'tir. 441,5 Hz, farkı ikiye bölme tuzağının cevabıdır.",
    },
    {
      question:
        "Gergin bir ipte +4,0 cm ve −2,0 cm yüksekliğinde, aynı genişlikte iki atma karşılıklı ilerliyor. Tam üst üste bindikleri anda toplam enerjinin yüzde kaçı kinetiktir?",
      options: ["50 %", "75 %", "90 %", "100 %"],
      answer: 2,
      explanation:
        "Örtüşme anında yer değiştirmeler toplanır (4 − 2 = 2 birim), hızlar ise zıt yönlü atmalarda farkla orantılıdır (4 + 2 = 6 birim). Potansiyel enerji 2² = 4, kinetik enerji 6² = 36 ile orantılıdır: pay 36/40 = 90 %. Genel formül (a₁ − a₂)²/2(a₁² + a₂²)'dir; 100 % yalnız eşit ve zıt atmalarda çıkar. Sayfada a₁ = 4,0 cm, a₂ = −2,0 cm ile sınayabilirsin.",
    },
    {
      question:
        "Karesel ortamda (ω = αk²) bir Gauss paketinin başlangıç genişliği Δx₀ yarıya indiriliyor. Uzun bir süre sonra paketin genişliği, geniş başlayan pakete göre nasıl olur?",
      options: [
        "Yaklaşık yarısı kadar; dar başlayan dar kalır",
        "Aynı; yayılma başlangıç genişliğine bağlı değildir",
        "Yaklaşık iki katı; dar paket daha hızlı yayılır",
        "Yaklaşık dört katı; yayılma Δx₀'ın karesiyle ters orantılıdır",
      ],
      answer: 2,
      explanation:
        "Δk = 1/(2Δx₀) olduğundan paketi yarıya daraltmak dalga sayısı aralığını iki katına çıkarır. Grup hızı dω/dk = 2αk, bileşenler arasında 2α·Δk kadar yayılır; uzun sürede Δx ≈ 2α·Δk·t = α·t/Δx₀, yani Δx₀ ile ters orantılıdır. Sayfada Δx₀ = 1,0 m ile başlayan paket duruncaya kadar 2,443 m'ye, 0,8 m ile başlayan 2,899 m'ye genişler.",
    },
  ],
  next: [
    {
      href: "duran-dalgalar.html",
      title: "Duran Dalgalar: Tel, Hava Sütunu ve Harmonikler",
      why: "Buradaki düğümler uçlarla sınırlanınca yalnız belirli frekanslar yaşar: telde rezonansı ara, düğüm aralığını λ/2 ile karşılaştır, rezonans tüpüyle ses hızını ölç.",
    },
    {
      href: "klasik-girisim.html",
      title: "Young'un Çift Yarık Deneyi: Işığın Girişimi",
      why: "Faz farkını bu kez yol farkı üretir: dalga boyunu, yarık aralığını ve ekran uzaklığını değiştir, saçak aralığını ölçüp Δy = λL/d ile karşılaştır.",
    },
    {
      href: "fourier-ses.html",
      title: "Fourier: Sesten Örneklere",
      why: "İki sinüsten çok sayıda sinüse: harmoniklerden bir ses kur, aynı sesi zaman ve frekans ekseninde oku, örnekleme hızının ölçümü nasıl değiştirdiğini dene.",
    },
    {
      href: "doppler-etkisi.html",
      title: "Doppler Etkisi: Dalga Cepheleri ve Ses Patlaması",
      why: "Frekans farkının bir başka kaynağı harekettir: gözlemcilere varan tepeleri sayarak kayan frekansı ölç ve formülle karşılaştır.",
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
      title: "Wikipedia · Dispersion (water waves)",
      url: "https://en.wikipedia.org/wiki/Dispersion_(water_waves)",
      note: "Derin suda ω² = gk, faz hızı ω/k ve bunun yarısı olan grup hızı; dalga paketi deneyinin dayandığı dağılım bağıntısı.",
    },
    {
      title: "Wikipedia · Wave equation",
      url: "https://en.wikipedia.org/wiki/Wave_equation",
      note: "Bir boyutlu dalga denklemi, d'Alembert'in genel çözümü ve 1747 tarihli gergin tel makalesine atıf.",
    },
  ],
  revision: "Kasım 2026",
};
