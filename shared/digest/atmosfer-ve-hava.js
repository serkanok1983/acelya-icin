window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["atmosfer-ve-hava"] = {
  slug: "atmosfer-ve-hava",
  title: "Atmosfer ve Hava: Basınçtan Buluta, Buluttan Rüzgâra",
  field: "Yer ve Çevre Bilimleri",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Havanın kütlesinin yarısı ilk 5,5 km'dedir, yükselen hava her kilometrede yaklaşık 10 derece soğur ve rüzgâr alçak basınca doğru değil, izobarlara paralel eser. Hepsi birkaç denklemden çıkar.",
  hook:
    "Rüzgâr neden yüksek basınçtan alçağa dosdoğru esmez de alçak basıncın çevresinde döner? Dağın bir yamacında yağmur yağarken öbür yamacında neden kuru ve sıcak bir rüzgâr eser? Ve Everest'in üçte ikisine bile varmadan havanın tam yarısı nasıl geride kalır?",
  bigIdea:
    "Hava durumu, ağırlığını taşıyan, genleşirken soğuyan, doyunca gizli ısı bırakan ve dönen bir gezegenin üstünde akan bir gazın fiziğidir: <strong>hidrostatik denge</strong>, <strong>adyabatik soğuma</strong> ve <strong>Coriolis</strong> üçlüsü bulutların nerede doğacağını ve rüzgârın nereye eseceğini söyler.",
  story: [
    "Havanın bir ağırlığı olduğunu göstermek on yedinci yüzyılı aldı. Gasparo Berti 1640'lı yılların başında Roma'da uzun bir boruyu suyla doldurup tersine dikti; su yaklaşık 10,3 metrede durdu ve üstünde boş bir yer kaldı. Evangelista Torricelli aynı deneyi sudan 13,6 kat yoğun cıvayla yaptı (geleneksel tarih 1643; tarihçi Middleton 1644'ü savunur) ve sütunu 80 santimetrelik bir tüpe sığdırdı: cıvayı yukarıda tutan, kuyudaki yüzeye bastıran havanın ağırlığıydı. Blaise Pascal bu yorumu sınamak istedi. Eylül 1648'de eniştesi (kız kardeşi Gilberte'in kocası) Florin Périer bir barometreyi 1465 metrelik Puy de Dôme'a taşıdı ve cıvanın yukarıda daha alçakta durduğunu gördü. Yükseldikçe üstte kalan hava azalıyordu.",
    "Bulutların nereden geldiği sorusu ise ısıyla ilgiliydi. Amerikalı James Pollard Espy, 1830'larda yükselen havanın genleşip soğuduğunu, buharını yoğuşturduğunu ve açığa çıkan gizli ısının fırtınayı beslediğini savundu; kuramını 1836'da Amerikan Felsefe Derneği'ne anlattı ve 1841'de Boston'da yayımlanan <em>The Philosophy of Storms</em> kitabında topladı. Konferansları ona \"Fırtına Kralı\" lakabını kazandırdı; 1840'ların başında da ABD hükümetinin ilk resmî meteoroloğu oldu (kaynaklar 1842 ile 1843 arasında ayrışır). Bugün hâlâ kullanılan ve onun adıyla anılan bulut tabanı kuralı şöyledir: sıcaklık ile çiğ noktası arasındaki her derece fark, yaklaşık 125 metre demektir.",
    "Rüzgârın yönü dönen Dünya'ya bağlıdır. Gaspard-Gustave de Coriolis 1835'te dönen parçalı makinelerin, örneğin su çarklarının, enerji hesabını yaparken bugün onun adını taşıyan terimi yazdı. William Ferrel 1856'da bu sapmayı atmosfere uyguladı: orta enlemlerin batı rüzgârlarını ve alçak basıncın çevresinde dönen havayı açıkladı. Hollandalı Christophorus Buys Ballot, 9 Kasım 1857 tarihli bir makalesinde aynı ilişkiyi gözlemlerden kural olarak yazdı: kuzey yarımkürede rüzgârı arkana alırsan alçak basınç solunda kalır.",
    "Yirminci yüzyıl havayı hesaplamaya girişti. Vilhelm Bjerknes 1917'de Bergen'e geçti ve çevresinde genç bir ekip toplandı: oğlu Jacob Bjerknes, Halvor Solberg, biraz sonra Tor Bergeron. Bu \"Bergen okulunun\" 1919–1922 arasında ortaya koyduğu cephe ve siklon modeli hava haritalarının dilini değiştirdi. Aynı yıllarda Lewis Fry Richardson, Fransa'da bir Quaker ambulans biriminde görev yaparken havayı doğrudan hareket ve termodinamik denklemlerinden, elle hesaplamayı denedi. Hesap 1922'de <em>Weather Prediction by Numerical Process</em> kitabında yayımlandı; sonucu felaketti, ama yöntemi doğruydu (ayrıntısı aşağıdaki \"vay\" notunda). Bugünkü sayısal hava tahmini Richardson'ın hayal ettiği hesabın bilgisayarda yapılanıdır.",
  ],
  core: [
    {
      heading: "Basınç bir ağırlıktır: hidrostatik denge ve ölçek yüksekliği",
      body:
        "İnce bir hava dilimini düşün: altındaki basınç, üstündekinden dilimin ağırlığı kadar fazladır, <em>dp = −ρg dz</em>. Hava ideal gaz olduğu için yoğunluk basınçla orantılıdır, ρ = pM/(R*T); bu yüzden basınç azaldıkça yoğunluk da azalır ve basınç yükseklikle doğrusal değil <strong>üstel</strong> düşer. Sıcaklık sabit olsaydı her <strong>ölçek yüksekliği</strong> H'de basınç e katı azalırdı; 288 K için H = 8,430 km. Gerçek atmosfer ise katmanlıdır: ABD Standart Atmosferi 1976'da troposfer kilometrede 6,5 K soğur, 11 km'de tropopoz başlar, stratosfer ısınır. Soğuk hava daha yoğundur, sütun daha sık paketlenir; bu yüzden 5 km'de 288 K'lik izotermal model basıncı %3,7 fazla verir ve fark yukarı doğru büyür.",
      formula: "d ln p/dz = −Mg/(R*T(z)) &nbsp;·&nbsp; T sabitse p = p₀e<sup>−z/H</sup>, H = R*T/(Mg)",
      formulaNote: "M = 28,9644 g/mol havanın mol kütlesi, R* = 8,31432 J/(mol·K). p/p₀ aynı zamanda o yüksekliğin üstünde kalan hava kütlesinin payıdır.",
    },
    {
      heading: "Genleşen hava neden soğur: kuru adyabatik oran",
      body:
        "Yükselen bir <strong>parsel</strong>, çevresinden ısı almadan daha düşük basınca karşı genleşir; çevresini iterken yaptığı iş kendi iç enerjisinden çıkar. Termodinamiğin birinci yasası birim kütle için c<sub>p</sub>dT − dp/ρ = 0 der. Hidrostatik dengeyi (dp/ρ = −g dz) yerine koyunca güzel bir sonuç kalır: c<sub>p</sub>dT = −g dz. Kuru hava için c<sub>p</sub> = 1003,5 J/(kg·K) ile bu, kilometrede 9,77 K soğuma demektir. Aynı süreçte korunan nicelik <strong>potansiyel sıcaklıktır</strong>: θ, parseli 1000 hPa'ya kuru adyabatik olarak indirsen göstereceği sıcaklıktır.",
      formula: "Γ<sub>d</sub> = g/c<sub>p</sub> ≈ 9,77 K/km &nbsp;·&nbsp; θ = T(1000 hPa/p)<sup>R<sub>d</sub>/c<sub>p</sub></sup>",
      formulaNote: "R<sub>d</sub>/c<sub>p</sub> ≈ 0,286. Bu soğuma dağın soğukluğunun asıl nedenidir; havanın yerden uzaklığı ya da 'inceliği' değil.",
    },
    {
      heading: "Çiğ noktası, bulut tabanı ve nemli adyabat",
      body:
        "Havadaki su buharı ölçüsü olan <strong>karışım oranı</strong> r, kuru yükselişte korunur; ama doyma buhar basıncı sıcaklıkla üstel düştüğü için (Magnus biçimi, Bolton sabitleri) parsel bir yükseklikte doyar: <strong>yükselme yoğuşma düzeyi</strong> (LCL), yani bulut tabanı. Çiğ noktası da yükselirken düşer, ama kilometrede yalnızca 1,8 K kadar. Parsel sıcaklığı 9,77 K/km, çiğ noktası 1,8 K/km düşerse aradaki fark kilometrede 8 K kapanır: 1/(8 K/km) ≈ 125 m/K. Espy kuralının kökü budur. Bulutun içinde yoğuşan su gizli ısı bırakır ve soğuma yavaşlar: <strong>nemli adyabatik oran</strong> sıcak, nemli havada 4 K/km'ye iner, üst troposferin soğuk ve neredeyse kuru havasında 9 K/km'ye yaklaşır.",
      formula: "z<sub>LCL</sub> ≈ 125 m/K × (T − T<sub>d</sub>) &nbsp;·&nbsp; Γ<sub>m</sub> = g(1 + Lr/(R<sub>d</sub>T)) / (c<sub>p</sub> + L²r/(R<sub>v</sub>T²))",
      formulaNote: "L = 2,501 × 10⁶ J/kg buharlaşma ısısı. Espy kuralı olağan koşullarda yaklaşık %1 içinde tutar.",
    },
    {
      heading: "Kararlılık, Brunt–Väisälä frekansı ve CAPE",
      body:
        "Kararlılık bir karşılaştırmadır: itilen parsel kendi adyabatı boyunca soğur, çevre ise ölçülen eğimiyle (Γ). Γ &lt; Γ<sub>m</sub> ise hava <strong>mutlak kararlı</strong>, Γ &gt; Γ<sub>d</sub> ise <strong>mutlak kararsız</strong>, arada <strong>koşullu kararsızdır</strong>: kuru parsel geri döner, doymuş parsel kaçar. Kararlı havada kaldırma ivmesi b = g(θ<sub>p</sub> − θ<sub>ç</sub>)/θ<sub>ç</sub> yer değiştirmeyle orantılıdır, yani parsel bir yay gibi salınır: z'' = −N²(z − z₀). Kararsız havada N² negatiftir ve parsel üstel kaçar. Doymuş parselin çevreden sıcak olduğu bütün katmandaki kaldırma işi <strong>CAPE</strong>'tir; fırtınanın yakıt deposu. Enerjinin tamamı harekete dönseydi yukarı hız √(2·CAPE) olurdu; gerçek akımlar karışım ve su yükü yüzünden daha yavaştır.",
      formula: "N² = (g/θ) dθ/dz = (g/T)(Γ<sub>d</sub> − Γ) &nbsp;·&nbsp; periyot 2π/N &nbsp;·&nbsp; CAPE = ∫ b dz (LFC → EL)",
      formulaNote: "Standart troposferde N ≈ 0,011 s⁻¹, periyot yaklaşık 10 dakika. LFC serbest konveksiyon düzeyi, EL denge düzeyidir.",
    },
    {
      heading: "Dönen çerçevede rüzgâr: Coriolis, jeostrofik denge ve sürtünme",
      body:
        "Dünya ile dönen bir çerçevede yatay hareket eden her şey, kuzey yarımkürede hareket yönünün sağına sapar; yerel dönme hızı <strong>Coriolis parametresi</strong> f = 2Ω sin φ'dir (45°'de 1,031 × 10⁻⁴ s⁻¹). Durgun hava basınç gradyanıyla alçağa doğru hızlanmaya başlar, Coriolis onu sağa büker ve sonunda iki kuvvet dengelenir: <strong>jeostrofik rüzgâr</strong> izobarlara paralel eser, alçak basınç solda kalır (Buys Ballot). Hava bu dengeye doğrudan oturmaz; çevresinde 2π/|f| periyotla bir <strong>eylemsizlik çemberi</strong> çizer. Hareket denklemlerini karmaşık hız w = u + iv ile yazınca dw/dt = ia − (k + if)w çıkar; çözüm üstel olarak sönen bir dönmedir. Yere yakın sürtünme (−kv) hızı düşürür, Coriolis zayıflar ve rüzgâr izobarları tan α = k/|f| açısıyla keserek alçağa akar: alçak basınçta hava toplanır, yükselir, bulut olur.",
      formula: "v<sub>g</sub> = |∂p/∂n| / (ρ|f|) &nbsp;·&nbsp; T<sub>e</sub> = 2π/|f| &nbsp;·&nbsp; tan α = k/|f|",
      formulaNote: "Ekvatorda f = 0: jeostrofik denge kurulamaz. Model f-düzlemidir; f'nin enlemle değişimi (β etkisi) yoktur.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var ve her sekme bir ölçümü kuramla yan yana koyar. <strong>01 · Basınç ve yükseklik</strong>, ABD Standart Atmosferi 1976'nın sıcaklık katmanlarından basıncı sayısal tümler ve tek sıcaklıklı izotermal modelle, 1976 tablosuyla ve Clausius–Clapeyron kaynama noktasıyla karşılaştırır. <strong>02 · Adyabatik soğuma ve bulut tabanı</strong>, bir parseli dağın üstünden geçirir: çiğ noktası, bulut tabanı, Espy kuralı, ölçülen kuru ve nemli oranlar, rüzgâr altındaki föhn. <strong>03 · Kararlılık</strong>, dört katmanlı bir sondada kararlılık sınıflarını, itilen parselin salınımını ve CAPE'i ölçer. <strong>04 · Basınç sistemleri ve Coriolis</strong>, durgun bırakılan havanın jeostrofik rüzgâra nasıl vardığını ve dairesel bir merkezin çevresinde hangi yöne döndüğünü gösterir. R tuşu etkin sekmeyi sıfırlar; Boşluk 3. ve 4. sekmede benzetimi duraklatır.",
    experiments: [
      {
        title: "Tek sıcaklık neden yetmez?",
        predict: "Tropopozda (11 km) gerçek basınç, 288 K'lik izotermal modelin verdiğinden büyük mü küçük mü olur? Fark 5 km'dekinden büyük mü olur?",
        do: "Basınç ve yükseklik sekmesinde varsayılanla başla (z = 5 km, T = 288 K) ve kutuları oku. Sonra \"z = 11 km: tropopoz\" düğmesine, ardından \"z = 30 km\" düğmesine bas. En sonda \"Varsayılanlara dön\" ve \"T = 250 K\".",
        observe: "5 km'de katmanlı basınç 540,2 hPa, izotermal 559,9 hPa (+3,7 %), kaynama noktası 82,9 °C. 11 km'de 226,3 hPa ile 274,8 hPa (+21,4 %); kaynama 61,7 °C ile 66,2 °C; üstte kalan kütle %22,3. 30 km'de 11,7 hPa ile 28,9 hPa (+146,2 %), su 5,2 °C'de kaynar. T = 250 K yapınca ölçek yüksekliği 8,430 km'den 7,318 km'ye iner ve 5 km'deki fark −5,3 %'e döner. Basıncın yarıya indiği yükseklik 5,477 km'dir.",
        explain: "Troposfer 288 K'den 216,65 K'ye soğur; soğuk hava daha yoğun, sütun daha kısa olduğu için basınç izotermal modelden hızlı düşer. Her kilometre hata bir çarpan olarak üst üste bindiği için fark yukarı doğru büyür. 250 K'lik izotermal sütun ise troposferin ortalamasından soğuktur ve hatanın işaretini çevirir.",
      },
      {
        title: "Föhn: rüzgâr altındaki sıcak rüzgâr",
        predict: "15 °C ve %80 nemli hava 3000 metrelik bir dağı aşıp aynı basınç düzeyine inerse karşı yamaçta kaç derece olur? Sıcaklığı nereden kazanır?",
        do: "Adyabatik soğuma ve bulut tabanı sekmesinde \"Föhn: 15 °C, %80, 3000 m\" düğmesine bas. Bulut tabanını, tepedeki parseli, rüzgâr altı yüzeyi ve ısınma kutusunu oku. Karşılaştırma için \"Kuru öğle: 35 °C, %20\" düğmesine bas.",
        observe: "Çiğ noktası 11,58 °C, bulut tabanı 429 m (Espy 427 m, −0,35 %). Ölçülen kuru oran 9,7724 K/km, nemli oran 5,142 K/km (formül 5,139). Tepede parsel −3,6 °C, yağışla 4,30 g/kg su düşmüş. Rüzgâr altında hava 26,3 °C ve %19,7 nemli iner: ısınma +11,35 K. L·Δr/c<sub>p</sub> kestirimi 10,71 K'dir; basınç düzeltmeli toplam 11,35 K ile tam örtüşür. Kuru öğlede bulut tabanı 3252 m'dir, tepeden yüksektir: yoğuşma olmaz ve ısınma 0,00 K çıkar.",
        explain: "Yükseliş 429 m'den sonra nemli, iniş baştan sona kuru adyabatla olur; fark, yağışla düşen suyun bıraktığı gizli ısıdır. Basit L·Δr/c<sub>p</sub> kestirimi yaklaşık %6 eksik kalır, çünkü gizli ısı yüksekte, düşük basınçta eklenir: θ korunduğu için parsel p<sub>s</sub>'ye inerken o ısınma (p<sub>s</sub>/p)<sup>R<sub>d</sub>/c<sub>p</sub></sup> çarpanıyla büyür; bulut tabanında 1,01, tepede 1,11'dir. Her yoğuşma adımı kendi çarpanıyla toplanınca ölçülen ısınma tam çıkar. Su yağmur olarak düşmezse (kuru öğle) gidiş-dönüş tam simetriktir. Gerçek föhnda yukarıdaki sıcak havanın aşağı çekilmesi de katkı verir; sayfa yalnız gizli ısıyı modeller.",
      },
      {
        title: "Kararlı hava yaylanır, kararsız hava kaçar",
        predict: "Standart profilde 2000 m'de itilen kuru parselin salınım periyodu dakika mertebesinde mi, saat mertebesinde mi? Yer inversiyonunda periyot uzar mı kısalır mı?",
        do: "Kararlılık sekmesinde varsayılan (\"Standart\") profilde salınımı izle; Benzetim hızını 300 kat yapabilirsin. Sonra sırayla \"Yer inversiyonu\", \"Süper adyabatik\" ve \"Fırtına sondası\" düğmelerine bas; tabloyu, N², periyot ve CAPE kutularını oku.",
        observe: "Standart: N² = 1,166 × 10⁻⁴ s⁻², ölçülen periyot 581,8 s (2π/N = 9,70 dk); tablo ilk iki katmanı koşullu kararsız, üsttekileri kararlı gösterir; CAPE 0 J/kg. Yer inversiyonu (0–1 km −8 K/km): N² = 6,177 × 10⁻⁴ s⁻², periyot 252,8 s = 4,21 dk. Süper adyabatik (0–1 km 11 K/km): katman mutlak kararsız, N² = −4,044 × 10⁻⁵ s⁻², başlık \"Ölçülen büyüme hızı σ\"ya döner ve √(−N²) ≈ 6,36 × 10⁻³ s⁻¹ ile örtüşür; parsel 1000 m'deki sınırı geçince üstteki kararlı katmanda geri döner. Fırtına sondası: CAPE 2696 J/kg, CIN −8,2 J/kg, LCL 745 · LFC 864 · EL 11 443 m; EL'de hız 73,43 m/s = √(2·CAPE).",
        explain: "N² eğim farkıyla (Γ<sub>d</sub> − Γ) orantılıdır: inversiyonda fark 9,77 − 6,5 = 3,3 K/km'den 9,77 + 8 ≈ 17,8 K/km'ye çıkar, N² yaklaşık beş, periyot yaklaşık √5 ≈ 2,3 kat değişir. Bu yüzden inversiyon bir kapak gibidir: dumanı ve sisi yere hapseder. Fırtına sondasında küçük bir CIN engeli aşılınca parsel 11 km'ye kadar çevresinden sıcak kalır; 73 m/s bir üst sınırdır, gerçek fırtına akımları karışım ve su yükü yüzünden daha yavaştır.",
      },
      {
        title: "Rüzgâr alçağa neden esmez?",
        predict: "Durgun bırakılan hava, 45° kuzeyde 1 hPa/100 km'lik gradyanla kaç saat sonra dengeye yaklaşır ve hangi yöne eser? Güney yarımkürede ve sürtünmeyle ne değişir?",
        do: "Basınç sistemleri ve Coriolis sekmesinde varsayılanla izle (iki eylemsizlik geçişi için benzetimde yaklaşık 30 saat gerekir). Sonra \"Güney 45°\", ardından \"Sürtünmeli yüzey\" ve en sonda \"Ekvator\" düğmesine bas; dairesel merkezdeki dönüş yönünü oku.",
        observe: "Varsayılanda f = 1,031 × 10⁻⁴ s⁻¹, jeostrofik rüzgâr 7,92 m/s doğuya (alçak solda); ölçülen ortalama hız 7,92 m/s, eylemsizlik periyodu 16,924 sa; alçağın çevresinde dönüş saat yönünün tersine. Güney 45°'de rüzgâr batıya eser (alçak sağda), dönüş saat yönündedir. Sürtünmeli yüzeyde (k = 10 × 10⁻⁵ s⁻¹) hız 5,68 m/s'ye düşer, izobarları kesme açısı 44,12° olur, parçacıklar merkeze sarmal çizerek toplanır. Ekvatorda jeostrofik rüzgâr \"Tanımsız\" olur ve hava doğrudan alçağa hızlanır; sürtünme hâlâ açıksa hız (1/ρ)|∂p/∂n|/k = 8,16 m/s'de durur, kutuyu kapatırsan a·t ile artar.",
        explain: "Coriolis ivmesi hızla orantılıdır; hava hızlandıkça sapma büyür ve basınç kuvvetini karşılayana dek sürer. Parsel dengeyi aşar ve bir çember çizerek 2π/|f| periyotla salınır, ortalaması tam v<sub>g</sub>'dir. Sürtünme hızı düşürünce Coriolis basınç kuvvetini karşılayamaz; denge rüzgârı tan α = k/|f| = 10/10,31 açısıyla alçağa yönelir. Alçakta toplanan hava yükselir: yağışlı havanın siklonlara bağlanması buradan gelir.",
      },
    ],
  },
  wow: [
    {
      title: "İki dakikada 27 derece",
      body:
        "22 Ocak 1943 sabahı 7.32'de Güney Dakota'nın Spearfish kasabasında sıcaklık iki dakikada −20 °C'den 7 °C'ye çıktı, aynı gün 27 dakikada 32 derece geri düştü. ABD Ulusal Hava Servisi bunu Black Hills'in yamaçlarında gelgit gibi ileri geri kayan bir cepheye bağlar: tepeler ılık Pasifik havasının içinde kalırken ovada sığ ve dondurucu bir Arktik hava gölü vardı ve sınır kasabanın üstünden gidip geldi. Saf bir föhn rekoru Montana'dan gelir: 14–15 Ocak 1972'de Loma'da bir chinook (Kuzey Amerika'nın föhnu) sıcaklığı 24 saatte −48 °C'den 9 °C'ye, 57 derece çıkardı; bu ABD'nin resmî ulusal rekorudur.",
    },
    {
      title: "Havanın yarısı 5,5 km'de biter",
      body:
        "Basınç, üstteki havanın ağırlığı olduğu için p/p₀ oranı aynı zamanda üstte kalan hava kütlesinin payıdır. Standart atmosferde basınç 5,477 km'de yarıya iner: havanın yarısı bu yüksekliğin altındadır. Everest'in zirvesine yakın 8,8 km'de basınç 316,7 hPa'dır; bir dağcının altında havanın üçte ikisinden fazlası kalmıştır ve sayfanın sabit ΔH'li Clausius–Clapeyron hesabına göre su 69,6 °C'de kaynar (buhar tabloları yaklaşık 70,3 °C verir).",
    },
    {
      title: "Elle yapılan ilk hava tahmini",
      body:
        "Lewis Fry Richardson, Birinci Dünya Savaşı'nda bir ambulans biriminde görevliyken 20 Mayıs 1910 havasının altı saatlik tahminini kâğıt kalemle hesapladı. Sonuç altı saatte 145 hPa'lık bir basınç artışıydı; gerçekte basınç neredeyse hiç değişmemişti. Onlarca yıl sonra Peter Lynch hatanın yöntemde değil, başlangıç verilerinin yumuşatılmamasında olduğunu gösterdi: yumuşatılmış verilerle Richardson'ın hesabı büyük ölçüde doğru çıkıyor.",
    },
  ],
  worked: {
    title: "5 km'de çay neden 83 derecede kaynar?",
    prompt:
      "ABD Standart Atmosferi 1976'da deniz düzeyinde T₀ = 288,15 K, p₀ = 101 325 Pa ve troposferde eğim 6,5 K/km'dir. 5 km'deki basıncı önce 288 K'lik izotermal modelle, sonra katmanlı profille bul; ardından buharlaşma ısısını ΔH = 40,65 kJ/mol sabit alarak suyun bu basınçta kaynama noktasını hesapla.",
    steps: [
      "Ölçek yüksekliği: H = R*T/(Mg) = (8,31432 J/(mol·K) × 288 K) / (0,0289644 kg/mol × 9,80665 m/s²) ≈ 8430 m. İzotermal model: p = p₀e<sup>−z/H</sup> = 1013,25 hPa × e<sup>−5000/8430</sup> = 1013,25 × 0,5526 ≈ 559,9 hPa.",
      "Katmanlı profil: troposferde T = T₀ − Lz doğrusal düştüğü için dp/p = −Mg dz/(R*T) tümlenince p = p₀(T/T₀)<sup>Mg/(R*L)</sup> çıkar. 5 km'de T = 288,15 − 32,5 = 255,65 K, üs Mg/(R*L) = (0,0289644 × 9,80665)/(8,31432 × 0,0065) ≈ 5,256. (255,65/288,15)<sup>5,256</sup> = e<sup>5,256 × ln 0,8872</sup> = e<sup>−0,629</sup> ≈ 0,5331, yani p ≈ 540,2 hPa. İzotermal model %3,7 fazla verir, çünkü sütunun ortalaması 288 K'den soğuktur.",
      "Clausius–Clapeyron: ΔH sabitken 1/T<sub>k</sub> = 1/T<sub>k0</sub> − (R/ΔH) ln(p/p₀). R/ΔH = 8,3145/40 650 ≈ 2,045 × 10⁻⁴ K⁻¹ ve ln(0,5331) = −0,629 için 1/T<sub>k</sub> = 1/373,15 + 1,287 × 10⁻⁴ = 2,6799 × 10⁻³ + 0,1287 × 10⁻³ = 2,8085 × 10⁻³ K⁻¹.",
      "Tersini al: T<sub>k</sub> ≈ 356,06 K = 82,9 °C. Deniz düzeyine göre 17,1 K düşüş, kilometrede ortalama 3,4 K. Buhar tabloları bu basınçta yaklaşık 83,3 °C verir: buharlaşma ısısı 100 °C'nin altında biraz büyüktür, ΔH'yi sabit almak kaynama noktasını 0,35 K kadar düşük kestirir.",
      "Sayfada dene: Basınç ve yükseklik sekmesi varsayılanda (z = 5 km, T = 288 K) tam bu sayıları gösterir: katmanlı 540,2 hPa, izotermal 559,9 hPa (+3,7 %), kaynama 82,9 °C ve izotermal basınçla 83,8 °C (+0,93 K).",
    ],
    result:
      "5 km'de basınç deniz düzeyinin %53'ü kadardır (540,2 hPa) ve su 82,9 °C'de kaynar. Makarna bu sıcaklıkta daha geç pişer; düdüklü tencere basıncı yükselterek kaynama noktasını geri getirir.",
  },
  misconceptions: [
    {
      myth: "Lavabo ve klozet suyu kuzey yarımkürede bir yöne, güneyde öbür yöne döner; bunu Coriolis belirler.",
      truth:
        "Coriolis ivmesi hızın f katıdır ve f ≈ 10⁻⁴ s⁻¹'dir. 30 cm'lik bir lavaboda 0,1 m/s'lik akış için Rossby sayısı U/(fL) ≈ 0,1/(10⁻⁴ × 0,3) ≈ 3000'dir: dönmenin etkisi kabın biçimi, giderin konumu ve suyun ilk hareketi yanında binlerce kat küçüktür. Ascher Shapiro 1962'de MIT'te 2 metrelik bir havuzu bir gün dinlendirdikten sonra boşaltınca tutarlı bir saat yönü tersi dönüş görebildi; Coriolis ivmesi orada yerçekiminin yaklaşık 3 × 10⁻⁷'si kadardı; Trefethen'in ekibi Sidney'de saat yönünde dönüş buldu. Coriolis ancak yüzlerce kilometrelik akımlarda belirleyicidir.",
    },
    {
      myth: "Rüzgâr yüksek basınçtan alçak basınca dosdoğru eser.",
      truth:
        "Yerden yüksekte rüzgâr izobarlara neredeyse paraleldir: basınç kuvvetini Coriolis dengeler ve alçak basınç (kuzeyde) rüzgârı arkana aldığında solunda kalır. Alçağa doğru akış yalnız yere yakın sürtünme katmanında, izobarları bir açıyla keserek olur. Sayfada sürtünmesiz kesme açısı 0,00°, \"Sürtünmeli yüzey\" ile 44,12°'dir.",
    },
    {
      myth: "Dağların tepesi soğuktur, çünkü Güneş'in ısıttığı yerden uzaktır ya da ince hava ısıyı tutamaz.",
      truth:
        "Yükselen hava genleşir ve çevresini iterken iç enerjisini harcar: kuru hava kilometrede 9,77 K soğur. Aynı hava yeniden alçaldığında sıkışır ve aynı oranda ısınır; föhn bunun gösterisidir. Troposferin ortalama 6,5 K/km'lik soğuması da buradan çıkar: yerden ısınan hava konveksiyonla yükselip karışır, ışınım soğutur ve nemli konveksiyon eğimi kuru orandan aşağıda tutar.",
    },
    {
      myth: "Bulut tabanı, havanın soğuyup buharı tutamadığı rastgele bir yüksekliktir.",
      truth:
        "Bulut tabanı, hava iyi karışmışsa yüzeydeki sıcaklık ve çiğ noktasından iyi bir yaklaşıkla hesaplanır: fark her kilometrede yaklaşık 8 K kapanır, bu yüzden z ≈ 125 m × (T − T<sub>d</sub>). Yaz öğleden sonralarında kümülüs bulutlarının düz ve aynı yükseklikte tabanları bundandır. Sayfanın varsayılanında parsel tümlemesi 1394 m, Espy kuralı 1392 m verir.",
    },
  ],
  glossary: [
    { term: "Hidrostatik denge", definition: "Bir hava diliminin ağırlığının altındaki ve üstündeki basınç farkıyla tam karşılanması, dp/dz = −ρg." },
    { term: "Ölçek yüksekliği (H)", definition: "İzotermal bir atmosferde basıncın e katı azaldığı yükseklik, H = R*T/(Mg); 288 K için yaklaşık 8,4 km." },
    { term: "Kuru adyabatik oran (Γ<sub>d</sub>)", definition: "Doymamış bir parselin ısı alışverişi olmadan yükselirken soğuma hızı, g/c<sub>p</sub> ≈ 9,77 K/km." },
    { term: "Çiğ noktası (T<sub>d</sub>)", definition: "Havadaki buhar miktarı değişmeden soğutulursa havanın doyduğu sıcaklık." },
    { term: "Yükselme yoğuşma düzeyi (LCL)", definition: "Yükselen parselin doyduğu ve bulut tabanının oluştuğu yükseklik." },
    { term: "Potansiyel sıcaklık (θ)", definition: "Parsel kuru adyabatik olarak 1000 hPa'ya getirilseydi sahip olacağı sıcaklık; kuru adyabatik süreçte korunur." },
    { term: "CAPE", definition: "Konvektif kullanılabilir potansiyel enerji: serbest konveksiyon düzeyinden denge düzeyine kadar parselin kaldırma ivmesinin yükseklikçe tümlevi, J/kg." },
    { term: "Jeostrofik rüzgâr", definition: "Basınç gradyanı kuvveti ile Coriolis kuvvetinin dengelendiği, izobarlara paralel esen rüzgâr, v<sub>g</sub> = |∂p/∂n|/(ρ|f|)." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede bu konu birkaç kural olarak öğrenilir: yükseldikçe hava soğur, alçak basınçta yağmur yağar. Üniversitede (<strong>Termodinamik</strong>, <strong>Atmosfer Fiziği</strong> ve <strong>Dinamik Meteoroloji</strong> derslerinde) aynı kurallar türetilir: birinci yasa ve hidrostatik dengeden Γ<sub>d</sub> = g/c<sub>p</sub>, Clausius–Clapeyron'dan doyma buhar basıncı ve nemli adyabat, küçük yer değiştirme analizinden Brunt–Väisälä frekansı. Bu sayfanın parseli basınç koordinatında RK4 ile ilerletmesi, meteorolojinin neden yükseklik yerine basıncı dikey eksen seçtiğini de gösterir: denklemler orada sadeleşir ve skew-T, tefigram gibi termodinamik diyagramlar bu seçimin ürünüdür.",
      "Dördüncü sekmenin denklemleri, <strong>Akışkanlar Mekaniği</strong>'nin Navier–Stokes denklemlerinin dönen çerçevedeki, yatay ve sürtünmesi basitleştirilmiş biçimidir. Ölçek analizi bir adım daha atar: Rossby sayısı U/(fL) küçükken jeostrofik denge baskındır, bu da büyük ölçekli havanın neden yarı-jeostrofik kuramla anlatılabildiğini açıklar. f'nin enlemle değişimi (β etkisi) eklendiğinde Rossby dalgaları, yatay sıcaklık farkları eklendiğinde termal rüzgâr ve barotropik-baroklinik kararsızlık, yani orta enlem siklonlarının doğuşu gelir. Bugünkü sayısal hava tahmini bu denklemleri Richardson'ın hayal ettiği gibi bir ızgarada çözer.",
    ],
    topics: ["Atmosfer termodinamiği", "Clausius–Clapeyron ve nem", "Termodinamik diyagramlar (skew-T)", "Dönen çerçevede dinamik", "Rossby sayısı ve ölçek analizi", "Yarı-jeostrofik kuram", "Sayısal hava tahmini"],
  },
  quiz: [
    {
      question: "İzotermal bir atmosferin sıcaklığı 288 K'den 250 K'ye düşerse ölçek yüksekliği ve belli bir yükseklikteki basınç nasıl değişir?",
      options: [
        "H değişmez, basınç değişmez",
        "H yaklaşık %13 kısalır, aynı yükseklikteki basınç düşer",
        "H yaklaşık %13 uzar, basınç artar",
        "H yarıya iner, basınç iki katına çıkar",
      ],
      answer: 1,
      explanation: "H = R*T/(Mg) sıcaklıkla doğru orantılıdır: 8,430 km × 250/288 = 7,318 km. Soğuk hava daha yoğundur, sütun daha sık paketlenir ve basınç yükseklikle daha hızlı düşer; sayfada 5 km'de izotermal basınç 559,9 hPa'dan 511,7 hPa'ya iner.",
    },
    {
      question: "Yüzeyde sıcaklık 24 °C, çiğ noktası 16 °C. Bu havadan yükselen kümülüs bulutlarının tabanı yaklaşık nerededir?",
      options: ["Yaklaşık 125 m", "Yaklaşık 500 m", "Yaklaşık 1000 m", "Yaklaşık 3000 m"],
      answer: 2,
      explanation: "Parsel kilometrede 9,77 K, çiğ noktası yaklaşık 1,8 K soğur; 8 K'lik fark kilometrede yaklaşık 8 K kapanır. Espy kuralıyla 125 m/K × 8 K = 1000 m. Sayfada dene: Yüzey sıcaklığını 24 °C, Bağıl nemi %61 yap; çiğ noktası 16,02 °C olur, parsel tümlemesi bulut tabanını 1003 m, Espy kuralı 997 m verir.",
    },
    {
      question: "45° enleminde eylemsizlik periyodu 16,9 saattir. 30° enleminde ne olur?",
      options: [
        "Aynı kalır, çünkü Dünya aynı hızla döner",
        "Yaklaşık 12 saate kısalır",
        "Yaklaşık 24 saate uzar",
        "Sonsuza gider",
      ],
      answer: 2,
      explanation: "T<sub>e</sub> = 2π/(2Ω sin φ) ve sin 30° = 0,5 olduğundan T<sub>e</sub> ≈ 23,9 saat olur; sin 45° = 0,707 ile oran 1,41'dir. Ekvatora yaklaştıkça f sıfıra iner ve periyot sınırsız uzar; jeostrofik denge tam orada kurulamaz. Sayfada Enlem φ kaydırıcısını 30°'ye getir: iki geçiş ölçülünce eylemsizlik periyodu 23,935 sa, jeostrofik rüzgâr da sin φ küçüldüğü için 11,19 m/s olur.",
    },
  ],
  next: [
    { href: "basinc.html", title: "Basınç: Hidrostatik, Pascal İlkesi ve Hidrolik", why: "Hidrostatik basıncın sıvıdaki hâli, U-tüpü manometre ve kendi \"Barometre ve yükseklik\" sekmesi: buradaki dp = −ρg dz'nin temeli." },
    { href: "termodinamik.html", title: "Termodinamik: PV Diyagramı, İş, Isı ve Çevrimler", why: "Adyabatik genleşme ve sıkışmayı PV diyagramında iş ve ısıyla izle; kuru adyabatik oranın arkasındaki birinci yasa." },
    { href: "iklim-ve-sera-etkisi.html", title: "İklim ve Sera Etkisi: Enerji Dengesi, Zorlama ve Geri Beslemeler", why: "Havadan iklime: Dünya'nın enerji dengesi, katmanlı atmosferin ışınımı ve sıcaklığı belirleyen geri beslemeler." },
    { href: "okyanus-ve-gelgitler.html", title: "Okyanus ve Gelgitler: Gelgit Kuvveti, Deniz Suyu ve Dalgalar", why: "Atmosferin akışkan kardeşi: tuzluluk ve sıcaklıkla değişen deniz suyu yoğunluğu, gelgit kuvveti ve derin ile sığ su dalgaları." },
  ],
  sources: [
    { title: "Wikipedia · Barometer", url: "https://en.wikipedia.org/wiki/Barometer", note: "Berti'nin su sütunu, Torricelli'nin cıva barometresi (1643/1644 tartışması) ve Pascal ile Périer'nin 1648 Puy de Dôme deneyi (İngilizce)." },
    { title: "Wikipedia · Lifted condensation level", url: "https://en.wikipedia.org/wiki/Lifted_condensation_level", note: "Bulut tabanı, Espy'nin 125 m/K yaklaşımı ve kökeni, doğruluğu (İngilizce)." },
    { title: "Wikipedia · Coriolis force", url: "https://en.wikipedia.org/wiki/Coriolis_force", note: "Coriolis'in 1835 makalesi, Ferrel'in 1856 dolaşım modeli, Buys Ballot kuralı ve lavabo efsanesi: Shapiro ve Trefethen deneyleri (İngilizce)." },
    { title: "NWS Rapid City · The Black Hills Remarkable Temperature Change of January 22, 1943", url: "https://www.weather.gov/unr/1943-01-22", note: "ABD Ulusal Hava Servisi: Spearfish'teki iki dakikalık 27 derecelik sıçrama ve Black Hills yamaçlarında gidip gelen Arktik cephe (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
