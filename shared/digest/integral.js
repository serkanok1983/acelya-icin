window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["integral"] = {
  slug: "integral",
  title: "İntegral: Sonsuz İnce Dilimlerin Toplamı",
  field: "Matematik",
  level: "Lise",
  minutes: 30,
  tagline:
    "Arşimet bir parabolün alanını dilimleyerek buldu, Leibniz o dilimlerin toplamına uzun bir S çizdi. İntegral, küçük katkıları biriktirip tek ve kesin bir sayıya varmanın sanatıdır.",
  hook: "Bir arabanın kilometre sayacı bozuk, yalnızca hız göstergesi çalışıyor: bir saatlik yolculuğun sonunda kaç kilometre gittiğini yine de bulabilir misin? Bulabilirsin; zamanı ince dilimlere böl, her dilimde hız × süreyi hesapla, hepsini topla ve dilimler inceldikçe toplamın hangi sayıya yerleştiğine bak. Sayfadaki mor dikdörtgenler, kökü 2200 yıldan eski bu fikrin çalışan bir maketidir.",
  bigIdea:
    "Belirli integral, aralığı dilimlere bölüp her dilimde <em>yükseklik × genişlik</em> topladığında, dilimler incelirken bu toplamın yerleştiği sayıdır; türevi f olan bir F bulunabiliyorsa o sayı tek satırda gelir: <em>∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a)</em>.",
  story: [
    "MÖ 3. yüzyılda Sirakuzalı Arşimet, bir parabolün bir doğruyla kestiği parçanın alanının, içine çizilen üçgenin tam 4/3'ü olduğunu ispatladı. Elinde ne cebir ne koordinat vardı. Knidoslu Eudoksos'tan miras kalan <strong>tüketme yöntemini</strong> kullandı: alanı içten ve dıştan, giderek incelen bilinen parçalarla sıkıştırdı ve aradaki farkın istenen her miktardan küçük yapılabileceğini gösterdi. Bugünün diliyle bu, alt ve üst toplamların aynı sayıya yaklaştığını ispatlamaktır. Sonucu sayfada görebilirsin: x² seç, a = −1, b = 1, n = 100 yap. Okuma 0.666600 olur; gerçek değer 2/3. Parabol ile y = 1 doğrusu arasındaki parça, 2 × 1'lik dikdörtgenden bu 2/3 çıkınca kalan 4/3'tür; içine çizilen (−1, 1), (0, 0), (1, 1) üçgeninin alanı ise tam 1. Arşimet'in oranı, ekranda.",
    "Arşimet'ten bin iki yüz yılı aşkın bir süre sonra Kahire'de İbnü'l-Heysem, dördüncü kuvvetlerin toplamı için bir formül bulup bir paraboloidin hacmini hesapladı. 1600'lerde fikir hız kazandı. Johannes Kepler 1613'te evine şarap alırken tüccarların fıçı hacmini tek bir çubukla ölçtüğünü gördü; bu gözlem onu farklı biçimli kapların hacmini dilimleyerek incelemeye götürdü. Bonaventura Cavalieri 1635'te alanları sonsuz ince çizgilerden, 'bölünemezler'den oluşmuş gibi ele alan yöntemini yayımladı. Asıl sıçrama, iki ayrı sorunun aslında tek sorun olduğunun görülmesiydi: eğrinin altındaki alanı bulmak ile teğetini bulmak birbirinin tersidir. Bu ilişkinin ilk basılı ispatını James Gregory 1668'de verdi; Isaac Barrow, Cambridge'deki geometri derslerinde daha genel bir biçimini ispatladı. İlişkiyi hesap yapan bir makineye dönüştürenler ise yöntemini 1665–66'da geliştiren Isaac Newton (Barrow'un Cambridge'deki halefi) ve ondan bağımsız olarak, 1670'lerin ortasında Gottfried Wilhelm Leibniz oldu.",
    "Yöntem işliyordu ama 'sonsuz ince dilim' tam olarak neydi? 1823'te Augustin-Louis Cauchy integrali, sürekli fonksiyonlar için sonlu toplamların <strong>limiti</strong> olarak tanımladı. Bernhard Riemann 1854'te Göttingen'de sunduğu, ölümünden sonra 1868'de yayımlanan çalışmasında soruyu tersine çevirdi: hangi fonksiyonların integrali vardır? Ölçütü şuydu: her dilimin içinden <em>herhangi</em> bir nokta seçilebilmeli ve dilimler inceldikçe bütün seçimler aynı sayıya yaklaşmalı. Bugün onun adını taşıyan bu toplamlar her kalkülüs kitabında; sayfanın kullandığı orta nokta, Riemann'ın izin verdiği seçimlerden yalnızca biridir.",
    "İntegral bugün birikim ölçülen her yerde çalışır: hızdan yol, güçten enerji, yoğunluktan kütle, olasılık yoğunluğundan olasılık. İşin ilginç yanı, bilgisayarlar integrallerin çoğunu formülle değil, bu sayfadaki fikrin daha akıllı sürümleriyle dilimleyip toplayarak hesaplar. Ters türevi formülle yazılamayan fonksiyonlarda çoğu zaman en pratik yol budur; mühendislik yazılımlarının içinde çalışan şey, Arşimet'in sıkıştırmasının hızlandırılmış bir torunudur.",
  ],
  core: [
    {
      heading: "Dilimle, çarp, topla",
      body: "[a, b] aralığını n eşit dilime böl. Her dilimin genişliği Δx = (b − a)/n'dir. Her dilimde bir nokta seç, fonksiyonun oradaki değerini yükseklik al ve yükseklik × genişliği topla. Bu toplama <strong>Riemann toplamı</strong> denir. Sayfa noktayı dilimin tam ortasından seçer. Açılış ayarında (x², a = −1, b = 2, n = 5) Δx = 0.6, orta noktalar −0.7, −0.1, 0.5, 1.1 ve 1.7'dir. Kareleri 0.49 + 0.01 + 0.25 + 1.21 + 2.89 = 4.85; 0.6 ile çarpınca 2.91. Sayfanın yazdığı 2.910000 tam olarak budur.",
      formula: "S<sub>n</sub> = Σ f(x<sub>k</sub>*)·Δx,   Δx = (b − a)/n",
      formulaNote:
        "x<sub>k</sub>* k'inci dilimden seçilen nokta; bu sayfada dilimin orta noktası. Toplam k = 1'den n'ye kadar alınır.",
    },
    {
      heading: "Limit: dilimler incelirken toplamın yerleştiği sayı",
      body: "Tek bir Riemann toplamı bir tahmindir. n'yi büyüttükçe dikdörtgenler eğriye sarılır, toplam bir sayıya yerleşir. Bu sayıya <strong>belirli integral</strong> denir. Gösterimin kendisi bu öyküyü anlatır: ∫, Leibniz'in 'toplam' için seçtiği uzatılmış S harfidir; dx ise sonsuz incelen Δx'tir. Bu yüzden integralin birimi, f'nin birimi ile x'in biriminin çarpımıdır: hız (m/s) zamana (s) göre integrallenince metre çıkar.",
      formula: "∫<sub>a</sub><sup>b</sup> f(x) dx = lim<sub>n→∞</sub> S<sub>n</sub>",
      formulaNote:
        "Sürekli fonksiyonlarda sol uç, sağ uç ya da orta nokta seçimi limiti değiştirmez; yalnızca yaklaşma hızını değiştirir.",
    },
    {
      heading: "Alan değil, işaretli birikim",
      body: "Fonksiyon eksenin altına indiğinde yükseklik negatiftir; o dilimin katkısı toplamdan düşülür. Bu yüzden integral, 'eğrinin altındaki alan'dan daha genel bir şeydir: <strong>işaretli birikim</strong>. x³ için −2 ile 2 arası, iki tarafta da alanı 4 olan iki bölge vardır ama biri eksi, biri artı sayılır ve toplam sıfırdır. Hız eksiye düşerse (geri gidiş) integral net yer değiştirmeyi verir; toplam yol için hızın mutlak değeri integrallenir.",
      formula:
        "∫<sub>−2</sub><sup>2</sup> x³ dx = 0,   ∫<sub>−2</sub><sup>2</sup> |x³| dx = 8",
      formulaNote: "Aynı eğri, iki farklı soru: net birikim mi, toplam büyüklük mü?",
    },
    {
      heading: "Temel teorem: alan ile eğim aynı madalyonun iki yüzü",
      body: "a'dan x'e kadar biriken alana A(x) de. x'i çok küçük bir h kadar ilerletirsen alan, yüksekliği yaklaşık f(x), genişliği h olan ince bir şerit kadar büyür: A(x + h) − A(x) ≈ f(x)·h. İki yanı h'ye bölüp h'yi sıfıra götürünce A′(x) = f(x) çıkar. Yani biriken alanın değişim hızı, eğrinin o noktadaki yüksekliğidir. Türevi f olan herhangi bir F bulursan, toplamı hiç yapmadan sonucu alırsın. Sayfa bu teoremi 'Temel İntegral Teoremi' diye anıyor; ders kitaplarında <strong>kalkülüsün temel teoremi</strong> adıyla geçer.",
      formula: "F′(x) = f(x)  ⇒  ∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a)",
      formulaNote:
        "x² için F(x) = x³/3: F(2) − F(−1) = 8/3 + 1/3 = 3. Sayfanın n = 100'de gösterdiği 2.999775 bu 3'e yaklaşıyor.",
    },
    {
      heading: "Orta nokta ne kadar ve hangi yöne yanılır?",
      body: "Orta nokta dikdörtgeninin alanı, orta noktadaki teğetin altında kalan yamuğun alanına eşittir; çünkü teğet, dilimin bir yarısında ne kadar yukarıdaysa öbür yarısında o kadar aşağıdadır. x² gibi <strong>yukarı bükük</strong> bir eğri teğetinin üstünde kalır, dikdörtgen eksik sayar. sin(x)'in 0 ile π arasındaki tümseği gibi <strong>aşağı bükük</strong> bir eğri teğetinin altındadır, dikdörtgen fazla sayar. Hatanın büyüklüğü ise 1/n² ile küçülür: dilim sayısını iki katına çıkarmak hatayı dörtte birine indirir.",
      formula: "I − M<sub>n</sub> = (b − a)³·f″(ξ) / (24n²)",
      formulaNote:
        "ξ aralıktaki bir nokta, f″ ikinci türev. x² için f″ = 2 olduğundan hata tam (b − a)³/(12n²); açılış ayarında 27/300 = 0.09.",
    },
  ],
  lab: {
    intro:
      "Sol panelde bir menü ve üç kaydırıcı var: <strong>Fonksiyon Seç</strong> (x^2, x^3, sin(x)); −5 ile 0 arasında 0.1 adımla kayan <strong>Başlangıç (a)</strong>; 0 ile 5 arasında kayan <strong>Bitiş (b)</strong>; 1 ile 100 arasında <strong>Bölme Sayısı (n)</strong>. Açılışta x², a = −1, b = 2, n = 5 seçilidir. Kesin bir değere (ör. n = 48 ya da b = 3.1) ulaşmak için kaydırıcıya tıkla, sonra klavyenin ok tuşlarıyla adım adım ilerle. <strong>Yaklaşık integral</strong> satırındaki yeşil sayı, orta nokta Riemann toplamını noktadan sonra altı basamakla verir. Sayfa gerçek değeri yazmaz; onu F(b) − F(a) ile sen bulursun (deneylerde verdik). Üç sınırı bil: a 0'ın sağına, b 0'ın soluna geçemez, yani aralık hep 0'ı içerir; grafik dikeyde yalnızca −10 ile 10 arasını gösterir, x² ve x³ büyük |x|'te çerçeveden çıkar; sin(x) dikeyde birimi 20 piksel olduğu için basık görünür. Dikdörtgenlerin hafif titreşimi süstür, hesaba girmez.",
    experiments: [
      {
        title: "Hata dörtte bire iner",
        predict:
          "Açılış ayarında (x², a = −1, b = 2) gerçek değer 3'tür. n = 5'te okuma 2.910000, yani hata 0.09. n'yi iki katına, 10'a çıkarırsan hata yarıya mı iner, dörtte bire mi?",
        do: "Yalnızca <strong>Bölme Sayısı (n)</strong> kaydırıcısını oynat: n = 5, 10, 20, 50 ve 100'de <strong>Yaklaşık integral</strong> satırını not et ve her birini 3'ten çıkar.",
        observe:
          "2.910000, 2.977500, 2.994375, 2.999100, 2.999775. Hatalar 0.09, 0.0225, 0.005625, 0.0009 ve 0.000225: n iki katına çıkınca hata dörtte birine, on katına çıkınca yüzde birine iner. Okuma hep 3'ün altında kalır, asla üstüne çıkmaz.",
        explain:
          "x² için orta nokta hatası tam olarak (b − a)³/(12n²) = 27/(12n²) = 2.25/n²'dir. Hatanın 1/n² ile küçülmesi, orta noktayı hatası 1/n ile küçülen sol ve sağ uç kurallarından çok daha hızlı yapar. Hep altta kalmasının nedeni eğrinin yukarı bükük olmasıdır; dördüncü deneyde tersini göreceksin.",
      },
      {
        title: "Tek dikdörtgenin yalanı",
        predict:
          "x² seçiliyken a = −5, b = 5 ve n = 1 yaparsan sayfa ne der? Gerçek değer 250/3 ≈ 83.33. n = 2'de ne olur?",
        do: "<strong>Başlangıç (a)</strong> kaydırıcısını en sola (−5), <strong>Bitiş (b)</strong> kaydırıcısını en sağa (5) çek, <strong>Bölme Sayısı (n)</strong>'yi 1 yap. Ardından n = 2, 3, 10 ve 100'ü dene.",
        observe:
          "n = 1'de okuma 0.000000; tek dikdörtgenin yüksekliği sıfır olduğu için ekranda yalnızca eksen üzerinde titreşen, kıl inceliğinde bir şerit kalır. n = 2'de 62.500000, n = 3'te 74.074074, n = 10'da 82.500000, n = 100'de 83.325000. Mavi eğri |x| ≈ 3.16'dan sonra çerçevenin üstünden çıkar; büyük n'de dikdörtgenlerin tepesi de kesilir, ama sayı doğrudur.",
        explain:
          "Tek dilimin orta noktası x = 0'dır ve orada x² = 0; genişlik 10 olsa da yükseklik sıfırdır. n = 2'de orta noktalar ±2.5, yükseklik 6.25: 2 × 6.25 × 5 = 62.5. Az sayıda örnekle fonksiyonu en kötü yerinden ölçebilirsin; n büyüdükçe bu şanssızlık kaybolur ve hata (10³/12)/n² hızıyla erir: n = 100'de yalnızca 0.0083.",
      },
      {
        title: "Sıfır çıkan integral",
        predict:
          "x³ için a = −2, b = 2 iken ekranda iki büyük mor bölge görünür: biri eksenin üstünde, biri altında. Okuma kaç olur? n'yi değiştirmek sonucu değiştirir mi?",
        do: "Menüden x^3 seç; a = −2, b = 2 yap ve n'yi 1 ile 100 arasında birkaç değerde dene. Sonra a'yı −1'e getir ve n = 100 yap.",
        observe:
          "Her n için 0.000000 (bazı n'lerde −0.000000; bu, 10<sup>−15</sup> mertebesinde bir bilgisayar yuvarlama artığıdır). a = −1, b = 2, n = 100'de okuma 3.749662.",
        explain:
          "x³ tek fonksiyondur: −x'teki değeri x'tekinin eksisidir. Eksenin altındaki dikdörtgenler negatif sayılır ve üsttekileri birebir siler. Her bölgenin alanı x⁴/4 ile hesaplanınca 4'tür; toplam geometrik alan 8, işaretli toplam 0. a = −1 iken [−1, 1] kısmı yine kendini siler; geriye ∫<sub>1</sub><sup>2</sup> x³ dx = 16/4 − 1/4 = 3.75 kalır.",
      },
      {
        title: "Orta nokta kimden yana yanılır?",
        predict:
          "x²'de orta nokta okuması hep gerçek değerin altındaydı. sin(x) için a = 0, b = 3.1'de (gerçek değer 1 − cos 3.1 ≈ 1.999135) altında mı kalır, üstüne mi çıkar?",
        do: "Menüden sin(x) seç, a = 0, b = 3.1 yap. n = 1, 5, 10 ve 100'de okumayı kaydet. Eğri dikeyde ezik görünür (1 birim yalnızca 20 piksel); sayılara güven.",
        observe:
          "3.099330, 2.031517, 2.007163 ve 1.999215: hepsi gerçek değerin üstünde. Hata n = 5'te 0.0324, n = 10'da 0.0080; yine yaklaşık dörtte bir. n = 1'de tek dikdörtgen, sin'in tepesindeki yüksekliği bütün aralığa yayar.",
        explain:
          "Orta nokta dikdörtgeni, orta noktadaki teğetin altındaki yamukla aynı alana sahiptir. Aşağı bükük tümsek teğetinin altında kalır, dikdörtgen fazla sayar; yukarı bükük x² teğetinin üstündedir, dikdörtgen eksik sayar. Hatanın işaretini ikinci türevin işareti belirler. b 0.1 adımla ilerlediği için π'ye tam ulaşamazsın; ulaşabilseydin ∫<sub>0</sub><sup>π</sup> sin x dx = 2 olurdu.",
      },
    ],
  },
  wow: [
    {
      title: "Dua kitabının altından çıkan Arşimet",
      body: "Arşimet'in dilimleri bir terazide dengeleyerek sonuca nasıl vardığını anlattığı <em>Mekanik Teoremler Yöntemi</em> yalnızca tek bir kopyadan bilinir. 1229'da bu kopyanın parşömeni kazınıp yıkandı ve üstüne bir dua kitabı yazıldı. El yazması yüzyıllar sonra İstanbul'daki bir Ortodoks kilise kütüphanesine ulaştı; Danimarkalı Johan Heiberg 1906'da sayfaları orada fotoğraflayıp silik satırların altında Arşimet'i okudu. 1920'lerde kaybolan kitap 1998'de New York'ta açık artırmada 2 milyon dolara satıldı; X-ışını görüntüleme, sonradan üstüne boyanmış sahte resimlerin altındaki metni bile geri getirdi.",
    },
    {
      title: "∫ işaretinin doğum günü: 29 Ekim 1675",
      body: "∫ işareti ilk kez Leibniz'in 29 Ekim 1675 tarihli bir el yazması notunda göründü; Ekim 2026'da 351 yaşını doldurdu. Leibniz onu o dönemin yazısındaki uzun s (ſ) harfinden türetti, çünkü integrali sonsuz küçük parçaların toplamı (Latince <em>summa</em>) olarak düşünüyordu. İşaret basılı olarak ilk kez Haziran 1686'da <em>Acta Eruditorum</em> dergisinde çıktı. Yani her ∫ f(x) dx, aslında 'f(x) yüksekliğindeki, dx genişliğindeki dilimlerin toplamı' diye okunan kısaltılmış bir cümledir.",
    },
    {
      title: "Kepler'in fıçı kuralı",
      body: "Kepler'in şarap fıçısı merakı 1615'te <em>Nova stereometria doliorum vinariorum</em> (Şarap Fıçılarının Yeni Hacim Ölçümü) adlı kitaba dönüştü; Kepler kitabı kendi parasıyla Linz'de bastırdı ve bu, kentte basılan ilk kitap oldu. Almancada sayısal integralin en ünlü yöntemlerinden Simpson kuralı bugün hâlâ <em>Keplersche Fassregel</em>, 'Kepler'in fıçı kuralı' diye anılır. Kural, orta nokta (M) ve yamuk (T) toplamlarını (2M + T)/3 diye harmanlar. Sayfanın açılışta gösterdiği M = 2.91, aynı beş dilimin yamuk toplamı T = 3.18 ile birleşince (2 × 2.91 + 3.18)/3 = 3 çıkar. Bu tam sonuçtur, çünkü Simpson kuralı üçüncü dereceye kadar her polinomda hiç yanılmaz.",
    },
  ],
  worked: {
    title: "Hız göstergesinden yol",
    prompt:
      "Duraktan kalkan bir bisikletlinin hızı ilk 2 saniyede v(t) = t² m/s (t saniye cinsinden) olarak artıyor; 2. saniyede 4 m/s'ye ulaşıyor. Bu 2 saniyede kaç metre yol aldı? Önce 4 dilimli orta nokta toplamıyla tahmin et, sonra temel teoremle kesin değeri bul.",
    steps: [
      "Soruyu integrale çevir: yol = ∫<sub>0</sub><sup>2</sup> v(t) dt. Birim kontrolü: (m/s) × s = m. Hız hep pozitif olduğu için net yer değiştirme ile alınan yol aynıdır.",
      "4 dilim: Δt = 2/4 = 0.5 s. Orta anlar 0.25, 0.75, 1.25 ve 1.75 s; bu anlardaki hızlar 0.0625, 0.5625, 1.5625 ve 3.0625 m/s. Toplam 5.25 m/s; Δt ile çarp: 5.25 × 0.5 = 2.625 m.",
      "Sayfada doğrula: x^2 seç, a = 0, b = 2, n = 4 yap; okuma 2.625000. (t yerine x yazıldı; hesap aynı.)",
      "Kesin değer: türevi t² olan fonksiyon F(t) = t³/3. Yol = F(2) − F(0) = 8/3 − 0 ≈ 2.667 m. Tahminin hatası 8/3 − 2.625 ≈ 0.042 m; n = 8'de sayfa 2.656250 gösterir, hata 0.010 m'ye, yani dörtte birine düşer.",
      "Sağduyu kontrolü: hep son hızla, 4 m/s ile gitseydi 8 m yol alırdı. Parabolün altındaki alan, onu çevreleyen 2 × 4'lük dikdörtgenin tam üçte biridir; 8/3 bununla tutarlı.",
    ],
    result:
      "Bisikletli 2 saniyede 8/3 ≈ 2.67 m yol alır; ortalama hızı 1.33 m/s'dir. Dört dilimli tahmin yalnızca 4 santimetre şaşar ve hep eksik kalır, çünkü t² eğrisi yukarı büküktür.",
  },
  misconceptions: [
    {
      myth: "Belirli integral eğrinin altındaki alandır; o yüzden hiçbir zaman sıfır ya da negatif olamaz.",
      truth:
        "Eksenin altındaki katkılar eksi sayılır. Sayfada x^3 seçip a = −2, b = 2 yap: ekranda iki büyük mor bölge varken okuma 0.000000'dır. sin(x) için a = −3.1, b = 0 yaparsan okuma eksidir (n = 100'de −1.999215). Toplam geometrik alan isteniyorsa |f| integrallenir ya da parçalar ayrı ayrı hesaplanıp büyüklükleri toplanır.",
    },
    {
      myth: "n = 100'de dikdörtgenler eğriyle kaynaştı; artık sonuç tam.",
      truth:
        "Açılış ayarında n = 100 okuması 2.999775'tir; gerçek değer 3. Aradaki 0.000225 bir alandır; 3 birimlik genişliğe yayılınca ortalama 0.000075'lik bir yükseklik farkı eder, grafikte bir pikselin yüzde birinden bile küçük. Göz göremez ama hata oradadır. İntegral bir resim değil, limittir: sonlu her n yalnızca bir yaklaşımdır.",
    },
    {
      myth: "Sondaki dx yalnızca süstür; integralin bittiği yeri gösterir.",
      truth:
        "dx, dilim genişliği Δx'in limitteki hâlidir ve birim taşır: ∫ v dt'de m/s ile s çarpılır, sonuç metredir. Hangi değişkene göre toplandığını da söyler; ileride değişken değiştirme yaparken dx'i doğru dönüştürmek sonucun doğru çıkmasının şartıdır.",
    },
    {
      myth: "Ters türevin sonundaki +C önemsizdir, yazmasan da olur.",
      truth:
        "x³/3 ile x³/3 + 5'in ikisinin de türevi x²'dir; ters türev tek bir fonksiyon değil, bir ailedir. Belirli integralde C, F(b) − F(a) farkında sadeleşir. Ama hızdan konum bulurken C başlangıç konumudur: atlarsan bisikletlinin duraktan değil, rastgele bir yerden kalktığını kabul etmiş olursun.",
    },
  ],
  glossary: [
    {
      term: "Belirli integral",
      definition:
        "Bir fonksiyonun [a, b] aralığındaki işaretli birikimini veren tek sayı; Riemann toplamlarının dilimler incelirken yaklaştığı limit.",
    },
    {
      term: "Riemann toplamı",
      definition:
        "Aralığı dilimlere bölüp her dilimde seçilen noktadaki f değeri ile dilim genişliğinin çarpımlarını toplayan yaklaşık değer.",
    },
    {
      term: "Orta nokta kuralı",
      definition:
        "Her dikdörtgenin yüksekliğini dilimin tam ortasındaki f değerinden alan Riemann toplamı; bu sayfanın yöntemi.",
    },
    {
      term: "Bölme sayısı (n) ve Δx",
      definition:
        "n aralığın kaç eşit dilime bölündüğü, Δx = (b − a)/n ise her dilimin genişliğidir.",
    },
    {
      term: "İşaretli alan",
      definition:
        "x ekseninin üstünde kalan bölgelerin artı, altında kalanların eksi sayıldığı toplam.",
    },
    {
      term: "Ters türev",
      definition: "Türevi verilen f olan F fonksiyonu; örneğin x² için x³/3 + C.",
    },
    {
      term: "İntegral sabiti (C)",
      definition:
        "Ters türeve eklenen keyfî sabit; türevleri aynı olan fonksiyonlar bir aralıkta yalnızca bir sabit kadar farklı olabildiği için yazılır ve belirli integralde sadeleşir.",
    },
    {
      term: "Kalkülüsün temel teoremi",
      definition:
        "F′ = f ise ∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a); birikim ile anlık değişimin birbirinin tersi olduğunu söyler.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede integral bir kurallar tablosudur; üniversitede önce sınırları sorgulanır. Riemann integrali her fonksiyonda çalışmaz: rasyonel sayılarda 1, irrasyonellerde 0 olan Dirichlet fonksiyonunda her dilimde iki tür nokta da bulunur; [0, 1] aralığında toplamlar seçime göre 0 ile 1 arasında oynar ve hiçbir sayıya yerleşmez. Henri Lebesgue 1902'deki doktora tezinde dilimlemeyi yatay eksenden dikey eksene taşıdı: 'f hangi değerleri ne kadarlık bir kümede alıyor?' diye sordu. Lebesgue integrali bugün olasılık kuramının ve kuantum mekaniğinin temel dilidir. Aynı dönemde integral boyut kazanır: çift ve üç katlı integrallerle hacim, kütle ve ağırlık merkezi; eğri ve yüzey integralleriyle iş ve akı hesaplanır; Gauss ve Stokes teoremleri temel teoremin yüksek boyutlu kuzenleridir.",
      "İkinci köprü sayısaldır. Ters türevi formülle yazılamayan integraller çoktur; çan eğrisi e<sup>−x²</sup> bunun en ünlü örneğidir. Bilgisayar bu durumda tam bu sayfanın yaptığını yapar, ama daha akıllıca: orta nokta hatası 1/n² ile küçülür, Simpson kuralınınki düzgün fonksiyonlarda 1/n⁴ ile; Gauss kuadratürü örnek noktalarını da en iyi yerlere koyar. Boyut çok artınca dilimlemek imkânsızlaşır ve rastgele noktalarla Monte Carlo integrasyonu devreye girer; hatası 1/√N ile küçülür ve boyuttan bağımsızdır. Diferansiyel denklemleri adım adım çözen Euler yöntemi de özünde bir Riemann toplamıdır: uydu yörüngesinden hava tahminine kadar, ekrandaki her simülasyonun içinde küçük dikdörtgenler toplanır.",
    ],
    topics: [
      "Değişken değiştirme ve kısmi integrasyon",
      "Lebesgue integrali",
      "Çok katlı integraller",
      "Gauss ve Stokes teoremleri",
      "Sayısal integrasyon (yamuk, Simpson, Gauss)",
      "Monte Carlo integrasyonu",
      "Diferansiyel denklemler",
      "Olasılık yoğunluğu",
    ],
  },
  quiz: [
    {
      question:
        "Sayfada x^2 seçili, a = 0, b = 2 ve n = 1 iken 'Yaklaşık integral' satırı ne gösterir?",
      options: ["2.666667", "2.000000", "4.000000", "8.000000"],
      answer: 1,
      explanation:
        "Tek dilimin genişliği 2, orta noktası x = 1; yükseklik f(1) = 1, toplam 1 × 2 = 2. 2.666667 gerçek değerdir (8/3) ama sayfa onu yazmaz; 8.000000 ise sağ uç kuralının cevabı olurdu. Tek dikdörtgen yukarı bükük eğriyi eksik sayar; n arttıkça okuma 8/3'e hep alttan yaklaşır (n = 4'te 2.625).",
    },
    {
      question:
        "Bir depoya dolan suyun debisi r(t) litre/dakika, t ise dakika; debi hiç eksiye düşmüyor. ∫<sub>0</sub><sup>10</sup> r(t) dt neyi verir?",
      options: [
        "10. dakikadaki debiyi (litre/dakika)",
        "Debinin ne kadar hızlı değiştiğini (litre/dakika²)",
        "İlk 10 dakikadaki ortalama debiyi (litre/dakika)",
        "İlk 10 dakikada depoya giren toplam suyu (litre)",
      ],
      answer: 3,
      explanation:
        "İntegral yükseklik × genişlik toplar: (litre/dakika) × dakika = litre. Her ince dilimde r(t)·Δt o dilimde akan sudur; hepsinin toplamı 10 dakikada biriken sudur. Değişim hızı türevin işidir; ortalama debi ise bu integralin 10 dakikaya bölünmesiyle bulunur.",
    },
    {
      question:
        "Açılış ayarında (x², a = −1, b = 2) orta nokta hatası n = 10'da 0.0225'tir. Hatanın 0.001'in altına inmesi için n en az kaç olmalı?",
      options: ["225", "100", "48", "20"],
      answer: 2,
      explanation:
        "Bu ayarda hata tam 2.25/n²'dir. 2.25/n² < 0.001 için n² > 2250 gerekir; √2250 ≈ 47.4, yani n = 48. Sayfada doğrula: n = 47'de 2.998981 (hata 0.001019), n = 48'de 2.999023 (hata 0.000977). Hatanın n ile orantılı küçüldüğünü sanan 0.0225/0.001 = 22.5'ten n = 225 der; oysa hata n² ile küçüldüğü için n'yi √22.5 ≈ 4.7 katına çıkarmak yeter. n = 20 hatayı yalnızca 0.005625'e indirir.",
    },
  ],
  next: [
    {
      href: "riemann-toplamlari.html",
      title: "Riemann Toplamları",
      why: "Sol uç, sağ uç, orta nokta, yamuk ve Simpson'ı aynı aralıkta yarıştır; Hata ve yakınsama hızı sekmesi hatayı log–log grafikte çizip eğimleri ölçer (−1, −2, −4). Monte Carlo sekmesi rastgele noktaların neden çok boyutta kazandığını gösterir.",
    },
    {
      href: "turev.html",
      title: "Türev",
      why: "Temel teoremin öteki yüzü: kesenin teğete dönüşmesi ve kuvvet kuralı. Ters türev, o kuralı geriye doğru okumaktır.",
    },
    {
      href: "hareket-ve-grafikler.html",
      title: "Hareket ve Grafikler",
      why: "Hız–zaman grafiğinin işaretli alanı yer değiştirmedir, yol için alanların büyüklükleri toplanır: çözümlü örneğin fiziği.",
    },
    {
      href: "normal-dagilim.html",
      title: "Normal Dağılım",
      why: "Olasılık bir integraldir: Alanlar ve güven aralıkları sekmesi çan eğrisinin altındaki alanı N dilimli sayısal integralle hesaplar; toplam alan 1, ortalamanın ±1σ çevresindeki pay yaklaşık % 68.",
    },
  ],
  sources: [
    {
      title: "OpenStax · Calculus Vol. 1, 5.3 The Fundamental Theorem of Calculus",
      url: "https://openstax.org/books/calculus-volume-1/pages/5-3-the-fundamental-theorem-of-calculus",
      note: "Temel teoremin iki parçası, ispat fikri ve çözümlü örnekler (İngilizce, açık ders kitabı).",
    },
    {
      title: "OpenStax · Calculus Vol. 2, 3.6 Numerical Integration",
      url: "https://openstax.org/books/calculus-volume-2/pages/3-6-numerical-integration",
      note: "Orta nokta, yamuk ve Simpson kuralları; hata sınırları ve 1/n² davranışı.",
    },
    {
      title: "3Blue1Brown · Integration and the fundamental theorem of calculus",
      url: "https://www.3blue1brown.com/lessons/integration",
      note: "Dikdörtgenlerden integrale ve temel teoreme görsel bir yolculuk (İngilizce video ve metin).",
    },
    {
      title: "Wikipedia · Archimedes Palimpsest",
      url: "https://en.wikipedia.org/wiki/Archimedes_Palimpsest",
      note: "Kazınıp dua kitabına dönüştürülen el yazmasının öyküsü: 1229, İstanbul'da 1906, 1998 açık artırması.",
    },
  ],
  revision: "Kasım 2026",
};
