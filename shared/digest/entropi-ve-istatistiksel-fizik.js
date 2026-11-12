window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["entropi-ve-istatistiksel-fizik"] = {
  slug: "entropi-ve-istatistiksel-fizik",
  title: "Entropi: Sayarak Anlaşılan Yasa",
  field: "Fizik",
  level: "Lisans",
  minutes: 45,
  tagline:
    "Kırık bardak neden kendiliğinden birleşmez? Bunu yasaklayan bir kuvvet yok; yalnızca sayım var. Mikro durumları say, sıcaklığı bir türev olarak bul, Ising örgüsünde faz geçişini ölç.",
  hook:
    "Yüz parçacıklık bir gazı kutunun sol yarısına topla ve bölmeyi kaldır. Hareket yasalarının hiçbiri parçacıkların geri dönmesini yasaklamaz; hızları ters çevirirsen gerçekten dönerler. Ama kendi hâllerine bırakırsan bunu bekleme: hepsinin aynı anda solda olma olasılığı 2⁻¹⁰⁰, yani yaklaşık 7,9 × 10⁻³¹. Zamanın yönünü veren şey bir yasak mı, yoksa bir sayım mı?",
  bigIdea:
    "Entropi, bir makro durumu gerçekleştiren mikro durumların sayısının logaritmasıdır, <em>S = k ln W</em>; ikinci yasa da büyük sistemlerin ezici çoğunlukla daha çok mikro duruma sahip makro durumlara gittiğini söyleyen istatistiksel bir yasadır.",
  story: [
    "Ludwig Boltzmann 1870'lerde, gazın moleküllerden oluştuğunu varsayarak termodinamiğin ikinci yasasını mekanikten türetmeye çalıştı. Ünlü H-teoremi entropinin hep arttığını söylüyordu. 1876'da Viyana Üniversitesi'nden meslektaşı ve dostu Josef Loschmidt keskin bir itiraz getirdi: Newton yasaları zamanda tersinirdir; bütün hızları ters çevirirsen gaz geldiği yoldan geri döner ve entropi azalır. Öyleyse yalnız mekanikten tek yönlü bir yasa nasıl çıkabilirdi? Boltzmann'ın 1877 tarihli makalesi yanıtın özünü taşıyordu: entropiyi bir <strong>olasılıkla</strong>, bir makro durumu gerçekleştiren mikro durumların sayısıyla ilişkilendirdi. Geri dönüş yasak değildir, yalnızca inanılmaz derecede olasılık dışıdır.",
    "Bugün Viyana Merkez Mezarlığı'ndaki mezar taşında <em>S = k·log W</em> yazar; ama formülün bu biçimi Boltzmann'ın değildir. k sabitini ilk kez Max Planck, 1900–1901'de kara cisim ışımasını türetirken yazdı; 1920'deki Nobel konuşmasında da bu sabite Boltzmann sabiti dendiğini ama Boltzmann'ın onu hiç tanıtmadığını söyledi. Boltzmann'ın atomlara dayanan fiziği kendi zamanında çok tartışıldı; Ernst Mach ve Wilhelm Ostwald atomların varlığına inanmıyordu. Boltzmann 5 Eylül 1906'da Trieste yakınlarındaki Duino'da öldü. Ertesi yıl Paul ve Tatiana Ehrenfest, H-teoremine yöneltilen iki ünlü itirazı tartışmak için iki kavanoz ve numaralı toplardan oluşan basit bir model önerdi; aynı yıl Einstein, katıları özdeş kuantum osilatörlerinin toplamı olarak düşünen modelini yayımladı. Bu sayfanın iki deneyi bu iki modelin üzerine kuruludur.",
    "1920'de Wilhelm Lenz, mıknatıslanmayı anlamak için öğrencisi Ernst Ising'e bir örgü üzerinde yalnız yukarı ya da aşağı bakabilen spinlerden oluşan bir model verdi. Ising tek boyutta çözdü ve hiçbir faz geçişi bulamadı (1924 tezi, 1925 makalesi). Rudolf Peierls 1936'da iki boyutta geçişin var olduğunu kanıtladı; Lars Onsager ise 1944'te kare örgünün dış alansız durumunu tam olarak çözdü. Onsager kendiliğinden mıknatıslanma formülünü 1940'ların sonunda kanıtsız duyurdu; ilk yayımlanan kanıt C. N. Yang'ındır (1952). Kritik sıcaklık kT<sub>c</sub>/J = 2/ln(1 + √2) ≈ 2,269 sayısı, istatistiksel fiziğin elinde tam olarak hesaplanmış nadir faz geçişlerinden birinin imzasıdır.",
    "Kesin çözümün olmadığı yerde rastgele örnekleme devreye girdi. 1953'te Nicholas Metropolis, Arianna ve Marshall Rosenbluth, Augusta ve Edward Teller, \"Equation of State Calculations by Fast Computing Machines\" başlıklı makalelerinde, Los Alamos'ta kurulan MANIAC I bilgisayarında iki boyutlu sert disklerin hâl denklemini hesaplarken bugün Metropolis algoritması denen kabul kuralını kullandı. Sayfanın Ising sekmesi tam bu kuralla çalışır. Ehrenfest kavanozlarını ise Mark Kac 1947'de ayrıntılı çözdü ve dönüş itirazını sayıyla yanıtladı: bir duruma ortalama dönüş süresi, o durumun denge olasılığının tersidir. Geri dönüş garantidir, ama makroskobik bir sistem için beklenen süre evrenin yaşını kat kat aşar.",
  ],
  core: [
    {
      heading: "Mikro durum, makro durum ve S = k ln W",
      body:
        "Bir <strong>makro durum</strong> birkaç kaba sayıyla tanımlanır: kaç para tura geldi, sol yarıda kaç parçacık var. Bir <strong>mikro durum</strong> ise her parçacığın tek tek durumunu belirtir. N paradan n'inin yazı geldiği makro durumu W = C(N, n) farklı mikro durum gerçekleştirir. Dört parada 0, 1, 2, 3 ve 4 yazı için sayılar 1, 4, 6, 4, 1'dir; 2–2 bölüşümü en olasıdır, çünkü en çok yolla gerçekleşir. Logaritmanın nedeni toplanabilirliktir: bağımsız iki sistemin mikro durum sayıları çarpılır, W = W<sub>A</sub>·W<sub>B</sub>; entropileri ise toplanmalıdır, S = S<sub>A</sub> + S<sub>B</sub>. Bunu yalnız logaritma yapar.",
      formula: "S = k ln W, &nbsp; W = C(N, n) = N! / [n! (N − n)!]",
      formulaNote: "k = 1,380649 × 10⁻²³ J/K, 2019'dan beri SI'da tam değerdir ve yalnızca birimi çevirir; sayfa entropiyi k biriminde (S/k = ln W) yazar.",
    },
    {
      heading: "Büyük N'de makro durum kesinleşir",
      body:
        "Faktöriyeller hızla devleşir; Stirling yaklaşımı ln N! ≈ N ln N − N ile ln W ≈ N·H(p) olur, burada p = n/N ve H ikili entropi fonksiyonudur. Bir sonraki düzeltme terimi −½ ln(2πNp(1 − p))'dir; mutlak büyüklüğü ln N gibi büyür, ama ln W'nin kendisi N gibi büyüdüğü için göreli payı ln N/N gibi sıfıra gider. Aynı nedenle dağılımın göreli genişliği 1/√N gibi daralır: yüz parada yazı oranının 0,45 ile 0,55 arasında kalma olasılığı yaklaşık % 73'tür, iki bin parada % 99,9993'tür. İki Einstein katısı enerji paylaşırken de σ/⟨q<sub>A</sub>⟩ ∝ N<sup>−1/2</sup> olur; sayfanın log–log taramasındaki eğim −0,4973'tür. 10²³ parçacıkta en olası makro durumun dışındaki her şey ölçülemeyecek kadar nadirdir.",
      formula: "ln W ≈ N·H(p), &nbsp; H(p) = −p ln p − (1 − p) ln(1 − p)",
      formulaNote: "p = ½ için H = ln 2: N parçacığın her biri iki yarıdan birini seçebiliyorsa toplam 2ᴺ durum vardır.",
    },
    {
      heading: "Sıcaklık bir sayım türevidir",
      body:
        "Einstein katısında her osilatörün enerjisi ε'un tam katıdır; N osilatöre q kuanta Ω(N, q) = C(q + N − 1, q) yolla dağıtılır. A ve B katıları enerji alışverişi yaparken toplam mikro durum sayısı Ω<sub>A</sub>(q<sub>A</sub>)·Ω<sub>B</sub>(q − q<sub>A</sub>) en büyük bölüşümde tepe yapar. Tepe koşulu ∂ ln Ω<sub>A</sub>/∂U<sub>A</sub> = ∂ ln Ω<sub>B</sub>/∂U<sub>B</sub>'dir ve bu ortak türev 1/kT'dir. Sıcaklıklar farklıysa enerji, toplam entropiyi artıran yönde akar: düşük ∂S/∂U'lu (sıcak) taraftan yüksek ∂S/∂U'lu (soğuk) tarafa. Sayfadaki Soğuk A: q_A = 0 hazırında bu bölüşümün olasılığı en olasının 4,04 × 10⁻³⁴ katıdır; kT<sub>B</sub>/ε = 0,9158 iken kT<sub>A</sub> tanımsızdır ve enerji B'den A'ya akar. q<sub>A</sub>'yı 60'a sürünce oran 1 olur ve sıcaklıklar 0,5611 ile 0,5626'dır: tek kuantalık ayrıklık sınırında eşit.",
      formula: "1/T = ∂S/∂U, &nbsp; kT/ε ≈ 1/ln(1 + N/q)",
      formulaNote: "İkinci ifade Stirling yaklaşımıyla Einstein katısı içindir. Sayfa kesin değeri merkezî farkla verir: kT/ε = 2/[ln Ω(q + 1) − ln Ω(q − 1)].",
    },
    {
      heading: "Boltzmann çarpanı ve dönüş süreleri",
      body:
        "Tek bir osilatörü, kalan büyük katıyı bir ısı deposu sayarak düşün. Osilatör n kuanta alırsa depoya q − n kalır; olasılık depodaki mikro durum sayısıyla orantılıdır: P(n) ∝ Ω<sub>R</sub>(q − n) = exp[S<sub>R</sub>(U − nε)/k] ≈ exp(S<sub>R</sub>/k)·e<sup>−nε/kT</sup>. Boltzmann çarpanı böyle doğar. Einstein katısında P(n) = (1 − x)xⁿ, x = (q/N)/(1 + q/N) olur. İkinci yasanın istatistiksel okunuşu da aynı sayımdan gelir: serbest genleşmede sol yarıda toplanmış makro durum 2ᴺ mikro durumdan yalnız biridir. Ehrenfest kavanozlarında Kac'ın sonucu ortalama dönüş süresini 2ᴺ/C(N, n) adım olarak verir. Bu, \"hiç dönmez\" demek değil, \"dönmesi için gereken süre N ile üstel büyür\" demektir.",
      formula: "P(n) ∝ e<sup>−nε/kT</sup>, &nbsp; ⟨τ<sub>n</sub>⟩ = 2ᴺ / C(N, n)",
      formulaNote: "Büyük sistemlerde entropinin artması, başlangıcın düşük entropili olmasına dayanır; o başlangıcın nereden geldiği bu hesabın dışında kalan ayrı bir sorudur.",
    },
    {
      heading: "Ising modeli: sayılamayanı örneklemek",
      body:
        "Kare örgüde her spin s = ±1'dir ve enerji E = −J Σ s<sub>i</sub>s<sub>j</sub> en yakın komşular üzerinden toplanır. Düşük sıcaklıkta enerji kazanır ve spinler hizalanır; yüksek sıcaklıkta entropi kazanır ve düzen dağılır. 64 × 64 örgünün 2⁴⁰⁹⁶ durumu tek tek sayılamaz; Metropolis algoritması bunun yerine durumları Boltzmann ağırlığıyla örnekler: enerjiyi düşüren çevirme hep kabul edilir, ΔE kadar artıran çevirme e<sup>−ΔE/kT</sup> olasılıkla. Onsager'in çözümü sonsuz örgü içindir; sonlu L × L örgüde keskin bir geçiş yoktur. Duygunluk χ'nin tepesi T<sub>c</sub>'nin biraz üstüne kayar ve L büyüdükçe yaklaşır. T<sub>c</sub> yakınında ardışık ölçümler yüzlerce tarama boyunca ilişkili kalır: buna <strong>kritik yavaşlama</strong> denir.",
      formula: "kT<sub>c</sub>/J = 2/ln(1 + √2) ≈ 2,269, &nbsp; m = (1 − sinh⁻⁴(2J/kT))<sup>1/8</sup>",
      formulaNote: "Mıknatıslanma formülü T < T<sub>c</sub> içindir (Yang 1952); 1/8 üssü, T<sub>c</sub>'ye yaklaşırken m'nin nasıl sıfıra indiğini söyleyen kritik üstür.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar dört sekmeden oluşur ve her kartta ölçülen değer kuramın yanında durur. <strong>01 · Mikro durumlar ve S = k ln W</strong> sekmesi kesin sayım yapar: W tam sayı olarak hesaplanır, ln W bu sayının kendisinden alınır. <strong>02 · Boltzmann dağılımı</strong> sekmesi Monte Carlo ile çalışır; Model menüsündeki 2-B gaz, konumu olmayan, rastgele ikili çarpışmalı (Kac türü) bir modeldir; gerçek sert disk dinamiği İdeal Gaz sayfasındadır. <strong>03 · Ising modeli</strong> sekmesi Metropolis ile spin örgüsünü ve sıcaklık taramasını, <strong>04 · Geri dönüşsüzlük</strong> sekmesi çarpışmasız serbest genleşmeyi ve Ehrenfest kavanozlarını gösterir. Bütün rastgelelik tohumludur: aynı tohum aynı sonucu verir. R tuşu etkin sekmeyi sıfırlar, Boşluk canlı sekmeyi duraklatır.",
    experiments: [
      {
        title: "Dört paradan iki bin paraya",
        predict: "Dört parada iki yazı, iki tura kaç yolla gelir? Stirling yaklaşımı bu kadar küçük bir sistemde ln W'yi ne kadar iyi tahmin eder? İki bin parada ne değişir?",
        do: "01 sekmesinde N = 4 hazırını seç ve Yazı (yukarı spin) sayısı n kaydırıcısını 0'dan 4'e sür. n = 2'de dört kartı oku; ardından N = 2000 hazırına geç ve aynı kartlara bak.",
        observe: "W sırayla 1, 4, 6, 4, 1 olur. n = 2'de ln W = 1,7918, Stirling N·H = 2,7726 (+54,74 %), düzeltmeli 1,8537. N = 2000'de ln W = 1382,2680, N·H = 1386,2944; n/N ∈ [0,45; 0,55] kartı 99,9993 % gösterir (yüz parada bu kart 72,87 %'dir).",
        explain: "Stirling'in iki terimli biçimi küçük N'de kaba bir tahmindir; ½ ln düzeltmesi farkın neredeyse tamamını kapatır. Mutlak fark ln N gibi büyürken ln W N gibi büyür; göreli hata binde üçe iner. Dağılım daraldıkça makro durum fiilen kesinleşir.",
      },
      {
        title: "Eşit paylaşım Boltzmann eğrisine dağılır",
        predict: "Her osilatöre tam 3 kuanta vererek başlarsan rastgele alışverişten sonra en kalabalık düzey hangisi olur: n = 3 mü, n = 0 mı?",
        do: "02 sekmesinde Model = Einstein katısı, Osilatör başına kuanta q/N = 3, Tohum 1 seç ve Baştan başlat. Isınma bitip ölçüm başlayınca log grafikteki çubukları ve kartları izle. Sonra Model'i 2-B gaz'a çevir.",
        observe: "Başlangıçta tek osilatör entropisi 0'dır; ısınmadan sonra log P(n) düz bir doğruya oturur. kT/ε ≈ 3,48 (kuram 3,476), P(0) ≈ 0,25 (kuram 0,250), kT − U/N ≈ +0,48. Gazda halka Gauss bulutuna döner; anlık ⟨v⁴⟩/⟨v²⟩² oranı 1'den kalkar ve 2 çevresinde ±0,1 oynar; kT ≈ 0,50 (kuram 0,5), ⟨v⟩ ≈ 0,887 (kuram 0,8862); E/N 0,500000'da sabit kalır.",
        explain: "Enerji korunur ama mikro durumların ezici çoğunluğu, birkaç osilatörün çok, çoğunun az kuanta taşıdığı üstel dağılıma aittir. kT'nin U/N'den yaklaşık ε/2 büyük olması kuantum etkisidir. Gaz modelinde konum yoktur; Maxwell–Boltzmann biçimi yalnızca çarpışmaların enerji paylaştırmasından doğar.",
      },
      {
        title: "Faz geçişini sonlu örgüde yakalamak",
        predict: "T = 1,80'de 64 × 64 örgünün ⟨|m|⟩ değeri Onsager'e yakın mı olur? 16 ve 32'lik örgülerle yapılan taramada χ tepesi T<sub>c</sub> = 2,269'un altına mı, üstüne mi düşer?",
        do: "03 sekmesinde Düzenli: T = 1,80 hazırını seç ve on saniye kadar (birkaç yüz tarama) bekle. Sonra Karşılaştırılan örgüler = 16 × 16 ve 32 × 32, Ölçüm uzunluğu = Kısa, Tohum 1 ile Taramayı başlat; Grafik menüsünde Duygunluk χ ve Binder oranı U₄'e bak. Ayrıca 8 × 8 ve 16 × 16'yı dene.",
        observe: "T = 1,80'de ⟨|m|⟩ ≈ 0,956 (Onsager 0,957), ⟨e⟩ ≈ −1,858 (kesin −1,859); kabul oranı yalnız % 4 kadardır. Tarama (tohum 1): χ tepesi 2,308 (+1,7 %), Binder kesişimi 2,238 (−1,4 %); 8 ve 16 ile 2,416 ve 2,178. Onsager kartı 2,2692 gösterir.",
        explain: "Sonlu örgüde ilinti uzunluğu L ile sınırlıdır; bu yüzden χ tepesi T<sub>c</sub>'nin üstüne kayar ve L büyüdükçe yaklaşır. Binder oranı boydan daha az etkilenir, ama küçük örgülerde onun da düzeltme terimleri vardır. Tohumu değiştirince iki tahminin yüzde bir-iki oynadığını göreceksin.",
      },
      {
        title: "Geri dönüş: dört parçacık ve on altı top",
        predict: "Dört parçacıklık gaz zamanın yüzde kaçını hepsi solda geçirir? On altı topluk kavanozda bütün toplar kaç adımda bir A'ya döner?",
        do: "04 sekmesinde N = 4 hazırını ve Saniyede 20 τ'yu seç, on beş saniye kadar (300 τ) bekle; sonra Hızları ters çevir'e bas. Ardından Deney = Ehrenfest kavanozları, N = 16 hazırı (saniyede 20 milyon adım) ve son olarak N = 100.",
        observe: "Hepsi solda payı 2⁻⁴ = 0,0625'e yaklaşır (300 τ'da 0,06 civarı). Ters çevirdiğin an t<sub>r</sub> ise durum satırı, t = 2t<sub>r</sub>'de bütün parçacıkların yeniden sol yarıda olduğunu yazar. N = 16'da birkaç saniyede bin kadar dönüş birikir ve ortalama, Kac'ın 2¹⁶ = 65 536 adımına yüzde birkaç içinde oturur. N = 100'de dönüş kartı \"henüz yok\" der; beklenen süre 1,27 × 10³⁰ adım, bu hızla 6,34 × 10²² s.",
        explain: "Dinamik tersinirdir; ters çevirme bunu kanıtlar. Geri dönüşü görmeyişimizin nedeni sayımdır: dönüş süresi 2ᴺ gibi büyür. Gerçek, etkileşen bir gazda hızları kusursuz ters çevirmek her parçacığı tam bilmeyi gerektirir; küçük hatalar çarpışmalarla büyür.",
      },
    ],
  },
  wow: [
    {
      title: "Mezar taşındaki formül Planck'ın yazımıyla",
      body:
        "Boltzmann'ın Viyana'daki mezar taşında S = k·log W yazar. Ama k'yi ilk yazan Max Planck'tır (1900–1901); Planck 1920 Nobel konuşmasında bu sabite Boltzmann sabiti dendiğini ama Boltzmann'ın onu hiç tanıtmadığını söyledi. Bugün k = 1,380649 × 10⁻²³ J/K, SI'da kelvini tanımlayan tam bir sayıdır.",
    },
    {
      title: "Yüz top, yüz binlerce evren yaşı",
      body:
        "Ehrenfest kavanozunda 100 topun hepsinin yeniden aynı kavanoza dönmesi için Kac'ın beklenen süresi 2¹⁰⁰ ≈ 1,27 × 10³⁰ adımdır. Sayfanın saniyede 20 milyon adımlık hızıyla bu, 6,3 × 10²² saniye, yani evrenin yaşının (4,35 × 10¹⁷ s) yaklaşık 146 000 katı eder. Oysa 10 top için ortalama 1024 adım yeter ve sayfa bunu bir saniyede ölçer.",
    },
    {
      title: "Bir boyutta yok, iki boyutta tam çözüm",
      body:
        "Ising 1925'te tek boyutlu zincirde hiçbir faz geçişi bulamadı. İki boyutta geçiş vardır ve Onsager 1944'te kare örgüyü tam çözdü: kT<sub>c</sub>/J = 2/ln(1 + √2) = 2,2692. Kritik noktada spin başına enerji tam −√2·J'dir. Üç boyutlu Ising modelinin bugün bilinen kesin bir çözümü yoktur; değerleri sayısal yöntemlerle bulunur.",
    },
  ],
  worked: {
    title: "Bir mol gazın serbest genleşmesi",
    prompt:
      "Yalıtılmış bir kaptaki 1 mol ideal gazın önünden bölme kaldırılıyor ve gaz iki katı hacme yayılıyor. Entropi değişimini J/K olarak bul. Mikro durum sayısı kaç katına çıkar? Sonra 100 parçacıkla sayfada kesin sayımı Stirling sonucuyla karşılaştır.",
    steps: [
      "Her molekülün iki yarıdan birinde olabileceğini düşün: hacim iki katına çıkınca her molekülün konum seçenekleri iki katına çıkar, yani W<sub>son</sub>/W<sub>ilk</sub> = 2ᴺ. Öyleyse ΔS = k ln 2ᴺ = Nk ln 2.",
      "1 mol için Nk = N<sub>A</sub>k = R = 8,314 J/(mol·K): ΔS = 8,314 × 0,6931 ≈ 5,76 J/K. Bu, termodinamiğin ΔS = nR ln(V<sub>2</sub>/V<sub>1</sub>) sonucuyla aynıdır; gaz iş yapmadığı ve ısı almadığı halde entropi artmıştır.",
      "Mikro durum oranı: 2ᴺ = 10<sup>N·log 2</sup> ve N·log 2 = 6,022 × 10²³ × 0,30103 ≈ 1,81 × 10²³. Oran, 1'in arkasına 1,81 × 10²³ sıfır yazılan bir sayıdır; tersi, gazın kendiliğinden sol yarıya toplanma olasılığıdır.",
      "Sayfada dene: 04 sekmesinde N = 100 ile Saniyede 20 τ seç ve birkaç yüz τ bekle. ΔS/k = ln C(N, n<sub>sol</sub>) kartının zaman ortalaması 66,3 civarına oturur; yanında binom kuramı 66,286 ve N ln 2 = 69,315 yazar. Fark yaklaşık ½ ln(πN/2) + ½ ≈ 3,0'dır: ilk terim, en olası makro durumun bile 2ᴺ mikro durumun yalnız bir kısmını taşımasından; son ½ ise n<sub>sol</sub>'un yarı çevresinde dalgalanmasından gelir.",
      "Aynı düzeltme 1 mol için ½ ln(πN/2) + ½ ≈ 28'dir; N ln 2 ≈ 4,17 × 10²³ yanında göreli payı 7 × 10⁻²³ mertebesindedir. Makroskobik sistemde Stirling sonucu fiilen kesindir.",
    ],
    result:
      "ΔS = R ln 2 ≈ 5,76 J/K ve mikro durum sayısı 10<sup>1,81 × 10²³</sup> katına çıkar. 100 parçacıkta makro durum sayımı N ln 2'den yüzde 4,4 kadar aşağıda kalır; 1 molde bu sapma ölçülemeyecek kadar küçüktür.",
  },
  misconceptions: [
    {
      myth: "Entropi, gözle görülen dağınıklığın ölçüsüdür.",
      truth:
        "Entropi, verilen kısıtlarla uyumlu mikro durumların sayısıdır; görsel düzen her zaman doğru bir ipucu değildir. Ising sekmesinde düzenli düşük sıcaklık fazı, kendiliğinden ve toplam entropiyi artırarak oluşur: dışarı verilen ısı çevrenin entropisini, örgünün kaybettiğinden daha çok artırır. Gerçek ölçüt düzen değil, sayımdır.",
    },
    {
      myth: "İkinci yasa entropinin azalmasını mutlak olarak yasaklar.",
      truth:
        "Yasa istatistikseldir. 04 sekmesinde dört parçacıklık gaz zamanın yaklaşık % 6'sını hepsi sol yarıda geçirir; bu gözle görülür bir entropi azalmasıdır. Büyük N'de bu tür dalgalanmalar 2⁻ᴺ gibi kaybolur, bu yüzden makroskobik dünyada yasa kesinmiş gibi çalışır.",
    },
    {
      myth: "Sıcaklık, parçacık başına ortalama enerjidir.",
      truth:
        "Sıcaklık 1/T = ∂S/∂U ile tanımlanır; ortalama enerjiyle ilişkisi sisteme bağlıdır. 02 sekmesinde q/N = 1 için kT/ε = 1,443, U/N = 1'dir; kuantum osilatörlerde kT ile U/N farklıdır. Klasik ideal gazda ise ortalama enerji kT ile orantılı çıkar.",
    },
    {
      myth: "Entropi istatistiği zamanın okunu tek başına açıklar.",
      truth:
        "Sayım, düşük entropili bir başlangıçtan neden entropinin arttığını açıklar; başlangıcın neden düşük entropili olduğunu açıklamaz. Sayfa bu farkı açıkça yazar. Fizikçilerin çoğu düşük entropili başlangıcı evrenin erken hâline bağlar; bu soru laboratuvarın dışında kalır.",
    },
  ],
  glossary: [
    { term: "Mikro durum", definition: "Sistemin her bileşeninin durumunun tek tek belirtildiği tam betimleme; örneğin hangi paranın yazı geldiği." },
    { term: "Makro durum", definition: "Birkaç kaba nicelikle tanımlanan durum (yazı sayısı, enerji, mıknatıslanma); çok sayıda mikro durumla gerçekleşir." },
    { term: "Çokluk (W ya da Ω)", definition: "Bir makro durumu gerçekleştiren mikro durumların sayısı; entropi bunun logaritmasıdır, S = k ln W." },
    { term: "Stirling yaklaşımı", definition: "Büyük N için ln N! ≈ N ln N − N; bir sonraki terim ½ ln(2πN)'dir." },
    { term: "Boltzmann dağılımı", definition: "Bir ısı deposuyla dengedeki küçük sistemin E enerjili durumda bulunma olasılığının e<sup>−E/kT</sup> ile orantılı olması." },
    { term: "Einstein katısı", definition: "Aynı frekanslı, bağımsız kuantum osilatörlerinden oluşan katı modeli (1907); her osilatörün enerjisi ε'un tam katıdır." },
    { term: "Kritik sıcaklık (T<sub>c</sub>)", definition: "Kendiliğinden mıknatıslanmanın ortaya çıktığı sıcaklık; 2-B kare Ising örgüsünde kT<sub>c</sub>/J = 2/ln(1 + √2) ≈ 2,269." },
    { term: "Kritik yavaşlama", definition: "T<sub>c</sub> yakınında yerel güncellemeli dinamiğin çok yavaşlaması; ardışık Monte Carlo ölçümleri uzun süre ilişkili kalır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede entropi, termodinamik derslerinde ısının sıcaklığa bölümü olarak (ΔS = Q/T) girer. Üniversitede <strong>İstatistiksel Mekanik</strong> dersinde bu sayfanın yaptığı sayım bir yönteme dönüşür: mikrokanonik topluluk (sabit enerji, W sayımı), kanonik topluluk (ısı deposu, Boltzmann çarpanı) ve onların merkezindeki bölüşüm fonksiyonu Z = Σ e<sup>−E/kT</sup>. Serbest enerji F = −kT ln Z'den basınç, ısı sığası ve mıknatıslanma türevlerle çıkar. Einstein katısının ısı sığası ve Debye düzeltmesi <strong>Katıhal Fiziği</strong>'nin ilk konularındandır; Shannon entropisi aynı formülü bilgi kuramına taşır.",
      "Ising modeli <strong>faz geçişleri ve kritik olaylar</strong> kuramının laboratuvarıdır. Onsager formülündeki 1/8 üssü bir kritik üstür; kritik üslerin neden farklı sistemlerde aynı çıktığını <em>renormalizasyon grubu</em> açıklar. Metropolis algoritması ise <strong>Hesaplamalı Fizik</strong> ve olasılık derslerindeki Markov zinciri Monte Carlo yöntemlerinin atasıdır; bugün istatistikte, kimyada ve makine öğrenmesinde aynı fikirle çalışılır. Sonlu boy ölçeklemesi, Binder kesişimi ve kritik yavaşlamayı aşan küme algoritmaları bu yolun sonraki duraklarıdır.",
    ],
    topics: ["Kanonik topluluk ve bölüşüm fonksiyonu", "Serbest enerji", "Einstein ve Debye modelleri", "Faz geçişleri ve kritik üsler", "Renormalizasyon grubu", "Markov zinciri Monte Carlo", "Sonlu boy ölçeklemesi", "Dalgalanma kuramları"],
  },
  quiz: [
    {
      question: "1000 + 1000 osilatörlük iki Einstein katısında q<sub>A</sub>'nın göreli genişliği σ/⟨q<sub>A</sub>⟩ ≈ 0,0316'dır. Osilatör sayıları ve toplam enerji 100 katına çıkarılırsa göreli genişlik yaklaşık ne olur?",
      options: ["0,316", "0,0316 (değişmez)", "0,00316", "0,000316"],
      answer: 2,
      explanation: "Göreli genişlik N<sup>−1/2</sup> ile ölçeklenir: 100 kat büyük sistem için √100 = 10 kat dar, yani 0,00316. Sayfanın log–log taramasındaki −0,497'lik eğim bunu ölçer. Makroskobik N'de dağılım bu yüzden iğne gibi incedir.",
    },
    {
      question: "Ehrenfest kavanozunda N = 10 topun hepsinin A'ya dönmesi ortalama 1024 adım sürer. N = 20 için beklenen süre yaklaşık kaçtır?",
      options: ["2048 adım", "Yaklaşık 4100 adım", "Yaklaşık 1 milyon adım", "Sonsuz, çünkü hiç dönmez"],
      answer: 2,
      explanation: "Kac'ın sonucuna göre dönüş süresi denge olasılığının tersidir: 2ᴺ/C(N, N) = 2ᴺ. 2²⁰ = 1 048 576. Top sayısını iki katına çıkarmak süreyi iki katına değil, karesine çıkarır; makroskobik geri dönüşü görmeyişimizin nedeni bu üstel büyümedir.",
    },
    {
      question: "Ising taramasında χ tepesi 8/16 örgülerle 2,416, 16/32 ile 2,308, 32/64 ile 2,305 çıkıyor. 128 × 128'lik bir örgü için en makul beklenti hangisi?",
      options: ["2,2'nin altında", "2,269'un biraz üstünde, öncekilerden daha yakın", "2,5 civarında", "Tepe kaybolur, χ her yerde sabit olur"],
      answer: 1,
      explanation: "Sonlu örgüde χ tepesi, ilinti uzunluğu örgü boyuna ulaştığı sıcaklıkta oluşur; bu sıcaklık T<sub>c</sub>'nin üstündedir ve L büyüdükçe Onsager'in 2,269'una yaklaşır. Sonsuz örgüde χ, T<sub>c</sub>'de ıraksar. 32/64 ile 16/32'nin neredeyse aynı çıkması kısa ölçümün istatistik oynamasıdır; eğilimi uzun ölçüm ve başka tohumlar netleştirir.",
    },
  ],
  next: [
    { href: "termodinamik.html", title: "Termodinamik: PV Diyagramı, İş, Isı ve Çevrimler", why: "Aynı entropiyi makroskobik dille gör: izotermal, adyabatik süreçler, TS diyagramı ve Carnot ile Otto çevrimlerinde iş ve ısı." },
    { href: "ideal-gaz.html", title: "İdeal Gaz: Moleküllerden Basınca (Kinetik Teori)", why: "Buradaki konumsuz çarpışma modelinin gerçek karşılığı: sert disklerin moleküler dinamiği, basınç ve Maxwell–Boltzmann hız dağılımı." },
    { href: "rastgele-yuruyus.html", title: "Rastgele Yürüyüş: √N Yasası, Difüzyon ve Geri Dönüş", why: "Dalgalanmaların neden √N ile büyüdüğünü ve Pólya'nın geri dönüş sonucunu ayrı bir laboratuvarda ölç." },
    { href: "kimyasal-denge-ve-gibbs-enerjisi.html", title: "Kimyasal Denge ve Gibbs Enerjisi: Q, K, ΔG ve Çözünürlük", why: "Entropinin enerjiyle birlikte bir tepkimenin yönünü ve denge sabitini nasıl belirlediğini ΔG = ΔH − TΔS ile izle." },
  ],
  sources: [
    { title: "OpenStax · University Physics Vol. 2, 4.7 Entropy on a Microscopic Scale", url: "https://openstax.org/books/university-physics-volume-2/pages/4-7-entropy-on-a-microscopic-scale", note: "Örnek 4.8: serbest genleşmede ΔS = nR ln(V₂/V₁) (İngilizce, açık ders kitabı; mikro durum sayımı yerine \"düzensizlik\" dilini kullanır)." },
    { title: "Wikipedia · Boltzmann constant", url: "https://en.wikipedia.org/wiki/Boltzmann_constant", note: "k'yi ilk Planck'ın yazdığı (1900–1901), S = k ln W biçimi ve mezar taşı, 1920 Nobel konuşmasındaki sözleri ve 2019 SI tanımı (İngilizce)." },
    { title: "Wikipedia · Ising model", url: "https://en.wikipedia.org/wiki/Ising_model", note: "Lenz ve Ising, Peierls 1936, Onsager 1944 çözümü ve Yang'ın mıknatıslanma kanıtı (İngilizce)." },
    { title: "Wikipedia · Ehrenfest model", url: "https://en.wikipedia.org/wiki/Ehrenfest_model", note: "1907 kavanoz modeli, H-teoremine itirazlar, Kac ve ortalama dönüş süresi 2ᴺ (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
