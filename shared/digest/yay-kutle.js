window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["yay-kutle"] = {
  slug: "yay-kutle",
  title: "Yay ve Kütle: Saati Cebe Sığdıran Salınım",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 45,
  tagline:
    "Yay geri çağırır, sönüm yavaşlatır, dış kuvvet besler. Tek bir denklem periyodu, üç sönüm rejimini ve rezonans eğrisini verir; üç sekmede hepsini ölç ve kuramla yan yana koy.",
  hook: "Sarkaçlı bir duvar saatini Ay'a götürsen yaklaşık iki buçuk kat yavaş işler. Kolundaki mekanik saati götürsen tik-takı neredeyse hiç değişmez. Fark tek bir parçada saklı: içindeki salınıcıyı yerçekimi değil, saç teli inceliğinde bir yay geri çağırır.",
  bigIdea:
    "Geri çağıran kuvvet dengeden uzaklıkla doğru orantılıysa (<em>F = −kx</em>) periyodu yalnızca m/k oranı belirler; genlik de yerçekimi de karışmaz. Sönüm ve dış kuvvet eklendiğinde ise tek bir sayı, <em>Q</em>, hem salınımın ne kadar çabuk söndüğünü hem rezonans tepesinin ne kadar keskin olduğunu söyler.",
  story: [
    "1676'da Robert Hooke, yayımladığı bir metne anlamsız görünen bir harf dizisi ekledi: <em>ceiiinosssttuv</em>. Dönemin bilginleri bir buluşun önceliğini, içeriğini ele vermeden güvenceye almak için böyle şifreler yayımlardı. 1678'de <em>De Potentia Restitutiva, or of Spring</em> (Geri Getirme Gücü ya da Yay Üzerine) adlı çalışmasında şifreyi çözdü: harfler, alfabetik sıraya dizilmiş <strong>ut tensio, sic vis</strong> cümlesiydi; 'uzama nasılsa, kuvvet de öyle'. Hooke aynı çalışmada yasayı 1660'tan beri bildiğini yazar; bunu yalnızca kendi beyanından biliyoruz.",
    "Hooke'un aklındaki uygulama saatti. Cep saatlerinde ileri geri dönen çark, yaysız haliyle saati süren ana yayın gücüne çok duyarlıydı; ana yay gevşedikçe saat yavaşlıyordu. Çarka ince, sarmal bir <strong>denge yayı</strong> eklemek onu kendi doğal frekansında salınan bir harmonik salınıcıya dönüştürdü. Buluşun kime ait olduğu bugün de tartışmalıdır: fikir büyük olasılıkla Hooke'tan çıktı, ama 1670'lerin ortasında çalışan ilk denge yaylı saati Christiaan Huygens yaptırdı. Kaba tahminlere göre cep saatlerinin hatası günde birkaç saatten on dakika mertebesine indi; saat bir süs eşyası olmaktan çıkıp gerçek bir ölçüm aletine dönüştü.",
    "Aynı model bugün çok daha büyük ve çok daha küçük ölçeklerde çalışıyor. Bir gökdelen, kütlesi katlarında, yayı çelik iskeletinde olan dev bir yay–kütle sistemidir; rüzgâr onu kendi doğal frekansına yakın bir ritimde iterse salınım büyür. 1970'lerden beri bazı yüksek yapılara, binanın frekansına ayarlanmış ikinci bir salınan kütle yerleştirilir: <strong>ayarlı kütle sönümleyici</strong>. Öbür uçta, bir moleküldeki iki atomu bağlayan kimyasal bağ da küçük bir yay gibi titreşir. Hooke'un tek satırlık yasası, saatçilerin sırrından fiziğin en çok kullanılan modeline dönüştü.",
  ],
  core: [
    {
      heading: "Hooke yasası ve yer değiştiren denge",
      body: "Bloğu dengeden x kadar çekersen yay onu ters yönde, x ile orantılı bir kuvvetle geri çağırır. Orantı katsayısı <strong>yay sabiti</strong> k'dir (N/m): 20 N/m'lik yayı 10 cm uzatmak 2 N ister. Yayı düşey asınca işe yerçekimi karışır, ama sanıldığından çok daha az. Yük yayı k·Δ = m·g olana dek uzatır; x'i bu yeni denge noktasından ölçersen net kuvvet m·g − k·(Δ + x) = −k·x olur. Sabit bir kuvvet denklemden tümüyle düşer; geriye yalnızca kaymış bir denge kalır. Sayfada <strong>Düzen</strong> menüsünden düşeyi seçtiğinde 0.50 kg'lık kütle 20 N/m'lik yayı 0.2453 m uzatır, periyot ise yataydakiyle aynı kalır. Gerçek bir yay fazla zorlanınca kalıcı biçimde uzar ve doğrusallığını yitirir; sayfadaki yay her uzamada ve sıkışmada yasaya tam uyan ideal bir modeldir.",
      formula: "F = −k·x,  Δ = m·g/k",
      formulaNote:
        "Eksi işareti kuvvetin hep dengeye baktığını söyler. Δ düşey yayın durgun uzamasıdır; periyot formülüne girmez.",
    },
    {
      heading: "Hareket denklemi: periyotta genlik neden yok?",
      body: "Newton'un ikinci yasasını Hooke yasasıyla birleştir: m·x″ = −k·x, yani x″ = −ω₀²·x ve ω₀ = √(k/m). İkinci türevi kendisinin eksi bir katı olan fonksiyonlar sinüs ve kosinüstür; durgun bırakılan blok için çözüm x = x₀·cos ω₀t olur. Hız v = −x₀ω₀·sin ω₀t, konumun çeyrek periyot önünde gider: blok uçta bir an durur, dengeden en hızlı geçer. Genliğin periyotta görünmemesi denklemin <strong>doğrusal</strong> olmasındandır: bir çözümü iki ile çarparsan yine çözümdür. İki kat uzağa çekilen blok iki kat yol alır, ama her anda iki kat hızlıdır; süre değişmez. Sarkaçta bu yalnızca küçük açılarda yaklaşık doğrudur, ideal yayda tam doğrudur. Kütle ise sarkaçtakinin tersine sadeleşmez, çünkü yay ağır bloğa fazladan kuvvet uygulamaz. Yayın kendi kütlesi de salınıma katılır: hızı sabit uçta sıfırdan blokta v'ye doğrusal arttığından kinetik enerjisi ½·(m<sub>s</sub>/3)·v² eder ve hafif yaylar için m yerine m + m<sub>s</sub>/3 yazmak yeter.",
      formula: "x(t) = x₀·cos ω₀t,  ω₀ = √(k/m),  T = 2π√(m/k)",
      formulaNote:
        "Varsayılan ayarda (m = 0.50 kg, k = 20 N/m) ω₀ = 6.325 rad/s ve T = 0.9935 s. Kütleyi dört katına çıkarmak periyodu iki katına çıkarır.",
    },
    {
      heading: "Enerji, faz uzayı ve sayısal yöntemin sınavı",
      body: "Gerilmiş yay ½k·x², hareket eden blok ½m·v² taşır; sürtünme yoksa toplamları sabittir. (x, v) düzleminde bu, durum noktasının bir elipsin üzerinde dolaşması demektir; sayfadaki <strong>faz uzayı</strong> grafiğindeki kesikli eğri o elipstir. Enerji korunumu aynı zamanda bir hesap yönteminin doğruluk sınavıdır. En basit yöntem olan <strong>açık Euler</strong> bir adımda x'i h·v, v'yi −h·ω₀²·x kadar değiştirir; yerine koyarsan çapraz terimler birbirini götürür ve yeni enerji, eskisinin tam (1 + ω₀²h²) katı çıkar. Adım ne kadar küçük olursa olsun çarpan 1'den büyüktür: enerji her adımda artar, iz elipsten dışarı doğru sarmal çizer. Varsayılan ayarda h = 1 ms için çarpan 1.000040'tır; 10 saniyede 10 000 adım atılır ve enerji 1.000040<sup>10 000</sup> ≈ 1.49 katına çıkar. <strong>Hız-Verlet</strong> de enerjiyi tam korumaz, ama sapmasını dar bir aralıkta tutar (bu ayarda en çok (ω₀h)²/4); uzun benzetimlerde (gezegen yörüngeleri, molekül dinamiği) bu yüzden yeğlenir.",
      formula: "E = ½k·x² + ½m·v² = ½k·x₀²;  Euler: E<sub>n+1</sub> = (1 + ω₀²h²)·E<sub>n</sub>",
      formulaNote:
        "Sayısal yöntem menüsünden Açık Euler'i seç: tablodaki enerji sapması 10. saniyede 0.49'a ulaşır (tam 10 s için 0.4918), büyümeyi sürdürür ve her an beklenen değerle örtüşür (fark 0.00 %).",
    },
    {
      heading: "Sönüm: karakteristik denklem ve üç rejim",
      body: "Hızla orantılı bir direnç ekle: m·x″ + b·x′ + k·x = 0. Doğrusal ve sabit katsayılı bu denklemde x = e<sup>st</sup> denemek yeter; türevler s çarpanı getirir ve geriye bir ikinci derece denklem kalır: s² + 2γ·s + ω₀² = 0, γ = b/2m. Kökün altındaki γ² − ω₀² farkının işareti her şeyi belirler; bunu tek sayıyla <strong>sönüm oranı</strong> ζ = γ/ω₀ = b/(2√(km)) özetler. ζ &lt; 1 ise kökler karmaşıktır: blok ω<sub>d</sub> = √(ω₀² − γ²) frekansıyla salınır, genliği e<sup>−γt</sup> zarfıyla küçülür (<strong>az sönümlü</strong>). ζ = 1'de kökler çakışır: x = x₀·(1 + ω₀t)·e<sup>−ω₀t</sup>, salınım yoktur (<strong>kritik</strong>). ζ &gt; 1'de iki ayrı üstel vardır ve yavaş olanı, ω₀·(ζ − √(ζ² − 1)), sönüm arttıkça daha da yavaşlar (<strong>aşırı sönümlü</strong>). Az sönümlü rejimde ardışık iki tepenin oranı sabittir; doğal logaritması <strong>logaritmik azalma</strong> δ = γ·T<sub>d</sub>'dir. Enerji genliğin karesiyle gittiğinden her turda enerjinin 1 − e<sup>−2δ</sup> kadarı ısıya döner.",
      formula: "s = −γ ± √(γ² − ω₀²),  ζ = b/(2√(km)),  Q = √(km)/b = 1/(2ζ)",
      formulaNote:
        "Q kalite çarpanıdır. Sönüm çok küçükken bir turdaki enerji kaybı yaklaşık 2π/Q olur; Q = 10'da bu yaklaşım bile kabadır (0.6283'e karşı ölçülen 0.4669).",
    },
    {
      heading: "Zorlanma: karmaşık genlik ve rezonans",
      body: "Sağ tarafa F₀·cos ωt koy. Doğal salınım e<sup>−γt</sup> ile söner (<strong>geçici rejim</strong>); geriye sürücünün frekansında bir salınım kalır (<strong>kalıcı durum</strong>). Onu bulmanın kısa yolu kuvveti F₀·e<sup>iωt</sup>'nin gerçek kısmı saymak ve x = X·e<sup>iωt</sup> denemektir: türevler iω çarpanına dönüşür, diferansiyel denklem cebire iner ve X = F₀/(k − mω² + i·bω) çıkar. Paydanın büyüklüğü genliği, açısı faz gecikmesini verir. Üç bölge var. Yavaş sürüşte yay belirler: A ≈ F₀/k, blok kuvvetle birlikte gider. Hızlı sürüşte kütle belirler: A ≈ F₀/(mω²), blok kuvvetin tersine gider. ω = ω₀'da yay ve atalet terimleri birbirini götürür, geriye yalnızca sönüm kalır: A = F₀/(bω₀) = Q·F₀/k, gecikme tam 90°. O anda hız kuvvetle aynı fazdadır, sürücü her an pozitif iş yapar ve soğurulan ortalama güç en büyük değerine, F₀²/2b'ye ulaşır. Genliğin tepesi ise biraz daha aşağıda, ω₀√(1 − 2ζ²)'dedir; ζ ≥ 0.707 olunca tepe tümüyle kaybolur.",
      formula: "A(ω) = F₀/√((k − mω²)² + (bω)²),  tan φ = bω/(k − mω²),  P = ½·b·ω²·A²",
      formulaNote:
        "Güç eğrisinin yarı yükseklikteki tam genişliği tam olarak Δω = b/m = ω₀/Q'dur: Q büyüdükçe tepe yükselir ve daralır.",
    },
  ],
  lab: {
    intro:
      "Sayfa üç sekmeli bir laboratuvar ve her sekmede benzetimden <strong>ölçülen</strong> değer, <strong>kuram</strong> değeri ve <strong>fark</strong> yan yana durur. <strong>01 · Basit harmonik hareket</strong>: <strong>Kütle m</strong> (0.05–2.00 kg), <strong>Yay sabiti k</strong> (5–100 N/m), <strong>Başlangıç genliği x₀</strong> (0.01–0.30 m), <strong>Düzen</strong> (yatay ya da düşey), düşeyde <strong>Yerçekimi g</strong> (Ay, Mars, Dünya, Jüpiter), <strong>Yay</strong> menüsünde üç gizli yay, <strong>İleri düzey: yayın kendi kütlesi var</strong> kutusu, <strong>Sayısal yöntem</strong> ve <strong>Zaman adımı h</strong>; bloğu sürükleyip de bırakabilirsin. <strong>02 · Sönümlü salınım</strong>: <strong>Sönüm katsayısı b</strong> kaydırıcısı ζ üzerinden ilerler, etiketi b'yi (kg/s) ve ζ'yı birlikte yazar; üç hazır düğme ve beş düzeni yarıştıran dengeye dönüş tablosu var. <strong>03 · Zorlanma ve rezonans</strong>: aynı sönüm kaydırıcısı (etiketi b, ζ ve Q'yu yazar), <strong>Kuvvet genliği F₀</strong>, <strong>Sürücü frekansı ω</strong>, dört hazır düğme, <strong>Kalıcı duruma atla</strong> ve <strong>Frekansı tara</strong>. Sayılar ondalık noktayla, farklar <em>−25.69 %</em> biçiminde yazılır. <kbd>Boşluk</kbd> duraklatır, <kbd>R</kbd> etkin sekmeyi sıfırlar. Deneylerden sonra kendi başına dene: <strong>Vuru: ζ = 0.005, ω = 0.90 ω₀</strong> düğmesine bas; sürücüyle henüz sönmemiş doğal salınım üst üste biner ve genlik kabarıp iner; tablo vuru periyodunun kuram değerini 9.936 s, ilk çukurlardan ölçüleni yaklaşık 9.9 s verir. Model ideal yay ve hızla orantılı sönümdür; kuru sürtünme ve yayın doğrusallıktan sapması yoktur.",
    experiments: [
      {
        title: "Periyot neye bağlı, neye değil?",
        predict:
          "Varsayılan ayarda (m = 0.50 kg, k = 20 N/m) periyot 0.9935 s. Genliği üç katına çıkarırsan ne olur? Kütleyi dört katına çıkarırsan? Yayı düşey asıp Dünya'dan Ay'a götürürsen?",
        do: "01 sekmesinde <strong>Başlangıç genliği x₀</strong>'ı 0.30 m yap, birkaç salınım bekle ve tablodaki Periyot T satırını oku. x₀'ı 0.10 m'ye döndürüp <strong>Kütle m</strong>'yi 2.00 kg yap. Sonra m'yi 0.50 kg'a geri al, <strong>Düzen</strong> menüsünden Düşey, yerçekimli'yi seç ve <strong>Yerçekimi g</strong>'yi önce Dünya'da, sonra Ay'da dene.",
        observe:
          "x₀ = 0.30 m'de ölçülen T yine 0.9935 s, fark 0.000 %; toplam enerji ise 0.1000 J'den 0.9000 J'ye, dokuz katına çıkar. m = 2.00 kg'da T = 1.9869 s olur. Düşeyde Dünya'da denge uzaması 0.2453 m, Ay'da 0.0405 m; ikisinde de T = 0.9935 s. Ay'da durum satırı genliğin denge uzamasından büyük olduğunu, yayın üst noktada sıkıştığını yazar.",
        explain:
          "T = 2π√(m/k) içinde ne x₀ ne g var. Genlik enerjiyi karesiyle büyütür ama süreyi değiştirmez; kütle periyoda karekökle girer (√4 = 2). Yerçekimi sabit bir kuvvettir: denge noktasını m·g/k kadar aşağı taşır, o noktanın çevresindeki geri çağırıcı kuvvet yine −k·x'tir.",
      },
      {
        title: "Gizli yayın sabitini iki bağımsız yoldan bul",
        predict:
          "Sabitini bilmediğin bir yay, birkaç kütle, bir cetvel ve bir kronometren var. k'yi hiç süre ölçmeden bulabilir misin? Hiç uzama ölçmeden? İki sonuç tutar mı?",
        do: "01 sekmesinde <strong>Yay</strong> menüsünden Gizli yay B'yi seç (düzen düşeye kilitlenir; g Dünya'da kalsın). <strong>Kütle m</strong> 0.20, 0.50 ve 1.00 kg iken en az iki tam salınım bekleyip <strong>Ölçümü kaydet</strong>'e bas, sonra <strong>k'yi göster</strong>. Ardından <strong>İleri düzey: yayın kendi kütlesi var</strong> kutusunu aç (m<sub>s</sub> = 0.15 kg; defter kendiliğinden temizlenir) ve üç ölçümü yinele.",
        observe:
          "Uzamalar 0.0604, 0.1509, 0.3018 m; periyotlar 0.4929, 0.7793, 1.1021 s. Sonuç satırı uzama doğrusunun eğiminden k = 32.51 N/m, T² doğrusunun eğiminden k = 32.50 N/m verir; gerçek değer 32.5 N/m. Yay kütlesi açıkken uzamalar 0.0830, 0.1736, 0.3245 m'ye, periyotlar yaklaşık 0.553, 0.818, 1.130 s'ye çıkar (son basamak kayıt anına göre oynar). Eğimler yine k'yi verir (uzamadan 32.50, periyottan yaklaşık 32.55 N/m), ama doğrular artık sıfırdan geçmez: sonuç satırına göre etkin kütle durgun uzamadan 0.075 kg, periyottan yaklaşık 0.052 kg çıkar.",
        explain:
          "Δ = (m + m<sub>s</sub>/2)·g/k ve T² = (4π²/k)·(m + m<sub>s</sub>/3): iki doğru da m'ye göre doğrusaldır, eğimleri birbirinden bağımsız iki k verir. Kesişimler yayın etkin kütlesidir: durgun asılıyken kütlesinin yarısı, salınırken yaklaşık üçte biri sayılır. Üçte bir oranı hafif yay için geçerli bir yaklaşımdır: tam çözüm β·tan β = m<sub>s</sub>/m, ω = β·√(k/m<sub>s</sub>) denkleminden gelir ve m<sub>s</sub> = m olduğunda yaklaşım periyodu %0.7 kısa verir. Periyottan bulunan k'nin 32.50 yerine 32.55 çıkması da bu yüzdendir.",
      },
      {
        title: "Üç sönüm rejimi ve dengeye dönüş yarışı",
        predict:
          "Bir kapıyı çarpmadan ve en kısa sürede kapatacak sönümü arıyorsun. Blok ±%5 bandına hangi sönüm oranında en erken yerleşir: ζ = 0.70, 1 (kritik) ya da 2?",
        do: "02 sekmesinde varsayılanda (ζ = 0.05) tabloyu oku. Sonra <strong>Kritik ζ = 1</strong> ve <strong>Aşırı ζ = 2</strong> düğmelerine bas; her seferinde grafiğe ve dengeye dönüş tablosuna bak. Son olarak <strong>Sönüm katsayısı b</strong> kaydırıcısıyla ζ = 0.70, ardından ζ = 0.69 yap (etiket ζ'yı da yazar) ve tablonun Seçili satırını izle; grafiğin altındaki notu oku.",
        observe:
          "ζ = 0.05: T<sub>d</sub> = 0.9947 s, δ = 0.3146, Q = 10.000; bir turda enerji kaybı 0.4669, 2π/Q = 0.6283 ile farkı −25.69 %, tam ifadeyle 0.000 %. Kritikte b = 6.325 kg/s, salınım yok, t₅% = 0.750 s, aşma 0.0. ζ = 2'de t₅% = 1.812 s. ζ = 0.70'te t₅% = 0.459 s ama blok dengeyi %4.6 aşar. ζ = 0.69'da tablo aşmayı 5.0 yazar (tam değeri %5.004) ve süre birden 0.693 s'ye sıçrar.",
        explain:
          "Kritik sönüm dengeyi hiç aşmadan en çabuk dönen düzendir. %5'lik bir pay tanırsan hafif az sönümlü sistem kazanır: ζ = 0.70'te ilk aşma bandın içinde kalır, blok banda ilk girişinde yerleşmiş sayılır. ζ = 0.69'da aynı aşma bandın kıl payı dışına taşar, blok ancak geri dönerken yerleşir; sıçramanın nedeni budur. Yani 0.70 sihirli bir sayı değil, %5'lik ölçütün eşiğidir (tam eşik ζ ≈ 0.6901); bandı %2 seçseydin başka bir değer çıkardı. Sönümü kritiğin üstüne çıkarmak dönüşü hızlandırmaz, yavaş üsteli daha da yavaşlatır.",
      },
      {
        title: "Rezonans eğrisini kendin çıkar",
        predict:
          "0.5 N'luk kuvvet 20 N/m'lik yayı durgunken yalnızca 0.025 m uzatır. Aynı kuvvet tam ω₀'da uygulanırsa genlik kaç olur? Genliğin en büyük olduğu frekans ile gücün en büyük olduğu frekans aynı mıdır?",
        do: "03 sekmesinde varsayılanda (ω = 0.80 ω₀) <strong>Kalıcı duruma atla</strong>'ya bas ve tabloyu oku. <strong>Rezonans: ω = ω₀</strong>, yeniden <strong>Kalıcı duruma atla</strong>. Sonra <strong>Frekansı tara</strong>'ya bas ve tarama kartını incele. Son olarak <strong>Sönüm katsayısı b</strong>'yi etiketi 1.265 kg/s · ζ = 0.200 · Q = 2.5 gösterene dek artır ve bir kez daha tara.",
        observe:
          "0.80 ω₀'da A = 0.0678 m, φ = 12.53°, güç 0.0186 W. Tam ω₀'da A = 0.2500 m, φ = 90.00°, güç 0.3953 W; sürücünün gücü ile sönümde harcanan eşittir. Tarama: genlik tepesi 6.309 rad/s'de (0.2503 m), güç tepesi 6.325 rad/s'de (0.3953 W), yarı yükseklikteki tam genişlik Δω = 0.632 rad/s. ζ = 0.200'de genlik tepesi 6.066 rad/s'ye iner ve 0.0638 m'ye alçalır; güç tepesi yine 6.325 rad/s'dedir ama 0.0988 W'a iner, Δω = 2.530 rad/s olur.",
        explain:
          "Rezonansta genlik durgun uzamanın Q katıdır: 10 × 0.025 m. Güç tepesi sönüm ne olursa olsun tam ω₀'dadır, çünkü hız yalnızca orada kuvvetle aynı fazdadır; genlik tepesi ω₀√(1 − 2ζ²)'ye kayar. Sönümü dört katına çıkarmak Q'yu 10'dan 2.5'e indirir, güç eğrisini dört kat genişletir. Kalıcı durumda sürücünün verdiği enerjinin tamamı sönümde ısıya döner.",
      },
    ],
  },
  wow: [
    {
      title: "Gökdelenin tepesinde 660 tonluk sarkaç",
      body: "Taipei 101 gökdeleninin 92. katından 5.5 metre çaplı, yaklaşık 660 tonluk çelik bir küre sarkar. Bu bir ayarlı kütle sönümleyicidir: frekansı binanınkine ayarlanmıştır; rüzgâr binayı itince küre gecikmeli salınıp onu hareketinin tersine çeker, sönümleyiciler de enerjiyi ısıya çevirir. 2015'te Soudelor tayfunu küreyi 1 metre savurdu; o güne dek kaydedilen en büyük hareketi buydu. Dikkat: küreyi geri çağıran bir yay değil, yerçekimidir; halatlar onu yalnızca kavisli bir yolda tutar. Yani bu bir sarkaçtır ve frekansını kütle değil halat boyu belirler. Küçük salınımlarda denklemi yay–kütleninkiyle aynıdır; k/m'nin yerini g/L alır.",
    },
    {
      title: "Molekül de bir yay",
      body: "Hidrojen klorür (HCl) molekülündeki bağ, yay sabiti yaklaşık 500 N/m olan bir yay gibi davranır; bu sayfadaki en sert yaydan (100 N/m) beş kat serttir. Ama klor atomu neredeyse hiç kıpırdamaz, salınan hidrojendir ve kütlesi yaklaşık 1.7×10⁻²⁷ kg'dır. ω = √(k/m) bu yüzden devasa çıkar: bağ saniyede yaklaşık 8.7×10¹³ kez titreşir ve dalga boyu yaklaşık 3.5 mikrometre olan kızılötesi ışığı soğurur. Kızılötesi spektroskopi molekülleri bu 'yay seslerinden' tanır.",
    },
    {
      title: "Saniyede 32 768 titreşim",
      body: "Kuvars kol saatlerinde minik bir diyapazon biçiminde kesilmiş kuvars kristali saniyede 32 768 kez titreşir. Sayı rastgele değildir: 32 768 = 2<sup>15</sup>. Saatin devresi bu frekansı on beş kez art arda ikiye bölerek tam 1 Hz'lik bir tık elde eder. Kristalin titreşimi de esnek bir cismin salınımıdır; diyapazonun kolları hem kütle hem yay görevi görür. Kuvars ayrıca piezoelektriktir: bükülünce elektrik gerilimi üretir, gerilim uygulanınca bükülür. Devre bu sayede titreşimi hem besler hem sayar.",
    },
  ],
  worked: {
    title: "Tek salınıcının kimlik kartı: ω₀, ζ, Q ve rezonans",
    prompt:
      "m = 0.50 kg'lık blok, k = 20 N/m'lik yaya ve b = 0.3162 kg/s'lik viskoz sönümleyiciye bağlı. (a) ω₀, ζ ve Q'yu bul. (b) Sönümlü periyodu, logaritmik azalmayı ve bir turda yitirilen enerji oranını hesapla; 2π/Q kestirimiyle karşılaştır. (c) Sistem F₀ = 0.5 N genlikli kuvvetle tam ω₀'da sürülürse kalıcı genlik ve soğurulan ortalama güç ne olur? (d) Güç eğrisinin genişliği nedir?",
    steps: [
      "(a) ω₀ = √(k/m) = √(20 N/m ÷ 0.50 kg) = √40 s⁻² = 6.325 rad/s. γ = b/2m = 0.3162 s⁻¹. ζ = γ/ω₀ = 0.3162/6.325 = 0.050. Q = √(km)/b = √(10 kg²/s²)/(0.3162 kg/s) = 3.162/0.3162 = 10.0. ζ &lt; 1 olduğundan sistem az sönümlüdür.",
      "(b) ω<sub>d</sub> = √(ω₀² − γ²) = √(40 − 0.100) s⁻¹ = 6.317 rad/s, T<sub>d</sub> = 2π/ω<sub>d</sub> = 0.9947 s; sönümsüz 0.9935 s'den yalnızca %0.13 uzun. δ = γ·T<sub>d</sub> = 0.31623 × 0.99470 = 0.3146. Ardışık tepelerin oranı e<sup>−δ</sup> = 0.730: her turda genliğin %27'si gider.",
      "Enerji genliğin karesiyle orantılıdır: bir tur sonra kalan oran e<sup>−2δ</sup> = e<sup>−0.6291</sup> = 0.5331, yitirilen oran 1 − 0.5331 = 0.4669. Kestirim 2π/Q = 0.6283 ise üstelin ilk terimidir (1 − e<sup>−u</sup> ≈ u, u = 2δ); u = 0.63 küçük sayılamayacağı için kaybı üçte bir kadar fazla gösterir. Sayfa aynı farkı ölçülenden bakarak −25.69 % diye yazar.",
      "(c) ω = ω₀'da k − mω² = 0 olur, paydada yalnızca sönüm kalır: A = F₀/(bω₀) = 0.5 N/(0.3162 kg/s × 6.325 rad/s) = 0.2500 m. Bu, durgun uzama F₀/k = 0.025 m'nin Q = 10 katıdır. Hız genliği ω₀A = 1.581 m/s'dir ve kuvvetle aynı fazdadır: P = ½·F₀·ω₀A = ½ × 0.5 N × 1.581 m/s = 0.3953 W. Denetim: F₀²/2b = 0.25/0.6325 = 0.3953 W.",
      "(d) Gücün yarıya indiği iki frekans arasındaki fark Δω = b/m = 0.3162/0.50 = 0.632 rad/s, yani ω₀/Q = 6.325/10. Sayfada doğrula: 02 sekmesinin varsayılanı (b) şıkkındaki değerleri, 03 sekmesinde Rezonans: ω = ω₀ ile Kalıcı duruma atla (c) şıkkını, Frekansı tara (d) şıkkını verir.",
    ],
    result:
      "ω₀ = 6.325 rad/s, ζ = 0.05, Q = 10; T<sub>d</sub> = 0.9947 s, δ = 0.3146, tur başına enerji kaybı 0.4669; rezonansta A = 0.2500 m ve P = 0.3953 W; Δω = 0.632 rad/s. Q üç ayrı yerde karşına çıktı: sönmenin hızında, rezonanstaki büyütmede ve tepenin darlığında. Birini ölçersen öbür ikisini bilirsin.",
  },
  misconceptions: [
    {
      myth: "Bloğu daha uzağa çekersen bir gidiş-dönüş daha uzun sürer.",
      truth:
        "İdeal yayda periyot genlikten tümüyle bağımsızdır: iki kat yol, her anda iki kat hızla alınır. 01 sekmesinde x₀'ı 0.10 m'den 0.30 m'ye çıkar; enerji dokuz katına çıkar, ölçülen T yine 0.9935 s'dir. Sarkaçta bu yalnızca küçük açılarda yaklaşık doğrudur; gerçek bir yayda da yay Hooke bölgesinde kaldığı sürece geçerlidir.",
    },
    {
      myth: "Yay–kütle saati de Ay'da yavaşlar; yayı düşey asınca yerçekimi periyodu değiştirir.",
      truth:
        "g periyot formülünde yoktur. Yayı düşey asmak denge konumunu m·g/k kadar aşağı kaydırır (sayfada Dünya'da 0.2453 m, Ay'da 0.0405 m), ama blok yeni dengenin çevresinde aynı T = 2π√(m/k) ile salınır. Sarkaç ise Ay'da yaklaşık 2.5 kat yavaşlar.",
    },
    {
      myth: "Dengeye en çabuk dönen sistem kritik sönümlü olandır.",
      truth:
        "Doğrusu şu: kritik sönüm, dengeyi hiç <em>aşmadan</em> en çabuk dönendir. Küçük bir aşmaya razıysan biraz az sönümlü sistem daha hızlıdır: sayfadaki yarışta ±%5 bandına ζ = 0.70 düzeni 0.459 s'de, kritik düzen 0.750 s'de yerleşir; ilki dengeyi %4.6 aşar. Hangisinin iyi olduğu işe göre değişir: bir kapı çarpmamalı, bir ölçü aletinin ibresi ise çabuk durulmalıdır.",
    },
    {
      myth: "Rezonans, sürücü frekansının doğal frekansa tam eşit olduğu ve genliğin en büyük olduğu tek noktadır.",
      truth:
        "Sönüm varsa iki ayrı tepe vardır. Soğurulan güç tam ω₀'da en büyüktür; genlik ise ω₀√(1 − 2ζ²)'de, yani biraz daha düşük bir frekansta. ζ = 0.05'te fark küçüktür (6.309'a karşı 6.325 rad/s), ζ = 0.200'de belirgindir (6.066 rad/s), ζ ≥ 0.707'de genlik tepesi hiç yoktur. Ayrıca genlik rezonansta sonsuza gitmez: sönüm onu Q·F₀/k ile sınırlar.",
    },
  ],
  glossary: [
    {
      term: "Hooke yasası",
      definition:
        "Esneklik sınırı içinde, esnek bir cismin uzamasının uygulanan kuvvetle doğru orantılı olduğunu söyleyen yasa; yay için F = −kx.",
    },
    {
      term: "Yay sabiti (k)",
      definition:
        "Yayın sertliği, yani metre başına uzama için gereken kuvvet; birimi N/m (= kg/s²), 20 N/m'lik yay 10 cm uzayınca 2 N ile çeker.",
    },
    {
      term: "Doğal açısal frekans (ω₀)",
      definition:
        "Sönümsüz ve sürülmeyen sistemin kendi salınım hızı, rad/s; yay–kütlede ω₀ = √(k/m) = 2π/T₀.",
    },
    {
      term: "Sönüm oranı (ζ)",
      definition:
        "Sönüm katsayısının kritik değere oranı, ζ = b/(2√(km)); 1'den küçükse sistem salınarak, 1 ve üstündeyse salınmadan dengeye döner.",
    },
    {
      term: "Logaritmik azalma (δ)",
      definition:
        "Az sönümlü salınımda ardışık iki tepenin oranının doğal logaritması; δ = γ·T<sub>d</sub>, γ = b/2m.",
    },
    {
      term: "Kalite çarpanı (Q)",
      definition:
        "Salınıcının ne kadar az kayıpla çalıştığını ölçen boyutsuz sayı, Q = √(km)/b = 1/(2ζ); rezonanstaki büyütmeyi ve güç eğrisinin darlığını (Δω = ω₀/Q) belirler.",
    },
    {
      term: "Geçici rejim ve kalıcı durum",
      definition:
        "Sürülen salınıcıda doğal salınımın e<sup>−bt/2m</sup> ile söndüğü ilk evre geçici rejimdir; sonrasında yalnızca sürücünün frekansındaki kalıcı salınım kalır.",
    },
    {
      term: "Rezonans",
      definition:
        "Sürücü frekansı doğal frekansa yaklaştığında sistemin sürücüden en çok enerji soğurması ve genliğinin büyümesi; tepeyi sönüm sınırlar.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın denklemi, m·x″ + b·x′ + k·x = F(t), Fizik I'in son haftalarında ve Diferansiyel Denklemler dersinin ilk yarısında karşına çıkar: ikinci mertebeden, doğrusal, sabit katsayılı denklemlerin örnek problemidir. Fizik II'de aynı denklem kılık değiştirir: seri <strong>RLC devresinde</strong> yük için L·q″ + R·q′ + q/C = V(t) yazılır; indüktans kütlenin, direnç sönümün, 1/C yay sabitinin yerini alır ve Q = √(L/C)/R olur. Radyonun istasyon seçmesi, sayfadaki güç eğrisinin dar tepesidir. Denklem doğrusal olduğu için kuvvetleri tek tek ele alıp yanıtları toplayabilirsin; <strong>Fourier analizi</strong> her periyodik kuvveti sinüslere ayırır, buradaki karmaşık genlik X(ω) de her birine verilecek yanıtı söyler. Mühendislikte aynı nesnenin adı <strong>transfer fonksiyonudur</strong> ve Laplace dönüşümüyle, kontrol kuramıyla, titreşim analiziyle birlikte öğretilir. Ayarlı kütle sönümleyiciler bu denklemin iki kütleli bir sürümüyle tasarlanır.",
      "Yay–kütlenin her yerde karşına çıkmasının derin bir nedeni var. Bir sistemin enerjisi kararlı bir denge noktasında en küçük değerini alıyorsa, o noktanın çok yakınında enerji eğrisi hemen her zaman ½kx² gibi bir paraboldür (Taylor açılımının ilk anlamlı terimi). Yani kararlı dengenin çevresindeki küçük salınımların çoğu harmoniktir. Birbirine yaylarla bağlı çok sayıda kütle <strong>normal modlara</strong> ayrışır; bunları bulmak lineer cebirdeki özdeğer problemidir ve zincir uzadıkça modlar dalgalara dönüşür. Sayfadaki kütleli yay bunun küçük bir örneğidir: on iki parçalı bir zincir olarak çözülür. Enerji sapmasını ölçtüğün integratörler Sayısal Analiz dersinin konusudur: yöntemin mertebesi, kararlılığı ve enerjiyi uzun vadede koruyan simplektik yöntemler. Kuantum mekaniğinde aynı salınıcının enerjisi yalnızca ħω(n + ½) basamaklarında bulunabilir; HCl'nin kızılötesi soğurması bu basamaklar arasındaki bir atlamadır.",
    ],
    topics: [
      "İkinci mertebeden doğrusal diferansiyel denklemler",
      "Sönümlü ve sürülen salınıcı",
      "RLC devreleri ve rezonans",
      "Fourier analizi ve transfer fonksiyonu",
      "Normal modlar ve özdeğerler",
      "Simplektik integratörler",
      "Kuantum harmonik salınıcı",
    ],
  },
  quiz: [
    {
      question:
        "Az sönümlü bir yay–kütle sisteminde yay ve sönümleyici aynı bırakılıp kütle dört katına çıkarılıyor. Kalite çarpanı Q ve güç eğrisinin genişliği Δω nasıl değişir?",
      options: [
        "Q iki katına çıkar, Δω dörtte birine iner",
        "Q dört katına çıkar, Δω değişmez",
        "Q yarıya iner, Δω iki katına çıkar",
        "İkisi de değişmez; yalnızca ω₀ yarıya iner",
      ],
      answer: 0,
      explanation:
        "Q = √(km)/b kütleye karekökle bağlıdır: √4 = 2 kat. Δω = b/m ise doğrudan 1/m ile gider: dörtte bir. Denetim: Δω = ω₀/Q; ω₀ yarıya iner, Q iki katına çıkar, oran dörtte bire düşer. Ağır salınıcı hem daha yavaş söner hem daha keskin seçer.",
    },
    {
      question:
        "Aynı x₀'dan bırakılan dört sistemden hangisi ±%5 bandına en erken yerleşir (m = 0.50 kg, k = 20 N/m)?",
      options: ["ζ = 0.05", "ζ = 0.70", "ζ = 1 (kritik sönüm)", "ζ = 2"],
      answer: 1,
      explanation:
        "ζ = 0.70 düzeni 0.459 s'de yerleşir; kritik sönüm 0.750 s, ζ = 2 ise 1.812 s ister, ζ = 0.05 saniyelerce salınır (9.469 s). Kritik sönümün ayrıcalığı hız değil, dengeyi hiç aşmamasıdır; ζ = 0.70 dengeyi %4.6 aşar ama bu aşma bandın içinde kalır.",
    },
    {
      question:
        "Sürülen bir salınıcıda sönüm katsayısı b yarıya indiriliyor (m, k, F₀ aynı). Tam ω₀'daki kalıcı genlik, oradaki ortalama güç ve güç eğrisinin genişliği nasıl değişir?",
      options: [
        "Genlik iki katına, güç dört katına çıkar; genişlik değişmez",
        "Genlik ve güç değişmez; genişlik yarıya iner",
        "Genlik ve güç iki katına çıkar; genişlik yarıya iner",
        "Genlik iki katına çıkar; güç ve genişlik yarıya iner",
      ],
      answer: 2,
      explanation:
        "ω₀'da A = F₀/(bω₀) ve P = F₀²/2b: ikisi de 1/b ile büyür. Güç genliğin karesiyle dört katına çıkmaz, çünkü P = ½·b·ω²·A² içindeki b de yarıya inmiştir. Genişlik Δω = b/m yarıya iner. Az sönüm, daha yüksek ve daha dar bir tepe demektir; güç eğrisinin ω eksenindeki alanı (πF₀²/4m) b'den bağımsızdır, yükseklik ile genişliğin çarpımı da bu yüzden değişmez.",
    },
  ],
  next: [
    {
      href: "sarkac.html",
      title: "Sarkaç Laboratuvarı",
      why: "Geri çağıran yerçekimi olunca tablo tersine döner: Kütle m periyodu kıpırdatmaz, Yerçekimi g menüsü değiştirir. Büyük Başlangıç açısı θ₀'da periyot genliğe de bağlanır; yayda hiç olmayan şey.",
    },
    {
      href: "alternatif-akim.html",
      title: "Alternatif Akım: RLC Devresi, Fazörler ve Rezonans",
      why: "Aynı denklemin elektrik kılığı: İndüktans L kütlenin, Direnç R sönümün, Sığa C yayın yerinde. Rezonansa git düğmesiyle akımın tepesini bul, dönen fazörlerde buradaki faz gecikmesini tanı.",
    },
    {
      href: "duran-dalgalar.html",
      title: "Duran Dalgalar: Tel, Hava Sütunu ve Harmonikler",
      why: "Tek kütlenin tek rezonansı vardı; gerilmiş telin bir dizi rezonansı var. Titreşen tel sekmesinde titreştiricinin frekansını gezdir, tel her harmonikte yeniden kabarsın.",
    },
    {
      href: "dalga-superpozisyonu.html",
      title: "Dalga Süperpozisyonu: Girişim, Vuru ve Dalga Paketleri",
      why: "Rezonans yakınında geçici rejimde gördüğün kabarıp inen genlik bir vurudur. 02 · Vuru sekmesinde yakın frekanslı iki tonu toplayıp aynı zarfı ölç ve dinle.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 1, 15.1 Simple Harmonic Motion",
      url: "https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion",
      note: "Hooke yasasından basit harmonik hareketin denklemine ve periyot formülüne, çözümlü örneklerle; hemen ardından gelen 15.2 enerjiyi işler (İngilizce, açık ders kitabı).",
    },
    {
      title: "PhET · Kütleler ve Yaylar",
      url: "https://phet.colorado.edu/tr/simulations/masses-and-springs",
      note: "Türkçe arayüzlü yay ve kütle benzetimi; aynı deneyleri başka bir araçta yineleyip bu sayfadaki sonuçlarla karşılaştırmak için.",
    },
    {
      title: "OpenStax · University Physics Vol. 1, 15.5 Damped Oscillations",
      url: "https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations",
      note: "Az sönümlü, kritik ve aşırı sönümlü üç durumun b² ile 4mk karşılaştırmasından çıkarılışı; ardından gelen 15.6 zorlanmış salınımı ve rezonansı işler (İngilizce).",
    },
    {
      title: "Wikipedia · Hooke's law",
      url: "https://en.wikipedia.org/wiki/Hooke%27s_law",
      note: "Yasanın tarihi: Hooke'un 1660 iddiası, 1676'da yayımlanan ceiiinosssttuv anagramı ve 1678'deki çözümü 'ut tensio, sic vis' (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
