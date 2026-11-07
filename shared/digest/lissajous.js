window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["lissajous"] = {
  slug: "lissajous",
  title: "Lissajous: Oran, Faz ve Dolgu",
  field: "Matematik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "İki dik salınımın çizdiği eğri, frekans oranını kenarlara değme sayısından, fazı ise elipsin kesişimi ile dönüş yönünden okutur. Yarım hertz iki saniyelik bir turdur; irrasyonel oran dikdörtgeni doldurur.",
  hook:
    "Karanlık bir odada iki diyapazonun ucundaki küçük aynalara bir ışık demeti çarpar ve perdeye bir elips düşer. Çatallardan biri ötekinden saniyede yalnız yarım salınım hızlıysa elips iki saniyede bir kendi üzerine döner. Aynı iki sesi karıştırınca kulak da iki saniyelik bir vuru duyar: eğri, frekans farkını hem gösterir hem işitilir kılar.",
  bigIdea:
    "Birbirine dik iki salınım, x = A·sin(at + δ) ve y = B·sin(bt), frekans oranı kesirliyse kapanan, irrasyonelse bir dikdörtgeni dolduran bir eğri çizer; kenarlara değme sayısı oranı, elipsin kesişimi ile dönüş yönü de fazı ele verir.",
  story: [
    "Amerikan denizcilerinin seyir kitabıyla tanınan Nathaniel Bowditch, 1815'te bambaşka bir iz yayımladı. İki ayrı noktadan asılmış bir sarkacın ucundaki top, masanın üzerinde tek bir salınımın çizemeyeceği eğriler bırakıyordu. Top iki hareketi birden yapıyordu: biri bir doğrultuda, öteki ona dik. Eğrinin adı henüz yoktu. Kayıt şunu gösteriyordu: iki periyodik hareket tek bir resim verir ve resmin bütün karakterini iki hızın oranı belirler. On iki yıl sonra Charles Wheatstone aynı aileyi elle tutulur bir alete çevirdi. <strong>Kaleidofon</strong>, ucunda parlak bir boncuk bulunan metal bir çubuktur; çubuk iki dik doğrultuda birden titreşince boncuk, göz görüntüyü bir an tuttuğu için havada kapalı bir iz bırakır. Salon oyuncağı ile ölçüm aleti o sırada aynı masanın üzerindeydi.",
    "Jules Antoine Lissajous 1857'te ışığı mekanik bağdan kurtardı. İki diyapazonun her birine küçük bir ayna taktı; lamba demeti önce bir aynadan, sonra ötekinden sekip perdeye düşüyordu. Çatallar dik titreşince perde, bugün <strong>Lissajous eğrisi</strong> denen izi tutuyordu: art arda gelen noktaları birleştiren, gözün kısa süreli belleğiydi. Aynı yıl Londra'daki Royal Institution'da deneyi kendi elleriyle yaptı. Çatallardan biri biraz tiz ya da pes kalınca elips dönüyor, kulağın duyduğu vurunun periyodu eğrinin bir turuna eşit çıkıyordu. Toplantının teşekkür önergesini Faraday verdi. Yöntemin gücü, frekansı tek tek saymadan oranını görmekti. Tam bir oktav duran bir şekil bırakır; küçük bir kaçış şekli ağır ağır döndürür.",
    "Eğri laboratuvardan çıkınca iki hayata ayrıldı. <strong>Harmonograf</strong>, iki sarkacın bir kalemi, isteğe bağlı üçüncü sarkacın da kâğıdı taşıyan döner masayı sürdüğü çizim makinesidir. Ortaya çıkışı 19. yüzyıl ortasına konur; tek bir mucidi güvenle söylemek zordur. Victoria salonlarında oran basit bir kesre yakın ama tam eşit değilse desen yavaşça döner, eşitse yalnız küçülürdü. Yüzyıl sonra aynı iz, fosforun kısa bir an parlak kaldığı katot ışını ekranında frekans karşılaştırmanın standart yolu oldu. Avustralya yayıncısı ABC'nin 1965 logosu, grafikçi Bill Kennard'ın bir osiloskop dalga biçiminden çıkardığı bir Lissajous eğrisidir; kurum buna 25 sterlin ödemiştir. Alfred Hitchcock'un Vertigo filminde (1958) Saul Bass'ın kurduğu jenerikte, John Whitney'in sarkaçlı mekanik aletle ürettiği Lissajous spiralleri vardır.",
  ],
  core: [
    {
      heading: "Ne zaman kapanır?",
      body:
        "Eğri iki bağımsız salınımdır. x ekseni A genliği ve a <strong>açısal frekansıyla</strong>, y ekseni B ve b ile gider; faz δ yalnız x'e eklenir. a ve b rad/s'dir: etiket «Frekans a» kalsa da çıktı «3 rad/s» yazar, t saniye, A ve B ise br denen soyut bir uzunluktur. a/b = p/q <strong>en sade oran</strong> ise nokta T = 2π·p/a = 2π·q/b sonra hem konumuna hem hızına döner. a ve b tamsayıysa bu süre 2π/obeb(a, b) olur: 3 ile 2'de obeb 1'dir, T = 2π s ≈ 6.283185 s. 1.5 ile 1 de 3:2'dir, ama T = 4π s'dir; çünkü 1.5'in paydası süreye gizlenmiştir. Oran irrasyonelse, √2 hazır deneyinde olduğu gibi, nokta başladığı duruma hiç dönmez ve kuram sütunu «∞ (a/b irrasyonel)» yazar. Kutuya yazılan her sonlu ondalık ise bir kesirdir: 1.414214, 707107:500000 demektir ve periyodu yaklaşık 3.14×10⁶ s'dir. Arama penceresi 40·2π ≈ 251.3 s'de bittiği için bu eğri ekranda kapanmamış görünür.",
      formula: "x = A·sin(at + δ),   y = B·sin(bt)",
      formulaNote: "T = 2π·p/a = 2π·q/b. a ve b tamsayıysa T = 2π/obeb(a, b).",
    },
    {
      heading: "Kenarlar oranı sayar",
      body:
        "Genel fazda x, bir periyotta p kez +A'ya ve p kez −A'ya değer; teğet o anda dikeydir. Yatay kenarlar 2q ayrı noktada değilir. Dikey değme sayısının yatay değme sayısına oranı bu yüzden a:b'dir. <strong>Geri dönen fazda</strong> x ile y aynı anda uçtadır: eğri köşeden geçer, geldiği yolun üstünden geri döner ve iki köşe arasında açık bir yay kalır. Köşe olmayan her değme iki kez ziyaret edilir; köşedeki uç, birleşen iki kenarın her biri için yarım sayılır. Toplamlar p ve q'ya iner. p ile q ikisi de tekse bu fazlar δ = k·180°/q, biri çiftse δ = (2k+1)·90°/q değerleridir. 3:2'de q çifttir: 45°, 135°, 225° ve 315° geri döner. Varsayılan 90° genel fazdadır; tablo 6 ve 4 değme, kuram da «2p = 6» ve «2q = 4» yazar. 45°'de ölçülen «3 (2 değme + 2 uç × ½)» ve «2 (1 değme + 2 uç × ½)» olur. A = B = 1 br iken 2:1 ve 90°, x = 1 − 2y² parabolüdür; 1:1 ve 0° bir doğrudur.",
      formula: "dikey : yatay = 2p : 2q",
      formulaNote: "Geri dönen fazda sayılar p ve q'ya iner; köşe uçları yarım sayılır. Oran yine a:b'dir.",
    },
    {
      heading: "Kendini kesme",
      body:
        "Genel bir fazda eğri kendini 2pq − p − q noktada keser. 3:2 ve 90° için bu 7'dir, 5:4 ve 30° için 31, 2:1 ve 0° için tek nokta (sekiz figürü, kesişme orijindedir). Geri dönen fazda açık yay üzerindeki sayı (p − 1)(q − 1)/2'dir: 3:2 ve 45° için 1, parabol için 0. İki formül aynı eğrinin iki hâlidir; tablo, fazın türüne göre birini kuram sütununa yazar ve ölçülen çokgen kesişimleriyle karşılaştırır. pq 450'yi aşınca kesişmeler tek tek sayılmaz. Ölçülen hücre «ölçülmedi (çok sayıda)» der, kuram formülü göstermeye devam eder. a = 9.95 rad/s ve b = 10 rad/s, 199:200 oranıdır. Periyot 125.663706 s'de kapanır. Kuram «2pq − p − q = 79 201» yazar; ölçülen hücre «ölçülmedi (çok sayıda)» der.",
      formula: "2pq − p − q",
      formulaNote: "Geri dönen fazda (p − 1)(q − 1)/2. pq > 450 ise sayfa kesişmeleri saymaz, kuramı yazar.",
    },
    {
      heading: "Elipsten faz okumak",
      body:
        "a = b iken eğri bir elipstir; a ≠ b iken son üç satır «yalnız a = b iken» der. t = 0'da y = 0 ve x₀ = A sin δ olduğundan eksen kesişimi sin δ'yı verir: |sin δ| = |x₀|/A. Bu, δ ile 180° − δ'yı ayırmaz. Sağ kenara değme yüksekliği y = B cos δ'dır; cos δ pozitifse büyük eksen I. ve III. bölgededir. Dönüş yönü işareti koyar. Saat yönünün tersine giden nokta, x'in y'den önde olduğunu söyler: δ, 0° ile 180° arasındadır. Saat yönü, δ'nın 180° ile 360° arasında, yani negatif fazda olduğunu söyler. İşaretli alan πAB sin δ'dır. Tablo bu alanı N = 2048 kenarlı çokgenle ölçer; çokgen, sin(h)/h çarpanı kadar küçüktür (h = 2π/N), göreli fark −1.57×10⁻⁶'dır. 1:1 ve 45°'de sin δ = 0.707107, ölçülen δ = 45.0000°, alan 2.221438 br², kuram 2.221441 br². 1:1, A = B ve 90° bir çemberdir: alan 3.141588 br², kuram π = 3.141593 br². arcsin 90° yakınında düzleşir. Kesişimi %1 hatalı okumak δ'yı 45°'de ±0.81°, 90°'de ±4.05° kaydırır. Kart bu sayıları yazar; 90°'de durum satırı aynı uyarıyı ±4.1° diye yuvarlar.",
      formula: "sin δ = x₀/A,   alan = πAB·sin δ",
      formulaNote: "İşaret dönüş yönünden gelir. 90° yakınında kesişimden çok, cos δ ve dönüş yönü okunur.",
    },
    {
      heading: "Ayrışan yaylar, kayan adım",
      body:
        "İki boyutlu salınıcıda yaylar raydaki kızaklara bağlıdır; kuvvetler tam ayrışır. Newton'un ikinci yasası her eksende m·x'' = −kₓx, yani x'' + ωₓ²x = 0 verir ve ωₓ = √(kₓ/m) kütleden bağımsız bir orana gider: ωₓ/ω_y = √(kₓ/k_y). Başlangıç x = 1 m, y = 0, vₓ = 0, v_y = ω_y·1 m ise çözüm x = cos(ωₓt), y = sin(ω_y t) olur. Bu, δ = 90° olan bir Lissajous eğrisidir. kₓ = 9 N/m, k_y = 4 N/m ve m = 1 kg, 3:2 yapar; yörünge 2π s'de kapanır. kₓ = 8 N/m, k_y = 4 N/m ise yay sabitleri kesirlidir, frekans oranı √2'dir ve yörünge kapanmaz. Hız-Verlet adımı xₙ₊₁ − 2xₙ + xₙ₋₁ = −ω²h²xₙ bağıntısını korur. Bunun çözümü ωₛ = (2/h)·arcsin(ωh/2) frekansıyla döner. Küçük adımda ωₛ/ω ≈ 1 + (ωh)²/24 olduğundan iki eksen aynı oranda kaymaz. h = 0.01 s ve 3:2 için göreli oran hatası (0.03)²/24 − (0.02)²/24 = 2.08×10⁻⁵ çıkar; tablo oranı 1.500031 yazar. En büyük |ΔE|/E₀ değeri 1.558×10⁻⁴ içinde salınır. RK4'ün oran hatası −5.41×10⁻⁹'dur; kaplama 15.04 %'te kalır, enerji ise her adım (1 − (ωh)⁶/72 + …) ile çarpıldığı için tekdüze azalır. Model, genliğe bağlı sarkaç frekansını içermez. Verlet ωh ≥ 2'de kararsızdır; sayfa ωh > 0.5 olunca satırı amber yapar.",
      formula: "ωₓ/ω_y = √(kₓ/k_y)",
      formulaNote: "Hız-Verlet: ωₛ = (2/h)·arcsin(ωh/2). Oran kütleden bağımsızdır; adım iki ekseni farklı kaydırır.",
    },
  ],
  lab: {
    intro:
      "Üç sekme var. Eğri'de Frekans a, Frekans b ve Faz δ (°) rad/s ve derece cinsindendir; hazır düğmeler 1:1, 3:2, 2:1, 5:4 ve √2 kurar. Tablo ölçüleni, kuramı ve farkı yan yana koyar. Osiloskop iki kanalı hertz ile karşılaştırır. Ses varsayılan olarak kapalıdır; sitenin sesi kısıkken Sesi aç düğmesi çalmaz ve durum satırı «Ses kapalı: sitenin ses düğmesinden açabilirsin.» der. Harmonograf ve iki boyutlu salınıcı sekmesinde Model menüsü sönümlü sarkaçları ya da yayları seçer. Rastgele çizim tohumu 1857'den başlar. Sönüm yalnız iki sarkaçta ölçülür. Yayda Sona atla, seçilen sürenin sonuna gider.",
    experiments: [
      {
        title: "3:2, düz ve geri dönen",
        predict: "Varsayılan 3:2 ve 90° için periyot 2π s, dikey değme 6, yatay değme 4, kesişme 7 olmalı. 45°'de periyot aynı kalır; değmeler 3 ve 2'ye, kesişme 1'e iner.",
        do: "Eğri sekmesi 3:2 · δ = 90° ile açılır. Periyot, iki değme satırı ve kendini kesme satırını oku. Sonra 3:2 · δ = 45° (geri dönen) düğmesine bas; aynı dört satırı yeniden oku.",
        observe: "90°'de periyot 6.283185 s, kuram 6.283185 s, fark −8.9×10⁻¹⁶ s. Değmeler 6 ve 4, kuram «2p = 6» ve «2q = 4», oran «6 : 4 = 3 : 2» ve fark «eşit». Kesişme 7, kuram «2pq − p − q = 7». 45°'de periyot yine 6.283185 s. Değmeler «3 (2 değme + 2 uç × ½)» ve «2 (1 değme + 2 uç × ½)», kuram «p = 3» ve «q = 2». Kesişme satırı «Kendini kesme (açık yay)» olur, ölçülen 1, kuram «(p − 1)(q − 1)/2 = 1».",
        explain: "90° genel fazdır; q = 2 çift olduğu için geri dönen fazlar 45°'nin tek katlarıdır. 45°'de eğri köşeden girip kendi izinden döner. Her iç değme iki kez sayılır, iki köşe ucu yarımşar yazılır, 6 ve 4 bu yüzden 3 ve 2 olur. Açık yay tek noktada kesişir. a ≠ b olduğu için sin δ satırları «yalnız a = b iken» der.",
      },
      {
        title: "440 ile 440.5 hertz",
        predict: "Dönme periyodu 1/|440.5 − 440| = 2 s olmalı. Faz 2π·(440 − 440.5) = −π rad/s hızla kayar; y kanalı hızlıdır. 441 Hz'de tur 1 s'ye iner. İki kanal da 440 Hz ise şekil durur.",
        do: "Osiloskop sekmesinde 440 / 440.5 Hz seçili, Yavaş çekim 1× kalsın. Ölçülen hücre «ölçülüyor» yazısından çıkınca tabloyu oku. Sesi açma. Sonra 440 / 441 Hz düğmesine, ardından 440 / 440 Hz (durur) düğmesine bas. Eşit frekansta benzetim zamanı 1 s'yi geçince satırı yeniden oku.",
        observe: "440.5 Hz'de dönme periyodu 2.0000 s, kuram 2.0000 s. Etkin faz kayma hızı −3.1416 rad/s. f₂ tahmini 440.500 Hz. Vuru kartı 2.0000 s yazar. Durum satırı etkin fazın azaldığını, yani y kanalının hızlı olduğunu söyler. 441 Hz'de periyot 1.0000 s olur. 440 Hz'de, 1 s sonra, ölçülen «> 6.3×10⁹ s (kayma yok)» yazar.",
        explain: "1:1 için şeklin turu, frekans farkının tersidir: 0.5 Hz iki saniye, 1 Hz bir saniye verir. Eğim −3.1416 rad/s, −π'nin dört ondalıkla yazılmış halidir. f₂, bilinen f₁'e bu eğim eklenerek bulunur; operatör ayarlı diyapazona bakıyormuş gibi. Eşit frekansta eğim gürültüsünden ayrılmaz ve sayfa şeklin durduğunu yazar. Ses kapalıyken de vuru periyodu kartta 2.0000 s olarak durur.",
      },
      {
        title: "Tohum 1857, sonra iki sarkaç",
        predict: "1857 üç sarkaçlıdır: sönüm satırları ölçüm vermez, f₁/f₂ 3:2'ye yakındır ve desen yavaş döner. İki sarkaç · 2:1 deneyinde d₁ = d₂ = 0.01 1/s tepelerden geri okunur; 160 s'de 50 ve 26 tepe birikir.",
        do: "Harmonograf ve iki boyutlu salınıcı sekmesinde Model, harmonograf kalsın. Tohum 1857 değilse kutuya 1857 yazıp Bu tohumla çiz. Oran kartını ve durum satırını oku. Sonra İki sarkaç · 2:1 düğmesine bas, Kalem hızını Hemen bitir yap.",
        observe: "1857'de dört ölçüm satırı da «üç sarkaçta yok» der. f₁/f₂ = 1.48897, alt satır «en yakın basit oran 3:2 (sapma −0.74 %)». Durum, göreli fazın 0.0540 rad/s kaydığını ve desenin 116 s'de bir tur döndüğünü yazar. 2:1 bittikten sonra d₁ ve d₂ ölçüleni 0.010000 1/s, ayar 0.01 1/s olur. f₁ = 2.000000 rad/s, f₂ = 1.000000 rad/s. Tepe kartı 50 · 26, yarılanma kartı 69 · 69 s yazar. Durum, ardışık x tepelerinin oranını 0.96907 diye verir.",
        explain: "Üç sarkaçta her koordinat iki sönümlü terimin toplamıdır; tepeler tek bir üstele oturmaz, sayfa da ölçmez. 1.48897, 1.5'ten %0.74 küçüktür: |2·f₁ − 3·f₂| = 0.054 rad/s, tur 2π/0.054 ≈ 116 s. İki sarkaçta ardışık tepe oranı e^(−d·2π/f) olur. x için e^(−0.01·π) = 0.96907. Yarılanma ln 2/0.01 = 69.3 s'dir; kart en yakın saniyeye, 69 s'ye yuvarlar.",
      },
      {
        title: "15.04'te duran, 16.46'ya kayan",
        predict: "kₓ = 9, k_y = 4 N/m ve m = 1 kg iken tam yörünge 64×64 ızgaranın %15.04'ünde durur. Varsayılan hız-Verlet, h = 0.01 s, 200 s'de ölçüleni %16.46'ya çıkarır. RK4 %15.04'te kalır. √2 kapanmaz: kuram 50 s'de %68.46, 200 s'de %99.71 olur.",
        do: "Model menüsünden İki boyutlu yay salınıcısı'nı seç. 3:2 hazır deneyi, hız-Verlet, h = 0.01 s ve süre 200 s kalsın. Sona atla ile t = 200.00 s olunca kaplama, oran ve enerji satırlarını oku. Tümleyiciyi RK4 yapıp yine sona atla. Sonra tümleyiciyi hız-Verlet'e al, √2 · kₓ = 8, k_y = 4 N/m düğmesine bas; süreyi önce 50 s, sonra 200 s yapıp her birinde sona atla.",
        observe: "3:2, hız-Verlet, t = 200.00 s: kaplama 16.46 % / 15.04 %, fark +1.42 puan. Hücre 674 / 4 096, kuram 616. Oran 1.500031 / 1.500000, fark +0.000031. |ΔE|/E₀ iki sütunda da 1.558×10⁻⁴; fark +5.0×10⁻¹⁵. Durum kaymayı 0.0125 rad ve yaklaşık 0.40 hücre diye yazar. RK4'te kaplama 15.04 % / 15.04 %, fark 0.00 puan; oran farkı −8.1×10⁻⁹. √2 ve Verlet: 50 s'de 67.80 % / 68.46 % (fark −0.66 puan), 200 s'de 100.00 % / 99.71 % (fark +0.29 puan).",
        explain: "Tam 3:2, durum satırındaki 6.283 s'de kapanır ve 616 hücrede durur. 3·2.08×10⁻⁵·200 = 0.01248 rad; tablo bunu 0.0125 rad ve 0.40 hücre diye yazar. RK4'ün faz kayması 3.2×10⁻⁶ rad, yaklaşık 0.00 hücredir; enerjisi 1.456×10⁻⁷, sürüklenmesi −7.3×10⁻¹⁰ /s. Referans kartı tek ondalık kullanır: 50 s'de √2 için 68.5 %, tablo ise 68.46 %. Tam yörünge 250 s'den itibaren 4 096 hücrenin hepsini gezer. Menüde 250 s yoktur; 400 s'de iki sütun da 100.00 % olur.",
      },
    ],
  },
  wow: [
    {
      title: "Yarım hertz, tam iki saniye",
      body:
        "Osiloskopta 440.000 Hz ile 440.500 Hz, tabloya 2.0000 s ve −3.1416 rad/s olarak düşer. Kuram 1/0.5 Hz = 2 s ve eğim −π rad/s'dir. Yarım hertzlik bir kaçış, ekranda iki saniyede bir tamamlanan bir turdur; f₂ tahmini bilinen 440 Hz'in üstüne bu eğimi koyunca 440.500 Hz okunur.",
    },
    {
      title: "616 hücrede duran oran",
      body:
        "kₓ = 9 N/m ve k_y = 4 N/m, [−1, 1]² m karesinin 4 096 hücresinden 616'sını boyar: %15.04. Yörünge 2π s'de kapanır ve yeni hücre eklemez. kₓ = 8 N/m olunca yay sabitleri hâlâ kesirlidir, frekans oranı ise √2'dir. Tam yörünge 50 s'de %68.46'sını, 200 s'de %99.71'ini boyar ve 250 s'den itibaren ızgaranın tamamını gezer.",
    },
    {
      title: "Enerjisi bozulan, resmi bozmayan adım",
      body:
        "h = 0.01 s iken RK4, 3:2 kaplamasını 200 s boyunca 15.04 %'te tutar. Enerjisi ise tekdüze azalır; sürüklenme −7.3×10⁻¹⁰ /s'dir. Hız-Verlet'te en büyük bağıl enerji hatası 1.558×10⁻⁴ içinde salınır ve büyümez. Aynı adım frekans oranını 1.500031'e kaydırdığı için kaplama 16.46 %'ye çıkar. Resim ile enerji ayrı satırlarda durur.",
    },
  ],
  worked: {
    title: "3:2'yi eğriden yaya taşımak",
    prompt:
      "Eğri sekmesinin varsayılanı a = 3 rad/s, b = 2 rad/s, δ = 90°, A = B = 1 br. Periyodu, değmeleri ve kesişmeleri bul; δ = 45° için sayıları yeniden yaz. Sonra m = 1.00 kg, kₓ = 9 N/m, k_y = 4 N/m ile aynı oranı kur. h = 0.01 s'lik hız-Verlet'in oranı neden 1.500031 yaptığını ve 200 s'de fazın kaç radyan kaydığını hesapla.",
    steps: [
      "p:q = 3:2. T = 2π·p/a = 2π s = 6.283185 s. obeb(3, 2) = 1 olduğu için T = 2π/obeb(a, b) aynı sayıyı verir. Sayfa her iki sütunu da 6.283185 s yazar; fark −8.9×10⁻¹⁶ s'dir.",
      "q = 2 çift olduğundan geri dönen fazlar 45°'nin tek katlarıdır. 90° genel fazdadır: dikey değme 2p = 6, yatay 2q = 4, kesişme 2·3·2 − 3 − 2 = 7. Tablo bu üçünü kuramla birebir yazar.",
      "δ = 45° geri döner. Uçlar yarım sayılır: dikey «3 (2 değme + 2 uç × ½)», yatay «2 (1 değme + 2 uç × ½)». Açık yayda kesişme (3 − 1)(2 − 1)/2 = 1. Periyot yine 6.283185 s'dir.",
      "ωₓ = √(kₓ/m) = 3 rad/s, ω_y = √(4/1) = 2 rad/s. Oran 3/2'dir ve kütleye bakmaz. Tam yörünge T = 2π s'de kapanır; 64×64 ızgarada 616 hücre, yani %15.04 boyanır ve artmaz.",
      "Verlet açısı ωₛ h = 2 arcsin(ωh/2) verir. Küçük adımda ωₛ/ω ≈ 1 + (ωh)²/24. Oranın göreli hatası (0.03)²/24 − (0.02)²/24 = 3.75×10⁻⁵ − 1.67×10⁻⁵ = 2.08×10⁻⁵. Ölçülen oran 1.5·(1 + 2.08×10⁻⁵) = 1.500031.",
      "Kayma 3 rad/s · 2.08×10⁻⁵ · 200 s = 0.01248 rad. Sayfa bunu 0.0125 rad yazar. Hücre kenarı 2/64 = 0.03125 m olduğundan yol yaklaşık 0.40 hücre kayar. Kaplama 16.46 %'ye çıkar (+1.42 puan). RK4'te kayma 3.2×10⁻⁶ rad olur ve kaplama 15.04 %'te kalır.",
    ],
    result:
      "Varsayılan eğri 6.283185 s'de kapanır: 90°'de 6, 4 ve 7; 45°'de 3, 2 ve 1. Aynı 3:2 yaylarda da kurulur, tam yörünge %15.04'te durur. h = 0.01 s'lik Verlet 200 s'de oranı 1.500031'e kaydırır, fazı 0.0125 rad yürütür ve kaplamayı %16.46'ya çıkarır.",
  },
  misconceptions: [
    {
      myth: "Frekans a kutusu hertz cinsindendir.",
      truth:
        "Eğri ve harmonograf sekmelerinde a, b ve fᵢ rad/s'dir. Etiket «Frekans a» kalsa da çıktı «3 rad/s» yazar. Hertz, osiloskop sekmesindeki f₁ ve f₂'dedir. 3 rad/s, saniyede 3/(2π) ≈ 0.48 tur demektir.",
    },
    {
      myth: "Kesişme sayısı her zaman (p − 1)(q − 1)/2'dir.",
      truth:
        "Bu, geri dönen fazdaki açık yayın sayısıdır. Genel fazda sayı 2pq − p − q'dur. 3:2 için ikisi 1 ve 7'dir; 45° ile 90° düğmeleri tabloda ikisini de gösterir. pq 450'yi aşınca sayfa kesişmeleri saymaz.",
    },
    {
      myth: "Üçüncü sarkaç eklenince sönüm aynı tablodan okunur.",
      truth:
        "Üç sarkaçta x ve y, iki sönümlü terimin toplamıdır. Ölçülen sütun «üç sarkaçta yok» yazar. d ve f'yi tepelerden okumak için Sarkaç sayısı 2 olmalı ya da İki sarkaç · 2:1 düğmesine basılmalıdır.",
    },
    {
      myth: "Pencerede kapanmayan her eğri irrasyoneldir.",
      truth:
        "√2 hazır deneyi gerçekten irrasyoneldir; kuram «∞ (a/b irrasyonel)» yazar. Kutuya 1.414214 yazmak ise 707107:500000 kesridir. Kuram sütunu 3141592.653590 s yazar, durum satırı aynı süreyi 3.14×10⁶ s diye kısaltır. Ölçülen «pencerede dönmedi» kalır; pencere 251.3 s'dir.",
    },
  ],
  glossary: [
    { term: "Lissajous eğrisi", definition: "İki dik harmonik salınımın düzlemde çizdiği eğri; şeklini frekans oranı ve faz belirler." },
    { term: "Açısal frekans", definition: "Salınımın rad/s cinsinden hızı; eğri sekmesinde a ve b, harmonografta fᵢ bu birimdedir." },
    { term: "En sade oran p : q", definition: "a/b kesrinin sadeleştirilmiş hâli; periyot, değme ve kesişme sayıları p ve q ile yazılır." },
    { term: "Geri dönen faz", definition: "x ile y'nin aynı anda uç değerde olduğu faz; eğri köşeden girip kendi izinden döner, değmeler p ve q'ya iner." },
    { term: "Kendini kesme", definition: "Eğrinin iki farklı anda aynı noktadan geçtiği yer; genel fazda 2pq − p − q tanedir." },
    { term: "Fosfor kalıcılığı", definition: "Osiloskop izinin parlaklığının e^(−t/τ) ile sönmesi; τ milisaniyedir ve varsayılan değer 60 ms'dir." },
    { term: "Harmonograf", definition: "İki ya da üç sönümlü sarkaçla Lissajous eğrisi çizen düzenek; üçüncü sarkaç döner masayı sürer." },
    { term: "Hız-Verlet", definition: "Sabit adımla ilerleyen bir sayısal yöntem; burada enerji hatası sınırlı kalır, frekans ωₛ = (2/h)·arcsin(ωh/2) olur." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede eğri bir resimdir. Lisansın ilk yılında aynı resim üç derste birden açılır. Fizik I'de iki boyutta harmonik salınıcı, x'' + ω²x = 0, birbirine dik iki çözümün Lissajous eğrisi olduğunu gösterir. Diferansiyel Denklemler dersi periyodun neden 2π·p/a olduğunu, oranın irrasyonel olması hâlinde yörüngenin dikdörtgende yoğun olduğunu konuşur. Sayısal Analiz ise bu sayfanın yay sekmesindeki soruyu sorar: hız-Verlet enerjiyi neden sınırlı tutar da frekansı kaydırır, RK4 neden tersini yapar?",
      "Sinyaller ve Sistemler'de osiloskop yöntemi bir ölçme tarifine dönüşür. Bilinen f₁'e karşı okunan faz eğimi, bilinmeyen f₂'yi ve vuru periyodu 1/|f₁ − f₂|'yi verir. Titreşim dersi, buradaki raylı yayların neden ayrıştığını ve gerçek bir sarkacın frekansının genliğe neden bağlı olduğunu ekler; sayfadaki harmonograf o genlik bağımlılığını modele koymaz. İki sarkaç birbirine bağlanırsa ayrışma bozulur. O düzenek çift sarkaç sayfasındadır: aynı salınım dili, kapanan eğrinin bittiği yerde kaosa döner.",
    ],
    topics: ["Parametrik eğriler", "Diferansiyel denklemler", "İki boyutlu salınıcı", "Vuru ve faz kayması", "Sayısal tümleme", "Yoğun yörüngeler"],
  },
  quiz: [
    {
      question: "3:2 eğrisinde δ = 45° neden 7 değil, 1 kesişme verir?",
      options: [
        "Periyot kısalır ve kesişmeler pencerenin dışında kalır",
        "Eğri köşeden dönüp kendi izinden gider; açık yayda kesişme (p − 1)(q − 1)/2 olur",
        "Genlikler küçülünce kesişmeler üst üste biner",
        "Oran irrasyonel olur ve kesişme sayısı sınırsızdır",
      ],
      answer: 1,
      explanation: "q = 2 çift olduğu için 45° geri dönen fazdır. Eğri açık yaydır, kesişme (3 − 1)(2 − 1)/2 = 1'dir. 90° genel fazdadır ve 2·3·2 − 3 − 2 = 7 verir. Periyot ikisinde de 2π s'dir.",
    },
    {
      question: "a ve b birlikte iki katına çıkarsa eğriye ne olur?",
      options: [
        "Şekil değişir, periyot aynı kalır",
        "Periyot yarıya iner; p:q ve δ aynı kaldığı için şekil değişmez",
        "Periyot iki katına çıkar, kesişme sayısı da ikiye katlanır",
        "Oran irrasyonel olur",
      ],
      answer: 1,
      explanation: "T = 2π·p/a. a = 6 rad/s ve b = 4 rad/s hâlâ 3:2'dir, obeb 2 olduğu için T = π s = 3.141593 s olur. Değme 6 ve 4, kesişme 7 kalır; eğri aynı resmi iki kat hızla dolaşır.",
    },
    {
      question: "Hız-Verlet 200 s'de 3:2 kaplamasını %15.04'ten %16.46'ya çıkarırken en büyük |ΔE|/E₀ değeri 1.558×10⁻⁴ içinde kalır. Bu neyi gösterir?",
      options: [
        "Enerji sürüklenmesi yörüngeyi açmaktadır",
        "Adım frekansları biraz kaydırır; enerji hatası sınırlı kalsa da faz birikir",
        "64×64 ızgara kapalı bir 3:2 eğrisini tutamayacak kadar kabadır",
        "RK4 aynı adımda kaplamayı daha çok bozar",
      ],
      answer: 1,
      explanation: "ωₛ = (2/h)·arcsin(ωh/2) tam ω değildir. Göreli oran hatası +2.08×10⁻⁵, 200 s'de 0.0125 rad, yaklaşık 0.40 hücre eder. RK4 aynı h'de kaplamayı %15.04'te tutar; onun görünen hatası enerjinin yavaşça azalmasıdır.",
    },
  ],
  next: [
    { href: "yay-kutle.html", title: "Yay–Kütle", why: "Buradaki iki yayın her biri, tek boyutta aynı denklemi çözer: x'' + (k/m)x = 0." },
    { href: "dalga-superpozisyonu.html", title: "Dalga Süperpozisyonu", why: "Osiloskoptaki iki saniyelik turun işitsel kuzeni vurudur; periyot yine 1/|f₁ − f₂|'dir." },
    { href: "konik-kesitler.html", title: "Konik Kesitler", why: "1:1 bir elips, A = B ve 90° bir çember, 2:1 ve 90° ise x = 1 − 2y² parabolüdür." },
    { href: "cift-sarkac.html", title: "Çift Sarkaç", why: "Sarkaçlar birbirine bağlanınca ayrışma biter; kapanan eğrinin yerini kaotik hareket alır." },
  ],
  sources: [
    {
      title: "Wikipedia · Lissajous curve",
      url: "https://en.wikipedia.org/wiki/Lissajous_curve",
      note: "Bowditch'in 1815 kaydı, Lissajous'un 1857 optik yöntemi ve parametrik denklem. Fazın hangi kanala konduğu kaynağa göre değişir; bu sayfa fazı x'e koyar (İngilizce).",
    },
    {
      title: "MathWorld · Lissajous Curve",
      url: "https://mathworld.wolfram.com/LissajousCurve.html",
      note: "x = A sin(at + δ), y = B sin(bt) ve elips, parabol gibi kapalı haller. Kesişme sayısında kaynaklar ayrılır; bu sayfanın sayımı tablodaki kuram sütunudur (İngilizce).",
    },
    {
      title: "Wikipedia · Harmonograph",
      url: "https://en.wikipedia.org/wiki/Harmonograph",
      note: "İki ve üç sarkaçlı çizim makinesi ile Lissajous eğrisi ilişkisi. Tek bir mucit konusunda temkinli olmak için uygun bir giriş (İngilizce).",
    },
    {
      title: "Wikipedia · Oscilloscope",
      url: "https://en.wikipedia.org/wiki/Oscilloscope",
      note: "İki kanallı Lissajous karşılaştırması: bilinen bir frekansa karşı oran ve faz okumak (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
