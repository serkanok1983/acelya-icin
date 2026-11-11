window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["av-avci-lotka-volterra"] = {
  slug: "av-avci-lotka-volterra",
  title: "Av ve Avcı: Birbirini Sürükleyen Nüfuslar",
  field: "Biyoloji",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Balıkçılık azalınca neden köpekbalıkları çoğalır? İki denklem, av ile avcının birbirini nasıl döngüye soktuğunu, hasadın avı neden artırdığını ve bol besinin dengeyi neden bozduğunu anlatır.",
  hook:
    "1914'te Fiume (bugünkü Rijeka) balık haline gelen balıkların yüzde 11.9'u köpekbalığı ve vatoz gibi yırtıcılardı; 1918'de bu pay yüzde 36.4'tü. Savaş yıllarında denize çok daha az ağ atılmıştı. Avlanmanın azalması neden avdan çok avcıya yaradı?",
  bigIdea:
    "Av ile avcı birbirinin büyüme hızını yönetir; bu gecikmeli geri besleme nüfusları döngüye sokar ve Lotka–Volterra modelinde döngünün <strong>ortalaması</strong> tam olarak dengeye eşittir: avın ortalamasını avcının, avcınınkini avın parametreleri belirlediği için iki türü birden avlamak avı çoğaltır, avcıyı azaltır.",
  story: [
    "1920'lerin ortasında İtalyan deniz biyoloğu Umberto D'Ancona, Trieste, Venedik ve Fiume balık hallerinin satış kayıtlarını savaş öncesi, savaş ve sonrası için karşılaştırıyordu. Martin Braun'un diferansiyel denklemler kitabına aldığı Fiume tablosu aradaki yılları da gösterir: yırtıcı kıkırdaklı balıkların payı 1915–1917'de %21–22'de durur, 1918'de %36.4'e fırlar, barıştan sonra geriler ve 1923'te savaş öncesinin de altına, %10.7'ye iner. İlk akla gelen açıklama yetmiyordu: savaşta az balık tutulduysa yırtıcıların yiyeceği bollaşmıştı, ama aynı ağlardan kurtulan av balıkları da çoğalmış olmalıydı. Avlanmadaki düşüş neden avcıya avdan daha çok yaramıştı? D'Ancona soruyu, o sıralar kızına kur yaptığı ve sonradan kayınpederi olacak matematikçi Vito Volterra'ya (1860–1940) götürdü. İntegral denklemleriyle ün yapmış Volterra yanıtı 1926'da yayımladı: iki türü birden azaltan avlanma avın ortalamasını yükseltir, avcınınkini düşürür; avlanma azalınca terazi avcıdan yana döner. Volterra sonradan, hesapla ve gözlemle ayrı ayrı vardıkları sonuçların uyuştuğunu görünce ikisinin de aynı ölçüde sevindiğini yazdı.",
    "Volterra yazısını yayımladığında bilmiyordu, ama aynı denklemler Atlantik'in öbür yanında zaten yazılmıştı. Amerikalı fiziksel kimyacı ve istatistikçi Alfred J. Lotka 1910'da varsayımsal bir kimyasal tepkimenin sönümlü salınımlar yapabileceğini göstermiş, on yıl sonra bir bitki ile onu yiyen bir otçul için sönümsüz salınımlar bulmuş, 1925'te <em>Elements of Physical Biology</em> kitabında da aynı denklemleri av ile avcıya uygulamıştı. Volterra kitabı sonradan öğrendi ve Lotka'nın başka bir yoldan aynı integrale, aynı faz çizimine ve küçük salınımların aynı periyoduna ulaştığını kendisi kaydetti; model bugün ikisinin adını taşır. Laboratuvar sınavı 1930'larda Moskova'dan geldi. Henüz yirmili yaşlarının başındaki Georgii Gause, 1934 tarihli <em>The Struggle for Existence</em> kitabında aynı besinle büyütülen iki <em>Paramecium</em> türünden birinin ötekini dışladığını gösterdi. Avcı siliyat <em>Didinium</em>'u <em>Paramecium</em>'la tek bir tüpe koyduğunda ise döngü değil yok oluş gördü: avcı avın hepsini yedi, sonra açlıktan öldü. Tüpe avın saklanabileceği bir tortu koyunca bu kez avcı tükendi, av kurtuldu. Salınımı ancak her üç günde bir kaba birer <em>Paramecium</em> ve <em>Didinium</em> ekleyerek sürdürebildi: modelin kapalı halkaları deneyde kendiliğinden ortaya çıkmıyordu.",
    "Sonraki kuşak modelin varsayımlarını tek tek gerçekçi kıldı. Kanadalı ekolog C. S. Holling 1959'da bir avcının tüketiminin av bollaştıkça sınırsız artmadığını, her avı yakalayıp yemek için harcanan süre yüzünden doyduğunu gösterdi; bu doyan eğri bugün <strong>Holling'in II. tip işlevsel tepkisi</strong> diye anılır. Michael Rosenzweig ile Robert MacArthur 1963'te dengeyi sıfır eğrileriyle okuyan grafik bir kural verdi: av sıfır eğrisi tümsekliyse, denge tümseğin sağında kararlı, solunda kararsızdır. Lojistik büyüyen avı doyan avcıyla birleştiren model de bugün onların adını taşır. Rosenzweig 1971'de <em>Science</em>'ta bu tür modellerin rahatsız edici bir sonucunu yayımladı: avın ortamını zenginleştirmek dengeyi bozar, döngüleri büyütür ve nüfusları yok oluşun eşiğine iter. Makalenin adı bir uyarıydı: <em>zenginleştirme paradoksu</em>. Sayfanın ikinci sekmesi tam bu modeldir.",
    "Ders kitaplarının en ünlü av–avcı grafiği ise Kanada'dan gelir: Hudson's Bay Company'nin bir yüzyılı aşan kürk alım kayıtlarında vaşak ve kar tavşanı postları yaklaşık on yılda bir tepe yapar (seriler D. A. MacLulich'in 1937 ve Charles Elton ile M. Nicholson'ın 1942 çözümlemelerinden gelir). Ama burası efsaneyle kanıtın ayrıştığı yerdir. Kayıtlar hayvan sayısını değil satın alınan postu gösterir; tuzakçılık çabası ve kürk fiyatıyla değişir. Michael Gilpin 1973'te 1875–1906 yıllarını faz diyagramına çizdi ve şaşırtıcı bir şey gördü: üç döngünün genel gidişi saat yönündeydi, yani modelin tersine; sanki tavşan avcıydı. Yazısına şakacı bir ad koydu: <em>Tavşanlar vaşak mı yer?</em> Kanıt sonunda sahadan geldi. Charles Krebs ve arkadaşları Yukon'da 1 km²'lik orman parsellerini sekiz yıl boyunca elektrikli çitle memeli avcılara kapattı ya da ek yemle besledi: çit tavşan yoğunluğunu yaklaşık iki, yem üç, ikisi birlikte on bir katına çıkardı (1995). Birlikte etki ayrı etkilerin toplamından çok büyüktü: döngüyü tek bir av–avcı çifti değil, bitki, tavşan ve avcılardan oluşan üç basamaklı bir etkileşim üretiyordu. Lotka–Volterra'nın değeri doğayı kopyalamasında değil, hangi mekanizmanın döngü ürettiğini sordurmasındadır.",
  ],
  core: [
    {
      heading: "Dört terim, dört varsayım",
      body:
        "Modelde av x ve avcı y bin birey, zaman yıl cinsindendir. <strong>αx</strong>: avcı yokken av üstel çoğalır; besini sınırsız sayılır. <strong>βxy</strong>: avlanma karşılaşmalarla, karşılaşmalar da iki yoğunluğun çarpımıyla orantılıdır; kimyadaki kütle etkisi yasasının aynısı. Avcı hiç doymaz: av on kat bollaşırsa bir avcının yediği de on kat artar. <strong>δxy</strong>: yenen avın bir kısmı yeni avcıya dönüşür; sayfanın varsayılanında δ/β = 0.1, yani yenen her on av bir avcı doğurur. <strong>γy</strong>: av yokken avcı üstel azalır. Yaş, mevsim, rastlantı ve mekân yoktur. <strong>Sıfır eğrileri</strong>, bir türün değişmediği çizgilerdir: y = α/β'nın altında av artar, üstünde azalır; x = γ/δ'nın sağında avcı artar, solunda azalır. Bu dört bölgeyi sırayla dolaşan nokta Faz diyagramında saat yönünün tersine döner: av çoğalır, ardından avcı çoğalır, av çöker, sonra avcı çöker.",
      formula: "dx/dt = αx − βxy,  dy/dt = δxy − γy",
      formulaNote: "α ve γ /yıl, β ve δ /(bin·yıl) birimindedir; varsayılan değerler α = 1, β = 0.1, δ = 0.01, γ = 0.4.",
    },
    {
      heading: "Denge, Jacobi matrisi ve korunan V",
      body:
        "İki sıfır eğrisi (x*, y*) = (γ/δ, α/β) noktasında kesişir; varsayılan değerlerle (40, 10) bin. Avın denge düzeyini avcının parametreleri, avcınınkini avın parametreleri belirler. Dengede <strong>Jacobi matrisinin</strong> köşegeni sıfırdır ve özdeğerler ±i√(αγ) çıkar: küçük bir sapma ne söner ne büyür, dengenin çevresinde T₀ = 2π/√(αγ) periyotla döner. Doğrusal çözümde av sapması cos ωt, avcınınki sin ωt gibi gider: avcı tepesi çeyrek periyot geç gelir. Gerçel kısmın tam sıfır olması doğrusal kuramın karar veremediği sınır durumudur; kararı korunan nicelik verir. V'nin türevi (δx − γ)(α − βy) + (βy − α)(δx − γ) = 0'dır, yani her yörünge V'nin bir eş-yükselti eğrisinde kalır. V'nin dengede tek çukuru olduğundan bu eğriler kapalı halkalardır ve sistem başlangıç noktasını hiç unutmaz. Bu yapı kırılgandır: avın büyümesine küçük bir sınır eklemek halkaları içe doğru sönen sarmallara, avcıya küçük bir doyma eklemek dışa doğru açılan sarmallara çevirir; ikisi birlikte ise tek bir kararlı döngü doğurabilir. Böyle bir modele <strong>yapısal olarak kararsız</strong> denir.",
      formula: "V = δx − γ ln x + βy − α ln y = sabit,  λ = ±i√(αγ)",
      formulaNote: "Varsayılanla √(αγ) = 0.6325 /yıl ve T₀ = 9.9346 yıl. Büyük döngüler eksenlere yaklaşır, orada toparlanma yavaştır; bu yüzden periyot genlikle uzar.",
    },
    {
      heading: "Kesin ortalamalar ve Volterra ilkesi",
      body:
        "Av denklemini x'e bölünce d(ln x)/dt = α − βy olur. Bir tam döngüde x başladığı değere döndüğü için sol yanın integrali sıfırdır: 0 = αT − β∫y dt, yani ⟨y⟩ = α/β. Aynı hesap avcı denkleminden ⟨x⟩ = γ/δ verir. Bu bir yaklaşım değil, kesin bir sonuçtur: genlik ne kadar büyük olursa olsun döngü ortalaması dengeye eşittir. Şimdi iki türü de kendi sayısıyla orantılı avlayan bir hasat ε ekle; ağ ya da böcek ilacı türleri ayırt etmez. Avın büyüme hızı α − ε'a düşer, avcının ölüm hızı γ + ε'a çıkar ve ortalamalar aşağıdaki gibi kayar: av artar, avcı azalır. D'Ancona'nın savaş verisi bunun tersidir: balıkçılık azalınca ε küçüldü, avcının payı büyüdü. İlke ε &lt; α oldukça geçerlidir; ε ≥ α ise av hasada dayanamaz ve iç denge kaybolur.",
      formula: "⟨x⟩ = (γ + ε)/δ,  ⟨y⟩ = (α − ε)/β",
      formulaNote: "ε = 0.2 /yıl ile ortalamalar (40, 10) bin'den (60, 8) bin'e kayar: av +ε/δ = +20, avcı −ε/β = −2 bin.",
    },
    {
      heading: "Doyan avcı, lojistik av ve Hopf çatallanması",
      body:
        "Gerçekçi sekme iki varsayımı düzeltir. Av, <strong>taşıma kapasitesi</strong> K'de durur: büyüme αx(1 − x/K) olur. Avcı da doyar: her avı yakalayıp yemek h süresi aldığından bir avcının yıllık tüketimi βx/(1 + βhx) olur ve av ne kadar bollaşırsa bollaşsın 1/h'yi aşamaz. Bu, Holling'in II. tip işlevsel tepkisidir; Michaelis–Menten enzim hızıyla aynı doyan eğri. Avcı ancak δx/(1 + βhx) = γ iken sabit kalır; buradan x* = γ/(δ − γβh) çıkar, yani x* K'ye bağlı değildir. Lojistik terim dengeyi kararlı kılar. Doyma ters yönde iter: av bollaştıkça tek bir avın yakalanma riski azalır ve av patlamaları kendini besler. Determinant hep pozitif olduğundan yarışın sonucunu Jacobi matrisinin izi belirler. İz K = K<sub>H</sub>'de sıfırdan geçer, karmaşık özdeğer çifti sanal ekseni aşar ve kararlı bir <strong>sınır döngüsü</strong> doğar: süperkritik <strong>Hopf çatallanması</strong>. Geometrisi basittir: denge av sıfır eğrisinin tümseğinin sağındaysa kararlı, solundaysa kararsızdır. K büyüdükçe tümsek sağa kayar; avı zenginleştirmek dengeyi bozar.",
      formula: "x* = γ/(δ − γβh),  K<sub>H</sub> = 2x* + 1/(βh)",
      formulaNote: "Sayfanın türleri ve h = 0.1 yıl ile x* = 66.67 bin, K<sub>H</sub> = 233.33 bin. Tümsek x = (K − 1/(βh))/2'dedir.",
    },
    {
      heading: "Rekabet: Gause ilkesi ve dört son",
      body:
        "Üçüncü sekmede iki tür birbirini yemez, aynı kaynağı paylaşır. Her biri lojistik büyür, ama ötekinin bireyleri de onun taşıma kapasitesinden yer kaplar: a₁₂, bir tür-2 bireyinin tür 1'in büyümesini kaç tür-1 bireyi kadar kıstığını söyler. Sıfır çizgileri düz doğrulardır ve sonucu onların konumu belirler. Tür 1 tek başına K₁'de otururken az sayıda tür 2 gelirse, tür 2 ancak K₂ &gt; a₂₁K₁ ise çoğalabilir; tersi de aynıdır. Buradan dört son çıkar: tür 1 kazanır, tür 2 kazanır, ikisi birlikte yaşar ya da iki tek-tür dengesi de kararlıdır ve kazananı başlangıç seçer. Son durumda iç denge bir <strong>eyerdir</strong>; onun kararlı dalı (<strong>ayrıç</strong>) düzlemi iki çekim havzasına böler. Birlikte yaşama, her türün kendini ötekinden daha çok sınırlamasını ister. Aynı tek kaynak için yarışan iki türden birinin ötekini dışlamasına <strong>rekabetçi dışlama</strong> ya da Gause ilkesi denir.",
      formula: "Birlikte yaşama ⇔ a₁₂ &lt; K₁/K₂ ve a₂₁ &lt; K₂/K₁",
      formulaNote: "Varsayılan K₁ = 100, K₂ = 80 bin ile eşikler 1.25 ve 0.8'dir; a₁₂ = 0.6 ve a₂₁ = 0.5 iki türü (74.29, 42.86) bin'de bir arada tutar.",
    },
  ],
  lab: {
    intro:
      "Sayfanın üç sekmesi var: <strong>Lotka–Volterra</strong>, <strong>Gerçekçi av–avcı</strong> ve <strong>Rekabet</strong>. Her sekmede Faz diyagramı (yatayda av x, düşeyde avcı y; Rekabet'te tür 1 ve tür 2, hepsi bin birey) ve altında zaman grafiği, yan panelde (dar ekranda sahnenin altında) <strong>Hazır deneyler</strong> düğmeleri ve değer yazılabilen kutulu kaydırıcılar bulunur; Faz diyagramına dokunmak başlangıç noktasını seçer. İlk iki sekmenin tablosu ölçüleni kuramla yan yana koyar (Nicelik, Ölçülen, Kuram, Fark); Rekabet'te her başlangıç bir satırdır ve <strong>Uyum</strong> sütunu ölçülen son durumun kuramla uyuşup uyuşmadığını söyler. Periyot ve ortalamalar ancak bir tam döngü bitince yazılır; beklememek için <strong>100 yıl ileri sar</strong> (Gerçekçi sekmede <strong>200 yıl ileri sar</strong>) düğmesine bas. Bir birey 0.001 bin'dir; nüfus bunun altına inince durum satırı uyarır.",
    experiments: [
      {
        title: "Genlik periyodu uzatır, ortalamaya dokunmaz",
        predict: "Döngüyü büyütürsen (başlangıç avı 42'den 160 bine) periyot, döngü ortalamaları ve avcı tepesinin gecikmesi nasıl değişir? Hangisi hiç kıpırdamaz?",
        do: "Lotka–Volterra sekmesinde sırayla <strong>Küçük genlik: (42, 10)</strong>, <strong>Orta genlik: (60, 10)</strong> ve <strong>Büyük genlik: (160, 10)</strong>'u seç; her birinde <strong>100 yıl ileri sar</strong>'a basıp tablonun periyot, ⟨x⟩, ⟨y⟩ ve gecikme satırlarını oku.",
        observe: "Periyot 9.9360, 10.0445 ve 11.8740 yıl: T₀ = 9.9346 yıldan +0.014 %, +1.106 % ve +19.522 % uzun. Ortalamalar üçünde de 40.0000 ve 10.0000 bin. Gecikme 0.2458·T, 0.2135·T ve 0.1197·T. Genlik düzeltmeli kuram ortadaki periyodu 10.0442 yıl olarak öngörür (fark +0.003 %); büyükte fark +0.585 %'e çıkar ve durum satırı 'Genlik büyük' diye uyarır.",
        explain: "Ortalamalar, ln x ile ln y'nin her döngüde başladığı yere dönmesinden çıkan kesin sonuçlardır; çeyrek periyot ise yalnız doğrusal kuramın sonucudur. Büyük döngü eksenlere yaklaşır: av 3.17, avcı 2.47 bine iner ve az sayıdan toparlanmak uzun sürer. Av da hızla çöker, bu yüzden avcı tepesi av tepesine yaklaşır.",
      },
      {
        title: "Ağı büyüt: Volterra ilkesi",
        predict: "Ağ iki türü de kendi sayısıyla orantılı yakalasın. Hasat hızı ε'yi 0'dan 0.2 /yıl'a çıkarınca av ortalaması azalır mı, artar mı? Avcınınki? Hasat α'yı aşınca ne olur?",
        do: "<strong>Hasat: ε = 0.2 /yıl</strong> düğmesine bas, <strong>100 yıl ileri sar</strong> ve ortalamalarla <strong>Hasat etkisi (ε = 0'a göre)</strong> kartını oku. Sonra <strong>ε · hasat hızı (iki türe)</strong> kaydırıcısını sırayla 0.10, 0.50, 1.00 ve 1.50'ye getir; her değişiklik koşuyu (60, 10)'dan yeniden başlatır.",
        observe: "ε = 0.2'de ⟨x⟩ = 60.0000, ⟨y⟩ = 8.0000 bin; kart '⟨x⟩ 40.00 → 60.00; ⟨y⟩ 10.00 → 8.00 bin' yazar. ε = 0.1'de (50, 9), ε = 0.5'te (90, 5) bin. ε = 1.00'de iç denge kaybolur: durum satırı avcının t = 8.1 yılda bir bireyin altına indiğini, avın sabit bir düzeye oturduğunu söyler. ε = 1.50'de iki tür de tükenir: avcı t = 5.2, av t = 20.7 yılda bir bireyin altına iner.",
        explain: "Hasat α'yı α − ε'a düşürür, γ'yı γ + ε'a çıkarır; ortalamalar (γ + ε)/δ ve (α − ε)/β olur. Ağ iki türü aynı oranda yakaladığı için avdaki avcı payı da ortalamaların oranıdır: ε = 0.2'de 8/68 ≈ %12, hasat durunca 10/50 = %20. Avlanma azalınca avcı payı artar; savaşta Fiume'de görülen yön budur, ama sayfanın sayıları Adriyatik'e uydurulmuş değildir.",
      },
      {
        title: "Zenginleştirme paradoksu: K'yi büyüt",
        predict: "Gerçekçi av–avcı sekmesinde avcı doyuyor (h = 0.1 yıl). Avın taşıma kapasitesini 200'den 800 bine çıkarmak, yani avın besinini bollaştırmak, iki türü daha güvenli mi kılar? Döngü ortalaması Lotka–Volterra'daki gibi yine dengeye mi eşit olur?",
        do: "Sırayla <strong>Doygun avcı: h = 0.1, K = 200</strong>, <strong>Sınır döngüsü: h = 0.1, K = 300</strong> ve <strong>Zenginleştirme: h = 0.1, K = 800</strong>'i seç; her birinde <strong>200 yıl ileri sar</strong>'a bas, tabloyu ve <strong>Son tam döngü</strong>, <strong>En düşük değerler</strong> kartlarını oku.",
        observe: "K = 200'de salınım söner: ölçülen sönüm hızı 0.0333 /yıl, kuram −Re λ = 0.0333; periyot 15.7628 yıl. K = 300'de av 10.01–210.30, avcı 4.00–23.64 bin arasında 17.44 yıllık bir sınır döngüsü kurulur; tabloda ⟨δx/(1 + βhx)⟩ = 0.400000 = γ, ama ⟨x⟩ = 93.2705 bin, yani x* = 66.6667'nin +39.906 % üstünde. K = 800'de av dipte 5.3×10⁻⁴ bine, yani 0.53 bireye iner (ilk kez t = 34.0 yılda) ve durum satırı uyarır.",
        explain: "x* = 66.67 bin K'den bağımsızdır, tümsek ise (K − 100)/2'ye kayar ve dengeyi K<sub>H</sub> = 233.33 binde geçer: denge kararsızlaşır, döngü doğar. Döngüde ln y başladığı yere döndüğü için ⟨δx/(1 + βhx)⟩ = γ kesindir; ama bu terim x'in içbükey bir fonksiyonu olduğundan (Jensen eşitsizliği) ⟨x⟩ dengeyi aşar: Lotka–Volterra'nın 'ortalama = denge' kuralı doyan avcıda bozulur. Daha çok besin daha büyük patlamalar ve daha derin çöküşler demektir; gerçek bir topluluk 0.53 bireyde tükenirdi.",
      },
      {
        title: "Rekabet: kazananı kim seçer?",
        predict: "K₁ = 100, K₂ = 80 bin. a₁₂ = 1.5 ve a₂₁ = 1.2 iken her tür ötekini kendinden çok kısıyor. Yedi başlangıçtan kaçı tür 1'e, kaçı tür 2'ye gider? Sonucu parametreler mi, başlangıç mı belirler?",
        do: "Rekabet sekmesinde <strong>Birlikte yaşama</strong>, <strong>Tür 1 kazanır</strong>, <strong>Tür 2 kazanır</strong> ve <strong>Çift kararlılık</strong> düğmelerini sırayla seç; her birinde <strong>100 yıl ileri sar</strong>'a basıp yedi satırı ve <strong>Ölçülen sonuç (7 başlangıç)</strong> kartını oku.",
        observe: "Birlikte yaşamada yedi başlangıç da E* = (74.29, 42.86) bin'e gider; yaklaşma hızı −0.2786 /yıl, en yavaş özdeğerle aynı. Tür 1 kazanırken <strong>Bir bireyin altına inme</strong> kartı 'tür 2: t = 43.72 yıl' yazar. Çift kararlılıkta sonuç kartı '5 → E₁, 2 → E₂' yazar: kesikli ayrıcın üstündeki (7.2, 94) ve (4.8, 50) tür 2'ye gider. Dört durumda 28 satırın hepsi 'uyuyor'dur.",
        explain: "K₁ = 100 &gt; K₂/a₂₁ = 66.67 ve K₂ = 80 &gt; K₁/a₁₂ = 66.67 olunca iki tek-tür dengesi de kararlıdır ve iç denge (25, 50) bin bir eyerdir. Hangi havzada başladığın kazananı belirler. Gause'un <em>Paramecium</em> deneyindeki dışlama, bir türün her başlangıçtan kazandığı durumlara karşılık gelir.",
      },
    ],
  },
  wow: [
    {
      title: "Böcek ilacı zararlıyı çoğalttığında",
      body:
        "Braun'un ders kitabının aktardığına göre, 1868'de Avustralya'dan kazara ABD'ye taşınan bir kabuklu bit (<em>Icerya purchasi</em>) Amerikan turunçgil üretimini tehdit etti. Avustralya'dan getirilen doğal avcısı, bir uğur böceği, zararlıyı düşük düzeye indirdi. DDT çıkınca turunçgil üreticileri kabuklu biti büsbütün yok etmek umuduyla ilaçladı; sonuç zararlının artması oldu. İlaç iki türü birden vuruyordu ve Volterra ilkesinin söylediği tam buydu.",
    },
    {
      title: "Gözleri bağlı bir avcı",
      body:
        "Holling 1959'da işlevsel tepkiyi ölçmek için avcı yerine bir insan kullandı. 4 santimetrelik zımpara kâğıdı diskler, kenarı yaklaşık 91 cm olan kare bir masaya raptiyeyle tutturuldu; gözleri bağlı denek bir dakika boyunca parmağıyla masaya dokunarak diskleri aradı, bulduğunu kenara koydu. Disk sayısı 4'ten 256'ya çıktıkça bulunan disk sayısı arttı ama giderek yavaşladı, çünkü her diski kaldırmak arama süresinden çalıyordu. Bu 'disk denklemi', sayfadaki βx/(1 + βhx) teriminin kendisidir.",
    },
    {
      title: "Canlı bir sistemde Hopf eşiği",
      body:
        "2000'de Gregor Fussmann ve arkadaşları, içinden sürekli besin akan kaplarda (kemostat) tek hücreli yeşil alg <em>Chlorella</em> ile beslenen <em>Brachionus</em> rotiferlerini incelediler. Akış hızını değiştirdikçe sistem, basit bir doğrusal olmayan modelin öngördüğü gibi dengeye, kalıcı döngülere ya da tükenmeye gitti. Makalelerinin adı sayfanın ikinci sekmesini özetler: <em>Canlı bir av–avcı sisteminde Hopf çatallanmasını geçmek</em>. Model döngülerin periyodunu ve faz ilişkisini ise tutturamadı; 2002'de sınanan dört açıklamadan gözlemlerle uyuşan tek açıklama, avlanmaya karşı evrimleşen alglerdi.",
    },
  ],
  worked: {
    title: "Varsayılan modelin dengesi, periyodu ve genlik düzeltmesi",
    prompt:
      "α = 1 /yıl, β = 0.1 /(bin·yıl), δ = 0.01 /(bin·yıl), γ = 0.4 /yıl. Dengeyi ve Jacobi matrisini bul, küçük salınımların periyodunu ve avcı gecikmesini hesapla; sonra periyodun genlikle nasıl uzadığını türet ve sayfanın (60, 10) bin başlangıcında ölçtüğü 10.0445 yıllık periyotla karşılaştır.",
    steps: [
      "Denge ve Jacobi matrisi: ẋ = x(α − βy) = 0 ⇒ y* = α/β = 10 bin; ẏ = y(δx − γ) = 0 ⇒ x* = γ/δ = 40 bin. J = [α − βy, −βx; δy, δx − γ] dengede [0, −4; 0.1, 0] /yıl olur: iz 0, determinant 0 − (−4)(0.1) = 0.4 /yıl². λ² + 0.4 = 0 ⇒ λ = ±0.6325i /yıl: doğrusal kuramda bir merkez.",
      "Periyot ve gecikme: T₀ = 2π/0.6325 = 9.9346 yıl. Doğrusal çözümde u = x − x* = A cos ωt ise u′ = −βx*·v'den v = y − y* = (ω/βx*)·A sin ωt = 0.158·A sin ωt çıkar: avcı tepesi T₀/4 = 2.4836 yıl sonra gelir ve 1 bin av sapmasına 0.158 bin avcı sapması eşlik eder.",
      "Hamilton biçimi: p = ln(x/x*), q = ln(y/y*) ile dp/dt = α(1 − e<sup>q</sup>), dq/dt = γ(e<sup>p</sup> − 1) olur. Bunlar H = γ(e<sup>p</sup> − 1 − p) + α(e<sup>q</sup> − 1 − q) = V − V* için dp/dt = −∂H/∂q, dq/dt = ∂H/∂p denklemleridir. Tek serbestlik dereceli bir Hamilton sisteminde periyot, H eğrisinin çevrelediği alanın H'ye göre türevidir: T = dA/dH.",
      "Alanı aç: e<sup>p</sup> − 1 − p = u²/2 dönüşümü p ≈ u − u²/6 + u³/36, yani dp ≈ (1 − u/3 + u²/12) du verir; q ile v için de aynısı. H eğrisi γu² + αv² = 2H elipsine dönüşür; tek kuvvetli terimler simetriden düşer, u² ve v² terimleri A ≈ (2πH/√(αγ))[1 + H(1/α + 1/γ)/24] verir. Türevi T ≈ T₀[1 + H(1/α + 1/γ)/12]'dir. (60, 10) için H = 0.2 − 0.4·ln 1.5 = 0.0378 ve T ≈ 9.9346 × 1.01103 = 10.0442 yıl.",
      "Sayfayla karşılaştır: Orta genlik ön ayarında ölçülen 10.0445 yıl, T₀'dan +1.106 %, düzeltmeli değerden yalnız +0.003 % farklıdır. Gecikme 2.1447 yıl = 0.2135·T'dir: genlik artık küçük olmadığı için çeyrek periyottan kısadır.",
    ],
    result:
      "Denge (40, 10) bin, özdeğerler ±0.6325i /yıl, küçük salınım periyodu 9.93 yıl. (60, 10) bin'den başlayan döngü, genliği yüzünden %1.1 daha yavaş döner, 10.04 yıl; H'de birinci mertebe düzeltme bu ölçümü %0.003 farkla tutturur.",
  },
  misconceptions: [
    {
      myth: "Bir ağ ya da ilaç iki türü aynı oranda vurursa ikisinin de ortalaması düşer.",
      truth:
        "Lotka–Volterra'da avın ortalaması (γ + ε)/δ'ya çıkar, avcınınki (α − ε)/β'ya iner: ε = 0.2 /yıl ile (40, 10) bin'den (60, 8) bin'e. Avcının ortalamasını avın büyüme hızı, avınkini avcının ölüm hızı belirler. İlke ε &lt; α oldukça geçerlidir; daha güçlü bir hasat avı da tüketir.",
    },
    {
      myth: "Avcı tepesi her zaman av tepesinden çeyrek periyot sonra gelir.",
      truth:
        "Çeyrek periyot doğrusal kuramın, yani küçük genliğin sonucudur. Sayfada gecikme (42, 10) başlangıcında 0.2458·T, varsayılan (60, 10)'da 0.2135·T, (160, 10)'da 0.1197·T'dir: büyük döngüde av hızla çöker ve avcı tepesi av tepesine yaklaşır. Gerçek sistemlerde gecikmeyi biyoloji de değiştirir: rotifer–alg kemostatlarında gözlenen faz ilişkisini basit model tutturamadı.",
    },
    {
      myth: "Avın besinini bollaştırmak (K'yi büyütmek) ekosistemi her zaman daha kararlı yapar.",
      truth:
        "Doyan avcıyla tersi olabilir: h = 0.1 yılda K, K<sub>H</sub> = 233.33 bini aşınca denge kararsızlaşır ve bir sınır döngüsü doğar. K = 800'de av döngünün dibinde 0.53 bireye iner; gerçek bir topluluk orada tükenirdi. Paradoks küçük ölçekli laboratuvar deneylerinde görülmüştür ama doğada desteği sınırlıdır; yenmeyen av türleri, avın saklanabildiği sığınaklar ve avcıların kalabalıkta artan ölümü gibi etkenlerin dengeyi koruyabildiği düşünülür.",
    },
    {
      myth: "Kanada'daki vaşak–kar tavşanı döngüsü Lotka–Volterra modelini kanıtlar.",
      truth:
        "Kürk kayıtları hayvan sayısını değil satın alınan postu gösterir. Lotka–Volterra döngüsünün genliği başlangıca bağlıdır ve en küçük değişiklikte bozulur; yıllarca yaklaşık on yıllık periyotla tekrarlayan bir döngü daha çok bir sınır döngüsüne benzer. Gilpin verinin bazı yıllarda modelin tersi yönde döndüğünü gösterdi; Yukon'daki saha deneyleri de döngüde besinin ve avcıların birlikte rol oynadığını gösterdi.",
    },
  ],
  glossary: [
    { term: "Faz diyagramı", definition: "Eksenleri iki nüfus olan düzlem; her an bir nokta, zaman içindeki değişim bir yörüngedir." },
    { term: "Sıfır eğrisi", definition: "Bir türün değişim hızının sıfır olduğu eğri; iki türün sıfır eğrilerinin kesiştiği yer dengedir." },
    { term: "Merkez", definition: "Komşu bütün yörüngelerin çevresinde kapalı halkalar çizdiği denge; doğrusallaştırmada özdeğerleri tam sanaldır, ama tam sanal özdeğer tek başına merkezi garanti etmez." },
    { term: "Korunan nicelik", definition: "Her yörünge boyunca sabit kalan durum fonksiyonu; Lotka–Volterra'da V = δx − γ ln x + βy − α ln y." },
    { term: "İşlevsel tepki", definition: "Bir avcının birim zamanda yediği av sayısının av yoğunluğuna bağlılığı; II. tip tepki işleme süresi yüzünden 1/h'de doyar." },
    { term: "Sınır döngüsü", definition: "Yalıtılmış kapalı yörünge; kararlıysa komşu yörüngeleri kendine çeker ve genliğini başlangıç değil parametreler belirler." },
    { term: "Hopf çatallanması", definition: "Bir parametre değişirken karmaşık özdeğer çiftinin sanal ekseni geçtiği, kararlı odağın kararsızlaşıp bir sınır döngüsü doğurduğu eşik." },
    { term: "Rekabetçi dışlama", definition: "Aynı tek kaynakla sınırlanan iki türün kararlı biçimde bir arada yaşayamayacağı ilkesi; Gause ilkesi de denir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede av–avcı ilişkisi bir besin zinciri okudur; üniversitede <strong>doğrusal olmayan bir diferansiyel denklem sistemidir</strong>. <strong>Diferansiyel Denklemler</strong> dersinde faz düzlemi, sıfır eğrileri, Jacobi matrisiyle doğrusallaştırma ve özdeğerlere göre denge türleri (düğüm, odak, eyer, merkez) öğretilir; Lotka–Volterra bu konuların klasik örneğidir ve çözümlü örnekteki hesap tipik bir sınav sorusudur. <strong>Dinamik Sistemler</strong> dersinde soru 'çözüm nedir?'den 'yörüngeler ne yapar?'a döner: korunan nicelikler, yapısal kararlılık, sınır döngüleri, Hopf çatallanması ve <strong>Poincaré–Bendixson teoremi</strong>. Teorem, düzlemde sınırlı kalan bir yörüngenin bir dengeye, bir kapalı yörüngeye ya da dengeleri birleştiren yörüngelerden oluşan bir çevrime yaklaştığını söyler; iki türlü bir modelde kaos bu yüzden olamaz. Üç tür yeter: Alan Hastings ile Thomas Powell 1991'de üç basamaklı bir besin zinciri modelinde kaotik bir çekici buldu.",
      "<strong>Matematiksel Biyoloji</strong> ve <strong>Ekoloji</strong> derslerinde model genelleşir: Kolmogorov'un ẋ = x·f(x, y), ẏ = y·g(x, y) biçimindeki genel av–avcı sistemleri, işlevsel tepki türleri, yaş yapısı, mekân ve rastlantı. Gause'un tüplerinde döngüyü ancak dışarıdan eklenen bireyler sürdürdü; Huffaker de 1958'de portakallar arasında yaşattığı akarlarda salınımları ancak engellerle bölünmüş karmaşık bir düzen kurunca birkaç tur sürdürebildi. Homojen bir kapta çabuk çöken av–avcı çiftlerini göç ve parçalı mekân ayakta tutar; 0.53 bireylik bir dip ise deterministik modelin sustuğu yerde stokastik modellerin yok oluş olasılığını hesapladığını hatırlatır. Aynı denklemler başka derslerde de çıkar: <strong>Kimyasal Kinetik</strong>'te Lotka'nın kendi kendini çoğaltan tepkimeleri ve salınan kimyasal tepkimeler; evrimsel oyun kuramında <em>replikatör dinamiği</em>: n stratejili replikatör denklemi, n − 1 türlü genelleştirilmiş bir Lotka–Volterra sistemine denktir.",
    ],
    topics: ["Faz düzlemi ve doğrusallaştırma", "Korunan nicelikler ve Hamilton sistemleri", "Yapısal kararlılık", "Sınır döngüleri ve Poincaré–Bendixson", "Hopf çatallanması", "Stokastik ve mekânsal nüfus modelleri", "Kolmogorov sistemleri", "Replikatör dinamiği"],
  },
  quiz: [
    {
      question: "Yalnız avcıları öldüren bir hastalık γ'yı 0.4'ten 0.8 /yıl'a çıkarıyor; α = 1, β = 0.1, δ = 0.01 aynı kalıyor. Lotka–Volterra modelinde döngü ortalamaları ne olur?",
      options: ["(40, 5) bin: avcı ortalaması yarıya iner", "(80, 10) bin: av ortalaması iki katına çıkar, avcınınki değişmez", "(80, 5) bin: av iki katına çıkar, avcı yarıya iner", "(20, 10) bin: av ortalaması yarıya iner"],
      answer: 1,
      explanation: "⟨x⟩ = γ/δ = 0.8/0.01 = 80 bin, ⟨y⟩ = α/β = 1/0.1 = 10 bin. Avcının ortalamasında γ yoktur: avcıyı vurmak avcının değil avın ortalamasını değiştirir. Daha kırılgan bir avcı ölümünü ancak daha çok avla karşılar ve döngü avı o düzeye taşır. Sayfada γ kaydırıcısını 0.80'e getirip 100 yıl ileri sararak doğrulayabilirsin: (80.0000, 10.0000) bin.",
    },
    {
      question: "Gerçekçi modelde h = 0.1 yıl, β = 0.1 /(bin·yıl) ve x* = 66.67 bin. K = 300 bin iken iç denge ne yapar?",
      options: ["Kararlıdır, çünkü av bol", "Kararsızdır: K, K<sub>H</sub> = 233.33 bini aştığı için bir sınır döngüsü oluşur", "Avcı yaşayamaz, çünkü x* &gt; K", "Merkezdir: Lotka–Volterra gibi kapalı döngüler oluşur"],
      answer: 1,
      explanation: "K<sub>H</sub> = 2x* + 1/(βh) = 133.33 + 100 = 233.33 bin. Tümsek (300 − 100)/2 = 100 bindedir; denge (66.67) tümseğin solunda kalır ve kararsızdır. Sayfa K = 300'de av için 10.01–210.30 bin arasında bir sınır döngüsü ölçer.",
    },
    {
      question: "Rekabet sekmesinde K₁ = 100 ve K₂ = 80 bin. İki türün kararlı biçimde birlikte yaşaması için hangisi gerekir?",
      options: ["a₁₂ &lt; 1.25 ve a₂₁ &lt; 0.8", "a₁₂ &gt; 1.25 ve a₂₁ &gt; 0.8", "a₁₂ = a₂₁", "r₁ &gt; r₂"],
      answer: 0,
      explanation: "Her tür ötekinin tek başına oturduğu dengeye girip çoğalabilmelidir: K₁ &gt; a₁₂K₂ ve K₂ &gt; a₂₁K₁, yani a₁₂ &lt; K₁/K₂ = 1.25 ve a₂₁ &lt; K₂/K₁ = 0.8. İkisi de tersine dönerse çift kararlılık olur. Büyüme hızları r sonucu değil, yalnız hızı değiştirir.",
    },
  ],
  next: [
    { href: "lorenz-cekici.html", title: "Lorenz Çekicisi", why: "Düzlemde kaos olamaz, üç boyutta olabilir: üçüncü bir değişken eklenince yörüngelerin garip bir çekiciye nasıl dolandığını gör." },
    { href: "enzim-kinetigi.html", title: "Enzim Kinetiği Laboratuvarı", why: "Holling'in II. tip tepkisiyle aynı doyan eğri: Michaelis–Menten'deki V<sub>max</sub> ve K<sub>m</sub>, burada 1/h ve 1/(βh)." },
    { href: "dogal-secilim.html", title: "Doğal Seçilim: Popülasyon Genetiği Laboratuvarı", why: "Avcı avın evrimini de yönlendirir: Göç, mutasyon, doğa sekmesinde kuşların açık ve koyu güveleri ne oranda yediğine bak, koyu forma karşı seçilimi ayarla. Rotifer–alg döngülerini değiştiren de hızla evrimleşen alglerdi." },
    { href: "diferansiyel-denklemler.html", title: "Diferansiyel Denklemler ve Dinamik Sistemler", why: "Lojistik denklem, faz düzlemi ve Euler yönteminin hatası. Euler'in kaba adımı Lotka–Volterra'nın kapalı halkalarını dışa açılan sarmallara çevirir; bu sayfanın RK4 kullanmasının nedeni budur." },
  ],
  sources: [
    { title: "Wikipedia · Lotka–Volterra equations", url: "https://en.wikipedia.org/wiki/Lotka%E2%80%93Volterra_equations", note: "Model, korunan nicelik, dengeler ve tarihçe: Lotka 1910–1925, Volterra 1926 ve D'Ancona'nın Adriyatik verisi (İngilizce)." },
    { title: "Wikipedia · Paradox of enrichment", url: "https://en.wikipedia.org/wiki/Paradox_of_enrichment", note: "Rosenzweig'ın 1971'de altı modelde gösterdiği etki, Hopf çatallanmasıyla bağı ve paradoksu doğada yumuşatabilecek etkenler (İngilizce)." },
    { title: "Wikipedia · Competitive Lotka–Volterra equations", url: "https://en.wikipedia.org/wiki/Competitive_Lotka%E2%80%93Volterra_equations", note: "İki türlü rekabet modeli, sıfır çizgileri ve olası sonuçlar (İngilizce)." },
    { title: "OpenStax · Biology 2e, 45.6 Community Ecology", url: "https://openstax.org/books/biology-2e/pages/45-6-community-ecology", note: "Açık lisans biyoloji kitabının topluluk ekolojisi bölümü: vaşak–kar tavşanı döngüsü ve iki Paramecium türüyle rekabetçi dışlama ilkesi (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
