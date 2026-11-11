window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["bayes-olasilik"] = {
  slug: "bayes-olasilik",
  title: "Bayes Teoremi: Kanıtla Fikir Değiştirmenin Matematiği",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Testin pozitif çıktı: hasta olma olasılığın %95 mi, %9 mu? Cevap hastalığın ne kadar nadir olduğunda saklı. Bayes kuralı, bir kanıttan sonra fikrini ne kadar değiştirmen gerektiğini söyler.",
  hook: "Bir hastalık 100 kişiden birinde görülüyor. Test hastaların %95'ini yakalıyor ama sağlamların %10'una da yanlışlıkla “pozitif” diyor. Testin pozitif çıktı: hasta olma olasılığın kaç? İçgüdü %95'e yakın bir sayı söyler. Formül %8,76 der; laboratuvar da 10.000 kişilik bir nüfusu tek tek sayar ve 1.045 pozitifin yalnız 107'sinin hasta olduğunu bulur.",
  bigIdea:
    "Bir kanıttan sonra ne kadar emin olman gerektiği iki şeye bağlıdır: kanıttan önceki olasılık (<strong>önsel</strong>) ve kanıtın, iddia doğruyken yanlış olduğuna göre kaç kat sık görüldüğü; olasılığı oran olarak yazarsan bu tek bir çarpımdır: <em>sonsal oran = önsel oran × olabilirlik oranı</em>.",
  story: [
    "Thomas Bayes, Londra'nın güneydoğusundaki Tunbridge Wells kasabasında bir Presbiteryen papazıydı. Hayatı boyunca yalnızca iki eser yayımladığı biliniyor: 1731'de bir ilahiyat kitabı ve 1736'da, adını bile koymadan, Newton'un kalkülüsünü Piskopos Berkeley'in <em>The Analyst</em>'teki saldırısına karşı savunan bir kitapçık. 1742'de Royal Society'ye üye seçildi; bilinen başka matematik yayını olmadığı için bu kitapçık sayesinde seçildiği tahmin ediliyor. Son yıllarında olasılığa merak sardı. Neden sardığını kimse kesin bilmiyor: bir tarihçi 1755'te yazılmış bir eseri incelemesine, bir başkası Abraham de Moivre'ın kitabına, bazıları da Hume'un mucizelere tanıklık üzerine yazdıklarına cevap verme isteğine bağlıyor. Bunlar tahmin, belge değil.",
    "Bayes'in uğraştığı soru, zamanın deyişiyle bir <strong>ters olasılık</strong> sorusuydu. Zarın adil olduğunu bilip “6 gelme olasılığı kaç?” diye sormak kolaydır. Tersi zordur: sonuçları gördün, peki bu sonuçları üreten gizli olasılık neydi? Bayes bunu bir düşünce deneyiyle kurdu: düz bir masaya bir top atılır ve yeri gizlenir; sonra başka toplar atılır ve sana yalnızca kaçının ilk topun bir yanına düştüğü söylenir. İlk top nerededir? Bayes 7 Nisan 1761'de, çözümünü yayımlamadan öldü.",
    "Ailesi kâğıtlarını Bayes'in dostu, papaz ve filozof Richard Price'a verdi. Price, notların değerini fark etti ve onları iki yıl boyunca düzeltip genişletti; bir giriş ve örneklerle dolu bir ek yazdı. Makale, Price'ın dostu John Canton'a yazdığı bir mektup olarak Canton tarafından 23 Aralık 1763'te Royal Society'de okundu ve <em>Philosophical Transactions</em>'ın 53. cildinde basıldı. Price'ın eklediği örneklerden biri, “Güneş yarın doğacak mı?” sorusuydu. Price 1765'te Royal Society'ye üye seçildi. Bazı yazarlar, onun katkısının o kadar büyük olduğunu düşünür ki teoremi “Bayes–Price kuralı” diye anmayı önerir.",
    "1774'te Fransa'da, henüz yirmili yaşlarının ortasındaki Pierre-Simon Laplace, görünüşe göre Bayes'ten habersiz, aynı fikre ulaştı. Makalesinin adı her şeyi söylüyordu: <em>Olaylardan nedenlerin olasılığı üzerine</em>. Laplace kuralı genel biçimine getirdi, nüfus sayımlarından gökbilime kadar her yerde kullandı ve 1814'teki <em>Olasılıklar Üzerine Felsefi Deneme</em>'de olasılık kuramının “aslında hesaba indirgenmiş sağduyu” olduğunu yazdı. 20. yüzyılın başında pek çok istatistikçi önsel fikrini fazla öznel bulup yöntemi bir kenara itti; “Bayesçi” sözcüğü ancak 1950'ler civarında bugünkü anlamıyla yaygınlaştı. Bu arada teorem Enigma şifresini kırmaya, batık denizaltı aramaya ve sonunda spam filtrelerine taşındı. İngiliz bilim insanı Harold Jeffreys 1973'te onu “olasılık kuramı için, Pisagor teoreminin geometri için olduğu şey” diye tanımladı.",
  ],
  core: [
    {
      heading: "Koşullu olasılık: dünyayı daraltmak",
      body: "“B olduğu bilindiğinde A'nın olasılığı” demek, bütün durumları unutup yalnızca B'nin gerçekleştiği küçük dünyaya bakmak demektir. Bu paya <strong>koşullu olasılık</strong> denir, P(A | B) diye yazılır; dikey çizgi “verildiğinde” diye okunur. 2×2 bir sayım tablosunda her şey sayıdır: hücreler a = A∩B, b = A∩¬B, c = ¬A∩B, d = ¬A∩¬B ise P(A | B) = a/(a + c), P(B | A) = a/(a + b). Pay aynı, paydalar farklıdır; bu yüzden ikisi genellikle eşit değildir. Laboratuvarın 02 sekmesindeki “Tanı testi (A hasta, B pozitif)” tablosunda P(A | B) = 95/1.085 = %8,76, P(B | A) = 95/100 = %95,00 çıkar. <strong>Bağımsızlık</strong>, B'yi bilmenin A hakkında hiçbir şey söylememesidir: P(A | B) = P(A | ¬B). Bu eşitliği a/(a + c) = b/(b + d) diye yazıp içler dışlar çarpımı yaparsan a(b + d) = b(a + c) çıkar; iki yandaki ab sadeleşir ve a·d = b·c kalır; “Bağımsız örnek” tablosunda 12·42 = 18·28 = 504.",
      formula: "P(A | B) = P(A ∩ B) / P(B)<br>bağımsız ⇔ P(A ∩ B) = P(A)·P(B) ⇔ a·d = b·c",
      formulaNote:
        "∩ “ve”, ¬ “değil” demektir. Gerçek bir örneklemde a·d = b·c nadiren tam tutar; sayfadaki ki-kare testi farkın şansla açıklanıp açıklanamayacağını sorar (varsayılan tabloda χ² = 16,667).",
    },
    {
      heading: "Bayes teoremi: soruyu ters çevirmek",
      body: "Test üreticisi sana P(pozitif | hasta)'yı verir; senin merak ettiğin P(hasta | pozitif)'tir. Köprü iki adımdır. Önce <strong>toplam olasılık</strong>: pozitif sonuca iki yoldan varılır, ya hastasındır ve test yakalamıştır ya da sağlamsındır ve test yanılmıştır. Varsayılan ayarda P(+) = 0,95 × 0,01 + 0,10 × 0,99 = 0,0095 + 0,0990 = 0,1085. Sonra bölme: pozitiflerin içinde ilk yolun payı 0,0095/0,1085 = %8,76. Parçaların adları vardır: <strong>önsel</strong> P(H), kanıttan önceki inanç; <strong>olabilirlik</strong> P(E | H), hipotez doğruysa kanıtı görme olasılığı; <strong>sonsal</strong> P(H | E), kanıttan sonraki inanç. Nadir bir durumda paydanın büyük kısmını yanlış alarmlar doldurur: 0,0990, 0,0095'in on katından fazladır. 01 sekmesindeki doğal sıklık ağacı aynı hesabı kişi sayısıyla gösterir: 95 hasta / 1.085 pozitif.",
      formula: "P(H | E) = P(E | H)·P(H) / [P(E | H)·P(H) + P(E | ¬H)·P(¬H)]",
      formulaNote:
        "Payda P(E)'dir, yani toplam olasılık. “Doğruluk” (%90,05) bu formülde hiç geçmez; doğruluk çoğunlukla sağlamların doğru negatiflerinden beslenir.",
    },
    {
      heading: "Oran biçimi: kanıtlar çarpılır, logaritmada toplanır",
      body: "Olasılık yerine <strong>oran</strong> yazarsan Bayes tek çarpmaya iner: O(H) = P(H)/P(¬H). Kanıtın gücü <strong>olabilirlik oranıdır</strong>, LR = P(E | H)/P(E | ¬H). Varsayılan testte LR⁺ = 0,95/0,10 = 9,50; önsel oran 0,0101, sonsal oran 0,0101 × 9,50 = 0,0960 (sayfa ikisini yan yana yazar). k test, hastalık durumu bilindiğinde birbirinden <strong>koşullu bağımsızsa</strong>, oran (LR⁺)<sup>k</sup> ile çarpılır; aynı kan örneğini aynı makinede yeniden okutmak bu koşulu bozar ve ikinci pozitif daha az bilgi taşır. Logaritma alınca çarpım toplama döner: 04 sekmesinde %80 kırmızılı Torba 3 ile %50 kırmızılı Torba 2 karşılaştırılırken her kırmızı bilye log₁₀ orana log₁₀(0,8/0,5) = +0,204, her beyaz log₁₀(0,2/0,5) = −0,398 ekler. Bunun on katı, Turing'in <strong>desiban</strong>ıdır (+2,0 ve −4,0 dB). Önseli tam 0 ya da tam 1 olan biri hiçbir kanıtla fikrini değiştiremez: log oranı sonsuzdur.",
      formula: "log₁₀ O(H | E₁, …, E<sub>k</sub>) = log₁₀ O(H) + Σ log₁₀ LR<sub>i</sub>",
      formulaNote:
        "Toplam, kanıtlar hem H doğruyken hem yanlışken birbirinden bağımsızsa geçerlidir; o zaman sırayla güncellemek hepsini birden kullanmakla aynı sonucu verir. Oran o ise olasılık o/(1 + o)'dur.",
    },
    {
      heading: "Sürekli önsel: beta–binom ve “sözde atışlar”",
      body: "Bilinmeyen tek bir evet/hayır değil de bir sayı olunca, örneğin bir paranın tura olasılığı p, önsel bir yoğunluk eğrisi olur. <strong>Beta(α, β)</strong> önselinin yoğunluğu p<sup>α−1</sup>(1 − p)<sup>β−1</sup> ile orantılıdır. h tura ve t yazının olabilirliği p<sup>h</sup>(1 − p)<sup>t</sup>'dir. Çarpınca üsler toplanır: sonsal p<sup>α+h−1</sup>(1 − p)<sup>β+t−1</sup> ile orantılıdır, yani yine bir beta, Beta(α + h, β + t). Önselle sonsalın aynı aileden çıkmasına <strong>eşleniklik</strong> denir. α ve β'yı “önceden görülmüş” tura ve yazı sayısı gibi oku: sonsal ortalama, önsel ortalama ile gözlenen oran f = h/n'nin ağırlıklı ortalamasıdır ve önselin ağırlığı w = (α + β)/(α + β + n) veri arttıkça sıfıra iner. 03 sekmesinin varsayılan durumunda (Beta(1, 1), 20 atışta 15 tura) sonsal Beta(16; 6), ortalama 0,727 = 0,091 × 0,500 + 0,909 × 0,750. Güçlü “adil” Beta(50, 50) önseli 100 sözde atış taşır; aynı veriyle ortalama 0,542'de kalır ve w = %83,3'tür. Önsel öznel olabilir, ama açıkça yazılır: herkes onu görür, itiraz eder ve veri büyüdükçe farklı önseller aynı sonsala yaklaşır.",
      formula: "Beta(α, β) × p<sup>h</sup>(1 − p)<sup>t</sup> ∝ Beta(α + h, β + t)<br>ortalama = w·α/(α + β) + (1 − w)·f,  w = (α + β)/(α + β + n)",
      formulaNote:
        "∝ “orantılıdır” demektir: normalleştirme sabiti en sonda, eğrinin altındaki alan 1 olacak biçimde gelir. Beta(1, 1) düzgün önseldir; Jeffreys önseli Beta(0,5; 0,5) de sayfada hazır olarak durur.",
    },
    {
      heading: "İki çerçeve, iki soru: inanılır aralık ve güven aralığı",
      body: "Bayesçi <strong>%95 inanılır aralık</strong>, sonsalın ortadaki %95'lik kısmıdır ve “bu veriyle ve bu önselle p %95 olasılıkla buradadır” der; p burada belirsizliği bir dağılımla anlatılan bir niceliktir. Sıklıkçı <strong>%95 güven aralığı</strong> ise p'yi sabit ama bilinmeyen sayar; olasılık aralığı üreten <em>yönteme</em> aittir: deney çok kez yinelense, aralıkların yaklaşık %95'i gerçek p'yi yakalar. Buna <strong>kapsama</strong> denir. Wald aralığı f ± 1,96√(f(1 − f)/n) kısa yoldur; Wilson aralığı ise |f − p| ≤ z√(p(1 − p)/n) eşitsizliğini p için çözer ve küçük n'de ve uçlarda çok daha iyi davranır. Sayfanın kapsama tablosu iki çerçeveyi aynı terazide tartar: n = 30, sabit p = 0,70'te kesin kapsama Bayes (Beta(1, 1)) ve Wilson için %92,98, Wald için %95,29; binom kesikli olduğu için hiçbiri tam %95 değildir. p her deneyde önselden çekilince (Beta(1, 1), n = 30) Bayes aralığı tam %95,00 kapsar, Wald %87,49'a düşer. Ama güçlü ve yanlış bir önsel (Beta(50, 50), gerçek p = 0,70) sabit p'de Bayes kapsamasını %0,00'a indirir. İki çerçeve farklı sorulara cevap verir; hangisinin uygun olduğu, sorunun ne olduğuna bağlıdır.",
      formula: "Wilson: [f + z²/2n ± z√(f(1 − f)/n + z²/4n²)] / (1 + z²/n),  z = 1,96",
      formulaNote:
        "Bayes aralığının kalibrasyonu önselin doğru olmasına, sıklıkçı kapsama ise model ve örneklem büyüklüğüne dayanır. Wald aralığı f = 0 ya da 1 çıktığında tek noktaya çöker.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar dört sekmedir. <strong>01 · Tanı testi</strong>: Yaygınlık, Duyarlılık ve Özgüllük kaydırıcıları, “Art arda pozitif test sayısı” menüsü, Nüfus (1.000 / 10.000 / 100.000 kişi) ve Tohum; her kare bir kişi olan nüfus çizimi, doğal sıklık ağacı ve taban oranı eğrisi. <strong>02 · Koşullu olasılık ve bağımsızlık</strong>: düzenlenebilir 2×2 sayım tablosu ve mozaik çizim, Simpson paradoksu tablosu ve Monty Hall oyunu (Kapı sayısı n, Sunucu menüsü, 10.000 oyunluk benzetim). <strong>03 · Önselden sonsala (beta–binom)</strong>: önsel α ve β, gizli gerçek p, tohumlu atışlar, güçlü–zayıf önsel karşılaştırması ve kapsama deneyi. <strong>04 · Ardışık güncelleme</strong>: gizli torbayı bilye çekerek bulma ve savcı yanılgısı. Her deneyde formülün verdiği <em>kuram</em> değeri, tohumlu sayımın verdiği <em>ölçülen</em> değerin yanında durur; aradaki fark standart hatayla ve <strong>z</strong> ile verilir. z = fark / standart hata, farkın kaç “gürültü birimi” olduğunu söyler: |z| ≤ 2 sıradandır, ama 2'yi aşan bir z de hata demek değildir; kabaca her yirmi tohumdan biri böyle çıkar. Tohum aynıysa nüfus, atışlar ve çekişler de aynıdır; aşağıdaki sayıları bu yüzden birebir göreceksin. Bütün hastalık, test, Simpson ve eşleşme değerleri öğretim değeridir, gerçek bir istatistik değildir.",
    experiments: [
      {
        title: "%99 doğru bir test ve tohumun gürültüsü",
        predict:
          "Bir hastalık binde bir kişide var; test hastaların %99'unu yakalıyor, sağlamların %99'una negatif diyor. Pozitif çıkan biri ne olasılıkla hasta? İki bağımsız test de pozitifse? Ve tohumlu bir nüfusta sayılan değer formülden ne kadar uzağa düşebilir?",
        do: "01 sekmesinde “Nadir hastalık, %99 doğru test” hazırına bas; kartları ve durum satırını oku. “Art arda pozitif test sayısı”nı “2 bağımsız test, ikisi de pozitif” yap. Sonra “Varsayılan: %1, %95, %90” hazırına dön (2 test seçili kalsın) ve “Yeni nüfus (tohum + 1)” ile tohumu 2, 3, 4, 5 yap. En son tohumu 1'e geri yaz ve Nüfus'u “100.000 kişi” yap.",
        observe:
          "Doğruluk %99,00, ama kuram %9,02; ölçülen %10,43 (12/115), z = +0,5; beklenen yanlış pozitif 99,9, doğru pozitif 9,9. İki testte kuram %90,75, ölçülen %80,00 (12/15), z = −1,4: ölçüm 12 hastaya dayanır. Varsayılan testte iki pozitif için kuram %47,69, tohum 1'de ölçülen %56,04 (102/182), z = +2,3; durum satırı bunun şansla kabaca yirmi nüfustan birinde olduğunu yazar ve nüfusu büyütmeyi önerir. Ağaçta beklenen 100 hastanın yerinde 112 hasta vardır. Tohum 2–5: %45,93 (z = −0,5), %53,05 (+1,4), %46,96 (−0,2), %42,50 (−1,3). 100.000 kişide tohum 1: %48,06 (893/1.858), z = +0,3.",
        explain:
          "Oranlarla: önsel 1 : 999, LR⁺ = 0,99/0,01 = 99, sonsal 99 : 999 = %9,02; ikinci pozitif yine 99 ile çarpar: 9.801 : 999 = %90,75. z = +2,3 hata değil, nadir ama beklenen bir sapmadır. Doğru tepki uyan tohumu seçmek değil, örneklemi büyütmektir: pozitifler yaklaşık 10 katına (1.858) çıkınca standart hata 3,70'ten 1,16 puana, yaklaşık √10 kat düşer. Bu standart hata eksik değildir: kişiler bağımsız çekildiği için, pozitif sayısı bilindiğinde her pozitif ayrı ayrı PPV olasılıkla hastadır ve pozitiflerdeki hasta sayısı tam binom dağılır; nüfustaki hasta sayısının dalgalanması bunun içindedir.",
      },
      {
        title: "Monty Hall: sunucunun ne bildiği her şeyi değiştirir",
        predict:
          "Üç kapı, birinde araba. Bir kapı seçiyorsun; arabanın yerini bilen sunucu öteki kapılardan bir keçi açıyor. Kalmak mı iyi, değiştirmek mi, yoksa fark yok mu? On kapı olsa? Sunucu arabanın yerini bilmeden açsaydı ve şans eseri keçi çıksaydı?",
        do: "02 sekmesinde Monty Hall bölümüne in. Kapı düğmeleriyle birkaç oyun oyna, sonra benzetim kartlarını oku (Sunucu: “Arabanın yerini bilir; senin kapın ve biri dışında hepsini açar”, 10.000 oyun, tohum 1). Kapı sayısı n'i 10 yap. Sunucu'yu “Arabanın yerini bilir; yalnız bir keçi kapısı açar” yap. Son olarak n'i 3'e indir ve “Bilmez; senin kapın ve biri dışında rastgele açar” seç.",
        observe:
          "n = 3: kalma stratejisi %34,19 (3.419/10.000, kuram %33,33), değiştirme %66,80 (kuram %66,67). n = 10: kal %9,41, değiştir %90,12 (kuram %10,00 ve %90,00). n = 10, tek keçi: kal %9,61, değiştir %11,16 (kuram %11,25). Bilmeyen sunucu, n = 3: “Sayılan oyunlar” %67,17 (kuram 2/n = %66,67), kal %51,38 (3.451/6.717), değiştir %50,57 (3.374/6.672), kuram ikisi için de %50.",
        explain:
          "Kapı 1'i seçtin, sunucu Kapı 3'ü açtı ve keçi çıktı. Bilen sunucu için olabilirlikler: araba Kapı 1'deyse Kapı 3'ü 1/2 olasılıkla açar, Kapı 2'deyse kesin açar. Önseller eşit (1/3) olduğundan sonsal 1/3'e 2/3 olur. Bilmeyen sunucu için “Kapı 3 açıldı ve keçi çıktı” olayının olasılığı araba Kapı 1'de de Kapı 2'de de 1/2'dir: olabilirlik oranı 1, kanıt iki hipotezi ayırmaz, sonsal 1/2'ye 1/2 kalır. Tek keçi açan sunucuda kalan (n − 1)/n olasılık kapalı kalan n − 2 kapıya bölünür: 9/80 = %11,25. Kısacası cevap bulmacanın değil, sunucu hakkındaki varsayımın içindedir.",
      },
      {
        title: "Güçlü önsel, zayıf önsel ve kapsama",
        predict:
          "Gizli p = 0,70 olan bir paradan 20 atışta 15 tura geldi. Düzgün Beta(1, 1) önseliyle ve “bu para adil” diyen güçlü Beta(50, 50) önseliyle %95 inanılır aralık gerçek p'yi içerir mi? 100 atış daha gelince ne değişir? Peki yanlış bir güçlü önselle kurulan aralık, deney tekrarlandığında gerçek p'yi ne sıklıkla yakalar?",
        do: "03 sekmesini varsayılan durumda aç (20 tohumlu atış). Kartları ve kapsama tablosunu oku (n = 30, Sabit p). “Güçlü \"adil\" Beta(50, 50)” hazırına bas: veri korunur. Bir kez “100 atış”a bas. Sonra kapsama bölümünde “Gerçek p” menüsünü “Önselden çekilir” yap.",
        observe:
          "Beta(1, 1): veri 15 · 5 · 20, sonsal Beta(16; 6), ortalama 0,727, aralık [0,528; 0,887]. Kapsama: Bayes ve Wilson %93,0 / %92,98 kesin, Wald %95,1 / %95,29. Beta(50, 50): ortalama 0,542, aralık [0,452; 0,630], önselin ağırlığı %83,3; durum satırı “önsel veriden ağır basıyor” der, kapsamada Bayes satırı %0,0 / %0,00 olur. 100 atıştan sonra veri 83 · 37 · 120, ortalama 0,605, aralık [0,539; 0,668], ağırlık %45,5; güçlü ile zayıf önselin farkı 0,084'e (0,605 ve 0,689) iner. “Önselden çekilir”de (önsel hâlâ Beta(50, 50)) Bayes %95,2 / %95,00 kesin, Wald %93,6 / %93,50 olur.",
        explain:
          "Beta(50, 50) yüz sözde atış gibidir: 20 gerçek atış onu zor oynatır, 120 atış ağırlığını yarının altına çeker; veri büyüdükçe makul önseller aynı yere varır. Kapsamadaki %0,00 kesindir: n = 30'da en uç veri (30 tura) bile sonsalı Beta(80; 50) yapar, onun %97,5 niceliği 0,697'dir. p önselden çekilince aralık tam %95 kapsar: inanılır aralık önselin anlattığı dünyada kalibredir, sabit bir p için sıklıkçı güvence vermez. Wilson ise önsel kullanmaz ve iki durumda da %95 çevresinde kalır: sabit p'de %92,98, p Beta(50, 50)'den çekilince %95,06.",
      },
      {
        title: "Hangi torba? Kanıt birim birim birikir",
        predict:
          "Üç torba var: kırmızı bilye oranı %20, %50 ve %80; biri gizlice seçilmiş. Geri koyarak 10 bilye çektin: 3 kırmızı, 7 beyaz. Hangi torba, ne kadar eminsin? Doğru torbayı bulma şansı 10 çekişte kaçtır, 50 çekişte kaçtır?",
        do: "04 sekmesini varsayılan durumda aç (tohum 1), “10 bilye çek”e bas ve “Gizli torbayı göster”i işaretle. Oran seçicileri Torba 3 : Torba 2'de kalsın. “Deney: n çekişte doğru torba” kartlarını oku, sonra Çekiş sayısı n'i 50'ye getir. Aşağıdaki savcı bölümünde önce varsayılanı (N = 50.000, m = 1/10.000), sonra N = 1.000.000 ve m = 1/1.000.000 seçimini oku.",
        observe:
          "Çekişler 3 · 7; gizli torba Torba 1 (kırmızı %20). En olası torba Torba 1 · %63,05; bütün sonsallar T1 %63,1 · T2 %36,7 · T3 %0,2. log₁₀ O(Torba 3 : Torba 2) = 0,000 + 3 × +0,204 + 7 × −0,398 = −2,173 ve sonsaldan doğrudan hesap da −2,173 verir. Son bilye beyazdır ve Torba 1'in olasılığını %51,4'ten %63,1'e çıkarır. n = 10'da doğru torba payı ölçülen %80,52, kesin %80,48; kesin değer n = 0'da %33,33, n = 50'de %98,53 (n = 50'de ölçülen %98,44). Savcı örneği: beklenen masum eşleşme 5,0 kişi, P(suçlu | eşleşme) = %16,67; N = 1.000.000 ve m = 1/1.000.000'da %50,00.",
        explain:
          "Her bilye log orana sabit bir miktar ekler; log oran grafiği bu yüzden basamak basamak yürür. log₁₀ O(Torba 1 : Torba 2)'ye her beyaz log₁₀(0,8/0,5) = +0,204, her kırmızı log₁₀(0,2/0,5) = −0,398 ekler; 7 beyaz ve 3 kırmızı net +0,235, yani 10<sup>0,235</sup> ≈ 1,7 : 1 (63,1/36,7) verir. 10 çekişte yanılma payının %20'ye yakın olması bundandır. Savcı örneği aynı kuralın mahkemedeki hâlidir: 50.000 olası kişide beklenen 5 masum eşleşme vardır; başka kanıt yoksa ve herkes eşit şüpheliyse eşleşen birinin suçlu olma olasılığı 1/(1 + 5) ≈ %16,67'dir, %99,99 değil.",
      },
    ],
  },
  wow: [
    {
      title: "Enigma'yı kıran birim: deciban",
      body: "1940'ta Bletchley Park'ta Alan Turing, Alman deniz Enigma'sının o gün hangi rotorlarla çalıştığını daraltmak için geliştirdiği <em>Banburismus</em> yönteminde kanıtı ölçmek için bir birim tanımladı: <strong>ban</strong> ve onda biri <strong>deciban</strong>. 1941'de ekibe katılan asistanı I. J. Good, bu birimleri savaştan sonra ayrıntılı biçimde anlattı. Ad, yöntemde kullanılan ve Banbury kasabasında basılan dev kartlardan geliyordu. 10 deciban 10'a 1 oran demektir. Good'a göre 1 deciban (eşit şanstan yaklaşık 5'e 4'e kayış), bir insanın inancındaki değişimi ayırt edebileceği en ince adımdır. Decibanları toplamak, olabilirlik oranlarını çarpmanın logaritmik hâlidir: saf Bayes.",
    },
    {
      title: "Okyanusun dibinde bir olasılık haritası",
      body: "Mayıs 1968'de ABD'nin nükleer denizaltısı USS Scorpion kayboldu. Kıyı açıklarındaki arama sonuç vermeyince donanma uzmanı John Craven, matematikçi danışmanlarla birlikte denizi karelere böldü; deneyimli denizaltı komutanlarının kaza senaryolarına göre her kareye bir olasılık verdi ve aramayı en olası karelerden başlayarak planladı. Ekim 1968 sonunda enkaz, Azor Adaları'nın yaklaşık 740 km güneybatısında, 3.000 metreyi aşan derinlikte bulundu. Aynı yöntem, 2009'da Atlantik'e düşen Air France 447'nin kayıt cihazlarının bulunmasında da kilit rol oynadı.",
    },
    {
      title: "Güneş yarın doğacak mı?",
      body: "Price'ın ekinde de geçen bu soruyu Laplace kendi kuralıyla hesapladı. Bir olay n denemede n kez olduysa ve başta her olasılığı eşit derecede mümkün sayıyorsan, bir sonrakinin olma olasılığı (n+1)/(n+2)'dir; buna <strong>ardıllık kuralı</strong> denir. Kayıtlı tarihin 5.000 yıl, yani 1.826.213 gün geriye gittiğini varsayınca Güneş'in yarın doğması için 1.826.214'e 1'lik bir oran buldu (1814, <em>Olasılıklar Üzerine Felsefi Deneme</em>). Ama hemen ekledi: günleri ve mevsimleri düzenleyen yasayı kavrayan biri için bu sayı çok daha büyüktür. Yani önseli “hiçbir şey bilmiyorum” almak da bir varsayımdır.",
    },
  ],
  worked: {
    title: "20 atışta 15 tura: sonsal, güven aralığı ve anlamları",
    prompt:
      "Bir paradan 20 atışta h = 15 tura, t = 5 yazı geldi. (a) Önsel Beta(1, 1) ise sonsal dağılım, sonsal ortalama, tepe (MAP) ve standart sapma nedir? (b) Sıklıkçı Wald ve Wilson %95 güven aralıklarını hesapla. (c) Sayfanın verdiği %95 inanılır aralıkla karşılaştır ve iki tür aralığın ne söylediğini ayır. (Olasılıklar birimsizdir; p, tek atışta tura olasılığıdır.)",
    steps: [
      "Sonsal: Beta(α + h, β + t) = Beta(1 + 15; 1 + 5) = Beta(16; 6). Ortalama 16/22 = 0,727. Tepe (α' − 1)/(α' + β' − 2) = 15/20 = 0,750: düzgün önselde tepe, gözlenen oran f = h/n ile aynıdır. Standart sapma √[α'β'/((α' + β')²(α' + β' + 1))] = √[96/(484 × 23)] = √(96/11.132) = 0,093.",
      "Ağırlıklı ortalama denetimi: önselin ağırlığı w = 2/22 = 0,091. Ortalama = 0,091 × 0,500 + 0,909 × 0,750 = 0,727. Önsel, sonsalı f = 0,750'den 0,500'e doğru biraz çekmiştir.",
      "Wald: f = 0,750, standart hata √(0,750 × 0,250/20) = √0,009375 = 0,0968. Yarı genişlik 1,96 × 0,0968 = 0,190, aralık [0,560; 0,940]. f'nin çevresinde simetriktir.",
      "Wilson: z² = 3,8415, z²/n = 0,1921. Merkez (0,750 + 0,0960)/1,1921 = 0,7097. Yarı genişlik 1,96 × √(0,009375 + 0,002401)/1,1921 = 1,96 × 0,1085/1,1921 = 0,1784. Aralık [0,531; 0,888]: merkez 0,5'e doğru kaymış, üst ucu 0,94'ten 0,89'a inmiştir.",
      "Sayfada doğrula: 03 sekmesi varsayılan durumda bu veriyi zaten üretir. Kartlar “sonsal Beta(16; 6)”, ortalama 0,727, %95 inanılır aralık [0,528; 0,887] (eksik beta fonksiyonunun tersinden; elle değil sayısal çözülür), 100.000 örnekli bağımsız denetim [0,529; 0,887], MAP 0,750, standart sapma 0,093, Wilson [0,531; 0,888], Wald [0,560; 0,940] yazar.",
    ],
    result:
      "Sonsal Beta(16; 6), ortalama 0,727, MAP 0,750, sd 0,093. Wilson [0,531; 0,888] ile inanılır aralık [0,528; 0,887] neredeyse aynı yerdedir, Wald [0,560; 0,940] ise fazla yukarı taşar. Sayılar yakın olsa da cümleler farklıdır: inanılır aralık “bu önselle p %95 olasılıkla 0,528 ile 0,887 arasında” der; güven aralığı “bu yöntem, deney tekrarlansa aralıkların %95'inde gerçek p'yi yakalar” der ve tek bir aralık için olasılık iddia etmez.",
  },
  misconceptions: [
    {
      myth: "Test %95 duyarlıysa, pozitif çıkan birinin hasta olma olasılığı da %95'tir.",
      truth:
        "%95, hastalar arasında pozitif çıkma oranıdır: P(pozitif | hasta). Merak edilen ise pozitifler arasında hastaların oranıdır: P(hasta | pozitif). İkisini karıştırmaya <strong>taban oranı yanılgısı</strong> denir; hastalığın ne kadar nadir olduğu unutulur. Sayfanın varsayılan ayarında duyarlılık %95 iken sonuç %8,76'dır; “Nadir hastalık, %99 doğru test” hazırında doğruluk %99,00 iken %9,02. Aynı test, belirtileri olan ve önseli %30 olan birinde %80,28 demektir. Bu yüzden tarama testlerinde pozitif sonuç çoğu zaman tanı değil, ikinci ve farklı bir testin gerekçesidir.",
    },
    {
      myth: "Masum birinin bu kanıtı üretme olasılığı milyonda birse, sanığın masum olma olasılığı da milyonda birdir.",
      truth:
        "Bu, <strong>savcı yanılgısı</strong>dır: P(kanıt | masum) ile P(masum | kanıt) aynı sanılır. 1999'da İngiltere'de Sally Clark iki bebeğini öldürmekten mahkûm edildi; mahkemede iki ani bebek ölümünün “73 milyonda bir” olduğu söylendi. Royal Statistical Society 2001'de sayının dayanağı olmadığını açıkladı: tek ölüm olasılığı (8.543'te bir) karesi alınarak bulunmuştu, oysa aynı ailedeki iki ölüm bağımsız sayılamaz. Asıl soru, çifte ani ölümün çifte cinayetten kaç kat olası olduğuydu; çifte cinayet daha da nadirdir. Mahkûmiyet Ocak 2003'te, patoloğun açıklamadığı enfeksiyon bulguları ortaya çıkınca bozuldu.",
    },
    {
      myth: "Bir tedavi her hasta grubunda daha başarılıysa, bütün hastalar birlikte sayıldığında da daha başarılıdır.",
      truth:
        "Değil; buna <strong>Simpson paradoksu</strong> denir. 02 sekmesindeki öğretim tablosunda X tedavisi hafif vakalarda %90,00'a karşı %85,00, ağır vakalarda %60,00'a karşı %50,00 ile öndedir; ama toplamda X %66,00 (165/250), Y %78,00 (195/250) olur. Sebep ağırlıklardır: X'in hastalarının %80'i ağır gruptadır, Y'ninkilerin yalnız %20'si. Toplam oran, grup oranlarının bu paylarla ağırlıklı ortalamasıdır. Hangi karşılaştırmanın doğru olduğunu nedensel soru belirler: vakanın ağırlığı tedaviden önce belirleniyorsa grup içi karşılaştırma doğrudur. “Eşit dağılım” hazırında hasta karışımı aynıdır ve ters dönüş kaybolur.",
    },
    {
      myth: "%95 güven aralığı, gerçek değerin %95 olasılıkla bu aralıkta olduğunu söyler; Bayesçi aralıkla aynı şeydir.",
      truth:
        "Sıklıkçı çerçevede gerçek p sabittir; ya aralığın içindedir ya değildir. %95, aralığı üreten yöntemin uzun vadeli başarısıdır (kapsama). “p %95 olasılıkla bu aralıkta” cümlesini kurabilmek için p'ye bir olasılık dağılımı vermek, yani bir önsel seçmek gerekir; bu, Bayesçi <strong>inanılır aralığın</strong> cümlesidir. İki aralık sayıca yakın çıkabilir (03 sekmesinde Wilson [0,531; 0,888], inanılır [0,528; 0,887]) ama farklı varsayımlarla farklı sorulara cevap verir. Güçlü ve yanlış bir önselle inanılır aralığın sıklıkçı kapsaması %0'a kadar düşebilir; önsel gerçeği doğru anlatıyorsa da tam %95'tir.",
    },
  ],
  glossary: [
    {
      term: "Koşullu olasılık P(A | B)",
      definition:
        "B'nin gerçekleştiği bilindiğinde A'nın olasılığı; B'li durumların içinde A'nın payı, P(A ∩ B)/P(B).",
    },
    {
      term: "Önsel ve sonsal",
      definition:
        "Önsel, kanıt görülmeden önce bir hipoteze verilen olasılıktır; sonsal, Bayes kuralıyla kanıt hesaba katıldıktan sonraki olasılıktır.",
    },
    {
      term: "Olabilirlik oranı",
      definition:
        "P(E | H)/P(E | ¬H); kanıtın hipotez doğruyken yanlış olduğuna göre kaç kat sık görüldüğü ve önsel oranı çarptığı sayı.",
    },
    {
      term: "Taban oranı",
      definition:
        "Bir durumun incelenen gruptaki genel sıklığı; tanı testinde hastalığın yaygınlığı, yani önsel.",
    },
    {
      term: "Eşlenik önsel",
      definition:
        "Olabilirlikle çarpıldığında sonsalı yine kendi ailesinden veren önsel; binom veride Beta(α, β) önseli Beta(α + h, β + t) sonsalını verir.",
    },
    {
      term: "İnanılır aralık",
      definition:
        "Sonsal dağılımın belirli bir olasılığını, örneğin ortadaki %95'ini, içeren aralık; seçilen önsele göre p'nin olasılıkla nerede olduğunu söyler.",
    },
    {
      term: "Güven aralığı ve kapsama",
      definition:
        "Veriden aralık üreten sıklıkçı bir yöntem; kapsaması, deney çok kez yinelendiğinde aralıkların sabit gerçek değeri içerme oranıdır.",
    },
    {
      term: "z değeri",
      definition:
        "Ölçülen ile kuram arasındaki farkın standart hataya bölümü; farkın kaç “gürültü birimi” olduğunu söyler ve |z| > 2 kabaca yirmi denemeden birinde şansla da görülür.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede Bayes, tek bir evet/hayır sorusu için bir formüldür. Üniversitede <em>Olasılık Kuramı</em> ve <em>Matematiksel İstatistik</em> derslerinde bilinmeyen bir sayının tamamı için bir <strong>olasılık dağılımına</strong> dönüşür: laboratuvarın 03 sekmesindeki beta–binom modeli bunun en küçük örneğidir. Bayes'in kendi masa problemi de tam olarak buydu. Gerçek problemlerde önsel ile olabilirliğin çarpımının integrali çoğu zaman elle alınamaz; bilgisayarlar <em>Markov zinciri Monte Carlo</em> gibi rastgele örnekleme yöntemleriyle sonsalı adım adım keşfeder (sayfanın 100.000 örnekli bağımsız denetimi bu fikrin bir tadımlığıdır). Aynı derslerde sıklıkçı araçlar da öğrenilir: güven aralıkları, hipotez testleri ve 02 sekmesindeki ki-kare bağımsızlık testi. Hangi sorunun hangi çerçeveyle sorulacağı istatistikte hâlâ canlı bir tartışmadır; iyi bir istatistikçi ikisini de konuşur.",
      "Mühendislik ve bilgisayar biliminde Bayes her yerdedir. Otonom araçların ve uyduların konum tahmini, her yeni ölçümle bir önceki tahmini güncelleyen <strong>Kalman filtresi</strong> gibi yöntemlere dayanır; bu, çan eğrileri için yazılmış ardışık Bayes güncellemesidir. İlk istatistiksel spam filtreleri, kelimelerin olabilirlik oranlarını çarpan “naif Bayes” sınıflandırıcılarıydı. Judea Pearl'ün <strong>Bayes ağları</strong>, birçok değişkenin birbirini nasıl etkilediğini modelleyerek tıbbi tanı sistemlerinin ve nedensellik araştırmalarının temelini attı; Simpson paradoksunda hangi oranın doğru olduğunu söyleyen de bu nedensel dildir. Turing'in desibanları ise bilgi kuramına uzanır: kanıtı logaritmayla ölçmek, bilgiyi bit ile ölçmenin akrabasıdır.",
    ],
    topics: [
      "Koşullu bağımsızlık",
      "Beta–binom ve eşlenik önseller",
      "Güven ve inanılır aralıklar",
      "Ki-kare bağımsızlık testi",
      "Markov zinciri Monte Carlo",
      "Kalman filtresi",
      "Bayes ağları ve nedensellik",
      "Bilgi kuramı ve log-oranlar",
    ],
  },
  quiz: [
    {
      question:
        "Bir hastalık binde bir kişide var; testin duyarlılığı ve özgüllüğü %99. Tek pozitif testten sonra hasta olma olasılığı %9,02. Hastalık durumu bilindiğinde birinciden bağımsız ikinci bir test de pozitif çıkarsa olasılık yaklaşık kaç olur?",
      options: ["Yaklaşık %18", "Yaklaşık %50", "Yaklaşık %91", "Yaklaşık %99,99"],
      answer: 2,
      explanation:
        "Oranlarla düşün: önsel oran 1 : 999, her pozitif test oranı LR⁺ = 0,99/0,01 = 99 ile çarpar. Bir testten sonra 99 : 999 (%9,02), iki testten sonra 9.801 : 999, yani 9.801/10.800 = %90,75. Olasılık ikiye katlanmaz; oran 99 katına çıkar. 01 sekmesinde “Nadir hastalık, %99 doğru test” hazırını seçip “2 bağımsız test, ikisi de pozitif” yaparsan kuram kartı %90,75 yazar. Testler bağımsız değilse (aynı örnek, aynı makine) ikinci pozitif bu kadar bilgi taşımaz.",
    },
    {
      question:
        "Üç kapılı Monty Hall oyununda sunucu arabanın yerini <em>bilmiyor</em>. Senin kapın dışındaki iki kapıdan birini rastgele açıyor ve şans eseri keçi çıkıyor. Kalan kapalı kapıya geçersen kazanma olasılığın kaçtır?",
      options: ["1/3", "1/2", "2/3", "Hangi kapının açıldığına bağlıdır"],
      answer: 1,
      explanation:
        "Kapı 1'i seçtin, Kapı 3 açıldı. “Kapı 3 açıldı ve keçi çıktı” olayının olasılığı araba Kapı 1'deyken de Kapı 2'deyken de 1/2'dir. Olabilirlik oranı 1 olduğu için önseldeki eşitlik bozulmaz: sonsal 1/2'ye 1/2. Bilen sunucuda ise araba Kapı 2'deyken Kapı 3'ü kesin, Kapı 1'deyken 1/2 olasılıkla açar; oran 2 : 1 olur ve değiştirmek 2/3 kazanır. 02 sekmesinin benzetiminde bilmeyen sunucuyla kal %51,38, değiştir %50,57 çıkar.",
    },
    {
      question:
        "03 sekmesinde önseli Beta(50, 50), gerçek p'yi 0,70 ve kapsama deneyinde n = 30 yaptığında Bayes aralığının kesin kapsaması %0,00 çıkıyor; Wilson aralığınınki ise %92,98. En iyi açıklama hangisi?",
      options: [
        "2.000 deney, kapsamayı ölçmek için çok az",
        "Bayes aralıkları her zaman %95'in altında kapsar",
        "En uç veride, 30 atışta 30 turada bile sonsal Beta(80; 50) olur ve %97,5 niceliği 0,697'dir: hiçbir veri aralığı 0,70'e uzatamaz",
        "Wilson aralığı bu durumda yanlış hesaplanmıştır",
      ],
      answer: 2,
      explanation:
        "Güçlü önsel 100 sözde atış taşır; 30 gerçek atış sonsalı 0,5'ten en fazla Beta(80; 50)'nin ortalamasına, 0,615'e taşıyabilir ve aralığın üst ucu 0,697'de kalır. “Kesin (toplam)” sütunu benzetim kullanmaz; sıfır, deney sayısından değil bu sınırdan gelir. Aynı önselle p her deneyde Beta(50, 50)'den çekilirse Bayes kapsaması tam %95,00 olur: inanılır aralık, önselin anlattığı dünyada kalibredir. Wilson önsel kullanmaz ve sabit p için yaklaşık %95 kapsar; iki çerçeve farklı güvenceler verir.",
    },
  ],
  next: [
    {
      href: "normal-dagilim.html",
      title: "Normal Dağılım ve Merkezi Limit Teoremi",
      why: "Wald aralığının ve z değerinin arkasındaki çan eğrisi: Galton tahtası, ortalamaların çana döndüğünü gösteren merkezi limit teoremi ve “Alanlar ve güven aralıkları” sekmesinde örneklem büyüklüğüyle daralan aralık.",
    },
    {
      href: "genetik-caprazlama.html",
      title: "Genetik Çaprazlama: Mendel Oranları, Ki-Kare ve Bağlı Genler",
      why: "02 sekmesindeki ki-kare testi orada tohumlu yavru sayımlarına uygulanıyor. Punnett karesi olasılığı ileri yönde verir; tersini sen sor: Aa × Aa çaprazlamasında baskın görünen bir yavrunun taşıyıcı olma olasılığı neden 2/3'tür?",
    },
    {
      href: "makine-ogrenmesi-derin-ogrenme-llm.html",
      title: "Makine Öğrenmesi: Gradyan İnişi, Sinir Ağları ve Dil Modelleri",
      why: "Softmax bir modelin çıktısını olasılık dağılımına çevirir, çapraz entropi ise doğru cevaba verilen olasılığın logaritmasıyla öğrenir: log oranların ve olabilirliğin makine öğrenmesindeki karşılığı.",
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
