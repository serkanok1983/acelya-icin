window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["serbest-dusme"] = {
  slug: "serbest-dusme",
  title: "Serbest Düşme: Tüy, Çekiç ve Hava",
  field: "Fizik",
  level: "Lise",
  minutes: 30,
  tagline:
    "Havasız ortamda tüy ile çekiç yere aynı anda değer; havada ise hızın karesiyle büyüyen bir fren her düşüşü bir limit hızla sınırlar. Aristoteles'ten Ay'daki çekice, yağmurdan paraşüte uzanan bir hikâye.",
  hook: "Bir çekiçle bir tüyü aynı anda bırak: tüy salınarak geride kalır. 2 Ağustos 1971'de Ay'da bir astronot aynı ikiliyi bıraktı ve ikisi toprağa aynı anda değdi. Düşmenin gerçek hâli hangisi ve hava işin içine girince kütle neden birden önem kazanır?",
  bigIdea:
    "Havasız ortamda her cisim kütlesinden bağımsız olarak aynı <em>g</em> ivmesiyle düşer, çünkü ağırlık kütleyle tam orantılıdır; hava ise hızın karesiyle büyüyen bir fren ekler ve hızı, frenin ağırlığa eşitlendiği bir <strong>limit hızla</strong> sınırlar.",
  story: [
    "Aristoteles'e göre ağır cisim, ağırlığıyla orantılı olarak daha hızlı düşerdi. Gündelik deneyim de bunu destekler gibidir: taş düşer, yaprak süzülür. Bu fikir neredeyse iki bin yıl boyunca ders kitabı bilgisi olarak kaldı, ama itirazsız değil. 6. yüzyılda İskenderiyeli düşünür <strong>Ioannes Philoponos</strong>, ağırlıkları çok farklı iki cisim bırakıldığında düşüş sürelerinin ağırlıklar oranında değil, çok az farklı olduğunu yazdı. 1586'da Flaman matematikçi <strong>Simon Stevin</strong>, Jan Cornets de Groot ile birlikte biri ötekinden on kat ağır iki kurşun bilyeyi Delft'teki bir kilise kulesinden otuz ayak (kabaca dokuz-on metre) yükseklikten bıraktıklarını kitabında anlattı: bilyeler yere birlikte varmıştı.",
    "En ünlü hikâye ise Pisa Kulesi'dir: Galileo'nun 1589–1592 yıllarında kuleden farklı ağırlıklar bırakıp Aristoteles'i çürüttüğü <em>anlatılır</em>. Hikâyeyi öğrencisi Vincenzo Viviani yazmıştır; Galileo'nun kendi yazılarında böyle bir gösteri yoktur ve tarihçilerin çoğu onu bir düşünce deneyi ya da efsane sayar. Galileo'nun gerçek kanıtı daha zekicedir. Düşmeyi yavaşlatmak için topları eğik rampalardan yuvarladı, zamanı bir kaptan akan suyu tartarak ölçtü ve eşit zaman aralıklarında alınan yolların <strong>1 : 3 : 5 : 7</strong> diye tek sayılarla büyüdüğünü buldu. 1638'de yayımlanan <em>İki Yeni Bilim</em>'de bir de mantık tuzağı kurdu: ağır taş gerçekten daha hızlı düşseydi, ona bağlanan hafif taş onu frenlemeli, ama ikisi birlikte daha ağır olduğu için daha hızlı düşmeliydi. Çelişki, ancak hepsi aynı hızla düşerse ortadan kalkar.",
    "Newton bu sonucu açıkladı: çekim kuvveti kütleyle orantılıdır, ivmelenmeye direnç de; ikisi sadeleşir. İçi altın, gümüş, kurşun, cam, kum, tuz, tahta, su ve buğdayla doldurulmuş sarkaçlarla bu orantının bininde bir hassasiyetle tuttuğunu da sınadı. Tüyü geride bırakan şey yerçekimi değil, havaydı. Kesin gösteri 2 Ağustos 1971'de geldi: Apollo 15 komutanı <strong>David Scott</strong>, son Ay yürüyüşünün sonunda televizyon kameraları önünde 1.32 kg'lık alüminyum bir jeoloji çekici ile 0.03 kg'lık bir şahin tüyünü yaklaşık 1.6 m yükseklikten birlikte bıraktı. Havasız Ay'da ikisi aynı ivmeyle düşüp toprağa aynı anda değdi. Ay'ın zayıf çekiminde bu 1.6 metre yaklaşık 1.4 saniye sürer; Dünya'da, havasız bir ortamda olsa 0.57 saniye sürerdi.",
  ],
  core: [
    {
      heading: "Kütle neden sadeleşir?",
      body: "Dünya 10 kg'lık bir taşı 1 kg'lık bir taştan on kat güçlü çeker. Ama Newton'un ikinci yasasına göre ivme, kuvvetin kütleye bölümüdür ve on kat kütle on kat zor ivmelenir. İki etki birbirini tam götürür. Bu sıradan bir tesadüf değildir: çekimi belirleyen <strong>çekim kütlesi</strong> ile ivmelenmeye direnen <strong>eylemsizlik kütlesi</strong> kavram olarak farklıdır ve eşit olmaları bir deney sonucudur. Bu eşitliğe <strong>eşdeğerlik ilkesi</strong> denir.",
      formula: "a = F/m = m·g/m = g",
      formulaNote:
        "Sayfanın kodu da tam bunu hesaplar: ivme = (m·g − hava direnci)/m. Katsayı 0 iken m sadeleşir ve ivme tam g olur.",
    },
    {
      heading: "Zamanın karesiyle büyüyen yol",
      body: "Havasız düşüşte hız her saniye g kadar artar: 9.8, 19.6, 29.4 m/s… Yol ise zamanın karesiyle büyür. İlk saniyede 4.9 m, ikincide 14.7 m, üçüncüde 24.5 m, dördüncüde 34.3 m düşülür; oranlar Galileo'nun bulduğu 1 : 3 : 5 : 7'dir. Toplamlar 4.9, 19.6, 44.1, 78.4 m, yani 1, 4, 9, 16 ile orantılı: 1'den başlayan ardışık tek sayıların toplamı her zaman bir tam karedir.",
      formula: "v = g·t,  h = ½·g·t²,  v = √(2gh)",
      formulaNote:
        "100 m için t = √(200/9.8) ≈ 4.52 s ve v ≈ 44.3 m/s, yani saatte yaklaşık 159 km.",
    },
    {
      heading: "Hava: hızın karesiyle büyüyen fren",
      body: "Düşen cisim önündeki havayı durmadan itip yana savurmak zorundadır; hava da onu geri iter. Gündelik hızlarda bu direnç yaklaşık olarak hızın karesiyle büyür: hız iki katına çıkınca fren dört katına çıkar. Katsayı k üç şeyi birleştirir: havanın yoğunluğu ρ (deniz seviyesinde yaklaşık 1.2 kg/m³), cismin kesit alanı A ve biçimine bağlı, birimsiz <strong>sürüklenme katsayısı</strong> C<sub>d</sub>. Sayfadaki <em>Hava Direnci Katsayısı</em> kaydırıcısı bu k'dır. Ölçek vermek için: yüzüstü düşen 80 kg'lık bir paraşütçü yaklaşık 55 m/s'de sabitlenir; bu, k ≈ 80·9.8/55² ≈ 0.26 kg/m demektir, kaydırıcının aralığının kabaca ortası.",
      formula: "F<sub>hava</sub> = k·v²,  k = ½·ρ·C<sub>d</sub>·A",
      formulaNote:
        "k'nin birimi kg/m'dir; böylece k·v² newton çıkar. Kaydırıcı 0–0.5 kg/m aralığını tarar.",
    },
    {
      heading: "Limit hız: frenin ağırlığı yakaladığı an",
      body: "Cisim hızlandıkça fren büyür, net kuvvet ve ivme küçülür. İvme g·(1 − v²/v<sub>t</sub>²) biçimindedir: limit hızın yarısında ivme hâlâ g'nin dörtte üçüdür, yüzde doksanında ise yalnızca yaklaşık beşte biri (0.19·g). Hız limit değeri hiç aşmadan, giderek yavaşlayarak yaklaşır; hız–zaman grafiği yataylaşır. Limit hızda cisim durmaz; iki eşit ve zıt kuvvet altında sabit hızla düşmeye devam eder. Dikkat çekici bir ayrıntı: hareket denkleminde m ve k yalnızca k/m oranı olarak görünür; on kat ağır ama on kat dirençli bir cisim aynı biçimde düşer.",
      formula: "v<sub>t</sub> = √(m·g/k)",
      formulaNote:
        "Varsayılan ayarlarda (10 kg, 0.1 kg/m, 9.8 m/s²) limit hız √980 ≈ 31.3 m/s'dir. Kütle dört katına çıkarsa limit hız iki katına çıkar.",
    },
    {
      heading: "Boyut her şeyi değiştirir",
      body: "Aynı malzemeden, aynı biçimde ama boyu L kat büyük bir cisim düşün. Kütlesi hacimle, yani L³ ile büyür; havanın freni ise kesit alanıyla, L² ile. Limit hız bu yüzden √L ile büyür: küçük şeyler yavaş düşer. Biyolog J. B. S. Haldane 1926'da yazdığı ünlü <em>On Being the Right Size</em> (Doğru Boyda Olmak Üzerine) denemesinde bunu bir maden kuyusuyla anlatır: yaklaşık 900 metrelik bir kuyuya düşen fare, zemin yeterince yumuşaksa hafif bir sarsıntı geçirip yürüyüp gider; sıçan ölür, insanın kemikleri kırılır, at ise yere çarpıp dağılır. Çok küçük cisimlerde (toz, sis damlası) direnç artık hızla doğru orantılıdır ve limit hız daha da hızlı küçülür: 10 mikrometre çaplı bir sis damlası saniyede yalnızca 3 milimetre kadar çöker. Sis bu yüzden havada asılı duruyormuş gibi görünür.",
      formula: "v<sub>t</sub> ∝ √(m/k) ∝ √(L³/L²) = √L",
      formulaNote:
        "Aynı biçim ve yoğunlukta, boyu 100 kat küçük bir cismin limit hızı yaklaşık 10 kat küçüktür.",
    },
  ],
  lab: {
    intro:
      "Kırmızı top 100 m yükseklikten durgun hâlde bırakılır. Üç kaydırıcı var: <strong>Kütle (kg)</strong> 1–100 (1'er adım), <strong>Hava Direnci Katsayısı</strong> 0–0.5 (0.01'er adım; yukarıdaki k, birimi kg/m) ve <strong>Yerçekimi (m/s²)</strong> 1–20 (0.1'er adım). Sayfa açılınca 10 kg, 0.1 ve 9.8'dedirler. Kaydırıcılar seçili değeri yazmaz; bu yüzden kaydırıcıya tıkla, <kbd>Home</kbd> ve <kbd>End</kbd> ile uçlara git, ok tuşlarıyla tam bir adım ilerle.<br>Her deneyde önce ayarı yap, sonra <strong>Sıfırla</strong>'ya ve <em>bir kez</em> <strong>Başlat</strong>'a bas (her ek basış ikinci bir döngü açıp akışı hızlandırır). Sıfırla kutuları hemen güncellemez; yeni sayılar Başlat'tan sonra gelir. Kod her ekran karesinde 0.1 s'lik bir adım atar, yani 60 Hz'lik bir ekranda düşüş gerçek zamandan altı kat hızlı akar; <strong>Zaman</strong> kutusu simülasyon saatini gösterir. Okunacak sayılar yere varıştaki <strong>Hız</strong> ve <strong>Zaman</strong>dır. Hız–zaman grafiği yalnızca son 50 noktayı (5 s) tutar.<br><strong>Bir uyarı:</strong> top düşerken katsayıyı birden büyütme. Kod freni her zaman yukarı yönde uygular ve 0.1 s'lik adım bu kadar ani bir değişim için kabadır. Örneğin 1 kg'lık top katsayı 0'dayken düşmeye başlasın; 3. saniye civarında katsayıyı <kbd>End</kbd> ile 0.5'e çekersen top yukarı fırlayıp ekrandan kaçar ve kutulardaki sayılar anlamsızlaşır. Bu fizik değil, sayısal bir hatadır.",
    experiments: [
      {
        title: "Bir kilo mu, yüz kilo mu?",
        predict:
          "Hava direnci kapalıyken 1 kg'lık ve 100 kg'lık top 100 m'den kaç saniyede, hangi hızla yere varır? Formül t = √(2h/g) ≈ 4.52 s ve v ≈ 44.3 m/s diyor. Sayfa aynısını mı gösterecek?",
        do: "Hava Direnci Katsayısı'na tıklayıp <kbd>Home</kbd> ile 0'a indir. Kütle'de <kbd>Home</kbd> (1 kg) seç; Sıfırla ve Başlat, yere varışta Hız ve Zaman'ı yaz. Sonra Kütle'de <kbd>End</kbd> (100 kg) ile tekrarla.",
        observe:
          "İki düşüş birebir aynıdır: Zaman 4.50 s, Hız 44.10 m/s. Son karede Yükseklik bir an −1.43 m gösterir, ardından 0.00'da durur. Grafik, eğimi 9.8 m/s² olan düz bir çizgidir.",
        explain:
          "Kodda ivme (m·g − 0)/m = g olur; kütle sadeleşir. Formülle aradaki küçük fark yöntemden gelir: kod konumu her 0.1 s'lik adımda biraz önde hesaplar ve yere varışı ancak adım sonunda fark eder. Bu yüzden 4.52 s yerine 4.50 s, 44.27 yerine 44.10 m/s görürsün.",
      },
      {
        title: "Hava açılınca kütle sahneye çıkar",
        predict:
          "Katsayı 0.1 iken 1 kg, 10 kg ve 100 kg için limit hız √(mg/k) kaç olur? Hangisi 100 metrede limit hıza oturur, hangisi yaklaşamaz bile?",
        do: "Katsayıda <kbd>Home</kbd>, sonra 10 kez <kbd>→</kbd> (0.10). Kütleyi sırayla 10 kg (<kbd>Home</kbd> ve 9 kez <kbd>→</kbd>), 1 kg (<kbd>Home</kbd>) ve 100 kg (<kbd>End</kbd>) yap; her seferinde Sıfırla, Başlat ve son değerleri yaz.",
        observe:
          "10 kg: 5.30 s ve 29.25 m/s; eğri yataylaşarak 31.3'e yaklaşır. 1 kg: 10.80 s ve 9.90 m/s; grafik dümdüzdür, çünkü yalnızca 6.0–10.8 s aralığı görünür ve top 3 s civarında zaten 9.87 m/s'ye ulaşmıştır. 100 kg: 4.60 s ve 42.28 m/s, havasız düşüşe çok yakın.",
        explain:
          "İvme g − (k/m)·v²'dir: aynı fren hafif cismi çok daha fazla yavaşlatır. Limit hızlar 9.9, 31.3 ve 99 m/s'dir. 1 kg'lık top ilk saniyelerde limit hıza kilitlenir; 100 kg'lık topun limiti o kadar yüksektir ki 100 metre ona yaklaşmaya yetmez.",
      },
      {
        title: "Aynı oran, aynı düşüş",
        predict:
          "1 kg ve katsayı 0.01 ile 10 kg ve katsayı 0.1 aynı düşüşü verir mi? Biri on kat ağır, öteki on kat dirençli.",
        do: "Yerçekimi 9.8'de kalsın. Kütle'de <kbd>Home</kbd> (1 kg), katsayıda <kbd>Home</kbd> ve bir kez <kbd>→</kbd> (0.01). Sıfırla, Başlat; sonucu önceki deneydeki 10 kg / 0.1 sonucuyla karşılaştır.",
        observe:
          "Sayılar birebir aynıdır: 5.30 s ve 29.25 m/s. İki grafik üst üste biner.",
        explain:
          "Denklemde m ve k yalnızca k/m oranıyla yer alır. m/k = 100 m bir uzunluktur: cisim bu kadar düştüğünde hızı limit hızın √(1 − e<sup>−2</sup>) ≈ %93'üne ulaşır. Belirleyici olan ağırlığın kendisi değil, ağırlığın frene oranıdır; küçük ve yoğun cisim iri ve hafif olanı geçer.",
      },
      {
        title: "Ay'da 100 metre",
        predict:
          "Ay'da (g ≈ 1.6 m/s², hava yok) 100 m'lik düşüş kaç saniye sürer, Dünya'dakinin kaç katı? İpucu: √(9.8/1.6).",
        do: "Katsayıda <kbd>Home</kbd> (0). Yerçekimi'ne tıkla, <kbd>Home</kbd> (1.0) ve 6 kez <kbd>→</kbd> (1.6). Sıfırla, Başlat. Ardından Yerçekimi'nde <kbd>End</kbd> ile 20 m/s²'yi dene.",
        observe:
          "Ay: 11.20 s ve 17.92 m/s (formül 11.18 s, 17.89 m/s). 20 m/s²: 3.20 s ve 64.00 m/s (formül 3.16 s, 63.25 m/s); Yükseklik bir an −5.60 m'yi gösterir. Ay'da grafik yalnızca son 5 s'yi tutar ama yine eğimi 1.6 olan düz bir çizgidir.",
        explain:
          "Süre 1/√g ile ölçeklenir: 11.20/4.50 ≈ 2.5 ≈ √(9.8/1.6). Çarpma hızı √g ile büyür. g büyüdükçe top her 0.1 s'lik adımda daha çok yol alır; sayısal hata da büyür, top yerin daha derininde yakalanır.",
      },
    ],
  },
  wow: [
    {
      title: "Hava olmasaydı yağmur yaralardı",
      body: "Bir kilometre yükseklikteki buluttan havasız bir ortamda düşen damla yere √(2·9.8·1000) ≈ 140 m/s ile, yani saatte yaklaşık 500 km hızla çarpardı. Gerçekte en iri yağmur damlaları bile saniyede 9 metre civarındaki limit hızı aşmaz. Hız yaklaşık 15 kat küçük olduğu için çarpma enerjisi (140/9)² ≈ 240 kat küçüktür. Yağmurun bizi yaralamak yerine yalnızca ıslatmasını sağlayan, yerçekimiyle hava direnci arasındaki bu dengedir.",
    },
    {
      title: "Ses hızını aşan bir insan",
      body: "14 Ekim 2012'de Felix Baumgartner yaklaşık 39 km yükseklikteki bir balon kapsülünden atladı. Paraşütü sırtında kapalı dururken, yalnızca serbest düşüşle saatte 1357.6 km'ye (Mach 1.25) ulaştı ve ses hızını hiçbir motor ya da araç olmadan aşan ilk insan oldu. Sır havanın inceliğidir: k havanın yoğunluğuyla orantılıdır, limit hız ise 1/√ρ ile büyür. Yere yakın havada bir paraşütçü 55 m/s civarında sabitlenir. Baumgartner yoğun katmanlara girdikçe fren arttı ve yavaşladı; paraşütünü ancak dört dakikayı aşkın serbest düşüşten sonra açtı.",
    },
    {
      title: "Katrilyonda bir hassasiyetle aynı",
      body: "Fransız uzay ajansı CNES'in MICROSCOPE uydusu 2016–2018 arasında yörüngede platin ve titanyum alaşımından test kütlelerini birlikte 'düşürdü'; çünkü yörünge de kesintisiz bir serbest düşmedir. 2022'de yayımlanan son sonuçlar, iki malzemenin ivmelerinin yaklaşık 10<sup>−15</sup> düzeyinde, yani katrilyonda bir hassasiyetle aynı olduğunu gösterdi. Galileo'nun rampası, Newton'un sarkaçları ve Scott'ın tüyü aynı sorunun giderek keskinleşen cevaplarıydı.",
    },
  ],
  worked: {
    title: "Sayfanın beynini elle çalıştırmak",
    prompt:
      "Sayfa açıldığındaki ayarlarla (m = 10 kg, k = 0.1 kg/m, g = 9.8 m/s², Δt = 0.1 s, h = 100 m) kodun ilk üç adımını elle hesapla. Sonra limit hızı bul ve yere varış hızını tahmin et.",
    steps: [
      "Adım 1 (t: 0 → 0.1 s): v = 0 olduğu için F<sub>hava</sub> = 0. İvme a = (10·9.8 − 0)/10 = 9.8 m/s². Kod önce hızı günceller: v = 0 + 9.8·0.1 = 0.98 m/s; sonra yeni hızla konumu: h = 100 − 0.98·0.1 = 99.902 m.",
      "Adım 2: F<sub>hava</sub> = 0.1·0.98² ≈ 0.096 N. a = (98 − 0.096)/10 ≈ 9.790 m/s². v ≈ 0.98 + 0.979 = 1.959 m/s; h ≈ 99.902 − 0.196 = 99.706 m.",
      "Adım 3: F<sub>hava</sub> = 0.1·1.959² ≈ 0.384 N. a ≈ 9.762 m/s². v ≈ 2.935 m/s; h ≈ 99.413 m. Fren her adımda büyüyor, ivme her adımda küçülüyor.",
      "Limit hız: k·v<sub>t</sub>² = m·g ⇒ v<sub>t</sub> = √(10·9.8/0.1) = √980 ≈ 31.3 m/s. Bu hızda fren 0.1·980 = 98 N'dur, yani tam ağırlık kadar.",
      "Yere varış: tam çözüm v = v<sub>t</sub>·√(1 − e<sup>−2gh/v<sub>t</sub>²</sup>) verir. Burada 2gh/v<sub>t</sub>² = 1960/980 = 2, dolayısıyla v ≈ 31.3·√(1 − 0.135) ≈ 29.1 m/s. Sayfa 53 adım sonra 5.30 s ve 29.25 m/s gösterir; fark 0.1 s'lik adımdan gelir.",
    ],
    result:
      "Hava, 100 metrelik düşüşte çarpma hızını 44.3 m/s'den yaklaşık 29.1 m/s'ye indirir. Başlangıçtaki 9800 J'lük potansiyel enerjinin yalnızca ½·10·29.1² ≈ 4240 J'ü kinetik enerjiye dönüşür; kalan yaklaşık %57'si havayı itmeye harcanır.",
  },
  misconceptions: [
    {
      myth: "Havasız ortamda bile ağır cisim hafif olandan önce yere varır.",
      truth:
        "Ağır cisim daha çok çekilir ama o kadar da zor ivmelenir; ivme ikisi için de g'dir. Ay'daki çekiç–tüy gösterisi ve sayfada katsayı 0'dayken 1 kg ile 100 kg'ın aynı 4.50 s'de yere varması bunu gösterir.",
    },
    {
      myth: "Limit hıza ulaşan cisme artık hiçbir kuvvet etki etmez.",
      truth:
        "İki kuvvet hâlâ oradadır ve ikisi de büyüktür: ağırlık aşağı, hava direnci yukarı. Eşit oldukları için net kuvvet, dolayısıyla ivme sıfırdır. Limit hızdaki 80 kg'lık paraşütçüyü hava 784 N'luk bir kuvvetle yukarı iter.",
    },
    {
      myth: "Paraşüt açılınca paraşütçü yukarı doğru fırlar.",
      truth:
        "Videolarda öyle görünür, çünkü kamerayı taşıyan paraşütçü (kameraman) paraşütünü henüz açmamıştır ve hâlâ hızla düşmektedir; görüntü göreli harekettir. Paraşütçü aslında aşağı inmeye devam eder; yalnızca ivmesi kısa bir süre yukarı yönlüdür, yani yavaşlar ve çok daha düşük yeni bir limit hıza oturur.",
    },
    {
      myth: "Havada ağır olan her zaman önce düşer.",
      truth:
        "Belirleyici olan kütle değil, kütlenin dirence oranı m/k'dir; k biçime ve kesit alanına bağlıdır. Sayfada 1 kg / 0.01 ile 10 kg / 0.1 birebir aynı düşer. Küçük, yoğun bir taş, kendisinden ağır ama geniş bir kartonu geçebilir.",
    },
  ],
  glossary: [
    {
      term: "Serbest düşme",
      definition:
        "Bir cismin yalnızca yerçekiminin etkisiyle yaptığı hareket; hava direnci devreye girince düşüş artık tam anlamıyla serbest değildir.",
    },
    {
      term: "Yerçekimi ivmesi (g)",
      definition:
        "Serbest düşen cismin hızının saniyede artış miktarı; Dünya yüzeyinde enleme ve yüksekliğe göre yaklaşık 9.78–9.83 m/s².",
    },
    {
      term: "Sürüklenme kuvveti",
      definition:
        "Akışkanın içinde hareket eden cisme harekete zıt yönde etki eden direnç; gündelik hızlarda yaklaşık k·v².",
    },
    {
      term: "Sürüklenme katsayısı (C<sub>d</sub>)",
      definition:
        "Cismin biçiminin havayı ne kadar zor yardığını gösteren birimsiz sayı; k = ½·ρ·C<sub>d</sub>·A içinde yer alır.",
    },
    {
      term: "Limit hız (v<sub>t</sub>)",
      definition:
        "Hava direncinin ağırlığa eşitlendiği, ivmenin sıfıra indiği sabit düşüş hızı; k·v² direnci için √(mg/k).",
    },
    {
      term: "Eşdeğerlik ilkesi",
      definition:
        "Çekim kütlesi ile eylemsizlik kütlesinin eşit olması; her cismin aynı yerde aynı ivmeyle düşmesinin temeli.",
    },
    {
      term: "Zaman adımı (Δt)",
      definition:
        "Bilgisayar simülasyonunda hesabın bir seferde ilerlediği süre; bu sayfada 0.1 s.",
    },
    {
      term: "Yarı örtük Euler yöntemi",
      definition:
        "Önce ivmeyle hızı, sonra yeni hızla konumu güncelleyen adım adım çözüm yöntemi; sayfanın kullandığı yöntem.",
    },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede serbest düşme iki formüldür; üniversitede bir <strong>diferansiyel denklem</strong>: m·dv/dt = m·g − k·v². Değişkenlerine ayrılarak çözülür ve hız v(t) = v<sub>t</sub>·tanh(g·t/v<sub>t</sub>) çıkar: t = v<sub>t</sub>/g anında hız limitin %76'sına, iki katı sürede %96'sına ulaşır. Çok küçük ya da çok yavaş cisimlerde direnç hızın karesiyle değil hızın kendisiyle orantılıdır (Stokes yasası); hangisinin geçerli olduğuna akışkanlar mekaniğinde <em>Reynolds sayısı</em> karar verir. Paraşüt, araba ve uçak tasarımı bu ayrımın üzerine kuruludur.",
      "Sayfanın kendisi de bir köprüdür: kod, denklemi 0.1 s'lik adımlarla çözen küçük bir <strong>sayısal integratördür</strong>. Adımı yarıya indirmek hatayı da kabaca yarıya indirir; mühendisler bu yüzden Runge–Kutta gibi daha akıllı yöntemler kullanır. Kuramsal tarafta ise eşdeğerlik ilkesi Einstein'ın, sonradan 'hayatının en mutlu düşüncesi' dediği 1907 fikrine götürür: serbest düşen bir insan kendi ağırlığını hissetmez. Bu fikir genel göreliliğe dönüştü. Uluslararası Uzay İstasyonu'ndaki astronotlar yerçekimsiz değildir; orada çekim yüzeydekinin yaklaşık %90'ıdır. Sürekli serbest düşmede oldukları için süzülürler.",
    ],
    topics: [
      "Diferansiyel denklemler",
      "Sayısal yöntemler (Euler, Runge–Kutta)",
      "Akışkanlar mekaniği ve Reynolds sayısı",
      "Boyut analizi ve ölçekleme",
      "Eşdeğerlik ilkesi",
      "Genel görelilik",
    ],
  },
  quiz: [
    {
      question:
        "Hava direnci yokken durgun bırakılan bir cisim ilk saniyede 4.9 m düşüyor. Üçüncü saniyede (t = 2 s ile t = 3 s arasında) kaç metre düşer?",
      options: ["4.9 m", "14.7 m", "24.5 m", "44.1 m"],
      answer: 2,
      explanation:
        "Eşit zaman aralıklarında alınan yollar 1 : 3 : 5 oranındadır; üçüncü saniye 5 × 4.9 = 24.5 m. Kontrol: ½·9.8·(3² − 2²) = 24.5 m. 44.1 m üç saniyede alınan toplam yoldur.",
    },
    {
      question:
        "Biçimleri ve boyları aynı (k aynı) iki toptan biri ötekinin 4 katı kütleli. Havada düşerken ağır topun limit hızı hafif olanınkinin kaç katıdır?",
      options: ["Aynı", "2 katı", "4 katı", "16 katı"],
      answer: 1,
      explanation:
        "v<sub>t</sub> = √(mg/k) olduğundan kütle karekök içindedir: √4 = 2. Havasız ortamda ise ikisi tamamen aynı düşerdi; farkı yaratan, aynı frenin hafif cismi daha çok yavaşlatmasıdır.",
    },
    {
      question:
        "Sayfada 5 kg ve katsayı 0.25 ile bir düşüş yapıyorsun (g = 9.8 m/s²). Hangi ayar 100 metreyi birebir aynı sürede ve aynı hızla tamamlar?",
      options: [
        "10 kg, katsayı 0.25",
        "1 kg, katsayı 0.05",
        "5 kg, katsayı 0.05",
        "25 kg, katsayı 0.05",
      ],
      answer: 1,
      explanation:
        "İvme g − (k/m)·v² olduğundan yalnızca m/k oranı önemlidir: 5/0.25 = 1/0.05 = 20 m. İkisinin de limit hızı √(20·9.8) = 14 m/s'dir ve sayfa ikisinde de 8.10 s ile 14.00 m/s gösterir. Daha ağır olmak tek başına yetmez; fren de aynı oranda büyürse düşüş değişmez.",
    },
  ],
  next: [
    {
      href: "tek-sayi-toplam3.html",
      title: "Tek Sayıların Toplamı",
      why: "Galileo'nun 1 : 3 : 5 : 7 kuralının sayı tarafı: bir sınır gir, ardışık tek sayıların toplamlarının tabloda 1, 4, 9, 16… diye tam karelere dizildiğini gör.",
    },
    {
      href: "atislar.html",
      title: "Eğik Atış",
      why: "Topu bir açıyla fırlat: düşeyde aynı serbest düşme, yatayda sabit hız, sonuç bir parabol. Hava direncini açıp kapat; menzilin ve en iyi açının nasıl değiştiğini gör.",
    },
    {
      href: "diferansiyel-denklemler.html",
      title: "Diferansiyel Denklemler",
      why: "Bu sayfadaki 0.1 s'lik adımların adı Euler yöntemidir; orada adım küçülünce hatanın neden azaldığını, denge ve kararlılığı gör. Limit hız da bir kararlı dengedir.",
    },
    {
      href: "ucak-muhendisligi-ve-aerodinamik.html",
      title: "Uçak Mühendisliği ve Aerodinamik",
      why: "Aynı ½ρv² kalıbı kanatta kaldırmayı verir: L = ½ρv²SC<sub>L</sub>. Hücum açısı düğmeleriyle kaldırmanın büyüyüşünü ve 15° civarında akış ayrılınca gelen stall'u izle.",
    },
  ],
  sources: [
    {
      title: "OpenStax · University Physics Vol. 1, 3.5 Free Fall",
      url: "https://openstax.org/books/university-physics-volume-1/pages/3-5-free-fall",
      note: "Serbest düşme denklemleri ve çözümlü örnekler (İngilizce, açık ders kitabı).",
    },
    {
      title:
        "OpenStax · University Physics Vol. 1, 6.4 Drag Force and Terminal Speed",
      url: "https://openstax.org/books/university-physics-volume-1/pages/6-4-drag-force-and-terminal-speed",
      note: "Sürüklenme kuvveti, ½ρC<sub>d</sub>Av² ve limit hız; paraşütçü örnekleri.",
    },
    {
      title: "NASA Science · The Apollo 15 Hammer-Feather Drop",
      url: "https://science.nasa.gov/resource/the-apollo-15-hammer-feather-drop/",
      note: "David Scott'ın Ay'daki gösterisinin videosu ve kütle, yükseklik bilgileriyle resmî açıklama.",
    },
    {
      title: "Wikipedia · Galileo's Leaning Tower of Pisa experiment",
      url: "https://en.wikipedia.org/wiki/Galileo%27s_Leaning_Tower_of_Pisa_experiment",
      note: "Pisa hikâyesinin kaynağı Viviani, Stevin'in 1586 Delft deneyi ve Philoponos: efsane ile kanıtın ayrımı.",
    },
  ],
  revision: "Ekim 2026",
};
