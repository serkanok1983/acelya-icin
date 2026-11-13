window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["taylor-serisi"] = {
  slug: "taylor-serisi",
  title: "Taylor Serisi: Tek Noktadan Ne Kadar Uzağa?",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir fonksiyonun tek noktadaki türevleri, onu o noktanın çevresinde taklit eden bir polinom kurar. Ne kadar uzağa kadar? Hatayı Lagrange kalanı, menzili karmaşık düzlemdeki tekillikler belirler.",
  hook:
    "x = 1.2'de 1/(1 + x²) yaklaşık 0.41'dir; aynı fonksiyonun 0'daki türevlerinden kurulan seriyi 60. dereceye kadar toplarsan yaklaşık 33 255 bulursun ve terim ekledikçe sonuç daha da kaçar. Fonksiyon gerçel eksenin hiçbir yerinde kopmaz, köşe yapmaz, sonsuz kez türevlenebilir. Seriyi durduran duvar karmaşık düzlemde, ±i noktalarında duruyor.",
  bigIdea:
    "Taylor polinomu bir fonksiyonu tek noktadaki türevlerinden kurar, <em>P<sub>n</sub>(x) = Σ f<sup>(k)</sup>(a)(x − a)<sup>k</sup>/k!</em>; hatasını Lagrange kalanı sınırlar, sonsuz serinin menzilini ise karmaşık düzlemdeki en yakın tekillik belirler.",
  story: [
    "Sinüs, kosinüs ve arctan için bugün her kalkülüs kitabında duran sonsuz seriler ilk kez Avrupa'da değil, Hindistan'ın güneybatı kıyısındaki Kerala'da ortaya çıktı. Sangamagramalı astronom Madhava (y. 1340–1425) ya da onun izinden giden Kerala okulu bu serileri yay ve yarıçap diliyle, dizeler hâlinde yazdı; π/4 = 1 − 1/3 + 1/5 − … de bunların arasındadır. Kanıt konusunda dürüst olmak gerekir: Madhava'nın bu serileri açıkça içeren bir metni günümüze ulaşmadı. Bildiklerimiz, serileri ona açıkça atfeden ve nasıl türetildiklerini de anlatan Nilakantha Somayaji (1444–1544) ile Jyeshthadeva'nın (y. 1500–1575) eserlerinden gelir. Okul yavaş seriyle yetinmedi: Sankara Variar'ın 16. yüzyıl şerhi Yukti-dipika'daki dizeler, arctan serisine x = 1/√3 koymakla elde edilen π = √12·(1 − 1/(3·3) + 1/(3²·5) − …) serisini de verir; her terim hatayı kabaca üçte birine indirir. Madhava'nın kullandığı π değeri 3.1415926535922 olarak aktarılır: on bir ondalığa kadar doğru, hatası 2.4·10<sup>−12</sup>. Bu bilginin Avrupa'ya ulaştığı iddiası ise belgeyle kanıtlanmış değildir.",
    "Avrupa aynı serileri 17. yüzyılda yeniden buldu. Isaac Newton 1669'da elden ele dolaşan (basılması 1711'i bulan) <em>De analysi</em> adlı çalışmasında sinüs ve kosinüs serilerini verdi. James Gregory 1671 başında John Collins'e yazdığı mektupta arctan, tan ve sec serilerini gönderdi. Genel yöntemi de bulduğu yalnızca karalama kâğıtlarından anlaşılıyor: Newton'un yöntemini yeniden keşfettiğini sandığı için nasıl bulduğunu hiç yazmadı. Genel formülü 1715'te Brook Taylor <em>Methodus Incrementorum Directa et Inversa</em> kitabında bastırdı: sonlu farklarla kurulan bir enterpolasyon formülünde adımı sıfıra götürerek. Colin Maclaurin 1742'deki <em>Treatise of Fluxions</em>'ta a = 0 özel hâlini yaygın bir araç yaptı ve formülü Taylor'a atfetti; yine de bu hâl bugün onun adıyla, Maclaurin serisi diye anılır. Bu kuşak serileri cesurca kullandı ama iki soruyu pek sormadı: polinomu kesince hata ne kadardır ve sonsuz toplam gerçekten fonksiyonun kendisine mi gider?",
    "Sorular 1797'de Joseph-Louis Lagrange'ın <em>Théorie des fonctions analytiques</em> kitabında ciddileşti. Lagrange bütün kalkülüsü kuvvet serileri üzerine kurmak, türevi limitle değil serinin katsayısıyla tanımlamak istiyordu. Aynı kitapta hatayı bilinmeyen bir ara noktadaki türevle yazan kalanı verdi; bugün <strong>Lagrange kalanı</strong> dediğimiz ifade budur. Program, her fonksiyonun bir kuvvet serisine eşit olduğu varsayımına dayanıyordu. 1820'lerde Augustin-Louis Cauchy bu varsayımı tek bir örnekle yıktı: e<sup>−1/x²</sup> fonksiyonunun 0'daki bütün türevleri sıfırdır, serisi her yerde 0'a yakınsar, ama fonksiyon x ≠ 0'da sıfır değildir. Seriler yine de vazgeçilmez kaldı; ama bir fonksiyonun hangi aralıkta kendi serisine eşit olduğu artık ayrıca kanıtlanması gereken bir soruydu. En temiz cevabı karmaşık sayılar verdi: seri, açılım noktasından en yakın karmaşık tekilliğe kadar yakınsar.",
    "Seriler bir de sayı makinesidir. Leibniz serisi π'yi bulur ama çok yavaş: bir ondalık daha için on kat terim ister. 1706'da İngiliz matematikçi John Machin daha akıllı bir yol buldu: π/4 = 4·arctan(1/5) − arctan(1/239). Küçük argümanlarda arctan serisi hızla söner; Machin π'yi elle 100 ondalığa kadar hesapladı. Sonuç, William Jones'un aynı yıl yayımlanan <em>Synopsis Palmariorum Matheseos</em> kitabında duyuruldu; çemberin çevresinin çapına oranı için π harfini ilk kullanan da o kitaptır. 20. yüzyılın ortalarına kadar π'nin rekor hesaplarının çoğu Machin türü arctan formülleriyle yapıldı. Sayfanın üçüncü sekmesi bu yarışı yeniden oynatır: aynı arctan serisi, sınırda (x = 1) ve sınırdan uzakta (x = 1/5)."
  ],
  core: [
    {
      heading: "Bir noktada türevleri eşleştirmek",
      body:
        "Bir fonksiyonu a noktasının çevresinde taklit etmek istiyorsun. En kaba taklit sabit P<sub>0</sub>(x) = f(a)'dır. Eğimi de tutturursan teğet doğrusu P<sub>1</sub> çıkar, bükülmeyi de tutturursan bir parabol P<sub>2</sub>. Genel kural: P<sub>n</sub>, a'da f ile aynı değere ve aynı ilk n türeve sahip, derecesi en çok n olan tek polinomdur. Katsayıların k!'ye bölünmesi bir muhasebe gereğidir: (x − a)<sup>k</sup>'nin k. türevi k!'dir, bu yüzden c<sub>k</sub> = f<sup>(k)</sup>(a)/k! seçilince P<sub>n</sub>'nin k. türevi a'da tam f<sup>(k)</sup>(a) olur. sin x'in a = 0'daki türevleri 0, 1, 0, −1, 0, 1, … diye döner; sayfanın katsayı tablosunda c<sub>3</sub> = −0.166667 (−1/6) ve c<sub>5</sub> = 0.00833333 (1/120) görünür. eˣ'in bütün türevleri eˣ olduğundan katsayıları 1/k!'dir. √(1 + x) = 1 + x/2 − x²/8 + … ise Newton'un genelleştirilmiş binom serisidir.",
      formula: "P<sub>n</sub>(x) = f(a) + f′(a)(x − a) + f″(a)(x − a)²/2! + … + f<sup>(n)</sup>(a)(x − a)<sup>n</sup>/n!",
      formulaNote:
        "a = 0'da Maclaurin serisi: sin x = x − x³/3! + x⁵/5! − …, eˣ = 1 + x + x²/2! + …, 1/(1 − x) = 1 + x + x² + …",
    },
    {
      heading: "Lagrange kalanı: hatanın garantisi",
      body:
        "Polinomu n. derecede kesince geriye bir kalan kalır: R<sub>n</sub>(x) = f(x) − P<sub>n</sub>(x). Ortalama değer teoreminin genellemesi, bu kalanın tek bir terim gibi yazılabildiğini söyler; yalnız türev a ile x arasındaki bilinmeyen bir ξ noktasında alınır. ξ'yi bilmesen de |f<sup>(n+1)</sup>|'in o aralıktaki en büyük değeri M'yi biliyorsan hatayı sınırlarsın. sin x'te M ≤ 1'dir; [−π/2, π/2]'de P<sub>5</sub> için sınır (π/2)<sup>6</sup>/6! = 0.02086, sayfanın ölçtüğü en büyük hata 0.004525. Bir numara daha var: sin'in çift dereceli katsayıları sıfır olduğundan P<sub>5</sub> = P<sub>6</sub>'dır; aynı polinoma bir derece yukarıdan bakınca sınır (π/2)<sup>7</sup>/7! = 0.004682 olur, ölçülenin yalnızca yüzde 3.5 üstünde. Sınır bir garantidir, tahmin değil: ln(1 + x) için x &lt; −1/2'de seri yakınsadığı hâlde Lagrange sınırı n ile büyür.",
      formula: "R<sub>n</sub>(x) = f<sup>(n+1)</sup>(ξ)·(x − a)<sup>n+1</sup>/(n + 1)!,   |R<sub>n</sub>(x)| ≤ M·|x − a|<sup>n+1</sup>/(n + 1)!",
      formulaNote:
        "ξ, a ile x arasındadır; n = 0 için ortalama değer teoreminin kendisidir. Sayfadaki «Lagrange sınırı» kartı bu sayıyı bütün [a − d, a + d] aralığı için verir.",
    },
    {
      heading: "Yakınsaklık yarıçapı: seriyi karmaşık düzlem durdurur",
      body:
        "n sonsuza gidince P<sub>n</sub> bir <strong>kuvvet serisine</strong> dönüşür. Böyle bir seri hep a merkezli bir aralıkta yakınsar: |x − a| &lt; R iken yakınsar, |x − a| &gt; R iken terimleri büyür ve ıraksar; tam |x − a| = R'de her şey olabilir. R'yi katsayılar söyler: kök testi |c<sub>k</sub>|<sup>−1/k</sup> ve (limiti varsa) oran testi |c<sub>k</sub>/c<sub>k+1</sub>| aynı sayıya gider. Peki fonksiyon gerçel eksenin her yerinde pürüzsüzken 1/(1 + x²) için neden R = 1? Çünkü seri karmaşık z için de geçerlidir ve a merkezli bir diskte yakınsar; disk, fonksiyonun sonsuza gittiği noktaları içine alamaz. 1 + z² = 0'ın kökleri z = ±i birer kutuptur ve 0'a uzaklıkları 1'dir; a'yı kaydırınca R = √(1 + a²) olur. eˣ, sin, cos gibi tam fonksiyonların sonlu tekilliği yoktur, R = ∞. 1/(1 − x)'te engel gerçel eksendeki kutup, ln(1 + x) ve √(1 + x)'te x = −1'deki dal noktasıdır.",
      formula: "1/R = limsup<sub>k→∞</sub> |c<sub>k</sub>|<sup>1/k</sup>,   R = a'dan en yakın karmaşık tekilliğe uzaklık",
      formulaNote:
        "Cauchy–Hadamard formülü. Sınırda davranış seriden seriye değişir: ln(1 + x) x = 1'de yavaşça ln 2'ye yakınsar, 1/(1 + x²) x = 1'de 1, 1, 0, 0, … diye gidip gelir.",
    },
    {
      heading: "Seriler sayı makinesidir: terim başına kaç basamak?",
      body:
        "Yarıçapın içinde hata, derece başına aşağı yukarı q = |x − a|/R oranıyla küçülür; her derece log<sub>10</sub>(1/q) doğru basamak getirir. Leibniz serisi π/4 = arctan 1'dir: x = 1 tam sınırdadır, q = 1 ve kazanç sıfıra gider; N terimde π'nin hatası yaklaşık 1/N'dir, bir basamak için on kat terim gerekir. Machin'in hilesi, arctan'ı sınırdan uzakta kullanmaktır. arctan serisinde yalnız tek dereceler vardır; her terim iki derece atlar ve bir öncekini yaklaşık x² = 1/25 ile çarpar: terim başına log<sub>10</sub> 25 = 1.40 basamak. 1/239'lu parça terim başına 4.76 basamakla çok daha hızlıdır; toplam hızı yavaş olan belirler. ln 2 = 2·artanh(1/3) de aynı fikirdir: terim başına log<sub>10</sub> 9 = 0.95 basamak. eˣ'te R = ∞ olduğundan e = Σ 1/k! geometrikten de hızlıdır: N. terim log<sub>10</sub> N basamak getirir ve kazanç giderek artar.",
      formula: "π/4 = 4·arctan(1/5) − arctan(1/239),   arctan x = x − x³/3 + x⁵/5 − …",
      formulaNote:
        "Sayfa formülü π = 16·arctan(1/5) − 4·arctan(1/239) diye yazar ve iki seriyi de N terimle toplar.",
    },
    {
      heading: "Pürüzsüz ama analitik değil: e<sup>−1/x²</sup>",
      body:
        "Bir fonksiyonun a'daki Taylor serisi a'nın bir çevresinde fonksiyonun kendisine yakınsıyorsa, fonksiyon a'da <strong>analitiktir</strong>. Sonsuz kez türevlenebilir olmak bunun için yetmez. f(x) = e<sup>−1/x²</sup>, f(0) = 0 fonksiyonunu al: x → 0'da e<sup>−1/x²</sup>, 1/x'in her kuvvetinden hızlı söner; bu yüzden 0'daki bütün türevleri sıfırdır ve Maclaurin serisi baştan sona 0'dır. Seri her x için yakınsar (R = ∞) ama fonksiyona değil: f(0.5) = 0.0183, f(1) = 0.368. Fonksiyon 0'ın çevresinde öyle düzdür ki f(0.1) ≈ 3.7·10<sup>−44</sup>. Karmaşık düzlem yine açıklar: z = iy koyunca e<sup>1/y²</sup> çıkar ve y → 0'da patlar; 0 bir <strong>esaslı tekilliktir</strong>. Pürüzsüzlük her noktada türev olmasıdır; analitiklik ise bir noktadaki türevlerin fonksiyonu bütün bir çevrede belirlemesi. Bu fonksiyonlar boşuna değildir: parçaları pürüzsüzce birbirine yapıştıran 'tümsek' fonksiyonları bunlarla kurulur.",
      formula: "f(x) = e<sup>−1/x²</sup> (x ≠ 0), f(0) = 0  ⇒  f<sup>(k)</sup>(0) = 0 her k için",
      formulaNote: "Taylor serisi her yerde 0'a yakınsar; fonksiyona yalnızca x = 0'da eşittir.",
    },
  ],
  lab: {
    intro:
      "Sayfada üç sekme var. <strong>Polinom yaklaşımı</strong>: sekiz fonksiyon, açılım noktası a ve ölçüm aralığının yarı genişliği d (kutulara π/2 gibi ifadeler yazılabilir), derece n (0–40) ve tolerans. Kartlar [a − d, a + d]'deki en büyük ölçülen |f − P<sub>n</sub>|'yi, Lagrange sınırını ve hatanın toleransın altında kaldığı en geniş aralığı verir. <strong>Yakınsaklık yarıçapı</strong>: bir x noktasında hatanın dereceyle değişimini, oran ve kök testlerini, yalnız kısmi toplamlardan bulunan «gözlenen sınırı» ve tekillikleri gösteren karmaşık düzlemi çizer. <strong>Sayıları hesaplamak</strong>: e, π (Leibniz, Machin) ve ln 2 için terim sayısına karşı doğru basamak, altında da küçük açı yaklaşımı. Sayım kuralına dikkat: ilk iki sekme dereceyi n sayar (n + 1 terim), üçüncüsü terim sayısı N'yi; Machin'de iki arctan'ın her biri N terimle toplanır. Çift duyarlığın ayırt edemeyeceği kadar küçük hatalar (ilk sekmede yuvarlama düzeyinin 10, ikincide 8 katının altı) sayı olarak değil, «yuvarlama düzeyinde» diye yazılır.",
    experiments: [
      {
        title: "sin x: ölçülen hata ve Lagrange sınırı",
        predict:
          "sin x'i [−π/2, π/2]'de P<sub>1</sub>, P<sub>3</sub>, P<sub>5</sub> ve P<sub>7</sub> ile yaklaşık. Derece 2 artınca en büyük hata kaç kat küçülür? Lagrange sınırı ölçülen hatanın kaç katı çıkar?",
        do: "<strong>Polinom yaklaşımı</strong> sekmesinde <strong>sin x, d = π/2</strong> düğmesine bas (n = 1). <strong>Polinomun derecesi n</strong> kaydırıcısını 3, 5 ve 7'ye getir; her adımda «En büyük |f − P<sub>n</sub>|», «Lagrange sınırı» ve «(n + 2). türevle ikinci sınır» kartlarını yaz.",
        observe:
          "Ölçülen: 0.5708, 0.07517, 0.004525, 0.0001569; hepsi x = ±π/2 uçlarında. Lagrange: 1.234, 0.2537, 0.02086, 0.0009193. İkinci sınır: 0.6460, 0.07969, 0.004682, 0.0001604. n = 5'te hatanın 10<sup>−2</sup>'nin altında kaldığı aralık [−1.761, 1.761], sınırın garanti ettiği [−1.393, 1.393].",
        explain:
          "M = 1 alınan sınır (π/2)<sup>n+1</sup>/(n + 1)! hep tutar ama 2 ile 6 kat kabadır. Çift katsayılar sıfır olduğundan P<sub>n</sub> = P<sub>n+1</sub>: bir derece yukarıdan bakmak ilk atılan terimi verir, alterne seride hata ondan biraz küçüktür. Faktöriyel kuvveti yener: ilk atılan terim her adımda (π/2)²/((n + 3)(n + 4)) ile çarpılır, yani 8, 17, 29 kat küçülür; ölçülen 7.6, 16.6, 28.8.",
      },
      {
        title: "Pürüzsüz ama ıraksak: 1/(1 + x²)",
        predict:
          "1/(1 + x²) gerçel eksende hiç kopmaz. 0'daki serisi x = 0.9'da yakınsar mı, x = 1.2'de? Hata derece başına hangi oranla değişir?",
        do: "<strong>Yakınsaklık yarıçapı</strong> sekmesinde <strong>1/(1 + x²), x = 0.9</strong> düğmesine, sonra <strong>x = 1.2</strong> düğmesine bas (N = 60). «Hatanın derece başına oranı · ölçülen» kartını «Oran · kuram |x − a|/R» ile karşılaştır, karmaşık düzleme bak. Son olarak <strong>a =</strong> kutusuna 1 yaz.",
        observe:
          "x = 0.9'da 60. derecede hata 0.0008042, oran 0.9003 (kuram 0.9000). x = 1.2'de hata 0.59'dan (n = 0) 3.325·10<sup>4</sup>'e (n = 60) büyür, S<sub>60</sub> ≈ 33 255; oran 1.201 (kuram 1.200). Gözlenen sınır iki yanda 1.000. Düzlemde ±i'de iki kırmızı ×. a = 1'de R = 1.4142 olur ve x = 1.2 diskin içine girer.",
        explain:
          "Karmaşık sayılarda 1 + z² = 0'ın kökleri ±i birer kutuptur. Seri a merkezli bir diskte yakınsar ve disk kutupları içine alamaz: R = √(1 + a²). Gerçel eksende hiçbir uyarı işareti yoktur; engel yalnız düzlemde görünür. Kart oranı derece başına verir: seride yalnız çift kuvvetler olduğundan sıfırdan farklı terim başına çarpan bunun karesidir, x = 0.9'da 0.81. Gözlenen sınırın yalnız kısmi toplamlardan bulunup kuramla 1.000'de buluşması, yarıçapın katsayılarda saklı olduğunu gösterir.",
      },
      {
        title: "Machin ve Leibniz: terim başına basamak",
        predict:
          "10 terimle Leibniz serisi π'nin kaç doğru basamağını verir, Machin formülü kaçını? Leibniz'de bir basamak daha kazanmak için terim sayısını kaç katına çıkarmak gerekir?",
        do: "<strong>Sayıları hesaplamak</strong> sekmesinde N = 10'da «Doğru basamak tablosu»nu oku. Sonra <strong>N =</strong> kutusuna sırayla 100, 10000 ve 1000000 yaz (eksen kendiliğinden logaritmiğe geçer) ve Leibniz satırını izle.",
        observe:
          "N = 10: Machin 15.31 basamak (son terim 1.442 ekledi), Leibniz 1.50, e 6.95. Leibniz 100 terimde 2.50, 10⁴'te 4.50, 10⁶'da 6.50 basamak: her on kat terim tam bir basamak, hata ≈ 1/N. Machin 56 terimde sayfanın 80 basamaklık tavanına varır.",
        explain:
          "Leibniz, arctan serisinin tam yakınsaklık sınırında (x = 1) toplanmasıdır: terimler 1/(2k + 1) gibi yavaş söner, kazanç sıfıra gider. Machin'de x = 1/5: her terim kabaca 25 kat küçülür, kazanç log<sub>10</sub> 25 = 1.40'a iner. Aynı seri, yarıçaptan uzaklaştıkça hızlanır.",
      },
      {
        title: "sin θ ≈ θ ne zaman yetmez? Sarkaca köprü",
        predict:
          "sin θ ≈ θ yaklaşımı hangi açıda yüzde 1 yanılır: 5°, 14° yoksa 30°? Sarkacın T<sub>0</sub> = 2π√(L/g) formülü aynı yaklaşımdan gelir; onun yüzde 1 hatası daha küçük açıda mı başlar, daha büyükte mi?",
        do: "Aynı sekmenin altındaki <strong>Küçük açı yaklaşımı</strong> bölümünde <strong>Bağıl hata eşiği</strong> 1 % iken iki «1 % eşiğinin aşıldığı açı» kartını oku. <strong>Açı θ</strong> kaydırıcısını 13.9°'ye, sonra 14.0°'ye getir; <strong>Sıfırla</strong> ile 20°'ye dönüp üç bağıl hata kartını karşılaştır. Son olarak eşiği 0.1 % ve 5 % yap.",
        observe:
          "sin θ ≈ θ eşiği 13.99°'de aşar (ilk terimden tahmin 14.03°): kart 13.9°'de +0.988 %, 14.0°'de +1.0021 % okur. Sarkaç periyodu 22.81°'de aşar (tahmin 22.92°). 20°'de sin θ ≈ θ +2.06 %, θ − θ³/6 −0.0126 %, sarkaç +0.767 % yanılır. 0.1 %'de eşik açıları 4.44° ve 7.24°, 5 %'te 30.85° ve 50.10°.",
        explain:
          "Bağıl hata ilk atılan terimden gelir, (θ − sin θ)/sin θ ≈ θ²/6; eşik açısı √(6·eşik) gibi büyür. Sarkaçta açı θ<sub>0</sub> ile 0 arasında gezer ve hata yalnız uçlarda tam θ<sub>0</sub>²/6'dır; periyoda etkisi θ<sub>0</sub>²/16 olur. İki eşik açısının oranı bu yüzden yaklaşık 4/√6 ≈ 1.63'tür (1 %'de 22.81/13.99). Bir terim eklemek 20°'de hatayı 160 kat küçültür. Sarkaç sayfasında θ<sub>0</sub> = 20°'de «Fark» kartı +0.77 % okur.",
      },
    ],
  },
  wow: [
    {
      title: "Bir şiirin içindeki polinom",
      body:
        "Kerala okulunun 16. yüzyıl şerhlerinde Madhava'ya atfedilen bir sinüs tarifi beş sayıyı sözcüklere gizler: «vidvān, tunnabala, kavīśanicaya, sarvārthaśīlasthiro, nirviddhāṅganarendraruṅ». Harflerin rakam yerine geçtiği Katapayadi sistemiyle okununca 44‴, 33″ 06‴, 16′ 05″ 41‴, 273′ 57″ 47‴ ve 2220′ 39″ 40‴ çıkar (‴, yay saniyesinin altmışta biri): yarıçapı 3437′ 44″ 48‴ olan çemberde R·(π/2)<sup>k</sup>/k!, k = 11, 9, 7, 5, 3. Tarif her sayıyı (yay/5400′)² ile çarpıp bir sonrakinden çıkarmayı, en sonda sonucu (yay/5400′)³ ile çarpıp yaydan çıkarmayı söyler. Bu, sinüsün 11. dereceden Taylor polinomunun bugün Horner yöntemi dediğimiz iç içe hesabıdır; bu sayfa da polinomları aynı yolla hesaplar.",
    },
    {
      title: "707 basamak, 527'si doğru",
      body:
        "İngiliz amatör matematikçi William Shanks, Machin formülüyle π'yi elle hesapladı: 1853'te 607, 1873'te 707 ondalık yayımladı. 1944'te D. F. Ferguson mekanik bir masa hesap makinesiyle yeniden hesaplayınca 528. ondalıkta bir hata buldu; ondan sonraki bütün basamaklar yanlıştı. Hatasız kalan 527 basamak bile fikrin gücünü gösterir: 1/5'li seri terim başına 1.40 basamak getirdiği için 707 ondalık yaklaşık 500 terim demektir. Shanks'in değeri, elektronik bilgisayarlar gelene kadar π'nin en uzun açılımı olarak kaldı.",
    },
    {
      title: "sin x'in −1/6'sından π²/6'ya",
      body:
        "1/1² + 1/2² + 1/3² + … toplamı Basel problemi diye anılır; adını, onunla uğraşan Bernoullilerin ve Euler'in şehrinden alır. Euler 1735'te St. Petersburg'da sunduğu çözümde sin x/x = 1 − x²/6 + x⁴/120 − … serisini, kökleri ±π, ±2π, … olan sonsuz bir polinom gibi çarpanlarına ayırdı: (1 − x²/π²)(1 − x²/4π²)(1 − x²/9π²)⋯. Çarpımı açınca x²'nin katsayısı −(1 + 1/4 + 1/9 + …)/π² olur; bunu seriden gelen −1/6'ya eşitleyince toplam π²/6 = 1.6449… çıkar. Adım o gün için cesur bir sıçramaydı: Euler kabul gören bir kanıtı 1741'de verdi, sonsuz çarpımın kendisini ise Weierstrass bir asır sonra temellendirdi.",
    },
  ],
  worked: {
    title: "e'yi milyonda bir hatayla hesaplamak",
    prompt:
      "e = Σ 1/k! serisinin ilk n + 1 terimini (k = 0 … n) topluyorsun. (a) Lagrange kalanıyla hatayı 10<sup>−6</sup>'nın altına indiren en küçük n'yi bul; e &lt; 3 bilgisini kullan. (b) Sonucu sayfanın iki sekmesinde doğrula. (c) Aynı yöntem e<sup>10</sup>'u bağıl 10<sup>−6</sup> hatayla hesaplamak için hangi dereceyi garanti eder, sayfa kaçını ölçer?",
    steps: [
      "Kalanı yaz: eˣ'in bütün türevleri eˣ olduğundan R<sub>n</sub>(1) = e<sup>ξ</sup>/(n + 1)!, 0 &lt; ξ &lt; 1. 1 &lt; e<sup>ξ</sup> &lt; e &lt; 3 olduğundan 1/(n + 1)! &lt; R<sub>n</sub>(1) &lt; 3/(n + 1)!. e &lt; 3 döngüsel değildir: k! ≥ 2<sup>k−1</sup> olduğu için Σ 1/k! &lt; 1 + 1 + 1/2 + 1/4 + … = 3.",
      "Koşul 3/(n + 1)! &lt; 10<sup>−6</sup>, yani (n + 1)! &gt; 3·10<sup>6</sup>. 9! = 362 880 yetmez, 10! = 3 628 800 yeter: n + 1 = 10, n = 9, on terim. Hata 1/10! = 2.8·10<sup>−7</sup> ile 3/10! = 8.3·10<sup>−7</sup> arasındadır. n = 8 kesinlikle yetmez: alt sınır 1/9! = 2.8·10<sup>−6</sup> zaten 10<sup>−6</sup>'dan büyüktür.",
      "Sayfada doğrula. <strong>Yakınsaklık yarıçapı</strong> sekmesinde eˣ seç, a = 0, x = 1, N = 20: «Bağıl 10<sup>−6</sup> için gereken derece» kartı n = 9, 10 terim der (sayfanın toleransı bağıldır, 10<sup>−6</sup>·e; burada aynı cevabı verir). <strong>Sayıları hesaplamak</strong> sekmesinde e satırı N = 9 terimde 5.95, N = 10 terimde 6.95 doğru basamak gösterir: 6.95 basamak, 2.718 × 10<sup>−6.95</sup> ≈ 3.0·10<sup>−7</sup> mutlak hatadır.",
      "(c) e<sup>10</sup>: M = e<sup>10</sup> alınırsa bağıl sınır 10<sup>n+1</sup>/(n + 1)! olur ve 10<sup>−6</sup>'nın altına ilk n = 36'da iner (37 terim). Sayfanın <strong>eˣ, x = 10</strong> hazır ayarı n = 28 (29 terim) ölçer. Önce yavaş bir başlangıç vardır: terimler k = 9 ve 10'da 2755.7'ye kadar büyür, sonra faktöriyel kazanır. Sınır güvenlidir ama karamsardır: M'yi aralığın en kötü ucundan, x = 10'dan alır.",
    ],
    result:
      "Lagrange kalanı e için n = 9 (on terim) der ve sayfa aynısını ölçer; e<sup>10</sup> için 36 der, gerçek ihtiyaç 28'dir. Kalan sınırı yanıltmaz, ama ne kadar sıkı olduğu M'nin ne kadar iyi seçildiğine bağlıdır.",
  },
  misconceptions: [
    {
      myth: "Taylor polinomuna terim eklemek yaklaşımı her yerde iyileştirir.",
      truth:
        "Uzun vadede yalnız yakınsaklık yarıçapının içinde. <strong>Polinom yaklaşımı</strong> sekmesinde <strong>1/(1 + x²), d = 1.2</strong> düğmesine bas: aralık R = 1'i aşar ve ±1.2'deki en büyük hata n = 4'te 1.224, n = 10'da 3.654, n = 40'ta 867.4 olur. İçeride bile kazanç hemen başlamayabilir: sin x'i seç (R = ∞) ve <strong>d =</strong> kutusuna 6 yaz; ±6'daki hata n = 1'de 6.279, n = 3'te 29.72, n = 5'te 35.08'e çıkar, sonra faktöriyel kazanır (n = 17'de 0.004609). Sabit olmayan her polinom da x → ∞'da sonsuza gider; hiçbir polinom sin x'i bütün eksen boyunca izleyemez.",
    },
    {
      myth: "Her yerde pürüzsüz bir fonksiyonun Taylor serisi her yerde yakınsar.",
      truth:
        "1/(1 + x²) gerçel eksende sonsuz kez türevlenebilir, yine de 0'daki serisi |x| &gt; 1'de ıraksar; yarıçapı karmaşık düzlemdeki ±i kutupları belirler. Daha tuhafı e<sup>−1/x²</sup>'dir: 0'daki serisi her yerde yakınsar ama fonksiyona değil, sıfıra. Pürüzsüzlük her noktada türev olmasıdır; analitiklik ise o türevlerin fonksiyonu bir çevrede gerçekten belirlemesi.",
    },
    {
      myth: "Taylor polinomu, bir aralıkta fonksiyona en yakın polinomdur.",
      truth:
        "Taylor polinomu a'nın hemen yakınında en iyisidir: hatası |x − a|<sup>n+1</sup> hızında sıfıra iner. Bütün bir aralıkta ise aynı dereceden çok daha iyileri vardır. [−π/2, π/2]'de sin x için en büyük hatayı en küçük yapan (minimax) 5. derece polinomun hatası 6.8·10<sup>−5</sup>, Taylor P<sub>5</sub>'inkinin (0.004525) yaklaşık 67'de biri; en iyi 3. derece polinomun hatası bile (4.49·10<sup>−3</sup>) Taylor P<sub>5</sub>'inkinden biraz küçüktür. Minimax polinomunun hatası aralık boyunca eşit genlikle salınır, Taylor'ınki uçlarda yığılır. Bir aralıkta hesap yapacak biri için Taylor başlangıç noktasıdır, son söz değil.",
    },
    {
      myth: "Lagrange sınırı büyükse seri o noktada ıraksıyordur.",
      truth:
        "Sınır yalnız bir üst sınırdır. <strong>ln(1 + x), d = 0.9</strong> düğmesine bas ve n'yi 5, 20, 40 yap: Lagrange sınırı 8.857·10<sup>4</sup>, 5.210·10<sup>18</sup>, 3.245·10<sup>37</sup>'ye büyür; x = −0.9'daki en büyük ölçülen hata ise 0.4725, 0.03924, 0.002737'ye küçülür. Sınır |f<sup>(n+1)</sup>|'i aralığın en kötü ucundan alır, oysa ξ'nin gerçek yeri bilinmez. Yakınsamayı başka araçlar kanıtlar: 1/(1 + t) geometrik serisini 0'dan x'e terim terim integrallemek −1 &lt; x ≤ 1 aralığının tamamında çalışır.",
    },
  ],
  glossary: [
    { term: "Taylor polinomu (Pₙ)", definition: "a noktasında f ile aynı değere ve aynı ilk n türeve sahip, derecesi en çok n olan polinom: P<sub>n</sub>(x) = Σ f<sup>(k)</sup>(a)(x − a)<sup>k</sup>/k!, k = 0 … n." },
    { term: "Maclaurin serisi", definition: "a = 0'daki Taylor serisi; adını onu 1742'de yaygınlaştıran Colin Maclaurin'den alır." },
    { term: "Lagrange kalanı", definition: "Taylor polinomunun hatasını f<sup>(n+1)</sup>(ξ)(x − a)<sup>n+1</sup>/(n + 1)! biçiminde veren ifade; ξ, a ile x arasında bilinmeyen bir noktadır." },
    { term: "Kuvvet serisi", definition: "Σ c<sub>k</sub>(x − a)<sup>k</sup> biçiminde sonsuz toplam; yakınsadığı her noktada bir fonksiyon tanımlar." },
    { term: "Yakınsaklık yarıçapı (R)", definition: "Kuvvet serisinin |x − a| &lt; R iken yakınsayıp |x − a| &gt; R iken ıraksadığı sayı; 1/R = limsup |c<sub>k</sub>|<sup>1/k</sup>." },
    { term: "Tekillik", definition: "Fonksiyonun karmaşık düzlemde analitik olmaktan çıktığı nokta: kutupta sonsuza gider (1/(1 + z²) için ±i), dal noktasında çok değerli olur (ln(1 + z) ve √(1 + z) için −1), esaslı tekillikte hiçbir limiti yoktur (e<sup>−1/z²</sup> için 0)." },
    { term: "Analitik fonksiyon", definition: "Her noktanın bir çevresinde kendi Taylor serisine eşit olan fonksiyon; eˣ, sin x ve 1/(1 + x²) gerçel eksende analitiktir, e<sup>−1/x²</sup> 0'da değildir." },
    { term: "Tam fonksiyon", definition: "Bütün karmaşık düzlemde analitik olan fonksiyon; Taylor serisi her x için yakınsar (R = ∞): polinomlar, eˣ, sin x, cos x." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede Taylor serisi bir formül listesidir; üniversitede birkaç dersin ortak dili olur. <strong>Analiz / Kalkülüs II</strong> dersinde kalanlı Taylor teoremi ortalama değer teoreminden ispatlanır, kuvvet serilerinin yakınsaklık aralığı oran ve kök testleriyle bulunur ve yarıçapın içinde serinin terim terim türevlenip integrallenebildiği gösterilir: arctan serisi, 1/(1 + x²) serisinin integralidir. Bunun arkasındaki kavram <strong>düzgün yakınsaklıktır</strong>: hatanın bütün aralıkta aynı anda küçülmesi; sayfadaki «En büyük |f − P<sub>n</sub>|» kartı tam onun ölçüsüdür. <strong>Kompleks Analiz</strong>de cevap kökten sadeleşir: karmaşık türevlenebilen her fonksiyon, türevlenebildiği her diskin içinde diskin merkezindeki Taylor serisine eşittir; yarıçap da en yakın tekilliğe uzaklıktır. eˣ serisine x = iθ koymak Euler formülünü verir; Laurent serileri tekilliklerin çevresine, rezidüler gerçek integrallerin hesabına uzanır.",
      "<strong>Sayısal Analiz</strong>de Taylor polinomu başlangıçtır: bir aralıkta en iyi polinomu Chebyshev polinomları ve Remez algoritması verir (minimax), <strong>Padé yaklaşımı</strong> polinom oranlarıyla kutupları bile taklit eder; yuvarlama, alterne toplamlarda basamak kaybı ve yakınsamayı hızlandırma yöntemleri bu dersin konusudur. <strong>Diferansiyel Denklemler</strong>de çözüm kuvvet serisi olarak aranır: y″ + y = 0'a Σ c<sub>k</sub>x<sup>k</sup> koymak katsayılar arasında bir özyineleme verir ve sin ile cos'u yeniden bulur; Bessel ve Airy fonksiyonları böyle doğar. <strong>Fizik</strong> yaklaşıklarla yaşar: küçük açı, (1 + x)<sup>n</sup> ≈ 1 + nx, göreli kinetik enerjinin ½mv² + 3mv⁴/(8c²) + … açılımı, pertürbasyon kuramı. Bir de şaşırtıcı akraba var: ln n! için Stirling serisi gibi <em>asimptotik seriler</em> ıraksar, yine de birkaç terimde kesilince çok iyi sonuç verir.",
    ],
    topics: [
      "Düzgün yakınsaklık ve Weierstrass M-testi",
      "Terim terim türev ve integral",
      "Laurent serisi ve rezidüler",
      "Analitik devam",
      "Kuvvet serisiyle diferansiyel denklem çözümü",
      "Asimptotik seriler",
      "Padé yaklaşımı",
      "Minimax ve Chebyshev yaklaşımı",
    ],
  },
  quiz: [
    {
      question: "1/(1 + x²)'nin a = 2'deki Taylor serisinin yakınsaklık yarıçapı kaçtır?",
      options: ["R = 1", "R = 2", "R = √5 ≈ 2.24", "R = ∞, çünkü fonksiyon gerçel eksenin her yerinde pürüzsüz"],
      answer: 2,
      explanation:
        "Yarıçap, a'dan en yakın karmaşık tekilliğe uzaklıktır. 1 + z² = 0'ın kökleri ±i; 2'den i'ye uzaklık √(2² + 1²) = √5 ≈ 2.236. Gerçel eksende engel olmaması bir şey değiştirmez. <strong>Yakınsaklık yarıçapı</strong> sekmesinde a = 2 yap: «|x − a| ile R» kartı R = 2.2361 yazar.",
    },
    {
      question: "sin x ≈ x − x³/6 yaklaşımının |x| ≤ 0.5 aralığındaki hatası için kanıtlı ve en sıkı sınır hangisidir?",
      options: ["0.5⁴/4! ≈ 2.6·10<sup>−3</sup>", "0.5⁵/5! ≈ 2.6·10<sup>−4</sup>", "0.5³/3! ≈ 2.1·10<sup>−2</sup>", "Sınır verilemez, çünkü ξ bilinmiyor"],
      answer: 1,
      explanation:
        "x⁴'ün katsayısı sıfır olduğu için x − x³/6 hem P<sub>3</sub> hem P<sub>4</sub>'tür. Kalanı P<sub>4</sub>'ün kalanı olarak yazmak beşinci türevi getirir, |cos ξ| ≤ 1: |R| ≤ 0.5⁵/120 = 2.60·10<sup>−4</sup>. Sayfada sin x, n = 3, d = 0.5: ölçülen 0.0002589, ikinci sınır 0.0002604. 0.5⁴/4! de doğru bir sınırdır ama on kat gevşek.",
    },
    {
      question: "Machin 1706'da π'nin 100 ondalığını elle buldu. π = 16·arctan(1/5) − 4·arctan(1/239) ile bu iş için arctan(1/5) serisinden kabaca kaç terim gerekir?",
      options: ["Yaklaşık 21", "Yaklaşık 72", "Yaklaşık 500", "Yaklaşık 10¹⁰⁰, Leibniz serisindeki gibi"],
      answer: 1,
      explanation:
        "arctan serisinde ardışık terimlerin oranı x²·(2k − 1)/(2k + 1) → 1/25'tir: her terim log₁₀ 25 = 1.40 basamak ekler, 100/1.40 ≈ 72 (tam sayım 71). 21, hızlı 1/239'lu parçanın payıdır (100/4.76); toplam hızı yavaş parça belirler. Sayfa da uyar: Machin 56 terimde 80 basamağa varır, 80/1.40 ≈ 57. Leibniz'de hata 1/N olduğundan 100 basamak 10¹⁰⁰ terim isterdi.",
    },
  ],
  next: [
    { href: "turev.html", title: "Türev", why: "Taylor polinomunun ilk iki terimi teğet doğrusudur; fark bölümünün kesme hatası atılan f″·h²/2 teriminden gelir ve orada kayan noktanın yuvarlamasıyla yarışır." },
    { href: "karmasik-sayilar.html", title: "Karmaşık Sayılar", why: "Tekilliklerin yaşadığı düzlem: eˣ serisine iθ koy ve kısmi toplamların birim çemberdeki e<sup>iθ</sup>'ya sarmal çizerek yaklaşmasını izle." },
    { href: "sarkac.html", title: "Sarkaç", why: "sin θ ≈ θ yaklaşımının fizikteki bedeli: başlangıç açısı 20° iken «Fark» kartı ölçülen periyodun formülden yüzde 0.77 uzun olduğunu gösterir." },
    { href: "tek-sayi-toplam5.html", title: "Tek Sayılar: Toplamdan Seriye", why: "Geometrik serinin türevinden ağırlıklı tek sayı toplamını çıkar; tam kalanla hedef doğruluğu ve yakınsama sınırını denetle." },
  ],
  sources: [
    { title: "OpenStax · Calculus Volume 2, 6.3 Taylor and Maclaurin Series", url: "https://openstax.org/books/calculus-volume-2/pages/6-3-taylor-and-maclaurin-series", note: "Taylor polinomları, kalanlı Taylor teoremi (Teorem 6.7) ve çözümlü örnekler; sonraki 6.4 Working with Taylor Series binom serisini ve kuvvet serisiyle diferansiyel denklem çözümünü işler (İngilizce, açık ders kitabı)." },
    { title: "Wikipedia · Taylor series", url: "https://en.wikipedia.org/wiki/Taylor_series", note: "Tanım, yakınsaklık yarıçapı, analitik fonksiyonlar, e<sup>−1/x²</sup> örneği ve tarihçe (İngilizce)." },
    { title: "Wikipedia · Madhava series", url: "https://en.wikipedia.org/wiki/Madhava_series", note: "Kerala okulunun sinüs, kosinüs ve arctan serileri; Sankara Variar şerhindeki dizeler, sinüs tarifinin beş sabiti ve √12'li π serisi (İngilizce)." },
    { title: "3Blue1Brown · Taylor series", url: "https://www.3blue1brown.com/lessons/taylor-series", note: "Türevleri tek tek eşleştirerek polinom kurmanın görsel anlatımı (İngilizce video ve metin)." },
  ],
  revision: "Kasım 2026",
};
