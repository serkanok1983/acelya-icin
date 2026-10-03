window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["plc-hidrolik-pnomatik-cnc-cadcam"] = {
  slug: "plc-hidrolik-pnomatik-cnc-cadcam",
  title: "Otomasyon: Beyin, Kas ve Dijital Köprü",
  field: "Mühendislik",
  level: "Lise",
  minutes: 35,
  tagline:
    "Bir fabrika üç şeyden kuruludur: karar veren bir beyin (PLC), itip çeken kaslar (hidrolik, pnömatik, dişli) ve çizimi parçaya çeviren dijital bir zincir (CAD, CAM, G-kodu). Hepsi birkaç basit yasaya dayanır.",
  hook:
    "Ekskavatör operatörü parmak ucuyla bir kolu iter; 20 tonluk kepçe toprağı kaldırır. Aynı makinenin elektronik beyni ise her birkaç milisaniyede bir aynı soruyu sorar: girişler ne, çıkışlar ne olmalı? Ve bir fabrikada, 1960'larda, otomobil modeli her değiştiğinde yüzlerce röleyi haftalarca yeniden kablolayan elektrikçiler vardı. Bu üç sahneyi birbirine bağlayan şey, bu sayfanın konusu.",
  bigIdea:
    "Endüstriyel otomasyon, <strong>kararı</strong> (PLC'nin tarama döngüsü), <strong>kuvveti</strong> (Pascal ilkesi: F = P·A) ve <strong>geometriyi</strong> (CAD modelinden G-koduna) ayrı katmanlarda çözer; her katman kendi fizik yasasına ve kendi diline sahiptir.",
  story: [
    "1653'te Blaise Pascal, kapalı bir sıvıya uygulanan basıncın her yöne aynen iletildiğini yazdı; bu, bir gün yarım ton ağırlığındaki kepçeleri kaldıracak fikrin kâğıttaki ilk hâliydi. Fikri makineye çeviren adam 1795'te İngiliz çilingir Joseph Bramah oldu: iki silindirli hidrolik presin patentini aldı. Küçük pistondaki mütevazı kuvvet, alan oranı kadar büyüyerek büyük pistona geçiyordu. Presin asıl sorunu sızdırmazlıktı; Bramah'nın atölyesinde çalışan Henry Maudslay'ın geliştirdiği deri conta, basınç arttıkça silindir duvarına daha sıkı yapışarak bu sorunu çözdü. On dokuzuncu yüzyılın sonunda Londra'da sokakların altına döşenen basınçlı su boruları, vinçleri, asansörleri ve 1894'te açılan Tower Bridge'in kalkan kanatlarını çalıştırıyordu. Bugünkü hidrolik yağ ve 350 bar, Pascal'ın suyunun doğrudan torunudur.",
    "Fabrikanın beyni çok daha gençtir. 1960'ların sonunda otomobil fabrikalarının montaj hatları, dolaplar dolusu <strong>röle</strong> ile kontrol ediliyordu: elektromıknatısla açılıp kapanan mekanik anahtarlar. Her yeni modelde panolar söküp yeniden kablolanıyordu. 1968'de General Motors'un Hydramatic bölümü, röle panosunun yerine geçecek programlanabilir bir 'standart makine kontrolörü' için şartname yayımladı. Bedford Associates'ten Dick Morley'nin ekibi 1969'da Modicon 084'ü teslim etti: toza, ısıya ve elektriksel gürültüye dayanıklı, röle mantığını yazılımla taklit eden bir bilgisayar. Can alıcı karar programlama diliydi: mühendisler, fabrika elektrikçilerinin zaten okuduğu röle şemasına benzeyen <strong>merdiven (ladder) diyagramını</strong> seçti. Elektrikçi yeni bir dil öğrenmedi; kabloyu çizgiye, röleyi sembole çevirdi. Sayfadaki iki kontak ve bir bobin, tam o 1969 fikrinin özüdür.",
    "Tezgâhların bilgisayarla buluşması daha erken başladı. 1949'da Michigan'da helikopter pervanesi parçaları üreten John T. Parsons, kanat şablonlarının koordinatlarını delikli kart makineleriyle hesaplıyordu; Hava Kuvvetleri'nden aldığı sözleşmeyle bu sayıları doğrudan bir frezeye vermek istedi. İş MIT'nin Servomekanizma Laboratuvarı'na geçti ve 1952'de, delikli şeritten okuduğu komutlarla üç eksende hareket eden bir Cincinnati Hydrotel frezesi gösterildi: <strong>sayısal kontrolün</strong> (NC) doğuşu. Bir sonraki sorun, her parça için binlerce koordinatı elle yazmaktı; MIT'de Douglas Ross'un ekibinin 1950'lerin sonunda geliştirdiği APT dili bunu bilgisayara yaptırdı. Komutların bugünkü kısa hâli, 'G01 X50 F200' gibi satırlar, 1960'larda ABD elektronik sanayii birliğinin RS-274 standardında toplandı; bu yüzden G-kodu hâlâ delikli şerit çağının tutumlu üslubunu taşır.",
    "Çizimin kendisi de bilgisayara en son 1963'te girdi: Ivan Sutherland'ın MIT'deki doktora tezi Sketchpad, ışıklı kalemle ekrana çizilen şekillere 'bu iki çizgi dik kalsın' gibi kısıtlar koyabiliyordu. Aynı yıllarda Citroën'de Paul de Casteljau ve Renault'da Pierre Bézier, otomobil kaportasının kıvrımlarını birkaç kontrol noktasıyla tarif eden eğrileri geliştirdi; bugün her CAD yüzeyinin ve her yazı tipinin altında o eğriler yatar. 1987'de Pro/ENGINEER, ölçüleri sonradan değiştirilebilen <strong>parametrik</strong> modellemeyi yaygınlaştırdı. Böylece zincir tamamlandı: CAD modeli, CAM yazılımında takım yoluna, son işlemcide (post-processor) tezgâha özel G-koduna, tezgâhta da metal talaşına dönüşür. PLC o tezgâhın kapısını, hidrolik mengenesini ve pnömatik takım değiştiricisini yönetir.",
  ],
  core: [
    {
      heading: "Pascal ilkesi: kuvveti çarpar, enerjiyi değil",
      body:
        "Kapalı bir sıvıya uygulanan basınç her noktaya aynen iletilir. Basınç kuvvetin alana oranı olduğundan, aynı basınç büyük pistonda büyük kuvvete dönüşür: alan 50 kat büyükse kuvvet 50 kat büyür. Bedava bir şey yoktur; büyük piston 1 cm yükselirken küçük pistonu 50 cm itmen gerekir, çünkü yer değiştiren sıvı hacmi aynıdır. Kuvvet × yol, yani iş, iki tarafta eşittir. Sayfadaki 'Hidrolik Silindir' kartında aynı yasanın bir sonucu daha var: piston kolu bir taraftaki alanı küçülttüğü için çift etkili silindir ileri iterken geri çektiğinden daha güçlüdür.",
      formula: "F = P·A,   F<sub>2</sub>/F<sub>1</sub> = A<sub>2</sub>/A<sub>1</sub>",
      formulaNote: "1 bar = 10⁵ Pa = 10 N/cm². 200 bar basınç her santimetrekareye 2 kN, yani 200 kg'lık bir yük bindirir.",
    },
    {
      heading: "Hidrolik mi pnömatik mi? Sıkışabilirlik karar verir",
      body:
        "İkisi de F = P·A ile çalışır; farkı akışkan yaratır. Hidrolik yağ pratikte sıkışmaz: 100 bar basınçta hacmi yalnızca binde birkaç küçülür. Bu yüzden hidrolik silindir hem 350 bar gibi devasa basınç taşır hem de yükün altında 'sert' durur; ekskavatör kepçesi havada titremez. Hava ise bir yaydır: pnömatik silindir hızlı ve temizdir, ama yük değişince esner ve ara konumda hassas durmak için ek düzenek ister. Sayfanın pnömatik bölümündeki 6–10 bar, hidrolik kartındaki 350 bar ile karşılaştırıldığında aynı çaptaki silindirlerin kuvveti arasında otuz kattan fazla fark demektir. Pnömatiğin kazandığı yerler hız, hijyen ve kıvılcımsızlıktır; gıda ve ilaç hatları bu yüzden havayla çalışır.",
      formula: "50 mm çap: A ≈ 19.6 cm² → 6 bar'da ≈ 1.2 kN, 200 bar'da ≈ 39 kN",
      formulaNote: "1.2 kN yaklaşık 120 kg, 39 kN yaklaşık 4 ton taşır. Alan aynı, yalnızca basınç farklı.",
    },
    {
      heading: "PLC tarama döngüsü ve merdiven mantığı",
      body:
        "PLC, programı bir bilgisayar gibi 'çalıştırmaz'; onu sonsuz bir döngüde tekrar tekrar <strong>tarar</strong>: önce bütün girişleri okuyup belleğe kopyalar, sonra merdiven basamaklarını yukarıdan aşağıya değerlendirir, en sonda çıkışları topluca günceller. Bir tur genellikle birkaç milisaniye sürer. Merdivenin iki dikey rayı güç hattıdır; her basamak soldan sağa 'akım geçer mi?' sorusudur. <strong>NO kontak</strong> (normalde açık) girişi 1 olunca geçirir, <strong>NC kontak</strong> (normalde kapalı) girişi 0 olunca geçirir. Sayfadaki basamakta START'ın NO kontağı ile STOP'un NC kontağı seri bağlıdır; ikisi de geçirince sağdaki bobin, yani motor çıkışı Q0.0 enerjilenir.",
      formula: "Q0.0 = (I0.0 ∨ Q0.0) ∧ I0.1",
      formulaNote: "I0.0 START, I0.1 STOP girişi (basılmadığında 1). Parantezdeki Q0.0 mühürleme kontağıdır; bir kez enerjilenen bobin kendi kontağı üzerinden kendini besler.",
    },
    {
      heading: "Dişli, kayış, vida: güç korunur, tork ile hız takas edilir",
      body:
        "Sayfadaki altı hareket iletim kartı aynı muhasebeyi anlatır. İki dişlide diş hızı ortaktır, bu yüzden n₁·Z₁ = n₂·Z₂: 20 dişli bir çark 60 dişli bir çarkı döndürürse çıkış üçte bir hızda ama üç kat torkla döner. Kayış-kasnakta diş sayısının yerini çap alır. Kayıpsız iletimde tork ile açısal hızın çarpımı, yani güç, giriş ve çıkışta aynıdır. <strong>Bilyalı vida</strong> ise dönmeyi ötelemeye çevirir: her turda tabla bir diş adımı (P) ilerler. CNC tezgâhlarının mikron düzeyinde konumlanabilmesi, somun ile vida arasında yuvarlanan bilyaların boşluğu neredeyse sıfıra indirmesindendir.",
      formula: "n₁·Z₁ = n₂·Z₂,   P<sub>güç</sub> = τ·ω,   v = n·P",
      formulaNote: "5 mm adımlı bir vida 1200 dev/dk'da tablayı dakikada 6000 mm, yani saniyede 10 cm sürer.",
    },
    {
      heading: "G-kodu: tezgâhın cümleleri",
      body:
        "Her satır bir komut ve birkaç adres içerir. G harfi geometri ve hareket (G00 hızlı konumlama, G01 doğrusal kesme, G02/G03 saat yönü ve tersi yay), M harfi makine işlevleri (M03 iş mili başlat, M30 program sonu), S iş mili devri, F ilerleme hızıdır. Çoğu komut <strong>modaldır</strong>: bir kez yazılan G21 (milimetre) ya da F200 sonraki satırlarda değiştirilene kadar geçerli kalır. Sayfadaki örnekte yay satırında F yoktur; tezgâh bir önceki F200'ü kullanır. Kesme fiziği iki sayıda özetlenir: takım ucunun çevresel hızı V<sub>c</sub> = π·D·n ve her kesici ağzın bir dönüşte aldığı talaş f<sub>z</sub> = F/(n·z). Bunlar takım kataloğundaki önerilerle eşleşmezse takım kırılır ya da yüzey bozulur.",
      formula: "V<sub>c</sub> = π·D·n,   f<sub>z</sub> = F/(n·z)",
      formulaNote: "Örnek: D = 10 mm, n = 2000 dev/dk → V_c ≈ 62.8 m/dk; F = 200 mm/dk ve 2 ağız → f_z = 0.05 mm/diş.",
    },
  ],
  lab: {
    intro:
      "Sayfanın tek canlı deneyi en üstteki merdiven tuvalidir: <strong>START Butonu (I0.0)</strong>, <strong>STOP Butonu (I0.1)</strong> ve <strong>Sıfırla</strong>. İki buton gerçek bir basmalı buton gibi değil, anahtar gibi çalışır: her tıklama değeri 1 ile 0 arasında değiştirir ve etiket parantez içinde yeni değeri gösterir. Tuvalin altındaki satır her an START, STOP ve MOTOR durumunu yazar. Açılışta START = 0, STOP = 1'dir; STOP'un 1 olması butona basılmadığı anlamına gelir, çünkü NC bağlıdır. Öteki bölümlerde kartlar tıklanınca açıklama gösterir; G-kodu kutusu ve hareket kartları ise okuma ve hesap deneyleri içindir.",
    experiments: [
      {
        title: "Motoru çalıştır, mührü sına",
        predict: "START'a bir kez tıklayınca motor çalışır mı? Bir kez daha tıklayıp START'ı 0'a döndürünce, tuvalin dediği gibi 'mühürleme kontağı' motoru çalışır tutar mı?",
        do: "Sıfırla'ya bas. START Butonu'na tıkla; alt satırı ve sağdaki MOTOR bobinini izle. Sonra START'a yeniden tıkla (etiket 'START (0)' olur) ve alt satırı tekrar oku.",
        observe: "İlk tıklamada satır 'START=1 · STOP=1 · MOTOR=ÇALIŞIYOR' olur. İkinci tıklamada START=0 ve MOTOR=DURDU yazar: sayfanın simülasyonu mühürü uygulamaz; motor yalnızca START ve STOP aynı anda 1 iken çalışır.",
        explain: "Gerçek bir mühürlemeli devrede bobin enerjilenince kendi NO kontağı START'a paralel kapanır ve el butondan çekilse de akım o kontaktan geçer; motor ancak STOP ile durur. Sayfa kontağı çizer ama mantığı Q = START ∧ STOP olarak hesaplar. Gözlediğin fark, çizim ile programın farkıdır ve PLC'de de aynı şey olur: basamağı yanlış yazarsan şema ne derse desin motor durur.",
      },
      {
        title: "STOP neden normalde kapalı bağlanır?",
        predict: "Motor çalışırken STOP'a tıklarsan ne olur? STOP'u geri 1'e çevirdiğinde motor kendiliğinden yeniden çalışır mı, yoksa START'a yeniden basman gerekir mi?",
        do: "Sıfırla, START'a tıkla (motor çalışır). STOP Butonu'na tıkla: etiket 'STOP (0)' olur. Alt satırı oku. Sonra STOP'a bir daha tıklayıp 1'e döndür ve satırı yeniden oku.",
        observe: "STOP=0 olur olmaz MOTOR=DURDU yazar; START=1 kalsa bile. STOP yeniden 1 olunca motor START'a dokunmadan hemen çalışır, çünkü sayfada START bir anahtar gibi 1'de kalmıştır.",
        explain: "STOP girişinin 'basılmadığında 1' olması bilinçli bir güvenlik seçimidir: kablo kopar ya da buton bozulursa giriş 0 düşer ve motor durur; arıza, çalıştırmak yerine durdurur. Gerçek tesiste START yaylı bir butondur, bırakınca 0'a döner; o yüzden STOP'tan sonra motorun kendiliğinden kalkması mümkün değildir. Sayfadaki 'kendiliğinden yeniden çalışma', makine güvenliği standartlarının tam da yasakladığı davranıştır.",
      },
      {
        title: "Aynı silindir, iki akışkan",
        predict: "50 mm çaplı bir silindir 6 bar havayla ne kadar itebilir? Aynı silindir 200 bar hidrolik yağla kaç kat daha güçlüdür? Tahminini basınç oranıyla karşılaştır.",
        do: "Pnömatik bölümünde 'Pnömatik Silindir' kartına tıkla, çap aralığını ve bölüm başındaki 6–10 bar notunu oku. Hidrolik bölümünde 'Hidrolik Silindir' kartını aç, F = P × A satırını bul. Alanı A = π·(0.025 m)² ile hesapla ve iki kuvveti çıkar.",
        observe: "A ≈ 1.96 × 10⁻³ m². 6 bar = 6 × 10⁵ Pa ile F ≈ 1180 N (yaklaşık 120 kg); 200 bar ile F ≈ 39 300 N (yaklaşık 4 ton). Oran tam 200/6 ≈ 33. 'Hidrolik Pompa' kartındaki 350 bar ile aynı silindir 69 kN'a çıkar.",
        explain: "Alan aynı olduğundan kuvvet oranı basınç oranına eşittir. Pnömatiğin ucuz, hafif alüminyum gövdeyle yetinmesinin, hidrolik silindirlerin ise kalın çelik ve yüksek basınç contaları istemesinin nedeni budur. Kuvvet gerekiyorsa yağ, hız ve temizlik gerekiyorsa hava.",
      },
      {
        title: "G-kodunu kâğıtta çalıştır",
        predict: "Sayfadaki freze programı takımı en son hangi X, Y noktasına getirir? Kesme hareketleri (G01 ve G02 satırları) toplam kaç saniye sürer? Hızlı hareketleri (G00) sayma.",
        do: "G-kodu kutusunu satır satır oku. Kareli kâğıda XY düzlemini çiz, her satırın sonunda takımın bulunduğu noktayı işaretle. Her kesme satırı için yol uzunluğunu o anda geçerli olan F değerine (mm/dk) böl.",
        observe: "Yol: (0,0) → X50 düz → R25 yayla (75,25) → Y50 düz; takım (75, 50)'de biter. Süreler: Z5'ten Z−2'ye 7 mm, F100 ile 4.2 s; 50 mm, F200 ile 15 s; çeyrek daire 39.3 mm, F200 ile 11.8 s; 25 mm, F200 ile 7.5 s. Toplam yaklaşık 38.5 s.",
        explain: "Yay satırında F yazmaz; F modaldır, önceki 200 geçerlidir. G02 saat yönü demektir: (50,0)'dan (75,25)'e giden 25 mm yarıçaplı yayın merkezi (75,0)'dadır; öteki aday merkez (50,25) olsaydı yön saat yönünün tersi, yani G03 olurdu. Bir CAM yazılımı bu hesabı binlerce satır için yapar ve tezgâh süresini saniyesine kadar önceden söyler.",
      },
    ],
  },
  wow: [
    {
      title: "84'üncü proje",
      body:
        "Modicon 084'ün adındaki sayı, Bedford Associates'in 84'üncü projesi olmasından gelir; Modicon ise 'MOdular DIgital CONtroller'ın kısaltmasıdır. Dick Morley, fikrin ilk notlarını 1 Ocak 1968'de, yılbaşı sabahı yazdığını anlatırdı. 1969'da ilk ünite General Motors'un Hydramatic fabrikasına kuruldu. O günden beri bir PLC'nin programını fabrika elektrikçisi okuyabilir; bu, bir tasarım tercihinin elli yılı aşan ömrüdür.",
    },
    {
      title: "Elli bin tonluk pres hâlâ çalışıyor",
      body:
        "1955'te ABD Hava Kuvvetleri'nin Ağır Pres Programı kapsamında Cleveland'da kurulan Alcoa 50 000 tonluk hidrolik pres, yaklaşık 445 meganewton kuvvetle alüminyum külçeleri tek parça uçak gövde kaburgalarına dövüyor. Pascal'ın ilkesi tek bir sayıya sığıyor: silindirlerdeki basınç çarpı piston alanı. Pres bugün de üretimde ve 1981'de Amerikan Makine Mühendisleri Derneği tarafından tarihi mühendislik anıtı ilan edildi.",
    },
    {
      title: "Işıklı kalemle çizilen ilk CAD",
      body:
        "1963'te Ivan Sutherland, MIT Lincoln Laboratuvarı'ndaki TX-2 bilgisayarında Sketchpad'i gösterdi: ekrana ışıklı kalemle çizilen çizgiler, 'paralel kalsın', 'eşit uzunlukta olsun' gibi kısıtlarla bağlanabiliyor, bir köşeyi çekince bütün şekil kurallara uyarak yeniden hesaplanıyordu. Pencereli grafik arayüzün, nesne yönelimli programlamanın ve bugünkü parametrik CAD'in ortak atası bu tezdir. Sutherland 1988'de Turing Ödülü'nü aldı.",
    },
  ],
  worked: {
    title: "Bir hidrolik silindirin kuvveti, hızı ve gücü",
    prompt:
      "Çift etkili bir hidrolik silindirin piston çapı 100 mm, kol çapı 50 mm. Sistem basıncı 200 bar, pompa debisi 40 L/dk. İleri ve geri kuvvetleri, iki yöndeki piston hızını ve sıvının taşıdığı gücü bul.",
    steps: [
      "Alanları hesapla. Piston alanı A₁ = π·(0.050 m)² ≈ 7.85 × 10⁻³ m² (78.5 cm²). Kol tarafında halka alan A₂ = π·(0.050² − 0.025²) ≈ 5.89 × 10⁻³ m² (58.9 cm²); kol, alanın dörtte birini yer.",
      "Basıncı SI'ya çevir: 200 bar = 200 × 10⁵ Pa = 2.0 × 10⁷ Pa. İleri kuvvet F₁ = P·A₁ = 2.0 × 10⁷ × 7.85 × 10⁻³ ≈ 157 000 N ≈ 157 kN (yaklaşık 16 ton). Geri kuvvet F₂ = P·A₂ ≈ 118 kN (yaklaşık 12 ton). Oran A₁/A₂ = 4/3.",
      "Debiyi SI'ya çevir: 40 L/dk = 0.040 m³ / 60 s ≈ 6.67 × 10⁻⁴ m³/s. Hız = debi / alan: ileri v₁ ≈ 6.67 × 10⁻⁴ / 7.85 × 10⁻³ ≈ 0.085 m/s (8.5 cm/s); geri v₂ ≈ 6.67 × 10⁻⁴ / 5.89 × 10⁻³ ≈ 0.113 m/s (11.3 cm/s). Küçük alan daha az yağla dolar: geri dönüş daha hızlı ama daha zayıf.",
      "Gücü iki yoldan kontrol et. Hidrolik güç P·Q = 2.0 × 10⁷ × 6.67 × 10⁻⁴ ≈ 13.3 kW. Mekanik güç F₁·v₁ = 157 000 × 0.085 ≈ 13.3 kW. İleri ve geri yönde aynı sayı çıkar: kuvvet artınca hız düşer, güç korunur.",
    ],
    result:
      "157 kN ileri, 118 kN geri; 8.5 cm/s ileri, 11.3 cm/s geri; her iki yönde 13.3 kW. Pompanın motoru bu gücü kayıplarla birlikte, yaklaşık 15–16 kW olarak sağlamalıdır.",
  },
  misconceptions: [
    {
      myth: "Hidrolik sistem küçük kuvvetten büyük kuvvet üreterek enerji kazandırır.",
      truth:
        "Pascal ilkesi kuvveti çarpar, işi değil. Büyük piston 1 cm yükselirken küçük piston alan oranı kadar daha uzun yol alır; kuvvet × yol iki tarafta eşittir. Hidrolik pres bir kaldıraçtır: avantaj kuvvettedir, bedeli yoldur.",
    },
    {
      myth: "Merdiven diyagramındaki bütün basamaklar gerçek kablolar gibi aynı anda 'canlıdır'.",
      truth:
        "PLC basamakları yukarıdan aşağıya sırayla tarar ve çıkışları ancak tur sonunda günceller. Aynı çıkışı iki basamakta yazarsan sonuncusu kazanır; bir girişin tur ortasında değişmesi o tur görülmez. Sıra ve zamanlama, röle panosunda olmayan yeni bir kavramdır.",
    },
    {
      myth: "Pnömatik silindir, hidrolik gibi yükün altında sabit durur.",
      truth:
        "Hava sıkışabilir: 6 bar'da sıkıştırılmış hava yük değişince esner, silindir ara konumda yay gibi salınır. Hassas ara konum için ya hidrolik ya da elektrikli servo kullanılır; pnömatik, iki uç konum arasında hızlı gidip gelmek için idealdir.",
    },
    {
      myth: "CNC tezgâh, CAD dosyasını doğrudan okur ve parçayı yapar.",
      truth:
        "CAD modeli yalnızca geometridir. CAM yazılımı takım, devir, ilerleme ve kesme sırasını belirleyip takım yolunu üretir; son işlemci bunu o tezgâhın lehçesindeki G-koduna çevirir. Aynı parça için Fanuc ve Heidenhain kontrolörlerine farklı dosya gider.",
    },
  ],
  glossary: [
    { term: "PLC", definition: "Programlanabilir mantıksal kontrolör; girişleri okuyup programı çalıştırarak çıkışları süren, endüstriyel ortama dayanıklı bilgisayar." },
    { term: "Tarama döngüsü", definition: "PLC'nin girişleri okuma, programı yukarıdan aşağıya değerlendirme ve çıkışları güncelleme turu; tipik olarak birkaç milisaniye." },
    { term: "NO / NC kontak", definition: "Normalde açık kontak girişi 1 olunca, normalde kapalı kontak girişi 0 olunca akım geçirir; STOP butonları güvenlik için NC bağlanır." },
    { term: "Mühürleme", definition: "Bobinin kendi NO kontağını START'a paralel bağlayarak, buton bırakıldıktan sonra da enerjili kalması." },
    { term: "Pascal ilkesi", definition: "Kapalı bir sıvıya uygulanan basınç, sıvının her noktasına ve kabın duvarlarına azalmadan iletilir." },
    { term: "Debi (Q)", definition: "Birim zamanda geçen akışkan hacmi (L/dk ya da m³/s); silindir hızı debinin piston alanına bölümüdür." },
    { term: "G-kodu", definition: "CNC tezgâhının hareket ve makine komutlarını satır satır tarif eden standart dil; G hareket, M makine işlevi, F ilerleme, S devir." },
    { term: "Son işlemci (post-processor)", definition: "CAM yazılımının ürettiği genel takım yolunu belirli bir tezgâh kontrolörünün G-kodu lehçesine çeviren program." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Lisede bu sayfa üç basit yasadır: F = P·A, n₁·Z₁ = n₂·Z₂ ve 'VE/VEYA' mantığı. Üniversitede her biri bir derse açılır. Merdiven mantığı, IEC 61131-3 standardındaki beş PLC dilinden yalnızca biridir; yapısal metin ve ardışık fonksiyon şemaları ile makineler <strong>sonlu durum makinesi</strong> olarak modellenir ve bir motorun hızı ya da bir fırının sıcaklığı <strong>PID</strong> denetleyicilerle kapalı çevrimde tutulur. Akışkan gücü dersinde silindir hızı, valf karakteristiği ve basınç kayıpları Bernoulli ve sürtünme denklemleriyle hesaplanır; akışkanın sıkışabilirliği, sayfadaki 'esnek hava' sezgisinin nicel hâli olan hacim modülü olarak karşına çıkar.",
      "Üretim tarafında G-kodunun arkasında <strong>kinematik</strong> vardır: beş eksenli bir tezgâhta takımın ucunu istenen noktaya götürmek için eksen açılarının ters kinematikle çözülmesi gerekir; bu, robot kolunun problemiyle aynıdır. CAD yüzeyleri Bézier ve NURBS eğrilerinin matematiğine, CAM ise talaş kaldırma kuvveti, takım ömrü (Taylor denklemi) ve titreşim kararlılığı gibi konulara dayanır. Mekatronik, makine, elektrik ve endüstri mühendisliği bu zincirin farklı halkalarını paylaşır; bu sayfada dokunduğun her kart, o bölümlerden birinde bir dönemlik derstir.",
    ],
    topics: ["IEC 61131-3 ve PLC programlama", "Sonlu durum makineleri", "PID denetim ve kapalı çevrim", "Akışkan gücü ve valf karakteristikleri", "Robot ve tezgâh kinematiği", "Bézier ve NURBS yüzeyler", "Talaşlı imalat: kesme kuvveti ve takım ömrü"],
  },
  quiz: [
    {
      question: "Bir hidrolik presin küçük pistonu 2 cm², büyük pistonu 100 cm². Küçük pistona 50 N uygulanırsa büyük piston ne kadar kuvvet üretir ve büyük piston 1 cm yükselirken küçük piston ne kadar iner?",
      options: ["2500 N; 1 cm", "2500 N; 50 cm", "50 N; 50 cm", "100 N; 2 cm"],
      answer: 1,
      explanation: "Alan oranı 50 olduğundan kuvvet 50 × 50 = 2500 N olur. Yer değiştiren sıvı hacmi eşit kalmalı: 100 cm² × 1 cm = 2 cm² × 50 cm. İş iki tarafta aynıdır: 50 N × 0.5 m = 2500 N × 0.01 m = 25 J.",
    },
    {
      question: "Bir PLC'ye bağlı STOP butonu neden normalde kapalı (NC) olarak bağlanır?",
      options: ["NC kontak daha ucuzdur", "Kablo koparsa giriş 0 düşer ve motor güvenli biçimde durur", "NC kontak PLC taramasını hızlandırır", "Böylece START'a basmaya gerek kalmaz"],
      answer: 1,
      explanation: "NC bağlantıda butona basılmadığında giriş 1'dir. Kablo kopması ya da buton arızası girişi 0'a düşürür, bu da basılmış STOP ile aynı etkidir: arıza makineyi çalıştırmaz, durdurur. Buna hataya karşı güvenli tasarım denir.",
    },
    {
      question: "Sayfadaki programda 'G02 X75 Y25 R25' satırında ilerleme hızı yazmıyor. Tezgâh bu yayı hangi hızla keser?",
      options: ["Hata verir ve durur", "En yüksek hızla (G00 gibi)", "Bir önceki satırdaki F200 ile, çünkü F modaldır", "S2000, yani iş mili devriyle"],
      answer: 2,
      explanation: "F ilerleme adresi modaldır: bir kez yazıldığında değiştirilene kadar geçerlidir. Önceki satır F200 (mm/dk) verdiği için yay da 200 mm/dk ile kesilir; 39.3 mm'lik çeyrek daire yaklaşık 11.8 saniye sürer. S iş mili devridir, ilerlemeyle karıştırılmamalıdır.",
    },
  ],
  next: [
    { href: "basinc.html", title: "Basınç — Derinlik ve Pascal", why: "Hidrolik silindirin dayandığı Pascal ilkesini bir sıvı sütununda etkileşimli olarak gör." },
    { href: "mantik-devresi.html", title: "Mantık Devresi Tasarımcısı", why: "Merdiven basamağındaki VE/VEYA mantığını kapılarla kur; mühürleme aslında bir geri beslemedir." },
    { href: "tork-denge.html", title: "Tork ve Denge — Kaldıraç", why: "Dişli oranının ve hidrolik presin ortak atası: kuvvet ile yolun takası." },
    { href: "mekatronik-muhendisligi.html", title: "Mekatronik Mühendisliği", why: "PLC, sensör ve motorun bir araya geldiği disiplin; bu sayfanın bir üst katı." },
  ],
  sources: [
    { title: "OpenStax · University Physics Vol. 1, 14.3 Pascal's Principle and Hydraulics", url: "https://openstax.org/books/university-physics-volume-1/pages/14-3-pascals-principle-and-hydraulics", note: "Pascal ilkesi, hidrolik pres ve kuvvet çarpanı; çözümlü örneklerle (İngilizce, açık ders kitabı)." },
    { title: "Wikipedia · Programmable logic controller", url: "https://en.wikipedia.org/wiki/Programmable_logic_controller", note: "Modicon 084'ün doğuşu, tarama döngüsü, IEC 61131-3 dilleri ve merdiven mantığı." },
    { title: "Wikipedia · Numerical control", url: "https://en.wikipedia.org/wiki/Numerical_control", note: "Parsons, MIT Servomekanizma Laboratuvarı, APT dili ve G-kodu standardının tarihçesi." },
    { title: "Vikipedi · Hidrolik", url: "https://tr.wikipedia.org/wiki/Hidrolik", note: "Hidrolik sistemlerin temel bileşenleri ve uygulamaları (Türkçe)." },
  ],
  revision: "Ekim 2026",
};
