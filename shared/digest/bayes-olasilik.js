window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["bayes-olasilik"] = {
  slug: "bayes-olasilik",
  title: "Bayes Teoremi: Kanıtla Fikir Değiştirmenin Matematiği",
  field: "Matematik",
  level: "Lise",
  minutes: 30,
  tagline:
    "Testin pozitif çıktı; hasta olma ihtimalin %95 mi, %9 mu? Cevap testin kalitesinde değil, hastalığın ne kadar nadir olduğunda saklı. Bayes teoremi, yeni bir kanıtla fikrini ne kadar değiştirmen gerektiğini söyler.",
  hook: "Bir hastalık 100 kişiden birinde görülüyor. Test hastaların %95'ini yakalıyor ama sağlıklıların %10'una da yanlışlıkla “pozitif” diyor. Testin pozitif çıktı. Hasta olma olasılığın kaç? Çok kişi içgüdüyle %95'e yakın bir sayı söyler; doğrusu %9'un altında. Sayfayı açınca seni bekleyen büyük mavi sayı tam olarak bu.",
  bigIdea:
    "Bir kanıttan sonra ne kadar emin olman gerektiği iki şeye bağlıdır: kanıttan önceki olasılık (<strong>önsel</strong>) ve kanıtın, iddia doğruyken yanlış olduğuna göre kaç kat sık görüldüğü; olasılığı oran olarak yazarsan bu tek bir çarpımdır: <em>sonsal oran = önsel oran × olabilirlik oranı</em>.",
  story: [
    "Thomas Bayes, Londra'nın güneydoğusundaki Tunbridge Wells kasabasında bir Presbiteryen papazıydı. Hayatı boyunca yalnızca iki eser yayımladığı biliniyor: 1731'de bir ilahiyat kitabı ve 1736'da, adını bile koymadan, Newton'un kalkülüsünü Piskopos Berkeley'in <em>The Analyst</em>'teki saldırısına karşı savunan bir kitapçık. 1742'de Royal Society'ye üye seçildi; bilinen başka matematik yayını olmadığı için bu kitapçık sayesinde seçildiği tahmin ediliyor. Son yıllarında olasılığa merak sardı. Neden sardığını kimse kesin bilmiyor: bir tarihçi 1755'te yazılmış bir eseri incelemesine, bir başkası Abraham de Moivre'ın kitabına, bazıları da Hume'un mucizelere tanıklık üzerine yazdıklarına cevap verme isteğine bağlıyor. Bunlar tahmin, belge değil.",
    "Bayes'in uğraştığı soru, zamanın deyişiyle bir <strong>ters olasılık</strong> sorusuydu. Zarın adil olduğunu bilip “6 gelme olasılığı kaç?” diye sormak kolaydır. Tersi zordur: sonuçları gördün, peki bu sonuçları üreten gizli olasılık neydi? Bayes bunu bir düşünce deneyiyle kurdu: düz bir masaya bir top atılır ve yeri gizlenir; sonra başka toplar atılır ve sana yalnızca kaçının ilk topun bir yanına düştüğü söylenir. İlk top nerededir? Bayes 7 Nisan 1761'de, çözümünü yayımlamadan öldü.",
    "Ailesi kâğıtlarını Bayes'in dostu, papaz ve filozof Richard Price'a verdi. Price, notların değerini fark etti ve onları iki yıl boyunca düzeltip genişletti; bir giriş ve örneklerle dolu bir ek yazdı. Makale, Price'ın mektubu olarak John Canton tarafından 23 Aralık 1763'te Royal Society'de okundu ve <em>Philosophical Transactions</em>'ın 53. cildinde basıldı. Price'ın eklediği örneklerden biri, “Güneş yarın doğacak mı?” sorusuydu. Price 1765'te Royal Society'ye üye seçildi. Bazı yazarlar, onun katkısının o kadar büyük olduğunu düşünür ki teoremi “Bayes–Price kuralı” diye anmayı önerir.",
    "1774'te Fransa'da, henüz yirmili yaşlarının ortasındaki Pierre-Simon Laplace, görünüşe göre Bayes'ten habersiz, aynı fikre ulaştı. Makalesinin adı her şeyi söylüyordu: <em>Olaylardan nedenlerin olasılığı üzerine</em>. Laplace kuralı genel biçimine getirdi, nüfus sayımlarından gökbilime kadar her yerde kullandı ve 1814'teki <em>Olasılıklar Üzerine Felsefi Deneme</em>'de olasılık kuramının “aslında hesaba indirgenmiş sağduyu” olduğunu yazdı. 20. yüzyılın başında pek çok istatistikçi önsel fikrini fazla öznel bulup yöntemi bir kenara itti; “Bayesçi” sözcüğü ancak 1950'ler civarında bugünkü anlamıyla yaygınlaştı. Bu arada teorem Enigma şifresini kırmaya, batık denizaltı aramaya ve sonunda spam filtrelerine taşındı. İngiliz bilim insanı Harold Jeffreys 1973'te onu “olasılık kuramı için, Pisagor teoreminin geometri için olduğu şey” diye tanımladı.",
  ],
  core: [
    {
      heading: "Koşullu olasılık: dünyayı daraltmak",
      body: "“B olduğu bilindiğinde A'nın olasılığı” demek, bütün olasılıkları unutup yalnızca B'nin gerçekleştiği dünyaya bakmak demektir. O küçük dünyanın içinde A'nın payı nedir? Bu paya <strong>koşullu olasılık</strong> denir ve P(A|B) diye yazılır; dikey çizgi “verildiğinde” diye okunur. Sayfadaki ağaç tam bu payları gösterir: “birleşik” yazan sayı, hem A'nın hem B'nin birlikte olduğu durumların bütün içindeki payıdır.",
      formula: "P(A|B) = P(A ∩ B) / P(B)",
      formulaNote:
        "∩ “ve” demektir. P(A|B) ile P(B|A) aynı birleşik payı farklı paydalara böler; bu yüzden genellikle eşit değildir.",
    },
    {
      heading: "Toplam olasılık: B'ye giden iki yol",
      body: "Pozitif bir test sonucuna iki yoldan varılır: ya hastasındır ve test seni yakalamıştır, ya da sağlıklısındır ve test yanılmıştır. P(B), bu iki yolun toplamıdır. Sayfanın varsayılan ayarında ilk yol bütünün %0.95'i, ikinci yol %9.90'ıdır; toplam P(B) = %10.85. İkinci yol yaklaşık on kat daha kalabalıktır, çünkü sağlıklılar hastalardan 99 kat fazladır. Nadir durumlarda paydanın büyük kısmını yanlış alarmlar doldurur.",
      formula: "P(B) = P(B|A)·P(A) + P(B|¬A)·P(¬A)",
      formulaNote:
        "¬A “A değil” demektir ve P(¬A) = 1 − P(A). Grafiklerin altındaki ipucu satırı bu formülün kendisidir.",
    },
    {
      heading: "Bayes teoremi: soruyu ters çevirmek",
      body: "Test üreticisi sana P(B|A)'yı verir: hastalar arasında testin pozitif çıkma oranı. Senin merak ettiğin ise P(A|B)'dir: pozitif çıkanlar arasında hastaların oranı. Bayes teoremi birinden ötekine geçiş köprüsüdür. Üç parçanın adları vardır: <strong>önsel</strong> P(A), kanıttan önceki inanç; <strong>olabilirlik</strong> P(B|A), iddia doğruysa kanıtı görme olasılığı; <strong>sonsal</strong> P(A|B), kanıttan sonraki güncel inanç. Sayfadaki iki çubuk, önseli ve sonsalı yan yana koyar: kanıt sol çubuğu sağdakine dönüştürür.",
      formula: "P(A|B) = P(B|A)·P(A) / P(B)",
      formulaNote:
        "Varsayılan ayarda: 0.95 × 0.01 / 0.1085 ≈ 0.088, yani yaklaşık %8.8.",
    },
    {
      heading: "Oranlar ve olabilirlik oranı: tek çarpmada güncelleme",
      body: "Olasılık yerine <strong>oran</strong> kullanırsan Bayes tek bir çarpmaya iner. Oran, “olanlar : olmayanlar” demektir: 100 kişiden 1'i hastaysa oran 1:99'dur. Kanıtın gücü, <strong>olabilirlik oranı</strong> denen tek bir sayıdadır: kanıt, iddia doğruyken yanlış olduğuna göre kaç kat sık görülüyor? Sayfanın tıbbi testinde bu 95/10 = 9.5'tir. Önsel oran 1:99 idi; 9.5 ile çarpınca 9.5:99 olur, olasılığa çevirince 9.5/108.5 ≈ %8.8. Oran 1 ise kanıt hiçbir şey söylemez: duyarlılığı 50'ye, yanlış pozitifi 50'ye getir, iki çubuk eşitlenir.",
      formula: "sonsal oran = önsel oran × P(B|A) / P(B|¬A)",
      formulaNote:
        "Oran o:1 ise olasılık o/(o+1)'dir. Olabilirlik oranı 1'den büyükse kanıt A'yı destekler, 1'den küçükse zayıflatır.",
    },
    {
      heading: "Dünün sonsalı, bugünün önseli",
      body: "Bayes bir kerelik bir hesap değil, bir öğrenme döngüsüdür. Yeni kanıt geldiğinde bir önceki sonsalı önsel yapıp yeniden güncellersin. İki bağımsız pozitif test, olabilirlik oranlarını çarpar: 9.5 × 9.5 ≈ 90. Ama dikkat: “bağımsız” şartı önemlidir. Aynı kan örneğini aynı makinede iki kez okutmak ikinci bir kanıt değildir; aynı hatayı iki kez yapabilir. Bir de sınır var: önseli tam 0 ya da tam 1 olan biri hiçbir kanıtla fikrini değiştiremez, çünkü 0 ile çarpılan her şey 0'dır.",
      formula: "sonsal oran = önsel oran × OO<sub>1</sub> × OO<sub>2</sub> × …",
      formulaNote:
        "OO, her kanıtın olabilirlik oranıdır. Çarpım, kanıtlar hem A doğruyken hem yanlışken birbirinden bağımsızsa geçerlidir; o zaman sırayla güncellemek hepsini birden kullanmakla aynı sonucu verir.",
    },
  ],
  lab: {
    intro:
      "Üstteki <strong>Senaryo</strong> panelinde üç düğme var: <strong>Tıbbi test</strong>, <strong>Hava durumu</strong> ve <strong>Zar (hile)</strong>. Bir düğme, üç kaydırıcıyı o senaryonun değerlerine getirir ve varsayımlarını düğmelerin altına yazar. <strong>Parametreler</strong> panelinde üç kaydırıcı var: <strong>Önsel P(A)</strong> (%0.1–%50, 0.1'lik adım), <strong>Olasılık P(B|A)</strong> (%50–%100) ve <strong>Olasılık P(B|¬A)</strong> (%0–%50). Son ikisi 1'lik adımla ilerler ve etiketleri senaryoya göre değişir: tıbbi testte “duyarlılık” ile “yanlış pozitif”, havada “yağmurlu günde bulut” ile “yağmursuz günde bulut”, zarda “hileli zarda 6” ile “adil zarda 6”. Aşağıdaki kutuda önce sayıların yerine konduğu formül, onun altında büyük mavi sayıyla sonsal P(A|B), en altta P(B) yazar. Sonra gelen ağaç iki dalı ve “birleşik” payları, çubuk çizimi de önseli (sol çubuk) ve sonsalı (sağ çubuk) gösterir; geniş ekranda ağaç ile çizim yan yana, telefonda alt alta durur. Sayfa yüzde işaretini sayının sonuna koyar (8.8%); deneylerde ekranda gördüğün biçimi kullandık. Kaydırıcıyı tam değere getirmek için üstüne tıkla, sonra <kbd>←</kbd>/<kbd>→</kbd> tuşlarını kullan.",
    experiments: [
      {
        title: "Nadir hastalık tuzağı",
        predict:
          "Hastalık %1 sıklıkta, duyarlılık %95, yanlış pozitif %10. Pozitif çıkan birinin gerçekten hasta olma olasılığı sence kaç? Aynı test, hastalığın %10 ya da %50 olduğu bir grupta kullanılsa ne olur?",
        do: "<strong>Tıbbi test</strong> düğmesine bas. Mavi sayıyı, P(B)'yi ve ağaçtaki iki “birleşik” değeri oku. Sonra yalnızca Önsel P(A) kaydırıcısını önce 10.0'a, sonra 50.0'a getir.",
        observe:
          "Önsel 1.0%'de P(A|B) ≈ 8.8%, P(B) = 10.85%; ağaçta birleşik değerler 0.95% (hasta ve pozitif) ve 9.90% (sağlıklı ama pozitif). Önsel 10.0%'de sonsal 51.4%, 50.0%'de 90.5%. Test hiç değişmedi; değiştirdiğin tek şey önsel, yani sol çubuk. Sağ çubuk onu izledi.",
        explain:
          "10 000 kişiyi düşün: 100 hasta, bunların 95'i pozitif; 9 900 sağlıklı, bunların 990'ı da pozitif. 1 085 pozitifin yalnızca 95'i hasta: 95/1085 ≈ %8.8. Nadir bir durumda yanlış alarmlar gerçek vakaları sayıca ezer. Aynı test, şikâyeti olan ve önseli yüksek bir hastada çok daha anlamlıdır.",
      },
      {
        title: "Hangi kaydırıcı daha değerli?",
        predict:
          "Tıbbi test ayarındasın. Bir mühendis duyarlılığı %95'ten %100'e çıkarabiliyor, bir başkası yanlış pozitifi %10'dan %5'e indirebiliyor. Hangisi pozitif sonucu daha güvenilir yapar?",
        do: "<strong>Tıbbi test</strong>'e bas. Duyarlılığı 100'e çıkar ve sonsalı oku. Duyarlılığı 95'e geri al; bu kez yanlış pozitifi sırayla 5, 1 ve 0 yap.",
        observe:
          "Duyarlılık 100%: sonsal yalnızca 9.2%. Duyarlılık 95% iken yanlış pozitif 5% → 16.1%, 1% → 49.0%, 0 → 100.0%. Yanlış pozitif sıfırken etiket “0.000%” yazar ve P(B) birleşik hasta payına, 0.95%'e eşitlenir.",
        explain:
          "Kanıtın gücü olabilirlik oranıdır: 95/10 = 9.5, 100/10 = 10, ama 95/5 = 19 ve 95/1 = 95. Nadir bir durumda paydayı sağlıklı çoğunluğun yanlış alarmları doldurur; onları azaltmak, hastaları biraz daha iyi yakalamaktan çok daha etkilidir. Yanlış pozitif sıfırsa pozitif sonuç ancak hastadan gelebilir.",
      },
      {
        title: "İkinci test: sonsal yeni önsel olur",
        predict:
          "İlk pozitif testten sonra olasılık yaklaşık %8.8. Birbirinden bağımsız ikinci bir test de pozitif çıkarsa olasılık ne olur? Üçüncüsü de pozitifse?",
        do: "<strong>Tıbbi test</strong>'e bas ve sonsalı not et. Duyarlılığa ve yanlış pozitife dokunmadan Önsel P(A)'yı 8.8'e getir. Çıkan yeni sonsalı yine önsele yaz.",
        observe:
          "Önsel 8.8%'de sonsal 47.8%, P(B) = 17.48%. Önsel 47.8%'de sonsal 89.7%, P(B) = 50.63%. Sol çubuk her adımda bir önceki sağ çubuğun boyuna gelir.",
        explain:
          "Oranlarla: 1:99 → 9.5:99 → 90.25:99 → 857:99. Her bağımsız pozitif oranı 9.5 ile çarpar; üç testten sonra olasılık yaklaşık %89.6'dır (sayfa önseli bir ondalığa yuvarladığı için 89.7% gösterir). Önsel kaydırıcısı %50'de bittiği için dördüncü adım sayfada denenemez.",
      },
      {
        title: "Tek bir 6 zarı ele verir mi?",
        predict:
          "Torbadaki zarların %5'i hileli; hileli zar %99 olasılıkla 6 getiriyor, adil zar 1/6 olasılıkla. Tek bir 6 gördün: zarın hileli olma olasılığı %50'yi geçer mi? Aynı zar ikinci kez 6 getirirse?",
        do: "<strong>Zar (hile)</strong> düğmesine bas; “adil zarda 6” kaydırıcısı 17'de durur (1/6 ≈ %16.7'ye en yakın tam sayı). Sonsalı oku. İkinci 6 için Önsel P(A)'yı 23.5'e getir. En son “adil zarda 6”yı 5'e çekip önseli 5.0'a geri al: olabilirliği yanlış girersen ne olur?",
        observe:
          "Tek 6: sonsal 23.5%, P(B) = 21.10%; ağaçta birleşik değerler 4.95% (hileli ve 6) ve 16.15% (adil ama 6). Önsel 23.5%'de sonsal 64.1%, P(B) = 36.27%. Adil zarda 6'yı 5% girince tek bir 6 bile sonsalı 51.0%'e fırlatır.",
        explain:
          "Olabilirlik oranı 0.99 ÷ (1/6) ≈ 5.9'dur: bir 6, önsel oranı 1:19'dan yaklaşık 5.9:19'a taşır, yani %23.8'e (sayfa 17% kullandığı için 23.5% gösterir). İkinci 6 oranı yine 5.9 ile çarpar: yaklaşık %65. Adil zarın 6 olasılığını %5 sanmak oranı 99/5 ≈ 20'ye şişirir. Bayes'in sonucu, içine koyduğun olabilirlikler kadar doğrudur: formülü değil, varsayımları sorgula.",
      },
    ],
  },
  wow: [
    {
      title: "Enigma'yı kıran birim: deciban",
      body: "1940'ta Bletchley Park'ta Alan Turing, Alman deniz Enigma'sının günlük ayarını ararken kanıtı ölçmek için bir birim tanımladı: <strong>ban</strong> ve onda biri <strong>deciban</strong>. 1941'de ekibe katılan asistanı I. J. Good, bu birimleri savaştan sonra ayrıntılı biçimde anlattı. Ad, yöntemde kullanılan ve Banbury kasabasında basılan dev kartlardan geliyordu. 10 deciban 10'a 1 oran demektir. Good'a göre 1 deciban (eşit şanstan yaklaşık 5'e 4'e kayış), bir insanın inancındaki değişimi ayırt edebileceği en ince adımdır. Decibanları toplamak, olabilirlik oranlarını çarpmanın logaritmik hâlidir: saf Bayes.",
    },
    {
      title: "Okyanusun dibinde bir olasılık haritası",
      body: "Mayıs 1968'de ABD'nin nükleer denizaltısı USS Scorpion kayboldu. Kıyı açıklarındaki arama sonuç vermeyince donanma uzmanı John Craven, matematikçi danışmanlarla birlikte denizi karelere böldü; deneyimli denizaltı komutanlarının kaza senaryolarına göre her kareye bir olasılık verdi ve aramayı en olası karelerden başlayarak planladı. Ekim 1968 sonunda enkaz, Azor Adaları'nın yaklaşık 740 km güneybatısında, yaklaşık 3 000 metre derinlikte bulundu. Aynı yöntem, 2009'da Atlantik'e düşen Air France 447'nin kayıt cihazlarının bulunmasında da kilit rol oynadı.",
    },
    {
      title: "Güneş yarın doğacak mı?",
      body: "Price'ın ekinde de geçen bu soruyu Laplace kendi kuralıyla hesapladı. Bir olay n denemede n kez olduysa ve başta her olasılığı eşit derecede mümkün sayıyorsan, bir sonrakinin olma olasılığı (n+1)/(n+2)'dir; buna <strong>ardıllık kuralı</strong> denir. Kayıtlı tarihin 5 000 yıl geriye gittiğini varsayınca Güneş'in yarın doğması için yaklaşık 1 826 000'e 1'lik bir oran buldu. Ama hemen ekledi: günleri ve mevsimleri düzenleyen yasayı kavrayan biri için bu sayı çok daha büyüktür. Yani önseli “hiçbir şey bilmiyorum” almak da bir varsayımdır.",
    },
  ],
  worked: {
    title: "Spam filtresi tek kelimeyle ne kadar emin olur?",
    prompt:
      "Varsayalım ki gelen e-postaların %40'ı spam. “Bedava” kelimesi spam e-postaların %60'ında, normal e-postaların ise %3'ünde geçiyor (sayılar örnek için seçildi). İçinde “bedava” geçen bir e-postanın spam olma olasılığı kaçtır?",
    steps: [
      "Olayları adlandır: A = “e-posta spam”, B = “içinde ‘bedava’ geçiyor”. Verilenler: önsel P(A) = 0.40, olabilirlik P(B|A) = 0.60, yanlış alarm P(B|¬A) = 0.03; dolayısıyla P(¬A) = 0.60.",
      "Sayılarla düşün: 1 000 e-postanın 400'ü spam, bunların 400 × 0.60 = 240'ında kelime geçiyor. 600 normal e-postanın 600 × 0.03 = 18'inde geçiyor. Kelimeyi içeren toplam e-posta 240 + 18 = 258.",
      "Bayes ile hesapla: P(B) = 0.60 × 0.40 + 0.03 × 0.60 = 0.24 + 0.018 = 0.258. P(A|B) = 0.24 / 0.258 ≈ 0.930. Bu, adım 2'deki 240/258 kesrinin aynısıdır.",
      "Oranlarla kontrol et: önsel oran 400:600 = 2:3, olabilirlik oranı 0.60/0.03 = 20. Sonsal oran 2:3 × 20 = 40:3, olasılık 40/43 ≈ 0.930.",
      "Sayfada doğrula: Önsel P(A)'yı 40.0'a, duyarlılığı 60'a, yanlış pozitifi 3'e getir. Büyük mavi sayı “P(A|B) ≈ 93.0%”, alt satır “P(B) = 25.80%” gösterir; ağaçta birleşik değerler 24.00% ve 1.80%'dir.",
    ],
    result:
      "Tek bir kelime spam olasılığını %40'tan yaklaşık %93'e çıkarır. Yine de 258 e-postanın 18'i yanlışlıkla işaretlenir; bu yüzden gerçek filtreler tek kelimeye değil, birçok kelimenin olabilirlik oranlarını birleştirmeye dayanır.",
  },
  misconceptions: [
    {
      myth: "Test %95 duyarlıysa, pozitif çıkan birinin hasta olma olasılığı da %95'tir.",
      truth:
        "%95, hastalar arasında pozitif çıkma oranıdır: P(B|A). Merak edilen ise pozitifler arasında hastaların oranıdır: P(A|B). İkisini karıştırmaya <strong>taban oranı yanılgısı</strong> denir; hastalığın ne kadar nadir olduğu unutulur. Sayfanın tıbbi test ayarında duyarlılık %95 iken sonsal yalnızca 8.8%'dir.",
    },
    {
      myth: "Masum birinin bu kanıtı üretme olasılığı milyonda birse, sanığın masum olma olasılığı da milyonda birdir.",
      truth:
        "Bu, <strong>savcı yanılgısı</strong>dır: P(kanıt | masum) ile P(masum | kanıt) aynı sanılır. 1999'da İngiltere'de Sally Clark, iki bebeğinin ölümü yüzünden cinayetten mahkûm edildi; mahkemede iki ani bebek ölümünün “73 milyonda bir” olduğu söylendi. Royal Statistical Society 2001'de bu sayının dayanağı olmadığını açıkladı: tek ölüm olasılığının karesi alınmıştı, oysa aynı ailedeki iki ölümü bağımsız saymak için bir gerekçe yoktu. Asıl soru, çifte ani ölümün çifte cinayetten kaç kat olası olduğuydu; çifte cinayet daha da nadirdir. Mahkûmiyet 2003'te, gizlenmiş tıbbi raporlar ortaya çıkınca bozuldu.",
    },
    {
      myth: "Aynı test aynı sonucu verdiyse, o sonuç herkes için aynı anlama gelir.",
      truth:
        "Sonucun anlamı önsele bağlıdır. Rastgele seçilmiş birinde (önsel %1) pozitif test 8.8% demektir; belirtileri olan ve doktorun zaten yarı yarıya şüphelendiği birinde (önsel %50) aynı test 90.5% demektir. Bu yüzden tarama testlerinde pozitif sonuç genellikle tanı değil, ikinci ve farklı bir testin gerekçesidir.",
    },
    {
      myth: "Önsel öznel bir tahmin olduğuna göre Bayes'in sonucu da keyfidir.",
      truth:
        "Önsel açıkça yazılmak zorundadır; bu bir zayıflık değil, dürüstlüktür: herkes varsayımını görür ve itiraz edebilir. Ayrıca bağımsız kanıt biriktikçe farklı önsellerle başlayan iki kişinin sonsalları birbirine yaklaşır. Tek gerçek tuzak uç değerlerdir: önseli tam 0 ya da 1 olan biri hiçbir kanıtla fikrini değiştiremez.",
    },
  ],
  glossary: [
    {
      term: "Koşullu olasılık P(A|B)",
      definition:
        "B'nin gerçekleştiği bilindiğinde A'nın olasılığı; B'li durumların içinde A'nın payı.",
    },
    {
      term: "Önsel olasılık",
      definition:
        "Yeni kanıt görülmeden önce bir iddiaya verilen olasılık; sayfadaki P(A) ve soldaki çubuk.",
    },
    {
      term: "Olabilirlik",
      definition:
        "İddia doğruysa gözlenen kanıtı görme olasılığı, P(B|A); tıbbi testte duyarlılık.",
    },
    {
      term: "Sonsal olasılık",
      definition:
        "Kanıt hesaba katıldıktan sonra iddiaya verilen güncel olasılık, P(A|B); sayfadaki mavi sayı ve sağdaki çubuk.",
    },
    {
      term: "Duyarlılık",
      definition:
        "Testin gerçekten hasta olanları pozitif bulma oranı, P(pozitif | hasta).",
    },
    {
      term: "Özgüllük",
      definition:
        "Testin sağlıklıları negatif bulma oranı, P(negatif | sağlıklı); 1 eksi yanlış pozitif oranıdır.",
    },
    {
      term: "Taban oranı",
      definition:
        "Bir durumun toplumdaki ya da incelenen gruptaki genel sıklığı; tıbbi örnekte hastalığın yaygınlığı ve önsel.",
    },
    {
      term: "Olabilirlik oranı",
      definition:
        "P(B|A) / P(B|¬A); kanıtın iddia doğruyken yanlış olduğuna göre kaç kat sık görüldüğü ve önsel oranı çarptığı sayı.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede Bayes, tek bir evet/hayır sorusu için bir formüldür. Üniversitede bilinmeyen bir sayının tamamı için bir <strong>olasılık dağılımına</strong> dönüşür: bir paranın tura gelme oranı, bir ilacın etkisi ya da bir gezegenin kütlesi tek bir sayı olarak değil, bir eğri olarak tahmin edilir. Bayes'in kendi masa problemi tam olarak buydu. Önsel eğri veriyle çarpılır, sonsal eğri çıkar; veri arttıkça eğri daralır. Gerçek problemlerde bu çarpımın integrali elle alınamaz; bilgisayarlar <em>Markov zinciri Monte Carlo</em> gibi rastgele örnekleme yöntemleriyle sonsalı adım adım keşfeder. İstatistik bölümlerinde “frekansçı” ve “Bayesçi” yaklaşımların hangi soruya nasıl cevap verdiği, hâlâ canlı bir tartışmadır.",
      "Mühendislik ve bilgisayar biliminde Bayes her yerdedir. Telefonundaki GPS ve otonom araçların konum tahmini, her yeni ölçümle bir önceki tahmini güncelleyen <strong>Kalman filtresi</strong> gibi yöntemlere dayanır; bu, çan eğrileri için yazılmış ardışık Bayes güncellemesidir. İlk istatistiksel spam filtreleri, kelimelerin olabilirlik oranlarını çarpan “naif Bayes” sınıflandırıcılarıydı. Judea Pearl'ün <strong>Bayes ağları</strong>, birçok değişkenin birbirini nasıl etkilediğini modelleyerek tıbbi tanı sistemlerinin ve nedensellik araştırmalarının temelini attı. Turing'in decibanları ise bilgi kuramına uzanır: kanıtı logaritmayla ölçmek, bilgiyi bit ile ölçmenin akrabasıdır.",
    ],
    topics: [
      "Olasılık dağılımları",
      "Beta–binom modeli",
      "Markov zinciri Monte Carlo",
      "Kalman filtresi",
      "Naif Bayes sınıflandırıcı",
      "Bayes ağları",
      "Bilgi kuramı ve log-oranlar",
    ],
  },
  quiz: [
    {
      question:
        "Bir hastalık 1 000 kişiden 20'sinde var. Test bütün hastaları yakalıyor (duyarlılık %100) ama sağlıklıların %5'ine de pozitif diyor. Pozitif çıkan birinin hasta olma olasılığı yaklaşık kaçtır?",
      options: ["%100", "Yaklaşık %95", "Yaklaşık %29", "Yaklaşık %2"],
      answer: 2,
      explanation:
        "20 hastanın 20'si pozitif; 980 sağlıklının %5'i, yani 49 kişi de pozitif. 69 pozitifin 20'si hasta: 20/69 ≈ %29. Sayfada önseli 2.0, duyarlılığı 100, yanlış pozitifi 5 yaparsan 29.0% görürsün. Kusursuz duyarlılık bile yanlış alarmları ortadan kaldırmaz.",
    },
    {
      question:
        "Sayfada duyarlılığı %50'ye ve yanlış pozitifi de %50'ye ayarlarsan, hangi önseli seçersen seç sonsal ne olur?",
      options: [
        "Her zaman %50 olur",
        "Önsele eşit kalır",
        "%100'e çıkar",
        "Sıfıra düşer",
      ],
      answer: 1,
      explanation:
        "Kanıt, iddia doğruyken de yanlışken de aynı sıklıkta görülüyorsa olabilirlik oranı 50/50 = 1'dir ve önsel oran 1 ile çarpılır: hiçbir şey değişmez. Yazı tura atıp “hasta mıyım?” diye sormak gibidir. Sayfada iki çubuk aynı boya gelir ve P(B) = 50.00% olur.",
    },
    {
      question:
        "Bir uzman, “Masum biri bu kanıtı ancak milyonda bir olasılıkla üretir” diyor. Buna göre hangisi doğrudur?",
      options: [
        "Sanığın masum olma olasılığı milyonda birdir",
        "Masum biri bu kanıtı neredeyse hiç üretmediğine göre sanık neredeyse kesin suçludur",
        "Karar için önsel ve suçlu birinin bu kanıtı üretme olasılığı da bilinmelidir",
        "Bu kadar nadir bir kanıt mahkemede hiçbir şey söylemez",
      ],
      answer: 2,
      explanation:
        "Verilen sayı P(kanıt | masum)'dur, P(masum | kanıt) değil; ikisini eşitlemek savcı yanılgısıdır. 60 milyon kişilik bir ülkede bu kanıtı üretecek yaklaşık 60 masum insan vardır; suçluyla birlikte 61 kişi kanıta uyar. Başka hiçbir kanıt yoksa sanığın masum olma olasılığı milyonda bir değil, yaklaşık 60/61'dir. Kanıt yine de değerlidir: şüpheli sayısını milyonlardan onlara indirir. Sally Clark davasında unutulan tam bu hesaptı.",
    },
  ],
  next: [
    {
      href: "genetik-caprazlama.html",
      title: "Genetik Çaprazlama",
      why: "Punnett karesi olasılığı ileri yönde verir. Tersini sor: Aa × Aa çaprazlamasında baskın görünen bir yavrunun taşıyıcı olma olasılığı neden 2/3?",
    },
    {
      href: "normal-dagilim.html",
      title: "Normal Dağılım",
      why: "Olasılık bir eğri olunca: Galton tahtasındaki histogramı çan eğrisiyle karşılaştır, Merkezi limit teoremi sekmesinde çarpık bir dağılımın ortalamalarının da çana döndüğünü izle. Bayesçi istatistik de bu dili konuşur.",
    },
    {
      href: "makine-ogrenmesi-derin-ogrenme-llm.html",
      title: "Makine Öğrenmesi, Derin Öğrenme ve LLM",
      why: "Spam filtresi bir sınıflandırma örneği, softmax ise modelin çıktısını bir olasılık dağılımına çeviren katman: çözümlü örneğin büyük kardeşleri.",
    },
    {
      href: "bilimsel-yontem-olcme-ve-belirsizlik.html",
      title: "Bilimsel Yöntem, Ölçme ve Belirsizlik",
      why: "Bir sonuç kesin hüküm değil, kanıt bütününün parçasıdır: Bayesçi düşüncenin laboratuvardaki karşılığı olan ölçme ve belirsizlik.",
    },
  ],
  sources: [
    {
      title: "Wikipedia · Bayes' theorem",
      url: "https://en.wikipedia.org/wiki/Bayes%27_theorem",
      note: "Formül, tıbbi test örnekleri ve tarihçe: Price'ın düzenlemesi, 23 Aralık 1763 okuması, Laplace'ın 1774 makalesi (İngilizce).",
    },
    {
      title: "3Blue1Brown · Bayes' theorem",
      url: "https://www.3blue1brown.com/lessons/bayes-theorem",
      note: "Teoremi alanlar ve kişi sayılarıyla görselleştiren ders; “kütüphaneci mi çiftçi mi?” örneğiyle taban oranı sezgisi.",
    },
    {
      title: "Stanford Encyclopedia of Philosophy · Bayes' Theorem",
      url: "https://plato.stanford.edu/entries/bayes-theorem/",
      note: "Teoremin farklı biçimleri, olabilirlik oranı ve kanıtın felsefedeki yeri üzerine derin ve güvenilir bir giriş.",
    },
    {
      title: "Wikipedia · Sally Clark",
      url: "https://en.wikipedia.org/wiki/Sally_Clark",
      note: "Savcı yanılgısının gerçek bedeli: “73 milyonda bir” iddiası, Royal Statistical Society açıklaması ve 2003'teki tahliye.",
    },
  ],
  revision: "Kasım 2026",
};
