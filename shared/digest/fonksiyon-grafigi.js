window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["fonksiyon-grafigi"] = {
  slug: "fonksiyon-grafigi",
  title: "Fonksiyon Grafiği: Bir Kuralın Portresi",
  field: "Matematik",
  level: "Lise",
  minutes: 30,
  tagline:
    "Tekrar eden sinüs, ondan çeyrek periyot önde giden kosinüs, simetrik parabol, durdurulamayan eˣ ve onun aynası ln x. Grafik bir kuralı tek bakışta gösterir; ama yalnızca pencerenin içini.",
  hook: "Ekrandaki sinüs dalgası aslında 865 noktadır: bilgisayar dalgayı hiç görmez, yalnızca 865 sayı hesaplar ve aralarını cetvelle birleştirir; dalgayı tamamlayan senin gözündür. Peki hiçbir kalemin, hiçbir ekranın çizemeyeceği bir fonksiyon var mı? Var; üstelik bilgisayar onu çizmeye kalkarsa kendinden emin bir yalan söyler.",
  bigIdea:
    "Bir fonksiyonun grafiği, her x'i tek bir y'ye bağlayan kuralın <strong>(x, f(x)) noktalarından oluşan resmidir</strong>: periyot, simetri, asimptot ve büyüme hızı bu resimden okunur; ama ekran yalnızca seçtiğin pencereyi ve ölçeği gösterir, son sözü bu yüzden cebir söyler.",
  story: [
    "Grafik fikri, koordinat sisteminden yaklaşık üç yüz yıl yaşlıdır. 14. yüzyılın ortasında Paris'te çalışan Nicole Oresme, ısı ya da hız gibi 'niteliklerin' şiddetini resmetmenin bir yolunu aradı. Yatay bir çizgi üzerinde zamanı işaretledi; her anın hızını o noktaya dikilen dikey bir çizginin boyuyla gösterdi. Düzgün hızlanan bir cismin çizgilerinin uçları eğik bir doğru oluşturuyordu ve ortaya çıkan şeklin <strong>alanı</strong> alınan yola karşılık geliyordu. Oresme bu şekilden, düzgün hızlanan bir cismin ortalama hızla giden bir cisimle aynı yolu aldığını geometrik olarak gösterdi; Galileo aynı sonucu iki yüzyıldan fazla sonra ünlü yapacaktı. Bugün bir hız–zaman grafiğinin altındaki alanı yola eşitlerken Oresme'nin dilini konuşuyoruz.",
    "Asıl sıçrama 1630'larda geldi. René Descartes, 1637'de <em>Yöntem Üzerine Konuşma</em>'nın eki olarak yayımladığı <em>La Géométrie</em>'de bir eğriyi bir denkleme, bir denklemi bir eğriye çevirmenin yolunu gösterdi. Pierre de Fermat aynı fikre bağımsız olarak ulaşmıştı; kısa metni 1630'ların ikinci yarısından itibaren elden ele dolaştı ama ancak ölümünden sonra, 1679'da basıldı. Descartes'ın yatağında tavandaki bir sineği izlerken koordinat fikrini bulduğu anlatılır; bu hikâyenin belgesi yoktur. İşin ironisi şu: <em>La Géométrie</em>'de bugün alıştığımız, iki dik ekseni ve eksi sayıları olan kareli düzlem yoktur. 'Kartezyen düzlem' adını Descartes'ın Latince adı Cartesius'tan alır, bugünkü biçimini ise sonraki kuşaklar verdi.",
    "Ama 'fonksiyon' sözcüğü henüz ortada yoktu. Leibniz onu 1673'te, bir eğriye bağlı nicelikler için, örneğin bir noktanın koordinatı ya da eğrinin o noktadaki eğimi için kullandı. Johann Bernoulli 1718'de fonksiyonu 'bir değişken ve sabitlerden oluşan herhangi bir ifade' diye tanımladı; f(x) yazımını 1730'larda Leonhard Euler ve Alexis Clairaut yerleştirdi. Euler'in 1748'de yayımlanan <em>Introductio in analysin infinitorum</em>'u fonksiyonu analizin merkezine koydu: sin, cos, eˣ ve ln artık birer hesap tablosu değil, kendi başına incelenen nesnelerdi. 19. yüzyılda kavram formülden de kurtuldu: Lobaçevski (1834) ve Dirichlet (1837), her x'e tek bir y karşılık getiren kuralın tek bir formülle yazılmak zorunda olmadığını söyledi.",
    "Bugün grafiklerin çoğu bir ekranda doğar ve ekranın kendi kuralları vardır. Bu sayfa eğriyi 720 × 400 piksellik bir tuvale sığdırır, yatay ve dikey ölçeği birbirinden bağımsız seçer ve tuvalin dışına taşan her şeyi sessizce keser. Ekrandaki resim bu yüzden üç kararın ürünüdür: hangi fonksiyon, hangi pencere, hangi ölçek. Aynı sin x bir ölçekte yumuşak bir tepe, başka bir ölçekte sivri bir diş gibi görünür; aşağıdaki deneylerin çoğu bu farkı yakalamak üzerine kurulu. Oresme'nin dikey çizgileriyle bilgisayarın pikselleri arasındaki fark yalnızca derecededir; ikisi de sonsuz bir nesnenin sonlu bir portresidir.",
  ],
  core: [
    {
      heading: "Grafik bir nokta kümesidir",
      body: "<strong>Fonksiyon</strong>, bir girdi kümesindeki her x'e <em>tek bir</em> y atayan kuraldır. Grafik, bu eşleşmelerin hepsini (x, f(x)) noktaları olarak düzleme dökmektir: sin için (0, 0), (π/2, 1), (π, 0)… Her x'e tek y düştüğü için dikey bir çizgi grafiği en fazla bir kez keser; buna <strong>dikey çizgi testi</strong> denir. Çember bu testten geçemez: x² + y² = 1 birim çemberinde x = 0'a hem y = 1 hem y = −1 düşer, bu yüzden çember tek başına bir fonksiyon grafiği değildir. Fonksiyonun değer üretebildiği x'lerin kümesine <strong>tanım kümesi</strong>, ürettiği y'lerin kümesine <strong>görüntü kümesi</strong> denir.",
      formula: "Grafik(f) = { (x, f(x)) : x ∈ tanım kümesi }",
      formulaNote:
        "Grafik, kuralın kendisi kadar bilgi taşır: grafiği tam bilen, fonksiyonu da bilir.",
    },
    {
      heading: "Tekrar eden dalgalar: sin ve cos",
      body: "Sinüs ve kosinüs, birim çember üzerinde dönen bir noktanın yüksekliği ve yatay konumudur. Nokta bir tam tur, yani 2π ≈ 6.28 radyan dönünce her şey baştan başlar: bu, <strong>periyottur</strong>. Kosinüs yeni bir eğri değildir; sinüsün π/2 ≈ 1.57 birim sola kaydırılmış hâlidir. Simetriler de grafikten okunur: cos(−x) = cos x olduğu için kosinüs y eksenine göre ayna simetriktir (<strong>çift fonksiyon</strong>, x² gibi); sin(−x) = −sin x olduğu için sinüs orijin etrafında 180° döndürülünce kendine oturur (<strong>tek fonksiyon</strong>). İkisinin de görüntü kümesi [−1, 1]'dir; hiçbir x bu dalgaları 1'in üstüne çıkaramaz.",
      formula: "sin(x + 2π) = sin x  ·  cos x = sin(x + π/2)",
      formulaNote: "x radyan cinsindendir; derece kullanılsaydı periyot 360 olurdu.",
    },
    {
      heading: "Üstel büyüme: her adımda e katı",
      body: "x² 'x kere x'tir; eˣ'te ise x üstte durur ve bu her şeyi değiştirir: x bir artınca değer e ≈ 2.718 ile çarpılır. eˣ toplayarak değil çarparak büyür: x = 0'da 1, x = 1'de 2.72, x = 2'de 7.39, x = 6.3'te 545. Sola gidince her adımda e'ye bölünür ve sıfıra yaklaşır ama asla ulaşmaz; y = 0 doğrusu eˣ'in yatay <strong>asimptotudur</strong>. e sayısı, Jacob Bernoulli'nin 1683'te incelediği bileşik faiz probleminden çıkar: faizi yılda n kez işletirsen (1 + 1/n)ⁿ, n büyüdükçe 2.71828…'e yaklaşır. eˣ'in en zarif özelliği, her noktadaki eğiminin o noktadaki yüksekliğine eşit olmasıdır.",
      formula:
        "e<sup>x+1</sup> = e · e<sup>x</sup>  ·  e = lim<sub>n→∞</sub> (1 + 1/n)<sup>n</sup>",
      formulaNote:
        "Polinomlar sonunda kaybeder: eˣ, x ≈ −0.70'in sağında x²'den hep büyüktür ve her xⁿ'i eninde sonunda geçer.",
    },
    {
      heading: "Ters fonksiyon: ln x, eˣ'in aynası",
      body: "ln x şu soruyu cevaplar: e'yi kaçıncı kuvvete yükseltirsem x çıkar? ln 1 = 0, çünkü e⁰ = 1; ln e = 1. ln, eˣ'in yaptığını geri alır; bu yüzden eˣ grafiğindeki her (a, b) noktası ln grafiğinde (b, a) olarak belirir. Koordinatların yer değiştirmesi, düzlemi y = x doğrusuna göre aynalamaktır. Kümeler de yer değiştirir: eˣ her sayıyı kabul eder ama yalnızca pozitif değer üretir; ln yalnızca pozitif sayıları kabul eder ama her değeri üretebilir. eˣ'in yatay asimptotu y = 0 ise ln'in düşey asimptotu x = 0'dır. Üstel fonksiyon ne kadar hızlı koşuyorsa logaritma o kadar yavaş yürür: ln 1 000 000 yalnızca 13.8'dir.",
      formula: "y = ln x  ⇔  x = e<sup>y</sup>   (x > 0)",
      formulaNote:
        "ln(a·b) = ln a + ln b: çarpmayı toplamaya çevirir. John Napier'in 1614'te yayımladığı logaritma tablolarının hesapçılara kazandırdığı şey buydu.",
    },
    {
      heading: "Pencere ve ölçek: ekran neyi gösterir?",
      body: "Ekran, sonsuz bir eğrinin yalnızca bir dikdörtgenini gösterir ve yatay ile dikey için iki ayrı ölçek seçer. Bu sayfada yatay yarıçap r ise bir birim 324/r piksel, dikey yarıçap s ise 168/s piksel tutar. Açılışta sin için r = 2π, s = 4'tür: yatayda bir birim yaklaşık 52, dikeyde 42 piksel. Menüden başka bir eğriye geçip sin'e dönünce ya da Görünümü sıfırla'ya basınca s = 2.5 olur ve dikey birim 67 piksele çıkar. İki ölçek farklı olunca eğimler çarpılır: sin'in orijindeki gerçek eğimi 1'dir, eşit ölçekte 45°'lik bir çizgi; ekranda ise açılışta yaklaşık 39°, s = 2.5 iken 52–53° görünür. Pencerenin dışı da sessizdir: eˣ tuvalin tepesinden çıktıktan sonra da büyümeye devam eder. Göz yön gösterir, karar cebirindir.",
      formula: "ekran<sub>x</sub> = 360 + 324·(x − m)/r",
      formulaNote:
        "m görünümün merkezi, r kaydırıcıdaki yarıçap; 720 piksellik genişliğin ortası 360'tır. Dikeyde aynı rolü 200 ve 168 oynar ve piksel aşağı doğru artar.",
    },
  ],
  lab: {
    intro:
      "Eksenlerde sayı yok: değerleri ızgaradan, görünen aralığı üstteki <code>x ∈ [ … ]</code> okumasından alırsın. Dört kontrol var, bir de bilmen gereken iki tuzak.<br>· <strong>Fonksiyon</strong> menüsü (sin, cos, x², eˣ, ln x) her seçimde pencerenin merkezini ve dikey yarıçapını ayarlar, yatay yarıçapa dokunmaz: sin ve cos orijinde, dikey yarıçap 2.5; x² ve eˣ için merkez y = 2, dikey yarıçap 5 ve 6; ln x için merkez x = 3, dikey yarıçap 3.<br>· <strong>Görünen x aralığı (yarıçap)</strong> kaydırıcısı 2 ile 20 arasında, 0.5 adımla, yalnızca yatay ölçeği değiştirir.<br>· <strong>Sürüklemek</strong> grafiği kaydırır. Fare tekerleği ya da dizüstü dokunmatik yüzeyinde iki parmakla kaydırma, iki ekseni tuvalin merkezi etrafında birlikte yakınlaştırır (yarıçaplar 0.5 ile 30 arasında kalır). Kod yalnızca tekerlek hareketini dinler; telefonda iki parmakla sıkıştırmak işe yaramaz.<br>· <strong>Görünümü sıfırla</strong> merkezi ve dikey yarıçapı menü değerlerine döndürür; yatay yarıçap kaydırıcıda ne varsa o olur.<br>· <em>Tuzak 1:</em> Sayfa ilk açıldığında sin dikeyde ±4 birimle çizilir. Başka bir eğriye geçip sin'e dönünce ya da sıfırlayınca dikey yarıçap 2.5 olur ve aynı dalga daha yüksek görünür.<br>· <em>Tuzak 2:</em> Açılışta kaydırıcı 6.5'te durur ama gerçek yarıçap 2π'dir; kaydırıcıyı oynatınca seçtiğin değere geçer. Yanındaki etiket 6 ve üstündeki her değerde '2π' yazar, yarıçapı okumadan al.<br>Izgara: dikey çizgiler yarıçap 3'e kadar 0.25, 3 ile 8 arasında 0.5, 8'in üstünde 1 birim arayla; yatay çizgiler dikey yarıçapa göre 0.5, 1 ya da 2 birim arayla. Parlak iki çizgi eksenlerdir. Tuval okunan aralıktan iki yanda yüzde 11 kadar geniştir; eğri her iki kenara yaklaşık 20 piksel kala biter.",
    experiments: [
      {
        title: "π ızgaraya hiç oturmaz",
        predict:
          "y = sin(x) eğrisi x eksenini 0'ın sağında ilk kez nerede keser? Izgara 0.5 arayla dizilmişken bu nokta bir çizginin tam üstüne düşer mi? Yarıçap 20 olunca kaç kesişim beklersin?",
        do: "Sayfayı aç ya da menüden y = sin(x)'i seç; okuma yaklaşık x ∈ [−6.3, 6.3] olsun (Görünümü sıfırla'ya bastıysan [−6.5, 6.5] görünür; o da olur). Sağdaki kesişimleri ızgarayla karşılaştır. Sonra kaydırıcıyı sonuna kadar sağa it ve okuma [−20.0, 20.0] olunca kesişimleri say.",
        observe:
          "İlk görünümde tam iki dalga ve beş kesişim vardır: 0, ±π, ±2π. 0'ın sağındaki ilk kesişim 3 çizgisinin biraz sağındadır; ikincisi 6 çizgisinin sağında ve kayma tam iki katına çıkmıştır (0.14 yerine 0.28 birim). Yarıçap 20'de ızgara 1 birime geçer, dalgalar sıkışıp sivrileşir; kesişimler 13 tanedir (0'dan ±6π ≈ ±18.85'e) ve ardışık ikisi arasında hep yaklaşık 3.14 kare vardır.",
        explain:
          "sin, x = kπ noktalarında sıfırdır. π = 3.14159… iki tam sayının oranı olarak yazılamaz (irrasyoneldir); bu yüzden 0.5 ya da 1 birimlik hiçbir ızgara çizgisine tam oturmaz ve kayma her kesişimde birikir. 40 birimlik aralığa 40/2π ≈ 6.4 dalga sığar. Dalgaların sivrileşmesi fonksiyonun değil, yatay ölçeğin değişmesinin sonucudur.",
      },
      {
        title: "Kosinüs, kılık değiştirmiş sinüs",
        predict:
          "y = cos(x) grafiğini ne kadar, hangi yöne kaydırırsan ekranın ortası sinüsten ayırt edilemez hâle gelir? Bir tam periyot mu, yarım mı, çeyrek mi?",
        do: "Önce menüden y = cos(x)'i, ardından y = sin(x)'i seç ve bu sinüse iyi bak: tepeler, x ekseninden itibaren ikinci yatay çizgiye (y = 1) değer. Açılıştaki sinüsü değil bunu kullan. Sonra yeniden y = cos(x)'i seç ve grafiği yatay olarak sağa sürükle; okumadaki iki sayı da yaklaşık 1.6 azalınca dur (yarıçap 2π iken [−7.9, 4.7]). Dikeyde kaymamaya çalış.",
        observe:
          "Tuvalin ortasında eğri artık yükselerek x eksenini kesiyor ve tepeler yine y = 1 çizgisine değiyor: menüden seçtiğin sinüsün aynısı. Fark yalnızca eksenlerde: parlak dikey çizgi, yani y ekseni, ortanın sağına kaymıştır; 0.5'lik üç ızgara karesinden biraz fazla, yaklaşık 1.57 birim.",
        explain:
          "cos x = sin(x + π/2): kosinüs, sinüsün çeyrek periyot (π/2 ≈ 1.57) sola kaydırılmış hâlidir. Ekranın ortasında artık x = −π/2 durur ve cos(−π/2 + t) = sin t olduğu için orada sinüs görünür. Açılıştaki sinüsle karşılaştırsaydın dalga basık kalırdı: sayfa onu dikeyde ±4 birimle çizer, menüden seçilen sin ve cos'u ±2.5 birimle. Fonksiyon aynı, ölçek farklı.",
      },
      {
        title: "Ayna: eˣ ve ln x",
        predict:
          "eˣ y eksenini hangi yükseklikte keser, solda x eksenine değer mi? ln x, x eksenini nerede keser ve y ekseninin solunda ne çizer?",
        do: "Kaydırıcıyı 6.5'e getir; okuma 6.5 göstermiyorsa kaydırıcıyı bir adım oynatıp geri al. Menüden y = eˣ'i seç: y eksenini kestiği yere, sağda tuvalden çıktığı yere, solda eksene ne kadar yaklaştığına bak. Sonra y = ln(x)'i seç ve aynı soruları sor.",
        observe:
          "eˣ, y eksenini x ekseninin hemen üstündeki ilk yatay çizgide (burada çizgiler 1 birim arayla, yani y = 1) keser; sağda x ≈ 2.2'de tuvalin tepesinden çıkar, oysa okuma 6.5'e uzanır; solda x ≈ −3'ten sonra eksene yapışık görünür. ln x'te y ekseninin solu boştur; eğri x eksenini sağdaki ikinci dikey çizgide (x = 1) keser, y = 1 çizgisine 2.5 ile 3 çizgileri arasında ulaşır ve 0'a yaklaşırken tuvalin altından kaçar.",
        explain:
          "İki eğri birbirinin tersidir: (0, 1) ↔ (1, 0), (1, e) ↔ (e ≈ 2.72, 1). eˣ hep pozitiftir; x = −3'te 0.05'tir ve bu görünümde eksene uzaklığı çizginin kendi kalınlığından azdır: ekran sıfırı değil, çözünürlüğün sınırını gösterir. eˣ hiçbir zaman 0 ya da negatif olmadığı için ln de yalnızca x > 0'da tanımlıdır. Yansıma y = x'e göredir, ama eksen ölçekleri farklı olduğu için ekranda tam ayna gibi durmaz.",
      },
      {
        title: "Yakından bakınca sinüs bir doğrudur",
        predict:
          "Orijine yeterince yaklaşırsan sin x eğrisi neye benzer? x = 0.5'te sin x, 0.5'e ne kadar yakındır?",
        do: "Menüden y = sin(x)'i seç (zaten seçiliyse Görünümü sıfırla'ya bas) ve grafiği sürükleme. Fare tekerleğini ya da dokunmatik yüzeyi yakınlaştırma yönünde, okuma x ∈ [−0.5, 0.5] olana ve görüntü artık değişmeyene kadar çevir.",
        observe:
          "Dalga kaybolur, orijinden geçen neredeyse düz bir çizgi kalır. Dikey ızgara 0.25 arayla, yatay çizgiler y = −0.5, 0 ve 0.5'tedir. Sağ kenardaki x = 0.5 çizgisinde eğri, y = 0.5 çizgisinin birkaç piksel altından geçer. Çizgi 45° değil, yaklaşık 27° eğik görünür.",
        explain:
          "Küçük radyan değerlerinde sin x ≈ x: sin 0.5 = 0.479, fark yüzde 4. Bir sonraki düzeltmeyle sin x ≈ x − x³/6 = 0.4792. Sarkaç formülünü mümkün kılan küçük açı yaklaşımı tam budur. Eğim gerçekte 1'dir; yatık görünmesinin nedeni bu yakınlıkta yatayda bir birimin 648, dikeyde 336 piksel tutmasıdır.",
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
      body: "Dirichlet'nin 1829'daki makalesinde tanımladığı fonksiyon, x kesirli (rasyonel) bir sayıysa 1, değilse 0 değerini alır. Her aralıkta hem rasyonel hem irrasyonel sayı bulunduğu için grafiği iki yatay çizginin üzerine serpilmiş, kopuk kopuk bir toz bulutudur; hiçbir kalem onu çizemez. Bilgisayar daha da kötüsünü yapar: bilgisayardaki her ondalıklı sayı, paydası 2'nin kuvveti olan bir kesirdir. Bu sayfanın yöntemiyle örneklenseydi 865 noktanın hepsi rasyonel çıkar ve ekranda kendinden emin, düz bir y = 1 çizgisi görünürdü.",
    },
  ],
  worked: {
    title: "eˣ ekrandan nerede kaçar?",
    prompt:
      "Sayfada y = eˣ seçilince pencerenin merkezi y = 2'ye, dikey yarıçap 6'ya ayarlanır. Çizim alanı 400 piksel yüksekliktedir ve merkezden bir dikey yarıçap 168 piksel tutar. Eğri tuvalin tepesinden hangi x değerinde çıkar? Aynı hesabı x² (merkez y = 2, dikey yarıçap 5) için yap.",
    steps: [
      "Tuvalin üst kenarı merkezden 200 piksel yukarıdadır. 168 piksel 6 birimse 200 piksel 6 × 200/168 ≈ 7.14 birimdir. Üst kenar y = 2 + 7.14 = 9.14'te, alt kenar y = 2 − 7.14 = −5.14'tedir.",
      "eˣ = 9.14 denklemini çöz. Bilinmeyen üstte olduğu için tersi olan ln'i kullan: x = ln 9.14 ≈ 2.21. Kontrol: e<sup>2.21</sup> ≈ 9.1.",
      "x² için üst kenar 2 + 5 × 200/168 ≈ 7.95'tir. x² = 7.95 ⇒ x = ±√7.95 ≈ ±2.82. Parabol çift fonksiyon olduğu için tuvali iki yerden, simetrik olarak terk eder.",
      "Pencerenin dışını düşün: yarıçap 2π iken okuma x = 6.3'e kadar uzanır, ama e<sup>6.3</sup> ≈ 545'tir. Tuval dikeyde 14.3 birim kapsadığına göre o nokta, tuvalin üst kenarından yaklaşık 37.5 tuval boyu daha yukarıdadır.",
    ],
    result:
      "eˣ x ≈ 2.21'de, x² x ≈ ±2.82'de ekrandan çıkar. Sayfada eˣ'i seçip tuvalin tepesine bak: eğri, x = 2 çizgisinin biraz sağında kenara değer. 'Nerede?' sorusunu cevaplamak için çoğu zaman fonksiyonun tersine ihtiyaç vardır.",
  },
  misconceptions: [
    {
      myth: "sin x'teki x derecedir; dalga 360'ta tekrar eder.",
      truth:
        "Bilimsel hesapta ve bu sayfada x radyandır; periyot 2π ≈ 6.28'dir. Açılıştaki okuma x ∈ [−6.3, 6.3] iken ekranda tam iki dalga vardır. x derece olsaydı bu 12.6 birimlik aralıkta bir dalganın yalnızca yüzde 3.5'i görünür ve eğri neredeyse düz bir çizgi olurdu.",
    },
    {
      myth: "eˣ yeterince solda x eksenine değer, sonra negatif olur.",
      truth:
        "eˣ her x için pozitiftir: e<sup>−10</sup> ≈ 0.000045 bile sıfır değildir. Ekranda x ≈ −3'ten sonra eğri eksene yapışık görünür, çünkü aradaki mesafe çizginin kalınlığından incedir. Boşluğu görmek için grafiği sağa ve yukarı sürükle: okumanın ortası −4 olsun (yarıçap 2π iken yaklaşık [−10.3, 2.3]), parlak x ekseni de tuvalin dikey ortasına gelsin. Sonra tekerlekle yakınlaştırma durana kadar yakınlaş: sağa doğru genişleyen, birkaç piksellik bir boşluk açılır. Yalnızca yatay sürüklersen yakınlaştırma y = 2 etrafında olur ve x ekseni tuvalin altından kaçar.",
    },
    {
      myth: "Ekranda dik görünen eğri hızlı değişiyordur.",
      truth:
        "Diklik ölçeğe bağlıdır. Kaydırıcı yalnızca yatay ölçeği değiştirir: menüden başka bir eğriye geçip sin'e döndükten sonra yarıçap 2'de orijindeki eğri yaklaşık 22°, yarıçap 20'de 76° eğik görünür; gerçek eğim ikisinde de 1'dir. Değişim hızını sayılardan oku, piksellerden değil.",
    },
    {
      myth: "ln 0 = 0'dır; negatif sayıların logaritması da negatif çıkar.",
      truth:
        "ln x, 'e'nin kaçıncı kuvveti x eder?' sorusunun cevabıdır ve eˣ hiçbir zaman 0 ya da negatif olmaz; bu yüzden ln 0 ve ln(−2) reel sayılarda tanımsızdır. Sıfır olan ln 1'dir. Sayfa x ≤ 0 için değer üretmez: y ekseninin solu boş kalır, x 0'a yaklaşırken eğri sınırsızca aşağı iner.",
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
        "Fonksiyonun değer üretebildiği girdilerin kümesi; ln x için (0, ∞).",
    },
    {
      term: "Görüntü kümesi",
      definition:
        "Fonksiyonun aldığı bütün çıktı değerlerinin kümesi; sin x için [−1, 1].",
    },
    {
      term: "Periyot",
      definition:
        "Fonksiyonun kendini tekrar ettiği en küçük pozitif yatay kayma; sin ve cos için 2π.",
    },
    {
      term: "Asimptot",
      definition:
        "Eğrinin sonsuza giderken sınırsızca yaklaştığı doğru; eˣ için y = 0, ln x için x = 0.",
    },
    {
      term: "Ters fonksiyon",
      definition:
        "f'nin eşlemesini geri alan fonksiyon; grafiği, f'nin grafiğinin y = x doğrusuna göre yansımasıdır.",
    },
    {
      term: "Radyan",
      definition:
        "Çemberde yarıçap uzunluğundaki yayı gören merkez açı; bir tam tur 2π ≈ 6.28 radyandır.",
    },
    {
      term: "Çift ve tek fonksiyon",
      definition:
        "f(−x) = f(x) ise çift (y eksenine göre simetrik: x², cos x), f(−x) = −f(x) ise tek (orijine göre simetrik: sin x).",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Üniversitede fonksiyon, iki küme arasındaki bir eşleme olarak yeniden tanımlanır ve yeni sorular doğar: farklı girdiler hep farklı çıktılara mı gider (<strong>birebir</strong>), her olası çıktıya ulaşılır mı (<strong>örten</strong>)? Ters fonksiyon ancak ikisi birden sağlanınca vardır; bu yüzden hedef kümeyi söylemek şarttır. eˣ: ℝ → ℝ örten değildir, çünkü hiçbir x negatif bir değer vermez; ama eˣ: ℝ → (0, ∞) hem birebir hem örtendir ve tersi ln: (0, ∞) → ℝ'dir. Sinüs birebir değildir, aynı değeri sonsuz kez alır; bu yüzden arcsin tanımlanırken sinüs [−π/2, π/2] aralığına kısıtlanır. Analiz dersleri sayfadaki 'pencere' sezgisini kesin dile çevirir: limit, süreklilik ve asimptot ε ve δ ile tanımlanır. Ardından Fourier gelir: pratikte karşılaşılan periyodik sinyallerin çok geniş bir sınıfı, sin ve cos dalgalarının toplamı olarak yazılabilir; ses sıkıştırma ve görüntü işleme bu fikre dayanır.",
      "Menüdeki fonksiyonlar üniversitede tek bir aileye dönüşür. eˣ, türevi kendisine eşit olan fonksiyondur: y′ = y diferansiyel denklemini ve y(0) = 1 koşulunu sağlayan tek fonksiyon. Genel denklem y′ = k·y'nin çözümleri ise y = C·e<sup>kx</sup> biçimindedir: k > 0 ise büyüme (sürekli bileşik faiz), k < 0 ise sönüm (radyoaktif bozunma). 'Değişim hızı miktarla orantılı' olan her şey bu tek denklemle yazılır. Karmaşık sayılara geçince Euler'in 1748'deki <em>Introductio</em>'da yer alan formülü e<sup>iθ</sup> = cos θ + i·sin θ, üstel fonksiyonla sinüs ve kosinüsün aynı nesnenin farklı yüzleri olduğunu gösterir. Bilgisayar biliminde ise log n, n² ve 2ⁿ eğrilerinin yarışı, bir algoritmanın milyon kat büyük veride hâlâ çalışıp çalışmayacağına karar verir.",
    ],
    topics: [
      "Birebir ve örten fonksiyonlar",
      "Ters trigonometrik fonksiyonlar",
      "ε–δ ile limit ve süreklilik",
      "Fourier serileri",
      "Euler formülü",
      "Diferansiyel denklemler",
      "Asimptotik analiz (büyük O)",
    ],
  },
  quiz: [
    {
      question:
        "(2, e²) noktası y = eˣ grafiğindedir. Hangi nokta kesinlikle y = ln x grafiğindedir?",
      options: ["(2, ln 2)", "(e², 2)", "(−2, e²)", "(2, 1/e²)"],
      answer: 1,
      explanation:
        "ln, eˣ'in tersidir ve ters fonksiyonda koordinatlar yer değiştirir: ln(e²) = 2. Bu, iki grafiğin y = x doğrusuna göre birbirinin aynası olmasının nokta nokta ifadesidir. Sayfada da eˣ'in (0, 1)'den, ln x'in (1, 0)'dan geçtiğini görürsün.",
    },
    {
      question:
        "Sayfada y = sin(x) seçiliyken okuma x ∈ [−20.0, 20.0] gösteriyor. Bu aralıkta yaklaşık kaç tam dalga vardır?",
      options: ["Yaklaşık 3", "Yaklaşık 6", "20", "40"],
      answer: 1,
      explanation:
        "Aralığın genişliği 40 birim, sinüsün periyodu 2π ≈ 6.28'dir: 40/6.28 ≈ 6.4, yani altı tam dalga ve biraz fazlası. x derece olsaydı 40 birim bir dalganın yalnızca dokuzda biri ederdi; sayfa radyanla çalışır.",
    },
    {
      question:
        "'Görünen x aralığı (yarıçap)' kaydırıcısını 2'den 20'ye çıkarınca sin(x)'in orijindeki eğimine ne olur?",
      options: [
        "On kat artar",
        "Değişmez; yalnızca ekrandaki görünüşü dikleşir",
        "Sıfıra iner",
        "On kat azalır",
      ],
      answer: 1,
      explanation:
        "Kaydırıcı fonksiyonu değil, yatay ölçeği değiştirir. Yarıçap büyüyünce bir birim daha az piksele sığar ve eğri ekranda dikleşir: sayfa yeni açılmışken yaklaşık 14.5°'den 69°'ye, menüden başka bir eğriye geçip sin'e döndükten sonra 22°'den 76°'ye. Ama sin'in orijindeki eğimi her zaman cos 0 = 1'dir.",
    },
  ],
  next: [
    {
      href: "birim-cember.html",
      title: "Birim Çember",
      why: "Sinüs ve kosinüsün doğduğu yer: açı kaydırıcısını 0°'dan 360°'ye sür; cos θ 0°'da, sin θ 90°'de 1'e ulaşır. Çeyrek turluk farkı orada gözünle gör.",
    },
    {
      href: "turev.html",
      title: "Türev",
      why: "Burada sürekli andığımız 'gerçek eğim' nedir? x², x³ ve x⁴ üzerinde kesen doğrunun, h küçüldükçe teğete dönüşmesini izle.",
    },
    {
      href: "taylor-serisi.html",
      title: "Taylor Serisi",
      why: "x − x³/6 düzeltmesinin devamı: sin ve cos'u terim terim polinomla kur, terim sayısı arttıkça [−2π, 2π]'deki en büyük hatanın eridiğini izle.",
    },
    {
      href: "algoritma-karmasikligi.html",
      title: "Algoritma Karmaşıklığı",
      why: "log n, n, n log n, n² ve 2ⁿ yan yana, logaritmik ölçekte: eˣ ile ln x'in hız farkı, programların milyon kat büyük veride ayakta kalıp kalmayacağını belirler.",
    },
  ],
  sources: [
    {
      title: "OpenStax · Precalculus 2e",
      url: "https://openstax.org/details/books/precalculus-2e",
      note: "Fonksiyonlar, dönüşümler, üstel–logaritmik ve trigonometrik fonksiyonların grafikleri; çözümlü örnekler (İngilizce, açık ders kitabı).",
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
  revision: "Ekim 2026",
};
