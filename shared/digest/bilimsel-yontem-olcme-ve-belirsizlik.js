window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["bilimsel-yontem-olcme-ve-belirsizlik"] = {
  slug: "bilimsel-yontem-olcme-ve-belirsizlik",
  title: "Ölçme ve Belirsizlik: Bir Sayının Ne Kadarı Bilgi?",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Her ölçüm üç şey taşır: sayı, birim ve belirsizlik. Bir ölçeği oku, belirsizliği formülden ve Monte Carlo ile geçir, sistematik hatayı kalibrasyonla yakala, modelini artıklara sorgulat.",
  hook:
    "Milimetre bölmeli bir cetvelle okunan 400 uzunluğun hiçbiri yarım milimetreden fazla yanılmaz; yine de \"belirsizlik ± 0,5 mm\" demek yanlış olur. Doğru sayı 0,29 mm'dir. On bin ölçümün ortalaması ise gerçek değerden 0,63 mm uzakta durmaya devam edebilir. Bu iki şaşırtıcı sayının nedeni aynı soruda: belirsizlik tam olarak neyi ölçer?",
  bigIdea:
    "Standart belirsizlik hatanın aşamayacağı bir sınır değil, <strong>standart sapma olarak ifade edilmiş</strong> belirsizliktir: nereden geldiği (A ya da B türü) bellidir, formüllerden kurallı biçimde geçer ve yalnız rastgele kısım ortalamayla küçülür; sistematik kısım ancak bir referansla karşılaştırarak bulunur.",
  story: [
    "1 Ocak 1801'de Palermo'da Giuseppe Piazzi yeni bir gök cismi buldu: Ceres. Onu 11 Şubat'a kadar, yaklaşık kırk gün boyunca 24 kez gözledi; sonra hastalandı, cisim de Güneş'in parıltısına girdi. Elde kısa bir yay boyunca alınmış birkaç kusurlu gözlem vardı ve yörüngeyi onlardan çıkarmak gerekiyordu. 24 yaşındaki Carl Friedrich Gauss yeni bir yörünge belirleme yöntemiyle bir öngörü hesapladı; Franz Xaver von Zach 31 Aralık 1801'de, ertesi gece de Heinrich Olbers, Ceres'i öngörülen yerin yakınında yeniden buldu. Gauss'un sonradan anlattığına göre hesabın arkasında, gözlem hatalarının karelerinin toplamını en küçük yapma fikri vardı: <strong>en küçük kareler</strong>. Yöntemin 1801'deki hesapta ne kadar kullanıldığını yalnız Gauss'un kendi anlatımından biliyoruz. Yöntemin ilk açık ve derli toplu anlatımını ise 1805'te Adrien-Marie Legendre kuyruklu yıldız yörüngeleri üzerine kitabında yayımladı. Gauss 1809'da kendi yöntemini yayımlarken onu 1795'ten beri kullandığını söyledi ve iki matematikçi arasında ünlü bir öncelik tartışması başladı.",
    "Ölçümlerin insan yüzü de vardır. 1796'da Kraliyet Astronomu Nevil Maskelyne, yıldızların geçiş zamanlarını kendisinden farklı kaydeden yardımcısı Kinnebrook'u işten çıkardı. Yaklaşık yirmi yıl sonra Königsberg'de Friedrich Wilhelm Bessel aynı soruyu sistemli biçimde inceledi ve kendi kayıtlarının başka bir gözlemcininkinden bir saniyeden fazla önde olduğunu buldu. Sorun dikkatsizlik değildi: her gözlemcinin kendine özgü, kararlı bir gecikmesi vardı. Astronomlar buna <strong>kişisel denklem</strong> dediler. Bu, ortalama almakla yok olmayan bir hatanın, yani <em>sistematik</em> hatanın ilk belgelenmiş örneklerindendir.",
    "Yirminci yüzyılın ortasında laboratuvarlar belirsizliği hâlâ farklı biçimlerde yazıyordu: kimi en büyük hatayı, kimi standart sapmayı, kimi üç sigmayı. 1977'de Uluslararası Ölçüler ve Ağırlıklar Komitesi (CIPM) bu dağınıklığı ele alması için BIPM'e başvurdu; 1980'de hazırlanan INC-1 önerisi 1981'de onaylandı. CIPM, ayrıntılı kılavuzu yazma işini ISO'ya verdi. Ortaya çıkan <em>Guide to the Expression of Uncertainty in Measurement</em> (kısaca <strong>GUM</strong>), 1993'te ISO tarafından yedi uluslararası kuruluş adına yayımlandı ve 1995'te düzeltilerek yeniden basıldı. Bugünkü sürümü JCGM 100:2008'dir; aynı yıl Monte Carlo ile dağılım yayan Ek 1 (JCGM 101:2008) geldi. Bu sayfadaki A türü, B türü, u_c ve k kelimeleri o kılavuzun ortak dilidir.",
  ],
  core: [
    {
      heading: "Ölçüm = sayı + birim + belirsizlik",
      body:
        "\"Masa 120\" yarım bir cümledir; \"(120,0 ± 0,3) cm\" bir ölçümdür. GUM'un tanımıyla <strong>standart belirsizlik</strong> u, ölçüm sonucunun standart sapma olarak ifade edilen belirsizliğidir. Onu iki yoldan değerlendirirsin. <strong>A türü</strong>: aynı ölçümü tekrarlayıp istatistikle (03. sekmedeki s ve s/√n). <strong>B türü</strong>: başka bilgiyle, örneğin bir ölçeğin çözünürlüğünden, bir sertifikadan ya da üretici belgesinden. NIST'in deyişiyle B türü değerlendirme çoğunlukla bilimsel yargıya dayanır. İki tür aynı birimde ve aynı anlamda bir standart sapma verir; bu yüzden toplanabilirler.",
      formula: "u<sub>c</sub>² = u<sub>A</sub>² + u<sub>B</sub>²",
      formulaNote: "Birbirinden bağımsız bileşenler kareleri üzerinden toplanır; birleşik standart belirsizlik u_c bu toplamın kareköküdür.",
    },
    {
      heading: "Yarım bölme bir sınırdır, a/√3 bir standart sapma",
      body:
        "En yakın bölmeye okunan bir cetvelde hata −0,5 mm ile +0,5 mm arasında herhangi bir yere eşit olasılıkla düşer. Bu <strong>dikdörtgen (düzgün)</strong> dağılımın yarım genişliği a = 0,5 mm'dir; standart sapması ise a/√3 = 0,29 mm. Türetmesi kısadır: düzgün dağılımda varyans ∫ x² dx/(2a), −a'dan a'ya, yani a²/3'tür. Sayfada 400 okumanın karekök ortalama hatası 0,284 mm çıkar: kuramdan yalnız % 1,6 aşağıda. ± a'yı u yerine yazmak belirsizliği √3 ≈ 1,73 kat abartır ve bütçede o bileşene haksız bir ağırlık verir.",
      formula: "u = a/√3",
      formulaNote: "a yarım genişlik. Değerlerin yalnız % 57,7'si ±u içine düşer; ±2u hepsini kapsar, çünkü 2/√3 > 1.",
    },
    {
      heading: "Basamak, kanıttan büyük olamaz",
      body:
        "Anlamlı basamak kuralları (çarpım ve bölümde en az anlamlı basamak, toplam ve farkta en kaba son basamak) belirsizliğin hızlı bir vekilidir, kendisi değil. 3,4 × 2,157 için kural 7,3 der; ama her girdinin örtük belirsizliğini (son basamağın yarısı, a/√3) yaydığında u = 0,062 çıkar ve sonuç 7,334 ± 0,062 diye raporlanır. Bu karşılaştırma iki uzlaşmaya yaslanır: örtük belirsizliğin son basamağın yarısı sayılması (en iyimser okuma) ve u'nun iki anlamlı basamakla yazılması. GUM 7.2.6 u'yu \"en çok iki anlamlı basamakla\" vermeyi yeterli bulur; sayfa bu üst sınırı kullanır ve kuralın iki basamak az bıraktığını söyler. u'yu tek basamakla yazan ders kitabı uzlaşmasında sonuç 7,33 ± 0,06 olurdu: kural yine bir basamak eksik kalır. Yakın iki sayının farkında ise tersi olur: 10,03 − 10,01 = 0,0200 ± 0,0041, göreli belirsizlik % 20.",
      formula: "y = 7,334 ± 0,062 (u iki anlamlı basamak)",
      formulaNote: "Değerin son basamağı, belirsizliğin son basamağıyla aynı yere düşer.",
    },
    {
      heading: "Belirsizlik yayılımı ve doğrusallaştırmanın sınırı",
      body:
        "y = f(x₁, x₂, …) ise her girdinin payı, f'nin o girdiye göre kısmi türevi olan <strong>duyarlılık katsayısı</strong> c_i = ∂f/∂x_i ile ölçeklenir. Bağımsız girdilerde paylar kareler hâlinde toplanır; korelasyon r varsa 2r·c₁u₁·c₂u₂ terimi eklenir. Çarpım ve bölümde bu, göreli belirsizliklerin üslerle ağırlıklanmış karesel toplamına dönüşür: g = 4π²L/T² için u_c/g = √[(u_L/L)² + (2u_T/T)²]. Bu birinci mertebe Taylor açılımıdır; f, girdinin belirsizlik ölçeğinde neredeyse doğru değilse çöker. 1/x'te x = 0,50 ± 0,20 iken dağılım sağa çarpılır, x'in sıfırı geçme olasılığı 0,0062 olur ve 1/x'in ortalaması da varyansı da tanımsız kalır. (Kesin konuşmak gerekirse normal dağılımlı her x için öyledir; sıfırı geçme olasılığı 10⁻⁶'nın altındayken sayfa bunu pratikte yok sayar.) O zaman GUM Ek 1'in önerdiği yol, dağılımın kendisini Monte Carlo ile yaymaktır.",
      formula: "u<sub>c</sub>² = Σ (c<sub>i</sub> u<sub>i</sub>)² + 2r·c₁u₁·c₂u₂",
      formulaNote: "Genişletilmiş belirsizlik U = k·u_c; normal dağılımda k = 2 yaklaşık % 95 güven düzeyi verir.",
    },
    {
      heading: "Ağırlıklı en küçük kareler, χ²/ν ve artıklar",
      body:
        "Her noktanın kendi σ_i'si varsa, uydurma χ² = Σ[(y_i − f(x_i))/σ_i]² toplamını en küçük yapar: güvenilir noktalar daha çok söz sahibidir. Doğru için çözüm kapalı biçimdedir: Δ = S·S_xx − S_x², eğimin varyansı S/Δ (S = Σ1/σ_i²). Uydurmanın kalitesini iki ayrı soru sınar. <strong>χ²/ν</strong> (ν = N − parametre sayısı) 1'e yakın mı? Çok büyükse ya model yanlıştır ya da hata çubukları küçük beyan edilmiştir; çok küçükse çubuklar şişirilmiştir. <strong>Artıkların işaret dizisi</strong> rastgele mi? Doğru yere uydurulmuş bir parabolün artıkları \"gülümser\": uçlarda artı, ortada eksi; Wald–Wolfowitz dizi testi bunu z değeriyle ölçer. Kuvvet yasası y = A·x^p ise ln y = ln A + p·ln x yazılır ve log–log grafikte eğim üssü verir.",
      formula: "χ² = Σ [(y<sub>i</sub> − f(x<sub>i</sub>))/σ<sub>i</sub>]²,  beklenen χ²/ν ≈ 1",
      formulaNote: "Hata çubuklarını yarıya indirmek χ²'yi dört katına çıkarır; doğru modelde bile χ²/ν ≈ 4 olur.",
    },
  ],
  lab: {
    intro:
      "Sayfanın dört sekmesi var. <strong>01 · Anlamlı basamak ve yuvarlama</strong> bir ölçeği okutur, 400 okumanın hatasını sayar, hesaplanan sonuçların basamaklarını belirsizlikle karşılaştırır ve iki yuvarlama kuralını yarıştırır. <strong>02 · Belirsizlik yayılımı</strong> doğrusal formülü Monte Carlo ile yan yana koyar. <strong>03 · Sistematik ve rastgele hata</strong> canlı bir ölçme masasıdır: sıfır kayması, eğim hatası ve gürültü ayrı ayrı ayarlanır, istenince referans mastarlarla kalibre edilir. <strong>04 · Grafik uydurma ve artıklar</strong> ağırlıklı en küçük kareler yapar, χ²/ν ve işaret dizisi testiyle modeli sorgular. Bütün rastgelelik tohumludur: aynı tohum aynı sayıları verir. Her sekmenin bir <em>Sekmeyi sıfırla</em> düğmesi var; R tuşu etkin sekmeyi varsayılana döndürür.",
    experiments: [
      {
        title: "Yarım bölme mi, a/√3 mü?",
        predict: "Milimetre bölmeli cetveli en yakın bölmeye okuyan biri 400 farklı nesnede tipik olarak ne kadar yanılır: 0,5 mm mi, daha az mı? Okumaların yüzde kaçı ±u içine düşer?",
        do: "01. sekmede varsayılanla başla (Ölçme aracı: Cetvel, Okuyucunun kestirimi: En yakın bölmeye). 400 okumanın kartlarına bak. Sonra kestirimi \"Bölmenin beşte birine\" al; ardından aracı Verniyeli kumpas yap.",
        observe: "Cetvelde en büyük |hata| 0,500 mm, yani tam a; hataların karekök ortalaması ise 0,284 mm (kuram u = 0,289 mm) ve okumaların 58,0 %'si ±u içinde, 100,0 %'ü ±2u içinde. Beşte bir kestirimde u = 0,058 mm, karekök ortalama 0,0581 mm, oran 59,3 %. Kumpasta u kartı 0,029 mm gösterir; karekök ortalama 0,0296 mm (kuram 0,0289 mm), oran 56,3 %.",
        explain: "±a, hatanın aşamayacağı bir sınırdır; u ise hatanın standart sapmasıdır. Düzgün dağılımda σ = a/√3 ve ±σ içine düşme olasılığı 1/√3 = % 57,7'dir. Histogramdaki düz turuncu çizgi bu dikdörtgen beklentidir: hatalar ortada yığılmaz, her yere eşit dağılır.",
      },
      {
        title: "Sarkaçtan g, sonra 1/x'in çöküşü",
        predict: "g = 4π²L/T² ölçümünde L'nin göreli belirsizliği % 0,2, T'ninki % 0,25. Hangisi sonuca daha çok belirsizlik taşır? 1/x'te x = 0,50 ± 0,20 olunca doğrusal formül yine iş görür mü?",
        do: "02. sekmede varsayılan sarkaç modeline bak (L = 1,000 ± 0,002 m, T = 2,006 ± 0,005 s), bütçe tablosunu oku. Sonra \"1/x: x = 0,50 ± 0,20\" hazırına, ardından \"1/x: x = 5,0 ± 0,2\" hazırına bas. Son olarak 0,50 ± 0,20 hazırına dön ve Monte Carlo örnek sayısı N'yi 1 000'den 200 000'e çıkar.",
        observe: "Sarkaçta g = 9,8107 m/s², u_c = 0,0527; bütçede T'nin payı 86,1 %, L'nin 13,9 %. MC standart sapması 0,0525 (−0,29 %); durum \"uyumlu\". 0,50 ± 0,20'de doğrusal aralık [0,432; 3,568], MC % 95 aralığı [1,095; 7,987]; ortalama ve SD \"tanımsız\". 5,0 ± 0,2'de u_c = 0,00800 ile MC SD'si 0,00804 uyuşur, ama aralığın iki ucu +0,15 u_c sağa kaymıştır: \"u_c yeterli, simetrik aralık değil\". N'yi 1 000'den 200 000'e çıkarınca örnek SD'si 13,8'den 143'e sıçrar; yüzdelik aralık ise kesin değere ([1,092; 7,853]) yaklaşır.",
        explain: "T karesiyle girdiği için göreli belirsizliği iki katıyla (% 0,5) geçer ve L'nin % 0,2'sini ezer: iyileştirilecek olan zamanlamadır. 1/x'te x'in yaklaşık % 0,6 olasılıkla sıfırın öbür yanına geçmesi dağılıma sonsuz uzun bir kuyruk ekler; örnek standart sapması N büyüdükçe durulmaz. Yüzdelik aralık ise anlamlı kalır, GUM Ek 1'in Monte Carlo'yu önermesinin nedeni de budur. % 4 göreli belirsizlikte bile 1/x hafifçe sağa çarpıktır: u_c iş görür, ama simetrik y ± 1,96·u_c aralığı bu asimetriyi göremez.",
      },
      {
        title: "On bin ölçümün ortalaması neyi düzeltir?",
        predict: "Sıfır kayması +0,30 mm, eğim 1,006 ve gürültü 0,50 mm olan bir alet. 10 000 ölçümün ortalaması gerçek konum X₀'a yaklaşır mı? Kalibrasyon neyi değiştirir?",
        do: "03. sekmede varsayılanla başla ve ölçümler aksın; isteyince \"Duraklat\"a basıp \"+100 ölçüm\" ile ilerle ya da Ölçüm hızı'nı 10 000 ölçüm/s yap. n yaklaşık 10 000 olunca \"Ortalamanın hatası\" ve \"Rastgele kısım\" kartlarına bak. Sonra \"Referansla kalibre et\"e bas ve yine 10 000 ölçüm bekle.",
        observe: "X₀ = 54,530 mm iken n ≈ 10 000'de ortalamanın hatası yaklaşık +0,626 mm; bunun +0,6272 mm'si sistematik, rastgele kısım standart hatanın (0,0050 mm) birkaç katı bile değil. Kalibrasyondan sonra eğim kestirimi 1,00845, sıfır kayması kestirimi +0,1827 mm; kalan sistematik hata −0,0159 mm (u_kal = 0,0791 mm'nin 0,20 katı), ortalamanın hatası n'ye göre −0,015 ile −0,017 mm arasında gezinir.",
        explain: "Sistematik hata b + (s − 1)·X₀ = 0,30 + 0,006 × 54,53 = 0,627 mm her ölçümde aynıdır; ortalama onu korur. Log–log grafikte s/√n doğrusu 1/√n ile iner, |ortalama − X₀| ise yatay sistematik çizgiye yaslanıp kalır. Kalibrasyon bu hatayı bilinen mastarlarla (10 mm ve 90 mm, 20'şer okuma) karşılaştırarak giderir ama yerine kendi belirsizliğini, u_kal'ı koyar.",
      },
      {
        title: "Artıklar modeli ele verir",
        predict: "Parabolik bir yasadan gelen 12 noktaya doğru uydurursan χ²/ν ne olur? Hata çubuklarını gerçek σ'nın yarısı olarak bildirirsen doğru modelde χ²/ν kaç çıkar?",
        do: "04. sekmede \"Yanlış model\" hazırına bas, artık grafiğine ve kartlara bak; sonra \"Doğru model\", \"Kuvvet yasası, log–log\" ve \"Küçük beyan\" hazırlarını dene. Her birinde \"500 tohumla sına\"ya bas.",
        observe: "Yanlış modelde χ²/ν 6,39 (p = 6,5 × 10⁻¹⁰), işaret dizisi 3 (beklenen 6,8 ± 1,6, z = −2,39); durum \"Model yanlış\". Doğru modelde c = 0,313 ± 0,041 (gerçek 0,30), χ²/ν 0,58; taramada tohumların 64,8 %'si gerçek c'yi ±σ içinde yakalar (kuram 68,3 %). Log–log'da p = 1,477 ± 0,021 (gerçek 1,5). Küçük beyanda χ²/ν 2,13 (p = 0,019, \"Sınırda\"); taramada ortalama χ²/ν 3,999 ve gerçek değeri ±σ içinde yakalayan tohumların oranı % 68,3 yerine 42,8 %.",
        explain: "Yanlış modelde artıklar uçlarda artı, ortada eksidir; işaret çok az değiştiği için dizi sayısı düşer. χ²/ν tek başına \"küçük beyan\" ile \"yanlış model\"i ayıramaz; dizi testi ayırır. σ'yı yarıya indirmek χ²'yi dört katına çıkarır ve parametre σ'larını yarıya indirir: kestirimin gerçek saçılımı değişmediği için kapsama çöker.",
      },
    ],
  },
  wow: [
    {
      title: "Kaybolan gezegenciği en küçük kareler buldu",
      body:
        "Ceres 1801'in ilk gününde bulundu, kırk gün izlendi ve Güneş'in parıltısında kayboldu. 24 yaşındaki Gauss'un birkaç gözlemden çıkardığı yörünge öngörüsüyle von Zach onu 31 Aralık 1801'de yeniden buldu. Gauss'un sonraki anlatımına göre, bugün her ders laboratuvarında doğru uydurmak için kullanılan en küçük kareler fikri o hesabın arkasındaydı; yöntemi ilk yayımlayan ise 1805'te Legendre oldu.",
    },
    {
      title: "İşten çıkarılan yardımcı ve kişisel denklem",
      body:
        "1796'da Kraliyet Astronomu Maskelyne, yıldız geçişlerini kendisinden farklı kaydeden yardımcısı Kinnebrook'u kovdu. Yaklaşık yirmi yıl sonra Bessel, kendi kayıtlarının başka bir gözlemcininkinden bir saniyeden fazla önde olduğunu buldu. Fark dikkatsizlikten değil, her gözlemcinin kararlı bir gecikmesinden geliyordu: ortalamayla yok olmayan, sistematik bir hata.",
    },
    {
      title: "Yarımı yukarı yuvarlamanın gizli vergisi",
      body:
        "Sayfada 1 000 değeri bir ondalığa yarımı yukarı yuvarla: toplam 5,11 artar (kuram +5). \"Hep 5\" kipinde, yani her değer tam yarıda dururken, bin değerin toplamı tam 50,00 şişer. Yarımı çifte yuvarlama ise yarıları bir aşağı bir yukarı göndererek kaymayı ortadan kaldırır; IEEE 754 kayan nokta standardının varsayılan yuvarlama kuralı da budur.",
    },
  ],
  worked: {
    title: "Sarkaçla g ölçümünün belirsizlik bütçesi",
    prompt:
      "Bir öğrenci L = (1,000 ± 0,002) m ve T = (2,006 ± 0,005) s ölçüyor (± değerleri standart belirsizlik). g = 4π²L/T² değerini, birleşik standart belirsizliği u_c'yi ve k = 2 ile genişletilmiş belirsizliği bul. Hangi girdi bütçeye hâkim? Payları eşitlemek için T'nin belirsizliği ne olmalı?",
    steps: [
      "Değer: g = 4π² × 1,000 m / (2,006 s)² = 39,478 / 4,0240 ≈ 9,8107 m/s².",
      "Göreli paylar: u_L/L = 0,002/1,000 = 0,0020. T'nin üssü 2 olduğu için 2u_T/T = 2 × 0,005/2,006 = 0,00498.",
      "Karesel toplam: (u_c/g)² = 0,0020² + 0,00498² = 4,0 × 10⁻⁶ + 24,9 × 10⁻⁶ = 28,9 × 10⁻⁶; u_c/g = 0,00537, yani u_c = 0,00537 × 9,8107 ≈ 0,0527 m/s². Rapor: g = (9,811 ± 0,053) m/s².",
      "Paylar: L'ninki 4,0/28,9 = % 13,9, T'ninki % 86,1. Genişletilmiş belirsizlik U = 2 × 0,0527 ≈ 0,11 m/s², yani g = (9,81 ± 0,11) m/s² (k = 2, yaklaşık % 95).",
      "Payları eşitlemek için 2u_T/T = 0,0020 olmalı: u_T = 0,0010 × 2,006 s ≈ 0,0020 s. 02. sekmede T'nin u'sunu 0,002 yap: bütçe yaklaşık yarı yarıya bölünür ve u_c 0,028 m/s² civarına iner.",
    ],
    result:
      "g = (9,811 ± 0,053) m/s², k = 2 ile ± 0,11 m/s². Belirsizliğin % 86'sı periyottan gelir; L'yi daha iyi ölçmek neredeyse hiçbir şey kazandırmaz, zamanlamayı iyileştirmek ise u_c'yi yaklaşık yarıya indirir.",
  },
  misconceptions: [
    {
      myth: "Hesap makinesinin verdiği bütün basamakları yazmak daha kesin bir sonuçtur.",
      truth:
        "Basamaklar kanıt olmadan bilgi taşımaz. 3,4 × 2,157 = 7,3338 yazmak, belirsizliği 0,062 olan bir sonuca desteklenmeyen bir basamak ekler; sayfanın \"Senin raporun\" kartı da \"1 basamak fazla\" der. Önce u'yu bul, onu iki anlamlı basamağa yuvarla, değeri o basamakta kes: 7,334 ± 0,062.",
    },
    {
      myth: "Yeterince çok ölçüm alıp ortalamasını alırsam hata sıfıra iner.",
      truth:
        "Ortalama yalnız rastgele kısmı σ/√n ile küçültür. 03. sekmede on bin ölçümden sonra standart hata 0,005 mm'ye inerken ortalamanın hatası +0,63 mm'de kalır. Sistematik hatayı ancak bir referansla karşılaştırma (kalibrasyon) bulur.",
    },
    {
      myth: "Bir ölçeğin belirsizliği en küçük bölmenin yarısıdır.",
      truth:
        "Yarım bölme hatanın sınırıdır, standart sapması değil. Düzgün dağılımda standart belirsizlik a/√3'tür; milimetrelik cetvelde 0,5 mm değil 0,29 mm. Bütçede sınırı u gibi kullanmak o bileşeni √3 kat abartır.",
    },
    {
      myth: "χ²/ν ne kadar küçükse uydurma o kadar iyidir.",
      truth:
        "Beklenen değer 1'dir. χ²/ν ≪ 1, hata çubuklarının şişirildiğini söyler; parametre belirsizlikleri gerçekte olduğundan büyük görünür. χ²/ν ≫ 1 ise ya model yanlıştır ya da çubuklar küçük beyan edilmiştir; ayırmak için artıklara bakmak gerekir.",
    },
  ],
  glossary: [
    { term: "Standart belirsizlik (u)", definition: "Bir ölçüm sonucunun standart sapma olarak ifade edilen belirsizliği (GUM 2.3.1)." },
    { term: "A türü / B türü", definition: "Belirsizliğin tekrarlı ölçümlerin istatistiğiyle (A) ya da çözünürlük, sertifika, üretici bilgisi gibi başka bilgilerle (B) değerlendirilmesi." },
    { term: "Birleşik standart belirsizlik (u_c)", definition: "Girdilerin standart belirsizliklerinin duyarlılık katsayılarıyla ağırlıklanıp kareler hâlinde (korelasyon varsa kovaryans terimleriyle) toplanmasının karekökü olan sonuç belirsizliği." },
    { term: "Kapsam çarpanı (k)", definition: "Genişletilmiş belirsizliği U = k·u_c olarak veren çarpan; normal dağılımda k = 2 yaklaşık % 95 güven düzeyine karşılık gelir." },
    { term: "Sistematik hata", definition: "Tekrarlı ölçümlerde aynı kalan ya da öngörülebilir biçimde değişen hata bileşeni; ortalamayla küçülmez, kalibrasyonla düzeltilir." },
    { term: "Ortalamanın standart hatası", definition: "n ölçümün ortalamasının standart sapması, s/√n; rastgele hatanın ortalamaya ne kadar sızdığını söyler." },
    { term: "Kalibrasyon", definition: "Bir aletin okumalarını değeri bilinen referanslarla karşılaştırıp kaymasını ve eğimini kestirme ve düzeltme işlemi." },
    { term: "χ²/ν", definition: "Normalleştirilmiş artıkların kareleri toplamının serbestlik derecesine bölümü; doğru model ve doğru hata çubuklarıyla 1 civarındadır." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Üniversitede ilk fizik laboratuvarı dersi genellikle tam bu sayfayla başlar: her deney raporunda bir belirsizlik bütçesi, bir yayılım hesabı ve bir uydurma beklenir. Arkasındaki matematik <strong>Olasılık ve İstatistik</strong> dersindedir: dağılımlar, beklenen değer ve varyans, merkezî limit teoremi (σ/√n'nin kökü), az ölçümde normal yerine Student'ın t dağılımı ve en çok olabilirlik kestirimi. En küçük kareler, normal dağılımlı hatalarda en çok olabilirlik ilkesinin ta kendisidir; ağırlıklı en küçük kareler, <strong>Doğrusal Cebir</strong>'in normal denklemleri AᵀWAx = AᵀWy'dir ve ters matrisin köşegeni parametre varyanslarını verir.",
      "Sonraki adımlarda her iki varsayım da gevşer. x de hatalıysa \"değişkenlerde hata\" (Deming) regresyonu gerekir; doğrusal olmayan modellerde Levenberg–Marquardt gibi yinelemeli yöntemler kullanılır; korelasyonlu girdilerde tam kovaryans matrisi yayılır. Ölçme bilimi (metroloji) ayrıca izlenebilirliği ister: her ölçüm, kesintisiz bir kalibrasyon zinciriyle SI birimlerinin tanımlarına bağlanmalıdır. Deneysel parçacık fiziği, astronomi ve klinik araştırma, bu sayfanın dört sekmesinin profesyonel sürümleridir.",
    ],
    topics: ["Olasılık ve istatistik", "Merkezî limit teoremi", "Student t dağılımı", "En çok olabilirlik", "Doğrusal olmayan uydurma", "Kovaryans matrisi", "Metroloji ve izlenebilirlik"],
  },
  quiz: [
    {
      question: "100 ölçümün ortalamasının standart hatası 0,05 mm, sistematik hata +0,6 mm. Ölçüm sayısını 10 000'e çıkarırsan ne olur?",
      options: [
        "Standart hata 0,005 mm'ye iner, ortalamanın hatası yaklaşık +0,6 mm'de kalır",
        "Standart hata da ortalamanın hatası da on kat küçülür",
        "Standart hata 0,0005 mm'ye iner, sistematik hata yüz kat küçülür",
        "Hiçbiri değişmez, çünkü gürültü σ aynıdır",
      ],
      answer: 0,
      explanation: "Standart hata σ/√n ile küçülür: √(10 000/100) = 10, yani 0,05 → 0,005 mm. Sistematik kısım her ölçümde aynı olduğu için ortalamada da aynen kalır; onu ancak kalibrasyon giderir.",
    },
    {
      question: "Doğru modeli uydurduğun halde χ²/ν ≈ 4 çıkıyor ve artıkların işaretleri gelişigüzel değişiyor. En olası açıklama hangisi?",
      options: [
        "Model yanlış; daha yüksek dereceli bir polinom gerekir",
        "Bildirilen hata çubukları gerçek σ'nın yaklaşık yarısı",
        "Hata çubukları gerçek σ'nın iki katı",
        "Nokta sayısı çok az olduğu için χ² anlamsız",
      ],
      answer: 1,
      explanation: "χ² hata çubuğunun karesiyle ters orantılıdır: σ yarıya inince χ² dört katına çıkar. Yapısız artıklar modelin doğru olduğunu söyler; sorun beyanda. Sayfanın \"Küçük beyan\" hazırında 500 tohumun ortalama χ²/ν değeri 3,999'dur.",
    },
    {
      question: "Son basamağı 0,01 g olan bir dijital terazi 12,34 g gösteriyor. Yalnız gösterge çözünürlüğünden gelen standart belirsizlik kaçtır?",
      options: ["0,01 g", "0,005 g", "Yaklaşık 0,0029 g", "Yaklaşık 0,0058 g"],
      answer: 2,
      explanation: "Gerçek değer gösterilen sayının ±0,005 g çevresinde herhangi bir yerde olabilir: dikdörtgen dağılım, a = 0,005 g. Standart belirsizlik a/√3 = 0,005/1,732 ≈ 0,0029 g. 0,005 g bir sınırdır, standart sapma değil.",
    },
  ],
  next: [
    { href: "normal-dagilim.html", title: "Normal Dağılım ve Merkezi Limit Teoremi", why: "Ortalamanın neden σ/√n ile daraldığının ve k = 2'nin neden yaklaşık % 95 verdiğinin kökü: toplanan rastlantıların çan eğrisi." },
    { href: "sarkac.html", title: "Sarkaç Laboratuvarı", why: "Bütçesini çıkardığın g ölçümünün arkasındaki fizik; büyük açıda periyodun formülden neden saptığını, yani sistematik bir model hatasını da görürsün." },
    { href: "rastgele-yuruyus.html", title: "Rastgele Yürüyüş: √N Yasası, Difüzyon ve Geri Dönüş", why: "Bağımsız rastgele adımların toplamının neden N ile değil √N ile büyüdüğü; belirsizliklerin kareler hâlinde toplanmasının öbür yüzü." },
    { href: "vektorler.html", title: "Vektörler: Bileşenler, Çarpımlar ve Bağıl Hareket", why: "Bilim Atlası'nın mekanik rotasında sıradaki durak: ölçtüğün nicelikler artık yönü de olan büyüklüklere dönüşüyor." },
  ],
  sources: [
    { title: "NIST · Evaluating uncertainty components: Type B", url: "https://physics.nist.gov/cuu/Uncertainty/typeb.html", note: "B türü değerlendirme ve dikdörtgen dağılımda u = a/√3; % 95 ve % 99 güven aralıklarını 1,960 ve 2,576'ya bölerek standart belirsizliğe çevirme (İngilizce)." },
    { title: "Wikipedia · Personal equation", url: "https://en.wikipedia.org/wiki/Personal_equation", note: "Maskelyne ile Kinnebrook (1796) ve Bessel'in gözlemciler arasındaki kararlı farkları incelemesi (İngilizce)." },
    { title: "BIPM · JCGM yayınları (GUM ve Ek 1)", url: "https://www.bipm.org/en/committees/jc/jcgm/publications", note: "JCGM 100:2008 (GUM) ve Monte Carlo ile dağılım yayan JCGM 101:2008, PDF olarak. GUM'un önsözü CIPM 1977, INC-1 (1980) ve CIPM onayının (1981, 1986) tarihçesini, 2.3 bölümü burada kullanılan terimlerin tanımlarını, 7.2.6 iki anlamlı basamak uzlaşmasını verir (İngilizce)." },
    { title: "Wikipedia · Least squares", url: "https://en.wikipedia.org/wiki/Least_squares", note: "Tarihçe: Legendre 1805, Gauss 1809 ve öncelik tartışması, Ceres'in yeniden bulunması (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
