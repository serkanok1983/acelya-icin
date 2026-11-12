window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["levha-tektonigi"] = {
  slug: "levha-tektonigi",
  title: "Levha Tektoniği: Okyanus Tabanının Kayıt Bandı",
  field: "Yer ve Çevre Bilimleri",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Okyanus tabanı, levhaların ne hızla ve hangi yöne gittiğini yazan bir kayıt bandıdır. Yaşından, derinliğinden, manyetik şeritlerinden ve volkan zincirlerinden hızı kendin ölç.",
  hook:
    "Hawaii'deki Kīlauea bugün püskürüyor; zincirin öbür ucundaki Meiji deniz dağı ise 85 milyon yıllık ve zincir boyunca yaklaşık 5900 km uzakta. Aradaki her ada, levhanın bir sıcak noktanın üstünden geçerken bıraktığı bir ayak izidir. Bir metre bile yürümeden, yalnızca kayaların yaşına ve yerine bakarak bu hızı nasıl ölçebiliriz?",
  bigIdea:
    "Okyanus tabanı sırtta doğar ve sabit hızla uzaklaşır; bu yüzden <strong>yaş, uzaklığın hıza bölümüdür</strong>: yaş–uzaklık eğimi, manyetik şeritlerin genişliği ve volkan zincirinin yaş sırası aynı sayıyı, levhanın hızını verir.",
  story: [
    "6 Ocak 1912'de meteorolog Alfred Wegener, Frankfurt'taki Senckenberg Müzesi'nde Jeoloji Derneği'nin önüne çıktı ve kıtaların yer değiştirdiğini savundu. 1915'te bu fikri <em>Die Entstehung der Kontinente und Ozeane</em> (Kıtaların ve Okyanusların Kökeni) kitabında topladı: kıyıların uyumu, iki yakadaki aynı fosiller ve kayaçlar. Ama itici bir mekanizma gösteremiyordu; kıtaların okyanus kabuğunu yararak ilerlediğini düşünüyordu ve yoğun, katı okyanus kabuğu buna izin vermezdi. Jeologlar fikri kuşkuyla karşıladı; Wegener onların gözünde bir yabancıydı. Wegener, Kasım 1930'da dördüncü Grönland seferinde 50 yaşında öldü; fikri ancak otuz yıl sonra, kanıt okyanusun dibinden gelince ana akıma girdi.",
    "O kanıtı ilk görenlerden biri bir haritacıydı. 1952'de Marie Tharp, <em>Atlantis</em> gemisinin yankı iskandili profillerini yan yana dizerken Orta Atlantik Sırtı'nın tepesinde V biçimli bir yarık vadisi fark etti: taban sanki iki yana çekiliyordu. Çalışma arkadaşı Bruce Heezen, kıtaların kaymasını destekleyen bu yorumu önce \"kız lafı\" diye geçiştirdi; ancak Howard Foster'ın deprem merkezleri haritası tam o vadinin üstüne oturunca ikna oldu. Tharp ve Heezen 1957'de Kuzey Atlantik'in ilk fizyografik haritasını yayımladı. Aynı yıllarda Harry Hess de İkinci Dünya Savaşı'nda komuta ettiği USS <em>Cape Johnson</em>'ın yankı iskandilini Pasifik geçişlerinde hep açık tutmuş, binlerce kilometrelik derinlik profili toplamıştı. 1960'ta yazdığı ve 1962'de <em>History of Ocean Basins</em> adıyla yayımlanan çalışmasında tabanın sırtta oluşup iki yana yayıldığını öne sürdü; Robert Dietz de 1961'de <em>Nature</em>'da aynı fikri \"deniz tabanının yayılması\" adıyla yazmıştı.",
    "Hipotezi sınanabilir yapan, manyetizmaydı. Eylül 1963'te Frederick Vine ve hocası Drummond Matthews <em>Nature</em>'da şunu söylediler: sırtta soğuyan lav o anki yer manyetik alanını dondurur; alan zaman zaman ters döndüğü için yayılan taban sırta paralel, iki yanda ayna simetrik şeritler taşımalıdır. Lawrence Morley aynı fikre bağımsız olarak varmıştı, ama <em>Nature</em>'a (Şubat 1963) ve <em>Journal of Geophysical Research</em>'e (Nisan 1963) yazdığı mektupların ikisi de geri çevrilmişti. Bugün fikir üçünün adıyla, Vine–Matthews–Morley hipotezi olarak anılır. J. Tuzo Wilson 1963'te Hawaii adalarını, sabit bir sıcak bölgenin üstünden geçen levhanın bıraktığı iz olarak açıkladı; 1965'te de sırt parçalarını birbirine bağlayan, kayma yönü beklenenin tersi olan <strong>dönüşüm faylarını</strong> tanımladı. Dağların altındaki köklerin hikâyesi ise daha eskidir: 1855'te George Airy ve John Henry Pratt, şakulün dağlara beklenenden az sapmasını iki farklı izostazi modeliyle açıklamıştı.",
  ],
  core: [
    {
      heading: "Yaş eşittir uzaklık bölü hız",
      body:
        "Sırtta doğan taban, sabit u yarı hızıyla iki yana taşınırsa, eksenden |x| uzaklıktaki kayanın yaşı t = |x|/u'dur. Birimler burada şanslı bir rastlantıyla buluşur: 1 mm/yıl tam olarak 1 km/Ma'dır (milyon yılda bir kilometre). Bu yüzden yaşı uzaklığa karşı çizip bir doğru uydurursan eğim 1/u olur. İki kanadın toplam açılma hızı 2u'dur; Kuzey Atlantik'te bu yılda yaklaşık 25 mm, Pasifik'te 80–145 mm'dir. Sırtlar <strong>yavaş</strong> (40 mm/yılın altı) ve <strong>hızlı</strong> (90 mm/yılın üstü) diye ayrılır.",
      formula: "t = |x|/u · 1 mm/yıl = 1 km/Ma",
      formulaNote: "u yarı hızdır; tam açılma hızı 2u. 250 km uzaktaki 20 milyon yıllık taban u = 12.5 mm/yıl demektir.",
    },
    {
      heading: "Hangi ekseni uydurmalı? Seyrelme yanlılığı",
      body:
        "En küçük kareler (EKK) yöntemi bütün hatanın düşey eksende olduğunu varsayar. Uzaklık neredeyse kesin, yaş ise σ_t hatasıyla ölçülür. Yaşı uzaklığa karşı uydurursan hata doğru eksendedir ve eğim yansızdır. Tersini yapıp uzaklığı ölçülen yaşa karşı uydurursan, yatay eksendeki saçılma eğimi sıfıra doğru çeker: hız sistematik olarak düşük çıkar. Bu, ölçüm hatası yatay eksendeyken her regresyonda görülen <strong>seyrelme yanlılığıdır</strong> (regression dilution). Küçülme payı yaş hatasının varyansının, ölçülen yaşların toplam varyansına oranıdır; az örnekli, kısa bir yaş aralığında ve kaba yaş tayininde büyür.",
      formula: "u<sub>ters</sub> ≈ u·[1 − σ<sub>t</sub>²/var(t<sub>ölçülen</sub>)]",
      formulaNote: "Sayfanın durum satırı bu oranı ve beklenen küçülmeyi yan yana yazar; σ_t = 0'da iki uydurma aynı hızı verir.",
    },
    {
      heading: "Soğuyan levha çöker: √t yasası ve plaka modeli",
      body:
        "Taban sırtta sıcak doğar ve yukarıdan soğur. Isı iletiminde soğuyan katmanın kalınlığı √(κt) ile büyür (κ ≈ 8·10⁻⁷ m²/s; 20 Ma'da yaklaşık 22 km). Soğuyan kaya büzülür, yoğunlaşır ve mantonun üstünde izostatik olarak daha derine oturur. Sıcaklık profili ısı denkleminin erfc çözümüdür; sıcaklık eksiğini derinlik boyunca toplayıp α ile çarpınca çökme √t ile orantılı çıkar. Bu <strong>yarı uzay soğuma modeli</strong> genç tabanda iyi çalışır, ama yaklaşık 80 Ma'dan sonra gerçek taban beklenenden sığ kalır: levhanın tabanına alttan ısı geldiği için soğuma sonunda doyar. Parsons ve Sclater'ın <strong>plaka modeli</strong> bu doyumu üstel bir terimle yakalar. Derinlik yaşa bağlıdır, hıza değil: hızlı sırtta aynı yaş daha uzaktadır, bu yüzden profil daha geniş ve yumuşaktır.",
      formula: "d(t) = d₀ + c√t,  c = 2ρₘαT₁√(κ/π)/(ρₘ − ρ<sub>w</sub>)",
      formulaNote: "Atlantik değerleriyle (T₁ = 1220 °C, ρₘ = 3300, ρ_w = 1000 kg/m³, α = 4·10⁻⁵ /°C) c = 397.0 m/√Ma; kaynakta ölçülen değer yaklaşık 390. Plaka modeli: d = 6400 − 3200·e^(−t/62.8) m.",
    },
    {
      heading: "Manyetik şeritler: süre çarpı hız, derinlik süzgeci",
      body:
        "Yer manyetik alanının yönü düzensiz aralıklarla ters döner; <strong>jeomanyetik kutup zaman ölçeği</strong> (burada GTS2020) bu dönemlerin tarihlerini verir: son 0.773 milyon yıl bugünkü gibi normal Brunhes kronudur, ondan önce çoğunlukla ters Matuyama gelir. Sırtta katılaşan bazalt, o anki alanı mıknatıslanma olarak saklar. Tabandaki her şeridin genişliği, kutup aralığının süresi çarpı yarı hızdır. Gemi ise mıknatıslı katmanın kilometrelerce üstündedir ve bir kaynağın alanı yaklaşık bu derinlik ölçeğinde yayılır: derinlikten dar şeritler profilde birbirine karışır. 32 bin yıllık Cobb Mountain olayı 25 mm/yıl hızda yalnız 0.80 km'dir ve 3 km derinlikten seçilemez. Bu yüzden hızı tek bir şeritten değil, bütün desenin ilintisinden okuruz: desen hızla gerilen bir cetvel gibidir.",
      formula: "genişlik = Δt·u · ΔB(x) = (μ₀M/2π) Σ ±[θ(z₁) − θ(z₂)]",
      formulaNote: "θ, gözlem noktasından blok kenarına bakan açıdır; normal bloklar artı, ters bloklar eksi anomali verir.",
    },
    {
      heading: "Yüzen kabuk: Airy, Pratt ve geri sekme",
      body:
        "Yeterince derindeki bir <strong>dengelenme derinliğinde</strong> her sütunun birim alana düşen ağırlığı aynı olmalıdır; yoksa manto yavaşça akar. <strong>Airy</strong> modelinde kabuğun yoğunluğu sabittir ve yüksek bölge kalın bir kökle dengelenir: 2750 ve 3300 kg/m³ için her kilometre yükseklik 5 km kök ister. <strong>Pratt</strong> modelinde ise sütunların tabanı aynı derinliktedir, yüksek sütun daha hafiftir. Buz yükü kabuğu bastırır: tam dengede çökme H_iρ_i/ρₘ'dir. Buz kalkınca manto viskoz olduğu için yüzey hemen dönmez; en basit modelde kalan çökme üstel olarak, bir τ gevşeme süresiyle söner. Sayfadaki τ = 4000 yıl bir öğretim değeridir; gerçek geri sekme dalga boyuna bağlı birçok zaman ölçeği içerir.",
      formula: "r = h·ρ<sub>c</sub>/(ρₘ − ρ<sub>c</sub>) · w(t) = w<sub>eq</sub>(1 − e<sup>−t/τ</sup>)",
      formulaNote: "Bugünkü yükselme hızı kalan çökmenin τ'ya bölümüdür: dw/dt = (w_eq − w)/τ.",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var ve her biri bir ölçümü, modele senin verdiğin gerçek değerle karşılaştırır. <strong>01 · Yayılma hızı ve deniz tabanı yaşı</strong> bir sırtı örnekler; yaş–uzaklık uydurmasından <strong>Ölçülen u</strong>'yu, derinlik–yaş uydurmasından c'yi bulur ve ters yöndeki uydurmayı da gösterir. <strong>02 · Manyetik şeritler</strong> gemi izi boyunca bir anomali profili üretir; <strong>Deneme hızı</strong> kaydırıcısıyla modeli germeye çalışırsın, ilinti taraması iki kanat için ve kanat kanat en iyi hızı bulur. <strong>03 · Sıcak nokta zinciri</strong> ya kendi levhanı sürer ya da Hawaii–İmparator zincirinin kaynaklı yaşlarını kullanır. <strong>04 · İzostazi</strong> dört model içerir: Airy, Pratt, sıvıda yüzen blok ve buz yükünden geri sekme. Örneklem ve gürültü tohumludur: aynı ayarlar her zaman aynı sayıları verir. R tuşu etkin sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Hangi yöne uydurmalı?",
        predict: "Yaşları 1.5 milyon yıllık bir hatayla ölçersen, yaşı uzaklığa karşı mı, uzaklığı yaşa karşı mı uydurmak daha doğru bir hız verir? Yanlış yöntem hızı büyütür mü, küçültür mü?",
        do: "Sekme 01'de <strong>Sekmeyi sıfırla</strong>'ya bas. <strong>Yaş tayini hatası σ_t</strong> = 1.50 Ma, <strong>En yaşlı örnek t_max</strong> = 10 Ma ve <strong>Örnek sayısı N</strong> = 60 yap. Sonra σ_t'yi 0'a indir.",
        observe: "Hatalıyken <strong>Ölçülen u</strong> 14.42 ± 3.11 mm/yıl (+15.35 %) gösterir; kurulan 12.5 mm/yıl %95 aralığın içindedir. <strong>Ters uydurma</strong> ise 8.62 mm/yıl (−31.06 %) verir. Durum satırı ters uydurmanın kurulan hızdan %31.1 düşük olduğunu, kuramın beklediği küçülmenin yaklaşık %30.2 olduğunu yazar ve 2 örneğin eksi çıkan yaşının sıfıra kırpıldığını söyler. σ_t = 0'da iki yöntem de 12.50 mm/yıl (0.00 %) verir.",
        explain: "Doğru uydurma gürültülüdür ama yansızdır: tek seferde +15 % sapabilir, aralığı bunu kapsar. Ters uydurma ise sistematik olarak düşüktür; yatay eksendeki hata eğimi sıfıra çeker. 10 Ma'lık kısa pencerede yaş hatasının varyansı, yaşların yayılımına göre büyük olduğu için küçülme %30'u bulur; varsayılan 20 Ma ve σ_t = 0.30 Ma'da yalnızca %0.3'tür. Ölçülen %31 ile kuramın %30'u neredeyse aynıdır. Yanlılığı rastgele hatadan ayıran şey yönüdür: tohumu değiştirdikçe doğru uydurma kurulan değerin iki yanına saçılır, ters uydurma hep altında kalır.",
      },
      {
        title: "Derinlik hıza mı bağlı, yaşa mı?",
        predict: "Hızlı bir sırtın tabanı aynı yaşta daha mı derin, daha mı sığ olur? 120 milyon yıllık tabana kadar örneklersen √t yasası ne kadar yanılır?",
        do: "Sekme 01'i sıfırla ve <strong>Hızlı sırt</strong>'a bas (u = 70 mm/yıl, T₁ = 1120 °C). Kartları <strong>Yavaş sırt</strong>'la karşılaştır. Sonra yeniden sıfırla ve t_max'ı 120 Ma yap.",
        observe: "Hızlı sırtta pencerenin ucu 250 yerine 1400 km her kanatta olur; kesitte profil çok daha geniştir. Kuramsal c ise hıza değil manto sıcaklığına bağlıdır: 397.0 yerine 364.4 m/√Ma (kaynakta ≈ 350). t_max = 120 Ma'da <strong>t_max'ta yarı uzay − plaka modeli</strong> kartı 922 m gösterir; durum satırı bu yaşta veri üreten modelin artık geçerli olmadığını söyler.",
        explain: "Derinlik, tabanın ne kadar süredir soğuduğuna bağlıdır; hız yalnızca aynı yaşı daha uzağa taşır. 20 Ma'da iki soğuma modeli arasındaki fark 203 m'dir, 120 Ma'da 922 m'ye çıkar: yaşlı levha alttan ısınır ve sığ kalır. Yarı uzay modelinin genç tabanda doğru, yaşlı tabanda yanlış olması bir kusur değil, sınırının işaretidir.",
      },
      {
        title: "Asimetrik sırt ve sırt sıçraması",
        predict: "Sol kanat 22.5, sağ kanat 27.5 mm/yıl hızla büyüyorsa iki kanadı birlikte tarayan tek hız hangisini bulur? İlinti katsayısı r ne olur?",
        do: "Sekme 02'de önce varsayılan simetrik sırtı oku, <strong>En iyi hıza götür</strong>'e bas. Sonra <strong>Sırtın geçmişi</strong> menüsünden \"Asimetrik yayılma\"yı seç (a = 10 %), ardından \"Sırt sıçraması\"nı.",
        observe: "Simetrik sırtta en iyi u iki kanatta 25.01 mm/yıl, r = 0.985. Asimetrik kipte iki kanadın ortak taraması 27.47 mm/yıl ve yalnızca r = 0.546 verir; kanatları ayrı tarayınca sol 22.50, sağ 27.49 mm/yıl, r ≈ 0.98 çıkar ve durum satırı toplam açılmayı 49.99 mm/yıl yazar. Sırt sıçramasında r iki kanatta birlikte 0.374'e düşer; sol 28.85, sağ 21.23 mm/yıl ölçülür ve durum satırı 1.50–2.00 Ma aralığının sol kanatta iki kez göründüğünü, sağda hiç görünmediğini söyler.",
        explain: "Düşük r her zaman gürültü demek değildir. Kanatlar tek tek iyi eşleşiyorsa sorun modeldedir: tek bir simetrik hız iki farklı kanadı anlatamaz. Sıçramada ise bir kanat şeritleri fazladan, öteki eksik taşır; sabit hızlı model ikisine de tam uyamaz. Jeofizikçi bu yüzden kanatları ayrı ayrı okur.",
      },
      {
        title: "Hawaii'den levha hızı, dağdan kök, buzdan geri sekme",
        predict: "Midway Atolü Kīlauea'dan zincir boyunca 2443 km uzakta ve 27.7 milyon yaşında. Pasifik levhası yılda kaç santimetre gidiyor? 4 km'lik bir dağın altında kaç kilometre kök olmalı?",
        do: "Sekme 03'te <strong>Veri</strong> menüsünden \"Hawaii–İmparator zinciri\"ni seç ve tabloyu incele. Sonra sekme 04'te Airy modelini oku, <strong>Okyanus havzası</strong>'na bas; ardından Model menüsünden \"Buz yükü ve geri sekme\"yi seç ve <strong>Yük değişiminden bu yana geçen süre</strong>'yi 10000'den 2000 yıla indir.",
        observe: "Hawaii kesimi 8.59 ± 0.86 cm/yıl ve Kīlauea'da 298.4° yön, İmparator kesimi 5.53 ± 1.61 cm/yıl ve 348.4° yön verir. Büküm açısı 115.3°, kaynaktaki yaklaşık 120°'den −3.9 % farklı; durum satırı Hawaii yönünü bükümde 283.7° olarak verir. Airy'de h = 4 km için kök 20.000 km (sayısal 19.998 km), kabuk 64.00 km; okyanus havzasında antikök −12.727 km, oran 3.182. Buzda w_eq = 833.6 m: 10000 yılda 765.21 m yükselme ve 17.11 mm/yıl, 2000 yılda 328.01 m ve 126.41 mm/yıl. Kıyı çizgilerinden ölçülen τ, 10000 yılda 3974 yıl (−0.7 %), 2000 yılda 3721 yıl (−7.0 %) çıkar.",
        explain: "Kaba hesap 2443/27.7 ≈ 88 km/Ma = 8.8 cm/yıl. Bu ancak sıcak nokta sabitse levha hızıdır; sıcak nokta 81–47 Ma arasında güneye kaydığı için İmparator hızı iki hareketin birleşimidir. Kürede pusula yönü yol boyunca döner: Hawaii yönü 3500 km ötedeki bükümde 15° farklıdır, bu yüzden iki yön aynı noktada ölçülür. Uçları birleştiren kirişlerle açı 119.4° olur. Dağda kök oranı ρ_c/(ρₘ − ρ_c) = 5; okyanusta su da yük olduğundan (ρ_c − ρ_w)/(ρₘ − ρ_c) ≈ 3.2. Erken dönemde kıyılar eğrinin yalnız başını gördüğü için τ kötü ölçülür.",
      },
    ],
  },
  wow: [
    {
      title: "İki kez geri çevrilen fikir",
      body:
        "Lawrence Morley, manyetik şeritlerin yayılan tabanın kaydı olduğunu Vine ve Matthews'un makalesi çıkmadan önce yazdı. <em>Nature</em>'a (Şubat 1963) ve <em>Journal of Geophysical Research</em>'e (Nisan 1963) gönderdiği mektupların ikisi de geri çevrildi. Vine ve Matthews'un makalesi Eylül 1963'te <em>Nature</em>'da çıktı; bugün hipotez üçünün adını birden taşır.",
    },
    {
      title: "Sabit sanılan sıcak nokta yürüyordu",
      body:
        "Wilson'ın modelinde Hawaii sıcak noktası yerinde durur ve levha üstünden geçer. Ama 2003'te John Tarduno ve arkadaşları, okyanus sondajıyla Detroit, Nintoku ve Koko deniz dağlarından alınan lavların mıknatıslanmasından bu dağların bugünkü Hawaii'den daha kuzeyde oluştuğunu gösterdi: sıcak nokta güneye kaymıştı. Sondaj örneklerinden yapılan tahminlere göre bu kayma 81–47 Ma arasında yılda yaklaşık 4 cm hızındaydı ve 47 Ma civarında büyük ölçüde yavaşladı, belki de durdu. Bu yüzden ünlü bükümü yalnızca levhanın yön değiştirmesiyle açıklamak artık yetmiyor.",
    },
    {
      title: "İskandinavya hâlâ yükseliyor",
      body:
        "Son buzul çağının buz örtüsü binlerce yıl önce eridi, ama Botni Körfezi'nin kuzeyinde kara bugün GPS ile yılda yaklaşık 11 mm yükseliyor. Geri sekmenin merkezine yakın toplam yükselme birkaç yüz metreyi bulabilir ve çalışmalar yükselmenin en az on bin yıl daha süreceğini söylüyor. Eski kıyı çizgileri bugün deniz düzeyinin çok üstünde duruyor: İsveç'in Yüksek Kıyı (Höga Kusten) bölgesinde en yüksek eski kıyı izi 280 metreyi aşar.",
    },
  ],
  worked: {
    title: "20 milyon yıllık Atlantik tabanı",
    prompt:
      "Bir yavaş sırtın (Atlantik, T₁ = 1220 °C) iki yanında, eksenden 250 km uzakta 20 Ma yaşında bazalt bulunuyor. (a) Yarı ve tam yayılma hızını bul. (b) Yarı uzay soğuma modelinin c katsayısını ρₘ = 3300 kg/m³, ρ_w = 1000 kg/m³, α = 4·10⁻⁵ /°C, κ = 8·10⁻⁷ m²/s ile hesapla. (c) Sırt tepesi d₀ = 2500 m iken 20 Ma'daki derinliği yarı uzay ve plaka modeliyle karşılaştır.",
    steps: [
      "Hız: u = |x|/t = 250 km / 20 Ma = 12.5 km/Ma. 1 km/Ma = 10⁶ mm / 10⁶ yıl = 1 mm/yıl olduğundan u = 12.5 mm/yıl; tam açılma hızı 2u = 25 mm/yıl, Kuzey Atlantik düzeyi.",
      "c için önce zaman birimini saniyeye çevir: 1 Ma = 3.156·10¹³ s. κ·1 Ma/π = 8·10⁻⁷ m²/s × 3.156·10¹³ s / π ≈ 8.04·10⁶ m², karekökü ≈ 2835 m. Pay: 2·3300·4·10⁻⁵·1220 ≈ 322.1 kg/m³ (α·T₁ boyutsuzdur). c ≈ 322.1 × 2835 m / 2300 ≈ 397.0 m/√Ma. Kaynakta Atlantik ve Hint okyanusu için ölçülen değer yaklaşık 390'dır; fark yaklaşık %2.",
      "Yarı uzay derinliği: d = 2500 m + 397.0 × √20 m ≈ 2500 + 1775 = 4275 m. Bu yaşta soğumuş katmanın ölçeği √(κt) = √(8·10⁻⁷ × 6.31·10¹⁴) m ≈ 22 km.",
      "Plaka modeli: d = 6400 − 3200·e^(−20/62.8) = 6400 − 3200 × 0.727 ≈ 4073 m. İki model arasındaki fark 4275 − 4073 ≈ 203 m.",
      "Sayfada dene: sekme 01'de varsayılan ayarlar tam bu durumdur. <strong>Pencerenin ucu</strong> kartı 250 km her kanatta, <strong>Kuram c</strong> kartı 397.0 m/√Ma, <strong>t_max'ta yarı uzay − plaka modeli</strong> kartı 203 m gösterir. Gürültülü örneklemden uydurulan c ise 429.7 ± 48.2'dir: kurulan değer aralığın içindedir.",
    ],
    result:
      "u = 12.5 mm/yıl (tam 25 mm/yıl); c ≈ 397 m/√Ma; 20 Ma'da taban yarı uzay modeliyle yaklaşık 4275 m, plaka modeliyle 4073 m derinliktedir. Fark yüzde beş kadardır ve yaş büyüdükçe hızla açılır.",
  },
  misconceptions: [
    {
      myth: "Kıtalar okyanus tabanını yararak ilerler.",
      truth:
        "Wegener'in ilk tasarımı buydu ve bu yüzden reddedildi: yoğun ve katı okyanus kabuğu yarılmaz. Deniz tabanının yayılması fikrinde taban kendisi hareket eder ve kıtaları sırtında taşır; kıta ile yanındaki okyanus tabanı çoğu zaman aynı levhanın parçalarıdır.",
    },
    {
      myth: "Hızlı yayılan sırtın tabanı aynı yaşta daha derindir.",
      truth:
        "Derinlik yaşa bağlıdır, hıza değil: d = d₀ + c√t'de hız yoktur. Hızlı sırt aynı yaşı daha uzağa taşıdığı için profili daha geniş ve yumuşaktır. Sekme 01'de manto sıcaklığını sabit bırakıp yalnızca <strong>Yarı yayılma hızı u</strong> kaydırıcısını 12.5'ten 70 mm/yıla çek: derinlik–yaş grafiği ve c kartları kıpırdamaz, değişen yalnızca kesitin genişliğidir. (<strong>Hızlı sırt</strong> düğmesi T₁'i de Pasifik değerine indirdiği için c'yi değiştirir; o fark hızdan değil, manto sıcaklığından gelir.)",
    },
    {
      myth: "Dağlar, kabuğun üstüne konmuş fazladan bir kütledir.",
      truth:
        "Büyük dağ kuşakları çoğunlukla izostatik dengededir: görünen her kilometrenin altında yaklaşık beş kilometrelik hafif bir kök vardır. Bu yüzden And Dağları'nda ve Hindistan'da yapılan ölçümlerde şakul dağlara beklenenden az saptı; fazla kütle, kökteki eksik kütleyle büyük ölçüde dengelenir.",
    },
    {
      myth: "Buz eriyince kara hemen eski yüksekliğine döner.",
      truth:
        "Kabuğun altındaki manto katı ama viskozdur ve binlerce yılda akar. Buz binlerce yıl önce eridiği hâlde İskandinavya bugün de yükseliyor. Sekme 04'teki basit modelde 10000 yıl sonra 68.4 m çökme kalır ve kara yılda 17.11 mm yükselir.",
    },
  ],
  glossary: [
    { term: "Okyanus ortası sırt", definition: "Levhaların birbirinden ayrıldığı ve yeni okyanus kabuğunun oluştuğu, okyanus tabanındaki uzun dağ sırası." },
    { term: "Yarı yayılma hızı (u)", definition: "Bir kanadın sırt ekseninden uzaklaşma hızı; iki kanadın toplam açılma hızı 2u'dur ve 1 mm/yıl = 1 km/Ma." },
    { term: "Litosfer", definition: "Kabuk ile üst mantonun soğuk, katı kısmından oluşan ve levhaları yapan dış katman." },
    { term: "Kron", definition: "Yer manyetik alanının uzun süre aynı kutuplanmada kaldığı aralık; Brunhes bugünkü normal krondur ve 0.773 Ma önce başladı." },
    { term: "Manyetik anomali", definition: "Ölçülen manyetik alanın beklenen alandan farkı; okyanus tabanında normal ve ters mıknatıslı şeritler artı ve eksi anomali verir." },
    { term: "Sıcak nokta", definition: "Levhaların üstünden geçtiği, uzun süre etkin kalan volkanik kaynak; geride yaşları düzenli artan bir volkan zinciri bırakır." },
    { term: "İzostazi", definition: "Kabuk sütunlarının alttaki mantoda yüzerek dengelendiği durum; dengelenme derinliğinde her sütunun basıncı aynıdır." },
    { term: "Gevşeme süresi (τ)", definition: "Üstel bir dengelenmede kalan farkın e'de birine (yaklaşık %37) inmesi için geçen süre." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın her sekmesi bir lisans dersinin kapısıdır. √t yasası <strong>Kısmi Diferansiyel Denklemler</strong>'deki ısı denkleminin yarı sonsuz ortamdaki çözümüdür: yüzeyi aniden soğutulan bir ortamda sıcaklık erfc(z/2√(κt)) biçimini alır. <strong>Jeofizik</strong> ve <strong>Jeodinamik</strong> derslerinde (Turcotte ve Schubert'in <em>Geodynamics</em> kitabı bunun klasik kaynağıdır) bu çözümden okyanus derinliği, ısı akısı ve levha kalınlığı birlikte türetilir; plaka modeli aynı denklemin alt sınırı sabit sıcaklıkta tutulan çözümüdür. Manyetik anomali hesabı <strong>potansiyel alan kuramıdır</strong>: Fourier uzayında derinlik, k dalga sayılı bileşeni e^(−kz) ile söndüren bir süzgeçtir; şeritlerin derinlikten dar olunca kaybolmasının matematiği budur.",
      "Yaş–uzaklık uydurmasındaki yanlılık, <strong>istatistik</strong> derslerindeki hata-değişkenler (errors-in-variables) modellerine açılır: iki eksende de hata varsa York ya da Deming regresyonu kullanılır. Levhaların gerçek hareketi düz bir haritada öteleme değil, kürede bir <strong>Euler kutbu</strong> çevresinde dönmedir; hız kutuptan uzaklığın sinüsüyle değişir. Buz sonrası geri sekmeyi tek bir τ yerine dalga boyuna bağlı gevşeme süreleriyle anlatmak <strong>viskoelastik reoloji</strong> gerektirir ve manto viskozitesini ölçmenin başlıca yollarından biridir. Aynı yükseltme verisi bugün iklim bilimine de girer: deniz düzeyi ölçümlerinden karanın kendi hareketini ayırmak gerekir.",
    ],
    topics: ["Isı denklemi ve erfc çözümü", "Potansiyel alanlar ve yukarı uzanım", "Hata-değişkenler regresyonu", "Euler kutupları ve küresel kinematik", "Manto konveksiyonu ve sıcak tüyler", "Viskoelastik geri sekme", "Esnek levha bükülmesi"],
  },
  quiz: [
    {
      question: "Yarı uzay soğuma modeline göre 10 milyon yıllık taban sırt tepesinden 1.25 km aşağıda duruyorsa, 40 milyon yıllık taban tepeden yaklaşık ne kadar aşağıda olur?",
      options: ["1.25 km", "2.5 km", "5 km", "Bu, yayılma hızına bağlıdır"],
      answer: 1,
      explanation: "Çökme c√t ile büyür. Yaş dört katına çıkınca √4 = 2, yani çökme iki katına çıkar: 2.5 km. Hız denklemde yoktur; hızlı sırtta aynı yaş yalnızca daha uzaktadır. (√10 ≈ 3.16 ve c ≈ 397 m/√Ma ile 1.25 km, Atlantik değerlerine uyar.)",
    },
    {
      question: "Örneklerin yaşı büyük bir hatayla ölçülmüş. Eksenden uzaklığı ölçülen yaşa karşı uydurup eğimi hız sayarsan ne olur?",
      options: ["Hız yansızdır, yalnızca belirsizliği büyür", "Hız sistematik olarak düşük çıkar", "Hız sistematik olarak yüksek çıkar", "Sonuç yalnızca örnek sayısına bağlıdır"],
      answer: 1,
      explanation: "EKK bütün hatayı düşey eksende varsayar. Hatalı yaş yatay eksende kalınca eğim, σ_t²/var(t_ölçülen) oranı kadar sıfıra doğru çekilir: seyrelme yanlılığı. Sekme 01'de σ_t = 1.50 Ma, t_max = 10 Ma, N = 60 iken ters uydurma 8.62 mm/yıl (−31.06 %) verir; yaşı uzaklığa karşı uydurmak bu yanlılıktan kaçınır.",
    },
    {
      question: "Airy modelinde (ρ_c = 2750, ρₘ = 3300 kg/m³) deniz düzeyinde 40 km kalınlıkta olan kabuk, 2 km yüksekliğindeki bir platoda toplam ne kadar kalın olmalıdır?",
      options: ["42 km", "50 km", "52 km", "60 km"],
      answer: 2,
      explanation: "Kök r = h·ρ_c/(ρₘ − ρ_c) = 2 km × 2750/550 = 10 km. Toplam kalınlık = H₀ + h + r = 40 + 2 + 10 = 52 km. Sekme 04'te h = 4 km için aynı hesap 64.00 km verir: her kilometre yükseklik 6 km kabuk ekler.",
    },
  ],
  next: [
    { href: "depremler-ve-sismik-dalgalar.html", title: "Depremler ve Sismik Dalgalar: P ve S, Merkez Üssü, Büyüklük ve Gutenberg–Richter", why: "Levha sınırlarında biriken gerilim depremle boşalır: P ve S dalgalarıyla merkez üssünü bul, fayın boyutundan büyüklüğü, binlerce depremden istatistiği hesapla." },
    { href: "bilimsel-yontem-olcme-ve-belirsizlik.html", title: "Bilimsel Yöntem, Ölçme ve Belirsizlik: Basamak, Yayılım, Hata ve Uydurma", why: "Yaş–uzaklık uydurmasının arkasındaki araçlar: belirsizlik yayılımı, sistematik ve rastgele hata, grafik uydurma ve artıklar." },
    { href: "derin-zaman-ve-radyometrik-tarihleme.html", title: "Derin Zaman ve Radyometrik Tarihleme: Kayaçların ve Yaşamın Yaşı", why: "Levhaların yavaş hareketine zaman veren ölçek: göreli tarihleme ilkeleri, radyometrik saatler ve Dünya tarihinin tek bir güne sığdırılmış hâli." },
    { href: "radyoaktif-bozunma.html", title: "Radyoaktif Bozunma: Rastlantıdan Doğan Yasa", why: "Kayaların yaşı radyoaktif saatlerle ölçülür: bozunmanın rastlantıdan doğan üstel yasasını ve yarı ömürle tarihlendirmeyi gör." },
  ],
  sources: [
    { title: "Wikipedia · Seafloor depth versus age", url: "https://en.wikipedia.org/wiki/Seafloor_depth_versus_age", note: "Yarı uzay ve plaka soğuma modelleri, 350√t ve 390√t uydurmaları, κ, α ve T₁ değerleri (İngilizce)." },
    { title: "Wikipedia · Vine–Matthews–Morley hypothesis", url: "https://en.wikipedia.org/wiki/Vine%E2%80%93Matthews%E2%80%93Morley_hypothesis", note: "1963 Nature makalesi, Morley'nin geri çevrilen mektupları ve simetrik anomali profilleri (İngilizce)." },
    { title: "Wikipedia · Hawaii hotspot", url: "https://en.wikipedia.org/wiki/Hawaii_hotspot", note: "Wilson'ın 1963 modeli, 47 Ma'daki büküm ve deniz dağı sondajlarından sıcak noktanın kayması (İngilizce)." },
    { title: "Wikipedia · Isostasy", url: "https://en.wikipedia.org/wiki/Isostasy", note: "Airy ve Pratt'ın 1855 modelleri, kök oranları ve buz sonrası geri sekme (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
