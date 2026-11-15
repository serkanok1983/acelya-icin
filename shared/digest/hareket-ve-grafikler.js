window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["hareket-ve-grafikler"] = {
  slug: "hareket-ve-grafikler",
  title: "Hareket ve Grafikler: Eğim, Alan ve Gürültü",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bir eğrinin eğimi hızı, altındaki alan yer değiştirmeyi söyler. Bu iki okuma türev ile integralin ta kendisidir; gürültülü bir sensörde ise türev almanın neden tehlikeli olduğunu da gösterir.",
  hook:
    "Bir arabayı on saniye izliyorsun; onuncu saniyede başladığı yerden yalnızca 8 metre ötede. Peki bu sürede 20,5 metre yol almış olabilir mi? Bir de şunu düşün: hareket dedektörünü saniyede 20 yerine 100 kez ölçecek biçimde ayarlarsan hız grafiğin neden düzelmek yerine beş kat daha titrek çıkar?",
  bigIdea:
    "Konum, hız ve ivme grafikleri tek bir hareketin üç yüzüdür: her grafiğin <strong>eğimi</strong> bir sonrakini, altındaki <strong>işaretli alan</strong> bir öncekinin değişimini verir; eğimi ölçerken adımı küçültmek kesme hatasını azaltır ama ölçüm gürültüsünü büyütür.",
  story: [
    "On dördüncü yüzyılın ikinci çeyreğinde Oxford'daki Merton Koleji'nde bir grup düşünür (bugün <strong>Oxford Hesapçıları</strong> diye anılan Thomas Bradwardine, William Heytesbury, Richard Swineshead ve John Dumbleton) hareketi nedenlerinden ayırıp yalnızca nasıl gerçekleştiğini incelemeye koyuldu. Kinematik ile dinamiği birbirinden ayırdılar ve anlık hız kavramı üzerinde çalıştılar. Bugün <em>ortalama hız teoremi</em> ya da Merton kuralı denen sonucu ilk bulan olarak genellikle Heytesbury anılır; kural, onun yaklaşık 1335'te yazdığı <em>Regulae solvendi sophismata</em> (Safsataları çözme kuralları) adlı metninde geçer: düzgün ivmelenen bir cisim, belli bir sürede, o sürenin ortasındaki hızıyla düzgün giden bir cisimle aynı yolu alır.",
    "Kural çok geçmeden resme döküldü: İtalyan Giovanni di Casali ile Fransız düşünür <strong>Nicole Oresme</strong> (yaklaşık 1323–1382) sonuçları geometrik şekillerle göstermenin yolunu buldu. En etkili olanı Oresme'ninkiydi. <em>De configurationibus qualitatum et motuum</em> adlı eserinde bir niteliğin yoğunluğunu (<em>latitudo</em>), yayıldığı uzunluğun (<em>longitudo</em>) üzerine dik çizilmiş bir boy olarak gösterdi. Zamanı yatay, hızı dikey alınca şeklin alanı alınan yolu veriyordu. Düzgün değişen bir hız eğik bir doğru, onun altındaki alan bir yamuktur; yamuğun alanı ise orta yüksekliği olan bir dikdörtgeninkine eşittir. Merton kuralı böylece tek bakışta görülen bir geometri sonucu oldu: bugün v–t grafiğinin altındaki alanı okurken yaptığımız şey. MacTutor, Oresme'yi bu kuralı ispatlayan ilk kişi sayar. Ama onun serbest düşme yasasını Galileo'dan önce bulduğu yolundaki iddiaya katılmaz: Oresme'nin eserlerini yayımlayan tarihçi Marshall Clagett'e göre bu tür iddiaların hiçbiri doğru değildir. Oresme'nin kuralı genel olarak düzgün değişen nitelikler içindi; düşen bir taşın ölçümüne dayanmıyordu.",
    "Kuralın düşen cisimlere gerçekten uyduğunu ölçümle sınamak Galileo'ya kaldı. 1638'de Leiden'de yayımlanan <em>İki Yeni Bilim</em>'de anlattığı düzenekte 12 arşın uzunluğunda bir tahtaya açılmış, parşömenle kaplı düz bir oluktan sert, pürüzsüz bir tunç top yuvarlanıyordu. Eğim düşüşü ölçülebilecek kadar yavaşlatıyor, süreyi ise ince bir borudan akıp toplanan suyun ağırlığı veriyordu. Sonuç: durgun hâlden başlayan düzgün ivmeli harekette alınan yol, geçen sürenin karesiyle orantılıdır. Galileo bu yasayı geometrik çizimlerle ve sözle anlattı; cebir biçimine sokmak sonrakilere kaldı. Bir yıl önce, 1637'de, Descartes <em>La Géométrie</em>'yi (<em>Yöntem Üzerine Konuşma</em>'nın üç ekinden biri) yayımlayıp eğrileri denklemlerle anlatmanın yolunu açmıştı. Eksenlerine sayı yazılmış bugünkü x–t grafiği, bu iki çizginin, hareketin geometrisi ile cebirin, sonraki kuşaklarda birleşmesinden çıktı.",
  ],
  core: [
    {
      heading: "Eğim: ortalamadan anlık hıza",
      body:
        "x–t grafiğinde iki noktayı birleştiren <strong>kiriş</strong>in eğimi, o aralıktaki ortalama hızdır: Δx/Δt. Aralığı daralttıkça kiriş, eğriye tek noktada dokunan <strong>teğet</strong>e yaklaşır ve eğimi anlık hız olur. Aynı okuma bir kat aşağıda da geçerlidir: v–t grafiğinin eğimi ivmedir. Grafiğin yüksekliği ile eğimi farklı şeylerdir: v = 0 olan bir anda da (dönüş anı) ivme sıfırdan farklı olabilir. Sayfanın ilk sekmesinde imleci 7,50 s'ye getir: hız 0,000 m/s, ivme −2,000 m/s².",
      formula: "v = dx/dt,  a = dv/dt = d²x/dt²",
      formulaNote: "Türev, kiriş eğiminin aralık sıfıra giderken limitidir. Grafikte: teğetin eğimi.",
    },
    {
      heading: "Alan: yer değiştirme ve yol",
      body:
        "v–t grafiğinin altındaki alan, eksen üstündeyse artı, altındaysa eksi sayılır; bu <strong>işaretli alan</strong> yer değiştirmedir. Alınan <strong>yol</strong> ise |v|'nin alanıdır: geri dönüşte biriken eksi alan yoldan düşülmez, eklenir. Sayfanın varsayılan hareketi on saniyede 8,000 m yer değiştirir ama 20,500 m yol alır, çünkü 7,50 s'de geri döner. Aynı mantık a–t grafiği için de çalışır: altındaki işaretli alan hızdaki değişimi, Δv'yi verir.",
      formula: "Δx = ∫ v dt,  s = ∫ |v| dt,  Δv = ∫ a dt",
      formulaNote: "s ≥ |Δx|; eşitlik yalnız hız işaret değiştirmiyorsa geçerlidir. Ortalama hız Δx/t, ortalama sürat s/t'dir.",
    },
    {
      heading: "Sabit ivme denklemleri ve sınırları",
      body:
        "İvme sabitse v–t bir doğrudur ve dört tanıdık denklem bu doğrunun altındaki yamuktan çıkar. Ama ivme değişiyorsa (sarsıntı, yani <strong>j = da/dt</strong> sıfırdan farklıysa) denklemlere ortalama ivmeyi koymak yetmez. Denklemlere a yerine ortalama ivme (a başı + a sonu)/2 konursa v = v₀ + aT yine tam çıkar, çünkü Δv a–t alanıdır ve doğrusal bir a(t) için bu alan tam olarak ortalama ivme çarpı süredir. Konum ise farklıdır: gerçek hareket x = v₀T + a₀T²/2 + jT³/6 verirken denklem v₀T + a₀T²/2 + jT³/4 verir. Aradaki fark jT³/12'dir. Sayfanın yumuşak kalkış parçasında (T = 3 s, a 0'dan 2'ye) j = 0,667 m/s³ ve sapma 1,5000 m: denklem 4,5000 m derken gerçek yer değiştirme 3,0000 m.",
      formula: "Δx<sub>denklem</sub> − Δx<sub>gerçek</sub> = j·T³/12",
      formulaNote: "j = (a sonu − a başı)/T. İvme sabitken j = 0 ve dört denklem de tam olur.",
    },
    {
      heading: "Sonlu farkların ve Riemann toplamlarının mertebesi",
      body:
        "Bir ölçüm dizisinden eğimi bulmanın en basit yolu ileri farktır: [x(t + Δt) − x(t)]/Δt. Taylor açılımı bu kestirimin v + a·Δt/2 + j·Δt²/6 olduğunu söyler: hata Δt ile orantılıdır, yani <strong>birinci mertebeden</strong>. Merkezî fark [x(t + Δt) − x(t − Δt)]/(2Δt) ise a·Δt/2 terimini simetri sayesinde götürür; hatası j·Δt²/6, <strong>ikinci mertebedendir</strong>. Δt yarıya inince ilk hata yarıya, ikincisi dörtte bire iner. Alan tarafında aynı hikâye: sol ve sağ uç Riemann toplamları 1/n ile, orta nokta 1/n² ile yakınsar. Bu mertebeler fonksiyonun pürüzsüz olduğunu varsayar. Merkezî farkın şablonu ivmenin sıçradığı bir anı aşarsa hata yine birinci mertebeye düşer; alanı alınan fonksiyonun kendisi sıçrarsa (a–t grafiği gibi) orta nokta kuralı da öyle. Hızdaki bir kırılma ise orta nokta kuralını ikinci mertebeden düşürmez: varsayılan harekette v–t alanı için ölçülen log–log eğimi −2,00'dir.",
      formula: "e<sub>ileri</sub> ≈ a·Δt/2,  e<sub>merkezî</sub> ≈ j·Δt²/6",
      formulaNote: "Gözlenen mertebe p = log₂[e(Δt)/e(Δt/2)]. Sabit ivmede j = 0 olduğundan merkezî fark tamdır: x(t) bir paraboldür.",
    },
    {
      heading: "Türev gürültüyü büyütür",
      body:
        "Gerçek bir sensör her konumu küçük bir rastgele hatayla ölçer (standart sapması σ). Ham hız iki örneğin farkını Δt'ye böler; bağımsız iki hatanın farkının sapması √2·σ'dır, bu yüzden hız gürültüsü √2·σ/Δt olur. İvme üç örnekten (1, −2, 1 katsayılarıyla) gelir ve Δt²'ye bölünür: √6·σ/Δt². Genel kural: Σcᵢxᵢ biçimindeki her kestirimin gürültüsü σ·√(Σcᵢ²)'dir. Δt'yi küçültmek kesme hatasını azaltır ama gürültüyü büyütür; ikisinin toplamını en küçük yapan bir <strong>en iyi örnekleme aralığı</strong> vardır. Gürültüyü azaltmak için komşu örneklerin ortalaması alınabilir, ama yalnız geçmiş örnekleri kullanan bir ortalama (w − 1)·Δt/2 kadar <strong>geride kalır</strong>.",
      formula: "σ<sub>v</sub> = √2·σ/Δt,  σ<sub>a</sub> = √6·σ/Δt²",
      formulaNote: "Örneklemeyi iki kat sıklaştırmak hız gürültüsünü iki, ivme gürültüsünü dört katına çıkarır.",
    },
  ],
  lab: {
    intro:
      "Sayfa dört sekmeden oluşur. <strong>01 · x–t, v–t, a–t okuma</strong> sekmesinde hazır bir hareket seçer ya da parça tablosunda her parçanın süresini (T), başındaki ve sonundaki ivmeyi yazarsın; <strong>Zaman imleci t</strong> ile <strong>Fark adımı Δt</strong> kaydırıcıları ileri ve merkezî farkı, hatalarını ve gözlenen mertebeyi gösterir. <strong>02 · Eğim ve alan</strong> sekmesinde <strong>Aralık başı t₁</strong>, <strong>Aralık sonu t₂</strong>, <strong>Dikdörtgen sayısı n</strong> ve <strong>Yükseklik kuralı</strong> ile Riemann toplamını kesin değerle karşılaştırırsın; altta <strong>Denetlenen parça</strong> için sabit ivme denklemleri, ivmenin RK4 yöntemiyle sayısal integraline karşı sınanır. <strong>03 · Hareket dedektörü benzetimi</strong> gürültülü bir ultrasonik sensörü taklit eder (<strong>Örnekleme frekansı f</strong>, <strong>Konum gürültüsü σ</strong>, <strong>Düzeltme</strong>, <strong>Pencere genişliği w</strong>). <strong>04 · Grafikten harekete bulmacası</strong> ise sana bir hedef grafik verir; kaydırıcılarla aynı hareketi kurarsın. Sayılar sayfadaki gibi ondalık virgülle yazılmıştır.",
    experiments: [
      {
        title: "Δt'yi yarıya indir: birinci ve ikinci mertebe",
        predict: "Varsayılan harekette (yumuşak kalkış), t = 1,50 s'de Δt'yi 0,20 s'den 0,10 s'ye indirirsen ileri farkın ve merkezî farkın hatası kaç kat küçülür? İkisi de yarıya mı iner?",
        do: "01 sekmesinde imleci 1,50 s'de bırak ve ileri fark ile merkezî fark kutularındaki hataları oku. Sonra <strong>Fark adımı Δt</strong>'yi 0,10 s yap. Ardından Δt'yi 0,20 s'ye geri al ve imleci önce 8 s'ye, sonra 3 s'ye götür.",
        observe: "Δt = 0,20 s'de ileri hata 0,104, merkezî hata 0,00444 m/s; 0,10 s'de 0,0511 ve 0,00111. Mertebe kutusu \"ileri 1,02 · merkezî 2,00\" der. t = 8 s'de (sabit a = −2) ileri hata tam −0,200, merkezî hata 2,22 × 10⁻¹⁵: yuvarlama düzeyi. t = 3 s'de ivme 2,00'den 0,00'a sıçrar; merkezî hata −0,0978 m/s olur, kuram kutusu \"kuram yok (sıçrama)\" yazar ve merkezî mertebe 0,98'e düşer.",
        explain: "İlk parçada ivme doğrusal değiştiği için hem a·Δt/2 hem j·Δt²/6 terimi vardır; ileri fark ilkini taşır, merkezî fark yalnız ikincisini. Sabit ivmede x bir paraboldür ve merkezî fark bir parabolün eğimini tam verir. Sıçramada ise Taylor açılımı şablonun iki yanında farklı polinomlara ait olduğu için bozulur; hata yine Δt ile küçülür ama artık birinci mertebeden.",
      },
      {
        title: "Yer değiştirme mi, yol mu?",
        predict: "Varsayılan harekette t = 8 s'de cisim başlangıçtan 14 m ötededir. Bu ana kadar kaç metre yol almıştır? Hareketin sonunda (10 s) ortalama hız ile ortalama sürat ne kadar ayrılır?",
        do: "01 sekmesinde <strong>Zaman imleci t</strong>'yi 8 s'ye, sonra 10 s'ye getir; yer değiştirme · yol ve ortalama hız · ortalama sürat kutularını oku. Ardından <strong>Hazır hareket</strong> menüsünden \"Sabit hız, kısa fren, geri sabit hız\"ı seç ve imleci 9 s'ye götür.",
        observe: "t = 8 s'de \"14,000 m · 14,500 m\", dönüş anı 7,500 s. Sonda \"8,000 m · 20,500 m\" ve ortalamalar \"0,800 m/s · 2,050 m/s\". Geri dönüşlü hazırda t = 9 s'de \"0,000 m · 17,000 m\": cisim başladığı yere dönmüştür, ortalama hızı sıfırdır ama 17 metre yürümüştür (dönüş 4,500 s'de).",
        explain: "7,50 s'den sonra v eksidir; v–t eğrisi eksenin altına iner ve işaretli alan küçülmeye başlar. Yol ise |v|'nin alanıdır ve her an büyür: 7,5–8 s arasında cisim 0,25 m geri gelmiş, yol 0,25 m artmıştır, bu yüzden 14,000 ile 14,500 arasındaki fark 0,500 m'dir.",
      },
      {
        title: "Dikdörtgenler, orta nokta ve sabit ivmenin sınırı",
        predict: "Varsayılan harekette v–t alanını 10 dikdörtgenle sol uç kuralıyla toplarsan sonuç kesin değer olan 8 m'den ne kadar sapar? Orta nokta kuralı ne kadar iyi olur? Yumuşak kalkış parçasında Δx = ½aT² denklemi doğru sonuç verir mi?",
        do: "02 sekmesinde varsayılanı oku, sonra <strong>Yükseklik kuralı</strong>'nı Orta nokta yap. Aralığı t₁ = 6,5 s, t₂ = 9,5 s'ye daralt. Aralığı 0–10 s'ye geri alıp <strong>Denetlenen parça</strong>'yı 1. parça yap ve tabloya bak. Son olarak <strong>Hangi grafiğin alanı?</strong> menüsünden a–t'yi, kural olarak Sağ uç'u seç.",
        observe: "Sol kural 10,6667 m (hata 2,67 m, gözlenen mertebe 1,05); orta nokta 7,9167 m (hata −0,0833 m, mertebe 2,00). 6,5–9,5 s aralığında (tek sabit ivmeli parça) orta nokta tam: hata \"0 · 0 m\", kiriş eğimi \"−1,0000 · −1,0000 m/s\". 1. parçada v = v₀ + aT 0,00 % sapar, ama iki Δx denklemi 4,5000 m'ye karşı 3,0000 m verir (+50,00 %), v² denklemi −33,33 %. a–t alanında sağ kural −4,0000 m/s bulur, kesini −5,0000 m/s; kuram kutusu \"kuram 1\" der, çünkü a–t aralıkta sıçrar.",
        explain: "Sol uç kuralı her hücrede eğimin yarım adımlık payını kaçırır; orta nokta bu payı iki yandan dengeler ve doğrusal bir v(t) için tamdır. Değişken ivmede konum denklemleri jT³/12 = (2/3)·27/12 = 1,5 m sapar. a–t grafiğinde ivmenin sıçradığı hücreler basamak taşır; o hücrelerin hatası h ile orantılıdır, bu yüzden üç kural da birinci mertebeye iner. (n = 10'da hücre sınırları 3 s ve 6 s'ye denk geldiği için orta nokta burada yine tam çıkar; log–log grafiğinde n = 1, 2, 4, … için ise orta noktanın eğimi de −1,00'dir.)",
      },
      {
        title: "Daha sık ölçmek neden daha kötü?",
        predict: "Yaya bağlı arabada σ = 1 mm iken örneklemeyi 20 Hz'den 100 Hz'e çıkarırsan hız gürültüsü ne olur? Gürültüyü azaltmak için geriye dönük ortalama mı, yerel parabol uydurma mı daha iyidir?",
        do: "03 sekmesinde varsayılanı oku. <strong>Örnekleme frekansı f</strong>'yi 100 Hz'e, sonra 5 Hz'e getir; durum satırındaki en iyi örnekleme önerisini not et. f'yi 20 Hz'e geri al ve <strong>Konum gürültüsü σ</strong>'yı 4 mm yap. σ = 1 mm'ye dönüp <strong>Düzeltme</strong>'yi önce \"Geriye dönük hareketli ortalama\", sonra \"Yerel parabol uydurma (Savitzky–Golay)\" yap (w = 7).",
        observe: "Ham v gürültüsü 20 Hz'de \"0,0285 · 0,0283 m/s\", 100 Hz'de \"0,150 · 0,141 m/s · +6,22 %\" (ham a 26,1'e karşı 24,5 m/s²), 5 Hz'de \"0,00714 · 0,00707\". En iyi örnekleme ölçülen 6 Hz, kuram 6,1 Hz; σ = 4 mm'de ölçülen 3 Hz, kuram 3,9 Hz. Geriye dönük ortalama gürültüyü 0,00400 m/s'ye indirir ama gecikmesi \"150,0 ms · 150,0 ms\" ve toplam hata \"0,0285 · 0,263 m/s\": düzeltilmiş kestirim hamdan kötüdür. Savitzky–Golay'da toplam hata \"0,0285 · 0,0156 m/s\".",
        explain: "Gürültü 1/Δt, yani f ile büyür: kuramda beş kat f, tam beş kat gürültü (ivmede yirmi beş kat). Ölçülen değer tek bir rastgele dizinden geldiği için kuramdan sapar: 100 Hz'de +6 %, Savitzky–Golay gürültüsünde (w = 7) −11 %; <strong>Yeni gürültü</strong> ile sapma da değişir. Seyrek örneklemede fark sinüsün eğriliğini kaçırır; denge en iyi f'yi verir ve σ büyüdükçe seyreğe kayar. Geriye dönük ortalama yalnız geçmişi kullandığı için (w − 1)·Δt/2 = 150 ms geç kalır; hızı çabuk değişen bir yayda bu gecikme gürültü kazancını yer. Simetrik yerel parabol gecikmesizdir ve eğriliği izler.",
      },
    ],
  },
  wow: [
    {
      title: "Altı yüz yaşında bir v–t grafiği",
      body:
        "Oresme, on dördüncü yüzyılın ortalarında zamanı yatay, hızı dikey çizince şeklin alanının alınan yol olduğunu gösterdi; düzgün ivmeli hareketin yolu, bir üçgenin ya da yamuğun alanıydı. Bu, Galileo'nun eğik düzleminden ve Descartes'ın <em>La Géométrie</em>'sinden yaklaşık üç yüzyıl önceydi. Bugün her v–t grafiğinin altını taradığımızda onun yöntemini kullanıyoruz.",
    },
    {
      title: "Saati su ile ölçmek",
      body:
        "Galileo'nun 1638'de anlattığı düzenekte mekanik saat yoktu: topun 12 arşınlık oluktan iniş süresi, yüksekte duran bir kaptan ince bir boruyla akan suyun bir bardakta toplanıp duyarlı bir terazide tartılmasıyla ölçülüyordu. Su ağırlıklarının oranı sürelerin oranını veriyordu. Sonuç zamanın karesi yasasıydı: aynı eğimde yolu dört katına çıkarmak için iki kat süre gerekir.",
    },
    {
      title: "Bir kimya makalesinin uzun gölgesi",
      body:
        "Abraham Savitzky ile Marcel Golay'ın 1964'te <em>Analytical Chemistry</em>'de yayımladığı makale, gürültülü ölçümlere yerel polinom uydurarak hem düzeltme hem türev almanın hazır katsayı tablolarını veriyordu. Makale derginin en çok atıf alan çalışmalarından biri sayılır; tablolardaki bazı hatalar ise 1972'de aynı dergide Steinier, Termonia ve Deltour'un yazdığı bir makaleyle düzeltildi. Sayfanın üçüncü sekmesindeki \"Yerel parabol uydurma\" bu yöntemdir.",
    },
  ],
  worked: {
    title: "Hareket dedektörü için en iyi örnekleme hızı",
    prompt:
      "Bir araba yaya bağlı olarak x(t) = 1 + 0,25·sin(πt) m ile salınıyor. Ultrasonik sensör konumu standart sapması σ = 1,0 mm olan bağımsız bir gürültüyle ölçüyor ve hız ham ileri farkla, v ≈ (xₖ₊₁ − xₖ)/Δt ile bulunuyor. Gürültü ile kesme hatasının toplamını en küçük yapan Δt'yi ve örnekleme frekansını bul; bu frekanstaki toplam RMS hız hatasını kestir.",
    steps: [
      "Gürültü terimi: iki bağımsız hatanın farkının standart sapması √2·σ'dır, Δt'ye bölünür: σ<sub>v</sub> = √2·σ/Δt. σ = 0,001 m ve Δt = 0,05 s için 0,0283 m/s (sayfanın 20 Hz'deki kuram değeri).",
      "Kesme terimi: fark, aralıktaki ortalama hızı verir ve sayfa onu aralığın ortasına, tₖ + Δt/2 anına yazar (tₖ anına yazılsaydı hata a·Δt/2 ile birinci mertebeden olurdu). Sinüs için bu ortalama v<sub>orta</sub>·sin z/z'dir, z = ωΔt/2. Küçük z'de 1 − sin z/z ≈ z²/6, yani hata Aω·z²/6 = Aω³Δt²/24 genliğinde bir sinüstür; RMS değeri için √2'ye böl: K·Δt², K = Aω³/(24√2). A = 0,25 m, ω = π rad/s için Aω³ = 7,752 m/s³ ve K = 0,2284 m/s³.",
      "Toplamı en küçük yap: E² = 2σ²/Δt² + K²Δt⁴. Türevi sıfıra eşitle: −4σ²/Δt³ + 4K²Δt³ = 0, buradan Δt⁶ = σ²/K² ve Δt* = (σ/K)<sup>1/3</sup> = (0,001/0,2284)<sup>1/3</sup> ≈ 0,164 s. Örnekleme frekansı f* = 1/Δt* ≈ 6,1 Hz.",
      "Hatayı hesapla: gürültü √2 × 0,001/0,1636 ≈ 0,00865 m/s, kesme 0,2284 × 0,1636² ≈ 0,00611 m/s. En iyi noktada gürültü, kesme hatasının tam √2 katıdır. Toplam √(0,00865² + 0,00611²) ≈ 0,0106 m/s.",
      "Sayfada dene: 03 sekmesinde f = 6 Hz seç (kaydırıcı tam sayı adımlı). Kuram kutuları gürültü için 0,00849, kesme için 0,00632 m/s verir; toplam RMS hata 0,0109 m/s ölçülür. 20 Hz'de toplam 0,0285 m/s, yani neredeyse üç kat kötüdür. σ'yı 4 mm yaparsan en iyi f, 4<sup>−1/3</sup> ≈ 0,63 katına, 3,9 Hz'e iner.",
    ],
    result:
      "Δt* = (σ/K)<sup>1/3</sup> ≈ 0,164 s, yani f* ≈ 6,1 Hz; toplam RMS hız hatası yaklaşık 0,011 m/s. Daha sık örneklemek gürültüyü, daha seyrek örneklemek eğriliği kaçırmayı büyütür; en iyi nokta σ'nın küp köküyle kayar.",
  },
  misconceptions: [
    {
      myth: "x–t grafiği cismin izlediği yolun resmidir.",
      truth:
        "Yatay eksen zamandır, mekân değil. Düz bir yolda ileri geri giden bir araba, x–t grafiğinde tepesi olan bir eğri çizer; tepe noktası arabanın döndüğü andır, yoldaki bir tepe değil. Sayfanın varsayılan hareketinde x–t eğrisinin 7,50 s'deki tepesi bu dönüştür.",
    },
    {
      myth: "Eksi ivme her zaman yavaşlamak demektir.",
      truth:
        "Yavaşlama hız ile ivmenin zıt işaretli olmasıdır. Varsayılan harekette t = 8 s'de v = −1,000 m/s, a = −2,000 m/s²: ikisi de eksi, cisim eksi yönde hızlanıyor. Aynı ivme 7,50 s'den önce cismi yavaşlatıyordu.",
    },
    {
      myth: "Ortalama hız, ilk ve son hızın ortalamasıdır.",
      truth:
        "(v₁ + v₂)/2 yalnızca ivme sabitken ortalama hıza eşittir. Ortalama hız her zaman kirişin eğimidir, Δx/Δt. 02 sekmesinde 0–10 s aralığında kiriş eğimi 0,8000 m/s iken (v₁ + v₂)/2 = −2,5000 m/s: işareti bile farklı. Tek sabit ivmeli parçada (6,5–9,5 s) ikisi buluşur.",
    },
    {
      myth: "Ne kadar sık ölçersem hızı o kadar doğru bulurum.",
      truth:
        "Kesme hatası azalır ama gürültü √2·σ/Δt ile büyür. Sayfanın dedektöründe 100 Hz'deki hız gürültüsü kuramda 0,141 m/s, 20 Hz'dekinin tam beş katıdır (tek bir gürültü dizisinde 0,150 m/s ölçülür); en iyi örnekleme 6 Hz civarındadır. Türev, ölçümün en küçük titremesini bile büyüten bir işlemdir.",
    },
  ],
  glossary: [
    { term: "Yer değiştirme (Δx)", definition: "Son konum ile ilk konumun farkı; işaretlidir ve v–t grafiğinin altındaki işaretli alana eşittir." },
    { term: "Alınan yol (s)", definition: "Hareket boyunca katedilen toplam uzunluk, ∫|v|dt; hiçbir zaman eksi olmaz ve |Δx|'ten küçük olamaz." },
    { term: "Teğet", definition: "Eğriye bir noktada dokunan ve o noktadaki eğimi taşıyan doğru; x–t grafiğinde eğimi anlık hızdır." },
    { term: "Sarsıntı (j)", definition: "İvmenin zamana göre değişim hızı, j = da/dt; birimi m/s³." },
    { term: "Kesme hatası", definition: "Türev ya da integral yerine sonlu bir adımla hesap yapmaktan doğan, adım küçüldükçe azalan sistematik hata." },
    { term: "Hata mertebesi (p)", definition: "Hatanın adımla ölçeklenme üssü; e ∝ Δt<sup>p</sup> ise adımı yarıya indirmek hatayı 2<sup>p</sup> kat küçültür." },
    { term: "Riemann toplamı", definition: "Bir aralığı n eşit hücreye bölüp her hücrede bir yükseklik (sol uç, sağ uç ya da orta nokta) seçerek alanı dikdörtgenlerle yaklaşıklama." },
    { term: "Savitzky–Golay süzgeci", definition: "Her noktanın çevresindeki örneklere en küçük kareler yöntemiyle düşük dereceli bir polinom uydurarak düzeltilmiş değeri ya da türevi veren doğrusal süzgeç." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede grafik okuma bir beceridir; üniversitede <strong>Fizik I</strong> ve <strong>Kalkülüs I</strong>'de kesin bir dile dönüşür: v = dx/dt ve x(t) = x₀ + ∫v dt, analizin temel teoreminin hareketteki adıdır. Sabit ivme denklemleri, a(t) sabitken bu integrallerin kapalı çözümüdür; ivme konuma ya da hıza bağlı olunca (yay kuvveti, hava direnci) iş <strong>Diferansiyel Denklemler</strong>'e geçer ve çözüm çoğu zaman sayfadaki RK4 gibi sayısal yöntemlerle bulunur.",
      "Bu sayfanın ikinci yarısı ise <strong>Sayısal Analiz</strong> ve <strong>Sinyal İşleme</strong> derslerinin kapısıdır. Taylor açılımıyla hata mertebesi bulmak, Richardson ekstrapolasyonu ve Simpson kuralı gibi yüksek mertebeli yöntemlerin temelidir. Gürültülü veriden türev almak ise kötü koşullu bir problemdir: σ·√(Σcᵢ²) kuralı, hareketli ortalama ile Savitzky–Golay arasındaki seçim, gecikme ile gürültü arasındaki ödünleşim ve en iyi örnekleme hızı; laboratuvar ölçümlerinden robot ve araç denetimine kadar her yerde yeniden karşına çıkar. Kalman süzgeci, bu ödünleşimi bir hareket modeliyle birlikte çözmenin standart yoludur.",
    ],
    topics: ["Analizin temel teoremi", "Taylor serisi ve kesme hatası", "Sayısal türev ve integral", "Runge–Kutta yöntemleri", "Sayısal süzgeçler ve gecikme", "Kalman süzgeci"],
  },
  quiz: [
    {
      question: "İvmesi doğrusal değişen bir parçada merkezî farkla hız ölçüyorsun ve Δt'yi 0,2 s'den 0,05 s'ye indiriyorsun. Hata yaklaşık kaç kat küçülür?",
      options: ["4 kat", "8 kat", "16 kat", "Değişmez"],
      answer: 2,
      explanation: "Merkezî farkın hatası j·Δt²/6, yani Δt²'ye orantılıdır. Adım dört kat küçülünce hata 4² = 16 kat küçülür. İleri fark birinci mertebeden olduğu için aynı değişiklikte yalnızca yaklaşık 4 kat iyileşirdi.",
    },
    {
      question: "Sensörün konum gürültüsü σ dört katına çıkarsa, ham fark için gürültü ile kesme hatasını dengeleyen en iyi örnekleme frekansı ne olur?",
      options: ["Dört katına çıkar", "Değişmez", "Yaklaşık 0,63 katına iner", "Dörtte birine iner"],
      answer: 2,
      explanation: "Δt* = (σ/K)<sup>1/3</sup>, yani f* ∝ σ<sup>−1/3</sup>. 4<sup>−1/3</sup> ≈ 0,63: sayfada 6,1 Hz'lik kuram değeri σ = 4 mm'de 3,9 Hz'e iner. Gürültü arttıkça daha seyrek ölçmek, yani farkı daha uzun bir aralığa yaymak gerekir.",
    },
    {
      question: "Bir aralıkta hız zamanla doğrusal değişiyor (ivme sabit). Tek bir dikdörtgenle (n = 1) yer değiştirmeyi tam bulmak istiyorsan yüksekliği nereden almalısın?",
      options: ["Sol uçtaki hızdan", "Sağ uçtaki hızdan", "Aralığın ortasındaki hızdan", "Hiçbiri: en az iki dikdörtgen gerekir"],
      answer: 2,
      explanation: "Doğrusal bir v(t)'nin altındaki yamuğun alanı, orta yüksekliği olan dikdörtgeninkine eşittir: Merton kuralının ve Oresme'nin geometrik ispatının özü budur. Bu yüzden orta nokta kuralı sabit ivmede tamdır; sayfada 6,5–9,5 s aralığında hata \"0 · 0 m\" çıkar.",
    },
  ],
  next: [
    { href: "newton-hareket-yasalari.html", title: "Newton'un Hareket Yasaları: Kuvvet, Kütle ve İvme", why: "Burada ivmeyi yalnızca okuduk; orada nereden geldiğini soruyorsun: bloğu itip sürtünmeyi ölçüyor, Atwood düzeneğinde F = m·a doğrusundan kütleyi geri buluyorsun." },
    { href: "serbest-dusme.html", title: "Serbest Düşme: Galileo'dan Limit Hıza", why: "Sabit ivmenin en temiz örneği: stroboskop izlerindeki y(t) verisinden g'yi çıkarıyor, hava direnciyle ivmenin nasıl sönüp limit hıza vardığını ve Galileo'nun eğik düzlemini görüyorsun." },
    { href: "turev.html", title: "Türev: Kesenden Teğete (Limit Laboratuvarı)", why: "Kirişin teğete dönüşmesinin matematiği; adımı fazla küçültünce bilgisayarın neden yeniden yanılmaya başladığını, sensördeki gürültü ödünleşiminin yuvarlama hatasındaki karşılığını gösterir." },
    { href: "riemann-toplamlari.html", title: "Riemann Toplamları ve Sayısal İntegral", why: "Dikdörtgen, yamuk ve parabol kurallarını aynı alana uygulayıp hatanın n ile hangi hızda eridiğini log–log grafikte karşılaştırırsın." },
  ],
  sources: [
    { title: "OpenStax · University Physics Volume 1, 3.6 Finding Velocity and Displacement from Acceleration", url: "https://openstax.org/books/university-physics-volume-1/pages/3-6-finding-velocity-and-displacement-from-acceleration", note: "a(t)'yi integralleyip v(t) ve x(t)'yi bulmak; sabit ivme denklemlerinin bu integrallerden çıkışı (İngilizce, lisans ders kitabı)." },
    { title: "Wikipedia · Oxford Calculators", url: "https://en.wikipedia.org/wiki/Oxford_Calculators", note: "Merton Koleji'ndeki hesapçılar, kinematiğin dinamikten ayrılması ve Heytesbury'nin ortalama hız teoremi (İngilizce)." },
    { title: "MacTutor · Nicole Oresme", url: "https://mathshistory.st-andrews.ac.uk/Biographies/Oresme/", note: "Oresme'nin yaşamı, <em>De configurationibus</em>'taki grafikler, Merton teoreminin ilk ispatı ve Clagett'in serbest düşme iddialarına itirazı (İngilizce)." },
    { title: "Wikipedia · Savitzky–Golay filter", url: "https://en.wikipedia.org/wiki/Savitzky%E2%80%93Golay_filter", note: "Yerel polinom uydurmayla düzeltme ve türev; 1964 makalesi, katsayı tabloları ve 1972 düzeltmesi (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
