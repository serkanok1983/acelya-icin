window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["ucak-muhendisligi-ve-aerodinamik"] = {
  slug: "ucak-muhendisligi-ve-aerodinamik",
  title: "Aerodinamik: Havayı Aşağı İten Kanat",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Kanat havayı saptırır, hava kanadı taşır. Dört sekmede kaldırmayı hem basınçtan hem momentumdan ölç, en az sürükleme hızını bul, 60° yatışta iki kat ağırlaş ve bir depo yakıtın menzilini hesapla.",
  hook:
    "İki hava parçacığını bir kanadın burnunun önünden aynı anda sal: biri sırttan, öteki karından geçsin. Çok anlatılan bir hikâyeye göre arkada yeniden buluşmaları gerekir. Sayfadaki ölçümde buluşmazlar: 1,5 metrelik bir kanatta, 50 m/s'lik akışta üstten geçen 8,1 milisaniye önce varır ve bu fark kaldırmayla birlikte büyür. Öyleyse kanadı havada tutan şey nedir, ve bedeli ne kadardır?",
  bigIdea:
    "Kanat havayı aşağı saptırır, hava da kanadı yukarı iter; bu tek kuvveti ister yüzeydeki basınç farkı, ister havanın kazandığı aşağı yönlü momentum olarak say, sonuç aynı <em>L = ½ρV²SC<sub>L</sub></em> çıkar ve bedeli sürükleme olarak ödenir.",
  story: [
    "Uçuşun matematiği, motorlardan bir yüzyıl önce başladı. 1799'da İngiliz baronet George Cayley küçük bir gümüş diskin bir yüzüne bir kanat, bir gövde ve bir kuyruk çizdi; öteki yüzüne ise kanada etkiyen kuvveti ikiye ayıran bir diyagram: akıma dik <strong>kaldırma</strong> ve akım yönünde, harekete karşı duran <strong>sürükleme</strong>. Bu ayrım küçük görünür ama devrimdir: kuşlar gibi kanat çırpmak gerekmiyordu; sabit bir kanat kaldırmayı üretir, itki ayrı bir kaynaktan gelirdi. Cayley 1804'te bir model planör uçurdu; 1853'te tam boy planörünün bir vadiyi aşarken içinde arabacısının oturduğu anlatılır. Alman mühendis Otto Lilienthal 1891'den 1896'ya kadar kendi yaptığı planörlerle iki binden fazla süzülüş yaptı, kanat profillerini ölçüp tablolar yayımladı ve 1896'da bir düşüşte hayatını kaybetti. Tabloları, ardından gelenlerin başlangıç noktası oldu.",
    "Dayton'da bisiklet dükkânı işleten Wilbur ve Orville Wright, Lilienthal'in tablolarıyla tasarladıkları 1901 planöründen hayal kırıklığıyla döndü: kanat, hesaplanan kaldırmanın ancak üçte birini veriyordu. Kusuru kendi hesaplarında değil, ellerindeki veride aradılar. 1901 sonbaharında dükkânın arkasına 1,8 metrelik bir rüzgâr tüneli kurup iki yüze yakın küçük kanat biçimini kendi yaptıkları terazide ölçtüler. Hatanın büyüğü, 1759'dan beri kullanılan Smeaton katsayısındaydı: 0,005 dolayında sanılan sayı aslında 0,0033'e yakındı. Doğru veriyle tasarlanan 1902 planörü, kanat bükme ve hareketli dümenle üç eksende kontrol edilen ilk hava aracı oldu. 17 Aralık 1903 sabahı Kitty Hawk'ta Orville'in ilk motorlu uçuşu 12 saniye sürdü ve 36,6 metre (120 fit) kat etti; aynı gün Wilbur'un dördüncü uçuşu 59 saniyede 260 metreye ulaştı. Wright'ların üstünlüğü motorda değil, ölçümde ve kontroldeydi.",
    "Kuram, uygulamayla aynı yıllarda olgunlaştı. 1902'de Martin Kutta ve 1906'da Nikolay Jukovski, kaldırmayı kanadın çevresindeki havanın <strong>sirkülasyonuna</strong> bağladı: birim açıklık başına L′ = ρUΓ. 1904'te Ludwig Prandtl Heidelberg'deki bir matematik kongresinde, akışkanın yalnızca yüzeye yapışık incecik bir tabakada sürtünme hissettiğini öne süren kısa bir bildiri sundu; <strong>sınır tabaka</strong> kavramı bugün aerodinamiğin omurgasıdır. 1915'te ABD'de kurulan NACA, 1933'te tek bir raporda 78 akraba kanat profilini ölçüp dört haneli bir adlandırma sistemi getirdi: NACA 2412, yüzde 2 kamberi veter uzunluğunun yüzde 40'ında olan, yüzde 12 kalınlıkta bir profildir ve bugün hâlâ Cessna 172'nin kanadındadır. Sonra hız geldi: Frank Whittle'ın 1930'da patent başvurusunu yaptığı turbojet fikri ilk kez 27 Ağustos 1939'da, Hans von Ohain'in motorunu taşıyan Heinkel He 178 ile uçtu; 14 Ekim 1947'de Chuck Yeager roket motorlu Bell X-1 ile 13 kilometrenin üstünde bir irtifada Mach 1,06'ya ulaşıp ses hızını aştı.",
    "Sayfanın ilk sekmesi bu hikâyenin tam ortasında durur: bir daireyi kanat profiline çeviren ve Jukovski'nin adını taşıyan dönüşümü (sayfadaki yazımıyla Joukowski), Kutta'nın firar kenarı koşuluyla birlikte kullanır. Kaldırmayı şaşırtıcı bir doğrulukla verir, ama Prandtl'ın tabakası onda yoktur: sürükleme tam sıfır çıkar ve kanat hiçbir açıda tutunmayı kaybetmez. Öteki üç sekme mühendisin gündelik araçlarıdır: sürüklemeyi iki terimle özetleyen kutup eğrisi, standart atmosfer, yatışlı dönüş ve yakıtı yola çeviren Breguet denklemi. Gerçek bir tasarımda bunların yerini Navier–Stokes denklemlerinin sayısal çözümü, rüzgâr tüneli ve uçuş testi alır; üçü birbirini tutmadan kanat onaylanmaz. Buradaki uçakların hepsi öğretim değerleridir; her sekme kendi modelinin neyi bilmediğini de açıkça yazar.",
  ],
  core: [
    {
      heading: "Kaldırma denklemi: dört çarpan",
      body:
        "Kaldırma kuvveti dört şeyle büyür: havanın yoğunluğu ρ, hızın karesi V², kanat alanı S ve kanadın biçimiyle açısını tek sayıda toplayan <strong>kaldırma katsayısı</strong> C<sub>L</sub>. ½ρV² çarpanına <strong>dinamik basınç</strong> denir; deniz seviyesinde (ρ = 1,225 kg/m³) 60 m/s için 0,5 × 1,225 × 60² = 2.205 Pa eder, yani atmosfer basıncının yüzde ikisi kadar. Birimi denetle: kg/m³ × m²/s² = N/m²; alanla çarpınca newton kalır, C<sub>L</sub> birimsizdir. Yüksekte hava seyrelir: standart atmosferde 11 km'de yoğunluk 0,3639 kg/m³'tür, deniz seviyesinin 0,2971 katı. Aynı dinamik basıncı, dolayısıyla aynı kaldırmayı bulmak için uçak 1/√0,2971 ≈ 1,83 kat hızlı gitmelidir. Göstergenin okuduğu <strong>eşdeğer hava hızı</strong> V<sub>E</sub> tam bu yüzden tanımlanır: V = V<sub>E</sub>/√σ. 03 sekmesinde h'yi 11.000 m yaparsan V<sub>E</sub> = 60 m/s için gerçek hızın 110,1 m/s olduğunu, dinamik basıncın ise 2.205 Pa'da kaldığını görürsün.",
      formula: "L = ½ρV²SC<sub>L</sub>,   q = ½ρV² = ½ρ<sub>0</sub>V<sub>E</sub>²",
      formulaNote: "Düz uçuşta L = W. Aynı açıda hızı iki katına çıkarırsan kaldırma dört katına çıkar. σ = ρ/ρ₀ yoğunluk oranıdır. Denklem bu yalın hâliyle, havayı sıkışmaz sayabildiğin sürece (yaklaşık Mach 0,3'e kadar) geçerlidir.",
    },
    {
      heading: "Hücum açısı: C<sub>l</sub> doğrusu ve eğimi",
      body:
        "<strong>Hücum açısı</strong> α, kanadın veter çizgisi ile gelen hava arasındaki açıdır; burnun ufka göre açısı değil. Küçük açılarda kaldırma katsayısı açıyla neredeyse tam doğrusal artar. İnce kanat kuramı eğimi radyan başına 2π ≈ 6,283, yani derece başına yaklaşık 0,11 verir; sonlu açıklıklı gerçek kanatlarda 0,08–0,10 ölçülür. <strong>Kamber</strong>, yani orta çizginin bombesi, doğruyu sola kaydırır: kamberli profil sıfır açıda da kaldırır ve kaldırmayı sıfırlamak için burnu <strong>sıfır kaldırma açısı</strong> α₀'a kadar aşağı çevirmek gerekir. 01 sekmesi bunu sınamana izin verir. Varsayılan profilde (kalınlık %11,8, kamber %1,79) Joukowski çözümünün eğimi 6,859 /rad'dır, ince kanat kuramınınkinden yüzde dokuz dik; fark kalınlıktan gelir. Simetrik profil için kapalı biçim bunu açıkça gösterir: C<sub>l</sub> = 2π(1 + ε/(1 + ε))·sin α. α₀ ise iki yoldan neredeyse aynı çıkar: ölçülen kök −2,048°, ince kanat kuramının −2h/c değeri −2,049°.",
      formula: "C<sub>l</sub> ≈ 2π(α − α<sub>0</sub>),   α<sub>0</sub> ≈ −2h/c   (α radyan)",
      formulaNote: "h/c, veter uzunluğuna oranla en büyük kamberdir. Küçük harfli C_l iki boyutlu profilin, büyük harfli C_L bütün kanadın katsayısıdır. Doğru yalnız akış yüzeye tutunduğu sürece geçerlidir.",
    },
    {
      heading: "Basınç mı, momentum mu? İkisi de",
      body:
        "Kanada dokunan tek şey havadır: sırttaki emme ile karındaki basıncı yüzey boyunca toplarsan kaldırmayı bulursun. Ama aynı kuvveti kanada hiç dokunmadan da ölçebilirsin. Profilin çevresine hayalî bir <strong>kontrol eğrisi</strong> çiz. Newton'un ikinci yasası, içindeki havaya etkiyen net kuvvetin, eğriden çıkan momentum akısına eşit olduğunu söyler; kanadın havaya uyguladığı kuvvet böylece iki terime ayrılır: eğri üzerindeki basınç ve havanın kazandığı aşağı yönlü momentum. Eğri tam yüzeydeyse içinden hava geçmez, kuvvetin tamamı basınçtır. Eğriyi büyüttükçe basınç payı küçülür, momentum payı büyür; sayfanın daireye yakın eğrisinde çok uzakta ikisi yarı yarıyadır. k = 1, 3 ve 10 için basınç payı %100,0, %55,6 ve %50,5 okunur; bu sayılar ½(1 + 1/k²) kuralına uyar ve toplam her seferinde aynı C<sub>l</sub>'dir. Bölüşüm eğrinin biçimine bağlıdır, toplam bağlı değildir: çok geniş ve basık bir kutuda kuvvetin tamamı alt ve üst kenardaki basınç, çok dar ve yüksek bir kutuda tamamı momentum olarak görünür. İki açıklama rakip değil, aynı hesabın iki sütunudur. İkisini birbirine bağlayan nicelik, profilin çevresindeki net dönme, yani <strong>sirkülasyon</strong> Γ'dır.",
      formula: "L′ = ρ·U·Γ,   C<sub>l</sub> = 2Γ/(U·c)",
      formulaNote: "Kutta–Jukovski teoremi: birim açıklık başına kaldırma = yoğunluk × hız × sirkülasyon. Varsayılan durumda Γ = 27,10 m²/s; 1,225 × 50 × 27,10 ≈ 1.660 N/m. Γ'nın büyüklüğünü, akışın keskin firar kenarından düzgünce ayrılması koşulu (Kutta koşulu) belirler.",
    },
    {
      heading: "Modelin bilmediği: sınır tabaka ve tutunma kaybı",
      body:
        "01 sekmesindeki akış sürtünmesizdir ve bunun iki çarpıcı sonucu vardır. Birincisi, basınç kuvvetinin akım yönündeki bileşeni tam sıfırdır: C<sub>d</sub> kartı her açıda 0,000000 yazar. Buna <strong>d'Alembert paradoksu</strong> denir; gerçek sürüklemeyi sürtünme ve akışın ayrılması üretir. İkincisi, eğri 20°'de bile tırmanmayı sürdürür. Gerçek kanatta Prandtl'ın tabakası buna izin vermez: sırtta hava önce hızlanıp basıncı düşürür, sonra firar kenarına doğru yeniden yavaşlar; tabakadaki yorgun hava bu ‘yokuş yukarı’ basınca karşı ilerlemek zorundadır. Açı büyüdükçe yokuş dikleşir, tipik olarak 12–18° arasında tabaka yüzeyden kopar ve kaldırma çöker: <strong>tutunma kaybı</strong>. Sayfa bu bölgeyi yalnız taralı bir bant ve bir uyarıyla gösterir, eğrisini uydurmaz; çünkü kopmanın yeri profile ve <strong>Reynolds sayısına</strong> bağlıdır: Re = U·c/ν. Sayfanın boyutlu örneğinde (50 m/s, 1,50 m veter) Re ≈ 5 milyondur; aynı profilin 10 cm'lik modeli aynı hızda 340 bin Re'de daha erken kopar. Tutunma kaybı bir hız değil açı olayıdır: yatışlı dönüşte kanat ağırlığın n katını taşır ve aynı kritik açıya daha yüksek hızda ulaşır.",
      formula: "V<sub>s</sub> = √(2·n·W / (ρ·S·C<sub>L,maks</sub>)),   n = 1/cos φ",
      formulaNote: "Düz uçuşta n = 1. 60° yatışta n = 2 ve tutunma kaybı hızı √2 katına çıkar; 03 sekmesinde 26,9 m/s'den 38,1 m/s'ye. ν havanın kinematik viskozitesidir, deniz seviyesinde yaklaşık 1,46×10⁻⁵ m²/s.",
    },
    {
      heading: "Sürükleme, L/D ve menzil",
      body:
        "Sürükleme de aynı kalıpla yazılır: D = ½ρV²SC<sub>D</sub>. Parabolik <strong>kutup eğrisi</strong> C<sub>D</sub>'yi iki parçaya ayırır: biçim ve sürtünmeden gelen C<sub>D0</sub> ile kaldırmanın bedeli olan <strong>indüklenmiş sürükleme</strong> K·C<sub>L</sub>². Aşağı sapan hava kanadın gördüğü akımı da biraz aşağı eğer, kaldırma vektörü geriye yatar; uzun ince kanat (büyük <strong>açıklık oranı</strong> AR = b²/S) bu kaybı küçültür. D/W = C<sub>D0</sub>/C<sub>L</sub> + K·C<sub>L</sub> ifadesinin türevini sıfırla: en küçük sürükleme iki parçanın eşitlendiği yerde, C<sub>L</sub> = √(C<sub>D0</sub>/K) değerindedir ve (L/D)<sub>maks</sub> = ½√(π·e·AR/C<sub>D0</sub>). L/D, motor dursa bir metre alçalırken kaç metre ileri gideceğindir: sayfanın eğitim uçağında 12,51, planöründe 35,53. Aynı oran menzili de belirler. Seyirde itki sürüklemeye eşittir, T = W/(L/D); jet motoru yakıtı itkiyle orantılı yakar, dW/dt = −g·c<sub>t</sub>·T. dx = V·dt yazıp ağırlığa göre integral alınca <strong>Breguet menzil denklemi</strong> çıkar. Kilometre başına yakıt o andaki ağırlıkla orantılı olduğu için sonuç bir logaritmadır.",
      formula: "C<sub>D</sub> = C<sub>D0</sub> + C<sub>L</sub>²/(π·e·AR),   R = (V/(g·c<sub>t</sub>))·(L/D)·ln(W<sub>0</sub>/W<sub>1</sub>)",
      formulaNote: "e Oswald verim çarpanı, c_t itkiye özgül yakıt tüketimi. Sayfanın jet öğretim uçağında V = 230 m/s, c_t = 17 g/(kN·s), L/D = 15,62 ve W₀/W₁ = 60/45: R = (230/(9,80665 × 17×10⁻⁶)) × 15,62 × ln(4/3) ≈ 6.200 km; sayfa 6.201 km ölçer. Pervanelide V yerine pervane verimi η gelir. Denklem L/D ve hız sabitken tam doğrudur.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var; her birinin kendi <strong>Sıfırla</strong> düğmesi bulunur ve kartlar ölçülen değeri kuramın yanına, aradaki farkla birlikte yazar. <strong>01 · Kanat profili (potansiyel akış)</strong> sürtünmesiz, sıkışmaz, iki boyutlu bir akıştır: serbest akım hep yataydır, yalnız profil döner; kaldırma yüzey basıncının integralinden ölçülür, sürükleme sıfırdır ve tutunma kaybı yoktur (yalnız taralı bir bant ve uyarı). <strong>02 · Kutup eğrisi ve performans</strong> bir uçağın gereken itki ve güç eğrilerini, <strong>03 · Atmosfer ve manevra</strong> standart atmosferi, yatışlı dönüşü ve V–n diyagramını, <strong>04 · Menzil ve dayanım</strong> seyir yakıtını, yük–menzil diyagramını ve kalkış koşusunu hesaplar. Sayılar Türkçe biçimde yazılır: ondalık virgül, binlik nokta. Zaman c/U biriminde verildiğinde bir birim, serbest akımın bir veter boyunu geçme süresidir. Hazır uçakların hepsi öğretim değerleridir; belirli bir tipi temsil etmez.",
    experiments: [
      {
        title: "Üstteki hava alttakini bekler mi?",
        predict:
          "Burnun bir veter boyu önünden, biri sırttan öteki karından geçmek üzere aynı anda salınan iki parçacık firar kenarı hizasına aynı anda mı varır? Hücum açısını büyütürsen aralarındaki fark ne yapar? Kaldırmanın sıfır olduğu açıda ne beklersin?",
        do:
          "01 sekmesinde <strong>Sıfırla</strong>'ya bas. ‘Firar kenarı hizasına varış: üst / alt’ ve ‘Kontrol eğrisinde kaldırmanın payları’ kartlarını oku; çizimde turuncu (üstten geçen) ve mor (alttan geçen) noktaları izle. <strong>Hücum açısı α</strong>'yı 8,0°'ye getir, sonra <strong>α₀'a en yakın açı</strong> düğmesine bas. Yeniden sıfırla ve <strong>Kontrol eğrisi büyüklüğü k</strong>'yı önce 1,00'e, sonra 10,00'a çek.",
        observe:
          "α = 4,0°'de varış 1,875 / 2,144 c/U (bozulmamış akış 1,998). Üstten geçen hava 0,269 c/U (8,1 ms) önce varır; C<sub>l</sub> = 0,7227. α = 8,0°'de 1,835 / 2,277 c/U, fark 0,442 c/U (13,3 ms), C<sub>l</sub> = 1,1967. Düğme α'yı −2,0°'ye getirir: 1,986 / 1,987 c/U, kart ‘İki parçacık neredeyse aynı anda varıyor’ der ve C<sub>l</sub> = 0,0058'dir; basınç merkezi kartı ‘çok uzakta’ yazar. Paylar k = 3,00'te ‘Basınç %55,6 · momentum %44,4’, k = 1,00'de %100,0 ve %0,0, k = 10,00'da %50,5 ve %49,5; toplam hep 0,7227. C<sub>d</sub> kartı 0,000000 yazar.",
        explain:
          "Üstteki parçacık bozulmamış akıştan bile hızlı, alttaki yavaştır: profilin çevresinde net bir dönme (sirkülasyon) vardır; kaldırma onunla orantılıdır. ‘Eşit geçiş süresi’ ancak kaldırmanın sıfıra indiği açının yakınında, o da yaklaşık olarak tutar; kaldırmayı açıklamaz, onun yokluğunu anlatır. Paylar aynı kuvvetin iki muhasebesidir. −2,0°'de kuvvet sıfıra iner ama moment kalır; basınç merkezi bu yüzden profilin dışına kaçar. Ölçümün sınırı: parçacıklar durma akım çizgisinin 0,07 c üstünden ve altından salınır; tam yüzeydeki parçacığın süresi bu modelde sonsuzdur.",
      },
      {
        title: "Sürüklemenin çukuru ve uzun kanat",
        predict:
          "Düz uçuşta sürükleme en yavaş uçarken mi en küçüktür, yoksa arada bir hızda mı? O hızda parazit ve indüklenmiş sürükleme arasında nasıl bir ilişki beklersin? Kanat açıklığını 11 m'den 15 m'ye uzatmak en büyük L/D'yi yüzde kaç artırır?",
        do:
          "02 sekmesinde <strong>Sıfırla</strong>. ‘Seçili hızda uçuş noktası’ kartını oku (V = 50,0 m/s). <strong>V'yi en az sürüklemeye getir</strong> düğmesine bas ve aynı kartı, ardından ‘En iyi süzülüş menzili’ kartını oku. <strong>Gerçek hava hızı V</strong>'yi 32,0 m/s'ye indir. Son olarak <strong>Kanat açıklığı b</strong>'yi 15,0 m yap ve ‘En büyük L/D’ kartına bak.",
        observe:
          "50,0 m/s'de C<sub>L</sub> = 0,529 · L/D = 11,78; sürükleme 916 N (parazit 611 + indüklenmiş 304). Düğme hızı 42,0 m/s'ye getirir: C<sub>L</sub> = 0,750 · L/D = 12,51; iki pay 431 N'da eşitlenir, güç 36,2 kW. Süzülüş 25,21 km, kuram h·(L/D) = 25,01 km (fark %0,80). 32,0 m/s'de sürükleme büyür (parazit 250 + indüklenmiş 743) ama güç 31,8 kW'a düşer; durum satırı ‘güç eğrisinin arka yüzü’ der. b = 15,0 m ile en büyük L/D 17,06, en az sürükleme hızı 36,0 m/s, süzülüş 34,31 km olur; tutunma kaybı hızı 29,7 m/s'de kalır.",
        explain:
          "Parazit sürükleme V² ile büyür, indüklenmiş sürükleme 1/V² ile küçülür; toplamın çukuru ikisinin eşit olduğu hızdadır. Güç D·V olduğundan onun çukuru daha yavaştadır: V<sub>md</sub>/3<sup>1/4</sup> = 31,9 m/s. Açıklık oranı 7,47'den 13,89'a çıkınca (L/D)<sub>maks</sub> √AR ile büyür: 12,51 × √(13,89/7,47) = 17,06, yani yüzde 36 artış. Tutunma kaybı hızı alan değişmediği için aynı kalır. Süzülüşteki %0,80'lik fazlalık bir hata değil: alçaldıkça hava yoğunlaşır, uçak 41,9'dan 38,0 m/s'ye yavaşlar ve kinetik enerjisi de yola dönüşür; sayfa bu düzeltmeyle farkı %0,00'a indirir.",
      },
      {
        title: "60° yatış: iki kat ağırlık, üçte bir yarıçap",
        predict:
          "Yatış 30°'den 60°'ye çıkınca kanadın taşıdığı yük kaç katına çıkar; dönüş yarıçapı yarıya mı iner? Aynı yatışta hızı iki katına çıkarırsan yarıçap kaç kat büyür? 60° yatışı, düz uçuştaki tutunma kaybı hızının biraz üstünde yapabilir misin?",
        do:
          "03 sekmesinde <strong>Sıfırla</strong> (h = 3.000 m, V<sub>E</sub> = 60 m/s). Sırayla <strong>φ = 30°</strong>, <strong>φ = 45°</strong> ve <strong>φ = 60°</strong> düğmelerine bas; ‘Yük çarpanı n’, ‘Dönüş yarıçapı’, ‘Dönüş hızı ve tam tur süresi’ ve ‘Dönüşte tutunma kaybı hızı’ kartlarını yaz. 60°'de kalıp <strong>Eşdeğer hava hızı V_E</strong>'yi 120 m/s'ye, sonra 35 m/s'ye getir; durum satırını oku. İstersen <strong>Dönüşü oynat</strong> ile yörüngeyi izle.",
        observe:
          "30°: n = 1,155, r = 856,8 m, 4,66 °/s · 77,3 s, dönüşte V<sub>s</sub> = 29,0 m/s. 45°: n = 1,414, 494,6 m, 8,07 °/s · 44,6 s, 32,0 m/s. 60°: n = 2,000, 285,6 m, 13,97 °/s · 25,8 s, 38,1 m/s (düz uçuşta 26,9 m/s; %41,4 artış). Benzetilen yarıçap her seferinde kuramla aynıdır. V<sub>E</sub> = 120 m/s'de yarıçap 1.142,3 m olur ve durum satırı V<sub>NE</sub> = 85 m/s sınırının aşıldığını söyler. V<sub>E</sub> = 35 m/s'de satır şunu yazar: kanat en çok n = 1,69 üretebilir, 60° yatış n = 2,00 ister; en az V<sub>E</sub> = 38,1 m/s gerekir; kartlardaki yarıçap ve dönüş hızı artık yalnız kinematik değerlerdir.",
        explain:
          "Kaldırmanın düşey bileşeni L·cos φ ağırlığı taşımalıdır: n = 1/cos φ, 60°'de tam 2. Yatay bileşen merkezcil kuvvettir: r = V²/(g·tan φ). tan 30°'den tan 60°'ye üç kat büyüdüğü için yarıçap üçte bire iner (856,8 → 285,6 m); hız iki katına çıkınca dört katına çıkar. Buradaki V gerçek hava hızıdır (3.000 m'de 69,6 m/s). 35 m/s düz uçuşa yeter ama n = 2'ye yetmez: kanat o hızda en çok (35/26,9)² = 1,69 ağırlık kaldırır. Benzetim, itkinin sürüklemeyi tam karşıladığını varsayar.",
      },
      {
        title: "Breguet ne zaman tam tutar?",
        predict:
          "Uçak sabit irtifada ve sabit hızda uçarsa, yalın Breguet denkleminin verdiği menzile ulaşır mı? Pervaneli uçak daha yavaş uçarak daha uzağa gidebilir mi? Jet uçağını 10.000 m yerine 6.000 m'de aynı hızla uçurursan menzil ne olur?",
        do:
          "04 sekmesinde <strong>Sıfırla</strong>; ‘Menzil’ ve ‘Seyir sonunda’ kartlarını oku. <strong>Seyir programı</strong>'nı ‘Sabit irtifa ve sabit hız’ yap, sonra yeniden ‘Sabit C_L ve sabit hız (yavaşça tırmanır)’ seçip <strong>En iyi menzil hızına git</strong> düğmesine bas. Ardından <strong>Jet öğretim uçağı</strong> düğmesine bas, kartları oku ve <strong>Seyir irtifası h</strong>'yi 6.000 m'ye indir.",
        observe:
          "Varsayılan pervaneli uçak 1.056 kg ile kalkar, 154 kg yakıt taşır: menzil 1.829 km, yalın Breguet de 1.829 km; 9,24 saat; seyir sonunda irtifa 3.539 m. Sabit irtifa ve hızda menzil 1.751 km'ye düşer, yalın Breguet ölçülenden %4,49 farklıdır; C<sub>L</sub> 0,420'den 0,359'a, L/D 10,67'den 9,74'e iner. Düğme hızı 41 m/s'ye getirir: L/D = 12,53, menzil 2.149 km, 14,56 saat. Jet: 60.000 kg kalkış · 15.000 kg yakıt, C<sub>L</sub> = 0,431 · L/D = 15,62, Mach 0,768, 6.201 km, 7,49 saat, seyir sonu 12.027 m; durum satırı ‘transonik seyir’ diye uyarır. 6.000 m'de L/D 11,74'e, menzil 4.660 km'ye düşer.",
        explain:
          "Yalın Breguet L/D'yi ve hızı sabit sayar. Bu ancak uçak hafifledikçe tırmanırsa olur; irtifa sabitse gereken C<sub>L</sub> düşer, uçak en iyi noktadan uzaklaşır. Pervanelide yakıt güçle orantılı yandığı için formülde hız yoktur: en uzağa en büyük L/D'de gidilir, ama yol 9 yerine 14,5 saat sürer. Jette menzil V·(L/D) ile büyür; alçakta hava aynı hız için fazla yoğundur, C<sub>L</sub> 0,270'e iner, parazit sürükleme baskınlaşır. Jetler bu yüzden yüksekten uçar. Modelde tırmanış, yedek yakıt, rüzgâr ve dalga sürüklemesi yoktur: Mach 0,77'de gerçek menzil 6.201 km'nin altında kalır.",
      },
    ],
  },
  wow: [
    {
      title: "İlk uçuş, bir 747'nin kanat açıklığından kısaydı",
      body:
        "17 Aralık 1903'te Orville Wright'ın ilk motorlu uçuşu 12 saniye sürdü ve 36,6 metre kat etti. Bir Boeing 747-400'ün kanat açıklığı 64,4 metredir: Flyer, bugünkü bir jumbo jetin kanadının bir ucundan ötekine bile ulaşamazdı. Aynı günün dördüncü uçuşu 59 saniyede 260 metreye vardı; sonra bir rüzgâr uçağı yerde yuvarlayıp parçaladı ve Flyer bir daha hiç uçmadı.",
    },
    {
      title: "Manş'ı pedal çevirerek geçen kanat",
      body:
        "12 Haziran 1979'da bisikletçi Bryan Allen, Paul MacCready'nin tasarladığı Gossamer Albatross ile Manş Denizi'ni 2 saat 49 dakikada, yaklaşık 36 kilometre pedal çevirerek geçti. Uçağın boş kütlesi yaklaşık 32 kilogram, kanat açıklığı 29,8 metreydi: ilk Boeing 737'lerin kanadından geniş, pilotunun yaklaşık yarısı ağırlığında. Ortalama olarak dalgaların bir buçuk metre kadar üstünde uçtu; yüzeye bu kadar yakın uçmak (yer etkisi) indüklenmiş sürüklemeyi de azaltır.",
    },
    {
      title: "Dönen parçası olmayan motor, Mach 9,6",
      body:
        "16 Kasım 2004'te NASA'nın insansız X-43A'sı, scramjet motoru yaklaşık 10 saniye çalışırken Mach 9,6'ya, saatte 11 bin kilometreye yakın hıza ulaştı. Scramjetin kompresörü, türbini, pervanesi yoktur; havayı sıkıştıran şey aracın kendi hızıdır ve yakıt, yanma odasından ses üstü hızla geçen havanın içinde yanar. Bu yüzden kendi başına kalkamaz: X-43A'yı önce bir B-52 havaya taşıdı, sonra bir roket yaklaşık 33 kilometre irtifada deney hızına çıkardı; scramjet ancak ondan sonra ateşlendi.",
    },
  ],
  worked: {
    title: "Öğretim uçağının en iyi süzülüş noktası",
    prompt:
      "Kütlesi 1100 kg, kanat alanı 16,2 m², kanat açıklığı 11,0 m olan bir öğretim uçağının kutup eğrisi C<sub>D0</sub> = 0,030 ve e = 0,80 ile veriliyor; C<sub>L,maks</sub> = 1,50. Uçak standart atmosferde 2000 m'de uçuyor (ρ = 1,0065 kg/m³, g = 9,80665 m/s²). Tutunma kaybı hızını, en büyük L/D'yi ve onun hızını, o hızdaki sürükleme ile gücü ve motor durursa 2000 m'den en çok ne kadar süzülebileceğini bul. Sonuçları 02 sekmesinde ‘Sıfırla’ ile gelen değerlerle karşılaştır.",
    steps: [
      "Ağırlık ve kanat: W = m·g = 1100 kg × 9,80665 m/s² = 10.787 N. Açıklık oranı AR = b²/S = (11,0 m)²/16,2 m² = 7,47; indüklenmiş sürükleme çarpanı K = 1/(π·e·AR) = 1/(π × 0,80 × 7,47) = 0,0533.",
      "Tutunma kaybı hızı: V<sub>s</sub> = √(2W/(ρ·S·C<sub>L,maks</sub>)) = √(21.574 N / (1,0065 kg/m³ × 16,2 m² × 1,50)) = √(882 m²/s²) ≈ 29,7 m/s, yani 107 km/h.",
      "En iyi nokta: D/W = C<sub>D0</sub>/C<sub>L</sub> + K·C<sub>L</sub>. Türevi sıfırla: −C<sub>D0</sub>/C<sub>L</sub>² + K = 0 ⇒ C<sub>L</sub> = √(C<sub>D0</sub>/K) = √(0,030/0,0533) = 0,750. Bu değerde iki terim eşittir ve (L/D)<sub>maks</sub> = ½√(π·e·AR/C<sub>D0</sub>) = ½√(18,77/0,030) = ½ × 25,02 = 12,51.",
      "Hız, sürükleme, güç: V<sub>md</sub> = √(2W/(ρ·S·C<sub>L</sub>)) = √(21.574 / (1,0065 × 16,2 × 0,750)) = √(1764 m²/s²) = 42,0 m/s. D<sub>min</sub> = W/(L/D)<sub>maks</sub> = 10.787 N / 12,51 = 862 N; yarısı parazit, yarısı indüklenmiş (431 N + 431 N). Gereken güç P = D·V = 862 N × 42,0 m/s ≈ 36,2 kW.",
      "Süzülüş: küçük süzülüş açısında yatay yol ≈ h·(L/D) = 2000 m × 12,51 = 25,0 km. Sayfanın adım adım uçuşu 25,21 km bulur. Fark kinetik enerjidedir: sabit C<sub>L</sub>'de uçak alçaldıkça 41,9'dan 38,0 m/s'ye yavaşlar; (41,9² − 38,0²)/(2 × 9,80665) ≈ 16 m'lik ek ‘yükseklik’ 12,51 ile çarpılınca 0,2 km eder.",
    ],
    result:
      "V<sub>s</sub> ≈ 29,7 m/s; (L/D)<sub>maks</sub> = 12,51, C<sub>L</sub> = 0,750 ve V<sub>md</sub> = 42,0 m/s'de; orada sürükleme 862 N, güç 36,2 kW; 2000 m'den süzülüş yaklaşık 25 km. Sayfa aynı sayıları verir. Dikkat et: en uzağa götüren hız tutunma kaybı hızının 1,41 katıdır; motoru duran pilot burnu ne çok kaldırmalı ne çok bastırmalıdır. Model parabolik kutup eğrisidir; C<sub>D0</sub> ve e'nin hızla değişmediğini, havanın durgun olduğunu varsayar.",
  },
  misconceptions: [
    {
      myth: "Üstten giden hava, alttan gidenle firar kenarında aynı anda buluşmak zorundadır; uzun yolu aynı sürede gittiği için hızlanır.",
      truth:
        "Böyle bir buluşma kuralı yoktur. Sayfada α = 4°'de üstten geçen parçacık 1,875 c/U'da, alttan geçen 2,144 c/U'da varır; fark açı büyüdükçe artar. İki süre ancak kaldırmanın sıfıra indiği açının yakınında birbirine yaklaşır. Üst yüzeyin uzun olması da şart değildir: ‘Simetrik’ profil de açı verildiğinde kaldırır. Hızlanmanın nedeni profilin akışa eklediği sirkülasyondur.",
    },
    {
      myth: "Kaldırmayı ya Bernoulli ya Newton açıklar; biri doğruysa öteki yanlıştır.",
      truth:
        "İkisi aynı kuvvetin iki muhasebesidir. Yüzeydeki basıncı toplarsan C<sub>l</sub> = 0,7227 bulursun; profilden uzakta bir kontrol eğrisi çizersen aynı 0,7227 bu kez yarıya yakın basınç, yarıya yakın aşağı yönlü momentum akısı olarak görünür. Basınç farkı olmadan hava sapmaz, hava sapmadan basınç farkı sürmez.",
    },
    {
      myth: "Tutunma kaybı, uçağın çok yavaşlayıp ‘havada duramaması’dır.",
      truth:
        "Tutunma kaybı bir hız değil açı olayıdır: kanat kritik hücum açısını aştığında akış sırttan kopar. Yavaş uçuşta pilot kaldırmayı korumak için açıyı büyüttüğünden ikisi karışır. 03 sekmesinde düz uçuşta 26,9 m/s'ye kadar tutunan uçak, 60° yatışta 35 m/s'de bile tutunamaz: dönüş n = 2 ister, kanat o hızda en çok 1,69 verir.",
    },
    {
      myth: "Sürtünme küçük bir düzeltmedir; sürtünmesiz akış modeli kanadı eksiksiz anlatır.",
      truth:
        "Sürtünmesiz model kaldırmayı iyi verir ama sürüklemeyi tam sıfır bulur (d'Alembert paradoksu) ve 16°'de bile C<sub>l</sub> = 2,1250 gibi gerçekte ulaşılamayan değerler üretir; sayfa orada uyarır. Üstelik kaldırmayı belirleyen Kutta koşulu da sürtünmenin keskin firar kenarında yaptığı işin modele elle konmuş hâlidir. İncecik sınır tabaka, hem sürüklemenin hem tutunma kaybının kaynağıdır.",
    },
  ],
  glossary: [
    { term: "Hücum açısı (α)", definition: "Kanat profilinin hücum kenarını firar kenarına bağlayan veter çizgisi ile gelen hava akımı arasındaki açı; burnun ufka göre açısıyla karıştırılmamalı." },
    { term: "Kamber", definition: "Profilin orta çizgisinin veterden sapması; kamberli profil sıfır açıda da kaldırır, simetrik profil kaldırmaz." },
    { term: "Kaldırma katsayısı (C_L)", definition: "Kaldırmayı dinamik basınç ve alandan arındıran boyutsuz sayı: C_L = L/(½ρV²S); biçime ve açıya bağlıdır." },
    { term: "Sirkülasyon (Γ)", definition: "Hızın, profili çevreleyen kapalı bir eğri boyunca çizgi integrali; birimi m²/s'dir ve birim açıklık başına kaldırma ρUΓ'dır." },
    { term: "Sınır tabaka", definition: "Yüzeye yapışık, hızın sıfırdan serbest akım hızına çıktığı ince katman; sürtünme ve ayrılma burada olur." },
    { term: "Tutunma kaybı (stall)", definition: "Kritik hücum açısı aşıldığında akışın kanat sırtından ayrılması ve kaldırmanın düşüp sürüklemenin büyümesi." },
    { term: "Yük çarpanı (n)", definition: "Kaldırmanın ağırlığa oranı, n = L/W; düz uçuşta 1, irtifa koruyan φ yatışlı dönüşte 1/cos φ." },
    { term: "Eşdeğer hava hızı (V_E)", definition: "Deniz seviyesi yoğunluğunda aynı dinamik basıncı verecek hız, V_E = V√σ; kanadın ‘hissettiği’ hızdır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede kaldırma tek bir denklemdir; uçak mühendisliğinin ikinci yılındaki Akışkanlar Mekaniği ve ardından gelen Aerodinamik dersi bu denklemin nereden geldiğini sorar. Havanın hareketi <strong>Navier–Stokes denklemleri</strong>yle yazılır; genel çözümü bilinmez, ama sürtünmeyi ihmal eden potansiyel akış kuramı, bu sayfanın ilk sekmesinde olduğu gibi, Kutta–Jukovski teoremini ve ince profil için C<sub>l</sub> = 2π(α − α<sub>0</sub>) sonucunu kalemle türetmeye izin verir. Araç Kompleks Analiz'dir: akış bir karmaşık potansiyelle yazılır ve z = ζ + b²/ζ konform dönüşümü, çözümü bilinen daire çevresindeki akışı profil çevresindeki akışa taşır. Prandtl'ın taşıyıcı çizgi kuramı sonlu kanada geçer ve bu defterdeki C<sub>L</sub>²/(π·e·AR) terimini verir; sınır tabaka denklemleri sürtünmeyi geri getirip ayrılmanın nerede başlayacağını söyler. Hız sese yaklaştığında hava sıkışır: <strong>Mach sayısı</strong> M = V/a, a = √(γRT); 0,3'ün üstünde yoğunluk değişimi hesaba girer, 0,8 dolayında kanadın sırtında yerel şok dalgaları belirir. Ok açılı kanatlar ve Yeager'ın aştığı ‘duvar’ Sıkıştırılabilir Akış dersinin konusudur.",
      "İkinci sıçrama hesaplamadır. Hesaplamalı akışkanlar dinamiği (CFD) kanadın çevresini milyonlarca küçük hücreye böler ve her hücrede kütle, momentum ve enerji korunumunu sayısal olarak çözer; sayfadaki kutup eğrisi, böyle bir hesabın ya da rüzgâr tüneli ölçümünün iki sayılık özetidir. Uçuş Mekaniği, burada nokta kütleyle yapılan süzülüş, dönüş ve kalkış hesaplarını altı serbestlik dereceli hareket denklemlerine genişletir ve kararlılığı türevlerle yazar: burun yukarı sapınca kuyruk onu geri çevirir mi, yani ∂C<sub>m</sub>/∂α negatif mi? Uçak Yapıları kanadı σ = M·y/I ile eğilen bir kiriş olarak görür ve V–n diyagramını yük kaynağı olarak kullanır; İtki Sistemleri jet motorunu Brayton çevrimiyle, yani Termodinamik ile anlatır. Hepsinin ortak dili aynıdır: türev, integral ve diferansiyel denklem.",
    ],
    topics: ["Navier–Stokes denklemleri", "Potansiyel akış, konform dönüşüm ve ince kanat kuramı", "Taşıyıcı çizgi kuramı ve indüklenmiş sürükleme", "Sınır tabaka, Reynolds sayısı ve ayrılma", "Sıkıştırılabilir akış ve Mach sayısı", "Hesaplamalı akışkanlar dinamiği (CFD)", "Uçuş mekaniği ve kararlılık türevleri", "Brayton çevrimi ve jet itkisi"],
  },
  quiz: [
    {
      question: "03 sekmesinde 60° yatışta V<sub>E</sub> = 60 m/s iken dönüş yarıçapı 285,6 m okunuyor. İrtifa ve yatış aynı kalırken V<sub>E</sub> 120 m/s yapılırsa yarıçap ve derece/saniye cinsinden dönüş hızı ne olur?",
      options: [
        "Yarıçap iki katına çıkar, dönüş hızı değişmez",
        "Yarıçap değişmez, dönüş hızı iki katına çıkar",
        "Yarıçap dört katına çıkar, dönüş hızı yarıya iner",
        "Yarıçap dört katına çıkar, dönüş hızı dörtte bire iner",
      ],
      answer: 2,
      explanation: "r = V²/(g·tan φ) hızın karesiyle büyür: 4 × 285,6 ≈ 1.142 m. Dönüş hızı ω = V/r = g·tan φ/V ise hızla ters orantılıdır: 13,97 °/s'den 6,99 °/s'ye iner. Yük çarpanı değişmez; n yalnız yatış açısına bağlıdır.",
    },
    {
      question: "01 sekmesinde α = 16°'de sayfa C<sub>l</sub> = 2,1250 ve C<sub>d</sub> = 0,000000 yazıyor, durum satırı da uyarı veriyor. Bu sayılardan gerçek bir kanat için ne çıkarılabilir?",
      options: [
        "Model sürtünmesizdir: gerçek kanatta bu açıda akış sırttan ayrılır, kaldırma bu değere ulaşmaz ve sürükleme sıfır olmaz",
        "Gerçek kanat da 16°'de sürüklemesiz çalışır; sürükleme yalnız gövdeden gelir",
        "Kaldırma gerçekte daha da büyük olur, çünkü sürtünme havayı yüzeye yapıştırır",
        "C<sub>d</sub> = 0 çıkması basınç integralinin yanlış hesaplandığını gösterir",
      ],
      answer: 0,
      explanation: "Sürtünmesiz akışta basınç kuvvetinin akım yönündeki bileşeni sıfırdır (d'Alembert paradoksu); integral doğrudur, eksik olan fiziktir. Sınır tabaka olmadığı için model ayrılmayı göremez; gerçek kanatlarda akış tipik olarak 12–18° arasında sırttan kopar ve kaldırma çöker. Sayfa bu yüzden o bölgeyi yalnız taralı bir bantla gösterir.",
    },
    {
      question: "Parabolik kutup eğrili bir uçak, en az sürükleme hızının tam iki katında düz uçuyor. Toplam sürükleme, en küçük sürüklemenin kaç katıdır?",
      options: ["2 katı", "2,125 katı", "4 katı", "4,25 katı"],
      answer: 1,
      explanation: "En az sürükleme hızında iki pay eşittir: her biri D_min/2. Hız iki katına çıkınca parazit pay V² ile dört katına çıkar, indüklenmiş pay 1/V² ile dörtte bire iner: D = (D_min/2)(4 + 1/4) = 2,125·D_min. Sayfada sına: 02 sekmesinde V = 84,0 m/s için sürükleme 1.833 N (parazit 1.726 + indüklenmiş 108), en küçük sürükleme 862 N.",
    },
  ],
  next: [
    { href: "akiskanlar-mekanigi.html", title: "Akışkanlar Mekaniği: Akış, Kayıp ve Pompa", why: "Venturi borusu sekmesinde daralan kesitte hız artarken basıncın düştüğünü ölç; viskoz akış sekmesi, bu sayfanın yok saydığı sürtünmeyi geri getirir." },
    { href: "karmasik-sayilar.html", title: "Karmaşık Sayılar: Düzlemde Döndürme ve Büyütme", why: "‘Düzlemi eğen fonksiyonlar’ sekmesinde f(z) = z + 1/z (Joukowski) seçeneğini aç: daireyi kanat profiline çeviren Joukowski dönüşümünün düzlemi nasıl büktüğünü gör." },
    { href: "doppler-etkisi.html", title: "Doppler Etkisi: Dalga Cepheleri ve Ses Patlaması", why: "Kaynak hızı v<sub>s</sub>'yi ses hızının üstüne çıkar, Mach konisini gör: Yeager'ın 1947'de aştığı sınırın dalga resmi." },
    { href: "serbest-dusme.html", title: "Serbest Düşme: Galileo'dan Limit Hıza", why: "Hızın karesiyle büyüyen sürüklemenin en yalın hâli: ‘02 · Hava direnci’ sekmesinde düşen cisim ve limit hız." },
  ],
  sources: [
    { title: "OpenStax · University Physics Vol. 1, 14.6 Bernoulli's Equation", url: "https://openstax.org/books/university-physics-volume-1/pages/14-6-bernoullis-equation", note: "Bernoulli denkleminin enerji korunumundan türetimi ve uygulamaları (İngilizce, açık ders kitabı)." },
    { title: "Wikipedia · Lift (force)", url: "https://en.wikipedia.org/wiki/Lift_(force)", note: "Kaldırmanın basınç ve momentum açıklamaları, ‘eşit geçiş süresi’ yanılgısı ve sirkülasyon kuramı; kaynaklı ve dengeli." },
    { title: "Wikipedia · Wright brothers", url: "https://en.wikipedia.org/wiki/Wright_brothers", note: "1901 rüzgâr tüneli, Smeaton katsayısı, 1902 planörü ve 17 Aralık 1903 uçuşlarının belgeli anlatımı." },
    { title: "Wikipedia · Range (aeronautics)", url: "https://en.wikipedia.org/wiki/Range_(aeronautics)", note: "Breguet menzil denkleminin jet ve pervaneli uçaklar için türetimi." },
  ],
  revision: "Kasım 2026",
};
