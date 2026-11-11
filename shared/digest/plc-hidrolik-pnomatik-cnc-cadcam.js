window.ACELYA_DIGEST = window.ACELYA_DIGEST || {};
window.ACELYA_DIGEST["plc-hidrolik-pnomatik-cnc-cadcam"] = {
  slug: "plc-hidrolik-pnomatik-cnc-cadcam",
  title: "Otomasyon: Beyin, Kas ve Dijital Köprü",
  field: "Mühendislik",
  level: "Lise–Lisans",
  minutes: 35,
  tagline:
    "Bir fabrika üç şeyden kuruludur: karar veren bir beyin (PLC), itip çeken kaslar (hidrolik, pnömatik, dişli) ve çizimi parçaya çeviren dijital bir zincir (CAD, CAM, G-kodu). Hepsi birkaç basit yasaya dayanır.",
  hook:
    "Ekskavatör operatörü parmak ucuyla bir kolu iter; 20 tonluk makinenin kepçesi tonlarca toprağı kaldırır. Makinenin elektronik beyni ise saniyede yüzlerce kez aynı soruyu sorar: girişler ne, çıkışlar ne olmalı? 1960'larda bir otomobil fabrikasında bu soruyu dolaplar dolusu röle yanıtlıyordu ve model her değiştiğinde hepsinin kablosu yeniden çekiliyordu.",
  bigIdea:
    "Endüstriyel otomasyon <strong>kararı</strong> (PLC'nin tarama döngüsü), <strong>kuvveti</strong> (Pascal ilkesi: F = p·A) ve <strong>geometriyi</strong> (CAD modelinden G-koduna) ayrı katmanlarda çözer; her katmanın kendi yasası, kendi dili ve kendi sınırları vardır.",
  story: [
    "Blaise Pascal 1650'lerde, kapalı bir sıvıya uygulanan basıncın her yöne aynen iletildiğini yazdı; bu, bir gün tonlarca yükü kaldıracak fikrin kâğıttaki ilk hâliydi. Fikri makineye çeviren kişi İngiliz mucit Joseph Bramah oldu: 1795'te iki silindirli hidrolik presin patentini aldı. Küçük pistondaki mütevazı kuvvet, alan oranı kadar büyüyerek büyük pistona geçiyordu. Presin asıl sorunu sızdırmazlıktı; Bramah'nın atölyesinde çalışan Henry Maudslay'ye atfedilen deri conta, basınç arttıkça silindir duvarına daha sıkı yaslanarak bu sorunu çözdü. On dokuzuncu yüzyılın sonunda Londra'da sokakların altına döşenen basınçlı su boruları vinçleri ve asansörleri çalıştırıyordu; 1894'te açılan Tower Bridge'in kanatlarını ise köprünün kendi buhar makinelerinin doldurduğu altı hidrolik akümülatördeki basınçlı su kaldırıyordu. Bugünkü hidrolik yağ ve yüzlerce barlık basınç, Pascal'ın suyunun torunudur.",
    "Fabrikanın beyni çok daha gençtir. 1960'ların sonunda otomobil fabrikalarının montaj hatları dolaplar dolusu <strong>röle</strong> ile yönetiliyordu: elektromıknatısla açılıp kapanan mekanik anahtarlar. Her yeni modelde panolar sökülüp yeniden kablolanıyordu. 1968'de General Motors'un Hydramatic bölümü, röle panosunun yerine geçecek programlanabilir bir denetleyici için şartname yayımladı. Bedford Associates'ten Dick Morley ve arkadaşları 1969'da Modicon 084'ü teslim etti: toza, ısıya ve elektriksel gürültüye dayanıklı, röle mantığını yazılımla taklit eden bir bilgisayar. Can alıcı karar programlama diliydi: tasarımcılar, fabrika elektrikçilerinin zaten okuduğu röle şemasına benzeyen <strong>merdiven (ladder) diyagramını</strong> seçti. Elektrikçi yeni bir dil öğrenmedi; kabloyu çizgiye, röleyi sembole çevirdi. Sayfadaki üç kontak ve bir bobin, o fikrin en küçük örneğidir.",
    "Tezgâhların bilgisayarla buluşması daha erken başladı. 1940'ların sonunda Michigan'da helikopter pali üreten John T. Parsons, pal şablonlarının koordinatlarını delikli kart makineleriyle hesaplıyordu; 1949'da ABD Hava Kuvvetleri'nden aldığı sözleşmeyle bu sayıları doğrudan bir tezgâha vermek istedi. İş MIT'nin Servomekanizma Laboratuvarı'na geçti; laboratuvar 1950'de elden düşme bir Cincinnati Hydro-Tel frezesi aldı ve Eylül 1952'de, delikli şeritten okuduğu komutlarla üç eksende hareket eden tezgâhı gösterdi: <strong>sayısal kontrolün</strong> (NC) doğuşu. Sonraki sorun, her parça için binlerce koordinatı elle yazmaktı; MIT'de Douglas Ross'un ekibinin 1950'lerin ikinci yarısında geliştirdiği APT dili bunu bilgisayara yaptırdı. Komutların bugünkü kısa hâli, 'G01 X50 F200' gibi satırlar, 1960'ların başında ABD'de Elektronik Sanayicileri Birliği'nin RS-274 standardında toplandı; G-kodu bu yüzden hâlâ delikli şerit çağının tutumlu üslubunu taşır.",
    "Çizimin kendisi bilgisayara 1963'te girdi: Ivan Sutherland'ın MIT'deki doktora tezi Sketchpad, ışıklı kalemle ekrana çizilen şekillere 'bu iki çizgi dik kalsın' gibi kısıtlar koyabiliyordu. Aynı yıllarda Citroën'de Paul de Casteljau ve Renault'da Pierre Bézier, otomobil kaportasının kıvrımlarını birkaç kontrol noktasıyla tarif eden eğrileri geliştirdi; bugün CAD yüzeylerinin ve yazı tiplerinin altında o eğriler yatar. 1980'lerin sonunda Pro/ENGINEER, ölçüleri sonradan değiştirilebilen <strong>parametrik</strong> modellemeyi yaygınlaştırdı. Böylece zincir tamamlandı: CAD modeli, CAM yazılımında takım yoluna, son işlemcide (post-processor) tezgâha özel G-koduna, tezgâhta da talaşa dönüşür. PLC ise o tezgâhın kapısını, hidrolik mengenesini ve pnömatik takım değiştiricisini yönetir.",
  ],
  core: [
    {
      heading: "Pascal ilkesi: kuvveti çarpar, işi değil",
      body:
        "Durgun, kapalı bir sıvıya uygulanan basınç her noktaya aynen iletilir. Basınç kuvvetin alana oranı olduğundan, aynı basınç büyük pistonda büyük kuvvete dönüşür: alan 50 kat büyükse kuvvet 50 kat büyür. Bedava bir şey yoktur. Sıvı sıkışmadığı için yer değiştiren hacim iki tarafta eşittir, A₁·s₁ = A₂·s₂; büyük piston 1 cm yükselirken küçük pistonu 50 cm itmen gerekir. İki eşitliği çarparsan F₁·s₁ = F₂·s₂ çıkar: kuvvet × yol, yani iş, sürtünme yoksa iki tarafta aynıdır. Sayfadaki 'Hidrolik Silindir' kartında aynı yasanın bir sonucu daha var: piston milinin kapladığı kesit bir taraftaki alanı küçülttüğü için çift etkili silindir, aynı basınçla ileri iterken geri çektiğinden daha güçlüdür. Birimlere dikkat: formüle bar değil pascal girer.",
      formula: "F = p·A,   F<sub>2</sub>/F<sub>1</sub> = A<sub>2</sub>/A<sub>1</sub>,   A<sub>1</sub>·s<sub>1</sub> = A<sub>2</sub>·s<sub>2</sub>",
      formulaNote: "p basınç (Pa = N/m²), A alan (m²). 1 bar = 10⁵ Pa = 0.1 MPa = 10 N/cm². 200 bar her santimetrekareye 2 kN bindirir; bu, yaklaşık 200 kg'lık bir kütlenin ağırlığıdır. Sayfa basıncı büyük P ile yazar.",
    },
    {
      heading: "Hidrolik mi pnömatik mi? Sıkışabilirlik karar verir",
      body:
        "İkisi de F = p·A ile çalışır; farkı akışkan yaratır. Sıkışmaya direnci <strong>hacim modülü</strong> K ölçer: Δp kadar basınç artışı hacmi ΔV/V = Δp/K oranında küçültür. Hidrolik yağda K kabaca 1.5 GPa'dır; 100 bar (10 MPa) hacmi yalnızca binde 6-7 azaltır. Bu yüzden hidrolik silindir hem yüzlerce bar taşır hem de yükün altında 'sert' durur. Yavaşça sıkıştırılan havada ise K yaklaşık mutlak basıncın kendisidir: 6 bar gösterge basıncında 0.7 MPa, yani yağdan iki bin kat yumuşak. Pnömatik silindir hızlı ve temizdir ama yük değişince bir yay gibi esner; ara konumda hassas durması ek düzenek ister. Sayfanın pnömatik bölümündeki 6-10 bar ile hidrolik kartındaki 350 bar, aynı çaptaki silindirlerin kuvveti arasında otuz kattan fazla fark demektir. Pnömatiğin kazandığı yerler hız, temizlik ve sızıntının zararsız olmasıdır.",
      formula: "ΔV/V = Δp/K;   50 mm çap: A ≈ 19.6 cm² → 6 bar'da ≈ 1.18 kN, 200 bar'da ≈ 39.3 kN",
      formulaNote: "1.18 kN yaklaşık 120 kg'lık, 39.3 kN yaklaşık 4 tonluk bir kütlenin ağırlığıdır. Alan aynı, yalnızca basınç farklı. Yağın K değeri sıcaklığa ve içindeki hava kabarcıklarına göre değişir.",
    },
    {
      heading: "PLC tarama döngüsü ve merdiven mantığı",
      body:
        "PLC, programını sonsuz bir döngüde tekrar tekrar <strong>tarar</strong>: önce bütün girişleri okuyup belleğe kopyalar, sonra merdiven basamaklarını yukarıdan aşağıya değerlendirir, en sonda çıkışları topluca günceller. Bir tur çoğu uygulamada milisaniyeler sürer. Merdivenin iki dikey rayı güç hattıdır; her basamak soldan sağa 'akım geçer mi?' sorusudur. Seri bağlı kontaklar VE, paralel kollar VEYA demektir. Sayfadaki basamakta START kontağına paralel bir <strong>mühür</strong> kontağı (Q0.0) ve hepsine seri STOP kontağı vardır. Motoru başlatmak için START yeter; motor çalışınca kendi kontağı START'ın yerini alır. Tuvali bir kablo şeması gibi oku: STOP = 1, normalde kapalı (NC) butonun basılmadığını, kontağın akım geçirdiğini gösterir. PLC programında bu yüzden I0.1 için normalde açık kontak sembolü kullanılır; sembol girişin 1 olup olmadığına bakar, butonun yapısına değil.",
      formula: "Q0.0 = (I0.0 ∨ Q0.0) ∧ I0.1",
      formulaNote: "I0.0 START, I0.1 STOP girişi (butona basılmadığında 1), ∨ VEYA, ∧ VE. Sağdaki Q0.0 bir önceki taramanın sonucudur; denklem bu yüzden bir bellek elemanı tanımlar. Dene: (0 ∨ 1) ∧ 1 = 1, motor START bırakılınca da çalışır.",
    },
    {
      heading: "Dişli, kayış, vida: güç korunur, tork ile hız takas edilir",
      body:
        "Sayfadaki altı hareket iletim kartı aynı muhasebeyi anlatır. Birbirini kavrayan iki dişlide temas noktasının hızı ortaktır; bu yüzden n₁·Z₁ = n₂·Z₂: 20 dişli bir çark 60 dişli bir çarkı döndürürse çıkış üçte bir hızda ama üç kat torkla döner. Kayış-kasnakta diş sayısının yerini çap alır. Kayıpsız iletimde tork ile açısal hızın çarpımı, yani güç, giriş ve çıkışta aynıdır; gerçek bir redüktörde her kademede yüzde birkaç kaybolur. <strong>Vidalı mil</strong> dönmeyi ötelemeye çevirir: her turda tabla bir adım ilerler. CNC tezgâhlarının mikron düzeyinde konumlanabilmesi, somun ile vida arasında yuvarlanan bilyaların ön yüklemeyle boşluğu neredeyse sıfıra indirmesindendir. Aynı takasın en yalın hâlleri için <a href='basit-makineler.html'>Basit Makineler</a> sayfasındaki çark–mil ve vida sekmelerine bak.",
      formula: "n₁·Z₁ = n₂·Z₂,   Güç = τ·ω,   v = n·P<sub>adım</sub>",
      formulaNote: "τ tork (N·m), ω açısal hız (rad/s). Sayfa vida adımını P ile yazar; basınçla karıştırma. 5 mm adımlı vida 1200 dev/dk'da tablayı dakikada 6000 mm, yani saniyede 10 cm sürer.",
    },
    {
      heading: "G-kodu: tezgâhın cümleleri",
      body:
        "Her satır bir komut ve birkaç adres içerir. G harfi hareketi tarif eder (G00 hızlı konumlama, G01 doğrusal kesme, G02/G03 saat yönünde ve tersine yay), M harfi makine işlevlerini (M03 iş milini çalıştır, M30 program sonu), S iş mili devrini, F ilerleme hızını verir. Çoğu komut <strong>modaldır</strong>: bir kez yazılan G21 (milimetre) ya da F200 sonraki satırlarda değiştirilene kadar geçerli kalır. Sayfadaki örnekte yay satırında F yoktur; tezgâh bir önceki F200'ü kullanır. Yay satırındaki R yalnızca yarıçapı verir; merkezin hangi tarafta olduğunu G02 ile G03 arasındaki seçim belirler. Kesme fiziği iki sayıda özetlenir: takım ucunun çevresel hızı V<sub>c</sub> = π·D·n ve her kesici ağzın bir dönüşte aldığı talaş kalınlığı f<sub>z</sub> = F/(n·z). Bunlar takım üreticisinin o malzeme için önerdiği aralığın dışına çıkarsa takım kırılır ya da yüzey bozulur.",
      formula: "V<sub>c</sub> = π·D·n,   f<sub>z</sub> = F/(n·z)",
      formulaNote: "Sayfadaki S2000 ve F200 için, 10 mm çaplı iki ağızlı bir freze varsayarsak: V_c = π × 0.010 m × 2000 dev/dk ≈ 62.8 m/dk; f_z = 200/(2000 × 2) = 0.05 mm/diş. Takım çapını sayfa vermez.",
    },
  ],
  lab: {
    intro:
      "Sayfanın tek canlı deneyi en üstteki merdiven tuvalidir: <strong>START Butonu (I0.0)</strong>, <strong>STOP Butonu (I0.1)</strong> ve <strong>Sıfırla</strong>. İki buton yaylı bir buton gibi değil, anahtar gibi çalışır: her tıklama değeri 1 ile 0 arasında değiştirir ve düğmenin yazısı 'START (1)' gibi yeni değeri gösterir. Tuvalin altındaki satır START, STOP ve MOTOR durumunu, ardından basamağın denklemini yazar. Açılışta START = 0, STOP = 1'dir; STOP'un 1 olması butona basılmadığı anlamına gelir. Sayfa, değeri her değiştirdiğinde basamağı bir kez tarar. Öteki bölümlerde kartlar tıklanınca açıklama gösterir; G-kodu kutusu ve hareket kartları okuma ve hesap deneyleri içindir. Nicel hidrolik deneyleri için <a href='hidrolik-sistemler.html'>Hidrolik Sistemler</a> sayfasına geç.",
    experiments: [
      {
        title: "Motoru çalıştır, mührü sına",
        predict: "START'a bir kez tıklayınca motor çalışır mı? Bir kez daha tıklayıp START'ı 0'a döndürünce motor durur mu? Yanıtını tıklamadan önce Q0.0 = (I0.0 ∨ Q0.0) ∧ I0.1 denkleminden çıkar.",
        do: "Sıfırla'ya bas. START Butonu'na tıkla; alt satırı ve sağdaki MOTOR bobinini izle. Sonra START'a yeniden tıkla (yazısı 'START (0)' olur) ve alt satırı tekrar oku. START'ın üstündeki MÜHÜR kontağının rengine bak.",
        observe: "İlk tıklamada satır 'START=1 · STOP=1 · MOTOR=ÇALIŞIYOR' olur; bobin ve mühür kontağı turkuaza döner. İkinci tıklamada START=0 olur ama MOTOR=ÇALIŞIYOR kalır: akım artık START'tan değil, paralel koldaki mühür kontağından geçer.",
        explain: "Denklemi iki kez değerlendir. İlk taramada (1 ∨ 0) ∧ 1 = 1: motor çalışır. START bırakıldıktan sonra (0 ∨ 1) ∧ 1 = 1: bobin kendi kontağı üzerinden beslenir. Çıkışın kendi girişine geri bağlanması basamağa bellek kazandırır; aynı girişler (START = 0, STOP = 1) için motor hem durmuş hem çalışıyor olabilir, hangisi olduğunu geçmiş belirler. Sayısal elektronikte bunun adı kilit (latch) devresidir.",
      },
      {
        title: "STOP neden normalde kapalı bağlanır?",
        predict: "Motor çalışırken STOP'a tıklarsan ne olur? STOP'u geri 1'e çevirdiğinde motor kendiliğinden yeniden çalışır mı? START anahtarı 1'de unutulmuşsa yanıt değişir mi?",
        do: "Sıfırla, START'a iki kez tıkla (motor mühürle çalışır, START = 0). STOP Butonu'na tıkla: yazısı 'STOP (0)' olur; alt satırı oku. STOP'a bir daha tıklayıp 1'e döndür ve oku. Şimdi START'ı 1 yapıp öyle bırak; STOP'u önce 0, sonra yeniden 1 yap.",
        observe: "STOP = 0 olur olmaz MOTOR=DURDU yazar. STOP yeniden 1 olunca, START = 0 iken motor durmuş kalır: mühür düşmüştür. START 1'de bırakılmışsa durum başkadır: STOP = 0 motoru yine durdurur, ama STOP 1'e döner dönmez motor kendiliğinden çalışır.",
        explain: "STOP'un basılmadığında 1 vermesi bilinçli bir güvenlik seçimidir: kablo kopar ya da klemens gevşerse giriş 0'a düşer ve motor durur; arıza makineyi çalıştırmaz, durdurur. Gerçek tesiste START yaylı bir butondur, bırakınca 0'a döner; bu yüzden durdurulan ya da elektriği kesilip gelen bir makine kendiliğinden kalkmaz. Son adımda gördüğün kendiliğinden yeniden çalışma, kalıcı bir START anahtarının neden tehlikeli olduğunu gösterir.",
      },
      {
        title: "Aynı silindir, iki akışkan",
        predict: "50 mm çaplı bir silindir 6 bar havayla ne kadar itebilir? Aynı silindir 200 bar hidrolik yağla kaç kat daha güçlüdür? Tahminini basınç oranıyla karşılaştır.",
        do: "Pnömatik bölümünde 'Pnömatik Silindir' kartına tıkla, çap aralığını ve bölüm başındaki 6-10 bar notunu oku. Hidrolik bölümünde 'Hidrolik Silindir' kartını aç, F=P×A satırını bul. Alanı A = π·(0.025 m)² ile hesapla, basınçları pascala çevir ve iki kuvveti çıkar.",
        observe: "A ≈ 1.963 × 10⁻³ m². 6 bar = 6 × 10⁵ Pa ile F ≈ 1178 N; 200 bar = 2 × 10⁷ Pa ile F ≈ 39 270 N. Oran 200/6 ≈ 33'tür. 'Hidrolik Pompa' kartındaki 350 bar ile aynı silindir yaklaşık 68.7 kN'a çıkar. Kartlar kuvveti hesaplamaz; sayılar senin hesabındır.",
        explain: "Alan aynı olduğundan kuvvet oranı basınç oranına eşittir. Bunlar üst sınırlardır: sürtünme ve karşı taraftaki basınç kuvveti azaltır, silindirin gerçekte ne kadar ittiğini de yük belirler. Pnömatik silindirin hafif alüminyum gövdeyle yetinmesinin, hidrolik silindirin ise kalın çelik ve yüksek basınç contaları istemesinin nedeni bu basınç farkıdır.",
      },
      {
        title: "G-kodunu kâğıtta çalıştır",
        predict: "Sayfadaki freze programı takımı en son hangi X, Y noktasına getirir? G02 satırındaki yayın merkezi nerededir? Kesme hareketleri (G01 ve G02 satırları) toplam kaç saniye sürer?",
        do: "G-kodu kutusunu satır satır oku. Kareli kâğıda XY düzlemini çiz, her satırın sonunda takımın bulunduğu noktayı işaretle. Yay için (50,0) ve (75,25) noktalarına 25 mm uzaktaki iki aday merkezi bul; saat yönünde dönüleni seç. Her kesme satırının yolunu o anda geçerli F değerine böl.",
        observe: "Yol: (0,0) → (50,0) düz; (75,0) merkezli çeyrek yayla (75,25); düz (75,50). Takım X75 Y50'de 2 mm derinlikte biter, sonra Z5'e kalkar. Süreler: Z5'ten Z−2'ye 7 mm, F100 ile 4.2 s; 50 mm, F200 ile 15 s; yay π·25/2 ≈ 39.3 mm, 11.8 s; 25 mm, 7.5 s. Toplam yaklaşık 38.5 s.",
        explain: "İki aday merkez (75,0) ve (50,25)'tir. (75,0) çevresinde başlangıç yönü batı, bitiş yönü kuzeydir: saat yönü, yani G02. Bu yol (50,0)'da 90° keskin bir köşe yapar; yaya girerken takım doğuya değil kuzeye yönelir. Satır G03 olsaydı merkez (50,25) olur, yay doğrultuya teğet başlar ve yuvarlatılmış bir köşe çıkardı. Süre hesabı ivmelenmeyi yok sayar; gerçek tezgâh köşelerde yavaşlar. Yay satırında F yazmaz, çünkü F modaldır.",
      },
    ],
  },
  wow: [
    {
      title: "84'üncü proje",
      body:
        "Modicon 084'ün adındaki sayı, Bedford Associates'in 84'üncü projesi olmasından gelir; Modicon ise 'MOdular DIgital CONtroller'ın kısaltmasıdır. Dick Morley, fikrin ilk notlarını 1 Ocak 1968'de, yılbaşı sabahı yazdığını anlatırdı. 1969'da ilk üniteler General Motors'a teslim edildi. O günden beri bir PLC'nin programını fabrika elektrikçisi okuyabilir; bu, bir tasarım tercihinin elli yılı aşan ömrüdür.",
    },
    {
      title: "Elli bin tonluk pres hâlâ çalışıyor",
      body:
        "1955'te ABD Hava Kuvvetleri'nin Ağır Pres Programı kapsamında Cleveland'da kurulan Alcoa presi 50 000 ton-kuvvet, yani yaklaşık 445 meganewton uygular ve hafif alaşım kütüklerini uçakların tek parça taşıyıcı elemanlarına döver. Bütün o kuvvet tek bir çarpımdır: silindirlerdeki basınç çarpı piston alanı. Pres onarılıp yenilenerek bugün de üretimde tutuluyor; 1981'de Amerikan Makine Mühendisleri Derneği (ASME) onu tarihî mühendislik anıtı ilan etti.",
    },
    {
      title: "Işıklı kalemle çizilen ilk CAD",
      body:
        "1963'te Ivan Sutherland, MIT Lincoln Laboratuvarı'ndaki TX-2 bilgisayarında Sketchpad'i çalıştırdı: ekrana ışıklı kalemle çizilen çizgiler 'paralel kalsın', 'eşit uzunlukta olsun' gibi kısıtlarla bağlanabiliyor, bir köşeyi çekince bütün şekil kurallara uyarak yeniden hesaplanıyordu. Grafik arayüzlerin ve bugünkü kısıt tabanlı, parametrik CAD'in öncüsü sayılan bu çalışma bir doktora teziydi. Sutherland 1988'de Turing Ödülü'nü aldı.",
    },
  ],
  worked: {
    title: "Bir hidrolik silindirin basıncı, hızı ve gücü",
    prompt:
      "Çift etkili bir silindirin piston çapı D = 100 mm, mil çapı d = 40 mm. Silindir 40 kN'luk bir yükü sabit hızla itiyor; pompa silindire 30 L/dk yağ veriyor, dönüş hattında karşı basınç yok sayılıyor. Uzamada ve çekilmede gereken basıncı, piston hızını ve yüke aktarılan gücü bul. Emniyet valfi 200 bar'a ayarlıysa silindir en çok ne kadar itebilir?",
    steps: [
      "Alanlar: tam piston alanı A_p = π·D²/4 = π × (0.100 m)² / 4 = 7.854 × 10⁻³ m² (78.54 cm²). Mil tarafındaki halka alan A_h = π·(D² − d²)/4 = π × (0.0100 − 0.0016) m² / 4 = 6.597 × 10⁻³ m² (65.97 cm²).",
      "Basınç (uzama): p = F/A_p = 40 000 N / 7.854 × 10⁻³ m² = 5.093 × 10⁶ Pa = 50.9 bar. Basıncı pompa değil yük belirler: yük yarıya inse basınç da yarıya inerdi.",
      "Hız: Q = 30 L/dk = 30 × 10⁻³ m³ / 60 s = 5.0 × 10⁻⁴ m³/s. v = Q/A_p = 5.0 × 10⁻⁴ / 7.854 × 10⁻³ = 0.0637 m/s = 63.7 mm/s. Hızı yük değil debi belirler.",
      "Güç, iki yoldan: hidrolik p·Q = 5.093 × 10⁶ Pa × 5.0 × 10⁻⁴ m³/s = 2546 W; mekanik F·v = 40 000 N × 0.06366 m/s = 2546 W. Pa·m³/s = N·m/s = W.",
      "Çekilme: yağ halka alana girer. p = 40 000 / 6.597 × 10⁻³ = 6.063 × 10⁶ Pa = 60.6 bar; v = 5.0 × 10⁻⁴ / 6.597 × 10⁻³ = 75.8 mm/s; güç 3032 W. Alan 0.84 katına indiği için basınç da hız da 1/0.84 = 1.19 katına çıkar.",
      "Tavan: 200 bar = 2.0 × 10⁷ Pa. F_max = p·A_p = 2.0 × 10⁷ × 7.854 × 10⁻³ = 157 kN (uzama), p·A_h = 132 kN (çekilme). 40 kN'luk yük bu tavanın dörtte biri kadardır; valf kapalı kalır.",
    ],
    result:
      "Uzamada 50.9 bar, 63.7 mm/s, 2.55 kW; çekilmede 60.6 bar, 75.8 mm/s, 3.03 kW; 200 bar'da en çok 157 kN. Model sürtünmeyi, kaçağı ve boru kayıplarını yok sayar; pompayı çeviren motorun gücü bunların üstüne pompa verimini de karşılamalıdır. Aynı düzeni <a href='hidrolik-sistemler.html'>Hidrolik Sistemler</a> sayfasının 01 · Silindir sekmesinde D = 100 mm, d = 40 mm, F = 40 kN, Q = 30 L/dak, pᵦ = 0 bar ile kur: kartlar 50,9296 bar, 63,662 mm/s ve 2.546,4791 W yazar; yönü Çekilme yapınca 60,6305 bar ve 75,7881 mm/s.",
  },
  misconceptions: [
    {
      myth: "Hidrolik sistem küçük kuvvetten büyük kuvvet üreterek enerji kazandırır.",
      truth:
        "Pascal ilkesi kuvveti çarpar, işi değil. Büyük piston 1 cm yükselirken küçük piston alan oranı kadar daha uzun yol alır; kuvvet × yol iki tarafta eşittir, sürtünme varsa çıkış daha da azdır. Hidrolik pres sıvıdan yapılmış bir kaldıraçtır: kazanç kuvvettedir, bedeli yoldur.",
    },
    {
      myth: "STOP butonu normalde kapalıysa merdiven programında da normalde kapalı kontak çizilir.",
      truth:
        "Butonun yapısı ile programdaki sembol ayrı şeylerdir. NC buton basılmadığında girişi 1 yapar; programdaki normalde açık kontak sembolü 'giriş 1 ise geçir' demektir ve motorun çalışmasına izin verir. Sembolü de NC seçersen mantık tersine döner: motor ancak STOP'a basılıyken çalışır. Yeni başlayanların en sık düştüğü tuzak budur.",
    },
    {
      myth: "Merdiven diyagramındaki bütün basamaklar gerçek kablolar gibi aynı anda 'canlıdır'.",
      truth:
        "PLC basamakları yukarıdan aşağıya sırayla değerlendirir ve çıkışları tur sonunda günceller. Aynı çıkışı iki basamakta yazarsan sonuncusu kazanır; bir girişin tur ortasında değişmesi o turda görülmez, bir taramadan kısa süren darbe hiç görülmeyebilir. Sıra ve zamanlama, röle panosunda olmayan yeni kavramlardır.",
    },
    {
      myth: "CNC tezgâh, CAD dosyasını doğrudan okur ve parçayı yapar.",
      truth:
        "CAD modeli yalnızca geometridir. CAM yazılımında takım, devir, ilerleme ve kesme sırası seçilir, takım yolu üretilir; son işlemci bunu o tezgâhın kontrolörünün anladığı G-koduna çevirir. Aynı parça için Fanuc ve Heidenhain kontrolörlerine farklı dosya gider.",
    },
  ],
  glossary: [
    { term: "PLC", definition: "Programlanabilir mantıksal denetleyici; girişleri okuyup programı değerlendirerek çıkışları süren, endüstriyel ortama dayanıklı bilgisayar." },
    { term: "Tarama döngüsü", definition: "PLC'nin girişleri okuma, programı yukarıdan aşağıya değerlendirme ve çıkışları güncelleme turu; süresi çoğu uygulamada milisaniyeler düzeyindedir." },
    { term: "NO / NC", definition: "Normalde açık kontak sembolü ilgili bit 1 iken, normalde kapalı sembol bit 0 iken akım geçirir; NC bir buton ise basılmadığında devreyi kapalı tutar." },
    { term: "Mühürleme", definition: "Bobinin kendi kontağının START'a paralel bağlanması; buton bırakıldıktan sonra da bobini enerjili tutan geri besleme." },
    { term: "Pascal ilkesi", definition: "Durgun, kapalı bir sıvıya uygulanan basınç değişimi sıvının her noktasına ve kabın duvarlarına azalmadan iletilir." },
    { term: "Debi (Q)", definition: "Birim zamanda geçen akışkan hacmi (L/dk ya da m³/s); silindir hızı, debinin beslenen piston alanına bölümüdür." },
    { term: "Hacim modülü (K)", definition: "Bir akışkanın sıkışmaya direnci; K = −V·dp/dV, birimi Pa. Hidrolik yağda GPa, 6-10 bar'lık basınçlı havada yaklaşık 1 MPa düzeyindedir." },
    { term: "G-kodu", definition: "CNC tezgâhının hareket ve makine komutlarını satır satır tarif eden dil; G hareket, M makine işlevi, F ilerleme, S devir." },
  ],
  bridge: {
    heading: "Üniversiteye köprü",
    body: [
      "Bu sayfanın üç yasası, F = p·A, n₁·Z₁ = n₂·Z₂ ve VE/VEYA mantığı, üniversitede birer derse açılır. Merdiven diyagramı, IEC 61131-3 standardındaki PLC dillerinden yalnızca biridir; <strong>Mantık Devreleri</strong> dersinde mühürleme bir kilit devresi, makinenin adımları bir <strong>sonlu durum makinesi</strong> olarak modellenir. <strong>Otomatik Kontrol</strong> dersinde bir motorun hızı ya da bir fırının sıcaklığı <strong>PID</strong> denetleyicilerle kapalı çevrimde tutulur; bunun sensör ve eyleyici tarafı <a href='mekatronik-muhendisligi.html'>Mekatronik Mühendisliği</a> sayfasındadır. <strong>Hidrolik ve Pnömatik</strong> (akışkan gücü) dersinde silindir hızı, valf karakteristiği ve basınç kayıpları hesaplanır. <a href='hidrolik-sistemler.html'>Hidrolik Sistemler</a> laboratuvarı bunun ilk adımıdır: debi hızı, yük basıncı belirler; pompanın şaft gücü yük, kısma valfi ve emniyet valfi arasında paylaşılır.",
      "Üretim tarafında G-kodunun arkasında <strong>kinematik</strong> vardır: beş eksenli bir tezgâhta takımın ucunu istenen noktaya ve yönelime götürmek için eksen konumlarının ters kinematikle çözülmesi gerekir; bu, robot kolunun problemiyle aynıdır. Kontrolör, yay ve doğru parçalarını her eksen için milisaniyelik konum hedeflerine böler (<strong>enterpolasyon</strong>) ve ivme sınırlarına uyar. CAD yüzeyleri Bézier ve NURBS eğrilerinin matematiğine dayanır: n'inci dereceden bir Bézier eğrisi, kontrol noktalarının Bernstein polinomlarıyla ağırlıklı toplamıdır. <strong>Talaşlı İmalat</strong> dersi ise kesme kuvvetini, takım ömrünü (Taylor bağıntısı: V·T<sup>n</sup> = C) ve tezgâh titreşiminin kararlılığını inceler.",
    ],
    topics: ["IEC 61131-3 ve PLC programlama", "Kilit devreleri ve sonlu durum makineleri", "PID denetim ve kapalı çevrim", "Akışkan gücü: valf ve pompa karakteristikleri", "Robot ve tezgâh kinematiği", "Bézier ve NURBS yüzeyler", "Talaşlı imalat: kesme kuvveti ve takım ömrü"],
  },
  quiz: [
    {
      question: "Bir hidrolik presin küçük pistonu 2 cm², büyük pistonu 100 cm². Küçük pistona 50 N uygulanırsa büyük piston ne kadar kuvvet üretir ve büyük piston 1 cm yükselirken küçük piston ne kadar iner?",
      options: ["2500 N; 1 cm", "2500 N; 50 cm", "50 N; 50 cm", "100 N; 2 cm"],
      answer: 1,
      explanation: "Basınç p = 50 N / 2 cm² = 25 N/cm² = 2.5 bar her yerde aynıdır; büyük pistonda 25 × 100 = 2500 N eder. Yer değiştiren hacim eşit kalmalı: 100 cm² × 1 cm = 2 cm² × 50 cm. İş iki tarafta aynıdır: 50 N × 0.5 m = 2500 N × 0.01 m = 25 J.",
    },
    {
      question: "Q0.0 = (I0.0 ∨ Q0.0) ∧ I0.1 basamağında motor mühürle çalışıyor (I0.0 = 0, I0.1 = 1, Q0.0 = 1). STOP butonunun kablosu kopuyor, birkaç saniye sonra yeniden temas ediyor. Motor ne yapar?",
      options: ["Hiç etkilenmez, çalışmayı sürdürür", "Durur ve temas gelince kendiliğinden yeniden çalışır", "Durur ve START'a basılana kadar durmuş kalır", "Yalnızca kablo kopukken çalışır"],
      answer: 2,
      explanation: "Kablo kopunca I0.1 = 0 olur: (0 ∨ 1) ∧ 0 = 0, motor durur ve mühür düşer. Temas geri gelince (0 ∨ 0) ∧ 1 = 0: START'a basılmadıkça motor kalkmaz. STOP'un NC bağlanmasının kazandırdığı şey budur: arıza durdurur, kendiliğinden çalıştırmaz.",
    },
    {
      question: "Sayfadaki programda 'G02 X75 Y25 R25' satırında ilerleme hızı yazmıyor. Tezgâh bu çeyrek yayı hangi ilerlemeyle ve yaklaşık kaç saniyede keser?",
      options: ["Hata verir ve durur", "Hızlı hareketle (G00 gibi), yaklaşık 1 saniyede", "Önceki satırdaki F200 ile, yaklaşık 12 saniyede", "S2000 değeriyle, yaklaşık 1.2 saniyede"],
      answer: 2,
      explanation: "F adresi modaldır: bir kez yazıldığında değiştirilene kadar geçerlidir. Önceki satır F200 (mm/dk) verdiği için yay da 200 mm/dk ile kesilir. Çeyrek dairenin boyu π·R/2 = π × 25/2 ≈ 39.3 mm; 39.3/200 dk ≈ 11.8 s. S iş mili devridir, ilerlemeyle karıştırılmamalıdır.",
    },
  ],
  next: [
    { href: "hidrolik-sistemler.html", title: "Hidrolik Sistemler: Debi, Yük ve Güç", why: "Bu sayfanın nicel laboratuvarı: silindirde debi-hız ve yük-basınç ilişkisini, pompada hacim ve mekanik verimi, kısma ve emniyet valfli devrede gücün nereye gittiğini watt watt hesapla." },
    { href: "basinc.html", title: "Basınç: Hidrostatik, Pascal İlkesi ve Hidrolik", why: "Hidrolik kaldıraç sekmesinde kütleyi ve piston çaplarını seçip yükü vuruş vuruş kaldır; kuvvet kazancının yolla ödendiğini gör." },
    { href: "mantik-devresi.html", title: "Mantık Devresi Tasarımcısı", why: "Basamağın VE/VEYA mantığını kapılarla kur; SR kilidi deneyi, mühürlemenin bir geri besleme olduğunu doğruluk tablosunun bittiği yerde gösterir." },
    { href: "basit-makineler.html", title: "Basit Makineler: Kuvvet, Yol ve İş", why: "Palanga, eğik düzlem, çark–mil ve vida sekmelerinde kuvvet kazancının bedelini ve verimin giriş işini nasıl büyüttüğünü joule joule izle." },
  ],
  sources: [
    { title: "OpenStax · University Physics Vol. 1, 14.3 Pascal's Principle and Hydraulics", url: "https://openstax.org/books/university-physics-volume-1/pages/14-3-pascals-principle-and-hydraulics", note: "Pascal ilkesi, hidrolik pres ve kuvvet çarpanı; çözümlü örneklerle (İngilizce, açık ders kitabı)." },
    { title: "Enerpac · Basic Hydraulics", url: "https://www.enerpac.com/en-US/resources/education/basic-hydraulics", note: "Üreticinin eğitim sayfası: kuvvet = basınç × etkin alan, yağ hacmi = etkin alan × strok." },
    { title: "Wikipedia · Programmable logic controller", url: "https://en.wikipedia.org/wiki/Programmable_logic_controller", note: "GM Hydramatic'in 1968 şartnamesi, Modicon 084, tarama döngüsü ve IEC 61131-3 dilleri." },
    { title: "Wikipedia · History of numerical control", url: "https://en.wikipedia.org/wiki/History_of_numerical_control", note: "Parsons, MIT Servomekanizma Laboratuvarı, Hydro-Tel frezesinin Eylül 1952 gösterimi ve APT dili." },
    { title: "Wikipedia · Sketchpad", url: "https://en.wikipedia.org/wiki/Sketchpad", note: "Sutherland'ın 1963 tezi, TX-2 bilgisayarı, kısıt tabanlı çizim ve 1988 Turing Ödülü." },
  ],
  revision: "Kasım 2026",
};
