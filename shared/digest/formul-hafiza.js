window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["formul-hafiza"] = {
  slug: "formul-hafiza",
  title: "Formül Hafıza: On Altı Kart, Sekiz Yasa",
  field: "Oyun",
  level: "Lise–Lisans",
  minutes: 25,
  tagline:
    "Hiçbir şey hatırlamayan biri bu oyunu ortalama 64 hamlede, kusursuz hafızalı biri 12.4 hamlede bitirir. Aradaki farkı bellek kapatır; belleğin en iyi yardımcısı da fiziktir: bir denklemi görünce adını bilmek.",
  hook:
    "Bir kartta 'F = −k·x' yazıyor, bir başkasında 'Hooke Yasası'. Bunların eş olduğunu biliyorsan tek hamle yeter; bilmiyorsan ikisinin yerini ezbere bilsen bile denemeden bulamazsın. Peki hiçbir şeyi unutmayan biri bu on altı kartı kaç hamlede toplar? Sekiz değil. Yanıt 12 ile 13 arasında ve nedeni saf olasılık.",
  bigIdea:
    "Bir formül, niceliklerin birbirine nasıl bağlı olduğunu söyleyen <strong>sıkıştırılmış bir cümledir</strong>; onu tanımak, o cümleyi okuyabilmektir. Oyunun kendi matematiği de bir formüldür: hafızasız oyuncu n çifti ortalama n² hamlede, kusursuz hafızalı oyuncu yaklaşık 1.61·n hamlede bitirir.",
  story: [
    "Kapalı kartları ikişer ikişer açıp eşini aramak, kuralı yazılı bir mucide bağlanamayacak kadar eski ve yaygın bir oyun. Japonya'da boyalı deniz kabuklarının eşleştirildiği <em>kai-awase</em> sık sık atası sayılır, ama aradaki bağ belgelenmiş değil. İngilizce konuşulan ülkelerde oyuna uzun süre 'Pelmanism' dendi; ad, yirminci yüzyılın başında Londra'dan posta yoluyla hafıza eğitimi satan Pelman Enstitüsü'nden gelir. Bugün çoğumuzun bildiği kutulu hâli ise 1959'da Alman yayıncı Ravensburger'in 'memory' adıyla çıkardığı resimli kart setidir. Bu sayfadaki sürümde resim yerine fizik var: çiftin bir kartı yasanın adı, öteki denklemidir.",
    "Kartlardaki denklemlerin kendisi de birer sıkıştırma tarihidir. Newton 1687'de ikinci yasasını bir denklemle değil, Latince bir cümleyle yazdı; bugünkü F = m·a biçimi ancak on sekizinci yüzyılın ortasında, Euler'in yazılarında yerleşti. Robert Hooke yay yasasını 1676'da önce bir harf bulmacası olarak yayımladı, çözümünü iki yıl sonra açıkladı. Coulomb 1785'te burulma terazisiyle yükler arasındaki kuvvetin uzaklığın karesiyle azaldığını ölçtü. Georg Ohm'un 1827'de yayımladığı V = I·R önce soğuk karşılandı; onlarca yıl sonra adı direnç biriminin kendisi oldu. Planck'ın 1900'de çaresizlikle öne sürdüğü E = h·f ise kuantum fiziğinin ilk satırıdır. On altı kartlık banka, on yedinci yüzyıldan yirminciye uzanan bir özettir.",
    "Oyunun kaç hamlede biteceği sorusu matematikçileri de uğraştırdı. Daniel Velleman ve Gregory Warrington 2013'te <em>American Mathematical Monthly</em>'de yayımladıkları 'What to Expect in a Game of Memory' makalesinde, gördüğü hiçbir kartı unutmayan bir oyuncunun n çifti ortalama (3 − 2·ln 2)·n + 7/8 − 2·ln 2 hamlede bitirdiğini gösterdi: çift başına yaklaşık 1.61 hamle. Kusursuz hafıza bile şansı ortadan kaldırmaz; ilk kez açtığın kartın eşinin nerede olduğunu bilemezsin. İnsanın payına düşen ise daha mütevazıdır: psikolog George Miller 1956'da kısa süreli belleğin 'yedi artı eksi iki' öğe tuttuğunu yazdı; Nelson Cowan 2001'de bu sayıyı dört dolayına indirdi. On altı kart, tam da bu sınırı zorlayacak kadardır.",
  ],
  core: [
    {
      heading: "Formül bir cümledir: orantıyı oku",
      body:
        "Bir denklemi tanımanın en kısa yolu, 'şunu iki katına çıkarırsam ne olur?' diye sormaktır. E<sub>k</sub> = ½mv² içinde hız kareli durur: hız iki katına çıkınca enerji dört, üç katına çıkınca dokuz katına çıkar; 50 km/sa yerine 100 km/sa ile giden arabanın fren mesafesinin dört kat uzaması bundandır. F = Gm₁m₂/r² içinde uzaklık paydada ve karelidir: iki kat uzakta çekim dörtte bire iner. p = F/A içinde alan paydadadır: aynı kuvvet iğnenin ucunda deriyi deler, avuç içinde hiçbir şey yapmaz. Eşleşince sayfanın gösterdiği tek cümlelik notlar tam bu okumalardır. İkinci sağlama birimdir: ½mv²'nin birimi kg·m²/s², yani joule; F·d'nin birimi N·m, o da joule. Birimi tutmayan iki ifade birbirine eşit olamaz.",
      formula: "y ∝ xⁿ  ⇒  x → 2x iken y → 2ⁿ·y",
      formulaNote: "n = 2 için dört kat (kinetik enerji, merkezcil ivme), n = −2 için dörtte bir (kütle çekimi, Coulomb), n = −1 için yarı (basınçta alan).",
    },
    {
      heading: "Aynı kalıp, başka fizik",
      body:
        "Bankadaki on altı denklem birkaç kalıba sığar. <strong>Çarpım yasaları</strong>: F = m·a, V = I·R, p = m·v, P = V·I, v = f·λ, E = h·f, F = −k·x ve W = F·d·cos θ; iki niceliğin çarpımı üçüncüyü verir (son ikisinde birer ek var: yön bildiren eksi işareti ve açının kosinüsü). <strong>Oran tanımları</strong>: p = F/A ve ρ = m/V; 'birim alan başına', 'birim hacim başına'. <strong>Kareli bağıntılar</strong>: ½mv² ve v²/r. <strong>Ters kare yasaları</strong>: kütle çekimi ve Coulomb. <strong>Korunum ve durum denklemleri</strong>: A₁v₁ = A₂v₂ ve pV = nRT. Kalıbı görmek ezberi azaltır, çünkü yasalar birbirinden türetilir: P = V·I ile V = I·R'yi birleştir, P = I²·R çıkar; ısıtıcı telinin neden akımın karesiyle ısındığını bulmuşsundur. p = m·v'yi ½mv²'ye koy, E<sub>k</sub> = p²/(2m) olur. Bir uyarı: bankada p harfi iki ayrı şeyi gösterir, basıncı ve momentumu. Harfler yereldir; anlamı denklemin geri kalanı belirler.",
      formula: "P = V·I  ve  V = I·R  ⇒  P = I²·R = V²/R",
      formulaNote: "Dirençten geçen akım iki katına çıkarsa ısıya dönen güç dört katına çıkar.",
    },
    {
      heading: "Ters kare ikizleri: çekim ve Coulomb",
      body:
        "Bankanın en çok karıştırılan iki kartı aynı iskeleti taşır: iki 'yük' çarpılır, uzaklığın karesine bölünür. Benzerlik rastlantı değildir. Noktasal bir kaynaktan çıkan etki, yarıçapı r olan bir kürenin yüzeyine yayılır; yüzey alanı 4πr² olduğundan birim alana düşen pay 1/r² ile azalır. Bu, üç boyutlu uzayın geometrisidir. Farklar da öğreticidir. Kütle hep artıdır, çekim hep çeker; elektrik yükü iki işaretlidir, kuvvet iter de çeker de. Kartta mutlak değer işaretinin Coulomb'da olup çekimde olmaması bundandır. Büyüklükleri ise kıyas kabul etmez: bir proton ile bir elektron arasındaki elektrik kuvveti, aynı ikili arasındaki kütle çekiminden yaklaşık 2.3 × 10<sup>39</sup> kat büyüktür ve bu oran uzaklığa bağlı değildir, çünkü r² ikisinde de sadeleşir. Gezegenleri yine de çekim yönetir; çünkü artı ve eksi yükler birbirini götürür, kütle ise hep birikir.",
      formula: "F<sub>e</sub>/F<sub>g</sub> = k·e² / (G·m<sub>e</sub>·m<sub>p</sub>) ≈ 2.3 × 10<sup>39</sup>",
      formulaNote: "k = 8.99 × 10⁹ N·m²/C², e = 1.602 × 10⁻¹⁹ C, G = 6.674 × 10⁻¹¹ N·m²/kg², m<sub>e</sub> = 9.109 × 10⁻³¹ kg, m<sub>p</sub> = 1.673 × 10⁻²⁷ kg.",
    },
    {
      heading: "Oyunun matematiği: 64 ile 12.4 arasında",
      body:
        "İki uç oyuncu düşün. <strong>Hafızasız</strong> olan her hamlede kapalı kartlardan rastgele ikisini açar ve gördüğünü unutur. Masada k çift kalmışken 2k kartın k·(2k − 1) farklı ikilisi vardır, bunların k tanesi eştir: isabet olasılığı 1/(2k − 1), beklenen deneme sayısı 2k − 1. Sekiz çift için 15 + 13 + … + 3 + 1 = 64 hamle; genelde n². <strong>Kusursuz hafızalı</strong> olan her hamlede önce hiç görmediği bir kartı açar; eşinin yerini biliyorsa alır, bilmiyorsa bir yeni kart daha açar. Bu oyuncunun beklenen hamle sayısı sekiz çiftte 12.39'dur; oyunların yüzde 87'si 12 ya da 13 hamlede biter. Üçüncü bir oyuncu daha var: yerleri kusursuz hatırlayan ama fiziği hiç bilmeyen. On altı kartın yerini ezbere bildiğini varsay. Fizik bilen bu noktadan sonra tam 8 hamle yapar. Bilmeyen ise hangi adın hangi denkleme ait olduğunu deneyerek bulmak zorundadır: k çift kalmışken bir ad kartını k denklemle sırayla dener, ortalama (k + 1)/2 hamle harcar; toplam 4.5 + 4 + … + 1 = 22 hamle. Fizik bilgisi burada sayıya dökülür: 22'ye karşı 8.",
      formula: "E<sub>hafızasız</sub> = n²,   E<sub>kusursuz</sub> ≈ (3 − 2·ln 2)·n + 7/8 − 2·ln 2 ≈ 1.61·n − 0.51",
      formulaNote: "n = 8 için 64 ve 12.40 (tam hesap 12.39). İkinci formül Velleman ve Warrington'ın 2013'teki sonucudur ve büyük n için yaklaşıktır.",
    },
    {
      heading: "Çalışma belleği ve hatırlayarak öğrenme",
      body:
        "Oyunda zorlanan şey <strong>çalışma belleği</strong>dir: bilgiyi birkaç saniye ile birkaç dakika arasında elde tutan, kapasitesi dar sistem. Cowan'ın tahminiyle aynı anda dört kadar öğe taşır. Bu sınırı aşmanın bilinen yolu <strong>öbekleme</strong>dir: anlamlı parçalar tek öğe sayılır. 'F = −k·x' fizik bilmeyen için altı ayrı işarettir; bilen için 'yay' diye tek bir düşünce. Kartın yerini hatırlamak bu yüzden bilen için daha kolaydır. İkinci bulgu oyunu bir çalışma yöntemine çevirir. Bir bilgiyi yeniden okumak yerine bellekten geri çağırmaya çalışmak, kalıcı öğrenmeyi belirgin biçimde güçlendirir; psikolojide buna test etkisi denir ve Roediger ile Karpicke'nin 2006'daki deneyleriyle iyi belgelenmiştir. Ad kartını açtığında denklemi kendin söylemeye çalışman, eşini rastgele aramandan daha çok şey öğretir; yanlış söylesen bile.",
    },
  ],
  lab: {
    intro:
      "Masada 4 × 4 düzeninde on altı kapalı kart var. Her <strong>Yeni Oyun</strong>'da on altı kavramlık bankadan sekizi rastgele seçilir; her kavramın bir ad kartı (açılınca yeşil) ve bir denklem kartı (açılınca mavi) bulunur. İki karta tıklarsın: eşlerse açık kalır ve üstteki satırda o yasanın tek cümlelik bilim notu belirir; eş değilse 0.7 saniye sonra kapanır. <strong>Hamle</strong> açtığın çift sayısını, <strong>Eşleşen</strong> bulduğun çiftleri sayar. Kâğıt kalem bulundur; deneylerin çoğu sayım ister.",
    experiments: [
      {
        title: "Sen hangi oyuncusun?",
        predict:
          "Üç oyun oynasan Hamle sayacı ortalama kaçta biter? Sekiz hamlede bitirmek mümkün mü; mümkünse ne kadar olası?",
        do: "Üç oyunu elinden geldiğince iyi oyna ve bitişteki Hamle değerlerini yaz. Ortalamanı 12.4 ile, yani hiçbir kartı unutmayan oyuncunun beklenen değeriyle karşılaştır.",
        observe:
          "Sayın 8'in altına inemez, çünkü sekiz çift sekiz hamle demektir. 9 ile 11 arası bir bitiş iyi hafıza artı şanstır; kusursuz hafıza bile oyunların yalnız yüzde 9'unda 11 ve altında bitirir. 12 ya da 13 kusursuz oyunun tipik sonucudur. 13'ün üstündeki her hamle, unutulmuş bir kart ya da tanınmamış bir denklem demektir.",
        explain:
          "Tam 8 hamle için her seferinde ilk açtığın iki kartın eş çıkması gerekir: olasılık 1/15 × 1/13 × 1/11 × … × 1/3 = 1/2 027 025. Kusursuz hafızanın 12.4'te kalmasının nedeni bilgidir: bir kartın eşini bilmek için önce ikisini de görmüş olmalısın ve yeni kart açmanın bedeli hamledir.",
      },
      {
        title: "Önce bilinmeyeni aç",
        predict:
          "Her hamlenin ilk kartı olarak daha önce gördüğün bir kartı mı açmalısın, hiç görmediğin birini mi? Hangisi hamle kazandırır?",
        do: "Bir oyunu şu kuralla oyna: her hamlede önce hiç açmadığın bir kart. Eşinin yerini biliyorsan onu aç; bilmiyorsan ikinci olarak yine yeni bir kart aç. Sonraki oyunda tersini dene: hamleye bildiğin bir kartla başla, eşini kapalı kartlar arasında ara.",
        observe:
          "İlk kuralla, kartları karıştırmadığın sürece, çoğu zaman 12 ya da 13 hamlede bitirirsin; seyrek olarak 14 ya da 15'e çıkar. İkinci yolda sayaç belirgin biçimde yükselir: bildiğin kartla başlayıp eşini bulamadığın her hamlede yalnız bir yeni kart öğrenmiş olursun.",
        explain:
          "Bir hamle iki kart açma hakkıdır. İlk kuralda her hamle ya bir çift toplar ya da iki yeni kartın bilgisini verir. Bilinen kartla başlamak hakkın yarısını bilgi vermeyen bir açışa harcar. Kazanan strateji, hafızanı değil hamle başına edindiğin bilgiyi en büyük yapar.",
      },
      {
        title: "Çevirmeden önce söyle",
        predict:
          "Yeşil bir ad kartı açıldığında denklemini, mavi bir denklem kartı açıldığında adını ikinci kartı çevirmeden söyleyebilir misin? Sekiz kavramın kaçında?",
        do: "Bir oyun boyunca ilk kartı açtıktan sonra dur ve eşinde ne yazdığını yüksek sesle söyle. Eşleşme gerçekleşince üstteki satırda çıkan bilim notunu da tahmin etmeye çalış: 'iki katına çıkarsa ne olur?' sorusunun yanıtı çoğu zaman oradadır. Doğru bildiklerini çetele tut.",
        observe:
          "Not satırı her eşleşmede değişir. Örneğin Kinetik Enerji için 'Hız iki katına çıkarsa kinetik enerji dört katına çıkar', Kütle Çekimi için 'Uzaklık iki katına çıkarsa çekim kuvveti dörtte bire iner', Hooke Yasası için eksi işaretinin anlamı. Çetelen büyük olasılıkla ikinci ve üçüncü oyunda yükselir.",
        explain:
          "Yanıtı görmeden önce bellekten çağırmaya çalışmak, aynı bilgiyi bir kez daha okumaktan daha kalıcı iz bırakır. Notlardaki 'iki katına çıkarsa' cümleleri denklemin üssünü okumaktır: v² dört kat, 1/r² dörtte bir verir. Denklemi böyle okuyabildiğin an onu ezberlemen gerekmez.",
      },
      {
        title: "Banka kaç oyunda tükenir?",
        predict:
          "Her oyun on altı kavramdan sekizini gösteriyor. İki oyunda bankanın tamamını görmüş olur musun? Hepsini görmek için ortalama kaç oyun gerekir?",
        do: "On altı satırlık bir liste aç ve her oyunda karşına çıkan kavramları işaretle. Listenin tamamlandığı oyunun numarasını yaz.",
        observe:
          "İki oyun sonunda ortalama 12, üç oyun sonunda 14, dört oyun sonunda 15 kavram işaretlenmiş olur. Listenin dört oyunda tamamlanma olasılığı yaklaşık yüzde 30, altı oyunda yüzde 77, sekiz oyunda yüzde 94'tür; ortalama 5.5 oyun gerekir.",
        explain:
          "Belli bir kavramın bir oyunda seçilme olasılığı 8/16 = 1/2'dir; g oyunda hiç çıkmama olasılığı (1/2)<sup>g</sup>. Görülen kavram sayısının beklenen değeri 16·(1 − 2<sup>−g</sup>): 12, 14, 15, 15.5 … Son birkaç kavram hep geç gelir; kupon toplama problemlerinin ortak huyu budur.",
      },
    ],
  },
  wow: [
    {
      title: "İki milyonda bir",
      body:
        "On altı kartı hiç yanlış açmadan, sekiz hamlede toplamanın olasılığı 1/(15 × 13 × 11 × 9 × 7 × 5 × 3 × 1) = 1/2 027 025'tir. Her gün yüz oyun oynayan biri böyle bir oyunu ortalama elli beş yılda bir görür. Kusursuz hafızalı bir oyuncu için bile 9 hamlelik bitiş yaklaşık on iki bin oyunda bir gelir.",
    },
    {
      title: "Hooke'un harf bulmacası",
      body:
        "Robert Hooke 1676'da yay yasasını bulduğunu duyurdu ama içeriğini saklamak için yalnızca alfabetik sıraya dizilmiş harflerini yayımladı: 'ceiiinosssttuv'. Çözümü 1678'de açıkladı: <em>ut tensio, sic vis</em>; uzama neyse kuvvet odur. O dönemde bir buluşun önceliğini, buluşu açıklamadan kayda geçirmenin yolu buydu. Bugün aynı cümleyi beş işaretle yazıyoruz: F = −k·x.",
    },
    {
      title: "Otuz dokuz basamaklık fark",
      body:
        "Bankadaki iki ters kare yasasını aynı çifte uygula: bir proton ile bir elektron arasındaki Coulomb kuvveti, aralarındaki kütle çekiminin yaklaşık 2.3 × 10<sup>39</sup> katıdır. Uzaklık ne olursa olsun oran değişmez. Atomu elektrik tutar; kütle çekiminin atom içindeki payı, hesaba katılamayacak kadar küçüktür.",
    },
  ],
  worked: {
    title: "Hafızasız oyuncu neden tam 64 hamle yapar?",
    prompt:
      "Bir oyuncu her hamlede kapalı kartlardan rastgele iki tanesini açıyor ve gördüğünü hiç hatırlamıyor. Sekiz çiftli bu oyunu ortalama kaç hamlede bitirir? Sonucu kusursuz hafızalı oyuncunun 12.39 hamlesiyle ve sayfanın puan kuralıyla (10 000 − 50 × hamle) karşılaştır.",
    steps: [
      "Masada k çift, yani 2k kapalı kart kalmış olsun. Rastgele iki kart seçmenin C(2k, 2) = 2k·(2k − 1)/2 = k·(2k − 1) yolu vardır. Bunların tam k tanesi bir eştir. İsabet olasılığı p = k / [k·(2k − 1)] = 1/(2k − 1).",
      "Oyuncu hatırlamadığı için her deneme bağımsızdır; ilk isabete kadar geçen deneme sayısı geometrik dağılır ve beklenen değeri 1/p = 2k − 1'dir. Sekiz çift varken 15, yedi çift varken 13 hamle beklenir.",
      "Beklenen değerler toplanır: 15 + 13 + 11 + 9 + 7 + 5 + 3 + 1. Bu, ilk sekiz tek sayının toplamıdır ve 8² = 64 eder. Genel olarak n çift için 1 + 3 + … + (2n − 1) = n².",
      "Karşılaştır: 64 / 12.39 ≈ 5.2. Kusursuz hafıza hamle sayısını beşte birine indirir. Kart sayısı büyüdükçe fark açılır: hafızasız oyuncu n² ile, hafızalı oyuncu 1.61·n ile büyür. Elli iki kartlık bir destede (26 çift) 676'ya karşı yaklaşık 41 hamle.",
      "Puan: hafızasız oyuncu ortalama 10 000 − 50 × 64 = 6800, kusursuz hafızalı oyuncu 10 000 − 50 × 12.39 ≈ 9380 puan alır. Ulaşılabilecek en yüksek puan 8 hamleyle 9600'dür.",
    ],
    result:
      "Hafızasız oyuncu ortalama 64 hamle (6800 puan), kusursuz hafızalı oyuncu 12.39 hamle (yaklaşık 9380 puan) yapar. Fark, tek sayıların toplamı ile doğrusal bir büyüme arasındaki farktır: n² ile 1.61·n.",
  },
  misconceptions: [
    {
      myth: "Hafızası kusursuz olan biri oyunu hep sekiz hamlede bitirir.",
      truth:
        "Hafıza yalnız gördüğün kartlar için işe yarar. İlk kez açtığın kartın eşi henüz açılmadıysa yerini bilemezsin; ikinci kartı körlemesine açarsın. Kusursuz hafızanın beklenen sonucu 12.39 hamledir; sekiz hamle iki milyonda bir görülen bir şanstır.",
    },
    {
      myth: "p harfi fizikte her zaman aynı niceliktir.",
      truth:
        "Bu bankada p üç kartta geçer ve iki ayrı şeydir: p = F/A ile pV = nRT'de basınç (birimi pascal), p = m·v'de momentum (birimi kg·m/s). Harf bir etikettir; niceliği tanıtan şey birimi ve denklemdeki komşularıdır. V de öyledir: V = I·R'de gerilim, ρ = m/V ile pV = nRT'de hacim. Büyük P ise güçtür.",
    },
    {
      myth: "V = I·R her devre elemanı için geçerli bir doğa yasasıdır.",
      truth:
        "V/I oranına her zaman direnç denebilir; Ohm yasası ise bu oranın akımdan bağımsız, sabit kaldığını söyler ve bu yalnız bazı malzemeler için, belirli koşullarda doğrudur. Metal bir tel sabit sıcaklıkta uyar; diyot, LED ve ısınan ampul teli uymaz. Yasa, doğanın değil malzemenin bir özelliğidir.",
    },
    {
      myth: "Kuvvet uyguluyorsam iş yapıyorumdur: W = F·d.",
      truth:
        "Karttaki cos θ boşuna durmaz. Yalnız hareket doğrultusundaki kuvvet bileşeni iş yapar. Ağır bir çantayı yatay yolda sabit hızla taşırken kuvvetin yukarı, yolun yataydır: θ = 90°, cos θ = 0, çanta üzerinde yapılan mekanik iş sıfırdır. Kolun yorulur, çünkü kasların kendi içinde enerji harcar; bu başka bir hesaptır.",
    },
  ],
  glossary: [
    { term: "Orantı", definition: "İki niceliğin sabit bir oranla birlikte değişmesi; y ∝ xⁿ yazılışı, x iki katına çıkınca y'nin 2ⁿ katına çıktığını söyler." },
    { term: "Ters kare yasası", definition: "Bir etkinin kaynağa uzaklığın karesiyle ters orantılı azalması; kütle çekimi ve Coulomb kuvveti bu biçimdedir." },
    { term: "Boyut analizi", definition: "Bir denklemin iki yanındaki birimlerin tutup tutmadığını denetleme yöntemi; birimi tutmayan denklem yanlıştır." },
    { term: "Beklenen değer", definition: "Rastgele bir niceliğin, olasılıklarıyla ağırlıklandırılmış ortalaması; çok sayıda oyunun ortalamasının yaklaştığı sayı." },
    { term: "Geometrik dağılım", definition: "Her denemede başarı olasılığı p iken ilk başarıya kadar geçen deneme sayısının dağılımı; beklenen değeri 1/p'dir." },
    { term: "Çalışma belleği", definition: "Bilgiyi kısa süre elde tutup üzerinde işlem yapmayı sağlayan, kapasitesi dört öğe dolayında olan bellek sistemi." },
    { term: "Öbekleme", definition: "Ayrı öğeleri anlamlı tek bir birimde toplayarak bellek yükünü azaltma; uzman için 'F = −k·x' tek öğedir." },
    { term: "Test etkisi", definition: "Bir bilgiyi bellekten geri çağırmaya çalışmanın, onu yeniden okumaya göre daha kalıcı öğrenme sağlaması." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "<strong>Fizik I</strong> ve <strong>Fizik II</strong> derslerinde bu on altı kartın her biri daha genel bir yasanın özel durumu olarak geri döner. F = m·a, kütle değişebildiğinde F = dp/dt olur; momentum kartıyla Newton kartı aslında aynı cümledir. W = F·d·cos θ, kuvvet yol boyunca değişiyorsa W = ∫F·dr integraline dönüşür ve iş-enerji teoremi ½mv²'yi buradan üretir. İki ters kare yasası Gauss yasasının sonucudur; 4πr²'lik küre yüzeyi artık bir benzetme değil, ispatın kendisidir. pV = nRT, molekül çarpışmalarının ortalamasından türetilir; A₁v₁ = A₂v₂ kütle korunumunun akışkanlardaki yazılışıdır. E = h·f ise <strong>Modern Fizik</strong> dersinin kapısıdır. Lisede ayrı ayrı ezberlenen formüller, üniversitede birkaç ilkenin dalları olarak yeniden dizilir.",
      "Oyunun kendi matematiği <strong>Olasılık ve İstatistik</strong> dersinin ilk haftalarına denk düşer: beklenen değerin doğrusallığı, geometrik dağılım, kupon toplama. Kusursuz hafızalı oyuncunun 12.39'u kapalı bir formülle değil, durumlar arasında geçiş olasılıkları yazıp özyinelemeyle hesaplanır: 'kaç kart hiç görülmedi, kaç tek kartın yeri biliniyor' çiftini durum alan bir <strong>Markov zinciri</strong>. Aynı yöntem kuyruk kuramından genetiğe pek çok alanda kullanılır. Bilişsel psikoloji ve eğitim bilimleri derslerinde ise çalışma belleği modelleri (Baddeley ve Hitch, 1974) ile aralıklı tekrar ve geri çağırma alıştırması, bu oyunun neden işe yaradığını açıklar.",
    ],
    topics: ["İş-enerji teoremi ve çizgi integrali", "Gauss yasası ve ters kare alanlar", "Kinetik gaz kuramı", "Beklenen değer ve geometrik dağılım", "Markov zincirleri", "Kupon toplama problemi", "Çalışma belleği ve geri çağırma alıştırması"],
  },
  quiz: [
    {
      question: "Sabit dirençli bir ısıtıcının uçlarındaki gerilim iki katına çıkarılıyor. Harcadığı güç nasıl değişir?",
      options: ["Değişmez", "İki katına çıkar", "Dört katına çıkar", "Yarıya iner"],
      answer: 2,
      explanation: "Bankadaki iki kartı birleştir: V = I·R'den I = V/R, bunu P = V·I'ye koy: P = V²/R. Gerilim kareli olduğundan iki kat gerilim dört kat güç verir. Akım da iki katına çıkar; güç, ikisinin çarpımıdır.",
    },
    {
      question: "Hafızasız oyuncunun önünde üç çift (altı kapalı kart) kaldı. Oyunu bitirmesi için ortalama kaç hamle daha gerekir?",
      options: ["3 hamle", "6 hamle", "9 hamle", "15 hamle"],
      answer: 2,
      explanation: "k çift kalmışken beklenen hamle 2k − 1'dir: üç çift için 5, iki çift için 3, son çift için 1. Toplam 5 + 3 + 1 = 9 = 3². Son çiftte iki kart kalır ve hangisini açarsa açsın eşleşir; o yüzden son terim 1'dir.",
    },
    {
      question: "Aşağıdaki ifadelerden hangisi enerji birimi (joule) taşımaz?",
      options: ["F·d·cos θ", "½mv²", "h·f", "m·v"],
      answer: 3,
      explanation: "m·v momentumdur; birimi kg·m/s. Ötekilerin hepsi kg·m²/s² = J verir: iş (N·m), kinetik enerji ve foton enerjisi (Planck sabiti J·s, frekans 1/s). Birim sayımı, bir denklem kartının hangi ad kartına ait olamayacağını söylemenin en hızlı yoludur.",
    },
  ],
  next: [
    { href: "newton-hareket-yasalari.html", title: "Newton'un Hareket Yasaları: Kuvvet, Kütle ve İvme", why: "F = m·a kartının arkasındaki deneyler: sürtünme eşiği, Atwood düzeneğinde ölçülen ivme ve birbirini iten iki arabada eşit ve zıt kuvvetler." },
    { href: "elektrostatik.html", title: "Elektrostatik", why: "Coulomb kartının devamı: alan, potansiyel ve ters kare yasasını küre yüzeyinden çıkaran akı fikri." },
    { href: "tek-sayi-toplam3.html", title: "Tek Sayılardan Kareye", why: "1 + 3 + 5 + … + 15 = 64 neden bir kare? Hafızasız oyuncunun n²'sinin görsel ispatı." },
    { href: "bayes-olasilik.html", title: "Bayes Olasılığı", why: "Açılan her kart kalanlar hakkındaki olasılığı günceller; koşullu olasılığın düzenli hesabı burada." },
  ],
  sources: [
    { title: "Wikipedia · Concentration (card game)", url: "https://en.wikipedia.org/wiki/Concentration_(card_game)", note: "Oyunun adları, strateji üzerine notlar ve Velleman–Warrington'ın 2013'teki beklenen hamle sonucu; 52 kartlık deste için yaklaşık 41 hamle (İngilizce)." },
    { title: "OpenStax · University Physics, Volume 1", url: "https://openstax.org/details/books/university-physics-volume-1", note: "Newton yasaları, iş ve kinetik enerji, momentum, kütle çekimi ve akışkanlar: bankadaki mekanik kartlarının ders kitabı karşılığı (İngilizce, açık erişim)." },
    { title: "HyperPhysics · Fundamental Forces", url: "http://hyperphysics.phy-astr.gsu.edu/hbase/Forces/funfor.html", note: "Elektromanyetik kuvvet ile kütle çekiminin göreli büyüklükleri ve ters kare biçimleri (İngilizce)." },
    { title: "Wikipedia · Testing effect", url: "https://en.wikipedia.org/wiki/Testing_effect", note: "Geri çağırma alıştırmasının öğrenmeye etkisi ve Roediger–Karpicke deneyleri (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
