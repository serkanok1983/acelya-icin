window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["ucak-muhendisligi-ve-aerodinamik"] = {
  slug: "ucak-muhendisligi-ve-aerodinamik",
  title: "Aerodinamik: Havayı Aşağı İten Kanat",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Dört yüz tonluk bir uçağı havada tutan şey, atmosfer basıncının yüzde yedisi kadar bir fark. Kanadın bu farkı nasıl yarattığı, ne zaman yaratamadığı ve bunu ilk ölçen iki bisiklet tamircisinin hikâyesi.",
  hook:
    "Bir Boeing 747 kalkışta yaklaşık 400 ton çeker; bunu taşımak için kanadının altı ile üstü arasında ortalama 7 kilopaskallık bir basınç farkı yeter, yani atmosfer basıncının yüzde yedisi. Bu kadar küçük bir fark bu kadar büyük bir ağırlığı nasıl taşır? Ve burnu biraz fazla kaldıran bir pilot, hızı ne olursa olsun, o farkı neden bir anda kaybeder?",
  bigIdea:
    "Kanat havayı aşağı doğru saptırır; hava da kanadı yukarı iter. Bu itme <em>L = ½ρv²SC<sub>L</sub></em> ile ölçülür ve <strong>hücum açısı</strong> büyüdükçe artar, ta ki akış kanadın sırtından kopup kaldırmanın çöktüğü <strong>tutunma kaybına</strong> kadar.",
  story: [
    "Uçuşun matematiği, motorlardan bir yüzyıl önce başladı. 1799'da İngiliz baronet George Cayley küçük bir gümüş diskin bir yüzüne bir kanat, bir gövde ve bir kuyruk çizdi; öteki yüzüne ise kanada etkiyen kuvveti ikiye ayıran bir diyagram: akıma dik <strong>kaldırma</strong> ve akım yönünde, harekete karşı duran <strong>sürükleme</strong>. Bu ayrım küçük görünür ama devrimdir: kuşlar gibi kanat çırpmak gerekmiyordu; sabit bir kanat kaldırmayı üretir, itki ayrı bir kaynaktan gelirdi. Cayley 1804'te bir model planör uçurdu; 1853'te tam boy planörünün bir vadiyi aşarken içinde arabacısının oturduğu anlatılır. Alman mühendis Otto Lilienthal 1891'den 1896'ya kadar kendi yaptığı planörlerle iki binden fazla süzülüş yaptı, kanat profillerini ölçüp tablolar yayımladı ve 1896'da bir düşüşte hayatını kaybetti. Tabloları, ardından gelenlerin başlangıç noktası oldu.",
    "Dayton'da bisiklet dükkânı işleten Wilbur ve Orville Wright, Lilienthal'in tablolarıyla tasarladıkları 1901 planöründen hayal kırıklığıyla döndü: kanat, hesaplanan kaldırmanın ancak üçte birini veriyordu. Kusuru kendi hesaplarında değil, ellerindeki veride aradılar. 1901 sonbaharında dükkânın arkasına 1.8 metrelik bir rüzgâr tüneli kurup iki yüze yakın küçük kanat biçimini kendi yaptıkları terazide ölçtüler. Hatanın büyüğü, 1759'dan beri kullanılan Smeaton katsayısındaydı: 0.005 sanılan sayı aslında 0.0033 dolayındaydı. Doğru veriyle tasarlanan 1902 planörü, kanat bükme ve hareketli dümenle üç eksende kontrol edilen ilk hava aracı oldu. 17 Aralık 1903 sabahı Kitty Hawk'ta Orville'in ilk motorlu uçuşu 12 saniye sürdü ve 36.6 metre (120 fit) kat etti; aynı gün Wilbur'un dördüncü uçuşu 59 saniyede 260 metreye ulaştı. Wright'ların üstünlüğü motorda değil, ölçümde ve kontroldeydi.",
    "Kuram, uygulamanın birkaç yıl ardından geldi. 1902'de Martin Kutta ve 1906'da Nikolay Jukovski, kaldırmayı kanadın çevresindeki havanın <strong>sirkülasyonuna</strong> bağladı: birim açıklık başına L′ = ρV<sub>∞</sub>Γ. 1904'te Ludwig Prandtl Heidelberg'deki bir matematik kongresinde, akışkanın yalnızca yüzeye yapışık incecik bir tabakada sürtünme hissettiğini öne süren kısa bir bildiri sundu; <strong>sınır tabaka</strong> kavramı bugün aerodinamiğin omurgasıdır. 1915'te ABD'de kurulan NACA, 1933'te tek bir raporda 78 akraba kanat profilini ölçüp dört haneli bir adlandırma sistemi getirdi: NACA 2412, yüzde 2 kamberi veter uzunluğunun yüzde 40'ında olan, yüzde 12 kalınlıkta bir profildir ve bugün hâlâ Cessna 172'nin kanadındadır. Sonra hız geldi: Frank Whittle'ın 1930'da patent başvurusunu yaptığı turbojet fikri ilk kez 27 Ağustos 1939'da, Hans von Ohain'in motorunu taşıyan Heinkel He 178 ile uçtu; 14 Ekim 1947'de Chuck Yeager roket motorlu Bell X-1 ile 13 kilometrenin üstünde bir irtifada Mach 1.06'ya ulaşıp ses hızını aştı.",
    "Sayfadaki çizim bu birikimin bir karikatürüdür: kaldırma katsayısı açıyla doğrusal artar, 14 derecede tepe yapar, ötesinde akış sırttan kopar ve sayı düşer. Gerçek bir kanat tasarımında mühendis Navier–Stokes denklemlerini bilgisayarda sayısal olarak çözer, sonucu rüzgâr tünelinde, sonra da uçuş testinde sınar; üçü birbirini tutmadan kanat onaylanmaz. Bu defterde önce denklemi, sonra onu bozan açıyı, sonra da sayfanın nerede dürüst nerede kaba olduğunu göreceksin.",
  ],
  core: [
    {
      heading: "Kaldırma denklemi: dört çarpan",
      body:
        "Kaldırma kuvveti dört şeyle büyür: havanın yoğunluğu ρ, hızın karesi v², kanat alanı S ve kanadın biçimiyle açısını tek sayıda toplayan <strong>kaldırma katsayısı</strong> C<sub>L</sub>. ½ρv² çarpanına <strong>dinamik basınç</strong> denir; standart atmosferde deniz seviyesinde (15 °C, ρ = 1.225 kg/m³) 60 m/s hız için 0.5 × 1.225 × 60² = 2205 Pa eder, yani atmosfer basıncının yüzde ikisi. Birimi denetle: kg/m³ × m²/s² = N/m²; alanla çarpınca newton kalır, C<sub>L</sub> birimsizdir. Yolcu uçakları neden 11 km'de uçar? Orada yoğunluk 0.364 kg/m³'tür, deniz seviyesinin 0.30 katı. Aynı dinamik basınç, dolayısıyla aynı kaldırma ve aynı sürükleme için uçak 1/√0.30 ≈ 1.8 kat hızlı gider: aynı kuvvetle, aynı sürede 1.8 kat yol.",
      formula: "L = ½ρv²SC<sub>L</sub>",
      formulaNote: "Düz uçuşta L = W (ağırlık). Aynı açıda hızı iki katına çıkarırsan kaldırma dört katına çıkar. Denklem, hız ses hızının üçte birini (Mach 0.3) aşmadıkça havayı sıkışmaz sayabildiğin sürece bu yalın hâliyle geçerlidir.",
    },
    {
      heading: "Hücum açısı: C<sub>L</sub>'nin ayar düğmesi",
      body:
        "<strong>Hücum açısı</strong> α, kanadın veter çizgisi ile gelen hava arasındaki açıdır; burnun ufka göre açısı değil. Tırmanan bir uçakta burun 10° yukarıdayken α yalnızca 3° olabilir, çünkü hava da yukarıdan aşağı doğru gelmektedir. Küçük açılarda C<sub>L</sub> açıyla neredeyse tam doğrusal artar. İnce kanat kuramı eğimi radyan başına 2π, yani derece başına 2π × (π/180) ≈ 0.11 verir; gerçek, sonlu açıklıklı kanatlarda 0.08–0.10 ölçülür. Kamberli (sırtı şişkin) bir profil sıfır açıda bile kaldırır; kaldırmayı sıfırlamak için burnu biraz aşağı, NACA 2412'de yaklaşık −2°'ye çevirmek gerekir. Sayfa tam bu doğruyu kullanır: 14°'ye kadar C<sub>L</sub> = 0.25 + 0.09·α.",
      formula: "C<sub>L</sub> ≈ a·(α − α<sub>0</sub>),  a ≈ 0.1/°",
      formulaNote: "α₀ sıfır-kaldırma açısı; simetrik profilde 0°, kamberli profilde negatif. Sayfanın doğrusunda a = 0.09/° ve α₀ = −0.25/0.09 ≈ −2.8°.",
    },
    {
      heading: "Basınç mı, momentum mu? İkisi de",
      body:
        "Kaldırmayı iki dille anlatabilirsin ve ikisi aynı sayıyı verir. <strong>Basınç dili:</strong> kanadın sırtında hava hızlanır, Bernoulli'ye göre basınç düşer; altında basınç biraz yükselir; farkı yüzey boyunca toplarsan kaldırmayı bulursun. <strong>Momentum dili:</strong> kanat arkasında aşağı doğru akan bir hava bırakır (downwash); Newton'un ikinci yasasına göre kuvvet, saniyede aşağı verilen momentumdur. Sayıyla: 11 m açıklıklı küçük bir uçak 60 m/s hızla uçarken, çapı kanat açıklığı kadar olan bir hava tüpünü etkiler; saniyede 1.225 × 60 × π·11²/4 ≈ 7000 kg hava. Bu yedi tonu yalnızca 1.5 m/s aşağı itmek 10 800 N, yani uçağın ağırlığı kadar kuvvet eder. Yanlış olan, bu ikisinin arasına sıkıştırılan ünlü hikâyedir: 'üstten giden hava daha uzun yol kat eder, alttakiyle firar kenarında aynı anda buluşmak zorunda olduğu için hızlanır.' Böyle bir zorunluluk yoktur; duman tünelinde üstten giden hava alttakinden <em>önce</em> varır. Hızlanmanın nedeni, kanadın çevresindeki akışa eklediği net dönme, yani sirkülasyondur.",
      formula: "L′ = ρ·V<sub>∞</sub>·Γ",
      formulaNote: "Kutta–Jukovski teoremi: birim açıklık başına kaldırma = yoğunluk × hız × sirkülasyon (Γ, m²/s). Sirkülasyonun büyüklüğünü, akışın keskin firar kenarından düzgünce ayrılması koşulu (Kutta koşulu) belirler.",
    },
    {
      heading: "Sınır tabaka ve tutunma kaybı",
      body:
        "Prandtl'ın tabakası kanat üzerinde milimetrelerden birkaç santimetreye kalınlaşır, ama bütün hikâye orada döner. Sırtta hava önce hızlanıp basıncı düşürür, sonra firar kenarına doğru yeniden yavaşlar ve basınç yükselir; sınır tabakadaki yavaşlamış hava bu 'yokuş yukarı' basınca karşı ilerlemek zorundadır. Açı büyüdükçe yokuş dikleşir; çoğu profilde 15°–18° dolayında tabaka yüzeyden kopar, sırtın üstünde girdaplı bir ölü bölge oluşur ve C<sub>L</sub> düşer: <strong>tutunma kaybı</strong> (stall). Tabakanın direnci <strong>Reynolds sayısına</strong> bağlıdır: Re = v·c/ν, atalet kuvvetlerinin viskoz kuvvetlere oranı. 1.5 m veterli bir kanat 60 m/s'de Re ≈ 6 milyonda çalışır; aynı profilin 10 cm'lik modeli aynı hızda 400 bin Re'de daha erken kopar. Tutunma kaybı hızla değil açıyla ilgilidir: yatışlı dönüşte kanat ağırlığın n = 1/cos φ katını taşır, gereken C<sub>L</sub> n katına, tutunma kaybı hızı √n katına çıkar.",
      formula: "v<sub>stall</sub> = √(2·n·W / (ρ·S·C<sub>L,maks</sub>))",
      formulaNote: "Düz uçuşta n = 1. 60° yatışlı dönüşte n = 2 ve tutunma kaybı hızı √2 ≈ 1.41 katına çıkar. Flap C_L,maks'ı büyütür ve bu hızı düşürür. ν havanın kinematik viskozitesi, deniz seviyesinde 1.46×10⁻⁵ m²/s.",
    },
    {
      heading: "Sürükleme, L/D ve menzil",
      body:
        "Sürükleme de aynı kalıpla yazılır: D = ½ρv²SC<sub>D</sub>. C<sub>D</sub> iki parçadır: biçim ve sürtünmeden gelen C<sub>D,0</sub>, bir de kaldırmanın bedeli olan <strong>indüklenmiş sürükleme</strong>. Aşağı sapan hava kanadın gördüğü akımı da biraz aşağı eğer, kaldırma vektörü geriye yatar; uzun ince kanat (yüksek <strong>açıklık oranı</strong>) bu kaybı küçültür. D/L = C<sub>D,0</sub>/C<sub>L</sub> + C<sub>L</sub>/(π·e·AR) ifadesinin C<sub>L</sub>'ye göre türevini sıfırla: en iyi süzülüş iki parçanın eşit olduğu yerde, C<sub>L</sub>* = √(C<sub>D,0</sub>·π·e·AR) değerindedir ve (L/D)<sub>maks</sub> = ½·√(π·e·AR / C<sub>D,0</sub>). L/D, motor dursa bir metre alçalırken kaç metre ileri gideceğindir: yolcu uçaklarında 17–20, yarış planörlerinde 50'nin üstünde. Aynı oran menzili de belirler. Seyirde itki sürüklemeye eşittir, T = W/(L/D); yakıt, itkiyle orantılı hızda yanar, dW/dt = −c·T. dx = v·dt yazıp W'ye göre integral alınca <strong>Breguet menzil denklemi</strong> çıkar: R = (v/c)·(L/D)·ln(W<sub>0</sub>/W<sub>1</sub>).",
      formula: "C<sub>D</sub> = C<sub>D,0</sub> + C<sub>L</sub>² / (π·e·AR),   R = (v/c)·(L/D)·ln(W<sub>0</sub>/W<sub>1</sub>)",
      formulaNote: "AR = b²/S açıklık oranı, e ≈ 0.7–0.95 verim çarpanı, c özgül yakıt tüketimi (1/s). Örnek: v = 250 m/s, c = 0.6/saat, L/D = 18, W₀/W₁ = 1.3 için R = (250 × 3600/0.6) × 18 × ln 1.3 ≈ 7100 km.",
    },
  ],
  lab: {
    intro:
      "Üstteki çizimin üç düğmesi var: <strong>Hücum Açısını Artır</strong>, <strong>Hücum Açısını Azalt</strong> ve <strong>Sıfırla (0°)</strong>. Her basış açıyı 2° değiştirir; alt sınır −2°, üst sınır 22°. Çizimde serbest akım hep yataydır, yalnız kanat döner; sarı kesikli iki çizgi arasındaki açı α'dır. Yeşil L ve kırmızı D oklarının boyu C<sub>L</sub> ve C<sub>D</sub> ile orantılıdır, yüzeydeki basınç okları C<sub>L</sub> ile uzar. Alttaki satır α, C<sub>L</sub>, C<sub>D</sub>, L/D ve akışın durumunu yazar. Dürüst bir uyarı: akım çizgileri akış denklemlerinden hesaplanmaz, nitel bir çizimdir; sayılar ise üç satırlık bir modelden gelir: 14°'ye kadar C<sub>L</sub> = 0.25 + 0.09·α, ötesinde derece başına 0.07 düşüş, C<sub>D</sub> = 0.012 + C<sub>L</sub>²/18.85 ve tutunma kaybından sonra derece başına 0.02 ek sürükleme. 18.85, açıklık oranı 7.5 ve e = 0.8 olan bir kanadın π·e·AR değeridir.",
    experiments: [
      {
        title: "Her iki derece için 0.18",
        predict: "0°'de satır C<sub>L</sub>≈0.25 yazar. Beş kez 'Artır'a basıp 10°'ye çıkınca kaç yazacak? Artış her adımda aynı mı olacak? Peki C<sub>D</sub> de eşit adımlarla mı büyüyecek?",
        do: "'Sıfırla (0°)' ile başla, sonra 'Hücum Açısını Artır'a beş kez bas; her basışta α, C<sub>L</sub> ve C<sub>D</sub> değerlerini bir tabloya yaz. L okunun boyunu ve kanadın arkasında akım çizgilerinin yönünü izle.",
        observe: "C<sub>L</sub>: 0.25, 0.43, 0.61, 0.79, 0.97, 1.15; her adımda tam 0.18. C<sub>D</sub>: 0.015, 0.022, 0.032, 0.045, 0.062, 0.082; adımlar giderek büyür. Durum 8°'ye kadar 'Tutunmuş akış', 10°'de 'Tutunmuş · sınır tabaka kalınlaşıyor' olur. L oku uzar; kanadın arkasında çizgiler belirgin biçimde aşağı eğilir.",
        explain: "0.09/° eğim 2° adımda 0.18 eder; gerçek kanatlarda da küçük açılarda bu doğrusallık ölçülür. C<sub>D</sub> ise C<sub>L</sub>'nin karesiyle büyür: kaldırmayı iki katına çıkarmanın indüklenmiş sürükleme bedeli dört kattır. Arkadaki aşağı eğilme süs değil, kaldırmanın momentum yüzüdür: hava ne kadar aşağı sapıyorsa kanat o kadar yukarı itilir.",
      },
      {
        title: "Burnu aşağı: kaldırma nerede sıfırlanır?",
        predict: "Doğru C<sub>L</sub> = 0.25 + 0.09·α ise −2°'de kaç çıkmalı? Kaldırmanın tam sıfır olması için kaç derece gerekirdi? Sayfa oraya inebiliyor mu?",
        do: "'Sıfırla (0°)' sonra 'Hücum Açısını Azalt'a bir kez bas; satırı oku. İkinci kez bas ve bir şeyin değişip değişmediğine bak. L okunu 0°'dekiyle karşılaştır.",
        observe: "α = −2°'de satır C<sub>L</sub>≈0.07, L/D≈5.7 yazar; ikinci basış −2°'de kalır. L oku neredeyse yok olur ama sıfırlanmaz: burun aşağıdayken bile kanat hâlâ biraz kaldırır.",
        explain: "0.25 − 0.18 = 0.07. Doğruyu uzatırsan sıfır kaldırma −0.25/0.09 ≈ −2.8°'de çıkar; sayfanın alt sınırı oraya yetmez. Gerçek NACA 2412'de bu açı −2° dolayındadır. Kamber, kanadın 'yerleşik' hücum açısıdır; simetrik bir profil tam 0°'de sıfır kaldırma verir, bu yüzden akrobasi uçakları ters uçuşta aynı davranan simetrik profilleri sever.",
      },
      {
        title: "En iyi süzülüş hangi açıda?",
        predict: "L/D oranı hangi açıda en büyük olur: kaldırmanın en büyük olduğu 14°'de mi, sürüklemenin en küçük olduğu −2°'de mi, yoksa arada bir yerde mi? Formül C<sub>L</sub>* = √(C<sub>D,0</sub>·π·e·AR) ne diyor?",
        do: "−2°'den 14°'ye kadar her açıda satırdaki L/D değerini yaz. En büyük değeri ve iki komşusunu işaretle. Sonra √(0.012 × 18.85) hesabını yapıp sayfanın doğrusundan karşılık gelen açıyı bul.",
        observe: "L/D: −2°'de 5.7, 0°'de 16.3, 2°'de 19.7, 4°'de 19.2, 6°'de 17.5, 8°'de 15.7, 14°'de 11.4. Tepe 2° ile 4° arasındadır; en büyük kaldırmanın olduğu 14°'de oran neredeyse yarıya inmiştir.",
        explain: "C<sub>L</sub>* = √(0.012 × 18.85) = 0.476; doğrudan α = (0.476 − 0.25)/0.09 ≈ 2.5° ve (L/D)<sub>maks</sub> = 0.476/(2 × 0.012) ≈ 19.8. Tepe, sabit sürükleme ile indüklenmiş sürüklemenin eşitlendiği yerdedir. Motoru duran pilot bu yüzden burnu ne çok kaldırır ne çok bastırır: en uzağa, en iyi süzülüş hızında gider. 2°'lik düğme adımı tepeyi tam yakalayamaz; 19.7 ile 19.8 arasındaki fark bundandır.",
      },
      {
        title: "Kritik açının ötesi: aynı kaldırma, üç buçuk kat sürükleme",
        predict: "14°'den 22°'ye çıkarken C<sub>L</sub> ve C<sub>D</sub> ne yapacak? 22°'deki kaldırma, hangi küçük açıdaki kaldırmaya eşit olur; o iki durumda sürükleme de aynı mıdır?",
        do: "0°'den başlayıp 'Artır'a yedi kez basarak 14°'ye gel; satırı oku, çizime bak. Sonra 16°, 18°, 20° ve 22° için aynı şeyi yap. Son olarak 8°'ye dönüp C<sub>L</sub> ve C<sub>D</sub>'yi 22°'dekiyle karşılaştır.",
        observe: "14°: C<sub>L</sub>≈1.51, 'Kritik açı · C<sub>L</sub> en büyük'; çizgiler hâlâ sırtı izler. 16°'de resim değişir: sırttaki çizgiler yüzeyden ayrılır, arada kırmızı dalgalı bir ölü bölge belirir, üstteki basınç okları kırmızıya dönüp kısalır; C<sub>L</sub> 1.37'ye düşer, 'Akış ayrıldı — STALL' yazar. Sonra 1.23, 1.09 ve 22°'de 0.95; C<sub>D</sub> ise 0.133'ten 0.220'ye tırmanır. 8°'de C<sub>L</sub>≈0.97, C<sub>D</sub>≈0.062.",
        explain: "Ayrılmış akış sırttaki emme tepesini siler; kaldırma düşer, kanadın arkasındaki geniş iz ise büyük bir basınç sürüklemesi yaratır. 22° ile 8° neredeyse aynı kaldırmayı verir ama sürükleme 0.220/0.062 ≈ 3.5 katıdır: tutunma kaybındaki uçak hem düşer hem frenler. Modelin sınırı: gerçek profillerde düşüş sayfadaki gibi düzgün bir doğru değildir; kimi profil yumuşak, kimi birden bırakır ve açı azaltılırken akış daha küçük bir açıda geri tutunur (histerezis).",
      },
    ],
  },
  wow: [
    {
      title: "İlk uçuş, bir 747'nin kanat açıklığından kısaydı",
      body:
        "17 Aralık 1903'te Orville Wright'ın ilk motorlu uçuşu 12 saniye sürdü ve 36.6 metre kat etti. Bir Boeing 747-400'ün kanat açıklığı 64.4 metredir: Flyer, bugünkü bir jumbo jetin kanadının bir ucundan ötekine bile ulaşamazdı. Aynı günün dördüncü uçuşu 59 saniyede 260 metreye vardı; sonra bir rüzgâr uçağı yerde yuvarlayıp parçaladı ve Flyer bir daha hiç uçmadı.",
    },
    {
      title: "Manş'ı pedal çevirerek geçen kanat",
      body:
        "12 Haziran 1979'da bisikletçi Bryan Allen, Paul MacCready'nin tasarladığı Gossamer Albatross ile Manş Denizi'ni 2 saat 49 dakikada, 35.8 kilometre pedal çevirerek geçti. Uçağın boş kütlesi yaklaşık 32 kilogram, kanat açıklığı 29.8 metreydi: ilk Boeing 737'lerin kanadından geniş, pilotunun yaklaşık yarısı ağırlığında. Yolun çoğunu dalgaların bir iki metre üstünde uçtu; yüzeye bu kadar yakın uçmak (yer etkisi) indüklenmiş sürüklemeyi de azaltır.",
    },
    {
      title: "Dönen parçası olmayan motor, Mach 9.6",
      body:
        "16 Kasım 2004'te NASA'nın insansız X-43A'sı, scramjet motoru yaklaşık 10 saniye çalışırken Mach 9.6'ya, saatte 11 bin kilometreye yakın hıza ulaştı. Scramjetin kompresörü, türbini, pervanesi yoktur; havayı sıkıştıran şey aracın kendi hızıdır ve yakıt, yanma odasından ses üstü hızla geçen havanın içinde yanar. Bu yüzden kendi başına kalkamaz: X-43A'yı önce bir B-52 havaya taşıdı, sonra bir roket yaklaşık 33 kilometre irtifada deney hızına çıkardı; scramjet ancak ondan sonra ateşlendi.",
    },
  ],
  worked: {
    title: "Küçük bir uçağın seyir açısı, gücü ve tutunma kaybı hızı",
    prompt:
      "Kütlesi 1100 kg, kanat alanı 16.2 m², kanat açıklığı 11.0 m olan tek motorlu bir uçak (Cessna 172 ölçüleri) deniz seviyesinde 60 m/s hızla düz uçuyor. Gereken C<sub>L</sub>'yi ve sayfanın modelindeki hücum açısını, C<sub>D,0</sub> = 0.030 ve e = 0.8 alarak sürüklemeyi ve gereken gücü, C<sub>L,maks</sub> = 1.51 ile tutunma kaybı hızını bul.",
    steps: [
      "Model geçerli mi? Mach sayısı 60/340 ≈ 0.18, yani 0.3'ün altında: hava sıkışmaz sayılabilir. Ortalama veter S/b = 16.2/11.0 ≈ 1.47 m; Re = v·c/ν = 60 × 1.47 / (1.46×10⁻⁵) ≈ 6×10⁶: sınır tabaka türbülanslı, profil verileri bu aralıkta ölçülmüş.",
      "Düz uçuşta kaldırma ağırlığa eşit: W = m·g = 1100 kg × 9.81 m/s² = 10 790 N. Dinamik basınç q = ½ρv² = 0.5 × 1.225 kg/m³ × (60 m/s)² = 2205 Pa; q·S = 2205 Pa × 16.2 m² = 35 720 N. Öyleyse C<sub>L</sub> = W/(q·S) = 10 790/35 720 ≈ 0.30.",
      "Sayfanın doğrusuyla açı: 0.30 = 0.25 + 0.09·α ⇒ α ≈ 0.6°. Seyirde kanat neredeyse düz uçar; sayfada 0° ile 2° düğme adımlarının arasındadır.",
      "Sürükleme: AR = b²/S = 121/16.2 ≈ 7.47. İndüklenmiş kısım C<sub>L</sub>²/(π·e·AR) = 0.0913/18.8 ≈ 0.0049; C<sub>D</sub> = 0.030 + 0.0049 ≈ 0.035. L/D = 0.302/0.0349 ≈ 8.7, D = W/(L/D) ≈ 1245 N. Gereken güç P = D·v = 1245 N × 60 m/s ≈ 75 kW. Bu hızda sürüklemenin yedide altısı sabit kısımdır; uçak en iyi süzülüş hızından çok daha hızlı uçmaktadır.",
      "Tutunma kaybı hızı: v = √(2W/(ρ·S·C<sub>L,maks</sub>)) = √(21 580 N / (1.225 × 16.2 × 1.51 kg/m)) = √(720 m²/s²) ≈ 26.8 m/s. Bu yaklaşık 97 km/sa, havacılık diliyle 52 knot; 60° yatışlı dönüşte √2 ile çarpılır ve 38 m/s olur.",
    ],
    result:
      "Seyirde C<sub>L</sub> ≈ 0.30, α ≈ 0.6°, sürükleme ≈ 1.2 kN ve gereken güç ≈ 75 kW; kaldırma 27 m/s'nin (97 km/sa, 52 knot) altında ağırlığa yetmez. Sonuçlar gerçekle aynı mertebededir: bu sınıf uçakların motoru 120–135 kW'tır ve el kitapları flapsız tutunma kaybı hızını 50 knot dolayında verir. Yavaşladıkça pilot açıyı 0.6°'den 14°'ye doğru büyütmek zorundadır; sınırı koyan hız değil, açıdır.",
  },
  misconceptions: [
    {
      myth: "Üstten giden hava, alttan gidenle firar kenarında aynı anda buluşmak zorundadır; uzun yolu aynı sürede gittiği için hızlanır.",
      truth:
        "Böyle bir buluşma kuralı yoktur. Duman tünelinde üstten giden hava alttakinden önce varır; gerçek hız farkı bu 'kuralın' öngördüğünden çok daha büyüktür. Üst yüzeyin uzun olması da şart değildir: düz bir levha ya da simetrik bir profil de açı verildiğinde kaldırır. Hızlanmanın nedeni kanadın akışa eklediği sirkülasyondur.",
    },
    {
      myth: "Kaldırmayı ya Bernoulli ya Newton açıklar; biri doğruysa öteki yanlıştır.",
      truth:
        "İkisi aynı olayın iki muhasebesidir. Kanadın yüzeyindeki basınç farkını toplarsan kaldırmayı bulursun; kanadın arkasında aşağı sapan havanın saniyedeki momentumunu toplarsan yine aynı kaldırmayı bulursun. Basınç farkı olmadan hava aşağı sapamaz, hava aşağı sapmadan basınç farkı sürmez.",
    },
    {
      myth: "Tutunma kaybı, uçağın çok yavaşlayıp 'havada duramaması'dır.",
      truth:
        "Tutunma kaybı bir hız değil açı olayıdır: kanat kritik hücum açısını aştığında akış sırttan kopar. Yavaş uçuşta pilot kaldırmayı korumak için burnu kaldırdığından açı sınıra yaklaşır, bu yüzden ikisi karışır. Ama sert bir dönüşte ya da ani bir çekişte uçak yüksek hızda da tutunma kaybına girer. Sayfanın satırına bak: orada hız yok, yalnızca açı var.",
    },
    {
      myth: "Uçaklar ters uçabildiğine göre kanat profilinin biçimi önemsizdir.",
      truth:
        "Ters uçan akrobasi pilotu burnu kaldırarak kanada yine pozitif hücum açısı verir; kamberli profil ters durumda daha verimsizdir ama açı yetince kaldırır. Akrobasi uçaklarının çoğu bu yüzden simetrik profil kullanır: her iki yöne eşit davranır. Biçim önemsiz değil, açıyla birlikte önemlidir.",
    },
  ],
  glossary: [
    { term: "Hücum açısı (α)", definition: "Kanadın veter çizgisi ile gelen hava akımı arasındaki açı; uçağın ufka göre burun açısıyla karıştırılmamalı." },
    { term: "Veter (chord)", definition: "Kanat profilinin hücum kenarını firar kenarına bağlayan düz çizgi ve onun uzunluğu c." },
    { term: "Kamber", definition: "Profilin orta çizgisinin veterden sapması; kamberli profil sıfır açıda da kaldırır, simetrik profil kaldırmaz." },
    { term: "Kaldırma katsayısı (C_L)", definition: "Kaldırmayı dinamik basınç ve alandan arındıran boyutsuz sayı: C_L = L/(½ρv²S); biçime ve açıya bağlıdır." },
    { term: "Dinamik basınç (q)", definition: "½ρv²; akan havanın durdurulduğunda basınca dönüşen kinetik enerji yoğunluğu, birimi paskal. Pitot tüpünün ölçtüğü toplam basınç ile statik basıncın farkıdır." },
    { term: "Sınır tabaka", definition: "Yüzeye yapışık, hızın sıfırdan serbest akım hızına çıktığı ince katman; sürtünme ve ayrılma burada olur." },
    { term: "Tutunma kaybı (stall)", definition: "Kritik hücum açısı aşıldığında akışın kanat sırtından ayrılması ve kaldırmanın düşüp sürüklemenin büyümesi." },
    { term: "Açıklık oranı (AR)", definition: "Kanat açıklığının karesinin alana oranı, b²/S; büyük AR indüklenmiş sürüklemeyi azaltır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede kaldırma tek bir denklemdir; uçak mühendisliğinin ikinci yılındaki Akışkanlar Mekaniği ve ardından gelen Aerodinamik dersi bu denklemin nereden geldiğini sorar. Havanın hareketi <strong>Navier–Stokes denklemleri</strong>yle yazılır; genel çözümü bilinmez, ama sürtünmeyi ihmal eden potansiyel akış kuramı Kutta–Jukovski teoremini ve ince profil için C<sub>L</sub> = 2π(α − α<sub>0</sub>) sonucunu kalemle türetmeye izin verir. Prandtl'ın taşıyıcı çizgi kuramı sonlu kanada geçer ve bu defterdeki C<sub>L</sub>²/(π·e·AR) terimini verir; sınır tabaka denklemleri sürtünmeyi geri getirip ayrılmanın nerede başlayacağını söyler. Hız sese yaklaştığında hava sıkışır: <strong>Mach sayısı</strong> M = v/a, a = √(γRT); 0.3'ün üstünde yoğunluk değişimi hesaba girer, 0.8 dolayında kanadın sırtında yerel şok dalgaları belirir. Ok açılı kanatlar ve Yeager'ın aştığı 'duvar' Sıkıştırılabilir Akış dersinin konusudur.",
      "İkinci sıçrama hesaplamadır. Hesaplamalı akışkanlar dinamiği (CFD) kanadın çevresini milyonlarca küçük hücreye böler ve her hücrede kütle, momentum ve enerji korunumunu sayısal olarak çözer; sayfadaki C<sub>L</sub> doğrusu, böyle bir hesabın ya da rüzgâr tüneli ölçümünün tek satırlık özetidir. Uçuş Mekaniği kararlılığı türevlerle yazar: burun yukarı sapınca kuyruk onu geri çevirir mi, yani ∂C<sub>m</sub>/∂α negatif mi? Uçak Yapıları kanadı σ = M·y/I ile eğilen bir kiriş olarak görür; İtki Sistemleri jet motorunu Brayton çevrimiyle, yani Termodinamik ile anlatır. Hepsinin ortak dili aynıdır: türev, integral ve diferansiyel denklem.",
    ],
    topics: ["Navier–Stokes denklemleri", "Potansiyel akış ve ince kanat kuramı", "Taşıyıcı çizgi kuramı ve indüklenmiş sürükleme", "Sınır tabaka, Reynolds sayısı ve ayrılma", "Sıkıştırılabilir akış ve Mach sayısı", "Hesaplamalı akışkanlar dinamiği (CFD)", "Uçuş mekaniği ve kararlılık türevleri", "Brayton çevrimi ve jet itkisi"],
  },
  quiz: [
    {
      question: "Aynı irtifada ve aynı hücum açısında uçan bir uçak hızını iki katına çıkarırsa kaldırma kuvveti ne olur?",
      options: ["Değişmez", "İki katına çıkar", "Dört katına çıkar", "Yarıya iner"],
      answer: 2,
      explanation: "L = ½ρv²SC_L; ρ, S ve C_L sabitken kaldırma v² ile büyür, 2² = 4. Düz uçuşta kalmak için pilot açıyı küçültüp C_L'yi dörtte bire indirmek zorundadır.",
    },
    {
      question: "Düz uçuşta tutunma kaybı hızı 50 knot olan bir uçak, irtifasını koruyarak 60° yatışlı bir dönüş yapıyor. Tutunma kaybı hızı yaklaşık kaç knot olur?",
      options: ["50 knot; yatış hızı etkilemez", "71 knot", "100 knot", "35 knot"],
      answer: 1,
      explanation: "Dönüşte kaldırmanın düşey bileşeni ağırlığı taşımalıdır: L·cos 60° = W, yani L = 2W. Tutunma kaybı hızı √(2nW/(ρSC_L,maks)) ile, yani √n ile büyür: 50 × √2 ≈ 71 knot. Kritik açı aynıdır; değişen, o açıda gereken hızdır.",
    },
    {
      question: "Sayfada 8°'de C<sub>L</sub>≈0.97, C<sub>D</sub>≈0.062; 22°'de C<sub>L</sub>≈0.95, C<sub>D</sub>≈0.220 yazıyor. Aynı hızda bu iki durum için hangisi doğrudur?",
      options: [
        "22°'de kaldırma çok daha büyüktür, çünkü açı büyüktür",
        "Kaldırma neredeyse aynıdır ama 22°'de sürükleme yaklaşık 3.5 katıdır",
        "İkisinde de L/D aynıdır",
        "22°'de sürükleme daha küçüktür, çünkü akış ayrılmıştır",
      ],
      answer: 1,
      explanation: "Aynı hızda kuvvetler katsayılarla orantılıdır: kaldırmalar 0.95'e 0.97, sürüklemeler 0.220'ye 0.062, yani yaklaşık 3.5 kat. L/D 15.7'den 4.3'e iner. Ayrılmış akış sırttaki emmeyi silerken arkada geniş, düşük basınçlı bir iz bırakır; tutunma kaybındaki kanat az kaldırıp çok frenler.",
    },
  ],
  next: [
    { href: "akiskanlar-mekanigi.html", title: "Akışkanlar Mekaniği: Akış, Kayıp ve Pompa", why: "Venturi sekmesinde daralan boruda hız artarken basıncın düştüğünü ölç; viskoz akış sekmesi sınır tabakanın kökündeki sürtünmeyi gösterir." },
    { href: "doppler-etkisi.html", title: "Doppler Etkisi: Dalga Cepheleri ve Ses Patlaması", why: "Kaynak hızını ses hızının üstüne çıkar, Mach konisini gör: Yeager'ın 1947'de aştığı sınırın dalga resmi." },
    { href: "serbest-dusme.html", title: "Serbest Düşme: Galileo'dan Limit Hıza", why: "Hızın karesiyle büyüyen sürüklemenin en yalın hâli: düşen top ve limit hız." },
    { href: "otonom-araclar-ve-iha.html", title: "Otonom Araçlar ve İnsansız Hava Araçları", why: "Dört pervaneli drone ağırlığını kanatla değil itkiyle taşır; askı gücü hesabı ve onu dengede tutan PID döngüsü." },
  ],
  sources: [
    { title: "OpenStax · University Physics Vol. 1, 14.6 Bernoulli's Equation", url: "https://openstax.org/books/university-physics-volume-1/pages/14-6-bernoullis-equation", note: "Bernoulli denkleminin enerji korunumundan türetimi ve uygulamaları (İngilizce, açık ders kitabı)." },
    { title: "Wikipedia · Lift (force)", url: "https://en.wikipedia.org/wiki/Lift_(force)", note: "Kaldırmanın basınç ve momentum açıklamaları, 'eşit geçiş süresi' yanılgısı ve sirkülasyon kuramı; kaynaklı ve dengeli." },
    { title: "Wikipedia · Wright brothers", url: "https://en.wikipedia.org/wiki/Wright_brothers", note: "1901 rüzgâr tüneli, Smeaton katsayısı, 1902 planörü ve 17 Aralık 1903 uçuşlarının belgeli anlatımı." },
    { title: "Wikipedia · Range (aeronautics)", url: "https://en.wikipedia.org/wiki/Range_(aeronautics)", note: "Breguet menzil denkleminin jet ve pervaneli uçaklar için türetimi." },
  ],
  revision: "Kasım 2026",
};
