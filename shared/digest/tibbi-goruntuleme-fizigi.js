window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["tibbi-goruntuleme-fizigi"] = {
  slug: "tibbi-goruntuleme-fizigi",
  title: "Tıbbi Görüntüleme Fiziği: Bedenin İçini Görmenin Beş Yolu",
  field: "İnsan Bedeni",
  level: "Lise–Lisans",
  minutes: 50,
  tagline:
    "Röntgen, BT, ultrason, MR ve PET'in fiziği: zayıflama yasası, geri izdüşüm, yankı zamanı, Larmor frekansı ve 511 keV'lik foton çiftleri. Her bölümde ölçülen ile kuram yan yana; tanı ya da tetkik önerisi yok.",
  hook:
    "Kalın bir yağ katmanının altındaki sınırı ultrason cihazı 4,00 cm yerine 4,31 cm derinde gösterir. Cihaz bozuk değildir: ses yağda 1430 m/s ile gider, cihaz ise her yerde 1540 m/s varsayar. Bedenin içini gösteren her görüntü böyle bir fiziksel varsayımın üstüne kuruludur ve o varsayımı bilen, görüntünün nerede yanılabileceğini de bilir.",
  bigIdea:
    "Her görüntüleme yöntemi bedenden geçen ya da bedenden çıkan bir dalganın tek bir ölçülebilir özelliğini (X-ışınının zayıflaması, yankının gecikmesi, spinlerin frekansı, iki fotonun doğrultusu) konuma çevirir; görüntünün kontrastı da hataları da o özelliğin fiziğinden gelir.",
  story: [
    "8 Kasım 1895'in akşamüstü Würzburg Üniversitesi Fizik Enstitüsü'nde Wilhelm Röntgen, kartonla sardığı bir Crookes–Hittorf tüpünü çalıştırdı ve masadaki baryum platinosiyanür boyalı küçük bir ekranın parladığını gördü. Tüpten kartonu aşan, gözle görülmeyen bir ışın çıkıyordu. \"Ueber eine neue Art von Strahlen\" (Yeni bir ışın türü üzerine) başlıklı makalesi 28 Aralık 1895'te yayımlandı; 1901'de verilen ilk Nobel Fizik Ödülü onundu.",
    "Röntgen filmi bir gölgedir: ışın yolundaki her şey üst üste toplanır. Gölgeleri ayırmak için bedeni birçok açıdan çekip kesiti hesapla geri kurmak gerekiyordu. Bunu ilk klinik cihaza dönüştüren, EMI şirketinde çalışan mühendis Godfrey Hounsfield oldu: ilk hasta taraması 1 Ekim 1971'de Londra'daki Atkinson Morley Hastanesi'nde yapıldı. Hounsfield, problemin matematiğini bağımsız olarak çözmüş olan Allan Cormack ile 1979 Nobel Fizyoloji veya Tıp Ödülü'nü paylaştı.",
    "Ses de içeri bakabilirdi. Glasgow'da kadın doğum profesörü Ian Donald, 1955 yazında bir kazan fabrikasında metal kusurlarını bulan endüstriyel ultrason cihazının dokuları ayırt edip edemeyeceğini denedi. Hekim John MacVicar ve mühendis Tom Brown ile birlikte geliştirdikleri tarayıcının ilk sonuçları Haziran 1958'de <em>The Lancet</em>'te \"Investigation of Abdominal Masses by Pulsed Ultrasound\" başlığıyla yayımlandı.",
    "Manyetik rezonans ise önce kimyacıların aracıydı: sinyal geliyordu ama nereden geldiği bilinmiyordu. Paul Lauterbur 1973'te <em>Nature</em>'da yayımlanan kısa makalesinde alana konumla değişen bir gradyan eklemeyi önerdi; böylece her konum kendi frekansında \"konuşur\" ve frekans konuma çevrilebilir. Nottingham Üniversitesi'nden Peter Mansfield hızlı görüntüleme yöntemleri (eko-planar görüntüleme) geliştirdi; ikisi 2003 Nobel Fizyoloji veya Tıp Ödülü'nü paylaştı. Sayfanın 04 · MR sekmesindeki frekans kodlama bölümü tam olarak bu fikrin tek boyutlu bir modelidir.",
  ],
  core: [
    {
      heading: "Zayıflama yasası, kontrast ve ışın sertleşmesi",
      body:
        "Bir foton maddede ya etkileşmeden geçer ya da soğurulur veya saçılır. Her santimetrede etkileşme olasılığı sabitse (<strong>doğrusal zayıflama katsayısı</strong> μ), dI/dx = −μI ve çözüm üsteldir; 60 keV'de yumuşak doku için μ = 0,2048 cm²/g × 1,06 g/cm³ = 0,2171 cm⁻¹. <strong>Yarı değer kalınlığı</strong> (HVL) ışının yarısını durduran kalınlıktır: n HVL sonra (1/2)ⁿ kalır, sıfıra hiçbir sonlu kalınlıkta inilmez. Düşük enerjide baskın etkileşim <strong>fotoelektrik soğurmadır</strong> (kabaca Z³/E³); kemikteki kalsiyum ve fosfor bu yüzden kemiği kat kat güçlü bir zayıflatıcı yapar: μ<sub>kemik</sub>/μ<sub>doku</sub> 40 keV'de 4,48, 60 keV'de 2,78, 100 keV'de 1,98. Tüpten çıkan <strong>frenleme ışıması</strong> ise sürekli bir tayftır; düşük enerjili fotonlar ilk santimetrelerde ayıklanır ve ışın \"sertleşir\": ikinci yarılanma birinciden kalın su ister (80 kV, 2,5 mm Al: HVL₁ 25,1 mm, HVL₂ 27,2 mm).",
      formula: "I = I₀·e<sup>−μx</sup> · HVL = ln 2 / μ · λ<sub>en küçük</sub> = hc/(eU)",
      formulaNote: "Tek enerjili, dar ışın: saçılan fotonlar sayılmaz. 60 keV'de yumuşak doku için HVL = 3,193 cm; 80 kV'de λ<sub>en küçük</sub> = 15,50 pm.",
    },
    {
      heading: "BT: izdüşümden kesite",
      body:
        "Bir izdüşüm, ışın yolundaki μ'lerin toplamıdır: p(θ, s) = ∫μ ds = −ln(I/I₀). BT bunu 0°–180° arasında birçok açıdan kaydeder; açıya ve konuma göre dizilen veriye <strong>sinogram</strong> denir, çünkü her nokta bir sinüs eğrisi çizer. Her izdüşümü geldiği doğrultuya geri yaymak (geri izdüşüm) her noktayı 1/r ile azalan bir haleyle bulanıklaştırır; önce frekans uzayında |ω| ile çarpan <strong>rampa süzgeci</strong> uygulanırsa bu hale iptal olur (süzgeçli geri izdüşüm). Sonuç <strong>Hounsfield birimine</strong> çevrilir: su 0, hava −1000 HU. Gürültü 1/√I₀ ile azalır; daha net görüntü daha çok foton, yani daha çok doz ister.",
      formula: "HU = 1000·(μ − μ<sub>su</sub>)/(μ<sub>su</sub> − μ<sub>hava</sub>)",
      formulaNote: "60 keV'de μ = 0,2171 cm⁻¹ için 54,5 HU (yumuşak doku). Tam örnekleme için açı sayısı kabaca (π/2)·dedektör sayısı: 128 dedektörde 202.",
    },
    {
      heading: "Ultrason: empedans, gecikme ve çözünürlük",
      body:
        "Ses bir sınırda <strong>akustik empedans</strong> Z = ρc değişiyorsa geri yansır; dik gelişte yansıyan şiddet kesri R'dir. Yankıyı hız farkı değil empedans farkı üretir: kas–yağ sınırında R = %1,143, kas–kemik sınırında %28,244, kas–hava sınırında %99,903 (jel bu yüzden sürülür). Derinlik zamandan gelir: d = c·t/2, cihaz c = 1540 m/s varsayar. Frekans arttıkça dalga boyu λ = c/f ve eksenel çözünürlük (≈ nλ/2) küçülür ama zayıflama (≈ α·f·yol, dB) büyür: 60 dB alma aralığıyla görülebilen derinlik 5 MHz'de 12,0 cm, 15 MHz'de 4,0 cm. Hareketli kan yankının frekansını kaydırır (Doppler).",
      formula: "R = ((Z₂ − Z₁)/(Z₂ + Z₁))² · d = c·t/2 · f<sub>D</sub> = 2f₀v·cos θ / c",
      formulaNote: "Darbeli Doppler her darbede bir örnek alır; |f<sub>D</sub>| &gt; PRF/2 olursa kayma ters yönde görünür (örtüşme).",
    },
    {
      heading: "MR ve PET: frekans ve foton çiftleri",
      body:
        "B alanındaki proton mıknatıslanması alanın çevresinde <strong>Larmor frekansıyla</strong> döner: f = (γ/2π)·B, γ/2π = 42,577 MHz/T. 1,5 T'de 63,87 MHz'lik radyo fotonunun enerjisi 2,64·10⁻⁷ eV'dir; iyonlaştırmaya yetmez. 90° darbeden sonra boyuna bileşen T1 ile geri kazanılır, enine bileşen T2 ile söner; TR ve TE seçimi hangisinin görüntüye baskın olacağını belirler. Bir gradyan G eklenince frekans konuma bağlanır ve sinyalin Fourier dönüşümü profili verir. PET'te ise <sup>18</sup>F'nin pozitronu bir elektronla yok olur ve zıt yönlere giden 511 keV'lik iki foton doğar (m<sub>e</sub>c²); iki karşıt dedektörde eş zamanlı sayım bir yanıt çizgisi verir. İkisinin birlikte kaçma olasılığı e<sup>−μL</sup> yalnız çizginin bedendeki toplam uzunluğuna bağlıdır.",
      formula: "S ≈ PD·(1 − e<sup>−TR/T1</sup>)·e<sup>−TE/T2</sup> · FOV = 1/((γ/2π)·G·Δt) · P<sub>çift</sub> = e<sup>−μL</sup>",
      formulaNote: "Spin yankısının tam biçimi 1 − 2e<sup>−(TR − TE/2)/T1</sup> + e<sup>−TR/T1</sup>, TE ≪ TR iken basit formüle iner. 511 keV'de su için μ = 0,0960 cm⁻¹: 30 cm'lik çapta e<sup>−2,88</sup> = %5,6.",
    },
    {
      heading: "Etkin doz ve risk nasıl düşünülür",
      body:
        "<strong>Soğurulan doz</strong> (gray, Gy = J/kg) dokuya bırakılan enerjidir; <strong>etkin doz</strong> (sievert; tıpta mSv) bunu ışın türüne ve organ duyarlılığına göre ağırlıklandırıp tek bir sayıya çevirir. Etkin doz bir kişinin riskini değil, toplulukta ortalama bir büyüklüğü anlatır ve aynı tetkik için kaynaktan kaynağa değişir: sayfanın tablosunda göğüs filmi 0,02–0,1 mSv (GOV.UK tek arka-ön film 0,02; RadiologyInfo 0,1), göğüs BT'si 6,1–8 mSv (RadiologyInfo 6,1; GOV.UK 8) aralığındadır. Karşılaştırma için RadiologyInfo, ABD'de doğal ışınımı yılda yaklaşık 3 mSv olarak verir; dünya ortalaması 2,4 mSv'dir (UNSCEAR 2008). Radyasyondan korunma <strong>doğrusal eşiksiz modeli</strong> (LNT) ihtiyatlı bir varsayım olarak kullanır; modelin çok düşük dozlarda geçerliliği bilim insanları arasında tartışmalıdır. Pratikte iki ilke çıkar: doz bir sayıdır ve dozlar toplanır. MR ve ultrason X-ışını kullanmaz. Bir tetkikin gerekip gerekmediği bu sayıların değil, hasta ile hekimin kararıdır.",
      formula: "doğal ışınım eşdeğeri = doz / (yıllık doğal doz) × 365 gün",
      formulaNote: "2,4 mSv/yıl ölçütüyle 6,1–8 mSv yaklaşık 2,5–3,3 yıla denk gelir. Bu bir karşılaştırma ölçüsüdür, güvenlik eşiği değildir.",
    },
  ],
  lab: {
    intro:
      "Sayfa yedi sekmedir: 01 · X-ışını, 02 · Tomografi (BT), 03 · Ultrason, 04 · MR, 05 · Nükleer tıp, PET, 06 · Doz ve risk, 07 · Alıştırma ve hatalar. Her bölümde kaydırıcılar, menüler, hazır düğmeler ve \"Bölümü sıfırla\" var; okuma kartları sayfanın ölçtüğü değeri (fotonları tek tek sayarak, sinyali Fourier ile çözümleyerek, Bloch denklemlerini tümleyerek) kapalı formülün verdiği kuramla yan yana gösterir. Bütün hasta görüntüleri bilgisayarla üretilmiş fantomlardır, yani yapay veridir. Sayfa tanı koymaz, bir tetkikin yapılıp yapılmaması hakkında görüş bildirmez. Sağlıkla ilgili kararlar için bir sağlık profesyoneline başvurun; acil durumda 112. 05 · Nükleer tıp, PET sekmesinde sıcak bölgeyi tam merkeze (0; 0) koymayı dene: zayıflama açıkken 20 000 olaydan yalnız 1933 çift kaydedilir ve tahmin 13,5 cm öteye kaçar; durum satırı nedenini söyler: sıcak bölgeden yalnız yaklaşık 122 çift gelir ve zayıflama düzeltilmediği için bedenin ortası kenarlardan sönük kalır. Olay sayısını 100 000 yapınca (9710 çift) yer (−0,3; 0,3) cm'de bulunur.",
    experiments: [
      {
        title: "Kemik neden beyaz, enerji artınca ne olur?",
        predict:
          "01 · X-ışını sekmesinin \"3. Göğüs filmi\" bölümünde foton enerjisini 40 keV'den 100 keV'ye çıkaracaksın. Omurga hattındaki kemik kontrastı artar mı, azalır mı? Akciğer hattı daha mı belirgin olur?",
        do:
          "\"Foton enerjisi (tek enerjili)\" menüsünü sırayla 40, 60 ve 100 keV yap; her seferinde \"Kemik kontrastı (omurga hattı)\" ve \"Akciğer hattı\" okumalarını ve durum satırındaki μ oranını not et. Sonra \"Piksel başına gelen foton I₀\"ı 2000'den 200'e indir ve \"Piksel CNR\" satırına bak.",
        observe:
          "Kemik kontrastı %99,1 → %84,4 → %57,2; akciğer hattı 25,17 → 11,68 → 7,63 kat foton. Durum satırı kemiğin μ'sünü dokununkinin 4,48, 2,78 ve 1,98 katı olarak verir (60 keV'de μ doku · kemik · akciğer = 0,217 · 0,604 · 0,0532 cm⁻¹). 60 keV'de I₀ 2000'den 200'e inince düğümün kuramsal CNR'si 4,38'den 1,39'a düşer.",
        explain:
          "Kemik kontrastı 1 − e<sup>−(μ<sub>kemik</sub> − μ<sub>doku</sub>)·L</sup>'dir (L = 4,8 cm kemik yolu). Fotoelektrik soğurma yaklaşık Z³/E³ ile azaldığı için enerji arttıkça μ'ler birbirine yaklaşır ve kontrast erir. Düğümü görmek ise yalnız kontrasta değil foton sayısına da bağlıdır: Poisson gürültüsünde σ = √(beklenen) olduğundan CNR √I₀ ile büyür; I₀'ı 10 kat azaltmak CNR'yi √10 = 3,16 kat düşürür (4,38/3,16 = 1,39).",
      },
      {
        title: "Az açı, çok çizgi: BT'yi bozmak",
        predict:
          "02 · Tomografi (BT) sekmesinde yalnız 8 açıdan izdüşüm alırsan geri kurulan kesitte su dolu kist hâlâ 0 HU civarında mı ölçülür? Süzgeci kaldırırsan görüntü nasıl değişir?",
        do:
          "Varsayılan ayarda (90 açı, 128 dedektör, Rampa süzgeci, I₀ = 1 000 000) okumaları not et. Sonra \"8 açı\" hazırına bas. \"Bölümü sıfırla\"dan sonra \"Süzgeçsiz\" hazırını, yeniden sıfırladıktan sonra \"Az foton\" hazırını dene. En sonda Hounsfield kutusuna 0,2171 yaz.",
        observe:
          "Varsayılan: RMSE 42 HU; kist 2 HU (gerçek 0), doku 52 (54), yağ −92 (−89), kemik 1938 (1938); σ 28 HU; tam örnekleme için 202 açı. 8 açıda RMSE 318 HU, kist 52 HU, yağ 276 HU ve ışınsal çizgiler. Süzgeçsizde değerler birimsiz, görüntü bulanıktır. Az fotonda (I₀ = 1000) σ 585 HU'ya çıkar ve 54 HU'luk kist–doku farkı gürültüde kaybolur. HU kutusu 54,5 HU verir: yumuşak doku.",
        explain:
          "Her izdüşüm kesitin üzerine bir çizgi gibi yayılır; az açıda bu çizgiler birbirini tamamlayamaz. Rampa süzgeci geri izdüşümün 1/r halesini negatif kenarlarla iptal eder; süzgeç olmayınca hale kalır. Gürültü fotonların Poisson dağılımından gelir: −ln(n/I₀) içinde n küçüldükçe göreli dalgalanma 1/√n ile büyür. Görüntü kalitesi ile doz arasındaki ödünleşim burada sayıya döner.",
      },
      {
        title: "Yağ cihazı kandırır: A-modunda derinlik hatası",
        predict:
          "03 · Ultrason sekmesinin \"2. A-modu\" bölümünde 4 cm yağın altındaki kas sınırı ekranda kaç cm'de görünür: tam 4,00, biraz sığ, biraz derin?",
        do:
          "\"Katman dizisi\" menüsünü önce varsayılan \"Karın\"da bırakıp tabloyu oku, sonra \"Kalın yağ\"ı seç. Ardından \"Kemik\" ve \"Kist\" dizilerini dene ve \"Yankı\" sütununa bak.",
        observe:
          "Karında yağ → kas sınırı 1,50 cm yerine 1,62 cm (+1,2 mm). Kalın yağda yağ → kas 4,00 cm yerine 4,31 cm (+3,1 mm, ölçülen t = 55,94 µs), kas → karaciğer 5,00 yerine 5,28 cm; durum satırı, yağın altındaki sınırların yağ kalınlığının %7,7'si kadar derinde göründüğünü söyler. Kemik dizisinde kemiğin arkasındaki sınır −108,4 dB'de kalır (akustik gölge). Kist dizisinde su → karaciğer yankısı −38,5 dB ile kistin önündeki yankı (−38,4 dB) kadar güçlüdür (arka güçlenme).",
        explain:
          "Gerçek gecikme t = 2Σd<sub>i</sub>/c<sub>i</sub>'dir, cihaz d = 1540·t/2 yazar. Yağda c = 1430 m/s olduğundan her yağ santimetresi 1540/1430 = 1,077 cm gibi görünür. Kemikte ses hızlıdır (3360 m/s), bu yüzden kemiğin arkası tersine sığ görünür (2,80 yerine 2,32 cm); ama asıl etki, yüksek yansıma ve 10 dB/(cm·MHz) zayıflamanın arkayı karartmasıdır. Su sesi neredeyse hiç zayıflatmaz, arkasındaki doku TGC ile fazladan yükseltilmiş gibi parlak görünür.",
      },
      {
        title: "Aynı beyin, üç görüntü: T1, T2 ve PD",
        predict:
          "04 · MR sekmesinin \"2. T1, T2 ve görüntü kontrastı\" bölümünde beyin omurilik sıvısı (BOS) hangi ayarda en parlak, hangisinde en koyu olur?",
        do:
          "Sırayla \"T1 ağırlıklı\" (TR 500, TE 15 ms), \"T2 ağırlıklı\" (4000/100) ve \"PD ağırlıklı\" (4000/15) düğmelerine bas; tablodaki \"S kuram\", \"S Bloch\" ve \"Fark\" sütunlarını ve yapay beyin kesitini karşılaştır.",
        observe:
          "T1'de yağ en parlak (kuram 0,7023, Bloch 0,6957), BOS en koyu (0,1078 / 0,1048); en büyük fark %2,8. T2'de BOS en parlak (0,5746 / 0,5658), yağ en koyu (0,2397), karaciğer 0,0821. PD'de değerler 0,60 ile 0,85 arasında toplanır (gri madde 0,8496, BOS 0,5972) ve görüntü düzleşir.",
        explain:
          "S ∝ (1 − e<sup>−TR/T1</sup>)·e<sup>−TE/T2</sup>. Kısa TR'de uzun T1'li BOS (4350 ms) yeniden yatırılmadan geri kazanamaz, koyu kalır. Uzun TE'de T2'si kısa dokuların sinyali söner, T2'si 2200 ms olan BOS parlak kalır. Uzun TR ve kısa TE her iki farkı da bastırır; geriye proton yoğunluğu kalır ve sayfada bu eşit alındığından görüntü düzleşir. Bloch tümlemesi TE/2'deki 180° darbeyi de hesaba katar; fark TE ≪ TR iken küçüktür.",
      },
    ],
  },
  wow: [
    {
      title: "MR fotonu, X-ışını fotonundan 227 milyar kat zayıf",
      body:
        "04 · MR sekmesinde 1,5 T'de Larmor frekansı 63,8662 MHz, radyo fotonunun enerjisi h·f = 2,64·10⁻⁷ eV'dir. 60 keV'lik bir X-ışını fotonu bundan 2,27·10¹¹ kat enerjilidir. Bir atomdan elektron koparmak için birkaç eV gerekir; MR'ın iyonlaştırıcı ışınım kullanmamasının fiziksel nedeni budur.",
    },
    {
      title: "\"Ölümümü gördüm\"",
      body:
        "Keşiften yaklaşık altı hafta sonra Röntgen, eşi Anna Bertha Ludwig'in elinin X-ışını görüntüsünü çekti. Kayıtlara göre o, kendi iskeletini görünce \"Ölümümü gördüm!\" demişti. Bu görüntü X-ışınının bedenin içini gösterebileceğinin ilk ünlü kanıtlarından biridir.",
    },
    {
      title: "PET'te çiftlerin onda dokuzu kaybolur",
      body:
        "05. sekmenin varsayılan ayarında 20 000 yok olmadan yalnız 1864 çift kaydedilir (%9,32; kuram %9,77). Sayfanın verdiği hesapla 30 cm'lik bir çapı boydan boya geçen bir çiftin iki fotonunun da bedenden çıkma olasılığı e<sup>−0,096·30</sup> = %5,6'dır. Klinik PET bu yüzden zayıflamayı, çoğunlukla bir BT çekimiyle, düzeltir.",
    },
  ],
  worked: {
    title: "Kalın yağın altında yankı: gecikme, gösterilen derinlik ve düzey",
    prompt:
      "Bir ultrason probunun altında 4,00 cm yağ (ρ = 928 kg/m³, c = 1430 m/s) ve onun altında 1,00 cm kas (ρ = 1041 kg/m³, c = 1580 m/s) var; arkada karaciğer başlıyor. Cihaz 1540 m/s varsayıyor, frekans 5 MHz. Yağ–kas sınırından dönen yankının gecikmesi, cihazın gösterdiği derinlik ve yankı düzeyi (dB) nedir? Yağın zayıflaması 0,5 dB/(cm·MHz) alınsın. Kas–karaciğer sınırı ekranda nerede görünür?",
    steps: [
      "Gecikme: t₁ = 2d/c = 2 × 0,0400 m / 1430 m/s = 5,594·10⁻⁵ s = 55,94 µs. Cihazın yazdığı derinlik d = 1540 m/s × 55,94 µs / 2 = 4,308 cm ≈ 4,31 cm; hata +3,1 mm, yani 1540/1430 − 1 = %7,7 fazla.",
      "Yansıma: Z<sub>yağ</sub> = 928 × 1430 = 1,327 MRayl, Z<sub>kas</sub> = 1041 × 1580 = 1,645 MRayl. Genlik katsayısı (1,645 − 1,327)/(1,645 + 1,327) = 0,1069; şiddet kesri R = 0,1069² = 0,01143 = %1,143, yani 10·log₁₀ 0,01143 = −19,4 dB.",
      "Zayıflama: gidiş-dönüş yolu 8 cm, kayıp 0,5 dB/(cm·MHz) × 5 MHz × 8 cm = 20,0 dB. Toplam yankı düzeyi −19,4 − 20,0 = −39,4 dB (TGC'siz, gelen darbeye göre).",
      "İkinci sınır: kasta ek gecikme 2 × 0,0100 m / 1580 m/s = 12,66 µs, toplam t₂ = 68,60 µs. Gösterilen derinlik 1540 × 68,60 µs / 2 = 5,282 cm ≈ 5,28 cm. Kas cihazın varsaydığından biraz hızlı olduğu için hata 3,1 mm'den 2,8 mm'ye iner.",
      "Sayfada doğrula: 03 · Ultrason sekmesinde \"Katman dizisi\" menüsünden \"Kalın yağ\"ı seç (5 MHz, 2 dalga): tablo 4,00 cm · 55,94 µs · 4,31 cm · +3,1 mm · −39,4 dB ve 5,00 cm · 68,60 µs · 5,28 cm · +2,8 mm satırlarını verir.",
    ],
    result:
      "Yankı 55,94 µs sonra gelir ve 4,31 cm'de gösterilir (gerçek 4,00 cm, +3,1 mm); düzeyi −39,4 dB'dir (yansımadan −19,4, yoldan −20,0 dB). Kas–karaciğer sınırı 5,00 cm yerine 5,28 cm'de görünür.",
  },
  misconceptions: [
    {
      myth: "Ultrason görüntüsünü dokular arasındaki ses hızı farkı çizer.",
      truth:
        "Yankıyı akustik empedans farkı (Z = ρc) belirler: yoğunluk ve hız birlikte. 07. sekmedeki kartta karaciğerden suya geçişte ses hızı %6,1 değişir ama yansıyan şiddet yalnız %0,322'dir. Cihaz ses hızını yalnız zamanı derinliğe çevirmek için kullanır ve her yerde 1540 m/s varsayar.",
    },
    {
      myth: "Yüksek frekanslı ultrason daha güçlüdür, daha derine iner.",
      truth:
        "Dokudaki zayıflama (dB) frekansla yaklaşık doğru orantılı artar. 03. sekmenin B-modu bölümünde 60 dB'lik alma aralığıyla görülebilen derinlik 2 MHz'de 30,0 cm, 15 MHz'de yalnız 4,0 cm'dir. Yüksek frekans daha ince ayrıntı (dalga boyu 0,770 yerine 0,103 mm) verir ama sığ kalır.",
    },
    {
      myth: "İki yarı değer kalınlığı ışını tamamen durdurur.",
      truth:
        "Her HVL kendisine ulaşanın yarısını durdurur. İki HVL sonra %25, dört HVL sonra (1/2)⁴ = %6,25 kalır. 01. sekmede 5,0 cm yumuşak doku 1,57 HVL'dir ve fotonların %33,78'i (kuram) geçer; zayıflama üsteldir, sıfıra hiçbir sonlu kalınlıkta inilmez.",
    },
    {
      myth: "Doppler'de ışın damara dik tutulursa kayma en büyük olur.",
      truth:
        "Kaymayı hızın ışın doğrultusundaki bileşeni v·cos θ üretir. 03. sekmede \"θ = 90°\" hazırında kayma 0 Hz'dir ve hız ölçülemez; ölçüm için açı küçültülür. Öte yandan küçük açı ve yüksek hız örtüşmeye yol açabilir: \"Örtüşme\" hazırında 6494 Hz'lik kayma −1506 Hz'de, ters yönde görünür.",
    },
  ],
  glossary: [
    { term: "Doğrusal zayıflama katsayısı (μ)", definition: "Bir fotonun maddede birim yol başına etkileşme olasılığı (cm⁻¹); kütle zayıflama katsayısı μ/ρ ile yoğunluğun çarpımıdır." },
    { term: "Yarı değer kalınlığı (HVL)", definition: "Bir ışının şiddetini yarıya indiren madde kalınlığı; tek enerjili ışında ln 2/μ." },
    { term: "Sinogram", definition: "BT'de izdüşümlerin açıya ve dedektör konumuna göre dizilmiş hâli; her nokta bir sinüs eğrisi çizer." },
    { term: "Hounsfield birimi (HU)", definition: "BT'de μ'nün suya göre ölçeklenmiş değeri: su 0, hava −1000 HU." },
    { term: "Akustik empedans (Z)", definition: "Yoğunluk ile ses hızının çarpımı ρc; birimi rayl (kg·m⁻²·s⁻¹), dokular için MRayl mertebesinde." },
    { term: "Larmor frekansı", definition: "Manyetik alandaki spin mıknatıslanmasının alan çevresinde dönme frekansı; proton için 42,577 MHz/T × B." },
    { term: "T1 ve T2", definition: "MR'da boyuna mıknatıslanmanın geri kazanılma (T1) ve enine mıknatıslanmanın sönme (T2) zaman sabitleri." },
    { term: "Etkin doz", definition: "Organ duyarlılığı ve ışın türüyle ağırlıklandırılmış, bütün beden için tek sayıya çevrilmiş doz (sievert, Sv); bireysel risk değil, karşılaştırma büyüklüğüdür." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki her yöntem lisansta tam bir dersin konusudur. BT'nin matematiği <strong>Radon dönüşümü</strong> ve <strong>Fourier dilim teoremidir</strong>: bir izdüşümün Fourier dönüşümü, kesitin iki boyutlu Fourier dönüşümünün bir doğru boyunca dilimidir; rampa süzgecinin |ω| çarpanı kutupsal koordinattaki Jakobyenden gelir. MR, Bloch denklemleri ve k-uzayıyla aynı Fourier dilini konuşur. Ultrason dalga denklemine ve sinyal işlemeye (örnekleme kuramı, Nyquist sınırı, örtüşme) dayanır; PET ise olasılık ve istatistiksel geri kurma (en çok olabilirlik, yinelemeli yöntemler) ister.",
      "Tıp fakültesinde konu Biyofizik ve Radyoloji derslerinde, mühendislikte Biyomedikal Görüntüleme, Tıbbi Fizik ve Radyasyondan Korunma derslerinde yeniden karşına çıkar; Modern Fizik ve Nükleer Fizik dersleri fotoelektrik olay, Compton saçılması ve pozitron yok olmasının ayrıntısını verir. Hatırlatma: bu sayfa görüntülemenin fiziğini öğretir, tanı ya da tetkik önerisi değildir. Sağlıkla ilgili kararlar için bir sağlık profesyoneline başvurun; acil durumda 112.",
    ],
    topics: [
      "Radon dönüşümü ve Fourier dilim teoremi",
      "Süzgeçli geri izdüşüm ve yinelemeli geri kurma",
      "Fotoelektrik olay ve Compton saçılması",
      "Dalga denklemi ve akustik empedans",
      "Örnekleme kuramı ve örtüşme",
      "Bloch denklemleri ve k-uzayı",
      "Poisson istatistiği ve kontrast-gürültü oranı",
      "Etkin doz, LNT modeli ve ALARA",
    ],
  },
  quiz: [
    {
      question:
        "Göğüs filmi modelinde piksel başına gelen foton sayısı I₀ 2000'den 20 000'e çıkarılıyor; düğümün kontrastı (%26,92) değişmiyor. Kuramsal piksel CNR'si (4,38) yaklaşık ne olur?",
      options: ["4,38 kalır", "Yaklaşık 13,9 olur", "Yaklaşık 43,8 olur", "Yaklaşık 1,39 olur"],
      answer: 1,
      explanation:
        "Poisson gürültüsünde σ = √(beklenen sayı) ∝ √I₀, sinyal farkı ise I₀ ile orantılıdır; oranları CNR ∝ √I₀. I₀'ı 10 kat artırmak CNR'yi √10 = 3,16 kat büyütür: 4,38 × 3,16 = 13,86. Sayfada \"Piksel CNR: kuram\" tam bu değeri gösterir. Daha net görüntü, kabaca orantılı olarak daha çok doz demektir.",
    },
    {
      question:
        "Darbeli Doppler'de f₀ = 5 MHz, v = 50 cm/s, θ = 60° ve PRF = 5 kHz iken kayma 1623 Hz ölçülüyor. Yalnız f₀ 10 MHz'e çıkarılırsa ne görülür?",
      options: [
        "3247 Hz, doğru yönde ve daha keskin bir tepe",
        "1623 Hz; kayma f₀'a bağlı değildir",
        "Kayma 3247 Hz olur ama PRF/2 = 2500 Hz'yi aştığı için yaklaşık −1753 Hz'de, ters yönde görünür",
        "Kayma yarıya, 812 Hz'e iner",
      ],
      answer: 2,
      explanation:
        "f<sub>D</sub> = 2f₀v·cos θ/c f₀ ile orantılıdır: 3247 Hz. Örnekleme frekansı PRF = 5 kHz olduğundan ±2500 Hz dışındaki frekanslar PRF kadar kaydırılarak katlanır: 3247 − 5000 = −1753 Hz. Sayfa bu durumda tahmin edilen hızı −27,0 cm/s, örtüşmesiz en büyük hızı 38,5 cm/s olarak verir.",
    },
    {
      question:
        "MR frekans kodlamasında örnekleme aralığı Δt ve örnek sayısı N sabitken okuma gradyanı G 10 mT/m'den 20 mT/m'ye çıkarılıyor. Görüş alanı (FOV, başta 23,49 cm) ve piksel genişliği ne olur?",
      options: [
        "FOV 46,98 cm'ye çıkar, piksel 3,67 mm olur",
        "FOV 11,74 cm'ye iner, piksel 0,92 mm olur",
        "İkisi de değişmez; yalnız sinyal güçlenir",
        "FOV aynı kalır, piksel yarıya iner",
      ],
      answer: 1,
      explanation:
        "FOV = 1/((γ/2π)·G·Δt): G iki katına çıkınca 1 cm'deki frekans farkı da iki katına çıkar (4257,7'den 8515,5 Hz/cm'ye), aynı bant genişliğine yarı uzunluk sığar. Δx = FOV/N = 11,74 cm/128 = 0,92 mm. Bedel: FOV dışında kalan nesne karşı kenardan geri girer; 40 mT/m'de FOV 5,87 cm olur ve iki çubuk katlanır.",
    },
  ],
  next: [
    {
      href: "radyoaktif-bozunma.html",
      title: "Radyoaktif Bozunma: Rastlantıdan Doğan Yasa",
      why: "05. sekmedeki izleyicilerin yarı ömür eğrisinin rastlantısal bozunmalardan nasıl doğduğu; Hekim yolunda bu basamağın sonraki durağı.",
    },
    {
      href: "nukleer-fizik.html",
      title: "Çekirdek Bağlanma Enerjisi: Kütle Açığı, Fisyon ve Füzyon",
      why: "Kütle–enerji eşdeğerliği ve bağlanma enerjisi: PET'teki 511 keV'lik fotonların kaynağı olan E = mc² ilişkisinin çekirdek fiziğindeki karşılığı.",
    },
    {
      href: "doppler-etkisi.html",
      title: "Doppler Etkisi: Dalga Cepheleri ve Ses Patlaması",
      why: "Hareketli kaynak ve gözlemcide frekans kaymasının genel kuramı; ultrasondaki 2f₀v·cos θ/c formülünün arkasındaki dalga cepheleri.",
    },
    {
      href: "fourier-ses.html",
      title: "Fourier: Sesten Örneklere",
      why: "Sinyali frekanslarına ayırma ve örnekleme: MR'da frekans kodlamanın, Doppler'de örtüşmenin ve BT'deki rampa süzgecinin ortak dili.",
    },
  ],
  sources: [
    {
      title: "Wilhelm Röntgen (Wikipedia)",
      url: "https://en.wikipedia.org/wiki/Wilhelm_R%C3%B6ntgen",
      note: "8 Kasım 1895'teki deney, kartonla sarılı tüp ve baryum platinosiyanür ekran, 28 Aralık 1895 tarihli makale, eşinin elinin görüntüsü ve 1901 Nobel Fizik Ödülü.",
    },
    {
      title: "Godfrey Hounsfield (Wikipedia)",
      url: "https://en.wikipedia.org/wiki/Godfrey_Hounsfield",
      note: "EMI'deki çalışma, 1 Ekim 1971'de Atkinson Morley Hastanesi'ndeki ilk hasta taraması ve Allan Cormack ile paylaşılan 1979 Nobel Fizyoloji veya Tıp Ödülü.",
    },
    {
      title: "Ian Donald (Wikipedia)",
      url: "https://en.wikipedia.org/wiki/Ian_Donald",
      note: "1955'teki endüstriyel ultrason denemesi, MacVicar ve Brown ile çalışma ve Haziran 1958'de The Lancet'te yayımlanan makale.",
    },
    {
      title: "Paul Lauterbur (Wikipedia)",
      url: "https://en.wikipedia.org/wiki/Paul_Lauterbur",
      note: "1973 tarihli Nature makalesi (gradyanla görüntü oluşturma) ve Peter Mansfield ile paylaşılan 2003 Nobel Fizyoloji veya Tıp Ödülü.",
    },
    {
      title: "Radiation Dose in X-Ray and CT Exams (RadiologyInfo.org, ACR/RSNA)",
      url: "https://www.radiologyinfo.org/en/info/safety-xray",
      note: "Erişkin için tipik etkin dozlar (göğüs filmi 0,1, göğüs BT'si 6,1, karın-pelvis BT'si 7,7, PET/BT 22,7 mSv) ve ABD'de yılda yaklaşık 3 mSv doğal ışınım; son gözden geçirme 15 Nisan 2025.",
    },
  ],
  revision: "Kasım 2026",
};
