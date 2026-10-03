window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["turev"] = {
  slug: "turev",
  title: "Türev: Anlık Değişimi Yakalamak",
  field: "Matematik",
  level: "Lise",
  minutes: 30,
  tagline:
    "Duran bir fotoğrafın hızı olur mu? Türev bu soruya iki yüzyıl süren bir kavganın sonunda verilen cevaptır: sıfıra yaklaşan ama sıfır olmayan bir adımla eğimi yakalamak.",
  hook:
    "Bir radar fotoğrafında araba kıpırdamaz; tek bir an dondurulmuştur. Yine de cezada 'o anda 92 km/sa' yazar. Duran bir karenin hızı nasıl olur? Zenon bu soruyu 2400 yıl önce havadaki bir okla sordu; cevabın ilk taslağı 1600'lerde geldi, sağlam hâli iki yüzyıl daha bekledi. Sayfada kırmızıya yapışıp ayrılan yeşil çizgi, o cevabın ta kendisi.",
  bigIdea:
    "Türev, iki yakın nokta arasındaki <strong>ortalama değişim hızının</strong> noktalar birbirine yaklaşırken yerleştiği değerdir: <em>f′(a) = lim<sub>h→0</sub> [f(a+h) − f(a)]/h</em>. Sekant teğete, ortalama hız anlık hıza dönüşür.",
  story: [
    "Teğet sorusu kalkülüsten çok eskidir. 1630'larda Pierre de Fermat bir eğrinin en yüksek noktasını ve teğetini bulmak için garip bir numara kullanıyordu: bilinmeyen küçük bir <em>e</em> miktarı ekliyor, denklemi sadeleştiriyor, sonra <em>e</em>'yi siliyordu. Yöntem işliyordu ama Fermat bile neden işlediğini tam açıklayamıyordu; <em>e</em> önce sıfır değildi (bölebilmek için), sonra sıfırdı (atabilmek için). Bugün bu, sayfadaki <strong>h</strong>'nin ta kendisidir.",
    "1665'te veba Cambridge'i kapattı; 23 yaşındaki Isaac Newton Woolsthorpe'taki aile çiftliğine çekildi ve iki yıl içinde hareket eden niceliklerin 'akış hızlarını', kendi deyişiyle <em>fluxion</em>'ları hesaplayan bir yöntem kurdu. Harfin üstüne nokta koyduğu ẋ gösterimi fizikçiler arasında hâlâ yaşar; ama Newton sonuçlarını yıllarca çekmecede tuttu. Gottfried Wilhelm Leibniz 1675 sonbaharında Paris'te aynı fikre bağımsız olarak ulaştı, bugün kullandığımız dy/dx ile ∫ sembollerini icat etti ve 1684'te <em>Acta Eruditorum</em>'da birkaç sayfalık bir makale bastırdı: türevin ilk basılı anlatımı. Sonrası çirkin bir öncelik kavgasıdır. 1712'de Royal Society'nin kurduğu komite Newton'u haklı buldu; raporu büyük ölçüde, Society'nin başkanı olan Newton'un kendisinin yazdığı sonradan anlaşıldı. Kavga İngiliz matematiğini Kıta Avrupası'ndan onlarca yıl kopardı.",
    "Yöntem işliyordu ama temeli çürüktü. 1734'te Piskopos George Berkeley, <em>The Analyst</em> adlı kitapçığında alay etti: h önce sıfır değil, sonra sıfır; bunlar 'ölmüş niceliklerin hayaletleri' değil de ne? Haklıydı. Sağlam cevap neredeyse yüz yıl sürdü. 1820'lerde Augustin-Louis Cauchy türevi, h'yi sıfır yaparak değil, fark oranının h sıfıra <em>yaklaşırken</em> yaklaştığı değer, yani bir <strong>limit</strong> olarak tanımladı. Karl Weierstrass 1860'larda Berlin derslerinde limiti ε ve δ harfleriyle, 'yaklaşmak' sözcüğüne bile ihtiyaç duymadan yazdı. Sayfadaki yeşil çizginin salınırken kırmızıya yapışıp ayrılması, bu iki yüzyıllık tartışmanın görsel özetidir.",
    "Bugün türev her yerdedir. Newton'un ikinci yasası aslında ivme, yani konumun ikinci türevi hakkında bir denklemdir; ekonomist 'marjinal maliyet' derken türev söyler; radar, hava tahmini, uçak kanadı, salgın eğrisi ve yapay zekânın eğitimi türevle yürür. Bir dil modeli 'öğrenirken' yaptığı tek şey, hatasının milyarlarca sayıya göre türevini almak ve her birini eğimin ters yönünde bir adım kaydırmaktır. Bu sayfadaki küçük yeşil sekant, o devasa makinenin en küçük dişlisidir.",
  ],
  core: [
    {
      heading: "Ortalama değişim hızı bir sekanttır",
      body:
        "İki noktayı birleştiren doğruya <strong>sekant</strong> (kesen) denir. Eğimi, dikeydeki değişimin yataydaki değişime oranıdır: a'dan a+h'ye giderken f, f(a)'dan f(a+h)'ye değişir. Bu oran bir ortalamadır; iki saatte 180 km giden arabanın 'ortalama 90 km/sa' gitmesi gibi. Sayfadaki yeşil çizgi tam bu sekanttır: bir ucu kırmızı noktada sabit, öteki ucu h kadar ötede gidip gelir. Alttaki 'secant eğimi' değeri, bu iki nokta arasındaki ortalama değişim hızıdır.",
      formula: "m<sub>sekant</sub> = [f(a+h) − f(a)] / h",
      formulaNote: "Buna fark oranı da denir. h negatif olabilir; o zaman ikinci nokta a'nın solundadır.",
    },
    {
      heading: "Limit: h'yi sıfıra götürmek, sıfır yapmak değil",
      body:
        "h'yi doğrudan sıfır yaparsan pay da payda da sıfır olur; 0/0 hiçbir şey söylemez. Numara şu: önce h ≠ 0 varsayıp oranı sadeleştir, sonra h'nin sıfıra yaklaşmasına izin ver. f(x) = x² ve a = 1 için pay (1+h)² − 1 = 2h + h²'dir; h'ye bölünce 2 + h kalır. Artık bölme yok; h küçüldükçe sonuç 2'ye yaklaşır. İşte f′(1) = 2. Sayfada x² seçili ve x = 1.00 iken 'secant eğimi' her an tam olarak 2 + h'dir; h sıfırdan geçerken 2.00'ı gösterir.",
      formula: "f′(a) = lim<sub>h→0</sub> [f(a+h) − f(a)] / h",
      formulaNote: "Limit varsa fonksiyon a'da türevlenebilir; sonuç teğetin eğimi ve anlık değişim hızıdır.",
    },
    {
      heading: "Kuvvet kuralı nereden çıkar?",
      body:
        "(a+h)ⁿ açılımında ilk terim aⁿ, ikinci terim n·aⁿ⁻¹·h, geri kalanlar h² ve daha yüksek kuvvetleri taşır. aⁿ'yi çıkarıp h'ye bölünce n·aⁿ⁻¹ + (h'li terimler) kalır; h sıfıra giderken yalnızca n·aⁿ⁻¹ ayakta kalır. Bu yüzden x² → 2x, x³ → 3x², x⁴ → 4x³. Sayfanın menüsündeki üç fonksiyon, x = 1.00'da aynı noktadan (1, 1) geçer ama teğet eğimleri 2.00, 3.00 ve 4.00'tür: üs büyüdükçe eğri aynı noktada daha dik tırmanır.",
      formula: "(xⁿ)′ = n·xⁿ⁻¹",
      formulaNote: "x³ için fark oranı tam olarak 3a² + 3ah + h²'dir; h'li iki terim limitte düşer.",
    },
    {
      heading: "Yakınlaştır: her pürüzsüz eğri yerel olarak bir doğrudur",
      body:
        "Türevin asıl gücü, eğriyi noktanın çevresinde doğruyla değiştirebilmektir. Bir parabolü tepesinden yeterince yakınlaştırırsan ekranda düz bir çizgi görürsün; o çizgi teğettir. Buna <strong>yerel doğrusallaştırma</strong> denir ve hesap makinelerinden mühendislik yaklaşımlarına kadar her yerde kullanılır. Örnek: 1.1² kaç? f(1) = 1, f′(1) = 2, h = 0.1 ise yaklaşık 1 + 2·0.1 = 1.2; gerçek değer 1.21. Hata 0.01, yani tam h²; h küçüldükçe hata h'den çok daha hızlı erir.",
      formula: "f(a+h) ≈ f(a) + f′(a)·h",
      formulaNote: "Küçük h için geçerli; sağ taraf teğet doğrusunun a+h'deki değeridir.",
    },
    {
      heading: "Sıfır eğim nerede yanıltır, türev nerede yoktur?",
      body:
        "f′(a) = 0 teğetin yatay olduğunu söyler; başka bir şey söylemez. x² için x = 0'da bu bir dip noktasıdır, ama x³ için x = 0'da eğri bir an duraklar ve tırmanmaya devam eder: ne tepe ne çukur. Türevin hiç olmadığı yerler de vardır: |x| fonksiyonunun x = 0'daki köşesinde soldan eğim −1, sağdan +1'dir; sekantlar tek bir değere yerleşmez. Pürüzsüz görünmek yetmez; limit var olmalıdır.",
      formula: "f′(a) = 0 ⇒ yalnızca aday nokta",
      formulaNote: "Tepe mi, çukur mu, hiçbiri mi? Türevin işaretinin a'nın iki yanında değişip değişmediğine bak.",
    },
  ],
  lab: {
    intro:
      "Sayfada iki kontrol var: <strong>Fonksiyon Seç</strong> menüsü (x², x³, x⁴) ve −3 ile 3 arasında 0.1 adımla kayan <strong>x Değeri (nokta)</strong> kaydırıcısı. Altındaki dört satır x, f(x), teğet eğimi f′(x) ve o andaki h ile sekant eğimini verir. h kendi kendine −0.80 ile 0.80 arasında salınır, birkaç saniyede bir tam tur atar ve her turda iki kez sıfırdan geçer. Bir uyarı: grafikte yatayda 1 birim yaklaşık 86 piksel, dikeyde yaklaşık 6.7 pikseldir; eğimler ekranda olduklarından yaklaşık 13 kat basık görünür. Sayılara güven, göze değil.",
    experiments: [
      {
        title: "Sekant, teğetten tam h kadar ayrılır",
        predict: "x² seçili ve x = 1.00 iken teğet eğimi 2.00'dır. h = 0.50 olduğu anda sekant eğimi kaç olur? h = −0.80'de?",
        do: "Menüden x² seç, kaydırıcıyı 1.0'a getir. Birkaç saniye alttaki 'h = … (secant eğimi: …)' satırını izle; h'nin 0.80, 0.00 ve −0.80 civarından geçtiği anlarda sekant eğimini not et.",
        observe: "Sekant eğimi 2.80 ile 1.20 arasında salınır ve h sıfırdan geçerken tam 2.00'ı gösterir. Hangi anda bakarsan bak, sekant eğimi eksi 2.00, ekrandaki h'ye eşittir.",
        explain: "[(1+h)² − 1]/h = 2 + h. Fark oranı h'nin basit bir fonksiyonu olunca limitin 2 olduğu çıplak gözle görülür: h'yi küçült, 2 + h 2'ye yaklaşır.",
      },
      {
        title: "Aynı nokta, üç farklı eğim",
        predict: "Kaydırıcı 1.0'da kalırken menüden x³ ve x⁴'e geçersen f(x) değişir mi? Teğet eğimi ne olur? h = 0.80 anında sekant eğimi üçünde de teğetin 0.80 üstünde mi olur?",
        do: "x = 1.0'ı sabit tut. Sırayla x², x³ ve x⁴ seç; her birinde f(x), f′(x) satırlarını ve h'nin 0.80 ile −0.80'e geldiği anlardaki sekant eğimlerini kaydet.",
        observe: "f(x) üçünde de 1.00; f′(x) sırasıyla 2.00, 3.00, 4.00. h = 0.80'de sekant eğimleri 2.80, 6.04 ve 11.87; h = −0.80'de 1.20, 1.24 ve 1.25. Üs büyüdükçe salınım teğetin iki yanında gittikçe daha asimetrik olur.",
        explain: "x² için fark oranı 2 + h'dir, h'nin iki yanında simetriktir. x³ için 3 + 3h + h², x⁴ için 4 + 6h + 4h² + h³: h² ve h³ terimleri pozitif h'de şişirir, negatif h'de kısmen dengeler. Hepsi h → 0'da düşer; limit yalnızca üs çarpı birdir.",
      },
      {
        title: "Yatay teğet, ama tepe de çukur da değil",
        predict: "x³ seçili ve x = 0.00 iken teğet eğimi kaçtır? Sekant eğimi h negatifken negatif olur mu?",
        do: "Menüden x³ seç, kaydırıcıyı tam 0.0'a getir. Kırmızı teğetin x eksenine yattığını gör, sonra sekant eğimini bir tam salınım boyunca izle. Ardından x²'ye geçip aynı şeyi yap.",
        observe: "x³'te teğet eğimi 0.00; sekant eğimi 0.00 ile 0.64 arasında gidip gelir ve asla negatif olmaz. x²'de ise sekant eğimi −0.80 ile 0.80 arasında işaret değiştirir.",
        explain: "x³ için x = 0'daki fark oranı h³/h = h²'dir: hep sıfır ya da pozitif. Eğri sıfırın iki yanında da yükselir; teğet yatay olsa bile nokta ne maksimum ne minimumdur. x² için oran h'dir; solda negatif, sağda pozitif: gerçek bir çukur.",
      },
      {
        title: "Eğim, fonksiyondan daha hızlı büyür",
        predict: "x² için kaydırıcıyı −3.0'dan 3.0'a sürersen f′(x) hangi değerler arasında değişir? f(x) ile f′(x) hangi x'te eşitlenir?",
        do: "x² seçiliyken kaydırıcıyı yavaşça sola ve sağa sür; f(x) ve f′(x) satırlarını birlikte oku. Sonra x⁴ seçip kaydırıcıyı 3.0'a götür ve kırmızı noktaya bak.",
        observe: "x²'de f′(x) tam 2x: −6.00'dan 6.00'a. x = 2.0'da f(x) = f′(x) = 4.00. x⁴'te x = 3.0 iken f(x) = 81.00, f′(x) = 108.00 ve kırmızı nokta ekranın dışındadır; çerçeve 30'da biter, eğri |x| ≈ 2.34'ten sonra kaçar.",
        explain: "Negatif x'te parabol iner, türev negatiftir; sıfırda yatay, sonra pozitif. x²'de f ile f′ sıfırda da (0 = 0), x = 2'de de (4 = 4) buluşur; x³'te buluşma x = 3'tedir: 27 = 27, kaydırıcıyı 3.0'a getirip doğrula. x⁴'ün eğimi 4x³ ile büyür: x = 3'te fonksiyonun kendisinden bile büyüktür. Sayfa ölçeği sabit olduğu için eğri çerçeveyi terk eder; sayılar yine de doğrudur.",
      },
    ],
  },
  wow: [
    {
      title: "Veba yılı, 23 yaşında bir öğrenci",
      body:
        "1665–1666'da veba Cambridge Üniversitesi'ni kapattı. Köyüne dönen Isaac Newton bu iki yılda kalkülüsün temelini, beyaz ışığın renklere ayrıldığını ve kütle çekiminin uzak cisimlere uzandığı fikrini kurdu. Yaşlılığında bu dönemi 'icat için en verimli çağım' diye andı. Sonuçlarının çoğu yirmi yıl sonra, 1687'de yayımlanan <em>Principia</em>'ya kadar çekmecede kaldı; akış hesabı kitabı ise ölümünden sonra, 1736'da basıldı.",
    },
    {
      title: "Her adımda 175 milyar türev",
      body:
        "2020'de tanıtılan GPT-3 dil modelinin 175 milyar ayarlanabilir sayısı vardı. Eğitimin her adımında bilgisayar, modelin yaptığı hatanın bu 175 milyar sayının <em>her birine</em> göre türevini hesapladı ve her sayıyı eğimin ters yönünde küçücük bir adım kaydırdı; bu, on binlerce adım boyunca tekrarlandı. Yöntemin adı <strong>gradyan inişi</strong>, türevleri zincirleme hesaplama tekniğinin adı <em>geri yayılım</em>. Bugün 'yapay zekâ öğreniyor' cümlesinin arkasında, bu sayfadaki fark oranının milyarlarca kopyası vardır.",
    },
    {
      title: "Her yerde sürekli, hiçbir yerde türevli",
      body:
        "1872'de Karl Weierstrass, grafiği kopuksuz ama hiçbir noktasında teğeti olmayan bir fonksiyon sundu: ne kadar yakınlaştırırsan yakınlaştır, eğri düzleşmez, her ölçekte titrer. Charles Hermite 1893'te bir mektupta 'türevi olmayan fonksiyonların bu acıklı belasından dehşet ve korkuyla yüz çeviriyorum' diye yazdı. Bugün o 'bela', fraktalların ve borsa fiyat eğrilerinin matematiğidir.",
    },
  ],
  worked: {
    title: "Düşen taşın anlık hızı",
    prompt:
      "Bırakılan bir taşın t saniye sonra düştüğü yol yaklaşık s(t) = 4.9·t² metredir. Taşın tam t = 2 s anındaki hızını limit tanımıyla bul; ortalama hızlarla karşılaştır.",
    steps: [
      "Fark oranını kur: [s(2+h) − s(2)]/h = [4.9·(2+h)² − 4.9·4]/h. Burada h saniye, pay metre; oranın birimi m/s.",
      "Payı aç: (2+h)² = 4 + 4h + h², yani 4.9·(4h + h²). h ≠ 0 iken h'ye böl: 4.9·(4 + h) = 19.6 + 4.9h m/s. Bu, 2 s ile 2+h s arasındaki ortalama hızdır.",
      "Sayılarla kontrol et: h = 1 s için ortalama hız 24.5 m/s; h = 0.1 s için 20.09 m/s; h = 0.01 s için 19.649 m/s. Her küçülen h sonucu 19.6'ya yaklaştırır.",
      "Limiti al: h → 0 iken 19.6 + 4.9h → 19.6. Yani v(2) = s′(2) = 19.6 m/s. Kuvvet kuralı aynı şeyi tek satırda verir: s′(t) = 9.8t, s′(2) = 19.6.",
    ],
    result:
      "Taş 2. saniyede 19.6 m/s (yaklaşık 70 km/sa) ile düşer. Hiçbir fotoğraf bunu göstermez; ama birbirine yaklaşan iki fotoğraf arasındaki ortalama hızların yerleştiği değer tam budur.",
  },
  misconceptions: [
    {
      myth: "Türev sıfırsa orası maksimum ya da minimumdur.",
      truth:
        "Yatay teğet yalnızca aday verir. Sayfada x³ seçip kaydırıcıyı 0.0'a getir: teğet yatay, ama eğri iki yanda da yükselir ve sekant eğimi hiç negatif olmaz. Karar için türevin işaretinin noktanın iki yanında değişip değişmediğine bakılır.",
    },
    {
      myth: "x² fonksiyonunun x = 3'teki türevi 9'dur.",
      truth:
        "9, fonksiyonun değeridir: f(3) = 9. Türev o noktadaki eğimdir: f′(3) = 2·3 = 6. Sayfada x²'yi seçip kaydırıcıyı 3.0'a götür; iki satır ayrı ayrı 9.00 ve 6.00 gösterir. İkisi yalnızca x = 0'da (0 = 0) ve x = 2'de (4 = 4) eşittir.",
    },
    {
      myth: "h = 0 koyunca 0/0 çıkıyor, demek ki türev tanımsız.",
      truth:
        "Limit h'yi sıfır yapmak değil, sıfıra yaklaştırmaktır. Önce h ≠ 0 iken sadeleştir: x² için fark oranı 2a + h olur, artık payda yok. Sonra h'yi küçült; 2a'ya yerleşir. 0/0 başlangıçtaki biçimdir, sonucun kendisi değil.",
    },
    {
      myth: "Grafik pürüzsüz görünüyorsa her noktada türev vardır.",
      truth:
        "|x| fonksiyonunun x = 0'daki köşesi uzaktan bakınca yumuşak görünür ama soldan eğim −1, sağdan +1'dir; tek bir teğet yoktur. Weierstrass'ın 1872 fonksiyonu daha ileri gider: sürekli olduğu hâlde hiçbir noktasında türevi yoktur. Görünüş değil, limit karar verir.",
    },
  ],
  glossary: [
    { term: "Fark oranı", definition: "[f(a+h) − f(a)]/h ifadesi; a ile a+h arasındaki ortalama değişim hızı ve sekantın eğimi." },
    { term: "Sekant", definition: "Eğri üzerindeki iki noktayı birleştiren doğru; sayfadaki yeşil çizgi." },
    { term: "Teğet", definition: "Eğriye bir noktada 'yapışan' doğru; eğimi o noktadaki türevdir, sayfadaki kırmızı çizgi." },
    { term: "Limit", definition: "Bir değişken bir değere yaklaşırken ifadenin yerleştiği değer; yaklaşmak, o değere ulaşmak demek değildir." },
    { term: "Türev f′(a)", definition: "Fark oranının h → 0 limitidir; teğet eğimi ve anlık değişim hızı aynı sayıdır." },
    { term: "Kuvvet kuralı", definition: "(xⁿ)′ = n·xⁿ⁻¹; binom açılımında h'siz tek terimin hayatta kalmasından çıkar." },
    { term: "Yerel doğrusallaştırma", definition: "f(a+h) ≈ f(a) + f′(a)·h yaklaşımı; eğriyi noktanın yakınında teğetiyle değiştirmek." },
    { term: "Türevlenebilirlik", definition: "Fark oranı limitinin var olması; köşe, sıçrama ya da dik teğet olan noktalarda bozulur." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede türev bir kurallar listesidir; üniversitede önce bir <strong>tanım</strong>a dönüşür. İlk analiz dersinde limit, Weierstrass'ın ε–δ diliyle yazılır ve 'türevlenebilen fonksiyon süreklidir' gibi cümleler ispatlanır. Ardından Ortalama Değer Teoremi gelir: iki nokta arasındaki sekantın eğimine eşit bir teğet mutlaka vardır. Bu teorem, 'iki saatte 180 km gittiysen bir an 90 km/sa gitmişsindir' cümlesinin matematiğidir. Yerel doğrusallaştırma da ilerler: teğete h² terimi, sonra h³ eklenir ve Taylor serisi doğar; hesap makinenin sin ve e<sup>x</sup> tuşlarının altında yatan fikir budur.",
      "İkinci sıçrama, birden çok değişkendir. Bir dağ yüzeyinin her yönde ayrı eğimi vardır; bunları toplayan vektöre <strong>gradyan</strong> denir ve en dik tırmanış yönünü gösterir. Yapay sinir ağı eğitmek, hatanın milyonlarca parametreye göre gradyanını zincir kuralıyla hesaplayıp (geri yayılım) her adımda eğimin tersine inmektir. Fizikte ise Newton'un F = m·a yasası aslında bir diferansiyel denklemdir: ivme konumun ikinci türevidir, denklemi çözmek yörüngeyi bulmaktır. Gezegenler de, salgın eğrileri de, köprü titreşimleri de aynı dille yazılır.",
    ],
    topics: ["ε–δ ile limit", "Ortalama Değer Teoremi", "Zincir kuralı", "Taylor serisi", "Kısmi türev ve gradyan", "Diferansiyel denklemler", "Gradyan inişi ve geri yayılım"],
  },
  quiz: [
    {
      question: "f(x) = x² fonksiyonunun x = 3 noktasındaki türevi kaçtır?",
      options: ["f′(3) = 9", "f′(3) = 6", "f′(3) = 3", "f′(3) = 0"],
      answer: 1,
      explanation: "Kuvvet kuralıyla f′(x) = 2x, f′(3) = 6. 9 ise fonksiyonun değeridir, eğimi değil. Sayfada kaydırıcıyı 3.0'a getirince iki satır 9.00 ve 6.00 gösterir.",
    },
    {
      question: "x³ fonksiyonunun x = 0 noktası için hangisi doğrudur?",
      options: ["Minimum noktasıdır", "Maksimum noktasıdır", "Teğet yataydır ama ne maksimum ne minimumdur", "Türev tanımsızdır"],
      answer: 2,
      explanation: "f′(0) = 3·0² = 0, teğet yatay. Ama eğri sıfırın solunda da sağında da yükselir; fark oranı h² hiç negatif olmaz. Yatay teğet yalnızca adaydır.",
    },
    {
      question: "x² seçili ve x = 1.00 iken h = 0.50 olduğu anda sayfanın göstereceği sekant eğimi kaçtır?",
      options: ["2.00", "2.25", "2.50", "3.00"],
      answer: 2,
      explanation: "Fark oranı [(1+h)² − 1]/h = 2 + h; h = 0.5 için 2.5. Teğet eğimi 2.00'dır ve sekant her an ondan tam h kadar ayrılır.",
    },
  ],
  next: [
    { href: "hareket-ve-grafikler.html", title: "Hareket ve Grafikler", why: "Konum grafiğinin eğimi hız, hız grafiğinin eğimi ivme: türevi birimleriyle gör." },
    { href: "integral.html", title: "İntegral", why: "Türevin ters işlemi: eğimden eğriye geri dönmek, hızdan yolu toplamak." },
    { href: "taylor-serisi.html", title: "Taylor Serisi", why: "Teğet doğrusuna h², h³ terimleri eklendiğinde yaklaşım nasıl mükemmelleşir." },
    { href: "serbest-dusme.html", title: "Serbest Düşme", why: "Çözümlü örnekteki s = 4.9t² formülünün geldiği yer; hava direnci eklenince ne değişir." },
  ],
  sources: [
    { title: "OpenStax · Calculus Vol. 1, 3.1 Defining the Derivative", url: "https://openstax.org/books/calculus-volume-1/pages/3-1-defining-the-derivative", note: "Sekanttan teğete geçiş, limit tanımı ve çözümlü örnekler (İngilizce, açık ders kitabı)." },
    { title: "3Blue1Brown · Essence of Calculus", url: "https://www.3blue1brown.com/topics/calculus", note: "Türevi görsel sezgiyle anlatan video dizisi; 'x² → 2x'in geometrik nedeni burada." },
    { title: "Wolfram MathWorld · Derivative", url: "https://mathworld.wolfram.com/Derivative.html", note: "Kısa, formül odaklı başvuru: tanım, gösterimler ve temel kurallar." },
    { title: "Wikipedia · Leibniz–Newton calculus controversy", url: "https://en.wikipedia.org/wiki/Leibniz%E2%80%93Newton_calculus_controversy", note: "Öncelik kavgasının belgeleri: 1684 makalesi, 1712 Royal Society raporu ve sonrası." },
  ],
  revision: "Ekim 2026",
};
