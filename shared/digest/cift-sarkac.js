window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["cift-sarkac"] = {
  slug: "cift-sarkac",
  title: "Çift Sarkaç: Belirlenimci ama Öngörülemez",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "İki çubuk, iki top, eksiksiz bilinen iki denklem; içinde hiç rastlantı yok. Yine de milyonda bir radyan farkla başlayan kopyalar 11 saniyede birbirinden kopar. Kaosu ölç, öngörünün neden bu kadar kısa kaldığını gör.",
  hook:
    "Aynı çift sarkacın üç kopyasını yan yana bırak; tek fark, alt çubuğun açısındaki milyonda bir radyan, yani alt topun yalnızca bir mikrometre kayması (bir saç teli bundan elli-yüz kat kalındır). On saniye boyunca üçü tek bir sarkaç gibi sallanır; 11 saniyeyi biraz geçince birbirinden kopar, her biri bambaşka bir dansa başlar. İçinde hiç zar olmayan bir makinenin geleceği neden bu kadar kısa?",
  bigIdea:
    "Çift sarkaç tümüyle belirlenimcidir, ama kaotik bölgede başlangıçtaki küçük bir fark üstel büyür, <em>d ≈ Δ·e<sup>λt</sup></em> (burada λ ≈ 0.95 1/s); bu yüzden öngörü ufku ölçümün hassasiyetiyle değil, yalnızca onun logaritmasıyla uzar: <em>t* = (1/λ)·ln(tol/Δ)</em>.",
  story: [
    "1814'te Pierre-Simon Laplace, olasılık üzerine yazdığı felsefi denemenin girişine Newton mekaniğinin en cesur sonucunu koydu: belirli bir anda doğayı harekete geçiren bütün kuvvetleri ve onu oluşturan her şeyin konumunu bilen, bu verileri çözümleyecek kadar da geniş bir zekâ için hiçbir şey belirsiz olmazdı; gelecek de geçmiş gibi gözlerinin önünde dururdu. Laplace “şeytan” demedi, “bir zekâ” dedi; “Laplace'ın şeytanı” adı sonradan takıldı. Aynı metinde insan aklının o zekâdan her zaman sonsuz uzakta kalacağını da yazdı. Çift sarkaç bu düşünce deneyinin masaüstü sınavıdır: iki çubuk, iki top ve Lagrange'ın 1788'de <em>Analitik Mekanik</em> kitabında topladığı yöntemle birkaç satırda yazılan iki hareket denklemi. Hiçbir zar, hiçbir gürültü yok; aynı başlangıç her seferinde aynı hareketi verir. Yine de sayfadaki kopyalar 11 saniyede birbirinden kopar.",
    "Belirlenimciliğin pratikteki ilk büyük çatlağını bir matematik yarışması açtı. İsveç ve Norveç Kralı II. Oscar'ın 60. doğum günü için Gösta Mittag-Leffler'in 1885'te duyurduğu yarışmanın ilk sorusu, birbirini çeken cisimlerin hareketini her zaman aralığında geçerli bir seriyle yazmayı, dolayısıyla Güneş Sistemi'nin kararlı olup olmadığını anlamayı istiyordu. Henri Poincaré soruyu tam çözmedi, ama üç cisim problemi üzerine çalışması Ocak 1889'da 2 500 kronluk ödülü ve altın madalyayı kazandı. Çalışma Acta Mathematica'da basılırken Mittag-Leffler'in genç asistanı Edvard Phragmén'in ısrarlı soruları Poincaré'yi kanıtlarını yeniden incelemeye zorladı. Kasım 1889'un son günü Mittag-Leffler'e kısa bir telgraf ulaştı: baskıyı durdurun. Ertesi günkü mektup hatanın sandığından ağır olduğunu söylüyordu: “Asimptotik yüzeylerin kapalı olduğu doğru değil.” Dağıtılan nüshalar toplatılıp yok edildi; 3 585 kron 63 öre tutan, yani ödülü bin kronu aşkın geçen baskı masrafını Poincaré ödedi. Aralık 1890'da çıkan 270 sayfalık düzeltilmiş çalışma, bu yüzeylerin kapanmak yerine birbirini kestiğini ve bir kesişme varsa sonsuz sayıda olduğunu gösterdi: bugün kaos dediğimiz davranışın ilk tarifi. Başındaki Latince özdeyiş ironik biçimde yerinde kaldı: “Yıldızlar çizilmiş sınırlarını asla aşmayacak.”",
    "Aynı yıllarda Harkov'da Aleksandr Lyapunov daha temel bir soruyla uğraşıyordu: bir hareket ne zaman kararlıdır, yani küçük bir sarsıntı ne zaman söner, ne zaman büyür? 1892'de Moskova Üniversitesi'nde savunduğu doktora tezi <em>Hareketin Kararlılığının Genel Problemi</em>, bu soruyu denklemleri çözmeden yanıtlamanın yollarını kurdu ve küçük sapmaların büyüme hızını ölçen niceliklerle çalıştı. Bir yörüngenin komşusundan ortalama ne hızla üstel olarak uzaklaştığını bugün onun adıyla, <strong>Lyapunov üsteli</strong> diye anıyoruz; sayfanın ölçtüğü λ budur. Poincaré ise 1908'de <em>Bilim ve Yöntem</em> kitabında dersi şöyle özetledi: başlangıç koşullarındaki küçük farklar son durumda çok büyük farklar doğurabilir; baştaki küçük bir hata sonda muazzam bir hataya dönüşür ve öngörü imkânsız hâle gelir.",
    "Kaos, bilgisayarlar onu herkesin gözü önüne serene kadar bir matematik merakı olarak kaldı. 1961'de MIT'de meteorolog Edward Lorenz, Royal McBee LGP-30 bilgisayarında çalışan küçük bir hava modelini bir hesabın ortasından yeniden başlatmak istedi ve çıktıda gördüğü 0.506 sayısını girdi; makinenin belleğindeki değer 0.506127'ydi, fark dört binde birdi. Kendi anlatımına göre kahve içmeye gidip bir saat kadar sonra döndüğünde, makinenin hesapladığı yaklaşık iki aylık hava öncekine hiç benzemiyordu: fark aşağı yukarı her dört günde ikiye katlanmış, ikinci ayın bir yerinde bütün benzerlik kaybolmuştu. Lorenz bunu 1963'te <em>Deterministic Nonperiodic Flow</em> (Belirlenimci Periyodik Olmayan Akış) makalesinde kuramlaştırdı. Atmosferin ayrıntılı durumunu iki haftadan uzun bir süre önceden tahmin etmek bugün de mümkün değil. Avrupa'nın (ECMWF) ve ABD'nin (NCEP) hava tahmin merkezleri 1992'den beri tek bir tahminin yanında, birbirinden biraz farklı başlangıçlarla koşturulan bir tahmin topluluğu da üretir. Sayfadaki <strong>Kopya sayısı N</strong> kaydırıcısı bu yöntemin küçük bir modelidir.",
  ],
  core: [
    {
      heading: "Bir sarkaç daha: dört sayılık durum",
      body:
        "Tek sarkacın konumunu tek bir açı belirler; buna bir <strong>serbestlik derecesi</strong> denir. Hareketin tam durumu için açının yanında açısal hız da gerekir: (θ, ω) ikilisi. Bu sayıların oluşturduğu uzaya <strong>faz uzayı</strong> denir. Enerji korunduğu için tek sarkacın yörüngesi bu düzlemde bir sabit enerji eğrisidir: ya gidip gelir ya tepeden döner; ikisinin sınırında, tepedeki dengeye sonsuz sürede yaklaşan bir eğri kalır. Çift sarkaçta ikinci çubuk birincinin ucuna menteşeyle asılıdır; iki açı ve iki açısal hız, toplam dört sayı gerekir. Enerji bunlardan birini bağlar, geriye üç boyutlu bir yüzey kalır ve yörüngelerin birbirine dolanmasına yer açılır. İki kol menteşe üzerinden birbirini sürekli iter, çeker; enerji kollar arasında gidip gelir. Matematik burada kesin bir sınır koyar: doğrusal denklemler kaos üretemez, <em>Poincaré–Bendixson teoremine</em> göre de zamandan bağımsız düzgün bir sistemin iki boyutlu faz uzayında kaosa yer yoktur. Tek sarkacın düzlemi buna yetmez; çift sarkacın üç boyutlu enerji yüzeyi yeter.",
      formula: "x₂ = L₁ sin θ₁ + L₂ sin θ₂,   y₂ = −L₁ cos θ₁ − L₂ cos θ₂",
      formulaNote:
        "Açılar asma noktasından aşağı inen düşeyden ölçülür. İki açı alt topun yerini belirler; durum (θ₁, θ₂, ω₁, ω₂) dörtlüsüdür ve sayfadaki her kopya bu dört boyutlu uzayda bir noktadır.",
    },
    {
      heading: "Lagrange yolu: kuvvet yerine enerji",
      body:
        "Newton yasalarıyla başlamak için iki çubuktaki gerilmeleri bilmek gerekir; ama onlar hareketle değişen bilinmeyenlerdir. <strong>Lagrange yöntemi</strong> bu bağ kuvvetlerini hiç yazmadan, kinetik enerji T ile potansiyel enerji V'yi açılar cinsinden kurar. Alt topun hızı iki vektörün toplamıdır: üst topun hızı L₁ω₁ ve alt çubuğun dönmesinden gelen L₂ω₂. Aralarındaki açı θ₁ − θ₂ olduğundan T'de cos(θ₁ − θ₂) çarpanlı bir <strong>bağlaşım terimi</strong> belirir. Euler–Lagrange denklemleri d/dt(∂ℒ/∂ω<sub>i</sub>) = ∂ℒ/∂θ<sub>i</sub> iki bağlaşık, ikinci mertebeden denklem verir; α = dω/dt açısal ivme olmak üzere: (m₁ + m₂)L₁α₁ + m₂L₂ cos(θ₁ − θ₂) α₂ = −m₂L₂ω₂² sin(θ₁ − θ₂) − (m₁ + m₂)g sin θ₁ ve L₁ cos(θ₁ − θ₂) α₁ + L₂α₂ = L₁ω₁² sin(θ₁ − θ₂) − g sin θ₂. ω²'li terimler merkezcil ivmeden gelir: dönen kolu çember üzerinde tutan çubuk kuvveti ötekini de çeker. Sayfa her adımda bu 2×2 doğrusal sistemi α₁ ve α₂ için çözer; determinantı L₁L₂(m₁ + m₂ sin²(θ₁ − θ₂)) hiç sıfır olmaz. Denklemlerin kapalı biçimli bir çözümü bilinmez; hareket ancak sayısal olarak hesaplanır.",
      formula: "ℒ = T − V,   T = ½(m₁ + m₂)L₁²ω₁² + ½m₂L₂²ω₂² + m₂L₁L₂ω₁ω₂ cos(θ₁ − θ₂)",
      formulaNote:
        "Lagrange fonksiyonu ℒ, çubuk uzunlukları L₁, L₂ ile karışmasın diye el yazısı harfle yazıldı. V = (m₁ + m₂)gL₁(1 − cos θ₁) + m₂gL₂(1 − cos θ₂); sıfırı iki top en alttayken. Varsayılan 120° / −20° başlangıçta V = 30.022 J: sayfanın enerji satırındaki değer.",
    },
    {
      heading: "Küçük açılarda düzen: normal modlar",
      body:
        "Açılar küçükken sin θ ≈ θ ve cos(θ₁ − θ₂) ≈ 1 alınır, ω²'li terimler atılır; denklemler doğrusal olur. Doğrusal bir sistemin en basit hareketleri, her parçanın aynı frekansla ve sabit bir genlik oranıyla salındığı <strong>normal modlardır</strong>. θ<sub>i</sub> = A<sub>i</sub> cos Ωt denemesi denklemleri bir özdeğer problemine çevirir: A₁ ile A₂'nin sıfırdan farklı olabilmesi için katsayıların determinantı sıfır olmalıdır. Bu koşul Ω² için ikinci dereceden bir denklemdir ve iki kök verir. Yavaş olanı, iki kolun aynı yöne salındığı 1. moddur; hızlısı, kolların zıt yönlere salındığı 2. mod. Her küçük hareket bu iki modun toplamıdır. Eşit kütle ve uzunlukta periyotların oranı 1 + √2'dir, yani irrasyoneldir: iki modun karışımı hiçbir zaman tam olarak kendini tekrarlamaz, ama yine de düzenlidir. Kopyalar arasındaki fark da aynı doğrusal denklemlere uyduğu için üstel büyüyemez. Gerçek denklemler doğrusal olmadığından mod periyotları genlikle hafifçe uzar.",
      formula: "m₁L₁L₂Ω⁴ − (m₁ + m₂)g(L₁ + L₂)Ω² + (m₁ + m₂)g² = 0",
      formulaNote:
        "Mod biçimi θ₂/θ₁ = Ω²L₁/(g − Ω²L₂). Eşit kütle ve uzunlukta Ω² = (g/L)(2 ∓ √2) ve θ₂/θ₁ = ±√2 çıkar; türetilişi çözümlü örnekte.",
    },
    {
      heading: "Belirlenimci kaos: Lyapunov üsteli ve öngörü ufku",
      body:
        "Kaotik bölgede iki komşu yörünge arasındaki uzaklık ortalamada üstel büyür: d(t) ≈ Δ·e<sup>λt</sup>. Logaritma alınınca ln d = ln Δ + λt olur; sayfanın grafiğinde ln d'nin eğik bir doğru gibi yükselmesi bundandır ve eğimi λ'yı verir. 120° / −20° başlangıcında λ yaklaşık 0.95 1/s'dir: fark kabaca her saniyede e ≈ 2.7 katına, her 0.7 saniyede iki katına, her 2.4 saniyede on katına çıkar. Fark bir tolerans değerini aşınca kopyalara “ayrıldı” dersek ufuk t* = (1/λ)·ln(tol/Δ) olur. Ufuk Δ'nın kendisiyle değil logaritmasıyla uzar: ölçümü bin kat iyileştirmek öngörüye yalnızca ln 1000/λ ≈ 7 saniye ekler. λ uzun bir sürenin ortalamasıdır; yörüngenin bazı bölgeleri daha hızlı gerer. 170° / 170° başlangıcında kopyalar 5.24 saniyede ayrılır, oysa uzun süreli λ ≈ 1.1 1/s ile formül yaklaşık 10 saniye öngörür: neredeyse tepetaklak başlayan sarkaç ilk 3.4 saniyede yaklaşık 2.5 1/s hızla gerilir. Sayfa λ'yı Benettin yöntemiyle hesaplar: 10⁻⁸ uzaklıktaki bir gölge yörüngeyi her 0.1 saniyede geri ölçekler, 200 saniye boyunca ln(d/d₀)'ları toplayıp süreye böler.",
      formula: "λ = lim<sub>t→∞</sub> lim<sub>Δ→0</sub> (1/t)·ln(d(t)/Δ),   t* = (1/λ)·ln(tol/Δ)",
      formulaNote:
        "Sayfada tol = 0.1. Δ = 10⁻⁶ rad için ln(10⁵) = 11.5; λ ≈ 0.95 1/s ile t* ≈ 12 s, ölçülen ayrılma 11.43 s.",
    },
    {
      heading: "Kaosun içinde korunan: enerji, Poincaré kesiti ve sayısal güven",
      body:
        "Sürtünme yokken enerji tam korunur; kopyalar aynı enerji yüzeyinde kalır, yalnızca yüzeyin farklı yerlerine savrulur. Kaos enerjiyle değil yönle ilgilidir. Üç boyutlu bu yüzeye bakmanın yolunu Poincaré 1890'daki çalışmasında kullandı: yörüngeyi her seferinde aynı kesitten, burada θ₁ = 0'dan artarak geçtiği anda işaretle ve yalnızca (θ₂, ω₂) noktalarını çiz. Düzenli hareket kesitte kapalı eğriler, kaotik hareket dağınık bir bulut bırakır. Sayısal yöntem de sınanmalıdır. Sayfa her kopyayı 0.5 ms'lik adımlarla dördüncü mertebe Runge–Kutta (RK4) yöntemiyle ilerletir; bağıl enerji hatası bir dakika boyunca 10⁻¹⁰'un altında, yani Δ = 10⁻⁶'dan on binlerce kat küçük kalır. Adım yarıya, hatta dörtte bire indirildiğinde ayrılma zamanı binde bir saniye bile değişmez; küçük açılarda aynı kod kopyaları ayırmaz. Ayrışma aritmetikten değil denklemlerden gelir. Yine de yuvarlama hataları da üstel büyür: yarım dakika sonra hesaplanan yörünge artık tam o başlangıcın yörüngesi değildir. JavaScript motorları sin ve cos'u son basamağa kadar aynı hesaplamak zorunda olmadığından 200 saniyelik λ tarayıcıdan tarayıcıya birkaç yüzde değişir.",
      formula: "E = T + V = sabit,   RK4: adım başına hata ∝ h⁵, toplam hata ∝ h⁴",
      formulaNote:
        "Kaotik başlangıçta ilk 20 saniyedeki en büyük bağıl enerji hatası h = 0.5 ms ile 6.3×10⁻¹¹, h = 0.25 ms ile 4.4×10⁻¹²: yaklaşık 14 kat küçülme, h⁴ yasasının öngördüğü 16'ya yakın.",
    },
  ],
  lab: {
    intro:
      "Sahnede aynı çift sarkacın N kopyası sallanır; kopya k, θ₂ + kΔ açısıyla ve durgun başlar, referans kopya halkalı toplarıyla en öndedir. Altındaki grafik her kopyanın referanstan faz uzayı uzaklığının logaritmasını, ln d'yi çizer; noktalı yatay çizgi ayrılma eşiği d = 0.1'dir. Tablo üç niceliği kuramla karşılaştırır: <strong>Toplam enerji E</strong>, <strong>Ayrılma zamanı (d &gt; 0.1)</strong> ve <strong>Periyot (θ₁ sıfır geçişleri)</strong>. Kartlar λ'yı iki yoldan verir (<strong>λ, Benettin</strong> ve <strong>λ, ln d eğimi</strong>), normal mod periyotlarını ve en büyük enerji sapmasını gösterir; en altta solda θ₁–ω₁ faz portresi, sağda Poincaré kesiti vardır. Yan panelde (dar ekranda en altta) dört <strong>Hazır başlangıç</strong> düğmesi, θ₁, θ₂, m₁, m₂, L₁, L₂ kaydırıcıları, <strong>Yerçekimi g</strong> menüsü, <strong>Sönüm</strong> kutusu, <strong>Kopya sayısı N</strong> ve <strong>θ₂ farkı Δ</strong> kaydırıcıları bulunur; topları sürükleyerek de başlangıç açısı seçebilirsin. Her değişiklik koşuyu t = 0'dan yeniden başlatır; hazır başlangıçlar yalnızca açıları değiştirir, N ve Δ olduğu gibi kalır. <kbd>Boşluk</kbd> duraklatır, <kbd>R</kbd> sıfırlar. Deneyler varsayılan ayarlarla başlar (Kaotik 120° / −20°, 1.0 kg, 1.00 m, Dünya, N = 3, Δ = 1×10⁻⁶ rad); emin değilsen sayfayı yenile. Bir uyarı: 200 saniyelik Benettin λ'sı ve ona bağlı olan Kuram sütunundaki ayrılma zamanı tarayıcıya göre birkaç yüzde değişebilir; ölçülen ayrılma zamanları, eğimler, periyotlar ve enerji değerleri değişmez.",
    experiments: [
      {
        title: "Milyonda bir radyan: kopyalar ne zaman ayrılır?",
        predict:
          "Kopyalar alt çubukta 10⁻⁶ ve 2×10⁻⁶ radyan farkla, yani alt topta bir-iki mikrometrelik kaymayla başlıyor. Fark gözle görülür hâle gelene kadar ne kadar beklersin: bir saniye mi, bir dakika mı, bir saat mi? 2Δ ile başlayan kopya iki kat erken mi ayrılır?",
        do: "Varsayılan ayarlarla (Kaotik: 120° / −20°, Δ = 1×10⁻⁶ rad, N = 3) sahneyi ve ln d grafiğini izle. Kopyalar ayrılınca Ayrılma zamanı satırını, altındaki kopya ayrılma zamanları notunu ve iki λ kartını oku.",
        observe:
          "Yaklaşık 10 saniye üç kopya tek bir sarkaç gibi görünür; ln d ise −13.8'den dalgalanarak eğik bir doğru gibi yükselir. Kopya 1, 11.43 s'de d = 0.1 eşiğini aşar; 2Δ ile başlayan kopya 2 ise 11.11 s'de. λ, ln d eğimi (0–9.4 s) kartı 0.966 1/s gösterir. Benettin kartı tarayıcıya göre 0.9 ile 1.05 1/s arasında bir değer verir; Kuram sütunu da buna göre 11 ile 13 s arasında bir ufuk öngörür.",
        explain:
          "d'nin 10⁻⁶'dan 10⁻¹'e çıkması için 10⁵ kat büyümesi gerekir; ln(10⁵) = 11.5 olduğundan 11.5 kez e katına çıkmalıdır, λ ≈ 0.95 1/s ile yaklaşık 12 s. İki kat büyük başlayan kopya ln 2 kadar öndedir; ortalamada 0.7 s erken ayrılması beklenir, burada 0.32 s. Ayrıldıktan sonra d, 1 mertebesinde doyar: iki yörünge arasında artık bağ kalmamıştır.",
      },
      {
        title: "On kat hassasiyet kaç saniye kazandırır?",
        predict:
          "Başlangıç farkını on kat küçültürsen (Δ = 1×10⁻⁷ rad) kopyalar on kat uzun, yani yaklaşık 114 saniye birlikte kalır mı? t* = (1/λ)·ln(0.1/Δ) formülü ne kadar kazanç öngörür?",
        do: "θ₂ farkı Δ kaydırıcısını üç adım sola, 1×10⁻⁷ rad'a getir; koşu baştan başlar. Ayrılmayı bekle ve kopyaların ayrılma zamanlarını yeniden oku.",
        observe:
          "Kopya 1 bu kez 13.59 s'de, 2×10⁻⁷ ile başlayan kopya 2 ise 13.45 s'de ayrılır: on kat hassasiyet yalnızca 2.2 s kadar kazandırdı. λ, ln d eğimi (0–11.4 s) kartı 0.952 1/s gösterir; ln d grafiği aynı eğimle, yalnızca daha aşağıdan başlar.",
        explain:
          "Ufuk ln(1/Δ) ile büyür: on kat küçük Δ ortalamada ln 10/λ ≈ 2.4 s ekler. Δ'yı 10⁻⁹ ile 10⁻³ rad arasındaki 19 değerin hepsinde dene: ayrılma zamanları ln(1/Δ)'ya karşı kabaca bir doğruya dizilir, eğimi on kat hassasiyet başına 2.2 s'dir. Ama tam yarılamaların getirisi 0.08 s ile 1.66 s arasında saçılır. Ayrışma düzgün değil, alt kolun savrulduğu anlarda sıçramalarla büyür; yasa ancak ortalamada geçerlidir.",
      },
      {
        title: "Küçük açılarda düzen: normal modlar",
        predict:
          "Küçük açılarda kopyalar yine 11 saniyede ayrılır mı? 1. modun periyodu, tek bir 1 metrelik sarkacın 2.006 s'lik periyodundan uzun mu olur, kısa mı? Ya 2. modunki?",
        do: "Küçük açı: 1. normal mod düğmesine bas (θ₁ = 5°, θ₂ = 7.07°), 12 saniye kadar bekle; Periyot satırını, 1. mod kartını ve durum satırını oku. Sonra Küçük açı: 2. normal mod düğmesine bas (3° / −4.24°) ve aynısını yap.",
        observe:
          "1. modda iki top aynı yöne salınır: Ölçülen 2.6226–2.6229 s, Kuram 2.6211 s (1. mod), Fark +0.06–0.07 %. 2. modda zıt yönlere salınırlar: 1.0912 s, Kuram 1.0857 s, Fark yaklaşık +0.5 %. Kopyalar bir dakika sonra bile ayrılmaz: 1. modda d başlangıçtaki Δ dolayında kalır, Benettin kartı 0.002 1/s gibi sıfıra çok yakın bir değer gösterir, Kuram sütunu “çok uzun (λ ≈ 0)” yazar ve durum satırı hareketin düzenli olduğunu söyler.",
        explain:
          "Küçük açılarda denklemler neredeyse doğrusaldır: iki çözümün farkı da bir çözümdür ve aynı iki frekansla salınır, üstel büyüyemez. 2. modda d bir dakikada yalnızca dört katına çıkar; genliğe bağlı küçük frekans farkı fazı doğrusal kaydırır. Ölçülen periyodun biraz uzun çıkması doğrusal olmayan düzeltmedir ve tek sarkaçtaki θ₀²/16 gibi genliğin karesiyle büyür; 2. mod bu etkiye yaklaşık 20 kat duyarlıdır.",
      },
      {
        title: "Kaos enerjiyi bozar mı?",
        predict:
          "Kopyalar birbirinden koparken enerjiye ne olur; biri enerji kazanıp öteki kaybeder mi? Ayrışma, bilgisayarın biriken hatası olabilir mi? Sürtünme eklersen kaos kaybolur mu?",
        do: "Kaotik: 120° / −20° düğmesine bas ve ilk 20 saniye boyunca Toplam enerji E satırını ve En büyük |E sapması|/E₀ kartını izle. Sonra Sönüm (hava direnci) açık kutusunu işaretle (b = 0.05 /s) ve bir dakika bekle.",
        observe:
          "Ölçülen ve Kuram 30.022 J'de sabit kalır; Fark ±10⁻¹¹ mertebesinde oynar, kart 20 saniyede 6.3×10⁻¹¹ gösterir. Aynı sürede d, 10⁻⁶'dan 1 mertebesine çıkmıştır. Sönüm açıkken E düşer: 11.5 s'de yaklaşık 19.0 J, bir dakikada yaklaşık 2.1 J; Kuram sütunu E₀ − W<sub>s</sub> onu izler, Fark 10⁻¹¹ mertebesini aşmaz. Kopyalar yine ayrılır (10.22 s), ama λ, Benettin kartı 0.1 1/s'nin altına düşer.",
        explain:
          "Kaos kopyaları aynı enerji yüzeyinin farklı yerlerine savurur, enerjilerini değiştirmez. Sayısal hata başlangıç farkından on binlerce kat küçüktür ve adım yarıya indirildiğinde ayrılma zamanı değişmez: ayrışmanın kaynağı aritmetik değil denklemlerdir. Sönümün harcadığı güç 2b·E<sub>k</sub>'dır; sayfa bu enerjiyi W<sub>s</sub> diye ayrıca tümleyip bilançoya katar. Sönümlü koşuda kaos geçicidir: ilk saniyelerin gerilmesi kopyaları ayırır, ama enerji eridikçe hareket düzenli küçük salınımlara iner ve 200 saniyelik ortalama λ sıfıra yaklaşır.",
      },
    ],
  },
  wow: [
    {
      title: "Kelebekten önce bir martı vardı",
      body:
        "Lorenz 1963'te kuramını anlatırken bir meteorologun sözünü aktardı: kuram doğruysa bir martının tek bir kanat çırpışı havanın gidişini sonsuza dek değiştirmeye yeterdi. Ardından ekledi: tartışma henüz kapanmadı, ama son kanıtlar martılardan yana görünüyor. Martı, meslektaşlarının önerisiyle daha şiirsel bir kelebeğe dönüştü. Lorenz 1972'de Amerikan Bilimi İlerletme Derneği'nin (AAAS) 139. toplantısındaki konuşmasına zamanında başlık bulamayınca, Philip Merilees bir başlık uydurdu: “Brezilya'da bir kelebeğin kanat çırpması Teksas'ta bir hortum başlatır mı?”",
    },
    {
      title: "15 metre, 100 milyon yıl",
      body:
        "1989'da Jacques Laskar, Güneş Sistemi'nin 200 milyon yıllık evrimini ortalaması alınmış hareket denklemleriyle hesapladı ve Dünya'nın yörüngesinin kaotik olduğunu buldu: bugünkü konumunu ölçerken yapılacak 15 metrelik bir hata, 100 milyon yıldan biraz sonra Dünya'nın yörüngesinin neresinde olacağını kestirmeyi imkânsız kılar. 2009'da Laskar ve Mickaël Gastineau, Merkür'ün yörünge büyüklüğünü birinden ötekine yalnızca 0.38 milimetre değiştirerek beş milyar yıllık 2 501 gelecek hesapladı. Yaklaşık yüzde birinde Merkür'ün yörüngesi Venüs'le ya da Güneş'le çarpışabilecek kadar uzadı; birinde bütün iç gezegenler kararsızlaştı. Sayfadaki kopya yöntemi, gezegen ölçeğinde.",
    },
    {
      title: "İki kat uzun öngörü, yüz bin kat hassasiyet",
      body:
        "Sayfanın formülüyle bir hesap: Δ = 10⁻⁶ rad ile ufuk 12 s kadardır (ölçülen 11.4 s). Bu süreyi iki katına çıkarmak için ln(0.1/Δ)'yı iki katına, yani 0.1/Δ'yı karesine çıkarmak gerekir: Δ = (10⁻⁶)²/0.1 = 10⁻¹¹ rad. Bu sonuç λ'ya bağlı değildir. Hassasiyet yüz bin kat artmalıdır; 1 metrelik çubukta 10⁻¹¹ m, hidrojen atomunun yarıçapının (5.3×10⁻¹¹ m) beşte biridir. Bir dakikalık öngörü için λ ≈ 0.95 1/s ile Δ ≈ 2×10⁻²⁶ rad gerekir: bir protonun çapından yüz milyar kat küçük bir kayma.",
    },
  ],
  worked: {
    title: "Eşit kollu çift sarkacın normal modları",
    prompt:
      "Kütleleri m = 1 kg, çubukları L = 1 m olan bir çift sarkaç küçük açılarla salınıyor (g = 9.81 m/s²). Doğrusallaştırılmış hareket denklemlerinden iki normal modun açısal frekanslarını, periyotlarını ve genlik oranlarını bul; sonucu tek bir 1 metrelik sarkaçla ve sayfanın ölçümüyle karşılaştır.",
    steps: [
      "Küçük açıda cos(θ₁ − θ₂) ≈ 1 ve sin θ ≈ θ al, ω²'li terimleri at. Lagrange kartındaki denklemlerde m₁ = m₂ = m, L₁ = L₂ = L koy; ilkini mL'ye, ikincisini L'ye böl: 2α₁ + α₂ = −2(g/L)θ₁ ve α₁ + α₂ = −(g/L)θ₂. Burada α = d²θ/dt²; iki yanın birimi de s⁻²'dir (açı radyan olduğundan boyutsuzdur).",
      "θ<sub>i</sub> = A<sub>i</sub> cos Ωt dene; o zaman α<sub>i</sub> = −Ω²θ<sub>i</sub>. Boyutsuz x = Ω²L/g kısaltmasıyla denklemler (2 − 2x)A₁ − xA₂ = 0 ve −xA₁ + (1 − x)A₂ = 0 olur. Sıfırdan farklı bir çözüm için katsayıların determinantı sıfır olmalıdır: 2(1 − x)² − x² = 0, yani √2(1 − x) = ±x.",
      "Kökler x₁ = √2/(√2 + 1) = 2 − √2 = 0.5858 ve x₂ = √2/(√2 − 1) = 2 + √2 = 3.4142. g/L = 9.81 s⁻² ile Ω₁² = 5.7466 s⁻², Ω₁ = 2.3972 rad/s, T₁ = 2π/Ω₁ = 2.6211 s; Ω₂² = 33.4934 s⁻², Ω₂ = 5.7874 rad/s, T₂ = 1.0857 s. Denetim: Ω₁²Ω₂² = 2(g/L)² ve Ω₁² + Ω₂² = 4g/L; ikisi de genel denklemin katsayılarından aynen çıkar.",
      "Genlik oranı ikinci denklemden gelir: A₂/A₁ = x/(1 − x). 1. modda (2 − √2)/(√2 − 1) = +√2 = +1.414: kollar aynı yönde, alt kol daha geniş açıyla salınır. 2. modda (2 + √2)/(−1 − √2) = −√2: kollar zıt yönde. Sayfanın ön ayarları tam bu oranları kullanır: 5° ile 7.07°, 3° ile −4.24°.",
      "Karşılaştır: tek bir 1 metrelik sarkacın periyodu 2π√(L/g) = 2.0061 s'dir. 1. mod, eşdeğer uzunluğu L/(2 − √2) = 1.707 m olan bir sarkaç gibi yavaş; 2. mod, 0.293 m'lik bir sarkaç gibi hızlıdır. Sayfa 2.6226–2.6229 s ve 1.0912 s ölçer: kuramdan yüzde 0.07 ve yüzde 0.5 uzun, çünkü 5° ve 3° tam anlamıyla “küçük” değildir ve sin θ ≈ θ yaklaşımının bedeli genliğin karesiyle büyür.",
    ],
    result:
      "Ω₁ = 2.397 rad/s (T₁ = 2.621 s, θ₂ = +√2·θ₁) ve Ω₂ = 5.787 rad/s (T₂ = 1.086 s, θ₂ = −√2·θ₁). Tek sarkacın 2.006 s'lik periyodu iki modun arasında kalır: birlikte salınan kollar daha uzun, zıt salınan kollar daha kısa bir sarkaç gibi davranır. Periyotların oranı T₁/T₂ = 1 + √2 = 2.414 irrasyonel olduğundan, iki modun karışımı olan genel bir küçük hareket hiçbir zaman tam olarak tekrarlanmaz.",
  },
  misconceptions: [
    {
      myth: "Kaotik demek rastgele demektir.",
      truth:
        "Çift sarkaçta hiç rastlantı yoktur: aynı başlangıç her seferinde aynı hareketi verir. Sayfada Sıfırla'ya bas: kopya 1 yine 11.43 s'de ayrılır. Kaos, belirlenimci bir sistemin başlangıçtaki küçük farkları üstel büyütmesidir. Bu yüzden yakın gelecek öngörülebilir (burada ilk 10 saniye), uzak geleceğin ayrıntısı öngörülemez; λ ve Poincaré kesiti gibi istatistiksel özellikler ise yine sağlam biçimde ölçülür. Rastgelelik, aynı girdinin farklı çıktılar vermesidir.",
    },
    {
      myth: "Kopyaların ayrılması bilgisayarın yuvarlama hatasıdır; gerçek bir sarkaç böyle davranmaz.",
      truth:
        "Sayfanın bağıl enerji hatası bir dakikada 10⁻¹⁰'un altındadır, başlangıç farkından on binlerce kat küçük. Zaman adımı yarıya ya da dörtte bire indirildiğinde ayrılma zamanı 11.43 s'de kalır; aynı kod küçük açılarda kopyaları hiç ayırmaz. Gerçek sarkaçlar da aynı duyarlılığı gösterir: İngilizce Vikipedi'nin Butterfly effect maddesi, aynı çift sarkacın neredeyse aynı başlangıçlarla çekilmiş altı kaydının nasıl ayrıştığını gösterir. Yuvarlama hataları kaosun nedeni değil kurbanıdır: onlar da büyür, 200 saniyelik λ'nın tarayıcıdan tarayıcıya değişmesi bundandır.",
    },
    {
      myth: "Daha güçlü bir bilgisayar ve daha hassas ölçümle hareketi istediğimiz kadar uzun öngörebiliriz.",
      truth:
        "Ufuk hassasiyetin yalnızca logaritmasıyla uzar: Δ'yı on kat küçültmek yaklaşık 2.4 saniye, bin kat küçültmek 7 saniye kazandırır; 11.4 saniyeyi iki katına çıkarmak yüz bin kat hassasiyet ister. Bir dakika için gereken 2×10⁻²⁶ radyanı hiçbir ölçüm yakalayamaz; kaba bir hesapla tek bir hava molekülünün 1 kg'lık topa çarpması bile ondan yaklaşık bin kat büyük bir sarsıntıdır. Atmosferde durum daha da sert: Lorenz 1969'da çok ölçekli bir akış modelinde, hata sıfır olmadıkça onu küçültmenin öngörüyü belli bir sürenin ötesine taşımadığını gösterdi.",
    },
    {
      myth: "Çift sarkaç her zaman kaotiktir.",
      truth:
        "Kaos enerjiye bağlıdır. Küçük açılarda çift sarkaç iki normal modun düzenli toplamıdır; sayfanın mod ön ayarlarında kopyalar bir dakika sonra bile ayrılmaz ve Benettin kartı sıfıra yakın bir değer gösterir. Orta enerjilerde faz uzayı karışıktır: kaotik bir denizin içinde düzenli adalar bulunur ve bir başlangıcın hangisine düştüğünü Poincaré kesiti gösterir. Bir topu sürükleyerek açıları değiştir ve λ kartlarının nasıl değiştiğine bak.",
    },
  ],
  glossary: [
    { term: "Serbestlik derecesi", definition: "Bir sistemin konumunu tam belirlemek için gereken bağımsız koordinat sayısı; tek sarkaçta bir (θ), çift sarkaçta iki (θ₁, θ₂)." },
    { term: "Faz uzayı", definition: "Konumların ve hızların birlikte oluşturduğu uzay; her noktası sistemin tam bir anlık durumudur. Çift sarkaçta dört boyutludur." },
    { term: "Lagrange fonksiyonu (ℒ)", definition: "Kinetik ve potansiyel enerjinin farkı, ℒ = T − V; Euler–Lagrange denklemleri hareket denklemlerini bağ kuvvetlerini yazmadan verir." },
    { term: "Normal mod", definition: "Doğrusal bir sistemde bütün parçaların aynı frekansla ve sabit genlik oranıyla salındığı temel hareket; her küçük hareket modların toplamıdır." },
    { term: "Belirlenimci kaos", definition: "Rastlantı içermeyen bir sistemde, başlangıçtaki küçük farkların üstel büyümesi yüzünden uzun vadeli davranışın öngörülemez olması." },
    { term: "Lyapunov üsteli (λ)", definition: "Komşu iki yörünge arasındaki uzaklığın ortalama üstel büyüme hızı, d ≈ Δ·e<sup>λt</sup>; birimi 1/s. Pozitif λ kaosun imzasıdır." },
    { term: "Öngörü ufku", definition: "Başlangıç hatasının kabul edilebilir bir sınıra büyüdüğü süre, t* = (1/λ)·ln(tol/Δ); hassasiyetin logaritmasıyla uzar." },
    { term: "Poincaré kesiti", definition: "Yörüngenin faz uzayındaki bir yüzeyden her geçişini işaretleyen nokta kümesi; düzenli harekette kapalı eğriler, kaotik harekette dağınık bir bulut verir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede bir sarkacın periyodunu formülden okursun; üniversitede hareket denklemini kendin kurarsın. <strong>Klasik Mekanik</strong> dersinde Lagrange yöntemi (bu sayfanın denklemleri), Hamilton mekaniği ve küçük titreşimler işlenir: çok serbestlik dereceli bir sistem, kararlı dengesi çevresindeki küçük titreşimlerde Mẍ + Kx = 0 biçimine iner ve normal modlar KA = Ω²MA <em>genelleştirilmiş özdeğer problemi</em>nin çözümleridir. Bu adım <strong>Lineer Cebir</strong>'in özdeğerleriyle <strong>Diferansiyel Denklemler</strong>'in doğrusal sistemlerinin buluştuğu yerdir; molekül titreşimlerinden bina ve köprü salınımlarına kadar aynı yöntem kullanılır. <strong>Hamilton mekaniğinde</strong> durum açılar ve momentumlarla yazılır; <em>Liouville teoremi</em> faz uzayındaki hacmin korunduğunu söyler: sürtünmesiz bir sistem tek bir noktaya ya da çekiciye yığılamaz. Kaotik yörüngeler bu hacmi korurken onu bir yönde gerip öbür yönde sıkıştırır ve ince ipliklere çevirir.",
      "<strong>Doğrusal Olmayan Dinamik ve Kaos</strong> dersinde bu sayfanın kavramları sistematik hâle gelir: sabit noktalar ve kararlılık, çatallanmalar, Lyapunov üstelleri, Poincaré haritaları ve fraktal boyut. İki tür kaos ayrılır. Çift sarkaç gibi sürtünmesiz sistemlerde düzenli hareketin küçük bozulmalar altında neden çoğunlukla hayatta kaldığını <em>KAM teoremi</em> açıklar (Kolmogorov 1954, Arnold ve Moser 1962–1963): düzenli yörüngelerin üzerinde dolandığı simit biçimli yüzeylerin çoğu biraz şekil değiştirerek varlığını sürdürür, kaos aralarındaki ince katmanlarda başlar. Sürtünmeli ama dışarıdan enerjiyle beslenen sistemlerde ise yörüngeler fraktal yapılı <strong>garip çekicilere</strong> yığılır; Lorenz'in 1963'teki, alttan ısıtılan akışkan modeli bunun en ünlü örneğidir. <strong>Sayısal Yöntemler</strong> dersinde RK4'ün hatasının neden h⁴ ile küçüldüğünü, enerjiyi uzun sürelerde koruyan simplektik yöntemleri ve kaotik bir yörüngenin bilgisayardaki kopyasına ne zaman güvenilebileceğini öğrenirsin.",
    ],
    topics: [
      "Lagrange ve Hamilton mekaniği",
      "Küçük titreşimler ve normal modlar",
      "Genelleştirilmiş özdeğer problemi",
      "Faz uzayı ve Liouville teoremi",
      "Lyapunov üstelleri",
      "KAM teoremi",
      "Garip çekiciler",
      "Simplektik tümleyiciler",
    ],
  },
  quiz: [
    {
      question:
        "Varsayılan kaotik başlangıçta Δ = 10⁻⁶ rad ile kopyalar 11.4 s'de ayrılıyor ve λ ≈ 0.95 1/s. Başlangıç farkını bin kat küçültürsen (Δ = 10⁻⁹ rad) kopyalar yaklaşık ne zaman ayrılır?",
      options: [
        "Yaklaşık 3 saat sonra; bin kat küçük fark bin kat uzun sürer",
        "Yaklaşık 18 s sonra",
        "Yaklaşık 34 s sonra; üç basamak, üç kat süre",
        "Hiç ayrılmazlar; bu kadar küçük bir fark yuvarlama hatasının altında kalır",
      ],
      answer: 1,
      explanation:
        "Ufuk ln(1/Δ) ile büyür: bin kat küçük Δ, ln 1000/λ = 6.9/0.95 ≈ 7.3 s ekler; toplam yaklaşık 18.7 s. Sayfada θ₂ farkı Δ kaydırıcısını en sola getir: kopya 1, 17.76 s'de ayrılır; ayrışma sıçramalarla büyüdüğü için tek bir ölçüm ortalamadan biraz sapar. 10⁻⁹ rad, bilgisayardaki sayıların yaklaşık 10⁻¹⁶'lık bağıl hassasiyetinin hâlâ çok üstündedir.",
    },
    {
      question:
        "Aynı sarkacı aynı açılarla (120° / −20°) Ay'da bırakırsan (g = 1.62 m/s²), Δ = 10⁻⁶ rad farkla başlayan kopyalar yaklaşık ne zaman ayrılır?",
      options: [
        "Yine 11.4 s'de; kaos yerçekimine bağlı değildir",
        "Yaklaşık 28 s'de",
        "Yaklaşık 69 s'de",
        "Hiç ayrılmazlar; zayıf yerçekiminde hareket düzenlidir",
      ],
      answer: 1,
      explanation:
        "Kütleler ve uzunluklar aynıyken denklemlerdeki tek zaman ölçeği √(L/g)'dir; zamanı bu birimle ölçersen Ay'daki ve Dünya'daki denklemler aynıdır. Hareket Ay'da yalnızca √(9.81/1.62) ≈ 2.46 kat yavaş oynatılır: λ 2.46 kat küçülür, ayrılma 11.43 × 2.46 ≈ 28.1 s'de olur. Sayfada Yerçekimi g menüsünden Ay'ı seç: 28.13 s. 69 s, g oranını karekök almadan kullanmanın sonucudur.",
    },
    {
      question:
        "Kaotik koşuda bağıl enerji hatası 10⁻¹⁰'un altında kalırken, 10⁻⁶ rad farkla başlayan kopyalar 11 s'de birbirinden kopuyor. Bundan hangi sonuç çıkar?",
      options: [
        "Ayrışma sayısal hatadan gelir; daha küçük adımla kopyalar ayrılmazdı",
        "Enerji korunduğuna göre kopyalar aslında ayrılmıyor, ekran yanıltıyor",
        "Ayrışma denklemlerin kendisinden gelir: enerji korunumu yörüngeyi enerji yüzeyinde tutar ama yüzeyin neresinde olacağını söylemez",
        "Kaotik sistemlerde enerji korunmaz; 10⁻¹⁰'luk hata bunun ilk işaretidir",
      ],
      answer: 2,
      explanation:
        "Enerji dört sayılık durumu tek bir koşula bağlar; geriye üç boyutlu bir yüzey kalır ve kaos bu yüzey üzerindeki yönlerde gerçekleşir. Kopyaların enerjileri neredeyse aynıdır ve öyle kalır, ama yüzeyin farklı yerlerine savrulurlar. Sayısal hata başlangıç farkından on binlerce kat küçüktür; adım yarıya indirildiğinde ayrılma zamanı 11.43 s'de kalır.",
    },
  ],
  next: [
    {
      href: "sarkac.html",
      title: "Sarkaç Laboratuvarı",
      why: "Hikâyenin başı: tek sarkacın periyodu T = 2π√(L/g), büyük açı düzeltmesi θ₀²/16 ve enerji çubukları. Buradaki mod periyotlarının genlikle neden uzadığının kökü orada.",
    },
    {
      href: "lineer-cebir-ve-ozdegerler.html",
      title: "Lineer Cebir ve Özdeğerler: Eleme, Alt Uzaylar ve Spektrum",
      why: "Normal modlar bir özdeğer problemidir: Ω² özdeğer, mod biçimi özvektördür. Oradaki Özdeğerler sekmesinde yay zinciri matrisini seç; QR yinelemesinin özdeğerleri nasıl ayıkladığını izle, her mod biçimini özvektör sütununda oku.",
    },
    {
      href: "diferansiyel-denklemler.html",
      title: "Diferansiyel Denklemler ve Dinamik Sistemler: Yön Alanından Rezonansa",
      why: "Doğrusal sistemler sekmesinde faz portresindeki merkezleri ve sarmalları gör, Yön alanı sekmesinde Euler, Heun ve RK4'ün hatasını adım boyuyla tart: buradaki dört boyutlu faz uzayına iki boyutta hazırlık.",
    },
    {
      href: "lorenz-cekici.html",
      title: "Lorenz Çekicisi",
      why: "Kaosun öbür klasik örneği, Lorenz'in 1963 modeli: Kelebek etkisi sekmesinde Δ = 10⁻⁹ farklı kopyalardan Lyapunov üstelini (yaklaşık 0.90) ölç. Orada hacim üstel büzülür ve garip bir çekici oluşur; çift sarkaçta enerji korunur.",
    },
  ],
  sources: [
    {
      title: "Feynman Lectures on Physics, Cilt I, 38-6: Philosophical implications",
      url: "https://www.feynmanlectures.caltech.edu/I_38.html",
      note: "Feynman klasik fiziğin de pratikte belirsiz olduğunu anlatır: öngörülebilen süre hatayla yalnızca logaritmik uzar (İngilizce).",
    },
    {
      title: "Wikipedia · Double pendulum",
      url: "https://en.wikipedia.org/wiki/Double_pendulum",
      note: "Lagrange fonksiyonu ve hareket denklemlerinin türetilişi (kütlesi çubuk boyunca dağılmış sürüm), başlangıç açılarına göre Lyapunov üsteli ve devrilme süresi haritaları (İngilizce).",
    },
    {
      title: "Wikipedia · Butterfly effect",
      url: "https://en.wikipedia.org/wiki/Butterfly_effect",
      note: "Lorenz'in 1961'deki 0.506127 → 0.506 yuvarlaması ve kendi anlatımı, 1963'teki martı, 1972'deki kelebek başlığı, 1969 çalışması ve aynı çift sarkacın altı kaydı (İngilizce).",
    },
    {
      title: "Wikipedia · Poincaré and the Three-Body Problem",
      url: "https://en.wikipedia.org/wiki/Poincar%C3%A9_and_the_Three-Body_Problem",
      note: "June Barrow-Green'in kitabının özeti: 1889 Kral Oscar ödülü, Phragmén'le birlikte bulunan hata, ödül parasından pahalıya gelen geri çekme ve 1890'daki düzeltilmiş çalışma (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
