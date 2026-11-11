window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["tetris"] = {
  slug: "tetris",
  title: "Tetris: Dört Karenin Matematiği",
  field: "Oyun",
  level: "Lise–Lisans",
  minutes: 30,
  tagline:
    "Yedi parça, on sütun, yirmi satır. Moskova'da bir araştırmacının boş vakit oyununun arkasında polyomino sayımı, dönme matrisleri, hafızasız bir zar ve bilgisayar biliminin en ünlü açık sorusu duruyor.",
  hook:
    "Dört kareyi kenar kenara yapıştırarak kaç farklı şekil yapabilirsin? Cevap, soruyu nasıl sorduğuna göre 5, 7 ya da 19'dur; Tetris ortadakini seçmiştir. Daha tuhafı şu: bu sayfadaki oyunu ne kadar iyi oynarsan oyna, sonunda kaybedeceğin matematiksel olarak kanıtlanmıştır.",
  bigIdea:
    "Tetris, sonlu bir ızgarada yedi <strong>tetromino</strong>yla oynanan bir geometri ve olasılık problemidir: parçayı döndürmek bir matris çarpımıdır, sıradaki parça bir zar atışıdır ve en iyi yerleşimi bulmak, bilinen bütün algoritmaları zorlayan türden bir sorudur.",
  story: [
    "Moskova, 1980'lerin ortası. Sovyet Bilimler Akademisi'ne bağlı Dorodnitsın Hesaplama Merkezi'nde konuşma tanıma ve yapay zekâ üzerine çalışan Aleksey Pajitnov, bir <strong>pentomino</strong> seti satın alır: beşer kareden oluşan on iki tahta parça ve onları kutuya geri sığdırma bulmacası. Parçaları masasında evirip çevirirken bunu bilgisayara taşımayı düşünür. On iki şekil fazla karışıktır; kare sayısını dörde indirir ve elinde yedi parça kalır. Kullandığı makine, bir PDP-11 kopyası olan Elektronika 60'tır ve grafik ekranı yoktur; Pajitnov parçaları köşeli parantez ve boşluk karakterleriyle çizer. İlk sürüm yaklaşık üç haftada çıkar. Adı, Yunanca dört anlamındaki <em>tetra</em> ile en sevdiği spor olan tenisi birleştirerek koyar. Tarih konusunda kaynaklar ayrışır: oyunun doğum günü yaygın olarak 6 Haziran 1984 diye kutlanır, kimi kaynaklar ise ilk sürümü 1985'e yerleştirir.",
    "Oyun enstitüde elden ele dolaşır. Pajitnov, meslektaşı Dmitri Pavlovski ve o sırada 16 yaşında olan Vadim Gerasimov'la birlikte onu IBM PC'ye taşır; iş yaklaşık iki ay sürer, Gerasimov renkleri, Pavlovski skor tablosunu ekler. Disketten diskete kopyalanan oyun önce Moskova'ya, sonra Doğu Avrupa'ya yayılır. Asıl karmaşa bundan sonra başlar: Sovyetler Birliği'nde bir araştırmacının iş yerinde yazdığı program devlete aittir ve Batılı şirketler, kimde olduğu belli olmayan hakları birbirine satmaya koyulur. 1989'da Henk Rogers Moskova'ya gidip el konsolu haklarını Nintendo için alır; Tetris aynı yıl Game Boy'un kutusundan çıkan oyun olur ve yalnızca o sürüm 35 milyon adet satar. Pajitnov ise kendi oyunundan gelir elde etmek için 1996'yı bekler: o yıl Rogers'la anlaşır ve oyunun lisanslarını bugün de yöneten The Tetris Company kurulur.",
    "Matematikçiler bu şekilleri oyundan önce tanıyordu. Solomon Golomb onlara 1953'te <strong>polyomino</strong> adını vermiş, kaç tane olduklarını ve hangi tahtaları döşeyebildiklerini sormuştu. Tetris bu eski soruya zamanı ve şansı ekledi, yeni sorular da böyle doğdu. Kusursuz bir oyuncu sonsuza kadar oynayabilir mi? 1992'de John Brzustowski ve 1997'de Heidi Burgiel hayır dedi. Parçaların sırası baştan bilinse en iyi oyun kolayca hesaplanır mı? 2002'de MIT'den üç araştırmacı bunun bilgisayar biliminin en zor problem sınıflarından birine düştüğünü gösterdi. Bu sayfadaki sürüm, o soruların sorulduğu ilk Tetris'lere benzer: zar hafızasızdır, kurallar yalındır, hesap yapmaya elverişlidir.",
  ],
  core: [
    {
      heading: "Dört kareyle kaç şekil?",
      body:
        "Karelerin kenar kenara yapışmasıyla oluşan şekillere <strong>polyomino</strong>, dört karelilerine tetromino denir. Kaç tane oldukları, 'aynı şekil' sözünden ne anladığına bağlıdır. Döndürmeyi de ters çevirmeyi de serbest bırakırsan 5 şekil vardır: I, O, T, L, S. Tetris'te parçayı döndürebilir ama aynadaki görüntüsüne çeviremezsin; bu yüzden L ile J, S ile Z ayrı parçalardır ve sayı 7'ye çıkar. Her yönelimi ayrı sayarsan 19 eder. Kare sayısı arttıkça şekiller hızla çoğalır: serbest sayım 1, 1, 2, 5, 12, 35, 108 diye gider ve n kare için kapalı bir formül bugün de bilinmiyor. Küçük bir ispat da burada saklı. Yedi parçanın toplam alanı 28 karedir ama birer tane kullanarak 4×7'lik bir dikdörtgeni dolduramazsın. Dikdörtgeni satranç tahtası gibi boya: 14 açık, 14 koyu kare. T dışındaki her parça nereye konursa konsun 2 açık, 2 koyu kare örter; T ise 3'e 1. Altı parça 12'ye 12 getirir, T dengeyi bozar.",
      formula: "serbest: 5 · tek yüzlü: 7 · sabit: 19 = 1 + 2 + 2 + 2 + 4 + 4 + 4",
      formulaNote: "O'nun 1, I, S ve Z'nin 2'şer, T, J ve L'nin 4'er farklı yönelimi vardır; toplamı 19 eder.",
    },
    {
      heading: "Döndürmek bir matris çarpımıdır",
      body:
        "<kbd>↑</kbd> tuşuna bastığında kod parçanın 0-1 tablosunu alır ve her kareyi yeni yerine taşır: r. satır, c. sütundaki kare, c. satıra ve (satır sayısı − 1 − r). sütuna gider. Ekranda bu, saat yönünde 90° dönmedir. Koordinatlarla yazarsan kayma dışında (x, y) → (−y, x) olur; yani 2×2'lik bir matrisle çarpmaktır. Matrisi dört kez uygularsan başladığın yere dönersin: R⁴ = I. Dört dönme (0°, 90°, 180°, 270°) birlikte dört elemanlı bir <strong>grup</strong> oluşturur; I, S ve Z ikinci basışta, O daha ilkinde kendine döndüğü için yönelim sayısı 7 × 4 = 28 değil 19'dur. Determinant da bir şey söyler: det R = +1. Ayna yansımasının determinantı −1'dir ve +1'leri ne kadar çarparsan çarp −1 elde edemezsin; S'yi kaç kez döndürsen de Z olmamasının cebirsel nedeni budur. Bu sayfaya özgü bir ayrıntı: kod tabloyu sol üst köşesinden sabit tutar ve yeni hâl bir yere çarpıyorsa dönüşü sessizce reddeder. Modern Tetris'lerdeki 'duvardan itme' burada yoktur.",
      formula: "R = [0 −1; 1 0],  R·(x, y) = (−y, x),  R⁴ = I,  det R = 1",
      formulaNote: "Noktalı virgül matrisin satırlarını ayırır; y ekranda aşağı doğru artar. Kodda karşılığı: out[c][satır − 1 − r] = m[r][c].",
    },
    {
      heading: "Sıradaki parça: hafızasız zar",
      body:
        "Kod her yeni parçayı yedi harften birini eşit olasılıkla seçerek üretir ve önceki seçimlere hiç bakmaz. Olasılık dilinde bunlar bağımsız, tekdüze dağılmış denemelerdir ve sonuçları sezgiye ters düşer. Aynı parçanın üst üste gelme olasılığı her seferinde 1/7'dir; ortalama yedi parçada bir tekrar görürsün. Beklediğin I çubuğuna kadar geçen parça sayısı <strong>geometrik dağılım</strong>a uyar: ortalaması 7'dir ama kuyruğu uzundur; 12 parça boyunca hiç I gelmeme olasılığı (6/7)<sup>12</sup> ≈ yüzde 16, 20 parça için yüzde 4.6'dır. Zarın hafızası yoktur: on parçadır I gelmemiş olması, on birincide gelme şansını 1/7'den yukarı çekmez. Yedi parçanın hepsini en az birer kez görmek için ortalama 7·(1 + 1/2 + … + 1/7) = 18.15 parça gerekir. Günümüzün Tetris'leri bu yüzden zar yerine <strong>torba</strong> kullanır: yedi parça torbaya konur, karıştırılıp sırayla çekilir, torba boşalınca yenisi açılır. Torbada iki I arasına en çok 12 parça girebilir. Bu sayfa eski usuldür: kuraklık da tekrar da serbesttir.",
      formula: "P(n parçada hiç I yok) = (6/7)<sup>n</sup>,  E[bekleme] = 1/p = 7",
      formulaNote: "Her denemede başarı olasılığı p = 1/7; beklemenin standart sapması √(1 − p)/p ≈ 6.5 parçadır, yani ortalaması kadar belirsizdir.",
    },
    {
      heading: "Kusursuz oyuncu da kaybeder",
      body:
        "Yeterince iyi bir oyuncu sonsuza kadar oynayabilir mi? 1992'de John Brzustowski yüksek lisans tezinde, 1997'de Heidi Burgiel kısa bir makalede aynı cevabı verdi: hayır. Burgiel'in gözlemi şuydu: 10 sütunluk kuyuya S ve Z parçaları dönüşümlü gelirse, oyuncu ne yaparsa yapsın doldurulamayan boşluklar birikir ve yığın en geç 70 bin parça dolayında tepeye ulaşır. Gerisi olasılıktır. Her parça bağımsız ve eşit olasılıkla seçiliyorsa, sonlu uzunluktaki her dizi er ya da geç mutlaka gelir; o uğursuz S-Z dizisi de. Demek ki oyun 1 olasılıkla biter. İki dürüst not. Birincisi, 'er ya da geç' burada çok geç demektir: 70 bin parçalık belirli bir dizinin tutma olasılığı 7<sup>−70 000</sup> mertebesindedir; pratikte seni kombinatorik değil hız yener. İkincisi, kanıt zarın her diziyi üretebilmesine dayanır. Bu sayfanın hafızasız zarı üretebilir; torbalı oyunlar ise uzun bir S-Z dizisini hiç üretemez ve kanıt onlara bu hâliyle uygulanmaz.",
      formula: "P(oyun sonsuza kadar sürer) = 0",
      formulaNote: "Olasılığı 0 olan olay 'imkânsız' demek değildir; olasılık kuramındaki 'neredeyse kesin' kavramının iyi bir örneği.",
    },
    {
      heading: "En iyi hamleyi bulmak: NP-tamlık",
      body:
        "Şansı tamamen ortadan kaldıralım: gelecek parçaların listesi baştan verilsin, tahtada da belli bir başlangıç yığını olsun. 'Bu parçalarla tahtayı tamamen temizleyebilir miyim?' sorusu artık yalnızca aramaya dayanır. 2002'de Erik Demaine, Susan Hohenberger ve David Liben-Nowell bu <em>çevrimdışı</em> Tetris'in <strong>NP-tam</strong> olduğunu kanıtladı; silinen satır sayısını, yerleştirilen parça sayısını ya da dörtlü silmeleri en çoğa çıkarmak ve yığının en yüksek noktasını en aza indirmek de aynı sınıftadır. Kanıt, bir sayı kümesini eşit toplamlı üçlülere ayırma problemini (3-Parçalanış) bir Tetris tahtasına çevirir. Sonucu doğru okumak gerekir. Kanıt, eni ve boyu serbestçe büyüyebilen genelleştirilmiş tahta içindir. 10×20'lik sabit tahtanın alabileceği durumların sayısı sonludur (en çok 2<sup>200</sup>); dizi ne kadar uzun olursa olsun en iyi oyun, kuramsal olarak, dizinin uzunluğuyla orantılı sürede bulunur. Sabit çarpan astronomiktir ama zorluk sonucu bu tahtaya taşınmaz. NP-tam, 'çözülemez' de demek değildir: önüne konan bir çözümü denetlemek kolaydır, zor olan onu bulmaktır. Hızlı bir bulma yöntemi olup olmadığı ise P ile NP'nin eşit olup olmadığı sorusudur ve hâlâ açıktır.",
      formula: "3-Parçalanış ≤<sub>p</sub> Çevrimdışı Tetris,  Çevrimdışı Tetris ∈ NP",
      formulaNote: "≤<sub>p</sub> çok terimli zamanda indirgemedir: Tetris'i hızlı çözen bir yöntem 3-Parçalanış'ı, onunla birlikte bütün NP problemlerini de hızlı çözerdi.",
    },
  ],
  lab: {
    intro:
      "Kontroller: <kbd>←</kbd> <kbd>→</kbd> parçayı bir sütun kaydırır, <kbd>↑</kbd> saat yönünde döndürür, <kbd>↓</kbd> bir satır indirir, <kbd>Space</kbd> anında yere bırakır; dokunmatikte dokunmak döndürür, yana kaydırmak bir sütun oynatır, aşağı kaydırmak anında yere bırakır. Üstte <strong>Skor</strong>, <strong>Satır</strong> ve <strong>Seviye</strong> yazar; sağdaki <strong>Sonraki</strong> kutusu bir sonraki parçayı gösterir. Kuyu 10 sütun, 20 satırdır. Parça 1. seviyede 0.6 saniyede bir satır düşer; her 10 satırda seviye artar ve bu süre 50 ms kısalır.",
    experiments: [
      {
        title: "Hiç dokunmazsan: en kötü oyuncu",
        predict:
          "Yeni Oyun'a bas ve ellerini çek. Parçalar hep aynı yerde belirip üst üste yığılacak. Oyun kaç parçada biter: 5 mi, 10 mu, 20 mi? İlk parçanın yere inmesi kaç saniye sürer?",
        do: "Kronometreyi Yeni Oyun'a bastığın anda başlat. İlk parçanın yere oturduğu (Sonraki kutusunun değiştiği) anı ve 'Oyun Bitti' yazısının çıktığı anı not et; kaç parça yerleştiğini say. Deneyi birkaç kez tekrarla.",
        observe:
          "İlk parça yatay I ise yaklaşık 12, başka bir parçaysa yaklaşık 11.4 saniyede oturur. Yığın 4.–7. sütunlarda yükselir. On denemenin kabaca üçü 10, beşi 11, kalanı 12–13 parçada biter; ortalama süre 67 saniye dolayındadır. Skor 0 kalır.",
        explain:
          "Düşüş ayrık adımlarla olur. Bir satır kalınlığındaki I 19 satır iner, 20. tıkta kilitlenir: 20 × 0.6 = 12.0 s. Öbür parçalar iki satır kalındır: 19 tık, 11.4 s. Kod süreyi yalnızca ekran tazelenirken denetlediği için tık 0.6 saniyeyi bir tazeleme kadar aşabilir; ölçtüğün süreler hesabın yüzde iki üç üstünde çıkabilir. Her parça yığına en çok 2 satır eklediği için 20 satır en erken 10 parçada dolar. Hiçbir satır silinmez, çünkü 10 sütunun yalnızca dördü kullanılır: satır silmek parçayı yana taşımayı gerektirir.",
      },
      {
        title: "Zarın hafızası var mı?",
        predict:
          "Sonraki kutusunda art arda 35 parça izlesen, yedi parçanın her biri tam 5'er kez mi gelir? Aynı parçanın üst üste geldiğini kaç kez görürsün?",
        do: "Kâğıda yedi harfi yaz: I, O, T, S, Z, J, L. Space ile parçaları hızla bırakırken her bırakıştan sonra Sonraki kutusundaki parça için bir çentik at. Kutu hiç değişmemiş görünüyorsa aynı parça üst üste gelmiştir: yine çentik at ve tekrarı ayrıca işaretle. Oyun bitince Yeni Oyun'la sürdür ve 35'e kadar say.",
        observe:
          "Sayılar eşit çıkmaz: tipik bir denemede bir parça 2–3 kez, bir başkası 7–8 kez gelir. Üst üste tekrarı 4–5 kez görürsün. Arada 15–20 parça boyunca hiç I gelmediği de olur.",
        explain:
          "Her parçanın beklenen sayısı 35/7 = 5'tir ama standart sapması √(35 · 1/7 · 6/7) ≈ 2.1'dir; 3 ile 7 arası olağandır. Art arda iki parçanın aynı olma olasılığı 1/7 olduğundan 34 komşu çiftte beklenen tekrar 34/7 ≈ 4.9'dur. Torbalı bir oyunda 35 parça tam beş torbadır: her harf tam 5 kez gelir, tekrar ancak iki torbanın sınırında olabilir. Eşitsizlik zarın bozuk olduğunu değil, hafızasız olduğunu gösterir.",
      },
      {
        title: "Dönmenin köşesi: I çubuğu duvarda",
        predict:
          "Yatay I çubuğunu ↑ ile dikleştirince çubuk, kapladığı dört sütundan hangisinde durur: ortada mı, uçta mı? Dik çubuğu sağ duvara yaslayıp yeniden ↑'ya basarsan ne olur?",
        do: "I gelince ↑'ya bir kez bas ve hangi sütunda dikildiğine bak. → ile sağ duvara kadar götür (6 basış) ve ↑'ya bas. Sonra ← ile üç sütun geri gelip ↑'yı yeniden dene. Başka parçalarda ↑'ya kaç basışta ilk görünüme dönüldüğünü say: T, S ve O.",
        observe:
          "I, yatayken kapladığı dört sütunun en solundakinde (4. sütun) dikilir. Sağ duvarda ↑ hiçbir şey yapmaz. Üç sütun geri gelince çubuk yatar ve 7.–10. sütunları tam doldurur. T dört, S iki, O bir basışta ilk görünümüne döner.",
        explain:
          "Kod parçanın tablosunu sol üst köşesinden tutar: 1×4'lük tablo 4×1 olur ve aynı köşeye yerleşir. Duvardaki dik çubuğun yatay hâli 10.–13. sütunları isterdi; çarpışma denetimi bunu reddeder ve dönüş iptal olur. Yatabilmesi için sağında üç boş sütun gerekir. Basış sayıları parçanın simetrisini sayar: T'nin dört, S'nin iki, O'nun tek yönelimi vardır. Hepsi için R⁴ = I geçerlidir ama simetrik parça kendine daha erken döner.",
      },
      {
        title: "Dörtlü mü, dört tekli mi?",
        predict:
          "Dört satırı tek tek silmek mi daha çok puan getirir, dördünü tek bir I çubuğuyla birden silmek mi? Aynı hamle 2. seviyede kaç puan eder?",
        do: "Bir kenarda tek sütunluk bir kuyu bırakarak dört satır biriktir ve dik I ile dördünü birden sil; Skor'daki artışı not et. Başka bir oyunda satırları teker teker sil. Satır 10'a ulaşınca Seviye'nin 2 olduğunu ve düşüşün hızlandığını izle.",
        observe:
          "1. seviyede tek satır 100, iki satır 300, üç satır 500, dört satır 800 puan getirir; dört tekli 400 eder. 2. seviyede hepsi ikiye katlanır: dörtlü 1600. Parça 2. seviyede bir satırı 0.55 saniyede iner; 12. seviyeden itibaren süre 0.08 saniyede sabitlenir.",
        explain:
          "Puan tablosu [100, 300, 500, 800] × seviye biçimindedir: satır başına 100, 150, 167 ve 200 puan. Dörtlü, aynı dört satıra iki kat öder ama yığını yüksek tutmayı ve I'yı beklemeyi gerektirir; I'nın ne zaman geleceğine zar karar verir. Oyunun stratejisi bu risk-ödül pazarlığıdır. Küçük bir ayrıntı: kod puanı seviyeyi güncellemeden önce hesaplar; 10. satırı getiren silme hâlâ eski seviyeden ödenir.",
      },
    ],
  },
  wow: [
    {
      title: "Parantezden parçalar",
      body:
        "İlk Tetris'in çalıştığı Elektronika 60'ın grafik ekranı yoktu; yalnızca harf ve işaret basabiliyordu. Pajitnov her kareyi bir çift köşeli parantezle, yani '[ ]' ile çizdi; düşen parçalar yazı karakterlerinden ibaretti. Renkler ancak IBM PC sürümüyle, 16 yaşındaki Vadim Gerasimov'un elinden geldi.",
    },
    {
      title: "13 yaşında, 157. seviye",
      body:
        "21 Aralık 2023'te 13 yaşındaki Willis Gibson, 1989 tarihli NES Tetris'i yaklaşık 40 dakika oynayıp 157. seviyeye ulaştı ve oyun dondu: kod, yazarlarının hiç öngörmediği bir noktada çöküyordu. Bunu başardığı bilinen ilk insandı. Yıllarca 29. seviye insan parmağının sınırı sayılmıştı; çünkü o hızda parçayı kenara yetiştirmek imkânsız görünüyordu.",
    },
    {
      title: "Kutudan çıkan oyun",
      body:
        "Tetris, Game Boy'la birlikte Japonya'da 14 Haziran 1989'da çıktı; 31 Temmuz 1989'da ABD'de konsolun kutusuna konarak satılmaya başladı. Yalnızca bu sürüm 35 milyon adet sattı. Oyunun yaratıcısı ise ondan gelir elde etmeye, anlatıldığına göre, ancak 1996'da başlayabildi.",
    },
  ],
  worked: {
    title: "I çubuğu ne kadar gecikir?",
    prompt:
      "Bu sayfadaki oyunda sağ kenarda dört satırlık bir kuyu hazırladın ve I bekliyorsun. Yığının üstünde 6 parçalık yer kaldı. (a) I'nın bu 6 parça içinde gelme olasılığı nedir? (b) Ortalama ve ortanca bekleme kaç parçadır? (c) Yüzde 90 güven için kaç parçalık pay gerekir? (d) Torbalı bir oyunda en kötü bekleme ne olurdu?",
    steps: [
      "Modeli kur: her parça bağımsızdır ve I olma olasılığı p = 1/7, olmama olasılığı q = 6/7'dir.",
      "(a) Altı parçanın hiçbirinin I olmaması: q⁶ = (6/7)⁶ = 46 656 / 117 649 ≈ 0.397. En az bir I gelmesi: 1 − 0.397 = 0.603.",
      "(b) İlk I'ya kadar geçen parça sayısı geometrik dağılır: ortalama 1/p = 7 parça. Ortanca için qⁿ ≤ 0.5 koşulu n ≥ ln 0.5 / ln(6/7) ≈ 4.5 verir: 5 parça. Ortalamanın ortancadan büyük olması uzun kuyruğun işaretidir.",
      "(c) qⁿ ≤ 0.10 için n ≥ ln 0.10 / ln(6/7) ≈ 14.9, yani 15 parça. Beklerken yerleştirdiğin 15 parça 60 kare eder; kuyu sütunu boş kaldıkça hiçbir satır silinmez ve bu, dokuz sütunda yaklaşık 7 satırlık yükselme demektir.",
      "(d) Torbada en kötü durum: I bir torbanın ilk, sonraki torbanın son parçasıdır. Araya 6 + 6 = 12 parça girer; 13. parça kesinlikle I'dır.",
    ],
    result:
      "6 parçalık payla I'nın yetişme olasılığı yalnızca yüzde 60'tır; ortalama bekleme 7, yüzde 90 güven için gereken pay 15 parçadır. Torba aynı beklemeyi 13 parçayla sınırlar. Hafızasız zarla dörtlü kovalamak, beş denemenin ikisinde kaybedilen bir bahistir.",
  },
  misconceptions: [
    {
      myth: "Uzun süredir I gelmedi; artık gelmesi yakındır.",
      truth:
        "Bu sayfada değil. Kod her parçayı öncekilerden bağımsız seçer; on parçalık bir kuraklıktan sonra da sıradaki parçanın I olma olasılığı tam 1/7'dir. Bu düşünce kumarbaz yanılgısı olarak bilinir. Torbalı modern oyunlarda ise sezgin doğrudur: torbadan çıkanlar azaldıkça I'nın olasılığı gerçekten artar. Aynı cümle, zarın türüne göre doğru ya da yanlış olur.",
    },
    {
      myth: "S ile Z aynı parçadır; biri ötekinin döndürülmüş hâlidir.",
      truth:
        "Biri ötekinin ayna görüntüsüdür ve düzlemde hiçbir dönme onları çakıştırmaz; sol ve sağ elin gibi. Çakıştırmak için parçayı masadan kaldırıp ters çevirmen, yani üçüncü boyutu kullanman gerekir. Oyunda bu hamle yoktur. L ile J için de aynısı geçerlidir; beş serbest tetrominonun Tetris'te yedi parçaya çıkmasının nedeni budur.",
    },
    {
      myth: "Seviye arttıkça oyun daha kötü parçalar gönderir.",
      truth:
        "Zar seviyeye bakmaz; 1. seviyede de 12. seviyede de her parça 1/7 olasılıkla gelir. Değişen tek şey zamandır: bir satırlık düşüş 600 ms'den başlar, her seviyede 50 ms kısalır ve 12. seviyede 80 ms'de durur. Parçalar kötüleşmez; düşünmeye ayırdığın süre 12 saniyeden 1.6 saniyeye iner.",
    },
    {
      myth: "Tetris NP-tam olduğuna göre bilgisayarlar onu iyi oynayamaz.",
      truth:
        "NP-tamlık, parça listesi baştan verilen ve tahtası istenildiği kadar büyüyebilen oyunda en iyi çözümü bulmanın en kötü durumdaki zorluğunu anlatır. İyi oynamak başka bir iştir: yığının yüksekliğini, delik sayısını ve yüzeyin pürüzünü puanlayan basit sezgisel programlar, 10×20'lik tahtada insanlardan çok daha uzun süre oynar.",
    },
  ],
  glossary: [
    { term: "Polyomino", definition: "Eş karelerin kenar kenara birleşmesiyle oluşan düzlem şekli; iki karelisi domino, dört karelisi tetromino, beş karelisi pentominodur." },
    { term: "Tetromino", definition: "Dört kareden oluşan polyomino; ayna görüntüleri ayrı sayılırsa yedi tanedir: I, O, T, S, Z, J, L." },
    { term: "Dönme matrisi", definition: "Bir noktanın koordinatlarını, uzunlukları bozmadan belli bir açıyla çeviren matris; 90° için (x, y) → (−y, x)." },
    { term: "Kiralite", definition: "Bir şeklin ayna görüntüsüyle döndürülerek çakıştırılamaması; S-Z ve L-J çiftleri kiraldir, T ve I değildir." },
    { term: "Geometrik dağılım", definition: "Başarı olasılığı p olan bağımsız denemelerde ilk başarıya kadar geçen deneme sayısının dağılımı; ortalaması 1/p'dir." },
    { term: "Torba üreteci", definition: "Yedi parçayı karıştırıp sırayla veren, bitince yeniden karıştıran yöntem; her yedilik dilimde her parça tam bir kez gelir." },
    { term: "NP-tam", definition: "Çözümü hızlı denetlenebilen ve NP'deki her problemin kendisine indirgenebildiği problem; hızlı çözümü bulunursa hepsi hızlı çözülür." },
    { term: "Çevrimdışı problem", definition: "Bütün girdinin, burada parça dizisinin tamamının, karar vermeden önce bilindiği problem türü." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu defterdeki sayılar üç ayrı lisans dersinin kapısıdır. 19, 7 ve 5 arasındaki ilişki <strong>Ayrık Matematik</strong> ve <strong>Soyut Cebir</strong>'de Burnside lemması adıyla karşına çıkar: simetri altında aynı sayılan nesneleri saymak için her simetrinin sabit bıraktığı nesneleri ortalarsın. 19 sabit tetrominodan 0° dönmesi hepsini, 180° dönmesi yedisini, 90° ve 270° dönmeleri yalnızca O'yu yerinde bırakır: (19 + 1 + 7 + 1)/4 = 7. Dönme matrisi <strong>Lineer Cebir</strong>'in ortogonal matrisler bölümüne aittir; determinantın +1 ya da −1 oluşu orada 'yönü koruyan' ve 'yönü çeviren' dönüşümleri ayırır. Zarın davranışı <strong>Olasılık</strong> dersinin ilk haftalarıdır: geometrik dağılım, kupon toplayıcı problemi, 'her sonlu dizi 1 olasılıkla görülür' sonucunu veren Borel–Cantelli lemması.",
      "En derin kapı <strong>Hesaplama Kuramı</strong>'na açılır. P, NP ve indirgeme kavramları, bir problemin zorluğunu onu çözmeye çalışmadan, başka bir probleme çevirerek ölçmeyi öğretir; Tetris sonucu bu yöntemin oyunlara uygulanmış hâlidir. Aynı makale bir adım daha atar ve bazı hedeflerin yaklaşık olarak bile hızlı hesaplanamayacağını gösterir; bu da yaklaşım algoritmaları dersinin konusudur. Öte yanda yapay zekâ durur: parçaların rastgele geldiği gerçek oyunda soru 'en iyi çözüm' değil 'iyi bir politika'dır ve Markov karar süreçleri ile pekiştirmeli öğrenme tam bunu inceler.",
    ],
    topics: [
      "Burnside lemması ve simetri altında sayma",
      "Ortogonal matrisler ve dönme grupları",
      "Geometrik dağılım ve kupon toplayıcı problemi",
      "P, NP ve çok terimli indirgemeler",
      "Yaklaşım algoritmaları",
      "Markov karar süreçleri ve pekiştirmeli öğrenme",
    ],
  },
  quiz: [
    {
      question: "Bu sayfadaki oyunda on parçadır hiç I gelmedi. Sıradaki parçanın I olma olasılığı nedir?",
      options: ["1/7", "1 − (6/7)<sup>10</sup> ≈ yüzde 79", "10/7'ye yaklaştığı için neredeyse kesin", "Yüzde 50"],
      answer: 0,
      explanation:
        "Kod her parçayı öncekilerden bağımsız, eşit olasılıkla seçer; geçmiş kuraklık geleceği etkilemez. Yüzde 79, on parçanın en az birinde I gelmesinin baştan hesaplanan olasılığıdır; kuraklık yaşandıktan sonra artık geçerli değildir.",
    },
    {
      question: "Dik duran I çubuğu soldan 9. sütunda. ↑ tuşuna basınca ne olur?",
      options: [
        "Çubuk yatar ve 6.–9. sütunları kaplar",
        "Çubuk sola itilerek yatar",
        "Hiçbir şey olmaz; yatay hâl 9.–12. sütunları isterdi",
        "Oyun biter",
      ],
      answer: 2,
      explanation:
        "Kod tabloyu sol üst köşesinden tutar; yatay I, dik durduğu sütundan başlayıp sağa doğru dört sütun ister. 9. sütunda bu 9–12 demektir, kuyu ise 10 sütundur. Çarpışma denetimi dönüşü reddeder; bu sürümde parçayı duvardan iten bir kural yoktur.",
    },
    {
      question: "Demaine, Hohenberger ve Liben-Nowell'in sonucu aşağıdakilerden hangisini söyler?",
      options: [
        "10×20'lik Tetris'i hiçbir bilgisayar iyi oynayamaz",
        "Parça dizisi baştan bilinse bile, genelleştirilmiş tahtada en iyi oyunu bulmak NP-tamdır",
        "P ile NP'nin farklı olduğu kanıtlanmıştır",
        "Rastgele gelen parçalarla oyun eninde sonunda kaybedilir",
      ],
      answer: 1,
      explanation:
        "Sonuç çevrimdışı ve tahta boyutu serbest olan oyun içindir. Sabit 10×20 tahta hakkında bir şey söylemez, P ≟ NP sorusunu da çözmez; yalnızca Tetris'i o sorunun içine yerleştirir. Oyunun eninde sonunda kaybedilmesi ise Brzustowski ve Burgiel'in ayrı bir sonucudur.",
    },
  ],
  next: [
    { href: "matris-donusumleri.html", title: "Matris Dönüşümleri: Düzlemi Dört Sayıyla Yeniden Çizmek", why: "↑ tuşunun yaptığı 90°'lik dönmeyi ve determinantı −1 olan yansımayı kendi matrislerinle dene." },
    { href: "grup-teorisi.html", title: "Grup Teorisi: Simetrinin Cebiri", why: "Dört dönmenin oluşturduğu grup ve simetri altında sayma; 19'dan 7'ye, 7'den 5'e inen hesabın dili." },
    { href: "algoritma-karmasikligi.html", title: "Algoritma Karmaşıklığı ve Ölçeklenme", why: "Bir problemin 'zor' olmasının ne demek olduğunu büyüme hızlarıyla gör; NP-tamlığa giden ilk adım." },
    { href: "oyun-2048.html", title: "2048", why: "Yine bir ızgara, yine rastgele gelen taşlar; bu kez arkasında ikinin kuvvetleri ve üstel büyüme var." },
  ],
  sources: [
    { title: "Wikipedia · Tetris", url: "https://en.wikipedia.org/wiki/Tetris", note: "Pajitnov, Elektronika 60, IBM PC sürümü, hak anlaşmazlıkları ve Game Boy; Brzustowski ile Burgiel'in sonuçları (İngilizce)." },
    { title: "arXiv · Tetris is Hard, Even to Approximate (Demaine, Hohenberger, Liben-Nowell, 2002)", url: "https://arxiv.org/abs/cs/0210020", note: "Çevrimdışı Tetris'in NP-tam olduğunu ve bazı hedeflerin yaklaşık olarak bile zor olduğunu gösteren makale." },
    { title: "MathWorld · Tetromino", url: "https://mathworld.wolfram.com/Tetromino.html", note: "Serbest, tek yüzlü ve sabit tetromino sayıları ile döşeme sonuçları." },
    { title: "MathWorld · Polyomino", url: "https://mathworld.wolfram.com/Polyomino.html", note: "n kareli polyominoların sayım tabloları ve Golomb'un çalışmalarına kaynakça." },
  ],
  revision: "Kasım 2026",
};
