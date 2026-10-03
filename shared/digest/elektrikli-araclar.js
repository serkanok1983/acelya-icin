window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["elektrikli-araclar"] = {
  slug: "elektrikli-araclar",
  title: "Elektrikli Araçlar: Pilden Tekerleğe Enerji",
  field: "Mühendislik",
  level: "Lise",
  minutes: 30,
  tagline:
    "Saatte 100 kilometreyi aşan ilk otomobil 1899'da elektrikliydi. Yüz yıl kaybolup bir telefon piliyle geri döndü: bataryadan tekerleğe giden enerjinin muhasebesi.",
  hook:
    "29 Nisan 1899'da Paris yakınlarında torpido biçimli bir araç saatte 105,88 kilometreye ulaştı; insanlık ilk kez 100 km/sa duvarını geçmişti ve kaputun altında benzin değil, akü vardı. Peki elektrikli otomobil sonra neden neredeyse yüz yıl ortadan kayboldu ve onu geri getiren şey neden bir dizüstü bilgisayar pili oldu?",
  bigIdea:
    "Elektrikli araç bir <strong>enerji muhasebesidir</strong>: bataryada kimyasal olarak saklanan her watt-saat, inverter ve motordan geçerek tekerlekte işe dönüşür. Menzil, şarj süresi ve ağırlık aynı üç sayının farklı yüzleridir: <em>kWh</em> (ne kadar enerji), <em>kW</em> (ne hızla) ve <em>Wh/kg</em> (kaç kiloya).",
  story: [
    "1881'de Gustave Trouvé, Paris sokaklarında akülü üç tekerlekli bir araç sürdü; 1899'da Belçikalı yarışçı Camille Jenatzy, <em>La Jamais Contente</em> (Hiç Memnun Olmayan) adlı elektrikli aracıyla saatte 105,88 kilometreye çıkarak 100 km/sa'yi aşan ilk insan oldu. 1900 yılında ABD'de üretilen otomobillerin yaklaşık yüzde 38'i elektrikli, yüzde 40'ı buharlı, yalnızca yüzde 22'si benzinliydi. Elektrikli araba sessizdi, kokmuyordu ve kolla çevrilerek çalıştırılmak zorunda değildi; şehir içinde doktorların ve kadınların tercihiydi. Sonra üç şey oldu: 1908'de Ford Model T ucuz seri üretimi başlattı, 1912'de Charles Kettering'in elektrikli marşı benzinli motorun en büyük derdini çözdü ve Teksas petrolü yakıtı ucuzlattı. Kurşun-asit akünün kilogramında 30–40 watt-saat vardı; benzinin kilogramında on bin küsur. Kırsala uzanan yollar menzil istiyordu ve 1920'lerde elektrikli otomobil kayboldu.",
    "Geri dönüşün anahtarı bir otomobil fabrikasında değil, kimya laboratuvarlarında döküldü. 1970'lerde Exxon'da çalışan Stanley Whittingham, lityum iyonlarının titanyum disülfür katmanları arasına girip çıkabildiğini gösterdi; lityum metal anotlu bu ilk hücre 2 volt veriyordu ama yangın çıkarıyordu. 1980'de Oxford'da John Goodenough katodu lityum kobalt oksit yapıp gerilimi 4 volta çıkardı. 1985'te Japonya'da Akira Yoshino lityum metalini bırakıp iyonları karbon bir anotta sakladı: artık hücrede metalik lityum yoktu ve pil güvenle şarj edilebiliyordu. Sony bu tasarımı 1991'de kamera pili olarak sattı. Üçlü 2019 Nobel Kimya Ödülü'nü paylaştı. 1997'de Goodenough'ın grubu bir de kobaltsız katot önerdi: lityum demir fosfat, bugünün LFP'si.",
    "Otomobil dünyası pilin peşinden yavaş geldi. General Motors'un 1996'daki EV1'i önce kurşun-asit, sonra nikel-metal hidrit kullandı; kiralanan araçlar 2003'te geri toplanıp hurdaya ayrıldı. 2008'de Tesla Roadster, 6.831 adet dizüstü bilgisayar pilini (18650 hücre) bir paket hâlinde birleştirip 300 kilometrenin üstünde menzil verdi. 2010'da Nissan Leaf seri üretim elektrikli otomobili sıradan bir alıcıya ulaştırdı; 2017'de Tesla Model 3, 2023'te Türkiye'de Togg T10X yollara çıktı. Uluslararası Enerji Ajansı'nın sayımına göre 2023'te dünyada satılan her yüz yeni otomobilin yaklaşık 18'i elektrikliydi; 1900'deki orana geri dönülmüştü, bu kez kurşun-asit yerine kilogramında 250 watt-saat taşıyan lityum hücrelerle.",
  ],
  core: [
    {
      heading: "Hücre: iyonlar içeriden, elektronlar dışarıdan",
      body:
        "Bir lityum-iyon hücre, iki 'raf' arasında gidip gelen iyonlardan ibarettir. Deşarjda Li⁺ iyonları grafit anodun katmanları arasından çıkar, elektrolitin içinden katoda (nikel-mangan-kobalt oksit ya da demir fosfat) göç eder ve oradaki boşluklara yerleşir; buna <strong>interkalasyon</strong> denir. Elektronlar elektrolitten geçemez, dış devreden dolaşmak zorundadır; motoru çalıştıran da bu dolambaçlı yoldur. Şarjda bir dış kaynak elektronları geri iter, iyonlar grafite döner. Hücrenin gerilimi iki rafın 'kimyasal yüksekliği' arasındaki farktır: grafit ile NMC arasında yaklaşık 3,7 volt, grafit ile LFP arasında 3,2 volt. Sayfadaki animasyonda sarı noktalar deşarjı, turkuaz noktalar şarjı gösterir.",
      formula: "E = V · Q  (Wh = V × Ah)",
      formulaNote: "3,7 V'luk bir hücre 4,6 amper-saat taşıyorsa 17 watt-saat saklar; bir telefon pilinin yaklaşık üç katı.",
    },
    {
      heading: "Seri gerilimi, paralel kapasiteyi toplar",
      body:
        "Tek bir hücre 3,7 volt verir; bir motor yüzlerce volt ister. Çare hücreleri zincirlemektir: <strong>seri</strong> bağlanan hücrelerin gerilimleri toplanır, <strong>paralel</strong> bağlananların kapasiteleri (amper-saat) toplanır. Sayfanın verdiği Tesla Model 3 örneği '96s46p'dir: 46 hücre yan yana bir grup oluşturur, 96 grup art arda dizilir. 96 × 3,7 ≈ 355 volt nominal gerilim; sektör buna '400 volt sınıfı' der, çünkü tam dolu hücre 4,2 volta çıkar. Toplam 4.416 hücre tek bir yönetim sisteminin (BMS) gözetiminde çalışır; en zayıf hücre bütün paketin sınırını belirler, bu yüzden BMS hücreleri dengeler.",
      formula: "V<sub>paket</sub> = n<sub>s</sub>·V<sub>hücre</sub>,  Q<sub>paket</sub> = n<sub>p</sub>·Q<sub>hücre</sub>",
      formulaNote: "n_s seri grup sayısı, n_p paraleldeki hücre sayısı. Enerji ikisinin çarpımıyla büyür: E = n_s·n_p·V·Q.",
    },
    {
      heading: "Motor: tork ve gücün kesiştiği devir",
      body:
        "Benzinli motor rölantide neredeyse tork üretmez; elektrik motoru sıfır devirde en büyük torku verir. Bu yüzden elektrikli araçta çoğunlukla vites kutusu yoktur, yalnızca sabit bir redüktör (sayfadaki E-Aks kartına göre 9:1 ile 10:1 arası) vardır. Tork düz bir çizgi gibi gider; güç tork çarpı açısal hız olduğundan devirle doğrusal büyür. Bir yerde güç tavanına çarpar: VW'nin APP310 motoru 310 N·m ve 150 kW verir; 150.000 / 310 ≈ 484 rad/s, yani dakikada yaklaşık 4.600 devirde tork düşmeye başlar ve motor 'sabit güç' bölgesine girer. Sayfadaki motor kartları bu eğriyi farklı kimyalarla (mıknatıslı, asenkron, relüktans) nasıl elde ettiklerini anlatır.",
      formula: "P = τ · ω,   ω = 2π·n / 60",
      formulaNote: "τ newton-metre, ω radyan/saniye, n devir/dakika. 310 N·m × 484 rad/s = 150 kW.",
    },
    {
      heading: "Frenlerken şarj: rejeneratif frenleme",
      body:
        "Elektrik motoru tersine çalıştırılabilen bir makinedir: tekerlek motoru döndürürse motor jeneratör olur, inverter de doğrultucu moduna geçip akımı bataryaya yollar. Araç yavaşlarken kinetik enerjinin bir kısmı ısı yerine kimyasal enerjiye döner. Ama miktar sanıldığından azdır: 1.800 kg'lık bir araç 100 km/sa'de yalnızca 0,19 kWh kinetik enerji taşır; bu, bataryasının yüzde yarımından azıdır. Rejenerasyonun gücü tek bir frenlemede değil, şehir trafiğindeki yüzlerce dur-kalkta birikir; sayfadaki kart yüzde 15–30 geri kazanımdan söz eder. Animasyondaki 'Şarj (Regen)' düğmesi tam bu anı canlandırır.",
      formula: "E<sub>k</sub> = ½ · m · v²",
      formulaNote: "m kilogram, v metre/saniye. 100 km/sa = 27,8 m/s; ½ × 1800 × 27,8² ≈ 694 kJ = 0,19 kWh.",
    },
    {
      heading: "Menzil: Wh/km muhasebesi ve hızın küpü",
      body:
        "Bir elektrikli araç kilometre başına ortalama 150–200 watt-saat harcar; menzil, batarya enerjisinin bu sayıya bölümüdür. Hesabı bozan en büyük kalem hava direncidir: direnç kuvveti hızın karesiyle, onu yenmek için gereken güç hızın küpüyle büyür. 90'dan 120 km/sa'ye çıkmak gücü 2,4 katına, kilometre başına enerjiyi 1,8 katına çıkarır. Bu yüzden üreticiler sürükleme katsayısıyla yarışır: sayfada Mercedes EQS için 0,20 verilir. Kışın ikinci kalem ısıtmadır; benzinli araç kabini motorun atık ısısıyla bedavaya ısıtır, elektrikli araçta her watt menzilden gider. Isı pompası 1 kW elektrikle 2–4 kW ısı taşıyarak bu kaybı küçültür.",
      formula: "F<sub>d</sub> = ½ · ρ · C<sub>d</sub> · A · v²,   P<sub>d</sub> = F<sub>d</sub> · v",
      formulaNote: "ρ havanın yoğunluğu (≈1,2 kg/m³), A aracın ön alanı, C_d sürükleme katsayısı. Güç v³ ile büyür.",
    },
  ],
  lab: {
    intro:
      "Bu sayfa bir hesap simülasyonu değil, bir <strong>gösterim ve kart kütüphanesi</strong>dir. Üstteki hücre animasyonunu üç düğme yönetir: <strong>⚡ Deşarj (Sürüş)</strong>, <strong>🔌 Şarj (Regen)</strong> ve <strong>⏸ Durdur</strong>; sağdaki SoC sütunu yüzde 80'den başlar, altındaki satır modu ve iyon yönünü yazar. Aşağıdaki dört kart grubu (batarya kimyası, motor, güç elektroniği, şarj) tıklanınca açılır; en alttaki altı kart sabittir. Deneylerin yarısı animasyonu ölçer, yarısı kartlardaki sayılarla hesap yapar. Bir uyarı: animasyon kare başına sabit adım atar; 60 Hz bir ekranda verdiğimiz süreler, 120 Hz ekranda yarıya iner.",
    experiments: [
      {
        title: "Saniyede yüzde kaç boşalıyor?",
        predict: "Deşarj düğmesine basınca SoC sütunu yüzde 80'den en dibe kaç saniyede iner? Sıfıra kadar iner mi? Şarj daha mı hızlı, daha mı yavaş?",
        do: "Sayfa açılır açılmaz telefonun kronometresini başlat; animasyon zaten deşarj modundadır. SoC yazısı değişmeyi bırakınca süreyi oku. Sonra Şarj (Regen)'e bas ve tepeye kadar yeniden zamanla.",
        observe: "60 Hz ekranda yüzde 80'den 5'e yaklaşık 8,3 saniye (kare başına 0,15 puan, saniyede 9 puan); sütun 5'te durur, sıfıra inmez. Şarj kare başına 0,2 puanla biraz daha hızlıdır: 5'ten 98'e yaklaşık 7,8 saniye, 98'de durur. Yazıda arada '79.69999999999999' gibi kuyruklar görürsün.",
        explain: "Simülasyon gerçek güç hesaplamaz; sanatçı hızıdır. Gerçek bir 75 kWh paket 8 saniyede yüzde 75 boşalsaydı güç 25 megawatt olurdu, küçük bir kasabanın tüketimi. 5–98 aralığı ise gerçeğe yakın: BMS hücreleri tam boş ve tam doluya itmez, ömür için pay bırakır. Ondalık kuyruklar bilgisayarın 0,15'i ikilik tabanda tam yazamamasından gelir; her sayısal simülasyonun küçük, dürüst bir hatasıdır.",
      },
      {
        title: "İyonlar hangi yöne gidiyor, yazı ne diyor?",
        predict: "Deşarjda Li⁺ iyonları anottan (sol, grafit) katoda (sağ) gitmeli. Noktaların yönü yalnızca moda mı bağlı, yoksa SoC de işin içine giriyor mu?",
        do: "Deşarj modunda SoC yüzde 50'nin üstündeyken sarı noktaların soldan sağa aktığını doğrula. SoC 50'nin altına inince Deşarj (Sürüş) düğmesine bir kez daha bas ve noktaları yeniden izle. Ardından Durdur'a bas.",
        observe: "Yüzde 50'nin üstünde noktalar anottan katoda gider ve alt satır 'Anot → Katot' yazar. 50'nin altında düğmeye basınca noktalar sağdan sola, katottan anoda akmaya başlar; alt satır hâlâ 'Anot → Katot' der. Durdur'a basınca SoC donar ama noktalar yürümeye devam eder.",
        explain: "Fizikte yönü yalnızca mod belirler: deşarjda iyonlar her doluluk düzeyinde anottan katoda gider. Sayfanın kodu başlangıç tarafını SoC'nin 50'nin altında ya da üstünde olmasına göre seçiyor; bu bir simülasyon hatasıdır. Alt satır doğru, noktalar yarı yarıya yanlış. Bir simülasyonu da bir ders kitabı gibi eleştirel okumak gerekir: hangi kısmı hesap, hangi kısmı süs?",
      },
      {
        title: "Aynı enerji, kaç kilo hücre?",
        predict: "75 kWh'lik bir paket için LFP hücreler NMC hücrelerden kaç kilogram daha ağır olur? İki kat mı, yüzde 20 mi?",
        do: "Batarya Kimyası bölümünde NMC kartına tıkla, enerji yoğunluğunu ve çevrim ömrünü not et; sonra LFP kartına tıkla ve aynı iki sayıyı al. 75.000 Wh'yi her ikisinin orta değerine böl.",
        observe: "NMC 200–260 Wh/kg, 1.000–2.000 çevrim; LFP 140–160 Wh/kg, 3.000–6.000 çevrim. 75.000 / 250 = 300 kg, 75.000 / 150 = 500 kg: yalnızca hücreler için 200 kg fark. Paket kasası, soğutma ve kablolar bunun üstüne eklenir.",
        explain: "Mühendislik bir takas tablosudur. LFP ağırdır ama kobalt içermez, daha ucuzdur ve iki üç kat fazla çevrim dayanır: 400 km menzilli bir araçta 3.000 çevrim 1,2 milyon kilometre demektir. Uzun yol aracı NMC'nin hafifliğini, şehir aracı ve taksi LFP'nin ömrünü seçer. Aynı sayfadaki iki kart, iki farklı aracın gerekçesidir.",
      },
      {
        title: "Evde bir gece, yolda bir kahve",
        predict: "60 kWh'lik bataryayı yüzde 20'den 80'e çıkarmak için 36 kWh gerekir. Kartların verdiği 7,2 kW, 11 kW ve 22 kW'lık yerleşik şarj cihazlarıyla bu kaç saat sürer? DC hızlı şarj kartı neden sayı vermiyor?",
        do: "Güç Elektroniği bölümünde Onboard Şarj Cihazı (OBC) kartını aç ve güç değerlerini oku; sonra Şarj Sistemleri bölümünde AC Şarj ve DC Hızlı Şarj kartlarını sırayla aç. 36 kWh'yi her güce böl.",
        observe: "36 / 7,2 = 5,0 saat; 36 / 11 ≈ 3,3 saat; 36 / 22 ≈ 1,6 saat. DC kartı tek bir rakam yerine 'şarj eğrisi'nden söz eder: tepe güç bütün oturum boyunca korunmaz, sıcaklık ve doluluk oranı gücü kısar.",
        explain: "AC şarjda darboğaz istasyon değil, aracın kendi dönüştürücüsüdür; sayı sabittir, bölme yeter. DC şarjda dönüşümü istasyon yapar ve BMS her saniye izin verilen akımı bildirir; yüzde 80'den sonra güç belirgin biçimde düşer. Bu yüzden uzun yolda 'yüzde 10'dan 80'e' doldurup yola çıkmak, 100'ü beklemekten hızlıdır. 800 volt mimari aynı 250 kW'ı 625 yerine 312 amperle taşır; kablodaki ısı kaybı I²R ile dörtte bire iner.",
      },
    ],
  },
  wow: [
    {
      title: "100 km/sa'yi ilk aşan araç elektrikliydi",
      body:
        "29 Nisan 1899'da Camille Jenatzy, Paris yakınlarındaki Achères'de <em>La Jamais Contente</em> ile saatte 105,88 kilometreye çıktı. Gövde alüminyum alaşımından torpido biçimindeydi; ne var ki sürücü gövdenin üstünde, rüzgâra açık oturuyordu. Bir sonraki yıl aynı rekoru kıran araç buharlıydı, benzinlinin sırası daha sonra geldi.",
    },
    {
      title: "Ay'daki ilk otomobil de elektrikliydi",
      body:
        "1971–1972'de Apollo 15, 16 ve 17 astronotları Ay'da elektrikli bir araç sürdü. Lunar Roving Vehicle'ın dört tekerleğinin her birinde yaklaşık 190 wattlık bir doğru akım motoru vardı; enerjisini şarj edilemeyen gümüş-çinko akülerden alıyordu. Apollo 17'de araç 35 kilometreden fazla yol yaptı ve saatte 18 kilometreyle Ay hız rekorunu kırdı. Benzinli bir motor Ay'da zaten çalışamazdı: yakacak oksijen yok.",
    },
    {
      title: "97 yaşında Nobel ve iki katot birden",
      body:
        "John Goodenough 2019'da Nobel Kimya Ödülü'nü aldığında 97 yaşındaydı; o güne kadarki en yaşlı Nobel sahibiydi. Aynı insan 1980'de lityum kobalt oksit katodu bulmuş, 1997'de de kobaltsız alternatifi lityum demir fosfatı önermişti. Bugün yoldaki elektrikli araçların iki büyük batarya ailesi, NMC ve LFP, aynı laboratuvarın iki ayrı on yılından çıktı.",
    },
  ],
  worked: {
    title: "Bir paketi hücreden kurmak",
    prompt:
      "Sayfanın verdiği Tesla Model 3 örneğini çöz: 96 seri grup, her grupta 46 paralel hücre, hücre gerilimi 3,7 V, paket enerjisi 75 kWh. Bir hücrenin kapasitesini bul; sonra bu paketle 160 Wh/km harcayan aracın menzilini ve 11 kW'lık ev şarjıyla boştan doluya süresini hesapla.",
    steps: [
      "Hücre sayısını bul: 96 × 46 = 4.416 hücre. Paket enerjisini hücreye böl: 75.000 Wh / 4.416 ≈ 17,0 Wh. Bir hücrenin enerjisi budur.",
      "Hücre kapasitesini çıkar: Q = E / V = 17,0 Wh / 3,7 V ≈ 4,6 Ah. Bir 2170 hücresi için gerçekçi bir değer; sayfadaki '96s46p ~75 kWh' verisi kendi içinde tutarlı.",
      "Paketi kontrol et: gerilim 96 × 3,7 = 355 V; kapasite 46 × 4,6 ≈ 212 Ah; enerji 355 V × 212 Ah ≈ 75 kWh. Döngü kapandı.",
      "Menzil: 75.000 Wh / 160 Wh/km ≈ 470 km. Kışın ısıtma ve otoyol hızı bu sayıyı yüzde 20–30 kısar; sayfanın ısı pompası kartı tam bu kaybı anlatır.",
      "Şarj: 75 kWh / 11 kW ≈ 6,8 saat. Gerçekte yüzde 95 dolayındaki dönüştürücü verimi ve şarj eğrisinin son yüzde 20'deki yavaşlaması bunu 7–8 saate uzatır; bir gece yeter.",
    ],
    result:
      "4.416 hücrenin her biri 17 Wh taşır; birlikte 355 V ve 75 kWh ederler. Bu enerji yaklaşık 470 km yol ya da 11 kW'lık bir ev prizinde yedi saatlik uyku demektir. kWh, Wh/km ve kW: üç sayı, bütün hikâye.",
  },
  misconceptions: [
    {
      myth: "Batarya 75 kW, şarj cihazı 11 kWh.",
      truth:
        "Tersi. kWh enerjinin, kW gücün birimidir: kWh bir deponun büyüklüğü, kW muslukta akan su hızıdır. 75 kWh'lik batarya 11 kW'lık cihazla 75 / 11 ≈ 7 saatte dolar; 150 kW'lık istasyonda, eğri izin verirse, yarım saatte. Birimi karıştıran, süreyi de karıştırır.",
    },
    {
      myth: "Elektrikli araç sıfır emisyonludur, dolayısıyla çevreye etkisi sıfırdır.",
      truth:
        "Sıfır olan egzozdur, toplam değil. Elektriğin nasıl üretildiği, bataryanın madenciliği ve üretimi, aracın ömrü ve geri dönüşümü hesaba girer. Kömür ağırlıklı şebekede fark küçülür, yenilenebilir şebekede büyür; ömür boyu bakıldığında elektrikli araç çoğu senaryoda daha az sera gazı üretir, ama 'sıfır' demek muhasebenin yarısını saklamaktır.",
    },
    {
      myth: "İstasyonda 350 kW yazıyorsa araç 350 kW ile şarj olur.",
      truth:
        "İstasyon bir teklif yapar; son sözü aracın BMS'i söyler. Bataryanın sıcaklığı, doluluk oranı ve kimyası kabul edilen gücü belirler; çoğu araç tepe gücü yalnızca yüzde 10–50 arasında ve ılık bataryayla alır, yüzde 80'den sonra güç keskin düşer. Buna şarj eğrisi denir; sayfanın DC Hızlı Şarj kartı o yüzden tek bir rakam vermez.",
    },
    {
      myth: "Rejeneratif fren sayesinde yokuş aşağı inerken araç kendini doldurur, menzil bedavaya gelir.",
      truth:
        "Enerji korunur; motor yalnızca daha önce harcanmış kinetik ya da potansiyel enerjinin bir kısmını geri alır. 100 km/sa'den durmak 0,19 kWh geri getirir, bataryanın yüzde yarımından azı. Yokuş aşağı kazanılan enerji, aynı yokuşu çıkarken harcanandan hep küçüktür: motor, inverter ve batarya her geçişte pay alır.",
    },
  ],
  glossary: [
    { term: "SoC (Şarj Durumu)", definition: "Bataryada kalan enerjinin tam kapasiteye oranı, yüzde ile; sayfadaki sütun 5 ile 98 arasında gezinir." },
    { term: "kWh (kilowatt-saat)", definition: "Enerji birimi: 1 kW gücün bir saat boyunca verdiği enerji, 3,6 megajoule." },
    { term: "Enerji yoğunluğu", definition: "Birim kütle başına depolanan enerji, Wh/kg; NMC hücrede 200–260, LFP hücrede 140–160." },
    { term: "İnverter", definition: "Bataryanın doğru akımını motorun istediği frekans ve genlikte üç fazlı alternatif akıma çeviren güç elektroniği; frenlemede doğrultucu olur." },
    { term: "BMS (Batarya Yönetim Sistemi)", definition: "Her hücre grubunun gerilim ve sıcaklığını izleyen, SoC'yi kestiren, hücreleri dengeleyen ve tehlikede kontaktörleri açan denetleyici." },
    { term: "Rejeneratif frenleme", definition: "Yavaşlarken motorun jeneratör gibi çalışıp kinetik enerjinin bir kısmını bataryaya geri yollaması." },
    { term: "Şarj eğrisi", definition: "Şarj gücünün doluluk oranına göre değişimi; genellikle düşük SoC'de yüksek, yüzde 80'den sonra keskin düşen bir çizgi." },
    { term: "Interkalasyon", definition: "İyonların bir kristalin katmanları arasına yapıyı bozmadan girip çıkması; lityum-iyon hücrenin çalışma ilkesi." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfadaki her kart üniversitede bir derse açılır. Hücre gerilimi <strong>elektrokimyada</strong> Nernst denklemiyle hesaplanır; iyonların grafit katmanlarına girişi katı hâl fiziği ve difüzyon denklemleridir; termal kaçak kinetik ve ısı transferinin konusudur. İnverter <strong>güç elektroniğinin</strong> alanıdır: transistörler saniyede on binlerce kez açılıp kapanarak (darbe genişlik modülasyonu) doğru akımdan sinüs çizer. Motoru yöneten 'alan yönelimli kontrol', üç fazlı akımı iki eksene indirgeyen Clarke ve Park dönüşümlerine dayanır: lisede öğrendiğin vektör bileşenleri ve döndürme matrisleri burada tork olur.",
      "BMS'in SoC kestirimi başlı başına bir kontrol kuramı problemidir: gerilim ölçümü gürültülü, akım integrali zamanla kayar; ikisini birleştiren <strong>Kalman filtresi</strong> aynı zamanda uzay araçlarının ve telefonların konum bulmasında kullanılır. Daha geniş ölçekte elektrikli araç bir sistem mühendisliği sorusudur: kaç kilometre menzil için kaç kilo batarya, kaç kilovat şarj için hangi şebeke, hangi madenler, hangi geri dönüşüm. Yaşam döngüsü analizi, güç sistemleri ve malzeme bilimi aynı masaya oturur. Tek bir aracı anlamak, enerji sisteminin tamamına bakmayı öğretir.",
    ],
    topics: ["Elektrokimya ve Nernst denklemi", "Güç elektroniği ve PWM", "Alan yönelimli motor kontrolü (Clarke–Park dönüşümleri)", "Kalman filtresi ve durum kestirimi", "Isı transferi ve termal yönetim", "Yaşam döngüsü analizi", "Güç sistemleri ve şebeke entegrasyonu"],
  },
  quiz: [
    {
      question: "96 seri grup ve her grupta 46 paralel hücreden oluşan bir paketin nominal gerilimi yaklaşık kaçtır? (hücre 3,7 V)",
      options: ["3,7 V, hücre sayısı gerilimi değiştirmez", "170 V", "355 V", "4.416 V"],
      answer: 2,
      explanation: "Gerilimi yalnızca seri sayısı belirler: 96 × 3,7 ≈ 355 V. Paralel 46 hücre kapasiteyi (amper-saat) 46 katına çıkarır, gerilime dokunmaz. 4.416 toplam hücre sayısıdır.",
    },
    {
      question: "60 kWh'lik bir batarya 11 kW'lık yerleşik şarj cihazıyla tamamen boştan dolu olana kadar yaklaşık ne kadar sürer? (kayıpları yok say)",
      options: ["Yaklaşık 11 dakika", "Yaklaşık 5,5 saat", "Yaklaşık 11 saat", "Yaklaşık 60 saat"],
      answer: 1,
      explanation: "Süre = enerji / güç = 60 kWh / 11 kW ≈ 5,5 saat. kWh depoyu, kW akış hızını ölçer; birimleri bölünce saat kalır. Gerçekte dönüştürücü kayıpları ve şarj eğrisi bunu biraz uzatır.",
    },
    {
      question: "800 volt mimarinin 400 volta göre temel avantajı nedir?",
      options: ["Batarya daha fazla enerji depolar", "Aynı güç yarı akımla taşınır, kablo kayıpları dörtte bire iner", "Motor daha çok tork üretir", "Hücre gerilimi iki katına çıkar"],
      answer: 1,
      explanation: "P = V·I olduğundan gerilim iki katına çıkınca aynı güç için akım yarıya iner; kablodaki ısı kaybı I²R ile akımın karesine bağlı olduğundan dörtte bire düşer. Enerji ve hücre gerilimi değişmez; yalnızca daha fazla hücre seri bağlanır.",
    },
  ],
  next: [
    { href: "elektrokimya.html", title: "Elektrokimya: Galvanik Hücre", why: "Bataryanın gerilimi nereden gelir? İki elektrot arasındaki kimyasal potansiyel farkını deneyle gör." },
    { href: "alternatif-akim.html", title: "Alternatif Akım ve Bobinler", why: "İnverterin motora yolladığı üç fazlı akım ve dönen manyetik alan; AC motorun mantığı burada." },
    { href: "is-enerji.html", title: "İş–Enerji İlkesi", why: "Rejeneratif frenlemenin hesabı: kinetik enerji, iş ve hangi kısmın geri alınabileceği." },
    { href: "otomotiv-muhendisligi.html", title: "Otomotiv Mühendisliği", why: "Aynı aracın öteki yarısı: şasi, süspansiyon, aerodinamik ve içten yanmalı motorla karşılaştırma." },
  ],
  sources: [
    { title: "Nobel Prize · Chemistry 2019 (Goodenough, Whittingham, Yoshino)", url: "https://www.nobelprize.org/prizes/chemistry/2019/summary/", note: "Lityum-iyon pilin icat öyküsü ve üç bilim insanının katkıları, resmi özet (İngilizce)." },
    { title: "OpenStax · University Physics Vol. 2", url: "https://openstax.org/details/books/university-physics-volume-2", note: "Elektrik devreleri, elektromotor kuvvet, indüksiyon ve motorların fiziği; açık ders kitabı (İngilizce)." },
    { title: "Vikipedi · Elektrikli otomobil", url: "https://tr.wikipedia.org/wiki/Elektrikli_otomobil", note: "Tarihçe, batarya türleri ve şarj altyapısı için Türkçe genel bakış." },
    { title: "Wikipedia · Lithium-ion battery", url: "https://en.wikipedia.org/wiki/Lithium-ion_battery", note: "Hücre kimyası, enerji yoğunluğu değerleri ve güvenlik; kaynaklı ayrıntılı madde (İngilizce)." },
  ],
  revision: "Ekim 2026",
};
