window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["gezegen-savunmasi"] = {
  slug: "gezegen-savunmasi",
  title: "Gezegen Savunması: Newton'un Topuyla Yörünge",
  field: "Oyun",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Mermin yere düşer, gezegenin arkasına dolanır ya da bir daha dönmez; hangisi olacağını enerji ile açısal momentum belirler. Newton'un dağ başındaki topunu ateşle, yörüngeyi ölç, asteroidi gezegenin öbür yüzünde yakala.",
  hook:
    "Çok yüksek bir dağın tepesine bir top yerleştir ve namluyu ufka çevir. Az barutla atılan gülle dağın eteğine düşer; biraz daha hızlısı daha uzağa. Newton şunu sordu: gülle öyle hızlı gitsin ki yer, o düştükçe altından kaçsın; o zaman ne olur? Bu sayfadaki top tam o toptur ve cevabı, namlunun karşısına hiç çıkmayan bir asteroidi vurmanın tek yoludur.",
  bigIdea:
    "Yörüngedeki cisim düşmeyi bırakmış değildir; durmadan düşer ama yeri ıskalar. Merminin gezegene bağlı kalıp kalmayacağını tek bir sayı söyler: <strong>özgül enerji</strong> <em>ε = v²/2 − GM/r</em>. Eksi ise mermi bir elips çizer; elips yüzeyi kesiyorsa yere düşer, kesmiyorsa dolanır. Sıfır ya da artı ise geri dönmez.",
  story: [
    "Newton'un top düşüncesi, ölümünden bir yıl sonra, 1728'de basılan <em>A Treatise of the System of the World</em> (Latincesi <em>De mundi systemate</em>) adlı kitabın başında yer alır. Bu metin, 1687'de yayımlanan <em>Principia</em>'nın üçüncü kitabı için yazdığı daha eski ve daha sade taslaktır. Çizimde bir dağın tepesinden yatay atılan gülleler vardır: her biri öncekinden hızlıdır ve daha uzağa düşer, sonuncusu Dünya'nın çevresini dolanıp atıldığı yere geri gelir. Newton'un asıl söylediği şuydu: elmayı düşüren kuvvet ile Ay'ı yörüngede tutan kuvvet aynıdır; aradaki fark yalnızca yana doğru hızdır.",
    "Yörüngelerin biçimi ise daha önce, gözlemden çıkmıştı. Johannes Kepler, Tycho Brahe'nin Mars ölçümleriyle yıllarca uğraştıktan sonra 1609'da <em>Astronomia nova</em>'da ilk iki yasasını yayımladı: gezegenler odağında Güneş bulunan elipsler çizer ve eşit sürede eşit alan süpürür. Üçüncü yasa 1619'da <em>Harmonices Mundi</em>'de geldi: periyodun karesi, yörüngenin yarı büyük ekseninin küpüyle orantılıdır. Kepler bunların neden böyle olduğunu bilmiyordu. Newton, üçünü de uzaklığın karesiyle zayıflayan tek bir çekim kuvvetinden türetti. Top ise yaklaşık 270 yıl kâğıt üstünde bekledi: 4 Ekim 1957'de Sovyetler Birliği 58 santimetre çapında, 83.6 kilogramlık Sputnik 1'i fırlattı. Küre, yerden 215 ile 939 kilometre arasında değişen bir elipste Dünya'yı 96.2 dakikada bir dolandı. Newton'un güllesi artık bip sesi çıkarıyordu.",
    "Çekimli bir uzayda ateş etme fikri bilgisayar oyunlarının da en eskilerindendir. 1962'de MIT'de Steve Russell ve arkadaşları PDP-1 bilgisayarı için <em>Spacewar!</em>'ı yazdı; Dan Edwards oyuna, ekranın ortasında iki gemiyi de kendine çeken bir yıldız ekledi. Yıldızın çevresinde savrulup hız kazanmak da, yanlış hesapla içine düşmek de mümkündü. Yalnız bir kolaylık vardı: torpidolar çekimden etkilenmiyor, dümdüz gidiyordu. Bu sayfadaki oyun o kolaylığı geri alır. Mermiler de asteroitler de aynı GM/r² çekiminde uçar; bu yüzden nişan almak, bir doğru çizmek değil bir yörünge seçmektir.",
    "Asteroide karşı savunma da artık yalnız oyun değil. NASA'nın DART aracı 26 Eylül 2022'de, Dünya'dan yaklaşık 11 milyon kilometre uzakta, 160 metre çapındaki Dimorphos'a saatte yaklaşık 22 500 kilometre hızla bilerek çarptı. Dimorphos, 780 metrelik Didymos'un küçük uydusudur; hiçbiri Dünya için tehlike değildi, sınanan şey yöntemdi. Çarpışmadan önce uydu bir turunu 11 saat 55 dakikada atıyordu. Sonraki haftalarda teleskoplar 11 saat 23 dakika ölçtü: 32 dakikalık kısalma, artı eksi 2 dakika. Görevin başarı eşiği 73 saniyeydi. İnsanlık ilk kez bir gök cisminin yörüngesini bile isteye değiştirdi; ölçtüğü şey de senin bu sayfada ölçeceğin şeydi: bir periyot.",
  ],
  core: [
    {
      heading: "Düşerken ıskalamak: dairesel hız",
      body:
        "Yatay atılan mermi her an gezegene doğru düşer; ama aynı anda yana da gider ve gezegen küre olduğu için yer onun altından eğilerek uzaklaşır. İkisi tam dengelenirse merminin yerden yüksekliği hiç değişmez: yörünge bir çemberdir. Koşulu yazmak kolay: çemberde dönen cismin merkeze doğru ivmesi v²/r olmalıdır ve bu ivmeyi sağlayan tek şey çekimdir, GM/r². İkisini eşitlersen kütle sadeleşir, geriye <strong>dairesel hız</strong> kalır. Sayfa her atışı bu hızın katı olarak ister: kaydırıcıdaki 1.00, namludaki dairesel hızın ta kendisidir (0.953 R/τ).",
      formula: "GM/r² = v²/r  ⟹  v<sub>c</sub> = √(GM/r)",
      formulaNote: "Namlu merkezden r₀ = 1.1 R uzakta: v_c = √(1/1.1) = 0.953 R/τ. Uzaklaştıkça dairesel hız azalır; dört kat uzakta yarıya iner.",
    },
    {
      heading: "Enerji hesabı ve kaçış hızı",
      body:
        "Çekim alanında birim kütle başına iki enerji vardır: kinetik v²/2 ve potansiyel −GM/r. Potansiyel eksidir, çünkü sıfır noktası sonsuz uzaklık seçilir; gezegene yaklaştıkça bir kuyunun dibine inersin. Toplamları <strong>özgül enerji</strong> ε uçuş boyunca sabit kalır (tek kuvvet korunumlu çekimdir). ε eksiyse mermi kuyudan çıkamaz: uzaklaştıkça yavaşlar, bir yerde döner. Kuyudan çıkabilmenin en düşük bedeli ε = 0'dır; buna karşılık gelen hıza <strong>kaçış hızı</strong> denir. Dairesel hızın tam √2 katıdır ve formülde yön yoktur: enerji bir sayıdır, ok değil. Daha hızlı atılan merminin artan enerjisi sonsuzda hız olarak elinde kalır: v<sub>∞</sub> = √(2ε).",
      formula: "ε = v²/2 − GM/r,   ε = 0  ⟹  v<sub>e</sub> = √(2GM/r) = √2·v<sub>c</sub>",
      formulaNote: "Namluda v_e = 1.348 R/τ = 1.4142 v_c. Kaydırıcı 0.01'lik adımlarla gittiği için eşik 1.41 ile 1.42'nin arasında kalır.",
    },
    {
      heading: "Vis-viva: hızdan yörüngenin boyuna",
      body:
        "Bağlı bir yörünge elipstir; elipsin uzun ekseninin yarısına <strong>yarı büyük eksen</strong> (a) denir. Yörüngenin gezegene en yakın noktası <strong>yerberi</strong>, en uzak noktası <strong>yeröte</strong>dir; bu iki noktada hız yarıçapa diktir. Oralarda hem enerjiyi hem <strong>özgül açısal momentumu</strong> (h = r·v) yazıp v'yi yok edersen şaşırtıcı bir sonuç çıkar: enerji yalnızca a'ya bağlıdır, ε = −GM/(2a). Bunu enerji tanımına geri koymak <strong>vis-viva denklemini</strong> verir (ad, Leibniz'in mv² için kullandığı 'canlı kuvvet' teriminden kalmadır). Denklem, sayfadaki inceliği de açıklar. Yatay atışta namlu yörüngenin bir ucudur; x = (v/v_c)² dersen öteki uç r₀·x/(2 − x) uzaklığındadır. Bu uç yüzeyin (R) üstünde kalsın dersen x > 2R/(r₀ + R) bulursun: v > 0.976 v_c. Yani dairesel hızın biraz altındaki atış düşmez, çünkü namlu yerden 0.1 R yüksektedir ve mermi alçalacak yer bulur.",
      formula: "v² = GM·(2/r − 1/a),   a = −GM/(2ε)",
      formulaNote: "1.20 v_c için x = 1.44: a = 1.1/(2 − 1.44) = 1.964 R, yeröte 1.1·1.44/0.56 = 2.829 R. Sayfa da bunu yazar.",
    },
    {
      heading: "Kepler'in üçüncü yasası: enerji boyu, açısal momentum biçimi belirler",
      body:
        "Merkeze yönelen bir kuvvet açısal momentumu değiştiremez; bu yüzden merkezden mermiye çizilen doğru eşit sürede eşit alan süpürür, saniyede h/2 kadar. Bir tam turda süpürülen alan elipsin alanıdır: πab. Demek ki T = 2πab/h. Elipsin geometrisi b = a√(1 − e²), dinamiği h² = GM·a·(1 − e²) verir; yerine koyunca dış merkezlik e sadeleşir ve periyot yalnızca a'ya bağlı kalır. Sonuç tuhaftır: aynı enerjili ince uzun bir elips ile tombul bir elips aynı sürede dolanılır. Sayfada dene: 1.20 v_c'yi 90° yerine 60° ile at. ε, a ve kuram periyodu aynı kalır (−0.2545 GM/R, 1.964 R, 17.298 τ); ama açısal momentum azaldığı için elips incelir, yerberi 0.729 R'ye iner ve mermi yere çarpar. Enerji yörüngenin boyunu, açısal momentum biçimini seçer.",
      formula: "T = 2π√(a³/GM)   ⟺   T²/a³ = 4π²/GM",
      formulaNote: "Sayfanın birimlerinde GM = 1 olduğundan T²/a³ = 4π² ≈ 39.478; ölçtüğün her yörüngede bu oran çıkmalı.",
    },
    {
      heading: "Bilgisayar yörüngeyi nasıl kapalı tutuyor?",
      body:
        "Sayfa mermiyi Δt = 0.005 τ'luk adımlarla ilerletir. En akla yakın yöntem açık Euler'dir: eldeki hızla konumu, eldeki ivmeyle hızı güncelle. Kepler probleminde bu yöntemin her adımda enerjide yaptığı küçük hata hep aynı yönde birikir. Bu defter için aynı adımla ayrıca hesapladık (sayfada böyle bir düğme yok, bu sayıları orada göremezsin): 1.20 v_c atışında yarı büyük eksen, bir tur süresi (17.3 τ) dolduğunda 1.964 R'den 2.03 R'ye, on tur süresi dolduğunda 2.63 R'ye şişer; yörünge kapanmaz, sarmal açılır. Sayfa bunun yerine <strong>hız Verlet</strong> adımını kullanır: yarım adım hız, tam adım konum, yeni ivme, yarım adım hız. Bu şema <strong>simplektiktir</strong>, yani gerçek hareketin faz uzayındaki alanı koruma özelliğini taşır; sonuçta gerçeğine çok yakın, 'gölge' bir enerjiyi çok uzun süreler boyunca korur. Hata bu yüzden birikmez, bir tur boyunca salınıp başa döner: 'En büyük enerji sapması' kutusu 1.20 v_c için 1.48 × 10⁻⁶'da kalır, kaç tur atarsan at. Güzel bir ayrıntı daha: merkezî kuvvette hız Verlet açısal momentumu yuvarlama hatasına kadar tam korur, çünkü hız itmesi hep yarıçap doğrultusundadır.",
      formula: "v ← v + ½Δt·a(x);   x ← x + Δt·v;   v ← v + ½Δt·a(x)",
      formulaNote: "İkinci mertebe: Δt yarıya inince hata dörtte bire iner. Bedeli küçük bir faz hatasıdır; enerji değil, merminin yörünge üzerindeki yeri azıcık kayar.",
    },
  ],
  lab: {
    intro:
      "İlk üç deney için <strong>Deney modu</strong> kutusunu işaretle: asteroit gelmez, aylar soluklaşıp engel olmaktan çıkar, skor yazılmaz. <strong>Hazır atışlar</strong> düğmeleri (Düşüş 0.80, Daire 1.00, Elips 1.20, Kaçış 1.42) yalnızca hızı ve 90°'lik yatay açıyı ayarlar; mermiyi <strong>Ateş</strong> yollar. Ateş etmeden önce <strong>Namluda</strong> paneli o ayarın sonucunu ve yerberisini söyler; ateşten sonra <strong>Son mermi</strong> paneli ε'yi, a'yı, yerberi/yeröteyi, kuram periyodunu ve ilk tam turdan sonra <strong>Ölçülen periyot</strong>u, yüzde <strong>Fark</strong>ı ve <strong>Ölçülen T² / a³</strong> oranını gösterir. Ölçüm, merminin süpürdüğü açının 360°'yi geçtiği andır. Ekranda 1 τ bir saniyedir; uzun yörüngelerde <strong>Simülasyon hızı</strong>nı 4× ya da 8× yap. <strong>Sıfırla</strong> hızı 1.00'e, açıyı 90°'ye döndürür. Klavye kısayolları (<kbd>Enter</kbd> ateş, <kbd>Space</kbd> duraklat, <kbd>R</kbd> sıfırla) bir kaydırıcıya ya da düğmeye dokunduktan sonra da çalışır. Açıyı kaydırıcıyla, hazır atışla ya da klavyeyle verdiysen, alanın üstünde gezen fare onu bozmaz; fare ancak alana tıkladığında nişanı devralır ve o tıklama ateş de eder.",
    experiments: [
      {
        title: "Newton'un topu: düşmek nerede biter?",
        predict: "Yatay atışta mermi hangi hızda yere düşmeyi bırakır? Tam 1.00 v_c'de mi, biraz altında mı, biraz üstünde mi?",
        do: "Deney modunda <strong>Düşüş 0.80</strong>'e bas ve ateş et. Sonra <strong>Atış hızı v</strong> kaydırıcısını 0.97'ye, ardından 0.98'e getirip birer atış yap; en son <strong>Daire 1.00</strong> ile ateş et.",
        observe: "0.80: sınıf 'düşer', yerberi / yeröte 0.518 R / 1.100 R, alt satırda 'Gezegene düştü: uçuş süresi 0.82 τ, 0 tam tur.' 0.97: yerberi 0.977 R, mermi 2.43 τ sonra yere değer. 0.98: yerberi 1.016 R, sınıf 'eliptik yörünge'; mermi gezegenin arkasında yüzeyi sıyırıp namluya döner, kuram ve ölçülen periyot 6.839 τ. 1.00: 'eliptik yörünge (daire, e ≈ 0)', a = 1.100 R, periyot 7.249 τ, fark 0.00 %.",
        explain: "Namlu yüzeyde değil, 0.1 R yukarıdadır. Dairesel hızın altındaki mermi alçalan bir elipse girer; namlu o elipsin yerötesi olur, yerberi gezegenin öbür yanındadır. Yerberi R'nin üstünde kaldıkça mermi dolanır. Eşik √(2R/(r₀ + R)) = √(2/2.1) = 0.976 v_c'dir; 0.97 ile 0.98 tam iki yanına düşer. Newton'un dağı da bu yüzden yüksekti.",
      },
      {
        title: "Kepler'in üçüncü yasasını kendi ölçümünle sına",
        predict: "Hızı 1.00'den 1.20 v_c'ye, yani yalnızca yüzde 20 artırırsan bir turun süresi kaç katına çıkar? Daha hızlı mermi turu daha çabuk mu atar?",
        do: "<strong>Daire 1.00</strong> ile ateş et, bir tur bekle; a'yı ve ölçülen periyodu yaz. <strong>Elips 1.20</strong> ile aynısını yap (hızı 2× ya da 4× seç). İstersen kaydırıcıyla 1.10 ve 1.30'u ekle; 1.30'da yeröte 5.997 R ile ekranın dışına taşar, 8× hız iyi gelir. Her atışta <strong>Ölçülen T² / a³</strong> kutusunu da yaz; istersen a ile T'den kendin hesaplayıp karşılaştır.",
        observe: "1.00: a = 1.100 R, T = 7.249 τ. 1.10: 1.392 R, 10.324 τ. 1.20: 1.964 R, yeröte 2.829 R, 17.298 τ. 1.30: 3.548 R, kuram 41.998 τ, ölçülen 41.999 τ. Fark kutusu hepsinde 0.00 %; enerji sapması 1.20'de 1.48 × 10⁻⁶. Ölçülen T² / a³ ilk üç atışta 39.479, 1.30'da 39.480 τ²/R³ çıkar; kuram değeri 39.478'dir. Ekrandaki üç ondalıklı a ve T ile elle hesaplarsan 39.48 ile 39.52 arasında bulursun; fark yuvarlamadandır. Mermi her turda tam namlunun ucundan geçer.",
        explain: "Yüzde 20 fazla hız periyodu 2.39 katına çıkardı: hızlı atılan mermi daha çabuk dolanmaz, daha büyük bir elipse çıkar ve yolun çoğunu yerötenin yakınında, yavaşlamış hâlde geçirir. T²/a³ = 4π²/GM = 39.478 sabiti, ince elipste de dairede de aynıdır. Ölçümün kuramı binde birin de altında, son basamakta aşması hız Verlet'nin küçük faz gecikmesidir: mermi turu aşağı yukarı yüz binde bir oranında geç tamamlar. Namluya dönüş ise kapalı yörüngenin imzasıdır: atış noktası elipsin yerberisidir.",
      },
      {
        title: "Kaçış eşiği ve yönün önemsizliği",
        predict: "1.41 ile 1.42 v_c arasında yüzde birden az fark var. İkisinin sonu ne kadar farklı olur? Namluyu dik yukarı çevirmek kaçmayı kolaylaştırır mı?",
        do: "<strong>Kaçış 1.42</strong> ile ateş et ve merminin ekrandan çıkışını izle. Hızı 1.41'e indirip yeniden at. Sonra <strong>Nişan açısı</strong>nı 0° yapıp 1.42'yi bir de dik yukarı dene.",
        observe: "1.42: ε = 0.0075 GM/R, sınıf 'kaçar', a = −67.073 R (hiperbol), yerberi / yeröte 1.100 R / ∞, kuram 'tanımsız (ε ≥ 0)', ölçülen 'periyot yok'; Namluda paneli v<sub>∞</sub> = 0.122 R/τ yazar ve mermi 16.73 τ sonra 10 R'yi geçip silinir. 1.41: ε = −0.0054 GM/R, 'eliptik yörünge', a = 92.437 R, yeröte 183.774 R, kuram 5584.039 τ, ölçülen 'ölçülemez: T mermi ömründen uzun'. Dik atışta 1.42 yine kaçar (14.05 τ). Dik atışta 1.41 ise 'düşer' sınıfındadır; Namluda paneli dönüşün 5583 τ süreceğini, 600 τ'luk mermi ömrüne sığmayacağını yazar.",
        explain: "Eşik √2 = 1.4142'dir ve iki kaydırıcı adımının arasına düşer. ε'nin işareti değişince sonuç nitelikçe değişir: biri 184 R uzaktan da olsa geri gelecek bir elips, öbürü dönüşü olmayan bir hiperbol. Yön fark etmez, çünkü ε'de yalnızca hızın karesi vardır. Dik atışın kaçış süresi kısadır, o kadar. 1.41'in dönüşünü göremezsin: tur 5584 τ sürer, deney modu mermiyi 600 τ'da siler.",
      },
      {
        title: "Oyunda: asteroide sırtını dönerek ateş et",
        predict: "Asteroit sağ üstten gelip gezegenin sağ yanına inecek. Namluyu ters yöne, sola çevirip ateş edersen mermi onu vurabilir mi?",
        do: "Deney modunu kapat ve sayfayı adresin sonuna <code>?seed=7</code> ekleyerek aç; bu tohumla 1. dalganın dört asteroidi her seferinde aynı gelir. Oyunu başlatmadan önce <strong>Nişan açısı</strong> kaydırıcısını en sola, −90°'ye çek ve <strong>Hız +</strong> düğmesine bir kez bas: hız 1.05 v_c olur. Sonra <strong>Başlat</strong>'a bas ve ilk üç asteroide ateş etme. Sol üstteki sayaç <strong>t = 19 τ</strong>'yu gösterince <kbd>Enter</kbd> ile ateşle; 18.7 ile 19.7 arasındaki her an tutar. Acele etmek istemezsen 19'da <kbd>Space</kbd> ile duraklat, kesikli öngörü çizgisine bak, <kbd>Space</kbd> ile devam edip hemen <kbd>Enter</kbd>'a bas. Bu arada alana tıklama: tıklarsan top fareye döner ve ateş eder.",
        observe: "İlk üç asteroit yere iner, kalkan 5'ten 2'ye düşer; oyun sürer. Dördüncü asteroit t = 16.5'te sağ üstte belirir. Öngörü çizgisi sola çıkıp gezegenin altından dolanan kapalı bir elipstir; t = 18.7'de kırmızıya döner ve gezegenin sağ yanında bir nişangâhla biter, 19.7'den sonra nişangâh kaybolur. Ateşten yaklaşık 7 τ sonra, t ≈ 26'da, asteroit yere değmek üzereyken mermi ona sağ yanda çarpar; ekranda '+20 (yörünge ×2)' belirir, skor 20 olur. Mermi o ana dek gezegenin çevresinde yaklaşık 290° süpürmüştür. Aynı anda +90° ile atılan mermi hiçbir şeye değmeden dolanır.",
        explain: "Top yalnızca üst yarıya nişan alabilir ve düz bir atış gezegenin içinden geçemez; öbür yüze ulaşmanın yolu mermiyi yörüngeye sokmaktır. 1.05 v_c'lik mermi merkezden 1.10 ile 1.35 R arasında, turu 8.5 τ süren alçak bir elipste döner; atış anını seçmek, merminin ve asteroidin aynı yere aynı anda varmasını ayarlamaktır. Oyun 180°'den fazla dolanan isabete iki, 360°'yi geçene üç kat puan verir. 2. dalgadan sonra asteroitler her yönden gelir; öngörü çizgisi o zaman lüks değil, nişangâhın kendisidir.",
      },
    ],
  },
  wow: [
    {
      title: "Newton'un çizimi Güneş'ten kaçtı",
      body:
        "1977'de fırlatılan iki Voyager sondasının taşıdığı Altın Plak'taki görüntülerden biri, <em>De mundi systemate</em>'nin top çizimini içeren sayfasıdır. Sondalar Güneş'in kaçış hızını aşmış durumda; yani dağ başından atılan güllelerin resmi, kendisi de geri dönmeyecek bir hiperbol üzerinde yıldızlararası uzaya gidiyor.",
    },
    {
      title: "Frene basınca tur kısalır",
      body:
        "DART, Dimorphos'a yörünge hareketinin karşısından, neredeyse kafa kafaya çarptı ve uyduyu yavaşlattı. Yavaşlayan uydu daha küçük bir yörüngeye indi, turu 11 saat 55 dakikadan 11 saat 23 dakikaya kısaldı. Ölçülen 32 dakikalık değişim, 73 saniyelik başarı eşiğinin 25 katından fazlaydı. Aynı şeyi sayfada görürsün: 1.00 v_c'de periyot 7.249 τ, 0.98 v_c'de 6.839 τ.",
    },
    {
      title: "84 dakika yalnızca yoğunluğa bakar",
      body:
        "Yüzeyi sıyıran dairesel yörüngenin periyodu T = 2π√(R³/GM)'dir. Kütleyi yoğunlukla yazarsan yarıçap sadeleşir: T = √(3π/(Gρ)). Dünya'nın ortalama yoğunluğu (5514 kg/m³) için bu 84.3 dakikadır. Aynı yoğunlukta bir çakıl taşının da, dev bir gezegenin de yüzeyine teğet turu 84 dakika sürerdi. Sayfanın zaman birimi τ, işte bu sürenin 2π'de biridir.",
    },
  ],
  worked: {
    title: "Ölçekli birimleri Dünya'ya çevir",
    prompt:
      "Sayfa GM = R = 1 alır. Gezegeni Dünya say: R = 6371 km, GM = 3.986 × 10¹⁴ m³/s². Zaman ve hız birimlerini bul; namludaki dairesel hızı, kaçış hızını ve periyodu km/s ve dakika olarak yaz. Elips 1.20 atışının yerötesini ve periyodunu çevir, sonucu Sputnik 1 ile karşılaştır.",
    steps: [
      "Zaman birimi: τ = √(R³/GM) = √((6.371 × 10⁶ m)³ / 3.986 × 10¹⁴ m³/s²) = √(6.488 × 10⁵ s²) ≈ 805.5 s, yani 13.4 dakika. Hız birimi: R/τ = 6371 km / 805.5 s ≈ 7.91 km/s. Bu, yüzeydeki dairesel hızdır (√(GM/R)); yüzeyi sıyıran turun süresi 2π·τ ≈ 5061 s ≈ 84.3 dakika olur.",
      "Namlu r₀ = 1.1 R = 7008 km'dedir, yani yerden 637 km yukarıda. Dairesel hız v_c = 0.953 R/τ ≈ 7.54 km/s; kaçış hızı v_e = 1.348 R/τ ≈ 10.67 km/s (yüzeyden kaçış: √2 × 7.91 ≈ 11.19 km/s). Dairesel periyot 7.249 τ ≈ 5839 s ≈ 97.3 dakika.",
      "Elips 1.20: v = 1.144 R/τ ≈ 9.05 km/s. Vis-viva ile 1/a = 2/r₀ − v²/GM = (2 − 1.44)/1.1 R, a = 1.964 R ≈ 12 510 km. Yeröte 2a − r₀ = 2.829 R ≈ 18 020 km; yerden yaklaşık 11 650 km yüksekte. Periyot T = 2π√(a³/GM) = 17.298 τ ≈ 13 930 s ≈ 3 saat 52 dakika.",
      "Sputnik 1 ile sına: yerberi 215 km, yeröte 939 km yükseklikte. a = 6371 km + (215 + 939)/2 km = 6948 km = 1.0906 R. T = 2π·(1.0906)<sup>3/2</sup> τ = 7.156 τ ≈ 5764 s ≈ 96.1 dakika. Kayıtlardaki değer 96.2 dakika.",
      "Ekranda 1 τ bir saniyede aktığı için oyun, Dünya ölçeğinde gerçeğin yaklaşık 800 katı hızla oynar: 97 dakikalık tur 7.2 saniyede biter.",
    ],
    result:
      "Dünya ölçeğinde 1 τ ≈ 805.5 s ve 1 R/τ ≈ 7.91 km/s. Sayfadaki namlu 637 km yükseklikte bir fırlatma noktasıdır: dairesel hız 7.54 km/s, periyot 97.3 dakika, kaçış hızı 10.67 km/s. Aynı formül Sputnik'in 96.2 dakikalık turunu 0.1 dakika farkla verir.",
  },
  misconceptions: [
    {
      myth: "Yörüngede yerçekimi yoktur; mermi o yüzden düşmez.",
      truth:
        "Namlunun bulunduğu 1.1 R uzaklıkta çekim ivmesi yüzeydekinin 1/1.1² ≈ yüzde 83'üdür. Mermi durmadan düşer; yalnızca yana doğru o kadar hızlıdır ki yeri ıskalar. Hızı 0.80'e indirince aynı çekimin onu 0.82 τ'da yere indirdiğini görürsün.",
    },
    {
      myth: "Dairesel hızın altındaki her atış yere düşer.",
      truth:
        "Bu, yalnızca yüzeyden yapılan atış için doğrudur. Namlu 0.1 R yüksekte olduğu için yatay atış 0.976 v_c'ye kadar yörüngede kalır: 0.98 v_c'lik merminin yerberisi 1.016 R'dir. Dairesel hız yörüngeye girmenin alt sınırı değil, yörüngenin tam çember olma koşuludur.",
    },
    {
      myth: "Daha hızlı atılan mermi turu daha çabuk tamamlar.",
      truth:
        "Tersine: fazladan hız mermiyi daha büyük bir elipse çıkarır ve periyot a<sup>3/2</sup> ile uzar. 1.00 v_c'de tur 7.249 τ, 1.20'de 17.298 τ, 1.30'da 41.998 τ sürer. Yörüngede öndekine yetişmek isteyen uzay aracı bu yüzden önce yavaşlar.",
    },
    {
      myth: "Kaçmak için namluyu yukarı çevirmek gerekir.",
      truth:
        "Kaçış koşulu ε ≥ 0'dır ve ε'de yön yoktur. 1.42 v_c yatay atışta da dik atışta da kaçar. Yön yalnızca bağlı yörüngelerin kaderini değiştirir: 1.20 v_c 80°'de dolanır (yerberi 1.047 R), 75°'de aynı enerjiyle yere çarpar (yerberi 0.987 R).",
    },
  ],
  glossary: [
    { term: "Dairesel hız (v_c)", definition: "Belirli bir uzaklıkta çember yörüngede kalmak için gereken yatay hız, √(GM/r); namluda 0.953 R/τ." },
    { term: "Kaçış hızı (v_e)", definition: "Özgül enerjiyi sıfır yapan, yönden bağımsız hız, √(2GM/r) = √2·v_c; namluda 1.348 R/τ." },
    { term: "Özgül enerji (ε)", definition: "Birim kütle başına toplam mekanik enerji, v²/2 − GM/r; işareti yörüngenin bağlı mı kaçan mı olduğunu söyler." },
    { term: "Özgül açısal momentum (h)", definition: "Birim kütle başına açısal momentum; merkezî kuvvette sabittir ve yörüngenin ne kadar basık olacağını belirler." },
    { term: "Yarı büyük eksen (a)", definition: "Elipsin uzun ekseninin yarısı; yerberi ile yerötenin ortalamasıdır ve a = −GM/(2ε) ile enerjiye bağlıdır." },
    { term: "Yerberi ve yeröte", definition: "Yörüngenin çekim merkezine en yakın ve en uzak noktaları; sayfa ikisini de merkezden ölçer, yüzeyden değil." },
    { term: "Vis-viva denklemi", definition: "Yörüngenin herhangi bir noktasındaki hızı uzaklığa ve yarı büyük eksene bağlayan enerji bağıntısı: v² = GM(2/r − 1/a)." },
    { term: "Simplektik bütünleyici", definition: "Hareket denklemlerinin faz uzayı alanını koruma özelliğini adım adım taşıyan sayısal yöntem; enerji hatası birikmez, sınırlı kalır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki her şey <strong>Fizik I</strong>'in kütleçekim bölümünde başlar ve <strong>Klasik Mekanik</strong> dersinde tek bir denkleme iner: r'' = −GM·r/r³. Merkezî kuvvet açısal momentumu korur; bu sayede iki boyutlu problem, 'etkin potansiyel' denen h²/(2r²) − GM/r eğrisinde tek boyutlu bir harekete dönüşür ve yerberi ile yeröte o eğrinin dönüş noktaları olur. Çözümün her zaman bir konik kesit olduğu, yani ε'nin işaretine göre elips, parabol ya da hiperbol çıktığı orada gösterilir. Aynı araçlarla yörünge mekaniği kurulur: iki dairesel yörünge arasında en az yakıtla geçişi sağlayan Hohmann aktarması, bu sayfadaki 1.20 v_c elipsinin namludan yeröteye uzanan yarısıdır.",
      "Modelin sınırları da derslerin konusudur. Sayfada gezegen bir nokta kütledir, hava yoktur, gezegen dönmez ve aylar çekim uygulamaz; yalnızca engeldirler. Gerçek bir ayın çekimini eklediğin an problem <strong>üç cisim problemine</strong> dönüşür: kapalı formüller biter, kaos başlar ve Lagrange noktaları ortaya çıkar. Hesap tarafı <strong>Sayısal Analiz</strong>'e açılır: simplektik yöntemlerin enerjiyi neden sınırlı tuttuğu, Güneş Sistemi'nin milyarlarca yıllık benzetimlerinin neden bu aileyle yapıldığı orada anlaşılır. Sayfanın kendi içinde de bir sayısal ödünleşim var: kesikli öngörü çizgisi oyunun dört katı iri adımla (0.02 τ) hesaplanır, bu yüzden kıl payı isabetlerde öngörü ile sonuç ayrışabilir.",
    ],
    topics: ["Merkezî kuvvet ve etkin potansiyel", "Kepler problemi ve konik kesitler", "Hohmann aktarması ve Δv bütçesi", "Üç cisim problemi ve Lagrange noktaları", "Simplektik bütünleyiciler", "Hamilton mekaniği ve faz uzayı"],
  },
  quiz: [
    {
      question: "Namlu merkezden dört kat uzağa taşınsaydı, oradaki dairesel hız ve dairesel yörüngenin periyodu nasıl değişirdi?",
      options: ["Hız dörtte bire iner, periyot dört katına çıkar", "Hız yarıya iner, periyot sekiz katına çıkar", "Hız yarıya iner, periyot iki katına çıkar", "Hız değişmez, periyot dört katına çıkar"],
      answer: 1,
      explanation: "v_c = √(GM/r) olduğundan dört kat uzaklık hızı √4 = 2'ye böler. Periyot T = 2π√(r³/GM) ile gider: 4<sup>3/2</sup> = 8 kat. Yol dört kat uzamış, hız yarıya inmiştir; 4 × 2 = 8 de aynı sonucu verir.",
    },
    {
      question: "1.20 v_c hızındaki mermiyi bir kez 90° (yatay), bir kez 60° ile atıyorsun. Hangisi iki atışta aynıdır?",
      options: ["Yerberi uzaklığı", "Yörüngenin dış merkezliği", "Yarı büyük eksen ve kuram periyodu", "Merminin yere düşüp düşmeyeceği"],
      answer: 2,
      explanation: "Hızın büyüklüğü ve atış noktası aynı olduğundan ε aynıdır; a = −GM/(2ε) = 1.964 R ve T = 17.298 τ de aynı kalır. Açı, açısal momentumu değiştirir: 60°'de elips incelir, yerberi 0.729 R'ye iner ve mermi düşer.",
    },
    {
      question: "1.60 v_c ile atılan mermi gezegenden çok uzaklaştığında hızı ne olur?",
      options: ["1.60 v_c; uzayda hız kaybolmaz", "0.19 v_c; çünkü 1.60 − 1.41 = 0.19", "Yaklaşık 0.75 v_c", "Sıfıra iner ve mermi geri döner"],
      answer: 2,
      explanation: "Hızlar değil enerjiler çıkarılır: v<sub>∞</sub>² = v² − v_e² = (1.60² − 2)·v_c² = 0.56·v_c², yani v<sub>∞</sub> ≈ 0.75 v_c. Sayfa bunu 0.714 R/τ olarak yazar (0.748 × 0.953). Kaçış hızını yalnızca yüzde 13 aşan mermi, sonsuza dairesel hızın dörtte üçüyle varır.",
    },
  ],
  next: [
    { href: "kepler-yasalari.html", title: "Kepler Yasaları", why: "Burada ölçtüğün T²/a³ sabitini ve eşit alan yasasını Güneş'in çevresindeki gezegenlerde gör." },
    { href: "konik-kesitler.html", title: "Konik Kesitler", why: "Düşen, dolanan ve kaçan mermilerin çizdiği elips, parabol ve hiperbolün geometrisi." },
    { href: "dairesel-hareket.html", title: "Dairesel Hareket", why: "Dairesel hızın türetildiği v²/r merkezcil ivmesinin nereden geldiğine bak." },
    { href: "asteroids.html", title: "Asteroids", why: "Çekimin hiç olmadığı bir asteroit avı: orada lazer dümdüz gider; nişan almak yörünge seçmek değil, doğru çizmektir." },
  ],
  sources: [
    { title: "OpenStax · University Physics Vol. 1, 13.4 Satellite Orbits and Energy", url: "https://openstax.org/books/university-physics-volume-1/pages/13-4-satellite-orbits-and-energy", note: "Dairesel hız, yörünge enerjisi ve periyot; komşu bölümlerde kaçış hızı ve Kepler yasaları (İngilizce, açık ders kitabı)." },
    { title: "Feynman Lectures on Physics · Cilt I, Bölüm 9: Newton's Laws of Dynamics", url: "https://www.feynmanlectures.caltech.edu/I_09.html", note: "Feynman bir gezegen yörüngesini elle, yarım adım kaydırılmış hızlarla adım adım hesaplar; sayfadaki bütünleyicinin akrabası (İngilizce)." },
    { title: "NASA · DART Mission Impact Changed Asteroid's Motion in Space", url: "https://www.nasa.gov/news-release/nasa-confirms-dart-mission-impact-changed-asteroids-motion-in-space/", note: "11 Ekim 2022 tarihli duyuru: 11 saat 55 dakikadan 11 saat 23 dakikaya, ±2 dakika; 73 saniyelik başarı eşiği (İngilizce)." },
    { title: "Wikipedia · Newton's cannonball", url: "https://en.wikipedia.org/wiki/Newton%27s_cannonball", note: "Düşünce deneyinin 1728 tarihli kaynağı, özgün çizim ve Voyager Altın Plağı'ndaki yeri (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
