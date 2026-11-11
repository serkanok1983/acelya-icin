window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["fonksiyon-grafigi"] = {
  slug: "fonksiyon-grafigi",
  title: "Fonksiyon Grafikleri: Bir Kuralın Portresi",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "x yerine x − 2 yazınca grafik neden sağa gider? Bir fonksiyonu ger, yansıt, kaydır; sıfırları ve tepeleri grafikte ölç, dönüşüm kuralıyla tahmin et; asimptotu, bileşkeyi ve tersi sına.",
  hook: "Parabolü 2 birim sağa taşımak istiyorsun: x yerine x + 2 mi yazarsın, x − 2 mi? Çoğu kişi 'sağa gidiyorsa artı' der ve grafik sola kayar. Üstelik y = (x − 2)² − 3 eğrisinin sıfırları, x²'nin tek sıfırı olan 0'ın kaydırılmışı da değildir: 0 + 2 = 2 değil, 2 ± √3'tür.",
  bigIdea:
    "Bir fonksiyonun grafiği, kuralın <strong>(x, f(x)) noktalarından oluşan resmidir</strong>; a·f(b(x − h)) + k dönüşümü bu resmin her (u, v) noktasını (u/b + h, a·v + k) noktasına taşır, ama sıfırlar gibi bir yüksekliğe bağlı noktalar taşınmaz, yeniden çözülür.",
  story: [
    "Grafik fikri, koordinat sisteminden yaklaşık üç yüz yıl yaşlıdır. 14. yüzyılın ortasında Paris'te çalışan Nicole Oresme, ısı ya da hız gibi 'niteliklerin' şiddetini resmetmenin bir yolunu aradı. Yatay bir çizgi üzerinde zamanı işaretledi; her anın hızını o noktaya dikilen dikey bir çizginin boyuyla gösterdi. Düzgün hızlanan bir cismin çizgilerinin uçları eğik bir doğru oluşturuyordu ve ortaya çıkan şeklin <strong>alanı</strong> alınan yola karşılık geliyordu. Oresme bu şekilden, düzgün hızlanan bir cismin ortalama hızla giden bir cisimle aynı yolu aldığını geometrik olarak gösterdi; Galileo aynı sonucu iki yüzyıldan fazla sonra ünlü yapacaktı. Bugün bir hız–zaman grafiğinin altındaki alanı yola eşitlerken Oresme'nin dilini konuşuyoruz.",
    "Asıl sıçrama 1630'larda geldi. René Descartes, 1637'de <em>Yöntem Üzerine Konuşma</em>'nın eki olarak yayımladığı <em>La Géométrie</em>'de bir eğriyi bir denkleme, bir denklemi bir eğriye çevirmenin yolunu gösterdi. Pierre de Fermat aynı fikre bağımsız olarak ulaşmıştı; kısa metni 1630'ların ikinci yarısından itibaren elden ele dolaştı ama ancak ölümünden sonra, 1679'da basıldı. Descartes'ın yatağında tavandaki bir sineği izlerken koordinat fikrini bulduğu anlatılır; bu hikâyenin belgesi yoktur. İşin ironisi şu: <em>La Géométrie</em>'de bugün alıştığımız, iki dik ekseni ve eksi sayıları olan kareli düzlem yoktur. 'Kartezyen düzlem' adını Descartes'ın Latince adı Cartesius'tan alır, bugünkü biçimini ise sonraki kuşaklar verdi.",
    "Ama 'fonksiyon' sözcüğü henüz ortada yoktu. Leibniz onu 1673'te, bir eğriye bağlı nicelikler için, örneğin bir noktanın koordinatı ya da eğrinin o noktadaki eğimi için kullandı. Johann Bernoulli 1718'de fonksiyonu 'bir değişken ve sabitlerden oluşan herhangi bir ifade' diye tanımladı; f(x) yazımı 1730'larda Alexis Clairaut ve Leonhard Euler'le ortaya çıktı. Euler'in 1748'de yayımlanan <em>Introductio in analysin infinitorum</em>'u fonksiyonu analizin merkezine koydu: sin, cos, eˣ ve ln artık birer hesap tablosu değil, kendi başına incelenen nesnelerdi. 19. yüzyılda kavram formülden de kurtuldu: Lobaçevski (1834) ve Dirichlet (1837), her x'e tek bir y karşılık getiren kuralın tek bir formülle yazılmak zorunda olmadığını söyledi.",
    "Bugün grafiklerin çoğu bir ekranda doğar ve ekranın kendi tuzakları vardır. Bir çizici eğriyi sonlu sayıda noktada hesaplayıp aralarını doğru parçalarıyla birleştirir; tan x'in bir kolundan ötekine atlarken iki uzak noktayı birleştirip var olmayan dikey bir çizgi çizebilir, tek bir noktada tanımsız olan (x² − 1)/(x − 1)'in deliğini hiç fark etmeyebilir. Bu sayfa bu yüzden her ölçümü iki tanığa yaptırır: grafiği doğrudan tarayan sayısal bir arama ve formülden ya da dönüşüm kuralından gelen bir tahmin. İkisi uyuşuyorsa ekran doğru söylüyordur; uyuşmuyorsa ya pencere bir şeyi saklıyordur ya da kuralın bir koşulu bozulmuştur. Oresme'nin dikey çizgileriyle bugünün pikselleri arasındaki fark yalnızca derecededir: ikisi de sonsuz bir nesnenin sonlu bir portresidir.",
  ],
  core: [
    {
      heading: "Grafik bir nokta kümesidir",
      body: "<strong>Fonksiyon</strong>, bir girdi kümesindeki her x'e <em>tek bir</em> y atayan kuraldır. Grafik, bu eşleşmelerin hepsini (x, f(x)) noktaları olarak düzleme dökmektir. Her x'e tek y düştüğü için dikey bir çizgi grafiği en çok bir kez keser; buna <strong>dikey çizgi testi</strong> denir. Çember bu testten geçemez: x² + y² = 1'de x = 0'a hem y = 1 hem y = −1 düşer. Fonksiyonun değer üretebildiği x'lerin kümesine <strong>tanım kümesi</strong>, ürettiği y'lerin kümesine <strong>görüntü kümesi</strong> denir. Sayfanın ifade kutusu tanım kümesini sana sormaz, her x'te ifadeyi gerçekten hesaplar: sonuç tanımsız ya da sonsuz çıkan noktaları çizmez. sqrt(x) bu yüzden 0'ın solunda boş kalır; (−8)^(1/3) da tanımsız sayılır, küp kök için cbrt(x) yazılır.",
      formula: "Grafik(f) = { (x, f(x)) : x ∈ tanım kümesi }",
      formulaNote:
        "Grafik, kuralın kendisi kadar bilgi taşır: grafiği tam bilen, fonksiyonu da bilir. Ekran ise grafiğin yalnızca bir dikdörtgenini gösterir.",
    },
    {
      heading: "Dönüşüm bir nokta kuralıdır",
      body: "g(x) = a·f(b(x − h)) + k'yi bir işlem sırası olarak oku: önce x'ten h çıkar, sonra b ile çarpılır, f uygulanır, sonuç a ile çarpılıp k eklenir. f'nin grafiğindeki bir (u, v) noktasının g'de nereye gittiğini bulmak için şunu sor: hangi x için f'nin içine tam u girer? b(x − h) = u denkleminin çözümü x = u/b + h'dir; o x'te g'nin değeri a·v + k olur. Bütün dönüşüm bilgisi bu tek satırdadır. h > 0 iken nokta <strong>sağa</strong> gider, çünkü f'nin eskiden 0'da yaptığını g artık x = h'de yapar. |b| > 1 iken yataydaki her uzaklık 1/|b| katına iner: grafik <strong>sıkışır</strong>, genişlemez. b < 0 y eksenine, a < 0 x eksenine göre yansıtır; a < 0 iken tepeler çukura döner. Sıra da önemlidir: sin(2x − 1) = sin(2(x − 0.5)) olduğu için bu dalga 1 değil, 0.5 birim sağa kaymıştır.",
      formula: "(u, v) ↦ (u/b + h, a·v + k)",
      formulaNote:
        "Sayfanın halkaları f'nin tepe, çukur ve y-kesişimlerini bu kuralla taşır; dolu noktalar g'nin kendisi taranarak bulunur. a = 0 ya da b = 0 iken kural geri alınamaz ve sayfa tahmin yapmaz.",
    },
    {
      heading: "Sıfırlar taşınmaz, yeniden çözülür",
      body: "Tepeler ve çukurlar doğrudan taşınır, çünkü 'yerel en büyük' olmak yükseklikten bağımsız bir özelliktir. Sıfır ise bir yüksekliktir: g(x) = 0 demek a·f(u) + k = 0, yani f(u) = −k/a demektir. k = 0 değilse g'nin sıfırları f'nin sıfırlarından değil, f'nin −k/a yüksekliğini kestiği yerlerden gelir. 'Germe ve kaydırma' hazırında (a = 2, b = 0.5, h = 1, k = −2) −k/a = 1'dir: x² = 1'in çözümleri u = ±1, buradan x = u/0.5 + 1 = −1 ve 3. x²'nin tek sıfırı olan 0'ı taşısaydın x = 1 bulurdun; orası g'nin çukurudur, sıfırı değil. y-kesişimi için de aynı mantık: x = 0'da f'nin içine u = −b·h girer, g(0) = a·f(−b·h) + k = 2·(−0.5)² − 2 = −1.5.",
      formula: "g(x) = 0  ⇔  f(u) = −k/a,  x = u/b + h",
      formulaNote:
        "−k/a yüksekliği f'nin görüntü kümesinin dışındaysa g'nin hiç sıfırı yoktur: x² için −k/a < 0 olması parabolün x eksenine hiç değmemesi demektir.",
    },
    {
      heading: "Ters fonksiyon: ayna ve birebirlik",
      body: "f⁻¹, f'nin yaptığını geri alır: f(a) = b ise f⁻¹(b) = a. Koordinatlar yer değiştirdiği için f⁻¹'in grafiği, f'ninkinin y = x doğrusuna göre aynasıdır; eˣ ile ln x bunun en tanıdık örneğidir: (0, 1) ↔ (1, 0), (1, e) ↔ (e, 1). Ama ayna her zaman bir fonksiyon vermez. Bir yatay doğru grafiği iki kez kesiyorsa iki farklı x aynı y'ye gider ve o y'den geriye tek bir x seçilemez; buna <strong>yatay çizgi testi</strong> denir. Çare tanım kümesini fonksiyonun <strong>kesin monoton</strong> olduğu bir aralığa kısıtlamaktır: x² için x ≥ 0 seçilince ters √y, sin için [−π/2, π/2] seçilince arcsin olur. Sayfa tersi formülsüz, f(x) = y denklemini ikiye bölmeyle çözerek hesaplar. Sürekli ve kesin artan bir f için ara değer teoremi çözümün var ve tek olduğunu söyler; her adım aralığı yarıya indirdiğinden 8 birimlik bir aralık 53 adımda çift duyarlıklı sayıların çözünürlüğüne iner.",
      formula: "f⁻¹(f(x)) = x  ve  f(f⁻¹(y)) = y",
      formulaNote:
        "Tepeye yakın yerde ters kötü koşulludur: sin x ≈ 1 − (x − π/2)²/2 olduğundan y'deki δy kadar bir yuvarlama x'te yaklaşık √(2δy) kadar hataya dönüşür. 10⁻¹⁶ düzeyindeki bir δy bu yüzden x'te 10⁻⁸ düzeyinde görünür.",
    },
    {
      heading: "Ekran neyi gösterir: örnekleme ve kopmalar",
      body: "Sayfa eğriyi her yerde aynı sıklıkta değil, büküldüğü yerde sıklaşarak örnekler. İki komşu örnek arasında hâlâ büyük bir fark kalırsa aralığı göreli 10⁻¹² genişliğe kadar daraltır ve kopmayı sınıflandırır: değerler sınırsız büyüyorsa <strong>kutup</strong> (düşey asimptot), sonlu bir fark kapanmıyorsa <strong>sıçrama</strong> (floor(x) gibi), sayılar bir yanda tanımsızlaşıyorsa <strong>tanım sınırı</strong> (√x'in 0'ı gibi), iki yanın değeri birleşip ortadaki nokta tanımsızsa <strong>delik</strong>. Kutbun iki yanı ayrı parçalar olarak çizilir; tan x'te sahte dikey çizgi bu yüzden çıkmaz. Bu yöntemin dürüst sınırları da var. Bütün sayımlar yalnız görünür pencerede yapılır; pencerenin dışındaki sıfır ya da tepe sayılmaz. Delik, bir örnek noktasına ya da yuvarlak bir sayıya denk gelirse bulunur; irrasyonel bir konumdaki tek bir delik çizimde görünmeyebilir. ln|x| gibi yavaş büyüyen bir tekillik kutup eşiğine ulaşmayabilir.",
      formula: "kutup: |f| → ∞  ·  sıçrama: lim<sub>x→c⁻</sub> f ≠ lim<sub>x→c⁺</sub> f  ·  delik: iki limit eşit, f(c) tanımsız",
      formulaNote:
        "Rasyonel ailede asimptotlar ayrıca ölçülür: f, x = ±10⁵, ±2·10⁵, ±4·10⁵'te hesaplanır ve f ≈ m·x + c + β/x modelinin üç katsayısı çözülür; böylece 1/x gibi sönen artık eğim ve kesişimden ayrılır.",
    },
  ],
  lab: {
    intro:
      "Dört sekme var; her birinin 'Sekmeyi sıfırla' düğmesi kendi varsayılanına döner, bir form denetiminin dışındayken R tuşu da etkin sekmeyi sıfırlar. Grafiklerde fare tekerleği imlecin altındaki noktayı sabit tutarak yakınlaştırır, sürüklemek kaydırır; telefonda iki parmakla sıkıştırılır. Başlıktaki +, − ve 'Görünümü sıfırla' düğmeleri de aynı işi görür.<br>· <strong>01 · Çizici ve dönüşümler:</strong> 'Hazır ana fonksiyon' menüsünden bir f seç ya da 'f(x) =' kutusuna kendin yaz. Yazım kuralları 'İfade sözdizimi' kutusunda: 3x, 2sin(x), (x+1)(x-1) gibi örtük çarpma, iki rakam arasında ondalık virgül (2,5), cbrt, ln ve 10 tabanlı log kabul edilir; hatalı bir ifadede hata satırı nedeni ve karakter konumunu söyler, son geçerli ifade çizilmeye devam eder. Dört kaydırıcı a, b, h ve k'dir. Kartlar ölçülen ve tahmin edilen değerleri yan yana koyar; tablo merkeze en yakın on noktayı ölçülen ve f'den taşınan hâlleriyle listeler.<br>· <strong>02 · Fonksiyon aileleri:</strong> yedi aile (doğrusal, iki ikinci derece biçimi, polinom, rasyonel, üstel–logaritma, trigonometrik); her kart çifti bir formül değerini bir sayısal ölçümle karşılaştırır. Üstel ailede 'b = 1.4' ve 'b = 0.05' hazırları kesişim sayısını iki eşikle sınar: bˣ eğrisi y = x'e teğet olduğunda hem bˣ = x hem bˣ·ln b = 1 sağlanır, buradan x·ln b = 1, x = e ve b = e<sup>1/e</sup> ≈ 1.4447 çıkar; 0 < b < 1'de y = x üzerindeki kesişimde eğim −1'e indiğinde (x·ln b = −1) x = 1/e ve b = e<sup>−e</sup> ≈ 0.06599 olur, bunun altında doğru dışında iki ek kesişim doğar.<br>· <strong>03 · Bileşke ve ters fonksiyon:</strong> hazır bir çift ya da kendi yazdığın f ve g, 'Deneme noktası x₀' kaydırıcısı; altta ters fonksiyon, 'Tanım kümesini kısıtla' menüsü ve iki kısıtlama düğmesi.<br>· <strong>04 · Dönüşüm bulmacası:</strong> numaralı bir hedef grafik ve onu yakalamak için aynı dört kaydırıcı; puan −6 ≤ x ≤ 6'daki 1201 noktada RMS farktır.<br>Sayılar ondalık noktayla, en çok altı anlamlı basamakla yazılır; çok küçükler 5.6·10⁻¹⁷ biçimindedir. Unutma: sıfır, tepe, kopma ve tanım kümesi ölçümlerinin hepsi yalnız görünür penceredeki grafiği kapsar.",
    experiments: [
      {
        title: "Sağa mı, sola mı; geniş mi, dar mı?",
        predict:
          "g(x) = f(x − 2) − 3 ile x²'nin çukuru nereye gider: (−2, −3)'e mi, (2, −3)'e mi? Sonra sin(2x) için: dalga iki kat mı genişler, iki kat mı daralır? İlk tepesi π/2 ≈ 1.5708'den nereye kayar?",
        do: "01 sekmesini varsayılanında bırak (x², a = 1, b = 1, h = 2, k = −3). 'Dönüşmüş fonksiyon' kartını, durum satırını ve tablodaki Çukur satırını oku. Sonra 'sin: periyodu yarıla' düğmesine bas ve tablodaki ilk pozitif Tepe'ye bak. En son 'Yatay kayma h' kaydırıcısını 1'e getir.",
        observe:
          "Kart 'f(x − 2) − 3' yazar; çukur g'de ölçülen ve f'den tahmin edilen olarak (2, −3)'tedir, durum satırı '2 birim sağa kayar; 3 birim aşağı kayar' der. Sıfırlar (0.267949, 0) ve (3.73205, 0). sin düğmesinden sonra kart 'f(2·x)' olur, durum satırı 'yatayda 2 kat sıkışır' der; ilk tepe (0.785398, 1)'dedir, sıfır sayısı 11 / 11, tepe + çukur 10 / 10. h = 1 iken kart 'f(2·(x − 1))' yazar ve tablonun Sıfır satırlarından biri tam (1, 0) olur.",
        explain:
          "f(x − 2), f'nin 0'da yaptığını x = 2'de yapar; eksi işareti grafiği sağa götürür. b = 2 iken f'nin içine 2x girer, f'nin π/2'de ulaştığı tepeye g x = π/4 ≈ 0.785398'de ulaşır: yatay uzaklıklar 1/b katına iner. h b'nin içinde olduğu için kayma h kadardır, h/b kadar değil: sin(2(x − 1))'in sıfırı x = 1'dedir. Aynı dalgayı sin(2x − 1) diye yazsaydın kayma 0.5 olurdu. Sıfırlar 2 ± √3'tür, çünkü (x − 2)² = 3 çözülür; 0'ın taşınmışı değildir.",
      },
      {
        title: "Delik mi, asimptot mu?",
        predict:
          "(x² − 1)/(x² − x − 2)'nin paydası x = −1 ve x = 2'de sıfırdır. İkisi de düşey asimptot mu olur? x büyüdükçe kesir neye yaklaşır?",
        do: "02 sekmesinde 'Fonksiyon ailesi' menüsünden 'Rasyonel: P(x)/Q(x)' seç; kaydırıcılar kendiliğinden bu fonksiyona kurulur. Düşey asimptot, delik ve yatay asimptot kartlarını oku. Sonra 'Eğik asimptot' hazırına bas.",
        observe:
          "Düşey asimptot formülden 'x = 2', kutba yaklaşma ölçümünden 'x = 2', fark 0. Delik formülden (−1, 0.666667), limit ölçümünden (−1, 0.666667), fark 1.9·10⁻¹¹; grafikte x = −1'de boş bir daire var. Yatay asimptot formülden ve iki yönden ölçülen olarak 'y = 1', fark 6.7·10⁻¹⁶. 'Eğik asimptot' hazırında (x² + 1)/(x − 1) için üç kart da 'y = 1x + 1' yazar, fark 2.3·10⁻¹⁰; düşey asimptot x = 1'dir.",
        explain:
          "Pay (x − 1)(x + 1), payda (x − 2)(x + 1) olarak çarpanlarına ayrılır. x + 1 sadeleşir: x = −1'de fonksiyon tanımsızdır ama limiti (x − 1)/(x − 2)'nin oradaki değeri, −2/−3 = 2/3'tür. Pay ve payda aynı derecede olduğu için x → ±∞'da kesir baş katsayıların oranına, 1/1'e gider. (x² + 1)/(x − 1) = x + 1 + 2/(x − 1) olduğundan grafik y = x + 1 doğrusuna yaklaşır. Delikteki küçük fark, sıfıra yakın pay ile paydanın bölünmesindeki yuvarlamadan gelir: ikisi de 10⁻⁶ ölçeğinde olunca 10⁻¹⁶'lık yuvarlama oranı çok daha kaba bozar.",
      },
      {
        title: "Sıra ve birebirlik",
        predict:
          "f = √x ve g = 4 − x² için f(g(x)) ile g(f(x)) aynı fonksiyon mu? g(f(x)) = 4 − x diye sadeleşince her x için tanımlı olur mu? x² neden tersi olmayan bir fonksiyondur?",
        do: "03 sekmesini varsayılanında bırak (hazır çift f = √x, g = 4 − x², x₀ = 1). Bileşke kartlarını oku. Sonra aşağıdaki ters fonksiyon bölümünde f = x² iken yatay çizgi testine bak; 'x² için x ≥ 0' düğmesine, ardından 'sin için [−π/2, π/2]' düğmesine bas.",
        observe:
          "g(x₀) = 3, (f∘g)(x₀) = 1.73205, (g∘f)(x₀) = 3, fark 1.3. f∘g'nin pencerede ölçülen tanım kümesi [−2, 2], g∘f'ninki [0, …); formülden [−2, 2] / [0, ∞). Ortak tanım kümesinde en büyük fark 2. Ters bölümünde x² için en çok kesişim '2 (y = 2.008)', birebir mi: 'hayır'. x ≥ 0 kısıtlamasıyla seçilen aralık '[0, 4] artan', f⁻¹(2) ikiye bölmeyle 1.41421, kapalı biçim √y ile fark 2.2·10⁻¹⁶. sin düğmesiyle aralık '[−1.571, 1.571] artan', en büyük |f⁻¹(f(x)) − x| 5.9·10⁻⁹.",
        explain:
          "f(g(x)) = √(4 − x²) bir yarım çemberdir ve yalnız −2 ≤ x ≤ 2'de vardır. g(f(x)) = 4 − (√x)² = 4 − x sadeleşir, ama √x önce hesaplandığı için yalnız x ≥ 0'da anlamlıdır: sadeleştirmek tanım kümesini değiştirmez. En büyük fark 2'dir: x = 0'da 4 − 2, x = 2'de 2 − 0. x², 2 ile −2'yi aynı 4'e götürür; tek bir ters seçebilmek için x ≥ 0 parçası seçilir ve ters √y olur. sin'in ucundaki 5.9·10⁻⁹ bir hata değil, koşullanma sorunudur: tepede eğim sıfıra gider, y'deki yuvarlama x'te karekök kadar büyür.",
      },
      {
        title: "Bulmaca 1: ayırt edici noktadan başla",
        predict:
          "Hedef bir parabol. Önce hangi noktasını okumalısın, h ve k'yi oradan nasıl bulursun? Aynı parabolü veren tek bir (a, b, h, k) mi vardır?",
        do: "04 sekmesini varsayılanında aç (Bulmaca numarası 1, kaydırıcılar a = 1, b = 1, h = 0, k = 0). RMS kartını oku. Turuncu hedefin tepesini bul ve 'Yatay kayma h' ile 'Dikey kayma k'yi ona göre kur; sonra hedefin tepeden 2 birim sağdaki yüksekliğini oku ve 'Dikey çarpan a'yı ayarla. En son 'Çözümü göster'e bas.",
        observe:
          "Başta RMS fark 4.28, en büyük nokta farkı 9.32, tanım kümesi uyuşmazlığı 0 %, sonuç 'Henüz değil'. Tepe (2, 0)'dadır; h = 2 ile RMS 2.14'e iner. Tepeden 2 birim sağda hedef 2 yüksekliğindedir, yani a·2² = 2 ve a = 0.5: sonuç 'Eşleşti', durum satırı 'aynı grafiği veren başka bir dörtlü buldun' der. 'Çözümü göster' ise (0.5, −1, 2, 0) yazar; b = −1 olsa da grafik aynıdır. h'yi 2.1'e kaydırırsan RMS 0.204'e çıkar ve sonuç yeniden 'Henüz değil' olur.",
        explain:
          "x² için a·(b(x − h))² = a·b²·(x − h)²: yalnız a·b² çarpımı ve h önemlidir, b'nin işareti hiç görünmez. Bu yüzden puan katsayıları değil, iki grafiğin −6 ≤ x ≤ 6'daki 1201 noktasındaki farkını karşılaştırır; tolerans RMS ≤ 0.05 ve tanım uyuşmazlığı ≤ %0.5'tir. Ayırt edici nokta, ana fonksiyondaki karşılığını bildiğin noktadır: parabolün tepesi (0, 0)'dan (h, k)'ye taşınır, |x|'in köşesi de öyle; √x'in başladığı yer ve 1/x'in kutbu yatay kaymayı doğrudan verir. Değerler ±10'da kırpıldığından 2ˣ gibi hızla büyüyen hedeflerde ekranın çok dışındaki farklar puana tam yansımaz.",
      },
    ],
  },
  wow: [
    {
      title: "Sinüs bir okuma hatasıdır",
      body: "Hint matematikçileri yarım kirişe 'yay kirişi' anlamına gelen <em>jyā</em> ya da eşanlamlısı <em>jīvá</em> dediler. Arapçaya bu sözcük anlamsız bir ses aktarımıyla <em>jība</em> olarak geçti; Arapça kısa ünlüler yazılmadan yazıldığı için harfler sonradan 'cep, koyun, kıvrım' anlamındaki <em>jayb</em> diye okundu. 12. yüzyılda Arapçadan Latinceye çeviri yapanlar bunu aynı anlamdaki <em>sinus</em> sözcüğüyle karşıladılar. Kosinüs ise 1620'de Edmund Gunter'in kitabında 'tümler açının sinüsü' anlamındaki <em>complementi sinus</em>'un kısaltması olarak yer aldı.",
    },
    {
      title: "Kâğıtta üstel bir duvar",
      body: "Birimi 1 santimetre olan bir kâğıda y = eˣ çizdiğini düşün. x = 10 cm'de eğri yaklaşık 220 metre yukarıdadır; x = 30 cm'de 107 milyon kilometre, yani Dünya–Güneş uzaklığının yaklaşık yüzde 71'i. Aynı kâğıtta ln x'in 1 metre yükselmesi için x'in e<sup>100</sup> cm ≈ 2.7 × 10<sup>41</sup> m olması gerekir: bu yaklaşık 2.8 × 10<sup>25</sup> ışık yılıdır, gözlemlenebilir evrenin yaklaşık 93 milyar ışık yıllık çapının yaklaşık 300 trilyon katı.",
    },
    {
      title: "Hiçbir ekranın çizemeyeceği fonksiyon",
      body: "Dirichlet'nin 1829'daki makalesinde tanımladığı fonksiyon, x kesirli (rasyonel) bir sayıysa 1, değilse 0 değerini alır. Her aralıkta hem rasyonel hem irrasyonel sayı bulunduğu için grafiği iki yatay çizginin üzerine serpilmiş, kopuk kopuk bir toz bulutudur; hiçbir kalem onu çizemez. Bilgisayar daha da kötüsünü yapar: bilgisayardaki her ondalıklı sayı, paydası 2'nin kuvveti olan bir kesirdir. Bu sayfanın çizicisi gibi bir örnekleyici onu tarasaydı her örnek rasyonel çıkar, iki komşu örnek arasında hiç fark bulunmaz ve ekranda kendinden emin, kopmasız bir y = 1 doğrusu görünürdü.",
    },
  ],
  worked: {
    title: "√x'ten adım adım: yansıt, ger, kaydır, sonra geri al",
    prompt:
      "g(x) = −2·√(−(x − 1)) + 3 fonksiyonunun tanım ve görüntü kümesini, başlangıç noktasını, y-kesişimini ve sıfırını √x'in noktalarından bul; sonra g'nin tersini yaz. Sayfada sına: 01 sekmesinde 'Hazır ana fonksiyon' olarak √x seç, a = −2, b = −1, h = 1, k = 3 yap.",
    steps: [
      "Kalıbı oku: a = −2, b = −1, h = 1, k = 3. √ yalnız negatif olmayan sayılarda tanımlıdır, öyleyse −(x − 1) ≥ 0, yani x ≤ 1. Tanım kümesi (−∞, 1]'dir: b < 0 grafiği y eksenine göre aynaladığı için eğri sağdan sola uzanır.",
      "√x'in bilinen noktalarını (u, v) ↦ (u/b + h, a·v + k) kuralıyla taşı: (0, 0) ↦ (0/(−1) + 1, 3) = (1, 3) başlangıç noktası; (1, 1) ↦ (0, 1), bu y-kesişimidir; (4, 2) ↦ (−3, −1). Kontrol: g(0) = −2·√1 + 3 = 1 ve g(−3) = −2·√4 + 3 = −1.",
      "Sıfır bir yüksekliktir, taşınmaz: g(x) = 0 ⇔ √u = −k/a = 1.5 ⇔ u = 2.25, buradan x = 2.25/(−1) + 1 = −1.25. √x'in tek sıfırı olan 0'ı taşısaydın (1, 3) noktasına varırdın; orası sıfır değil, başlangıç noktasıdır.",
      "Görüntü kümesi: √ her negatif olmayan değeri alır; −2 ile çarpmak bunu (−∞, 0]'a, 3 eklemek (−∞, 3]'e taşır. g kesin artandır (x 1'e yaklaştıkça √(1 − x) küçülür, −2 ile çarpılınca büyür), dolayısıyla birebirdir ve tersi vardır.",
      "Tersi bul: y = −2√(1 − x) + 3 ⇒ √(1 − x) = (3 − y)/2 ⇒ x = 1 − (3 − y)²/4, y ≤ 3. Örnek: y = 3 − √5 ≈ 0.7639 için x = 1 − 5/4 = −0.25. 03 sekmesinde ters bölümünün f(x) kutusuna -2sqrt(1-x)+3 yazıp tek monoton aralığı seçersen sayfa f⁻¹(0.7639)'u ikiye bölmeyle −0.25 bulur.",
    ],
    result:
      "Tanım kümesi x ≤ 1, görüntü kümesi y ≤ 3, başlangıç (1, 3), y-kesişimi (0, 1), sıfır x = −1.25, ters x = 1 − (3 − y)²/4. Sayfada tablo Sıfır satırını (−1.25, 0), y-kesişimini (0, 1) olarak ölçülen ve tahmin edilen iki sütunda aynı gösterir; kopma kartı '1 tanım sınırı' der, durum satırı sıfırların 'f'nin 1.5 yüksekliğini kestiği noktalardan' geldiğini yazar. Tepe + çukur kartı '0 / 0 (+1 uç noktada)' gösterir: başlangıç noktası (1, 3) yerel tepe sayılmaz, çünkü yerel uç değer noktanın iki yanında tanımlı bir aralık ister; yine de g'nin en büyük değeri oradadır ve görüntü kümesinin üst ucu 3'ü verir.",
  },
  misconceptions: [
    {
      myth: "f(x − 2) grafiği 2 birim sola kayar; eksi sola demektir.",
      truth:
        "Sağa kayar. f(x − 2), f'nin 0'da aldığı değeri x = 2'de alır; her olay 2 birim geç olur. 01 sekmesinin varsayılanında x²'nin çukuru (0, 0)'dan (2, −3)'e gider ve durum satırı '2 birim sağa kayar' der. Aynı nedenle f(x + 2) sola kayar. Dikey kayma ise sezgiye uyar: + k yukarı götürür, çünkü k çıktıya eklenir, girdiden çıkarılmaz.",
    },
    {
      myth: "f(2x) grafiği yatayda iki kat genişler.",
      truth:
        "Yarıya sıkışır: f'nin x = u'da yaptığını f(2x) x = u/2'de yapar. 'sin: periyodu yarıla' düğmesiyle sin x'in π/2'deki tepesi 0.785398'e gelir, durum satırı 'yatayda 2 kat sıkışır' der. Dikeyde ise tersi geçerlidir: 2·f(x) iki kat uzar. Girdiye yapılan her işlem grafiğe 'tersinden' yansır.",
    },
    {
      myth: "Dönüşmüş grafiğin sıfırları, ana fonksiyonun sıfırlarının kaydırılmışıdır.",
      truth:
        "Bu yalnız k = 0 iken doğrudur. k ≠ 0 iken g'nin sıfırları f(u) = −k/a denkleminden gelir. 'Germe ve kaydırma' hazırında x²'nin tek sıfırı 0'dır, ama g'nin sıfırları −1 ve 3'tür: f'nin 1 yüksekliğini kestiği u = ±1 noktalarının taşınmışı. Durum satırı bunu her seferinde ayrıca yazar.",
    },
    {
      myth: "4 − (√x)² = 4 − x olduğuna göre g(f(x)) her x için tanımlıdır.",
      truth:
        "Bileşke içten dışa hesaplanır: önce √x, sonra 4 − (…)². √x negatif x'te tanımsız olduğundan g∘f yalnız x ≥ 0'da vardır; 03 sekmesi bu tanım kümesini [0, …) olarak ölçer. Formülü sadeleştirmek tanım kümesini genişletmez.",
    },
  ],
  glossary: [
    {
      term: "Fonksiyon",
      definition: "Bir kümedeki her girdiye tam olarak bir çıktı atayan kural.",
    },
    {
      term: "Tanım kümesi",
      definition:
        "Fonksiyonun değer üretebildiği girdilerin kümesi; √x için [0, ∞), ln x için (0, ∞).",
    },
    {
      term: "Görüntü kümesi",
      definition:
        "Fonksiyonun aldığı bütün çıktı değerlerinin kümesi; sin x için [−1, 1].",
    },
    {
      term: "Bileşke fonksiyon",
      definition:
        "(f∘g)(x) = f(g(x)): önce g, sonra f uygulanır; tanım kümesi, g'nin tanım kümesinde olup g(x)'i f'nin tanım kümesine düşen x'lerdir.",
    },
    {
      term: "Birebir fonksiyon",
      definition:
        "Farklı girdileri hep farklı çıktılara götüren fonksiyon; grafiğini hiçbir yatay doğru birden çok kez kesmez.",
    },
    {
      term: "Ters fonksiyon",
      definition:
        "Birebir bir f'nin eşlemesini geri alan fonksiyon; grafiği, f'nin grafiğinin y = x doğrusuna göre yansımasıdır.",
    },
    {
      term: "Asimptot",
      definition:
        "Eğrinin sonsuza giderken sınırsızca yaklaştığı doğru; düşey (x = c), yatay (y = c) ya da eğik (y = mx + c) olabilir.",
    },
    {
      term: "Delik (kaldırılabilir süreksizlik)",
      definition:
        "Fonksiyonun tanımsız olduğu ama iki yandan limitinin aynı sonlu sayı olduğu nokta; grafikte boş daireyle gösterilir.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Üniversitede fonksiyon, iki küme arasındaki bir eşleme olarak yeniden tanımlanır ve yeni sorular doğar: farklı girdiler hep farklı çıktılara mı gider (<strong>birebir</strong>), her olası çıktıya ulaşılır mı (<strong>örten</strong>)? Ters fonksiyon ancak ikisi birden sağlanınca vardır; bu yüzden hedef kümeyi söylemek şarttır. eˣ: ℝ → ℝ örten değildir, çünkü hiçbir x negatif bir değer vermez; ama eˣ: ℝ → (0, ∞) hem birebir hem örtendir ve tersi ln: (0, ∞) → ℝ'dir. Sinüs birebir değildir, aynı değeri sonsuz kez alır; bu yüzden arcsin tanımlanırken sinüs [−π/2, π/2] aralığına kısıtlanır, tıpkı sayfadaki düğmede olduğu gibi. Analiz dersleri sayfadaki 'delik', 'kutup' ve 'asimptot' sözcüklerini kesin dile çevirir: limit ve süreklilik ε ve δ ile tanımlanır, rasyonel fonksiyonların davranışı polinom bölmesi ve kısmi kesirlerle çözülür. Doğrusal cebirde ise (u, v) ↦ (u/b + h, a·v + k) kuralı düzlemin bir <strong>afin dönüşümü</strong> olarak görünür: köşegeni 1/b ve a olan bir matris ile bir öteleme vektörü.",
      "Sayfadaki ailelerin çoğu üniversitede tek bir denklemin çözümleri olarak yeniden karşına çıkar. eˣ, türevi kendisine eşit olan fonksiyondur: y′ = y diferansiyel denklemini ve y(0) = 1 koşulunu sağlayan tek fonksiyon. Genel denklem y′ = k·y'nin çözümleri ise y = C·e<sup>kx</sup> biçimindedir: k > 0 ise büyüme (sürekli bileşik faiz), k < 0 ise sönüm (radyoaktif bozunma). Karmaşık sayılara geçince Euler'in 1748'deki <em>Introductio</em>'da yer alan formülü e<sup>iθ</sup> = cos θ + i·sin θ, üstel fonksiyonla sinüs ve kosinüsün aynı nesnenin farklı yüzleri olduğunu gösterir; A·sin(B(x − C)) + D ailesi de Fourier serilerinin yapı taşıdır. Sayısal analiz dersleri ise sayfanın arka planında yaptığını konu edinir: ikiye bölme yönteminin yakınsaması, kötü koşullu problemler ve kayan noktalı aritmetiğin 10⁻¹⁶ düzeyindeki yuvarlaması.",
    ],
    topics: [
      "Birebir ve örten fonksiyonlar",
      "Ters trigonometrik fonksiyonlar",
      "ε–δ ile limit ve süreklilik",
      "Rasyonel fonksiyonlar ve kısmi kesirler",
      "Afin dönüşümler",
      "Diferansiyel denklemler",
      "Sayısal kök bulma ve koşullanma",
    ],
  },
  quiz: [
    {
      question:
        "f'nin grafiğinde (6, 4) noktasında bir tepe var. g(x) = f(3(x + 2)) − 1 grafiğinde bu tepe nereye gider?",
      options: ["(16, 3)", "(0, 3)", "(4, 3)", "(6, 1)"],
      answer: 1,
      explanation:
        "g(x) = f(3(x − (−2))) − 1 olduğundan b = 3, h = −2, k = −1. Kural (u, v) ↦ (u/b + h, a·v + k): (6/3 − 2, 4 − 1) = (0, 3). Kontrol: x = 0'da f'nin içine 3·(0 + 2) = 6 girer, çıkan 4'ten 1 çıkar. (16, 3) b ile bölmek yerine çarpmanın, (4, 3) h'nin işaretini ters okumanın sonucudur.",
    },
    {
      question:
        "f(x) = x² için g(x) = 2·f(x − 1) − 2'nin sıfırları nerededir? (01 sekmesinde a = 2, b = 1, h = 1, k = −2 ile sınayabilirsin.)",
      options: [
        "Yalnız x = 1",
        "x = 0 ve x = 2",
        "x = −2 ve x = 0",
        "x = 1 − √2 ve x = 1 + √2",
      ],
      answer: 1,
      explanation:
        "Sıfırlar taşınmaz, f(u) = −k/a denkleminden gelir: −k/a = 2/2 = 1, u² = 1, u = ±1, x = u + 1 = 0 ve 2. 'Yalnız x = 1', x²'nin sıfırını taşımaktır; orası g'nin çukurudur, (1, −2). 1 ± √2, a ile bölmeyi unutup (x − 1)² = 2 çözmekten çıkar; −2 ve 0 ise kaymayı sola yapmaktır.",
    },
    {
      question:
        "Bulmacada hedef x² ailesinden ve senin a = 2, b = 1 seçimin hedefle 'Eşleşti' veriyor. h ve k'yi değiştirmeden hangi seçim de 'Eşleşti' verir?",
      options: ["a = 1, b = 2", "a = 0.5, b = 2", "a = 4, b = 0.5", "a = 2, b = −2"],
      answer: 1,
      explanation:
        "a·(b(x − h))² = a·b²·(x − h)², yani grafiği yalnız a·b² belirler. Eşleşen seçimde a·b² = 2·1 = 2. Seçenekler: 1·4 = 4, 0.5·4 = 2, 4·0.25 = 1, 2·4 = 8; yalnız a = 0.5, b = 2 aynı parabolü çizer. Dikey germe ile yatay sıkıştırma parabolde birbirinin yerine geçebilir; puanın katsayıları değil grafikleri karşılaştırmasının nedeni budur.",
    },
  ],
  next: [
    {
      href: "matris-donusumleri.html",
      title: "Matris Dönüşümleri: Düzlemi Dört Sayıyla Yeniden Çizmek",
      why: "Buradaki nokta kuralının bütün düzleme genişlemiş hâli: iki birim oku sürükleyerek alanın kaç kat büyüdüğünü ölç; 'Bileşke ve ters' sekmesinde dönüşümlerin sırasının neden önemli olduğunu matrislerle gör.",
    },
    {
      href: "birim-cember.html",
      title: "Birim Çember: Sinüs, Kosinüs ve Dönmeler",
      why: "Trigonometrik ailenin kökü: 'Dalgalar ve faz' sekmesinde dönen bir nokta sinüs eğrisini çizer; burada 2π/B ve faz kayması olarak ölçtüğün şeyin çemberdeki karşılığını izle.",
    },
    {
      href: "turev.html",
      title: "Türev: Kesenden Teğete (Limit Laboratuvarı)",
      why: "Tepe aramanın ve tersin kötü koşullanmasının arkasındaki eğim: x², x³, sin x, eˣ ve ln x üzerinde kesen doğrunun h küçüldükçe teğete dönüşmesini izle, çok küçük h'de yuvarlama hatasını da gör.",
    },
    {
      href: "taylor-serisi.html",
      title: "Taylor Serisi: Fonksiyonları Polinomlarla Yakalamak",
      why: "Polinom ailesinin büyük kardeşi: sin ve eˣ'i derece derece polinomla kur, 'Polinom yaklaşımı' sekmesinde hatanın derece arttıkça nasıl eridiğini Lagrange kalan sınırıyla karşılaştır.",
    },
  ],
  sources: [
    {
      title: "OpenStax · Precalculus 2e",
      url: "https://openstax.org/details/books/precalculus-2e",
      note: "Fonksiyonlar, bileşke ve ters, grafik dönüşümleri, rasyonel fonksiyonlar ve asimptotlar, üstel–logaritmik ve trigonometrik fonksiyonların grafikleri (İngilizce, açık ders kitabı).",
    },
    {
      title: "Wikipedia · History of the function concept",
      url: "https://en.wikipedia.org/wiki/History_of_the_function_concept",
      note: "Oresme'den Leibniz, Bernoulli, Euler ve Dirichlet'ye fonksiyon kavramının tarihi.",
    },
    {
      title: "Wikipedia · Sine and cosine",
      url: "https://en.wikipedia.org/wiki/Sine_and_cosine",
      note: "Tanımlar, grafikler, özdeşlikler ve 'sinüs' sözcüğünün jyā → jība → jayb → sinus yolculuğu.",
    },
    {
      title: "Wikipedia · Dirichlet function",
      url: "https://en.wikipedia.org/wiki/Dirichlet_function",
      note: "Rasyonellerde 1, irrasyonellerde 0 olan ve hiçbir noktada sürekli olmayan fonksiyon.",
    },
  ],
  revision: "Kasım 2026",
};
