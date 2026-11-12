window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["yenilenebilir-enerji"] = {
  slug: "yenilenebilir-enerji",
  title: "Yenilenebilir Enerji: Rüzgâr, Güneş Hücresi ve Hidroelektrik",
  field: "Fizik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Rüzgâr, güneş ışığı ve yüksekteki su: üçü de fiziğin koyduğu sınırlarla elektriğe döner. Bir rotor rüzgârın en çok 16/27'sini alabilir, bir hücre ısındıkça gerilim kaybeder, su ise yüksekliği kadar enerji taşır.",
  hook:
    "Bir rüzgâr türbini havayı tamamen durdurabilseydi bütün enerjiyi alırdı, değil mi? Hayır: duran hava rotorun önünde birikir ve arkadan gelen rüzgâr diskin çevresinden dolanıp gider. Hiç yavaşlatmamak da işe yaramaz. Doğru cevap ikisinin arasında saklı: rüzgârı diskte üçte bir, uzak izde üçte iki yavaşlatmak. Sıcak bir panelin neden az ürettiği de aynı türden bir soru.",
  bigIdea:
    "Her yenilenebilir kaynak bir <strong>enerji akısıdır</strong> ve her dönüştürücünün fiziksel bir tavanı vardır: rüzgârda güç hızın <em>küpüyle</em> büyür ama rotor en çok <em>16/27</em>'sini alır; güneş hücresi bir diyottur ve gerilimi sıcaklıkla düşer; su ise <em>ηρgQH</em> kadar güç verir. Kesintililik bir zamanlama sorusudur: depo, fazlayı açığa taşır.",
  story: [
    "Bir rüzgâr pervanesinin en fazla ne kadar enerji alabileceği sorusu, yirminci yüzyılın başında üç kez ve birbirinden habersiz cevaplandı. İngiliz mühendis Frederick W. Lanchester en büyük değeri 1915'te gemi pervaneleri üzerine bir çalışmasında türetti; Alman fizikçi Albert Betz sonucu rüzgâr motorları üzerine kısa bir makalede yayımladı (makale 1920 tarihlidir, birçok kaynak 1919 der); Rus aerodinamik okulunun önderi Nikolay Jukovski de ideal bir rüzgâr türbini için aynı sonucu 1920'de yayımladı. Sınır bugün çoğunlukla yalnız Betz'in adıyla anılır; bilim tarihinde bir buluşun ilk bulanın adını pek taşımadığını söyleyen Stigler yasasının tipik bir örneği. İngiliz aerodinamikçi Hermann Glauert 1930'ların ortasında rotorun ize kazandırdığı dönme hareketini de hesaba katarak çözümlemeyi genişletti; dönme hesaba girince ideal rotorun alabileceği pay, özellikle yavaş dönen rotorlarda, 16/27'nin altına iner.",
    "Işığın doğrudan elektrik üretebildiği ise çok daha önce görülmüştü. 1839'da, henüz 19 yaşındaki Edmond Becquerel, babasının laboratuvarında iletken bir çözeltiye daldırılmış bir elektrodu ışığa tuttuğunda akım oluştuğunu gözledi: fotovoltaik etki. 1883'te Charles Fritts ince bir altın tabaka üzerindeki selenyumla bir hücre yaptı; verimi yüzde birin altındaydı. Asıl dönüm noktası 1954'te geldi: Bell Laboratuvarları'nda Daryl Chapin, Calvin Fuller ve Gerald Pearson ilk kullanışlı silisyum p–n eklemli hücreyi tanıttı; verimi yaklaşık yüzde 6'ydı. 1961'de William Shockley ve Hans-Joachim Queisser tek eklemli bir hücrenin aşamayacağı tavanı hesapladı; o ilk hesap 1,1 eV için yaklaşık yüzde 30 veriyordu.",
    "Suyun gücü ise en eski olanı. Ama modern su türbini de on dokuzuncu yüzyılın ürünü: 1849'da Lowell'daki (Massachusetts) dokuma fabrikaları için çalışan mühendis James B. Francis içe akışlı tepki türbinini geliştirdi; kaynaklar verimin yüzde 90 dolayına çıktığını yazar ve onun adını taşıyan türbin ilk modern su türbini sayılır. 1879'da Kaliforniya'da Lester Pelton, Samuel Knight'ın çarkı üzerinde deneyler yaparken jeti ikiye ayıran çift kepçeli çarkını geliştirdi (patenti 1880'de alındı); bu çark yüksek düşü ve az debi içindir. 1913 dolayında Viktor Kaplan, Francis türbininden evrilen pervane tipi Kaplan türbinini yarattı; alçak düşü ve büyük debi için. Üç türbinin hangi suya uyduğunu bugün tek bir boyutsuz sayı, özgül hız söyler.",
  ],
  core: [
    {
      heading: "Aktüatör disk ve Betz sınırı",
      body:
        "Rotoru, havanın içinden geçtiği ince, sürtünmesiz bir disk gibi düşün. Disk hızı v'den v(1 − a)'ya düşürür; buradaki <em>a</em> eksenel indüksiyon çarpanıdır. Momentum dengesi, diskin uzak izde hızı v(1 − 2a)'ya indirdiğini söyler. Disk boyunca geçen kütle akısı ṁ = ρAv(1 − a)'dır; havanın kaybettiği kinetik enerji ½ṁ[v² − v²(1 − 2a)²] olur. Bunu, rotor yokken aynı alandan akacak olan güç ½ρAv³ ile bölünce güç katsayısı çıkar: C<sub>P</sub> = (1 − a)[1 − (1 − 2a)²] = 4a(1 − a)². Türevi alıp sıfıra eşitle: dC<sub>P</sub>/da = 4(1 − a)(1 − 3a) = 0, yani a = 1/3. O noktada disk hızı 2v/3, iz hızı v/3'tür ve C<sub>P</sub> = 16/27 ≈ 0,593 olur. Daha çok yavaşlatırsan daha az hava diskten geçer; daha az yavaşlatırsan geçen hava enerjisini bırakmaz.",
      formula: "C<sub>P</sub> = 4a(1 − a)², &nbsp; C<sub>P,max</sub> = 16/27 (a = 1/3)",
      formulaNote: "Model dönmesiz iz ve sonsuz sayıda kanat varsayar; a büyüdükçe (yaklaşık 0,4'ün üstünde) momentum kuramı geçerliliğini yitirir.",
    },
    {
      heading: "Küp yasası ve ortalama küpün tuzağı",
      body:
        "Birim zamanda alandan geçen hava kütlesi v ile, taşıdığı kinetik enerji v² ile orantılıdır; çarpımları gücü v³ yapar: P = ½ρAv³C<sub>P</sub>. Hız iki katına çıkınca güç sekiz katına çıkar. Rüzgâr ise sabit değildir; saatlik hızlar çoğu yerde bir Weibull dağılımına uyar. Ortalama güç ⟨v³⟩ ile, ortalama hızın küpüyle değil, hesaplanır; hız sabit değilse ⟨v³⟩ her zaman ⟨v⟩³'ten büyüktür (v³ dışbükey bir fonksiyondur, Jensen eşitsizliği). Weibull için oran kapalı biçimde yazılır; k = 2 (Rayleigh) için 6/π ≈ 1,910'dur, dağılım yayıldıkça (k küçüldükçe) büyür. Gerçek türbin bir güç eğrisiyle çalışır: devreye girme hızının altında sıfır, anma hızının üstünde sabit P<sub>r</sub>, devreden çıkma hızında yine sıfır. Kapasite faktörü, ortalama gücün P<sub>r</sub>'ye oranıdır: zaman içinde dağılmış bir rüzgârın fiziksel sonucu.",
      formula: "⟨v³⟩/⟨v⟩³ = Γ(1 + 3/k) / Γ(1 + 1/k)³",
      formulaNote: "CF = ⟨P(v)⟩ / P<sub>r</sub> = (1/P<sub>r</sub>) ∫ P(v) f(v) dv. Sayfa bu integrali hem tohumlu örneklerle hem Simpson kuralıyla hesaplar.",
    },
    {
      heading: "Güneş hücresi bir diyottur",
      body:
        "Işık, p–n ekleminde bir ışık akımı I<sub>L</sub> üretir; eklemin kendisi ise ters yönde akan bir diyot gibi davranır. Tek diyot modelinde çıkış akımı I<sub>L</sub>'den diyot akımı ve kaçak akım çıkarılarak bulunur; R<sub>s</sub> kontak ve şerit direncini, R<sub>sh</sub> kaçak yolları temsil eder. Akım sıfırken açık devre gerilimi V<sub>oc</sub> ≈ nV<sub>T</sub> ln(I<sub>L</sub>/I₀ + 1)'dir: ışık on kat azalınca V<sub>oc</sub> yalnızca nV<sub>T</sub> ln 10 ≈ 59 mV düşer. Güç V·I'nin en büyük olduğu noktada (MPP) alınır; dolum çarpanı FF = P<sub>mp</sub>/(V<sub>oc</sub>I<sub>sc</sub>) eğrinin ne kadar \"köşeli\" olduğunu ölçer. Doyma akımı I₀ ∝ T³e<sup>−E<sub>g</sub>/kT</sup> sıcaklıkla hızla büyüdüğü için V<sub>oc</sub> düşer. Tek eklemli bir hücrenin aşamayacağı Shockley–Queisser tavanını sayfa türetmeden aktarır: 1,34 eV'ta yaklaşık üçte bir, silisyum için yaklaşık yüzde 32.",
      formula: "I = I<sub>L</sub> − I₀[e<sup>(V + IR<sub>s</sub>)/nV<sub>T</sub></sup> − 1] − (V + IR<sub>s</sub>)/R<sub>sh</sub>",
      formulaNote: "V<sub>T</sub> = kT/q ≈ 25,7 mV (25 °C). Denklem I'yı iki yanda içerdiği için sayısal olarak çözülür.",
    },
    {
      heading: "Güneş geometrisi ve en iyi eğim",
      body:
        "Güneşin gökteki yeri üç açıyla bulunur: enlem φ, Dünya'nın eksen eğikliğinden doğan Güneş'in sapma açısı (deklinasyon) δ = 23,44° sin(360°(284 + N)/365) ve öğleden uzaklığı ölçen saat açısı ω = 15°(t − 12). Bunlardan tepe açısının kosinüsü cos z = sin φ sin δ + cos φ cos δ cos ω çıkar. Işık panel yüzeyine θ açısıyla düşerse yalnız cos θ kadarı işe yarar (kosinüs kaybı), alçak Güneş ise atmosferde daha uzun yol alır (hava kütlesi ≈ 1/cos z). \"Eğim = enlem\" kuralı, yıl boyunca öğle Güneşine ortalama dik bakan paneli tarif eder; ama yazın günler daha uzun, Güneş daha yüksek ve hava kütlesi daha küçüktür; yıllık toplamda yaz ağır basar. Yaygın ışığın da yatay yüzeye daha çok düşmesiyle, sayfanın açık gök modelinde en iyi sabit eğim enlemden birkaç derece küçük çıkar; bulutlu bir iklimde sonuç yine değişir.",
      formula: "cos z = sin φ sin δ + cos φ cos δ cos ω",
      formulaNote: "Sayfanın modeli açık gök kullanır: doğrudan ışınım Meinel'in formülü DNI = 1353 · 0,7<sup>AM<sup>0,678</sup></sup> W/m², hava kütlesi Kasten–Young, yaygın ışık doğrudanın %10'u ve izotropik; bulut, kırılma ve zaman denklemi yoktur. En iyi eğim bu modelin sonucudur.",
    },
    {
      heading: "Hidroelektrik, özgül hız ve pompaj",
      body:
        "Saniyede Q metreküp su H yükseklikten inerse potansiyel enerji ρgQH hızıyla açığa çıkar; türbin ve jeneratör bunun η kadarını elektriğe çevirir. Aynı güç büyük düşü ve az debiyle de, alçak düşü ve çok debiyle de elde edilebilir; hangisinin hangi türbine uyduğunu boyut analizinden gelen özgül hız n<sub>s</sub> = n√P/H<sup>5/4</sup> söyler: küçük n<sub>s</sub> Pelton, orta Francis, büyük Kaplan. Sayı birime bağlıdır; sayfa n'yi dev/dk, P'yi kW (elektrik gücü), H'yi metre alır. İngiliz birimlerindeki (beygirgücü, fit) klasik sınırlar 10 ve 100, bu birimlerle yaklaşık 38 ve 381 olur. Pompaj depolamada su yukarı basılır, sonra türbinden geri indirilir; gidiş-dönüş verimi η<sub>p</sub>η<sub>t</sub>'dir. Yükseklik enerjisi seyrektir: 300 m'deki bir kilogram su gH ≈ 2,9 kJ taşır; 200 Wh/kg'lık bir öğretim bataryası ise 720 kJ. Bu yüzden pompaj depoları gölü andıran haznelerle çalışır.",
      formula: "P = ηρgQH, &nbsp; E = ρgA(H₀d + d²/2)",
      formulaNote: "E, taban düşüsü H₀ olan, d derinliğinde düşey duvarlı bir haznenin enerjisidir (ortalama düşü H₀ + d/2).",
    },
  ],
  lab: {
    intro:
      "Laboratuvarın dört sekmesi var: <strong>01 · Rüzgâr ve Betz sınırı</strong>, <strong>02 · Güneş hücresi I–V</strong>, <strong>03 · Güneş geometrisi ve enerji</strong> ve <strong>04 · Hidroelektrik ve depolama</strong>. Okumaların çoğu bir çift ya da üçlüdür: sayfanın sayısal olarak ölçtüğü değer (arama, integral, örnekleme ya da benzetim), formülün verdiği değer ve aradaki fark. Fark sıfıra yakınsa iki yol aynı fiziği anlatıyordur; değilse nedeni modelde ya da örneklemededir. Her sekmenin <strong>Bu sekmeyi sıfırla</strong> düğmesi varsayılanlara döner.",
    experiments: [
      {
        title: "Rüzgârı ne kadar yavaşlatmalı?",
        predict: "Türbin havayı ne kadar çok yavaşlatırsa o kadar çok enerji alır mı? a = 0,1, a = 1/3 ve a = 0,45 için güç katsayısını sırala.",
        do: "01 · Rüzgâr ve Betz sınırı sekmesinde sırayla Hafif yük, a = 1/3'e en yakın ve Ağır yük düğmelerine bas; v = 8 m/s ve D = 100 m'de kal.",
        observe: "C<sub>P</sub> okuması 0,3240, 0,5926 ve 0,5445 olur; ağır yükte bir uyarı çıkar. a = 1/3'e en yakın ayarda güç \"1,46 MW · 1,46 MW\" ile Betz üst sınırına oturur. En büyük C<sub>P</sub> satırı her durumda \"0,592593 · 0,592593 · 0,00000 %\" gösterir.",
        explain: "C<sub>P</sub> = 4a(1 − a)² eğrisinin tepesi a = 1/3'tedir: 4 · (1/3) · (2/3)² = 16/27. Ağır yükte iz hızı v(1 − 2a) = 0,1v'ye iner; hava diskten kaçar ve momentum kuramı zaten bozulmaya başlar.",
      },
      {
        title: "Sıcak çatıda güneş hücresi",
        predict: "Güneşli ama 65 °C'lik bir çatıda hücre standart koşuldakinden (25 °C) daha mı çok, daha mı az güç verir? Akım ve gerilim ayrı ayrı nasıl değişir?",
        do: "02 · Güneş hücresi I–V sekmesinde önce Standart koşul, sonra Sıcak çatı, 65 °C hazırını seç; ardından Bulutlu, 200 W/m² hazırını dene.",
        observe: "Açık devre gerilimi \"542,5 mV · 542,5 mV · −0,01 %\" olur (standartta 620,0 mV); en büyük güç noktası \"444,2 mV · 3,624 A · 1,610 W\" (standartta 1,893 W, yaklaşık yüzde 15 az), FF 0,7657, verim 16,10 %. Kısa devre akımı ise biraz artar: 3,8758 A. Bulutlu hazırda V<sub>oc</sub> farkı \"−41,5 · −41,4 mV\", verim 17,86 %.",
        explain: "Doyma akımı I₀ sıcaklıkla üstel büyür ve V<sub>oc</sub> ≈ nV<sub>T</sub> ln(I<sub>L</sub>/I₀) küçülür; akımdaki yaklaşık yüzde 2'lik artış bunu karşılamaz. Sayfa V<sub>oc</sub>'nin her kelvinde yüzde 0,31 düştüğünü yazar; kaynaklar kristal silisyum için çoğunlukla yaklaşık −0,50 %/°C, en verimli hücreler için −0,35 %/°C verir. Farkın büyük kısmı öğretim hücresinin n = 1 seçiminden gelir: katsayı n ile büyür, ideallik çarpanını 1,3'e getirince model de yaklaşık −0,50 %/K verir. Işık beş kat azalınca V<sub>oc</sub> yalnız nV<sub>T</sub> ln 5 ≈ 41 mV düşer: logaritma, hücrenin loş ışıkta da gerilim tutmasının sebebidir.",
      },
      {
        title: "Kışın panel neden eğik?",
        predict: "41° kuzeyde, 21 Aralık'ta yatay bir panel mi, 30° eğik bir panel mi günde daha çok enerji toplar? Fark küçük mü, büyük mü?",
        do: "03 · Güneş geometrisi ve enerji sekmesinde 41° kuzey ve 21 Aralık hazırlarını seç, Güneş saatini 10:00 yap; sonra 21 Haziran'a geç.",
        observe: "Aralık'ta günlük enerji \"3,85 · 2,09 · 5,35 kWh/m²\" (panel · yatay · izleyen): eğik panel yatayın yaklaşık 1,8 katı. Haziran'da sıra tersine döner: \"8,02 · 8,58 · 12,14\". En iyi sabit eğim satırı \"36,3° · 41,0° · −4,7°\" gösterir; 30°'de yıllık kayıp yalnız 0,5 %.",
        explain: "Kışın Güneş alçaktadır; yatay yüzeye büyük açıyla düşen ışık cos θ kadar zayıflar, eğik panel ona daha dik bakar. Yıllık toplamda uzun ve açık yaz günleri ağır bastığı için en iyi eğim enlemin biraz altında kalır.",
      },
      {
        title: "Türbin seçimi ve günlük depo",
        predict: "Alçak düşülü, büyük debili bir nehir ile yüksek düşülü, küçük debili bir dağ suyu aynı türbini mi ister? Günlük bir depo kayıpsız olsaydı ne kadar küçülürdü?",
        do: "04 · Hidroelektrik ve depolama sekmesinde Alçak düşü, büyük debi ve Yüksek düşü, küçük debi hazırlarını karşılaştır. Sonra varsayılanda Depo gidiş-dönüş verimini 0,80'den 1,00'e getir.",
        observe: "Alçak düşüde \"125,0 dev/dk · 1478\" (n<sub>s</sub> dev/dk, kW ve m ile) ve tür \"Kaplan · Kaplan, Francis\"; yüksek düşüde \"750,0 dev/dk · 33,3\" ve \"Pelton · Pelton\". Gereken en küçük depo varsayılanda \"596,2 MWh · 533,3 MWh\", verim 1,00'de \"533,3 MWh · 533,3 MWh\" olur.",
        explain: "Özgül hız √P/H<sup>5/4</sup> ile ölçeklenir; düşü büyüdükçe küçülür ve kepçeli Pelton'a doğru gider. Depoya giren fazla √η ile dolup açık 1/√η ile boşaldığı için kayıplı depo daha büyük olmalıdır; η = 1'de benzetim kayıpsız ardışık tepe yöntemine eşitlenir.",
      },
    ],
  },
  wow: [
    {
      title: "Bir kilogram batarya, çeyrek ton su",
      body:
        "300 m'lik taban düşüsünde bir kilogram su gH ≈ 2,94 kJ potansiyel enerji taşır. 200 Wh/kg'lık bir öğretim bataryasının bir kilogramına denk gelmek için sayfanın hesabıyla 245 kg su gerekir; tek bir megavatsaat için 1224 m³. Pompaj depoları bu yüzden küçük ama yoğun değil, büyük ama seyrek enerji depolarıdır.",
    },
    {
      title: "Ortalama hızın gizli çarpanı",
      body:
        "Ortalaması 7 m/s olan Rayleigh rüzgârında gerçek ortalama güç yoğunluğu, ortalama hızla hesaplanandan yaklaşık 6/π ≈ 1,91 kat büyüktür. Sayfanın örneklerinde bu \"392 · 205 W/m²\" olarak görünür. Ortalama hız aynı kalıp rüzgâr daha düzensizleşirse (k = 1,5) çarpan 2,72'ye çıkar: küp, hızlı saatleri ödüllendirir.",
    },
    {
      title: "Üç kez bulunan sınır",
      body:
        "Rüzgârdan alınabilecek en büyük pay olan 16/27, Lanchester (1915), Betz (1920) ve Jukovski (1920) tarafından birbirinden bağımsız bulundu. Sonuç o kadar sadedir ki bir sayfada momentum ve enerji dengesiyle türetilebilir; yine de beş yıl içinde, savaşın ayırdığı üç ülkede, üç kez keşfedilmesi gerekti.",
    },
  ],
  worked: {
    title: "Bir rüzgâr türbininin yıllık üretimi",
    prompt:
      "Rotor çapı 100 m, anma gücü 2,5 MW, işletme güç katsayısı 0,45, devreye girme 3 m/s ve devreden çıkma 25 m/s olan bir türbin deniz düzeyinde (ρ = 1,225 kg/m³) çalışıyor. 8 m/s'de rüzgârın taşıdığı gücü, Betz üst sınırını ve anma hızını bul; ortalaması 7 m/s olan Rayleigh rüzgârında yıllık üretimi tahmin et.",
    steps: [
      "Süpürülen alan A = π(100 m)²/4 ≈ 7854 m². Güç akısı ½ρv³ = ½ · 1,225 kg/m³ · (8 m/s)³ = 313,6 W/m²; sayfa bunu \"314 W/m²\" gösterir. Rotordan geçen toplam güç 313,6 · 7854 ≈ 2,46 MW.",
      "Betz üst sınırı: 2,46 MW · 16/27 ≈ 1,46 MW. a = 0,2'de C<sub>P</sub> = 4 · 0,2 · 0,8² = 0,512 ve güç ≈ 1,26 MW; sayfanın güç satırı varsayılanda \"1,26 MW · 1,46 MW\" der.",
      "Anma hızı, ½ρAv<sub>r</sub>³ · 0,45 = 2,5 MW koşulundan: v<sub>r</sub> = [2 · 2,5×10⁶ W / (1,225 · 7854 · 0,45)]<sup>1/3</sup> = (1155 m³/s³)<sup>1/3</sup> ≈ 10,49 m/s. Sayfada Weibull ölçeği ve anma hızı satırı \"7,90 m/s · 10,49 m/s\" gösterir.",
      "Ortalama hızla hesaplanan güç akısı ½ρ⟨v⟩³ = ½ · 1,225 · 343 ≈ 210 W/m², ama Rayleigh'de ⟨v³⟩ = (6/π)⟨v⟩³ olduğundan gerçek ortalama ≈ 401 W/m²'dir. Tohumlu 10 000 örnek \"392 · 205 W/m²\" verir; fark, örnek ortalamasının 6,948 m/s çıkmasından gelir.",
      "Güç eğrisini Weibull yoğunluğuyla tümlemek kapasite faktörünü yüzde 38,6 verir; yıllık üretim 0,386 · 2,5 MW · 8760 sa ≈ 8,46 GWh. Sayfa örneklerden \"38,1 % · 38,6 % · −1,45 %\" ve yıllık üretim için \"8,33 GWh\" gösterir.",
    ],
    result:
      "8 m/s'de rotordan 2,46 MW geçer, bunun en çok 1,46 MW'ı alınabilir; anma hızı 10,49 m/s'dir. 7 m/s ortalamalı Rayleigh rüzgârında kapasite faktörü yaklaşık yüzde 38,6 ve yıllık üretim yaklaşık 8,5 GWh olur; ortalama hızın küpüyle hesap gücü neredeyse yarı yarıya küçük gösterirdi.",
  },
  misconceptions: [
    {
      myth: "Türbin rüzgârı ne kadar çok yavaşlatırsa o kadar çok enerji alır.",
      truth:
        "Havayı fazla yavaşlatan disk, havanın kendi çevresinden dolanmasına yol açar; içinden geçen kütle azalır. En iyi denge a = 1/3'te, iz hızı v/3'teyken kurulur. Sayfada a = 0,45'te C<sub>P</sub> 0,5445'e düşer.",
    },
    {
      myth: "Ortalama rüzgâr hızını bilmek ortalama gücü bulmaya yeter.",
      truth:
        "Güç v³ ile gittiği için ortalaması ⟨v³⟩'tür ve ⟨v⟩³'ten belirgin biçimde büyüktür: Rayleigh rüzgârında 1,91 kat, k = 1,5'te 2,72 kat. Aynı ortalama hızlı iki yer, dağılımları farklıysa çok farklı enerji verebilir.",
    },
    {
      myth: "Güneş paneli en verimli, en sıcak yaz öğlesinde çalışır.",
      truth:
        "Işınım öğlen en yüksektir ama verim sıcaklıkla düşer. Sayfanın modelinde hücre 25 °C'den 65 °C'ye ısınınca V<sub>oc</sub> 620,0 mV'tan 542,5 mV'a iner ve verim 18,93 %'ten 16,10 %'e geriler.",
    },
    {
      myth: "Sabit bir panelin en iyi eğimi her zaman enleme eşittir.",
      truth:
        "Bu kural kaba bir başlangıçtır. Açık gök modelinde 41° kuzey için yıllık en iyi eğim 36,3°'dir; çünkü uzun yaz günleri yıllık toplamı belirler. Bulutlu iklim, yansıma ve yön sapması bu değeri ayrıca kaydırır.",
    },
  ],
  glossary: [
    { term: "Eksenel indüksiyon çarpanı (a)", definition: "Rotor diskinde rüzgâr hızının ne kadar azaltıldığını gösteren oran; disk hızı v(1 − a), uzak iz hızı v(1 − 2a)." },
    { term: "Güç katsayısı (C<sub>P</sub>)", definition: "Rotorun aldığı gücün, rotor alanından serbestçe akan rüzgâr gücüne oranı; ideal sınırı 16/27." },
    { term: "Weibull dağılımı", definition: "Rüzgâr hızı dağılımını iki parametreyle, ölçek c ve biçim k ile tarif eden olasılık dağılımı; k = 2 durumuna Rayleigh denir." },
    { term: "Kapasite faktörü", definition: "Bir santralin belli bir sürede verdiği ortalama gücün anma gücüne oranı; kaynağın zamana dağılışının fiziksel sonucu." },
    { term: "Açık devre gerilimi (V<sub>oc</sub>)", definition: "Hücreden akım çekilmezken uçlarında oluşan gerilim; ışığın logaritmasıyla artar, sıcaklıkla azalır." },
    { term: "Dolum çarpanı (FF)", definition: "En büyük gücün V<sub>oc</sub>·I<sub>sc</sub> çarpımına oranı; I–V eğrisinin ne kadar dikdörtgene benzediğini ölçer." },
    { term: "Hava kütlesi", definition: "Güneş ışığının atmosferde aldığı yolun, Güneş tam tepedeyken alacağı yola oranı; yaklaşık 1/cos z." },
    { term: "Özgül hız (n<sub>s</sub>)", definition: "Devir, güç ve düşüden kurulan, türbin biçimini belirleyen n√P/H<sup>5/4</sup> sayısı; değeri birimlere bağlıdır, küçükse Pelton, ortaysa Francis, büyükse Kaplan uygundur." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Betz türetmesi, <strong>Akışkanlar Mekaniği</strong> dersindeki kontrol hacmi yönteminin en zarif uygulamalarından biridir: kütle, momentum ve enerji denklemleri bir akım tüpüne yazılır. Mühendislik derslerinde bu basit disk, rotorun dönmesini (Glauert) ve kanat profillerinin kaldırma–sürükleme verilerini birleştiren <em>kanat elemanı–momentum</em> kuramına büyür. Özgül hız ise <strong>boyut analizinin</strong> ve Buckingham π teoreminin turbo makinelerdeki karşılığıdır: bir modelden gerçek türbine geçmeyi sağlayan benzerlik yasalarıdır.",
      "Güneş hücresi <strong>katıhal fiziği</strong> ve yarı iletken aygıtlar dersinin konusudur: diyot denklemi taşıyıcı difüzyonundan türetilir, Shockley–Queisser sınırı ise kara cisim ışınımı ve ayrıntılı denge ilkesiyle hesaplanır. Güneş geometrisi küresel trigonometridir; günlük ve yıllık enerji, sayfanın yaptığı gibi Simpson kuralıyla sayısal tümlenir. Depo sığası sorusu da bir zaman serisi problemidir: ardışık tepe yöntemi, hidrolojide baraj hacmini bulmak için geliştirilmiş klasik bir algoritmadır.",
    ],
    topics: ["Kontrol hacmi analizi", "Kanat elemanı–momentum kuramı", "Boyut analizi ve benzerlik", "Olasılık dağılımları ve momentler", "p–n eklemi ve diyot denklemi", "Küresel trigonometri", "Sayısal tümleme"],
  },
  quiz: [
    {
      question: "Rüzgâr hızı yüzde 10 artarsa, aynı güç katsayısında rotorun aldığı güç yaklaşık yüzde kaç artar?",
      options: ["Yüzde 10", "Yüzde 21", "Yüzde 33", "Yüzde 100"],
      answer: 2,
      explanation: "P ∝ v³ olduğundan 1,1³ ≈ 1,331, yani yaklaşık yüzde 33. Sayfadaki P(2v)/P(v) okumasının her hızda 8,000 çıkması aynı küp yasasıdır: 2³ = 8.",
    },
    {
      question: "İki yerde ortalama rüzgâr hızı 7 m/s. Birinde Weibull biçimi k = 2, ötekinde k = 1,5 (daha düzensiz rüzgâr). Ortalama güç yoğunluğu (½ρ⟨v³⟩) hangisinde büyüktür?",
      options: ["k = 2 olan yerde", "k = 1,5 olan yerde", "İkisi eşittir, çünkü ortalama hız aynı", "Hangisi olduğu hava yoğunluğuna bağlıdır"],
      answer: 1,
      explanation: "⟨v³⟩/⟨v⟩³ oranı k küçüldükçe büyür: k = 2'de 1,910, k = 1,5'te 2,719. Küp, seyrek ama hızlı saatlere ağırlık verir. Hava yoğunluğu iki yeri aynı oranda ölçekler, sıralamayı değiştirmez.",
    },
    {
      question: "Bir su türbininde aynı devirde düşüyü yarıya indirip debiyi iki katına çıkarıyorsun. Güç ve özgül hız n<sub>s</sub> = n√P/H<sup>5/4</sup> nasıl değişir?",
      options: ["Güç aynı kalır, n<sub>s</sub> yaklaşık 2,4 katına çıkar", "Güç yarıya iner, n<sub>s</sub> aynı kalır", "Güç ve n<sub>s</sub> aynı kalır", "Güç iki katına çıkar, n<sub>s</sub> yarıya iner"],
      answer: 0,
      explanation: "P = ηρgQH'de QH çarpımı değişmez, güç aynıdır. n<sub>s</sub> ise H<sup>5/4</sup> ile ters orantılıdır: 2<sup>5/4</sup> ≈ 2,38. Türbin Kaplan tarafına kayar; alçak düşü büyük debi ister.",
    },
  ],
  next: [
    { href: "yari-iletkenler-ve-bant-yapisi.html", title: "Yarı İletkenler ve Bant Yapısı: Bant Aralığı, Katkı ve p–n Eklemi", why: "Güneş hücresinin içi: bant aralığı nereden gelir, katkı Fermi düzeyini nasıl kaydırır ve p–n eklemi neden bir diyot gibi davranır." },
    { href: "akiskanlar-mekanigi.html", title: "Akışkanlar Mekaniği: Akış, Kayıp ve Pompa", why: "Betz türetmesindeki süreklilik ve enerji dengesinin boru, tank ve pompa üzerinde kullanılışı; pompanın çalışma noktası iki eğrinin kesişiminden." },
    { href: "elektrik-muhendisligi.html", title: "Elektrik Mühendisliği: Güç, İletim ve Dönüşüm", why: "Üretilen elektriğin yolculuğu: üç fazlı güç, iletim kaybının gerilimle nasıl azaldığı ve transformatörün verim tepesi." },
    { href: "iklim-ve-sera-etkisi.html", title: "İklim ve Sera Etkisi: Enerji Dengesi, Zorlama ve Geri Beslemeler", why: "Güneş sabitinden başlayan öteki hesap: bir gezegenin soğurduğu ve yaydığı enerjinin dengesi, katmanlı atmosfer ve geri beslemeler." },
  ],
  sources: [
    { title: "Wikipedia · Betz's law", url: "https://en.wikipedia.org/wiki/Betz%27s_law", note: "Aktüatör disk türetmesi, 16/27 sınırı ve iz hızının v/3 olması; Lanchester 1915, Betz (maddede 1919), Jukovski 1920 ve Glauert'in dönmeli iz genişletmesi (İngilizce)." },
    { title: "Wikipedia · Timeline of solar cells", url: "https://en.wikipedia.org/wiki/Timeline_of_solar_cells", note: "Becquerel 1839 (19 yaşında), Fritts 1883 (altın üzerinde selenyum, yüzde 1'in altında) ve Bell Laboratuvarları'nın 25 Nisan 1954'te duyurduğu yaklaşık yüzde 6 verimli silisyum hücresi; Chapin, Fuller ve Pearson'ın 1954 makalesi kaynakçada (İngilizce)." },
    { title: "Wikipedia · Shockley–Queisser limit", url: "https://en.wikipedia.org/wiki/Shockley%E2%80%93Queisser_limit", note: "Tek eklemli hücrenin verim tavanı: Mart 1961 makalesinin 1,1 eV'ta yaklaşık yüzde 30'u, AM 1,5 tayfıyla 1,34 eV'ta yüzde 33,16 ve silisyum için yaklaşık yüzde 32 (İngilizce)." },
    { title: "Wikipedia · Water turbine", url: "https://en.wikipedia.org/wiki/Water_turbine", note: "Francis (1849), Pelton (1879) ve Kaplan (1913 dolayı) türbinlerinin tarihi ve tipik düşü aralıkları: Kaplan 2–70 m, Francis 10–300 m, Pelton 80–1600 m (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
