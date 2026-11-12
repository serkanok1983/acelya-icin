window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["salgin-modelleri-sir"] = {
  slug: "salgin-modelleri-sir",
  title: "Salgın Modelleri: Üç Kutu, İki Hız, Bir Eşik",
  field: "Biyoloji",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Üç kutu, iki hız ve tek bir eşik: SIR modeli bir salgının ne zaman büyüdüğünü, neden zirveden sonra da sürdüğünü ve şansın onu nasıl söndürebildiğini hesaplatır.",
  hook:
    "Bir modelde salgın, herkes hastalandığı için değil, bulaştıranlar azaldığı için söner; R₀ = 3 iken nüfusun yaklaşık yüzde altısı hiç enfekte olmadan kalır. Ama aynı modelde tek bir vakanın salgın başlatamama olasılığı R₀ = 2 iken tam yarı yarıyadır. Hangi sayı neyi söyler?",
  bigIdea:
    "Bir salgın modelinde her şey tek bir karşılaştırmaya bağlıdır: bir enfekte kişi, iyileşmeden önce kaç duyarlı kişiye bulaştırır? Bu sayı, <strong>R<sub>t</sub> = R₀ · S/N</strong>, 1'in üstündeyse salgın büyür, altındaysa söner; ama sönmesi hemen durması değildir.",
  story: [
    "Bir salgını sayılarla düşünmenin tarihi, sayıların kendisinden eskidir. Daniel Bernoulli 1760'ta Paris Bilimler Akademisi'ne sunduğu ve 1766'da basılan çalışmasında, çiçek hastalığına karşı o dönemin inokülasyon uygulamasını tartışmak için bir yaşam tablosunu diferansiyel denklemlerle işledi: hastalık bütünüyle ortadan kalksaydı doğumdaki yaşam beklentisinin yaklaşık 26 yıl 7 aydan 29 yıl 9 aya çıkacağını hesapladı. Bir buçuk yüzyıl sonra, sıtma üzerine çalışmalarıyla 1902 Nobel Fizyoloji ya da Tıp Ödülü'nü alan Ronald Ross, bulaşmayı denklemlere dökmeye girişti: 1908'de Mauritius raporunda başlattığı modelleri <em>The Prevention of Malaria</em> kitabında (1910; ikinci baskı 1911) geliştirdi, 1916–1917'de Royal Society'de yayımladığı \"a priori patometri\" makalelerinde genelleştirdi. Bu çalışmaların bir kısmını matematikçi Hilda Hudson'la birlikte yaptı.",
    "Bugünkü SIR modelinin adı iki İskoç'la anılır. Anderson Gray McKendrick bir askerî hekimdi: Hint Tıp Hizmeti'nde çalıştı, 1914–1920 arasında Kasauli'deki Pasteur Enstitüsü'nü yönetti, sonra Edinburgh'daki Kraliyet Hekimler Koleji laboratuvarının başına geçti. William Ogilvy Kermack ise bir kimyacıydı; 2 Haziran 1924 akşamı laboratuvarında patlayan bir deneyin yakıcı alkalisi gözlerine sıçradı ve görme yetisini yitirdi. Laboratuvarda birlikte geliştirdikleri kuram 1927'de <em>Proceedings of the Royal Society A</em>'nın 115. cildinde (s. 700–721) \"A contribution to the mathematical theory of epidemics\" başlığıyla çıktı; aynı başlıklı beş makalelik dizinin ilkiydi. Makale aslında bulaştırıcılığın ve iyileşmenin enfeksiyon yaşıyla değişebildiği genel bir model kurar; bugünkü sabit hızlı SIR onun en basit özel durumudur. Salgının büyümesi için gereken <strong>eşik koşulu</strong> burada ilk kez açıkça görünüyordu.",
    "Deterministik denklemler ortalamayı anlatır, ama küçük sayılarda şans hüküm sürer. 1950'lerde Maurice Bartlett salgın modellerine stokastik süreç yöntemlerini taşıdı; David Kendall 1950'de basit bir doğum-ölüm sürecini olay olay yapay olarak gerçekleştirdi. Daniel Gillespie'nin 1976 ve 1977'de kimyasal tepkime ağları için yayımladığı kesin benzetim yöntemi, bu sayfanın 3. sekmesinde salgın olaylarını tek tek üretir. 2001'de Romualdo Pastor-Satorras ve Alessandro Vespignani, internetteki bilgisayar virüsü verilerinden yola çıkarak, yeniden enfekte olmaya izin veren SIS modelinde ölçeksiz ağların salgın eşiğinin ortadan kalkabildiğini gösterdi; 2002'de Mark Newman ağ üzerindeki SIR modelinin geniş bir sınıfını bağ süzülmesi problemi olarak kesin çözdü. 4. sekmedeki ağ kuramı onun formülleridir.",
  ],
  core: [
    {
      heading: "Üç kutu, iki hız",
      body:
        "Nüfusu üçe böl: <strong>duyarlı</strong> S, <strong>enfekte</strong> (bulaştırıcı) I ve <strong>iyileşmiş ya da bağışık</strong> R. Bir duyarlı ile bir enfektenin karşılaşma sıklığı S·I/N ile orantılıdır; β bu karşılaşmalardan doğan bulaşma hızıdır. Her enfekte γ hızıyla iyileşir, yani ortalama 1/γ gün bulaştırıcı kalır. Varsayımlar ağırdır ve sayfa her sekmede onları yazar: herkes herkesle eşit olasılıkla karışır (<strong>homojen karışım</strong>), β ve γ sabittir, doğum, ölüm ve göç yoktur, iyileşen bir daha hastalanmaz. Bu varsayımlar altında bir enfekte, hepsi duyarlı bir nüfusta, bulaştırıcı kaldığı 1/γ gün boyunca günde β kişiye bulaştırır: toplamda R₀ = β/γ.",
      formula: "dS/dt = −βSI/N,  dI/dt = βSI/N − γI,  dR/dt = γI",
      formulaNote: "Üç denklemin toplamı sıfırdır: S + I + R = N sabit kalır. R₀ = β/γ boyutsuzdur; β ve γ ikisi de gün başına hızdır.",
    },
    {
      heading: "Eşik ve zirve: R_t'nin 1'i kestiği an",
      body:
        "İkinci denklemi γI parantezine al: dI/dt = γI(R₀S/N − 1). Parantezdeki R₀S/N, o anki <strong>etkin üreme sayısı</strong> R<sub>t</sub>'dir. Başta S ≈ N olduğundan, R₀ > 1 ise I üstel büyür, büyüme hızı r = γ(R₀ − 1)'dir; R₀ < 1 ise baştan azalır. Bu, <strong>eşik teoremi</strong>nin özüdür. Salgın büyüdükçe S azalır, R<sub>t</sub> düşer ve tam 1'e indiği anda dI/dt = 0 olur: zirve, duyarlı oran 1/R₀'a düştüğünde gelir. Zirvenin yüksekliği de kapalı biçimde bulunur: dI/dS = −1 + N/(R₀S) integrallenince I + S − (N/R₀)·ln S niceliğinin salgın boyunca korunduğu görülür. Bunu başlangıç ile zirve arasında eşitlersen, I₀ küçükken aşağıdaki formül çıkar.",
      formula: "I<sub>max</sub>/N = 1 − (1 + ln R₀)/R₀",
      formulaNote: "R₀ = 3 için 1 − (1 + 1,0986)/3 ≈ 0,3005: nüfusun yüzde otuzu aynı anda enfektedir. Sayfa 30 050 kişi ölçer; kuram kartı tohumları da hesaba katan biçimle (1 yerine s₀ + i₀, ln R₀ yerine ln R₀s₀) aynı sayıyı verir.",
    },
    {
      heading: "Son büyüklük, eşik ve aşma",
      body:
        "S ile R'nin oranını böl: dS/dR = −R₀S/N. Bunu integrallersen S = S₀·e<sup>−R₀R/N</sup> bulunur. Salgın bittiğinde I = 0, R = N − S∞ olur ve hiç enfekte olmuş oran z için aşağıdaki aşkın denklem kalır; zaman bu denklemde yoktur. R₀ = 3 için z ≈ 0,9405. Modeldeki <strong>sürü bağışıklığı eşiği</strong> 1 − 1/R₀'dır: duyarlı olmayanların oranı (bağışıklar ve o an enfekte olanlar) bunu aşınca R<sub>t</sub> 1'in altına iner. Bu, varsayımları yazılmış bir modelin eşiğidir; salgının durduğu yer değil, zirvenin geldiği yerdir. O anda hâlâ çok sayıda enfekte vardır ve onların zincirleri eşiğin ötesine taşar. Bu fazlalığa <strong>aşma</strong> denir: R₀ = 3'te eşik % 66,7, son büyüklük % 94,0; aradaki 27 puan zirveden sonra gelir. Salgın başlamadan bağışıklanan bir p oranı içinse eşik, aşı etkinliği e ile p<sub>c</sub> = (1 − 1/R₀)/e olur. <strong>Hep ya da hiç</strong> modelinde aşılıların e kesri tam korunur; <strong>sızdıran</strong> modelde her aşılı 1 − e oranında duyarlı kalır. Başlangıçtaki R<sub>etkin</sub> ikisinde de R₀(1 − pe)'dir, son büyüklük ise farklıdır.",
      formula: "z = 1 − e<sup>−R₀z</sup>",
      formulaNote: "I₀ → 0 sınırı. Kökü Lambert W fonksiyonuyla da yazılabilir; sayfa ikiye bölme yöntemiyle çözer. R₀ ≤ 1 iken tek çözüm z = 0'dır.",
    },
    {
      heading: "Şans: neden her tohum salgın başlatmaz?",
      body:
        "Salgının başında enfekteler azdır ve duyarlılar tükenmemiştir; her vaka bağımsız bir <strong>dallanma süreci</strong> başlatır. Tek bir enfekteyi izle: önündeki olay ya bir bulaşmadır (hızı β) ya da iyileşme (hızı γ). Bulaşma olasılığı β/(β+γ) = R₀/(R₀+1)'dir; bulaşırsa ortada iki bağımsız zincir olur. Zincirin sönme olasılığı q, öyleyse q = 1/(R₀+1) + R₀/(R₀+1)·q² denklemini sağlar. Kökleri q = 1 ve q = 1/R₀'dır; R₀ > 1 iken anlamlı olan küçüğüdür. I₀ tohumun hepsinin sönmesi için (1/R₀)<sup>I₀</sup> gerekir. Sonuç olarak son büyüklük dağılımı <strong>iki tepeli</strong>dir: koşuların bir kısmı birkaç kişide kalır, geri kalanı deterministik son büyüklüğün çevresinde, 1/√N ile daralan bir genişlikle toplanır.",
      formula: "P(sönme) = (1/R₀)<sup>I₀</sup>,  R₀ > 1",
      formulaNote: "Üstel bulaştırıcılık süresinde her vakanın yavru sayısı geometrik dağılımlıdır. R₀ < 1 iken zincirler hep söner ve ortalama toplam büyüklük I₀/(1 − R₀)'dır.",
    },
    {
      heading: "Zamanlama, bağışıklık kaybı ve temas ağı",
      body:
        "<strong>SEIR</strong>: enfekte olan önce ortalama 1/σ gün bulaştırmayan bir E kutusunda bekler. Her vaka yine ortalama β/γ kişiye bulaştırır, yalnız daha geç; bu yüzden büyüme hızı aşağıdaki formüle iner, zirve gecikir ve alçalır, ama son büyüklük denklemi değişmez. <strong>SIRS</strong>: bağışıklık ortalama 1/ω gün sürünce enfeksiyon kalıcı (endemik) olur ve sistem sönümlü dalgalarla S* = N/R₀ dengesine oturur; S*, ω'dan bağımsızdır, I* = N(1 − 1/R₀)·ω/(ω+γ) ise ona bağlıdır. <strong>Temas ağı</strong>: homojen karışım yerine sabit komşular olursa iki düzeltme gelir. Bir kişi bir komşusuna en çok bir kez bulaştırır (olasılık T = τ/(τ+γ)) ve bir kenardan enfekte olan kişi ortalamadan çok temaslıdır: yeni vakanın kullanabileceği komşu sayısı ⟨k⟩ değil ⟨k²⟩/⟨k⟩ − 1'dir. Aynı ortalama temasta derece dağılımı genişledikçe ağda R₀ büyür.",
      formula: "r<sub>SEIR</sub> = [−(σ+γ) + √((σ−γ)² + 4σβ)]/2,  R₀<sub>ağ</sub> = T(⟨k²⟩ − ⟨k⟩)/⟨k⟩",
      formulaNote: "β = 0,3, γ = 0,1, σ = 0,2 için r = 0,1000 /gün, SIR'de 0,2000 /gün. Ağ formülü Newman'ın (2002) bağ süzülmesi çözümünden gelir.",
    },
  ],
  lab: {
    intro:
      "Laboratuvar dört sekmelidir ve her sekmenin başındaki kesikli kutu varsayımlarını yazar. <strong>01 · SIR ve R₀</strong> denklemleri RK4 ile h = 0,05 gün adımla çözer; imleç ilerledikçe zirve kartları zirve geçince, son büyüklük kartı imleç sona varınca dolar (<strong>Sona atla</strong> düğmesi beklemeyi kısaltır). <strong>02 · Sürü bağışıklığı ve aşılama</strong> N = 100 000, I₀ = 10, γ = 0,10 /gün ile çalışır ve eşiği p'yi tarayarak ölçer. <strong>03 · Stokastik SIR</strong> Gillespie koşularını tohumlu bir üreteçle yürütür: aynı tohum aynı sonucu verir. <strong>04 · Genişletmeler</strong> menüsünden SEIR, SIRS ya da temas ağı seçilir. Her kartta ölçülen değer kuramın yanında durur. Değerler öğretim değeridir; hiçbir gerçek hastalığı anlatmaz.",
    experiments: [
      {
        title: "Eşiğin iki yanı",
        predict: "R₀ = 0,8 ile R₀ = 1,5 arasındaki fark küçük mü görünür, büyük mü? R₀ = 6'da zirve R₀ = 3'tekinin iki katı mı olur?",
        do: "01 · SIR ve R₀ sekmesinde sırayla <strong>R₀ = 0,8</strong>, <strong>R₀ = 1 (eşik)</strong>, <strong>R₀ = 1,5</strong>, <strong>R₀ = 3</strong> ve <strong>R₀ = 6</strong> düğmelerine bas (hepsi γ = 0,1 yapar), her birinde <strong>Sona atla</strong> ile son büyüklüğü oku.",
        observe: "0,8: zirve yok, son büyüklük 0,050 %, r −0,0200 /gün. 1: \"5000 günde bitmedi\", durum satırı kritik yavaşlama der. 1,5: zirve 6309 kişi, 160,52 günde, son 58,292 %. 3: 30 050 kişi 49,90 günde, son 94,049 %. 6: 53 472 kişi (53,47 %) 22,01 günde, son 99,748 %.",
        explain: "dI/dt = γI(R<sub>t</sub> − 1): eşiğin altında I baştan azalır, son büyüklük I₀ ile orantılı ve küçüktür; üstünde bir anda nüfusun yarısını aşar. Zirve iki katına çıkmaz, çünkü I<sub>max</sub>/N = 1 − (1 + ln R₀)/R₀ doygunluğa gider. Zirvesi olan her koşuda R<sub>t</sub> grafiğindeki kesikli zirve çizgisi R<sub>t</sub> = 1 noktasına oturur; durum satırı ikisinin farkını 10⁻⁵ gün düzeyinde, adım hatası olarak yazar.",
      },
      {
        title: "Eşik nerede, salgın nerede durur?",
        predict: "R₀ = 3 iken eşik 1 − 1/R₀ ≈ % 66,7. Hiç bağışık yoksa enfekte olanların toplamı eşikte mi kalır? Başta % 60 bağışık olursa ne olur, % 70 olursa?",
        do: "02 · Sürü bağışıklığı ve aşılama sekmesinde <strong>Hiç bağışık yok</strong>, sonra <strong>p = 0,60 (eşik altı)</strong> ve <strong>p = 0,70 (eşik üstü)</strong> düğmelerine bas; <strong>Zirveye kadar enfekte olan</strong> ve <strong>Zirveden sonra enfekte olan (aşma)</strong> kartlarını karşılaştır.",
        observe: "Bağışık yok: salgın 94,049 %, zirvede etkin duyarlı oran 33,333 %, zirveye dek 66,66 %, zirveden sonra 27,38 %, yani 1. sekmenin aşmasıyla aynı. p = 0,60: R<sub>etkin</sub>(0) 1,200, salgın 12,597 %, aşma 5,92 %. p = 0,70: R<sub>etkin</sub>(0) 0,900, zirve yok, salgın 0,099 %. Ölçülen p<sub>c</sub> 66,663 % (kuram 66,667 %).",
        explain: "Zirvede etkin duyarlı oran tam 1/R₀'dır: kart ölçülen ve kuram değeri olarak ikisinde de 33,333 % yazar. Ama o anda (bağışık yokken) 30 050 kişi hâlâ enfektedir ve zincirleri sürer. Eşiğin altında kalan bir bağışıklık bile salgını büyük ölçüde küçültür; eşiğin üstünde zincirler tohumlardan öteye gidemez.",
      },
      {
        title: "Aynı eşik, farklı aşı modeli",
        predict: "Aşı etkinliği e = 0,80, p = 0,80 iken R<sub>etkin</sub>(0) iki modelde de 3 × (1 − 0,64) = 1,08. Son büyüklükler de aynı mı olur?",
        do: "02 sekmesinde <strong>Sızdıran, e = 0,80</strong> düğmesine bas, salgın büyüklüğünü oku; sonra yalnız <strong>Aşı modeli</strong> menüsünü <strong>Hep ya da hiç</strong> yap. Son olarak, model Hep ya da hiç iken e kaydırıcısını 0,30'a, p'yi 0,99'a getir; sonra menüyü yeniden Sızdıran yap.",
        observe: "Sızdıran: p<sub>c</sub> 83,329 % (kuram 83,333 %), salgın 8,353 %, zirve öncesi 4,19 %, sonrası 4,15 %. Hep ya da hiç: aynı R<sub>etkin</sub>(0) = 1,080, ama salgın 5,320 %. e = 0,30, p = 0,99: eşik \"ulaşılamaz\" (kuram 2,222), R<sub>etkin</sub>(0) 2,109, salgın hep ya da hiçte 57,945 %, sızdıranda 82,357 %.",
        explain: "Başlangıç hızı yalnız ortalama duyarlılığa bağlıdır; salgının sonu ise duyarlılığın nasıl dağıldığına. Sızdıran modelde aşılılar yavaş ama sürekli tükenir, korunanlar \"tam korunanlar\" gibi salgın dışında kalmaz. Etkinlik 1 − 1/R₀'dan küçükse herkes aşılansa bile R<sub>etkin</sub> > 1 kalır.",
      },
      {
        title: "Şans, zamanlama ve ağ yapısı",
        predict: "R₀ = 2 iken tek bir tohumun salgın başlatamama olasılığı nedir? Üç tohumla? Ortalama temas sayısı aynı kalırken ağ yapısı ağda R₀'ı değiştirir mi?",
        do: "03 · Stokastik SIR'de varsayılanla bekle, sonra <strong>Üç tohum: I₀ = 3</strong>; <strong>Varsayılana dön</strong> ve <strong>Küçük köy: N = 50</strong>. 04 · Genişletmeler'de SEIR için σ'yı 0,05 yap; sonra <strong>Temas ağı üzerinde SIR</strong> seçip <strong>Derece dağılımı</strong>nı Düzenli, Poisson ve Geometrik arasında değiştir.",
        observe: "Erken sönme 49,2 % ± 2,2 (dallanma 50,00 %); üç tohumla 10,0 % ± 1,3 (dallanma 12,50 %, kesin 12,77 %); N = 50'de kesin 55,37 %. SEIR σ = 0,05: zirve 281,2 günde, 9,82 %, son büyüklük yine 94,0480 %. Ağda R₀ kuramı: düzenli 0,999, Poisson 1,304, geometrik 2,556 (denenen 2,512 ± 0,140).",
        explain: "İlk vaka bulaştırmadan iyileşebilir; küçük nüfusta duyarlılar erken azaldığı için sönme biraz daha olasıdır. Gizli dönem yalnız zamanı uzatır. Ağda ⟨k⟩ ≈ 4 sabitken ⟨k²⟩ büyüdükçe çok temaslı birkaç düğüm salgını taşır; ortalama alan modeli üçüne de R₀ ≈ 2 verirdi. Denenen R₀ kuramın biraz altında kalabilir (Poisson varsayılanında 1,179 ± 0,055, −9,6 %): sonlu ağda ilk vakanın çok temaslı komşularına çoğu zaman başka yoldan önce ulaşılır, birinci kuşakta az temsil edilirler.",
      },
    ],
  },
  wow: [
    {
      title: "Kör bir kimyacının denklemi",
      body:
        "William Ogilvy Kermack, 2 Haziran 1924'te laboratuvarında patlayan bir deneyde görme yetisini yitirdi. Üç yıl sonra McKendrick'le birlikte, bugün her salgın modeli dersinin başladığı makaleyi yayımladı (Proc. R. Soc. A 115, 700–721, 1927).",
    },
    {
      title: "Eşiği olmayan ağlar",
      body:
        "Homojen karışımda ya da dar derece dağılımlı bir ağda, bulaşma belirli bir eşiğin altındaysa salgın büyümez. Pastor-Satorras ve Vespignani 2001'de, internetteki bilgisayar virüsü verilerinden yola çıkarak, SIS modelinde ölçeksiz ağların bu eşiği kaybedebildiğini gösterdi. SIR için aynı sonuç Newman'ın formülünden okunur: ⟨k²⟩ ağ büyüdükçe sınırsız artarsa, ağdaki R₀ = T(⟨k²⟩ − ⟨k⟩)/⟨k⟩ sıfırdan büyük her T için sonunda 1'i aşar.",
    },
    {
      title: "\"Sürü bağışıklığı\" bir veteriner terimiydi",
      body:
        "Terimi ilk kez 1894'te ABD'li veteriner bilim insanı Daniel Elmer Salmon kullandı. Eşiği hesaplayan kuram ise 1970'lerde gelişti. Bu kuramda eşik, toplam enfekte oranının sınırı değildir: salgın boyunca enfekte olanların toplamı eşiği aşabilir, aşma dediğimiz şey tam budur.",
    },
  ],
  worked: {
    title: "R₀ = 2 olan bir model salgın",
    prompt:
      "SIR modelinde β = 0,20 /gün, γ = 0,10 /gün, N = 100 000 kişi, I₀ = 10 kişi olsun. R₀'ı, erken büyüme hızını ve ikiye katlanma süresini, zirvede aynı anda enfekte olanların sayısını, son büyüklüğü, eşiği ve aşmayı bul. Sonra tek bir tohumun salgın başlatamama olasılığını hesapla.",
    steps: [
      "R₀ = β/γ = 0,20/0,10 = 2; ortalama bulaştırıcılık süresi 1/γ = 10 gün. Erken evrede S ≈ N, dolayısıyla r = γ(R₀ − 1) = 0,10 /gün ve ikiye katlanma süresi ln 2 / r ≈ 6,93 gün.",
      "Zirve, duyarlı oran 1/R₀ = 0,5'e indiğinde gelir. I<sub>max</sub>/N = 1 − (1 + ln 2)/2 = 1 − 1,6931/2 ≈ 0,1534, yani yaklaşık 15 340 kişi aynı anda enfektedir.",
      "Son büyüklük z = 1 − e<sup>−2z</sup> denklemini sağlar. f(z) = z − 1 + e<sup>−2z</sup> için Newton yöntemini z = 0,8'den başlat: f(0,8) ≈ 0,0019, f′(0,8) = 1 − 2e<sup>−1,6</sup> ≈ 0,596, yeni değer 0,8 − 0,0032 ≈ 0,7968. Nüfusun yaklaşık % 79,7'si enfekte olur, % 20,3'ü hiç olmaz.",
      "Eşik 1 − 1/R₀ = % 50. Aşma z − 0,5 ≈ 0,297: zirveden sonra nüfusun yaklaşık % 30'u daha enfekte olur. Tek bir tohum için dallanma kuramı P(sönme) = 1/R₀ = 0,5 verir.",
      "Sayfada dene: 01 sekmesinde β'yı 0,20 yap ve Sona atla. Kartlar zirve 15 348 kişi (15,35 %) 90,72 günde, son büyüklük 79,685 % (I₀ → 0 sınırı 79,681 %), r +0,1000 /gün ve ikiye katlanma 6,93 gün gösterir; durum satırı aşmayı 29,68 % olarak yazar. 03 sekmesinin varsayılanı (R₀ = 2, I₀ = 1) sönmeyi 49,2 % ± 2,2 ölçer.",
    ],
    result:
      "R₀ = 2 iken nüfusun % 15,3'ü aynı anda, toplamda % 79,7'si enfekte olur; eşik % 50 olduğu hâlde salgın onu yaklaşık 30 puan aşar. Tek bir tohum ise yarı yarıya hiç salgın başlatamaz.",
  },
  misconceptions: [
    {
      myth: "Salgın, sürü bağışıklığı eşiğine ulaşınca durur.",
      truth:
        "Eşik zirvenin geldiği yerdir, salgının bittiği yer değil. Zirvede R<sub>t</sub> = 1 olur ama o anda çok sayıda enfekte vardır ve zincirleri sürer. 02 sekmesinde hiç bağışık yokken zirveye dek 66,65 %, zirveden sonra 27,39 % enfekte olur.",
    },
    {
      myth: "R₀ = 2 ise her vaka mutlaka iki kişiye bulaştırır.",
      truth:
        "R₀ bir ortalamadır. Üstel bulaştırıcılık süresinde bir vakanın bulaştırdığı sayı geometrik dağılımlıdır; en olası değer sıfırdır. Bu yüzden R₀ = 2 iken tek tohumun yarı yarıya hiç salgın başlatamadığını 03 sekmesi ölçer.",
    },
    {
      myth: "Salgın, duyarlı kimse kalmayınca biter.",
      truth:
        "Model salgını, bulaştıranlar azaldığı için söndürür: R₀ = 3 iken nüfusun yüzde 5,95'i hiç enfekte olmaz. Son büyüklük denklemi z = 1 − e<sup>−R₀z</sup> her R₀ için z < 1 verir.",
    },
    {
      myth: "Gizli dönem uzadıkça salgın büyür.",
      truth:
        "Bu modelde gizli dönemde kimse ölmez ya da çıkmaz; her vaka yine ortalama β/γ kişiye bulaştırır. Gizli dönem büyümeyi yavaşlatır, zirveyi geciktirip alçaltır; son büyüklük değişmez (04 sekmesinde SIR ve SEIR ikisi de 94,0480 %).",
    },
  ],
  glossary: [
    { term: "SIR modeli", definition: "Nüfusu duyarlı (S), enfekte (I) ve iyileşmiş ya da bağışık (R) bölmelerine ayıran, aralarındaki geçişleri hızlarla yazan model." },
    { term: "Temel üreme sayısı R₀", definition: "Tamamen duyarlı bir nüfusta bir enfektenin bulaştırıcı kaldığı süre boyunca ortalama bulaştırdığı kişi sayısı; SIR'de β/γ." },
    { term: "Etkin üreme sayısı R_t", definition: "Bir enfektenin o anki duyarlı oranla bulaştırdığı ortalama kişi sayısı, R₀·S/N; 1'i kestiği anda I zirve yapar." },
    { term: "Son büyüklük", definition: "Salgın bitene dek en az bir kez enfekte olmuş nüfus oranı; I₀ → 0 iken z = 1 − e^(−R₀z) denkleminin kökü." },
    { term: "Sürü bağışıklığı eşiği", definition: "Modelde duyarlı olmayanların oranının R_t'yi 1'e indirdiği değer, 1 − 1/R₀; salgın öncesi, etkinliği e olan bağışıklama için (1 − 1/R₀)/e." },
    { term: "Aşma", definition: "Salgın boyunca enfekte olanların toplamının sürü bağışıklığı eşiğini geçen kısmı; zirveden sonraki enfeksiyonlardan gelir." },
    { term: "Dallanma süreci", definition: "Her bireyin bağımsız ve aynı dağılımlı sayıda yavru bıraktığı rastlantı modeli; salgının başlangıcını, duyarlılar tükenmeden önce anlatır." },
    { term: "Bağ süzülmesi", definition: "Bir ağın her kenarının T olasılıkla açık sayıldığı model; ağdaki SIR salgınının son büyüklüğü, açık kenarlarla oluşan dev bileşenin boyutudur." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "SIR, <strong>Diferansiyel Denklemler</strong> dersinin en sevilen doğrusal olmayan sistemlerinden biridir: korunan nicelik, faz düzlemi, denge noktalarının Jacobian ile kararlılık analizi (SIRS'teki sönümlü sarmal, karmaşık özdeğerlerin işaretidir) ve sayısal çözüm (RK4) aynı örnekte buluşur. <strong>Matematiksel Biyoloji</strong> ve <strong>Popülasyon Biyolojisi</strong> derslerinde aynı yapı av–avcı ve rekabet modelleriyle yan yana okunur; R₀'ın genel tanımı, birden çok enfekte bölmesi olan modellerde bir \"yeni nesil matrisi\"nin en büyük özdeğeridir.",
      "Stokastik taraf <strong>Olasılık</strong> ve <strong>Stokastik Süreçler</strong> derslerine bağlanır: sürekli zamanlı Markov zincirleri, Gillespie algoritması, dallanma süreçleri ve üreteç fonksiyonları (sönme olasılığı, üreteç fonksiyonunun sabit noktasıdır). Ağ tarafı <strong>Çizge Teorisi</strong> ve <strong>Karmaşık Ağlar</strong> konularına uzanır: yapılandırma modeli, derece dağılımları, süzülme eşiği ve dev bileşen. Bu sayfanın kuram tarafı, varsayımları açıkça yazılmış bir model olarak her yerde aynı soruyu sorar: hangi sonuç modelin kendisinden, hangisi seçilen parametrelerden geliyor?",
    ],
    topics: ["Doğrusal olmayan diferansiyel denklemler", "Faz düzlemi ve kararlılık", "Lambert W fonksiyonu", "Markov zincirleri", "Dallanma süreçleri", "Gillespie algoritması", "Süzülme kuramı", "Karmaşık ağlar"],
  },
  quiz: [
    {
      question: "Bir SIR modelinde γ'yı değiştirmeden β'yı iki katına çıkarırsan, erken evredeki büyüme hızı r nasıl değişir? (Başta R₀ = 1,5.)",
      options: ["İki katına çıkar", "Dört katına çıkar", "Değişmez", "Yarıya iner"],
      answer: 1,
      explanation: "r = γ(R₀ − 1). R₀ 1,5'ten 3'e çıkar; r, 0,5γ'dan 2γ'ya, yani dört katına çıkar. Sayfada R₀ = 1,5 düğmesi r ≈ +0,0500 /gün, R₀ = 3 düğmesi r ≈ +0,1999 /gün gösterir.",
    },
    {
      question: "R₀ = 4 olan bir SIR modelinde bağışık kimse yokken, I hangi duyarlı oranda zirve yapar?",
      options: ["% 75", "% 50", "% 25", "% 0; zirve herkes enfekte olunca gelir"],
      answer: 2,
      explanation: "Zirve R_t = R₀·S/N = 1 olduğunda gelir: S/N = 1/R₀ = % 25. O ana dek nüfusun % 75'i enfekte olmuştur, ama salgın aşmayla sürer ve son büyüklük z = 1 − e^(−4z) ≈ % 98'e çıkar.",
    },
    {
      question: "Stokastik bir SIR modelinde R₀ = 2 iken başta 3 enfekte vardır. Büyük N için hiç büyük salgın olmama olasılığı yaklaşık kaçtır?",
      options: ["% 50", "% 25", "% 12,5", "% 0"],
      answer: 2,
      explanation: "Her tohum bağımsız bir zincir başlatır ve her biri 1/R₀ = 1/2 olasılıkla söner; üçünün de sönmesi (1/2)³ = 1/8 = % 12,5. N = 1000 için sayfanın kesin hesabı 12,77 % verir: sonlu nüfusta duyarlılar erken azaldığı için sönme biraz daha olasıdır.",
    },
  ],
  next: [
    { href: "av-avci-lotka-volterra.html", title: "Av–Avcı Modeli: Lotka–Volterra Döngüleri ve Ötesi", why: "SIR'in yakın akrabası: iki türün etkileşim terimiyle yazılan doğrusal olmayan bir sistem, döngüleri ve korunan niceliğiyle." },
    { href: "diferansiyel-denklemler.html", title: "Diferansiyel Denklemler ve Dinamik Sistemler: Yön Alanından Rezonansa", why: "Faz portresi, doğrusal olmayan sistemlerde Jacobian ile kararlılık ve sayısal çözüm: SIRS'in sönümlü sarmalını ve RK4 adımını oradaki araçlarla oku." },
    { href: "cizge-teorisi.html", title: "Çizge Teorisi: Yapı, Değişmezler ve Teoremler", why: "Temas ağının dili: dereceler, ağaçlar ve bağlantılılık. Ağda R₀ formülündeki ⟨k²⟩ derece dizisinden gelir." },
    { href: "rastgele-yuruyus.html", title: "Rastgele Yürüyüş: √N Yasası, Difüzyon ve Geri Dönüş", why: "Erken evrede enfekte sayısı her olayda ±1 adım atan bir yürüyüştür (yukarı olasılığı R₀/(R₀+1)); sönme olasılığı bu yanlı yürüyüşün sıfıra varma olasılığıdır. O sayfa yansız yürüyüşü, √N yasasını ve geri dönüşü ölçer." },
  ],
  sources: [
    { title: "Wikipedia · Compartmental models in epidemiology", url: "https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology", note: "SIR, SEIR ve SIRS modelleri, Kermack ve McKendrick'in 1927 modeli, son büyüklük bağıntısı ve aşılama eşiği 1 − 1/R₀ (İngilizce)." },
    { title: "Wikipedia · Gillespie algorithm", url: "https://en.wikipedia.org/wiki/Gillespie_algorithm", note: "Kesin stokastik benzetim yöntemi ve tarihçesi: Bartlett, Kendall ve Gillespie'nin 1976 ve 1977 makaleleri (İngilizce)." },
    { title: "M. E. J. Newman · The spread of epidemic disease on networks (arXiv)", url: "https://arxiv.org/abs/cond-mat/0205009", note: "Phys. Rev. E 66, 016128 (2002): ağ üzerinde SIR modelinin bağ süzülmesi olarak kesin çözümü; 4. sekmedeki ağ kuramı." },
    { title: "R. Pastor-Satorras, A. Vespignani · Epidemic spreading in scale-free networks (arXiv)", url: "https://arxiv.org/abs/cond-mat/0010317", note: "Phys. Rev. Lett. 86, 3200 (2001): ölçeksiz ağlarda salgın eşiğinin ortadan kalkması." },
  ],
  revision: "Kasım 2026",
};
