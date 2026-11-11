window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["turev"] = {
  slug: "turev",
  title: "Türev: Anlık Değişimi Yakalamak",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Duran bir fotoğrafın hızı olur mu? Türev, sıfıra yaklaşan ama sıfır olmayan bir adımla eğimi yakalar; bilgisayar ise o adımı fazla küçültünce yanılmaya başlar.",
  hook:
    "Bir radar fotoğrafında araba kıpırdamaz, yine de cezada 'o anda 92 km/sa' yazar: duran bir karenin hızı nasıl olur? Zenon bu soruyu 2400 yılı aşkın bir süre önce havadaki bir okla sordu; cevabın ilk taslağı 1600'lerde geldi, sağlam hâli iki yüzyıl daha bekledi. Sayfada h'yi küçülttükçe teğete yapışan kesen o cevaptır; h'yi fazla küçültürsen bilgisayarın bile yanıldığını göreceksin.",
  bigIdea:
    "Türev, iki yakın nokta arasındaki <strong>ortalama değişim hızının</strong> noktalar birbirine yaklaşırken yerleştiği değerdir, <em>f′(a) = lim<sub>h→0</sub> [f(a+h) − f(a)]/h</em>; kâğıtta h sıfıra istediğin kadar yaklaşır, bilgisayarda ise en iyi h, kesme ve yuvarlama hatalarının dengelendiği yerdedir.",
  story: [
    "Teğet sorusu kalkülüsten çok eskidir. 1630'larda Pierre de Fermat bir eğrinin en yüksek noktasını ve teğetini bulmak için garip bir numara kullanıyordu: bilinmeyen küçük bir <em>e</em> miktarı ekliyor, denklemi sadeleştiriyor, sonra <em>e</em>'yi siliyordu. Yöntem işliyordu ama Fermat neden işlediğini hiçbir zaman tam açıklamadı; <em>e</em> önce sıfır değildi (bölebilmek için), sonra sıfırdı (atabilmek için). Bugün bu, sayfadaki <strong>h</strong>'nin ta kendisidir.",
    "1665 yazında veba Cambridge Üniversitesi'ni kapattı; 22 yaşındaki Isaac Newton Woolsthorpe'taki aile çiftliğine çekildi ve iki yıl içinde akıp değişen niceliklerin anlık değişim hızlarını hesaplayan bir yöntem kurdu; bu hızlara sonradan <em>fluxion</em> (akış) adını verdi. Harfin üstüne nokta koyduğu ẋ gösterimini 1690'larda benimsedi; fizikçiler zamana göre türevi bugün hâlâ böyle yazar. Ama Newton sonuçlarını yıllarca çekmecede tuttu. Gottfried Wilhelm Leibniz Paris'te aynı fikre bağımsız olarak ulaştı, 1675 sonbaharındaki notlarında bugün kullandığımız d ve ∫ işaretlerini icat etti ve 1684'te <em>Acta Eruditorum</em>'da birkaç sayfalık bir makale bastırdı: diferansiyel hesabın ilk basılı anlatımı. Sonrası çirkin bir öncelik kavgasıdır. 1712'de Royal Society'nin kurduğu komite Newton'u haklı buldu; raporun, Society'nin başkanı olan Newton tarafından bizzat yazıldığı sonradan anlaşıldı. Kavga İngiliz matematiğini Kıta Avrupası'ndan onlarca yıl kopardı.",
    "Yöntem işliyordu ama temeli çürüktü. 1734'te Piskopos George Berkeley, <em>The Analyst</em> adlı kitapçığında alay etti: artım önce sıfır değil, sonra sıfır; bunlar 'ölmüş niceliklerin hayaletleri' değil de ne? Haklıydı. Sağlam cevap neredeyse yüz yıl sürdü. 1820'lerde Augustin-Louis Cauchy türevi, h'yi sıfır yaparak değil, fark bölümünün h sıfıra <em>yaklaşırken</em> yaklaştığı değer, yani bir <strong>limit</strong> olarak tanımladı. Karl Weierstrass 1860'larda Berlin derslerinde limiti ε ve δ harfleriyle, 'yaklaşmak' sözcüğüne bile ihtiyaç duymadan yazdı. Sayfada bir hata payı seçip 'Mutlak hata' kutusu onun altına inene kadar h'yi küçültmek, bu tanımı elle oynamaktır.",
    "Bugün türev her yerdedir: Newton'un ikinci yasası ivme, yani konumun ikinci türevi hakkında bir denklemdir; ekonomist 'marjinal maliyet' derken türev söyler; hava tahmini, uçak kanadı ve salgın eğrisi türevli denklemlerle yazılır. Bu denklemleri çözen programların birçoğu ise limit almaz: türevi sonlu bir adımla, tam bu sayfadaki gibi bir fark bölümüyle yaklaşık hesaplar. Kâğıt üzerinde h'yi küçültmek hep iyidir, bilgisayarda değil. 1985'te benimsenen IEEE 754 standardının çift duyarlıklı sayıları yaklaşık 16 anlamlı basamak taşır; h fazla küçülünce birbirine çok yakın iki sayıyı çıkarırsın ve anlamlı basamaklar erir. Sayfanın log–log hata grafiği, matematikçinin limiti ile makinenin sınırının buluştuğu yerin haritasıdır.",
  ],
  core: [
    {
      heading: "Kesen: iki nokta, bir ortalama",
      body:
        "Eğri üzerindeki iki noktadan geçen doğruya <strong>kesen</strong> denir. Eğimi, dikeydeki değişimin yataydaki değişime oranıdır: a'dan a + h'ye giderken f, f(a)'dan f(a + h)'ye değişir. Bu orana <strong>fark bölümü</strong> denir ve bir ortalamadır; iki saatte 180 km giden arabanın 'ortalama 90 km/sa' gitmesi gibi. Sayfada turkuaz çizgi kesendir, kehribar rengi eğim üçgeni de Δx = h ile Δy'yi gösterir. Kesenin iki noktasını seçmenin üç yolu var: A ile sağındaki B (<em>ileri fark</em>), A ile solundaki C (<em>geri fark</em>) ya da A'nın iki yanındaki C ve B (<em>merkezi fark</em>). Üçü de h → 0'da aynı sayıya gider, ama aynı hızla değil.",
      formula: "D<sub>h</sub> = [f(a+h) − f(a)] / h",
      formulaNote:
        "Fark bölümü. h negatif olabilir; o zaman B, A'nın solundadır. Merkezi fark [f(a+h) − f(a−h)]/(2h), ileri ve geri farkın ortalamasıdır.",
    },
    {
      heading: "Limit: h'yi sıfır yapmadan sıfıra götürmek",
      body:
        "h = 0 koyarsan 0/0 çıkar; hiçbir şey söylemez. Numara şu: önce h ≠ 0 iken sadeleştir, sonra h'yi küçült. f(x) = x², a = 1 için pay (1 + h)² − 1 = 2h + h²'dir; h'ye bölünce 2 + h kalır ve h küçüldükçe 2'ye yerleşir: f′(1) = 2. Aynı açılım her kuvvette işler: (a + h)ⁿ − aⁿ = n·aⁿ⁻¹·h + (h² ve daha yüksek kuvvetli terimler), bu yüzden (xⁿ)′ = n·xⁿ⁻¹. 'Yerleşmek' sözcüğünün kesin anlamı <strong>ε–δ tanımıdır</strong>: her ε &gt; 0 için öyle bir δ &gt; 0 bulunur ki 0 &lt; |h| &lt; δ olan her h'de |D<sub>h</sub> − L| &lt; ε olur. Yani hangi hata payını istersen iste, h'yi yeterince küçük tutarak o payın içine girersin. x² için |D<sub>h</sub> − 2| = |h| olduğundan δ = ε yeter. Sayfadaki 'Mutlak hata' kutusu, tanımdaki |D<sub>h</sub> − L|'nin kendisidir.",
      formula: "f′(a) = lim<sub>h→0</sub> [f(a+h) − f(a)] / h",
      formulaNote:
        "0 < |h| koşulu önemlidir: limit h = 0'daki değere hiç bakmaz, zaten orada tanımsızdır. Limit var ve sonlu bir sayıysa f, a'da türevlenebilir denir.",
    },
    {
      heading: "Türevlenebilirlik: süreklilik yetmez",
      body:
        "Türev için fark bölümünün limiti var ve sonlu olmalıdır. |x| fonksiyonu 0'da kopmaz ama köşelidir: sağdan her fark bölümü +1, soldan −1'dir. İki <strong>tek yanlı türev</strong> farklı olduğu için türev yoktur. √x ise 0'da dikleşir: fark bölümü √h/h = 1/√h, h → 0'da sınırsız büyür; teğet dikeydir ve eğimi bir sayı değildir. Ters yön her zaman doğrudur: a'da türevlenebilen fonksiyon a'da süreklidir, çünkü f(a + h) − f(a) = D<sub>h</sub>·h → f′(a)·0 = 0. Süreklilik gereklidir ama yeterli değildir. En uç örnek, her yerde sürekli olup hiçbir noktada türevi olmayan Weierstrass fonksiyonudur.",
      formula:
        "f′(a) var ⇔ lim<sub>h→0⁻</sub> D<sub>h</sub> = lim<sub>h→0⁺</sub> D<sub>h</sub> ve bu ortak değer sonlu",
      formulaNote:
        "|x| için 0'da sol limit −1, sağ limit +1. Merkezi fark ikisinin ortalamasını, yani 0'ı verir; bu yüzden köşeyi göremez.",
    },
    {
      heading: "Taylor'ın merceği: kesme hatası nereden gelir?",
      body:
        "Eğim üçgeni küçülünce sayfada bir Büyüteç açılır; h her yarılandığında büyütme iki katına çıkar ve pencerede eğri, kesen ve teğet giderek tek bir doğruya kaynaşır. Pürüzsüz bir eğri yakından bakınca doğrudur. Ne kadar doğru olduğunu Taylor açılımı söyler: f(a + h) = f(a) + f′(a)·h + f″(a)·h²/2 + f‴(a)·h³/6 + …. İlk iki terim teğet doğrusudur; gerisi fark bölümünün <strong>kesme hatası</strong>nı üretir. İleri farkta f(a)'yı çıkarıp h'ye bölünce hata f″(a)·h/2 + … olur: h on kat küçülürse hata on kat küçülür. Merkezi farkta f(a + h) − f(a − h) farkında çift kuvvetli terimler birbirini götürür ve hata f‴(a)·h²/6 + … olur: on kat küçük h, yüz kat küçük hata. eˣ'te ileri farktan merkezi farka geçince log–log grafikteki kehribar kesikli çizginin eğimi 1'den 2'ye döner. x²'de f‴ = 0 olduğu için merkezi farkın kesme hatası hiç yoktur; tam aritmetikte her h ile 2a'yı verir. Ana grafiğin altındaki şerit bunu bütün x'ler için gösterir: ileri farkın D<sub>h</sub>(x) = 2x + h doğrusu f′(x) = 2x'in h kadar üstünden gider, merkezi farka geçince ikisi çakışır.",
      formula:
        "D<sub>h</sub><sup>ileri</sup> − f′(a) ≈ f″(a)·h/2,   D<sub>h</sub><sup>merkezi</sup> − f′(a) ≈ f‴(a)·h²/6",
      formulaNote:
        "Hata h üzeri p ile orantılıysa p, yöntemin mertebesidir: ileri fark birinci, merkezi fark ikinci mertebedendir. f″(a) = 0 olan yerde (sin x, a = 0) ileri fark da ikinci mertebeye çıkar.",
    },
    {
      heading: "Kayan nokta: h'yi fazla küçültmenin bedeli",
      body:
        "Çift duyarlıklı <strong>kayan nokta</strong> aritmetiği (IEEE 754) her sayıyı 53 ikili basamağa yuvarlar. 1'den büyük ilk sayı 1 + ε'dur, ε = 2<sup>−52</sup> ≈ 2.2·10<sup>−16</sup>: her değer yaklaşık 16 anlamlı basamak taşır ve dört işlemin her biri bağıl olarak en çok ε/2 yanılır. h küçükken f(a + h) ile f(a) ilk basamaklarında aynıdır; çıkarınca ortak basamaklar silinir, geriye yuvarlama kırıntıları kalır. Buna <strong>anlamlı basamak kaybı</strong> denir. Kırıntı yaklaşık ε·|f(a)| büyüklüğündedir ve h'ye bölünür: yuvarlama hatası ≈ ε·|f(a)|/h, h küçüldükçe büyür. Toplam hata bir bütçedir: h küçüldükçe kesme payı azalır, yuvarlama payı artar. İleri farkta |f″|·h/2 + ε·|f|/h toplamı h* = √(2ε·|f|/|f″|) civarında en küçüktür; |f| ile |f″| 1 mertebesindeyse h* ve en iyi hata √ε ≈ 10<sup>−8</sup> mertebesindedir: 16 basamağın yarısı gider. Merkezi farkta en iyi adım ∛ε ≈ 10<sup>−5</sup>, en iyi hata ε<sup>2/3</sup> ≈ 10<sup>−11</sup> mertebesindedir.",
      formula:
        "E(h) ≈ |f″(a)|·h/2 + ε·|f(a)|/h  ⇒  h* = √(2ε·|f(a)| / |f″(a)|)",
      formulaNote:
        "Sayfa yuvarlama payını ε·(|f(a)| + |a·f′(a)|)/|h| ile tahmin eder (merkezi farkta bunun yarısı); ikinci terim a + h toplamının kendi yuvarlamasıdır. Kırmızı kesikli çizgi bu tahmin, noktalı dikey çizgi h*'tır.",
    },
  ],
  lab: {
    intro:
      "<strong>Deney ayarları</strong> panelinde iki menü, iki kaydırıcı ve dört düğme var. <strong>Fonksiyon f(x)</strong> yedi fonksiyondan birini (x², x³, sin x, eˣ, ln x, |x|, √x), <strong>Fark bölümü</strong> ileri, geri ya da merkezi farkı seçer. <strong>Nokta a</strong> 0.01'lik adımlarla kayar. <strong>Adım |h| (logaritmik)</strong> |h|'yi 2'den 10<sup>−12</sup>'ye kadar, her on katı 20 adımda tarar ve 0.1, 0.01, 10<sup>−8</sup> gibi on kuvvetlerinde tam durur; kesin bir değer için kaydırıcıya tıklayıp ok tuşlarını kullan. <strong>h'nin işareti</strong> B'yi A'nın sağına (h &gt; 0) ya da soluna (h &lt; 0) koyar. <strong>h → 0</strong> h'yi çeyrek saniyede bir yarıya indirir (1'den başlayınca 9.75 saniyede 1.8·10<sup>−12</sup>'ye varır). <strong>Tüm h değerlerini tara</strong> hatayı kaydırıcının 247 değerinin hepsi için bir anda çizer; ikinci basış taramayı gizler. <strong>Sıfırla</strong> fonksiyona ve formüle dokunmadan h = +1, a = 1 yapar ve taramayı kapatır. Grafiğe dokunmak A'yı oraya taşır, B'yi sürüklemek h'yi değiştirir; <kbd>Boşluk</kbd> «h → 0»'ı başlatıp durdurur. <strong>Ölçümler</strong> panelinde kesen eğimi D<sub>h</sub>, tam türev f′(a), mutlak ve bağıl hata ile o anki durumu anlatan bir not okunur. Grafikte kesen turkuaz, teğet mor kesikli, eğim üçgeni kehribar rengidir; üçgen küçülünce bir <strong>Büyüteç</strong> açılır. Altındaki şerit aynı h ile D<sub>h</sub>(x)'i bütün x'ler için tam türev f′(x)'in yanına çizer. Log–log hata grafiğinde turkuaz noktalar ölçülen hatadır; kehribar kesikli çizgi tam aritmetikteki kesme hatasını, kırmızı kesikli çizgi yuvarlama tahminini, noktalı dikey çizgi kuramsal en iyi adım h*'ı gösterir. Deneyler sırayla yapılmak üzere yazıldı. Aşağıdaki sayılar Chrome'da okundu; yuvarlamanın baskın olduğu çok küçük h'lerde son basamaklar tarayıcının eˣ ya da sin hesabına göre biraz değişebilir.",
    experiments: [
      {
        title: "x²'de kesen eğimi tam 2 + h, sonra bir sürpriz",
        predict:
          "f(x) = x², a = 1'de teğetin eğimi 2'dir. |h| = 0.5, 0.1 ve 0.01 iken kesen eğimi kaç olur? h &lt; 0 iken? «h → 0» h'yi yarıya indirdikçe hata hep h'ye eşit mi kalır?",
        do: "Açılış ayarında (x², ileri fark, a = 1.00) <strong>Adım |h|</strong> kaydırıcısını 0.5, 0.1 ve 0.01'e getir; her seferinde <strong>Kesen eğimi D<sub>h</sub></strong> ve <strong>Mutlak hata</strong> kutularını oku, sonra <strong>h &lt; 0</strong>'ı seç. Ardından <strong>h &gt; 0</strong>'a dönüp |h| = 10<sup>−8</sup>'i dene, sonra aynı |h| ile bir kez daha h &lt; 0'ı seç. En son <strong>Sıfırla</strong>'ya, sonra <strong>h → 0</strong>'a bas ve on saniye hata grafiğini izle.",
        observe:
          "2.50000000000000, 2.10000000000000 ve 2.01000000000000; h = −0.5'te 1.50000000000000. Hata iki yanda da tam |h|. 10<sup>−8</sup>'de okuma 1.99999998784506: 2'nin altında, hata 1.22·10<sup>−8</sup>. h = −10<sup>−8</sup>'de ise 1.99999999894729, hata on bir kattan fazla küçük (1.05·10<sup>−9</sup>): kırıntının büyüklüğü h'nin işaretine bile bağlıdır. «h → 0»'da hata h = 1.49·10<sup>−8</sup>'e kadar h'ye eşittir; bir sonraki yarılamada (h ≈ 7.45·10<sup>−9</sup>) D<sub>h</sub> tam 2.00000000000000 olur, hata 0'a düşer ve noktalar grafiğin tabanında üçgenlere dönüşür.",
        explain:
          "[(1+h)² − 1]/h = 2 + h, yani |D<sub>h</sub> − 2| = |h|: ε–δ tanımında δ = ε yeter. 10<sup>−8</sup> ikili sistemde tam yazılamaz; 1 + h toplamı ve kare alma 10<sup>−16</sup> mertebesinde yuvarlanır, h'ye bölününce bu kırıntı 10<sup>−8</sup>'e büyür. «h → 0» ise ikinin tam kuvvetlerini kullanır: 1 + h tam yazılır, h² ise 1'in yanındaki en küçük basamağın (2<sup>−52</sup>) yarısından küçülünce saklanamaz. Bilgisayar (1+h)²'yi 1 + 2h yapar; yani limitin yaptığını yapar.",
      },
      {
        title: "(sin h)/h → 1: tek yanlı formül, ikinci mertebe",
        predict:
          "sin x için a = 0'da teğetin eğimi cos 0 = 1'dir; ileri fark burada (sin h)/h olur. Bu oran 1'in üstünde mi kalır, altında mı? h on kat küçülünce hata kaç kat küçülür? Çok küçük h'de hata yeniden büyür mü?",
        do: "<strong>Fonksiyon f(x)</strong> menüsünden sin x seç ve <strong>Nokta a</strong>'yı 0.00'a getir. |h| = 1, 0.1, 0.01, 10<sup>−3</sup> ve 10<sup>−4</sup>'ü dene, bir kez de h &lt; 0'ı seç. Sonra <strong>Tüm h değerlerini tara</strong>'ya bas ve |h|'yi 10<sup>−8</sup>'e indir.",
        observe:
          "0.841470984807897, 0.998334166468282, 0.999983333416666, 0.999999833333342, 0.999999998333333: hep 1'in altında. Hatalar 0.159, 0.00167, 1.67·10<sup>−5</sup>, 1.67·10<sup>−7</sup>, 1.67·10<sup>−9</sup>: her on katta yüz kat düşüş. h &lt; 0 aynı sayıları verir. |h| ≤ 2·10<sup>−8</sup> için okuma tam 1.00000000000000; tarama eğrisi tabana iner ve bir daha kalkmaz. Kırmızı yuvarlama çizgisi ve h* çizgisi hiç çıkmaz.",
        explain:
          "sin h = h − h³/6 + … olduğundan (sin h)/h = 1 − h²/6 + …: hata h²/6. sin″(0) = 0 olduğu için ileri farkın h'li terimi kaybolur, tek yanlı formül bile ikinci mertebeden davranır. Yuvarlama da büyümez: sin 0 tam sıfırdır, birbirine yakın iki sayı çıkarılmaz. h²/6 yaklaşık 10<sup>−16</sup>'nın altına inince sin h, h'nin kendisine yuvarlanır ve oran tam 1 olur. Bu limit, (sin x)′ = cos x kuralının temel taşlarından biridir.",
      },
      {
        title: "Daha küçük h, daha kötü cevap: eˣ'te iki hata yarışır",
        predict:
          "eˣ için a = 1'de tam türev e = 2.71828182845905'tir. İleri farkla |h| = 10<sup>−4</sup>, 10<sup>−8</sup> ve 10<sup>−12</sup>'den hangisi en küçük hatayı verir? Merkezi farka geçince en iyi h büyür mü, küçülür mü?",
        do: "eˣ seç ve <strong>Sıfırla</strong>'ya bas: a = 1.00 ve h = +1 olur, tarama kapanır, fark bölümü ileri fark kalır. |h|'yi 10<sup>−1</sup>'den 10<sup>−12</sup>'ye on katlık adımlarla indir, her adımda <strong>Mutlak hata</strong>'yı yaz; sonra <strong>Tüm h değerlerini tara</strong>'ya bas. Tarama açık kalsın: <strong>Fark bölümü</strong> menüsünden <strong>Merkezi fark</strong>'ı seçince eğri kendiliğinden yeniden çizilir. On katlık adımları bir kez daha dene.",
        observe:
          "İleri fark: 0.141, 0.0136, 0.00136, … 1.36·10<sup>−6</sup> (10<sup>−6</sup>) ve en iyisi 6.60·10<sup>−9</sup> (10<sup>−8</sup>); sonra hata büyür: 2.15·10<sup>−7</sup> (10<sup>−9</sup>), 3.26·10<sup>−5</sup> (10<sup>−11</sup>), 0.000432 (10<sup>−12</sup>). Tarama bir V çizer; dibi, noktalı h* ≈ 2.9·10<sup>−8</sup> çizgisinin yanındadır. Merkezi fark: 0.00453, 4.53·10<sup>−5</sup>, 4.53·10<sup>−7</sup>, 4.53·10<sup>−9</sup> ve en iyisi 5.86·10<sup>−11</sup> (10<sup>−5</sup>), yüz kat daha iyi; dip h* ≈ 8.9·10<sup>−6</sup>'ya kayar. 10<sup>−6</sup>'da hata 1.63·10<sup>−10</sup>'a çıkar, 10<sup>−7</sup>'de şans eseri yine 5.86·10<sup>−11</sup> olur, sonra hızla büyür.",
        explain:
          "V'nin sağ kolu kesme hatasıdır: ileri farkta ≈ (e/2)·h, eğim 1; merkezi farkta ≈ (e/6)·h², eğim 2. Sol kol yuvarlamadır: f(a+h) ile f(a)'nın ortak basamakları çıkarmada silinir, kalan 10<sup>−16</sup> mertebesindeki kırıntı h'ye bölünür ve h küçüldükçe büyür. Dip, iki kolun kesiştiği yerdir: tek yanlı farkta h* ∝ √ε, merkezi farkta ∝ ∛ε. Sol koldaki noktalar dağınıktır: kırıntılar bazen birbirini götürür, bu yüzden şans eseri iyi çıkan h'ler olur (ileri farkta 2·10<sup>−9</sup> de 6.60·10<sup>−9</sup> verir). Kırmızı çizgi yuvarlama payının kaba bir üst tahminidir; sol koldaki noktalar onun altında saçılır.",
      },
      {
        title: "Köşe ve dikey teğet: türevin olmadığı yerler",
        predict:
          "|x| için a = 0'da ileri fark h &gt; 0 iken kaç verir, h &lt; 0 iken kaç? Merkezi fark kaç verir ve o sayı türev midir? √x için a = 0'da h küçüldükçe kesenin eğimi ne olur?",
        do: "|x| seç, <strong>Nokta a</strong>'yı 0.00 yap ve <strong>Fark bölümü</strong> menüsünden <strong>İleri fark</strong>'a dön. |h| = 0.001 ve 10<sup>−12</sup> için h &gt; 0 ve h &lt; 0'ı dene; sonra <strong>Geri fark</strong>'a ve <strong>Merkezi fark</strong>'a geç. Son olarak √x seç (a = 0 kaydırıcının sol ucudur), farkı yeniden <strong>İleri fark</strong> yap, <strong>h &gt; 0</strong>'ı seç ve |h|'yi 1, 0.01, 10<sup>−4</sup>, 10<sup>−6</sup> yap; bir kez de h &lt; 0'ı seç.",
        observe:
          "İleri fark h &gt; 0'da 1.00000000000000, h &lt; 0'da −1.00000000000000, |h| ne olursa olsun. Geri fark tersini verir, merkezi fark her h için 0. Tam türev kutusu 'yok (sol türev −1, sağ türev +1)' yazar; grafikte eğimi −1 ve +1 olan iki kesikli doğru çıkar. √x'te D<sub>h</sub> = 1, 10, 100, 1000; tam türev 'yok: dikey teğet (+∞)', h &lt; 0'da ise 'tanımsız'.",
        explain:
          "Türev için sağdan ve soldan gelen fark bölümleri aynı sayıya gitmelidir; |x|'te biri +1'de, öteki −1'de takılı kalır. Merkezi fark ileri ve geri farkın ortalamasıdır: (1 + (−1))/2 = 0. Bu 0 bir eğim değil, köşeyi gizleyen bir ortalamadır. √x'te D<sub>h</sub> = √h/h = 1/√h, h → 0'da sınırsız büyür: teğet dikeydir, eğimi bir sayı değildir. İki fonksiyon da 0'da süreklidir; süreklilik türev için yetmez.",
      },
    ],
  },
  wow: [
    {
      title: "Veba yılları ve bir 'mucize yılı'",
      body:
        "Cambridge Üniversitesi veba yüzünden 1665 yazından 1667 baharına dek büyük ölçüde kapalı kaldı. Woolsthorpe'taki çiftliğe dönen yirmili yaşlarının başındaki Isaac Newton bu sürede, kendi anlatımına göre, kalkülüsün temelini, beyaz ışığın renklere ayrıldığını ve yerçekiminin Ay'ın yörüngesine kadar uzandığı fikrini kurdu. Yaşlılığında bu yılları 'o günlerde icat için çağımın baharındaydım' diye andı; tarihçiler bu döneme <em>annus mirabilis</em>, 'mucize yılı' der. Kütle çekimi düşünceleri ancak yirmi yıl sonra, 1687'deki <em>Principia</em>'da kitaplaştı; akış hesabını ayrı bir inceleme olarak ilk kez 1704'te <em>Opticks</em>'in ekinde bastırdı, <em>Method of Fluxions</em> ise ölümünden sonra, 1736'da yayımlandı.",
    },
    {
      title: "175 milyar türev, hiçbiri fark bölümüyle değil",
      body:
        "2020'de tanıtılan GPT-3 dil modelinin 175 milyar ayarlanabilir sayısı vardı; eğitimin her adımı, hatanın bu sayıların her birine göre türevini istiyordu. Fark bölümüyle bu, her adımda modeli 175 milyar kez daha çalıştırmak demekti ve her türev bu sayfadaki kesme–yuvarlama ikilemine takılırdı. Bunun yerine <strong>geri yayılım</strong> kullanıldı: zincir kuralını hesabın sonundan başına doğru uygular ve bütün türevleri, modeli birkaç kez çalıştırma maliyetiyle, yalnızca yuvarlama hatasıyla verir. Bu ters yönlü otomatik türevin ilk yayımlanmış tarifi, Seppo Linnainmaa'nın 1970'te Helsinki'de yazdığı yüksek lisans tezindedir; tezin konusu, bir algoritmada biriken yuvarlama hatasıydı.",
    },
    {
      title: "Her yerde sürekli, hiçbir yerde türevlenemez",
      body:
        "18 Temmuz 1872'de Karl Weierstrass, Berlin'deki Prusya Bilimler Akademisi'nde grafiği hiç kopmayan ama hiçbir noktasında teğeti olmayan bir fonksiyon sundu: W(x) = Σ aⁿ·cos(bⁿπx), 0 &lt; a &lt; 1, b tek tamsayı ve ab &gt; 1 + 3π/2. Ne kadar yakınlaştırırsan yakınlaştır eğri düzleşmez, her ölçekte yeniden titrer; sayfadaki Büyüteç'in gösterdiğinin tam tersi. Bu, kamuya sunulan ilk örnekti; Bolzano'nunki gibi daha eskileri kâğıtlarda kalmıştı. Charles Hermite 1893'te Stieltjes'e yazdığı bir mektupta 'türevi olmayan sürekli fonksiyonların bu acıklı belasından dehşet ve korkuyla yüz çeviriyorum' dedi. Bugün o 'bela', Brown hareketinin ve fraktalların matematiğidir.",
    },
  ],
  worked: {
    title: "Merkezi farkın hatası ve en iyi adım",
    prompt:
      "f en az üç kez sürekli türevlenebilir olsun. (a) Taylor açılımıyla merkezi fark bölümünün hatasının f‴(ξ)·h²/6 olduğunu göster ve ileri farkla karşılaştır. (b) f(x) = eˣ, a = 1 için h = 0.01'de iki hatayı tahmin et. (c) Değerler ε ≈ 2.2·10<sup>−16</sup> bağıl duyarlıkla hesaplanıyorsa merkezi farkta toplam hatayı en küçük yapan h'yi ve bu en küçük hatayı bul.",
    steps: [
      "Taylor'ı iki yana kalanlı yaz: f(a ± h) = f(a) ± f′(a)·h + f″(a)·h²/2 ± f‴(ξ<sub>±</sub>)·h³/6. Çıkarınca f(a) ile f″ terimleri götürür: f(a+h) − f(a−h) = 2f′(a)·h + [f‴(ξ<sub>+</sub>) + f‴(ξ<sub>−</sub>)]·h³/6. 2h'ye böl; f‴ sürekli olduğu için iki değerin ortalaması aradaki bir f‴(ξ)'ye eşittir: D<sub>h</sub> − f′(a) = f‴(ξ)·h²/6, ξ ∈ (a − h, a + h).",
      "İleri farkta tek taraf vardır ve f″ terimi kalır: D<sub>h</sub> − f′(a) = f″(ξ)·h/2. Biri h ile, öteki h² ile küçülür. Sınama: x³'te f‴ = 6 sabittir, merkezi farkın hatası tam h²'dir. Sayfada x³, a = 1, merkezi farkla h = 0.1 → 3.01000000000000, h = 0.01 → 3.00010000000000; aynı h'lerde ileri fark 3.31000000000000 ve 3.03009999999999 gösterir (tam değer 3 + 3h + h² = 3.0301; son basamaktaki fark yuvarlamadır).",
      "eˣ, a = 1: f″ = f‴ = e ≈ 2.718. h = 0.01'de ileri hata ≈ (2.718/2)·0.01 ≈ 0.0136, merkezi hata ≈ (2.718/6)·10<sup>−4</sup> ≈ 4.53·10<sup>−5</sup>. Sayfa ikisini de aynen gösterir: 0.0136 ve 4.53·10<sup>−5</sup>. Aynı h ile merkezi fark yaklaşık 300 kat daha isabetlidir.",
      "Yuvarlamayı ekle: f(a ± h) değerleri ε·|f| mertebesinde yanılır, a ± h toplamları da yuvarlanır. Sayfanın modeli merkezi farkta bu payı ε·(|f(a)| + |a·f′(a)|)/(2h) alır; eˣ ve a = 1 için e·ε/h. Toplam: E(h) ≈ (e/6)·h² + e·ε/h. Türevi sıfırla: (e/3)·h = e·ε/h², yani h³ = 3ε ve h* = ∛(3ε) = ∛(6.7·10<sup>−16</sup>) ≈ 8.7·10<sup>−6</sup>. Sayfa aynı hesabı bir ızgara üzerinde yapıp h* ≈ 8.9·10<sup>−6</sup> yazar.",
      "En küçük toplam: E(h*) ≈ 3.5·10<sup>−11</sup> + 6.9·10<sup>−11</sup> ≈ 1.0·10<sup>−10</sup>. Sayfada h = 10<sup>−5</sup>'te ölçülen hata 5.86·10<sup>−11</sup>'dir, tahminin altında; gerçek kırıntılar kısmen birbirini götürür. İleri farkta aynı hesap h* = 2√ε ≈ 3·10<sup>−8</sup> ve en küçük toplam ≈ 8·10<sup>−8</sup> verir; sayfanın 10<sup>−8</sup>'deki ölçümü 6.60·10<sup>−9</sup>'dur.",
    ],
    result:
      "Merkezi farkın hatası h² ile küçülür; en iyi adımı ∛ε mertebesindedir (yaklaşık 10<sup>−5</sup>) ve on civarı doğru basamak verir. İleri fark en iyi hâlinde, √ε mertebesindeki bir adımla (yaklaşık 10<sup>−8</sup>), sekiz civarı basamakta kalır. Aynı hesap, gürültülü bir ölçümden hız çıkaran her mühendisin hesabıdır: ε'un yerine ölçüm belirsizliği gelir ve en iyi adım hemen büyür.",
  },
  misconceptions: [
    {
      myth: "h = 0 koyunca 0/0 çıkıyor; demek ki türev tanımsız.",
      truth:
        "Limit h'yi sıfır yapmak değil, sıfıra yaklaştırmaktır; tanımdaki 0 &lt; |h| koşulu h = 0'ı zaten dışarıda bırakır. Önce h ≠ 0 iken sadeleştir: x² için fark bölümü 2a + h olur, artık payda yok. Sonra h'yi küçült; 2a'ya yerleşir. 0/0 başlangıçtaki biçimdir, sonucun kendisi değil.",
    },
    {
      myth: "Türev sıfırsa orası maksimum ya da minimumdur.",
      truth:
        "Yatay teğet yalnızca aday verir. Sayfada x³ seç ve <strong>Nokta a</strong>'yı 0.00'a getir: tam türev 0, ama ileri fark bölümü h² olduğu için h &gt; 0 da h &lt; 0 da seçsen kesen eğimi pozitif kalır (|h| = 0.5'te 0.250000000000000). Eğri sıfırın iki yanında da yükselir: ne tepe ne çukur. Karar için türevin işaretinin noktanın iki yanında değişip değişmediğine bakılır.",
    },
    {
      myth: "h ne kadar küçükse bilgisayarın bulduğu türev o kadar doğrudur.",
      truth:
        "Yalnızca bir yere kadar. eˣ için a = 1'de ileri fark h = 10<sup>−8</sup>'de 6.60·10<sup>−9</sup> hatayla en iyi sonucu verir; h = 10<sup>−12</sup>'de hata 0.000432'ye, yaklaşık 65 bin katına çıkar. Sebep anlamlı basamak kaybıdır: birbirine çok yakın iki sayının farkı, yuvarlama kırıntılarını h'ye bölerek büyütür. Pratik kural: a 1 mertebesindeyse tek yanlı farkta h'yi 10<sup>−8</sup>, merkezi farkta 10<sup>−5</sup> civarında seç; a büyükse h'yi a ile ölçekle.",
    },
    {
      myth: "|x| 0'da sürekli ve merkezi fark orada 0 veriyor; öyleyse |x|'in 0'daki türevi 0'dır.",
      truth:
        "Süreklilik türev için gereklidir ama yeterli değildir; merkezi fark ise köşeyi göremez. Sayfada |x| seç, a = 0 yap: ileri fark h &gt; 0 için +1, h &lt; 0 için −1 verir, h ne kadar küçülürse küçülsün. Merkezi fark bu iki tek yanlı bölümün ortalamasıdır: (1 + (−1))/2 = 0. Bu 'simetrik türev' vardır ama türev değildir. Tuzak gerçektir: TI-83 ve TI-84 gibi grafik hesap makineleri türevi h = 0.001'lik merkezi farkla hesapladığı için |x|'in 0'daki türevine 0 der.",
    },
  ],
  glossary: [
    { term: "Fark bölümü (Dₕ)", definition: "Kesenin eğimi; ileri farkta [f(a+h) − f(a)]/h. a ile a + h arasındaki ortalama değişim hızıdır." },
    { term: "Kesen", definition: "Eğri üzerindeki iki noktadan geçen doğru; sayfada turkuaz çizgi. Eğimi fark bölümüdür." },
    { term: "Teğet", definition: "(a, f(a)) noktasından geçen ve eğimi f′(a) olan doğru; h → 0'da kesenlerin vardığı konum. Sayfada mor kesikli çizgi." },
    { term: "Limit (ε–δ)", definition: "lim D<sub>h</sub> = L demek: her ε &gt; 0 için, 0 &lt; |h| &lt; δ olan her h'de |D<sub>h</sub> − L| &lt; ε sağlayan bir δ &gt; 0 vardır." },
    { term: "Tek yanlı türev", definition: "Fark bölümünün yalnız h &gt; 0 (sağ türev) ya da yalnız h &lt; 0 (sol türev) iken limiti; türev, ikisi var, sonlu ve eşitse vardır." },
    { term: "Kesme hatası", definition: "Fark bölümünün tam aritmetikte bile f′(a)'dan sapması; Taylor açılımında atılan terimlerden gelir: ileri farkta h ile, merkezi farkta h² ile orantılı." },
    { term: "Yuvarlama hatası", definition: "Sayıların sonlu basamakla saklanmasından doğan hata; birbirine yakın iki değer çıkarılınca büyür ve fark bölümünde yaklaşık ε·|f(a)|/|h| olur." },
    { term: "Makine epsilonu (ε)", definition: "1 ile ondan büyük ilk çift duyarlıklı sayı arasındaki fark: ε = 2<sup>−52</sup> ≈ 2.22·10<sup>−16</sup>; bağıl yuvarlamanın ölçeği." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede türev bir kurallar listesidir; üniversitede önce bir <strong>tanım</strong>a dönüşür. Analiz I (Calculus I) dersinde limit ε–δ diliyle yazılır ve 'türevlenebilen fonksiyon süreklidir' gibi cümleler ispatlanır. Ardından <strong>Ortalama Değer Teoremi</strong> gelir: [a, b]'de sürekli, (a, b)'de türevlenebilen bir fonksiyonun, uçları birleştiren kesene paralel en az bir teğeti vardır; 'iki saatte 180 km gittiysen bir an tam 90 km/sa gitmişsindir' cümlesinin matematiği budur. Teoremin genellemesi kalanlı Taylor formülünü verir: f(a + h) = f(a) + f′(a)·h + f″(ξ)·h²/2. Bu satır sayfadaki kesme hatasının kesin hâlidir; ileri farkın hatası tam olarak f″(ξ)·h/2'dir. Teğete h², h³… terimleri ekleme fikri, sin ve e<sup>x</sup> hesaplayan program kütüphanelerinin de temelidir: argüman önce küçük bir aralığa indirilir, sonra katsayıları Taylor katsayılarına çok yakın, ama hatayı o aralığın tamamında en küçük yapacak biçimde ayarlanmış bir polinom hesaplanır.",
      "İkinci sıçrama sayısaldır. <strong>Sayısal Analiz</strong> dersinde bu sayfanın ikilemi bir tasarım sorusuna dönüşür. Richardson ekstrapolasyonu iki farklı h ile alınan sonuçları birleştirip baştaki hata terimini yok eder: merkezi farkta (4D<sub>h/2</sub> − D<sub>h</sub>)/3 hatayı h⁴ mertebesine indirir. f analitik ve gerçel eksende gerçel değerliyse, yani formülü karmaşık sayılarla da hesaplanabiliyorsa, karmaşık adım yöntemi f′(a) ≈ Im f(a + ih)/h hiç çıkarma yapmaz; anlamlı basamak kaybı olmadığı için h = 10<sup>−200</sup> gibi akıl almaz küçüklükte bir adım bile işe yarar. Otomatik türev ise zincir kuralını programın her işlemine uygulayarak türevi yuvarlama dışında tam verir; yapay sinir ağlarını eğiten geri yayılım budur. <strong>Çok Değişkenli Kalkülüs</strong>te türev kısmi türeve ve gradyana dönüşür; <strong>Kısmi Diferansiyel Denklemler</strong> ve sayısal yöntem derslerinde ısı ve dalga denklemleri bilgisayarda [f(x + h) − 2f(x) + f(x − h)]/h² gibi sonlu farklarla çözülür. Bütçe orada da aynıdır: bu ikinci farkta yuvarlama ε/h² ile büyür.",
    ],
    topics: [
      "ε–δ ile limit ve süreklilik",
      "Ortalama Değer Teoremi",
      "Kalanlı Taylor formülü",
      "Sayısal türev ve Richardson ekstrapolasyonu",
      "Kayan nokta aritmetiği (IEEE 754)",
      "Otomatik türev ve geri yayılım",
      "Kısmi türev ve gradyan",
      "Sonlu farklar ve kısmi diferansiyel denklemler",
    ],
  },
  quiz: [
    {
      question:
        "x² için a = 1'de ileri fark bölümü Dₕ = 2 + h'dir. ε–δ tanımında ε = 10⁻³ seçilirse, 0 < |h| < δ olan her h için |Dₕ − 2| < ε olmasını sağlayan en büyük δ kaçtır?",
      options: ["10<sup>−6</sup>", "10<sup>−3</sup>", "√(10<sup>−3</sup>) ≈ 0.032", "Hiçbiri: h = 0 alınamadığı için δ bulunamaz"],
      answer: 1,
      explanation:
        "|Dₕ − 2| = |h| olduğu için koşul |h| < 10⁻³ demektir; δ = 10⁻³ tam yeter. Daha büyük bir δ işe yaramaz: 10⁻³ ile δ arasında bir h seçilirse hata ε'u aşar (δ = 0.002 iken h = 0.0015 gibi). 10⁻⁶ de çalışır ama en büyük değildir. Tanım h = 0'ı zaten dışarıda bırakır: 0 < |h|.",
    },
    {
      question:
        "Merkezi farkla hesaplanan bir türevin hatası h = 0.01'de 4.5·10⁻⁵'tir. Kesme hatası baskın kaldıkça h = 0.001'de hata yaklaşık ne olur?",
      options: ["4.5·10<sup>−6</sup>", "4.5·10<sup>−7</sup>", "4.5·10<sup>−8</sup>", "Değişmez"],
      answer: 1,
      explanation:
        "Merkezi farkın hatası f‴·h²/6 ile, yani h² ile orantılıdır: h on kat küçülünce hata yüz kat küçülür. Sayfada eˣ, a = 1 için tam bu görülür: 4.53·10⁻⁵'ten 4.53·10⁻⁷'ye. İleri fark olsaydı yalnızca on kat düşerdi (4.5·10⁻⁶). Kural sonsuza dek sürmez: 10⁻⁵'in altında yuvarlama baskın gelir.",
    },
    {
      question:
        "Bir program ileri farkı tek duyarlıklı sayılarla (ε ≈ 1.2·10⁻⁷) hesaplıyor; a, f(a) ve f″(a) 1 mertebesinde. En iyi adım h* yaklaşık kaçtır?",
      options: ["10<sup>−8</sup>", "3·10<sup>−4</sup>", "1.2·10<sup>−7</sup>", "10<sup>−16</sup>"],
      answer: 1,
      explanation:
        "Tek yanlı farkta h* ≈ √ε'dur: √(1.2·10⁻⁷) ≈ 3.5·10⁻⁴. Çift duyarlıkta işe yarayan 10⁻⁸ burada felakettir: tek duyarlıkta 1 + 10⁻⁸ yine 1'e yuvarlanır ve pay sıfır çıkar. En iyi hata da √ε mertebesinde kalır, 10⁻⁴ ile 10⁻³ arası: yalnızca üç-dört doğru basamak. Basamak azaldıkça en iyi h büyür.",
    },
  ],
  next: [
    { href: "taylor-serisi.html", title: "Taylor Serisi", why: "Kesme hatasının kaynağı: teğet doğrusuna h², h³… terimleri eklendikçe sin x'in polinom yaklaşımı nasıl iyileşir, nerede yetersiz kalır." },
    { href: "integral.html", title: "İntegral: Birikim, Temel Teorem ve Uygulamalar", why: "Türevin ters işlemi: eğimden birikime. Birikim fonksiyonunun eğimini ölçüp f(x) ile karşılaştır; temel teoremin sıçramalı bir fonksiyonda nerede bozulduğunu gör." },
    { href: "diferansiyel-denklemler.html", title: "Diferansiyel Denklemler", why: "Türev bir denklemin içine girince: Euler yöntemi y<sub>n+1</sub> = y<sub>n</sub> + h·f ileri farkı tersinden okur ve aynı h ikilemini taşır." },
    { href: "cok-degiskenli-kalkulus.html", title: "Çok Değişkenli Kalkülüs", why: "Aynı fark bölümü, bu kez her yöne ayrı: kısmi türev, gradyan ve en dik tırmanış yönü." },
  ],
  sources: [
    { title: "OpenStax · Calculus Vol. 1, 3.1 Defining the Derivative", url: "https://openstax.org/books/calculus-volume-1/pages/3-1-defining-the-derivative", note: "Kesenden teğete geçiş, limit tanımı ve çözümlü örnekler (İngilizce, açık ders kitabı)." },
    { title: "Wikipedia · Numerical differentiation", url: "https://en.wikipedia.org/wiki/Numerical_differentiation", note: "İleri ve merkezi fark, hata terimleri, √ε adım kuralı, karmaşık adım yöntemi; hesap makinelerinin h = 0.001'lik merkezi farkı." },
    { title: "3Blue1Brown · The paradox of the derivative", url: "https://www.3blue1brown.com/lessons/derivatives", note: "Anlık hızın paradoksu ve türevin kesenden teğete görsel anlatımı (İngilizce video ve metin)." },
    { title: "Wikipedia · Leibniz–Newton calculus controversy", url: "https://en.wikipedia.org/wiki/Leibniz%E2%80%93Newton_calculus_controversy", note: "Öncelik kavgasının belgeleri: 1684 makalesi, 1712 komitesi ve Newton'un yazdığı rapor." },
  ],
  revision: "Kasım 2026",
};
