window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["asteroids"] = {
  slug: "asteroids",
  title: "Asteroids: Uzayda Eylemsizlik Dersi",
  field: "Oyun",
  level: "Lise hazırlık",
  minutes: 30,
  tagline:
    "1979'da Atari'nin en çok satan kabini, beş düğmeyle Newton'un birinci yasasını öğretti: gemi baktığı yöne değil, hız vektörünün gösterdiği yöne gider. Bu sayfadaki kodun her satırı o dersin içinde.",
  hook:
    "1979'daki Asteroids kabininde kol yoktu; beş düğme vardı: sol, sağ, itiş, ateş, hiperuzay. İlk kez oynayan hemen herkes aynı şeyi yaşadı: burnu sağa çevirdi, ama gemi yukarı kaymaya devam etti ve bir kayaya çarptı. Bu sayfada da olacak. Peki bir gemi neden baktığı yere gitmez ve bu neden bir hata değil, fiziğin ta kendisidir?",
  bigIdea:
    "Uzayda gemi <strong>hız vektörünün</strong> gösterdiği yöne gider, burnunun baktığı yöne değil; itiş o vektöre burun yönünde küçük bir ok ekler ve sürtünme olmadığı için eklenen ok kendiliğinden silinmez.",
  story: [
    "Asteroids'in atası bir salon makinesi değil, bir üniversite bilgisayarıydı. 1962'de MIT'de Steve Russell ve arkadaşları, odayı dolduran PDP-1 üzerinde <strong>Spacewar!</strong> adlı bir oyun yazdı: iki uzay gemisi, ortada yerçekimiyle çeken bir yıldız, torpidolar ve ekranın kenarından çıkınca karşı kenardan giren gemiler. Gemiler dönüyor, itiş yapıyor ve itişi bırakınca hızlarını koruyordu; yani oyun, daha ilk günden Newton'un birinci yasasını kural olarak benimsemişti. Nolan Bushnell bu oyunu öğrenciliğinde oynadı ve 1971'de Ted Dabney'le birlikte bozuk parayla çalışan bir sürümünü yaptı: <em>Computer Space</em>, tarihin ilk ticari salon video oyunu. Satış hayal kırıklığıydı; anlatılana göre insanlar dönüş-itiş mantığını barda öğrenmeye üşeniyordu. Bushnell bir sonraki yıl çok daha basit bir oyunla, Pong'la Atari'yi kurdu.",
    "Sekiz yıl sonra aynı şirket aynı fikre döndü. 1979'da Atari'de Lyle Rains, anlatılana göre oyuncuların önceki bir projede gezegenlerden çok ekrandaki kayaları vurmaya çalıştığını fark etmişti; fikri Ed Logg'a anlattı, Logg oyunu birkaç ayda programladı. Donanım da yeniydi: Howard Delman'ın tasarladığı <strong>vektör ekran</strong>, görüntüyü piksel satırlarıyla değil, elektron ışınını noktadan noktaya sürerek çizgi çizgi üretiyordu. Bu yüzden Asteroids'in gemisi ve kayaları içi boş, keskin çizgilerden oluşur; bu sayfanın da yalnızca çizgi çizmesinin sebebi o tarihe saygıdır. Kayıtlara göre Kasım 1979'da piyasaya çıkan oyun 70 binden fazla kabin sattı ve Atari'nin tüm zamanlardaki en çok satan salon oyunu oldu.",
    "Logg'un puan tablosu bugün bu sayfada aynen çalışır: büyük kaya 20, orta 50, küçük 100 puan. Küçük kaya vurması zor olduğu için daha değerlidir; büyük bir kayanın tamamını temizlemek 1 + 2 + 4 = 7 atış ve 520 puan demektir. Orijinalde iki şey daha vardı: uçan daireler ve gemiyi rastgele bir yere ışınlayan hiperuzay düğmesi. Oyuncular kısa sürede 'pusu' taktiğini buldu: ekranın kenarında bekleyip yalnızca 1000 puanlık küçük daireleri vuruyorlardı. Kayıtlara göre Atari sonraki yonga sürümlerinde ve 1981'deki Asteroids Deluxe'de bu taktiğe karşı önlem aldı. Rekorlar da buna göre büyüdü: Kasım 1982'de 15 yaşındaki Scott Safran 41.336.440 puan yaptı; bu rekor 2010'da John McAllister'ın yaklaşık 58 saat süren oyununa kadar 27 yıl kırılamadı. Bu sayfadaki sürümde daire ve hiperuzay yok; ama hareket kuralları, puanlar ve kayalar bittikçe hızlanan kalp atışı 1979'daki gibidir.",
  ],
  core: [
    {
      heading: "Burun bir yön, hız bir ok",
      body:
        "Gemi iki ayrı sayı taşır: burnunun açısı <em>a</em> ve hız vektörü (v<sub>x</sub>, v<sub>y</sub>). ← ve → yalnızca açıyı değiştirir: saniyede 360°, yani karede 12°; tam tur bir saniye sürer. ↑ ise açıya dokunmaz, hız vektörüne burun yönünde küçük bir ok ekler: her karede 1/6 piksel. Dönerken hız vektörü olduğu gibi kalır; bu yüzden burnu sağa çevirsen de gemi yukarı kaymaya devam eder. Yeni yön, eski okla yeni okun toplamıdır; gemi ancak itişi uzun tutarsan yavaş yavaş burnunun yönüne 'ikna olur'. Kodda dikkat edilecek bir ayrıntı daha var: ekranda y aşağı doğru büyüdüğü için yukarı itiş y hızını azaltır; sin önünde eksi işareti bundandır.",
      formula: "v<sub>x</sub> ← v<sub>x</sub> + (5/30)·cos a,  v<sub>y</sub> ← v<sub>y</sub> − (5/30)·sin a",
      formulaNote: "Hızlar piksel/kare cinsinden; oyun saniyede 30 kare attığı için 1 px/kare = 30 px/s.",
    },
    {
      heading: "Eylemsizlik ve oyunun gizli sürtünmesi",
      body:
        "Newton'un birinci yasası, kuvvet yoksa hızın değişmeyeceğini söyler; gerçek bir uzay gemisi itişi kesince sonsuza kadar aynı hızla süzülür. Bu oyunu oynanabilir kılmak için tasarımcı küçük bir hile ekler: tuş basılı değilken her karede hızın yüzde 2.33'ü silinir. Bu bir <strong>üstel sönüm</strong>dür: hız her 29 karede, yani yaklaşık bir saniyede yarıya iner. Gemi hiçbir zaman tam durmaz, sadece görülmeyecek kadar yavaşlar. Tuş bırakıldığı andaki hız v₀ ise kayma mesafesi toplamı v₀·q/(1 − q) ≈ 41.9·v₀ pikseldir; 10 px/kare ile bırakılan gemi 419 piksel kayar. Radyoaktif bozunma ve soğuyan çayın matematiği de aynı q<sup>n</sup> dizisidir.",
      formula: "v<sub>n</sub> = v<sub>0</sub>·q<sup>n</sup>,  q = 1 − 0.7/30 ≈ 0.9767",
      formulaNote: "Yarı ömür: q<sup>n</sup> = ½ için n = ln 0.5 / ln q ≈ 29.4 kare ≈ 0.98 s.",
    },
    {
      heading: "Tuş basılıyken: sabit ivme, sınırsız hız",
      body:
        "↑ basılıyken sürtünme satırı hiç çalışmaz; hız her karede tam 1/6 piksel artar, yani saniyede 5 px/kare. Bu, 150 px/s²'lik <strong>sabit ivme</strong> demektir ve serbest düşmeyle aynı matematiktir: hız zamanla doğru orantılı, alınan yol zamanın karesiyle. Bir saniyede 150 px/s, üç saniyede 450 px/s, on saniyede 1500 px/s: kodda hiçbir üst sınır yoktur. Gemi hızlandıkça kenardan kenara turlar kısalır: 2.0 s, 1.5 s, 1.0 s, 0.8 s… Bu sınırsızlığın bedeli de var: bir karede 28 pikselden fazla atlayan gemi, küçük bir kayanın çarpışma dairesinin (13 + 15 = 28 px) içinden hiç 'görmeden' geçebilir. Oyun motorcuları buna tünelleme der.",
      formula: "v = a·t,  x = ½·a·t²,  a = 150 px/s²",
      formulaNote: "Kodun yorum satırı 'piksel/s²' der ama değer px/kare cinsindendir; gerçek ivme 5 × 30 = 150 px/s²'dir.",
    },
    {
      heading: "Lazer: Galileo'nun unuttuğu toplama",
      body:
        "Hareket eden bir trenden ileri atılan top, yerdeki birine göre trenin hızı artı atış hızıyla gider; buna Galileo'nun hız toplama kuralı denir. Bu sayfadaki lazer o kuralı bilmez: kod lazerin hızını yalnızca burun açısından hesaplar, geminin hızını eklemez. Lazer dünyaya göre her zaman 500 px/s, yani 16.67 px/kare gider. Sonuç tuhaf ama ölçülebilir: gemi 500 px/s'yi geçince (3.33 saniye kesintisiz itişten sonra) burundan çıkan lazeri geride bırakır; kendi mermisini sollarsın. Menzil de sınırlıdır: 0.6 × 760 = 456 piksel, yani 28 karede ömrünü doldurur. Ekranda en çok 10 lazer olabilir ve Space her basışta tek lazer atar; tuşu bırakmadan ikinci atış olmaz.",
      formula: "v<sub>lazer</sub> = 500·(cos a, −sin a) px/s  (gerçekte: v<sub>gemi</sub> + 500·(cos a, −sin a))",
      formulaNote: "Gerçek fizikte mermi, atıldığı aracın hızını da taşır; buradaki sadeleştirme bir tasarım tercihidir.",
    },
    {
      heading: "Torus, daireler ve 520 puanlık kaya",
      body:
        "'Kenarlar birbirine bağlı' notu bir topoloji dersidir: sağdan çıkan soldan, alttan çıkan üstten girer. Böyle bir yüzeye <strong>torus</strong> denir; ekran düz görünür ama simit gibi kapalıdır ve 'en uzak nokta' bile en çok yarım ekran ötededir. Çarpışmalar ise çizilen zikzaklı kayaya göre değil, görünmez bir daireye göre karar verilir: büyük kaya 50, orta 25, küçük 13, gemi 15 piksel yarıçaplı. Kayanın köşeleri yarıçapın 0.6 ile 1.4 katı arasında rastgele çizildiğinden lazer bazen görünür kenarın dışında patlar, bazen bir çıkıntının içinden geçer. Puanlama bir ağaçtır: her büyük kaya iki ortaya, her orta iki küçüğe bölünür; 20 + 2·50 + 4·100 = 520. İlk seviyede 3 büyük kaya vardır: 'Seviye 2' yazısı belirdiğinde skor tam 1560'tır. Gemi çarparak da kaya parçalar ve puan alır; ama can gider.",
      formula: "Seviye k'nin puanı = (2 + k)·520;  3 seviye sonunda 1560 + 2080 + 2600 = 6240",
      formulaNote: "Her seviye bir büyük kaya ekler ve kaya hızlarını yüzde 10 artırır (1 + 0.1·seviye çarpanı).",
    },
  ],
  lab: {
    intro:
      "Kontroller dört tuş ve bir düğme: <strong>←</strong> ve <strong>→</strong> gemiyi döndürür (tam tur bir saniye), <strong>↑</strong> itiş verir, <strong>Space</strong> her basışta bir lazer atar, <strong>Yeni Oyun</strong> baştan başlatır. Göstergeler: sağ üstte skor, ortada REKOR, sol üstte kalan canlar, ekranın alt yarısında 2.5 saniyede solan 'Seviye' yazısı. Oyun alanı 760 × 570 oyun pikselidir ve saniyede 30 kare atar; aşağıdaki bütün sayılar bu birimlerdedir. Her yeni gemi 3 saniye yanıp söner ve bu sürede dokunulmazdır: deneylerin çoğunu bu güvenli pencerede yapabilirsin.",
    experiments: [
      {
        title: "Burun nereye, gemi nereye?",
        predict:
          "Gemiyi yukarı ittirip tuşu bırak, sonra → ile burnu sağa çevir. Gemi sağa mı gider, yukarı kaymaya devam mı eder? Şimdi ↑'ye bir saniye daha basarsan yol hangi yöne kıvrılır: dümdüz sağa mı, çapraza mı?",
        do: "Yeni Oyun'a bas. Gemi yanıp sönerken ↑'ye bir saniye basılı tut ve bırak. → tuşunu çeyrek saniye kadar tut; burun 90° dönüp sağa baksın. Gemi hâlâ kayarken ↑'ye bir saniye daha bas.",
        observe:
          "Burun sağa döner ama gemi yukarı kaymaya devam eder; baktığı yer ile gittiği yer ayrışır. İkinci itişte yol birden sağa kırılmaz, yavaşça kıvrılır: gemi yatayla yaklaşık 40° eğimle sağ yukarı gider ve eskisinden hızlıdır, saniyede 195 piksel kadar.",
        explain:
          "Hız bir vektördür ve ok eklemeyle değişir. İlk itiş yukarı 150 px/s'lik bir ok verdi; çeyrek saniyelik dönüş sırasında sürtünme bunu yüzde 17 eritip 125 px/s'ye indirdi. İkinci itiş sağa 150 px/s ekledi. İki okun toplamı yaklaşık 195 px/s ve yatayla arctan(125/150) ≈ 40°. Dönmek hız vektörüne dokunmaz; yalnızca bir sonraki itişin yönünü seçer.",
      },
      {
        title: "Fren yok, sürtünme var: kayma mesafesi",
        predict:
          "Gemi dururken ↑'ye tam iki saniye basıp bırakırsan ekranın ne kadarını kayarak geçer: bir gemi boyu mu, yarım ekran mı, bir ekran mı? Görünür biçimde durması kaç saniye sürer?",
        do: "Yeni Oyun'un 3 saniyelik dokunulmaz penceresini kullan: ↑'ye 'bin-bir, bin-iki' diyecek kadar (2 s) bas, bırak ve kaymayı izle. Sonra yeni oyunda 4 saniye basılı tutup bırak; bu kez kenardan çıkıp karşıdan girecek.",
        observe:
          "İki saniyelik itişin sonunda gemi saniyede 300 piksel gider; tuşu bıraktıktan sonra yaklaşık 420 piksel, yani ekran genişliğinin yarısından fazlasını kayarak alır. Hızı her saniye kabaca yarıya iner; 6–7 saniye sonra kıpırtısı kalmaz. Dört saniyelik itişte gemi daha tuş basılıyken iki kez üstten çıkıp alttan girer; bıraktıktan sonra 840 piksel daha, yani bir tam ekran boyu daha kayar.",
        explain:
          "Tuş basılı değilken kod her karede hızın yüzde 2.33'ünü siler: v ← v·(1 − 0.7/30). Bu üstel sönümdür, yarı ömrü 29 kare ≈ 0.98 s. Toplam kayma, v₀ = 10 px/kare için 41.9 × 10 ≈ 419 piksel; 20 px/kare için iki katı. Gerçek uzayda bu sayı sonsuz olurdu; sürtünme, oyunu kontrol edilebilir kılmak için eklenmiş bir hiledir.",
      },
      {
        title: "Hız sınırı yok: turlar kısalır, lazer geride kalır",
        predict:
          "↑'ye hiç bırakmadan basarsan gemi bir üst hıza takılır mı? Kenardan kenara her tur aynı sürede mi geçer? Ve çok hızlı giden gemiden çıkan lazer gemiden hızlı mı, yavaş mı olur?",
        do: "Yeni Oyun'a bas; burun yukarı bakar. ↑'ye basılı tut ve geminin üst kenardan kaç saniyede çıkıp alttan girdiğini say. Dördüncü saniyeden sonra, hâlâ itiş yaparken Space'e birkaç kez bas ve lazerlerin nereye gittiğine bak. Bir can kaybetmeyi göze al: dokunulmazlık 3 saniyede biter.",
        observe:
          "İlk çıkış yaklaşık 2 saniyede, sonraki turlar 1.5, 1.0, 0.8, 0.7 saniyede gelir; on saniye sonra gemi saniyede iki buçuk kez ekranı geçen bir çizgiye döner. Dört saniye itişten sonra Space'e basınca lazer burundan çıkar ama gemi onu geçer; lazer geminin arkasında kalır ve orada söner.",
        explain:
          "Tuş basılıyken sürtünme satırı çalışmaz; hız her karede 1/6 piksel, saniyede 150 px/s artar. Sabit ivmede yol t² ile büyür, eşit yollar gittikçe kısa sürer: serbest düşmenin ekrandaki hâli. Lazer ise her zaman 500 px/s gider ve geminin hızını taşımaz; 3.33 saniye itişten sonra gemi 500 px/s'yi geçer ve kendi mermisini sollar. Ayrıca 5.6 saniyeden sonra gemi karede 28 pikselden fazla atladığı için küçük kayaların içinden tünelleyebilir.",
      },
      {
        title: "Puan muhasebesi ve kalp atışı",
        predict:
          "Birinci seviyedeki bütün kayaları temizlediğinde 'Seviye 2' yazısı belirirken skor kaç olur? Bir kayayı vurduğunda parçalar annesinin yönünde mi devam eder? Arka plandaki tok vuruş sesi oyun boyunca aynı hızda mı kalır?",
        do: "Yeni bir oyunda üç büyük kayayı (ve parçalarını) sabırla temizle; 'Seviye 2' yazısı çıktığı anda sağ üstteki skoru oku. Birkaç büyük kayayı vururken iki parçanın yönünü izle. Sesi açık tut ve kayalar azaldıkça kalp atışının temposunu dinle.",
        observe:
          "Skor tam 1560'tır; nasıl vurduğun, kaç can kaybettiğin fark etmez. 'Seviye 3'te 3640, 'Seviye 4'te 6240 okursun. Parçalar birbirinden bağımsız, rastgele yönlere gider; ikisi birden annesinin tersine de uçabilir. Kalp atışı seviye başında saniyede bir vurur, son kayada saniyede üçten fazla vuruşa çıkar; yeni seviyede yeniden yavaşlar.",
        explain:
          "Her büyük kaya 7 parçaya ayrılır ve 20 + 2·50 + 4·100 = 520 puan verir; seviye başına kaya sayısı 3 + seviye olduğundan skor (2 + k)·520 ile artar. Gemi çarpınca da kaya parçalanır ve puan yazılır, bu yüzden toplam değişmez. Parçalar momentumu korumaz: kod her parçaya yeni rastgele hız verir; gerçek bir patlamada parçaların momentumları toplamı annesininkine eşit olurdu. Tempo ise kalan kaya oranına bağlıdır: vuruş aralığı 1 − 0.75·(1 − kalan/21) saniye; son kayada yaklaşık 0.3 s.",
      },
    ],
  },
  wow: [
    {
      title: "Işınla çizilen ekran",
      body:
        "Asteroids'in kabininde piksel yoktu. Vektör ekranda elektron ışını, bir kalem gibi bir noktadan diğerine sürülür ve yalnızca çizgiler parlar; dolgu, renk ya da doku çizmek mümkün değildir. Bu yüzden 1979'un gemisi üç çizgiden, kayaları da bir avuç kırık çizgiden oluşur. Kayıtlara göre oyun 70 binden fazla kabin satarak Atari'nin en çok satan salon oyunu oldu. Bu sayfanın yalnızca kenar çizgisi çizmesi bir eksiklik değil, o ekrana yazılmış bir mektuptur.",
    },
    {
      title: "27 yıl dayanan rekor",
      body:
        "Kasım 1982'de 15 yaşındaki Scott Safran, Asteroids'te 41.336.440 puana ulaştı. Oyunun puan göstergesi beş haneliydi ve 99.990'dan sonra sıfıra dönüyordu; bu yüzden milyonluk skorlar, göstergenin kaç kez sıfırlandığı sayılarak tutulur. Bu rekor 2010 yılına, John McAllister'ın yaklaşık 58 saat süren ve 41.838.740 puanla biten oyununa kadar kırılamadı. Bir salon oyununda bir rekorun 27 yıl ayakta kalması, oyunun basit ama tüketilemez bir derinliğe sahip olduğunun kanıtıdır.",
    },
    {
      title: "Gerçek kuşak neredeyse boştur",
      body:
        "Oyundaki gibi kayalar arasından kıvrılarak geçmek gerçek asteroit kuşağında gereksizdir. Mars ile Jüpiter arasındaki kuşakta yüz binlerce kayalık cisim bilinir, ama o kadar geniş bir hacme dağılmışlardır ki komşu asteroitler arasındaki ortalama uzaklık kabaca bir milyon kilometredir. 1972–73'te Pioneer 10 kuşağı ilk kez geçti; ondan sonraki hiçbir uzay aracı da kuşağı aşarken bir kayaya çarpmadı. Kuşaktaki tüm cisimlerin toplam kütlesi Ay'ınkinin bile çok altındadır.",
    },
  ],
  worked: {
    title: "İki saniyelik itişin hesabı",
    prompt:
      "Gemi ekranın ortasında, burnu yukarı ve hareketsiz. ↑'ye tam 2 saniye basıp bırakıyorsun. Bırakma anındaki hızı, itiş sırasında alınan yolu ve sonraki kayma mesafesini bul. Gemi üst kenardan çıkar mı?",
    steps: [
      "Birimleri yerleştir: oyun saniyede 30 kare atar; itiş her karede hıza 5/30 = 0.1667 px/kare ekler. 2 saniye = 60 kare.",
      "Bırakma anındaki hız: v = 60 × 0.1667 = 10 px/kare. Saniyeye çevir: 10 × 30 = 300 px/s. (Sabit ivme: a = 150 px/s², t = 2 s, v = a·t = 300 px/s.)",
      "İtiş sırasında alınan yol: kod her karede önce hızı artırır, sonra konumu ilerletir; yol 0.1667 × (1 + 2 + … + 60) = 0.1667 × 1830 ≈ 305 px. (Sürekli formülle ½·a·t² = ½ × 150 × 4 = 300 px; fark, kesikli adımlardan gelir.)",
      "Kayma mesafesi: tuş bırakılınca hız her karede q = 1 − 0.7/30 = 0.9767 ile çarpılır. Toplam yol v·q/(1 − q) = 10 × 0.9767/0.0233 ≈ 419 px. Yarı ömür ln 0.5 / ln q ≈ 29 kare ≈ 0.98 s.",
      "Toplam: 305 + 419 ≈ 724 px. Gemi merkezden (y = 285) başladı; üst kenara 285 + 15 = 300 px vardı. İtiş biterken tam üst kenardan çıkar, alttan girer ve kayarak 420 px daha tırmanıp ekranın üst üçte birinde yavaşça durur.",
    ],
    result:
      "Bırakma hızı 300 px/s; itişte 305 px, kayarak 419 px, toplam yaklaşık 724 px: gemi bir kez üst kenardan çıkıp alttan girer. Kaymanın yarısı ilk saniyede biter, geri kalanı beş saniyeye yayılır.",
  },
  misconceptions: [
    {
      myth: "Gemi burnunun baktığı yöne gider.",
      truth:
        "Burun yalnızca bir sonraki itişin yönüdür. Hız vektörü ayrı bir büyüklüktür ve dönmekle değişmez; gemi, eski hızıyla yeni itişin toplamına göre gider. Yukarı kayarken burnu sağa çevirip kısa itersen gemi sağa değil, çapraz sağ yukarı gider. Gerçek uzay araçları da böyledir: yönelim ve hız iki ayrı kontrol problemidir.",
    },
    {
      myth: "Tuşu bırakınca gemi durur; uzayda da öyle olurdu.",
      truth:
        "Gerçek uzayda duracak bir şey yoktur; itişi kesen gemi sonsuza dek aynı hızla süzülür. Bu sayfadaki yavaşlama, kodun her karede hızın yüzde 2.33'ünü silen bir hilesidir; yarı ömrü yaklaşık bir saniyedir. Durmak için gerçek yöntem oyunda da aynıdır: 180° dönüp ters yönde itmek. 10 px/kare ile giden gemiyi yarım saniyelik dönüşten sonra durdurmak 1.4 saniye itiş ister.",
    },
    {
      myth: "Küçük kayalar daha hızlıdır ve parçalar annesinin yönünde gider.",
      truth:
        "Orijinal oyunda küçük parçalar genellikle daha hızlıydı; bu sayfada bütün kayalar aynı rastgele hız aralığından (bileşen başına en çok 50 px/s, seviye başına yüzde 10 artar) çekilir ve her parça yepyeni bir yön alır. Gerçek bir parçalanmada momentum korunur: parçaların momentumları toplamı annesininkine eşittir. Oyun bunu basitleştirir; fark edilmesi, simülasyonu doğru okumanın ilk adımıdır.",
    },
    {
      myth: "Lazer kayanın çizgisine değince patlar.",
      truth:
        "Çarpışma, çizilen zikzaklı şekle değil, kayanın merkezindeki görünmez bir daireye göre karar verilir: 50, 25 ya da 13 piksel yarıçap. Köşeler bu yarıçapın 0.6–1.4 katı arasında çizildiği için lazer bazen çizginin dışında patlar, bazen bir çıkıntının içinden geçer. Oyun motorlarında şekil ve çarpışma gövdesi neredeyse hep birbirinden ayrıdır.",
    },
  ],
  glossary: [
    { term: "Hız vektörü", definition: "Hızın hem büyüklüğü hem yönü; gemide (v<sub>x</sub>, v<sub>y</sub>) olarak tutulur ve burun açısından bağımsızdır." },
    { term: "Eylemsizlik", definition: "Net kuvvet yokken cismin hızını koruması; Newton'un birinci yasası ve itişi bırakınca süzülen geminin nedeni." },
    { term: "Sabit ivme", definition: "Hızın her saniye aynı miktarda artması; itişte 150 px/s², yol zamanın karesiyle büyür." },
    { term: "Üstel sönüm", definition: "Bir büyüklüğün her adımda aynı oranda küçülmesi, v<sub>n</sub> = v<sub>0</sub>·q<sup>n</sup>; sayfada q = 0.9767, yarı ömür 0.98 s." },
    { term: "Galileo hız toplama", definition: "Hareketli bir araçtan atılan cismin dışarıdan görülen hızının, aracın hızı ile atış hızının toplamı olması; sayfadaki lazer bunu uygulamaz." },
    { term: "Torus", definition: "Karşılıklı kenarları birbirine yapıştırılmış yüzey; 'kenarlar birbirine bağlı' oyun alanının geometrisi." },
    { term: "Çarpışma dairesi", definition: "Bir nesnenin çarpışma hesabında kullanılan görünmez daire; merkezler arası uzaklık yarıçaplar toplamından küçükse çarpışma vardır." },
    { term: "Tünelleme", definition: "Çok hızlı bir nesnenin bir karede engelin ötesine atlayıp çarpışmanın hiç fark edilmemesi; burada 28 px/kare üstünde başlar." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın döngüsü, bir fizik motorunun en küçük hâlidir: önce hızı güncelle, sonra konumu; buna <strong>yarı örtük Euler</strong> adımı denir ve enerjiyi basit Euler'den daha iyi korur. Üniversitede sayısal integrasyon dersinde aynı adımın hatası, kare hızına bağımlılığı (bu oyun 30 kareye sabitlenmiştir; kare atlanırsa zaman yavaşlar) ve tünellemeyi önleyen sürekli çarpışma tespiti işlenir. Uçuş mekaniğinde ise 'burun ayrı, hız ayrı' ilkesi profesyonel bir problemdir: bir uydunun yönelimini tepki tekerleri, hızını ise ayrı itici motorlar değiştirir; yörüngede öndeki araca yetişmek için hızlanmak değil, yavaşlayıp alçak yörüngeye inmek gerekir. Kepler sayfası bu paradoksu açar.",
      "Oyunun ikinci üniversite hayatı bilgisayar bilimindedir. Torus topolojisi, hücresel otomatlardan periyodik sınır koşullu moleküler simülasyonlara kadar her yerde 'kenarları yapıştırma' hilesi olarak kullanılır. Çarpışma daireleri, dışbükey poligonlar ve uzamsal bölme ağaçlarıyla genelleşir; momentum korunumu ise parçalanan kayaların doğru fiziğini verir. 2015'te DeepMind'ın yalnızca ekran piksellerinden öğrenen derin pekiştirmeli öğrenme ajanı 49 Atari oyununda denendi; Asteroids listedeydi ve kayıtlara göre ajan bu oyunda insan düzeyinin altında kaldı. Burun ile hız vektörünü ayırt etmek, bir sinir ağı için de kolay değildir.",
    ],
    topics: ["Sayısal integrasyon (Euler, yarı örtük Euler, Verlet)", "Katı cisim dinamiği ve yönelim kontrolü", "Yörünge mekaniği", "Topoloji: düz torus ve periyodik sınır koşulları", "Çarpışma tespiti ve hesaplamalı geometri", "Momentum korunumu", "Pekiştirmeli öğrenme"],
  },
  quiz: [
    {
      question: "Gemi yukarı doğru kayıyor. → ile burnu sağa çevirip ↑'ye kısa bir an basarsan gemi hangi yöne gider?",
      options: ["Dümdüz sağa", "Yukarı kaymaya devam eder, hiç değişmez", "Çapraz sağ yukarı", "Dümdüz yukarı ama daha hızlı"],
      answer: 2,
      explanation: "Dönmek hız vektörünü değiştirmez; itiş ona sağa doğru küçük bir ok ekler. Eski yukarı ok ile yeni sağ okun toplamı çapraz sağ yukarıdır. Sağa dönmesi için itişin yukarı bileşeni silene kadar sürmesi gerekir.",
    },
    {
      question: "Birinci seviyedeki bütün kayalar temizlendiğinde skor kaç olur?",
      options: ["60", "520", "1560", "Nasıl vurduğuna bağlıdır"],
      answer: 2,
      explanation: "Her büyük kaya 2 orta ve 4 küçüğe ayrılır: 20 + 100 + 400 = 520 puan. Birinci seviyede 3 büyük kaya var: 3 × 520 = 1560. Gemiyle çarparak parçalamak da aynı puanı yazar, bu yüzden toplam sabittir.",
    },
    {
      question: "Gemi saniyede 600 piksel hızla giderken burun yönünde ateş edersen bu sayfada ne olur?",
      options: ["Lazer 1100 px/s ile öne fırlar", "Lazer 500 px/s gider ve gemi onu geçer", "Lazer gemiyle aynı hızda yanında kalır", "Oyun ateşe izin vermez"],
      answer: 1,
      explanation: "Kod lazerin hızını yalnızca burun açısından hesaplar, geminin hızını eklemez; lazer dünyaya göre hep 500 px/s'dir. Gerçek fizikte Galileo toplama kuralıyla 1100 px/s olurdu. 500 px/s'yi aşan gemi kendi mermisini sollar.",
    },
  ],
  next: [
    { href: "vektorler.html", title: "Vektörler", why: "Eski hız artı yeni itiş: iki okun toplamını kâğıt üzerinde çiz ve 40°'lik çaprazın nereden geldiğini gör." },
    { href: "newton-hareket-yasalari.html", title: "Newton'un Hareket Yasaları", why: "Eylemsizlik ve F = ma; geminin neden süzüldüğünün ve itişin neden sabit ivme verdiğinin kaynağı." },
    { href: "momentum-itme-ve-carpismalar.html", title: "Momentum, İtme ve Çarpışmalar", why: "Parçalanan kayanın gerçek fiziği: parçaların momentumları toplamı neden annesininkine eşit olmalı." },
    { href: "serbest-dusme.html", title: "Serbest Düşme ve Hava Direnci", why: "Sabit ivmede t² ile büyüyen yol ve hıza bağlı direnç: oyunun iki hareket rejiminin fizik laboratuvarı." },
  ],
  sources: [
    { title: "Wikipedia · Asteroids (video game)", url: "https://en.wikipedia.org/wiki/Asteroids_(video_game)", note: "Rains ve Logg'un tasarımı, vektör donanımı, puan tablosu, pusu taktiği ve rekorlar (İngilizce)." },
    { title: "Wikipedia · Spacewar!", url: "https://en.wikipedia.org/wiki/Spacewar!", note: "1962'de PDP-1 üzerinde yazılan ata oyun: dönüş, itiş, eylemsizlik ve torpidolar." },
    { title: "OpenStax · University Physics Vol. 1, 5.2 Newton's First Law", url: "https://openstax.org/books/university-physics-volume-1/pages/5-2-newtons-first-law", note: "Eylemsizlik ve eylemsiz referans çerçeveleri; geminin süzülmesinin ders kitabı karşılığı (İngilizce, açık ders kitabı)." },
    { title: "NASA Science · Asteroids", url: "https://science.nasa.gov/solar-system/asteroids/", note: "Gerçek asteroit kuşağı: sayılar, uzaklıklar ve kuşağı geçen uzay araçları." },
  ],
  revision: "Ekim 2026",
};
