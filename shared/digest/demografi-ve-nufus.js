window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["demografi-ve-nufus"] = {
  slug: "demografi-ve-nufus",
  title: "Demografi: Nüfusu Ölçmek, Anlamak, Öngörmek",
  field: "Tarih ve Toplum",
  level: "Lise–Lisans",
  minutes: 40,
  tagline:
    "Bir ülkenin nüfusu yalnız doğum, ölüm ve göçle değişir; zor olan bunları yaşa göre ölçmek. Toplam doğurganlığı elle topla, yaşam tablosu kur, demografik geçişi gerçek serilerle sına.",
  hook:
    "Japonya'da 1975'te her bin kişiden yılda 6,4'ü ölüyordu; 2023'te 12,3'ü. Aynı yıllarda doğumda yaşam beklentisi 74,4'ten 84,7'ye çıktı (BM WPP 2024). İnsanlar her yaşta daha az ölürken ölüm hızı nasıl iki katına çıkar?",
  bigIdea:
    "Demografinin sayıları birer <strong>tanımdır</strong>: hangi pay, hangi payda, hangi yaş, hangi dönem; kaba bir hız yaş yapısını da ölçer, yaşam beklentisi tipik bir ölüm yaşı değildir, projeksiyon bir kehanet değil, varsayımlarının <em>koşullu</em> sonucudur.",
  story: [
    "1662'de Londralı John Graunt, kentin kilise bölgelerinden (parish) haftalık derlenen <em>ölüm cetvellerini</em> (Bills of Mortality) inceleyen bir kitap yayımladı: <em>Natural and Political Observations Made upon the Bills of Mortality</em>. Cetveller doğumları, ölümleri ve ölüm nedenlerini sayıyordu ama ölenin yaşını yazmıyordu. Graunt bu eksiği akıl yürütmeyle kapattı ve her yaşa ulaşma olasılığını veren ilk <strong>yaşam tablosunu</strong> kurdu; kayıtların güvenilirliğinden de kuşkulanıyordu, çünkü ölüm nedenlerini mahalle görevlileri belirliyordu. Demografi, eksik ve kusurlu bir kayıttan düzenli bir sonuç çıkarma çabası olarak doğdu; bu yanı hiç değişmedi.",
    "1693'te Edmond Halley, Breslau kentinin (bugün Wrocław) Caspar Neumann'ın sağladığı yaş kayıtlarıyla ölüm yaşlarını çözümleyen bir çalışma yayımladı. Nüfusta ölümlülüğü yaşla ilişkilendiren en erken çalışmalardan biriydi ve ömür boyu gelir (annuity) satışının alıcının yaşına göre fiyatlanmasına dayanak oldu; sigortacılığın aktüerya tabloları bu çizgiden gelir. İki yüzyıl sonra soru büyüdü: ölüm ve doğum hızları neden düşer? 1929'da Warren Thompson, <em>American Journal of Sociology</em>'deki “Population” makalesinde ülkeleri gözlenen doğum ve ölüm hızlarına göre gruplayan ilk taslağı verdi (bazı özetler 1930 der), Adolphe Landry 1934 dolaylarında benzer gözlemlerde bulundu, Frank Notestein 1940'lar ve 1950'lerde daha biçimsel bir <strong>demografik geçiş</strong> kuramı geliştirdi. Model Avrupa deneyiminden çıkmıştı ve Avrupa'nın içinde bile istisnaları vardı: Fransa'da doğum ve ölüm aynı dönemde düştüğü için 19. yüzyılda bir nüfus patlaması yaşanmadı.",
    "Nedenler bugün de tartışmalıdır. John Caldwell, doğurganlık düşüşünün sanayileşmeyi izlemekten çok ona öncülük edebildiğini savundu; 1986'da Ron Lesthaeghe ve Dirk van de Kaa, yenileme düzeyinin altındaki doğurganlığı değer ve aile davranışlarındaki değişimle açıklayan <em>ikinci demografik geçiş</em> çerçevesini önerdi. 1971'de Nathan Keyfitz <em>Demography</em> dergisinde nüfus artışının <strong>ivmesi</strong> üzerine bir makale yayımladı: genç bir nüfus, doğurganlığı bugün yenileme düzeyine inse bile on yıllarca büyür. Bugün ülke tahminlerinin ortak kaynağı BM Nüfus Bölümü'nün <em>World Population Prospects</em> dizisidir ve her yeni revizyon geçmiş yılları da yeniden yazar; bu sayfadaki her sayı \"WPP 2024'e göre\" diye okunmalıdır. Uzun tarihsel ölüm serileri ise Human Mortality Database'ten gelir (sayfanın İsveç ve Fransa serileri HMD 2025)."
  ],
  core: [
    {
      heading: "Kaba hız: payda bütün nüfustur",
      body:
        "<strong>Kaba doğum hızı</strong> (KDH) bir yıldaki doğumların yıl ortası nüfusa oranıdır, 1000 kişi başına. Paydada doğurma çağında olmayan çocuklar ve yaşlılar da vardır; bu yüzden KDH kadınların davranışı kadar nüfusun yaş yapısını da ölçer. Sayfa bunu doğrudan sınatır: Türkiye 2023'ün yaşa özel doğurganlık hızlarını Türkiye'nin kendi kadın nüfusuna uygulayınca yılda 1,07 milyon doğum ve KDH 12,24 ‰ çıkar (BM'nin yayımladığı 12,28); aynı hızları Japonya 2023 nüfusuna uygulayınca 8,01 ‰, Nijerya 2023'e uygulayınca 11,80 ‰. Japonya'nın kadınları yaşlıdır; Nijerya'nın nüfusunun %41,5'i 15 yaşın altındadır ve henüz doğurmaz. Kaba ölüm hızının yaşlanmayla yükselmesi de aynı paydanın öbür yüzüdür.",
      formula: "KDH = 1000 × Σ (₅Fₓ / 1000) × W<sub>x</sub> / P",
      formulaNote: "₅Fₓ: x–x+5 yaşındaki kadınların doğurganlık hızı (‰); Wₓ: o yaştaki kadın sayısı; P: toplam yıl ortası nüfus.",
    },
    {
      heading: "Toplam doğurganlık: bir dönemin kurgusal kadını",
      body:
        "<strong>Toplam doğurganlık hızı</strong> (TDH), yaşa özel hızların toplamının 5 katıdır, çünkü her yaş grubu 5 yıl sürer. Anlamı: bir kadın bugünkü hızları bütün doğurganlık çağı boyunca yaşasaydı doğuracağı ortalama çocuk sayısı. Bu bir <em>dönem</em> ölçüsüdür; gerçek bir doğum kuşağının <em>tamamlanmış</em> doğurganlığı ancak o kuşak 50 yaşını geçince bilinir. İkisi ayrışabilir: kadınlar doğumu ileri yaşlara erteliyorsa, kuşakların toplam çocuk sayısı değişmese bile dönem TDH'si o yıllarda geçici olarak düşük çıkar (<strong>tempo etkisi</strong>). Türkiye 2023 için hızların toplamı 325,7 ‰, TDH 1,629; BM'nin tek yaşlık hızlardan yayımladığı değer 1,625.",
      formula: "TDH = 5 × Σ ₅Fₓ / 1000   (x = 10, 15, …, 50)",
      formulaNote: "Ortalama doğurma yaşı Σ(x + 2,5)·₅Fₓ / Σ₅Fₓ: Türkiye 2023'te 29,2 yaş.",
    },
    {
      heading: "Yenileme düzeyi neden her yerde 2,1 değil?",
      body:
        "Bir kuşağın kendini yenilemesi için her kadının ortalama bir kız çocuk bırakması ve o kızın da doğurma yaşına ulaşması gerekir. <strong>Brüt yeniden üretim hızı</strong> (GRR) yalnız kız doğumları sayar: TDH × kız payı. <strong>Net yeniden üretim hızı</strong> (NRR) ayrıca kızların hayatta kalmasını da hesaba katar: her yaş grubunun hızı, seçilen kadın yaşam tablosunda o yaşlarda geçirilmesi beklenen yıl sayısı ₅Lₓ ile çarpılır. NRR = 1 yapan TDH <strong>yenileme düzeyidir</strong>. Ölüm hiç olmasa ₅Lₓ = 5 olur ve eşik yalnız cinsiyet oranından gelir: (100 + oran) / 100, yani oran 105 iken 2,05. Bugünkü düşük ölümlülük bunu 2,1'e taşır; yüksek ölümlülük 3'ün üstüne çıkarır, doğumda erkek fazlası da yükseltir.",
      formula: "NRR = (100 / (100 + oran)) × Σ (₅Fₓ / 1000) × ₅Lₓ;  yenileme TDH'si = TDH / NRR",
      formulaNote: "₅Lₓ'yi l(A) × 5 ile yaklaşıkla (A: ortalama doğurma yaşı) ve yenileme ≈ (100 + oran) / (100 · l(A)) elde et.",
    },
    {
      heading: "Yaşam tablosu ve e₀'ın gerçek anlamı",
      body:
        "Girdi, yaşa özel ölüm hızlarıdır: ₙMₓ = ölümler / yıl ortası nüfus. Hız bir olasılık değildir; x yaşına ulaşanın n yıl içinde ölme olasılığı ₙqₓ, aralıkta ölenlerin orada geçirdiği ortalama süre aₓ ile bulunur. Ardından zincir kurulur: hayatta kalanlar lₓ, ölümler ₙdₓ, yaşanan kişi-yıllar ₙLₓ, kalan toplam Tₓ ve kalan ömür eₓ = Tₓ / lₓ. Doğumda yaşam beklentisi e₀, l(x) eğrisinin altındaki alandır; bir <em>ortalamadır</em> ve bebek ölümleri yüksekken ölümler iki yerde yığılır: ilk yıllarda ve yaşlılıkta. Türkiye 1950'de (WPP 2024'ten kurulan tablo) e₀ 47,61 yıl (BM 47,29), ama 1 yaşına ulaşan birinin kalan ömrü 57,33 yıl, yani beklenen ölüm yaşı 58,33; bu tablonun kurgusal kuşağında ölenlerin yarısı 61,3 yaşından sonra ölür. e₀ \"insanlar 47 yaşında ölürdü\" demek değildir.",
      formula: "ₙqₓ = n·ₙMₓ / (1 + (n − aₓ)·ₙMₓ),   e₀ = ∫₀^∞ l(x) dx",
      formulaNote: "Ulusal ve uluslararası kurumların verdiği e₀ bir dönem ölçüsüdür: o yılın hızlarına ömür boyu maruz kalacak varsayımsal bir kuşak.",
    },
    {
      heading: "Kuşak-bileşen projeksiyonu ve nüfus ivmesi",
      body:
        "Projeksiyon nüfusu beşer yıllık adımlarla ilerletir: her yaş grubu hayatta kalma oranı ₅Lₓ₊₅ / ₅Lₓ ile bir üst gruba geçer, doğurganlık çağındaki kadınlara yaşa özel hızlar uygulanarak doğumlar bulunur, sonra net göç eklenir. Kadın nüfusu için bu tek bir matris çarpımıdır, P(t + 5) = A·P(t) (<strong>Leslie matrisi</strong>); uzun dönemde nüfus A'nın en büyük özdeğeri λ ile her adımda λ katına çıkar ve yaş yapısı ona karşılık gelen özvektöre yerleşir. Yenileme düzeyinde λ = 1'dir, ama yaş yapısı oraya hemen gelmez: genç bir nüfusta doğurma çağına girecek kalabalık kuşaklar doğum sayısını on yıllarca yüksek tutar. Doğurganlık bir anda yenileme düzeyine indirildiğinde nüfusun sonunda ulaştığı durağan büyüklüğün bugünkü nüfusa oranı <strong>nüfus ivmesidir</strong>.",
      formula: "P(t + 5) = A · P(t),   ivme = P<sub>durağan</sub> / P(2023)",
      formulaNote: "Sonuç bir kehanet değil, \"bu doğurganlık, ölümlülük ve göç sürerse\" sorusunun yanıtıdır; varsayımı değiştiren sonucu değiştirir.",
    },
  ],
  lab: {
    intro:
      "Sayfa bir veri tezgâhıdır: her sekmede gerçek BM verisinden (WPP 2024; İsveç ve Fransa'nın uzun serilerinde HMD 2025) kendin hesap yapar, sonucu yayımlanan değerle yan yana görürsün. <strong>01 · Hızlar ve doğurganlık</strong> yaşa özel hızları sürgülerle gösterir ve TDH'yi senin toplamanı ister; <strong>02 · Yaşam tablosu</strong> düzenlenebilir ölüm hızlarından tabloyu satır satır kurar; <strong>03 · Nüfus piramitleri</strong> iki piramidi bağımlılık oranları ve ortanca yaşla karşılaştırır (köşeli parantezde BM değeri); <strong>04 · Demografik geçiş</strong> kaba doğum ve ölüm hızlarını yıl sürgüsüyle izler; <strong>05 · Projeksiyon</strong> senin seçtiğin TDH, yaşam beklentisi ve göç hızıyla nüfusu 2103'e taşır. Her sekmede \"Bu sekmeyi sıfırla\" düğmesi var.",
    experiments: [
      {
        title: "TDH'yi elle topla, yenileme düzeyini kaydır",
        predict: "Türkiye 2023'ün TDH'si kaç? Ve aynı doğurganlık hızları 1950'nin ölüm düzeniyle yaşansaydı, nüfusu yenilemek için kadın başına kaç çocuk gerekirdi: yine yaklaşık 2,1 mi?",
        do: "01 · Hızlar ve doğurganlık sekmesinde tablodaki dokuz ₅Fₓ değerini topla, 5 ile çarp, 1000'e böl ve \"Senin hesapladığın TDH\" kutusuna yaz, Denetle'ye bas. Sonra \"NRR için kadın ölüm düzeni\" menüsünden Türkiye 1950'yi seç; ardından \"Doğumda cinsiyet oranı\" sürgüsünü 120'ye çek.",
        observe: "Toplam 325,7 ‰; 1,63 yazınca \"Doğru: 5 × 325,7 / 1000 = 1,629\" der (BM WPP 2024: 1,625). 0,326 yazarsan 5 ile çarpmayı unuttuğunu söyler. Varsayılan durumda GRR 0,795, NRR 0,773, yenileme düzeyi 2,11 (kadın e₀ 79,9). Türkiye 1950 ölüm düzeninde NRR 0,531'e düşer, yenileme düzeyi 3,07 olur; cinsiyet oranı 120'de 3,29'a çıkar.",
        explain: "Doğurganlık hızları aynı kaldı; değişen, kızların doğurma yaşına ulaşma olasılığıdır. 1950 tablosunda bir kız çocuğun ortalama doğurma yaşına (29,2) ulaşma olasılığı yaklaşık 0,67, 2023'te 0,97: yenileme düzeyi aşağı yukarı bu olasılıkla ters orantılı büyür. \"2,1\" bir doğa sabiti değil, düşük ölümlülüğün ve 105 civarındaki cinsiyet oranının sonucudur.",
      },
      {
        title: "e₀ kırkların sonundaysa insanlar kaç yaşında ölürdü?",
        predict: "Türkiye 1950'de doğumda yaşam beklentisi yaklaşık 47 yıl. 0–4 yaş ölümlerini tümden kaldırırsan e₀ kaç yıl artar: iki yıl mı, yirmi yıl mı?",
        do: "02 · Yaşam tablosu sekmesinde \"Ölüm hızları\" menüsünden Türkiye 1950'yi seç (İki cinsiyet birlikte). Özet kutularını ve grafikteki ölüm yoğunluğu sütunlarını oku. Sonra \"0–4 yaş ölüm hızı çarpanı\" sürgüsünü 0'a çek; aynısını Türkiye 2023'te yap.",
        observe: "Türkiye 1950: e₀ 47,61 yıl (BM 47,29), e₁ 57,33 (yaş olarak 58,33), ortanca ölüm yaşı 61,3, 5 yaş üstünde en çok ölüm 80–89 aralığında, q₀ 184,4 ‰. Çarpan 0'da e₀ 68,24'e çıkar: yirmi yıldan fazla. Türkiye 2023'te e₀ 77,21'den 78,21'e, yalnız bir yıl artar.",
        explain: "Ölüm yoğunluğu iki tepelidir: bebeklikte ve yaşlılıkta. Ortalama ikisinin arasına düşer ve o yaşta ölen pek azdır. Bebeklik ölümleri yüksekken her bebek ölümü ortalamadan onlarca yıl siler; bu yüzden geçmişteki düşük e₀ değerleri, yetişkinlerin genç öldüğü anlamına gelmez. 1 yaşına ulaşanın beklenen ömrünün doğumdakinden uzun olması da aynı nedenden.",
      },
      {
        title: "Model mi, seri mi: İsveç, Fransa, Japonya",
        predict: "Demografik geçiş modeline göre önce ölüm, çok sonra doğum düşer. İsveç'te ve Fransa'da bu sıra aynı mı? Japonya 2023 hangi aşamada görünür?",
        do: "04 · Demografik geçiş sekmesinde İsveç 1850'yi oku (varsayılan). \"Ülke ve seri\" menüsünden Fransa'yı seçip yıl sürgüsünü 1850'ye, sonra 1900'e getir. Son olarak Japonya'yı seç (2023'te açılır).",
        observe: "İsveç 1850: KDH 32,1, KÖH 15,2, doğal artış 16,9 ‰ (yılda %1,69), aşama \"2: ölüm düştü, doğum yüksek\"; zamanlama \"KÖH < 20: 1858 · KDH < 30: 1885 · doğum 27 yıl sonra\". Fransa 1850: 26,8 ve 17,4, doğal artış 9,3 ‰; 1900'de yalnız 2,9 ‰; zamanlama \"doğum 116 yıl önce\" der (KDH 1829'da, KÖH 1945'te kalıcı olarak eşiğin altına iner). Japonya 2023: KDH 6,0, KÖH 12,3, aşama \"5 (önerilen): doğal azalma\".",
        explain: "Fransa'da doğurganlık ölümlülükle birlikte, hatta ondan önce düştü; model bir yasa değil, bir ülke grubunun deneyiminden çıkarılmış bir betimlemedir. Aşama okuması sayfanın kendi eşiklerini kullanır; eşikleri değiştirmek aşamayı değiştirir. Japonya'nın kaba ölüm hızının yükselmesi ise ölümlülüğün artışı değil, yaşlanmadır.",
      },
      {
        title: "Yenileme düzeyinde büyüyen nüfus",
        predict: "Nijerya'da doğurganlık bugün bir anda yenileme düzeyine inse ve göç olmasa, 2103'te nüfus bugünkünden büyük mü küçük mü olur? Japonya'da?",
        do: "05 · Projeksiyon sekmesinde önce varsayılan Türkiye senaryosunu oku. Sonra \"Başlangıç nüfusu\" menüsünden Nijerya'yı seçip \"Hemen yenileme düzeyi, göç yok\" düğmesine bas; ardından aynısını Japonya ile yap. İstersen 03 · Nüfus piramitleri sekmesinde Nijerya 2023 ile Japonya 2023'ü yan yana koy.",
        observe: "Türkiye (2023 hızları sürerse: TDH 1,63, e₀ 77,1, göç −3,6 ‰): 87,27 milyondan 2103'te 41,74 milyona (−%52,2), tepe 88,04 milyon · 2033, 65+ payı %10,0 → %28,4, ortanca yaş 33,5 → 48,9. Nijerya yenileme düzeyinde (TDH 2,60): 2103'te 330,53 milyon (+%45,0), tepe 2083'te; ivme 1,450. Japonya (TDH 2,06): nüfus 2023'ten başlayarak azalır, 2103'te 92,29 milyon; ivme 0,744.",
        explain: "Ortanca yaşı 18,8 olan Nijerya'da (sayfanın hesabı; BM 17,8) doğum sayısı, kalabalık kuşaklar doğurma çağından geçene dek yüksek kalır; yaşlı Japonya'da ise doğurma çağındaki kadın sayısı küçüktür ve ölümler çoğalır. Yenileme düzeyi uzun dönemin dengesini belirler; yolu ve varış büyüklüğünü bugünkü yaş yapısı belirler. Bunlar BM'nin resmî senaryoları değil, sayfanın öğretim modelinin koşullu sonuçlarıdır.",
      },
    ],
  },
  wow: [
    {
      title: "Daha uzun yaşayan, daha çok ölen ülke",
      body:
        "WPP 2024'e göre Japonya'da kaba ölüm hızı 1975'te binde 6,4, 2023'te binde 12,3; aynı dönemde doğumda yaşam beklentisi 74,4'ten 84,7'ye çıktı. Her yaşta ölümlülük düştü, ama nüfusun çok daha büyük bir kısmı ölümün sık olduğu yaşlara geldi. 2023'te Japonya'nın nüfusunun %29,6'sı 65 yaşında ya da daha yaşlı.",
    },
    {
      title: "Yenileme düzeyi bir sabit değil",
      body:
        "Türkiye 2023'ün doğurganlık hızları ve kadın ölümlülüğüyle yenileme düzeyi 2,11 çocuktur; aynı hızlar Türkiye 1950'nin kadın ölümlülüğüyle 3,07 gerektirirdi. Ölüm hiç olmasa eşik (100 + cinsiyet oranı) / 100, yani 2,05 civarına iner: tek bir kız çocuğu bırakmak için ortalama iki çocuktan biraz fazlası gerekir, çünkü doğumların yarısından azı kızdır.",
    },
    {
      title: "Bugün yenilense de yüzde 45 büyüyen nüfus",
      body:
        "Keyfitz'in 1971'de <em>Demography</em> dergisinde nasıl ölçüleceğini gösterdiği nüfus ivmesi sayfanın modelinde açıkça görünür: Nijerya'da doğurganlık 2023'te bir anda yenileme düzeyine (2,60) inse ve göç olmasa, nüfus 2083'e dek büyür ve 2103'te 330,53 milyon olur, 2023'ün %45 üstünde. Türkiye'nin ivmesi 1,169, Japonya'nınki 0,744: aynı TDH, farklı yaş yapısıyla zıt yönlere götürür.",
    },
  ],
  worked: {
    title: "Yenileme düzeyini eldeki sayılardan kurmak",
    prompt:
      "Türkiye 2023 (WPP 2024): TDH = 1,629, doğumda cinsiyet oranı 104,9 erkek / 100 kız, ortalama doğurma yaşı 29,2. Kadın yaşam tablosunda bir kızın 29,2 yaşına ulaşma olasılığı l(29,2) ≈ 0,974; Türkiye 1950 kadın tablosunda ≈ 0,669. GRR'yi, yaklaşık NRR'yi ve iki ölümlülük düzeninde yenileme düzeyi TDH'sini bul; sayfanın tam hesabıyla karşılaştır.",
    steps: [
      "Kız payı = 100 / (100 + 104,9) = 100 / 204,9 = 0,4880. GRR = TDH × kız payı = 1,629 × 0,4880 = 0,795 kız çocuk / kadın. Sayfanın \"Brüt yeniden üretim hızı\" kutusu 0,795 gösterir.",
      "Kızların hepsi doğurma yaşına ulaşmaz. Doğumlar ortalama 29,2 yaşında toplandığı için NRR ≈ GRR × l(29,2) = 0,795 × 0,974 ≈ 0,774. Sayfa ₅Lₓ'leri tek tek integre ederek NRR = 0,773 bulur; yaklaşım binde bir yakın.",
      "Yenileme düzeyi NRR'yi 1 yapan TDH'dir. NRR TDH ile doğru orantılı olduğundan yenileme TDH'si = TDH / NRR ≈ 1 / (kız payı × l(A)) = 1 / (0,4880 × 0,974) ≈ 2,10. Sayfa 2,11 gösterir.",
      "Ölümlülüğü 1950'ye götür: 1 / (0,4880 × 0,669) ≈ 3,06. \"NRR için kadın ölüm düzeni\" menüsünde Türkiye 1950'yi seçince sayfa NRR 0,531 ve yenileme düzeyi 3,07 verir.",
      "Sınır durumu: ölüm yoksa l = 1 ve yenileme TDH'si = 1 / 0,4880 = 2,05. Cinsiyet oranı 120 olsaydı 220 / 100 = 2,20 olurdu. Böylece \"2,1\" sayısının iki bileşeni ayrılır: 2,05'i doğumdaki cinsiyet oranı, kalan 0,05'i doğurma yaşına dek ölen kızlar getirir.",
    ],
    result:
      "Türkiye 2023'te GRR 0,795, NRR yaklaşık 0,77 ve yenileme düzeyi yaklaşık 2,1; 1950 ölümlülüğüyle aynı hesap 3,07 verir. TDH 1,629 olduğundan her kuşak, göç olmadan, kendinin yaklaşık dörtte üçü kadar bir kız kuşağı bırakır.",
  },
  misconceptions: [
    {
      myth: "Ortaçağda ya da 1950'de yaşam beklentisi 45 civarındaysa, insanlar genellikle 45 yaşında ölürdü.",
      truth:
        "e₀ bir ortalamadır ve bebeklik ölümleri yüksekken iki tepeli bir dağılımın ortasına düşer. Türkiye 1950'nin tablosunda e₀ 47,61, ama ölenlerin yarısı 61,3 yaşından sonra ölür ve 5 yaş üstünde ölümlerin en sık olduğu aralık 80–89'dur. 0–4 yaş ölümlerini kaldırınca e₀ yirmi yıl artar.",
    },
    {
      myth: "Kaba ölüm hızı yükseliyorsa sağlık koşulları kötüleşiyor demektir.",
      truth:
        "Kaba hızın paydasında bütün nüfus vardır; yaşlanan bir nüfusta her yaşta ölümlülük düşerken kaba ölüm hızı artabilir. Japonya'da 1975'ten 2023'e KÖH binde 6,4'ten 12,3'e çıktı, e₀ ise 74,4'ten 84,7'ye. Sağlık düzeyini karşılaştırmak için yaşa özel hızlar ya da yaş yapısından bağımsız olan e₀ kullanılır.",
    },
    {
      myth: "TDH yenileme düzeyinin altına inince nüfus hemen azalmaya başlar.",
      truth:
        "Yaş yapısı ağırlıklı gençse nüfus on yıllarca büyümeye devam eder (nüfus ivmesi); göç de toplamı değiştirir. Sayfanın modelinde Türkiye 2023 hızlarıyla bile nüfus 2033'e dek artar (tepe 88,04 milyon), Nijerya yenileme düzeyinde 2083'e dek büyür.",
    },
    {
      myth: "Bağımlılık oranı 15–64 yaşındakilerin baktığı kişi sayısını ölçer.",
      truth:
        "Oran yalnız yaş sınırlarına dayanan kaba bir betimlemedir: 15–64 yaşındakilerin hepsi çalışmaz, 65 yaş üstündekilerin bir kısmı çalışır. Türkiye'de toplam bağımlılık 1975'te 86,1, 2023'te 46,7'dir (WPP 2024); genç bağımlılık 77,2'den 32,0'a inerken yaşlı bağımlılık 8,9'dan 14,7'ye çıktı. Oran nüfusun yaş yapısını betimler, kimin kime baktığını ölçmez.",
    },
  ],
  glossary: [
    { term: "Kaba doğum ve ölüm hızı", definition: "Bir yıldaki doğum ya da ölüm sayısının yıl ortası toplam nüfusa oranı, 1000 kişi başına; yaş yapısından etkilenir." },
    { term: "Yaşa özel doğurganlık hızı (₅Fₓ)", definition: "x ile x + 5 yaşları arasındaki kadınların bir yılda yaptığı doğumların, o yaştaki kadın sayısına oranı (1000 kadın başına)." },
    { term: "Toplam doğurganlık hızı (TDH)", definition: "Yaşa özel hızların toplamının 5 katı; bugünkü hızları ömür boyu yaşayan kurgusal bir kadının ortalama çocuk sayısı." },
    { term: "Net yeniden üretim hızı (NRR)", definition: "Bugün doğan bir kız, bir dönemin yaşa özel doğurganlık ve kadın ölüm hızları altında yaşasaydı ortalama kaç kız doğururdu; doğurma yaşlarına ulaşamama olasılığı da hesaba katılır. 1 ise kuşaklar kendini tam yeniler." },
    { term: "Yaşam tablosu", definition: "Yaşa özel ölüm hızlarından, varsayımsal bir doğum kuşağının yaş yaş nasıl azaldığını (lₓ, ₙdₓ, ₙLₓ, eₓ) hesaplayan tablo." },
    { term: "Dönem ve kuşak ölçüsü", definition: "Dönem ölçüsü tek bir yılın hızlarını kurgusal bir ömre yayar; kuşak ölçüsü aynı yılda doğanların gerçekte yaşadıklarını izler." },
    { term: "Bağımlılık oranı", definition: "0–14 ve 65 yaş üstü nüfusun 15–64 yaş nüfusuna oranı × 100; yaş yapısının kaba bir göstergesi." },
    { term: "Nüfus ivmesi", definition: "Doğurganlık hemen yenileme düzeyine inse, ölümlülük sabit kalsa ve göç olmasa nüfusun ulaşacağı durağan büyüklüğün bugünkü nüfusa oranı." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Üniversitede demografi, sosyoloji, iktisat, halk sağlığı ve istatistik bölümlerinde ayrı bir ders olarak (<strong>Demografiye Giriş</strong>, <strong>Demografik Yöntemler</strong>) okutulur; aktüerya bölümlerinde yaşam tablosu <strong>Hayat Sigortası Matematiği</strong>'nin temelidir, biyoistatistikte aynı fikir <strong>hayatta kalma analizine</strong> (Kaplan–Meier, risk fonksiyonu) dönüşür. Bu sayfanın yaptığı her şey orada kesin tanımlarla yeniden kurulur: hızların paydası olan <em>kişi-yıl</em>, Lexis diyagramında dönem ile kuşağın ayrılması, yaş yapısının etkisini ayıklayan standartlaştırma, kayıtların eksik olduğu ülkelerde dolaylı tahmin yöntemleri ve tempo etkisinin düzeltilmesi.",
      "Matematik tarafında kuşak-bileşen yöntemi bir <strong>doğrusal cebir</strong> problemidir: Leslie matrisinin baskın özdeğeri uzun dönem büyüme hızını, özvektörü kararlı yaş yapısını verir; Lotka'nın kararlı nüfus kuramı bunun sürekli zamanlı biçimidir ve nüfus ivmesi bu kuramdan türetilir. Gerçek projeksiyonlar bir adım daha atar: BM'nin WPP 2024 projeksiyonları doğurganlık ve yaşam beklentisi için olasılıklı modellerden gelir, sonuç tek bir eğri değil bir belirsizlik aralığıdır. Hangi doğurganlık ya da göç düzeyinin \"iyi\" olduğu ise demografinin değil, değerlere dayanan kamusal tartışmanın sorusudur.",
    ],
    topics: ["Yaşam tablosu ve hayatta kalma analizi", "Kişi-yıl ve Lexis diyagramı", "Doğrudan ve dolaylı standartlaştırma", "Leslie matrisi ve özdeğerler", "Kararlı nüfus kuramı", "Tempo etkisi ve kuşak doğurganlığı", "Olasılıklı nüfus projeksiyonu"],
  },
  quiz: [
    {
      question: "Ölümlülük hiç olmasaydı ve doğumda cinsiyet oranı 120 erkek / 100 kız olsaydı, yenileme düzeyi TDH'si kaç olurdu?",
      options: ["2,00", "2,05", "2,20", "2,40"],
      answer: 2,
      explanation: "Ölüm yoksa her kız doğurma yaşına ulaşır ve NRR = TDH × kız payı olur. NRR = 1 için TDH = 1 / kız payı = (100 + 120) / 100 = 2,20. Oran 105 iken 2,05'tir; sayfada \"Doğumda cinsiyet oranı\" sürgüsü bu eşiği yükseltir, ölüm düzeni de ayrıca ekler.",
    },
    {
      question: "Aynı yaşa özel doğurganlık hızları, kadınlarının büyük bölümü 50 yaşın üstünde olan bir nüfusa uygulanırsa ne olur?",
      options: ["TDH düşer, KDH aynı kalır", "TDH aynı kalır, KDH düşer", "İkisi de aynı kalır", "İkisi de düşer"],
      answer: 1,
      explanation: "TDH yalnız yaşa özel hızlardan hesaplanır, yaş yapısına bakmaz. KDH ise doğumları toplam nüfusa böler; doğurma çağındaki kadın az olunca doğum da azdır. Sayfada Türkiye 2023 hızları Japonya 2023 nüfusuna uygulanınca KDH 12,24 yerine 8,01 ‰ çıkar.",
    },
    {
      question: "Bir ülkede doğumda yaşam beklentisi 48 yıl, 1 yaşında kalan ömür (e₁) 57 yıl. Bu nasıl mümkün?",
      options: [
        "Hesap hatasıdır; kalan ömür yaşla hep azalır",
        "İlk yılda ölümler o kadar yüksektir ki, ilk yılı atlatan biri ortalamada daha uzun yaşar",
        "Bir yaşındaki çocuklar daha iyi beslenir",
        "e₀ kuşak, e₁ dönem ölçüsüdür",
      ],
      answer: 1,
      explanation: "e₀, doğanların hepsinin ortalamasıdır; ilk yılda ölen bebekler ortalamayı aşağı çeker. Onları geride bırakan bir yaşındaki çocuğun beklenen ölüm yaşı 1 + e₁ = 58 yıldır. Türkiye 1950'nin tablosunda e₀ 47,61, e₁ 57,33 yıldır; q₀ binde 184.",
    },
  ],
  next: [
    { href: "nufus-ekolojisi.html", title: "Nüfus Ekolojisi: Lojistik Büyüme, Kaos, Leslie Matrisi ve Rekabet", why: "Projeksiyon sekmesinin matris biçimi burada: Leslie matrisinin özdeğeri ve kararlı yaş yapısı, ayrıca lojistik büyüme ve türler arası rekabet." },
    { href: "salgin-modelleri-sir.html", title: "Salgın Modelleri (SIR): R₀, Sürü Bağışıklığı, Rastlantı ve Ağlar", why: "4. sekmedeki Zimbabve gibi ölüm hızı geri dönüşlerinin arkasındaki mekanizmaya bir giriş: bir salgının nüfusta yayılması, R₀, sürü bağışıklığı eşiği, rastlantı ve temas ağları." },
    { href: "tarihsel-veri-ve-haritalar.html", title: "Tarihsel Veri ve Haritalar: Minard, Snow, Nüfus Tahminleri ve Kaynak Eleştirisi", why: "Sayımlardan önceki dünya nüfusu tahminleri, belirsizlik aralıkları ve kaynak eleştirisi: Graunt'un cetvellerine sorduğu soruların devamı." },
    { href: "regresyon-ve-korelasyon.html", title: "Regresyon ve Korelasyon: En Küçük Kareler, Artıklar ve Nedensellik", why: "Doğurganlık ile eğitim ya da gelir arasındaki ilişki gibi demografik geçiş tartışmalarındaki iddiaları sınamanın aracı: korelasyon, artıklar ve nedensellik." },
  ],
  sources: [
    { title: "BM Nüfus Bölümü · World Population Prospects", url: "https://population.un.org/wpp/", note: "Sayfanın ülke verilerinin kaynağı (WPP 2024 revizyonu, 1950–2023 tahminleri; sayfa onları Our World in Data'nın 12 Temmuz 2024 sürümü üzerinden kullanır). Her revizyon geçmiş yılları da değiştirir (İngilizce)." },
    { title: "Human Mortality Database", url: "https://www.mortality.org/", note: "Gelişmiş ülkelerin ölümlülük verileri ve yöntem protokolü; sayfanın İsveç (1751–) ve Fransa (1816–) ölüm serileri HMD 2025'ten, OWID aracılığıyla (İngilizce)." },
    { title: "Our World in Data · Nüfus ve demografi gezgini", url: "https://ourworldindata.org/explorers/population-and-demography", note: "WPP 2024 göstergelerini ülke ve yıla göre gösteren gezgin: yaş gruplarına göre nüfus, doğurganlık, yaşam beklentisi, bağımlılık oranları (İngilizce)." },
    { title: "Wikipedia · Demographic transition", url: "https://en.wikipedia.org/wiki/Demographic_transition", note: "Thompson (sayfa 1930 der; American Journal of Sociology'deki “Population” makalesi Mayıs 1929 tarihlidir), Landry, Notestein (1940'lar–1950'ler), Fransa istisnası, Caldwell'in eleştirisi ve ikinci demografik geçiş (Lesthaeghe ve van de Kaa, 1986) (İngilizce)." },
  ],
  revision: "Kasım 2026",
};
