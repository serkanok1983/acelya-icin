window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["kimya-muhendisligi"] = {
  slug: "kimya-muhendisligi",
  title: "Kimya Mühendisliği: Hacim, Kademe, Yüzey",
  field: "Mühendislik",
  level: "Lisans",
  minutes: 40,
  tagline:
    "Bir tepkime için kaç litre, bir ayırma için kaç kademe, bir ısıtma için kaç metrekare? Üç sorunun cevabı da aynı yerden çıkar: bir korunum dengesi ve yol boyunca harcanan itici güç.",
  hook:
    "Aynı 100 litre, aynı sıcaklık, aynı tepkime. Sıvıyı karıştırılan bir tanktan geçirirsen reaktanın % 66.7'si dönüşüyor; aynı 100 litreyi uzun bir boru hâline getirirsen % 86.5'i. Kimya hiç değişmediyse aradaki yirmi puanı kim kazandırdı?",
  bigIdea:
    "Kimya mühendisliği bir <strong>korunum dengesini</strong> (madde ya da enerji) bir hız veya denge yasasıyla birleştirip “ne kadar büyük?” sorusunu yanıtlar; cevabı belirleyen, <em>itici gücün</em> (derişim, dengeden uzaklık, sıcaklık farkı) cihaz boyunca nasıl harcandığıdır.",
  story: [
    "George E. Davis'in (1850–1907) işi fabrika gezmekti. İngiltere'de soda fabrikalarının hidroklorik asit salımını sınırlayan 1863 tarihli Alkali Yasası'nın müfettişlerinden biriydi ve işi gereği birbirinden çok farklı ürünler yapan tesislerin içini görüyordu. Gördüğü şey şuydu: sabun da yapsalar, boya da, asit de, hepsi aynı birkaç işi tekrarlıyordu; ısıtıyor, karıştırıyor, buharlaştırıyor, süzüyor, damıtıyorlardı. 1887'de (kimi kaynak 1888 der) Manchester Teknik Okulu'nda bu ortak işler üzerine on iki derslik bir dizi verdi; düşüncelerini sonra <em>A Handbook of Chemical Engineering</em> adlı kitapta topladı (ilk baskı 1901 olarak anılır; iki ciltlik ikinci baskı 1904'te çıktı). Davis'in “kimya mühendisi” sözünü icat ettiği sık yazılır; bu kısmı efsaneye yakındır, çünkü terim daha 1839'da, Davis doğmadan on bir yıl önce basılı bir metinde geçer. Kanıtı olan kısım başka: 1881'de kurulmasına önayak olduğu derneğe “Kimya Mühendisliği Derneği” adını vermek istedi, kabul ettiremedi; dernek Society of Chemical Industry adıyla kuruldu ve Davis ilk sekreteri oldu.",
    "Davis'in sezgisine adını Atlantik'in öbür yakasında Arthur D. Little (1863–1935) koydu. MIT'nin kimya ve kimya mühendisliği bölümünü denetleyen ziyaretçi kurulunun başkanıydı ve 1910'ların ortasında (kaynaklar 1915 ile 1916 arasında ayrışır) her kimyasal sürecin, ne kadar karmaşık görünürse görünsün, sınırlı sayıda ortak adımın art arda dizilmesi olduğunu yazdı; bu adımlara <strong>temel işlemler</strong> (unit operations) dedi. Fikir bir müfredata dönüştü: 1923'te Walker, Lewis ve McAdams'ın <em>Principles of Chemical Engineering</em> kitabı çıktı; 1925'te MIT'de çalışan Warren L. McCabe ile Ernest W. Thiele, bir damıtma kolonunun kaç kademe istediğini kâğıt üstünde basamak çizerek bulan yöntemi yedi sayfalık bir makalede yayımladı (“Graphical Design of Fractionating Columns”, <em>Industrial and Engineering Chemistry</em>). 1932'de Merrell Fenske aynı dergide, kolonun inebileceği en az kademe sayısını tek satırlık bir logaritmayla verdi. Sayfanın ikinci sekmesi bu iki makalenin canlı hâlidir.",
    "Mesleğin simge hikâyesi ise bir büyütme hikâyesidir. 1909 yazında Fritz Haber ile Robert Le Rossignol'un masaüstü düzeneği amonyağı damla damla, saatte yaklaşık 125 mL hızla üretiyordu. BASF süreci satın aldı ve büyütme işini Carl Bosch'a verdi; Oppau'daki ilk tesis 1913'te açıldı, 1914'te günde 20 tona ulaştı. Arada tepkime değişmedi: azot ile hidrojen yine yüksek basınçta, bir katalizörün üzerinde birleşiyordu (ilk düzeneklerdeki nadir osmiyumun yerini, BASF'tan Alwin Mittasch'ın bulduğu ucuz demir katalizör aldı). Değişen her şey bu sayfanın sorularıydı: tepkime için ne kadar hacim, ürünü ayırmak için nasıl bir düzen, gazı ısıtıp soğutmak için ne kadar yüzey?",
    "Temel işlemler ayırma ve ısı aktarımını iyi anlatıyordu ama reaktörün içinde olup biteni anlatmaya yetmedi; yirminci yüzyılın ortasında tepkime hızını akışla birleştiren ayrı bir dal, <strong>kimyasal reaksiyon mühendisliği</strong> doğdu. Bu dalı kuşaklara öğreten ders kitabının yazarı Octave Levenspiel'dir (1926'da Şanghay'da doğdu, 2017'de öldü; meslek hayatının çoğunu Oregon Eyalet Üniversitesi'nde geçirdi). Birinci sekmedeki, reaktör hacmini bir alan olarak gösteren grafik onun adını taşır.",
  ],
  core: [
    {
      heading: "Mol dengesi: karışan tankın tek denklemi",
      body:
        "Kararlı hâlde çalışan bir kabın içinde madde birikmez: A'dan giren miktar, çıkanla tepkimede tükenenin toplamıdır. Mol debileriyle yazınca F<sub>A0</sub> − F<sub>A</sub> − (−r<sub>A</sub>)·V = 0 olur; burada −r<sub>A</sub>, A'nın birim hacimde birim zamanda tükenen mol sayısıdır. Girenin ne kadarının tükendiğine <strong>dönüşüm</strong> denir: X = (F<sub>A0</sub> − F<sub>A</sub>)/F<sub>A0</sub>. Tam karışmalı tankta (CSTR, sürekli karıştırmalı tank reaktör) her nokta çıkışla aynı derişimdedir; hız bütün hacimde tek bir sayıdır ve denge cebirsel kalır: V = F<sub>A0</sub>·X/(−r<sub>A</sub>). Hız yasası −r<sub>A</sub> = k·C<sub>A</sub>ⁿ ve sabit yoğunlukta C<sub>A</sub> = C<sub>A0</sub>(1 − X) yerine konup V/v₀ = τ (alıkonma süresi) yazılırsa geriye boyutsuz tek bir grup kalır: <strong>Damköhler sayısı</strong>. Da, sıvının tankta geçirdiği sürenin tepkimenin kendi zaman ölçeğine oranıdır. Sayfanın varsayılanında τ = 10.00 dk ve k = 0.20 dk⁻¹ olduğundan Da = 2.000; birinci mertebede X = 2/3 çıkar.",
      formula: "F<sub>A0</sub>·X = (−r<sub>A</sub>)·V  →  Da·(1 − X)ⁿ = X<br>Da = k·C<sub>A0</sub><sup>n−1</sup>·τ,  τ = V/v₀",
      formulaNote: "n = 1 için X = Da/(1 + Da). Da ne kadar büyürse büyüsün tank X = 1'e yalnız yaklaşır.",
    },
    {
      heading: "Boruda denge bir integrale dönüşür",
      body:
        "Borusal reaktörde (PFR, piston akışlı reaktör) derişim yol boyunca düşer; tek bir hızdan söz edilemez. Aynı dengeyi bu kez dV kalınlığında bir dilime yazarız: dilime giren ile çıkan arasındaki fark o dilimde tükenendir, F<sub>A0</sub>·dX = (−r<sub>A</sub>)·dV. Toplam hacim bu dilimlerin integralidir. <strong>Levenspiel grafiği</strong> F<sub>A0</sub>/(−r<sub>A</sub>) değerini X'e karşı çizer: PFR hacmi eğrinin altındaki alan, CSTR hacmi ise genişliği X, yüksekliği eğrinin <em>çıkıştaki</em> değeri olan dikdörtgendir. Mertebe pozitifse derişim azaldıkça hız düşer, eğri sürekli yükselir ve dikdörtgen alanı her zaman kapsar. Sezgisi şudur: tank, taze beslemeyi girer girmez çıkış derişimine seyreltir ve bütün hacmini en yavaş hızda çalıştırır; boru ise yüksek derişimi baştan sona sırayla harcar. Tankı N eşit parçaya bölmek dikdörtgeni N basamağa çevirir; her basamağın yüksekliği kendi çıkışındaki eğri değeridir. Bu, integralin Riemann toplamından başka bir şey değildir: N büyüdükçe basamaklar eğriye yapışır. Sıralama bir doğa yasası değil, eğrinin biçiminin sonucudur: hızın dönüşümle arttığı (örneğin otokatalitik) tepkimelerde eğri iner ve tank öne geçebilir. Sayfa yalnız pozitif mertebeleri içerir.",
      formula: "V<sub>PFR</sub> = F<sub>A0</sub> ∫<sub>0</sub><sup>X</sup> dX/(−r<sub>A</sub>)<br>n = 1, N tank: X = 1 − (1 + Da/N)<sup>−N</sup>  →  1 − e<sup>−Da</sup>",
      formulaNote: "N → ∞ limiti e sayısının tanımıdır: sonsuz küçük tanklardan oluşan seri bir borudur. Da = 2 için 1 − e⁻² = 0.86466.",
    },
    {
      heading: "İşletme doğrusu: kolonun kütle dengesi",
      body:
        "Damıtma, buharın sıvıdan daha uçucu bileşence zengin olmasına dayanır. Bunun ölçüsü <strong>bağıl uçuculuktur</strong>: α sabitse dengedeki buhar ile sıvının bileşimi tek bir eğriyle bağlanır. Kolonda buhar yukarı, sıvı aşağı akar; tepede yoğuşan buharın bir kısmı ürün (D) olarak çekilir, kalanı (L) kolona geri verilir. R = L/D oranına <strong>riflü oranı</strong> denir. Kolonun tepesini, içinden bir kesit geçecek biçimde hayalî bir zarfla sar: zarfa alttan giren buhar V·y, zarftan çıkanlar aşağı inen sıvı L·x ile ürün D·x<sub>D</sub>'dir ve V = L + D'dir. Bu iki satır, her kesitte yan yana geçen buhar ile sıvının bileşimini bağlayan bir doğru verir: zenginleştirme işletme doğrusu. Doğrunun doğru olması bir varsayıma bağlıdır: L ve V bölüm boyunca sabit kalmalıdır (sabit molar akış). McCabe–Thiele diyagramında her basamağın yatay parçası dengedir (kademeden çıkan buharla dengedeki sıvı), düşey parçası kütle dengesi (bir alt kademeden gelen buhar). Basamağın boyu, işletme doğrusu ile denge eğrisi arasındaki açıklık kadardır; açıklık burada ayırmanın itici gücüdür.",
      formula: "Denge: y = αx / [1 + (α − 1)x]<br>Zenginleştirme: y = [R/(R + 1)]·x + x<sub>D</sub>/(R + 1)",
      formulaNote: "Doğru (x_D, x_D) noktasından geçer; eğimi R/(R + 1) her zaman 1'den küçüktür ve R → ∞ iken köşegene yatar.",
    },
    {
      heading: "İki sınır: pinç ve Fenske",
      body:
        "Riflü azaldıkça zenginleştirme doğrusunun eğimi küçülür ve doğru denge eğrisine sokulur. Besleme (q) doğrusunun denge eğrisini kestiği (x*, y*) noktasında ikisi buluştuğu an açıklık sıfıra iner: <strong>pinç</strong>. Orada basamak boyu da sıfırdır; kolon uzasa da bileşim ilerlemez. Doğrunun eğimini bu iki noktadan yazıp R/(R + 1)'e eşitlemek en küçük riflüyü verir. Öbür uçta, <strong>toplam riflüde</strong> ürün çekilmez ve işletme doğrusu köşegendir. Dengeyi oran biçiminde yazmak işi çözer: y/(1 − y) = α·x/(1 − x). Her kademe x/(1 − x) oranını tam α katına, N kademe α<sup>N</sup> katına çıkarır. Varsayılan kolonda oran tepede 0.95/0.05 = 19, dipte 1/19 olmalıdır: 361 kat, yani ln 361 / ln 2.5 = 6.43 kademe. Sayfa aynı durumda basamakları tek tek sayıp “7 basamak (kesirli 6.43)” yazar: altıncı kademeden sonra sıvıda x = 0.0722, yedinciden sonra 0.0302 kalır; hedef 0.05 aradadır, yani yedinci basamağın yalnız bir kısmı gerekir. Sayfa bu payı ln[x/(1 − x)] ölçeğinde oranlar. Toplam riflüde her kademe bu niceliği tam ln α kadar düşürdüğünden sayım, Fenske'nin logaritmasıyla son basamağına kadar örtüşür. Sonlu riflüde aynı ölçek yalnız bir ara değer uzlaşımıdır. Anlam taşıyan tam sayıdır: altı yetmez, yedi yeter.",
      formula: "R<sub>min</sub> = (x<sub>D</sub> − y*) / (y* − x*)<br>N<sub>min</sub> = ln{[x<sub>D</sub>/(1 − x<sub>D</sub>)]·[(1 − x<sub>B</sub>)/x<sub>B</sub>]} / ln α",
      formulaNote: "N_min kazanı da sayar. Gerçek kolon bu iki ucun arasında seçilir: R_min'de kademe sonsuz, toplam riflüde ürün sıfırdır.",
    },
    {
      heading: "Sıcaklık farkı üstel söner: ΔT_lm ve ε–NTU",
      body:
        "Yüzeyin dA büyüklüğündeki bir parçasından geçen ısı dQ = U·(T<sub>s</sub> − T<sub>c</sub>)·dA'dır; bu ısı sıcak akışkanı C<sub>s</sub>·dT<sub>s</sub> = −dQ kadar soğutur, soğuk akışkanı ısıtır. İki dengeyi birbirinden çıkarınca yerel fark ΔT = T<sub>s</sub> − T<sub>c</sub> için tek denklem kalır: d(ΔT) = −m·U·ΔT·dA. Paralel akımda m = 1/C<sub>s</sub> + 1/C<sub>c</sub>, karşı akımda m = 1/C<sub>s</sub> − 1/C<sub>c</sub>'dir. Çözüm üsteldir: ΔT₂ = ΔT₁·e<sup>−m·U·A</sup>. Aynı denklem d(ΔT) = −m·dQ biçiminde toplanırsa Q = (ΔT₁ − ΔT₂)/m çıkar; m'yi üstelden çekip yerine koymak <strong>logaritmik ortalama sıcaklık farkını</strong> verir. Ortalamanın aritmetik değil logaritmik olması, farkın doğrusal değil üstel değişmesindendir. Karşı akımın üstünlüğü m'de yazılıdır. Paralel akımda m büyüktür: fark girişte bolca harcanır, çıkışta tükenir ve iki akışkan ortak bir sıcaklığa yaklaşır; yüzey sonsuz olsa bile ε, 1/(1 + C<sub>r</sub>) değerini aşamaz. Karşı akımda m küçüktür, fark boru boyunca dengeli dağılır ve C<sub>r</sub> &lt; 1 iken ε → 1 mümkündür. C<sub>r</sub> = 1 iken m = 0 olur: fark hiç değişmez, logaritmik ortalama 0/0'a düşer, limiti ortak farkın kendisidir. O zaman Q = U·A·ΔT ile ΔT = (T<sub>s,g</sub> − T<sub>c,g</sub>) − Q/C birlikte ε = NTU/(1 + NTU) verir. <strong>Etkenlik</strong> ε, aktarılan ısının üst sınıra oranıdır; ε–NTU yöntemi çıkış sıcaklıklarını bilmeden sonuca varır.",
      formula: "Q = U·A·ΔT<sub>lm</sub>,  ΔT<sub>lm</sub> = (ΔT₁ − ΔT₂) / ln(ΔT₁/ΔT₂)<br>ε = Q / [C<sub>min</sub>·(T<sub>s,g</sub> − T<sub>c,g</sub>)],  NTU = U·A/C<sub>min</sub>,  C<sub>r</sub> = C<sub>min</sub>/C<sub>maks</sub>",
      formulaNote: "ΔT₁ ve ΔT₂ değiştiricinin iki ucundaki farklardır. Türetme sabit U, sabit özgül ısı ve faz değişimi olmamasını varsayar; biri bozulursa formül de bozulur.",
    },
  ],
  lab: {
    intro:
      "Üç sekme de kararlı hâl hesabıdır: hiçbir şey zamanla akmaz, bir kaydırıcıya dokunduğun anda bütün sayılar yeniden hesaplanır. Her sekmede aynı sonuç iki bağımsız yoldan bulunur: kapalı formül (kuram) ve tasarım denkleminin sayısal çözümü (sayfanın “ölçülen” dediği). <strong>Fark</strong> sütununda “&lt; % 0.0001” görmek modelin doğru çözüldüğünü gösterir; modelin gerçek bir tesisi ne kadar anlattığını göstermez. Hazır düğmeler öteki bütün ayarları varsayılana döndürür; <kbd>R</kbd> tuşu açık sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Aynı 100 litre, üç ayrı dönüşüm",
        predict:
          "100 litrelik tek bir tank yerine aynı toplam hacmi 3 tanka, sonra 20 tanka bölersen dönüşüm boruya ne kadar yaklaşır? Hedef % 90'dan % 99'a çıkınca tank hacmi kaç katına çıkar, boru hacmi kaç katına?",
        do:
          "<strong>01 · Reaktörler</strong> sekmesinde <strong>Reaktörü sıfırla</strong>'ya bas ve ilk tablonun “X · kapalı form” sütununu oku. <strong>20 tanklı seri</strong> düğmesine bas. Sonra <strong>Hedef X = 0.99</strong> düğmesine basıp ikinci tabloya ve Levenspiel grafiğine bak. Son olarak <strong>İkinci mertebe</strong> düğmesini dene.",
        observe:
          "Varsayılanda Da = 2.000: tek CSTR 0.66667, 3 CSTR seri 0.78400, PFR 0.86466; durum satırı üç tankın farkın % 59.3'ünü kapattığını yazar. 20 tankta seri 0.85136'ya çıkar (% 93.3). X = 0.90 hedefi için hacimler 450.0, 173.2 ve 115.1 L, oran 3.909. Hedef 0.99 olunca CSTR 4950.0 L, PFR 230.3 L ister: oran 21.498. İkinci mertebede aynı Da ile dönüşümler 0.50000, 0.59677, 0.66667; % 90 için CSTR 4500.0 L, PFR 450.0 L, oran 10.000.",
        explain:
          "Birinci mertebede CSTR için Da = X/(1 − X), PFR için Da = −ln(1 − X) gerekir; oran X = 0.90'da 9/ln 10 = 3.909, X = 0.99'da 99/ln 100 = 21.498 eder. Boruya her yeni “dokuz” aynı 115.1 L'ye mal olur (ln 100 = 2·ln 10); tankta ise hacim 11 katına çıkar, çünkü bütün tank artık yüz kat seyrelmiş çıkış derişiminde çalışmaktadır. İkinci mertebede hız derişimin karesiyle düştüğünden ceza daha ağırdır: oran 1/(1 − X) = 10.",
      },
      {
        title: "Biten reaktan, boşta duran boru",
        predict:
          "Bir boru reaktörde dönüşüm sonlu bir uzunlukta tam olarak 1'e ulaşabilir mi, yoksa hep “neredeyse 1” mi kalır?",
        do:
          "<strong>Yarım mertebe: reaktan biter</strong> düğmesine bas (n = 0.5, k = 0.40, C<sub>A0</sub> = 1.0 mol/L). Durum satırını oku, ilk tablodaki “C_A çıkış” sütununa bak. Sonra <strong>Toplam reaktör hacmi V</strong> kaydırıcısını 100 L'den 50 L'ye, ardından 40 L'ye indir.",
        observe:
          "Da = 4.000. PFR satırı 1.00000 ve çıkış derişimi 0.0000 mol/L gösterir; durum satırı reaktanın borunun 50.0 L'lik bölümünde tümüyle tükendiğini, kalan 50.0 L'nin boş durduğunu yazar. Tek CSTR 0.94427'de, 3 tanklı seri 0.99932'de kalır. V = 50 L'de (Da = 2.000) PFR hâlâ 1.00000 verir ama artık boşta hacim kalmaz; CSTR 0.82843'e düşer. V = 40 L'de (Da = 1.600) boru da artık yetmez: 0.96000.",
        explain:
          "dc/dθ = −Da·√c denkleminin çözümü √c = 1 − Da·θ/2'dir (c = C<sub>A</sub>/C<sub>A0</sub>, θ borudaki göreli konum): bir doğru, θ = 2/Da'da sıfıra iner. Birinci mertebede hız derişimle aynı hızda söndüğü için üstel kuyruk hiç bitmez; yarım mertebede hız daha yavaş söner ve reaktan sonlu yolda tükenir. Da = 1.6 için 1 − (1 − 0.8)² = 0.96. CSTR denklemi Da·√(1 − X) = X ise X = 1'de sağlanamaz. Dürüst not: gerçek tepkimelerde kesirli mertebeli hız yasaları çoğunlukla belli bir derişim aralığı için geçerlidir; sıfıra kadar uzatmak bu modelin kabulüdür.",
      },
      {
        title: "Pinç, toplam riflü ve aradaki pazarlık",
        predict:
          "Riflü oranını 1.65'ten 1.15'e, oradan 1.10'a indirirsen kademe sayısı nasıl değişir? Riflüyü sonsuza çıkarmak kolonu sıfır kademeye indirir mi?",
        do:
          "<strong>02 · Damıtma</strong> sekmesinde <strong>Kolonu sıfırla</strong>'ya bas; kartları oku. Sırayla <strong>R_min'in hemen üstü</strong>, <strong>R = R_min: pinç</strong> ve <strong>Toplam riflü</strong> düğmelerine bas; her seferinde diyagramdaki basamaklara ve alttaki R–N grafiğinde noktanın yerine bak. En son <strong>Zor ayırma: α = 1.5</strong> düğmesini dene.",
        observe:
          "Varsayılanda R<sub>min</sub> = 1.100, pinç (0.500, 0.714), R/R<sub>min</sub> = 1.500 ve 12 kademe (kesirli 11.59), besleme üstten 6. kademeye. R = 1.15'te 21 kademe (kesirli 20.17), besleme 11. kademeye. R = 1.10'da kart “∞: ayırma mümkün değil” yazar, basamaklar kırmızıya döner ve pinç noktasına yığılır. Toplam riflüde 7 basamak (kesirli 6.43); Fenske kartı da 6.43 → 7 kademe yazar. α = 1.5 ile R<sub>min</sub> = 3.500, pinç (0.500, 0.600), N<sub>min</sub> 14.52 → 15 kademe; R = 4.00'te 34 kademe (kesirli 33.98), besleme 17. kademeye.",
        explain:
          "q = 1 iken pinç beslemenin kendi bileşimindedir: x* = 0.5, y* = 2.5·0.5/(1 + 1.5·0.5) = 0.714 ve R<sub>min</sub> = (0.95 − 0.714)/(0.714 − 0.5) = 1.10. Riflü bu değere yaklaştıkça işletme doğrusu ile denge eğrisi arasındaki açıklık kapanır, basamaklar kısalır; alttaki eğri düşey kesikli çizgiye yapışarak sonsuza gider. Toplam riflüde sıfıra değil Fenske'nin tabanına inilir: açıklık en fazla köşegen ile denge eğrisi arası kadardır. α küçülünce denge eğrisi köşegene yaklaşır, iki sınır birden sertleşir: R<sub>min</sub> üç, N<sub>min</sub> iki katını aşar. α değerleri öğretim amaçlıdır; belirli bir karışımın ölçümü değildir.",
      },
      {
        title: "Aynı yüzey, ters yön",
        predict:
          "Aynı boru, aynı debiler: akışkanlardan birinin yönünü çevirmek aktarılan ısıyı değiştirir mi? Soğuk akışkan, sıcak akışkanın çıkış sıcaklığından daha sıcak çıkabilir mi? Yüzeyi çok büyütürsen iki düzen de ε = 1'e varır mı?",
        do:
          "<strong>03 · Isı değiştirici</strong> sekmesinde <strong>Değiştiriciyi sıfırla</strong>'ya bas (karşı akım) ve kartları not et. <strong>Aynı koşul, paralel akım</strong> düğmesine bas. Sonra <strong>Dengeli: C_s = C_c</strong> düğmesine basıp sıcaklık profiline bak. Son olarak <strong>Çok büyük yüzey</strong> düğmesine bas ve <strong>Akış düzeni</strong> menüsünden paralel akıma geç.",
        observe:
          "Karşı akımda NTU = 2.000, C<sub>r</sub> = 0.500, ε = 0.7746 (kuram 0.7746), Q = 201.40 kW; sıcak akışkan 49.30 °C'de, soğuk akışkan 70.35 °C'de çıkar, ΔT<sub>lm</sub> = 50.35 K. Paralel akımda ε = 0.6335, Q = 164.70 kW, çıkışlar 67.65 ve 61.18 °C, ΔT<sub>lm</sub> = 41.18 K. Dengeli durumda (karşı akım) iki eğri paralel iner, fark 43.33 K'de sabit kalır, ε = 0.6667; çıkışlar 63.33 ve 106.67 °C. Çok büyük yüzeyde NTU = 15.000: karşı akım ε = 0.9997 ile 259.93 kW aktarır (üst sınır 260.0 kW), durum satırı bir uçta farkın 0.036 K'ye indiğini bildirir; paralel akımda ε = 0.6667'de kalır, iki akışkan da 63.33 °C'de çıkar.",
        explain:
          "Varsayılan karşı akımda m·U·A = NTU·(1 − C<sub>r</sub>) = 1'dir: uç farkları 79.65 ve 29.30 K, oranları tam e, logaritmik ortalama da farklarına, 50.35 K'ye eşittir. Paralel akımda m·U·A = NTU·(1 + C<sub>r</sub>) = 3: 130 K'lik giriş farkı çıkışta 130·e⁻³ = 6.47 K'ye erir, yüzeyin sonu neredeyse boşa çalışır. Sıcaklık kesişmesi yalnız karşı akımda olur: soğuk akışkan çıkarken sıcak akışkanın giriş ucuyla karşılaşır. Büyük yüzeyde paralel akımın tavanı 1/(1 + C<sub>r</sub>) = 0.6667'dir: sıcaklıklar eşitlenince itici güç biter. Karşı akımda da kazanç biter: fark 0.036 K iken yüzey eklemek, sınıra kalan 0.07 kW'ı kovalamaktır.",
      },
    ],
  },
  wow: [
    {
      title: "Saatte bir çay bardağından günde 20 tona",
      body:
        "Haber ile Le Rossignol'un 1909 yazındaki masaüstü düzeneği saatte yaklaşık 125 mL amonyak damlatıyordu. Carl Bosch'un büyüttüğü süreçle Oppau'daki ilk tesis 1913'te açıldı ve 1914'te günde 20 tona ulaştı. Haber 1918'de, Bosch 1931'de Nobel Kimya Ödülü aldı: biri tepkimeyi bulduğu, öteki onu yüksek basınçlı bir tesise dönüştürdüğü için.",
    },
    {
      title: "Her yeni “dokuz” boruda aynı fiyat, tankta on katı",
      body:
        "Sayfanın varsayılan birinci mertebe tepkimesinde % 90 dönüşüm için PFR 115.1 L, CSTR 450.0 L ister. % 99 için boru yalnız iki katına, 230.3 L'ye çıkar; tank 4950.0 L olur. Aynı formüllerle % 99.9 için boru 345.4 L, tank 49 950 L eder (sayfanın kaydırıcısı 0.99'da biter; bu son çift elle hesaptır). Borunun hacmi ln[1/(1 − X)] ile, tankınki X/(1 − X) ile büyür.",
    },
    {
      title: "Bir programlama dilinin adındaki mühendis",
      body:
        "Sayısal hesap dili GNU Octave, adını Octave Levenspiel'den alır. Dilin baş geliştiricisi John W. Eaton onun öğrencisiydi; Levenspiel, bir zarfın arkasına sığan hızlı hesaplarıyla tanınırdı. Octave 1988 dolaylarında bir kimyasal reaktör tasarımı dersine eşlik etsin diye düşünüldü, asıl geliştirme 1992'de başladı; bugün mühendisliğin her dalında kullanılıyor.",
    },
  ],
  worked: {
    title: "Karşı akımlı bir değiştirici: önce ε–NTU, sonra ΔT_lm ile sağlama",
    prompt:
      "Sıcak akışkan 120 °C'de, soğuk akışkan 15 °C'de giriyor. C<sub>s</sub> = 3.0 kW/K, C<sub>c</sub> = 5.0 kW/K, U = 600 W/(m²·K), A = 10.0 m². Karşı akımda aktarılan ısıyı ve çıkış sıcaklıklarını bul; sonucu U·A·ΔT<sub>lm</sub> ile sağla. Aynı yüzey paralel akımda ne verirdi?",
    steps: [
      "Boyutsuz grupları kur. U·A = 600 W/(m²·K) × 10.0 m² = 6000 W/K = 6.0 kW/K. C<sub>min</sub> = 3.0 kW/K (sıcak taraf), C<sub>r</sub> = 3.0/5.0 = 0.600, NTU = 6.0/3.0 = 2.000. Üst sınır Q<sub>maks</sub> = C<sub>min</sub>·(T<sub>s,g</sub> − T<sub>c,g</sub>) = 3.0 kW/K × 105 K = 315.0 kW: kapasite debisi küçük olan akışkan en fazla öbürünün giriş sıcaklığına kadar gidebilir.",
      "Karşı akım etkenliği: NTU·(1 − C<sub>r</sub>) = 0.8 ve e<sup>−0.8</sup> = 0.44933. ε = (1 − 0.44933)/(1 − 0.600 × 0.44933) = 0.55067/0.73040 = 0.7539. Q = ε·Q<sub>maks</sub> = 237.49 kW (ε'yi yuvarlamadan çarpınca; 0.7539 × 315.0 = 237.48 son basamakta oynar).",
      "Çıkış sıcaklıkları enerji dengesinden: T<sub>s,çıkış</sub> = 120 − 237.49/3.0 = 40.84 °C; T<sub>c,çıkış</sub> = 15 + 237.49/5.0 = 62.50 °C. Soğuk akışkan, sıcak akışkanın çıkışından 21.66 K daha sıcak çıkıyor: sıcaklık kesişmesi.",
      "Sağlama. Karşı akımda uç farkları: sıcak giriş ucunda ΔT₁ = 120 − 62.50 = 57.50 K, sıcak çıkış ucunda ΔT₂ = 40.84 − 15 = 25.84 K. ΔT<sub>lm</sub> = (57.50 − 25.84)/ln(57.50/25.84) = 31.66/0.800 = 39.58 K. U·A·ΔT<sub>lm</sub> = 6.0 kW/K × 39.58 K = 237.5 kW: iki yol aynı yere varıyor. Oran 57.50/25.84 = e<sup>0.8</sup> olmak zorundadır; öyledir.",
      "Paralel akım: ε = [1 − e<sup>−NTU(1 + C_r)</sup>]/(1 + C<sub>r</sub>) = (1 − e<sup>−3.2</sup>)/1.6 = 0.9592/1.6 = 0.5995, Q = 188.85 kW. Sayfada dene: 03 sekmesinde T<sub>s,g</sub> = 120 °C, T<sub>c,g</sub> = 15 °C, C<sub>s</sub> = 3.0, C<sub>c</sub> = 5.0, U = 600, A = 10.0 seç. Kartlar ε = 0.7539 (kuram 0.7539), 40.84 °C, 62.50 °C, ΔT<sub>lm</sub> = 39.58 K gösterir; “Paralel akımda olsaydı ε” kartı 0.5995 yazar.",
    ],
    result:
      "Karşı akımda Q = 237.49 kW, çıkışlar 40.84 °C ve 62.50 °C, ΔT<sub>lm</sub> = 39.58 K. Paralel akımda aynı 10 m² yalnız 188.85 kW aktarır; yön değiştirmek, tek metrekare eklemeden ısıyı % 26 artırır.",
  },
  misconceptions: [
    {
      myth: "İyi karıştırılan reaktör daha verimlidir.",
      truth:
        "Karıştırma tankın içini eşitler ama neye eşitlediğine bak: çıkış derişimine. Pozitif mertebeli bir tepkimede bu, bütün hacmin en düşük hızda çalışması demektir. Varsayılan 100 L'de tank 0.66667, hiç geri karışma olmayan boru 0.86466 verir. Tankın üstün olduğu işler vardır (sıcaklık denetimi, katı ya da gaz kabarcığı içeren karışımlar, hızı dönüşümle artan tepkimeler); ama gerekçe “karıştığı için daha çok dönüştürür” değildir.",
    },
    {
      myth: "Riflü, kolona geri dökülen ziyan üründür; ne kadar azsa o kadar iyi.",
      truth:
        "Riflü, kolonun üst yarısındaki buharı yıkayan sıvıdır; o olmadan zenginleştirme bölümü çalışmaz. Varsayılan kolonda R 1.65'ten 1.15'e inince kademe sayısı 12'den 21'e çıkar, R = 1.10'da sonsuza gider. Fazlası da bedava değildir: R büyüdükçe kazanda buharlaştırılan ve yoğuşturucuda geri çevrilen akış büyür. Tasarım, R<sub>min</sub>'in üstünde bir yerde bu iki maliyetin pazarlığıdır.",
    },
    {
      myth: "Yeterince büyük yüzey, her ısı değiştiriciyi ε = 1'e götürür.",
      truth:
        "Paralel akımda götürmez: iki akışkan ortak bir sıcaklığa yaklaşır ve etkenlik 1/(1 + C<sub>r</sub>) tavanına dayanır. Sayfada NTU = 15.000 iken paralel akım 0.6667'de kalır, karşı akım 0.9997'ye çıkar. Yüzeyin faydası sıcaklık farkı kadardır; fark bittiği yerde metrekare de biter.",
    },
    {
      myth: "McCabe–Thiele 12 kademe diyorsa kolona 12 raf konur.",
      truth:
        "On iki, <em>kuramsal</em> kademe sayısıdır ve kazanı da içerir: kazan kendi başına bir denge kademesi gibi çalıştığından kolona düşen 11'dir. Üstelik kuramsal kademe, çıkan buharla sıvının tam dengede olduğu ideal bir raftır; gerçek raflar dengeye tam varamaz, raf verimi 1'in altında kaldığı için kolona daha fazla raf gerekir. Karttaki “kesirli 11.59” da bir cihaz ölçüsü değil, son basamağın ne kadarının kullanıldığını söyleyen ara değerdir.",
    },
  ],
  glossary: [
    { term: "Dönüşüm (X)", definition: "Reaktöre giren reaktanın tepkimeyle tükenen kesri; 0 ile 1 arasındadır." },
    { term: "Alıkonma süresi (τ)", definition: "Reaktör hacminin hacimsel debiye oranı, τ = V/v₀; akışkanın reaktörde geçirdiği ortalama süre." },
    { term: "Damköhler sayısı (Da)", definition: "Alıkonma süresinin tepkimenin zaman ölçeğine oranı, Da = k·C_A0ⁿ⁻¹·τ; ideal reaktörde dönüşümü mertebeyle birlikte tek başına belirler." },
    { term: "Bağıl uçuculuk (α)", definition: "İki bileşenin buhar–sıvı dağılım oranlarının oranı; 1'e ne kadar yakınsa damıtmayla ayırma o kadar zordur." },
    { term: "Riflü oranı (R)", definition: "Yoğuşturucudan kolona geri verilen sıvı debisinin üst ürün debisine oranı, R = L/D." },
    { term: "Pinç noktası", definition: "İşletme doğrusunun denge eğrisine değdiği, itici gücün sıfıra indiği ve kademelerin ilerleyemediği bileşim." },
    { term: "Isıl kapasite debisi (C)", definition: "Kütlesel debi ile özgül ısının çarpımı (kW/K); akışın sıcaklığını 1 K değiştirmek için saniyede gereken ısı." },
    { term: "NTU (aktarım birimi sayısı)", definition: "Değiştiricinin ısıl büyüklüğünün boyutsuz ölçüsü, NTU = U·A/C_min." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Kimya mühendisliği lisansının ilk meslek dersi genellikle <strong>Kütle ve Enerji Denklikleri</strong>dir: bu sayfadaki her formülün ilk satırı, yani “giren − çıkan − tüketilen = biriken”, orada alışkanlığa dönüşür. <strong>Kimyasal Reaksiyon Mühendisliği</strong> birinci sekmeyi derinleştirir: tepkime ısısı ve sıcaklık profili, tersinir ve çoklu tepkimelerde seçicilik, gerçek reaktörlerin ne tam tank ne tam boru oluşunu ölçen alıkonma süresi dağılımı. <strong>Ayırma İşlemleri</strong> McCabe–Thiele'in üç kabulünü tek tek kaldırır: α bileşimle değişir, azeotroplar denge eğrisini köşegene değdirir, raf verimi 1'den küçüktür, entalpi dengeleri sabit molar akışın yerini alır. <strong>Isı Aktarımı</strong> dersinde U artık verilen bir sayı değil, akışın Reynolds ve Prandtl sayılarından hesaplanan bir sonuçtur; gövde–boru tipi değiştiriciler için ΔT<sub>lm</sub> bir düzeltme çarpanıyla kullanılır.",
      "Matematik tarafında üç sekme aynı aracın üç kullanımıdır. PFR denklemi ve değiştiricideki ΔT denklemi birinci mertebeden diferansiyel denklemlerdir; karşı akım, koşulları iki ayrı uçta verilen bir <em>sınır değer</em> problemidir ve sayfa onu atış yöntemiyle çözer. N tank → boru geçişi bir Riemann toplamının integrale yakınsamasıdır; Fenske denklemi bir geometrik dizinin logaritmasıdır. Daha ileride <strong>Taşınım Olayları</strong> (Bird, Stewart ve Lightfoot'un 1960 tarihli kitabıyla kurulan çerçeve) momentum, ısı ve kütle aktarımını tek bir matematikle ele alır; <strong>Proses Dinamiği ve Kontrol</strong> ise bu sayfanın hiç sormadığı soruyu sorar: kararlı hâle nasıl varılır ve bir bozucu geldiğinde orada nasıl kalınır?",
    ],
    topics: [
      "Kütle ve enerji denklikleri",
      "Alıkonma süresi dağılımı",
      "İzotermal olmayan reaktörler",
      "Buhar–sıvı dengesi ve azeotroplar",
      "Isı aktarım katsayıları",
      "Sınır değer problemleri",
      "Taşınım olayları",
      "Proses kontrol",
    ],
  },
  quiz: [
    {
      question:
        "Birinci mertebe bir tepkimede PFR, % 90 dönüşüm için 115.1 L istiyor. Debi ve hız sabiti aynı kalırsa % 99 dönüşüm için kaç litre gerekir?",
      options: ["126.6 L", "230.3 L", "1151 L", "1266 L"],
      answer: 1,
      explanation:
        "PFR'de gereken Da = −ln(1 − X)'tir: ln 100 = 2·ln 10 olduğundan hacim tam iki katına çıkar. On bir katına çıkan (450.0 L → 4950.0 L) CSTR'dir, çünkü onun denklemi Da = X/(1 − X)'tir. Sayfada Hedef X = 0.99 düğmesiyle doğrula.",
    },
    {
      question:
        "α = 2.5, doymuş sıvı besleme (q = 1), z<sub>F</sub> = 0.50 ve x<sub>D</sub> = 0.95 olan kolonu R = 1.00 ile çalıştırmak isteyen biri kaç kuramsal kademeye ihtiyaç duyar?",
      options: ["7 kademe", "12 kademe", "21 kademe", "Hiçbir sonlu kademe yetmez"],
      answer: 3,
      explanation:
        "Pinç (0.500, 0.714) noktasındadır ve R<sub>min</sub> = (0.95 − 0.714)/(0.714 − 0.5) = 1.10. R = 1.00 bunun altında kalır: işletme doğrusu denge eğrisini keser, basamaklar kesişme noktasına sıkışır. 7, toplam riflüdeki en az sayıdır; 12, R = 1.65'in sonucudur.",
    },
    {
      question:
        "C<sub>s</sub> = C<sub>c</sub> olan bir değiştiricide yüzey alanı sınırsız büyütülüyor. Paralel akımda ve karşı akımda etkenlik hangi değerlere yaklaşır?",
      options: ["İkisi de 1'e", "Paralel 0.5'e, karşı akım 1'e", "İkisi de 0.5'e", "Paralel 1'e, karşı akım 0.5'e"],
      answer: 1,
      explanation:
        "Paralel akımda iki akışkan giriş sıcaklıklarının ortalamasına yaklaşır; her biri olası sıcaklık değişiminin ancak yarısını yapar: 1/(1 + C<sub>r</sub>) = 0.5. Karşı akımda ε = NTU/(1 + NTU), NTU büyüdükçe 1'e gider; ama yavaş gider: NTU = 2'de 0.667, NTU = 4'te 0.800.",
    },
  ],
  next: [
    { href: "kimyasal-kinetik.html", title: "Kimyasal Kinetik Laboratuvarı", why: "Reaktöre yerleştirdiğin −r = k·Cⁿ yasasının nereden geldiğini ve k'nin sıcaklıkla nasıl değiştiğini gör." },
    { href: "termodinamik.html", title: "Termodinamik", why: "Isının neden sıcaktan soğuğa aktığını ve Q_maks sınırının arkasındaki yasaları incele." },
    { href: "diferansiyel-denklemler.html", title: "Diferansiyel Denklemler ve Dinamik Sistemler: Yön Alanından Rezonansa", why: "PFR ve ısı değiştirici denklemlerinin üstel çözümlerini ve sayısal integrasyonu genel dilde çalış." },
    { href: "akiskanlar-mekanigi.html", title: "Akışkanlar Mekaniği", why: "Bu sayfada verilmiş kabul edilen debilerin borularda hangi basınç kaybı ve pompa gücüyle sağlandığına bak." },
  ],
  sources: [
    {
      title: "MIT OCW · 10.37 Chemical and Biological Reaction Engineering",
      url: "https://ocw.mit.edu/courses/10-37-chemical-and-biological-reaction-engineering-spring-2007/",
      note: "Kesikli, piston akışlı ve tam karışmalı reaktörlerin mol dengeleri; lisans düzeyinde ders notları ve problem setleri (İngilizce).",
    },
    {
      title: "Wikipedia · McCabe–Thiele method",
      url: "https://en.wikipedia.org/wiki/McCabe%E2%80%93Thiele_method",
      note: "Sabit molar akış varsayımı, işletme doğruları ve q doğrusu; McCabe ile Thiele'nin 1925 tarihli makalesinin künyesi (İngilizce).",
    },
    {
      title: "Wikipedia · NTU method",
      url: "https://en.wikipedia.org/wiki/NTU_method",
      note: "Paralel ve karşı akım için etkenlik formülleri ve C_r = 1 özel durumu (İngilizce).",
    },
    {
      title: "Wikipedia · George E. Davis",
      url: "https://en.wikipedia.org/wiki/George_E._Davis",
      note: "Alkali müfettişliği, Manchester'daki on iki ders (bu madde 1888 tarihini verir), Society of Chemical Industry ve el kitabının 1904 baskısı (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
