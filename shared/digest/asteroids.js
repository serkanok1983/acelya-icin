window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["asteroids"] = {
  slug: "asteroids",
  title: "Asteroids: Uzayda Eylemsizlik Dersi",
  field: "Oyun",
  level: "Lise–Lisans",
  minutes: 30,
  tagline:
    "1979'da Atari'nin en çok satan kabini, beş düğmeyle Newton'un birinci yasasını öğretti: gemi baktığı yöne değil, hız vektörünün gösterdiği yöne gider. Bu sayfadaki kodun her satırı o dersin içinde.",
  hook:
    "1979'daki Asteroids kabininde kol yoktu; beş düğme vardı: sol, sağ, itiş, ateş, hiperuzay. İlk kez oynayan hemen herkes aynı şeyi yaşadı: burnu sağa çevirdi, ama gemi yukarı kaymaya devam etti ve bir kayaya çarptı. Bu sayfada sana da olacak. Bir gemi neden baktığı yere gitmez ve bu neden bir hata değil de fiziğin ta kendisidir?",
  bigIdea:
    "Gemi burnunun baktığı yöne değil, <strong>hız vektörünün</strong> gösterdiği yöne gider; itiş o vektöre burun yönünde küçük bir ok ekler ve eklenen ok dönmekle silinmez. Bu sayfada onu yalnızca zayıf bir sürtünme, saniyeler içinde eritir.",
  story: [
    "Asteroids'in atası bir salon makinesi değil, bir üniversite bilgisayarıydı. 1962'de MIT'de Steve Russell ve arkadaşları, PDP-1 adlı dolap büyüklüğündeki bilgisayarda <strong>Spacewar!</strong> adlı bir oyun yazdı: iki uzay gemisi, ortada yerçekimiyle çeken bir yıldız, torpidolar ve ekranın bir kenarından çıkınca karşı kenardan giren gemiler. Gemiler dönüyor, itiş yapıyor ve itişi bırakınca hareketlerini sürdürüyordu; oyun daha ilk günden Newton'un birinci yasasını kural olarak benimsemişti. Spacewar!'ı bir üniversite laboratuvarında oynayan genç mühendis Nolan Bushnell, 1971'de Ted Dabney'le birlikte onun bozuk parayla çalışan bir türevini yaptı: <em>Computer Space</em>, ilk ticari salon video oyunu olarak anılır. Bin küsur kabin sattı ama beklenen patlamayı yapmadı; anlatılana göre insanlar dönüş-itiş mantığını barda öğrenmeye üşeniyordu. Bushnell ertesi yıl Atari'yi kurdu ve çok daha basit bir oyunla, Pong'la öne çıktı.",
    "Sekiz yıl sonra Atari aynı fikre döndü. Nisan 1979'daki bir toplantıda Lyle Rains, Ed Logg'a yarım kalmış bir projeyi hatırlattı: içinde vurulamayan dev bir asteroit vardı ve oyuncular yine de ona ateş edip duruyordu. Rains'in önerisi basitti: kayalar vurulsun ve parçalansın. Logg oyunu programladı; hareket kurallarını ve beş düğmeli kontrolü Spacewar!'dan aldı. Donanım da yeniydi: Wendi Allen'ın (o dönemki adıyla Howard Delman) az önce Lunar Lander için tamamladığı <strong>vektör ekran</strong> kartı, görüntüyü piksel satırlarıyla değil, elektron ışınını noktadan noktaya sürerek çizgi çizgi üretiyordu. Asteroids'in gemisi ve kayaları bu yüzden içi boş, keskin çizgilerden oluşur; bu sayfanın yalnızca çizgi çizmesi o tarihe bir selamdır. Oyun Kasım 1979'da çıktı ve Atari'nin en çok satan salon oyunu oldu; kabin sayısı kaynağa göre değişir, yaklaşık 56 bin diyen de vardır, 70 bini aşkın diyen de.",
    "Logg'un puan tablosu bu sayfada aynen çalışır: büyük kaya 20, orta 50, küçük 100 puan. Küçük kaya vurması zor olduğu için daha değerlidir; büyük bir kayanın tamamını temizlemek 1 + 2 + 4 = 7 isabet ve 520 puan demektir. Orijinalde iki şey daha vardı: uçan daireler ve gemiyi rastgele bir yere ışınlayan hiperuzay düğmesi. Oyuncular kısa sürede 'pusu' taktiğini buldu: ekranda bir iki kaya bırakıp kenarda bekliyor, kenarın öbür yanından çıkan daireleri güvenle vuruyorlardı; salon sahipleri şikâyet edince Atari yongayı yamadı. Rekorlar da büyüdü: 13 Kasım 1982'de 15 yaşındaki Scott Safran 41.336.440 puan yaptı ve bu rekor, John McAllister'ın Nisan 2010'daki 58 saatlik oyununa kadar 27 yıl kırılamadı. Bu sayfadaki sürümde daire ve hiperuzay yok; ama dönüş-itiş mantığı, puanlar ve kayalar azaldıkça hızlanan kalp atışı 1979'dan kalmadır.",
  ],
  core: [
    {
      heading: "Burun bir yön, hız bir ok",
      body:
        "Gemi iki ayrı büyüklük taşır: burnunun açısı <em>a</em> ve hız vektörü (v<sub>x</sub>, v<sub>y</sub>). ← ve → yalnızca açıyı değiştirir: saniyede 360°, yani karede 12°; tam tur bir saniye sürer. ↑ ise açıya dokunmaz, hız vektörüne burun yönünde küçük bir ok ekler: her karede 1/6 piksel/kare. Dönerken hız vektörü olduğu gibi kalır; burnu sağa çevirsen de gemi yukarı kaymayı sürdürür. Yeni yön, eski okla yeni okun <strong>vektör toplamıdır</strong>; gemi ancak itişi uzun tutarsan yavaş yavaş burnunun yönüne 'ikna olur'. Kodda bir ayrıntı daha var: ekranda y aşağı doğru büyüdüğü için yukarı itiş y hızını azaltır; sin'in önündeki eksi işareti bundandır.",
      formula: "v<sub>x</sub> ← v<sub>x</sub> + (5/30)·cos a,  v<sub>y</sub> ← v<sub>y</sub> − (5/30)·sin a",
      formulaNote: "Hızlar piksel/kare cinsindendir; oyun saniyede 30 kare attığı için 1 px/kare = 30 px/s.",
    },
    {
      heading: "Birinci yasa ve oyunun eklediği sürtünme",
      body:
        "Newton'un birinci yasası, net kuvvet sıfırsa hızın ne büyüklüğünün ne yönünün değişeceğini söyler; itişi kesen gerçek bir uzay aracı aynı hızla süzülmeye devam eder. Bu sayfa o yasaya bilerek küçük bir kuvvet ekler: ↑ basılı değilken her karede hızın yüzde 2.33'ü silinir. Hızla orantılı bu fren, sürekli zamanda dv/dt = −k·v denklemidir; k = 0.7 s⁻¹. Çözümü <strong>üstel sönüm</strong>dür: v(t) = v₀·e<sup>−kt</sup>. Zaman sabiti 1/k ≈ 1.43 s, yarılanma süresi ln 2/k ≈ 0.99 s; hız her saniye kabaca yarıya iner ve hiçbir zaman tam sıfır olmaz. Hızın integrali toplam kayma yolunu verir: v₀/k. Kod aynı şeyi kare kare yapar ve v₀·q/(1 − q) bulur; 300 px/s ile bırakılan gemi sürekli modelde 429, kodda 419 piksel kayar. Aradaki 10 piksel tam bir karelik yoldur: ayrık adımın bedeli. Radyoaktif bozunma ve boşalan kondansatör de aynı denkleme uyar.",
      formula: "dv/dt = −k·v  ⇒  v = v₀·e<sup>−kt</sup>;  kodda v<sub>n</sub> = v₀·q<sup>n</sup>,  q = 1 − 0.7/30 ≈ 0.9767",
      formulaNote: "Yarılanma: q<sup>n</sup> = ½ için n = ln 0.5 / ln q ≈ 29.4 kare ≈ 0.98 s. Kayma yolu: sürekli v₀/k, kodda v₀/k − (bir karelik yol).",
    },
    {
      heading: "Tuş basılıyken: sabit ivme, sınırsız hız",
      body:
        "↑ basılıyken kodun sürtünme satırı hiç çalışmaz; hız her karede tam 1/6 px/kare artar. Bu, 150 px/s²'lik <strong>sabit ivme</strong>dir ve serbest düşmeyle aynı matematiktir: hız zamanla, alınan yol zamanın karesiyle büyür. Bir saniyede 150 px/s, üç saniyede 450 px/s, on saniyede 1500 px/s; kodda üst sınır yoktur. Sürtünme itiş sırasında da işleseydi denklem dv/dt = a − k·v olur, hız a/k ≈ 214 px/s'lik bir limit hıza yaklaşırdı; paraşütçünün limit hızı aynı dengedir. Burada fren itişle birlikte kapandığı için öyle bir tavan yok. Bedeli çarpışma testinde çıkar: oyun gemiyi kare kare 'ışınlar' ve yalnızca vardığı noktaya bakar. Gemi ile küçük kayanın çarpışma daireleri toplam 13 + 15 = 28 piksel yarıçaplıdır; adım 56 pikseli (11 saniyelik itiş) geçince gemi kayanın tam ortasından bile fark edilmeden atlayabilir, kenardan sıyıran geçişlerde bu çok daha erken olur. Oyun motorcuları buna <strong>tünelleme</strong> der.",
      formula: "v = a·t,  x = ½·a·t²,  a = 150 px/s²",
      formulaNote: "Kodun yorum satırı ivmeye 'piksel/s²' der ama 5 değeri saniyede 5 px/kare demektir; gerçek ivme 5 × 30 = 150 px/s²'dir.",
    },
    {
      heading: "Lazer: unutulan hız toplaması",
      body:
        "İlerleyen bir trenden ileri atılan top, yerde duran birine göre trenin hızı artı atış hızıyla gider; buna <strong>Galileo'nun hız toplama kuralı</strong> denir ve Newton mekaniğinde her eylemsiz gözlemci için geçerlidir. Bu sayfadaki lazer o kuralı uygulamaz: kod lazerin hızını yalnızca burun açısından hesaplar, geminin hızını eklemez. Lazer ekrana göre her zaman 500 px/s, yani karede 16.67 piksel gider. Sonuç tuhaftır ama ölçülebilir: gemi 500 px/s'yi geçince (3.33 saniye kesintisiz itiş) burnundan çıkan lazeri geride bırakır. Menzil de sınırlıdır: lazer 0.6 × 760 = 456 pikseli aştığı ilk karede silinir; 28 adım atar, 467 piksel gider ve 0.93 saniye yaşar. Ekranda en çok 10 lazer olabilir; Space her basışta tek lazer atar, tuşu bırakmadan ikincisi çıkmaz.",
      formula: "v<sub>lazer</sub> = 500·(cos a, −sin a) px/s   (gerçekte: v<sub>gemi</sub> + 500·(cos a, −sin a))",
      formulaNote: "Gerçek bir mermi, atıldığı aracın hızını da taşır. Buradaki sadeleştirme bir tasarım tercihidir; nişan almayı kolaylaştırır.",
    },
    {
      heading: "Kenarları yapıştır: torus",
      body:
        "'Kenarlar birbirine bağlı' notu bir topoloji cümlesidir. Dikdörtgenin sol kenarını sağ kenarına yapıştırırsan bir silindir, silindirin iki ağzını da birleştirirsen simit biçimli bir yüzey elde edersin: <strong>torus</strong>. Oyun alanı bükülmemiş, 'düz' bir torustur: her yerde düzlem geometrisi geçerlidir ama yüzeyin kenarı yoktur. Bunun ölçülebilir sonuçları var. İki nokta arasındaki en kısa yol kenarın üzerinden geçebilir; uzaklık her eksende |Δ| ile (boy − |Δ|)'nın küçüğü alınarak hesaplanır ve 760 × 570'lik alanda hiçbir nokta bir başkasına yarım köşegenden, 475 pikselden uzak olamaz. Sabit hızla giden bir kaya torusta dümdüz gider ama ekranda sarmal gibi dolanır: hız bileşenlerinin oranı alan ölçüleriyle rasyonel bir orana denk geliyorsa yol kapanır, gelmiyorsa hiçbir zaman kapanmaz ve zamanla alanın her yerine sokulur. Sayfanın küçük bir sadeleştirmesi de var: çarpışma testi düz uzaklığa bakar, kenarın iki yanındaki cisimler birbirini görmez.",
      formula: "d = √( min(|Δx|, W − |Δx|)² + min(|Δy|, H − |Δy|)² ),  W = 760, H = 570",
      formulaNote: "Gemi ve kayalar kenarı yarıçapları kadar aşınca öbür yana alınır: gemi için bir tur 760 + 30 ya da 570 + 30 pikseldir. Lazer tam kenarda sarar.",
    },
  ],
  lab: {
    intro:
      "Klavyede dört tuş var: <strong>←</strong> ve <strong>→</strong> gemiyi döndürür (tam tur bir saniye), <strong>↑</strong> itiş verir, <strong>Space</strong> her basışta bir lazer atar. Telefonda aynı işi oyun alanının altındaki dört düğme görür: ↺, ↑, ↻ ve ●. <strong>Yeni Oyun</strong> düğmesi her şeyi sıfırlar. Tuvalde sağ üstte skor, ortada REKOR (bu cihazdaki en iyi skorun), sol üstte kalan canlar, alt yarıda 2.5 saniyede solan 'Seviye' yazısı durur. Üç can bitince 'Görev Bitti' yazar; Space ya da Enter hemen, beklersen yazı solunca oyun kendiliğinden yeniden başlar. Alan 760 × 570 oyun pikselidir ve saniyede 30 kare atar; aşağıdaki bütün sayılar bu birimlerdedir. Her yeni gemi 3 saniye yanıp söner ve o sırada dokunulmazdır: ölçümleri bu güvenli pencereye sığdır.",
    experiments: [
      {
        title: "Burun nereye, gemi nereye?",
        predict:
          "Gemiyi yukarı itip tuşu bırak, sonra → ile burnu sağa çevir. Gemi sağa mı gider, yukarı kaymayı mı sürdürür? Ardından ↑'ye bir saniye daha basarsan yol hangi yöne kıvrılır: dümdüz sağa mı, çapraza mı? Açıyı tahmin et.",
        do: "Yeni Oyun'a bas. Gemi yanıp sönerken ↑'yi bir saniye basılı tut ve bırak. → tuşunu çeyrek saniye kadar tut; burun 90° dönüp sağa baksın. Gemi hâlâ kayarken ↑'ye bir saniye daha bas ve izini gözle.",
        observe:
          "Burun sağa döner ama gemi yukarı kaymayı sürdürür; baktığı yer ile gittiği yer ayrışır. İkinci itişte yol birden sağa kırılmaz, yay çizerek kıvrılır: gemi sonunda yatayla 40° kadar eğimle sağ yukarı gider ve eskisinden hızlıdır, saniyede 195 piksel dolayında.",
        explain:
          "Hız bir vektördür ve ok eklenerek değişir. İlk itiş yukarı 150 px/s'lik bir ok verdi; çeyrek saniyelik dönüş sırasında sürtünme onu yüzde 17 eritip 124 px/s'ye indirdi. İkinci itiş sağa 150 px/s ekledi. Toplamın büyüklüğü √(150² + 124²) ≈ 195 px/s, yönü yatayla arctan(124/150) ≈ 40°. Dönüşte ne kadar oyalanırsan yukarı ok o kadar erir ve açı o kadar küçülür.",
      },
      {
        title: "Kayma mesafesi: ölçüm ile v₀/k",
        predict:
          "Duran gemide ↑'ye iki saniye basıp bırakırsan gemi kayarak ne kadar yol alır: bir gemi boyu mu, yarım ekran mı, bir ekran mı? İtiş süresini dört saniyeye çıkarırsan kayma yolu kaç katına çıkar, duruncaya kadar geçen süre değişir mi?",
        do: "Yeni Oyun'a bas; ↑'ye 'bin bir, bin iki' diyecek kadar bas, bırak, geminin nerede yavaşladığına bak. Yeni bir oyunda dört saniye bas ve bırak. Ekran yüksekliğini cetvel say: gemi için bir tam tur 600 pikseldir.",
        observe:
          "İki saniyelik itiş bittiği anda gemi 300 px/s ile gider ve tam üst kenardan çıkmaktadır; alttan girip 420 piksel kadar daha tırmanır ve ekranın üst üçte birinde oyalanır. Hızı her saniye kabaca yarıya iner, 6–7 saniyede kıpırtısı kalmaz. Dört saniyelik itişte kayma yolu iki katına, yaklaşık 840 piksele çıkar; yavaşlama süresi ise değişmez.",
        explain:
          "Fren hızla orantılıdır: dv/dt = −k·v, k = 0.7 s⁻¹. Çözüm v₀·e<sup>−kt</sup>, toplam yol v₀/k: 300/0.7 ≈ 429 px. Kod kare kare çalıştığı için 419 bulur; fark bir karelik yoldur. Denklem doğrusal olduğundan yol v₀ ile doğru orantılıdır, yarılanma süresi (0.98 s) ise v₀'a hiç bağlı değildir. Kuru sürtünme olsaydı yol v₀² ile büyürdü; gerçek uzayda ise sonsuzdur.",
      },
      {
        title: "Hız sınırı yok: turlar kısalır, lazer geride kalır",
        predict:
          "↑'yi hiç bırakmazsan gemi bir üst hıza takılır mı? Üst kenardan her çıkışı aynı aralıkla mı olur? Ve çok hızlı giden gemiden atılan lazer gemiden hızlı mı gider, yavaş mı?",
        do: "Yeni Oyun'a bas; burun yukarı bakar. ↑'yi basılı tut ve geminin üst kenardan çıkışlarını say. Dördüncü saniyeden sonra, itiş sürerken Space'e birkaç kez bas ve lazerin gemiye göre nerede kaldığına bak. Dokunulmazlık üçüncü saniyede biter; bir can kaybetmeyi göze al.",
        observe:
          "İlk çıkış 2.0. saniyede gelir; sonraki turlar yaklaşık 1.5, 1.0, 0.8 ve 0.7 saniye sürer. On saniyede gemi saniyede iki buçuk kez ekranı geçen bir çizgiye döner. Dördüncü saniyeden sonra atılan lazer burundan çıkar ama birkaç karede geminin arkasında kalır ve orada söner.",
        explain:
          "Tuş basılıyken sürtünme çalışmaz; hız saniyede 150 px/s artar. Sabit ivmede yol ½·a·t² = 75t² pikseldir; çıkışlar 300, 900, 1500… piksele denk gelir, yani t = 2.0, 3.5, 4.5, 5.3, 6.1 s. Eşit yollar gittikçe kısa sürer. Lazer ekrana göre hep 500 px/s gider; 3.33 saniyeden sonra gemi daha hızlıdır ve kendi mermisini sollar. Gerçek fizikte lazer geminin hızını da taşır ve hep önde kalırdı.",
      },
      {
        title: "Puan muhasebesi ve kalp atışı",
        predict:
          "Birinci seviyedeki bütün kayaları temizlediğinde, 'Seviye 2' yazısı belirirken skor kaç olur? Vurulan kayanın parçaları annesinin yönünde mi devam eder? Arka plandaki tok vuruş oyun boyunca aynı tempoda mı kalır?",
        do: "Yeni bir oyunda üç büyük kayayı ve parçalarını sabırla temizle; 'Seviye 2' çıktığı anda sağ üstteki skoru oku. Büyük kayaları vururken iki parçanın yönünü izle. Sitenin sesi açıksa kayalar azaldıkça vuruşun temposunu say.",
        observe:
          "Skor tam 1560'tır; nasıl vurduğun, kaç can kaybettiğin fark etmez. 'Seviye 3' yazarken 3640, 'Seviye 4' yazarken 6240 okursun. Parçalar birbirinden bağımsız, rastgele yönlere dağılır; ikisi birden annesinin geldiği yöne de dönebilir. Vuruş seviye başında saniyede bir gelir, son kayada saniyede üçe çıkar; yeni seviyede yeniden yavaşlar.",
        explain:
          "Her büyük kaya 1 + 2 + 4 = 7 parça eder ve 20 + 2·50 + 4·100 = 520 puan verir; k. seviyede 2 + k büyük kaya vardır. Gemi çarpınca da kaya parçalanır ve puanı yazılır, bu yüzden toplam değişmez. Parçalar momentumu korumaz: kod her birine yepyeni bir rastgele hız verir. Tempo kalan kaya oranına bağlıdır: vuruş aralığı 1 − 0.75·(1 − kalan/toplam) saniye; ilk seviyenin 21 parçasından sonuncusu kaldığında yaklaşık 0.3 s.",
      },
    ],
  },
  wow: [
    {
      title: "Işınla çizilen ekran",
      body:
        "Asteroids'in kabininde piksel yoktu. Vektör ekranda elektron ışını bir kalem gibi bir noktadan ötekine sürülür ve yalnızca çizgiler parlar; dolgu ya da doku yoktur. 1979'un gemisi bu yüzden birkaç çizgiden, kayaları bir avuç kırık çizgiden oluşur. Oyunun ses yongası bile yoktu: on üç ses efekti, karta elle eklenmiş devrelerle üretiliyordu. Talep o kadar büyüktü ki birkaç yüz Asteroids, sırada bekleyen Lunar Lander kabinlerinin içinde sevk edildi.",
    },
    {
      title: "27 yıl dayanan rekor",
      body:
        "13 Kasım 1982'de 15 yaşındaki Scott Safran, Asteroids'te 41.336.440 puana ulaştı. Makinenin göstergesi 99.990'dan sonra sıfıra dönüyordu; milyonluk skorlar, göstergenin kaç kez döndüğü sayılarak tutulur. Rekor, John McAllister'ın 5 Nisan 2010'da internetten canlı yayımlanan 58 saatlik oyununda 41.838.740 ile geçilene kadar ayakta kaldı. Rekor kurumu Twin Galaxies, Safran'ı kutlamak için yıllarca aradı ve 2002'de onun 1989'da bir kazada öldüğünü öğrendi; ödül ailesine verildi.",
    },
    {
      title: "Gerçek kuşak neredeyse boştur",
      body:
        "Oyundaki gibi kayalar arasından kıvrılarak geçmek gerçek asteroit kuşağında gereksizdir. Mars ile Jüpiter arasında bir milyondan fazla asteroit kayıtlıdır, ama öyle büyük bir hacme dağılmışlardır ki komşu iki asteroit arasındaki ortalama uzaklık kabaca bir milyon kilometredir: Dünya–Ay uzaklığının iki buçuk katı. Pioneer 10, 1972–73'te kuşağı geçen ilk araç oldu; ondan sonra geçenlerin hiçbiri de bir kayaya çarpmadı. NASA'ya göre bütün asteroitlerin toplam kütlesi Ay'ınkinden azdır; tahminler Ay kütlesinin yüzde birkaçını gösterir.",
    },
  ],
  worked: {
    title: "İki saniyelik itişin hesabı",
    prompt:
      "Gemi ekranın ortasında (y = 285), burnu yukarı ve hareketsiz. ↑'ye tam 2 saniye basıp bırakıyorsun. İvme 150 px/s², sürtünme katsayısı k = 0.7 s⁻¹ (yalnızca tuş bırakılınca etkin). Bırakma anındaki hızı, itişte alınan yolu ve sonraki kayma yolunu hem sürekli modelle hem kodun kare kare hesabıyla bul. Gemi nerede durur?",
    steps: [
      "Bırakma hızı: v₀ = a·t = 150 px/s² × 2 s = 300 px/s. Kodda 60 kare × (5/30) px/kare = 10 px/kare; 30 ile çarpınca aynı 300 px/s.",
      "İtişte alınan yol, sürekli modelde ½·a·t² = ½ × 150 × 2² = 300 px. Kod her karede önce hızı artırır, sonra konumu ilerletir: (1/6)·(1 + 2 + … + 60) = 1830/6 = 305 px. Fark ½·v₀·Δt = ½ × 300 × (1/30) = 5 px'tir; kare sıklaştıkça küçülür.",
      "Kayma, sürekli modelde: dv/dt = −k·v ⇒ v = v₀·e<sup>−kt</sup>. Yol, hızın 0'dan ∞'a integralidir: v₀/k = 300/0.7 ≈ 429 px. Yarılanma süresi ln 2/k ≈ 0.99 s.",
      "Kayma, kodda: her karede v ← q·v, q = 1 − 0.7/30. Geometrik dizi toplamı 10·q/(1 − q) = 10 × 41.86 ≈ 419 px. Sürekli sonuçtan tam bir karelik yol (10 px) eksik.",
      "Konum: üst kenardan çıkış için merkezin kenarı 15 px aşması gerekir, yani 285 + 15 = 300 px yol. İtişin son karesinde gemi 305 px ile tam bu eşiği geçer ve alt kenarın 15 px altına (y = 585) alınır. Oradan 419 px kayarak y ≈ 585 − 419 = 166'ya tırmanır.",
    ],
    result:
      "Bırakma hızı 300 px/s; itişte 305 px, kayarak 419 px, toplam 724 px (sürekli modelde 300 + 429 = 729 px). Gemi bir kez üst kenardan çıkıp alttan girer ve ekranın üst üçte birinde, y ≈ 166 dolayında durur. Kaymanın yarısı ilk saniyede biter.",
  },
  misconceptions: [
    {
      myth: "Gemi burnunun baktığı yöne gider.",
      truth:
        "Burun yalnızca bir sonraki itişin yönüdür. Hız vektörü ayrı bir büyüklüktür ve dönmekle değişmez; gemi, eski hızıyla yeni itişin toplamına göre gider. Yukarı kayarken burnu sağa çevirip kısa bir itiş verirsen gemi sağa değil, çapraz sağ yukarı gider. Gerçek uzay araçlarında da yönelim ile hız iki ayrı kontrol problemidir.",
    },
    {
      myth: "Tuşu bırakınca gemi yavaşlayıp durur; uzayda da öyle olurdu.",
      truth:
        "Uzayda yavaşlatacak bir kuvvet yoktur; itişi kesen araç aynı hızla süzülür. Buradaki yavaşlama, kodun her karede hızın yüzde 2.33'ünü silen satırıdır; oyunu yönetilebilir kılmak için eklenmiştir. Gerçekten durmanın yolu oyunda da aynıdır: 180° dönüp ters yönde itmek. 300 px/s ile giden gemi, yarım saniyelik dönüş sırasında 211 px/s'ye iner; onu sıfırlamak 1.4 saniye itiş ister.",
    },
    {
      myth: "Parçalar annesinin yönünde gider ve küçükler daha hızlıdır.",
      truth:
        "1979'daki oyunda küçük parçalar gerçekten daha hızlıydı. Bu sayfada bütün kayalar aynı rastgele aralıktan hız alır (her bileşen en çok 50 px/s; aralık seviye başına yüzde 10 genişler) ve her parça yepyeni bir yön seçer. Gerçek bir parçalanmada momentum korunur: parçaların momentumlarının vektör toplamı annesininkine eşittir. Oyunun bunu atladığını fark etmek, bir benzetimi doğru okumanın ilk adımıdır.",
    },
    {
      myth: "Lazer kayanın çizgisine değince patlar.",
      truth:
        "Çarpışmaya çizilen zikzaklı şekil değil, kayanın merkezindeki görünmez bir daire karar verir: 50, 25 ya da 13 piksel yarıçap. Köşeler bu yarıçapın 0.6–1.4 katı arasında rastgele çizildiği için lazer bazen çizginin dışında, boşlukta patlar, bazen de bir çıkıntının içinden geçip gider. Oyun motorlarında görünen şekil ile çarpışma gövdesi neredeyse her zaman ayrıdır.",
    },
  ],
  glossary: [
    { term: "Hız vektörü", definition: "Hızın büyüklüğünü ve yönünü birlikte taşıyan ok; gemide (v<sub>x</sub>, v<sub>y</sub>) olarak tutulur ve burun açısından bağımsızdır." },
    { term: "Eylemsizlik", definition: "Net kuvvet yokken cismin hızını koruması; Newton'un birinci yasasının içeriği ve itişi bırakınca süzülen geminin nedeni." },
    { term: "Sabit ivme", definition: "Hızın her saniye aynı miktarda artması; itişte 150 px/s², alınan yol zamanın karesiyle büyür." },
    { term: "Üstel sönüm", definition: "Azalma hızı o anki değerle orantılı olan büyüklüğün davranışı, v = v₀·e<sup>−kt</sup>; sayfada k = 0.7 s⁻¹, yarılanma 0.98 s." },
    { term: "Galileo hız toplaması", definition: "Hareketli bir araçtan atılan cismin dışarıdan görülen hızının, aracın hızı ile atış hızının vektör toplamı olması; sayfadaki lazer bunu uygulamaz." },
    { term: "Torus", definition: "Bir dikdörtgenin karşılıklı kenarları yapıştırılarak elde edilen kenarsız yüzey; 'kenarlar birbirine bağlı' oyun alanının geometrisi." },
    { term: "Çarpışma dairesi", definition: "Bir nesnenin çarpışma hesabında kullanılan görünmez daire; merkezler arası uzaklık yarıçaplar toplamından küçükse çarpışma sayılır." },
    { term: "Tünelleme", definition: "Hızlı bir nesnenin bir karede engelin öte yanına atlaması ve çarpışmanın hiç fark edilmemesi; adım, çarpışma gövdesinin genişliğine yaklaştıkça başlar." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın döngüsü bir fizik motorunun en küçük hâlidir: önce hızı güncelle, sonra o yeni hızla konumu. Sayısal Analiz dersinde bunun adı <strong>yarı örtük Euler</strong> adımıdır; çözümlü örnekteki 5 ve 10 piksellik farklar, yöntemin adım başına hatasının Δt ile orantılı olduğunu gösteren ilk elden ölçümlerdir. Aynı derste Verlet ve Runge–Kutta yöntemleriyle bu hatanın nasıl küçültüldüğü, oyun programlamada ise tünellemeyi önleyen sürekli çarpışma tespiti işlenir. Diferansiyel Denklemler dersinin ilk haftası dv/dt = −k·v ile açılır; itişli hâli dv/dt = a − k·v, limit hızı veren ilk mertebeden doğrusal denklemdir. Fizik I'de birinci yasanın asıl içeriği olan <strong>eylemsiz referans çerçevesi</strong> kavramıyla karşılaşırsın: lazerin unuttuğu Galileo dönüşümü, bir çerçeveden ötekine geçmenin kuralıdır ve ışık hızına yaklaşınca yerini Lorentz dönüşümüne bırakır.",
      "Oyunun ikinci üniversite hayatı matematik ve bilgisayar bilimindedir. Topoloji dersinde torus, bir karenin kenarlarının özdeşleştirilmesiyle kurulan ilk bölüm uzayı örneğidir; fizikçiler aynı hileye <strong>periyodik sınır koşulu</strong> der ve moleküler dinamikten kristal örgülerine kadar, sonlu bir kutuyla sonsuz bir ortamı taklit etmek için kullanır. Uçuş mekaniğinde 'burun ayrı, hız ayrı' ilkesi meslektir: bir uydunun yönelimini tepki tekerleri, hızını iticiler değiştirir; yörüngede öndeki araca yetişmek için ileri değil geri itip daha alçak ve daha hızlı bir yörüngeye inmek gerekir. Yapay zekâ tarafında, 2015'te DeepMind'ın yalnızca ekran piksellerinden öğrenen derin pekiştirmeli öğrenme ajanı 49 Atari oyununda sınandı; Asteroids, ajanın insan düzeyinin belirgin biçimde altında kaldığı oyunlardandı.",
    ],
    topics: ["Fizik I: eylemsiz çerçeveler ve Galileo dönüşümü", "Diferansiyel Denklemler: dv/dt = a − k·v", "Sayısal Analiz: Euler, yarı örtük Euler, Verlet", "Topoloji: düz torus ve bölüm uzayları", "Periyodik sınır koşulları", "Çarpışma tespiti ve hesaplamalı geometri", "Yörünge mekaniği", "Pekiştirmeli öğrenme"],
  },
  quiz: [
    {
      question: "Gemi yukarı doğru kayıyor. → ile burnu sağa çevirip ↑'ye kısa bir an basarsan gemi hangi yöne gider?",
      options: ["Dümdüz sağa", "Yukarı kaymayı sürdürür, hiç değişmez", "Çapraz sağ yukarı", "Dümdüz yukarı ama daha hızlı"],
      answer: 2,
      explanation: "Dönmek hız vektörünü değiştirmez; itiş ona sağa doğru küçük bir ok ekler. Eski yukarı ok ile yeni sağ okun toplamı çapraz sağ yukarıdır. Tam sağa gitmesi için yukarı bileşenin sürtünmeyle ya da ters itişle silinmesi gerekir.",
    },
    {
      question: "Tuşu bıraktığın andaki hız iki katına çıkarsa, bu sayfadaki gemi için hangisi doğrudur?",
      options: ["Kayma yolu dört katına çıkar, yarılanma süresi iki katına", "Kayma yolu iki katına çıkar, yarılanma süresi değişmez", "Kayma yolu da yarılanma süresi de iki katına çıkar", "İkisi de değişmez"],
      answer: 1,
      explanation: "Fren hızla orantılıdır: dv/dt = −k·v. Çözüm v₀·e^(−kt) olduğundan yol v₀/k ile doğru orantılıdır, yarılanma süresi ln 2/k ise v₀'ı hiç içermez. Yolun v₀² ile büyümesi sabit kuvvetli frenin (kuru sürtünmenin) işaretidir; laboratuvardaki 420 ve 840 piksel bunu ayırt eder.",
    },
    {
      question: "Gemi 600 px/s hızla giderken burun yönünde ateş edersen bu sayfada ne olur?",
      options: ["Lazer 1100 px/s ile öne fırlar", "Lazer 500 px/s gider ve gemi onu geçer", "Lazer gemiyle aynı hızda yanında kalır", "Oyun ateşe izin vermez"],
      answer: 1,
      explanation: "Kod lazerin hızını yalnızca burun açısından hesaplar, geminin hızını eklemez; lazer ekrana göre hep 500 px/s'dir. Galileo toplamasıyla gerçekte 1100 px/s olurdu. 500 px/s'yi aşan gemi kendi mermisini sollar.",
    },
  ],
  next: [
    { href: "vektorler.html", title: "Vektörler: Bileşenler, Çarpımlar ve Bağıl Hareket", why: "Eski hız artı yeni itiş: iki oku uç uca ekle, bileşenlerine ayır ve laboratuvardaki 40°'lik çaprazın nereden geldiğini kendi elinle bul." },
    { href: "newton-hareket-yasalari.html", title: "Newton'un Hareket Yasaları: Kuvvet, Kütle ve İvme", why: "Kuvvet kesilince cisim neden süzülmeye devam eder? Sürtünmesiz hava rayında birinci yasayı, Atwood düzeneğinde F = m·a’yı ve iki arabanın birbirini ittiği deneyde etki–tepkiyi ölç." },
    { href: "gezegen-savunmasi.html", title: "Gezegen Savunması", why: "Aynı gemi mantığı, bu kez gerçek GM/r² çekiminde: mermin düşer, elips çizer ya da kaçar; enerjiyi, yarı büyük ekseni ve periyodu ölçersin." },
    { href: "serbest-dusme.html", title: "Serbest Düşme: Galileo'dan Limit Hıza", why: "Sabit ivmede t² ile büyüyen yol ve hıza bağlı frenin limit hızı: oyunun iki hareket rejiminin gerçek birimlerle laboratuvarı." },
  ],
  sources: [
    { title: "Wikipedia · Asteroids (video game)", url: "https://en.wikipedia.org/wiki/Asteroids_(video_game)", note: "Rains ve Logg'un tasarımı, vektör donanımı, satış sayıları, pusu taktiği ve rekorlar (İngilizce)." },
    { title: "Wikipedia · Spacewar!", url: "https://en.wikipedia.org/wiki/Spacewar!", note: "1962'de PDP-1 üzerinde yazılan ata oyun: dönüş, itiş, eylemsizlik, torpidolar ve kenardan sarma (İngilizce)." },
    { title: "OpenStax · University Physics Vol. 1, 5.2 Newton's First Law", url: "https://openstax.org/books/university-physics-volume-1/pages/5-2-newtons-first-law", note: "Eylemsizlik ve eylemsiz referans çerçeveleri; geminin süzülmesinin ders kitabı karşılığı (İngilizce, açık ders kitabı)." },
    { title: "Wikipedia · Torus", url: "https://en.wikipedia.org/wiki/Torus", note: "Karenin kenarlarını yapıştırarak kurulan düz torus ve topolojisi (İngilizce)." },
    { title: "NASA Science · Asteroid Facts", url: "https://science.nasa.gov/solar-system/asteroids/facts/", note: "Gerçek asteroitler: ana kuşak, boyutlar ve toplam kütlenin Ay'ınkinden az oluşu (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
