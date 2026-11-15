window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["elektronik-devre"] = {
  slug: "elektronik-devre",
  title: "Geçici Rejim: Kondansatör Neden Bir Anda Dolmaz?",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Anahtar çevrildiği an devre yeni dengesine sıçrayamaz; τ ölçeğinde üstel olarak ya da salınarak varır. Leyden şişesinden defibrilatöre, 555 zamanlayıcısından osiloskoba aynı birkaç denklem.",
  hook:
    "Yüz mikrofaradlık boş bir kondansatörü 10 voltluk bir pille doldur: pil 10 milijul verir, kondansatörde yalnızca 5 milijul kalır. Direnci on kat büyüt ya da on kat küçült; dolum on kat yavaşlar ya da hızlanır, ama kayıp hep tam yarıdır. Eksik yarı nereye gidiyor ve neden direnç ne olursa olsun tam yarı?",
  bigIdea:
    "Kondansatörün gerilimi ve bobinin akımı sıçrayamadığı için her anahtarlama bir <strong>geçici rejim</strong> doğurur: birinci mertebe devre yeni dengesine tek bir zaman sabitiyle (<em>τ = RC</em> ya da <em>τ = L/R</em>) üstel olarak varır, ikinci mertebe RLC ise sönüm oranı <em>ζ</em>'ya göre salınarak ya da salınmadan yerleşir.",
  story: [
    "1745 sonbaharında Pomeranya'daki Cammin katedralinin dekanı Ewald Georg von Kleist, içinde alkol bulunan ve mantarına bir çivi saplanmış küçük bir ilaç şişesini sürtünmeli bir elektrik makinesinden doldurmaya çalıştı. Kayıtlara göre 11 Ekim'de şişe elindeyken çiviye dokundu ve sert bir çarpılma yaşadı. Birkaç ay sonra Leiden'de Pieter van Musschenbroek ile Andreas Cunaeus su dolu bir camla aynı şeyi buldu; Musschenbroek deneyi 20 Ocak 1746 tarihli bir mektupla Paris Akademisi'ndeki muhabiri Réaumur'a bildirdi. Raporu okuyup deneyi doğrulayan Abbé Nollet aygıta 'Leyden şişesi' adını verdi ve aynı yıl Kral XV. Louis'nin önünde şişeyi zincir oluşturan 180 kraliyet muhafızının üzerinden boşalttı. Ardından yaklaşık iki yüz keşişi, aralarına demir teller gererek 1.6 kilometre çevreli bir halka hâlinde dizdi: anlatılana göre hepsi aşağı yukarı aynı anda sıçradı, yani elektrik halkayı göz açıp kapayıncaya kadar dolaşıyordu. Bu cam şişe ilk <strong>kondansatördü</strong>: yükü biriktirip saklıyor, sonra tek bir kıvılcımla boşaltıyordu. O kıvılcımın içinde ne olduğu, akımın tek yönde mi aktığı, ne kadar sürdüğü seksen yıl boyunca kimsenin ölçemediği bir soru olarak kaldı.",
    "İlk ipucu dolaylı geldi. 1826'da Fransız Félix Savary bir Leyden şişesini, demir bir iğnenin çevresine sarılmış bir telden boşalttı. İğne kimi zaman bir yönde, kimi zaman ters yönde mıknatıslanıyordu. Savary bundan boşalmanın tek bir darbe değil, yön değiştirerek sönen bir salınım olduğunu çıkardı: iğne her ters akımda yeniden mıknatıslanıyor, akım zayıflayınca son hangi yöndeyse öyle kalıyordu. Amerikalı Joseph Henry 1842'de deneyi yineledi ve görünüşe göre Savary'den habersiz aynı sonuca vardı. Matematiği 1853'te William Thomson, sonraki adıyla Lord Kelvin, <em>On Transient Electric Currents</em> (Geçici elektrik akımları üzerine) adlı makalesinde yazdı: şişenin sığası ile boşalma yolunun indüktansı ve direnci, bugün seri RLC dediğimiz ikinci mertebe denklemi kurar. Thomson kritik bir oran buldu: bugünkü gösterimle direnç 2√(L/C)'den küçükse boşalma ileri geri salınarak, büyükse yön değiştirmeden söner. Salınımın frekansını da türetti. Sayfanın RLC sekmesindeki R<sub>kritik</sub> kartı bu sınırdır.",
    "Salınımı gözle görmek için zamanı yaymak gerekiyordu. Genç Alman fizikçi Berend Wilhelm Feddersen, Leyden şişesi kıvılcımının görüntüsünü hızla dönen bir aynadan fotoğraf plakasına düşürdü: ayna döndükçe kıvılcımın art arda gelen anları plakada yan yana dizildi ve tek bir kıvılcım, sıralı parlak çizgilere ayrıldı. 1859'da boşalmanın gerçekten salındığını gösterdi ve fotoğraflarını Thomson'a gönderdi; Thomson onları büyük bir sevinçle Glasgow Felsefe Derneği'nde anlattı. 1862'deki makalesinde Feddersen salınımın süresini de ölçtü: 16 şişelik bataryada 2.22 µs, 4 şişelikte 1.10 µs. Dört kat sığa, iki kat süre: Thomson'ın formülündeki √C tam olarak buydu. 1887'de Heinrich Hertz aynı tür kıvılcımlı LC devreleriyle elektromanyetik dalgaları üretip yakaladı ve 1890'ların ilk telsiz vericileri de kıvılcımlı LC devreleri oldu. Bugün aynı geçici rejim her yerde: fotoğraf makinesinin flaşı kondansatörünü birkaç saniyede doldurur, saniyenin küçük bir kesrinde boşaltır; bir düğmenin metal kontakları kapanırken bir süre sıçrar ve küçük bir RC süzgeci bu titreşimi yutar; hızlı sayısal sinyallerin dolaştığı her hat, keskin kenarlarda küçük bir RLC devresi gibi çınlayabilir.",
  ],
  core: [
    {
      heading: "Sıçrayamayan iki büyüklük",
      body:
        "Kondansatörün akımı, geriliminin değişim hızıyla orantılıdır: i = C·dV<sub>C</sub>/dt. Gerilim sıfır sürede değişseydi akım sonsuz olurdu; üstelik kondansatörün enerjisi ½CV<sub>C</sub>² sıfır sürede değişir, yani sonsuz güç gerekirdi. Bu yüzden anahtar çevrildiği an V<sub>C</sub> bir an önceki değeriyle başlar. Sıçrayan şey akımdır: boş bir kondansatör ilk anda kısa devre gibi davranır, pilin bütün gerilimi direncin üstüne düşer ve akım hemen E/R'ye çıkar. Sayfa varsayılan ayarda I(0⁺) = 1.000 mA ölçer. Bobinde roller değişir: v<sub>L</sub> = L·di/dt olduğu için sıçrayamayan akımdır ve bobin ilk anda açık devre gibi davranır. Bobinden akım geçen bir devreyi aniden kesersen bobin, akımı sürdürmek için gereken gerilimi kendisi üretir; röle kontaklarındaki kıvılcım ve benzinli motorların ateşleme bobini bundandır. Uzun süre geçince roller tersine döner: dolu kondansatör açık devre, akımı oturmuş bobin düz bir tel gibidir.",
      formula: "i<sub>C</sub> = C·dV<sub>C</sub>/dt ⇒ V<sub>C</sub>(0⁺) = V<sub>C</sub>(0⁻)<br>v<sub>L</sub> = L·di<sub>L</sub>/dt ⇒ i<sub>L</sub>(0⁺) = i<sub>L</sub>(0⁻)",
      formulaNote:
        "0⁻ anahtardan hemen önceki, 0⁺ hemen sonraki andır. Sürekli kalan bu iki büyüklüğe devrenin <strong>durum değişkenleri</strong> denir: devrenin geleceğini, kaynaklarla birlikte, yalnızca onların başlangıç değerleri belirler.",
    },
    {
      heading: "Birinci mertebe denklem ve zaman sabiti",
      body:
        "Kirchhoff'un gerilim kuralı RC devresinde E = RI + V<sub>C</sub> der; I = C·dV<sub>C</sub>/dt yazınca bir diferansiyel denklem çıkar: RC·dV<sub>C</sub>/dt = E − V<sub>C</sub>. Sözle: kondansatörün dolma hızı kalan farkla orantılıdır. Fark büyükken hızlı, küçükken yavaş dolar; bu yüzden V<sub>C</sub> son değerine hiç 'varmaz', ona üstel olarak yaklaşır. Kalan fark her τ'da e ≈ 2.718'e bölünür: 1τ'da yolun %63.2'si, 2τ'da %86.5'i, 3τ'da %95.0'ı, 5τ'da %99.33'ü tamamlanır. Ω·F = (V/A)·(A·s/V) = s olduğundan τ = RC bir süredir; 10 kΩ ile 100 µF tam bir saniye verir. Başlangıçtaki teğet son değere tam t = τ'da varır: kalan fark ilk hızıyla kapanmaya devam etseydi dolum bir τ sürerdi. Kalan farkın logaritması zamanla doğrusal azalır, ln|V<sub>C</sub> − V<sub>son</sub>| = sabit − t/τ; sayfadaki logaritma grafiği τ'yu bu doğrunun eğiminden ölçer. Bobinli devrede aynı denklem akım için yazılır, L·di/dt = E − Ri, ve zaman sabiti τ = L/R olur.",
      formula: "V<sub>C</sub>(t) = V<sub>son</sub> + (V₀ − V<sub>son</sub>)·e<sup>−t/τ</sup>, &nbsp;τ = RC<br>i(t) = (E/R)·(1 − e<sup>−t/τ</sup>), &nbsp;τ = L/R",
      formulaNote:
        "Yarılanma süresi t<sub>½</sub> = τ ln 2 ≈ 0.693τ, %1'e yerleşme τ ln 100 ≈ 4.61τ. Aynı yasa radyoaktif bozunmada ve birinci mertebe kimyasal tepkimelerde de karşına çıkar: değişim hızı, kalan miktarla orantılıdır.",
    },
    {
      heading: "Enerji paradoksu: yarısı hep ısıya",
      body:
        "Boş kondansatör E'ye dolarken pilden Q = CE yük geçer ve pil her coulomb için E kadar iş yapar: W<sub>E</sub> = CE². Kondansatörde kalan ise U = ½CE²'dir. Eksik yarıyı direnç ısıya çevirir ve bu pay R'ye bağlı değildir. Akım E/R'den başlayıp e<sup>−t/τ</sup> ile söner, ısı gücü I²R ise iki kat hızla, e<sup>−2t/τ</sup> ile; integral alınınca R sadeleşir. Küçük direnç büyük ama kısa, büyük direnç küçük ama uzun bir akım demektir ve sonuç aynı kalır. Direnci sıfıra yaklaştırmak da kurtarmaz: o zaman ideal model bozulur, tellerin endüktansı devreyi bir LC salınıcısına çevirir ve devre sonunda E'de durulacaksa aynı yarı ışınım ve kıvılcım olarak gider. Kayıp, kaynak ile kondansatör arasındaki gerilim farkından doğar. Bu yüzden kaynağın gerilimini N eşit basamakta yükseltirsen her basamak ½C(E/N)² kaybeder ve toplam kayıp N kat küçülür; yarı yarıya dolu bir kondansatörü tamamlarken de kayıp yarıdan azdır.",
      formula: "W<sub>E</sub> = CE², &nbsp;U<sub>C</sub> = ½CE²<br>W<sub>R</sub> = ∫₀<sup>∞</sup> (E/R)² e<sup>−2t/τ</sup> R dt = (E²/R)·(τ/2) = ½CE²",
      formulaNote:
        "V₀'dan E'ye tamamlanan bir şarjda ısıya giden pay (E − V₀)/(2E)'dir; boştan başlayınca tam %50. Deşarjda ise depolanan enerjinin tamamı dirençte ısınır.",
    },
    {
      heading: "Aynı devre, üç iş: süzgeç, integral alıcı, türev alıcı",
      body:
        "Girişe bir sinüs verirsen kondansatör gerilimi V<sub>C</sub> yavaş değişimleri geçirir, hızlıları bastırır: bir <strong>alçak geçiren süzgeç</strong>. Direncin gerilimi V<sub>R</sub> = V<sub>giriş</sub> − V<sub>C</sub> tersini yapar: yüksek geçiren. İkisinin ayrıldığı yer <strong>kesim frekansı</strong> f<sub>c</sub> = 1/(2πRC)'dir; orada genlik 1/√2'ye (−3 dB) iner, çok üstünde her on kat frekansta on kat (−20 dB) düşer. Kare dalga aynı davranışı zaman ekseninde gösterir. Yarım periyot τ'dan çok uzunsa kondansatör her basamakta dolup boşalır ve V<sub>R</sub> kenarlarda sivri dikenler verir: V<sub>R</sub> ≈ τ·dV<sub>giriş</sub>/dt, devre bir <strong>türev alıcıdır</strong>. Yarım periyot τ'dan çok kısaysa kondansatöre dolmaya vakit kalmaz; V<sub>C</sub> ortalaması çevresinde küçük bir üçgen çizer, çünkü eğimi (V<sub>giriş</sub> − V<sub>C</sub>)/τ neredeyse sabittir: <strong>integral alıcı</strong>. Frekans dilinde aynı şey: kare dalga f, 3f, 5f… frekanslarındaki sinüslerin toplamıdır, genlikleri 1/n ile azalır. f<sub>c</sub>'nin çok üstünde süzgeç her harmoniği ayrıca 1/n oranında zayıflatır ve 90° geciktirir; genlikleri 1/n² ile azalan dizi bir üçgen dalgadır.",
      formula: "|H(f)| = 1/√(1 + (f/f<sub>c</sub>)²), &nbsp;f<sub>c</sub> = 1/(2πRC)<br>t<sub>r</sub>(%10→%90) = τ ln 9 ≈ 2.2τ = 0.35/f<sub>c</sub>",
      formulaNote:
        "τ = 100 µs için f<sub>c</sub> = 1.592 kHz ve t<sub>r</sub> = 219.7 µs. Çarpım t<sub>r</sub>·f<sub>c</sub> = ln 9/(2π) ≈ 0.35 R'den de C'den de bağımsızdır: hızlı kenar, geniş bant ister.",
    },
    {
      heading: "İkinci mertebe: ω₀, ζ ve kutuplar",
      body:
        "Seriye bir bobin ekleyince denklem ikinci mertebeye çıkar: L·di/dt + Ri + q/C = E. Bobin akımı, kondansatör gerilimi sürdürmek ister; enerji ikisi arasında gidip gelir ve direnç her gidişte bir kısmını ısıya çevirir. Homojen denklemin e<sup>st</sup> biçimli çözümlerinde s, Ls² + Rs + 1/C = 0 karakteristik denkleminin bir köküdür ve iki sayı her şeyi söyler: <strong>doğal frekans</strong> ω₀ = 1/√(LC) ve <strong>sönüm oranı</strong> ζ = (R/2)√(C/L). ζ < 1 ise kökler karmaşıktır, ω₀ yarıçaplı çemberin üstünde durur ve V<sub>C</sub>, E çevresinde ω<sub>d</sub> = ω₀√(1 − ζ²) ile salınarak yerleşir; ilk tepenin aşması yalnızca ζ'ya bağlıdır. ζ = 1'de iki kök −ω₀'da birleşir (kritik sönüm), ζ > 1'de gerçel eksende ayrılır ve yavaş olanı yerleşmeyi belirler. Ardışık iki tepenin aşmalarının oranının logaritması, <strong>logaritmik azalma</strong> δ, ζ'yı izden geri okutur. Denklem sönümlü yay–kütleninkinin aynısıdır, m·ẍ + b·ẋ + kx = F: L kütlenin, R sönüm katsayısının, 1/C yay sabitinin, q konumun yerini alır.",
      formula: "s = −ζω₀ ± ω₀√(ζ² − 1), &nbsp;ω₀ = 1/√(LC), &nbsp;ζ = (R/2)√(C/L)<br>M<sub>p</sub> = e<sup>−πζ/√(1−ζ²)</sup>, &nbsp;δ = 2πζ/√(1 − ζ²), &nbsp;ζ = δ/√(4π² + δ²)",
      formulaNote:
        "Sınır ζ = 1, yani R<sub>kritik</sub> = 2√(L/C). Az sönümde kutbun negatif gerçel eksenle yaptığı açı θ için cos θ = ζ. 10 mH ile 1 µF'ta ω₀ = 10 000 rad/s ve R<sub>kritik</sub> = 200 Ω; R = 20 Ω'da ζ = 0.1 ve aşma %72.92.",
    },
  ],
  lab: {
    intro:
      "Sayfa üç sekmeli bir geçici rejim laboratuvarıdır; her sekmede bir osiloskop izi ve bir <strong>Ölçüm ve kuram</strong> tablosu var. <strong>RC şarj ve deşarj</strong> sekmesinde Kaynak gerilimi E, Direnç R ve Sığa (kapasitans) C kaydırıcıları, şarj ile deşarj arasında geçiş yapan anahtar (düğmeyle ya da şemadaki anahtara dokunarak), üç R hazır deneyi, sürüklenebilir iki zaman imleci ve bir Enerji hesabı tablosu bulunur. <strong>Kare dalga ve filtre</strong> sekmesi V₀, Frekans f, R ve C ile bir RC süzgece kare dalga verir; Yatay eksen menüsü ve V<sub>C</sub>'yi büyütme kutusu vardır, çözümleme grafiği bir Bode grafiğidir. <strong>RLC basamak yanıtı</strong> sekmesinde Devre menüsü (Seri RLC ya da Seri RL), E, R, L ve C kaydırıcıları, dört hazır deney ve R'yi R<sub>kritik</sub> yap düğmesi var; çözümleme grafiği kutupları s düzleminde gösterir. Her sekmenin bir Varsayılanlara dön düğmesi vardır; Gösterim hızı menüsü 0.25× ile 256× arasında seçilir. 'Ölçülen' sütunu örneklenmiş izden okunur, 'Kuram' kapalı biçim çözümden gelir. Benzetim lineer devre için kesin olan üstel adımla ilerlediğinden Fark sütunu 0.00 % gösterir; gerçek bir deneyde farkı parça toleransları, kaçak akım ve kabloların endüktansı yaratır. Durum satırları, ideal modelin bozulacağı ayarlarda (çok kısa τ, megaohm düzeyinde R, büyük başlangıç akımı, üretecin 50 Ω'luk çıkış direnci, bobinin sargı direnci) ayrıca uyarır.",
    experiments: [
      {
        title: "Bir τ'da ne kadar dolar?",
        predict:
          "Varsayılan ayarda (E = 10.0 V, R = 10 kΩ, C = 100 µF) τ = RC kaç saniyedir? t = τ anında kondansatör 10 V'un ne kadarına dolmuş olur: yarısına mı, üçte ikisine mi, tamamına mı? 5τ'da ne kadar eksik kalır?",
        do: "RC şarj ve deşarj sekmesinde Varsayılanlara dön'e bas ve on saniyelik taramayı izle; 1×'te ekrandaki bir saniye tam bir τ'dır. İmleç 2 açılışta t₂ = 1.000 s'dedir; imleç satırını oku. Tarama bitince Ölçüm ve kuram tablosunu oku. Sonra İmleç 1'i 2.000 s'ye, İmleç 2'yi 4.000 s'ye getir.",
        observe:
          "İmleç satırı V<sub>C</sub>(t₂) = 6.321 V yazar: %63.2. Tablo: τ = 1.000 s hem %63.2 geçişinden hem ln doğrusundan (grafik: 1800 nokta, eğim −1.000 s⁻¹), t<sub>½</sub> = 693.1 ms, %1 yerleşme 4.605 s, t = 5τ'da %99.33, I(0⁺) = 1.000 mA; bütün Fark hücreleri 0.00 %. 2 ve 4 saniyedeki imleçlerde V<sub>C</sub> 8.647 V ve 9.817 V'tur ve satır yine 'iki imleçten τ = 1.000 s' verir.",
        explain:
          "Kalan fark D = |V<sub>C</sub> − V<sub>son</sub>| her τ'da e'ye bölünür; hangi aralığa bakarsan bak τ = Δt/ln(D₁/D₂) aynı çıkar, üstel eğrinin belleği yoktur. 5τ'da kalan fark e⁻⁵ ≈ %0.67'dir; mühendisler bu yüzden 5τ'yu 'doldu' sayar, ama matematikte dolum hiç bitmez.",
      },
      {
        title: "Yarısı nereye gitti?",
        predict:
          "Aynı kondansatörü (C = 100 µF, E = 10 V) boştan bir kez 1 kΩ, bir kez 10 kΩ, bir kez 100 kΩ üzerinden dolduruyorsun. Hangisinde dirence en az enerji gider? Başlangıç akımları ve dolum süreleri kaç kat farklıdır?",
        do: "Üç R hazır düğmesine sırayla bas; her tarama 1×'te yaklaşık on saniye sürer. Tarama sürerken Enerji hesabındaki Isıya giden pay W<sub>R</sub>/W<sub>E</sub> satırını izle, bitince tabloyu ve Isıya giden pay W<sub>R</sub>/W<sub>E</sub>, t → ∞ kartını oku. Sonra 10 kΩ deneyinde tarama bitince Deşarja çevir'e bas ve deşarjın sonunu bekle. Son olarak yeni bir şarjı durum satırı t ≈ 1 τ derken Duraklat ile durdur (0.25× hız işi kolaylaştırır), duraklatılmışken anahtarı iki kez çevir ve kartı oku.",
        observe:
          "Üç direnç için de W<sub>E</sub> = 10.00 mJ, ΔU<sub>C</sub> = 5.000 mJ, W<sub>R</sub> = 5.000 mJ ve pay 50.00 %; değişen yalnızca τ (100.0 ms, 1.000 s, 10.00 s) ve I(0⁺) (10.00 mA, 1.000 mA, 100.0 µA). Pay %100'den başlar, t = τ'da %68.39'a, 5τ'da %50.34'e iner. Deşarjda W<sub>E</sub> = 0 J, ΔU<sub>C</sub> = −5.000 mJ, W<sub>R</sub> = 5.000 mJ, pay 100.00 % ve I(0⁺) = −1.000 mA: akım yön değiştirir. Yeniden şarjda kart yaklaşık %18 gösterir.",
        explain:
          "∫I²R dt = (E²/R)(τ/2) = ½CE² içinde R sadeleşir; pay yalnızca t/τ'ya bağlıdır, (1 + e<sup>−t/τ</sup>)/2. Kayıp en çok şarjın başında, pil ile kondansatör arasındaki gerilim farkı en büyükken olur. Kısmen dolu kondansatörden başlayan şarjda pay (E − V₀)/(2E)'dir: t = τ'daki V₀ = 6.321 V için (10 − 6.321)/20 = %18.39. Duraklatmak V<sub>C</sub>'yi dondurur; çalışırken iki kez çevirirsen aradaki kısa deşarj V₀'ı düşürür ve pay büyür.",
      },
      {
        title: "Kare dalga: türev alıcıdan integral alıcıya",
        predict:
          "τ = 100 µs (R = 1 kΩ, C = 100 nF). Yarım periyodu 5τ olan 1 kHz'lik kare dalgada V<sub>C</sub> en çok kaç volta çıkar? Frekansı yüz katına, 100 kHz'e çıkarınca V<sub>C</sub> neye benzer, dalgalanması kaç milivolttur? V<sub>C</sub>'nin ortalaması değişir mi?",
        do: "Kare dalga ve filtre sekmesini aç; açılış ayarı 'T/2 = 5τ: f = 1/(10τ) = 1 kHz' hazır deneyidir. Durum satırı 'Kararlı durum' deyince tabloyu ve kartları oku. Sonra 'T/2 = 50τ: türev alıcı (f = 100 Hz)' ve 'T/2 = τ/20: integral alıcı, f = 10/τ = 100 kHz' düğmelerine bas. Sonuncusunda Yatay eksen menüsünden 'Son 10 τ'yu seç, Gösterim hızını 4× yap ve Yeniden başlat'a bas; ardından hızı 64×'e çıkar (1×'te kararlı durum iki dakika sürer).",
        observe:
          "1 kHz: V<sub>maks</sub> = 9.933 V, V<sub>min</sub> = 66.93 mV, ortalama 5.000 V, %10–90 yükselme 213.9 µs; kartlar τ ln 9 = 219.7 µs ve kazanç 0.8467 (−1.45 dB) yazar. 100 Hz: V<sub>R</sub> kenarlarda ±10 V'luk dikenler verir, yükselme 219.7 µs olur. 100 kHz: V<sub>C</sub> 4.875 V ile 5.125 V arasında üçgen çizer, dalgalanma 249.9 mV, kazanç 0.0159 (−35.96 dB); durum satırı kararlı durumu 109. periyottan beri bildirir. Son 10 τ görünümü ortalamanın 0'dan 5 V'a tırmanışını gösterir.",
        explain:
          "Periyodik çözüm V<sub>maks</sub> = V₀/(1 + e<sup>−T/(2τ)</sup>) verir: 10/(1 + e⁻⁵) = 9.933 V. Yükselme süresinin 219.7 µs'den kısa çıkması, salınımın 0–10 V değil 66.93 mV–9.933 V arasında olmasındandır. 100 kHz'de yarım periyot 5 µs'dir; ΔV ≈ V₀T/(4τ) = 250 mV (tam değeri V₀·tanh(T/(4τ))). Ortalama, yani DC bileşen, her frekansta geçer: f = 0'da kazanç 1'dir.",
      },
      {
        title: "Hangi direnç en hızlı yerleştirir?",
        predict:
          "L = 10 mH, C = 1 µF için R<sub>kritik</sub> = 2√(L/C) = 200 Ω. R = 20 Ω (ζ = 0.1), 200 Ω (ζ = 1) ve 1 kΩ (ζ = 5) ile V<sub>C</sub> hangisinde E'nin ±%2 bandına en çabuk girip orada kalır? Daha çok direnç her zaman daha yavaş yerleşme mi demektir?",
        do: "RLC basamak yanıtı sekmesinde Az sönümlü, Kritik ve Aşırı sönümlü hazır deneylerini sırayla çalıştır. Her taramanın sonunda tabloda aşmayı ve %2 yerleşme süresini oku, s düzlemindeki kutuplara bak. Sonra Direnç R kaydırıcısını sırayla 100 Ω, 150 Ω ve 160 Ω'a getir.",
        observe:
          "ζ = 0.1: aşma %72.92 (V<sub>C</sub> 17.29 V'a fırlar), yerleşme 3.838 ms; kutuplar çemberin üstünde, sanal eksene yakın. ζ = 1: aşma 'yok', yerleşme 583.4 µs, kutup −ω₀'da 'çift kök'. ζ = 5: yerleşme 3.883 ms, kutuplar −0.1010ω₀ ve −9.899ω₀'da; durum satırı yavaş kökün τ'sunu 989.9 µs yazar. 100 Ω (ζ = 0.5): aşma %16.30, yerleşme 807.6 µs. 150 Ω (ζ = 0.75): %2.84 ve 574.3 µs. 160 Ω (ζ = 0.8): %1.52 ve 375.6 µs; direnç yalnız %7 artınca yerleşme üçte bir kısalır.",
        explain:
          "Kritiğin altında direnç salınımı söndürür, üstünde yavaş kök −1/(RC)'ye yaklaşır ve devre RC gibi tembelleşir: 1 kΩ, 20 Ω'dan bile yavaştır. Kritik sönüm aşmasız en hızlı yanıttır; ama ilk tepe bandın içinde kalırsa devre ondan önce yerleşir. 150 Ω'da %2.84'lük tepe banttan taşar ve geri dönüş beklenir, 160 Ω'da taşmaz. En kısa %2 yerleşme aşmanın tam %2 olduğu ζ ≈ 0.78'de, %5'lik bantta ζ ≈ 0.69'dadır; kontrol mühendisliğinde sık seçilen ζ ≈ 0.7'nin bir gerekçesi budur.",
      },
    ],
  },
  wow: [
    {
      title: "Fibrilasyonu durduran sönümlü salınım",
      body:
        "1959'da kardiyolog Bernard Lown, mühendis Barouh Berkovits ile birlikte, bir kondansatör grubunu yaklaşık 1000 volta doldurup 100–200 joulelük enerjiyi bir bobin üzerinden kürek elektrotlarla kalbe veren bir yöntemi araştırmaya başladı. Dolu kondansatör, bobin ve göğsün direnci bir seri RLC kurar; boşalma yaklaşık 5 milisaniye süren, güçlü sönümlü bir sinüs darbesidir. Şok, duran bir kalbi çalıştırmaz: titreşen kas hücrelerinin çoğunu birden uyararak fibrilasyonu keser ve doğal ritme yer açar. Lown–Berkovits dalgası uzun yıllar standart kaldı; bugünkü cihazların iki fazlı kesik üstel dalgasında kondansatör göğüs üzerinden RC gibi boşalır, akımın yönü şokun yaklaşık yarısında çevrilir.",
    },
    {
      title: "Bir milyar çipin içindeki ln 3",
      body:
        "Hans Camenzind'in 1971'de Signetics için tasarladığı, 1972'de piyasaya çıkan 555 zamanlayıcı, bir kondansatörü bir direnç üzerinden doldurup gerilimi iki eşikle karşılaştıran bir devredir: kaynağın üçte biri ve üçte ikisi. Tek darbe kipinde boş kondansatör kaynağın üçte ikisine ulaşınca darbe biter; 1 − e<sup>−t/τ</sup> = 2/3 denkleminden t = RC·ln 3 ≈ 1.1RC çıkar. Salınım kipinde kondansatör üçte bir ile üçte iki arasında gidip gelir: dolma ve boşalma evrelerinin her biri kendi zaman sabitinin ln 2 katı sürer, ln 3 ise yalnız 0 V'tan başlayan ilk dolumda görünür. Bazı tahminlere göre her yıl bir milyardan fazla 555 üretiliyor.",
    },
    {
      title: "Osiloskobun kendi hız sınırı",
      body:
        "RC devresinin bir basamağa yanıtı %10'dan %90'a τ ln 9 sürede çıkar; kesim frekansıyla çarpımı ln 9/(2π) ≈ 0.35'tir ve R ile C'den bağımsızdır. Ölçü aletleri de bu yasaya uyar: yanıtı tek kutuplu bir RC'ye benzeyen osiloskobun yükselme süresi yaklaşık 0.35 bölü bant genişliğidir. 100 MHz'lik bir osiloskobun kendi yükselmesi 3.5 ns'dir; ona 1 ns'lik bir kenar verirsen ekranda 1 ns değil, 3.6–3.7 ns görürsün. Mühendislerin kaba kuralı iki süreyi kareleri toplamının karekökü olarak birleştirir: √(3.5² + 1²) ≈ 3.6 ns. Hızlı bir kenarı ölçmek için aletin kendi yükselmesi ondan birkaç kat kısa olmalıdır. Sayfadaki 'Basamak yükselmesi τ ln 9 = 0.35/f<sub>c</sub>' kartı bu kuralın kendisidir.",
    },
  ],
  worked: {
    title: "Az sönümlü RLC: aşma, periyot ve yerleşme",
    prompt:
      "E = 10 V'luk bir pil t = 0'da seri bağlı R = 20 Ω, L = 10 mH ve C = 1.0 µF'a bağlanıyor; kondansatör boş, akım sıfır. ω₀'ı, ζ'yı, sönümlü periyodu, kondansatör geriliminin ilk tepesini ve zamanını, logaritmik azalmayı ve %2 yerleşme süresinin zarf kestirimini bul; sonuçları sayfayla karşılaştır.",
    steps: [
      "<strong>Doğal frekans.</strong> ω₀ = 1/√(LC) = 1/√(0.010 H × 1.0×10⁻⁶ F) = 1/√(1.0×10⁻⁸ s²) = 1.0×10⁴ rad/s, f₀ = ω₀/(2π) = 1.592 kHz. Birim denetimi: H·F = (V·s/A)·(A·s/V) = s².",
      "<strong>Sönüm.</strong> R<sub>kritik</sub> = 2√(L/C) = 2√(1.0×10⁴ Ω²) = 200 Ω, ζ = R/R<sub>kritik</sub> = 20/200 = 0.10 < 1: az sönümlü. Sönüm hızı α = R/(2L) = 20 Ω / 0.020 H = 1000 s⁻¹ = ζω₀ (Ω/H = 1/s); ω<sub>d</sub> = ω₀√(1 − ζ²) = 10⁴ × 0.99499 = 9950 rad/s.",
      "<strong>Periyot ve ilk tepe.</strong> T<sub>d</sub> = 2π/ω<sub>d</sub> = 631.5 µs; ilk tepe yarım periyotta, t<sub>p</sub> = π/ω<sub>d</sub> = 315.7 µs. Aşma M<sub>p</sub> = e<sup>−πζ/√(1−ζ²)</sup> = e<sup>−0.3157</sup> = 0.7292, yani V<sub>C</sub> en çok E(1 + M<sub>p</sub>) = 17.29 V'a çıkar. 10 V'luk pil, kondansatörün uçlarında 17 V'tan fazla gerilim doğurur; kondansatörün anma gerilimi buna göre seçilmelidir.",
      "<strong>Logaritmik azalma.</strong> Zarf bir periyotta e<sup>−αT<sub>d</sub></sup> kadar küçülür: δ = αT<sub>d</sub> = 1000 s⁻¹ × 631.5 µs = 0.6315 = 2πζ/√(1 − ζ²). İkinci tepe x₂ = x₁e<sup>−δ</sup> = 7.292 V × 0.5318 = 3.878 V aşar. Ters yönde ζ = δ/√(4π² + δ²) = 0.6315/√(39.48 + 0.40) = 0.6315/6.315 = 0.1000: izden ölçülen δ, ζ'yı geri verir.",
      "<strong>Yerleşme ve sayfa.</strong> Zarf yaklaşık e<sup>−αt</sup> olduğundan %2'ye ln 50/α ≈ 3.9 ms'de iner; yaygın kestirim 4/(ζω₀) = 4.000 ms'dir. Tam çözümde V<sub>C</sub> bandı son kez 3.838 ms'de terk eder, çünkü salınım zarfa her an değmez. RLC sekmesinin açılış ayarı (Az sönümlü: ζ = 0.1) tam bu devredir: tablo aşmayı 72.92 %, t<sub>p</sub>'yi 315.7 µs, T<sub>d</sub>'yi 631.5 µs, δ'yı 0.6315, ζ'yı 0.1000 ve %2 yerleşmeyi 3.838 ms ölçer; Zarf kestirimi kartı 4.000 ms yazar.",
    ],
    result:
      "ω₀ = 10 000 rad/s, ζ = 0.10, T<sub>d</sub> = 631.5 µs, t<sub>p</sub> = 315.7 µs, aşma %72.92 (tepe 17.29 V), δ = 0.6315; %2 yerleşme kestirimi 4.0 ms, tam değeri 3.838 ms. Direnci on katına, 200 Ω'a çıkarmak aşmayı yok eder ve yerleşmeyi 583.4 µs'ye indirir.",
  },
  misconceptions: [
    {
      myth: "Kondansatör bir zaman sabitinde, yani t = RC anında tam dolar.",
      truth:
        "Bir τ'da yolun yalnızca %63.2'si tamamlanır: sayfanın varsayılan ayarında t = 1.000 s'de V<sub>C</sub> = 6.321 V'tur, 10 V değil. Kalan fark her τ'da e'ye bölünür ve matematikte hiç sıfırlanmaz; pratikte 5τ'da (%99.33) 'dolu' sayılır. τ yarılanma süresi de değildir: t<sub>½</sub> = τ ln 2 = 693.1 ms.",
    },
    {
      myth: "Küçük bir dirençle doldurmak daha az enerji kaybettirir; ne de olsa direnç küçük.",
      truth:
        "Boş bir kondansatör sabit gerilimli bir kaynaktan dolarken dirençte ısıya dönen enerji her zaman ½CE²'dir, kaynağın verdiğinin tam yarısı. Sayfada 1 kΩ, 10 kΩ ve 100 kΩ hazır deneylerinin üçü de W<sub>R</sub> = 5.000 mJ ve %50.00 verir. Direnç yalnızca kaybın ne kadar sürede gerçekleştiğini belirler. Kaybı azaltmak için direnci değil, kaynak ile kondansatör arasındaki gerilim farkını küçültmek gerekir; örneğin kaynağın gerilimini kademe kademe yükselterek.",
    },
    {
      myth: "Anahtar kapanınca akım da kondansatörün gerilimi gibi sıfırdan yavaş yavaş başlar.",
      truth:
        "Sıçrayamayan kondansatörün gerilimidir, akımı değil. Boş kondansatörün iki levhası ilk anda aynı potansiyeldedir; pilin bütün gerilimi direncin üstüne düşer ve akım anında en büyük değeri E/R'ye çıkar, sonra e<sup>−t/τ</sup> ile söner. Sayfada I(0⁺) satırı varsayılan ayarda 1.000 mA ölçer ve osiloskoptaki turkuaz akım bandı t = 0'da dik bir duvarla başlar. Bobinde tersi olur: akım sıfırdan başlar, gerilim sıçrar.",
    },
    {
      myth: "Direnç arttıkça devre her zaman daha yavaş yerleşir.",
      truth:
        "Birinci mertebe RC devresinde doğru (τ = RC), ikinci mertebe RLC'de değil. Sayfada L = 10 mH ve C = 1 µF ile %2 yerleşme süresi R = 20 Ω'da 3.838 ms, 160 Ω'da 375.6 µs, 200 Ω'da (kritik) 583.4 µs, 1 kΩ'da 3.883 ms'dir. Kritiğin altında direnç salınımı söndürüp yerleşmeyi hızlandırır, üstünde yavaşlatır; aşması bandın içinde kalan hafif az sönümlü devre kritik sönümden bile önce yerleşir.",
    },
  ],
  glossary: [
    { term: "Geçici rejim", definition: "Bir anahtarlamadan ya da ani bir değişiklikten sonra devrenin eski dengesinden yenisine geçerken gösterdiği, kendi kökleriyle belirlenen ve zamanla sönen davranış." },
    { term: "Zaman sabiti (τ)", definition: "Birinci mertebe bir devrede kalan farkın e ≈ 2.718'e bölündüğü süre; RC devresinde τ = RC, RL devresinde τ = L/R." },
    { term: "Kesim frekansı (f<sub>c</sub>)", definition: "Birinci mertebe bir süzgecin geçirdiği genliğin 1/√2'ye (−3 dB) indiği frekans; RC devresinde f<sub>c</sub> = 1/(2πRC)." },
    { term: "Yükselme süresi (t<sub>r</sub>)", definition: "Bir basamağa yanıtın toplam değişiminin %10'undan %90'ına çıkma süresi; ideal RC basamağında τ ln 9 ≈ 2.2τ." },
    { term: "Sönüm oranı (ζ)", definition: "Direncin kritik dirence oranı, ζ = R/R<sub>kritik</sub> = (R/2)√(C/L); ζ < 1 salınımlı, ζ = 1 kritik, ζ > 1 aşırı sönümlü yanıt verir." },
    { term: "Aşma (M<sub>p</sub>)", definition: "Basamak yanıtının ilk tepesinin son değeri aştığı oran; seri RLC'nin kondansatör geriliminde M<sub>p</sub> = e<sup>−πζ/√(1−ζ²)</sup>." },
    { term: "Logaritmik azalma (δ)", definition: "Ardışık iki tepenin aşmaları oranının doğal logaritması, δ = ln(x₁/x₂) = 2πζ/√(1 − ζ²); ölçülen izden ζ'yı bulmaya yarar." },
    { term: "Kutup", definition: "Devrenin karakteristik denkleminin bir kökü s; gerçel kısmı yanıtın sönme hızını, sanal kısmı salınımın açısal frekansını verir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede RC devresi bir formüldür; üniversitede ilk çözdüğün diferansiyel denklemlerden biri. <strong>Devre Analizi</strong> derslerinde birinci ve ikinci mertebe devreler sistematik biçimde çözülür: başlangıç koşulları 0⁻'dan 0⁺'ya taşınır, yanıt doğal ve zorlanmış kısımlara ayrılır. Ardından <strong>Laplace dönüşümü</strong> gelir: türev s ile çarpmaya, başlangıç koşulu küçük bir kaynağa dönüşür ve seri RLC'nin kondansatör gerilimi için H(s) = 1/(LCs² + RCs + 1) transfer fonksiyonu yazılır. Paydanın kökleri sayfanın s düzleminde çizdiği kutuplardır; s = jω konunca Bode grafiği çıkar, E·H(s)/s'nin ters dönüşümü de osiloskoptaki basamak yanıtını verir. <strong>Sinyaller ve Sistemler</strong> dersinde aynı devre doğrusal ve zamanla değişmeyen bir sistemdir: dürtü yanıtı h(t) = (1/τ)e<sup>−t/τ</sup> ile evrişim, kare dalganın Fourier serisi ve süzgeç tasarımı orada buluşur. <strong>Elektronik</strong> dersinde işlemsel yükselteçle kurulan integral ve türev alıcılarla, 555 gibi zamanlayıcılarla ve sayısal hatlardaki çınlamayla karşılaşırsın.",
      "<strong>Kontrol Sistemleri</strong> dersi ikinci mertebe sistemi neredeyse bir dil gibi kullanır: aşma, tepe zamanı ve yerleşme süresi tasarım şartnamesidir; sayfadaki gölgeli kutup yolu, R değişirken çizilen bir <strong>kök yer eğrisidir</strong>; bir PID denetleyicisi de kapalı döngünün kutuplarını istenen ζ ve ω₀'a taşımanın aracıdır. Sayfanın arkasındaki yöntem sonraki adımı gösterir: devre <strong>durum uzayında</strong> ẋ = Ax biçiminde yazılır, çözümü x(t) = e<sup>At</sup>x(0) matris üstelidir; benzetim her adımda x ← e<sup>Ah</sup>x uyguladığı için lineer devrede kesin sonuç verir. Aynı denklem mekanikte arabanın süspansiyonunu, sismometreyi ve analog ölçü aletlerinin ibresini anlatır; ibre titremeden ve çabucak yerine otursun diye kritiğe yakın sönümlenir.",
    ],
    topics: [
      "Devre Analizi: birinci ve ikinci mertebe devreler",
      "Laplace dönüşümü ve transfer fonksiyonu",
      "Sinyaller ve Sistemler: evrişim ve Fourier serisi",
      "Elektronik: işlemsel yükselteçle integral ve türev alıcı",
      "Kontrol Sistemleri: ikinci mertebe yanıt ve PID",
      "Kök yer eğrisi",
      "Durum uzayı ve matris üsteli",
      "Mekanikte sönümlü salınıcı",
    ],
  },
  quiz: [
    {
      question:
        "Boş bir kondansatör aynı pilden bir kez R direnci üzerinden, bir kez R/2 üzerinden tam dolduruluyor. İkinci durumda dirençte ısıya dönen toplam enerji ne olur?",
      options: ["Yarıya iner", "Değişmez", "İki katına çıkar", "Dört katına çıkar"],
      answer: 1,
      explanation:
        "R yarıya inince başlangıç akımı E/R ve ilk andaki ısı gücü E²/R iki katına çıkar, ama τ = RC yarıya iner ve kayıp yarı sürede biter: ∫I²R dt = (E²/R)(τ/2) = ½CE². 'İki katı' yalnız tepe gücüne bakmaktır, 'dört katı' akımın karesine; sayfada 1 kΩ ve 10 kΩ hazır deneyleri aynı W<sub>R</sub> = 5.000 mJ'ü verir.",
    },
    {
      question:
        "Kesim frekansı 1.6 kHz olan bir RC alçak geçiren süzgecin girişine 0 ile 10 V arasında gidip gelen 100 kHz'lik bir kare dalga veriliyor. Kararlı durumda kondansatörün gerilimi neye benzer?",
      options: [
        "Girişin aynısı: 0–10 V kare dalga",
        "Kenarlarda sivri dikenler, arada 0 V",
        "5 V çevresinde tepeden tepeye yaklaşık 0.25 V'luk bir üçgen dalga",
        "Sabit 0 V; süzgeç hiçbir şey geçirmez",
      ],
      answer: 2,
      explanation:
        "τ = 1/(2πf<sub>c</sub>) ≈ 100 µs, yarım periyot ise 5 µs: kondansatör her yarım periyotta ancak ±125 mV kıpırdar ve üçgen çizer, ΔV ≈ V₀T/(4τ) = 250 mV. Ortalama ise geçer, çünkü f = 0'da kazanç 1'dir: 5 V. Sivri dikenler yavaş kare dalgada direncin geriliminde görülür. Sayfada 'T/2 = τ/20' hazır deneyi tam bu durumdur.",
    },
    {
      question:
        "Bir seri RLC devresinin basamak yanıtında kondansatör geriliminin ilk tepesi son değeri 4.0 V, ikinci tepesi 2.0 V aşıyor. Sönüm oranı ζ yaklaşık kaçtır?",
      options: ["0.11", "0.50", "0.69", "1.0"],
      answer: 0,
      explanation:
        "Logaritmik azalma δ = ln(x₁/x₂) = ln 2 = 0.693; ζ = δ/√(4π² + δ²) = 0.693/√(39.48 + 0.48) ≈ 0.110. Küçük δ için kısaca ζ ≈ δ/(2π). 0.69 δ'nın kendisidir; 0.50 'her tepede yarıya iniyor' bilgisini doğrudan ζ sanmaktır; ζ = 1'de ise hiç tepe olmaz. Sayfa aynı hesabı 'ζ, δ'dan' satırında yapar.",
    },
  ],
  next: [
    {
      href: "alternatif-akim.html",
      title: "Alternatif Akım: RLC ve Rezonans",
      why: "Burada devreyi bir basamakla dürttün, orada sinüsle sürersin: geçici terim sönünce kalan kararlı durumu fazörler çözer. Buradaki ζ, oradaki rezonans eğrisinde Q = 1/(2ζ) olarak geri döner.",
    },
    {
      href: "elektrik-devresi-simulasyonu.html",
      title: "Doğru Akım Devreleri",
      why: "Geçici rejimin bittiği yer: t → ∞'da kondansatör açık devre, bobin düz tel olur ve geriye Ohm ile Kirchhoff kalır. İç direnç r kaydırıcısı, buradaki τ'ya eklenen pil direncinin ta kendisidir.",
    },
    {
      href: "yay-kutle.html",
      title: "Yay-Kütle Sistemi: Salınım, Sönüm ve Rezonans",
      why: "RLC’nin mekanik ikizi: kütle bobinin, yay sabiti 1/C’nin, sönüm de direncin yerini alır. Periyodu T = 2π√(m/k) ile ölç, sonra sönümün üç rejimini ve rezonans eğrisini aynı denklemin öteki yüzü olarak gör.",
    },
    {
      href: "diferansiyel-denklemler.html",
      title: "Diferansiyel Denklemler ve Dinamik Sistemler: Yön Alanından Rezonansa",
      why: "Sönümün denklemdeki yüzü: İkinci mertebe ve rezonans sekmesinde m = 1 iken k'yı 2'ye çek, c kaydırıcısını 2√k ≈ 2.83'ün iki yanında gezdir; Rejim satırı az sönümlüden aşırı sönümlüye geçer. Bu eşik, buradaki R<sub>kritik</sub> = 2√(L/C)'dir.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 2, 10.5 RC Circuits",
      url: "https://openstax.org/books/university-physics-volume-2/pages/10-5-rc-circuits",
      note: "Şarj ve deşarjın Kirchhoff'tan türetilmesi, τ = RC, flaş ve 555 zamanlayıcı gibi uygulamalar, çözümlü örneklerle (İngilizce, açık ders kitabı).",
    },
    {
      title: "OpenStax · University Physics Vol. 2, 14.6 RLC Series Circuits",
      url: "https://openstax.org/books/university-physics-volume-2/pages/14-6-rlc-series-circuits",
      note: "Seri RLC'nin ikinci mertebe denklemi, az, kritik ve aşırı sönüm ve sönümlü yay–kütle benzetmesi (İngilizce).",
    },
    {
      title: "Wikipedia · LC circuit (History)",
      url: "https://en.wikipedia.org/wiki/LC_circuit",
      note: "Savary'nin 1826'daki mıknatıslanmış iğneleri, Henry'nin 1842 deneyi, Thomson'ın 1853 hesabı, Feddersen'in dönen aynası ve Hertz, kaynaklarıyla (İngilizce).",
    },
    {
      title: "Wikipedia · 555 timer IC",
      url: "https://en.wikipedia.org/wiki/555_timer_IC",
      note: "Camenzind'in 1971 tasarımı, üçte bir ve üçte iki eşikleri, tek darbe süresi t = ln 3·RC ve salınım kipinde ln 2 formülleri (İngilizce).",
    },
  ],
  revision: "Kasım 2026",
};
