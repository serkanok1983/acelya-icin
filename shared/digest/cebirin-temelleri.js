window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["cebirin-temelleri"] = {
  slug: "cebirin-temelleri",
  title: "Cebirin Temelleri: Bilinmeyene Ad Vermek",
  field: "Matematik",
  level: "Lise",
  minutes: 40,
  tagline: "İfade, denklem, eşitsizlik, iki bilinmeyenli sistem ve ikinci derece: her kuralı önce bir alan resminde, terazide ya da sayı doğrusunda görün, sonra neden doğru olduğunu anlayın.",
  hook: "Yaklaşık dört bin yıl önce Babilli bir kâtip, alanı 60 olan ve boyu eninden 7 fazla bir dikdörtgenin enini buldu: 7'nin yarısını aldı, karesine 60 ekledi, karekökünden yine yarımı çıkardı ve 5 buldu. Elinde ne x vardı ne eşittir işareti. Bu sayfada aynı problemi birkaç kaydırıcıyla kurabilir, kâtibin yaptığının bugün \"tam kareye tamamlama\" dediğimiz şey olduğunu kendi gözünüzle görebilirsiniz.",
  bigIdea: "Cebir, bilmediğin sayıya bir ad verip onunla bildiğin sayılar gibi işlem yapmaktır; iki tarafa yapılan her geri alınabilir işlem çözümü korur, ve bu tek fikir terazideki denklemden kök formülüne kadar her şeyi taşır.",
  story: [
    "Denklem yazılmadan çok önce çözülüyordu. MacTutor'un Babil matematiği yazısında anlatılan Eski Babil dönemine ait bir tablette, alanı 1,0 (altmışlık tabanda 60) olan ve boyu eninden 7 fazla bir dikdörtgen sorulur. Kâtip 7'nin yarısını alır (3;30), karesini bulur (12;15), buna 1,0 ekler (1,12;15, yani 72,25), tablodan karekökünü okur (8;30) ve yarımı çıkarıp eni 5 bulur. Aynı yazı, o dönemde simgesel bir gösterimin hiç olmadığını vurgular: kâtipler tipik problem türleri için sözlü yordamlar kullanıyordu, bugünkü x'li yazım yalnız bizim açıklama aracımızdır.",
    "İskenderiyeli Diophantos'un ne zaman yaşadığı bile kesin değil; geleneksel olarak MS 250 civarı söylenir ama bu tarih tartışmalıdır. On üç kitaplık <em>Arithmetica</em>'sından Yunanca altı kitap kaldı. Diophantos bilinmeyen ve onun kuvvetleri için kısaltmalar kullandı; MacTutor bunu sözlü cebirden simgesel cebire giden temel bir adım olarak anar, ama yalnız tek bir bilinmeyen için gösterimi vardı. Yaşını veren ünlü bilmeceye göre 84 yıl yaşamıştır; kaynaklar bu ayrıntıların tamamen uydurma olabileceğini de not eder.",
    "Bağdat'taki Bilgelik Evi'nde Halife Me'mûn'un himayesinde çalışan Muhammed bin Musa el-Harezmî (yaklaşık 780–850), <em>Hisab el-cebr ve'l-mukabele</em> adlı kitabını tamamen sözcüklerle yazdı. <strong>El-cebr</strong> \"tamamlama\", yani eksi terimi karşı tarafa ekleyerek gidermek; <strong>el-mukabele</strong> \"dengeleme\", yani iki taraftaki aynı türden terimleri sadeleştirmektir. Denklemleri altı ölçünlü türe ayırır; \"kareler ve kökler sayılara eşit\" türünün örneği x² + 10x = 39'dur. Çözüm bir resimdir: kenarı x olan karenin dört yanına 10/4 genişliğinde şeritler eklenir, köşelere alanı 25/4 olan dört küçük kare konunca alanı 64, kenarı 8 olan büyük kare çıkar; kenar x + 5 olduğundan x = 3. \"Cebir\" (ve \"algebra\") sözcüğü bu kitabın adından gelir.",
    "Harflerle hesap çok sonra geldi. François Viète 1591'de Tours'da yayımlanan <em>In artem analyticam isagoge</em>'de bilinmeyenler için ünlüleri, bilinen nicelikler için ünsüzleri kullandı. Descartes'ın 1637'de <em>Yöntem Üzerine Konuşma</em>'nın eki olarak çıkan <em>La Géométrie</em>'si bugünkü alışkanlığı yerleştirdi: alfabenin sonundaki x, y, z bilinmeyenler, başındaki a, b, c sabitler. Üs gösterimini de kullanan Descartes kareleri yine de çoğu zaman aa diye yazıyordu. Bu sayfadaki her satır, bu dört bin yıllık yolun sonunda gelen birkaç simgeyle yazılıyor.",
  ],
  core: [
    {
      heading: "İfade ve dağılma: alan resmi bir ispattır",
      body: "Bir <strong>cebirsel ifade</strong> (3x + 2 − x + 5 gibi), x'e bir değer verilince bir sayıya dönüşür. <strong>Benzer terimler</strong> aynı değişkeni aynı kuvvette taşır: 3x ile −x toplanıp 2x olur, 2x ile 7 toplanamaz. Sadeleşmiş biçim 2x + 7, yazılan ifadeyle her x'te aynı değeri verir; sayfada x = 2 için ikisi de 11'dir. Dağılma özelliği a(b + c) = ab + ac bir alan gerçeğidir: kenarları x + p ve x + q olan dikdörtgen dört parçaya bölünür. x = 4, p = 3, q = 2 iken bütün (4 + 3)·(4 + 2) = 42, parçalar 16 + 8 + 12 + 6 = 42. x'i değiştirince sayılar değişir, eşitlik değişmez: <strong>özdeşlik</strong> budur, değişkenin her değerinde doğru olan eşitlik.",
      formula: "(x + p)(x + q) = x² + (p + q)x + pq",
      formulaNote: "Çarpanlara ayırma bu eşitliği tersinden okur: x² + 5x + 6'da çarpımı 6, toplamı 5 olan 2 ve 3 aranır, sonuç (x + 2)(x + 3). Katsayı a ≥ 2 ise çarpımı a·c olan çift aranır ve orta terim bölünüp gruplanır.",
    },
    {
      heading: "Denklem bir terazidir: geri alınabilir adımlar çözümü korur",
      body: "<strong>Denklem</strong> iki ifadenin eşit olduğunu söyler ve yalnız bazı x değerleri için doğrudur. A = B ise A + k = B + k ve (k ≠ 0 için) A·k = B·k de doğrudur. Daha önemlisi her adım <strong>geri alınabilir</strong>: k eklemenin tersi k çıkarmak, sıfırdan farklı k ile çarpmanın tersi k'ye bölmektir. Bu yüzden 3x + 4 = x + 10'dan x = 3'e giden zincirdeki her denklemin çözüm kümesi aynıdır. \"Karşıya geçince işaret değişir\" bir kural değil, iki tarafa aynı sayıyı eklemenin görünüşüdür. Sıfırla çarpmak geri alınamaz, sıfır olabilecek x'e bölmek ise kök kaybettirir: x² = 4x'i x'e bölen x = 0 kökünü yitirir.",
      formula: "ax + b = cx + d  ⇒  x = (d − b)/(a − c),  a ≠ c",
      formulaNote: "a = c iken x'ler yok olur: geriye 1 = 5 gibi yanlış bir eşitlik kalırsa çözüm yoktur, 2 = 2 gibi doğru bir eşitlik kalırsa her x çözümdür.",
    },
    {
      heading: "Eşitsizlik ve mutlak değer: sıra ve uzaklık",
      body: "<strong>Eşitsizliğin</strong> çözümü genellikle bir ışın ya da aralıktır. Toplama sayı doğrusunu kaydırır, sırayı bozmaz; pozitif sayıyla çarpmak doğruyu gerer ya da büzer; negatif sayıyla çarpmak doğruyu 0 etrafında aynalar ve sıra tersine döner. İspat tek satırdır: u < v demek v − u > 0 demektir; k ile çarpınca fark k(v − u) olur ve işareti k'nin işaretidir. <strong>Mutlak değer</strong> ise uzaklıktır: |x − m|, x ile m arasındaki uzaklık. |x − 2| < 3, 2'ye uzaklığı 3'ten az olan sayılardır: −1 < x < 5. \"Büyüktür\" iki ayrı ışın verir ve \"veya\" ile yazılır.",
      formula: "|x − m| < r  ⇔  m − r < x < m + r   (r > 0)",
      formulaNote: "r < 0 iken |x − m| < r hiç sağlanmaz (uzaklık negatif olamaz), |x − m| > r ise her x için sağlanır; sayfa bu iki sınır durumunu ayrıca yazar.",
    },
    {
      heading: "İki doğru, bir kesişim: sistemler ve determinant",
      body: "ax + by = c'nin çözümleri düzlemde bir doğrudur; iki denklemi birlikte sağlayan (x, y), iki doğrunun kesişimidir. <strong>Yok etme</strong> yönteminde denklemlerden biri bir sayıyla çarpılıp ötekinden çıkarılır; adım geri alınabilir olduğu için çözüm kümesi değişmez. <strong>Yerine koyma</strong> aynı işi başka sırayla yapar. Her iki yol da tek bir sayıya takılır: <strong>determinant</strong> a₁b₂ − a₂b₁. Sıfırdan farklıysa doğrular tek noktada kesişir ve çözüm aşağıdaki kesirlerle tam olarak yazılır (Cramer kuralı). Sıfırsa eğimler aynıdır: yok etme x'i de götürür, geriye 0 = 0 (çakışık, sonsuz çözüm) ya da 0 = 14 gibi bir çelişki (paralel, çözüm yok) kalır.",
      formula: "x = (c₁b₂ − c₂b₁)/(a₁b₂ − a₂b₁),  y = (a₁c₂ − a₂c₁)/(a₁b₂ − a₂b₁)",
      formulaNote: "Sayfanın varsayılanı x + y = 5, 2x − y = 1: determinant −3, x = (−5 − 1)/(−3) = 2, y = (1 − 10)/(−3) = 3. Lineer cebirde bu sayı 2×2 matrisin determinantıdır ve düzlemdeki alan ölçeğini verir.",
    },
    {
      heading: "Tam kareye tamamlama ve kök formülü",
      body: "x² + bx'e (b/2)² eklenirse bir tam kare çıkar: x² + bx + (b/2)² = (x + b/2)². Harezmî'nin resmi bunun ta kendisidir. Aynı adım genel ax² + bx + c = 0 için yapılınca (önce a'ya böl, sabiti karşıya at, (b/2a)² ekle, karekök al) <strong>kök formülü</strong> doğar. Karekökün içindeki <strong>diskriminant</strong> Δ = b² − 4ac kök sayısını söyler: Δ > 0 iki reel kök, Δ = 0 tek (çift) kök, Δ < 0 reel kök yok. Grafikte bunlar parabolün x eksenini iki noktada kesmesi, eksene teğet olması ve hiç değmemesidir. Kökleri formülsüz de bulmak mümkündür: sayfa işaret değişimi arayıp ikiye bölerek ölçer ve iki yolun farkını yazar.",
      formula: "x = (−b ± √(b² − 4ac)) / (2a)",
      formulaNote: "Kökler toplamı −b/a, çarpımı c/a'dır (Viète bağıntıları): x² + 10x − 39 = 0'ın kökleri −13 ve 3, toplamları −10, çarpımları −39.",
    },
  ],
  lab: {
    intro: "Sayfa altı sekmeden oluşur: <strong>01 · İfade ve özdeşlik</strong> (ifade yazma, alan modeli, özdeşlik resimleri, çarpanlara ayırma), <strong>02 · Denklem ve terazi</strong> (a, b, c, d kaydırıcılarıyla ax + b = cx + d, \"x için dene\" ve iki kefeye işlem düğmeleri), <strong>03 · Eşitsizlik ve mutlak değer</strong>, <strong>04 · Denklem sistemleri</strong> (katsayı kutuları, sürüklenebilir doğrular, yöntem seçimi), <strong>05 · İkinci derece</strong> (a, b, c kaydırıcıları, tam kare resmi, parabol) ve <strong>06 · Problemden denkleme</strong>. Sekmelerin altında üç seviyeli alıştırma, \"Sık yapılan yedi hata\" kartları ve \"Bundan sonra\" bölümü her zaman görünür. Her sekmede \"Sekmeyi sıfırla\" var; bütün hesaplar tam kesirle yapılır, sayfa hiçbir şey kaydetmez.",
    experiments: [
      {
        title: "Kare almak toplamaya dağılmaz",
        predict: "(5 + 3)² ile 5² + 3² aynı sayı mı? Farkları ne kadar olmalı?",
        do: "01 sekmesinde \"Özdeşlikler: resimle ispat\" bölümüne in. Özdeşlik menüsünde (a + b)² = a² + 2ab + b² seçili iken a = 5, b = 3 yap. Sonra a = 2, b = 1 dene. En son menüden a² − b² = (a + b)(a − b)'yi seç, a = 7, b = 3 yap ve \"Parçayı taşı\" kaydırıcısını %100'e getir.",
        observe: "a = 5, b = 3: sol taraf 64, sağ taraf \"25 + 30 + 9 = 64\", sık yapılan yanlış 34 ve altında \"eksik 2ab = 30\". Resimde büyük karenin içinde iki tane ab dikdörtgeni görünür. a = 2, b = 1 iken 9 ve 5, eksik 2ab = 4. a² − b² resminde sol \"49 − 9 = 40\", sağ \"10·4 = 40\"; L biçimli parça kesilip yan çevrilince kenarları a + b = 10 ve a − b = 4 olan dikdörtgen olur.",
        explain: "(a + b)² = (a + b)(a + b) dağılmayla dört çarpım verir: a², ab, ba, b². a² + b² ortadaki iki dikdörtgeni unutur, fark her zaman 2ab'dir. Sayılarla denemek yalnız örnektir; resim a ve b ne olursa olsun geçerli bir akıl yürütmedir, çünkü bir alanı parçalara bölmek ya da parçaları kesip taşımak alanı değiştirmez.",
      },
      {
        title: "Terazi: iki kefeye aynı işlem, tek kefeye bozuk denge",
        predict: "3x + 4 = x + 10'da x kaç? Yalnız sol kefeye 1 eklersen çözüm ne olur?",
        do: "02 sekmesini aç (varsayılan 3x + 4 = x + 10). \"x için dene\"yi 1'den 3'e getir. Sonra sırayla \"İki taraftan x çıkar\", \"İki taraftan 4 çıkar\" ve \"İki tarafı 2 sayısına böl\" düğmelerine bas (bu düğmelerin yazısı denkleme göre değişir). Ardından \"Geri al\"a bas, \"Yalnız sol kefeye uygula (kuralı çiğne)\" kutusunu işaretle ve +1'e bas.",
        observe: "x = 1 iken sol kefe 7, sağ kefe 11, \"fark −4, sağ ağır\". x = 3'te iki kefe 13'er, \"iki kefe eşit: denge\". İşlem geçmişi: 2x + 4 = 10, 2x = 6, x = 3; başlangıç denkleminde yerine koyma \"sol 13, sağ 13\". Geri alıp tek kefeye +1 uygulayınca denklem 2x + 1 = 6 olur, çözüm x = 5/2 (\"başlangıçta x = 3; değişti\"), denetim \"sol 23/2, sağ 25/2\" ve \"Denge bozuldu\".",
        explain: "Eşit iki sayıya aynı şeyi yapınca sonuçlar eşit kalır ve geri alınabilir adımlar çözüm kümesini değiştirmez; bu yüzden zincirin sonundaki x = 3 baştaki denklemin de çözümüdür. Tek kefeye yapılan işlem ise başka bir denklem üretir. Çözümü her zaman başlangıç denkleminde yerine koyarak denetlemenin nedeni budur: ara adımdaki bir hatayı en son bu denetim yakalar.",
      },
      {
        title: "Negatife bölünce yön neden döner?",
        predict: "−2x + 3 < 9'un çözümü x < −3 mü, x > −3 mü? x = −3 kümede mi?",
        do: "03 sekmesini aç (varsayılan −2x + 3 < 9). \"Test noktası x\"i 0, −5 ve −3 yap. Sonra işareti ≤ seç. Aşağıdaki \"u ve v'yi k ile çarp\" bölümünde u = 2, v = 5 iken \"Çarpan k\"yı −1, 2,5 ve 0 yap.",
        observe: "Çözüm \"x > −3\", aralık \"(−3, ∞)\" ve \"negatif sayıya bölündü, yön değişti\". x = 0: \"−2·0 + 3 = 3 < 9 doğru\"; x = −5: \"13 < 9 yanlış\"; x = −3: \"9 < 9 yanlış\", kümede değil. ≤ seçilince çözüm \"x ≥ −3\", aralık [−3, ∞) ve x = −3 artık kümede. k = −1: \"−2 > −5\", yön değişti; k = 2,5: \"5 < 12,5\", yön aynı kaldı; k = 0: \"0 = 0\", eşitsizlik eşitliğe döner.",
        explain: "u < v ise v − u pozitiftir; k ile çarpınca fark k(v − u) olur ve işaretini k belirler. Negatif k sayı doğrusunu 0 etrafında aynalar, aynada sol ile sağ yer değiştirir. Sınırdaki noktanın dahil olup olmaması ise yalnız işaretin < mı ≤ mı olduğuna bağlıdır: sayı doğrusunda boş daire ile dolu daire. k = 0 bilgiyi yok eder, bu yüzden eşitsizlik 0 ile çarpılmaz.",
      },
      {
        title: "İki doğru: tek çözüm, çözüm yok, sonsuz çözüm",
        predict: "Determinant sıfır olunca iki doğru ne yapar? Yöntemi değiştirmek sonucu değiştirir mi?",
        do: "04 sekmesini aç (varsayılan x + y = 5, 2x − y = 1). Sırayla \"Kesirli çözüm\", \"Paralel\" ve \"Çakışık\" düğmelerine bas, her birinde adımları oku. Sonra \"Tek çözüm\"e dön ve \"Çözüm yöntemi\"ni \"Yerine koyma\" yap.",
        observe: "Varsayılan: determinant \"1·(−1) − 2·1 = −3\", çözüm (2, 3), denetim \"(1) 5 = 5, (2) 1 = 1\". Kesirli çözüm (2x + 3y = 7, x − 4y = 2): determinant −11, çözüm (34/11, 3/11), yaklaşık (3,091; 0,273). Paralel (x + 2y = 4, 2x + 4y = −6): determinant 0, yok etme \"0 = 14\" ile biter, çözüm yok. Çakışık (x − y = 2, 3x − 3y = 6): determinant 0, \"0 = 0\", sonsuz çözüm. Yerine koymada y = −x + 5 yazılır ve yine (2, 3) bulunur.",
        explain: "Determinant a₁b₂ − a₂b₁ sıfırsa iki doğrunun eğimi aynıdır; o zaman denklemlerden birini katlayıp çıkarmak y ile birlikte x'i de götürür. Kalan sabitlerin farkı sıfır değilse doğrular hiç buluşmaz, sıfırsa iki denklem aynı doğruyu anlatır. Kesirli çözüm, ızgarada kesişimin tam sayı noktasına düşmediğini gösterir; tam değeri Cramer kesirleri verir.",
      },
    ],
  },
  wow: [
    {
      title: "Babil'in dikdörtgeni sayfada duruyor",
      body: "Eski Babil dönemine ait bir tablette alanı 60, boyu eninden 7 fazla bir dikdörtgenin eni, 7'nin yarısının karesine 60 eklenip karekök alınarak bulunur: 3;30 → 12;15 → 72;15 → 8;30 → 5. 06 sekmesinde \"Alan problemi\"ni seçip farkı 7, alanı 60 yaparsanız sayfa aynı problemi x(x + 7) = 60 diye kurar ve 5 cm bulur. 05 sekmesinde a = 1, b = 7, c = −60 iken tam kare resmi kâtibin sayılarını verir: alan 60 + 12,25 = 72,25, kenar 8,5, x = 8,5 − 3,5 = 5.",
    },
    {
      title: "Descartes x² yerine xx yazıyordu",
      body: "Bilinmeyenlere x, y, z, sabitlere a, b, c demeyi 1637 tarihli <em>La Géométrie</em> yerleştirdi. Kitap üs gösterimini de kullanır, ama kareler için eski alışkanlığı sürdürür ve aa gibi tekrarlanan harfler yazar.",
    },
    {
      title: "Bilmecenin cevabı 84",
      body: "Diophantos'un yaşamını evrelere bölen ünlü bilmece (MS 500 civarında Metrodoros'un derlediği Yunan Antolojisi'nde) çözülünce 84 çıkar: oğlu 42 yaşında ölmüş, kendisi dört yıl sonra. Bu tek bilinmeyenli bir denklemdir; ama tarihçiler ayrıntıların tamamen uydurma olabileceğini hatırlatır.",
    },
  ],
  worked: {
    title: "Babil kâtibinin dikdörtgeni: tam kareye tamamlama",
    prompt: "Bir dikdörtgenin boyu eninden 7 cm fazla, alanı 60 cm². Eni kaç cm'dir? Önce tam kareye tamamlayarak çöz, sonra kök formülüyle denetle ve sonucu 06 sekmesinde (\"Alan problemi\", fark 7, alan 60) karşılaştır.",
    steps: [
      "Adlandır ve kur: en x cm olsun; boy x + 7 cm. Alan en × boy: x(x + 7) = 60, yani x² + 7x = 60 (birim cm²).",
      "Tamamla: x² + 7x'e (7/2)² = 12,25 eklenince tam kare çıkar. İki tarafa da ekle: x² + 7x + 12,25 = 72,25, yani (x + 3,5)² = 72,25. Babil kâtibinin altmışlık tabanda yazdığı 12;15 ve 1,12;15 tam olarak bu 12,25 ve 72,25'tir.",
      "Karekök al: x + 3,5 = ±8,5 (çünkü 8,5² = 72,25). Buradan x = 5 ya da x = −12.",
      "Denetle: x² + 7x − 60 = 0 için Δ = 7² − 4·1·(−60) = 289, √Δ = 17, x = (−7 ± 17)/2, kökler −12 ve 5. Sayfa da aynı adımları ve \"Kökler: −12 ve 5\" satırını gösterir.",
      "Anlamlı mı: uzunluk negatif olamaz, −12 atılır. En 5 cm, boy 12 cm; 5·12 = 60 cm². Denklemin iki çözümü var, problemin tek.",
    ],
    result: "En 5 cm, boy 12 cm. Tam kareye tamamlama ile kök formülü aynı sonucu verir, çünkü kök formülü bu tamamlamanın genel hâlidir.",
  },
  misconceptions: [
    {
      myth: "(a + b)² = a² + b²; kare her terime ayrı ayrı uygulanır.",
      truth: "Kare almak toplamaya dağılmaz: (a + b)² = a² + 2ab + b². Kenarı a + b olan karenin içinde a² ve b²'nin yanında iki tane ab dikdörtgeni vardır; a = 3, b = 4 için 49 ile 25 arasındaki fark 2ab = 24'tür.",
    },
    {
      myth: "Terim karşıya geçince işareti değişir; bu ezberlenecek bir kuraldır.",
      truth: "Karşıya geçirmek iki tarafa aynı sayıyı eklemektir. 3x − 3 = 2x + 4'te soldaki −3'ü gidermek için iki tarafa 3 eklenir ve sağda +3 belirir: x = 7. İşareti unutup x = 1 bulan, başlangıç denkleminde yerine koyunca 0 ile 6'yı karşılaştırır ve hatayı görür.",
    },
    {
      myth: "Eşitsizlikte de denklemdeki her adım aynen geçerlidir.",
      truth: "Toplama ve çıkarma geçerlidir, ama negatif bir sayıyla çarpma ya da bölme yönü çevirir: −3x < 12 ise x > −4. x = 0 bunu sınar: asıl eşitsizliği sağlar ama yanlış cevap olan x < −4'ün kümesinde değildir.",
    },
    {
      myth: "Denklemin her çözümü problemin cevabıdır.",
      truth: "Denklem problemin yalnız bir modelidir. Alan probleminde −12 de denklemi sağlar, ama bir dikdörtgenin eni olamaz. Sonucu metne geri koyup anlamlı mı diye bakmak, çözümün parçasıdır.",
    },
  ],
  glossary: [
    { term: "Değişken", definition: "Henüz bilinmeyen ya da değişebilen bir sayının yerini tutan harf (x, y)." },
    { term: "Özdeşlik", definition: "Değişkenin her değerinde doğru olan eşitlik; (a + b)² = a² + 2ab + b² gibi." },
    { term: "Denklem", definition: "İki ifadenin eşit olduğunu söyleyen ve yalnız bazı değerlerde (çözümlerde) doğru olan önerme." },
    { term: "Eşitsizlik", definition: "İki ifade arasında <, ≤, > ya da ≥ ilişkisi kuran önerme; çözümü çoğu zaman bir aralıktır." },
    { term: "Çarpanlara ayırma", definition: "Bir toplamı çarpım olarak yazmak; dağılma özelliğinin tersinden uygulanması." },
    { term: "Determinant", definition: "a₁x + b₁y = c₁, a₂x + b₂y = c₂ sisteminde a₁b₂ − a₂b₁ sayısı; sıfırdan farklıysa tek çözüm vardır." },
    { term: "Diskriminant", definition: "ax² + bx + c = 0 için Δ = b² − 4ac; işareti reel kök sayısını belirler." },
    { term: "Tam kareye tamamlama", definition: "x² + bx'e (b/2)² ekleyip ifadeyi (x + b/2)² biçiminde bir kareye çevirme yöntemi." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki her araç üniversitede büyüyerek geri gelir. İki bilinmeyenli sistem, lineer cebirde n bilinmeyenli Ax = b olur; yok etme yöntemi Gauss yok etmesine, a₁b₂ − a₂b₁ ise bir matrisin determinantına dönüşür ve \"determinant sıfır ⇔ tek çözüm yok\" ilkesi aynen sürer. Eşitsizlikler ve mutlak değer, analiz derslerinde limitin ε–δ tanımının dilidir: |x − a| < δ iken |f(x) − L| < ε cümlesi, bu sayfadaki \"uzaklık\" okumasının ta kendisidir.",
      "İkinci derece denklemin iki kökü, Δ < 0 iken karmaşık sayılarda yeniden ortaya çıkar (sayfada x² + 2x + 5 için −1 ± 2·i). Kökleri formül kullanmadan ikiye bölerek bulmak sayısal analizin ilk yöntemlerinden biridir. Üçüncü ve dördüncü derece için de kök formülleri vardır, ama beşinci ve daha yüksek dereceden genel denklemin köklerini katsayılardan dört işlem ve kök almayla veren bir formül yoktur (Abel–Ruffini teoremi); bu sonuç, soyut cebirde polinomların ve simetrilerin incelenmesine götürür. Fizik ve mühendislik derslerinde ise hemen her problem, bu sayfadaki beş adımla başlar: bilinmeyene ad ver, metni denkleme çevir, çöz, denetle, anlamlı mı diye bak.",
    ],
    topics: ["Lineer cebir: Gauss yok etmesi ve determinant", "Analizde ε–δ ve mutlak değer eşitsizlikleri", "Karmaşık sayılar ve polinom kökleri", "Sayısal analiz: ikiye bölme yöntemi", "Soyut cebir: polinomlar ve çözülebilirlik"],
  },
  quiz: [
    {
      question: "x² + 6x = 16 denklemini tam kareye tamamlayarak çözmek için iki tarafa hangi sayı eklenir ve kökler nedir?",
      options: ["36 eklenir; kökler 2 ve −8", "9 eklenir; kökler 2 ve −8", "9 eklenir; kökler 4 ve −4", "3 eklenir; kök yalnız 2"],
      answer: 1,
      explanation: "x² + 6x'i tam kare yapan (6/2)² = 9'dur: x² + 6x + 9 = (x + 3)². İki tarafa 9 eklenince (x + 3)² = 25, x + 3 = ±5, x = 2 ya da x = −8. Viète ile denetim: toplam −6 = −b/a, çarpım −16 = c/a.",
    },
    {
      question: "x + 2y = 4 ve 2x + 4y = k sisteminin sonsuz çözümü olması için k kaç olmalıdır?",
      options: ["k = 4", "k = −6", "k = 8", "Determinant sıfır olduğu için hiçbir k'de çözüm yoktur"],
      answer: 2,
      explanation: "Determinant 1·4 − 2·2 = 0, yani doğruların eğimi aynı. İkinci denklem birincinin 2 katı olursa iki doğru çakışır: 2x + 4y = 8. Başka her k'de doğrular paraleldir ve yok etme 0 = (sıfır olmayan sayı) çelişkisiyle biter; sayfadaki \"Paralel\" hazırı k = −6 durumudur.",
    },
    {
      question: "Bir öğrenci x² = 5x denkleminin iki tarafını x'e bölüp x = 5 buluyor. Ne oldu?",
      options: ["Doğru çözdü; tek kök 5'tir", "x = 0 kökünü kaybetti, çünkü x'e bölmek x ≠ 0 varsayımını gizlice ekler", "x = −5 kökünü kaybetti, çünkü karekök alırken ± unutuldu", "Denklem ikinci dereceden olduğu için kök formülü dışında bir yol kullanılamaz"],
      answer: 1,
      explanation: "Bir sayıya bölmek ancak o sayı sıfır değilse geri alınabilir bir adımdır. Doğrusu bir tarafa toplayıp ortak çarpana ayırmak: x² − 5x = 0, x(x − 5) = 0; çarpım sıfırsa çarpanlardan biri sıfırdır, x = 0 ya da x = 5. x = 0 yerine konunca 0 = 0 verir.",
    },
  ],
  next: [
    { href: "us-ve-logaritma.html", title: "Üstel Fonksiyon ve Logaritma: Büyüme, Yarılanma ve Logaritmik Ölçek", why: "Önşart dizisinin sonraki basamağı: bilinmeyen üste çıkınca (2ˣ = 8) burada öğrendiğiniz \"iki tarafa aynı geri alınabilir işlem\" ilkesinin yeni aracı logaritmadır; orada üs kuralları, üstel büyüme ve logaritmik ölçek çalışılır." },
    { href: "fonksiyon-grafigi.html", title: "Fonksiyon Grafikleri: Dönüşüm, Aile ve Ters", why: "Burada çizdiğiniz doğru ve parabol birer fonksiyon grafiğidir; orada grafiği kaydırıp yansıtır, sıfırları ve tepeleri dönüşüm kuralıyla tahmin edip ölçer, ters fonksiyonu sınarsınız." },
    { href: "matris-donusumleri.html", title: "Matris Dönüşümleri: Düzlemi Dört Sayıyla Yeniden Çizmek", why: "İki bilinmeyenli sistemin katsayıları bir matristir; orada determinant ad − bc, birim karenin görüntüsünün işaretli alanı olarak ölçülür ve sıfır olunca neden tek çözüm kalmadığı görünür." },
    { href: "karmasik-sayilar.html", title: "Karmaşık Sayılar: Düzlemde Döndürme ve Büyütme", why: "Δ < 0 iken reel kökü olmayan denklemler karmaşık sayılarda iki kök bulur; orada sayıları düzlemde döndürme ve büyütme olarak görür, kök almayı ve birim kökleri incelersiniz." },
  ],
  sources: [
    { title: "MacTutor: Al-Khwarizmi", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Al-Khwarizmi/", note: "Yaşam aralığı, Bilgelik Evi, el-cebr ve el-mukabele, altı ölçünlü tür, x² + 10x = 39'un dört şerit ve dört köşe kareli geometrik çözümü, \"algebra\" sözcüğünün kökeni; Diophantos ile karşılaştırma." },
    { title: "MacTutor: Babylonian mathematics", url: "https://mathshistory.st-andrews.ac.uk/HistTopics/Babylonian_mathematics/", note: "Altmışlık taban; alanı 1,0 ve boyu eninden 7 fazla dikdörtgen problemi ve kâtibin adımları (3;30, 12;15, 1,12;15, 8;30, 5; MacTutor bu toplamı “1; 12, 15” diye yazar); simgesel gösterimin yokluğu." },
    { title: "MacTutor: François Viète", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Viete/", note: "1591 tarihli <em>In artem analyticam isagoge</em>; bilinmeyenler için ünlüler, bilinenler için ünsüzler." },
    { title: "Wikipedia: La Géométrie", url: "https://en.wikipedia.org/wiki/La_G%C3%A9om%C3%A9trie", note: "1637, <em>Yöntem Üzerine Konuşma</em>'nın eki; x, y, z bilinmeyen, a, b, c sabit; üs gösterimi ve kareler için aa yazımı." },
  ],
  revision: "Kasım 2026",
};
