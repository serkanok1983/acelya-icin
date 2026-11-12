window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["okyanus-ve-gelgitler"] = {
  slug: "okyanus-ve-gelgitler",
  title: "Okyanus ve Gelgitler: Çekim Farkından Tsunamiye",
  field: "Yer ve Çevre Bilimleri",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Güneş Dünya'yı Ay'dan 179 kat güçlü çeker, ama gelgiti Ay yönetir. Gelgit çekimin değil çekim farkının işidir; aynı okyanusta tuz ve sıcaklık suyu katmanlara ayırır, derinlik dalganın hızını belirler.",
  hook:
    "Kıyıda deniz günde iki kez yükselir. Ay gökyüzünde günde bir kez geçtiğine göre ikinci kabarma nereden gelir, hem de Ay'ın tam karşı tarafında, suyu Ay'dan uzağa doğru kabartarak? Üstelik Güneş Dünya'yı Ay'dan neredeyse iki yüz kat güçlü çektiği hâlde gelgitteki payı Ay'ınkinin yarısından azdır.",
  bigIdea:
    "Gelgiti yaratan, bir cismin çekimi değil o çekimin Dünya boyunca <strong>değişimidir</strong>: fark uzaklığın küpüyle azalır, iki yana açılan bir alan doğurur ve gerçek okyanus bu zayıf zorlamaya kendi havzalarının, katmanlarının ve dalga hızlarının diliyle yanıt verir.",
  story: [
    "Newton 1687'de yayımlanan <em>Principia</em>'da gelgit kuvvetinin doğru açıklamasını verdi: Ay, Dünya'nın kendisine yakın yüzünü merkezinden biraz daha güçlü, uzak yüzünü biraz daha zayıf çeker. Bu farktan, karasız ve her an dengede bekleyen bir okyanus düşünerek bulunan yüzeye bugün <strong>denge gelgiti</strong> denir. Fikir doğruydu ama kıyıdaki ölçümleri açıklamıyordu: denge gelgiti yarım metre kadar bir açıklık verirken bazı limanlarda deniz on metreden fazla iner çıkar.",
    "Pierre-Simon Laplace 1775'te dinamik kuramı başlattı ve 1776'da okyanus akışı için tek bir doğrusal kısmi diferansiyel denklem takımı kurdu. Soru artık ‘su nerede durur?’ değil, ‘dönen bir gezegendeki okyanus bu periyodik itmeye nasıl tepki verir?’ sorusuydu. Bu denklemlerin dönen bir küre üzerindeki çözümlerinde gelgit, havzaların içinde bir nokta çevresinde döner: bugün bunlara <strong>amfidromik sistemler</strong> denir. Gözlem tarafında William Whewell, kıyı kayıtlarından eş gelgit çizgileri çizerek 1836'da neredeyse küresel bir harita yayımladı ve suyun hiç yükselip alçalmadığı bir nokta olabileceğini ileri sürdü; böyle bir noktanın varlığı 1840'ta Kaptan William Hewett'in Kuzey Denizi'ndeki dikkatli iskandil ölçümleriyle doğrulandı.",
    "Kuramın havza ayrıntılarını tam çözemediği yerde Lord Kelvin (William Thomson) 1867'den başlayarak başka bir yol açtı: gelgit kaydını, dönemleri gökbilimden bilinen kosinüslerin toplamı olarak yazıp her birinin genliğini ve evresini kayıttan çıkarmak. Bu <strong>harmonik analizin</strong> ters işlemi, yani tahmin, 1872–73'te Edward Roberts'ın katkısıyla tasarlanıp Légé'nin atölyesinde yapılan ilk mekanik gelgit tahmin makinesine verildi: bileşenleri mekanik olarak toplayıp gelgit eğrisini çizen bir analog hesap makinesi. Tahminler 1960'lara, bazı ülkelerde 1970'lere kadar böyle makinelerle yapıldı; 1944 Normandiya çıkarmasının gelgit tahminlerinde de Thomson'un makinesinden türeyen pirinç makineler kullanıldı. Arthur Doodson 1921'de gelgit potansiyelinin ilk modern harmonik açılımını yayımladı ve 388 ayrı gelgit frekansı ayırdı.",
    "Dalgaların matematiği de aynı yüzyılda olgunlaştı. George Green 1838'de, derinliği ve genişliği yavaşça değişen sığ bir kanalda ilerleyen dalganın yüksekliğinin derinliğin dördüncü kökü ile ters orantılı büyüdüğünü gösterdi; bugün buna <strong>Green yasası</strong> denir. George Biddell Airy 1841'de sonlu derinlikteki küçük genlikli dalgaların doğru türetilişini yayımladı: ω² = gk tanh(kh). Bu tek bağıntı hem açık denizdeki rüzgâr dalgasını hem okyanusu bir jet hızında geçen tsunamiyi anlatır; sayfanın dördüncü sekmesi bu iki ucu yan yana koyar.",
  ],
  core: [
    {
      heading: "Gelgit ivmesi: çekimin farkı",
      body:
        "Dünya'nın merkezi Ay'a doğru GM/d² ≈ 3.32 × 10⁻⁵ m/s² ile serbest düşer. Yakın yüzdeki su biraz daha büyük, uzak yüzdeki biraz daha küçük ivme görür; merkezin ivmesi çıkarılınca geriye kalan küçük farka <strong>gelgit ivmesi</strong> denir. Yakın yüzde tam fark GM/(d − R)² − GM/d²'dir; R/d küçükken (1 − x)⁻² ≈ 1 + 2x açılımı bunu 2GMR/d³'e indirir. Bir sonraki terim bağıl hatayı verir: yakın yüzde +3R/(2d), uzak yüzde −3R/(2d). Ay için R/d = 0.0166, yani yaklaşım iki yüzde de yaklaşık % 2.5 yanılır, ters işaretle.",
      formula: "a ≈ 2GMR/d³,  hata ≈ ±3R/(2d)",
      formulaNote: "Küp, gelgitin uzaklığa aşırı duyarlı olmasının nedenidir; hata ise 1/d ile azalır ve cisim yaklaştıkça iki şişkinlik eşitliğini yitirir.",
    },
    {
      heading: "İki şişkinlik ve Güneş'in payı",
      body:
        "Gelgit ivmesi Ay doğrultusunda iki yana dışarı, ona dik çemberde içeri doğrudur: yan noktadaki ivme yakın yüzdekinin yaklaşık yarısıdır ve merkeze bakar. Bu alan bir potansiyelden türer, Φ ≈ −(GMR²/d³)·P₂(cos θ), P₂ = (3cos²θ − 1)/2. Denge yüzeyi η = −Φ/g olduğundan en yüksek ile en alçak nokta arasındaki fark (3/2)(M/M<sub>D</sub>)(R/d)³R'dir: Ay için 0.535 m. Aynı formülde Güneş'in kütlesi 27 milyon kat büyük, uzaklığı 389 kat fazladır; küpü alınca Güneş'in gelgiti Ay'ınkinin 0.46 katına iner.",
      formula: "Δη = (3/2)(M/M<sub>D</sub>)(R/d)³·R",
      formulaNote: "M<sub>D</sub> Dünya'nın kütlesi. Ay ile Güneş aynı doğrultudayken (yeni ay ve dolunay) etkiler toplanır, dik açıdayken birbirinden çıkar.",
    },
    {
      heading: "Gerçek gelgit: havza, bileşenler ve harmonik analiz",
      body:
        "Okyanus denge gelgitini izleyemez: uzun dalgalar okyanusu geçerken Dünya'nın dönüşüyle aynı mertebede zaman harcar, kıtalar yolu keser, Coriolis etkisi dalgayı havza içinde döndürür. Sonuç, gelgitin bir <strong>amfidromik nokta</strong> çevresinde döndüğü, açıklığın merkezde sıfır, kıyıda büyük olduğu sistemlerdir; rezonansa yakın körfezlerde açıklık on metreyi aşar. Ama kayıt hep aynı frekansları taşır: M₂ (12.42 sa), S₂ (12.00 sa), K₁ (23.93 sa), O₁ (25.82 sa). M₂ ile S₂'nin toplamı bir vurudur ve 14.77 günlük büyük–küçük gelgit döngüsünü verir; bu süre tam olarak yarım sinodik aydır (29.53/2 gün), çünkü iki frekansın farkı Ay'ın Güneş'e göre dolanımının iki katıdır. Frekanslar bilindiği için kayıttan yalnız genlik ve evre çıkarılır: her bileşene bir cos ve bir sin sütunu, normal denklemler (XᵀX)b = Xᵀη ve A = √(a² + b²). İki frekansı ayırmak için kayıt en az 1/|f₁ − f₂| uzunlukta olmalıdır (Rayleigh ölçütü): M₂–S₂ için 14.77, K₁–O₁ için 13.66 gün. Daha kısa kayıtta sütunlar birbirine benzer, sistem kötü koşullanır; yeterli kayıtta genlik hatası σ√(2/N) olur.",
      formula: "T<sub>büyük–küçük</sub> = 1/(1/T<sub>S₂</sub> − 1/T<sub>M₂</sub>) ≈ 14.77 gün,  δA ≈ σ√(2/N)",
      formulaNote: "σ ölçüm gürültüsü, N örnek sayısı: saatlik 30 günlük kayıtta N = 721, σ = 5 cm için δA ≈ 0.26 cm. K₁ ve O₁ art arda iki yüksek suyu eşitsiz yapar; 02 sekmesinde Biloxi, MS'de günlükler baskındır ve günde 1.037 yüksek su sayılır.",
    },
    {
      heading: "Deniz suyu: eğri bir durum denklemi ve tabakalaşma",
      body:
        "Deniz suyunun yoğunluğu sıcaklıkla azalır, tuzlulukla artar; ama ilişki doğrusal değildir: soğuk suda sıcaklığın etkisi zayıflar, saf su 3.98 °C'de en yoğundur. Bu bükümün sonucu <strong>kabelleşmedir</strong>: yoğunlukları eşit iki su kütlesi karışınca karışım, her ikisinden de yoğun olabilir ve batar. Fazla, ikinci türevlerle −½f(1 − f)ΔᵀHΔ biçiminde yazılır; H durum denkleminin Hessian'ıdır. Soğuk suda ρ(T)'nin bükümü baskın olduğu için fazla çoğunlukla pozitiftir; yoğunlukları eşit iki su için okyanusun sıcaklık ve tuzluluk aralığında hep pozitiftir. Ama tuzluluk farkı büyük, sıcaklık farkı küçük olan bazı karışımlar ağırlıklı ortalamadan biraz hafif çıkar. Düşeyde yoğunluk aşağı doğru artıyorsa sütun kararlıdır; yukarı itilen bir su parçası N frekansıyla salınır.",
      formula: "N² = (g/ρ)·dρ/dz  (z aşağı doğru)",
      formulaNote: "N² > 0 kararlı, N² < 0 kararsız sütun. Termoklinde N² ≈ 6 × 10⁻⁴ s⁻², salınım dönemi 2π/N ≈ 4 dakika.",
    },
    {
      heading: "Dispersiyon: derin su, sığ su ve tsunami",
      body:
        "Doğrusal dalga kuramı açısal frekansı dalga sayısına bağlar. Derin suda (kh ≫ 1) tanh ≈ 1, c = √(g/k): uzun dalga hızlı gider ve grup hızı fazın yarısıdır, c<sub>g</sub> = c/2, yani tepeler paketin arkasında doğup önünde kaybolur. Sığ suda (kh ≪ 1) tanh(kh) ≈ kh, c = c<sub>g</sub> = √(gh): hız yalnız derinliğe bağlıdır. 200 km dalga boylu bir tsunami 4 km derinlikte kh = 0.126 ile sığ su dalgasıdır ve saatte 700 kilometreden hızlı ilerler. Kıyıya yaklaşırken dönem sabit kalır, enerji akısı (½ρgA²)·c<sub>g</sub> korunur; sığ suda c<sub>g</sub> ∝ √h olduğundan A ∝ h<sup>−1/4</sup> (Green yasası). Derin suda başlayan rüzgâr dalgasında bu üs yanlıştır, çünkü açık denizde c<sub>g</sub> derinliğe bağlı değildir.",
      formula: "ω² = gk·tanh(kh),  c<sub>g</sub> = (c/2)[1 + 2kh/sinh(2kh)]",
      formulaNote: "c = ω/k faz hızı, c<sub>g</sub> = dω/dk grup hızı. Sınırlar: kh > π derin, kh < π/10 sığ.",
    },
  ],
  lab: {
    intro:
      "Sayfada dört sekme var. <strong>01 · Gelgit kuvveti</strong>, cismin kütlesini (Ay kütlesi biriminde) ve uzaklığını değiştirip tam çekim farkını 2GMR/d³ yaklaşımıyla, ölçülen denge yükseltisini kuramla ve Güneş'in payını karşılaştırır. <strong>02 · Ay, Güneş ve gelgit takvimi</strong>, gerçek istasyon genlikleriyle saatlik yapay bir kayıt üretir, büyük–küçük gelgit dönemini yüksek sulardan ölçer ve en küçük kareler uyumuyla genlikleri geri kazanır (evreler bir öğretim varsayımıyla sıfırdır). <strong>03 · Tuzluluk, sıcaklık ve yoğunluk</strong>, UNESCO 1981 durum denklemiyle iki su kütlesini karıştırır ve tek boyutlu bir su sütununda N² hesaplar. <strong>04 · Derin ve sığ su dalgaları</strong>, bir dalga paketinde tepe ve zarf hızını ölçer, tsunami hızını ve kıyıda sığlaşmayı hesaplar. Her sekmenin kendi sıfırlama düğmesi vardır; R tuşu etkin sekmeyi sıfırlar.",
    experiments: [
      {
        title: "Uzaklığın küpü",
        predict:
          "Ay yerberiden (363 300 km) yerötesine (405 500 km) uzaklaşınca uzaklık % 11.6 artar. Denge gelgitinin açıklığı da % 11.6 mı azalır, yoksa çok daha fazla mı?",
        do:
          "01 · Gelgit kuvveti sekmesinde önce <strong>Ay · yerberi</strong>, sonra <strong>Ay · yeröte</strong> düğmesine bas ve iki durumda da denge yükseltisi farkını ve Güneş/cisim oranını oku. Sonra <strong>Çok yakın bir ay</strong> düğmesine bas.",
        observe:
          "Yükselti farkı 0.641 m'den 0.461 m'ye iner: oran 1.390, (405.5/363.3)³ = 1.391. Güneş/cisim oranı 0.3775'ten 0.5264'e çıkar. Çok yakın ayda (20 bin km, yaklaşık 3.14 R) yaklaşımın hatası yakın yüzde +81.04 %, uzak yüzde −33.32 % olur ve durum satırı şişkinliklerin artık eşit olmadığını söyler.",
        explain:
          "Gelgit ivmesi çekimin farkıdır ve 1/d³ ile değişir: % 11.6'lık uzaklık değişimi % 39'luk gelgit değişimi demektir. Yaklaşımın hatası ±3R/(2d) olduğundan cisim yaklaştıkça yakın şişkinlik uzaktakinden belirgin biçimde büyür; 2GMR/d³ yalnız uzak bir cisim için iyidir.",
      },
      {
        title: "On dört buçuk günlük vuru ve kayıt uzunluğu",
        predict:
          "M₂ 12.42 saatte, S₂ tam 12 saatte bir döner. Kaç günde bir yeniden aynı evreye gelirler? Kayıt bu süreden kısa olursa iki bileşen hâlâ ayrılabilir mi?",
        do:
          "02 · Ay, Güneş ve gelgit takvimi sekmesini varsayılanda (San Francisco, CA; 30 gün; gürültü σ 5 cm) aç; büyük–küçük gelgit dönemine, açıklığa, koşul sayısına ve tablodaki geri kazanılan genliklere bak. Sonra <strong>Kayıt uzunluğu</strong>nu 10 gün yap. En son 30 güne dönüp <strong>Uydurulan bileşenler</strong> menüsünden Yalnız M₂'yi seç.",
        observe:
          "Ölçülen dönem 14.767 gün, kuram 14.765 gün (+0.01 %). Açıklık büyük gelgitte 143.4 cm, küçük gelgitte 88.6 cm: tam olarak 2(58.0 + 13.7) ve 2(58.0 − 13.7). Koşul sayısı 1.48, beklenen genlik hatası 0.26 cm; S₂ 13.7 yerine 13.83, K₁ 36.8 yerine 36.94 çıkar. 10 günde dönem ‘— (kayıt kısa)’ olur, koşul sayısı 1.84'e, beklenen genlik hatası 0.46 cm'ye çıkar (tabloda en büyük gerçek hata O₁'de 0.45 cm) ve durum satırı kaydın ayırma süresinden kısa olduğunu söyler. Yalnız M₂ uyumunda artık RMS 4.98 cm'den 33.62 cm'ye fırlar.",
        explain:
          "İki yakın frekansın toplamı bir vurudur; zarfın dönemi frekans farkının tersidir ve aynı süre, en küçük karelerin iki bileşeni ayırabilmesi için gereken en kısa kayıttır. 10 günde M₂ ile S₂ birbirine göre bir turun yalnız üçte ikisi kadar kayar; sütunlar birbirine benzer ve gürültü ikisi arasında paylaşılır. Modelde bulunmayan bileşenler ise yok olmaz: artığa ve öteki genliklere sızar. κ'nın 1.41'in altına inmemesi ise sütun boylarındandır (sabit √N, kosinüs ve sinüs √(N/2)): anlamlı olan bunun üstündeki kısımdır.",
      },
      {
        title: "Eşit yoğunlukta iki su, karışınca batar",
        predict:
          "2 °C ve 34.50 tuzluluktaki su ile 15 °C ve 37.07 tuzluluktaki suyun yoğunluğu neredeyse aynıdır. Yarı yarıya karışınca karışım nereye gider?",
        do:
          "03 · Tuzluluk, sıcaklık ve yoğunluk sekmesini varsayılanda aç. Sonra <strong>Durum denklemi</strong> menüsünden Doğrusal yaklaşımı seç; ardından UNESCO'ya dönüp <strong>Yalnız tuzluluk farkı</strong> düğmesine bas.",
        observe:
          "ρ<sub>A</sub> 1027.571, ρ<sub>B</sub> 1027.569 kg/m³; karışım 1027.813 kg/m³. Fazla +0.243 kg/m³, ikinci türevlerden kuram +0.242 kg/m³; hacim −2.37 × 10⁻⁴ oranında küçülür. Doğrusal denklemde fazla 0.000 olur; yalnız tuzluluğu farklı iki suda da 0.000 ve durum satırı ‘ρ tuzlulukla neredeyse doğrusal’ der.",
        explain:
          "Yoğunluk sıcaklığa göre bükülü bir eğridir; karışım noktası A ile B'yi birleştiren doğrunun ortasındadır ve T–S çizgesinde eş yoğunluk eğrilerinin daha yoğun tarafına düşer. Etki tuzluluktan değil, ρ(T)'nin eğriliğinden ve T–S karışık terimden gelir.",
      },
      {
        title: "Tsunami jet hızında, rüzgâr dalgası değil",
        predict:
          "4 km derin bir okyanusta 200 km dalga boylu bir dalga ile 100 m dalga boylu bir dalga ne hızla gider? Kıyıda 10 m derinliğe vardıklarında 0.5 m'lik genlikleri ne olur?",
        do:
          "04 · Derin ve sığ su dalgaları sekmesinde <strong>Tsunami: 200 km, 4000 m</strong> düğmesine bas, sonra <strong>Derin: 100 m, 4000 m</strong> düğmesine bas; iki durumda hızları, geçiş süresini ve kıyıdaki genliği oku.",
        observe:
          "Tsunamide c = 197.5 m/s, √(gh) = 198.1 m/s (713 km/sa), 1000 km 1.40 saatte geçilir; kıyıda genlik enerji akısıyla 2.227 m, Green yasasıyla 2.236 m (+0.4 %, ‘uyuşur’). Derin suda tepe hızı 12.44 m/s ölçülür (kuram 12.49 m/s), zarf hızı 6.263 m/s (kuram 6.247 m/s), oran 0.5000. Kıyıda genlik 0.466 m'dir; Green yasası 2.236 m vererek +379.5 % yanılır.",
        explain:
          "Dalga boyu derinliğin 50 katı olan tsunami okyanusta sığ su dalgasıdır: hızı yalnız derinliğe bağlıdır ve grup hızı faz hızına eşittir. 100 m'lik dalga ise kh = 251 ile derin su dalgasıdır: enerjisi c/2 ile taşınır ve kıyıda c<sub>g</sub> önce artıp sonra azaldığı için genliği h<sup>−1/4</sup> gibi büyümez. Tepe hızındaki −0.43 %'lük fark ölçüm yönteminden gelir: paket sonlu genişliktedir ve zarfın eğimi tepeyi biraz geri çeker.",
      },
    ],
  },
  wow: [
    {
      title: "Güneş 179 kat güçlü çeker, gelgitte yarıdan az pay alır",
      body:
        "Dünya'nın merkezinde Güneş'in çekim ivmesi 5.93 × 10⁻³ m/s², Ay'ınki 3.32 × 10⁻⁵ m/s²: oran yaklaşık 179. Ama gelgit çekimin değil farkının işidir ve fark uzaklığın küpüyle düşer; Güneş 389 kat uzak olduğu için gelgit etkisi Ay'ınkinin yalnız yaklaşık % 46'sıdır.",
    },
    {
      title: "Yarım metrelik sürücü, on altı metrelik gelgit",
      body:
        "Denge gelgiti büyük gelgitte bile 80 santimetre kadar bir açıklık verir. Kasım 1998'de Fundy Körfezi'ndeki Burntcoat Head'de ise 16.3 metrelik açıklık ölçüldü. Aradaki farkı yaratan kuvvet değil, okyanusun ve kıyının geometrisidir: havzanın dinamik tepkisi ve rezonansı zayıf sürücüyü yerel olarak katlarca büyütür.",
    },
    {
      title: "Bir makinenin çizdiği çıkarma günü",
      body:
        "Kelvin'in 1872–73'te tasarladığı gelgit tahmin makinesi, gelgit bileşenlerinin kosinüslerini mekanik olarak toplayan bir analog hesap makinesiydi. 1876 ve 1879 makineleri bir limanın bütün yıllık eğrisini dört saat kadarda çiziyordu; benzerleri 1960'lara kadar kullanıldı. 1944 Normandiya çıkarmasının gelgit tahminlerinde de bu soydan pirinç makineler çalıştı.",
    },
  ],
  worked: {
    title: "Ay'ın ve Güneş'in denge gelgiti",
    prompt:
      "GM<sub>Ay</sub> = 4.903 × 10¹² m³/s², Dünya'nın yarıçapı R = 6.371 × 10⁶ m, Ay'ın ortalama uzaklığı d = 3.844 × 10⁸ m, Ay/Dünya kütle oranı 0.01230, g = GM<sub>D</sub>/R² = 9.820 m/s² alınsın. (a) Yakın yüzdeki gelgit ivmesini yaklaşımla hesapla ve g ile karşılaştır. (b) Denge gelgitinin en yüksek ve en alçak noktası arasındaki farkı bul. (c) Güneş (kütlesi Ay'ınkinin 2.707 × 10⁷ katı, uzaklığı 1.496 × 10¹¹ m) için aynısını yap; büyük ve küçük gelgitteki açıklığı ve büyük–küçük gelgit döngüsünün süresini bul.",
    steps: [
      "Gelgit ivmesi: a ≈ 2GMR/d³ = 2 × (4.903 × 10¹² m³/s²) × (6.371 × 10⁶ m) / (3.844 × 10⁸ m)³ = 6.247 × 10¹⁹ / 5.680 × 10²⁵ ≈ 1.100 × 10⁻⁶ m/s². Bu, g'nin yalnız 1.12 × 10⁻⁷ katıdır. Sayfada 01 sekmesinin varsayılanında yaklaşım kutusu 1.100 × 10⁻⁶ m/s², tam fark 1.128 × 10⁻⁶ m/s² gösterir; aradaki +2.54 % ilk düzeltme terimi 3R/(2d) = % 2.49 ile açıklanır.",
      "Denge yüzeyi: R/d = 0.016574, (R/d)³ = 4.553 × 10⁻⁶. Δη = (3/2) × 0.01230 × 4.553 × 10⁻⁶ × 6.371 × 10⁶ m ≈ 0.535 m. Su yakın ve uzak yüzde yükselir, yan çemberde alçalır; kuramsal yükselti +0.357 m, çukur −0.178 m'dir. Sayfa tam potansiyelden 0.541 m ölçer (+1.12 %): fark, P₃ teriminin yakın şişkinliği uzaktakinden yüksek yapmasından gelir.",
      "Güneş/Ay oranı aynı formülden: (M<sub>G</sub>/M<sub>A</sub>)·(d<sub>A</sub>/d<sub>G</sub>)³ = 2.707 × 10⁷ × (3.844 × 10⁸ / 1.496 × 10¹¹)³ = 2.707 × 10⁷ × 1.697 × 10⁻⁸ ≈ 0.459. Güneş'in denge gelgiti 0.459 × 0.535 m ≈ 0.246 m.",
      "Büyük gelgitte (yeni ay, dolunay) açıklıklar toplanır: 0.535 + 0.246 ≈ 0.78 m; küçük gelgitte (ilk ve son dördün) çıkar: 0.535 − 0.246 ≈ 0.29 m. Sayfa ölçülen Ay değeriyle 0.787 m ve 0.295 m gösterir.",
      "Döngünün süresi M₂ ile S₂'nin vurusudur: 1/(1/12 sa − 1/12.4206 sa) = 354.4 sa ≈ 14.77 gün. 02 sekmesinin varsayılan kaydında ölçülen dönem 14.767 gündür.",
    ],
    result:
      "Ay'ın gelgit ivmesi ≈ 1.10 × 10⁻⁶ m/s² (g'nin on milyonda biri), denge açıklığı ≈ 0.54 m; Güneş'in payı ≈ 0.46 kat, 0.25 m. Büyük gelgitte ≈ 0.78 m (sayfa tam potansiyelle 0.787 m), küçük gelgitte ≈ 0.29 m; ikisi arasındaki döngü 14.77 gün. Gerçek kıyılarda açıklığın bundan katlarca büyük ya da küçük olması havzanın dinamik tepkisindendir.",
  },
  misconceptions: [
    {
      myth: "Uzak taraftaki şişkinliği merkezkaç kuvvet iter; Ay yalnız yakın taraftaki suyu çeker.",
      truth:
        "Durağan bir gözlemcinin (eylemsiz çerçeve) gözüyle bakınca Dünya'nın bütünü Ay'a doğru 3.32 × 10⁻⁵ m/s² ile düşer. Uzak yüzdeki su aynı yöne 1.07 × 10⁻⁶ m/s² daha az ivmelenir, yani merkezin gerisinde kalır: şişkinlik budur ve hiçbir itme gerekmez. Dünya'nın kendi dönüşünden gelen merkezkaç etki gelgitle ilgisizdir; Dünya–Ay ortak kütle merkezi çevresindeki dolanımdan gelen eylemsizlik terimi ise Dünya'nın her noktasında aynıdır ve merkezin çekimini götürmekten başka iş yapmaz.",
    },
    {
      myth: "Gelgitte Güneş'in etkisi Ay'ınkinden büyük olmalı, çünkü Güneş çok daha güçlü çeker.",
      truth:
        "Çekim 1/d² ile, çekim farkı 1/d³ ile azalır. Güneş Dünya'yı yaklaşık 179 kat güçlü çeker, ama Dünya'nın bir yüzüyle öteki yüzü arasındaki fark Güneş için çok küçüktür; gelgit etkisi Ay'ınkinin yaklaşık 0.46 katıdır. 01 sekmesindeki Güneş/cisim oranı bunu doğrudan gösterir.",
    },
    {
      myth: "İki su kütlesi karışınca yoğunluk her zaman ikisinin arasında bir değer olur.",
      truth:
        "Deniz suyunun durum denklemi eğri olduğu için eşit yoğunluklu iki su karışınca karışım daha yoğun olup batabilir (kabelleşme); 03 sekmesinin varsayılanında fazla +0.243 kg/m³'tür. Fazlanın işareti ikinci türevlere bağlıdır: −2 °C ve 40 tuzluluktaki su ile 0 °C ve 30 tuzluluktaki suyu yarı yarıya karıştırırsan karışım ağırlıklı ortalamadan 0.012 kg/m³ hafif çıkar (yine de iki yoğunluğun arasındadır). Doğrusal bir denklemde fazla tam sıfırdır.",
    },
    {
      myth: "Tsunami açık denizde de dev bir dalgadır; Green yasası her dalganın kıyıda nasıl büyüdüğünü verir.",
      truth:
        "Açık okyanusta tsunaminin genliği dalga boyunun yanında önemsizdir (sayfanın örneğinde 200 km'lik dalgada 0.5 m) ve hareket bütün su sütununu kaplar. Yavaşlayınca enerji akısı korunur ve genlik büyür. Green yasası A ∝ h<sup>−1/4</sup> yalnız iki uçta da sığ su dalgası için geçerlidir; açık denizde derin su dalgası olarak başlayan rüzgâr dalgasında 04 sekmesi bu yasanın genliği yaklaşık beş kat abarttığını gösterir.",
    },
  ],
  glossary: [
    { term: "Gelgit ivmesi", definition: "Bir cismin bir noktaya uyguladığı çekim ivmesi ile Dünya'nın merkezine uyguladığı çekim ivmesi arasındaki fark; uzaklığın küpüyle azalır." },
    { term: "Denge gelgiti", definition: "Karasız, dönmeyen ve her an gelgit potansiyeline uyum sağlayan bir okyanusun alacağı yüzey; gerçek gelgitin yalnızca sürücüsüdür." },
    { term: "Amfidromik nokta", definition: "Gelgit dalgasının çevresinde döndüğü, açıklığın sıfıra yaklaştığı nokta; eş gelgit çizgileri buradan ışın gibi çıkar." },
    { term: "Gelgit bileşeni", definition: "Gelgit kaydında dönemi gökbilimden bilinen tek bir kosinüs terimi; ör. M₂ (12.42 sa), S₂ (12.00 sa), K₁ (23.93 sa), O₁ (25.82 sa)." },
    { term: "Büyük ve küçük gelgit", definition: "Ay ile Güneş'in etkileri aynı yöndeyken oluşan en büyük açıklık ile dik açıdayken oluşan en küçük açıklık; aralarındaki döngü yaklaşık 14.77 gündür." },
    { term: "Kabelleşme", definition: "Durum denkleminin eğriliği yüzünden, iki su kütlesinin karışımının her ikisinden daha yoğun olup batması." },
    { term: "Brunt–Väisälä frekansı (N)", definition: "Kararlı tabakalaşmış bir akışkanda düşey itilen parçanın salınım frekansı, N² = (g/ρ)dρ/dz; kaldırma frekansı da denir." },
    { term: "Grup hızı", definition: "Bir dalga paketinin zarfının, dolayısıyla enerjinin ilerleme hızı, c<sub>g</sub> = dω/dk; derin suda faz hızının yarısı, sığ suda ona eşittir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Gelgit kuvveti, <strong>Klasik Mekanik</strong> dersinde potansiyelin çok kutuplu açılımının ilk somut örneğidir: 1/|D − r| Legendre polinomlarıyla açılınca tek kutup ve çift kutup terimleri düşer, gelgit P₂ ile başlar. Aynı fikir Roche sınırını, Ay'ın Dünya'ya hep aynı yüzünü göstermesini ve gelgit sürtünmesiyle günün uzamasını anlatır. Gerçek okyanusa geçmek için <strong>Jeofizik Akışkanlar Dinamiği</strong> derslerinde dönen bir küre üzerindeki sığ su denklemleri (Laplace'ın gelgit denklemleri), Kelvin dalgaları ve havza rezonansı çalışılır; harmonik analiz ise <strong>Sayısal Yöntemler</strong> ve <strong>Sinyal İşleme</strong> derslerindeki en küçük kareler ve Fourier çözümlemesiyle aynı matematiktir.",
      "Deniz suyunun durum denklemi <strong>Fiziksel Oşinografi</strong>nin temelidir: potansiyel sıcaklık, basıncın sıkıştırma etkisi ve bugünkü TEOS-10 standardı, kabelleşmenin ve termobarik etkinin derin su oluşumundaki rolü bu derste ele alınır. Dalga tarafında, ω² = gk tanh(kh) bağıntısı potansiyel akış ve sınır koşullarından türetilir; dalga paketleri ve durağan faz yöntemi <strong>Matematiksel Fizik</strong>te, doğrusal olmayan dalgalar, kırılma ve tsunami yayılımı ise kıyı mühendisliğinde karşına çıkar.",
    ],
    topics: ["Legendre polinomları ve çok kutuplu açılım", "Laplace gelgit denklemleri", "Kelvin dalgaları ve amfidromik sistemler", "En küçük kareler ve Fourier analizi", "Deniz suyu durum denklemi (TEOS-10)", "İç dalgalar ve kaldırma frekansı", "Dispersiyon ve grup hızı", "Sığ su denklemleri ve tsunami"],
  },
  quiz: [
    {
      question: "Ay bugünkü uzaklığının yarısında olsaydı (kütlesi aynı), denge gelgitinin açıklığı yaklaşık kaç katına çıkardı?",
      options: ["2 katına", "4 katına", "8 katına", "16 katına"],
      answer: 2,
      explanation: "Açıklık (R/d)³ ile orantılıdır: d yarıya inince (1/2)⁻³ = 8. Çekimin kendisi 1/d² ile yalnız 4 kat artardı; gelgit farkla ilgilendiği için bir kuvvet daha hızlı değişir. Bu kadar yakında 2GMR/d³'ün hatası da ikiye katlanır (±3R/(2d) ≈ % 5); 01 sekmesinde uzaklığı 192.2 bin km yapınca yükselti farkı 0.541 m'den 4.379 m'ye, yani 8.09 katına çıkar; 8'den fazlası tam potansiyelin yüksek mertebeli terimlerindendir.",
    },
    {
      question: "Bir tsunami 4000 m derin okyanustan 1000 m derinliğindeki bir kıta yamacına geçiyor. Hızı yaklaşık ne olur?",
      options: ["Değişmez, çünkü dalga boyu çok uzun", "Yarıya iner", "Dörtte bire iner", "İki katına çıkar"],
      answer: 1,
      explanation: "Tsunami okyanusta bile sığ su dalgasıdır (dalga boyu derinliğin onlarca katı), bu yüzden c ≈ √(gh). Derinlik dörtte bire inince hız √(1/4) = 1/2 katına iner: yaklaşık 198 m/s'den 99 m/s'ye. Dönem sabit kaldığı için dalga boyu da yarıya iner ve enerji daha dar bir bölgeye sıkışır.",
    },
    {
      question: "Saatlik bir gelgit kaydından M₂ (12.42 sa) ile S₂ (12.00 sa) genliklerini ayrı ayrı bulmak istiyorsun. Gürültü azsa bile kayıt yaklaşık en az ne kadar olmalıdır?",
      options: ["Bir gün, çünkü iki bileşen de günde iki kez döner", "Yaklaşık 15 gün", "Bir yıl", "Örnek sayısı yeterliyse süre önemli değildir"],
      answer: 1,
      explanation: "İki frekansı ayırmak için kayıt, aralarındaki göreli evrenin bir tam tur kaydığı süre kadar olmalıdır: 1/|f₁ − f₂| ≈ 14.77 gün. Daha kısa kayıtta iki kosinüs birbirine benzer, en küçük kareler sistemi kötü koşullanır ve gürültü genlikler arasında paylaşılır. 02 sekmesinde kaydı 10 güne indirince koşul sayısı ve beklenen genlik hatası büyür, büyük–küçük gelgit dönemi ölçülemez.",
    },
  ],
  next: [
    { href: "dalga-superpozisyonu.html", title: "Dalga Süperpozisyonu: Girişim, Vuru ve Dalga Paketleri", why: "Büyük–küçük gelgitin arkasındaki vuruyu ve dalga paketinde grup hızını, girişimden başlayarak genel biçimiyle incele." },
    { href: "ay-evreleri.html", title: "Ay Evreleri, Tutulmalar ve Mevsimler", why: "Büyük gelgitin neden yeni ay ve dolunayda geldiğini anlamak için Ay–Güneş geometrisini ve evreleri izle; sinodik ve yıldızıl ay sekmesindeki 29.53 günün yarısı, buradaki 14.77 günlük döngüdür." },
    { href: "atmosfer-ve-hava.html", title: "Atmosfer ve Hava: Basınç, Bulut Tabanı, Kararlılık ve Coriolis", why: "Okyanustaki N² ve tabakalaşmanın atmosferdeki karşılığı: kararlılık sekmesinde itilen hava parselinin salınımını say, Coriolis'in akışı nasıl çevirdiğini gör." },
    { href: "kepler-yasalari.html", title: "Kepler Yasaları — Gezegen Yörüngeleri", why: "Ay'ın yerberi ile yeröte arasında gidip gelmesinin kaynağı olan eliptik yörüngeyi Newton'un çekim yasasından sayısal olarak çöz." },
  ],
  sources: [
    { title: "Wikipedia · Tide", url: "https://en.wikipedia.org/wiki/Tide", note: "Newton 1687, Whewell'in 1836 eş gelgit haritası ve Hewett'in 1840 doğrulaması, Kelvin'in 1867'de başlayan harmonik analizi, Doodson 1921 ve 388 frekans, Güneş'in % 46'lık payı, 54 ve 25 cm'lik denge genlikleri, Burntcoat Head'de Kasım 1998'de ölçülen 16.3 m (İngilizce)." },
    { title: "Wikipedia · Theory of tides", url: "https://en.wikipedia.org/wiki/Theory_of_tides", note: "Laplace'ın 1775 dinamik kuramı ve 1776 denklemleri, Kelvin'in 1860'lardaki harmonik analizi, bileşen tablosu ve sayfanın kullandığı istasyon genlikleri (İngilizce)." },
    { title: "Wikipedia · Tide-predicting machine", url: "https://en.wikipedia.org/wiki/Tide-predicting_machine", note: "Kelvin'in 1872–73 makinesi, Roberts ve Légé'nin payları, 1876 ve 1879 makinelerinin hızı, 1960'lara uzanan kullanım ve 1944 Normandiya tahminleri (İngilizce)." },
    { title: "Wikipedia · Airy wave theory", url: "https://en.wikipedia.org/wiki/Airy_wave_theory", note: "Airy'nin 1841'de yayımladığı doğru türetiliş, dispersiyon bağıntısı, derin su (h > λ/2) ve sığ su (h < λ/20) sınırları (İngilizce)." },
    { title: "Wikipedia · Green's law", url: "https://en.wikipedia.org/wiki/Green%27s_law", note: "George Green'in 1838 makalesi, h<sup>−1/4</sup> ve b<sup>−1/2</sup> bağımlılığı, enerji akısıyla ilişkisi ve kıyıya çok yakında geçersizliği (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
