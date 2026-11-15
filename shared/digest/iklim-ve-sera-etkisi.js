window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["iklim-ve-sera-etkisi"] = {
  slug: "iklim-ve-sera-etkisi",
  title: "İklim ve Sera Etkisi: Enerji Dengesinden Geri Beslemeye",
  field: "Yer ve Çevre Bilimleri",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir gezegenin sıcaklığı tek bir hesapla başlar: soğurduğu güneş ışığı kadar kızılötesi yaymalıdır. Dört oyuncak modelle 255 K'den katmanlara, logaritmik zorlamaya ve geri beslemelere yürü.",
  hook:
    "Venüs, Güneş'ten aldığı ışığın dörtte üçünden fazlasını geri yansıtır; bu yüzden kara cisim sıcaklığı Dünya'nınkinden bile düşüktür: 226,6 K. Oysa yüzeyi 737 K'dir, kurşunu eritecek kadar sıcak. Aynı hesap Dünya için 255 K verirken biz neden 288 K'de yaşıyoruz?",
  bigIdea:
    "Uzaya giden kızılötesi, uzun vadede soğurulan güneş akısına eşit olmak zorundadır; <strong>sera etkisi</strong> bu toplamı değil, ışımanın uzaya hangi yükseklikten ve hangi sıcaklıktan çıktığını değiştirir, yüzey de bu yüzden ısınır.",
  story: [
    "Fikrin kökü 1824'e, Joseph Fourier'ye uzanır: Fourier fizik yasalarından yola çıkarak atmosferin Dünya'yı boşlukta olacağından daha sıcak tuttuğunu savundu. 1856'da Eunice Newton Foote güneşe bıraktığı cam tüplerde nemli havanın kuru havadan daha çok ısındığını, en güçlü etkiyi de karbondioksitte (o zamanki adıyla “karbonik asit gazı”) bulduğunu yazdı; çalışmasını Ağustos 1856'da Amerikan Bilimi İlerletme Derneği'nin toplantısında Joseph Henry sundu. Düzeneği kızılötesini güneş ışığından ayırmıyordu; ölçtüğü, tüplerin güneşte ne kadar ısındığıydı. 1859'da John Tyndall Londra'da gazların kızılötesi soğurmasını doğrudan ölçen bir düzenek kurdu: su buharı, karbondioksit ve metan gibi hidrokarbonlar ışımayı güçlü biçimde tutuyordu. Ölçümlerini 1861'de Kraliyet Cemiyeti'nde Bakerian Dersi olarak sundu ve atmosferin ısısını tutmada en büyük payın su buharında olduğunu savundu.",
    "1896'da Svante Arrhenius elle yaptığı uzun hesaplarla atmosferdeki CO₂'nin ikiye katlanmasının yüzeyi 5–6 °C ısıtacağını buldu; bugünkü değerlendirmelerden yüksek bir sayı, ama doğru soru. 1938'de Guy Stewart Callendar son yarım yüzyılda hem sıcaklığın hem CO₂'nin arttığına dair kanıt sundu; bilim dünyasının çoğu bu çalışmayı ya tartıştı ya görmezden geldi. Ölçüm meselesini Charles David Keeling çözdü: Mart 1958'den başlayarak Hawaii'deki Mauna Loa Gözlemevi'nde CO₂'yi sürekli ölçtü. Bugün <strong>Keeling eğrisi</strong> diye bilinen dizide Mart 1958'in aylık ortalaması 315,71 ppm'dir; dizide yıldan yıla yükselişin üstüne, kuzey yarıkürede bitki örtüsünün büyüme mevsimini izleyen yıllık bir salınım biner.",
    "Modeller 1960'larda olgunlaştı. 1967'de Syukuro Manabe ve Richard Wetherald, ışınımın yanında konveksiyonu da hesaba katan ve su buharının olumlu geri beslemesini içeren (bağıl nemi sabit tutan) tek sütunlu bir model kurdu: CO₂'nin ikiye katlanması yüzeyi ve troposferi yaklaşık 2 °C ısıtıyor, stratosferi ise soğutuyordu. 1969'da Mikhail Budyko ve William Sellers birbirinden bağımsız olarak enlem boyutlu enerji dengesi modellerinde buz–albedo geri beslemesini işledi; iki model de güneş akısındaki yalnız birkaç yüzdelik bir azalmanın gezegeni bütünüyle buzla kaplı bir duruma sürükleyebileceğini, yani kendi kendini besleyen bir kaçışın mümkün olduğunu düşündürüyordu. 2021 Nobel Fizik Ödülü'nün yarısı Manabe ile Klaus Hasselmann'a birlikte verildi; gerekçe, Dünya iklimini fiziksel olarak modellemek, değişkenliğini nicelemek ve küresel ısınmayı güvenilir biçimde öngörmekti. Öbür yarısı, karmaşık sistemlerdeki düzensizlik ve dalgalanmalar üzerine çalışmaları için Giorgio Parisi'ye gitti.",
    "Bu sayfadaki modeller o çizginin en yalın basamaklarıdır: sıfır boyutlu bir gezegen, gri katmanlar, iki kutulu bir okyanus ve tek parametreli bir geri besleme. Bugünün <strong>tam iklim modelleri</strong> (GCM) aynı enerji korunumundan başlar ama atmosferi ve okyanusu üç boyutlu ızgaralarda akışkanlar dinamiğiyle çözer, bulutları ve tayfı ayrıntılı işler. Oyuncak modellerin sayıları gerçek iklimin tahmini değildir; mekanizmayı görünür kılarlar.",
  ],
  core: [
    {
      heading: "Sıfır boyutlu gezegen ve 255 K",
      body:
        "Gezegen güneş ışığını kesit alanıyla (πr²) yakalar, ama bütün yüzeyinden (4πr²) yayar; bu yüzden metrekare başına ortalama gelen akı S/4'tür. Bunun α kadarı yansır. Kalanın εσT⁴ ile dengelendiği sıcaklık <strong>denge sıcaklığıdır</strong>. Dünya için S = 1.361 W/m² ve α = 0,294 ile soğurulan akı 240,2 W/m², ε = 1 iken T* = 255,12 K, yani −18,0 °C'tir. Gözlenen ortalama yüzey 288 K; aradaki 33 kelvinlik açığı ε = 1 kara cisim modeli açıklayamaz.",
      formula: "T* = [S(1 − α)/(4εσ)]<sup>1/4</sup>",
      formulaNote: "σ = 5,670 × 10⁻⁸ W m⁻² K⁻⁴. ε < 1, atmosferin etkisini tek sayıya sıkıştıran kaba bir ayardır: ε = 0,61 ile T* = 288,68 K olur.",
    },
    {
      heading: "Dengeye ne kadar sürede varılır?",
      body:
        "Isı sığası C (h metrelik su katmanı için C = ρc·h) dengeyi değiştirmez, yalnız yolu değiştirir: C dT/dt = S(1 − α)/4 − εσT⁴. T = T* + δ yazıp T⁴'ü birinci mertebeden açarsan C dδ/dt ≈ −4εσT*³·δ bulursun: sapma üstel söner. Zaman sabiti C ile doğru, T*³ ile ters orantılıdır. Bu doğrusallaştırma yalnız dengenin yakınında geçerlidir; uzaktan başlayan soğuk bir gezegen daha az yaydığı için daha yavaş ısınır, sıcak bir gezegen daha hızlı soğur. Sayfa τ'yu formülden değil, eğriden ölçer ve farkın işaretini bu doğrusal olmayışa bağlar.",
      formula: "τ = C/(4εσT*³)",
      formulaNote: "50 m su için C = 2,093 × 10⁸ J m⁻² K⁻¹ ve τ ≈ 1,761 yıl; derinliği iki katına çıkarmak τ'yu iki katına çıkarır.",
    },
    {
      heading: "Gri katmanlar ve yayım yüksekliği",
      body:
        "Güneşe saydam, kızılötesinde ε kadar soğuran tek bir katman düşün. Katmanın dengesi: alttan soğurduğu εσT<sub>s</sub>⁴, iki yöne yaydığı 2εσT<sub>a</sub>⁴'e eşittir. Uzaya çıkan akı ise yüzeyden sızan (1 − ε)σT<sub>s</sub>⁴ ile katmanın εσT<sub>a</sub>⁴'ünün toplamıdır ve soğurulan güneş akısına, σT<sub>e</sub>⁴'e eşit olmalıdır. İkisini birleştirince σT<sub>s</sub>⁴(1 − ε/2) = σT<sub>e</sub>⁴ çıkar. Tam soğuran N katmanda yüzey T<sub>e</sub>(N + 1)<sup>1/4</sup>'e ulaşır. Yorum: uzaya giden ışıma ortalama T<sub>e</sub> sıcaklığındaki bir düzeyden çıkar; soğurucu arttıkça bu <strong>yayım yüksekliği</strong> yükselir ve sıcaklığın yükseklikle düştüğü bir atmosferde yüzey ısınmak zorunda kalır.",
      formula: "T<sub>s</sub> = T<sub>e</sub>[2/(2 − ε)]<sup>1/4</sup>",
      formulaNote: "ε = 1'de 2<sup>1/4</sup> = 1,189 çarpanı: 255,12 K → 303,39 K. Gerçek atmosfer gri değildir ve ısının çoğunu konveksiyon taşır; model yalnız mekanizmayı gösterir.",
    },
    {
      heading: "Logaritmik zorlama ve duyarlılık",
      body:
        "<strong>Radyatif zorlama</strong> ΔF, bir değişikliğin gezegenin enerji bütçesine eklediği metrekare başına güçtür. Myhre ve arkadaşları 1998'de ayrıntılı ışınım hesaplarına basit bir uydurma yaptı: ΔF = 5,35 ln(C/C₀). Logaritmanın sonucu şudur: ln(2C₀/C₀) = ln 2, başlangıç ne olursa olsun; her ikiye katlama aynı 3,71 W/m²'yi ekler. Sayfanın oyuncak bant modeli bir nedenini gösterir: bant merkezi çoktan opaktır, yeni CO₂ kanatları kapatır ve kapanan genişlik ln C ile büyür. Gerçek tayf binlerce soğurma çizgisinden oluşur ve çizgiler basınçla genişler; logaritmik davranış tek bir bandın değil, bu ayrıntılı hesapların sonucudur. Denge sıcaklık değişimi ΔT = λΔF yazılır. IPCC AR6 (2021) denge iklim duyarlılığı için en iyi tahmini 3 °C, “olası” (likely) aralığı da yüksek güvenle 2,5–4 °C olarak verir.",
      formula: "ΔF = 5,35 ln(C/C₀) W/m²",
      formulaNote: "AR6 aralığını 3,71 W/m²'ye bölmek λ ≈ 0,67–1,08 K/(W/m²) verir; bu dönüşüm sayfanın basitleştirmesidir.",
    },
    {
      heading: "Geçici yanıt, kazanç ve iki denge",
      body:
        "Okyanus ısıyı iki hızda alır. İki kutulu modelde yüzey birkaç yılda yanıtın bir kısmına ulaşır; kalanı derin okyanus ısındıkça yüzyıllarca süren yavaş bir kipte gelir. Zaman sabitleri 2×2 sistemin özdeğerleridir. <strong>Geri besleme</strong> ise ısınmanın kendisinin ek zorlama üretmesidir: her tur bir öncekinin f katını eklerse toplam 1 + f + f² + … = 1/(1 − f) olur; f'nin 1'e yaklaşması kazancı hızla büyütür. Sıcaklıkla değişen bir albedo ise denge eğrisini kıvırabilir: aynı güneş akısında buzlu ve sıcak iki kararlı durum, aralarında kararsız bir denge ve geçmişe bağlı bir <strong>histerezis</strong> döngüsü ortaya çıkar. Buradaki f ve albedo eğrisi öğretim parametreleridir; tam modeller geri beslemeleri W m⁻² K⁻¹ biriminde tek tek hesaplar.",
      formula: "ΔT = λ<sub>P</sub>ΔF/(1 − f)",
      formulaNote: "λ<sub>P</sub> = 1/(4εσT₀³) Planck yanıtıdır. f = 0,5 kazancı 2 yapar, f = 0,75 ise 4.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var ve her biri bir oyuncak model: <strong>01 · Enerji dengesi</strong> sıfır boyutlu bir gezegeni zaman içinde dengeye götürür ve gevşeme süresini eğriden ölçer; <strong>02 · Katmanlı atmosfer</strong> gri katmanların enerji dengesini yinelemeyle çözer; <strong>03 · Radyatif zorlama ve duyarlılık</strong> logaritmik formülü bir oyuncak bantla karşılaştırır ve iki kutulu okyanusu koşturur; <strong>04 · Geri beslemeler</strong> buz–albedo dengelerini ve geri besleme kazancını gösterir. Her kartta ölçülen değer kuramın yanında durur. 1. sekmede her parametre değişikliği koşuyu yeniden başlatır; sonucu hemen görmek için <strong>Sonuna atla</strong>'ya bas. <kbd>Boşluk</kbd> koşuyu duraklatır, <kbd>R</kbd> etkin sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Isı sığası yolu değiştirir, dengeyi değil",
        predict: "Eşdeğer su derinliğini 50 m'den 100 m'ye çıkarırsan denge sıcaklığı T* ve gevşeme süresi τ ne olur?",
        do: "Enerji dengesi sekmesinde varsayılan Dünya ile Sonuna atla'ya bas. Sonra Isı sığası: eşdeğer su derinliği h'yi 100 m yapıp yine Sonuna atla. Son olarak h'yi 50 m'ye döndür, Başlangıç sıcaklığı T₀'ı 330 K yap.",
        observe: "Varsayılanda T* 255,12 K, ölçülen τ 1,7616 yıl, doğrusal kuram 1,761 yıl (fark +0,037 %). 100 m'de T* aynı, τ 3,5232 yıl (kuram 3,5219). 330 K'den başlayınca fark −0,037 % olur, işaret döner; ilk 1/e süresi 200 K'deki 2,170 yıldan 1,344 yıla iner.",
        explain: "T* yalnız akı dengesinden gelir, C içermez; τ = C/(4εσT*³) ise C ile doğru orantılıdır. Ölçümle kuram arasındaki küçük fark adım hatası değil, T⁴'ün doğrusal olmayışıdır: soğuk taraftan gelen gezegen daha az yayar ve dengeye daha yavaş yaklaşır, sıcak taraftan gelen daha hızlı.",
      },
      {
        title: "Bir katman, iki katman, uydurma",
        predict: "Tam soğuran tek katman Dünya'nın yüzeyini kaç kelvine çıkarır? İkinci katman aynı miktarı mı ekler?",
        do: "Katmanlı atmosfer sekmesinde varsayılanı (Tam, N = 1) oku. Katman sayısı N'yi 2 yap. Sonra Tek katmanı 288 K'e uydur düğmesine bas.",
        observe: "N = 1'de yüzey 303,393 K, kapalı formülle fark 0,000000 K; eşdeğer yayım yüksekliği 7,43 km. N = 2'de 335,759 K: ikinci katman ilkinden daha az ekler. Uydurma ε'u 0,77 yapar ve yüzey 288,091 K olur; durum satırı yüzey ışımasının 23,0 %’sinin hiçbir katmana takılmadan uzaya kaçtığını yazar.",
        explain: "Tam soğuran katmanlarda T<sub>s</sub> = T<sub>e</sub>(N + 1)<sup>1/4</sup>: dördüncü kök yüzünden her katman bir öncekinden az ekler. 288 K'i veren tam ε 0,7685'tir; kaydırıcının 0,01 adımı onu 0,77'ye yuvarlar. Kaçan pay tek katmanda 1 − ε'dur. Gerçek atmosfer gri olmadığı ve ısıyı konveksiyon da taşıdığı için bu ε gözlenen bir büyüklük değil, modelin uydurma parametresidir.",
      },
      {
        title: "Logaritma ve iki zaman ölçeği",
        predict: "278 → 556 ppm ile 556 → 1.112 ppm aynı zorlamayı mı verir? Ani bir ikiye katlamadan 70 yıl sonra yüzey, denge yanıtının ne kadarına ulaşmış olur?",
        do: "Radyatif zorlama ve duyarlılık sekmesinde alttaki tabloda 278 ve 556 satırlarını karşılaştır, 1 ppm satırına bak. Sonra Sonuna atla. Ardından Senaryo menüsünden Rampa'yı seçip yine Sonuna atla.",
        observe: "Her iki satırda ΔF 3,708 W/m²; 1 ppm satırında bant integrali 2,796 W/m² (−24,60 %). Ani senaryoda hızlı zaman sabiti 4,092 yıl, yavaş 226,25 yıl; 70. yılda ΔT<sub>s</sub> +2,176 K, denge yanıtının (+3,004 K) 72,5 %’si. Rampada 70. yılda +1,933 K (64,4 %).",
        explain: "ln(2C₀/C₀) = ln 2 her C₀ için aynıdır; bant merkezi henüz doymamış çok düşük derişimlerde bu kural bozulur. Yüzey kutusu hızlı kiple birkaç yılda ısınır, ama derin okyanus ısı çektikçe tam dengeye yüzyıllar gerekir. Rampanın 70. yılı, geçici iklim yanıtı tanımına benzeyen bir model büyüklüğüdür.",
      },
      {
        title: "İki iklim, tek Güneş",
        predict: "Güneş akısı aynıyken (S/S₀ = 1) gezegenin hangi sıcaklığa yerleşeceği başlangıç sıcaklığına bağlı olabilir mi?",
        do: "Geri beslemeler sekmesinde Koşunun başlangıç sıcaklığı 230 K iken Bu S'de koştur; sonra 270 K yapıp yeniden koştur. Ardından S'yi yukarı ve aşağı tara düğmesine bas ve dallanma diyagramını izle.",
        observe: "Dengeler: 247,8 K kararlı, 261,2 K kararsız, 289,8 K kararlı. 230 K'den başlayan koşu 247,80 K'e (albedo 0,615), 270 K'den başlayan 289,79 K'e varır. Taramada buzlu daldan kaçış 1,060 – 1,065, sıcak daldan çöküş 0,830 – 0,835 aralığında; kuramdaki kıvrımlar 1,0629 ve 0,8334.",
        explain: "R(T)'nin üç sıfırı vardır; eğimi negatif olanlar kararlıdır. Kararsız denge iki çekim havzasını ayırır. Kıvrımlarda kararlı ve kararsız dal birleşip yok olur, gezegen öbür dala sıçrar; geri dönüş başka bir S'de olur. Bu histerezis, eğrinin öğretim parametrelerine dayanan kavramsal bir modeldir.",
      },
    ],
  },
  wow: [
    {
      title: "Venüs'ün kara cisim sıcaklığı Dünya'nınkinden düşük",
      body:
        "NASA'nın Venüs bilgi sayfasına göre Venüs, Dünya'nın neredeyse iki katı güneş akısı (2.601,3 W/m²) alır ama Bond albedosu 0,77'dir; kara cisim sıcaklığı yalnız 226,6 K çıkar. Ortalama yüzey sıcaklığı ise 737 K. Sayfanın 1. sekmesindeki tabloda bu fark +510,4 K olarak durur: aynı enerji dengesi, çok kalın bir CO₂ atmosferinin altında.",
    },
    {
      title: "Bir kadın, bir cam tüp, 1856",
      body:
        "Eunice Newton Foote, güneşe bıraktığı tüplerden karbondioksitlisinin en çok ısındığını Tyndall'ın ölçümlerinden üç yıl önce yazdı; düzeneği kızılötesini ayırmadığı için bu, sera etkisinin doğrudan ölçümü değil, öncü bir gözlemdi. Çalışmasını Ağustos 1856'da Amerikan Bilimi İlerletme Derneği'nin toplantısında kendisi değil, Joseph Henry okudu; makale aynı yıl American Journal of Science and Arts'ta çıktı.",
    },
    {
      title: "315,71'den 426,07'ye",
      body:
        "NOAA'nın Mauna Loa kaydında Mart 1958'in aylık ortalaması 315,71 ppm, Eylül 2026'nınki 426,07 ppm'dir (12 Kasım 2026'da okundu; son yılın verisi ön değerdir). Mevsimlik salınım ayıklanınca aynı iki ay 314,44 ve 429,55 ppm olur. NOAA'nın küresel aylık ortalaması Temmuz 2026 için 426,10 ppm; sayfanın 3. sekmesinde sanayi öncesi başlangıç olarak kullanılan 1750 değeri 278 ppm'dir.",
    },
  ],
  worked: {
    title: "Dünya'nın enerji bütçesi, adım adım",
    prompt:
      "Dünya için S = 1.361 W/m², α = 0,294 ve ε = 1 al. (a) Soğurulan akıyı ve denge sıcaklığını bul. (b) 50 m'lik su katmanına eşdeğer ısı sığasıyla gevşeme süresini hesapla. (c) CO₂ 278'den 556 ppm'e çıkarsa zorlamayı, geri beslemesiz (Planck) sıcaklık yanıtını ve sayfanın λ = 0,81 K/(W/m²) varsayımıyla denge yanıtını bul.",
    steps: [
      "Soğurulan akı: S(1 − α)/4 = 1.361 × 0,706 / 4 = 240,2 W/m². Denge: T* = (240,2165 / 5,670 × 10⁻⁸)<sup>1/4</sup> = 255,12 K, yani −18,0 °C. Enerji dengesi sekmesinin varsayılanı tam bu sayıları gösterir.",
      "Isı sığası: C = ρc·h = 4,186 × 10⁶ J m⁻³ K⁻¹ × 50 m = 2,093 × 10⁸ J m⁻² K⁻¹. Doğrusallaştırılmış geri çağırma katsayısı 4σT*³ = 3,766 W m⁻² K⁻¹.",
      "τ = C/(4σT*³) = 2,093 × 10⁸ / 3,766 ≈ 5,56 × 10⁷ s; bir yıl 3,156 × 10⁷ s olduğundan τ ≈ 1,761 yıl. Sonuna atla ile sayfa 1,7616 yıl ölçer; aradaki +0,037 %, 200 K'den başlamanın doğrusal olmayış izidir.",
      "Zorlama: ΔF = 5,35 ln(556/278) = 5,35 × 0,6931 = 3,708 W/m². Planck yanıtı λ<sub>P</sub> = 1/(4σT*³) = 0,2655 K/(W/m²), dolayısıyla geri beslemesiz ΔT₀ ≈ 0,98 K.",
      "λ = 0,81 K/(W/m²) ile ΔT = λΔF = 3,004 K; Radyatif zorlama sekmesinin varsayılan Denge yanıtı kartı +3,004 K gösterir. Bu model çerçevesinde λ/λ<sub>P</sub> = 3,05 kazancı, 1/(1 − f) ile f ≈ 0,67'lik toplam bir geri beslemeye karşılık gelir.",
    ],
    result:
      "Soğurulan 240,2 W/m², T* = 255,12 K, τ ≈ 1,76 yıl; ikiye katlamada ΔF = 3,708 W/m², geri beslemesiz yaklaşık 1 K, λ = 0,81 ile 3,0 K. Son sayı bir model sonucudur; AR6'nın 2,5–4 °C “olası” aralığı ise gözlemleri, süreç bilgisini ve tam modelleri birlikte değerlendirir.",
  },
  misconceptions: [
    {
      myth: "Sera gazları enerji yaratır ya da gelen güneş ışığını artırır.",
      truth:
        "Katmanlı atmosfer sekmesinde Uzaya giden akı kartı her N ve ε için soğurulan güneş akısına, 240,2 W/m²'ye eşittir. Değişen, yüzeye inen kızılötesidir: aynı enerji yüzey ile katman arasında daha çok gidip gelir ve yüzey bütçesini daha yüksek bir sıcaklıkta kapatır.",
    },
    {
      myth: "CO₂'nin soğurma bandı zaten doymuş; daha fazla CO₂ hiçbir şey değiştirmez.",
      truth:
        "Bant merkezi opaktır, ama kanatlar opak değildir; eklenen gaz kanatları kapatır. Bu yüzden zorlama derişimle doğrusal değil logaritmik büyür ve her ikiye katlama aynı yaklaşık 3,7 W/m²'yi ekler. Sayfanın bant tablosu, merkezin henüz doymadığı çok düşük derişimlerde kuralın nasıl bozulduğunu da gösterir.",
    },
    {
      myth: "Zorlama sabitlenince sıcaklık da hemen yeni değerine oturur.",
      truth:
        "İki kutulu modelde ani ikiye katlamadan 70 yıl sonra yüzey, denge yanıtının yalnız 72,5 %’sine ulaşmıştır; bu modelde yavaş kipin zaman sabiti 226 yıldır. Geçici yanıt ile denge yanıtı farklı büyüklüklerdir.",
    },
    {
      myth: "Güneş akısı aynıysa gezegenin sıcaklığı da tek bir değerdir.",
      truth:
        "Sıcaklıkla değişen albedo birden çok dengeye izin verebilir. Geri beslemeler sekmesinde S/S₀ = 1'de 230 K'den başlayan koşu 247,80 K'e, 270 K'den başlayan 289,79 K'e varır: hangi dengede olduğun geçmişe bağlıdır.",
    },
  ],
  glossary: [
    { term: "Bond albedosu (α)", definition: "Gezegene gelen güneş enerjisinin bütün dalga boyları ve yönler üzerinden geri yansıyan payı." },
    { term: "Etkin sıcaklık (T<sub>e</sub>)", definition: "Soğurulan güneş akısını tek başına σT⁴ ile yayarak dengeleyecek kara cismin sıcaklığı; Dünya için yaklaşık 255 K." },
    { term: "Gri atmosfer", definition: "Kızılötesi soğurganlığı dalga boyundan bağımsız tek bir ε sayısıyla temsil edilen ve güneş ışığına saydam sayılan model atmosfer." },
    { term: "Radyatif zorlama (ΔF)", definition: "Bir değişikliğin, sıcaklık yanıt vermeden önce gezegenin enerji bütçesine eklediği net akı; W/m² ile ölçülür." },
    { term: "Denge iklim duyarlılığı (ECS)", definition: "CO₂'nin ikiye katlanmasından sonra iklim yeniden dengeye vardığında küresel ortalama yüzey sıcaklığının toplam değişimi." },
    { term: "Geçici iklim yanıtı (TCR)", definition: "CO₂ yılda %1 artarken ikiye katlandığı zaman çevresindeki 20 yıllık ortalamada görülen sıcaklık artışı; okyanus henüz dengeye varmamıştır." },
    { term: "Geri besleme oranı (f)", definition: "Isınmanın her turda kendi Planck yanıtının f katı kadar ek ısınma üretmesi; toplam kazanç 1/(1 − f)." },
    { term: "Histerezis", definition: "Sistemin durumunun yalnız bugünkü parametreye değil geçmişine de bağlı olması; ileri ve geri taramada sıçramaların farklı yerlerde olması." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın her sekmesi bir lisans dersinin ilk sayfasıdır. Sıfır boyutlu denge ve gevşeme, <strong>Diferansiyel Denklemler</strong> dersinin özerk denklemleri ve doğrusallaştırmasıdır; iki kutulu model 2×2 doğrusal bir sistemdir ve zaman sabitleri özdeğerlerdir; buz–albedo dengeleri ise <strong>dallanma kuramının</strong> eyer-düğüm kıvrımlarıdır. Gri katmanlar, <strong>Atmosfer Fiziği</strong> ve <strong>Işınım Aktarımı</strong> derslerinde dalga boyuna bağlı soğurma katsayısıyla yazılan Schwarzschild denklemine dönüşür; orada yayım yüksekliği her dalga boyu için ayrıdır.",
      "Tam iklim modelleri (GCM) bu yalınlıktan çok uzaktır: dönen bir küre üzerinde akışkanlar dinamiği denklemlerini atmosfer ve okyanus için ızgaralarda çözer, ızgaradan küçük bulut ve konveksiyon süreçlerini parametrelerle temsil eder ve sonuçları çok sayıda koşudan oluşan topluluklarla değerlendirir. <strong>Termodinamik</strong>, <strong>Jeofizik Akışkanlar Dinamiği</strong> ve <strong>Sayısal Yöntemler</strong> bu yolun temel taşlarıdır. Oyuncak modellerin değeri, büyük modellerin içinde neye bakılacağını öğretmeleridir.",
    ],
    topics: ["Işınım aktarımı", "Stefan–Boltzmann yasası", "Doğrusallaştırma ve kararlılık", "Özdeğerler ve zaman ölçekleri", "Dallanma ve histerezis", "Jeofizik akışkanlar dinamiği", "Genel dolaşım modelleri"],
  },
  quiz: [
    {
      question: "ΔF = 5,35 ln(C/C₀) ise CO₂ derişimi sanayi öncesi 278 ppm'den 1.112 ppm'e (dört katına) çıktığında zorlama yaklaşık ne olur?",
      options: ["3,7 W/m²", "7,4 W/m²", "11,1 W/m²", "14,8 W/m²"],
      answer: 1,
      explanation: "Dört kat iki ikiye katlamadır: ln 4 = 2 ln 2, yani 2 × 3,71 ≈ 7,4 W/m². Logaritma yüzünden zorlama derişimle değil, katlama sayısıyla büyür; tablodaki 278 ve 556 satırlarının aynı 3,708 W/m²'yi vermesi bunun sayfadaki karşılığıdır.",
    },
    {
      question: "Tam soğuran gri katman modelinde N = 3 katman varsa yüzey sıcaklığı etkin sıcaklığın kaç katıdır?",
      options: ["3 katı", "4 katı", "√2 ≈ 1,41 katı", "4<sup>1/3</sup> ≈ 1,59 katı"],
      answer: 2,
      explanation: "T<sub>s</sub> = T<sub>e</sub>(N + 1)<sup>1/4</sup> = T<sub>e</sub> · 4<sup>1/4</sup> = √2 · T<sub>e</sub>. Dünya için 255,12 × 1,414 = 360,8 K; sayfada N = 3 seçince 360,797 K görürsün. Dördüncü kök, her yeni katmanın bir öncekinden az eklemesinin nedenidir.",
    },
    {
      question: "Doğrusal geri besleme modelinde f = 0,5 kazancı 2 yapar. f 0,75'e çıkarsa kazanç ne olur?",
      options: ["2,5 olur", "3 olur", "4 olur", "2 kalır"],
      answer: 2,
      explanation: "Kazanç 1/(1 − f) = 1/0,25 = 4. f'deki yüzde 50'lik artış kazancı iki katına çıkardı: f 1'e yaklaştıkça kazanç orantısız büyür, f'deki küçük bir belirsizlik yanıtta büyük bir belirsizliğe dönüşür.",
    },
  ],
  next: [
    { href: "kara-cisim-isimasi.html", title: "Kara Cisim Işıması: Planck, Wien ve Stefan–Boltzmann", why: "σT⁴ yasasının kaynağı Planck eğrisi; Gezegen sıcaklığı sekmesinde aynı enerji dengesini uzaklık ve albedoyla kur." },
    { href: "atmosfer-ve-hava.html", title: "Atmosfer ve Hava: Basınç, Bulut Tabanı, Kararlılık ve Coriolis", why: "Sıcaklığın yükseklikle neden düştüğü: kuru ve nemli adyabatik oran ve kararlılık; buradaki Γ'nın fiziksel arka planı." },
    { href: "diferansiyel-denklemler.html", title: "Diferansiyel Denklemler ve Dinamik Sistemler: Yön Alanından Rezonansa", why: "Doğrusal sistemlerin özdeğerleri ve doğrusal olmayan sistemlerde denge kararlılığı: iki kutu ve buz–albedo dengelerinin matematiği." },
    { href: "okyanus-ve-gelgitler.html", title: "Okyanus ve Gelgitler: Gelgit Kuvveti, Deniz Suyu ve Dalgalar", why: "Tuzluluk ve sıcaklığın deniz suyu yoğunluğunu nasıl belirlediği; okyanusun neden yüzey ve derin diye katmanlaştığını orada gör." },
  ],
  sources: [
    { title: "Wikipedia · History of climate change science", url: "https://en.wikipedia.org/wiki/History_of_climate_change_science", note: "Fourier 1824, Foote 1856 (Joseph Henry'nin sunumu), Tyndall 1859, Arrhenius 1896 (5–6 °C), Callendar 1938, Manabe–Wetherald 1967, Budyko ve Sellers 1969 (İngilizce)." },
    { title: "NOAA GML · Trends in Atmospheric Carbon Dioxide (Mauna Loa)", url: "https://gml.noaa.gov/ccgg/trends/", note: "Keeling'in Mart 1958'de başlattığı kayıt; aylık ortalamalar, Eylül 2026: 426,07 ppm (12 Kasım 2026'da okundu; İngilizce)." },
    { title: "Wikipedia · Syukuro Manabe", url: "https://en.wikipedia.org/wiki/Syukuro_Manabe", note: "Tek sütunlu ışınım–konveksiyon modeli, stratosferin soğuması; 2021 Nobel Fizik Ödülü'nün paylaşımı (İngilizce)." },
    { title: "Wikipedia · Radiative forcing", url: "https://en.wikipedia.org/wiki/Radiative_forcing", note: "ΔF = 5,35 ln(C/C₀) (Myhre vd. 1998), ikiye katlamada 3,71 W/m², 1750 için 278 ppm (İngilizce)." },
    { title: "Wikipedia · Climate sensitivity", url: "https://en.wikipedia.org/wiki/Climate_sensitivity", note: "IPCC AR6 (2021): ECS için en iyi tahmin 3 °C, yüksek güvenle 2,5–4 °C aralığında; TCR tanımı (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
